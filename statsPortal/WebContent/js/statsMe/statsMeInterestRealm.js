/**
 * My통계로 (관심분야)
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
	W.$statsMeInterestRealm = W.$statsMeInterestRealm || {};

	$(document).ready(function() {
		//페이지 이벤트
		$statsMeInterestRealm.event.setUIEvent();
		
		//툴팁 설정
		$("#statsMeInterestRealm [title]:not([disabled])").tooltip();
	});

	$statsMeInterestRealm.ui = {
		callCount : 0, //페이지 호출 횟수
		interestRealmCount : 0,	// 관심분야(거리선택) 선택 갯수
		
		/**
		 * @name		 : init
		 * @description  : 페이지 초기화 함수 
		 * @date		 : 2019.08.19 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		init : function() {
			// 2020.02.19 log 생성
			srvLogWrite('N0', '07', '01', '00', '', '');
			
			//페이지 호출 횟수 증가
			$statsMeInterestRealm.ui.callCount++;
		},
		
		/**
		 * @name		 : InterestRealmClick
		 * @description  : 관심분야(거리선택) 선택
		 * @date		 : 2019.08.20 
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		item   : 관심분야(거리선택) id
		 * 		itemNm : 관심분야(거리선택) 명
		 */
		InterestRealmClick : function(item, itemNm) {
			var DivClick = "#" + item;
			
			// 2020.02.19 log 생성
			srvLogWrite('N0', '07', '02', '00', itemNm, '');
			
			if($(DivClick).is(".selected") == true) {
				$(DivClick).removeClass("selected");
				// 생애주기 선택 갯수 삭제
				$statsMeInterestRealm.ui.interestRealmCount--;
				
				// 관심분야(거리선택) 선택항목 id list에서 삭제
				$statsMeMain.ui.interestRealmItemIdList.splice($statsMeMain.ui.interestRealmItemIdList.indexOf(item), 1);
				// 관심분야(거리선택) 선택항목 명 list에서 삭제
				$statsMeMain.ui.interestRealmItemNmList.splice($statsMeMain.ui.interestRealmItemNmList.indexOf(itemNm), 1);
			} else {
				// 관심분야(거리선택) 선택 갯수 체크
				if($statsMeInterestRealm.ui.interestRealmCount == 2){
					/** 관심분야(거리선택) 두개 이상 선택시 최초 선택 항목 삭제처리 START */
					// 관심분야(거리선택) 선택 갯수 삭제
					var tempItemId= $statsMeMain.ui.interestRealmItemIdList[0];
					var tempItemNm= $statsMeMain.ui.interestRealmItemNmList[0];
					// 최초 선택 항목 css 제거
					var tempDivClick = "#" + tempItemId;
					$(tempDivClick).removeClass("selected");
					// 관심분야(거리선택) 선택항목 id list에서 삭제
					$statsMeMain.ui.interestRealmItemIdList.splice($statsMeMain.ui.interestRealmItemIdList.indexOf(tempItemId), 1);
					// 관심분야(거리선택) 선택항목 명 list에서 삭제
					$statsMeMain.ui.interestRealmItemNmList.splice($statsMeMain.ui.interestRealmItemNmList.indexOf(tempItemNm), 1);
					/** 관심분야(거리선택) 두개 이상 선택시 최초 선택 항목 삭제처리 END */
					
					/** 2개 이상 선택 후 선택 한 항목 추가 START */
					$(DivClick).addClass("selected");
					// 관심분야(거리선택) 선택항목 id list에 추가
					$statsMeMain.ui.interestRealmItemIdList.push(item);
					// 관심분야(거리선택) 선택항목 명 list에 추가
					$statsMeMain.ui.interestRealmItemNmList.push(itemNm);
					/** 2개 이상 선택 후 선택 한 항목 추가 END */
				} else {					
					$(DivClick).addClass("selected");
					// 관심분야(거리선택) 선택 갯수 증가
					$statsMeInterestRealm.ui.interestRealmCount++;
					
					// 관심분야(거리선택) 선택항목 id list에 추가
					$statsMeMain.ui.interestRealmItemIdList.push(item);
					// 관심분야(거리선택) 선택항목 명 list에 추가
					$statsMeMain.ui.interestRealmItemNmList.push(itemNm);
				}
			}
			
			// My통계로 Navigation 설정
			$statsMeNavigation.ui.statsMeSelectedItemNavigation('interestRealmNavigation', $statsMeMain.ui.interestRealmItemNmList);
		},
		
		/**
		 * @name		 : clearInterestRealm
		 * @description  : 관심분야 선택 초기화
		 * @date		 : 2019.09.02
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		clearInterestRealm : function(){
			var DivClick = "#";
			for(var i = 0; i < $statsMeMain.ui.interestRealmItemIdList.length; i++){
				DivClick += $statsMeMain.ui.interestRealmItemIdList[i];
				$(DivClick).removeClass("selected");			// 선택한 관심분야 class 변경
				$statsMeInterestRealm.ui.interestRealmCount--;	// 관심분야 선택 갯수 초기화
			}
			
			$statsMeMain.ui.interestRealmItemIdList = [];
			$statsMeMain.ui.interestRealmItemNmList = [];
		}
	};

	$statsMeInterestRealm.event = {
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
			body.on("click", "#statsMeInterestRealmPageNext", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '07', '04', '00', '', '');
				
				$statsMeMain.ui.changePage("statsMeCatalog");
			});
			
			//이전페이지
			body.on("click", "#statsMeInterestRealmPagePrev", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '07', '03', '00', '', '');
				
				$statsMeMain.ui.changePage("statsMeLifeCycle");
			});
		}
	};
}(window, document));