package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.web.core.Params.Param;
import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenHiveSql;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.controller.service.KostatDataService;

/**
 * @Class Name : PrjMngServiceImpl.java
 * @Description : PrjMngServiceImpl Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2019.7.17           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2019.7.17
 * @version 1.0
 * @see
 *
 */

@Service("kostatDataService")
public class KostatDataServiceImpl extends EgovAbstractServiceImpl implements KostatDataService {
	/**
	 * 쿼리실행 결과 가져오기
	 * @param mapParameter
	 * @throws JSONException 
	 * @throws ClassNotFoundException 
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes" })
	public JSONObject execPgQryResult(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject resultObject = new JSONObject();
				
		String dbNm = ConfigUtil.getString("jdbc.userdb.database");
		if (mapParameter.containsKey("db_name")) dbNm = mapParameter.get("db_name").toString();
		
		String exe_query = mapParameter.get("exe_query").toString();
		boolean resultCheck = false;
		
		String pgQuery = exe_query;
		
		String database = "";
		if (mapParameter.containsKey("database")) {
			 database = mapParameter.get("database").toString() + "/" + dbNm;
		} else {
			 database = ConfigUtil.getString("jdbc.userdb.url") + "/" + dbNm;
		}
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		DBConnector dbConn = new OpenPGSql();
		
		try {
			dbConn.openConn(database, userId, pass);
			
			resultCheck = dbConn.execQuery(pgQuery);
			
			if(resultCheck){
				resultObject = dbConn.getResultJsonObject(1000);
				resultObject.put(Param.MESSAGE.getName(), "success");
			} else {
				resultObject.put(Param.MESSAGE.getName(), "fail");
			}
		} catch(Exception e) {
			resultObject.put(Param.MESSAGE.getName(), "fail");
			//System.out.println(e.getMessage());
		} finally {
			dbConn.closeConn();
		}
		
		return resultObject;
	}
	
	/**
	 * 리턴없는 쿼리실행 
	 * @param mapParameter
	 * @throws JSONException 
	 * @throws ClassNotFoundException 
	 * @exception Exception
	 */
	public JSONObject noExecPgQryResult(String exe_query) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject resultObject = new JSONObject();
				
		String dbNm = ConfigUtil.getString("jdbc.userdb.database");
		String pgQuery = exe_query;
		
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + dbNm;
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		DBConnector dbConn = new OpenPGSql();
		
		try {
			dbConn.openConn(database, userId, pass);
			dbConn.execQueryNoResult(pgQuery);
			
			resultObject.put(Param.MESSAGE.getName(), "success");
		} catch(Exception e) {
			resultObject.put(Param.MESSAGE.getName(), "fail");
			//System.out.println(e.getMessage());
		} finally {
			dbConn.closeConn();
		}
		
		return resultObject;
	}
	
	/**
	 * 숫자결과 쿼리실행 
	 * @param mapParameter
	 * @throws JSONException 
	 * @throws ClassNotFoundException 
	 * @exception Exception
	 */
	public int execPgQryResultOne(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
				
		String dbNm = ConfigUtil.getString("jdbc.userdb.database");
		if (mapParameter.containsKey("db_name")) dbNm = mapParameter.get("db_name").toString();
		String pgQuery = mapParameter.get("exe_query").toString();
		
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + dbNm;
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		DBConnector dbConn = new OpenPGSql();
		
		try {
			dbConn.openConn(database, userId, pass);
			int retCnt = dbConn.execQueryOne(pgQuery);
			
			return retCnt;
		} catch(Exception e) {
			return -1;
		} finally {
			dbConn.closeConn();
		}
	}
	

	/**
	 * 숫자결과 쿼리실행 
	 * @param mapParameter
	 * @throws JSONException 
	 * @throws ClassNotFoundException 
	 * @exception Exception
	 */
	public String execQueryStr(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
				
		String dbNm = ConfigUtil.getString("jdbc.userdb.database");
		if (mapParameter.containsKey("db_name")) dbNm = mapParameter.get("db_name").toString();
		String pgQuery = mapParameter.get("exe_query").toString();
		
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + dbNm;
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		DBConnector dbConn = new OpenPGSql();
		String retStr = "";
		try {
			dbConn.openConn(database, userId, pass);
			retStr = dbConn.execQueryStr(pgQuery);
		} catch(Exception e) {
			retStr = "";
		} finally {
			dbConn.closeConn();
		}
		return retStr;
	}
	
	/**
	 * 하이브 쿼리실행 결과 가져오기
	 * @param mapParameter
	 * @throws JSONException 
	 * @throws ClassNotFoundException 
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes" })
	public JSONObject execHiveQryResult(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		
		String exe_query = mapParameter.get("exe_query").toString();
		boolean resultCheck = false;
		
		String pgQuery = exe_query;
		
		String database = ConfigUtil.getString("jdbc.hive_userdb.url") + "/default";
		String pass =  ConfigUtil.getString("jdbc.hive_userdb.password");
		String userId =  ConfigUtil.getString("jdbc.hive_userdb.username");
		
		DBConnector dbConn = new OpenHiveSql();
		
		try {
			dbConn.openConn(database, userId, pass);
			
			resultCheck = dbConn.execQuery(pgQuery);
			
			if(resultCheck){
				org.json.JSONObject resultObject = dbConn.getHiveResultJsonObject(1000);
				object.put(Param.RESULT.getName(), resultObject);
				//object.put(Param.REQUEST_TIME.getName(), DateUtil.getTimeStamp(DateUtil.getToday()));
				object.put(Param.MESSAGE.getName(), Param.SUCCESS.getName());
			} else {
				//object.put(Param.REQUEST_TIME.getName(), DateUtil.getTimeStamp(DateUtil.getToday()));
				object.put(Param.MESSAGE.getName(), Param.FAIL.getName());
			}
		} catch(Exception e) {
			System.out.println(e.getMessage());
			object.put(Param.MESSAGE.getName(), e.getMessage());
		} finally {
			dbConn.closeConn();
		}
		
		return object;
	}
	
	/**
	 * 테이블 목록 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject getPgTables(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		
		
		String exe_query = "SELECT tbl_sch, tbl_nm table_name, tbl_nm_ko table_comment " + 
				"FROM public.kostat_resource " + 
				"WHERE db_type = 'pg' AND tbl_sch = '" + mapParameter.get("schema").toString() + "'" + 
				"ORDER BY tbl_nm";
		
		/*
		String exe_query = "SELECT MIN(a.table_schema) tbl_sch, a.table_name, MIN(c.description) table_comment " + 
				"FROM information_schema.tables a  " + 
				"LEFT JOIN  " + 
				"(SELECT oid, relname FROM pg_class WHERE relnamespace = ( SELECT oid FROM pg_catalog.pg_namespace WHERE nspname = '" + mapParameter.get("schema").toString() + "')) b " + 
				"ON a.table_name = b.relname " + 
				"LEFT JOIN  " + 
				"pg_catalog.pg_description c " + 
				"ON oid = c.objoid " + 
				"WHERE a.table_schema = '" + mapParameter.get("schema").toString() + "' AND a.table_type = 'BASE TABLE' " + 
				"GROUP BY table_name";
		*/
		
		mapParameter.put("db_name", "lbdms");
		mapParameter.put("exe_query", exe_query);
		object = execPgQryResult(mapParameter);
		
		return object;
	}
	

	/**
	 * 하이브 테이블 목록 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject getHiveTables(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		String exe_query = "SELECT tbl_sch, tbl_nm table_name, tbl_nm_ko table_comment " + 
				"FROM public.kostat_resource " + 
				"WHERE db_type = 'hive' AND tbl_sch = '" + mapParameter.get("schema").toString() + "'" + 
				"ORDER BY tbl_nm";
		mapParameter.put("db_name", "lbdms");
		mapParameter.put("exe_query", exe_query);
		object = execPgQryResult(mapParameter);
		
		return object;
	}
	
	/**
	 * 지오코딩 상태 점검
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject getGeoChk(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		String Query = "SELECT work_sts " + 
				"FROM geocoding_job WHERE job_seq  = " + mapParameter.get("job_seq").toString();
		mapParameter.put("db_name", "lbdms");
		mapParameter.put("exe_query", Query);
		String workSts = execQueryStr(mapParameter);

		if (!workSts.equals("ready") && !workSts.equals("")) {
			String exe_query = "SELECT count(*) FROM " + mapParameter.get("schema").toString() + ".geocoding_result_tbl";
			mapParameter.put("db_name", "lbdms");
			mapParameter.put("exe_query", exe_query);
			int okCnt = execPgQryResultOne(mapParameter);
			object.put("okCnt", okCnt);
		} else {
			object.put("okCnt", 0);
		}
		object.put("workSts", workSts);
		object.put(Param.MESSAGE.getName(), "success");
		
		return object;
	}
	
	/**
	 * 테이블 메타정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject getPgMetaInfo(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		String exe_query = "SELECT A.column_name, A.data_type, A.character_maximum_length, B.column_comment " + 
				"FROM INFORMATION_SCHEMA.COLUMNS A LEFT JOIN " + 
				"( " + 
				"SELECT  " + 
				"PA.ATTNAME     AS COLUMN_NAME " + 
				",PD.DESCRIPTION AS COLUMN_COMMENT " + 
				"FROM  " + 
				"PG_STAT_ALL_TABLES PS " + 
				",PG_DESCRIPTION    PD " + 
				",PG_ATTRIBUTE      PA " + 
				"WHERE PS.SCHEMANAME = '" + mapParameter.get("schema").toString() + "' " + 
				"AND PS.RELNAME      = '" + mapParameter.get("table").toString() + "' " + 
				"AND PS.RELID        = PD.OBJOID " + 
				"AND PD.OBJSUBID  <> 0 " + 
				"AND PD.OBJOID    = PA.ATTRELID " + 
				"AND PD.OBJSUBID  = PA.ATTNUM " + 
				"ORDER BY PS.RELNAME, PD.OBJSUBID " + 
				") B " + 
				"ON " + 
				"A.column_name = B.column_name " + 
				"WHERE  " + 
				"A.TABLE_CATALOG     = 'sop2016' " + 
				"AND A.TABLE_SCHEMA  = '" + mapParameter.get("schema").toString() + "' " + 
				"AND A.TABLE_NAME    = '" + mapParameter.get("table").toString() + "' " + 
				"ORDER BY ORDINAL_POSITION";
		
		mapParameter.put("exe_query", exe_query);
		object = execPgQryResult(mapParameter);
		
		return object;
	}

	/**
	 * 지오코딩 실행 정보 저장
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject geocodingAction(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
 		JSONObject resultObject = new JSONObject();
		
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		String dbNm = "lbdms";
		String database = ConfigUtil.getString("jdbc.system.url") + "/" + dbNm;
		
		DBConnector dbConn2 = new OpenPGSql();		
		

		try {
			dbConn2.openConn(database, userId, pass);
			String Query = "select nextval('job_seq')";
			boolean resultCheck = dbConn2.execQuery(Query);
			int job_seq = -1;
			if (resultCheck) {
				ResultSet rs = dbConn2.getResultSet();
				if (rs.next()) {
					job_seq = rs.getInt(1);
				} else {
					throw new Exception("데이터 처리 오류");	
				}
			} else {
				throw new Exception("데이터 처리 오류");
			}
			
			Query = "SELECT tbl_nm_ko, cl_nm, meta_tag, col_org, col_mng, col_tel, col_method, col_period " + 
					"FROM sgis_resource_hst WHERE tbl_sch  = '" + mapParameter.get("schema_nm").toString() + 
					"' AND tbl_nm = '" +mapParameter.get("table").toString() + "' ORDER BY res_hst_seq LIMIT 1";
			boolean resultCheck2 = dbConn2.execQuery(Query);
			if (resultCheck2) {
				ResultSet rs2 = dbConn2.getResultSet();
				if (rs2.next()) {
					Map param = new HashMap();
					param.put("job_seq", job_seq);
					param.put("db_type", "pg");
					param.put("tbl_sch", mapParameter.get("schema_nm").toString());
					param.put("tbl_nm", mapParameter.get("table").toString());
					param.put("col_period", null2empty(rs2.getString("col_period")));
					param.put("tbl_nm_ko", null2empty(rs2.getString("tbl_nm_ko")));
					param.put("cl_nm", null2empty(rs2.getString("cl_nm")));
					param.put("meta_tag", null2empty(rs2.getString("meta_tag")));
					param.put("col_org", null2empty(rs2.getString("col_org")));
					param.put("col_mng", null2empty(rs2.getString("col_mng")));
					param.put("col_tel", null2empty(rs2.getString("col_tel")));
					param.put("col_method", null2empty(rs2.getString("col_method")));
					param.put("col_period", null2empty(rs2.getString("col_period")));
					param.put("sop_geo_ok", "0");
					param.put("daum_geo_ok", "0");
					param.put("fail_geo_ok", "0");
					setMetaInfo(param);
				} else {
					resultCheck2 = false;
				}
			} 
			
			if (!resultCheck2) {
				Map param = new HashMap();
				param.put("job_seq", job_seq);
				param.put("db_type", "pg");
				param.put("tbl_sch", mapParameter.get("schema_nm").toString());
				param.put("tbl_nm", mapParameter.get("table").toString());
				param.put("col_period", "");
				param.put("tbl_nm_ko", "");
				param.put("cl_nm", "");
				param.put("meta_tag", "");
				param.put("col_org", "");
				param.put("col_mng", "");
				param.put("col_tel", "");
				param.put("col_method", "");
				param.put("col_period", "");
				param.put("sop_geo_ok", "0");
				param.put("daum_geo_ok", "0");
				param.put("fail_geo_ok", "0");
				setMetaInfo(param);
			}
			
			Query = "CREATE TABLE IF NOT EXISTS " + userId + ".geocoding_result_tbl AS TABLE sgissvc.geocoding_result_tbl WITH NO DATA";
			resultObject = noExecPgQryResult(Query);
			
			String pgQuery = "INSERT INTO geocoding_job( " + 
					"job_seq, schema_nm, source_loc,  " + 
					"geo_method, tbl_nm, tgt_tbl_nm, addr_col, userid,  " + 
					"work_sts, reg_dt) " + 
					"VALUES (" + job_seq + ", '" + 
					mapParameter.get("schema_nm").toString() + "','A','" + 
					mapParameter.get("geo_method").toString() + "','" + 
					mapParameter.get("table").toString() + "','" + 
					mapParameter.get("table").toString() + "','" + 
					mapParameter.get("addr_col").toString() + "','" + 
					mapParameter.get("schema_nm").toString() + "','ready',now() )";
			
			
			resultCheck = dbConn2.execQueryNoResult(pgQuery);
			
			if(resultCheck){
				resultObject.put(Param.MESSAGE.getName(), "success");
				resultObject.put("job_seq", job_seq);
			} else {
				resultObject.put(Param.MESSAGE.getName(), "fail");
			}
		} catch(Exception e) {
			resultObject.put(Param.MESSAGE.getName(), "fail");
			System.out.println(e.getMessage());
		} finally {
			dbConn2.closeConn();
		}
		
		return resultObject;
	}
	
	/**
	 * 테이블 메타정보 저장하기
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes" })
	public JSONObject setMetaInfo(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
 		JSONObject resultObject = new JSONObject();
		
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		DBConnector dbConn = new OpenPGSql();
		
		int rowCount = 0;
		try {
			dbConn.openConn(database, userId, pass);
			String qry_txt = "SELECT COUNT(*) FROM " + mapParameter.get("tbl_sch").toString() + "." + mapParameter.get("tbl_nm").toString();
			rowCount = dbConn.execQueryOne(qry_txt);
		} catch(Exception e) {
			//System.out.println(e.getMessage());
		} finally {
			dbConn.closeConn();
		}
		
		String job_seq = "";
		try {
			job_seq = mapParameter.get("job_seq").toString();
		} catch (Exception e) {
			
		}
		
		String pgQuery = "INSERT INTO sgis_resource_hst(" + 
				"res_hst_seq, db_type, tbl_sch, tbl_nm, tbl_nm_ko, tbl_cnt, " + 
				"mod_dt, cl_nm, meta_tag, col_org, col_mng, col_tel, col_method, " + 
				"col_period, sop_geo_ok, daum_geo_ok, fail_geo_ok, job_seq) " + 
				"VALUES ( " + 
				"nextval('sgis_resource_hst_seq'), '" + 
				mapParameter.get("db_type").toString() + "','" + 
				mapParameter.get("tbl_sch").toString() + "','" + 
				mapParameter.get("tbl_nm").toString() + "','" + 
				mapParameter.get("tbl_nm_ko").toString() + "','" + 
				rowCount + "',now(), '" + 
				mapParameter.get("cl_nm").toString() + "','" + 
				mapParameter.get("meta_tag").toString() + "','" + 
				mapParameter.get("col_org").toString() + "','" + 
				mapParameter.get("col_mng").toString() + "','" + 
				mapParameter.get("col_tel").toString() + "','" + 
				mapParameter.get("col_method").toString() + "','" + 
				mapParameter.get("col_period").toString() + "','" + 
				mapParameter.get("sop_geo_ok").toString() + "','" + 
				mapParameter.get("daum_geo_ok").toString() + "','" + 
				mapParameter.get("fail_geo_ok").toString() + "','" +
				job_seq + "')";
		
		String dbNm = "lbdms";
		database = ConfigUtil.getString("jdbc.system.url") + "/" + dbNm;
		
		DBConnector dbConn2 = new OpenPGSql();
		try {
			dbConn2.openConn(database, userId, pass);
			boolean resultCheck = dbConn2.execQueryNoResult(pgQuery);
			
			if(resultCheck){
				resultObject.put(Param.MESSAGE.getName(), "success");
			} else {
				resultObject.put(Param.MESSAGE.getName(), "fail");
			}
		} catch(Exception e) {
			resultObject.put(Param.MESSAGE.getName(), "fail");
			//System.out.println(e.getMessage());
		} finally {
			dbConn2.closeConn();
		}
		
		return resultObject;
	}

	/**
	 * 하이브 테이블 메타정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject getHiveMetaInfo(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		String exe_query = "describe " + mapParameter.get("schema").toString() + "." + mapParameter.get("table").toString();
		
		mapParameter.put("exe_query", exe_query);
		object = execHiveQryResult(mapParameter);
		
		return object;
	}
	
	/**
	 * 테이블 변동정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject getPgTblHst(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		mapParameter.put("db_name", "lbdms");
		String exe_query = "SELECT res_hst_seq, tbl_nm, tbl_nm_ko, " + 
				"tbl_cnt, reg_dt, mod_dt, cl_nm, meta_tag, col_org, col_mng, " + 
				"col_tel, col_dt, col_method, col_period, sop_geo_ok, daum_geo_ok, fail_geo_ok " + 
				"FROM sgis_resource_hst " + 
				"WHERE db_type = 'pg' AND tbl_sch = '" + mapParameter.get("schema").toString() + "' " + 
				"AND tbl_nm    = '" + mapParameter.get("table").toString() + "' " + 
				"ORDER BY res_hst_seq DESC LIMIT 1";
		mapParameter.put("exe_query", exe_query);
		object = execPgQryResult(mapParameter);
		return object;
	}
	
	/**
	 * 하이브 테이블 변동정보 가져오기
	 * @param mapParameter
	 * @exception Exception
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject getHiveTblHst(Map mapParameter) throws SQLException, JSONException, ClassNotFoundException {
		JSONObject object = new JSONObject();
		mapParameter.put("db_name", "lbdms");
		String exe_query = "SELECT res_hst_seq, tbl_nm, tbl_nm_ko, " + 
				"tbl_cnt, reg_dt, mod_dt, cl_nm, meta_tag, col_org, col_mng, " + 
				"col_tel, col_dt, col_method, col_period, sop_geo_ok, daum_geo_ok, fail_geo_ok " + 
				"FROM sgis_resource_hst " + 
				"WHERE db_type = 'hive' AND tbl_sch = '" + mapParameter.get("schema").toString() + "' " + 
				"AND tbl_nm    = '" + mapParameter.get("table").toString() + "' " + 
				"ORDER BY res_hst_seq LIMIT 1";
		mapParameter.put("exe_query", exe_query);
		object = execPgQryResult(mapParameter);
		return object;
	}
	
	private String null2empty(String str) {
		if (str == null) return "";
		return str.trim();
	}
}