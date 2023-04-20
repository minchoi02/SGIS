package egovframework.sgis.m2019.login.web;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.sgis.cmmn.exception.ValidExceptionToJson;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.m2019.login.service.LoginService;

@Controller
public class LoginJsonController {
	private final String PRODUCES = "application/json; charset=UTF-8;";
	
	@Resource(name = "loginService")
	private LoginService loginService;
	
	
	@ExceptionHandler(ValidExceptionToJson.class)
	@ResponseBody
	public String handleMethodArgumentNotValidException(ValidExceptionToJson errors) {
		return errors.getMessage();
	}	
	
	//쿠키 조회
	@RequestMapping(value = "/m2019/login/getCookie.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData getCookie(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return loginService.getCookie(request, response, params); 
	}
	
	//쿠키 저장
	@RequestMapping(value = "/m2019/login/setCookie.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData setCookie(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return loginService.setCookie(request, response, params); 
	}
	
	//쿠키 삭제
	@RequestMapping(value = "/m2019/login/removeCookie.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData removeCookie(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return loginService.removeCookie(request, response, params); 
	}
	
	//사용자 정보 조회
	@RequestMapping(value = "/m2019/login/selectSrvDtMemberinfo.json", method = RequestMethod.POST, produces=PRODUCES)
	@ResponseBody
	public JsonData selectSrvDtMemberinfo(HttpServletRequest request, HttpServletResponse response, @RequestParam Map<String, Object> params) {
		return loginService.selectSrvDtMemberinfo(request, response, params); 
	}
	
}