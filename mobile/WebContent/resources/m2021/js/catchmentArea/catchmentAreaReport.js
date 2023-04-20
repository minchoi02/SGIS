/**
 * 보고서 페이지.js
 * 
 * 2021/10/29
 */

(function(W, D) {
	W.$catchmentAreaReport = W.$catchmentAreaReport || {};
	
	$(document).ready(function() {
		
	});
	
	$catchmentAreaReport.ui = {
				bringDataCnt : 0,
				map : null,
				mapList : [],
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
				 * @name         : setData
				 * @description  : 보고서를 설정한다.
				 * @date         : 2015. 11. 11. 
				 * @author	     : 권차욱
				 * @param data   : 보고서데이터
				 * @param maType : 보고서타입
				 */
				setData : function(data,option) {
					
					this.setMainReportInfo(data);	//보고서 제목, 출처, 일자 등 생성
					this.setChart(data, data.params.mapHeight, data.params.mapWidth);	//차트생성
					this.setTable(data, option);	//표생성
					this.drawMap(data.params.mapId,"reportMapDiv", data.params.mapHeight, data.params.mapWidth);			//지도생성

					
				},
			
				drawMap : function(mapId,reportId, height, weight) {
					if(W.opener){
						var clone = W.opener.$("#map_report").clone();
						var originWidth = W.opener.$("#map_report").width();
						var originHeight = W.opener.$("#map_report").height();
						var w = 798;
						var h = 603;
						
						var scaleWidthValue = (originWidth / w).toFixed(2);
		 	 			var scaleHeightValue = (originHeight / h).toFixed(2);
		 	 			var scaleWidth = (w / originWidth);		// + 0.2;
		 	 			var scaleHeight = (h / originHeight);	// - 0.2;
						var reportMapCss = {
								"width" : originWidth+"px",
								"height" : originHeight+"px",
								"overflow":"hidden",
								"margin-top" : "9%",
								"margin-bottom" : "9%"
						};
						
						if(originWidth > 700){
							reportMapCss = {
									"overflow":"visible",
									"width" : originWidth+"px",
									"height" : originHeight+"px",
									"margin-top" : "0%",
									"margin-bottom": "0%"
									};
						}
						
						if(originWidth < w) {
							reportMapCss["transform"] = "scale("+scaleHeight+", "+scaleHeight+")";							
						} else {							
							reportMapCss["transform"] = "scale("+scaleWidth+", "+scaleWidth+")";
						}
						
						$(clone).find(".sop-control").hide();
						$(clone).find('.map__below').hide();
						$(clone).find('.map__above').hide();
						$("#reportMapDiv").html($(clone).html());
						$(".map").css({"overflow":"hidden"});
						$("#reportMapDiv").css(reportMapCss);
						
					}else{
						alert("비정상적인 접근입니다");
						self.close();
					}
				},
				/**
				 * @name         : setMainReportInfo
				 * @description  : 보고서의 기본적인 정보를 설정한다.
				 * @param data   : 보고서데이터
				 */
				setMainReportInfo : function(data) {
					var title = "생활권역 통계지도 보고서";
					var rangeText,yearText, rangeTypeText= "";
					var index = data.params.index;
					var areaSize = this.getData(data, "areaSize");					
					
					// 보고서 타이틀 정보 start
					if(data.params.rangeType ==  "stats_radio_t"){
						rangeTypeText = "주행시간 기준 "
					}else if(data.params.rangeType ==  "stats_radio_d"){
						rangeTypeText = "주행거리 기준 "
					}else{
						rangeTypeText = "반경 기준 "
					}

					//영향권 보고서
					if(data.params.reportType == "srv"){
						rangeText = rangeTypeText;
						yearText = "인구/가구/주택 (" + data.params.base_year+ "년)<br/>사업체/종사자 (" + data.params.copr_base_year +"년)"
					}else{//격자보고서
						rangeText = rangeTypeText + window.opener.$catchmentAreaMap.ui.reportRangeText;
						yearText = data.params.base_year +"년"
					}
					
					if(data.params.selText == data.params.indexText){
						$("#areaSize").html(this.addComma(areaSize) + 'km<sup>2</sup>'); //면적
					}				
					$("#reportTitle").html('<a href="javascript:$catchmentAreaReport.ui.reportPdfDown();" id="pdfdown">' +title + '</a>');//보고서명
					//기준정보
					$("#statLocation").text(data.params.statLocation);//선택지점
					$("#statRange").text(rangeText);//선택범위
					$("#indexText").text(data.params.selText);//선택인덱스
					$("#statYear").html(yearText);//선택년도
					
					if(data.params.selText == data.params.indexText){
					//선택년도 
					$("#base_year_pop, #base_year_family, #base_year_house").prepend(data.params.base_year);
					$("#copr_base_year, #work_base_year").prepend(data.params.copr_base_year);
					}
					
					var bottomHtml = "통계지리정보서비스 (<a href='https://sgis.kostat.go.kr' target='_blank'>https://sgis.kostat.go.kr</a>)<br>";
					bottomHtml += "제공 일자 :" + this.getToday();
//					
					$("#date").html(bottomHtml); 
				},
				setChart : function(data, height, width) {
					var index = data.params.index;
					var indexText = data.params.indexText;
					var selText = data.params.selText;
					var reportType = data.params.reportType;
					var rangeTypeText ="";
					this.bringDataCnt += 1; 
					
					var adjust_height = $('.chart__con').height();
					var adjust_width = $('.chart__con').width();
					var width = $(window).width();
					var height = $(window).height()
					
					
					// 보고서 타이틀 정보 start
					if(data.params.rangeType ==  "stats_radio_t"){
						rangeTypeText = "주행시간 기준 "
					}else if(data.params.rangeType ==  "stats_radio_d"){
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
						var familyColor = ['#ED5980', '#ffaa01', '#7DB6E9'];
						var houseColor = ['#7DB6E9','#ffaa01','#93EC85','#fed747', '#35908F','#ED5980'];
						//var top3Color = ['#C5D3F6', '#FFAA01', '#FED747'];
						//var tempColor = ['#E9E9E9'];						
						var coprColor = ['#D66B44', '#FFAA01', '#FED747','#E9E9E9'];
						
						
						var popsHtml, gerderHtml, familyHtml, houseHtml, coprHtml, workerHtml;
						
						
						if(data.params.selText == data.params.indexText){
							popsHtml = '<div class="chart__con srvAreaChart" id="sa0'+index + '_pntChart01" style="min-height: 200px; background-color: #dfdfdf;">';
							popsHtml += '<div id="sa0'+index+'_pieChartDiv01"></div></div>';
							
							$("#popsChart").prepend(popsHtml);
							
							gerderHtml = '<div class="chart__con srvAreaChart" id="sa0'+index + '_pntChart02" style="min-height: 200px; background-color: #dfdfdf;">';
							gerderHtml += '<div id="sa0'+index+'_pieChartDiv02"></div></div>';
							
							$("#genderChart").prepend(gerderHtml);
							
							
							familyHtml = '<div class="chart__con srvAreaChart" id="sa0'+index + '_pntChart03" style="min-height: 200px; background-color: #dfdfdf;">';
							familyHtml += '<div id="sa0'+index+'_pieChartDiv03"></div></div>';
							
							$("#familyChart").prepend(familyHtml);
							
							houseHtml = '<div class="chart__con srvAreaChart" id="sa0'+index + '_pntChart04" style="min-height: 200px; background-color: #dfdfdf;">';
							houseHtml += '<div id="sa0'+index+'_pieChartDiv04"></div></div>';
							
							$("#houseChart").prepend(houseHtml);
							
							coprHtml = '<div class="chart__con srvAreaChart" id="sa0'+index + '_pntChart05" style="min-height: 200px; background-color: #dfdfdf;">';
							coprHtml += '<div id="sa0'+index+'_pieChartDiv05"></div></div>';
							
							$("#coprChart").prepend(coprHtml);
							
							workerHtml = '<div class="chart__con srvAreaChart" id="sa0'+index + '_pntChart06" style="min-height: 200px; background-color: #dfdfdf;">';
							workerHtml += '<div id="sa0'+index+'_pieChartDiv06"></div></div>';
							
							$("#workChart").prepend(workerHtml);
						}				
						var chart01 = $('#sa0'+index+'_pntChart01');
						var chart02 = $('#sa0'+index+'_pntChart02');
						var chart03 = $('#sa0'+index+'_pntChart03');
						var chart04 = $('#sa0'+index+'_pntChart04');
						var chart05 = $('#sa0'+index+'_pntChart05');
						var chart06 = $('#sa0'+index+'_pntChart06');
						//나이
						if(popsDatas != undefined && popsDatas != null && popsDatas.length > 0 && totPopCnt > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv01",popsDatas, chart01.width()+15, chart01.height()+ 150, "인구","명","#sa0"+index+"_pntChart01",popsColor);
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv01", 430, 300, "#sa0"+index+"_pntChart01");
						}
						
						//남녀
						if(genderDatas != undefined && genderDatas != null && genderDatas.length > 0 && totGenderCnt > 0){
							this.addBarChart("#sa0"+index+"_pieChartDiv02",['남','여'],genderDatas,chart02.width()+15, chart02.height()+ 150,"","#sa0"+index+"_pntChart02");
						}else{
							this.addBarChart("#sa0"+index+"_pieChartDiv02",['남','여'],[0,0],430,300,"","#sa0"+index+"_pntChart02");
						}
						
						//가구
						if(familyDatas != undefined && familyDatas != null && familyDatas.length > 0 && totFamilyCnt > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv03",familyDatas,chart03.width()+15, chart03.height()+ 150,"가구","가구","#sa0"+index+"_pntChart03",familyColor);
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv03", 430, 300, "#sa0"+index+"_pntChart03");
						}
						
						//주택
						if(houseDatas != undefined && houseDatas != null && houseDatas.length > 0 && totHouseCnt > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv04",houseDatas,chart04.width()+15, chart04.height()+ 150,"주택","개","#sa0"+index+"_pntChart04",houseColor);
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv04", 430, 300, "#sa0"+index+"_pntChart04");
						}
						
						if(coprDatas != undefined && coprDatas != null && coprDatas.length > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv05",coprDatas,chart05.width()+20, chart05.height()+ 150,"사업체","개","#sa0"+index+"_pntChart05",coprColor);//사업체
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv05", 430, 300, "#sa0"+index+"_pntChart05");
						}
						
						if(workerDatas != undefined && workerDatas != null && workerDatas.length > 0){
							this.addOnePoiChart("#sa0"+index+"_pieChartDiv06",workerDatas,chart06.width()+10, chart06.height()+ 150,"종사자","명","#sa0"+index+"_pntChart06",coprColor);//종사자
						}else{
							this.emptyOnePieChart("#sa0"+index+"_pieChartDiv06", 430, 300, "#sa0"+index+"_pntChart06");
						}	
						
					}
					
				},
				
				setTable : function(data, option){
					var reportType = data.params.reportType;					
					if(reportType == "srv"){
						var index = data.params.index;
						var areaSize = this.getData(data, "areaSize");
						var totPopCnt = this.getData(data, "totPopCnt");
						var totGenderCnt = this.getData(data, "totGenderCnt");
						var totFamilyCnt = this.getData(data, "totFamilyCnt");
						var totHouseCnt = this.getData(data, "totHouseCnt");
						var PopsHtml,genderHtml,familyHtml,houseHtml,coprHtml,workerHtml = "";
						if(data.params.selText == data.params.indexText){
							
							PopsHtml += '<tr class="on">';
							PopsHtml += '<td id="ageNm_0" class="ac">전체</td>';
							PopsHtml += '<td id="ageCnt_0">'+this.addComma(totPopCnt)+'</td>';
							PopsHtml += '<td id="agePer_0">100</td>';
							PopsHtml += '</tr>';
							var tmpPopsData = this.getData(data, "popsDatas");
							if(tmpPopsData != undefined && tmpPopsData != null && tmpPopsData.length > 0){
								var popsDatas = this.tableDataPercntage(tmpPopsData, totPopCnt);
								
								$.each(popsDatas, function(index, item){
									PopsHtml += '<tr class="on">';
									PopsHtml += '<td id="ageNm_'+index+1+'"class="ac">'+item.name+'</td>';
									PopsHtml += '<td id="ageCnt_'+index+1+'">'+$catchmentAreaReport.ui.addComma(item.y)+'</td>';
									PopsHtml += '<td id="agePer_'+index+1+'">'+item.per+'</td>';
									PopsHtml += '</tr>';									
								});							
						}
							
							genderHtml += '<tr class="on">';
							genderHtml += '<td id="genderNm__0" class="ac">전체</td>';
							genderHtml += '<td id="genderCnt_0">'+this.addComma(totGenderCnt)+'</td>';
							genderHtml += '<td id="genderPer_0">100</td>';
							genderHtml += '</tr>';
							var tmpGenderData  = this.getData(data, "genderDatas");
							if(tmpGenderData != undefined && tmpGenderData != null && tmpGenderData.length > 0){
								var genderDatas = this.tableDataPercntage(tmpGenderData, totGenderCnt);
								$.each(genderDatas, function(index, item){
									
									genderHtml += '<tr class="on">';
									genderHtml += '<td id="genderNm_'+index+1+'"class="ac">'+item.name+'</td>';
									genderHtml += '<td id="genderCnt_'+index+1+'">'+ $catchmentAreaReport.ui.addComma(item.y)+'</td>';
									genderHtml += '<td id="genderPer_'+index+1+'">'+item.per+'</td>';
									genderHtml += '</tr>';
								});
							}
							
							houseHtml += '<tr class="on">';
							houseHtml += '<td id="houseNm_0" class="ac">전체</td>';
							houseHtml += '<td id="houseCnt_0">'+ this.addComma(totHouseCnt)+'</td>';
							houseHtml += '<td id="housePer_0">100</td>';
							houseHtml += '</tr>';
							
							var tmpHouseData = this.getData(data, "houseDatas");
							if(tmpHouseData != undefined && tmpHouseData != null && tmpHouseData.length > 0){
								var houseDatas = this.tableDataPercntage(tmpHouseData, totHouseCnt);
								
								$.each(houseDatas, function(index, item){
									houseHtml += '<tr class="on">';
									houseHtml += '<td id="houseNm_'+index+1+'"class="ac">'+item.name+'</td>';
									houseHtml += '<td id="houseCnt_'+index+1+'">'+$catchmentAreaReport.ui.addComma(item.y)+'</td>';
									houseHtml += '<td id="housePer_'+index+1+'">'+item.per+'</td>';
									houseHtml += '</tr>';
								});
							}
							
							familyHtml += '<tr class="on">';
							familyHtml += '<td id="familyNm_0" class="ac">전체</td>';
							familyHtml += '<td id="familyCnt_0">'+this.addComma(totFamilyCnt)+'</td>';
							familyHtml += '<td id="familyPer_0">100</td>';
							familyHtml += '</tr>';
							
							var tmpFamilyData = this.getData(data, "familyDatas");
							if(tmpFamilyData != undefined && tmpFamilyData != null && tmpFamilyData.length > 0){
								var familyDatas = this.tableDataPercntage(tmpFamilyData,totFamilyCnt);
								
								$.each(familyDatas, function(index, item){
									familyHtml += '<tr class="on">';
									familyHtml += '<td id="familyNm_'+index+1+'"class="ac">'+item.name+'</td>';
									familyHtml += '<td id="familyCnt_'+index+1+'">'+$catchmentAreaReport.ui.addComma(item.y)+'</td>';
									familyHtml += '<td id="familyPer_'+index+1+'">'+item.per+'</td>';
									familyHtml += '</tr>';
								})
							}
							
							var tmpCoprData = this.getData(data, "totCoprData");
							if(tmpCoprData != undefined && tmpCoprData != null && tmpCoprData.length > 0){
								var copeDatas = this.tableDataPercntage(tmpCoprData, tmpCoprData[0].y);
								$.each(copeDatas, function(index, item){
									coprHtml += '<tr class="on">';
									coprHtml += '<td id="corpNm_'+index+'"class="ac">'+item.name+'</td>';
									coprHtml += '<td id="corpCnt_'+index+'">'+$catchmentAreaReport.ui.addComma(item.y)+'</td>';
									coprHtml += '<td id="corpPer_'+index+'">'+item.per+'</td>';
									coprHtml += '</tr>';
								});
							}else{
								coprHtml += '<tr class="on">';
								coprHtml += '<td id="corpNm_0 "class="ac">전체</td>';
								coprHtml += '<td id="corpCnt_0">0</td>';
								coprHtml += '<td id="corpPer_0">0</td>';
								coprHtml += '</tr>';
							}
							
							var tmpWorkerData = this.getData(data, "totWorkerData");
							if(tmpWorkerData != undefined && tmpWorkerData != null && tmpWorkerData.length > 0){
								var workerDatas = this.tableDataPercntage(tmpWorkerData, tmpWorkerData[0].y);
								$.each(workerDatas, function(index, item){
									workerHtml += '<tr class="on">';
									workerHtml += '<td id="workerNm_'+index+'"class="ac">'+item.name+'</td>';
									workerHtml += '<td id="workerCnt_'+index+'">'+$catchmentAreaReport.ui.addComma(item.y)+'</td>';
									workerHtml += '<td id="workerPer_'+index+'">'+item.per+'</td>';
									workerHtml += '</tr>';
								});
							}else{
								workerHtml += '<tr class="on">';
								workerHtml += '<td id="workerNm_0"class="ac">전체</td>';
								workerHtml += '<td id="workerCnt_0">0</td>';
								workerHtml += '<td id="workerPer_0">0</td>';
								workerHtml += '</tr>';
							}
					
						$("#tbody_age").append(PopsHtml);
						$("#tbody_gender").append(genderHtml);
						$("#tbody_family").append(familyHtml);
						$("#tbody_house").append(houseHtml);
						$("#tbody_corp").append(coprHtml);
						$("#tbody_worker").append(workerHtml);
						//SGIS4_생활권역_모바일_SG 시작
						var td_selc = $('tr.on > td:contains(100.0)');
						 $("<td>100</td>").replaceAll(td_selc);
						//SGIS4_생활권역_모바일_SG 끝
						}				
							
					}		
					
				},
				
				getData : function(data, target){
//					console.log("getData()");
//					console.log(data);
					
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
				
				/**
				 * @name         : addOnePoiChart
				 * @description  : 바차트를 생성한다.
				 * @date         : 2015. 11. 11. 
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
						$catchmentAreaReport.ui.chartToImage(divId, target, pWidth, pHeight);
					}, 1000);
					
				},
				
				/**
				 * @name         : addBarChart
				 * @description  : 바차트를 생성한다.
				 * @date         : 2015. 11. 11. 
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
						$catchmentAreaReport.ui.chartToImage(divId, target, width, height);
					}, 500);
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
						$catchmentAreaReport.ui.chartToImage(divId, target, pWidth, pHeight);
					}, 500);
				},
				//PDF다운로드
		 		reportPdfDown : function() {
		 				$(".header").attr("data-html2canvas-ignore", true);
		 			
					this.savePDF();
		 			
					//이미지저장
					/*if ($reportForm.ui.delegate != null) {
						$reportForm.ui.delegate.doBookMark(parseInt($reportForm.ui.delegate.curMapId)+1, "report");
					}*/
		 		},
		 		savePDF : function() {
		 			html2canvas($('.Content')[0] ,{	
		 			      //logging : true,		// 디버그 목적 로그
		 			      proxy: "html2canvasproxy.php",
		 			      allowTaint : true,	// cross-origin allow 
		 			      useCORS: true,		// CORS 사용한 서버로부터 이미지 로드할 것인지 여부
		 			      scale : 2			// 기본 96dpi에서 해상도를 두 배로 증가
		 			      
		 			    }).then(function(canvas) {	
		 			      // 캔버스를 이미지로 변환
		 			      var imgData = canvas.toDataURL('image/png');

		 			      var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
		 			      var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
		 			      var imgHeight = canvas.height * imgWidth / canvas.width;
		 			      var heightLeft = imgHeight;
		 			      var margin = 10; // 출력 페이지 여백설정
		 			      var doc = new jsPDF('p', 'mm');
		 			      var position = 0;

		 			      // 첫 페이지 출력
		 			      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
		 			      heightLeft -= pageHeight;

		 			      // 한 페이지 이상일 경우 루프 돌면서 출력
		 			      while (heightLeft >= 20) {			// 35
		 			      position = heightLeft - imgHeight;
		 			      position = position - 20 ;		// -25

		 			      doc.addPage();
		 			      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
		 			      heightLeft -= pageHeight;
		 			      }

		 			      // 파일 저장
		 			     var currentdate = new Date();
						 var fileCreateTime = makeStamp(currentdate);
						 doc.save('Report_' + fileCreateTime + '.pdf');
		 			    });
		 		},
				chartToImage : function(srcDiv, dscDiv, width, height) {				    
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
				
				reload : function() {
				    window.onbeforeunload = function (e) {
				    	alert('새로고침');
		                    return 0;
				    };
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
				
				
	};
}(window, document));