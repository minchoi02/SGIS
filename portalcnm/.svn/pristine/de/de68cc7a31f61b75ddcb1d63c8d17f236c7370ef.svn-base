<%@ page language="java" import="java.io.*,java.net.*" %>
<%@ page import="com.dsjdf.jdf.Logger" 
	contentType="text/xml; charset=utf-8"    
pageEncoding="utf-8"%>
<%
//, com.dsjdf.jdf.Logger
//url: "/ServiceAPI/share/useBoardInfo.json", 
//	data:{	
//			"gubun" 		: "useBoardListConfirm",
//			"searchEndDate" : searchEndDate,
//			"searchStartDate" : searchStartDate,
//			"sgisProgressStat" 	: sgisProgressStat, 
//			"nowPage"		: nowPage
	String contextUrl = "http://211.34.86.52:8080"; 
//	contextUrl = "211.34.86.50:8080";
	contextUrl = "http://localhost:8080";
	//contextUrl = "http://sgis.kostat.go.kr";
	String gubun = request.getParameter("gubun");
	String searchEndDate = request.getParameter("searchEndDate");
	String searchStartDate = request.getParameter("searchStartDate");
	String sgisProgressStat = request.getParameter("sgisProgressStat");
	String nowPage = request.getParameter("nowPage");
	String code = request.getParameter("code");
	String sgisUseBoardSeq = request.getParameter("sgisUseBoardSeq");
	String prioritize = request.getParameter("prioritize");
	String rtnrsn = request.getParameter("rtnrsn");
	String buffer = "";
	
	
		String getUrl = "";
		getUrl = contextUrl + "/ServiceAPI/share/useBoardInfo.json?gubun=" + gubun + "&searchEndDate=" + searchEndDate + "&searchStartDate=" + searchStartDate + "&sgisProgressStat=" + sgisProgressStat + "&nowPage=" + nowPage;
		getUrl = getUrl + "&code=" + code;
		getUrl = getUrl + "&sgisUseBoardSeq=" + sgisUseBoardSeq;
		getUrl = getUrl + "&prioritize=" + prioritize;
		getUrl = getUrl + "&rtnrsn=" + rtnrsn;

		Logger.info.println(this,"getUrl is : " + getUrl);
		try{
			//	URL url = new URL(request.getParameter("getUrl"));
				URL url = new URL(getUrl);
				
				URLConnection connection = url.openConnection();
				connection.setRequestProperty("CONTENT-TYPE","text/html"); 
			
				HttpURLConnection hurlc = (HttpURLConnection)connection;
				hurlc.setRequestMethod("POST");
				hurlc.setDoOutput(true);
				hurlc.setUseCaches(false);
				hurlc.setDefaultUseCaches(false);
			
			    
			    PrintWriter out2 = new PrintWriter(hurlc.getOutputStream());
				out2.println();
				out2.close();
			
				BufferedReader in = new BufferedReader(new InputStreamReader(hurlc.getInputStream()));
			    String inputLine;
			    
			    
			    while ((inputLine = in.readLine()) != null){
			     	buffer += inputLine.trim();
			    }
			    Logger.debug.println(this,"buffer : " + buffer);
			    Logger.info.println(this, "buffer : " + buffer);
			    in.close();
		}catch(Exception e){
			Logger.debug.println(this,"에러 : " + e);
			Logger.info.println(this,"에러 : " + e);
		}
%><%=buffer%>