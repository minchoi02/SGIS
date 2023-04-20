(function(W, D) {
	W.$communityMap = W.$communityMap || {};
	var timeoutId;
	$(document).ready(function() {
		
		$communityMap.event.setUIEvent();
		window.onbeforeunload = $communityMapApi.request.initialize();	
		$("#opinionRegistArea").css("height", "0px");
		$("#community-info").css("min-height", "25px");
		$(".poiControl ").css("bottom", "-55px");
		
		$("#upDownArrow").click(function(){
			if($("#opinionRegistArea").css("height")=="0px"){
				$(this).css("background-image", "url(" + contextPath + "/resources/images/community/a_up.png)");
				$("#opinionRegistArea").stop().animate({"height":"206px"},200);
				$("#opinionRegistArea").show();
				
				$("#community").stop().animate({"min-height":"25px"},200);
			}else{
				$(this).css("background-image", "url(" + contextPath + "/resources/images/community/a_down.png)");
				$("#opinionRegistArea").stop().animate({"height":"0px"},200);
				$("#opinionRegistArea").hide();
				$("#community").stop().animate({"min-height":"145px"},200);
			}
			
			
		});
		
	});
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$communityMap.event.setMapSize();
		},100);
	});
	$communityMap.ui = {
		colorMapGb : "",
		map : null,
		//내 현재위치
		my_location_yn : "N", // 내 위치 조회 여부
		my_x : null, // x
		my_y : null, // y
		my_sido_cd : null, // 시도코드
		my_sido_nm : null, // 시도명
		my_sgg_cd : null, // 시군구코드
		my_sgg_nm : null, // 시군구명
		my_emdong_cd : null, // 읍면동코드
		my_emdong_nm : null, // 읍면동명
		/**
		 * @name           : createMap
		 * @description    : 지도 생성
		 * @date           : 2016. 03. 21. 
		 * @author         : 나광흠
		 * @history        :
		 * @param id       : html tag id
		 */
		createMap: function(id) {
			this.map = new sMap.map();
			this.map.isAutoRefreshCensusApi = true;
			this.map.isDrawBoundary = false;
			this.map.center = [989674, 1818313];
			this.map.zoom = 1;
			this.map.createMap($communityMap, id, {
				isZoomControl : false,
				isCurrentControl : false,
				isMapStatToggleControl : true,
				mapStatToggleOption : {
					defaultShowMapStat : false,
					callback : function(isOn){
						$(".history-list input:radio").prop("disabled",!isOn);
					}
				},
				isMapSizeControl : true,
				isPoiControl : true
			});
			//this.createMapListControl();
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.createInfoWindow("topright");
			this.map.gMap.whenReady(function(){
				$communityMapApi.request.initialize();				
			});
		},
		
		
		/**
		 * @name           : mapMove
		 * @description    : x y 좌표값위치로 이동
		 * @date           : 2020. 07. 17. 
		 * @author         : 박은식
		 * @history        :
		 * @param x		   : x값 좌표
		 * @param y		   : y값 좌표
		 */
		centerMove : function(x,y){
			this.map.gMap.setView(sop.utmk(x, y));
		},
		/**
		 * @name           : setStats
		 * @description    : 통계 조회
		 * @date           : 2016. 03. 21. 
		 * @author         : 나광흠
		 * @history        :
		 * @param history  : 즐겨찾기 아이디
		 * @param adm_cd   : 행정동 코드
		 */
		setStats : function(history,adm_cd){
			var api_id,showData,showDataName,unit;
			if(!history){
				history = $("input[name=history"+$communityMap.ui.map.id+"]:checked").val();
				//history = $communityMap.ui.colorMapGb;
			}
			if(history != undefined){
					if(history=="bassStats"){//총인구
						api_id = "API_0301";
						showData = "tot_ppltn";
						showDataName = "총인구";
						unit = "명";
					}else if(history=="bassBsnes"){//사업체
						api_id = "API_0304";
						showData = "corp_cnt";
						showDataName = "총사업체";
						unit = "개";
						
						
						censusDataYear = "2015";//사업체는 2015
					}else{
						$.ajax({
							type: "POST",
							url: sgisContextPath+"/ServiceAPI/member/StatisticsHistoryParamInfo.json",
							data:{
								hist_id:history
							},
							dataType: "json",
							async : false,
							success: function(res) {
								if(res.errCd=="0"){
									var json = JSON.parse(res.result.infoList[0].param_info)
									api_id = json.api_id;
									showData = json.showData;
									showDataName = json.title;
									unit = json.unit;
								}else{
									common_alert(res.errMsg);
								}
							},
							error: function(xhr, status, errorThrown) {
								common_alert(errorMessage);
							}
						});
					}
					var obj;
					var parameter = {
							"showData" : showData,
							"showDataName" : showDataName,
							"unit" : unit
					};
					if(adm_cd){
						obj = $communityMap.ui.map.censusApi.setStatsMapAdmCdCensusData;
						parameter.adm_cd = adm_cd;
					}else{
						obj = $communityMap.ui.map.censusApi.setStatsMapCensusData;
					}
					obj(api_id,parameter,{
						"year":censusDataYear,
						"bnd_year":$communityMap.ui.map.bnd_year
					});
			}
		},
		/**
		 * @name          : createMapListControl
		 * @description   : 통계 리스트 버튼 생성
		 * @date          : 2016. 03. 26. 
		 * @author        : 나광흠
		 * @history       :
		 */
		createMapListControl : function() {
			var mapListControl = sop.control({
				position: 'bottomleft'
			});
			var historyList = $("<ul/>");
			var listExec = false;
			$.each(mapList,function(cnt,node){
				listExec = true;
				$communityMap.ui.colorMapGb = node.list;
				historyList.append($("<li/>").append($("<label/>").append($("<input/>",{"type":"radio",name:"history"+$communityMap.ui.map.id,"value":node.list,"checked":cnt==0,"disabled":true}),node.histNm)));
			});
			
			mapListControl.onAdd = function(map) {
				this._div = sop.DomUtil.create('div', 'map-list');
				var mapList = $("<div/>",{"class":"history-list","style":"left:-320px; width:190px; height:90px;"}).append($("<div/>").append(historyList));
				//20200818 박은식 통계리스트 버튼 삭제 start
//				var mapListButton = $("<div/>",{"class":"button-box"}).append($("<a/>", {
//					html: '<span>통계리스트</span>',
//					html: '<span>통계리스트</span><img src="'+contextPath+'/resources/images/common/icon_totalmenu.gif" alt="통계리스트버튼">'
//				})).click(function(){
//					var left = "0px";
//					if($(this).hasClass("on")){
//						$(this).removeClass("on");
//						left= "-320px";
//					}else{
//						$(this).addClass("on");
//					}
//					mapList.stop().animate({
//						left: left
//					}, 300);
//					return false;
//				});
//				$(this._div).append(mapListButton,mapList);
				//20200818 박은식 통계리스트 버튼 삭제 end
				sop.DomEvent.disableClickPropagation(this._div);
				sop.DomEvent.disableScrollPropagation(this._div);
				historyList.find("input:radio").click(function(){
					
					if($communityMap.ui.map.isDrawStat){
						if($(this).is(":checked")){
							$communityMap.ui.setStats($(this).val());
						}
					}
				});
				return this._div;
			};
			if(listExec){
				mapListControl.addTo($communityMap.ui.map.gMap);
			}else{
				$(".mapSetting").hide();
			}
		}
	};
	$communityMap.callbackFunc = {
		//해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type==="data"){
				map.infoWindow.updateData(data);
			}
		}
	};

	$communityMap.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$communityMap.event.setMapSize();
			$communityMap.ui.createMap("map");
			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				var zoomLevel = $communityMap.ui.map.gMap.getZoom(); //줌래밸 체크(전국일경우 코드가 공백으로 )
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, ( zoomLevel <= 1) ? '00' : $communityMap.ui.map.curSidoCd, ( zoomLevel <= 1) ? '999' : $communityMap.ui.map.curSggCd, "");
				}
				// 감춤
				else {
					lifeEnvironmentToggle(false);
				}
			});
			
			
			//생활환경 정보 상세보기
			$(document).on("click", "#lifeEnvironmentPopup_open", function() {
				srvLogWrite('O0', '51', '02', '02', '', '');
				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				var lvEmdongCd = lvThis.attr("emdong_cd");
				if(lvSidoCd == "null") lvSidoCd = "";
				if(lvSggCd == "null") lvSggCd = "";
				if(lvEmdongCd == "null") lvEmdongCd = "";
				if(lvSidoCd != undefined && lvSidoCd != null && lvSidoCd != "" && lvSidoCd != "99") {
					lifeEnvironmentPopupSelect(lvSidoCd, lvSggCd, lvEmdongCd);
				}
			});
			
			//생활환경 팝업 닫기
			$(document).on("click", "#lifeEnvironmentPopup_close", function() {
				lifeEnvironmentPopupToggle(false);
			});
			
			//생활환경 팝업 구분 선택
			$(document).on("click", "#lifeEnvironmentPopup_list > ul > li.infoMenu", function() {
				var lvThis = $(this);
				var lvThisIndex = lvThis.data("index");
				var lvThisText = lvThis.children("a").text();
				
				//메뉴 선택
				$("#lifeEnvironmentPopup_list > ul > li.infoMenu").removeClass("on");
				lvThis.addClass("on");
				
				//화면 표시
				$("#lifeEnvironmentPopup div.infoPage").hide();
				$("#lifeEnvironmentPopup_page_"+lvThisIndex).show();
			});	
			
			
			$("#poiCall").on("click", function(){
				common_poiPopupCall();
				//20200813 박은식 poi 매뉴 스와이프 기능 추가 (화면에 그려진 이후 이벤트 실행도되록)
				$("#poi_list").touchFlow({
					axis : "x"
				});		
				$("#poi_list").data("touchFlow").go_page(0);
			});
			
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize: function(){
			if($("body").hasClass("full")){
				$("#map").height($(window).height());
			}else{
				if(communityForm){
					
					$("#map").height("500px");
					setTimeout(function(){
						$("#map").height("0px");
					},2000);
				}else{
					$("#map").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true)+70));
				}
			}
		}
	};
}(window, document));