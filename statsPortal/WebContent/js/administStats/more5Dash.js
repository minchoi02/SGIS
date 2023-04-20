/**
 * 행정통계시각화 대쉬보드 > 통계더보기 > 임금근로
 */
(function(W, D) {
	W.$more5Dash = W.$more5Dash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$more5Dash.consts = {};

	$more5Dash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			
			
			/*$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();*/
			$administStatsMain.ui.appendContent("/view/administStats/more5Dash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			chart51();
			chart52();
			chart53();
			chart54_01();
			chart54_02();
			chart55_01();
			chart55_02();
			chart56_01();
			chart56_02();
			chart57_01();
			chart57_02();
			chart58_01();
			chart58_02();
			chart59();
			
			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 1000);
		}

	};

	$more5Dash.util = {
	};

	$more5Dash.event = {
	};

}(window, document));



///시계열_01
function chart51() {
	let data = [114620778, 167050026, 188844356, 219703030, 255027712];
	Highcharts.chart(
					'chart51',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
							backgroundColor : null, // 배경제거
						},
						credits : {
							enabled : false
						},
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						subtitle : {
							text : '',
						},
						xAxis : [ {
							categories : [ '2016년', '2017년', '2018년', '2019년', '2020년' ],
							crosshair : true,
							labels : {
								style : {
									fontFamily : 'NanumSquare',
									color : '#000',
									fontSize : '12px',
									fontWeight : '600',

								},
								useHTML : true,
								formatter : function() {
									return '<span class="more2-label">'
											+ this.value + '</span>'; // x축 라벨
																		// 배경 컬러
																		// 변경
								},
								visible : false,
							},
							tickWidth : 0.1,// x축 label 사이 표지자 너비
						} ],
						yAxis : [ { // Primary yAxis
							labels : {
								enabled : false
							},
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[1]
								}
							}
						}, { // Secondary yAxis
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[0]
								}
							},
							labels : {
								enabled : false
							},
							opposite : true
						} ],
						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontFamily : 'NanumSquare',
								fontSize : '13px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "#fff",
								lineHeight: '16px',
							},
							formatter : function() {
								var returnFormatter;
								var perChange = [];
								var test = this.x;
								console.log(test);
								
								perChange.push(
									"없음"
									,(((data[1] - data[0]) / data[0] ) * 100).toFixed(1)
									,(((data[2] - data[1]) / data[1] ) * 100).toFixed(1)
									,(((data[3] - data[2]) / data[2] ) * 100).toFixed(1)
									,(((data[4] - data[3]) / data[3] ) * 100).toFixed(1)
								);
								console.log(perChange);
								if(this.x == "2016년") {
									returnFormatter = '증감률' +'<br/><span style="color:#FE2432; font-size:13px;">전년 자료 없음</span>';
								}
								if(this.x == "2017년") {
									returnFormatter = '증감률' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[1]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">% 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2018년") {
									returnFormatter = '증감률' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[2]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">% 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2019년") {
									returnFormatter = '증감률' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[3]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">% 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2020년") {
									returnFormatter = '증감률' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[4]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">% 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								return returnFormatter;
								/*if (this.y > 0) {
									return this.y + '만개';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}*/
							},
						},
						legend : {
							enabled : false,
							style: {
								color:"#fff"
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth :5,
									lineColor : '#169EDA',
									fillColor : '#fff',
									fontFamily : 'NanumSquare',
									
								},
								dataLabels: {
							        enabled: true,
							     // format: '{y} 만개',
									formatter : function() {

										if (this.y > 0) {
											return this.y + ' 백만원';
										} /*else {
											return Math.abs(this.y) + '만개';
										}*/

									},
							        style: {
										color:"#181818",
										fontSize : '13px',
									}
							    },
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 증감(총계)</span>',
							type : 'spline',
							data : [ 114620778, 167050026, 188844356, 219703030, 255027712 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 7,
								symbol : 'circle',
							},
							color : '#169EDA',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
					
						]
					});
}


///누적가로막대_01
function chart52() {
	Highcharts.chart('chart52', {

		chart : {
			renderTo : 'horiStackedBar',
			type : 'bar',// 가로 column 지정은 "column"이 아닌 "bar"
			backgroundColor : null, // 배경제거
			style : {
				fontFamily : 'NanumSquare',
			},
		},
		credits : {
			enabled : false
		}, // highchart 워터마크 숨김처리
		exporting : {
			enabled : false
		},
		title : {
			text : '',
		},
		legend : {
			enabled : true,
		},
		
		 xAxis : [ {
			categories : [ '확정급여형</br>퇴직연금', '확정기여형</br>퇴직연금', 'IRP특례', '개인형</br>퇴직연금(IRP)'],
			labels : {
				style : {
					color : '#181818',
					fontSize : '12px',
					fontWeight : '600',
					letterSpacing : '0px',
				},
			},
			lineColor : '#cfcfcf',
			gridLineWidth : 0,
			tickWidth : 0,
			tickColor : '#cfcfcf',
			tickPosition : 'inside'
		} ], 
		yAxis : [ {
			// y axis 왼쪽
			title : {
				text : ''
			},
			labels : {
				enabled : false
			},

			gridLineWidth : 0
		} ],

		plotOptions : {
			dataLabels : {
				enabled : true,
				format : '{y}',
				style : {
					fontSize : '14px',
					fontWeight : '500',
					textOutline : 0,
				}
			},

			series : {
				stacking : 'percent',// stacked bar 필수 설정 옵션.(default undefined)
				// bar 너비
				pointWidth : 28,
				borderRadius : 8
			}
		},

		tooltip : {
			useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
							// 지정.(default false)
			borderRadius : 20,
			borderWidth : 1,
			borderColor : "#444444",
			shadow : true,
			padding : 10,

			style : {
				fontSize : '13px',
				color : '#494949',
				textAlign : 'center',
				fontWeight : '600',
				opacity : 1,
				background : "rgba(255, 255, 255, 1)",
			},
			formatter : function() {
				if (this.y > 0) {
					return '<div class="1">원리금보장</div><span style="font-size:15px; color:#FE2432;">'+ this.y + '</span><span style="font-size:13px; color:#FE2432;"> 백만원</span>';
				} 
			},
		},

		series : [ {
			name : '대기성',
			data : [ 2228865, 2745196, 31455, 3157885 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				
				style : {
					fontSize : '12px',
					fontWeight : '600',
				},
			},
			color : '#169EDA'
		}, {
			name : '실적배당',
			data : [ 6964830, 10958723, 107023, 9176767 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				style : {
					fontSize : '12px',
					fontWeight : '600',
					lineHeight : '16px',
				},
			},
			color : '#F9A61A'
		}, {
			name : '원리금보장',
			data : [ 144592814, 51481737, 889959, 22692458 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				style : {
					fontSize : '12px',
					fontWeight : '600',
				},
			},
			color : '#8CC63E'
		}, 
		]
	});
}




///누적가로막대_02
function chart53() {
	Highcharts.chart('chart53', {

		chart : {
			renderTo : 'horiStackedBar',
			type : 'bar',// 가로 column 지정은 "column"이 아닌 "bar"
			backgroundColor : null, // 배경제거
			style : {
				fontFamily : 'NanumSquare',
			},
		},
		credits : {
			enabled : false
		}, // highchart 워터마크 숨김처리
		exporting : {
			enabled : false
		},
		title : {
			text : '',
		},
		legend : {
			enabled : true,
		},
		
		 xAxis : [ {
			categories : [ '은행', '증권', '생명보험', '기타'],
			labels : {
				style : {
					color : '#181818',
					fontSize : '12px',
					fontWeight : '600',
					letterSpacing : '0px',
				},
			},
			lineColor : '#cfcfcf',
			gridLineWidth : 0,
			tickWidth : 0,
			tickColor : '#cfcfcf',
			tickPosition : 'inside'
		} ], 
		yAxis : [ {
			// y axis 왼쪽
			title : {
				text : ''
			},
			labels : {
				enabled : false
			},

			gridLineWidth : 0
		} ],

		plotOptions : {
			dataLabels : {
				enabled : true,
				format : '{y}',
				style : {
					fontSize : '14px',
					fontWeight : '500',
					textOutline : 0,
				}
			},

			series : {
				stacking : 'percent',// stacked bar 필수 설정 옵션.(default undefined)
				// bar 너비
				pointWidth : 28,
				borderRadius : 8
			}
		},

		tooltip : {
			useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
							// 지정.(default false)
			borderRadius : 20,
			borderWidth : 1,
			borderColor : "#444444",
			shadow : true,
			padding : 10,

			style : {
				fontSize : '13px',
				color : '#494949',
				textAlign : 'center',
				fontWeight : '600',
				opacity : 1,
				background : "rgba(255, 255, 255, 1)",
			},
			formatter : function() {
				if (this.y > 0) {
					return '<div class="1">원리금보장</div><span style="font-size:15px; color:#FE2432;">'+ this.y + '</span><span style="font-size:13px; color:#FE2432;"> 백만원</span>';
				} 
			},
		},

		series : [ {
			name : '대기성',
			data : [ 4992024, 2930679, 205502, 35195 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				
				style : {
					fontSize : '12px',
					fontWeight : '600',
				},
			},
			color : '#169EDA'
		}, {
			name : '실적배당',
			data : [ 12827578, 11174933, 2967799, 237033 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				style : {
					fontSize : '12px',
					fontWeight : '600',
					lineHeight : '16px',
				},
			},
			color : '#F9A61A'
		}, {
			name : '원리금보장',
			data : [ 111702113, 37418175, 54384964, 16151717 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				style : {
					fontSize : '12px',
					fontWeight : '600',
				},
			},
			color : '#8CC63E'
		}, 
		]
	});
}


///시계열_02
function chart54_01() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart54_01',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
							backgroundColor : null, // 배경제거
						},
						credits : {
							enabled : false
						},
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						subtitle : {
							text : '',
						},
						xAxis : [ {
							categories : [ '2016년', '2017년', '2018년', '2019년',
									'2020년' ],
							crosshair : true,
							labels : {
								style : {
									fontFamily : 'NanumSquare',
									color : '#000',
									fontSize : '14px',
									fontWeight : '600',

								},
								visible : false,
							},
							tickWidth : 0.1,// x축 label 사이 표지자 너비
						} ],
						yAxis : [ { // Primary yAxis
							labels : {
								enabled : false
							},
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[1]
								}
							}
						}, { // Secondary yAxis
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[0]
								}
							},
							labels : {
								enabled : false
							},
							opposite : true
						} ],
						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontFamily : 'NanumSquare',
								fontSize : '13px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "#fff",
								lineHeight: '16px',
							},
							formatter : function() {
								var returnFormatter;
								var perChange = [];
								var test = this.x;
								console.log(test);
								
								perChange.push(
									"없음"
									,(((data[1] - data[0]) / data[0] ) * 100).toFixed(1)
									,(((data[2] - data[1]) / data[1] ) * 100).toFixed(1)
									,(((data[3] - data[2]) / data[2] ) * 100).toFixed(1)
									,(((data[4] - data[3]) / data[3] ) * 100).toFixed(1)
								);
								console.log(perChange);
								if(this.x == "2016년") {
									returnFormatter = '도입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">전년 자료 없음</span>';
								}
								if(this.x == "2017년") {
									returnFormatter = '도입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[1]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2018년") {
									returnFormatter = '도입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[2]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2019년") {
									returnFormatter = '도입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[3]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2020년") {
									returnFormatter = '도입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[4]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								return returnFormatter;
								/*if (this.y > 0) {
									return this.y + '만개';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}*/
							},
						},
						legend : {
							enabled : false,
							style: {
								color:"#fff"
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 5,
									lineColor : '#169EDA',
									fillColor : '#fff',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 증감(총계)</span>',
							type : 'spline',
							data : [ 26.9, 27.2, 27.3, 27.5, 27.2 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 7,
								symbol : 'circle',
							},
							color : '#169EDA',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
					
						]
					});
}

///증감막대1
function chart54_02() {
	Highcharts
			.chart(
					'chart54_02',
					{
						chart : {
							type : 'column',// 가로 column 지정은 "column"이 아닌 "bar"
							backgroundColor : null, // 배경제거
							margin : [ 10, 20, 60, 30 ],// 차트 외곽 마진 설정
							style : {
								fontFamily : 'NanumSquare',

							},

						},

						credits : {
							enabled : false
						}, // highchart 워터마크 숨김처리
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						legend : {
							enabled : false,// 범례
						},
						xAxis : [ {
							categories : [ '2016년', '2017년', '2018년', '2019년', '2020년' ],
							labels : {
								style : {
									color : '#000',
									fontSize : '12px',
									fontWeight : 'bold'

								},
								useHTML : true,
								formatter : function() {
									return '<span class="more2-label">'
											+ this.value + '</span>'; // x축 라벨
																		// 배경 컬러
																		// 변경
								},
							},

						} ],
						yAxis : [ {
							title : {
								text : ''
							},
							labels : {
								enabled : false,
								tickInterval : 100,
								style : {
									color : '#000',
									fontSize : '14px',
									fontWeight : '800'

								},
							},
							gridLineWidth : 0,
							plotLines : [ {
								value : 0,
								color : '#181818',
								width : 1
							} ]
						} ],
						plotOptions : {
							series : {
								borderRadius : 5,
								borderColor : '#181818'
							}
						},

						series : [ {
							name : '증감',
							data : [ 334820, 354018, 378430, 396539, 408462, ],

							color : '#F9A61A',
							negativeColor : '#F9A61A',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								/*// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + '만개';
									} else {
										return Math.abs(this.y) + '만개';
									}

								},*/
								color : '#181818',

								style : {
									fontSize : '12px',
									fontWeight : '600',

								},
							},
							pointWidth : 25
						// bar 너비 지정

						},  ],

						tooltip : {
							enabled: false,
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
							},
							formatter : function() {
								if (this.y > 0) {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}
							},
						},
					});

}

///시계열_03
function chart55_01() {
	Highcharts
			.chart(
					'chart55_01',
					{
						chart : {
							type : 'column',// 가로 column 지정은 "column"이 아닌 "bar"
							backgroundColor : null, // 배경제거
							margin : [ 10, 20, 60, 30 ],// 차트 외곽 마진 설정
							style : {
								fontFamily : 'NanumSquare',

							},

						},

						credits : {
							enabled : false
						}, // highchart 워터마크 숨김처리
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						legend : {
							enabled : false,// 범례
						},
						xAxis : [ {
							categories : [ '보건업 및 사회복지 서비스업', '공공 및 사회보장행정',
									'도소매업', '교육<br>서비스업', '금융 및<br>보험업',
									'운수 및<br>창고업' ],
							labels : {
								style : {
									color : '#000',
									fontSize : '12px',
									fontWeight : 'bold'

								},
							},

						} ],
						yAxis : [ {
							title : {
								text : ''
							},
							labels : {
								enabled : false,
								tickInterval : 100,
								style : {
									color : '#000',
									fontSize : '14px',
									fontWeight : '800'

								},
							},
							gridLineWidth : 0,
							 plotLines : [ {
								value : 0,
								color : '#181818',
								width : 1
							} ]
						} ],
						plotOptions : {
							series : {
								borderRadius : 5,
								borderColor : '#181818'
							},
							dataLabels: {
						        enabled: true,
						     // format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + ' 백만원';
									} else {
										return Math.abs(this.y) + '만개';
									}

								},
						        style: {
									color:"#181818",
									fontSize : '13px',
								}
						    },
						},

						series : [  {
							name : '',
							type : 'spline',
							data : [ 36.9, 19.4, 19.6, 6.1, 58.7, 30.5, 59.4 ],

							marker : {
								radius : 20,
								width:"35px",
								symbol : 'url(/images/administStats/more1/more2Dash_icon03.png)',
								

							},
							color : '#169EDA',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,

						} ],

						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
							},
							formatter : function() {
								if (this.y > 0) {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}
							},
						},
					});

}

///증감막대2
function chart55_02() {
	Highcharts
			.chart(
					'chart55_02',
					{
						chart : {
							type : 'column',// 가로 column 지정은 "column"이 아닌 "bar"
							backgroundColor : null, // 배경제거
							margin : [ 10, 20, 60, 30 ],// 차트 외곽 마진 설정
							style : {
								fontFamily : 'NanumSquare',

							},

						},

						credits : {
							enabled : false
						}, // highchart 워터마크 숨김처리
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						legend : {
							enabled : false,// 범례
						},
						xAxis : [ {
							categories : [ '제조업', '건설업', '도매 및</br>소매업', '숙박 및</br>음식점업', '금융 및</br>보험업', '전문, 과학</br> 및 기술 </br>서비스업', '보건업 및</br>사회복지</br> 서비스업' ],
							labels : {
								style : {
									color : '#000',
									fontSize : '12px',
									fontWeight : 'bold'

								},
							},

						} ],
						yAxis : [ {
							title : {
								text : ''
							},
							labels : {
								enabled : false,
								tickInterval : 100,
								style : {
									color : '#000',
									fontSize : '14px',
									fontWeight : '800'

								},
							},
							gridLineWidth : 0,
							plotLines : [ {
								value : 0,
								color : '#181818',
								width : 1
							} ]
						} ],
						plotOptions : {
							series : {
								borderRadius : 5,
								borderColor : '#181818'
							}
						},

						series : [ {
							name : '증감',
							data : [ 108747, 23314, 68107, 9214, 11463, 27869, 79912 ],

							color : '#F9A61A',
							negativeColor : '#F9A61A',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								/*// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + '만개';
									} else {
										return Math.abs(this.y) + '만개';
									}

								},*/
								color : '#181818',

								style : {
									fontSize : '12px',
									fontWeight : '600',

								},
							},
							pointWidth : 25
						// bar 너비 지정

						},  ],

						tooltip : {
							enabled: false,
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
							},
							formatter : function() {
								if (this.y > 0) {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}
							},
						},
					});

}


///파이1
function chart56_01() {
	let chartData3 = new Array;
	let test = [];
	test.push({name : '추가 가입자', y : 1111862, color : '#169EDA'}, {name : '기존 가입자', y : 1334078, color : '#F9A61A'});
	//1,970.0
	console.log(test);
	chartData3.push({
		type : 'pie',
		// name:'금감원 취하 현황',
		innerSize : '50%',// 도넛 차트 지정시 내부 구멍 너비를 설정.(도넛 차트// 필수 지정 옵션)
		data : test,
		dataLabels : {
			enabled : true,
			formatter : function() {
				//let test111 = (((test[0].y + test[1].y + test[2].y) / test[0].y) * 100) .toFixed(2);
				let num1 = (((test[0].y) / 2445940) * 100).toFixed(2);
				let num2 = (((test[1].y) / 2445940) * 100).toFixed(2);
				
				
				if(this.point.name == "추가 가입자") {
					return '추가가입자</br>'+num1+'%';
				}else if(this.point.name == "기존 가입자") {
					return '기존가입자</br>'+num2+'%';
				}
			} ,// label의
			align : 'center',
			// 세로 위치 지정
			style : {
				fontSize : '14px',
				fontWeight : 'bold',
			}
		}
	});
	Highcharts
			.chart(
					'chart56_01',
					{

						chart : {
							renderTo : 'dounutChart',
							type : 'pie',
							backgroundColor : null, // 배경제거
							style : {
								fontFamily : 'NanumSquare',
							}
						},
						credits : {
							enabled : false
						}, // highchart 워터마크 숨김처리
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						subtitle : {
							align : 'center',
							verticalAlign : 'middle',
							style : {
								color : '#494949',
								fontSize : '14px',
								fontWeight : 'bold',
								lineHeight : 24,
							}
						},

						legend : {
							enabled : false,
						},

						plotOptions : {
							pie : {// 도넛(파이)차트 전체 옵션 지정.
								size : '100%',
								showInLegend : true, // 범례 show/hide 설정.
														// (series 내에서 개별 지정도
														// 가능.)
							}
						},
						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
								lineHeight: '16px',
							},
							formatter : function() {
								
								/*if(this.y > 0){
									return this.y + '만개 증가 <span style="color:red">↑</span>';
								} else {
									return Math.abs(this.y) + '만개 감소 <span style="color:blue">↓</span>';
								}*/
								let num = (test[0].y - 1970).toFixed(1);
								let num1 = (test[1].y - 432).toFixed(1);
								
								if(this.point.name == "추가 가입자") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "기존 가입자") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num1+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}
								/*if (this.y > 0) {
								}else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}*/
							},
						},

						series : chartData3 /*[ {
							type : 'pie',
							// name:'금감원 취하 현황',
							innerSize : '50%',// 도넛 차트 지정시 내부 구멍 너비를 설정.(도넛 차트
												// 필수 지정 옵션)
							data : [ {
								name : '임금근로일자리',
								y : 2023.4,
								color : '#27AEF1'

							}, {
								name : '비임금근로일자리',
								y : 449.0,
								color : '#FF748E'
							} ],
							dataLabels : {
								enabled : true,
								format : '{point.percentage:.1f}%</br> {y}만개' ,// label의
																	// 포맷을 "데이터
																	// 명 : y"로
																	// 지정해서 사용.
								align : 'center',
								// 세로 위치 지정
								style : {
									fontSize : '14px',
									fontWeight : 'bold',
								}
							},

						} ]*/
					});
}

///누적세로막대
function chart56_02() {
Highcharts.setOptions({
	colors: ['#7DB9FF', '#0A79FB', '#1D44C6', '#151B7E']  //차트 색상 지정
});
Highcharts.chart('chart56_02', {
    chart: {
        type: 'column',
        backgroundColor : null, // 배경제거
    },
    credits : {
		enabled : false
	},
	exporting : {
		enabled : false
	},
	title : {
		text : '',
	},
	subtitle : {
		text : '',
	},
    xAxis: {
        categories: ['추가 가입자 비중'],
        lineColor: '#181818',//x축 선 색상 지정.
        fill: '#000',
        fontSize: '12px',
        labels: {
            style: {
                color: '#000',
                fontSize: '12px',
                fontWeight: '600'
            }
        }
    },
    yAxis: {
    	labels : {
			enabled : false,
    	},
        min: 0,
        title: {
            text: ''
        },
        
    },
    dataLabels : { 
    	fill:'#ddd',
    	
 
    },
    legend: {
    	enabled : false,
        align: 'left',
        x: 70,
        verticalAlign: 'top',
        y: 70,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
   
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            },
               
        },
        series: {
            pointWidth: 165, //bar 너비 지정.
        }
    },
   
    series: [{
        name: '자영업자',
        data: [44.6],
    	
    }, {
        name: '퇴직연금제도',
        data: [34.4]
    }, {
        name: '직역연금',
        data: [16.4]
    },{
        name: '단시간근로',
        data: [4.6]
    }]
});
}


///시계열_04
function chart57_01() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart57_01',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
							backgroundColor : null, // 배경제거
						},
						credits : {
							enabled : false
						},
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						subtitle : {
							text : '',
						},
						xAxis : [ {
							categories : [ '2016년', '2017년', '2018년', '2019년',
									'2020년' ],
							crosshair : true,
							labels : {
								style : {
									fontFamily : 'NanumSquare',
									color : '#000',
									fontSize : '14px',
									fontWeight : '600',

								},
								visible : false,
							},
							tickWidth : 0.1,// x축 label 사이 표지자 너비
						} ],
						yAxis : [ { // Primary yAxis
							labels : {
								enabled : false
							},
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[1]
								}
							}
						}, { // Secondary yAxis
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[0]
								}
							},
							labels : {
								enabled : false
							},
							opposite : true
						} ],
						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontFamily : 'NanumSquare',
								fontSize : '13px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "#fff",
								lineHeight: '16px',
							},
							formatter : function() {
								var returnFormatter;
								var perChange = [];
								var test = this.x;
								console.log(test);
								
								perChange.push(
									"없음"
									,(((data[1] - data[0]) / data[0] ) * 100).toFixed(1)
									,(((data[2] - data[1]) / data[1] ) * 100).toFixed(1)
									,(((data[3] - data[2]) / data[2] ) * 100).toFixed(1)
									,(((data[4] - data[3]) / data[3] ) * 100).toFixed(1)
								);
								console.log(perChange);
								if(this.x == "2016년") {
									returnFormatter = '가입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">전년 자료 없음</span>';
								}
								if(this.x == "2017년") {
									returnFormatter = '가입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[1]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2018년") {
									returnFormatter = '가입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[2]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2019년") {
									returnFormatter = '가입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[3]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								if(this.x == "2020년") {
									returnFormatter = '가입률 증감' +'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[4]+'</span>'+'<span style="padding-right:13px; color:#FE2432; font-size:14px;">%p 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"> </span>' ;
								}
								return returnFormatter;
								/*if (this.y > 0) {
									return this.y + '만개';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}*/
							},
						},
						legend : {
							enabled : false,
							style: {
								color:"#fff"
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 5,
									lineColor : '#F9A61A',
									fillColor : '#fff',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 증감(총계)</span>',
							type : 'spline',
							data : [ 49.3, 50.2, 51.3, 51.5, 52.4 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 7,
								symbol : 'circle',
							},
							color : '#F9A61A',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
					
						]
					});
}


///증감막대3
function chart57_02() {
	Highcharts
			.chart(
					'chart57_02',
					{
						chart : {
							type : 'column',// 가로 column 지정은 "column"이 아닌 "bar"
							backgroundColor : null, // 배경제거
							margin : [ 10, 20, 60, 30 ],// 차트 외곽 마진 설정
							style : {
								fontFamily : 'NanumSquare',

							},

						},

						credits : {
							enabled : false
						}, // highchart 워터마크 숨김처리
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						legend : {
							enabled : false,// 범례
						},
						xAxis : [ {
							categories : [ '2016년', '2017년', '2018년', '2019년', '2020년' ],
							labels : {
								style : {
									color : '#000',
									fontSize : '12px',
									fontWeight : 'bold'

								},
								useHTML : true,
								formatter : function() {
									return '<span class="more2-label">'
											+ this.value + '</span>'; // x축 라벨
																		// 배경 컬러
																		// 변경
								},
							},

						} ],
						yAxis : [ {
							title : {
								text : ''
							},
							labels : {
								enabled : false,
								tickInterval : 100,
								style : {
									color : '#000',
									fontSize : '14px',
									fontWeight : '800'

								},
							},
							gridLineWidth : 0,
							plotLines : [ {
								value : 0,
								color : '#181818',
								width : 1
							} ]
						} ],
						plotOptions : {
							series : {
								borderRadius : 5,
								borderColor : '#181818'
							}
						},

						series : [ {
							name : '증감',
							data : [ 5562254, 5796986, 6104704, 6371010, 6647982, ],

							color : '#169EDA',
							negativeColor : '#169EDA',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								/*// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + '만개';
									} else {
										return Math.abs(this.y) + '만개';
									}

								},*/
								color : '#181818',

								style : {
									fontSize : '12px',
									fontWeight : '600',

								},
							},
							pointWidth : 25
						// bar 너비 지정

						},  ],

						tooltip : {
							enabled: false,
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
							},
							formatter : function() {
								if (this.y > 0) {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}
							},
						},
					});

}

///시계열_05
function chart58_01() {
	Highcharts
			.chart(
					'chart58_01',
					{
						chart : {
							type : 'column',// 가로 column 지정은 "column"이 아닌 "bar"
							margin : [ 10, 20, 60, 30 ],// 차트 외곽 마진 설정
							style : {
								fontFamily : 'NanumSquare',

							},

						},

						credits : {
							enabled : false
						}, // highchart 워터마크 숨김처리
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						legend : {
							enabled : false,// 범례
						},
						xAxis : [ {
							categories : [ '보건업 및 사회복지 서비스업', '공공 및 사회보장행정',
									'도소매업', '교육<br>서비스업', '금융 및<br>보험업',
									'운수 및<br>창고업' ],
							labels : {
								style : {
									color : '#000',
									fontSize : '12px',
									fontWeight : 'bold'

								},
							},

						} ],
						yAxis : [ {
							title : {
								text : ''
							},
							labels : {
								enabled : false,
								tickInterval : 100,
								style : {
									color : '#000',
									fontSize : '14px',
									fontWeight : '800'

								},
							},
							gridLineWidth : 0,
							plotLines : [ {
								value : 0,
								color : '#181818',
								width : 1
							} ]
						} ],
						plotOptions : {
							series : {
								borderRadius : 5,
								borderColor : '#181818'
							},
							dataLabels: {
						        enabled: true
						            },
						
						},

						series : [  {
							name : '',
							type : 'spline',
							data : [ 62.5, 33.4, 43.7, 23.5, 73.5, 51, 61 ],

							marker : {
								radius : 20,
								width:"40px",
								symbol : 'url(/images/administStats/more1/more2Dash_icon08.png)',
								

							},
							color : '#F9A61A',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,

						} ],

						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
							},
							formatter : function() {
								if (this.y > 0) {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}
							},
						},
					});

}

///증감막대4
function chart58_02() {
	Highcharts
			.chart(
					'chart58_02',
					{
						chart : {
							type : 'column',// 가로 column 지정은 "column"이 아닌 "bar"
							backgroundColor : null, // 배경제거
							margin : [ 10, 20, 60, 30 ],// 차트 외곽 마진 설정
							style : {
								fontFamily : 'NanumSquare',

							},

						},

						credits : {
							enabled : false
						}, // highchart 워터마크 숨김처리
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						legend : {
							enabled : false,// 범례
						},
						xAxis : [ {
							categories : [ '제조업', '건설업', '도매 및</br>소매업', '숙박 및</br>음식점업', '금융 및</br>보험업', '전문, 과학</br> 및 기술 </br>서비스업', '보건업 및</br>사회복지</br> 서비스업' ],
							labels : {
								style : {
									color : '#000',
									fontSize : '12px',
									fontWeight : 'bold'

								},
							},

						} ],
						yAxis : [ {
							title : {
								text : ''
							},
							labels : {
								enabled : false,
								tickInterval : 100,
								style : {
									color : '#000',
									fontSize : '14px',
									fontWeight : '800'

								},
							},
							gridLineWidth : 0,
							plotLines : [ {
								value : 0,
								color : '#181818',
								width : 1
							} ]
						} ],
						plotOptions : {
							series : {
								borderRadius : 5,
								borderColor : '#181818'
							}
						},

						series : [ {
							name : '증감',
							data : [ 2229063, 255830, 632924, 105690, 370376, 359123, 973242 ],

							color : '#169EDA',
							negativeColor : '#169EDA',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								/*// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + '만개';
									} else {
										return Math.abs(this.y) + '만개';
									}

								},*/
								color : '#181818',

								style : {
									fontSize : '12px',
									fontWeight : '600',

								},
							},
							pointWidth : 25
						// bar 너비 지정

						},  ],

						tooltip : {
							enabled: false,
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
							},
							formatter : function() {
								if (this.y > 0) {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}
							},
						},
					});

}


///시계열_06
function chart59() {
	let data = [1439, 13766, 9535, 4096, 455];
	Highcharts.chart(
					'chart59',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
							backgroundColor : null, // 배경제거
						},
						credits : {
							enabled : false
						},
						exporting : {
							enabled : false
						},
						title : {
							text : '',
						},
						subtitle : {
							text : '',
						},
						xAxis : [ {
							categories : [ '20대', '30대', '40대', '50대', '60대 이상' ],
							crosshair : true,
							labels : {
								style : {
									fontFamily : 'NanumSquare',
									color : '#000',
									fontSize : '14px',
									fontWeight : '600',

								},
								visible : false,
							},
							tickWidth : 0.1,// x축 label 사이 표지자 너비
						} ],
						yAxis : [ { // Primary yAxis
							labels : {
								enabled : false
							},
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[1]
								}
							}
						}, { // Secondary yAxis
							title : {
								text : '',
								style : {
									color : Highcharts.getOptions().colors[0]
								}
							},
							labels : {
								enabled : false
							},
							opposite : true
						} ],
						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							padding : 10,

							style : {
								fontFamily : 'NanumSquare',
								fontSize : '13px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "#fff",
								lineHeight: '16px',
							},
							formatter : function() {
								var returnFormatter;
								var perChange = [];
								var test = this.x;
								console.log(test);
								
								perChange.push(
									"없음"
									,(((data[1] - data[0]) / data[0] ) * 100).toFixed(1)
									,(((data[2] - data[1]) / data[1] ) * 100).toFixed(1)
									,(((data[3] - data[2]) / data[2] ) * 100).toFixed(1)
									,(((data[4] - data[3]) / data[3] ) * 100).toFixed(1)
								);
								console.log(perChange);
								if(this.x == "20대") {
									returnFormatter = this.y + '만개' +'<br/><span style="color:#FE2432; font-size:15px;">전년 자료 없음</span>';
								}
								if(this.x == "30대") {
									returnFormatter = this.y + '만개'+'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[1]+'% 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>' ;
								}
								if(this.x == "40대") {
									returnFormatter = this.y + '만개'+'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[2]+'% 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>' ;
								}
								if(this.x == "50대") {
									returnFormatter = this.y + '만개'+'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[3]+'% 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>' ;
								}
								if(this.x == "60대 이상") {
									returnFormatter = this.y + '만개'+'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[4]+'% 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>' ;
								}
								return returnFormatter;
								/*if (this.y > 0) {
									return this.y + '만개';
								} else {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
								}*/
							},
						},
						legend : {
							enabled : false,
							style: {
								color:"#fff"
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth :3,
									lineColor : '#8CC63E',
									fillColor : '#fff',
									fontFamily : 'NanumSquare',
									
								},
								dataLabels: {
							        enabled: true
							            },
							}
						},
						series : [ {
							name : '주택구입',
							type : 'spline',
							data : [ 1439, 13766, 9535, 4096, 455 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 7,
								symbol : 'circle',
							},
							color : '#8CC63E',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},{
							name : '주거임차',
							type : 'spline',
							data : [ 2183, 7596, 4082, 1806, 298 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 7,
								symbol : 'circle',
							},
							color : '#F9A61A',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},{
							name : '장기요양',
							type : 'spline',
							data : [ 287, 3911, 6865, 4873, 467 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 7,
								symbol : 'circle',
							},
							color : '#169EDA',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},{
							name : '기타',
							type : 'spline',
							data : [ 542, 2922, 2566, 1241, 257 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 7,
								symbol : 'circle',
							},
							color : '#FFE93D',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
					
						]
					});
}

