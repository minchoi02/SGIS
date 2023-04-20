package kostat.lbdms.ServiceAPI.common.web.core;

/**  
 * <pre>
 * 사용자권한코드 interface
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

public interface UserAuthCode {
	
	/** 내부 사용자 */
	String INNER_USER = "i";
	
	/** 외부 사용자 */
	String EXTERNAL_USER = "e";
		
	/** 관리자 권한 */
	String OPERATOR = "o";
	
	/** 데이터 관리자 */
	String DATA_MANAGER = "d";
	
	/** 관리자 권한 ( 상위관리자 ) */
	String ADMIN = "a";

}