package kostat.lbdms.ServiceAPI.exception;

import org.apache.commons.lang.StringUtils;

/**  
 * <pre>
 * 예외처리 메시지 유틸 클레스
 * </pre>
 *
 * @author		Admin
 * @since 		2015. 10. 20. 오후 2:18:53
 * @version 	    1.0
 * @see
 * <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *</pre>
 */
public class ExceptionMessageUtil {
	/**
	 * getMessage()
	 * @param e
	 * @return
	 */
	public static String getMessage( Exception e ){
		if ( e != null ){
			if ( !StringUtils.isEmpty( e.getMessage() ) ){
				return getRootCause( e ).getMessage();
			}
		}
		return "서버오류가 발생했습니다";
	}
	/**
	 * getRootCause()
	 * @param throwable
	 * @return
	 */
	public static Throwable getRootCause(Throwable throwable) {
	    if (throwable.getCause() != null)
	        return getRootCause(throwable.getCause());

	    return throwable;
	}
	
}
