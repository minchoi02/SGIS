/**
 * 일자리맵 서비스 데이터보드에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/10/28  초기 작성
 * author : 김성현
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjDataBoard = W.$vjDataBoard || {};
	
	$vjDataBoard.ui = {
		
		/**
		 * @name         : 데이터보드 열기/닫기
		 * @description  : 
		 * @date         : 2018.10.10
		 * @author	     : ywKim
		 * @history 	 :
		 * @param pVisible	: true - 열기
		 * 					  false - 닫기
		 * 					  undefined - 토글 
		 */
		toggleDataboard: function (pVisible) {
			var ck = false;
			
			if (typeof pVisible == 'undefined') {
				ck = $('#vjDataBoard .workRoadDataBoard').hasClass('on');
			} else {
				ck = !pVisible;
			}
			
			if (!ck) {
				$vjDataBoard.ui.showByAnimation();
			} else {
				$vjDataBoard.ui.hideByAnimation();
			}
		},
		/**
		 * @name         : 데이터보드 열기
		 * @description  : 
		 * @date         : 2018.10.29
		 * @author	     : ywKim
		 * @history 	 :
		 * @param 
		 */
		showByAnimation: function () {
			var $this = $('#vjDataBoard .workRoadDataBoard');
			var right = '0';
			$('#vjDataBoard .dataSideBox').stop().animate({right:'0px'},200);
			
			if (typeof $this.data('dest') != 'undefined') {
				$(".sop-right").stop().animate({"right":"668px"},200);//2019-06-12 박길섭
				$this.addClass('on').stop().animate({right: $this.data('dest')},200);
				right = $this.data('dest').toLowerCase().replace('px', '');
			} else {
				$(".sop-right").stop().animate({"right":"558px"},200);//2019-06-12 박길섭
				$this.addClass('on').stop().animate({right: '426px'},200);
				right = '426';
			}
			
			right = Number(right) + 130; // 125: 토글버튼 너비, 5: 여백
			$vjConditionList.ui.move(right + 'px');
		},
		/**
		 * @name         : 데이터보드 닫기
		 * @description  : 
		 * @date         : 2018.10.29
		 * @author	     : ywKim
		 * @history 	 :
		 * @param 
		 */
		hideByAnimation: function () {
			$('#vjDataBoard .dataSideBox').removeClass('full');
			$('#vjDataBoard .dataSideBox').stop().animate({right: '-1500px'},200);
			$('#vjDataBoard .workRoadDataBoard').removeClass('on').stop().animate({right: '0'},200);
			$(".sop-right").stop().animate({"right":"0px"},200);//2019-06-12 박길섭
			
			$vjConditionList.ui.move();
		},
		/**
		 * @name         : 데이터보드에 컨텐츠 불러오기
		 * @description  : 
		 * @date         : 2018.10.29
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pUrl 		: 컨텐츠 url
		 * 			pDataParam	: 컨텐츠 url 호출에 필요한 파라미터 목록 (컨텐츠에서 jtl 사용시)
		 * 			pWidth		: 데이터 보드 너비 (컨텐츠마다 다를수 있음)
		 * 			pCallback	: 컨텐츠를 불러온 직후 호출될 콜백함수
		 */
		showContents: function (pUrl, pDataParam, pWidth, pCallback) {
			var btnToggleWidth = 124; 	// 데이터보드 상단 토글(데이터보드 보이기/숨기기)버튼의 너비
			var dataBoardWidth = null;	// 데이터보드 너비 (숫자)
			var btnToggleRight = null;	// 데이터보드 상단 토글버튼위 위치 (right 기준)
			
			// 데이터보드 및 토글버튼 너비,위치 조정
			if (pWidth != null) {
				if (typeof pWidth == 'number') {
					dataBoardWidth = pWidth;
				} else if (typeof pWidth == 'string') {
					if (pWidth.toLowerCase().indexOf('px')) {
						dataBoardWidth = pWidth.toLowerCase().replace('px', '');
					}
				}			
				if (dataBoardWidth != null) {
					btnToggleRight = dataBoardWidth - btnToggleWidth;
					$('#vjDataBoard .dataSideBox').css({width: dataBoardWidth + 'px'});
					$('#vjDataBoard .workRoadDataBoard').data('dest', btnToggleRight + 'px');
				}
			} else {// 기본 너비,위치
				$('#vjDataBoard .dataSideBox').css({width: '550px'});
				$('#vjDataBoard .workRoadDataBoard').data('dest', '426px');
			}
			
			
			$vjDataBoard.ui.toggleDataboard(false);

			var $div = $('#vjDataBoard .dataSideContents');
			$div.html('');
			
			$div.load(pUrl, pDataParam, function() {
				$vjDataBoard.ui.toggleDataboard(true);
				
				if (typeof pCallback != 'undefined') {
					pCallback();
				}
				
//				$workRoad.ui.hideLoading();// 콜백함수에서 로딩함수 사용후 미처리되는 상황방지를 위해 한번더 호출한다.	// 주석: 페이지 내부에서 loading 을 사용할때 ajax 비동기처리할때 문제가 됨 - 2019.01.04	ywKim	변경
			});
		},
	};

	$vjDataBoard.event = {
		/**
		 * 
		 * @name         : setUIEvent
		 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2015. 10. 28. 
		 * @author	     : 김성현
		 * @history 	 :
		 * @param
		 */	
		setUIEvent : function() {
			console.log("$vjDataBoard.event.setUIEvent() called.");
			
			//닫기 버튼
			$workRoad.event.set("click","#vjDataBoard .dataSideBox .bar>a",function(){
				$vjDataBoard.ui.hideByAnimation();
			});

			//데이터보드 열고 닫기
			$workRoad.event.set("click","#vjDataBoard .workRoadDataBoard",function(){
				$vjDataBoard.ui.toggleDataboard();
			});
		}
	};	
}(window, document));