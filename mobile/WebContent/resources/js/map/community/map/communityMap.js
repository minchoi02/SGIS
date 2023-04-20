(function(W, D) {
	W.$communityMap = W.$communityMap || {};
	var timeoutId;
	$(document).ready(function() {
		
		$communityMap.event.setUIEvent();
		
		$("#opinionRegistArea").css("height", "0px");
		$("#community-info").css("min-height", "25px");
		$(".poiControl ").css("bottom", "-55px");
		
		$("#upDownArrow").click(function(){
			if($("#opinionRegistArea").css("height")=="0px"){
				
				srvLogWrite('M0','08', '03', '02', '', '');		//개요보기
				
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
				isZoomControl : true,
				isCurrentControl : true,
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
			this.createMapListControl();
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
									messageAlert.open("알림",res.errMsg);
								}
							},
							error: function(xhr, status, errorThrown) {
								messageAlert.open("알림",errorMessage);
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
				var mapListButton = $("<div/>",{"class":"button-box"}).append($("<a/>", {
					html: '<span>통계리스트</span>'
//					html: '<span>통계리스트</span><img src="'+contextPath+'/resources/images/common/icon_totalmenu.gif" alt="통계리스트버튼">'
				})).click(function(){
					var left = "0px";
					if($(this).hasClass("on")){
						$(this).removeClass("on");
						left= "-320px";
					}else{
						$(this).addClass("on");
					}
					mapList.stop().animate({
						left: left
					}, 300);
					return false;
				});
				$(this._div).append(mapListButton,mapList);
				sop.DomEvent.disableClickPropagation(this._div);
				sop.DomEvent.disableScrollPropagation(this._div);
				historyList.find("input:radio").click(function(){
					
					srvLogWrite("M0","08", "03", "11", "", "");	
					
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
//					$("#map").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true)+$(".Community_Insert h1").outerHeight(true)+$(".Community_cont").outerHeight(true)+100));
//					$("#map").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true)+100));
					$("#map").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true)+70));
				}
			}
		}
	};
}(window, document));