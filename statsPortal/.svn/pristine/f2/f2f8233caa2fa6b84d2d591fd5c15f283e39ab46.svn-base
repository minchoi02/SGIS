/**
 * 서브 메뉴 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 서브메뉴 
 * 
 * history : 
 *	2018.09.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaSubMenu = W.$ssaSubMenu || {};
	
	$ssaSubMenu.ui = {
		prevIndex: 0,		// 이전 선택한 메뉴 인덱스

		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function() {
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_type == "full") {
				$(".expanded").stop().animate({"left":"0px"},200);// 2레벨 메뉴 열기
			}
			else {
				$(".expanded").stop().animate({"left":"80px"},200);// 2레벨 메뉴 열기
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			$ssaJobStatus.ui.ready();
			$ssaJobStatus.ui.show();
			
			//시각화 위치 조정
			$("#view1 .sop-left .sop-control").css("left","10px");
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hide : function() {
			$(".expanded").stop().animate({"left":"-380px"},200);// 2레벨 메뉴 숨기기
		},	
		
		/**
		 * @name         : 서브메뉴 선택
		 * @description  : 선택된 서브메뉴별로 분기 처리를 담당한다.
		 * @date         : 2018.09.10
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.10	ywKim	신규
		 * @param pIndex	: 메뉴 순번
		 */
		changeSubMenu : function (pIndex) {
			console.log('일자리 통계분석: submenu changed(' + (pIndex + 1) + ')');

			if ($ssaSubMenu.ui.prevIndex >= 0) {
				$('#ssaSubMenuList li').eq($ssaSubMenu.ui.prevIndex + 1).find('a').removeClass('active');
			}
			$('#ssaSubMenuList li').eq(pIndex + 1).find('a').addClass('active');
			
			setTimeout(function() {
				$ssaJobStatus.ui.hide(); //일자리현황 
				$ssaDetailPopup.ui.hide(); //일자리현황상세 		
				$ssaJobGrowth.ui.hide(); //일자리증감
				$ssaJobGrowthDetailPopup.ui.hide(); //일자리증감상세
				$ssaJobQuality.ui.hide();
				$ssaJobQualityDetailPopup.ui.hide(); 
				$ssaEconomicSituation.ui.hide();
				$ssaEconomicSituationDetailPopup.ui.hide();
				$ssaLifeQuality.ui.hide();
				$ssaLifeQualityDetailPopup.ui.hide();
			
				switch (pIndex) {
				case 0: $ssaJobStatus.ui.ready(); break;			
				case 1: $ssaJobGrowth.ui.ready(); break;			
				case 2: $ssaJobQuality.ui.ready(); break;
				case 3: $ssaEconomicSituation.ui.ready(); break;
				case 4: $ssaLifeQuality.ui.ready(); break;
				}
				
				switch (pIndex) {
				case 0: $ssaJobStatus.ui.show(); break;			
				case 1: $ssaJobGrowth.ui.show(); break;			
				case 2: $ssaJobQuality.ui.show(); break;
				case 3: $ssaEconomicSituation.ui.show(); break;
				case 4: $ssaLifeQuality.ui.show(); break;
				}
			}, 10);
			
			$ssaSubMenu.ui.prevIndex = pIndex;
		},	
	};	
	
	$ssaSubMenu.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				
				// 항목 선택
				$workRoad.event.set("click", "#ssaSubMenuList li", function(){
					var idx = $('#ssaSubMenuList li').index(this);
					if (idx > 0) {
						$ssaSubMenu.ui.changeSubMenu(idx - 1);
					}
				});

//				// 닫기(2레벨) 버튼 클릭 시
//				$workRoad.event.set("click",".step02 .stepClose",function(){
//					console.log("step02 Close");
//					$workRoadLeftMenu.ui.turnOffSwitch();
//				});
				

				$workRoad.event.set("focus", "#depth_2_menu label", function(e) {
					$("#depth_2_menu label").each(function(idx) {
						$("#depth_2_menu label").eq(idx).css("opacity", "1");
					});
					$(this).css("outline", "none");
					$(this).css("opacity", "0.7");
				});
				
				$workRoad.event.set("keydown", "#depth_2_menu label", function(e) {
					if (e.keyCode == 13) {
						$(this).trigger("click");
					}
				});
			},			
	}
	
}(window, document));