/**   
 *
 * @JSName: interactiveMapStatUse.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/04/26/ 10:30:00    
 * @version V1.0      
 *    
 */

//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  start
var viewGubn = [0, 0, 0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["방문자수", "페이지뷰"]; //bar
var chartSeriesArray2 = ["페이지뷰", "페이지뷰 누계"]; //bar
var chartSeriesArray3 = ["용량"]; //bar
var chartSeriesArray4 = ["이용자수","데이터 건수","데이터 사용량","데이터 공개"]; //bar
var chartCategoriesArray1 = [];
var chartCategoriesArray2 = [];
var chartCategoriesArray3 = [];
var chartCategoriesArray4 = [];
var chartDataArray1 = [];
var chartDataArray2 = [];
var chartDataArray3 = [];
var chartDataArray4 = [];
//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  end

$(function () {
	//init();
	srvLogWrite("L0", "01", "03", "02", "", "");
	
	
	 $("#searchBtn").on('click',(function(e){
			getMenuUseView();
			getPopSearchCondiView();
			getMyDataTotalUseStat();
			getDataUseCntRank();
			//getIntHighFunUseStat();
  	  }));
	 
	 
	 $("#meneUseStatTableExcelBtn").on('click',(function(e){
		 excelDownload("meneUseStatTableExcel.xls", "meneUseStatTableTbl");
		 
  	  }));
	 
	 $("#popsearCondiTableTblExcelBtn").on('click',(function(e){
		 excelDownload("popsearCondiTableTblExcel.xls", "popsearCondiTableTbl");
		 $("#excelDownForm").submit();
	 }));
	 
	 $("#myDataTotalUseStatTabExcelBtn").on('click',(function(e){
		 excelDownload("myDataTotalUseStatTabExcel.xls", "myDataTotalUseStatTab");
		 $("#excelDownForm").submit();
	 }));
	 
	 $("#dataUseCntRankTabExcelBtn").on('click',(function(e){
		 excelDownload("dataUseCntRankTabExcel.xls", "dataUseCntRankTab");
		 $("#excelDownForm").submit();
	 }));
	 
	 $("#intHighFunUseStatTblExcelBtn").on('click',(function(e){
		 excelDownload("intHighFunUseStatTblExcel.xls", "intHighFunUseStatTbl");
		 $("#excelDownForm").submit();
	 }));
	 
	 $("#totExcelBtn").on('click',(function(e){
		 var tblArray = ["meneUseStatTableTbl", "popsearCondiTableTbl", "myDataTotalUseStatTab", "dataUseCntRankTab", "intHighFunUseStatTbl"];
		 excelDownload2("interactiveMapTotal.xls", tblArray);
  	  }));

});







function init(){
	nowYearMonth();
	getMenuUseView();
	setTimeout(function(){
		getPopSearchCondiView();
	},500);
	setTimeout(function(){
		//getIntHighFunUseStat();
	},800);
		setFormAction();
		getMyDataTotalUseStat();
		getDataUseCntRank();
		
	//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  start
	$("#meneUseStatGraphView").hide();
	$("#popsearCondiGraphView").hide();
	$("#dataUseCntRankGraphView").hide();
	$("#myDataTotalUseStatGraphView").hide();
	//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  end	
}


//moreViewBtn



function getMenuUseView(){
	//alert("메뉴별 이용현황은 코드테이블 생성 이후 구현 예정");
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
				"type"					:	"A0"
			  },
		success:function(data){

			
			var swt = true;
			$("#meneUseStatTableTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			
			var str_1 = "";	//총조사 주요지표
			var str_2 = "";	//인구주택총조사
			var str_3 = "";	//농림어업총조사
			var str_4 = "";	//전국사업체조사
			var str_5 = "";	//KOSIS
			var str_6 = "";	//공공데이터
			var str_7 = "";	//나의데이터
			var str_8 = "";	//사업체전개도
			var str_9 = "";	//POI
			var str_10 = "";	//그리드
			
			var swt_1 = true;
			var swt_2 = true;
			var swt_3 = true;
			var swt_4 = true;
			var swt_5 = true;
			var swt_6 = true;
			var swt_7 = true;
			var swt_8 = true;
			var swt_9 = true;
			var swt_10 = true;
			
				
	//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray1 = []; 
 			chartDataArray1 = [];
 			var monthVisitViewArray = [];
 			var monthPageViewArray = [];
			
			for(var i=0; i<data.result.getMenuView.length; i++){
				var s_code_nm = data.result.getMenuView[i].S_CODE_NM;
				var visitView = data.result.getMenuView[i].VISITVIEW;
				var pageView = data.result.getMenuView[i].PAGEVIEW;
				var monthVisitView = data.result.getMenuView[i].MONTHVISITVIEW;
				var monthPageView = data.result.getMenuView[i].MONTHPAGEVIEW;
				var bigo = data.result.getMenuView[i].BIGO;
				
				if(bigo == "총조사 주요지표"){
					str_1 += makeMenuUseStatTbl("1", swt_1, s_code_nm, monthVisitView, monthPageView);
					swt_1 = false;
				}else if(bigo == "인구주택총조사"){
					str_2 += makeMenuUseStatTbl("2", swt_2, s_code_nm, monthVisitView, monthPageView);
					swt_2 = false;
					
				}else if(bigo == "농림어업총조사"){
					str_3 += makeMenuUseStatTbl("3", swt_3, s_code_nm, monthVisitView, monthPageView);
					swt_3 = false;
					
				}else if(bigo == "전국사업체조사"){
					str_4 += makeMenuUseStatTbl("4", swt_4, s_code_nm, monthVisitView, monthPageView);
					swt_4 = false;
					
				}else if(bigo == "KOSIS"){
					str_5 += makeMenuUseStatTbl("5", swt_5, s_code_nm, monthVisitView, monthPageView);
					swt_5 = false;
					
				}else if(bigo == "공공데이터"){
					str_6 += makeMenuUseStatTbl("6", swt_6, s_code_nm, monthVisitView, monthPageView);
					swt_6 = false;
					
				}else if(bigo == "나의데이터"){
					str_7 += makeMenuUseStatTbl("7", swt_7, s_code_nm, monthVisitView, monthPageView);
					swt_7 = false;
					
				}else if(bigo == "사업체전개도"){
					str_8 += makeMenuUseStatTbl("8", swt_8, s_code_nm, monthVisitView, monthPageView);
					swt_8 = false;
				}else if(bigo == "POI"){
					str_9 += makeMenuUseStatTbl("9", swt_9, s_code_nm, monthVisitView, monthPageView);
					swt_9 = false;
				}else if(bigo == "그리드"){
					str_10 += makeMenuUseStatTbl("10", swt_10, s_code_nm, monthVisitView, monthPageView);
					swt_10 = false;
					
				}
				
				
				

				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview

				
/*
 * 
					str += "<tr>";
	 				str += "<td >" + s_code_nm + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthVisitView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(pageView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(visitView) + "</td>";
					str += "</tr>";
				
				$("#meneUseStatTableBody").append(str);
 */
				//차트 데이터 담기
				chartCategoriesArray1.push(s_code_nm);
				monthVisitViewArray.push(Number(monthVisitView));
				monthPageViewArray.push(Number(monthPageView));
			}
			
			$("#meneUseStatTableBody").append(str_1);
			$("#meneUseStatTableBody").append(str_2);
			$("#meneUseStatTableBody").append(str_3);
			$("#meneUseStatTableBody").append(str_4);
			$("#meneUseStatTableBody").append(str_5);
			$("#meneUseStatTableBody").append(str_6);
			$("#meneUseStatTableBody").append(str_7);
			$("#meneUseStatTableBody").append(str_8);
			$("#meneUseStatTableBody").append(str_9);
			$("#meneUseStatTableBody").append(str_10);
			
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
			createChart("bar", "meneUseStatGraphView");
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
		/*},
		error:function(data) {
			
			alert("ajaxFail");
			alert(data);
		}*/

	});
}

function makeMenuUseStatTbl(gb, swt, s_code_nm, monthVisitView, monthPageView){
	var str = "";
	if(gb=="1" && swt){
		str += "<tr><td>총조사 주요지표</td>";	//총조사 주요지표
	}else if(gb=="1" && !swt){
		alert("if gb" + gb);
	}
	if(gb=="2" && swt){
		str += "<tr><td>인구주택총조사</td>";	//인구주택총조사
	}else if(gb=="2" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="3" && swt){
		str = "<tr><td>농림어업총조사</td>";	//농림어업총조사
	}else if(gb=="3" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="4" && swt){
		str = "<tr><td>전국사업체조사</td>";	//전국사업체조사
	}else if(gb=="4" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="5" && swt){
		str = "<tr><td>KOSIS</td>";	//KOSIS
	}else if(gb=="5" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="6" && swt){
		str = "<tr><td>공공데이터</td>";	//공공데이터
	}else if(gb=="6" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="7" && swt){
		str = "<tr><td>나의데이터</td>";	//나의데이터
	}else if(gb=="7" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="8" && swt){
		str = "<tr><td>사업체전개도</td>";	//사업체전개도
	}else if(gb=="8" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="9" && swt){
		str = "<tr><td>POI</td>";	//POI
	}else if(gb=="9" && !swt){
		str += "<tr><td></td>";
	}
	if(gb=="10" && swt){
		str = "<tr><td>그리드</td>";	//POI
	}else if(gb=="10" && !swt){
		str += "<tr><td></td>";
	}
	
	str += "<td>" + s_code_nm + "</td>";
	str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
	str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthVisitView) + "</td>";
	str += "</tr>";
	
	
	return str;
}


function getPopSearchCondiView(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	//활용사례 상세조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getPopSearchCondiView",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			
			var swt = true;
			$("#popsearCondiTableBody tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray2 = []; 
 			chartDataArray2 = [];
 			var monCntArray = [];
 			var totCntArray = [];
 			
			for(var i=0; i<data.result.getPopSearchCondiView.length; i++){
				var totTitle = data.result.getPopSearchCondiView[i].TOTTITLE;
				var totCnt = data.result.getPopSearchCondiView[i].TOTCNT;
				var monCnt = data.result.getPopSearchCondiView[i].MONCNT;
				
				var str = "";
				
				str += "<tr>";
				str += "<td style='border:1px solid #cacaca;'>" + (i+1) + " 위 </td>";
				str += "<td style='border:1px solid #cacaca;'>" + totTitle + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(monCnt) + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(totCnt) + "</td>";
				str += "</tr>";
				
				$("#popsearCondiTableBody").append(str);
				
				//차트 데이터 담기
				chartCategoriesArray2.push(totTitle);
				monCntArray.push(Number(monCnt));
				totCntArray.push(Number(totCnt));
			}
			
			var map = [];
			map.push(monCntArray);
			map.push(totCntArray);
			
			//chart Series
			for(var j=0; j<chartSeriesArray2.length; j++) {
				var obj = 
					{
						name : chartSeriesArray2[j],
						data : map[j]
					};
				
				chartDataArray2.push(obj);
			}
			createChart("bar", "popsearCondiGraphView");
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}	
		/*},
		error:function(data) {
			
			alert("ajaxFail");
			alert(data);
		}*/
	});
}


function getMyDataTotalUseStat(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	jQuery.ajax({
		type:"POST",
		url: "https://sgis.kostat.go.kr/s-portalcnm/jsp/myPageData/myPageData.jsp",
		dataType:'text', 
		data:{
			"gubun" 				: "getMyDataTotalUseStat"
		},
		success:function(request){
			
			
			$("#myDataTotalUseStatBody").html(request);
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray4 = []; 
 			chartDataArray4 = [];
 			var tdArray = [];
 			var dataNameArray = [];
 			var idArray = [];
 			var sizeArray = [];
 			
 			$('#myDataTotalUseStatBody td').each(function() {
 				tdArray.push($(this).html());   
 			});
 			
 			for(var i=0; i<tdArray.length; i++) {
 				if((i+1)%4 == 2) {
 					dataNameArray.push(tdArray[i]);
 				} else if((i+1)%4 == 3) {
 					idArray.push(tdArray[i]);
 				} else if((i+1)%4 == 0) {
 					sizeArray.push(Number(tdArray[i].replace(/,/gi, "")));
 				}
 			}
 			
 			for(var i=0; i<dataNameArray.length; i++) {
 				chartCategoriesArray4.push(dataNameArray[i] + "(" + idArray[i] + ")");	
 			}
			
			//chart Series
			for(var j=0; j<chartSeriesArray4.length; j++) {
				var obj = 
					{
						name : chartSeriesArray4[j],
						data : sizeArray
					};
				
				chartDataArray4.push(obj);
			}
			createChart("bar", "myDataTotalUseStatGraphView");
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  end
			
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}	
		/*},
		error:function(request,statu,error) {
			alert(
				"c1ode :" + request.status + "   " + request.responseText + "     " + error 	
			);
			
		}*/
	});
}

//고급기능 이용현황
function getIntHighFunUseStat(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	//활용사례 상세조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getIntHighFunUseStat",
			"year"					:	year	,
			"month"					:	month	,
		},
		success:function(data){
			
			
			var swt = true;
			$("#intHighFunUseStatBdy tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			for(var i=0; i<data.result.getIntHighFunUseStat.length; i++){
				
				
				var s_code_nm = data.result.getIntHighFunUseStat[i].S_CODE_NM;
				var monthpageview = data.result.getIntHighFunUseStat[i].MONTHPAGEVIEW;
				var pageview = data.result.getIntHighFunUseStat[i].PAGEVIEW;
				
				var str = "";
				
				str += "<tr>";
				str += "<td style='border:1px solid #cacaca;'>" + s_code_nm + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(monthpageview) + "</td>";
				str += "<td style='border:1px solid #cacaca; text-align:right;'>" + appendCommaToNumber(pageview) + "</td>";
				str += "</tr>";
				
				$("#intHighFunUseStatTbl").append(str);
				
				
			}
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}	
		/*},
		error:function(data) {
			
			alert("ajaxFail");
			alert(data);
		}*/
	});
}


function getDataUseCntRank(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	jQuery.ajax({
		type:"POST",
		url: "https://sgis.kostat.go.kr/s-portalcnm/jsp/myPageData/myPageData.jsp",
		dataType:'text', 
		data:{
			"gubun" 				: "getDataUseCntRank"
		},
		success:function(request){
			
			
			var swt = true;
 			$("#dataUseCntRankBody tr").each(function(){
 				if(swt){
 					swt = false;
 				}else{
 					$(this).remove();
 				}
 			});
			
			
			$("#dataUseCntRankBody").append(request);
			
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray3 = []; 
 			chartDataArray3 = [];
 			var tdArray = [];
 			var dataNameArray = [];
 			var idArray = [];
 			var sizeArray = [];
 			
 			$('#dataUseCntRankBody td').each(function() {
 				tdArray.push($(this).html());   
 			});
 			
 			for(var i=0; i<tdArray.length; i++) {
 				if((i+1)%4 == 2) {
 					dataNameArray.push(tdArray[i]);
 				} else if((i+1)%4 == 3) {
 					idArray.push(tdArray[i]);
 				} else if((i+1)%4 == 0) {
 					sizeArray.push(Number(tdArray[i].replace(/,/gi, "")));
 				}
 			}
 			
 			for(var i=0; i<dataNameArray.length; i++) {
 				chartCategoriesArray3.push(dataNameArray[i] + "(" + idArray[i] + ")");	
 			}
			
			//chart Series
			for(var j=0; j<chartSeriesArray3.length; j++) {
				var obj = 
					{
						name : chartSeriesArray3[j],
						data : sizeArray
					};
				
				chartDataArray3.push(obj);
			}
			createChart("bar", "dataUseCntRankGraphView");
			//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  end
		},beforeSend:function(){
  	        $('.wrap-loading').removeClass('display-none');
  	    },complete:function(){
  	        $('.wrap-loading').addClass('display-none');
  	    },error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}	
		/*},
		error:function(request,statu,error) {
			alert(
					"c1ode :" + request.status + "   " + request.responseText + "     " + error 	
			);
			
		}*/
	});
}


function excelCVG(row)
{
	var datas = $(row).parents('.graph').find('#dataSet').val();
	location.href="../../ServiceAPI/EXCEL/GetApiDetailExcel.excel?DATA="+datas + "&STARTDATE=" + $('#startDate').val() + "&ENDDATE=" + $('#endDate').val();
}

//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	console.log(str2);
	var tempCategories = []; tempSeries = []; 
		tempPlotOptions = { 
			bar: {
		        dataLabels: {
		            enabled: false,
		            style: {"fontSize": "10px", "fontFamily": "Verdana, sans-serif" }
		        }
			} 
		};
	
	if(str2 == "meneUseStatGraphView") {
		tempCategories = chartCategoriesArray1;
		tempSeries = chartDataArray1;
	} else if(str2 == "popsearCondiGraphView") {
		tempCategories = chartCategoriesArray2;
		tempSeries = chartDataArray2;
	}else if(str2 == "myDataTotalUseStatGraphView") {
		tempCategories = chartCategoriesArray4;
		tempSeries = chartDataArray4;
	}else {
		tempCategories = chartCategoriesArray3;
		tempSeries = chartDataArray3;
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
//gubn : 0(메뉴별 이용현황) 1(검색조건별 이용현황) 2(용량별 데이터 이용현황 (누계))  
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
//2017.07.19 [개발팀] khc 대화형 통계지도 이용현황 그래프보기 추가  end