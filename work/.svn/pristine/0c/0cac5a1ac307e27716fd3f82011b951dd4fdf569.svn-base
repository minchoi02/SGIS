<%
/**************************************************************************************************************************
* Program Name  : 아이디/비밀번호 찾기 JSP  
* File Name     : findIdAndPwd.jsp
* Comment       : 
* History       : 네이버시스템 2018-01-29
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="${pageContext.request.contextPath}/js/account/findIdAndPwd.js"></script>

<!-- 아이디  찾기 팝업창 -->
<div id="findIdBox" style="display:none;">
	<div id="popup-duplicate" class="signUpArea">
	 	<table>
	 		<tr>
	 			<th>이름</th>
	 			<td class="w350" ><input type="text"  id="findId_user_nm" class="w350" name="findId_user_nm" placeholder="이름을 입력하세요." maxlength="20"></td>
	 		</tr>
	 		<tr>
				<th>이메일</th>
				<td class="w350" ><input type="text" id="findId_email" class="w350" name="findId_email" placeholder="이메일을 입력하세요." maxlength="100"/></td>
			</tr>
	 	</table>

		<div style="text-align: center;">
			<button type="button" id="btn-idFind" >아이디 찾기</button>
		</div>
 	</div>
</div>

<!-- 비밀번호  찾기 팝업창 -->
<div id="findPwdBox" style="display:none;">
	<div id="popup-duplicate" class="signUpArea">
	 	<table>
	 		<tr>
	 			<th style="width: 80px;">아이디</th>
	 			<td class="w350" ><input type="text" id="findPwd_user_id" class="w350"  name="findPwd_user_id" placeholder="아이디" maxlength="20"></td>
	 		</tr>
	 		<tr>
	 			<th>이름</th>
	 			<td class="w350"><input type="text" id="findPwd_user_nm" class="w350"  name="findPwd_user_nm" placeholder="이름" maxlength="20"></td>
	 		</tr>
	 		<tr>
				<th>이메일</th>
				<td class="w350" ><input type="text" id="findPwd_email" class="w350"  name="findPwd_email" placeholder="이메일" maxlength="100"/></td>
			</tr>
	 	</table>

		<div class="findPwHelpArea">
			<span>※비밀번호가 초기화 됩니다.<br>회원정보관리에서 비밀번호를 변경해 주시기 바랍니다.</span>
		</div>
		<div style="text-align: center;">
			<button type="button" id="btn-pwdFind" >비밀번호 재발급</button>
		</div>
 	</div>
</div>