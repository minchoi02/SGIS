<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/codeMirror/codemirror.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/collectKosisDetail.js"></script>
	
	<script>
		
		$(document).ready(
	   			function() {
	   			 	var seq = "${seq}";
	   			 	if (seq != undefined && seq != null) {
	   			 		$collectKosisDetail.request.doReqCollectDetailInfo(seq);
	   			 	}
				});	
				
				$(function() {
				    $(".dialog").dialog({
				      autoOpen: false,
				      width: '500',
				      height: '290',
				      modal: true,
				      resizable: false,
				      minimizable: false,
				      minimizeIcon: 'ui-icon-minus'
				    });
				});


	</script>

</head>

<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
	<div class="container">
		<div class="content_new">
			<div class="sub-title">
				<strong class = "home">Kosis 자료 등록 설정</strong>
				<h2>Kosis 자료 등록설정 등록 현황</h2>
				<h3>Kosis 자료를 등록하고 확인하며 관리할 수 있습니다.</h3>
			</div>
					  	<div class="tb-tit">
							Kosis 정보 등록
						  	<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnSave" type="button">저장</button>
									<button id="btnList" type="button" onclick="location.href='collectKosis'">목록</button>
								</div>
							</div>
					  	</div><div></div>
					  	
 <div class="view-container">
			<div class="row">
			  <div class="cols">
			  	<div class="col col-1">
				  <div class="in-box">
					<div class="tbs2">
					  	<table>
					  		<colgroup>
					  			<col style="width: 20%">
					  			<col style="width: 20%">
					  			<col style="width: 20%">
					  			<col style="width: 20%">
					  			<col style="width: 20%">
					  		</colgroup>
					  		<tbody>
					  			<tr class="years">
					  				<th class = "require">년도 선택</th>
					  				<td colspan = "2">
					  					<span class="select">
									  	  <select name="year" id="year">년도</select>
									  	</span>
					  				</td>
					  			</tr>
					  			<tr class="div_item">
					  				<th class="require">선택</th>
					  				<td colspan="2">
					  					  <label for="items">항목</label>
					  				<span class="select">
									 	  <select name="divs" id="divs">
									  	    <option value="">구분</option>
										  	<option value="인구">인구</option>
									      	<option value="가구">가구</option>
										  	<option value="주택">주택</option>
										  	<option value="사업체">사업체</option>
										  	<option value="농가">농가</option>
										  	<option value="해수면">해수면</option>
										  	<option value="내수면">내수면</option>
										  	<option value="임가">임가</option>
									 	  </select>
									</span>
									</td>
									<td colspan="2">
					  					<label for="items">항목</label>
					  				<span class="select">
					 	  				<select name="items" id="items"></select>
					  				</span>
					  				</td>
					  			</tr>
					  			<tr class="user_require">
									<th class="require">등록유저</th>
									<td colspan="2">
										<span class="inputs">
                		  					<input type="text" id="reg_user_id" name="reg_user_id">
              							</span>
              						</td><td></td>
								</tr>
								<tr class="area_require">
									<th class="require">지역 - 광역시1</th>
									<td colspan="1"><h3>서울</h3><span class="inputs"><input type="text" id="sido_11" name="sido_11"></span></td>
	              					<td><h3>부산</h3><span class="inputs"><input type="text" id="sido_21" name="sido_21"></span></td>
				            	    <td colspan="1"><h3>대구</h3><span class="inputs"><input type="text" id="sido_22" name="sido_22"></span></td>
				            	    <td><h3>인천</h3><span class="inputs"><input type="text" id="sido_23" name="sido_23"></span></td>
				            	</tr>
				            	<tr class="area_require">
				            		<th class="require">지역 - 광역시2</th>
				            	    <td colspan="1"><h3>광주</h3><span class="inputs"><input type="text" id="sido_24" name="sido_24"></span></td>
				            	    <td colspan="1"><h3>대전</h3><span class="inputs"><input type="text" id="sido_25" name="sido_25"></span></td>
				            	    <td colspan="1"><h3>울산</h3><span class="inputs"><input type="text" id="sido_26" name="sido_26"></span></td>
				            	    <td colspan="1"><h3>세종</h3><span class="inputs"><input type="text" id="sido_29" name="sido_29"></span></td>
				            	    <td></td>
				            	</tr>
				            	<tr class="area_require">
				            		<th class="require">지역 - 지자체1</th>
				            	    <td colspan="1"><h3>경기</h3><span class="inputs"><input type="text" id="sido_31" name="sido_31"></span></td>
				            	    <td colspan="1"><h3>강원</h3><span class="inputs"><input type="text" id="sido_32" name="sido_31"></span></td>
				            	    <td colspan="1"><h3>충북</h3><span class="inputs"><input type="text" id="sido_33" name="sido_33"></span></td>
				            	    <td></td>
				            	</tr>
				            	<tr class="area_require">
				            		<th class="require">지역 - 지자체2</th>
				            	    <td colspan="1"><h3>충남</h3><span class="inputs"><input type="text" id="sido_34" name="sido_34"></span></td>
				            	    <td colspan="1"><h3>전북</h3><span class="inputs"><input type="text" id="sido_35" name="sido_35"></span></td>
				            	    <td colspan="1"><h3>전남</h3><span class="inputs"><input type="text" id="sido_36" name="sido_36"></span></td>
				            	    <td></td>
				            	</tr>
				            	<tr class="area_require">
				            		<th class="require">지역 - 지자체3</th>
				            	    <td colspan="1"><h3>경북</h3><span class="inputs"><input type="text" id="sido_37" name="sido_37"></span></td>
				            	    <td colspan="1"><h3>경남</h3><span class="inputs"><input type="text" id="sido_38" name="sido_38"></span></td>
				            	    <td colspan="1"><h3>제주</h3><span class="inputs"><input type="text" id="sido_39" name="sido_39"></span></td>
				            	    <td></td>
				            	</tr>
					  		</tbody>
					  	</table>
					</div>
				</div>
			</div>			
		</div>
	</div>
</div>	
</div>
</div>
			<!-- footer -->
	<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
				
</body>
</html>