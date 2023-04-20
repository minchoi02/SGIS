<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 Left메뉴 JSP  
* File Name     : interactiveLeftMenu.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-09
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> <%-- 2020년 SGIS고도화 3차(테마코드) - JSTL core 추가 (pse) --%>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %> 
<%@ page import="java.util.ArrayList" %>
<div class="shadow"></div>
<div class="quickBox step01">
	<div class="subj">
		<h2>대화형통계지도</h2>
	</div>
	<div id="org_left_menu_chg" class="scrollBox" style="height: calc(100% - 11px);">
		<ul class="themul ul-area interactive-list">
			<li data-key="mainIndex" id="mainIndexBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('mainIndex');"><a  href="javascript:void(0);" data-subj="총조사주요지표" title="${paramInfo.tooltipList.A0001}">총조사주요지표</a></li><!--2019-03-04 박길섭  -->
			<li data-key="populationHouse" id="populationHouseBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('populationHouse');"><a href="javascript:void(0)" data-subj="인구주택총조사" title="${paramInfo.tooltipList.A0102}">인구주택총조사 </a></li><!--2019-03-04 박길섭  -->
			<li data-key="3f" id="gridHideLeftBtn01" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('3f');"><a href="javascript:void(0)" data-subj="농림어업총조사" title="${paramInfo.tooltipList.A0201}">농림어업총조사 </a></li><!--2019-03-04 박길섭  -->
			<li data-key="company" id="companyBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('company');"><a href="javascript:void(0)" data-subj="전국사업체조사" title="${paramInfo.tooltipList.A0301}">전국사업체조사</a></li><!--2019-03-04 박길섭  -->
			<li data-key="ecountry" id="ecountryBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('ecountry');"><a href="javascript:void(0)" data-subj="e-지방지표" title="${paramInfo.tooltipList.A0401}">e-지방지표</a></li>
			<li data-key="publicData" id="publicDataBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('publicData');"><a href="javascript:void(0)" data-subj="공공데이터" title="${paramInfo.tooltipList.A0501}">공공데이터</a></li><!--2019-03-04 박길섭  -->
			<li data-key="userData" id="userDataBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('userData');"><a href="javascript:void(0)" data-subj="나의 데이터" title="${paramInfo.tooltipList.A0601}">나의 데이터</a></li><!--2019-03-04 박길섭  -->
		</ul>
		<ol class="stat-infor" style="padding-bottom: 15px; margin:0px;">
			<li><a href="javascript:$interactiveLeftMenu.ui.doMaxSize();">전체 화면 확대</a></li>
			<li><a href="javascript:$interactiveLeftMenu.ui.doShare();">URL 공유하기</a></li>
			<li><a href="javascript:$interactiveLeftMenu.ui.doBookMark();">즐겨찾기로 저장하기</a></li>
			<li><a href="javascript:$interactiveLeftMenu.ui.doReport();">보고서 보기</a></li>
			<li><a href="javascript:$interactiveLeftMenu.ui.doAddMap();">지도 추가하여 비교하기</a></li>
			<li><a href="javascript:$interactiveLeftMenu.ui.doCombineMap();">지도 겹쳐보기</a></li>
			<li><a href="/view/newhelp/in_help_10_0">도움말 보기</a></li>
		</ol>
		<div style="border:0.5px solid #ddd;"></div>
		<ol class="search-infor">
			<li>
				<a href="javascript:void(0);" style="cursor: default;">집계구 위치 찾기</a><a id="areaTooltip" href="javascript:void(0)" style="float:right; margin-right:10px;margin-bottom:-10px;margin-top:5px;" class="ar" data-subj="집계구 위치 찾기" title="${paramInfo.tooltipList.A0701}"><img src="/img/ico/ico_tooltip01.png" alt="물음표" /></a><br />
				<input type="text" id="outputArea" style="line-height: 20px; width:140px; font-size: 12px; height: 21px" placeholder=" 집계구번호 입력"/>
				<span style="background: #888888;cursor : pointer; padding: 5px 10px 5px 10px;color: #FFFFFF;font-size: 12px;border-radius: 3px;" onclick="$interactiveLeftMenu.event.outputAreaSearch();">검색</span><br />
				
				<!-- mng_s 20201127 이진호 / 기존 집계구 코드 예시가 없는 집계구 코드가 되어 수정-->
				<!-- <label style="font-size: 12px;">ex) 2503060010001</label> -->
				<label style="font-size: 12px;">ex) 2503060020001</label>
				<!-- mng_e 20201127 이진호 -->
				
			</li>
		</ol>
	</div>
	
	<!-- mng_s 20190220 행정구역 그리도용 추가 -->
	<div id="bnd_grid_left_menu_chg" class="scrollBox" style="height: calc(100% - 11px); display:none;">
		<ul class="themul ul-area interactive-list">
			<li data-key="mainIndex" id="mainIndexBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('mainIndex');"><a  href="javascript:void(0);">총조사주요지표</a></li>
			<li data-key="populationHouse" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('populationHouse');"><a href="javascript:void(0)">인구주택총조사 </a></li>
			<li data-key="company" id="companyBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('company');"><a href="javascript:void(0)">전국사업체조사</a></li>
		</ul>
	</div>
	
	<div class="menuAutoClose">
		<input type="radio" name="menuAutoClose_radio" id="menuAutoClose_radio " >
		<!-- <input type="radio " name="menuAutoClose_radio " id="menuAutoClose_radio " onclick="$interactiveLeftMenu.ui.sqlListBoxPosition( '244px'); ">
 		 -->
 		<label for="menuAutoClose_radio " class="on ">메뉴 자동닫기</label>
	</div>
	<div class="bottom "><a href="javascript:void(0) " class="buttom stepClose step01_stepClose">닫기</a></div>
</div>
<!-- mng_s 20190405 김건민  (왼쪽 메뉴 스크롤바 추가)-->
<div class="nav-sidebar"  id="org_left_menu" style="overflow:auto;">
<!-- mng_e 20190405 김건민  -->
	<ul class="thematic nav-list interactive-list">
		<li data-key="mainIndex" id="mainIndexBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('mainIndex');"><a  href="javascript:void(0);" data-subj="총조사주요지표" title="${paramInfo.tooltipList.A0001}" style="background-position: -279px -13px;"><span>총조사<br/>주요지표</span></a></li><!--2019-03-04 박길섭  -->
		<li data-key="populationHouse"  id="populationBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('populationHouse');"><a href="javascript:void(0)" data-subj="인구주택총조사" title="${paramInfo.tooltipList.A0102}"><span>인구주택<br/>총조사</span></a></li><!--2019-03-04 박길섭  -->
		<li data-key="3f" id="gridHideLeftBtn01" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('3f');"><a href="javascript:void(0)" data-subj="농림어업총조사" title="${paramInfo.tooltipList.A0201}"><span>농림어업<br/>총조사</span></a></li><!--2019-03-04 박길섭  -->
		<li data-key="company" id="companyBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('company');"><a href="javascript:void(0)" data-subj="전국사업체조사" title="${paramInfo.tooltipList.A0301}"><span>전국<br/>사업체조사</span></a></li><!--2019-03-04 박길섭  -->
		<li data-key="ecountry"   id="ecountryBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('ecountry');"><a href="javascript:void(0)" data-subj="e-지방지표" title="${paramInfo.tooltipList.A0401}"><span>e-지방지표</span></a></li>
		<li data-key="publicData"  onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('publicData');"><a href="javascript:void(0)" data-subj="공공데이터" title="${paramInfo.tooltipList.A0501}"><span>공공데이터</span></a></li><!--2019-03-04 박길섭  -->
		<li data-key="userData"  onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('userData');"><a href="javascript:void(0)" data-subj="나의 데이터" title="${paramInfo.tooltipList.A0601}"><span>나의 데이터</span></a></li><!--2019-03-04 박길섭  -->
	</ul>
	<div class="list_btn" style="bottom:111px">
		<img src="/images/common/img_list_btn.png" alt="목록"/>
	</div>
	<div class="menuAutoClose secondMenuAutoClose" style="left:3px">
			<input type="radio" name="menuAutoClose_radio " id="menuAutoClose_radio"checked="checked"/>
			<label for="menuAutoClose_radio" class="on" style="color:#fff">자동닫기</label>
	</div>
</div>

<!-- mng_s 20190220 행정구역 그리드용 좌측메뉴 -->
<div class="nav-sidebar" id="bnd_grid_left_menu" style="display:none;">
	<ul class="thematic nav-list interactive-list">
		<li data-key="mainIndex" id="mainIndexBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('mainIndex');"><a  href="javascript:void(0);" style="background-position: -279px -13px;"><span>총조사<br/>주요지표</span></a></li>
		<li data-key="populationHouse" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('populationHouse');"><a href="javascript:void(0)"><span>인구주택<br/>총조사</span></a></li>
		<li data-key="company" id="companyBtn" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('company');"><a href="javascript:void(0)"><span>전국<br/>사업체조사</span></a></li>
		<li data-key="3f" id="gridHideLeftBtn01" onclick="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('3f');"><a href="javascript:void(0)" data-subj="농림어업총조사" title="${paramInfo.tooltipList.A0201}"><span>농림어업<br/>총조사</span></a></li><!--SGIS4_0107 추가 -->
	</ul>
	<div class="list_btn" style="bottom:111px">
		<img src="/images/common/img_list_btn.png" alt="목록"/>
	</div>
	<div class="menuAutoClose secondMenuAutoClose" style="left:3px">
			<input type="radio" name="menuAutoClose_radio " id="menuAutoClose_radio"checked="checked"/>
			<label for="menuAutoClose_radio" class="on" style="color:#fff">자동닫기</label>
	</div>
</div>


<div class="quickBox step02" id="quickBox_2depth" style="background: #fff;">
	<div class="subj">
		<h2 id="submenuTitle">주요지표 선택</h2>
<!-- 		<a href="javascript:void(0)"></a> -->
	</div>
	<div class="scrollBox" style="background: #fff;">
		<div id="API_0301" class="totalResult tr01"><!-- 주요지표 목록보기 -->
			<div class="stepBox mainIndex_stepBox"> 
				<p class="on">주요지표
		    		<select title="주요지표 조사년도" id="mainIndex_year" name="mainIndex_year" style="font-size:13px;"></select>
				</p>
				<ul class="dbTypeCk">
					<li>
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio01" value="tot_ppltn" checked="checked"/>
					    <label for="mainIndex_radio01" class="on">총인구(명)</label>
					    <a href="javascript:void(0)" class="ar" data-subj="총인구(명)" title="${paramInfo.tooltipList.A0002}"><img src="/img/ico/ico_tooltip01.png" alt="물음표" /></a>
					</li>
					<li id="li_mainIndex_radio02">
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio02" value="avg_age" />
					    <label for="mainIndex_radio02">평균나이(세)</label>
					    <a href="javascript:void(0)" class="ar" data-subj="평균나이(세)" title="${paramInfo.tooltipList.A0003}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
					<li id="li_mainIndex_radio03">
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio03" value="ppltn_dnsty" />
					    <label for="mainIndex_radio03">인구밀도(명/㎢)</label>
					    <a href="javascript:void(0)" class="ar" data-subj="인구밀도(명/㎢)" title="${paramInfo.tooltipList.A0004}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
					<li id="li_mainIndex_radio04">
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio04" value="aged_child_idx" />
					    <label for="mainIndex_radio04">노령화지수</label>
					    <a href="javascript:void(0)" class="ar" data-subj="노령화지수" title="${paramInfo.tooltipList.A0005}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
					<li id="li_mainIndex_radio05">
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio05" value="oldage_suprt_per" />
					    <label for="mainIndex_radio05">노년부양비</label>
					    <a href="javascript:void(0)" class="ar" data-subj="노년부양비" title="${paramInfo.tooltipList.A0006}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
					<li id="li_mainIndex_radio06">
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio06" value="juv_suprt_per" />
					    <label for="mainIndex_radio06">유년부양비</label>
					    <a href="javascript:void(0)" class="ar" data-subj="유년부양비" title="${paramInfo.tooltipList.A0007}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
					<li>
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio07" value="tot_family" />
					    <label for="mainIndex_radio07">가구(가구)</label>
					    <a href="javascript:void(0)" class="ar" data-subj="가구(가구)" title="${paramInfo.tooltipList.A0008}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
					<li id="li_mainIndex_radio08">
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio08" value="avg_fmember_cnt" />
					    <label for="mainIndex_radio08">평균 가구원(명)</label>
					    <a href="javascript:void(0)" class="ar" data-subj="평균 가구원(명)" title="${paramInfo.tooltipList.A0009}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
					<li>
					    <input type="radio" name="mainIndex_radio" id="mainIndex_radio09" value="tot_house" />
					    <label for="mainIndex_radio09">주택(호)</label>
					    <a href="javascript:void(0)" class="ar" data-subj="주택(호)" title="${paramInfo.tooltipList.A0010}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
					</li>
				</ul>
			</div>
			<div class="stepBox mainIndex_stepBox" id="mainIndex_box2"> <!-- 2016.08.23 권차욱 9월서비스  -->
		  		<ul class="dbTypeCk mt10">
			        <li id="li_mainIndex_radio10">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio10" value="nongga_cnt" />
			            <label for="mainIndex_radio10">농가(가구)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="농가(가구)" title="${paramInfo.tooltipList.A0011}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			        <li id="li_mainIndex_radio11">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio11" value="nongga_ppltn" />
			            <label for="mainIndex_radio11">농가인구_계(명)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="농가인구_계(명)" title="${paramInfo.tooltipList.A0012}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			        <li id="li_mainIndex_radio12">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio12" value="imga_cnt" />
			            <label for="mainIndex_radio12">임가(가구)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="임가(가구)" title="${paramInfo.tooltipList.A0013}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			        <li id="li_mainIndex_radio13">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio13" value="imga_ppltn" />
			            <label for="mainIndex_radio13">임가인구_계(명)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="임가인구_계(명)" title="${paramInfo.tooltipList.A0014}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			        <li id="li_mainIndex_radio14">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio14" value="naesuoga_cnt" />
			            <label for="mainIndex_radio14">내수면총어가(가구)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="내수면총어가(가구)" title="${paramInfo.tooltipList.A0015}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			        <li id="li_mainIndex_radio15">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio15" value="naesuoga_ppltn" />
			            <label for="mainIndex_radio15">내수면어가인구(명)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="내수면어가인구(명)" title="${paramInfo.tooltipList.A0016}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			        <li id="li_mainIndex_radio16">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio16" value="haesuoga_cnt" />
			            <label for="mainIndex_radio16">해수면총어가(가구)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="해수면총어가(가구)" title="${paramInfo.tooltipList.A0017}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			        <li id="li_mainIndex_radio17">
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio17" value="haesuoga_ppltn" />
			            <label for="mainIndex_radio17">해수면어가인구(명)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="해수면어가인구(명)" title="${paramInfo.tooltipList.A0018}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li>
			 	</ul>
			</div>
			<div class="stepBox mainIndex_stepBox"> 
			    <p class="on">사업체 주요지표
			    	<select title="주요지표 조사년도" id="mainIndex_corp_year" name="mainIndex_corp_year" style="font-size:13px;">
			     	</select>
			    </p>
			    <ul class="dbTypeCk mt10">
			        <li>
			            <input type="radio" name="mainIndex_radio" id="mainIndex_radio18" value="corp_cnt" />
			            <label for="mainIndex_radio18">사업체수(개)</label>
			            <a href="javascript:void(0)" class="ar" data-subj="사업체수(개)" title="${paramInfo.tooltipList.A0019}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
			        </li> 
			    </ul> 
			</div>
		</div>

		<div class="totalResult tr02">
			<!-- 인구주택총조사 통계 -->
			<ol class="cateMenu type01" id="populationTabDiv">
				<li class="on"><a
					href="javascript:$interactiveLeftMenu.ui.populationTab('population');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0101}">인구조건</a></li>
				<li><a
					href="javascript:$interactiveLeftMenu.ui.populationTab('household');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0103}">가구조건</a></li>
				<li><a
					href="javascript:$interactiveLeftMenu.ui.populationTab('house');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0114}">주택조건</a></li>
				<li id="gridHideCombineBtn"><a
					href="javascript:$interactiveLeftMenu.ui.populationTab('combine');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0121}">결합조건</a></li>
			</ol>

			<!-- 인구 조건 Start -->
			<div class="cm01 population_tab" id="API_0302">
				<div class="stepBox">
					<p class="on">
						조사년도(필수) <select title="인구조건 조사년도" id="population_year"
							name="population_year" style="font-size: 13px;">
						</select>
					</p>
					<p class="on">성별(필수)</p>
					<ul class="dbTypeCk radioStepBox validationStepBox">
						<!-- 2016.03.21 수정, class추가 -->
						<li><input type="radio" id="population_gender01"
							name="population_gender" value="0" checked="checked" /> <label
							for="population_gender01" class="mr20 on">전체</label> <input
							type="radio" id="population_gender02" name="population_gender"
							value="1" /> <label for="population_gender02" class="mr20">남자</label>
							<input type="radio" id="population_gender03"
							name="population_gender" value="2" /> <label
							for="population_gender03">여자</label></li>
					</ul>
				</div>
				<div class="stepBox">
					<div class="roundTextBox" id="populationAgeTab">
						<input type="checkbox" title="연령(선택)" /> <span>연령(선택)</span>
					</div>

					<!--20년수정반영 시작 (연령목록선택 - 인구조건)-->
					<div class="selectBox" id="populationAgeSelect" style="position: relative;display:none;border-radius:15px;left:8px;height: 24px;background: #dcdcdc;width: 241px;padding-left: 22px;text-align: left;padding-top:5px;top: 7px;">
						<input type="radio" title="구간선택" class="cT1" value="cT1" name="cT1" checked="true"/>
						<span style="color:#767676;font-size: 13px;">구간선택</span>
						<input type="radio" title="목록선택" class="cT2" value="cT2" name="cT2" style="position: absolute;left: 138px;top: 8px;"/>
						<span style="color:#767676;position: absolute;left: 156px;font-size: 13px;">목록선택</span>
					</div>
					<div class="joinDefault selectOption1">
							<ul class="dbTypeCk ageCk1" id="checkTypeList1" style="margin-top:14px; border-bottom: 1px dashed #ccc;">
								<li>
					    			<input type="radio" name="ageRange1" id="ageRange1" value="ageRange1"><!-- checked="checked" -->
					    			<label for="ageRange1" class="ageRange1">0세 ~ 7세 미만</label>
					    		</li>
								<li>
					    			<input type="radio" name="ageRange2" id="ageRange2" value="ageRange2" />
					    			<label for="ageRange2" class="ageRange2">7세 ~ 13세 미만</label>
					    		</li>
								<li>
					    			<input type="radio" name="ageRange3" id="ageRange3" value="ageRange3" />
					    			<label for="ageRange3" class="ageRange3">13세 ~ 16세 미만</label>
					    		</li>
								<li>
					    			<input type="radio" name="ageRange4" id="ageRange4" value="ageRange4" />
					    			<label for="ageRange4" class="ageRange4">16세 ~ 19세 미만</label>
					    		</li>
							</ul>
							<ul class="dbTypeCk ageCk2" id="checkTypeList2">
								<li>
					    			<input type="radio" name="ageRange5" id="ageRange5" value="ageRange5" />
					    			<label for="ageRange5" class="ageRange5">0세 ~ 15세 미만</label>
					    		</li>
					    		<li>
					    			<input type="radio" name="ageRange6" id="ageRange6" value="ageRange6" />
					    			<label for="ageRange6" class="ageRange6">15세 ~ 65세 미만</label>
					    		</li>
					    		<li>
					    			<input type="radio" name="ageRange7" id="ageRange7" value="ageRange7" />
					    			<label for="ageRange7">65세 이상</label>
					    		</li>
							</ul>		
					</div>	
					<div class="joinDefault selectOption2">
					<!--20년수정반영 끝 (연령목록선택 - 인구조건)-->
						<div class="box_area_option02">
							<!-- 9월서비스 권차욱 수정 -->
							<div class="mgb_12">
								<p class="houseArea">
									<select title="시작범위" id="populationAgeFrom" name="age_from" style="-webkit-appearance: menulist-button;"></select>
									<span>이상 ~</span> <select title="마지막범위" id="populationAgeTo"
										name="age_to" style="-webkit-appearance: menulist-button;"></select> <span id="ageToText">미만</span>
								</p>
							</div>

							<div id="slider-range2"
								class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
								aria-disabled="false">
								<div class="ui-slider-range ui-widget-header ui-corner-all"
									style="left: 19.7324%; width: 8.3612%;"></div>
								<a class="ui-slider-handle ui-state-default ui-corner-all"
									href="#" style="left: 19.7324%;"></a><a
									class="ui-slider-handle ui-state-default ui-corner-all"
									href="#" style="left: 28.0936%;"></a>
							</div>
							<ul class="slider_controll_bar">
								<!-- 2016.09.08 9월 서비스 -->
								<li>0</li>
								<li style="margin-left: 4px;">20</li>
								<li style="margin-left: -2px;">40</li>
								<li style="margin-left: -2px;">60</li>
								<li>80</li>
								<li style="margin-left: -5px;">100+</li>
							</ul>
						</div>
					</div>

					<div class="roundTextBox" id="populationEduTab"
						style="display: none;">
						<!-- 2016.08.23 권차욱 9월서비스 -->
						<input type="checkbox" id="rt02" title="교육정도별(다중선택)" /> <span>교육정도별(다중선택)</span>
					</div>
					<div class="joinDefault">
						<!-- <ul class="studyType">
                     	<li>
                     		<select id="populationEduLevel" title="교육정도선택">
                     			<option value="">교육정도선택</option>
                     			<option value="1">수학없음(미취학포함)</option>
                                       <option value="2">초등학교</option>
                                       <option value="3">중학교</option>
                                       <option value="4">고등학교</option>
                                       <option value="5">전문학사</option>
                                       <option value="6">학사</option>
                                       <option value="7">석사</option>
                       				<option value="8">박사</option>
                     		</select>
                     	</li>
                     </ul> -->
						<ul class="dbTypeCk honinType multiCheckBox">
							<li><input type="checkbox" name="edulevel_1"
								id="edu_level01" value="1" /> <label for="edu_level01">수학없음</label>
								<input type="checkbox" name="edulevel_1" id="edu_level02"
								value="2" /> <label for="edu_level02">초등학교</label></li>
							<li><input type="checkbox" name="edulevel_1"
								id="edu_level03" value="3" /> <label for="edu_level03">중학교</label>
								<input type="checkbox" name="edulevel_1" id="edu_level04"
								value="4" /> <label for="edu_level04">고등학교</label></li>
							<li><input type="checkbox" name="edulevel_1"
								id="edu_level05" value="5" /> <label for="edu_level05">전문학사</label>
								<input type="checkbox" name="edulevel_1" id="edu_level06"
								value="6" /> <label for="edu_level06">학사</label></li>
							<li><input type="checkbox" name="edulevel_1"
								id="edu_level07" value="7" /> <label for="edu_level07">석사</label>
								<input type="checkbox" name="edulevel_1" id="edu_level08"
								value="8" /> <label for="edu_level08">박사</label></li>
						</ul>
					</div>

					<div class="roundTextBox" id="populationMarryTab"
						style="display: none;">
						<!-- 2016.08.23 권차욱 9월서비스 -->
						<input type="checkbox" id="rt03" title="혼인정도별(다중선택)" /> <span>혼인정도별(다중선택)</span>
					</div>
					<div class="joinDefault">
						<ul class="dbTypeCk honinType multiCheckBox">
							<li><input type="checkbox" name="mrg_state_1"
								id="rd_honin01" value="1" /> <label for="rd_honin01">미혼</label>
								<input type="checkbox" name="mrg_state_1" id="rd_honin02"
								value="4" /> <label for="rd_honin02">이혼</label></li>
							<li><input type="checkbox" name="mrg_state_1"
								id="rd_honin03" value="2" /> <label for="rd_honin03">기혼</label>
								<input type="checkbox" name="mrg_state_1" id="rd_honin04"
								value="3" /> <label for="rd_honin04">사별</label></li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 인구 조건 End -->

			<!-- 가구 조건 Start -->
			<div class="cm02 population_tab" id="API_0305">
				<div class="stepBox">
					<p class="on">
						조사년도(필수) <select title="가구조건 조사년도" id="household_year"
							name="household_year" style="font-size: 13px;">
						</select>
					</p>
				</div>
				<div class="stepBox">
					<div class="roundTextBox" id="householdTypeTab">
						<input type="checkbox" title="세대구성(다중선택)" /> <span>세대구성(다중선택)</span>
					</div>
					<div class="joinDefault">
						<ul class="multiCheckBox" style="overflow: visible;">
							<!-- 2016.08.23 권차욱 9월 서비스  -->
							<li><input type="checkbox" id="rd_household01"
								name="household_type" value="01" /> <label for="rd_household01">1세대
									가구</label> <a href="javascript:void(0)" class="ar" data-subj="1세대 가구"
								title="${paramInfo.tooltipList.A0104}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_household02"
								name="household_type" value="02" /> <label for="rd_household02">2세대
									가구</label> <a href="javascript:void(0)" class="ar" data-subj="2세대 가구"
								title="${paramInfo.tooltipList.A0105}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_household03"
								name="household_type" value="03" /> <label for="rd_household03">3세대
									가구</label> <a href="javascript:void(0)" class="ar" data-subj="3세대 가구"
								title="${paramInfo.tooltipList.A0106}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_household04"
								name="household_type" value="04" /> <label for="rd_household04">4세대
									이상 가구</label> <!-- 2016.08.23 권차욱 9월 서비스 - 4세대->4세대 이상 가구 --> <a
								href="javascript:void(0)" class="ar" data-subj="4세대  이상 가구"
								title="${paramInfo.tooltipList.A0122}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<!--2016.08.23 권차욱 9월 서비스 - 5세대 이상 가구 삭제  -->
							<%-- <li>
     <input type="checkbox" id="rd_household05" name="household_type" value="05" />
     <label for="rd_household05">5세대 이상 가구</label>
     <a href="javascript:void(0)" class="ar" data-subj="5세대 이상 가구" title="${paramInfo.tooltipList.A0123}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
 </li> --%>
							<!--2016.08.23 권차욱 9월 서비스 - 라인추가 -->
							<li>
								<div
									style="width: 260px; height: 1px; border-bottom: 1px dashed #cccccc; margin-bottom: 5px;"></div>
								<input type="checkbox" id="rd_household06" name="household_type"
								value="A0" /> <label for="rd_household06">1인가구</label> <a
								href="javascript:void(0)" class="ar" data-subj="1인가구"
								title="${paramInfo.tooltipList.A0107}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a>
							</li>
							<li><input type="checkbox" id="rd_household07"
								name="household_type" value="B0" /> <label for="rd_household07">비혈연가구</label>
								<a href="javascript:void(0)" class="ar" data-subj="비혈연가구"
								title="${paramInfo.tooltipList.A0124}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
						</ul>
					</div>

					<div class="roundTextBox" id="householdOcptnTab"
						style="display: none;">
						<!-- 2016.08.23 권차욱 9월 서비스 -->
						<input type="checkbox" title="점유형태(다중선택)" /> <span>점유형태(다중선택)</span>
					</div>
					<div class="joinDefault">
						<ul class="multiCheckBox">
							<li><input type="checkbox" id="rd_occupy01"
								name="ocptn_type" value="1" /> <label for="rd_occupy01">자기집</label>
								<a href="javascript:void(0)" class="ar" data-subj="자기집"
								title="${paramInfo.tooltipList.A0108}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_occupy02"
								name="ocptn_type" value="2" /> <label for="rd_occupy02">전세(월세없음)</label>
								<a href="javascript:void(0)" class="ar" data-subj="전세"
								title="${paramInfo.tooltipList.A0109}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_occupy03"
								name="ocptn_type" value="3" /> <label for="rd_occupy03">보증금
									있는 월세</label> <a href="javascript:void(0)" class="ar"
								data-subj="보증금 있는 월세" title="${paramInfo.tooltipList.A0110}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_occupy04"
								name="ocptn_type" value="4" /> <label for="rd_occupy04">보증금
									없는 월세</label> <a href="javascript:void(0)" class="ar"
								data-subj="보증금 없는 월세" title="${paramInfo.tooltipList.A0111}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_occupy05"
								name="ocptn_type" value="5" /> <label for="rd_occupy05">사글세</label>
								<a href="javascript:void(0)" class="ar" data-subj="사글세"
								title="${paramInfo.tooltipList.A0112}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_occupy06"
								name="ocptn_type" value="6" /> <label for="rd_occupy06">무상(관사,
									사택, 친척집 등)</label> <a href="javascript:void(0)" class="ar"
								data-subj="무상" title="${paramInfo.tooltipList.A0113}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 가구 조건 End -->

			<!-- 주택 조건 Start -->
			<div class="cm03 population_tab" id="API_0306">
				<div class="stepBox">
					<p class="on">
						조사년도(필수) <select title="주택조건 조사년도" id="house_year"
							name="house_year" style="font-size: 13px;">
						</select>
					</p>
				</div>
				<div class="stepBox">
					<div class="roundTextBox" id="houseTypeTab">
						<input type="checkbox" title="주택유형(다중선택)" />
						<!-- mng_s -->
						<span id="houseTypeTabSpan">주택유형(다중선택)</span> <span
							id="houseTypeTabGrid" style="display: none;">주택유형(단일선택)</span>
					</div>
					<!-- 
<a href="javascript:void(0)" class="roundTextBox" id="houseTypeTab" style="display:none;">
	<input type="checkbox" title="주택유형(단일선택)" />
	<span>주택유형(단일선택)</span>
</a>
 -->
					<div class="joinDefault">
						<ul class="multiCheckBox">
							<li><input type="checkbox" id="rd_home01" name="house_type"
								value="01" /> <label for="rd_home01">단독주택</label> <a
								href="javascript:void(0)" class="ar" data-subj="단독주택"
								title="${paramInfo.tooltipList.A0115}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_home02" name="house_type"
								value="02" /> <label for="rd_home02">아파트</label> <a
								href="javascript:void(0)" class="ar" data-subj="아파트"
								title="${paramInfo.tooltipList.A0116}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_home03" name="house_type"
								value="03" /> <label for="rd_home03">연립주택</label> <a
								href="javascript:void(0)" class="ar" data-subj="연립주택"
								title="${paramInfo.tooltipList.A0117}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_home04" name="house_type"
								value="04" /> <label for="rd_home04">다세대주택</label> <a
								href="javascript:void(0)" class="ar" data-subj="다세대주택"
								title="${paramInfo.tooltipList.A0118}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_home05" name="house_type"
								value="05" /> <label for="rd_home05">비주거용건물(상가,공장,여관
									등)내주택</label> <a href="javascript:void(0)" class="ar"
								data-subj="비거주용건물 내 주택" title="${paramInfo.tooltipList.A0119}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							<li><input type="checkbox" id="rd_home06" name="house_type"
								value="06" /> <label for="rd_home06">주택이외의 거처</label> <a
								href="javascript:void(0)" class="ar" data-subj="주택이외의 거처"
								title="${paramInfo.tooltipList.A0120}"><img
									src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
						</ul>
					</div>

						
					<div class="roundTextBox" id="houseConstYearTab">
						<!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
						<!-- 2019.10.25 건축년도 초기세팅 부활 leekh -->
						<input type="checkbox" title="건축년도(선택)" /> <span>건축년도(선택)</span>
					</div>
					<div class="joinDefault" style="display: none;">
						<!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
						<ul>
							<li>
								<div class="defaultLine">
								<!-- 2019.10.25 건축년도 초기세팅 부활 leekh 시작년도 2018년으로 수정 -->
									<select title="시작년도" id="houseConstYear" name="const_year">
										<option value="20">2020년</option><!-- mng_s 20211018 이진호, 2021 센서스 반영 / 2020건축년도 추가 -->
										<option value="19">2019년</option><!-- mng_s 20201110 이진호, 2019건축년도 추가 -->
										<option value="01">2018년</option>
										<option value="02">2017년</option>
										<option value="03">2016년</option>
										<option value="04">2015년</option>
										<option value="05">2014년</option>
										<option value="06">2013년</option>
										<option value="07">2012년</option>
										<option value="08">2011년</option>
										<option value="09">2010년</option>
										<!-- mng_s 20211006 이진호 -->
										<option value="10">2005년~2009년</option>
										<option value="11">2000년~2004년</option>
										<option value="12">1990년~1999년</option>
										<option value="13">1980년~1989년</option>
										<!-- mng_e 20211006 이진호 -->
										<option value="14">1979년 이전</option>
									</select>
								</div>
							</li>
						</ul>
					</div>

					<!-- 2016.08.30 권차욱 9월 서비스 : 주택사용기간 -->
					<div class="roundTextBox" id="houseUsePeriodTab" style="display:none;">
						<input type="checkbox" title="노후년수(선택)" /> <span>노후년수(선택)</span>
					</div>
					<div class="joinDefault" style="display:none;">
						<ul>
							<li>
								<div class="defaultLine">
									<select title="시작년도" id="houseUsePeriod"
										name="house_use_prid_cd" style="-webkit-appearance: menulist-button;">
										<option value="01">1년 미만</option>
										<option value="02">1년 ~ 2년 미만</option>
										<option value="03">2년 ~ 3년 미만</option>
										<option value="04">3년 ~ 4년 미만</option>
										<option value="05">4년 ~ 5년 미만</option>
										<option value="06">5년 ~ 10년 미만</option>
										<option value="07">10년 ~ 15년 미만</option>
										<option value="08">15년 ~ 20년 미만</option>
										<option value="09">20년 ~ 30년 미만</option>
										<option value="10">30년 ~ 40년 미만</option>
										<option value="11">40년 ~ 50년 미만</option>
										<option value="12">50년 이상</option>
									</select>
								</div>
							</li>
						</ul>
					</div>

					<!-- 2016.08.30 권차욱  9월 서비스 -->
					<div class="roundTextBox" id="houseBdspaceTab">
						<input type="checkbox" title="연면적(선택)" /> <span>연면적(선택)</span>
					</div>
					<div class="joinDefault">
						<div class="box_area_option02">
							<div class="mgb_12">
								<p class="houseArea">
									<select title="시작범위" id="houseBdspaceFrom" name="bdspace_from" style="-webkit-appearance: menulist-button;"></select>
									<span>초과 ~ </span> <select title="마지막범위" id="houseBdspaceTo"
										name="bdspace_to" style="-webkit-appearance: menulist-button;"></select> <span id="houseBdspaceToText">이하</span>
								</p>
								<p class="m2Area">
									<span class="houseBdspaceFrom"></span> <span>초과 ~</span> <span
										class="houseBdspaceTo"></span> <span
										class="houseBdspaceToText">이하</span>
								</p>
							</div>
							<div id="slider-range3" class="slider-range"></div>
							<ul class="slider_controll_bar_long">
								<li>0</li>
								<li style="margin-left: -12px;">20</li>
								<li style="margin-left: -12px;">40</li>
								<li style="margin-left: -14px;">60</li>
								<li style="margin-left: -14px;">85</li>
								<li style="margin-left: -14px;">100</li>
								<li style="margin-left: -14px;">130</li>
								<li style="margin-left: -14px;">165</li>
								<li style="margin-left: -12px;">230</li>
								<li style="margin-left: -18px;">+</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- 주택 조건 End -->

			<!-- 인구+가구+주택 결합조건 Start-->
			<div class="cm04 population_tab" id="API_4011">
				<div class="stepBox">
					<div class="roundTextBox fl">
						조사년도(필수) <select title="인구조건 조사년도" id="population_year_combine"
							name="population_year_combine" class="fl"
							style="font-size: 13px;-webkit-appearance: menulist-button;">
						</select>
					</div>
					<!-- 2016.03.18 수정, 도움말 추가 -->
					<!-- 									    <div class="fusionHelper"> -->
					<!-- 									    	<div> -->
					<!-- 									    		<span>*결합조건은 인구(특별조사구와 외국인 제외), 가구(집단가구 제외), 주택(주택 이외의 거처 제외)의</span><br> -->
					<!-- 									    		<span>&nbsp;&nbsp;세가지 조건을 모두 충족하는 자료만 대상이므로 이용 시 유의바랍니다.</span> -->
					<!-- 									    	</div> -->
					<!-- 									    </div> -->
					<ul class="dbTypeCk flType01 radioStepBox validationStepBox">
						<!-- 2016.03.21 수정, class추가 -->
						<li><input type="radio" name="rd_combine_base"
							id="rd_combine_base01" value="population" /> <label
							for="rd_combine_base01" class="mr20" style="display: none;">인구(명)
								기준</label> <!-- 2016.08.23 권차욱 9월 서비스 --> <!--  <span id="rd_combine_base01-hidden" class="mr20 ml20">인구(명) 기준</span> -->
							<input type="radio" name="rd_combine_base" id="rd_combine_base02"
							value="household" /> <label for="rd_combine_base02" class="mr20"
							style="display: none;">가구수(가구) 기준</label> <!-- 2016.08.23 권차욱 9월 서비스 -->
							<!-- <span id="rd_combine_base02-hidden" class="mr20 ml20">가구수(가구) 기준</span> -->
							<input type="radio" name="rd_combine_base" id="rd_combine_base03"
							value="house" /> <label for="rd_combine_base03"
							style="display: none;">주택수(호) 기준</label> <!-- 2016.08.23 권차욱 9월 서비스 -->
							<!--  <span id="rd_combine_base03-hidden" class="ml20">주택수(호) 기준</span> -->
						</li>
					</ul>
				</div>
				<div class="stepBox join">
					<div class="joinStepBox first" id="fusionPopulation">
						<div class="roundTextBox" id="populationGenderTab_combine">
							<input type="checkbox" title="성별(선택)" /> <span>성별(선택)</span>
						</div>
						<div class="joinDefault">
							<ul class="dbTypeCk radioStepBox validationStepBox">
								<!-- 2016.03.21 수정, class추가 -->
								<li><input type="radio" id="population_gender_combine01"
									name="population_gender_combine" value="0" /> <label
									for="population_gender_combine01" class="mr20">전체</label> <input
									type="radio" id="population_gender_combine02"
									name="population_gender_combine" value="1" /> <label
									for="population_gender_combine02" class="mr20">남자</label> <input
									type="radio" id="population_gender_combine03"
									name="population_gender_combine" value="2" /> <label
									for="population_gender_combine03">여자</label></li>
							</ul>
						</div>

						<div class="roundTextBox" id="populationAgeTab_combine">
							<input type="checkbox" title="연령(선택)" /> <span>연령(선택)</span>
						</div>
						<!--20년수정반영 시작 (연령목록선택 - 결합조건)-->
						
						<!-- mng_s 20200812 이진호 / 결합조건에서 연령목록 선택 삭제 -->
						<!-- 추후 연령목록이 필요할 시 하단 주석을 다 풀면 됨 -->
						<!-- <div class="selectBox" id="populationAgeSelect" style="position: relative;display:none;border-radius:15px;left:-1px;height: 24px;background: #dcdcdc;width: 241px;padding-left: 22px;text-align: left;padding-top:5px;top: 7px;"> -->
							<!-- <input type="radio" title="구간선택" class="cT3" value="cT3" name="cT3" checked="true"/> -->
							<!-- <span style="color:#767676;font-size: 13px;">구간선택</span> -->
							<!-- <input type="radio" title="목록선택" class="cT4" value="cT4" name="cT4" style="position: absolute;left: 138px;top: 8px;"/> -->
							<!-- <span style="color:#767676;position: absolute;left: 156px;font-size: 13px;">목록선택</span> -->
						<!-- </div> -->
						<!-- <div class="joinDefault selectOption3"> -->
							<!-- <ul class="dbTypeCk ageCk3" id="checkTypeList1" style="margin-top:14px; border-bottom: 1px dashed #ccc;"> -->
								<!-- <li> -->
									<!-- <input type="radio" name="ageRange11" id="ageRange11" value="ageRange11"> -->
									<!-- <label for="ageRange11" class="ageRange11">0세 ~ 7세 미만</label> -->
								<!-- </li> -->
								<!-- <li> -->
									<!-- <input type="radio" name="ageRange12" id="ageRange12" value="ageRange12" /> -->
									<!-- <label for="ageRange12" class="ageRange12">7세 ~ 13세 미만</label> -->
								<!-- </li> -->
								<!-- <li> -->
									<!-- <input type="radio" name="ageRange13" id="ageRange13" value="ageRange13" /> -->
									<!-- <label for="ageRange13" class="ageRange13">13세 ~ 16세 미만</label> -->
								<!-- </li> -->
								<!-- <li> -->
									<!-- <input type="radio" name="ageRange14" id="ageRange14" value="ageRange14" /> -->
									<!-- <label for="ageRange14" class="ageRange14">16세 ~ 19세 미만</label> -->
								<!-- </li> -->
							<!-- </ul> -->
							<!-- <ul class="dbTypeCk ageCk4" id="checkTypeList2"> -->
								<!-- <li> -->
									<!-- <input type="radio" name="ageRange15" id="ageRange15" value="ageRange15" /> -->
									<!-- <label for="ageRange15" class="ageRange15">0세 ~ 15세 미만</label> -->
								<!-- </li> -->
								<!-- <li> -->
									<!-- <input type="radio" name="ageRange16" id="ageRange16" value="ageRange16" /> -->
									<!-- <label for="ageRange16" class="ageRange16">15세 ~ 65세 미만</label> -->
								<!-- </li> -->
								<!-- <li> -->
									<!-- <input type="radio" name="ageRange17" id="ageRange17" value="ageRange17" /> -->
									<!-- <label for="ageRange17">65세 이상</label> -->
								<!-- </li> -->
							<!-- </ul> -->
						<!-- </div>	 -->
						<!-- mng_e 20200812 이진호 -->
						
					<div class="joinDefault selectOption4">
					<!--20년수정반영 끝 (연령목록선택 - 결합조건)-->
							<div class="box_area_option02">
								<!-- 9월서비스 권차욱 수정 -->
								<div class="mgb_12">
									<p class="houseArea">
										<select title="시작범위" id="populationAgeFrom_combine"
											name="age_from_combine" style="-webkit-appearance: menulist-button;"></select> <span>이상 ~ </span> <select
											title="마지막범위" id="populationAgeTo_combine"
											name="age_to_combine" style="-webkit-appearance: menulist-button;"></select> <span id="ageToText_combine">미만</span>
									</p>
								</div>

								<div id="slider-range2_combine"
									class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
									aria-disabled="false">
									<div class="ui-slider-range ui-widget-header ui-corner-all"
										style="left: 19.7324%; width: 8.3612%;"></div>
									<a class="ui-slider-handle ui-state-default ui-corner-all"
										href="#" style="left: 19.7324%;"></a><a
										class="ui-slider-handle ui-state-default ui-corner-all"
										href="#" style="left: 28.0936%;"></a>
								</div>
								<ul class="slider_controll_bar">
									<!-- 2016.09.08 9월 서비스 -->
									<li style="margin-left: -8px;">0</li>
									<li style="margin-left: 12px;">20</li>
									<li style="margin-left: 8px;">40</li>
									<li style="margin-left: 7px;">60</li>
									<li style="margin-left: 9px;">80</li>
									<li style="margin-left: 7px;">100+</li>
								</ul>
							</div>
						</div>

						<div class="roundTextBox" id="populationEduTab_combine"
							style="display: none;">
							<!-- 2016.08.23 권차욱 9월 서비스  -->
							<input type="checkbox" title="교육정도별(다중선택)" /> <span>교육정도별(다중선택)</span>
						</div>
						<div class="joinDefault">
							<!-- <ul class="studyType">
                      	<li>
                      		<select id="populationEduLevel_combine" title="교육정도선택">
                      			<option value="">교육정도선택</option>
                      			<option value="1">수학없음(미취학포함)</option>
                                        <option value="2">초등학교</option>
                                        <option value="3">중학교</option>
                                        <option value="4">고등학교</option>
                                        <option value="5">전문학사</option>
                                        <option value="6">학사</option>
                                        <option value="7">석사</option>
                        				<option value="8">박사</option>
                      		</select>
                      	</li>
                      </ul> -->
							<ul class="dbTypeCk honinType multiCheckBox">
								<li><input type="checkbox" name="edulevel_combine"
									id="edu_level_combine01" value="1" /> <label
									for="edu_level_combine01">수학없음</label> <input type="checkbox"
									name="edulevel_combine" id="edu_level_combine02" value="2" />
									<label for="edu_level_combine02">초등학교</label></li>
								<li><input type="checkbox" name="edulevel_combine"
									id="edu_level_combine03" value="3" /> <label
									for="edu_level_combine03">중학교</label> <input type="checkbox"
									name="edulevel_combine" id="edu_level_combine04" value="4" />
									<label for="edu_level_combine04">고등학교</label></li>
								<li><input type="checkbox" name="edulevel_combine"
									id="edu_level_combine05" value="5" /> <label
									for="edu_level_combine05">전문학사</label> <input type="checkbox"
									name="edulevel_combine" id="edu_level_combine06" value="6" />
									<label for="edu_level_combine06">학사</label></li>
								<li><input type="checkbox" name="edulevel_combine"
									id="edu_level_combine07" value="7" /> <label
									for="edu_level_combine07">석사</label> <input type="checkbox"
									name="edulevel_combine" id="edu_level_combine08" value="8" />
									<label for="edu_level_combine08">박사</label></li>
							</ul>
						</div>

						<div class="roundTextBox" id="populationMarryTab_combine"
							style="display: none;">
							<!-- 2016.08.23 권차욱 9월 서비스 -->
							<input type="checkbox" title="혼인정도별(다중선택)" /> <span>혼인정도별(다중선택)</span>
						</div>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType multiCheckBox">
								<li><input type="checkbox" name="mrg_state_combine"
									id="rd_honin_combine01" value="1" /> <label
									for="rd_honin_combine01">미혼</label> <input type="checkbox"
									name="mrg_state_combine" id="rd_honin_combine02" value="4" />
									<label for="rd_honin_combine02">이혼</label></li>
								<li><input type="checkbox" name="mrg_state_combine"
									id="rd_honin_combine03" value="2" /> <label
									for="rd_honin_combine03">기혼</label> <input type="checkbox"
									name="mrg_state_combine" id="rd_honin_combine04" value="3" />
									<label for="rd_honin_combine04">사별</label></li>
							</ul>
						</div>
					</div>

					<div class="joinStepBox" id="fusionHousehold">
						<div class="roundTextBox" id="householdTypeTab_combine">
							<input type="checkbox" title="세대구성(다중선택)" /> <span>세대구성(다중선택)</span>
						</div>
						<div class="joinDefault">
							<ul class="multiCheckBox" style="width: 250px;">
								<li><input type="checkbox" id="rd_household_combine01"
									name="household_type_combine" value="01" /> <label
									for="rd_household_combine01">1세대 가구</label> <a
									href="javascript:void(0)" class="ar" data-subj="1세대 가구"
									title="${paramInfo.tooltipList.A0104}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_household_combine02"
									name="household_type_combine" value="02" /> <label
									for="rd_household_combine02">2세대 가구</label> <a
									href="javascript:void(0)" class="ar" data-subj="2세대 가구"
									title="${paramInfo.tooltipList.A0105}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_household_combine03"
									name="household_type_combine" value="03" /> <label
									for="rd_household_combine03">3세대 가구</label> <a
									href="javascript:void(0)" class="ar" data-subj="3세대 가구"
									title="${paramInfo.tooltipList.A0106}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_household_combine04"
									name="household_type_combine" value="04" /> <label
									for="rd_household_combine04">4세대 이상 가구</label> <!-- 2016.08.23 권차욱 9월 서비스 - 4세대가구->4세대이상가구 -->
									<a href="javascript:void(0)" class="ar" data-subj="4세대 이상 가구"
									title="${paramInfo.tooltipList.A0122}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<!-- 2016.08.23 권차욱 9월 서비스 - 5세대 이상 가구 삭제-->
								<%-- <li>
      <input type="checkbox" id="rd_household_combine05" name="household_type_combine" value="05" />
      <label for="rd_household_combine05">5세대 이상 가구</label>
      <a href="javascript:void(0)" class="ar" data-subj="5세대 이상 가구" title="${paramInfo.tooltipList.A0123}"><img src="/img/ico/ico_tooltip01.png" alt="물음표"  /></a>
  </li> --%>
								<!--2016.08.23 권차욱 9월 서비스 - 라인추가 -->
								<li>
									<div
										style="width: 260px; height: 1px; border-bottom: 1px dashed #cccccc; margin-bottom: 5px;"></div>
									<input type="checkbox" id="rd_household_combine06"
									name="household_type_combine" value="A0" /> <label
									for="rd_household_combine06">1인가구</label> <a
									href="javascript:void(0)" class="ar" data-subj="1인가구"
									title="${paramInfo.tooltipList.A0107}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a>
								</li>
								<li><input type="checkbox" id="rd_household_combine07"
									name="household_type_combine" value="B0" /> <label
									for="rd_household_combine07">비혈연가구</label> <a
									href="javascript:void(0)" class="ar" data-subj="비혈연가구"
									title="${paramInfo.tooltipList.A0124}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							</ul>
						</div>

						<div class="roundTextBox" id="householdOcptnTab_combine"
							style="display: none;">
							<!-- 2016.08.23 권차욱 9월 서비스 -->
							<input type="checkbox" title="점유형태(다중선택)" /> <span>점유형태(다중선택)</span>
						</div>
						<div class="joinDefault">
							<ul class="multiCheckBox" style="width: 250px;">
								<li><input type="checkbox" id="rd_occupy_combine01"
									name="ocptn_type_combine" value="1" /> <label
									for="rd_occupy_combine01">자기집</label> <a
									href="javascript:void(0)" class="ar" data-subj="자기집"
									title="${paramInfo.tooltipList.A0108}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_occupy_combine02"
									name="ocptn_type_combine" value="2" /> <label
									for="rd_occupy_combine02">전세(월세없음)</label> <a
									href="javascript:void(0)" class="ar" data-subj="전세"
									title="${paramInfo.tooltipList.A0109}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_occupy_combine03"
									name="ocptn_type_combine" value="3" /> <label
									for="rd_occupy_combine03">보증금 있는 월세</label> <a
									href="javascript:void(0)" class="ar" data-subj="보증금 있는 월세"
									title="${paramInfo.tooltipList.A0110}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_occupy_combine04"
									name="ocptn_type_combine" value="4" /> <label
									for="rd_occupy_combine04">보증금 없는 월세</label> <a
									href="javascript:void(0)" class="ar" data-subj="보증금 없는 월세"
									title="${paramInfo.tooltipList.A0111}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_occupy_combine05"
									name="ocptn_type_combine" value="5" /> <label
									for="rd_occupy_combine05">사글세</label> <a
									href="javascript:void(0)" class="ar" data-subj="사글세"
									title="${paramInfo.tooltipList.A0112}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_occupy_combine06"
									name="ocptn_type_combine" value="6" /> <label
									for="rd_occupy_combine06">무상(관사, 사택, 친척집 등)</label> <a
									href="javascript:void(0)" class="ar" data-subj="무상"
									title="${paramInfo.tooltipList.A0113}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							</ul>
						</div>
					</div>

					<div class="joinStepBox" id="fusionHouse">
						<div class="roundTextBox" id="houseTypeTab_combine">
							<input type="checkbox" title="주택유형(다중선택)" /> <span>주택유형(다중선택)</span>
						</div>
						<div class="joinDefault">
							<ul class="multiCheckBox" style="width: 250px;">
								<li><input type="checkbox" id="rd_home_combine01"
									name="house_type_combine" value="01" /> <label
									for="rd_home_combine01">단독주택</label> <a
									href="javascript:void(0)" class="ar" data-subj="단독주택"
									title="${paramInfo.tooltipList.A0115}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_home_combine02"
									name="house_type_combine" value="02" /> <label
									for="rd_home_combine02">아파트</label> <a
									href="javascript:void(0)" class="ar" data-subj="아파트"
									title="${paramInfo.tooltipList.A0116}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_home_combine03"
									name="house_type_combine" value="03" /> <label
									for="rd_home_combine03">연립주택</label> <a
									href="javascript:void(0)" class="ar" data-subj="연립주택"
									title="${paramInfo.tooltipList.A0117}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_home_combine04"
									name="house_type_combine" value="04" /> <label
									for="rd_home_combine04">다세대주택</label> <a
									href="javascript:void(0)" class="ar" data-subj="다세대주택"
									title="${paramInfo.tooltipList.A0118}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<li><input type="checkbox" id="rd_home_combine05"
									name="house_type_combine" value="05" /> <label
									for="rd_home_combine05">비주거용건물(상가,공장,여관 등)내주택</label> <a
									href="javascript:void(0)" class="ar" data-subj="비거주용건물"
									title="${paramInfo.tooltipList.A0119}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
								<!-- 2016.08.23 권차욱 9월 서비스 - 주택이외의 거처 살림 -->
								<li><input type="checkbox" id="rd_home_combine06"
									name="house_type_combine" value="06" /> <label
									for="rd_home_combine06">주택이외의 거처</label> <a
									href="javascript:void(0)" class="ar" data-subj="주택이외의 거처"
									title="${paramInfo.tooltipList.A0120}"><img
										src="/img/ico/ico_tooltip01.png" alt="물음표" /></a></li>
							</ul>
						</div>

						<div class="roundTextBox" id="houseConstYearTab_combine">
							<!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
							<!-- 2019.10.25 leekh 다시 활성화함 건축년도 -->
							<input type="checkbox" title="건축년도(선택)" /> <span>건축년도(선택)</span>
						</div>
						<div class="joinDefault" style="display: none;">
							<!-- 2016.08.30 권차욱 9월 서비스 : display:none; -->
							<div class="box_area_option02">
								<ul>
									<li><select title="시작년도" id="houseConstYear_combine"
										name="const_year_combine">
										<!-- 2019.10.25 leekh 2018년 default-->
											<option value="20">2020년</option><!-- mng_s 20211018 이진호, 2021 센서스 반영 / 2020건축년도 추가 -->
											<option value="19">2019년</option><!-- mng_s 20201110 이진호, 2019건축년도 추가 -->
											<option value="01">2018년</option>
											<option value="02">2017년</option>
											<option value="03">2016년</option>
											<option value="04">2015년</option>
											<option value="05">2014년</option>
											<option value="06">2013년</option>
											<option value="07">2012년</option>
											<option value="08">2011년</option>
											<option value="09">2010년</option>
											<!-- mng_s 20211006 이진호 -->
											<option value="10">2005년~2009년</option>
											<option value="11">2000년~2004년</option>
											<option value="12">1990년~1999년</option>
											<option value="13">1980년~1989년</option>
											<!-- mng_e 20211006 이진호 -->
											<option value="14">1979년 이전</option>
									</select></li>
								</ul>
							</div>
						</div>

						<!-- 2016.08.30 권차욱 9월 서비스 : 노후년수-->
						<div class="roundTextBox" id="houseUsePeriodTab_combine"style="display:none;">
							<input type="checkbox" title="노후년수(선택)" /> <span>노후년수(선택)</span>
						</div>
						<div class="joinDefault">
							<ul>
								<li>
									<div class="defaultLine">
										<select title="시작년도" id="houseUsePeriod_combine"
											name="house_use_prid_cd_combine" style="-webkit-appearance: menulist-button;">
											<option value="01">1년 미만</option>
											<option value="02">1년 ~ 2년 미만</option>
											<option value="03">2년 ~ 3년 미만</option>
											<option value="04">3년 ~ 4년 미만</option>
											<option value="05">4년 ~ 5년 미만</option>
											<option value="06">5년 ~ 10년 미만</option>
											<option value="07">10년 ~ 15년 미만</option>
											<option value="08">15년 ~ 20년 미만</option>
											<option value="09">20년 ~ 30년 미만</option>
											<option value="10">30년 ~ 40년 미만</option>
											<option value="11">40년 ~ 50년 미만</option>
											<option value="12">50년 이상</option>
										</select>
									</div>
								</li>
							</ul>
						</div>

						<!-- 2016.09.09 권차욱  9월 서비스 -->
						<div class="roundTextBox" id="houseBdspaceTab_combine">
							<input type="checkbox" title="연면적(선택)" /> <span>연면적(선택)</span>
						</div>
						<div class="joinDefault">
							<div class="box_area_option02">
								<div class="mgb_12" style="margin-left: -12px;">
									<p class="houseArea">
										<select title="시작범위" id="houseBdspaceFrom_combine"name="bdspace_from_combine" style="-webkit-appearance: menulist-button;"></select> 
										<span>초과 ~</span> 
										<select title="마지막범위" id="houseBdspaceTo_combine" name="bdspace_to_combine" style="-webkit-appearance: menulist-button;"></select> 
										<span id="houseBdspaceToText_combine">이하</span>
									</p>
									<p class="m2Area">
										<span class="houseBdspaceFrom_combine">약 18.2평</span> <span>초과
											~</span> <span class="houseBdspaceTo_combine">약 25.8평</span> <span
											class="houseBdspaceToText_combine">이하</span>
									</p>
								</div>
								<div id="slider-range3_combine"
									class="slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
									aria-disabled="false">
									<div class="ui-slider-range ui-widget-header ui-corner-all"
										style="left: 19.7324%; width: 8.3612%;"></div>
									<a class="ui-slider-handle ui-state-default ui-corner-all"
										href="#" style="left: 19.7324%;"></a><a
										class="ui-slider-handle ui-state-default ui-corner-all"
										href="#" style="left: 28.0936%;"></a>
								</div>
								<ul class="slider_controll_bar">
									<li style="margin-left: -6px;">0</li>
									<li style="margin-left: -11px;">20</li>
									<li style="margin-left: -11px;">40</li>
									<li style="margin-left: -9px;">60</li>
									<li style="margin-left: -10px;">85</li>
									<li style="margin-left: -10px;">100</li>
									<li style="margin-left: -10px;">130</li>
									<li style="margin-left: -10px;">165</li>
									<li style="margin-left: -10px;">230</li>
									<li style="margin-left: 224px; position: absolute;">+</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 인구+가구+주택 결합조건 End -->
		</div>

		<!-- 농림어가총조사 통계 -->
		<div class="totalResult tr03">
			<ol class="cateMenu type02" id="3fTabDiv">
				<li class="on"><a
					href="javascript:$interactiveLeftMenu.ui.tripleFTab('farm');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0202}">농가</a></li>
				<li><a
					href="javascript:$interactiveLeftMenu.ui.tripleFTab('forest');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0203}">임가</a></li>
				<li><a
					href="javascript:$interactiveLeftMenu.ui.tripleFTab('fish');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0204}">어가</a></li>
			</ol>

			<!-- 농가 Start -->
			<div class="cm01" id="API_0310">
				<div class="stepBox">
					<p class="on">
						조사년도(필수) <select title="농림어업 조사년도" id="3f_year" name="3f_year"
							style="font-size: 13px;">
						</select>
					</p>
					<p class="on" id="3fFishTab-title">어가 구분(필수)</p>
					<ul class="dbTypeCk radioStepBox validationStepBox"
						id="3fFishTab-content">
						<!-- 2016.03.21 수정, class추가 -->
						<li>
							<!-- 2017. 03. 13 오류 수정 --> <input type="radio"
							name="3f_fish_ppl" id="3f_fish_see" value="1" checked="checked" />
							<label for="3f_fish_see" class="mr20 on">내수면어가</label> <input
							type="radio" name="3f_fish_ppl" id="3f_fish_land" value="2" /> <label
							for="3f_fish_land">해수면어가</label>
						</li>
					</ul>
					<div class="txt01">
						필수항목 설정 시 가구기준 검색조건이 <br />생성되며, 선택항목 추가 설정시 가구원 기준으로 검색됩니다.
					</div>
				</div>

				<div class="stepBox">
					<div class="txt01">추가선택시 가구원 기준 검색</div>
					<div class="roundTextBox" id="3fGenderTab">
						<input type="checkbox" id="rt01" title="가구원 성별(선택)"> <span>가구원
							성별(선택)</span>
					</div>
					<div class="joinDefault">
						<ul class="dbTypeCk radioStepBox">
							<li><input type="radio" name="3f_gender" id="3f_gender01"
								value="0" checked="checked" /> <label for="3f_gender01"
								class="mr20 on">전체</label> <input type="radio" name="3f_gender"
								id="3f_gender02" value="1" /> <label for="3f_gender02"
								class="mr20">남자</label> <input type="radio" name="3f_gender"
								id="3f_gender03" value="2" /> <label for="3f_gender03">여자</label>
							</li>
						</ul>
					</div>

					<div class="roundTextBox" id="3fAgeTab">
						<input type="checkbox" title="해당 가구원 연령 선택"> <span>해당
							가구원 연령(선택)</span>
					</div>
					<!--20년수정반영 시작 (연령목록선택 - 농가,임가,어가)-->
					<div class="selectBox" id="populationAgeSelect" style="position: relative;display:none;border-radius:15px;left:8px;height: 24px;background: #dcdcdc;width: 241px;padding-left: 22px;text-align: left;padding-top:5px;top: 7px;">
						<input type="radio" title="구간선택" class="cT5" value="cT5" name="cT5" checked="true"/>
						<span style="color:#767676;font-size: 13px;">구간선택</span>
						<input type="radio" title="목록선택" class="cT6" value="cT6" name="cT6" style="position: absolute;left: 138px;top: 8px;"/>
						<span style="color:#767676;position: absolute;left: 156px;font-size: 13px;">목록선택</span>
					</div>
					<div class="joinDefault selectOption5">
							<ul class="dbTypeCk ageCk5" id="checkTypeList1" style="margin-top:14px; border-bottom: 1px dashed #ccc;">
								<li>
					    			<input type="radio" name="ageRange21" id="ageRange21" value="ageRange21"><!-- checked="checked" -->
					    			<label for="ageRange21" class="ageRange1">0세 ~ 7세 미만</label>
					    		</li>
								<li>
					    			<input type="radio" name="ageRange22" id="ageRange22" value="ageRange22" />
					    			<label for="ageRange22" class="ageRange2">7세 ~ 13세 미만</label>
					    		</li>
								<li>
					    			<input type="radio" name="ageRange23" id="ageRange23" value="ageRange23" />
					    			<label for="ageRange23" class="ageRange3">13세 ~ 16세 미만</label>
					    		</li>
								<li>
					    			<input type="radio" name="ageRange24" id="ageRange24" value="ageRange24" />
					    			<label for="ageRange24" class="ageRange4">16세 ~ 19세 미만</label>
					    		</li>
							</ul>
							<ul class="dbTypeCk ageCk6" id="checkTypeList2">
								<li>
					    			<input type="radio" name="ageRange25" id="ageRange25" value="ageRange25" />
					    			<label for="ageRange25" class="ageRange5">0세 ~ 15세 미만</label>
					    		</li>
					    		<li>
					    			<input type="radio" name="ageRange26" id="ageRange26" value="ageRange26" />
					    			<label for="ageRange26" class="ageRange6">15세 ~ 65세 미만</label>
					    		</li>
					    		<li>
					    			<input type="radio" name="ageRange27" id="ageRange27" value="ageRange27" />
					    			<label for="ageRange27">65세 이상</label>
					    		</li>
							</ul>		
					</div>	
					<div class="joinDefault selectOption6">
					<!--20년수정반영 끝 (연령목록선택 - 농가,임가,어가)-->
						<div class="box_area_option02">
							<!-- 9월서비스 권차욱 수정  -->
							<div class="mgb_12">
								<p class="houseArea">
									<select title="시작범위" id="3fAgeFrom" name="age_from" style="-webkit-appearance: menulist-button;"></select> <span>이상
										~</span> <select title="마지막범위" id="3fAgeTo" name="age_to" style="-webkit-appearance: menulist-button;"></select> <span
										id="3fAgeToText">미만</span>
								</p>
							</div>
							<div id="slider-range4" class="slider-range"></div>
							<ul class="slider_controll_bar">
								<!-- 2016.09.08 9월 서비스 -->
								<li>0</li>
								<li style="margin-left: 4px;">20</li>
								<li style="margin-left: -2px;">40</li>
								<li style="margin-left: -2px;">60</li>
								<li style="margin-left: -2px;">80</li>
								<li style="margin-left: -5px;">100+</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- 농가 End -->
		</div>

		<!-- 사업체총조사 통계 Start -->
		<div class="totalResult tr04">
			<ol class="cateMenu" id="companyTabDiv">
				<li class="on"><a
					href="javascript:$interactiveLeftMenu.ui.companyTab('industry');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0302}">산업분류</a></li>
				<li id="gridCompanyThemaHide"><a
					href="javascript:$interactiveLeftMenu.ui.companyTab('theme');"
					data-subj="조건설정 팁" title="${paramInfo.tooltipList.A0303}">테마업종</a></li>
			</ol>

			<!-- 산업분류 Start -->
			<div class="cm01 company_tab" id="API_0304-b">
				<div class="stepBox">
					<p class="on">
						조사년도(필수) <select title="사업체 조사년도" id="company_year"
							name="company_year" style="font-size: 13px;"
							onchange="javascript:$interactiveLeftMenu.ui.setDetailStatsPanel('company2');">
						</select>
					</p>
					<!-- <ul>
    <li>
                          <div class="etcRight">
                          	<span>산업분류차수</span>
                           <span>2006년~현재 :9차</span>
                           <span>2000년~2005년 :8차</span>
                          </div>
    </li>
</ul> -->
					<p class="on">대상 선택하기(필수)</p>
					<ul class="radioStepBox validationStepBox">
						<!-- 2016.03.21 수정, class추가 -->
						<li>
							<input type="checkbox" id="rd_cData_type01"
							name="cDataType" value="corp_cnt" checked="checked" /> 
							<label for="rd_cData_type01" class="mr20 on">사업체수</label> 
							<input type="checkbox" id="rd_cData_type02" name="cDataType"
							value="tot_worker" /> 
							<label for="rd_cData_type02">종사자수</label>
						</li>
					</ul>
				</div>
				<div class="stepBox" id="gridCompanyKsscHide">
					<a href="javascript:$interactiveLeftMenu.ui.companyClassView();"
						data-subj="표준산업분류목록 팁"
						title="설정한 조사년도 기준의 산업분류차수목록을 열람하여 조사 업종에 대하여 조회할 수 있습니다."
						class="roundArrBox">표준산업분류목록</a>
				</div>
			</div>
			<!-- 산업분류 End -->

			<!-- 테마업종 Start -->
			<div class="cm02 company_tab" id="API_0304-a">
				<div class="stepBox">
					<!-- mng_s 2017. 12. 05 j.h.Seok -->
					<p class="on">
						조사년도(필수) <select title="사업체 조사년도" id="company_year_theme"
							name="company_year_theme" style="font-size: 13px;">
						</select>
					</p>
					<!-- mng_e 2017. 12. 05 j.h.Seok -->
					<p class="on">대상 선택하기(필수)</p>
					<ul class="radioStepBox validationStepBox">
						<!-- 2016.03.21 수정, class추가 -->
						<li><input type="checkbox" id="rd_cDataType01"
							name="cDataType1" value="corp_cnt" checked="checked" /> <label
							for="rd_cDataType01" class="mr20 on">사업체수</label> <input
							type="checkbox" id="rd_cDataType02" name="cDataType1"
							value="tot_worker" /> <label for="rd_cDataType02" class="mr20">종사자수</label>
						</li>
					</ul>
					<p class="on">테마유형 사업체(필수)</p>
					<div id="themeCodeList">
						
						<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 기존 코드 주석처리  (pse)--%>
						<%--
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>생활서비스</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_1001" value="1001" /> <label for="theme_1001">인테리어</label>
									<input type="checkbox" name="theme_codes" id="theme_1002"
									value="1002" /> <label for="theme_1002">목욕탕</label> <input
									type="checkbox" name="theme_codes" id="theme_1003" value="1003" />
									<label for="theme_1003">교습학원</label> <input type="checkbox"
									name="theme_codes" id="theme_1004" value="1004" /> <label
									for="theme_1004">어학원</label> <input type="checkbox"
									name="theme_codes" id="theme_1005" value="1005" /> <label
									for="theme_1005">예체능학원</label> <input type="checkbox"
									name="theme_codes" id="theme_1006" value="1006" /> <label
									for="theme_1006">부동산중개업</label> <input type="checkbox"
									name="theme_codes" id="theme_1007" value="1007" /> <label
									for="theme_1007">이발소</label> <input type="checkbox"
									name="theme_codes" id="theme_1008" value="1008" /> <label
									for="theme_1008">미용실</label> <input type="checkbox"
									name="theme_codes" id="theme_1009" value="1009" /> <label
									for="theme_1009">세탁소</label> <input type="checkbox"
									name="theme_codes" id="theme_1010" value="1010" /> <label
									for="theme_1010">PC방</label> <input type="checkbox"
									name="theme_codes" id="theme_1011" value="1011" /> <label
									for="theme_1011">노래방</label></li>
							</ul>
						</div>
						
						<!-- mng_s 20200615 이진호 -->
						<!-- 도소매를 소매업 으로 변경 -->
						<!--<a href="javascript:void(0)" class="subRoundTextBox"> <span>도소매</span>-->
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>소매업</span> </a>
						<!-- mng_e 20200615 이진호 -->
						
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_2001" value="2001" /> <label for="theme_2001">문구점</label>
									<input type="checkbox" name="theme_codes" id="theme_2002"
									value="2002" /> <label for="theme_2002">서점</label> <input
									type="checkbox" name="theme_codes" id="theme_2003" value="2003" />
									<label for="theme_2003">편의점</label> <input type="checkbox"
									name="theme_codes" id="theme_2004" value="2004" /> <label
									for="theme_2004">식료품점</label> <input type="checkbox"
									name="theme_codes" id="theme_2005" value="2005" /> <label
									for="theme_2005">휴대폰점</label> <input type="checkbox"
									name="theme_codes" id="theme_2006" value="2006" /> <label
									for="theme_2006">의류</label> <input type="checkbox"
									name="theme_codes" id="theme_2007" value="2007" /> <label
									for="theme_2007">화장품/방향제</label> <input type="checkbox"
									name="theme_codes" id="theme_2008" value="2008" /> <label
									for="theme_2008">철물점</label> <input type="checkbox"
									name="theme_codes" id="theme_2009" value="2009" /> <label
									for="theme_2009">주유소</label> <input type="checkbox"
									name="theme_codes" id="theme_2010" value="2010" /> <label
									for="theme_2010">꽃집</label> <input type="checkbox"
									name="theme_codes" id="theme_2011" value="2011" /> <label
									for="theme_2011">슈퍼마켓</label></li>
							</ul>
						</div>
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>숙박</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_4001" value="4001" /> <label for="theme_4001">호텔</label>
									<input type="checkbox" name="theme_codes" id="theme_4002"
									value="4002" /> <label for="theme_4002">여관(모텔포함)및 여인숙</label>
									<input type="checkbox" name="theme_codes" id="theme_4003"
									value="4003" /> <label for="theme_4003">펜션</label>
								</li>
							</ul>
						</div>
						<a id="food" href="javascript:void(0)" class="subRoundTextBox">
							<span>음식점</span>
						</a>
						<div id="foodInfo" class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_5001" value="5001" /> <label for="theme_5001">한식</label>
									<input type="checkbox" name="theme_codes" id="theme_5002"
									value="5002" /> <label for="theme_5002">중식</label> <input
									type="checkbox" name="theme_codes" id="theme_5003" value="5003" />
									<label for="theme_5003">일식</label> <input type="checkbox"
									name="theme_codes" id="theme_5004" value="5004" /> <label
									for="theme_5004">분식</label> <input type="checkbox"
									name="theme_codes" id="theme_5005" value="5005" /> <label
									for="theme_5005">서양식</label> <input type="checkbox"
									name="theme_codes" id="theme_5006" value="5006" /> <label
									for="theme_5006">제과점</label> <input type="checkbox"
									name="theme_codes" id="theme_5007" value="5007" /> <label
									for="theme_5007">패스트푸드</label> <input type="checkbox"
									name="theme_codes" id="theme_5008" value="5008" /> <label
									for="theme_5008">치킨</label> <input type="checkbox"
									name="theme_codes" id="theme_5009" value="5009" /> <label
									for="theme_5009">호프 및 간이주점</label> <input type="checkbox"
									name="theme_codes" id="theme_5010" value="5010" /> <label
									for="theme_5010">카페</label> <input type="checkbox"
									name="theme_codes" id="theme_5011" value="5011" /> <label
									for="theme_5011">기타 외국식</label></li>
							</ul>
						</div>
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>교통</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_3001" value="3001" /> <label for="theme_3001">지하철역</label>
									<input type="checkbox" name="theme_codes" id="theme_3002"
									value="3002" /> <label for="theme_3002">터미널</label></li>
							</ul>
						</div>
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>공공</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_6001" value="6001" /> <label for="theme_6001">우체국</label>
									<input type="checkbox" name="theme_codes" id="theme_6002"
									value="6002" /> <label for="theme_6002">행정기관</label> <input
									type="checkbox" name="theme_codes" id="theme_6003" value="6003" />
									<label for="theme_6003">경찰/지구대</label> <input type="checkbox"
									name="theme_codes" id="theme_6004" value="6004" /> <label
									for="theme_6004">소방서</label></li>
							</ul>
						</div>
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>교육</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_7001" value="7001" /> <label for="theme_7001">초등학교</label>
									<input type="checkbox" name="theme_codes" id="theme_7002"
									value="7002" /> <label for="theme_7002">중학교</label> <input
									type="checkbox" name="theme_codes" id="theme_7003" value="7003" />
									<label for="theme_7003">고등학교</label> <input type="checkbox"
									name="theme_codes" id="theme_7004" value="7004" /> <label
									for="theme_7004">전문대학</label> <input type="checkbox"
									name="theme_codes" id="theme_7005" value="7005" /> <label
									for="theme_7005">대학교</label> <input type="checkbox"
									name="theme_codes" id="theme_7006" value="7006" /> <label
									for="theme_7006">대학원</label> <input type="checkbox"
									name="theme_codes" id="theme_7007" value="7007" /> <label
									for="theme_7007">어린이보육업</label></li>
							</ul>
						</div>
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>기업</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_8001" value="8001" /> <label for="theme_8001">제조/화학</label>
									<input type="checkbox" name="theme_codes" id="theme_8002"
									value="8002" /> <label for="theme_8002">서비스</label> <input
									type="checkbox" name="theme_codes" id="theme_8003" value="8003" />
									<label for="theme_8003">통신/IT</label> <input type="checkbox"
									name="theme_codes" id="theme_8004" value="8004" /> <label
									for="theme_8004">건설</label> <input type="checkbox"
									name="theme_codes" id="theme_8005" value="8005" /> <label
									for="theme_8005">판매/유통</label> <input type="checkbox"
									name="theme_codes" id="theme_8006" value="8006" /> <label
									for="theme_8006">기타금융업</label> <input type="checkbox"
									name="theme_codes" id="theme_8007" value="8007" /> <label
									for="theme_8007">기타의료업</label> <input type="checkbox"
									name="theme_codes" id="theme_8008" value="8008" /> <label
									for="theme_8008">문화/체육</label></li>
							</ul>
						</div>
						<a href="javascript:void(0)" class="subRoundTextBox"> <span>편의/문화</span>
						</a>
						<div class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li><input type="checkbox" name="theme_codes"
									id="theme_9001" value="9001" /> <label for="theme_9001">백화점/중대형마트</label>
									<input type="checkbox" name="theme_codes" id="theme_9002"
									value="9002" /> <label for="theme_9002">은행</label> <input
									type="checkbox" name="theme_codes" id="theme_9003" value="9003" />
									<label for="theme_9003">병원</label> <input type="checkbox"
									name="theme_codes" id="theme_9004" value="9004" /> <label
									for="theme_9004">극장/영화관</label> <input type="checkbox"
									name="theme_codes" id="theme_9005" value="9005" /> <label
									for="theme_9005">도서관/박물관</label></li>
							</ul>
						</div>
						--%>
						<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 기존 코드 주석처리  (pse)--%>
						
						<%-- 2020년 SGIS고도화 3차(테마코드) 시작 - 하드 코딩 해소 (pse) --%>
						<c:forEach items="${allThemeCdInfo }" var="bigThemeItem" varStatus="status">
						<a id="${bigThemeItem.b_theme_cd}" href="javascript:void(0)" class="subRoundTextBox"><span>${bigThemeItem.b_theme_cd_nm}</span></a>
						<div id="${bigThemeItem.b_theme_cd}_info" class="joinDefault">
							<ul class="dbTypeCk honinType subRadioStepBox">
								<li>
								<c:forEach items="${bigThemeItem.s_theme_list }" var="smallThemeItem" varStatus="smallStatus">
									<input type="checkbox" name="theme_codes" id="theme_${smallThemeItem.theme_cd}" value="${smallThemeItem.theme_cd}" />
									<label for="theme_${smallThemeItem.theme_cd}">${smallThemeItem.s_theme_cd_nm}</label>
								</c:forEach>
								</li>
							</ul>
						</div>
						</c:forEach>
						<%-- 2020년 SGIS고도화 3차(테마코드) 끝 - 하드 코딩 해소 (pse) --%>
					</div>
				</div>
			</div>
			<!-- 테마업종 End -->
		</div>
		<!-- 사업체총조사 통계 End -->

		<!-- 행정구역 통계목록보기 Start -->
		<div class="totalResult tr05">
			<div id="kosis">
				<div class="stepBox">
					<ul>
						<li><input type="text" class="inp" id="kosisSearchText"
							placeholder="통계항목 검색" title="통계항목 검색" />
							<a class="inputSearchKeyboard" onClick="javascript:openKeyboard('kosisSearchText', 'kosisSearchBtn');" style="position:absolute; margin-left:-30px; margin-top:4px;">
								<img class="keyimg" src="/js/plugins/keyboard/img/key_off.png" style="display:inline-block; width:25px; height:15px; vertical-align: middle;">
							</a>
							<a id="kosisSearchBtn" onClick="javascript:interactiveMapKosis.kosisSearch(0);"
							class="btn_stepSearch">검색</a></li>
						<li
							style="height: auto; text-align: right; padding-top: 5px; margin-bottom: -8px;">
							<img src="/img/ico/kosis_gis_se_sido.png"
							style="vertical-align: middle;" alt="시도" /> : 시도 <img
							src="/img/ico/kosis_gis_se_sgg.png"
							style="vertical-align: middle;" alt="시군구" /> : 시군구 <img
							src="/img/ico/kosis_gis_se_adm.png"
							style="vertical-align: middle;" alt="읍면동" /> : 읍면동
						</li>
					</ul>
				</div>
				<!-- kosis 리스트 -->
				<div class="stepTreeBox" id="kosisStatsTree"></div>

				<!-- 검색 리스트 -->
				<div class="stepBox xWidth" id="kosis_SearchBox"
					style="display: none;">
					<div style="text-align: center;">
						<a href="javascript:interactiveMapKosis.kosisTreeShow();"
							class="btnStyle01">KOSIS 목록으로</a>
					</div>
					<p class="result">검색결과 : 5개</p>
					<ul class="xWidth radioStepOneBox">
						<li><input type="radio" name="rd_goocha" id="rd_goocha01" />
							<label for="rd_goocha01">농업, 임업 및 어업농업</label></li>
						<li><input type="radio" name="rd_goocha" id="rd_goocha02" />
							<label for="rd_goocha02">광업</label></li>
						<li><input type="radio" name="rd_goocha" id="rd_goocha03" />
							<label for="rd_goocha03">제조업</label></li>
						<li><input type="radio" name="rd_goocha" id="rd_goocha04" />
							<label for="rd_goocha04">전기, 가스, 중기 및 수도사업</label></li>
					</ul>

				</div>
			</div>
		</div>
		<!-- 행정구역 통계목록보기 End -->
		
		<div class="totalResult tr010">
			<div id="ecountry">
				<div class="stepBox">
					<ul>
						<li><input type="text" class="inp" id="ecountrySearchText"
							placeholder="통계항목 검색" title="통계항목 검색" />
							<a class="inputSearchKeyboard" onClick="javascript:openKeyboard('ecountrySearchText', 'ecountrySearchBtn');" style="position:absolute; margin-left:-30px; margin-top:4px;">
								<img class="keyimg" src="/js/plugins/keyboard/img/key_off.png" style="display:inline-block; width:25px; height:15px; vertical-align: middle;">
							</a>
							<a id="ecountrySearchBtn" onClick="javascript:$interactiveMapEcountry.ecountrySearch(0);"
							class="btn_stepSearch">검색</a></li>
						<li
							style="height: auto; text-align: right; padding-top: 2px; margin-bottom: -8px; margin-left: -10px;">
							<img src="/img/ico/kosis_gis_se_sido.png"
							style="vertical-align: middle;" alt="시도" /> : 시도 <img
							src="/img/ico/kosis_gis_se_sgg.png"
							style="vertical-align: middle;" alt="시군구" /> : 시군구 <img
							src="/img/ico/kosis_gis_se_adm.png"
							style="vertical-align: middle;" alt="읍면동" /> : 읍면동
						</li>
					</ul>
				</div>
				<!-- ecountry 리스트 -->
				<div class="stepTreeBox" id="ecountryStatsTree"></div>

				<!-- 검색 리스트 -->
				<div class="stepBox xWidth" id="ecountry_SearchBox"
					style="display: none;">
					<div style="text-align: center;">
						<a href="javascript:$interactiveMapEcountry.ecountryTreeShow();"
							class="btnStyle01">e-지방지표 목록으로</a>
					</div>
					<p class="result">검색결과 : 5개</p>
					<ul class="xWidth radioStepOneBox">
						<li><input type="radio" name="rd_goocha" id="rd_goocha01" />
							<label for="rd_goocha01">농업, 임업 및 어업농업</label></li>
						<li><input type="radio" name="rd_goocha" id="rd_goocha02" />
							<label for="rd_goocha02">광업</label></li>
						<li><input type="radio" name="rd_goocha" id="rd_goocha03" />
							<label for="rd_goocha03">제조업</label></li>
						<li><input type="radio" name="rd_goocha" id="rd_goocha04" />
							<label for="rd_goocha04">전기, 가스, 중기 및 수도사업</label></li>
					</ul>

				</div>
			</div>
		</div>

		<!-- 공공데이터 통계목록보기 Start -->
		<div class="totalResult tr06">
			<div class="stepBox">
				<p>위치중심 공공데이터 목록</p>
				<ul class="type01 publicData_stepBox" id="publicDataLeftList">
				</ul>
			</div>
		</div>
		<!-- 공공데이터 통계목록보기 End -->

		<!-- 사용자데이터업로드 Start -->
		<div class="totalResult tr07">
			<div class="stepBox">
			      <!-- mng_s 20211115 김건민 -->
				 <span class="txt myDataTxt"></span>
				 <p class="myDataList">나의 데이터에 저장된 목록</p>
				 
				<!-- <li style="font-family:'Nanum Gothic Bold';font-size:13px;position:relative;overflow:hidden;box-sizing:border-box;width:260px;height:auto;min-height:25px;padding:4px 0;color:#777; margin:0 auto 0 15px;">
						'나의 데이터'는 사용자가 보유하고 있는 txt, csv, Excel, KML 등의 포맷파일을 업로드하여 지도 위에 매핑할 수 있는 메뉴입니다. '나의 데이터'를 이용하기 위해서는 '나의 데이터' 이동을 클릭하여 회원가입 및 로그인을 하셔야합니다. 다만, 이미 로그인 하신 경우에는 '나의 데이터' 본 화면이 바로 나옵니다.</li>
				<div style="text-align: center;"> 
					<a href="/view/mypage/myData/dataList" class="btnStyle01" style="background:#0d66ac !important; border-radius:5px; color:white;">나의 데이터 이동</a>
				</div>
				<li style="font-family:'Nanum Gothic Bold';font-size:13px;position:relative;overflow:hidden;box-sizing:border-box;width:260px;height:auto;min-height:25px;padding:4px 0;color:#777; margin:0 auto 0 15px;">
						비회원에게 '나의 데이터'를 이용해 볼 수 있는 기회를 제공하기 위하여 '나의 데이터 체험하기' 메뉴를 제공하고 있습니다. 공개된 사용자 데이터 목록'을 이용하여 '나의 데이터'를 체험해 볼 수 있습니다. 단 '나의 데이터 체험가기'는 저장하기 기능이 없다는 점을 유의하여 주시기 바랍니다. 저장기능을 이용하기 위해서는 회원 가입 후 '나의 데이터'를 이용하여 주시기 바랍니다.</li>
				<div style="text-align: center;"> 
					<a id="myDataSample" onclick="javascript:window.open('/jsp/sample/dataUpload.jsp','_blank');" class="btnStyle01" style="background:#0d66ac !important; border-radius:5px; color:white;">나의 데이터 체험하기</a>
				</div> -->
				<ul id="myDataLoadList">
				</ul>
				<div id="myDataListTablePage"></div>
				<br />
				<!-- <div style="text-align: center;"> 
					<a href="/view/mypage/myData/dataList" class="btnStyle01" style="background:#0d66ac !important; border-radius:5px; color:white;">나의 데이터 이동</a>
				</div> -->
			</div>
			<!-- mng_e 20211115 김건민 -->
			<div class="stepBox">
				<p>공개된 사용자 데이터 목록</p>
				<ul id="shareDataLoadList">
				</ul>
				<div id="shareDataListTablePage"></div>
			</div>
		</div>
		<!-- 사용자데이터업로드 End -->

		

		<!-- POI 위치조회 Start -->
		<div class="totalResult tr08">
			<div class="stepBox">POI 위치조회 내용 보류</div>
		</div>
		<!-- <div class="btnBottom" >
        	<a href="javascript:$interactiveLeftMenu.ui.addSearchBtn();" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">검색조건 생성</a>
        </div>  -->
        <div class="menuAutoClose" style="bottom:10px;" id="menuAutoClose2Lev">
			<input type="radio" name="menuAutoClose_radio" id="menuAutoClose_radio" checked="checked" onclick="$interactiveLeftMenu.ui.sqlListBoxPosition2('560px');"/>
<!--            	<label for="menuAutoClose_radio" class="on">자동닫기</label> -->
		</div>
	</div>

	<div class="btnBottom" >
        	<a href="javascript:$interactiveLeftMenu.ui.addSearchBtn();" class="btnStyle02" id="buttonMakeBtn" data-subj="조건결합설정 팁" title="현재 선택된 통계항목 창에 해당하는 통계조건을 통계버튼으로 생성하여 통계값을 조회 할 수 있어요">검색조건 생성</a>
    </div>

	<div class="bottom "><a href="javascript:void(0) " class="stepClose 3depth_close">닫기</a></div>
</div>


<!-- 3Depth start -->
<!-- 해당분류 세부업종 선택하기 start -->
<div class="quickBox step03" id="companyClassListDiv"
	style="background: #fff; z-index: 17;">
	<div class="subj" style="height: 34px;">
		<span>산업분류목록 선택하기</span> 
<!-- 		<a href="javascript:void(0)" class="stepClose" onclick="$interactiveLeftMenu.ui.sqlListBoxPosition2('560px');">닫기</a> -->
	</div>
	<div class="scrollBox">
		<div class="stepBox">
			<ul>
				<li><input type="text" class="inp" id="companySearchText"
					placeholder="통계항목 검색" title="통계항목 검색" /> 
					<a class="inputSearchKeyboard" onClick="javascript:openKeyboard('companySearchText', 'companySearchBtn');" style="position:absolute; margin-left:-30px; margin-top:4px;">
						<img class="keyimg" src="/js/plugins/keyboard/img/key_off.png" style="display:inline-block; width:25px; height:15px; vertical-align: middle;">
					</a>
					<a id="companySearchBtn" onClick="javascript:$interactiveLeftMenu.ui.companySearch(0);"
					class="btn_stepSearch">검색</a></li>
			</ul>
		</div>
		<!-- 산업분류 리스트 -->
		<div class="stepTreeBox" id="company_TreeBox"></div>

		<!-- 산업분류 검색 리스트 -->
		<div class="stepBox xWidth" id="company_SearchBox"
			style="display: none;">
			<p class="result">
				검색결과 : <span id="companySearchCount"></span>개
			</p>
			<ul class="xWidth radioStepOneBox2" id="companySearchDataList">
			</ul>
			<div id="companyTablePage"></div>
			<br />
			<div style="text-align: center;">
				<a href="javascript:$interactiveLeftMenu.ui.companyTreeShow();"
					class="btnStyle01">산업분류 목록으로</a>
			</div>
		</div>
	</div>
 	<div class="btnBottom" style="background: rgb(255, 255, 255);height: 100px;"> 
		<a href="javascript:$interactiveLeftMenu.ui.addSearchBtn();" 
 			class="btnStyle02">산업조건 버튼생성</a> 
	</div> 
<!-- 	<div class="bottom "><a href="javascript:void(0) " class="stepClose 3depth_close">닫기</a></div> -->
	<div class="menuAutoClose" style="bottom: 10px;">
		<input type="radio" name="menuAutoClose_radio"
			id="menuAutoClose_radio2" checked="checked"
			onclick="$interactiveLeftMenu.ui.sqlListBoxPosition2('840px');" /> 
<!-- 			<label for="menuAutoClose_radio2" class="on">자동닫기</label> -->
	</div>
</div>
<!-- 해당분류 세부업종 선택하기 end -->

<!-- 3Depth start -->
<!-- KOSIS 세부항목 선택하기 start -->
<div class="quickBox step03" id="kosisDetailDiv" style="left: -360px; ">
	<div class="subj" style="height: 34px;">
		<span>KOSIS(지역통계) 세부항목 선택하기</span>
		<!-- 			<a href="javascript:void(0)" class="stepClose" onclick="$interactiveLeftMenu.ui.sqlListBoxPosition2('560px');">닫기</a> -->
	</div>
	<div class="scrollBox" style="">
		<div class="stepBox" style="width: 280px;">
			<div id="kosisTitle"></div>
			<div id="kosisOrigin" style="margin-top: 15px;"></div>
		</div>
		<div class="cm01" style="width: 280px;">
			<!-- 2016.09.05 9월 서비스 -->
			<div id="kosisDataFieldTable" class="stepBox"></div>
		</div>
	</div>
	<div class="btnBottom" style="">
		<a href="javascript:interactiveMapKosis.setKosisParams();"
			class="btnStyle02">검색조건 버튼생성</a>
	</div>
	<div class="menuAutoClose" style="bottom: 10px;" id="menuAutoClose4Lev">
		<input type="radio" name="menuAutoClose_radio"
			id="menuAutoClose_radio3" checked="checked"
			onclick="$interactiveLeftMenu.ui.sqlListBoxPosition2('840px');" /> <label
			for="menuAutoClose_radio3" class="on">자동닫기</label>
	</div>
</div>

<div class="quickBox step03" id="ecountryDetailDiv" style="left: -360px; ">
	<div class="subj" style="height: 34px;">
		<span>e-지방지표 세부항목 선택하기</span>
		<!-- 			<a href="javascript:void(0)" class="stepClose" onclick="$interactiveLeftMenu.ui.sqlListBoxPosition2('560px');">닫기</a> -->
	</div>
	<div class="scrollBox" style="">
		<div class="stepBox" style="width: 280px;">
			<div style="padding-left:10px;width:95%">
				<div id="ecountryTitle" class="ecountryTitle"></div>
				<div style="display:inline;width:5%;">
					<a href="javascript:void(0)" id="expInfo" style="margin-left:5px;position:absolute;cursor: pointer; background:#f5f5f5;" class="ar" data-subj="주석" title="">
						<img src="/img/ico/ico_i.gif" alt="물음표">
					</a>
				</div>
			</div>
			<div style="padding-left:10px;">
				<div id="ecountryTitle2" class="ecountryTitle" style="display:none;">
				</div>
			</div>
			<div id="ecountryOrigin" style="margin-top: 15px;"></div>
		</div>
		<div class="cm01" style="width: 280px;">
			<!-- 2016.09.05 9월 서비스 -->
			<div id="ecountryDataFieldTable" class="stepBox"></div>
		</div>
	</div>
	<div class="btnBottom" style="">
		<a href="javascript:$interactiveMapEcountry.setEcountryParams();"
			class="btnStyle02">검색조건 버튼생성</a>
	</div>
	
	<!-- mng_s 20210330 이진호 -->
	<!-- e지방지표 세부항목 선택(leftMenu) 에서 자동닫기 버튼 안보이게 수정 / 필요시 주석해제-->
	<!-- <div class="menuAutoClose" style="bottom: 10px;" id="menuAutoClose4Lev"> -->
		<!-- <input type="radio" name="menuAutoClose_radio" -->
			<!-- id="menuAutoClose_radio3" checked="checked" -->
			<!-- onclick="$interactiveLeftMenu.ui.sqlListBoxPosition2('840px');" /> <label -->
			<!-- for="menuAutoClose_radio3" class="on">자동닫기</label> -->
	<!-- </div> -->
	<!-- mng_e 20210330 이진호 -->
	
</div>
<!-- 해당분류 세부업종 선택하기 end -->
<!-- 대화형 통계지지도 그리드(격자)도움말 팝업  시작 --> 
<div class="layer_pop10" id="gredLeftHelpPopup" style="display:none;padding: 16px; z-index:999; position: absolute; top: 52px;right: 561px;width: 552px;height: 671px;background: #fff;border: 2px solid #3b80ef;box-shadow: 6px 1px 6px 1px rgb(200 200 200 / 70%);">
	<a href="javascript:void(0);" class="close_helpBtn" style="position: absolute;top: 11px;right: 9px;">
		<img src="/images/catchmentArea/close_ico02.png">
	</a>
		<p class='subC' style="font-weight: bold; color: #666;">‘그리드(격자)보기’ 기능에서 제공하는 값들은 영역에 속하는 기초자료를 기반으로 각각 비밀보호<br>기법을 적용하였으며, 다음과 같이 이해하시기 바랍니다.</p>
		<br>
		<p class='subH' style="font-weight: bold;padding-left: 7px; color: #666;">- 인구/가구/주택</p>
		  	<p class='subC' style="font-weight: bold;color:#666">인구주택총조사(등록센서스) 자료를 기반으로 생성하며, 특정값(B)을 5로 적용하여 기초자료의 1~4를 0 또는 5로 치환</p>
		
		<table class='subT' style="border-collapse: collapse;border-top: 3px solid #168;border-bottom: 3px solid #168;margin-top: 8px;">
			<thead>
      			<tr>
        			<th style="color: #168;background: #f0f6f9;text-align: center;font-weight: bold;padding: 2px;border: 1px solid #ddd;">그리드(격자) 기능에서 제공하는 값</th><th style="color: #168;background: #f0f6f9;text-align: center;font-weight: bold;padding: 2px;border: 1px solid #ddd;">실제 값</th>
      			</tr>
    			</thead>
    			<tbody>
    				<tr>
        				<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">0</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">0, 1, 2, 3, 4 중 하나</td>
      				</tr>
      				<tr>
        				<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">5</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">1, 2, 3, 4, 5 중 하나</td>
      				</tr>
      				<tr>
					<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">6 이상의 값 M</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">M-2 ~ M+2 중 하나 (일부 자료 M-7 ~ M+7)*</td>
      				</tr>
      				<tr>
        				<td colspan='2' style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">(예) 인구/가구/주택 격자 값 200(M)은 실제 값 198~202 중 하나임</td>
      				</tr>
    			</tbody>
		</table>
		<br>
		<p class='subH' style="font-weight: bold;padding-left: 7px; color: #666;">- 사업체/종사자</p>
		  	<p class='subC' style="font-weight: bold;color:#666">전국사업체조사(또는 경제총조사) 자료를 기반으로 생성하며, 특정값(B)을 3으로 적용하여 기초자료의 1~2를 0 또는 3으로 치환</p>
		
		<table class='subT' style="border-collapse: collapse;border-top: 3px solid #168;border-bottom: 3px solid #168;margin-top: 8px;">
			<thead>
      			<tr>
        			<th style="color: #168;background: #f0f6f9;text-align: center;font-weight: bold;padding: 2px;border: 1px solid #ddd;">그리드(격자) 기능에서 제공하는 값</th><th style="color: #168;background: #f0f6f9;text-align: center;font-weight: bold;padding: 2px;border: 1px solid #ddd;">실제 값</th>
      			</tr>
    			</thead>
    			<tbody>
    				<tr>
        				<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">0</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">0, 1, 2 중 하나</td>
      				</tr>
      				<tr>
        				<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">3</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">1, 2, 3 중 하나</td>
      				</tr>
      				<tr>
					<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">4 이상의 값 N</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">N-1, N, N+1 중 하나 (일부 자료 N-4 ~ N+4)*</td>
      				</tr>
      				<tr>
        				<td colspan='2' style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">(예) 사업체/종사자 격자 값 200(N)은 실제 값 199~201 중 하나임</td>
      				</tr>
    			</tbody>
		</table>
		<br>
		<p class='subH' style="font-weight: bold;padding-left: 7px; color: #666;">- 농림어업</p>
		  	<p class='subC' style="font-weight: bold;color:#666">농림어업총조사 자료를 기반으로 생성하며, 특정값(B)을 5로 적용하여 기초자료의 1~4를 0 또는 5로 치환</p>
		
		<table class='subT' style="border-collapse: collapse;border-top: 3px solid #168;border-bottom: 3px solid #168;margin-top: 8px;">
			<thead>
      			<tr>
        			<th style="color: #168;background: #f0f6f9;text-align: center;font-weight: bold;padding: 2px;border: 1px solid #ddd;">그리드(격자) 기능에서 제공하는 값</th><th style="color: #168;background: #f0f6f9;text-align: center;font-weight: bold;padding: 2px;border: 1px solid #ddd;">실제 값</th>
      			</tr>
    			</thead>
    			<tbody>
    				<tr>
        				<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">0</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">0, 1, 2, 3, 4 중 하나</td>
      				</tr>
      				<tr>
        				<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">5</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">1, 2, 3, 4, 5 중 하나</td>
      				</tr>
      				<tr>
					<td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">6 이상의 값 M</td><td style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">M-2 ~ M+2 중 하나 (일부 자료 M-7 ~ M+7)*</td>
      				</tr>
      				<tr>
        				<td colspan='2' style="text-align: center;padding: 2px;border: 1px solid #ddd;font-weight: bold;color:#666">(예) 농업/임업/어업 격자 값 200(M)은 실제 값 198~202 중 하나임</td>
      				</tr>
    			</tbody>
		</table>
	<p class='subC' style="padding-left: 2px;font-weight: bold;color: #666;">* 해당 값을 통하여 작은 단위의 통계정보를 파악할 수 있다고 판단하여 자료처리 과정을 추가한 경우이며, 참값과 차이가 생길 수 있으나, 이는 정보보호를 위하여 필수적으로 필요한 과정입니다.</p>
</div>
<!-- 대화형 통계지지도 그리드(격자)도움말 팝업  끝 -->


