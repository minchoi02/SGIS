<!-- 
* 메인화면 HTML입니다.
* 
* history : 네이버시스템(주), 1.0, 2014/08/07  초기 작성
* author : 김성현
* version : 1.0
* see : 
*
//-->
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>

<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>메인 | 통계청SGIS 오픈플랫폼</title> 
    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
    
    <!-- *신규* --> 
 	<link rel="stylesheet" type="text/css" href="/css/thematicFunc.css" />

 	
  	<!-- *신규* -->
  	
    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
   
    <script  src="/js/plugins/jquery.min.js"></script> 
    <script  src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
    <script  src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
    <script  src="/js/plugins/colorpicker/js/colpick.js"></script>
    <script  src="/js/plugins/jquery.wheelcolorpicker.js"></script>
    <script  src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
    <script  src="/js/plugins/EasyTree/jquery.easytree.min.js"></script> 
	<!-- <script  src="/js/plugins/colResizable-1.5.min.js"></script> -->
    <script  src="/js/plugins/highcharts/highcharts.js"></script>
    <script  src="/js/plugins/highcharts/highcharts-more.js"></script>
    <script  src="/js/plugins/highcharts/highchart.drag.js"></script>
    
    <script  src="/js/common/mapInfo/legendInfo.js"></script>
    <script  src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>    
    <script  src="/js/plugins/jquery.sha256.js"></script>
    <script  src="/js/plugins/durian-v2.0.js"></script>
    <script  src="/js/common/sop.portal.absAPI.js"></script>
    <script   src="/js/thematicMap/map05.js?version=1.0"></script>
    <script  src="/js/common/common.js"></script>
    <script  src="/js/common/mapNavigation.js"></script>
      
      
    <script  src="/js/interactive/interactiveMapBtn.js"></script>
    <script  src="/js/thematicMap/thematicEtc05.js"></script>
    <script  src="/js/thematicMap/thematicMap_api.js"></script>
    <script  src="/js/thematicMap/thematicMapFrame03_api.js"></script>
    
    <!-- mng_s 20210531 이진호 캐쉬 사용 방지 추가, 김책임님 께서 추가 하라고 하셧음. -->
    <script  src="/js/thematicMap/thematicMapFrame05.js?version=1.2"></script><!-- *신규* -->
    <!-- mng_e 20210531 이진호 -->
    <script  src="/js/common/mapInfo/bookmarkAndShareInfo.js"></script>
    
     <!-- 통계갤러리 -->
    <script  src="/js/plugins/slick.min.js"></script>  
	<script  src="/js/plugins/jquery.tagsinput.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
    <script  src="/js/gallery/galleryEtc.js"></script>
    <script  src="/js/plugins/imageCapture/rgbcolor.js"></script>
    <script  src="/js/plugins/imageCapture/canvg.js"></script>
    <script  src="/js/plugins/imageCapture/html2canvas.js"></script>
    <script  src="/js/plugins/imageCapture/html2canvas.svg.js"></script> <!-- 2017.03.14 svg 이슈 -->
    
<!--     <link rel="stylesheet" type="text/css" href="/css/common/left.css"> -->
    <link rel="stylesheet" type="text/css" href="/css/common/data_board.css">
    <script   src="/js/interactive/kakao_script_api.js"></script><!--20년수정반영 (카카오 api 추가) -->
    <script>
	$(document).ready(
   			function() {
	    		srvLogWrite("B0","03","01","00",window.parent.$thematicMapMain.themaInfo.title,"");
   				setTimeout(function() {
   					$(".sideQuick.sq02").trigger("click");
				}, 600);/*2019-02-28 박길섭*/		
				
   				$("#mapRgn_box").append($(".sop-control-container").detach());//20년수정반영 (mapRgn_box 관련)
   			}
		); 
    
	function callTutorial(){
		if(confirm("<통계주제도> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?")) 
			window.open('/view/thematicMap/thematicMapMain?tutorial_mode', '_blank'); 
	}
    </script>
    <style>
     	tspan{
     		font-weight: normal !important;/*2019-02-28 박길섭*/
     		fill: #606060;/*2019-02-28 박길섭*/
     	}
     	table{width:auto !important;}/*2019-02-28 박길섭 수정 시작*/
		/*코로나추가 20200722 주용민*/	
     	.covidDbTabs a{
	     	color:#595757;
	     	border:0;
	     	background:#fff;
	     	font-size:12px;
	     	display:table-cell;
	     	height:30px;
	     	text-align:center;
	     	vertical-align:middle;
	     	letter-spacing:-1px;
	     }
     	.covidDbTabs a.on{color:#fff;background:#1778cc;}   	
		/*코로나추가 20200722 주용민*/	
     	/**20년수정반영 시작 (css 추가)**/
     	.dscList1 dt>a.on {
        		background: #00bcd4 url(/img/ico/ico_up01.gif) no-repeat 366px center;
         		font-weight: normal; 
     			color: #FFF; 
     			    border-radius : 50px;
			}
		.dscList1 dt>a {
			    display: block;
			    width: 100%;
			    margin-left: 6px;
			    height: 26px;
			    overflow: hidden;
			    border-radius: 13px;
			    line-height: 26px;
			    color: #fff;
			    text-indent: 10px;
			    background: #00bcd4 url(/img/ico/ico_down01.gif) no-repeat 366px center;
			    font-weight : normal;
			}
		.clockTypeBox .yearList {
		margin-left : 45px;
		}
/* 		#mapRgn_1{ */
/*  			height:4096px; width:4096px; top:-1850px; left : -1100px;  z-index: 1  */
/* 		}  */
		.toolBar{
			z-index: 20;/*19년수정*/
		}
		.interactiveBar{
			z-index: 2;
		}
		.sop-top {
    		top: 80px;
		}
		.sop-right {
    		right: 0px
		}
		.sop-bottom {
    		bottom: 0px;
		}
		.sop-left {
    		left: 0px;
		}
		/**20년수정반영 끝 (css 추가)**/	
     </style>
     <!--20년수정반영 시작 (트위터, 페이스북 공유 관련)-->
     <script>
		 //트위터
		window.twttr = (function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0],
			    t = window.twttr || {};
			  if (d.getElementById(id)) return t;
			  js = d.createElement(s);
			  js.id = id;
			  js.src = "https://platform.twitter.com/widgets.js";
			  fjs.parentNode.insertBefore(js, fjs);
			 
			  t._e = [];
			  t.ready = function(f) {
			    t._e.push(f);
			  };
			 
			  return t;
		}(document, "script", "twitter-wjs"));
		
		window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '893451250742184', //'893451250742184'(상용),//'1516531411965359'(이전),
		      xfbml      : true,
		      version    : 'v2.5'//'v2.4'
		    });
		};

		 //페이스북
		window.facebook =(function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "https://connect.facebook.net/ko_KR/sdk.js";
		     fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
	</script>
    <!--20년수정반영 시작 (트위터, 페이스북 공유 관련)-->	
    
    <!-- mng_s 20200730 kimjoonha -->
    <script>
		// 하루 안 보기
		$("#closeLabel").on("click", function(event){
		    event.stopPropagation();
		});
	</script>
    
</head>

<!-- <body>   -->
<!-- <div id="wrap"> -->
<input type="hidden" name="stat_thema_map_id" id="stat_thema_map_id"/>
<input type="hidden" name="theme" id="theme"/>
<input type="hidden" name="mapType" id="mapType"/>
		<div class="containerBox">  
			<div class="rela">
				
				<div class="sceneBox">
					<div class="sceneRela">
						<div class="toolBar">
							<h2>통계주제도</h2>
							<a href="javascript:void(0)" class="interactiveView"></a> 
<!-- 							<a href="javascript:void(0)" class="interactiveSelect">둔산 2동</a> -->
							<div id="mapNavi_1" class="interactNavi"></div>
<!-- 							<a href="javascript:$thematicMapFrame05.ui.mapList[0].mapNavigation.getLocation();" class="interactiveIco"><img src="/img/ico/ico_gps01.gif" alt="위치검색" /></a>  -->
							<div class="navi-content">
								<div class='scrl-first'>
									<ul>
										<li><a href="#">test</a></li> 
									</ul>
								</div>
								<div class='scrl-second'>
									<ul>
										<li><a href="#">test</a></li>
									</ul>
								</div>
								<div class='scrl-third'>
									<ul>
										<li><a href="#">test</a></li>
									</ul>
								</div>
								<div class='navi-action'>
									<a href="javascript:void(0)"><img id='navi-confirm' src='/img/popup/btn_confirm.png' alt='확인' /></a>
									<a href="javascript:void(0)"><img id='navi-cancel' src='/img/popup/btn_close.png' alt='닫기' /></a>
								</div>
							</div>
							
							<div class="tb_right"> 
								<ul>
								<!--20년수정반영 (튜토리얼 버튼 stlye="right:315px"로 수정)-->
								<button type="button" id="tuto_tm_start_btn04" style="font-family: 나눔고딕; border-radius: 1000px; background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 105px; right: 315px; top: 2px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;"
								    onclick="javascript:callTutorial();">&nbsp;튜토리얼&nbsp;&nbsp;&nbsp;
									<a href="javascript:void(0)"data-subj="튜토리얼 설명"style="margin-left: 0px"  title="사용지침서로서 튜토리얼을 클릭하시어<br>순서대로 따라하시면<br>통계주제도를 사용하시는 방법을<br>익힐 수 있습니다."><img src="/img/tutorial/thematicMap/ico_i.gif" alt="튜토리얼 설명"></a>
								</button> 
								</ul> 
								<ul class="tbr01">
									<!--20년수정반영 시작 (1)~(4)-->
									<li><a onclick="javascript:$thematicMapFrame05.ui.doMaxSize();" id="fullScreen" style="cursor: pointer;" title="전체 화면 확대" ><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대" /></a></li><!--(1)-->   
									<!-- <li><a onclick="javascript:$thematicMapFrame05.ui.doClearMap(1);" style="cursor:pointer;" title="초기화"><img src="/img/ico/ico_toolbars02.png" alt="초기화"></a></li> --><!--(2)-->
									<li><a onclick="javascript:$thematicMapFrame05.ui.doShare(1);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li><!--(3)-->
									<li><a onclick="javascript:$thematicMapFrame05.ui.mapImageDown();" style="cursor:pointer;" title="지도 이미지 다운로드"><img src="/img/ico/ico_toolbars13.png" alt="지도 이미지 다운로드" /></a></li>
									<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen(); javascript:srvLogWrite('B0','03','08','00',$('.helperText span').text(),'');" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
									<li><a onclick="javascript:$thematicMapFrame05.ui.reportDataSet(1); javascript:srvLogWrite('B0','03','09','00',$('.helperText span').text(),'');" style="cursor:pointer;" title="보고서 보기"><img src="/img/ico/ico_toolbars09.png" alt="보고서 보기" /></a></li>
									<li><a href="${pageContext.request.contextPath}/view/board/qnaAndRequestThema" target="_top" class="tb_mapAdd" title="주제도 신규 요청하기"><img src="/img/ico/ico_toolbars11.png" alt="주제도 요청하기"/></a></li><!--2019-03-13 박길섭 -->  
									<!--20년수정반영 시작 (1)~(4)-->
								</ul> 
								<a href="javascript:void(0)" class="tb_close"><img src="/img/ico/ico_winClose.gif" alt="창닫기" /></a>
							</div>
						</div>
						<div class="interactiveBar"><!-- map topbar -->
							<h3 class="h3 helperText textPosition">
								<a href="javascript:void(0)"data-subj="주제도 설명"style="margin-left: -35px">
				    				<img src="/img/ico/ico_i.gif" alt="주제도 설명"><!--박길섭 추가 -->
				    			</a>
							</h3>
				    	</div><!-- map topbar -->
				    	
				    	<!-- 데이터보드 -->
<!-- 				    	<a href="javascript:void(0)" class="interactiveDataBoard" style="z-index:10000;">데이터보드</a> -->
<!-- 				    	<div class="dataSideBox" style="width:400px;height:500px;"> 2017.03.21 그래프 라벨이슈 -->
<!-- 				    		<div class="bar"> -->
<!-- 				    			<div id="dataSlider" class="dataSlider"></div>  -->
<!-- 				    			<a href="javascript:void(0)"><img src="/img/ico/ico_close02.png" alt="데이터보드 닫기" /></a> -->
<!-- 				    		</div> -->
<!-- 				    		<div class="dataSideContents" id="container"> -->
<!-- 				    			<p class="thematicTopText">지역을 클릭하면 해당지역 증감현황을 볼 수 있습니다.</p> -->
<!-- 					    		<div class="thematicCharts" style="width:360px;height:360px;margin-left:15px;"></div> 2017.03.21 그래프 라벨이슈 -->
<!-- 					    		2017.03.30 시도/시군구/읍면동별 전국지도 일때, 그래프 미제공 이슈  -->
<!-- 					    		<div id="graph_help_text" style="display:none;width:420px;height:200px;line-height:30px;margin-top:150px;text-align:center;color:#adadad;"> -->
<!-- 					    			<span>시도별/시군구별/읍면동별 전국지도 전국레벨에서는</span><br> -->
<!-- 					    			<span>그래프를 지원하지 않습니다.</span> -->
<!-- 					    		</div> -->
<!-- 					    		<p class="thematicBotText" style="width:420px;height:20px; line-height:20px;"></p> -->
<!-- 				    		</div> -->
				    		
<!-- 				    	</div> -->

						<div id="dataBoard" >
							<a href="javascript:void(0)" class="interactiveDataBoard" style="right:290px;">데이터보드</a><!-- 20년수정반영-->
							<div class="dataSideBox" style="width:400px;height:500px;">
								<div class="bar">
									<div style="position:relative;width:50px;float:left;left:240px;top:2px;"><a onclick="javascript:$thematicMapFrame05.ui.chartImageDown();" style="cursor:pointer;" title="데이터보드 이미지 다운로드"><img src="/img/ico/ico_toolbars13.png" alt="데이터보드 이미지 다운로드" /></a></div>
									<div id="dataSlider" class="dataSlider"></div>
									<a href="javascript:void(0)" class="stepClose-data">데이터보드 닫기</a>
								</div>
								<div class="dataSideContents" id="container">
					    			<p class="thematicTopText">지역을 클릭하면 해당지역 증감현황을 볼 수 있습니다.</p>
									<!-- 코로나추가 20200722 주용민	-->
					    			<div class="covidDbTabs" style="position:absolute;display:none;width:160px;table-layout:fixed;border-collapse:collapse;border:1px solid #ccc;margin-top:20px;margin-left:130px;">
										<a id="covidDbTabs_toggle1" href="javascript:void(0)" class="on">일별 기준</a>			
										<a id="covidDbTabs_toggle2" href="javascript:void(0)">월별 기준</a>			
					    			</div> 
									<!-- 코로나추가 20200722 주용민	-->
						    		<div class="thematicCharts" style="width:360px;height:360px;margin-left:15px;"></div>
						    		<!-- 2017.03.21 그래프 라벨이슈
						    		2017.03.30 시도/시군구/읍면동별 전국지도 일때, 그래프 미제공 이슈  -->
						    		<!-- 20년수정반영 시작 -->
						    		<!-- 시계열 조회 Start -->
									<!--
					    			<div class="dataBoardDiv1" id="viewDataBoard1" style="width:385px;height:360px;margin-left:5px;">
										<dl class="dscList1" style="display:none;">
										<dt id="viewTimeSeriesData_dt_area"><a href="javascript:void(0)" class="on">시계열 조회</a></dt>
										<dd id="viewTimeSeriesData_dd_area">
											<div class="clockTypeBox">
												<a href="javascript:void(0)" class="btn_clockTypePlay" style="margin-left:10px;">play</a>
												<a href="javascript:void(0)" class="btn_clockTypeSetting" style="margin-left:10px;">설정</a>
												<a href="javascript:void(0)" class="btn_clockTypeOk" style="margin-left:10px;top:75px;">ok</a>
												<ul class="yearList" id="tableTimeSeries">
												</ul>
											</div>
										</dd>
										</dl>
									</div>
									-->
									<!-- 시계열 조회 End -->
									<!-- 20년수정반영 끝 -->
						    		<div id="graph_help_text" style="display:none;width:420px;height:200px;line-height:30px;margin-top:150px;text-align:center;color:#adadad;">
						    			<span>시도별/시군구별/읍면동별 전국지도 전국레벨에서는</span><br>
						    			<span>그래프를 지원하지 않습니다.</span>
						    		</div>
						    		<p class="thematicBotText" style="width:420px;height:20px; line-height:20px;">출처: </p>
					    		</div>
							</div>
							<form id="excelDownForm" name="excelDownForm" method="post"></form>
						</div>
				    	<!-- 데이터보드 end-->
				    	
				    	<!-- right menu -->   
<!-- 				    	<a href="javascript:void(0)" class="rightQuick rq06"><span>GPS</span></a> -->
<!-- 				    	<ul class="rqListBox rq06"> -->
<!-- 				    		<li><a href="javascript:void(0)" class="ico_side_gps01"><span>위성</span></a></li>  -->
<!-- 				    		<li><a href="javascript:void(0)" class="ico_side_gps02"><span>일반</span></a></li> -->
<!-- 				    	</ul> -->
				    					    	
<!-- 				    	<a href="javascript:void(0)" class="rightQuick rq03">확대하기</a> -->
<!-- 				    	<p class="rightQuick rq04">집계구</p> -->
<!-- 				    	<a href="javascript:void(0)" class="rightQuick rq05">축소하기</a> -->
				    	<!-- right menu --> 
				    	
				    	<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 -->
						<!-- 코로나추가 20200722 주용민	-->
						<div id="quar" style="position: absolute;z-index:6;left: 50%;transform: translateX(390px);width: 160px;height:40px;bottom: 155px;background: url(/img/common/ico_covid.png);display:none;cursor:pointer;">
							<div style="margin-left: 66px;margin-top: 10px;font-size: 15px;font-weight: bold;"></div>
						</div>
						
						<div id="infection_etc" style="position: absolute;right: 126px;bottom:60px;z-index: 10000;font-weight:bold;color:black; display:none;background-color: white;border: solid 2px black;width: 180px;height: 48px;padding: 15px 5px 5px 5px;text-align: center;">미상 - <span></span><br>(거주지 불명 or 신원 미상)</div>
						<div id="cancer_etc" style="position: absolute;right: 126px;bottom:60px;z-index: 10000;font-weight:bold;color:black; display:none;background-color: white;border: solid 2px black;width: 180px;height: 48px;padding: 15px 5px 5px 5px;text-align: center;">기타 - <span></span><br>(주소지 불분명환자)</div>
						<!-- 코로나추가 20200722 주용민	-->
				    	<div id="themaNoticeText"  style="position:relative;left:300px;bottom:60px;z-index:6;font-weight:bold;color:red;display:none;">서비스 속도 개선을 위해 시군구 경계를 경량화</br>하였으니 이용에 참고 하시기 바랍니다.</div> 
						<!-- 코로나추가 20200722 주용민	-->
				    	<div id="covidChartDiv" style="position:absolute;left:50%;transform:translateX(-50%);bottom:7px;z-index:10;height:150px;width:1150px;display:none;">
				    		<div style="width:30px;height:150px;position:absolute;border:1px solid black;background-color:white;text-align:center;">
				    			<div style="margin-top:60px;">
				    				<button id="covidPlay"><img src="/img/ico/ico_dbPlay.png" width="15px"></button>
				    				<button id="covidStop" style="display:none;"><img src="/img/ico/ico_dbStop.png" width="15px"></button>
				    			</div>
				    		</div>
				    		<div id="covidChart" style="width:1100px;height:150px;margin-left:31px;border:1px solid black;"></div>
				    	</div><!-- mng_s 20200729 kimjoonha -->
						<!-- 코로나추가 20200722 주용민	-->
						
						<!-- 코로나 현황판추가 mng_s 20200730 kimjoonha	-->
						<div id="coronaPop" style="display:none; overflow: auto; position: absolute;left:0px;top:0px; z-index: 1001; background: rgba(0, 0, 0, 0.5); width: 100%; height: 100%;" >
				    		<!-- <div id="general_cnt"  style="position:absolute;left:500px;top:200px;z-index:22;height:340px;width:500px;display:none;"></div>-->
<!-- 				    		<div id="general_cnt"  style="position:absolute; left:35%;transform:translateX(-50%); top:50%;transform:translateY(-50%);z-index:1002;height:340px;width:500px;display:none;"></div> -->
				    		<div id="general_cnt"  style="position:absolute; left:35%;transform:translateX(-50%); top:45%;transform:translateY(-50%);z-index:1002;height:606px;width:500px;display:none;"></div>
				    	</div>
				    	<!-- mng_e 20200729 kimjoonha -->
				    	
						<div id="coronaVaccPop" style="display:none; overflow: auto; position: absolute;left:0px;top:0px; z-index: 1001; background: rgba(0, 0, 0, 0.5); width: 100%; height: 100%;" >
				    		<div id="vacc_cnt"  style="position:absolute; left:35%;transform:translateX(-50%); top:45%;transform:translateY(-50%);z-index:1002;height:606px;width:500px;display:none;"></div>
				    	</div>
						
				    	<!-- 20년수정반영  시작 (mapRgn_box) -->
				    	<div id="mapRgn_box" style="width: 100%;height: 100%;">
				    		<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 --> 
				    	</div>
				    	<!-- 20년수정반영  끝 -->
				    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
				    	
			    	</div>
		    	</div>
		    	
				<!-- left menu -->
		    	<a href="javascript:void(0)" class="sideQuick sq02">
		    		<span>주제도 목록</span>
		    		<img src="/images/ico/ico_totalmenu.gif" alt="전체메뉴" />
		    	</a>
		     
		    	<a href="javascript:void(0)" class="sideQuick sq03 xw">
		    		<span>주제도 설정</span>
<!-- 		    		<img src="/img/ico/ico_jusetting.png" alt="주제도 설정" /> -->
		    	</a>
		    	<div class="sqListBox sq03" style="top:69px;">
		    		<div class="sqTabs">
		    			<!-- <span>사용자 맞춤 주제도 설정</span>  -->
		    			<a href="javascript:void(0)" class="stepClose2"></a>
		    		</div>
		    		
		    		<!-- mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출 -->
		    		<div class="sqList" style="height: auto;">
		    		<!-- mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출 -->
		    		
		    			<ul>
							<!-- 코로나 현황/예방접종 주용민	-->
		    				<li id="covid_thema_type" style="display:none;">
		    					<span>통계주제</span>
		    					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=sAXkcVzk5V202007141335257355ued9032uw&theme=CTGR_005&mapType=05&param=0" target="_top" style="width:90px;" id="covidThema1" >발생 현황</a>
		    					<a href="/view/thematicMap/thematicMapMain?stat_thema_map_id=kmOpHLH5cK202106100936161097g5G9nLCFE&theme=CTGR_005&mapType=05&param=0" target="_top" style="width:110px;" id="covidThema2">예방접종 현황</a>
		    				</li><hr id ="covid_hr" style="display:none;">
							<!-- 코로나 현황/예방접종 주용민	-->
							
							<!-- 코로나추가 20200722 주용민	-->
		    				<li id="covid_data_type" style="display:none;">
		    					<span>표출정보</span>
		    					<a href="javascript:void(0);" style="width:80px;" id="covid_patient" class="first on">확진환자 현황</a>
		    					<a href="javascript:void(0);" style="width:100px;" id="covid_hospital" class="last">국민안심병원</a>
		    				</li>
							<!-- 코로나추가 20200722 주용민	-->
							
							<!-- 코로나예방접종 주용민	-->
		    				<li id="covid_vacc_type" style="display:none;">
		    					<span>표출정보</span>
		    					<a href="javascript:void(0);" style="width: 55px;" id="vacc_patient" class="first on">접종 현황</a>
		    					<a href="javascript:void(0);" style="width:75px;" id="vacc_hospital"  title="예방접종센터:  코로나19 핵산백신(mRNA)의 보관·관리 및<br /> 접종을 위해 지자체장이 설치한 대규모 접종기관.">예방접종센터</a>
		    					<a href="javascript:void(0);" style="width:75px;" id="vacc_consign"  title="위탁의료기관: 기존 국가예방접종사업 참여 의료기관중<br /> 백신보관, 공간, 인력확보 등의 선정기준에 부합하여 <br />예방접종을 실시하고 있는 의료기관" class="last">위탁의료기관</a>
		    				</li>
							<!-- 코로나예방접종 주용민	-->
							
							<!-- 보행자 교통사고 추가 20210521 주용민	-->
		    				<li id="caracc_data_type" style="display:none;">
		    					<span>표출정보</span>
		    					<a href="javascript:void(0);" style="width:80px;" id="caracc_occur" class="first on">사고발생현황</a>
		    					<a href="javascript:void(0);" style="width:100px;" id="caracc_occur_point" class="last">사고발생지점</a>
		    				</li>
							<!-- 보행자 교통사고 추가 20210521 주용민	-->
							
							<!--  코로나 예방접종추가 -->
		    				<li id="vacc_type" style="display: none;">
		    					<span>회차선택</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].isFirstDraw = true;$thematicMapFrame05.ui.mapList[0].getThemaMapData('covid19_vacc_data','00');" id="vacc14" class="first on" >1회차</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].isFirstDraw = true;$thematicMapFrame05.ui.mapList[0].getThemaMapData('covid19_vacc_data','00');" id="vacc25" >2회차</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].isFirstDraw = true;$thematicMapFrame05.ui.mapList[0].getThemaMapData('covid19_vacc_data','00');" id="vacc36" class="last" >3회차</a>
		    				</li>
<!-- 		    				<li id="vacc_type2" style="display: none;"> -->
<!-- 		    					<span>회차선택</span> -->
<!-- 		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('covid19_vacc_data','00');" id="vacc3" class="first on" >1회차</a> -->
<!-- 		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('covid19_vacc_data','00');" id="vacc4" class="last" >접종완료</a> -->
<!-- 		    				</li> -->
							<!--  코로나 예방접종추가 -->
							
		    				<li id="stat_sel">
		    					<span>통계선택</span>
<!-- 		    					<a href="javascript:$thematicMapFrame05.ui.changeLeftRightValue()" class="first" id="leftValue">증감틀</a> -->
<!-- 		    					<a href="javascript:$thematicMapFrame05.ui.changeLeftRightValue()" class="last" id="rightValue">CAGR</a> -->
		    					<input type="hidden" id="selectValue" value=""/>
		    				</li>
							<!-- 코로나추가 20200722 주용민	-->
		    				<li id="covid_type" style="display: none;">
		    					<span>세부선택</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].covid();" class="first" id="covid0" style="width:25px;">전체</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].covid();"  id="covid1" style="width:60px;" title="코로나19가 병원 내에서 전염되는 것을 막기 위해 <br/>호흡기 환자의 병원 방문부터 입원까지 <br/>모든 진료과정을 다른 환자와 분리하여 진료하는 병원.">국민안심병원</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].covid();" id="covid2" style="width:70px;" title="코로나19 확진 여부를 알기 위해 차에 탄 채 안전하게 <br/>문진·검진·검체 채취·차량 소독을 할 수 있는 선별진료소. <br/>의심환자가 차를 타고 일방통행 동선에 따라 이동하면, <br/>의료진이 '의심환자 확인 및 문진 - 진료 - 안내문 배포' 순서로<br/>검사를 진행한 뒤 소독을 실시하는 방식으로 이루어짐.">승차검진진료소</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].covid();" id="covid3" class="last" title="응급실 외부 또는 의료기관 내 별도로 분리된 진료시설로, <br/>감염증 의심 증상자가 의료시설 출입 이전에 <br/>진료를 받도록 하는 공간.">선별진료소</a>
		    				</li>
							<!-- 코로나추가 20200722 주용민	-->
							
							<!--  암발생현황 추가 -->
		    				<li id="cancer_list" style="display: none;">
		    					<span>유형선택</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('cancer_data','00');" class="first" id="cancer0"  style="width:45px;" title="5대 암을 포함한 전체 암 통계">전체 암</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('cancer_data','00');"  id="cancer1" style="width:33px;">폐암</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('cancer_data','00');" id="cancer2" style="width:33px;">위암</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('cancer_data','00');" id="cancer3" style="width:33px;">간암</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('cancer_data','00');" id="cancer4" style="width:40px;">대장암</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('cancer_data','00');" id="cancer5" class="last" style="width:40px;">유방암</a>
		    				</li>
							<!--  암발생현황 추가 -->
							
							<!--  감염병 발생현황 추가 -->
		    				<li id="infection_list" style="display: none;">
		    					<span>그룹선택</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('infection_data','00');" class="first" id="infection1" >제1군</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('infection_data','00');" id="cancer2" >제2군</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('infection_data','00');" id="cancer3" >제3군</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('infection_data','00');" id="cancer4" class="last">제4군</a>
		    				</li>
							<!--  감염병 발생현황 추가 -->
							
							<!--  기온/강수현황 추가 -->
		    				<li id="weather_type1" style="display: none;">
		    					<span>유형선택</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('weather_data','00');" class="first" id="weather1" >평균</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('weather_data','00');" id="weather2" >최고</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('weather_data','00');" id="weather3" class="last">최저</a>
		    				</li>
		    				<li id="weather_type2" style="display: none;">
		    					<span>유형선택</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('weather_data','00');" class="first" id="weather4" >합계 강수</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('weather_data','00');" class="last" id="weather5" >일일 최대</a>
		    				</li>
							<!--  기온/강수현황 추가 -->
							
							<!--  공영자전거 운영현황 추가 -->
		    				<li id="bike_type" style="display: none;">
		    					<span>유형선택</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('kosis_trmnl_bcycl_cnt_per','00');" class="first" id="bike1" style="width:70px;">터미널/주차장</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('kosis_hold_bcycl_cnt_per','00');" id="bike2" style="width:60px;">보유자전거</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].getThemaMapData('kosis_lend_acmslt_cnt_per','00');" id="bike3" class="last" style="width:50px;">대여실적</a>
		    				</li>
							<!--  공영자전거 운영현황 추가 -->
							
							<!--  보행자 교통사고 추가 -->
		    				<li id="caracc_type" style="display: none;">
		    					<span>조건선택</span>
		    					<a href="#" class="first" id="caracc0" >전체 사고</a>
		    					<a href="#;" id="caracc1" title="사 망 : 교통사고 발생일로부터 30일 이내에 사망한 경우<br />(1999년까지는 72시간내 사망)">사망사고</a>
		    					<a href="#" id="caracc2" title="중 상 : 교통사고로 인하여 3주 이상의 치료를<br /> 요하는 부상을 입은 경우">중상사고</a>
		    					<a href="#" id="caracc3" title="경 상 : 교통사고로 인하여 5일 이상 3주 미만의 치료를<br /> 요하는 부상을 입은 경우">경상사고</a>
		    					<a href="#" id="caracc4" title="부상신고 : 교통사고로 인하여 5일 미만의 치료를<br /> 요하는 부상을 입은 경우" class="last" >부상신고</a>
		    				</li>
							<!--  보행자 교통사고 추가 -->
							
		    				<li id="base_year">
		    			
		    				</li>
		    				<li id="region_boundary">		
		    					<span>지역경계</span>
		    					<a onclick="javascript:srvLogWrite('B0','03','04','01',$('.helperText span').text(),'');" href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()" class="first" id="autoRegion">자동</a>
		    					<a onclick="javascript:srvLogWrite('B0','03','04','02',$('.helperText span').text(),'');" href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()" id="sido" >시도</a>
		    					<a onclick="javascript:srvLogWrite('B0','03','04','03',$('.helperText span').text(),'');" href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()" id="sigungu" >시군구</a>
		    					<a onclick="javascript:srvLogWrite('B0','03','04','04',$('.helperText span').text(),'');" href="javascript:$thematicMapFrame05.Popup.show();$thematicMapFrame05.ui.mapList[0].changeRegionBound()" id="eupmyundong" class="last" >읍면동</a>
		    					<input type="hidden" id="selectValue2" value="auto"/>
		    				</li>
		    				
		    				<!-- mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출 -->
		    				<li id="top_bottom_li" style="display: none;">  <!-- style="display: none;" -->
		    					<span>선택보기</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].showTopBottomDataOnly('ON', false);" class="first" id="top_bottom_on">ON</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].showTopBottomDataOnly('OFF', false);" class="last" id="top_bottom_off">OFF</a>
		    				</li>
		    				
		    				<li id="top_bottom_type" style="display: none;">
		    					<span>&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</span>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].setTopBottomType('top');" class="first" id="top_bottom_type_top">상위</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].setTopBottomType('both');" id="top_bottom_type_both">상/하위</a>
		    					<a href="javascript:$thematicMapFrame05.ui.mapList[0].setTopBottomType('bottom');" class="last" id="top_bottom_type_bottom">하위</a>
		    				</li>
		    				
		    				<li id="top_bottom_select" style="display: none;">
		    					<span>&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</span>
		    					<select id="top_bottom_select_count" onchange="javascript:$thematicMapFrame05.ui.mapList[0].setTopBottomCount(this.value);">
		    						<option value = "5">5</option>
		    						<option value = "10" selected>10</option>
		    						<option value = "15">15</option>
		    						<option value = "20">20</option>
		    						<option value = "25">25</option>
		    						<option value = "30">30</option>
		    						<option value = "35">35</option>
		    						<option value = "40">40</option>
		    						<option value = "45">45</option>
		    						<option value = "50">50</option>
    							</select>
    							<span>&nbsp; 개 보기</span>
   							</li>
		    				<!-- mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출 -->
		    				<li id="top_bottom_select2" style="display: none;">
		    					<span>&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;</span>
		    					<select id="top_bottom_select_count2" onchange="javascript:$thematicMapFrame05.ui.mapList[0].setTopBottomCount(this.value);">
		    						<option value = "5">5</option>
		    						<option value = "10" selected>10</option>
		    						<option value = "15">15</option>
		    						<option value = "20">20</option>
    							</select>
    							<span>&nbsp; 개 보기</span>
   							</li>
		    				
		    				<li id="map_type">
		    					<span>지도유형</span>
		    					<a onclick="javascript:srvLogWrite('B0','03','05','01',$('.helperText span').text(),'');$('.thematicTopText').show();" href="javascript:$thematicMapFrame05.ui.changeDataMode();" class="first" id="color">색상</a>
		    					<a onclick="javascript:srvLogWrite('B0','03','05','02',$('.helperText span').text(),'');$('.thematicTopText').hide();" href="javascript:$thematicMapFrame05.ui.changeDataMode();" class="last" id="bubble">버블</a>
		    					<input type="hidden" id="dataMode" value="color"/>
		    					<input type="hidden" id="pieChartFlag" value="off"/>
		    				</li> 
		    				<li id="data_type">
		    					<span>통계표출</span>
		    					<a onclick="javascript:srvLogWrite('B0','03','06','00',$('.helperText span').text(),'ON');" href="javascript:$thematicMapFrame05.ui.changeDataMode2()" class="first">ON</a>
		    					<a onclick="javascript:srvLogWrite('B0','03','06','00',$('.helperText span').text(),'OFF');" href="javascript:$thematicMapFrame05.ui.changeDataMode2()" class="last" id="default_switch">OFF</a>
		    					<input type="hidden" id="dataMode2" value="dataOff"/>
		    				</li>
		    				<!-- 2016.07.11 시계열 추가  -->
		    				<li id="timeSeries_type" style="display: none;">
		    					<span>시계열조회</span>
		    					<a href="javascript:$thematicMapFrame05.Popup.show();javascript:$thematicMapFrame05.ui.timeSeriesPlay(true)" title="ON 클릭 시 로딩하는데 시간이 오래걸림" class="first" style="margin-left:-12px;">ON</a>
		    					<a href="javascript:$thematicMapFrame05.ui.timeSeriesPlay(false)" class="last on" id="timeSeries_off">OFF</a>
		    					<input type="hidden" id="timeSeries" value="dataOff"/>
		    				</li>  
		    			</ul>
		    		</div> 
		    	</div> 
		    	 
		    	<!-- left menu --> 
	    		<!-- 왼쪽메뉴  -->
				<div class="leftArea">
					<div class="shadow"></div>
					<div class="quickBox step01">
						<div class="subj">
							<h2>통계주제도</h2>
						</div>
						<div class="normalBox">
							<ul class="themul">
							</ul>
							<ol class="stat-infor">
							    <li><a href="${pageContext.request.contextPath}/view/board/qnaAndRequestThema" target="_top">주제도 요청하기</a></li><!--2019-03-13 박길섭 -->
		                        <li><a onclick="javascript:$thematicMapFrame05.ui.reportDataSet(1);" style="cursor:pointer;">보고서 보기</a></li>
		                        <li><a href="${pageContext.request.contextPath}/view/newhelp/su_help_10_0" target="_top">도움말 보기</a></li>
		                        <li><a href="javascript:$thematicMapFrame05.ui.doMaxSize();" id="fullScreen">전체 화면 확대</a></li>  
							</ol>
<!-- 							<div class="menuAutoClose" style=" " id="menuAutoClose2Lev "> -->
<!-- 								<input type="radio " name="menuAutoClose_radio " id="menuAutoClose_radio " onclick="$interactiveLeftMenu.ui.sqlListBoxPosition( '244px'); "> -->
<!-- 								<label for="menuAutoClose_radio " class="on ">메뉴 자동닫기</label> -->
<!-- 							</div> -->
						</div>
						<div class="bottom "><a href="javascript:void(0) " class="buttom stepClose ">닫기</a></div>
					</div>
					<div class="nav-sidebar">
						<ul class="thematic nav-list thematic-map">
						</ul>
						<div class="list_btn">
							<img src="/images/common/img_list_btn.png"/>
						</div>
					</div>
					<div class="quickBox step02">
					
						<!-- mng_s 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가 -->
						<div class="subj" style="height: 73px;"> <!-- style="height: 73px;" -->
						<!-- mng_e 2019. 11. 20 j.h.Seok 이용자 중심 서비스 개편 - 정렬 방식 추가 -->
						
							<h2 class="subj_list">인구와 가구 주제<a href="javascript:void(0)" class="ar" ><img src="../../include/images/ico/ico_tooltip01.png" alt="물음표" ></a></h2>
<!-- 							<a href="javascript:void(0)"></a> -->
						</div>
						<div class="expendBox">
							<div class="step-option group">
								<ul class="radioType">
								</ul>
							</div>
						</div>
						<div class="bottom "><a href="javascript:void(0) " class="stepClose ">닫기</a></div>
					</div>
				</div>
				<!-- 왼쪽메뉴  end -->
	    		
	    		
	    		
				<!-- 색상설정 end --------->
			</div>	 
		</div>  
		<div id="thematicMapOrigin" style="display:none;"></div>
						<!-- loading image -->
		
		<!-- 갤러리 등록 및 즐겨찾기 -->
		<jsp:include page="/view/map/gallaryDialog"></jsp:include>
		<!--20년수정반영 시작 (공유팝업)-->
		<!-- 공유팝업  -->
		    	<div id="sharedlg" class="galleryPopBox" style="display:none; z-index:20001;">
					<div class="topbar">
						<span>조회한 통계결과  URL공유하기</span>
						<a onclick="javascript:$thematicMapFrame05.ui.doCancel('sharedlg');">닫기</a>
					</div>
					<div class="popContents">
						<ul class="listFormPop">
							<li>
								<label for="urlsubj" class="label">URL 내용 :</label>
								<input type="text" id="urlsubj" class="inp" readonly=readonly />
							</li>
							<li>
								<div style="width:100%;margin:auto 0">
									<table style="margin:auto;width:270px;height:30px;margin-top:10px" summary="URL공유하기 SNS 목록">
										<tr style="height:30px;line-height:1px;">
											<td valign="middle">
												<a href="javascript:$thematicMapFrame05.ui.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
											</td>
											<td valign="middle">
												<div id="twitterDiv" style="margin-left:25px;">
													<!-- <a class='twitter-share-button' href='//twitter.com/share' data-count='none'>twitter</a> -->
												</div>
											</td>
											<td valign="middle">
												<div id="facebookDiv"></div>
											</td>
										</tr>
									</table>
								</div>
							</li>
						</ul>
						<p class="txt">SGIS+plus 사용자간 통계조회 결과의<br />자유로운 열람이 가능합니다.</p>
						<div class="btnBox">
							<a onclick="javascript:$thematicMapFrame05.ui.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
							<a onclick="javascript:$thematicMapFrame05.ui.doCancel('sharedlg');" class="btnStyle01">닫기</a>
						</div>
					</div>
				</div>
		<!--20년수정반영 끝 (공유팝업)-->
		<!-- 북마크 팝업  -->
		<div id="bookmarkdlg" class="popBox" style="display: none; z-index: 20001;">
			<div class="topbar">
				<span>조회한 통계결과 My Page 저장하기</span> 
				<a onclick="javascript:$thematicMapFrame05.ui.doCancel('bookmarkdlg');">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<label for="savesubj" class="label">저장제목 :</label> 
						<input type="text" id="savesubj" class="inp" maxlength="100" />
					</li>
					<li id="caseInput" style="display: none;">
						<span class="label">공개여부</span> <input type="checkbox" id="openShare" />
						<label for="ckbigong" class="mr20">SGIS+plus 활용사례 공유</label>
					</li>
				</ul>
				<div id="caseHelper" style="display: none;">
					<p class="txt">
						조회결과 저장기간은 2개월 까지며,<br />조회결과 공개여부에 따라 SGIS+plus 사용자간<br />데이터의 자유로운 열람이 가능합니다.
					</p>
					<p class="txt">
						저장된 내용을 활용사례로 공유시 저장기간을 연장할 수<br /> 있습니다.
					</p>
				</div>
				<div class="btnBox">
					<a onclick="javascript:$thematicMapFrame05.ui.doDone('bookmarkdlg');" class="btnStyle01">My Page 저장</a> 
					<a onclick="javascript:$thematicMapFrame05.ui.doCancel('bookmarkdlg');" class="btnStyle01">닫기</a>
				</div>
		 	</div>
	    </div>
		
		<div id="myGalleryPop" style="display: none; z-index: 20000;" class="popBox">
			<div class="topbar">
				<span>갤러리 등록 및 즐겨찾기</span>
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<p class="txt1">
					검색한 데이터로 갤러리를 등록 하시겠습니까?<br />즐겨찾기 하시겠습니까?
				</p>
				<div class="btnBox">
					<a href="javascript:$galleryAdd.interactiveGalleryPopHide();$galleryAdd.interactiveMyGalleryDialogPopOpen();" class="btnGtype">갤러리 등록</a> 
					<a href="javascript:$thematicMapFrame05.ui.doBookMark(1, 'THEME');" class="btnGtype">즐겨찾기</a> 
					<a onclick="javascript:$('#myGalleryPop').hide();" class="btnGtype">취소</a> <!-- 2017.02.23 -->
				</div>
			</div>			
		</div>
		
		<!-- ( mask ) -->
	    <div class="deem" style="display: none;"></div> 
	    <!-- ( mask ) -->

<!-- 	</div> -->
<!-- </body> -->
</html>
