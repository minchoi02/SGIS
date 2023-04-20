/**
 * 
 * @autor : pse
 * @description	: 쿠키를 이용해서 도움말 창을 자동으로 띄우는 기능을 하는 js 파일입니다.
 * 
 */
// 생활업종 도움말 상자에 쓰이는 쿠키와 관련된 모든 작업을 수행하는 js 입니다. (pse)
(function(W, D) {
	
	var current = new Date();
	var limitDate = new Date('2021-01');	// 보여주고 싶은 날까지만 설정한다.
	
	if(current.getTime() < limitDate.getTime()){	
		
		$(document).ready(function(){
			if(!commonPopupObj.getCookie('helperIndicator')) {	// 쿠키가 없다면 만든다.
				commonPopupObj.setCookie('helperIndicator','Y',1) // 그날 당일 하루동안은 유지되는 쿠키 생성
				//$('.noMoreWatchWrapper').css("display","block");	  // 만약 오늘 하루 보지 않기가 숨겨져 있다면 다시 보이게 한다.
			}
			
			//commonPopupObj.getCookie('helperIndicator') === 'Y'
			/* 주소창에 biz={숫자} 파라미터를 넣었을 때의 반응 [START] */
			var href = document.location.href;
			var parameter = "";
			
			var bizList = [1,2,3,4,5,6];
			var bizNumber = -1;
			
			
			
			if(href.indexOf("?") !== -1) {
				parameter = href.substr(href.indexOf("?")+1);
				parameter.split("&").forEach(function(item,index) {
					if(item.indexOf('biz=') != -1) {
						bizNumber = parseInt(item.split("=")[1]);
					} 
				});
				
				if( bizNumber !== -1	// 현재 주소창에 biz 파라미터의 값이 있고
					&& commonPopupObj.getCookie('helperIndicator') === 'Y'
					&& bizList.some(function(item,index){ return item === bizNumber} )) { 	// 해당 파라미터 값이 1,2,3,4,5,6 에 해당하는지 확인하고

					$('#help-indicator').show();
				}
			}
			
			/* 주소창에 biz={숫자} 파라미터를 넣었을 때의 반응 [END] */
			
			
			/* 왼쪽 메뉴에서 탭 클릭시 반응하는 이벤트 등록 [START] */
			$('.ul-area.attr-area:eq(0) a, .ul-area.attr-area:eq(1) a, .bizLeftMenu2 .title-list a:lt(6)').on('click',function(e){
				if(commonPopupObj.getCookie('helperIndicator') === 'Y') {
					$('#help-indicator').show();
				}
			});
			/* 왼족 메뉴에서 탭 클릭시 반응하는 이벤트 등록 [END] */
			
			
			/* 도움말에서  아래 오늘 하루 보지 않기를 누르면 발생하는 일 [START] */
			$('.noMoreWatchWrapper input').on('change', function(){
			    if(this.checked) {
			        $('#help-indicator .ContBox .BtnClose').click();
			        $(this).parent().css("display","none");
			        commonPopupObj.setCookie('helperIndicator','N',1)	// 쿠키값을 N 으로준다.
			    }
			});
			/* 도움말에서  아래 오늘 하루 보지 않기를 누르면 발생하는 일 [END] */
			
			
			// 만약 이미 쿠키값이 N 이면 도움말 안에 있는 "오늘 햐루 보지 않기" 버튼을 안보이게 한다.
			if(commonPopupObj.getCookie('helperIndicator') === 'N') {
				$('.noMoreWatchWrapper').css("display","none");
			}
			
			
		});
	} else {	// 지정된 기간(limitDate)이 지나면 "오늘 하루 보지 않기"를 안 보이게 한다.
		$('.noMoreWatchWrapper').css("display","none");
	}
	
}(window, document));