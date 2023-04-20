<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.net.*,java.io.*" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.net.URLDecoder" %>
<%@ page import="org.apache.http.impl.client.DefaultHttpClient" %>
<%@ page import="org.apache.http.impl.client.CloseableHttpClient" %>
<%@ page import="org.apache.commons.io.IOUtils" %>
<%@ page import="org.apache.http.HttpResponse" %>
<%@ page import="org.apache.http.HttpEntity" %>
<%@ page import="org.apache.http.client.methods.HttpGet" %>

<%
	request.setCharacterEncoding("utf-8");
	String url = request.getParameter("url");//필수 파라미터...
	String format = request.getParameter("format");//필수 파라미터...
	String serviceKey = "Kt81XB%2Foi6UO%2BRYpE4H7N1FLXr22t8%2BB9D94I1Ds3TEbwxzqce%2F5RhyFkhO%2Fc69H8rvNZmJdtAJxzNxRjAfqog%3D%3D";//건축물대장 serviceKey...
		
	String vurl = "";
	if(format.equals("text/xml")) {
		vurl = URLDecoder.decode(url) + serviceKey;
	} else {
		vurl = URLDecoder.decode(url);
	}	
	
	CloseableHttpClient httpClient = new DefaultHttpClient();
	
	httpClient.getParams().setParameter("http.protocol.expect-continue", false);
	httpClient.getParams().setParameter("http.connection.timeout", 2000);
	httpClient.getParams().setParameter("http.socket.timeout", 2000);
	
	HttpGet httpGet = new HttpGet(vurl);
	
	HttpResponse httpResponse = null;
	InputStream inputStream = null;
	try {
		httpResponse = httpClient.execute(httpGet);
		HttpEntity httpEntity = httpResponse.getEntity();
		inputStream = httpEntity.getContent();
		response.setContentType(format);
		out.clear();
    	IOUtils.copy(inputStream, response.getOutputStream());
	} catch (Exception e) {
		e.getStackTrace();
	} finally {
		IOUtils.closeQuietly(inputStream);
		if(inputStream != null) {
			inputStream.close();	
		}
		if(httpClient != null) {
			httpClient.close();	
		}		
	}
%>