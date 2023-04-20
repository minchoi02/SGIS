<%
/**************************************************************************************************************************
* Program Name	: 일자리 맵 서비스 > 일자리 보기 > 데이터보드 > 직업훈련 보기
* File Name		: viewJobs > vjJobTrainingInfo.jsp
* Comment		: 
* History		: 2018-10-18	ywKim	신규
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjJobTrainingInfo.js"></script>

<style>

	#vjJobTrainingInfo {
		width: 100%;
		height: 100%;
	}

	#vjJobTrainingInfo .popBox {/* 팝업용도가 아닌 데이터보드에 끼워넣기하는 경우 처리될 사항 - 테두리제거, 사이즈 Full */
   	    left: 0px;
	    top: 0px;
	    margin-left: 0px;
	    width: 100%;
	    height: 100%;
	    border: 0;
    }

 	/* 타이틀 */
	#vjJobTrainingInfo .vjTitle {
	    display: table;
	    table-layout: fixed;
	    border-collapse: collapse;
	    width: 100%;
	}
	#vjJobTrainingInfo .vjTitle a {
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

	/* 컨텐츠 */
    #vjJobTrainingInfo .cont-box {
    	height: calc(100% - 66px); /* 15px: 타이틀 상단 여백 */
    }
    
    #vjJobTrainingInfo article { height: 100%; }
    
    /* 지역선택 박스 */
    #vjJobTrainingInfo article > div:nth-of-type(1) {
    	margin-bottom: 15px;
    }
    /* 라벨 - 훈련지역 선택 */
    #vjJobTrainingInfo .vjSelectLabel {
    	padding-left: 5px;
	    font-family: 'Nanum Gothic Bold';
	    font-size: 13px;
	}
	
	/* 훈련지역 선택 영역 */
	#vjJobTrainingInfo .select-area {
		text-align: left;
		padding: 5px; 
	}	
	
	/* 훈련지역 선택 박스 */
	#vjJobTrainingInfo span.select-wrap:nth-of-type(1) { width: 30%; }
	#vjJobTrainingInfo span.select-wrap:nth-of-type(2) { width: 40%; }
	
	/* 훈련과정 목록 박스 */
	#vjJobTrainingInfo .jab-data-table { 
		height: calc(100% - 169px);
		border-bottom: 1px solid #e0e0e0;
		padding-bottom: 0;
	}
	#vjJobTrainingInfo .jab-data-table table .subject { width : 435px; }
	#vjJobTrainingInfo .jab-data-table table td { border-left: 0; }
	
}
</style>

<div class="workRoad" id="vjJobTrainingInfo">
	<div class="popBox">
		<div class="vjTitle">
			<a href="javascript:void(0)" style="outline: none; opacity: 1;">직업훈련(핵심직무 기반) 보기</a>
		</div>

		<div class="cont-box">
	 		<article>
	 			<h3 id="vjAbout">(핵심직무)건설 관련 직업훈련 과정</h3>
				<div class="cont-info">					
					<span class="vjSelectLabel">훈련지역 선택</span>
					<div class="select-area">
						<span class="select-wrap">
							<select id="vjSidoSelect">
								<option>서울특별시</option>
							</select>
						</span>
						<span class="select-wrap">
							<select id="vjSggSelect">
								<option>전체</option>
							</select>
						</span>
						<a href="javascript:void(0)" class="default-color" id="vjSearch">
							<span>검색</span>
						</a>
					</div>
				</div>
				
				<h3 id="vjListTitle">선택된 지역의 (핵심직무)건설 관련 직업훈련 과정 목록</h3>
				<div class="jab-data-table wrmScrollable">
				<!-- <div class="jab-data-table wrmScrollable" style="height: calc(100% - 169px)"> -->
					<table border="1" summary="채용정보 목록">
						<colgroup>
							<col class="subject">
							<col class="statis-view">
						</colgroup>
						<tbody id="vjRows">
						</tbody>
					</table>
				</div>
				
				<div class="paging pagenation" style="width: calc(100% - 10px); padding: 5px 5px 5px 5px; height: 30px">
					<jsp:include page="/view/workRoad/workRoadPaging"></jsp:include>
				</div>				
			</article>
		</div>
	</div>
</div>