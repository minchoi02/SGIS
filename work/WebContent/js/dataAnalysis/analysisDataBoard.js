
(function(W,D){
	W.$analysisDataBoard = W.$analysisDataBoard || {};
	
	$(document).ready(function(){
		$analysisDataBoard.event.setUIEvent();
	});
	
	//UI 내용작성
	$analysisDataBoard.ui = {
			
			/**
			 * 
			 * @name         : setAnalysisInfo
			 * @description  : 분석결과데이터를 설정한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석데이터
			 */
			setAnalysisInfo : function(data) {
				//제목설정
				var type = $analysisResultMap.util.getAnalysisTypeNm(data.paramInfo.analysis_type);
				var title = data.description;
				$("#analysisType2").html(type);
				$("#analysisTitle2").html(title);
				
				//분석시간설정
				var time = data.start_time + " ~ " + data.end_time;
				$("#analysis_time").html(time);
				
				//조건설정
				var dataInfo = data.paramInfo.param.dataInfo.replace(/,/gi, " > ");
				var regionInfo = data.paramInfo.param.regionInfo.replace(/,/gi, " > ");
				$("#dataInfo2").html(dataInfo);
				$("#regionInfo2").html(regionInfo);
				
				//버퍼조건 설정
				if (data.paramInfo.analysis_type == "BUFFER") {
					var bufferInfo = data.paramInfo.param.bufferInfo.replace(/,/gi, " > ");
					$("#bufferInfo").html(bufferInfo);
					$("#bufferInfoArea").show();
				}else if (data.paramInfo.analysis_type == "OPERATION") {
					$("#regionInfo2").prev().html("연산조건 :");
				}
				
			},
			
			/**
			 * 
			 * @name         : setResultData
			 * @description  : 분석결과데이터를 설정한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 분석타입
			 * @param data : 분석데이터
			 * @param map : 맵 객체
			 */
			setResultData : function(type, data, map) {
				//차트데이터 생성
				this.setChartData(type, data, map);
				
			},
			
			/**
			 * 
			 * @name         : setChartData
			 * @description  : 차트 및 표정보를 구성한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type : 분석타입
			 * @param data : 분석데이터
			 * @param map : 맵 객체
			 */
			setChartData : function(type, data, map) {
				this.data = data;
				this.type = type;
				var categories = [];
				var dataList = [];
				var chartInfo = {};
				switch(type) {
					case "BOUNDARY":	//경계분석
						{
							var dataTotal = 0;
							for (var i=0; i<data.result.length; i++) {
								categories.push(data.result[i].adm_nm);
								var adm_cd = data.result[i].adm_cd;
								if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
								dataList.push({"y":parseFloat(data.result[i].data), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : type});
								if (data.result[i].data != "N/A") 
									dataTotal += parseFloat(data.result[i].data);
							}
							data["total"] = dataTotal;
							chartInfo = {
									categories : categories,
									data : [
									    {name : "분석결과 데이터", data : dataList,  type : "column", color : "#FFA333"},
									]
							};
							$("#normalChartArea").show();
							$("#spatialChartArea").hide();
							this.drawChart("#chart01", chartInfo, dataList.length);
							this.drawGrid("#gridTable", this.getBoundaryGridInfo(data));
						}
						break;
					case "VORONOI":		//보로노이다이어그램
						{
							var dataTotal = 0;
							for (var i=0; i<data.result.length; i++) {
								var poiNm = "POI_"+(data.result[i].dataIdx+1);
								categories.push(poiNm);
								dataList.push({"y":parseFloat(data.result[i].data), "poi_nm": poiNm, "dataIdx" : data.result[i].dataIdx, "type" : type});
								dataTotal += parseFloat(data.result[i].data);
							}
							data["total"] = parseFloat(dataTotal.toFixed(2));
							data["avg"] = parseFloat((dataTotal / data.result.length).toFixed(2)) ;
							data["rate"] = parseFloat(((data.avg / data.total) * 100).toFixed(2));
							chartInfo = {
									categories : categories,
									data : [
									    {name : "분석결과 데이터", data : dataList,  type : "column", color : "#FFA333"},
									]
							};
							$("#normalChartArea").show();
							$("#spatialChartArea").hide();
							this.drawChart("#chart01", chartInfo, dataList.length, data.avg);
							this.drawGrid("#gridTable", this.getVoronoiGridInfo(data));
						}
						break;
					case "BUFFER":			//버퍼분석
						{
							var dataTotal = 0;
							for (var i=0; i<data.result.length; i++) {
								var poiNm = "버퍼_"+(data.result[i].dataIdx+1);
								var tmpData = parseFloat(data.result[i].data);
								if ($analysisResultMap.ui.analysisInfo.paramInfo.param.bufferType == "D") {
									tmpData = parseFloat(data.result[i]._area)
								}
								categories.push(poiNm);
								dataList.push({"y":tmpData, "poi_nm": poiNm, "dataIdx" : data.result[i].dataIdx, "type" : type });
								if (data.result[i].data != "N/A") 
									dataTotal += parseFloat(data.result[i].data);
							}
							data["total"] = dataTotal;
							chartInfo = {
									categories : categories,
									data : [
									    {name : "분석결과 데이터", data : dataList,  type : "column", color : "#FFA333"},
									]
							};
							$("#normalChartArea").show();
							$("#spatialChartArea").hide();
							this.drawChart("#chart01", chartInfo, dataList.length);
							this.drawGrid("#gridTable", this.getBufferGridInfo(data));
						}
						break;
					case "LQ":					//입지분석
						{
							var dataTotal = 0;
							for (var i=0; i<data.result.length; i++) {
								categories.push(data.result[i].adm_nm);
								var adm_cd = data.result[i].adm_cd;
								if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
								dataList.push({"y":parseFloat(data.result[i].data), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : type});
								dataTotal += parseFloat(data.result[i].data);
							}
							data["total"] = dataTotal;
							chartInfo = {
									categories : categories,
									data : [
									    {name : "분석결과 데이터", data : dataList,  type : "column", color : "#FFA333"},
									]
							};
							$("#lqArea").show();
							$("#normalChartArea").show();
							$("#spatialChartArea").hide();
							this.drawChart("#chart01", chartInfo, dataList.length);
							this.drawGrid("#gridTable", this.getLqGridInfo(data));
						}
						break;
					case "SPATIAL":			//공간자기상관분석
						{
							var chartDataList = [];
							var yMean, xMean, ySum = 0, xSum = 0, xDataList = [];
							for (var i=0; i<data.result.length; i++) {
								ySum += data.result[i].data2;
								xSum += data.result[i].data;
								categories.push(data.result[i].adm_nm);
								xDataList.push(data.result[i].data);
								var adm_cd = data.result[i].adm_cd;
								if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
								dataList.push({
									"y":parseFloat(data.result[i].moran), 
									"pValue" : parseFloat(data.result[i].p_value),  
									"adm_nm" : data.result[i].adm_nm , 
									"adm_cd": adm_cd, 
									"dataIdx" : data.result[i].dataIdx, 
									"type" : type});
								
								chartDataList.push({
									"y":parseFloat(data.result[i].data2), 
									"x" : parseFloat(data.result[i].data), 
									"z" : 5, 
									"adm_nm" : data.result[i].adm_nm , 
									"adm_cd": adm_cd, 
									"dataIdx" : data.result[i].dataIdx, 
									"pValue" : parseFloat(data.result[i].p_value), 
									"moran" : parseFloat(data.result[i].moran), 
									"type" : type});
							}
							
							yMean = ySum / data.result.length;
							xMean = xSum / data.result.length;
							
							maxX = Math.max.apply(undefined, xDataList);
							maxX += 1;
							
							chartInfo = {
									categories : categories,
									data : [
									    {name : "분석결과 데이터", data : dataList,  type : "column", color : "#FFA333"},
									]	
							};
							
							var chartInfo2 = {
									categories : categories,
									data : [
									    {name : "분석결과 데이터", data : chartDataList,  type : "scatter"}  
									],
									mean : {
										y_mean : yMean,
										x_mean : xMean
									}
							};
							
							//scatter차트 예측직선 그리기
							if (data.result[0].intercept != undefined && data.result[0].inclination) {
							    //공간자기상관분석 예측선 : y = a + bx
							    //a : 절편(intercept), b:기울기(inclination)
								chartInfo2.data.push({
							    	type: 'line',
							    	color: 'red',
							        name: 'Regression Line',
							        data: [[0, data.result[0].intercept], [maxX, data.result[0].intercept + data.result[0].inclination * maxX]],
							        marker: {
							            enabled: false
							        },
							        states: {
							            hover: {
							                lineWidth: 0
							            }
							        },
							        enableMouseTracking: false
							    })
						    }
							
							$("#spaitalChartArea").show();
							$("#normalChartArea").hide();
							$("#spatialArea").show();
							$("#bubble-styler").addClass("checked");
							this.drawChart("#chart03", chartInfo, dataList.length);
							this.drawBubbleChart("#chart02", chartInfo2);
							this.drawGrid("#gridTable", this.getSpatialGridInfo(data));
						}
						break;
					case "OPERATION":	//데이터간연산분석
						{
							var dataTotal = 0;
							var dataAList = [];
							var dataBList = [];
							for (var i=0; i<data.result.length; i++) {
								categories.push(data.result[i].adm_nm);
								var adm_cd = data.result[i].adm_cd;
								if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
								dataAList.push({"y":parseFloat(data.result[i].data1), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : type});
								dataBList.push({"y":parseFloat(data.result[i].data2), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : type});
								dataList.push({"y":parseFloat(data.result[i].data), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : type});
								dataTotal += parseFloat(data.result[i].data);
							}
							data["total"] = dataTotal;
							chartInfo = {
									categories : categories,
									data : [
									    {name : "분석결과 데이터", data : dataList,  type : "column", color : "#ffa333"},
									    {name : "데이터B", data : dataBList,  type : "column", color : "#21aaff"},
									    {name : "데이터A", data : dataAList,  type : "column", color : "#faf082"}
									]
							};
							$("#operationChartArea").show();
							$("#normalChartArea").show();
							$("#spatialChartArea").hide();
							$("#data_all-styler").addClass("checked");
							this.drawChart("#chart01", chartInfo, dataList.length);
							this.drawGrid("#gridTable", this.getOperationGridInfo(data));
						}
						break;
					default:
						break;
				}
			},
			
			/**
			 * 
			 * @name         : selectChartData
			 * @description  : 폴리곤을 오버했을 경우, 해당 차트데이터의 색상을 변경한다.
			 * @date         : 2018. 11. 20. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param index : 데이터 인덱스
			 * @param map_id : 맵 아이디
			 */
			selectChartData : function(index, map_id) {
				//var charts = $("#chart01").highcharts();
				var charts = null;
				var el;
				
				if($("#chart01").is(":visible")) {
					charts = $("#chart01").highcharts();
					el = $("#chart01");
				}else if ($("#chart02").is(":visible")) {
					charts = $("#chart02").highcharts();
					el = $("#chart02");
				}else {
					charts = $("#chart03").highcharts();
					el = $("#chart03");
				}
				
				if(charts != undefined && charts != null &&index != undefined && index != null) {
					if (this.lastChatIndex != null && (this.lastChatIndex < charts.series[0].data.length)) {
						charts.series[0].data[this.lastChatIndex].setState();
					}
					
					var scrollIdx = index-2;
					if (scrollIdx < 0) {
						scrollIdx = 0;;
					}
					$(".wrapperChartScroll").mCustomScrollbar("scrollTo", el.find('.highcharts-axis-labels text').eq(scrollIdx));
					
					//하이차트 버그
					//타임아웃을 안걸면, 제대로 hover 이벤트가 발생하지 않음
					//setTimeout(function() {
						charts.series[0].data[index].setState('hover');
						charts.tooltip.refresh([charts.series[0].points[index]], true); // true 부여 190305				
					//}, 100);
					
					this.lastChatIndex = index;
				}
			},
			
			/**
			 * 
			 * @name         : getBoundaryGridInfo
			 * @description  : 경계분석 테이블정보를 구성한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getBoundaryGridInfo : function(data) {
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html +=		"<col width=''>"; 
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>행정경계코드</th>";
					  html += 	"<th>지역명</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += 	"<th>비율(%)</th>";
					  html += "</tr>";
					  
				for (var i=0; i<data.result.length; i++) {
					var adm_cd = data.result[i].adm_cd;
					if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
					html +=	"<tr>";
					html +=		"<td>" + (i+1) + "</td>";
					html +=		"<td>" + adm_cd + "</td>";
					html +=		"<td>" + data.result[i].adm_nm + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(((data.result[i].data /  data.total) * 100).toFixed(2)) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getVoronoiGridInfo
			 * @description  : 보로노이분석 테이블정보를 구성한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getVoronoiGridInfo : function(data) {
				
				//poi평균면적정보 설정
				$("#avgTotalArea").html($commonFunc.appendCommaToNumber(data.avg)+" (㎡)");
				$("#totalPerAvgArea").html(data.rate+" (%)");
				$("#voronoiArea").show();
				
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width='100'>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html +=		"<col width='90'>"; 
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>POI명</th>";
					  html += 	"<th>POI영향면적(㎡)</th>";
					  html += 	"<th>전체면적대비비율(%)</th>";
					  html += 	"<th>평균비율대비</th>";
					  html += "</tr>";
					  
				for (var i=0; i<data.result.length; i++) {
					var ratePerTotal = parseFloat(((data.result[i].data / data.total) * 100).toFixed(2));
					var perAvgRate = parseFloat((ratePerTotal - data.rate).toFixed(2));
					
					html +=	"<tr>";
					html +=		"<td>" + (i+1) + "</td>";
					html +=		"<td>POI_" + (data.result[i].dataIdx + 1) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(ratePerTotal) + "</td>";
					
					if (perAvgRate >= 0) {
						html +=		"<td class='cr'>" + $commonFunc.appendCommaToNumber(perAvgRate) + "</td>";
					}else {
						html +=		"<td class='cb'>" + $commonFunc.appendCommaToNumber(perAvgRate) + "</td>";
					}
					
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getOperationGridInfo
			 * @description  : 데이터연산분석 테이블정보를 구성한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getOperationGridInfo : function(data) {
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html +=		"<col width=''>"; 
					  html +=		"<col width=''>"; 
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>행정경계코드</th>";
					  html += 	"<th>지역명</th>";
					  html += 	"<th>데이터A(값)</th>";
					  html += 	"<th>데이터B(값)</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += "</tr>";
				  
				for (var i=0; i<data.result.length; i++) {
					var adm_cd = data.result[i].adm_cd;
					if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
					html +=	"<tr>";
					html +=		"<td>" + (i+1) + "</td>";
					html +=		"<td>" + adm_cd + "</td>";
					html +=		"<td>" + data.result[i].adm_nm + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data1) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data2) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getBufferGridInfo
			 * @description  : 버퍼분석 테이블정보를 구성한다.
			 * @date         : 2018. 11. 26. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getBufferGridInfo : function(data) {
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>버퍼명</th>";
					  html += 	"<th>버퍼면적(㎡)</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += 	"<th>결과 당 면적(㎡)</th>";
					  html += "</tr>";
				  
				for (var i=0; i<data.result.length; i++) {
					var avg = 0;
					if (data.result[i].data != 0) {
						avg = (parseFloat(data.result[i]._area) / parseFloat(data.result[i].data)).toFixed(2);
					}
					html +=	"<tr>";
					html +=		"<td>" + (i+1) + "</td>";
					html +=		"<td>버퍼_" + (data.result[i].dataIdx + 1) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(parseFloat(data.result[i]._area.toFixed(2))) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(avg) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getSpatialGridInfo
			 * @description  : 공간자기상관분석 테이블정보를 구성한다.
			 * @date         : 2018. 11. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getSpatialGridInfo : function(data) {
				var html  = "<colgroup>";
				  html +=		"<col width='50' style='width:50px;'>";
				  html +=		"<col width=''>";
			 	  html +=		"<col width=''>";
				  html +=		"<col width='80' style='width:80px;'>";
				  html +=		"<col width='80' style='width:80px;'>";
			 	  html +=		"<col width='80' style='width:80px;'>";
				  html += "</colgroup>";
				  html += "<tr>";
				  html += 	"<th>순위</th>";
				  html += 	"<th>지역명</th>";
				  html += 	"<th>행정동코드</th>";
				  html += 	"<th>모란지수(값)</th>";
				  html += 	"<th>공간자기<br/>상관도</th>";
				  html += 	"<th>유의수준<br/>(p-value)</th>";
				  html += "</tr>";
			  
				for (var i=0; i<data.result.length; i++) {
					var adm_cd = data.result[i].adm_cd;
					if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
					html +=	"<tr>";
					html +=		"<td>" + (i+1) + "</td>";
					html +=		"<td>" + data.result[i].adm_nm + "</td>";
					html +=		"<td>" + adm_cd + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].moran) + "</td>";
					html +=		"<td>" + $analysisDataBoard.util.getMoranNm(data.result[i].moran) + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].p_value) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : getLqGridInfo
			 * @description  : 입지분석 테이블정보를 구성한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data : 분석정보
			 */
			getLqGridInfo : function(data) {
				var html  = "<colgroup>";
					  html +=		"<col width='60' style='width:60px;'>";
					  html +=		"<col width=''>";
				 	  html +=		"<col width=''>";
					  html +=		"<col width=''>";
					  html += "</colgroup>";
					  html += "<tr>";
					  html += 	"<th>순위</th>";
					  html += 	"<th>지역명</th>";
					  html += 	"<th>행정경계코드</th>";
					  html += 	"<th>분석결과(값)</th>";
					  html += "</tr>";
					  
				for (var i=0; i<data.result.length; i++) {
					var adm_cd = data.result[i].adm_cd;
					if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
					html +=	"<tr>";
					html +=		"<td>" + (i+1) + "</td>";
					html +=		"<td>" + data.result[i].adm_nm + "</td>";
					html +=		"<td>" + adm_cd + "</td>";
					html +=		"<td>" + $commonFunc.appendCommaToNumber(data.result[i].data) + "</td>";
					html +=	"</tr>";
				}
				
				return html;
			},
			
			/**
			 * 
			 * @name         : drawChart
			 * @description  : 차트를 그린다
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id     : 엘리먼트 아이디
			 * @param chartData	: 데이터 정보
			 * @param length : 데이터 길이
			 */
			drawChart : function(id, chartData, length, avg) {
				//차트 높이설정 
				var pointWidth = 13;
				var height = length * 25 * (chartData.data.length);
				if (height < 360) {
					height = 360;
					pointWidth = 20;
				}
				
				var threshold = 1000;
				if (length > 1000) {
					threshold = length;
				}
				
				var avgLine = [];
				if (avg != undefined) {
					avgLine =[{
						color : "red",
						value : avg,
						width : "3",
						zIndex : 4
					}];
				} 
				
				$(id).css("height", height+"px");
				this.barChart = $(id).highcharts(
						{
							chart : { 
								type : 'bar', 
								height : height, 
								width : 480
							},
							exporting: { enabled: false },
							title : {
								text : ''
							},
							subtitle : {
								text : ''
							},
							xAxis : {
								categories: chartData.categories,
								labels : { 
									rotation : 0,
									enabled: true
								}
							},
							yAxis : {
								title : {
									text : ''
								},
								plotLines : avgLine
							},
							plotOptions : {
								series : {
									turboThreshold : threshold,
									negativeColor : "#21AAFF",
									pointWidth: pointWidth,
									cursor : "pointer",
									point : {
										events : {
											
											//마우스 오버 이벤트
											mouseOver : function() {
												var idx = this.dataIdx;
												var map = $analysisResultMap.ui.map;
												var type = this.type;
												
												var geojson = map.dataGeojson;
												if (type == "BUFFER") {
													geojson = map.geojson;
												}
												
												geojson.eachLayer(function(layer) {
													if (layer.feature) {
														var e = {
																target : layer,
																utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
														};
														if (type != "BUFFER") {
															map.setPolyLayerMouseout(e);
														}else {
															$analysisResultMap.callbackFunc.didMouseOutPolygon(e, layer.feature, layer.options.type, map, false);
														}
														
														layer.unbindToolTip();
														if (layer.feature.properties.dataIdx == idx) {
															map.setPolyLayerMouseover(e);
															$analysisResultMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map, false);
														}
													}
												});
											},
											
											//마우스 아웃 이벤트
											mouseOut : function() {
												var idx = this.dataIdx;
												var map = $analysisResultMap.ui.map;
												var type = this.type;
												var geojson = map.dataGeojson;
												if (type == "BUFFER") {
													geojson = map.geojson;
												}
												geojson.eachLayer(function(layer) {
													if (layer.feature) {
														var e = {
																target : layer,
																utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
														};
														if (type != "BUFFER") {
															map.setPolyLayerMouseout(e);
														}else {
															$analysisResultMap.callbackFunc.didMouseOutPolygon(e, layer.feature, layer.options.type, map, false);
														}
														layer.unbindToolTip();
													}
												});
											},
											
											//클릭이벤트
											click : function() {
												var idx = this.dataIdx;
												var map = $analysisResultMap.ui.map;
												var type = this.type;
												var geojson = map.dataGeojson;
												if (type == "BUFFER") {
													geojson = map.geojson;
												}
												geojson.eachLayer(function(layer) {
													if (layer.feature) {
														var e = {
																target : layer,
																utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
														};
														if (layer.feature.properties.dataIdx == idx) {
															map.mapMove([layer.feature.properties.x, layer.feature.properties.y], map.zoom, true);
														}
													}
												});
											}
										}
									}
								},
								column : {
									states: {
							            hover: {
							                color: '#2951f2'                                                           
							            }
							        }
								}
							},
							legend : {
								enabled : false
							},
							tooltip: {
								shared : true,
								valueDecimals: 2,
								formatter: function () {
									var html = "";
									var symbol = '●';
									for (var i=0; i<this.points.length; i++) {
										switch(i) {
											case 0:
												symbol = '●';
												break;
											case 1:
												symbol = '♦';
												break;
											case 2:
												symbol = '■';
												break;
											case 3:
												symbol = '■';
												break;
										}
										html += '<span style="color:' + this.points[i].series.color + '">' + symbol + '</span>';
										html += ' ' + this.points[i].series.name + ': <b>' + $commonFunc.appendCommaToNumber(this.points[i].y) + '</b>';
										if (i < this.points.length-1) {
											html += "<br/>";
										}
										
										//평균정보 표출
										//보로노이 다이어그램에서 표출
										if (avg != undefined) {
											html += "<br/>";
											html += '<span style="color:' + this.points[i].series.color + '">' + symbol + '</span>';
											html += ' 평균: <b>' + $commonFunc.appendCommaToNumber(avg) + '</b>';
										}
										
									}
									return html;
				                }
					        },
							series : chartData.data
						});
			},
			
			/**
			 * 
			 * @name         : drawBubbleChart
			 * @description  : 버블차트를 그린다
			 * @date         : 2018. 12. 07 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id     : 엘리먼트 아이디
			 * @param chartData	: 데이터 정보
			 */
			drawBubbleChart : function(id, chartData) {
				this.bubbleChart = $(id).highcharts({
					chart: {
						type: 'scatter',
						width : 480,
						zoomType: 'xy'
					},
					exporting: { enabled: false },
					legend: {
						enabled: false
					},
					title: {
						text: ''
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						gridLineWidth: 1,
						title: {
							text: 'POI 집계 데이터'
						},
						labels: {
						},
						plotLines : [{
							color : "red",
							value : chartData.mean.x_mean,
							width : "1",
							zIndex : 4,
							dashStyle: 'dash'
						}]
					},
					yAxis: {
						startOnTick: false,
						endOnTick: false,
						title: {
							text: 'spatially lagged data'
						},
						labels: {
						},
						plotLines : [{
							color : "red",
							value : chartData.mean.y_mean,
							width : "1",
							zIndex : 4,
							dashStyle: 'dash'
						}]
					},
					tooltip: {
						shared : true,
						crosshairs: true,
						valueDecimals: 2,
						formatter: function () {
							var html = "";
							var symbol = '●';
							
							if (this.points != undefined) {
								for (var i=0; i<this.points.length; i++) {
									switch(i) {
										case 0:
											symbol = '●';
											break;
										case 1:
											symbol = '♦';
											break;
										case 2:
											symbol = '■';
											break;
										case 3:
											symbol = '■';
											break;
									}
									html += '<span style="color:' + this.points[i].series.color + '">' + symbol + '</span>';
									html += '<b>' + this.points[i].point.options.adm_nm + '</b><br/>';
									html +=	'<span>moran : ' + $commonFunc.appendCommaToNumber(this.points[i].point.options.moran) + '</span><br/>';
									html +=	'<span>p_value : ' + $commonFunc.appendCommaToNumber(this.points[i].point.options.pValue) + '</span>';
								}
							}else {
								html += '<span style="color:' + this.point.color + '">' + symbol + '</span>';
								html += '<b>' + this.point.options.adm_nm + '</b><br/>';
								html +=	'<span>moran : ' + $commonFunc.appendCommaToNumber(this.point.options.moran) + '</span><br/>';
								html +=	'<span>p_value : ' + $commonFunc.appendCommaToNumber(this.point.options.pValue) + '</span>';
							}
							
							return html;
		                }
			        },
					plotOptions : {
						bubble: {
				            minSize: 3,
				            maxSize: 5,
				            states: {
					            hover: {
					                color: '#2951f2'                                                           
					            }
					        }
				        },
						series : {
							cursor : "pointer",
							point : {
								events : {
									
									//마우스 오버 이벤트
									mouseOver : function() {
										var idx = this.dataIdx;
										var map = $analysisResultMap.ui.map;
										var type = this.type;
										
										var geojson = map.dataGeojson;
										geojson.eachLayer(function(layer) {
											if (layer.feature) {
												var e = {
														target : layer,
														utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
												};
												$analysisResultMap.callbackFunc.didMouseOutPolygon(e, layer.feature, layer.options.type, map, false);
												layer.unbindToolTip();
												if (layer.feature.properties.dataIdx == idx) {
													map.setPolyLayerMouseover(e);
													$analysisResultMap.callbackFunc.didMouseOverPolygon(e, layer.feature, layer.options.type, map, false);
												}
											}
										});
									},
									
									//마우스 아웃 이벤트
									mouseOut : function() {
										var idx = this.dataIdx;
										var map = $analysisResultMap.ui.map;
										var type = this.type;
										var geojson = map.dataGeojson;
										geojson.eachLayer(function(layer) {
											if (layer.feature) {
												var e = {
														target : layer,
														utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
												};
												map.setPolyLayerMouseout(e);
												layer.unbindToolTip();
											}
										});
									},
									
									//클릭 이벤트
									click : function() {
										var idx = this.dataIdx;
										var map = $analysisResultMap.ui.map;
										var geojson = map.dataGeojson;
										geojson.eachLayer(function(layer) {
											if (layer.feature) {
												var e = {
														target : layer,
														utmk : sop.utmk([layer.feature.properties.x, layer.feature.properties.y])
												};
												if (layer.feature.properties.dataIdx == idx) {
													map.mapMove([layer.feature.properties.x, layer.feature.properties.y], map.zoom, true);
												}
											}
										});
									}
								}
							}
						}
					},
					series: chartData.data
				}); 
			},
			
			/**
			 * 
			 * @name         : drawGrid
			 * @description  : 표를 그린다.
			 * @date         : 2018. 10. 12. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param id     : 엘리먼트 아이디
			 * @param data	 : 데이터 정보
			 * @param type	 : 표 타입(1:많은지역/적은지역, 2:증감/증감률)
			 */
			drawGrid : function(id, html) {
				$(id).show();
				$(id).empty();
				$(id).append(html);
			},
			
			/**
			 * 
			 * @name         : doChangeChartData
			 * @description  : 차트데이터를 변경한다.
			 * @date         : 2018. 12. 10. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type     : 타입
			 */
			doChangeChartData : function(type) {
				var data = this.data;
				if (data.result.length > 0) {
					var dataAList = [];
					var dataBList = [];
					var dataList = [];
					var categories = [];
					for (var i=0; i<data.result.length; i++) {
						var adm_cd = data.result[i].adm_cd;
						if (data.result[i].bnd_cd != null && (adm_cd == null || adm_cd == '-' || adm_cd == ''))  adm_cd = data.result[i].bnd_cd;
						
						categories.push(data.result[i].adm_nm);
						dataAList.push({"y":parseFloat(data.result[i].data1), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : this.type});
						dataBList.push({"y":parseFloat(data.result[i].data2), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : this.type});
						dataList.push({"y":parseFloat(data.result[i].data), "adm_cd":adm_cd, "dataIdx" : data.result[i].dataIdx, "type" : this.type});
					}
					var tmpData = [];
					var idx = "all";
					
					if ($("#data_all").is(":checked")) idx = "all";
					if ($("#data_A").is(":checked")) idx = "A";
					if ($("#data_B").is(":checked")) idx = "B";
					if ($("#data_analysis").is(":checked")) idx = "analysis";
					
					switch(idx) {
						case "all":
							tmpData = [
								    {name : "분석결과 데이터", data : dataList,  type : "column", color : "#ffa333"},
								    {name : "데이터B", data : dataBList,  type : "column", color : "#21aaff"},
								    {name : "데이터A", data : dataAList,  type : "column", color : "#faf082"}
							];
							break;
						case "A":
							tmpData = [
									{name : "데이터A", data : dataAList,  type : "column", color : "#faf082"}
							];
							break;
						case "B":
							tmpData = [
									{name : "데이터B", data : dataBList,  type : "column", color : "#21aaff"}
							];
							break;
						case "analysis":
							tmpData = [
							        {name : "분석결과 데이터", data : dataList,  type : "column", color : "#ffa333"}
							];
							break;
						default:
							break;
					}
 					chartInfo = {
							categories : categories,
							data : tmpData
					};
					this.drawChart("#chart01", chartInfo, dataList.length);
				}
			}

	};
	
	$analysisDataBoard.util = {
			
			/**
			 * 
			 * @name         : getMoranNm
			 * @description  : 모란지수 범례정보를 리턴한다.
			 * @date         : 2018. 11. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 모란지수
			 */
			getMoranNm : function(data) {
				var name = "";
				if (data >= 2.57) {
					name = "매우 높음";
				}else if (1.96 <= data && data < 2.57) {
					name = "높음";
				}else if (1.64 <= data && data < 1.96) {
					name = "약간 높음";
				}else if (-1.64 <= data && data < 1.64) {
					name = "보통";
				}else if (-1.96 <= data && data < -1.64) {
					name = "약간 낮음";
				}else if (-2.5 <= data && data < -1.96) {
					name = "낮음";
				}else {
					name = "매우 낮음";
				}
				return name;
			},
			
			/**
			 * 
			 * @name         : getMoranColor
			 * @description  : 모란지수 범례색상정보를 리턴한다.
			 * @date         : 2018. 11. 29. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param data	 : 모란지수
			 */
			getMoranColor : function(data) {
				var color = "";
				if (data >= 2.57) {
					color = "rgb(205, 17, 3)";
				}else if (1.96 <= data && data < 2.57) {
					color = "rgb(230, 116, 48)";
				}else if (1.64 <= data && data < 1.96) {
					color = "약간 높음";
				}else if (-1.64 <= data && data < 1.64) {
					color = "rgb(246, 182, 78)";
				}else if (-1.96 <= data && data < -1.64) {
					color = "rgb(147, 136, 169)";
				}else if (-2.5 <= data && data < -1.96) {
					color = "rgb(91, 68, 134)";
				}else {
					color = "rgb(35, 0, 100)";
				}
				return color;
			}
	};
	
	//EVENT 내용작성
	$analysisDataBoard.event = {
			
			setUIEvent : function(){
			
				//차트 스크롤적용
				$(".scrollWrapper").mCustomScrollbar({axis:"y"});
				$(".mCSB_container").css("margin-right", "0px");
				
				//데이터보드 열기
				$("#analysisDataBoard").on("click", function() {
					var ck = $(this).hasClass("on");
					if(!ck){
						$analysisDataBoard.event.openDataBoard();
					}else{
						$analysisDataBoard.event.closeDataBoard();
					}
				});
				
				//데이터보드 닫기
				$("#dataBoardClose").on("click", function() {
					$analysisDataBoard.event.closeDataBoard();
				});
				
				//데이터보드 항목 탭
				$(".dbItemList dt a").on("click", function() {
					var ck = $(this).hasClass("on");
					if(ck){
						$(this).removeClass("on");
						$(this).parents("dt").eq(0).next("dd").show();	
					}else{
						$(this).addClass("on");
						$(this).parents("dt").eq(0).next("dd").hide();
					} 
				});
				
				//공간자기상관분석 차트타입
				$(".chartType").on("click", function() {
					var id = $(this).attr("id");
					switch(id) {
						case "bubble":
							$("#barChartArea").hide();
							$("#bubbleChartArea").show();
							break;
						case "bar":
							$("#bubbleChartArea").hide();
							$("#barChartArea").show();
							break;
						default:
							break;
						}
				});
				
				//데이터간 연산분석 차트타입
				$(".chartDataType").on("click", function() {
					var id = $(this).attr("id");
					switch(id) {
						case "data_all":
							$analysisDataBoard.ui.doChangeChartData("all");
							break;
						case "data_A":
							$analysisDataBoard.ui.doChangeChartData("a");
							break;
						case "data_B":
							$analysisDataBoard.ui.doChangeChartData("b");
							break;
						case "data_analysis":
							$analysisDataBoard.ui.doChangeChartData("analysis");
							break;
						default:
							break;
						}
				});
			},
			
			/**
			 * 
			 * @name         : openDataBoard
			 * @description  : 데이터보드를 오픈한다.
			 * @date         : 2018. 10. 04. 
			 * @author	     : 권차욱
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
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			closeDataBoard : function() {
				$(".dataBoardBox").stop().animate({"right":"-1500px"},200);
				$("#analysisDataBoard").removeClass("on").stop().animate({"right":"0"},200);
			}
			
	};
	
}(window,document));