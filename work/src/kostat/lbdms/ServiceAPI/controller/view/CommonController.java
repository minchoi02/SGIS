package kostat.lbdms.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.CommonService;

/**
 * 1. 기능 : 메인 화면 컨트롤러.<p>
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
@RequestMapping(value="/view/common")
public class CommonController {
	private final Log logger = LogFactory.getLog(CommonController.class);
	
	@Resource(name="commonService")
	private CommonService commonService;
	
	/**
	 * 상단 Header
	 * @param request
	 * @param response
	 * @return common/includeHeader
	 */
	@RequestMapping(value="/includeHeader")
	public ModelAndView includeHeader(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		HttpSession session = request.getSession();
		String user_id = (String)session.getAttribute("user_id");
		String user_nm = (String)session.getAttribute("user_nm");
		String user_div = (String)session.getAttribute("user_div");
		
		if (user_id != null) {
			model.addAttribute("user_id", user_id);
			model.addAttribute("user_nm", user_nm);
			model.addAttribute("user_div", user_div);
		}
		return new ModelAndView("common/includeHeader");
	}
	
	/**
	 * 하단 Footer
	 * @param request
	 * @param response
	 * @return common/includeFooter
	 */
	@RequestMapping(value="/includeFooter")
	public ModelAndView includeFooter(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/includeBottom");
	}

	
	/**
	 * 하단 Footer
	 * @param request
	 * @param response
	 * @return common/includeFooter
	 */
	@RequestMapping(value="/includeFooterNew")
	public ModelAndView includeFooterNew(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/includeBottomNew");
	}
	
	/**
	 * 
	 * @param request
	 * @param response
	 * @return common/includeFooter
	 */
	@RequestMapping(value="/commonDataView")
	public ModelAndView commonDataView(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("common/commonDataView");
	}
}