package kostat.lbdms.ServiceAPI.common.util.http;

import java.io.InputStream;

/**  
 * <pre>
 * ResponseHandler interface 
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

public interface IResponseHandler {

	void process(int responseCode, String contentType, InputStream inputStream);
	void processExceptResponse(int responseCode, InputStream inputStream);
	String getResponseContent();

}