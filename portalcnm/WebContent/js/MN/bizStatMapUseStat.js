/**   
 *
 * @JSName: totUseStat.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/04/05/ 10:30:00    
 * @version V1.0      
 *    
 */

//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  start
var viewGubn = [0, 0, 0, 0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["방문자수", "페이지뷰"]; //bar
var chartSeriesArray2 = ["페이지뷰", "연간 페이지뷰"]; //bar
var chartSeriesArray3 = ["조회수"]; //bar
var chartSeriesArray4 = ["페이지뷰", "연간 페이지뷰"]; //bar
var chartCategoriesArray1 = [];
var chartCategoriesArray2 = [];
var chartCategoriesArray3 = [];
var chartCategoriesArray4 = [];
var chartDataArray1 = [];
var chartDataArray2 = [];
var chartDataArray3 = [];
var chartDataArray4 = [];
//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  end

$(function () {
	//init();
	srvLogWrite("L0", "01", "03", "05", "", "");
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "05", "", "");
		 getHouseAnalMapMenu();		//메뉴별 이용현황
		 getPopSearchTheme();		//인기 검색 업종
		 getBizStatintPoi();		//인기 POI
		 getBizStatIntSear();
  	  }));
	 
	 $("#bizStatMapTblExcelBtn").on('click',(function(e){
		 excelDownload("bizStatMapTblExcel.xls", "bizStatMapTbl");
	 }));
	 
	 $("#popSearchThemeTblExcelBtn").on('click',(function(e){
		 excelDownload("popSearchThemeTblExcel.xls", "popSearchThemeTbl");
	 }));
	 
	 $("#bizStatIntPoiTblExcelBtn").on('click',(function(e){
		 excelDownload("bizStatintPoiTblExcel.xls", "bizStatintPoiTbl");
	 }));
	 $("#bizStatIntSearTblExcelBtn").on('click',(function(e){
		 excelDownload("bizStatIntSearTblExcel.xls", "bizStatIntSearTbl");
	 }));
	 
	 $("#totExcelBtn").on('click',(function(e){
		 var tblArray = ["bizStatMapTbl", "popSearchThemeTbl", "bizStatintPoiTbl", "bizStatIntSearTbl"];
		 excelDownload2("bizStatsTotal.xls", tblArray);
  	  }));
	 
});





function init(){
	setFormAction();
	nowYearMonth();
	getHouseAnalMapMenu();		//메뉴별 이용현황
	setTimeout(function(){
		getPopSearchTheme();		//인기 검색 업종
	},500);
	setTimeout(function(){
		getBizStatintPoi();			//인기 POI
	},700);
	setTimeout(function(){
		getBizStatIntSear();		//인기 검색조건
	},900);
	
	//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  start
	$("#bizStatMapGraphView").hide();
	$("#bizStatintPoiGraphView").hide();
	$("#popSearchThemeGraphView").hide();
	$("#bizStatIntSearGraphView").hide();
	//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  end
}


//moreViewBtn



function getHouseAnalMapMenu(){
	
	 var year = $("#yearSel").val();
	 var month = $("#monthSel").val();
	 
	 
	 //메뉴 조회
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getMenuView",
 				"year"					:	year	,
				"month"					:	month	,
				"type"					:	"B0"
 			  },
 		success:function(data){
 			/*
 			 * 
 			var swt = true;
 			$("#bizStatMapTbl tr").each(function(){
 				if(swt){
 					swt = false;
 				}else{
 					$(this).remove();
 				}
 			});
 			 * 
 			 */
 			
 				
 	//			nowYear = data.result.getTotStatView[0].NOWYEAR;
 			
 			for(var i=0; i<data.result.getMenuView.length; i++){
 				var s_code_nm = data.result.getMenuView[i].S_CODE_NM;
 				var visitView = data.result.getMenuView[i].VISITVIEW;
 				var pageView = data.result.getMenuView[i].PAGEVIEW;
 				var monthVisitView = data.result.getMenuView[i].MONTHVISITVIEW;
 				var monthPageView = data.result.getMenuView[i].MONTHPAGEVIEW;
 				var api_id = data.result.getMenuView[i].API_ID;
 				
 				
 				if("B25" == api_id){
					jQuery("#visitMonth1").html(monthVisitView);
					jQuery("#viewMonth1").html(monthPageView);
 				}else if("B26" == api_id){
 					jQuery("#visitMonth2").html(monthVisitView);
 					jQuery("#viewMonth2").html(monthPageView);
 				}else if("B27" == api_id){
 					jQuery("#visitMonth3").html(monthVisitView);
 					jQuery("#viewMonth3").html(monthPageView);
 				/*}else if("B28" == api_id){
 					jQuery("#visitMonth4").html(monthVisitView);
 					jQuery("#viewMonth4").html(monthPageView);
*/ 				}else if("B29" == api_id){
 					jQuery("#visitMonth5").html(monthVisitView);
 					jQuery("#viewMonth5").html(monthPageView);
 				}else if("B30" == api_id){
 					jQuery("#visitMonth6").html(monthVisitView);
 					jQuery("#viewMonth6").html(monthPageView);
 				}else if("B31" == api_id){
 					jQuery("#visitMonth7").html(monthVisitView);
 					jQuery("#viewMonth7").html(monthPageView);
 				}else if("B34" == api_id){
 					jQuery("#visitMonth8").html(monthVisitView);
 					jQuery("#viewMonth8").html(monthPageView);
 				}else if("B06" == api_id){
 					jQuery("#visitMonth9").html(monthVisitView);
 					jQuery("#viewMonth9").html(monthPageView);
 				}else if("B03" == api_id){
 					jQuery("#visitMonth10").html(monthVisitView);
 					jQuery("#viewMonth10").html(monthPageView);
 				}else if("B12" == api_id){
 					jQuery("#visitMonth11").html(monthVisitView);
 					jQuery("#viewMonth11").html(monthPageView);
 				}else if("B14" == api_id){
 					jQuery("#visitMonth12").html(monthVisitView);
 					jQuery("#viewMonth12").html(monthPageView);
 				}else if("B35" == api_id){
 					jQuery("#visitMonth13").html(monthVisitView);
 					jQuery("#viewMonth13").html(monthPageView);
 				}else if("B02" == api_id){
 					jQuery("#visitMonth14").html(monthVisitView);
 					jQuery("#viewMonth14").html(monthPageView);
 				}else if("B07" == api_id){
 					jQuery("#visitMonth15").html(monthVisitView);
 					jQuery("#viewMonth15").html(monthPageView);
 				}else if("B08" == api_id){
 					jQuery("#visitMonth16").html(monthVisitView);
 					jQuery("#viewMonth16").html(monthPageView);
 				}else if("B04" == api_id){
 					jQuery("#visitMonth17").html(monthVisitView);
 					jQuery("#viewMonth17").html(monthPageView);
 				}else if("B10" == api_id){
 					jQuery("#visitMonth18").html(monthVisitView);
 					jQuery("#viewMonth18").html(monthPageView);
 				}else if("B11" == api_id){
 					jQuery("#visitMonth19").html(monthVisitView);
 					jQuery("#viewMonth19").html(monthPageView);
 				}else if("B05" == api_id){
 					jQuery("#visitMonth20").html(monthVisitView);
 					jQuery("#viewMonth20").html(monthPageView);
 				}else if("B15" == api_id){
 					jQuery("#visitMonth21").html(monthVisitView);
 					jQuery("#viewMonth21").html(monthPageView);
 				}else if("B16" == api_id){
 					jQuery("#visitMonth22").html(monthVisitView);
 					jQuery("#viewMonth22").html(monthPageView);
 				}else if("B01" == api_id){
 					jQuery("#visitMonth23").html(monthVisitView);
 					jQuery("#viewMonth23").html(monthPageView);
/* 				}else if("B19" == api_id){
 					jQuery("#visitMonth24").html(monthVisitView);
 					jQuery("#viewMonth24").html(monthPageView);
 				}else if("B20" == api_id){
 					jQuery("#visitMonth25").html(monthVisitView);
 					jQuery("#viewMonth25").html(monthPageView);*/
 				}else if("B21" == api_id){
 					jQuery("#visitMonth26").html(monthVisitView);
 					jQuery("#viewMonth26").html(monthPageView);
 				}else if("B22" == api_id){
 					jQuery("#visitMonth27").html(monthVisitView);
 					jQuery("#viewMonth27").html(monthPageView);
 				}else if("B36" == api_id){
 					jQuery("#visitMonth28").html(monthVisitView);
 					jQuery("#viewMonth28").html(monthPageView);
 				}else if("B17" == api_id){
 					jQuery("#visitMonth29").html(monthVisitView);
 					jQuery("#viewMonth29").html(monthPageView);
 				}else if("B38" == api_id){
 					//alert("B38");
 					//alert("B38");
 					//alert("B38");
 					jQuery("#visitMonth30").html(monthVisitView);
 					jQuery("#viewMonth30").html(monthPageView);
 				}else if("B39" == api_id){
 					jQuery("#visitMonth31").html(monthVisitView);
 					jQuery("#viewMonth31").html(monthPageView);
 				} 
 				
 				
 				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview


	 			//	str += "<td style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
 				
 			}
 			
 			for(var i=1; i<=29; i++){
 				if("" == jQuery("#viewMonth" + i).html()){
 					jQuery("#viewMonth" + i).html("0");
 				}
 				if("" == jQuery("#visitMonth" + i).html()){
 					jQuery("#visitMonth" + i).html("0");
 				}
 			}
 			for(var i=1; i<=29; i++){
 					jQuery("#viewMonth" + i).html(appendCommaToNumber(jQuery("#viewMonth" + i).html()));
 					jQuery("#visitMonth" + i).html(appendCommaToNumber(jQuery("#visitMonth" + i).html()));
 			}
 			
 			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray1 = 
 				["시도 생활업종 정보","시도 생활업종 순위","시도 생활업종 그룹별 속성",
 				 "전국 시군구 생활업종 업체수","시군구 생활업종 정보","시군구 생활업종 순위",
 				 "업종밀집도 시계열 현황",
 				 "지역종합현황","사업체","사업체-업종별비율","사업체-업종별증감","사업체-주요시설물 정보","인구","인구-연령별","인구-성별","가구","가구-거처종류","가구-점유형태","주택","주택-주택거래가격","주택-주택거래량",
 				 "지역찾기",
 				 "지하철승하차인구","버스정류장",
 				 "나의데이터",
 				 "POI"]; 
 			chartDataArray1 = [];
 			var monthVisitViewArray = [];
 			var monthPageViewArray = [];
 			
 			//차트 데이터 담기
 			for(var i=1; i<=29; i++){
 				if(i != 4 && i != 24 && i != 25) {
 					monthVisitViewArray.push(Number(($("#visitMonth" + i).html() + "").replace(",","")));
 	 				monthPageViewArray.push(Number(($("#viewMonth" + i).html() + "").replace(",","")));
 				} 
			}
 			
			var map = [];
			map.push(monthVisitViewArray);
			map.push(monthPageViewArray);
			
			//chart Series
			for(var j=0; j<chartSeriesArray1.length; j++) {
				var obj = 
					{
						name : chartSeriesArray1[j],
						data : map[j]
					};
				
				chartDataArray1.push(obj);
			}
			createChart("bar", "bizStatMapGraphView");
			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  end
 			
 		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}


//pop_search_theme
function getPopSearchTheme(){
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getPopSearchTheme",
			"year"					:	year	,
			"month"					:	month	
		},
		success:function(data){
			var swt = true;
			$("#popSearchThemeTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray3 = []; 
 			chartDataArray3 = [];
 			var cntArray = [];
 			
			for(var i=0; i<data.result.getPopSearchTheme.length; i++){
				var cnt = data.result.getPopSearchTheme[i].CNT;
				var themeNm = data.result.getPopSearchTheme[i].THEME_NM;
			//	var apiNm = data.result.getPopSearchTheme[i].API_NM;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				var str = "";
				
				str += "<tr>";
				str += "<td >" + (i+1) + " 위 </td>";
				str += "<td>" + appendCommaToNumber(themeNm) + "</td>";
			//	str += "<td>" + appendCommaToNumber(apiNm) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(cnt) + "</td>";
				str += "</tr>";
				
				$("#popSearchThemeBdy").append(str);
				
				//차트 데이터 담기
 				chartCategoriesArray3.push(themeNm);
 				cntArray.push(Number(cnt));
 			}
 			
 			var map = [];
 			map.push(cntArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray3.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray3[j],
 						data : map[j]
 					};
 				
 				chartDataArray3.push(obj);
 			}
 			createChart("bar", "popSearchThemeGraphView");
			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}


//생활업종지도 이용현황
function getBizStatintPoi(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getBizStatintPoi",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			
			var swt = true;
			$("#bizStatintPoiBdy tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray2 = []; 
 			chartDataArray2 = [];
 			var mon_cntArray = [];
 			var yr_cntArray = [];
 			
			for(var i=0; i<data.result.getBizStatintPoi.length; i++){
				var poi_nm = data.result.getBizStatintPoi[i].POI_NM;
				var yr_cnt = data.result.getBizStatintPoi[i].YR_CNT;
				var mon_cnt = data.result.getBizStatintPoi[i].MON_CNT;
				
				var str = "";
				
				str += "<tr>";
				str += "<td style='border:1px solid #cacaca;'>" + (i+1) + " 위 </td>";
				str += "<td style='border:1px solid #cacaca;'>" + poi_nm + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(mon_cnt) + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(yr_cnt) + "</td>";
				str += "</tr>";
				
				$("#bizStatintPoiTbl").append(str);
				
				//차트 데이터 담기
 				chartCategoriesArray2.push(poi_nm);
 				mon_cntArray.push(Number(mon_cnt));
 				yr_cntArray.push(Number(yr_cnt));
 			}
 			
 			var map = [];
 			map.push(mon_cntArray);
 			map.push(yr_cntArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray2.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray2[j],
 						data : map[j]
 					};
 				
 				chartDataArray2.push(obj);
 			}
 			createChart("bar", "bizStatintPoiGraphView");
			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}


//생활업종지도 인기검색조건
function getBizStatIntSear(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getBizStatIntSear",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			

			var swt = true;
			$("#bizStatIntSearTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray4 = []; 
 			chartDataArray4 = [];
 			var moncntArray = [];
 			var yearcntArray = [];
			
			for(var i=0; i<data.result.getBizStatIntSear.length; i++){
				var title = data.result.getBizStatIntSear[i].TITLE;
				var moncnt = data.result.getBizStatIntSear[i].MONCNT;
				var yearcnt = data.result.getBizStatIntSear[i].YEARCNT;
				
				var str = "";
				
				str += "<tr>";
				str += "<td style='border:1px solid #cacaca;'>" + (i+1) + " 위 </td>";
				str += "<td style='border:1px solid #cacaca;'>" + title + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(moncnt) + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(yearcnt) + "</td>";
				str += "</tr>";
				
				$("#bizStatIntSearBdy").append(str);
				
				//차트 데이터 담기
				//길이 20자로 제한
				if(title.length > 20) {
					title = title.substr(0, 20) + "..";
				}
 				chartCategoriesArray4.push(title);
 				moncntArray.push(Number(moncnt));
 				yearcntArray.push(Number(yearcnt));
 			}
 			
 			var map = [];
 			map.push(moncntArray);
 			map.push(yearcntArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray4.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray4[j],
 						data : map[j]
 					};
 				
 				chartDataArray4.push(obj);
 			}
 			createChart("bar", "bizStatIntSearGraphView");
			//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}

//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	var tempCategories = []; tempSeries = []; tempPlotOptions = { visible: false }; tempFontSize = "12px";
	
	if(str2 == "bizStatMapGraphView") {
		tempCategories = chartCategoriesArray1;
		tempSeries = chartDataArray1;
	} else if(str2 == "bizStatintPoiGraphView") {
		tempCategories = chartCategoriesArray2;
		tempSeries = chartDataArray2;
	} else if(str2 == "popSearchThemeGraphView") {
		tempCategories = chartCategoriesArray3;
		tempSeries = chartDataArray3;
	} else {
		tempCategories = chartCategoriesArray4;
		tempSeries = chartDataArray4;
		tempFontSize = "10px";
	}
	
	$("#"+str2).highcharts({
	    chart: {
	        type: str1
	    },
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	    	categories : tempCategories,
	        labels: {
	            rotation: 0,
	            style: {
	                fontSize: '12px',
	                fontFamily: 'Verdana, sans-serif'
	            }
	        }
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: ''
	        },
	        labels: {
	            rotation: 0,
	            style: {
	                fontSize: tempFontSize,
	                fontFamily: 'Verdana, sans-serif'
	            }
	        }
	    },
	    legend: {
	        enabled: true
	    },
	    plotOptions: tempPlotOptions,
	    series: tempSeries
	});
}

//표 <-> 그래프 전환
//gubn : 0(메뉴별 이용현황) 1(인기 POI) 2(인기검색업종(업종별 지역 현황, 업종 밀집도 변화)) 3(인기 검색조건)  
//str1 : 표 id, str2 : 그래프 id, str3 : 버튼 id
function changeType(gubn, str1, str2, str3) {
	if(viewGubn[gubn] == 0) { // 현재 표 -> 그래표 전환
		 viewGubn[gubn] = 1;
		 $("#"+str1).hide();
		 $("#"+str2).show();
		 $("#"+str3).html('<img style="margin-top:5px;" src="./../include/img/btn/btn_grid_view.png" alt="표보기" />');
	 } else { // 현재 그래프 -> 표 전환
		 viewGubn[gubn] = 0;
		 $("#"+str1).show();
		 $("#"+str2).hide();
		 $("#"+str3).html('<img style="margin-top:5px;" src="./../include/img/btn/btn_graph_view.png" alt="그래프보기" />');
	 }
}
//2017.07.19 [개발팀] khc 생활업종지도 이용현황 그래프보기 추가  end