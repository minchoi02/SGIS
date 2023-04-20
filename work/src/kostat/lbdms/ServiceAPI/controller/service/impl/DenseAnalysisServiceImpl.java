package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.util.QueryUtil;
import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.DenseAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisUtils;
import kostat.lbdms.ServiceAPI.controller.service.DenseAnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.AnalysisUserMapper;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

/**  
* <pre>
* 나의 데이터 분석 관련 서비스
* </pre>
*
* @author        Admin
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
* </pre>
*/

@SuppressWarnings("unused")
@Service("denseAnalysisService")
public class DenseAnalysisServiceImpl extends EgovAbstractServiceImpl implements DenseAnalysisService{
	
	@Resource(name="analysisUserMapper")
	private AnalysisUserMapper analysisUserMapper;
	
	
	@Resource(name="postgreCommandClient")
	private PostgreCommandClient client;
	
	private static final Logger logger = LoggerFactory.getLogger(DenseAnalysisServiceImpl.class);
	
	// 군집 분석 결과 최대 건수
	private static final int MAX_CROWD_ANALYSIS_CNT = 10000;

	
	/**
	 * 공간자기상관 분석 처리
	 * @param denseAnalysis
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 * @throws Exception 
	 */
	public JSONObject spaceSelfAnalysis( DenseAnalysis denseAnalysis, JSONArray condition_list ) throws SystemFailException, Exception {
		JSONObject res = new JSONObject();
		JSONObject tmpJson =  new JSONObject();
		
		String methodType = "";
		
		logger.info( "[ 공간자기상관 분석 ] =======================================" );
		//{"pos_col_infos":[{"pos_method":"XY","lable_columns":"","pos_columns":"x,y"}]}
		logger.info( denseAnalysis.toString() );
		
		String userId = denseAnalysis.getUserid();
		denseAnalysis.setResult_table_name("space_self_analyis" + getDateNum());
		// 필요한 정보 : code, offset, limit, 결과 테이블, 요청 테이블
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("param", denseAnalysis );

		if(condition_list != null && !condition_list.isEmpty()){
			AnalysisUtils utils = new AnalysisUtils();
			
//			parameters.put( "condition", arrayDataMakeWhereQuery(condition_list, tmpJson) );
			try {
				parameters.put( "condition", utils.createCensusWhereClause(condition_list) );
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				throw new SystemFailException(e.getMessage());
			}
		}
		String reqYear = "";
		String depth1 = "";
		String depth2 = "";
		if (tmpJson.containsKey("year"))	reqYear = tmpJson.getString("year");
		if (tmpJson.containsKey("depth1"))	depth1 = tmpJson.getString("depth1");
		if (tmpJson.containsKey("depth2"))	depth2 = tmpJson.getString("depth2");
		if (tmpJson.containsKey("depth2"))	methodType = tmpJson.getString("depth2");
		
		//paramTableCk.put("TABLE_NM", denseAnalysis.getResult_table_name());
		
		try{
			String compTempTbl = "space_self_" + getDateNum();
			
			//execute미리 생성한 뒤 넘김
			JSONObject execres = new JSONObject();
			HashMap<String,Object> execparams = new HashMap<String,Object>();
			execparams.put("USER_ID", userId);
			execparams.put("DESCRIPTION", denseAnalysis.getDescription());
			execparams.put("DATA_NAME", denseAnalysis.getResult_table_name());
			execparams.put("STATE", "RUNNING");
			execparams.put("CATEGORY4", "ANALYSIS_2016");			
			execres = new RestService().call(Command.EXECUTE, Command.INSERT, execparams);
			parameters.put("EXECUTE_ID",  execres.getString("EXECUTE_ID"));
			//System.out.println("ExecuteID>"+parameters.get("EXECUTE_ID").toString());
			
			parameters.put("USER_ID", userId);
			parameters.put("DESCRIPTION", denseAnalysis.getDescription());
			parameters.put("ACTION_TYPE", "SPACE_ANALY");
			parameters.put("CATEGORY4", "ANALYSIS_2016");
			parameters.put("RESULT_TABLE_NAME", denseAnalysis.getResult_table_name());
			parameters.put("K_VALUE", "" + denseAnalysis.getK_value());
			
			JSONObject jsonCart = new JSONObject();
			jsonCart.put("K_VALUE", "" + denseAnalysis.getK_value());
			jsonCart.put("DESCRIPTION", "" + denseAnalysis.getDescription());
			jsonCart.put("reqYear", reqYear);
			jsonCart.put("depth1", depth1);
			jsonCart.put("depth2", depth2);
			
			if (methodType.equals("INDUSTRY") || methodType.equals("THEME")) {
				HashMap<String,Object> req = new HashMap<String,Object>();
				req.put("cols", "gid,corp_nm,x,y"); 
				req.put("user_id", userId);
				req.put("data_table_schema", userId);
				
				req.put("data_name","sti_comp_info_" + tmpJson.getString("year"));
				req.put("qrycondition",tmpJson.getString("query"));
				
				// 코드 값 설정
				if (denseAnalysis.getArea_cd().length() == 2 ){
					req.put("code", denseAnalysis.getArea_cd() );
					req.put("code_col", "sido_cd" );
					req.put("target_table", "kostat.bnd_sido_pg" );
				} else if ( denseAnalysis.getArea_cd().length() == 5){
					req.put("code", denseAnalysis.getArea_cd() );
					req.put("code_col", "sigungu_cd" );
					req.put("target_table", "kostat.bnd_sigungu_pg" );
				} else {
					req.put("code", denseAnalysis.getArea_cd() );
					req.put("code_col", "adm_dr_cd" );
					req.put("target_table", "kostat.bnd_adm_dong_pg" );
				}
				logger.info("PARAM==============================================");
				logger.info( req.toString() );
				logger.info( "===================================================" );
				
				req.put("result_table", userId + "." + compTempTbl );
				//String strQuery = "ALTER TABLE " + userId + "." + compTempTbl + " OWNER TO " + userId;
				
				parameters.put("SCHEMA", userId);
				parameters.put("X_COLUMN", "x");	
				parameters.put("Y_COLUMN", "y");
				parameters.put("ANALYSIS_COLUMN", "employee_cnt");
				parameters.put("TABLE_NAME", compTempTbl);
				
				jsonCart.put("TABLE_NAME", compTempTbl);
				jsonCart.put("ANALYSIS_COLUMN", "종업원 수");
				jsonCart.put("DATASET_NAME", "사업체");
				jsonCart.put("X_COLUMN", "x");
				jsonCart.put("Y_COLUMN", "y");
        	} else {
        		parameters.put("SCHEMA", userId);
				parameters.put("X_COLUMN", denseAnalysis.getLbdms_x());
				parameters.put("Y_COLUMN", denseAnalysis.getLbdms_y());
				parameters.put("ANALYSIS_COLUMN", denseAnalysis.getAnalysis_column());
				parameters.put("TABLE_NAME", denseAnalysis.getData_name());
				
				jsonCart.put("ANALYSIS_COLUMN", denseAnalysis.getAnalysis_column());
				jsonCart.put("DATASET_NAME", denseAnalysis.getData_name());
				jsonCart.put("X_COLUMN", denseAnalysis.getLbdms_x());
				jsonCart.put("Y_COLUMN", denseAnalysis.getLbdms_y());
        	}
			
			if (!reqYear.equals("") && !depth1.equals("") && !depth2.equals("")) {
				logger.info( "[ 분석로그-공간자기상관 ] =======================================" );
				HashMap<String, String> logmap = new HashMap<String, String>();
				logmap.put("user_id", denseAnalysis.getUserid());
				logmap.put("analysis_type", "공간자기상관분석");
				logmap.put("req_year", reqYear);
				logmap.put("depth1", depth1);
				logmap.put("depth2", depth2);
				logmap.put("result_data_nm", compTempTbl);
				
				//executeMapper.insertSgisLog(logmap);
				
				String logQry = "insert into sgis_use_log (reg_user_id, analysis_type, req_year, depth1, depth2, result_data_nm) values ";
				logQry += "('" +denseAnalysis.getUserid()+ "','공간자기상관분석','" +reqYear+ "','" +depth1+ "','" +depth2+ "','" +compTempTbl+ "')";
				client.executeRawQueryByPgSystem( RequestKey.POSTGRE.toString(), logQry );
				
				String logCount = "0";
				String logCountQry = "select count(*) from " + denseAnalysis.getUserid() + "." + compTempTbl;
				logCount = client.executeRawQuery( RequestKey.POSTGRE.toString(), logCountQry );
				if (logCount.equals("0")) {
					res.put("success", false);
				} else {
					parameters.put("TABLE_INFO_OBJ", jsonCart.toString());
					res = new RestService().call(Command.ANALYSIS, Command.R_ANALYSIS, parameters);
				}
			} else {
			
				res = new RestService().call(Command.ANALYSIS, Command.R_ANALYSIS, parameters);
			}
			//res.put("success", true);
			//res.put("results", result);
			
		} catch ( DataAccessException dae ){
			logger.info("=== DataAccessException ");
/*			execute.setData_name( denseAnalysis.getResult_table_name() );
			execute.setState("FAIL");
			executeMapper.updateExecute( execute );*/
			
			res.put("success", false);
			throw dae;
			
		}
	
		return res;
	}
	
		
	/**
	 * 보로노이 분석 처리
	 * @param denseAnalysis
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 * @throws Exception 
	 */
	public JSONObject voronoiAnalysis( DenseAnalysis denseAnalysis, JSONArray condition_list ) throws SystemFailException, Exception {
		JSONObject res = new JSONObject();
		JSONObject tmpJson =  new JSONObject();
		
		String methodType = "";
		
		logger.info( "[ 보로노이 분석 ] =======================================" );
		//{"pos_col_infos":[{"pos_method":"XY","lable_columns":"","pos_columns":"x,y"}]}
		logger.info( denseAnalysis.toString() );
		
		String userId = denseAnalysis.getUserid();
		denseAnalysis.setResult_table_name("space_voronoi" + getDateNum());
		// 필요한 정보 : code, offset, limit, 결과 테이블, 요청 테이블
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("param", denseAnalysis );

		if(condition_list != null && !condition_list.isEmpty()){
			AnalysisUtils utils = new AnalysisUtils();
			
//			parameters.put( "condition", arrayDataMakeWhereQuery(condition_list, tmpJson) );
			try {
				parameters.put( "condition", utils.createCensusWhereClause(condition_list) );
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				throw new SystemFailException(e.getMessage());
			}
		}
		String reqYear = "";
		String depth1 = "";
		String depth2 = "";
		
		for (int i = 0; i < condition_list.size(); i++) {
			JSONObject object = condition_list.getJSONObject(i);
			String key = object.getString("key");
			String value = object.getString("value");
			
			if ("year".equalsIgnoreCase(key)) {
				tmpJson.put("year", value);
			} else if ("depth1".equalsIgnoreCase(key)) {
				tmpJson.put("depth1", value);
			} else if ("depth2".equalsIgnoreCase(key)) {
				tmpJson.put("depth2", value);
			}
		}
		
		tmpJson.put("query", parameters.get("condition"));
		
		if (tmpJson.containsKey("year"))	reqYear = tmpJson.getString("year");
		if (tmpJson.containsKey("depth1"))	depth1 = tmpJson.getString("depth1");
		if (tmpJson.containsKey("depth2"))	depth2 = tmpJson.getString("depth2");
		if (tmpJson.containsKey("depth2"))	methodType = tmpJson.getString("depth2");
		
		//paramTableCk.put("TABLE_NM", denseAnalysis.getResult_table_name());
		
		try{
			//JSONArray result = null;
			String compTempTbl = "voronoi_" + getDateNum();
			
			//execute미리 생성한 뒤 넘김
			JSONObject execres = new JSONObject();
			HashMap<String,Object> execparams = new HashMap<String,Object>();
			execparams.put("USER_ID", userId);
			execparams.put("DESCRIPTION", denseAnalysis.getDescription());
			execparams.put("DATA_NAME", denseAnalysis.getResult_table_name());
			execparams.put("STATE", "RUNNING");
			execparams.put("CATEGORY4", "ANALYSIS_2016");			
			execres = new RestService().call(Command.EXECUTE, Command.INSERT, execparams);
			parameters.put("EXECUTE_ID",  execres.getString("EXECUTE_ID"));
			
			
			parameters.put("USER_ID", userId);
			parameters.put("DESCRIPTION", denseAnalysis.getDescription());
			parameters.put("ACTION_TYPE", "VORONOI_ANALY");
			parameters.put("CATEGORY4", "SOP2016");
			parameters.put("RESULT_TABLE_NAME", denseAnalysis.getResult_table_name());
			parameters.put("ADM_CD", denseAnalysis.getArea_cd());

			JSONObject jsonCart = new JSONObject();
			jsonCart.put("DESCRIPTION", "" + denseAnalysis.getDescription());
			jsonCart.put("reqYear", reqYear);
			jsonCart.put("depth1", depth1);
			jsonCart.put("depth2", depth2);
			
			if (methodType.equals("INDUSTRY") || methodType.equals("THEME")) {
				HashMap<String,Object> req = new HashMap<String,Object>();
				req.put("cols", "gid,corp_nm,x,y"); 
				req.put("user_id", userId);
				req.put("data_table_schema", userId);
				req.put("data_name","sti_comp_info_" + tmpJson.getString("year"));
				req.put("qrycondition",tmpJson.getString("query"));
				req.put("code", denseAnalysis.getArea_cd() );

				// 코드 값 설정
				if (denseAnalysis.getArea_cd().length() == 2 ){
					req.put("code_col", "sido_cd" );
					req.put("target_table", "kostat.bnd_sido_pg" );
				} else if ( denseAnalysis.getArea_cd().length() == 5){
					req.put("code_col", "sigungu_cd" );
					req.put("target_table", "kostat.bnd_sigungu_pg" );
				} else {
					req.put("code_col", "adm_dr_cd" );
					req.put("target_table", "kostat.bnd_adm_dong_pg" );
				}
				logger.info("PARAM==============================================");
				logger.info( req.toString() );
				logger.info( "===================================================" );
				
				req.put("result_table", userId + "." + compTempTbl );
				JSONArray.fromObject(analysisUserMapper.setIndustryResultTable( req ));
				
				String setOwnQry = "ALTER TABLE " + userId + "." + compTempTbl + " OWNER TO " + denseAnalysis.getUserid();
				client.executeRawQueryByPgUser( RequestKey.POSTGRE.toString(), setOwnQry );
				
				parameters.put("SCHEMA", userId);
				parameters.put("GEOMETRY_TYPE", "XY");
				//GEOMETRY_COLUMN_NAME
				parameters.put("X_COLUMN", "x");	
				parameters.put("Y_COLUMN", "y");
				parameters.put("TABLE_NAME", compTempTbl);
				
				jsonCart.put("DATASET_NAME", "사업체");
				jsonCart.put("X_COLUMN", "x");
				jsonCart.put("Y_COLUMN", "y");
        	} else {
        		parameters.put("SCHEMA", userId);
        		parameters.put("GEOMETRY_TYPE", "XY");
        		//GEOMETRY_COLUMN_NAME
				parameters.put("X_COLUMN", denseAnalysis.getLbdms_x());
				parameters.put("Y_COLUMN", denseAnalysis.getLbdms_y());
				parameters.put("TABLE_NAME", denseAnalysis.getData_name());
				
				jsonCart.put("DATASET_NAME", denseAnalysis.getData_name());
				jsonCart.put("X_COLUMN", denseAnalysis.getLbdms_x());
				jsonCart.put("Y_COLUMN", denseAnalysis.getLbdms_y());
        	}
			
			if (!reqYear.equals("") && !depth1.equals("") && !depth2.equals("")) {
				logger.info( "[ 분석로그-보로노이 ] =======================================" );
/*				String logQry = "insert into sgis_use_log (reg_user_id, analysis_type, req_year, depth1, depth2, result_data_nm) values ";
				logQry += "('" +denseAnalysis.getUserid()+ "','보로노이','" +reqYear+ "','" +depth1+ "','" +depth2+ "','" +compTempTbl+ "')";
				client.executeRawQueryByPgSystem( RequestKey.POSTGRE.toString(), logQry );
				*/
				HashMap<String, String> logmap = new HashMap<String, String>();
				logmap.put("user_id", denseAnalysis.getUserid());
				logmap.put("analysis_type", "보로노이");
				logmap.put("req_year", reqYear);
				logmap.put("depth1", depth1);
				logmap.put("depth2", depth2);
				logmap.put("result_data_nm", compTempTbl);
				
				//executeMapper.insertSgisLog(logmap);
				
				String logQry = "insert into sgis_use_log (reg_user_id, analysis_type, req_year, depth1, depth2, result_data_nm) values ";
				logQry += "('" +denseAnalysis.getUserid()+ "','보로노이','" +reqYear+ "','" +depth1+ "','" +depth2+ "','" +compTempTbl+ "')";
				client.executeRawQueryByPgSystem( RequestKey.POSTGRE.toString(), logQry );
				
			
				
				res = new RestService().call(Command.ANALYSIS, Command.VORONOI_ANALYSIS, parameters);
				res.put("EXECUTE_ID", (String)parameters.get("EXECUTE_ID")); //2018-10-16 네이버시스템 수정
				
				/*
				String logCount = "0";
				String logCountQry = "select count(*) from " + denseAnalysis.getUserid() + "." + compTempTbl;
				logCount = client.executeRawQuery( RequestKey.POSTGRE.toString(), logCountQry );
				
				//2018-10-16 네이버시스템 수정
 				//보로노이다이어그램 소스가 개발서버에 올라가있는것과 다른것 같음
 				//아래에 수정된 소스는 단순히 결과가 수행되도록만 했기때문에 반드시 비플레이스 쪽에서 수정보완 필요함.
 				//알려진문제 
 				//1. 분석실행 시, EXECUTE_ID가 반환되지 않음 => 경계분석은 반환이 됨
 				//   현재 반환된 EXECUTE_ID로 분석에 사용된 세부파라미터를 저장하므로 반드시 필요함
 				//2. 테이블 유무 판별 시, 기존에 레코드의 갯수를 가져오도록 되어있는데 소스가 바꼈는지 알 수 없으나
 				//   JSON형태로 결과가 넘어옴 => JSON형태에서 COUNT만 뽑아서 분기문 처리
				JSONObject tmplogCount = null;
				try {
	 				tmplogCount = (JSONObject) JSONSerializer.toJSON( logCount );
	 				JSONObject tmpMessage = (JSONObject)tmplogCount.get("MESSAGE");
	 				JSONArray tmpValueList = (JSONArray)tmpMessage.get("VALUE");
	 				for(int i=0;i<tmpValueList.size();i++){
	 					JSONObject tmpCnt = (JSONObject) tmpValueList.get(i);
	 					logCount = tmpCnt.get("count").toString();
	 				}
				} catch(Exception e1) {
					if (tmplogCount.getString("MESSAGE").indexOf("ERROR") > -1 && tmplogCount.getString("MESSAGE").indexOf("does not exist") > -1) {
						logCount = "0";
					}
				}

				if (Integer.parseInt(logCount) == 0) {	//테이블 유무 체크
					res.put("success", false);
				} else {
					res = new RestService().call(Command.ANALYSIS, Command.VORONOI_ANALYSIS, parameters);
					res.put("EXECUTE_ID", (String)parameters.get("EXECUTE_ID")); //2018-10-16 네이버시스템 수정
				}
				*/
				
				/*if (logCount.equals("0")) {
					res.put("success", false);
				} else {
					res = new RestService().call(Command.ANALYSIS, Command.VORONOI_ANALYSIS, parameters);
				}*/
			} else {
				parameters.put("TABLE_INFO_OBJ", jsonCart.toString());
				res = new RestService().call(Command.ANALYSIS, Command.VORONOI_ANALYSIS, parameters);
				res.put("EXECUTE_ID", (String)parameters.get("EXECUTE_ID")); //2018-10-16 네이버시스템 수정
			}
			//res.put("success", true);
			//res.put("results", result);
			
		} catch ( DataAccessException dae ){
			logger.info("=== DataAccessException ");
/*			execute.setData_name( denseAnalysis.getResult_table_name() );
			execute.setState("FAIL");
			executeMapper.updateExecute( execute );*/
			
			res.put("success", false);
			throw dae;
			
		}
	
		return res;
	}
	
	/**
	 * <pre>
	 * 분석조건에 따른 resource 데이터 분석 실행 (밀집 분석)
	 * </pre>
	 * @param resource_id
	 * @param data_table
	 * @param data_table_schema
	 * @param user_id
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 * @throws Exception 
	 */
	public JSONObject denseAnalysis(DenseAnalysis denseAnalysis, JSONArray condition_list) throws SystemFailException, Exception { 
		
		JSONObject res = null;
		JSONObject tmpJson = null;
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		// USER_ID  ========================================
		parameters.put( RequestKey.USER_ID, denseAnalysis.getUserid() );
		// DATA_TABLE  ========================================
		parameters.put( "DATA_TABLE", denseAnalysis.getData_name() );		
		// RESOURCE_ID  ========================================
		parameters.put( "RESOURCE_ID", denseAnalysis.getResource_id() );
		// DATA_TABLE_SCHEMA  ========================================
		parameters.put( "DATA_TABLE_SCHEMA", denseAnalysis.getData_table_schema() );
		// 사용자 권한 분류
		parameters.put("USER_DIV", denseAnalysis.getUserdiv());

		// WHERE_STATEMENT - 데이터조건선택   ========================================
		if(condition_list != null && !condition_list.isEmpty()){
			tmpJson = whereMake(condition_list);
			parameters.put( "WHERE_STATEMENT", tmpJson );
		}

		
		// BATCH_YN ========================
		// 2017.07.18 ischoi 배치분석만 있기때문에 true 로 처리
		// boolean bBatch = "Y".equals(denseAnalysis.getBatch_yn()) ? true : false;

		boolean bBatch = true;

		parameters.put("BATCH_YN", bBatch);
		
		
		///테이블 중복 체크
		HashMap<String,Object> paramTableCk = new HashMap<String,Object>();
		paramTableCk.put("USER_ID", denseAnalysis.getData_table_schema());
		paramTableCk.put("TABLE_NM", denseAnalysis.getResult_table_name());
		
		res = new RestService().call(Command.RESOURCE, Command.TABLE_CHECK, paramTableCk);
		
		if( !"SUCCESS".equals(res.get("RESULT")) ){
			logger.debug( ""+res.get("MESSAGE") );
			return res;
		}

		// 원천데이터 500건이 넘는지 체크
		// 2017.07.18 ischoi 배치 분석으로 데이터 건수 체크  주석 처리
		//
//		denseAnalysis.setCheckCnt(1000);
//		denseAnalysis.setObject(tmpJson);
//		boolean bRtnCnt = selectTabInfo(denseAnalysis, "count_checked");
//		if(bRtnCnt && !bBatch){
//			throw new SystemFailException("분석 원천데이터의 건수가 1000건이 초과되었습니다.\n 배치분석을 실행하시기 바랍니다.");
//		}
		
		// RESULT_CALCULATION - 결과 산출방식  ========================================
		JSONObject rcJSO = new JSONObject();
		rcJSO.put("RESULT_MODE", denseAnalysis.getRm() );
		if (StringUtils.equalsIgnoreCase(denseAnalysis.getRm(), "count")) {			
			rcJSO.put("RESULT_COLUMN", "*");
		} else {
			rcJSO.put("RESULT_COLUMN", StringEscapeUtils.escapeSql(denseAnalysis.getSumfield()) );
		}				
		parameters.put("RESULT_CALCULATION", rcJSO);
		
		// POLYGON_TABLE_SCHEMA  ========================================
		parameters.put("POLYGON_TABLE_SCHEMA", RequestKey.KOSTAT); //경계데이터 경우 kostat
		
		/*************************************************/
		//resource.pos_column_desc - pos_column_infos json값을보고 해당 필드 set 
		//JSONArray tAry  = (JSONArray) JSONSerializer.toJSON(myDataAnalysis.getPos_column_desc());
		String pos_method = "";
		String pos_columns = "";
		String x_col = "";
		String y_col = "";
		String tot_oa_col = "";
		String geom_col = "";

		if (denseAnalysis.getResource_id() != null) {
		
		JSONObject json = (JSONObject) JSONSerializer.toJSON(denseAnalysis.getPos_column_desc());

			if(json != null){

				JSONArray tAry = JSONArray.fromObject(json.getString("pos_col_infos"));

				for(Object obj : tAry){
					tmpJson = (JSONObject)obj;
					pos_method = tmpJson.get("pos_method").toString().replaceAll(" ","").trim();
					pos_columns = tmpJson.get("pos_columns").toString();

					if( !"".equals(pos_method)){
						if(pos_method.indexOf("XY") >= 0 ){
							x_col =  pos_columns.split(",")[0];
							y_col =  pos_columns.split(",")[1];
						}else if( StringUtils.equalsIgnoreCase( "GEOM", pos_method) ){
							geom_col = pos_columns;
						}else if( "행정구 코드".equals(pos_method)){
							tot_oa_col = pos_columns;
						}
					}
				}
				logger.info("[pos_method]:" + pos_method + "[pos_columns]:"+pos_columns + "\n"
						+" x_col[" +x_col+ "]y_col[" +y_col+ "]tot_oa_col["+tot_oa_col+"]geom_col["+geom_col+"]");

			}

		}



		parameters.put("MY_DATA_GEOM_COLUMN", "");
		parameters.put("ANALYSIS_WAY", "XY");
		parameters.put("POINT_X", x_col);
		parameters.put("POINT_Y", y_col);
		
		// 군집 밀집 분석
		// if( "1".equals(denseAnalysis.getSelstep()) ){
			parameters.put("GEO_DATA_TYPE", "DENSITY");
			
			parameters.put("MY_DATA_CD_COLUMN", "");
			
			//분석단위
			String admType = denseAnalysis.getAdmType();
			// POLYGON_TABLE  ========================================
			
			if(denseAnalysis.getSpace_value() == 1000){
				parameters.put("POLYGON_TABLE", "sido_hexa_1000");
			}else if(denseAnalysis.getSpace_value() == 5000){
				parameters.put("POLYGON_TABLE", "sido_hexa_5000");
			}else if(denseAnalysis.getSpace_value() == 10000){
				parameters.put("POLYGON_TABLE", "sido_hexa_10000");
			}else{
				parameters.put("POLYGON_TABLE", "sido_hexa_1000");
			}


			if (denseAnalysis.getDong() != null) {
                parameters.put("GEO_DATA_CD_COLUMN", "tot_oa_cd");
                if ("all".equals(denseAnalysis.getDong())) {
                    parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getDong());
                } else {
                    parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSgg());
                }
                parameters.put("ACTION_TYPE", "DENSITY_ANALY_TOT");
            } else if (denseAnalysis.getSgg() != null) {
                parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
                if("all".equals(denseAnalysis.getSgg())){
                    parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSgg());
                }else{
                    parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSido());
                }
                parameters.put("ACTION_TYPE", "DENSITY_ANALY_DONG");
            } else if (denseAnalysis.getSido() != null) {
                parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");
                parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSido());
                parameters.put("ACTION_TYPE", "DENSITY_ANALY_SGG");
            } else {
                parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
                parameters.put("ACTION_TYPE", "DENSITY_ANALY_SIDO");
            }

//			if("sido".equals(admType)) {
//				parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
//				parameters.put("ACTION_TYPE", "DENSITY_ANALY_SIDO");
//			} else	if("sgg".equals(admType)) {
//				parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");
//				parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSido());
//				parameters.put("ACTION_TYPE", "DENSITY_ANALY_SGG");
//			} else	if("dong".equals(admType)) {
//				parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
//				if(denseAnalysis.getSgg() != null){
//					parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSgg());
//				}else{
//					parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSido());
//				}
//				parameters.put("ACTION_TYPE", "DENSITY_ANALY_DONG");
//			} else	if("totaloa".equals(admType)) {
//				parameters.put("GEO_DATA_CD_COLUMN", "tot_oa_cd");
//				if(denseAnalysis.getDong() !=null){
//					parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getDong());
//				}else{
//					parameters.put("POLYGON_TABLE_KEY", denseAnalysis.getSgg());
//				}
//				parameters.put("ACTION_TYPE", "DENSITY_ANALY_TOT");
//			}
		// }

		parameters.put("CONDITION", condition_list);

		//RESULT_TABLE_SCHEMA ========================
		parameters.put("RESULT_TABLE_SCHEMA", denseAnalysis.getUserid());
		//RESULT_TABLE_NAME ========================
		parameters.put("RESULT_TABLE_NAME", denseAnalysis.getResult_table_name());
		//DESCRIPTION ========================
		parameters.put("DESCRIPTION", denseAnalysis.getResult_table_desc());
		
		/***********************************************/


		// 센서스 데이터 CONDITION에 필요한 파라미터 추출
		String reqYear = "";
		String depth1 = "";
		String depth2 = "";
		if (denseAnalysis.getResource_id() == null) {
			if (condition_list != null) {
				for (int i = 0; i < condition_list.size(); i++) {
					JSONObject json = (JSONObject)condition_list.get(i);
					if ("depth1".equals(json.get("key"))) {
						parameters.put("DEPTH1", json.get("value"));
						depth1 = (String)json.get("value");
					} else if ("depth2".equals(json.get("key"))) {
						parameters.put("DEPTH2", json.get("value"));
						depth2 = (String)json.get("value");
					} else if ("year".equals(json.get("key"))) {
						reqYear = (String)json.get("value");
						parameters.put("YEAR", json.get("value"));
					} else if ("targetSelect".equals(json.get("key"))) {
						parameters.put("TARGET_SELECT", json.get("value"));
					}
				}
			}
		}

		logger.info("PARAMETERS => ", parameters);


		long time = System.currentTimeMillis(); 

		SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
		String start = dayTime.format(new Date(time));

		if (!reqYear.equals("") && !depth1.equals("") && !depth2.equals("")) {
			logger.info( "[ 분석로그-밀집 ] =======================================" );
			HashMap<String, String> logmap = new HashMap<String, String>();
			logmap.put("user_id", denseAnalysis.getUserid());
			logmap.put("analysis_type", "밀집분석");
			logmap.put("req_year", reqYear);
			logmap.put("depth1", depth1);
			logmap.put("depth2", depth2);
			logmap.put("result_data_nm", denseAnalysis.getResult_table_name());
			
			//executeMapper.insertSgisLog(logmap);
			
			String logQry = "insert into sgis_use_log (reg_user_id, analysis_type, req_year, depth1, depth2, result_data_nm) values ";
			logQry += "('" +denseAnalysis.getUserid()+ "','밀집분석','" +reqYear+ "','" +depth1+ "','" +depth2+ "','" +denseAnalysis.getResult_table_name()+ "')";
			client.executeRawQueryByPgSystem( RequestKey.POSTGRE.toString(), logQry );
		}
		
		if (denseAnalysis.getResource_id() != null) {
			res = new RestService().call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_CONDITION_2016, parameters);
		} else {
			res = new RestService().call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_CONDITION_CENSUS, parameters);
		}

		if( !"SUCCESS".equals(res.get("RESULT")) ){
			logger.debug( ""+res.get("MESSAGE") );
			return res;
		}

		long end = System.currentTimeMillis();
		
		/*************************************************/
		//##############################################
		//즉시분석 일때
		if( !bBatch ){
			String tmpTbl = denseAnalysis.getUserid() + "." + denseAnalysis.getResult_table_name();
			String chkQry = "select count(*) as cnt from " + tmpTbl;
			String rtnRaw = client.executeRawQueryByUser( chkQry );
			
			JSONObject dataCnt =  (JSONObject) JSONSerializer.toJSON(rtnRaw);
			JSONObject cntObj = dataCnt.getJSONObject("MESSAGE");
			
			JSONArray values = cntObj.getJSONArray("VALUE");
			String chkCnt = "";
			if (values != null) {
				JSONObject row = values.getJSONObject(0);
				chkCnt = row.getString("cnt");
			}
			
			res.put("chkCnt", chkCnt);
			
			// step2.
			String legQry = "  SELECT ntile AS grade, CAST(max(data) AS double precision) AS max, CAST(min(data) AS double precision) AS min " 
					         + "  FROM (SELECT data, ntile(5) OVER (ORDER BY data) AS ntile "
					         + "         FROM " +tmpTbl + "  WHERE data != 0) AS x "
					         + "  GROUP BY ntile ORDER BY ntile";
			
			String rtnSelect = client.executeRawQuery( RequestKey.POSTGRE.toString(), legQry );
			
			logger.info(" rtnSelect" + rtnSelect);
			
			JSONObject dataLegend =  (JSONObject) JSONSerializer.toJSON(rtnSelect);
			JSONObject legObj = dataLegend.getJSONObject("MESSAGE");
			
			JSONArray legVal = legObj.getJSONArray("VALUE");
			res.put("LEGEND", legVal);
			
			if (Integer.parseInt(chkCnt) > 1000) {
				String getQry = "select ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y from " + tmpTbl +"  limit 1";
				
				String getRaw = client.executeRawQuery( RequestKey.POSTGRE.toString(), getQry );
				
				JSONObject getObj =  (JSONObject) JSONSerializer.toJSON(getRaw);
				JSONObject msgObj = getObj.getJSONObject("MESSAGE");
				
				res.put("chkCnt", "" + chkCnt);
				
				values = null;
				values = msgObj.getJSONArray("VALUE");
				if (values != null) {
					JSONObject row = values.getJSONObject(0);
					res.put("x",  row.getString("x"));
					res.put("y",  row.getString("y"));
				}
			}
		}
		
		return res;
	}

	
	/**
	 * <pre>
	 * 군집밀집 결과데이터 가져오기
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getSpaData( JSONObject json, String userid) throws SystemFailException{
		
		String Schema = userid;
		String query = "";
		String sel_tbl = "";
		String result = "";

		try{
			if ( !json.containsKey("TABLE") ||  
				  json.getString("TABLE") == null  || 
				  json.getString("TABLE").equalsIgnoreCase("") ){
				return "{\"success\":\"false\", \"reason\":\"입력값에 오류가 발생했습니다.\"}";
			}
			
			if ( (json.containsKey("SCHEMA") && json.containsKey("SELRECT") && json.containsKey("TABLE"))
					  && (!"".equals(json.getString("SCHEMA")) && !"".equals(json.getString("SELRECT")) && !"".equals(json.getString("TABLE"))) ) {
				
				String pSchema = RequestKey.KOSTAT;
				Schema = StringEscapeUtils.escapeSql(json.getString("SCHEMA"));
		    	sel_tbl = Schema + "." + StringEscapeUtils.escapeSql(json.getString("TABLE"));
				
		    	String pol_tbl = "";
				String pol_cd_col = "";
				String pol_nm_col = "";
		    	
				if( "1".equals(json.getString("SELRECT")) ){
					
					String admType = json.getString("ADMTYPE");
					
					if("sido".equals(admType)) {
						pol_tbl = "bnd_sido_pg"; 
						pol_cd_col = "sido_cd";
						pol_nm_col = "sido_nm";
					} else if("sgg".equals(admType)) {
						pol_tbl = "bnd_sigungu_pg"; 
						pol_cd_col = "sigungu_cd";
						pol_nm_col = "sigungu_nm";
					} else if("dong".equals(admType)) {
						pol_tbl = "bnd_adm_dong_pg"; 
						pol_cd_col = "adm_dr_cd";
						pol_nm_col = "adm_dr_nm";
					} else if("totaloa".equals(admType)) {
						pol_tbl = "bnd_total_oa_pg"; 
						pol_cd_col = "adm_dr_cd";
						pol_nm_col = "adm_dr_nm";
					}
					
					query = " select ST_AsGeoJson(geom) geodata, gid, data, legend, ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y "
						  +  " from " + sel_tbl
						  +  " where data != 0";
				}
				
				result = client.executeRawQuery( Schema, query );
			} else {
				return "{\"success\":\"false\", \"reason\":\"입력값에 오류가 발생했습니다.\"}";
			}
			
			return result;
			
		} catch (SystemFailException e) {
			logger.info(e.getMessage());	
			return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 발생1"+"\"}";
		} catch (Exception e) {
			logger.info(e.getMessage());	
			return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 발생2"+"\"}";
		}
		
	}

	
	/**
	 * <pre>
	 * 데이터 조건 =>> SQL WHERE조건으로 변경
	 * </pre>
	 * @param JSONArray condition_list
	 * @return where
	 */
	public JSONObject whereMake( JSONArray condition_list ){
		
		JSONObject whereStateJSO = new JSONObject();
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("EQUAL_TO", 				"=");
		map.put("NOT_EQUAL_TO", 			"!=");
		map.put("LESS_THAN", 				"<");
		map.put("GREATER_THAN", 			">");
		map.put("LESS_THAN_OR_EQUAL_TO", 	"<=");
		map.put("GREATER_THAN_EQUAL_TO", 	">=");
		map.put("LIKE", 					"LIKE");
		
		String where = "";
		final String SPACE = " ";
		
		boolean parenthesis = false;
		
		for (int i = 0; i < condition_list.size(); i++) {
			JSONObject item = condition_list.getJSONObject(i);

			if( item.has("COLUMN") && !"".equals(item.getString("COLUMN")) ){
				
				String column = "base_year".equals(QueryUtil.cleanStr( item.getString("COLUMN"))) ? "b.base_year" : QueryUtil.cleanStr( item.getString("COLUMN"));
				
				String condition = QueryUtil.cleanStr( ( item.has("CONDITION") ? item.getString("CONDITION") : "" ) );
				String relational_operator = QueryUtil.cleanStr( item.getString("RELATIONAL_OPERATOR") );
				String conditional = QueryUtil.cleanStr( item.getString("CONDITIONAL_OPERATOR") );

				/**
				 * 데이터조건으로 선택한 column is 존재
				 */
				if( item.getString("RANGE").equalsIgnoreCase("VALUE") ){
					
					if( relational_operator.equalsIgnoreCase( "LIKE" ) ){
						where += "CAST(" + column + " AS TEXT)";
						where += SPACE + "LIKE" + SPACE + "'%'||";
					} else {
						where += column;
						where += SPACE + map.get( relational_operator );
					}
					
					where += SPACE + "'" + QueryUtil.cleanStr(condition) + "'";
					
					if( relational_operator.equalsIgnoreCase( "LIKE" ) ){
						where += SPACE + "||'%'";
					}
					
				} else {
					where += column;
					
					String min = ( item.has("MIN") ? item.getString("MIN") : "0" );
					String max = ( item.has("MAX") ? item.getString("MAX") : "0" );
					
					if( !( isStringDouble( min ) ) ){
						min = "0";
					}
					
					if( !( isStringDouble( max ) ) ){
						max = "0";
					}
					
					where += SPACE + "BETWEEN";
					where += SPACE + QueryUtil.cleanStr( min ) + SPACE + "AND" + SPACE + QueryUtil.cleanStr( max );
				}
			
				if( conditional.equalsIgnoreCase("PARENTHESIS_AND") 
						|| conditional.equalsIgnoreCase("PARENTHESIS_OR") ){
					
					String andor = conditional.replaceAll("PARENTHESIS_", "");
					
					if( condition_list.size() != (i+1) ){
						where += ")" + SPACE + andor + SPACE + "(";
					}
					
					parenthesis = true;
					
				} else {
					if( condition_list.size() != (i+1) ){
						where += SPACE + conditional + SPACE;
					}
				}
			}
		}
		
		if( parenthesis ){
			where = "(" + QueryUtil.cleanStr(where) + ")";
		}
		
		whereStateJSO.put("MANUAL", where);
		
		return whereStateJSO;
	}
	
	/**
	 * <pre>
	 * 문자열이 숫자형인지 체크
	 * </pre>
	 * @param String s
	 * @return boolean
	 */
	public static boolean isStringDouble(String s) {
		try {
			Double.parseDouble(s);
			return true;
		} catch (NumberFormatException e) {
			return false;
	    }
	}
	
	/**
	 * 
	 * @param iQryCond
	 * @param column_name
	 * @param checkFg
	 * @return
	 * @throws SystemFailException
	 */
	public boolean selectTabInfo (DenseAnalysis iQryCond, String column_name) throws SystemFailException{
		
		boolean rtnVal = false;
		
		int rtnCnt = 0;
		
		String query = "";
		String space = " ";
		String where_txt = "";
		String target_tab = iQryCond.getData_table_schema()+"."+iQryCond.getData_name();
		if( iQryCond.getObject() != null && !"".equals(iQryCond.getObject().toString()) ){
			where_txt = iQryCond.getObject().get("MANUAL").toString();
		}
		
		//원천테이블 분석조건 데이터 count
		if( "count_checked".equals(column_name) ){
			
			query = "select count(*) as cnt from " + target_tab ;
			
			// 데이터조건에 base_year 필드 alias 존재시 제거
			if( where_txt != null && !"".equals(where_txt) ){
				if(where_txt.indexOf("b.") >= 0 && where_txt.indexOf("base_year") >= 0){
					where_txt = where_txt.substring(where_txt.indexOf("base_year"), where_txt.length());
				}
				query += space + "where"+ space + where_txt  ;
			}
		// 원천테이블 필드존재여부
		} else {
			query = "select count(column_name) as cnt from INFORMATION_SCHEMA.COLUMNS" 
			          +" where table_name = '" + iQryCond.getData_name() + "' and column_name='"+ column_name +"' ";
		}
		
		//TODO : resouece 대상 table desc조회
		String rtnDesc= client.executeRawQuery( RequestKey.POSTGRE.toString(), query );
		
		JSONObject tableDesc =  (JSONObject) JSONSerializer.toJSON(rtnDesc);
		JSONObject descObj = tableDesc.getJSONObject("MESSAGE");
		
		JSONArray columnAry = descObj.getJSONArray("VALUE");
		 
		if (columnAry != null) {
			JSONObject row = columnAry.getJSONObject(0);
			rtnCnt = Integer.parseInt(row.getString("cnt"));
			
			if( "count_checked".equals(column_name) ){
				if( iQryCond.getCheckCnt() > 0 && rtnCnt > iQryCond.getCheckCnt() ){
					rtnVal = true;
				}
				if( rtnCnt == 0){
					throw new SystemFailException("데이터 조건에 해당하는 데이터가 0건 입니다.<br/> 데이터조건을 다시 설정하여 실행하시기 바랍니다.");
				}
			} else {
				if( rtnCnt > 0 ){
					rtnVal = true;
				}
			}
		}
		
		return rtnVal;
	}
	/**
	 * <pre>
	 * 테이블 필드에 xy 정보 존재여부 확인
	 * </pre>
	 * @param iQryCond
	 * @param column_name
	 * @param checkFg
	 * @return
	 * @throws SystemFailException
	 */
	public boolean existsPolColumn (DenseAnalysis iQryCond) throws SystemFailException{
		
		boolean rtnVal = false;

		JSONObject tmpJson = null;
		JSONObject json = (JSONObject) JSONSerializer.toJSON(iQryCond.getPos_column_desc());
		
		String pos_method = "";
		String pos_columns = "";
		String x_col = "";
		String y_col = "";
		if(json != null){
			
			JSONArray tAry = JSONArray.fromObject(json.getString("pos_col_infos"));
			
			for(Object obj : tAry){
				tmpJson = (JSONObject)obj;
				pos_method = tmpJson.get("pos_method").toString().replaceAll(" ","").trim();
				pos_columns = tmpJson.get("pos_columns").toString();
				
				if( !"".equals(pos_method)){
					if(pos_method.indexOf("XY") >= 0 ){
						x_col = pos_columns.split(",")[0];
						y_col = pos_columns.split(",")[1];
					}
				}
			}
			
			if( selectTabInfo(iQryCond, x_col) || selectTabInfo(iQryCond, y_col) ){
				rtnVal = true;
			}
		}
		
		return rtnVal;
	}
	
	
	/**
	 * <pre>
	 * 밀집 배치 데이터
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getBatchSpaDense( JSONObject json, String userid) throws SystemFailException{
		
		String result = "";
		String Schema = userid;
		String query = "";
		String table ="";
		String action_type ="";
		String pol_tbl = "";
		String pol_cd_col = "";
		String pol_nm_col = "";

		try{
			if ( 
				 ( !json.containsKey("TABLE_NM") || !json.containsKey("TABLE_SCHEMA") ) && 
				 ( 
				   json.getString("TABLE_NM") == null  || json.getString("TABLE_NM").equalsIgnoreCase("") ||
				   json.getString("TABLE_SCHEMA") == null  || json.getString("TABLE_SCHEMA").equalsIgnoreCase("")
				  )
			   )
			{
				return "{\"success\":\"false\", \"reason\":\"입력값에 오류가 발생했습니다.\"}";
				
			}
			
			if( json.containsKey("TABLE_NM") &&  json.containsKey("TABLE_SCHEMA") && json.containsKey("ACTION_TYPE") ) {
					
		/*			
			ADMIN_ANALY_SIDO    | 행정경계     | 행정경계(시도)
			ADMIN_ANALY_SGG     | 행정경계     | 행정경계(시군구)
			ADMIN_ANALY_DONG    | 행정경계     | 행정경계(읍면동)
			ADMIN_ANALY_TOT     | 행정경계     | 행정경계(집계구)
			DENSITY_ANALY_SIDO  | 군집분석     | 군집분석(시도)
			DENSITY_ANALY_SGG   | 군집분석     | 군집분석(시군구)
			DENSITY_ANALY_DONG  | 군집분석     | 군집분석(읍면동)
			DENSITY_ANALY_TOT   | 군집분석     | 군집분석(집계구)
			MYDATA_ANALY        | 임의영역     | 임의영역
			SPACE_ANALY         | 공간산관분석 | 공간산관분석
		*/			
				table = json.getString("TABLE_SCHEMA") + "." + json.getString("TABLE_NM");
				action_type = json.getString("ACTION_TYPE");
				
				String pSchema = RequestKey.KOSTAT;
				
				if( action_type != null ){
					//행정 시도
					if("DENSITY_ANALY_SIDO".equals(action_type)){
						pol_tbl = "bnd_sido_pg";
						pol_cd_col = "sido_cd";
						pol_nm_col = "sido_nm";
					//시군구
					} else if ("DENSITY_ANALY_SGG".equals(action_type)){
						pol_tbl = "bnd_sigungu_pg";
						pol_cd_col = "sigungu_cd";
						pol_nm_col = "sigungu_nm";
					//읍면동
					} else if ("DENSITY_ANALY_DONG".equals(action_type)){
						pol_tbl = "bnd_adm_dong_pg"; 
						pol_cd_col = "adm_dr_cd";
						pol_nm_col = "adm_dr_nm";
					//집계구
					} else if ("DENSITY_ANALY_TOT".equals(action_type)){
						pol_tbl = "bnd_total_oa_pg"; 
						pol_cd_col = "adm_dr_cd";
						pol_nm_col = "adm_dr_nm";
					}
					
					query = "select distinct on(geom) row_number() over ( ORDER BY data desc ) as rank, ST_AsGeoJson(geom) geodata, gid, round(data::numeric, 1) as summary, legend, ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y, round(cast(data/(ST_Area(geom)/1000000) as numeric),1) as data"
						  +  " from " + table +" "
						  +  " where data != 0 limit 1000";
					
					result = client.executeRawQuery( Schema, query );
				} else {
					return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 발생 "+"\"}";
				}
			}
			
		} catch (SystemFailException e) {
			logger.info(e.getMessage());	
			return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 발생 SystemFailException"+"\"}";
		} catch (Exception e) {
			logger.info(e.getMessage());	
			return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 발생 Exception"+"\"}";
		}
		return result;
		
	}

	/**
	 * 군집분석 결과 데이터 조회
	 * @param resource_id
	 * @return
	 * @throws SystemFailException 
	 */
	public String getCrowdAnalysisResults( String schema, String table ) throws SystemFailException {
		
		String query = String.format( " SELECT * FROM  %s.%s LIMIT %d" , 
				schema, 
				table, 
				MAX_CROWD_ANALYSIS_CNT ); 

		return client.executeRawQuery( RequestKey.POSTGRE.toString(), query );
		
	}
	
	/**
	 * <pre>
	 * 밀집분석 배치
	 * </pre>
	 * @param json
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject getBatchAnalyzeDense(JSONObject json) throws SystemFailException {
		
		JSONObject res = new JSONObject();
		String tmpTbl = "";
		
		try{
			if ( ( !json.containsKey("TABLE_NM") && !json.containsKey("TABLE_SCHEMA") )||  
				  json.getString("TABLE_NM") == null      || "".equals(json.getString("TABLE_NM")) ||
				  json.getString("TABLE_SCHEMA") == null  || "".equals(json.getString("TABLE_SCHEMA")) )
			{
				throw new SystemFailException("입력값에 오류가 발생했습니다.");
				
			} else{			
				tmpTbl = json.getString("TABLE_SCHEMA") + "." + json.getString("TABLE_NM");
			}

			
			//======================================================
			String chkQry = "select count(*) as cnt from " + tmpTbl;
			String rtnRaw = client.executeRawQuery( RequestKey.POSTGRE.toString(), chkQry );
			
			JSONObject dataCnt =  (JSONObject) JSONSerializer.toJSON(rtnRaw);
			JSONObject cntObj = dataCnt.getJSONObject("MESSAGE");
			
			JSONArray values = cntObj.getJSONArray("VALUE");
			String chkCnt = "";
			if (values != null) {
				JSONObject row = values.getJSONObject(0);
				chkCnt = row.getString("cnt");
			}
			
			res.put("chkCnt", chkCnt);

			if (Integer.parseInt(chkCnt) > 1000) {
				String getQry = "select ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y from " + tmpTbl +"  limit 1";
				
				String getRaw = client.executeRawQuery( RequestKey.POSTGRE.toString(), getQry );
				
				JSONObject getObj =  (JSONObject) JSONSerializer.toJSON(getRaw);
				JSONObject msgObj = getObj.getJSONObject("MESSAGE");
				
				res.put("chkCnt", "" + chkCnt);
				
				values = null;
				values = msgObj.getJSONArray("VALUE");
				if (values != null) {
					JSONObject row = values.getJSONObject(0);
					res.put("x",  row.getString("x"));
					res.put("y",  row.getString("y"));
				}
			}
			 
			String legQry = "  SELECT ntile AS grade, CAST(max(data) AS double precision) AS max, CAST(min(data) AS double precision) AS min " 
					         + "  FROM (SELECT data, ntile(5) OVER (ORDER BY data) AS ntile "
					         + "         FROM " +tmpTbl + "  WHERE data != 0) AS x "
					         + "  GROUP BY ntile ORDER BY ntile";
			
			String rtnSelect = client.executeRawQuery( RequestKey.POSTGRE.toString(), legQry );
			
			JSONObject dataLegend =  (JSONObject) JSONSerializer.toJSON(rtnSelect);
			JSONObject obj = dataLegend.getJSONObject("MESSAGE");
			JSONArray  legVal = obj.getJSONArray("VALUE");
			
			res.put("LEGEND", legVal);
			res.put("ANALY_RLT_VIEW", true);
			res.put("RESULT", dataLegend.getString("RESULT"));
			
		
		} catch (NumberFormatException e) {
			logger.info(e.getMessage());
			return res;
		}
	    
		return res;
	}
	
	/**
	 * 좌표 컬럼 정보 조회
	 * @param pos_column_desc
	 * @return
	 */
	private HashMap<String,Object> getColumnMap( JSONObject pos_column_desc ){
		
		HashMap<String,Object> columnMap = new HashMap<String,Object>();
		columnMap.put( "x_col", "" );
		columnMap.put( "y_col", "" );
		columnMap.put( "geom_col", "" );
		columnMap.put( "tot_oa_col", "" );
		
		if( pos_column_desc != null){
			
			JSONArray tAry = JSONArray.fromObject( pos_column_desc.getString("pos_col_infos") );
			
			for ( int i = 0, size = tAry.size(); i < size; i++ ){
				
				JSONObject tmpJson = tAry.getJSONObject(i);
				
				String pos_method = tmpJson.get("pos_method").toString().replaceAll(" ","").trim();
				String pos_columns = tmpJson.get("pos_columns").toString();
				
				if( !"".equals( pos_method ) ){
					
					if( pos_method.indexOf("XY") >= 0 ){
						
						String x_col =  pos_columns.split(",")[0];
						String y_col =  pos_columns.split(",")[1];
						
						columnMap.put( "x_col", x_col );
						columnMap.put( "y_col", y_col );
						
					}else if( "GEOMETRY".equals(pos_method) ){
						
						String geom_col = pos_columns;
						columnMap.put( "geom_col", "" );
						
					}else if( "행정구역코드".equals(pos_method)){
						
						String tot_oa_col = pos_columns;
						columnMap.put( "tot_oa_col", "" );
						
					}
					
				}
			}
			
			 
		}
		
		return columnMap;
	}
	
	boolean arrayDataMakeWhereQuery(JSONArray censusColumnArray, JSONObject tmpJson) {

		String query = " 1=1 ";
		String ageQuery = "";
		String year = "";
		
		for (int columnLength = 0; columnLength < censusColumnArray.size(); columnLength++) {
			JSONObject columnObj = censusColumnArray.getJSONObject(columnLength);
			Object valueO = columnObj.get("value");
			String key = columnObj.getString("key");
			if (key.equals("year")) year = valueO.toString();
		}

		for (int columnLength = 0; columnLength < censusColumnArray.size(); columnLength++) {

			JSONObject columnObj = censusColumnArray.getJSONObject(columnLength);

			//Object valueO = columnObj.get("value");
			String key = columnObj.getString("key");
			
			// String value = columnObj.getString("value");
			String value = columnObj.getString("value");
			try {
				logger.info(key + "," + value);
				
				tmpJson.put(key, value);
				//[{"key":"depth1","value":"ALL_COMPANY"},{"key":"depth2","value":"INDUSTRY"},{"key":"class_code","value":"I"},
				//{"key":"year","value":"2015"},{"key":"targetSelect","value":"COMPANY"},{"key":"area_type","value":"0"}]
				if (key.equalsIgnoreCase("age_from")) {
					ageQuery = " AND age between '" + value + "' and " + ageQuery;
				} else if (key.equalsIgnoreCase("age_to")) {
					ageQuery = ageQuery + "'" + value + "'";
				} else if (key.equalsIgnoreCase("area_type")) {
					// 키값 왜 있는건지 모르겠음... 쓰는곳 없음
				} else if (key.equalsIgnoreCase("gender")) {
					if (value.equals("0")) {
						continue;
					} else {
						query += this.makeQuery(value, "gender");
					}
				} else if (key.equalsIgnoreCase("ocptn_type")) {
					query += this.makeQuery(value, "OCPTN_2_TYPE");
				} else if (key.equalsIgnoreCase("class_code")) {
					// 사업체 일때 값 길이 체크 해서 컬럼명 정해줘야함
					// ksic_1_cd ksic_2_cd ksic_3_cd ksic_4_cd ksic_5_cd
					// 근데 문제가 있음, 사업체수인지 종사자수인지 값이 안넘어옴
					int valueSize = value.length();
					if (valueSize == 1) {
						query += this.makeQuery(value, "ksic_" + valueSize + "_cd");
					} else {
						value = value.substring(1, value.length());
						query += this.makeQuery(value, "ksic_" + (valueSize - 1) + "_cd");
					}
	
				} else if (key.equalsIgnoreCase("theme_cd")) {
	
					if (year.equals("2000") || year.equals("2001")
							|| year.equals("2002") || year.equals("2003")
							|| year.equals("2004") || year.equals("2005")) {
						tmpJson.put("errorMsg", "사업체 테마업종은 2016년 데이터부터 가능합니다.");
						return false;
					}
	
					// 컬럼명 theme_biz_cd 이거여야함
	 				query += this.makeQuery(value, "theme_biz_cd");
				} else if (key.equalsIgnoreCase("house_type")) {
					// 컬럼명 RESID_1_TYPE 이거여야함
					query += this.makeQuery(value, "RESID_1_TYPE");
				} else if (key.equalsIgnoreCase("house_area_cd")) {
					if (!year.equals("2015")) {
						tmpJson.put("errorMsg", "주택 연면적은 2015년 데이터만 가능합니다.");
						return false;
					}
					// 컬럼명 house_region_cd 이거여야함
					query += this.makeQuery(value, "house_region_cd");
				} else if (key.equalsIgnoreCase("household_type")) {
					if (year.equals("2015")) {
						tmpJson.put("errorMsg", "2015년 데이터는 세대구성 조회가 불가능합니다.");
						return false;
					}
					// 컬럼명 RD_HOUSEHOLD_TYPE 이거여야함
					query += this.makeQuery(value, "RD_HOUSEHOLD_TYPE");
				} else if (key.equalsIgnoreCase("EDU_LEVEL")
						|| key.equalsIgnoreCase("MRG_STATE")
						|| key.equalsIgnoreCase("CONST_YEAR")
						|| key.equalsIgnoreCase("HOUSE_USE_PRID_CD")) {
					query += this.makeQuery(value, key);
				} else {
					// query += this.makeQuery(value, key);
					// 테이블 조건생성에 필요하지 않는 키는 쿼리로 생성하지 않음, 혹시나 빠지는게 있을까봐 키 벨류 확인하려고 로그
					// 넣어놨음
					logger.info("**************************키 없어서 못들어갔어요 확인해 주세용~~!!!! 키 : "
							+ key + " 값 : " + value);
				}
			} catch(Exception e) {
				logger.info(e.getMessage());
			}
		}
		query = query + ageQuery;
		tmpJson.put("query", query);
		return true;
	}

	String makeQuery(String vlaue, String columnName) {
		String query = "";

		boolean andConditionB = false;
		String[] valueList = vlaue.split(",");

		if (valueList.length < 2)
			andConditionB = true;

		boolean firstFlag = true;
		for (int valueListLen = 0; valueListLen < valueList.length; valueListLen++) {
			if (andConditionB) {
				query += " AND " + columnName + "='" + valueList[valueListLen]
						+ "'";
			} else {

				if (firstFlag) {
					query += " AND (" + columnName + "='"
							+ valueList[valueListLen] + "'";
					firstFlag = false;
				} else {
					if (valueListLen + 1 == valueList.length) {
						query += " OR " + columnName + "='"
								+ valueList[valueListLen] + "')";
					} else {
						query += " OR " + columnName + "='"
								+ valueList[valueListLen] + "'";
					}
				}

			}
		}
		return query;
	}
	
	private String getDateNum() {
		StringBuffer dateNum = null;
		Calendar cal = Calendar.getInstance();

		dateNum = new StringBuffer();
		dateNum.append(cal.get(Calendar.YEAR));
		
		dateNum.append(String.format("%02d", cal.get(Calendar.MONTH)+1));
		dateNum.append(String.format("%02d", cal.get(Calendar.DAY_OF_MONTH)));
		dateNum.append(String.format("%02d", cal.get(Calendar.HOUR_OF_DAY)));
		dateNum.append(String.format("%02d", cal.get(Calendar.MINUTE)));
		dateNum.append(String.format("%02d", cal.get(Calendar.SECOND)));
		dateNum.append(String.format("%03d", cal.get(Calendar.MILLISECOND)));


		String num = "";
		int randomNum = 0;
		
		for(int i=0; i<10; i++){
			try {
				// 랜덤 객체 생성
				SecureRandom rnd = new SecureRandom();
				
				randomNum = rnd.nextInt(10);
				
			} catch (ArithmeticException e) {
				logger.error(e.getMessage());
			}
			num += String.valueOf(randomNum);
		}
		return dateNum.toString() + num; 
    }
}
 