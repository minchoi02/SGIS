<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 데이터보드 > 대졸자 첫 일자리 통계
* File Name		: viewJobs > vjFirstCollegeGraduateJobStat.jsp
* Comment		: 
* History		: 2018-10-15	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjFirstCollegeGraduateJobStat.js"></script>

<style>

	#vjFCGJS {
		width: 100%;
		height: 100%;
	}
	
	#vjFCGJS .popBox {/* 팝업용도가 아닌 데이터보드에 끼워넣기하는 경우 처리될 사항 - 테두리제거, 사이즈 Full */
   	    left: 0px;
	    top: 0px;
	    margin-left: 0px;
	    width: 100%;
	    height: 100%;
	    border: 0;
    }
    #vjFCGJS .cont-box {
    	height: calc(100% - 15px); /* 15px: 타이틀 상단 여백 */
    }
	
 	#vjFCGJS article h3 {
 		border-bottom: 1px solid #213967;
 		margin-bottom: 10px;
 	}
}
</style>

<div class="workRoad" id="vjFCGJS">
	<div class="popBox">
		<div class="cont-box wrmScrollable">
	 		<article>
	 			<h3 id="vjTitle"></h3>			
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">대졸자 첫 일자리 사업체 규모</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart01"></div>
				</div>
				
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">전공계열별 첫 일자리 진출분야(산업)</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart02"></div>
				</div>				
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">전공계열별 사업체 규모</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart03"></div>
				</div>
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">첫 일자리 월평균 소득</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart04"></div>
				</div>
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">첫 일자리 적응의 어려운 점</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart05"></div>
				</div>
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">대학 재학시 배웠으면 업무에 도움이 되었을 능력</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart06"></div>
				</div>
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">첫 일자리 만족도</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart07"></div>
				</div>
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">첫 일자리 유지 여부별 첫 일자리 적응의 어려운 점</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart08"></div>
				</div>
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">성별 및 학교유형별 첫 일자리 그만둔 이유</a>
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart09"></div>
				</div>	
				<div class="view-tab">
					<a href="javascript:void(0)" class="on">전공계열별 첫 일자리 그만둔 이유</a>				
				</div>
				<div class="job-offer-graph">
					<div class="charts" id="vjFCGJSChart10"></div>
				</div>
			</article>
		</div>
	</div>
</div>