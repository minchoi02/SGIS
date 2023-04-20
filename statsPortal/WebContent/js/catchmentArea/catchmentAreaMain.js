/**
 * 생활권역서비스 화면에 대한 클래스
 * 
 * history : 2020/06/16 초기 작성 version : 1.0 see : 원형(/js/interactive/interactiveMap.js)
 * 
 */
(function(W, D) {
	W.$catchmentAreaMain = W.$catchmentAreaMain || {};

	$(document).ready(
		function() {
			//튜토리얼 쿠키세션

			var cookiedata = document.cookie; 
			if ( cookiedata.indexOf("layerCookie=done") < 0 ){ 
//				$('.tutorial_wrap').show();
			} else {
				$('.tutorial_wrap').hide();
			}
			//튜토리얼
			if($(location).attr('search').match("tutorial_mode")){
				$('.tutorial_wrap').hide();
				readyTutorial();
			}

			//SGIS4_생활권역 시작
			//SGIS4_1025_생활권역 시작
			$('#searchInfo,  #myDataInfo, #sisulInfo, #AreaInfo, #srvAreaInfo, #gridInfo, #gridDataBordInfo, #gridDataBordStatsInfo, #catchmentHelpBtn, #gridDataBordInfo02, #whAraDtlInfo, #myDataInfo').tooltip({
			//SGIS4_1025_생활권역 끝
			//SGIS4_생활권역 끝	
				open: function( event, ui ) {
					var target = $(this);
					setTimeout(function() {
						$(".ui-tooltip .subj").text(target.attr("data-subj"));
						 ui.tooltip.css("max-width", "500px");
						 ui.tooltip.css("box-shadow","0 0 7px #3B80EF");
						 if(target.attr("data-subj") == "격자 단위 통계정보" || target.attr("data-subj") == "영역 전체 총 값"){
							 ui.tooltip.css("top", event.clientY + 15);
						 }
					},100);
					
				},position: {
				      my: "left+10 top", at: "right top", 
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
			       return $(this).prop('title');
			    }
			 });
			 
			$(".scroll_wrap").mCustomScrollbar();  //스크롤바 라이브러리 호출
			$catchmentAreaMain.ui.createMap("mapRgn_1", 0);
			$catchmentAreaMain.ui.createMap("mapRgn_3", 2);//보고서용 맵
			$catchmentAreaMain.ui.initializeUI('');
			$catchmentAreaMain.event.setUIEvent();
			// 추가 요청(REQ001) 시작 - 생활권역 통계지도 도움말 생성, 이벤트 추가
			// 20210504 김건민 - 팝업창 움직이게 수정함.
			$('#catchmentHelpBtn').on('click',function(e){
				e.preventDefault();
				$('#catchmentHelpPopup').addClass('active');
				$('#catchmentHelpPopup').draggable();
			});
			// 추가 요청(REQ001) 끝 - 생활권역 통계지도 도움말 생성, 이벤트 추가
			
			$("#reportListAll").click(function(){
				if( $("#reportListAll").is(':checked') ){
			        $("input[name=reportRange]").prop("checked", true);
			      }else{
			        $("input[name=reportRange]").prop("checked", false);
			      }
			});
	});
	
	$catchmentAreaMain = {
			noReverseGeoCode : false
	};
	
	$catchmentAreaMain.ui = {
			namespace : "catchmentAreaMain",
			searchBtnType : "normal",
			mapList : [],
			curBtnId : '',
			curMapId : 0,
			isInnerMapShow : false,
			curDropParams : [],
			combinePopup : null,
			buildPopup : null,
			reportPopup : null,
			dropBtnInfo : [],
			dataTypeList : [],
			tutoIndex : 0,
			toolTipTitle : "",		// 툴팁 N/A 처리용
			toolTipUnit : "",		// 툴팁 N/A 처리용
			isShare : false,		// 공유된 정보 유무
			shareData : [],			// 공유된 정보 데이터
			selTypeFlag : true,		// 처음 한번만 카운트
			searchMarker : null,	// 생활권역서비스 검색에 의한 마커
			bookmarkType : null,	// 생활권역서비스 통합 검색에 의한 총조사 주요지표 처리를 위한 변수
			bookmarkData : null,	// 생활권역서비스 통합 검색에 의한 총조사 주요지표 처리를 위한 변수
			isUsingOA : true,
			//SGIS4_1027_생활권역 시작
			statsBaseYear01 : ["2020", "2019", "2018", "2017", "2016", "2015"],	// 인구,가구,주택에 대한 통계년도		["2019", "2018", "2017", "2016", "2015"]
			//SGIS4_1027_생활권역 끝
			statsBaseYear02 : ["2019","2018", "2017", "2016"],	// 사업체,종사자에 대한 통계년도			
			statsBaseYear03 : ["2019"],		// 공시지가
			selBaseYear : "",
			classDeg : 10,	// 산업분류 "10" 차
			isReportShow : false,
			isReportType : "",
			reportRangeText : "",
			reportSelectRange : 0, //보고서 출력시 선택한 범위 갯수
			reportSelectIndex : [],
			saShpColor : ["#EF595C", "#8481E8", "#60BC4C", "#FFAA01"],		// ["#0070C0", "#D887E8", "#70AD47", "#FFAA01"]		//FFC6D7, FFC6D7, D6FFC6, E7CF70
			maxAreaUsing100mGrid : 30000000,	// 30㎢
			//SGIS4_1028_생활권역 시작
			maxAreaUsingService : 150000000,	// 150㎢
			//SGIS4_1028_생활권역 끝
			caSelectedLayer : null,//SGIS4_1210_선택된 통계폴리곤
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 김성현
			 * @history 	 :
			 */
			createMap : function(id, seq) {
				var map = new sMap.map();
				map.createMap($catchmentAreaMain, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("drop", {accept : ".dragItem"});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");
				map.addControlEvent("click");
								
				//범례 호출 함수 
				var legend = new cLegendInfo.catchmentAreaLegendInfo(map);			
				legend.initialize($catchmentAreaMain.ui);
				map.legend = legend;
				//legend.createLegend();
				legend.legendType = "auto";				
				//작업부분 끝
				
				//var btnInfo = new interactiveMapBtnInfo.btnInfo(map, $catchmentAreaMain.ui);
				var btnInfo = new catchmentAreaBtnInfo.btnInfo(map, $catchmentAreaMain.ui);
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					catchmentArea : true
				});	
				
				map.itemtext = '';
				//사용자지정컨트롤설정
				this.mapList[seq] = map;

				map.gMap.whenReady(function() {
					map.createHeatMap();
				});

				return map;
			},
			
			getMap : function(seq) {
				var map;
				if(seq != undefined && seq != null){
					map = this.mapList[seq];
				}else{
					map = this.mapList[this.curMapId];
				}
				
				return map;
			},
			
			/**
			 * 
			 * @name         : initializeUI
			 * @description  : 초기정보를 설정한다.
			 * 
			 */
			initializeUI : function(flag) {
				$("#btnReport").hide();
			},
			
			/**
			 * 
			 * @name         : clearUI
			 * @description  : 화면을 정리한다.
			 * 
			 */
			clearUI : function(pParamObj) {
				// pParamObj.pageNo : 왼쪽메뉴의 화면 번호 (1-첫화면, 2-시설유형 목록 화면, 3-영역설정 화면, 4-통계 화면)
				var paramObj = {};
				if(pParamObj !== undefined && pParamObj !== null){
					paramObj = pParamObj;
				}
				
				this.selBaseYear = "";
				
				// POI 마커(선택창 포함) 및 생활권역 도형 지우기
				var loopCnt = this.mapList.length;
				var map;
				for(var i=0; i<loopCnt; i++){
					map = this.mapList[i];
					if(map !== undefined && map !== null){
						if(paramObj["pageNo"] !== "3"){
							map.markers.clearLayers(); 	//마커(선택창 포함)
						}
						map.markers2.clearLayers();	//반경
						map.markers3.clearLayers();	// 시설유형 마커
	
						if(map.id === 0) {
							$catchmentAreaMain.draw.removePolygon();	//지도1 생활권역 도형
						}else if(map.id === 1) {
							$catchmentAreaMain.draw2.removePolygon();	//지도2 생활권역 도형
						}
						
						map.clearToolTip();
						map.clearDataOverlay();						
					}
				}
				
				$(".sop-pane.sop-infowindow-pane").empty(); //마커 정보창 닫기
			},
			
			/**
			 * 
			 * @name         : resetUI
			 * @description  : 화면을 정리한다.
			 * 
			 */
			resetUI : function(pIdentifier) {
				// pIdentifier : 정리 대상을 감싸는 부모요소(id이면 #, class이면 . 붙여서 넘길 것)
				// 현재는 영역 내 전체 정보에서만 사용중
				
				var $resetTxtTgt = $(pIdentifier).find('[data-reset]');
				$.each($resetTxtTgt, function(index, item){
					$(item).html($(item).attr('data-reset'));	
				});
				
				var $resetChtTgt = $(pIdentifier).find('.reset.chart');
				$.each($resetChtTgt, function(index, item){
					if($(item).highcharts() !== undefined && $(item).highcharts() !== null){
						$(item).highcharts().destroy();
					}
					
					var chtId = $(item).attr('id');
					$catchmentAreaDataBoard.ui.createEmptyOnePieChart(chtId);					
				});
				
//				$(pIdentifier + ' .reset.chart').highcharts().destroy();
//				$(pIdentifier + ' .reset.number').html('0');
//				$(pIdentifier + ' .reset.text').html('');				
			},
			
			/**
			 * 
			 * @name         : 	isMap2SearchMarkerExist
			 * @description  : 	지도2위에 현재 검색 마커가 존재하는지를 체크한다. 없다면 null을, 있다면 Marker 객체를 가져온다.
			 * 
			 */
			getMap2SearchMarker : function() {
				var map = $catchmentAreaMain.ui.getMap(1);
				if(!map) {
					//console.error('지도2 자체가 없습니다');
					return null;
				}
				
				if($catchmentAreaLeftMenu.ui.map2SearchMarker) {
					return map.markers.getLayer($catchmentAreaLeftMenu.ui.map2SearchMarker._sop_id);
				}
				return null;
			},
			
			
			adjustUI : function(flag) {
				
				var sceneLen = $(".sceneBox.on").length;				
				for (var i = 0; i < sceneLen; i++) {					
					$(".main_btn_right").eq(i).stop().animate({"right":"10px"}, 200);
				}
				
				var popStatsLen = $(".pop_statistics").length;
				var isOpen = false;
				var popWdh = 0;
				for (var x = 0; x < popStatsLen; x++) {					
					if($(".pop_statistics").eq(x).css("display") != "none"){
						isOpen = true;
						popWdh = $(".pop_statistics").eq(x).width(); 
					}
				}
				
				if(isOpen){
					var rOffset = "509px";
					if(popWdh > 0){
						rOffset = (popWdh + 17) + "px";
					}
					$(".main_btn_right").eq(sceneLen-1).stop().animate({"right":rOffset}, 200);
				}				
			},
			
			/**
			 * 
			 * @name         : doToggleMap
			 * @description  : 맵 추가/삭제 여부를 결정한다.
			 * @history 	 :
			 */
			doToggleMap : function(options) {

				//SGIS4_1025_생활권역 시작
	    //		if($('.search_wrap.statistics').hasClass('active') && $('#statsType03 > .more').hasClass('active') && ($('#detailedAnal01').hasClass('active') || $('#detailedAnal02').hasClass('active') )){
	   			if($('.search_wrap.statistics').hasClass('active') && $('#gridDataType03.on').hasClass('active') && ($('#detailedAnal01').hasClass('active') || $('#detailedAnal02').hasClass('active') )){ //SGIS4_생활권역_상세분석 상세분석일 경우 맵 나누는 조건 수정
	   			//SGIS4_1025_생활권역 끝
	    			$catchmentAreaMain.ui.doAddMap(null,options);
	    			
	    			if($('#detailedAnal01').hasClass('active')){
	    				$(".divs_wrap01 > .divs02").hide();
	    				$(".divs_wrap02 > .divs02").hide();	    				
	    				$(".divs_wrap01 > .divs01").show();
	    				$(".divs_wrap02 > .divs01").show();	    				
	    			}else if($('#detailedAnal02').hasClass('active')){
	    				$(".divs_wrap01 > .divs01").hide();
	    				$(".divs_wrap02 > .divs01").hide();	    				
	    				$(".divs_wrap01 > .divs02").show();
	    				$(".divs_wrap02 > .divs02").show();	    				
	    			}
	    		}else{
	    			$catchmentAreaMain.ui.doRemoveMap(2);
	    			
    				$(".divs_wrap01 > .divs01").hide();
    				$(".divs_wrap01 > .divs02").hide();	    				
    				$(".divs_wrap02 > .divs01").hide();
    				$(".divs_wrap02 > .divs02").hide();
	    		}
			},
			
			/**
			 * 
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @history 	 :
			 */
			doAddMap : function(type, options) {
				
				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
				var createMapId, updateId;

				if (isMap1ContentShow & isMap2ContentShow) {
					return;
				}
				
				//표출된 맵뷰에 따른 플래그 설정
				createMapId = 1;
				updateId = 4;

				var sceneLen = $(".sceneBox.on").length; 
				$(".sceneBox").eq(createMapId).show().addClass("on");
				if(sceneLen==1){ 
					$(".sceneBox").stop().animate({"width":"50%"},200, function() {
						for (var i=0; i<$catchmentAreaMain.ui.mapList.length; i++) {
							if ($catchmentAreaMain.ui.mapList[i] != null) {
								$catchmentAreaMain.ui.mapList[i].update();
							}
						}
					});
					$(".sceneRela").css({"border-left":"2px solid #213967"});
					$(".sceneRela").eq(0).css({"border-left":"0"});
				}

				//지도생성
				var map = this.createMap("mapRgn_" + (createMapId+1), createMapId); //9월 서비스
			
				//기존지도정보 복사
				switch(updateId) {
					case 4:
						this.mapList[1].mapMove(this.mapList[0].center, this.mapList[0].zoom);
						break;
				}
				
				// 테스트 (시작) - 박상언
				if(options && options.isDetailYear) {	// 상관분석 갔다가 시간 분석으로 왔을 때!
					var xCoor = $catchmentAreaLeftMenu.ui.selectCoordinate_x;
					var yCoor = $catchmentAreaLeftMenu.ui.selectCoordinate_y;
					$catchmentAreaLeftMenu.ui.creatSimpleSearchMarker(xCoor, yCoor, 1);
					if(options.callbackFunc) {
						options.callbackFunc.call(null,xCoor,yCoor);
					}
				} else if(options && options.isDetailSpatial) {	// 상관분석 갔다가 공간 분석으로 왔을 때!
					// 후에 필요한 코드 추가
					if(options.callbackFunc) {
						//options.callbackFunc.call(null)
					}
				}
				// 테스트 (끝) 
				
				$(".tb_close").show();
				
				$catchmentAreaMain.ui.adjustUI();
			},

			/**
			 * 
			 * @name         : doRemoveMap
			 * @description  : 맵을 삭제한다.
			 * @history 	 :
			 */
			doRemoveMap : function(type) {

				var isMap1ContentShow =  $("#mapRgn_1").is(":visible");
				var isMap2ContentShow =  $("#mapRgn_2").is(":visible");

				if (isMap1ContentShow & !isMap2ContentShow) {
					return;
				}
				
				this.doClearMap(type, true);
				this.curMapId = parseInt(type)-1;
				if (this.mapList[this.curMapId] !== undefined) {
					this.mapList[this.curMapId].gMap.remove();
					this.mapList[this.curMapId] = null;
				}				

				$(".sceneBox").eq(this.curMapId).removeClass("on").hide();
				var sceneLen = $(".sceneBox.on").length;  
				if(sceneLen==1){
					$(".sceneBox").stop().animate({"width":"100%"},200, function() {
						for (var i=0; i<$catchmentAreaMain.ui.mapList.length; i++) {
							if ($catchmentAreaMain.ui.mapList[i] != null) {
								$catchmentAreaMain.ui.mapList[i].update();
							}
						}
					});
				}
				
				//표출된 맵뷰에 따른 플래그 설정
				this.curMapId = 0;

				/* 확인 후 필요시 해제
				$mydataDataBoard.ui.delegateSetting($catchmentAreaMain.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($catchmentAreaMain.ui);			//공공데이터 세팅				
				*/
				
				$catchmentAreaMain.ui.adjustUI();
			},

			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.
			 * @history 	 :
			 */
			doClearMap : function(type, isStatsInfoClear, callYN) {
				
				// 개발하면서 필요한거 추가~~~~~~~~~~~~~~~~~~~~~
				
			},

			/**
			 * 
			 * @name         : searchMarkerClear
			 * @description  : 검색에 의한 마커를 제거한다.
			 * @history 	 :
			 */
			searchMarkerClear : function() {
				if($catchmentAreaMain.ui.searchMarker != null){
					$catchmentAreaMain.ui.searchMarker.remove();
				}
			},

			/**
			 * 
			 * @name         : getBaseYear
			 * @description  : 통계 기준년도를 구한다.
			 * @history 	 :
			 */
			getBaseYear : function(pSelGb) {
				// pSelGb: 1-영향권(인구/가구/주택), 2-영향권(사업체/종사자), 3-격자, 4-상세분석, 5-상관관계 분석
				var rstYear = "";
				if(pSelGb == "1"){
					rstYear = $("#bYearSel01 option:selected").val();
				}else if(pSelGb == "2"){
					rstYear = $("#bYearSel02 option:selected").val();
				}else if(pSelGb == "3"){
					rstYear = $("#bYearSel06 option:selected").val();
				}else if(pSelGb == "4"){
					rstYear = $("#bYearSel06 option:selected").val(); //SGIS4_1025_생활권역_상세정보 상세분석 년도를 격자에 있는 년도 사용해서 수정
				}else if(pSelGb == "5"){
					rstYear = $("#bYearSel05 option:selected").val();
				}
				
				return rstYear;
				/*
				 * function(gb, type, curYear) {
				// gb: 1-인구/가구/주택, 2-사업체/종사자
				// type: P-이전 년도, N-다음 년도, L-최근 년도
				var rstYear = "";
				var curIdx = -1;
				var rstIdx = -1;				
				var statsAry = null;
				
				if(gb == "2"){
					statsAry = $catchmentAreaMain.ui.statsBaseYear02; 
				}else{
					statsAry = $catchmentAreaMain.ui.statsBaseYear01; 
				}

				rstYear = statsAry[statsAry.length - 1];		// 최근 기준년도(기본값)
				
				if(type == "P" || type == "N"){
					curIdx = statsAry.indexOf(curYear);
					if(curIdx != -1){
						if(type == "P"){
							rstIdx = curIdx - 1;
							if(rstIdx < 0){
								rstIdx = 0;
							}
						}else if(type == "N"){
							rstIdx = curIdx + 1;
							if(rstIdx >= statsAry.length){
								rstIdx = statsAry.length - 1;
							}
						}
						
						rstYear = statsAry[rstIdx];
					}
				}

				return rstYear;
				*/
			},

			/**
			 * 
			 * @name         : getCodeData
			 * @description  : 코드 정보를 요청한다.
			 * @history 	 :
			 */
			getCodeData : function(pParam) {
				var params = $catchmentAreaMain.ui.reqSetParams("API_202093", pParam);
				$catchmentAreaMain.ui.requestOpenApi(params);
			},
			
			/**
			 * 
			 * @name         : setCodeData
			 * @description  : 코드 정보를 처리한다.
			 * @history 	 :
			 */
			setCodeData : function(pRst, pOpt) {
				
				var processGb = pOpt.codeInfo.processGb;
				if(processGb != undefined && processGb != null){
					var elemId = pOpt.codeInfo.elemId;
					if(processGb == "sel"){
						$(elemId).empty();
						$(elemId).append('<option value="">선택하세요</option>');
						
						$.each(pRst, function(index, item){							
							$(elemId).append('<option value="' + item.s_class_cd + '">' + item.s_class_cd_nm + '</option>');
						});
					}
					
					// 필요 시 추가 else if
					
				}
			},

			/**
			 * 
			 * @name         : processWithStoredInfo
			 * @description  : 저장된 통계정보로 화면을 꾸민다.
			 * @history 	 :
			 */
			processWithStoredInfo : function(pGb, pStoredData) {
				// pGb : S01-통계정보(전체 정보 > 기본정보 보기), S02-통계정보(전체 정보 > 특성별 통계 보기), S03-통계정보(격자 분포)
				
				var stoData = pStoredData;
				if(pGb == "S01"){
					$catchmentAreaDataBoard.ui.setServiceAreaStatisticsData(stoData.data.result, stoData.opt);
				}else if(pGb == "S02"){
					$catchmentAreaDataBoard.ui.setCharacteristicsStatsData(stoData.data.result, stoData.opt);				
				}else if(pGb == "S03"){
					
				}
			},

			/**
			 * 
			 * @name         : getGridLevel
			 * @description  : 생활권역 영역 면적에 따른 서비스 제공 격자를 반환한다.
			 * @history 	 :
			 */
			getGridLevel : function(pArea) {

				var gLvl = "";
				var shpArea = Number(pArea);
				if(shpArea <= $catchmentAreaMain.ui.maxAreaUsing100mGrid){		// 30㎢
					gLvl = "100m";
				}else{
					gLvl = "500m";
				}
				
				return gLvl;
			},

			/**
			 * 
			 * @name         : getGridLevelToDisplay
			 * @description  : 생활권역 영역 면적에 따른 화면에 표시할 격자 목록을 반환한다.
			 * @history 	 :
			 */
			getGridLevelToDisplay : function(pArea) {
				
				var gLvlMap = {};	// 사용 시 (min 이상 , max 이하)
				
				var shpArea = Number(pArea);
				if(shpArea <= 10000000){			// shpArea <= 10㎢
					gLvlMap.min = 0;
					gLvlMap.max = 1000;
				}else if(shpArea > 10000000 && shpArea <= 30000000){		// 10㎢ < shpArea <= 30㎢
					gLvlMap.min = 0;
					gLvlMap.max = 10000;
				}else if(shpArea > 30000000 && shpArea <= 100000000){		// 30㎢ < shpArea <= 100㎢
					gLvlMap.min = 101;
					gLvlMap.max = 100000;
				//SGIS4_1028_생활권역 시작	
				}else if(shpArea > 100000000 && shpArea <= 150000000){		// 100㎢ < shpArea <= 150㎢
					gLvlMap.min = 101;
					gLvlMap.max = 100000;
				}else if(shpArea > 150000000){		// shpArea > 150㎢
					gLvlMap.min = 501;
					gLvlMap.max = 100000;
				}
				//SGIS4_1028_생활권역 끝
				
				return gLvlMap;
				
				// 면적에 따른 특정 그리드만 
				/*
				var gLvls = [];
				var shpArea = Number(pArea);
				if(shpArea <= 10000000){			// shpArea <= 10km2
					gLvls.push("100m");
				}else if(shpArea > 10000000 && shpArea <= 50000000){		// 10km2 < shpArea <= 50km2
					gLvls.push("100m");
					gLvls.push("500m");
				}else if(shpArea > 50000000 && shpArea <= 100000000){		// 50km2 < shpArea <= 100km2
					gLvls.push("500m");
					gLvls.push("1k");
				}else if(shpArea > 100000000){		// shpArea > 100km2
					gLvls.push("1k");
				}
				
				return gLvls;
				*/
			},

			/**
			 * 
			 * @name         : adjustRangeValue
			 * @description  : 주행시간은 3.6초, 주행거리는 50m 축소하여 생활권역 영역 설정
			 * @history 	 :
			 */
			adjustRangeValue : function(pGb, pVal) {
				// pGb : T-주행시간, D-주행거리
				var rstVal = pVal;
				
				if(pGb == "T" || pGb == "D"){
					var corrVal = 4; 
					if(pGb == "D"){
						corrVal = 50;
					}
					
					if(rstVal instanceof Array){
						rstVal = rstVal.slice();
	    				var loopCnt = rstVal.length;
	    				for(var i=0; i<loopCnt; i++){
	    					if(typeof rstVal[i] === 'string'){
	    						rstVal[i] = String(Number(rstVal[i]) - corrVal);
	    					}else if(typeof rstVal[i] === 'number'){
	    						rstVal[i] = rstVal[i] - corrVal;
	    					}	    					
	    				}						
					}else{
    					if(typeof rstVal === 'string'){
    						rstVal = String(Number(rstVal) - corrVal);
    					}else if(typeof rstVal === 'number'){
    						rstVal = rstVal - corrVal;
    					}						
					}
				}
				
				return rstVal;
			},

			/**
			 * 
			 * @name         : restoreRangeValue
			 * @description  : 축소하였던 범위값 원복
			 * @history 	 :
			 */
			restoreRangeValue : function(pGb, pResData) {
				// pGb : T-주행시간, D-주행거리
				var resData = pResData; 
				if(resData === undefined || resData === null){
					return;
				}
				
				if(pGb == "T" || pGb == "D"){
					var corrVal = 4; 
					if(pGb == "D"){
						corrVal = 50;
					}
					
					if(resData.hasOwnProperty('saPolygons') && resData.saPolygons.hasOwnProperty('features')){
						var features = resData.saPolygons.features;
						$.each(features, function(index, item){							
							features[index].attributes.ToBreak = features[index].attributes.ToBreak + corrVal;
							if(features[index].attributes.FromBreak !== 0){
								features[index].attributes.FromBreak = features[index].attributes.FromBreak + corrVal;
							}							
						});
					}
				}				
			},
			
			/**
			 * 
			 * @name         : requestOpenApi
			 * @description  : 통계정보를 요청한다.
			 * 
			 */
			requestOpenApi : function(options, complexOption) {
				
				console.log("[catchmentAreaMain.js] requestOpenApi() 호출");

				var api_id = typeof options === 'string' ? options : options.api_id;
				
				console.log("[catchmentAreaMain.js] requestOpenApi() api_id [" + api_id);
				
				if 	    (api_id == "API_202001") $catchmentAreaMainApi.request.openApiTestStats(options);
				else if (api_id == "API_202013") $catchmentAreaMainApi.request.reportSrvAreaStats(options);
				else if (api_id == "API_202014") $catchmentAreaMainApi.request.reportGridAreaStats(options);
				else if (api_id == "API_202093") $catchmentAreaMainApi.request.getCodeList(options);
				else if (api_id == "API_202094") $catchmentAreaMainApi.request.getCharacteristicsStats(options);
				else if (api_id == "API_202095") $catchmentAreaMainApi.request.getCorrelationAnalysis(complexOption);
				//SGIS4_1025_생활권역 시작
				else if (api_id == "API_202098") $catchmentAreaMainApi.request.getCharacteristicsStatsTot(options);
				//SGIS4_1025_생활권역 끝
				
				pageCallReg();		// 페이지 호출통계
			},
			
			/**
			 * 
			 * @name         : reqSetParams
			 * @description  : 통계정보 파라미터를 설정한다.
			 * 
			 */
			reqSetParams : function (api_id, tmpParam) {
				var params = {
						/*
						param : tmpParam.params,
						noneParams : tmpParam.noneParams,
						filter : tmpParam.filterParam,
						unit : tmpParam.unit,
						title : tmpParam.title,
						map : map,
						features : features,
						*/
						api_id : api_id,
						area : tmpParam.area,
						srvAreaType : tmpParam.srvAreaType,
						radius : tmpParam.radius,
						workGb : tmpParam.workGb,
						async : tmpParam.async,
						base_year : tmpParam.base_year,
						copr_base_year : tmpParam.copr_base_year,
						rangeType : tmpParam.rangeType,
						rangeVal : tmpParam.rangeVal,						
						index : tmpParam.index,
						indexText : tmpParam.indexText,
						classDeg : tmpParam.classDeg,
						grid_level : tmpParam.grid_level,
						grid_level_nm : tmpParam.grid_level_nm,
						statType : tmpParam.statType,
						gender : tmpParam.gender,
						//ageCd : tmpParam.ageCd,
						ageFromCd : tmpParam.ageFromCd,
						ageToCd : tmpParam.ageToCd,
						householdType : tmpParam.householdType,
						rd_resid_type : tmpParam.rd_resid_type,
						ksic_3_cd : tmpParam.ksic_3_cd,
						grdstatType : tmpParam.grdstatType,
						const_year : tmpParam.const_year,
						house_area_cd : tmpParam.house_area_cd,
						schCondNm : tmpParam.schCondNm,
						unit : tmpParam.unit,
						identifier : tmpParam.identifier, 
						// 특성별 통계용
						pops_cond : tmpParam.pops_cond,
						family_cond : tmpParam.family_cond,
						house_cond : tmpParam.house_cond,
						copr_cond : tmpParam.copr_cond,
						employee_cond : tmpParam.employee_cond,
						pops_cond_nm : tmpParam.pops_cond_nm,
						family_cond_nm : tmpParam.family_cond_nm,
						house_cond_nm : tmpParam.house_cond_nm,
						copr_cond_nm : tmpParam.copr_cond_nm,
						employee_cond_nm : tmpParam.employee_cond_nm,
						sufid : tmpParam.sufid,
						rangeCd : tmpParam.rangeCd,						
						// 코드 조회용
						codeInfo : {
							processGb : tmpParam.processGb,			// sel:선택박스 처리
							elemId : tmpParam.elemId,
							bClassCd : tmpParam.bClassCd,
							sClassCd : tmpParam.sClassCd,
							cdExp : tmpParam.cdExp
						//SGIS4_1025_생활권역 시작	
						},
						stats_class_gb : tmpParam.stats_class_gb // 특성별 통계용_단위별 구분(인구)
						//SGIS4_1025_생활권역 끝
				};
				
				return params;				
			},
			
			/**
			 * 
			 * @name         : getMarkerUTMK
			 * @description  : 마커가 그려진 위치정보(UTMK = 좌표)를 읽어온다.
			 * @parameter	 : mapList에 들어갈 것들이다.
			 * 
			 */
			/*getMarkerUTMK: function(mapId) {
				mapId = mapId ? mapId : 0;
				var map = this.mapList[mapId];	// 지도 정보 가져오기, 실제 객체는 sMap 객체다.
				var layer = map.markers.getLayers()[0];
				if(!layer) {
					console.error('현재 원하시는 지도에 마커가 그려져 있지 않습니다');
					return null;
				}
				return layer.getUTMK();	// sop.UTMK 타입의 객체가 온다. 속성으로 x, y 값이 있다.
			}*/
			
			/**
			 * @name         : getReport
			 * @description  : 보고서 생성
			 */
			getReport : function() {
				if(!$catchmentAreaMain.ui.isReportShow){
					messageAlert.open("알림", "보고서 출력은 통계조회 후 이용할 수 있습니다.");
					return;
				}
				
				if($catchmentAreaLeftMenu.ui.leftMenuToggleSave == "gridDataType03"){
					messageAlert.open("알림", "상세분석은 보고서 출력을 이용할 수 없습니다.");
					return;
				}

				//팝업창 초기화
				$("#typeText").text("");
				$("#chooseList").html("");
				
				$catchmentAreaMain.ui.reportRangePopup();
				$('#block_containerBox').show();
			},
			
			reportRangePopup : function(){
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var selectLength = $("#statsType01 ul").children("li").size();
				var typeText = "";
				var reportTitle ="";
				var warnigHtml = "";
				var checkInt = $catchmentAreaDataBoard.ui.selectIndex-1;
				
				if(rangeType == "stats01"){
					typeText = "주행시간 기준";					
				}else if(rangeType == "stats02"){
					typeText = "주행거리 기준";
				}else{
					typeText = "반경 기준"				
				}
				
				var html = "<ul>";
				if($catchmentAreaMain.ui.isReportType == "srv"){
					reportTitle = "보고서 출력(영역 내 전체 정보)";
					warnigHtml += "<p style='font-size:13px;margin-bottom:2px;'>* 선택 개수 및 범위에 따라 보고서 작성이 오래 걸릴 수 있습니다.</p>"
					//warnigHtml += "<p style='font-size:13px;margin-bottom:2px;'>* 시범 서비스에서는 최대 2개까지만 선택 가능합니다.</p>"
						
					for(var i=0; i<selectLength; i++){
						html += "<li class='btnList'>"
						if(checkInt == i){
							html += "<input type='checkbox' name='reportRange' data-index = "+i+" data-name='"+$("#statsType01 > ul > li").eq(i).find('a').text()+"' checked/>"
						}else{
							html += "<input type='checkbox' name='reportRange' data-index = "+i+" data-name='"+$("#statsType01 > ul > li").eq(i).find('a').text()+"'/>"
						}
						html += 	"<a>"+$("#statsType01 > ul > li").eq(i).find('a').text()+"</a>"
						html += "</li>"
					}
				}else{
					reportTitle = "보고서 출력(격자 분포)";
					for(var i=0; i<selectLength; i++){
						if($("#statsType01 > ul > li").eq(i).find('a').text() == $("#statsType02 > ul").children('.active').find('a').text()){
							html += "<li class='btnList'>"
							html += 	"<input type='checkbox' name='reportRange' data-index = "+i+" data-name='"+$("#statsType01 > ul > li").eq(i).find('a').text()+"' checked/>"
							html += 	"<a>"+$("#statsType01 > ul > li").eq(i).find('a').text()+"</a>"
							html += "</li>"
						}
					}
				}
				html += "</ul>"

				$("#reportTitle").text(reportTitle);
				$("#warnigText").html(warnigHtml);
				$("#typeText").text(typeText);
				$("#chooseList").html(html);
				$("#reportRangePopup").show();
			},
			
			setReport : function(){
				var tempText = "";
				var tempIndex = [];
				//index 값 구하기
				if($("input:checkbox[name=reportRange]").is(":checked") == true) {
					$catchmentAreaMain.ui.reportSelectRange = $("input:checkbox[name=reportRange]:checked").length;
					//if($catchmentAreaMain.ui.reportSelectRange > 2){messageAlert.open("알림", "최대 2개까지만 선택 가능합니다."); return false;}
					
					$("input[name=reportRange]:checked").each(function(i){
						var index = parseInt($(this).attr('data-index'))+1;
						var indexText = $(this).attr('data-name');
						tempIndex.push(index);
						if($catchmentAreaMain.ui.isReportType == "srv"){
							$catchmentAreaMain.ui.requstSrvAreaReportData(index, indexText); //영향권 통계조회
						}else{
							$catchmentAreaMain.ui.requstGridAreaReportData(indexText); //격자 통계조회
						}
							tempText += indexText + " ";
					});
				
				//지도 그리기...
				if($catchmentAreaMain.ui.isReportType == "srv"){
					//생활권역 다시 그림
					$catchmentAreaMain.ui.setReportMap(tempIndex, $catchmentAreaLeftMenu.ui.getRangeType());
				}else{
					$catchmentAreaMain.ui.setGridReportMap();
				}	
				//$catchmentAreaMain.ui.reportSelectIndex = tempIndex;				
				$catchmentAreaMain.ui.reportRangeText = tempText;
				$catchmentAreaMain.ui.reportPopup = 
					window.open("/js/catchmentArea/report/reportForm.html", "reportPrint","width=816, height=700, scrollbars=yes");
				
				$("#reportRangePopup").hide();
		    	$('#block_containerBox').hide();
		    	$("input[id=reportListAll]").prop("checked", false);
				}else{
					messageAlert.open("알림", "한개 이상 선택하세요.");
					return;
				}
			},
			
			/**
			 * @name         : reportLoad
			 * @description  : 보고서의 데이터를 설정한다.
			 */
			reportLoad : function(result, option) {
				var param, statsData = [];
				var locationText, rangeText, yearText, rangeTypeText = "";
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var mapId;
				if($catchmentAreaMain.ui.isReportType == "srv"){
					mapId = 3;
				}else{
					//격자 도형 기존 맵;;
					mapId = 3;
				}

				param = {
					statLocation : $catchmentAreaLeftMenu.ui.selMapLocTxt,
					base_year : option.params.base_year,
					copr_base_year : option.params.copr_base_year,
					reportType : $catchmentAreaMain.ui.isReportType,
					index : option.params.index,
					rangeType : rangeType,
					indexText : option.params.indexText,
					mapId : mapId
				};
				
				//보고서용으로 정보필터
				if($catchmentAreaMain.ui.isReportType == "srv"){ //영향권
					$catchmentAreaMain.ui.srvAreaStatDataFilter(result, function(data){
						statsData = data;
					});
				}else{ //격자
					$catchmentAreaMain.ui.GridAreaStatDataFilter(result, option, function(data){
						statsData = data;
					});
				}

				var dataList = {
					params : param
					,stats : statsData
				};

				var	color =""
				if($('#select_legend').is(':visible')){
					color = $("#select_legend").css("background")		
				}else{
					color = "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"	
				}
				$catchmentAreaMain.ui.doCapture(".legendList", function(data) {
					var options = {
 						legendImg : data //범례이미지
 						,sLegendColor : color //선택격자색상
 						,sLegendtext : $("#select_legend_txt").text() //선택격자텍스트
 						,sSumText : $("#select_grid_sum").text() //선택격자sum
 						,sGridNm : $("#select_gridNm").text() //선택격자 이름
 					};
					setTimeout(function() {
						var popup = $catchmentAreaMain.ui.reportPopup.$reportForm.ui;
	 					popup.setData(dataList, options);
					}, 500);
					
				});
			},
			
			/**
			 * @name         : doCapture
			 * @description  : 보고서의 이미지를 캡쳐한다.
			 */
			doCapture : function(targetId, callback) {
				//SGIS4_1025_생활권역 시작
		    	html2canvas($(targetId)[0], {
		    		scale:2,
					logging: false,
					useCORS: false,
					proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
				}).then(function(canvas) {
					if (callback != undefined && callback != null && callback instanceof Function) {
						var data = canvas.toDataURL();
						callback.call(undefined, data);
					}else{
						var a = document.createElement('a');
	    				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	    				a.download = "report.png";
	    				a.click();
					}
		    	});
		    	//SGIS4_1025_생활권역 끝
		    },
		    /**
			 * @name         : requstSrvAreaReportData
			 * @description  : 영향권 통계정보를 요청한다.
			 */
		    requstSrvAreaReportData : function(pPageNo, indexText) {
		    	var param = {};
				var area = ""; 
				var radius;
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();

				// 시설 유형으로 지점 선택이면, 사전 생성 격자번호 사용
//				if($catchmentAreaObj.selected_modeOfUse == "M3"){
//					var rangeCd = $catchmentAreaLeftMenu.ui.getRangeCd('01', pPageNo);
//					if(rangeCd !== ""){
//						param.sufid = $catchmentAreaObj.selected_sufid;
//						param.rangeCd = rangeCd;
//					}
//				}
				
				if(rangeType == "stats01" || rangeType == "stats02"){
					var selectIndex = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length - pPageNo;
					var polyPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[selectIndex];
					area = 'POLYGON((';
					for(var i = 0; i < polyPoints.length; i++) {
						area += polyPoints[i][0] + " " + 
						polyPoints[i][1] + ",";
						
						if(i == polyPoints.length - 1) {
							area += polyPoints[i][0] + " " + 
							polyPoints[i][1];
						}					
					}					
					area += '))';
					
					param.area = area;
					param.srvAreaType = 1;
				}else if(rangeType == "stats03"){
					area = 'POINT(';
					area += $catchmentAreaLeftMenu.ui.selectCoordinate_x + " " + $catchmentAreaLeftMenu.ui.selectCoordinate_y;
					area += ')';
					radius = $catchmentAreaLeftMenu.ui.selectRangeArr[pPageNo-1];
					
					param.area = area;
					param.radius = radius;
					param.srvAreaType = 2;
				}
				
				if(area != ""){
					param.workGb = "all";
					param.async = true;
					param.base_year = $catchmentAreaMain.ui.getBaseYear("1");
					param.copr_base_year = $catchmentAreaMain.ui.getBaseYear("2");
					param.classDeg = $catchmentAreaMain.ui.classDeg;
					param.index = pPageNo;
					param.indexText = indexText;
					
					var params;
					params = $catchmentAreaMain.ui.reqSetParams("API_202013", param);
					$catchmentAreaMain.ui.requestOpenApi(params);
				}
		    },
			
			/**
			 * @name         : srvAreaStatDataFilter
			 * @description  : 영향권 보고서정도 필터
			 */
			srvAreaStatDataFilter : function(data, callback) {
				var result = [];
				var areaSize = "";
				var totPopCnt = 0;
				var totGenderCnt = 0;
				var totFamilyCnt = 0;
				var totHouseCnt = 0;
				var popsDatas = [];
				var genderDatas = [];
				var familyDatas = [];
				var houseDatas = [];
				var coprData = [];
				var coprDatas = [];
				var totCoprCnt = 0;
				var totCoprCntOgl = 0;
				var top3CoprCnt = 0;
				var tempCoprCnt = 0;
		    	var top3_coprData = [];
		    	var tempCoprData = [];
		    	var totCoprData = [];
		    	var workerData = [];
		    	var workerDatas = [];
				var totWorkerCnt = 0;
				var totWorkerCntOgl = 0;
				var top3WorkerCnt = 0;
				var tempWorkerCnt = 0;
		    	var top3_workerData = [];
		    	var tempWorkerData = [];
		    	var totWorkerData = [];
				var top3LoopCnt = 0;
				
				//면적
		    	areaSize = (Number(data.areaSize[0].area_size) / 1000000).toFixed(2);
				
				//인구, 성별
				if(data.pops[0] != null){
					totPopCnt = data.pops[0].popsTotOgl;
					totGenderCnt = data.pops[0].popsTotOgl;
					
					popsDatas.push({name : "0~9세 인구", y : data.pops[0].age_1_cnt});
			    	popsDatas.push({name : "10~19세 인구", y : data.pops[0].age_2_cnt});
			    	popsDatas.push({name : "20~29세 인구", y : data.pops[0].age_3_cnt});
			    	popsDatas.push({name : "30~39세 인구", y : data.pops[0].age_4_cnt});
			    	popsDatas.push({name : "40~49세 인구", y : data.pops[0].age_5_cnt});
			    	popsDatas.push({name : "50~59세 인구", y : data.pops[0].age_6_cnt});
			    	popsDatas.push({name : "60~69세 인구", y : data.pops[0].age_7_cnt});
			    	popsDatas.push({name : "70~79세 인구", y : data.pops[0].age_8_cnt});
			    	popsDatas.push({name : "80세 이상 인구", y : data.pops[0].age_9_cnt});
			    	
			    	genderDatas.push({name : "남", y : data.pops[0].man_cnt});
			    	genderDatas.push({name : "여", y : data.pops[0].woman_cnt});
				}
				if(data.family[0] != null){
					totFamilyCnt = data.family[0].familyTotOgl;
					//SGIS4_1025_생활권역 시작
					familyDatas.push({name : "친족 가구", y : data.family[0].family_3_cnt});
					familyDatas.push({name : "1인 가구", y : data.family[0].family_1_cnt});
			    	familyDatas.push({name : "비친족 가구", y : data.family[0].family_2_cnt});			    	
			    	//SGIS4_1025_생활권역 끝
				}
				if(data.house[0] != null){
					totHouseCnt = data.house[0].houseTotOgl;
					
					houseDatas.push({name : "단독주택", y : data.house[0].house_1_cnt});
			    	houseDatas.push({name : "아파트", y : data.house[0].house_2_cnt});
			    	houseDatas.push({name : "연립주택", y : data.house[0].house_3_cnt});
			    	houseDatas.push({name : "다세대주택", y : data.house[0].house_4_cnt});
			    	houseDatas.push({name : "비거주용 건물 내주택", y : data.house[0].house_5_cnt});
			    	//houseDatas.push({name : "주택이외의 거처", y : data.house[0].house_6_cnt});
				}

		    	
		    	if(data.copr != null){
		    		//사업체
			    	var coprDataTemp = deepCopy(data.copr);

					coprDataTemp.sort(function (a, b) {
						return a.corp_cnt > b.corp_cnt ? -1 : a.corp_cnt < b.corp_cnt ? 1 : 0;						
					});
					$.each(coprDataTemp, function(index, item){
						if(index == 0){
							totCoprCntOgl = item.corp_cnt;
						}else{
							coprData.push({name : item.name , y : item.corp_cnt});
						}						
					});
					
					if(totCoprCntOgl === undefined){
						totCoprCnt = 0;
					}else{
						totCoprCnt = totCoprCntOgl;
					}
					
					totCoprData = [{name : '전체' , y : totCoprCnt}];
					
					//top3
					var coprLoopCnt = coprData.length;
					if(coprLoopCnt > 0){
						top3LoopCnt = (coprLoopCnt >= 3) ? 3 : coprLoopCnt;
					
						for(var i=0; i < top3LoopCnt; i++){
							console.log(coprData[i]);
							top3_coprData[i] = coprData[i];
							top3CoprCnt += coprData[i].y;
							totCoprData.push(top3_coprData[i])
						}
						
						if(totCoprCnt < top3CoprCnt){
							totCoprCnt = top3CoprCnt;
						}
						
						//top3 나머지
						tempCoprCnt = totCoprCnt - top3CoprCnt;
						tempCoprData = [{name : '기타 사업체', y : tempCoprCnt}];
						
						coprDatas = top3_coprData;
						coprDatas.push({name : '기타 사업체', y : tempCoprCnt});
						totCoprData.push({name : '기타 사업체', y : tempCoprCnt});
					}
					
			    	//종사자
					var workerDataTemp = deepCopy(data.copr);
					
					workerDataTemp.sort(function (a, b) {
						return a.employee_cnt > b.employee_cnt ? -1 : a.employee_cnt < b.employee_cnt ? 1 : 0;						
					});
					
					$.each(workerDataTemp, function(index, item){
						if(index == 0){
							totWorkerCntOgl = item.employee_cnt;
						}else{						
							workerData.push({name : item.name , y : item.employee_cnt});
						}						
					});
					
					if(totWorkerCntOgl === undefined){
						totWorkerCnt = 0;
					}else{
						totWorkerCnt = totWorkerCntOgl;
					}
					
					totWorkerData = [{name : '전체' , y : totWorkerCnt}]
					
					//top3
					var workerLoopCnt = workerData.length;

					if(workerLoopCnt > 0){
						top3LoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;
						
						for(var i=0; i < top3LoopCnt; i++){
							top3_workerData[i] = workerData[i];
							top3WorkerCnt += workerData[i].y;
							totWorkerData.push(top3_workerData[i])
						}
						
						if(totWorkerCnt < top3WorkerCnt){
							// 머시기로 구한 총합이 탑3합보다 작으면  
							totWorkerCnt = top3WorkerCnt;
						}
						
						//top3 나머지
						tempWorkerCnt = totWorkerCnt - top3WorkerCnt;	
						tempWorkerData = [{name : '기타 사업체', y : tempWorkerCnt}];
						workerDatas = top3_workerData;
						workerDatas.push({name : '기타 사업체', y : tempWorkerCnt});
						totWorkerData.push({name : '기타 사업체', y : tempWorkerCnt});
					}
		    	}
		    	
		    	result.push({name : "areaSize" , data : areaSize});
		    	result.push({name : "popsDatas" , data : popsDatas});
		    	result.push({name : "genderDatas" , data : genderDatas});
		    	result.push({name : "familyDatas" , data : familyDatas});
		    	result.push({name : "houseDatas" , data : houseDatas});
		    	result.push({name : "top3_coprData" , data : top3_coprData});
		    	result.push({name : "tempCoprData" , data : tempCoprData});
		    	result.push({name : "totCoprData" , data : totCoprData});
		    	result.push({name : "top3_workerData" , data : top3_workerData});
		    	result.push({name : "tempWorkerData" , data : tempWorkerData});
		    	result.push({name : "totWorkerData" , data : totWorkerData});
		    	result.push({name : "totPopCnt" , data : totPopCnt});
		    	result.push({name : "totGenderCnt" , data : totGenderCnt});
		    	result.push({name : "totFamilyCnt" , data : totFamilyCnt});
		    	result.push({name : "totHouseCnt" , data : totHouseCnt});
		    	result.push({name : "coprDatas" , data : coprDatas});
		    	result.push({name : "workerDatas" , data : workerDatas});

		    	if (callback != undefined && callback != null && callback instanceof Function) {
						callback.call(undefined, result);
				}
		    },
		    
		    /**
			 * @name         : requstGridAreaReportData
			 * @description  : 격자 통계정보를 요청한다.
			 */
		    requstGridAreaReportData : function(indexText){
		    	var param = {};
		    	var data = $catchmentAreaDataBoard.ui.statDataOption;
		    	/*
		    	param.base_year = data.params.base_year;
		    	param.classDeg = data.params.classDeg;
		    	param.grid_level = data.params.grid_level;
		    	param.area = data.params.area;
		    	param.statType = data.params.statType;
		    	param.srvAreaType = data.params.srvAreaType;
		    	param.grid_level_nm = data.params.grid_level_nm;
		    	param.schCondNm = data.params.schCondNm;
		    	param.unit = data.params.unit;
		    	param.sufid = data.params.sufid;
		    	param.rangeCd = data.params.rangeCd;
		    	
		    	if(data.params.radius != undefined){
		    		param.radius = data.params.radius;
				}
		    	if(data.params.async != undefined){
		    		param.async = data.params.async;
		    	}
				if(param.statType == "pops"){
					if(data.params.gender != undefined){
						param.gender = data.params.gender;
					}
					if(data.params.ageToCd != undefined){
						param.ageToCd = data.params.ageToCd;
						param.ageFromCd = data.params.ageFromCd;
					}else{
						param.ageFromCd = data.params.ageFromCd;
					}
				}else if(param.statType == "family"){
					if(data.params.householdType != undefined){
						param.householdType = data.params.householdType;
					}
				}else if(param.statType == "house"){
					if(data.params.const_year != undefined){
						param.const_year = data.params.const_year;
					}else if(data.params.house_area_cd != undefined){
						param.house_area_cd = data.params.house_area_cd;
					}else{
						param.rd_resid_type = data.params.rd_resid_type;
					}
				}else if(param.statType == "copr"){
					if(data.params.ksic_3_cd != undefined){
						param.ksic_3_cd = data.params.ksic_3_cd;
					}
					if(data.params.grdstatType != undefined){
						param.grdstatType = data.params.grdstatType;
					}
				}
		    	*/
		    	var params = $catchmentAreaMain.ui.reqSetParams("API_202014", data.params);
		    	$catchmentAreaMain.ui.requestOpenApi(params);
		    },
		    
		    GridAreaStatDataFilter : function(data, option, callback){
		    	var type = option.params.statType;
		    	var coprType = option.params.grdstatType;
		    	var result = [];
		    	
		    	var chartTitleText = "";
				var statYear = [];
				var statData = [];
				var grid_cnt = 0;
				var grid_area = 0;
				var totSum = 0;
				var totAvg = 0;
				
				if(type == 'pops'){//인구
					chartTitleText = "인구 수";
				}else if(type == 'family'){//가구
					chartTitleText = "가구 수";
				}else if(type == 'house'){//주택
					chartTitleText = "주택 수";
				}else if(type == 'copr'){//사업체
					if(coprType == "copr"){
						chartTitleText = "사업체 수";
					}else{
						chartTitleText = "종사자 수";
					}	
				}else{//공시지가
					chartTitleText = "공시지가";
				}

				//통계정보를 sort한다.
				if (data.gridStat != null && data.gridStat.length > 0) {
					data.gridStat = data.gridStat.sort(function(a, b) {
						return parseFloat(a["base_year"])-parseFloat(b["base_year"]);
					});
				}
				
				$.each(data.gridStat, function(index, item){
					if(type == 'pops'){//인구
						statYear.push(item.base_year);
						statData.push(Number(item.tot_sum_ppltn_cnt));
						if(item.base_year == option.params.base_year){
							totSum = item.tot_sum_ppltn_cnt;
							totAvg = item.tot_avg_ppltn_cnt;
						}
					}else if(type == 'family'){//가구
						statYear.push(item.base_year);
						statData.push(Number(item.tot_sum_family_cnt));
						if(item.base_year == option.params.base_year){
							totSum = item.tot_sum_family_cnt;
							totAvg = item.tot_avg_family_cnt;
						}
					}else if(type == 'house'){//주택
						statYear.push(item.base_year);
						statData.push(Number(item.tot_sum_resid_cnt));
						if(item.base_year == option.params.base_year){
							totSum = item.tot_sum_resid_cnt;
							totAvg = item.tot_avg_resid_cnt;
						}
					}else if(type == 'copr'){//사업체
						//mng_s : 보고서 통계값 조회 오류 수정 20210504
						if(coprType == "copr"){
							var avg_copr = item.tot_sum_copr_cnt / item.grid_cnt
							statYear.push(item.base_year);
							statData.push(Number(item.tot_sum_copr_cnt));
							//console.log("사업체수:::"+item.tot_sum_copr_cnt);
							if(item.base_year == option.params.base_year){
								totSum = item.tot_sum_copr_cnt;
								totAvg = avg_copr;
							}
						}else{
							var avg_emp = item.tot_sum_employee_cnt / item.grid_cnt
							statYear.push(item.base_year);
							statData.push(Number(item.tot_sum_employee_cnt));
							//console.log("종사자수:::"+item.tot_sum_employee_cnt);
							if(item.base_year == option.params.base_year){
								totSum = item.tot_sum_employee_cnt;
								totAvg = avg_emp;
							}
						}	
						//mng_e : 보고서 통계값 조회 오류 수정 20210504
					}else if(type == 'idlv'){//공시지가
						statYear.push(item.base_year);
						statData.push(Number(item.tot_olnlp));
						if(item.base_year == option.params.base_year){
							totSum = item.tot_olnlp;
							totAvg = item.tot_avg_olnlp;
						}
					}
					grid_cnt = item.grid_cnt;
					grid_area = item.grid_area;
	    		});
				var gridLevelNm = option.params.grid_level_nm;
				var schCondNm = option.params.schCondNm;
				var unit = option.params.unit;
				
				result.push({name : "chartTitleText" , data : chartTitleText});
		    	result.push({name : "statYear" , data : statYear});
		    	result.push({name : "statData" , data : statData});
		    	result.push({name : "itgSgg" , data : data.itgSgg});
		    	result.push({name : "grid_cnt" , data : grid_cnt});
		    	result.push({name : "grid_area" , data : grid_area});
		    	result.push({name : "totSum", data : totSum});
		    	result.push({name : "totAvg", data : totAvg});
		    	result.push({name : "gridLevelNm", data : gridLevelNm});
		    	result.push({name : "schCondNm", data : schCondNm});
		    	result.push({name : "unit", data : unit});
		    	
		    	if (callback != undefined && callback != null && callback instanceof Function) {
					callback.call(undefined, result);
		    	}
		    },
		    
		    colseReportPopup : function(){
		    	$("#reportRangePopup").hide();
		    	$('#block_containerBox').hide();
		    	$("input[id=reportListAll]").prop("checked", false);
		    },
		    
		    setReportMap : function(selectIndex, type){
		    	$catchmentAreaLeftMenu.ui.clearLayers(2);
		    	
		    	var reportMap = $catchmentAreaMain.ui.getMap(2);
		    	var x = $catchmentAreaLeftMenu.ui.selectCoordinate_x;
		    	var y = $catchmentAreaLeftMenu.ui.selectCoordinate_y;
		    	var outerBounds; //제일마지막 도형
		    	
		    	$catchmentAreaLeftMenu.ui.mapMove(x, y, 2);
		   
		    	if(type == "stats01" || type == "stats02"){
		    		var drawObj = $catchmentAreaMain.draw3;
			    	
			    var shapeOptions = [{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[3],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[3],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[2],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[2],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[1],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[1],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[0],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[0],
		        		clickable : true
		        	}];
			    	
			    	var polyPoints;
			    	
			    	for(var i = selectIndex.length; i>0; i--){
			    		
			    		var tempIndex = ($catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length)-selectIndex[i-1];
			    		var polyPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[tempIndex];
			    		
			    		drawObj._polygon = new sop.Polygon(polyPoints, shapeOptions[(shapeOptions.length - i)]);
						drawObj._polygonGroup.addLayer(drawObj._polygon);
						
			    		if(i == selectIndex.length){
			    			outerBounds = drawObj._polygon.getBounds();
			    		}
			    	}
			    	
			    	drawObj.polygon();
			    	drawObj.map.gMap.fitBounds(outerBounds);

		    	}else{
		    		$.each(selectIndex, function(index, item){
		    			var radius = $catchmentAreaLeftMenu.ui.selectRangeArr[item-1];
		    			var endIdx = $(this).size();
		    			if(index == $(this).size()){
		    				$catchmentAreaLeftMenu.ui.setCircleMarker(x, y, radius, 2, index, endIdx);
		    				//$catchmentAreaLeftMenu.ui.setCircleMarker(x, y, radius, 2, "Y");
		    			}else{
		    				//$catchmentAreaLeftMenu.ui.setCircleMarker(x, y, radius, 2, "N");
		    				$catchmentAreaLeftMenu.ui.setCircleMarker(x, y, radius, 2, index, endIdx);
		    			}
			    	});
		    	}
		    	
		    	//마커 찍기
		    	$catchmentAreaLeftMenu.ui.creatSimpleSearchMarker(x,y,2);
		    	
		    },
		    
		    setGridReportMap : function(){
		    	$catchmentAreaLeftMenu.ui.clearLayers(2);
		    	
		    	var data = $catchmentAreaDataBoard.ui.statDataOption;
		    	data.params.mapId = 2;
		    	data.params.filterParam = data.params.filter;
		    	var params = $catchmentAreaLeftMenu.ui.reqSetParams("API_202007", data.params);
				$catchmentAreaLeftMenu.ui.requestOpenApi(params);
		    },
		    
			createInfoTooltip : function(event, data, type, map, lgdIdx){
				var popTooltipClass = map.id === 0 ? "pop_tooltip" : "pop_tooltip2";
				var legendIdx = lgdIdx;
				var html = '<div class="pop_choice">';
					html += 	'<div class="pop_content">';
					html += 		'<strong>선택한 격자의 통계정보</strong>';					
					html += 		'<b><span id="select_grid_map">'+$catchmentAreaDataBoard.ui.comma(data.info[0][data.info[0].showData])+'</span>' + data.info[0].unit + '</b>';
					html += 	'<div class="color_list">';
					html += 		'<ul class="clearfix">';
					html += 			'<li>';
					html += 				'<a href="javascript:void(0);" class="lev7"></a>';
					html += 			'</li>';
					html += 			'<li>';
					html += 				'<a href="javascript:void(0);" class="lev6"></a>';
					html += 			'</li>';
					html += 			'<li>';
					html += 				'<a href="javascript:void(0);" class="lev5"></a>';
					html += 			'</li>';
					html += 			'<li>';
					html += 				'<a href="javascript:void(0);" class="lev4"></a>';
					html += 			'</li>';
					html += 			'<li>';
					html += 				'<a href="javascript:void(0);" class="lev3"></a>';
					html += 			'</li>';
					html += 			'<li>';
					html += 				'<a href="javascript:void(0);" class="lev2"></a>';
					html += 			'</li>';
					html += 			'<li>';
					html += 				'<a href="javascript:void(0);" class="lev1"></a>';
					html += 			'</li>';
					html += 		'</ul>';
					html += 	'</div>';
					if(data.info[0].showData == 'ppltn_cnt'){//인구
						html += 	'<p class="mightOverflow">격자 내 ['+data.show1+', '+data.show2+'] 인구 수</p>';
					}else if(data.info[0].showData == 'family_cnt'){//가구
						html += 	'<p class="mightOverflow">격자 내 ['+data.show1+'] 가구 수</p>';
					}else if(data.info[0].showData == 'resid_cnt'){//주택
						html += 	'<p class="mightOverflow">격자 내 ['+data.show1+'] 주택 수</p>';
					}else if(data.info[0].showData == 'copr_cnt'){//사업체
						html += 	'<p class="mightOverflow">격자 내 ['+data.show1+'] 사업체 수</p>';
					}else if(data.info[0].showData == 'employee_cnt'){//종사자
						html += 	'<p class="mightOverflow">격자 내  ['+data.show1+'] 종사자 수</p>';
					}else{//공시지가
						html += 	'<p class="mightOverflow">격자 내 공시지가</p>';
					}
					
					html +=		'</div>';
//					html +=		'<div class="choice_now"></div>';
					html += '</div>';
				
				var _sopPath = event.target.bindToolTip(html, {
					direction: 'auto',
					className: popTooltipClass,
					noHide:true,
					opacity: 1
				});
				_sopPath.off('mouseover', _sopPath._showToolTip, _sopPath).off('mouseout remove', _sopPath._hideToolTip, _sopPath).addTo(map.gMap)._showToolTip(event);
				
				var liLen = $('.'+popTooltipClass+' .color_list li').length;
				$('.'+popTooltipClass+' .color_list li').removeClass('active');	
				$('.'+popTooltipClass+' .color_list li:nth-child(' + (liLen - legendIdx) + ')').addClass('active');	
			},

			/**
			 * 
			 * @name         : createSrvAreaInfoTooltip
			 * @description  : 생활권역 도형 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @history 	 :
			 * @param event  : 선택된 경계레이어
			 * @param data   : 선택된 경계레이어의 데이터정보
			 */
			createSrvAreaInfoTooltip : function(event, data, type, map) {
			
				var html = "<table style='margin:10px;' id='geoToolTip'>";
				html += "<tr><td class='gToolTipTitle'>" + data.info.geoNm + "</td></tr>";
				html += "<tr style='height:5px'></tr>";				
				html += "<tr><td class='gStatsData'>면적 : ";
				html += $catchmentAreaDataBoard.ui.comma((Number(data.info.geoArea) / 1000000).toFixed(2));
				html += " ㎢</td></tr>";	
				if(data.info.hasOwnProperty('pops')){
					html += "<tr><td class='gStatsData'>기준년도 : ";
					html += data.info.statsYear;
					html += " 년</td></tr>";	
					html += "<tr><td class='gStatsData'>총인구 : ";
					html += $catchmentAreaDataBoard.ui.comma(data.info.pops);
					html += " 명</td></tr>";						
				}
				html += "</table>";

				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo(map.gMap)._showToolTip(event);
				
				// djlee 수정
				$(".sop-tooltip").parent().css({"width" : "150px"} );
				$(".sop-tooltip").css({"border" : "2px solid " + event.target.options.fillColor} );			// data.info.geoColor
				
				$("#geoToolTip .gToolTipTitle")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$("#geoToolTip .gStatsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
			},
			
			/**
			 * 
			 * @name         : createSrvAreaShape
			 * @description  : 격자의 배경 이미지 생성
			 * @history 	 :
			 */
			createSrvAreaShape : function(pRangeType, pRangeVal, pMapId, pMode) {
				// pMode : Y-시간적 비교분석, undefined-그 외 
				
				var mapId = pMapId || 0;	// 맵 아이디는 기본값을 0으로 세팅				
				var geoData;
				if(mapId === 0) {
					geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal);					
				} else if(mapId === 1) {
					if(pMode === 'Y'){
						geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal);
					}else{
						geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal, 'T');
					}
				}else{
					geoData = $catchmentAreaObj.getShapeInfo(pRangeType, pRangeVal);
				}				
				
				if(!$catchmentAreaObj.isEmptyObject(geoData)){
					if(pRangeType == "stats03"){
						var circle = new sop.circle(sop.utmk(geoData.info.geoX, geoData.info.geoY), geoData.info.geoRadius,{
							stroke : true,
							weight : 1,
							opacity : 1,
							fill : true,
							fillColor : null,
							fillOpacity : 0.3,
							color : "#457bf5",
							clickable : false
						});
	
						var that = $catchmentAreaMain.ui.getMap(mapId);	// mapId 인자값 추가
						that.markers2.addLayer(circle);					
					}else{		
						var drawObj;
						if(mapId === 0) {
							drawObj = $catchmentAreaMain.draw;					
						} else if(mapId === 1) {
							drawObj = $catchmentAreaMain.draw2;
						}else{
							drawObj = $catchmentAreaMain.draw3;
						}
						
						//var that = $catchmentAreaMain.ui.getMap(mapId);
	
						//if(drawObj !== undefined && that !== undefined){
						if(drawObj !== undefined){	
							var shapeOpt = {
								stroke : true,
								weight : 1,
								opacity : 1,
								fill : true,
								fillColor : null,
								fillOpacity : 0.3,
								color : "#457bf5",		// #457bf5
								clickable : false
							};

							var polygonPoints = geoData.geometry.rings[geoData.maxIndex];
							var pointArr = [];
							for(var x=0; x < polygonPoints.length; x++){
								var xPoint = polygonPoints[x][0];
								var yPoint = polygonPoints[x][1];
								
								var point = sop.point(xPoint, yPoint);
								
								pointArr.push(point);
							}				
							drawObj._polygon = new sop.Polygon(pointArr, shapeOpt);
							drawObj._polygonGroup.addLayer(drawObj._polygon);
							drawObj.polygon();
							
							//that.gMap.fitBounds(drawObj._polygon.getBounds());
						}
					}
				}
			},
			setCookie : function(name, value, expiredays) {
				var todayDate = new Date();
		        todayDate.setDate( todayDate.getDate() + expiredays ); 
		        document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
			},
			callTutorial : function(){
				srvLogWrite('Q0','01','04','00','','');
				if(confirm("<생활권역 통계지도> \n처음 사용자를 위한 튜토리얼이 준비되어 있습니다.\n진행하시겠습니까?")) 
		    		window.open('/view/catchmentArea/main?tutorial_mode', '_blank');
			},
			//20210416 지자체연계서비스 추가 시작
			getParameterByName : function(name){
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			        results = regex.exec(location.search);
			    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
			},
			setParamMap : function(){
				console.log("호출");
				var areaCode = this.getParameterByName('areaCode');

				if(areaCode == ''){
					$catchmentAreaLeftMenu.ui.getLocation();
				}else{
					
					//좌표 설정 여부에 따라 튜토리얼 가시 설정 (2021.04.21)
					$('.tutorial_wrap').hide();
					
					var strArray = areaCode.split('|');
					var map = $catchmentAreaMain.ui.getMap();
					var zoom = 4;
					
					//지역코드 : strArray[1], x좌표 : strArray[2], y좌표 : strArray[3]
					var sidoCd = strArray[1].substr(0,2);
					var sggCd = strArray[1].substr(2,3);
					var emdCd = strArray[1].substr(5,2);
					
					if(emdCd != ''){
						zoom = 9;
					}else if(sggCd != ''){
						zoom = 6;
					}else{
						zoom = 4;
					}
					
					//좌표 있을때
					if(strArray[2] != undefined && strArray[2] != null && strArray[2] != ''
						& strArray[3] != undefined && strArray[3] != null && strArray[3] != '' ){
						map.mapMove([ strArray[2], strArray[3] ], zoom);	
					}else{
						var param = {};
						param.curSidoCd = sidoCd;
						param.curSiggCd = sggCd == '' ? $catchmentAreaLeftMenu.ui.officesMapping[sidoCd] : sggCd;
						param.curDongCd = emdCd;
						param.id = 0;
						param.bnd_year = '2020';
						
						$catchmentAreaLeftMenu.ui.reverseOnSelectChange(param, function(x, y, c){
							map.mapMove([ x, y ], zoom);
						});
						
					}
				}
			},
			
			//SGIS4_1210 추가 시작
			/**
			 * 
			 * @name         : selectPolygonHighlight
			 * @description  : 데이터보드에서 보는 통계에 대한 도형 하이라이트
			 * @history 	 :
			 */
			selectPolygonHighlight : function(rangeType, selectPolygonlen, pPageNo){
				$catchmentAreaMain.ui.caSelectedLayer = null; //초기화
				var layers = null;
				var layersIndex = 0;
				
				if(rangeType == "stats01" || rangeType == "stats02"){
					layers = $catchmentAreaMain.draw._polygonGroup._layers
				}else{
					var map = $catchmentAreaMain.ui.getMap(0);
					layers = map.markers2._layers;
				}
				
				$.each(layers, function(index, item){
					if(layersIndex == (selectPolygonlen-pPageNo)){
						$catchmentAreaMain.ui.caSelectedLayer = item;
						item.setStyle({
							color : "#000000",
							fillOpacity : 0.5,
						});
					}else{
						var color = item.options.fillColor;
						item.setStyle({
							color : color,
							fillOpacity : 0.5,
						});
					}
					layersIndex++;
				});
			},
			
			clearPolygonHighlight : function(){
				$catchmentAreaMain.ui.caSelectedLayer = null; //초기화
				var layers = null
				var layers01 = $catchmentAreaMain.draw._polygonGroup._layers;
				var map = $catchmentAreaMain.ui.getMap(0);
				var layers02 = map.markers2._layers
				
				if(layers01.length >  0){
					layers = layers01
				}else{
					layers = layers02
				}

				$.each(layers, function(index, item){
					var color = item.options.fillColor;
					item.setStyle({
						color : color,
						fillOpacity : 0.5,
					});
				});
			}
			//SGIS4_1210 추가 끝
	};
	
	// ==============================//
	// map event callback
	// 이 콜백 함수들은 두 개의 지도 모두에 해당하는 콜백 함수이다. 함수에 대한 정의를 할 때는 신중하게 해야한다.
	// 지도의 구분은 map.id 값으로 구별 가능하다. map.id가 0 이면 기존지도(= 왼쪽 지도), 1이면 새롭게 만들어진 지도(= 오른쪽 지도) 이다. - 주석 내용 보충 (박상언 2020-10-15 작성)
	// ==============================//
	$catchmentAreaMain.callbackFunc = {
			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
			},
			
			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
			},
			
			// 드랍종료 시, 콜백 호출
			didMapDropEnd : function(event, source, layer, data, map) {
			},
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
			},

			/**
			 * 
			 * @name         : didMouseClickPolygon
			 * @description  : 해당경계 mouse click 시, 발생하는 콜백함수
			 * 
			 */
			didMouseClickPolygon : function(event, data, type, map) {
				srvLogWrite('Q0','03','02','02','선택 기준 값 - '+(data.rangeVal/60)+'분','');
				// 왼쪽 화면이 통계일 때
				if($('.search_wrap.statistics').hasClass('active') || $catchmentAreaLeftMenu.ui.curLeftPage == "4"){
					if($('.search_wrap.statistics .chk_01').hasClass('active')){			
						
						var rangeIdx = $('#statsType01').find('li a[value="' + data.rangeVal + '"]').closest('li').index();
						if(rangeIdx != -1){
							// 현재 페이지를 보려는 페이지의 바로 이전으로 지정해주고, '다음' 버튼 클릭이벤트 호출
							var memCnt = $("#statsType01 > ul > li").length;
							if(rangeIdx === 0){
								rangeIdx = memCnt;
							}
							$catchmentAreaDataBoard.ui.selectIndex = rangeIdx;
							
							$('#nextBtn').trigger('click');
							
							if($('.pop_btn01').is(':visible')){
								$('.pop_btn01').trigger('click');
							}
						}
					}
				}				
			},
			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * 
			 */
			didMouseOverPolygon : function(event, data, type, map) {
				
				if(type == "saShp"){
					
					var geoData;
					if(map.id === 0){
						geoData = $catchmentAreaObj.getShapeInfo(data.rangeType, data.rangeVal);
					}else if(map.id === 1){
						geoData = $catchmentAreaObj.getShapeInfo(data.rangeType, data.rangeVal, "T");
					}
					
					if(geoData !== undefined && !$catchmentAreaObj.isEmptyObject(geoData)){
						$catchmentAreaMain.ui.createSrvAreaInfoTooltip(event, geoData, type, map);
					}
				}				
			},
			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * 
			 */
			didMouseOutPolygon : function(event, data, type, map) {
			},
			
			/**
			 * 
			 * @name         : didSelectedPolygon
			 * @description  : 해당경계 선택 시, 발생하는 콜백함수
			 *
			 */
			didSelectedPolygon : function(event, data, type, map) {
				srvLogWrite('Q0','03','03','08',data.properties.adm_cd,'');
				var gridRequestor = $catchmentAreaLeftMenu.ui.gridMapRequestor;
				
				var legendIdx = 0;
				var isNewChoice = true;
				var statData = [];
				if(map.curSelectedLayer == event.target){
					isNewChoice = false;
					map.curSelectedLayer = null;
				}else{
					map.curSelectedLayer = event.target;
					if(data.info.length != 0){
						statData = data.info[0][data.info[0].showData];
					}
					if($.isNumeric(statData)){
						legendIdx = map.legend.getColor(statData, map.legend.valPerSlice[0])[1];
					}
				}
				
				if(map.id === 0) {
					console.log("didSelectedPolygon - Default Map");
					console.log(event)
					console.log(event.target)
					console.log(event.target.options.fillColor);
					
					console.log(data);
					console.log(type);
					console.log(map);
					console.log(this);
					console.log(isNewChoice);
					// 격자를 그리는 부분이 크게 2군데이다. 하나는 격자이고, 다른 하나는 상세분석이다. 
					// 아래 if문에서는 "격자"인지를 확인하는 것이다.
					if(gridRequestor === 'grid') {
						if(isNewChoice){
							var result = [];
							if(data.info.length != 0){
								result = data.info;
							}else{
								result = data.properties.adm_nm;
							}
							var fillColor = event.target.options.fillColor;							
							//선택격자 데이터 보드 세팅
							$catchmentAreaDataBoard.ui.settingSelectGridDataBord(result, fillColor, legendIdx);
						}else{
							$catchmentAreaDataBoard.ui.clearSelectGridDataBord();
						}
					} else if(gridRequestor === 'detailAnalysis') {
						if(isNewChoice){
							var result = [];
							if(data.info.length != 0){
								result = data.info;
							}else{
								result = data.properties.adm_nm;
							}
							var fillColor = event.target.options.fillColor;
							var option = {gridRequestor : 'detailAnalysis', leftOrRight:'left'}
							//선택격자 데이터 보드 세팅
							$catchmentAreaDataBoard.ui.settingSelectGridDataBord(result, fillColor, legendIdx, option);
						} else{
							$catchmentAreaDataBoard.ui.clearSelectGridDataBord('left');
						}
					}
					
				} else if(map.id === 1) {
					console.log("didSelectedPolygon - New Map");
					if(gridRequestor === 'detailAnalysis') {
						if(isNewChoice){
							var result = [];
							if(data.info.length != 0){
								result = data.info;
							}else{
								result = data.properties.adm_nm;
							}
							var fillColor = event.target.options.fillColor;			
							var option = {gridRequestor : 'detailAnalysis', leftOrRight:'right'}
							//선택격자 데이터 보드 세팅
							$catchmentAreaDataBoard.ui.settingSelectGridDataBord(result, fillColor, legendIdx, option);
						}else{
							$catchmentAreaDataBoard.ui.clearSelectGridDataBord('right');
						}
					}
				}
				//선택격자 팝업
				map.clearToolTip();
				if(data.info.length > 0){//데이터가 있을 경우만 툴팁을 보여준다.
					//map.clearToolTip();
					if(isNewChoice){
						$catchmentAreaMain.ui.createInfoTooltip(event, data, type, map, legendIdx);
					}
				}
			},
			
			/**
			 * 
			 * @name         : didDrawCreate
			 * @description  : 사용자지정 draw 이벤트콜백
			 * 
			 */
			didDrawCreate : function(event, type, map) {
			},
			
			/**
			 * 
			 * @name         : didFinishedMultidata
			 * @description  : 사용자경계(multi layer data) 조회 후, 콜백
			 * 
			 */
			didFinishedMultidata : function(dataList, admCdList, map) {
			},

			// 맵 클릭 시, 콜백 호출
			didMapClick : function(event, map) {
				var mapId = map.id;
				var userMarker = $catchmentAreaLeftMenu.ui.useMarker;
				var userMarker2 = $catchmentAreaLeftMenu.ui.useMarker2;
				
				// 지도 1에서 사용하기 위한 마커 버튼(#searchPoi)를 클릭하고 나서 두 번째 지도를 클릭하면 경고창을 보이고 return - 박상언 2020-10-15 작성
				if(userMarker && mapId === 1) {
					caMessageAlert.open("알림", "좌측 지도에서만 사용이 가능합니다.");
					return;
				}
				
				// 지도 2에서 사용하기 위한 마커 버튼(#searchPoi)를 클릭하고 나서 첫 번째 지도를 클릭하면 경고창을 보이고 return - 박상언 2020-10-15 작성
				if(userMarker2 && mapId === 0) {
					caMessageAlert.open("알림", "우측 지도에서만 사용이 가능합니다.");
					return;
				}
				
				if(mapId === 0) {	// if 분기 추가 - 박상언 2020-10-15 작성
					if($catchmentAreaLeftMenu.ui.useMarker){
						$catchmentAreaLeftMenu.ui.useMarker = false;
						$("#searchPoi").removeClass("active");
						$('#mapRgn_1').removeClass('selMapIco');
						
						map.markers.clearLayers(); //마커 초기화
						
						var markerIcon = sop.icon({
							iconUrl: '/img/marker/thema_marker_default.png',
							shadowUrl: '/img/marker/theme_shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
						var marker = new sop.marker(event.utmk, 
								{icon : markerIcon 
							});
						
						$catchmentAreaObj.setTobeSelectedLoc("", "", marker);
						
						//주소검색
						$catchmentAreaLeftMenu.ui.searchReverseGeoApi(event.utmk.x, event.utmk.y, marker);
						
						$catchmentAreaLeftMenu.ui.selectCoordinate_x = event.utmk.x;
						$catchmentAreaLeftMenu.ui.selectCoordinate_y = event.utmk.y;
						map.markers.addLayer(marker);					
					}
				}
				
				if(mapId === 1) {	// if 분기 추가 - 박상언 2020-10-15 작성
					if($catchmentAreaLeftMenu.ui.useMarker2){
						$catchmentAreaLeftMenu.ui.useMarker2 = false;
						$("#searchPoi_spatial").removeClass("active");
						$('#mapRgn_2').removeClass('selMapIco');
						
						map.markers.clearLayers(); //마커 초기화
						
						var markerIcon = sop.icon({
							iconUrl: '/img/marker/thema_marker_default.png',
							shadowUrl: '/img/marker/theme_shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
						var marker = new sop.marker(event.utmk, {icon : markerIcon});
						
						$catchmentAreaObj.setTobeSelectedTargetLoc("", "", marker);
						
						//주소검색
						$catchmentAreaLeftMenu.ui.searchReverseGeoApi(event.utmk.x, event.utmk.y, marker);
						
						$catchmentAreaLeftMenu.ui.selectCoordinate_x_2 = event.utmk.x;
						$catchmentAreaLeftMenu.ui.selectCoordinate_y_2 = event.utmk.y;
						map.markers.addLayer(marker);
						
						$catchmentAreaLeftMenu.ui.map2SearchMarker = marker;
					}
				}
			}
	};
	
	$catchmentAreaMain.event = {
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * 
			 */	
			setUIEvent : function() {
				var body = $("body");
				/*
				body.on("click", "#chooseList .btnList", function(){
					console.log($(this).children('input').attr("id"));
					
					$(this).children('input').prop("checked", true);
				});
				*/
				body.on("click", ".tutorial_wrap .close", function(){
					$('.tutorial_wrap').hide();
				});
				
				body.on("click", ".tutorial_wrap .ques02", function(){
					$('.tutorial_wrap').hide();
					$('#menuButton').trigger('click');//메뉴펼치기
				});
				
				body.on("click", ".date_chk", function(){
					$catchmentAreaMain.ui.setCookie( "layerCookie", "done" , 7);
					$('.tutorial_wrap').fadeOut('fast');
				});
			}
			
	};

	$catchmentAreaMain.arcgis = {};
	$catchmentAreaMain.arcgis.url = {
			//개발	
			//routeArea : "http://121.153.140.124:6080/arcgis/rest/services/test/division_verify_area_route/NAServer/Service Area/solveServiceArea"
			//routeArea : "http://121.153.140.124:6080/arcgis/rest/services/test01/division_verify_area_route/NAServer/Service Area/solveServiceArea"
			routeArea : "https://link.kostat.go.kr/arcgis/rest/services/test01/division_verify_area_route/NAServer/Service%20Area/solveServiceArea"
	};
	$catchmentAreaMain.arcgis.routeArea = {};	
	$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea = {
			f : "json",
			facilities: null,
			impedanceAttributeName: 'LEAD_TIME',					// LEAD_TIME, 링크길이
			defaultBreaks: 600,
			outSR: 5179,
			returnFacilities: false,
			returnBarriers: false,
			returnPolylineBarriers: false,
			returnPolygonBarriers: false,
			outputLines: 'esriNAOutputLineNone',
			outputPolygons: 'esriNAOutputPolygonSimplified'	
	};	
	$catchmentAreaMain.arcgis.routeArea2 = {};	// 두번째 지도를 위한 것 - 박상언
	$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea = {	// 두번째 지도를 위한 것 - 박상언
			f : "json",
			facilities: null,
			impedanceAttributeName: 'LEAD_TIME',					// LEAD_TIME(주행시간), 링크길이(주행거리)
			defaultBreaks: 600,
			outSR: 5179,
			returnFacilities: false,
			returnBarriers: false,
			returnPolylineBarriers: false,
			returnPolygonBarriers: false,
			outputLines: 'esriNAOutputLineNone',
			outputPolygons: 'esriNAOutputPolygonSimplified'	
	};	
	$catchmentAreaMain.arcgis.routeArea.mapId = 0;
	$catchmentAreaMain.arcgis.routeArea2.mapId = 1;
	
	$catchmentAreaMain.arcgis.event = {
			
			/**
			 * @name         : calculateSearchArea
			 * @description  : 대상처 생활권역 산정
			 * @date         : 2020. 05. 29.
			 * @author	     : 웨이버스
			 */	
        	calculateSearchArea : function(x_coordinate, y_coordinate , areaMins, mapId, rangeType, selectIdx) {
        		
        		if(areaMins === undefined || areaMins === null || areaMins.length < 1){
        			return;
        		}
        		
        		mapId = mapId || 0;	// mapId 기본값 세팅
        		if($catchmentAreaMain.ui.isUsingOA && (mapId == 0)){
        			$catchmentAreaMain.arcgis.event.calculateSearchAreaUsingOA(x_coordinate, y_coordinate, areaMins, mapId, rangeType, selectIdx);
        			return;
        		}
        		
        		if(mapId == 1) {
        			
        			if(areaMins.length !== 1) {
        				console.error('Only One Value Need');
        				return;
        			}
        			
        			$catchmentAreaMain.arcgis.event.calculateSearchAreaUsingOA(x_coordinate, y_coordinate, areaMins, mapId, rangeType, selectIdx);
        			return;
        		}
        		
        		var features = [];        		
        		var spatialReference = { "wkid":5179,"latestWkid":5179 };
        		
        		var xCord = x_coordinate;
        		var yCord = y_coordinate;
        		
        		// 출발지 입력;
        		features.push( { geometry : { x : xCord, y : yCord , spatialReference : spatialReference } } );
        		console.log('features');
        		console.log(features);
        		features = JSON.stringify( {features : features} );

        		var adjustedAreaMins;
        		if(rangeType === 0){		//rangeType : 0(주행시간), 1(주행거리)
        			adjustedAreaMins = $catchmentAreaMain.ui.adjustRangeValue('T', areaMins);
        		}else if(rangeType === 1){
        			adjustedAreaMins = $catchmentAreaMain.ui.adjustRangeValue('D', areaMins);
        		}
        		
        		if(mapId === 0) {
        			$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.facilities = features;
        			$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.defaultBreaks = adjustedAreaMins;
        			if(rangeType === 1){//rangeType : 0(주행시간), 1(주행거리)
        				$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = '링크길이';
        			}else{
        				$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = 'LEAD_TIME';
        			}
        			//$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.defaultBreaks = eval(areaMin) * 60;
        		} else if(mapId === 1) {
        			$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.facilities = features;
        			$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.defaultBreaks = adjustedAreaMins;
        			if(rangeType === 1){//rangeType : 0(주행시간), 1(주행거리)
        				$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.impedanceAttributeName = '링크길이';
        			}else{
        				$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.impedanceAttributeName = 'LEAD_TIME';
        			}
        		}

        		
        		var gisServiceDivisionVerifyRouteServiceAreaObj = new gis.service.divisionVerifyRouteServiceArea.api();        		
        		
        		var t = $catchmentAreaMain.arcgis.routeArea; 

        		for ( var k in t.paramsForRouteArea )
        		{
        			gisServiceDivisionVerifyRouteServiceAreaObj.addParam(k, encodeURI(t.paramsForRouteArea[k]));	
        			
        		}
        		
        		gisServiceDivisionVerifyRouteServiceAreaObj.request({
					method : "GET",
					async : false,
					url : $catchmentAreaMain.arcgis.url.routeArea,
					options : t.options
        		});        		
			},
			
			calculateSearchAreaUsingOA : function(x_coordinate, y_coordinate , areaMins, mapId, rangeType, selectIdx) {
        		
        		var features = [];        		
        		var spatialReference = { "wkid":5179,"latestWkid":5179 };
        		
        		var xCord = x_coordinate;
        		var yCord = y_coordinate;
        		var t = null;
        		
        		// 출발지 입력;
        		features.push( { geometry : { x : xCord, y : yCord , spatialReference : spatialReference } } );
        		console.log('features');
        		console.log(features);
        		features = JSON.stringify( {features : features} );

        		// 요청 시 범위 값을 조정해 주고, 응답 처리 시 원복
        		var adjustedAreaMins;
        		if(rangeType === 0){		//rangeType : 0(주행시간), 1(주행거리)
        			adjustedAreaMins = $catchmentAreaMain.ui.adjustRangeValue('T', areaMins);
        		}else if(rangeType === 1){
        			adjustedAreaMins = $catchmentAreaMain.ui.adjustRangeValue('D', areaMins);
        		}
        		
        		if(mapId === 0) {
        			$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.facilities = features;
        			$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.defaultBreaks = adjustedAreaMins;
        			if(rangeType === 1){//rangeType : 0(주행시간), 1(주행거리)
        				$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = '링크길이';
        			}else{
        				$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.impedanceAttributeName = 'LEAD_TIME';
        			}
        			//$catchmentAreaMain.arcgis.routeArea.paramsForRouteArea.defaultBreaks = eval(areaMin) * 60;
        			t = $catchmentAreaMain.arcgis.routeArea;
        		} else if(mapId === 1) {
        			$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.facilities = features;
        			$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.defaultBreaks = adjustedAreaMins;
        			if(rangeType === 1){//rangeType : 0(주행시간), 1(주행거리)
        				$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.impedanceAttributeName = '링크길이';
        			}else{
        				$catchmentAreaMain.arcgis.routeArea2.paramsForRouteArea.impedanceAttributeName = 'LEAD_TIME';
        			}
        			t = $catchmentAreaMain.arcgis.routeArea2;
        		}
        		
        		var gisServiceDivisionVerifyRouteServiceAreaObj = new gis.service.divisionVerifyRouteServiceAreaUsingOA.api();        		
        		

        		for ( var k in t.paramsForRouteArea )
        		{
        			gisServiceDivisionVerifyRouteServiceAreaObj.addParam(k, encodeURI(t.paramsForRouteArea[k]));	
        			
        		}
        		
        		var params = {};
        		params.xCord = xCord;
        		params.yCord = yCord;
        		params.rangeType = (rangeType == 0 ? "T" :(rangeType == 1 ? "D" : ""));
        		params.areaMins = areaMins;
        		params.selectIdx = selectIdx;
        		
        		gisServiceDivisionVerifyRouteServiceAreaObj.request({
					method : "GET",
					async : false,
					url : contextPath + "/ServiceAPI/OpenAPI3/catchmentArea/serviceAreaGeometry.json",
					options : {
						mapId : mapId,
						params : params
					}
        		});        		
			}
	};
	
	$catchmentAreaMain.draw = {

			map : null,
			_map : null,
			_init : false,
			_polygoninit : false,
			_polylineGroup : new sop.LayerGroup(),
			_polylines : null,
			_polygonGroup : new sop.LayerGroup(),
			_polygon : null,
			polygon : function(){
				
				// 초기화
				if (!this._polygoninit) {
					this.initPolygon();
				}
				
				this._polygonGroup.addLayer(this._polygon);
				this._polygon.addTo(this._map);
				
			},
			polyline : function(path, move) {
				if (!Array.isArray(path)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				//polyine 객체생성
				this._polyline = new sop.Polyline([], {
					stroke: true,
					color: '#1B66FF',
					weight: 6,
					opacity: 0.7,
					fill: false
				}).addTo(this._map);
				
				// 그리기
				for (var i = 0; i < path.length; i++) {
					if( (path[i][0]) == "" || path[i][1] == "") continue;
					this._polyline.addUTMK({ x: path[i][0], y: path[i][1] });
				}
				
				// 폴리라인 레이어 추가
				this._polylineGroup.addLayer(this._polyline);
				
				move = (move == null)?true:(move)?true:false;
				if ( move )
				{
					//지도 extent 이동
					this._map.panInsideBounds(_polyline.getBounds());
				}
							
				//console.log(_polyline.getUTMKs());
			},
			polylines : function(arrayJsonData) {
				if (!Array.isArray(arrayJsonData)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				var _jsonData;
				var _polyline;
				var _utmkBounds = null;
				var _bounds;
				var _path;
				var _seq;
				var _path_id;
				var _member_id;
				var _idx;
				var marker;
				var markerIcon;
				var type;
				var randomColor;
				
				for (var j = 0; j < arrayJsonData.length; j++) {
					_jsonData = arrayJsonData[j];
					_path = _jsonData['path'];
					_seq = _jsonData['target_seq'];
					_path_id = _jsonData['path_id'];
					_member_id = _jsonData['member_id'];
					_idx = _seq - 1;
					
					//polyine 객체생성 (랜덤색상)
					randomColor = getRandomColor();
					_polyline = new sop.Polyline([], {
						stroke: true,
						color: randomColor,
						weight: 6,
						opacity: 0.7,
						fill: false,
						idx :_idx,
						seq : _seq,
						path_id : _path_id,
						member_id : _member_id
						
					}).addTo(this._map);
					if( _path.length == 0 || isNaN( _path[0][0] ) || isNaN( _path[0][1] )) continue;
					// 그리기
					for (var i = 0; i < _path.length; i++) {
						_polyline.addUTMK({ x: _path[i][0], y: _path[i][1] });
					}

					//_polyline Canvas 마우스 포인터 변경 class 추가
					//sop.DomUtil.addClass(_polyline._renderer._container, 'sop-clickable');
					
					// 폴리라인 레이어 추가
					this._polylineGroup.addLayer(_polyline);
					
					// 폴리라인 클릭 시
					_polyline.on("click", function() {
						var that = $catchmentAreaMain.ui;
						var pageSize = that.secondPageSize;
						var dataList = that.secondTargetList;
						
						// 분장 대상처 목록 팝업
						that.selectRowForPopUp = this.options.seq;
						that.divisionVerifyTargetPathInfoPopup('full', this.options.idx,  this.options.path_id,  this.options.member_id);
						
						//데이터보드의 해당 row 선택
						for(var i = 0; i < dataList.length; i ++) {
							if(dataList[i][2] == this.options.seq) {
								var options = {
										idx : i
									,	name : "INST_GROUP_ID"
									,	type : "second"
								}
								that.validateFocus(options);
								break;
							}
						}
					});
					
					
					// 출발지 아이콘 POI 그리기
					type = 'start_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_start_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[0][0], _path[0][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					//마커 저장
					$divisionVerifyDataBoard.route.marker[type][_path_id] = marker;
					//지도상에 마커 추가
					this._map.addLayer(marker);
					
					
					// 도착지 아이콘 POI 그리기
					type = 'end_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_end_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[_path.length-1][0], _path[_path.length-1][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					//마커 저장
					$catchmentAreaMain.route.marker[type][_path_id] = marker;
					//지도상에 마커 추가
					this._map.addLayer(marker);
					
					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    			//if( _member_id != $divisionVerifyDataBoard.ui.manager )
					{
	    				// 대상처 POI 및 순번 라벨 그리기
	    				// 이재현 테스트용 대상처 좌표 코드 (박종하 수정요망)
	    				var divisionTargetInfo = $divisionVerifyDataBoard.ui.getDivisionTargetInfo( _idx );
	    				var i = 0, iLen = divisionTargetInfo.length;
	    				for( ; i < iLen ; ++i )
	    				{
	    					var io = divisionTargetInfo[i];
	    					var data = {};
	    					data.TARGET_SEQ = io.target_id;
	    					data.IDX = i+1;
	    					data.X_COOR = io.X_COOR;
	    					data.Y_COOR = io.Y_COOR;
	    					
	    					type = 'target_multi';
	    					var iconHtml = "";
	    					//20190213 손원웅 POI number 위치 및 컬러 수정
	    					//iconHtml += "<div class='route_target_marker_icon' style='background-color:"+randomColor+";'>";
	    					iconHtml += "<div class='route_target_marker_icon_search' style='background-color:"+randomColor+";'>";
	    					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    					if( _member_id != $divisionVerifyDataBoard.ui.manager ) {
	    						//iconHtml += 	"<div class='route_poi_number on'>"+data.IDX+"</div>";
	    						iconHtml += 	"<div class='route_poi_number_search on'>"+data.IDX+"</div>";
	    					}
	    					iconHtml += "</div>";
	    					var markerIcon = new sop.DivIcon({
	    						html: iconHtml,
	    						iconSize: new sop.Point(60, 0),
	    						iconAnchor: new sop.Point(7, 7),
	    						infoWindowAnchor: new sop.Point(1, -5)
	    					});
	    					marker = sop.marker([data.X_COOR, data.Y_COOR],{
	    						icon:markerIcon,
	    						data : data
	    					});
	    					
	    					// 기존 마커가 있다면 삭제
	    					if ($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]) {
	    						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]);
	    						delete $divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ];
	    					}
	    					//마커 저장
	    					$divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ] = marker;
	    					//지도상에 마커 추가
	    					this._map.addLayer(marker);
	    				
	    				}
	    				
					}
	    			if ( _polyline == null ) return;
					// extent 구하기
					_bounds = _polyline.getBounds();
					
					if (!_utmkBounds) {
						_utmkBounds = _bounds;
					}
					if (_utmkBounds._southWest.x > _bounds._southWest.x) {
						_utmkBounds._southWest.x = _bounds._southWest.x;
					}
					if (_utmkBounds._southWest.y > _bounds._southWest.y) {
						_utmkBounds._southWest.y = _bounds._southWest.y;
					}
					if (_utmkBounds._northEast.x < _bounds._northEast.x) {
						_utmkBounds._northEast.x = _bounds._northEast.x;
					}
					if (_utmkBounds._northEast.y < _bounds._northEast.y) {
						_utmkBounds._northEast.y = _bounds._northEast.y;
					}
				}
				
				//지도 extent 이동
				if ( _utmkBounds == null ) return;
				
				this._map.fitBounds(_utmkBounds);
			},
			initPolygon : function () {
				this.map = $catchmentAreaMain.ui.mapList[0];
				this._map = $catchmentAreaMain.ui.mapList[0].gMap;

				this._map.addLayer(this._polygonGroup);
				
				this._polygoninit = true;
			},		
			initPolyline : function () {
				this.map = $catchmentAreaMain.ui.mapList[0];
				this._map = $catchmentAreaMain.ui.mapList[0].gMap;

				// 폴리라인 그룹 레이어 추가
				//this._polylineGroup.addLayer(this._polyline);
				this._map.addLayer(this._polylineGroup);
				
				this._init = true;
			},
			removePolyline : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polylineGroup);
				this._polylineGroup.clearLayers();
				this._init = false;
			},
			removePolygon : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polygonGroup);
				this._polygonGroup.clearLayers();
				this._polygoninit = false;			
			},
			removePath : function() {
				if( !this._map ) return;
				//this._map.removeLayer(this._polylineGroup);
				if( !this._polyline ) return;
				this._polylineGroup.removeLayer( this._polyline);
				//this._init = false;
			}
		
	};
	
	// 우측 지도(map.id 이 1인 지도)에서 사용할 draw2 오브젝트 추가, 후에 draw 오브젝트에서 통일해서 사용이 가능하면 지워질 것임. 지금은 방법이 안보여서 새로 생성 - 박상언 2020-10-21 추가
	$catchmentAreaMain.draw2 = {

			map : null,
			_map : null,
			_init : false,
			_polygoninit : false,
			_polylineGroup : new sop.LayerGroup(),
			_polylines : null,
			_polygonGroup : new sop.LayerGroup(),
			_polygon : null,
			polygon : function(){
				
				// 초기화
				if (!this._polygoninit) {
					this.initPolygon();
				}
				
				this._polygonGroup.addLayer(this._polygon);
				this._polygon.addTo(this._map);
				
			},
			polyline : function(path, move) {
				if (!Array.isArray(path)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				//polyine 객체생성
				this._polyline = new sop.Polyline([], {
					stroke: true,
					color: '#1B66FF',
					weight: 6,
					opacity: 0.7,
					fill: false
				}).addTo(this._map);
				
				// 그리기
				for (var i = 0; i < path.length; i++) {
					if( (path[i][0]) == "" || path[i][1] == "") continue;
					this._polyline.addUTMK({ x: path[i][0], y: path[i][1] });
				}
				
				// 폴리라인 레이어 추가
				this._polylineGroup.addLayer(this._polyline);
				
				move = (move == null)?true:(move)?true:false;
				if ( move )
				{
					//지도 extent 이동
					this._map.panInsideBounds(_polyline.getBounds());
				}
							
				//console.log(_polyline.getUTMKs());
			},
			polylines : function(arrayJsonData) {
				if (!Array.isArray(arrayJsonData)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				var _jsonData;
				var _polyline;
				var _utmkBounds = null;
				var _bounds;
				var _path;
				var _seq;
				var _path_id;
				var _member_id;
				var _idx;
				var marker;
				var markerIcon;
				var type;
				var randomColor;
				
				for (var j = 0; j < arrayJsonData.length; j++) {
					_jsonData = arrayJsonData[j];
					_path = _jsonData['path'];
					_seq = _jsonData['target_seq'];
					_path_id = _jsonData['path_id'];
					_member_id = _jsonData['member_id'];
					_idx = _seq - 1;
					
					//polyine 객체생성 (랜덤색상)
					randomColor = getRandomColor();
					_polyline = new sop.Polyline([], {
						stroke: true,
						color: randomColor,
						weight: 6,
						opacity: 0.7,
						fill: false,
						idx :_idx,
						seq : _seq,
						path_id : _path_id,
						member_id : _member_id
						
					}).addTo(this._map);
					if( _path.length == 0 || isNaN( _path[0][0] ) || isNaN( _path[0][1] )) continue;
					// 그리기
					for (var i = 0; i < _path.length; i++) {
						_polyline.addUTMK({ x: _path[i][0], y: _path[i][1] });
					}

					//_polyline Canvas 마우스 포인터 변경 class 추가
					//sop.DomUtil.addClass(_polyline._renderer._container, 'sop-clickable');
					
					// 폴리라인 레이어 추가
					this._polylineGroup.addLayer(_polyline);
					
					// 폴리라인 클릭 시
					_polyline.on("click", function() {
						var that = $catchmentAreaMain.ui;
						var pageSize = that.secondPageSize;
						var dataList = that.secondTargetList;
						
						// 분장 대상처 목록 팝업
						that.selectRowForPopUp = this.options.seq;
						that.divisionVerifyTargetPathInfoPopup('full', this.options.idx,  this.options.path_id,  this.options.member_id);
						
						//데이터보드의 해당 row 선택
						for(var i = 0; i < dataList.length; i ++) {
							if(dataList[i][2] == this.options.seq) {
								var options = {
										idx : i
									,	name : "INST_GROUP_ID"
									,	type : "second"
								}
								that.validateFocus(options);
								break;
							}
						}
					});
					
					
					// 출발지 아이콘 POI 그리기
					type = 'start_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_start_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[0][0], _path[0][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					//마커 저장
					$divisionVerifyDataBoard.route.marker[type][_path_id] = marker;
					//지도상에 마커 추가
					this._map.addLayer(marker);
					
					
					// 도착지 아이콘 POI 그리기
					type = 'end_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_end_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[_path.length-1][0], _path[_path.length-1][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					//마커 저장
					$catchmentAreaMain.route.marker[type][_path_id] = marker;
					//지도상에 마커 추가
					this._map.addLayer(marker);
					
					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    			//if( _member_id != $divisionVerifyDataBoard.ui.manager )
					{
	    				// 대상처 POI 및 순번 라벨 그리기
	    				// 이재현 테스트용 대상처 좌표 코드 (박종하 수정요망)
	    				var divisionTargetInfo = $divisionVerifyDataBoard.ui.getDivisionTargetInfo( _idx );
	    				var i = 0, iLen = divisionTargetInfo.length;
	    				for( ; i < iLen ; ++i )
	    				{
	    					var io = divisionTargetInfo[i];
	    					var data = {};
	    					data.TARGET_SEQ = io.target_id;
	    					data.IDX = i+1;
	    					data.X_COOR = io.X_COOR;
	    					data.Y_COOR = io.Y_COOR;
	    					
	    					type = 'target_multi';
	    					var iconHtml = "";
	    					//20190213 손원웅 POI number 위치 및 컬러 수정
	    					//iconHtml += "<div class='route_target_marker_icon' style='background-color:"+randomColor+";'>";
	    					iconHtml += "<div class='route_target_marker_icon_search' style='background-color:"+randomColor+";'>";
	    					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    					if( _member_id != $divisionVerifyDataBoard.ui.manager ) {
	    						//iconHtml += 	"<div class='route_poi_number on'>"+data.IDX+"</div>";
	    						iconHtml += 	"<div class='route_poi_number_search on'>"+data.IDX+"</div>";
	    					}
	    					iconHtml += "</div>";
	    					var markerIcon = new sop.DivIcon({
	    						html: iconHtml,
	    						iconSize: new sop.Point(60, 0),
	    						iconAnchor: new sop.Point(7, 7),
	    						infoWindowAnchor: new sop.Point(1, -5)
	    					});
	    					marker = sop.marker([data.X_COOR, data.Y_COOR],{
	    						icon:markerIcon,
	    						data : data
	    					});
	    					
	    					// 기존 마커가 있다면 삭제
	    					if ($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]) {
	    						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]);
	    						delete $divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ];
	    					}
	    					//마커 저장
	    					$divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ] = marker;
	    					//지도상에 마커 추가
	    					this._map.addLayer(marker);
	    				
	    				}
	    				
					}
	    			if ( _polyline == null ) return;
					// extent 구하기
					_bounds = _polyline.getBounds();
					
					if (!_utmkBounds) {
						_utmkBounds = _bounds;
					}
					if (_utmkBounds._southWest.x > _bounds._southWest.x) {
						_utmkBounds._southWest.x = _bounds._southWest.x;
					}
					if (_utmkBounds._southWest.y > _bounds._southWest.y) {
						_utmkBounds._southWest.y = _bounds._southWest.y;
					}
					if (_utmkBounds._northEast.x < _bounds._northEast.x) {
						_utmkBounds._northEast.x = _bounds._northEast.x;
					}
					if (_utmkBounds._northEast.y < _bounds._northEast.y) {
						_utmkBounds._northEast.y = _bounds._northEast.y;
					}
				}
				
				//지도 extent 이동
				if ( _utmkBounds == null ) return;
				
				this._map.fitBounds(_utmkBounds);
			},
			initPolygon : function () {
				this.map = $catchmentAreaMain.ui.mapList[1];
				this._map = $catchmentAreaMain.ui.mapList[1].gMap;

				this._map.addLayer(this._polygonGroup);
				
				this._polygoninit = true;
			},		
			initPolyline : function () {
				this.map = $catchmentAreaMain.ui.mapList[1];
				this._map = $catchmentAreaMain.ui.mapList[1].gMap;

				// 폴리라인 그룹 레이어 추가
				//this._polylineGroup.addLayer(this._polyline);
				this._map.addLayer(this._polylineGroup);
				
				this._init = true;
			},
			removePolyline : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polylineGroup);
				this._polylineGroup.clearLayers();
				this._init = false;
			},
			removePolygon : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polygonGroup);
				this._polygonGroup.clearLayers();
				this._polygoninit = false;			
			},
			removePath : function() {
				if( !this._map ) return;
				//this._map.removeLayer(this._polylineGroup);
				if( !this._polyline ) return;
				this._polylineGroup.removeLayer( this._polyline);
				//this._init = false;
			}
		
	};
	
	$catchmentAreaMain.draw3 = {
			map : null,
			_map : null,
			_init : false,
			_polygoninit : false,
			_polylineGroup : new sop.LayerGroup(),
			_polylines : null,
			_polygonGroup : new sop.LayerGroup(),
			_polygon : null,
			polygon : function(){
				
				// 초기화
				if (!this._polygoninit) {
					this.initPolygon();
				}
				
				this._polygonGroup.addLayer(this._polygon);
				this._polygon.addTo(this._map);
				
			},
			polyline : function(path, move) {
				if (!Array.isArray(path)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				//polyine 객체생성
				this._polyline = new sop.Polyline([], {
					stroke: true,
					color: '#1B66FF',
					weight: 6,
					opacity: 0.7,
					fill: false
				}).addTo(this._map);
				
				// 그리기
				for (var i = 0; i < path.length; i++) {
					if( (path[i][0]) == "" || path[i][1] == "") continue;
					this._polyline.addUTMK({ x: path[i][0], y: path[i][1] });
				}
				
				// 폴리라인 레이어 추가
				this._polylineGroup.addLayer(this._polyline);
				
				move = (move == null)?true:(move)?true:false;
				if ( move )
				{
					//지도 extent 이동
					this._map.panInsideBounds(_polyline.getBounds());
				}
							
				//console.log(_polyline.getUTMKs());
			},
			polylines : function(arrayJsonData) {
				if (!Array.isArray(arrayJsonData)) {
					return messageAlert.open("알림", "경로 데이터의 형식이 맞지 않습니다.");
				}
				// 초기화
				if (!this._init) {
					this.initPolyline();
				}
				
				var _jsonData;
				var _polyline;
				var _utmkBounds = null;
				var _bounds;
				var _path;
				var _seq;
				var _path_id;
				var _member_id;
				var _idx;
				var marker;
				var markerIcon;
				var type;
				var randomColor;
				
				for (var j = 0; j < arrayJsonData.length; j++) {
					_jsonData = arrayJsonData[j];
					_path = _jsonData['path'];
					_seq = _jsonData['target_seq'];
					_path_id = _jsonData['path_id'];
					_member_id = _jsonData['member_id'];
					_idx = _seq - 1;
					
					//polyine 객체생성 (랜덤색상)
					randomColor = getRandomColor();
					_polyline = new sop.Polyline([], {
						stroke: true,
						color: randomColor,
						weight: 6,
						opacity: 0.7,
						fill: false,
						idx :_idx,
						seq : _seq,
						path_id : _path_id,
						member_id : _member_id
						
					}).addTo(this._map);
					if( _path.length == 0 || isNaN( _path[0][0] ) || isNaN( _path[0][1] )) continue;
					// 그리기
					for (var i = 0; i < _path.length; i++) {
						_polyline.addUTMK({ x: _path[i][0], y: _path[i][1] });
					}

					//_polyline Canvas 마우스 포인터 변경 class 추가
					//sop.DomUtil.addClass(_polyline._renderer._container, 'sop-clickable');
					
					// 폴리라인 레이어 추가
					this._polylineGroup.addLayer(_polyline);
					
					// 폴리라인 클릭 시
					_polyline.on("click", function() {
						var that = $catchmentAreaMain.ui;
						var pageSize = that.secondPageSize;
						var dataList = that.secondTargetList;
						
						// 분장 대상처 목록 팝업
						that.selectRowForPopUp = this.options.seq;
						that.divisionVerifyTargetPathInfoPopup('full', this.options.idx,  this.options.path_id,  this.options.member_id);
						
						//데이터보드의 해당 row 선택
						for(var i = 0; i < dataList.length; i ++) {
							if(dataList[i][2] == this.options.seq) {
								var options = {
										idx : i
									,	name : "INST_GROUP_ID"
									,	type : "second"
								}
								that.validateFocus(options);
								break;
							}
						}
					});
					
					
					// 출발지 아이콘 POI 그리기
					type = 'start_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_start_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[0][0], _path[0][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					//마커 저장
					$divisionVerifyDataBoard.route.marker[type][_path_id] = marker;
					//지도상에 마커 추가
					this._map.addLayer(marker);
					
					
					// 도착지 아이콘 POI 그리기
					type = 'end_multi';
	    			markerIcon = new sop.DivIcon({
						html: "<div class='route_end_icon'></div>",
						iconSize: new sop.Point(50, 45),
						iconAnchor: new sop.Point(16, 42)
					});
					marker = sop.marker([ _path[_path.length-1][0], _path[_path.length-1][1] ], {
						icon: markerIcon
					});
					// 기존 마커가 있다면 삭제
					if ($divisionVerifyDataBoard.route.marker[type][_path_id]) {
						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][_path_id]);
						delete $catchmentAreaMain.route.marker[type][_path_id];
					}
					//마커 저장
					$catchmentAreaMain.route.marker[type][_path_id] = marker;
					//지도상에 마커 추가
					this._map.addLayer(marker);
					
					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    			//if( _member_id != $divisionVerifyDataBoard.ui.manager )
					{
	    				// 대상처 POI 및 순번 라벨 그리기
	    				// 이재현 테스트용 대상처 좌표 코드 (박종하 수정요망)
	    				var divisionTargetInfo = $divisionVerifyDataBoard.ui.getDivisionTargetInfo( _idx );
	    				var i = 0, iLen = divisionTargetInfo.length;
	    				for( ; i < iLen ; ++i )
	    				{
	    					var io = divisionTargetInfo[i];
	    					var data = {};
	    					data.TARGET_SEQ = io.target_id;
	    					data.IDX = i+1;
	    					data.X_COOR = io.X_COOR;
	    					data.Y_COOR = io.Y_COOR;
	    					
	    					type = 'target_multi';
	    					var iconHtml = "";
	    					//20190213 손원웅 POI number 위치 및 컬러 수정
	    					//iconHtml += "<div class='route_target_marker_icon' style='background-color:"+randomColor+";'>";
	    					iconHtml += "<div class='route_target_marker_icon_search' style='background-color:"+randomColor+";'>";
	    					// 총괄의 경우 표출 안하는 사양에서 텍스트 라벨만 표출 안하는 것으로 변경 됨[정재호]
	    					if( _member_id != $divisionVerifyDataBoard.ui.manager ) {
	    						//iconHtml += 	"<div class='route_poi_number on'>"+data.IDX+"</div>";
	    						iconHtml += 	"<div class='route_poi_number_search on'>"+data.IDX+"</div>";
	    					}
	    					iconHtml += "</div>";
	    					var markerIcon = new sop.DivIcon({
	    						html: iconHtml,
	    						iconSize: new sop.Point(60, 0),
	    						iconAnchor: new sop.Point(7, 7),
	    						infoWindowAnchor: new sop.Point(1, -5)
	    					});
	    					marker = sop.marker([data.X_COOR, data.Y_COOR],{
	    						icon:markerIcon,
	    						data : data
	    					});
	    					
	    					// 기존 마커가 있다면 삭제
	    					if ($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]) {
	    						this._map.removeLayer($divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ]);
	    						delete $divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ];
	    					}
	    					//마커 저장
	    					$divisionVerifyDataBoard.route.marker[type][data.TARGET_SEQ] = marker;
	    					//지도상에 마커 추가
	    					this._map.addLayer(marker);
	    				
	    				}
	    				
					}
	    			if ( _polyline == null ) return;
					// extent 구하기
					_bounds = _polyline.getBounds();
					
					if (!_utmkBounds) {
						_utmkBounds = _bounds;
					}
					if (_utmkBounds._southWest.x > _bounds._southWest.x) {
						_utmkBounds._southWest.x = _bounds._southWest.x;
					}
					if (_utmkBounds._southWest.y > _bounds._southWest.y) {
						_utmkBounds._southWest.y = _bounds._southWest.y;
					}
					if (_utmkBounds._northEast.x < _bounds._northEast.x) {
						_utmkBounds._northEast.x = _bounds._northEast.x;
					}
					if (_utmkBounds._northEast.y < _bounds._northEast.y) {
						_utmkBounds._northEast.y = _bounds._northEast.y;
					}
				}
				
				//지도 extent 이동
				if ( _utmkBounds == null ) return;
				
				this._map.fitBounds(_utmkBounds);
			},
			initPolygon : function () {
				this.map = $catchmentAreaMain.ui.mapList[2];
				this._map = $catchmentAreaMain.ui.mapList[2].gMap;

				this._map.addLayer(this._polygonGroup);
				
				this._polygoninit = true;
			},		
			initPolyline : function () {
				this.map = $catchmentAreaMain.ui.mapList[2];
				this._map = $catchmentAreaMain.ui.mapList[2].gMap;

				// 폴리라인 그룹 레이어 추가
				//this._polylineGroup.addLayer(this._polyline);
				this._map.addLayer(this._polylineGroup);
				
				this._init = true;
			},
			removePolyline : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polylineGroup);
				this._polylineGroup.clearLayers();
				this._init = false;
			},
			removePolygon : function() {
				if( !this._map ) return;
				this._map.removeLayer(this._polygonGroup);
				this._polygonGroup.clearLayers();
				this._polygoninit = false;			
			},
			removePath : function() {
				if( !this._map ) return;
				//this._map.removeLayer(this._polylineGroup);
				if( !this._polyline ) return;
				this._polylineGroup.removeLayer( this._polyline);
				//this._init = false;
			}
	};

	/*********** ArcGIS Server Route Service Area 조회 Start **********/
	(function() {
	    $class("gis.service.divisionVerifyRouteServiceArea.api").extend(gis.service.absAPI).define({
	        onSuccess : function(status, res, options) {
		    	console.log("gis.service.divisionVerifyRouteServiceArea.api 호출!!!!");
		    	console.log(res);
		    	var result = res.saPolygons.features;
	        	var drawObj = $catchmentAreaMain.draw;
	        	var polygonPointsArr = []; //선택된영역
	        	
	        	console.log(result);
	        	shapeOptions = [{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#0070C0',		//FFC6D7
	        		clickable : true
	        	},{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#D887E8',		//FFC6D7
	        		clickable : true
	        	},{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#70AD47',		//D6FFC6
	        		clickable : true
	        	},{
	        		stroke : true,
	        		weight : 2,
	        		opacity : 0.9,
	        		fill : true,
	        		fillColor : null,
	        		fillOpacity : 0.2,
	        		color : '#FFAA01',		//E7CF70
	        		clickable : true
	        	}];

	        	$.each(result, function(index, item){
	        		var pointArr = [];
	        		var maxIndex  = null;
		        	var maxLength = null;
	        		$.each(result[index].geometry.rings,function(index, item){
	        			if(maxIndex == null){
	        				maxIndex = index;
	        				maxLength = item.length;
	        			}else{
	        				if(maxLength < item.length){
	        					maxIndex = index;
	        					maxLength = item.length;
	        				}
	        			}
	        		});
	        		var polygonPoints = item.geometry.rings[maxIndex];
	        		polygonPointsArr.push(polygonPoints);
	        		
	        		for(var x=0; x < polygonPoints.length; x++){
		        		var xPoint = polygonPoints[x][0];
		        		var yPoint = polygonPoints[x][1];
		        		
		        		var point = sop.point(xPoint, yPoint);
		        		
		        		pointArr.push(point);
		        	}
	        		drawObj._polygon = new sop.Polygon(pointArr, shapeOptions[index]);
		        	drawObj._polygonGroup.addLayer(drawObj._polygon);
	        	});
	        	
	        	drawObj.polygon();
	        	
	        	$catchmentAreaLeftMenu.ui.selectPolygonPointsArr = polygonPointsArr;

	        	var that = $catchmentAreaMain.ui;
	        	/*
    			var point = sop.point(xCord, yCord);
    			var bound = sop.utmkBounds(point, point);
    			
    			
    			var flag = drawObj._polygon.getBounds().intersects(bound);
    			
    			// 통계 호출
    			// 임시값 시작
    			var tmpParam = {};
    			tmpParam.params = [];
    			tmpParam.noneParams = [];
    			tmpParam.filterParam = "tot_family";
    			tmpParam.unit = "명";
    			tmpParam.title = "생활권역 테스트";
    			// 임시값 끝
    			var map = $catchmentAreaMain.ui.mapList[$catchmentAreaMain.ui.curMapId];
				var params = $catchmentAreaMain.ui.reqSetParams("API_202001", map, res.saPolygons.features[0], tmpParam);
				$catchmentAreaMain.ui.requestOpenApi(params);
    			*/
	        	//받은 폴리곤 포인트 전달
//	        	var map = $catchmentAreaMain.ui.mapList[$catchmentAreaMain.ui.curMapId];
//	        	map.openApiCatchmentGridArea(polygonPoints)   			
        		
	        },
	        onFail : function(status) {
	        }
	    });
	}());
	
	(function() {
	    $class("gis.service.divisionVerifyRouteServiceAreaUsingOA.api").extend(gis.service.absAPI).define({
	        onSuccess : function(status, res, options) {
		    	console.log("gis.service.divisionVerifyRouteServiceAreaUsingOA.api 호출");
		    	console.log(res);

				if (res.errCd == "0") {
					
					if(options.mapId === 0){
						$catchmentAreaObj.setGeometryInfo(res.result, options);						
					}else if(options.mapId === 1){
						$catchmentAreaObj.setTargetGeometryInfo(res.result, options);						
					}

					var that = $catchmentAreaMain.ui.getMap(options.mapId);
					var resData = JSON.parse(res.result);
					if(resData.hasOwnProperty('error') || resData.saPolygons.features.length == 0){
						// 네트워크 정보가 없어서 400 리턴
						//SGIS4_1025_생활권역 시작
						//지도1이 아니면(비교 대상 지도이면) 도로정보가 존재하지 않을 때는 왼쪽 지도와 비교하지 않는다. => 주행시간 또는 주행거리 vs 반경
						if(options.mapId === 0){
			        		caMessageConfirm.open(
								 "알림", 
								 "선택한 지점으로부터 반경 50m에 도로 정보가 존재하지 않아<br/>주행 시간/거리 기준의 영역 설정은 할 수 없습니다.<br/><br/>" +
								 "반경 기준으로 영역을 생성하시겠습니까?",
								 btns = [
									{
									    title : "예",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {
									    	$('#stats03').trigger('click');
									    	$catchmentAreaLeftMenu.ui.chgStyleForRangeSet("N");
									    }
									 },
									 
								     {
										title : "아니오",
										fAgm : null,
										disable : false,
										func : function(opt) {
											//SGIS4_1028_생활권역 시작
											var markerMap = null;
											if(options.mapId === 0){
												if($catchmentAreaObj.selected_modeOfUse == "M3"){							
													$('.search_wrap.area').removeClass('active');
													$('.search_wrap.year').removeClass('active');
													$('.search_wrap.statistics').removeClass('active');
													$('.search_wrap.sisul').addClass('active');	
													
													markerMap = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap;
													
													// 선택된 마커 지우고 시설유형 마커 살리고
													that.markers.clearLayers();
													$.each(markerMap, function(idx, item){							
														if(item instanceof sop.Marker){
															that.markers3.addLayer(item);
														}
													});													
												}else{
													$catchmentAreaLeftMenu.ui.goFirstLeftMenu();
												}
//											}else if(options.mapId === 1){
//												if($catchmentAreaObj.selected_target_modeOfUse == "M3"){							
//													$('#spatial_position_search_box').removeClass('active');
//													$('#facilityTypeSearchDatail_for_spatial').addClass('active');
//													$('.search_wrap.statistics').removeClass('active');
//												}else{
//													$('#facilityTypeSearchDatail_for_spatial').removeClass('active');
//													$('#spatial_position_search_box').addClass('active');
//													$('.search_wrap.statistics').removeClass('active');
//												}
//												
//												markerMap = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap;
											}
											//SGIS4_1028_생활권역 끝
										}
								     }   
								 ]
							);
						}else{
							$('#detail_location_compare_2').text("미지정");
							$(".divs_wrap02 > .divs01 > span").eq(1).text("--");
							caMessageAlert.open("알림", "선택한 비교대상 지점으로부터 반경 50m에 도로 정보가 존재하지 않아<br/>주행 시간/거리 기준의 영역 설정은 할 수 없습니다.<br/><br/>다른 비교대상 지점을 선택해주세요.");
						}		        		
		        		//SGIS4_1025_생활권역 끝
						
//						var markerMap = null;
//						if(options.mapId === 0){
//							if($catchmentAreaObj.selected_modeOfUse == "M3"){							
//								$('.search_wrap.area').removeClass('active');
//								$('.search_wrap.year').removeClass('active');
//								$('.search_wrap.statistics').removeClass('active');
//								$('.search_wrap.sisul').addClass('active');							
//							}else{
//								$catchmentAreaLeftMenu.ui.goFirstLeftMenu();
//							}
//							
//							markerMap = $catchmentAreaLeftMenu.ui.map1PoiMarkerMap;
//						}else if(options.mapId === 1){
//							if($catchmentAreaObj.selected_target_modeOfUse == "M3"){							
//								$('#spatial_position_search_box').removeClass('active');
//								$('#facilityTypeSearchDatail_for_spatial').addClass('active');
//								$('.search_wrap.statistics').removeClass('active');
//							}else{
//								$('#facilityTypeSearchDatail_for_spatial').removeClass('active');
//								$('#spatial_position_search_box').addClass('active');
//								$('.search_wrap.statistics').removeClass('active');
//							}
//							
//							markerMap = $catchmentAreaLeftMenu.ui.map2PoiMarkerMap;
//						}
//						
//						// 선택된 마커 지우고 시설유형 마커 살리고
//						that.markers.clearLayers();
//						$.each(markerMap, function(idx, item){							
//							if(item instanceof sop.Marker){
//								that.markers3.addLayer(item);
//							}
//						});

						return;
					}
					
					// 조정하였던 범위값 원복
	        		if(options.params.rangeType === "T"){		//rangeType : T(주행시간), D(주행거리)
	        			$catchmentAreaMain.ui.restoreRangeValue('T', resData);
	        		}else if(options.params.rangeType === "D"){
	        			$catchmentAreaMain.ui.restoreRangeValue('D', resData);
	        		}					

					var result = resData.saPolygons.features;
					var drawObj = null;
					if(options.mapId === 0) {
						drawObj = $catchmentAreaMain.draw;
						$catchmentAreaLeftMenu.ui.boundarySize_1 = Math.round(result[0].attributes.Shape_Area);	// boundarySize_1 는 오직 상세분석의 좌측지도(기존지도)에 격자 생성시에 참고하는 변수다. 그외에서는 사용되지 않는 변수다. 남용 X
					} else if(options.mapId === 1) {
						drawObj = $catchmentAreaMain.draw2;
						$catchmentAreaLeftMenu.ui.boundarySize_2 = Math.round(result[0].attributes.Shape_Area);	// boundarySize_2 는 오직 상세분석의 우측지도에 격자 생성시에 참고하는 변수다. 그외에서는 사용되지 않는 변수다. 남용 X
					}
		        	var polygonPointsArr = []; //선택된영역		        	
		        	
		        	//console.log(result);
		        	shapeOptions = [{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[3],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[3],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[2],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[2],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[1],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[1],
		        		clickable : true
		        	},{
		        		stroke : true,
		        		weight : 1.5,
		        		opacity : 0.7,
		        		fill : true,
		        		fillColor : $catchmentAreaMain.ui.saShpColor[0],
		        		fillOpacity : 0.3,
		        		color : $catchmentAreaMain.ui.saShpColor[0],
		        		clickable : true
		        	}];

		        	var outerBounds;
		        	$.each(result, function(index, item){
		        		var pointArr = [];
		        		var maxIndex  = null;
			        	var maxLength = null;
		        		$.each(result[index].geometry.rings,function(index, item){
		        			if(maxIndex == null){
		        				maxIndex = index;
		        				maxLength = item.length;
		        			}else{
		        				if(maxLength < item.length){
		        					maxIndex = index;
		        					maxLength = item.length;
		        				}
		        			}
		        		});
		        		var polygonPoints = item.geometry.rings[maxIndex];
		        		polygonPointsArr.push(polygonPoints);
		        		
		        		for(var x=0; x < polygonPoints.length; x++){
			        		var xPoint = polygonPoints[x][0];
			        		var yPoint = polygonPoints[x][1];
			        		
			        		var point = sop.point(xPoint, yPoint);
			        		
			        		pointArr.push(point);
			        	}
		        		
		        		var colorIdx = index + (shapeOptions.length - result.length);
		        		if(options.params.selectIdx !== undefined && options.params.areaMins.length === 1){
		        			// 상세분석에서 한개의 도형만 요청한 경우(도형 색상이 순서대로 지정되지않고, 범위선택 버튼 따라가야하는 경우는 이것뿐임)
		        			colorIdx = shapeOptions.length - Number(options.params.selectIdx) - 1;
		        		}

		        		drawObj._polygon = new sop.Polygon(pointArr, shapeOptions[colorIdx]);
			        	drawObj._polygonGroup.addLayer(drawObj._polygon);
			        	
			        	drawObj._polygon.on({
							mouseover : function (e) {

								var layer = e.target;
								var color = "#457bf5";  //#434348
//								var fillColor = layer.options.fillColor;								

								layer.setStyle({
									//weight : weight,
									color : color,
									//dashArray : dashArray,
									fillOpacity : 0.5,
									//fillColor : fillColor
								});

								that.clearToolTip();
								
								var geoData = {};
								geoData.rangeType = options.params.rangeType;
								geoData.rangeVal = result[index].attributes.ToBreak;
								$catchmentAreaMain.callbackFunc.didMouseOverPolygon(e, geoData, 'saShp', that);
							},
							mouseout : function (e) {

								var layer = e.target;
								var color = layer.options.fillColor;
//								var fillOpacity = layer.options.fillOpacity;
//								var weight = 1.5;

								layer.setStyle({
									//weight : weight,
									color : color,
									//dashArray : layer.options.dashArray,
									fillOpacity : 0.3,
									//fillColor : fillColor
								});

							},
							click : function (e) {
								var geoData = {};
								geoData.rangeType = options.params.rangeType;
								geoData.rangeVal = result[index].attributes.ToBreak;
								$catchmentAreaMain.callbackFunc.didMouseClickPolygon(e, geoData, 'saShp', that);
							}
						});			        	

			        	if(index == 0){
			        		outerBounds = drawObj._polygon.getBounds();
			        	}
			        	
			        	//SGIS4_1210 추가 시작
			        	if($catchmentAreaDataBoard.ui.selectIndex > 0){
			        		if((result.length-1) == index){
			        			drawObj._polygon.setStyle({
									//weight : weight,
									color : "#000000",
									//dashArray : dashArray,
									fillOpacity : 0.5,
									//fillColor : "#000000"
								});
			        		}
			        	}
			        	//SGIS4_1210 추가 끝
		        	});
		        	
		        	drawObj.polygon();
		        	if(outerBounds != undefined && outerBounds != null){
		        		drawObj.map.gMap.fitBounds(outerBounds);
		        	}
		        	
//		        	if(options.mapId === 0) {
//		        	    // 우측 지도가 존재하는 상태, 즉 상세분석 상태에서는 아래와 같이 polygonPointsArr을 새로이 넣지 않는다. 영역 내 전체 정보에서 구한 polygonPointsArr을 계속 유지한다.
//		        	    // 수정 전 코드에서는 상세분석에서 좌측 지도에 도형을  $catchmentAreaLeftMenu.ui.selectPolygonPointsArr에 있던 배열이 1개짜리 배열 바뀌는데,
//		        	    // 이 상태에서 격자 분포를 On 하고 5분~20분을 선택할 때 에러가 난다.
//		        	    var map2 = $catchmentAreaMain.ui.getMap(1);
//		        	    if(!map2) {
//		        	        $catchmentAreaLeftMenu.ui.selectPolygonPointsArr = polygonPointsArr;
//		        	    }
//		        	}
		        	// detailOpen 사용 이유: 상세분석을 할 때도 현재 이 메소드가 실행되고, 좌측, 우측 지도에 "1개"의 도형을 그린다. 그러므로  polygonPointsArr의 길이가 1짜리인 배열이 오고
		        	// 이것을 $catchmentAreaLeftMenu.ui.selectPolygonPointsArr에 넣으면, 기존에 $catchmentAreaLeftMenu.ui.selectPolygonPointsArr에 있는 길이가 2이상인 배열은 더 사용을 못한다.
		        	// 이게 문제가 되는 유스케이스는 [ 통계정보 보기 > 상세분석에서 도형 그림 > 격자로 넘어가서 동그라미 조건(ex:5분, 10분)을 클릭 ].
		        	// 이를 방지하기 위해서 상세분석 기능을 사용 중인 것을 의미하는 detailOpen 변수를 추가하고, if 조건문에 사용한다.
		        	var detailOpen = $('#gridDataType03').next().is(':visible');
		        	if(options.mapId === 0 && !detailOpen) { $catchmentAreaLeftMenu.ui.selectPolygonPointsArr = polygonPointsArr; }
		        	else if(options.mapId === 1) { $catchmentAreaLeftMenu.ui.selectPolygonPointsArr2 = polygonPointsArr; }

		        	//var that = $catchmentAreaMain.ui;
		        	/*
	    			var point = sop.point(xCord, yCord);
	    			var bound = sop.utmkBounds(point, point);
	    			
	    			
	    			var flag = drawObj._polygon.getBounds().intersects(bound);
	    			
	    			// 통계 호출
	    			// 임시값 시작
	    			var tmpParam = {};
	    			tmpParam.params = [];
	    			tmpParam.noneParams = [];
	    			tmpParam.filterParam = "tot_family";
	    			tmpParam.unit = "명";
	    			tmpParam.title = "생활권역 테스트";
	    			// 임시값 끝
	    			var map = $catchmentAreaMain.ui.mapList[$catchmentAreaMain.ui.curMapId];
					var params = $catchmentAreaMain.ui.reqSetParams("API_202001", map, res.saPolygons.features[0], tmpParam);
					$catchmentAreaMain.ui.requestOpenApi(params);
	    			*/
		        	//받은 폴리곤 포인트 전달
//		        	var map = $catchmentAreaMain.ui.mapList[$catchmentAreaMain.ui.curMapId];
//		        	map.openApiCatchmentGridArea(polygonPoints) 
		        	
				} else if (res.errCd == "-401") {

				} else {
					//messageAlert.open("알림", res.errMsg);
					messageAlert.open("알림", "네트워크 분석 서비스가 원할하지 않습니다.<br/>잠시 후 다시 이용해 주세요.");
				}	        	
	
	        },
	        onFail : function(status) {
	        }
	    });
	}());	
	/*********** ArcGIS Server Route Service Area 조회 End **********/
	
}(window, document));
//SGIS4_1025_생활권역 시작
function getSession(auth) {
	if(auth.authStatus){
		$catchmentAreaLeftMenu.ui.getMyDataList(auth.member_id, 0, "myData");
		$catchmentAreaLeftMenu.ui.getMyDataList(auth.member_id, 1, "spatial_myData");
	}else{
		$("#myData_1").show();
		$("#myData_2").hide();
		$("#myData_3").hide();
		
		//상세분석
		$("#spatial_myData_1").show();
		$("#spatial_myData_2").hide();
		$("#spatial_myData_3").hide();
	}
};
//SGIS4_1025_생활권역 끝
