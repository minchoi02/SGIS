package kostat.lbdms.ServiceAPI.common.util.http;

import java.util.HashMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;



import net.sf.json.JSONObject;




/**  
 * <pre>
 * HttpJSONConnector 클레스
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
public class HttpJSONConnector extends HttpConnector{
	private final Log logger = LogFactory.getLog(HttpJSONConnector.class);
	/**
	 * 
	 * @param urlString
	 * @param method
	 * @param parameters
	 */
	public HttpJSONConnector( String urlString, String method, HashMap<String,Object> parameters ){
		super( urlString, method, parameters );
	}
	/**
	 * 
	 * @param urlString
	 * @param method
	 */
	public HttpJSONConnector( String urlString, String method ){
		super( urlString, method, new HashMap<String,Object>() );		
	}
	/**
	 * 
	 * @param urlString
	 * @param parameters
	 */
	public HttpJSONConnector( String urlString, HashMap<String,Object> parameters ){
		super( urlString, HttpRequestKey.GET, parameters );		
	}
	/**
	 * 
	 * @param urlString
	 */
	public HttpJSONConnector( String urlString ){
		super( urlString, HttpRequestKey.GET, new HashMap<String,Object>() );		
	}
	/**
	 * 
	 * @return
	 */
	public JSONObject connectWithParse(){
		
		JSONObject res = new JSONObject();
		res = JSONObject.fromObject( this.connect() ); 
		//org.json을 사용하기 위해
		/*JSONParser parser = new JSONParser();
		Object obj = new Object();
		try {
			obj = parser.parse(this.connect());
		} catch (ParseException e) {
			logger.error(e);
		}
		res = (JSONObject)obj;*/
		
		
		return res;
	}
	/**
	 * 
	 * @return
	 */
	public String connectWithParseString(){
		return this.rawconnect(); 
	}
}
