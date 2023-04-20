package kostat.lbdms.ServiceAPI.exception;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;

/**  
 * <pre>
 * 예외처리 헨들러 클레스
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
public class ExceptionHandler {
	
	private static final Logger logger = LoggerFactory.getLogger( ExceptionHandler.class );
	
	/**
	 * <pre>
	 * 에러 핸들링
	 * </pre>
	 * @param except	예외	
	 * @param model	모델
	 */
	public static void handle( Exception except, Model model ){
		//except.printStackTrace();
		logger.error( except.getMessage() );
		
		/*model.addAttribute(WebAttrKey.SUCCESS, false);
		model.addAttribute(WebAttrKey.REASON, ExceptionMessageUtil.getMessage( except ) );*/
	}

}
