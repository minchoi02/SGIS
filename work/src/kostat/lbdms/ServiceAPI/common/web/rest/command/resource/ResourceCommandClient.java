package kostat.lbdms.ServiceAPI.common.web.rest.command.resource;

import java.io.InputStream;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.common.web.rest.IConverter;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.ResultKey;
import kostat.lbdms.ServiceAPI.common.web.rest.manage.ManageService;
import kostat.lbdms.ServiceAPI.common.web.rest.system.TableResource;
import kostat.lbdms.ServiceAPI.controller.model.rest.ResourceData;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**  
* <pre>
* Resource 관련 REST 호출 서비스
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
@Component
public class ResourceCommandClient {

    	@Autowired
	private RestService restService;

	@Autowired
	private ManageService manageService;


	
	/**
	 * <pre>
	 * RESOURCE 데이터 목록 조회 
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param int ( limit ) 개수 제한 
	 * @param int ( offset ) 조회 시작 위치
	 * @param String ( category4 ) 단계
	 * @param HashMap ( extraParams ) 추가 파라메타 
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject selectCategorize( 
			String user_id, 
			int limit, 
			int offset,
			String category4,
			HashMap<String,Object> extraParams ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		if ( user_id != null ){
			parameters.put( RequestKey.USER_ID, user_id );
		}
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		
		parameters.putAll( extraParams );
		
		parameters.put( RequestKey.CATEGORY4 , category4 );
				
		res = restService.call( Command.RESOURCE, Command.SELECT_CATEGORIZE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * RESOURCE 데이터 목록 조회 
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param int ( limit ) 개수 제한 
	 * @param int ( offset ) 조회 시작 위치
	 * @param String ( category4 ) 단계
	 * @param int ( download_apply ) 다운로드 가능 구분
	 * @param HashMap ( extraParams ) 추가 파라메타 
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject selectUserPerpose( 
			String user_id, 
			int limit, 
			int offset,
			String category4,
			String download_apply,
			HashMap<String,Object> extraParams ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		if ( user_id != null ){
			parameters.put( RequestKey.USER_ID, user_id );
		}
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		
		parameters.putAll( extraParams );
		
		parameters.put( RequestKey.CATEGORY4 , category4 );
		
		parameters.put( "DOWNLOAD_APPLY", download_apply );
				
		res = restService.call( Command.RESOURCE, Command.SELECT_USER_PURPOSE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * <pre>
	 * 리소스 삭제
	 * </pre>
	 * @param String ( user_id )	사용자 아이디
	 * @param String ( resource_id )	리소스 아이디
	 * @throws SystemFailException 
	 */
	public void delete( String user_id, String resource_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.RESPONSE, "TRUE" );
		parameters.put( RequestKey.RESOURCE_ID, resource_id );
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.DELETE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * 리소스 다중 삭제 
	 * </pre>
	 * @param String ( user_id )	사용자 아이디
	 * @param String[] ( resource_id )	리소스 아이디 목록
	 * @throws SystemFailException 
	 */
	public void delete(String userId, String[] ids) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.RESOURCE_ID_ARRAY, ids );
		parameters.put( RequestKey.USER_ID, userId );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.MULTI_DELETE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
				
	/**
	 * <pre>
	 * 데이터 미리보기
	 * </pre>	
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( resource_id ) 리소스 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject preview( String user_id, String resource_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.RESPONSE, "TRUE" );
		parameters.put( RequestKey.RESOURCE_ID, resource_id );
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.PREVIEW, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터자동화 데이터 미리보기
	 * </pre>	
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( resource_id ) 리소스 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject dataFlowPreview( String user_id, String resource_id, String encoding_type, boolean first_row_yn ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.RESPONSE, "TRUE" );
		parameters.put( RequestKey.RESOURCE_ID, resource_id );
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "ENCODING_TYPE", encoding_type );
		parameters.put( "FIRST_ROW_YN", first_row_yn );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.DATAFLOW_PREVIEW, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 테이블 미리보기 
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( schema ) 스키마
	 * @param String ( tableName )  테이블 이름
	 * @param int ( limit ) 가져올 개수 
	 * @return 
	 * @throws SystemFailException
	 */
	public JSONObject previewTable(String user_id, String schema, String tableName, int limit, int offset, String sort_column, String sort_type, String resourceId, String storageTypeCd ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.RESPONSE, "TRUE" );
		parameters.put( RequestKey.SCHEMA, schema );
		parameters.put( RequestKey.TABLE_NAME, tableName );
		parameters.put( "DATA_NAME", tableName );
		parameters.put( RequestKey.LIMIT, String.valueOf( limit ) );
		parameters.put( RequestKey.OFFSET, String.valueOf( offset ) );
		parameters.put( RequestKey.STORAGE_TYPE_CD, String.valueOf( storageTypeCd ) );

		if (resourceId != null) {
			if (resourceId.length() > 1) {
				parameters.put( RequestKey.RESOURCE_ID, resourceId );
			}
		}
		
		if( sort_column != null && sort_column != "" ){
			parameters.put( "SORT_COLUMN", sort_column );
		}
		if( sort_type != null && sort_type != "" ){
			parameters.put( "SORT_TYPE", sort_type );
		}
		
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.PREVIEW, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}

	/**
	 * <pre>
	 * RESOURCE 정보 조회
	 * </pre>
	 * @param String ( resource_id ) 리소스 아이디 
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject detail( String resource_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.RESOURCE_ID, resource_id );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.DETAIL, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * RESOURCE 등록
	 * </pre>
	 * @param String ( resource_id ) 리소스 아이디 
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject insert(
			String user_id,
			ResourceData rData
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put("USER_ID", user_id);
		parameters.put("DATA_STORAGE_TYPE", rData.getData_storage_type());
		if ( rData.getData_path() != null ){
			parameters.put("DATA_PATH", rData.getData_path());
		}
		parameters.put("DATA_CNT", rData.getData_cnt());
		parameters.put("CATEGORY1", rData.getCategory1());
		parameters.put("CATEGORY2", rData.getCategory2());
		parameters.put("CATEGORY3", rData.getCategory3());
		parameters.put("CATEGORY4", rData.getCategory4());
		parameters.put("DESCRIPTION", rData.getDescription());
		parameters.put("DATA_NAME", rData.getData_name());
		parameters.put("ACTION_TYPE", rData.getAction_type());
		if ( rData.getData_size() != null ){
			parameters.put("DATA_SIZE", rData.getData_size());
		}
		
		JSONObject res = restService.call( Command.RESOURCE, Command.INSERT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 리소스 copy
	 * </pre>
	 * @param String ( resource_id ) 리소스 아이디
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject copy(String resource_id, String user_id) throws SystemFailException{
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put(RequestKey.RESOURCE_ID, resource_id);
		parameters.put(RequestKey.USER_ID, user_id);
		
		JSONObject res = restService.call(Command.RESOURCE, Command.COPY, parameters);
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
		
	public JSONObject getFirstLine(TableResource tblResource) throws SystemFailException{
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put("DATA_PATH", tblResource.getData_path());
		
		if(tblResource.getDelimiter() != null && !tblResource.getDelimiter().isEmpty()){
			parameters.put("DELIMITER", tblResource.getDelimiter());
		}
		
		JSONObject res = restService.call( Command.RESOURCE, Command.HDFS, Command.ONE_LINE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	

	/**
	 * <pre>
	 * 리소스 정보를 수정한다
	 * </pre>
	 * @param IConvertor resource
	 * @return
	 */
	public void modify( IConverter resource ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( resource.toModifierMap() );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.MODFIY, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
	}

	/**
	 * <pre>
	 * 하이브 리소스 정보를 수정한다
	 * </pre>
	 * @param IConverter ( resource ) 리소스 정보 
	 * @throws SystemFailException 
	 */
	@Deprecated
	public void modifyHive( IConverter resource ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( resource.toModifierMap() );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.HIVE, Command.MODFIY, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * 하둡 파일 시스템 리소스 정보를 수정한다
	 * </pre>
	 * @param IConverter ( resource ) 리소스 정보 
	 * @throws SystemFailException 
	 */
	@Deprecated
	public void modifyHdfs( IConverter resource ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( resource.toModifierMap() );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.HDFS, Command.MODFIY, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * 포스트그레스 리소스 정보를 수정한다
	 * </pre>
	 * @param IConverter ( resource ) 리소스 정보
	 * @throws SystemFailException 
	 */
	@Deprecated
	public void modifyPostgres( IConverter resource ) throws SystemFailException {
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( resource.toModifierMap() );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.POSTGRE, Command.MODFIY, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * 사용자에게 내 데이터를 복사
	 * </pre>
	 * @param JSONArray ( user_list ) 사용자목록
	 * @param String ( uid ) 사용자
	 * @param String ( category4 ) 단계
	 * @param String ( resource_id ) 리소스아이디
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject copyToUsers(
			JSONArray user_list,
			String user_id,
			String category4,
			String resource_id
			) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "USER_LIST", user_list );
		parameters.put( "USER_ID", user_id );
		parameters.put( "CATEGORY4", category4 );
		parameters.put( "RESOURCE_ID", resource_id );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.HDFS, Command.COPY_TO_USER, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 스크립트를 등록한다
	 * </pre>
	 * @param IConverter ( script ) 스크립트 정보
	 * @return String 리소스 아이디
	 * @throws SystemFailException
	 */
	public String insertScript( IConverter script ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( script.toAdderMap() );
		
		JSONObject res = restService.call( Command.ANALYSIS, Command.SCRIPT_CRUD, Command.INSERT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		if ( message.has("RESOURCE_ID") ){
			return message.getString("RESOURCE_ID");
		}
		return null;
	}

	/**
	 * <pre>
	 * 스크립트를 수정한다
	 * </pre>
	 * @param IConverter ( script ) 스크립트 정보
	 * @throws SystemFailException 
	 */
	public void modifyScript(IConverter script) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( script.toModifierMap() );
		
		JSONObject res = restService.call( Command.ANALYSIS, Command.SCRIPT_CRUD, Command.UPDATE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
	}

	/**
	 * <pre>
	 * 특정 경로에 있는 파일 목록을 조회한다
	 * </pre>
	 * @param String ( dataPath ) 데이터 경로
	 * @param String ( userId ) 사용자 아이디
	 * @return JSONObject 
	 * @throws SystemFailException 
	 */
	public JSONObject getFileListByPath(String dataPath, String userId) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "PATH", dataPath );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.HDFS, Command.HDFS_FILE_LIST, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * SVG 업로드
	 * </pre>
	 * @param String ( user_id ) 사용자아이디
	 * @param String ( data_name ) 데이터명
	 * @param String ( svg ) SVG
	 * @param String ( category1 ) 출처
	 * @param String ( category2 ) 테마
	 * @param String ( category3 ) 태그
	 * @param String ( category4 ) 단계
	 * @param String ( description ) 설명
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject svgUpload(
			String user_id,
			String data_name,
			String svg,
			String category1,
			String category2,
			String category3,
			String category4,
			String description
			) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "DATA_NAME", data_name );
		parameters.put( "SVG", svg );
		parameters.put( "CATEGORY1", StringUtils.defaultString( category1, "" ) );
		parameters.put( "CATEGORY2", StringUtils.defaultString( category2, "" ) );
		parameters.put( "CATEGORY3", StringUtils.defaultString( category3, "" ) );
		parameters.put( RequestKey.CATEGORY4, category4 );
		parameters.put( "DESCRIPTION", StringUtils.defaultString( description, "" ) );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.HDFS, Command.SVG_UPLOAD, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * <pre>
	 * 데이터 경로에 존재하는 데이터의 상세내용을 조회한다
	 * </pre>
	 * @param dataPath
	 * @return
	 * @throws SystemFailException 
	 */
	public JSONObject getFileContentByPath( int length, String dataPath, String userId ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.LENGTH, String.valueOf( length ) );
		parameters.put( RequestKey.DATA_PATH, dataPath );
		parameters.put( RequestKey.USER_ID, userId );
		
		JSONObject res = restService.call( Command.RESOURCE, Command.HDFS, Command.FILECONTENT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}

	/**
	 * <pre>
	 * 오픈데이터 사용현황 목록 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param int ( limit ) 개수 제한 
	 * @param int ( offset ) 조회 시작 위치
	 * @param HashMap ( extraParams ) 추가 파라메타 
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject openDataUseList( 
			String user_id, 
			int limit, 
			int offset,
			HashMap<String,Object> extraParams ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		
		parameters.putAll( extraParams );
		
		res = restService.call( Command.RESOURCE, Command.OPEN_DATA_USE_LIST, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 오픈데이터 사용현황 조회
	 * </pre>
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject openDataUseSum() throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String ,Object> map = new HashMap<String, Object>();
		
		res = restService.call( Command.RESOURCE, Command.OPEN_DATA_USE_SUM, map );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 다운로드 권한 변경
	 * </pre>
	 * @param JSONArray (resource_ids)
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject updateDownloadApply( JSONArray resource_ids ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String ,Object> map = new HashMap<String, Object>();
		map.put( RequestKey.RESOURCE_ID, resource_ids );
		
		res = restService.call( Command.RESOURCE, Command.UPDATE_DOWNLOAD_APPLY, map );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}
	
	/**
	 * <pre>
	 * 테이블 맵핑
	 * </pre>
	 * @param ( input_table_name ) 테이블이름
	 * @param ( addr_column ) 맵핑주소
	 * @param ( user_id ) 사용자아이디
	 * @param ( api_name ) 맵핑돌릴 api
	 * @param ( description ) 설명
	 * @param ( target_agent ) 서버이름
	 * 
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject tableMapping( 
			String input_table_name,
			String addr_column,
			String user_id,
			String api_name,
			String target_agent,
			Boolean base_boolean,
			Boolean tot_boolean
			) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String ,Object> map = new HashMap<String, Object>();
		map.put( "INPUT_TABLE_NAME", input_table_name );
		map.put( "ADDR_COLUMN", addr_column );
		map.put( RequestKey.USER_ID, user_id );
		map.put( "API_NAME", api_name );
		map.put( RequestKey.TARGET_AGENT, target_agent );
		
		map.put( "BASE_BOOLEAN", base_boolean == null ? false : base_boolean );
		map.put( "TOT_BOOLEAN", tot_boolean == null ? false : tot_boolean );


		String useYn= manageService.selectDaumApiUseYn();
		map.put( "DAUM_MAPPING_YN", useYn);


		
		res = restService.call( Command.RESOURCE, Command.MAPPING, Command.USER_DATA_MAPPING, map );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}
	
	/**
	 * <pre>
	 * 좌표계 변환
	 * </pre>
	 * @param ( table_name ) 테이블이름
	 * @param ( x_column ) x컬럼
	 * @param ( y_column ) y컬럼
	 * @param ( user_id ) 사용자아이디
	 * @param ( input_coord ) 기존좌표
	 * @param ( output_coord ) 변경좌표
	 * @param ( description ) 설명
	 * @param ( target_agent ) 서버이름
	 * 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject coordinateChange( 
			String table_name,
			String x_column,
			String y_column,
			String user_id,
			String input_coord,
			String output_coord,
			String target_agent,
			Boolean base_boolean,
			Boolean tot_boolean
			) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String ,Object> map = new HashMap<String, Object>();
		map.put( RequestKey.TABLE_NAME, table_name );
		map.put( "X_COLUMN", x_column );
		map.put( "Y_COLUMN", y_column );
		map.put( RequestKey.USER_ID, user_id );
		map.put( "INPUT_COORD", input_coord );
		map.put( "OUTPUT_COORD", output_coord );
		map.put( RequestKey.TARGET_AGENT, target_agent );
		
		map.put( "BASE_BOOLEAN", base_boolean == null ? false : base_boolean );
		map.put( "TOT_BOOLEAN", tot_boolean == null ? false : tot_boolean );
		
		res = restService.call( Command.RESOURCE, Command.TRANSFORM, Command.USER_DATA_COORDINATE_TRANSFORM, map );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}
	
	/**
	 * <pre>
	 * GEOM 좌표계 변환
	 * </pre>
	 * @param input_table_name	입력 테이블 명
	 * @param geom_column			GEOM 컬럼 명
	 * @param input_coord_by_geom	SHP 좌표계
	 * @param login_id				사용자 아이디
	 * @return
	 * @throws SystemFailException 
	 */
	public JSONObject coordinateChangeByGeom(String input_table_name, String geom_column, String input_coord_by_geom,
			String login_id) throws SystemFailException {
		
		JSONObject res = new JSONObject();
		
		HashMap<String ,Object> map = new HashMap<String, Object>();
		map.put( "USER_ID", login_id );
		map.put( "OUTPUT_TABLE_NM", input_table_name );
		map.put( "SRID", input_coord_by_geom );
		map.put( "GEOM_COL_NM", geom_column );
		
		res = restService.call( Command.RESOURCE, Command.TRANSFORM, Command.USER_SHP_COORD_CONV, map );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 행정경계코드 변환
	 * </pre>
	 * @param ( table_name ) 테이블이름
	 * @param ( bnd_cd_column ) 행정경계코드컬럼
	 * @param ( user_id ) 사용자아이디
	 * @param ( description ) 설명
	 * @param ( target_agent ) 서버이름
	 * 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject bndChange( 
			String table_name,
			String bnd_cd_column,
			String user_id,
			String description,
			String target_agent,
			Boolean base_boolean,
			Boolean tot_boolean
			) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String ,Object> map = new HashMap<String, Object>();
		map.put( "INPUT_TABLE_NAME", table_name );
		map.put( "BND_CD_COLUMN", bnd_cd_column );
		map.put( RequestKey.USER_ID, user_id );
		map.put( "DESCRIPTION", description );
		map.put( RequestKey.TARGET_AGENT, target_agent );
		
		map.put( "BASE_BOOLEAN", base_boolean == null ? false : base_boolean );
		map.put( "TOT_BOOLEAN", tot_boolean == null ? false : tot_boolean );
		
		res = restService.call( Command.RESOURCE, Command.MAPPING, Command.USER_DATA_BND_MAPPING, map );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}

	/**
	 * <pre>
	 * 수집현황 목록 조회
	 * </pre>
	 * @param limit
	 * @param offset
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject selectCollectResourceList(
			int limit,
			int offset
			 ) throws SystemFailException{

		JSONObject res = new JSONObject();
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );

		res = restService.call( Command.LOG, Command.COLLECT_LOG_SELECT, parameters );

		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}

		return res;
	}


	/**
	 * <pre>
	 * 수집현황 대쉬보드 조회
	 * </pre>
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject getCollectDashboard() throws SystemFailException{
		JSONObject res = new JSONObject();
		res = restService.call( Command.EXECUTE, Command.SELECT_COLLECT_DETAIL, null );

		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}

		return res;
	}

	/**
	 * <pre>
	 * 수집현황 파일 목록 조회
	 * </pre>
	 * @param limit
	 * @param offset
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject selectCollectResourceFileList(String searchName) throws SystemFailException{
		JSONObject res = new JSONObject();

		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("SEARCH_NAME", searchName);
		res = restService.call( Command.MOLIT, Command.LIST, parameters);

		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}

		return res;
	}


	/**
	 * <pre>
	 * 수집현황 파일 실행
	 * </pre>
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject selectCollectResourceFileExcute(String server_name, String user_id, String schema, String file_name ) throws SystemFailException{
		JSONObject res = new JSONObject();

		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "SERVER_NAME", server_name );
		parameters.put( "SCHEMA", schema );
		parameters.put("FILE_NAME", file_name);

		res = restService.call( Command.MOLIT, Command.EXECUTE, parameters );

		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}

		return res;
	}


	/**
	 * <pre>
	 * RESOURCE 파일 이름 변경	파일 이름 변경	RESOURCE	HDFS	RENAME		RESOURCE_ID
	 * </pre>
	 * @param String ( resource_id ) 리소스 아이디
	 * @param String ( name ) 파일 이름
	 * @throws SystemFailException
	 */
	@SuppressWarnings("static-access")
	public JSONObject collectFileUpload (
			HttpServletResponse response,
			InputStream inputStream,
			String filename,
			String uploadPath ) throws SystemFailException{


		String data = restService.callByCollectFileUpload(response, inputStream, filename, uploadPath);
		JSONObject res = new JSONObject().fromObject(data);

		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}

		return res;
	}

	
}
