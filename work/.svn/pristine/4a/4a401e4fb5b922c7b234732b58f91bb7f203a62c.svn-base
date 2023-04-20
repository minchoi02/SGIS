
(function(W,D){
	W.$guideView = W.$guideView || {};
	
	$(document).ready(function(){
		$guideView.event.setUIEvent();
	});
	
	//UI 내용작성
	$guideView.ui = {
			
			/**
			 * 
			 * @name         : initView
			 * @description  : 화면을 초기화한다.
			 * @date         : 2018. 07. 17. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			initView : function() {
				//탭 초기화
				this.doChangeView(1);
			},
			
			/**
			 * 
			 * @name         : doChangeView
			 * @description  : 화면을 변경한다.
			 * @date         : 2018. 07. 17. 
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param idx : 타입(0:소개, 1:서비스소개, 2:사이트맵)
			 */
			doChangeView : function(idx) {
				switch(idx) {
					case 0:	//LBDMS란
						$("#introArea").show();
						$("#serviceArea").hide();
						$("#siteMapArea").hide();
						break;
					case 1:	//서비스 소개
						$("#serviceArea").show();
						$("#introArea").hide();
						$("#siteMapArea").hide();
						break;
					case 2:	//사이트 맵
						$("#siteMapArea").show();
						$("#introArea").hide();
						$("#serviceArea").hide();
						break;
					default:
						break;
				}
			}
	};
	
	//EVENT 내용작성
	$guideView.event = {
			
			setUIEvent : function(){
				
				//탭 선택 이벤트			
				$(".tab li").on("click", function() {
					$(".tab li").removeClass("on");
					$(this).addClass("on");
				});
				
			}
	};
	
}(window,document));