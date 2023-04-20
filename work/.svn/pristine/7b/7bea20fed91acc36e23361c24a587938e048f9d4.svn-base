<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="org.json.JSONArray"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page trimDirectiveWhitespaces="true" %>    
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>SGISwork</title>
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/login/login.css">
	<!-- <link rel="stylesheet" type="text/css" href="/css/main/main.css" /> -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/mypage/mypage.css" />
	
	<script src="${pageContext.request.contextPath}/js/plugins/aes/AesUtil.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/aes/aes.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/aes/pdkdf2.js"></script>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/member/myPageMain.js"></script>
	
	<!-- mng_s 2019. 06. 03 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				$log.srvLogWrite("Z0", "01", "01", "01", "", "");
		});
	</script>
	<!-- mng_e 2019. 06. 03 j.h.Seok -->
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	<div class="signUpBox" >
		<!-- <div class="RegInputBgBox"> 회원정보 수정 기능 
		<div class="RegForm">
			<form id="regform" name="regform" action="/auth/user/regcert" method="POST">
				<input type="hidden" name="challenge">
				<input type="hidden" name="sessionid"> -->
				<!-- <span id="lb-legend"></span>
				<table>
					<tbody>
						<tr>
							<th>아이디</th>
							<td class="ipst">
								<input id="user_id" name="user_id" maxlength="20" placeholder="" type="text" tabindex="1" style="text-transform:lowercase;" onkeyup="javascript:$input.keyValidation(event, this, 'id');" readonly >
							</td>
							<td><button id="btn-duplicate" class="deep-btns" type="button">아이디 중복 확인</button></td>
						</tr>
						<tr> 
							<th>비밀번호</th>
							<td class="ipst">
								<input id="user_pw" name="user_pw" maxlength="16" placeholder="" type="password" tabindex="2" style="text-transform:lowercase;" onkeyup="javascript:$input.keyValidation(event, this, 'password');">
							</td>
							<td><span id="user_pw_help" class="help-block hidden" style="display:none;">영문+숫자+기호를 조합한 8자~16자만 가능합니다.</span></td>
						</tr> 
						<tr>
							<th>비밀번호 확인</th>
							<td class="ipst">
								<input id="user_pw2" name="user_pw2" maxlength="16" placeholder="" type="password" tabindex="3" style="text-transform:lowercase;" onkeyup="javascript:$input.keyValidation(event, this, 'password');"/>
							</td>
							<td><span id="user_pw2_help" class="help-block hidden" style="display:none;">비밀번호 입력을 확인해 주세요.</span></td>
						</tr>
					</tbody>
				</table> -->
				
			<!-- subMenuWrap end-->

			<div class="subConentWrap">
				<div class="subTitleWrap">
					<div class="subTitle">
						<p class="home">내 정보 ></p>
						<h1>회원정보 관리</h1>
						<h2>SGISwork 회원 정보를 관리할 수 있습니다.</h2> 
					</div>						
				</div>
				

				<!-- contents start  -->
				
				<div class="container">
					<input type="hidden" id="pageInfo" value='${pageInfo}'/>
					<!-- 
					<div class="saveinfoBox">
						<div class="sbbox">
							<span class="t01">저장공간 정보</span>
							<span class="t02" id = "used_sz"></span>
						</div>
						<div class="bar">
							<div class="gage" id = "use_gage" style="width:9%;"><span id = "use_sz">GB 사용중</span></div>
						</div>
					</div>
					
					<p class="analysisText02">회원정보 관리</p>
					<div class="wTableBox">
						<table class="wTable">
							<colgroup>
								<col width="120" />
								<col width="" />
								<col width="120" />
								<col width="" />
							</colgroup>

							<tr>
								<th>이름</th>
								<td><input type="text" class="inp01" id="user_nm" name="user_nm" maxlength="20" placeholder="" type="text" tabindex="4" disabled/></td>
								<th>E-Mail</th>
								<td><input type="text" class="inp01" id="email" name="email" maxlength="250" placeholder="" type="text" tabindex="7"/></td>
							</tr>
							<tr>
								<th>소속기관</th>
								<td>
									<select class="sel01" id="institute" name="inst_seq" tabindex="5" class="selectpicker">
										<c:forEach items="${institutionList}" var="data" varStatus="status">
										<option id="${data.inst_seq}" value="${data.inst_seq}" tabindex="${status.index + 99}" >${data.inst_nm}</option>
										</c:forEach>
									</select>
								<input type="text" class="inp01" /> </td>
								<th>부서</th>
								<td><input type="text" class="inp01" id="dept" name="dept" maxlength="20" placeholder="" type="text" tabindex="6" /></td>
							</tr>
							<tr>
								<th>휴대전화</th>
								<td><input type="text" class="inp01" id="tel_no" name="tel_no" maxlength="30" placeholder="핸드폰" type="text" tabindex="8"/></td>
								<th>직통전화</th>
								<td><input type="text" class="inp01" id="tel_no2" name="tel_no2" maxlength="30" placeholder="일반전화" type="text" tabindex="9"/></td>
							</tr> 
						</table>
					</div>
-->
					<p class="analysisText02">비밀번호 관리</p>
					<div class="wTableBox">
						<table class="wTable">
							<colgroup>
								<col width="120" />
								<col width="" />
								<col width="120" />
								<col width="" />
							</colgroup>

							<tr>
								<th>비밀번호</th>
								<td><input type="password" class="inp01" id = "pw" placeholder="영문+숫자+기호, 8자~16자"/></td> 
								<td colspan="2"><span id="user_pw_help" class="help-block hidden" style="display:none;">영문+숫자+기호를 조합한 8자~16자만 가능합니다.</span></td>
							</tr>
							<tr>
								<th>비밀번호 확인</th>
								<td><input type="password" class="inp01" id = "pw_chk"/></td>
								<td colspan="2">&nbsp;</td>
							</tr> 
						</table>
					</div>
					 
					<div class="btnBox">
						<!-- <a href="javascript:void(0)">목록</a> -->
			 			<a href="javascript:void(0)" id="update">정보 수정</a>
					</div>
					
				</div>

				<!-- contents end  -->

			</div><!-- subConentWrap end-->				

			<!-- footer -->
			<jsp:include page="/view/common/includeFooter"></jsp:include>			
				
</body>
</html>