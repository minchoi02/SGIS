package egovframework.sgis.m2019.login.web;

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

import egovframework.sgis.m2019.login.service.LoginService;
import egovframework.sgis.m2019.login.service.mapper.kairos.LoginMapper;

@Controller
public class LoginController {

	@Resource(name = "loginService")
	private LoginService loginService;
	
	@Resource(name="loginMapper")
	private LoginMapper loginMapper;
	
	//로그인 화면
	@RequestMapping(value = "/m2019/login/login.sgis", method = RequestMethod.GET)
	public String login(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		//로그인 되어있으면 로그인 후 화면으로 이동
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null && !"anonymousUser".equals(auth.getName())) {
			return "redirect:/m2019/login/loginInfoMap.sgis";			
		}
		model.put("params", params);
		return "m2019/login/login";
	}
	
	//로그인 처리
	@RequestMapping(value="/m2019/login/loginprocess.sgis")
	public String loginprocess(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		System.out.println("m2019/login/loginprocess.sgis");
		return loginService.loginProcess(request, response, params);
	}
	
	//로그인 후 화면
	@RequestMapping(value = "/m2019/login/loginInfoMap.sgis", method = RequestMethod.GET)
	public String loginInfo(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		//로그인 안되어있으면 로그인 페이지로 이동
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth == null || "anonymousUser".equals(auth.getName())) {
			return "redirect:/m2019/login/login.sgis";
		}

		//사용자 정보 조회
		params.put("member_id", auth.getName());
		Map<String,Object> member_info = loginMapper.selectSrvDtMemberinfo(params);
		model.put("member_info", member_info);
		
		model.put("params", params);
		return "m2019/login/loginInfoMap";
	}
	
	//설정 및 알림
	@RequestMapping(value = "/m2019/login/loginSetupNotification.sgis", method = RequestMethod.GET)
	public String loginSetupNotification(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params, ModelMap model) throws Exception {
		//로그인 안되어있으면 로그인 페이지로 이동
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth == null || "anonymousUser".equals(auth.getName())) {
			return "redirect:/m2019/login/login.sgis";
		}

		//사용자 정보 조회
		params.put("member_id", auth.getName());
		Map<String,Object> member_info = loginMapper.selectSrvDtMemberinfo(params);
		model.put("member_info", member_info);
		
		model.put("params", params);
		return "m2019/login/loginSetupNotification";
	}
}