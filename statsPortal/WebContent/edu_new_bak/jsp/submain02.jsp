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
		$("#tit01").removeClass("on");
		$("#tit02").addClass("on");
	});
	
	$(document).ready(function(){
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
			location.href = "/edu/jsp/sub05.jsp?index="+index;
		}else if(type == 'sub02'){
			location.href = "/edu/jsp/sub06.jsp?index="+index;
		}else if(type == 'sub03'){
			location.href = "/edu/jsp/sub07.jsp?index="+index;
		}else if(type == 'sub04'){
			location.href = "/edu/jsp/sub08.jsp?index="+index;
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
<div class="container" style="position:relative; top:57px; left:0; width:100%; heigth:100%;" > <!--2020-02-19 수정  -->
	<!--  <ul id="btnTop">
		<li><a href="#header" class="btnTop"><img src="/edu/include/img/etc/etc_top.png" alt="Link" /></a></li>
	</ul>-->
  
	<div id="submainbox" class="submainbox" style="background:url('/edu/include/img/bg/edsubg2.jpg') no-repeat center top;width: 100%; height:1140px;position:relative;  overflow:hidden;"><!--2020-02-19 수정  -->
		<a style="position:absolute;top:190px;left:36%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub2_01_on.png" class="icon">
		</a>
		
		<a style="position:absolute;top:190px;left:43%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub2_02_off.png" class="icon">
		</a>
		
		<a style="position:absolute;top:190px;left:50%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub2_03_off.png" class="icon">
		</a>
		
		<a style="position:absolute;top:190px;left:57%;"><!--2020-02-17 수정  -->
			<img src="/edu/include/img/etc/eduicon_sub2_04_off.png" class="icon">
		</a>
		
		<div id="sub01" style="display:block" class="subBox">
			<!-- <img src="/edu/include/img/etc/text07.png" style="left:45%" class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_2 mbox01" onClick="changePage('sub01' , 1)">
					커뮤니티 매핑은<br> 무엇일까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox02" onClick="changePage('sub01' , 2)">
					커뮤니티 매핑은<br> 어떻게 활용되고 있는가?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox03"  onClick="changePage('sub01' , 3)">
					지역현안 해결을 위한<br> 통계소통지도 소개
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox04"  onClick="changePage('sub01' , 4)">
					지역현안 해결을 위한<br> 통계소통지도 이용방법
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox05" onClick="changePage('sub01' , 5)">
					지역현안 해결을 위한<br> 통계소통지도 활용사례
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox06" onClick="changePage('sub01' , 6)">
					이렇게 활용해보세요!!
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub02" style="display:none" class="subBox">
			<!-- <img src="/edu/include/img/etc/text08.png" style="left:45%" class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_2 mbox10"  onClick="changePage('sub02' , 1)">
					'통계지도 만들기'<br> 할 수 있을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox11"  onClick="changePage('sub02' , 2)">
					통계지도체험 이용방법
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox12"  onClick="changePage('sub02' , 3)">
					이렇게  이용해보세요!!
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub03" style="display:none" class="subBox">
			<!-- <img src="/edu/include/img/etc/text09.png" style="left:46%" class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_2 mbox15" onClick="changePage('sub03' , 1)">
					나의 데이터를<br> 보여줄 수 있을까?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox16" onClick="changePage('sub03' , 2)">
					나의 데이터 이용방법
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox17" onClick="changePage('sub03' , 3)">
					이렇게 이용해보세요!!
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
		
		<div id="sub04" style="display:none" class="subBox">
			<!-- <img src="/edu/include/img/etc/text10.png" style="left:45%" class="texticon"> --><!--2020-02-19 수정  -->
			<div class="in_box">
				<a class="sub_2 mbox19"  onClick="changePage('sub04' , 1)">
					살고싶은 우리동네란?
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox20"  onClick="changePage('sub04' , 2)">
					살고싶은 우리동네<br> 이용방법
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox21"  onClick="changePage('sub04' , 3)">
					살고싶은 우리동네<br> 활용사례
					<img class="mboxIcon"/>
				</a>
				<a class="sub_2 mbox22" onClick="changePage('sub04' , 4)">
					이렇게 이용해보세요!!
					<img class="mboxIcon"/>
				</a>
			</div>
		</div>
	</div>
</div>
	

 
 

</body>
</html> 