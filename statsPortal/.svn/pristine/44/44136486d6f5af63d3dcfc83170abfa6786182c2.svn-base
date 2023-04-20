/**
 * My통계로 Main
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
	W.$statsMeMain = W.$statsMeMain || {};

	$(document).ready(function() {
		//페이지 이벤트
		$statsMeMain.event.setUIEvent();

		//화면 불러오기
		if(gv_bookmark_yn == "Y") {
			$statsMeMain.ui.changePage(gv_bookmark_params_info.paramInfo.page);
		}
		/** 2020.04.06[한광희] SGIS 포털 검색에서 화면이동 START */
		else if(gv_potal_search_type == "Y"){
			$statsMeMain.ui.changePage("statsMeMap");
		}
		/** 2020.04.06[한광희] SGIS 포털 검색에서 화면이동 END */
		else {
			$statsMeMain.ui.changePage("statsMeLifeCycle");
		}

		//툴팁 기본세팅 Override
		$.extend($.ui.tooltip.prototype.options, {
			track: true, //마우스 위치에 표시
		    delay: 0
		});

		// 2020.02.19 log 생성
		srvLogWrite('N0', '02', '00', '00', '', '');

		window.onhashchange = function(){
			var url = window.location.href;
			if(url.split('\#').length == 2){
				switch (url.split('\#')[1])
				{
				case "1":
					$statsMeMain.ui.changePage("statsMeLifeCycle");
					break;
				case "2":
					$statsMeMain.ui.changePage("statsMeInterestRealm");
					break;
				case "3":
					$statsMeMain.ui.changePage("statsMeCatalog");
					break;
				case "4":
					$statsMeMain.ui.changePage("statsMeMap");
					break;
				case "5":
					$statsMeMain.ui.changePage("statsMeDetailInfo");
					break;
				}
			}
		}

	});

	$statsMeMain.ui = {
		lifeCycleItemIdList : [],			// 생애주기 선택항목 id list
		lifeCycleItemNmList : [],			// 생애주기 선택항목 명 list
		interestRealmItemIdList : [],		// 관심분야(거리선택) 선택항목 id list
		interestRealmItemNmList : [],		// 관심분야(거리선택) 선택항목 명 list
		catalogCheckedDataList : [],		// 카탈로크 선택항목 list
		searchKwrdGb : "",					// 키워드 검색구분
		searchKwrd : "",					// 키워드 검색명

		//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
		//최소 화면크기 (생애주기, 관심분야, 카탈로그에만 적용)
		screen_min_width : 1280,
		screen_min_height : 839,
		//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END

		//내 현재위치
		my_location_yn : "N", // 내 위치 조회 여부
		my_x : 989674, // x
		my_y : 1818313, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명

		//저장된 위치
		default_sido_cd : "25", // 시도코드
		default_sido_nm : "대전광역시", // 시도명
		default_sido_x : 990493.5945803534, // 시도 x
		default_sido_y : 1815828.82237, // 시도 y
		default_sgg_cd : "030", // 시군구코드
		default_sgg_nm : "서구", // 시군구명
		default_sgg_x : 986097.311596368, // 시군구 x
		default_sgg_y : 1809240.84784, // 시군구 y
		default_emdong_cd : "60", // 읍면동코드
		default_emdong_nm : "둔산2동", // 읍면동명
		default_emdong_x : 989749.2142006928, // 읍면동 x
		default_emdong_y : 1817802.41717, // 읍면동 y
		default_x : 989674, // x
		default_y : 1818313, // y

		loadingBar : new sop.portal.absAPI(),
		pageData : {
			//My통계로 (생애주기) 화면
			statsMeLifeCycle : {order : 1,narrow_wide : "narrow",init : function() { $statsMeLifeCycle.ui.init(); if(window.location.href.indexOf("statsMeMain#1")>-1){}else{history.pushState(null,"My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.", "/view/statsMe/statsMeMain#1");} }},
			//My통계로 (관심분야) 화면
			statsMeInterestRealm : {order : 2,narrow_wide : "narrow",init : function() {  $statsMeInterestRealm.ui.init(); if(window.location.href.indexOf("statsMeMain#2")>-1){}else{history.pushState(null,"My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.", "/view/statsMe/statsMeMain#2");} }},
			//My통계로 (카탈로그) 화면
			statsMeCatalog : {order : 3,narrow_wide : "narrow",init : function() { $statsMeCatalog.ui.init(); if(window.location.href.indexOf("statsMeMain#3")>-1){}else{history.pushState(null,"My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.", "/view/statsMe/statsMeMain#3");} }},
			//My통계로 (지도) 화면
			statsMeMap : {order : 4,narrow_wide : "wide",init : function() { $statsMeMap.ui.init(); if(window.location.href.indexOf("statsMeMain#4")>-1){}else{history.pushState(null,"My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.", "/view/statsMe/statsMeMain#4");} }},
			//My통계로 (상세정보) 화면
			statsMeDetailInfo : {order : 5,narrow_wide : "wide",init : function() {  $statsMeDetailInfo.ui.init(); if(window.location.href.indexOf("statsMeMain#5")>-1){}else{history.pushState(null,"My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.", "/view/statsMe/statsMeMain#5");} }}
		},
		currentPageName : "", //현재 페이지명

		/**
		 * @name         : changePage
		 * @description  : 페이지 변경
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 * 		pPageName : 페이지 명
		 */
		changePage : function(pPageName) {
			//같은페이지 중복호출 막음
			if($statsMeMain.ui.currentPageName == pPageName) {
				return;

			//카탈로그 페이지를 벗어났다가 돌아오면 [그룹보기 & 리스트 showType] 초기화
			} else if($statsMeMain.ui.currentPageName != "statsMeCatalog" && pPageName == "statsMeCatalog"){
				$("#statsMeGrpChk").prop("checked",false);
				$statsMeCatalog.ui.grp_yn = "N";
				$("#selectStatMeCatalogShowType").val("t_big").trigger("change");
			}

			//이전 페이지 변수
			var lvPageNameBefore = $statsMeMain.ui.currentPageName;

			//페이지 변수 지정
			$statsMeMain.ui.currentPageName = pPageName;

			//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
			//css 조정 (페이지 이동전)
			$("body").css("overflow","hidden");
			$("#statsMeLifeCycle").css("overflow","hidden").css("width","");
			$("#statsMeInterestRealm").css("overflow","hidden").css("width","");
			$("#statsMeCatalog").css("overflow","hidden").css("width","");
			$("#statsMeMap").css("overflow","hidden");
			$("#statsMeDetailInfo").css("overflow","hidden");
			//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END

			// 화면구분 (narrow, wide)
			var lvNarrowWide = $("div[id^='narrow_wide_']");
			lvNarrowWide.removeClass("narrow");
			lvNarrowWide.removeClass("wide");
			lvNarrowWide.addClass($statsMeMain.ui.pageData[pPageName].narrow_wide);
			//2020-02-18 [김남민] 탭 위치 변경 START
			if($statsMeMain.ui.pageData[pPageName].narrow_wide == "narrow") {
				$("#narrow_wide_1").css("width","1100px");
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
				$("#statsMeMap").css("left","0px");
				$("#statsMeDetailInfo").css("left","0px");
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
			} else {
				$("#narrow_wide_1").css("width","");
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
				$("#statsMeMap").css("left","");
				$("#statsMeDetailInfo").css("left","");
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
			}
			//2020-02-18 [김남민] 탭 위치 변경 END

			// Footer 변경
			if(pPageName == 'statsMeLifeCycle' || pPageName == 'statsMeInterestRealm') {
				$("#statsMeFooter2").hide();
				$("#statsMeFooter1").show();
			} else {
				$("#statsMeFooter1").hide();
				$("#statsMeFooter2").show();
			}

			//최초 페이지 로딩
			if(lvPageNameBefore == "") {
				setTimeout(function() {
					// 네비게이션 애니메이션
					var lvStatsMeNavigation = $("#statsMeNavigation");
					var lvStatsMeNavigationSideBox = lvStatsMeNavigation.children("div.side_box");
					var lvStatsMeNavigationSideBoxLeft = 0;
					//lvStatsMeNavigation.show();
					lvStatsMeNavigation.css("z-index","4");
					/*lvStatsMeNavigationSideBoxLeft = lvStatsMeNavigationSideBox.offset().left;
					lvStatsMeNavigationSideBox.css("left", "-"+(lvStatsMeNavigationSideBox.width())+"px");
					lvStatsMeNavigationSideBox.animate({
						left : lvStatsMeNavigationSideBoxLeft+"px"
					},400, function(){
						//lvStatsMeCurrentPage.show();
						lvStatsMeNavigation.css("z-index","4");
						lvStatsMeNavigationSideBox.css("left", "auto");

						//네비게이션 초기화
						$statsMeNavigation.ui.init();
					});*/
					//네비게이션 초기화
					$statsMeNavigation.ui.init();

					// 페이지 애니메이션
					var lvStatsMeCurrentPage = $("#"+pPageName);
					var lvStatsMeCurrentPageBox = lvStatsMeCurrentPage.children("div");
					var lvStatsMeCurrentPageBoxTop = 0;
					//lvStatsMeCurrentPage.show();
					lvStatsMeCurrentPage.css("z-index","3");
					/*if(lvStatsMeCurrentPageBox.hasClass("map_box")) lvStatsMeCurrentPageBoxTop = 35;
					lvStatsMeCurrentPageBox.css("top", $(window).outerHeight(true)+"px");
					lvStatsMeCurrentPageBox.animate({
						top : lvStatsMeCurrentPageBoxTop
					},400,function(){
						//lvStatsMeCurrentPage.show();
						lvStatsMeCurrentPage.css("z-index","3");
						lvStatsMeCurrentPageBox.css("top","");
					});*/

					//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
					//css 조정 (페이지 이동후)
					$("body").css("overflow","auto");
					lvStatsMeCurrentPage.css("overflow","visible");
					$("#statsMeLifeCycle").css("width","0px");
					$("#statsMeInterestRealm").css("width","0px");
					$("#statsMeCatalog").css("width","0px");
					$("body>div.wrap").css("min-width","").css("min-height","");
					if(pPageName == 'statsMeLifeCycle' || pPageName == 'statsMeInterestRealm' || pPageName == 'statsMeCatalog') {
						lvStatsMeCurrentPage.css("width","");
						$("body>div.wrap").css("min-width",$statsMeMain.ui.screen_min_width+"px").css("min-height",$statsMeMain.ui.screen_min_height+"px");
						$("#statsMeNavigationSideBox").css("min-height",($statsMeMain.ui.screen_min_height-28)+"px");
						$("body").css("overflow","auto");
					}
					else {
						$("#statsMeNavigationSideBox").css("min-height","");
						$("body").css("overflow","hidden");
					}
					$(window).resize();
					//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
				}, 0);
			}
			else {
				setTimeout(function() {
					// 네비게이션 초기화
					$statsMeNavigation.ui.init();

					// 페이지 애니메이션
					// 다음페이지
					if($statsMeMain.ui.pageData[pPageName].order > $statsMeMain.ui.pageData[lvPageNameBefore].order) {
						var lvStatsMeBeforePage = $("#"+lvPageNameBefore);
						var lvStatsMeBeforePageBox = lvStatsMeBeforePage.children("div");
						var lvStatsMeBeforePageBoxLeft = lvStatsMeBeforePageBox.offset().left;
						lvStatsMeBeforePageBox.animate({
							left : "-"+$(window).outerWidth(true)+"px"
						},400,function(){
							//lvStatsMeBeforePage.hide();
							lvStatsMeBeforePage.css("z-index","1");
							//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가
							lvStatsMeBeforePageBox.css("left","");
						});
						var lvStatsMeCurrentPage = $("#"+pPageName);
						var lvStatsMeCurrentPageBox = lvStatsMeCurrentPage.children("div");
						lvStatsMeCurrentPageBox.css("left", $(window).outerWidth(true)+"px");
						//lvStatsMeCurrentPage.show();
						lvStatsMeCurrentPage.css("z-index","3");
						lvStatsMeCurrentPageBox.animate({
							left : "0px"
						},400,function(){
							//lvStatsMeCurrentPage.show();
							lvStatsMeCurrentPage.css("z-index","3");
							lvStatsMeCurrentPageBox.css("left","");
							//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
							//css 조정 (페이지 이동후)
							$("body").css("overflow","auto");
							lvStatsMeCurrentPage.css("overflow","visible");
							$("#statsMeLifeCycle").css("width","0px");
							$("#statsMeInterestRealm").css("width","0px");
							$("#statsMeCatalog").css("width","0px");
							$("body>div.wrap").css("min-width","").css("min-height","");
							if(pPageName == 'statsMeLifeCycle' || pPageName == 'statsMeInterestRealm' || pPageName == 'statsMeCatalog') {
								lvStatsMeCurrentPage.css("width","");
								$("body>div.wrap").css("min-width",$statsMeMain.ui.screen_min_width+"px").css("min-height",$statsMeMain.ui.screen_min_height+"px");
								$("#statsMeNavigationSideBox").css("min-height",($statsMeMain.ui.screen_min_height-28)+"px");
								$("body").css("overflow","auto");
							}
							else {
								$("#statsMeNavigationSideBox").css("min-height","");
								$("body").css("overflow","hidden");
							}
							$(window).resize();
							//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
						});
					}
					// 이전페이지
					else {
						var lvStatsMeBeforePage = $("#"+lvPageNameBefore);
						var lvStatsMeBeforePageBox = lvStatsMeBeforePage.children("div");
						var lvStatsMeBeforePageBoxLeft = lvStatsMeBeforePageBox.offset().left;
						lvStatsMeBeforePageBox.animate({
							left : $(window).outerWidth(true)+"px"
						},400,function(){
							//lvStatsMeBeforePage.hide();
							lvStatsMeBeforePage.css("z-index","1");
							//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가
							lvStatsMeBeforePageBox.css("left","");
						});
						var lvStatsMeCurrentPage = $("#"+pPageName);
						var lvStatsMeCurrentPageBox = lvStatsMeCurrentPage.children("div");
						lvStatsMeCurrentPageBox.css("left", "-"+$(window).outerWidth(true)+"px");
						//lvStatsMeCurrentPage.show();
						lvStatsMeCurrentPage.css("z-index","3");
						lvStatsMeCurrentPageBox.animate({
							left : "0px"
						},400,function(){
							//lvStatsMeCurrentPage.show();
							lvStatsMeCurrentPage.css("z-index","3");
							lvStatsMeCurrentPageBox.css("left","");
							//페이지 로딩전 화면이동 오류 방지
							if(pPageName == 'statsMeLifeCycle' || pPageName == 'statsMeInterestRealm' || pPageName == 'statsMeCatalog') {
								lvStatsMeCurrentPageBox.find("div.content_box").first().css("left","");
							}

							//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
							//css 조정 (페이지 이동후)
							lvStatsMeCurrentPage.css("overflow","visible");
							$("#statsMeLifeCycle").css("width","0px");
							$("#statsMeInterestRealm").css("width","0px");
							$("#statsMeCatalog").css("width","0px");
							$("body>div.wrap").css("min-width","").css("min-height","");
							if(pPageName == 'statsMeLifeCycle' || pPageName == 'statsMeInterestRealm' || pPageName == 'statsMeCatalog') {
								lvStatsMeCurrentPage.css("width","");
								$("body>div.wrap").css("min-width",$statsMeMain.ui.screen_min_width+"px").css("min-height",$statsMeMain.ui.screen_min_height+"px");
								$("#statsMeNavigationSideBox").css("min-height",($statsMeMain.ui.screen_min_height-28)+"px");
								$("body").css("overflow","auto");
							}
							else {
								$("#statsMeNavigationSideBox").css("min-height","");
								$("body").css("overflow","hidden");
							}
							$(window).resize();
							//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
						});
					}
				}, 0);
			}

			/** 2019.11.28[한광희] 생애주기, 관심분야 화면에서는 지도/상세보기 cursor 비활성화 START */
			if(pPageName == 'statsMeLifeCycle' || pPageName == 'statsMeInterestRealm'){
				// 지도/상세보기 cursor 미적용
				$("#statsMeNavigation a[id='statsMeNavigationPageMove_statsMeMap']").css("cursor", "default");
				$("#statsMeNavigation a[id='statsMeNavigationPageMove_statsMeDetailInfo']").css("cursor", "default");
			} else {
				// 지도/상세보기 cursor 적용
				$("#statsMeNavigation a[id='statsMeNavigationPageMove_statsMeMap']").css("cursor", "pointer");
				$("#statsMeNavigation a[id='statsMeNavigationPageMove_statsMeDetailInfo']").css("cursor", "pointer");
			}
			/** 2019.11.28[한광희] 생애주기, 관심분야 화면에서는 지도/상세보기 cursor 비활성화 END */

			//페이지 초기화 함수 호출
			$statsMeMain.ui.pageData[pPageName].init();
		},

		/**
		 * @name         : alert
		 * @description  : 알림팝업
		 * @date         : 2019.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 *		p_msg : 메세지
		 *		p_title : 타이틀
		 *		p_callback : 확인버튼시 동작할 함수
		 */
		alert : function(p_msg, p_title, p_callback) {
			$statsMePopup.ui.alert(p_msg, p_title, p_callback);
		},

		/**
		 * @name         : confirm
		 * @description  : 확인팝업
		 * @date         : 2019.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 *		p_msg : 메세지
		 *		p_title : 타이틀
		 *		p_callback : 확인버튼시 동작할 함수
		 */
		confirm : function(p_msg, p_title, p_callback, p_callback2) {
			$statsMePopup.ui.confirm(p_msg, p_title, p_callback, p_callback2);
		},

		/**
		 * @name         : confirm2 (지도,상세보기에서 카탈로그 이전으로 넘어갈경우 보여주는 팝업 전용)
		 * @description  : 확인팝업
		 * @date         : 2019.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 *		p_msg : 메세지
		 *		p_title : 타이틀
		 *		p_callback : 확인버튼시 동작할 함수
		 */
		confirm2 : function(p_msg, p_title, p_callback, p_callback2) {
			$statsMePopup.ui.confirm2(p_msg, p_title, p_callback, p_callback2);
		},

		/**
		 * @name         : loading
		 * @description  : 로딩바 표시
		 * @date         : 2019.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 * 		p_flag : true/false => 표시/감춤
		 */
		loading : function(p_flag) {
			if(p_flag) {
				this.loadingBar.onBlockUIPopup();
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
				$("#durianMask").css("position","fixed");
				$("#durianMask").css("width","100%");
				$("#durianMask").css("height","100%");
				var lv_div = $("#durianMask").next("div");
				var lv_div_html = ""+lv_div.html();
				if(lv_div_html.indexOf("loding_type01") >= 0) {
					lv_div.css("position","fixed");
					lv_div.css("width","");
					lv_div.css("height","");
					lv_div.css("top","48%");
					lv_div.css("left","48%");
				}
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
			}
			else {
				this.loadingBar.onBlockUIClose();
			}
		},

		/**
		 * @name         : loading2
		 * @description  : 로딩바 표시2
		 * @date         : 2019.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 * 		p_flag : true/false => 표시/감춤
		 * 		p_msg : 메세지
		 * 		p_title : 타이틀
		 */
		loading2 : function(p_flag, p_msg, p_title) {
			if(p_msg == undefined) p_msg = "";
			if(p_title == undefined) p_title = "로딩";
			if(p_flag) {
				$("#statsMePopupLoading2_back").show();
				$("#statsMePopupLoading2").show();
				$("#statsMePopupLoading2_message").html(p_msg);
				$("#statsMePopupConfirm_title").html(p_title);
			}
			else {
				$("#statsMePopupLoading2_back").hide();
				$("#statsMePopupLoading2").hide();
			}
		},

		/**
		 * @name         : getMyPositionCallback
		 * @description  : 내 위치 조회 후 콜백
		 * @date         : 2019.08.22
		 * @author	     : 김남민
		 * @history 	 :
		 * @param        :
		 */
		getMyPositionCallback : function() {
			// 현재위치 반영
			//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
			//$("#statsMePopupArea_sido").val($statsMeMain.ui.my_sido_cd);
			$statsMePopup.ui.getAreaSido($statsMeMain.ui.my_sido_cd);
			$statsMePopup.ui.getAreaSgg($statsMeMain.ui.my_sido_cd, $statsMeMain.ui.my_sgg_cd);
			$statsMePopup.ui.getAreaEmdong($statsMeMain.ui.my_sido_cd, $statsMeMain.ui.my_sgg_cd, $statsMeMain.ui.my_emdong_cd);

			// 위치 저장
			$statsMeMain.ui.default_sido_cd = $statsMeMain.ui.my_sido_cd;
			$statsMeMain.ui.default_sido_nm = $statsMeMain.ui.my_sido_nm;
			$statsMeMain.ui.default_sido_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			$statsMeMain.ui.default_sido_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			$statsMeMain.ui.default_sgg_cd = $statsMeMain.ui.my_sgg_cd;
			$statsMeMain.ui.default_sgg_nm = $statsMeMain.ui.my_sgg_nm;
			$statsMeMain.ui.default_sgg_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			$statsMeMain.ui.default_sgg_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			$statsMeMain.ui.default_emdong_cd = $statsMeMain.ui.my_emdong_cd;
			$statsMeMain.ui.default_emdong_nm = $statsMeMain.ui.my_emdong_nm;
			$statsMeMain.ui.default_emdong_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			$statsMeMain.ui.default_emdong_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
			$statsMeMain.ui.default_x = $statsMeMain.ui.my_x;
			$statsMeMain.ui.default_y = $statsMeMain.ui.my_y;

			$statsMeMain.ui.setPositionText();
		},

		/**
		 * @name         : setPositionText
		 * @description  : 위치 텍스트 변경
		 * @date         : 2019.08.22
		 * @author	     : 김남민
		 * @history 	 :
		 * @param        :
		 */
		setPositionText : function() {
			//변수 선언
			var lv_adm_nm = "전국";
			var lv_sido = $("#statsMePopupArea_sido");
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sgg = $("#statsMePopupArea_sgg");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_emdong = $("#statsMePopupArea_emdong");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();

			//데이터 정리
			lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
			if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
			else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
			else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;

			// 생애주기 화면에 현재접속지역 셋팅
			$("#nowConectArea").html(lv_adm_nm);

			// 관심분야 화면에 현재접속지역 셋팅
			$("#nowConectArea2").html(lv_adm_nm);

			// 지도 화면에 현재접속지역 셋팅
			if($statsMeMap.ui.mapRegion == "sido") {
				$("#statsMeMapMapArea>a").text("전국");
			}
			else {
				$("#statsMeMapMapArea>a").text(lv_adm_nm);
			}

			// 데이터보드에 접속지역 강조
			$statsMeMap.ui.setDataboardHighlight();
		}
	};

	$statsMeMain.event = {
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

			//tabindex 키 입력
			body.on("keydown", function(e) {
				var lvKeyCode = e.keyCode || e.which;

				//Tab Key
				if (lvKeyCode == 9) {
					//다른 이벤트 막기
					e.preventDefault();

					//최초 선택
					if(!$("#"+$statsMeMain.ui.currentPageName+" .tabindex_focus").length) {
						//페이지 tabindex_focus 제거
						$("#"+$statsMeMain.ui.currentPageName+" .tabindex").removeClass("tabindex_focus");

						//페이지 tabindex 계산
						var lvFirstTabindex = $("#"+$statsMeMain.ui.currentPageName+" .tabindex").first().attr("tabindex");
						var lvLastTabindex = "1";
						$("#"+$statsMeMain.ui.currentPageName+" .tabindex").each(function() {
							var lvThis2 = $(this);
							var lvThis2Tabindex = lvThis2.attr("tabindex");
							if(Number(lvThis2Tabindex) > Number(lvLastTabindex)) {
								lvLastTabindex = lvThis2Tabindex;
							}
							if(Number(lvThis2Tabindex) < Number(lvFirstTabindex)) {
								lvFirstTabindex = lvThis2Tabindex;
							}
						});

						//페이지 첫번째 tabindex focus
						$("#"+$statsMeMain.ui.currentPageName+" .tabindex").each(function() {
							var lvThis2 = $(this);
							var lvThis2Tabindex = lvThis2.attr("tabindex");
							if(lvThis2Tabindex == lvFirstTabindex) {
								lvThis2.addClass("tabindex_focus");
								lvThis2.focus();
								return false;
							}
						});
					}
					//다음 선택
					else {
						var lvThis = $("#"+$statsMeMain.ui.currentPageName+" .tabindex_focus").first();
						var lvThisTabindex = lvThis.attr("tabindex");

						if(lvThisTabindex != undefined) {
							//페이지 tabindex_focus 제거
							$("#"+$statsMeMain.ui.currentPageName+" .tabindex").removeClass("tabindex_focus");

							//페이지 tabindex 계산
							var lvFirstTabindex = lvThisTabindex;
							var lvLastTabindex = "1";
							$("#"+$statsMeMain.ui.currentPageName+" .tabindex").each(function() {
								var lvThis2 = $(this);
								var lvThis2Tabindex = lvThis2.attr("tabindex");
								if(Number(lvThis2Tabindex) > Number(lvLastTabindex)) {
									lvLastTabindex = lvThis2Tabindex;
								}
								if(Number(lvThis2Tabindex) < Number(lvFirstTabindex)) {
									lvFirstTabindex = lvThis2Tabindex;
								}
							});

							//마지막 tabindex인 경우
							if(lvThisTabindex == lvLastTabindex) {
								//페이지 첫번째 tabindex focus
								$("#"+$statsMeMain.ui.currentPageName+" .tabindex").each(function() {
									var lvThis2 = $(this);
									var lvThis2Tabindex = lvThis2.attr("tabindex");
									if(lvThis2Tabindex == lvFirstTabindex) {
										lvThis2.focus();
										lvThis2.addClass("tabindex_focus");
										return false;
									}
								});
							}
							//마지막이 아니면 다음 tabindex 선택
							else {
								//다음 tabindex focus
								$("#"+$statsMeMain.ui.currentPageName+" .tabindex").each(function() {
									var lvThis2 = $(this);
									var lvThis2Tabindex = lvThis2.attr("tabindex");
									if(Number(lvThisTabindex) == Number(lvThis2Tabindex)-1) {
										lvThis2.focus();
										lvThis2.addClass("tabindex_focus");
										return false;
									}
								});
							}
						}
					}
				}
			});
		}
	};
}(window, document));


// 2020.08.28 이금은 ::: '슬기로운 'My통계로' 사용법 1,2,3회 link 추가/
function Pop(url){
    var options = 'width=900px,height=950px,toobar=0,status=0,fullscreen=0,menubar=0,scrollbars=1,resizable=0';
   window.open(url, '', options);
}