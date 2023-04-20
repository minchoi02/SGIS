package kostat.lbdms.ServiceAPI.common.web.core;

import java.sql.SQLException;
import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Category;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.TargetAgent;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.controller.model.resource.ResourceDetail;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**  
* <pre>
* Posrgre 관련 REST 호출 클래스
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
*  </pre>
*/

@Service("postgreCommandClient")
public class PostgreCommandClient {
	
	/**
	 * <pre>
	 * 테이블을 생성한다
	 * </pre>
	 * @param String ( db_name ) 데이터베이스 명 
	 * @param String ( table_name ) 테이블 명
	 * @param JSONArray ( column_list ) 컬럼목록
	 * @param JSONArray ( data_type_list ) 컬럼 타입 목록
	 * @param String ( category1 )
	 * @param String ( category2 )
	 * @param String ( category3 )
	 * @param String ( category4 )
	 * @param String ( target_agent ) 전송할 에이전트
	 * @param String ( user_id ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public JSONObject createTable(
			String user_id,
			String table_name,
			String category1,
			String category2,
			String category3,
			String category4,
			String data_path,
			String delimiter,
			boolean header,
			String schema,
			JSONArray column_list ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "TABLE_NAME", table_name );
		
		parameters.put( "NEW_CATEGORY1", (category1 == null ? "" : category1) );
		parameters.put( "NEW_CATEGORY2", (category2 == null ? "" : category2) );
		parameters.put( "NEW_CATEGORY3", (category3 == null ? "" : category3) );
		parameters.put( "NEW_CATEGORY4", Category.ANALYSIS );
		
		parameters.put( "COLUMN_INFO", column_list );
		
		parameters.put( "DATA_PATH", data_path );
		parameters.put( "DELIMITER", delimiter );
		parameters.put( "HEADER", header );
		parameters.put( "SCHEMA", schema );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.CREATE_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * HDFS상의 데이터를 테이블에 로드한다
	 * </pre>
	 * @param String ( db_name ) 데이터베이스 명
	 * @param String ( data_name ) 데이터 명 
	 * @param String ( data_path ) 데이터 경로
	 * @param String ( table_name ) 테이블 명 
	 * @param String ( delimiter ) 구분자
	 * @param String ( user_id ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public JSONObject loadData(
			String db_name,
			String data_name,
			String data_path,
			String table_name,
			String delimiter,
			String user_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.DB_NAME, db_name );
		parameters.put( "DATA_NAME", data_name );
		parameters.put( "DATA_PATH", data_path );
		parameters.put( RequestKey.TABLE_NAME, table_name );
		parameters.put( "DELIMITER", delimiter );
		parameters.put( RequestKey.TARGET_AGENT, TargetAgent.NAMENODE2);
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.INSERT_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}
	
	
	/**
	 * <pre>
	 * 테이블 목록을 조회한다
	 * </pre>
	 * @param String ( target_agent ) 전송할 에이전트
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getTableList(
			String schema
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE" );
		parameters.put( RequestKey.SCHEMA , schema );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.TABLES, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터베이스 목록을 조회한다
	 * </pre>
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getDatabaseList() throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE" );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.DATABASES, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 테이블 이름 수정
	 * </pre>
	 * @param String ( table_name ) 테이블 명 
	 * @param String ( new_table_name ) 변경할 테이블 명
	 * @param String ( schema ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public void renameTable(
			String table_name,
			String new_table_name,
			String schema
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.SCHEMA, schema );
		parameters.put( "TABLE_NAME", table_name );
		parameters.put( "NEW_TABLE_NAME", new_table_name );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.ALTER_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * 쿼리 실행
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( query ) 쿼리
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject executeQuery(
			String user_id,
			String query
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "PG_QUERY", query );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.EXECUTE_QUERY, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}
	
	
	/**
	 * <pre>
	 * 쿼리 실행
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( query ) 쿼리
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public String executeRawQuery(
			String user_id,
			String query
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "PG_QUERY", query );
		
		String res = new RestService().rawcall( Command.ACTION, Command.POSTGRE, Command.EXECUTE_QUERY, parameters );
		
		/*
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		*/
		
		return res;
		
	}

	/**
	 * <pre>
	 * 쿼리 실행
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( query ) 쿼리
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public boolean executeRawQueryByPgSystem(
			String user_id,
			String exe_query
			) throws Exception{
		
		String pgQuery = exe_query;
		
		
		// 수집에서 도로명주소, 국토부는 analysis02로 붙어야하기때문에 flag false면 02번 아니면 01번
		/*
		boolean flag = true;
		if(params.has("FLAG")){
			flag = params.getBoolean("FLAG");
		}
		System.out.println("[SendAgentFunc.java] params.toString() [" + params.toString());
		System.out.println("[SendAgentFunc.java] flag [" + flag);
		*/
		String which_user = exe_query;
		
		String database = ConfigUtil.getString("jdbc.system.url") + "/" + ConfigUtil.getString("jdbc.system.database");
		String pass =  ConfigUtil.getString("jdbc.system.password");
		String userId =  ConfigUtil.getString("jdbc.system.username");
		
		DBConnector pgConn = new OpenPGSql();
//		String database = "jdbc:postgresql://" + EnvSettings.instance().getPostgreIp() + ":" + EnvSettings.instance().getPostgrePort() + "/sop2015"; 
		
		try {
			pgConn.openConn(database, userId, pass);
			
			//String query[] = null;
			return pgConn.retExecQueryNoResult(pgQuery);
		} catch (SQLException e) {			
			return false;
		} catch (Exception e) {
			return false;
		} finally {
			pgConn.closeConn();
		}
	}
	

	/**
	 * <pre>
	 * 쿼리 실행
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( query ) 쿼리
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public boolean executeRawQueryByPgUser(
			String user_id,
			String exe_query
			) throws Exception{
		
		String pgQuery = exe_query;
		
		
		
		// 수집에서 도로명주소, 국토부는 analysis02로 붙어야하기때문에 flag false면 02번 아니면 01번
		/*
		boolean flag = true;
		if(params.has("FLAG")){
			flag = params.getBoolean("FLAG");
		}
		System.out.println("[SendAgentFunc.java] params.toString() [" + params.toString());
		System.out.println("[SendAgentFunc.java] flag [" + flag);
		*/
		String which_user = exe_query;
		
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		DBConnector pgConn = new OpenPGSql();
//		String database = "jdbc:postgresql://" + EnvSettings.instance().getPostgreIp() + ":" + EnvSettings.instance().getPostgrePort() + "/sop2015"; 
		
		try {
			pgConn.openConn(database, userId, pass);
			
			//String query[] = null;
			return pgConn.retExecQueryNoResult(pgQuery);
		} catch (SQLException e) {			
			return false;
		} catch (Exception e) {
			return false;
		} finally {
			pgConn.closeConn();
		}
	}
	
	
	/**
	 * <pre>
	 * 쿼리 실행
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( query ) 쿼리
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public String executeRawQueryByPg(
			String user_id,
			String exe_query
			) throws Exception{
		
		String result = null;
		boolean resultCheck = false;
		
		String pgQuery = exe_query;
		
		
		
		// 수집에서 도로명주소, 국토부는 analysis02로 붙어야하기때문에 flag false면 02번 아니면 01번
		/*
		boolean flag = true;
		if(params.has("FLAG")){
			flag = params.getBoolean("FLAG");
		}
		System.out.println("[SendAgentFunc.java] params.toString() [" + params.toString());
		System.out.println("[SendAgentFunc.java] flag [" + flag);
		*/
		String which_user = exe_query;
		
		String userId = "";
		String database = "";
		String pass = "";
		if (which_user.toLowerCase().contains("postgres.")) {
			System.out.println("[SendAgentFunc.java] which_user.toLowerCase().contains(\"postgres.\") [" + which_user.toLowerCase().contains("postgres."));
			database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
    		pass =  ConfigUtil.getString("jdbc.userdb.password");
    		userId =  ConfigUtil.getString("jdbc.userdb.username");
		} else {
			database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
			pass =  ConfigUtil.getString("jdbc.userdb.password");
			userId =  ConfigUtil.getString("jdbc.userdb.username");
			//userId = params.getString("USER_ID");
			//database = EnvSettings.instance().getAnalysisJdbcConnect();
		}
		
		DBConnector pgConn = new OpenPGSql();
//		String database = "jdbc:postgresql://" + EnvSettings.instance().getPostgreIp() + ":" + EnvSettings.instance().getPostgrePort() + "/sop2015"; 
		
		try {
			pgConn.openConn(database, userId, pass);
			
			String query[] = null;
			if(pgQuery.indexOf(";") > 0) {
				query = pgQuery.split(";");
				for (int ii = 0; ii < query.length; ii++) {
					resultCheck = pgConn.execQuery(query[ii]);
				}
			} else {
				resultCheck = pgConn.execQuery(pgQuery);
			}
			
			if(resultCheck){
				org.json.JSONObject resultObject = pgConn.getResultJsonObject(10000);
				result = ReturnDefine.successResult(resultObject);
			}else{
				result = ReturnDefine.success();
			}
			
		} catch (SQLException e) {
			throw new Exception(e);
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			pgConn.closeConn();
		}
		return result;
	}
	
	/**
	 * <pre>
	 * 쿼리 실행
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( query ) 쿼리
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public String executeRawQueryByUser(
			String exe_query
			) throws Exception{
		
		String result = null;
		String pgQuery = exe_query;
		
		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
		String pass =  ConfigUtil.getString("jdbc.userdb.password");
		String userId =  ConfigUtil.getString("jdbc.userdb.username");
		
		DBConnector pgConn = new OpenPGSql();
//		String database = "jdbc:postgresql://" + EnvSettings.instance().getPostgreIp() + ":" + EnvSettings.instance().getPostgrePort() + "/sop2015"; 
		
		try {
			pgConn.openConn(database, userId, pass);
			boolean resultCheck = pgConn.execQuery(pgQuery);
			if (resultCheck && pgConn.getResultSet().next()) {
				result = "" + pgConn.getResultSet().getInt(1);
			}
		} catch (SQLException e) {
			throw new Exception(e);
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			pgConn.closeConn();
		}
		return result;
	}
	
	/**
	 * <pre>
	 * 테이블 삭제
	 * </pre>
	 * @param String ( db_name ) 데이터베이스 
	 * @param String ( table_name ) 테이블 명
	 * @param String ( target_agent ) 전송할 에이전트
	 * @param String ( user_id ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public void dropTable(
			String db_name,
			String table_name,
			String target_agent,
			String user_id
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "DB_NAME", db_name );
		parameters.put( "TABLE_NAME", table_name );
		parameters.put( "TARGET_AGENT", target_agent );
		
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.DROP_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * 데이터베이스 삭제
	 * </pre>
	 * @param String ( db_name ) 데이터베이스 
	 * @param String ( target_agent ) 전송할 에이전트
	 * @throws SystemFailException
	 */
	public void dropDatabase(
			String db_name,
			String target_agent
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "DB_NAME", db_name );
		parameters.put( "TARGET_AGENT", target_agent );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.DROP_DB, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * 메타데이터 조회
	 * </pre>
	 * @param String ( schema ) 스키마 명 
	 * @param String ( table_name ) 테이블 명
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getTableInfo(
			String schema,
			String table_name,
			String user_id
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE");
		parameters.put( "TARGET_AGENT", TargetAgent.NAMENODE2 );
		parameters.put( "SCHEMA", schema );
		parameters.put( "TABLE_NAME", table_name );
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.TABLE_INFO, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}
	
	/**
	 * <pre>
	 * 메타데이터 조회(컬럼조회)
	 * </pre>
	 * @param String ( resource_id ) 리소스 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getPgTableInfo(
			int resource_id
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE");
		parameters.put( RequestKey.RESOURCE_ID, resource_id );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.TABLE_INFO, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}

	/**
	 * <pre>
	 * 스키마 목록을 조회한다
	 * </pre>
	 * @param String ( userId ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject getSchemas( String userId ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE" );
		parameters.put( "USER_ID", userId );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.SCHEMAS, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * <pre>
	 * 미등록 테이블 목록을 조회한다
	 * </pre>
	 * @param String ( schema ) 스키마
	 * @param String ( userId ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject getUnclassifiedList(String schema, String userId) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "USER_ID", userId );
		parameters.put( "SCHEMA", schema );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.UNCLASSIFIED_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * 미등록 테이블을 시스템에 등록한다 
	 * @param ResourceDetail ( resource ) 생성 리소스 정보
	 * @throws SystemFailException 
	 */
	public void registerTable( ResourceDetail resource ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "USER_ID", resource.getUser_id() );
		parameters.put( "SCHEMA", resource.getDb_name() );
		parameters.put( "CATEGORY1", resource.getCategory1() );
		parameters.put( "CATEGORY2", resource.getCategory2() );
		parameters.put( "CATEGORY3", StringUtils.defaultString( resource.getCategory3(), StringUtils.EMPTY ) );
		parameters.put( "CATEGORY4", resource.getCategory4() );
		parameters.put( "TABLE_NAME", resource.getTable_name() );
		parameters.put( "DESCRIPTION", StringUtils.defaultString( resource.getDescription(), StringUtils.EMPTY ) );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.REGISTER, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * PG 권한변경
	 * </pre>
	 * @param userid 사용자아이디
	 * @param schema 스키마
	 * @param table 테이블
	 * @param grant 승인
	 * @return
	 */
	public JSONObject pgSetAuth(String userId, String schema, String table, String grant ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "USER_ID", userId );
		parameters.put( "SCHEMA", schema );
		parameters.put( "TABLE", table );
		
		JSONObject res = null;
		if (grant.equals("REVOKE")) {			
			res = new RestService().call( Command.SYSTEM, Command.MANAGE, Command.REVOKE, parameters );	
		} else {
			parameters.put( "GRANT", grant );
			res = new RestService().call( Command.SYSTEM, Command.MANAGE, Command.GRANT, parameters );
		}
		
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
//	/**
//	 * <pre>
//	 * PG 사용자 존재 체크
//	 * </pre>
//	 * @param userid 사용자아이디
//	 * @return
//	 */
	/* @Depreacated
	public JSONObject pgUserChk(String userId ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "SCHEMA", userId );
		
		JSONObject res = new RestService().call( Command.SYSTEM, Command.MANAGE, Command.PG_SCHEMA_CHECK, parameters );	
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}*/
	
	
	/**
	 * <pre>
	 * PG 사용자 추가
	 * </pre>
	 * @param userid 사용자아이디
	 * @return
	 */
	public JSONObject pgUserAdd(String userId, String usertype ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "USER_ID", userId );
		parameters.put( "USER_TYPE", usertype );
		
		JSONObject res = new RestService().call( Command.SYSTEM, Command.MANAGE, Command.REGISTER, parameters );	
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}	
	
	/**
	 * <pre>
	 * 사용자 권한 설정
	 * </pre>
	 * @param userId
	 * @param isSuperUser
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject setUser(String userId, boolean isSuperUser ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "USER_ID", userId );
		parameters.put( "USER_TYPE", isSuperUser ? "SUPERUSER" : "NOSUPERUSER" );
		
		JSONObject res = new RestService().call( Command.ACTION, Command.POSTGRE, Command.PG_SETUSER, parameters );	
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * 사용자 스키마 및 롤 생성
	 * @param params
	 */
	public boolean pgSetting(String user, String userType) throws Exception {
		String resourceDB = DBSettings.RESOURCEDB;
		String pgSuperUser = DBSettings.PGUSER;
		String pass = DBSettings.PGPASS;
		
		boolean isSuccess = false;
		
		DBConnector resourceConnection = null;
		
		try {
			resourceConnection = new OpenPGSql();
			resourceConnection.openConn(resourceDB, pgSuperUser, pass);
			
			String createSchema = "create schema " + user;
			String createRole = "";
			
			if(userType.equals("SUPERUSER")){
				createRole = "create role " + user + " login password " + "'" + pass + "' SUPERUSER";			
			}else{
				createRole = "create role " + user + " login password " + "'" + pass + "'";
			}
			
			String grantUser = "grant all on schema " + user + " to " + user;
			
			resourceConnection.execQueryNoResult(createRole);
			
			resourceConnection.execQueryNoResult(createSchema);
			resourceConnection.execQueryNoResult(grantUser);
			
			isSuccess = true;
		} catch (Exception e) {
			e.printStackTrace();
			return isSuccess;
		} finally {
			if (resourceConnection != null) {
				resourceConnection.closeConn();
			}
		}
		
		return isSuccess;
	}
	
	public void pgSetUser(String user, boolean isSuperUser) throws Exception {
		String resourceDB = DBSettings.RESOURCEDB;
		String pgSuperUser = DBSettings.PGUSER;
		String pass = DBSettings.PGPASS;
		
		DBConnector resourceConnection = new OpenPGSql();
		
		try {
			resourceConnection.openConn(resourceDB, pgSuperUser, pass);
			String createRole = "";        
			
			if(isSuperUser){
				createRole = "ALTER USER " + user + " WITH SUPERUSER";			
			}else 
			{
				createRole = "ALTER USER " + user + " WITH NOSUPERUSER";		
			}
				
			//String grantUser = "grant all on schema " + user + " to " + user;
			resourceConnection.execQueryNoResult(createRole);
			//dbConn.execQueryNoResult(grantUser);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} finally {
			resourceConnection.closeConn();
		}
	}
}
