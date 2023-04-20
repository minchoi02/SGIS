/**
 * 주요지표 설명 팝업
 * 경로 : 일자리 맵 서비스 > 일자리통계분석 > 일자리현황, 일자리증감, 일자리 질, 경제상황, 삶의 질 > 주요지표 설명 팝업
 * 
 * history : 
 *	2019.05.17	한광희		신규
 *
 * author : 한광희
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaDetailInfoPopup = W.$ssaDetailInfoPopup || {};
	
	$ssaDetailInfoPopup.ui = {
		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2019.05.17
		 * @author	     : 한광희
		 * @history 	 : 
		 * 		2019.05.17	한광희		신규
		 * @param
		 */
		show : function(pLeft, pTop) {
			$workRoad.ui.showLayer('#ssaDetailInfoPopup', {left: pLeft, top: pTop});
			$('#ssaDetailInfoPopup').css('z-index', '20');
			$('body').off('click','#ssaDetailInfoPopup');
			$('body').on('click','#ssaDetailInfoPopup', function() { 
				$workRoad.ui.selectedLayer = null;
			});
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2019.05.17
		 * @author	     : 한광희
		 * @history 	 : 
		 * 		2019.05.17	한광희		신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideLayer('#ssaDetailInfoPopup');
		}
	};	
	
	$ssaDetailInfoPopup.event = {
			myFunc: function() { 
				alert("I'm a function in the parent window"); 
			},

			/**
			 * @name		 : setUIEvent 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2019.05.17
			 * @author		 : 한광희
			 * @history 	 :
			 * 		2019.05.17	한광희		신규
			 */
			setUIEvent: function() {
					
			},			
	}
	
}(window, document));