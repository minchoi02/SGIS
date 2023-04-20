package kostat.lbdms.ServiceAPI.exception.rest;

import kostat.lbdms.ServiceAPI.exception.BaseException;

/**  
 * <pre>
 * REST api system 처리 실패 예외 클래스
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
public class SystemFailException extends BaseException {

	private static final long serialVersionUID = -8842241567970762248L;
	
	/**
	 * SystemFailException()
	 * @param message
	 */
	public SystemFailException(String message) {
		super( message );
	}
	
	public String getReason(){
		if ( this.message != null ){
			return this.message;
		}
		return "시스템 오류가 발생했습니다";
	}
	
}