package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.DenseAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisUtils;
import kostat.lbdms.ServiceAPI.controller.service.LocalSpaceSelfAnalysisService;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Service("localSpaceSelfAnalysisService")
public class LocalSpaceSelfAnalysisServiceImpl extends EgovAbstractServiceImpl implements LocalSpaceSelfAnalysisService {
	private static final Logger logger = LoggerFactory.getLogger(LocalSpaceSelfAnalysisService.class);
	
	@Resource(name="postgreCommandClient")
	private PostgreCommandClient client;
	
	public JSONObject analyze(DenseAnalysis data, JSONArray conditions) throws SystemFailException {
		try {
			JSONObject tableCheckResponse;
			
			tableCheckResponse = this.checkResourceTable(data);
			
			if(!"SUCCESS".equals(tableCheckResponse.get("RESULT"))) {
				logger.debug( ""+ tableCheckResponse.get("RESULT"));
				tableCheckResponse.put("MESSAGE", "테이블이 이미 존재합니다");
				return tableCheckResponse;
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new SystemFailException(e.getMessage());
		}
		
		// 파라미터 생성
		try {
			HashMap<String, Object> parameters;
			HashMap<String, Object> analysisParameters;
			
			analysisParameters = this.parseConditionArray(conditions);
			
			parameters = this.createParameters(data, conditions);
			parameters = this.setAnalysisParameters(parameters, analysisParameters, false);
			parameters = this.setDataParameters(data, parameters);
			
			this.sendAnalysisLog(analysisParameters, data.getUserid(), data.getResult_table_name());
			
			return new RestService().call(Command.ANALYSIS, Command.R_ANALYSIS, parameters);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new SystemFailException(e.getMessage());
		}
	}
	
	private void sendAnalysisLog(HashMap<String, Object> analysisParameters, String userId, String result) throws Exception, SystemFailException {
		HashMap<String, String> logData;
		
		logData = new HashMap<String, String>();
		
		logData.put("user_id", userId);
		logData.put("result_data_nm", result);
		logData.put("analysis_type", "경계분석");
		logData.put("req_year", String.valueOf(analysisParameters.get("YEAR")));
		logData.put("depth1", String.valueOf(analysisParameters.get("DEPTH1")));
		logData.put("depth2", String.valueOf(analysisParameters.get("DEPTH2")));
		
		String logQry = "insert into sgis_use_log (reg_user_id, analysis_type, req_year, depth1, depth2, result_data_nm) values ";
		logQry += "('" +userId+ "','경계분석','" +
		String.valueOf(analysisParameters.get("YEAR"))+ "','" + String.valueOf(analysisParameters.get("DEPTH1"))+ "','" 
				+String.valueOf(analysisParameters.get("DEPTH2"))+ "','" +result+ "')";
		//logger.info(logQry);
		client.executeRawQueryByPgSystem( RequestKey.POSTGRE.toString(), logQry );
	}
	
	private HashMap<String, Object> setAnalysisParameters(
			HashMap<String, Object> parameters,
			HashMap<String, Object> analysisParameters,
			boolean isCorp) throws Exception {
		
		String prefix;
		
		prefix = (isCorp) ? "CORP_" : "";
		
		if (String.valueOf(analysisParameters.get("DEPTH1")) != null) {
			parameters.put(prefix + "DEPTH1", String.valueOf(analysisParameters.get("DEPTH1")));
		}
		
		if (String.valueOf(analysisParameters.get("DEPTH2")) != null) {
			parameters.put(prefix + "DEPTH2", String.valueOf(analysisParameters.get("DEPTH2")));
		}
		
		if (String.valueOf(analysisParameters.get("YEAR")) != null) {
			parameters.put(prefix + "YEAR", String.valueOf(analysisParameters.get("YEAR")));
		}
		
		if (String.valueOf(analysisParameters.get("TARGET_SELECT")) != null) {
			parameters.put(prefix + "TARGET_SELECT", String.valueOf(analysisParameters.get("TARGET_SELECT")));
		}
		
		return parameters;
	}
	
	private JSONObject createResultCalculateMethod(DenseAnalysis data) throws Exception {
		JSONObject rcJSO = new JSONObject();
		
		if (data.getRm() == null || data.getRm().equals("")) {
			rcJSO.put("RESULT_MODE", "count" );
			rcJSO.put("RESULT_COLUMN", "*");
		} else {
			if (StringUtils.equalsIgnoreCase(data.getRm(), "count")) {	
				rcJSO.put("RESULT_MODE", data.getRm() );
				rcJSO.put("RESULT_COLUMN", "*");
			} else {
				rcJSO.put("RESULT_MODE", data.getRm() );
				if (data.getSumfield() == null || data.getSumfield().equals("")) {			
					rcJSO.put("RESULT_COLUMN", null);
				} else {
					rcJSO.put("RESULT_COLUMN", StringEscapeUtils.escapeSql(data.getSumfield()) );
				}	
			}	
		}
		
		return rcJSO;
	}

	private HashMap<String, Object> setMyDataParameters(
			HashMap<String, Object> parameters,
			DenseAnalysis data) throws Exception {
		
		if (data.getResource_id() == null
			|| data.getResource_id().equals("")) {
			
			return parameters;
		}
		
		try {
			HashMap<String, Object> pos;
			
			pos = this.getPosProperties(data);
			
			if (this.selectTabInfo(data, "geom")
				&& !String.valueOf(pos.get("tot_oa_col")).equals("")) {
				
				parameters.put("ANALYSIS_WAY", "GEOM");
				parameters.put("MY_DATA_GEOM_COLUMN", String.valueOf(pos.get("geom_col")));
			} else {
				parameters.put("MY_DATA_GEOM_COLUMN", "");
				
				if(selectTabInfo(data, String.valueOf(pos.get("x_col")))
					&& selectTabInfo(data, String.valueOf(pos.get("y_col")))
					&& !String.valueOf(pos.get("x_col")).equals("")
					&& !String.valueOf(pos.get("y_col")).equals("")) {
					
					parameters.put("ANALYSIS_WAY", "XY");
					parameters.put("POINT_X", String.valueOf(pos.get("x_col")));
					parameters.put("POINT_Y", String.valueOf(pos.get("y_col")));
				}else{
					parameters.put("POINT_X", "");
					parameters.put("POINT_Y", "");
				}
			}
			
			return parameters;
		} catch (SystemFailException e) {
			logger.error(e.getMessage(), e);
			throw new Exception(e.getMessage());
		}
	}
	
	private boolean selectTabInfo(DenseAnalysis iQryCond, String column_name) throws SystemFailException{
		
		boolean rtnVal = false;
		try {
			
			int rtnCnt = 0;
			
			String query = "";
			String space = " ";
			String where_txt = "";
			String target_tab = iQryCond.getData_table_schema()+"."+iQryCond.getData_name();
			if( iQryCond.getObject() != null && !"".equals(iQryCond.getObject().toString()) ){
				where_txt = iQryCond.getObject().get("MANUAL").toString();
			}
			// 원천테이블 분석조건 데이터 count
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
			logger.info("query["+query+"]");
			
			//TODO : resouece 대상 table desc조회
			// String rtnDesc= new client.executeRawQuery( RequestKey.POSTGRE.toString(), query );
			String rtnDesc= client.executeRawQueryByPg( RequestKey.POSTGRE.toString(), query );
			
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
			
			logger.info("[param]>> table_nm[" + iQryCond.getData_name() +"] column[" + column_name + "] \n query [" + query + "] rtnCnt["+ rtnCnt + "]");
			
			
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		}
		
		return rtnVal;
	}
	
	private HashMap<String, Object> getPosProperties(DenseAnalysis data) throws Exception {
		String pos_method;
		String pos_columns;
		String x_col;
		String y_col;
		String tot_oa_col;
		String geom_col;
		JSONObject tempJson;
		HashMap<String, Object> posProperties;
		
		pos_method = null;
		pos_columns = null;
		x_col = null;
		y_col = null;
		tot_oa_col = null;
		geom_col = null;
		posProperties = new HashMap<String, Object>();

		if (data.getResource_id() != null) {

			JSONObject json = (JSONObject) JSONSerializer.toJSON(data.getPos_column_desc());

			if(json != null && json.containsKey("pos_col_infos")){

				JSONArray tAry = JSONArray.fromObject(json.getString("pos_col_infos"));

				for(Object obj : tAry){
					tempJson = (JSONObject) obj;
					pos_method = tempJson.get("pos_method").toString().replaceAll(" ","").trim();
					pos_columns = tempJson.get("pos_columns").toString();

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
		
		posProperties.put("pos_method", pos_method);
		posProperties.put("pos_columns", pos_columns);
		posProperties.put("x_col", x_col);
		posProperties.put("y_col", y_col);
		posProperties.put("tot_oa_col", tot_oa_col);
		posProperties.put("geom_col", geom_col);
		
		return posProperties;
	}
	
	private HashMap<String, Object> createParameters(DenseAnalysis data, JSONArray conditions) throws Exception {
		/**
		 * data.selstep
		 * 1: 사업체
		 * 2: 임의 POI
		 * 3: 사용자 데이터
		 * 4: 도로네트워크
		 */
		
		HashMap<String, Object> parameters;
		
		parameters = new HashMap<String, Object>();
		parameters.put(RequestKey.USER_ID, data.getUserid());
		parameters.put("EXECUTE_ID", data.getResource_id());
		parameters.put("USER_DIV", data.getUserdiv());
		parameters.put("RESULT_CALCULATION", this.createResultCalculateMethod(data));
		parameters.put("K_VALUE", data.getK_value());
		parameters.put("GEO_DATA_TYPE", "LOCAL_SPACE_ANALYSIS");
		parameters.put("CATEGORY4", "ANALYSIS_2016");
		parameters.put("BATCH_YN", true);
		
		// 테이블 정보 입력
		parameters = this.setPolygonTableInfo(parameters, data);
		
		// 결과 테이블 정보 입력
		parameters.put("RESULT_TABLE_SCHEMA", data.getUserid());
		parameters.put("RESULT_TABLE_NAME", data.getResult_table_name());
		parameters.put("DESCRIPTION", data.getResult_table_desc());
		
		// 데이터 선택 조건 설정
		if (conditions != null && !conditions.isEmpty()) {
			parameters = this.setConditionParameters(parameters, conditions);
		}
		
		if (data.getData_name() != null) {
			parameters.put("DATA_TABLE", data.getData_name());
			parameters.put("DATA_TABLE_SCHEMA", data.getData_table_schema());
		} else {
			parameters.put("DATA_TABLE", null);
			parameters.put("DATA_TABLE_SCHEMA", "kostat");
		}
		
		parameters = this.setMyDataParameters(parameters, data);
		
		logger.info("+++++++++++++++++ parameters +++++++++++++++++");
		logger.info(parameters.toString());
		logger.info("+++++++++++++++++ parameters +++++++++++++++++");
		
		return parameters;
	}
	private HashMap<String, Object> setConditionParameters(
			HashMap<String, Object> parameters,
			JSONArray conditions) throws Exception {
		
		AnalysisUtils utils = new AnalysisUtils();
		
		parameters.put("CONDITION", conditions);
		parameters.put("WHERE_STATEMENT", utils.createCensusWhereClause(conditions));
		
		return parameters;
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
	
	private HashMap<String, Object> setDataParameters(
			DenseAnalysis data,
			HashMap<String, Object> parameters) throws Exception {
		
		if (String.valueOf(parameters.get("DEPTH2")).equals("INDUSTRY")
			|| String.valueOf(parameters.get("DEPTH2")).equals("THEME")) {
			
			String userId;
			String compTempTbl;
			userId = String.valueOf(parameters.get("USER_ID"));
			compTempTbl = "space_comp_" + this.getDateNum();
			
			
			HashMap<String,Object> req = new HashMap<String,Object>();
			req.put("cols", "gid,corp_nm,x,y"); 
			req.put("user_id", userId);
			req.put("data_table_schema", userId);
			
			req.put("data_name","sti_comp_info_" + String.valueOf(parameters.get("YEAR")));
			req.put("qrycondition", String.valueOf(parameters.get("WHERE_STATEMENT")));
			
			// 코드 값 설정
//			if (denseAnalysis.getArea_cd().length() == 2 ){
//				req.put("code", denseAnalysis.getArea_cd() );
//				req.put("code_col", "sido_cd" );
//				req.put("target_table", "kostat.bnd_sido_pg" );
//			} else if ( denseAnalysis.getArea_cd().length() == 5){
//				req.put("code", denseAnalysis.getArea_cd() );
//				req.put("code_col", "sigungu_cd" );
//				req.put("target_table", "kostat.bnd_sigungu_pg" );
//			} else {
//				req.put("code", denseAnalysis.getArea_cd() );
//				req.put("code_col", "adm_dr_cd" );
//				req.put("target_table", "kostat.bnd_adm_dong_pg" );
//			}
			
			req.put("code", String.valueOf(parameters.get("POLYGON_TABLE_KEY")));
			req.put("code_col", String.valueOf(parameters.get("GEO_DATA_CD_COLUMN")));
			req.put(
				"target_table",
				String.valueOf(parameters.get("POLYGON_TABLE_SCHEMA"))
				+ "." + String.valueOf(parameters.get("POLYGON_TABLE"))
			);
			
			logger.info("PARAM==============================================");
			logger.info( req.toString() );
			logger.info( "===================================================" );
			
			req.put("result_table", userId + "." + compTempTbl );
//			result = JSONArray.fromObject(crowdingAnalysisMapper.setIndustryResultTable(req));
			//String strQuery = "ALTER TABLE " + userId + "." + compTempTbl + " OWNER TO " + userId;
			
			parameters.put("SCHEMA", userId);
			parameters.put("X_COLUMN", "x");	
			parameters.put("Y_COLUMN", "y");
			parameters.put("ANALYSIS_COLUMN", "employee_cnt");
			parameters.put("TABLE_NAME", compTempTbl);
    	} else {
    		parameters.put("SCHEMA", data.getUserid());
			parameters.put("X_COLUMN", data.getLbdms_x());
			parameters.put("Y_COLUMN", data.getLbdms_y());
			parameters.put("ANALYSIS_COLUMN", data.getAnalysis_column());
			parameters.put("TABLE_NAME", data.getData_name());
    	}
		
		return parameters;
	}
	
	public String makeQuery(String vlaue, String columnName) {
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
	
	private HashMap<String, Object> setPolygonTableInfo(
			HashMap<String, Object> parameters,
			DenseAnalysis data) throws Exception {
		
		String type;
		
		type = this.getAdmTypeString(data.getAdmType());
		
		parameters.put("POLYGON_TABLE_SCHEMA", "kostat");
		parameters.put("ACTION_TYPE", "SPACE_ANALYSIS_" + type.toUpperCase());
		
		parameters = this.setPolygonTableInfoByType(type, data, parameters);
		
		return parameters;
	}
	
	private String getAdmTypeString(String type) throws Exception {
		switch (type) {
			case "totaloa": {
				return "total";
			}
			default: {
				return type;
			}
		}
	}
	
	private HashMap<String, Object> setPolygonTableInfoByType(
			String type,
			DenseAnalysis data,
			HashMap<String, Object> parameters) throws Exception {
		
		switch (type) {
			case "sido": {
				parameters.put("POLYGON_TABLE", "bnd_sido_pg");
				parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
				parameters.put("POLYGON_TABLE_KEY", null);
				break;
			}
			case "sgg": {
				parameters.put("POLYGON_TABLE", "bnd_sigungu_pg");
				parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");
				parameters.put("POLYGON_TABLE_KEY", data.getSido());
				break;
			}
			case "dong": {
				parameters.put("POLYGON_TABLE", "bnd_adm_dong_pg");
				
				if ("all".equalsIgnoreCase(data.getSgg())) {
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_TABLE_KEY", data.getSgg());
				} else {
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_TABLE_KEY", data.getSgg());
				}
				
				break;
			}
			case "total": {
				parameters.put("POLYGON_TABLE", "bnd_total_oa_pg");
				
				if ("all".equalsIgnoreCase(data.getDong())) {
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_TABLE_KEY", data.getSgg());
				} else {
					parameters.put("GEO_DATA_CD_COLUMN", "tot_oa_cd");
					parameters.put("POLYGON_TABLE_KEY", data.getDong());
				}
				
				break;
			}
			default: {
				return parameters;
			}
		}
		
		return parameters;
	}
	
	private HashMap<String, Object> parseConditionArray(JSONArray conditions) throws Exception {
		if (conditions == null) {
			return null;
		}
		
		int i;
		HashMap<String, Object> parsedCondition;
		
		parsedCondition = new HashMap<String, Object>();
		
		for (i = 0; i < conditions.size(); i++) {
			JSONObject condition;
			
			condition = (JSONObject) conditions.get(i);
			
			if ("depth1".equals(condition.get("key"))) {
				// depth1
				parsedCondition.put("DEPTH1", condition.get("value"));
			} else if ("depth2".equals(condition.get("key"))) {
				// depth2
				parsedCondition.put("DEPTH2", condition.get("value"));
			} else if ("year".equals(condition.get("key"))) {
				// year
				parsedCondition.put("YEAR", condition.get("value"));
			} else if ("targetSelect".equals(condition.get("key"))) {
				// target select
				parsedCondition.put("TARGET_SELECT", condition.get("value"));
			}
		}
		
		return parsedCondition;
	}
	
	private JSONObject checkResourceTable(DenseAnalysis data) throws Exception {
		HashMap<String, Object> parameters;
		
		parameters = new HashMap<String, Object>();
		parameters.put("USER_ID", data.getUserid());
		parameters.put("TABLE_NM", data.getResult_table_name());

		return new RestService().call(Command.RESOURCE, Command.TABLE_CHECK, parameters);
	}
}