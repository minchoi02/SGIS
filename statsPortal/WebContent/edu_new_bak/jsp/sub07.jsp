<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
		$("#tit02").addClass("on");
		$("#tit01").removeClass("on");
		
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

<div class="container sub07">
	<p class="location" style="position: absolute;z-index: 10000;right: 350px;top: 78px;">
		<a href="/edu/jsp/main.jsp"><img src="/images/common/location_home.png"/><span>&nbsp;&nbsp;>&nbsp;</span></a>
		<a href="/edu/jsp/submain02.jsp">생활에 유익한 SGIS에듀 체험</a><span>&nbsp;&nbsp;>&nbsp;</span>
		<a href="/edu/jsp/sub07.jsp">나이 데이터</a>
	</p>
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

	<div id="sbox01" class="mboxArea sbox01 subtop07" style="display: none;"><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--링크-->
		<div class="saListBox">
			<a href="/edu/jsp/sub05.jsp" class="maList01">커뮤니티매핑을 활용한 학생참여수업</a>
			<a href="/edu/jsp/sub06.jsp" class="maList02">학생들이 가진 데이터로 통계지도 만들기1</a>
			<a href="/edu/jsp/sub07.jsp" class="maList03">학생들이 가진 데이터로 통계지도 만들기2</a>
			<a href="/edu/jsp/sub08.jsp" class="maList04">공간적 의사 결정 지원 서비스 체험</a> 
		</div>
		<ul class="topMenuList">
			<li><a href="#sbox02">나의 데이터를 보여줄 수 있을까?</a></li>
			<li><a href="#sbox03">나의 데이터 이용방법</a></li> 
			<li><a href="#sbox04">이렇게 이용해보세요!!</a></li>  
		</ul>
	</div>
	<div class="view_box box_1" <% if(!"1".equals(index) && index != null) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<div id="sbox02" class="mboxArea sbox02 first">
			<div class="cont" style="top:78px">
				<p class="subj"><img alt="이미지"  src="/edu/include/img/etc/etc_subtxt07.png" /></p>
				<p class="tit">
					<span class="num">1</span>
					<span>나의 데이터를 보여줄 수 있을까?</span>
				</p>
				<!-- mng_s 20170915_김건민 -->
				<p class="etc">대화형 통계지도의 ‘나의 데이터’를 이용하면 내가 가지고 있는 위치자료를 서버에 업로드 할 수 있고, 업로드 한 후 위치보기,  열지도 등 다양하게 시각화가 가능하다.</p>
				<!-- mng_e 20170915_김건민 --> 
				<div class="btnbox"><a href="/view/map/interactiveMap/userDataView"  target="_blank" class="btnCont02">‘나의 데이터’ 바로가기</a></div> 
			</div>
		</div> 
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_2" <% if(!"2".equals(index)) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영-->  
		<div id="sbox03" class="mboxArea sbox04 mt10">
			<div class="cont" style="top:78px">
				<p class="subj"><img alt="이미지"  src="/edu/include/img/etc/etc_subtxt07.png" /></p>
				<p class="tit">
					<span class="num">2</span>
					<span>‘나의 데이터’ 이용방법</span>
				</p>
				<!-- mng_s 20170915_김건민 -->
				<p class="etc">학생들이 주소정보를 포함한 자료를 가지고 있는 경우 해당자료를 엑셀양식에 맞춰 정리한 후 대화형 통계지도에 업로드하면 주소가 지도좌표로 변환되어 화면에 마커 또는 열지도로 표시할 수 있다.</p>
				<!-- mng_e 20170915_김건민 --> 
			</div>
		</div> 
		<div class="sbox03"> 
			 <p class="imgCenter mt40"><img alt="이미지"  src="/edu/include/img/etc/pic_myList01.jpg" /></p>
			 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/pic_myList02.jpg" /></p>
			 <p class="imgCenter"><img alt="이미지"  src="/edu/include/img/etc/pic_myList03.jpg" /></p>
			 <p class="imgCenter mb40"><img alt="이미지"  src="/edu/include/img/etc/pic_myList04.jpg" /></p>
		</div>
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_3" <% if(!"3".equals(index)) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<div id="sbox04" class="mboxArea sbox02">
			<div class="cont" style="top:61px">
				<p class="subj"><img alt="이미지"  src="/edu/include/img/etc/etc_subtxt07.png" /></p>
				<p class="tit">
					<span class="num">3</span>
					<span>이렇게 이용해 보세요!!</span>
				</p>
				<div style="height: 30px;"></div>
				<div class="tltle03">하나. 나의 동선지도 만들기</div>
				<div style="height: 10px;"></div>
				<!-- 
				<div class="btnbox"><a href="#sbox04" class="btnCont02" style="cursor: default;">하나. 나의 동선지도 만들기</a></div>
				 -->
				<p class="etc">내가 자주 가는 곳, 좋아하는 식당 등 주소를 입력해서 동선지도를 만들어 보세요.
				<br />* Tip. 라인 형태의 동선지도를 만들려면 KML 파일 형식을 이용해서 만들 수 있다. KML 예제파일을 참고하도록 한다.</p>
				<div style="height: 30px;"></div>
				<div class="tltle03">둘.지역현안 해결을 위한 통계소통지도</div>
				<div style="height: 10px;"></div>
				<!-- 
				<div class="btnbox"><a href="#sbox04" class="btnCont02" style="cursor: default;">둘. 통계커뮤니티맵을 활용한 지도 만들기</a></div> 
				 -->
				<p class="etc">지역현안 해결을 위한 통계소통지도로 모은 주소자료를 이용하여 나의 데이터로 더 멋진 지도를 만들어 보세요. 
				<br />열지도를 사용하면 멋진 효과를 낼 수 있답니다.</p>
			</div>
		</div> 
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	 

</div><!-- end cls:wrapper-->
 
 

</body>
</html> 