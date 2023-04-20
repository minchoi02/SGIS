/**
 * 인터랙티브맵 화면에 대한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2014/08/29  초기 작성
 * author : 권차욱, 김성현, 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$sbrActiveMapApi = W.$sbrActiveMapApi || {};
	
	//$interactiveMapApi.grid_legend_new = [[]]; //그리드의 범례 데이터 세팅 mng_s
	
	$sbrActiveMapApi.request = {
			
			API_0301_URL : "/OpenAPI3/stats/population.json",
			API_0302_URL : "/OpenAPI3/stats/innersearchpopulation.json",	//9월서비스 권차욱 api명 변경
			API_0303_URL : "/OpenAPI3/stats/industrycode.json",
			API_0304_URL : "/OpenAPI3/stats/company.json",
			API_0305_URL : "/OpenAPI3/stats/household.json",
			API_0306_URL : "/OpenAPI3/stats/house.json",
			API_0307_URL : "/OpenAPI3/stats/farmhousehold.json",
			API_0308_URL : "/OpenAPI3/stats/forestryhousehold.json",
			API_0309_URL : "/OpenAPI3/stats/fisheryhousehold.json",
			API_0310_URL : "/OpenAPI3/stats/householdmember.json",
			//2020년수정변경 시작: 4시군구 조회(ggm)
			//20200427 수정 시작 (ggm)
			API_0301_1_URL : "/ServiceAPI/OpenAPI3/stats/populationForBorough.json",
			API_0302_1_URL : "/ServiceAPI/OpenAPI3/stats/innersearchpopulationForBorough.json",
			API_0304_1_URL : "/ServiceAPI/OpenAPI3/stats/companyForBorough.json",
			API_0305_1_URL : "/ServiceAPI/OpenAPI3/stats/householdForBorough.json",
			API_0306_1_URL : "/ServiceAPI/OpenAPI3/stats/houseForBorough.json",
			API_0307_1_URL : "/ServiceAPI/OpenAPI3/stats/farmhouseholdForBorough.json",
			API_0308_1_URL : "/ServiceAPI/OpenAPI3/stats/forestryhouseholdForBorough.json",
			API_0309_1_URL : "/ServiceAPI/OpenAPI3/stats/fisheryhouseholdForBorough.json",
			API_0310_1_URL : "/ServiceAPI/OpenAPI3/stats/householdmemberForBorough.json",			//20200417 수정 (ggm)
			//20200427 수정 끝
			//2020년수정변경 끝			
			API_FUSION_URL : "/ServiceAPI/stats/fusionstats.json",
			API_USERAREA_URL : "/ServiceAPI/map/userAreaBoundInfo.geojson",
			
			GRID_LEGEND_0301_URL : "/OpenAPI3/stats/gridlegend.json",
			
			combineFailCnt : 0,
			
			//9월 서비스
			mask : {
				show : function () {
					this.blockUI = document.createElement("DIV");
					this.blockUI.style.backgroundColor = "#D3D3D3";
					this.blockUI.style.border = "0px solid black";
					this.blockUI.style.position = "absolute";
					this.blockUI.style.left = '0px';
					this.blockUI.style.top = '0px';
					if (window.innerHeight == undefined) {
						this.blockUI.style.height = document.documentElement.clientHeight + 'px';
						this.blockUI.style.width = document.documentElement.clientWidth + 'px';
					}
					else {
						this.blockUI.style.height = window.innerHeight + 'px';
						this.blockUI.style.width = window.innerWidth + 'px';
					}
					this.blockUI.style.zIndex = "10000";
					this.blockUI.style.filter = "alpha(opacity=60);";
					this.blockUI.style.MozOpacity = 0.6;
					this.blockUI.style.opacity = 0.6;
					this.blockUI.style.KhtmlOpacity = 0.6;
					document.body.appendChild(this.blockUI);
					
					this.popupUI = document.createElement("DIV");
					this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
					this.popupUI.style.border = "3px solid rgb(0,0,0)";
					this.popupUI.style.position = "absolute";
					this.popupUI.style.height = '10px';
					this.popupUI.style.lineHeight = '50px';
					this.popupUI.style.paddingBottom = '40px';
					this.popupUI.style.width = '400px';
					this.popupUI.style.top = '50%';
					this.popupUI.style.left = '50%';
					this.popupUI.style.zIndex = "11000";
					this.popupUI.style.cursor = 'wait';
					var divHeight = this.popupUI.style.height.replace('px', '');
					var divWidth = this.popupUI.style.width.replace('px', '');
					this.popupUI.style.margin = '-' + divHeight / 2 + 'px 0 0 -' + divWidth / 2 + 'px';
					this.popupUI.style.textAlign = 'center';
					 var errorMsg = "<p>데이터 로딩중입니다. 잠시만 기다려주세요.</p>";
					this.popupUI.innerHTML = errorMsg;
					
					document.body.appendChild(this.popupUI);
				},
				close : function () {
					if (!sop.Util.isUndefined(this.blockUI)) {
						document.body.removeChild(this.blockUI);
						delete this.blockUI;
					}
					if (!sop.Util.isUndefined(this.popupUI)) {
						D.body.removeChild(this.popupUI);
						delete this.popupUI;
					}
				}
			},
			
			/**
			 * 
			 * @name         : userAreaBoundInfo
			 * @description  : 사용자영역 경계정보를 조회한다.
			 * @date         : 2015. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param area   : 영역정보
			 * @param type	 : 영역타입(circle, rectangle, polygon)
			 */
			userAreaBoundInfo : function (area, type, code, layer, map) {
				var userAreaBoundObj = new sop.openApi.userAreaBoundObj.api();
				userAreaBoundObj.addParam("area", area);
				userAreaBoundObj.addParam("type", type);
				//userAreaBoundObj.addParam("code", code);
				userAreaBoundObj.addParam("code", 4);
				userAreaBoundObj.request({
					method : "POST",
					async : false,
					url : contextPath + this.API_USERAREA_URL,
					options : {
						target : this,
						url : contextPath + this.API_USERAREA_URL,
						type : type,
						area : area,
						layer : layer,
						map : map
					}
				});
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
				
				//전국
				if (map.curPolygonCode == "1") {
					if (map.geojson) {
						map.geojson.remove();
					}
					if (map.dataGeojson) {
						map.dataGeojson.remove();
					}
					//map.multiLayerControl.clear();
					map.clearLayer();
					map.openApiBoundaryContry(function(map, res) {
						map.addPolygonGeoJson(res, "polygon");
						if (map.geojson) {
							map.geojson.eachLayer(function(layer) {
								layer.setStyle({
									weight : 3,
									color : "white",
									dashArray : layer.options.dashArray,
									fillOpacity : 0.7,
									fillColor : "#F06292"
								});
								map.selectedBoundList.push(layer);
							});
						}
						event.shapeGroup.thisShapeRemove();
					});
				}else {
					
					$interactiveMapApi.request.userAreaBoundInfo(area, type, map.curPolygonCode, event, map);	
				}
				
			},

		
			
	};
	
	/** ********* 사용자영역 경계조회 Start ********* */
	(function() {
		$class("sop.openApi.userAreaBoundObj.api").extend(sop.portal.absAPI).define(
				{
					onSuccess : function(status, res, options) {
						var map = options.map;
						var layer = options.layer;
						switch (parseInt(res.errCd)) {
							case 0:
								if (map.geojson) {
									map.geojson.remove();
								}
								if (map.dataGeojson) {
									map.dataGeojson.remove();
								}
								//map.multiLayerControl.clear();
								
								map.clearLayer();
								layer.shapeGroup.thisShapeRemove();
								map.addPolygonGeoJson(res, "polygon");
								if (map.geojson) {
									map.geojson.eachLayer(function(layer) {
										layer.setStyle({
											weight : 3,
											dashArray : layer.options.dashArray,
											fillOpacity : 0.7,
											fillColor : "#F06292"
										});
										map.selectedBoundList.push(layer);
									});
								}
								
								var mapData = res.features;
								var admCdList = [];
								
								mapData.forEach(function(item, index){
									var emdCd = item.properties.adm_cd;
									admCdList.push(emdCd);
								});
								getArearInfoData(admCdList);
								
								break;
							default:
								layer.shapeGroup.thisShapeRemove();
								map.mapBtnInfo.doClearSelectedBound();
								map.mapBtnInfo.setFixedBoundBtn(false);
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					onFail : function(status, options) {
						var map = options.map;
						var layer = options.layer;
						layer.shapeGroup.thisShapeRemove();
						map.mapBtnInfo.doClearSelectedBound();
						map.mapBtnInfo.setFixedBoundBtn(false);
					}
				});
	}());
	
	$sbrActiveMapApi.event = {
			
			/**
			 * 
			 * @name         : mapSyncEvent
			 * @description  : 지도 1,2의 이벤트를 동기화한다.
			 * @date         : 2017. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			mapSyncEvent :  function() {
				var lMap = $sbrActiveMap.ui.mapList[0].gMap;
				var rMap = $sbrActiveMap.ui.mapList[1].gMap;
				lMap.sync(rMap);
				rMap.sync(lMap);
			},
			
			/**
			 * 
			 * @name         : mapUnSyncEvent
			 * @description  : 지도 1,2의 이벤트를 동기화를 해제한다.
			 * @date         : 2017. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			mapUnSyncEvent : function() {
				var lMap = $sbrActiveMap.ui.mapList[0].gMap;
				var rMap = $sbrActiveMap.ui.mapList[1].gMap;
				lMap.unsync(rMap);
				rMap.unsync(lMap);
			}
	}


}(window, document));



function getArearInfoData(admCdList){
	
	$('#searchAdminCdList').val(admCdList);
	var fromData = $('#searchFrom').serialize();
	jQuery.ajax({
		type:"POST",
		url: "/view/sbrStats/sbrArearDataInfo",
		data: fromData,
		dataType:"json",
		async: true,
		success:function(data){
			openMapData(data);
			$('#loadDiv').hide();
		},
		error:function(data) {
			$('#loadDiv').hide();
		}
	});
	
}