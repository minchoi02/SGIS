package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.ResultSet;
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
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.model.MyDataAnalysis;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.controller.service.AnalysisUtils;
import kostat.lbdms.ServiceAPI.controller.service.AreaAnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.BufferDataAnalysisService;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Service("bufferDataAnalysisService")
public class BufferDataAnalysisServiceImpl extends EgovAbstractServiceImpl implements BufferDataAnalysisService {
	private static final Logger logger = LoggerFactory.getLogger(BufferDataAnalysisServiceImpl.class);
	
	@Resource(name="postgreCommandClient")
	private PostgreCommandClient client;
	
	@Resource(name="areaAnalysisService")
	private AreaAnalysisService areaAnalysisService;
	
	public JSONObject bufferDataAnalysis(MyDataAnalysis data) throws SystemFailException {
		try {
			JSONObject tableCheckResponse = new JSONObject();
			
			boolean existChk = this.tableExistsCheck(data);
			
			if(existChk) {
				logger.debug( ""+ tableCheckResponse.get("RESULT"));
				tableCheckResponse.put("RESULT", "DUPLICATE");
				tableCheckResponse.put("MESSAGE", "테이블이 이미 존재합니다");
				return tableCheckResponse;
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new SystemFailException(e.getMessage());
		}
		
		// 파라미터 생성
		try {
			JSONArray conditions;
			JSONArray corpConditions;
			
			HashMap<String, Object> parameters;
			HashMap<String, Object> analysisParameters;
			HashMap<String, Object> corpAnalysisParameters;
			
			conditions = this.getConditionArray(data.getCondition());			
			analysisParameters = this.parseConditionArray(conditions);
			
			parameters = this.createParameters(data, conditions);
			parameters = this.setAnalysisParameters(parameters, analysisParameters, false);
			
			// 사업체일 경우 파라미터 설정
			if ("1".equals(data.getSelstep())) {
				corpConditions = this.getConditionArray(data.getCorp_condition());
				corpAnalysisParameters = this.parseConditionArray(corpConditions);
				
				parameters = this.setAnalysisParameters(parameters, corpAnalysisParameters, true);
			}
	
			this.sendAnalysisLog(analysisParameters, data.getUserid(), data.getResult_table_name());
			
			return new RestService().call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_CONDITION_CENSUS, parameters);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new SystemFailException(e.getMessage());
		}
	}

	public boolean tableExistsCheck(MyDataAnalysis data) throws Exception {
		String user = data.getUserid();
		String tableName = data.getResult_table_name();
		
		DBConnector dbConn = new OpenPGSql();
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
		String pass = ConfigUtil.getString("jdbc.userdb.password");
		String pgSuperUser = ConfigUtil.getString("jdbc.userdb.username");
		
		boolean result = false;
		try {
			dbConn.openConn(database, pgSuperUser, pass);
			String query = "SELECT COUNT(*) as cnt FROM pg_tables WHERE schemaname='"
							+ user + "' AND tablename='" + tableName +"';";
			
			dbConn.execQuery(query);
			ResultSet rs = dbConn.getResultSet();
			
			if (rs.next()) {
				int cnt = rs.getInt("cnt");
				if (cnt>0) result = true;
			}
		}catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbConn.closeConn();
		}
		
		return result;
	}
	
	private JSONArray getConditionArray(String condition) throws Exception {
		if (condition != null && !condition.isEmpty() && !condition.equals("[]")) {
            return JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
        } else {
        	throw new Exception("선택된 데이터 조건이 없습니다");
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
		
		//this.executeMapper.insertSgisLog(logData);
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
	
	private HashMap<String, Object> createParameters(MyDataAnalysis data, JSONArray conditions) throws Exception {
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
		parameters.put("DATA_TABLE", data.getData_name());
		parameters.put("DATA_TABLE_SCHEMA", "kostat");
		parameters.put("RESULT_CALCULATION", this.createResultCalculateMethod(data));
		parameters.put("GEO_DATA_TYPE", "BUFFER_ANALYSIS");
		parameters.put("BATCH_YN", true);
		
		// 버퍼 정보 입력
		parameters.put("BUFFER_TYPE", this.getBufferType(data.getBuffer_type()));
		parameters.put("BUFFER_SIZE", data.getBuffer_size());
		
		// 테이블 정보 입력
		parameters = this.setBufferTableInfo(parameters, data);
		parameters = this.setPolygonTableInfo(parameters, data);
		
		// 결과 테이블 정보 입력
		parameters.put("RESULT_TABLE_SCHEMA", data.getUserid());
		parameters.put("RESULT_TABLE_NAME", data.getResult_table_name());
		parameters.put("DESCRIPTION", data.getResult_table_desc());
		
		// 데이터 선택 조건 설정
		if (conditions != null && !conditions.isEmpty()) {
			parameters = this.setConditionParameters(parameters, conditions);
		}
		
		// 사업체일 경우 사업체 조건 설정
		if ("1".equals(data.getSelstep())) {
			parameters = this.setCorpParameters(parameters, data);
		}
		
		// 내 데이터 있을 경우 파라미터 입력
		if (this.useMyData(data.getSelstep())) {
			parameters = this.setMyDataParameters(parameters, data);
		}
		
		logger.info("+++++++++++++++++ parameters +++++++++++++++++");
		logger.info(parameters.toString());
		logger.info("+++++++++++++++++ parameters +++++++++++++++++");
		
		return parameters;
	}
	
	/**
	 * 공유 데이터 때문에 스키마 달리 설정
	 * @param schema
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unused")
	private String getDataTableSchema(String step, String schema) throws Exception {
		if ("1".equals(step)) { // 사업체
			return "kostat";
		} else if ("2".equals(step)) { // 임의 POI
			return "kostat";
		} else if ("3".equals(step)) { // 사용자 데이터
			return schema;
		} else { // 도로망
			return "kostat";
		}
	}
	
	private String getBufferType(String type) throws Exception {
		if ("D".equalsIgnoreCase(type)) {
			return "DYNAMIC";
		} else if ("S".equalsIgnoreCase(type)) {
			return "STATIC";
		} else {
			throw new Exception("잘못된 버퍼 타입입니다: " + type);
		}
	}
	
	private JSONArray getCorpCondition(MyDataAnalysis data) throws Exception {
		return JSONArray.fromObject(data.getCorp_condition().replaceAll(System.getProperty("line.separator"), ""));
	}
	
	private boolean useMyData(String step) throws Exception {
		if ("2".equals(step) || "3".equals(step)) {
			return true;
		} else {
			return false;
		}
	}
	
	private HashMap<String, Object> setPolygonTableInfo(
			HashMap<String, Object> parameters,
			MyDataAnalysis data) throws Exception {
		
		String type;
		
		type = this.getPolygonTableType(data.getArea_cd());
		
		parameters.put("POLYGON_TABLE_SCHEMA", "kostat");
		parameters.put("POLYGON_TABLE_KEY", data.getArea_cd());
		parameters.put("ACTION_TYPE", "BUFFER_ANALY_" + type.toUpperCase());
		
		parameters = this.setPolygonTableNameAndColumn(parameters, type);
		
		return parameters;
	}
	
	private HashMap<String, Object> setPolygonTableNameAndColumn(
			HashMap<String, Object> parameters,
			String type) throws Exception {
		
		if ("sido".equals(type)) {
			parameters.put("POLYGON_TABLE", "bnd_sido_pg");
			parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
		} else if ("sgg".equals(type)) {
			parameters.put("POLYGON_TABLE", "bnd_sigungu_pg");
			parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");
		} else if ("dong".equals(type)) {
			parameters.put("POLYGON_TABLE", "bnd_adm_dong_pg");
			parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
		} else {
			throw new Exception("잘못된 admType 입니다 : " + type);
		}
		
		return parameters;
	}
	
	private String getPolygonTableType(String area) throws Exception {
		if (area != null) {
			if (area.length() == 2) {
				return "sido";
			} else if (area.length() == 5) {
				return "sgg";
			} else if (area.length() == 7) {
				return "dong";
			} else {
				throw new Exception("잘못된 area_cd 입니다: " + area);
			}
		} else {
			throw new Exception("선택된 area_cd가 없습니다");
		}
	}
	
	private HashMap<String, Object> setBufferTableInfo(
			HashMap<String, Object> parameters,
			MyDataAnalysis data) throws Exception {
		
		parameters.put("BUFFER_TABLE_TYPE", this.getBufferTableType(data.getSelstep()));
		parameters.put("BUFFER_TABLE_SCHEMA", this.getBufferTableSchema(data.getSelstep(), data.getUserid(), data.getData_table_schema()));
		parameters.put("BUFFER_TABLE", this.getBufferTableName(data.getSelstep(), data.getData_name()));
		
		return parameters;
	}
	
	private String getBufferTableSchema(String step, String userId, String schema) throws Exception {
		if ("1".equals(step)) { // 사업체
			return "kostat";
		} else if ("2".equals(step)) { // 임의 POI
			return userId;
		} else if ("3".equals(step)) { // 사용자 데이터
			return schema;
		} else { // 도로망
			return userId;
		}
	}

	private String getBufferTableName(String step, String myData) throws Exception {
		if ("1".equals(step)) { // 사업체
			return "";
		} else if ("2".equals(step)) { // POI
			return myData;
		} else if ("3".equals(step)) { // 사용자
			return myData;
		} else { // 도로망
			return myData;
		}
	}
	
	private String getBufferTableType(String step) throws Exception {
		if ("1".equals(step)) { // 사업체
			return "CORP";
		} else if ("2".equals(step)) { // POI
			return "POI";
		} else if ("3".equals(step)) { // 사용자
			return "MY";
		} else { // 도로망
			return "ROAD";
		}
	}
	
	private HashMap<String, Object> setConditionParameters(
			HashMap<String, Object> parameters,
			JSONArray conditions) throws Exception {
		
		AnalysisUtils utils = new AnalysisUtils();
		
		parameters.put("CONDITION", conditions);
//		parameters.put("WHERE_STATEMENT", this.arrayDataMakeWhereQuery(conditions));
		parameters.put("WHERE_STATEMENT", utils.createCensusWhereClause(conditions));
		
		return parameters;
	}
	
	private HashMap<String, Object> setCorpParameters(
			HashMap<String, Object> parameters,
			MyDataAnalysis data) throws Exception {
		
		if (data.getCorp_condition() == null) {
			throw new Exception("사업체 조건이 없습니다");
		}
		
		AnalysisUtils utils = new AnalysisUtils();
		
		parameters.put("CORP_CONDITION", this.getCorpCondition(data));
//		parameters.put("CORP_WHERE_STATEMENT", this.arrayDataMakeWhereQuery(this.getCorpCondition(data)));
		parameters.put("CORP_WHERE_STATEMENT", utils.createCensusWhereClause(this.getCorpCondition(data)));
		
		return parameters;
	}
	
	private HashMap<String, Object> setMyDataParameters(
			HashMap<String, Object> parameters,
			MyDataAnalysis data) throws Exception {
		
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
	
	private HashMap<String, Object> getPosProperties(MyDataAnalysis data) throws Exception {
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
	
	private JSONObject createResultCalculateMethod(MyDataAnalysis data) throws Exception {
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
	
	private JSONObject checkResourceTable(MyDataAnalysis data) throws Exception {
		HashMap<String, Object> parameters;
		
		parameters = new HashMap<String, Object>();
		parameters.put("USER_ID", data.getData_table_schema());
		parameters.put("TABLE_NM", data.getResult_table_name());

		return new RestService().call(Command.RESOURCE, Command.TABLE_CHECK, parameters);
	}
	
	public JSONObject createWhereQuery( JSONArray condition_list ) {
		
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
	
	private boolean selectTabInfo (MyDataAnalysis iQryCond, String column_name) throws SystemFailException{
		
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
			logger.error(e.getMessage(), e);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		}
		
		return rtnVal;
	}
	
	@SuppressWarnings("unused")
	private String arrayDataMakeWhereQuery(JSONArray censusColumnArray) throws Exception {

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
						throw new Exception("사업체 테마업종은 2016년 데이터부터 가능합니다.");
					}
	
					// 컬럼명 theme_biz_cd 이거여야함
	 				query += this.makeQuery(value, "theme_biz_cd");
				} else if (key.equalsIgnoreCase("house_type")) {
					// 컬럼명 RESID_1_TYPE 이거여야함
					query += this.makeQuery(value, "RESID_1_TYPE");
				} else if (key.equalsIgnoreCase("house_area_cd")) {
					if (!year.equals("2015")) {
						throw new Exception("주택 연면적은 2015년 데이터만 가능합니다.");
					}
					// 컬럼명 house_region_cd 이거여야함
					query += this.makeQuery(value, "house_region_cd");
				} else if (key.equalsIgnoreCase("household_type")) {
					if (year.equals("2015")) {
						throw new Exception("2015년 데이터는 세대구성 조회가 불가능합니다.");
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
				logger.error(e.getMessage(), e);
				throw new Exception(e.getMessage());
			}
		}
		query = query + ageQuery;

		return query;
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
	

	/**
	 * <pre>
	 * 문자열이 숫자형인지 체크
	 * </pre>
	 * @param String s
	 * @return boolean
	 */
	private boolean isStringDouble(String s) {
		try {
			Double.parseDouble(s);
			return true;
		} catch (NumberFormatException e) {
			return false;
	    }
	}
}
