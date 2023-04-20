/**
 * 
 */
(function(W, D) {
	W.$reportForm = W.$reportForm || {}
	
	$(document).ready(function() {	
		/*function LockF5() { 
	        if (event.keyCode == 116) { 
	            event.keyCode = 0; 
	            return false; 
	        }	
	    } 
	    document.onkeydown = LockF5;*/
	});
	
	$(window).load(function() {
		/*
		setTimeout(function() {
			if (window.opener.$catchmentAreaMain != undefined) {
				window.opener.$catchmentAreaMain.ui.reportLoad();
			}
		}, 500);
		*/
	});

	$reportForm.ui = {
				bringDataCnt : 0,
				map : null,
				datas : null,
				mapType : null,
				totalDataList : null,
				dataGeojson : [],
				delegate : null,
				menuType : {
					"intro"     : 0,
					"jobArea"   : 1,
					"jobChange" : 2,
					"areaInfo"  : 3,
					"areaSearch": 4,
					"population": 5,
					"school"	: 6,
					"metro"		: 7,
					"busStop"	: 8,
					"cctv"		: 9 //2017.06.26 [개발팀] kcu 공공데이터 추가
				},
				
				companyName : {
					theme_sum_01 : "교육시설",
					theme_sum_02 : "공공기관",
					theme_sum_03 : "금융시설",
					theme_sum_04 : "의료시설",
					theme_sum_05 : "대중교통",
					theme_sum_06 : "방범/방재",
					theme_sum_07 : "백화점/중대형마트",
					theme_sum_08 : "편의점",
					theme_sum_09 : "극장/영화관",
					theme_sum_10 : "도서관/박물관"
				},
				
				/**
				 * @name         : createMap
				 * @description  : 맵을 생성한다.
				 * @date         : 2015. 11. 10. 
				 * @author	     : 권차욱
				 * @param divId  : 맵 엘리먼트 아이디
				 * @param seq	 : 맵의 순번
				 */
				createMap : function() {
					//window.opener.$catchmentAreaMain.ui.createMap("reportMapDiv", 2);
				},
				
				/**
				 * @name         : setData
				 * @description  : 보고서를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 * @param maType : 보고서타입
				 */
				setData : function(data,option) {
					//this.createMap();
					//this.datas = data;
					//this.mapType = options.mapType;
					this.drawMap(data.params.mapId,"reportMapDiv");			//지도생성
					this.setMainReportInfo(data);	//보고서 제목, 출처, 일자 등 생성
					//this.setLegend(data, options);	//범례생성
					this.setChart(data);	//차트생성
					this.setTeble(data, option);	//표생성
				},
				
				/**
				 * @name         : drawMap
				 * @description  : 보고서의 지도화면을 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param options: 옵션파라미터
				 */
				drawMap : function(mapId,reportId) {
					/*기본지도 복사*/
					if(W.opener){
						var clone = W.opener.$("#mapRgn_"+mapId).clone();
						var originWidth = W.opener.$("#mapRgn_"+mapId).width();
						var originHeight = W.opener.$("#mapRgn_"+mapId).height();
						var w = 798;
						var h = 603;
						
						var scaleWidthValue = (originWidth / w).toFixed(2);
		 	 			var scaleHeightValue = (originHeight / h).toFixed(2);
		 	 			var scaleWidth = (w / originWidth);		// + 0.2;
		 	 			var scaleHeight = (h / originHeight);	// - 0.2;
						
						var reportMapCss = {
								"width" : originWidth+"px",
								"height" : originHeight+"px",
								/*"overflow":"visible",*/
								"overflow":"hidden",
								"margin-left" : ((originWidth -w)*-1) / 2 + "px",
								/*"margin-top" : ((originHeight - h)*-1.5) / 2 + "px"*/
								"margin-top" : ((originHeight - h)*-1) / 2 + "px"
								//"margin-left" : "0px",
								//"margin-top" : "0px"
						};
						
						if(originWidth < w) {
							reportMapCss["transform"] = "scale("+scaleHeight+", "+scaleHeight+")";
						} else {
							reportMapCss["transform"] = "scale("+scaleWidth+", "+scaleWidth+")";
						}
						
						$(clone).find(".sop-control").hide();
						
						$("#"+reportId).html($(clone).html());
						$("#"+reportId).css(reportMapCss);
						
						//열지도의 경우, 
						//canvas에 열지도를 그리는 것이라 html을 clone할 때,
						//데이터는 복사되지 않아 그려지지 않는다.
						//따라서 기존의 canvas를 다시 redraw하여 표출한다.
						if ($(clone).find(".sop-heatmap-layer").length) {
							var originCanvas = $(W.opener.document).find(".sop-heatmap-layer")[0]
							var image = new Image();
							image.src = originCanvas.toDataURL("image/png");
							
							var canvas = $(".sop-heatmap-layer")[0];
							if (canvas != undefined) {
								canvas.width = image.width;
								canvas.height = image.height;
								canvas.getContext("2d").drawImage(image, 0, 0);
							}
						}
						this.setLegend(mapId);//범례생성
					}else{
						alert("비정상적인 접근입니다");
						self.close();
					}
				},
				
				/**
				 * @name         : drawPolygon
				 * @description  : 맵에 폴리곤을 그린다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				drawPolygon : function(data) {
					var legend = new sLegendInfo.legendInfo(this.map);			
					legend.initialize($reportForm.ui);
					this.map.legend = legend;
					this.map.legend.valPerSlice = data.legend.valPerSlice;
					this.map.legend.legendColor = data.legend.legendColor;
					this.map.legend.legendType = data.legend.legendType;
					this.map.legend.numberData = data.isCaption;
					this.map.legend.selectType = data.dataType;
					legend.valPerSlice = data.legend.valPerSlice;
					legend.legendColor = data.legend.legendColor;
					
					var adm_cd = "";
					if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
						for (var i=0; i<data.geojson.length; i++) {
							if (i==0) {
								adm_cd = data.geojson[i].features[0].properties.adm_cd;
							}					
							this.dataGeojson.push(this.map.addPolygonGeoJson(data.geojson[i], "data"));
						}
					}else {
						adm_cd = data.geojson.features[0].properties.adm_cd;
						this.dataGeojson.push(this.map.addPolygonGeoJson(data.geojson, "data"));
					}	
					this.map.legend.changeDataMode(data.dataType);
					
					//layer의 이벤트를 제거한다.
					this.map.gMap.eachLayer(function(layer) {
						layer.off("mouseover");
						layer.off("mouseout");
					});
				},
				
				/**
				 * @name         : setMainReportInfo
				 * @description  : 보고서의 기본적인 정보를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setMainReportInfo : function(data) {
					var title = "생활권역 통계지도"
					var rangeText,yearText, rangeTypeText= "";
					var index = data.params.index;
					
					// 보고서 타이틀 정보 start
					if(data.params.rangeType ==  "stats01"){
						rangeTypeText = "주행시간 기준 "
					}else if(data.params.rangeType ==  "stats02"){
						rangeTypeText = "주행거리 기준 "
					}else{
						rangeTypeText = "반경 기준 "
					}

					//영향권 보고서
					if(data.params.reportType == "srv"){
						rangeText = rangeTypeText + window.opener.$catchmentAreaMain.ui.reportRangeText;
						yearText = "인구/가구/주택 (" + data.params.base_year+ "년), 사업체/종사자 (" + data.params.copr_base_year +"년)"
					}else{//격자보고서
						rangeText = rangeTypeText + window.opener.$catchmentAreaMain.ui.reportRangeText;
						yearText = data.params.base_year +"년"
					}

					//보고서명
					$("#reportTitle").val(title);
					//기준정보
					$("#statLocation").text(data.params.statLocation);//선택지점
					$("#statRange").text(rangeText);//선택범위
					$("#statYear").text(yearText);//선택년도
					//작성일자
					$("#date").text($reportForm.Util.getToday());
				},
				
				/**
				 * @name         : setLegend
				 * @description  : 보고서의 범례를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setLegend : function(option) {
					var reportLegendCss = {
		 	 				"width" : "258px",
			 	 			"margin-left" : "80px",
			 	 			"margin-top":"15px"
		 	 		};
					
					$("#legendDiv").attr("src", option.legendImg);
					$("#legendDiv").css(reportLegendCss);
					/*
					var map, legend, title, unit;
					if (window.opener.$interactiveMap != undefined) {
						map = window.opener.$interactiveMap.ui.mapList[data.id];
					}else if (window.opener.$bizStatsMap != undefined) {
						map = window.opener.$bizStatsMap.ui.mapList[data.id];
					}
					
					//대화형통계지도
					if (this.mapType == "interactiveMap" || this.mapType == "userData") {
						if ( data.param.isKosis != undefined && data.param.isKosis ) {
							unit = data.data[0].UNIT;
						}else if( data.param.isEcountry != undefined && data.param.isEcountry ){
							unit = data.data.UNIT;
						}else {
							unit = data.param.unit;
						}
						legend = $(map.legend.legendObj).clone().removeClass("min");
						if (unit != undefined) {
							title = "범례 (단위 : " + unit + ")";
						}else {
							title = "범례";
						}
						
						$("#legend").append($(legend).html());
						$("#legendTitle").html(title);
						$("#legend").find(".legendBox").removeClass("min");
						$("#legend").find(".legendRound").hide();
						$("#legend").find(".lgListBox").hide();
						$("#legend").find(".legendRrefresh").css("right", "13px");
					}
					//생활업종지도
					else if (this.mapType == "bizStatsMap") {
						switch(this.menuType[data.dataType]) {
							case 0:
							case 3:
							case 4:
								legend = options.legend;
								$(".pntLeft").css("width", "130px");
								$(".pntRight").css("width", "660px");
								$("#legend").append($(legend).html());
								$("#legendTitle").html("범례");
								break;
							case 1:
								legend = $(map.legend.legendObj).clone().removeClass("min");
								title = "범례 (단위 : 개)"; 
								$("#legend").append($(legend).html());
								$("#legendTitle").html(title);
								$("#legend").find(".legendRound").hide();
								$("#legend").find(".lgListBox").hide();
								$("#legend").css("width", "205px");
								break;
							case 2:
								legend = $(map.legend.legendObj).clone().removeClass("min");
								title = "범례 (단위 : 개)"; 
								$("#legend").append($(legend).html());
								$("#legendTitle").html(title);
								$("#legend").find(".legendRound").hide();
								$("#legend").find(".lgListBox").hide();
								$("#legend").css("width", "205px");
								break;
						}
					}
					*/
				},
				
				getData : function(data, target){
					
					$.each(data.stats, function(index, item){
						if(item.name == "popsDatas" && target == "popsDatas"){
							target = item.data;
						}else if(item.name == "genderDatas" && target == "genderDatas"){
							target = item.data;
						}else if(item.name == "familyDatas" && target == "familyDatas"){
							target = item.data;
						}else if(item.name == "houseDatas" && target == "houseDatas"){
							target = item.data;
						}else if(item.name == "top3_coprData" && target == "top3_coprData"){
							target = item.data;
						}else if(item.name == "tempCoprData" && target == "tempCoprData"){
							target = item.data;
						}else if(item.name == "top3_workerData" && target == "top3_workerData"){
							target = item.data;
						}else if(item.name == "tempWorkerData" && target == "tempWorkerData"){
							target = item.data;
						}else if(item.name == "areaSize" && target == "areaSize"){
							target = item.data;
						}else if(item.name == "chartTitleText" && target == "chartTitleText"){
							target = item.data;
						}else if(item.name == "statYear" && target == "statYear"){
							target = item.data;
						}else if(item.name == "statData" && target == "statData"){
							target = item.data;
						}else if(item.name == "itgSgg" && target == "itgSgg"){
							target = item.data;
						}else if(item.name == "grid_cnt" && target == "grid_cnt"){
							target = item.data;
						}else if(item.name == "grid_area" && target == "grid_area"){
							target = item.data;
						}else if(item.name == "gridLevelNm" && target == "gridLevelNm"){
							target = item.data;
						}else if(item.name == "schCondNm" && target == "schCondNm"){
							target = item.data;
						}else if(item.name == "unit" && target == "unit"){
							target = item.data;
						}else if(item.name == "totSum" && target == "totSum"){
							target = item.data;
						}else if(item.name == "totAvg" && target == "totAvg"){
							target = item.data;
						}else if(item.name == "totPopCnt" && target == "totPopCnt"){
							target = item.data;
						}else if(item.name == "totGenderCnt" && target == "totGenderCnt"){
							target = item.data;
						}else if(item.name == "totFamilyCnt" && target == "totFamilyCnt"){
							target = item.data;
						}else if(item.name == "totHouseCnt" && target == "totHouseCnt"){
							target = item.data;
						}else if(item.name == "totCoprData" && target == "totCoprData"){
							target = item.data;
						}else if(item.name == "totWorkerData" && target == "totWorkerData"){
							target = item.data;
						}else if(item.name == "coprDatas" && target == "coprDatas"){
							target = item.data;
						}else if(item.name == "workerDatas" && target == "workerDatas"){
							target = item.data;
						}
					});
					
					return target;
				},
				
				emptyOnePieChart : function(divId, pWidth, pHeight, target){
					var statData = [];
					var statColors = ['#E9E9E9'];
					statData.push({name : "검색결과 없음", y : 100});

					$(divId).highcharts({
							chart: {
				  				type: 'pie',
				  				spacingTop: 0,
				  				spacingRight: 0,
				  				spacingBottom: 0,
				  				spacingLeft: 0,
				  				width: pWidth,
				  				height: pHeight
				  			},
				  			title: {
				  				text : ''
				  			},
				  			tooltip: {
				  		        pointFormat: ''
				  		    },
				  			exporting: {
				  		        enabled: false
				  		    },
				  			plotOptions: {
								pie: {
									allowPointSelect: true,
								    cursor: 'pointer',
								    dataLabels: {
								        enabled: false
								    }
			                   }
			               },
			               series: [{
				  				size: '100%',
				  			    innerSize: '50%',
				  				data: statData,
				  				colors : statColors
				  			}]
						});
					
					//2017.03.13 pdf저장 이슈
					setTimeout(function() {
						$reportForm.Util.chartToImage(divId, target, pWidth, pHeight);
					}, 500);
				},
				
				/**
				 * @name         : setChart
				 * @description  : 차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setChart : function(data) {
					var index = data.params.index;
					var indexText = data.params.indexText;
					var reportType = data.params.reportType;
					var rangeTypeText ="";
					this.bringDataCnt += 1; 
					
					if(data.params.rangeType ==  "stats01"){
						rangeTypeText = "주행시간 기준 "
					}else if(data.params.rangeType ==  "stats02"){
						rangeTypeText = "주행거리 기준 "
					}else{
						rangeTypeText = "반경 기준 "
					}

					if(reportType == "srv"){
						
						//데이터
						var popsDatas = this.getData(data, "popsDatas");
						var genderDatas = this.getData(data, "genderDatas");
						var houseDatas = this.getData(data, "houseDatas");
						var familyDatas = this.getData(data, "familyDatas");
						var coprDatas = this.getData(data, "coprDatas");
						var workerDatas = this.getData(data, "workerDatas");
						
						var totPopCnt = this.getData(data, "totPopCnt");
						var totGenderCnt = this.getData(data, "totGenderCnt");
						var totFamilyCnt = this.getData(data, "totFamilyCnt");
						var totHouseCnt = this.getData(data, "totHouseCnt");
						
						//색상
						var popsColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0'];
						//SGIS4_1025_생활권역 시작
						var familyColor = ['#ED5980', '#ffaa01', '#7DB6E9'];
						//SGIS4_1025_생활권역 끝
						var houseColor = ['#7DB6E9','#ffaa01','#93EC85','#fed747', '#35908F','#ED5980'];
						//var top3Color = ['#C5D3F6', '#FFAA01', '#FED747'];
						//var tempColor = ['#E9E9E9'];
						//SGIS4_생활권역 시작	
						var coprColor = ['#D66B44', '#FFAA01', '#FED747','#E9E9E9'];
						//SGIS4_생활권역 끝	
						
						$("#show0"+index).show();
						$("#statDataTitle0"+index).text(rangeTypeText+" "+indexText);

						//나이
						if(popsDatas != undefined && popsDatas != null && popsDatas.length > 0 && totPopCnt > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv01",popsDatas,430,300,"인구","명","#sa0"+index+"_pntChart01",popsColor);
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv01", 430, 300, "#sa0"+index+"_pntChart01");
						}
						
						//남녀
						if(genderDatas != undefined && genderDatas != null && genderDatas.length > 0 && totGenderCnt > 0){
							this.addBarChart("#sa0"+index+"_pieChartDiv02",['남','여'],genderDatas,430,300,"","#sa0"+index+"_pntChart02");
						}else{
							this.addBarChart("#sa0"+index+"_pieChartDiv02",['남','여'],[0,0],430,300,"","#sa0"+index+"_pntChart02");
						}
						
						//가구
						if(familyDatas != undefined && familyDatas != null && familyDatas.length > 0 && totFamilyCnt > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv03",familyDatas,430,300,"가구","가구","#sa0"+index+"_pntChart03",familyColor);
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv03", 430, 300, "#sa0"+index+"_pntChart03");
						}
						
						//주택
						if(houseDatas != undefined && houseDatas != null && houseDatas.length > 0 && totHouseCnt > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv04",houseDatas,430,300,"주택","개","#sa0"+index+"_pntChart04",houseColor);
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv04", 430, 300, "#sa0"+index+"_pntChart04");
						}
						
						if(coprDatas != undefined && coprDatas != null && coprDatas.length > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv05",coprDatas,430,300,"사업체","개","#sa0"+index+"_pntChart05",coprColor);//사업체
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv05", 430, 300, "#sa0"+index+"_pntChart05");
						}
						
						if(workerDatas != undefined && workerDatas != null && workerDatas.length > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv06",workerDatas,430,300,"종사자","명","#sa0"+index+"_pntChart06",coprColor);//종사자
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv06", 430, 300, "#sa0"+index+"_pntChart06");
						}
						
						//this.addTwoPoiChart("#sa0"+index+"_pieChartDiv05",top3_copeDatas,copeDatas,430,300,"사업체","개","#sa0"+index+"_pntChart05",top3Color,tempColor);//사업체
						//this.addTwoPoiChart("#sa0"+index+"_pieChartDiv06",top3_workerDatas,workerDatas,430,300,"종사자","명","#sa0"+index+"_pntChart06",top3Color,tempColor);//종사자
						
						if(window.opener.$catchmentAreaMain.ui.reportSelectRange == this.bringDataCnt){
							$("#mask").hide();
							$("#wrap").show();
							this.setNewDiv(reportType); //보고서 타입설정(1:영향권, 2:격자)
						}
					}else{
						var chartTitleText = this.getData(data, "chartTitleText");
						var statYear = this.getData(data, "statYear");
						var statData = this.getData(data, "statData");
						var schCondNm = this.getData(data, "schCondNm");
						
						if(statData.length > 0){
							//this.addBarChart("#barChart",statYear,statData,600,500,"영역 전체 총 "+chartTitleText+" 변화","#gridPntChart");
							this.addBarChart("#barChart",statYear,statData,600,400,"","#gridPntChart");
						}else{
							//this.addBarChart("#barChart",'데이터 없음',[0],600,500,"영역 전체 총 "+chartTitleText+" 변화","#gridPntChart");
							this.addBarChart("#barChart",statYear,statData,600,400,"","#gridPntChart");
						}
						
						
						$("#mask").hide();
						$("#wrap").show();
						this.setNewDiv(reportType); //보고서 타입설정(1:영향권, 2:격자)
						
						$("#headerText01").text("영역 전체 "+chartTitleText+" 변화");
						$("#headerText02").text("선택 조건  : "+schCondNm);
						
						$("#gridPntChart").find("img").css("margin-left","70px")
					}

				},
				
				/**
				 * @name         : setTeble
				 * @description  : 표에 정보를 입력한다.
				 * @param data   : 보고서데이터
				 */
				setTeble : function(data, option){
					var reportType = data.params.reportType;
					
					if(reportType == "srv"){
						var index = data.params.index;
						var areaSize = this.getData(data, "areaSize");
						var totPopCnt = this.getData(data, "totPopCnt");
						var totGenderCnt = this.getData(data, "totGenderCnt");
						var totFamilyCnt = this.getData(data, "totFamilyCnt");
						var totHouseCnt = this.getData(data, "totHouseCnt");
						var PopsHtml,genderHtml,familyHtml,houseHtml,coprHtml,workerHtml = "";
						
						PopsHtml += '<tr>';
						PopsHtml += '<td id="ageNm_0" class="ac">전체</td>';
						PopsHtml += '<td id="ageCnt_0">'+$reportForm.Util.addComma(totPopCnt)+'</td>';
						PopsHtml += '<td id="agePer_0">100</td>';
						PopsHtml += '</tr>';
						
						var tmpPopsData = this.getData(data, "popsDatas");
						if(tmpPopsData != undefined && tmpPopsData != null && tmpPopsData.length > 0){
							var popsDatas = $reportForm.Util.tableDataPercntage(tmpPopsData, totPopCnt);
							
							$.each(popsDatas, function(index, item){
								PopsHtml += '<tr>';
								PopsHtml += '<td id="ageNm_'+index+1+'"class="ac">'+item.name+'</td>';
								PopsHtml += '<td id="ageCnt_'+index+1+'">'+$reportForm.Util.addComma(item.y)+'</td>';
								PopsHtml += '<td id="agePer_'+index+1+'">'+item.per+'</td>';
								PopsHtml += '</tr>';
							});
						}
						
						genderHtml += '<tr>';
						genderHtml += '<td id="genderNm__0" class="ac">전체</td>';
						genderHtml += '<td id="genderCnt_0">'+$reportForm.Util.addComma(totGenderCnt)+'</td>';
						genderHtml += '<td id="genderPer_0">100</td>';
						genderHtml += '</tr>';
						
						var tmpGenderData  = this.getData(data, "genderDatas");
						if(tmpGenderData != undefined && tmpGenderData != null && tmpGenderData.length > 0){
							var genderDatas = $reportForm.Util.tableDataPercntage(tmpGenderData, totGenderCnt);

							$.each(genderDatas, function(index, item){
								genderHtml += '<tr>';
								genderHtml += '<td id="genderNm_'+index+1+'"class="ac">'+item.name+'</td>';
								genderHtml += '<td id="genderCnt_'+index+1+'">'+$reportForm.Util.addComma(item.y)+'</td>';
								genderHtml += '<td id="genderPer_'+index+1+'">'+item.per+'</td>';
								genderHtml += '</tr>';
							});
						}
						
						houseHtml += '<tr>';
						houseHtml += '<td id="houseNm_0" class="ac">전체</td>';
						houseHtml += '<td id="houseCnt_0">'+$reportForm.Util.addComma(totHouseCnt)+'</td>';
						houseHtml += '<td id="housePer_0">100</td>';
						houseHtml += '</tr>';
						
						var tmpHouseData = this.getData(data, "houseDatas");
						if(tmpHouseData != undefined && tmpHouseData != null && tmpHouseData.length > 0){
							var houseDatas = $reportForm.Util.tableDataPercntage(tmpHouseData, totHouseCnt);
							
							$.each(houseDatas, function(index, item){
								houseHtml += '<tr>';
								houseHtml += '<td id="houseNm_'+index+1+'"class="ac">'+item.name+'</td>';
								houseHtml += '<td id="houseCnt_'+index+1+'">'+$reportForm.Util.addComma(item.y)+'</td>';
								houseHtml += '<td id="housePer_'+index+1+'">'+item.per+'</td>';
								houseHtml += '</tr>';
							});
						}
						
						familyHtml += '<tr>';
						familyHtml += '<td id="familyNm_0" class="ac">전체</td>';
						familyHtml += '<td id="familyCnt_0">'+$reportForm.Util.addComma(totFamilyCnt)+'</td>';
						familyHtml += '<td id="familyPer_0">100</td>';
						familyHtml += '</tr>';
						
						var tmpFamilyData = this.getData(data, "familyDatas");
						if(tmpFamilyData != undefined && tmpFamilyData != null && tmpFamilyData.length > 0){
							var familyDatas = $reportForm.Util.tableDataPercntage(tmpFamilyData,totFamilyCnt);
							
							$.each(familyDatas, function(index, item){
								familyHtml += '<tr>';
								familyHtml += '<td id="familyNm_'+index+1+'"class="ac">'+item.name+'</td>';
								familyHtml += '<td id="familyCnt_'+index+1+'">'+$reportForm.Util.addComma(item.y)+'</td>';
								familyHtml += '<td id="familyPer_'+index+1+'">'+item.per+'</td>';
								familyHtml += '</tr>';
							})
						}
						
						var tmpCoprData = this.getData(data, "totCoprData");
						if(tmpCoprData != undefined && tmpCoprData != null && tmpCoprData.length > 0){
							var copeDatas = $reportForm.Util.tableDataPercntage(tmpCoprData, tmpCoprData[0].y);
							$.each(copeDatas, function(index, item){
								coprHtml += '<tr>';
								coprHtml += '<td id="corpNm_'+index+'"class="ac">'+item.name+'</td>';
								coprHtml += '<td id="corpCnt_'+index+'">'+$reportForm.Util.addComma(item.y)+'</td>';
								coprHtml += '<td id="corpPer_'+index+'">'+item.per+'</td>';
								coprHtml += '</tr>';
							});
						}else{
							coprHtml += '<tr>';
							coprHtml += '<td id="corpNm_0 "class="ac">전체</td>';
							coprHtml += '<td id="corpCnt_0">0</td>';
							coprHtml += '<td id="corpPer_0">0</td>';
							coprHtml += '</tr>';
						}
						
						var tmpWorkerData = this.getData(data, "totWorkerData");
						if(tmpWorkerData != undefined && tmpWorkerData != null && tmpWorkerData.length > 0){
							var workerDatas = $reportForm.Util.tableDataPercntage(tmpWorkerData, tmpWorkerData[0].y);
							$.each(workerDatas, function(index, item){
								workerHtml += '<tr>';
								workerHtml += '<td id="workerNm_'+index+'"class="ac">'+item.name+'</td>';
								workerHtml += '<td id="workerCnt_'+index+'">'+$reportForm.Util.addComma(item.y)+'</td>';
								workerHtml += '<td id="workerPer_'+index+'">'+item.per+'</td>';
								workerHtml += '</tr>';
							});
						}else{
							workerHtml += '<tr>';
							workerHtml += '<td id="workerNm_0"class="ac">전체</td>';
							workerHtml += '<td id="workerCnt_0">0</td>';
							workerHtml += '<td id="workerPer_0">0</td>';
							workerHtml += '</tr>';
						}
						
						$("#areaSize_0"+index).text($reportForm.Util.addComma(areaSize));
						$("#tBody_age_sa0"+index).append(PopsHtml);
						$("#tBody_gender_sa0"+index).append(genderHtml);
						$("#tBody_family_sa0"+index).append(familyHtml);
						$("#tBody_house_sa0"+index).append(houseHtml);
						$("#tBody_corp_sa0"+index).append(coprHtml);
						$("#tBody_worker_sa0"+index).append(workerHtml);
					}else{
						var text01 = "격자 내 전체 ";
						var text02 = "격자 당 평균 ";
						var chartTitleText = this.getData(data, "chartTitleText");
						var totSum = this.getData(data, "totSum");
						var totAvg = this.getData(data, "totAvg");
						var unit = this.getData(data, "unit");
						var gridLevelNm = this.getData(data, "gridLevelNm");
						var grid_cnt = this.getData(data, "grid_cnt");
						var grid_area =  this.getData(data, "grid_area");
						var schCondNm = this.getData(data, "schCondNm");
						var itgSgg = this.getData(data, "itgSgg");
						var statYear = this.getData(data, "statYear");
						var statData = this.getData(data, "statData");
						
						var table01 = "<tr>";
							table01 += 	"<td>영역 전체 "+gridLevelNm+" 격자 기반 "+chartTitleText+"<br>["+schCondNm+"]"+"</td>";
							table01 += "<td>"+$reportForm.Util.addComma(totSum)+unit+"</td>";
							table01 += "</tr>";
							table01 += "<tr>";
							table01 += 	"<td>격자크기</td>";
							table01 += 	"<td>"+gridLevelNm+"*"+gridLevelNm+"</td>";
							table01 += "</tr>";
							table01 += "<tr>";
							table01 += 	"<td>영역 내 격자 개수</td>";
							table01 += 	"<td>"+$reportForm.Util.addComma(grid_cnt)+"개</td>";
							table01 += "</tr>";
							table01 += "<tr>";
							table01 += 	"<td>총 격자 면적</td>";
							table01 += 	"<td>"+$reportForm.Util.addComma(grid_cnt * grid_area/1000000)+"km<sup>2</sup></td>";
							table01 += "</tr>";
							table01 += "<tr>";
							table01 += 	"<td>행정구역</td>";
							table01 += 	"<td>"+itgSgg+"</td>";
							table01 += "</tr>";
							
						var table03 = "<tr>";
							table03 += 	"<td>선택한 격자의 "+chartTitleText+"<br>["+schCondNm+"]"+"</td>";
							if(option.sLegendtext != "" && option.sLegendtext != null && option.sLegendtext != undefined){
								table03 += 	"<td>"+option.sSumText+"</td>";
							}else{
								table03 += 	"<td></td>";
							}
							table03 += "</tr>";
							table03 += "<tr>";
							table03 += 	"<td>선택한 격자 범례</td>";
							if(option.sLegendtext != "" && option.sLegendtext != null && option.sLegendtext != undefined){
								table03 += "<td><i class='lev' style='background:"+option.sLegendColor+";'></i>"+option.sLegendtext+"</td>";
							}else{
								table03 += 	"<td></td>";
							}
							table03 += "</tr>";
							table03 += "<tr>";
							table03 += 	"<td>선택한 격자 이름</td>";
							if(option.sLegendtext != "" && option.sLegendtext != null && option.sLegendtext != undefined){
								table03 += 	"<td>"+option.sGridNm+"</td>";
							}else{
								table03 += 	"<td></td>";
							}
							table03 += "</tr>";
							
						var table04 = "";
						for(var i=0; i<statYear.length; i++){
							table04 += "<tr>";
							table04 += 	"<td>"+statYear[i]+"</td>";
							table04 += 	"<td>"+$reportForm.Util.addComma(statData[i])+unit+"</td>";
							table04 += "</tr>";
						}

						$("#tbody_grid_stat").html(table01);
						//$("#tbody_grid_info").html(table02);
						$("#tbody_grid_legend").html(table03);
						$("#tbody_grid_chart").append(table04);
						
						//범례 이미지
						this.setLegend(option);
					}
				},
				
				/**
				 * @name         : setGrid
				 * @description  : 표를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				setGrid : function(data, options) {
					//대화형통계지도
					if (this.mapType == "interactiveMap") {
						var unit = null;
						if ( data.param.isKosis != undefined && data.param.isKosis ) {
							unit = data.data[0].UNIT;
						}else if( data.param.isEcountry != undefined && data.param.isEcountry ){
							unit = data.data.UNIT;
						}else {
							unit = data.param.unit;
						}
						var unit = "단위 ("+unit +")";
						var adm_nm = "지역";
						var total = 0;
						for (var i=0; i<this.totalDataList.length; i++) {
							total += this.totalDataList[i];
						}
						
						total = total.toFixed(2);
						
						var legend = new sLegendInfo.legendInfo();			
						legend.valPerSlice = data.legend.valPerSlice;
						legend.legendColor = data.legend.legendColor;
						
						//표정보 설정
						var tmpAdmList = [];
						var tmpDataList = [];
						var adm_cd;
						var options = {
								legend : legend,
								total : total
						};
						if (Object.prototype.toString.call(data.geojson) === "[object Array]") {
							for (var i=0; i<data.geojson.length; i++) {
								var geojson = data.geojson[i];
								if (geojson.features[0].dataIdx == undefined) {
									continue;
								}
								if (i != 0) {
									var name = geojson.features[0].properties.adm_nm.split(" ");
									tmpAdmList.push(name[name.length-1]);
								}else {
									tmpAdmList.push(geojson.features[0].properties.adm_nm);
								}
								adm_cd = geojson.features[0].properties.adm_cd;
								this.getGridData(geojson, tmpDataList, adm_cd, options);
							}
							adm_nm = tmpAdmList.join();
						}else {
							adm_nm = data.geojson.features[0].properties.adm_nm;
							adm_cd = data.geojson.features[0].properties.adm_cd;
							this.getGridData(data.geojson, tmpDataList, adm_cd, options);
						}
						
						var gridList = tmpDataList.sort(function (a, b) {
							if( a._dataIdx && b._dataIdx ){
								return Number(a._dataIdx) - Number(b._dataIdx); 
							} else {
								var x = Number(a.value);
								var y = Number(b.value);
								if (x > y) return -1;
								if (x < y) return 1;
								return 0;
							} 
						});
						
						var options = {
								dataList : gridList,
								total : total,
								unit : unit,
								adm_nm : adm_nm,
								adm_cd : adm_cd
						};
						this.drawGrid(options);
						
						if (adm_cd.length > 7 && gridList.length > 0) {
							/*$reportForm.Request.reportReverseGeoCode(gridList[0].x, gridList[0].y, options, 0);*/
							for(var i=0; i < gridList.length; i+=5){
								(function(i){
									setTimeout(function(){
										if(i < gridList.length)   { $reportForm.Request.reportReverseGeoCode(gridList[i].x, gridList[i].y, options, i); }
										if(i+1 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+1].x, gridList[i+1].y, options, i+1); }
										if(i+2 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+2].x, gridList[i+2].y, options, i+2); }
										if(i+3 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+3].x, gridList[i+3].y, options, i+3); }
										if(i+4 < gridList.length) { $reportForm.Request.reportReverseGeoCode(gridList[i+4].x, gridList[i+4].y, options, i+4); }
									}, 20 * i)
								})(i);
							}
						}
						
						if (data.markers != null) {
							var tmpData = data.markers;
							if (tmpData != undefined && tmpData != null) {
								var html = "";
								var cnt = 1;
								tmpData.eachLayer(function(layer) {
									html += "<tr>"
									html +=		"<td>"+cnt+"</td>";
									html +=		"<td>"+layer.info.corp_nm+"</td>";
									html +=		"<td>"+layer.info.naddr+"</td>";
									html +=		"<td>"+layer.info.x+"</td>";
									html +=		"<td>"+layer.info.y+"</td>";
									html += "</tr>";
									cnt++;
								});
								$("#poiRegion").append(html);
								if (html.length > 0) {
									$("#poiRegion").show();
								}
							}
						}
					}
					//생활업종지도
					else if (this.mapType == "bizStatsMap") {
						switch(this.menuType[data.dataType]) {
							case 0:
								$("#interactiveMapTableRegion").hide();
								$("#bizStatsMapIntro1TableRegion").show();
								$("#bizStatsMapIntro2TableRegion").show();
								
								var curRegionData, upperRegionData, curSidoRankData;
								var curRegionTitle = data.param.adm_nm + " " + "비율(%)";
								var tmpData = data.data;
								for (var i=0; i<tmpData.length; i++) {
									if (tmpData[i].type == "sidoPieChart") {
										curRegionData = tmpData[i].data;
									}else if (tmpData[i].type == "contryPieChart") {
										upperRegionData = tmpData[i].data;
									}else if (tmpData[i].type == "introRank") {
										curSidoRankData = tmpData[i].data;
									}
								}
									
								var itemName = {
										"lodgebiz_per" : "숙박업",
										"rstrt_per"	   : "음식점",
										"srv_per"	   : "서비스",
										"whrtlsal_per" : "도소매"
								};
								var html = "";
								if (curRegionData != undefined && curRegionData != null) {
									for (p in curRegionData) {
										if (p == "lodgebiz_per" || 
											p == "rstrt_per"    ||
											p == "srv_per"		||
											p == "whrtlsal_per") {
											html += "<tr>";
											html +=		"<td>"+itemName[p]+"</td>";
											html +=		"<td>"+curRegionData[p]+"</td>";
											if (upperRegionData != undefined && upperRegionData != null) {
												html += "<td>"+upperRegionData[p]+"</td>";
											}else {
												html += "<td></td>";
											}
											html +=	"</tr>";
										}
									}
								}
								
								var html2 = "";
								if (curSidoRankData != undefined && curSidoRankData != null) {
									var result = curSidoRankData.tob_rank;
									for (var i=0; i<result.length; i++) {
										html2 += "<tr'>";
										html2 += 	"<td colspan=2>"+result[i].theme_nm+"</td>";
										html2 +=	"<td>"+appendCommaToNumber(result[i].corp_cnt)+"</td>";
										html2 +=	"<td>"+result[i].corp_cnt_rank+"</td>";
										html2 +=	"<td>"+result[i].corp_per+"</td>";
										html2 +=	"<td>"+result[i].corp_per_rank+"</td>";
										html2 +=	"<td>"+result[i].corp_irdsrate+"</td>";
										html2 +=	"<td>"+result[i].corp_irds_rank+"</td>";
										html2 +=	"<td>"+appendCommaToNumber(result[i].worker_cnt)+"</td>";
										html2 +=	"<td>"+result[i].worker_cnt_rank+"</td>";
										html2 +=	"<td>"+result[i].worker_per+"</td>";
										html2 +=	"<td>"+result[i].worker_per_rank+"</td>";
										html2 +=	"<td>"+result[i].worker_irdsrate+"</td>";
										html2 +=	"<td>"+result[i].worker_irds_rank+"</td>";
										html2 += "</tr>";
									}
								}
								
								$("#curRegionTitle").html(curRegionTitle);
								$("#bizStatsMapIntro1TableRegion").find("#tBody").append(html);
								$("#bizStatsMapIntro2TableRegion").find("#tBody").append(html2);
								$("#mask").hide();
								break;
							case 1:
								$("#interactiveMapTableRegion").hide();
								var tmpGridList = [];
								var tmpRankData = data.data[1];
								for (var i=0; i<tmpRankData.data.sgg_info.length; i++) {
									var lData = tmpRankData.data.sgg_info[i];
									for (p in lData) {
										if (p == "corp_cnt") {
											for (var k=0; k<7; k++) {
												if (tmpGridList[k] == null || tmpGridList[k] == undefined) {tmpGridList[k] = [];}
											}
											tmpGridList[0].push({name:lData.sgg_nm, data:parseFloat(lData.corp_cnt)});
											tmpGridList[1].push({name:lData.sgg_nm, data:parseFloat(lData.upregion_vs_corp_per)});
											tmpGridList[2].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_ppltn_rate)});
											tmpGridList[3].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_worker_rate)});
											tmpGridList[4].push({name:lData.sgg_nm, data:parseFloat(lData.corp_vs_family_rate)});
											tmpGridList[5].push({name:lData.sgg_nm, data:parseFloat(lData.biz_worker_cnt)});
											tmpGridList[6].push({name:lData.sgg_nm, data:parseFloat(lData.avg_worker_rate)});
										}
									} 
								}
								
								for (var i=0; i<tmpGridList.length; i++) {
									tmpGridList[i] = tmpGridList[i].sort(function (a, b) {
										return b.data - a.data 
									});
									
									var html =  "";
									if (i%2 == 0){
										html += "<table class='pntTable' style='width:395px;float:left;margin-bottom:10px;'>";
									}else {
										html += "<table class='pntTable' style='width:395px;float:right;margin-bottom:10px;'>";
									}
									
										html += 	"<colgroup>";
										html +=			"<col width=''/>";
										html +=			"<col width=''/>";
										html +=			"<col width='90'/>";
										html +=		"</colgroup>";
										html += 	"<tbody>";
										html +=			"<tr>";
										html +=				"<th scope='col' colspan=3>"+options.chart[i].title+"</th>";
										html +=		    "</tr>";
										html +=			"<tr>";
										html +=				"<th scope='col'>지역</th>";
										html +=				"<th scope='col'>값</th>";
										html +=				"<th scope='col'>순위</th>";
										html +=			"</tr>";
										
										for (var k=0; k<tmpGridList[i].length; k++) {
											html += "<tr>";
											html += 	"<td>"+tmpGridList[i][k].name+"</td>";
											html +=	 	"<td>"+tmpGridList[i][k].data+"</td>";
											html +=	 	"<td>"+(k+1)+"</td>";
											html +=	"</tr>";
										}
										
										html +=		"</tbody>";
										html ==	"</table>";
										$("#gridArea").append(html);
								}
								$("#mask").hide();
								break;
							case 2:
								$("#interactiveMapTableRegion").hide();
								var title = data.param.adm_nm + " "+data.param.theme_nm+" "+"시계열 데이터";
								var tmpTimeseriesData = data.data[0].data.companyList;
								var total = 0;
								var html  = "<table class='pntTable' style='margin-bottom:10px;'>";
								html += 	"<colgroup>";
								html +=			"<col width='270'/>";
								html +=			"<col width='270'/>";
								html +=			"<col width=''/>";
								html +=		"</colgroup>";
								html += 	"<tbody>";
								html +=			"<tr>";
								html +=				"<th scope='col' colspan=3>"+title+"</th>";
								html +=		    "</tr>";
								html +=			"<tr>";
								html +=				"<th scope='col'>년도</th>";
								html +=				"<th scope='col'>사업체수(개)</th>";
								html +=				"<th scope='col'>비율(%)</th>";
								html +=			"</tr>";
								
								for (var i=0; i<tmpTimeseriesData.length; i++) {
									total += parseFloat(tmpTimeseriesData[i].cnt);
								}
								
								for (var i=0; i<tmpTimeseriesData.length; i++) {
									html +=			"<tr>";
									html +=				"<td>"+tmpTimeseriesData[i].base_year+"</td>";
									html +=				"<td>"+appendCommaToNumber(tmpTimeseriesData[i].cnt)+"</td>";
									html +=				"<td>"+((parseFloat(tmpTimeseriesData[i].cnt)/total)*100).toFixed(2)+"</td>";
									html +=			"</tr>";
								}
								html +=			"<tr>";
								html +=				"<td scope='col'>합계</td>";
								html +=				"<td scope='col'>"+appendCommaToNumber(total)+"</td>";
								html +=				"<td scope='col'>100</td>";
								html +=			"</tr>";
								
								html +=		"</tbody>";
								html +=	"</table>";
								$("#gridArea").append(html);
								$("#mask").hide();
								break;
							case 3:
								$("#interactiveMapTableRegion").hide();
								$("#bizStatsMapAreaInfo1Region").show();
								$("#bizStatsMapAreaInfo2Region").show();
								$("#bizStatsMapAreaInfo3Region").show();
								$("#bizStatsMapAreaInfo4Region").show();
								$("#publicCicleCompanyDataRegion").show();
								var allCompanyPplHouseData, corpdistsumChartData, corpindecreaseChartData, regionTotalChartData, mainFacilityChartData;
								for (var i=0; i<data.data.length; i++) {
									if (data.data[i].type == "allCompanyPplHouse") {
										allCompanyPplHouseData = data.data[i];
									}else if (data.data[i].type == "corpdistsumChart") {
										corpdistsumChartData = data.data[i];
									}else if (data.data[i].type == "corpindecreaseChart") {
										corpindecreaseChartData = data.data[i];
									}else if (data.data[i].type == "regionTotalChart") {
										regionTotalChartData = data.data[i];
									}else if (data.data[i].type == "mainFacilityChart") {
										mainFacilityChartData = data.data[i];
									}
								}
								
								//지역특성정보-총사업체, 총인구, 총가구, 총주택
								var html  = "<tr>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.corp_cnt)+"</td>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.ppltn_cnt)+"</td>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.family_cnt)+"</td>";
									html +=		"<td>"+appendCommaToNumber(allCompanyPplHouseData.data.resid_cnt)+"</td>";
									html +=	"</td>";
									$("#areaInfoTitle1").html(data.param.adm_nm +"  주요통계정보");
									$("#bizStatsMapAreaInfo1Region").append(html);
									
								//지역특성정보
								var html = "";
								for (var i=0; i<regionTotalChartData.data.length; i++) {
									html += "<tr>";
									html += 	"<td>"+regionTotalChartData.data[i].adm_nm+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].resid_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].one_person_family_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].sixty_five_more_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].twenty_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].job_ppltn_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].apart_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].monrent_family_per+"</td>";
									html += 	"<td>"+regionTotalChartData.data[i].lease_family_per+"</td>";
									html += "</tr>";
								}
								$("#areaInfoTitle2").html(data.param.adm_nm+" 지역특성정보");
								$("#bizStatsMapAreaInfo2Region").append(html);
								
								//지역종합현황정보
								var categoryData = [];
								var listData = [];
								for(var i=0; i<corpdistsumChartData.data.length; i ++) {
									var corpData = corpdistsumChartData.data[i];
				        			var tempData = [];
				        			for(var x=0; x<corpData.theme_list.length; x++) {
				        				var elem = corpData.theme_list[x];
				        				tempData.push(parseFloat(elem.dist_per));
				        				if(i == 0) {
				        					categoryData.push(elem.theme_nm);
				        				}
				        			}
				        			listData.push({ "adm_nm" : corpData.adm_nm, "list" : tempData });
				        			$("#areaInfoReginName"+(i+1)).html(corpData.adm_nm);
				        		}
								
								var tableTmpList = [];
			        			for(var  i = 0; i < listData[0].list.length; i ++) {
			        				var tmpObj = [];
			        				tmpObj.push(categoryData[i]);
			        				for(var x = 0; x < listData.length; x ++) {
			        					tmpObj.push(listData[x].list[i]);
			        				}
			        				tableTmpList.push(tmpObj);
			        			}
				        		
			        			var html = "";
								for (var i=0; i<tableTmpList.length; i++) {
									var tableData = tableTmpList[i];
									html += "<tr>";
									for (var x=0; x<tableData.length; x++) {
										html +=	"<td>"+tableData[x]+"</td>";
									}
									html +=	"</tr>";
								}
								$("#bizStatsMapAreaInfo3Region").append(html);
								
								//소상공인 업종별 증감
								listData = [];
								categoryData = [];
								for(var i=0; i<corpindecreaseChartData.data.length; i ++) {
									var corpData = corpindecreaseChartData.data[i];
				        			var tempData = [];
				        			for(var x=0; x<corpData.theme_list.length; x++) {
				        				var elem = corpData.theme_list[x];
				        				tempData.push(parseFloat(elem.corp_cnt));
				        				if(i == 0) {
				        					categoryData.push(elem.theme_nm);
				        				}
				        			}
				        			listData.push({ "year" : corpData.year, "list" : tempData });
				        		}
								
								var tableTmpList = [];
			        			for(var  i = 0; i < listData[0].list.length; i ++) {
			        				var tmpObj = [];
			        				tmpObj.push(categoryData[i]);
			        				for(var x = 0; x < listData.length; x ++) {
			        					tmpObj.push(listData[x].list[i]);
			        				}
			        				tableTmpList.push(tmpObj);
			        			}
			        			
			        			var html = "";
			        			var width = Math.round(800/(listData.length+1));
			        			for (var i=0; i<listData.length; i++) {
			        				if (i==0) {
			        					html += "<col width=''>";
			        				}else {
			        					html += "<col width='"+width+"'>";
			        				}
			        			}
			        			$("#bizStatsMapAreaInfo4Region").find("#colgroup").append(html);
			        			
			        			var html  = "<tr>";
			        				html +=		"<th colspan='"+(listData.length+1)+"'>소상공인 업종별 증감(개)</th>";
			        				html +=	"</tr>";
			        				html +=	"<tr>";
			        				html +=		"<th scope='col'>지역</th>";
			        			for (var i=0; i<listData.length; i++) {
			        				html +=	"<th scope='col'>"+listData[i].year+"</th>";
			        			}
			        			html +=	"</tr>";
								for (var i=0; i<tableTmpList.length; i++) {
									var tableData = tableTmpList[i];
									html += "<tr>";
									for (var x=0; x<tableData.length; x++) {
										html +=	"<td>"+tableData[x]+"</td>";
									}
									html +=	"</tr>";
								}
								$("#bizStatsMapAreaInfo4Region").find("#tBody").append(html);
								
								//주요시설물 현황
								html = "";
								var tmpMainFacData = [];
								for (var p in mainFacilityChartData.data.themeInfo) {
									tmpMainFacData.push({
										title : p,
										data : mainFacilityChartData.data.themeInfo[p]
									});
								}
								
								tmpMainFacData = tmpMainFacData.sort(function (a, b) {
									return b.data - a.data 
								});
								
								for (var i=0; i<tmpMainFacData.length; i++) {
									html += "<tr>";
									html +=		"<td colspan=2>"+this.companyName[tmpMainFacData[i].title]+"</td>";
									html +=		"<td>"+tmpMainFacData[i].data+"</td>";
									html +=		"<td>"+(i+1)+"</td>";
									html += "</tr>";
								}
								$("#publicCicleCompanyDataRegion").find("#tBody").append(html);
								$("#mask").hide();
								break;
							case 4:
								$("#interactiveMapTableRegion").hide();
								$("#bizStatsMapAreaInfo2Region").show();
								
								var resultData = [];
								for (var i=0; i<data.data.spyChartList03.length; i++) {
									var tmpData = data.data.spyChartList03[i];
									for (var x=0; x<tmpData.length; x++) {
										if (i==0) {
											var params = {
													adm_nm : tmpData[x].adm_nm,
													list : tmpData[x].list
											};
											resultData.push(params);
										}else {
											if (x != 0) {
												var params = {
														adm_nm : tmpData[x].adm_nm,
														list : tmpData[x].list
												};
												resultData.push(params);
											}
										}
									}
								}
								
								for (var i=0; i<data.data.spyChartList04.length; i++) {
									var tmpData = data.data.spyChartList04[i];
									if (i==0) {
										for (var k=0; k<tmpData.length; k++) {
											for (var x=0; x<resultData.length; x++) {
												if (tmpData[k].adm_nm == resultData[x].adm_nm) {
													for (var z=0; z<tmpData[k].list.length; z++) {
														resultData[x].list.push(tmpData[k].list[z]);
													}
												}
											}
										}
									}else {
										for (var k=1; k<tmpData.length; k++) {
											for (var x=0; x<resultData.length; x++) {
												if (tmpData[k].adm_nm == resultData[x].adm_nm) {
													for (var z=0; z<tmpData[k].list.length; z++) {
														resultData[x].list.push(tmpData[k].list[z]);
													}
												}
											}
										}
									}
								}
								
 								for (var i=0; i<resultData.length; i++) {
									html += "<tr>";
									html += 	"<td>"+resultData[i].adm_nm+"</td>";
									for (var k=0; k<resultData[i].list.length; k++) {
										html += "<td>"+resultData[i].list[k]+"</td>";	
									}
									html += "</tr>";
								}
								$("#areaInfoTitle2").html(data.param.adm_nm+" 지역특성정보");
								$("#bizStatsMapAreaInfo2Region").append(html);
								$("#mask").hide();
								break;
							default:
								$("#mask").hide();
								break;
						}
					}
					//공공데이터
					else if (this.mapType == "publicData") {
						//========== 2017.07.11 [개발팀] 공공데이터 추가 - 세종권역 통행흐름정보 START ============//
						var poiData, circleData, schoolSggData, cctvPoiData, brtPoiData, monthData, timeData;
						for (var i=0; i<data.data.length; i++) {
							var tmpData = data.data[i];
							switch(tmpData.type) {
								case "poiInfo" :
								case "metro_month" :
								case "metro_dayofweek" :
									poiData = tmpData.data;
									break;
								case "school_sggAvg" :
									schoolSggData = tmpData.data;
									break;
								case "circleAreaInfo" :
									circleData = tmpData.data;
									break;
								case "cctvPoi" :
									cctvPoiData = tmpData.data;
									break;
								case "brtPoi" :
									brtPoiData = tmpData.data;
									break;
								case "weekendChart" :
									monthData = tmpData.data;
									break;
								case "timeSeriesChart" :
									timeData = tmpData.data;
									break;
							}
						}
						//========== 2017.07.11 [개발팀] 공공데이터 추가 - 세종권역 통행흐름정보 END ============//
						
						var tmpCircleData = [];
						for (var p in circleData.themeInfo) {
							tmpCircleData.push({title:this.companyName[p], data:circleData.themeInfo[p]});
						}
						tmpCircleData = tmpCircleData.sort(function (a, b) {
							return b.data - a.data 
						});
						
						$("#interactiveMapTableRegion").hide();
						$("#publicCicleDataRegion").show();
						$("#publicCicleCompanyDataRegion").show();
						
						switch(this.menuType[data.dataType]) {
							case 5:
								$("#publicPopulationPoiDataRegion").show();
								
								//해당지점 시간별 유동인구수
								var maleSum = poiData.male_agegp_10_cnt+poiData.male_agegp_20_cnt+poiData.male_agegp_30_cnt+poiData.male_agegp_40_cnt+poiData.male_agegp_50_cnt;
								var femaleSum = poiData.fem_agegp_10_cnt+poiData.fem_agegp_20_cnt+poiData.fem_agegp_30_cnt+poiData.fem_agegp_40_cnt+poiData.fem_agegp_50_cnt;
								var html  = "<tr>";
									html +=		"<td rowspan=2>"+poiData.surv_time+"</td>";
									html +=		"<td>남</td>";
									html +=		"<td>"+poiData.male_agegp_10_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_20_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_30_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_40_cnt+"</td>";
									html +=		"<td>"+poiData.male_agegp_50_cnt+"</td>";
									html +=		"<td>"+maleSum+"</td>";
									html += "</tr>";
									html += "<tr>";
									html +=		"<td>여</td>";
									html +=		"<td>"+poiData.fem_agegp_10_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_20_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_30_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_40_cnt+"</td>";
									html +=		"<td>"+poiData.fem_agegp_50_cnt+"</td>";
									html +=		"<td>"+femaleSum+"</td>";
									html += "</tr>";	
									html +=	"<tr>";
									html +=		"<td colspan=2>합계</td>";
									html +=		"<td>"+(poiData.male_agegp_10_cnt+poiData.fem_agegp_10_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_20_cnt+poiData.fem_agegp_20_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_30_cnt+poiData.fem_agegp_30_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_40_cnt+poiData.fem_agegp_40_cnt)+"</td>";
									html +=		"<td>"+(poiData.male_agegp_50_cnt+poiData.fem_agegp_50_cnt)+"</td>";
									html +=		"<td>"+(maleSum+femaleSum)+"</td>";
									html += "</tr>";
								$("#publicPopulationPoiDataRegion").append(html);
								$("#publicTitle1").html(data.param.subTitle);
								break;
							case 6:
								$("#publicSchoolPoiDataRegion").show();
								$("#publicSchoolPoiDataRegion2").show();
								
								//학교 학생/교직원현황
								var total = poiData.stdnt_cnt + poiData.tcher_cnt;
								var studentRate = (Math.round((poiData.stdnt_cnt / total) * 100)).toFixed(1);
								var teacherRate = (Math.round((poiData.tcher_cnt / total) * 100)).toFixed(1);
								var studentCntPerTeacher =  (poiData.stdnt_cnt / poiData.tcher_cnt).toFixed(1);
								var html  = "<tr>";
									html +=		"<td>"+appendCommaToNumber(poiData.stdnt_cnt)+"</td>";
									html +=		"<td>"+studentRate+" (%)</td>";
									html +=		"<td>"+appendCommaToNumber(poiData.tcher_cnt)+"</td>";
									html +=		"<td>"+teacherRate+" (%)</td>";
									html +=		"<td colspan=2>"+studentCntPerTeacher+"</td>";
									html +=	"</tr>";
								$("#publicSchoolPoiDataRegion").append(html);
								$("#publicTitle2").html(data.param.subTitle + " 학생/교직원 현황");
								
								//상위 학교 평균 학생수
								html  =	"<tr>";
								html +=		"<td>"+schoolSggData.sggAvg.stdnt_cnt+"</td>";
								html +=		"<td>"+schoolSggData.sggAvg.tcher_cnt+"</td>";
								html +=	"</tr>";	
								$("#publicSchoolPoiDataRegion2").append(html);
								$("#publicTitle3").html(schoolSggData.sggAvg.sgg_nm + " "+schoolSggData.sggAvg.elsm+ " 평균 학생/교직원수");
								break;
							case 7:
								$("#publicMetroPoiDataRegion").show();
								var dateTitle = ""; 
								var dateType = {
										hour1_psn_cnt  : "00시 ~ 01시",
										hour2_psn_cnt  : "01시 ~ 02시",
										hour3_psn_cnt  : "02시 ~ 03시",
										hour4_psn_cnt  : "03시 ~ 04시",
										hour5_psn_cnt  : "04시 ~ 05시",
										hour6_psn_cnt  : "05시 ~ 06시",
										hour7_psn_cnt  : "06시 ~ 07시",
										hour8_psn_cnt  : "07시 ~ 08시",
										hour9_psn_cnt  : "08시 ~ 09시",
										hour10_psn_cnt : "09시 ~ 10시",
										hour11_psn_cnt : "10시 ~ 11시",
										hour12_psn_cnt : "11시 ~ 12시",
										hour13_psn_cnt : "12시 ~ 13시",
										hour14_psn_cnt : "13시 ~ 14시",
										hour15_psn_cnt : "14시 ~ 15시",
										hour16_psn_cnt : "15시 ~ 16시",
										hour17_psn_cnt : "16시 ~ 17시",
										hour18_psn_cnt : "17시 ~ 18시",
										hour19_psn_cnt : "18시 ~ 19시",
										hour20_psn_cnt : "19시 ~ 20시",
										hour21_psn_cnt : "20시 ~ 21시",
										hour22_psn_cnt : "21시 ~ 22시",
										hour23_psn_cnt : "22시 ~ 23시",
										hour24_psn_cnt : "23시 ~ 24시",
								};
								
								var html  = "";
								var tmpData = [];
								if (poiData.onResult != undefined) {
									dateTitle = "시간별";
									for (var p in poiData.onResult) {
										if (p.indexOf("cnt") != -1) {
											var idx = parseInt(p.split("_")[0].split("hour")[1]);
											tmpData[idx-1] = {
												title:dateType[p], 
												onData:poiData.onResult[p], 
												offData:poiData.offResult[p], 
												onSum:poiData.onResult["hour_psn_sum"],
												offSum:poiData.offResult["hour_psn_sum"]
											};
										}
									}	
								}else if (poiData.monthOnList != undefined) {
									dateTitle = "월별";
									var onSum = 0, offSum = 0;
									for (var i=0; i<poiData.monthOnList.length; i++) {
										tmpData[i] = {
											title:poiData.monthOnList[i].surv_dt+"월", 
											onData:poiData.monthOnList[i].hour_psn_avg, 
											offData:poiData.monthOffList[i].hour_psn_avg, 
										};
										onSum += parseInt(poiData.monthOnList[i].hour_psn_avg);
										offSum += parseInt(poiData.monthOffList[i].hour_psn_avg);
									}
									tmpData[0]["onSum"] = onSum;
									tmpData[0]["offSum"] = offSum;
								}else {
									dateTitle = "요일별";
									var onSum = 0, offSum = 0;
									for (var i=0; i<poiData.weekOnList.length; i++) {
										tmpData[i] = {
											title:poiData.weekOnList[i].surv_dt, 
											onData:poiData.weekOnList[i].hour_psn_avg, 
											offData:poiData.weekOffList[i].hour_psn_avg, 
										};
										onSum += parseInt(poiData.weekOnList[i].hour_psn_avg);
										offSum += parseInt(poiData.weekOffList[i].hour_psn_avg);
									}
									tmpData[0]["onSum"] = onSum;
									tmpData[0]["offSum"] = offSum;
								}
								
								for (var i=0; i<tmpData.length; i++) {
									html +=	"<tr>";
									html += 	"<td>"+tmpData[i].title+"</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[i].onData)+"</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[i].offData)+"</td>";
									html += "</tr>";
								}
								
								if (tmpData[0].onSum != undefined) {
									html += "<tr>";
									html += 	"<td>합계</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[0].onSum)+"</td>";
									html +=		"<td>"+appendCommaToNumber(tmpData[0].offSum)+"</td>";
									html +=	"</tr>";
								}
								
								$("#publicMetroPoiDataRegion").append(html);
								$("#publicTitle4").html(dateTitle+" "+data.param.subTitle+" 승하차인원정보");
								
								break;
							case 8:
								break;
								
							//===== 2017.07.11 [개발팀] kcu 공공데이터 추가 - 세종권역 통행흐름정보 START =====//	
							case 9:
								$("#publicCctvPoiDataRegion").show();
								$("#publicBrtPoiDataRegion").show();

								//cctv 목록
								var html = "";
								for (var i=0; i<cctvPoiData.length; i++) {
									html +=	"<tr>";
									html += 	"<td>"+cctvPoiData[i].cctv_no+"</td>";
									html += 	"<td style='text-align:left;padding-left:10px;'>"+cctvPoiData[i].lc_nm+"</td>";
									html +=		"<td style='text-align:left;padding-left:10px;'>"+cctvPoiData[i].path_nm+"</td>";
									html +=		"<td style='text-align:left;padding-left:10px;'>"+cctvPoiData[i].addr+"</td>";
									html +=		"<td>"+appendCommaToNumber(cctvPoiData[i].recent_6_month_day_avg_pasng_cnt)+"</td>"; //6개월간 평균데이터
									html += "</tr>";
								}
								$("#publicCctvPoiDataRegion").append(html);
								
								//brt목록
								html = "";
								for (var i=0; i<brtPoiData.length; i++) {
									html +=	"<tr>";
									html += 	"<td>"+brtPoiData[i].busstop_no+"</td>";
									html += 	"<td style='text-align:left;padding-left:10px;'>"+brtPoiData[i].busstop_nm+"</td>";		//버스정류장명
									html +=		"<td style='text-align:left;padding-left:10px;'>"+brtPoiData[i].path_nm+"</td>";		//방향
									html +=		"<td>"+appendCommaToNumber(brtPoiData[i].recent_6_month_day_avg_tkcar_psn_cnt)+"</td>";	//6개월간 평균승차정보
									html +=		"<td>"+appendCommaToNumber(brtPoiData[i].recent_6_month_day_avg_gff_psn_cnt)+"</td>";	//6개월간 평균하차정보
									html += "</tr>";
								}
								$("#publicBrtPoiDataRegion").append(html);
								
								//cctv 월별통계
								html = "";
								if (monthData != undefined) {
									var isCCTV = true;
									var element = "";
									for (var i=0; i<monthData.length; i++) {
										if (i==0) {
											if (monthData[i].cctv_lc_id != undefined) { //cctv
												element = "#publicCctvMonthDataRegion";
												$(element).show();
												$(element).find("#cctvName").html("월별통계 - "+data.param.subTitle);
												isCCTV = true;
											}else { //brt
												element = "#publicBrtMonthDataRegion";
												$(element).show();
												$(element).find("#brtName").html("월별통계 - "+data.param.subTitle);
												isCCTV = false;
											}
										}
										
										if (isCCTV) {
											html +=	"<tr>";
											html += 	"<td>"+monthData[i].base_ym+"</td>";
											html += 	"<td>"+appendCommaToNumber(monthData[i].mdwk_day_avg_pasng_cnt)+"</td>";			//주중평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].weekend_day_avg_pasng_cnt)+"</td>";			//주말평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].attend_ts_time_pr_avg_pasng_cnt)+"</td>";	//출근시간평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].lvffc_ts_time_pr_avg_pasng_cnt)+"</td>";	//퇴근시간평균
											html += "</tr>";
											$("#publicCctvMonthDataRegion").append(html);
										}else {
											html +=	"<tr>";
											html += 	"<td>"+monthData[i].base_ym+"</td>";
											html += 	"<td>"+appendCommaToNumber(monthData[i].mdwk_day_avg_tkcar_psn_cnt)+"</td>";			//주중 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].mdwk_day_avg_gff_psn_cnt)+"</td>";				//주중 하차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].weekend_day_avg_tkcar_psn_cnt)+"</td>";			//주말 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].weekend_day_avg_gff_psn_cnt)+"</td>";			//주말 하차평균
											html += 	"<td>"+appendCommaToNumber(monthData[i].attend_ts_time_pr_avg_tkcar_psn_cnt)+"</td>";	//출근시간 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].attend_ts_time_pr_avg_gff_psn_cnt)+"</td>";		//출근시간 하차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].lvffc_ts_time_pr_avg_tkcar_psn_cnt)+"</td>";	//퇴근시간 승차평균
											html +=		"<td>"+appendCommaToNumber(monthData[i].lvffc_ts_time_pr_avg_gff_psn_cnt)+"</td>";		//퇴근시간 하차평균
											html += "</tr>";
											
										}
									}
									$(element).append(html);
								}
								
								//cctv 시간대별 통계
								if (timeData != undefined) {
									var isCCTV = true;
									var tmpLdata = [];
									for (var i=0; i<timeData.timeSeriesInfo.length; i++) {
										var tmpData = timeData.timeSeriesInfo[i];
										if (i==0) {
											if (tmpData.cctv_lc_id != undefined) {
												isCCTV = true;
												$("#publicCctvTimeDataRegion").show();
												$("#publicCctvTimeDataRegion").find("#cctvName").html("시간대별통계 - "+data.param.subTitle);
												tmpCellData = {"base_ym" : null, "time" : null, "mkdw" : null , "weekend" : null };
											}else {
												isCCTV = false;
												$("#publicBrtTimeDataRegion").show();
												$("#publicBrtTimeDataRegion").find("#brtName").html("시간대별통계 - "+data.param.subTitle);
												tmpCellData = {"base_ym" : null, "time" : null, "mkdwOn" : null, "mkdwOff" : null, "weekendOn" : null, "weekendOff" : null };
											}
										}
										
										//cctv
										if (isCCTV) {
											switch(parseInt(tmpData.weekend_div)) {
												case 1: //주중
													for (var k=0; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.mkdw = tmpData["hour_"+k+"_avg_pasng_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].mkdw = tmpData["hour_"+k+"_avg_pasng_cnt"];
														}
													}
													break;
												case 2: //주말
													for (var k=0; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.weekend = tmpData["hour_"+k+"_avg_pasng_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].weekend = tmpData["hour_"+k+"_avg_pasng_cnt"];
														}													
													}
													break;
											}
										}else { //brt
											switch(parseInt(tmpData.weekend_div)) {
												case 1: //주중
													for (var k=6; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.mkdwOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpCellData.mkdwOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].mkdwOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpLdata[k].mkdwOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
														}
													}
													break;
												case 2: //주말
													for (var k=6; k<24; k++) {
														if (tmpLdata[k] == undefined || tmpLdata[k] == null) {
															var tmpCellData = {};
															tmpCellData.base_ym = tmpData.base_ym;
															tmpCellData.time = k+"시";
															tmpCellData.weekendOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpCellData.weekednOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
															tmpLdata.push(tmpCellData);
														}else {
															tmpLdata[k].weekendOn = tmpData["hour_"+k+"_avg_tkcar_psn_cnt"];
															tmpLdata[k].weekendOff = tmpData["hour_"+k+"_avg_gff_psn_cnt"];
														}													
													}
													break;
											}
										}
									}
									
									if (isCCTV) {
										html = "";
										for (var i=0; i<tmpLdata.length; i++) {
											html +=	"<tr>";
											html += 	"<td>"+tmpLdata[i].base_ym+"</td>";	//년월
											html += 	"<td>"+tmpLdata[i].time+"</td>";	//시간
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].mkdw)+"</td>";	 //주중
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].weekend)+"</td>"; //주말
											html += "</tr>";
										}
										$("#publicCctvTimeDataRegion").append(html);
									}else {
										html = "";
										for (var i=0; i<tmpLdata.length; i++) {
											html +=	"<tr>";
											html += 	"<td>"+tmpLdata[i].base_ym+"</td>";	//년월
											html += 	"<td>"+tmpLdata[i].time+"</td>";	//시간
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].mkdwOn)+"</td>";		//주간승차
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].mkdwOff)+"</td>";	//주간하차
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].weekendOn)+"</td>";	//주말승차
											html +=		"<td>"+appendCommaToNumber(tmpLdata[i].weekendOff)+"</td>";	//주말하차
											html += "</tr>";
										}
										$("#publicBrtTimeDataRegion").append(html);
									}
									
									//cctv 요일별 통계
									html = "";
									var element = "";
									for (var i=0; i<timeData.dayOfWeekInfo.length; i++) {
										var tmpData = timeData.dayOfWeekInfo[i];
										if (i==0) {
											if (tmpData.cctv_lc_id != undefined) {
												isCCTV = true;
												element = "#publicCctvDayOfWeekDataRegion";
												$(element).show();
												$(element).find("#cctvName").html("요일별통계 - "+data.param.subTitle);
											}else {
												isCCTV = false;
												element = "#publicBrtDayOfWeekDataRegion";
												$(element).show();
												$(element).find("#brtName").html("요일별통계 - "+data.param.subTitle);
											}
										}
										if (isCCTV) {
											html +=	"<tr>";
											html += 	"<td>"+tmpData.base_ym+"</td>";
											switch(parseInt(tmpData.ts_div)) {
												case 1:
													html += "<td>주중</td>";
													break;
												case 2:
													html += "<td>주말</td>";
													break;
												default :
													html += "<td>평균</td>";
													break;
											}
											html +=		"<td>"+appendCommaToNumber(tmpData.mon_time_pr_avg_pasng_cnt)+"</td>";	//월요일
											html +=		"<td>"+appendCommaToNumber(tmpData.tues_time_pr_avg_pasng_cnt)+"</td>";	//화요일
											html +=		"<td>"+appendCommaToNumber(tmpData.wed_time_pr_avg_pasng_cnt)+"</td>";	//수요일
											html +=		"<td>"+appendCommaToNumber(tmpData.thur_time_pr_avg_pasng_cnt)+"</td>";	//목요일
											html +=		"<td>"+appendCommaToNumber(tmpData.fri_time_pr_avg_pasng_cnt)+"</td>";	//금요일
											html +=		"<td>"+appendCommaToNumber(tmpData.sat_time_pr_avg_pasng_cnt)+"</td>";	//토요일
											html +=		"<td>"+appendCommaToNumber(tmpData.sun_time_pr_avg_pasng_cnt)+"</td>";	//일요일
											html += "</tr>";	
										}else {
											html +=	"<tr>";
											html += 	"<td>"+tmpData.base_ym+"</td>";
											switch(parseInt(tmpData.ts_div)) {
												case 1:
													html += "<td>주중</td>";
													break;
												case 2:
													html += "<td>주말</td>";
													break;
												default :
													html += "<td>평균</td>";
													break;
											}
											html +=		"<td>"+appendCommaToNumber(tmpData.mon_time_pr_avg_tkcar_psn_cnt)+"</td>";	//월요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.mon_time_pr_avg_gff_psn_cnt)+"</td>";	//월요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.tues_time_pr_avg_tkcar_psn_cnt)+"</td>";	//화요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.tues_time_pr_avg_gff_psn_cnt)+"</td>";	//화요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.wed_time_pr_avg_tkcar_psn_cnt)+"</td>";	//수요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.wed_time_pr_avg_gff_psn_cnt)+"</td>";	//수요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.thur_time_pr_avg_tkcar_psn_cnt)+"</td>";	//목요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.thur_time_pr_avg_gff_psn_cnt)+"</td>";	//목요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.fri_time_pr_avg_tkcar_psn_cnt)+"</td>";	//금요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.fri_time_pr_avg_gff_psn_cnt)+"</td>";	//금요일 하차
											html +=		"<td>"+appendCommaToNumber(tmpData.sat_time_pr_avg_tkcar_psn_cnt)+"</td>";	//토요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.sat_time_pr_avg_gff_psn_cnt)+"</td>";	//토요일 하차 
											html +=		"<td>"+appendCommaToNumber(tmpData.sun_time_pr_avg_tkcar_psn_cnt)+"</td>";	//일요일 승차
											html +=		"<td>"+appendCommaToNumber(tmpData.sun_time_pr_avg_gff_psn_cnt)+"</td>";	//일요일 하차
											html += "</tr>";	
										}
									}
									$(element).append(html);
								}
								break;
								//===== 2017.07.11 [개발팀] kcu 공공데이터 추가 - 세종권역 통행흐름정보 END =====//	
							default:
								break;
						}
						
						//해당지점 반경내 정보
						var html  = "<tr>"
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.ppltn_cnt)+"</td>";
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.family_cnt)+"</td>";
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.resid_cnt)+"</td>";
							html +=		"<td>"+appendCommaToNumber(circleData.totalInfo.corp_cnt)+"</td>";
							html += "</tr>";
						$("#publicCicleDataRegion").append(html);
						
						//해당지점 반경내 사업체정보
						html = "";
						for (var i=0; i<tmpCircleData.length; i++) {
							html += "<tr>";
							html +=		"<td colspan=2>"+tmpCircleData[i].title+"</td>";
							html +=		"<td>"+tmpCircleData[i].data+"</td>";
							html +=		"<td>"+(i+1)+"</td>";
							html += "</tr>";
						}
						$("#publicCicleCompanyDataRegion").append(html);
						$("#mask").hide();
					}
					//나의데이터
					else if (this.mapType == "userData") {
						var tmpData = data.data;
						$("#interactiveMapTableRegion").hide();
						$("#myDataRegion").show();
						
						var html = "";
						var width = 0;
						for (var i=0; i<tmpData.rowHeaderArray.length; i++) {
							if (i==0) {
								html += "<col width=''/>";
								width = Math.round(760/tmpData.rowHeaderArray.length);
							}
							html += "<col width='"+width+"'/>";
						}
						$("#myDataRegion").find("#colgroup").append(html);
						
						html  = "<tr>";
						html += 	"<th>순서</th>"; 
						for (var i=0; i<tmpData.rowHeaderArray.length; i++) {
							html += "<th>"+tmpData.rowHeaderArray[i].COL_NM+"</th>";
						}
						html += "</tr>";
						
						for (var i=0; i<tmpData.rowDataArray.length; i++) {
							var Ldata = tmpData.rowDataArray[i].USR_DATA;
							html += "<tr>";
							html += 	"<td>"+(i+1)+"</td>";
							for (var x=0; x<Ldata.length; x++) {
								for (var p in Ldata[x]) {
									if (p != "COL_NM") {
										html +=	"<td>"+Ldata[x][p]+"</td>";
										break;
									}
								}
							}
							html += "</tr>";
						}
						
						$("#myDataRegion").find("#tBody").append(html);
						$("#mask").hide();
					}
					//poi
					else if (this.mapType == "poi") {
						$("#interactiveMapTableRegion").hide();
						$("#poiRegion").show();
						var tmpData = data.data;
						if (tmpData != undefined && tmpData != null) {
							var html = "";
							var cnt = 1;
							tmpData.eachLayer(function(layer) {
								html += "<tr>"
								html +=		"<td>"+cnt+"</td>";
								html +=		"<td>"+layer.info.corp_nm+"</td>";
								html +=		"<td>"+layer.info.naddr+"</td>";
								html +=		"<td>"+layer.info.x+"</td>";
								html +=		"<td>"+layer.info.y+"</td>";
								html += "</tr>";
								cnt++;
							});
							$("#poiRegion").append(html);
						}
						$("#mask").hide();
					}
				},
				
				/**
				 * @name         : getGridData
				 * @description  : 표 정보를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				getGridData : function(geojson, tmpDataList, adm_cd, options) {
					var adm_nm, coord_x, coord_y;
					var value = 0;
					var rate = 0;
					var color = "#F0FFF0";
					for (var i=0; i<geojson.features.length; i++) {
						var feature = geojson.features[i];
						adm_nm = feature.properties.adm_nm;
						adm_cd = feature.properties.adm_cd;
						
						coord_x = feature.properties.x;
						coord_y = feature.properties.y;
						value = 0;
						rate = 0;
						color = "#F0FFF0";
													
						if (feature.info.length > 0) {
							var tmpValue = null;
							if ( ( feature.isKosis != undefined && feature.isKosis )
									|| ( feature.isEcountry != undefined && feature.isEcountry ) ) {
								info = feature.info;
								tmpValue = info[0];
							}else {
								info = feature.info[0];
								tmpValue = info[info.showData];
//								adm_cd = info.adm_cd;
							}
							value = parseFloat(tmpValue);
							rate = (parseFloat(tmpValue) / options.total) * 100;
							color = options.legend.getColor(value, options.legend.valPerSlice[0])[0];
						}
						var param = {
								adm_cd : adm_cd,
								adm_nm :adm_nm,
								value : value,
								rate : rate,
								color : color,
								x : coord_x,
								y : coord_y,
								_dataIdx : feature._dataIdx
						}
						tmpDataList.push(param);
					}
				},
				
				/**
				 * @name         : drawGrid
				 * @description  : 표를 표출한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				drawGrid : function(data) {
					var gridList = data.dataList;
					var total = data.total;
					var unit = data.unit;
					var adm_nm = data.adm_nm;
					var adm_cd = data.adm_cd;
					var html = "";
					
					for (var i=0; i<gridList.length; i++) {
						html += "<tr>";
						html += 	"<td class='al' id='adm_nm_"+i+"'>"+gridList[i].adm_nm+"</td>";
						
						if( adm_cd.length > 7 ){
							html += 	"<td class='al' id='adm_cd_"+i+"'>"+gridList[i].adm_cd+"</td>";
						}
						
		 				html += 	"<td class='ar'><div class='valueBox'><span class='bg' style='background:"+gridList[i].color+"'></span><span class='txt'>"+(i+1)+"</span></div></td>";

		 				if(gridList[i].value == 0) {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width: 0%; background:rgba(76,139,253,1); '></span><span class='txt'>N/A</span></td>";
		 				} else {
		 					html += "<td class='ar'><div class='valueBox'><span class='bg' style='width:"+(gridList[i].value/gridList[0].value*100)+"%; background:rgba(76,139,253,1); '></span><span class='txt'>"+appendCommaToNumber(gridList[i].value)+"</span></td>";
		 				}
		 				
		 	 			html += "<td class='ar'><div class='valueBox'><span class='txt'>"+gridList[i].rate.toFixed(2)+"</span></div></td>";
		 				html += "</tr>";
					}
					$("#mask").hide();
					$("#interactiveMapTableRegion").find("#tBody").append(html);
					//$("#tAdmName").html(adm_nm);
					$("#tUnit").html(unit);
					$("#tTotal").html(appendCommaToNumber(total));
					
					if( adm_cd.length > 7 ){
						$("#tAdmCd").css("display", "");
						$("#tColspan").prop("colspan", "3");
					} else {
						$("#tAdmCd").css("display", "none");
						$("#tColspan").prop("colspan", "2");
					}
					
				},
				
				/**
				 * @name         : addBarChart
				 * @description  : 바차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				addBarChart : function(divId, categoriesText ,param, width, height, titleText ,target) {
					$(divId).highcharts({
				        chart: {
				            type: 'column', backgroundColor: 'white', height: height, width:width
				        },
				        exporting: { enabled: false }, //2017.03.13 pdf저장 이슈
				        title: {
				            text: titleText
				        },
				        xAxis: {
				            categories: categoriesText,
				            labels : {
				            	enabled: true
				            }
				        },
				        yAxis: {
				            min: 0,
				            title: {
				                text: "명"
				            }
				        },
				        legend: {
				        	enabled: false
				        },
				        plotOptions: {
				            column: {
				                pointPadding: 0.2,
				                borderWidth: 0
				            }
				        },
				        series: [{
				        	data: param,
				        }]
				    });
					
					//2017.03.13 pdf저장 이슈
					setTimeout(function() {
						$reportForm.Util.chartToImage(divId, target, width, height);
					}, 500);
				},
				
				/**
				 * @name         : addOnePoiChart
				 * @description  : 바차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				addOnePoiChart : function(divId, param, pWidth, pHeight, titleText , unitNm, target, statColors) {
					$(divId).highcharts({
				        chart: {
				        	type: 'pie',
			  				spacingTop: 0,
			  				spacingRight: 0,
			  				spacingBottom: 0,
			  				spacingLeft: 0,
			  				width: pWidth,
			  				height: pHeight
				        },
				        exporting: { enabled: false }, //2017.03.13 pdf저장 이슈
				        title: {
				            text: ''
				        },
				        plotOptions: {
							pie: {
								allowPointSelect: true,
							    cursor: 'pointer',
							    showInLegend: true,
							    dataLabels : false,
							    /*
							    dataLabels: {
					                enabled: true,
					                format: '<b>{point.name}</b>',
					                distance: 3,
					                style:{
					                	textOverFlow : 'clip',
					                	width : 100
					                }
					            }
					            */
		                   }
		               },
		               series: [{
			  				size: '100%',
			  			    innerSize: '50%',
			  				data: param,
			  				colors : statColors
			  			}]
				    });
					
					//2017.03.13 pdf저장 이슈
					setTimeout(function() {
						$reportForm.Util.chartToImage(divId, target, pWidth, pHeight);
					}, 500);
					
				},
				
				/**
				 * @name         : addTwoPoiChart
				 * @description  : 바차트를 생성한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 */
				addTwoPoiChart : function(divId, param_1, param_2, pWidth, pHeight, titleText, unitNm, target, top3Color, tempColor) {
					$(divId).highcharts({
				        chart: {
				        	type: 'pie',
			  				spacingTop: 0,
			  				spacingRight: 0,
			  				spacingBottom: 0,
			  				spacingLeft: 0,
			  				width: pWidth,
			  				height: pHeight
				        },
				        exporting: { enabled: false }, //2017.03.13 pdf저장 이슈
				        title: {
				            text: ''
				        },
				        legend: {
				        	enabled: false
				        },
				        plotOptions: {
							pie: {
								allowPointSelect: true,
							    cursor: 'pointer',
							    showInLegend: true,
							    dataLabels : false,
							    /*
							    dataLabels: {
					                enabled: true,
					                format: '<b>{point.name}</b>',
					                distance: 3,
					                style:{
					                	textOverFlow : 'clip',
					                	width : 100
					                }
					            }
					            */
		                   }
		               },
		               series: [{
			  				size: '100%',
			  			    innerSize: '70%',
			  				data: param_2,
			  				colors : tempColor
			  			},{
			  				size: '70%',
			  				data : param_1,
			  				colors : top3Color
			  			}]
				    });
					
					//2017.03.13 pdf저장 이슈
					setTimeout(function() {
						$reportForm.Util.chartToImage(divId, target, pWidth, pHeight);
					}, 500);
				},
				
				/**
				 * @name         : onOffDiv
				 * @description  : 보고서 항목을 on/off한다.
				 * @date         : 2016. 08. 29. 
				 * @author	     : 
				 * @param data   : 보고서 div
				 */
				onOffDiv : function(value) {
					if($("#" + value).css("display") == "none"){
						$("#" + value + "_show").hide();
						$("#" + value).show();
					}else{
						$("#" + value).hide();
						$("#" + value + "_show").show();
					}
				},
				
				/**
				 * @name         : setNewDiv
				 * @description  : 변경된 보고서디자인을 적용한다.
				 * @date         : 2016. 08. 29. 
				 * @author	     : 
				 * @param data   : 보고서 타입(격자, 영향권)
				 */
				setNewDiv : function(data) {
					if(data == "srv"){
						$("#srvAreaDiv").show();
						$("#gridAreaDiv").hide();
					}else{
						$("#gridAreaDiv").show();
						$("#srvAreaDiv").hide();
					}
				}
				
				
		 		
		 		
		 		
	},

	$reportForm.Util = {
				//Data를 순서대로 정렬하고, 비율 삽입
				tableDataSort : function(data) {
					var totalSum = 0;
		 	 		data.sort(function(a, b){
		 	 			var x = Number(a.value);
		 	 			var y = Number(b.value);
		 	 			if (x > y) return -1;
		 	 			if (x < y) return 1;
		 	 			return 0;
		 	 		});
		 	 		
		 	 		totalSum = this.tableDataSum(data);
		 	 		for(var i = 0; i < data.length; i ++) {	//비율 구하기
		 	 			if(data[i].value == 0) {
		 	 				data[i].rate = 0;
		 	 			} else {
		 	 				data[i].rate = (data[i].value / totalSum * 100).toFixed(1);
		 	 			}
		 	 		}
		 	 		return data;
				},
				
				tableDataPercntage : function(data, tot){
					var totalSum = tot;
					for(var i = 0; i < data.length; i ++) {	//비율 구하기
		 	 			if(data[i].y == 0) {
		 	 				data[i].per = 0;
		 	 			} else {
		 	 				data[i].per = (data[i].y / totalSum * 100).toFixed(1);
		 	 			}
		 	 		}
		 	 		return data;
				},
				
				//지역과 데이터 매핑
				admCdSet : function(admCdList, data) {
					var dataList = [];
					var tmpObj = {};
					//지역 데이터
					for(var i = 0; i < admCdList.length; i ++) {
						var admNm = admCdList[i].adm_nm;
						var admCd = admCdList[i].adm_cd;
						//기본값
						tmpObj = {
								item : admNm,
								itemCd : admCd,
								value : 0,
								color : "#fff"
						}
						//정보 데이터
						for(var x = 0; x < data.length; x ++) {
							//지역코드와 매핑
							if(data[x].itemCd == admCd) {
								data[x].item = admNm;
								if(data[x].value == undefined) { data[x].value = 0; }
								tmpObj =data[x];
							}
						}
						dataList.push(tmpObj);
					}
					return dataList;
				},
				
				//Data 총 합계 구하기
				/*
				tableDataSum : function(data) {
					var totalSum = 0;
					for(var i = 0; i < data.length; i ++) {
		 	 			totalSum += Number(data[i].value);
		 	 		}
					return totalSum;
				},
				*/
				//Data 총 합계 구하기
				tableDataSum : function(data) {
					var totalSum = 0;
					for(var i = 0; i < data.length; i ++) {
		 	 			totalSum += Number(data[i].y);
		 	 		}
					return totalSum;
				},
				
				//오늘날짜 가져오기
				getToday : function() {
					var today = new Date();
	 	 			var y = today.getFullYear();
	 	 			var m = today.getMonth()+1;
	 	 			var d = today.getDate();
	 	 			var h = today.getHours();
	 	 			var mn = today.getMinutes();
	 	 			
	 	 			var returnDate = "";
	 	 			if(m < 10) {
	 	 				m = "0" + m;
	 	 			}
	 	 			if(d < 10) {
	 	 				d = "0" + d;
	 	 			}
	 	 			if(h < 10) {
	 	 				h = "0" + h;
	 	 			}
	 	 			if(mn < 10) {
	 	 				mn = "0" + mn;
	 	 			}
	 	 			returnDate = y + "년 " + m + "월 " + d + "일 " + h + "시 " + mn + "분";
	 	 			
	 	 			return returnDate;
				},
				
				//천단위 콤마
				addComma : function(num) {
					var len, point, str;
					
					num = num + "";
					var tmpNum = null;
					var tmpMod = null;
					if (num.indexOf(".") == -1) {
						tmpNum = num;
					}else {
						tmpNum = num.split(".")[0];
						tmpMod = "." + num.split(".")[1];
					}

					point = tmpNum.length % 3;
					len = tmpNum.length;
					
					str = tmpNum.substring(0, point);
					while (point < len) {
						if (str != "")
							str += ",";
						str += tmpNum.substring(point, point + 3);
						point += 3;
					}

					if (tmpMod != null && tmpMod.length > 0) {
						str = str + tmpMod;
					}
					return str;
				},
				
				chartToImage : function(srcDiv, dscDiv, width, height) {				    
					//2017.03.13 pdf저장 이슈
				    var image = document.createElement('img');
				    image.height = height;
				    image.width = width;
				    setTimeout(function() {
				    	 var doc = document.querySelector(srcDiv);
						 var svg = doc.querySelector("svg");
						 var xml  = new XMLSerializer().serializeToString(svg);
		                 var canvas = document.createElement("canvas");
		                 canvg(canvas, xml);
		                 //$(image).attr("style", "display:inherit;margin:auto 0");
		                 $(image).attr("src", canvas.toDataURL());
		                 $(dscDiv).empty();
		                 $(dscDiv).append(image);
				    }, 500);  
				}
				
	},
	
	$reportForm.Request = {
			/**
			 * @name         : reportReverseGeoCode
			 * @description  : OpenAPI 리버스지오코딩 (집계구 주소 변환)
			 * @date         : 2015. 07. 30. 
			 * @author	     : 김성현
			 * @history 	 :
			 * @param  center
			 * @param  options
			 */
			reportReverseGeoCode : function (x, y, optData, idx) {
				var sopReportReverseGeoCodeObj = new sop.report.ReverseGeoCode.api();
				sopReportReverseGeoCodeObj.addParam("accessToken", accessToken);
				sopReportReverseGeoCodeObj.addParam("addr_type", "10");
				sopReportReverseGeoCodeObj.addParam("x_coor", x);
				sopReportReverseGeoCodeObj.addParam("y_coor", y);
				
				sopReportReverseGeoCodeObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
					options : {
						data : optData,
						idx : idx,
						x : x,
						y : y
					}
				});
			}
	};
	
	/** ********* OpenAPI 보고서용 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.report.ReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				var result = res.result;
				var idx = options.idx;
				var data = options.data;
				var coord_x = options.x;
				var coord_y = options.y;
				var length = data.dataList.length;
				var adm_nm = "";
				var adm_cd = "";
				
				var dataIdx = data.dataList[idx]._dataIdx;
				
				var dong = "";
				
				var dongArr = data.dataList[idx].adm_nm.split(" ");
				dong = dongArr[dongArr.length-1];
				
				if( dong == '' || dong == null ){
					dong = "";
				} else {
					if( dong.indexOf("(") < 0 ){
						dong = "(" + dong + (dataIdx ? "_" + dataIdx : "") + ")";
					}
				}
				
				switch(res.errCd) {
					case 0:
						if (idx < length) {
							var fullAddr = result[0].full_addr.split(" ");
							var roadNm = "";
							if(fullAddr.length < 4) {
								roadNm = "";
							} else {
								roadNm = fullAddr[fullAddr.length - 2] + " " + fullAddr[fullAddr.length - 1] + " 부근 " ;
							}		
							adm_nm = roadNm;
							adm_cd = data.dataList[idx].adm_cd;
							
//							data.dataList[idx].adm_nm = adm_nm;
							$("#adm_nm_"+idx).html( dong + adm_nm);
							$("#adm_cd_"+idx).html(adm_cd);
							
							/*idx++;
							if (idx < length) {
								$reportForm.Request.reportReverseGeoCode(data.dataList[idx].x, data.dataList[idx].y, data, idx);
							}*/
						}
						break;
					case -401:
						accessTokenInfo(function() {
							$reportForm.Request.reportReverseGeoCode(coord_x, coord_y, data, idx);
						});
						break;
					case -100:
						adm_nm = dong;
						adm_cd = data.dataList[idx].adm_cd;
						
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
						$("#adm_cd_"+idx).html(adm_cd);
						
						idx++;
						if (idx < length) {
							$reportForm.
							Request.reportReverseGeoCode(data.dataList[idx].x, data.dataList[idx].y, data, idx);
						}
						break;
					default:
						adm_nm = dong;
						adm_cd = data.dataList[idx].adm_cd;
						
						data.dataList[idx].adm_nm = adm_nm;
						$("#adm_nm_"+idx).html(adm_nm);
						$("#adm_cd_"+idx).html(adm_cd);
						break;
				}
			},
			onFail : function (status) {
			}
		});
	}());
	/** ********* OpenAPI 보고서용 리버스지오코딩. End ********* */
	
}(window, document));


