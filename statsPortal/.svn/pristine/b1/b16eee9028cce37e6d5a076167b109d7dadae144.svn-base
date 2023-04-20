<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 통계분석 > 일자리 현황 > 주요지표 > 조회 조건 팝업
* File Name		: statsAnls > ssaJobStatusSearchPopup.jsp
* Comment		: 
* History		: 2019-05-30	한광희
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
#ssaJobStatusSearchPopup .indicator-stepBox2 {border: #21b69a solid 2px; border-radius: 4px; margin: 10px; padding: 0px;}
#ssaJobStatusSearchPopup .indicator-stepBox2:before { top: 73px; content:''; display:block;background:url(/images/workRoad/icon_box_arrow2.png) no-repeat left top;position: absolute;height: 9px;width: 17px;}

#I3114_condition_C2:before{left: 40px;} /* 실업률 성별 */
#I3104_condition_C2:before{left: 40px;} /* 취업자수 성별 */
#I3104_condition_C3:before{left: 100px;} /* 취업자수 연령별 */
#I3104_condition_C4:before{left: 170px;} /* 취업자수 교육정도별 */
#I3104_condition_C5:before{left: 260px;} /* 취업자수 종사상지위별 */
#I3104_condition_C6:before{left: 345px;} /* 취업자수 취업시간별 */
#I3104_condition_C7:before{left: 417px;} /* 취업자수 직업별 */
#I3104_condition_C8:before{left: 479px;} /* 취업자수 산업별 */
#I3112_condition_C2:before{left: 40px;} /* 취업자수 산업별 */
#I3101_condition_C3:before{left: 170px;} /* 세대수 전출입 */
#I3101_condition_C4:before{left: 310px;} /* 세대수 이동자수 */
</style>

<script src="${pageContext.request.contextPath}/js/workRoad/statsAnls/ssaJobStatusSearchPopup.js"></script>

<div class="workRoad" id="ssaJobStatusSearchPopup" style="display: none;">
	<div class="popBox wrmDraggable" style="width: 530px;">
		<div class="topbar wrmHeader">
			<span id="ssaJobStatusSearchTitle">조회 조건</span>
			<a href="javascript:void(0)">닫기</a>
		</div>	
		<div class="cont-box wrmScrollable">
			<div class="indicator-stepBox" id="I3114_condition_C1" style="display:none; margin-bottom: 0px;">
				<p>분류</p>
				<ul style="padding-bottom: 0px;">
					<li><input type="radio" id="gender_I3114" name="unemployment_rate" value="I3114" checked="checked"/><label for="gender_I3114" class="on">성별</label> </li>
					<!-- li><input type="radio" id="age_I3114" name="unemployment_rate" value="I3115" /><label for="age_I3114" class="">연령별</label> </li-->
				</ul>
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3114_condition_C2" style="display:none; margin-top: 0px;">
					<ul>
						<li><input type="radio" id="gd_I3114" name="I3114_gender_C2" value="0" checked="checked"><label for="gd_I3114" class="on">전체</label> </li>
						<li><input type="radio" id="man_I3114" name="I3114_gender_C2" value="2"><label for="man_I3114" class="">남자</label> </li>
						<li><input type="radio" id="woman_I3114" name="I3114_gender_C2" value="3"><label for="woman_I3114" class="">여자</label> </li>
					</ul>
				<!-- </div>-->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3114_condition_C3" style="display:none">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>연령별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="age_tot_I3114" name="I3114_age_C3" value="00" checked="checked"><label for="age_tot_I3114" class="on">전체</label> </li>
						<li><input type="radio" id="15_29_I3114" name="I3114_age_C3" value="75"><label for="15_29_I3114" class="">15~29세</label> </li>
						<li><input type="radio" id="30_59_I3114" name="I3114_age_C3" value="90"><label for="30_59_I3114" class="">30~59세</label> </li>
						<li><input type="radio" id="60_over_I3114" name="I3114_age_C3" value="95"><label for="60_over_I3114" class="">60세 이상</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
			<div class="indicator-stepBox" id="I3104_condition_C1" style="display:none; margin-bottom: 0px;">
				<p>분류</p>
				<ul style="padding-bottom: 0px;">
					<li><input type="radio" id="gender_I3104" name="employed_person" value="I3104" checked="checked"/><label for="gender_I3104" class="on">성별</label> </li>
					<li><input type="radio" id="age_I3104" name="employed_person" value="I3105" /><label for="age_I3104" class="">연령별</label> </li>
					<li><input type="radio" id="edu_I3104" name="employed_person" value="I3106" /><label for="edu_I3104" class="">교육정도별</label> </li>
					<li><input type="radio" id="sow_I3104" name="employed_person" value="I3107" /><label for="sow_I3104" class="">종사상지위별</label> </li>
					<li><input type="radio" id="work_I3104" name="employed_person" value="I3108" /><label for="work_I3104" class="">취업시간별</label> </li>
					<li><input type="radio" id="occupation_I3104" name="employed_person" value="I3109" /><label for="occupation_I3104" class="">직업별</label> </li>
					<li><input type="radio" id="industry_I3104" name="employed_person" value="I3110" /><label for="industry_I3104" class="">산업별</label> </li>
				</ul>
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3104_condition_C2" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>성별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="gd_I3104" name="I3104_gender_C2" value="0" checked="checked"><label for="gd_I3104" class="on">전체</label> </li>
						<li><input type="radio" id="man_I3104" name="I3104_gender_C2" value="2"><label for="man_I3104" class="">남자</label> </li>
						<li><input type="radio" id="woman_I3104" name="I3104_gender_C2" value="3"><label for="woman_I3104" class="">여자</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3104_condition_C3" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>연령별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="age_tot_I3104" name="I3104_age_C3" value="00" checked="checked"><label for="age_tot_I3104" class="on">전체</label> </li>
						<li><input type="radio" id="15_19_I3104" name="I3104_age_C3" value="10"><label for="15_19_I3104" class="">15~29세</label> </li>
						<li><input type="radio" id="20_29_I3104" name="I3104_age_C3" value="20"><label for="20_29_I3104" class="">20~29세</label> </li>
						<li><input type="radio" id="30_39_I3104" name="I3104_age_C3" value="30"><label for="30_39_I3104" class="">30~39세</label> </li>
						<li><input type="radio" id="40_49_I3104" name="I3104_age_C3" value="40"><label for="40_49_I3104" class="">40~49세</label> </li>
						<li><input type="radio" id="50_59_I3104" name="I3104_age_C3" value="50"><label for="50_59_I3104" class="">50~59세</label> </li>
						<!-- <li><input type="radio" id="60_over_I3104" name="I3104_age_C3" value="95"><label for="60_over_I3104" class="">60세 이상</label> </li> -->
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3104_condition_C4" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>교육정도별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="edu_tot_I3104" name="I3104_edu_C4" value="00" checked="checked"><label for="edu_tot_I3104" class="on">전체</label> </li>
						<li><input type="radio" id="edu_pri_I3104" name="I3104_edu_C4" value="10"><label for="edu_pri_I3104" class="">초졸이하</label> </li>
						<li><input type="radio" id="edu_mid_I3104" name="I3104_edu_C4" value="20"><label for="edu_mid_I3104" class="">중졸</label> </li>
						<li><input type="radio" id="edu_high_I3104" name="I3104_edu_C4" value="30"><label for="edu_high_I3104" class="">고졸</label> </li>
						<li><input type="radio" id="edu_uni_I3104" name="I3104_edu_C4" value="40"><label for="edu_uni_I3104" class="">대졸이상</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3104_condition_C5" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>종사상지위별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="sow_tot" name="I3104_sow_C5" value="00" checked="checked"><label for="sow_tot" class="on">전체</label> </li>
						<li><input type="radio" id="sow_non" name="I3104_sow_C5" value="05"><label for="sow_non" class="">비임금근로자</label> </li>
						<li><input type="radio" id="sow_ind" name="I3104_sow_C5" value="06"><label for="sow_ind" class="">자영업자</label> </li>
						<li><input type="radio" id="sow_emp" name="I3104_sow_C5" value="10"><label for="sow_emp" class="">고용원이 있는 자영업자</label> </li>
						<li><input type="radio" id="sow_own" name="I3104_sow_C5" value="21"><label for="sow_own" class="">고용원이 없는 자영업자</label> </li>
						<li><input type="radio" id="sow_unpaid" name="I3104_sow_C5" value="22"><label for="sow_unpaid" class="">무급가족종사자</label> </li>
						<li><input type="radio" id="sow_wage" name="I3104_sow_C5" value="30"><label for="sow_wage" class="">임금근로자</label> </li>
						<li><input type="radio" id="sow_regular" name="I3104_sow_C5" value="41"><label for="sow_regular" class="">상용근로자</label> </li>
						<li><input type="radio" id="sow_temp" name="I3104_sow_C5" value="51"><label for="sow_temp" class="">임시근로자</label> </li>
						<li><input type="radio" id="sow_daily" name="I3104_sow_C5" value="52"><label for="sow_daily" class="">일용근로자</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3104_condition_C6" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>취업시간별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="work_tot" name="I3104_work_C6" value="00" checked="checked"><label for="work_tot" class="on">전체</label> </li>
						<li><input type="radio" id="1_17" name="I3104_work_C6" value="10"><label for="1_17" class="">1~17시간</label> </li>
						<li><input type="radio" id="18_35" name="I3104_work_C6" value="20"><label for="18_35" class="">18~35시간</label> </li>
						<li><input type="radio" id="36_44" name="I3104_work_C6" value="30"><label for="36_44" class="">36~44시간</label> </li>
						<li><input type="radio" id="45_53" name="I3104_work_C6" value="40"><label for="45_53" class="">45~53시간</label> </li>
						<li><input type="radio" id="36_less" name="I3104_work_C6" value="50"><label for="36_less" class="">36시간미만</label> </li>
						<li><input type="radio" id="54_over" name="I3104_work_C6" value="60"><label for="54_over" class="">54시간 이상</label> </li>
						<!-- <li><input type="radio" id="36_over" name="I3104_work_C6" value="70"><label for="36_over" class="">36시간 이상</label> </li> -->
						<li><input type="radio" id="temploraily" name="I3104_work_C6" value="80"><label for="temploraily" class="">일시휴직자</label> </li>
						<li><input type="radio" id="average" name="I3104_work_C6" value="90"><label for="average" class="">주당평균취업시간</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3104_condition_C7" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>직업별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="occupation_tot" name="I3104_occupation_C7" value="00" checked="checked"><label for="occupation_tot" class="on">전체</label> </li>
						<li><input type="radio" id="mng_pro" name="I3104_occupation_C7" value="10"><label for="mng_pro" class="">관리자·전문가(12)</label> </li>
						<li><input type="radio" id="managers" name="I3104_occupation_C7" value="20"><label for="managers" class="">관리자</label> </li>
						<li><input type="radio" id="professional" name="I3104_occupation_C7" value="30"><label for="professional" class="">전문가 및 관련 종사자</label> </li>
						<li><input type="radio" id="clerks" name="I3104_occupation_C7" value="40"><label for="clerks" class="">사무 종사자</label> </li>
						<li><input type="radio" id="service_sales" name="I3104_occupation_C7" value="50"><label for="service_sales" class="">서비스·판매 종사자(45)</label> </li>
						<li><input type="radio" id="service" name="I3104_occupation_C7" value="60"><label for="service" class="">서비스 종사자</label> </li>
						<li><input type="radio" id="sales" name="I3104_occupation_C7" value="70"><label for="sales" class="">판매 종사자</label> </li>
						<li><input type="radio" id="agricultural_fishery" name="I3104_occupation_C7" value="80"><label for="agricultural_fishery" class="">농림어업 숙련 종사자</label> </li>
						<li><input type="radio" id="craftmachine_elementary" name="I3104_occupation_C7" value="90"><label for="craftmachine_elementary" class="">기능·기계조작·조립·단순노무 종사자(7~9)</label> </li>
						<li><input type="radio" id="craft_related" name="I3104_occupation_C7" value="90"><label for="craft_related" class="">기능원 및 관련 기능종사자</label> </li>
						<li><input type="radio" id="equipment_assembling" name="I3104_occupation_C7" value="90"><label for="equipment_assembling" class="">장치기계조작 및 조립종사자</label> </li>
						<li><input type="radio" id="elementary" name="I3104_occupation_C7" value="90"><label for="elementary" class="">단순노무 종사자</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3104_condition_C8" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>산업별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="industry_tot" name="I3104_industry_C8" value="00" checked="checked"><label for="industry_tot" class="on">전체</label> </li>
						<li><input type="radio" id="agriculture_forestry_fishing" name="I3104_industry_C8" value="01"><label for="agriculture_forestry_fishing" class="">농업 임업 및 어업(01~03)</label> </li>
						<li><input type="radio" id="mining_manufacturing" name="I3104_industry_C8" value="04"><label for="mining_manufacturing" class="">광공업(BC)</label> </li>
						<!-- <li><input type="radio" id="mining_quarrying" name="I3104_industry_C8" value="05"><label for="mining_quarrying" class="">광업(05~08)</label> </li> -->
						<li><input type="radio" id="manufacturing" name="I3104_industry_C8" value="10"><label for="manufacturing" class="">제조업(10~34)</label> </li>
						<li><input type="radio" id="soc_services" name="I3104_industry_C8" value="30"><label for="soc_services" class="">사회간접자본 및 기타서비스업(D~U)</label> </li>
						<!-- <li><input type="radio" id="electricity_air" name="I3104_industry_C8" value="35"><label for="electricity_air" class="">전기 가스 증기 및 공기조절 공급업(35)</label> </li>
						<li><input type="radio" id="water_supply" name="I3104_industry_C8" value="37"><label for="water_supply" class="">수도 하수 및 폐기물 처리 원료 재생업(36 ~ 39)</label> </li> -->
						<li><input type="radio" id="construction" name="I3104_industry_C8" value="41"><label for="construction" class="">건설업(41~42)</label> </li>
						<li><input type="radio" id="wholesale_restaurants" name="I3104_industry_C8" value="42"><label for="wholesale_restaurants" class="">도소매·숙박음식점업(GI)</label> </li>
						<li><input type="radio" id="business_service" name="I3104_industry_C8" value="43"><label for="business_service" class="">사업·개인·공공서비스 및 기타(EL~U)</label> </li>
						<li><input type="radio" id="electricity_transport_finance" name="I3104_industry_C8" value="44"><label for="electricity_transport_finance" class="">전기·운수·통신·금융(DHJK)</label> </li>
						<!-- <li><input type="radio" id="wholesale_retail" name="I3104_industry_C8" value="45"><label for="wholesale_retail" class="">도매 및 소매업(45~47)</label> </li>
						<li><input type="radio" id="transportation_storage" name="I3104_industry_C8" value="49"><label for="transportation_storage" class="">운수 및 창고업(49~52)</label> </li>
						<li><input type="radio" id="accommodation_food" name="I3104_industry_C8" value="55"><label for="accommodation_food" class="">숙박 및 음식점업(55~56)</label> </li>
						<li><input type="radio" id="information_communication" name="I3104_industry_C8" value="58"><label for="information_communication" class="">정보통신업(58~63)</label> </li>
						<li><input type="radio" id="financial_insurance" name="I3104_industry_C8" value="64"><label for="financial_insurance" class="">금융 및 보험업(64~66)</label> </li>
						<li><input type="radio" id="real_estate" name="I3104_industry_C8" value="68"><label for="real_estate" class="">부동산업(68)</label> </li>
						<li><input type="radio" id="professional_technical" name="I3104_industry_C8" value="70"><label for="professional_technical" class="">전문 과학 및 기술 서비스업(70~73)</label> </li>
						<li><input type="radio" id="business_facilities_support_services" name="I3104_industry_C8" value="74"><label for="business_facilities_support_services" class="">사업시설 관리 사업 지원 및 임대 서비스업(74~76)</label> </li>
						<li><input type="radio" id="public_defence" name="I3104_industry_C8" value="84"><label for="public_defence" class="">공공행정 국방 및 사회보장 행정(84)</label> </li>
						<li><input type="radio" id="education" name="I3104_industry_C8" value="85"><label for="education" class="">교육 서비스업(85)</label> </li>
						<li><input type="radio" id="health_social" name="I3104_industry_C8" value="86"><label for="health_social" class="">보건업 및 사회복지 서비스업(86~87)</label> </li>
						<li><input type="radio" id="arts_recreation" name="I3104_industry_C8" value="90"><label for="arts_recreation" class="">예술 스포츠 및 여가관련 서비스업(90~91)</label> </li>
						<li><input type="radio" id="membership_personal" name="I3104_industry_C8" value="94"><label for="membership_personal" class="">협회 및 단체 수리 및 기타 개인 서비스업(94~96)</label> </li>
						<li><input type="radio" id="activities_households" name="I3104_industry_C8" value="97"><label for="activities_households" class="">가구 내 고용활동 및 달리 분류되지 않은 자가소비 생산활동(97~98)</label> </li>
						<li><input type="radio" id="activities_bodies" name="I3104_industry_C8" value="99"><label for="activities_bodies" class="">국제 및 외국기관(99)</label> </li> -->
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox" id="I3112_condition_C1" style="display:none; margin-bottom: 0px;">
				<p>분류</p>
				<ul style="padding-bottom: 0px;">
					<li><input type="radio" id="gender_I3112" name="unemployed_person" value="I3112" checked="checked"/><label for="gender_I3112" class="on">성별</label> </li>
					<!-- li><input type="radio" id="age_I3112" name="unemployed_person" value="I3113" /><label for="age_I3112" class="">연령별</label> </li-->
				</ul>
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3112_condition_C2" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>성별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="gd_I3112" name="I3112_gender_C2" value="0" checked="checked"><label for="gd_I3112" class="on">전체</label> </li>
						<li><input type="radio" id="man_I3112" name="I3112_gender_C2" value="2"><label for="man_I3112" class="">남자</label> </li>
						<li><input type="radio" id="woman_I3112" name="I3112_gender_C2" value="3"><label for="woman_I3112" class="">여자</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3112_condition_C3" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>연령별</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="age_tot" name="I3112_age_C3" value="00" checked="checked"><label for="age_tot" class="on">전체</label> </li>
						<li><input type="radio" id="15_29" name="I3112_age_C3" value="75"><label for="15_29" class="">15~29세</label> </li>
						<li><input type="radio" id="30_59" name="I3112_age_C3" value="90"><label for="30_59" class="">30~59세</label> </li>
						<li><input type="radio" id="60_over" name="I3112_age_C3" value="95"><label for="60_over" class="">60세 이상</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox" id="I3117_condition_C2" style="display:none;">	<!-- 2019.07.31[한광희] 일자리통계분석 > 일자리현황 > 비경제활동인구 POPUP 조회 오류 수정 -->
				<p>비경제활동인구</p>
				<!-- <div class="gray-box"> -->
					<ul style="padding-bottom: 0px;">
						<li><input type="radio" id="ne_tot" name="I3117_not_economically_C1" value="00" checked="checked"><label for="ne_tot" class="on">전체</label> </li>
						<li><input type="radio" id="childcare" name="I3117_not_economically_C1" value="10"><label for="childcare" class="">육아</label> </li>
						<li><input type="radio" id="house_keeping" name="I3117_not_economically_C1" value="20"><label for="house_keeping" class="">가사</label> </li>
						<li><input type="radio" id="attending_school" name="I3117_not_economically_C1" value="30"><label for="attending_school" class="">통학</label> </li>
						<!-- <li><input type="radio" id="too_old" name="I3117_not_economically_C1" value="40"><label for="too_old" class="">연로</label> </li>
						<li><input type="radio" id="dis" name="I3117_not_economically_C1" value="50"><label for="dis" class="">심신장애</label> </li>
						<li><input type="radio" id="others" name="I3117_not_economically_C1" value="90"><label for="others" class="">그외</label> </li> -->
					</ul>
				<!-- </div> -->
			</div>
			<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
			<div class="indicator-stepBox" id="I3101_condition_C1" style="display:none; margin-bottom: 0px;">
				<p>분류</p>
				<ul style="padding-bottom: 0px;">
					<li><input type="radio" id="households_I3101" name="population" value="I3101" checked="checked"/><label for="households_I3101" class="on">세대수</label> </li>
					<!-- li><input type="radio" id="in_out_I3101" name="population" value="I3102" /><label for="in_out_I3101" class="">총전입,전출,순이동,시도내,시도간(전출입)</label> </li>
					<li><input type="radio" id="mig_netmig_I3101" name="population" value="I3103" /><label for="mig_netmig_I3101" class="">이동자수,순이동자수</label> </li-->
					<li><input type="radio" id="in_out_I3101" name="population" value="I3102" /><label for="in_out_I3101" class="">총전입,전출,시도내,시도간(전출입)</label> </li>
					<li><input type="radio" id="mig_netmig_I3101" name="population" value="I3103" /><label for="mig_netmig_I3101" class="">이동자수</label> </li>
				</ul>
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3101_condition_C3" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>총전입,전출,순이동,시도내,시도간(전출입)</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="tot_in" name="I3101_in_out_C3" value="T10" checked="checked"><label for="tot_in" class="on">총전입</label> </li>
						<li><input type="radio" id="tot_out" name="I3101_in_out_C3" value="T20"><label for="tot_out" class="">총전출</label> </li>
						<!-- li><input type="radio" id="netmigration" name="I3101_in_out_C3" value="T25"><label for="netmigration" class="">순이동</label> </li-->
						<li><input type="radio" id="intra_sisgunsgus" name="I3101_in_out_C3" value="T30"><label for="intra_sisgunsgus" class="">시도내이동-시군구내</label> </li>
						<li><input type="radio" id="inter_sis_guns_gus_in" name="I3101_in_out_C3" value="T31"><label for="inter_sis_guns_gus_in" class="">시도내이동-시군구간 전입</label> </li>
						<li><input type="radio" id="inter_sis_guns_gus_out" name="I3101_in_out_C3" value="T32"><label for="inter_sis_guns_gus_out" class="">시도내이동-시군구간 전출</label> </li>
						<li><input type="radio" id="inter_province_in" name="I3101_in_out_C3" value="T40"><label for="inter_province_in" class="">시도간전입</label> </li>
						<li><input type="radio" id="inter_province_out" name="I3101_in_out_C3" value="T50"><label for="inter_province_out" class="">시도간전출</label> </li>
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox indicator-stepBox2" id="I3101_condition_C4" style="display:none; margin-top: 0px;">
				<%-- 2019-01-04 상하관계가 눈에 보이도록 UI 수정이 필요함. --%>
				<!-- <p>이동자수,순이동자수</p> -->
				<!-- <div class="gray-box"> -->
					<ul>
						<li><input type="radio" id="migrants" name="I3101_mig_netmig_C4" value="T70" checked="checked"><label for="migrants" class="on">이동자수</label> </li>
						<!-- li><input type="radio" id="net_migrants" name="I3101_mig_netmig_C4" value="T80"><label for="net_migrants" class="">순이동자수</label> </li-->
					</ul>
				<!-- </div> -->
			</div>
			<div class="indicator-stepBox" id="ssaJobStatus_map_type" style="display:none"> <!-- 20181214 손원웅_고객요청 표출방법 히든처리 -->
				<p>표출방법</p>
				<ul>
					<li><input type="radio" id="ssaJS_color_map" name="condition_map_type" value="color" checked="checked"><label for="ssaJS_color_map" class="on">색상지도</label> </li>
					<li><input type="radio" id="ssaJS_bubble_map" name="condition_map_type" value="bubble"><label for="ssaJS_bubble_map" class="">버블지도</label> </li>
					<li><input type="radio" id="ssaJS_heat_map" name="condition_map_type" value="heat"><label for="ssaJS_heat_map" class="">열지도</label> </li>
				</ul>
			</div>
		</div>
		<div class="popup-btn-area">
			<a href="javascript:$ssaJobStatusSearchPopup.ui.addSearchBtn();" class="default-color" id="buttonMakeBtn" data-subj="검색버튼 팁" title="현재 선택된 통계지표 목록에 해당하는 통계조건으로 조회">통계보기</a>	<!-- data-subj="조건결합설정 팁" title="현재 선택된 통계지표 목록에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요" -->
		</div>
	</div>
</div>
<div>
	<input id= "I3111_over" type="text" name="text" readonly value="고용률 mouseover">
	<input id= "I3114_over" type="text" name="text" readonly value="실업률 mouseover">
	<input id= "I3116_over" type="text" name="text" readonly value="청년 실업률 mouseover">
	<input id= "I3104_over" type="text" name="text" readonly value="취업자수 mouseover">
	<input id= "I3112_over" type="text" name="text" readonly value="실업자수 mouseover">
	<input id= "I3117_over" type="text" name="text" readonly value="비경제활동인구 mouseover">
	<input id= "I3101_over" type="text" name="text" readonly value="인구 mouseover">
</div>