<%
/**************************************************************************************************************************
* Program Name  : 회원가입 JSP  
* File Name     : signUp.jsp
* Comment       : 
* History       : 네이버시스템 2018-01-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<link href="resources/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
<link href="resources/styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
<link href="resources/styles/kendo.default.mobile.min.css" rel="stylesheet" type="text/css" />

<script src="resources/js/jquery.min.js"></script>

<script src="${pageContext.request.contextPath}/js/account/signUp.js"></script>

<!-- 회원가입 팝업창 -->
<div id="signUpBox"  style="display:none;">
	<div class="signUpArea">
		<div class="RegForm">
			<form id="regform" name="regform" action="/auth/user/regcert" method="POST">
			
				<!-- 로그인정보 영역 -->
				<div class="subTitleArea"><span class="subTitle">로그인 정보</span></div>
				<div class="signUpSubArea">
					<table>
						<tbody>
							<tr>
								<th><span class="require_item">*</span>아이디</th>
								<td class="w270">
									<input id="user_id" name="user_id" maxlength="20" placeholder="영문(소문자), 숫자 5~20자 이내" type="text" tabindex="1" style="text-transform:lowercase;" onkeyup="javascript:$input.keyValidation(event, this, 'id');">
								</td>
								<td><button id="btn-duplicate" class="wColor" type="button">아이디 중복 확인</button></td>
							</tr>
							<tr>
								<th><span class="require_item">*</span>비밀번호</th>
								<td class="w270">
									<input id="user_pw" name="user_pw" maxlength="16" placeholder="영문+숫자+기호, 8자~16자" type="password" tabindex="2" onkeyup="javascript:$input.keyValidation(event, this, 'password');">
								</td>
							</tr>
							<tr>
								<th><span class="require_item">*</span>비밀번호 확인</th>
								<td class="w270">
									<input id="user_pw2" name="user_pw2" maxlength="16" placeholder="" type="password" tabindex="3" onkeyup="javascript:$input.keyValidation(event, this, 'password');"/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				
				<!-- 사용자정보 영역 -->
				<div class="subTitleArea"><span class="subTitle">사용자정보</span></div>
				<div class="signUpSubArea">
					<table>
						<tbody>
							<tr>
								<th><span class="require_item">*</span>이름</th>
								<td class="w270">
									<input id="user_nm" name="user_nm" maxlength="20" placeholder="2~20자 이내" type="text" tabindex="4" />
								</td>
							</tr>
							<tr>
								<th><span class="require_item">*</span>소속</th>
								<td class="w270" >
									<select id="institute" name="inst_seq" tabindex="5" class="selectpicker">
											<c:forEach items="${institutionList}" var="data" varStatus="status">
											<option id="${data.inst_seq}" value="${data.inst_seq}" tabindex="${status.index + 99}" >${data.inst_nm}</option>
											</c:forEach>
									</select>
									</div>
								</td>
							</tr>
							<tr>
								<th><span class="require_item">*</span>부서</th>
								<td class="w270">
									<input id="dept" name="dept" maxlength="20" placeholder="2~20자 이내" type="text" tabindex="6"/>
								</td>
							</tr>
							<tr>
								<th><span class="require_item">*</span>이메일</th>
								<td class="w270">
									<input id="email" name="email" maxlength="250" placeholder="이메일 형식으로 입력하세요." type="text" tabindex="7"/>
								</td>
							</tr>
							<tr>
								<th><span class="require_item">*</span>연락처</th>
								<td class="w270">
									<input id="tel_no" name="tel_no" maxlength="30" placeholder="핸드폰(-기호제외)" type="text" tabindex="8"/>
								</td>
								<td>
									<button id="btn-add-contact" class="wColor" type="button" >연락처 추가</button>
								</td>
							</tr>
							<tr id="phoneArea" style="display:none;">
								<th><span style="margin-right:12px;"> </span>연락처2</th>
								<td class="w270">
									<input id="tel_no2" name="tel_no2" maxlength="30" placeholder="일반전화(-기호제외)" type="text" tabindex="9"/>
								</td>
								<td>
									<button id="btn-cancel-contact" class="wColor" type="button" >연락처 추가 취소</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</form>
		</div>
	</div>
		
	<div id="reg-footer" class="signUpFooterArea">	
		<div class="footerBtnBox" >
			<button id="join" >가입신청</button>
			<button id="cancel"  class="wColor" >취소</button>
		</div>
	</div>
	
	<!-- 아이디 중복확인 팝업창 -->
	<div id="idDuplicatePopup" style="display:none;">
		<div id="popup-duplicate" class="signUpArea">
			<table>
		 		<tr>
		 			<th style="width:80px;">아이디</th>
		 			<td><input type="text" name="user_id" id="idCheck_user_id" onkeyup="javascript:$input.keyValidation(event, this, 'id');"></td>
		 			<td><button type="button" id="btn-confirm" class="wColor">중복확인</button></td>
		 		</tr>
		 	</table>
		 	<div class="informations">
		 		<p>아이디는 영문(소문자), 숫자로 5~20자 이내로 입력해주십시오.</p>
		 		<p>공백 또는 특수문자가 포함된 아이디는 사용할 수 없습니다.</p>
		 		<p>숫자로 시작하거나, 숫자로만 이루어진 아이디는 사용할 수 없습니다.</p>
		 	</div>
		 	<div class="btns">
		 		<button  id="btn-use" class="blue-btns" style="display:none;">사용하기</button>
		 	</div>
		</div>
 	</div>
	
	
</div>