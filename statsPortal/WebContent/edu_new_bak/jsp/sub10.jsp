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
		$("#tit01").addClass("on");
		$("#tit02").removeClass("on");
		
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

	<div class="container sub10">
	<p class="location" style="position: absolute;z-index: 10000;right: 350px;top: 78px;">
		<a href="/edu/jsp/main.jsp"><img src="/images/common/location_home.png"/><span>&nbsp;&nbsp;>&nbsp;</span></a>
		<a href="/edu/jsp/submain01.jsp">SGIS에듀가 알려주는 사회변화</a><span>&nbsp;&nbsp;>&nbsp;</span>
		<a href="/edu/jsp/sub03.jsp">일상생활과 환경문제</a>
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

	<div id="sbox01" class="mboxArea sbox01 subtop10" style="display: none;"><!-----------------------------------------------------------------------------------------------------2019년반영-->
		<!--링크-->
		<div class="saListBox">
			<!-- <a href="/edu/jsp/sub11.jsp" class="maList11">지도란?</a> -->
			<a href="/edu/jsp/sub01.jsp" class="maList01">저출산 과 고령화문제</a>
			<a href="/edu/jsp/sub02.jsp" class="maList02">대도시 쏠림현상</a>
			<a href="/edu/jsp/sub03.jsp" class="maList03">사회와 가정의 변화</a>
			<a href="/edu/jsp/sub04.jsp" class="maList04">도시성장에 따른 거주공간변화</a>
			<a href="/edu/jsp/sub09.jsp" class="maList09">산업 발달에 따른 지역의 변화</a>
			<a href="/edu/jsp/sub10.jsp" class="maList10">일상생활과 환경 문제</a>
		</div>
		<ul class="topMenuList">
			<li><a href="#sbox02">미세먼지</a></li>
			<li><a href="#sbox03">생활폐기물</a></li>
			<li><a href="#sbox04">자연재해(지진)와 인간생활</a></li>
		</ul>
	</div>
	<div class="view_box box_1" <% if(!"1".equals(index) && index != null) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--1-->
		<div id="sbox02" class="mboxArea sbox02 first">
			<div class="cont">
				<p class="subj">
					<img src="/edu/include/img/etc/etc_subtxt10.png" alt="img" />
				</p>
				<p class="tit">
					<span class="num">1</span> <span>미세먼지</span>
				</p>
				<p class="etc">급속한 공업화 때문에 대기 오염이 심각해지면서 오염 물질이 바람을 타고 이동한다. 
					이 오염물질 중 하나인 미세먼지는 지름이 10㎛ 이하의 먼지로 자동차 배출 가스나 공장 굴뚝 등을 통해 주로 배출된다. 이러한 미세먼지의 농도가 높아지면 야외 활동을 자제하거나 외출할 때 마스크를 착용해야 한다.</p>
				<div style="height: 30px;"></div>
		 		<div class="tltle01">SGIS 활용하기</div>	
				<p class="etc">통계주제도를 이용하여 미세먼지 대기오염도 현황을 확인해 볼 수 있다.</p>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=9pyrpJvwHw20160121115806991GvpLyuuwDt&theme=CTGR_005&mapType=05" target="_blank" class="btnCont02">‘통계주제도>환경과 안전>미세먼지 대기오염도 현황’ 바로가기</a>
				</div>
			</div>
		</div>
		<div class="sbox03">
			<p class="starTxt">
				<img src="/edu/include/img/ico/ico_star.png" alt="img" /> <span>일상생활과
					환경 문제에 대한 미세먼지 대기오염도 현황을 확인해보도록 한다.</span>
			</p>
			<div style="height: 30px;"></div>
		 	<div class="tltle02_2">SGIS 이용법</div>
		 	<div style="height: 40px;"></div>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList08.jpg" alt="img" />
			</p>
		</div>
		<!--1 end-->
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_2" <% if(!"2".equals(index) ) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--2-->
		<div id="sbox03" class="mboxArea sbox04">
			<div class="cont">
				<p class="subj">
					<img src="/edu/include/img/etc/etc_subtxt10.png" alt="img" />
				</p>
				<p class="tit">
					<span class="num">2</span> <span>생활 폐기물</span>
				</p>
				<p class="etc">석유 화학제품 및 일회용품의 사용 증가로 일상생활에서 배출하는 폐기물의 양이 늘어나고
					있고, 생산 활동 과정에서 산업 폐기물이 많이 발생하고 있다. 우리가 추운 겨울에 학교에서 버스를 타고 집에 돌아와
					난방을 하고 텔레비전을 본다면 이미 화석 연료를 소비하고 대기 오염 물질을 배출한 것이다. 이처럼 일상생활은 곧 환경
					문제와 관련되어 있기 때문에 평소에 자신이 하는 행동과 선택이 환경 문제에 어떤 영향을 미칠지에 대해 생각하고 환경을
					배려하는 자세를 가져야 한다.</p>
				<div style="height: 15px;"></div>
		 		<div class="tltle01">SGIS 활용하기</div>
				<p class="etc" style="margin-top: 15px;">통계주제도를 이용하여 생활폐기물, 화학물질 배출 및 일반폐기물 재활용률 정보를 확인해보고
					우리가 배출하는 생활폐기물이 어느 정도인지 생각해 볼 수 있다.</p>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=oFDHwonv0M20160121115806992MpKpKq3uwI&theme=CTGR_005&mapType=03" target="_blank" class="btnCont02" style="margin-top: 15px;">‘통계주제도>환경과 안전>주민 1인당 생활폐기물 배출량’ 바로가기</a>
				</div>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=MqywrvyL8o20160629174353430I41vC0HIrn&theme=CTGR_005&mapType=03" target="_blank" class="btnCont02" style="margin-top: 5px;">‘통계주제도>환경과 안전>화학물질 배출현황’ 바로가기</a>
				</div>
				<div class="btnbox"">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=pvKDFvpvrM20160121115806992Ez9tGyLw0J&theme=CTGR_005&mapType=03" target="_blank" class="btnCont02" style="margin-top: 5px;">‘통계주제도>환경과 안전>일반폐기물 재활용률’ 바로가기</a>
				</div>
			</div>
		</div>
		<div class="sbox03">
			<p class="starTxt">
				<img src="/edu/include/img/ico/ico_star.png" alt="img" /> <span>통계주제도를 이용하여 생활폐기물, 화학물질 배출 및 일반폐기물 재활용률 정보를 확인해보도록 한다.</span>
			</p>
			<div style="height: 30px;"></div>
		 	<div class="tltle02_2">SGIS 이용법</div>
		 	<div style="height: 40px;"></div>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList09.jpg" alt="img" />
			</p>
			<p class="txtCenter">*Tip. 생활폐기물 = 생활폐기물 배출량 / 주민수</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList10.jpg" alt="img" />
			</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList11.jpg" alt="img" />
			</p>
			<p class="txtCenter">*Tip. 일반폐기물 재활용률 = (총 재활용량/생활폐기물 총 발생량) * 100</p>
		</div>
		<!--2 end-->
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_3" <% if(!"3".equals(index) ) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--3-->
		<div id="sbox04" class="mboxArea sbox02 first" style="height:288px">
			<div class="cont">
				<p class="subj">
					<img src="/edu/include/img/etc/etc_subtxt10.png" alt="img" />
				</p>
				<p class="tit">
					<span class="num">3</span> <span>자연재해(지진)와 인간생활</span>
				</p>
				<p class="etc"> ‘16년도 경주시 5.8(Ml) 최대규모의 지진 발생 등 이제는 우리나라도 지진발생에 대한 안전지역이라고 할 수 없습니다. 지진 발생에 따른 피해를 줄이기 위한 어떠한 노력이 필요할까요?
				</p>
				<div></div>
		 		<div class="tltle01">SGIS 활용하기</div>	
				<p class="etc">SGIS는 지진발생 분포지역 현황을 확인할 수 있습니다.</p>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=41d1dhxBgx20180627145739008kXnl0kFaa8&theme=CTGR_005&mapType=05" target="_blank" class="btnCont02">‘통계주제도>환경과 안전>지진발생 분포지역’ 바로가기</a>
				</div>
			</div>
		</div>
		<div class="sbox03">
			<p class="starTxt">
				<img src="/edu/include/img/ico/ico_star.png" alt="img" /> <span>통계주제도 서비스에서 전국 지진발생 분포지역 현황을 확인한다.</span>
			</p>
			<div style="height: 30px;"></div>
		 	<div class="tltle02_2">SGIS 이용법</div>
		 	<div style="height: 15px;"></div>
		 	<p class="imgCenter"><img src="/edu/include/img/etc/edu17.png" alt="img" />
		 	<!-- 190306 방민정수정 시작 -->
		 	<!--  <p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 370px;"><그림> 지진발생 분포지역 현황 – 2017년</p>
		 	<p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 1300px;margin-top:-50px;"><그림> 경상북도 연도별 발생 현황</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/edu06.png" alt="img" />
				190306 방민정수정 끝-->
			</p>
		</div>
		<!--3 end-->
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
</div>
<!-- end cls:wrapper-->
</body>
</html>