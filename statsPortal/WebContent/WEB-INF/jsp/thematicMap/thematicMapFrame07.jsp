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
    <script  src="/js/common/common.js"></script>
    <script  src="/js/common/mapNavigation.js"></script>
      
      
    <script  src="/js/interactive/interactiveMapBtn.js"></script>
    <script  src="/js/thematicMap/thematicEtc07.js"></script>
    <script  src="/js/thematicMap/thematicMap_api.js"></script>
    <script  src="/js/thematicMap/thematicMapFrame03_api.js"></script>
    <script  src="/js/thematicMap/thematicMapFrame07.js"></script><!-- *신규* -->
	<script   src="/js/thematicMap/map07.js"></script>
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
    <script   src="/js/interactive/kakao_script_api.js"></script><!--20년수정반영 (카카오 api 추가)-->
    <script>
    $(document).ready(
   			function() {
	    		srvLogWrite("B0","03","01","00",window.parent.$thematicMapMain.themaInfo.title,"");
      			srvLogWrite('B0','05','01','00',window.parent.$thematicMapMain.themaInfo.title,'');
   				setTimeout(function() {
   					$(".sideQuick.sq02").trigger("click");
				}, 200);		
   				
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
     		font-weight: initial;
     	}
     	table{
     		width : initial;
     	}
     	/**20년수정반영 시작 (css 추가)**/
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
    <!--20년수정반영 끝 (트위터, 페이스북 공유 관련)-->
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
<!-- 							<a href="javascript:$thematicMapFrame07.ui.mapList[0].mapNavigation.getLocation();" class="interactiveIco"><img src="/img/ico/ico_gps01.gif" alt="위치검색" /></a>  -->
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
									<!--20년수정반영 시작 (1) ~ (4)-->
									<li><a onclick="javascript:$thematicMapFrame07.ui.doMaxSize();" id="fullScreen" style="cursor: pointer;" title="전체 화면 확대" ><img src="/img/ico/ico_toolbars01.png" alt="전체 화면 확대" /></a></li><!--(1)-->   
									<!-- <li><a onclick="javascript:$thematicMapFrame07.ui.doClearMap(1);" style="cursor:pointer;" title="초기화"><img src="/img/ico/ico_toolbars02.png" alt="초기화"></a></li> --><!--(2)-->
									<li><a onclick="javascript:$thematicMapFrame07.ui.doShare(1);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/img/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li><!--(3)-->   
									<li><a onclick="javascript:$thematicMapFrame07.ui.mapImageDown();" style="cursor:pointer;" title="지도 이미지 다운로드"><img src="/img/ico/ico_toolbars13.png" alt="지도 이미지 다운로드" /></a></li>
									<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen(); javascript:srvLogWrite('B0','03','08','00',$('.helperText span').text(),'');" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/img/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
									<li><a onclick="javascript:$thematicMapFrame07.ui.reportDataSet(1); javascript:srvLogWrite('B0','03','09','00',$('.helperText span').text(),'');" style="cursor:pointer;" title="보고서 보기"><img src="/img/ico/ico_toolbars09.png" alt="보고서 보기" /></a></li>
									<li><a href="${pageContext.request.contextPath}/view/board/qnaAndRequestThema" target="_top" class="tb_mapAdd" title="주제도 신규 요청하기"><img src="/img/ico/ico_toolbars11.png" alt="주제도 요청하기"/></a></li><!--2019-03-13 박길섭 -->  
									<!--20년수정반영 끝 (1) ~ (4)-->
								</ul> 
								<a href="javascript:void(0)" class="tb_close"><img src="/img/ico/ico_winClose.gif" alt="창닫기" /></a>
							</div>
						</div>
						<div class="interactiveBar"><!-- map topbar -->
				    		<h3 class="h3 helperText textPosition">
				    			<a href="javascript:void(0)"data-subj="주제도 설명" style="margin-left: -35px">
				    				<img src="/img/ico/ico_i.gif" alt="주제도 설명"><!--박길섭 추가 -->
				    			</a>
				    		</h3>
				    	</div><!-- map topbar -->
				    	
				    	<!-- 데이터보드 -->
<!-- 				    	<a href="javascript:void(0)" class="interactiveDataBoard">데이터보드</a> -->
				    	<div class="dataSideBox" style="width:480px;">
				    		<div class="bar">
				    			<div style="position:relative;width:50px;float:left;left:240px;top:2px;"><a onclick="javascript:$thematicMapFrame07.ui.chartImageDown();" style="cursor:pointer;" title="데이터보드 이미지 다운로드"><img src="/img/ico/ico_toolbars13.png" alt="데이터보드 이미지 다운로드" /></a></div>
				    			<div id="dataSlider" class="dataSlider"></div> 
				    			<a href="javascript:void(0)"><img src="/img/ico/ico_close02.png" alt="데이터보드 닫기" /></a>
				    		</div>
				    		<div class="dataSideContents" id="container">
				    			<p class="thematicTopText">지역을 클릭하면 해당지역 증감현황을 볼 수 있습니다.</p>
					    		<div class="thematicCharts" style="width:460px;"></div>
					    		<p class="thematicBotText">출처: 통계청, 2000, 2005, 2010년 인구주택총조사</p>
				    		</div>
				    		
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
				    	<div id="mapRgn_box" style="width: 100%;height: 100%;"><!--20년수정반영 시작 (mapRgn_box)-->
				    	<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 --> 
				    	</div><!--20년수정반영 끝 (mapRgn_box)-->
				    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
				    	
			    	</div>
		    	</div>
		    	
				<!-- left menu -->
		    	<a href="javascript:void(0)" class="sideQuick sq02">
		    		<span>주제도 목록</span>
		    		<img src="/images/ico/ico_totalmenu.gif" alt="전체메뉴" />
		    	</a>
		     
<!-- 		    	<a href="javascript:void(0)" class="sideQuick sq03"> -->
<!-- 		    		<span>주제도 설정</span> -->
<!-- 		    		<img src="/img/ico/ico_jusetting.png" alt="주제도 설정" /> -->
<!-- 		    	</a> -->
		    	<div class="sqListBox sq03">
		    		<div class="sqTabs">
		    			<!-- <span>사용자 맞춤 주제도 설정</span>  -->
		    		</div>
		    		<div class="sqList">
		    			<ul>
		    				<li id="stat_sel">
		    					<span>통계선택</span>
<!-- 		    					<a href="javascript:$thematicMapFrame07.ui.changeLeftRightValue()" class="first" id="leftValue">증감틀</a> -->
<!-- 		    					<a href="javascript:$thematicMapFrame07.ui.changeLeftRightValue()" class="last" id="rightValue">CAGR</a> -->
		    					<input type="hidden" id="selectValue" value=""/>
		    				</li>
		    				<li id="region_boundary">		
		    					<span>지역경계</span>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" class="first" id="autoRegion">자동</a>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" id="sido" >시도</a>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" id="sigungu" >시군구</a>
		    					<a href="javascript:$thematicMapFrame07.Popup.show();$thematicMapFrame07.ui.mapList[0].changeRegionBound()" id="eupmyundong" class="last" >읍면동</a>
		    					<input type="hidden" id="selectValue2" value="auto"/>
		    				</li>
		    				<li id="map_type">
		    					<span>지도유형</span>
		    					<a onclick="javascript:$('.thematicTopText').show();" href="javascript:$thematicMapFrame07.ui.changeDataMode();" class="first" id="color">색상</a>
		    					<a onclick="javascript:$('.thematicTopText').hide();" href="javascript:$thematicMapFrame07.ui.changeDataMode();" class="last">버블</a>
		    					<input type="hidden" id="dataMode" value="color"/>
		    				</li> 
		    				<li id="data_type">
		    					<span>통계표출</span>
		    					<a href="javascript:$thematicMapFrame07.ui.changeDataMode2()" class="first">ON</a>
		    					<a href="javascript:$thematicMapFrame07.ui.changeDataMode2()" class="last" id="default_switch">OFF</a>
		    					<input type="hidden" id="dataMode2" value="dataOff"/>
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
		                        <li><a onclick="javascript:$thematicMapFrame07.ui.reportDataSet(1);" style="cursor:pointer;">보고서 보기</a></li>
		                        <li><a href="${pageContext.request.contextPath}/view/newhelp/su_help_10_0" target="_top">도움말 보기</a></li>
		                        <li><a href="javascript:$thematicMapFrame07.ui.doMaxSize();" id="fullScreen">전체 화면 확대</a></li>  
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
						<a onclick="javascript:$thematicMapFrame07.ui.doCancel('sharedlg');">닫기</a>
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
												<a href="javascript:$thematicMapFrame07.ui.shareToKakaoStory();" style="margin-left:10px;"><img src="/img/im/kakao.png" alt="카카오스토리"></a>
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
							<a onclick="javascript:$thematicMapFrame07.ui.doDone('sharedlg');" class="btnStyle01">URL 복사하기</a>
							<a onclick="javascript:$thematicMapFrame07.ui.doCancel('sharedlg');" class="btnStyle01">닫기</a>
						</div>
					</div>
				</div>
		<!--20년수정반영 끝 (공유팝업)-->
		<!-- 북마크 팝업  -->
		<div id="bookmarkdlg" class="popBox" style="display: none; z-index: 20001;">
			<div class="topbar">
				<span>조회한 통계결과 My Page 저장하기</span> 
				<a onclick="javascript:$thematicMapFrame07.ui.doCancel('bookmarkdlg');">닫기</a>
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
					<a onclick="javascript:$thematicMapFrame07.ui.doDone('bookmarkdlg');" class="btnStyle01">My Page 저장</a> 
					<a onclick="javascript:$thematicMapFrame07.ui.doCancel('bookmarkdlg');" class="btnStyle01">닫기</a>
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
					<a href="javascript:$thematicMapFrame07.ui.doBookMark(1, 'THEME');" class="btnGtype">즐겨찾기</a> 
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