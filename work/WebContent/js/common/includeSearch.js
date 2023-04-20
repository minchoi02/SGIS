/**
 * 상단 검색에 대한 클래스
 *
 * history : 네이버시스템(주), 1.0, 2018/08/09  초기 작성
 * author : 권차욱
 * version : 1.0
 * see :
 *
 */
(function(W, D) {
	W.$includeSearch = W.$includeSearch || {};

	$(document).ready(function() {
		$includeSearch.event.setUIEvent();

	});

	$includeSearch.ui = {

	};

	$includeSearch.event = {

			/**
			 *
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
			 * @date         : 2018. 08. 09.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			setUIEvent : function() {

				//셀렉트박스 스타일
				$('#charset01, #charset02, #charset03, .select, .select01, .chkAll, .chkEtc, .rdEtc').styler({
					select: {
						search: {limit: 10}
					}
				});

				//신규 ui 적용 180830
				$("body").on("mouseover",".topMenu ",function(){
					$(".subMenuWrap").stop().animate({"top":"92px"}, 280);
				});
				$("body").on("mouseleave",".subMenuWrap",function(){
					$(".subMenuWrap").stop().animate({"top":"-200px"}, 280);
				});

				//셀렉트 박스 적용
				function selectSetter(id, setValue){
					var target1 = document.getElementById(id);
					target1.value= setValue;
					var selectValue = target1.options[target1.selectedIndex].text;
					var target2 = "#"+id+"-styler";
					$(target2+ " .jq-selectbox__select-text").text(selectValue);
				}




			}

	};
}(window, document));