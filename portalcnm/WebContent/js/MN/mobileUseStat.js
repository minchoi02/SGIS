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

//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  start
var viewGubn = [0, 0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["페이지뷰", "방문자수", "페이지뷰 누적", "방문자수 누적"]; //bar
//var chartSeriesArray2 = ["모바일", "웹", "연간 계"]; //column & line 연간 계 필요시 주석 해제
var chartSeriesArray2 = ["모바일", "웹"]; //column
var chartCategoriesArray1 = [];
var chartCategoriesArray2 = [];
var chartDataArray1 = [];
var chartDataArray2 = [];
//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  end

$(function () {
	//init();
	
	srvLogWrite("L0", "01", "03", "07", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "07", "", "");
			getMenuUseView();
			getStatCommMobilUse();
		
  	  }));
	 
	 
	 $("#meneUseStatTableExcel").on('click',(function(e){
		 excelDownload("meneUseStatTableExcel.xls", "meneUseStatTableTbl");
		 
  	  }));

	 $("#commMobileUseStatExcel").on('click',(function(e){
		 excelDownload("commMobileUseStatExcel.xls", "commMobileUseStatTbl");
		 
	 }));
	 
	 $("#totExcelBtn").on('click',(function(e){
		 var tblArray = ["meneUseStatTableTbl", "commMobileUseStatTbl"];
		 excelDownload2("mobileUseTotal.xls", tblArray);
  	  }));
	 
});







function init(){
	setFormAction();
	nowYearMonth();
	
	//mng_s 20200402 이진호 - 모바일 이용현황 초기들어갈 시 자동조회 안하게 하기위해 주석처리
    //getMenuUseView();
	//mng_e 20200402 이진호
	
	getStatCommMobilUse();
	
	//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  start
	$("#meneUseStatGraphView").hide();
	$("#commMobileUseStatGraphView").hide();
	//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  end
}


//moreViewBtn



//아직 미구현(코드테이블 나온 이후 구현예정)
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
				"type"					:	"L0"
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
			
			//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray1 = []; 
 			chartDataArray1 = [];
 			var visitViewArray = [];
 			var pageViewArray = [];
 			var monthVisitViewArray = [];
 			var monthPageViewArray = [];
 			
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
	 				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
	 				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(monthVisitView) + "</td>";
	 				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(pageView) + "</td>";
	 				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(visitView) + "</td>";
				str += "</tr>";
				
				$("#meneUseStatTableBdy").append(str);
				
				//차트 데이터 담기
 				chartCategoriesArray1.push(s_code_nm);
 				visitViewArray.push(Number(visitView));
 				pageViewArray.push(Number(pageView));
 				monthVisitViewArray.push(Number(monthVisitView));
 				monthPageViewArray.push(Number(monthPageView));
			}
			
			str = "";
			for(var i=0; i<data.result.getCommuniteMobileMenuView.length; i++){
				var totVisitView = data.result.getCommuniteMobileMenuView[i].TOTVISITVIEW;
				var totPageView = data.result.getCommuniteMobileMenuView[i].TOTPAGEVIEW;
				var monthVisitView = data.result.getCommuniteMobileMenuView[i].MONVISITVIEW;
				var monthPageView = data.result.getCommuniteMobileMenuView[i].MONPAGEVIEW;
				
				str += "<tr>";
				str += "<td >통계소통지도 게시물</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(monthVisitView) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(totPageView) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(totVisitView) + "</td>";
				str += "</tr>";
				
				$("#meneUseStatTableBdy").append(str);
				
				//차트 데이터 담기
 				chartCategoriesArray1.push("통계소통지도 모바일");
 				visitViewArray.push(Number(visitView));
 				pageViewArray.push(Number(pageView));
 				monthVisitViewArray.push(Number(monthVisitView));
 				monthPageViewArray.push(Number(monthPageView));
 			}
			
			
			//mng_s 20200323 이진호
			// 모바일 이용현황에 일자리맵 항목 추가
			str= "";
			for(var i=0; i<data.result.getJobMobileMenuView.length; i++){
				var totVisitView = data.result.getJobMobileMenuView[i].TOTVISITVIEW;
				var totPageView = data.result.getJobMobileMenuView[i].TOTPAGEVIEW;
				var monthVisitView = data.result.getJobMobileMenuView[i].MONVISITVIEW;
				var monthPageView = data.result.getJobMobileMenuView[i].MONPAGEVIEW;
				
				str += "<tr>";
				str += "<td >일자리맵</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(monthPageView) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(monthVisitView) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(totPageView) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(totVisitView) + "</td>";
				str += "</tr>";
				
				$("#meneUseStatTableBdy").append(str);
				
				//차트 데이터 담기
				chartCategoriesArray1.push("일자리맵");
				visitViewArray.push(Number(visitView));
				pageViewArray.push(Number(pageView));
				monthVisitViewArray.push(Number(monthVisitView));
				monthPageViewArray.push(Number(monthPageView));
			}
			//mng_e 20200323 이진호
 			
			
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
 			createChart("bar", "meneUseStatGraphView");
 			//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  end
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

function getStatCommMobilUse(){
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getStatCommMobilUse",
			"year"					:	year	,
			"month"					:	month	,
			"type"					:	"L0"
		},
		success:function(data){
			//monk0cnt, monk1cnt, yrk0cnt, yrk1cnt, moncnt, yrcnt
			//,decode(monk0cnt, 0, 0,to_int((monk1cnt/(monk0cnt+monk1cnt))*100)) as biyul
			
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
			chartCategoriesArray2 = ["페이지뷰","모바일 의견등록"]; 
 			chartDataArray2 = [];
			var mobileCntArray = [];
 			var webCntArray = [];
 			var biyulArray = [];
 			var regyrcntArray = [];
 			
			for(var i=0; i<data.result.getStatCommMobilUse.length; i++){
				var moncnt = data.result.getStatCommMobilUse[i].MONCNT;
				var monk0cnt = data.result.getStatCommMobilUse[i].MONK0CNT;
				var monk1cnt = data.result.getStatCommMobilUse[i].MONK1CNT;
				var yrcnt = data.result.getStatCommMobilUse[i].YRCNT;
				var biyul = data.result.getStatCommMobilUse[i].BIYUL;
				var regmoncnt = data.result.getStatCommMobilUse[i].REGMONCNT;
				var monk3cnt = data.result.getStatCommMobilUse[i].MONK3CNT;
				var monk4cnt = data.result.getStatCommMobilUse[i].MONK4CNT;
				var regyrcnt = data.result.getStatCommMobilUse[i].REGYRCNT;
				var regbiyul = data.result.getStatCommMobilUse[i].REGBIYUL;
				
				$("#moncnt").html("(모바일 : "+ appendCommaToNumber(monk1cnt) + "건, 웹 " + appendCommaToNumber(monk0cnt)+"건 )");
				$("#biyul").html(biyul + "%");
				$("#yrcnt").html(appendCommaToNumber(yrcnt)+"건");
				
				$("#regmoncnt").html("(모바일 : "+ appendCommaToNumber(monk4cnt) + "건, 웹 " + appendCommaToNumber(monk3cnt)+"건 )");
				$("#regbiyul").html(regbiyul + "%");
				$("#regyrcnt").html(appendCommaToNumber(regyrcnt)+"건");
				
				//차트 데이터 담기
				mobileCntArray.push(Number(monk1cnt));
				mobileCntArray.push(Number(monk4cnt));
				webCntArray.push(Number(monk0cnt));
				webCntArray.push(Number(monk3cnt));
				biyulArray.push(Number(biyul));
				biyulArray.push(Number(regbiyul));
				regyrcntArray.push(Number(yrcnt));
				regyrcntArray.push(Number(regyrcnt));
 			}
			
 			var map = [];
 			map.push(mobileCntArray);
 			map.push(webCntArray);
// 			map.push(regyrcntArray); //연간 계 필요 시 주석 해제
 			map.push(biyulArray);
 			
 			//chart Series pie
 			for(var j=0; j<chartSeriesArray2.length+1; j++) {
 				var obj = {};
 				if(j < 2) { //column
 					obj =
 						{
 							type : "column",
 	 						name : chartSeriesArray2[j],
 	 						data : map[j]
 	 					};
 				} else {
 					//연간 계 필요 시 주석 해제
// 					if(j == 2) { //line
//	 					obj =
//	 						{
//	 							type: "line",
//	 					        name: chartSeriesArray2[j],
//	 					        data: map[j],
//	 					        marker: {
//	 					            lineWidth: 2,
//	 					            lineColor: Highcharts.getOptions().colors[2],
//	 					            fillColor: 'white'
//	 					        }	
//	 	 					};
// 					} else { //pie
 						obj =
						{
							type: "pie",
					        name: "모바일 페이지뷰 비율",
					        data: [{
					            name: "페이지뷰",
					            y: map[j][0],
					            color: Highcharts.getOptions().colors[0] // Jane's color
					        }, {
					        	name: "모바일 의견등록",
					            y: map[j][1],
					            color: Highcharts.getOptions().colors[1] // Joe's color
					        }],
					        center: [500, 80],
					        size: 100,
					        showInLegend: false,
					        dataLabels: {
					            enabled: false
					        }		
	 					};
// 					}	
 				}
 					
 				chartDataArray2.push(obj);
 			}	
	 			
 			createChart("combi", "commMobileUseStatGraphView");
 			//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  end
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

//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	var tempCategories = []; tempSeries = []; tempPlotOptions = { visible: false };
	
	if(str2 == "meneUseStatGraphView") {
		tempCategories = chartCategoriesArray1;
		tempSeries = chartDataArray1;
	} else {
		tempCategories = chartCategoriesArray2;
		tempSeries = chartDataArray2;
	}
	
	if(str1 == "combi") {
		$("#"+str2).highcharts({
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
		    plotOptions: tempPlotOptions,
		    series: tempSeries
		});
	} else {
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
}

//표 <-> 그래프 전환
//gubn : 0(메뉴별 이용현황) 1(통계소통지도 모바일 이용)  
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
//2017.07.19 [개발팀] khc 모바일 이용현황 그래프보기 추가  end