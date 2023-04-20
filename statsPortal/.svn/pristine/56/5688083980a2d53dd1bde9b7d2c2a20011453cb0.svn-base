/**
 * 대화형통계지도 다중시계열 화면에 대한 클래스
 * 
 * history : 2021/05/03 초기 작성 version : 1.0 see : 원형(/js/interactive/interactiveMap.js)
 * 
 */
(function(W, D) {
	W.$interactiveMultiTimeSeries = W.$interactiveMultiTimeSeries || {};

	$(document).ready(
		function() {
			$interactiveMultiTimeSeries.event.setUIEvent();
			$interactiveMultiTimeSeries.event.resizePopup(); //SGIS4_1124_다중시계열 스크롤 추가
		});
	
	$interactiveMultiTimeSeries = {
			noReverseGeoCode : false,
			loadingBar : new sop.portal.absAPI(),
			loading : function(p_flag) {
				if (!sop.Util.isUndefined(this.blockUI)) {
					document.body.removeChild(this.blockUI);
					delete this.blockUI;
				}
				if (!sop.Util.isUndefined(this.popupUI)) {
					D.body.removeChild(this.popupUI);
					delete this.popupUI;
				}
				if(p_flag) {
					this.loadingBar.onBlockUIPopup();
					$("#durianMask").css("position","fixed");
					$("#durianMask").css("width","100%");
					$("#durianMask").css("height","100%");
					$("#durianMask").css("background-color", "rgb(117, 117, 117)")
					var lv_div = $("#durianMask").next("div");
					var lv_div_html = ""+lv_div.html();
					if(lv_div_html.indexOf("loding_type01") >= 0) {
						lv_div.css("position","fixed");
						lv_div.css("width","");
						lv_div.css("height","");
						lv_div.css("top","48%");
						lv_div.css("left","48%");
					}
					//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
				}
				else {
					this.loadingBar.onBlockUIClose();
				}
			},
	};

	$interactiveMultiTimeSeries.ui = {
			namespace : "interactiveMultiTimeSeries",
			searchBtnType : "normal",
			mapList : [],
			curMapId : 0,
			isShare : false,// 공유된 정보 유무
			dataGeoJson : [],
			multiDataList : [],
			multYears : [],// 선택 년도 리스트
			yearList : [],// 미선택 년도&선택년도 리스트
			dataSumList : [],
			dataUnit : "",
			ismtsLendData : false, //다중시계열 범례있는지 여부
			dataSumValues : [],
			titleText : "",
			loadingCnt : 0,
			showData : "",
			isFirstView : true,
			
			setMultiTimeSeries : function(){
				//로딩카운트 초기화
		    	$interactiveMultiTimeSeries.ui.loadingCnt = 0;
				$interactiveMultiTimeSeries.loading(true);
				$interactiveMultiTimeSeries.ui.resetMapClear();
				
				//var data = W.opener.$interactiveMap.ui.curDropParams[W.opener.$interactiveMap.ui.curMapId];
				//var multiTimeList = W.opener.$interactiveMap.ui.multiTimeList;
				
				var data = $interactiveMap.ui.curDropParams[$interactiveMap.ui.curMapId];			
				var multiTimeList = $interactiveMap.ui.multiTimeList;

				var api_id = data.api_id;
				var adm_cd = data.adm_cd;
				var	adm_nm = data.adm_nm;
				var tempIndex = 0;
				
				for(var i=0; i<data.param.length; i++){
					if(data.param[i].key == "year"){
						tempIndex = i;
						break;
					}
					/*
					for (var key in data.param[i]) {
					    if(data.param[i][key] == "year"){
							tempIndex = i;
							break;
						}
					}
					*/
				}
				
				//SGIS4_1124 수정 시작
				//지도 화면 초기화
				/*
				for(i=3; i<8; i++){
					$("#mapRgn_"+(i)).css({"display":"block"});
					$("#mapRgn_"+(i)).removeClass("off");
					$("#dataNone_"+(i)).remove();
				}
				
				//지도 네개 아닐때
				var mapViewNoneCnt = 4 - multiTimeList.length;
				for(i=0; i<mapViewNoneCnt; i++){
					$("#mapRgn_"+(7-i)).css({"display":"none"});
					$("#mapRgn_"+(7-i)).addClass("off");
					
					var html = "<div id='dataNone_"+(4-i)+"' style = 'text-align :center;'>";
						html += 	"<img src='/images/totSurv/locationclick.png' alt='년도을 선택하세요' style='margin-top:246px;'>";
						html += 	"<p>년도를 선택하면 지도가 표출됩니다.</p>";
						html += "</div>";
							
					$("#mapArea_"+(4-i)).append(html);
					$("#yearList_"+(4-i)).empty();
					$("#yearList_"+(4-i)).append("<option value='0'>-</option>")
				}
				*/
				var mapViewNoneCnt = 4 - multiTimeList.length;
				//SGIS4_1124 수정 끝
				
				$interactiveMultiTimeSeries.ui.resetPopSize(mapViewNoneCnt); //SGIS4_11024_추가(년도 조회시 팝업사이즈 변경.)
				
				//화면 설정(년도 셀렉트 박스)
				//var dataBoard = W.opener.$interactiveDataBoard.ui.mapData[W.opener.$interactiveDataBoard.ui.map_id].dataBoard;
				var dataBoard = $interactiveDataBoard.ui.mapData[$interactiveDataBoard.ui.map_id].dataBoard;
				var tempYearList = [];
				for(var i=0; i < dataBoard.yearArray.length; i++){
					for(var j=0; j < dataBoard.selectedYearArray.length; j++){
						if(dataBoard.selectedYearArray[j] == dataBoard.yearArray[i] 
							|| (dataBoard.selectedYearArray[j] == "9016" && dataBoard.yearArray[i] == "2016" )) {
							tempYearList.push(parseInt(dataBoard.yearArray[i]));//SGIS4_1029_수정
						}
					}
				}
				var yearHtml = "";
				
				//년도 선택
				$.each(tempYearList, function(index, item){
					yearHtml += "<li class='year_list' id='li_y"+item+"'>";
					yearHtml += "	<input type='checkbox' id='y"+item+"' value='"+item+"' class='year_input' name='multiTimeRange'/>";
					yearHtml += "	<div id='div_y"+item+"' style='font-size: 12px;'>"+item+"</div>";
					yearHtml += "</li>";
				});
				
				$("#yearList").empty();
				$("#yearList").append(yearHtml);
				$(".yearList").mCustomScrollbar({axis:"y"}); //SGIS4_1124 수정
				
				$.each(multiTimeList, function(index, item){
					$('input:checkbox[name="multiTimeRange"]').each(function() {
					     if(this.value == item){ //값 비교
					            this.checked = true; //checked 처리
					      }
					 });
				});
				
				$interactiveMultiTimeSeries.ui.yearListUi(tempYearList, "yearList_1");
				$interactiveMultiTimeSeries.ui.yearListUi(tempYearList, "yearList_2");
				$interactiveMultiTimeSeries.ui.yearListUi(tempYearList, "yearList_3");
				$interactiveMultiTimeSeries.ui.yearListUi(tempYearList, "yearList_4");
				
				//지도 데이터 그리기
				var tempMapIndex = 0;
				var mapIndex = 0;
				//$.each(multiTimeList, function(index, item){
				$.each(tempYearList, function(index, item){
					var tempParam = {};
					var tempData = deepCopy(data.param);
					var map;
					
					//통계년도 변경
					tempData[tempIndex].value = item;
					
					tempParam.filterParam = data.filter;
					tempParam.maxYear = data.maxYear;
					tempParam.title = data.title;
					tempParam.unit = data.unit;
					//SGIS4_1124_추가 시작
					tempParam.isLowSearch = "Y"; 
					if(data.is_zoom_lvl4 != undefined){
						tempParam.is_zoom_lvl4 = data.is_zoom_lvl4;
					}
					if(data.is_non_self != undefined){
						tempParam.is_non_self = data.is_non_self;
					}
					//SGIS4_1124_추가 끝
					tempParam.params = tempData;
					
					if(multiTimeList.includes(item)){
						map = $interactiveMultiTimeSeries.ui.getMap(3+mapIndex);
						mapIndex += 1;
					}else{
						map = $interactiveMultiTimeSeries.ui.getMap(7+tempMapIndex);
						tempMapIndex += 1;
					}
					
					//var map = $interactiveMultiTimeSeries.ui.getMap((index+3));
					//var params = W.opener.$interactiveMap.ui.reqSetParams(tempParam, adm_cd, adm_nm, api_id, map, 'mts');
					//W.opener.$interactiveMap.ui.requestOpenApi(params);
					var params = $interactiveMap.ui.reqSetParams(tempParam, adm_cd, adm_nm, api_id, map, 'mts');
					$interactiveMap.ui.requestOpenApi(params);
				});
				
				//통계 기본자료 세팅
				//var orgin = W.opener.$interactiveMap.ui.multiTimeorigin;
				var orgin = $interactiveMap.ui.multiTimeorigin;
				$interactiveMultiTimeSeries.ui.setStatInfo(data.title, orgin, adm_nm, multiTimeList); //타이틀, 출처, 선택지역, 범례기준년도(선택된 년도만 표출)
				$interactiveMultiTimeSeries.ui.titleText = data.title;
				//지도 셀렉트 박스 초기값 세팅
				$interactiveMultiTimeSeries.ui.setMultiTimeYear(multiTimeList);
				
				//선택 년도 저장.
				$interactiveMultiTimeSeries.ui.multYears = multiTimeList;
				//미선택 년도&선택년도 저장
				$interactiveMultiTimeSeries.ui.yearList = tempYearList;
				
				for(i=0; i<mapViewNoneCnt; i++){
					$("#yearList_"+(4-i)).empty();
					$("#yearList_"+(4-i)).append("<option value='0'>-</option>")
				}
				

				if(mapViewNoneCnt == 4){
					//팝업창 로딩 끝내고
					//알림창
					$interactiveMultiTimeSeries.loading(false);
					messageAlert.open("알림", "데이터가 존재하지 않습니다.");
				}
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
				var map = new sMap.map();
				map.createMap($interactiveMultiTimeSeries, id, {
					center : [ 989674, 1818313 ],
					zoom : 8,
					measureControl : false,
					statisticTileLayer: true,
					isMiniMapShow : false
				});
				
				map.id = seq;
				map.addControlEvent("drop", {accept : ".dragItem"});
				map.addControlEvent("movestart");
				map.addControlEvent("moveend");
				map.addControlEvent("zoomend");	
				map.addControlEvent("draw");
				map.addControlEvent("click");
								
				//범례 호출 함수 
				if(map.id == 3 || map.id == 4 || map.id == 5 || map.id == 6){
				var legend = new sLegendInfo.legendInfo(map);			
				legend.initialize($interactiveMultiTimeSeries.ui);
				map.legend = legend;
				legend.createLegend();
				//map.legend.legendInit();
				legend.legendType = "equal";
				//작업부분 끝
				}
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo(map, $interactiveMultiTimeSeries.ui);
				map.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					//intrPoiControl : true, //
					//intrSettingControl : true,  //설정
					//mapTypeControl : true, //지도
					createZoomTypeBtn : true,
					intrZoomControl : true
				});
		
				map.itemtext = '';
				//사용자지정컨트롤설정
				this.mapList[seq] = map;
				
				if(map.id == 3 || map.id == 4 || map.id == 5 || map.id == 6){
					map.gMap.whenReady(function() {
						map.createHeatMap();
					});
				}
				
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
			
			setmultiTimeStatsData : function(data, options, map){
				var showDataParamName = options.params.filter;
				var unit = options.params.unit;
				var adm_cd = options.params.adm_cd;
				map.data = [];
				var thisYear;
				var thisLowSearch;//SGIS4_1124 추가
				var tempArr = options.params.param
				//SGIS4_1124_4시군구 추가 시작
				var isZoomLvl4 = false;
				var is_interactive = false;
				if(options.params.is_zoom_lvl4 == 'Y' || options.params.is_non_self == 'Y'){
					is_interactive = true;
				}
				if(options.params.is_zoom_lvl4 == 'Y'){
					isZoomLvl4 = true;
				}
				//SGIS4_1124_4시군구 추가 끝
				
				for(var i=0; i<tempArr.length; i++){
					if(tempArr[i].key == "year"){
						thisYear = tempArr[i].value;
					}else if(tempArr[i].key == "low_search"){//SGIS4_1124_추가
						thisLowSearch = tempArr[i].value;//SGIS4_1124_추가
					}//SGIS4_1124_추가
				}
				var yearIndex = $interactiveMultiTimeSeries.ui.yearList.indexOf(thisYear);

				//지도이동
				if(options.center != undefined){
					map.mapMove(options.center);
				}else{
					if(adm_cd != "00"){
						$interactiveMultiTimeSeries.ui.multiTimeSeriesMapMove(map, adm_cd, is_interactive);//SGIS4_1124_수정
					}
				}

				if (data != null) {
					if (showDataParamName != null && showDataParamName.length > 0) {
						data["showData"] = showDataParamName;
						$interactiveMultiTimeSeries.ui.showData = options.params.filter;
					}
					if (unit != null && unit.length > 0) {
						data["unit"] = unit;
					}
					map.data.push(data);
					map.dataForCombine = data;
				}

					if (length == undefined) {
						if (map.combineData.length >= 2) {
							map.combineData = [];
						}
					}
					
					map.combineData.push(data);
					
					if (length != undefined && !isNaN(length)) {
						if (map.combineData.length == length) {
							map.data = map.combineData;
						}
					}else {
						if (map.combineData.length == 2) {
							map.data = map.combineData;
						}
					}

				
				if(map.id == 3 || map.id == 4 || map.id == 5 || map.id == 6){
					map.isMtsNoMapBorder = true;//SGIS4_1124_수정
	
					//SGIS4_1124_추가 시작
					var orginMap = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
					
					map.boundLevel = parseInt(orginMap.boundLevel); 
					map.curPolygonCode = orginMap.curPolygonCode; 
					//SGIS4_1105_추가 끝
					
					//SGIS4_1029_추가 시작
					if(adm_cd == "00" && map.curPolygonCode != 1){
						if(map.multiLayerControl.multiData == null){map.multiLayerControl.multiData = [];}
						map.curPolygonCode = 1;
					}
					//SGIS4_1029_추가 끝
					//SGIS4_1124_추가 시작
					else if(adm_cd.length != 7 && (map.curPolygonCode == 5|| map.curPolygonCode ==4)){
						map.curPolygonCode = 3;
					}else if((options.params.is_non_self == 'Y' || options.params.is_zoom_lvl4 == 'Y') && adm_cd.length == 5){
						adm_cd = adm_cd.substring(0,2);
					}
					//SGIS4_1105_추가 끝


					map.multiLayerControl.reqBoundary2(adm_cd, map.data, "0", isZoomLvl4, function(res){//SGIS4_1124 수정
						res["pAdmCd"] = adm_cd;
						var geoData = map.combineStatsData(res);
						map.addPolygonGeoJson(geoData, "data");
						map.dataGeojsonLayer = geoData;
					});
				}

				//지도 데이터 저장.
				$interactiveMultiTimeSeries.ui.multiDataList[(map.id-3)] = data;
				$interactiveMultiTimeSeries.ui.dataUnit = unit;
				//총합 관련 이벤트
				$interactiveMultiTimeSeries.ui.setSumData(data.result, yearIndex, showDataParamName);
				
				//표 및 정보 표출
				//$interactiveMultiTimeSeries.ui.setBarChart($interactiveMultiTimeSeries.ui.multYears);
				$interactiveMultiTimeSeries.ui.loadingCnt += 1;
				
				//범례설정
				if($interactiveMultiTimeSeries.ui.yearList.length == $interactiveMultiTimeSeries.ui.loadingCnt){
					$interactiveMultiTimeSeries.ui.setBarChart($interactiveMultiTimeSeries.ui.yearList);
					setTimeout(function() {
						if($interactiveMultiTimeSeries.ui.dataSumValues[0] != 0){
							$interactiveMultiTimeSeries.ui.setLegendInfo(3);
						}else if($interactiveMultiTimeSeries.ui.dataSumValues[1] != 0){
							$interactiveMultiTimeSeries.ui.setLegendInfo(4);
						}else if($interactiveMultiTimeSeries.ui.dataSumValues[2] != 0){
							$interactiveMultiTimeSeries.ui.setLegendInfo(5);
						}else{
							$interactiveMultiTimeSeries.ui.setLegendInfo(6);
						}
					}, 7000);
				}
				
				//첫번째 지도에만 범례 표출
				if(map.id != 3 && map.id != null && map.legend != null){
					$("#legend_"+map.legend.id).hide();
					$("#legendBox_"+map.legend.id).hide();
					$("#btn_legend_"+map.legend.id).hide(); 
					
					//mng_s 20220113 이진호
					//축소버튼 hover unbind (오버시 슬라이더 숨기기 버튼 나와서 unbind 처리)
					$("#zoom_"+map.mapBtnInfo.id).find(".rightQuick.rq05").unbind('mouseenter mouseleave');
					//mng_e 20220113 이진호
					
				}else if(map.id == 3){
					//색 못 바꾸게
					$("#legendColor_"+map.legend.id).hide();
					//$("#reverseBtn_"+map.legend.id).hide();//SGIS4_1124 수정
					
					//범례 hide 모드
					//SGIS4_1124 추가 시작
					var legendBox = $("#legendBox_"+map.legend.id);
					legendBox.attr("data-ing", "hide");
					legendBox.addClass("hide");
					$("#colorStatus_"+map.legend.id).find("span").hide();
					//SGIS4_1124 추가 끝
					
					//mng_s 20220113 이진호
					//축소버튼 hover unbind (오버시 슬라이더 숨기기 버튼 나와서 unbind 처리)
					$("#zoom_"+map.mapBtnInfo.id).find(".rightQuick.rq05").unbind('mouseenter mouseleave');
					//mng_e 20220113 이진호
					
				}

			},
			
			yearListUi : function(yearArray, target){
				$('#'+target).empty();
				$.each(yearArray, function(index, item){
					var html = "<option value="+item+">"+item+"</option>";
					$('#'+target).append(html);
				});
			},
			
			/**
			 * 
			 * @name         : multiTimeSeriesMapMove
			 * @description  : 지도 이동..
			 * 
			 */
			multiTimeSeriesMapMove : function(map, adm_cd, is_interactive){//SGIS4_1105_수정
				var sido_cd = adm_cd.substring(0,2); 
				var sigg_cd = adm_cd.substring(2,5);
				var emdong_cd = adm_cd.substring(5);

				var sopPortalmtlCoorObj = new sop.portal.getMapCoordinate.api();
				
				sopPortalmtlCoorObj.addParam("sido_cd", sido_cd);
				if(sigg_cd != "" && sigg_cd != null){
					sopPortalmtlCoorObj.addParam("sgg_cd", sigg_cd);
				}
				if(emdong_cd != "" && emdong_cd != null){
					sopPortalmtlCoorObj.addParam("dong_cd", emdong_cd);
				}
				//SGIS4_1105_4시군구 추가 시작
				if(is_interactive){
					sopPortalmtlCoorObj.addParam("is_interactive", "Y");
				}
				//SGIS4_1105_4시군구 추가 끝
				sopPortalmtlCoorObj.addParam("base_year", map.bnd_year);
				
				sopPortalmtlCoorObj.request({
					method : "POST",
					async : true,
					url : contextPath + "/ServiceAPI/OpenAPI3/map/getMapCoordinate.json",
					options : {
						target : this,
						mapId : map.id,
						callback : function(a,b,c,d){
							map.mapMove([ a, b ], c);
						}
					}
				});
			},
			
			//범례 설정
			setLegendInfo : function(seq){
				for(var i=3; i < 7; i++){
					var map = $interactiveMultiTimeSeries.ui.mapList[i];
					map.legend.legendList = null;
					map.legend.legendCopy2(seq);
					map.isMtsNoMapBorder = true;
				}

				//로딩창 닫기
				$interactiveMultiTimeSeries.loading(false);
				//SGIS4_1124_추가 시작
				$("div").remove(".ajax_mask");
			    $("div").remove(".ajax_loading");
			    //SGIS4_1124_추가 끝
			},
			
			//타입 설정
			changeMaptype : function(type){
				for(var i=3; i < 7; i++){
					var map = $interactiveMultiTimeSeries.ui.mapList[i];
						map.legend.changeDataMode(type);
				}
			},
			
			//지도 셀렉트 박스 초기값 설정
			setMultiTimeYear : function(yearList, target){
				$.each(yearList, function(index, item){
					$("#yearList_"+(index+1)).val(item).prop("selected", true);
				});
			},
			
			//바 차트 생성
			createBarChart : function(target, year, statData, width, height, titleText){
				var rWidth = width + (statData.length*10)
				$("#totalChart").css("width", rWidth+"px");//SGIS4_1124_추가
				$(".totalChart").mCustomScrollbar({axis:"x"});//SGIS4_1124_추가
				
				$("#"+target).highcharts({
					 chart: {
					        type: 'column',
					        width: rWidth,
			  				height: height
					        /*
					        scrollablePlotArea: {
					            minWidth: 700,
					            scrollPositionX: 1
					        }
					        */
					    },
					    title: {
					        text: ''
					    },
					    xAxis: {
					        type: 'category',
					        categories: year,
					        /*
					        scrollbar: {
					            enabled: true
					        },
					        */
					    },
					    yAxis: {
					        title: {
					        	enabled: false
					        },
					        
					    },
					    exporting: {
			  		        enabled: false
			  		    },
					    plotOptions: {
					    	column: {
					            dataLabels: {
					                enabled: false
					            }
					        }
					    },
					    legend: {
					        enabled: false
					    },
					    credits: {
					        enabled: false
					    },
		  			series: [{		  				
		  				name: titleText,
		  				data: statData
		  			}]
				});

			},
			
			setBarChart : function(mutYear){
				var data = $interactiveMultiTimeSeries.ui.dataSumValues;
				var year = mutYear;
				var unit = $interactiveMultiTimeSeries.ui.dataUnit;
				var titleText = $interactiveMultiTimeSeries.ui.titleText;

				//단위 변경
				$(".tit_labelTms").text("단위("+unit+")");
				//차트
				$interactiveMultiTimeSeries.ui.createBarChart('totalChart', year ,data ,258, 180, titleText);
			},
			
			setSumData : function(data, yearIndex, showData){
				var dataSum = 0;
				var filterData  = [];
				
				$.each(data, function(index, item){
					filterData[index] = $interactiveMultiTimeSeries.ui.getFilterData(showData, item);
				});
				
				dataSum = $interactiveMultiTimeSeries.ui.getDataSum(filterData);
				$interactiveMultiTimeSeries.ui.dataSumValues[(yearIndex)] = dataSum;
			},
			
			getDataSum : function(val) {
				var resultSum = 0;
				
				$.each(val, function(index, item){
					if(item == "N/A" || isNaN(item) || item == "NaN"){
						item = 0;
					}
					resultSum +=  parseFloat(item);
				});
				return resultSum
			},
			
			//다중시계열 통계기본정보 표출
			setStatInfo : function(title, orgin, adm_nm, multiTimeList){
				//통계 타이틀
				$("#mainTitle").text(title);
				$("#mainTitle").attr("title", title); //SGIS4_1124_추가
				//지역
				$("#stat_adm_nm").text("지역 : " + adm_nm);//SGIS4_1124_수정
				$("#stat_adm_nm").attr("title", adm_nm);//SGIS4_1124_추가
				//출처
				$("#stat_orgin").text("출처 : " + orgin.substring(0, orgin.lastIndexOf("(")));//SGIS4_1124_수정
				$("#stat_orgin").attr("title", orgin.substring(0, orgin.lastIndexOf("(")));//SGIS4_1124_추가
				//년도별 비교 타이틀
				$("#colTitText1").text("년도별 비교 : " + adm_nm);//SGIS4_1124_수정
				$("#colTitText1").attr("title", "년도별 비교 : " + adm_nm);//SGIS4_1124_수정
				
				//범례 기준년도 세팅
				$interactiveMultiTimeSeries.ui.yearListUi(multiTimeList, "legendYear");
			},
			
			setClickData : function(data, mapId){
				if($interactiveMultiTimeSeries.ui.showData != ""){
					var resultData = [];
					var tempData_0 = null;
					var tempData_1 = null;
					var tempData_2 = null;
					var tempData_3 = null;
					var showData = $interactiveMultiTimeSeries.ui.showData;
					var admCd = data.properties.adm_cd;
					var admNm = data.properties.adm_nm;
					
					var fileterData = [];
					var yoyData = [];
					
					var map_0 = $interactiveMultiTimeSeries.ui.getMap(3);
					var map_1 = $interactiveMultiTimeSeries.ui.getMap(4);
					var map_2 = $interactiveMultiTimeSeries.ui.getMap(5);
					var map_3 = $interactiveMultiTimeSeries.ui.getMap(6);

					if(map_0.dataGeojsonLayer != null){
						$.each(map_0.dataGeojsonLayer.features, function(index, item){
							if(item.properties.adm_cd == admCd){
								tempData_0 = item.info[0];
							}
						});
					}else{
						tempData_0 = null;
					}
					
					if(map_1.dataGeojsonLayer != null){
						$.each(map_1.dataGeojsonLayer.features, function(index, item){
							if(item.properties.adm_cd == admCd){
								tempData_1 = item.info[0];
							}
						});
					}else{
						tempData_1 = null;
					}
					
					if(map_2.dataGeojsonLayer != null){
						$.each(map_2.dataGeojsonLayer.features, function(index, item){
							if(item.properties.adm_cd == admCd){
								tempData_2 = item.info[0];
							}
						});
					}else{
						tempData_2 = null;
					}
					
					if(map_3.dataGeojsonLayer != null){
						$.each(map_3.dataGeojsonLayer.features, function(index, item){
							if(item.properties.adm_cd == admCd){
								tempData_3 = item.info[0];
							}
						});
					}else{
						tempData_3 = null;
					}
					
					fileterData[0] = tempData_0 != null || tempData_0 != undefined ? $interactiveMultiTimeSeries.ui.getFilterData(showData, tempData_0) : 0;
					fileterData[1] = tempData_1 != null || tempData_1 != undefined ? $interactiveMultiTimeSeries.ui.getFilterData(showData, tempData_1) : 0;
					fileterData[2] = tempData_2 != null || tempData_2 != undefined ? $interactiveMultiTimeSeries.ui.getFilterData(showData, tempData_2) : 0;
					fileterData[3] = tempData_3 != null || tempData_3 != undefined ? $interactiveMultiTimeSeries.ui.getFilterData(showData, tempData_3) : 0;
					
					//증감률, 표에 넣을 데이터 
					for(var i=0; i < $interactiveMultiTimeSeries.ui.multYears.length; i++){
						if(i != 0){
							yoyData[i] = $interactiveMultiTimeSeries.ui.calculationYoy(fileterData[i-1], fileterData[i]);
						}else{
							yoyData[i] = 0;
						}
						
						resultData.push({"data" : fileterData[i], "yoyData" : isNaN(yoyData[i]) || yoyData[i] == "NaN" || yoyData[i] == 0 ? "-" : yoyData[i].toFixed(1)});
					}
					
					if(admCd.length == 13){ //집계구
						$("#colTitText2").text("선택지역 비교 : 집계구("+admCd+")");//SGIS4_1124_수정
					}else{ //읍면동, 시군구 ...
						//$("#colTitText").text(admNm+" ("+admCd+")");
						$("#colTitText2").text("선택지역 비교 : " + admNm);//SGIS4_1124_수정
						
					}
					
					$interactiveMultiTimeSeries.ui.selectDataCreatTable(resultData);
				}else{
					for(var i=0; i < $interactiveMultiTimeSeries.ui.multYears.length; i++){
						resultData.push({"data" : 0, "yoyData" : "-"});
					}
				}
					
			},
			
			//보여줄 데이터값 필터링
			getFilterData : function(showData, info){
				var showDataVal = 0;
				
				if(showData == "tot_ppltn"){
					showDataVal = parseFloat(info.tot_ppltn);
				}else if(showData == "tot_ppltn_male"){
					showDataVal = parseFloat(info.tot_ppltn_male);
				}else if(showData == "tot_ppltn_fem"){
					showDataVal = parseFloat(info.tot_ppltn_fem);
				}else if(showData == "avg_age"){
					showDataVal = parseFloat(info.avg_age);
				}else if(showData == "avg_age_male"){
					showDataVal = parseFloat(info.avg_age_male);
				}else if(showData == "avg_age_fem"){
					showDataVal = parseFloat(info.avg_age_fem);
				}else if(showData == "ppltn_dnsty"){
					showDataVal = parseFloat(info.ppltn_dnsty);
				}else if(showData == "aged_child_idx"){
					showDataVal = parseFloat(info.aged_child_idx);
				}else if(showData == "oldage_suprt_per"){
					showDataVal = parseFloat(info.oldage_suprt_per);
				}else if(showData == "juv_suprt_per"){
					showDataVal = parseFloat(info.juv_suprt_per);
				}else if(showData == "tot_suprt_per"){
					showDataVal = parseFloat(info.tot_suprt_per);
				}else if(showData == "corp_cnt"){
					showDataVal = parseFloat(info.corp_cnt);
				}else if(showData == "household_cnt"){
					showDataVal = parseFloat(info.household_cnt);
				}else if(showData == "house_cnt"){
					showDataVal = parseFloat(info.house_cnt);
				}else if(showData == "farm_cnt"){
					showDataVal = parseFloat(info.farm_cnt);
				}else if(showData == "forestry_cnt"){
					showDataVal = parseFloat(info.forestry_cnt);
				}else if(showData == "fishery_cnt"){
					showDataVal = parseFloat(info.fishery_cnt);
				}else if(showData == "tot_family"){
					showDataVal = parseFloat(info.tot_family);
				}else if(showData == "avg_fmember_cnt"){
					showDataVal = parseFloat(info.avg_fmember_cnt);
				}else if(showData == "tot_house"){
					showDataVal = parseFloat(info.tot_house);
				}else if(showData == "nongga_cnt"){
					showDataVal = parseFloat(info.nongga_cnt);
				}else if(showData == "imga_cnt"){
					showDataVal = parseFloat(info.imga_cnt);
				}else if(showData == "imga_ppltn"){
					showDataVal = parseFloat(info.imga_ppltn);
				}else if(showData == "naesuoga_cnt"){
					showDataVal = parseFloat(info.naesuoga_cnt);
				}else if(showData == "naesuoga_ppltn"){
					showDataVal = parseFloat(info.naesuoga_ppltn);
				}else if(showData == "haesuoga_cnt"){
					showDataVal = parseFloat(info.haesuoga_cnt);
				}else if(showData == "employee_cnt"){
					showDataVal = parseFloat(info.employee_cnt);
				}else if(showData == "nongga_ppltn"){
					showDataVal = parseFloat(info.nongga_ppltn);
				}else if(showData == "population"){
					showDataVal = parseFloat(info.population);
				}else if(showData == "data_cnt"){
					showDataVal = parseFloat(info.data_cnt);
				//SGIS4_1124_추가 시작
				}else if(showData == "tot_worker"){
					showDataVal = parseFloat(info.tot_worker);
				}
				//SGIS4_1124_추가 끝
				return showDataVal;
			},
			
			calculationYoy : function(preYear, Year){
				var val = 0;
				if(preYear != 0){
					val = (Year - preYear) / preYear * 100
				}
				
				return val;
			},
			
			selectDataCreatTable : function(data){
				$("#clickMapInfo").empty();
				var html = "";
	
				$.each(data, function(index, item){
					html += '<tr>';
					html += '<td id="year_'+index+'"class="ac">'+$interactiveMultiTimeSeries.ui.multYears[index]+'</td>';
					if(item.data == 0){
						html += '<td id="data_'+index+'">-</td>';
					}else{
						html += '<td id="data_'+index+'">'+appendCommaToNumber(item.data)+'</td>';
					}
					html += '<td id="yoyData_'+index+'">'+item.yoyData+'</td>';
					html += '</tr>';
				});
				$("#clickMapInfo").append(html);
			},
			
			changMapData : function(mapId, year){
				var map = $interactiveMultiTimeSeries.ui.getMap(mapId);
				var data = W.opener.$interactiveMap.ui.curDropParams[W.opener.$interactiveMap.ui.curMapId];
				
				var api_id = data.api_id;
				var adm_cd = data.adm_cd;
				var	adm_nm = data.adm_nm;
				var tempIndex = 0;
				
				for(var i=0; i<data.param.length; i++){
					for (var key in data.param[i]) {
					    if(data.param[i][key] == "year"){
							tempIndex = i;
							break;
						}
					}
				}
				
				var tempParam = {};
				var tempData = deepCopy(data.param);
				
				//통계년도 변경
				tempData[tempIndex].value = year;
				
				tempParam.filterParam = data.filter;
				tempParam.maxYear = data.maxYear;
				tempParam.title = data.title;
				tempParam.unit = data.unit;
				
				tempParam.params = tempData;

				var params = W.opener.$interactiveMap.ui.reqSetParams(tempParam, adm_cd, adm_nm, api_id, map, 'mts');
				W.opener.$interactiveMap.ui.requestOpenApi(params);
				
				//범례 변경
				var seq = 0;
				var ckVal = $("#legendYear").val();
				
				if(ckVal == $("#yearList_1").val()){
					seq = 0;
				}else if(ckVal == $("#yearList_2").val()){
					seq = 1;
				}else if(ckVal == $("#yearList_3").val()){
					seq = 2;
				}else{
					seq = 3;
				}
				setTimeout(function() {
					$interactiveMultiTimeSeries.ui.setLegendInfo(seq);
				}, 6000);
			},
			
			changYearList : function(index, year){
				$interactiveMultiTimeSeries.ui.multYears[index] = year;
				$interactiveMultiTimeSeries.ui.multYears.sort(); //정렬
				
				var newYearList = $interactiveMultiTimeSeries.ui.multYears;
				
				$interactiveMultiTimeSeries.ui.yearListUi(newYearList, "legendYear");
			},
			
			/**
			 * @name         : doCapture
			 * @description  : 보고서의 이미지를 캡쳐한다.
			 */
			doCapture : function(targetId, callback) {
		    	html2canvas($("#"+targetId)[0], {
					logging: false,
					useCORS: false,
					proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
				}).then(function(canvas) {
					var a = document.createElement('a');
    				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    				a.download = "report.png";
    				a.click();
		    	});
		    },
		    
		    /**
			 * @name         : resetMapClear
			 * @description  : 지도 초기화 및 선택비교 초기화, 타입설정 초기화
			 */
		    resetMapClear : function(){
		    	//var mapViewNoneCnt = 4 - length;
		    	
		    	//console.log(mapViewNoneCnt);
		    	
		    	for(var i=3; i<7; i++){
		    		var map = $interactiveMultiTimeSeries.ui.getMap(i);
		    		map.clearDataOverlay();
		    		map.isMtsNoMapBorder = false;
		    		/*
		    		if(mapViewNoneCnt != (7-i)){
		    			map.clearDataOverlay();
		    		}
		    		*/
		    	}
		    
		    	//선택비교
				$("#clickMapInfo").empty();
				
				//타입설정 초기화
				$("#mapType option:eq(0)").prop("selected", "selected");
				
				//차트초기화
				if($("#totalChart").highcharts() !== undefined && $("#totalChart").highcharts() !== null){
					$("#totalChart").highcharts().destroy();
				}
				//$('#totalChart').redraw();
				//데이터 초기화
				$interactiveMultiTimeSeries.ui.yearList = [];
				$interactiveMultiTimeSeries.ui.dataSumValues = [];
				$interactiveMultiTimeSeries.ui.dataUnit = "";
				$interactiveMultiTimeSeries.ui.titleText  = "";
				
				//선택비교 지역 초기화
				$("#colTitText1").html("년도별 비교");
				$("#colTitText2").html("선택지역 비교");//SGIS4_1124_수정
		    },
		    
		    //SGIS4_1124 추가 시작
		    //조회버튼 눌를때마다 지도 div 갯수마다 팝업창 변경
		    resetPopSize : function(noneIndex){
		    	$scrW_1 = $('.resizePopup').width();
		    	
		    	if(noneIndex == 0){
		    		$("#yearMapDiv_3").show();
		    		$("#yearMapDiv_4").show();
		    		
		    		$('#conWrap .con-RTms').css('width','1412px');
		    		$('.mWrap').css('width','1701px');
		    		$('#conWrap').css('max-width','1702px');
		    		if($scrW_1 == '1190'){
		    			$('#conWrap .closePop').css('left','1182px');
		    		}else{
		    			$('#conWrap .closePop').css('left','1700px');
		    		}
		    		
		    	}else if(noneIndex == 1){
		    		$("#yearMapDiv_3").show();
		    		$("#yearMapDiv_4").hide();
		    		
		    		$('#conWrap .con-RTms').css('width','1059px');
		    		$('.mWrap').css('width','1346px');
		    		$('#conWrap').css('max-width','1347px');
		    		if($scrW_1 == '1190'){
		    			$('#conWrap .closePop').css('left','1182px');
		    		}else{
		    			$('#conWrap .closePop').css('left','1329px');
		    		}
		    	}else if(noneIndex == 2){
		    		$("#yearMapDiv_3").hide();
		    		$("#yearMapDiv_4").hide();
		    		
		    		$('#conWrap .con-RTms').css('width','706px');
		    		$('.mWrap').css('width','1000px');
		    		$('#conWrap').css('max-width','991px');
		    		$('#conWrap .closePop').css('left','977px');
		    	}
		    		
		    }
		  //SGIS4_1124 추가 끝
	};
	
	// ==============================//
	// map event callback
	// 이 콜백 함수들은 두 개의 지도 모두에 해당하는 콜백 함수이다. 함수에 대한 정의를 할 때는 신중하게 해야한다.
	// ==============================//
	$interactiveMultiTimeSeries.callbackFunc = {
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
				
			},
			
			/**
			 * 
			 * @name         : didMouseOverPolygon
			 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
			 * 
			 */
			didMouseOverPolygon : function(event, data, type, map) {
				
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
				$interactiveMultiTimeSeries.ui.setClickData(data, map.id);
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
				
			}
	};
	
	$interactiveMultiTimeSeries.event = {
			
			/**
			 * 
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * 
			 */	
			setUIEvent : function() {
				var body = $("body");
				
				//범례 기준년도
				body.on("change", "#legendYear", function(){
		        	var mapId = 0;
		        	
		        	if($(this).val() == $("#yearList_1").val()){
		        		mapId = 0;
		        	}else if($(this).val() == $("#yearList_2").val()){
		        		mapId = 1;
		        	}else if($(this).val() == $("#yearList_3").val()){
		        		mapId = 2;
		        	}else{
		        		mapId = 3;
		        	}

		        	$interactiveMultiTimeSeries.ui.setLegendInfo(mapId);
			    });
				
				//타입 설정(색상, 버블, 열 , 점)
				body.on("change", "#mapType", function(){
		        	$interactiveMultiTimeSeries.ui.changeMaptype($(this).val());
			    });
				
				//지도 해당년도 변경
				body.on("change", "select[id^='yearList_']", function(){
					//년도 중복확인
					for(var i=1; i < 5; i++){
						if("yearList_"+i !=  $(this).attr('id')){
							if($(this).val() == $("#yearList_"+i).val()){
								var index = $(this).data("index");
								messageAlert.open("알림", "해당 년도가 존재합니다.");
								$(this).val($interactiveMultiTimeSeries.ui.multYears[index]).prop("selected", true);
								return false;
							}
						}
					}
					$interactiveMultiTimeSeries.loading(true);
					
					//숨긴지도일 경우 다시 활성화
					var onMapId = $(this).data("index") +1;
					if($("#mapRgn_"+onMapId).hasClass("off")){
						$("#mapRgn_"+onMapId).css({"display":"block"});
						$("#mapRgn_"+onMapId).removeClass("off");
						
						$("#dataNone_"+$(this).data("index") +1).remove();
					}

					//범례 기준년도 리스트 다시..
					$interactiveMultiTimeSeries.ui.changYearList($(this).data("index"), $(this).val()); //index, year
					
		        	//지도 및 통계 호출
					$interactiveMultiTimeSeries.ui.changMapData($(this).data("index"), $(this).val()); //mapId, year
			    });
				
				/*
				body.on("click", ".year_input", function(){
					
					
					var ck = $('input:checkbox[name="multiTimeRange"]:checked').length
					
					if(ck <= 4){
						var selectYears = [];
						
						if($("input:checkbox[name=multiTimeRange]").is(":checked") == true) {
							$("input[name=multiTimeRange]:checked").each(function(i){
								selectYears.push(parseInt($(this).val()));
							});
						}
						
						//W.opener.$interactiveMap.ui.multiTimeList = selectYears;
						$interactiveMap.ui.multiTimeList = selectYears;
						
						//$interactiveMultiTimeSeries.ui.resetMapClear(selectYears.length);
						$interactiveMultiTimeSeries.ui.resetMapClear();
						$interactiveMultiTimeSeries.ui.setMultiTimeSeries();
						
					}else{
						messageAlert.open("알림", "4개 년도 까지 선택할 수 있습니다.");
						this.checked = false;
					}
				});
				*/
				body.on("click", ".closePop", function(){
					$("#multiTimeSeriesPopup").hide();
					$interactiveMultiTimeSeries.ui.isFirstView = false;
				});
				
				body.on("click", "#yearSelectBtn", function(){
					
					
					var ck = $('input:checkbox[name="multiTimeRange"]:checked').length
					
					//SGIS4_1124 추가 시작
					if(ck < 2){
						messageAlert.open("알림", "최소 2개 년도를 선택해 주세요.");
					//SGIS4_1124 추가 끝
					}else if(ck <= 4){//SGIS4_1124 수정
						var selectYears = [];
						
						if($("input:checkbox[name=multiTimeRange]").is(":checked") == true) {
							$("input[name=multiTimeRange]:checked").each(function(i){
								selectYears.push(parseInt($(this).val()));
							});
						}
						
						//W.opener.$interactiveMap.ui.multiTimeList = selectYears;
						$interactiveMap.ui.multiTimeList = selectYears;
						
						//$interactiveMultiTimeSeries.ui.resetMapClear(selectYears.length);
						$interactiveMultiTimeSeries.ui.resetMapClear();
						$interactiveMultiTimeSeries.ui.setMultiTimeSeries();
						
					}else{
						messageAlert.open("알림", "4개 년도 까지 선택할 수 있습니다.");
					}
				});
			},
			
			//SGIS4_1124_다중시계열 스크롤 적용 시작
			resizePopup : function(){
				var $winW = $(window).width() - 90;
				
				$scr_1 = $('.conWrap');
				$scrW_1 = $('.conWrap').width();
				
				$scr_2 = $('.resizePopup');
				$scrW_2 = $('.resizePopup').width();
				
				$scr_1.css({width:$winW + 'px', maxWidth:1703+'px'});
				$scr_2.css({width:$winW + 'px', maxWidth:1703+'px'});
				
				if($scrW_2 == '1190'){
	    			$('#conWrap .closePop').css('left','1182px');
	    		}else{
	    			$('#conWrap .closePop').css('left','1700px');
	    		}
			}
			//SGIS4_1124_다중시계열 스크롤 적용 끝
			
	};
	/*********** 행정구역코드로 좌표 검색 Start **********/
	(function () {
		$class("sop.portal.getMapCoordinate.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if (res.errCd == "0") {
					var coorData = res.result;
					var x_coor = "";
					var y_coor = "";
					var zoomLevel = 0;
					if(typeof(coorData.sidoCoor) != "undefined"){
						x_coor = coorData.sidoCoor.x_coor;
						y_coor = coorData.sidoCoor.y_coor;
						zoomLevel = 4;
					}else if(typeof(coorData.sggCoor) != "undefined"){
						x_coor = coorData.sggCoor.x_coor;
						y_coor = coorData.sggCoor.y_coor;
						zoomLevel = 6;
					}else{
						x_coor = coorData.dongCoor.x_coor;
						y_coor = coorData.dongCoor.y_coor;
						zoomLevel = 8;
					}
					
					if (options.callback != undefined && options.callback != null && options.callback instanceof Function) {
						options.callback.call(undefined, x_coor, y_coor, zoomLevel);
					}
					
				}else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						if (options.center != undefined && options.center != null) {
							if(errCount < 10){
								errCount++;
								that.getMapCoordinate(options.center, options.callback); //2017-08-16 [개발팀] 콜백추가
							}
						}
					});
				}else if (res.errCd = "-100") {
					//2017-08-22 [개발팀] 네비개이션 사용하지 않을 경우, 예외처리
					/*
					if (that.mapNavigation != null) {
						that.mapNavigation.notFoundData(that);
					}
					*/
				}
			},
			onFail : function (status) {
				
			}
		});
	}());
	/*********** 행정구역코드로 좌표 검색 End **********/
	//SGIS4_1124_다중시계열 스크롤 추가 시작
	$(W).resize(function(){
		$interactiveMultiTimeSeries.event.resizePopup(); 
	});
	//SGIS4_1124_다중시계열 스크롤 끝
}(window, document));
