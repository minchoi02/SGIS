<%@ page contentType="text/html;charset=euc-kr" %>
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
<title>SGIS ���ڻ���Ʈ(CNM)</title> 
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<link rel="stylesheet" href="./../include/css/login.css" />
<script type="text/javascript" src="../../js/common/includeHead.js"></script>
<script language='text/javascript' src="../../js/common/common.js"></script>
<script language='javascript' src='../../js/common/var.js'></script>
<script language='javascript' src='../../js/common/GPKIFunc.js'></script>
<script language='javascript' src='../../js/common/object.js'></script>
<script type="text/javascript" src="../../js/CM/gpkiLogin.js"></script>
<script src="/s-portalcnm/js/common/common.js"></script>


</head>

<body>
	<div class="wrapper">
		<!-- cls:header start -->
			<div class="header">
				<div class="defaultbox">
					<div class="logo"><a href="#"><img src="./../include/img/pic/pic_logo.png" alt="logo" /></a></div>
					<div class="navi">
						<a href="#">�α���</a>
						<a href="#">SITEMAP</a>
						<a href="#">����������</a>
					</div>
				</div>
			</div>
			<!-- cls:header end -->
			<div class="location">
				<p>
					<a href="#"><img src="./../include/img/ico/ico_home.png" alt="home"/></a>
					<span><img src="./../include/img/ico/ico_navi.png" alt="����"/></span>
					<span class="fontS">�α���</span>
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
				<p class="footerFont">����� ���� û��� 189 ���û�ݼ��� TEL : 02-2012-9114 / SGIS ����� TEL : 042-481-2342 / �ڷ��������� TEL : 042-481-2438<br/>copyright statistics korea. all rights reserved. sinse 1996</p>
			</div>
	</div>

</body>
</html>
