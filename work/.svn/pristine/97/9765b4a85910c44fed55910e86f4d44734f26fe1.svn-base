package kostat.lbdms.ServiceAPI.common.web.rest.manage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kostat.lbdms.ServiceAPI.common.web.rest.command.AgentCommandClient;
import kostat.lbdms.ServiceAPI.common.web.rest.command.ManageCommandClient;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.ResultKey;
import kostat.lbdms.ServiceAPI.common.web.rest.mapper.ExecuteMapper;
import kostat.lbdms.ServiceAPI.common.web.rest.mapper.STSMapper;
import kostat.lbdms.ServiceAPI.common.web.rest.system.FailExecute;
import kostat.lbdms.ServiceAPI.common.web.util.CommonUtil;
import kostat.lbdms.ServiceAPI.controller.model.core.ListTypeParameter;
import kostat.lbdms.ServiceAPI.controller.model.core.ListTypeResult;
import kostat.lbdms.ServiceAPI.controller.model.rest.ClientStatus;
import kostat.lbdms.ServiceAPI.controller.model.rest.Download;
import kostat.lbdms.ServiceAPI.controller.model.rest.ManageData;
import kostat.lbdms.ServiceAPI.controller.model.rest.OpenDataVO;
import kostat.lbdms.ServiceAPI.controller.model.rest.Workflow;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

/**  
* <pre>
* 운영현황 관련 서비스
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
*   2017.07.13.      ischoi                    다운로드 현황 추가
* </pre>
* 
*/

@Service
public class ManageService {
    	@Autowired
	private ManageCommandClient manageCommandClient;
	
	@Autowired
	private AgentCommandClient agentCommandClient;
	
	/*@Autowired
	private STSMapper mapper;
	
	@Autowired
	private ExecuteMapper execMapper;*/
	@Resource(name="stsMapper")
	private STSMapper mapper;
	@Resource(name="executeMapper")
	private ExecuteMapper execMapper;
	
	/**
	 * <pre>
	 * 사용자 서포트 영역 게시글 카운트 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public HashMap<String, Object> getUserManageStatusCount() {
		HashMap<String, Object> map = mapper.getUserManageStatusCount();
		
		return map;
	}
	
	/**
	 * <pre>
	 * 서포트 영역 게시글 카운트 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public HashMap<String, Object> getManageStatusCount() {
		HashMap<String, Object> map = mapper.getManageStatusCount();
		
		return map;
	}
	
	/**
	 * <pre>
	 * Hadoop 서버 총 disk 정보 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getCount(String user_id) throws SystemFailException{
		JSONObject res = manageCommandClient.getDisk(user_id);
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * Hadoop 서버별 메모리,CPU조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getCpuMemory(String user_id) throws SystemFailException{
		JSONObject res = manageCommandClient.getCpuMemory(user_id);
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * Hadoop 서버 총 disk 정보 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getDisk(String user_id) throws SystemFailException{
		JSONObject res = manageCommandClient.getDisk(user_id);
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * Hadoop 서버 총 메모리, CPU 정보 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject getSumCpuMemory(String user_id) throws SystemFailException{
		JSONObject res = manageCommandClient.getSumCpuMemory(user_id);
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
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
	public JSONObject getPgCpuMemory(String user_id) throws SystemFailException{
		JSONObject res = manageCommandClient.getPgCpuMemory(user_id);
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
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
			String user_id ) throws SystemFailException{
		
		JSONObject res = manageCommandClient.getUserDataUsed( lbdms_id, user_id );
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	
	/**
	 * <pre>
	 * 사용자 승인요청 건수 조회
	 * </pre>
	 * @param String ( user_id ) 사용자 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public HashMap<String, Object> selectGrantCnt( String user_id ) {
		
		HashMap<String, Object> map = mapper.selectGrantCnt( user_id );
		
		return map;
	}
	
	/**
	 * <pre>
	 * 파일 에이전트 목록을 조회한다
	 * </pre>
	 * @param String ( userId ) 사용자 ID
	 * @param ListTypeParameter ( param ) 검색조건
	 * @return ListTypeResult 액션목록
	 * @throws SystemFailException
	 */
	public ListTypeResult<List<ManageData>> findBy(
			String userId,
			int display,
			int start,
			ListTypeParameter param) throws SystemFailException {

		JSONObject res = new JSONObject();

		res = agentCommandClient.getAgentList(
				userId,
				display,
				start,
				param.getParameter());

		ListTypeResult<List<ManageData>> result = new ListTypeResult<List<ManageData>>();
		List<ManageData> list = new ArrayList<ManageData>();

		if ( !res.has("LIST") ){
			throw new JSONException("LIST Key가 존재하지 않습니다");
		}

		JSONArray arr = res.getJSONArray("LIST");

		int size = arr.size();

		for ( int i=0; i < size; i++ ){
			ManageData col = new ManageData();

			JSONObject item = arr.getJSONObject(i);

			col.setAgent_port( item.getString("AGENT_PORT") );
			col.setAgent_name( item.getString("AGENT_NAME") );
			col.setAgent_description( item.getString("AGENT_DESCRIPTION") );
			col.setKor_name( item.getString("KOR_NAME") );
			col.setCategory1( item.getString("CATEGORY1") );
			col.setTcp_port( item.getString("TCP_PORT") );
			col.setServer_name( item.getString("SERVER_NAME") );
			col.setAgent_ip( item.getString("AGENT_IP") );

			list.add( col );
		}

		result.setTotal(size);
		result.setData(list);

		return result;
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
		
		JSONObject res = manageCommandClient.getProcessStatus( isAdmin, user_id );
		
		if(!RestResultChecker.isSuccess(res)){
			throw new SystemFailException(RestResultChecker.getMessage(res));
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 업무현황 조회
	 * </pre>
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public ListTypeResult<List<Workflow>> getWeekExpectWorkflow(
			int display,
			int start ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		res = manageCommandClient.getWeekExpectWorkflow( display, start );
		
		ListTypeResult<List<Workflow>> result = new ListTypeResult<List<Workflow>>();
		List<Workflow> list = new ArrayList<Workflow>();
		
		if ( !res.has("COUNT") ){
			throw new JSONException("COUNT Key가 존재하지 않습니다");
		}
		
		if ( !res.has("LIST") ){
			throw new JSONException("LIST Key가 존재하지 않습니다");
		}
		
		int total = res.getInt("COUNT");
		
		JSONArray arr = res.getJSONArray("LIST");
		
		for ( int i = 0, size = arr.size(); i < size; i++ ){
		
			Workflow col = new Workflow();
			
			JSONObject item = arr.getJSONObject(i);
			
			col.setWorkflow_description( item.getString("WORKFLOW_DESCRIPTION") );
			col.setSchedule_time( item.getString("SCHEDULE_TIME") );
			col.setUser_id( item.getString("USER_ID") );
			col.setCategory2( item.getString("CATEGORY2") );
			col.setSchedule_id( item.getString("SCHEDULE_ID") );
			col.setWorkflow_id( item.getString("WORKFLOW_ID") );
			col.setWorkflow_name( item.getString("WORKFLOW_NAME") );
			
			list.add( col );
		}
		
		result.setTotal(total);
		result.setData(list);
		
		return result;
	}

	
	/**
	 * <pre>
	 * 클라이언트들의 상태목록을 조회한다
	 * </pre>
	 * @return ClientStatus
	 * @throws SystemFailException
	 */
	public ClientStatus getClientsStatus() throws SystemFailException {

		JSONObject res = new JSONObject();
		ClientStatus client = new ClientStatus();

		// Agent 부분에서 조회해서 불러오는 부분
		res = agentCommandClient.getClientStatus();
		
		if ( res.has( ResultKey.MESSAGE ) ){
			
			JSONArray message = res.getJSONArray( ResultKey.MESSAGE );
			for ( int i = 0, size = message.size(); i < size; i++ ){
				JSONObject item = message.getJSONObject(i);
				if ( item.has("CLIENT") && item.has("STATUS") ){
					
					String name = item.getString("CLIENT");
					String status = item.getString("STATUS");
					
					if ( StringUtils.equalsIgnoreCase( name, "INNER") ){
						client.setInner( StringUtils.equalsIgnoreCase( status, "SUCCESS") );
					} else if ( StringUtils.equalsIgnoreCase( name, "ANALYSIS") ){
						client.setAnalysis( StringUtils.equalsIgnoreCase( status, "SUCCESS") );
					} else if ( StringUtils.equalsIgnoreCase( name, "NAMENODE2") ){
						client.setNamenode2( StringUtils.equalsIgnoreCase( status, "SUCCESS") );
					} else if ( StringUtils.equalsIgnoreCase( name, "OUTER") ){
						client.setOuter( StringUtils.equalsIgnoreCase( status, "SUCCESS") );
					} else if ( StringUtils.equalsIgnoreCase( name, "LBDMS") ){
						client.setLbdms( StringUtils.equalsIgnoreCase( status, "SUCCESS") );
					}
				}
			}
			
		}
		
		return client;
	}
	
	/**
	 * <pre>
	 * 실패작업현황 조회
	 * </pre>	
	 * @param String ( uid ) ID
	 * @param int ( display ) 가져올 개수  		
	 * @param int ( start ) 시작위치
	 * @param int ( offset ) 시작위치
	 * @param ListTypeParameter ( param ) 검색조건
	 * @return ListTypeResult 액션목록 
	 * @throws SystemFailException 
	 */
	public ListTypeResult<List<FailExecute>> execute_list(
			String userId, 
			int display,
			int start, 
			ListTypeParameter param) throws SystemFailException {
		
		JSONObject res = new JSONObject();
		
		res = manageCommandClient.execute_list( 
				userId, 
				display, 
				start, 
				param.getParameter() );
		
		ListTypeResult<List<FailExecute>> result = new ListTypeResult<List<FailExecute>>();
		List<FailExecute> list = new ArrayList<FailExecute>();
		
		if ( !res.has("COUNT") ){
			throw new JSONException("COUNT Key가 존재하지 않습니다");
		}
		
		if ( !res.has("LIST") ){
			throw new JSONException("LIST Key가 존재하지 않습니다");
		}
		
		int total = res.getInt("COUNT");
		
		JSONArray arr = res.getJSONArray("LIST");
		
		for ( int i = 0, size = arr.size(); i < size; i++ ){
		
			FailExecute col = new FailExecute();
			
			JSONObject item = arr.getJSONObject(i);
			
			if( item.has("ALIVE_TIME") ){ 
				col.setAlive_time( item.getString("ALIVE_TIME") );  
			}
			
			col.setState( item.getString("STATE") );
			if ( item.has("DATA_NAME") ){
				col.setData_name( item.getString("DATA_NAME") );
			}
			col.setUser_id( item.getString("USER_ID") );
			
			if( item.has("CATEGORY1") ){
				col.setCategory1( item.getString("CATEGORY1") );
			}
			
			if( item.has("CATEGORY2") ){
				col.setCategory2( item.getString("CATEGORY2") );
			}
			
			if( item.has("CATEGORY3") ){
				col.setCategory3( item.getString("CATEGORY3") );
			}
			
			if( item.has("CATEGORY4") ){
				col.setCategory4( item.getString("CATEGORY4") );
			}
			
			if( item.has( "ACTION_TYPE" )){
				col.setAction_type( item.getString("ACTION_TYPE") );
			}
			
			if ( item.has("EXECUTE_DESCRIPTION") ){
				col.setExecute_description( item.getString("EXECUTE_DESCRIPTION") );
			}
			col.setStart_time( item.getString("START_TIME") );
			
			if ( item.has("DATA_STORAGE_TYPE") ){
				col.setData_storage_type( item.getString("DATA_STORAGE_TYPE") );
			}
			
			if( item.has( "WORKFLOW_ID" )){
				col.setWorkflow_id( item.getString("WORKFLOW_ID") );
			}
			
			if( item.has( "EXECUTE_ID" )){
				col.setExecute_id( item.getString("EXECUTE_ID") );
			}
			
			if( item.has( "WORKFLOW_EXECUTE_ID" )){
				col.setWorkflow_execute_id( item.getString("WORKFLOW_EXECUTE_ID") );
			}
			
			
			if( item.has( "ACTION_NAME" )){
				col.setAction_name( item.getString("ACTION_NAME") );
			}
			
			if( item.has( "WORKFLOW_NAME" )){
				col.setWorkflow_name( item.getString("WORKFLOW_NAME") );
			}
			
			/*if( item.has( "MAX_CNT" ) ){
				col.setMax_cnt( item.getInt("MAX_CNT") );
			}
			
			if( item.has( "CUR_CNT" ) ){
				col.setCur_cnt( item.getInt("CUR_CNT") );
			}*/
			
			if( item.has( "END_TIME" ) ){
				col.setEnd_time( item.getString("END_TIME") );
			}
			
			col.setAction_id( item.getString("ACTION_ID") );
			
			list.add( col );
		}
		
		result.setTotal(total);
		result.setData(list);
		
		return result;
		
	}
	
	// 20180529 강태경 시작
	
	public ListTypeResult<List<FailExecute>> execute_listByPg(
			String userId, 
			int display,
			int start, 
			ListTypeParameter param) throws SystemFailException {
		
		HashMap<String, Object> category = new HashMap<String, Object>();
		HashMap<String, Object> params = param.getParameter();
		
		
		if ( userId != null ){
			params.put( RequestKey.USER_ID, userId );
		}
		params.put( RequestKey.LIMIT, display );
		params.put( RequestKey.OFFSET, start );
		
		category = getCategoryByParameter(params);
		
		List<HashMap<String, Object>> list = execMapper.selectFailExecuteList(category);
		List<HashMap<String, Object>> namedList = new ArrayList<HashMap<String, Object>>();
		int count = execMapper.selectFailExecuteListCount(category);
		
		for (int i = 0; i < list.size(); i++) {
			HashMap<String, Object> hm = list.get(i);
			
			String actionName = String.valueOf(hm.get("action_nm"));
			hm.put("action_name", actionName);
			
			String descName = String.valueOf(hm.get("desc_nm"));
			hm.put("desc_name", descName);
			
			String workName = String.valueOf(hm.get("workflow_nm"));
			workName = (workName == "null" || workName == "NULL" || workName == null) ? "" : workName;
			hm.put("workflow_name", workName);
			
			namedList.add(hm);
		}
		
		ListTypeResult<List<FailExecute>> result = new ListTypeResult<List<FailExecute>>();
		List failList = CommonUtil.hashToClassTypeList(FailExecute.class, namedList);
		
		result.setTotal(count);
		result.setData(failList);
		
		return result;
		
	}
	
	private HashMap<String, Object>getCategoryByParameter(HashMap<String, Object> param) {
		HashMap<String, Object> category = new HashMap<String, Object>();
		
		if(param.get("ACTION_TYPE") != null) {
			category.put("ACTION_TYPE", String.valueOf(param.get("ACTION_TYPE")));
		}
		if(param.get("USER_ID") != null) {
			category.put("USER_ID", String.valueOf(param.get("USER_ID")));
		}
		if(param.get("ACTION_NAME") != null) {
			category.put("ACTION_NAME", String.valueOf(param.get("ACTION_NAME")));
		}
		if(param.get("EXECUTE_DESCRIPTION") != null) {
			category.put("EXECUTE_DESCRIPTION", String.valueOf(param.get("EXECUTE_DESCRIPTION")));
		}
		if(param.get("CATEGORY3") != null) {
			category.put("CATEGORY3", String.valueOf(param.get("CATEGORY3")));
		}
		if(param.get("SORT_COLUMN") != null) {
			String sortColumn = String.valueOf(param.get("SORT_COLUMN"));
			String replaceColumn = sortColumn.replace("name", "nm");
			if (replaceColumn.equals("workflow_nm")) {
				replaceColumn = "b."+replaceColumn;
				category.put("SORT_COLUMN", replaceColumn);
			}else{
				category.put("SORT_COLUMN", replaceColumn);
			}
			
			if(param.get("SORT_TYPE") != null) {
				category.put("SORT_TYPE", String.valueOf(param.get("SORT_TYPE")).toUpperCase());
			}else{
				category.put("SORT_TYPE", "ASC");
			}
			
		}
		
		if(param.get("LIMIT") != null) {
			category.put("LIMIT", (Integer) param.get("LIMIT"));
		}
		if(param.get("OFFSET") != null) {
			category.put("OFFSET", (Integer) param.get("OFFSET"));
		}
		
		return category;
	}
	
	// 20180529 강태경 끝
	
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
	 * @return ListTypeResult<List<OpenDataVO>> 
	 * @throws SystemFailException
	 */
	
	public ListTypeResult<List<OpenDataVO>> selectOpenDataUserList(
			String userId,
			String resUserId,
			int display,
			int start, 
			String category4,
			ListTypeParameter param) throws SystemFailException {
		
		JSONObject res = new JSONObject();
		
		res = manageCommandClient.selectOpenDataUserList( 
				userId,
				resUserId,
				display, 
				start, 
				category4, 
				param.getParameter() );
		
		ListTypeResult<List<OpenDataVO>> result = new ListTypeResult<List<OpenDataVO>>();
		List<OpenDataVO> list = new ArrayList<OpenDataVO>();
		
		if ( !res.has("COUNT") ){
			throw new JSONException("COUNT Key가 존재하지 않습니다");
		}
		
		if ( !res.has("LIST") ){
			throw new JSONException("LIST Key가 존재하지 않습니다");
		}
		
		int total = res.getInt("COUNT");
		
		JSONArray arr = res.getJSONArray("LIST");
		
		for ( int i = 0, size = arr.size(); i < size; i++ ){
		
			OpenDataVO col = new OpenDataVO();
			
			
			JSONObject item = arr.getJSONObject(i);
			
			col.setAction_type( item.getString("ACTION_TYPE") );
			
			col.setCategory1( item.getString("CATEGORY1") );
			col.setData_name( item.getString("DATA_NAME") );
			col.setUser_id( item.getString("USER_ID") );
			col.setCategory3( item.getString("CATEGORY3") );
			col.setDescription( item.getString("DESCRIPTION") );
			col.setData_storage_type( item.getString("DATA_STORAGE_TYPE") );
			col.setCategory2( item.getString("CATEGORY2") );
			col.setCategory4( item.getString("CATEGORY4") );
			
			col.setUsed_time( item.getString("USED_TIME") );
			
			if ( item.has("DATA_SIZE") ){
				col.setData_size( item.getString("DATA_SIZE") );
			}
			
			list.add( col );
		}
		
		result.setTotal(total);
		result.setData(list);
		
		return result;
		
	}
	
	/**
	 * <pre>
	 * 사용자 아이디가 시스템에 등록가능한지 체크한다
	 * </pre>
	 * @param String ( userId ) 사용자 아이디
	 * @return 등록 여부 
	 * @throws SystemFailException 
	 */
	public boolean isRegistableUser( String userId )  {
		
		try{
			JSONObject res = manageCommandClient.registerCheck( userId );
				
			String message = RestResultChecker.getMessage( res );
			return StringUtils.equalsIgnoreCase( message, "SUCCESS" );
		}catch( SystemFailException sfe ){
			return false;
		}
		
	}


	/**
	 * <pre>
	 * 다운로드 목록을 조회한다
	 * </pre>
	 * @param ListTypeParameter ( param ) 검색조건
	 * @return ListTypeResult 액션목록
	 * @throws SystemFailException
	 */
	public ListTypeResult<List<Download>> findByDownloadList(ListTypeParameter param) throws SystemFailException {

		ListTypeResult<List<Download>> result = new ListTypeResult<List<Download>>();
		List<Download> list = new ArrayList<Download>();

		HashMap<String, Object> paramsMap = param.getParameter();

		paramsMap.put("start", param.getStart());
		paramsMap.put("display", param.getDisplay());

		list = mapper.selectDownloadList(paramsMap);
		int totalCnt = mapper.selectDownloadListTotalCount(paramsMap);

		result.setTotal(totalCnt);
		result.setData(list);

		return result;
	}


	/**
	 * <pre>
	 * 다음 API 사용 유무 설정
	 * </pre>
	 * @param useYn
	 * @return
	 * @throws PSQLException
	 */
	public int updateDaumApiUseYn(String useYn) throws PSQLException {
		if (StringUtils.isEmpty(useYn)) {
			useYn = "N";
		}
		mapper.updateDaumApiUseYn(useYn);
		return 1;
	}

	/**
	 * <pre>
	 * 다음 API 사용 유무 조회
	 * </pre>
	 * @return
	 * @throws PSQLException
	 */
	public String selectDaumApiUseYn()  {
		return mapper.selectDaumApiUseYn();
	}

	public List<Map<String, Object>> selectDataUsedCategory() {
		return mapper.selectDataUsedCategory();
	}

	public List<Map<String, Object>> selectDataUsedTotalCount(String startDate, String endDate) {
		Map paramsMap = new HashMap<String,Object>();
		paramsMap.put("startDate", startDate);
		paramsMap.put("endDate", endDate);
		return mapper.selectDataUsedTotalCount(paramsMap);
	}

	public List<Map<String, Object>> selectDataUsedCount(String startDate, String endDate) {
		Map paramsMap = new HashMap<String,Object>();
		paramsMap.put("startDate", startDate);
		paramsMap.put("endDate", endDate);
		return mapper.selectDataUsedCount(paramsMap);
	}
	
}
