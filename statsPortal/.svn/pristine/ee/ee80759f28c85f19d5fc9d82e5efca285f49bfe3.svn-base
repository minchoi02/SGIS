/**
 * My통계로 네비게이션
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
	W.$statsMeNavigation = W.$statsMeNavigation || {};

	$(document).ready(function() {
		//페이지 이벤트
		$statsMeNavigation.event.setUIEvent();
	});

	$statsMeNavigation.ui = {
		temp1 : "temp1", //임시 변수

		/**
		 * @name         : init 
		 * @description  : 초기화
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 * 		pMessage	: 로그 메세지 
		 */
		init : function() {
			//현재 페이지 불러오기
			var lvPageName = $statsMeMain.ui.currentPageName;
			
			//선택 메뉴 초기화
			$("#statsMeNavigation a[id^='statsMeNavigationPageMove_']").each(function() {
				var lvThis = $(this);
				var lvThisParent = lvThis.parent();
				var lvPageName = (""+lvThis.attr("id")).replace(/statsMeNavigationPageMove_/gi, "");
				if(lvThisParent.is("li")) {
					lvThisParent.removeClass("current");
				}
				else if(lvThisParent.is("div")) {
					lvThisParent.addClass("disable");
					lvThisParent.parent().children("div.view_list").hide();
				}
			});
			
			//메뉴 선택
			$("#statsMeNavigation a[id^='statsMeNavigationPageMove_']").each(function() {
				var lvThis = $(this);
				var lvThisParent = lvThis.parent();
				var lvThisPageName = (""+lvThis.attr("id")).replace(/statsMeNavigationPageMove_/gi, "");
				if(lvThisPageName == lvPageName) {
					if(lvThisParent.is("li")) {
						lvThisParent.addClass("current");
					}
					else if(lvThisParent.is("div")) {
						lvThisParent.removeClass("disable");
						lvThisParent.parent().children("div.view_list").show();
					}
				}
			});
		},
		
		/**
		 * @name         : statsMeSelectedItemNavigation 
		 * @description  : 선택한 생애주기, 관심분야 항목 Navigation 만들기
		 * @date         : 2019.08.21
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param 
		 * 		viewNm	 	: 화면 구분자 값
		 * 		pDataList	: 화면별 선택된 항목을 담은 List
		 */
		statsMeSelectedItemNavigation : function(viewNm, pDataList) {
			var html = '';
			var liShow = "#" + viewNm;
		
			$(liShow).empty();	// 하위 항목 삭제
			
			for(var i = 0; i < pDataList.length; i++){
				html += '<li>';
				html += '	<span>- </span>';				
				html += pDataList[i];
				html += '</li>';
			}
			
			$(liShow).append(html);		// 선택 항목 Navigation 표출
		},
		
		/**
		 * @name         : statMeCatalogNavigation 
		 * @description  : 선택한 카탈로그 항목 Navigation 만들기
		 * @date         : 2019.08.21
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 		pDataList	: 선택된 카탈로그 항목을 담은 List
		 */
		statMeCatalogNavigation : function(pDataList){
			var html = '';
			$("#catalogStatDataNavigation").empty();	// 하위 항목 삭제
			
			for(var i = 0; i < pDataList.length; i++){
				html += '<li>';
				var statData = pDataList[i].split('$');
				html += '<a href="javascript:void(0);" stat_data_id="' + statData[0] + '" title="' + statData[1] + '">' + statData[1] + '</a>';
				html += '</li>';
			}
			
			$("#catalogStatDataNavigation").append(html);		// 선택 카탈로그 항목 Navigation 표출
		},
		
		/**
		 * @name         : clearNavigation 
		 * @description  : navigation 초기화
		 * @date         : 2019.09.02
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param 
		 * 		viewNm	 	: 화면 구분자 값
		 * 		dataListNm	: navigation list 명칭
		 */
		clearNavigation : function(viewNm, dataListNm){
			var liShow = "#" + viewNm;
			$(liShow).empty();	// 하위 항목 삭제
			
			if(dataListNm == 'lifeCycle'){
				$statsMeLifeCycle.ui.clearLifeCycle();		// 생애주기 선택 항목 초기화
			} else if(dataListNm == 'interestRealm'){
				$statsMeInterestRealm.ui.clearInterestRealm();	// 관심분야 선택 항목 초기화
			}
		}
	};

	$statsMeNavigation.event = {
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

			//네비게이션 메뉴 클릭
			body.on("click", "#statsMeNavigation a[id^='statsMeNavigationPageMove_']", function() {
				var lvThis = $(this);
				var lvPageName = (""+lvThis.attr("id")).replace(/statsMeNavigationPageMove_/gi, "");
				
				// 생애주기, 관심분야, 카탈로그 화면에서는 지도 및 상세정보로 화면이동 불가능 단, 지도 및 상세정보 화면에서는 모든 화면으로 이동 가능
				if($statsMeMain.ui.currentPageName == 'statsMeLifeCycle' || $statsMeMain.ui.currentPageName == 'statsMeInterestRealm' || $statsMeMain.ui.currentPageName == 'statsMeCatalog'){
					if(lvPageName != 'statsMeMap' && lvPageName != 'statsMeDetailInfo' ) {
						$statsMeMain.ui.changePage(lvPageName);
					} else {
						// 카탈로그 목록 화면에서 지도로 확인해요/상세정보를 확인해요 클릭시 통계정보 목록 선택시 화면이동, 미선택시 alert 출력
						if($statsMeMain.ui.currentPageName == 'statsMeCatalog') {
							if(lvPageName == 'statsMeMap'){
								// 2020.02.19 log 생성
								srvLogWrite('N0', '08', '15', '00', '', ''); //카탈로그 목록 -> 지도로 확인해요

								$("#statsMeCatalogPageMap").trigger("click");
							}
							if(lvPageName == 'statsMeDetailInfo'){
								// 2020.02.19 log 생성
								srvLogWrite('N0', '08', '16', '00', '', ''); //카탈로그 목록 -> 상세보기로 확인해요

								$("#statsMeCatalogPageDetailInfo").trigger("click");							
							}
						}
					}
				} else if($statsMeMain.ui.currentPageName == 'statsMeMap' || $statsMeMain.ui.currentPageName == 'statsMeDetailInfo') {
					if(lvPageName == 'statsMeLifeCycle' || lvPageName == 'statsMeInterestRealm' || lvPageName == 'statsMeCatalog'){
						$statsMeMain.ui.confirm2(
							"지금 보고 있는 화면을 나가시겠습니까?<br>화면을 나가시면 지금 보는 지도화면이<br>초기화 됩니다.",
							"알림",
							function() {
								$statsMeMain.ui.changePage(lvPageName);
							}
						);
					}
					else {
						// 2020.02.19 log 생성
						if(lvPageName == 'statsMeMap') {
							srvLogWrite('N0', '10', '07', '00', '', '');	//상세보기->지도보기
						}
						if(lvPageName == 'statsMeDetailInfo'){
							srvLogWrite('N0', '09', '13', '00', '', '');	//지도보기->상세보기
						}
						
						$statsMeMain.ui.changePage(lvPageName);
					}
				} else {
					$statsMeMain.ui.changePage(lvPageName);
				}
			});
			
			//카탈로그 클릭
			body.on("click", "#catalogStatDataNavigation>li>a", function() {
				var lv_this = $(this);
				var lv_stat_data_id = lv_this.attr("stat_data_id");
				
				// 선택 처리
				$("#catalogStatDataNavigation>li>a").removeClass("current");
				lv_this.addClass("current");
				
				// 지도/상세정보 화면에서 처리
				if($statsMeMain.ui.currentPageName == 'statsMeMap' || $statsMeMain.ui.currentPageName == 'statsMeDetailInfo') {
					// 2020.02.19 log 생성
					if($statsMeMain.ui.currentPageName == 'statsMeMap'){
						srvLogWrite('N0', '09', '14', '00', $(this).text(), '');						
					} else if ($statsMeMain.ui.currentPageName == 'statsMeDetailInfo'){
						srvLogWrite('N0', '10', '08', '00', $(this).text(), '');
					}
					$statsMeMap.ui.loadMapData(lv_stat_data_id);
				}
				// 기타 화면에서 처리
				else {
					$statsMeMain.ui.changePage("statsMeMap");
					$statsMeMap.ui.loadMapData(lv_stat_data_id);
				}

				$statsMeCatalog.ui.catalogSrvUsageHistory(lv_stat_data_id, $statsMeMain.ui.currentPageName);		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
			// 윈도우 크기 변경시 네비게이션 사이즈 맞춤.
			$(window).resize(function() {
				if($statsMeMain.ui.currentPageName == "statsMeMap" || $statsMeMain.ui.currentPageName == "statsMeDetailInfo") {
					setTimeout(function() {
						var lvHeight = Number($(window).outerHeight(true)) - 28;
						$("#statsMeNavigationSideBox").height(lvHeight);
					}, 100);
				}
			});
			//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
		}
	};
}(window, document));