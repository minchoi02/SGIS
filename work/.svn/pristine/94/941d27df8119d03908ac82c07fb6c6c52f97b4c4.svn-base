package kostat.lbdms.ServiceAPI.controller.view;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.controller.service.AuthentionService;

/**
 * <pre>
 * 사용자/계정 접속관리 contorller
 * </pre>
 *
 * @version 1.0
 * @author Admin
 * @see <pre>
 *  ==========  개정이력( Modification Information )  ==========
 *
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2018.06.27.      Admin				        최초생성
 *
 * </pre>
 * @since 2018.06.27
 */
@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/auth")
public class AuthentionController {
	
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(AuthentionController.class);
		 
	public static Hashtable<String, Object> loginUsers = new Hashtable<String, Object>();
	
	@Resource(name="authentionService")
	private AuthentionService authentionService;
	

	@RequestMapping(value="/login")
	public ModelAndView Login(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("account/login");
	}
	
	@RequestMapping(value="/logout")
	public ModelAndView Logout(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		try {
			HttpSession session = request.getSession();
			String user_id = (String)session.getAttribute("user_id");
			if (user_id != null) {
				//회원이력저장
				//회원이력저장
				long history_no = (long)session.getAttribute("history_no");
				Map mapParameter = new HashMap();
				mapParameter.put("user_id", user_id);
				mapParameter.put("history_no", history_no);
				authentionService.updateLoginHistory(mapParameter);
				
				// 세션내역 삭제
				session.removeAttribute("user_id");		//아이디
				session.removeAttribute("coderw");		//비밀번호
				session.removeAttribute("user_nm");		//이름
				session.removeAttribute("user_div");	//회원등급
				session.removeAttribute("access_session_id");
	            synchronized (loginUsers) {
	                loginUsers.remove(user_id);
	            }
	            
	            response.sendRedirect(request.getContextPath() + "/auth/login");
			}
		} catch (Exception e) {
			logger.info(e);
		}
		
		return new ModelAndView("account/login");
	}
	
	@RequestMapping(value="/terms")
	public ModelAndView TermsOfUse(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("account/termsOfUse");
	}
	
	@RequestMapping(value="/signUp")
	public ModelAndView SignUp(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			List<Map> institutionList = (List)authentionService.getInstitutionList(mapParameter);
			model.addAttribute("institutionList", institutionList);
		} catch (Exception e) {
			logger.error(e);
		}
		return new ModelAndView("account/signUp", model);
	}
	
	@RequestMapping(value="/findIdAndPwd")
	public ModelAndView FindIdAndPwd(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		return new ModelAndView("account/findIdAndPwd");
	} 
}
