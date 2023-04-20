/**
 * 
 * history : 네이버시스템(주), 1.0, 2020/12/01
 * author : SGIS+ 운영팀
 * version : 1.0
 * mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
 *
 */

var tooltipArrX = [];
var tooltipArrY = [];
var stopcnt = 0;//20년수정반영
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

	//공영자전거 운영현황 추가
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
		$("#bike_type").show();
	}
	//공영자전거 운영현황 추가
	
	//감염병 발생현황 추가
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
		$("#infection_list,#infection_etc").show();
		$(".thematicCharts").empty();
		$(".thematicCharts").html("<div style='text-align:center;'>※ 파이차트 클릭 시 해당 지역의 감염병 발생 건 수와</div><div style='margin-top:5px;text-align:center;'>비율을 확인할 수 있습니다.</div>").css("margin-top","195px");
		$(".thematicTopText,.thematicBotText").hide();
	}
	//감염병 발생현황 추가
	
	//암발생현황 추가
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
		$(".sqListBox").css("width","330px");
		$(".sqTabs").css("width","320px");
		$("#cancer_list,#cancer_etc").show();
	}
	//암발생현황 추가
	
	//기온/강수현황 추가
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
		$("#region_boundary").hide();
		$("#weather_type1").show();
	}
	//기온/강수현황 추가

	//코로나추가 20200722 주용민
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
		$("#covid_data_type").show();
		$(".dataSideBox").css("height","550px");
		$(".covidDbTabs").css("display","table");
		$(".thematicCharts").css("margin-top","70px"); //20200728 jrj
		$("#region_boundary").hide();
		$("#stat_sel span").text("세부선택");
		$("#quar").show();
	}
	
	//코로나추가 20200730 jrj
	$("body").on("click", "#covidPlay", function(){
		var that = $thematicMapFrame15.ui.mapList[0];
		that.covidPlayYn = true;
		that.covidPlayIdx = 0;
		
		$("#covidPlay").css("display","none").hide();
		$("#covidStop").css("display","").show();
		
		var start = $("#covid_month option:selected").val()+""+$("#covid_day option:selected").val();
		
		that.covidPlayMonth = $("#covid_month option:selected").val();
		
		if( ( that.dtData.length-1 ) == that.dtData[ start ] ){
			that.covidPlayIdx = 0;
		} else {
			that.covidPlayIdx = that.dtData[ start ];
		}
		
		playCovidTimer();
		
		$thematicMapFrame15.playCovidTimer = setInterval(function(){
			playCovidTimer();
		}, 2000);
	});

	//공영자전거 운영현황
	$('body').on('click', "#bike_type a", function(){
		$("#bike_type a").removeClass("on");
		$(this).addClass("on");
		$("#leftValue").empty();
		if($("#bike1").hasClass("on")){
			$("#leftValue").text("수(개)");
		}else if($("#bike2").hasClass("on")){
			$("#leftValue").text("수(대)");
		}else if($("#bike3").hasClass("on")){
			$("#leftValue").text("수(건)");
		}
	});
	//공영자전거 운영현황
	
	//기온/강수현황추가
	$('body').on('click', "#weather_type1 a", function(){
		$("#weather_type1 a").removeClass("on");
		$(this).addClass("on");
	});
	$('body').on('click', "#weather_type2 a", function(){
		$("#weather_type2 a").removeClass("on");
		$(this).addClass("on");
	});
	//기온/강수현황추가
	
	//암발생현황추가
	$('body').on('click', "#cancer_list a", function(){
		$("#cancer_list a").removeClass("on");
		$(this).addClass("on");
	});
	//암발생현황추가
	
	//감염병발생현황추가
	$('body').on('click', "#infection_list a", function(){
		if($("#pieChart").hasClass("on")){
			$(".thematicCharts").empty();
			$(".thematicCharts").html("<div style='text-align:center;'>※ 파이차트 클릭 시 해당 지역의 감염병 발생 건 수와</div><div style='margin-top:5px;text-align:center;'>비율을 확인할 수 있습니다.</div>").css("margin-top","195px");
			$(".thematicTopText,.thematicBotText").hide();
		}
		$("#infection_list a").removeClass("on");
		$(this).addClass("on");
	});
	//감염병발생현황추가
	
	//코로나추가20200813 주용민
	$("#quar").click(function(){
		$("#covidDbTabs_toggle1").removeClass("on");
		$("#covidDbTabs_toggle2").addClass("on");
		$thematicMapFrame15.ui.mapList[0].getThemaMapDataboardData("99");
		$thematicMapFrame15.ui.mapList[0].selectedAdmCd = "99";
		$thematicMapFrame15.ui.mapList[0].monthChange = true;
		$thematicMapFrame15.ui.mapList[0].makeCovidChart();
		thematicCharts("99");
		$(".covidDbTabs").hide();
		$(".thematicCharts").css("margin-top","10px"); 
		$(".dataSideBox").css("height","500px");
		$(".highcharts-subtitle").empty().text("검역");
		$thematicMapFrame15.ui.mapList[0].monthChange = false;
	});
	
	//코로나추가 20200730 jrj
	$("body").on("click", "#covidStop", function(){
		$("#covidStop").css("display","none").hide();
		$("#covidPlay").css("display","").show();
		
		clearInterval( $thematicMapFrame15.playCovidTimer );
		$thematicMapFrame15.ui.mapList[0].covidPlayYn = false;
	});
	
	$('body').on('click', "#covid_data_type a", function(){
		$("#covid_data_type a").removeClass("on");
		$(this).addClass("on");
		if($("#covid_patient").hasClass("on")){
			$("#stat_sel").show();
			$("#base_year").show();
			$("#map_type").show();
			$("#data_type").show();
			$("#covid_type").hide();
			$("#covidDbTabs").show();
			$("#covidDbTabs_toggle1").addClass("on");
			$("#covidDbTabs_toggle2").removeClass("on");
			
			//코로나추가 20200729 jrj
			$thematicMapFrame15.ui.mapList[0].tmpAdmCd = "00";
			$thematicMapFrame15.ui.mapList[0].selectedAdmCd = "00";
			$thematicMapFrame15.ui.mapList[0].getThemaMapData('covid19_status','00');
			
			$(".thematicCharts").css("margin-top","70px");
			$(".covidDbTabs").show();
			$(".dataSideBox").css("height", "550px");
			$("#dataBoard,#quar,.dataSideBox").show();
			$(".sop-right").stop().animate({"right":"405px"},200);
			if( !$(".interactiveDataBoard").hasClass("on") ){
				$(".interactiveDataBoard").click();
			}
			
			//$("#covidChart").css("display","").show(); //20200728 jrj 코로나
			$("#covidChartDiv").show(); //20200728 jrj 코로나
			
			$thematicMapFrame15.ui.mapList[0].gMap.setZoom(1);	//코로나추가 20200728 jrj
			$thematicMapFrame15.ui.mapList[0].gMap.setMaxZoom(1);	//코로나추가 20200728 jrj
			
			$thematicMapFrame15.ui.mapList[0].isFirstDraw = true;
		}else if($("#covid_hospital").hasClass("on")){
			$("#covidStop").click();
			$("#stat_sel").hide();
			$("#base_year").hide();
			$("#map_type").hide();
			$("#data_type").hide();
			$("#covid_type").show();
			//$("#covidChart").css("display","none").hide(); //20200728 jrj 코로나
			$("#covidChartDiv").hide(); //20200728 jrj 코로나
			$thematicMapFrame15.ui.mapList[0].gMap.eachLayer(function(layer){
				if (layer.feature) {
					layer.remove(); 
				}
			});
			
			$thematicMapFrame15.ui.mapList[0].layerRemove = true;
			
	    	if ($thematicMapFrame15.ui.mapList[0].legend.circleMarkerGroup != null) {
	    		for (var i=0; i<$thematicMapFrame15.ui.mapList[0].legend.circleMarkerGroup.length;i++){
		    		var marker = $thematicMapFrame15.ui.mapList[0].legend.circleMarkerGroup[i];
		    		marker.remove();
		    	}
	    		$thematicMapFrame15.ui.mapList[0].legend.circleMarkerGroup = null;
	    	}
	    	$thematicMapFrame15.ui.mapList[0].gMap.setMaxZoom(11);	//코로나추가 20200728 jrj
			$thematicMapFrame15.ui.mapList[0].covid();
			
			$("#dataBoard, #quar, .dataSideBox").hide();
			$(".sop-right").stop().animate({"right":"0px"},200);
		}
	});
	
	$('body').on('click', ".covidDbTabs a", function(){
		$(".covidDbTabs a").removeClass("on");
		$(this).addClass("on");
		if($("#covidDbTabs_toggle1").hasClass("on")){
			$thematicMapFrame15.ui.mapList[0].getThemaMapData('covid19_status','00');
		}else if($("#covidDbTabs_toggle2").hasClass("on")){
			$thematicMapFrame15.ui.mapList[0].getThemaMapDataboardData($thematicMapFrame15.ui.mapList[0].tmpAdmCd);
			thematicCharts($thematicMapFrame15.ui.mapList[0].tmpAdmCd);
		}
	});
//코로나추가 20200722 주용민	
	//통계선택에서 경계를 초기화한다.
	$("#autoRegion").addClass("on");
	$("#selectValue").val("leftValue");
	
	//지도유형에서 색상을 초기화한다.
	$("#color").addClass("on");
	//코로나추가 20200722 주용민
	$("#covid0").addClass("on");
	//코로나추가 20200722 주용민
	$("#cancer0").addClass("on");
	$("#infection1").addClass("on");
	$("#weather1").addClass("on");
	$("#bike1").addClass("on");
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
    //데이터보드 필요없는 주제도 하이드. 프로세스에 따라 데이터보드에 뜨는 DB 호출 시간에 따라 시간초 조정 요망
    setTimeout(function() {
	    if($(".thematicCharts").is(':visible') == false ){//데이터보드에 차트가 보이지 않으면 
	    	$("#dataBoard").hide(); 
	    }else{//데이터보드에 차트가 보이면  
	    	$("#dataBoard").show(); 
	    }
    },700);    
    //2019-03-19 박길섭 끝
    
    $('div.quickBox.step01 > div.bottom > .stepClose').addClass('step01_stepClose'); // 목록 열기_닫기 버튼은 일반 열기_닫기 버튼과 별개로 작동하도록 class를 추가 //200423수정 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(대화통계지도))
});

function playCovidTimer(){
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
		var that = $thematicMapFrame15.ui.mapList[0];
		var chart = $("#covidChart").highcharts();
		var categories = chart.xAxis[0].categories
		var temp = categories[ that.covidPlayIdx ].split(".");
		
		$("#covid_month").val( temp[0] );
		that.covidDay();
		$("#covid_day").val( temp[1] );
		
		chart.xAxis[0].removePlotLine();
		chart.xAxis[0].addPlotLine({
			value : that.dtData[temp[0]+""+temp[1]],
			color : '#FF0000',
			width : 2
		});
		
		chart.series[0].chart.tooltip.refresh( chart.series[0].points[ that.covidPlayIdx ] );
		
		$thematicMapFrame15.ui.mapList[0].changeRegionBound();
		
		if( ( that.dtData.length-1 ) == that.dtData[ temp[0]+""+temp[1] ] ){
			that.covidPlayIdx = 0;
		} else {
			that.covidPlayIdx++;
		}
	} else {
		clearInterval( $thematicMapFrame15.playCovidTimer );
	}
}

function mapClick(){
	var body = $("body");
	body.on("click",".sop-interactive",function(){ 
		//20년수정반영 시작(시계열)
		/*
		$('.dscList1').show(); 
		$('.dataSideBox').css('height', '900px');
		$(".yearList li").show();
		*/
		 //20년수정반영 끝
		var ck = $(".interactiveDataBoard").hasClass("on");
		if(!ck){
			var full = $(".dataSideBox").hasClass("full");
			$(".dataSideBox").stop().animate({"right":"0px"},200);//20년수정반영
			if(!full){
				$(".sop-right").stop().animate({"right":"405px"},200);//20년수정반영
				$(".interactiveDataBoard").addClass("on").stop().animate({"right":"285px"},200);//20년수정반영
			}else{
				$(".sop-right").stop().animate({"right":"405px"},200);//20년수정반영
				$(".interactiveDataBoard").addClass("on").stop().animate({"right":"285px"},200);//20년수정반영
			}
			
		}
		//20년수정반영 시작
		else{
			
			//mng_s 20200727 이진호
			//지도유형을 버블로 변경 후 지도에서 버블 클릭시 sop-right 버튼 위치 수정 , 코로나 분기 처리
			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
				if( !$("#covid_hospital").hasClass("on") ){ //코로나추가 20200729 jrj
					$(".sop-right").stop().animate({"right":"405px"},200);
				}
			}else{
				if($("#dataBoard").css('display') == "none"){
					$(".sop-right").stop().animate({"right":"0px"},200);
				}else{
					$(".sop-right").stop().animate({"right":"405px"},200);
				}
			}
			//mng_e 20200727 이진호
			
			$(".dataSideBox").stop().animate({"right":"0px"},200);
			$(".interactiveDataBoard").addClass("on").stop().animate({"right":"285px"},200);
		}
		//20년수정반영 끝
	});
}
function thematicCharts(selectedAdmCd, isFirst){
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
		$(".clink").remove();
		if($("#selectValue").val() == "leftValue"){
			$(".thematicBotText").empty().append("출처 : " + $thematicMapFrame15.ui.mapList[0].left_sep_source).css("margin-top","-5px").after("<p class='clink' style='font-size:12px;width:420px;text-align:center;'>상세통계표 보기 : <a style='font-size:12px;text-decoration:underline;color:blue;' href='https://kosis.kr/statHtml/statHtml.do?orgId=350&tblId=DT_35001_A089&vw_cd=MT_ZTITLE&list_id=350_35001_6&seqNo=&lang_mode=ko&language=kor&obj_var_id=&itm_id=&conn_path=MT_ZTITLE' target='_blank'>국가통계포털(KOSIS)</a></p>");
		}else if($("#selectValue").val() == "rightValue"){
			$(".thematicBotText").empty().append("출처 : " + $thematicMapFrame15.ui.mapList[0].left_sep_source).css("margin-top","-5px").after("<p class='clink' style='font-size:12px;width:420px;text-align:center;'>상세통계표 보기 : <a style='font-size:12px;text-decoration:underline;color:blue;' href='https://kosis.kr/statHtml/statHtml.do?orgId=350&tblId=DT_35001_A090&vw_cd=MT_ZTITLE&list_id=350_35001_6&seqNo=&lang_mode=ko&language=kor&obj_var_id=&itm_id=&conn_path=MT_ZTITLE' target='_blank'>국가통계포털(KOSIS)</a></p>");
		}
	}
	
	//20년수정반영 시작
	if($thematicMapFrame15.ui.mapList[0].chartReload != undefined && !$thematicMapFrame15.ui.mapList[0].chartReload) {
		$thematicMapFrame15.ui.mapList[0].chartReload = true;
		return false;
	}
	//20년수정반영 끝
	
	// mng_s 20200710 김건민 (데이터보드 이미지 다운로드 추가)
	var agent = navigator.userAgent.toLowerCase();
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
		$(".bar div a").attr("title","IE에서는 이미지 다운로드시 기능상 숫자<br>겹침이 발생하므로 크롬을 이용해주시기 바랍니다.");
	}	
	// mng_e 20200710 김건민
	
	var map = $thematicMapFrame15.ui.mapList[0];
	var left_sep_chart_title = map.left_sep_chart_title;
	var right_sep_chart_title = map.right_sep_chart_title;
	var etc_sep_chart_title = map.sep_map_right_sep_ttip_title; //2017.03.17
	
	if( window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" ){
		if( map.tmpAdmCd == "00" && !$("#covidDbTabs_toggle2").hasClass("on") ){
			var tempTitle = "["+$("#covid_month >option:selected").val() + "월 " + $("#covid_day >option:selected").val() + "일 00시 기준] ";
		}  else {
			var tempTitle = "["+ map.covidLastMonth + "월" + map.covidLastDay + "일 00시 기준]";
		}
		left_sep_chart_title = '<span style="font-size:12px;">'+tempTitle+'</span><br/>' + left_sep_chart_title + " (" + map.left_sep_unit + ")";
		right_sep_chart_title = '<span style="font-size:12px;">'+tempTitle+'</span><br/>' + right_sep_chart_title + " (" + map.right_sep_unit + ")";
	}
	
	//console.log(map.dataBoardData);
	
	var xAxisCat = [];	//X축 카테고리
	var retDataList = [];	//수치 데이터
	var titleText;		//차트 타이틀
	var labelsVisible = true;	//카테고리 표출 여부
	
	//2017.03.17 데이터보드 이슈 - 그래프 sort문제
	//===========================START==========================//
	if (map.dataBoardData != null) {
		map.dataBoardData = map.dataBoardData.sort(function(a,b){
			return parseInt(a.base_year) - parseInt(b.base_year);
		});
	}
	
	if(isFirst != undefined && selectedAdmCd == "00") {
		$("#stat_sel > a").each(function() {
			if ($(this).hasClass("on")) {				
				
				// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
//				var id = $(this).attr("id");
//				if (id == "leftValue" || id == "etcValue") {
//					map.dataBoardData.sort(function(a,b){
//						return b.left_data_val - a.left_data_val;
//					});
//				}else {
//					map.dataBoardData.sort(function(a,b){
//						return b.right_data_val - a.right_data_val;
//					});
//				}

				var id = $("#selectValue").val();;
				if (id == "leftValue" || id == "etcValue") {
					map.dataBoardData.sort(function(a,b){
						return b.left_data_val - a.left_data_val;
					});
				}else {
					map.dataBoardData.sort(function(a,b){
						return b.right_data_val - a.right_data_val;
					});
				}
				// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
				
			}
		});
	}
	//===========================END==========================//
	for(var i=0;i<map.dataBoardData.length;i++){
		if(map.dataBoardData[i].adm_cd == "99" && $("#covidDbTabs_toggle1").hasClass("on")){
			xAxisCat.push("검역");
		}
		if(map.dataBoardData[i].adm_cd == selectedAdmCd){
			if($(".select_quarter").hasClass("on")){
				xAxisCat.push(map.dataBoardData[i].period_value.substr(0,1)+'분기 ');				
			}else if($(".select_monthly").hasClass("on")){
				xAxisCat.push(map.dataBoardData[i].period_value+'월');				
			}else{
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
					if($("#select_base_year").val() == map.dataBoardData[i].base_year.substr(0,2))
					xAxisCat.push(map.dataBoardData[i].base_year.substr(0,2)+'년 '+map.dataBoardData[i].base_year.substr(2,2)+'월');				
				//코로나추가 20200722 주용민
				}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
					xAxisCat.push(map.dataBoardData[i].base_month+'월');
					$("#covidDbTabs_toggle1").removeClass("on");
					$("#covidDbTabs_toggle2").addClass("on");
				//코로나추가 20200722 주용민										
				}else if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
					if($("#rightValue").hasClass("on")){
						if(map.dataBoardData[i].base_year == '2016'){
							var idx = map.dataBoardData.indexOf(map.dataBoardData[i]);
							map.dataBoardData.splice(idx,1);
						}
						xAxisCat.push(map.dataBoardData[i].base_year+'년');				
					}else{
						xAxisCat.push(map.dataBoardData[i].base_year+'년');				
					}
				}else{
					xAxisCat.push(map.dataBoardData[i].base_year+'년');				
				}
			}
			if($("#selectValue").val() == "leftValue" || $("#selectValue").val() == "etcValue"){
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
					if($("#select_base_year").val() == map.dataBoardData[i].base_year.substr(0,2))
						retDataList.push(parseFloat(map.dataBoardData[i].left_data_val));
				}else{
					retDataList.push(parseFloat(map.dataBoardData[i].left_data_val));
				}
			}else{
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
					if($("#select_base_year").val() == map.dataBoardData[i].base_year.substr(0,2))
						retDataList.push(parseFloat(map.dataBoardData[i].right_data_val));
				}else{
					retDataList.push(parseFloat(map.dataBoardData[i].right_data_val));
				}
			}
		}else {
			if (selectedAdmCd == "00") {
					map.dataGeojson.eachLayer(function(layer) {
						if  (map.dataBoardData[i].adm_cd == layer.feature.properties.adm_cd) {
							if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
								if($("#rightValue").hasClass("on")){
									if(map.dataBoardData[i].adm_cd == '23'){
										var idx = map.dataBoardData.indexOf(map.dataBoardData[i]);
										map.dataBoardData.splice(idx,1);
									}else if(map.dataBoardData[i].adm_cd =='22'){
										if(map.dataBoardData[i].base_year == '2017'){
											var idx = map.dataBoardData.indexOf(map.dataBoardData[i]);
											map.dataBoardData.splice(idx,1);
										}else{
											xAxisCat.push(layer.feature.properties.adm_nm);
										}
									}else{
										xAxisCat.push(layer.feature.properties.adm_nm);
									}
								}else{
									xAxisCat.push(layer.feature.properties.adm_nm);
								}
							}else{
								xAxisCat.push(layer.feature.properties.adm_nm);
								$("#covidDbTabs_toggle2").removeClass("on");
								$("#covidDbTabs_toggle1").addClass("on");
							}
						}
					});
				if($("#selectValue").val() == "leftValue" || $("#selectValue").val() == "etcValue"){
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
						if($("#select_base_year").val() == map.dataBoardData[i].base_year.substr(0,2))
							retDataList.push(parseFloat(map.dataBoardData[i].left_data_val));
					}else{
						retDataList.push(parseFloat(map.dataBoardData[i].left_data_val));
					}
				}else{
					if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
						if($("#select_base_year").val() == map.dataBoardData[i].base_year.substr(0,2))
							retDataList.push(parseFloat(map.dataBoardData[i].right_data_val));
					}else{
						retDataList.push(parseFloat(map.dataBoardData[i].right_data_val));
					}
				}
				
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" &&
						$("#covidDbTabs_toggle2").hasClass("on") ){
					xAxisCat.push(map.dataBoardData[i].base_month+'월');
				}
			}
		}		
	}
	
	//2017.03.17 데이터보드 수정 - 전국단위에서는 "연도별" 텍스트 삭제
	var title = map.left_sep_chart_title;
	if (selectedAdmCd == "00") {
		//2017.03.20 validation 추가
		if (left_sep_chart_title == undefined || left_sep_chart_title == null) {
			left_sep_chart_title = "";
		}
		if (right_sep_chart_title == undefined || right_sep_chart_title == null) {
			right_sep_chart_title = "";
		}
		if (etc_sep_chart_title == undefined || etc_sep_chart_title == null) {
			etc_sep_chart_title = "";
		}
		left_sep_chart_title = $.trim(left_sep_chart_title.replace("연도별", ""));
		right_sep_chart_title = $.trim(right_sep_chart_title.replace("연도별", ""));
		etc_sep_chart_title = $.trim(etc_sep_chart_title.replace("연도별", ""));
	}else{
		if(window.parent.$thematicMapMain.param.stat_thema_map_id == "QNj43PFUT220190612100733746ocaFOXLaj3"){
			if($(".select_quarter").hasClass("on")){
				left_sep_chart_title = "분기별 " + left_sep_chart_title;				
				right_sep_chart_title = "분기별 " + right_sep_chart_title;
			}else if($(".select_monthly").hasClass("on")){
				left_sep_chart_title = "월별 " + left_sep_chart_title;				
				right_sep_chart_title = "월별 " + right_sep_chart_title;
			}else{
				left_sep_chart_title = "년도별 " + left_sep_chart_title;				
				right_sep_chart_title = "년도별 " + right_sep_chart_title;
			}
		}
	}
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "uHaX8JJqyh20201014110114231lgMgsJnINP"){
		left_sep_chart_title = $('#select_base_year option:selected').val() + "년 신규 "+ $("#cancer_list a.on").text() +" "+ left_sep_chart_title;
		right_sep_chart_title = $('#select_base_year option:selected').val() + "년 누적 "+ $("#cancer_list a.on").text() +" " + right_sep_chart_title;
	}
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "MmLSKu8PgQ20201022173339083sOVy6YCGQj"){
		left_sep_chart_title = $('#select_base_year option:selected').val() + "년 "+ left_sep_chart_title;
		right_sep_chart_title = $('#select_base_year option:selected').val() + "년 "+ right_sep_chart_title;
	}
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "8mjCr1kWql20201123140825772vKMjQsNcRw"){
		left_sep_chart_title = $('#select_base_year option:selected').val() + "년 "+ $("#bike_type a.on").text() + " " + $("#leftValue").text();
		right_sep_chart_title = $('#select_base_year option:selected').val() + "년 "+ $("#bike_type a.on").text() + " " + $("#rightValue").text();
	}
	if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
		left_sep_chart_title = $('#select_base_year option:selected').val() + "년 "+ $("#weather_type1 a.on").text() + " " + $("#leftValue").text();
		right_sep_chart_title = $('#select_base_year option:selected').val() + "년 "+ $("#weather_type2 a.on").text() + " " + $("#rightValue").text();
	}
	if(isFirst != undefined && isFirst) {
		if($("#selectValue").val() == "leftValue"){
			$('.thematicCharts').highcharts({
		        chart: {zoomType: 'xy', type: 'bar'},
		        title: {text: left_sep_chart_title},
		        subtitle: {text: ""}, //2017.03.21 그래프 타이틀 이슈 - 전국 그래프에서 타이틀 보임
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
						enabled: false
		            },
		            title: {
		                text: '',//left_sep_chart_title,
		                style: {
		                    color: Highcharts.getOptions().colors[1]
		                }
		            },
		            max : retDataList[0] * 1.3
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
		                    color: Highcharts.getOptions().colors[0],
		                    fontSize:'10px'
		                }
		            },
		            opposite: true
		        }],
		        tooltip: {
		            shared: true
		        },
		        legend: {
		        	enabled : false 
		        },
		        plotOptions: {
		        	column: {
		        		//2017.03.09 데이터보드 수정
						//============START==============//
		                dataLabels: {
		                    enabled: true,
							//align: 'high',
							verticalAlign: 'middle',
		                    allowOverlap: true,
		                    formatter: function () {
								return appendCommaToNumber(this.y); //2017.03.23 그래프 텍스트 천단위 콤마
							}
		                }
		                //enableMouseTracking: false
		        		//============END==============//
		            }
		        },       		        
		        series: [{
		        	// 2017. 03. 20 개발팀 수정요청
		            name: left_sep_chart_title,
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
		}else if($("#selectValue").val() == "rightValue"){
			$('.thematicCharts').highcharts({
				chart: {zoomType: 'xy', type: 'bar'},
				title: {text: right_sep_chart_title},
				subtitle: {text: ""}, //2017.03.21 그래프 타이틀 이슈 - 전국 그래프에서 타이틀 보임
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
						text: '',//right_sep_chart_title,
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
		            max : retDataList[0] * 1.3
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
					shared: true
				},
				legend: {
					enabled : false 
				},
				plotOptions: {
					column: {
						dataLabels: {
							//2017.03.17 데이터보드 이슈 - 수치가 띄엄띄엄 보이는 이슈
							enabled: true,
							allowOverlap: true,
							align: 'high',
							verticalAlign: 'middle',
							//2017.03.23 그래프 텍스트 천단위 콤마
							formatter: function () {
								return appendCommaToNumber(this.y); 
							}
						}
						//enableMouseTracking: false
					}
				},       		        
				series: [{
		        	// 2017. 03. 20 개발팀 수정요청
					name: right_sep_chart_title,
					type: 'column',
	//	            yAxis: 1,
					data: retDataList,
					tooltip: {
						valueSuffix: ''
					}
		
				}
				]
			},
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
		}else {
			var idx = 0;
			$('.thematicCharts').highcharts({
				chart: {zoomType: 'xy', type: 'bar'},
				title: {text: etc_sep_chart_title}, //2017.03.17
				subtitle: {text: ""}, //2017.03.21 그래프 타이틀 이슈 - 전국 그래프에서 타이틀 보임
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
						enabled: false
					},
					title: {
						text: '',//left_sep_chart_title,
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
		            max : retDataList[0] * 1.3
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
					shared: true
				},
				legend: {
					enabled : false 
				},
				plotOptions: {
					column: {
						grouping: false,
						pointPadding: 0,
						dataLabels: {
							enabled: true,
							allowOverlap: true,
							align: 'high',
							verticalAlign: 'middle',
							//2017.03.23 그래프 텍스트 천단위 콤마
							formatter: function () {
								return appendCommaToNumber(this.y); 
							}
						}
					}   
				},       		        
				series: [{
					name: etc_sep_chart_title, //2017.03.20
					type: 'column',
	//	            yAxis: 1,
					data: retDataList,
					tooltip: {
						valueSuffix: ''
					}
		
				}
				]
			},
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
		}
	} else {
		if($("#selectValue").val() == "leftValue"){
			
			// 지진
			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "41d1dhxBgx20180627145739008kXnl0kFaa8"){
				srvLogWrite('B0','09','03','00',window.parent.$thematicMapMain.themaInfo.title,'');
				var year = ["01", "06", "11", "17"];
				
				$('.thematicCharts').highcharts({
			        chart: {zoomType: 'xy'},
			        title: {text: left_sep_chart_title},
			        subtitle: {text: map.adm_nm},
			        colors: [
			                 '#3BBEE3', '#E91E63'
			        ],
			        xAxis: [{
			        	categories: xAxisCat,
			        	labels: {
			            	formatter: function() {
			            		for(i=0; i<year.length; i++){
			            			if(this.value.substring(2,4) == year[i])
			            				return "'"+ year[i];
			            		}
			                },
			                rotation: 0,
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
//			            categories: xAxisCat,
			            crosshair: true
			        }],
			        yAxis: [{ // Primary yAxis
			            labels: {
			            	formatter: function() {
			                	return Highcharts.numberFormat(this.value, 0);
			                },
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            title: {
			                text: '',//left_sep_chart_title,
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            max : retDataList[0] * 1.3
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
							
							var html = "";
							html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
							html += "<span>" + title;
							html += " : " + "<b>" + appendCommaToNumber(this.y) + "</b></span>";
	
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
			                },
			                enableMouseTracking: false
			            }
			        },       		        
			        series: [{
			        	// 2017. 03. 20 개발팀 수정요청
			            name: left_sep_chart_title,
			            type: 'column',
	//		            yAxis: 1,
			            data: retDataList,
			            tooltip: {
			                valueSuffix: ''
			            }
			
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
			} else {
				
				
				
				//코로나추가 20200722 주용민
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
					if(map.tmpAdmCd == "00"){
						map.adm_nm = "전국";
						$(".thematicCharts").css("margin-top","70px"); //20200728 jrj
						$(".dataSideBox").css("height","550px");
					} else {
						$(".thematicCharts").css("margin-top","10px"); //20200728 jrj
						$(".dataSideBox").css("height","500px");
					}
				}
				//코로나추가 20200722 주용민
				if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
					$('.thematicCharts').highcharts({
						chart: {zoomType: 'xy'},
						title: {text: left_sep_chart_title},
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
											 if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
												 return Highcharts.numberFormat(this.value, 1);					        				 					        				 
											 }else{
												 return Highcharts.numberFormat(this.value, 0);					        				 
											 }
										 },
										 style: {
											 color: Highcharts.getOptions().colors[1]
										 }
									 },
									 title: {
										 text: '',//left_sep_chart_title,
										 style: {
											 color: Highcharts.getOptions().colors[1]
										 }
									 },
	//						         max : retDataList[0] * 1.3
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
										 
										 var html = "";
										 html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
										 html += "<span>" + title;
										 html += " : " + "<b>" + appendCommaToNumber(this.y.toFixed(1)) + "</b></span>";
										 
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
											 enabled: false,
											 allowOverlap: true
										 },
										 enableMouseTracking: false
									 }
								 },       		        
								 series: [{
									 // 2017. 03. 20 개발팀 수정요청
									 name: left_sep_chart_title,
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
													$thematicMapFrame15.ui.mapList[0].isChartClick = true;
													$('select[id=select_base_year]').val(this.category.replace("년",""));
													$thematicMapFrame15.ui.mapList[0].isDataboardReset = false;
													$thematicMapFrame15.ui.mapList[0].chartReload = false;
													$thematicMapFrame15.ui.mapList[0].changeRegionBound();
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
				}else{
					$('.thematicCharts').highcharts({
						chart: {zoomType: 'xy'},
						title: {text: left_sep_chart_title},
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
											 if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
												 return Highcharts.numberFormat(this.value, 1);					        				 					        				 
											 }else{
												 return Highcharts.numberFormat(this.value, 0);					        				 
											 }
										 },
										 style: {
											 color: Highcharts.getOptions().colors[1]
										 }
									 },
									 title: {
										 text: '',//left_sep_chart_title,
										 style: {
											 color: Highcharts.getOptions().colors[1]
										 }
									 },
	//						         max : retDataList[0] * 1.3
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
										 
										 var html = "";
										 html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
										 html += "<span>" + title;
										 html += " : " + "<b>" + appendCommaToNumber(this.y) + "</b></span>";
										 
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
										 },
										 enableMouseTracking: false
									 }
								 },       		        
								 series: [{
									 // 2017. 03. 20 개발팀 수정요청
									 name: left_sep_chart_title,
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
													$thematicMapFrame15.ui.mapList[0].isChartClick = true;
													$('select[id=select_base_year]').val(this.category.replace("년",""));
													$thematicMapFrame15.ui.mapList[0].isDataboardReset = false;
													$thematicMapFrame15.ui.mapList[0].chartReload = false;
													$thematicMapFrame15.ui.mapList[0].changeRegionBound();
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
		}else if($("#selectValue").val() == "rightValue"){
			//코로나추가 20200722 주용민
			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
				if(map.tmpAdmCd == "00") 
				map.adm_nm = "전국";
			}
			//코로나추가 20200722 주용민
			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"){
				$('.thematicCharts').highcharts({
					chart: {zoomType: 'xy'},
					title: {text: right_sep_chart_title},
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
										 if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
											 return Highcharts.numberFormat(this.value, 1);					        				 					        				 
										 }else{
											 return Highcharts.numberFormat(this.value, 0);					        				 
										 }
									 },
									 style: {
										 color: Highcharts.getOptions().colors[1]
									 }
								 },
								 title: {
									 text: '',//right_sep_chart_title,
									 style: {
										 color: Highcharts.getOptions().colors[1]
									 }
								 },
//						         max : retDataList[0] * 1.3
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
									 
									 var html = "";
									 html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
									 html += "<span>" + title;
									 html += " : " + "<b>" + appendCommaToNumber(this.y.toFixed(1)) + "</b></span>";
									 
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
										 enabled: false,
										 allowOverlap: true
									 },
									 enableMouseTracking: false
								 }
							 },       		        
							 series: [{
								 // 2017. 03. 20 개발팀 수정요청
								 name: right_sep_chart_title,
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
												$thematicMapFrame15.ui.mapList[0].isChartClick = true;
												$('select[id=select_base_year]').val(this.category.replace("년",""));
												$thematicMapFrame15.ui.mapList[0].isDataboardReset = false;
												$thematicMapFrame15.ui.mapList[0].chartReload = false;
												$thematicMapFrame15.ui.mapList[0].changeRegionBound();
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
			}else{
				$('.thematicCharts').highcharts({
					chart: {zoomType: 'xy'},
					title: {text: right_sep_chart_title},
					subtitle: {text: map.adm_nm},
					xAxis: [{
						categories: xAxisCat,
						crosshair: true
					}],
					yAxis: [{ // Primary yAxis
						labels: {
							formatter: function() {
								if(window.parent.$thematicMapMain.param.stat_thema_map_id == "onb6f4rRh320190902160751679iQUr3aVwTT"){
									return Highcharts.numberFormat(this.value, 1);
								}else{
									return Highcharts.numberFormat(this.value, 0);
								}
							},
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						},
						title: {
							text: '',//right_sep_chart_title,
							style: {
								color: Highcharts.getOptions().colors[1]
							}
						},
	//		            max : retDataList[0] * 1.3
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
							
							var html = "";
							html += "<span style='font-size:9px;'>"+this.x + "</span><br/>";
							html += "<span>" + title;
							html += " : " + "<b>" + appendCommaToNumber(this.y) + "</b></span>";

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
								allowOverlap : true //2017.03.30 spline 그래프 라벨 안보이는 문제
							},
							enableMouseTracking: false
						}
					},       		        
					series: [{
						// 2017. 03. 20 개발팀 수정요청
						name: right_sep_chart_title,
						type: 'column',
		//	            yAxis: 1,
						data: retDataList,
						tooltip: {
							valueSuffix: ''
						}
			
					}
					, {
						name: 'b',
						type: 'spline',
		//	            yAxis: 1,
						data: retDataList,
						tooltip: {
							valueSuffix: ''
						}
					}
					]
				});
			}
		}else {
			//코로나추가 20200722 주용민
			if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
				if(map.tmpAdmCd == "00") 
				map.adm_nm = "전국";
			}
			//코로나추가 20200722 주용민
			var idx = 0;
			$('.thematicCharts').highcharts({
				chart: {zoomType: 'xy'},
				title: {text: etc_sep_chart_title},
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
						}
					},
					title: {
						text: '',//left_sep_chart_title,
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
//		            max : retDataList[0] * 1.3
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
							allowOverlap : true //2017.03.30 spline 그래프 라벨 안보이는 문제
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
								if (selectedAdmCd !== "00") {
									var html = "<div style='color:#ffffff;font-size:9px;'>"; //2017.03.17 증감률 폰트사이즈 변경
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
				},       		        
				series: [{
					// 2017. 03. 20 개발팀 수정요청
					name: etc_sep_chart_title,
					type: 'column',
	//	            yAxis: 1,
					data: retDataList,
					tooltip: {
						valueSuffix: ''
					}
		
				}
				, {
					name: 'b',
					type: 'spline',
	//	            yAxis: 1,
					data: retDataList,
					tooltip: {
						valueSuffix: ''
					}
				}
				]
			});
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
	$("a, .step-option.group label").tooltip({ 
//		$("a, .stepBox font").tooltip({ 
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
        //$(btn).stop().animate({"left":"280px"},time);
        //$(fx+'.step02').animate({"left":"-680px"}, time); //20년수정반영
        $(fx+'.step02').animate({"left":"-279px"}, time); //20년수정반영
        $(".nav-sidebar").stop().animate({"left":"-200px"},200); 
    }); 
    $(fx).queue("step01", function(){
        //$(fx+'.step02').css({"left":"-680px"});//20년수정반영
    	$(fx+'.step02').animate({"left":"-279px"}, time); //20년수정반영
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
	    
	    $thematicMapFrame15.ui.mapList[0].isChartClick = true;
		$thematicMapFrame15.ui.mapList[0].isDataboardReset = true;
        $thematicMapFrame15.ui.mapList[0].chartReload = true;
        //$thematicMapFrame15.ui.mapList[0].changeRegionBound();
	    
	    $('#select_base_year').trigger("change");
	});
	//20년수정반영 끝
	
	//20년수정반영 시작
	//시계열 관련 이벤트
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
			
			console.log(delaytime);
			var timer = setInterval(function() {
				if(cnt >= arr.length){
					cnt = 0;
				}
					
				$(".yearList").find("li").removeClass("on");
				$(".yearList").find("li:eq("+arr[cnt].index+")").addClass("on");
				$("#select_base_year").find("option:eq("+arr[cnt].index+")").prop("selected", true);

				$thematicMapFrame15.ui.mapList[0].isChartClick = true;
				$thematicMapFrame15.ui.mapList[0].isDataboardReset = false;
		        $thematicMapFrame15.ui.mapList[0].chartReload = false;
		        $thematicMapFrame15.ui.mapList[0].changeRegionBound();
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
			
			$thematicMapFrame15.ui.mapList[0].isChartClick = true;
			$thematicMapFrame15.ui.mapList[0].isDataboardReset = false;
			$thematicMapFrame15.ui.mapList[0].chartReload = false;
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
				 $(".interactiveDataBoard").addClass("on").stop().animate({"right":"285px"},200);//20년수정반영
			}else{
				 $(".sop-right").stop().animate({"right":"405px"},200);//20년수정반영
				 $(".interactiveDataBoard").addClass("on").stop().animate({"right":"285px"},200);//20년수정반영
			}
			
		}else{
			$(".dataSideBox").stop().animate({"right":"-1500px"},200);
			$(".sop-right").stop().animate({"right":"0px"},200);//20년수정반영
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
	//박길섭 추가
	body.on("click", ".nav-sidebar li a", function(){ 
		// 추가 부분
		var index=$(this).parent("li").index();
		$(".nav-sidebar li a").removeClass("on");
		$(".nav-sidebar li").eq(index).find("a").addClass("on");
			});
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
	
	body.on("click", ".sideQuick.sq02,.stepClose", function(){ //20년수정반영(.stepClose추가
		if($(this).hasClass('step01_stepClose')) return; //[목록] 열기_닫기는 별개로 작동하도록 if문 추가 //200423수정 (7번. LeftMenu 닫기 버튼 안됨 , 소스추가 - 분석지도(대화통계지도))
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
						$thematicMapFrame15.getCategoryList.getMenuList(theme);
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
					$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
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
		//코로나추가 20200722 주용민
		if(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw"){
			$(".dataSideBox").css("height","550px");
			$(".covidDbTabs").css("display","table");
		}
		//코로나추가 20200722 주용민
		//시계열 초기화
		var map = $thematicMapFrame15.ui.mapList[0];
		map.isTimeSeries = false;
		map.timeSeriesLayer = [];
		clearInterval(map.timer);
		$("#timeSeries_off").click();
		
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		var id = $(this).attr("id");
		if (id == "leftValue") {
			$("#selectValue").val("leftValue");
		}else if (id == "rightValue") {
			$("#selectValue").val("rightValue");
		}else {
			$("#selectValue").val("etcValue");
		}
				
/*		if( $("#selectValue").val()=="leftValue"){
			$("#selectValue").val("rightValue");
		}else{
			$("#selectValue").val("leftValue");
		}
			*/	
	}); 
	
	// mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
	body.on("click", ".sqList #change_stat_thema a", function() {
		//시계열 초기화
		var map = $thematicMapFrame15.ui.mapList[0];
		map.isTimeSeries = false;
		map.timeSeriesLayer = [];
		clearInterval(map.timer);
		$("#timeSeries_off").click();
		
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
	});
	// mng_e 2020. 12. 01 j.h.Seok 통계주제도 통합
	
	body.on("click",".sqList #map_type a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
				
//		if( $("#dataMode").val()=="color"){
//			$("#dataMode").val("bubble");
//		}else{
//			$("#dataMode").val("color");
//		}
		
		if($(this).attr('id') == "color"){
			$("#dataMode").val("color");
			if(!(window.parent.$thematicMapMain.param.stat_thema_map_id == "sAXkcVzk5V202007141335257355ued9032uw" || window.parent.$thematicMapMain.param.stat_thema_map_id == "RZ3pr7Maou20201106160851389D0RGtYCGpW"))
			$("#region_boundary").show();
			//코로나추가 20200722 주용민
			$("#data_type").show();
		}
		else if($(this).attr('id') == "bubble")
			$("#dataMode").val("bubble");
		else if($(this).attr('id') == "pieChart"){
			$("#dataMode").val("pieChart");
			$("#pieChartFlag").val("on");
			
			// mng_s 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
			$("#selectValue2").val("auto");
			initTopBottomButtons();
			// mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출
		}
	}); 
	//코로나추가 20200722 주용민	
	body.on("click",".sqList #covid_type a", function(){
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
	}); 
	//코로나추가 20200722 주용민
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
	
	
	body.on("click",".sqList #region_boundary a", function(){
		//시계열 초기화
		var map = $thematicMapFrame15.ui.mapList[0];
		map.isTimeSeries = false;
		map.timeSeriesLayer = [];
		$("#timeSeries_off").click();
		
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
		//코로나추가 20200722 주용민			
		}else if($(this).attr('id') == "covid"){
			$("#selectValue2").val("4");
			initTopBottomButtons();
		}
		//코로나추가 20200722 주용민		
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
	
	//2016.07.11 시계열추가
	body.on("click",".sqList #timeSeries_type a", function(){
		var map = $thematicMapFrame15.ui.mapList[0];
		map.timeSeriesLayer = [];
		clearInterval(map.timer);
		
		// 클릭한 버튼에 on이 있으면 빠져나간다.
		if($(this).hasClass("on")){
			return;
		}
		//li 아래 
		$(this).parents("li").eq(0).find("a").removeClass("on");
		$(this).addClass("on");
		
		if( $("#timeSeries").val()=="dataOff"){
			$("#timeSeries").val("dataOn");
		}else{
			$("#timeSeries").val("dataOff");
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
	/*quick step*/
	//20년수정반영 시작
	/*
	body.on("click",".stepClose",function(){
        stepCloseAnimate(parseInt($(this).index(".stepClose")+1));
    }); 
    */
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

//코로나추가 20200730 jrj
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
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

	$thematicMapFrame15.ui.mapList[0].topBottomState = "OFF";
	$thematicMapFrame15.ui.mapList[0].topBottomType = "both";
	$thematicMapFrame15.ui.mapList[0].topBottomCount = "10";
}
//mng_e 2019. 11. 21 j.h.Seok 이용자 중심 서비스 개편 - 상하위 10개 표출

