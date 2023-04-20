/**
 * My통계로 (생애주기)
 * 
 * history : 
 * 2019.08.08	김남민	최초작성
 * 
 * 
 * author : 김남민
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$statsMeLifeCycle = W.$statsMeLifeCycle || {};

	$(document).ready(function() {
		//페이지 이벤트
		$statsMeLifeCycle.event.setUIEvent();
		
		//툴팁 설정
		$("#statsMeLifeCycle [title]:not([disabled])").tooltip();
	});

	$statsMeLifeCycle.ui = {
		callCount : 0, //페이지 호출 횟수
		lifeCycleCount : 0,	// 생애주기 선택 갯수

		/**
		 * @name		 : init
		 * @description  : 페이지 초기화 함수 
		 * @date		 : 2019.08.19 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		init : function() {
			// 2020.02.14 접근log 생성
			srvLogWrite('N0', '06', '01', '00', '', '');

			//페이지 호출 횟수 증가
			$statsMeLifeCycle.ui.callCount++;
		},
	
		/**
		 * @name		 : LifeCycleClick
		 * @description  : 생애주기 선택
		 * @date		 : 2019.08.20 
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		item   : 생애주기 id
		 * 		itemNm : 생애주기 명
		 */
		LifeCycleClick : function(item, itemNm) {
			var DivClick = "#" + item;
			
			// 2020.02.19 log 생성
			srvLogWrite('N0', '06', '02', '00', itemNm, '');

			if($(DivClick).is(".selected") == true) {
				$(DivClick).removeClass("selected");
				// 생애주기 선택 갯수 삭제
				$statsMeLifeCycle.ui.lifeCycleCount--;
				
				// 생애주기 선택항목 id list에서 삭제
				$statsMeMain.ui.lifeCycleItemIdList.splice($statsMeMain.ui.lifeCycleItemIdList.indexOf(item), 1);
				// 생애주기 선택항목 명 list에서 삭제
				$statsMeMain.ui.lifeCycleItemNmList.splice($statsMeMain.ui.lifeCycleItemNmList.indexOf(itemNm), 1);
			} else {
				// 생애주기 선택 갯수 체크
				if($statsMeLifeCycle.ui.lifeCycleCount == 2){
					/** 생애주기 두개 이상 선택시 최초 선택 항목 삭제처리 START */
					// 생애주기 선택 갯수 삭제
					var tempItemId= $statsMeMain.ui.lifeCycleItemIdList[0];
					var tempItemNm= $statsMeMain.ui.lifeCycleItemNmList[0];
					// 최초 선택 항목 css 제거
					var tempDivClick = "#" + tempItemId;
					$(tempDivClick).removeClass("selected");
					// 생애주기 선택항목 id list에서 삭제
					$statsMeMain.ui.lifeCycleItemIdList.splice($statsMeMain.ui.lifeCycleItemIdList.indexOf(tempItemId), 1);
					// 생애주기 선택항목 명 list에서 삭제
					$statsMeMain.ui.lifeCycleItemNmList.splice($statsMeMain.ui.lifeCycleItemNmList.indexOf(tempItemNm), 1);
					/** 생애주기 두개 이상 선택시 최초 선택 항목 삭제처리 END */
					
					/** 2개 이상 선택 후 선택 한 항목 추가 START */
					$(DivClick).addClass("selected");
					// 생애주기 선택항목 id list에 추가
					$statsMeMain.ui.lifeCycleItemIdList.push(item);
					// 생애주기 선택항목 명 list에 추가
					$statsMeMain.ui.lifeCycleItemNmList.push(itemNm);
					/** 2개 이상 선택 후 선택 한 항목 추가 END */
				} else {					
					$(DivClick).addClass("selected");
					// 생애주기 선택 갯수 증가
					$statsMeLifeCycle.ui.lifeCycleCount++;
					
					// 생애주기 선택항목 id list에 추가
					$statsMeMain.ui.lifeCycleItemIdList.push(item);
					// 생애주기 선택항목 명 list에 추가
					$statsMeMain.ui.lifeCycleItemNmList.push(itemNm);
				}
			}
			
			// My통계로 Navigation 설정
			$statsMeNavigation.ui.statsMeSelectedItemNavigation('lifeCycleNavigation', $statsMeMain.ui.lifeCycleItemNmList);
		},
		
		/**
		 * @name		 : clearLifeCycle
		 * @description  : 생애주기 선택 초기화
		 * @date		 : 2019.09.02
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		clearLifeCycle : function(){
			var DivClick = "#";
			for(var i = 0; i < $statsMeMain.ui.lifeCycleItemIdList.length; i++){
				DivClick += $statsMeMain.ui.lifeCycleItemIdList[i];
				$(DivClick).removeClass("selected");	// 선택한 생애주기 class 변경
				$statsMeLifeCycle.ui.lifeCycleCount--;	// 생애주기 선택 갯수 초기화
			}
			
			$statsMeMain.ui.lifeCycleItemIdList = [];
			$statsMeMain.ui.lifeCycleItemNmList = [];
		}
	};

	$statsMeLifeCycle.event = {
		/**
		 * @name		 : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date		 : 2019.08.08 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		setUIEvent : function() {
			var body = $("body");

			//다음페이지
			body.on("click", "#statsMeLifeCyclePageNext", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '06', '03', '00', '', '');
				
				$statsMeMain.ui.changePage("statsMeInterestRealm");
			});
			
			//이전페이지 (없음)
			body.on("click", "#statsMeLifeCyclePagePrev", function() {
				
			});
		}
	};
}(window, document));