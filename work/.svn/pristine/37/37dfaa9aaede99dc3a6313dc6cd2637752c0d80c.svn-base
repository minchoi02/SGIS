package kostat.lbdms.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.List;
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
import kostat.lbdms.ServiceAPI.common.security.AES128util;
import kostat.lbdms.ServiceAPI.common.security.Security;
import kostat.lbdms.ServiceAPI.controller.service.MainService;
import kostat.lbdms.ServiceAPI.controller.service.MyDataService;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

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
public class MainController {
	private final Log logger = LogFactory.getLog(MainController.class);
	
	@Resource(name="mainService")
	private MainService mainService;
	
	@Resource(name="myDataService")
	private MyDataService myDataService;
	
	/**
	 * 메인화면
	 * @param request
	 * @param response
	 * @return index
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/index")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("prjMng/prjSet");
	    //return new ModelAndView("mainHome");
	}
	
	/**
	 * 메인이동
	 * @param request
	 * @param response
	 * @return index
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/main/{code}",method = { RequestMethod.GET,RequestMethod.POST })
	public ModelAndView pageController(HttpServletRequest request, HttpServletResponse response,ModelAndView mav,@PathVariable("code") String code) {
	    
	    //메뉴 이름
	    //서브메뉴 여부
	    //사용자 정보
	    System.out.println("code = " + code);
	    mav.setViewName("/main/"+code);
	    return mav;
	}
	
	
	/**
	 * 메뉴 가져오기
	 * @param request
	 * @param response
	 * @return index
	 */
	@Interceptor("PageCallReg")
	@RequestMapping(value="/view/menu/{code}",method = { RequestMethod.GET,RequestMethod.POST })
	public ModelAndView getMenu(HttpServletRequest request, HttpServletResponse response,ModelAndView mav,@PathVariable("code") String code) {
	    
	    //메뉴 이름
	    //서브메뉴 여부
	    //사용자 정보
	    System.out.println("code = " + code);
	    mav.setViewName("/menu/"+code);
	    return mav;
	}
	
}