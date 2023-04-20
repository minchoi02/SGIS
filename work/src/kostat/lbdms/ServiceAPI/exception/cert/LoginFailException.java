package kostat.lbdms.ServiceAPI.exception.cert;

import kostat.lbdms.ServiceAPI.exception.BaseException;

/**  
 * <pre>
 * 로그인실패 예외처리 클레스
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
public class LoginFailException extends BaseException {

	private static final long serialVersionUID = -1122805437787334433L;
	/**
	 * LoginFailException()
	 * @param message
	 */
	public LoginFailException(String message) {
		super( message );
	}
	
}
