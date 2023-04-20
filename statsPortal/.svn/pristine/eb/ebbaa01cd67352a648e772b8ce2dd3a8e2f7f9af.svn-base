<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 통계분석 > 일자리 증감 > 주요지표
* File Name		: statsAnls > ssaJobGrowth.jsp
* Comment		: 
* History		: 2018-09-12	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaJobGrowth.js"></script>

<div class="popBox job-offer-status wrmDraggable" id="ssaJobGrowth">
	<a href="javascript:void(0)" class="sideQuick sq03 xw wrmToggleBtn">
		<span>일자리 증감 > 주요지표</span>
	</a>
	<div class="topbar wrmHeader">
		<span></span>
		<!-- <span>일자리 증감 > 주요지표</span> -->
		<a href="javascript:void(0)" data-active="false">닫기</a>
	</div>	
	<div class="sqListBox sq03" id="ssaJobGrowthContents">
   		<!-- normalBox START -->
   		<div class="normalBox">		<%-- 2019.05.17[한광희] 일자리 통계분석 > 화면 사이즈 고정으로 인한 wrmScrollable 기능 삭제 처리 --%>
			<div class="indicator-area">
				<!-- 지표,차트 영역 START  -->
				<div class="indicator">
					<!-- 일자리 증감 지표 START -->
					<div class="data-left">
						<div class="jab-indicator-table" id="E3224" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('E3224');">
							<!-- 고용보험 신규취득자수 --> <!-- 2020-07-23 [곽제욱] 고용보험 증감 - 고용보험 신규취득자수로 변경 -->
						</div>
						<div class="jab-indicator-table" id="I3220" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('I3220');">
							<!-- 취업자 증감 -->
						</div>
						<div class="jab-indicator-table">
							<table>
								<colgroup>
									<col width="20%">
									<col width="80%">
								</colgroup>
								<tbody>
									<tr>
										<th rowspan="2" id="emp" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('emp');">일자리</th>
										<td id="E3218" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('E3218');">
											<!-- 일자리 - 구직자 -->
										</td>
									</tr>
									<tr>
										<td id="E3208" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('E3208');">
											<!-- 일자리 - 구인 인원 -->
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="jab-indicator-table">
							<table>
								<colgroup>
									<col width="20%">
									<col width="80%">
								</colgroup>
								<tbody>
									<tr>
										<th rowspan="2" id="emp" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('emp');">사업체</th>
										<td id="I3207" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('I3207');">
											<!-- 사업체 - 폐업수 -->
										</td>
									</tr>
									<tr>
										<td id="I3206" onclick="javascript:$ssaJobGrowth.ui.ChangeColor('I3206');">
											<!-- 사업체 - 창업수 -->
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- 일자리 증감 지표 END -->
					<!-- 일자리 증감 차트 START -->
					<div class="data-right">
						<div class="iaChartBoxMain" id="ssaJobGrowthChartMain"></div>
					</div>
					<!-- 일자리 증감 차트 END -->
				</div>
				<!-- 지표,차트 영역 END -->
				<!-- 지표설명 및 지표 검색 조건 영역 START -->
				<!-- 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 지표설명 영역 주석처리 START -->
				<!-- <div class="indicator bottom">
					<div class="indicator-tab" id="E3224_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">고용보험 증감(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area" id="E3224_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">고용보험 증감 (201712)</td>
								</tr>
								<tr>
									<th>설&nbsp;&nbsp;명 : </th>
									<td id="ssaExp">만 15세이상 인구중 조사대상 주간에 취업도 실업도 아닌 상태에 있는 사람 - 이들은 주된 활동상태에 따라 구분</td>
								</tr>
								<tr>
									<th>출&nbsp;&nbsp;처 : </th>
									<td id="ssaOrigin">통계청 사회통계국 고용통계과(☎ 042-481-2266)</td>
								</tr>
							</tbody>
						</table>
					</div> --%>
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 END --%>
					<!-- <div class="indicator-tab" id="I3220_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">취업자 증감(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area" id="I3220_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">취업자 증감 (201712)</td>
								</tr>
								<tr>
									<th>설&nbsp;&nbsp;명 : </th>
									<td id="ssaExp">만 15세이상 인구중 조사대상 주간에 취업도 실업도 아닌 상태에 있는 사람 - 이들은 주된 활동상태에 따라 구분</td>
								</tr>
								<tr>
									<th>출&nbsp;&nbsp;처 : </th>
									<td id="ssaOrigin">통계청 사회통계국 고용통계과(☎ 042-481-2266)</td>
								</tr>
							</tbody>
						</table>
					</div> --%>
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 END --%>
					<!-- <div class="indicator-tab" id="E3218_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">일자리 구직자(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area" id="E3218_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">일자리 구직자 (201712)</td>
								</tr>
								<tr>
									<th>설&nbsp;&nbsp;명 : </th>
									<td id="ssaExp">만 15세이상 인구중 조사대상 주간에 취업도 실업도 아닌 상태에 있는 사람 - 이들은 주된 활동상태에 따라 구분</td>
								</tr>
								<tr>
									<th>출&nbsp;&nbsp;처 : </th>
									<td id="ssaOrigin">통계청 사회통계국 고용통계과(☎ 042-481-2266)</td>
								</tr>
							</tbody>
						</table>
					</div> --%>
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 END --%>
					<!-- <div class="indicator-tab" id="E3208_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">일자리 구인인원(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area" id="E3208_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">일자리 구인인원 (201712)</td>
								</tr>
								<tr>
									<th>설&nbsp;&nbsp;명 : </th>
									<td id="ssaExp">만 15세이상 인구중 조사대상 주간에 취업도 실업도 아닌 상태에 있는 사람 - 이들은 주된 활동상태에 따라 구분</td>
								</tr>
								<tr>
									<th>출&nbsp;&nbsp;처 : </th>
									<td id="ssaOrigin">통계청 사회통계국 고용통계과(☎ 042-481-2266)</td>
								</tr>
							</tbody>
						</table>
					</div> --%>
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 END --%>
					<!-- <div class="indicator-tab" id="I3207_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">사업체 폐업수(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area" id="I3207_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">사업체 폐업수 (201712)</td>
								</tr>
								<tr>
									<th>설&nbsp;&nbsp;명 : </th>
									<td id="ssaExp">만 15세이상 인구중 조사대상 주간에 취업도 실업도 아닌 상태에 있는 사람 - 이들은 주된 활동상태에 따라 구분</td>
								</tr>
								<tr>
									<th>출&nbsp;&nbsp;처 : </th>
									<td id="ssaOrigin">통계청 사회통계국 고용통계과(☎ 042-481-2266)</td>
								</tr>
							</tbody>
						</table>
					</div> --%>
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 END --%>
					<!-- <div class="indicator-tab" id="I3206_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">사업체 창업수(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area" id="I3206_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">사업체 창업수 (201712)</td>
								</tr>
								<tr>
									<th>설&nbsp;&nbsp;명 : </th>
									<td id="ssaExp">만 15세이상 인구중 조사대상 주간에 취업도 실업도 아닌 상태에 있는 사람 - 이들은 주된 활동상태에 따라 구분</td>
								</tr>
								<tr>
									<th>출&nbsp;&nbsp;처 : </th>
									<td id="ssaOrigin">통계청 사회통계국 고용통계과(☎ 042-481-2266)</td>
								</tr>
							</tbody>
						</table>
					</div> --%>
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 END --%>
					<!-- <div class="indicator-stepBox" style="display:none">
						<p>시도</p>
						<ul>
							<li><input type="radio" id="ssaJG_Total" name="ssaJG_Sido" value="00" checked="checked"/><label for="ssaJG_Total" class="on">전국</label> </li>
							<li><input type="radio" id="ssaJG_Seoul" name="ssaJG_Sido" value="11" /><label for="ssaJG_Seoul" class="">서울특별시</label> </li>
							<li><input type="radio" id="ssaJG_Busan" name="ssaJG_Sido" value="21" /><label for="ssaJG_Busan" class="">부산광역시</label> </li>
							<li><input type="radio" id="ssaJG_Daegu" name="ssaJG_Sido" value="22" /><label for="ssaJG_Daegu" class="">대구광역시</label> </li>
							<li><input type="radio" id="ssaJG_Incheon" name="ssaJG_Sido" value="23" /><label for="ssaJG_Incheon" class="">인천광역시</label> </li>
							<li><input type="radio" id="ssaJG_Gwangju" name="ssaJG_Sido" value="24" /><label for="ssaJG_Gwangju" class="">광주광역시</label> </li>
							<li><input type="radio" id="ssaJG_Daejeon" name="ssaJG_Sido" value="25" /><label for="ssaJG_Daejeon" class="">대전광역시</label> </li>
							<li><input type="radio" id="ssaJG_Ulsan" name="ssaJG_Sido" value="26" /><label for="ssaJG_Ulsan" class="">울산광역시</label> </li>
							<li><input type="radio" id="ssaJG_Sejong" name="ssaJG_Sido" value="29" /><label for="ssaJG_Sejong" class="">세종특별자치시</label> </li>
							<li><input type="radio" id="ssaJG_Gyeonggi-do" name="ssaJG_Sido" value="31" /><label for="ssaJG_Gyeonggi-do" class="">경기도</label> </li>
							<li><input type="radio" id="ssaJG_Gangwon-do" name="ssaJG_Sido" value="32" /><label for="ssaJG_Gangwon-do" class="">강원도</label> </li>
							<li><input type="radio" id="ssaJG_Chungcheongbuk-do" name="ssaJG_Sido" value="33" /><label for="ssaJG_Chungcheongbuk-do" class="">충청북도</label> </li>
							<li><input type="radio" id="ssaJG_Chungcheongnam-do" name="ssaJG_Sido" value="34" /><label for="ssaJG_Chungcheongnam-do" class="">충청남도</label> </li>
							<li><input type="radio" id="ssaJG_Jeollabuk-do" name="ssaJG_Sido" value="35" /><label for="ssaJG_Jeollabuk-do" class="">전라북도</label> </li>
							<li><input type="radio" id="ssaJG_Gyeongsangbuk-do" name="ssaJG_Sido" value="37" /><label for="ssaJG_Gyeongsangbuk-do" class="">경상북도</label> </li>
							<li><input type="radio" id="ssaJG_Gyeongsangnam-do" name="ssaJG_Sido" value="38" /><label for="ssaJG_Gyeongsangnam-do" class="">경상남도</label> </li>
							<li><input type="radio" id="ssaJG_Jeju-do" name="ssaJG_Sido" value="39" /><label for="ssaJG_Jeju-do" class="">제주도</label> </li>
						</ul>
					</div>
					<div class="indicator-stepBox" id="I3114_condition_C2" style="display:none">
						<p>실업률 성별/연령별</p>
						<ul>
							<li><input type="radio" id="ssaJG_gender" name="ssaJG_unemployment_rate" value="I3114" checked="checked"/><label for="ssaJG_gender" class="on">실업률(성별)</label> </li>
							<li><input type="radio" id="ssaJG_age" name="ssaJG_unemployment_rate" value="I3115" /><label for="ssaJG_age" class="">실업률(연령별)</label> </li>
						</ul>
					</div>
					<div class="indicator-stepBox" id="I3114_condition_C2" style="display:none">
						<h3>고용 형태별 구인인원</h3>
						<div class="gray-box">
							<ul>
								<li><input type="radio" id="ssaJG_BTOE1" name="ssaJG_ByTypeOfEmployment" value="0" checked="checked"><label for="ssaJG_BTOE1" class="on">전체
								</label> </li>
								<li><input type="radio" id="ssaJG_BTOE2" name="ssaJG_ByTypeOfEmployment" value="0"><label for="ssaJG_BTOE2" class="">기간의 정함이 없는 <span>근로계약</span>
								</label> </li>
								<li><input type="radio" id="ssaJG_BTOE3" name="ssaJG_ByTypeOfEmployment" value="0"><label for="ssaJG_BTOE3" class="">기간의 정함이 없는 <span>근로계약(시간(선택)제)</span>
								</label> </li>
								<li><input type="radio" id="ssaJG_BTOE4" name="ssaJG_ByTypeOfEmployment" value="0"><label for="ssaJG_BTOE4" class="">기간이 정함이 있는 <span>근로계약</span>
								</label> </li>
								<li><input type="radio" id="ssaJG_BTOE5" name="ssaJG_ByTypeOfEmployment" value="0"><label for="ssaJG_BTOE5" class="">기간이 정함이 있는 <span>근로계약(시간(선택)제)</span>
								</label> </li>
								<li><input type="radio" id="ssaJG_BTOE6" name="ssaJG_ByTypeOfEmployment" value="0"><label for="ssaJG_BTOE6" class="">일용직
								</label> </li>
							</ul>
						</div>
					</div>
					<div class="indicator-stepBox" id="ssaJobGrowth_map_type" style="display:none">
						<p>표출방법</p>
						<ul>
							<li><input type="radio" id="ssaJG_color_map" name="ssaJG_condition_map_type" value="color" checked="checked"><label for="ssaJG_color_map" class="on">색상지도</label> </li>
							<li><input type="radio" id="ssaJG_bubble_map" name="ssaJG_condition_map_type" value="bubble"><label for="ssaJG_bubble_map" class="">버블지도</label> </li>
							<li><input type="radio" id="ssaJG_heat_map" name="ssaJG_condition_map_type" value="heat"><label for="ssaJG_heat_map" class="">열지도</label> </li>
						</ul>
					</div>
				</div> -->
				<!-- 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 지표설명 영역 주석처리 END -->
				<!-- 지표설명 및 지표 검색 조건 영역 END -->
			</div>
		</div>
		<!-- normalBox END -->
		<div class="btnBottom">
			<a href="javascript:$ssaJobGrowth.ui.addSearchBtn();" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계지표 목록에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">통계보기</a>
		</div>
	</div>
</div>