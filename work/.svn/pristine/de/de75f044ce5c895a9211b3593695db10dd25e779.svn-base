package kostat.lbdms.ServiceAPI.controller.view;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.GuideService;

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
@RequestMapping(value="/view/use/guide")
public class GuideController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(GuideController.class);
	
	@Resource(name="operationGuideService")
	private GuideService operationGuideService;
	
	/**
	 * 이용안내
	 * @param request
	 * @param response
	 * @return guide/guideView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/guideView")
	public ModelAndView guideView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("useGuide/guide/guideView");
	}
	
	/**
	 * 이용안내 - LBDMS 인트로
	 * @param request
	 * @param response
	 * @return guide/guideView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/introView")
	public ModelAndView introView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("useGuide/guide/introView");
	}
	
	/**
	 * 이용안내 - 서비스 소개
	 * @param request
	 * @param response
	 * @return guide/guideView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/serviceView")
	public ModelAndView serviceView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("useGuide/guide/serviceView");
	}
	
	/**
	 * 이용안내 - 사이트맵
	 * @param request
	 * @param response
	 * @return guide/guideView
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/siteMapView")
	public ModelAndView siteMapView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("useGuide/guide/siteMapView");
	}
	
}