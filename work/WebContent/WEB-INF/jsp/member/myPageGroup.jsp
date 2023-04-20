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
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/mypage/mypage.css" />
	<!-- <link rel="stylesheet" type="text/css" href="/css/main/main.css" /> -->
	
	<script src="${pageContext.request.contextPath}/js/plugins/aes/AesUtil.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/aes/aes.js"></script> 
	<script src="${pageContext.request.contextPath}/js/plugins/aes/pdkdf2.js"></script>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	
	<script src="${pageContext.request.contextPath}/js/member/myPageMain.js"></script>
	
	<!-- mng_s 2019. 06. 03 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				$log.srvLogWrite("Z0", "01", "02", "01", "", "");
		});
	</script>
	<!-- mng_e 2019. 06. 03 j.h.Seok -->
 	 
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
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
						<h1>그룹 관리</h1>
						<h2>SGISwork 사용자 그룹을 확인 할 수 있습니다.</h2> 
					</div>						
				</div>
				

				<!-- contents start  -->
				
				<div class="container">
 					<input type="hidden" id="pageInfo" value='${pageInfo}'/>
					<div class="boardSearchBox">
						<!-- <span class="e01">선택된 데이터 관리</span>
						<input type="text" class="inp01" />
						<span class="e01">부서</span>
						<input type="text" class="inp01" /> -->
					
						<span class="select" style="width:100px;height:40px;float:right;">
							<select class="cntSelectBox" id="cntSelectBox">
							<option value="5">5개 보기</option>
							<option value="10">10개 보기</option>
							<option value="20">20개 보기</option>
							</select>
						</span>
					</div>

					<table class="listTable02" >
						<colgroup>
							<col width="120" />
							<col width="150" />
							<col width="" />
							<col width="" />
							<col width="" /> 
						</colgroup>
						<tbody id="groupMember">
						</tbody>
					</table> 
					<div class="pageArea">
						<span id="groupPage"  class="pages"></span>
					</div>
					
				</div>


				<!-- contents end  -->


				
			</div><!-- subConentWrap end-->

			<!-- footer -->
			<jsp:include page="/view/common/includeFooter"></jsp:include>					
				
</body>
</html>