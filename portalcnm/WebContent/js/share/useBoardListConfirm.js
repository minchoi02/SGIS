/**
 * 
 * @JSName: 
 * @Description:
 * 
 * @author: leekh
 * @date: 
 * @version V1.0
 * 
 */
( function( jQuery ) { 
	jQuery( document ).ready(function() {
		init();
		
		jQuery("#firstBtn").on('click',(function(e){
			nowPage = 1;
			getUseBoardList();
		}));
		
		jQuery("#lastBtn").on('click',(function(e){
			if(totCnt %10==0){
				nowPage = parseInt(totCnt /10);
			}else if(totCnt %10 != 0){
				nowPage = parseInt((totCnt /10) + 1);
				
			}
			getUseBoardList();
		}));
		
		jQuery("#preBtn").on('click',(function(e){
			
			nowPage = (bigIdx -2) * 10 + 10;
			
			if(nowPage <= 0){
				nowPage = 1;
			}

			getUseBoardList();
		}));
		
		
		jQuery("#nextBtn").on('click',(function(e){

			nowPage = (bigIdx) * 10 + 1;
			
			var maxPage = 0;
			if(totCnt %10==0){
				maxPage = parseInt(totCnt /10);
			}else if(totCnt %10 != 0){
				maxPage = parseInt((totCnt /10) + 1);
				
			}
			
			if(nowPage >= maxPage){
				nowPage = maxPage;
			}
			
			getUseBoardList();
		}));
		
	});
} )( jQuery );


var searchStartDate = "^^";
var searchEndDate = "^^";
var sgisProgressStat = "all";
var nowPage = "1";
var totCnt = 0;
var smallIdx = 1;
var bigIdx = 1;
var contextUrl = "http://sgis.kostat.go.kr:8080";
 contextUrl = "http://localhost:8080";



function init(){
	getSearchCombo();
	getUseBoardList();
	
}


//활용게시판 리스트를 불러온다
function getUseBoardList(){
	 
	 //jQuery("#contentUl").html("");
		 
	if(sgisProgressStat == ""){
		sgisProgressStat = "all";
	}
	 if(searchStartDate == ""){
		 searchStartDate = "^^";
	 }
	 if(searchEndDate == ""){
		 searchEndDate = "^^";
	 }
	 
	 
	 jQuery("#useBoardConfirmList").html("");
	 
	 //검색, 페이징
	 jQuery.ajax({
	 		type:"POST",
//	 		url: "http://sgis.kostat.go.kr:8080/ServiceAPI/share/useBoardInfo.json",
	 		url: contextUrl + "/s-portalcnm/jsp/share/share.jsp",
	 		//url: contextUrl + "/jsp/share/manager/share.jsp",
	 		dataType:'json',
	 		data:{	
	 				"gubun" 				: "useBoardListConfirm",
	 				"searchStartDate" 		: searchStartDate,
	 				"searchEndDate" 		: searchEndDate,
	 				"sgisProgressStat"		: sgisProgressStat,
	 				"nowPage"				: nowPage
	 			  },
	 			  
	 			  
	 		success:function(data){

	 			if(data.result == null){
	 				alert("조회된 데이터가 없습니다");
	 			}else{
	 				
	 			for(var i=0; i<data.result.length; i++){
						var sgis_use_board_seq = data.result[i].sgis_use_board_seq;
						var sgis_use_board_title = data.result[i].sgis_use_board_title;
						
						if(sgis_use_board_title.length > 18){
							sgis_use_board_title = sgis_use_board_title.substring(0, 15)+ "...";
						}
						
						var sgis_progress_stat = data.result[i].sgis_progress_stat;
						
						if('001' == sgis_progress_stat){
							sgis_progress_stat = '신청';
						}else if('002' == sgis_progress_stat){
							sgis_progress_stat = '승인';
						}else if('003' == sgis_progress_stat){
							sgis_progress_stat = '반려';
						}
						
						var sgis_use_purpose = data.result[i].sgis_use_purpose;
						var sgis_use_area_cd = data.result[i].sgis_use_area_cd;
						var sgis_use_data = data.result[i].sgis_use_data;
						var sgis_use_data_other = data.result[i].sgis_use_data_other;
						var sgis_act_cont = data.result[i].sgis_act_cont;
						sgis_act_cont = replaceAll('<br/>', ' ', sgis_act_cont);
						sgis_act_cont = replaceAll('<br />', ' ', sgis_act_cont);
						if(sgis_act_cont.length > 30){
							sgis_act_cont = sgis_act_cont.substring(0, 27)+ "...";
						}
						var regist_date = data.result[i].code;
						
						var cont = "";
						
						cont += "<tr>";
						
						cont += "<td>";
						cont += "<a href=\"/s-portalcnm/html/share/useBoardViewConfirm.html?searchKeyword=" + sgis_use_board_seq + "&nowPage=" + nowPage + "\">";
						cont += sgis_use_board_seq;
						cont += "</a>";
						
						cont += "</td>";
						cont += "<td>";
						cont += "<a href=\"/s-portalcnm/html/share/useBoardViewConfirm.html?searchKeyword=" + sgis_use_board_seq + "&nowPage=" + nowPage + "\">";
						cont += sgis_progress_stat;
						cont += "</a>";
						cont += "</td>";
						cont += "<td>";
						cont += "<a href=\"/s-portalcnm/html/share/useBoardViewConfirm.html?searchKeyword=" + sgis_use_board_seq + "&nowPage=" + nowPage + "\">";
						cont += sgis_use_board_title;
						cont += "</a>";
						cont += "</td>";
						cont += "<td>";
						cont += "<a href=\"/s-portalcnm/html/share/useBoardViewConfirm.html?searchKeyword=" + sgis_use_board_seq + "&nowPage=" + nowPage + "\">";
						cont += sgis_act_cont;
						cont += "</a>";
						cont += "</td>";
						
						cont += "</tr>";
						jQuery("#useBoardConfirmList").append(cont);
						
	 			}
	 			getUseTotCnt();
				
			}

	 		},
	 		error:function(data) {
	 			alert("fail" + data.error);
	 		}
		});
}

function getUseTotCnt(){
	
	//jQuery("#contentUl").html("");
	
	if(sgisProgressStat == ""){
		sgisProgressStat = "all";
	}
	if(searchStartDate == ""){
		searchStartDate = "^^";
	}
	if(searchEndDate == ""){
		searchEndDate = "^^";
	}
	
	
	jQuery.ajax({
		type:"POST",
//		url: "http://sgis.kostat.go.kr:8080//ServiceAPI/share/useBoardInfo.json",
//		url: contextUrl + "/ServiceAPI/share/useBoardInfo.json",
		url: contextUrl + "/s-portalcnm/jsp/share/share.jsp",
		dataType:'json',
		data:{	
			"gubun" 				: "getTotCnt2",
			"searchStartDate" 		: searchStartDate,
			"searchEndDate" 		: searchEndDate,
			"sgisProgressStat"		: sgisProgressStat
		},
		
		
		
		success:function(data){
			if(data.result == null){
		//		alert("조회된 데이터가 없습니다");
			}else{
				totCnt = data.result[0].cnt;
			}
			
			setPage();
			
		},
		error:function(data) {
		}
	});
}


//검색 콤보박스
function getSearchCombo(){
	 //검색의 콤보박스
	 //sgisUseAreaCd
	 jQuery.ajax({
	 		type:"POST",
//	 		url: "http://sgis.kostat.go.kr:8080/ServiceAPI/share/useBoardInfo.json",
	 		url: contextUrl + "/s-portalcnm/jsp/share/share.jsp",
	 		//url: contextUrl + "/ServiceAPI/share/useBoardInfo.json",
	 		dataType: 'json',
	 		data:{	
	 				"gubun" : "getCode",
	 				"code" : "008"
	 			  },
	 		success:function(data){
				for(var i=0; i<data.result.length; i++){
					var cont = "";
					cont = "<option value=\"" + data.result[i].sclas_cl + "\">" + data.result[i].sclas_nm +"</option>";
					jQuery("#sgisProgressStat").append(cont);
				}
	 		},
	 		error:function(data) {
				alert("error");
	 		}
		});
}

function getSearchList(){
//	searchStartDate = "";
//	searchEndDate = "";
//	sgisProgressStat = "all";
//	nowPage = "1";
	sgisProgressStat = jQuery("#sgisProgressStat").val();
	searchStartDate = jQuery("#searchStartDate").val();
	searchEndDate = jQuery("#searchEndDate").val();
	
	getUseBoardList();
}


function replaceAll(find, replace, str){
	 return str.replace(new RegExp(find, 'g'), replace);
}

function calendar_check(param1,param2,param3){
	var paramLen = param2.length;

	if(paramLen == undefined){
		Calendar(param2,param3);
	}else{ 
	 
	 	Calendar(param1,param3);
	}
}


function setPage(){
	 
		// 큰 인덱스 계산
		if(nowPage % 10 == 0){
			bigIdx = parseInt(nowPage/10);
		}else{
			bigIdx = parseInt(nowPage/10)+1;
		}
		
		
		//총 페이지 계산
		if(totCnt % 10 == 0){
			smallIdx = parseInt(totCnt/10); 
		}else{
			smallIdx = parseInt(totCnt/10)+1;
		}
	 
	 
		jQuery("#pageIndex").html("");
		var startPoint = (bigIdx -1) * 10 + 1;
		
		for(i=startPoint; i<=startPoint+9; i++){
			if(i <= smallIdx){
				if(i == nowPage){
					
					jQuery("#pageIndex").append("<li class=\"txt bgnone\"><a href=\"#\" id=\"page" + i + "\" name=\"pageMove\"><font color=\"red\">" + i + "<font/></a></li>");
					
					//jQuery("#pageIndex").append("<span id=\"page" + i + "\" name=\"pageMove\"  class=\"page current\" style=\"cursor:pointer;\">"+ i + "</span>");
				}else{
					
					jQuery("#pageIndex").append("<li class=\"txt\"><a href=\"#\" id=\"page" + i + "\" name=\"pageMove\">" + i + "</a></li>");
					
					//jQuery("#pageIndex").append("<span id=\"page" + i + "\" name=\"pageMove\"  class=\"page\" style=\"cursor:pointer;\">"+ i + "</span>");
		//			$("#pageIndex").append("<span name=\"pageMove\" id=\"page" + i + "\">" + i + "</span>&nbsp;&nbsp;");
				}
			}
		}
		
		
		
		jQuery("[name='pageMove']").on('click',(function(e){
  			var pageNum = jQuery(this).attr("id");
  			nowPage = pageNum.substring(4);		// id는 "page4" 형식으로 되어 있음. 4만 필요함
  			getUseBoardList();
		}));
	 
}



