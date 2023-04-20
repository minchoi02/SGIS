<%@ page language="java" import="java.io.*,java.net.*" contentType="application/vnd.ms-excel;charset=utf-8"%>

<%

request.setCharacterEncoding("UTF-8");

//response.setHeader("Content-Type","Application/vnd.ms-excel;charset=utf-8");
//response.setHeader("Content-Disposition","attachment;filename=serviceUseStat.xls");

response.reset();



String htmlStr0 = "";
String htmlStr1 = "";
String htmlStr2 = "";
String htmlStr3 = "";
String htmlStr4 = "";
String htmlStr5 = "";
String htmlStr6 = "";

String exfilename = "";
htmlStr0 = request.getParameter("htmlStr0");
htmlStr1 = request.getParameter("htmlStr1");
htmlStr2 = request.getParameter("htmlStr2");
htmlStr3 = request.getParameter("htmlStr3");
htmlStr4 = request.getParameter("htmlStr4");
htmlStr5 = request.getParameter("htmlStr5");
htmlStr6 = request.getParameter("htmlStr6");


exfilename = request.getParameter("exfilename");

if(exfilename == null || "".equals(exfilename)) {
	return;
} else {
	exfilename = exfilename.replaceAll("\r", "").replaceAll("\n", "");
}
if(request.getHeader("User-Agent").indexOf("MSIE 5.5") > -1)
	{
	    response.setHeader("Content-Type", "doesn/matter;");
	    response.setHeader("Content-Disposition", "; filename=" + exfilename);
	}else{
	    response.setHeader("Content-Type", "application/vnd.ms-excel;charset=utf-8");
	    response.setHeader("Content-Disposition", "attachment; filename=" + exfilename);
	    response.setHeader("Content-Description", "JSP Generated Data");
	}

String a = "-";

%>

<html>
<head lang="ko">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style type='text/css'>

.table1 {margin:5px 0px 0px 0px; padding:0px; border-collapse:collapse;}
.table1 caption{display: none;}
.table1 th{color:#33698f; background-color:#e3f0f9; border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px; font-size:12px;}
.table1 td{font-weight:normal;text-align:justify;  border-right:1px solid #cbcfd2; border-bottom:1px solid #cbcfd2; padding:5px 7px;}
.table1 .t_end{ border-right:none; }
.table1 .td_top{ border-top:2px solid #72aacf;}
.table1 .td_bottom{ border-bottom:none;}
.table1 .cell_left {text-align:left;}
.table1 .cell_right{text-align:right;}
.table1 .cell_center{text-align:center;}
.table1 .cell_point {background:#f3faff;}
.table1 a:link{font-weight:normal;}
.table1 a:active{font-weight:normal;}
.table1 a:visited{font-weight:normal;}
.table1 a:hover{font-weight:normal;}

</style>
</head>
<body>
	
				<table class="table1" id="serviceTable">
					<%=htmlStr0 %>
				</table>
				
				<% 
				if(!"".equals(htmlStr1)){
				%>
				<table class="table1" id="serviceTable1">
					<%=htmlStr1 %>
				</table>
				<%
				}
				%>
	
				
				<% 
				if(htmlStr2 != null){
				%>
				<table class="table1" id="serviceTable2">
					<%=htmlStr2 %>
				</table>
				<%
				}
				%>
	
				
				<% 
				if(htmlStr3 != null){
					
					System.out.println("htmlStr3" + htmlStr3); 
				%>
				<table class="table1" id="serviceTable3">
					<%=htmlStr3 %>
				</table>
				<%
				}
				%>
	
				
				<% 
				if(htmlStr4 != null){
				%>
				<table class="table1" id="serviceTable4">
					<%=htmlStr4 %>
				</table>
				<%
				}
				%>
	
				
				<% 
				if(htmlStr5 != null){
				%>
				<table class="table1" id="serviceTable5">
					<%=htmlStr5 %>
				</table>
				<%
				}
				%>
	
				
				<% 
				if(htmlStr6 != null){
				%>
				<table class="table1" id="serviceTable6">
					<%=htmlStr6 %>
				</table>
				<%
				}
				%>
	
				
	
</body>