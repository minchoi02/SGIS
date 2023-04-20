package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kostat.lbdms.ServiceAPI.common.web.core.PostgreCommandClient;
import kostat.lbdms.ServiceAPI.common.web.model.Meta;
import kostat.lbdms.ServiceAPI.common.web.model.TableData;
import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.ResultKey;
import kostat.lbdms.ServiceAPI.controller.service.SpaAnService;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

/**  
* <pre>
* 공간분석 관리 서비스
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

@Service("spaAnService")
public class SpaAnServiceImpl extends EgovAbstractServiceImpl implements SpaAnService {
	@Resource(name="postgreCommandClient")
	private PostgreCommandClient client;
	
	/**
	 * <pre>
	 * 좌표변환, 맵핑, 검증 시 선택한 데이터의 일부 내용을 조회한다
	 * </pre>
	 * @param String ( dbName )	데이터베이스 명 
	 * @param String ( tableName ) 테이블 명
	 * @param String ( userId ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public TableData getTablePreview( 
			String schema, 
			String tableName, 
			String userId ) throws SystemFailException {
		
		TableData table = new TableData(); 
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put( RequestKey.RESPONSE, "TRUE" );
		parameters.put( RequestKey.USER_ID, userId );
		parameters.put( RequestKey.SCHEMA, schema );
		parameters.put( RequestKey.LIMIT, "100" );
		parameters.put( RequestKey.TABLE_NAME, tableName );
		parameters.put( RequestKey.SHOW_DESCRIPTION, "true" );
		JSONObject res = new RestService().call( Command.RESOURCE, Command.PREVIEW, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		if( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		table.setRows( message.getJSONArray("VALUE") );
		table.setComments( message.getJSONArray("DESCRIPTION") );
		JSONArray columns = message.getJSONArray("COLUMN");		
		for ( int i = 0, size = columns.size(); i < size; i++ ){
			JSONObject item = new JSONObject();
			String col = columns.getString(i);
			item.put("col", col);
			table.addColumns( item );
		}
		
		return table;
	}
	
	/**
	 * <pre>
	 * 좌표변환, 맵핑, 검증 시 선택한 데이터의 일부 내용을 조회한다
	 * </pre>
	 * @param String ( resourceId ) 리소스 아이디
	 * @param String ( userId ) 사용자 아이디
	 * @throws SystemFailException
	 */
	public TableData getPointsView( 
			String resourceId, 
			String userId ) throws SystemFailException {
		
		TableData table = new TableData(); 
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put( RequestKey.USER_ID, userId );
		parameters.put( RequestKey.RESPONSE, "TRUE" );
		parameters.put( RequestKey.RESOURCE_ID, resourceId );
		parameters.put( RequestKey.OFFSET, "0" );
		parameters.put( RequestKey.LIMIT, "1000" );
		parameters.put( RequestKey.SHOW_DESCRIPTION, "true" );
		JSONObject res = new RestService().call( Command.RESOURCE, Command.PREVIEW, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		if( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		table.setRows( message.getJSONArray("VALUE") );
		table.setComments( message.getJSONArray("DESCRIPTION") );
		JSONArray columns = message.getJSONArray("COLUMN");		
		for ( int i = 0, size = columns.size(); i < size; i++ ){
			JSONObject item = new JSONObject();
			String col = columns.getString(i);
			item.put("col", col);
			table.addColumns( item );
		}
		
		return table;
	}
	
	/**
	 * <pre>
	 * 테이블 상세정보 조회
	 * </pre>
	 * @param String ( table_name ) 테이블 명
	 * @return 테이블 상세정보 
	 * @throws SystemFailException
	 */
	public List<Meta> getTableInfo( String table_name ) throws SystemFailException{
	
		List<Meta> metaList = new ArrayList<Meta>();
		
		JSONObject res = new JSONObject();
		
		res = client.getTableInfo( RequestKey.KOSTAT, table_name, RequestKey.KOSTAT);
		if ( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		
		JSONArray value = message.getJSONArray("VALUE");
		
		for ( int i = 0, size = value.size(); i < size; i++ ){
			
			JSONObject item = value.getJSONObject(i);
			
			Meta meta = new Meta();
			
			meta.setColumn_name( item.getString("column_name") );

			if( item.has("column_comment")){
				meta.setColumn_comment( item.getString("column_comment") );
			}
			
			metaList.add( meta );
		}
		
		return metaList;
		
	}
	
	/**
	 * <pre>
	 * 테이블 상세정보 조회
	 * </pre>
	 * @param String ( table_name ) 테이블 명
	 * @param String ( schema ) 스키마
	 * @param String ( user_id ) 사용자 아이디
	 * @return 테이블 상세정보 
	 * @throws SystemFailException
	 */
	public List<Meta> getTableInfo( String schema, String table_name, String user_id ) throws SystemFailException{
	
		List<Meta> metaList = new ArrayList<Meta>();
		
		JSONObject res = new JSONObject();
		
		res = client.getTableInfo( schema, table_name, user_id);
		if ( !res.has( ResultKey.MESSAGE ) ){
			throw new JSONException("MESSAGE Key가 존재하지 않습니다");
		}
		JSONObject message = res.getJSONObject( ResultKey.MESSAGE );
		
		JSONArray value = message.getJSONArray("VALUE");
		
		for ( int i = 0, size = value.size(); i < size; i++ ){
			
			JSONObject item = value.getJSONObject(i);
			
			Meta meta = new Meta();
			
			meta.setColumn_name( item.getString("column_name") );
			
			if ( item.has("data_type") ){
				meta.setData_type( item.getString("data_type") );
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
	 * 데이터 제약조건 사전 점검
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject chkSpaData( 
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.BUFFER_ANALYSIS, 
				Command.BUFFER_RESTRICTION, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터조건설정
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject resultSpaData( 
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.DATA_CONDITION, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 결과데이터 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject importData( 
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.DATA_IMPORT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 범례만들기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject getRange(	
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.LEGEND_LIST, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 범례적용 
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject applyRange(	
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.LEGEND_APPLY, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * <pre>
	 * 공간분석 결과처리
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject spaProc(	
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.RESULT_PROCESSING, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 공간분석 결과 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject getSpaResult(	
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.DATA_IMPORT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 공간분석 결과저장
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject spaSave(	
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.RESULT_SAVE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	
	/**
	 * <pre>
	 * 영역선택 
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject selBoundary(	
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.BUFFER_ANALYSIS, 
				Command.MAKE_POLYGON, parameters );
		
		//기존 선택영역이 85퍼센트이상 중복되면 오류가 발생하도록 한다.
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	
	/**
	 * <pre>
	 * 결합데이터 구성 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject selectUnionData( 
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.SELECT_UNION_DATA, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	
	/**
	 * <pre>
	 * 공간자기 구성 가져오기
	 * </pre>
	 * @param param
	 * @return
	 */
	public JSONObject selectSpaceData( 
			HashMap<String,Object> parameters ) throws SystemFailException{
		
		JSONObject res = new JSONObject();

		res = new RestService().call( Command.ANALYSIS, 
				Command.GEO_ANALYSIS, 
				Command.SELECT_ANALYSIS_RESULT_INFO, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
}
