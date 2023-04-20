package kostat.lbdms.ServiceAPI.api;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.web.core.AjaxResponse;
import kostat.lbdms.ServiceAPI.common.web.model.DenseAnalysis;
import kostat.lbdms.ServiceAPI.controller.service.DenseAnalysisService;
import kostat.lbdms.ServiceAPI.controller.service.LocalSpaceSelfAnalysisService;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
@Interceptor("CallLogger")
@RequestMapping("/api/my/dense")
public class DenseAnalysisAPI {
	private static final Logger logger = LoggerFactory.getLogger(DenseAnalysisAPI.class);
	
	@Resource(name = "denseAnalysisService")
	private DenseAnalysisService denseAnalysisService;
	
	@Resource(name = "localSpaceSelfAnalysisService")
	private LocalSpaceSelfAnalysisService localSpaceSelfAnalysisService;
	
	/**
	 * <pre>
	 * 군집/밀집 분석 
	 * </pre> 
			
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/analyzeDense.do", method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	public AjaxResponse<JSONObject> analyzeDense(
			@ModelAttribute DenseAnalysis denseAnalysis,
			HttpServletRequest request, HttpServletResponse response) {		
		
		logger.info("== 밀집 분석  ==");
		
		DenseAnalysis iQryCond = new DenseAnalysis();  
		AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
		JSONObject res = new JSONObject();
		JSONArray condition_list = new JSONArray();
		
		try{

			iQryCond = denseAnalysis;
			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
			String condition = iQryCond.getCondition();
			
			
			if (userid.equals("") || userdiv.equals("")) {
				result.setReason("세션이 종료되었습니다.");
				result.setSuccess(false);
				return result;
			} else {
				iQryCond.setUserid(userid);
				iQryCond.setUserdiv(userdiv);
			}


			// 2017.07.18 ischoi 추가
			if (iQryCond.getData_table_schema() == null) {
				iQryCond.setData_table_schema(userid);
			}
			
			if (condition != null && !condition.isEmpty()) {
				condition_list = JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
			}
			
			res = denseAnalysisService.denseAnalysis(iQryCond, condition_list);
			
			if( "SUCCESS".equals( res.getString("RESULT") )){
				result.setSuccess(true);
			} else if("DUPLICATE".equals( res.getString("RESULT") )){
				result.setReason("DB에 테이블이 존재합니다. 다시 입력해주세요.");
				result.setSuccess(false);
			} else {
				result.setReason("데이터처리를 실패하였습니다.");
				result.setSuccess(false);
			}
			
			result.setData(res);

		} catch(SystemFailException e){
			result.setSuccess(false);
			if (e.getMessage().indexOf("겹치는") >= 0) {
				result.setReason("dbl");
			} else if (e.getMessage().indexOf("단일 데이터") >= 0) {
				result.setReason("single");				
			} else {
				result.setReason( e.getMessage() );
			}
			logger.info(e.getMessage());	
		} catch (Exception ex) {
			result.setSuccess(false);
			result.setReason("데이터처리 오류입니다");
			logger.info(ex.getMessage());
		}
		return result;
		
	}
	 
	/**
	 * <pre>
	 * 공간자기상관분석
	 * </pre>
	 * @param denseAnalysis
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/spaceSelfAnalysis.do", method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	public AjaxResponse<JSONObject> spaceSelfAnalysis(
			@ModelAttribute DenseAnalysis denseAnalysis,
			HttpServletRequest request, HttpServletResponse response) throws Exception {		
		
		logger.info("== 공간자기상관 분석  ==");
		
		AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
		
			
			JSONArray condition_list = new JSONArray();
			
			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
			String condition = denseAnalysis.getCondition();
			
			
			if (userid.equals("") || userdiv.equals("")) {
				
				result.setReason("세션이 종료되었습니다.");
				result.setSuccess(false);
				
				return result;
				
			} else {
				
				denseAnalysis.setUserid(userid);
				denseAnalysis.setUserdiv(userdiv);
				
			}

			if (condition != null && !condition.isEmpty()) {
				condition_list = JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
			}
			
			JSONObject res = null;
			try {
				res = denseAnalysisService.spaceSelfAnalysis(denseAnalysis, condition_list);
			} catch (SystemFailException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			if(res.getString("MESSAGE").equals("SUCCESS")){
				result.setSuccess(true);
			} else {

				if (result.getReason() == null) {
					result.setReason("데이터처리를 실패하였습니다.");
				}
				result.setSuccess(false);
			} 
			
			
			result.setData( res );
		
		
		return result;
		
	}
	
	/**
	 * <pre>
	 * 공간자기상관분석
	 * </pre>
	 * @param denseAnalysis
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/localSpaceSelfAnalysis.do", method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	public AjaxResponse<JSONObject> localSpaceSelfAnalysis(
			@ModelAttribute DenseAnalysis denseAnalysis,
			HttpServletRequest request, HttpServletResponse response) {		
		
		logger.info("== 공간자기상관 분석  ==");
		
		AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
		
			
			JSONArray condition_list = new JSONArray();
			
			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
			String condition = denseAnalysis.getCondition();
			
			
			if (userid.equals("") || userdiv.equals("")) {
				
				result.setReason("세션이 종료되었습니다.");
				result.setSuccess(false);
				
				return result;
				
			} else {
				
				denseAnalysis.setUserid(userid);
				denseAnalysis.setUserdiv(userdiv);
				
			}

			if (condition != null && !condition.isEmpty()) {
				condition_list = JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
			}
			
			JSONObject res = null;
			try {
				res = localSpaceSelfAnalysisService.analyze(denseAnalysis, condition_list);
			} catch (SystemFailException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			if(res.getString("MESSAGE").equals("SUCCESS")){
				result.setSuccess(true);
			} else {

				if (result.getReason() == null) {
					result.setReason("데이터처리를 실패하였습니다.");
				}
				result.setSuccess(false);
			} 
			
			
			result.setData( res );
		
		
		return result;
		
	}
	
	/**
	 * <pre>
	 * 보로노이 분석
	 * </pre>
	 * @param denseAnalysis
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/voronoiAnalysis.do", method = RequestMethod.POST, produces="application/json")
	@ResponseBody
	public AjaxResponse<JSONObject> voronoiAnalysis(
			@ModelAttribute DenseAnalysis denseAnalysis,
			HttpServletRequest request, HttpServletResponse response) throws Exception {		
		
		logger.info("== 보로노이 분석  ==");
		
		AjaxResponse<JSONObject> result = new AjaxResponse<JSONObject>();
		
			
			JSONArray condition_list = new JSONArray();
			
			HttpSession session = request.getSession();
			String userid = (String) session.getAttribute("user_id");
			String userdiv = (String) session.getAttribute("user_div");
			String condition = denseAnalysis.getCondition();
			
			
			if (userid.equals("") || userdiv.equals("")) {
				
				result.setReason("세션이 종료되었습니다.");
				result.setSuccess(false);
				
				return result;
				
			} else {
				
				denseAnalysis.setUserid(userid);
				denseAnalysis.setUserdiv(userdiv);
				
			}

			if (condition != null && !condition.isEmpty()) {
				condition_list = JSONArray.fromObject(condition.replaceAll(System.getProperty("line.separator"), ""));
			}
			
			JSONObject res = null;
			try {
				res = denseAnalysisService.voronoiAnalysis(denseAnalysis, condition_list);
			} catch (SystemFailException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
			if(res.getString("MESSAGE").equals("SUCCESS")){
				result.setSuccess(true);
			} else {

				if (result.getReason() == null) {
					result.setReason("데이터처리를 실패하였습니다.");
				}
				result.setSuccess(false);
			} 
			
			
			result.setData( res );
		
		
		return result;
		
	}
}
