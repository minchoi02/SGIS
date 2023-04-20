/**
 * 
 * history : 네이버시스템(주), 1.0, 2020/12/01
 * author : SGIS+ 운영팀
 * version : 1.0
 * mng_s 2020. 12. 01 j.h.Seok 통계주제도 통합
 *
 */

(function(W, D) {
	W.$reportFormEvent = W.$reportFormEvent || {}
	$(document).ready(function() {
		$reportFormEvent.UI.pntTitle();
		$("body").on("keyup","#reportTitle", function(){ //2017.03.09 보고서 수정
			$reportFormEvent.UI.auto_text();
		});		
	});
	
	$reportFormEvent.UI = {
		 		//보고서 프린트
		 		reportPrint : function() {
		 			//메모가 없을경우 숨김
		 			if($("#memo").val() == "") {
		 				$("#memoDiv").hide();
		 			}
					$(".pntBtn").hide();
					$(".pntCloseBtn").hide();
					$(".pntShowBtn").hide();
					
					window.focus();
		 			window.print();
		 			setTimeout(function(){
		 				window.close();
		 			}, 1);
		 		},
		 		
		 		//창 닫기
		 		reportClose : function() {
		 			window.close();
		 		},
		 		
		 		auto_text : function() {
		 			var seletor = $("#reportTitle"); //2017.03.09 보고서 수정
		 			seletor.css("height","30px"); 
		 			var sHeight = seletor.prop("scrollHeight"); 
		 			seletor.css("height",parseInt(sHeight)+"px"); 
		 		},
		 		
		 		pntTitle : function() { 
		 			var seletor = $("#reportTitle"); //2017.03.09 보고서 수정
		 			var maxNum = 35;
		 			var rows = parseInt((seletor.val().length/maxNum)+1);
		 			seletor.css("height",parseInt(rows*30)+"px"); 
		 		},
		 		
		 		//2017.03.09 보고서 수정
		 		//==============================================================================//
		 		reportPdfDown : function() {
		 			$(".pntBtn,.pntCloseBtn,.pntShowBtn,#pntLegend").attr("data-html2canvas-ignore", true);
					this.savePDF();
		 		},
		 		
		 		savePDF : function() {
		 			var currentdate = new Date();
					var fileCreateTime = makeStamp(currentdate);
					
		 			var element = document.getElementById('wrap');
		        	
			        html2pdf().from(element).set({
			        	margin : [ 0, -0.1, 0, 0 ],
			        	filename: fileCreateTime+'.pdf',
			        	pagebreak: { mode : 'avoid-all' },
			        	jsPDF: {orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true}
			        }).save();
		 		}
		 		//==============================================================================//
	}
}(window, document));