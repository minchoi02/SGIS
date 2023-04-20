/**
 * 대화형 통계지도 화면에 대한 클래스

 * 
 * history : 네이버시스템(주), 1.0, 2015/09/10  초기 작성
 * author : 권차욱, 김성현
 * version : 1.0
 * see : 
 * 20190502 운영반영예정
 */
(function(W, D) {
	W.$sbrActiveMap = W.$sbrActiveMap || {};
	//20200424 수정 시작 (6번. 지도 추가시 ICON 이상동작 추가 수정);
	//화면 오른쪽의 데이터보드 및 아이콘 정렬 "위치" 초기화
	function resetDataBoardAndIconsPosition() {
	    $(".dataSideBox").removeClass("full");					  						// 혹시라도 2단으로 펼쳐져있으면 펼쳐진 것을 접게한다.
	    $(".dataSideBox").stop().animate({"right":"-1500px"},200);						//데이터보드가 전체적으로 오른쪽으로 숨게한다
	    $(".sop-right").stop().animate({"right":"0px"},200);	  						//아이콘 모음을 오른쪽 끝으로 당긴다. ※ view1,view2,view3 모두 적용
	    $('.interactiveDataBoard').removeClass("on").stop().animate({"right":"0"},200);	//div[id='dataBoard'] 위의 "데이터보드 버튼"은 보이게 한다.
	};
	//20200424 수정 끝 (6번. 지도 추가시 ICON 이상동작 추가 수정);
	$(document).ready(
		function() {
			
			$sbrActiveMap.ui.createMap("mapRgn_1", 0);
			$sbrActiveMap.ui.mapList[0].update();
			//$sbrActiveMap.event.setUIEvent();
			
			if(document.location.href.indexOf("type=full") > 1 ){
				$sbrActiveMap.ui.doMaxSize(1);
			}
			
			//vMap.openApiBoundarySido('2020',null);
			
	});
	
	$sbrActiveMap = {
			noReverseGeoCode : false
	};
	
	
	$sbrActiveMap.ui = {
			
			namespace : "sbrActiceMap",
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
			searchMarker : null,	//대화형통계지도 검색에 의한 마커
			bookmarkType : null,	//대화형통계지도 통합 검색에 의한 총조사 주요지표 처리를 위한 변수
			bookmarkData : null,	//대화형통계지도 통합 검색에 의한 총조사 주요지표 처리를 위한 변수
			nonSelfGoverningList : ['31010', '31020', '31040', '31090', '31100', '31190', '33040', '34010', '35010', '37010', '38110'],		//2020년수정변경: 비자치구를 포함한 시 목록, 2019년 기준 11개(ggm)
			isInteractiveApiIdList : ['API_0301', 'API_0302', 'API_0304', 'API_0305', 'API_0306', 'API_0307', 'API_0308', 'API_0309', 'API_0310'],	//20200427 수정 (ggm)
			//SGIS_4 시작
			multiTimeList : [], //다중시계열 년도 배열
			multiTimeorigin : "", //출처
			//
			isTogether : false,    // 함꺠보기여부
			polygonData : null,
			
			isPopupFlag : true,
			adminCdList : [],
	
			//SGIS_4 끝
			
				/**
				 * 
				 * @name         : searchMarkerClear
				 * @description  : 지도 마커삭제
				 * @date         : 2016. 01. 11. 
				 * @author	     : 권차욱
				 * @history 	 :
				 */
			searchMarkerClear : function() {
				/*if($sbrActiveMap.ui.searchMarker != null){
						$sbrActiveMap.ui.searchMarker.remove();
				}*/
				
				$sbrActiveMap.ui.mapList[0].removeMarker();
			},
			
			/**
			 * 
			 * @name         : searchMarkerClear
			 * @description  : 지도 마커삭제
			 * @date         : 2016. 01. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			searchMarkerMake : function(x,y) {
				
				var data = [{'x':x,'y':y,'biz_nm':'','ent_sz':1}];
				
				$sbrActiveMap.ui.searchMarker = $sbrActiveMap.ui.mapList[0].addMarker(data, {visible : false });
			},
			
			
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱, 김성현
			 * @history 	 :
			 */
			createMap : function(id, seq) {
				
				if(this.mapList[seq] != null)return ;
				
				var map = new sMap.map();
				
				map.createMap($sbrActiveMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 1,
					measureControl : false,
					statisticTileLayer: false,
					zoomSliderControl : false
				});
				
				map.id = seq;
				map.addControlEvent("drop", {accept : ".dragItem"});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");
				map.addControlEvent("click");
				map.addControlEvent("mousemove");
				map.addControlEvent("contextmenu");
				map.isInteractive = true;	//2020년수정변경: 대화형통계지도 구분(ggm)
				
				if(seq == 1){
					
				}else if(seq == 2){
					
				}
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($sbrActiveMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "equal";
				//작업부분 끝
				
				var btnInfo = new sbrActiveMapBtnInfo.btnInfo(map, $sbrActiveMap.ui);
				
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					sbrBottomControl : true,
					bizSettingControl : true,
				});	
				
				//공유
				
				map.itemtext = '';
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				/*//갤러리 등록
				map.gMap.whenReady(function() {
					map.createHeatMap();
				});*/
				
				if(seq == 1) $sbrActiveMap.ui.isTogether = true;

				return map; //9월 서비스
			},
			
			
			
			/**
			 * 
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function(type) {
				srvLogWrite("C0", "07", "05", "00", "", "");		//전체화면확대
				var ck = $(".tb_sizing").hasClass("on"); 
				for (var i=0; i<this.mapList.length; i++) {
					if (this.mapList[i] != null) {
						this.mapList[i].update();
					}
				}
			},
			
			
			/**
			 * 
			 * @name         : doClearMap
			 * @description  : 맵의 오버레이를 초기화한다.
			 * @date         : 2015. 10. 01. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doClearMap : function(type, isStatsInfoClear, callYN) {			//20200511 수정 (ggm)
				$sbrActiveMap.ui.searchMarkerClear();
			},
			
			
			/**
			 * @name createInfoTooltip
			 * @description 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
			 * @param event :
			 *            선택된 경계레이어
			 * @param data :
			 *            선택된 경계레이어의 데이터정보
			 */
			createInfoTooltip : function(event, data, type, map){
				
				var html ="<p>"+data.properties.adm_nm+"</p>" 
					
				
				
				
				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo(map.gMap)._showToolTip(event);
				
				// djlee 수정
				$(".sop-tooltip").parent().css({"width" : "250px"} );
				
				$(".admName")
					.css("font-size", "14px")
					.css("font-weight", "bold")
					.css("color", "#3792de");
				$(".statsData")
					.css("font-size", "12px")
					.css("padding-left", "5px");
				
			},
	};
	
	
	$sbrActiveMap.event = {
			
			
	};
	
	
	$sbrActiveMap.callbackFunc = {

			// 맵이동 시작시, 콜백 호출
			didMapMoveStart : function(event, map) {
				//closeLeftAll();
			},

			// 맵이동 종료시, 콜백 호출
			didMapMoveEnd : function(event, map) {
				var center = map.center;
				
				//sMap.map.selectMapType = $('#searchArea').val();
				//조건별 지작 찾기일떄는 다시 그리지 않는다
				if(sMap.map.mapCategory != 2){
					if(map.id == 0) getReversGeoCode(map);
				}
				
			},
			
			// 맵 줌시작 시, 콜백 호출
			didMapZoomStart : function(event, map) {
				
				/*if(map.zoom <= 0){
					//$sbrActiveMap.ui.mapList[map.id].setZoomMap(1);
					return false;
					//$sbrActiveMap.ui.mapList[map.id].moveMapCenter([ 989674, 1818313 ],1);
					
				}*/
			},

			// 맵 줌 종료 시, 콜백 호출
			didMapZoomEnd : function(event, map) {
				
				//if(map.zoom )
				if(map.zoom>1){
					/*if($sbrActiveMap.ui.mapList[1] != null ){
						$sbrActiveMap.ui.mapList[0].gMap.dragging.enable();
						$sbrActiveMap.ui.mapList[1].gMap.dragging.enable();

					}*/
				}else{
					/*if($sbrActiveMap.ui.mapList[1] != null ){
						$sbrActiveMap.ui.mapList[0].gMap.dragging.disable();
						$sbrActiveMap.ui.mapList[1].gMap.dragging.disable();
					}*/
				}
				
			},
			// 맵 줌 종료 시, 콜백 호출
			didClick : function(event, map) {
				reSetMenuBtn();
			},
			didMousemove : function(event, map) {
				if(map.id == 0){
				    $('.popup.rankResult').css("left",(event.containerPoint.x+250)+"px");
				    $('.popup.rankResult').css("top",(event.containerPoint.y+120)+"px");
				}else{
					$('.popup.rankResult').css("left",(event.originalEvent.clientX+170)+"px");
					$('.popup.rankResult').css("top",(event.originalEvent.clientY+80)+"px");
				}
			},
			
			// 더블클릭 시, 콜백 호출
			didMapDoubleClick : function(btn_id, tmpParam) {
			},
			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOverPolygon : function(event, data, type, map) {	
				
				//if(!$sbrActiveMap.ui.isTogether){
				
				
				if(map.isOneSelectArea){
					
				}else{
					
					if(map.id == 0){
						$sbrActiveMap.ui.isPopupFlag = true;
						$('.popup.rankResult').show();
						setTimeout(function() {
							var area = $('#searchArea').val();
							if(area == 1)getAreaInfo(data.properties.adm_cd);
							else if(area != 1)getAreaInfo(data.properties.search_id);
							
						}, 50);
					}else if(map.id == 1){
						$sbrActiveMap.ui.isPopupFlag = true;
						$('.popup.rankResult').show();
						setTimeout(function() {
							getAreaInfo2(data.properties);
						}, 50);
					}
				
				}
				
				
				
				
			},

			
			/**
			 * 
			 * @name         : didMouseOutPolygo
			 * @description  : 해당경계 mouse out 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didMouseOutPolygon : function(event, data, type, map) {
				$sbrActiveMap.ui.isPopupFlag = false;
				$('.popup.rankResult').hide();
				
			},

			
			/**
			 * 
			 * @name         : didSelectedPolygon
			 * @description  : 해당경계 선택 시, 발생하는 콜백함수
			 * @date         : 2014. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param event  : 이벤트정보
			 * @param data   : 해당 레이어 데이터정보
			 * @param type   : 일반경계 및 데이터경계 타입
			 */
			didSelectedPolygon : function(event, data, type, map) {
				
				if(map.isOneSelectArea){
					var index = 0 ;
					if($sbrActiveMap.ui.adminCdList != null ) index =  $sbrActiveMap.ui.adminCdList.length;
					
					
					var flag =  false;
					$sbrActiveMap.ui.adminCdList.forEach(function(item,index){
						
						if(item  == data.properties.adm_cd){
							delete $sbrActiveMap.ui.adminCdList[index];
							flag= true;
						}
					});
					console.log($sbrActiveMap.ui.adminCdList);
					if(!flag)$sbrActiveMap.ui.adminCdList[index] = data.properties.adm_cd;
					map.setArearSelectLayout(event,flag);
					
				
				}else if(!$sbrActiveMap.ui.isTogether){
					
					var area = $('#searchArea').val();
					if(area == 1){
				 		$('#searchAdmCd').val(data.properties.adm_cd);
						showRankDetail(data.properties.adm_cd,event.utmk.x,event.utmk.y,data.properties.adm_nm);
					}
					else if(area != 1){
						console.log();
						$('#searchAdmCd').val(data.properties.search_id);
						showRankDetail(data.properties.search_id,event.utmk.x,event.utmk.y,data.properties.addr);
					}
					
					//지역순위 위치로 이동
					$("#ranklistUl").scrollTop(0);
					var rankId = "rankScroll"+data.properties.adm_cd;
					if($("#"+rankId).length > 0){
						var offset = $('#'+rankId).offset().top;
						$("#ranklistUl").scrollTop(offset-230);
					}
					
					
					
				}
				
			},

			
			/**
			 * 
			 * @name         : didDrawCreate
			 * @description  : 사용자지정 draw 이벤트콜백
			 * @date         : 2014. 10. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param event 이벤트객체
			 * @param @param type  객체타입
			 * @param @param map   델리케이트
			 */
			didDrawCreate : function(event, type, map) {
				var layer = event.layer;
				var area = "";
				
				//다각형 및 사각형일때, 특정 영역을 넘어서면 알림 메시지 호출
				if (type == "polygon" || type == "rectangle") {
					var shapeArea = layer._getArea();
					if (shapeArea > 113000000) {
						messageAlert.open('최적의 서비스 속도를 위해 사용자 임의영역 면적이 113000000m² 이하가 되어야 합니다.');
						layer._shapeGroup.removeLayer(layer._shape);
						layer._shape = null;
						layer._map.dragging.enable();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
						return;
					}
				}
				
				if(type == "polygon") {
					area = "POLYGON((";
					for(var i = 0; i < layer.getUTMKs()[0].length; i++) {
						area += layer.getUTMKs()[0][i].x + " " + 
								 layer.getUTMKs()[0][i].y + ",";
						
						if(i == layer.getUTMKs()[0].length - 1) {
							area += layer.getUTMKs()[0][0].x + " " + 
							         layer.getUTMKs()[0][0].y;
						}
					}
					area += "))";
				}
				else if(type == "circle") {
					area = "CIRCLE(" + 
						    	layer._utmk.x + " " + 
						    	layer._utmk.y + "," + 
						    	layer.getRadius()+ 
						    ")";
				}
				else if(type == "rectangle") {
					area = "RECTANGLE(" +
								layer._utmks[0][0].x + " " + 
								layer._utmks[0][0].y + "," + 
								layer._utmks[0][2].x + " " +
								layer._utmks[0][2].y + 
							")";
				}
				
				if (map.curPolygonCode == 5) {
					map.setZoom(9);
					map.curPolygonCode = 5;
				}
				map.selectedBoundMode = "multi";
				map.selectedBoundList = [];
				
				
				$sbrActiveMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);
			},
			
			/**
			 * 
			 * @name         : didDrawCreate
			 * @description  : 사용자지정 draw 이벤트콜백
			 * @date         : 2014. 10. 30. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param event 이벤트객체
			 * @param @param type  객체타입
			 * @param @param map   델리케이트
			 */
			didRightClick : function(event, type, map) {
				if(map.isOneSelectArea){
					$('#loadDiv').show();
					getArearInfoData($sbrActiveMap.ui.adminCdList);
				}
			},
			
			/**
			 * 
			 * @name         : didFinishedMultidata
			 * @description  : 사용자경계(multi layer data) 조회 후, 콜백
			 * @date         : 2016. 02. 04. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param dataList 표출된 데이터리스트
			 * @param admCdList 행정동코드리스트
			 * @param @param map   델리케이트
			 */
			didFinishedMultidata : function(dataList, admCdList, map) {
			}

	};
	
	
}(window, document));
