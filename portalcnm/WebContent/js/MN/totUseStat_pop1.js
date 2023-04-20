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
var preYearpageViewCnt = new Array();
var nowYear = '';
var getAllDataYn = 0;


$(function () {
//	init();
	
	
	
	$("#searchBtn").on('click',(function(e){
  		
		getTotUseView();
      	
  	  }));
	
});





function init(){
	
	
	nowYearMonth();
	nowYearMonth2();
	
	getTotUseView();
	
	
}


function nowYearMonth2(){
	var dt = new Date();
	
	var nowYear = dt.getFullYear();
	var nowMonth = "" + (dt.getMonth()+1);
	
	if(nowMonth.length<2){
		nowMonth = "0" + nowMonth;
	}

	jQuery("#yearSel2").val(nowYear);
	jQuery("#monthSel2").val(nowMonth);
}

//moreViewBtn


function getTotUseView(){
	
	 var year = $("#yearSel").val();
	 var month = $("#monthSel").val();
	 var year2 = $("#yearSel2").val();
	 var month2 = $("#monthSel2").val();
	 
	 //활용사례 상세조회
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getTotStatPopupView",
 				"year"					: year,
 				"month"					: month,
 				"year2"					: year2,
 				"month2"					: month2
 			  },
 		success:function(data){
 				
 				var pageViewCnt = data.result.getTotStatPopupView[0].PAGEVIEWCNT;
 				var visitViewCnt = data.result.getTotStatPopupView[0].VISITVIEWCNT;
 				var apiCnt = data.result.getTotStatPopupView[0].APICNT;
 				//$("#nowMonthPageView").html(nowMonthPageView);
 				
 				
 				$("#pageViewCnt").html(appendCommaToNumber(pageViewCnt)+" 건");
 				$("#visitViewCnt").html(appendCommaToNumber(visitViewCnt)+" 건");
 				$("#apiCnt").html(appendCommaToNumber(apiCnt)+" 건");

 		
 		},
 		error:function(data) {
 			
 			alert("ajaxFail");
 			alert(data);
 		}
	});
}


