package egovframework.sgis.member.service.impl;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.access.AccessDeniedHandler;

import egovframework.sgis.cmmn.util.StringUtils;

public class AccessDeniedImpl implements AccessDeniedHandler {

	/**
	 * 접근 권한 핸들러
	 * @date 2016. 4. 6.
	 * @author (주)유코아시스템 나광흠 대리
	 * @param request
	 * @param response
	 * @param accessDeniedException
	 * @throws IOException
	 * @throws ServletException
	 */
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
		// Ajax를 통해 들어온것인지 파악한다
		String ajaxHeader = request.getHeader("X-Ajax-call");
		String result = "";
		String referer = request.getHeader("REFERER");
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setCharacterEncoding("UTF-8");

		if(ajaxHeader == null){ // null로 받은 경우는 X-Ajax-call 헤더 변수가 없다는 의미이기 때문에 ajax가 아닌 일반적인 방법으로 접근했음을 의미한다
			if(referer!=null&&referer.matches("^(http(s?)://www.juso.go.kr/)(.*)")){
				request.getRequestDispatcher("/popup/juso.sgis").forward(request, response);
			}else{
				Authentication auth = SecurityContextHolder.getContext().getAuthentication();
				if(auth!=null){
					Object principal = auth.getPrincipal();
					if (principal instanceof UserDetails) {
						String username = ((UserDetails) principal).getUsername();
						request.setAttribute("username", username);
					}
				}
				request.setAttribute("errormsg", accessDeniedException);
				request.getRequestDispatcher("/forbidden.sgis").forward(request, response);
			}
		}else{
			result = "{\"errCd\" : "+StringUtils.COMM_ERR_CODE.ERR_FORBIDDEN.getErrCode()+", \"errMsg\" : \"접근권한이 존재하지 않습니다\"}";
			response.getWriter().print(result);
			response.getWriter().flush();
		}
	}
}