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
	         Logger.debug.println(this, "subDN : "+ SecureDB.encryptSha256(cert.getSubjectDN()));
	         String subjectUID = cert.getSubjectUID();
	         Logger.debug.println(this, "subjectUID : "+ SecureDB.encryptSha256(cert.getSubjectUID()));	         
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

%>


<html>
<head>
<title>SGIS 관리자사이트(CNM)</title> 
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/> 
<link rel="stylesheet" href="./../include/css/login.css" />

<script type="text/javascript" src="../../js/common/includeHead.js"></script>
<script language='text/javascript' src="../../js/common/common.js"></script>
<script language='javascript' src='../../js/common/var.js'></script>
<script language='javascript' src='../../js/common/GPKIFunc.js'></script>
<script language='javascript' src='../../js/common/object.js'></script>
<script type="text/javascript" src="../../js/CM/gpkiLoginForm.js"></script>
<script src="/s-portalcnm/js/common/common.js"></script>
<script type="text/javascript" src="./../include/js/default.js"></script>

</head>

<body>

	<div class="wrapper">
		<!-- cls:header start -->
			<div class="header">
				<div class="defaultbox">
					<div class="logo"><a href="#"><img src="./../include/img/pic/pic_logo.png" alt="logo" /></a></div>
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
			<div class="myWrapper">
				<div class="myTitle">기본정보</div>
				<div class="myBtn">	
					<a href="javascript:gpkiJoinForm.gpkiInfoReg();" ><img src="./../include/img/btn/btn_confirm02.png" alt="승인요청"/></a>					
				</div>
				<table class="useTable" summary="기본정보">
					<caption>기본정보입니다.</caption>
					<colgroup>
						<col width="141"/>
						<col width="326"/> 
						<col width="141"/>
						<col width=""/> 
					</colgroup>
					<tbody>
					<tr>	
						<input type="hidden"  id='manager_id' value="<%=SecureDB.encryptSha256(cert.getSubjectDN())%>" />
						<input type="hidden"  id='gpki_key' value="<%=cert.getSerialNumber() %>" />						
						<th>성명</th>
						<td ><input type="hidden"  id='manager_nm1' value="<%=subjectUID%>" /><input type="text" id='manager_nm' name='manager_nm'  value="" readonly='readonly'/></td> 
						<th class="right">이메일</th>
						<td ><input type="text" id='email' value="" class="input_use02"/></td>
					</tr> 
					<tr>
						<th>직급</th>
						<td ><input type="text" id='job_pos' value="" class="input_use02"/></td> 
						<th class="right">부서</th>
						<td ><input type="text" id ='dept' value="" class="input_use02"/></td>
					</tr>
					<tr>
						<th>전화번호</th>
						<td >
							<select class="input_use04" id='tel_no1'>
								<option>010</option>								
								<option>011</option>
								<option>016</option>
								<option>018</option>
								<option>019</option>
							</select>
							<input type="text" id='tel_no2' maxlength="4" value="" class="input_use01"/>
							<input type="text" id='tel_no3' maxlength="4" value="" class="input_use01"/>
							<input type="hidden" id='tel_no' value="020000000" class="input_use01"/>								
						</td> 
						<th class="right">내선번호</th>
						<td ><input type="text" id='ext_no' value="" class="input_use01"/></td>
					</tr>
					<tr>
						<th>핸드폰</th>
						<td  colspan="3" >
							<select class="input_use04" id='cp_no1'>
								<option>010</option>								
								<option>011</option>
								<option>016</option>
								<option>018</option>
								<option>019</option>
							</select>
							<input type="text"  id='cp_no2' maxlength="4" value="" class="input_use01"/>
							<input type="text" id='cp_no3' maxlength="4" value="" class="input_use01"/>
							<input type="hidden" id='cp_no' value="0101001000" class="input_use01"/>
						</td> 
					</tr>					
					</tbody>
				</table>				
			</div>		
		</div>		
		
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
</body>
</html>
