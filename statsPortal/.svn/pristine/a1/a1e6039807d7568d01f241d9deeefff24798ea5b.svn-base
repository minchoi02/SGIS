/**
 * 총조사 시각화 보고서 출력
 *  
 */
(function(W, D) {
	W.$totSurvDashPrint = W.$totSurvDashPrint || {}
	
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
		
		console.log("#### $totSurvDashPrint ready #####" + window.opener.$totSurvMain.ui.selectedThema);
		
		
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
		
		var imgData = window.opener.$totSurvMain.ui.detailCanvas;
		
		$("#dashPrintImg").attr("src", imgData);
		
		console.log("#### $totSurvDashPrint load ");
	});

	$totSurvDashPrint.ui = {
		//창 닫기
 		reportClose : function() {
 			window.opener.$totSurvMain.ui.isDashPopup = null;
 			window.close();
 		},
 		
 		reportPrint : function() {
 			$(".pntBtn").hide();
			$(".pntCloseBtn").hide();
			$(".pntShowBtn").hide();
			
			var opener = window.parent.opener;
			opener.srvLogWrite('P0','01','06','02',opener.$totSurvMain.ui.selectedThema,'year='+opener.$totSurvMain.ui.selectedYear);
			
			document.body.innerHTML = document.getElementById('paintDiv').innerHTML;
			
			window.focus();
 			window.print();
 			setTimeout(function(){
 				window.close();
 			}, 1);
 		},
 		
 		reportPdfDown : function() {
 			var agent = navigator.userAgent.toLowerCase();
 			
 			var opener = window.parent.opener;
 			opener.srvLogWrite('P0','01','06','03',opener.$totSurvMain.ui.selectedThema,'year='+opener.$totSurvMain.ui.selectedYear+',agent='+navigator.appName);
 			
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
				$totSurvDashPrint.ui.totSurvAlert("IE에서는 이미지 다운로드시 기능상 숫자 겹침이 <br/>발생하므로 크롬을 이용해주시기 바랍니다.");
			}else{
				$totSurvDashPrint.ui.totSurvConfirm("PDF 저장 하시겠습니까?",
				  function savePDF() {
					
					$(".pntBtn").hide();
					$(".pntCloseBtn").hide();
					$(".pntShowBtn").hide();
					
					var fileNm = window.opener.$totSurvMain.ui.selectedThema + " 대쉬보드";
										
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
				        	html2canvas: {width:1270, heigth:601}, // 2020-11-24 [곽제욱] PDF 출력을 위해 width, height 수정
				        	pagebreak: { mode : 'avoid-all' },
				        	jsPDF: {orientation: 'l', unit: 'in', format: 'a4', compressPDF: true}
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
 				$totSurvDashPrint.ui.reportClose();
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

	$totSurvDashPrint.Util = {	
	}
	
}(window, document));




