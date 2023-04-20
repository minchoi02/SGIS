package kostat.lbdms.ServiceAPI.controller.service.impl;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kostat.lbdms.ServiceAPI.common.util.JSONConvertUtil;
import kostat.lbdms.ServiceAPI.controller.service.DataTransferService;
import kostat.lbdms.ServiceAPI.controller.service.mapper.DataTransferMapper;

@Service("dataTransferService")
public class DataTransferServiceImpl implements DataTransferService {

    private final Log logger = LogFactory.getLog(DataTransferServiceImpl.class);

    @Autowired
    DataTransferMapper dataTransferMapper;

    /**
     * 전송체크
     * 
     * @param paramMap
     * @return
     * @throws SQLException
     */
    public Map<String, Object> checkTransfer(Map<String, Object> paramMap) throws SQLException {
	// TODO Auto-generated method stub
	// getReqNumber

	/*
	 * Map<String , Object> reqMap = dataTransferMapper.selectReqNo(paramMap);
	 * req.get("req_no");
	 */
	// count
	int cnt = dataTransferMapper.selectCountDataTransReq(paramMap);

	Map<String, Object> map = new HashMap<String, Object>();
	map.put("cnt", cnt);
	if (cnt > 0) {
	    List<Map<String, Object>> list = dataTransferMapper.selectDataTransReq(paramMap);

	    Map<String, Object> transReq = list.get(0);
	    int req_seq = Integer.parseInt(transReq.get("req_seq").toString());
	    String procs_state_cd = transReq.get("procs_state_cd").toString();
	    map.put("req", transReq);
	    // GRA 신청중
	    // RET 거절
	}
	// ListInfo orderBy
	return map;
    }

    /**
     * reqTransfer 전송요청
     * 
     * @param paramMap
     * @return
     * @throws SQLException
     */
    public Map<String, Object> reqTransfer(String resource_id, JSONObject data, String user_id, String user_nm)
	    throws SQLException {

	/*
	 * {"action_name":"lbdms_calcu_2162", "kairos_table_name":"lbdms_calcu_2162",
	 * "save_type":"APPEND", "open_data_nm":"", "info_link_srv_nm":"살고싶은 우리동네",
	 * "info_link_srv_realm":"자연", "SYS_URL":"", "SYS_CD":"S"}
	 */

	Map<String, Object> paramMap = new HashMap<String, Object>();
	try {
	    paramMap = JSONConvertUtil.toMap(data);
	    paramMap.put("USER_ID", user_id);
	    paramMap.put("USER_NM", user_nm);
	    paramMap.put("OPEN_DATA_NM", data.get("open_data_nm"));
	    paramMap.put("INFO_LINK_SRV_NM", data.get("info_link_srv_nm"));
	    paramMap.put("INFO_LINK_SRV_REALM", data.get("info_link_srv_realm"));
	    paramMap.put("map", data.get("action_name"));
	    paramMap.put("procs_state_cd", "REQ");
	    paramMap.put("USER_ID", user_id);
	    
	    
	    
	    
	    dataTransferMapper.insertTransDataReq(paramMap);

	} catch (JSONException e) {
	    e.printStackTrace();
	}

	return paramMap;
    }

    /**
     * SGIS 전송 취소 cancelReqTransfer
     * 
     * @param Map<String,Object> paraMap
     * @return
     * @throws SQLException
     */
    public Map<String, Object> cancelReqTransfer(Map<String, Object> paramMap) throws SQLException {
	// update
	int cnt = dataTransferMapper.selectCountDataTransReq(paramMap);
	if (cnt > 0) {
	    List<Map<String, Object>> list = dataTransferMapper.selectDataTransReq(paramMap);
	    Map<String, Object> transReq = list.get(0);
	    paramMap.put("req_seq", transReq.get("req_seq").toString());
	    paramMap.put("procs_state_cd", "RET");
	    paramMap.put("procs_content", "취소");
	    dataTransferMapper.updateTransDataReq(paramMap);
	    
	    paramMap.put("errCd", 0);
	    paramMap.put("error", "");
	    
	}else {
	    //error
	    paramMap.put("errCd", 500);
	    paramMap.put("error", "Not Found Exception");
	}
	

	return paramMap;
    }

    /**
     * SGIS 전송 재요청 retryReqTransfer
     * 
     * @param Map<String,Object> paraMap
     * @return
     * @throws SQLException
     */
    public Map<String, Object> retryReqTransfer(Map<String,Object> paramMap) throws SQLException {
	// 검색 해온후 복사 새로 넣기
	int cnt = dataTransferMapper.selectCountDataTransReq(paramMap);
	if (cnt > 0) {
	    List<Map<String, Object>> list = dataTransferMapper.selectDataTransReq(paramMap);
	    Map<String, Object> transReq = list.get(0);
	    
	    //transReq.put("procs_state_cd", "REQ");
	    //transReq.put("USER_ID",transReq.get("user_id").toString());
	    /*transReq.put("map",transReq.get("trans_command").toString());*/
	    //transReq.put("map",paramMap.get("trans_table_name").toString());
	    //transReq.put("OPEN_DATA_NM", paramMap.get("open_data_nm"));
	    //transReq.put("INFO_LINK_SRV_NM", paramMap.get("info_link_srv_nm"));
	    //transReq.put("INFO_LINK_SRV_REALM", paramMap.get("info_link_srv_realm"));
	    
	    
	    
	    dataTransferMapper.insertTransDataReq(transReq);
	    
	    paramMap.put("result", transReq);
	    paramMap.put("errCd", 0);
	    paramMap.put("error", "");
	    
	}else {
	    //error
	    paramMap.put("errCd", 500);
	    paramMap.put("error", "Not Found Exception");
	}
	return paramMap;
    }

}
