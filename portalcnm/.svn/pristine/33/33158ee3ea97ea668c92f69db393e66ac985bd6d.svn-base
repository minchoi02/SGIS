<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.gpki.gpkiapi.cert.*" %>
<%@ page import="com.gpki.gpkiapi.cms.*" %>
<%@ page import="com.gpki.gpkiapi.util.*" %>
<%@ page import="com.dsjdf.jdf.Logger" %>
<%@ page import="kostat.sop.ServiceAPI.common.security.SecureDB" %>


<%@ include file="./gpkisecureweb.jsp" %>

<%
            X509Certificate cert = null;
            byte[] signData = null;
            byte[] privatekey_random = null;
            String signType = "";
            String queryString = "";
            
            cert = gpkirequest.getSignerCert();
	         Logger.debug.println(this, "cert : " + cert);
            String subDN = cert.getSubjectDN();
	         Logger.debug.println(this, "subDN : "+cert.getSubjectDN());
	         String subjectUID = cert.getSubjectUID();
	         Logger.debug.println(this, "subjectUID : "+ cert.getSubjectUID());	         
	         Logger.debug.println(this, "serialNumber : "+ cert.getSerialNumber());	
	         
            
            int message_type =  gpkirequest.getRequestMessageType();
	         Logger.debug.println(this, "message_type : "+message_type); 
            if( message_type == gpkirequest.ENCRYPTED_SIGNDATA || message_type == gpkirequest.LOGIN_ENVELOP_SIGN_DATA ||
                message_type == gpkirequest.ENVELOP_SIGNDATA || message_type == gpkirequest.SIGNED_DATA){
				signData = gpkirequest.getSignedData();
                if(privatekey_random != null) {
                    privatekey_random   = gpkirequest.getSignerRValue();
                }
                signType = gpkirequest.getSignType();
            }       
            
            queryString = gpkirequest.getQueryString();	
            
            String alert = (String)request.getParameter("alert");
           

%>


<html>
<head>
<title>SGIS 占쏙옙占쌘삼옙占쏙옙트(CNM)</title> 
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<link rel="stylesheet" href="./../include/css/login.css" />
<script type="text/javascript" src="/s-portalcnm/js/common/includeHead.js"></script>
<script language='text/javascript' src="../../js/common/common.js"></script>
<script src="/s-portalcnm/js/common/common.js"></script>


<script type="text/javascript" src="/s-portalcnm/js/CM/gpkiLogin.js"></script>




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

<script type='text/javascript' src='/s-portalcnm/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
<script type='text/javascript' src='/s-portalcnm/js/plugins/jquery.sha256.js'></script>



</head>

<body>
	<div class="wrapper">
		<!-- cls:header start -->
			<div class="header">
				<div class="defaultbox">
					<div class="logo"><a href="#"><img src="./../include/img/pic/pic_logo.png" alt="logo" /></a></div>
					<div class="navi">
						<a href="#">占싸깍옙占쏙옙</a>
						<a href="#">SITEMAP</a>
						<a href="#">占쏙옙占쏙옙占쏙옙占쏙옙占쏙옙</a>
					</div>
				</div>
			</div>
			<!-- cls:header end -->
			<div class="location">
				<p>
					<a href="#"><img src="./../include/img/ico/ico_home.png" alt="home"/></a>
					<span><img src="./../include/img/ico/ico_navi.png" alt="占쏙옙占쏙옙"/></span>
					<span class="fontS">占싸깍옙占쏙옙</span>
				</p>
			</div>
			<div class="myWrapper">				
				<input type="hidden"  id='manager_id' value="<%=SecureDB.encryptSha256(cert.getSubjectDN())%>" />	
				<input type="hidden"  id='gpki_key' value="<%=cert.getSerialNumber() %>" />
				<input type="hidden"  id='manager_nm' value="<%=subjectUID%>" />
			</div>		
		</div>		
		<!-- cls:footer start -->
		<div class="footerWrapper">
			<div class="footer">
				<p class="footerLogo"><img src="./../include/img/pic/pic_footer.png" alt="footer logo"/></p>
				<p class="footerFont">占쏙옙占쏙옙占�占쏙옙占쏙옙 청占쏙옙占�189 占쏙옙占시삼옙釜占쏙옙占�TEL : 02-2012-9114 / SGIS 占쏙옙占쏙옙占�TEL : 042-481-2342 / 占쌘뤄옙占쏙옙占쏙옙占쏙옙占쏙옙 TEL : 042-481-2438<br/>copyright statistics korea. all rights reserved. sinse 1996</p>
			</div>
	</div>

</body>
</html>
