package egovframework.sgis.m2019.login.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.sgis.cmmn.util.EgovStringUtil;
import egovframework.sgis.cmmn.util.JsonData;
import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.m2019.login.service.LoginService;
import egovframework.sgis.m2019.login.service.mapper.kairos.LoginMapper;


@Service("loginService")
@PropertySource("classpath:globals.properties")
public class LoginServiceImpl extends EgovAbstractServiceImpl implements LoginService {
	private final static Log logger = LogFactory.getLog(StringUtils.class);
	
	@Autowired
	private Environment env;
	
	@Resource(name="loginMapper")
	private LoginMapper loginMapper;
	
	/**
	 * 로그인 처리
	 * @date 2019. 7. 03.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public String loginProcess(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth != null && !"anonymousUser".equals(auth.getName())) {//로그인 되어있다면 이전 로그인 되어있는거 로그아웃 시킴
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		
		System.out.println(params.toString());
		String SYS_URL = EgovStringUtil.isNullToString(params.get("SYS_URL"));
		String CUR_URL = EgovStringUtil.isNullToString(params.get("CUR_URL"));
		String SYS_CD = EgovStringUtil.isNullToString(params.get("SYS_CD"));
		String SSN_INFO = EgovStringUtil.isNullToString(params.get("SSN_INFO"));
		String SID_IP_ADDR = EgovStringUtil.isNullToString(params.get("SID_IP_ADDR"));
		String LOGIN_YN = EgovStringUtil.isNullToString(params.get("LOGIN_YN"));
		String MSG = EgovStringUtil.isNullToString(params.get("MSG"));
		String USR_ID = EgovStringUtil.isNullToString(params.get("USR_ID"));
		String USR_NAME = EgovStringUtil.isNullToString(params.get("USR_NAME"));

		//로그인 성공
		if("Y".equals(LOGIN_YN)){
			//로그인 처리
			if(this.forceLogin(request,response)){
				// URL 처리
				if(
					!"".equals(CUR_URL)&&
					!CUR_URL.contains("loginprocess.sgis")&&
					!CUR_URL.contains("logout.sgis")&&
					!CUR_URL.contains("login.sgis")
				) {
					if(!CUR_URL.startsWith("/")) {
						CUR_URL = "/"+CUR_URL;
					}
					return "redirect:"+CUR_URL.replaceAll(request.getContextPath(),"");
				}
				else {
					return "redirect:/";
				}
			}
			//로그인 처리 실패
			else{
				//자동로그인 쿠키 제거
				StringUtils.setCookie(request, response, "loginSaveAutoLogin", "false", 365);
				return this.redirectErrorPage(request, response, "로그인을 실패하였습니다");
			}
		}
		//로그인 실패
		else{
			//자동로그인 쿠키 제거
			StringUtils.setCookie(request, response, "loginSaveAutoLogin", "false", 365);
			return this.redirectErrorPage(request, response, request.getParameter("MSG").replaceAll("\\|", "<br>"));
		}
	}
	
	/**
	 * 쿠키 조회
	 * @date 2019. 6. 24.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData getCookie(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			String name = EgovStringUtil.isNullToString(params.get("name"));
			String resultData = StringUtils.getCookie(request, name);
			result.put("resultData", resultData);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 쿠키 저장
	 * @date 2019. 6. 24.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData setCookie(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			String name = EgovStringUtil.isNullToString(params.get("name"));
			String value = EgovStringUtil.isNullToString(params.get("value"));
			int expires_day = EgovStringUtil.zeroConvert(params.get("expires_day"));
			StringUtils.setCookie(request, response, name, value, expires_day);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 쿠키 삭제
	 * @date 2019. 6. 24.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData removeCookie(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			String name = EgovStringUtil.isNullToString(params.get("name"));
			Cookie cookie = new Cookie(name, null); // choiceCookieName(쿠키 이름)에 대한 값을 null로 지정
			cookie.setPath("/"); // 전체 경로에 해당
			cookie.setMaxAge(0); // 유효시간을 0으로 설정
			response.addCookie(cookie); // 응답 헤더에 추가해서 없어지도록 함
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 사용자 정보 조회
	 * @date 2019. 7. 22.
	 * @author (주)엘티메트릭 김남민
	 * @param request
	 * @param response
	 * @param params
	 * @return
	 */
	@Override
	public JsonData selectSrvDtMemberinfo(HttpServletRequest request, HttpServletResponse response, Map<String, Object> params) {
		try{
			HashMap<String,Object> result = new HashMap<String,Object>();
			Map<String,Object> resultData = loginMapper.selectSrvDtMemberinfo(params);
			if(resultData != null) result.put("resultCount", 1); 
			else result.put("resultCount", 0);
			result.put("resultData", resultData);
			result.put("params", params);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.SUCCESS, null, result);
		}catch(Exception e){
			logger.error(e);
			return new JsonData(request, response, StringUtils.COMM_ERR_CODE.ERR_DEFAULT, null, null);
		}
	}
	
	/**
	 * 강제로 로그인 시키기
	 * @date 2016. 3. 21.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @return
	 */
	private boolean forceLogin(HttpServletRequest request, HttpServletResponse response) {
		String USR_ID = request.getParameter("USR_ID");
		if (StringUtils.hasText(USR_ID)) {
			Authentication authentication = new UsernamePasswordAuthenticationToken(USR_ID, USR_ID, AuthorityUtils.createAuthorityList("ROLE_LOGINUSER"));
			SecurityContext securityContext = SecurityContextHolder.getContext();
			securityContext.setAuthentication(authentication);
			HttpSession session = request.getSession(true);
			session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
			if ("on".equals(request.getParameter("save-me"))) {
				StringUtils.setCookie(request, response, "save-me", USR_ID, 365);
			} else {
				StringUtils.removeCookie(request, "save-me");
			}
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * messageAlert 창 띄운 후 로그인페이지로 이동
	 * @date 2016. 3. 21.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param message : 에러 메세지
	 * @return
	 */
	private String redirectErrorPage(
			HttpServletRequest request, 
			HttpServletResponse response, 
			String message
			) {
		String query = "";
		if(StringUtils.hasText(request.getParameter("CUR_URL"))){
			query+="&returnPage="+request.getParameter("CUR_URL");
		}
		if(StringUtils.hasText(request.getParameter("USR_ID"))){
			query+="&id="+request.getParameter("USR_ID");
		}
		if(StringUtils.hasText(query)){
			query="?"+query;
		}
		HttpSession session = request.getSession(false);
		if(session != null){
			session.setAttribute("errorMessage", message);
			session.setMaxInactiveInterval(60*10);//10분
		}
		return "redirect:/m2019/login/login.sgis"+query;
	}
	
}	