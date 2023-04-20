/**
 * 총조사 시각화 보고서 출력
 *  
 */
(function(W, D) {
	W.$totSurvDetailReport = W.$totSurvDetailReport || {}
	
	var contextPath = "";
	$(document).ready(function() {	
		/*function LockF5() { 
	        if (event.keyCode == 116) { 
	            event.keyCode = 0; 
	            return false; 
	        }	
	    } 
	    document.onkeydown = LockF5;*/
		
		contextPath = "";
		
		console.log("#### $totSurvDetailReport ready #####");
		
		
		$("#totSurv_popup_confirm_close").click(function() {
			$("#totSurv_popup_back").hide();
			$("#totSurv_popup_confirm").hide();
		});
		$("#totSurv_popup_alert_close").click(function() {
			$("#totSurv_popup_back").hide();
			$("#totSurv_popup_alert").hide();
		});
		$("#lifeEnvironment_close").click(function() {
			$("#totSurv_popup_back").hide();
			$("#lifeEnvironment").hide();
		});
		$("#totSurv_popup_area_detail_close").click(function() {
			$("#totSurv_popup_back").hide();
			$("#popup_area_click").hide();
		});
		
	});
	
	$(window).load(function() {
		
		if(window.opener.$totSurvDetail.ui.selectTotSurvDataList[0] == undefined){
			$totSurvDetailReport.ui.totSurvAlert("관심 주제 설정에 따른 총 조사 결과 목록을 선택 후 <br>클릭해 주십시오.");
		}
		
		var imgData = window.opener.$totSurvMain.ui.detailCanvas;
		
		$("#detailReportImg").attr("src", imgData);
		
		console.log("#### $totSurvDetailReport load " + window.opener.$totSurvDetail.ui.selectTotSurvDataList[0]);
	});

	$totSurvDetailReport.ui = {
		//창 닫기
 		reportClose : function() {
 			window.opener.$totSurvMain.ui.isDetailPopup = null;
 			window.close();
 		},
 		
 		reportPrint : function() {
 			$(".pntBtn").hide();
			$(".pntCloseBtn").hide();
			$(".pntShowBtn").hide();
			
			document.body.innerHTML = document.getElementById('paintDiv').innerHTML;
			
			window.focus();
 			window.print();
 			setTimeout(function(){
 				window.close();
 			}, 1);
 		},
 		
 		reportPdfDown : function() {
 			
 			var agent = navigator.userAgent.toLowerCase();
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
				$totSurvDetailReport.ui.totSurvAlert("IE에서는 이미지 다운로드시 기능상 숫자 겹침이 <br/>발생하므로 크롬을 이용해주시기 바랍니다.");
			}else{
				$totSurvDetailReport.ui.totSurvConfirm("보고서를 PDF 저장 하시겠습니까?",
				  function savePDF() {
					
					$(".pntBtn").hide();
					$(".pntCloseBtn").hide();
					$(".pntShowBtn").hide();
					
					var fileNm = window.opener.$totSurvDetail.ui.selectTotSurvDataList[0].split("$")[1]
					
					html2canvas($("#paintDiv")[0], {
        				logging: true,
        				useCORS: false,
        				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
        			}).then(function(canvas) {

        				var imgData = canvas.toDataURL("image/png");
        				
        				html2pdf().from(canvas).set({
        					//top, left, bottom, right
				        	margin : [1, 1, 0, 1 ],  // 상단 0, 가운데 1
				        	filename: fileNm+'.pdf',
				        	html2canvas: {width:1300, heigth:800},
				        	pagebreak: { mode : 'avoid-all' },
				        	jsPDF: {orientation: 'p', unit: 'in', format: 'a4', compressPDF: true}
				        }).save();
        				        				
        				$(".pntBtn").show();
    					$(".pntCloseBtn").show();
    					$(".pntShowBtn").show();
        			});
		 		  }
		 		);
			}// else
 		},
 		
 		totSurvAlert : function(p_msg, p_callback) {
 			//화면 띄움
 			$("#totSurv_popup_back").show();
 			$("#totSurv_popup_alert").show();
 			$("#totSurv_popup_alert_message").html(p_msg);
 			
 			//이전 이벤트 제거
 			$("#totSurv_popup_back").unbind();
 			$("#totSurv_popup_alert_ok").unbind();
 			
 			//새로운 이벤트 맵핑
 			$("#totSurv_popup_back").click(function() {
 				$("#totSurv_popup_alert_close").click();
 			});
 			$("#totSurv_popup_alert_ok").click(function() {
 				$("#totSurv_popup_alert_close").click();
 				$totSurvDetailReport.ui.reportClose();
 			});
 		},
 		
 		totSurvConfirm : function(p_msg, p_callback, p_callback2) {
 			//화면 띄움
 			$("#totSurv_popup_back").show();
 			$("#totSurv_popup_confirm").show();
 			$("#totSurv_popup_confirm_message").html(p_msg);
 			
 			//이전 이벤트 제거
 			$("#totSurv_popup_back").unbind();
 			$("#totSurv_popup_confirm_ok").unbind();
 			$("#totSurv_popup_confirm_cancel").unbind();
 			
 			//새로운 이벤트 맵핑
 			$("#totSurv_popup_back").click(function() {
 				$("#totSurv_popup_confirm_close").click();
 			});
 			$("#totSurv_popup_confirm_ok").click(function() {
 				$("#totSurv_popup_confirm_close").click();
 				if(typeof p_callback === "function") {
 					p_callback();
 				}
 			});
 			$("#totSurv_popup_confirm_cancel").click(function() {
 				$("#totSurv_popup_confirm_close").click();
 				if(typeof p_callback2 === "function") {
 					p_callback2();
 				}
 			});
 		}
 		
	},

	$totSurvDetailReport.Util = {	
	}
	
}(window, document));




