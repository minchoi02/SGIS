package kostat.lbdms.ServiceAPI.common.web.rest.command;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONObject;

/**  
* <pre>
* Agent REST Service
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
public class AgentCommandClient {
    	@Autowired
	private RestService restService;
	
	/**
	 * <pre>
	 * AGENT의 목록을 조회한다
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException 
	 */
	public JSONObject getAgentList( 
			String user_id ,
			int limit,
			int offset,
			HashMap<String, Object> extraParams ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.USER_ID, user_id );		
		parameters.put( RequestKey.LIMIT, limit );
		parameters.put( RequestKey.OFFSET, offset );
		
		parameters.putAll( extraParams );
		
		JSONObject res = restService.call( Command.AGENT, Command.CRUD, Command.SELECT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	/**
	 * <pre>
	 * AGENT 등록
	 * </pre>
	 * @param String ( agent_name ) 에이전트 명 
	 * @param String ( server_name )  서버 명
	 * @param String ( agent_ip ) IP
	 * @param int ( agent_port ) 에이전트 포트 
	 * @param int ( tcp_port ) TCP 포트
	 * @throws SystemFailException 
	 */
	public void add( 
			String agent_name, 
			String server_name, 
			String agent_ip, 
			int agent_port, 
			int tcp_port ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "AGENT_NAME", agent_name );
		parameters.put( "SERVER_NAME", server_name );
		parameters.put( "AGENT_IP", agent_ip );
		parameters.put( "AGENT_PORT", agent_port );
		parameters.put( "TCP_PORT", tcp_port );
		
		JSONObject res = restService.call( Command.AGENT, Command.CRUD, Command.INSERT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * AGENT 삭제
	 * </pre>
	 * @param agent_name
	 * @param server_name
	 * @throws SystemFailException 
	 */
	public void delete( String agent_name, String server_name ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "AGENT_NAME", agent_name );
		parameters.put( "SERVER_NAME", server_name );
		
		JSONObject res = restService.call( Command.AGENT, Command.CRUD, Command.DELETE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
	}
	
	/**
	 * <pre>
	 * AGENT 정보 조회 
	 * </pre>
	 * @param String ( agent_name ) AGENT 명 ( NAMENODE2, INNER, OUTER, ANALYSIS )
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getInfo( String agent_name ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "AGENT_NAME", agent_name );
		
		JSONObject res = restService.call( Command.AGENT, Command.CRUD, Command.AGENT_INFO, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 클라이언트들의 상태를 조회한다
	 * </pre>
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getClientStatus() throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		JSONObject res = restService.call( Command.AGENT, Command.CLIENT_STATUS, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
		
	}
}
