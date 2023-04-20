package kostat.lbdms.ServiceAPI.api;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.neighborsystem.durian.restapi.model.NFData;

import Decoder.BASE64Decoder;
import kostat.lbdms.ServiceAPI.center.api.interceptor.annotation.Interceptor;
import kostat.lbdms.ServiceAPI.common.util.FileUtils;
import kostat.lbdms.ServiceAPI.common.util.ProxyInfo;
import kostat.lbdms.ServiceAPI.exception.AuthorityException;

/**
 * 1. 기능 : 공통 관련 컨트롤러.<p>
 * 2. 처리개요 : <p>
 * 3. 주의사항 : <p>
 *  <pre>
 *  <b>History:</b> 
 *     작성자 : 권차욱 1.0, 2018/07/03  초기 작성
 *  </pre>
 *  
 * @author 최종 수정자 : 권차욱
 * @version 1.0
 * @see
 * <p/>
 */

@Controller
@Interceptor("CallLogger")
@RequestMapping(value="/api/common")
public class CommonAPI {
	@SuppressWarnings("unused")
	private final Log logger = LogFactory.getLog(CommonAPI.class);
	private static final String PROPERTY_PATH = "/globals.properties";
	private Pattern callbackPattern = Pattern.compile("[a-zA-Z_$][0-9a-zA-Z_$]*");
	private List<ProxyInfo> proxyInfos;
	
	public void setProxyInfo( List<ProxyInfo> infos ) 
	{
		proxyInfos = infos;
	}
	
	public List<ProxyInfo> getProxyInfo() 
	{
		return proxyInfos;
	}
	
	@Interceptor("PageCallReg")
	@RequestMapping(value="/getCaptureImageData.jsonp")
	public ModelAndView getCaptureImageData(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		Map mapParameter = new HashMap();
		try {
			
			URL url;
			String strUrl;
			InputStream data;
			String contentType = "";
			byte [] arrReaded = null;
			byte [] arrEncoded = null;

			try
			{
				strUrl = request.getParameter("url");

				if ( proxyInfos != null ) {
					for( ProxyInfo info : proxyInfos ) {
						if ( strUrl.contains(info.getFromUrl() ) ) {
							strUrl = strUrl.replace( info.getFromUrl(), info.getToUrl() );
							if( logger.isDebugEnabled() ) {
								logger.debug("convert URL : " + strUrl);
							}
							break;
						}
					}
				}
				
				url = new URL(strUrl);
				URLConnection connection = url.openConnection();

				connection.setConnectTimeout(15000);
				data = connection.getInputStream();
				contentType = connection.getContentType();
				arrReaded = IOUtils.toByteArray( data );
				arrEncoded = Base64.encodeBase64( arrReaded );
			}
			catch (Exception e) {
				e.printStackTrace();
			}

			String strCallbackName = request.getParameter("callback");
			
			NFData results = new NFData();

			if (strCallbackName == null) 
			{
				results.put( "contentType", contentType );
				results.put( "viewType", "byte" );
				results.put( "data", arrReaded );
			} 
			else 
			{
				if (!callbackPattern.matcher(strCallbackName).matches()) 
				{
					throw new AuthorityException( "잘못된 콜백 함수명" );
				}
				
				results.put( "viewType", "base64" );
				results.put( "data", new String(arrEncoded) );
				results.put( "callBackName", strCallbackName );
				results.put( "contentType", "application/javascript");
				
			}
			
			model.put("id", "G2G50001");
			model.put("errCd", "0");
			model.put("errMsg", "Success");
			model.put("result", results);
			
		}
		catch (AuthorityException e) {
			logger.info(e);
			model.put("id", "G2G50001");
			model.put("errCd", "-1");
			model.put("errMsg", "failed");
		}
		catch (Exception e) {
			logger.info(e);
			model.put("id", "G2G50001");
			model.put("errCd", "-1");
			model.put("errMsg", "failed");
		}
		finally {
		}
		return new ModelAndView("jsonp", model);
	}
	
}