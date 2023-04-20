<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.io.*"       %>
<%@ page import="java.net.*"     %>
<%@ page import="java.util.*"    %>
<%@ page import="javax.net.ssl.HttpsURLConnection"    %>
<%@ page import="javax.servlet.http.HttpServletRequest"    %>
<%@ page import="javax.servlet.http.HttpServletResponse"    %>
<%@ page import="org.apache.commons.logging.*"    %>
<%@ page import="org.apache.commons.codec.binary.Base64"    %>
<%@ page import="org.apache.commons.io.IOUtils"    %>
    

<%
	String param_url = request.getParameter("param_url") == null ? "":(String)request.getParameter("param_url");
	executeAPI(request, response, param_url);
%>
    
<%!
	
	public void executeAPI(HttpServletRequest req, HttpServletResponse resp,  String url_2) throws Exception
	{
	
		InputStream data;
		String contentType = "";
		byte [] arrReaded = null;
		byte [] arrEncoded = null;	
	
		//String sUrl = url_2;
		String sUrl = "http://gis-heritage.go.kr";
		
		String requestQueryString = req.getQueryString();
		
		sUrl = sUrl + URLDecoder.decode(requestQueryString, "UTF-8");
		
		//sUrl = sUrl + requestQueryString;
		
		
		System.out.println( "sUrl[" + sUrl + "] " );
		//System.out.println( "requestQueryString[" + requestQueryString + "] " );
		//System.out.println( "URLDecoder.decode(requestQueryString, \"UTF-8\")[" + URLDecoder.decode(requestQueryString, "UTF-8") + "] " );
		
		
	
		try
		{
			URL url = new URL(sUrl);
			URLConnection connection = url.openConnection();
			System.out.println("[proxy_heritage.jsp] 11111111");
			
			connection.setRequestProperty("Content-type", "image/png");
			
			connection.setConnectTimeout(3000);
			data = connection.getInputStream();
			
			System.out.println("[proxy_heritage.jsp] 222222222");
			
			contentType = connection.getContentType();
			
			System.out.println("[proxy_heritage.jsp] 3333333333");
			
			arrReaded = IOUtils.toByteArray( data );
			arrEncoded = Base64.encodeBase64( arrReaded );
			
			
			
			System.out.println( "arrReaded[" + arrReaded + "] " );
	
		}
		
		catch( Exception e )
		{
			e.printStackTrace();
		}
		finally {
			/*
			try {
				if(os != null && is != null && bStream != null){
					os.close();
					is.close();
					bStream.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
	
			}
			*/
		}
		//return result;
	}
	
	private void printByOutputStream(OutputStream os, String msg) throws IOException {
		byte[] msgBuf = msg.getBytes("UTF-8");
		os.write(msgBuf, 0, msgBuf.length);
		os.flush();
	}
	
	private void printByInputStream(InputStream is, ByteArrayOutputStream boStream) throws IOException {
		BufferedInputStream bis = null;
		try {
			bis = new BufferedInputStream(is);
			int imgByte;
			while ((imgByte = bis.read()) != -1) {
				boStream.write(imgByte);
			}
	//	} catch (FileNotFoundException e) {
	//		logger.error("FileNotFoundException 예외", e);
	//	} catch (IOException e) {
	//		logger.error("IOException 예외", e);
		} catch (Exception e) {
			//System.out.println(e.getMessage());
			e.printStackTrace();
		} finally {
			if(bis != null){
				bis.close();
			}
		}
	}
%>


