package kostat.sop.ServiceAPI.common.security;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import kostat.sop.ServiceAPI.api.cm.login.mapper.LoginDao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.neighborsystem.durian.exception.AbsAPIException;

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
public class SessionInterceptorListener extends HandlerInterceptorAdapter{
	@Resource
	private LoginDao loginDao;
	
	private static final Log logger = LogFactory.getLog(SessionInterceptorListener.class);
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object controller) throws IOException, SQLException, AbsAPIException {
		
		logger.debug("SessionInterceptorListener :: preHandle");
	
    	HttpSession session = request.getSession();
    	String member_key = (String)session.getAttribute("member_key");
    	String session_key = (String)session.getAttribute("DUPL_LOGIN_SESSION_KEY");
    	Map map = new HashMap();
    	map.put("DUPL_LOGIN_SESSION_KEY", session_key);
    	int getCount = loginDao.gpkiManagerDuplLogin(map);
    	
    	if(getCount == 1) {    		    	
			return true;
		} else {		
			response.sendRedirect(request.getContextPath() + "/s-portalcnm/html/CM/dupl.html");					
			return false;
		}		    
	}
}