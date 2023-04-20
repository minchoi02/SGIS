package egovframework.sgis.m2020.login.web;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.sgis.m2019.login.service.mapper.kairos.LoginMapper;
import egovframework.sgis.m2020.login.service.LoginViewService;

/**
 * @Class Name  : LoginViewController.java
 * @Description : 지역현안 소통지도 로그인 컨트롤러
 * @Modification Information
 *
 *     수정일         수정자                   수정내용
 *     -------          --------        ---------------------------
 *   2020.08.31  박은식                최초 생성
 *
 * @since 2020.08.31
 * @version 1.0
 * @see
 *
 */

@Controller
public class LoginViewController {
	
	@Resource(name = "loginViewService")
	private LoginViewService loginViewService;
	
	@Resource(name="loginMapper")
	private LoginMapper loginMapper;
	
	//로그인 화면
	@RequestMapping(value = "/m2020/login/login.sgis", method = RequestMethod.GET)
	public String login(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null && !"anonymousUser".equals(auth.getName())) {
			return "redirect:/m2020/login/loginInfoMap.sgis";			
		}
		model.put("params", params);
		return "/m2020/login/login";
	}
	
	//로그인 후 화면
	@RequestMapping(value = "/m2020/login/loginInfoMap.sgis", method = RequestMethod.GET)
	public String loginInfo(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		//로그인 안되어있으면 로그인 페이지로 이동
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth == null || "anonymousUser".equals(auth.getName())) {
			return "redirect:/m2020/login/login.sgis";
		}

		//사용자 정보 조회
		params.put("member_id", auth.getName());
		Map<String,Object> member_info = loginMapper.selectSrvDtMemberinfo(params);
		model.put("member_info", member_info);
		
		model.put("params", params);
		return "m2020/login/loginInfoMap";
	}
		
	//로그인 처리
	@RequestMapping(value="/m2020/login/loginprocess.sgis")
	public String loginprocess(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		System.out.println(params.get("POI_ID")+"<<<<<<<<<<<<<<<<<<<<<<<");
		System.out.println(request.getParameter("POI_ID")+"<<<<<<<<<<<<<<<<<<<<<<<");
		return loginViewService.loginProcess(request, response, params);
	}	
	
}
