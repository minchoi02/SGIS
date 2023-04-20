<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 통계분석 > 일자리 질 > 주요지표
* File Name		: statsAnls > ssaJobQuality.jsp
* Comment		: 
* History		: 2018-09-12	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaJobQuality.js"></script>

<div class="popBox job-offer-status wrmDraggable" id="ssaJobQuality">
	<a href="javascript:void(0)" class="sideQuick sq03 xw wrmToggleBtn">
		<span>일자리 질 > 주요지표</span>
	</a>
	<div class="topbar wrmHeader">
		<span></span>
		<!-- <span style="margin-left:5px">일자리 질 > 주요지표 ></span> -->
		<a href="javascript:void(0)" data-active="false">닫기</a>
	</div>
	<div class="sqListBox sq03" id="ssaJobQualityContents">
   		<!-- normalBox START -->
		<div class="normalBox">		<%-- 2019.05.17[한광희] 일자리 통계분석 > 화면 사이즈 고정으로 인한 wrmScrollable 기능 삭제 처리 --%>
			<div class="indicator-area">
				<!-- 지표,차트 영역 START  -->
				<div class="indicator">
					<!-- 일자리 질 지표 START -->
					<div class="data-left">
						<div class="jab-indicator-table" id="E3309" onclick="javascript:$ssaJobQuality.ui.ChangeColor('E3309');">
							<!-- 산업재해 전체 재해율 -->
						</div>
						<div class="jab-indicator-table" id="I3308" onclick="javascript:$ssaJobQuality.ui.ChangeColor('I3308');">
							<!-- 사회보험 가입률 -->
						</div>
						<div class="jab-indicator-table" id="E3307" onclick="javascript:$ssaJobQuality.ui.ChangeColor('E3307');">
							<!-- 총 근로시간 -->
						</div>
						<div class="jab-indicator-table">
							<table>
								<colgroup>
									<col width="20%">
									<col width="80%">
								</colgroup>
								<tbody>
									<tr>
										<th rowspan="2" id="emp" onclick="javascript:$ssaJobQuality.ui.ChangeColor('emp');">비정규직</th>
										<td id="I3306" onclick="javascript:$ssaJobQuality.ui.ChangeColor('I3306');">
											<!-- 비정규직 - 근로자 수 -->
										</td>
									</tr>
									<tr>
										<td id="I3306_1" onclick="javascript:$ssaJobQuality.ui.ChangeColor('I3306_1');">
											<!-- 비정규직 - 근로자 비율 -->
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="jab-indicator-table" id="E3303" onclick="javascript:$ssaJobQuality.ui.ChangeColor('E3303');">
							<!-- 저 임금 근로자 비율 -->
						</div>
						<div class="jab-indicator-table" id="E3301" onclick="javascript:$ssaJobQuality.ui.ChangeColor('E3301');">
							<!-- 월임금총액 -->
						</div>
					</div>
					<!-- 일자리 질 지표 END -->
					<!-- 일자리 질 차트 START -->
					<div class="data-right">
						<div class="iaChartBoxMain" id="ssaJobQualityChartMain"></div>
					</div>
					<!-- 일자리 질 차트 END -->
				</div>
				<!-- 지표,차트 영역 END -->
				<!-- 지표설명 및 지표 검색 조건 영역 START -->
				<!-- 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 지표설명 영역 주석처리 START -->
				<!-- <div class="indicator bottom">
					<div class="indicator-tab" id="E3309_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">산업재해 전체 재해율(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area"id="E3309_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">행정구역(시도)/활동상태별 비경제활동인구 (201712)</td>
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
					<!-- <div class="indicator-tab" id="I3308_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">사회보험 가입률(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area"id="I3308_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">행정구역(시도)/활동상태별 비경제활동인구 (201712)</td>
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
					<!-- <div class="indicator-tab" id="E3307_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">총 근로시간(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area"id="E3307_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">행정구역(시도)/활동상태별 비경제활동인구 (201712)</td>
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
					<!-- <div class="indicator-tab" id="I3306_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">비정규직 근로자 수(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area"id="I3306_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">행정구역(시도)/활동상태별 비경제활동인구 (201712)</td>
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
					<!-- <div class="indicator-tab" id="I3306_1_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">비정규직 - 근로자 비율(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area"id="I3306_1_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">행정구역(시도)/활동상태별 비경제활동인구 (201712)</td>
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
					<!-- <div class="indicator-tab" id="E3303_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">저 임금 근로자 비율(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area"id="E3303_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">행정구역(시도)/활동상태별 비경제활동인구 (201712)</td>
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
					<!-- <div class="indicator-tab" id="E3301_condition_C9"  style="display:none">
						<h3 id="ssaStatNm">월임금총액(Economiccally inactive population)(월)</h3>
					</div> -->
					<%-- 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 주석처리 START --%>
					<%-- <div class="info-area"id="E3301_condition_C10"  style="display:none">
						<table class="info-table">
							<caption>일자리 통계분석 기본정보</caption>
							<colgroup>
								<col width="80px;">
								<col width="auto;">
							</colgroup>
							<tbody>
								<tr>
									<th>제&nbsp;&nbsp;목 : </th>
									<td id="ssaTitle">행정구역(시도)/활동상태별 비경제활동인구 (201712)</td>
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
						<ul class="dbTypeCk radioStepBox validationStepBox">
							<li><input type="radio" id="Total" name="Sido" value="00" checked="checked"/><label for="Total" class="">전국</label> </li>
							<li><input type="radio" id="Seoul" name="Sido" value="11" /><label for="Seoul" class="">서울특별시</label> </li>
							<li><input type="radio" id="Busan" name="Sido" value="21" /><label for="Busan" class="">부산광역시</label> </li>
							<li><input type="radio" id="Daegu" name="Sido" value="22" /><label for="Daegu" class="">대구광역시</label> </li>
							<li><input type="radio" id="Incheon" name="Sido" value="23" /><label for="Incheon" class="">인천광역시</label> </li>
							<li><input type="radio" id="Gwangju" name="Sido" value="24" /><label for="Gwangju" class="">광주광역시</label> </li>
							<li><input type="radio" id="Daejeon" name="Sido" value="25" /><label for="Daejeon" class="">대전광역시</label> </li>
							<li><input type="radio" id="Ulsan" name="Sido" value="26" /><label for="Ulsan" class="">울산광역시</label> </li>
							<li><input type="radio" id="Sejong" name="Sido" value="29" /><label for="Sejong" class="">세종특별자치시</label> </li>
							<li><input type="radio" id="Gyeonggi-do" name="Sido" value="31" /><label for="Gyeonggi-do" class="">경기도</label> </li>
							<li><input type="radio" id="Gangwon-do" name="Sido" value="32" /><label for="Gangwon-do" class="">강원도</label> </li>
							<li><input type="radio" id="Chungcheongbuk-do" name="Sido" value="33" /><label for="Chungcheongbuk-do" class="">충청북도</label> </li>
							<li><input type="radio" id="Chungcheongnam-do" name="Sido" value="34" /><label for="Chungcheongnam-do" class="">충청남도</label> </li>
							<li><input type="radio" id="Jeollabuk-do" name="Sido" value="35" /><label for="Jeollabuk-do" class="">전라북도</label> </li>
							<li><input type="radio" id="Gyeongsangbuk-do" name="Sido" value="37" /><label for="Gyeongsangbuk-do" class="">경상북도</label> </li>
							<li><input type="radio" id="Gyeongsangnam-do" name="Sido" value="38" /><label for="Gyeongsangnam-do" class="">경상남도</label> </li>
							<li><input type="radio" id="Jeju-do" name="Sido" value="39" /><label for="Jeju-do" class="">제주도</label> </li>
						</ul>
					</div>
					<div class="indicator-stepBox" id="I3114_condition_C2" style="display:none">
						<p>실업률 성별/연령별</p>
						<ul class="dbTypeCk radioStepBox validationStepBox">
							<li><input type="radio" id="gender" name="unemployment_rate" value="I3114" checked="checked"/><label for="gender" class="">실업률(성별)</label> </li>
							<li><input type="radio" id="age" name="unemployment_rate" value="I3115" /><label for="age" class="">실업률(연령별)</label> </li>
						</ul>
					</div>
					<div class="indicator-stepBox" id="I3114_condition_C2" style="display:none">
						<h3>고용 형태별 구인인원</h3>
						<div class="gray-box">
							<ul class="dbTypeCk radioStepBox validationStepBox">
								<li><input type="radio" id="1" name="" value="0" checked="checked"><label for="1" class="">전체
								</label> </li>
								<li><input type="radio" id="1" name="" value="0" checked="checked"><label for="1" class="">기간의 정함이 없는 <span>근로계약</span>
								</label> </li>
								<li><input type="radio" id="1" name="" value="0" checked="checked"><label for="1" class="">기간의 정함이 없는 <span>근로계약(시간(선택)제)</span>
								</label> </li>
								<li><input type="radio" id="1" name="" value="0" checked="checked"><label for="1" class="">기간이 정함이 있는 <span>근로계약</span>
								</label> </li>
								<li><input type="radio" id="1" name="" value="0" checked="checked"><label for="1" class="">기간이 정함이 있는 <span>근로계약(시간(선택)제)</span>
								</label> </li>
								<li><input type="radio" id="1" name="" value="0" checked="checked"><label for="1" class="">일용직
								</label> </li>
							</ul>
						</div>
					</div>
					<div class="indicator-stepBox" id="ssaJobQualty_map_type" style="display:none">
						<p>표출방법</p>
						<ul>
							<li><input type="radio" id="ssaJQ_color_map" name="ssaJQ_condition_map_type" value="color" checked="checked"><label for="ssaJQ_color_map" class="on">색상지도</label> </li>
							<li><input type="radio" id="ssaJQ_bubble_map" name="ssaJQ_condition_map_type" value="bubble"><label for="ssaJQ_bubble_map" class="">버블지도</label> </li>
							<li><input type="radio" id="ssaJQ_heat_map" name="ssaJQ_condition_map_type" value="heat"><label for="ssaJQ_heat_map" class="">열지도</label> </li>
						</ul>
					</div>
				</div> -->
				<!-- 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로  인한 지표설명 영역 주석처리 END -->
				<!-- 지표설명 및 지표 검색 조건 영역 END -->
			</div>
		</div>
		<!-- normalBox END -->
		<div class="btnBottom">
			<a href="javascript:$ssaJobQuality.ui.addSearchBtn();" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계지표 목록에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">통계보기</a>
		</div>
	</div>
</div>