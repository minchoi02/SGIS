
(function(W,D){
	W.$analysisMain = W.$analysisMain || {};
	
	$(document).ready(function(){
		$analysisMain.event.setUIEvent();
	});
	
	//UI 내용작성
	$analysisMain.ui = {
			
			/**
			 * 
			 * @name         : doChangeView
			 * @description  : 화면을 변경한다.
			 * @date         : 2018. 10. 11. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param type     : 타입(basic : 기초분석, expert : 응용분석)
			 */
			doChangeView : function(type) {
				if (type == undefined || type == null || type.length == 0) {
					return;
				}
				
				switch(type) {
					case "basic":	    //기초분석
						$("#expertAnalysis").hide();
						$("#basicAnalysis").show();
						break;
					case "expert":	//응용분석
						$("#basicAnalysis").hide();
						$("#expertAnalysis").show();
						break;
					default:
						break;
				}
				
			}
	};
	
	//AJAX 내용작성
	$analysisMain.request = {
			
	};
	
	//EVENT 내용작성
	$analysisMain.event = {
			
			setUIEvent : function(){
				
				
				
			}
	};
	
}(window,document));