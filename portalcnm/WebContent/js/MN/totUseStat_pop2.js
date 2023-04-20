/**   
 *
 * @JSName: totUseStat_pop2.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2016/06/15/ 14:30:00    
 * @version V1.0      
 *    
 */



jQuery(function () {
//	init();
	
	
	
	jQuery("#searchBtn").on('click',(function(e){
  		
		getTotStatPopupView2();
      	
  	  }));
	
});





function init(){
	
	nowDate();
	getTotStatPopupView2();
	
}


function nowDate(){
	var dt = new Date();
	
	var nowYear = dt.getFullYear();
	var nowMonth = "" + (dt.getMonth()+1);
	var nowDate = "" + (dt.getDate());
	
	if(nowMonth.length<2){
		nowMonth = "0" + nowMonth;
	}

	jQuery("#searchStartDate").val(nowYear + "-"+nowMonth+ "-01");
	jQuery("#searchEndDate").val(nowYear + "-"+nowMonth+ "-" + nowDate);
}

//moreViewBtn


function getTotStatPopupView2(){
	
	 var year = jQuery("#searchStartDate").val();
	 var year2 = jQuery("#searchEndDate").val();
	 
	 
	 var swt = true;
		jQuery("#totTable2 tr").each(function(){
			if(swt){
				swt = false;
			}else{
				$(this).remove();
			}
		});
	 
	 //활용사례 상세조회
	 jQuery.ajax({
 		type:"POST",
 		url: "/s-portalcnm/ServiceAPI/MN/UseCurrentState/useCurrentState.json",
 		dataType:'json', 
 		data:{
 				"gubun" 				: "getTotStatPopupView2",
 				"year"					: year,
 				"year2"					: year2,
 			  },
 		success:function(data){
 				
 			
 			
 			var pageViewCntTot = 0;
 			var visitViewCntTot = 0;
 			var apiCntTot = 0;
 			
 			for(var i=0; i<data.result.getTotStatPopupView2.length; i++){
	 			var regdate = data.result.getTotStatPopupView2[i].REGDATE;
 				var pageViewCnt = data.result.getTotStatPopupView2[i].PAGEVIEWCNT;
 				var visitViewCnt = data.result.getTotStatPopupView2[i].VISITVIEWCNT;
 				var apiCnt = data.result.getTotStatPopupView2[i].APICNT;
 				//$("#nowMonthPageView").html(nowMonthPageView);
 				
 				
 				
 				pageViewCntTot = pageViewCntTot + parseInt(pageViewCnt);
 				visitViewCntTot = visitViewCntTot + parseInt(visitViewCnt);
 				apiCntTot = apiCntTot + parseInt(apiCnt);
 				
 				regdate = regdate.substr(0,4) + "-" + regdate.substr(4,2) + "-" + regdate.substr(6,2);
 				
 				
 				var str = "";
				str += "<tr>";
				str += "<td>" + regdate + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(pageViewCnt) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(visitViewCnt) + "</td>";
				str += "<td style=\"text-align:right;\">" + appendCommaToNumber(apiCnt) + "</td>";
				str += "</tr>";
				
				jQuery("#totTable2Body").append(str);
 			}
 			
 			var str = "";
			str += "<tr>";
			str += "<th>" + "합계" + "</th>";
			str += "<th style=\"text-align:right;\"> " + appendCommaToNumber(pageViewCntTot) + " &nbsp;&nbsp;</th>";
			str += "<th style=\"text-align:right;\"> " + appendCommaToNumber(visitViewCntTot) + " &nbsp;&nbsp;</th>";
			str += "<th style=\"text-align:right;\"> " + appendCommaToNumber(apiCntTot) + "&nbsp;&nbsp; </th>";
			str += "</tr>";
			
			jQuery("#totTable2Body").append(str);
 				
 		
 		},
 		error:function(data) {
 			
 			alert("ajaxFail");
 			alert(data);
 		}
	});
	 
	 
	 
	 
	 
	 
}

var searchStartDate = "^^";
var searchEndDate = "^^";

function calendar_check(param1,param2,param3){
	var paramLen = param2.length;

	if(paramLen == undefined){
		Calendar(param2,param3);
	}else{ 
	 
	 	Calendar(param1,param3);
	}
}


