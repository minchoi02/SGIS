package kostat.lbdms.ServiceAPI.common.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 1. 기능 : 로그인 세션이 있어야만 접근 가능한 페이지 필터.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 김성현, 1.0, 2014/08/08  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 김성현
 * @version 1.0
 * @see
 * <p/>
 */
public class AuthenticationFilter implements Filter {
	
	private static final Log logger = LogFactory.getLog(AuthenticationFilter.class);
	
    @Override
    public void destroy() {
        // Do nothing
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) req;
		HttpSession session = httpRequest.getSession();
		
		String user_id = (String) session.getAttribute("user_id");
		logger.debug("######Session ID ->" + user_id);

		HttpServletResponse httpResponse = (HttpServletResponse) res;
		logger.debug("######" + httpRequest.getContextPath());
		//user_id = "cky88";
		//session.setAttribute("id", "cky88");
		//session.setAttribute("user_id", "cky88");
		if (user_id == null || user_id.length() == 0) {
		//	logger.debug("######" + httpRequest.getRequestURL());
			httpResponse.sendRedirect(httpRequest.getContextPath() + "/auth/login");
		} else {
			chain.doFilter(req, res);
		}
	}

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        // Do nothing
    }

}