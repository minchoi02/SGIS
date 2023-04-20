
<%
	/**************************************************************************************************************************
	    * Program Name  : main 화면  
	    * File Name     : mainHome.jsp
	    * Comment       : 
	    * History       : 네이버시스템 최재영 2018-06-29
	    *
	    **************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.List"%>
<%@ page import="org.json.JSONObject"%>
<%@ page import="org.json.JSONArray"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page trimDirectiveWhitespaces="true" %>    
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>SGISwork</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/main/main.css" />
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/mainHome.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
	
	<!-- mng_s 2019. 06. 03 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				$log.srvLogWrite("Z0", "02", "01", "00", "", "");
		});
	</script>
	<!-- mng_e 2019. 06. 03 j.h.Seok -->
</head>
<body>
<div class="wrap">
<jsp:include page="/view/common/includeHeader"></jsp:include>

		<div class="dashbordWrap">
			<div class="dashbordTile">
				<h1>사용 이력 대시보드</h1>
				<!-- <button id="dashButton"></button> -->
				<div class="dashbordSet">
					<h1>사용 이력 대시보드 설정</h1>
					<ul>
						<li style="margin-bottom: 15px;font-size: 12px;color: #d93333;">
						* 최대 5개 항목까지 선택 가능합니다.			
						</li>
						<li>
							<input name="set" id="checkbox01" type="checkbox">
							<label for="checkbox01">원본 데이터</label>
						</li>
						<li>
							<input name="set" id="checkbox02" type="checkbox">
							<label for="checkbox02">즐겨찾기 데이터</label>
						</li>
						<li>
							<input name="set" id="checkbox03" type="checkbox">
							<label for="checkbox03">위치 데이터</label>
						</li>
<!-- 						<li>
							<input name="set" id="checkbox04" type="checkbox">
							<label for="checkbox04">사용 공간/저장 공간</label>
						</li> -->
						<li>
							<input name="set" id="checkbox05" type="checkbox">
							<label for="checkbox05">분석 데이터</label>
						</li>
						<li>
							<input name="set" id="checkbox06" type="checkbox">
							<label for="checkbox06">공유 데이터</label>
						</li>
							
					</ul>
					<div class ="dash" style="border-top: 1px solid #e5e5e5;">
						<button id="dashSaveBtn">저장</button>
					</div>
				</div>
			</div>				
		</div>
		
		<div class="dashbordArea">
			<div class="dashbord" id= "dashBoard">
				<div class="dashbordBox" id = "dashBox_1" style="cursor:pointer">
					<h1>원본 데이터</h1>
					<div class="boxInfo green" id = "dataCnt">
						08
						<span>건</span>
					</div>
				</div>
				<div class="dashbordBox" id = "dashBox_2" style="cursor:pointer">
					<h1>위치 데이터</h1>
					<div class="boxInfo sky " id = "lcDataCnt">
						08
						<span>건</span>
					</div>
				</div>
				<div class="dashbordBox" id = "dashBox_3" style="cursor:pointer">
					<h1>분석 데이터</h1>
					<div class="boxInfo yellow " id = "analysisDataCnt">
						08
						<span>건</span>
					</div>
				</div>
				<div class="dashbordBox" id = "dashBox_4" style="cursor:pointer">
					<h1>공유 데이터</h1>
					<div class="boxInfo pink " id = "shareDataCnt">
						08
						<span>건</span>
					</div>
				</div>
				<div class="dashbordBox" id = "dashBox_5" style="cursor:pointer">
					<h1>즐겨찾기 데이터</h1>
					<div class="boxInfo blue " id = "favCnt">
						08
						<span>건</span>
					</div>
				</div>
				<!-- 
				<div class="dashbordBox" id = "dashBox_6" style="cursor:pointer">
					<h1>사용 공간 / 저장 공간</h1>
					<div class="boxInfo red " id = "saveSpacial">
						08<span>MB /</span>50<span>GB</span>
					</div>
				</div>
				 -->
			</div>
		</div><!-- dashbordArea end-->
		<div class="contentWrap">
			<div class="content">
				<div class="box01" >
					<div class="contentBox sky">
						<h1>데이터 준비 및 선택</h1>
						<img src="${pageContext.request.contextPath}/img/main/cont01.png" alt=""/>
						<p>
							<span>텍스트, 엑셀 </span>등의 데이터를 <br/>
							업로드 하여 위치정보데이터로 <br/>
							만들수 있습니다.
						</p>
					</div>
					<div class="contentBox_over sky">						
						<h1>데이터 준비 및 선택</h1>
						<ul>
							<li><a href="${pageContext.request.contextPath}/view/myData/myDataCreate">데이터 생성하기</a></li>
							<li><a href="${pageContext.request.contextPath}/view/myData/myDataManagement">데이터 관리하기</a></li>
						</ul>
					</div>
				</div>
				<div class="box02">
					<div class="contentBox yellow"> 
						<h1>분석 방법 선택</h1>
						<img src="${pageContext.request.contextPath}/img/main/cont02.png" alt=""/>
						<p>
							데이터의 위치정보를 기반으로 한 <br/>
							분석을 통해 <span>숨겨진 패턴과 경향</span>을 <br/>
							이해 할 수 있습니다.
						</p>
					</div>
					<div class="contentBox_over yellow">
						<h1>분석 방법 선택</h1>
						<ul>
							<li><a href="${pageContext.request.contextPath}/view/analysis/analysisMain?type=basic">기초 분석</a></li>
							<li><a href="${pageContext.request.contextPath}/view/analysis/analysisMain?type=expert">응용 분석</a></li>
							<li><a href="${pageContext.request.contextPath}/view/analysis/analysisGuide">활용 사례</a></li>
						</ul>
					</div>
				</div>
				<div class="box03">
					<div class="contentBox green">
						<h1>보고 활용하기</h1>
						<img src="${pageContext.request.contextPath}/img/main/cont03.png" alt=""/>
						<p>
							기존 경험에 의존한 의사결정에서 <br/>
							벗어나 <span>데이터 기반의 의사결정</span>을 <br/>
							수행할 수 있습니다. 
						</p>
					</div>
					<div class="contentBox_over green">						
						<h1>보고 활용하기</h1>
						<ul>
							<li><a href="${pageContext.request.contextPath}/view/use/guideMain/guide">서비스 활용 가이드</a></li>
							<li><a href="${pageContext.request.contextPath}/view/shareBoard/shareBoardMain">공유 게시판</a></li>
						</ul>						
					</div>
				</div>
			</div>
		</div><!-- contentWrap end-->
		<div class="noticeWrap">
			<div class="notice" id ="ntc-list"> <!-- 공지사항 -->
			</div>
			<div class="notice" id ="faq-list"> <!-- faq -->
			</div>
		</div>
		<div class="noticeWrap">
			<div class="notice" id ="qna-list"> <!-- qna -->
			</div>
			<div class="notice" id ="my-list"> <!-- 나의 데이터 -->
			</div>
		</div><!-- noticeWrap end-->
		
		<!-- footer -->
		<jsp:include page="/view/common/includeFooter"></jsp:include>

</div>

</body>
</HTML>


