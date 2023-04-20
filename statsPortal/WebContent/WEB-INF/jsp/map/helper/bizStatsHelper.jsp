<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> <%-- 2020년 SGIS고도화 3차(테마코드) - JSTL 추가 (pse) --%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <%-- 2020년 SGIS고도화 3차(테마코드) - JSTL 추가 (pse) --%>
<!-- 2020년 SGIS고도화 3차(테마코드) 시작 - CSS 수정 (pse) -->
<style>
.House_Index_Info .ContBox table {
	width: 100%;
	height: auto;
	top: auto;
	left: auto;
	position: relative;
}

.House_Index_Info .ContBox table tbody {
	height: 600px;
	left: auto;
	top: auto;
	border-bottom: #ddd solid 1px;
}

.House_Index_Info .ContBox table tbody tr:last-child td {
	border-bottom: #ddd solid 1px;
}

.House_Index_Info .ContBox .Tab {
	overflow: hidden;
	display: table;
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
}

.House_Index_Info .ContBox .Tab li {
	float: none;
	width: auto;
	display: table-cell;
	vertical-align: middle;
}
/*
#help-indicator .noMoreWatchWrapper {
	bottom: 30px;
	left: 30px;
	position: absolute;
}
*/
</style>
<!-- 2020년 SGIS고도화 3차(테마코드) 끝 - CSS 수정 (pse) -->
<div id="help-indicator" class="House_Index_Info" style="display:none;">
	<div class="ContBox">
		<!-- 2020년 SGIS고도화 3차(테마코드) 시작 - 하루 동안 보지 않기 버튼 생성 (pse) -->
		<!-- <div class="noMoreWatchWrapper"> 
		    <input type="checkbox" ><span style="padding-left: 6px;">하루 동안 보지 않기</span>
		</div> -->
		<!-- 2020년 SGIS고도화 3차(테마코드) 끝 - 하루 동안 보지 않기 버튼 생성 (pse) -->
		<h1>생활업종현황</h1>		<div>
			<!-- mng_s 20210517 2019년으로 수정 -->
			<!-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 문구 주석처리 및 새로운 문구로 수정, 문자 정렬을 더 보기 좋게 수정(pse) -->
			<!-- 
			<span style="color:#f63;">※</span>통계청에서 2018년에 조사한 전국 사업체조사(2018년 기준)를 활용하여 우리동네 생활업종을 서비스 하고 있습니다.
   			(우리동네 생활업종에서는 10차 산업분류 상의 사업체 명칭을 실생활에서 쉽게 이해 할 수 있는
    		명칭으로 변경하여 서비스 하고 있습니다. 이점 유의하시기 바랍니다.) 
    		-->
    		<span style="color:#f63;">※</span>통계청에서 2019년에 조사한 전국 사업체조사(2019년 기준)를 활용하여 우리동네 생활업종을 서비스 하고 있습니다.<br>
   			&nbsp;&nbsp;(우리동네 생활업종에서는 10차 산업분류 상의 사업체 명칭을 실생활에서 쉽게 이해 할 수 있는 명칭으로 변경하여<br>&nbsp;&nbsp;서비스 하고 있습니다. 이점 유의하시기 바랍니다.) 
    		<!-- 2020년 SGIS고도화 3차(테마코드) 끝 - 문자 정렬 수정 (pse) -->
    		<!-- mng_e 20210517 김건민 -->
		</div>
		<a href="javascript:void(0);" onclick="$('#help-indicator').hide();if($('.btn_popup1').hasClass('on')){$('.btn_popup1').removeClass('on');$('#select_popup_layer').show();}" class="BtnClose">창닫기</a><!--박길섭 수정 -->
		<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 하드 코딩 "주석처리" (pse) --%>
		<%--
		<ul class="Tab">
			<!-- mng_s 20200616 김건민 (문구 수정함) -->
			<li><a href="#" onclick="javascript:srvLogWrite('G0', '01', '03', '02', '', '음식점');" class="M_on" data-id="HML0001">음식점</a></li>
			<li><a href="#" onclick="javascript:srvLogWrite('G0', '01', '03', '02', '', '서비스');" data-id="HML0002">생활서비스</a></li>
			<li><a href="#" onclick="javascript:srvLogWrite('G0', '01', '03', '02', '', '도소매');" data-id="HML0003">소매업</a></li>
			<li><a href="#" onclick="javascript:srvLogWrite('G0', '01', '03', '02', '', '숙박');" data-id="HML0004">숙박</a></li>
			<!-- mng_e 20190329 김건민 -->
		</ul> 
		 --%>
		<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 하드 코딩 "주석처리" (pse) --%>
		
		<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 하드 코딩 해소 (pse) --%>
		<div class="TabBox" style="margin-top:10px; margin-bottom:10px">
			<c:forEach items="${allThemeCdInfo }" var="bigThemeItem" varStatus="status">
			<c:if test="${status.first }">
			<ul class="Tab" style="margin-top:0; margin-bottom:5px">
			</c:if>
				
				<li><a href="#" onclick="javascript:srvLogWrite('G0', '01', '03', '02', '', '${bigThemeItem.b_theme_cd_nm}');" ${status.first? "class='M_on'": "" } 
					data-big-theme-cd="${bigThemeItem.b_theme_cd}"
					data-id="HML00<fmt:formatNumber minIntegerDigits="2" value="${status.count}" />">${bigThemeItem.b_theme_cd_nm}</a></li>
				
			<c:if test="${status.index == 3 }">
			</ul>
			<ul class="Tab" style="margin-top:0; margin-bottom:0">
			</c:if>
			
			<c:if test="${status.last }"> 
			</ul>
			</c:if>
			</c:forEach>
		</div>
		<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 하드 코딩 해소 (pse) --%>
		<table summary="생활업종 현황 목록" data-first-call="Y">	<!-- 2020년 SGIS고도화 3차(테마코드) - data-first-call 속성 추가 (pse) -->
			<thead>
				<tr>
					<th scope="col">생활업종</th>
					<th scope="col">관련산업분류(10차)</th>
				</tr>
			</thead>
			<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 하드코딩 해소 및 AJAX 연동을 위한 tbody 사전 작업 (pse) --%>
			<c:forEach items="${allThemeCdInfo }" var="bigThemeItem" varStatus="status">
			<!-- ${bigThemeItem.b_theme_cd_nm} -->
			<tbody data-id="HML00<fmt:formatNumber minIntegerDigits="2" value="${status.count}" />" data-big-theme-cd="${bigThemeItem.b_theme_cd}" ${!status.first? "style='display: none;'" :"" } >
				
			</tbody>
			</c:forEach>
			<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 하드코딩 해소 및 AJAX 연동을 위한 tbody 사전 작업 (pse) --%>
			<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 하드 코딩 "주석처리" (pse) --%>
			<%--
			<!-- mng_s 20190329_김건민 -->			
			<tbody data-id="HML0001">
				<tr>
					<td scope="row">한식</td>
					<td>
					56111 한식 일반 음식점업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56111" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56111');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					<br/>
					56112 한식 면 요리 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56112" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56112');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
					56113 한식 육류 요리 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56113" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56113');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
					56114 한식 해산물 요리 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56114" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56114');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
				</tr>
				<tr>
					<td>중식</td>
					<td>56121 중식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56121" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56121');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>일식</td>
					<td>56122 일식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56122" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56122');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>분식</td>
					<td>56194 분식 및 김밥 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56194" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56194');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>서양식</td>
					<td>56123 서양식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56123" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56123');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>제과점</td>
					<td>56191 제과점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56191" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56191');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>패스트푸드</td>
					<td>56192 피자, 햄버거, 샌드위치 및 유사 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56192" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56192');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
					</td>
				</tr>
				<tr>
					<td>치킨</td>
					<td>56193 치킨 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56193" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56193');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
					</td>
				</tr>
				<tr>
					<td>호프 및 간이주점</td>
					<td>
						56213 생맥주 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56213" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56213');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						56219 기타 주점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56219" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56219');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
					</td>
				</tr>
				<tr>
					<td>카페</td>
					<td>
						56221 커피 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56221" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56221');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						56229 기타 비알콜 음료점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56229" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56229');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>기타 외국식</td>
					<td>56129 기타 외국식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=56129" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '56119');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0002" style="display:none;">
				<tr>
					<td scope="row">인테리어</td>
					<td>42412 도배, 실내장식 및 내장 목공사업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=42412" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '42412');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>목욕탕</td>
					<td>96121 욕탕업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=96121" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '96121');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>교습학원</td>
					<td>85501 일반 교과 학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85501" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85501');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85632 기타 교습학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85632" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85632');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>어학원</td>
					<td>85631 외국어학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85631" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85631');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>예체능학원</td>
					<td>
						85611 태권도 및 무술 교육기관
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85611" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85611');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85612 기타 스포츠 교육기관
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85612" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85612');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85613 레크레이션 교육시설기관
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85613" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85613');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85621 음악학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85621" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85621');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85622 미술학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85622" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85622');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85629 기타 예술학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=85629" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '85629');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				 <tr>
					<td>부동산중개업</td>
					<td>68221 부동산 자문 및 중개업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=68221" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '68221');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>이발소</td>
					<td>96111 이용업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=96111" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '96111');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>미용실</td>
					<td>96112 두발미용업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=96112" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '96112');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>세탁소</td>
					<td>96912 가정용 세탁업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=96912" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '96912');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>PC방</td>
					<td>91222 컴퓨터 게임방 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=91222" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '91222');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>노래방</td>
					<td>91223 노래연습장 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=91223" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '91223');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0003" style="display:none;">
				<tr>
					<td scope="row">문구점</td>
					<td>47612 문구용품 소매업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47612" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47612');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>서점</td>
					<td>47611 서적 및 잡지류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47611" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47611');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>편의점</td>
					<td>47122 체인화 편의/문화점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47122" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47122');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>식료품점</td>
					<td>
						47129 기타 음·식료품 위주 종합 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47129" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47129');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47212 육류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47212" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47212');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47213 건어물 및 젓갈류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47213" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47213');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47214 신선, 냉동 및 기타 수산물 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47214" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47214');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47215 채소, 과실 및 뿌리작물 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47215" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47215');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47216 빵류, 과자류 및 당류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47216" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47216');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47218 조리 반찬류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47218" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47218');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47219 기타 식료품 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47219" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47219');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>휴대폰점</td>
					<td>47312 통신기기 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47312" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47312');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				 <tr>
					<td>의류</td>
					<td>
						47411 남자용 겉옷 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47411" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47411');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47412 여자용 겉옷 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47412" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47412');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47413 속옷 및 잠옷 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47413" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47413');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47414 셔츠 및 블라우스 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47414" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47414');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47415 한복 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47415" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47415');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47416 가죽 및 모피 의복 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47416" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47416');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47417 유아용 의류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47417" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47417');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47419 기타 의복 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47419" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47419');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47421 가정용 직물제품 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47421" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47421');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47422 의복 액세서리 및 모조 장신구 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47422" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47422');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47429 섬유 원단, 실 및 기타 섬유제품 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47429" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47429');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
 				<tr>
					<td>화장품/방향제</td>
					<td>47813 화장품, 비누 및 방향제 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47813" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47813');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
 				<tr>
					<td>철물점</td>
					<td>47511 철물 및 난방용구 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47511" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47511');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>주유소</td>
					<td>
						47711 운송장비용 주유소 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47711" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47711');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47712 운송장비용 가스 충전업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47712" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47712');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>꽃집</td>
					<td>47851 화초 및 산식물 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47851" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47851');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>슈퍼마켓</td>
					<td>47121 슈퍼마켓
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=47121" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '47121');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0004" style="display:none;">
				<tr>
					<td scope="row">호텔 </td>
					<td>55101 호텔업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=55101" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '55101');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>여관(모텔포함) 및 여인숙 </td>
					<td>55102 여관업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=55102" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '55102');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>팬션  </td>
					<td>
						55104 민박업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=55104" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '55104');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						55109 기타 일반 및 생활 숙박시설 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode=55109" onclick="javascript:srvLogWrite('G0', '01', '03', '03', '', '55109');window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
<!-- 						- 기타 관광 숙박시설 운영업으로서 단기간의 숙박시설을 운영하는 산업활동을 말한다.<br/>  -->
<!-- 						  &lt;예시&gt;<br/> -->
<!-- 						   ·산장 및 방가로 운영 ·민박시설 운영<br/>  -->
<!-- 						   ·유스호스텔 운영 ·숙박용 펜션 운영 <br/> -->
<!-- 						   ·야영장 운영 ·캠프장 운영<br/> -->
					</td>
				</tr>
				--%>
				<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 하드 코딩 "주석처리" (pse) --%>
			</tbody>
			<!-- mng_e 20190329_김건민 -->
		</table>
	</div>
	<div class="Blackbg">&nbsp;</div>
</div>
<script>
$(document).ready(function() {
	$("#helper-0003").mCustomScrollbar({axis:"y",advanced: { autoExpandHorizontalScroll: true }});	
});

$("#help-indicator .Tab>li>a").click(function(){
	$("#help-indicator .Tab>li>a").removeClass("M_on");
	$(this).addClass("M_on");
	// 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리 (pse)
	/*
	$("#help-indicator tbody").hide();
	$("#help-indicator tbody[data-id="+$(this).data("id")+"]").show();
	*/
	// 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리 (pse)
	
	// 2020년 SGIS고도화 3차(테마코드) 시작 - AJAX호출을 통한 작업추가, 하드코딩 해소를 위한 것 (pse)
	var bigThemeCd = $(this).data('bigThemeCd');
	
	$themeCdCommon.getCensusAndthemeMappedInfo(	//파라미터 순서: 대분류 테마코드, success 콜백함수, beforeSend 콜백함수, complete 콜백함수
		bigThemeCd,
		function(data) {
			var result = data.result;
			$('tbody[data-big-theme-cd="'+bigThemeCd+'"').empty();
			result.forEach(function(item,index){
			    var html = '';
			    html += '<tr>'
			    html += '<td '+(index == 0 ? 'scope="row"' :'')+'>'+item.s_theme_cd_nm+'</td>';
			    html += '<td>'
			    item.censusList.forEach(function(item,index){
			        html += item.ksic_5_cd +' '+item.ksic_5_nm;
			        html += '&nbsp;<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=10&strCategoryCode='+item.ksic_5_cd+'" '
			        html += 'onclick="javascript:srvLogWrite(\'G0\', \'01\', \'03\', \'03\', \'\', \''+item.ksic_5_cd+'\'); window.open(this.href,\'_blank\',\'width=430,height=430,scrollbars=yes\'); return false;"> '
			        html += '&nbsp;<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>'
			        html += '</a>'
			        html += '<br/>'
			    });
			    html += '</td>'
			    html += '</tr>'
			    $('tbody[data-big-theme-cd="'+bigThemeCd+'"').append(html);
			    
			});
		},
		function() {
			
		},
		function () {
			$("#help-indicator tbody").hide();
			$("#help-indicator tbody[data-big-theme-cd="+bigThemeCd+"]").show();
			
			
			/* 맨 밑에 선을 그일지 말지에 대한 결정을 하는 코드 [START] */
			var heightTotal = 0;
			var firstCall = $('#help-indicator table').data("firstCall");
			// 맨 처음 화면이 생성되는 단계 때에도 이 ajax complete 에 사용될 콜백이 호출됩니다.
			// 그때는 display:none 으로 되어 있는 상태여서 어떻게 해도 heightTotal 이 0이기에 
			// 잠시  display:block을 해주고, 눈에는 보이지 않게 visibility : hidden을 해주었습니다.
			if(firstCall === 'Y'){
				$('#help-indicator').css({"display": "block", "visibility" : "hidden"})
			}
			
			Array.prototype.slice.call($("#help-indicator tbody[data-big-theme-cd="+bigThemeCd+"] > tr")).forEach(function(item,index){
			    heightTotal+=item.clientHeight;
			});
			
			if(heightTotal < 600) { 
				 $('#help-indicator table tbody').css({'border-bottom': 'none'})
			} else if(heightTotal >= 600) {	
				$('#help-indicator table tbody').css({'border-bottom': '#ddd solid 1px'})
			}
			
			// 처음으로 화면이 생성 될때의 윗 작업이 끝나면 더 이상 같은 작업이 일어나지 않도록 #help-indicator table 태그의 data-first-call 데이터를 N으로 바꿔줍니다.
			if(firstCall === 'Y'){
				$('#help-indicator').css({"display": "none", "visibility" : "visible"})
				$('#help-indicator table').data("firstCall","N");
			}
			/* 맨 밑에 선을 그일지 말지에 대한 결정을 하는 코드 [END] */
		}
	);
	// 2020년 SGIS고도화 3차(테마코드) 끝 - AJAX호출을 통한 작업추가, 하드코딩 해소를 위한 것 (pse)
	
	return false;
});

//2020년 SGIS고도화 3차(테마코드) 시작 (pse)
$(document).ready(function(){
	$("#help-indicator .Tab>li>a:eq(0)").click();		// 초반에는 대분류 표출 순위중에서 가장 앞에 있는 것을 클릭한다.
});
//2020년 SGIS고도화 3차(테마코드) 끝 (pse)
</script>