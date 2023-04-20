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
					if(nextClassIndex == 5){
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

	<div class="container sub09">
	<p class="location" style="position: absolute;z-index: 10000;right: 350px;top: 78px;">
		<a href="/edu/jsp/main.jsp"><img src="/images/common/location_home.png"/><span>&nbsp;&nbsp;>&nbsp;</span></a>
		<a href="/edu/jsp/submain01.jsp">SGIS에듀가 알려주는 사회변화</a><span>&nbsp;&nbsp;>&nbsp;</span>
		<a href="/edu/jsp/sub09.jsp">산업발달에 따른 지역의 변화</a>
	</p>
<!-----------------------------------------------------------------------------------------------------2019년반영 시작-->	
		<!-- <ul id="nav">
			<li><a href="#header" class="on">SGIS에듀가 알려주는 사회변화</a></li>
			<li><a href="#sbox02"></a></li>
			<li><a href="#sbox03"></a></li>
			<li><a href="#sbox04"></a></li>
			<li><a href="#sbox05"></a></li>
		</ul> -->
<!-----------------------------------------------------------------------------------------------------2019년반영 끝-->		
		<ul id="btnTop">
			<li><a href="#header" class="btnTop"><img src="/edu/include/img/etc/etc_top.png" alt="Link" /></a></li>
		</ul>

		<div id="sbox01" class="mboxArea sbox01 subtop09" style="display: none;"><!-----------------------------------------------------------------------------------------------------2019년반영-->
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
				<li><a href="#sbox02">달라진 영종도의 모습</a></li>
				<li><a href="#sbox03">탄광이 많았던 강원도 정선군</a></li>
				<li><a href="#sbox04">제철소가 들어선 전라남도 광양시</a></li>
				<li><a href="#sbox05">중심지의 변화</a></li>
			</ul>
		</div>
		<div class="view_box box_1" <% if(!"1".equals(index) && index != null) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--1-->
		<div id="sbox02" class="mboxArea sbox02 first">
			<div class="cont">
				<p class="subj">
					<img src="/edu/include/img/etc/etc_subtxt09.png" alt="img" />
				</p>
				<p class="tit">
					<span class="num">1</span> <span>달라진 영종도의 모습</span>
				</p>
				<p class="etc">옛날의 영종도는 넓은 갯벌과 해수욕장을 이용한 어업이 발달한 어촌 지역이었다. 옛날의
					영종도 사람들은 갯벌과 해수욕장을 이용하며 살았다. 하지만 오늘날에는 발달한 산업의 변화로 공항 편의 시설, 아파트와
					상가, 숙박 시설, 식당 등이 많이 들어섰으며, 공항에서 일하거나 공항을 이용하는 사람들, 숙박 시설 및 음식점에서
					일하는 사람이 많아졌다.</p>
				<div style="height: 30px;"></div>
			 	<div class="tltle01">SGIS 활용하기</div>
				<p class="etc">통계주제도와 대화형통계지도를 이용하여 영종도의 농림어가수, 아파트, 숙박 및 음식점업의
					종사자의 변화를 확인할 수 있다</p>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=EyHz6opvFy20160121115806991FE2wurICww&theme=CTGR_004&mapType=04" target="_blank" class="btnCont02">‘통계주제도>노동과 경제>농림어가수 변화’ 바로가기</a>
				</div>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=rLvGnxrtvo20160121115806982pvp4FKMFFn&theme=CTGR_002&mapType=05" target="_blank" class="btnCont02 mt15">‘통계주제도>주거와 교통>아파트 현황’ 바로가기</a>
				</div>
				<div class="btnbox">
					<a href="/view/map/interactiveMap/companyView" target="_blank" class="btnCont02 mt15">‘대화형통계지도>전국사업체조사>숙박 및 음식점업’ 바로가기</a>
				</div>
			</div>
		</div>
		<div class="sbox03">
			<p class="starTxt">
				<img src="/edu/include/img/ico/ico_star.png" alt="img" /> 
				<span>통계주제도>노동과 경제>농림어가수 변화를 확인해본다.</span>
			</p>
			<div style="height: 30px;"></div>
		 	<div class="tltle02_2">SGIS 이용법</div>
		 	<div style="height: 40px;"></div>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList01.jpg" alt="img" />
			</p>
			<p class="txtCenter">농림어가수 변화를 검색해보면 절반이상으로 줄었음을 알 수 있다
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList02.jpg" alt="img" />
			</p>
			<p class="txtCenter">아파트 현황을 검색해보면 급격하게 증가했음을 확인 할 수 있다</p>

			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList03.jpg" alt="img" />
			</p>
			<p class="txtCenter">2000년도와 2014년의 숙박 및 음식점업의 종사자수를 검색해보면 크게 증가했음을 확인 할 수 있다</p>
		</div>
		<!--1 end-->
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_2" <% if(!"2".equals(index)) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--2-->
		<div id="sbox03" class="mboxArea sbox04">
			<div class="cont">
				<p class="subj">
					<img src="/edu/include/img/etc/etc_subtxt09.png" alt="img" />
				</p>
				<p class="tit">
					<span class="num">2</span> <span>탄광이 많았던 강원도 정선군</span>
				</p>
				<p class="etc">강원도 정선군은 원래 지하자원이 풍부하여 광업이 발달한 지역이었고 이곳에 여러 개의
					탄광이 있었다. 그래서 탄광에서 일하는 광부들과 그와 관련된 일을 하는 사람이 많았다. 하지만 오늘날에는 광업이
					쇠퇴하고 관광업이 발달하여 관광 체험관, 전시관, 휴양림, 스키장, 휴양 시설 등이 많이 들어서게 되었다. 또 다른
					고장에서 찾아온 관광객이 많아져서 광업과 관련된 일을 하는 사람보다는 관광지나 숙박 시설 및 휴양 시설에서 일하는 사람이
					많아졌다.</p>
				<div style="height: 30px;"></div>
			 	<div class="tltle01">SGIS 활용하기</div>
				<p class="etc">‘인구주택총조사’와 ‘숙박 및 음식점업’서비스에서 종사자수의 증가 감소 변화를 확인해 볼 수 있다.</p>
				<div class="btnbox">
					<a href="/view/map/interactiveMap/companyView" target="_blank" class="btnCont02">‘대화형통계지도>전국사업체조사>광업’ 바로가기</a>
				</div>
				<div class="btnbox">
					<a href="/view/map/interactiveMap/companyView" target="_blank" class="btnCont02 mt20">‘대화형통계지도>전국사업체조사>숙박 및 음식점업’ 바로가기</a>
				</div>
			</div>
		</div>
		<div class="sbox03">
			<p class="starTxt">
				<img src="/edu/include/img/ico/ico_star.png" alt="img" /> <span>강원도
					정선군을 대상으로 대화형통계지도와 통계주제도를 종사자수 현황을 확인해보도록 한다.</span>
			</p>
			<div style="height: 30px;"></div>
		 	<div class="tltle02_2">SGIS 이용법</div>
		 	<div style="height: 40px;"></div>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList04.jpg" alt="img" />
			</p>
			<p class="txtCenter">광업 종사자수가 줄어든 것을 확인할 수 있고 특히 광업이 가장 발달했던 사북읍은
				2014년에는 광업 종사자가 사라졌다.</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList05.jpg" alt="img" />
			</p>
			<p class="txtCenter">반면 스키장이 생긴 고한읍은 숙박 및 음식점업 종사자가 크게 증가하였다.</p>
		</div>
		<!--2 end-->
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_3" <% if(!"3".equals(index)) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--3-->
		<div id="sbox04" class="mboxArea sbox02">
			<div class="cont">
				<p class="subj">
					<img src="/edu/include/img/etc/etc_subtxt09.png" alt="img" />
				</p>
				<p class="tit">
					<span class="num">3</span> <span>제철소가 들어선 전라남도 광양시</span>
				</p>
				<p class="etc">전라남도 광양시는 남해안에 위치한 바닷가 지역이다. 이곳은 예전부터 어업이 발달한
					지역이었다. 하지만 제철소가 들어선 이후 고장의 산업이 어업에서 철강 산업과 제조업으로 바뀌었으며 그에 따라 사람들이
					하는 일, 생활 모습, 고장의 모습도 변화하였다. 철을 이용하여 물건을 만드는 공장이 많이 들어서고, 원료를 수입하기
					위해 큰 항구가 생겼으며 대부분의 사람들이 제철소와 관련된 일을 한다.</p>
				<div style="height: 30px;"></div>
			 	<div class="tltle01">SGIS 활용하기</div>
				<p class="etc">통계주제도와 대화형통계지도를 이용하여 전라남도 광양시의 농림어가수, 제조업수의 종사자의
					변화를 확인할 수 있다</p>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=EyHz6opvFy20160121115806991FE2wurICww&theme=CTGR_004&mapType=04" target="_blank" class="btnCont02">‘통계주제도>노동과 경제>농림어가수 변화’ 바로가기</a>
				</div>
				<div class="btnbox">
					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=HrDxnwCKq420160121115806990JLMtMtqHvs&theme=CTGR_004&mapType=05" target="_blank" class="btnCont02">‘통계주제도>노동과 경제>제조업 현황’ 바로가기</a>
				</div>
			</div>
		</div>
		<div class="sbox03">
			<p class="starTxt">
				<img src="/edu/include/img/ico/ico_star.png" alt="img" /> <span>지도에서 전라남도 광양시를 선택하여 테이터보드의 그래프 변화를 살펴본다.</span>
			</p>
			<div style="height: 30px;"></div>
		 	<div class="tltle01_2">SGIS 이용법</div>
		 	<div style="height: 40px;"></div>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList06.jpg" alt="img" />
			</p>
			<p class="txtCenter">광양시의 농림어가수가 줄어드는 것을 확인할 수 있다</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/pic_induList07.jpg" alt="img" />
			</p>
			<p class="txtCenter">광양시의 제조업수가 증가하고 있음을 알 수 있다</p>
		</div>
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
	<div class="view_box box_4" <% if(!"4".equals(index)) {%>style="display: none;" <% } %>><!-----------------------------------------------------------------------------------------------------2019년반영--> 
		<!--3 end-->
		<div id="sbox05" class="mboxArea sbox02">
			<div class="cont">
				<p class="subj">
					<img src="/edu/include/img/etc/etc_subtxt09.png" alt="img" />
				</p>
				<p class="tit">
					<span class="num">4</span> <span>중심지의 변화</span>
				</p>
				<p class="etc">중심지는 사람들이 어떤 일이나, 활동을 위해 많이 모이는 곳을 의미합니다. 중심지에는 군청, 은행 등 여러가지 시설들이 있고 많은 사람들이 모여 사는데요. 이러한 중심지에 시장 개방 등 영향으로 대형마트가 들어서면 문방구, 철물점 등 동네 구멍가게가 사라지는 사회현상을 통계지도로 확인해 보자.</p>
				<div style="height: 30px;"></div>
			 	<div class="tltle01">SGIS 활용하기</div>
			 	<!-- 190306 방민정수정 시작
				<p class="etc">전국사업체조사의 백화점/중대형마트, 문방구, 철물점 현황을 확인할 수 있습니다.</p> -->
				<p class="etc">전국사업체조사의 백화점/중대형마트, 문방구, 철물점 연도별 현황을 확인할 수 있습니다.</p>
				<!-- 190306 방민정수정 끝 -->
				<div class="btnbox">
					<a href="/view/map/interactiveMap/companyView" target="_blank" class="btnCont02">‘대화형 통계지도>전국사업체조사>’ 바로가기</a>
				</div>
			</div>
		</div>
		<div class="sbox03">
			<p class="starTxt">
				<img src="/edu/include/img/ico/ico_star.png" alt="img" />
				<!-- 190306 방민정수정 시작
				<span>대화형 통계지도-전국사업체조사-테마업종별 사업체수 현황 및 데이터보드의 시계열 조회 연도를 선택하여 확인한다.</span>-->
				<span>대화형 통계지도 > 전국사업체조사 > 테마업종별 사업체수 현황을 다중뷰를 이용한 연도별 증감 비교 및 범례고정으로 연도별 색상 변화를 확인한다.</span>
				<!-- 190306 방민정수정 끝 -->
			</p>
			<div style="height: 30px;"></div>
		 	<div class="tltle01_2">SGIS 이용법</div>
		 	<div style="height: 40px;"></div>
		 	<!-- 190306 방민정 수정 시작 -->
		 	<p class="imgCenter"><img src="/edu/include/img/etc/edu18.png" alt="img"/></p>
		 	<p class="imgCenter"><img src="/edu/include/img/etc/edu19.png" alt="img"/></p>
			<p class="imgCenter"><img src="/edu/include/img/etc/edu20.png" alt="img"/></p>
			<p class="imgCenter"><img src="/edu/include/img/etc/edu21.png" alt="img"/></p>
			<p class="imgCenter"><img src="/edu/include/img/etc/edu22.png" alt="img"/></p>
			<p class="imgCenter"><img src="/edu/include/img/etc/edu23.png" alt="img"/></p>
		 	<!--  
		 	<p class="txtCenter"><그림> 백화점/중대형마트 사업체수 현황</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/edu10.png" alt="img" style="width: 1540px;"/>
			</p>
			<p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 510px;margin-top:-20px;">[2016년]</p>
		 	<p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 1312px;margin-top: -52px;">[2010년]</p>
		 
			<p class="txtCenter"><그림> 문구점 사업체수 현황</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/edu11.png" alt="img" style="width: 1540px;"/>
			</p>
			<p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 510px;margin-top:-20px;">[2016년]</p>
		 	<p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 1312px;margin-top: -52px;">[2010년]</p>
			
			<p class="txtCenter"><그림> 철물점 사업체수 현황</p>
			<p class="imgCenter">
				<img src="/edu/include/img/etc/edu11.png" alt="img" style="width: 1540px;"/>
			</p>
			<p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 510px;margin-top:-20px;">[2016년]</p>
		 	<p class="txtCenter" style="text-align:initial;width: 500px;margin-left: 1312px;margin-top: -52px;">[2010년]</p>
			 190306 방민정수정 끝-->
		</div>
	</div><!-----------------------------------------------------------------------------------------------------2019년반영--> 
</div>
<!-- end cls:wrapper-->
</body>
</html>
