<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.net.*" %>
<%@ page import="java.io.BufferedInputStream" %>
    
<%
	String[] allowedHosts = {
		//local
			request.getServerName()+":"+request.getServerPort(), 
			"kosis.kr",
			"link.kostat.go.kr",
			"sgis.kostat.go.kr",
			"sgisapi.kostat.go.kr",
			"localhost"
	};
	HttpURLConnection con = null;
	try {
		String reqUrl = request.getQueryString();
		String decodedUrl = "";
		if (reqUrl != null) {

		} else {
			response.setStatus(400);
		}
		reqUrl = reqUrl.replaceAll(" ", "%20");
		
		String host = "";
		host = reqUrl.split("\\/")[2];
		boolean allowed = false;
		
		for (String surl : allowedHosts) {
			if (host.equalsIgnoreCase(surl)) {
				allowed = true;
				break;
			}
		}
		
		if(allowed) {
			String[] subUrl = reqUrl.split("\\/");
			String modifyUrl = subUrl[0] + "/" + subUrl[1] + "/" + subUrl[2];
			
			for(int i=0; i<subUrl.length; i++){
				if(i>2){
					modifyUrl = modifyUrl + "/" + URLEncoder.encode(subUrl[i], "UTF-8");
				}
			}
			
			//mng_s 20220315 개발서버에서 프록시가 않되서 호스트 네임으로 구분해서 처리함
			String hostName = InetAddress.getLocalHost().getHostName();
			System.out.println("[AdministStatsController.java] hostName [" + hostName);
			System.out.println("[AdministStatsController.java] reqUrl [" + reqUrl);
			if(  "mangWASZ".equals(hostName)  ) {
				reqUrl = reqUrl.replace("link.kostat.go.kr", "10.182.31.53:10190"); //개발서버
			} else {
				
			}
			
			URL url = new URL(reqUrl);

			con = (HttpURLConnection)url.openConnection();
			con.setRequestMethod("POST"); // HTTP POST 메소드 설정
			con.setDoOutput(true); // POST 파라미터 전달을 위한 설정
			con.setConnectTimeout(10000);
			con.setReadTimeout(10000);
			String reqContenType = request.getContentType();
			if(reqContenType != null) {
				//con.setRequestProperty("Content-Type", reqContenType);
				con.setRequestProperty("Content-Type", "application/json");
			}
			else {
				con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
				//con.setRequestProperty("Content-Type", "application/json");
			}
			
			int clength = request.getContentLength();
			if(clength > 0) {
				con.setDoInput(true);
				byte[] idata = new byte[clength];
				request.getInputStream().read(idata, 0, clength);
				con.getOutputStream().write(idata, 0, clength);
			}

			response.setContentType(con.getContentType());
			BufferedInputStream bis = new BufferedInputStream(con.getInputStream());
			int bytesRead;
			byte[] buffer = new byte[256];
			
			while((bytesRead = bis.read(buffer)) > 0){
				response.getOutputStream().write(buffer, 0, bytesRead);
			}
			response.getOutputStream().flush();
			bis.close();
		}
		else {
			response.setStatus(502);
		}
	} catch(Exception e) {
		System.out.println(response);
		response.setStatus(500);
		byte[] idata = new byte[5000];
		
		if(con.getErrorStream() != null) {
			con.getErrorStream().read(idata, 0, 5000);
		}
	}
%>