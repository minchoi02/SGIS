<%@ page contentType="text/html;charset=utf-8" %>
<%@	page import="java.sql.*, java.io.*, java.net.*, java.util.*" %>

<%@ include file="./gpkisecureweb.jsp" %>
<%@ page import="com.gpki.servlet.GPKIHttpServletResponse" %>

<%
    /*ip 확인 */	
	String accessIP=(String)request.getRemoteAddr();
	
	try{
	 	String sql = "SELECT count(*) FROM mng_dt_accessmng WHERE IP=? AND PERMIT_YN='Y' ";	
	 	Class.forName("kr.co.realtimetech.kairos.jdbc.kairosDriver");
	 	Connection con = DriverManager.getConnection("jdbc:kairos://10.184.95.10:50002/SGISDB;dbmeta=upper","root","root"); //운영
	 	//Connection con = DriverManager.getConnection("jdbc:kairos://10.184.85.23:60000/SGISDB;dbmeta=upper","root","root"); //개발

	 	PreparedStatement pstmt = con.prepareStatement(sql);
       	pstmt.setString(1, accessIP);
       	//pstmt.setString(1, "test");
       	ResultSet rs=pstmt.executeQuery();
        Logger.debug.println(this,"rs" + rs);
        int count=0;
        while(rs.next()) { 
		    int i=1;
		    count = Integer.parseInt(rs.getString(i++));
		    Logger.debug.println(this,"count" + count);
  		} 
  		
  		if (rs!=null) { 
		   try {
		      rs.close();
		   } catch (SQLException e) {
		   }
		}
  
		if(pstmt!=null) {
		   try {
		      pstmt.close();
		   } catch (SQLException e) {
		   }
		}
		  
		if(con!=null) {
		   try {
		      con.close();
		   } catch (SQLException e) {
		   }
		}
        Logger.debug.println(this,rs);	
         Boolean isAccess= true;
	 	if(count== 0){
			response.sendRedirect("/html/common/noAuth.html");
		}
	}
	catch (Exception e) {
			Logger.debug.println(this,e);	
	}
	
	String challenge = ((GPKIHttpServletResponse)gpkiresponse).getChallenge();	
	Logger.debug.println(this, "challenge: " + challenge);
	
	String sessionid = gpkirequest.getSession().getId();	
	String url = javax.servlet.http.HttpUtils.getRequestURL(request).toString();
	session.setAttribute("currentpage",url);

	String alert = (String)request.getParameter("alert");
 	if(alert != null) {
            %>
            	<script>alert('다른 위치에서 로그인 하여 로그아웃 되었습니다.');</script>
            <%
    }
%>

<html>
<head>
<title>SGIS 관리자사이트(CNM)</title> 
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> 
<link rel="stylesheet" href="./../include/css/login.css" />




<script type="text/javascript" src="../../client/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="./../include/js/default.js"></script>
<script language='javascript' src='../../client/object.js'></script>


	<script type="text/javascript" src="/s-portalcnm/client/GPKIWeb/js/ext/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GPKIWeb/js/ext/jquery-ui.min.js"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GPKIWeb/js/ext/jquery.blockUI.js"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GPKIWeb/js/ext/json2.js"></script>

	<script type="text/javascript" src="/s-portalcnm/client/GPKIWeb/js/GPKIWeb_Config.js"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GPKIWeb/js/ext/GPKI_Config.js"></script>

	<script type="text/javascript" src="/s-portalcnm/client/gpkijs_1.2.1.3.min.js" id="DSgpkijs"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GenerateContent.js" id="DSGenInterface"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GPKISecureWebJS.js"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GPKIJS_Crypto.js" id="DSGPKIJS_Crypto"></script>
	
	<script type="text/javascript" src="/s-portalcnm/client/GPKIErrorText.js" ></script>
	<script type="text/javascript" src="/s-portalcnm/client/var.js"></script>
	<script type="text/javascript" src="/s-portalcnm/client/GPKISecureWebNP2.js"></script>


<script>
//mng_s 20210303 이진호
//운영 관리자 로그인 화면에서 http 로 접근 시 https 로 변경되게 수정
$(document).ready(function(){
	if(location.protocol == 'http:'){
		location.href = location.href.replace('http:','https:');
	}
});
//mng_e 20210303 이진호
</script>

</head>

<body>
	<div class="wrapper">
		<!-- cls:header start -->
			<div class="header">
				<div class="defaultbox">
					<div class="logo"><a href="https://sop.kostat.go.kr" target="_self"><img src="./../include/img/pic/pic_logo.png" alt="logo" /></a></div>
					<!--<div class="navi">
						<a href="#">로그인</a>
						<a href="#">SITEMAP</a>
						<a href="#">마이페이지</a>
					</div>-->
				</div>
			</div>
			<!-- cls:header end -->
			<div class="location">
				<p>
					<a href="#"><img src="./../include/img/ico/ico_home.png" alt="home"/></a>
					<span><img src="./../include/img/ico/ico_navi.png" alt="다음"/></span>
					<span class="fontS">로그인</span>
				</p>
			</div>
			<div class="loginWrapper">
				<div class="loginInfo"><img src="./../include/img/pic/pic_login.png" alt="로그인"/></div>
				<div class="login">
					<a href="./gpkiLogin.jsp?challenge=<%=challenge%>" onclick="LoginLink(this,'<%=sessionid%>'); return false;" ><img src="./../include/img/btn/btn_login.png" alt="로그인 버튼"/></a>				
					<a href="./gpkiLoginForm.jsp?challenge=<%=challenge%>" onclick="LoginLink(this,'<%=sessionid%>'); return false;"><img src="./../include/img/btn/btn_authentication.png" alt="인증서등록"/></a>
				<input type="hidden"  id='keysec' value="2" />
				</div>			
			</div>
			
			<!-- mng_s 20220329 인덱스 페이지에서 로그인 페이지로 바로 넘어오지 않기 때문에 아래 코딩 해놓음. 추 후 곧바로 로그인 페이지로 오게 해달라고 할 경우 아래 코드 사용하면 됨  -->
			<!-- 
			<div style="margin:0 auto; width:978px; border:1px solid #cacaca;  overflow:hidden; margin-top:-40px; margin-bottom:20px;">
				<div style="float:left;">&nbsp; * 미설치 PC의 경우 다운로드 후 설치 및 브라우저 재시작</div><br />
				<div style="float:right;"><a href="/s-portalcnm/client/setup/GPKISecureWebSetup.exe" id="downloadlink"><img src="/s-portalcnm/image/install/btn_install_down.gif" alt="" /></a>&nbsp;</div>
			</div>
			 -->
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
</body>
</html>