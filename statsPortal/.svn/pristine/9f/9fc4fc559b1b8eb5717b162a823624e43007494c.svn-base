/**
 * 대졸자 첫 일자리 통계
 * vjFirstCollegeGraduateJobStat
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 데이터보드 > 대졸자 첫 일자리 통계 
 * 
 * history : 
 *	2018.10.15	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjFCGJS = W.$vjFCGJS || {};
	
	$vjFCGJS.ui = {
		sampleVar1 : null,			// 샘플 변수 1
		sampleVar2 : "",			// 샘플 변수 2
		sampleVar3 : [],			// 샘플 변수 3	
				
		/**
		 * @name         : 챠트 구성
		 * @description  : 모든 챠트 그리기
		 * @date         : 2018.10.17
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		initChart : function() {
			$('#vjFCGJS #vjTitle').html('');
			
			for (i = 1; i <= 10; i++) {
				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectJobStatData.json",
					async: false,
					dataType: "json",
					data: {type: 'CGS', base_year: '2016', mode: i},
					success: function(res) {
						if(res.errCd == 0){
							var $chart = (i < 10) ? $('#vjFCGJSChart0' + i) : $('#vjFCGJSChart' + i);
							var html = $('#vjFCGJS #vjTitle').html();
							
							if (html.length == 0) {
								html = '[대졸자 첫 일자리 통계]';
								html += '<span style="font-size:12px;font-weight:normal;"> (' + res.result.target + ')</span>';
								$('#vjFCGJS #vjTitle').html(html);
							}
							
							var json = $vjFCGJS.ui.getChartDefaultData(res.result.categoryes, res.result.series);
							
							switch (i) {
							case 1: $vjFCGJS.ui.drawChart01(json); break;
							case 2: $vjFCGJS.ui.drawChart02(json); break;
							case 3: $vjFCGJS.ui.drawChart03(json); break;
							case 4: $vjFCGJS.ui.drawChart04(json); break;
							case 5: $vjFCGJS.ui.drawChart05(json); break;
							case 6: $vjFCGJS.ui.drawChart06(json); break;
							case 7: $vjFCGJS.ui.drawChart07(json); break;
							case 8: $vjFCGJS.ui.drawChart08(json); break;
							case 9: $vjFCGJS.ui.drawChart09(json); break;
							case 10: $vjFCGJS.ui.drawChart10(json); break;
							}
						} else {
							alert('failed!');
						}
					} ,
					error:function(err) {
						alert(err.responseText);
					}  
				});
			}
		},
		drawChart01 : function(pJson) {			
			$('#vjFCGJSChart01').highcharts(pJson);
		},
		drawChart02 : function (pJson) {
			$('#vjFCGJSChart02').css({height: 400});
			$('#vjFCGJSChart02').closest('.censusChart').css({height: 403});
			pJson.chart.height = '400';
			pJson.chart.marginBottom = 150;
			$('#vjFCGJSChart02').highcharts(pJson);
		},
		drawChart03 : function (pJson) {
			$('#vjFCGJSChart03').highcharts(pJson);
		},
		drawChart04 : function (pJson) {
			pJson.yAxis.title.text = "만원";
			$('#vjFCGJSChart04').highcharts(pJson);
		},
		drawChart05 : function (pJson) {
			$('#vjFCGJSChart05').highcharts(pJson);
		},
		drawChart06 : function (pJson) {
			$('#vjFCGJSChart06').highcharts(pJson);
		},
		drawChart07 : function (pJson) {
			pJson.yAxis.title.text = "점";
			$('#vjFCGJSChart07').highcharts(pJson);
		},
		drawChart08 : function (pJson) {
			pJson.chart.marginBottom = 150;
			$('#vjFCGJSChart08').highcharts(pJson);
		},
		drawChart09 : function (pJson) {
			$('#vjFCGJSChart09').css({height: 400});
			$('#vjFCGJSChart09').closest('.censusChart').css({height: 403});
			pJson.chart.height = '400';
			pJson.chart.marginLeft = 50;
			pJson.chart.marginBottom = 150;
			$('#vjFCGJSChart09').highcharts(pJson);
		},
		drawChart10 : function (pJson) {
			$('#vjFCGJSChart10').css({height: 400});
			$('#vjFCGJSChart10').closest('.censusChart').css({height: 403});
			pJson.chart.height = '400';
			pJson.chart.marginLeft = 50;
			pJson.chart.marginBottom = 150;
			$('#vjFCGJSChart10').highcharts(pJson);
		},
		/*
		 * @name         : 챠트 기본 설정 구하기
		 * @description  : 
		 * @date         : 2018.10.16
		 * @author	     : ywKim
		 * @history 	 :
		 */
		getChartDefaultData : function(pCategoryes, pSeries) {
			var json = {};
			json.chart = {
				type: 'column',
				margin: [30, 5, 100, 40],		// 순서 top, right, bottom, left
			    height: '300'
			};
			json.colors = ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'];
			json.title = { text: '' };
			json.subtitle = { text: '' };
			json.exporting = { enabled: false };
//			json.xAxis = {
//				categories: categories,
//				title: { text: '사업체 규모' }
//			};
			json.xAxis = {
				categories: pCategoryes,
//				categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
				crosshair: true,
				lineWidth: 1,
				lineColor: "#000000",
				tickWidth: 0
			};
			json.yAxis = {
				min: 0, 
				title: { 
					text: "%",
					align: "high",
					offset: 0,
					rotation: 0,
					y: -10
				},
				labels: { overflow: 'justify' },
				lineWidth: 1,
				lineColor: "#000000",
				tickWidth: 0
			};
			json.tooltip = { enabled: true, shared: true },
//			json.tooltip = {
//				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//				pointFormat: '<tr>' +
//							 '	<td style="color:{series.color};padding:0">{series.name}: </td>' +
//		         			 '	<td style="padding:0"><b>{point.y:.1f} mm</b></td>' +
//		         			 '</tr>',
//		         footerFormat: '</table>',
//		         shared: true,
//		         useHTML: true
//			};
//			json.plotOptions = {
//				series: {
//					states: { },
//		            cursor: 'pointer',
//		            point: {
//		                events: {
//		                    click: function (e) {
//		                    	$vjFCGJS.ui.selectedDetailPop(this.series.name);									
//		                    }
//		                }
//		            },
//		            marker: {
//		                lineWidth: 1
//		            }
//				},
//				bar: {
//					dataLabels: { enabled: false }
//				}
//			},
			json.plotOptions = {
				column: {
					pointPadding: 0.2,
				    borderWidth: 0
				}
			};  
			json.legend = { 
				enabled: true,
		        align: 'center',
		        verticalAlign: 'bottom',
//		        borderWidth: 1,
		        symbolWidth: 5,
		        symbolHeight: 5,
		        symbolRadius: 1,
		        itemStyle: {
		        	fontSize: '10px',
		        	fontWeight: 'normal',
		        },
			};
			if (pSeries.length <= 1) {
				json.legend.enabled = false;
			}
			json.credits = { enabled: false };
//			json.series = lineSeries;
			json.series = pSeries;
//				[{
//					name: 'Tokyo',
//					data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//				 }, {
//					 name: 'New York',
//				     data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
//				 }, {
//					 name: 'London',
//				     data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
//				 }, {
//					 name: 'Berlin',
//				     data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
//				 }];     
			
			return json;
//			$('#vjFCGJSChart01').highcharts(json);
//			$('#vjFCGJSChart01').highcharts({
//				chart: {
//					margin:[20,30,90,80],		// 순서 top, right, bottom, left
//				    height: '300'
//				},	
//				colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
//				tooltip: { enabled: true, shared: true },
//				title: { text: '' },
//				subtitle: { text: '' },
//				exporting: { enabled: false },
//				xAxis: {
//					categories: categories,
//					title: { text: '일자' }
//				},
//				yAxis: {
//					min: 0, 
//					title: { text: '구인건수'},
//					labels: { overflow: 'justify' },
//				}, 
//				plotOptions: {
//					series: {
//						states: { },
//			            cursor: 'pointer',
//			            point: {
//			                events: {
//			                    click: function (e) {
//			                    	$vjFCGJS.ui.selectedDetailPop(this.series.name);									
//			                    }
//			                }
//			            },
//			            marker: {
//			                lineWidth: 1
//			            }
//					},
//					bar: {
//						dataLabels: { enabled: false }
//					}
//				},
//				legend: { 
//					enabled: true,
//			        align: 'center',
//			        verticalAlign: 'bottom',
//			        borderWidth: 0
////			        layout: 'vertical',
////			        align: 'right',
////			        verticalAlign: 'middle'
//				},
//				credits: {  enabled: false },
//				series: lineSeries
//			});
		},

		
	};	
	
	$vjFCGJS.event = {
			/**
			 * @name		 : setUIEvent 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("$vjFCGJS.event.setUIEvent() called.");
				
				$workRoad.event.set("click", "#vjFCGJS .view-tab", function() {
					var $a = $(this).find('a').eq(0);
					var ck = $a.hasClass('on');
					if (!ck){
						$a.addClass('on');
						$(this).next('.job-offer-graph').show();
					} else {
						$a.removeClass('on');
						$(this).next('.job-offer-graph').hide();
					}
				});

				// 샘플
				$workRoad.event.set("click", "#sampleId", function() {
				});				
				$workRoad.event.set("change", "#sampleId", function() {
				});				
			},			
	}		
		
}(window, document));