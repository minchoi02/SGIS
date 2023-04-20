
<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 구인정보목록 	
* File Name		: viewJobs > vjJobInfoList.jsp
* Comment		: 
* History		:
*	2018-09-11	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjJobInfoList.js"></script>

<!-- <div class="wrmDraggable" id="vjJobInfoList">
	<a href="javascript:void(0)" class="sideQuick sq03 xw" id="vjToggle">
		<span>선택항목</span>
	</a>
 -->
<div class="popBox job-data-popup wrmDraggable" id="vjJobInfoList">
	<!-- 2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. START -->
	<a alt="전체로 돌아가기" href="javascript:void(0)" class="sideQuick sq03 xw" id="vjBack" style="display:none; top: 0px; left: 0px; height: 39px; width: 39px; font-size: 20px; font-weight: 900; line-height: 39px;">
		&lt;
	</a>
	<!-- 2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. END -->
	<a href="javascript:void(0)" class="sideQuick sq03 xw" id="vjToggle">
		<span>선택항목</span>
	</a>
	<!-- 2019-06-13 [김남민] 일자리 보기 > 검색 버튼 추가. START -->
	<a alt="상세검색" href="javascript:void(0)" class="sideQuick sq03 xw" id="vjSearch" style="top: 0px; left: 162px; height: 24px; width: 85px; background-image: url(/images/workRoad/icon_search.png); background-position: 61px center; background-repeat: no-repeat; background-size: 20px; font-size: 13px; line-height: 24px; margin-top: 9px; text-align: left; background-color: cadetblue;">
		&nbsp;&nbsp;상세검색
	</a>
	<a alt="상세검색" href="javascript:void(0)" class="sideQuick sq03 xw" id="vjSearch2" style="display:none; top: 0px; left: 162px; height: 39px; width: 39px; background-image: url(/images/workRoad/icon_search.png); background-position: center; background-repeat: no-repeat; background-size: 29px; font-size: 20px; font-weight: 900; line-height: 39px;">
		
	</a>
	<!-- 2019-06-13 [김남민] 일자리 보기 > 검색 버튼 추가. END -->
	<div class="topbar wrmHeader">
		<!-- 2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. START -->
		<span class="sub" id="vjLifeEnvInfo" title="시군구 별로 생활환경정보를 지표화하여 균등하게 3등분 후 높음/보통/낮음 등의 상/중/하 정도로 표기됩니다.
※ 지표에 대한 자세한 정보는 ‘살고싶은 우리동네’ 서비스에서 확인 가능합니다." style="display:none;">생활환경 종합</span>
		<!-- 2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. END -->
		<div class="select-right">
			<span>보기 선택</span>
			<span class="select-wrap">
				<select id="vjViewType">
					<option value="REG_DT_DESC">최근 등록순</option>
					<option value="CLOS_DT">마감일 오름순</option>
					<option value="CLOS_DT_DESC">마감일 내림순</option>
				</select>
			</span>
		</div>
		<a href="javascript:void(0)" data-active="false">닫기</a>
	</div>
	<div class="wrm-scroll-box wrmScrollable" style="width:100%;height: 100%;">
		<div class="cont-box">
			<article>
				<div class="citation">
					<!-- 2020.05.13[주형식] 오늘의 일자리 현황 사람인 정보 추가 START -->	
					<!-- <span>[ 내용 클릭 시, 워크넷 및 인크루트로 이동합니다. ]</span>  -->
					<span>[ 내용 클릭 시, 구인공고가 등록된 취업포털 사이트(워크넷, 인크루트, 사람인)로 이동합니다. ]</span>	<!-- 2020.07.23[한광희] 일자리보기 메뉴 문구 수정 -->
					<!-- 2020.05.13[주형식] 오늘의 일자리 현황 사람인 정보 추가 END -->
					<span id="vjDataCount">건</span>
				</div>
				<div class="jab-data-table" id="vjTableHeader">
					<table border="1" summary="채용정보 목록">
						<colgroup>
							<col class="tit">
							<col class="subject">
							<col class="work">
							<col class="dday">
							<col class="statis-view">
						</colgroup>
						<thead>
							<tr>
								<th scope="col" class="firsts">
									<!-- <div class="check-list ">
										<input type="checkbox" value="" class="chk_all">
										<label for="" class=""></label>
									</div> -->
									회사명
								</th>
								<th scope="col">모집내용
								</th>
								<th scope="col">근무조건</th>
								<th scope="col">등록일/마감일</th>
								<th scope="col"></th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="jab-data-table wrmScrollable" id="vjRows">
					<table border="1" summary="채용정보 목록">
						<colgroup>
							<col class="tit">
							<col class="subject">
							<col class="work">
							<col class="dday">
							<col class="statis-view">
						</colgroup>
						<tbody>
						</tbody>
					</table>
				</div>
			</article>
		</div>
		<div class="paging pagenation" style="width: calc(100% - 10px); padding: 5px 5px 5px 5px; height: 30px">
			<jsp:include page="/view/workRoad/workRoadPaging"></jsp:include>
		</div>
	</div>
</div>
