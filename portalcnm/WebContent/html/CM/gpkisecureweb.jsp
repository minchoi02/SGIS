<%@ page import="com.gpki.io.GPKIJspWriter" %>
<%@ page import="com.gpki.servlet.GPKIHttpServletRequest" %>
<%@ page import="com.gpki.servlet.GPKIHttpServletResponse" %>
<%@ page import="com.gpki.secureweb.GPKIKeyInfo" %>
<%@ page import="com.dsjdf.jdf.*" %>
<%@ page import="java.net.*"%>
<%
    GPKIHttpServletResponse gpkiresponse = null;
    GPKIHttpServletRequest gpkirequest = null;

    try{
    
		Logger.debug.println(this, "============================= Start 111 ===========================");
        gpkiresponse=new GPKIHttpServletResponse(response); 
Logger.debug.println(this, "============================= Start 222 ===========================");
	    gpkirequest= new GPKIHttpServletRequest(request);
	    Logger.debug.println(this, "============================= Start 333 ===========================");
        gpkiresponse.setRequest(gpkirequest);
        Logger.debug.println(this, "============================= Start 444 ===========================");
Logger.debug.println(this, "GPKISession : [ " + session.getAttribute("GPKISession") + " ]"  );     
        out=new GPKIJspWriter(out,(GPKIKeyInfo)session.getAttribute("GPKISession"));  
Logger.debug.println(this, "[current_thread]["+Thread.currentThread()+"] gpkisecureweb ref= " + out.toString());             
    }catch(Exception e){

Logger.debug.println(this, "EXCEPTION : " + e);             
        com.dsjdf.jdf.Config dsjdf_config = new com.dsjdf.jdf.Configuration();
        StringBuffer sb=new StringBuffer(1500);
        sb.append(dsjdf_config.get("GPKISecureWeb.errorPage"));
        sb.append("?errmsg=");
        sb.append(URLEncoder.encode(e.getMessage()));
        
        response.sendRedirect(sb.toString()) ;  
	
		return; 
    }
    
%>