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

var nowYearpageViewCnt = new Array();
var nowYearpage = new Array();
var preYearpageViewCnt = new Array();
var preYearpage = new Array();
var nowYear = '';
var nowMonth = '';
var getAllDataYn = 0;

//var preMokpyo = 223500;
//var preMokpyo = 238500;
var preMokpyo = 436000;

$(function () {
	//init();
	
	srvLogWrite("L0", "01", "01", "01", "", "");
	
	 $("#moreViewBtn").on('click',(function(e){				//월간
		 srvLogWrite("L0", "01", "01", "03", "", "");
  		window.open("./../MN/totUseStat_pop1.html", "a", "width=800, height=400, left=100, top=100");
      	
  	  }));
	 $("#moreViewBtn2").on('click',(function(e){			//일간
		 srvLogWrite("L0", "01", "01", "02", "", "");
		 window.open("./../MN/totUseStat_pop2.html", "a", "width=800, height=600, left=100, top=100");
		 
	 }));
	 //2017.07.18[개발팀]이동형 보고서 보기 추가 - 총괄이용현황  팝업 이벤트
	 $("#toUseStatReportView").on('click',(function(e){
		 reportDataSet(1);
	 }));
});





function init(){
	nowYearMonth();
	getTotUseView();
	
	
}


//moreViewBtn


function getTotUseView(){
	 
	 //활용사례 상세조회
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
// 				"gubun" 				: "totUseStat",
 				"gubun" 				: "getTotStatView_new",
 			  },
 		success:function(data){
 			
 				
 				var nowMonthPageView = data.result.getTotStatView[0].NOWMONTHPAGEVIEW;
 				var pageViewPreMonthBigyo = data.result.getTotStatView[0].PAGEVIEWPREMONTHBIGYO;
 				var pageViewOldMonthBigyo = data.result.getTotStatView[0].PAGEVIEWOLDMONTHBIGYO;
 				var pageViewBigyoMonthPersent = data.result.getTotStatView[0].PAGEVIEWBIGYOMONTHPERSENT;
 				var pageViewBigyoOldMonthPersent = data.result.getTotStatView[0].PAGEVIEWBIGYOOLDMONTHPERSENT;
 				var nowMonthVisitView = data.result.getTotStatView[0].NOWMONTHVISITVIEW;
 				var totalVisitView = data.result.getTotStatView[0].TOTALVISITVIEW;
 				var totalPageView = data.result.getTotStatView[0].TOTALPAGEVIEW;
 				var visitViewBigyo = data.result.getTotStatView[0].VISITVIEWBIGYO;
 				var preMonthVisitViewBigyo = data.result.getTotStatView[0].PREMONTHVISITVIEWBIGYO;
 				var preMonthVisitViewBigyoPersent = data.result.getTotStatView[0].PREMONTHVISITVIEWBIGYOPERSENT;
 				var oldMonthVisitViewBigyo = data.result.getTotStatView[0].OLDMONTHVISITVIEWBIGYO;
 				var oldMonthVisitViewBigyoPersent = data.result.getTotStatView[0].OLDMONTHVISITVIEWBIGYOPERSENT;
 				var yearApiCount = data.result.getTotStatView[0].YEARAPICOUNT;
 				var nowYearPageView = data.result.getTotStatView[0].NOWYEARPAGEVIEW;
 				var monAvrPageView = data.result.getTotStatView[0].NOWYEARAVRPAGEVIEW;
 				
 				//223500 월간 목표량
 				
 				var mokpyo = nowMonthPageView - preMokpyo;
 				
 				if(mokpyo >0){
 					
 					//mng_s 20200417 이진호
 					//상회 건수 집계에 Comma 추가
 					//mokpyo = mokpyo + "건 상회";
 					mokpyo = appendCommaToNumber(mokpyo) + "건 상회";
 					//mng_e 20200417 이진호
 					
 				}else{
 					mokpyo = appendCommaToNumber((mokpyo*(-1))) + "건 하회";
 				}
 				
 				$("#mokpyoval").html(mokpyo);
 				
 				
 				$("#nowYearAvrPageView").html(appendCommaToNumber(parseInt(monAvrPageView)));
 				
 				
 				
 				
 				$("#nowMonthPageView").html(appendCommaToNumber(nowMonthPageView));
 				$("#pageViewPreMonthBigyo").html(setIncrDecrText(pageViewPreMonthBigyo));
 				$("#pageViewOldMonthBigyo").html(setIncrDecrText(pageViewOldMonthBigyo));
 				$("#pageViewBigyoMonthPersent").html(pageViewBigyoMonthPersent);
 				$("#pageViewBigyoOldMonthPersent").html(pageViewBigyoOldMonthPersent);
 				
 				//mng_s 20200417 이진호
 				//nowMonthVisitView(방문자수) 집계에 Comma 추가
 				//$("#nowMonthVisitView").html(nowMonthVisitView);
 				$("#nowMonthVisitView").html(appendCommaToNumber(nowMonthVisitView));
 				//mng_e 20200417 이진호
 				
 				$("#totalVisitView").html(appendCommaToNumber(totalVisitView));
 				$("#preMonthVisitViewBigyo").html(setIncrDecrText(preMonthVisitViewBigyo));
 				$("#preMonthVisitViewBigyoPersent").html(preMonthVisitViewBigyoPersent);
 				$("#oldMonthVisitViewBigyo").html(setIncrDecrText(oldMonthVisitViewBigyo));
 				$("#oldMonthVisitViewBigyoPersent").html(oldMonthVisitViewBigyoPersent);
				
 				//mng_s 20210111 이진호
 				//145라인으로 이동, 조회년도 동적으로 수정하면서 한번에 들어가도록
 				//$("#yearApiCount").html(appendCommaToNumber(yearApiCount));
 				//mng_e 20210111 이진호

 				$("#nowYearPageView").html(appendCommaToNumber(nowYearPageView));
 				
 				
 				$("#totalPageView").html(appendCommaToNumber(parseInt(totalPageView) + 688710));	//2016년 api_log_write 만들어기 이전에 쌓인 카운트 = 688710
 				
 				
 				
 				nowYear = data.result.getTotStatView[0].NOWYEARMONTH;
 				nowMonth = nowYear.substr(4,2);
 				nowYear = nowYear.substr(0,4);

 				getTotPageViewGraph(nowYear, true);
 				getTotPageViewGraph(nowYear-1, false);
 				
 				$("#nowYear").html(nowYear);
 				$("#nowMonth").html(nowMonth);
				
				//mng_s 20210111 이진호
 				//총괄데이터현황에서 OpenAPI 사용건수 년도 기존 하드코딩에서 동적으로 변경되도록 수정
 				$("#year_OpenAPICount").html(nowYear + "년 OpenAPI 사용건수 : " +"<br/>"+ appendCommaToNumber(yearApiCount) + "건");
 				//mng_e 20200111 이진호
 				
 				
 		
 		}
		,beforeSend:function(){
 	        $('.wrap-loading').removeClass('display-none');
 	    }
 	    ,complete:function(){
 	        //$('.wrap-loading').addClass('display-none');
 	    }
 		,error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}





function getTotPageViewGraph(nowYear, sw){
	 //활용사례 상세조회
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getTotPageViewGraph",
 				"year"					: nowYear
 			  },
 		success:function(data){
 			for(var i=0; i<data.result.getTotPageViewGraph.length; i++){
 				if(sw){
 					nowYearpageViewCnt[i] = parseInt(data.result.getTotPageViewGraph[i].PAGEVNT);
 					nowYearpage[i]= data.result.getTotPageViewGraph[i].REGDATE;
 				}else{
 					preYearpageViewCnt[i] = parseInt(data.result.getTotPageViewGraph[i].PAGEVNT);
 					preYearpage[i]= data.result.getTotPageViewGraph[i].REGDATE;
 				}
 			}
 			
 			getAllDataYn = getAllDataYn + 1;
 			if(getAllDataYn >= 2){
 				drawTotPageViewGraph();
 			}
 		}
		 ,beforeSend:function(){
 	        $('.wrap-loading').removeClass('display-none');
 	    }
 	    ,complete:function(){
 	        $('.wrap-loading').addClass('display-none');
 	    }
 		,error:function(data) {
 			/*alert("ajaxFail");
 			alert(data);*/
 		}
	});
}

function drawTotPageViewGraph(){
	$(function () {
		//mng_s 20210604 이진호
		//총괄이용현황의 페이지뷰 그래프가 짤리는 현상 수정
		//원인이였던 y축 하드코딩 대신 전년도와 현재년도의 페이지뷰 arr을 합쳐 max값을 그래프 y축의 max값으로 대체
		var arr_concat = nowYearpageViewCnt.concat(preYearpageViewCnt); // 전년도 pageViewCnt와 현재년도 pageViewCnt의 arr를 합친다.
		var max_pageViewCnt = Math.max.apply(null, arr_concat); //전년도와 현재년도 합친 arr값의 max값을 구한다.
		console.log('max_pageViewCnt =========> ' + max_pageViewCnt);
		//mng_e 20210604 이진호
		
	    $('#pageViewGraphArea').highcharts({
	        title: {
	            text: '연간 페이지 뷰',
	            x: 0 //center
	        },
	        subtitle: {
	            text: '',	//'Source: WorldClimate.com',
	            x: 0
	        },
	        xAxis: {
	            categories: ['01월', '02월', '03월', '04월', '05월', '06월',
	                '07월', '08월', '09월', '10월', '11월', '12월']
	        },
	        yAxis: {
	            title: {
	                text: '페이지 뷰'
	            },
	            plotLines: [{
	                value: preMokpyo,			//센터값
	                dashStyle : "dot",
	                width: 3,			//센터값 나타내는 선 굵기
	                color: '#008080'	//센터값 나타내는 선 color
	                
	            }],
	            min : 0,
	            //max : 300000
	            
	            //mng_s 20210604 이진호
	    		//총괄이용현황의 페이지뷰 그래프가 짤리는 현상 수정
	    		//원인이였던 y축 하드코딩 대신 전년도와 현재년도의 페이지뷰 arr을 합쳐 max값을 그래프 y축의 max값으로 대체
	            //max : 800000
	            max : max_pageViewCnt
	            //mng_e 20210604 이진호
	        },
	        tooltip: {
	            valueSuffix: '건'		//툴팁 단위
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	        },
	        series: [{
	            name: nowYear + '년',
	            data: nowYearpageViewCnt
	        }
	     //2017년에 아래 주석 해지
	        , {
	           name: nowYear-1 + '년',
	            data: preYearpageViewCnt
	        }
	        ]
	    });
	});
	var table = "";
		for(var i=0; i<nowYearpage.length; i++){
			console.log(nowYearpage);
			table += "<tr style='height:30px;'>";
			table += "<td style='text-align:center'>"+nowYearpage[i]+"</td>";
			table += "<td style='text-align:center'>"+addComma(nowYearpageViewCnt[i])+"</td>";
			table += "<tr>";
		}
		$('#toUse').html(table);
}
//2017.07.18[개발팀]이동형 보고서 보기 추가 - 총괄이용현황
function reportDataSet(type) {
	newWindow = window.open("/s-portalcnm/html/MN/totUseStat_pop.html", "newWindow", "width=850, height=700, scrollbars=yes");
}
//2017.07.19[개발팀]이동형 보고서 보기 추가 - 총괄이용현황 천단위 콤마
function addComma(num) {
	var len, point, str;
	
	num = num + "";
	var tmpNum = null;
	var tmpMod = null;
	if (num.indexOf(".") == -1) {
		tmpNum = num;
	}else {
		tmpNum = num.split(".")[0];
		tmpMod = "." + num.split(".")[1];
	}

	point = tmpNum.length % 3;
	len = tmpNum.length;
	
	str = tmpNum.substring(0, point);
	while (point < len) {
		if (str != "")
			str += ",";
		str += tmpNum.substring(point, point + 3);
		point += 3;
	}

	if (tmpMod != null && tmpMod.length > 0) {
		str = str + tmpMod;
	}
	return str;
}
