package kostat.lbdms.ServiceAPI.common.web.rest.constant;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.lang.StringUtils;
import net.sf.json.JSONObject;

/**  
* <pre>
* 시스템 REST API 체크 클래스
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
public class RestResultChecker {
    private static final String FAIL_MESSAGE = " [시스템오류] 요청이 실패되었습니다";
    private static final Log logger = LogFactory.getLog(RestResultChecker.class);
	/**
	 * <pre>
	 * 시스템 REST API 호출 결과의 성공여부를 검사한다 
	 * </pre>
	 * @param JSONObject ( res ) 
	 * @return boolean 성공여부 
	 */
	public static boolean isSuccess( JSONObject res ){
		
		if ( res == null ){
			logger.info("JSONObject is null");
			return false;
		}
		
		if ( res.has( ResultKey.RESULT ) ){
			String result = res.getString( ResultKey.RESULT );
			return StringUtils.equalsIgnoreCase( result, ResultKey.SUCCESS );
		}
		
		return true;
	}
	
	/**
	 * <pre>
	 * 시스템 REST API 호출 결과 메시지를 조회한다
	 * </pre>
	 * @param JSONObject ( res ) 
	 * @return String 메시지 
	 */
	public static String getMessage( JSONObject res ){ 
		
		if ( res == null ){
			return " [시스템오류] 응답결과를 받아오지 못했습니다 ";
		}
		
		if( res.has( ResultKey.MESSAGE ) ){
			return res.getString( ResultKey.MESSAGE );
		}
		
		return FAIL_MESSAGE;
	}
}
