/**   
 *
 * @JSName: totUseStat.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/05/03/ 10:30:00    
 * @version V1.0      
 *    
 */

//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  start
var viewGubn = [0, 0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["페이지뷰", "방문자수", "연간 페이지뷰", "연간 방문자수"]; //column
var chartSeriesArray2 = ["월간 페이지뷰", "월간 방문자수", "연간 페이지뷰", "연간 방문자수"]; //bar
var chartCategoriesArray1 = [];
var chartCategoriesArray2 = [];
var chartDataArray1 = [];
var chartDataArray2 = [];
//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  end

$(function () {
	//init();
	
	srvLogWrite("L0", "01", "03", "09", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "09", "", "");
		 getPolicyStaticMapMenu();
		 getPopPol();
  	  }));
	 
	 $("#totExcelBtn").on('click',(function(e){
		 var tblArray = ["policyStaticMapMenuTbl", "popPolTbl"];
		 excelDownload2("policyTotal.xls", tblArray);
  	  }));
	 
	 
	 $("#getPolicyStaticMapMenuExcelBtn").on('click',(function(e){
		 excelDownload("getPolicyStaticMapTableExcel.xls", "policyStaticMapMenuTbl");
  	  }));
	 
	 $("#popPolTblExcelBtn").on('click',(function(e){
		 excelDownload("getPopPolTbl.xls", "popPolTbl");
	 }));
});





function init(){
	setFormAction();
	nowYearMonth();
	getPolicyStaticMapMenu();		//메뉴별 이용현황
	setTimeout(function(){
		getPopPol();		//인기지표
	},500);
	
	//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  start
	$("#policyStaticMapMenuGraphView").hide();
	$("#popPolGraphView").hide();
	//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  end
}


//moreViewBtn



function getPolicyStaticMapMenu(){
	
	 var year = $("#yearSel").val();
	 var month = $("#monthSel").val();
	 
	 
	 //메뉴 조회
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getPolicyStaticMapMenu",
 				"year"					:	year	,
				"month"					:	month	,
				"type"					:	"S0"
 			  },
 		success:function(data){
 			
 			var swt = true;
 			$("#policyStaticMapMenuTbl tr").each(function(){
 				if(swt){
 					swt = false;
 				}else{
 					$(this).remove();
 				}
 			});
 			
 			var str1 = "";
			var str2 = "";
			var str3 = "";
			var str4 = "";
			var str5 = "";
			var str6 = "";
			var str7 = "";
			var str8 = "";
			var str9 = "";
			var str10 = "";
			var str11 = "";
 	//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray1 = []; 
 			chartDataArray1 = [];
 			var monPageCntArray = [];
 			var monVisitCntArray = [];
 			var yearPageCntArray = [];
 			var yearVisitCntArray = [];
			
 			for(var i=0; i<data.result.getPolicyStaticMapMenu.length; i++){
 				var gubun_1_nm = data.result.getPolicyStaticMapMenu[i].MON_GUBUN_1_NM;
 				var gubun_1 = data.result.getPolicyStaticMapMenu[i].MON_GUBUN_1;
 				var monPageCnt = data.result.getPolicyStaticMapMenu[i].MON_PAGE_CNT;
 				var monVisitCnt = data.result.getPolicyStaticMapMenu[i].MON_VISIT_CNT;
 				var yearPageCnt = data.result.getPolicyStaticMapMenu[i].YEAR_PAGE_CNT;
 				var yearVisitCnt = data.result.getPolicyStaticMapMenu[i].YEAR_VISIT_CNT

 				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview

 				
 				if(monPageCnt != "0"){
 					
 					var str = "";
 					str += "<tr>";
 					str += "<td >" + gubun_1_nm + "</td>";
 					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monPageCnt) + "</td>";
 					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monVisitCnt) + "</td>";
 					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(yearPageCnt) + "</td>";
 					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(yearVisitCnt) + "</td>";
 					str += "</tr>";
 					if(gubun_1 == "P"){
 						str1 = str;
 					}
 					if(gubun_1 == "F"){
 						str2 = str;
 					}
 					if(gubun_1 == "B"){
 						str3 = str;
 					}
 					if(gubun_1 == "C"){
 						str4 = str;
 					}
 					if(gubun_1 == "L"){
 						str5 = str;
 					}
 					if(gubun_1 == "JP01"){
 						str6 = str;
 					}
 					if(gubun_1 == "JP02"){
 						str7 = str;
 					}
 					if(gubun_1 == "JP03"){
 						str8 = str;
 					}
 					if(gubun_1 == "JP04"){
 						str9 = str;
 					}
 					if(gubun_1 == "JP05"){
 						str10 = str;
 					}
 					if(gubun_1 == "JP06"){
 						str11 = str;
 					}
 					
 					//차트 데이터 담기
 					chartCategoriesArray1.push(gubun_1_nm);
 					monPageCntArray.push(Number(monPageCnt));
 					monVisitCntArray.push(Number(monVisitCnt));
 					yearPageCntArray.push(Number(yearPageCnt));
 					yearVisitCntArray.push(Number(yearVisitCnt));
 				}
 			}
 			
 			var map = [];
 			map.push(monPageCntArray);
 			map.push(monVisitCntArray);
 			map.push(yearPageCntArray);
 			map.push(yearVisitCntArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray1.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray1[j],
 						data : map[j]
 					};
 				
 				chartDataArray1.push(obj);
 			}
 			createChart("column", "policyStaticMapMenuGraphView");
			//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  end
 			
 			$("#policyStaticMapMenuBody").append(str1);
 			$("#policyStaticMapMenuBody").append(str2);
 			$("#policyStaticMapMenuBody").append(str3);
 			$("#policyStaticMapMenuBody").append(str4);
 			$("#policyStaticMapMenuBody").append(str5);
 			$("#policyStaticMapMenuBody").append(str6);
 			$("#policyStaticMapMenuBody").append(str7);
 			$("#policyStaticMapMenuBody").append(str8);
 			$("#policyStaticMapMenuBody").append(str9);
 			$("#policyStaticMapMenuBody").append(str10);
 			$("#policyStaticMapMenuBody").append(str11);
 			
 			
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

function getPopPol(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getPopPol",
			"year"					:	year	,
			"month"					:	month	,
			"type"					:	"S0"
		},
		success:function(data){
			
			var swt = true;
			$("#popPolTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray2 = []; 
 			chartDataArray2 = [];
 			var mon_page_viewArray = [];
 			var mon_visit_viewArray = [];
 			var year_page_viewArray = [];
 			var year_visit_viewArray = [];
 			
			for(var i=0; i<data.result.getPopPol.length; i++){
				var s_code_nm = data.result.getPopPol[i].S_CODE_NM;
				var mon_page_view = data.result.getPopPol[i].MON_PAGE_VIEW;
				var mon_visit_view = data.result.getPopPol[i].MON_VISIT_VIEW;
				var year_page_view = data.result.getPopPol[i].YEAR_PAGE_VIEW;
				var year_visit_view = data.result.getPopPol[i].YEAR_VISIT_VIEW;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				if(mon_page_view != 0){	//2017년 개발사업 반영하면서 페이지뷰 변경됨
					
					var str = "";
					
					str += "<tr>";
					str += "<td style=\"text-align:center;\">" + (i+1) + "</td>";
					str += "<td  style=\"text-align:left;\">" + s_code_nm + "</td>";
					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(mon_page_view) + "</td>";
					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(mon_visit_view) + "</td>";
					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(year_page_view) + "</td>";
					str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(year_visit_view) + "</td>";
					str += "</tr>";
					
					$("#popPolBody").append(str);
					
					//차트 데이터 담기
					chartCategoriesArray2.push(s_code_nm);
					mon_page_viewArray.push(Number(mon_page_view));
					mon_visit_viewArray.push(Number(mon_visit_view));
					year_page_viewArray.push(Number(year_page_view));
					year_visit_viewArray.push(Number(year_visit_view));
				}
 			}
 			
 			var map = [];
 			map.push(mon_page_viewArray);
 			map.push(mon_visit_viewArray);
 			map.push(year_page_viewArray);
 			map.push(year_visit_viewArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray2.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray2[j],
 						data : map[j]
 					};
 				
 				chartDataArray2.push(obj);
 			}
 			createChart("bar", "popPolGraphView");
			//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  end
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

//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	var tempCategories = []; tempSeries = []; tempPlotOptions = { visible: false };
	
	if(str2 == "policyStaticMapMenuGraphView") {
		tempCategories = chartCategoriesArray1;
		tempSeries = chartDataArray1;
	} else {
		tempCategories = chartCategoriesArray2;
		tempSeries = chartDataArray2;
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
	                fontSize: '12px',
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
//gubn : 0(메뉴별 이용현황) 1(지역별 수요변화)  
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
//2017.07.20 [개발팀] khc 정책통계지도 이용현황 그래프보기 추가  end