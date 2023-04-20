package kostat.sop.ServiceAPI.api.board;


import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.security.Security;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**
 * 1. 기능 : 예제.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : j.h.Seok, 1.0, 2014/08/20  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : j.h.Seok
 * @version 1.0
 * @see
 * <p/>
 */
public class BoardListsView extends AbsQuery<Map> {
	private static final Log logger = LogFactory.getLog(BoardListsView.class);
	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "8014";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		post_no,
		board_cd
	}
	
	enum OptionParam
	{
		
	}
	
	
	@Override
	public Map executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		Map resultData = new HashMap();
		
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			String id = (String)httpSession.getAttribute("member_id");
		

			String CharList = "()='[]:,*/";
			
			
			
			//20190530	크로스 사이트 스크립트 오류 방지 start leekh
			String postNo1 = req.getParameter("post_no");
			String boardCd = req.getParameter("board_cd");
			
			/*String dValue1 = URLDecoder.decode(postNo1, Charset.defaultCharset().name());
			String dValue2 = URLDecoder.decode(boardCd, Charset.defaultCharset().name());
			
			for(char c : dValue1.toCharArray()){
				if(CharList.indexOf(c) != -1){
					throw new ApiException("입력값을 체크 해 주세요");
				}
			}
			for(char c : dValue2.toCharArray()){
				if(CharList.indexOf(c) != -1){
					throw new ApiException("입력값을 체크 해 주세요");
				}
			}*/
			
			/*
			postNo1 = postNo1.replaceAll("<", "&lt;");
			postNo1 = postNo1.replaceAll(">", "&gt;");
			postNo1 = postNo1.replaceAll("&", "&amp;");
			postNo1 = postNo1.replaceAll("\"", "&quot;");
			
			boardCd = boardCd.replaceAll("<", "&lt;");
			boardCd = boardCd.replaceAll(">", "&gt;");
			boardCd = boardCd.replaceAll("&", "&amp;");
			boardCd = boardCd.replaceAll("\"", "&quot;");
			*/
			//mng_s 20190614 보안조치
			postNo1 = Security.cleanXss(postNo1);
			boardCd = Security.cleanXss(boardCd);
			
			
			//20190530	크로스 사이트 스크립트 오류 방지 end leekh
			
			mapParameter.put("post_no", postNo1);
			mapParameter.put("board_cd", boardCd);
			

			
			
			List summaryList = (List) session.selectList("board.boardListsView", mapParameter);
			
			for(int i = 0; i < summaryList.size(); i++) {
				Map tempMap = (Map)summaryList.get(i);
//				String postNo = Integer.toString((Integer)tempMap.get("post_no"));
				String postNo = postNo1;
				
				//mng_s 20200511 게시판에서 수정/삭제 버튼을 보이게 하는 플래그
				String beforeSecuId = (String)tempMap.get("reg_member_id");
				if(id != null && beforeSecuId != null && beforeSecuId.equals(id)) {
					tempMap.put("modifyMode", true);
				} else {
					tempMap.put("modifyMode", false);
				}
				
				//20190801 leekh 정보노출 안되게 조치 start
				if(tempMap.get("reg_member_id") != null){
				String reg_member_id = tempMap.get("reg_member_id").toString();
					String temp_reg_member_id = "";
					for(int j=0; j<reg_member_id.length(); j++){
						if(j == 0){
							temp_reg_member_id += reg_member_id.substring(0,1);
						}else if(j !=0 && j != reg_member_id.length()-1){
							temp_reg_member_id += "*";
						}else{
							temp_reg_member_id += reg_member_id.substring(reg_member_id.length()-1,reg_member_id.length());
						}
					}
					tempMap.put("reg_member_id", temp_reg_member_id);
				}
				//20190801 leekh 정보노출 안되게 조치 end
				
				Map tempParam = new HashMap();
				tempParam.put("board_cd", (String) mapParameter.get(MustParam.board_cd.name()));
				tempParam.put("post_no", postNo);
				
				List listReplies = (List) session.selectList("board.boardListsReply", tempParam);
				
				tempMap.put("reply", listReplies);
				
				String regId = (String)tempMap.get("reg_member_id");
				
				//logger.debug("id [" + id + "]    regId [" + regId + "]    id != null && regId != null && regId.equals(id) [" + id != null && regId != null && regId.equals(id));
				logger.debug("id [" + id + "]    regId [" + regId + "] ");
				
				
			}
			
			resultData.put("summaryList", summaryList);
		
			logger.info("END Query - TXID[" + getApiId() + "] ");
		}catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return resultData;
	}
}