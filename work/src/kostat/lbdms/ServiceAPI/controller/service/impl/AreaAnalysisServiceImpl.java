package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.ResultSet;
import java.util.HashMap;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
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
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service("areaAnalysisService")
public class AreaAnalysisServiceImpl extends EgovAbstractServiceImpl implements AreaAnalysisService {
	private static final Logger logger = LoggerFactory.getLogger(AreaAnalysisServiceImpl.class);
	
	@Resource(name="postgreCommandClient")
	private PostgreCommandClient client;
	
	public JSONObject analyze(MyDataAnalysis data) throws SystemFailException {
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
		System.out.println(">>>>>>>>>>>>>>>>1");
		
		try {
			JSONArray conditions;
			HashMap<String, Object> parameters;
			HashMap<String, Object> analysisParameters;
			
			//데이터분석-최인섭
			conditions = this.getConditions(data);
			analysisParameters = this.parseConditionArray(conditions);
			System.out.println(">>>>>>>>>>>>>>>>2" + conditions.toString());
			parameters = this.createParameters(data, conditions);
			System.out.println(">>>>>>>>>>>>>>>>3" + parameters.toString());
			parameters = this.setAnalysisParameters(parameters, analysisParameters);
			System.out.println(">>>>>>>>>>>>>>>>4" + parameters.toString());
			this.sendAnalysisLog(analysisParameters, data.getUserid(), data.getResult_table_name());
			System.out.println(">>>>>>>>>>>>>>>>5");
			
			RestService restService = new RestService();
			return restService.call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_CONDITION_CENSUS, parameters);
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
	
	/**
	 * condition json array를 분석해 depth1, depth2, year, targetselect 정보 리턴
	 * 데이터 테이블 선택 쿼리용 정보들
	 * @param conditions
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> parseConditionArray(JSONArray conditions) throws Exception {
		if (conditions == null) {
			return null;
		}
		
		int i;
		HashMap<String, Object> parsedCondition;
		
		parsedCondition = new HashMap<String, Object>();
		
		if (conditions.size() > 0) {
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
		} else {
			parsedCondition.put("DEPTH1", "-");
			parsedCondition.put("DEPTH2", "-");
			parsedCondition.put("YEAR", "-");
			parsedCondition.put("TARGET_SELECT", "-");
		}
		
		return parsedCondition;
	}
	
	/**
	 * condition 이 있을 경우 json array로 변환해서 리턴
	 * 없으면 빈 json array 리턴
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private JSONArray getConditions(MyDataAnalysis data) throws Exception {
		if (data.getCondition() != null && !data.getCondition().isEmpty() && !data.getCondition().equals("[]")) {
            return JSONArray.fromObject(data.getCondition().replaceAll(System.getProperty("line.separator"), ""));
        } else {
        	return new JSONArray();
        }
	}
	
	/**
	 * 분석 파라미터 생성 .. 왜 하는지 ??
	 * @param parameters
	 * @param analysisParameters
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setAnalysisParameters(
			HashMap<String, Object> parameters,
			HashMap<String, Object> analysisParameters) throws Exception {
		
		if (String.valueOf(analysisParameters.get("DEPTH1")) != null) {
			parameters.put("DEPTH1", String.valueOf(analysisParameters.get("DEPTH1")));
		}
		
		if (String.valueOf(analysisParameters.get("DEPTH2")) != null) {
			parameters.put("DEPTH2", String.valueOf(analysisParameters.get("DEPTH2")));
		}
		
		if (String.valueOf(analysisParameters.get("YEAR")) != null) {
			parameters.put("YEAR", String.valueOf(analysisParameters.get("YEAR")));
		}
		
		if (String.valueOf(analysisParameters.get("TARGET_SELECT")) != null) {
			parameters.put("TARGET_SELECT", String.valueOf(analysisParameters.get("TARGET_SELECT")));
		}
		
		return parameters;
	}
	
	/**
	 * 파라미터 생성
	 * @param data
	 * @param conditions
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> createParameters(MyDataAnalysis data, JSONArray conditions) throws Exception {
		HashMap<String, Object> parameters;
		System.out.println(">>>>>>>>>>>>>>>>3_1>" + conditions.toString());
		
		parameters = new HashMap<String, Object>();
		parameters = this.setCommonParameters(parameters, data);
		System.out.println(">>>>>>>>>>>>>>>>3_2>" + parameters.toString());
		
		parameters = this.setParametersBySelStep(parameters, data);
		System.out.println(">>>>>>>>>>>>>>>>3_3>" + parameters.toString());
		
		parameters = this.setDataParameters(parameters, conditions, data);
		System.out.println(">>>>>>>>>>>>>>>>3_4>" + parameters.toString());
		return parameters;
	}
	
	/**
	 * 데이터 정보 파라미터 생성
	 * @param parameters
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setDataParameters(HashMap<String, Object> parameters, JSONArray conditions, MyDataAnalysis data) throws Exception {
		// condition이 있을 경우에만 agent에서 condition에 따른 테이블 가져오기
		AnalysisUtils utils = new AnalysisUtils();
		
		parameters.put("DATA_TABLE", data.getData_name());
		System.out.println(">>>>>>>>>>>>>>>>4_1>" + data.getData_name());
		parameters.put("DATA_SCHEMA", this.getDataSchema(data, conditions));
		System.out.println(">>>>>>>>>>>>>>>>4_2>" + this.getDataSchema(data, conditions));
		parameters.put("CONDITION", conditions);
		parameters.put("WHERE_STATEMENT", utils.createCensusWhereClause(conditions));
		System.out.println(">>>>>>>>>>>>>>>>4_3>" + utils.createCensusWhereClause(conditions));
		parameters.put("SUMMARYFIELD", data.getSummaryField());
		parameters.put("SUMMARYOPER", data.getSummaryOper());
		System.out.println(">>>>>>>>>>>>>>>>4_4>" + data.getSummaryField() + "," + data.getSummaryOper());
		return parameters;
	}
	
	/**
	 * 데이터 스키마 가져오기
	 * @param data
	 * @param conditions
	 * @return
	 * @throws Exception
	 */
	private String getDataSchema(MyDataAnalysis data, JSONArray conditions) throws Exception {
		if (conditions.size() > 0) {
			return "kostat";
		} else { // condition이 없을 경우 사용자 데이터로 판단
			return data.getData_table_schema();
		}
	}
	
	/**
	 * selstep에 따른 테이블 정보 설정
	 * @param parameters
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setParametersBySelStep(HashMap<String, Object> parameters, MyDataAnalysis data) throws Exception {
		switch (data.getSelstep()) {
			// 행정 경계
			case "1": {
				return this.setAdminAreaParameters(parameters, data);
			}
			
			// 그리드
			case "2": {
				return this.setGridAreaParameters(parameters, data);
			}
			
			// 헥사곤
			case "3": {
				return this.setHexagonAreaParameters(parameters, data);
			}
			
			// 임의
			case "4": {
				return this.setUserAreaParameters(parameters, data, "RANDOM");
			}
			
			// 사용자
			case "5": {
				return this.setUserAreaParameters(parameters, data, "USER");
			}
			
			default: {
				throw new Exception("selstep이 잘못 되었습니다: " + data.getSelstep());
			}
		}
	}
	
	/**
	 * 사용자 영역 이용할 경우 (임의, 사용자)
	 * @param parameters
	 * @param data
	 * @param type = RANDOM, USER
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setUserAreaParameters(HashMap<String, Object> parameters, MyDataAnalysis data, String type) throws Exception {
		parameters.put("GEO_DATA_TYPE", type);
		parameters.put("POLYGON_SCHEMA", data.getArea_table_schema());
		parameters.put("POLYGON_TABLE", data.getArea_name());
		parameters.put("ACTION_TYPE", "MYDATA_ANALY");
		
		return parameters;
	}
	
	/**
	 * 헥사곤일 경우 파라미터 설정
	 * @param parameters
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setHexagonAreaParameters(HashMap<String, Object> parameters, MyDataAnalysis data) throws Exception {
		parameters.put("GEO_DATA_TYPE", "HEXAGON");
		parameters.put("POLYGON_SCHEMA", "kostat");
		parameters.put("HEXAGON_SCHEMA", "kostat");
		parameters.put("HEXAGON_TABLE", this.getHexagonTableName(data.getSpace_value()));
		parameters.put("ACTION_TYPE", "HEXAGON_ANALY_" + this.getAdmActionType(data));
		parameters = this.setPolygonTableInfoByAdmType(parameters, data);
		
		return parameters;
	}
	
	/**
	 * 그리드일 경우 파라미터 설정
	 * @param parameters
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setGridAreaParameters(HashMap<String, Object> parameters, MyDataAnalysis data) throws Exception {
		parameters.put("GEO_DATA_TYPE", "GRID");
		parameters.put("POLYGON_SCHEMA", "kostat");
		parameters.put("GRID_SCHEMA", "kostat");
		parameters.put("GRID_TABLE", this.getGridTableName(data.getSpace_value()));
		parameters.put("ACTION_TYPE", "GRID_ANALY_" + this.getAdmActionType(data));
		parameters = this.setPolygonTableInfoByAdmType(parameters, data);
		
		return parameters;
	}
	
	private String getAdmActionType(MyDataAnalysis data) throws Exception {
		if ("totaloa".equals(data.getAdmType())) {
			return "TOT";
		} else {
			return data.getAdmType().toUpperCase();
		}
	}
	
	/**
	 * 헥사곤 테이블 명 가져오기
	 * @param space
	 * @return
	 * @throws Exception
	 */
	private String getHexagonTableName(int space) throws Exception {
		if (space != 1000
			&& space != 5000
			&& space != 10000) {
			
			space = 1000;
		}
		
		return "sido_hexa_" + space;
	}
	
	/**
	 * 그리드 테이블 명 가져오기
	 * @param space
	 * @return
	 * @throws Exception
	 */
	private String getGridTableName(int space) throws Exception {
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
			
		return "gridindex" + spaceSize;
	}
	
	/**
	 * 행정 경계 파라미터 생성
	 * @param paramters
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setAdminAreaParameters(HashMap<String, Object> parameters, MyDataAnalysis data) throws Exception {
		parameters.put("GEO_DATA_TYPE", "ADMIN_DATA");
		parameters.put("POLYGON_SCHEMA", "kostat");
		parameters.put("ACTION_TYPE", "ADMIN_ANALY_" + this.getAdmActionType(data));
		parameters = this.setPolygonTableInfoByAdmType(parameters, data); // 지역 폴리곤 테이블 
		
		return parameters;
	}
	
	/**
	 * admtype 이용한 파라미터 설정
	 * @param parameters
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setPolygonTableInfoByAdmType (
			HashMap<String, Object> parameters,
			MyDataAnalysis data) throws Exception {
		
		String type;
		
		if ("totaloa".equals(data.getAdmType())) {
			type = "total";
		} else {
			type = data.getAdmType();
		}
		
		switch (type) {
			case "sido": {
				parameters.put("POLYGON_TABLE", "bnd_sido_pg");
				parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
				parameters.put("POLYGON_KEY", null);
				break;
			}
			case "sgg": {
				parameters.put("POLYGON_TABLE", "bnd_sigungu_pg");
				
				if ("all".equalsIgnoreCase(data.getSido())) {
					parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");
					parameters.put("POLYGON_KEY", null);
				} else {
					parameters.put("GEO_DATA_CD_COLUMN", "sigungu_cd");
					parameters.put("POLYGON_KEY", data.getSido());
				}
				
				break;
			}
			case "dong": {
				parameters.put("POLYGON_TABLE", "bnd_adm_dong_pg");

				if ("all".equalsIgnoreCase(data.getSido())) {
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_KEY", null);
				} else if ("all".equalsIgnoreCase(data.getSgg())) {
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_KEY", data.getSido());
				} else {
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_KEY", data.getSgg());
				}
				
				break;
			}
			case "total": {
				parameters.put("POLYGON_TABLE", "bnd_total_oa_pg");
				
				// TODO: 수정 필요합니다
				if ("all".equalsIgnoreCase(data.getSido())) { // 시도 전체
					parameters.put("GEO_DATA_CD_COLUMN", "sido_cd");
					parameters.put("POLYGON_KEY", null);
				} else if ("all".equalsIgnoreCase(data.getSgg())) { // 시군구 전체
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_KEY", data.getSido());
				} else if ("all".equalsIgnoreCase(data.getDong())) { // 읍면동 전체
					parameters.put("GEO_DATA_CD_COLUMN", "adm_dr_cd");
					parameters.put("POLYGON_KEY", data.getSgg());
				} else { // 나머지
					parameters.put("GEO_DATA_CD_COLUMN", "tot_oa_cd");
					parameters.put("POLYGON_KEY", data.getDong());
				}
				
				break;
			}
			default: {
				return parameters;
			}
		}
		
		return parameters;
	}
	
	/**
	 * 일반 정보 파라미터 등록
	 * @param parameters
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private HashMap<String, Object> setCommonParameters(HashMap<String, Object> parameters, MyDataAnalysis data) throws Exception {
		parameters.put("DESCRIPTION", data.getResult_table_desc());
		parameters.put("RESULT_TABLE", data.getResult_table_name());
		parameters.put("RESULT_TABLE_NAME", data.getResult_table_name()); // 아무 씰데 없음 - controller 용
		parameters.put("RESULT_SCHEMA", data.getUserid());
		parameters.put("ANALYSIS_STEP", data.getSelstep());
		parameters.put("USER_ID", data.getUserid());
		parameters.put("NEW_AREA", true);
		parameters.put("BATCH_YN", true);
		
		return parameters;
	}
	
	/**
	 * 얜 뭐 ?
	 * @param analysisParameters
	 * @param userId
	 * @param result
	 * @throws Exception
	 * @throws SystemFailException 
	 */
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
	
	/**
	 * 테이블 존재하는지 확인
	 * @param data
	 * @return
	 * @throws Exception
	 */
	private JSONObject checkResourceTable(MyDataAnalysis data) throws Exception {
		HashMap<String, Object> parameters;
		
		parameters = new HashMap<String, Object>();
		parameters.put("USER_ID", data.getUserid());
		parameters.put("TABLE_NM", data.getResult_table_name());
		
		RestService restService = new RestService();
		return restService.call(Command.RESOURCE, Command.TABLE_CHECK, parameters);
	}
}
