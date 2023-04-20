<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 데이터보드 > 직업전망 보기
* File Name		: viewJobs > vjJobProspectingInfo.jsp
* Comment		: 
* History		: 2018-10-17	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- <script type='text/javascript' src='http://www.open.go.kr/openapi/AjaxScript.api'></script> -->
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjJobProspectingInfo.js"></script>

<style>

	#vjJobProspectingInfo {
		width: 100%;
		height: 100%;
	}
	
	#vjJobProspectingInfo .popBox {/* 팝업용도가 아닌 데이터보드에 끼워넣기하는 경우 처리될 사항 - 테두리제거, 사이즈 Full */
   	    left: 0px;
	    top: 0px;
	    margin-left: 0px;
	    width: 100%;
	    height: 100%;
	    border: 0;
    }
    
 	/* 타이틀 */
	#vjJobProspectingInfo .vjTitle {
	    display: table;
	    table-layout: fixed;
	    border-collapse: collapse;
	    width: 100%;
	}
	#vjJobProspectingInfo .vjTitle a {
	    letter-spacing: -1px;
	    font-size: 14px;
	    /* border-top: 1px solid #6a707c; */
	    display: table-cell;
	    vertical-align: middle;
	    text-align: center;
	    height: 35px;
	    background: #6a707c;
	    color: #fff;
	}
	
	/* 설명 */
    #vjJobProspectingInfo .citation {
	    position: absolute;
	    top: 0px;
	    right: 7px;
    }
    
    /* 컨텐츠 */    
    #vjJobProspectingInfo .cont-box {
    	height: calc(100% - 66px); /* 15px: 타이틀 상단 여백 */
    }
    #vjJobProspectingInfo article {
    	padding-right: 0;
    	width: calc(100% - 23px);/* 15px: 좌측 여백    8: scrollBar Width*/
    	height: 100%;
    }
    /* 직업목록 스크롤 영역 */
    #vjJobProspectingInfo article > div:nth-of-type(1) {
    	width: 100%;
    	height: 300px;/*calc(45% - 16px);*/ /* 16px: 직업목록 타이틀 높이 */
    	margin-bottom: 15px;
    }
/*  	#vjFCGJS article h3 {
 		border-bottom: 1px solid #213967;
 		margin-bottom: 10px;
 	}
 */	
 	#vjJobProspectingInfo #vjDataList{
 		width: 100%;
 	}
 	#vjJobProspectingInfo #vjDataList li{
 		float: left;
 		width: 50%;
 	}
 
 	/* 요약 - 탭 */   
    #vjJobProspectingInfo .pcTabs {
    	margin-top: 0;
    	padding-left: 0;
    	/* with: calc(100% - 15px); */
    }    
    #vjJobProspectingInfo .pcTabs li{
    	width: 25%;
    }
    #vjJobProspectingInfo .pcTabs li a.on {
	    background: #22b599;
	    color: #fff;
	}
	
	/* 요약 - 내용 */
	#vjJobProspectingInfo #vjSummaryContent > div {
		display: none;
		padding: 5px;
	}
	#vjJobProspectingInfo #vjSummaryContent h4 {
	    font-family: 'Nanum Gothic Bold';
	    font-size: 14px;
	    position: relative;
	    padding: 0 0 8px 15px;
	    color: #666;
	}
	#vjJobProspectingInfo #vjSummaryContent h4:before {
	    position: absolute;
	    top: 4px;
	    left: 2px;
	    display: block;
	    box-sizing: border-box;
	    width: 8px;
	    height: 8px;
	    content: '';
	    /* border: 3px solid #3985d0; */
	    border-radius: 50%;
	    background: #39d0b5;
	}
}
</style>

<div class="workRoad" id="vjJobProspectingInfo">
	<div class="popBox">
		<div class="vjTitle">
			<a href="javascript:void(0)" style="outline: none; opacity: 1;">직업전망 보기</a>
		</div>
	
		<div class="cont-box wrmScrollable">
			<div class="citation">
				<span>[ 관심 직업을 선택하시면, 직업전망을 확인할 수 있습니다. ]</span>
			</div>			
	 		<article>
	 			<h3 id="vjAbout"></h3>
				<div class="cont-info wrmScrollable">
					<ul class="multiCheckBox" id="vjDataList">
					</ul>
				</div>
				<h3 id="vjSummaryTitle">&nbsp;</h3>
				<div id="vjSummaryTab">
					<ul class="pcTabs">
						<li><a class="on">하는 일/근무환경</a></li>
						<li><a>교육훈련/자격/적성 및 흥미</a></li>
						<li><a>종사현황</a></li>
						<li><a>직업전망/관련정보처</a></li>
					</ul>
				</div>
				<div class="cont-info" id="vjSummaryContent">
					<div> </div>
					<div> </div>
					<div> </div>
					<div> </div>
				</div>
			</article>
		</div>
	</div>
</div>