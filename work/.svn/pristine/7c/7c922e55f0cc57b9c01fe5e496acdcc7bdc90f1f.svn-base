package kostat.lbdms.ServiceAPI.controller.view;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
//import kostat.lbdms.ServiceAPI.controller.service.FaqService;
import kostat.lbdms.ServiceAPI.controller.service.MetaMngService;

/**
 * 1. 기능 : 프로젝트 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 최인섭
 *  </pre>
 *  
 * @author 최종 수정자 : 최인섭, 최은총
 * @version 1.0
 * @see
 * <p/>
 */

@Controller("/metamng")
@Interceptor("CallLogger")
@RequestMapping(value="/view/metaMng")
public class MetaMngController {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(MetaMngController.class);
	
	/* @Resource(name="metamngService")
	private MetaMngService  metamngService;
	*/	
	
	@Resource(name="metaMngService")
	//private FaqService faqService;
	private MetaMngService metaMngService;
	/**
	 * 업무자동화 설정
	 * @param request
	 * @param response
	 * @return workSet
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/metaWordList")
	public ModelAndView metaWordList(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("metaMng/metaWordList");
	}
	
}