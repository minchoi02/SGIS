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
    
	String userAgent = request.getHeader("User-Agent");
	String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos",
				"Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};
	
	//String param = request.getParameter("param");
	
	//String param_url = request.getParameter("param_url") == null ? "":(String)request.getParameter("param_url");
	
	String sUrl = "http://gis-heritage.go.kr";
		
	String requestQueryString = request.getQueryString();
	
	//sUrl = sUrl + URLDecoder.decode(requestQueryString, "UTF-8");
	sUrl = URLDecoder.decode(requestQueryString, "UTF-8");
	
	/*
	String chk_loc = "//sgis.kostat.go.kr/view/statsMe/statsMeMain";
	if(param == null || !param.equals("0")){
		int j = -1;
		if(userAgent != null && !userAgent.equals("")){
			for(int i = 0; i < mobileOs.length; i++){
				j = userAgent.indexOf(mobileOs[i]);
				if(j > -1 ){
					chk_loc = "//sgis.kostat.go.kr/mobile/m2020/map/statsMe/statsMeMap.sgis";
					break;
				}
			}
		}
	}
	*/
	
	System.out.println("sUrl [" + sUrl);
	
    /*
    response.setStatus(301);
	response.setHeader("Location", sUrl);
	response.setHeader("Connection", "close");
	*/
	
	//response.sendRedirect(sUrl);
	
	InputStream data;
		String contentType = "";
		byte [] arrReaded = null;
		byte [] arrEncoded = null;	
	URL url = new URL(sUrl);
			URLConnection connection = url.openConnection();
			System.out.println("[proxy_heritage.jsp] 11111111");
			
			//connection.setRequestProperty("Content-type", "image/png");
			
			/*
			//connection.setConnectTimeout(3000);
			data = connection.getInputStream();
			
			System.out.println("[proxy_heritage.jsp] 222222222");
			
			contentType = connection.getContentType();
			
			System.out.println("[proxy_heritage.jsp] 3333333333");
			
			arrReaded = IOUtils.toByteArray( data );
			arrEncoded = Base64.encodeBase64( arrReaded );
			
			
			System.out.println( "data[" + data + "] " );
			System.out.println( "arrReaded[" + arrReaded + "] " );
			System.out.println( "arrEncoded[" + arrEncoded + "] " );
			
			//response.setHeader("Content-Type", "image/png");
	        //response.setHeader("Content-Disposition", "filename=����ڸ���Ʈ.xls");
	        */
	        
	        
	        BufferedReader in = null;
			in = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
			//in = new BufferedReader(new InputStreamReader(data, "UTF-8"));
			String line2 = "";
			while((line = in.readLine()) != null) { 
				
				line2 = line2 + line;
			}
	        System.out.println( "line2[" + line2 + "] " );
	        out.println(line2);
	        
	        
	        
	        /*
	        byte b[] = new byte[10 * 1024 * 1024];
	        //BufferedInputStream fin = new BufferedInputStream(new FileInputStream(file));
            BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
            try {
                int read = 0;
                while ((read = data.read(b)) != -1){
                
                    System.out.println( "read[" + read + "] " );
                
                            outs.write(b,0,read);
                }
                outs.close();
                data.close();
                out.clear();
                out = pageContext.pushBody();
            }
            catch(IllegalArgumentException e) {
            	System.out.println("ó���� ������ �߻��Ͽ����ϴ�.");
            }
            catch(Exception e) {
            	System.out.println("ó���� ������ �߻��Ͽ����ϴ�.");
            }
            finally {
            	outs.close();
                data.close();
                out.clear();
            }
	        */
	
%>