/**
 * 행정통계시각화 대쉬보드 > 통계더보기 > 임금근로
 */
(function(W, D) {
	W.$more6Dash = W.$more6Dash || {};

	$(document).ready(function() {
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$more6Dash.consts = {};

	$more6Dash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			/*$administStatsMain.ui.chartSaveClear();
			$administStatsMain.ui.removeContent();*/
			$administStatsMain.ui.appendContent("/view/administStats/more6Dash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			chart61();
			chart62();
			chart63();
			chart64();
			chart65();
			chart66_01();
			chart66_02();
			chart67_01();
			chart67_02();
			chart68_01();
			chart68_02();
			
			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 1000);
		}

	};

	$more6Dash.util = {
	};

	$more6Dash.event = {
	};

}(window, document));


/*[1908.6, 1867.6, 1889.6, 1910.8, 1958.9, 1889.7, 1957.7, 1959.9, 1996.5]
categories : [ '19년 4분기</br>(11월)', '20년 1분기</br>(2월)', '2분기</br>(5월)', '3분기</br>(8월)',
    '4분기</br>(11월)', '21년 1분기</br>(2월)', '2분기</br>(5월)', '3분기</br>(8월)', '4분기</br>(11월)' ]
data : [ 59.2, 42.8, 21.1, 36.9, 50.3, 32.1, 68.1, 49.1, 37.6 ],*/

///시계열
function chart61() {
	let data = [1908.6, 1867.6, 1889.6, 1910.8, 1958.9, 1889.7, 1957.7, 1959.9, 1996.5];
	Highcharts.chart(
					'chart61',
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
							categories : [ '19년 4분기</br>(11월)', '20년 1분기</br>(2월)', '2분기</br>(5월)', '3분기</br>(8월)',
									       '4분기</br>(11월)', '21년 1분기</br>(2월)', '2분기</br>(5월)', '3분기</br>(8월)', '4분기</br>(11월)' ],
							crosshair : true,
							labels : {
								style : {
									fontFamily : 'NanumSquare',
									color : '#000',
									fontSize : '12px',
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
								if(this.x == "19년 4분기</br>(11월)") {
									returnFormatter = this.y + '만개' +'<br/><span style="color:#FE2432; font-size:15px;">전년 자료 없음</span>';
								}
								if(this.x == "2017년") {
									returnFormatter = this.y + '만개'+'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[1]+'% 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>' ;
								}
								if(this.x == "2018년") {
									returnFormatter = this.y + '만개'+'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[2]+'% 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>' ;
								}
								if(this.x == "2019년") {
									returnFormatter = this.y + '만개'+'<br/><span style="color:#FE2432; font-size:15px;">'+ perChange[3]+'% 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>' ;
								}
								if(this.x == "2020년") {
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
							enabled : true,
							style: {
								fill:"#000"
							}
							
						},
						plotOptions : {
							series : {
								borderRadius : 5,
								marker : {
									enabled : true,
									lineWidth : 4,
									lineColor : '#ffffff',
									fillColor : '#FF5659',
									fontFamily : 'NanumSquare',
								},
								
							}
						},
						series : [ {
							name : '<span style="fill:#181818; font-size:12px;">전체 임금근로 일자리(만개)</span>',
							type : 'column',
							yAxis : 1,
							data : data,
							tooltip : {
								enabled : true
							},
							borderWidth : 1,
							borderColor : "#181818",
							color : "#8993E5",
							// borderRadius: "5px",
							borderRadiusTopLeft : '50%',
							borderRadiusTopRight : '50%',
							pointWidth : 25, // bar 너비 지정
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
							
						},

						{
							name : '<span style="fill:#181818; font-size:12px;">전넌동기대비 증감</span>',
							type : 'spline',
							data : [ 59.2, 42.8, 21.1, 36.9, 50.3, 32.1, 68.1, 49.1, 37.6 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 6,
								symbol : 'circle',
							},
							color : '#FF5659',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
					
						]
					});
}

///누적가로막대_01
function chart62() {
	Highcharts.chart('chart62', {

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
			enabled : false,
		},
		
		 xAxis : [ {
			categories : [ '21년</br>4/4분기', '20년</br>4/4분기' ],
			labels : {
				style : {
					color : '#181818',
					fontSize : '12px',
					fontWeight : '600',
					letterSpacing : '0px',
				},
			},
			lineColor : '#181818',
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
				pointWidth : 50,
				borderRadius :0,
				borderWidth: 1,
				borderColor : "#000"
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
			},
			formatter : function() {
				if (this.y > 0) {
					return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
				} else {
					return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">총갯수</div>';
				}
			},
		},

		series : [ {
			name : '신규일자리',
			data : [ 282.6, 245.1 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#FF5659'
		}, {
			name : '대체일자리',
			data : [ 333.3, 19343.9],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
					lineHeight : '16px',
				},
			},
			color : '#FFAEB0'
		}, {
			name : '지속일자리',
			data : [ 1380.6 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % ',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#FFE9E9'
		}, 
		]
	});
}


///증감막대1
function chart63() {
	Highcharts
			.chart(
					'chart63',
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
							categories : [ '농림</br>어업', '광업', '제조업', '전기<br>가스업', '수도<br>하수</br>폐기물', '건설업', '도소매', '운수</br>창고',
									       '숙박<br>음식', '정보</br>통신', '금융</br>보험', '부동산', '전문</br>과학</br>기술', '사업</br>임대', '공공</br>행정',
									       '교육', '보건</br>사회</br>복지', '예술</br>스포츠</br>복지', '협회</br>수리</br>개인', '기타'],
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
								enabled : true,
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
							data : [ -0.2, 0, 6.2, 0.2, 0.2, 2.6, 6.2, -0.5, 0.6, 7.1, 0.9, 1.4, 5.6, -1.1, -12.3, 5.9, 16.1, 0, 1.1, 0 ],

							color : '#FF5659',
							negativeColor : '#8993E5',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y;
									} else {
										return '-' + Math.abs(this.y);
									}

								},
								color : '#181818',

								style : {
									fontSize : '12px',
									fontWeight : '600',

								},
							},
							pointWidth : 25
						// bar 너비 지정

						}, {
							name : '',
							type : 'spline',
							data : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],

							marker : {
								radius : 20,
								width:"40px",
								symbol : 'url(/images/administStats/more1/more3Dash_icon01.png)',

							},
							color : '#fff',
							dashStyle : 'longdash',

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

///가로증감막대1
function chart64() {
	Highcharts
			.chart(
					'chart64',
					{
						chart : {
							type : 'bar',// 가로 column 지정은 "column"이 아닌 "bar"
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
							categories : [ '전자통신', '전기장비', '기계장비', '화학제품', '섬유제품', '기타운송비' ],
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
							name : '제조업 중분류별 증감',
							data : [ 1.8, 1.7, 0.8, -0.1, -0.4, -0.5 ],

							color : '#FF5659',
							negativeColor : '#8993E5',
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

///가로증감막대2
function chart65() {
	Highcharts
			.chart(
					'chart65',
					{
						chart : {
							type : 'bar',// 가로 column 지정은 "column"이 아닌 "bar"
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
							categories : [ '사회복지&nbsp;서비스업', '교육', '출판업', '육상운송업', '사업지원&nbsp;서비스', '공공행정' ],
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
							name : '서비스업 중분류별 증감',
							data : [ 10.0, 5.9, 4.5, -1.1, -2.4, -12.3 ],

							color : '#FF5659',
							negativeColor : '#8993E5',
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
function chart66_01() {
	let chartData3 = new Array;
	let test = [];
	test.push({name : '남자', y : 1139.7, color : '#3C43AD'}, {name : '여자', y : 856.8, color : '#FF5659'});
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
				let num1 = (((test[0].y) / 1996.5) * 100).toFixed(2);
				let num2 = (((test[1].y) / 1996.5) * 100).toFixed(2);
				
				
				if(this.point.name == "남자") {
					return '남자</br>'+num1+'%';
				}else if(this.point.name == "여자") {
					return '여자</br>'+num2+'%';
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
					'chart66_01',
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
								
								if(this.point.name == "남자") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "여자") {
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

///증감막대1
function chart66_02() {
	Highcharts
			.chart(
					'chart66_02',
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
							categories : [ '남자', '여자' ],
							labels : {
								style : {
									color : '#181818',
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
							name : '성별',
							data : [ 12.2, 25.3 ],

							color : '#3C43AD',
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

///파이2
function chart67_01() {
	let chartData3 = new Array;
	let test = [];
	test.push({name : '29세 이하', y : 324.9, color : '#3C43AD'}, {name : '30~39세', y : 429.4, color : '#8993E5'}, {name : '40~49세', y : 473.2, color : '#C2C8E5'},
			  {name : '50~59세', y : 446.3, color : '#FFAEB0'}, {name : '60세 이상', y : 301.1, color : '#FF5659'});
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
				let num1 = (((test[0].y) / 1974.9) * 100).toFixed(2);
				let num2 = (((test[1].y) / 1974.9) * 100).toFixed(2);
				let num3 = (((test[2].y) / 1974.9) * 100).toFixed(2);
				let num4 = (((test[3].y) / 1974.9) * 100).toFixed(2);
				let num5 = (((test[4].y) / 1974.9) * 100).toFixed(2);
				
				
				if(this.point.name == "29세 이하") {
					return '29세 이하</br>'+num1+'%';
				}else if(this.point.name == "30~39세") {
					return '30~39세</br>'+num2+'%';
				}else if(this.point.name == "40~49세") {
					return '40~49세</br>'+num3+'%';
				}else if(this.point.name == "50~59세") {
					return '50~59세</br>'+num4+'%';
				}else if(this.point.name == "60세 이상") {
					return '60세 이상</br>'+num5+'%';
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
					'chart67_01',
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
								
								if(this.point.name == "29세 이하") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "30~39세") {
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

///증감막대2
function chart67_02() {
	Highcharts
			.chart(
					'chart67_02',
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
							categories : [ '29세 이하', '30~39세', '40~49세', '50~59세', '60세 이상' ],
							labels : {
								style : {
									color : '#000000',
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
							name : '연령대별',
							data : [ 1.8, -0.5, 1.3, 14.4, 20.5 ],

							color : '#3C43AD',
							negativeColor : '#8993E5',
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


///파이3
function chart68_01() {
	let chartData3 = new Array;
	let test = [];
	test.push({name : '회사법인', y : 1108.9, color : '#3C43AD'}, {name : '회사이외법인', y : 259.5, color : '#8993E5'}, 
			{name : '정부 · 비법인단체', y : 283.6, color : '#C2C8E5'}, {name : '개인기업체', y : 322.9, color : '#FF5659'});
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
				let num1 = (((test[0].y) / 1974.9) * 100).toFixed(2);
				let num2 = (((test[1].y) / 1974.9) * 100).toFixed(2);
				let num3 = (((test[2].y) / 1974.9) * 100).toFixed(2);
				let num4 = (((test[3].y) / 1974.9) * 100).toFixed(2);
				
				
				
				if(this.point.name == "회사법인") {
					return '회사법인</br>'+num1+'%';
				}else if(this.point.name == "회사이외법인") {
					return '회사이외법인</br>'+num2+'%';
				}else if(this.point.name == "정부 · 비법인단체") {
					return '정부 · 비법인단체</br>'+num3+'%';
				}else if(this.point.name == "개인기업체") {
					return '개인기업체</br>'+num4+'%';
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
					'chart68_01',
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
								let num2 = (test[2].y - 432).toFixed(1);
								let num3 = (test[3].y - 432).toFixed(1);
								
								if(this.point.name == "회사법인") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "회사이외법인") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num1+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "정부 · 비법인단체") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num2+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "개인기업체") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num3+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
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

///증감막대3
function chart68_02() {
	Highcharts
			.chart(
					'chart68_02',
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
							categories : [ '회사법인', '회사이외법인', '정부 · 비법인</br>단체', '개인기업체' ],
							labels : {
								style : {
									color : '#000000',
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
							name : '조직형태별',
							data : [ 29.5, 5.3, -2.6, 5.4 ],

							color : '#3C43AD',
							negativeColor : '#8993E5',
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
