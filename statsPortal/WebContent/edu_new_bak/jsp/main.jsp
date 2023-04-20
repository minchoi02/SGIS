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

$(function(){
	$("#eduVideo").click(function(){
	    var url = '/edu/jsp/eduVideo.jsp';
	    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
		              'status=no,location=no,menubar=no,width=1140,height=586'; 
		window.open(url, 'eduVideo', options);
	});
	
	$("#eduVideo").hover(function(){
		$(this).attr("src","/edu/include/img/bg/eduVideo_h.png");
	},function(){
		$(this).attr("src","/edu/include/img/bg/eduVideo.png");
	});
});

</script>
</head>  
<body style="overflow:auto"><!--2020-02-19 수정  -->      
<script type="text/javascript" src="/edu/include/js/header/header.js"></script>
<div class="container" style="position:relative; top:57px; left:0; width:100%; heigth:100%;"> 
	<!--  <ul id="btnTop">
		<li><a href="#header" class="btnTop"><img src="/edu/include/img/etc/etc_top.png" alt="Link" /></a></li>
	</ul>-->
  
	<div id="mainbox" class="mainbox" style="position:relative;  overflow:hidden; height:1140px"><!--2020-02-19 수정  -->  
  	<img id="eduVideo" src="/edu/include/img/bg/eduVideo.png" alt="SGIS에듀 동영상 보기" style="cursor:pointer;    position: absolute;
    right: 0px;
    top: 200px;">
  
	<div id="mainbox" class="mainbox">
		<a onclick="location.href='/edu/jsp/sub01.jsp'" class="edicon01">
			<img src="/edu/include/img/etc/main_btn_1_1_off.png">
			<img src="/edu/include/img/etc/main_btn_1_1_on.png">
<!-- 		<img src="/edu/include/img/etc/main_btn_1_2.png"> -->
		</a>
		
		<a onclick="location.href='/edu/jsp/sub02.jsp'" class="edicon02">
			<img src="/edu/include/img/etc/main_btn_2_1_off.png">
			<img src="/edu/include/img/etc/main_btn_2_1_on.png">
		</a>
		
		<a onclick="location.href='/edu/jsp/sub03.jsp'" class="edicon03">
<!-- 			<img src="/edu/include/img/etc/main_btn_3_1.png"> -->
<!-- 			<img src="/edu/include/img/etc/main_btn_3_2.png"> -->
			<img src="/edu/include/img/etc/main_btn_3_1_off.png">
			<img src="/edu/include/img/etc/main_btn_3_1_on.png">
		</a>
		
		<a onclick="location.href='/edu/jsp/sub04.jsp'" class="edicon04">
			<img src="/edu/include/img/etc/main_btn_4_1_off.png">
			<img src="/edu/include/img/etc/main_btn_4_1_on.png">
<!-- 			<img src="/edu/include/img/etc/main_btn_4_2.png"> -->
		</a>
		
		<a onclick="location.href='/edu/jsp/sub09.jsp'" class="edicon05">
			<img src="/edu/include/img/etc/main_btn_5_1_off.png">
			<img src="/edu/include/img/etc/main_btn_5_1_on.png">
<!-- 			<img src="/edu/include/img/etc/main_btn_5_2.png"> -->
		</a>
		
		<a onclick="location.href='/edu/jsp/sub10.jsp'" class="edicon06">
			<img src="/edu/include/img/etc/main_btn_6_1_off.png">
			<img src="/edu/include/img/etc/main_btn_6_1_on.png">
<!-- 			<img src="/edu/include/img/etc/main_btn_6_2.png"> -->
		</a>
		
		<a onclick="location.href='/edu/jsp/sub05.jsp'" class="edicon07">
			<img src="/edu/include/img/etc/main_btn_7_1_off.png">
			<img src="/edu/include/img/etc/main_btn_7_1_on.png">
<!-- 			<img src="/edu/include/img/etc/main_btn_7_2.png"> -->
		</a>
		
		<a onclick="location.href='/edu/jsp/sub06.jsp'" class="edicon08">
			<img src="/edu/include/img/etc/main_btn_8_1_off.png">
			<img src="/edu/include/img/etc/main_btn_8_1_on.png">
<!-- 			<img src="/edu/include/img/etc/main_btn_8_2.png"> -->
		</a>
		
		<a onclick="location.href='/edu/jsp/sub07.jsp'" class="edicon09">
			<img src="/edu/include/img/etc/main_btn_9_1_off.png">
			<img src="/edu/include/img/etc/main_btn_9_1_on.png">
<!-- 			<img src="/edu/include/img/etc/main_btn_9_2.png"> -->
		</a>
		
		<a onclick="location.href='/edu/jsp/sub08.jsp'" class="edicon10">
			<img src="/edu/include/img/etc/main_btn_10_1_off.png">
			<img src="/edu/include/img/etc/main_btn_10_1_on.png">
<!-- 			<img src="/edu/include/img/etc/main_btn_10_2.png"> -->
		</a>
	</div>
</div>
	

 
 

</body>
</html> 