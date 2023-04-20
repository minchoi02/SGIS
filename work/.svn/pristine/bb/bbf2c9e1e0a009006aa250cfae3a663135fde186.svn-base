/**
 * 나의 데이터 지도 조회
 */

(function(W,D){
	W.$myDataResultMap = W.$myDataResultMap || {};
	
	$(document).ready(function(){
		
		$myDataResultMap.event.setUIEvent();
		$myDataResultMap.ui.createMap("mapRgn_1", 0);
		$myDataResultMap.data.setInfoData();
		$("#analysisType").text("나의 데이터");
		
		if($myDataResultMap.data.resourceInfo.description != undefined && $myDataResultMap.data.resourceInfo.description !='' && $myDataResultMap.data.resourceInfo.description != null){
			$("#analysisTitle").text($myDataResultMap.data.resourceInfo.data_nm + " / " + $myDataResultMap.data.resourceInfo.kor_data_nm);
			
			$("#analysisTitle2").text($myDataResultMap.data.resourceInfo.data_nm);
			$("#analysis_description2").text($myDataResultMap.data.resourceInfo.kor_data_nm);
			
		}else{
			$("#analysisTitle").text($myDataResultMap.data.resourceInfo.data_nm + " / " + $myDataResultMap.data.resourceInfo.description);
			
			$("#analysisTitle2").text($myDataResultMap.data.resourceInfo.data_nm);
			$("#analysis_description2").text($myDataResultMap.data.resourceInfo.description);
			
		}
		
		/*$("#analysisTitle").text($myDataResultMap.data.resourceInfo.data_nm + " / " + $myDataResultMap.data.resourceInfo.description);*/
		
		//$myDataResultMap.ui.doMyDataResultView();
	});
	
	$myDataResultMap.data = {
			resourceInfo : null,
			resourceList : null,
			columnDataType : null, 
			korColumnDesc : null,
			currentPage : 1,
			setInfoData : function(){
				$myDataResultMap.data.resourceInfo = JSON.parse($("#resourceInfo").val());
				$myDataResultMap.data.resourceList = JSON.parse($("#resourceList").val());
				$myDataResultMap.data.columnDataType = JSON.parse($("#columnDataType").val());
				$myDataResultMap.data.korColumnDesc = JSON.parse($myDataResultMap.data.resourceInfo.kor_column_desc);
				
				var resultCnt = $("#viewCnt").val();
				//데이터 보드 테이블 그리드
				//$myDataResultMap.data.resourceInfo.data_cnt;
				//
				
				$myDataResultMap.request.getResourceInfo($myDataResultMap.data.resourceInfo.user_id, 
														$myDataResultMap.data.resourceInfo.data_nm, 
														$myDataResultMap.data.resourceInfo.resource_id ,
														0,
														resultCnt, 
														$myDataResultMap.ui.doGridTable);
			}
	}
	$myDataResultMap.ui = {
			namespace : "myDataResultMap",
			mapList : [],
			map : null,
			markers : new Array(),
			
			/**
			 * 
			 * @name         : createMap
			 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
			 * @date         : 2018. 09. 17. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			createMap : function(id, seq) {
				var map = new sMap.map();
				map.createMap($myDataResultMap, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true
				});
				
				map.id = seq;
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");
				
				//범례 호출 함수 
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($myDataResultMap.ui);
				map.legend = legend;
				legend.createLegend();
				legend.legendType = "auto";
				//valPerSlice Quest
				legend.valPerSlice = [0,1,2,3,4,5,6,7,8];
				var btnInfo = new $mapBtn.btnInfo(map, $myDataResultMap);
				map.mapBtnInfo = btnInfo;
				
				var options = {
					intrPoiControl : false,
					intrSettingControl : false,
					mapTypeControl : true,
					intrZoomControl : true
				};
				btnInfo.createUI(options);
				
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				this.map = map;
				
				map.gMap.whenReady(function() {
					map.createHeatMap();
				});
				
				$("#legend_"+map.legend.id).hide();
				
				
		
				return map;
			},
			
			/**
			 * 
			 * @name         : doMyDataResultView
			 * @description  : 나의 데이터 결과 조회
			 * @date         : 2018. 10. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석결과기본정보
			 */
			doMyDataResultView : function(){
				var resourceInfo = $myDataResultMap.data.resourceInfo;
				var resourceList = $myDataResultMap.data.resourceList;
				var columnDataType = $myDataResultMap.data.columnDataType;				
				
				if (this.featureLayer == null) {
					this.poiCnt = 0;
					this.featureLayer = sop.featureGroup();
					this.map.gMap.addLayer(this.featureLayer);
				}else{
					//기존 경제 삭제
					this.map.gMap.removeLayer(this.map.gMap);
				}
				
				
				
				//marker remove
				if($myDataResultMap.ui.markers.length > 0){
					for(var i = 0 ; i < $myDataResultMap.ui.markers.length;i++){
						$myDataResultMap.ui.markers[i].remove();
					}
				}
				
				
				if (resourceInfo != undefined && resourceInfo != null) {
					//type
					
					if(resourceInfo.action_type == "COORD" || resourceInfo.action_type == "MAPPING" || resourceInfo.action_type == "BND"){
						
						for(var i = 0 ; i < resourceList.length; i++){
							if((resourceList[i].x != undefined) ? (resourceList[i].x !=null) : false){
								
								var x = resourceList[i].x;
								var y = resourceList[i].y;
								var rowId = ((resourceList[i].rid != undefined) ? resourceList[i].rid : resourceList[i].gid);
								var showData = new Array();
								var tooltip = "";
								for(var j = 0; j < $myDataResultMap.data.korColumnDesc.length; j++ ){
									
									var column = $myDataResultMap.data.korColumnDesc[j];
									var column_id = column.column_id.toLowerCase();
									var column_value = "";
									var column_name = column.column_name;
									if(resourceList[i][column_id] != undefined){
										column_value = resourceList[i][column_id];
									}
									var columnObj = {
											column_id : column_id,
											column_value : column_value,
											column_name : column_name,
									};
									showData.push(columnObj);
								}
								
								tooltip = $myDataResultMap.ui.createPanel(rowId,showData);
								
								var icon = sop.icon({
									iconUrl: contextPath + '/img/map/marker-icon.png',
									shadowUrl: contextPath + '/img/map/marker-shadow.png',
									iconAnchor: [12.5, 40 ],
									iconSize: [ 25, 40 ],
									infoWindowAnchor: [1, -34]
								});
								
								
								var marker = sop.marker([ x, y ], {
									  icon : icon,
									  id : rowId,
									  x : x,
									  y :  y,
									  title : "rid : "+rowId
								});
								
								marker.bindInfoWindow(tooltip);
								this.featureLayer.addLayer(marker);
								this.poiCnt++;
								$myDataResultMap.ui.markers.push(marker);
								
							}
						}
						
						
						var mX = $myDataResultMap.ui.markers[$myDataResultMap.ui.markers.length-1]._utmk.x
						var mY = $myDataResultMap.ui.markers[$myDataResultMap.ui.markers.length-1]._utmk.y
						this.map.mapMove([mX,mY],7);
					}else if(resourceInfo.action_type == "SHP" || resourceInfo.action_type == "GEOM"){
						
						var pos_column_desc = JSON.parse(resourceInfo.pos_column_desc);
						var pos_col_infos = pos_column_desc.pos_col_infos;
						var posInfo = pos_column_desc.pos_col_infos[0];
						
						var data = new Array();
						
						for(var i = 0 ; i < resourceList.length; i++){
							if((resourceList[i].geom != undefined) ? (resourceList[i].geom !=null) : false){
								//먼저 MULTIPOLYGON 인지  POINT 인지 구분을 해야 한다.
								
								var firstEnd = resourceList[i].geomtext.indexOf("(");
								var geoType = resourceList[i].geomtext.substring(0,firstEnd);
								if(geoType == "MULTIPOLYGON"){
									var polyStr = resourceList[i].geomtext.replace(/\MULTIPOLYGON/g,'');
									polyStr = polyStr.replace(/\)/g,'');
									polyStr = polyStr.replace(/\(/g,'');
									var polyArr = polyStr.split(",");
									var coordinates = new Array();
									
									for(var j = 0 ; j < polyArr.length; j++){
										var coordinateArr = new Array();
										var coordinateValues = polyArr[j].split(" ");
										for(var k = 0 ; k < coordinateValues.length; k++){
											coordinateArr.push(coordinateValues[k]);
										}
										coordinates.push(coordinateArr);
									}
									
									var geojson = {
										type : "MultiPolygon",
										coordinates : [[coordinates]], 
									};
									
									var geojsonStr = JSON.stringify(geojson);
									
									var obj = {
										geojson : geojsonStr,
										x : resourceList[i].x,
										y : resourceList[i].y,
									}
									
									data.push(obj);
								}else if(geoType == "POINT"){
									var rowId = ((resourceList[i].rid != undefined) ? resourceList[i].rid : resourceList[i].gid);
									var point = resourceList[i].geomtext.replace(/\POINT/g,'');
									point = point.replace(/\)/g,'');
									point = point.replace(/\(/g,'');
									var pointArr = point.split(" ");
									var x = pointArr[0];
									var y = pointArr[1];
									
									var icon = sop.icon({
										iconUrl: contextPath + '/img/map/marker-icon.png',
										shadowUrl: contextPath + '/img/map/marker-shadow.png',
										iconAnchor: [12.5, 40 ],
										iconSize: [ 25, 40 ],
										infoWindowAnchor: [1, -34]
									});
									
									
									var marker = sop.marker([ x, y ], {
										  icon : icon,
										  id : rowId,
										  x : x,
										  y :  y,
										  title : "rid : "+rowId
									});
									
									var tooltip = "";
									var showData = new Array();
									for(var j = 0; j < $myDataResultMap.data.korColumnDesc.length; j++ ){
										
										var column = $myDataResultMap.data.korColumnDesc[j];
										var column_id = column.column_id.toLowerCase();
										var column_value = "";
										var column_name = column.column_name;
										if(resourceList[i][column_id] != undefined){
											column_value = resourceList[i][column_id];
										}
										var columnObj = {
												column_id : column_id,
												column_value : column_value,
												column_name : column_name,
										};
										showData.push(columnObj);
									}
									
									tooltip = $myDataResultMap.ui.createPanel(rowId,showData);
									
									marker.bindInfoWindow(tooltip);
									this.featureLayer.addLayer(marker);
									this.poiCnt++;
									$myDataResultMap.ui.markers.push(marker);
								}
								
								
								
							}
						}
						
						if(data.length > 0){
							var geoData = this.map.convertFeatureData(data, "data", "");
							this.map.addPolygonGeoJson(geoData, "data");
							
							var bounds = this.map.dataGeojson.getBounds();
							if (bounds != null) {
								this.map.gMap.fitBounds(bounds, {
									animate : false
								});
							}
						}
						
					}
					
					
				}
			},
			
			createPanel : function(id,showData){
				var tooltip  = "<div class='markerTooltip'>";
				  tooltip += 	"<div class='mTitle' style='text-align:center;'>POI_"+Number(id)+"</div>";
				  for(var i = 0 ; i < showData.length; i++){
					  var obj = showData[i];
					  tooltip += obj.column_name + " : ";
					  tooltip += obj.column_value + "<br>"
					  
				  }
				  tooltip += "</div>";
				  
				  return tooltip
			},
			
			doGridPoiMarker : function(param){
				
			},
			
			doGridTable : function(list , totalCnt){
				
				var thHtml = "<tr><th>번호</th>";
				var trHtml = "";
				
				for(var i = 0 ; i < list.length;i++){
					trHtml += "<tr>";
					if(list[i].rid != undefined){
						trHtml +="<td>"+list[i].rid+"</td>";
					}else{
						trHtml +="<td>"+list[i].gid+"</td>";
					}
					
					
					for(var j = 0 ; j < $myDataResultMap.data.korColumnDesc.length;j++){
						if(i == 0){
							thHtml += "<th>";
							thHtml += $myDataResultMap.data.korColumnDesc[j].column_name;
							thHtml += "</th>";
						}
						var tdData = list[i][$myDataResultMap.data.korColumnDesc[j].column_id];
						if(tdData == undefined){
							tdData = "";
						}
						trHtml +="<td>"+tdData+"</td>";
					}
					trHtml += "</tr>";
				}
				
				thHtml +="</tr>";
				thHtml += trHtml;
				$("#gridTable").removeClass()
				if($myDataResultMap.data.korColumnDesc.length > 3){
					$("#gridTable").addClass("listTable02");
				}else{
					$("#gridTable").addClass("listTable03");
				}
				$("#gridTable").html(thHtml);
				
				$myDataResultMap.ui.doGridPaging(totalCnt,$myDataResultMap.data.currentPage);
			},
			
			doGridPaging : function(total , page){
				var showPageCount = 10;
				var showList = $("#viewCnt").val();
				
				var totalPageCount = Math.ceil(total / showList);
				var pageSize = Math.ceil(totalPageCount / showPageCount);
				var pageList = Math.ceil(page / showPageCount);
				
				// 시작 페이지
				var startPage = ((pageList - 1) * showPageCount) + 1;
				if (startPage == 0) {
					startPage = 1;
				}
				// 엔드페이지
				var endPage = startPage + showPageCount - 1;
				
				if (endPage > totalPageCount) {
					endPage = totalPageCount;
				}
				var html = "<span class='pageArea'>";
				if(startPage !=1){
					html += "<a data-type='firstPage' data-id='" + 1 + "' href='javascript:$myDataResultMap.ui.goPage("+  1 + ")'>"
					html += "<<</a>";
					html += "<a  data-type='prevPage' data-id='"+ Number(Number(startPage) - 1) + "' href='javascript:$myDataResultMap.ui.goPage("+  Number(Number(startPage) - 1) + ")'>"
					html += "&lt;</a>";
				}
				
				
				for (var i = startPage; i <= endPage; i++) {
					var active = "";
					if (i == page) {
						
						html += "<a class='number current' href='javascript:$myDataResultMap.ui.goPage("+ i + ")' title='Page " + i + "' >" + i + "</a>";
					}else{
						
						html += "<a class='number' href='javascript:$myDataResultMap.ui.goPage("+ i + ")' title='Page " + i + "' >" + i + "</a>";
					}
				}
				
				if (endPage != totalPageCount) {
					html += "<a data-type='nextPage' data-id='"+ Number(Number(endPage) + 1) + "' href='javascript:$myDataResultMap.ui.goPage("+  Number(Number(endPage) + 1) + ")'>"
					html += "&gt;</a>";
					html += "<a  data-type='lastPage' data-id='"+ totalPageCount + "' href='javascript:$myDataResultMap.ui.goPage("+  totalPageCount + ")'>"
					html += ">></a>";
				}
				
				html +="</span>";
				
				$("#gridPaging").html(html);
				$("#gridZone").mCustomScrollbar({axis:"x"});
				$myDataResultMap.ui.doMyDataResultView();
			},
			
			goPage : function(pageIdx){
				//페이지 계산
				$myDataResultMap.data.currentPage = pageIdx;
				var showListCount = Number($("#viewCnt").val());
				
				var startIdx = showListCount * (pageIdx -1);
				var resultCnt = startIdx + showListCount;
				$myDataResultMap.request.getResourceInfo($myDataResultMap.data.resourceInfo.user_id, $myDataResultMap.data.resourceInfo.data_nm, $myDataResultMap.data.resourceInfo.resource_id ,startIdx,resultCnt, $myDataResultMap.ui.doGridTable);
			}
			
			
			
			
	}
	
	
	$myDataResultMap.event = {
			setUIEvent : function(){
				$(".scrollWrapper").mCustomScrollbar({axis:"y"});
				$(".mCSB_container").css("margin-right", "0px");
				
				//데이터보드 열기
				$("#analysisDataBoard").on("click", function() {
					var ck = $(this).hasClass("on");
					if(!ck){
						$myDataResultMap.event.openDataBoard();
					}else{
						$myDataResultMap.event.closeDataBoard();
					}
					$(".dataBoardBox .dbCont .scrolls").height($(".dataBoardBox").height()-350);
				});
				
				//데이터보드 닫기
				$("#dataBoardClose").on("click", function() {
					$myDataResultMap.event.closeDataBoard();
				});
				
				$("#viewCnt").off().on("change",function(){
					$myDataResultMap.ui.goPage(1);
				});
			},
			
			
			/**
			 * 
			 * @name         : openDataBoard
			 * @description  : 데이터보드를 오픈한다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 
			 * @history 	 :
			 */
			openDataBoard : function() {
				$(".dataBoardBox").stop().animate({"right":"0"},200);
				$("#analysisDataBoard").addClass("on").stop().animate({"right":"476px"},200);
			},
			
			/**
			 * 
			 * @name         : closeDataBoard
			 * @description  : 데이터보드를 닫는다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 
			 * @history 	 :
			 */
			closeDataBoard : function() {
				$(".dataBoardBox").stop().animate({"right":"-1500px"},200);
				$("#analysisDataBoard").removeClass("on").stop().animate({"right":"0"},200);
			}
			
	}
	
	
	$myDataResultMap.request = {
			
			/**
			 * 
			 * @name         : getResourceInfo
			 * @description  : 데이터 보드 에 그릴 데이터 호출 page 별
			 * @date         : 2019. 02. 07. 
			 * @author	     : 
			 * @history 	 :
			 */
			//data_nm , startIdx , status, sort_type
			getResourceInfo : function(schema ,data_nm,resource_id, startIdx,resultCnt,callback){
				
				$.ajax({
					type : "POST",
					url : contextPath +"/api/myData/selectResourceInfo.do",
					dataType : "json",
					data : {
						schema	:	schema,
						data_nm : data_nm,
						resource_id : resource_id,
						startIdx : startIdx,
						resultCnt : resultCnt,
						status : true
					},
					beforeSend :  function(){
						
					},
					success : function(res) {
						$myDataResultMap.data.resourceList = res.data.resource;
						
						//callback(res.data.resource , res.data.info.data_cnt);
						callback(res.data.resource , res.successResult.successInfo.scount);
					},
					error : function(xhr, textStatus, error) {
						
					},
					complete : function(data) {
						
					}
					
				});
			}
			
			
	}
	
}(window,document))