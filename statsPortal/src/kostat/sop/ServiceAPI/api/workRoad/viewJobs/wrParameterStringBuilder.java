package kostat.sop.ServiceAPI.api.workRoad.viewJobs;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;

/**
 * 1. 기능 : 
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : ywKim 1.0, 2018.10.19	초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : ywKim
 * @version 1.0
 * @see
 * <p/>
 */
public class wrParameterStringBuilder {

	public static String getParamsString(Map<String, String> params) 
			throws UnsupportedEncodingException {
		return getParamsString(params, "UTF-8");
	}
	public static String getParamsString(Map<String, String> params, String pCharSet) 
			throws UnsupportedEncodingException {
        StringBuilder result = new StringBuilder();
 
        String charSet = (pCharSet == null) ? "UTF-8" : pCharSet;
        
        for (Map.Entry<String, String> entry : params.entrySet()) {
          result.append(URLEncoder.encode(entry.getKey(), charSet));
          result.append("=");
          result.append(URLEncoder.encode(entry.getValue(), charSet));
          result.append("&");
        }
 
        String resultString = result.toString();
        return resultString.length() > 0
          ? resultString.substring(0, resultString.length() - 1)
          : resultString;
    }
}