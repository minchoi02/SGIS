<%
/**************************************************************************************************************************
* Program Name  : 대화형 통계지도 JSP  
* File Name     : interactiveMap.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="ko">
	<head>
	    <meta charset="utf-8" />
	    <meta name="format-detection" content="telephone=no" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <title>정책통계지도 | 통계지리정보서비스</title>
	    
	    <link rel="stylesheet" type="text/css" href="/css/um.css" />
	    <link href="/css/common.css" rel="stylesheet" type="text/css" />
	    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	    <link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	    <link href="/css/wheelcolorpicker.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	    <link rel='shortcut icon' href='/img/ico/n_favicon.png'/> 
	  
	    <link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	    <link rel="stylesheet" href="/js/plugins/EasyTree/skin-lion/ui.easytree_new.css">
	    <link rel="stylesheet" type="text/css" href="/js/plugins/colorpicker/css/colpick.css">
	    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/policyStatic/cont_policy.css">
	    
	    <script src="/js/plugins/jquery.min.js"></script>
	    <script src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>  
	    <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>  
	    <script src="/js/plugins/colorpicker/js/colpick.js"></script>
	    <script src="/js/plugins/jquery.wheelcolorpicker.js"></script>
	    <script src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	    <script src="/js/plugins/EasyTree/jquery.easytree.js"></script> 
	    <script src="/js/plugins/colResizable-1.5.min.js"></script> 
	    <script src="/js/plugins/highcharts/highcharts.js"></script>
	    <script src="/js/plugins/highcharts/highcharts-more.js"></script>
		<script src="/jsp/pyramid/js/highchart/js/highcharts-3d.src.js"></script>
	    <script src="/js/plugins/highcharts/modules/exporting.js"></script>
	    <script src="/js/plugins/btoa.js"></script>
	    <script src="/js/plugins/highcharts/highchart.drag.js"></script>
	    
		<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	    <script src="/js/plugins/handsontable.full.js"></script>
	    
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
		<script src="/js/plugins/jquery-easyui-1.4/sop-src.sync.js"></script>
		<script src="/js/plugins/jquery.sha256.js"></script>
		<script src="/js/plugins/durian-v2.0.js"></script>
		<script src="/js/board/jquery.paging.js"></script>
		<script src="/js/common/sop.portal.absAPI.js"></script>	    
	    <script src="/js/common/map.js"></script>
	    <script src="/js/common/common.js"></script>
	    <script src="/js/common/mapNavigation.js"></script>
	    
	    <script src="/js/policyWrite/linkage/boundary.js"></script>
	    <script src="/js/policyWrite/linkage/mydata.api.js"></script>
	    <script src="/js/policyWrite/linkage/local-government.api.js"></script>
	    <script src="/js/policyStatic/policyStaticMap.js"></script>
	    <script src="/js/policyStatic/policyStaticMapDataManagement.js"></script>
	    <script src="/js/policyStatic/policyStaticMapApi.js"></script>
	    <script src="/js/policyStatic/policyStaticMapLeftmenu.js"></script>
	    <script src="/js/policyStatic/policyStaticMapDataBoard.js"></script>
	    <script src="/js/policyStatic/policyStaticSocMap.js"></script>
	    <script src="/js/policyStatic/combine.js"></script>
	    <script src="/js/policyWrite/combine.js"></script>
	    
		<script src="/js/thematicMap/thematicMap_api.js"></script>
	    <script src="/js/common/mapDraw/Draw.Feature.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Manager.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Cricle.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Rectangle.js"></script>
        <script src="/js/common/mapDraw/draw/Draw.Polygon.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Overlay.js"></script>
        <script src="/js/common/mapDraw/measure/Draw.AreaMeasure.js"></script>
        <script src="/js/common/mapDraw/measure/Draw.DistanceMeasure.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Distance.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Poi.js"></script>
        <script src="/js/common/mapDraw/poi/Poi.InteractiveMap.js"></script>
        <script src="/js/common/mapDraw/Draw.Control.Measure.js"></script>
        
        <script src="/js/board/jquery.paging.js"></script>
        <script src="/js/common/mapInfo/legendInfo.js"></script>
        <script src="/js/policyStatic/policyStaticCombineMap.js"></script>
        
        <script src="/js/plugins/imageCapture/rgbcolor.js"></script>
        <script src="/js/plugins/imageCapture/canvg.js"></script>
	    <script src="/js/plugins/imageCapture/html2canvas.js"></script>
	    <script src="/js/plugins/imageCapture/html2canvas.svg.js"></script>
	    
		<link rel="stylesheet" type="text/css" href="/css/common/left.css">
        <link rel="stylesheet" type="text/css" href="/css/common/data_board.css">
		
		<style>
			.sop-tooltip-right{width: 200px};
			.themul > li.on, .thematic > li.on{background-color:#f69834;}
			#imgMapBtn { z-index:16; border-radius: 1000px; background-color: #27435b; font-size: 12px; margin: 0 1px 0 1px; 
						color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 350px; top: 37px; margin-top: 3px; cursor: pointer;
						position: absolute; border: 0; outline: 0; left:calc(100% - 52%); display: none; }
			#imgMapDiv{ position: absolute; width:700px; height:745px; background: white; border:#27435b 3px solid; z-index: 9999; 
						left: calc(100% - 69%); top: calc(100% - 88%) };
			.helperText{
				left: 70px;
				margin: 0px;
			}
			.helperText:not(#sTitle):before {
			    position: absolute;
			    left: -14px;
			    top: 13px;
			    content: '';
			    display: block;
			    width: 10px;
			    height: 10px;
			    border: 3px solid #3985d0;
			    border-radius: 50%;
			    box-sizing: border-box;
			}		</style>
		
        <script>
        $(document).ready(function(){
        	$policyStaticMap.ui.soc_yn = true;
       		$policyStaticMap.ui.setSocInfo(null,'37');
       		
       		$(".nav-sidebar>.list_btn").hide();
       		
       		$policyStaticSocMap.ui.soc_param = JSON.parse('${soc_param}');
       		
       		$('#searchHelp').tooltip({
				open: function( event, ui ) {
					var target = $(this);
					setTimeout(function() {
						$(".ui-tooltip .subj").text(target.attr("data-subj"));
						 ui.tooltip.css("max-width", "500px");
						 ui.tooltip.css("box-shadow","0 0 7px #3B80EF");
					},100);
				},position: {
				      my: "left top", at: "right top", 
				      collision : "flip",
				      using: function( position, feedback ) {
				    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
				    		  $( this ).css( position ).prepend("<span class='subj'></span>");
				    	  }else {
				    		  $( this ).css( position ); 
				    	  }
				    	  
				          $( "<div>" )
				            .addClass( feedback.vertical )
				            .addClass( feedback.horizontal )
				            .appendTo( this );
				      }
				},
			    content: function() {
			       return $(this).prop("title");
			    }
			 });
       	});
        </script>
	</head>

	<body>  
		<div id="wrap" >
			<header>
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			<div class="containerBox">
				<div class="rela">
					<div id="imgMapDiv" style="display:none;">
						<div style="width:100%;height:32px;text-align:right;">
							<button id="imgMapClose" style="display: inline-block;width: 43px;height: 29px;background-color: #757575;border: 1px solid #515151;color: #eee;
							font-size: 13px; margin-top: 3px; margin-right: 3px;">닫기</button>
						</div>
						<img id="socImgMap" style="width:700px; height:700px; margin:10px 0px 0px 0px;" src="" alt=""/>
					</div>
					<button id="imgMapBtn">지도이미지보기</button>
					<div class="SearhTitle" id="searhTitle"></div>
					<div class="BtnAdmin">
						<span class="bnd_grid_radio" style="display:none;">
							<span onclick="javascript:$policyStaticMap.ui.mapModeSet('settlite');" class="fl" style="cursor:pointer;" title="위성">위성</span>
							<span onclick="javascript:$policyStaticMap.ui.mapModeSet('normal');" class="fr on" style="cursor:pointer;" title="일반">일반</span>
						</span>
						<!-- 2017.05.29 [개발팀] 지자체 url 추가 : 초기화 수정-->
						<a onclick="javascript:$policyStaticMap.ui.doMaxSize(1);" class="tb_sizing" style="float: left;cursor: pointer;" title="전체 화면 축소"><img src="/img/ico/ico_toolbars12.png" alt="전체 화면 확대"></a>
						<a onclick="javascript:$policyStaticMap.ui.reportDataSet();" id="reportBtn" class="tb_report" style="float: left;cursor:pointer;" title="보고서 보기" tabindex="92"><img src="${pageContext.request.contextPath}/img/ico/ico_toolbars09.png" alt="보고서출력"/></a>
	            		<!-- mng_s 20180412_김건민  -->
		            </div>
					<div class="sceneBox on" id="view1" style="width:50%">
						<div class="sceneRela">
							<div class="toolBar" style="border-top: 1px solid #D8DADE;">
								<h2>정책통계지도</h2>
								
								<!-- 2017.09.06 [개발팀] 조회기능-navi 기능 추가 및 수정 -->
								<div class="navi_title" id="naviTitle"></div>
								<select id="boundLevelTitle" title="경계레벨" class="navi_title" style="border-width:0px; padding-left:15px; padding-right:0px; width:100px; margin-left: 10px;">
								</select>
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<p class="helperText" style="left:10px !important;">
					    			<span style="font-size: 18px;vertical-align:top;font-weight:bold;">
					    				생활SOC
					    				<a href="javascript:void(0)" style="left:-10px !important;top:-5px !important;position: relative; cursor: pointer; background-color: transparent; outline: none; opacity: 1; width: 22px !important;" class="ar idxTooltip" data-subj="생활SOC" 
					    				title='“생활밀착형 사회기반시설”(이하 “생활 SOC”라 한다)이란<br>보육시설ㆍ의료시설ㆍ복지시설ㆍ교통시설<br>ㆍ문화시설ㆍ체육시설ㆍ공원 등 일상생활에서<br>국민의 편익을 증진시키는 모든 시설을 말함'>
					    					<img src="/img/ico/ico_i.gif" alt="물음표" style="margin-left:10px;margin-top:-4px;">
					    				</a>
					    			</span>
					    		</p>
					    		<p class="helperText" id="sTitle" style="left:120px !important;">
					    			왼쪽 통계메뉴 버튼을 클릭하여 지표를 선택하고 조회해보세요.
					    		</p>  
					    		<a id="helpBtn" onclick="javascript:window.open('/view/newhelp/ps_help_10_0');">이용법</a>
					    		<p style="position:absolute;left:40%;display:inline-block;line-height:30px;" id="grid_title_1"></p>
					    	</div>
					    	<div class="mapContents" id="mapRgn_1">
				    		</div>
				    		<div class="policySelectBox" style="display:none;top:70px;">
			    				<div class="policyBar">
			    					<span>조회년도 선택</span>
			    				</div>
			    				<div class="policySelectItem">
			    					<select id="policySelectBox_1" class="select yearSelectBox" title="조회년도">
			    						<option>조회년도</option>
			    					</select>
			    				</div>
			    			</div>
			    			<div class="policySelectBox" style="left:0; right: auto;top:70px;">
			    				<div class="policyBar">
			    					<span>대상지역 선택</span>
			    				</div>
			    				<div class="policySelectItem">
			    					<select class="select" style="margin-bottom: 0px;"  id="current-sido-select-2" data-type="current"  title="지역선택 시도 선택"><option>경기도</option></select>
									<select class="select" id="current-sgg-select-2" title="지역선택 시군구 선택">
										<option value="00">전체</option>
									</select>
			    				</div>
			    			</div>
			    			<div class="policySelectBox" id="fac-select-div" style="left:200px; right: auto; top:70px;">
			    				<div class="policyBar">
			    					<span>시설 선택</span>
			    				</div>
			    				<div class="policySelectItem">
			    					<select class="select" style="margin-bottom: 0px;"  id="fac-type-select-2" data-type="current"  title="시설물 유형 선택">
			    						<c:forEach items="${fac_type_list}" var="item" varStatus="status">
				    						<option value="${item.fac_ty_cd}">${item.fac_ty_nm}</option>
										</c:forEach>
			    					</select>
									<select class="select" id="fac-select-2" title="시설물 선택">
										<c:forEach items="${fac_cl_list}" var="item" varStatus="status">
				    						<option value="${item.FAC_CD}">${item.fac_cl_nm}</option>
										</c:forEach>
									</select>
			    				</div>
			    			</div>
			    			
			    			<div class="policySelectBox" id="ctgry-select-div" style="left:400px; right: auto; top:70px;">
			    				<div class="policyBar">
			    					<span>범주 선택</span>
			    					<a href="javascript:void(0)" id="searchHelp" style="top:-25px; position:relative;cursor: pointer; background:#f5f5f5;"
			    					class="ar" data-subj="&lt;거리범주표&gt;" title="&lt;div id='tbl_ctgry'&gt;&lt;table&gt;&lt;thead&gt;
		&lt;tr style='background:#f5f5f5;'&gt;&lt;td&gt;거리범주&lt;/td&gt;&lt;td&gt;교통수단별 소요시간&lt;/td&gt;&lt;/tr&gt;
	&lt;/thead&gt;
	&lt;tbody&gt;
		&lt;tr&gt;&lt;td&gt;667m&lt;/td&gt;&lt;td&gt;도보10분&lt;/td&gt;&lt;/tr>
		&lt;tr&gt;&lt;td&gt;1000m&lt;/td&gt;&lt;td&gt;도보15분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;1333m&lt;/td&gt;&lt;td&gt;도보20분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;2000m&lt;/td&gt;&lt;td&gt;도보30분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;5000m&lt;/td&gt;&lt;td&gt;대중교통 10분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;7500m&lt;/td&gt;&lt;td&gt;대중교통 15분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;11250m&lt;/td&gt;&lt;td&gt;대중교통 20분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;15000m&lt;/td&gt;&lt;td&gt;승용차 15분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;22500m&lt;/td&gt;&lt;td&gt;승용차 20분&lt;/td&gt;&lt;/tr&gt;
		&lt;tr&gt;&lt;td&gt;22500m 초과&lt;/td&gt;&lt;td&gt;승용차 20분 이상&lt;/td&gt;&lt;/tr&gt;
	&lt;/tbody&gt;
&lt;/table&gt;&lt;/div&gt;"><img src="/img/ico/ico_i.gif" alt="물음표"></a>
				    				</div>
				    				<div class="policySelectItem" style="margin-bottom:10px !important;">
			    					<select class="select" style="margin-bottom: 0px;"  id="ctgry-select-2" data-type="current"  title="거리 범주 선택">
			    						<c:forEach items="${dstnc_ctgry_list}" var="item" varStatus="status">
				    						<option value="${item.dstnc_ctgry}">${item.dstnc_ctgry_nm}</option>
										</c:forEach>
			    					</select>
			    				</div>
					    	</div>
							<select class="select_year" id="fromSelectYear" title="시작년도"></select>
					    	<div class="resizeIcon"></div>
					    	<div class="noticeTextPopup" id="noticeTextPopup01">
								<a onclick="javascript:$('#notice_mini_pop').is(':visible')?$('#notice_mini_pop').hide():$('#notice_mini_pop').show();">
								<img src="/img/new/use_notice_map.png" alt="SGIS의 공간정보서비스 특성상 실제 공표된 값과 차이가 있을 수 있으므로 유의하시기 바랍니다" /></a>
							</div>
				    	</div>
			    	</div>
			    	<div class="Btn_fuse">  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
			    		<img src="/img/common/icon_temp_sseok.png" id="mapRgn_lock_btn" alt="locked" />
						<a onclick="$policyStaticMap.ui.doCombineMap();" class="policyResultBox">  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
							<span>융합결과보기</span>  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
						</a>  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
					</div>  <!-- 2017.09.07 [개발팀] 융합기능개발  -->
			    	<div class="sceneBox" id="view2" style="display:block; width:50%">
						<div class="sceneRela">
							<div class="toolBar" style="border-top: 1px solid #D8DADE;">
							<div class="viewTitle"><span style="background:#9ed563;">VIEW 2</span></div>
								<div style="display:none;" id="mapNavi_2"></div>
								<select class="select_year" id="toSelectYear" title="년도"></select>
							</div>
							<div class="interactiveBar"></div>
					    	<div class="mapContents" id="mapRgn_2">
					    	</div>
				    		<div class="policySelectBox" style="display:none;top:70px;">
			    				<div class="policyBar">
			    					<span>조회년도 선택</span>
			    				</div>
			    				<div class="policySelectItem">
			    					<select id="policySelectBox_2" class="select yearSelectBox" title="년도">
			    						<option>조회년도</option>
			    					</select>
			    				</div>
			    			</div>
					    	<div class="resizeIcon"></div>
					    	<div class="noticeTextPopup" id="noticeTextPopup02">
							</div>
				    	</div>
			    	</div>
			    	
			    	<div class="sceneBox" id="view3" style="display:block; ">
						<div class="sceneRela">
							<div class="toolBar">
								<div class="viewTitle"><span style="background:#9ed563;">VIEW 2</span></div>
							</div>
							<div class="interactiveBar"></div>
							<iframe class="mapContents" id="view3-map" style="border:none;" title="맵컨텐츠"></iframe>
						</div>
			    	</div>
			    	
			    	<a href="javascript:void(0)" class="sideQuick sq01_01 on" id="demand" data-title="통계메뉴" data-left="115px" tabindex="93">
			    		<span>통계메뉴</span>
			    		<img src="/images/ico/ico_totalmenu.gif" alt="전체메뉴" />
			    	</a>
    				
    				
    				<div class="leftArea">
						<jsp:include page="/view/map/policyStaticMapLeftMenu"/>
			    	</div>
			    	
			    	<div id="dataBoard">
						<jsp:include page="/view/map/policyStaticMapDataBoard"></jsp:include>
					</div>
        			<div class="deem" style="display: none;"></div> 
        			
			    	<div class="combineMap" style="display:none;">
						<jsp:include page="/view/map/policyStaticCombineMap"/>
			    	</div>
				</div>
				
		    <footer id="footer">
				<jsp:include page="/view/common/includeBottom/hidden"></jsp:include>
		    </footer>
		</div>
	</body>
</html>