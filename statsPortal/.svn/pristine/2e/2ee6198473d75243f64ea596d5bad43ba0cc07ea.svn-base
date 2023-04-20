var tooltipArrX = [];
var tooltipArrY = [];
var stopcnt = 0; //20년수정반영
$(function(){
	var body = $("body");
	slideValue(".sliderDefault");  
    scrollWidth(); 
    quickEvent();

    sideEvent(); 

    mapClick();
    
	linkTooltip();
	
	//통계선택에서 증감(left)으로 초기화한다. (sqList아래)
//	$("#leftValue").addClass("on");
//	$("#selectValue").val("leftValue");
	
	//통계선택에서 경계를 초기화한다.
	$("#autoRegion").addClass("on");
	// 2017. 03. 10 개발팀 수정요청
	$("#selectValue").val("rightValue");
	
	//지도유형에서 색상을 초기화한다.
	$("#color").addClass("on");
	
	//caption on/off 에서 off로 초기화한다.
	$("#default_switch").addClass("on");
	
	// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
	$("#top_bottom_off").addClass("on");
	$("#top_bottom_type_both").addClass("on");
	// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
     
    if($('.stepTreeBox').length){
    	$('.stepTreeBox').easytree({
            slidingTime:0, 
            building:treeWidth,
            stateChanged:treeWidth,
            toggled:treeWidth
        }); 
    } 
    if ($(".jumSlide").length){
    	jumSlider();
    }
//    if ($(".heatTable").length){
//    	heatTable();
//    }
    if ($(".popBox").length){
    	popClose();
    }
//    if ($(".goganList").length){ 
//    	lvSelect();
//    	goganConfirm();
//    } 
    if ($(".tabs.only").length){
    	userColorSetting(); 
    }
    if ($(".thematicCharts").length){
//    	thematicCharts(); 
    }
    
//    popEvent();
    $(".normalBox").mCustomScrollbar({axis:"xy"}); 
    $(".scrollBox, .dataSideScroll, .scrolls, .mapResultList, .expendBox").mCustomScrollbar({axis:"xy"});
//  
    //데이터보드를 미리 연다.
    
	Highcharts.setOptions({
		lang: {
			thousandsSep: ','
		}
	});
	//2019-03-19 박길섭 시작
    //데이터보드가 필요없는 주제도 데이터보드 하이드. 프로세스에 따라 데이터보드에 뜨는 DB 호출 시간에 따라 시간초 조정 요망
    setTimeout(function() {
	    if($(".thematicCharts").is(':visible') == false ){//데이터보드에 차트가 보이지 않으면 
	    	$("#dataBoard").hide(); 
	    }else{//데이터보드에 차트가 보이면  
	    	$("#dataBoard").show(); 
	    }
    },700);    
    //2019-03-19 박길섭 끝
    
    $('div.quickBox.step01 > div.bottom > .stepClose').addClass('step01_stepClose'); // 목록 열기_닫기 버튼은 일반 열기_닫기 버튼과 별개로 작동하도록 class를 추가 //200423수정 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(대화형통계지도))
});
function mapClick(){
	var body = $("body");
	body.on("click",".sop-interactive",function(){
		//20년수정반영 시작
		/*
		var rd_juger = $("#rd_juger0").hasClass("on"); // 귀농/귀촌/귀어 인구현황 체크
		//(시계열, 귀농/귀촌/귀어는 안함..)
		if(rd_juger == true){
			$('.dscList1').hide(); 
			$(".yearList li").hide();
			$("#viewDataBoard1").css('display','none');
		}else{
			$('.dscList1').show(); 
			$('.dataSideBox').css('height', '900px');
			$(".yearList li").show();
			$("#viewDataBoard1").css('display','block');
		}
		*/
		//20년수정반영 끝
		var ck = $(".interactiveDataBoard").hasClass("on");
		if(!ck){
			var full = $(".dataSideBox").hasClass("full");
			//20년수정반영 시작
			$(".dataSideBox").stop().animate({"right":"0px"},200);
			if(!full){
				$(".sop-right").stop().animate({"right":"405px"},200);
				$(".interactiveDataBoard").addClass("on").stop().animate({"right":"285px"},200);
			}else{
				$(".sop-right").stop().animate({"right":"405px"},200);
				$(".interactiveDataBoard").addClass("on").stop().animate({"right":"285px"},200);
			}
			//20년수정반영 끝
			
		}
	});
}
function thematicCharts(selectedAdmCd, isFirst){
	//20년수정반영 시작
	if($thematicMapFrame04.ui.mapList[0].chartReload != undefined && !$thematicMapFrame04.ui.mapList[0].chartReload) {
		$thematicMapFrame04.ui.mapList[0].chartReload = true;
		return false;
	}
	//20년수정반영 끝
	$('div.thematicCharts').css('margin-top', '20px');//귀농귀촌귀어 디테일일때 마진값 0을 원복
	//$('.dataSideBox').css('height', '500px');//귀농귀촌귀어 디테일일때 height 을 원복 // 20200417 수정 (주석처리)
	
	// mng_s 20200710 김건민 (데이터보드 이미지 다운로드 추가)
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
		$(".bar div a").attr("title","IE에서는 이미지 다운로드시 기능상 숫자<br>겹침이 발생하므로 크롬을 이용해주시기 바랍니다.");
	}	
	// mng_e 20200710 김건민
	
	var stat_thema_map_id = $thematicMapFrame04.params.stat_thema_map_id;
	if(stat_thema_map_id == 'FlM5JUWj0T20181120214718029IpoBrl4UVw') { /** TODO : stat_thema_map_id */
		var adm_cd = $thematicMapFrame04.ui.mapList[0].tmp_adm_cd;
		var isReset = $thematicMapFrame04.ui.mapList[0].isDataboardReset;
		if(adm_cd != null && adm_cd != '' && adm_cd != '00' && !isReset) {
			$thematicMapFrame04.ui.mapList[0].newChangeRegionBound();
			thematicCharts_new(adm_cd, false, "detail");
		}
		else {
			thematicCharts_new(selectedAdmCd, isFirst, "total");
		}
		return false;
	}
	
	$('.dscList').hide();

	var map = $thematicMapFrame04.ui.mapList[0];
	
	//console.log(map.dataBoardData);
	
	var xAxisCat = [];	//X축 카테고리
	var retDataList = [];	//수치 데이터
	var colorList = [];
	var titleText;		//차트 타이틀
	var labelsVisible = true;	//카테고리 표출 여부
	
	//2017.03.17 데이터보드 이슈 - 그래프 sort문제
	//===========================START==========================//
	if (map.dataBoardData != null) {
		map.dataBoardData = map.dataBoardData.sort(function(a,b){
			return parseInt(a.base_year) - parseInt(b.base_year);
		});
	}
	
	if (isFirst != undefined && selectedAdmCd == "00") {
		if (isFirst) {
			map.dataBoardData.sort(function(a,b){
				return b.left_data_val - a.left_data_val;
			});
		}else {
			map.dataBoardData.sort(function(a,b){
				return b.right_data_val - a.right_data_val;
			});
		}
	}
	//===========================END==========================//
	
	for(var i=0;i<map.dataBoardData.length;i++){
		if(map.dataBoardData[i].adm_cd == selectedAdmCd){
			xAxisCat.push(map.dataBoardData[i].irds_year+'년');
			//'#3BBEE3', '#E91E63'
			
			if(parseFloat(map.dataBoardData[i].chart_value) <0){
				colorList.push("#FFA333");
			}else{
				colorList.push("#3BBEE3");
				
			}
			
			retDataList.push(parseFloat(map.dataBoardData[i].chart_value));			
		}else {
			if (selectedAdmCd == "00") {
				map.dataGeojson.eachLayer(function(layer) {
					if  (map.dataBoardData[i].adm_cd == layer.feature.properties.adm_cd) {
						xAxisCat.push(layer.feature.properties.adm_nm);
					}
				});
				
				var color = "";
				
				
				
				if($("#selectValue").val() == "leftValue" || $("#selectValue").val() == "etcValue"){
					if(parseFloat(map.dataBoardData[i].left_data_val) <0){
						colorList.push("#FFA333");
					}else{
						colorList.push("#3BBEE3");
					}
					retDataList.push(parseFloat(map.dataBoardData[i].left_data_val));
				}else{
					if(parseFloat(map.dataBoardData[i].right_data_val) <0){
						colorList.push("#FFA333");
					}else{
						colorList.push("#3BBEE3");
					}
					retDataList.push(parseFloat(map.dataBoardData[i].right_data_val));
				}
				
			}
		}	
	}
	
	//2017.03.17 데이터보드 수정 - 차트타이틀이 두줄이 될 경우, 전국시도 데이터가 짤리는 현상
	var title = map.left_sep_chart_title;
	if (selectedAdmCd == "00") {
		title = $.trim(title.replace("연도별", ""));
	}
	
	$("#stat_sel > a").each(function() {
		if($(this).hasClass("on")) {
			if($(this).html().indexOf("증감률") != -1) {
				//2017.03.21 그래프 타이틀 이슈
				title = title.replace("수(", "증감률(");
				title = title.split("(")[0];
				title += "(%)";
			}
		}
	});
	//귀농귀촌귀어
	$("#stat_sel > a").each(function() {
		if($(this).hasClass("on")) {
			if($(this).html().indexOf("전체") != -1) title = "시도별 귀농/귀촌/귀어 인구 현황(명)";
			if($(this).html().indexOf("귀농") != -1) title = "시도별 귀농 인구 현황(명)";
			if($(this).html().indexOf("귀촌") != -1) title = "시도별 귀촌 인구 현황(명)";
			if($(this).html().indexOf("귀어") != -1) title = "시도별 귀어 인구 현황(명)";
		}
	});
	
	if(isFirst != undefined && isFirst || selectedAdmCd == "00") {
		
		//2017.03.23 연평균 증감율일 경우, 그래프 텍스트 변경 - 전국 일때만
		if (title.indexOf("증감률") != -1) {
			title = title.replace("증감률", map.left_sep_ttip_title);
		}
		
		var idx = 0;
		$('.thematicCharts').highcharts({
			chart: {zoomType: 'xy', type: 'bar'},
			title: {text: title},
			subtitle: {
				text: ""
			}, //2017.03.21 그래프 타이틀 이슈 - 전국 그래프에서 타이틀 보임
			colors: colorList,
			xAxis: [{
				categories: xAxisCat,
				crosshair: true
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					},
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					enabled: false
				},
				title: {
					text: '', align: 'high',//map.left_sep_chart_title,
				
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
				}
			,
				labels: {
					enabled : false,
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					items:[
						       {
						    	   style:{
						    		   left:'100px',
						    		   top:'200px'
						    	   }
						       }
					       ]
				},
				opposite: true
			}],
			tooltip: {
				//formatter: function () {
				//		fillMinusRect(retDataList);
	             //   },
				shared: true
			},
			legend: {
				enabled : false 
			},
			plotOptions: {
				column: {
					colorByPoint : true,
					//2017.03.09 데이터보드 수정
					//============START==============//
					grouping: false,
					pointPadding: 0,
					dataLabels: {
					allowOverlap: true,
						//inside: true,
						enabled: true,
						//useHTML: true,
						//align: 'high',
						verticalAlign: 'middle',
						formatter: function () {
							return appendCommaToNumber(this.y); //2017.03.23 그래프 텍스트 천단위 콤마
						 }
					}
					//============END==============//
				}   
			},       		        
			series: [{
				name: title, //map.left_sep_chart_title,	//2017.03.17	      
				type: 'column',
	//		            yAxis: 1,
				data: retDataList,
				tooltip: {
					valueSuffix: ''
				}

			}
			]
		}, 
		//2017.03.09 데이터보드 수정
		//2017.03.17 데이터보드 이슈 - 막대옆에 텍스트가 나오도록 수정
		//============START==============//
		function(chart) {
			var prevTranslateY = 0;
			var margin = chart.series[0].xAxis.translationSlope;
			var totalWidth = chart.series[0].xAxis.width;
			$.each(chart.series[0].data, function(i, point) {
				if (point.y < 0) {
					var textWidth = point.dataLabel.width;
					var agent = navigator.userAgent.toLowerCase();
                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
                 		textWidth -= 10;
                 	}
					point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
         			if (point.dataLabel.translateX < -1) {
         				point.dataLabel.translateX = -1;
         			}
				}
				if (i == 0) {
					point.dataLabel.translateY = -point.dataLabel.padding;
					point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
					prevTranslateY = point.dataLabel.translateY;
				}else {
                 	prevTranslateY += margin;
                 	point.dataLabel.translateY = prevTranslateY;
             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
				}
         			
		    });
			
		});
		//============END==============//
		//$("#container").mCustomScrollbar({axis:"y",advanced: { autoExpandHorizontalScroll: true }});
		
		//fillMinusRect(retDataList);

		
		
		
		
	} else {
		var idx = 0;
		$('.thematicCharts').highcharts({
			chart: {zoomType: 'xy'},
			title: {text: title}, //2017.03.17
		 
			subtitle: {text: map.adm_nm},
			colors: [
					 '#3BBEE3', '#E91E63'
			],
			xAxis: [{
				categories: xAxisCat,
				crosshair: true
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					},
					style: {
						color: Highcharts.getOptions().colors[1]
					},
		            overflow: 'justify'

				},
				title: {
					text: '',//map.left_sep_chart_title,
				
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
				}
			,
				labels: {
					enabled : false,
					format: '',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				opposite: true
			}],
			tooltip: {
				//2017.03.17 데이터보드 툴팁정보 수정-추가요구사항
				//==================START=================//
				enable : true,
				shared: true,
				useHtml : true,
				formatter : function( evt){ 
					var isShow = false;
					var etcText = ""; 
					var title = this.points[0].series.name;
					$("#stat_sel > a").each(function() {
						if($(this).hasClass("on")) {
							if($(this).html().indexOf("증감률") != -1) {
								isShow = true;
							}
						}
					});
					
					var html = "";
					html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
					html += "<span>" + title;
					
					if (isShow) {
						var tooltipStr = "";
						for(i=0; i<tooltipArrX.length; i++){
							if(this.x == tooltipArrX[i] ){
								tooltipStr = tooltipArrY[i];
							}
						}
						html += " : " + "<b>" + $(tooltipStr).html() + "<b></span>";
					}else {
						html += " : " + "<b>" + appendCommaToNumber(this.y) + "</b></span>";
					}
					return html;
				}
				//==================END=================//
			},
			legend: {
				enabled : false 
			},
			plotOptions: {
				spline: {
					dataLabels: {
						enabled: true,
						allowOverlap: true
//						allowOverlap: true,
						//mng_s 20171031 leekh 100만자리 이상의 숫자 겹치는 현상 수정
//						useHTML:true,
//						formatter: function () {
//							if(this.y>=1000000){
//								return "<span style='font-size:9px;'>" + appendCommaToNumber(this.y) + "</span>"
//							}else{
//								return "<span style='font-size:11px;'>" + appendCommaToNumber(this.y) + "</span>"
//							}
//						 }
						//mng_e 20171031 leekh 100만자리 이상의 숫자 겹치는 현상 수정
					},
					enableMouseTracking: false
				},
				column: {
					grouping: false,
					pointPadding: 0,
					dataLabels: {
						inside: true,
						enabled: true,
						useHTML: true,
						formatter: function () {
							var isShow = false;
							$("#stat_sel > a").each(function() {
								if($(this).hasClass("on")) {
									if($(this).html().indexOf("증감률") != -1) {
										isShow = true;
									}
								}
							});
							if (isShow) {
								var tempX = this.x;
								if (tempX.indexOf("년") != -1) {
									var html = "<div style='color:#ffffff;font-size:9px;'>"; //2017.03.17 중감률 폰트사이즈 변경
									if (idx == 0) {
										html += "0%";
									}else {
										// 2017. 03. 16 j.h.Seok
										html += ((this.y-this.series.yData[idx-1])/this.series.yData[idx-1]*100).toFixed(2) + "%";
									}
									idx++;
									if (idx == retDataList.length) {
										idx = 0;
									} 
									html += "</div>";
									tooltipArrX[idx] = this.x;
									tooltipArrY[idx] = html;
									return html;
								}
							}
						 }
					}
				}   
			},       		        
			series: [{
				name: title, //2017.03.17,		      
				type: 'column',
	//		            yAxis: 1,
				data: retDataList,
				tooltip: {
					valueSuffix: ''
				},
				//20년수정반영 시작
				point: {
	                events: {
	                    click: function () {
	                    	if($thematicMapFrame04.ui.mapList[0].base_year_list.includes(this.category.replace("년",""))){
		                    	$thematicMapFrame04.ui.mapList[0].isChartClick = true;
		                    	$('select[id=select_base_year]').val(this.category.replace("년",""));
		            			$thematicMapFrame04.ui.mapList[0].isDataboardReset = false;
		            			$thematicMapFrame04.ui.mapList[0].chartReload = false;
		            			$thematicMapFrame04.ui.mapList[0].changeRegionBound();
	                    	}
	                    }
	                }
	            },
	            //20년수정반영 끝

			}
			, {
				name: 'b',
				type: 'spline',
	//		            yAxis: 1,
				data: retDataList,
				tooltip: {
					valueSuffix: ''
				}
			}
			]
		});
	}
}

//20180903 귀농귀촌귀어 데이터 보드 추가
function thematicCharts_new(selectedAdmCd, isFirst, type){

	//$('.dataSideBox').css('height', '800px');
	//$('.thematicCharts').css('height', '460px');
	
	var map = $thematicMapFrame04.ui.mapList[0];
	
	var xAxisCat = [];	//X축 카테고리
	var retLeftDataList = [], retRightDataList = [];	//수치 데이터
	var colorList = [];
	var titleText;		//차트 타이틀
	var labelsVisible = true;	//카테고리 표출 여부
	
	//2017.03.17 데이터보드 이슈 - 그래프 sort문제
	//===========================START==========================//
	if (map.dataBoardData != null) {
		map.dataBoardData = map.dataBoardData.sort(function(a,b){
			return parseInt(a.base_year) - parseInt(b.base_year);
		});
	}
	
	if (isFirst != undefined && selectedAdmCd == "00") {
		map.dataBoardData.sort(function(a,b){
			return b.left_data_val - a.left_data_val;
		});
	}
	//===========================END==========================//
	for(var i=0;i<map.dataBoardData.length;i++){
		if(map.dataBoardData[i].adm_cd == selectedAdmCd){
			xAxisCat.push(map.dataBoardData[i].irds_year+'년');
			retLeftDataList.push(parseFloat(map.dataBoardData[i].chart_value));
			retRightDataList.push(parseFloat(map.dataBoardData[i].chart_value2));
		}else {
			if (selectedAdmCd == "00") {
				map.dataGeojson.eachLayer(function(layer) {
					if  (map.dataBoardData[i].adm_cd == layer.feature.properties.adm_cd) {
						xAxisCat.push(layer.feature.properties.adm_nm);
					}
				});
				retLeftDataList.push(parseFloat(map.dataBoardData[i].left_data_val));
				retRightDataList.push(parseFloat(map.dataBoardData[i].right_data_val));
				
				if(parseFloat(map.dataBoardData[i].left_data_val) <0){
					colorList.push("#FFA333");
				}else{
					colorList.push("#3BBEE3");
				}
			}
		}	
	}
	
	var title = map.left_sep_chart_title;
	$("#stat_sel > a").each(function() {
		if($(this).hasClass("on")) {
			if($(this).html().indexOf("전체") != -1) title = "귀농/귀촌/귀어 인구 현황(명)";
			if($(this).html().indexOf("귀농") != -1) title = "귀농 인구 현황(명)";
			if($(this).html().indexOf("귀촌") != -1) title = "귀촌 인구 현황(명)";
			if($(this).html().indexOf("귀어") != -1) title = "귀어 인구 현황(명)";
		}
	});
	$('.title').text(title);

	if(isFirst != undefined && isFirst || selectedAdmCd == "00") {
		
		$('.dscList').hide();
		
		$('.thematicCharts').highcharts({
			chart: {zoomType: 'xy', type: 'bar'},
			title: {text: title},
			subtitle: {
				text: ""
			},
			colors: colorList,
			xAxis: [{
				categories: xAxisCat,
				crosshair: true
			}],
			yAxis: [{ // Primary yAxis
				labels: {
					formatter: function() {
						return Highcharts.numberFormat(this.value, 0);
					},
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					enabled: false
				},
				title: {
					text: '', align: 'high',//map.left_sep_chart_title,
				
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
				}
			,
				labels: {
					enabled : false,
					format: '',
					style: {
						color: Highcharts.getOptions().colors[1]
					},
					items:[
						       {
						    	   style:{
						    		   left:'100px',
						    		   top:'200px'
						    	   }
						       }
					       ]
				},
				opposite: true
			}],
			tooltip: {
				enable : true,
				shared: true,
				useHtml : true,
				formatter: function (evt) {
					var title = this.x;
					var cnt = appendCommaToNumber(Math.abs(this.y));
					var html = "";
					html += "<span style='font-size:9px;'>" + title + "</span><br/>";
					html += "<span>유입 : " + "<b>" + cnt + "<b></span>";
					
					return html;
				}
			},
			legend: {
				enabled : false 
			},
			plotOptions: {
				column: {
					colorByPoint : true,
					//2017.03.09 데이터보드 수정
					//============START==============//
					grouping: false,
					pointPadding: 0,
					dataLabels: {
						allowOverlap: true,
						//inside: true,
						enabled: true,
						//useHTML: true,
						//align: 'high',
						verticalAlign: 'middle',
						formatter: function () {
							return appendCommaToNumber(this.y); //2017.03.23 그래프 텍스트 천단위 콤마
						 }
					}
					//============END==============//
				}   
			},       		        
			series: [{
				name: title, //map.left_sep_chart_title,	//2017.03.17	      
				type: 'column',
	//		            yAxis: 1,
				data: retLeftDataList,
				tooltip: {
					valueSuffix: ''
				}

			}
			]
		}, 
		//2017.03.09 데이터보드 수정
		//2017.03.17 데이터보드 이슈 - 막대옆에 텍스트가 나오도록 수정
		//============START==============//
		function(chart) {
			var prevTranslateY = 0;
			var margin = chart.series[0].xAxis.translationSlope;
			var totalWidth = chart.series[0].xAxis.width;
			$.each(chart.series[0].data, function(i, point) {
				if (point.y < 0) {
					var textWidth = point.dataLabel.width;
					var agent = navigator.userAgent.toLowerCase();
                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
                 		textWidth -= 10;
                 	}
					point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
         			if (point.dataLabel.translateX < -1) {
         				point.dataLabel.translateX = -1;
         			}
				}
				if (i == 0) {
					point.dataLabel.translateY = -point.dataLabel.padding;
					point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
					prevTranslateY = point.dataLabel.translateY;
				}else {
                 	prevTranslateY += margin;
                 	point.dataLabel.translateY = prevTranslateY;
             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
				}
         			
		    });
			
		});
		
	} else {
		$('.dataSideBox').css('height', '680px');//200423수정(시계열취소)
		//$('.dataSideBox').css('height', '900px'); //200423수정(시계열취소)
		$('div.thematicCharts').css('margin-top', '0px');
		
		$('.dscList').show();
		$('.area-tit').find('span').text(map.tmp_adm_nm);
		
		$("#yearTabs > a").each(function() {
			$(this).removeClass('on');
			if($(this).html().indexOf(map.dataBoardData[0].base_year) != -1) {
				$(this).addClass('on');
			}
		});
		$('.title').text(title);
		
		if(type == 'total') {
			$("#detailTabs > a").each(function(i) {
				$(this).removeClass('on');
				if(i == 0) {
					$(this).addClass('on');
				}
			});
			
			var idx = 0;
			$('.thematicCharts').highcharts({
				chart: {zoomType: 'xy'},
				title: {text: ''}, //2017.03.17
			 
				subtitle: {text: ''},
				colors: [
						 '#3BBEE3', '#E91E63'
				],
				xAxis: [{
					categories: xAxisCat,
					crosshair: true
				}],
				yAxis: { // Primary yAxis
					labels: {
						formatter: function() {
							return Highcharts.numberFormat(this.value, 0);
						},
						style: {
							color: Highcharts.getOptions().colors[1]
						},
			            overflow: 'justify'

					},
					title: {
						text: '',//map.left_sep_chart_title,
					
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					}
				},
				tooltip: {
					//2017.03.17 데이터보드 툴팁정보 수정-추가요구사항
					//==================START=================//
					enable : true,
					shared: true,
					useHtml : true,
					formatter : function( evt){ 
						var isShow = true;
						var etcText = ""; 
						var title1 = this.points[0].series.name;
						var title2 = this.points[1].series.name;
						var html = "";
						html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
						html += "<span>" + title1 + " : " + "<b>" + appendCommaToNumber(this.points[0].y) + "</b></span><br/>";
						html += "<span>" + title2 + " : " + "<b>" + appendCommaToNumber(this.points[1].y) + "</b></span>";

						return html;
					}
					//==================END=================//
				},
				legend: {
					enabled : true,
					align: 'right',
					backgroundColor: 'white',
					borderColor: '#CCC',
					borderWidth: 1,
					verticalAlign: 'top'
				},
				plotOptions: {
					series: {
			            borderWidth: 0,
			            dataLabels: {
			                enabled: true,
			                allowOverlap: true,
			                formatter : function() {
			                	return appendCommaToNumber(this.y) + '명';
			                }
			            }
			        }
				},       		        
				series: [{
					name: '유입', //2017.03.17,		      
					type: 'column',
					data: retLeftDataList,
					tooltip: {
						valueSuffix: ''
					}
				},{
					name: '유출', //2017.03.17,		      
					type: 'column',
					data: retRightDataList,
					tooltip: {
						valueSuffix: ''
					}
				}]
			});
		}
		else if(type == 'detail') {
			xAxisCat = [];
			retLeftDataList = [];
			retRightDataList = [];
			
			$('.title').text(map.dataBoardData[0].base_year + '년 ' + title);
			map.dataBoardData = map.dataBoardData.sort(function(a, b){
				return parseInt(a.bf_adm_cd) - parseInt(b.bf_adm_cd);
			});
			for(var i = 0; i < map.dataBoardData.length; i++) {
				xAxisCat.push(map.dataBoardData[i].bf_adm_nm);
				if(map.dataBoardData[i].left_value != undefined){
					retLeftDataList.push(parseFloat(map.dataBoardData[i].left_value));
				}else{
					retLeftDataList.push(0);
				}
				if(map.dataBoardData[i].right_value != undefined){
					retRightDataList.push(parseFloat(map.dataBoardData[i].right_value));
				}else{
					retRightDataList.push(0);
				}
				
			}
			//Element 변경
			$('.thematicCharts').html('');
			var newElement = '';
			newElement += '<dl class="dscList">';
			newElement += '<dd>';
			newElement += '<div class="chartAreaRela">';
			newElement += '<div class="carLeft">';
			newElement += '<div class="chartSize03" id="barCharts01"></div>';
			newElement += '</div>';
			newElement += '<ul class="carLabel"></ul>';
			newElement += '<div class="carRight">';
			newElement += '<div class="chartSize03" id="barCharts02"></div>'; 
			newElement += '</div>';
			newElement += '</div>';
			newElement += '</dd>';
			newElement += '</dl>';
			$('.thematicCharts').html(newElement);
			
			
			$("#detailTabs > a").each(function(i) {
				$(this).removeClass('on');
				if(i == 1) {
					$(this).addClass('on');
				}
			});
			
			//$('.carLabel')
			var liEl = "";
			for(var z = 0; z < xAxisCat.length; z++) {
				var sido = xAxisCat[z];
				liEl += "<li>" + sido.replace('특별시', '').replace('광역시', '').replace('특별자치시', '').replace('특별자치도', '') + "</li>";
			}
			$('.carLabel').html(liEl);
			
			var idx = 0;
			$('#barCharts01').highcharts({
				chart: {
		            type: 'bar', width:150, height:360, marginLeft:0
		        },
		        colors: ['#E91E63', '#E91E63'],//E91E63
		        tooltip: {
					enable : true,
					shared: true,
					useHtml : true,
					formatter: function (evt) {
						var title = this.x;
						var name = this.points[0].series.name;//유입
						var cnt = appendCommaToNumber(Math.abs(this.points[0].y));
						
						var html = "";
						html += "<span style='font-size:9px;'>" + title + "</span><br/>";
						html += "<span>" + name + " : " + "<b>" + cnt + "<b></span>";
						
						return html;
					}
				},
		        title: { text: '' },
		        subtitle: { text: '' },
		        xAxis:{
		        	gridLineWidth:0,
		        	categories: xAxisCat,
		            title: { text: null },
		            labels: { enabled: false },
		            reversed: true
		        },
		        yAxis:[ 
			        {  
			        	gridLineWidth:1,
			        	min: 0, title: { text: ''},
			        	labels: {
			            	overflow: 'justify',
			            	formatter: function () {
			            		if(this.value > 0) return Math.abs(this.value/1000) + '천명';
								else return this.value;
							}
			            },
			            reversed: true  
			        },
			        {
			        	gridLineWidth:1,
			        	min: 0, title: { text: ''},
			        	labels: {
			            	overflow: 'justify',
			            	y:0,
			            	formatter: function () {
			            		if(this.value > 0) return Math.abs(this.value/1000) + '천명';
								else return this.value;
							}
			            },
			            reversed: true, 
			        	opposite: true 
			        }		 
		        ], 
		        plotOptions: {
		        	bar: {
						dataLabels: {
							enabled: true,
							allowOverlap: true,
							style: {
								fontSize: '9px'
							}
						}
					}
		        },
		        legend: {
					enabled : true,
					align: 'right',
					backgroundColor: 'white',
					borderColor: '#CCC',
					borderWidth: 1,
					verticalAlign: 'top'
				},
		        credits: {  enabled: false },
		        series: [{
		        	pointWidth: 15,
		            name: '유출',
		            data: retRightDataList
		        }]
		    },
		    function(chart) {
				var prevTranslateY = 0;
				var margin = chart.series[0].xAxis.translationSlope;
				var totalWidth = chart.series[0].xAxis.width;
				$.each(chart.series[0].data, function(i, point) {
					if (point.y < 0) {
						var textWidth = point.dataLabel.width;
						var agent = navigator.userAgent.toLowerCase();
	                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	                 		textWidth -= 10;
	                 	}
						point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
	         			if (point.dataLabel.translateX < -1) {
	         				point.dataLabel.translateX = -1;
	         			}
					}
					if (i == 0) {
						point.dataLabel.translateY = -point.dataLabel.padding;
						point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
						prevTranslateY = point.dataLabel.translateY;
					}else {
	                 	prevTranslateY += margin;
	                 	point.dataLabel.translateY = prevTranslateY;
	             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
					}
	         			
			    });
				
			});
			$('#barCharts02').highcharts({
		        chart: {
		            type: 'bar', width:150, height:360, marginLeft:2 //, margin:[0,0,0,100]
		        },
		        colors: ['#3BBEE3', '#3BBEE3'],
		        tooltip: {
					enable : true,
					shared: true,
					useHtml : true,
					formatter: function (evt) {
						var title = this.x;
						var name = this.points[0].series.name;//유입
						var cnt = appendCommaToNumber(Math.abs(this.points[0].y));
						
						var html = "";
						html += "<span style='font-size:9px;'>" + title + "</span><br/>";
						html += "<span>" + name + " : " + "<b>" + cnt + "<b></span>";
						
						return html;
					}
				},
		        title: { text: '' },
		        subtitle: { text: '' },
		        xAxis: {
		        	gridLineWidth:0,
		        	lineWidth:0,
		        	categories: xAxisCat,
		            title: { text:'', align: 'center' },
		            labels: {
		                align: 'center', x: -60
		            }
		        },
		        yAxis:[ 
			        {  
			        	gridLineWidth:1, 
			        	min: 0, title: { text: ''},
			            labels: {
			            	overflow: 'justify',
							formatter: function () {
								if(this.value > 0) return Math.abs(this.value/1000) + '천명';
								else return this.value;
							}
						}
			        },
			        {
			        	gridLineWidth:1, 
			        	min: 0, title: { text: ''},
			            labels: {
			            	overflow: 'justify',
			            	y:0,
			            	formatter: function () {
			            		if(this.value > 0) return Math.abs(this.value/1000) + '천명';
								else return this.value;
							}
			            },
			        	opposite: true 
			        }		 
		        ],
		        plotOptions: {
		        	bar: {
						dataLabels: {
							enabled: true,
							allowOverlap: true,
							style: {
								fontSize: '9px'
							}
						}
					}
		        },
		        legend: {
					enabled : true,
					align: 'left',
					backgroundColor: 'white',
					borderColor: '#CCC',
					borderWidth: 1,
					verticalAlign: 'top'
				},
		        credits: {  enabled: false },
		        series: [
			        {
			        	pointWidth: 15,
			            name: '유입',
			            data: retLeftDataList
			        }
		        ]
		    },
		    function(chart) {
				var prevTranslateY = 0;
				var margin = chart.series[0].xAxis.translationSlope;
				var totalWidth = chart.series[0].xAxis.width;
				$.each(chart.series[0].data, function(i, point) {
					if (point.y < 0) {
						var textWidth = point.dataLabel.width;
						var agent = navigator.userAgent.toLowerCase();
	                 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
	                 		textWidth -= 10;
	                 	}
						point.dataLabel.translateX = ((totalWidth - point.shapeArgs.y) - point.shapeArgs.height) - textWidth;
	         			if (point.dataLabel.translateX < -1) {
	         				point.dataLabel.translateX = -1;
	         			}
					}
					if (i == 0) {
						point.dataLabel.translateY = -point.dataLabel.padding;
						point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
						prevTranslateY = point.dataLabel.translateY;
					}else {
	                 	prevTranslateY += margin;
	                 	point.dataLabel.translateY = prevTranslateY;
	             		point.dataLabel.translate(point.dataLabel.translateX, point.dataLabel.translateY);
					}
	         			
			    });
				
			});
		}
	}
}


function fillMinusRect(retDataList){
	for(i=0; i<retDataList.length; i++){
		if(retDataList[i] <= 0){
			$("rect:eq(" + (i+2) +")").attr("fill", "red");
		}
	}
}


function slideValue01(from, to, slider, etc){
    var domFrom = "#"+from;
    var domTo = "#"+to;
    var domSlider = slider;
	for (var i=1; i<=301; i++) {
        var tmpText = i + etc;
        if (i == 301) {
            tmpText = "300+"
        } 
        $(domFrom).append($("<option>", { 
            value: i,
            text : tmpText
        }));
        $(domTo).append($("<option>", { 
            value: i,
            text : tmpText
        }));
    }
    $(domFrom).val("60");
    $("."+from).text("약 "+(60/3.3).toFixed(1)+"평");
    $(domTo).val("85");
    $("."+to).text("약 "+(85/3.3).toFixed(1)+"평");
    $(domFrom).change(function(){
        var spaceTo = $(domTo).val();
        if (parseInt($(this).val()) > parseInt(spaceTo)) {
            $(this).val(spaceTo);
        }
        $(domSlider).slider("values", 0, $(this).val());
        $("."+from).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
        
    });
    $(domTo).change(function(){
        var spaceFrom = $(domFrom).val();
        if (parseInt($(this).val()) < parseInt(spaceFrom)) {
            $(this).val(spaceFrom);
        }
        $(domSlider).slider("values", 1,  $(this).val());
        $("."+to).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
    });
    $(domSlider).slider({
        range: true,
        min: 1,
        max: 300,
        values : [60, 85],
        slide : function(e, ui) {
            $(domFrom).val(ui.values[0]);
            $(domTo).val(ui.values[1]);	
            $("."+from).text("약 "+(ui.values[0]/3.3).toFixed(1)+"평");
            $("."+to).text("약 "+(ui.values[1]/3.3).toFixed(1)+"평");
        }
    });
}
 
function popEvent(){
	$("body").on("click",".hangjungArea .resizeIcon",function(){
		var cls = $(".hangjungArea");
		var ck = cls.hasClass("on");
		if(!ck){
			cls.addClass("on");
		}else{
			cls.removeClass("on");
		}
	});
}
function popClose(){
	$("body").on("click",".topbar>a, .hanClose",function(){
		$(this).parents(".popBox").eq(0).hide();
		var id = $(this).parents(".popBox").eq(0).attr("id");
		if(id=="guganSettingLayer"){
			$(".legendPopEvent").eq(0).removeClass("on");
			$(".JCLRgrips").remove();
			goganListResize(); 
		}else if(id=="colorSettingLayer"){
			$(".legendPopEvent").eq(1).removeClass("on");
		}
	});
}
//function userColorSetting(){
//	$("body").on("click",".tabs .btnStyle01",function(){
//		$(this).parents(".tabs").eq(0).find(".btnStyle01").removeClass("on");
//		$(this).addClass("on");
//	});
//	$("body").on("click",".tabs.only>a",function(){
//		$("#colorSetting").hide();
//		$(".colorSettingList01").css({"width":"380px"});
//		$(".colorbarBox>a").css("top","-5000px");
//		var inx = $(this).index(".tabs.only>a");
//		if(inx==0){
//			$("#colorSetting").show();
//			legendColor("#666", "#890e4f", ".colorSettingList01", 10);
//		}else if(inx==1){
//			legendColor("#ff1b00", "#048cfc", ".colorSettingList01", 10);
//		}else{
//			$(".colorbarBox>a").css("top","5px");
//			$(".colorSettingList01").css({"width":"300px"});
//			legendColor("#193b70", "#00b051", ".colorSettingList01", 10);
//		}
//	});
//	$('.colorbarBox>a').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
//	 
//	$('body').on('click', ".legendPopEvent", function(){
//		var ck = $("#typeArea").attr("class");
//		if(ck == "jum"){
//			$("#jumSettingLayer").show(); 
//		}else{
//			var id = $(this).attr("data-id"); 
//			$("#"+id).show(); 
//			if(id=="guganSettingLayer"){
//				goganListResize();
//			}
//		}
//		
//	});
//	
//	$('body').on('click', ".markerLib ul li a", function(){
//		$(".markerLib ul li a").removeClass("on");
//		$(this).addClass("on");
//	});
//	$('body').on('click', "#markerPopup", function(){
//		$("#markerLibLayer").show(); 
//	});
//	$('body').on('click', ".markerList li a", function(){
//		$(".markerList li a").removeClass("on");
//		$(this).addClass("on");
//		$(".jumMarkerLink").empty().html($(this).html());
//	});
//	$('body').on('click', ".opacityBox .colorck li a", function(){ 
//		$(".jumColorLink").css("background",$(this).text());
//	});
//	
//	$('.jumColorLink').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
//	$('body').on('change sliderup sliderdown slidermove', ".jumColorLink", function(){
//		$(".opacityBox .colorck li a.on").css("background",$(this).val()).text($(this).val()); 
//	});
//	$('body').on('change', "#opacitySel01", function(){
//		var val = $(this).val(); 
//		$("#colorSetting01").css("opacity", val);  
//	});
//	
//	$('body').on('change', "#opacitySel", function(){
//		var val = $(this).val(); 
//		$("#colorSetting").css("opacity", val);  
//	});
//	
//	
//	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fl", function(){
//		var colorEnd = $(".colorbarBox>.fr").text();
//		$(".colorbarBox>.fl").text($(this).val());
//		legendColor(colorEnd, $(this).val(), ".colorSettingList01", 10);
//	});
//	$('body').on('change sliderup sliderdown slidermove', ".colorbarBox>.fr", function(){
//		var colorStart = $(".colorbarBox>.fl").text();
//		$(".colorbarBox>.fr").text($(this).val());
//		legendColor($(this).val(), colorStart, ".colorSettingList01", 10);
//	});
//} 
//function heatTable(){
//	$('.heatTable').wheelColorPicker({
//		layout: 'block',
//		format: 'css'
//	}); 
//	$('.heatTable').on('slidermove', function() {
//		$('#color-label').text($(this).val());
//	}); 
//}
//function jumSlider(){
//	$(".jumSlide").slider({
//    	range: false, 
//		min : 0,
//		max : 10,
//		values : [10],
//        slide : function(e, ui) { //ui.values[0]
//        	$("#typeArea .colorck>li>a").css({"width":parseInt(ui.values[0]+7)+"px",
//        		"height":parseInt(ui.values[0]+7)+"px",
//        		"margin-top":parseInt(10-ui.values[0])+"px"}); 
//        }
//	});
//} 
//function dragAppend(selector, bgColor){ 
//	$(selector).css("background-color", bgColor);
//	$(selector).append("<span class='mask'></span><span class='color'></span>");  
//} 
//function colorck(){ 
//	$(".colorck li").each(function(i){ 
//		var selector = $(this).children("a");
//		selector.css("background",selector.text());
//	});
//	$("body").on("click",".colorck li>a",function(){
//		$(this).parents(".colorck").eq(0).find("a").removeClass("on");
//		$(this).addClass("on");
//		var id = $(this).parents(".colorck").eq(0).attr("id");
//		var color = $(this).text();
//		var listLegnth = $(".lvSelect").val(); 
//		if(id=="colorSetting"){
//			legendColor("#ccc", color, ".colorSettingList01", listLegnth);
//		}else if(id=="legendColor"){
//			legendColor("#ccc", color, ".colorbar", listLegnth);
//			resizeColor("#ccc", color, ".goganList tr", listLegnth);
//		} 
//		$(".JCLRgrips").remove();
//		goganListResize();
//		 
//	}); 
//}
//var onSampleResized = function(e){ // 범례구간설정 구간리사이즈 드래그할때 value 값 호출 
//	var columns = $(e.currentTarget).find("td");
//	var msg="";
//	columns.each(function(i){ msg += "td("+i+ "):"+ parseInt($(this).width()*0.267) + " / "; })
//	alert(msg);
//	//$(".goganListValue").html(msg);
//	
//};	
//var goganListResize = function(){ // 범례구간설정 구간리사이즈 플러그인 호출
//	$(".goganList").colResizable({
//		liveDrag:true, 
//		gripInnerHtml:"<div class='grip'></div>", 
//		draggingClass:"dragging", 
//		partialRefresh:true,
//		onResize:onSampleResized
//	}); 
//}
// 
//function goganConfirm(){  // 범례구간설정 적용버튼
//	$("body").on("click","#goganEvent", function(){
//		var lv = $(".popBox .lvSelect").val();  
//		var color = $(".colorck li>a.on").css("background-color");
//		legendColor("#ccc", color, ".colorbar", lv);
//	});
//}
//function lvSelect(){ // 범례구간설정 셀렉트 체인지 이벤트
//	$("body").on("change",".popBox .lvSelect",function(){
//		var lv = $(this).val();
//		var color = $(".colorck li>a.on").css("background-color");
//		resizeColor("#ccc", color, ".goganList tr", lv); 
//		$(".JCLRgrips").remove();
//		goganListResize();
//		
//	}); 
//}
//function resizeColor(c01, c02, cls, max){  // 범례구간설정 색지정
//	var arrColor = new Array();
//	var paramColor1 = c01;
//	var paramColor2 = c02;
//	
//	for ( var i = 0; i < max; i++) {
//		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
//		arrColor.push(paramColor);
//	} 
//	$(cls).empty();
//	for ( var i = 0; i < arrColor.length; i++) { 
//		$(cls).prepend("<td style='background:" + arrColor[i] + ";'></td>");	
//	}
//}
//function legendColor(c01, c02, cls, max){
//	var arrColor = new Array();
//	var paramColor1 = c01;
//	var paramColor2 = c02;
//	
//	for ( var i = 0; i < max; i++) {
//		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
//		arrColor.push(paramColor);
//	} 
//	$(cls).empty();
//	for ( var i = 0; i < arrColor.length; i++) {
//		var txt = i+1;
//		if(txt<10){
//			txt = "0"+txt;
//		}
//		$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");	
//	}
//	if($("#typeArea").attr("class")=="color"){
//		var liHeight = parseInt(220/max); 
//		$(cls+" li").css("height",liHeight+"px");
//		$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*max))+"px");
//	}
//	
//}
function linkTooltip(){
	$("a, .step-option.group label").tooltip({//박길섭수정 
		content: function () {
            return $(this).prop('title');
        },
		open: function( event, ui ) {
			$(".ui-tooltip .subj").text($(this).attr("data-subj"));
		},
		position: {
			my: "left+10 top", at: "right top",
	        using: function( position, feedback ) {
	        	if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
		    		$( this ).css( position ).prepend("<span class='subj'></span>");
		    	}else {
		    		$( this ).css( position ); 
		    	}
	        	$( "<div>" )
	            	//.addClass( "arrow" )
	            	.addClass( feedback.vertical )
	            	.addClass( feedback.horizontal )
	            	.appendTo( this );
	        }
	    } 
	});
}
function slideValue(selector){ 
    $(selector).slider({ 
        min: 1,
        max: 3,
        values : [1]
    });
}
function slideValue02(selector){ 
    $(selector).slider({ 
        range:true,
    	min: 1,
        max: 10,
        values : [1,3]
    });
}
function stepCloseAnimate(inx){
	$(".quickBox .bottom > a.stepClose").removeClass("on");//20년수정반영
	$(".sideQuick.xw").css("left","0px");//박길섭추가
	$(".sqListBox.sq03").css("left","0px");//박길섭추가
    var time = 300;
    var fx = '.quickBox'; 
    var btn = '.sideQuick.sq02';
    $(".sideQuick.sq02").removeClass("on");//박길섭추가
    $(fx).queue("step02", function(){ 
        $(btn).stop().animate({"left":"0"},time);
        $(fx+'.step02').animate({"left":"-279px"}, time);//20년수정반영
        $(".nav-sidebar").stop().animate({"left":"-200px"},200); 
    }); 
    $(fx).queue("step01", function(){
    	$(fx+'.step02').css({"left":"-279px"});//20년수정반영
        $(btn).stop().animate({"left":"0"},time).removeClass("on");
        $(fx+'.step01').animate({"left":"-280px"}, time);   
        $(btn).find("span").show();
//        $(btn).css("width","90px");
        $(".shadow").hide();
    }); 
    $(fx).dequeue("step0"+inx);  
}
function scrollWidth(){
    var defaultSize = 0;
    $(".xWidth li").each(function(i){
        var bigSize = $(this).find("label").width();  
        if(defaultSize<bigSize){
            defaultSize = bigSize;
            $(".xWidth").css("width",parseInt(defaultSize+80)+"px");
        }
    }); 
}
function treeWidth(){ 
    $(".stepTreeBox").css("width","230px"); 
    var stepWidth = $(".stepTreeBox>ul").prop("scrollWidth"); 
    $(".stepTreeBox").css({"width":parseInt(stepWidth)+"px"});  
    $(".normalBox").mCustomScrollbar("update");
//}
//function legendEvent(){
//	var body = $("body"); 
//	body.on("click",".lgTypeList li a", function(){
//		var cls = $(this).attr("data-type");
//		$("#typeArea").removeClass().addClass(cls);
//		var lv = $(".popBox .lvSelect").val();  
//		var color = $(".colorck li>a.on").css("background-color");
//		legendColor("#ccc", color, ".colorbar", lv);
//	});
//	body.on("click",".btn_legendSetting", function(){
//		var on = $(this).hasClass("on");
//		if(!on){
//			$(".lgListBox").stop().animate({"left":"220px"},200);
//			$(this).addClass("on");
//		}else{
//			$(".lgListBox").stop().animate({"left":"-550px"},200);
//			$(this).removeClass("on");
//		}
//	});
//	var settingList = ".lgListBox>li>a";
//	body.on("click", settingList, function(){
//		var on = $(this).hasClass("on");
//		if(!on){
//			$(this).siblings("ul").show();
//			$(this).addClass("on");
//		}else{
//			$(this).siblings("ul").hide();
//			$(this).removeClass("on");
//		}
//	});
//	var optionList = ".lgListBox>li>ul>li>a";
//	body.on("click", optionList, function(){ 
//		var html = $(this).html();
//		$(this).parents("ul").eq(0).siblings("a").empty().html(html).removeClass("on");
//		$(this).parents("ul").eq(0).hide();
//	});
//	body.on("click", ".btn_legend", function(){ 
//		var legendBox = $(".legendBox");
//		var ing = legendBox.attr("data-ing");
//		legendBox.removeClass(ing); 
//		$(".btn_legendSetting").removeClass("on");
//		$(".lgListBox").stop().animate({"left":"-550px"},200);
//		if(ing=="hide"){  
//			legendBox.attr("data-ing", "min");
//			legendBox.addClass("min");
//		}else if(ing=="min"){ 
//			legendBox.attr("data-ing", "max");
//			legendBox.addClass("max");
//		}else if(ing=="max"){
//			legendBox.attr("data-ing", "hide");
//			legendBox.addClass("hide");
//		}
//		
//	});
	
}
function sideEvent(){
	var body = $("body");
	body.on("click",".dscList dt>a",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");
			$(this).parents("dt").next("dd").show();
		}else{
			$(this).removeClass("on");
			$(this).parents("dt").next("dd").hide();
		} 
	});
	//20년수정반영 시작
	body.on("click",".dscList1 dt>a",function(){
		var ck = $(this).hasClass("on");
		if(!ck){
			$(".yearList li").show();
			$(this).addClass("on");
			$(this).parents("dt").next("dd").show();
		}else{
			$(".yearList li").hide();
			$(this).removeClass("on");
			$(this).parents("dt").next("dd").hide();
		} 
	});
		$('#tableTimeSeries').on("click","li>div",function(){
	    var index = $(this).parent("li").index();
	    $('#select_base_year').find('option:eq('+index+')').prop("selected", true);
	    //20200414 수정시작
	    //$(this).parent("ul").find("li[class='on']").removeClass("on");
	    //$(this).parent("li").eq(index).addClass("on");
	    $("#tableTimeSeries li").removeClass("on");
	    $(this).parent("li").addClass("on");
		//20200414 수정 끝
	    //$('.dataSideBox').css('height', '900px');    200423수정
	    
	    $thematicMapFrame04.ui.mapList[0].isChartClick = true;
		$thematicMapFrame04.ui.mapList[0].isDataboardReset = true;
        $thematicMapFrame04.ui.mapList[0].chartReload = true;
        //$thematicMapFrame05.ui.mapList[0].changeRegionBound();
	    
	    $('#select_base_year').trigger("change");
	});
	
	//시계열 플레이/스탑 버튼
	body.on("click", ".btn_clockTypePlay", function() {
		var ckyear = $(".yearList > li").length;
		var cnt = 0;
		
		if($(this).text() == "play") {
			$(this).text("stop");
			$(this).css("background-image", "url(/img/ico/ico_dbStop.png)");
			$(".btn_clockTypeLegend").hide();
			$(".btn_clockTypeOk").hide();
			$(".yearList").find("li > input").css({"display" : 'none'});
			
			// 시계열 플레이시작.
			if(stopcnt != 0){
				cnt = stopcnt;
			}
			
			//지역경계에 따라 delaytime 변경
			var delaytime = 0;
			if($("#selectValue2").val()=="auto"){
				delaytime = 15000;
			}else if ($("#selectValue2").val()=="1"){
				delaytime = 15000;
			}else if ($("#selectValue2").val()=="2"){
				delaytime = 30000;
			}else if ($("#sele" + "" + "ctValue2").val()=="3"){	
				delaytime = 80000;
			}
			
			var arr = [];
			$(".yearList").find("li").find("input[type='checkbox']:checked").each(function(index , elem){
				arr.push({index : $(elem).parent("li").index() , year : $(elem).val()});
			})
				
			var timer = setInterval(function() {
				if(cnt >= arr.length){
					cnt = 0;
				}
					
				$(".yearList").find("li").removeClass("on");
				$(".yearList").find("li:eq("+arr[cnt].index+")").addClass("on");
				$("#select_base_year").find("option:eq("+arr[cnt].index+")").prop("selected", true);

				$thematicMapFrame04.ui.mapList[0].isChartClick = true;
				$thematicMapFrame04.ui.mapList[0].isDataboardReset = false;
		        $thematicMapFrame04.ui.mapList[0].chartReload = false;
		        $thematicMapFrame04.ui.mapList[0].changeRegionBound();
				cnt++;
			}, delaytime);
			
			//정지버튼 이벤트
			$(".btn_clockTypePlay").click(function(){
				stopcnt = arr[cnt].index;
				clearInterval(timer);
			});
			
		} else {
			$(".yearList > li").removeClass("on");
			
			//$('.dataSideBox').css('height', '900px'); 200423수정
			$(this).text("play");
			$(this).css("background-image", "url(/img/ico/ico_dbPlay.png)");
			
			//정지시 해당년도...
			$(".yearList").find("li:eq("+(stopcnt-1)+")").addClass("on");
			
			$thematicMapFrame04.ui.mapList[0].isChartClick = true;
			$thematicMapFrame04.ui.mapList[0].isDataboardReset = false;
			$thematicMapFrame04.ui.mapList[0].chartReload = false;
		}
	});
	
	body.on("click", ".btn_clockTypeSetting", function(){
		var ck = $(".btn_clockTypeSetting").hasClass("on");
		console.log(ck);
		if(!ck){
			$(".btn_clockTypeLegend").hide();
			$(".btn_clockTypeOk").hide();
			$(".yearList").find("li > input").css({"display" : 'none'});
			$(this).addClass("on");
		}else{
			$(".btn_clockTypeLegend").show();
			$(".btn_clockTypeOk").show();
			$(".yearList").find("li").show();
			$(".yearList").find("li > input").css({"display" : 'inline-block'});
			$(this).removeClass("on");
		} 
	});
	//20년수정반영 끝
	body.on("click",".dataSideBox .bar>a",function(){ 
		$(".dataSideBox").stop().animate({"right":"-1500px"},200);
		$(".interactiveDataBoard").removeClass("on").stop().animate({"right":"0"},200);
	});
	body.on("click",".interactiveDataBoard",function(){ 
		var ck = $(this).hasClass("on");
		if(!ck){
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({"right":"0px"},200);//20년수정반영
			if(!full){
				$(".sop-right").stop().animate({"right":"405px"},200);//20년수정반영
				$(this).addClass("on").stop().animate({"right":"285px"},200);//20년수정반영
			}else{
				$(".sop-right").stop().animate({"right":"405px"},200);//20년수정반영
				$(this).addClass("on").stop().animate({"right":"285px"},200);//20년수정반영
			}
			
		}else{
			$(".sop-right").stop().animate({"right":"0px"},200);//20년수정반영
			$(".dataSideBox").stop().animate({"right":"-1500px"},200);//20년수정반영
			$(this).removeClass("on").stop().animate({"right":"0"},200);
		} 
	});
	$("#dataSlider").slider({
    	range: "min",
        min: 5,
        max: 10,
        value: 10,
        slide: function( event, ui ) {  //ui.value
        	//$(".interactiveSelect").text(ui.value*0.1);
        	$(".dataSideBox, .interactiveDataBoard").css("opacity", ui.value*0.1);
	    }
    });
	$(".dataSideBox, .interactiveDataBoard").css( "opacity", $("#dataSlider").slider( "value" ) );
	
	
}
function quickEvent(){
	var body = $("body");
	body.on("click",".list_btn",function(){
		stepCloseAnimate(2);
		$(".step01").stop().animate({"left":"0px"},200);
		$(".sq02").addClass("on");
		$(".themul>li").removeClass("on");
		$("div.sq03").stop().animate({"left":"219px"},200);
		$("a.sq03").stop().animate({"left":"229px"},200);
		$('.stepClose.step01_stepClose').addClass('on');//200423수정 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(대화통계지도))
	});
	body.on("click",".sqTabs a",function(){
		$(".sqTabs a").removeClass("on");
		$(this).addClass("on");
	});
	body.on("click",".sqdel",function(){ 
		$(this).parents("li").eq(0).remove();
	});
	body.on("click",".rightQuick.rq01", function(){
		var on = $(this).hasClass("on");
		$(".rightQuick").removeClass("on");
		$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
		$(".rqListBox>li>a").removeClass("on");
		$(".rqListBox").stop().animate({"right":"-550px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
		if(!on){
			$(this).next(".rqListBox").stop().animate({"right":"45px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
			$(this).addClass("on");
		}else{
			$(this).next(".rqListBox").stop().animate({"right":"-550px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
			$(this).removeClass("on");
		}
	});
	body.on("click",".rightQuick.rq02", function(){
		var on = $(this).hasClass("on");
		$(".rightQuick").removeClass("on");
		$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
		$(".rqListBox>li>a").removeClass("on");
		$(".rqListBox").stop().animate({"right":"-550px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
		if(!on){
			$(this).next(".rqListBox").stop().animate({"right":"45px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
			$(this).addClass("on");
		}else{
			$(this).next(".rqListBox").stop().animate({"right":"-550px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
			$(this).removeClass("on");
		}
	});
//	body.on("click",".rightQuick.rq06", function(){
//		var on = $(this).hasClass("on");
//		$(".rightQuick").removeClass("on");
//		if(!on){
//			$(this).next(".rqListBox").stop().animate({"right":"45px"},200);
//			$(this).addClass("on");
//		}else{
//			$(this).next(".rqListBox").stop().animate({"right":"-550px"},200);
//			$(this).removeClass("on");
//		} 
//	}); 
	
	var settingList = ".rqListBox a";
	body.on("click", ".rqListBox>li>a", function(){
		var on = $(this).hasClass("on"); 
		if(!on){
			$(".rqListBox>li>a").removeClass("on");
			$(".rqListBox>li>ul, .rqListBox>li>ol").hide();
			$(this).next("ul").show();
			$(this).next("ol").show();
			$(this).addClass("on");
		}else{
			$(this).next("ul").hide();
			$(this).next("ol").hide();
			$(this).removeClass("on");
		}
	});
	body.on("mouseover", settingList, function(){
		$(this).addClass("over");
	});
	body.on("mouseout", settingList, function(){
		$(this).removeClass("over");
	});
	var optionList = ".rqListBox>li>ul>li>a";
	body.on("click", optionList, function(){ 
		var val = $(this).html();
		$(this).parents("ul").eq(0).prev("a").empty().html(val).removeClass("on");
		$(this).parents("ul").eq(0).hide();
	});
	
	//200423수정 시작 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(대화형통계지도))
	//[목록] 열기_닫기 버튼 
	body.on("click", ".stepClose.step01_stepClose", function(){
		console.log('목록닫기 버튼 클릭')
		var $this = $(this);
		var checkClose = $this.hasClass("on");
		if(checkClose) { // 목록 닫기
			$this.removeClass('on');
			$(".sqListBox.sq03").stop().animate({"left":"-300px"},200);
			$('.sideQuick.sq03').stop().animate({"left":"-300px"},200);
			$(".quickBox.step01").stop().animate({"left":"-220px"},200);
		} else {		 // 목록 열기
			$this.addClass('on');
			$(".sqListBox.sq03").stop().animate({"left":"220px"},200);
			$('.sideQuick.sq03').stop().animate({"left":"223px"},200);
			$(".quickBox.step01").stop().animate({"left":"0"},200);
		}
	});
	//200423수정 끝 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(대화형통계지도))
	
	body.on("click", ".sideQuick.sq02,.stepClose", function(){//20년수정반영(.stepClose추가)
		if($(this).hasClass('step01_stepClose')) return; //[목록] 열기_닫기는 별개로 작동하도록 if문 추가 //200423수정 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(대화형통계지도))
		// 추가 부분
		$(".sideQuick.xw").css("left","370px");//박길섭추가
		//20200414 수정시작
		if($(".sideQuick.sq03").hasClass("on")){
			$(".sqListBox.sq03").css("left","360px");//박길섭추가
		}else{
			$(".sideQuick.xw").css("left","370px");
			$(".sqListBox.sq03").stop().animate({"left":"-550px"},100);
		}
		//20200414 수정 끝
		var stat_thema_map_id = window.parent.$thematicMapMain.param.stat_thema_map_id;
		var theme = window.parent.$thematicMapMain.param.theme;
		if($(this).hasClass("on")){
			stepCloseAnimate(2);
			stepCloseAnimate(1);
		}
		else{
			$(".quickBox .bottom > a.stepClose").addClass("on");//20년수정반영
			$(".sideQuick.sq02").addClass("on");//박길섭추가
			if(theme){
				$(".themul > li").each(function(index , elem){
					if(theme == $(elem).find("a").data("id")){
						$(".nav-list>li>a").removeClass("on");//박길섭 추가
						$(".nav-list").find("li").eq(index).find("a").addClass("on");
						$thematicMapFrame04.getCategoryList.getMenuList(theme);
						$(elem).find("a").click();
					}
				});
				
				$(".radioType > li").each(function(index, elem){
					if($(elem).find("label").data("id") == stat_thema_map_id){
						$(elem).find("label").addClass("on");
					}
				});
			}else{
				$(".themul li").removeClass("on");
				var on = $(this).hasClass("on");
				if(!on){
					$(".sideQuick.sq02").stop().animate({"left":"0"},200);
					$(".quickBox.step01").stop().animate({"left":"0"},200);
					//$(".shadow").show(); 
					$(this).find("span").hide();
		//			$(this).addClass("on").css("width","40px");
				}else{ 
					stepCloseAnimate(1); 
					$(this).find("span").show();
		//			$(this).removeClass("on").css("width","90px");
				} 
			}
		}
	});  
	body.on("click",".sqList #stat_sel a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		//귀농귀촌귀어일경우 selectValue 값 유지
		if((this.id).indexOf('dataType') != -1) {
			return;
		}
		if( $("#selectValue").val()=="leftValue"){
			$("#selectValue").val("rightValue");
		}else{
			$("#selectValue").val("leftValue");
		}
				
	}); 
	
	//박길섭 추가
	body.on("click", ".nav-sidebar li a", function(){ 
		// 추가 부분
		var index=$(this).parent("li").index();
		$(".nav-sidebar li a").removeClass("on");
		$(".nav-sidebar li").eq(index).find("a").addClass("on");
			});
	
	
	body.on("click",".sqList #region_boundary a", function(){
		
		
		
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
				
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		if($(this).attr('id') == "autoRegion"){
			$("#selectValue2").val("auto");
			
			// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			initTopBottomButtons();
			// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			
		}else if($(this).attr('id') == "sido"){
			$("#selectValue2").val("1");
			
			// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			initTopBottomButtons();
			// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			
		}else if($(this).attr('id') == "sigungu"){
			$("#selectValue2").val("2");
			
			// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			$("#top_bottom_li").show();
			// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			
		}else if($(this).attr('id') == "eupmyundong"){
			$("#selectValue2").val("3");
			
			// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			initTopBottomButtons();
			// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			
		}
		
//		if($(this).text()=="자동"){
//			$("#selectValue2").val("auto");
//			
//		}else if($(this).text()=="시도"){
//			$("#selectValue2").val("1");
//			
//		}else if($(this).text()=="시군구"){
//			$("#selectValue2").val("2");
//			
//		}else if($(this).text()=="읍면동"){
//			$("#selectValue2").val("3");
//			
//		}
				
	}); 

	// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
	body.on("click",".sqList #top_bottom_li a", function(){
		if($(this).hasClass("on")){
			return;
		}
		
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		var obj = $(this);
		if(obj[0].id == "top_bottom_off") {
			$("#top_bottom_type").hide();
			$("#top_bottom_type_top").removeClass("on");
			$("#top_bottom_type_both").addClass("on");
			$("#top_bottom_type_bottom").removeClass("on");
			
			$("#top_bottom_select").hide();
			$("#top_bottom_select_count").val("10");
		} else {
			$("#top_bottom_type").show();
			$("#top_bottom_select").show();
		}
	});
	
	body.on("click",".sqList #top_bottom_type a", function(){
		if($(this).hasClass("on")){
			return;
		}
		
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
	});
	// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
	
	body.on("click",".sqList #map_type a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
				
		if( $("#dataMode").val()=="color"){
			$("#dataMode").val("bubble");
		}else{
			$("#dataMode").val("color");
		}
				
	}); 
	
	body.on("click",".sqList #data_type a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		if( $("#dataMode2").val()=="dataOff"){
			$("#dataMode2").val("dataOn");
		}else{
			$("#dataMode2").val("dataOff");
		}
		
	}); 
	
	
	body.on("click",".sideQuick.sq03", function(){
		
		var on = $(this).hasClass("on");
		if(!on){
			if($(".sq02").hasClass("on")){
				$(this).next(".sqListBox").stop().animate({"left":"360px"},200);
			}
			else{
				$(this).next(".sqListBox").stop().animate({"left":"0px"},200);
			}
			$(this).addClass("on");
		}else{
			$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
			$(this).removeClass("on");
		}
	}); 
	//20년수정반영 시작
	/*quick step*/
	/*body.on("click",".stepClose",function(){ 
        stepCloseAnimate(parseInt($(this).index(".stepClose")+1)); 
    });*/
	//20년수정반영 끝
	body.on("click",".stepClose2",function(){ 
		$(".sideQuick.sq03").click(); 
    }); 
	//20년수정반영 시작
	body.on("click",".stepClose-data",function(){ 
		$(".sop-right").stop().animate({"right":"0px"},200);
    });
	//20년수정반영 끝
	body.on("click", ".themul li>a", function(){   
		var inx = $(this).parent("li").index();
		var qm = $(this).parents("ul").eq(0).attr("class");
		$(".qmdl dd ul>li").removeClass("on");
		$(".themul li").removeClass("on");
		$(this).parent("li").addClass("on");
		$(".totalResult").hide();
		if(qm=="qmIcon01"){
			$(".totalResult.tr0"+parseInt(inx+1)).show();
		}else if(qm=="qmIcon02"){
			$(".totalResult.tr0"+parseInt(inx+5)).show();
		} 
		$(".nav-sidebar ul li a").removeClass("on");
		$(".nav-sidebar ul li").eq(inx).find("a").addClass("on");
//		$(".sideQuick.sq02").stop().animate({"left":"640px"},200);
//		$(".quickBox.step02").stop().animate({"left":"280px"},200); 
		$(".quickBox.step01").stop().animate({"left":"-300px"},200); 
		$(".nav-sidebar").stop().animate({"left":"0"},200); 
		$(".quickBox.step02").stop().animate({"left":"80px"},200); 
	});   
	body.on("click", ".wonList01 li:not(.disabled) a", function(){    
		var ck = $(this).hasClass("on");
		if(!ck){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
	});
	
	body.on("click", "#btnSample01", function(){    
		$(".sideQuick.sq02").stop().animate({"left":"640px"},200);
		$(".quickBox.step03").stop().animate({"left":"560px"},200);
	});
	body.on("click", "#btnSample02", function(){    
		$(".sideQuick.sq02").stop().animate({"left":"1120px"},200);
		$(".quickBox.step04").stop().animate({"left":"640px"},200);
	});  
	
	body.on("click",".cateMenu li a",function(){
		var inx = $(this).parent("li").index();
		$(this).parents(".cateMenu").eq(0).nextAll("div").hide();
		$(this).parents(".stepBox").eq(0).find(".cm0"+parseInt(inx+1)).show();
        $(this).parents(".cateMenu").eq(0).children("li").removeClass("on");
        $(this).parents("li").eq(0).addClass("on");
    });  
	body.on("click",".tb_close",function(){ 
		$(this).hide(); 
		$(this).parents(".sceneBox").eq(0).remove();
		$(".resizeIcon").hide();
		var sceneInx = $(".sceneBox").length;  
		if(sceneInx==1){  
			$(".sceneBox").stop().animate({"width":"100%"},200); 
			$(".tb_close, .interactiveView").hide();
			$(".interactiveDataBoard").show();
		}else if(sceneInx==2){
			$(".sceneBox").stop().animate({"width":"50%"},200);
			$(".sceneBox").draggable("destroy").resizable("destroy").css({"position":"static", "border":"0", "height":"100%"});
		}
		$(".sceneRela").css({"border-left":"5px solid #000"});
		$(".sceneRela").eq(0).css({"border-left":"0"});
		$(".interactiveView").each(function(i){
			$(this).text("VIEW"+parseInt(i+1));
		});
    }); 
	
	body.on("click",".tb_radio .fl",function(){ 
		$(".tb_radio").css("background","url(/img/bg/bg_tbradio_on.png)");  
    });
	body.on("click",".tb_radio .fr",function(){ 
		$(".tb_radio").css("background","url(/img/bg/bg_tbradio_off.png)");  
    });
	body.on("click",".tb_sizing",function(){ 
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
			$("header").css({"height":"26px", "width":"100%"}); 
			$(".headerEtc, .gnb, .headerContents form").hide();
			$(".headerContents h1").css({"height":"26px"});
			$(".headerContents h1 img").css({"height":"26px", "margin":"0 0 0 10px"});
			$(".containerBox").css({"height":"calc(100% - 26px)", "top":"26px"});
		}else{
			$(this).removeClass("on");
			$("header").css({"height":"104px", "width":"970px"}); 
			$(".headerEtc, .gnb, .headerContents form").show();
			$(".headerContents h1").css({"height":"78px"});
			$(".headerContents h1 img").css({"height":"45px", "margin":"18px 0 0 0"});
			$(".containerBox").css({"height":"calc(100% - 50px)", "top":"104px"});
		}
    });

	body.on("click",".sceneBox",function(){
		var sceneInx = $(".sceneBox").length; 
		if(sceneInx==3){
			$(".sceneBox").css({"z-index":"8", "border":"3px solid #333"});
			$(this).css({"z-index":"10", "border":"3px solid red"});
		}
		
    });
	body.on("click",".stepBox label",function(){
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		} 
    });

	
	body.on("click","a.roundTextBox",function(){
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
			$(this).next(".joinDefault").show();
		}else{
			$(this).removeClass("on");
			$(this).next(".joinDefault").hide();
		} 
    });
	body.on("click",".stepBox .dbTypeCk label,  .dbTypeCk label",function(){
		$(".dbTypeCk label").removeClass("on");
		$(this).addClass("on");
    });

	body.on("click",".fileFind",function(){ //사용자데이터업로드 파일불러오기
		$(".fileInput").click();
		
    });
	body.on("change",".fileInput",function(){ 
		var val = $(this).val();
		$(this).next(".inp").val(val);
    });
	body.on("click",".btn_clockTypeSetting",function(){ 
		$(this).addClass("on");
		$(".yearList li").show();
		$(".yearList input").css("position","static");
    });
	body.on("click",".btn_clockTypeOk",function(){ 
		$(".btn_clockTypeSetting").removeClass("on");
		$(".yearList li").each(function(i){
			var ck = $(this).find("input").prop("checked");
			if(!ck){
				$(this).hide();
			}
		});
		$(".yearList input").css("position","absolute");
    });
	body.on("click",".typeBox>a",function(){ 
		$(this).parents(".compareBox").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		var ck = $(this).index(".typeBox>a")+1;
		$(this).parents(".compareBox").eq(0).find(".charts").css("position","absolute");
		$(this).parents(".compareBox").eq(0).find(".tables").css("position","absolute");
		if(ck%2){
			$(this).parents(".compareBox").eq(0).find(".charts").css("position","static");
		}else{
			$(this).parents(".compareBox").eq(0).find(".tables").css("position","static");
		}
		
		$(".yearList input").css("position","static");
    });
	
}


//mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
function initTopBottomButtons() {
	
	$("#top_bottom_li").hide();
	$("#top_bottom_off").addClass("on");
	$("#top_bottom_on").removeClass("on");
	
	$("#top_bottom_type").hide();
	$("#top_bottom_type_top").removeClass("on");
	$("#top_bottom_type_both").addClass("on");
	$("#top_bottom_type_bottom").removeClass("on");
	
	$("#top_bottom_select").hide();
	$("#top_bottom_select_count").val("10");

	$thematicMapFrame04.ui.mapList[0].topBottomState = "OFF";
	$thematicMapFrame04.ui.mapList[0].topBottomType = "both";
	$thematicMapFrame04.ui.mapList[0].topBottomCount = "10";
}
//mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출

