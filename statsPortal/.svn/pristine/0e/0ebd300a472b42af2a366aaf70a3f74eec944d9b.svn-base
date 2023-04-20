<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko"> 
<head>
<meta charset="utf-8" />  
<meta name="format-detection" content="telephone=no" /> 
<title>SGIS 통계지리정보서비스</title>         
<link rel="stylesheet" href="/edu/include/css/common.css" type="text/css" /> 
<script type="text/javascript" src="/edu/include/js/ui.js"></script>    
<script type="text/javascript" src="/edu/include/js/common.js"></script>  
<!-----------------------------------------------------------------------------------------------------2019년반영 시작-->
<%
	String index = request.getParameter("index");
%>
<script>
	$(document).ready(function(){
		//19년수정 시작
		var firstIndex = Number($(".view_box").attr("class").split(" ")[1].split("_")[1]);
		var lastIndex;
		$(".view_box").each(function(){
			lastIndex = Number($(this).attr("class").split(" ")[1].split("_")[1]);
		});	
		//19년수정 끝
		
		$("#prev_btn").on("click",function(){
			$(".view_box").each(function(){
				if($(this).css("display")!="none"){
					var prevClassIndex = Number($(this).attr("class").split(" ")[1].split("_")[1])-1;
					if(prevClassIndex == 0){
						//19년수정 시작
						prevClassIndex = lastIndex;
						$(".view_box").hide();
						$(".box_"+prevClassIndex).show();
						//19년수정 끝
					}
					else{
						$(".view_box").hide();
						$(".box_"+prevClassIndex).show();
					}
					return false;
				}
			});
		});
		$("#next_btn").on("click",function(){
			$(".view_box").each(function(){
				if($(this).css("display")!="none"){
					var nextClassIndex = Number($(this).attr("class").split(" ")[1].split("_")[1])+1;
					if(nextClassIndex == 4){
						//19년수정 시작
						nextClassIndex = firstIndex;
						$(".view_box").hide();
						$(".box_"+nextClassIndex).show();
						//19년 수정 끝
					}
					else{
						$(".view_box").hide();
						$(".box_"+nextClassIndex).show();
					}
					return false;
				}
			});
		});
	});
</script>
</head>  
<body>      
<img src="/edu/include/img/etc/eduicon01.png" id="prev_btn" alt="prev" style="position: absolute;left: 30px;z-index: 9999;top: 559px;"/>
<img src="/edu/include/img/etc/eduicon02.png" id="next_btn" alt="next" style="position: absolute;right:30px;z-index: 9999;top: 559px;"/>
<!-----------------------------------------------------------------------------------------------------2019년반영 끝-->
<script type="text/javascript" src="/edu/include/js/header/header.js"></script>

<div class="container sub01">
<!-----------------------------------------------------------------------------------------------------2019년반영 시작--> 
	<!-- <ul id="nav">
		<li><a href="#header" class="on">SGIS에듀가 알려주는 사회변화</a></li>
	    <li><a href="#sbox02"></a></li>
	    <li><a href="#sbox03"></a></li> 
		<li><a href="#sbox04"></a></li>
	</ul> -->
<!-----------------------------------------------------------------------------------------------------2019년반영 끝-->	
	<ul id="btnTop">
		<li><a href="#header" class="btnTop"><img src="/edu/include/img/etc/etc_top.png" alt="Link" /></a></li>
	</ul>

	<div id="sbox01" class="mboxArea sbox01 subtop01" style="display: none;"><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--링크-->
		<div class="saListBox">
			<a href="/edu/jsp/sub11.jsp" class="maList11">지도란?</a>
			<a href="/edu/jsp/sub01.jsp" class="maList01">저출산 과 고령화문제</a>
			<a href="/edu/jsp/sub02.jsp" class="maList02">대도시 쏠림현상</a>
			<a href="/edu/jsp/sub03.jsp" class="maList03">사회와 가정의 변화</a>
			<a href="/edu/jsp/sub04.jsp" class="maList04">도시성장에 따른 거주공간변화</a> 
			<a href="/edu/jsp/sub09.jsp" class="maList09">산업 발달에 따른 지역의 변화</a>
			<a href="/edu/jsp/sub10.jsp" class="maList10">일상생활과 환경 문제</a>
		</div>
		<ul class="topMenuList">
			<li><a href="#sbox02">지도에 대해서 알아보자</a></li>
			<li><a href="#sbox03">좌표란 무엇인가요?</a></li>
			<li><a href="#sbox04">축척이란 무엇인가요?</a></li>
		</ul>
	</div>
	<div class="view_box box_1" <% if(!"1".equals(index) && index != null) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<div id="sbox02" class="mboxArea sbox02 first">
			<div class="cont">
				<p class="subj"><img  alt="이미지" src="/edu/include/img/etc/etc_subtxt01.png" /></p>
				<p class="tit">
					<span class="num">1</span>
					<span>지도에 대해서 알아보자</span>
				</p>
				<p class="etc">지도란 땅의 모습을 일정한 비율로 줄인 뒤 기호를 사용하여 평면에 나타낸 것으로 시 공간에 존재하고 있는 여러가지 상황을 일정한 약속(축척, 도식 등)에 따라 2차원(평면) 혹은 3차원(구. 공간)에 나타내는 것으로 크게 일반도와 주제도로 구분합니다.</p>
			 <div style="height: 30px;"></div>
				<div class="tltle01">SGIS 활용하기</div>
				<!-- 
				<div class="btnbox"><p class="btnCont01">SGIS 활용하기</p></div>
				 -->
				<p class="etc">SGIS는 일반(위성) 지도 배경에 통계와 관련된 주요 주제에 대하여 증감형, 색상형, 시계열, 분할뷰 형태의 다양한 지도를 확인할 수 있습니다.</p> 
				<div class="btnbox"><a href="/view/map/interactiveMapMain" target="_blank" class="btnCont02">대화형 통계지도 바로가기</a></div>
			</div>
		</div>
		<div class="sbox03">
			 <p class="starTxt">
				<img  alt="이미지" src="/edu/include/img/ico/ico_star.png" />
				<span>대화형 통계지도에서 인구주택총조사, 가구조건에서 세대구성을 1인가구로 선택 후 지역별 증감 색상 및 통계값을 확인한다.</span>
			 </p>
			 <div style="height: 30px;"></div>
			 <div class="tltle01_2">SGIS 이용법</div>
			 <div style="height: 40px;"></div>
			 <!-- 
			 <div class="btnbox ac"><p class="btnCont01 atype">SGIS 이용법</p></div>
			  -->
			 <p class="txtCenter">데이터보드의 시계열 조회에서 2017년을 선택하고, 데이터시각화에서 범례고정 후 2000년, 2015년, 2017년을 선택하여 지역별 시계열을 조회한다.</p>
			 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/edu01.png" /></p>
			 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/edu02.png" /></p>
		</div>
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_2" <% if(!"2".equals(index)) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<div id="sbox03" class="mboxArea sbox04">
			<div class="cont">
				<p class="subj"><img alt="이미지"  src="/edu/include/img/etc/etc_subtxt01.png" /></p>
				<p class="tit">
					<span class="num">2</span>
					<span>좌표란 무엇인가요?</span>
				</p>
				<p class="etc">좌표란 직선, 평면, 공간에서 점의 위치를 나타내기 위해 사용되는 값으로 보통 평면(2차원)에서는 원점에서 만나는 X축(가로)과 Y축(세로)을 사용해서 점의 위치를 나타내기 위해 사용되는 (X, Y)를 말합니다.</p>
				<div style="height: 30px;"></div>
				<div class="tltle02">SGIS 활용하기</div>
				<!-- 
				<div class="btnbox"><p class="btnCont01">SGIS 활용하기</p></div>
				 -->
				
				<p class="etc">SGIS는 좌표(X, Y)를 이용하여 생활서비스, 도소매, 교통, 숙박, 음식점, 공공, 교육 등 산업분류별로 사업체 위치를 확인할 수 있습니다.</p>
				<div class="btnbox"><a href="/view/map/interactiveMapMain" target="_blank" class="btnCont02">대화형통계지도 바로가기</a></div> 
			</div>
		</div>
		<div class="sbox03"> 
			 <p class="starTxt">
				<img alt="이미지"  src="/edu/include/img/ico/ico_star.png" />
				<span>대화형통계지도 서비스의 POI표출 메뉴에서 음식점-한식을 선택 후 해당 위치를 확인한다.</span>
			 </p>
			 <div style="height: 30px;"></div>
			 <div class="tltle02_2">SGIS 이용법</div>
			 <div style="height: 40px;"></div>
			 <!-- 
			 <div class="btnbox ac"><p class="btnCont01 btype">SGIS 이용법</p></div>
			  -->
			 <p class="imgCenter"><img  alt="이미지" src="/edu/include/img/etc/edu03.png" /></p>
			 <p class="txtCenter">* Tip. 지도상에 인구, 가구 등 통계정보와 POI 정보를 중첩하여 조회할 수 있습니다
			 </p> 
		</div>
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_3" <% if(!"3".equals(index)) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<div id="sbox04" class="mboxArea sbox02">
			<div class="cont">
				<p class="subj"><img alt="이미지"  src="/edu/include/img/etc/etc_subtxt01.png" /></p>
				<p class="tit">
					<span class="num">3</span>
					<span>축척이란 무엇인가요?</span>
				</p>
				<p class="etc">실제 거리를 일정한 비율로 줄인 정도를 말하며, 실제 거리의 상대적 축소 정도에 따라 조금 축소하여 나타낸<br></br>대축척 지도와 비교적 넓은 지역을 많이 축소하여 나타낸 소축척 지도로 구분합니다.
				</p>
				<div style="height: 30px;"></div>
				<div class="tltle01">SGIS 활용하기</div>
				<!-- 
				<div class="btnbox"><p class="btnCont01">SGIS 활용하기</p></div>
				 -->
				<p class="etc">SGIS는 전국, 시도, 시군구, 읍면동, 집계구별로 구분하여 지도 축척을 지도레벨별로 제공 중이며, 지도 확대(+) / 축소(-) 기능을 사용하여 지도 축척을 확인할 수 있습니다.</p> 
				<div class="btnbox"><a href="/view/map/interactiveMapMain"  target="_blank" class="btnCont02">대화형통계지도 바로가기</a></div> 
			</div>
		</div>
		<div class="sbox03">
			 <p class="starTxt">
				<img alt="이미지"  src="/edu/include/img/ico/ico_star.png" />
				<span>대화형통계지도 서비스에서 지도 확대(+) / 축소(-) 기능을 사용하여 지도 축척을 확인한다.</span>
			 </p>
			 <div style="height: 30px;"></div>
			 <div class="tltle01_2">SGIS 이용법</div>
			 <div style="height: 40px;"></div>
			 <!-- 
			 <div class="btnbox ac"><p class="btnCont01 atype">SGIS 이용법</p></div>
			  -->
			 <p class="imgCenter"><img  alt="이미지" src="/edu/include/img/etc/edu04.png" /></p>
			 
			 <p class="txtCenter">* Tip. 1:50,000 축척은 지도상 1cm가 실제 거리로 50,000cm라는 의미입니다.</p>
		</div>
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
</div><!-- end cls:wrapper-->
 
 

</body>
</html> 