/**
 * 행정통계시각화 대쉬보드 > 통계더보기 > 임금근로
 */
(function(W, D) {
	W.$more4Dash = W.$more4Dash || {};

	$(document).ready(function() {
		
	});

	$(window).scroll(function() {
	});

	$(window).resize(function() {
	});

	$more4Dash.consts = {};

	$more4Dash.ui = {

		/**
		 * @name init
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		init : function() {
			/*
			 * $administStatsMain.ui.chartSaveClear();
			 * $administStatsMain.ui.removeContent();
			 */
			$administStatsMain.ui
					.appendContent("/view/administStats/more4Dash/main");
		},

		/**
		 * @name ready
		 * @description 최초 화면을 초기화(각 화면을 로딩)
		 */
		ready : function() {
			chart1_01();
			chart1_02();
			chart1_03();
			chart1_04();
			chart1_05();
			chart1_06();
			chart2();
			chart3();
			chart4();
			chart5();
			chart6();
			chart7();
			chart8_01();
			chart8_02();
			chart9();

			console.log($administStatsMain.ui.selectedYear); // 2020
			console.log($administStatsMain.ui.selectedYear); // 2020
			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 1000);
			/*
			 * setTimeout(function() { $more1Dash.event.allChange(); }, 50);
			 */

			// 년도 셀렉트박스 -> 년도분기 셀렉트박스로 크기 늘리기
			$(".header-tag .select").css("width", "140px");
		}

	};

	$more4Dash.util = {};

	$more4Dash.event = {};

}(window, document));

// /시계열
function chart1_01() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart1_01',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
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
									color : '#fff',
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
								color:"#fff"
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 3,
									lineColor : '#ffffff',
									fillColor : '#023F97',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 일자리규모(총계)</span>',
							type : 'column',
							yAxis : 1,
							data : data,
							tooltip : {
								enabled : true
							},
							borderWidth : 0,
							color : "#C9DFFF",
							borderRadius: "5px",
							pointWidth : 35, // bar 너비 지정
							
						},

						{
							name : '<span style="fill:#fff; font-size:11px;">연도별 증감(총계)</span>',
							type : 'spline',
							data : [ 285.4, 316.3, 341.9, 401.9, 472.5 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
					
						]
					});
}

function chart1_02() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart1_02',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
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
									color : '#fff',
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
								color:"#fff"
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 3,
									lineColor : '#FF748E',
									fillColor : '#023F97',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 일자리규모(총계)</span>',
							type : 'column',
							yAxis : 1,
							data : data,
							tooltip : {
								enabled : true
							},
							borderWidth : 0,
							color : "#C9DFFF",
							borderRadius: "5px",
							pointWidth : 35, // bar 너비 지정
							
						},

						
						{
							name : '<span style="fill:#fff; font-size:11px;">임금근로일자리</span>',
							type : 'spline',
							data : [ 1879.4, 1906.5, 1920.1, 1970.0, 2023.4 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#FF748E',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
							lineColor : '#27AEF1',
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">비임금근로일자리</span>',
							type : 'spline',
							data : [ 406.1, 409.8, 421.8, 432.0, 449.0 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#27AEF1',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
							lineColor : '#FF748E',
						},	
						]
					});
}

function chart1_03() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart1_03',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
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
									color : '#fff',
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
								color:"#fff"
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 3,
									lineColor : '#ffffff',
									fillColor : '#023F97',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 일자리규모(총계)</span>',
							type : 'column',
							yAxis : 1,
							data : data,
							tooltip : {
								enabled : true
							},
							borderWidth : 0,
							color : "#C9DFFF",
							borderRadius: "5px",
							pointWidth : 35, // bar 너비 지정
							
						},
						
						{
							name : '<span style="fill:#fff; font-size:11px;">대기업</span>',
							type : 'spline',
							data : [ 350.6, 355.8, 368.4, 380.4, 398.4 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
							lineColor : '#FF748E',
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">중소기업</span>',
							type : 'spline',
							data : [ 1477.9, 1488.5, 1497.5, 1513.9, 1547.0 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
							lineColor : '#013387',
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">비영리기업</span>',
							type : 'spline',
							data : [ 456.9, 472.1, 476.0, 507.6, 527.1 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
							lineColor : '#27AEF1',
						},
						]
					});
}

function chart1_04() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart1_04',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
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
									color : '#fff',
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
							fontSize:"10px",
							style: {
								color:"#fff",
								fontSize:"10px",
								
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 3,
									lineColor : '#ffffff',
									fillColor : '#023F97',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 일자리규모(총계)</span>',
							type : 'column',
							yAxis : 1,
							data : data,
							tooltip : {
								enabled : true
							},
							borderWidth : 0,
							color : "#C9DFFF",
							borderRadius: "5px",
							pointWidth : 35, // bar 너비 지정
							
						},
						
						{
							name : '<span style="fill:#fff; font-size:11px;">회사법인</span>',
							type : 'spline',
							data : [ 1102.4, 1115.8, 1129.5, 1140.3, 1167.2 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
								width: 20,
					            height: 20
							},
							color : '#27AEF1',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">회사이외법인</span>',
							type : 'spline',
							data : [ 211.7, 220.4, 221.9, 238.6, 240.9 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
								width: 20,
					            height: 20
							},
							color : '#fff',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">정부 · 비법인단체</span>',
							type : 'spline',
							data : [ 244.8, 251.5, 255.7,270.8, 287.7 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#FF748E',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">개인기업체</span>',
							type : 'spline',
							data : [ 726.6, 728.7, 734.7, 752.2, 776.6 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#013387',
							dashStyle : 'solid',
							lineWidth : 3,
							shadow : true,
						},
						]
					});
}

function chart1_05() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart1_05',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
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
									color : '#fff',
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
								color:"#fff",
								
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 3,
									lineColor : '#ffffff',
									fillColor : '#023F97',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 일자리규모(총계)</span>',
							type : 'column',
							yAxis : 1,
							data : data,
							tooltip : {
								enabled : true
							},
							borderWidth : 0,
							color : "#C9DFFF",
							// borderRadius: "5px",
							borderRadiusTopLeft : '50%',
							borderRadiusTopRight : '50%',
							pointWidth : 35, // bar 너비 지정
							
						},
						
						{
							name : '<span style="fill:#fff; font-size:11px;">19세이하</span>',
							type : 'spline',
							data : [ 11.2, 10.7, 9.3, 8.7, 7.1 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">20~29세</span>',
							type : 'spline',
							data : [ 163.6, 166.5, 168.3, 175.0, 177.1 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
								
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">30~39세</span>',
							type : 'spline',
							data : [ 326.5, 322.2, 313.6, 312.2, 314.3 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">40~49세</span>',
							type : 'spline',
							data : [ 363.2, 363.0, 357.2, 353.4, 357.7 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">50~59세</span>',
							type : 'spline',
							data : [ 307.6, 315.8, 318.6, 328.1, 334.7 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">60세이상</span>',
							type : 'spline',
							data : [ 171.5, 185.7, 198.2, 214.5, 232.3 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						]
					});
}

function chart1_06() {
	let data = [2285.4, 2316.3, 2341.9, 2401.9, 2472.5];
	Highcharts.chart(
					'chart1_06',
					{
						chart : {
							zoomType : 'xy'
						},
						chart : {
							type : 'line',
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
									color : '#fff',
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
								color:"#fff",
								
							}
							
						},
						plotOptions : {
							series : {
								marker : {
									enabled : true,
									lineWidth : 3,
									lineColor : '#ffffff',
									fillColor : '#023F97',
									fontFamily : 'NanumSquare',
								},
							}
						},
						series : [ {
							name : '<span style="fill:#fff; font-size:11px;">연도별 일자리규모(총계)</span>',
							type : 'column',
							yAxis : 1,
							data : data,
							tooltip : {
								enabled : true
							},
							borderWidth : 0,
							color : "#C9DFFF",
							// borderRadius: "5px",
							borderRadiusTopLeft : '50%',
							borderRadiusTopRight : '50%',
							pointWidth : 35, // bar 너비 지정
							
						},
						
						{
							name : '<span style="fill:#fff; font-size:11px;">19세이하</span>',
							type : 'spline',
							data : [ 11.2, 10.4, 9.3, 8.8, 7.1 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">20~29세</span>',
							type : 'spline',
							data : [ 165.5, 163.3, 163.9, 166.8, 166.5 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
								
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">30~39세</span>',
							type : 'spline',
							data : [ 206.1, 202.7, 203.2, 204.8, 208.4 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">40~49세</span>',
							type : 'spline',
							data : [ 250.5, 248.2, 249.0, 247.5, 253.0 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">50~59세</span>',
							type : 'spline',
							data : [ 207.1, 215.8, 226.8, 239.8, 251.5 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						{
							name : '<span style="fill:#fff; font-size:11px;">60세이상</span>',
							type : 'spline',
							data : [ 101.5, 112.0, 124.4, 142.6, 162.9 ],
							tooltip : {
								enabled : true
							},
							marker : {
								radius : 5,
								symbol : 'circle',
							},
							color : '#fff',
							dashStyle : 'shortdash',
							lineWidth : 3,
							shadow : true,
						},
						]
					});
}


// 가로막대
function chart2() {
	Highcharts
			.chart(
					'chart2',
					{
						chart : {
							type : 'bar',
							backgroundColor : null, // 배경제거

						},
						style : {
							fontFamily : 'NanumSquare',

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
						xAxis : {
							categories : [ '신규일자리', '소멸일자리' ],
							title : {
								text : null
							},
							labels : {
								style : {
									color : '#fff',
									fontSize : '12px',
									fontWeight : '600',

								},
							}
						},
						yAxis : {
							min : 0,

							labels : {
								overflow : 'justify',
							}
						},
						tooltip : {
							useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로
											// 지정.(default false)
							borderRadius : 20,
							borderWidth : 1,
							borderColor : "#444444",
							shadow : true,
							paddingRight : '30px',
							
							style : {
								fontSize : '12px',
								color : '#494949',
								textAlign : 'center',
								fontWeight : '600',
								opacity : 1,
								background : "rgba(255, 255, 255, 1)",
							},
							formatter : function() {
								let img =  '<span class="1" style="font-size:14px; font-weight:600; color:#FE2432;">70.5만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </span>';
								/*if (this.y > 0) {*/
									return img;
									
								/*}*/
							},
						},
						plotOptions : {
							bar : {
								dataLabels : {
									enabled : true
								}
							},
							series : {
								style : {
									textShadow : false,
								}
							},
						},

						credits : {
							enabled : false
						},
						series : [ {
							name : 'Year 1990',
							data : [ 333.3, 262.8 ],
							color : '#FF748E',
							borderWidth : 0, // border 값 제거
							borderRadius: "5px",
							pointWidth : 35, // bar 너비 지정
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										//return '<span class="1" style="font-size:14px; font-weight:600; color:#FE2432;">70.5만개 증가 <img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span>';
										return this.y + ' 만개';
									} else {
										return Math.abs(this.y) + ' 만개';
									}

								},
								color : '#fff',

								style : {
									fontFamily : 'NanumSquare',
									fontSize : '14px',
									fontWeight : '600',

								},
							},
						}, ],
					});
}

// /파이1
function chart3() {
	let chartData3 = new Array;
	let test = [];
	test.push({name : '임금근로일자리', y : 2023.4, color : '#27AEF1'}, {name : '비임금근로일자리', y : 449.0, color : '#FF748E'});
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
				let num1 = (((test[0].y) / 2472.5) * 100).toFixed(2);
				let num2 = (((test[1].y) / 2472.5) * 100).toFixed(2);
				
				
				if(this.point.name == "임금근로일자리") {
					return num1+'%</br> <span style="color:#27AEF1; font-size:15px;">'+this.y+'만개</span>';
				}else if(this.point.name == "비임금근로일자리") {
					return num2+'%</br> <span style="color:#FF748E; font-size:15px;">'+this.y+'만개</span>'
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
					'chart3',
					{

						chart : {
							renderTo : 'dounutChart',
							type : 'pie',
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
								
								if(this.point.name == "임금근로일자리") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "비임금근로일자리") {
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

// /파이2
function chart4() {
	let chartData4 = new Array;
	let test = [];
	test.push({name : '중소기업', y : 1547.0, color : '#27AEF1'}, {name : '대기업', y : 398.4, color : '#0078D5'}, {name : '비영리기업', y : 527.1, color : '#FF748E'});
	//1,970.0
	console.log(test);
	chartData4.push({
		type : 'pie',
		// name:'금감원 취하 현황',
		innerSize : '50%',// 도넛 차트 지정시 내부 구멍 너비를 설정.(도넛 차트// 필수 지정 옵션)
		data : test,
		dataLabels : {
			enabled : true,
			//format : '{point.percentage:.1f}%</br> <span style="color:#FF748E; font-size:15px;">{y}만개</span>' ,// label의
			align : 'center',
			// 세로 위치 지정
			style : {
				fontSize : '14px',
				fontWeight : 'bold',
			},
			formatter : function() {
				//let test111 = (((test[0].y + test[1].y + test[2].y) / test[0].y) * 100) .toFixed(2);
				let num1 = (((test[0].y) / 2472.5) * 100).toFixed(2);
				let num2 = (((test[1].y) / 2472.5) * 100).toFixed(2);
				let num3 = (((test[2].y) / 2472.5) * 100).toFixed(2);
				
				if(this.point.name == "중소기업") {
					return num1+'%</br> <span style="color:#27AEF1; font-size:15px;">'+this.y+'만개</span>';
				}else if(this.point.name == "대기업") {
					return num2+'%</br> <span style="color:#0078D5; font-size:15px;">'+this.y+'만개</span>'
				}else if(this.point.name == "비영리기업") {
					return num3+'%</br> <span style="color:#FF748E; font-size:15px;">'+this.y+'만개</span>'
				}
			}
		}
	});
	Highcharts
			.chart(
					'chart4',
					{

						chart : {
							renderTo : 'dounutChart',
							type : 'pie',
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
								let num = (test[0].y - 1513.9).toFixed(1);
								let num1 = (test[1].y - 380.4).toFixed(1);
								let num2 = (test[2].y - 507.6).toFixed(1);
								
								if(this.point.name == "중소기업") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "대기업") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num1+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "비영리기업") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num2+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}
							},
						},
						series : chartData4 /*[ {
							type : 'pie',
							// name:'금감원 취하 현황',
							innerSize : '50%',// 도넛 차트 지정시 내부 구멍 너비를 설정.(도넛 차트
												// 필수 지정 옵션)
							data : [ {
								name : '중소기업',
								y : 1547.0,
								color : '#27AEF1'

							}, {
								name : '대기업',
								y : 398.4,
								color : '#0078D5'

							}, {
								name : '비영리기업',
								y : 527.1,
								color : '#FF748E'
							} ],
							dataLabels : {
								enabled : true,
								format : '{point.percentage:.1f} %',// label의
																	// 포맷을 "데이터
																	// 명 : y"로
																	// 지정해서 사용.
								align : 'center',
								// 세로 위치 지정
								style : {
									fontSize : '14px',
								}
							},

						} ] */
					});
}

// 하프파이
function chart5() {
	let chartData5 = new Array;
	let test = [];
	test.push({name : '9.7%', y : 240.9, color : '#27AEF1'}, {name : '11.6%', y : 287.7, color : '#0078D5'}, {name : '31.4%', y : 776.6, color : '#FF748E'}, {name : '47.2%', y : 1167.2, color : '#FF748E'});
	//1,970.0
	console.log(test);
	chartData5.push({
		
	
		type : 'pie',
		// name:'금감원 취하 현황',
		innerSize : '60%',// 도넛 차트 지정시 내부 구멍 너비를 설정.(도넛 차트// 필수 지정 옵션)
		data : test,
		dataLabels : {
			enabled : true,
			format : '{point.percentage:.1f}%' ,// label의
			align : 'center',
			// 세로 위치 지정
			style : {
				fontSize : '15px',
				fontWeight : 'bold',
			}
		}
	});
	Highcharts
			.chart(
					'chart5',
					{
						chart : {
							plotBackgroundColor : null,
							plotBorderWidth : 0,
							plotShadow : false,
							// margin: [10, 20, 60, 30],//차트 외곽 마진 설정
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
							enabled : false,// 범례
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
								let num = (test[0].y - 238.6).toFixed(1);
								let num1 = (test[1].y - 270.8).toFixed(1);
								let num2 = (test[2].y - 752.2).toFixed(1);
								let num3 = (test[3].y - 1140.3).toFixed(1);
								
								if(this.point.name == "9.7%") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "11.6%") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num1+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "31.4%") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num2+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}else if(this.point.name == "47.2%") {
									return '<div class="1">일자리 증감</div><div style="font-size:14px; color:#FE2432;">'+num3+' 만개 증가 <span style="padding-right:15px;"><img src="/images/administStats/more1/trending_up.png" alt="" style="width:15px;"></span> </div>';
								}
							},
						},
						accessibility : {
							point : {
								valueSuffix : '%'
							}
						},
						plotOptions : {
							pie : {
								dataLabels : {
									enabled : true,
									distance : -50,
									style : {
										fontWeight : 'bold',
										color : '#000',
										fontSize : '14px',
										fontWeight : 'bold',
									}
								},
								startAngle : -90,
								endAngle : 90,
								center : [ '50%', '75%' ],
								size : '110%'
							}
						},
						series : chartData5 /*[ {
							type : 'pie',
							name : 'Browser share',
							innerSize : '60%', // 파이 넒이 변경
							data : [ [ '9.7%', 9.7 ], [ '11.6%', 11.6 ],
									[ '31.4%', 31.4 ], [ '47.2%', 47.2 ], ],
							style : {
								fontWeight : 'bold',
							},
						} ]*/ 
					});
}

// 타일
function chart6() {
	Highcharts.chart('chart6', {
		chart: {
	    
	    },
		colorAxis : {
			minColor : '#FFFFFF',
			maxColor : Highcharts.getOptions().colors[0]
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
		series : [ {
			type : 'treemap',
			layoutAlgorithm : 'squarified',
			data : [ {
				name : '제조업<br/>19.5% <br/> 841.7만개',
				value : 19.5,
				colorValue : 1,
				color : "#013387",
				
			}, {
				name : '도소매업<br/>12.8%<br/>316.7만개',
				value : 12.8,
				colorValue : 2,
				color : "#0078D5"
			}, {
				name : '보건 및 사회복지 서비스업<br/>9.2%<br/>226.3만개',
				value : 9.2,
				colorValue : 3,
				color : "#60C0EC"
			}, {
				name : '건설업<br/>8.2% <br/> 202.6만개',
				value : 8.2,
				colorValue : 4,
				color : "#64B5F6"
			}, {
				name : '숙박 및 음식점업<br/>6.3% <br/> 155.8만개',
				value : 6.3,
				colorValue : 5,
				color : "#C9DFFF"
			}, {
				name : '기타</br>44.0%<br/>1,089.3만개',
				value : 44,
				colorValue : 6,
				color : "#CED4DA"
			} ],
			dataLabels : {
				style : {

					fontSize : '12px',
					fontWeight : 'bold'

				},
			},
		} ],

	});

}

// /증감막대1
function chart7() {
	Highcharts
			.chart(
					'chart7',
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
							data : [ 13, 12, 11, -0.1, -0.5, -1.4 ],

							color : '#FF748E',
							negativeColor : '#27AEF1',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + '만개';
									} else {
										return Math.abs(this.y) + '만개';
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
							data : [ 0, 0, 0, 0, 0, 0 ],

							marker : {
								radius : 20,
								width:"40px",
								symbol : 'url(/images/administStats/more1/more1Dash_icon01.png)',

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

// /누적가로막대
function chart8_01() {
	Highcharts.chart('chart8_01', {

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
		
		/* xAxis : [ {
			categories : [ '남자', '여자' ],
			labels : {
				style : {
					color : '#fff',
					fontSize : '14px',
					fontWeight : '600',
					letterSpacing : '0px',
					stroke:'#000',
					

				},
			},
			lineColor : '#cfcfcf',
			gridLineWidth : 0,
			tickWidth : 0,
			tickColor : '#cfcfcf',
			tickPosition : 'inside'
		} ], */
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
				stacking : 'normal',// stacked bar 필수 설정 옵션.(default undefined)
				// bar 너비
				pointWidth : 40,
				borderRadius : 8
			}
		},

		/* tooltip : {
			useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
			borderRadius : 10,
			backgroundColor : '#000000',
			borderWidth : 0,
			shadow : false,
			padding : 10,

			style : {
				fontSize : '14px',
				color : '#fff',
				textAlign : 'left',
				fontWeight : '600',
			},
			formatter : function() {
				var s = '';
				$.each(this.points, function(i, point) {
					s += point.series.name + ': ' + point.y + '만개<br/>';
				});
				return s;
			},
			shared : true
		}, */

		series : [ {
			name : '60세 이상',
			data : [ 232.3 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#013387'
		}, {
			name : '50~59세',
			data : [ 334.7 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
					lineHeight : '16px',
				},
			},
			color : '#1F60DE'
		}, {
			name : '40~49세',
			data : [ 357.7 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#4390FF'
		}, {
			name : '30~39세',
			data : [ 314.3 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#64B5F6'
		}, {
			name : '20~29세',
			data : [ 177.1 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#C9DFFF'
		}, {
			name : '19세 이하',
			data : [ 7.1 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,

				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',

				},
			},
			color : '#CED4DA',
			
		},

		]
	});
}


///누적가로막대
function chart8_02() {
	Highcharts.chart('chart8_02', {

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
		
		/* xAxis : [ {
			categories : [ '남자', '여자' ],
			labels : {
				style : {
					color : '#fff',
					fontSize : '14px',
					fontWeight : '600',
					letterSpacing : '0px',
					stroke:'#000',
					

				},
			},
			lineColor : '#cfcfcf',
			gridLineWidth : 0,
			tickWidth : 0,
			tickColor : '#cfcfcf',
			tickPosition : 'inside'
		} ], */
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
				stacking : 'normal',// stacked bar 필수 설정 옵션.(default undefined)
				// bar 너비
				pointWidth : 40,
				borderRadius : 8
			}
		},

		/* tooltip : {
			useHTML : true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
			borderRadius : 10,
			backgroundColor : '#000000',
			borderWidth : 0,
			shadow : false,
			padding : 10,

			style : {
				fontSize : '14px',
				color : '#fff',
				textAlign : 'left',
				fontWeight : '600',
			},
			formatter : function() {
				var s = '';
				$.each(this.points, function(i, point) {
					s += point.series.name + ': ' + point.y + '만개<br/>';
				});
				return s;
			},
			shared : true
		}, */

		series : [ {
			name : '60세 이상',
			data : [ 232.3 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#013387'
		}, {
			name : '50~59세',
			data : [ 334.7 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
					lineHeight : '16px',
				},
			},
			color : '#1F60DE'
		}, {
			name : '40~49세',
			data : [ 357.7 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#4390FF'
		}, {
			name : '30~39세',
			data : [ 314.3 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#64B5F6'
		}, {
			name : '20~29세',
			data : [ 177.1 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,
				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',
				},
			},
			color : '#C9DFFF'
		}, {
			name : '19세 이하',
			data : [ 7.1 ],
			dataLabels : {
				enabled : true,
				allowOverlap : true,

				format : '{point.percentage:.1f} % </br> {y}만개',
				color : '#000',
				style : {
					fontSize : '13px',
					fontWeight : '600',

				},
			},
			color : '#CED4DA',
			
		},

		]
	});
}
// /증감막대2
function chart9() {
	Highcharts
			.chart(
					'chart9',
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
							categories : [ '19세 이하', '20~29세', '30~39세',
									'40~49세', '50~59세', '60세 이상' ],
							labels : {
								style : {
									color : '#000',
									fontSize : '12px',
									fontWeight : 'bold',

								},
								useHTML : true,
								formatter : function() {
									return '<span class="hc-label">'
											+ this.value + '</span>'; // x축 라벨
																		// 배경 컬러
																		// 변경
								}
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
							name : '남자',
							data : [ -1.6, 2.1, 2.1, 2.1, 6.6, 17.8 ],

							color : '#27AEF1',
							negativeColor : '#27AEF1',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + '만개';
									} else {
										return Math.abs(this.y) + '만개';
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
							name : '여자',
							data : [ -1.7, -0.3, 3.6, 5.5, 11.7, 20.3 ],

							color : '#FF748E',
							negativeColor : '#FF748E',
							// 해당년도 위 데이터 표시
							dataLabels : {
								enabled : true,
								useHTML : false,
								// format: '{y} 만개',
								formatter : function() {

									if (this.y > 0) {
										return this.y + '만개';
									} else {
										return Math.abs(this.y) + '만개';
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

						}, ],

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
