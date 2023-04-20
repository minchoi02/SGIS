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
<script type="text/javascript">

	$(document).ready(function(){
		$("#tit02").removeClass("on");
		$("#tit01").addClass("on");
		
		$(".icon").on("click",function(){
			$(".icon").each(function(){
				var src = $(this).attr("src");
				$(this).attr("src" , src.replace("_on" , "_off"));
			});
			var src = $(this).attr("src");
			$(this).attr("src" , src.replace("_off" , "_on"));
			$(".subBox").hide();
			$("#sub0" + ($(this).parent("a").index()+1)).show();
		});
	});
	
	function changePage(type , index){
		if(type == 'sub01'){
			location.href = "/edu/jsp/sub01.jsp?index="+index;
		}else if(type == 'sub02'){
			location.href = "/edu/jsp/sub02.jsp?index="+index;
		}else if(type == 'sub03'){
			location.href = "/edu/jsp/sub03.jsp?index="+index;
		}else if(type == 'sub04'){
			location.href = "/edu/jsp/sub04.jsp?index="+index;
		}else if(type == 'sub05'){
			location.href = "/edu/jsp/sub09.jsp?index="+index;
		}else if(type == 'sub06'){
			location.href = "/edu/jsp/sub10.jsp?index="+index;
		}
	}
</script>
<style>
	.submainbox a {
		cursor: pointer;
	}
	
	body {
		overflow : auto;/*2020-02-19 수정  */
	}
</style>
</head>  
<body>      

<script type="text/javascript" src="/edu/include/js/header/header.js"></script>
<div class="container" style="position:relative; top:57px; left:0; width:100%; heigth:100%;"> <!--2020-02-19 수정  -->
	<!--  <ul id="btnTop">
		<li><a href="#header" class="btnTop"><img src="/edu/include/img/etc/etc_top.png" alt="Link" /></a></li>
	</ul>-->
  
	<div id="submainbox" class="submainbox" style="background:url('/edu/include/img/bg/edsubg1.jpg') no-repeat center top;width: 100%; height:1140px; position:relative;  overflow:hidden;"><!--2020-02-19 수정  -->
		
		<a style="position:absolute;top:170px;left:30%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub_01_on.png"  class="icon">
		</a>
		
		<a style="position:absolute;top:170px;left:37%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub_02_off.png"  class="icon">
		</a>
		
		<a style="position:absolute;top:170px;left:43%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub_03_off.png"  class="icon">
		</a>
		
		<a style="position:absolute;top:170px;left:50%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub_04_off.png"  class="icon">
		</a>
		
		<a style="position:absolute;top:170px;left:57%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub_05_off.png"  class="icon">
		</a>
		
		<a style="position:absolute;top:170px;left:63%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub_06_off.png"  class="icon">
		</a>
		
		<div id="sub01" style="display:block;" class="subBox" >
		
			<!-- <img src="/edu/include/img/etc/text01.png" style="left:44%"  class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_1 mbox01" style="" onClick="changePage('sub01' , 1)">
					우리나라 <br/>인구변화를 <br/>알아보자
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox02" style="" onClick="changePage('sub01', 2)">
					저출산 <br/>정책에 따라 인구구조가<br> 어떻게 달라질 수 있을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox03" style="" onClick="changePage('sub01', 3)">
					그 많던 아이들은<br> 어디에 갔을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox04" style="" onClick="changePage('sub01', 4)">
					고령화 현황,<br> 지역별로 어떤 차이가<br> 있을까?(1)
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox05" style="" onClick="changePage('sub01', 5)">
					고령화 현황,<br> 지역별로 어떤 차이가<br> 있을까?(2)
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox06" style="" onClick="changePage('sub01', 6)">
					고령화 현황,<br> 지역별로 어떤 차이가<br> 있을까?(3)
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox07" style="" onClick="changePage('sub01', 7)">
					왜 저출산이 <br>심해졌을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox08" style="" onClick="changePage('sub01', 8)">
					저출산,고령화 <br> 왜 심각한 문제일까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox09" style="" onClick="changePage('sub01', 9)">
					우리 지역의 고령화 준비,<br> 잘 되고 있을까?
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub02" style="display:none; " class="subBox">
			<!-- <img src="/edu/include/img/etc/text02.png" style="left:45%;"  class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_1 mbox10"  onClick="changePage('sub02', 1)">
					우리나라 인구쏠림 현상,<br>얼마나 심할까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox11"  onClick="changePage('sub02', 2)">
					청년들은 모두 <br/> 어디에 갔을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox12"  onClick="changePage('sub02', 3)">
					일자리가 수도권에<br> 집중되어 있을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox13" onClick="changePage('sub02', 4)">
					예전에는 지방이 <br/> 강세였는데... <br/> 지금의 지방은 어떤 모습일까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox14 " onClick="changePage('sub02', 5)">
					지역내 총생산(GRDP)<br>으로 보는<br> 경제성장의 차이
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub03" style="display:none; " class="subBox">
			<!-- <img src="/edu/include/img/etc/text03.png" style="left:44%;"  class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_1 mbox15" onClick="changePage('sub03', 1)">
					사회전반에 새로운 변화<br> '나 혼자 산다'.<br>1인가구는 늘고 대가족은 줄다
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox16" onClick="changePage('sub03', 2)">
					그 많던 pc방은 <br/> 어디로 갔을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox17" onClick="changePage('sub03', 3)">
					LTE급 사회 변화...<br> 앞으로 어떤 업종이 뜨게 될까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox18" onClick="changePage('sub03', 4)">
					다문화 사회로의 변화
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub04" style="display:none;" class="subBox">
			<!-- <img src="/edu/include/img/etc/text04.png" style="left:42%;" class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_1 mbox19" onClick="changePage('sub04', 1)">
					도시가 성장하면<br> 도시구조 변화가 생긴다<br> → 도심공동화 현상
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox20" onClick="changePage('sub04', 2)">
					지역 간 남녀 <br>성비 비율 및<br> 인구 분포의 불균형
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox21" onClick="changePage('sub04', 3)">
					교류하면서 발전하는<br> 우리지역<br>(귀농/귀촌/귀어)
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub05" style="display:none; " class="subBox">
			<!-- <img src="/edu/include/img/etc/text05.png"  style="left:42%;" class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_1 mbox22" onClick="changePage('sub05', 1)">
					달라진 영종도의 모습
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox23" onClick="changePage('sub05', 2)">
					탄광이 많았던 <br/>강원도 정선군
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox24" onClick="changePage('sub05', 3)">
					제철소가 들어선 <br/> 전라남도 광양시
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox25" onClick="changePage('sub05', 4)">
					중심지의 변화
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub06" style="display:none; " class="subBox">
			<!-- <img src="/edu/include/img/etc/text06.png"  style="left:44%;" class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_1 mbox26" onClick="changePage('sub06', 1)">
					미세먼지
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox27" onClick="changePage('sub06', 2)">
					생활폐기물
					<img class="mboxIcon"/>
				</a>
				<a class="sub_1 mbox28" onClick="changePage('sub06', 3)">
					자연재해(지진)와 <br>인간생활
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
	</div>
</div>
	

 
 

</body>
</html> 