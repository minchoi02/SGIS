package kostat.lbdms.ServiceAPI.common.web.util;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**  
* <pre>
* 세션 관련 유틸
* </pre>
*
* @author        Admin
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
* 
* </pre>
*/

public class SessionUtil {
	
		/**
		 * <pre>
		 * request객체로 부터 Session을 가져온다
		 * </pre>  
		 * @param request
		 * @return HttpSession
		 */
		public static HttpSession getSession( HttpServletRequest request ){
			return request.getSession( true ); 
		}
		
		/**
		 * <pre>
		 * 세션에 저장된 객체를 가져온다
		 * </pre>
		 * @param request
		 * @param key
		 * @return Object
		 */
		public static Object getAttribute( HttpServletRequest request, String key ){
			
			if ( request == null ) return null;
			
			HttpSession session = SessionUtil.getSession(request);
			
			if (  session.getAttribute( key ) != null ){
				return session.getAttribute( key );
			} 
			return null;
		}
		
		/**
		 * <pre>
		 * 세션에 데이터를 저장한다
		 * </pre>
		 * @param request
		 * @param key
		 * @param value
		 */
		public static void setAttribute( HttpServletRequest request, String key, Object value ){
			
			HttpSession session = SessionUtil.getSession(request);
			session.setAttribute(key, value);
			
		}
		
		/**
		 * <pre>
		 * 세션을 초기화한다
		 * </pre>
		 * @param request
		 */
		public static void invalidate( HttpServletRequest request ){
			HttpSession session = getSession( request );
			invalidate( session );
		}

		/**
		 * <pre>
		 * 세션을 초기화한다
		 * </pre>
		 * @param session
		 */
		public static void invalidate(HttpSession session) {
			@SuppressWarnings("unchecked")
			Enumeration<String> enu = session.getAttributeNames();
			while( enu.hasMoreElements() ){
				session.removeAttribute( enu.nextElement() );
			}
			session.invalidate();
		}
		
}
