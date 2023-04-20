package kostat.lbdms.ServiceAPI.api;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.FaqService;
import kostat.lbdms.ServiceAPI.controller.service.ShareBoardService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 공유게시판 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱 1.0, 2018/07/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/shareboard")
public class ShareBoardAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(ShareBoardAPI.class);
	
	@Autowired
	private ShareBoardService shareService;
	
	/**
	     * 공유데이터 조회
	     * 
	     * @param request
	     * @param response
	     * @return /api/shareboard/getShareBoardList.do
	     */
	@RequestMapping(value="/getShareBoardList.do")
	public ModelAndView getShareBoardList(HttpServletRequest request,HttpServletResponse response , ModelMap model) {
	    
	    Map<String,Object> mapParameter = new HashMap<String,Object>();
	    
	    try {
	    	
	    	HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
	    	
	    	String startIdx = (String) request.getParameter("startIdx");
		    String resultCnt = (String) request.getParameter("resultCnt");
		    String sort = (String) request.getParameter("sort");
		    String order = (String) request.getParameter("order");
		    String standard = request.getParameter("standard");
		    String searchWord = request.getParameter("searchWord");
		    
		    startIdx = Security.cleanXss(startIdx);
		    resultCnt = Security.cleanXss(resultCnt);
		    standard = Security.cleanXss(standard);
		    searchWord = Security.cleanXss(searchWord);
		    sort = Security.cleanXss(sort);
		    order = Security.cleanXss(order);
		    
		    // 시작 인덱스
		    if (startIdx == null) {
		    	startIdx = "0";
		    }

		    // 한페이지당 결과 수
		    if (resultCnt == null) {
		    	resultCnt = "5";
		    }
		    
		    // 정렬 칼럼
		    if (sort != null) {
		    	mapParameter.put("sort", sort);
		    } else {
		    	mapParameter.put("sort", "share_board_no");
		    }
		    // 정렬 방법
		    if (order != null) {
		    	mapParameter.put("order", order);
		    } else {
		    	mapParameter.put("order", "desc");
		    }
		    
		    //검색어
		    if (searchWord != null) {
		    	mapParameter.put("searchWord", searchWord);
		    }
		    
		    //구분
		    if (standard != null) {
		    	mapParameter.put("standard", standard);
		    }
		    
		    mapParameter.put("startIdx", Integer.parseInt(startIdx));
		    mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
		    
		    List<Map<String, Object>> shareDataList;
		    shareDataList = shareService.getShareBoardList(mapParameter);
		    
			model.put("id", "G2G42001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", shareDataList);
	    }
	    catch (AuthorityException e) {
	    	model.put("id", "G2G42001");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
	    }
	    catch (SQLException e) {
			model.put("id", "G2G42001");
			model.put("errCd", "-1");
			model.put("errMsg", "SQL Exception");
	    }
	    catch (Exception e) {
			model.put("id", "G2G42001");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
	    return new ModelAndView("jsonV",model);
	}
	
	/**
     * 공유데이터 댓글 저장
     * 
     * @param request
     * @param response
     * @return /api/shareboard/insertShareBoardReplyInfo.do
     */
	@RequestMapping(value="/insertShareBoardReplyInfo.do")
	public ModelAndView insertShareBoardReplyInfo(HttpServletRequest request,HttpServletResponse response , ModelMap model) {
	    
	    Map<String,Object> mapParameter = new HashMap<String,Object>();
	    
	    try {
	    	
	    	HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				mapParameter.put("user_id", user_id);
			}else {
				throw new AuthorityException ("세션정보가 만료되었습니다.");
			}
	    	
	    	String content = (String) request.getParameter("content");
		    String shareBoardNo = (String) request.getParameter("share_board_no");
		    String targetReplyNo = (String) request.getParameter("target_reply_no");
		    
		    content = Security.cleanXss(content);
		    shareBoardNo = Security.cleanXss(shareBoardNo);
		    targetReplyNo = Security.cleanXss(targetReplyNo);
		    
		    mapParameter.put("content", content);
		    mapParameter.put("share_board_no", Long.parseLong(shareBoardNo));
		    
		    if (targetReplyNo != null) {
		    	mapParameter.put("target_reply_no", Long.parseLong(targetReplyNo));
		    }
		    
		    int res = (int)shareService.insertShareBoardReplyInfo(mapParameter);
		    if (res > 0) {
		    	model.put("id", "G2G42002");
				model.put("errCd", "0");
				model.put("errMsg", "Success");
				model.put("result", res);
		    }else {
		    	throw new AuthorityException("댓글정보를 저장하지 못하였습니다.");
		    }
	
	    }
	    catch (AuthorityException e) {
	    	model.put("id", "G2G42002");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
	    }
	    catch (SQLException e) {
			model.put("id", "G2G42002");
			model.put("errCd", "-1");
			model.put("errMsg", "SQL Exception");
	    }
	    catch (Exception e) {
			model.put("id", "G2G42002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
	    return new ModelAndView("jsonV",model);
	}
	
	/**
     * 공유데이터 댓글 정보를 조회한다.
     * 
     * @param request
     * @param response
     * @return /api/shareboard/getShareBoardReplList.do
     */
	@RequestMapping(value="/getShareBoardReplyList.do")
	public ModelAndView getShareBoardReplyList(HttpServletRequest request,HttpServletResponse response , ModelMap model) {
	    
	    Map<String,Object> mapParameter = new HashMap<String,Object>();
	    
	    try {
		    String shareBoardNo = (String) request.getParameter("share_board_no");
		    String startIdx = (String) request.getParameter("startIdx");
		    String resultCnt = (String) request.getParameter("resultCnt");
		    
		    startIdx = Security.cleanXss(startIdx);
		    resultCnt = Security.cleanXss(resultCnt);
		    shareBoardNo = Security.cleanXss(shareBoardNo);
		    
		    if (shareBoardNo == null) {
		    	throw new AuthorityException("댓글정보를 조회하지 못하였습니다.");
		    }
		    
		 // 시작 인덱스
		    if (startIdx != null) {
		    	mapParameter.put("startIdx", Integer.parseInt(startIdx));
		    }else {
		    	mapParameter.put("startIdx", 0);
		    }

		    // 한페이지당 결과 수
		    if (resultCnt != null) {
		    	 mapParameter.put("resultCnt", Integer.parseInt(resultCnt));
		    }else {
		    	mapParameter.put("resultCnt", 999999999);
		    }
		    
		    mapParameter.put("share_board_no", Long.parseLong(shareBoardNo));
		    List replyList = (List)shareService.getShareBoardReplyList(mapParameter);
		    model.put("id", "G2G42003");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", replyList);
	
	    }
	    catch (AuthorityException e) {
	    	model.put("id", "G2G42003");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
	    }
	    catch (SQLException e) {
			model.put("id", "G2G42003");
			model.put("errCd", "-1");
			model.put("errMsg", "SQL Exception");
	    }
	    catch (Exception e) {
			model.put("id", "G2G42002");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
	    return new ModelAndView("jsonV",model);
	}
	
	/**
     * 공유데이터 댓글 정보를 삭제한다.
     * 
     * @param request
     * @param response
     * @return /api/shareboard/deleteShareBoardReplyInfo.do
     */
	@RequestMapping(value="/deleteShareBoardReplyInfo.do")
	public ModelAndView deleteShareBoardReplyInfo(HttpServletRequest request,HttpServletResponse response , ModelMap model) {
	    
	    Map<String,Object> mapParameter = new HashMap<String,Object>();
	    
	    try {
		    String shareBoardNo = (String) request.getParameter("share_board_no");
		    String replyNo = (String) request.getParameter("reply_no");
		    
		    replyNo = Security.cleanXss(replyNo);
		    shareBoardNo = Security.cleanXss(shareBoardNo);
		    
		    if (shareBoardNo == null) {
		    	throw new AuthorityException("댓글정보를 삭제하지 못하였습니다.");
		    }
		    
		    if (replyNo == null) {
		    	throw new AuthorityException("댓글정보를 삭제하지 못하였습니다.");
		    }
   
		    mapParameter.put("share_board_no", Long.parseLong(shareBoardNo));
		    mapParameter.put("reply_no", Long.parseLong(replyNo));
		    int result = (int)shareService.deleteShareBoardReplyInfo(mapParameter);
		    
		    model.put("id", "G2G42004");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", result);
	
	    }
	    catch (AuthorityException e) {
	    	model.put("id", "G2G42004");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
	    }
	    catch (SQLException e) {
			model.put("id", "G2G42004");
			model.put("errCd", "-1");
			model.put("errMsg", "SQL Exception");
	    }
	    catch (Exception e) {
			model.put("id", "G2G42004");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
	    return new ModelAndView("jsonV",model);
	}
	
	/**
     * 공유데이터 정보를 삭제한다.
     * 
     * @param request
     * @param response
     * @return /api/shareboard/deleteShareBoardInfo.do
     */
	@RequestMapping(value="/deleteShareBoardInfo.do")
	public ModelAndView deleteShareBoardInfo(HttpServletRequest request,HttpServletResponse response , ModelMap model) {
	    
	    Map<String,Object> mapParameter = new HashMap<String,Object>();
	    
	    try {
		    String shareBoardNo = (String) request.getParameter("share_board_no");
		    shareBoardNo = Security.cleanXss(shareBoardNo);
		    
		    if (shareBoardNo == null) {
		    	throw new AuthorityException("공유게시판 정보를 삭제하지 못하였습니다.");
		    }
   
		    String resource_id = (String) request.getParameter("resource_id");
		    resource_id = Security.cleanXss(resource_id);
		    
		    mapParameter.put("type", "all");
		    mapParameter.put("share_board_no", Long.parseLong(shareBoardNo));
		    mapParameter.put("resource_id", Long.parseLong(resource_id));
		    int result = (int)shareService.deleteShareBoardReplyInfo(mapParameter);
		    /*if (result > 0) {
		    	shareService.deleteShareBoardInfo(mapParameter);
		    	shareService.updateResourceShareInfo(mapParameter); //resource 테이블 공유정보 업데이트
		    }*/
		    
		    shareService.deleteShareBoardInfo(mapParameter);
	    	shareService.updateResourceShareInfo(mapParameter); //resource 테이블 공유정보 업데이트
		    
		    
		    model.put("id", "G2G42005");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", result);
	
	    }
	    catch (AuthorityException e) {
	    	model.put("id", "G2G42005");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
	    }
	    catch (SQLException e) {
			model.put("id", "G2G42005");
			model.put("errCd", "-1");
			model.put("errMsg", "SQL Exception");
	    }
	    catch (Exception e) {
			model.put("id", "G2G42005");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
	    return new ModelAndView("jsonV",model);
	}
	
	/**
     * 공유데이터 정보를 삭제한다.
     * 
     * @param request
     * @param response
     * @return /api/shareboard/updateRecmdShareBoardInfo.do
     */
	@RequestMapping(value="/updateRecmdShareBoardInfo.do")
	public ModelAndView updateRecmdShareBoardInfo(HttpServletRequest request,HttpServletResponse response , ModelMap model) {
	    
	    Map<String,Object> mapParameter = new HashMap<String,Object>();
	    
	    try {
		    String shareBoardNo = (String) request.getParameter("share_board_no");
		    shareBoardNo = Security.cleanXss(shareBoardNo);
		    
		    if (shareBoardNo == null) {
		    	throw new AuthorityException("공유게시판 정보를 추천하지 못하였습니다.");
		    }
   
		    mapParameter.put("no", Long.parseLong(shareBoardNo));
		    int result = (int)shareService.updateRecmdCnt(mapParameter);

		    model.put("id", "G2G42006");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", result);
	
	    }
	    catch (AuthorityException e) {
	    	model.put("id", "G2G42006");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
	    }
	    catch (SQLException e) {
			model.put("id", "G2G42006");
			model.put("errCd", "-1");
			model.put("errMsg", "SQL Exception");
	    }
	    catch (Exception e) {
			model.put("id", "G2G42006");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
	    return new ModelAndView("jsonV",model);
	}
	
	/**
     * 공유데이터 정보를 업데이트한다.
     * 
     * @param request
     * @param response
     * @return /api/shareboard/updateShareBoardInfo.do
     */
	@RequestMapping(value="/updateShareBoardInfo.do")
	public ModelAndView updateShareBoardInfo(HttpServletRequest request,HttpServletResponse response , ModelMap model) {
	    
	    Map<String,Object> mapParameter = new HashMap<String,Object>();
	    
	    try {
		    String shareBoardNo = (String) request.getParameter("share_board_no");
		    String content = (String) request.getParameter("content");
		    
		    shareBoardNo = Security.cleanXss(shareBoardNo);
		    content = Security.cleanXss(content);
		    
		    if (shareBoardNo == null) {
		    	throw new AuthorityException("공유게시판 정보를 수정하지 못하였습니다.");
		    }
		    
		    if (content == null) {
		    	throw new AuthorityException("공유게시판 정보를 수정하지 못하였습니다.");
		    }
   
		    mapParameter.put("no", Long.parseLong(shareBoardNo));
		    mapParameter.put("content", content);
		    int result = (int)shareService.updateShareBoardInfo(mapParameter);

		    model.put("id", "G2G42007");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", result);
	
	    }
	    catch (AuthorityException e) {
	    	model.put("id", "G2G42007");
			model.put("errCd", "-1");
			model.put("errMsg", e.getMessage());
	    }
	    catch (SQLException e) {
			model.put("id", "G2G42007");
			model.put("errCd", "-1");
			model.put("errMsg", "SQL Exception");
	    }
	    catch (Exception e) {
			model.put("id", "G2G42007");
			model.put("errCd", "-1");
			model.put("errMsg", "처리 중 에러가 발생하였습니다.");
			logger.info(e);
		} 
	    return new ModelAndView("jsonV",model);
	}
}