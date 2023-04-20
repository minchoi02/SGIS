package kostat.lbdms.ServiceAPI.api;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.DataTransferService;
import kostat.lbdms.ServiceAPI.controller.service.MemberService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataService;

/**
 * 1. 기능 : DataTransferController 컨트롤러
 * <p>
 * 2. 처리개요 :
 * <p>
 * 3. 주의사항 : SGIS 전송 기능 관리
 * <p>
 * 
 * <pre>
 *  <b>History:</b> 
 *     작성자 : 최재영, 1.0, 2018/10/24  초기 작성
 * </pre>
 * 
 * @author 최종 수정자 : 최재영
 * @version 1.0
 * @see
 *      <p/>
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value = "/api/dataTransfer")
public class DataTransferAPI {
    private final Log logger = LogFactory.getLog(DataTransferAPI.class);

    @Resource(name = "myDataService")
    private MyDataService myDataService;

    @Resource(name = "memberService")
    private MemberService memberService;

    @Resource(name = "dataTransferService")
    private DataTransferService dataTransferService;

    /**
     * SGIS 상태 체크
     * 
     * @param request
     * @param response
     * @return /view/dataTransfer/myDataCreate
     */
    @RequestMapping(value = "/checkTransfer.do", method = { RequestMethod.GET,
	    RequestMethod.POST }, produces = "application/json")
    @ResponseBody
    public Map checkTransfer(HttpServletRequest request, HttpServletResponse response) {
	Map<String, Object> returnMap = new HashMap<String, Object>();
	Map<String, Object> paramMap = new HashMap<String, Object>();

	paramMap.put("resource_id", request.getParameter("resource_id"));
	paramMap.put("user_id", request.getParameter("user_id"));

	try {
	    Map<String, Object> resourceInfo = myDataService.searchMyDataInfo(paramMap);
	    paramMap.put("data_nm", resourceInfo.get("data_nm").toString());

	    Map<String, Object> checkMap = dataTransferService.checkTransfer(paramMap);

	    /*
	     * if(cnt > 0) { String status = checkMap.get("status").toString();
	     * returnMap.put("status", status); }else { returnMap.put("status", "none"); }
	     */
	    returnMap.put("errCd", 0);
	    returnMap.put("info", checkMap);
	    returnMap.put("resource", resourceInfo);
	} catch (SQLException e) {
	    returnMap.put("errCd", 500);
	    returnMap.put("error", e);
	    logger.error(e);
	}
	return returnMap;

    }

    /**
     * SGIS 전송 요청
     * 
     * @param request
     * @param response
     * @return /view/dataTransfer/reqTransfer
     */
    @RequestMapping(value = "/reqTransfer.do", method = { RequestMethod.GET,
	    RequestMethod.POST }, produces = "application/json")
    @ResponseBody
    public Map<String, Object> reqTransfer(HttpServletRequest request, HttpServletResponse response) {

	HttpSession session = request.getSession();
	Map<String, Object> returnMap = new HashMap<String, Object>();
	// 현재 이름은 설정 되어 있지 않는거 같음
	String user_id = (String) session.getAttribute("user_id");
	String user_nm = user_id;
	try {
	    String resource_id = request.getParameter("resource_id");
	    JSONObject data = new JSONObject(request.getParameter("data"));
	    returnMap = dataTransferService.reqTransfer(resource_id, data, user_id, user_nm);
	    returnMap.put("errCd", 0);
	} catch (JSONException | SQLException e) {
	    returnMap.put("errCd", 500);
	    returnMap.put("error", e);
	    logger.error(e);
	}

	return returnMap;
    }

    /**
     * SGIS 전송 취소
     * 
     * @param request
     * @param response
     * @return /view/dataTransfer/cancelReqTransfer
     */
    @RequestMapping(value = "/cancelReqTransfer.do", method = { RequestMethod.GET,
	    RequestMethod.POST }, produces = "application/json")
    public ModelAndView cancelReqTransfer(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
	Map<String, Object> paramMap = new HashMap<String, Object>();
	HttpSession session = request.getSession();
	String user_id = (String) session.getAttribute("user_id");

	paramMap.put("user_id", user_id);
	paramMap.put("resource_id", request.getParameter("resource_id"));
	paramMap.put("data_nm", request.getParameter("data_nm"));
	paramMap.put("procs_state_cd", "RET");
	
	try {
	    Map returnMap = dataTransferService.cancelReqTransfer(paramMap);
	    model.put("errCd" , returnMap.get("errCd").toString());
	    model.put("error" , returnMap.get("error").toString());
	} catch (SQLException e) {
	    model.put("errCd", 500);
	    model.put("error", e);
	}
	return new ModelAndView("jsonV", model);
    }

    /**
     * SGIS 전송 재요청
     * 
     * @param request
     * @param response
     * @return /view/dataTransfer/retryReqTransfer
     */
    @RequestMapping(value = "/retryReqTransfer.do", method = { RequestMethod.GET,
	    RequestMethod.POST }, produces = "application/json")
    public ModelAndView retryReqTransfer(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
	Map<String, Object> paramMap = new HashMap<String, Object>();
	HttpSession session = request.getSession();
	String user_id = (String) session.getAttribute("user_id");

	paramMap.put("user_id", user_id);
	paramMap.put("resource_id", request.getParameter("resource_id"));
	try {
	    JSONObject data = new JSONObject(request.getParameter("data"));
	    Map<String, Object> returnMap = dataTransferService.reqTransfer(request.getParameter("resource_id").toString(),data,user_id,user_id);
	    model.put("errCd", 0);
	    model.put("result", returnMap);
	} catch (SQLException e) {
	    model.put("errCd", 500);
	    model.put("error", e);
	} catch (JSONException e) {
	    model.put("errCd", 500);
	    model.put("error", e);
	}
	return new ModelAndView("jsonV", model);
    }

}
