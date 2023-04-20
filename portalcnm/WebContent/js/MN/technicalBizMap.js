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

//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  start
var viewGubn = [0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["월간 페이지뷰", "월간 방문자수", "연간 페이지뷰", "연간 방문자수"]; //column
var chartCategoriesArray1 = [];
var chartDataArray1 = [];
//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  end


$(function () {
	//init();
	
	srvLogWrite("L0", "01", "03", "10", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "10", "", "");
			getMenuUseView();
  	  }));
	 
	 
	 $("#meneUseStatTableExcelBtn").on('click',(function(e){
		 excelDownload("meneUseStatTableExcel.xls", "meneUseStatTableTbl");
		 
  	  }));

});







function init(){
	nowYearMonth();
	getMenuUseView();
	setTimeout(function(){
	//	getPopSearchCondiView();
	},500);
	setTimeout(function(){
	//	getIntHighFunUseStat();
	},800);
	//	setFormAction();
	//	getMyDataTotalUseStat();
	//	getDataUseCntRank();
	
	//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  start
	$("#meneUseStatGraphView").hide();
	//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  end
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
				"type"					:	"T0"
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
 			
 				
 	//			nowYear = data.result.getTotStatView[0].NOWYEAR;
 			
 			//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray1 = []; 
 			chartDataArray1 = [];
 			var monthPageViewArray = [];
 			var monthVisitViewArray = [];
 			var pageViewArray = [];
 			var visitViewArray = [];
 			
 			for(var i=0; i<data.result.getMenuView.length; i++){
 				var s_code_nm = data.result.getMenuView[i].S_CODE_NM;
 				var visitView = data.result.getMenuView[i].VISITVIEW;
 				var pageView = data.result.getMenuView[i].PAGEVIEW;
 				var monthVisitView = data.result.getMenuView[i].MONTHVISITVIEW;
 				var monthPageView = data.result.getMenuView[i].MONTHPAGEVIEW;

 				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview

 				var str = "";

 				str += "<tr>";
	 				str += "<td >" + s_code_nm + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monthVisitView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(pageView) + "</td>";
	 				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(visitView) + "</td>";
 				str += "</tr>";
 				
 				$("#meneUseStatTableBody").append(str);
 				
 				//차트 데이터 담기
 				chartCategoriesArray1.push(s_code_nm);
 				monthPageViewArray.push(Number(monthPageView));
 				monthVisitViewArray.push(Number(monthVisitView));
 				pageViewArray.push(Number(pageView));
 				visitViewArray.push(Number(visitView));
 			}
 			
 			var map = [];
 			map.push(monthPageViewArray);
 			map.push(monthVisitViewArray);
 			map.push(pageViewArray);
 			map.push(visitViewArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray1.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray1[j],
 						data : map[j]
 					};
 				
 				chartDataArray1.push(obj);
 			}
 			createChart("column", "meneUseStatGraphView");
 			//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  end
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

function makeMenuUseStatTbl(gb, swt, s_code_nm, monthPageView, monthVisitView){
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
				
				
			}
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


function excelCVG(row)
{
	var datas = $(row).parents('.graph').find('#dataSet').val();
	location.href="../../ServiceAPI/EXCEL/GetApiDetailExcel.excel?DATA="+datas + "&STARTDATE=" + $('#startDate').val() + "&ENDDATE=" + $('#endDate').val();
}

//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	var tempCategories = []; tempSeries = []; tempPlotOptions = { visible: false };
	
	if(str2 == "meneUseStatGraphView") {
		tempCategories = chartCategoriesArray1;
		tempSeries = chartDataArray1;
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
//gubn : 0(메뉴별 이용현황) 
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
//2017.07.20 [개발팀] khc 기술업종통계지도 이용현황 그래프보기 추가  end