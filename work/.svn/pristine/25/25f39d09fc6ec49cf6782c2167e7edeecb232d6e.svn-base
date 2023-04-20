package kostat.lbdms.ServiceAPI.common.web.rest;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.common.util.http.HttpJSONConnector;
import kostat.lbdms.ServiceAPI.common.util.http.HttpMultipartConnector;
import kostat.lbdms.ServiceAPI.common.util.http.HttpRequestKey;
import kostat.lbdms.ServiceAPI.common.util.http.HttpResponseConnector;
import kostat.lbdms.ServiceAPI.common.util.http.IResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.core.network.process.FileWriteResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.core.network.process.ImageWriteResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.core.network.process.NormalResponseHandler;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.util.ConfigUtil;
import kostat.lbdms.ServiceAPI.common.web.util.DownloadFunc;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;




/**  
* <pre>
* 시스템 REST API 호출 서비스
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

@Component
public class RestService {
    	/** 요청 url */
	private final String REQUEST_URI = ConfigUtil.getString("rest.url");
    	//private final String REQUEST_URI = "";
	/** AutoAgent 요청 */
	private final String REQUEST_AUTO_AGENT_URI = ConfigUtil.getString("autoagent.url");
    	//private final String REQUEST_AUTO_AGENT_URI = "";
	/** 요청 방식 */
	private final String METHOD = HttpRequestKey.POST;
	/** command1	 */
	private static final String COMMAND1 = "CMD1";
	/** command2	 */
	private static final String COMMAND2 = "CMD2";
	/** command3	 */
	private static final String COMMAND3 = "CMD3";
	/** command4	 */
	private static final String COMMAND4 = "CMD4";
	/** param */
	private static final String PARAM = "PARAM";
	
	/**
	 * <pre>
	 * 시스템 REST API를 호출한다
	 * </pre>
	 * @param String ( command1 ) 커맨드1
	 * @param String ( command2 ) 커맨드2 
	 * @param HashMap ( parameters ) 요청 파라메타  
	 * @return JSONObject 결과 정보
	 */
	public JSONObject call( 
			String command1, 
			String command2, 
			HashMap<String,Object> parameters ) {
		
		return this.call(command1, command2, StringUtils.EMPTY, StringUtils.EMPTY, parameters);
	}
	
	/**
	 * <pre>
	 * 시스템 REST API를 호출한다
	 * </pre>
	 * @param String ( command1 ) 커맨드1
	 * @param String ( command2 ) 커맨드2 
	 * @param String ( command3 ) 커맨드3 
	 * @param HashMap ( parameters ) 요청 파라메타  
	 * @return JSONObject 결과 정보 
	 */
	public JSONObject call( 
			String command1, 
			String command2, 
			String command3,
			HashMap<String,Object> parameters ) {
		
		return this.call(command1, command2, command3, null, parameters);
	}
	
	
	/**
	 * <pre>
	 * 시스템 REST API를 호출한다
	 * </pre>
	 * @param String ( command1 ) 커맨드1
	 * @param String ( command2 ) 커맨드2 
	 * @param String ( command3 ) 커맨드3 
	 * @param HashMap ( parameters ) 요청 파라메타  
	 * @return JSONObject 결과 정보 
	 */
	public String rawcall( 
			String command1, 
			String command2, 
			String command3,
			HashMap<String,Object> parameters ) {
		
		HashMap<String,Object> parameterMap = this.getParameter(command1, command2, command3, null, parameters );
		
		HttpJSONConnector client = new HttpJSONConnector( REQUEST_URI, METHOD,  parameterMap);
		return client.connectWithParseString();
	}
	
	/**
	 * <pre>
	 * 시스템 REST API를 호출한다
	 * </pre>
	 * @param String ( command1 ) 커맨드1
	 * @param String ( command2 ) 커맨드2 
	 * @param String ( command3 ) 커맨드3 
	 * @param String ( command4 ) 커맨드4
	 * @param HashMap ( parameters ) 요청 파라메타  
	 * @return JSONObject 결과 정보 
	 */
	public JSONObject call( 
			String command1, 
			String command2, 
			String command3,
			String command4,
			HashMap<String,Object> parameters ) {
		
		HashMap<String,Object> parameterMap = this.getParameter(command1, command2, command3, command4, parameters );
		
		HttpJSONConnector client = new HttpJSONConnector( REQUEST_URI, METHOD,  parameterMap);
		return client.connectWithParse();
	}
	
	/**
	 * <pre>
	 * 시스템에 Stream 데이터를 전달한다
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream ( inputStream ) 
	 * @param String ( description ) 설명
	 * @param String ( category1 )	출처1
	 * @param String ( category2 )	테마
	 * @param String ( category3 )	태그
	 * @param String ( category4 )	단계
	 * @param String ( userId )	사용자 아이디 
	 * @param String ( filename )	파일명 
	 * @return
	 */
	public String callByStream(
			HttpServletResponse response,
			InputStream inputStream,
			String description,
			String category1,
			String category2,
			String category3,
			String category4,
			String userId,
			String filename
			){
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		
		paramObj.put("FILE_NAME", filename);
		paramObj.put("name", "FILE");
		paramObj.put( RequestKey.USER_ID, userId );
		paramObj.put("DESCRIPTION", description);
		paramObj.put("CATEGORY1", category1);
		paramObj.put("CATEGORY2", category2);
		paramObj.put("CATEGORY3", category3);
		paramObj.put("CATEGORY4", category4);
		
		parameterMap.put( PARAM, paramObj.toString() );
		
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_URI + "/upload", parameterMap, inputStream );
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		
		return client.connect();
	}
	
	
	
	/**
	 * <pre>
	 * 시스템으로부터 Stream 데이터를 전달받는다
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param String[] ( ids ) 리소스 아이디 목록 
	 * @param String ( userId ) 사용자 아이디
	 * @param String ( filename ) 파일명
	 */
	public void callStream(
			HttpServletResponse response,
			String[] ids,
			String userId,
			String filename,
			boolean isAdmin ){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		JSONObject paramObj = new JSONObject();
		paramObj.put("RESOURCE_ID", ids);
		paramObj.put("USER_ID", userId);
		paramObj.put("FILE_NAME", filename);
		
		if ( isAdmin ){
			paramObj.put("USER_GRADE", "Y" );	
		}
		
		parameterMap.put( PARAM, paramObj.toString() );
				
		HttpResponseConnector client = new HttpResponseConnector( REQUEST_URI + "/download", METHOD,  parameterMap);
		IResponseHandler handler = new FileWriteResponseHandler( response, filename );
		client.setResponseHandler( handler );
		client.connect();
	}
	
	/**
	 * <pre>
	 * 시스템으로부터 Stream 데이터를 전달받는다
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param String[] ( ids ) 리소스 아이디 목록 
	 * @param String ( userId ) 사용자 아이디
	 * @param String ( filename ) 파일명
	 */
	public void callStreamCondition(
			HttpServletResponse response,
			String[] ids,
			String userId,
			String filename,
			String where){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		JSONObject paramObj = new JSONObject();
		paramObj.put("RESOURCE_ID", ids);
		paramObj.put("USER_ID", userId);
		paramObj.put("FILE_NAME", filename);
		
		if( where != null && where != "" ){
			paramObj.put("CONDITION", where);
		}
		
		parameterMap.put( PARAM, paramObj.toString() );
				
		HttpResponseConnector client = new HttpResponseConnector( REQUEST_URI + "/download", METHOD,  parameterMap);
		IResponseHandler handler = new FileWriteResponseHandler( response, filename );
		client.setResponseHandler( handler );
		client.connect();
	}
	
	/**
	 * <pre>
	 * 전달받은 Stream을 이미지헤더로 응답한다
	 * </pre>
	 * @param response
	 * @param ids
	 * @param userId
	 * @param filename
	 */
	public void callStreamImage(
			HttpServletResponse response,
			String id,
			String userId,
			String filename ){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		String[] ids = { id };
		
		JSONObject paramObj = new JSONObject();
		paramObj.put("RESOURCE_ID", ids);
		paramObj.put("USER_ID", userId);
		paramObj.put("FILE_NAME", filename);
		
		parameterMap.put( PARAM, paramObj.toString() );
				
		HttpResponseConnector client = new HttpResponseConnector( REQUEST_URI + "/download", METHOD,  parameterMap);
		IResponseHandler handler = new ImageWriteResponseHandler( response );
		client.setResponseHandler( handler );
		client.connect();
	}
	
	/**
	 * <pre>
	 * 전달받은 Stream을 이미지헤더로 응답한다
	 * </pre>
	 * @param response
	 * @param path
	 * @param userId
	 */
	public void callStreamImage(
			HttpServletResponse response, 
			String path,
			String userId) {
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		paramObj.put("DATA_PATH", path);
		paramObj.put("USER_ID", userId);
		paramObj.put("FILE_NAME", "IMG");
		
		parameterMap.put( PARAM, paramObj.toString() );
				
		HttpResponseConnector client = new HttpResponseConnector( REQUEST_URI + "/download", METHOD,  parameterMap);
		IResponseHandler handler = new ImageWriteResponseHandler( response );
		client.setResponseHandler( handler );
		client.connect();
	}
	
	/**
	 * <pre>
	 * 전달받은 Stream을 이미지헤더로 응답한다
	 * </pre>
	 * @param response
	 * @param path
	 * @param userId
	 */
	public void callStreamShp(
			HttpServletResponse response, 
			String resource_id,
			String file_name,
			String userId) {
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		paramObj.put("USER_ID", userId);
		paramObj.put("DOWNLOAD_TYPE", "SHP");
		paramObj.put("FILE_NAME", file_name);
		paramObj.put("RESOURCE_ID", resource_id);
		
		parameterMap.put( PARAM, paramObj.toString() );
				
		HttpResponseConnector client = new HttpResponseConnector( REQUEST_URI + "/table/download", METHOD,  parameterMap);
		IResponseHandler handler = new FileWriteResponseHandler( response, file_name );
		client.setResponseHandler( handler );
		client.connect();
	}
	
	
	/**
	 * <pre>
	 * 테이블정보를 조회한 뒤 파일다운로드로 응답한다
	 * </pre>
	 * @param response
	 * @param path
	 * @param userId
	 */
	public void callDownloadTable(
			HttpServletResponse response, 
			String dataNm,
			String condition,
			String file_name,
			String userId) {
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		paramObj.put("USER_ID", userId);
		paramObj.put("DOWNLOAD_TYPE", "TABLE");
		paramObj.put("FILE_NAME", file_name);
		 paramObj.put("DATA_NM", dataNm);
//		paramObj.put("DATA_NM", dataNm + "1111");
		paramObj.put("CONDITION", condition);
		
		parameterMap.put( PARAM, paramObj.toString() );
				
		HttpResponseConnector client = new HttpResponseConnector( REQUEST_URI + "/table/download", METHOD,  parameterMap);
		IResponseHandler handler = new FileWriteResponseHandler( response, file_name );
		client.setResponseHandler( handler );
		client.connect();
	}

	/**
	 * <pre>
	 * 데이터 자동화 - 가공 - 오류 다운로드
	 * </pre>
	 * @param response
	 * @param query
	 * @param connectQuery
	 * @param file_name
	 * @param disConnectQuery
	 */
	public void callErrFileDownload(
			HttpServletResponse response,
			String query,
			String connectQuery,
			String file_name,
			String disConnectQuery) {

		HashMap<String,Object> parameterMap = new HashMap<String,Object>();

		org.json.JSONObject paramObj = new org.json.JSONObject();
		try {
			paramObj.put("QUERY", query);
			paramObj.put("CONNECT_QUERY", connectQuery);
			paramObj.put("FILE_NAME", file_name);
			paramObj.put("DIS_CONNECT_QUERY", disConnectQuery);
			
			DownloadFunc df = new DownloadFunc();
			df.errorTableDownload(paramObj, response);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	
	/**
	 * 요청 파라메타 데이터를 조합한다
	 * @param String ( command1 )	커맨드1 
	 * @param String ( command2 )	커맨드2 
	 * @param String ( command3 )	커맨드3
	 * @param String ( command4 )	커맨드4 
	 * @param HashMap ( parameters ) 요청 파라메타
	 * @return HashMap 요청 파라메타 
	 */
	private HashMap<String,Object> getParameter(
			String command1,
			String command2,
			String command3,
			String command4,
			HashMap<String,Object> parameter ){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		parameterMap.put( COMMAND1, command1 );
		parameterMap.put( COMMAND2, command2 );
		if ( !StringUtils.isEmpty( command3 ) ){
			parameterMap.put( COMMAND3, command3 );
		}
		if ( !StringUtils.isEmpty( command4 ) ){
			parameterMap.put( COMMAND4, command4 );
		}
		
		if ( parameter != null ){
			JSONObject paramObj = JSONObject.fromObject( parameter  );
			parameterMap.put( PARAM, paramObj.toString() );
		}
		
		return parameterMap;
	}
	
	/**
	 * <pre>
	 * 시스템에 InputStream 전달하여 테이블 생성
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream ( inputStream ) 
	 * @param String data_type
	 * @param String output_table_name
	 * @param String description
	 * @param String header
	 * @param String delimiter
	 * @param String target_agent
	 * @param String user_id
	 * @param String encoding_type
	 * @return String
	 */
	@SuppressWarnings("rawtypes")
	public String callByWeb(
			HttpServletResponse response,
			String Url,
			Map paramObj
			){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		parameterMap.put( PARAM, paramObj.toString() );
		
		/*
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_AUTO_AGENT_URI + Url, parameterMap);
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		return client.connect();
		*/
		HttpJSONConnector client = new HttpJSONConnector( REQUEST_AUTO_AGENT_URI + Url, METHOD,  parameterMap);
		return client.connectWithParseString();
	}
	
	
	/**
	 * <pre>
	 * 시스템에 InputStream 전달하여 테이블 생성
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream ( inputStream ) 
	 * @param String data_type
	 * @param String output_table_name
	 * @param String description
	 * @param String header
	 * @param String delimiter
	 * @param String target_agent
	 * @param String user_id
	 * @param String encoding_type
	 * @return String
	 */
	public String callByCreateTable(
			HttpServletResponse response,
			InputStream inputStream,
			String data_type,
			String output_table_name,
			String description,
			String header,
			String delimiter,
			String target_agent,
			String user_id,
			String encoding_type
			){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		
		paramObj.put("RESPONSE", "TRUE");
		paramObj.put("DATA_TYPE", data_type);
		paramObj.put("OUTPUT_TABLE_NAME", output_table_name);
		paramObj.put("DESCRIPTION", description);
		paramObj.put("HEADER", header);
		paramObj.put("DELIMITER", delimiter);
		paramObj.put("TARGET_AGENT", target_agent);
		paramObj.put( RequestKey.USER_ID, user_id );
		
		if( encoding_type != null && encoding_type != "" ){
			paramObj.put("ENCODING_TYPE", encoding_type);
		}
		
		parameterMap.put( PARAM, paramObj.toString() );
		
		//HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_URI + "/data/create", parameterMap, inputStream );
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_AUTO_AGENT_URI + "/data/create", parameterMap, inputStream );
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		
		return client.connect();
	}
	
	public String callByCreateTableWithColumns(
			HttpServletResponse response,
			InputStream inputStream,
			String data_type,
			String output_table_name,
			String description,
			String header,
			String delimiter,
			String target_agent,
			String user_id,
			String encoding_type,
			org.json.JSONArray columnGridData
			){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		
		paramObj.put("RESPONSE", "TRUE");
		paramObj.put("DATA_TYPE", data_type);
		paramObj.put("OUTPUT_TABLE_NAME", output_table_name);
		paramObj.put("DESCRIPTION", description);
		paramObj.put("HEADER", header);
		paramObj.put("DELIMITER", delimiter);
		paramObj.put("TARGET_AGENT", target_agent);
		paramObj.put( RequestKey.USER_ID, user_id );
		paramObj.put("COLUMN_GRID_DATA", columnGridData.toString());
		paramObj.put("AUTO_COLUMN_NAME", true);
		
		if( encoding_type != null && encoding_type != "" ){
			paramObj.put("ENCODING_TYPE", encoding_type);
		}
		
		parameterMap.put( PARAM, paramObj.toString() );
		
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_AUTO_AGENT_URI + "/data/create", parameterMap, inputStream );
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		
		return client.connect();
	}
	
	//shp업로드(추적)
	public String callByCreateTableByAgent(
		HttpServletResponse response,
		InputStream[] inputStreamArray,
		String data_type,
		String output_table_name,
		String description,
		String user_id,
		String encode_type,
		String shp_coord_by_geom
		){
	
	    HashMap<String,Object> parameterMap = new HashMap<String,Object>();
	
	    JSONObject paramObj = new JSONObject();
	
	    paramObj.put("RESPONSE", "TRUE");
	    paramObj.put("DATA_TYPE", data_type);
	    paramObj.put("OUTPUT_TABLE_NAME", output_table_name);
	    paramObj.put("DESCRIPTION", description);
	    paramObj.put("ENCODE_TYPE", encode_type);
	    paramObj.put("SHP_COORD_BY_GEOM", shp_coord_by_geom);
	    paramObj.put( RequestKey.USER_ID, user_id );
	
	    parameterMap.put( PARAM, paramObj.toString() );
System.out.println("REQUEST_AUTO_AGENT_URI>>" + REQUEST_AUTO_AGENT_URI);
System.out.println("paramObj>>" + paramObj.toString());
	    HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_AUTO_AGENT_URI + "/data/create", parameterMap, inputStreamArray, true );
	    IResponseHandler handler = new NormalResponseHandler( response, false );
	    client.setResponseHandler(handler);
	
	    
	    return client.connect();
	}
	
	/**
	 * <pre>
	 * 시스템에 InputStream 전달하여 테이블에 데이터 로드
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream ( inputStream ) 
	 * @param String data_type
	 * @param String output_table_name
	 * @param String description
	 * @param String header
	 * @param String delimiter
	 * @param String target_agent
	 * @param String user_id
	 * @param String encoding_type
	 * @return String
	 */
	public String callByLoadTable(
			HttpServletResponse response,
			InputStream inputStream,
			String data_type,
			String output_table_name,
			String header,
			String delimiter,
			String target_agent,
			String user_id,
			String encoding_type
			){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		
		paramObj.put("RESPONSE", "TRUE");
		paramObj.put("DATA_TYPE", data_type);
		paramObj.put("OUTPUT_TABLE_NAME", output_table_name);
		paramObj.put("HEADER", header);
		paramObj.put("DELIMITER", delimiter);
		paramObj.put("TARGET_AGENT", target_agent);
		paramObj.put( RequestKey.USER_ID, user_id );
		
		if( encoding_type != null && encoding_type != "" ){
			paramObj.put("ENCODING_TYPE", encoding_type);
		}
		
		parameterMap.put( PARAM, paramObj.toString() );
		
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_URI + "/data/load", parameterMap, inputStream );
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		
		return client.connect();
	}
	
	/**
	 * <pre>
	 * 시스템에 InputStream 전달하여 테이블 생성
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream[] ( inputStream )
	 * @param String data_type                
	 * @param String output_table_name    
	 * @param String description             
	 * @param String user_id                 
	 * @param String encoding_type 
	 * @return String
	 */
	public String callByCreateTable(
			HttpServletResponse response,
			InputStream[] inputStreamArray,
			String data_type,
			String output_table_name,
			String description,
			String user_id,
			String encode_type
			){
		System.out.println("REQUESTURI 타는 곳");
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		
		paramObj.put("RESPONSE", "TRUE");
		paramObj.put("DATA_TYPE", data_type);
		paramObj.put("OUTPUT_TABLE_NAME", output_table_name);
		paramObj.put("DESCRIPTION", description);
		paramObj.put("ENCODE_TYPE", encode_type);
		paramObj.put( RequestKey.USER_ID, user_id );
		
		parameterMap.put( PARAM, paramObj.toString() );
		
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_URI + "/data/create", parameterMap, inputStreamArray, true );
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		
		return client.connect();
	}
	
	/**
	 * <pre>
	 * 시스템에 InputStream 전달하여 테이블에 데이터 로드
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream[] ( inputStream )
	 * @param String data_type                
	 * @param String output_table_name    
	 * @param String description             
	 * @param String user_id                 
	 * @param String encoding_type 
	 * @return String
	 */
	public String callByLoadTable(
			HttpServletResponse response,
			InputStream[] inputStreamArray,
			String data_type,
			String output_table_name,
			String user_id,
			String encode_type
			){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject paramObj = new JSONObject();
		
		paramObj.put("RESPONSE", "TRUE");
		paramObj.put("DATA_TYPE", data_type);
		paramObj.put("OUTPUT_TABLE_NAME", output_table_name);
		paramObj.put("ENCODE_TYPE", encode_type);
		paramObj.put( RequestKey.USER_ID, user_id );
		
		parameterMap.put( PARAM, paramObj.toString() );
		
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_URI + "/data/load", parameterMap, inputStreamArray, true );
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		
		return client.connect();
	}
	
	/**
	 * <pre>
	 * 시스템에 InputStream 전달하여 데이터자동화 파일 업로드
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream[] ( inputStreamArray )
	 * @param JSONArray paramArray        
	 * @return String
	 */
	public String callByDataFlowUpload(
			HttpServletResponse response,
			InputStream[] inputStreamArray,
			JSONArray paramArray
			){
		
		HashMap<String,Object> parameterMap = new HashMap<String,Object>();
		
		JSONObject obj = new JSONObject();
		obj.put( PARAM , paramArray.toString() );
		
		parameterMap.put( PARAM, obj );
		
		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_URI + "/data_flow_upload", parameterMap, inputStreamArray, false );
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);
		
		return client.connect();
	}


	/**
	 * <pre>
	 * 시스템에 InputStream 전달하여 수집 데이터 업로드
	 * </pre>
	 * @param HttpServletResponse ( response )
	 * @param InputStream[] ( inputStream )
	 * @param String file_name
	 * @param String upload_path
	 * @return String
	 */
	public String callByCollectFileUpload(
			HttpServletResponse response,
			InputStream inputStream,
			String file_name,
			String upload_path
	){

		HashMap<String,Object> parameterMap = new HashMap<String,Object>();

		JSONObject paramObj = new JSONObject();

		paramObj.put("RESPONSE", "TRUE");
		paramObj.put("UPLOAD_FILE_NAME", file_name);
		paramObj.put("UPLOAD_PATH", upload_path);

		parameterMap.put( PARAM, paramObj.toString() );

		HttpMultipartConnector client = new HttpMultipartConnector( REQUEST_URI + "/shp/data/upload", parameterMap, inputStream);
		IResponseHandler handler = new NormalResponseHandler( response, false );
		client.setResponseHandler(handler);

		return client.connect();
	}
}
