package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import javax.annotation.Resource;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.util.QueryUtil;
import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.MyDataAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.controller.service.MyDataAnalysisService;
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
@Service("myDataAnalysisService")
public class MyDataAnalysisServiceImpl extends EgovAbstractServiceImpl implements MyDataAnalysisService {
	
//	@Autowired
//	private AnalysisCommandClient analysisCommandClient;
//	@Autowired
//	private PostgresService postgreService;
	private static final Logger logger = LoggerFactory.getLogger(MyDataAnalysisService.class);
	
	@Resource(name="postgreCommandClient")
	private PostgreCommandClient client;
	
	/**
	 * <pre>
	 * 분석조건에 따른 resource 데이터 분석 실행 (행정경계)
	 * </pre>
	 * @param resource_id
	 * @param data_table
	 * @param data_table_schema
	 * @param user_id
	 * @param condition_list
	 * @return
	 * @throws SystemFailException
	 */

	public JSONObject dataAnalysis(MyDataAnalysis myDataAnalysis, JSONArray condition_list)
			throws SystemFailException { 
		HashMap<String,Object> paramTableCk = new HashMap<String,Object>();
		
		JSONObject res = new JSONObject();
    	//JSONObject res = analysisCommandClient.dataAnalysis( myDataAnalysis, userid, condition_list);
		JSONObject tmpJson = null;
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		// USER_ID  ========================================
		parameters.put( RequestKey.USER_ID, myDataAnalysis.getUserid() );
		// DATA_TABLE  ========================================
		parameters.put( "DATA_TABLE", myDataAnalysis.getData_name() );		
		// RESOURCE_ID  ========================================
		parameters.put( "RESOURCE_ID", myDataAnalysis.getResource_id() );
		// DATA_TABLE_SCHEMA  ========================================
		parameters.put( "DATA_TABLE_SCHEMA", myDataAnalysis.getData_table_schema() );
		// USER 권한 분류
		parameters.put("USER_DIV", myDataAnalysis.getUserdiv());

		// WHERE_STATEMENT - 데이터조건선택   ========================================
		if(condition_list != null && !condition_list.isEmpty()){
			tmpJson = whereMake(condition_list);
			parameters.put( "WHERE_STATEMENT", tmpJson );
		}

		
		// BATCH_YN ========================
		// 2017.07.18 ischoi 배치분석만 있기때문에 true 로 처리
		// boolean bBatch = "Y".equals(myDataAnalysis.getBatch_yn()) ? true : false;
		boolean bBatch = true;
		
		//##########################################
		//배치분석예약 schedule command call!!
		/*if(bBatch){
			//HashMap<String,Object> scheParameter = new HashMap<String,Object>();	

			JSONObject json =  (JSONObject) JSONSerializer.toJSON(myDataAnalysis.getJsonStr());
			
			Schedule schedule = new Schedule();
			schedule.setTime_definition(json.getString("time_definition"));
			schedule.setStart_time(json.getString("start_date"));
			schedule.setEnd_time(json.getString("end_date"));
			schedule.setReqre_expect_time(json.getString("reqre_expect_time"));
			
			//res = restService.call(Command.SCHEDULE, Command.CRUD, Command.INSERT, scheParameter);
			//return res;
		}*/
		//##########################################
		
		parameters.put("BATCH_YN", bBatch);
		paramTableCk.put("USER_ID", myDataAnalysis.getData_table_schema());
		paramTableCk.put("TABLE_NM", myDataAnalysis.getResult_table_name());
		
		res = new RestService().call(Command.RESOURCE, Command.TABLE_CHECK, paramTableCk);
		
		if( !"SUCCESS".equals(res.get("RESULT")) ){
			logger.debug( ""+res.get("MESSAGE") );
			return res;
		}
		
		
		
		// 원천데이터 1000건이 넘는지 체크
		// 2017.07.18 ischoi 배치 분석으로 데이터 건수 체크  주석 처리
//		myDataAnalysis.setCheckCnt(1000);
//		myDataAnalysis.setObject(tmpJson);
//		boolean bRtnCnt = selectTabInfo(myDataAnalysis, "count_checked");
//		if(bRtnCnt && !bBatch){
//			throw new SystemFailException("분석 원천데이터의 건수가 1000건이 초과되었습니다.<br/> 배치분석을 실행하시기 바랍니다.");
//		}
		
		// RESULT_CALCULATION - 결과 산출방식  ========================================
		JSONObject rcJSO = new JSONObject();
		if (myDataAnalysis.getRm() == null || myDataAnalysis.getRm().equals("")) {
			rcJSO.put("RESULT_MODE", "count" );
			rcJSO.put("RESULT_COLUMN", "*");
		} else {
			if (StringUtils.equalsIgnoreCase(myDataAnalysis.getRm(), "count")) {	
				rcJSO.put("RESULT_MODE", myDataAnalysis.getRm() );
				rcJSO.put("RESULT_COLUMN", "*");
			} else {
				rcJSO.put("RESULT_MODE", myDataAnalysis.getRm() );
				if (myDataAnalysis.getSumfield() == null || myDataAnalysis.getSumfield().equals("")) {			
					rcJSO.put("RESULT_COLUMN", null);
				} else {
					rcJSO.put("RESULT_COLUMN", StringEscapeUtils.escapeSql(myDataAnalysis.getSumfield()) );
				}	
			}	
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

		if (myDataAnalysis.getResource_id() != null) {

			JSONObject json = (JSONObject) JSONSerializer.toJSON(myDataAnalysis.getPos_column_desc());

			if(json != null && json.containsKey("pos_col_infos")){

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



		
//		JSONArray array = existsPolColumn(myDataAnalysis);
//		
//		for(int i=0; i<array.size(); i++){
//			JSONObject tmp = array.getJSONObject(i);
//			System.out.println("column_name : " + tmp.getString("column_name") );
//		}

		/**
		 * 나의 데이터 있을 경우에만 나의 데이터 값 설정
		 */
		if(myDataAnalysis.getResource_id()!=null && !myDataAnalysis.getResource_id().equals("")) {
			
			//MY_DATA_GEOM_COLUMN  ========================================
			if(selectTabInfo(myDataAnalysis, "geom") && !geom_col.equals("") ){
				parameters.put("ANALYSIS_WAY", "GEOM");
				parameters.put("MY_DATA_GEOM_COLUMN", geom_col);
			}else{
				parameters.put("MY_DATA_GEOM_COLUMN", "");
				
				// POINT_X, POINT_Y ===========================================
				if(selectTabInfo(myDataAnalysis, x_col) && selectTabInfo(myDataAnalysis, y_col)
						&& !x_col.equals("") && !y_col.equals("") ){
					
					parameters.put("ANALYSIS_WAY", "XY");
					parameters.put("POINT_X", x_col);
					parameters.put("POINT_Y", y_col);
				}else{
					parameters.put("POINT_X", "");
					parameters.put("POINT_Y", "");
				}
			}
		}
		
		// GEO_DATA_TYPE, POLYGON_TABLE, GEO_DATA_CD_COLUMN, POLYGON_TABLE_KEY, POINT_X,POINT_Y ========================
		
		// 2-1.행정경계
		if( "1".equals(myDataAnalysis.getSelstep()) ){
			//GEO_DATA_TYPE =======================================
			parameters.put("GEO_DATA_TYPE", "ADMIN_DATA");
			
			// MY_DATA_CD_COLUMN ==========================================
			if(selectTabInfo(myDataAnalysis, tot_oa_col) && !tot_oa_col.equals("") ){
				parameters.put("ANALYSIS_WAY", "CODE");
				parameters.put("MY_DATA_CD_COLUMN", tot_oa_col);
			} else {
				parameters.put("MY_DATA_CD_COLUMN", "");
			}

 
			//분석단위
			String admType = myDataAnalysis.getAdmType();
			
			
			// POLYGON_TABLE  ========================================
			if("sido".equals(admType)) {
			//case "sido": // 전국(시도) 2 11, POLYGON_TABLE_KEY x
				parameters.put("POLYGON_TABLE", "bnd_sido_pg");
				parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
				parameters.put("ACTION_TYPE", "ADMIN_ANALY_SIDO");
				
			} 
			else if("sgg".equals(admType)) {
			//case "sgg": // 시군구 5 110235
				parameters.put("POLYGON_TABLE", "bnd_sigungu_pg");
				parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");

				if (!"all".equals(myDataAnalysis.getSido())) {
					parameters.put("POLYGON_TABLE_KEY", myDataAnalysis.getSido());
				}

				parameters.put("ACTION_TYPE", "ADMIN_ANALY_SGG");
				
			} 
			else if("dong".equals(admType)) {
			//case "dong": // 읍면동 7 11023501
				parameters.put("POLYGON_TABLE", "bnd_adm_dong_pg");
				parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
				if(myDataAnalysis.getSgg()!=null){
					if ("all".equals(myDataAnalysis.getSgg())) {
						parameters.put("POLYGON_TABLE_KEY", myDataAnalysis.getSido());
					} else {
						parameters.put("POLYGON_TABLE_KEY", myDataAnalysis.getSgg());
					}
				}else{
					parameters.put("POLYGON_TABLE_KEY", myDataAnalysis.getSido());
				}
				parameters.put("ACTION_TYPE", "ADMIN_ANALY_DONG");
				
			} 
			else if("totaloa".equals(admType)) {
			//case "totaloa": // 집계구 tot_oa_cd
				parameters.put("POLYGON_TABLE", "bnd_total_oa_pg");
				parameters.put("GEO_DATA_CD_COLUMN", "tot_oa_cd"); 
				
				String sido = myDataAnalysis.getSido();
				String sgg = myDataAnalysis.getSgg();
				String dong = myDataAnalysis.getDong();
				
				if(sido!=null && !"all".equals(sido)) {
					parameters.put("POLYGON_TABLE_KEY", sido);
				}
				if(sgg!=null && !"all".equals(sgg)) {
					parameters.put("POLYGON_TABLE_KEY", sgg);
				}
				if(dong!=null && !"all".equals(dong)) {
					parameters.put("POLYGON_TABLE_KEY", dong);
				}
				if (sgg!=null && "all".equals(sgg)) {
					parameters.put("POLYGON_TABLE_KEY", myDataAnalysis.getSido());
				}
				if (dong!=null && "all".equals(dong)) {
					parameters.put("POLYGON_TABLE_KEY", myDataAnalysis.getSgg());
				}		
				parameters.put("ACTION_TYPE", "ADMIN_ANALY_TOT");
			}
		}
		
		// 2-2.임의영역, 2-3 사용자경계선택 최근수정
		else if( "2".equals(myDataAnalysis.getSelstep()) || "3".equals(myDataAnalysis.getSelstep()) ){
			
			//GEO_DATA_TYPE =======================================
			parameters.put("GEO_DATA_TYPE", "MY_DATA");
			
			parameters.put("POLYGON_TABLE_SCHEMA", myDataAnalysis.getUserid()); 
			parameters.put("POLYGON_TABLE", myDataAnalysis.getData_name());
			//parameters.put("MAP_SEQ",   myDataAnalysis.getMap_seq());
			parameters.put("ACTION_TYPE", "MYDATA_ANALY");
			
		}
		
		/**
		 * 
		 * 
		 *  2018-11-08 KTK
		 *  Analyze By Hexagon Data
		 * 
		 * 
		 */

		else if ("4".equals(myDataAnalysis.getSelstep())) {
			parameters = this.setTableProperties(parameters, "HEXAGON", myDataAnalysis.getSpace_value());
			parameters = this.setSigunguProperties(parameters,
				"HEXAGON",
				myDataAnalysis.getAdmType(),
				myDataAnalysis.getSido(),
				myDataAnalysis.getSgg(),
				myDataAnalysis.getDong()
			);
		}
		
		/**
		 * 
		 * 
		 * 2018-11-08 KTK
		 * Analyze By Grid Data
		 * 
		 * 
		 */
		
		else if ("5".equals(myDataAnalysis.getSelstep())) {
			parameters.put("ANALYSIS_WAY", "GEOM");
			parameters = this.setTableProperties(parameters, "GRID", myDataAnalysis.getSpace_value());
			parameters = this.setSigunguProperties(parameters,
				"GRID",
				myDataAnalysis.getAdmType(),
				myDataAnalysis.getSido(),
				myDataAnalysis.getSgg(),
				myDataAnalysis.getDong()
			);
		}

		parameters.put("CONDITION", condition_list);
		
		//RESULT_TABLE_SCHEMA ========================
		parameters.put("RESULT_TABLE_SCHEMA", myDataAnalysis.getUserid());
		//RESULT_TABLE_NAME ========================
		parameters.put("RESULT_TABLE_NAME", myDataAnalysis.getResult_table_name());
		//DESCRIPTION ========================
		parameters.put("DESCRIPTION", myDataAnalysis.getResult_table_desc());
		
		logger.info("========================== myDataAnalysis ==========================");
		logger.info(myDataAnalysis.toString());
		logger.info("============================ parameters ============================");
		logger.info(parameters.toString());
		
		/***********************************************/
		// 센서스 데이터 CONDITION에 필요한 파라미터 추출
		String reqYear = "";
		String depth1 = "";
		String depth2 = "";
		if (myDataAnalysis.getResource_id() == null) {
			if (condition_list != null) {
				for (int i = 0; i < condition_list.size(); i++) {
					JSONObject json = (JSONObject)condition_list.get(i);
					if ("depth1".equals(json.get("key"))) {
						depth1 = json.getString("value");
						parameters.put("DEPTH1", json.get("value"));
					} else if ("depth2".equals(json.get("key"))) {
						depth2 = json.getString("value");
						parameters.put("DEPTH2", json.get("value"));
					} else if ("year".equals(json.get("key"))) {
						reqYear = json.getString("value");
						parameters.put("YEAR", json.get("value"));
					} else if ("targetSelect".equals(json.get("key"))) {
						parameters.put("TARGET_SELECT", json.get("value"));
					}
				}
			}
		}

		long time = System.currentTimeMillis(); 

		SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
		String start = dayTime.format(new Date(time));

		logger.info("나의 데이터분석 - 경계데이터분석 start : " + start);
		logger.info( "parameters : " + parameters);
		logger.info( "[ 분석로그 ] =======================================" );
		
		if (myDataAnalysis.getResource_id() != null) {
			res = new RestService().call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_CONDITION_2016, parameters);
		} else {
			if (!reqYear.equals("") && !depth1.equals("") && !depth2.equals("")) {
				logger.info( "[ 분석로그-경계 ] =======================================" );
				HashMap<String, String> logmap = new HashMap<String, String>();
				logmap.put("user_id", myDataAnalysis.getUserid());
				logmap.put("analysis_type", "경계분석");
				logmap.put("req_year", reqYear);
				logmap.put("depth1", depth1);
				logmap.put("depth2", depth2);
				logmap.put("result_data_nm", myDataAnalysis.getResult_table_name());
				
				//executeMapper.insertSgisLog(logmap);
				
				String logQry = "insert into sgis_use_log (reg_user_id, analysis_type, req_year, depth1, depth2, result_data_nm) values ";
				logQry += "('" +myDataAnalysis.getUserid()+ "','경계분석','" +reqYear+ "','" +depth1+ "','" +depth2+ "','" +myDataAnalysis.getResult_table_name()+ "')";
				logger.info(logQry);
				try {
					client.executeRawQueryByPgSystem( RequestKey.POSTGRE.toString(), logQry );
				} catch (Exception e) {
					logger.info(logQry);
				}
			}
			res = new RestService().call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_CONDITION_CENSUS, parameters);
		}

		if( !"SUCCESS".equals(res.get("RESULT")) ){
			logger.debug( ""+res.get("MESSAGE") );
			return res;
		}
		
		long end = System.currentTimeMillis(); 
		logger.info( "나의 데이터분석 경과시간 : " + (end-time)/1000 + "초 걸림!!!!"); 
		
		/*************************************************/
		//##############################################
		//즉시분석 일때
		if( !bBatch ){
			String tmpTbl = myDataAnalysis.getUserid() + "." + myDataAnalysis.getResult_table_name();
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
			logger.debug("chkCnt : " + chkCnt);
			
			// step1.
			/*String updateQry = " UPDATE " + tmpTbl + " SET legend = c.grade                     "
					+" FROM (SELECT gid, CASE WHEN (data>=1)                                    "
					+" AND (data<=1) THEN 1 WHEN (data>=1) AND (data<=2) THEN 2 WHEN (data>=2)  " 
					+" AND (data<=3) THEN 3 WHEN (data>=3) AND (data<=4) THEN 4 WHEN (data>=4)  " 
					+" AND (data<=11) THEN 5 ELSE 0  END AS grade                               "
					+" FROM " + tmpTbl +") AS c WHERE " +tmpTbl+ ".gid = c.gid   "; 
			
			String rtnUpdate= client.executeRawQuery( RequestKey.POSTGRE.toString(), updateQry );*/
			
			// step2.
			String legQry = "  SELECT ntile AS grade, CAST(max(data) AS double precision) AS max, CAST(min(data) AS double precision) AS min " 
					         + "  FROM (SELECT data, ntile(5) OVER (ORDER BY data) AS ntile "
					         + "         FROM " +tmpTbl + "  WHERE data != 0) AS x "
					         + "  GROUP BY ntile ORDER BY ntile";
			
			String rtnSelect = client.executeRawQuery( RequestKey.POSTGRE.toString(), legQry );
			
			logger.info("rtnSelect["+rtnSelect+"]");
			
			JSONObject dataLegend =  (JSONObject) JSONSerializer.toJSON(rtnSelect);
			JSONObject legObj = dataLegend.getJSONObject("MESSAGE");
			
			JSONArray legVal = legObj.getJSONArray("VALUE");
			res.put("LEGEND", legVal);
			
			/*if (legVal != null) {
				for(int i=0; i<legVal.size(); i++){
					
				JSONObject rRow = legVal.getJSONObject(i);
					chkCnt = rRow.getString("min");
					chkCnt = rRow.getString("max");
					chkCnt = rRow.getString("grade");
				}
			}*/
			
			
			if (Integer.parseInt(chkCnt) > 1000) {
				//String getQry = "select ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y from " + tmpTbl + " where (na = 'Y' or data > 0)  limit 1";
				String getQry = "select ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y from " + tmpTbl +"  limit 1";
				
				logger.debug("getQry >" + getQry);
				
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
		//##############################################

		
		return res;
	}
	
	/**
	 * 경계분석 결과데이터 가져오기
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getSpaData( JSONObject json, String userid) throws SystemFailException{
		
		//String Schema = userid;
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
				
				//전국    bnd_sido_pg      sido_cd
				//시도    bnd_sigungu_pg   sigungu_cd
				//읍면동  bnd_adm_dong_pg  adm_dr_cd
				//집계구  bnd_total_oa_pg  adm_dr_cd
				
				String pSchema = RequestKey.KOSTAT;
				String Schema = StringEscapeUtils.escapeSql(json.getString("SCHEMA"));
		    	sel_tbl = Schema + "." + StringEscapeUtils.escapeSql(json.getString("TABLE"));
		    	
				String pol_tbl = "";
				String pol_cd_col = "";
				String pol_nm_col = "";
				
				//System.out.println("SELRECT["+ json.getString("SELRECT") +"] ADMTYPE["+ json.getString("ADMTYPE")  +"]"    );
				
				if( "1".equals(json.getString("SELRECT")) ){
					
					String admType = json.getString("ADMTYPE");
					String adm_cd = "adm_cd";
					
					if("sido".equals(admType)) {
						pol_tbl = "bnd_sido_pg"; 
						pol_cd_col = "sido_cd";
						pol_nm_col = "sido_nm";
					} 
					else if("sgg".equals(admType)) {
						pol_tbl = "bnd_sigungu_pg"; 
						pol_cd_col = "sigungu_cd";
						pol_nm_col = "sigungu_nm";
					}
					else if("dong".equals(admType)) {
						pol_tbl = "bnd_adm_dong_pg"; 
						pol_cd_col = "adm_dr_cd";
						pol_nm_col = "adm_dr_nm";
					}
					else if("totaloa".equals(admType)) {
						pol_tbl = "bnd_total_oa_pg"; 
						pol_cd_col = "tot_oa_cd";
						pol_nm_col = "tot_oa_cd";
						adm_cd = pol_nm_col;
						
					}
					
					query = " select ST_AsGeoJson(b.geom) as geodata, a.gid, round(a.data::numeric, 1) as data, COALESCE(NULLIF(b." + pol_nm_col + "  ,''), '') as adm_name, a.legend "
							+  " from " + sel_tbl + " a, " + pSchema + "." + pol_tbl +" b "
							+  " where a.data != 0  "
							+  " and   a."+ adm_cd + " = b." + pol_cd_col;
					
				} else if( "2".equals(json.getString("SELRECT")) || "3".equals(json.getString("SELRECT")) ) {
					pol_tbl = "map_object";
					pol_nm_col = "label_nm";
					//pol_cd_col = "map_seq";
					
					query = " select ST_AsGeoJson(a.geom) as geodata, a.gid, round(a.data::numeric, 1) as data, COALESCE(NULLIF(a." + pol_nm_col + "  ,''), '') as adm_name, a.legend "
							+  " from " + sel_tbl +  " a where a.data != 0  ";
					
				}
		    	
				logger.info("경계분석결과 조회 query : " + query);
		    	result = client.executeRawQuery( RequestKey.POSTGRE, query );

				
				//query = "select ST_AsGeoJson(geom) geodata, gid, data, COALESCE(NULLIF(adm_nm  ,''), '') as adm_name, legend from " + sel_tbl + " where data != 0";
		    	
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
	 * 
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getBatchSpaData( JSONObject json, String userid) throws SystemFailException{
		
		String result = "";
		//String Schema = RequestKey.POSTGRE;
		String query = "";
		String target_table ="";
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
				target_table = json.getString("TABLE_SCHEMA") + "." + json.getString("TABLE_NM");
				action_type = json.getString("ACTION_TYPE");
				
				String pSchema = RequestKey.KOSTAT;
				
				if( action_type != null && !"".equals(action_type) ){
					
					//행정
					if( action_type.startsWith("ADMIN") || action_type.startsWith("RANK") ){
						String adm_cd = "adm_cd";
						//시도
						if( "ADMIN_ANALY_SIDO".equals(action_type)/* || "DENSITY_ANALY_SIDO".equals(action_type)*/){
							pol_tbl = "bnd_sido_pg";
							pol_cd_col = "sido_cd";
							pol_nm_col = "sido_nm";
						//시군구
						} else if ( "ADMIN_ANALY_SGG".equals(action_type)/* || "DENSITY_ANALY_SGG".equals(action_type)*/
							|| "RANK_ANALY_SIDO".equals(action_type)){
							pol_tbl = "bnd_sigungu_pg";
							pol_cd_col = "sigungu_cd";
							pol_nm_col = "sigungu_nm";
						//읍면동
						} else if ( "ADMIN_ANALY_DONG".equals(action_type)/* || "DENSITY_ANALY_DONG".equals(action_type)*/ 
							|| "RANK_ANALY_SGG".equals(action_type)){
							pol_tbl = "bnd_adm_dong_pg"; 
							pol_cd_col = "adm_dr_cd";
							pol_nm_col = "adm_dr_nm";
						//집계구
						} else if ( "ADMIN_ANALY_TOT".equals(action_type)/* || "DENSITY_ANALY_TOT".equals(action_type)*/ 
							|| "RANK_ANALY_DONG".equals(action_type)){
							pol_tbl = "bnd_total_oa_pg"; 
							pol_cd_col = "tot_oa_cd";
							pol_nm_col = "tot_oa_cd";
							adm_cd = pol_cd_col;
						} 
					
						query = " select ST_AsGeoJson(b.geom) as geodata, a.gid, round(a.data::numeric, 1) as data, COALESCE(NULLIF(b." + pol_nm_col + "  ,''), '') as adm_name, a.legend "
								+  " from " + target_table + " a, " + pSchema + "." + pol_tbl +" b "
								+  " where a.data != 0                     "
								+  " and   a."+ adm_cd + " = b." + pol_cd_col;
						
					} else if ( action_type.startsWith("COMBINE") ){
						query = " select ST_AsGeoJson(a.geom) as geodata, a.gid, round(a.data::numeric, 1) as data, COALESCE(NULLIF(a.adm_nm, ''), '') as adm_name, a.legend "
								+  " from " + target_table + " a"
								+  " where a.data != 0";
								
						
					//임의,사용자
					} else if ( "MYDATA_ANALY".equals(action_type) ){
							/*pSchema = "obj";
							pol_tbl = "map_object";*/
							//pol_nm_col = "label_nm"; COALESCE(NULLIF(a." + pol_nm_col + "  ,''), '')
							
							query = " select ST_AsGeoJson(a.geom) as geodata, a.gid, round(a.data::numeric, 1) as data, '' as adm_name, a.legend "
									+  " from " + target_table +  " a where a.data != 0";
							
					//공간상관
					} else if ( "SPACE_ANALY".equals(action_type) ){
						
					}
					
					logger.info("query > " + query);
					
					result = client.executeRawQuery( RequestKey.POSTGRE, query );
					
				} else {
					return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 <br/>[action_type : "+action_type+"] 존재여부 확인필요 "+"\"}";
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
	 * 
	 * @param json 
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject getBatchAnalyzeData(JSONObject json) throws SystemFailException {
		
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
				//String getQry = "select ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y from " + tmpTbl + " where (na = 'Y' or data > 0)  limit 1";
				String getQry = "select ST_X(ST_Centroid(geom)) as x, ST_Y(ST_Centroid(geom)) as y from " + tmpTbl +"  limit 1";
				
				logger.debug("getQry >" + getQry);
				
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
			//======================================================
			 
			String legQry = "  SELECT ntile AS grade, CAST(max(data) AS double precision) AS max, CAST(min(data) AS double precision) AS min " 
					         + "  FROM (SELECT data, ntile(5) OVER (ORDER BY data) AS ntile "
					         + "         FROM " +tmpTbl + "  WHERE data != 0) AS x "
					         + "  GROUP BY ntile ORDER BY ntile";
			logger.info(legQry);
			String rtnSelect = client.executeRawQuery( RequestKey.POSTGRE.toString(), legQry );
			
			logger.info("rtnSelect["+rtnSelect+"]");
			
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
	 * 결합분석 > 나의 행정경계분석결과 내역조회
	 * @param user_id
	 * @param limit
	 * @param offset
	 * @param category4
	 * @param extraParams
	 * @return
	 * @throws SystemFailException
	 *//*
	public ListTypeResult<List<ResourceVO>>  selectMyAdmAnalysRltList( 
			String user_id, 
			int limit, 
			int offset,
			String category4,
			HashMap<String,Object> extraParams ) throws PSQLException{
		
		ListTypeResult<List<ResourceVO>>  res = new ListTypeResult<List<ResourceVO>>();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		if ( user_id != null ){
			parameters.put( RequestKey.USER_ID, user_id );
		}
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		parameters.put( RequestKey.CATEGORY4 , category4 );
		
		parameters.putAll( extraParams );
		
		
		res = mapper.selectMyAdmAnalysRltList(parameters);
		
		return res;
	}*/
	
	
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
				
				// 원천데이터에 base_year 필드가 존재시 앞에 alias b를 붙임(경계테이블 필드와 겹침)
				String column = "base_year".equals(QueryUtil.cleanStr( item.getString("COLUMN"))) ? "b.base_year" : QueryUtil.cleanStr( item.getString("COLUMN"));
				
				//String data_type = QueryUtil.cleanStr( item.getString("DATA_TYPE") );
				String condition = QueryUtil.cleanStr( ( item.has("CONDITION") ? item.getString("CONDITION") : "" ) );
				String relational_operator = QueryUtil.cleanStr( item.getString("RELATIONAL_OPERATOR") );
				String conditional = QueryUtil.cleanStr( item.getString("CONDITIONAL_OPERATOR") );

				/**
				 * 데이터조건으로 선택한 column is 존재
				 */
				if( item.getString("RANGE").equalsIgnoreCase("VALUE") ){
					
					/*if( data_type.equalsIgnoreCase("number") && ( condition == null || condition.isEmpty() ) ){
						condition = "0";
					}*/
					
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
	public boolean selectTabInfo (MyDataAnalysis iQryCond, String column_name) throws SystemFailException{
		
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
//		String rtnDesc= client.executeRawQuery( RequestKey.POSTGRE.toString(), query );
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
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return rtnVal;
	}
	/**
	 * 테이블 필드에 xy 정보 존재여부 확인
	 * @param iQryCond
	 * @param column_name
	 * @param checkFg
	 * @return
	 * @throws SystemFailException
	 */
	public boolean existsPolColumn (MyDataAnalysis iQryCond) throws SystemFailException{
		
		boolean rtnVal = false;

		JSONObject tmpJson = null;
		JSONObject json = null;
		if(iQryCond.getPos_column_desc() != null ){
			json = (JSONObject) JSONSerializer.toJSON(iQryCond.getPos_column_desc());
		}
		
		String pos_method = "";
		String pos_columns = "";
		String x_col = "";
		String y_col = "";
		
		// 조건설정 즉시분석 통해 들어온경우. 
		if(json != null ){

			// resrouce.pos_column_desc 에 있는 원천테이블의 x,y 필드 존재여부 확인
			if(json.containsKey("pos_col_infos")){
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
				
				//행정경계인경우
				if( "1".equals(iQryCond.getSelstep()) ){
					// 분석결과 테이블 center_x, center_y 필드 존재여부 확인
					String data_name = iQryCond.getResult_table_name();
					iQryCond.setData_name(data_name);
					
					if( selectTabInfo(iQryCond, "center_x") && selectTabInfo(iQryCond, "center_y") ){
						rtnVal = true;
					}
				} else {
					rtnVal = false;
				}
					
			}
		// 분석이력조회 지도 확인을 통해 들어온경우.
		} else {
			
			logger.info("data_name[" +  iQryCond.getData_name() +"] action_type["+  iQryCond.getAction_type()+"]" );
			
			// 행정경계이면서 분석결과 테이블 center_x, center_y 필드 유무 체크
			if( iQryCond.getData_name() != null && iQryCond.getAction_type() != null ){
				if( iQryCond.getAction_type().startsWith("ADMIN") ){
					if( selectTabInfo(iQryCond, "center_x") && selectTabInfo(iQryCond, "center_y") ){
						rtnVal = true;
					}
				}
			}
		}
		
		return rtnVal;
	}
	
	
	/**
	 * 연산분석 실행
	 * @param json
	 * @param uerid
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject procAnalyOpt (JSONObject json, String uerid) throws SystemFailException{
		
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		JSONObject res = new JSONObject();
		
		boolean checkFg = true;
		
		/*************************************
		//step01. input value check
		*************************************/
		if( !json.containsKey("status") || !json.containsKey("data1") || !json.containsKey("data2") || !json.containsKey("condition")  ){
			checkFg = false;
		}
		
		if( !json.containsKey("status")  && !json.containsKey("data1") && !json.containsKey("data2")  ){
			
			if( ( json.getString("data1") == null || "".equals(json.getString("data1")) ) || 
				( json.getString("data2") == null || "".equals(json.getString("data2")) ) 
			){
				checkFg = false;
			}
		}
		
		if(!checkFg){
			throw new SystemFailException( "[ERROR] procAnalyOpt() - can't find required params");
		}
		/************************************
		// step02. parameter set
		************************************/

        JSONObject object1 = (JSONObject) JSONSerializer.toJSON(json.getString("data1"));
        JSONObject object2 = (JSONObject) JSONSerializer.toJSON(json.getString("data2"));
        JSONObject queryObj1 = new JSONObject();
        JSONObject queryObj2 = new JSONObject();

        // parameters set end ----------------------------------------

        logger.info("[object1] >>> " +  object1.toString());
        logger.info("[object2] >>> " +  object2.toString());
        logger.info("[parameters] >>> " +  parameters);

        long time = System.currentTimeMillis();
        SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
        String start = dayTime.format(new Date(time));
        logger.info("연산분석 start : " + start);

        parameters = new HashMap<String, Object>();
        parameters.put("USER_DIV", json.get("userDiv"));
        parameters.put("INPUT_TABLE1", object1.get("data_name"));
        parameters.put("INPUT_TABLE2", object2.get("data_name"));
        parameters.put("INPUT_SCHEMA1", object1.get("user_id"));
        parameters.put("INPUT_SCHEMA2", object2.get("user_id"));
        String condition = "DT1_PLUS_DT2";

        // 연산 결과
        if ("sum".equals(json.get("condition"))) {
            condition = "DT1_PLUS_DT2";
        } else if ("minus".equals(json.get("condition"))) {
            condition = "DT1_MINUS_DT2";
        } else if ("minus2".equals(json.get("condition"))) {
            condition = "DT2_MINUS_DT1";
        } else if ("multi".equals(json.get("condition"))) {
            condition = "DT1_MULTI_DT2";
        } else if ("comp".equals(json.get("condition"))) {
            condition = "DT1_COMP_DT2";
        } else if ("comp2".equals(json.get("condition"))) {
            condition = "DT2_COMP_DT1";
        } else if ("avg".equals(json.get("condition"))) {
            condition = "DT1_AVG_DT2";
        } else {
            throw new SystemFailException( "연산 결과를 선택해주세요.");
        }

        parameters.put("OPERATION", condition);
        parameters.put("USER_ID", uerid);
        parameters.put("RESULT_TABLE_SCHEMA", uerid);
        parameters.put("RESULT_TABLE_NAME", json.get("result_table_nm"));

        // 내데이터 보낼떄는 false
        // parameters.put("BATCH_YN", true);
        parameters.put("BATCH_YN", true);
        parameters.put("DESCRIPTION", json.get("result_table_desc"));

//		if ("".equals(json.get(""))) {
//
//		}


        parameters.put("ANALYSIS_TYPE", "RESULT_UNION");
        parameters.put("ACTION_TYPE", "COMBINE_ANALY_SIDO");
        
		res = new RestService().call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_UNION_ANALYSIS, parameters);

		long end = System.currentTimeMillis(); 
		logger.info( "연산분석 경과시간 : " + (end-time)/1000 + "초 걸림!!!!");
		//================================================================
		
		if( res != null ){
			
			logger.info("res >>" + res );
			
//			if( "SUCCESS".equals(res.get("RESULT")) ){
//                // 배치 여부에 따른 MESSAGE 가 다르기때문에 분기 처리해야함.
//			    // if (batch)
//
//
//				JSONObject rtnObj = res.getJSONObject("MESSAGE");
//
//				String rTblNm = "";
//				String rSchema = "";
//
//				if (rtnObj != null) {
//					rTblNm = (String)rtnObj.getString("RESULT_TABLE");
//					rSchema = (String)rtnObj.getString("RESULT_TABLE_SCHEMA");
//				}
//
//				if( !"".equals(rSchema) && !"".equals(rTblNm)){
//
//					String findQuery = " select ST_AsGeoJson(a.geom) as geodata, a.gid, round(a.data::numeric, 1) as data, COALESCE(NULLIF(a.adm_cd_nm  ,''), '') as adm_name, a.legend "
//							+ " from " + rSchema + "." + rTblNm + " a"
//							+ " where a.data != 0  ";
//
//					String rtnData = client.executeRawQuery( RequestKey.POSTGRE.toString(), findQuery );
//
//					logger.info("rtnData["+rtnData+"]");
//
//					JSONObject rltData =  (JSONObject) JSONSerializer.toJSON(rtnData);
//
//					JSONObject rltObj = rltData.getJSONObject("MESSAGE");
//					JSONArray mapData = rltObj.getJSONArray("VALUE");
//
//					res.put("MAPDATA", mapData);
//					res.put("RESULT", rltData.getString("RESULT"));
//
//					String admType = json.getString("admType");
//
//					res.put("ADMTYPE", admType);
//				}
//
//			}
		} else {
			logger.info("서버 응답값 없음. >> " + res );
		}
 
		return res;
	}


	/**
	 * 연산분석 조건 체크
	 * @param json
	 * @param uerid
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject procAnalyOptAreaCheck (JSONObject json, String uerid) throws SystemFailException{


		HashMap<String,Object> parameters = new HashMap<String,Object>();
		JSONObject res = new JSONObject();

		boolean checkFg = true;

		/*************************************
		 //step01. input value check
		 *************************************/
		if( !json.containsKey("status") || !json.containsKey("data1") || !json.containsKey("data2") || !json.containsKey("condition")  ){
			checkFg = false;
		}

		if( !json.containsKey("status")  && !json.containsKey("data1") && !json.containsKey("data2")  ){

			if( ( json.getString("data1") == null || "".equals(json.getString("data1")) ) ||
					( json.getString("data2") == null || "".equals(json.getString("data2")) )
					){
				checkFg = false;
			}
		}

		if(!checkFg){
			throw new SystemFailException( "[ERROR] procAnalyOpt() - can't find required params");
		}
		/************************************
		 // step02. parameter set
		 ************************************/
    
		JSONObject object1 = (JSONObject) JSONSerializer.toJSON(json.getString("data1"));
		JSONObject object2 = (JSONObject) JSONSerializer.toJSON(json.getString("data2"));
		JSONObject queryObj1 = new JSONObject();
		JSONObject queryObj2 = new JSONObject();

		// parameters set end ----------------------------------------

		logger.info("[object1] >>> " +  object1.toString());
		logger.info("[object2] >>> " +  object2.toString());
		logger.info("[parameters] >>> " +  parameters);

		long time = System.currentTimeMillis();
		SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
		String start = dayTime.format(new Date(time));
		logger.info("연산분석 조건 체크 start : " + start);

		parameters = new HashMap<String, Object>();
		parameters.put("USER_DIV", json.get("userDiv"));
		parameters.put("USER_ID", uerid);

		if (object1.get("data_nm") != null) {
			parameters.put("TABLE1", object1.get("data_nm"));
		} else {
			parameters.put("TABLE1", object1.get("data_name"));
		}


		if (object2.get("data_nm") != null) {
			parameters.put("TABLE2", object2.get("data_nm"));
		} else {
			parameters.put("TABLE2", object2.get("data_name"));
		}


//		parameters.put("TABLE1", object1.get("data_nm"));

		parameters.put("SCHEMA1", object1.get("user_id"));
		parameters.put("SCHEMA2", object2.get("user_id"));
//		String condition = "DT1_PLUS_DT2";
//
//		// 연산 결과
//		if ("sum".equals(json.get("condition"))) {
//			condition = "DT1_PLUS_DT2";
//		} else if ("minus".equals(json.get("condition"))) {
//			condition = "DT1_MINUS_DT2";
//		} else if ("minus2".equals(json.get("condition"))) {
//			condition = "DT2_MINUS_DT1";
//		} else if ("multi".equals(json.get("condition"))) {
//			condition = "DT1_MULTI_DT2";
//		} else if ("comp".equals(json.get("condition"))) {
//			condition = "DT1_COMP_DT2";
//		} else if ("comp2".equals(json.get("condition"))) {
//			condition = "DT2_COMP_DT1";
//		} else if ("avg".equals(json.get("condition"))) {
//			condition = "DT1_AVG_DT2";
//		} else {
//			throw new SystemFailException( "연산 결과를 선택해주세요.");
//		}
//
//		parameters.put("OPERATION", condition);
//		parameters.put("USER_ID", uerid);
//		parameters.put("RESULT_TABLE_SCHEMA", uerid);
//		parameters.put("RESULT_TABLE_NAME", json.get("result_table_nm"));
//
//		// 내데이터 보낼떄는 false
//		// parameters.put("BATCH_YN", true);
//		parameters.put("BATCH_YN", true);
//		parameters.put("DESCRIPTION", json.get("result_table_desc"));
//
////		if ("".equals(json.get(""))) {
////
////		}
//
//
//		parameters.put("ANALYSIS_TYPE", "RESULT_UNION");
//		parameters.put("ACTION_TYPE", "COMBINE_ANALY_SIDO");

		//
		// ANALYSIS	GEO_ANALYSIS	DATA_UNION_EXECUTE_YN

		res = new RestService().call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_UNION_EXECUTE_YN, parameters);


		long end = System.currentTimeMillis();
		logger.info( "연산분석 조건 체크 경과시간 : " + (end-time)/1000 + "초 걸림!!!!");
		//================================================================

		if( res != null ){
			logger.info("res >>" + res );
		} else {
			logger.info("서버 응답 없음 >> " + res );
		}

		return res;
	}
	
	
	/**
	 * <pre>
	 * 데이터 가져오기
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getPolyData( JSONObject json, String userid) throws SystemFailException{
		
		String result = "";
		String Schema = userid;
		String query = "";
		String table ="";

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
		
			table = json.getString("TABLE_SCHEMA") + "." + json.getString("TABLE_NM");
			
			HashMap<String,Object> parameters = new HashMap<String,Object>();
			parameters.put("data_table_schema", json.getString("TABLE_SCHEMA"));
			parameters.put("data_name", json.getString("TABLE_NM"));
		
			query = "select ST_AsGeoJson(geom) as geodata, (ROW_NUMBER() OVER()) as gid, "
					+ "_area, ntile(5) OVER (ORDER BY _area DESC) legend, * "
					+ " from " +table;
			result = client.executeRawQuery( RequestKey.POSTGRE, query );

			
			logger.info("보로노이 분석결과 조회 query : " + query);
	    	//logger.info("공간 분석결과 조회 query 결과 : " + result);
			
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
	 * <pre>
	 * 데이터 가져오기
	 * </pre>
	 * @param json
	 * @param userid
	 * @return
	 * @throws SystemFailException
	 */
	public String getSpaceDataN( JSONObject json, String userid) throws SystemFailException{
		
		String result = "";
		String Schema = userid;
		String query = "";
		String table ="";

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
					
			table = json.getString("TABLE_SCHEMA") + "." + json.getString("TABLE_NM");
			
  			query = "select " +json.getString("X_COLUMN")+ ", " +json.getString("Y_COLUMN")+ ", (ROW_NUMBER() OVER()) as gid, '0' legend from " +table +" where " +json.getString("X_COLUMN")+ " <> '0' limit 50000";
			result = client.executeRawQuery( RequestKey.POSTGRE, query );
			
			logger.info("공간 분석결과 조회 query : " + query);
	    	//logger.info("공간 분석결과 조회 query 결과 : " + result);
			
		} catch (SystemFailException e) {
			logger.info(e.getMessage());	
			return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 발생 SystemFailException"+"\"}";
		} catch (Exception e) {
			logger.info(e.getMessage());	
			return "{\"success\":\"false\", \"reason\":\""+"시스템 오류 발생 Exception"+"\"}";
		}
		return result;
		
	}
	
	public HashMap<String, Object> setTableProperties(HashMap<String, Object> parameters, String type, int space) {
		parameters.put("GEO_DATA_TYPE", type);
		parameters.put("POLYGON_TABLE_SCHEMA", "kostat");
		
		if ("HEXAGON".equalsIgnoreCase(type)) {
			if (space != 1000
				&& space != 5000
				&& space != 10000) {
				
				space = 1000;
			}
			
			parameters.put("POLYGON_TABLE", "sido_hexa_" + space);
		} else if ("GRID".equalsIgnoreCase(type)) {
			String spaceSize;
			
			if (space == 100) {
				spaceSize = "100m";
			} else if (space == 1000) {
				spaceSize = "1km";
			} else if (space == 10000) {
				spaceSize = "10km";
			} else if (space == 100000) {
				spaceSize = "100km";
			} else {
				spaceSize = "100m";
			}
			
			parameters.put("POLYGON_TABLE", "gridindex" + spaceSize);
		}
		
		return parameters;
	}
	
	public HashMap<String, Object> setSigunguProperties(
			HashMap<String, Object> parameters,
			String type,
			String admType,
			String sido,
			String sgg,
			String dong) {
		
		if (dong != null) {
            parameters.put("GEO_DATA_CD_COLUMN", "tot_oa_cd");
            if ("all".equals(dong)) {
                parameters.put("POLYGON_TABLE_KEY", dong);
            } else {
                parameters.put("POLYGON_TABLE_KEY", sgg);
            }
            parameters.put("ACTION_TYPE", type + "_ANALY_TOT");
        } else if (sgg != null) {
            parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
            if("all".equals(sgg)){
                parameters.put("POLYGON_TABLE_KEY", sgg);
            }else{
                parameters.put("POLYGON_TABLE_KEY", sido);
            }
            parameters.put("ACTION_TYPE", type + "_ANALY_DONG");
        } else if (sido != null) {
            parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");
            parameters.put("POLYGON_TABLE_KEY", sido);
            parameters.put("ACTION_TYPE", type + "_ANALY_SGG");
        } else {
            parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
            parameters.put("ACTION_TYPE", type + "_ANALY_SIDO");
        }
		
		return parameters;
	}
}
 