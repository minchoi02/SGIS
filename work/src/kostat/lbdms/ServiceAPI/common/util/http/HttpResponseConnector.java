package kostat.lbdms.ServiceAPI.common.util.http;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class HttpResponseConnector extends HttpConnector {
	
	private final Log logger = LogFactory.getLog(HttpResponseConnector.class);
	
	protected String urlString;

	protected String method = HttpRequestKey.GET;
	protected HashMap<String, Object> parameters = new HashMap<String, Object>();

	private IResponseHandler responseHandler;

	public HttpResponseConnector(String urlString, String method, HashMap<String, Object> parameters) {
		super(urlString, method, parameters);
	}

	public HttpResponseConnector(String urlString, String method) {
		super(urlString, method, new HashMap<String, Object>());
	}

	public HttpResponseConnector(String urlString, HashMap<String, Object> parameters) {
		super(urlString, HttpRequestKey.GET, parameters);
	}

	public HttpResponseConnector(String urlString) {
		super(urlString, HttpRequestKey.GET, new HashMap<String, Object>());
	}

	/**
	 * <pre>
	 * HTTP 요청을 수행한다
	 * </pre>
	 * 
	 * @return 처리결과
	 */
	@Override
	public String connect() {

		HttpURLConnection connection = null;
		try {
			logger.info("connect : " + this.urlString);
			connection = send();

			// 응답결과 파싱
			int responseCode = connection.getResponseCode();
			logger.info("responseCode : " + responseCode);

			Map<String, List<String>> map = connection.getHeaderFields();
			Set<String> set = map.keySet();
			Iterator<String> iter = set.iterator();
			while (iter.hasNext()) {
				String key = iter.next();
				// logger.info( "key : "+key + " value : " + map.get( key ) );
				logger.info("key : " + key);
				List<String> list = map.get(key);
				for (String item : list) {
					logger.info("===>  " + item);
				}
			}
			logger.info("content type : " + connection.getContentType());
			logger.info("types == " + connection.getResponseMessage());

			processResponse(connection, responseCode);

		} catch (java.net.MalformedURLException mue) {

			// mue.printStackTrace();
			logger.error(" 잘못된 URL 요청 : " + mue.toString());
		} catch (IOException e) {
			logger.error(" 전송 요청 오류 : " + e.toString());
		} catch (NoSuchMethodException e) {
			logger.error(" 전송 요청 오류 : " + e.toString());
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
		}

		return this.responseHandler.getResponseContent();

	}

	/**
	 * <pre>
	 * 응답 결과 처리
	 * </pre>
	 * 
	 * @param connection
	 * @param responseCode
	 */
	private void processResponse(HttpURLConnection connection, int responseCode) {

		try {

			logger.info("process responseCode : " + responseCode);

			if (responseCode == HttpURLConnection.HTTP_OK) {
				logger.info("processResponce contentType : " + connection.getContentType());
				// 200 응답 처리
				responseHandler.process(responseCode, connection.getContentType(), connection.getInputStream());

			} else {

				responseHandler.processExceptResponse(responseCode, connection.getErrorStream());

			}

		} catch (IOException e) {
			logger.error("[ 응답 처리 오류 ]" + e);
		}
	}

	/**
	 * <pre>
	 * 응답 처리 핸들러 setter
	 * </pre>
	 * 
	 * @param IResponseHandler
	 *            responseHandler
	 */
	public void setResponseHandler(IResponseHandler responseHandler) {
		this.responseHandler = responseHandler;
	}

	/**
	 * <pre>
	 * 응답 처리 핸들러 getter
	 * </pre>
	 * 
	 * @return IResponseHandler
	 */
	public IResponseHandler getResponseHandler() {
		return this.responseHandler;
	}
}
