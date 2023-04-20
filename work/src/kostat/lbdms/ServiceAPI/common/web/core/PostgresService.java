package kostat.lbdms.ServiceAPI.common.web.core;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.common.web.db.DBConnector;
import kostat.lbdms.ServiceAPI.common.web.db.OpenPGSql;
import kostat.lbdms.ServiceAPI.common.web.model.Meta;
import kostat.lbdms.ServiceAPI.common.web.model.MetaName;
import kostat.lbdms.ServiceAPI.common.web.model.QueryResult;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.ResultKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.TargetAgent;
import kostat.lbdms.ServiceAPI.common.web.rest.mapper.ResourceMapper;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.controller.model.resource.ResourceDetail;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

/**  
* <pre>
* 포스트그레 DB 관리 서비스
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
* 
* </pre>
*/

@Component
public class PostgresService {
	
	@Autowired
	private PostgreCommandClient client;
	
	 @Autowired
	private ResourceMapper mapper;
	
	/**
	 * <pre>
	 * 테이블 목록을 조회한다
	 * </pre>
	 * @param String ( schema ) 스키마
	 * @return List
	 * @throws SystemFailException
	 */
	public List<MetaName> getTableList( String schema ) throws SystemFailException{
		
		List<MetaName> names = new ArrayList<MetaName>();
		
		JSONObject res = client.getTableList( schema );
		
		if ( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		
		JSONArray values = message.getJSONArray("VALUE");
		for ( int i = 0, size = values.size(); i < size; i++ ){
			JSONObject item = values.getJSONObject(i);
			MetaName name = new MetaName();
			name.setValue( item.getString("table_name") );
			names.add( name );
		}
		
		return names;
	}
	
	/**
	 * <pre>
	 * 데이터베이스 목록을 조회한다
	 * </pre>
	 * @return List
	 * @throws SystemFailException
	 */
	public List<MetaName> getDatabaseList() throws SystemFailException{
		
		List<MetaName> names = new ArrayList<MetaName>();
		
		JSONObject res = client.getDatabaseList();
		
		if ( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		
		JSONArray values = message.getJSONArray("VALUE");
		for ( int i = 0, size = values.size(); i < size; i++ ){
			JSONObject item = values.getJSONObject(i);
			MetaName name = new MetaName();
			name.setValue( item.getString("datname") );
			names.add( name );
		}
		
		return names;
	}
	
	/**
	 * <pre>
	 * 스키마 목록 조회
	 * </pre>
	 * @param ( String )  userId 사용자 아이디
	 * @return List
	 * @throws SystemFailException 
	 */
	public List<MetaName> getSchemaList( String userId ) throws SystemFailException {
		
		List<MetaName> names = new ArrayList<MetaName>();
		
		JSONObject res = client.getSchemas( userId );
		
		if ( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		
		JSONArray values = message.getJSONArray("VALUE");
		for ( int i = 0, size = values.size(); i < size; i++ ){
			JSONObject item = values.getJSONObject(i);
			MetaName name = new MetaName();
			name.setValue( item.getString("schema_name") );
			names.add( name );
		}
		
		return names;
	}
	
	/**
	 * <pre>
	 * 쿼리 실행
	 * </pre>
	 * @param String ( query ) 쿼리
	 * @param String ( user_id ) 사용자 아이디
	 * @return QueryResult
	 * @throws SystemFailException
	 */
	public QueryResult executeQuery(
			String query,
			String user_id
			) throws SystemFailException{
		
		QueryResult result = new QueryResult();
		
		JSONObject res = client.executeQuery( user_id, query );
		if ( !res.has( ResultKey.MESSAGE ) ){
			throw new SystemFailException("MESSAGE Key가 존재하지 않습니다");
		}
		
		if ( res.get( ResultKey.MESSAGE )  instanceof JSONObject ){
			JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
			
			if ( message.has("VALUE") ){
				result.setValues( message.getJSONArray("VALUE") );
			}
			if ( message.has("COLUMN") ) {
				result.setColumns( message.getJSONArray("COLUMN") );
			}
			
		} else if ( res.get( ResultKey.MESSAGE )  instanceof String ){
			
			// 성공 여부 리턴 시 ( DML )  
			if ( StringUtils.equalsIgnoreCase( res.getString( ResultKey.MESSAGE ), ResultKey.SUCCESS ) ){
				String name = "result";
				JSONArray columns = new JSONArray();
				columns.add( name );
				result.setColumns( columns );
				
				JSONArray values = new JSONArray();
				JSONObject item = new JSONObject();
				item.put( name, "실행되었습니다");
				values.add( item );
				result.setValues( values );
			}
			
		}
		
		return result;
		
	}
	
    
    public QueryResult executeQueryNew(String query, String user_id ) throws SystemFailException{
    	QueryResult result = new QueryResult();
    	DBConnector conn = new OpenPGSql();
    	try {
    		String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
    		String pass =  ConfigUtil.getString("jdbc.userdb.password");
    		String dbname =  ConfigUtil.getString("jdbc.userdb.username");
    		String tableName = null;
    		String userId = null;
    		String schema = null;
    		
    		conn.openConn(database, dbname, pass);
    		conn.execQuery(query);
    		JSONArray resultQ = conn.getResult2(1000);
    		result.setValues(resultQ);
    		
    		List<String> columnList = conn.getColumnList();
    		JSONArray columnsList = JSONArray.fromObject(columnList);
    		result.setColumns(columnsList);
    		
    		if (resultQ.size() == 0) {
    			throw new Exception("테이블 정보가 없습니다.");
    		} else {
    			
//    			String name = "result";
//				JSONArray columns = new JSONArray();
//				columns.add( name );
//				result.setColumns( columns );
//				
//				JSONArray values = new JSONArray();
//				JSONObject item = new JSONObject();
//				item.put( name, "실행되었습니다");
//				values.add( item );
//				result.setValues( values );
    			
    			return result;
    		}
    		
    		
    	} catch (Exception e) {
    		// TODO Auto-generated catch block
    		e.printStackTrace();
    	} finally {
    		conn.closeConn();
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
		
		client.dropTable(db_name, table_name, TargetAgent.NAMENODE2, user_id);
		
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
		
		client.dropDatabase(db_name, TargetAgent.NAMENODE2 );
	}
	
	/**
	 * <pre>
	 * 테이블 상세정보 조회
	 * </pre>
	 * @param String ( db_name ) 데이터베이스 명
	 * @param String ( table_name ) 테이블 명
	 * @param String ( user_id ) 사용자 아이디
	 * @return 테이블 상세정보 
	 * @throws SystemFailException
	 */
	public List<Meta> getTableInfo( String db_name, String table_name, int resource_id, String user_id ) throws SystemFailException{
	
		List<Meta> metaList = new ArrayList<Meta>();
		
		JSONObject res = new JSONObject();
		
		if(resource_id > 0){
			res = client.getPgTableInfo(resource_id);
		} else {
			res = client.getTableInfo( db_name, table_name, user_id );
		}
		
		if ( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		
		JSONArray value = message.getJSONArray("VALUE");
		
		for ( int i = 0, size = value.size(); i < size; i++ ){
			
			JSONObject item = value.getJSONObject(i);
			
			Meta meta = new Meta();
			
			meta.setColumn_name( item.getString("column_name") );
			meta.setData_type( item.getString("data_type") );
			if( item.has("length") ){
				meta.setLength( item.getString("length") );
			}
			
			if( item.has("column_comment")){
				meta.setColumn_comment( item.getString("column_comment") );
			}
			
			metaList.add( meta );
		}
		
		return metaList;
		
	}

	
	/**
	 * <pre>
	 * 미등록 테이블 목록 조회
	 * </pre>
	 * @param String ( schema ) 스키마 
	 * @param String ( userId ) 사용자 아이디
	 * @return List
	 * @throws SystemFailException 
	 */
	public List<JSONObject> findUnclassifiedList( String schema, String userId) throws SystemFailException {
		
		List<JSONObject> list = new ArrayList<JSONObject>();
		
		JSONObject res = client.getUnclassifiedList( schema, userId );
		
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		
		if ( message.has("TABLE") ){
			JSONArray tables = message.getJSONArray("TABLE");
			for ( int i = 0, size = tables.size(); i < size; i++ ){
				JSONObject item = new JSONObject();
				item.put("name", tables.getString(i));
				list.add( item );
			}
		}
		
		return list;
	}
	
	/**
	 * <pre>
	 * 미등록 테이블 목록 조회 By Pg
	 * </pre>
	 * @param String ( schema ) 스키마 
	 * @param String ( userId ) 사용자 아이디
	 * @return List
	 * @throws SystemFailException 
	 */
	public List<JSONObject> findUnclassifiedListByPg( String schema, String userId) throws SystemFailException {
		
		List<JSONObject> list = new ArrayList<JSONObject>();
		
		boolean ifexists = false;
		DBConnector pgConn = new OpenPGSql();
		try {
						
			if(schema == null || userId == null) {
				throw new JSONException("파라미터를 확인해 주세요.");
//				ReturnDefine.errorMessage("파라미터를 확인해 주세요.");
			}
			
			String url = ConfigUtil.getString("jdbc.userdb.url");
			String database = ConfigUtil.getString("jdbc.userdb.database");
			String pass = ConfigUtil.getString("jdbc.userdb.password"); 
			
			
			pgConn.openConn(url+"/"+database, schema, pass);
			
			//테이블 목록 조회
			String strQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = '" + schema + "'";
			pgConn.execQuery(strQuery);
			ResultSet res = pgConn.getResultSet();
			
			HashMap<String, Object> category = new HashMap<String, Object>();
			category.put("USER_ID", userId);
			category.put("DATA_STORAGE_TYPE", "PG");
			
			List<HashMap> categoryList = mapper.selectCategorize(category);
			
			while(res.next()){
				String pgTableName = res.getString("table_name");
				for (int ii = 0; ii < categoryList.size(); ii++) {
					if(pgTableName.equals(String.valueOf(categoryList.get(ii).get("DATA_NAME")))){
						ifexists = true;
						break;
					}
				}
				
				if(!ifexists){
					JSONObject item = new JSONObject();
					item.put("name", pgTableName);
					list.add( item );
				}
				ifexists = false;
			}
			
		} catch (Exception e) {
		} finally{
			if(pgConn != null) pgConn.closeConn();
		}
		
		
		return list;
	}

	/**
	 * <pre>
	 * 미등록 테이블을 시스템에 등록한다
	 * </pre>
	 * @param ResourceDetail ( detail ) 등록정보
	 * @throws SystemFailException 
	 */
	public void registerTable(ResourceDetail detail) throws SystemFailException {
		client.registerTable( detail );
	}
	
	/**
	 * <pre>
	 * 미등록 테이블을 시스템에 등록한다
	 * </pre>
	 * @param ResourceDetail ( detail ) 등록정보
	 * @throws SystemFailException 
	 */
	public void registerTableByPg(ResourceDetail detail) throws SystemFailException {
		DBConnector pgConn = new OpenPGSql();
		try {
			
			// resouce db에서 table size, table cnt의 정보를 가지고 오기위해 conn
			String database = ConfigUtil.getString("jdbc.userdb.url") + "/" + ConfigUtil.getString("jdbc.userdb.database");
			String pass =  ConfigUtil.getString("jdbc.userdb.password");
			String dbname =  ConfigUtil.getString("jdbc.userdb.username");
		
			pgConn.openConn(database, dbname, pass);
			
			String schema = detail.getDb_name();
			String tableName = detail.getTable_name();
			
			String tableSize = GetSize.getPgSize(pgConn, schema, tableName);
			String tableCnt = GetSize.getPgCount(pgConn, schema, tableName);
			
			detail.setData_name(tableName);
			detail.setData_size(tableSize);
			detail.setData_cnt(tableCnt);
			detail.setData_storage_type("PG");
			
			mapper.insertResource(detail);
			
			
		} catch (SQLException | ClassNotFoundException e) {
		} finally {
			if(pgConn != null) {
				pgConn.closeConn();
			}
		}
		
	}
	
	

	/**
	 * <pre>
	 * 테이블명 중복여부를 검사한다
	 * </pre>
	 * @param String ( checkName ) 검사할 테이블 명
	 * @return boolean 중복여부
	 * @throws SystemFailException 
	 */
	public boolean isExistTableName( String schema, String checkName ) throws SystemFailException {
		
		List<MetaName> tables = this.getTableList(schema);
		
		for ( MetaName item : tables ){
			//logger.info( "비교합니다" );
			//logger.info( item.getValue() + " , " + checkName );
			if ( StringUtils.equalsIgnoreCase( item.getValue(), checkName ) ){
				return true;
			}
		}
		
		return false;
	}

}
 