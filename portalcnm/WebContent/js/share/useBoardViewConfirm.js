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
	});
} )( jQuery );

var sgisUseBoardSeq;
var nowPage;



function init(){
	valSetting();
	getUseBoardView();
}

function valSetting(){
	sgisUseBoardSeq = getParameter("searchKeyword");
	nowPage = getParameter("nowPage");
	
}


var contextUrl = "http://sgis.kostat.go.kr:8080";
contextUrl = "http://localhost:8080";

//활용게시판 상세페이지 불러온다
function getUseBoardView(){
	 
	 
	 //활용사례 상세조회
	 jQuery.ajax({
 		type:"POST",
 		url: "http://sgis.kostat.go.kr:8080/ServiceAPI/share/useBoardInfo.json",
 		dataType:'json',
 		//url: contextUrl + "/s-portalcnm/jsp/share/share.jsp",
 		data:{	
 				"gubun" 				: "useBoardView",
 				"sgisUseBoardSeq" 		: sgisUseBoardSeq,
 			  },
 		success:function(data){
 			
 				
 				var userId = data.result[0].regist_user;
 				
 				if(userId != "<%=member_id%>"){
 					$("#modifyBtn").hide();
 				}
 			
				var sgis_use_board_title = data.result[0].sgis_use_board_title;
				var regist_user_name = data.result[0].regist_user_name;
				var sgis_user_name = data.result[0].sgis_user_name;
				var sgis_use_board_seq = data.result[0].sgis_use_board_seq;
				var sgis_use_board_gb_name = data.result[0].sgis_use_board_gb_name;
				var sgis_use_purpose_name = data.result[0].sgis_use_purpose_name;
				var sgis_use_area_cd_name = data.result[0].sgis_use_area_cd_name;
				var sgis_use_data = data.result[0].sgis_use_data;
				var sgis_use_data_other = data.result[0].sgis_use_data_other;
				var sgis_act_cont = data.result[0].sgis_act_cont;
				var sgis_site_url = data.result[0].sgis_site_url;
				var sgis_ref_data1 = data.result[0].sgis_ref_data1;
				var sgis_ref_data2 = data.result[0].sgis_ref_data2;
				var sgis_ref_data3 = data.result[0].sgis_ref_data3;
				var sgis_ref_data4 = data.result[0].sgis_ref_data4;
				var sgis_ref_image = data.result[0].sgis_ref_image;
				var rtnrsn = data.result[0].rtnrsn;
				var prioritize = data.result[0].prioritize;
				
				
				
				
				jQuery("#sgis_use_board_title").html(sgis_use_board_title);
				jQuery("#regist_user").html(regist_user_name);
				jQuery("#sgis_user_name").html(sgis_user_name);
				jQuery("#sgis_use_board_gb_name").html(sgis_use_board_gb_name);
				jQuery("#sgis_use_purpose_name").html(sgis_use_purpose_name);
				jQuery("#sgis_use_area_cd_name").html(sgis_use_area_cd_name);
				jQuery("#sgis_use_data").html(sgis_use_data);
				jQuery("#sgis_use_data_other").html(sgis_use_data_other);
				jQuery("#sgis_act_cont").html(sgis_act_cont);
				jQuery("#sgis_site_url").html(sgis_site_url);
				if(sgis_ref_data1 != null){
					jQuery("#sgis_ref_data1").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgis_ref_data1 +"\">" + sgis_ref_data1 + "</a>");
				}
				//jQuery("#sgis_ref_data1").html(sgis_ref_data1);
				if(sgis_ref_data2 != null){
					jQuery("#sgis_ref_data2").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgis_ref_data2 +"\">" + sgis_ref_data2 + "</a>");
				}
//				jQuery("#sgis_ref_data2").html(sgis_ref_data2);
				if(sgis_ref_data2 != null){
					jQuery("#sgis_ref_data3").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgis_ref_data3 +"\">" + sgis_ref_data3 + "</a>");
				}
				//jQuery("#sgis_ref_data3").html(sgis_ref_data3);
				if(sgis_ref_data2 != null){
					jQuery("#sgis_ref_data4").html("<a href=\"/jsp/share/fileDownload.jsp?fileName="+ sgis_ref_data4 +"\">" + sgis_ref_data4 + "</a>");
				}
				//jQuery("#sgis_ref_data4").html(sgis_ref_data4);
				
				if(sgis_ref_image != null){
					$("#sgis_ref_image").html("<img src=\"/upload/share/" + sgis_ref_image + "\" alt=\"이미지\" width=\"300\" />");
				}
				
			//	jQuery("#sgis_ref_image").html(sgis_ref_image);
				jQuery("#rtnrsn").val(rtnrsn);
				jQuery("#prioritize").val(prioritize);
			//	fileDownload(sgisRefData1);
			
 		},
 		error:function(data) {
 			
 		}
	});
}


function sgisUseBoardConfirm(gb){
	
	var rtnrsn = jQuery("#rtnrsn").val();
	var prioritize = jQuery("#prioritize").val();
	
	if(rtnrsn == ""){
		rtnrsn = "^^";
	}
	if(prioritize == ""){
		prioritize = 0;
	}
	
	//활용사례 승인, 반려
	jQuery.ajax({
		type : "POST",
		url : "http://sgis.kostat.go.kr:8080/ServiceAPI/share/useBoardInfo.json",
		dataType:'json',
		//url: contextUrl + "/s-portalcnm/jsp/share/share.jsp",
		data : {
			"gubun" : "useBoardConfirm",
			"sgisUseBoardSeq" : sgisUseBoardSeq,
			"prioritize" : prioritize,
			"rtnrsn" : rtnrsn,
			"sgisProgressStat" : gb
		},
		success : function(data) {
			window.location.href("/s-portalcnm/html/share/useBoardListConfirm.html");
		},
		error : function(data) {

		}
	});
}








//Get 방식으로 파라미터를 받을 때
function getParameter (name) {
	search = location.search;
	
	if (search) {
		if(search.indexOf("returnPage") > (-1)) {
			search = search.split("returnPage=");
			return search[1].replace("?returnPage=", "");
			
		} else {
			search = search.split("?");
			data = search[1].split("=");
			
			if (search[1].indexOf("&") == (-1)) {
				// 한개의 파라미터일때.
				data = search[1].split("=");
				return data[1];
			}
			else {
				// 여러개의 파라미터 일때.
				data = search[1].split("&"); // 엠퍼센트로 자름.
				for (i = 0; i <= data.length - 1; i++) {
					l_data = data[i].split("=");
					if (l_data[0] == name) {
						return l_data[1];
						break;
					}
					else {
						continue;
					}
				}
			}
		}
	}
}









