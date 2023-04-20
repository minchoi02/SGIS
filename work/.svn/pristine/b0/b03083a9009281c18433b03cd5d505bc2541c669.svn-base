package kostat.lbdms.ServiceAPI.controller.service;

import java.sql.SQLException;
import java.util.Map;

import org.json.JSONObject;



/**
 * @Class Name : DataTransferService.java
 * @Description : DataTransferService Class
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2015.10.21           최초생성
 *
 * @author SGIS+ 개발팀
 * @since 2015. 10.21
 * @version 1.0
 * @see
 *
 *  Copyright (C) by NeighborSystem All right reserved.
 */
public interface DataTransferService {
	/**전송체크
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Map<String,Object> checkTransfer(Map<String , Object> paramMap)throws SQLException;
	
	/** reqTransfer 전손요청
	 * @param String resource_id , JSONObject data
	 * @return
	 * @throws SQLException
	 */
	public Map<String,Object> reqTransfer(String resource_id , JSONObject data , String user_id,String user_nm)throws SQLException;
	
	
	/** SGIS 전송 취소 cancelReqTransfer
	 * @param Map<String,Object> paraMap
	 * @return
	 * @throws SQLException
	 */
	public Map<String,Object> cancelReqTransfer(Map<String,Object> paramMap) throws SQLException;
	
	/** SGIS 전송 재요청 retryReqTransfer
	 * @param Map<String,Object> paraMap
	 * @return
	 * @throws SQLException
	 */
	public Map<String,Object> retryReqTransfer(Map<String,Object> paramMap) throws SQLException;
	
	
	
}
