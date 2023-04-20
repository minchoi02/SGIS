package kostat.lbdms.ServiceAPI.common.web.rest.command;

import java.util.HashMap;

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
* 운영현황 관련 REST 호출 클래스
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
public class ManageCommandClient {
    	@Autowired
	private RestService restService;
	
	/**
	 * <pre>
	 * Hadoop 서버 별 메모리, CPU 조회
	 * </pre>
	 * @param String ( target_agent ) 전송 에이전트
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getCpuMemory( String user_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE" );
		parameters.put( "TARGET_AGENT", TargetAgent.NAMENODE2  );
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = restService.call(
				Command.ACTION, 
				Command.MANAGE, 
				Command.HADOOP, 
				Command.GET_CPU_MEMORY, 
				parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * Hadoop 서버 총 disk 정보 조회
	 * </pre>
	 * @param String ( target_agent ) 전송 에이전트
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getDisk( String user_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE" );
		parameters.put( "TARGET_AGENT", TargetAgent.NAMENODE2 );
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = restService.call(
				Command.ACTION, 
				Command.MANAGE, 
				Command.HADOOP, 
				Command.GET_DISK, 
				parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * Hadoop 서버 총 메모리, CPU 조회 
	 * </pre>
	 * @param String ( target_agent ) 전송 에이전트
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getSumCpuMemory( String user_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE" );
		parameters.put( "TARGET_AGENT", TargetAgent.NAMENODE2 );
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = restService.call(
				Command.ACTION, 
				Command.MANAGE, 
				Command.HADOOP, 
				Command.SUM_CPU_MEMORY, 
				parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * POSTGRE 메모리,CPU,CONNECTION 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getPgCpuMemory( String user_id ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESPONSE", "TRUE" );
		parameters.put( "TARGET_AGENT", TargetAgent.NAMENODE2 );
		parameters.put( RequestKey.USER_ID, user_id );
		
		JSONObject res = restService.call(
				Command.ACTION, 
				Command.MANAGE, 
				Command.POSTGRE, 
				Command.PG_GET_CPU_MEMORY, 
				parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 유저별 사용량 조회
	 * </pre>
	 * @param String ( lbdms_id ) lbdms 아이디
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getUserDataUsed(
			String lbdms_id,
			String user_id
			) throws SystemFailException{
		
		HashMap<String, Object> parameters = new HashMap<String, Object>();
		parameters.put( RequestKey.RESPONSE, "TRUE" );
		parameters.put( "LBDMS_ID" , lbdms_id );
		parameters.put( "USER_ID" , user_id );
		
		JSONObject res = restService.call(
				Command.ACTION, 
				Command.MANAGE, 
				Command.DATA_USED, 
				parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 업무현황 조회
	 * </pre>
	 * @param boolean isAdmin 관리자여부
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getProcessStatus( boolean isAdmin, String user_id ) throws SystemFailException{
		
		HashMap<String, Object> parameters = new HashMap<String, Object>();
		
		if( !isAdmin ){
			parameters.put( RequestKey.USER_ID, user_id );
		}
		
		JSONObject res = restService.call(
				Command.SYSTEM, 
				Command.MANAGE, 
				Command.PROCESS_STATUS, 
				parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	//@TODO 리스트 엑셀 저장
	

	/**
	 * <pre>
	 * 업무현황 조회
	 * </pre>
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getWeekExpectWorkflow(
			int limit,
			int offset) throws SystemFailException{
		
		HashMap<String, Object> parameters = new HashMap<String, Object>();
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		
		JSONObject res = restService.call( Command.SYSTEM, Command.MANAGE, Command.WEEK_EXPECT_WORKFLOW, parameters);
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 실패작업현황 조회
	 * </pre>
	 * @param String ( uid ) 아이디
	 * @param int ( limit ) 개수 제한 
	 * @param int ( offset ) 조회 시작 위치
	 * @param HashMap ( extraParams ) 추가 파라메타 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject execute_list(
			String user_id,
			int limit,
			int offset,
			HashMap<String,Object> extraParams ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		if ( user_id != null ){
			parameters.put( RequestKey.USER_ID, user_id );
		}
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		
		parameters.putAll( extraParams );
		
		res = restService.call( Command.SYSTEM, Command.MANAGE, Command.EXECUTE_LIST, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 사용자별 오픈 데이터 사용 현황 조회 
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( res_user_id ) 관리자 아이디
	 * @param int ( limit ) 개수 제한 
	 * @param int ( offset ) 조회 시작 위치
	 * @param String ( category4 ) 단계
	 * @param HashMap ( extraParams ) 추가 파라메타 
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject selectOpenDataUserList( 
			String user_id, 
			String res_user_id, 
			int limit, 
			int offset,
			String category4,
			HashMap<String,Object> extraParams ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "RES_USER_ID", res_user_id );
		
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		
		parameters.putAll( extraParams );
		
		parameters.put( RequestKey.CATEGORY4 , category4 );
				
		res = restService.call( Command.SYSTEM, Command.MANAGE, Command.OPEN_DATA_USER_LIST, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * <pre>
	 * 아이디가 시스템에 등록되어있는지 여부를 체크한다
	 * </pre>
	 * @param String ( userId ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject registerCheck(String userId) throws SystemFailException {
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, userId );
		
		res = restService.call( Command.SYSTEM, Command.MANAGE, Command.REGISTER_CHECK, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * <pre>
	 * 아이디가 시스템에 등록되어있는지 여부를 체크한다
	 * </pre>
	 * @param String ( userId ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject removeUser(String userId) throws SystemFailException {

		JSONObject res = new JSONObject();

		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("DELETE_USER_ID", userId );

		res = restService.call( Command.SYSTEM, Command.MANAGE, Command.DELETE_USER_DATA, parameters );

		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}

		return res;
	}
}
