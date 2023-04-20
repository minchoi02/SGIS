<%
/**************************************************************************************************************************
* Program Name  : 메인 JSP  
* File Name     : index.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03, 변경 2022-11-29
* History       : 아이티밴드 유지혜,이준혁  2022-11-29 서비스 팝업 추가

*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String userAgent = request.getHeader("User-Agent");
	String[] mobileOs = {"iPhone","iPod","BlackBerry","Android","Windows CE", "Nokia", "LG", "MOT", "SAMSUNG", "SonyEricsson", "Webos",
				"Mobile", "Symbian", "Opera Mobi", "Opera Mini", "IEmobile"};
	
	String param = request.getParameter("param");
	if(param == null || !param.equals("0")){
		int j = -1;
		if(userAgent != null && !userAgent.equals("")){
			for(int i = 0; i < mobileOs.length; i++){
				j = userAgent.indexOf(mobileOs[i]);
				if(j > -1 ){
					out.println("");
					out.println("");
					out.println("<script>");
					out.println("location.href='/mobile';");
					out.println("</script>");
					out.println("");
					out.println("");
					break;
				}
			}
		}
	}
%>
<!-- Top Include -->
<jsp:include page="/view/common/common"></jsp:include>
<!DOCTYPE html>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> -->
<html lang="ko">
<head>
    <meta charset="utf-8">
	<!--     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi"> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>통계지리정보서비스</title>
    <!--     <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800&amp;subset=korean" rel="stylesheet">    -->
    <script  src="/js/common/includeHead.js?version=2021.09.03"></script>
	<!--     <script type="text/javascript" src="/js/plugins/slick.min.js"></script>     -->
    <script  src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
	<!--     <script  src="/js/common/common.js"></script> --> <!-- // djlee 2019-07-15  수정 (로딩속도 개선을 위해 필요한 function은 index.js로 이동하고 common.js는 주석처리함.) -->
    <script  src="/js/index.js?version=1.0"></script>    
	     
    <script>

        var sggMapName = ""; 
		function jdgmnOpen(){
	    	var url = 'https://www.gwanghwamoon1st.go.kr/fron/jdgmn/jdgmnView.do?qustnr_id=87ee82678b404d7099d501ff6fbece1f';
		    var options = 'toolbar=yes,scrollbars=yes,resizable=yes,copyhistory=yes,'+
		                  'status=yes,location=yes,menubar=yes,width=850,height=600'; 
		   window.open(url, '', options);
	    }

	    $(function(){		
	    	$(".slickList").mCustomScrollbar({axis:"xy"}); 
	    	if($('html').hasClass('ie') || (Function('/*@cc_on return document.documentMode===10@*/')())){
	    		
	    		$(".section_select").css("left","39px");
	    	}
		});
	    function video(){
	    	srvLogWrite('A0', '05', '11', '00', '', '');
	    	var url = '/html/videoPopup/popup.html';
		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
		                  'status=no,location=no,menubar=no,width=821,height=461'; 
		   window.open(url, 'video', options);
	    }
		
		function Pop_close(){
			$("#Popup_main").hide();
		}
		function gridPop(){
			var url = '/view/board/gridWrite';
		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
		                  'status=no,location=no,menubar=no,top=200,left=200'; 
		   window.open(url, '', options);
		}
		function openEdu(){
			srvLogWrite('A0', '05', '09', '00', '메인화면 클릭', ''); //SGIS 공개강의실
			srvLogWrite('A0', '05', '09', '00', '통계지리정보소개', ''); //SGIS 공개강의실
			
			apiLogWrite2("U0", "U01", "메인페이지 화면", "SGIS+ 공개강의실", "00", "없음");
			apiLogWrite2("U0", "U02", "SGIS+ 공개강의실", "통계지리정보소개", "00", "없음");
						
		    var url = '/jsp/board/openEdu.jsp';
		    var options = 'toolbar=no,scrollbars=no,resizable=no,copyhistory=no,'+
			              'status=no,location=no,menubar=no,width=1140,height=586'; 
			window.open(url, 'openEdu', options);
		}
		
		function ucc(){
			var url = 'https://kosis.kr/contest';
			window.open(url);
		}
		
		function jipyo(){
			var url = 'http://www.kostat.go.kr/ssurvey/answer.do?sno=354';
			window.open(url);
		}

		function statsMe(){
			var url = 'https://sgis.kostat.go.kr/view/statsMe/statsMeMain';
			window.open(url);	
		} 
				
		$(document).ready(function(){		
			$(".select-box").on("click",function(){
				$(".navi-content").toggle();
				$(".map_stop").trigger("click");
			});
			
			/* mng_s 20210825  이금은    mainPopup_bannerC (start) */
			$("#mainPopup_bannerC_img").click(function(){
				var popupX = ( window.screen.width  / 2 ) - (  610 / 2 );
				var popupY = ( window.screen.height / 2 ) - ( 1000 / 2 );
				var url = '/html/survey/2021_3/survey.jsp';
				var options = 'toolbar=no,scrollbars=yes,resizable=no,copyhistory=no,'+
						  'status=no,location=no,menubar=no,width=720,height=1000,left='+popupX+',top='+popupY; 
				window.open(url, 'eventWin', options);			
			});
			/* mng_e 20210825  이금은    mainPopup_bannerC (end) */
			
		/* 20210423 side_banner (start) */
			//$("#side_banner1_img").click(function(){
			//	location.href = '/view/thematicMap/thematicMapMain?stat_thema_map_id=wPsSdFX8Wt20210520161423833UZjHClj5U3&theme=CTGR_005&mapType=05';
// 			if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad|)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
				/* var url = '/html/survey/2021_1/result/index.html';
				 var options = 'toolbar=no,scrollbars=yes,resizable=no,copyhistory=no,'+
						  'status=no,location=no,menubar=no,width=920,height=1000'; 
				window.open(url, 'openSurvey', options); */

// 			} else {
// 				var url =  '/jsp/event/2021_quiz1/quiz.jsp';
// 				window.open(url);
// 			}
			//});
		/* 20210423 side_banner (end) */
			
	<!-- 2022-11-29 [이준혁] 신규 서비스 오픈 알림 팝업 START -->
		//  시범서비스 레이어 팝업 이벤트 2022-11-29
		$('.popup_01 .popup_wrap #sbrBtn').on('click',function(){
				location.href=contextPath+"view/sbrStats/sbrStatsMain";
			})
			$('.popup_01 .popup_wrap #lbrBtn').on('click',function(){
				alert("지역변화 분석지도 시범서비스는 12월5일 개시합니다.");
				
			})
			$('.popup_01 .popup_wrap #surveyBtn').on('click',function(){
				alert("설문조사는 12월 5일부터 참여 가능합니다.");
				
			})
			
			$('.popup_01 .popup_wrap .layer_close').on('click',function(){
				$('.popup_layer type1').hide();
			})
		
			

		});
		<!-- 2022-11-29 [이준혁] 신규 서비스 오픈 알림 팝업 END -->
		$(document).ready(function(){			
			srvLogWrite('A0', '01', '01', '00', '', '');		//SGIS 포털 메인 뷰 서비스 로그
		});
		function srvLogWriteTwo(){
            var sido , sido_title , sgg , sgg_title;
            
            $(".navi-content .scrl-first li").each(function(index , elem){
                if($(elem).hasClass("li-on")){
                    sido = $(elem).data("sido");
                    sido_title = $(elem).data("sidotitle");
                }
            });
            $(".navi-content .scrl-second li").each(function(index , elem){
                if($(elem).hasClass("li-on")){
                    sgg = $(elem).data("sgg");
                    sgg_title = $(elem).data("sggtitle");
                }
            });
            $(".navi-content").hide();
            $(".section_select").text(sido_title + " " + sgg_title);
            
			srvLogWrite('A0', '03', '01', '03', sido_title+' '+sgg_title, '');
		}
		
    </script>



    <style>
    	.navi-content{
   		    background: #fff;
		    width: 246px;
		    position: absolute;
		    top: 89px;
		    left: 0;
		    border: 2px solid #1878CC;
		    z-index: 3000;
		    height: 168px;
		    max-height: 300px;
		    line-height: 22px;
		    display: none;
    	}
    	.addr_box{
    		display: inline-block;
		    text-align: left;
		    width: 49%;
		    height: 132px; 
		    max-height: 263px;
		    overflow:hidden;
		    overflow-y: auto;
    	}
    	.addr_box .li-on{
    		background: #1878CC;
    		color: #fff
    	}
    	.navi-action{
    		/**padding: 7px;**/
    	}
    	.topGraph .rollGraph .txtInfo strong{
    		font-family: 'Nanum Gothic'
    	}
    	
    	/* 더보기 회전 */
    	a.btn_more:hover {
    		-ms-transform:rotate(225deg);/* IE9 */
    		-webkit-transform:rotate(225deg);/* Chrome, Safari, Opera */
    		transform:rotate(225deg);
    	}
    	a.btn_more {
    		-ms-transition:-webkit-transfrom 1s;/* IE9 */
    		-webkit-transition:-webkit-transform 1s;/* Chrome, Safari, Opera */
    		transition:transform 1s;
    	}
    	.li-strong{
    		font-size: 13px;
    	}
    </style>
    <!-- 2020-02-17 [김남민] 신규 서비스 오픈 알림 팝업 START -->
    <!-- 2020-02-17 [김남민] 신규 서비스 오픈 알림 팝업 END -->
    
     <style>
	     /* mng_s 20210825 이금은 <메인화면의 Popup 배너 - poster>  */
	     #mainPopup_bannerC .top_close {position:absolute; margin-left: 0px; margin-top: 0px;}
	     #mainPopup_bannerC .top_close a { display:block; width:27px; height:26px; background:url(/images/statsMe/banner/pop_ad_close.png) no-repeat center right; background-color:#1878cc;}
	     #mainPopup_bannerC .top_close a:hover {  background-color:#535353; }
	     #mainPopup_bannerC .top_close a span { display:none; } 
	     	                
	     #mainPopup_bannerC .bottom_close { position:absolute; width:60px; z-index:101; }
	     #mainPopup_bannerC .bottom_close { display:block; width:43px; height:29px; background-color:#757575; border:1px solid #515151; color:#eee; font-size:13px;}
	     #mainPopup_bannerC .bottom_close:hover { background-color:#555; }
	     /* mng_e 20210825 이금은 <메인화면의 Popup 배너 - poster>  */
	     
	     /* mng_s 20211028 이금은 <메인화면의 Popup 배너 - 중앙>  */
	     #mainPopup_banner2 .top_close {position:absolute; margin-left: 0px; margin-top: 0px;}
	     #mainPopup_banner2 .top_close a { display:block; width:27px; height:26px; background:url(/images/statsMe/banner/pop_ad_close.png) no-repeat center right; background-color:#1878cc;}
	     #mainPopup_banner2 .top_close a:hover {  background-color:#535353; }
	     #mainPopup_banner2 .top_close a span { display:none; } 
	     	                
	     #mainPopup_banner2 .bottom_close { position:absolute; width:60px; z-index:101; }
	     #mainPopup_banner2 .bottom_close { display:block; width:43px; height:29px; background-color:#757575; border:1px solid #515151; color:#eee; font-size:13px;}
	     #mainPopup_banner2 .bottom_close:hover { background-color:#555; }
	     /* mng_e 20211028 이금은 <메인화면의 Popup 배너 - 중앙>  */
	     
	     /* mng_s 20210224 이금은 <메인화면의 Popup 배너 - slick>  */
	     #mainPopup_slick .top_close {position:absolute; margin-left: 0px; margin-top: 0px;}
	     #mainPopup_slick .top_close a { display:block; width:27px; height:26px; background:url(/images/statsMe/banner/pop_ad_close.png) no-repeat center right; background-color:#1878cc;}
	     #mainPopup_slick .top_close a:hover {  background-color:#535353; }
	     #mainPopup_slick .top_close a span { display:none; } 
	     #mainPopup_slick .bottom_close { position:absolute; width:60px; z-index:101; }
	     #mainPopup_slick .bottom_close { display:block; width:43px; height:29px; background-color:#757575; border:1px solid #515151; color:#eee; font-size:13px;}
	     #mainPopup_slick .bottom_close:hover { background-color:#555; }
	     #mainPopup_slick .slick-dots { bottom: 7px; width: 8%; left:46%; }
	     /* mng_e 20210224 이금은 <메인화면의 Popup 배너 - slick>  */
	     
		/* mng_s 20210423 이금은  side_banner (start) */
		
		/* mng_s 20210520 이진호  웹 표준 검사 오류 수정(아래 주석 걸린 소스가 원본 소스 입니다.)*/
		/* #side_banner1 { position : absolute; width:265px; height:262px; border:#BDBDBD solid 1px; center center; cursor:pointer;}  */
		/*#side_banner1 { position : absolute; width:266px; height:266px; border:#BDBDBD solid 1px; cursor:pointer;}*/
		/* mng_e 20210520 이진호*/
		
		/*#side_banner1 .pa_go a { display:block; width:200px; height:57px; margin-top: 43%; margin-left: 9%;}
		#side_banner1 .pa_bottom_close label {color:#fff; font-size:12px;}
		#side_banner1 .pa_bottom_close { position:absolute; width:190px; z-index:101; }
		#side_banner1 .pa_bottom_close input[type="checkbox"] {display:none;}
		#side_banner1 .pa_bottom_close label {color:#fff; font-size:12px;}
		#side_banner1 .pa_bottom_close input[type="checkbox"] + label span { display:inline-block; width:15px; height:15px; margin:-2px 10px 0 0; vertical-align:middle; background:url(/images/statsMe/banner/check_radio_sheet.png) left top no-repeat; cursor:pointer;}
		#side_banner1 .pa_bottom_close input[type="checkbox"]:checked + label span { background:url(/images/statsMe/banner/check_radio_sheet2.png) left top no-repeat;}
		#side_banner1 .pa_bottom_close .pa_top_close { display:block; padding:5px 8px 2px 8px; background-color:#757575; border:1px solid #515151; color:#eee; font-size:12px; font-family:'돋움'; }
		#side_banner1 .pa_bottom_close .pa_top_close:hover { background-color:#555; }
		#side_banner1 .pa_top_close a { display:block; width:27px; height:26px; background:url(/images/statsMe/banner/pop_ad_close.png) no-repeat center center; background-color:#1878cc;}
		#side_banner1 .pa_top_close a:hover {  background-color:#535353; }
		#side_banner1 .pa_top_close a span { display:none; }*/
		/* mng_e 20210423 이금은  side_banner (end) */
		
     </style>
     
</head> 

<body class="main">

		 
	<!-- mng_s 20210224 이금은  (메인화면의 Popup 배너 - slick) -->
<!--             <div id="mainPopup_slick" style="position:absolute;width:1080px; height:278px; top:102px; z-index:111; display:none;">             -->
<!--                 <div class="top_close" style="margin-left: 97.5%; z-index:112;"><a href="javascript:void(0);"><span></span></a></div> -->
<!--             	<div id="mainPopup_slick_slick" style="position:relative; width:100%; height:100%;"> -->
<!-- 	                <div><a href="/view/catchmentArea/main#" ><img src="/img/main/B20210226_1.png" alt="생활권역 통계지도"></a></div> -->
<!-- 	                <div><a href="/view/totSurv/totSurvMain" ><img src="/img/main/B20210226_2.png" alt="총조사 시각화 지도"></a></div> -->
<!-- 				</div>  -->
<!--                 <div style="position:absolute; top:246px; left:860px; z-index:113;"> -->
<!--                     <label for="mainPopup_slick_chk" style="color: #FFFFFF; margin-left: 2px;"> -->
<!--                         <input type="checkbox" id="mainPopup_slick_chk"/> 오늘 하루 창 열지 않기 -->
<!--                     </label> -->
<!--                 </div> -->
<!--                 <button class="bottom_close" style="right: 0px; top: 240px; left: 1027px;">닫기</button>				       -->
<!--             </div> -->
	<!-- mng_e 20210224 이금은  (메인화면의 Popup 배너 - slick) -->

	<script>
	$(document).ready(function(){
		/* mng_s 이금은 20210423추가    side_banner (start) */
		/*if(getCookie("side_banner1_chk") == "checked") {
			$("#side_banner1").hide();
		}else {
			$("#side_banner1").show();
		}*/
		
		/*function mystatslo_quizEvent_close() {
			if($("#side_banner1_chk").prop("checked")) {
				setCookie("side_banner1_chk", "checked" , 1);
			}
			else {
				setCookie("side_banner1_chk", "checked" , 0);
			}
			$("#side_banner1").hide();
		}
		$("#side_banner1 .pa_top_close").click(function() {
			console.log('=================== close');
			mystatslo_quizEvent_close();
		});*/
		/*  mng_e 이금은 20210423추가   side_banner (end) */
		
		// mng_s 이금은 2020.07.14 추가
		if(getCookie("didVisit") != "Y") {
			$("#popup01").show();
		} else { 
			$("#popup01").hide();
		}
		$(".btnStyle01").click(function() { // '예, 아니오' 선택시에만 쿠키 생성 2020.08.12
			setCookie("didVisit", "Y" , 30); //30일간 쿠키 유지
		});		
      
		if(document.location.pathname == "/view/index"){  //메인페이지 알림창일 경우, 배경을 투명하게
			$(".popupWrapper").css("background"," rgba(0,0,0,0.2)");
		}
		// mng_e 이금은 2020.07.14
		
	    // mng_s 20210825 이금은 <메인화면의 Popup 배너 - poster>	//20211013 게시종료  
//         if(getCookie("mainPopup_bannerC_chk") == "checked") {
//             $("#mainPopup_bannerC").hide(); 
//         } else {
//             $("#mainPopup_bannerC").show();    
// 			$("#mainPopup_bannerC").css("left", (window.innerWidth - $("#mainPopup_bannerC").width()) / 2 - 8 + 406); //사이드
//     		//$("#mainPopup_bannerC").css("left", (window.innerWidth - $("#mainPopup_bannerC").width()) / 2 - 8);
//         } 
        function mainPopup_bannerC_close() { 
            if($("#mainPopup_bannerC_chk").prop("checked")) {
                setCookie("mainPopup_bannerC_chk", "checked", 1);
            }
            else {
                setCookie("mainPopup_bannerC_chk", "", 0);
            }
            $("#mainPopup_bannerC").hide();
        }
	    $("#mainPopup_bannerC .top_close").click(function() {
            mainPopup_bannerC_close();
	    });
	    $("#mainPopup_bannerC .bottom_close").click(function() {
            mainPopup_bannerC_close();
	    });
		$(window).resize(function(){
			//mainPopup poster 위치 조정
			$("#mainPopup_bannerC").css("top", 391);
			$("#mainPopup_bannerC").css("left", (window.innerWidth - $("#mainPopup_bannerC").width()) / 2 - 8 + 406); //사이드
		});
		// mng_e 20210825 이금은 <메인화면의 Popup 배너 - poster>
		
	    // mng_s 20211028 이금은 <메인화면의 Popup 배너 - 중앙>	 
		var banner2_showYN = "N";
        if(banner2_showYN == "N" || getCookie("mainPopup_banner2_chk") == "checked") {
            $("#mainPopup_banner2").hide(); 
        } else { 
            $("#mainPopup_banner2").show();    
			var img_left = (window.innerWidth - $("#mainPopup_banner2").width()) / 2 - 18;  //중앙
 			$("#mainPopup_banner2").css("left", (img_left < 267 ? 267 : img_left)); 
        } 
        function mainPopup_banner2_close() { 
            if($("#mainPopup_banner2_chk").prop("checked")) { 
                setCookie("mainPopup_banner2_chk", "checked", 1);
            }
            else {
                setCookie("mainPopup_banner2_chk", "", 0); 
            }
            $("#mainPopup_banner2").hide();
        }
	    $("#mainPopup_banner2 .top_close").click(function() {
            mainPopup_banner2_close();
	    });
	    $("#mainPopup_banner2 .bottom_close").click(function() {
            mainPopup_banner2_close();  
	    });
		$(window).resize(function(){
			var img_left = (window.innerWidth - $("#mainPopup_banner2").width()) / 2 - 18;  //중앙
			$("#mainPopup_banner2").css("top", 110);
 			$("#mainPopup_banner2").css("left", (img_left < 267 ? 267 : img_left)); 
		});
		// mng_e 20211028 이금은 <메인화면의 Popup 배너 - 중앙>	  
		
	    // mng_s 20210224 이금은 <메인화면의 Popup 배너 - slick>
	    var slick_yn = "N"; //게시여부
        if(slick_yn == "N" || getCookie("mainPopup_slick_chk") == "checked") {
            $("#mainPopup_slick").hide(); 
        } else {
            $("#mainPopup_slick").show();        
    		$("#mainPopup_slick").css("left", (window.innerWidth - $("#mainPopup_slick").width()) / 2 - 8);
    		 
        } 
        function mainPopup_slick_close() { 
            if($("#mainPopup_slick_chk").prop("checked")) {
                setCookie("mainPopup_slick_chk", "checked", 1);
            }
            else {
                setCookie("mainPopup_slick_chk", "", 0);
            }
            $("#mainPopup_slick").hide();
        }
        
	    $("#mainPopup_slick .top_close").click(function() {
            mainPopup_slick_close();
	    });

	    $("#mainPopup_slick .bottom_close").click(function() {
            mainPopup_slick_close();
	    });
	    	    
	    $(function(){
	    	$("#mainPopup_slick_slick").slick({
	    		slide : 'div',
			    infinite : true,
			    slidesToShow : 1,
			    slidesToScroll : 1,
			    speed : 3000,
			    arrows : false,
			    dots : true,
			    autoplay : true,
			    autoplaySpeed : 3000,
			    pauseOnHover : true, 
			    vertical : false,
			    prevArrow : "<button type='button' class='slick-prev'>Previous</button>",
			    nextArrow : "<button type='button' class='slick-next'>Next</button>",
			    dotsClass : "ad_banner slick-dots",
			    draggable : true
		    })
		});
		$(window).resize(function(){
			//mainPopup 위치 조정
			$("#mainPopup_slick").css("left", (window.innerWidth - $("#mainPopup_slick").width()) / 2 - 8);
		});
		// mng_e 20210224 이금은 <메인화면의 Popup 배너 - slick>
		
		
		
		function getCookie(name){
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0; while(i< clen)
			{
				var j = i + alen;
			    if(document.cookie.substring(i,j)==arg) {
			    	var end = document.cookie.indexOf(";",j);
			    	if(end == -1) end = document.cookie.length;
			    	return unescape(document.cookie.substring(j,end));
			    }
			    i=document.cookie.indexOf(" ",i)+1;
			    if (i==0) break;
			}
			return null;
		}
		
		function setCookie(name, value, expiredays) {					
			var todayDate = new Date();   
			todayDate.setDate(todayDate.getDate() + expiredays);   
			document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";" ;
		}
	});
	</script>
	
	 <!-- 스킵네비게이션 -->
    <div class="accNav">
        <p><a href="#gnb">주메뉴 바로가기</a></p>
        <p><a href="#container">본문 바로가기</a></p>
    </div>
    <!-- 스킵네비게이션 -->
    <!--wrap-->
    <div id="wrap">
        <!--header-->
        <header>
        	<jsp:include page="/view/common/includeSearch"></jsp:include>
        </header>
        <!--//header-->
        <hr class="hidden" />
        <!--contents-->
        <div id="container">
            <h2 class="hidden">본문시작</h2>
            <!--topCont-->
            <div class="topCont">
                <!--topGraph-->
                <div class="topGraph">
                    <!--inner-->
                    <div class="inner">
                        <!--rollGraphBox-->
                        <div class="rollGraphArea">
                            <h3>주요통계(’20)</h3>
                            <h2>출처
                            <a href="javascript:void(0)" class="ar" data-subj="" title="[출처: 통계청] 2020 인구주택총조사 / 통계청 2019 전국사업체조사"><img src="/img/ico/ico_i.gif" alt="주제도 설명"></a></h2>
							<!--rollGraph-->
							<div class="rollGraph">
								<div class="cont clearFix">
									<div class="txtInfo">
										<p class="mapArea-select">
											<button class="btn_prev"><span class="hidden">이전</span></button>
											<span class="select-box" >
												<span id="section_select" class="section_select">
													데이터 조회중 ...
												</span>
											</span>
											<button type="button" class="btn_next"><span class="hidden">다음</span></button>
										</p>
										<div class="navi-content">
											<div class='scrl-first addr_box' id="sido">
												<ul>
												</ul>
											</div>
											<div class='scrl-second addr_box' id="sgg">
												<ul>
												</ul>
											</div>
											<div class='navi-action'>
												<a href="javascript:srvLogWriteTwo();" class="navi-confirm"><img id='navi-confirm' src='/img/popup/btn_confirm.png' alt='확인' /></a>
                                                <a href="javascript:void(0)" class="navi-cancel"><img id='navi-cancel' src='/img/popup/btn_close.png' alt='닫기' /></a>
											</div>
										</div>
										<div class="graph">
											<div class="data_box"><strong>인구</strong><br/><span class="value value1">0</span>명</div>
											<div class="data_box"><strong>남자</strong><br/><span class="value value2">0</span>명</div>
											<div class="data_box"><strong>여자</strong><br/><span class="value value3">0</span>명</div>
											<div class="data_box"><strong>주택</strong><br/><span class="value value4">0</span>호</div>
											<div class="data_box"><strong>사업체</strong><br/><span class="value value5">0</span>개</div>
											<div class="data_box"><strong>종사자</strong><br/><span class="value value6">0</span>명</div>
										</div>
									</div>
									<div>
										<!--mapArea-->
										<script>
										// djlee 2019-07-15  수정  시작
										function setSgg(code){
											$(".navi-content .scrl-second li").each(function(index , elem){
												if($(elem).data("sgg") == code.substring(2,5)){
													$(elem).addClass("li-on");
												}else{
													$(elem).removeClass("li-on");
												}
											});
											$(".navi-confirm").trigger("click");
										}
										// 2019-04-04 이동진 추가
										function setSido(code){
											$(".navi-content .scrl-first li").each(function(index , elem){
												if($(elem).data("sido") == code){
													$(elem).addClass("li-on");
													$(elem).click();
												}else{
													$(elem).removeClass("li-on");
												}
											});
											setTimeout(function(){
											$(".navi-confirm").trigger("click");
												
											}, 400);
										}
										// 2019-04-04 이동진 추가
										
										// 시간순으로 3초마다 다음 버튼 클릭 이벤트
										function nextSgg(){
											$(".navi-content .scrl-second li").each(function(index , elem){
												if($(elem).hasClass("li-on")){
													if($(".navi-content .scrl-second li").length -1 > $(this).index()){
														$(this).next().trigger("click");
														setTimeout(function(){
															$(".navi-confirm").trigger("click");
														} , 1000);
														return false;
													} 
													
													if($(".navi-content .scrl-second li").length -1 == $(this).index()){
														$(".navi-content .scrl-first li").each(function(_index , elem){
															if($(elem).hasClass("li-on")){
																if($(".navi-content .scrl-first li").length -1 == _index){
																	$(".navi-content .scrl-first li").eq(0).trigger("click");
																	setTimeout(function(){
																		$(".navi-confirm").trigger("click");
																	} , 1000);
																}else{
																	$(elem).next().trigger("click");
																	setTimeout(function(){
																		$(".navi-confirm").trigger("click");
																	} , 1000);
																}
																
																return false;
															}
														});
													}
												}
											});
										}
										
										var insideOpen;
										var playInterval;
											$(document).ready(function(){
												$("body").on("click",".map_play , .map_stop", function(){
													if($(this).hasClass("map_play")){
														var src = $(this).attr("src");
														if(src.indexOf("off") > -1){
															$(this).attr("src" , src.replace("off" , "on"));
															$(".map_stop").attr("src" , "${pageContext.request.contextPath}/images/main/ico_stop_off.png");
															playInterval = setInterval(function(){
																nextSgg();
															} ,3000);
														}
													}else{
														var src = $(this).attr("src");
														if(src.indexOf("off") > -1){
															$(this).attr("src" , src.replace("off" , "on"));
															$(".map_play").attr("src" , "${pageContext.request.contextPath}/images/main/ico_start_off.png");
															clearInterval(playInterval);
														}
													}
												});
												// 2019-04-04 이동진 수정 시작 
												var mapOverView = function(){
													$(".allMap-point area").on({ //전국지도 영역 이벤트
														// 실제 지도 클릭 이벤트 
														// 하지만 3초마다 돌거나 지역 선택 해도 trigger 이벤트를 통해 들어옴
														"click":function(e){ // 전국지도 클릭하면 [광역시/도] 이미지 변경
															e.preventDefault();
															if(e.originalEvent){
																$(".map_stop").trigger("click");
	                                                            srvLogWrite('A0', '03', '01', '04', $(this).attr("alt"), '');
																var code = $(this).data("code") + "";
																$(".navi-content .scrl-first li").each(function(index , elem){
																	var sido = $(elem).data("sido");
																	if(sido == code){
// 																		setTimeout(function(){
																			setSido(code);
// 																		},500);
																	}
																});
															}
															var areaName = $(this).data("area-name");
															$(".allMap-view img").attr("src","../images/map/"+areaName+".png");
															
															//mng_s 20210615 이진호, alt 추가
															$(".allMap-view img").attr("alt", areaName);
															//mng_e 20210615 이진호
															
															if(insideOpen){
																clearTimeout(insideOpen);
															}
															
															if(insideClose){
																clearTimeout(insideClose);
															}
															var locationName = $(this).data("detail");
															
															var t = $("."+locationName);
															if(t.css("display") == 'none'){
																var code 	= t.data("parent-code");
																var src 	= t.data("image");
																var usemap 	= t.data("usemap");
																if(t.find(".mapDetail-view").find("img").length == 0){
																	
																	//mng_s 20210615 이진호, alt 추가
																	var img = $("<img>").data("code" , code).attr("src" , "/images/map/"+src).attr("usemap" , usemap).attr("alt", locationName);
																	//mng_e 20210615 이진호
																	
																	img.load(function(){
																		$(".mapDetail").hide();
																		t.show();
																	});
																	t.find(".mapDetail-view").append(img);
																}else{
																	$(".mapDetail").hide();
																	t.show();
																}
															}
															
															var $this = $(this);
															insideClose = setTimeout(function(){
// // 																$(".mapInside").hide(); 
															},200);
														}
													});
													// 2019-04-04 이동진 수정 끝	
													
													$(".mapDetail-point area").on({ // [광역시/도] 영역 이벤트
														"mouseenter":function(){ // [광역시/도] 오버하면 .3초후 이미지변경
															
															var insideName = $(this).data("inside-name");
															if($(this).is("[data-inside-name]")){ // 값이 있으면 [구] 지도 보여짐
																insideOpen = setTimeout(function(){
																	var t = $("."+insideName);
																	if(t.css("display") == 'none'){
																		var code 	= t.data("code");
																		var src 	= t.data("src");
																		var usemap 	= t.data("usemap");
																		if(t.find(".inside-view").find("img").length == 0){
																			
																			//mng_s 20210615 이진호, alt 추가
																			var img = $("<img>").data("code" , code).attr("src" , src).attr("usemap" , usemap).attr("alt", insideName);
																			//mng_e 20210615 이진호
																			
																			img.load(function(){
																				$(".mapInside").hide();
																				t.show();
																			});
																			t.find(".inside-view").append(img);
																		}else{
																			$(".mapInside").hide();
																			t.show();
																		}
																	}
																},300);
															}else{ // [data-inside-name] 값이 없으면 [광역시/도] 영역 이미지 변경
																var areaName = $(this).data("area-num");
															
																//mng_s 20210615 이진호, alt 추가
																$(this).closest(".mapDetail").find(".mapDetail-view img").attr("src","../images/map/"+areaName+".png").attr("alt", areaName);
																//mng_e 20210615 이진호
															}
 															sggMapName = $(this).attr("alt");//마우스오버된 시군구 명칭
														},
														"mouseleave":function(){ // .3초 이벤트 삭제
															clearTimeout(insideOpen);
														} ,
														"click":function(e){

															$(".map_stop").trigger("click");
															var code = $(this).data("code") + "";

															if(code.length == 5){
																$(".navi-content .scrl-first li").each(function(index , elem){
																	var sido = $(elem).data("sido");
																	if(sido == code.substring(0,2)){
																		//$(elem).trigger("click"); //2019-04-04 이동진 수정
																		setTimeout(function(){
																			setSgg(code);
																		},500);
																	}
																});
																
															}else{
																console.log("코드 이상");
															}
															
												            var sido_title = '';
												            $(".navi-content .scrl-first li").each(function(index , elem){
												                if($(elem).hasClass("li-on")){
												                    sido_title = $(elem).data("sidotitle");
												                }
												            });              
                                                            srvLogWrite('A0', '03', '01', '05', sido_title+' '+$(this).attr("alt"), '');
                                                            
														}
													});

													// 세부 이미지에서 마우스 오버시 이미지 교체 처리
													$(".mapInside-point area").on({ // [구] 영역 이벤트
														"mouseenter":function(){ // [구] 오버하면 이미지변경
															var areaName = $(this).data("area-num");
															
															//mng_s 20210615 이진호
															$(this).closest(".mapInside").find(".inside-view img").attr("src","../images/map/"+areaName+".png").attr("alt", areaName);
															//mng_e 20210615 이진호
															
														},
														"click":function(e){
															$(".map_stop").trigger("click");
															var code = $(this).data("code") + "";
															if(code.length == 5){
																$(".navi-content .scrl-first li").each(function(index , elem){
																	var sido = $(elem).data("sido");
																	if(sido == code.substring(0,2)){
																		$(elem).trigger("click");
																		setTimeout(function(){
																			setSgg(code);
																		},500);
																	}
																});
																
															}else{
																console.log("코드 이상");
															}
															
                                                            var sido_title = '', sgg_title = '', gu_title = '';
                                                            $(".navi-content .scrl-first li").each(function(index , elem){
                                                                if($(elem).hasClass("li-on")){
                                                                    sido_title = $(elem).data("sidotitle");
                                                                }
                                                            });
                                                            gu_title = $(this).attr("alt");
                                                            srvLogWrite('A0', '03', '01', '05', sido_title+' '+sggMapName+' '+gu_title, '');
                                                            															
														}
													});

															
													var insideClose;
													$(".mapInside map").on({
														"mouseleave":function(){ //[구] 영역 마우스빠져나오면 .2초후에 닫힘
															var $this = $(this);
															insideClose = setTimeout(function(){
																$this.closest(".mapInside").hide();
															},200);
														},
														"mouseenter":function(){ //[구] 영역 안쪽이라면 setimtout 삭제
															clearTimeout(insideClose);
														}
													});
													$(".map_play").trigger("click");
												}();
												
												$("body").on("keypress", function() {
													if(window.event.keyCode == 13) {
														var playSrc = $('.map_play').attr("src");
														var stopSrc = $('.map_stop').attr("src");
														if(playSrc.indexOf('_on') > -1) $(".map_stop").trigger("click");
														else if(stopSrc.indexOf('_on') > -1) $(".map_play").trigger("click");
													}
												});
											});
											// djlee 2019-07-15  수정 끝 
										</script>
										<div class="mapArea">
											<!-- //전체 지도 -->
											<jsp:include page="/jsp/main/map.jsp"></jsp:include>
											<div class="play_box">
												<img src="<c:url value="/images/main/ico_start_off.png" />" alt="재생" class="map_play" />
												<img src="<c:url value="/images/main/ico_stop_off.png" />" alt="정지" class="map_stop"/>
											</div>
											<!-- //경기도  -->
											<jsp:include page="/jsp/main/kk.jsp"></jsp:include>
											<!-- //인천  -->
											<jsp:include page="/jsp/main/ic.jsp"></jsp:include>
											<!-- //강원  -->
											<jsp:include page="/jsp/main/kw.jsp"></jsp:include>
											<!-- //충청남도  -->
											<jsp:include page="/jsp/main/chn.jsp"></jsp:include>
											<!-- //세종  -->
											<jsp:include page="/jsp/main/sj.jsp"></jsp:include>
											<!-- //대전  -->
											<jsp:include page="/jsp/main/dj.jsp"></jsp:include>
											<!-- //충청북도  -->
											<jsp:include page="/jsp/main/chb.jsp"></jsp:include>
											<!-- //경상북도  -->
											<jsp:include page="/jsp/main/gsb.jsp"></jsp:include>
											<!-- //경상남도  -->
											<jsp:include page="/jsp/main/gsn.jsp"></jsp:include>
											<!-- //전라북도  -->
											<jsp:include page="/jsp/main/jlb.jsp"></jsp:include>
											<!-- //대구  -->
											<jsp:include page="/jsp/main/dg.jsp"></jsp:include>
											<!-- //전라남도  -->
											<jsp:include page="/jsp/main/jln.jsp"></jsp:include>
											<!-- //광주  -->
											<jsp:include page="/jsp/main/kj.jsp"></jsp:include>
											<!-- //부산  -->
											<jsp:include page="/jsp/main/bs.jsp"></jsp:include>
											<!-- //울산  -->
											<jsp:include page="/jsp/main/us.jsp"></jsp:include>
											<!-- //제주 -->
											<jsp:include page="/jsp/main/jeju.jsp"></jsp:include>
											<!-- //제주 -->
											<jsp:include page="/jsp/main/ss.jsp"></jsp:include>
											
											<!--mapDetail (광역시/도) / 강원도-->
<!-- 											<div class="mapDetail" > -->
<!-- 												<span class="mapDetail-view">강원도</span> -->
<!-- 												강원도 -->
<!-- 											</div> -->
										</div>
										<!--//mapArea-->
									</div>
								</div>
							</div>
                        </div>
                        <!--//rollGraphBox-->
                        <!--ad_banner-->
                        <div class="ad_banner">
						<button class="bannerPlayer on" style="background-image:url('/img/ico/play.png'); background-repeat:no-repeat; width:20px; height:20px; position:absolute; z-index:1; bottom:10px; right:10px; cursor:pointer;"></button>
							<ul class="sbList">
							</ul>
                        </div>
                        <!--//ad_banner-->
                    </div>
                    <!--//inner-->
                </div>
                <!--//topGraph-->

            </div>
            <!--//topCont-->
            <!--inner-->
            <div class="inner clearFix">
                <!--boxCont-->
                <div class="boxCont">
                    <!--row-->
                    <div class="row type01">
                        <div class="rowTit"><strong><a href="javascript:logWriteAndMove('A0', '04', '01', '01', '', '', '/view/thematicMap/categoryList', false);">통계주제도</a></strong></div>
                        <!--tabArea-->
                        <div class="tabArea">
                            <!--mainTab-->
                            <div class="mainTab">
                                <ul class="clearFix"></ul>
                            </div>
                            <!--//mainTab-->
                            <!--mainTabCont-->
                            <div class="mainTabCont clearFix"></div>
                            <!--//mainTabCont-->
                        </div>
                        <!--//tabArea-->
                    </div>
                    <!--//row-->
                    <!--row-->
                    <div class="row type02">
                        <div class="rowTit"><strong><a href="javascript:logWriteAndMove('A0', '04', '02', '01', '', '', '/view/map/interactiveMapMain', false);">대화형<br />통계지도</a></strong></div>
                        <div class="menustats">
                            <div class="menuRoll">
                                <ul class="clearFix">
                                    <li class="menu_01"><a href="javascript:logWriteAndMove('A0', '04', '02', '04', '', '', '/view/map/interactiveMap/mainIndexView', false);"><span>총조사<br />주요지표</span></a></li>
                                    <li class="menu_02"><a href="javascript:logWriteAndMove('A0', '04', '02', '05', '', '', '/view/map/interactiveMap/populationHouseView', false);"><span>인구주택<br />총조사</span></a></li>
                                    <li class="menu_03"><a href="javascript:logWriteAndMove('A0', '04', '02', '06', '', '', '/view/map/interactiveMap/3fView', false);"><span>농림어업<br />총조사</span></a></li>
                                    <li class="menu_04"><a href="javascript:logWriteAndMove('A0', '04', '02', '07', '', '', '/view/map/interactiveMap/companyView', false);"><span>전국사업체<br />조사</span></a></li>
                                    <li class="menu_05"><a href="javascript:logWriteAndMove('A0', '04', '02', '08', '', '', '/view/map/interactiveMap/ecountryView', false);"><span>e-지방지표</span></a></li>
                                    <li class="menu_06"><a href="javascript:logWriteAndMove('A0', '04', '02', '09', '', '', '/view/map/interactiveMap/publicDataView', false);"><span>공공<br />데이터</span></a></li>
                                    <li class="menu_07"><a href="javascript:logWriteAndMove('A0', '04', '02', '10', '', '', '/view/map/interactiveMap/userDataView', false);"><span>나의<br />데이터</span></a></li>
                                </ul>
                            </div>
                            <div>
                                <button class="btn_prev" id="interactivePrevBtn"><span class="hidden">이전</span></button>
                                <button class="btn_next" id="interactiveNextBtn"><span class="hidden">다음</span></button>
                            </div>
                        </div>
                    </div>
                    <!--//row-->
                    <!--row-->
                    <div class="row type03">
                        <div class="rowTit"><strong><a href="javascript:logWriteAndMove('A0', '04', '03', '01', '', '', '/view/common/analMapMain', false);">분석지도</a></strong></div>
                        <div class="menuMap">
                            <div class="menuRoll">
                                <ul class="clearFix">
                                <li class="menu_06"><a href="javascript:logWriteAndMove('A0', '04', '03', '07', '', '', '/view/totSurv/totSurvMain', false);"><span>총조사<br />시각화지도</span></a></li>
                                <li class="menu_01"><a href="javascript:logWriteAndMove('A0', '04', '03', '02', '', '', '/funny_month/month/sta_month_main.do', false);"><span>월간통계</span></a></li>
                                <li class="menu_02"><a href="javascript:logWriteAndMove('A0', '04', '03', '03', '', '', '/jsp/pyramid/pyramid1.jsp', false);"><span>인구<br />피라미드</span></a></li>
                                <li class="menu_03"><a href="javascript:logWriteAndMove('A0', '04', '03', '04', '', '', '/publicsmodel/', false);"><span>고령화<br />현황보기</span></a></li>
                                <li class="menu_04"><a href="javascript:logWriteAndMove('A0', '04', '03', '05', '', '', '/statbd/family_01.vw', false);"><span>성씨분포</span></a></li>
                                <li class="menu_05"><a href="javascript:logWriteAndMove('A0', '04', '03', '06', '', '', '/statbd/future_01.vw', false);"><span>지방의<br />변화보기</span></a></li>
                                </ul>
                            </div>
                            <div>
                                <button class="btn_prev" id="analMapPrevBtn"><span class="hidden">이전</span></button>
                                <button class="btn_next" id="analMapNextBtn"><span class="hidden">다음</span></button>
                            </div>
                        </div>
                    </div>
                    <!--//row-->
                </div>
                <!--//boxCont-->
                <!--serviceArea-->
                <div class="serviceArea">
                    <div class="serviceBox">
<!-- 				    	20210423 side-banner (start) -->
<!-- 						<div id="side_banner1" class="" style="z-index: 10; left:50%; transform:translateX(-50%);display:none;"> 
<!-- 									<div class="pa_top_close" style="margin-left: 90%; margin-top: 0px; position:absolute;"><a href="javascript:void(0);"><span></span></a></div> -->
<!-- 									<img id="side_banner1_img" src="/s-portalcnm/upload/temp/banner_0719_2.png" alt="side_banner1_img"> -->
<!-- 									<div style="margin-top:0px;width:100%;height:30px;background:black;"> -->
<!-- 										<input type="checkbox" id="side_banner1_chk" style="margin: 9px;"/> -->
<!-- 										<label for="side_banner1_chk" style="color: #FFFFFF;"><span>오늘 하루 창 열지 않기</span></label> -->
<!-- 									</div> -->
<!-- 									<div class="pa_bottom_close" style="margin-left: 80%; margin-top: -26px;"> -->
<!-- 										<button class="pa_top_close" >닫기</button> -->
<!-- 									</div> -->
<!-- 						</div> -->
<!-- 				    	20210423 side-banner (end) -->
					
                        <div class="serviceTit">
                            <strong><a href="javascript:logWriteAndMove('A0', '04', '04', '01', '', '', '/view/common/serviceMain', false);">활용서비스</a></strong>
                            <div class="btnService">
                                <button type="button" class="btn_prev" id="servicePrevBtn"><span class="hidden">이전</span></button>
                                <button type="button" class="btn_next" id="serviceNextBtn"><span class="hidden">다음</span></button>
                            </div>
                        </div>
					<div class="serviceCont">
						<ul class="clearFix">
                                <li class="menu_07"><a href="javascript:logWriteAndMove('A0', '04', '04', '10', '', '', '/view/catchmentArea/main#', false);">생활권역<br>통계지도</a></li>
								<li class="menu_01"><a href="javascript:logWriteAndMove('A0', '04', '04', '04', '', '', '/view/workRoad/main', false);">일자리 <br>맵</a></li>
								<li class="menu_02"><a href="javascript:logWriteAndMove('A0', '04', '04', '05', '', '', '/view/map/policyStaticMap', false);">정책 <br>통계지도</a></li>
								<li class="menu_05"><a href="javascript:logWriteAndMove('A0', '04', '04', '06', '', '', '/view/community/intro', false);">지역현안 <br>소통지도</a></li>
								<li class="menu_06"><a href="javascript:logWriteAndMove('A0', '04', '04', '07', '', '', '/view/gallery/resultGallery', false);">통계<br>갤러리</a></li>
								<li class="menu_03"><a href="javascript:logWriteAndMove('A0', '04', '04', '08', '', '', '/view/house/houseAnalysisMap', false);">살고싶은 <br>우리동네</a></li>
								<li class="menu_04"><a href="javascript:logWriteAndMove('A0', '04', '04', '09', '', '', '/view/bizStats/bizStatsMap?biz=0', false);">업종<br>통계지도</a></li>
							</ul>
						</div>
                      	<!-- <div class="pagination">
                            <a href="/" class="active"><span class="hidden">1</span></a><a href="/"><span class="hidden">2</span></a>
                        </div> -->
                    </div>
                    
                    <!-- mng_s 20211022 이진호 폰트크기 조정 및 paddin 추가  -->
                    <!-- mng_s 20211021 이진호 style="font-weight: normal; 추가  -->
                    <div class="boardLink"><a href="javascript:logWriteAndMove('A0', '04', '05', '00', '', '', '/statexp/view/index', false);"><strong style="font-weight: normal; font-size: 14px; padding-left: 8px;">통계지도체험
                    
                    </strong></a></div>
                    <div class="boardLink"><a href="javascript:logWriteAndMove('A0', '04', '06', '00', '', '', '/contents/shortcut/shortcut_05_02.jsp', false);"><strong style="font-weight: normal; font-size: 14px; padding-left: 5px;">자료신청</strong></a></div>
                    <!-- mng_e 20211021 이진호 -->
                    <!-- mng_e 20211022 이진호 -->
                </div>
                <!--//serviceArea-->
            </div>
            <!--//inner-->
            <!--listArea-->
            <div class="listArea clearFix">
                <!--inner-->
                <div class="inner">
                    <ul class="clearFix">
                        <li id="board001"></li>
                        <li id="board003"></li>
                        <li id="board002"></li>
                        <li id="board000"></li>
                        <li id="shareTable"></li>
                        <li>
                            <ul class="sgs clearFix">
                                <li><a href="javascript:logWriteAndMove('A0', '05', '06', '00', '', '', '/edu/jsp/main.jsp', true);">SGIS에듀</a></li>
                                <li><a href="javascript:logWriteAndMove('A0', '05', '07', '00', '', '', '/developer/html/home.html', true);">개발지원센터</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--//inner-->
            </div>
            <!--//listArea-->
        </div>
        <!--//contents-->
        <hr class="hidden" />
        <!--footer-->
        <footer id="footer" class="main">
	    	<!-- Bottom Include -->
	    	<div>
		         <div class="inner">
		             <h2><a href="javascript:logWriteAndMove('A0', '05', '08', '00', '', '', '/view/board/sopIntro01', false);"><img src="/publish_2018/include/images/common/img_logoFooter.png" alt="SGIS 소개"></a></h2>
		             <ul class="otherLink">
		                 <li class="menu_01"><a href="javascript:openEdu();">SGIS* 공개강의실</a></li>
		                 <li class="menu_02"><a href="javascript:logWriteAndMove('A0', '05', '10', '00', '', '', '/view/board/mediaIntro', false);">언론소개자료</a></li>
		                 <li class="menu_03"><a href="javascript:video();">SGIS* 홍보동영상</a></li>
		                 <li class="menu_04"><a href="javascript:logWriteAndMove('A0', '05', '12', '00', '', '', '/view/newhelp/us_help_10_0.jsp', false);">서비스사용법</a></li>
		             </ul>
		         </div>
		    </div>
			<jsp:include page="/view/common/includeBottom"></jsp:include>
	    </footer>
    </div>
    
    <!-- mng_s 20200716 이금은. 최초 접속시 알림창 띄우기 -->
    <script>
		function closePopup01(){
			$("#popup01").hide();
		}
    </script>
    <div class="popupWrapper mConfrim" id="popup01" style="height: 1559px; background: rgba(0, 0, 0, 0.2); display:none;">
        <div class="alertPopupWrapper" style="margin-top: 306px;">
            <div class="topbar"><span>알림</span><a onClick="javascript:closePopup01();">닫기</a></div>
            <div style="width:100%;height:auto;overflow:hidden;padding: 0px 0px 20px;">
                <div class="messageBox">SGIS 처음 사용자를 위해 통계지표 간편조회 서비스인<br>'My통계로'가 준비되어 있습니다. 실행하시겠습니까?</div>
                <div class="btnBox">
                    <a href="/view/statsMe/statsMeMain" class="btnStyle01">예</a>
                    <a href="javascript:closePopup01();" class="btnStyle01">아니오</a>
                </div>
            </div>
        </div>
    </div>
    <!-- mng_e 20200716 이금은. 최초 접속시 알림창 띄우기 -->


	<!-- mng_s 20210825 이금은 (메인화면의 우측 Popup 배너) -->
			<div id="mainPopup_bannerC" style="position:absolute;width:265px; height:260px; top:391px; right:0px; z-index:12000; display:none;">            
				<div class="top_close" style="margin-left: 89.9%; z-index:122;"><a href="javascript:void(0);"><span></span></a></div>
				<img id="mainPopup_bannerC_img" src="/html/survey/2021_3/img/banner_20211014.jpg" alt="mainPopup_bannerC_img" style="cursor:pointer;">
				<div style="position:absolute; top:240px; left:0px; z-index:123;">
					<label for="mainPopup_bannerC_chk" style="color:black !important ; margin-left: 2px;">
						<input type="checkbox" id="mainPopup_bannerC_chk"/> 오늘 하루 창 열지 않기
					</label>
				</div>
				<button class="bottom_close" style="right: 0px; top: 230px; left: 217px;">닫기</button>				      
			</div>	            
	<!-- mng_e 20210825 이금은 (메인화면의 우측Popup 배너) -->
	
	<!-- mng_s 20211028 이금은 (메인화면의 중앙 Popup 배너) -->
            <script>
                $(document).ready(function(){
                    $("#mainPopup_banner2_img").click(function(){
                        location.href = '/developer/html/main.html';
                    });
                });	
            </script>	
			<div id="mainPopup_banner2" style="position:absolute;width:547px; height:260px; top:110px; right:0px; z-index:12001; display:none; border:2px solid #ddd;">            
				<div class="top_close" style="margin-left: 95.1%; z-index:122;"><a href="javascript:void(0);"><span></span></a></div>
				<img id="mainPopup_banner2_img" src="/img/main/notice_20211224.jpg" alt="mainPopup_banner2_img" style="cursor:pointer;">
				<div class="bottom_text" style="position: absolute; z-index: 125; left: 4px;top: 238px;">
					<label for="mainPopup_banner2_chk" style="color:lightgray ; margin-left: 2px;">
						<input type="checkbox" id="mainPopup_banner2_chk"/> 오늘 하루 창 열지 않기
					</label>
				</div>
				<button class="bottom_close" style="right: 0px; top: 227px; left: 500px;">닫기</button>				      
			</div>
			<!-- 2022-11-29 [유지헤] 신규 서비스 오픈 알림 팝업 START -->
			<div class="popup_layer type1">
		      <div class="layer_box popup_01">
		        <div class="popup_wrap">
		          <a href="#" class="btn_01" id="sbrBtn"></a>
		          <a href="#" class="btn_01 link" id="lbrBtn"></a>
		          <a href="#" class="btn_02" id="surveyBtn"></a>
		          <a href="#" class="btn_close layer_close"></a>
		        </div>
		      </div>
     		  <div class="popup_bg"></div>
            </div>
			
                <style>
			      html,div{padding:0;margin:0;}
			      .popup_layer{position: fixed;width: 100%;height: 100%;top: 0;left: 0;z-index: 9;overflow: hidden;}
			      .popup_layer .popup_bg {width:100%; min-width: 1600px;height: 100vh; position:fixed;top:0px;left:0;z-index:99;background:rgba(0,0,0,0.5);}
			      .popup_layer .layer_box {position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);z-index: 999;}
			      .popup_layer .popup_01 {background: #fff;height: 720px;width: 1080px;background-image: url("/images/common/img_popbanner.png");}
			      .popup_layer .popup_01 .popup_wrap {position: relative;width: 100%;height: 100%;}
			      .popup_layer .popup_01 .popup_wrap a{display:block;}
			      .popup_layer .popup_01 .popup_wrap .btn_01{position: absolute;top: 220px;left: 376px;width:122px; height:31px;position: absolute;top: 205px;left: 376px;background-image: url("/images/common/btn_01.png"); background-repeat: no-repeat;}
			      .popup_layer .popup_01 .popup_wrap .btn_01.link{width:122px; height:31px;position: absolute;top: 205px;left: 900px;background-image: url("/images/common/btn_01.png"); background-repeat: no-repeat;}
			      .popup_layer .popup_01 .popup_wrap .btn_02{width:320px; height:82px;position: absolute;bottom: 30px;left: 390px;background-image: url("/images/common/btn_02.png"); background-position:center center; background-repeat: no-repeat;}
			      .popup_layer .popup_01 .popup_wrap .btn_close{background-image: url("/images/common/banner_btn_close.png");    position: absolute;top: 15px;right: 15px;width: 25px;height: 25px;}
			
			    </style>
				<!-- 2022-11-29 [유지혜] 신규 서비스 오픈 알림 팝업 END -->
			      <script type="text/javascript">
				          $(function () {
				                      $(".layer_close").on('click', (e) => {
				                        $(e.target).closest('.popup_layer').hide();
				                      });
				          });
				   </script>
							
<!-- 			<div id="mainPopup_banner2" style="position:absolute;width:458px; height:311px; top:140px; right:0px; z-index:12001; display:none; border:2px solid #ddd;">             -->
<!-- 				<div class="top_close" style="margin-left: 94%; z-index:122;"><a href="javascript:void(0);"><span></span></a></div> -->
<!-- 				<img id="mainPopup_banner2_img" src="/img/main/notice_20211224.jpg" alt="mainPopup_banner2_img" style="cursor:pointer;"> -->
<!-- 				<div class="bottom_text" style="position: absolute; z-index: 125; left: 4px;top: 288px;"> -->
<!-- 					<label for="mainPopup_banner2_chk" style="color:lightgray ; margin-left: 2px;"> -->
<!-- 						<input type="checkbox" id="mainPopup_banner2_chk"/> 오늘 하루 창 열지 않기 -->
<!-- 					</label> -->
<!-- 				</div> -->
<!-- 				<button class="bottom_close" style="right: 0px; top: 279px; left: 412px;">닫기</button>				       -->
<!-- 			</div>	             -->
	<!-- mng_e 20211028 이금은 (메인화면의 중앙Popup 배너) -->
	
    <!--//wrap--> 
    
</body>
</html>
