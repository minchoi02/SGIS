
(function(W, D) {
	W.$reportForm.event = W.$reportForm.event || {};
	$reportForm.event = {
			
		/**
		 * @name         : show
		 * @description  : 보이기
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @param id     : html id
		 */
		show : function(id){
			$("#"+id+"_show").hide();
			$("#"+id).show();
		},
		
		/**
		 * @name         : hide
		 * @description  : 숨기기
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @param id     : html id
		 */
		hide : function(id){
			$("#"+id).hide();
			$("#"+id+"_show").show();
		},
		
		/**
		 * @name         : reportPrint
		 * @description  : 프린트
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 */
 		reportPrint : function() {
 			//메모가 없을경우 숨김
 			if(!$("#memo").val()){
 				$("#normalMemo").hide();
 			}
			$(".pntBtn").hide();
			$(".pntCloseBtn").hide();
			$(".pntShowBtn").hide();
			window.focus();
 			window.print();
 			setTimeout(function(){
 				self.close();
 			}, 1);
 		},
 		
 		/**
		 * @name         : reportPdfDown
		 * @description  : pdf 다운 요청을 한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 */
 		reportPdfDown : function() {
 			if(!$("#memo").val()){
 				$("#normalMemo").hide();
 			}
 			$(".pntBtn").hide();
 			$(".pntCloseBtn").hide();
			$(".pntShowBtn").hide();
			
			this.savePDF();
 		},
 		
 		/**
		 * @name         : savePDF
		 * @description  : pdf로 다운한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 */
 		savePDF : function() {
			var scrollPos;
 			scrollPos = document.body.scrollTop;
 			window.scroll(0,0);
 			
			html2canvas(document.body, {}).then(function(canvas) {
				window.scrollTo(0,scrollPos);
				var imgData = canvas.toDataURL('image/png');
				var imgWidth = 210;
				var pageHeight = 297;
				var imgHeight = parseInt(canvas.height * imgWidth / canvas.width);
				var heightLeft = imgHeight;
				var pdf = new jsPDF('p', 'mm', 'a4');
				var position = 0;
				
				pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;
				
				while (heightLeft >= 0) {
					position = heightLeft - imgHeight;
					pdf.addPage();
					pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
					heightLeft -= pageHeight;
				}
				
				var currentdate = new Date();
				var fileCreateTime = $commonFunc.makeStamp(currentdate);
				pdf.save('Report_' + fileCreateTime + '.pdf'); 					
			});
 			
 			$(".pntBtn").show();
 			$(".pntCloseBtn").show();
		}
	};
}(window, document));