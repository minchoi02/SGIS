package kostat.lbdms.ServiceAPI.common.util.http;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import kostat.lbdms.ServiceAPI.exception.http.HttpRequestException;

public class HttpConnector {
	private final Log logger = LogFactory.getLog(getClass());

	protected String urlString;
	protected String method = HttpRequestKey.GET;
	protected HashMap<String, Object> parameters = new HashMap<String, Object>();

	public HttpConnector(String urlString, String method, HashMap<String, Object> parameters) {
		this.parameters = new HashMap<String, Object>();
		this.parameters.putAll(parameters);
		this.urlString = urlString;
		this.method = method;
	}

	public HttpConnector(String urlString, String method) {
		this(urlString, method, new HashMap<String, Object>());
	}

	public HttpConnector(String urlString, HashMap<String, Object> parameters) {
		this(urlString, HttpRequestKey.GET, parameters);
	}

	public HttpConnector(String urlString) {
		this(urlString, HttpRequestKey.GET, new HashMap<String, Object>());
	}

	/**
	 * <pre>
	 * HttpURLConnection을 생성해 반환한다
	 * </pre>
	 * 
	 * @param URL
	 *            ( url )
	 * @param String
	 *            ( method ) Http method ( PUT, DELETE, POST, GET )
	 * @return HttpURLConnection
	 */
	protected HttpURLConnection newHttpConnection(URL url, String method) {
		HttpURLConnection connection = null;
		try {

			logger.info("요청 URL : " + url);

			connection = (HttpURLConnection) url.openConnection();
			connection.setDoInput(true);
			connection.setDoOutput(true);
			connection.setUseCaches(false);
			connection.setRequestProperty("Accept-Charset", "UTF-8");
			connection.setRequestMethod(method);
			connection.setConnectTimeout(HttpRequestKey.TIME_OUT);
			connection.setReadTimeout(HttpRequestKey.TIME_OUT);

		} catch (IOException err) {
			logger.error(err.toString());
		}
		return connection;
	}

	/**
	 * <pre>
	 * 맵데이터를 파라메타 문자열로 변경한다.
	 * </pre>
	 * 
	 * @param HashMap
	 *            ( data ) 파라메타 정보
	 * @return StringBuffer 문자열
	 * @throws UnsupportedEncodingException
	 */
	protected StringBuffer setParameters(HashMap<String, Object> data) throws UnsupportedEncodingException {
		Iterator<String> data_key = data.keySet().iterator();
		StringBuffer parameters = new StringBuffer();
		while (data_key.hasNext()) {
			String key = data_key.next();
			if (data.get(key) != null) {
				Object obj = data.get(key);
				if (obj instanceof ArrayList) {
					// 파라메타가 배열인 경우 처리
					@SuppressWarnings("unchecked")
					ArrayList<String> values = (ArrayList<String>) obj;
					for (String value : values) {
						parameters.append(URLEncoder.encode(key, "UTF-8"));
						parameters.append("=");
						parameters.append(URLEncoder.encode(String.valueOf(value), "UTF-8"));
						parameters.append("&");
					}
				} else {
					parameters.append(URLEncoder.encode(key, "UTF-8"));
					parameters.append("=");
					parameters.append(URLEncoder.encode(String.valueOf(data.get(key)), "UTF-8"));
					parameters.append("&");
				}
			}
		}
		if (parameters.length() > 0) {
			// parameters.insert(0, "?");
			parameters.deleteCharAt(parameters.length() - 1);
		}

		return parameters;
	}

	/**
	 * <pre>
	 * GET 요청
	 * </pre>
	 * 
	 * @return HttpURLConnection
	 * @throws IOException
	 */
	protected HttpURLConnection get() throws IOException {

		// 파라메타 설정
		String parametersString = this.setParameters(this.parameters).toString();
		String requestUrl = this.urlString;
		if (!StringUtils.isEmpty(parametersString)) {
			requestUrl = (urlString + "?" + parametersString);
		}

		URL url = new URL(requestUrl);
		HttpURLConnection connection = this.newHttpConnection(url, HttpRequestKey.GET);

		// thread.setParameters(data);
		return connection;
	}

	/**
	 * <pre>
	 * DELETE 요청
	 * </pre>
	 * 
	 * @return HttpURLConnection
	 * @throws IOException
	 */
	protected HttpURLConnection delete() throws IOException {

		// 파라메타 설정
		String parametersString = this.setParameters(this.parameters).toString();
		String requestUrl = this.urlString;
		if (!StringUtils.isEmpty(parametersString)) {
			requestUrl = (urlString + "?" + parametersString);
		}

		URL url = new URL(requestUrl);

		HttpURLConnection connection = this.newHttpConnection(url, HttpRequestKey.DELETE);

		// thread.setParameters(data);
		return connection;
	}

	/**
	 * <pre>
	 * POST 요청
	 * </pre>
	 * 
	 * @return HttpURLConnection
	 * @throws IOException
	 */
	protected HttpURLConnection post() throws IOException {
		// 파라메타 설정
		String parametersString = this.setParameters(this.parameters).toString();
		logger.info(parametersString);

		URL url = new URL(urlString);
		HttpURLConnection connection = this.newHttpConnection(url, HttpRequestKey.POST);

		if (connection != null) {
			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			DataOutputStream dos = new DataOutputStream(connection.getOutputStream());
			dos.writeBytes(parametersString);
			dos.flush();
			dos.close();
		}

		return connection;

	}

	/**
	 * <pre>
	 * PUT 요청
	 * </pre>
	 * 
	 * @return HttpURLConnection
	 * @throws IOException
	 */
	protected HttpURLConnection put() throws IOException {
		// 파라메타 설정
		String parametersString = this.setParameters(this.parameters).toString();

		URL url = new URL(urlString);
		HttpURLConnection connection = this.newHttpConnection(url, HttpRequestKey.PUT);

		if (connection != null) {
			connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

			DataOutputStream dos = new DataOutputStream(connection.getOutputStream());
			dos.writeBytes(parametersString);
			dos.flush();
			dos.close();
		}

		return connection;

	}

	/**
	 * <pre>
	 * HTTP 요청을 수행한다
	 * </pre>
	 * 
	 * @return String 처리결과
	 */
	protected String connect() {

		HttpURLConnection connection = null;
		try {

			connection = send();
			// 응답결과 파싱
			int responseCode = connection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				return getResponseData(connection.getInputStream()).toString();
			} else {
				throw new HttpRequestException("Http 요청 실패 response code : " + responseCode);
			}

			/*
			 * } catch( java.net.ConnectException ce ) {
			 * 
			 * logger.error( " 연결 실패 오류 : " + ce.toString() );
			 */

		} catch (java.net.MalformedURLException mue) {

			logger.error(" 잘못된 URL 요청 : " + mue.toString());

		} catch (HttpRequestException e) {

			logger.error(" 전송 요청 오류 : " + e.toString());

		} catch (IOException ioe) {

			logger.error(ioe.toString());

		} catch (NoSuchMethodException nsme) {

			logger.error(nsme.toString());

		} finally {
			if (connection != null) {
				connection.disconnect();
			}
		}

		return null;

	}

	/**
	 * <pre>
	 * HTTP 요청을 수행한다
	 * </pre>
	 * 
	 * @return String 처리결과
	 */
	protected String rawconnect() {

		HttpURLConnection connection = null;
		try {

			connection = send();
			// 응답결과 파싱
			int responseCode = connection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				return getResponseRawData(connection.getInputStream()).toString();
			} else {
				throw new HttpRequestException("Http 요청 실패 response code : " + responseCode);
			}

		} catch (java.net.MalformedURLException mue) {

			logger.error(" 잘못된 URL 요청 : " + mue.toString());

		} catch (HttpRequestException e) {

			logger.error(" 전송 요청 오류 : " + e.toString());

		} catch (IOException ioe) {

			logger.error(ioe.toString());

		} catch (NoSuchMethodException nsme) {

			logger.error(nsme.toString());

		} finally {
			if (connection != null) {
				connection.disconnect();
			}
		}

		return null;

	}

	/**
	 * <pre>
	 * InputStream 데이터를 읽어 StringBuffer로 반환한다
	 * </pre>
	 * 
	 * @param InputStream
	 *            ( inputStream )
	 * @return Stringbuffer
	 */
	private StringBuffer getResponseData(InputStream inputStream) {
		StringBuffer data = new StringBuffer();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));

			while (true) {
				String line = br.readLine();
				if (line == null)
					break;
				if (line != null && !StringUtils.isEmpty(line)) {
					line = line.replace("N/A", "0");
				}
				data.append(line + '\n');
			}
			logger.debug("data = " + data.toString());
			logger.info("end");
		} catch (IOException ie) {
			logger.error(ie.getMessage());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					logger.error(e.getMessage());
				}
			}
		}
		// logger.debug(data.toString());
		return data;
	}

	/**
	 * <pre>
	 * InputStream 데이터를 읽어 StringBuffer로 반환한다
	 * </pre>
	 * 
	 * @param InputStream
	 *            ( inputStream )
	 * @return Stringbuffer
	 */
	private StringBuffer getResponseRawData(InputStream inputStream) {
		StringBuffer data = new StringBuffer();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));

			while (true) {
				String line = br.readLine();
				if (line == null)
					break;
				data.append(line + '\n');
			}
			// logger.info("end");
		} catch (IOException ie) {
			logger.error(ie.getMessage());
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					logger.error(e.getMessage());
				}
			}
		}
		// logger.debug(data.toString());
		return data;
	}

	/**
	 * <pre>
	 * 컨넥션을 생성한다 최인섭 점검
	 * </pre>
	 * 
	 * @return HttpURLConnection
	 * @throws IOException
	 * @throws NoSuchMethodException
	 */
	protected HttpURLConnection send() throws IOException, NoSuchMethodException {

		if (method.equals(HttpRequestKey.GET)) {

			return get();

		} else if (method.equals(HttpRequestKey.DELETE)) {

			return delete();

		} else if (method.equals(HttpRequestKey.POST)) {

			return post();

		} else if (method.equals(HttpRequestKey.PUT)) {

			return put();

		} else {

			throw new NoSuchMethodException("Http Method가 잘못 전달되었습니다 method : " + method);

		}

	}
}
