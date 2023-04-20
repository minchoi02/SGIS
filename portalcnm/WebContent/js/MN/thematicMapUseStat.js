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

//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  start
var viewGubn = [0, 0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["페이지뷰", "방문자수", "연간 페이지뷰 누계", "연간 방문자수 누계"];
var chartSeriesArray2 = ["페이지뷰", "연간 페이지뷰"];
var chartCategoriesArray1 = [];
var chartCategoriesArray2 = [];
var chartDataArray1 = [];
var chartDataArray2 = [];
//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  end

$(function () {
//	init();
	
	srvLogWrite("L0", "01", "03", "03", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "03", "", "");
		 getThematicMapUseStatMenu();
		 getThemaCondi();
  	  }));
	 
	 $("#thematicMeneViewTblExcelBtn").on('click',(function(e){
		 excelDownload("thematicMeneViewTblExcel.xls", "thematicMeneViewTbl");
  	  }));
	 
	 $("#themaCondiTblExcelBtn").on('click',(function(e){
		 excelDownload("themaCondiTblExcel.xls", "themaCondiTbl");
	 }));
	 
	 
	 $("#totExcelBtn").on('click',(function(e){
		 var tblArray = ["thematicMeneViewTbl", "themaCondiTbl"];
		 excelDownload2("thematicTotal.xls", tblArray);
  	  }));
});





function init(){
	setFormAction();
	nowYearMonth();
	getThematicMapUseStatMenu();
	getThemaCondi();
	
	//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  start
	$("#thematicMeneGraphView").hide();
	$("#themaCondiGraphView").hide();
	//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  end
}


//moreViewBtn


function getThematicMapUseStatMenu(){
	
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
				"type"					:	"C0"
 			  },
 		success:function(data){

 			
 			var swt = true;
 			$("#thematicMeneViewBody tr").each(function(){
 				if(swt){
 					swt = false;
 				}else{
 					$(this).remove();
 				}
 			});
 			
 				
 	//			nowYear = data.result.getTotStatView[0].NOWYEAR;
 			
 			//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  start
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
 				
 				$("#thematicMeneViewBody").append(str);
 				
 				//차트 데이터 담기
 				chartCategoriesArray1.push(s_code_nm);
 				visitViewArray.push(Number(visitView));
 				pageViewArray.push(Number(pageView));
 				monthVisitViewArray.push(Number(monthVisitView));
 				monthPageViewArray.push(Number(monthPageView));
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
 			createChart("column", "thematicMeneGraphView");
 			//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  end
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

function getThemaCondi(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getThemaCondi",
			"year"					:	year	,
			"month"					:	month	
		},
		success:function(data){
			
			
			var swt = true;
			$("#themaCondiBody tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			
			
			
			
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  start
			//data Array 생성 및 초기화
			chartCategoriesArray2 = []; 
 			chartDataArray2 = [];
			var monCntArray = [];
 			var yrCntArray = [];
 			
			for(var i=0; i<data.result.getThemaCondi.length; i++){
				var regdate = data.result.getThemaCondi[i].REGDATE;
				var monCondition = data.result.getThemaCondi[i].MONCONDITION;
				var monCnt = data.result.getThemaCondi[i].MONCNT;
				var yrCondition = data.result.getThemaCondi[i].YRCONDITION;
				var yrCnt = data.result.getThemaCondi[i].YRCNT;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				var str = "";
				
				str += "<tr>";
				str += "<td >" + (i+1) + " 순위</td>";
				str += "<td>" + yrCondition + "</td>";
				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(monCnt) + "</td>";
				str += "<td  style=\"text-align:right;\">" + appendCommaToNumber(yrCnt) + "</td>";
				str += "</tr>";
				
				$("#themaCondiBody").append(str);
				
				//차트 데이터 담기
 				chartCategoriesArray2.push(yrCondition); //인기주제도
 				monCntArray.push(Number(monCnt)); //페이지뷰
 				yrCntArray.push(Number(yrCnt)); //연간 페이지뷰
 			}
 			
 			var map = [];
 			map.push(monCntArray);
 			map.push(yrCntArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray2.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray2[j],
 						data : map[j]
 					};
 				
 				chartDataArray2.push(obj);
 			}
 			createChart("bar", "themaCondiGraphView");
 			//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  end
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

//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	var tempCategories = []; tempSeries = [];
	
	if(str2 == "thematicMeneGraphView") {
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
      series: tempSeries
  });
}

//표 <-> 그래프 전환
//gubn : 0(메뉴별 이용현황) 1(주제도별 이용현황), str1 : 표 id, str2 : 그래프 id, str3 : 버튼 id
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
//2017.07.18 [개발팀] khc 통계주제도 그래프보기 추가  end