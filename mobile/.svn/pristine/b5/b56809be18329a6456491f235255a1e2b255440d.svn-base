package egovframework.sgis.member.service.impl;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Repository;

import egovframework.sgis.cmmn.util.StringUtils;
import egovframework.sgis.member.model.MemberVO;
import egovframework.sgis.member.service.mapper.kairos.MemberMapper;


@Repository
public class LoginServiceImpl implements UserDetailsService,AuthenticationSuccessHandler,AuthenticationFailureHandler {
	@Resource(name="memberMapper")
	private MemberMapper memberMapper;
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	
	/**
	 * 사용자 정보
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param username
	 * @return
	 * @throws UsernameNotFoundException
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberVO member = memberMapper.selectMemberInfo(username);
		if(member==null){
			return null;
		}else{
			return new User(username, member.getPw(),AuthorityUtils.createAuthorityList("ROLE_LOGINUSER"));
		}
	}
	/**
	 * 로그인 실패 로직
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param exception
	 * @throws IOException
	 * @throws ServletException
	 */
	@Override
	public void onAuthenticationFailure(
			HttpServletRequest request, 
			HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		MemberVO member = memberMapper.selectMemberInfo(request.getParameter("id"));
		if(member!=null){
			int fail;
			try{
				fail = Integer.parseInt(member.getPw_fail_cnt())+1;
			}catch(NumberFormatException e){
				fail = 0;
			}
			memberMapper.updateMemberInfo(member.getMember_id(), fail, request.getRemoteHost());
			if(member.getLogin_limit_yn()!=null&&member.getLogin_limit_yn().equals("Y")){
				request.setAttribute("errorMessage", "사용 제한이 되었습니다.<br/>통합관리자에게 문의 바랍니다.");
			}else if(fail>=5){
				request.setAttribute("errorMessage", "비밀번호를 5회 이상 틀렸기 때문에 사용 제한이 되었습니다.<br>통합관리자에게 문의 바랍니다.");
			}else{
				request.setAttribute("errorMessage", "아이디 또는 패스워드를 확인해주세요");
			}
		}else{
			request.setAttribute("errorMessage", "아이디 또는 패스워드를 확인해주세요");
		}
		String loginid = request.getParameter("id");
		// Request 객체의 Attribute에 사용자가 실패시 입력했던 로그인 ID와 비밀번호를 저장해두어 로그인 페이지에서 이를 접근하도록 한다
		request.setAttribute("id", loginid);
		request.setAttribute("loginFailure", true);
		request.setAttribute("returnPage", request.getParameter("returnPage"));

		// Request 객체의 Attribute에 예외 메시지 저장
		request.setAttribute("message", exception.getMessage());
		exception.printStackTrace();
		request.getRequestDispatcher("/login.sgis").forward(request, response);
	}

	/**
	 * 로그인 성공 로직
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param authentication
	 * @throws IOException
	 * @throws ServletException
	 */
	@Override
	public void onAuthenticationSuccess(
			HttpServletRequest request, 
			HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		String returnPage="/";
		if(
			request.getParameter("returnPage")!=null&&
			!request.getParameter("returnPage").contains("loginprocess.sgis")&&
			!request.getParameter("returnPage").contains("logout.sgis")&&
			!request.getParameter("returnPage").contains("login.sgis")){
			returnPage = request.getParameter("returnPage");
			if(!returnPage.startsWith("/")){
				returnPage="/"+returnPage;
			}
		}
		MemberVO member = memberMapper.selectMemberInfo(request.getParameter("id"));
		if("on".equals(request.getParameter("save-me"))){
			StringUtils.setCookie(request, response, "save-me", member.getMember_id(), 365);
		}else{
			StringUtils.removeCookie(request, "save-me");
		}
		memberMapper.updateMemberInfo(member.getMember_id(), 0, request.getRemoteHost());
		redirectStrategy.sendRedirect(request, response, returnPage.replaceAll(request.getContextPath(),""));
	}
}
