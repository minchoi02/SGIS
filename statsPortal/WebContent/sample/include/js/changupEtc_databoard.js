$(function() {
	var body = $("body");
	if ($(".clickArea .fl .charts").length)
		clickAreaCharts(".clickArea .fl .charts", 960, 40);
	if ($(".clickArea .fr .charts").length)
		clickAreaCharts(".clickArea .fr .charts", 700, 300);
	if ($("#targetCharts").length)
		targetAreaCharts();
	if ($("#pieChartDiv1").length)
		topAreaCharts();
	if ($(".imAreaCharts").length)
		imAreaCharts();
	if ($(".imAreaSlide").length)
		imAreaSlide();
	if ($(".poiCharts").length)
		poiCharts();
	if ($(".poiPieCharts").length)
		poiPieCharts();
	if ($(".poiLineCharts").length)
		poiLineCharts();
	if ($("#basic_handson01").length)
		handsonTable01();
	if ($("#basic_handson02").length)
		handsonTable02();  
		$(window).on("resize", function(){ 
			var dbHeight = $(".dataSideContents").height()-100;
			$("#basic_handson02").css("height",dbHeight+"px");
		}); 
	if ($("#basic_handson02").length)
		handsonTable02(); 
	
	/*0924*/
	if ($(".dssRow").length){
		dssChart();
	}
	if ($("#bar01").length){
		barsRotateCharts("#bar01");
		barsRotateCharts("#bar02");
		barsRotateCharts("#bar03");
		barsRotateCharts("#bar04");
		barsRotateCharts("#bar05");
		horizontalCharts("#horiCharts01");
		horizontalCharts("#horiCharts02");
		horizontalCharts("#horiCharts03");
		horizontalCharts("#horiCharts03");
		horizontalCharts("#horiCharts03");
	} 
	if ($("#cateSaupCharts01").length){
		cateSaupCharts("#cateSaupCharts01", "서울시 비율");
		cateSaupCharts("#cateSaupCharts02", "전국평균 비율");
	}
	if ($("#horiWonCharts01").length){
		horizontalCharts("#horiWonCharts01");
		horizontalCharts("#horiWonCharts02");
		horizontalCharts("#horiWonCharts03");
		horizontalCharts("#horiWonCharts04");
		horizontalCharts("#horiWonCharts05");
	}
	if ($("#foodAreaCharts01").length){
		foodAreaCharts("#foodAreaCharts01");
		foodAreaCharts("#foodAreaCharts02");
		foodAreaCharts("#foodAreaCharts03");
	}
	if ($("#foodAreaCateCharts01").length){
		foodAreaCharts("#foodAreaCateCharts01");
		foodAreaCharts("#foodAreaCateCharts02");
		foodAreaCharts("#foodAreaCateCharts03");
	}
	if ($("#timeAreaCharts01").length){
		timeAreaCharts("#timeAreaCharts01"); 
	}
	if ($("#spyCharts01").length){
		spyCharts("#spyCharts01", "인구특성");
		spyCharts("#spyCharts02", "거주/주택특성"); 
		
	}
	if ($("#ingoAgeCharts01").length){
		ingoAgeCharts();
		
	}
	
	
	//////////////////////////////////////////////////////////
	
	slideValue01("rbs01", "rbs02", "#rbSlide", " ");
	slideValue02("#rbSlide01");
	
	
});
var data = { "title":"서울시", "arr": [
	{"color":"#10927f", "name":"한식", "value":"100"},
	{"color":"#10927f", "name":"한식", "value":"100"},
	{"color":"#10927f", "name":"한식", "value":"100"},
	{"color":"#10927f", "name":"한식", "value":"100"},
	{"color":"#10927f", "name":"한식", "value":"100"},
	{"color":"#10927f", "name":"한식", "value":"100"},
	{"color":"#dd6796", "name":"중식", "value":"90"},
	{"color":"#e6b966", "name":"일식", "value":"80"},
	{"color":"#98bd66", "name":"서양식", "value":"70"},
	{"color":"#66c6f5", "name":"서양식", "value":"60"},
	{"color":"#69d798", "name":"서양식", "value":"50"},
	{"color":"#a4a9c6", "name":"서양식", "value":"40"},
	{"color":"#e19b6c", "name":"서양식", "value":"30"},
	{"color":"#98bd66", "name":"서양식", "value":"70"},
	{"color":"#66c6f5", "name":"서양식", "value":"60"},
	{"color":"#69d798", "name":"서양식", "value":"50"},
	{"color":"#a4a9c6", "name":"서양식", "value":"40"},
	{"color":"#e19b6c", "name":"서양식", "value":"30"}
]};
function ingoAgeCharts(){
	$('#ingoAgeCharts01').highcharts({
        chart: { type: 'column', width:500,height:300},
        colors: ['#ea1e63', '#c2175b'],
        title: { text: ' ' },
        subtitle: { text: ' ' },
        xAxis: {
            categories: [
                '10세이하','10대','20대','30대',
                '40대','50대','60대','70세이상'
            ],
            crosshair: true
        },
        yAxis: {min: 0,title: {text: ''}},
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '강남구',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]

        }, {
            name: '서울특별시',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3]

        }]
    });
}
function spyCharts(id, title){
	$(id).highcharts({ 
        chart: { polar: true, type: 'line', width:256, height:256 },
        colors: ['#fa6969', '#738ef5'],
        title: {
            text: title, useHTML: true,
			style : { color : '#ffffff', "fontSize" : "12px", 'background-color': '#2f4d6a', 'widith':'110px', 
				'textAlign':'center', 'padding':'2px 10px 2px 10px', 'borderRadius':'11px'}
        }, 
        pane: { size: '70%' }, 
        xAxis: {
            categories: ['거주인구', '1인가구', '65세이상인구', '20대인구', '직장인구'],
            tickmarkPlacement: 'on', lineWidth: 0
        }, 
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        }, 
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        }, 
        legend: {
        	enabled : false
        }, 
        series: [{
            name: '강남구',
            data: [43000, 19000, 60000, 35000, 17000],
            pointPlacement: 'on'
        }, {
            name: '서울시평균',
            data: [50000, 39000, 42000, 31000, 26000],
            pointPlacement: 'on'
        }] 
    });
}
function timeAreaCharts(){
	$('#timeAreaCharts01').highcharts({
        chart: { zoomType: 'xy' },
        title: { text: '' },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: ['2004', '2005', '2006', '2007', '2008', '2009',
                '2010', '2011', '2012', '2013', '2014', '2015'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: { enabled : false },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
            	enabled : false 
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
        	enabled : false
        },
        series: [{
            name: '음식점',
            type: 'column',
            yAxis: 1,
            data: [299, 215, 264, 192, 144, 176, 136, 148, 216, 194, 295, 254],
            tooltip: {
                valueSuffix: ' 개'
            }

        }, {
            name: '한식',
            type: 'spline',
            data: [7, 6, 9, 4, 12, 25, 22, 25, 23, 13, 19, 6],
            tooltip: {
                valueSuffix: '개'
            }
        }]
    });
}
function foodAreaCharts(id) {
	$(id).highcharts({
		chart : { 
			type : 'column'
		},
		title : {
			text : ''
		},
		subtitle : {
			text : ''
		},
		xAxis : {
			type : 'category',
			labels : {
				rotation : -45,
				style : {
					fontSize : '11px'
				}
			}
		},
		yAxis : {
			min : 0, title : { text : '' },
			enabled : false,
			labels: {
                enabled: false
            }
		},
		legend : {
			enabled : false
		},
		tooltip : {
			pointFormat : '{point.y:.1f}'
		},
		series : [ {
			name : 'Population',
			data : [ [ '서울', 11 ], [ '경기', 16.1 ], [ '인천', 14.2 ], [ '대전', 14.0 ],
					[ '세종', 12.5 ], [ '대구', 12.1 ], [ '부산', 11.8 ], [ '울산', 11.7 ], 
					[ '광주', 11.1 ], [ '제주', 12.1 ], [ '경북', 12.1 ], [ '경남', 12.1 ]
			, [ '충북', 12.1 ], [ '충남', 12.1 ], [ '전북', 12.1 ], [ '전남', 12.1 ]
			, [ '전국', 12.1 ]],
			dataLabels : {
				enabled : false
			}
		} ]
	});
}
function cateSaupCharts(id, title){
	$(id).highcharts(
	{
		chart : { width :225, height :255, type : 'pie', margin:[40,0,0,0] }, 
		colors: ['#612a8a', '#2980ff', '#ffb000', '#ff6666'],
		title : { text : title,  useHTML: true,
			style : { color : '#ffffff', "fontSize" : "12px", 'background-color': '#2f4d6a', 'widith':'110px', 
				'textAlign':'center', 'padding':'2px 10px 2px 10px', 'borderRadius':'11px'}
		},
		legend: {  enabled: false },
		tooltip : { enabled : false, },
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					distance : -30,
					y:-15,
					format : '{point.percentage:.1f} %<br />{point.name}<br />{point.y} 개',
					style : {
						color : 'white', 
						"fontSize" : "11px"
					}
				}
			},
			series : {
				allowPointSelect : false
			} 
		},
		series : [ {
			name : "Brands", colorByPoint : true,
			data:[{
				name : "음식점",
				y : 500
			},{
				name : "서비스",
				y : 400
			},{
				name : "도소매",
				y : 400
			},{
				name : "숙박",
				y : 400
			}]
		} ]
	}); 
}
function horizontalCharts(id){
	$.each( data.arr, function( i, val ) {  
		var leftValue = parseInt((i*30));
		var style ="left:"+leftValue+"px;background:"+val.color+";";
		var ele = '<a href="javascript:void(0)" data-subj="'+val.name+'" title="'+val.value+'%" data-color='+val.color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.name+'</a>'; 
		$(id).prepend(ele); 
	}); 
	$("a").tooltip({ 
		open: function( event, ui ) {
			$(".ui-tooltip .subj01").text($(this).attr("data-subj"));
		},
		position: {
	        my: "center bottom-40", at: "center top", 
	        using: function( position, feedback ) {
	          $( this ).css( position ).prepend("<span class='subj01'></span>");
	          $( "<div>" )
	            .addClass( "arrow" )
	            .addClass( feedback.vertical )
	            .addClass( feedback.horizontal )
	            .appendTo( this );
	        }
	    } 
	});
}
function barsRotateCharts(id){
	$.each( data.arr, function( i, val ) { 
		var height = ((val.value*0.01)*($(id).height()-20)) /2;
		var bars = parseInt(360/(data.arr.length+1)); 
		
		var topValue = ($(id).height()/2-height);
		var leftValue = parseInt(($(id).width()-bars)/2);
		var marginValue = parseInt((bars)/2*-1);
		var style ="border-radius:"+(bars/2)+"px;top:"+topValue+"px;left:50%;background:"+val.color+";width:"+(bars)+"px;height:"+height+"px;overflow:hidden;-ms-transform:rotate("+(bars*i)+"deg);-webkit-transform:rotate("+(bars*i)+"deg);transform:rotate("+(bars*i)+"deg);position:absolute;margin-left:"+marginValue+"px;transform-origin:50% 90%";
		var ele = '<a href="javascript:void(0)" data-color='+val.color+' data-value='+val.value+' class="bars" style="'+style+'">'+val.name+'</a>'; 
		$(id).prepend(ele); 
	});
	var list = "<ul class='valueList' style='color:"+data.arr[0].color+";'>";
	list += "<li>"+data.arr[0].name+"</li>";
	list += "<li>"+data.arr[0].value+"%</li>";
	list += "<li>"+(data.arr[0].value*33)+"개</li>";
	list += "</ul>";
	$(id).prepend(list);
	$(id).prepend("<div class='barsTit'>"+data.title+"</div>");
	
	$(id+" .bars:eq(0)").css("opacity","1");
	$("body").on("mouseover",id+" .bars",function(){
		$(id).find(".bars").css("opacity",".3");
		$(this).css("opacity","1");
		$(id).find(".valueList li:eq(0)").text($(this).text());
		$(id).find(".valueList li:eq(1)").text($(this).attr("data-value")+"%");
		$(id).find(".valueList li:eq(2)").text(($(this).attr("data-value")*33)+"개");
	});
}
function dssChart(){
	 $('#dssChart01').highcharts({
        chart: { type: 'column' },
        title: { text: '' },
        subtitle: { text: '' },
        xAxis: { type: 'category' },
        yAxis: {
            title: { text: '' } 
        },
        legend: {  enabled: false },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true, format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
                name: "둔산1동",
                y: 56.33 
            }, {
                name: "둔산1동",
                y: 24.03 
            }, {
                name: "둔산1동",
                y: 10.38 
            }, {
                name: "둔산1동",
                y: 4.77 
            }, {
                name: "둔산1동",
                y: 0.91 
            }, {
                name: "둔산1동",
                y: 0.2 
            }] 
        }] 
    });
	
	 $('#dssChart02').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}명',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Rainfall',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: ' mm'
            }

        }, {
            name: 'Temperature',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
                valueSuffix: '°C'
            }
        }]
    });
 
	 $('#dssChart03').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: '대전광역시',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: '서구',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: '둔산2동',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }]
    });
	 
	 
}
function handsonTable02(){
	var container = document.getElementById('basic_handson02'); 
		  var data = function() {
		return Handsontable.helper.createSpreadsheetData(100, 12);
	}; 
	var data = [
		           ["", "Kia", "Nissan", "Toyota", "Honda"],
		           ["2008", 10, 11, 12, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2010", 30, 15, 12, 13]
		         ] 
	var dbHeight = $(".dataSideContents").height()-100;
	var hot = new Handsontable(container, {
		data : data,
		height : dbHeight,
		autoRowSize: {syncLimit: '100%'},
		colHeaders : true,
		rowHeaders : true,
		stretchH : 'all',
		columnSorting : true,
		contextMenu : true
	}); 
}
function handsonTable01(){
	var container = document.getElementById('basic_handson01'); 
		  var data = function() {
		return Handsontable.helper.createSpreadsheetData(100, 12);
	}; 
	var data = [
		           ["", "Kia", "Nissan", "Toyota", "Honda"],
		           ["2008", 10, 11, 12, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2009", 20, 11, 14, 13],
		           ["2010", 30, 15, 12, 13]
		         ] 
	var hot = new Handsontable(container, {
		data : data,
		height : 300,
		colHeaders : true,
		rowHeaders : true,
		stretchH : 'all',
		columnSorting : true,
		contextMenu : true
	});
}

function imAreaSlide() {
	$(".imAreaSlide").slider({
		slide : function(event, ui) {
			$(".imAreaSlide a").each(function(i) {
				$(this).empty().append("<span>" + ui.values[i] + "</span>");
			});
		},
		min : 0,
		max : 1000,
		values : [ 0, 75, 300, 1000 ]
	});
	$(".imAreaSlide a").each(function(i) {
		$(this).empty().append("<span>" + $( ".imAreaSlide" ).slider( "values", i ) + "</span>");
	});
}
function poiLineCharts() {
	$('.poiLineCharts').highcharts({
        chart: {
        	//margin : [ 0, 0, 50, 0 ],
            type: 'line'
        },
        title: {
            text: ''
        }, 
        xAxis: {
            categories: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07', '01-08', '01-09', '01-10', '01-11', '01-12'],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '8px'
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: '승차인원',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '하차인원',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
}
function poiPieCharts() {
	$('.poiPieCharts').highcharts({
        chart: {
        	margin : [ 0, 0, 50, 0 ],
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: "Brands",
            colorByPoint: true,
            data: [{
                name: "여자",
                y: 500
            }, {
                name: "남자",
                y: 400 
            }]
        }]
    });
}
function poiCharts() {
	$('.poiCharts').highcharts({
		chart : {
			type : 'column'
		},
		title: {
            text: ''
        },
        xAxis: {
            categories: ['10대', '20대', '30대', '40대', '50대']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: '여자',
            data: [5, 3, 4, 7, 2]
        }, {
            name: '남자',
            data: [2, 2, 3, 2, 1]
        }]
	});
}
function imAreaCharts() {
	$('.imAreaCharts').highcharts({
		chart : {
			type : 'column'
		},
		title : {
			text : ''
		},
		subtitle : {
			text : ''
		},
		xAxis : {
			type : 'category',
			labels : {
				rotation : -45,
				style : {
					fontSize : '11px'
				}
			}
		},
		yAxis : {
			min : 0,
			title : {
				text : ''
			}
		},
		legend : {
			enabled : false
		},
		tooltip : {
			pointFormat : 'P<b>{point.y:.1f}</b>'
		},
		series : [ {
			name : 'Population',
			data : [ [ '은행', 23.7 ], [ '마트/슈퍼마켓', 16.1 ],
					[ '편의점', 14.2 ], [ '병원/약국', 14.0 ],
					[ '지하철역', 12.5 ], [ '버스정류장', 12.1 ],
					[ '학교', 11.8 ], [ '관공서', 11.7 ], [ '경찰서', 11.1 ] ],
			dataLabels : {
				enabled : false
			}
		} ]
	});
}

function clickAreaCharts(cls, value1, value2) {
	$(cls).highcharts(
					{
						chart : {
							width : 155,
							height : 155,
							type : 'pie',
							margin : [ 0, 0, 0, 0 ]
						},
						legend : {
							enabled : false
						},
						//credits: { position: { x: -10000 } },
						title : {
							text : ''
						},
						tooltip : {
							enabled : true,
							pointFormat : '<b>{point.percentage:.1f}%</b>' //{series.data.name[0]}<br />
						},
						plotOptions : {
							pie : {
								allowPointSelect : true,
								cursor : 'pointer',
								dataLabels : {
									distance : -20,
									minSize : 220,
									format : '<b>{point.name}</b>: {point.percentage:.1f} %',
									style : {
										color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
												|| 'white',
										"textShadow" : "0 0 2px #000",
										"fontSize" : "11px"
									}
								}
							},
							series : {
								allowPointSelect : false
							}
						//파이 선택 막기
						},
						series : [ {
							name : "Brands",
							colorByPoint : true,
							data : [ {
								name : "집계구",
								y : 500
							}, {
								name : "조회값",
								y : 400
							} ]
						} ]
					});
	var chart = $(cls).highcharts();
	chart.series[0].data[0].update({
		y : value1
	});
	chart.series[0].data[1].update({
		y : value2
	});
}

function topAreaCharts() {
	$("#pieChartDiv1").highcharts({
		chart : {
			backgroundColor : "transparent",
			borderWidth : 0,
			margin : [ 0, 0, 0, 0 ],
			height : 200,
			width : 200
		},
		colors : [ '#c95236', '#eeeeee' ],
		navigation : {
			buttonOptions : {
				enabled : false
			}
		},
		tooltip : {
			enabled : false
		},
		title : {
			text : ''
		},
		plotOptions : {
			pie : {
				dataLabels : {
					enabled : true,
					distance : -50,
					style : {
						fontWeight : 'bold',
						color : 'white',
						textShadow : '0px 1px 2px black'
					}
				},
				states : {
					hover : {
						brightness : 0
					}
				},
				startAngle : 0,
				endAngle : 360,
				center : [ '50%', '50%' ],
				borderWidth : 0
			}
		},
		series : [ {
			type : 'pie',
			name : '차상위',
			innerSize : '91%',
			data : [ [ '비율', 76 ], [ '전체', 100 - 76 ] ],
			dataLabels : {
				enabled : true,
				rotation : -45,
				color : '#333333',
				align : 'right',
				x : -4004,
				y : 20,
				style : {
					fontSize : '15px',
					fontWeight : 'normal'
				}
			}
		} ]
	});
	$("#pieChartDiv2").highcharts({
		chart : {
			backgroundColor : "transparent",
			borderWidth : 0,
			margin : [ 0, 0, 0, 0 ],
			height : 160,
			width : 160
		},
		colors : [ '#3677bb', '#eeeeee' ],
		tooltip : {
			enabled : false
		},
		navigation : {
			buttonOptions : {
				enabled : false
			}
		},
		title : {
			text : ''
		},
		plotOptions : {
			pie : {
				dataLabels : {
					enabled : true,
					distance : -50,
					style : {
						fontWeight : 'bold',
						color : 'white',
						textShadow : '0px 1px 2px black'
					}
				},
				states : {
					hover : {
						brightness : 0
					}
				},
				startAngle : 0,
				endAngle : 360,
				center : [ '50%', '50%' ],
				borderWidth : 0
			}
		},
		series : [ {
			type : 'pie',
			name : '상위',
			innerSize : '91%',
			data : [ [ '비율', 56 ], [ '전체', 100 - 56 ] ],
			dataLabels : {
				enabled : true,
				rotation : -45,
				color : '#333333',
				align : 'right',
				x : -4004,
				y : 20,
				style : {
					fontSize : '15px',
					fontWeight : 'normal'
				}
			}
		} ]
	});
	$("#pieChartDiv3").highcharts({
		chart : {
			backgroundColor : "transparent",
			borderWidth : 0,
			margin : [ 0, 0, 0, 0 ],
			height : 120,
			width : 120
		},
		colors : [ '#41b66e', '#eeeeee' ],
		tooltip : {
			enabled : false
		},
		navigation : {
			buttonOptions : {
				enabled : false
			}
		},
		title : {
			text : ''
		},
		plotOptions : {
			pie : {
				dataLabels : {
					enabled : true,
					distance : -70,
					style : {
						fontWeight : 'bold',
						color : 'white',
						textShadow : '0px 1px 2px black'
					}
				},
				states : {
					hover : {
						brightness : 0
					}
				},
				startAngle : 0,
				endAngle : 360,
				center : [ '50%', '50%' ],
				borderWidth : 0
			}
		},
		series : [ {
			type : 'pie',
			name : '해당지역',
			innerSize : '91%',
			data : [ [ '비율', 35 ], [ '전체', 100 - 35 ] ],
			dataLabels : {
				enabled : true,
				rotation : -45,
				color : '#333333',
				align : 'right',
				x : -4004,
				y : 20,
				style : {
					fontSize : '15px',
					fontWeight : 'normal'
				}
			}
		} ]
	});
}

function targetAreaCharts() {
	$('#targetCharts').highcharts(
	{
		chart : { 
			type : 'bar'
		},
		title : {
			text : ''
		},
		subtitle : {
			text : ''
		},
		xAxis : {
			type : 'category',
			labels : { 
				rotation : -45,
				style : {
					fontSize : '12px'
				}
			}
		},
		yAxis : {
			min : 0,
			title : {
				text : ''
			}
		},
		legend : {
			enabled : false
		},
		tooltip : {
			pointFormat : '{point.y:.1f} %'
		},
		series : [ {
			name : '선택업종 현황',
			data : [ [ '한식', 23.7 ], [ '중식', 16.1 ],
					[ '일식', 14.2 ], [ '서양식', 14.0 ],
					[ '기타외국식', 12.5 ], [ '분식', 12.1 ],
					[ '까페', 11.8 ], [ '호프/간이주점', 11.7 ],
					[ '패스트푸드', 11.1 ] ],
			dataLabels : {
				enabled : false,
				rotation : 45,
				color : '#333333',
				align : 'right',
				format : '{point.y:.1f}', // one decimal
				y : 10, // 10 pixels down from the top
				style : {
					fontSize : '11px',
					fontFamily : 'Verdana, sans-serif'
				}
			}
		} ]
	});
}