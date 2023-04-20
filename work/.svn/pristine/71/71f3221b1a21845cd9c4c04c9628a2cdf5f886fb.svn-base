package kostat.lbdms.ServiceAPI.common.web.core;

import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.TargetAgent;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONObject;

/**  
* <pre>
* 실행 이력 서비스 
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
public class ExecuteCommandClient {

	@Autowired
	private RestService restService;
	
	/**
	 * <pre>
	 * 이력 목록 조회 
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
		
		// 단계설정
		parameters.put( RequestKey.CATEGORY4 , category4 );
		
		res = restService.call( Command.EXECUTE, Command.SELECT_CATEGORIZE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 이력정보 조회
	 * </pre>
	 * @param String ( execute_id ) 실행 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject detail( String execute_id ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.EXECUTE_ID, execute_id );
		
		res = restService.call( Command.EXECUTE, Command.DETAIL, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 이력정보 삭제
	 * </pre>
	 * @param String[] ( ids ) 실행 아이디 목록
	 * @throws SystemFailException
	 */
	public void delete( String[] ids ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.EXECUTE_ID, StringUtils.join( ids, "," ) );
		
		res = restService.call( Command.EXECUTE, Command.DELETE, parameters );
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}

	/**
	 * <pre>
	 * 실행 중인 작업을 중지한다
	 * </pre>
	 * @param String ( executeId ) 실행 아이디
	 * @param String ( actionId ) 액션 아이디
	 * @param String ( userId ) 사용자 아이디
	 * @throws SystemFailException 
	 */
	public void stop( String executeId, String actionId, String userId ) throws SystemFailException {
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.EXECUTE_ID, executeId );
		parameters.put( RequestKey.ACTION_ID, actionId );
		parameters.put( "RESPONSE", "TRUE" );
		parameters.put( "TARGET_AGENT", TargetAgent.NAMENODE2 );
		parameters.put( RequestKey.USER_ID, userId );
		
		res = restService.call( Command.ACTION, Command.STOP, parameters );
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
	}
	
	/**
	 * <pre>
	 * 카이로스 전송 이력 목록 조회 
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param int ( limit ) 개수 제한 
	 * @param int ( offset ) 조회 시작 위치
	 * @param String ( category4 ) 단계
	 * @param HashMap ( extraParams ) 추가 파라메타 
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject saveExecuteSelect( 
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
		
		parameters.put( RequestKey.CATEGORY4 , category4 );
		
		parameters.putAll( extraParams );
		
		res = restService.call( Command.EXECUTE, Command.SAVE_EXECUTE_SELECT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 맵핑중인 테이블 체크
	 * </pre>
	 * @param String ( table_name ) 테이블명
	 * @param String ( user_id ) 스키마명
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject selectMappingRunning( String table_name, String user_id ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.TABLE_NAME, table_name );
		parameters.put( RequestKey.USER_ID, user_id );
		
		res = restService.call( Command.EXECUTE, Command.SELECT_MAPPING_RUNNING, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
}
