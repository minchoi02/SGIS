/**   
 *
 * @JSName: introUseStat.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/05/09/ 10:30:00    
 * @version V1.0      
 *    
 */

//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  start
var viewGubn = [0, 0]; //표, 그래프 전환 확인용 - 0 : 표, 1 : 그래프
var chartSeriesArray1 = ["현재까지 참여수"]; //bar
var chartSeriesArray2 = ["페이지뷰(당월)", "참여수"]; //bar
var chartCategoriesArray1 = [];
var chartCategoriesArray2 = [];
var chartDataArray1 = [];
var chartDataArray2 = [];
//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  end

$(function () {

	srvLogWrite("L0", "01", "03", "06", "", "");
	
	 $("#searchBtn").on('click',(function(e){
		 srvLogWrite("L0", "01", "03", "06", "", "");
		 getNewStatCommUseStat();
		 getIntCommMap();
  	  }));
	 
	 
	 $("#meneUseStatTableExcelBtn").on('click',(function(e){
		 alert("1");
		 excelDownload("newStatCommUseStatExcel.xls", "newStatCommUseStatTbl");
		 
	 }));
	 
	 $("#intCommMapTblExcelBtn").on('click',(function(e){
		 excelDownload("intCommMapTblExcel.xls", "intCommMapTbl");
		 
  	  }));
	 
	 $("#totExcelBtn").on('click',(function(e){
		 var tblArray = ["newStatCommUseStatTbl", "intCommMapTbl"];
		 excelDownload2("introUseTotal.xls", tblArray);
  	  }));
	 
});





function init(){
	
	nowYearMonth();
	setFormAction();
	getNewStatCommUseStat();
	getIntCommMap();
	
	//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  start
	$("#newStatCommUseStatGraphView").hide();
	$("#intCommMapGraphView").hide();
	//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  end
}

//moreViewBtn


function getNewStatCommUseStat(){
	
	 var year = $("#yearSel").val();
	 var month = $("#monthSel").val();
	 
	 
	 //메뉴 조회
	 jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
				"gubun" 				: "getNewStatCommUseStat",
				"year"					:	year	,
				"month"					:	month	,
				"type"					:	"F0"
			  },
		success:function(data){
			var swt = true;
			$("#newStatCommUseStatTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
	//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			//map.cmmnty_map_id, map.cmmnty_map_nm, map.cmmnty_map_id, nvl(poi.cnt,0) as ppl_cnt, nvl(poi.sumcnt, 0) take_cnt 
			
			//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray1 = []; 
 			chartDataArray1 = [];
 			var pplCntArray = [];
 			
 			if(data.result.getNewStatCommUseStat.length > 0) {
 				for(var i=0; i<data.result.getNewStatCommUseStat.length; i++){
 					var cmmntyMapId = data.result.getNewStatCommUseStat[i].CMMNTY_MAP_ID;
 					var cmmntyMapNm = data.result.getNewStatCommUseStat[i].CMMNTY_MAP_NM;
 					var takeCnt = data.result.getNewStatCommUseStat[i].TAKE_CNT;
 					var pplCnt = data.result.getNewStatCommUseStat[i].PPL_CNT;
 					var memberNm = data.result.getNewStatCommUseStat[i].MEMBER_NM;
 					var usrId = data.result.getNewStatCommUseStat[i].USR_ID;
 					var reg_date = data.result.getNewStatCommUseStat[i].REG_DATE;

 					//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview

 					var str = "";

 					str += "<tr>";
 		 				str += "<td >" + cmmntyMapNm + "</td>";
 		 				str += "<td >" + memberNm + "</td>";
 		 				str += "<td >" + usrId + "</td>";
 		 				str += "<td >" + reg_date + "</td>";
 		 				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(pplCnt) + "</td>";
 					str += "</tr>";
 					
 					$("#newStatCommUseStatBody").append(str);
 					
 					//차트 데이터 담기
 	 				chartCategoriesArray1.push(cmmntyMapNm + "(" + memberNm + " | " + usrId + ")");
 	 				pplCntArray.push(Number(pplCnt));
 	 			}
 	 			
 	 			//chart Series
 	 			for(var j=0; j<chartSeriesArray1.length; j++) {
 	 				var obj = 
 	 					{
 	 						name : chartSeriesArray1[j],
 	 						data : pplCntArray
 	 					};
 	 				
 	 				chartDataArray1.push(obj);
 	 			}
 	 			createChart("bar", "newStatCommUseStatGraphView");
 				//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  end
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

function getIntCommMap(){
	
	var year = $("#yearSel").val();
	var month = $("#monthSel").val();
	
	
	//메뉴 조회
	jQuery.ajax({
		type:"POST",
		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
		dataType:'json', 
		data:{
			"gubun" 				: "getIntCommMap",
			"year"					:	year	,
			"month"					:	month	,
			"type"					:	"F0"
		},
		success:function(data){
			var swt = true;
			$("#intCommMapTbl tr").each(function(){
				if(swt){
					swt = false;
				}else{
					$(this).remove();
				}
			});
			//			nowYear = data.result.getTotStatView[0].NOWYEAR;
			
			//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  start
 			//data Array 생성 및 초기화
 			chartCategoriesArray2 = []; 
 			chartDataArray2 = [];
 			var cntArray = [];
 			var takecntArray = [];
 			
			for(var i=0; i<data.result.getIntCommMap.length; i++){
				//count(0) cnt, map.cmmnty_map_nm, map.reg_date, map.takecnt
				var cnt = data.result.getIntCommMap[i].CNT;
				var cmmnty_map_nm = data.result.getIntCommMap[i].CMMNTY_MAP_NM;
				var reg_date = data.result.getIntCommMap[i].REG_DATE;
				var takecnt = data.result.getIntCommMap[i].TAKECNT;
				
				//tot.api_id,  count(0) as visitview, sum(count)as pageview, nvl(monthuse.visitview,0) as monthvisitview, nvl(monthuse.pageview,0) as monthpageview
				
				var str = "";
				
				str += "<tr>";
				str += "<td >" + (i+1) + "</td>";
				str += "<td >" + cmmnty_map_nm + "</td>";
				str += "<td >" + reg_date + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(cnt) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(takecnt) + "</td>";
				str += "</tr>";
				
				$("#intCommMapBdy").append(str);
				
				//차트 데이터 담기
				if(cmmnty_map_nm.length > 20) {
					cmmnty_map_nm = cmmnty_map_nm.substr(0, 20) + "..";
				}
 				chartCategoriesArray2.push(cmmnty_map_nm);
 				cntArray.push(Number(cnt));
 				takecntArray.push(Number(takecnt));
 			}
 			
 			var map = [];
 			map.push(cntArray);
 			map.push(takecntArray);
 			
 			//chart Series
 			for(var j=0; j<chartSeriesArray2.length; j++) {
 				var obj = 
 					{
 						name : chartSeriesArray2[j],
 						data : map[j]
 					};
 				
 				chartDataArray2.push(obj);
 			}
 			createChart("bar", "intCommMapGraphView");
			//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  end
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

//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  start
//차트보기 - str1 : chart 구분, str2 : div id
function createChart(str1, str2) {
	var tempCategories = []; tempSeries = []; tempPlotOptions = { visible: false };
	
	if(str2 == "newStatCommUseStatGraphView") {
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
//gubn : 0(신규 통계 소통지도 ) 1(인기 통계소통지도) 
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
//2017.07.20 [개발팀] khc 통계소통지도 이용현황 그래프보기 추가  end