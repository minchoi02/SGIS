package kostat.lbdms.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.GuideService;
import kostat.lbdms.ServiceAPI.exception.AuthFailedException;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 회원 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱, 김성현, 1.0, 2015/09/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/view/use")
public class UseGuideController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(UseGuideController.class);
	
	@Resource(name="operationGuideService")
	private GuideService operationGuideService;

	/**
	 * 이용안내 메인
	 * @param request
	 * @param response
	 * @return guide/guideMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/guideMain")
	public ModelAndView guideMain(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("useGuide/useGuideMain");
	}
	
	/**
	 * 이용안내 메인
	 * @param request
	 * @param response
	 * @return guide/guideMain
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/guideMain/{type}")
	public ModelAndView guideMainForType(@PathVariable String type,HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		type = Security.cleanXss(type);
		
		if (type == null || 
		   !type.equals("notice") && !type.equals("faq") &&
		   !type.equals("qna") && !type.equals("guide")) {
			return new ModelAndView("common/errorCode");
		}
		
		model.addAttribute("type", type);
		
		return new ModelAndView("useGuide/useGuideMain");
	}

	/**
	 * 사용자관리 리스트
	 * @param request
	 * @param response
	 * @return userMng
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/userSdcMng")
	public ModelAndView userSdcMng(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/userSdcMng");
	}	

	
	/**
	 * 사용자관리 상세
	 * @param request
	 * @param response
	 * @return userView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/userSdcMngEdit")
	public ModelAndView userSdcView(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("sysmgt/userSdcMngEdit");
	}	
}