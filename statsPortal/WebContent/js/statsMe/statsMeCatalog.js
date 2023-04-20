/**
 * My통계로 (카탈로그)
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
	W.$statsMeCatalog = W.$statsMeCatalog || {};

	$(document).ready(function() {
		//페이지 이벤트
		$statsMeCatalog.event.setUIEvent();

		//툴팁 설정
		$("#statsMeCatalog [title]:not([disabled])").tooltip();
	});

	$statsMeCatalog.ui = {
		callCount : 0, //페이지 호출 횟수
		checkboxCnt : 0, // 목록 체크 항목 갯수
		searchKwrdList : [],	// 카탈로그 1,2차 키워드검색 목록
		//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외
		searchKwrdList2 : [],	// 카탈로그 1,2차 키워드검색 목록(결과 내 검색)
		recomendKwrd : "",		// 추천, 우리동, 누적 키워드 변수 선언
		keyword_id : "", 		// 추천/우리동인기/누적인기 키워드 div id 변수 선언
		//2020-02-17 [김남민] My통계로 상단 화면과, SGIS 포털 상단 화면 탭이 포함된 부분의 크기가 일치하도록 수정
		//2020-02-19 [김남민] 통계로-36 : 카탈로그 화면 하단 짤리지 않도록 조정.
		statsMeGrphInfoDataList_div_minus_height : 480,

		//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 START
		view_keyword_01_show_yn : "",
		view_keyword_02_show_yn : "",
		view_keyword_03_show_yn : "",
		//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 END
		searchKwrHistory : [], // 20200814 박은식 검색 기록 저장
		searchKwrHistory2 : [], // 2020.09.10[한광희] 결과내검색 기록 저장
		//2020년 SGIS고도화 3차(My로그) 시작
		searchHistSeq : null,			//검색이력 순번
		srvUsgHistSeq : null,			//카탈로그 서비스 사용이력 순번
		recmdSrvUsgHistSeq : null,		//카탈로그 추천서비스 사용이력 순번
		//2020년 SGIS고도화 3차(My로그) 끝

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
			srvLogWrite('N0', '08', '01', '00', '', '');

			// 정렬 초기화
			$("#selectStatMeCatalogSorting option:eq(0)").prop('selected', true);

			// 키워드 검색 초기화
			$("#statsMeCatalogKwrd").val("");
			$statsMeMain.ui.searchKwrd = "";

			// 키워드 검색구분 초기화
			$statsMeMain.ui.searchKwrdGb = "";

			// 추천/우리동 인기/누적인기 키워드 초기화
			$("#recmdKwrd").html("추천키워드");
			$("#recmdKwrd").removeAttr("title");
			$("#myLocationAccKwrd").html("우리동 인기 키워드");
			$("#myLocationAccKwrd").removeAttr("title");
			$("#accKwrd").html("누적 인기 키워드");
			$("#accKwrd").removeAttr("title");
			$statsMeCatalog.ui.recomendKwrd = "";
			$statsMeCatalog.ui.keyword_id = "";

			/** 2020.09.14[한광희] 전체검색/결과내 검색 연관키워드 목록 초기화 START */
			$statsMeCatalog.ui.searchKwrHistory = [];
			$statsMeCatalog.ui.searchKwrHistory2 = [];
			/** 2020.09.14[한광희] 전체검색/결과내 검색 연관키워드 목록 초기화 END */

			// 추천/우리동 인기/누적인기 툴팁 초기화
			// 2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 (함수로 변경)
			// 2020-02-19 [김남민] 툴팁이 사라지지 않음
			//$statsMeCatalog.ui.setTitle(true);

			// 목록 선택 해제 콤보 박스 초기화
			$("#list_check").prop("checked", false);

			$("#statsMeGrpChk").prop("checked",false); //그룹보기 초기화

			$statsMeMain.ui.catalogCheckedDataList = [];	// 카탈로그 선택항목 list 화면 호출시 초기화
			$statsMeCatalog.ui.checkboxCnt = 0;				// 목록 체크 항목 갯수 초기화

			$statsMeCatalog.ui.clearHistInfo("1");			//2020년 SGIS고도화 3차(My로그) 수정 (ggm)

			// 카탈로그 1,2차 키워드 검색 목록 화면 처음 로딩시만 조회
			//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 START
			//if($statsMeCatalog.ui.callCount == 0) {
				$statsMeCatalog.ui.searchCtlgKwrdList();			// 카탈로그 1,2차 키워드 검색 목록 조회
			//}
			//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 END

			$statsMeCatalog.ui.searchStatsGrphInfo("default");	// 통계지리 정보 목록 조회

			//스크롤 여부 및 크기 조정
			if($statsMeCatalog.ui.callCount == 0) {
				$("#statsMeGrphInfoDataList_div").mCustomScrollbar("destroy");
				$("#statsMeGrphInfoDataList_div").mCustomScrollbar({
					alwaysShowScrollbar : 2,
					theme : "minimal-dark",
					callbacks : {
						onInit:function() {
							$("#statsMeGrphInfoDataList_div>div.mCSB_scrollTools").css("opacity","1"); // 스크롤 항상표시
							$("#statsMeGrphInfoDataList_div").find(".mCSB_dragger_bar").css("width","10px"); // 스크롤 크게
				        }
					}
				});
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
				/*
				$("#statsMeCatalog").mCustomScrollbar("destroy");
				$("#statsMeCatalog").mCustomScrollbar({
					scrollInertia : 100,
					mouseWheel : { scrollAmount: 300 },
					theme : "minimal-dark",
					callbacks : {
						onInit:function() {
							$("#statsMeCatalog>div.mCSB_scrollTools").css("opacity","0"); // 스크롤 항상숨김
							//$("#statsMeCatalog>div.mCSB_scrollTools .mCSB_dragger_bar").css("width","0px"); // 스크롤 숨김
						}
			        }
				});
				*/
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END

				//카탈로그 목록 사이즈 조정
				var lvHeight = Number($(window).outerHeight(true)) - $statsMeCatalog.ui.statsMeGrphInfoDataList_div_minus_height;
				$("#statsMeGrphInfoDataList_div").height(lvHeight);
			}

			//페이지 호출 횟수 증가
			$statsMeCatalog.ui.callCount++;
		},

		/**
		 * @name		 : changeCatalogShowType
		 * @description  : 카탈로그 목록의 show type 변경
		 * @date		 : 2021.11.12
		 * @author		 : 이금은
		 * @history 	 :
		 * @param        :
		 */
		changeCatalogShowType : function(){
			var showType = $("#selectStatMeCatalogShowType option:selected").val();

			if(showType == "t_small"){
				$("div .ect_wrap").hide();
				$("div.info_title img").hide();
				for(var i = 0; i < $("#statsMeGrphInfoDataList tr").length ; i++){
					$(".info_title:eq(" + i + ") a:eq(1)").css("display","");
                    $(".info_title:eq(" + i + ") a:eq(2)").css("display","none");
                    $("td:eq(" + i + ") div:eq(2)").css("display","none");
				}

				$("#statsMeGrphInfoDataList td").css("padding", "5px 5px 5px 30px");
				$("#statsMeGrphInfoDataList td div.list_check").css("top", "4px");

			} else {
				$("div .ect_wrap").show();
				$("div.info_title img").show();

				$("#statsMeGrphInfoDataList td").css("padding", "20px 0px 20px 30px");
				$("#statsMeGrphInfoDataList td div.list_check").css("top", "19px");
			}
		},

		/**
		 * @name		 : changeCatalogMenuType
		 * @description  : 조회메뉴 변경
		 * @date		 : 2021.11.12
		 * @author		 : 이금은
		 * @history 	 :
		 * @param        :
		 */
//		changeCatalogMenuType : function(){
//			var menuType = $("#selectStatMeCatalogMenuType option:selected").val();
//			var menuNm   = $("#selectStatMeCatalogMenuType option:selected").text();
//
//			if(menuType == "ALL") {
//				$("#statsMeGrphInfoDataList_div tr").show();
//				$("#statsMeGrphInfoDataListTitle").text("통계지리 정보(" +  $("#statsMeGrphInfoDataList_div tr").length +"건)");
//
//			} else {
//				console.log("::::: [콘텐츠 별] 보기 기능은 statsMeGrphInfoDataList_div 에만 적용되고 있습니다. 확인요~~~~~*");
//				$("#statsMeGrphInfoDataList_div tr").hide();
//
//				//if(menuType == "BS") menuNm = "업종통계지도";
//				//else if(menuType == "TM"    ) menuNm = "통계주제도";
//				//else if(menuType == "CVPHPM") menuNm = "대화형 통계지도";
//				//else if(menuType == "HA"    ) menuNm = "살고싶은 우리동네";
//				//else if(menuType == "PS"    ) menuNm = "정책통계지도";
//				//else if(menuType == "WR"    ) menuNm = "일자리 맵";
//
//				$("#statsMeGrphInfoDataList_div tr:contains('"+menuNm+"')").css("display","");
//				$("#statsMeGrphInfoDataListTitle").text("통계지리 정보(" +  $("#statsMeGrphInfoDataList_div tr:contains('"+menuNm+"')").length +"건)");
//
//			}
//		},

		/**
		 * @name		 : grpSpread
		 * @description  : 그룹보기 펼치기/접기
		 * @date		 : 2021.11.16
		 * @author		 : 이금은
		 * @history 	 :
		 * @param        :
		 */
		grpSpread : function(grp_nm, obj){

            if($(obj).closest('.list_check').find('span').eq(0).text() == "▶ "){ //접혀있으면
                $(obj).closest('.list_check').find('span').eq(0).text("▼ ");
                $(obj).closest('.list_check').find('span').eq(1).css("font-weight","bold");
                $("#statsMeGrphInfoDataList tr:contains('"+grp_nm+"')").not(".grp_title").css("display","").show();
            } else {
                $(obj).closest('.list_check').find('span').eq(0).text("▶ ");
                $(obj).closest('.list_check').find('span').eq(1).css("font-weight","");
            	$("#statsMeGrphInfoDataList tr:contains('"+grp_nm+"')").not(".grp_title").css("display","none").hide();
			}

		},


		/**
		 * @name		 : searchStatsGrphInfo
		 * @description  : 통계지리 정보 목록 조회 조건 설정
		 * @date		 : 2019.09.02
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		orderType : 정렬
		 */
		searchStatsGrphInfo : function(orderType) {
			var dataParams = {};
			var html = "";

			$(".mCustomScrollbar").mCustomScrollbar("scrollTo","0");	// 통계지리 정보 목록 스크롤 상단이동

			//전체 검색
			if($statsMeMain.ui.searchKwrdGb == "all") {
				//키워드 검색구분 초기화
				$statsMeMain.ui.searchKwrdGb = "";
				// 키워드 조회조건 추가
				if($("#statsMeCatalogKwrdAll").val() != null && $("#statsMeCatalogKwrdAll").val().replace(/ /gi, "") != ""){
					dataParams.searchKwrd = $("#statsMeCatalogKwrdAll").val().trim();		// 선택한 유사키워드
				}
			}
			//결과내 검색
			else {
				//키워드 검색구분 초기화
				$statsMeMain.ui.searchKwrdGb = "";
				// 생애주기 param 값 셋팅
				if($statsMeMain.ui.lifeCycleItemIdList.length > 0){
					if($statsMeMain.ui.lifeCycleItemIdList[1] != null && $statsMeMain.ui.lifeCycleItemIdList[1] != ""){
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0] + "," + $statsMeMain.ui.lifeCycleItemIdList[1];
					} else {
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0];
					}

				}
				// 관심분야 param 값 셋팅
				if($statsMeMain.ui.interestRealmItemIdList.length > 0){
					if($statsMeMain.ui.interestRealmItemIdList[1] != null && $statsMeMain.ui.interestRealmItemIdList[1] != ""){
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0] + "," + $statsMeMain.ui.interestRealmItemIdList[1];
					} else {
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0];
					}
				}
				// 키워드 조회조건 추가
				if($("#statsMeCatalogKwrd").val() != null && $("#statsMeCatalogKwrd").val().replace(/ /gi, "") != ""){
					dataParams.searchKwrd = $("#statsMeCatalogKwrd").val().trim();		// 선택한 유사키워드
				}
			}

			dataParams.orderType = orderType;	// 정렬 변수

			// 추천, 우리동, 누적 키워드
			if($statsMeCatalog.ui.recomendKwrd != null && $statsMeCatalog.ui.recomendKwrd != "") {
				dataParams.recomendKwrd = $statsMeCatalog.ui.recomendKwrd;		// 추천, 우리동, 누적 키워드
			}

			$statsMeMain.ui.loading(true);	// 로딩바
			$statsMeCatalog.ui.statsGrphInfoLoadData(dataParams);	// 통계지리 정보 목록 조회
		},

		/**
		 * @name		 : statsGrphInfoLoadData
		 * @description  : 통계지리 정보 목록 조회
		 * @date		 : 2019.08.23
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		orderType : 정렬
		 */
		statsGrphInfoLoadData : function(dataParams) {
			var titleHtml = "";	// 통계지리 정보 건수 html
			var html = "";		// 통계지리 정보 록록 html
			var sgisSrvNm = "";	// 관련 SGIS 서비스 명
			var sgisHtml = "";	// 관련 SGIS 서비스 html
			var thematicMapGlanceCnt = 0; 		// 통계주제도 cnt
			var interactiveMapGlanceCnt = 0;	// 대화형통계지도 cnt
			var prcuseSvcCnt = 0;				// 활용서비스(일자리맵, 정책통계지도, 살고싶은 우리동네, 업종통계지도)
			var eLocalityIndexGlanceCnt = 0; 	// e-지방지표

			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/statsMe/map/getStatsMeCatalogData.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						$statsMeMain.ui.loading(false);	// 로딩바

						var statsGrphInfoList = res.result.statsGrphInfoList;	// 통계지리 목록
						var statsGrpList      = res.result.statsGrphInfoList;	// 그룹보기 목록
						var statsGrphInfoSgisSrvList = res.result.statsGrphInfoSgisSrvList;	// 통계지리 관련 SGIS 목록

						/** 통계지리 관련 SGIS 목록 설정 START */
						if(statsGrphInfoSgisSrvList.length > 0){
							$("#sgisServiceWrapTitle").css("display", "block");	// 관련SGIS 서비스 바로가기 타이틀 표시

							for(var j = 0; j < statsGrphInfoSgisSrvList.length; j++){
								sgisSrvNm = statsGrphInfoSgisSrvList[j].sgis_srv_nm;
								// 통계주제도
								if(sgisSrvNm.indexOf("통계주제도") != -1) thematicMapGlanceCnt++;
								// 대화형통계지도
								if(sgisSrvNm.indexOf("대화형통계지도") != -1) {
									// e-지방지표
									if(sgisSrvNm.indexOf("e-지방지표") != -1) {
										eLocalityIndexGlanceCnt++;
									} else {
										interactiveMapGlanceCnt++;
									}
								}

								/** 활용서비스 설정 START */
								// 일자리맵
								if(sgisSrvNm.indexOf("일자리맵") != -1) prcuseSvcCnt++;
								// 정책통계지도
								if(sgisSrvNm.indexOf("정책통계지도") != -1) prcuseSvcCnt++;
								// 살고싶은우리동네
								if(sgisSrvNm.indexOf("살고싶은우리동네") != -1) prcuseSvcCnt++;
								// 업종통계지도
								if(sgisSrvNm.indexOf("업종통계지도") != -1) prcuseSvcCnt++;
								/** 활용서비스 설정 END */
							}

							// 통계주제도
							if(thematicMapGlanceCnt != 0) {
								sgisHtml += '<div class="service_box"><a onclick="srvLogWrite(\'N0\', \'08\', \'06\', \'00\', \'\', \'\'); window.open(this.href); return false;" href="/view/thematicMap/categoryList" class="sv_01 tabindex" title="통계주제도 콘텐츠 바로가기" tabindex="26">통계주제도</a></div>';
							}
							// 대화형통계지도
							if(interactiveMapGlanceCnt != 0) {
								sgisHtml += '<div class="service_box"><a onclick="srvLogWrite(\'N0\', \'08\', \'07\', \'00\', \'\', \'\'); window.open(this.href); return false;" href="/view/map/interactiveMapMain" class="sv_02 tabindex" title="대화형 통계지도 콘텐츠 바로가기" tabindex="27">대화형 통계지도</a></div>';
							}
							// 활용서비스(일자리맵, 정책통계지도, 살고싶은 우리동네, 업종통계지도)
							if(prcuseSvcCnt != 0) {
								sgisHtml += '<div class="service_box"><a onclick="srvLogWrite(\'N0\', \'08\', \'08\', \'00\', \'\', \'\'); window.open(this.href); return false;" href="/view/common/serviceMain" class="sv_05 tabindex" title="활용서비스 콘텐츠 바로가기" tabindex="27">활용서비스</a></div>';
							}
						} else {
							$("#sgisServiceWrapTitle").css("display", "none");	// 관련SGIS 서비스 바로가기 타이틀 숨김
						}
						$("#sgisServiceWrap").html(sgisHtml);
						$("#sgisServiceWrap [title]:not([disabled])").tooltip();
						/** 통계지리 관련 SGIS 목록 설정 END */

						// 통계지리정보 목록 건수 표시
						var listCnt = $statsMeCatalog.ui.addComma(statsGrphInfoList.length);

						titleHtml += "통계지리 정보 (" + listCnt + "건)";
						//titleHtml += "<div><a href='javascript:void(0);' style='position:absolute; bottom:0px;' id='list_replace'><img alt='초기화' src='/images/statsMe/ico_toolbars02.png'></a><label style='padding-left:30px; padding-top:2px;'>선택 초기화</label></div>";
						$("#statsMeGrphInfoDataListTitle").html(titleHtml);

						/** 통계지리 목록 설정 START */
						var grp_nm1, grp_nm2;
						if(statsGrphInfoList.length > 0){


							if($("#statsMeGrpChk").is(':checked')){
							    grp_nm1 = statsGrphInfoList[0].menu_nm + " > " + statsGrphInfoList[0].srv_nm;
							    html += "<tr class='grp_title'>";
							    html += "<td>";
							    html += "<div class='list_check'>";
							    html += "<span>▶ </span>";
							    html += "<span style='cursor:pointer;' onclick='javascript:$statsMeCatalog.ui.grpSpread(\"" + grp_nm1 + "\", this);'>" + grp_nm1 + "</span>";
							    html += "</div>";
							    html += "</td>";
							    html += "</tr>";
							}

						    for(var i = 0; i < statsGrphInfoList.length; i++){

								if($("#statsMeGrpChk").is(':checked')){
							        grp_nm2 = statsGrphInfoList[i].menu_nm + " > " + statsGrphInfoList[i].srv_nm;

							        if(grp_nm1 != grp_nm2 ){
							            html += "<tr class='grp_title'>";
							            html += "<td>";
							            html += "<div class='list_check'>";
									    html += "<span>▶ </span>";
							            html += "<span style='cursor:pointer;' onclick='javascript:$statsMeCatalog.ui.grpSpread(\"" + grp_nm2 + "\", this);'>" + grp_nm2 + "</span>";
							            html += "</div>";
							            html += "</td>";
							            html += "</tr>";

							            grp_nm1 = grp_nm2;
							        }
								}

								html += "<tr>";
								html += "<td>";
								html += "<div class='list_check'>";
								/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
								// html += "<input type='checkbox' value='" + statsGrphInfoList[i].stat_data_nm;
								html += "<input type='checkbox' value='" + statsGrphInfoList[i].stat_data_srv_nm;
								/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
								html += "' id='" + statsGrphInfoList[i].stat_data_id;
								/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
								// html += "' name='checkStatDataId' onclick='javascript:$statsMeCatalog.ui.listCheckData(\"" + statsGrphInfoList[i].stat_data_id + "\", \"" + statsGrphInfoList[i].stat_data_nm + "\");'>";
								html += "' name='checkStatDataId' onclick='javascript:$statsMeCatalog.ui.listCheckData(\"" + statsGrphInfoList[i].stat_data_id + "\", \"" + statsGrphInfoList[i].stat_data_srv_nm + "\");'>";
								/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
								html += "<label for='" + statsGrphInfoList[i].stat_data_id + "'></label></div>";
								html += "<div class='info_title'>";
								/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
								// html += "<a href='javascript:void(0);' onclick='javascript:$statsMeCatalog.ui.listTitleClickEvent(\"" + statsGrphInfoList[i].stat_data_id + "\", \"" + statsGrphInfoList[i].stat_data_nm + "\");'>";
								//2020-02-13 [김남민] 카탈로그 화면 폰트 색상변경
								//2020-02-17 [김남민] 글씨체 변경.
								html += "<a class='info_title_first' href='javascript:void(0);' onclick='javascript:$statsMeCatalog.ui.listTitleClickEvent(\"" + statsGrphInfoList[i].stat_data_id + "\", \"" + statsGrphInfoList[i].stat_data_srv_nm + "\");' style='color:#6699cc; font-weight: bold;'>";
								// html +=  statsGrphInfoList[i].stat_data_nm + "</a>";
								html +=  statsGrphInfoList[i].stat_data_srv_nm + "</a>";
								/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */

								// 카탈로그 설명 있는 경우만 요약/자세히 활성화
								if(statsGrphInfoList[i].stat_data_exp != "" && statsGrphInfoList[i].stat_data_exp != null) {
									html += "<a href='javascript:void(0);' id='" + statsGrphInfoList[i].stat_data_id + "_i_03' onclick='javascript:$statsMeCatalog.ui.listDescriptionDetailEvent(\"" + statsGrphInfoList[i].stat_data_id + "\", \"" + "detail" + "\");'>";
									html += "<img src='/images/statsMe/i_03.png' align='middle' style='vertical-align: middle; float: right; margin-right: 15px;' alt='내용 펼치기'>";
									html += "</a>";
									html += "<a href='javascript:void(0);' id='" + statsGrphInfoList[i].stat_data_id + "_i_05' style='display:none;' onclick='javascript:$statsMeCatalog.ui.listDescriptionDetailEvent(\"" + statsGrphInfoList[i].stat_data_id + "\", \"" + "list" + "\");'>";
									html += "<img src='/images/statsMe/i_05.png' align='middle' style='vertical-align: middle; float: right; margin-right: 15px;' alt='내용 접기'>";
									html += "</a>";
								}

								html += "</div>";
								/** 2019.12.03[한광희] 카탈로그 설명 단어 단위로 개행을 위한 style 추가 */
								//2020-02-18 [김남민] 설명자료 개행
								html += "<div id='" + statsGrphInfoList[i].stat_data_id + "_description' class='info_description' style='font-family: \"NanumBarunGothic\"; display:none; word-break:keep-all;'>" + (""+statsGrphInfoList[i].stat_data_exp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>') + "</div>";
								html += "<div class='ect_wrap'>";
								//html += "<div class='srv_title'>";
								html += "<span class='ect_title'>콘텐츠</span>";
								//2020-02-18 [김남민] E지방지표 링크 기능 안됨 START
								/*if(statsGrphInfoList[i].menu_nm == "대화형 통계지도" && statsGrphInfoList[i].srv_nm == "e-지방지표") {
									html += "<span>" + statsGrphInfoList[i].menu_nm + " > " + statsGrphInfoList[i].srv_nm + "</span>";
								}
								else {*/
									html += "<span style='cursor:pointer;' onclick='javascript:$statsMeCatalog.ui.goDetail(\"" + statsGrphInfoList[i].stat_data_id + "\");'>" + statsGrphInfoList[i].menu_nm + " > " + statsGrphInfoList[i].srv_nm + "</span>";
								//}
								//2020-02-18 [김남민] E지방지표 링크 기능 안됨 END
								//html += "</div>";

								// 키워드
								//html += "<div class='kwrd_title'>";
								if(statsGrphInfoList[i].main_kwrd != "" && statsGrphInfoList[i].main_kwrd != null){
									html += "<span class='ect_title'>키워드</span>";
									html += "<span>" + statsGrphInfoList[i].main_kwrd + "</span>";
								}
								//html += "</div>";
								html += "</div>";
								html += "</td>";
								html += "</tr>";
							}

							$statsMeMain.ui.searchKwrd = ""; 	// 유사키워드 조회조건 초기화
						} else {
							html += "<div class='info_description_2'>";
							html += "조회된 정보가 없습니다.";
							html += "</div>";
						}
						// 목록 선택 해제 콤보 박스 초기화
						$("#list_check").prop("checked", false);

						$("#statsMeGrphInfoDataList tbody").html(html);

						if($("#statsMeGrpChk").is(':checked')){ //그룹보기
							$("#statsMeGrphInfoDataList tr").not(".grp_title").css("display","none").hide();

							setTimeout(function() {
								//그룹별 건수 체크
									var grp_nm, obj;
									for(var i = 0; i < $("#statsMeGrphInfoDataList tr.grp_title").length; i++){
										obj =  $("#statsMeGrphInfoDataList tr.grp_title:eq("+i+") div span:eq(1)");
										obj.append(" (" + $("#statsMeGrphInfoDataList tr:contains('"+ obj.text()+"')").not(".grp_title").length + "건)");
									}
							}, 100);
						}
						/** 통계지리 목록 설정 END */

						// 추천/우리동인기/누적인기 키워드 div 숨김
						if($statsMeCatalog.ui.keyword_id != "") $statsMeCatalog.ui.onMouseLeave($statsMeCatalog.ui.keyword_id);

					} else {
						$statsMeMain.ui.alert('failed!');
					}

					$statsMeCatalog.ui.changeCatalogShowType(); //ShowType
//					$statsMeCatalog.ui.changeCatalogMenuType(); //MenuType
				},
				error: function(err){
					$statsMeMain.ui.alert(err.responseText);
				}
			});
		},


		/**
		 * @name		 : listCheckData
		 * @description  : 통계지리 정보 목록 check 항목 관리
		 * @date		 : 2019.08.27
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		listCheckData : function(dataId, dataNm){
			var InputCheckClick =  "#" + dataId;

			if($(InputCheckClick).is(":checked") == true){
				if($statsMeCatalog.ui.checkboxCnt == 10){
					$statsMeMain.ui.alert("최대 10개까지 가능합니다.");
					$(InputCheckClick).prop("checked", false);
				} else {
					// 목록 체크 항목 갯수 증가
					$statsMeCatalog.ui.checkboxCnt++;
					// 카탈로크 선택항목 list에 추가
					$statsMeMain.ui.catalogCheckedDataList.push(dataId + '$' + dataNm);
				}
			} else {
				// 목록 체크 항목 갯수 감소
				$statsMeCatalog.ui.checkboxCnt--;
				// 카탈로크 선택항목 list에서 삭제
				$statsMeMain.ui.catalogCheckedDataList.splice($statsMeMain.ui.catalogCheckedDataList.indexOf(dataId + '$' + dataNm), 1);
			}

			// 목록에서 1건 이상 선택시 타이틀 checkbox 선택함.
			if($statsMeCatalog.ui.checkboxCnt > 0) {
				$("#list_check").prop("checked", true);
			} else {
				$("#list_check").prop("checked", false);
			}
		},

		/**
		 * @name		 : listTitleClickEvent
		 * @description  : 통계지리 정보 목록 제목 클릭시 해당 건만 지도로 보기 화면 이동.
		 * @date		 : 2019.10.30
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		listTitleClickEvent : function(dataId, dataNm){
			// 2020.02.19 log 생성
			srvLogWrite('N0', '08', '12', '00', '('+dataId+') '+dataNm, '');

			$statsMeCatalog.ui.checkboxCnt = 1;
			$statsMeMain.ui.catalogCheckedDataList = [];
			$statsMeMain.ui.catalogCheckedDataList.push(dataId + '$' + dataNm);

			$("#statsMeCatalogPageMap").trigger("click");
		},

		/**
		 * @name		 : titleCheckBoxEvent
		 * @description  : 선택 된 항목 초기화
		 * @date		 : 2019.10.30
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		titleCheckBoxEvent : function(){
			// 2020.02.19 log 생성
			srvLogWrite('N0', '08', '09', '00', '', '');

			if($statsMeCatalog.ui.checkboxCnt > 0) {
				for(var i = 0; i < $statsMeMain.ui.catalogCheckedDataList.length; i++){
					var statDataList = $statsMeMain.ui.catalogCheckedDataList[i].split('$');
					$("#" + statDataList[0]).prop("checked", false);	// 목록 check 해제
				}
				$statsMeMain.ui.catalogCheckedDataList = [];		// 선택 항목 초기화
				$statsMeCatalog.ui.checkboxCnt = 0;					// 선택 항목 건수 초기화
			} else {
				$("#list_check").prop("checked", false);
			}
		},

		/**
		 * @name		 : listDescriptionDetailEvent
		 * @description  : 통계지리 목록 요약/자세히 보기
		 * @date		 : 2019.10.31
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		stat_data_id : 카탈로그 id
		 * 		detailGb : 요약/자세히 구분
		 */
		listDescriptionDetailEvent : function(stat_data_id, detailGb){
			var imgClick =  "#" + stat_data_id;

			// 펼치기 이미지 클릭 시
			if(detailGb == "detail") {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '08', '14', '00', '[열기]', '');

				$(imgClick + "_i_05").show();	// 닫기 이미지 표출
				$(imgClick + "_i_03").hide();	// 펼치기 이미지 숨김
				$(imgClick + "_description").show();	// 카탈로그 설명 활성화
			}
			// 닫기 이미지 클릭 시
			else {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '08', '14', '00', '[닫기]', '');

				$(imgClick + "_i_05").hide();	// 닫기 이미지 숨김
				$(imgClick + "_i_03").show();	// 펼치기 이미지 표출
				$(imgClick + "_description").hide();	// 카탈로그 설명 비활성화
			}

		},


		/**
		 * @name		 : catalogAccCntDataAdd
		 * @description  : 카탈로그 누적횟수 및 메인키워드 누적횟수 증가
		 * @date		 : 2019.08.27
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		catalogAccCntDataAdd : function(){
			var dataParams = {};

			// 카탈로그 선택한 항목 param 값 설정
			for(var i = 0; i < $statsMeMain.ui.catalogCheckedDataList.length; i++){
				var statDataList = $statsMeMain.ui.catalogCheckedDataList[i].split('$');

				if(i == 0){
					dataParams.statDataId = statDataList[0];
				} else {
					dataParams.statDataId += "," + statDataList[0];
				}
			}

			// 위치 동의에 따른 누적키워드 관리 테이블에 정보 저장
			dataParams.my_location_yn = $statsMeMain.ui.my_location_yn;		// 내 위치 조회 여부
			dataParams.my_sido_cd = $statsMeMain.ui.my_sido_cd;				// 시도코드
			dataParams.my_sgg_cd = $statsMeMain.ui.my_sgg_cd;				// 시군구코드
			dataParams.my_emdong_cd = $statsMeMain.ui.my_emdong_cd;			// 읍면동코드

			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/statsMe/map/setStatsMeCatalogAccCntDataAdd.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						//console.log("success");
					} else {
						$statsMeMain.ui.alert('failed!');
					}
				},
				error: function(err) {
					$statsMeMain.ui.alert(err.responseText);
				}
			});
		},

		/**
		 * 숫자에 천단위 콤마추가 및 꼬리말 추가
		 */
		addComma : function (pNumberString, pTrailer) {
			if (pNumberString == undefined) {
				return "";
			}

			var parts = pNumberString.toString().split(".");
			var str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

		    if (typeof pTrailer != 'undefined') {
		    	str += pTrailer;
		    }

		    return str;
		},

		/**
		 * @name		 : catalogSearchKwrdAccCntDataAdd
		 * @description  : 카탈로그 검색 키워드 누적횟수 증가
		 * @date		 : 2019.10.22
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		catalogSearchKwrdAccCntDataAdd : function(){
			var dataParams = {};
			dataParams.searchKwrd = $statsMeMain.ui.searchKwrd.trim();

			if($statsMeMain.ui.searchKwrd.replace(/ /gi, "") != "") {
				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/statsMe/map/setStatsMeCatalogSearchKwrdAccCntDataAdd.json",
					dataType: "json",
					data: dataParams,
					success: function(res){
						if(res.errCd == 0){
							//console.log("success");
						} else {
							$statsMeMain.ui.alert('failed!');
						}
					},
					error: function(err) {
						$statsMeMain.ui.alert(err.responseText);
					}
				});
			}
		},

		//2020년 SGIS고도화 3차(My로그) 수정 시작 (ggm)
		catalogSearchKwrdUsageHistory : function(){
			$statsMeCatalog.ui.clearHistInfo("1");		// searchStatsGrphInfo 또는 statsGrphInfoLoadData 에 위치해야 하는데, 정렬에서 사용 중
			//빈문자열 제외
			if($statsMeMain.ui.searchKwrd.replace(/ /gi, "") != "") {
				var dataParams = {};
				//검색어
				dataParams.searchKwrd = $statsMeMain.ui.searchKwrd.trim();
				//생애주기
				if($statsMeMain.ui.lifeCycleItemIdList.length == 1){
					dataParams.lifeCycleItem1Id = $statsMeMain.ui.lifeCycleItemIdList[0];
				}else if($statsMeMain.ui.lifeCycleItemIdList.length == 2){
					dataParams.lifeCycleItem1Id = $statsMeMain.ui.lifeCycleItemIdList[0];
					dataParams.lifeCycleItem2Id = $statsMeMain.ui.lifeCycleItemIdList[1];
				}
				//통계거리
				if($statsMeMain.ui.interestRealmItemIdList.length == 1){
					dataParams.interestRealmItem1Id = $statsMeMain.ui.interestRealmItemIdList[0];
				}else if($statsMeMain.ui.interestRealmItemIdList.length == 2){
					dataParams.interestRealmItem1Id = $statsMeMain.ui.interestRealmItemIdList[0];
					dataParams.interestRealmItem2Id = $statsMeMain.ui.interestRealmItemIdList[1];
				}
				//추천, 우리동, 누적 키워드
				if($statsMeCatalog.ui.recomendKwrd != null && $statsMeCatalog.ui.recomendKwrd != "") {
					dataParams.recomendKwrd = $statsMeCatalog.ui.recomendKwrd;		//결과내 검색일때만 존재
				}
				//접속 지역
				dataParams.my_location_yn = $statsMeMain.ui.my_location_yn;		// 내 위치 조회 여부
				dataParams.my_sido_cd = $statsMeMain.ui.my_sido_cd;				// 시도코드
				dataParams.my_sgg_cd = $statsMeMain.ui.my_sgg_cd;				// 시군구코드
				dataParams.my_emdong_cd = $statsMeMain.ui.my_emdong_cd;			// 읍면동코드
//				if($statsMeMain.ui.my_location_yn == "Y") {
//					dataParams.my_sido_cd = $statsMeMain.ui.my_sido_cd;			// 시도코드
//					dataParams.my_sgg_cd = $statsMeMain.ui.my_sgg_cd;				// 시군구코드
//					dataParams.my_emdong_cd = $statsMeMain.ui.my_emdong_cd;		// 읍면동코드
//				} else {
//					dataParams.my_sido_cd = $statsMeMain.ui.default_sido_cd;		// 시도코드
//					dataParams.my_sgg_cd = $statsMeMain.ui.default_sgg_cd;			// 시군구코드
//					dataParams.my_emdong_cd = $statsMeMain.ui.default_emdong_cd;	// 읍면동코드
//				}

				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/statsMe/map/setStatsMeCatalogSearchKwrdUsageHistory.json",
					dataType: "json",
					data: dataParams,
					success: function(res){
						if(res.errCd == 0){
							$statsMeCatalog.ui.searchHistSeq = res.result.seq;
							console.log("searchHistSeq: " + $statsMeCatalog.ui.searchHistSeq);
						} else {
							$statsMeMain.ui.alert('failed!');
						}
					},
					error: function(err) {
						$statsMeMain.ui.alert(err.responseText);
					}
				});
			}
		},

		catalogSrvUsageHistory : function(pStatDataId, pCurrentPageName){
			$statsMeCatalog.ui.clearHistInfo("2");
			if(pStatDataId.replace(/ /gi, "") != "") {
				var dataParams = {};
				//통계자료코드
				dataParams.statDataId = pStatDataId;
				//생애주기
				if($statsMeMain.ui.lifeCycleItemIdList.length == 1){
					dataParams.lifeCycleItem1Id = $statsMeMain.ui.lifeCycleItemIdList[0];
				}else if($statsMeMain.ui.lifeCycleItemIdList.length == 2){
					dataParams.lifeCycleItem1Id = $statsMeMain.ui.lifeCycleItemIdList[0];
					dataParams.lifeCycleItem2Id = $statsMeMain.ui.lifeCycleItemIdList[1];
				}
				//통계거리
				if($statsMeMain.ui.interestRealmItemIdList.length == 1){
					dataParams.interestRealmItem1Id = $statsMeMain.ui.interestRealmItemIdList[0];
				}else if($statsMeMain.ui.interestRealmItemIdList.length == 2){
					dataParams.interestRealmItem1Id = $statsMeMain.ui.interestRealmItemIdList[0];
					dataParams.interestRealmItem2Id = $statsMeMain.ui.interestRealmItemIdList[1];
				}
				//추천, 우리동, 누적 키워드
				if($statsMeCatalog.ui.recomendKwrd != null && $statsMeCatalog.ui.recomendKwrd != "") {
					dataParams.recomendKwrd = $statsMeCatalog.ui.recomendKwrd;		//결과내 검색일때만 존재
				}
				//접속 지역
				dataParams.my_location_yn = $statsMeMain.ui.my_location_yn;		// 내 위치 조회 여부
				dataParams.my_sido_cd = $statsMeMain.ui.my_sido_cd;				// 시도코드
				dataParams.my_sgg_cd = $statsMeMain.ui.my_sgg_cd;				// 시군구코드
				dataParams.my_emdong_cd = $statsMeMain.ui.my_emdong_cd;			// 읍면동코드
				//컨텐츠 유형
				if(pCurrentPageName == 'statsMeMap'){
					dataParams.cntntsType = "01";
				} else if (pCurrentPageName == 'statsMeDetailInfo'){
					dataParams.cntntsType = "02";
				}
				//검색키워드 순번
				if($statsMeCatalog.ui.searchHistSeq != null && $statsMeCatalog.ui.searchHistSeq != ''){
					dataParams.searchKwrdSeq = $statsMeCatalog.ui.searchHistSeq;
				}

				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/statsMe/map/setStatsMeCatalogSrvUsageHistory.json",
					dataType: "json",
					data: dataParams,
					success: function(res){
						if(res.errCd == 0){
							$statsMeCatalog.ui.srvUsgHistSeq = res.result.seq;
							console.log("srvUsgHistSeq: " + $statsMeCatalog.ui.srvUsgHistSeq);
						} else {
							$statsMeMain.ui.alert('failed!');
						}
					},
					error: function(err) {
						$statsMeMain.ui.alert(err.responseText);
					}
				});
			}
		},

		catalogRecmdSrvUsageHistory : function(pRecmdStatDataId){
			$statsMeCatalog.ui.clearHistInfo("3");
			if(pRecmdStatDataId.replace(/ /gi, "") != "") {
				var dataParams = {};
				//통계자료코드(추천서비스)
				dataParams.statDataId = pRecmdStatDataId;
				//선택키워드 순번
				if($statsMeCatalog.ui.srvUsgHistSeq != null && $statsMeCatalog.ui.srvUsgHistSeq != ''){
					dataParams.slctnKwrdSeq = $statsMeCatalog.ui.srvUsgHistSeq;
				}

				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/statsMe/map/setStatsMeCatalogRecmdSrvUsageHistory.json",
					dataType: "json",
					data: dataParams,
					success: function(res){
						if(res.errCd == 0){
							$statsMeCatalog.ui.recmdSrvUsgHistSeq = res.result.seq;
							console.log("recmdSrvUsgHistSeq: " + $statsMeCatalog.ui.recmdSrvUsgHistSeq);
						} else {
							$statsMeMain.ui.alert('failed!');
						}
					},
					error: function(err) {
						$statsMeMain.ui.alert(err.responseText);
					}
				});
			}
		},

		catalogMapSrvUsageHistory : function(pMapRegion, pMapType){
			if($statsMeCatalog.ui.srvUsgHistSeq != null && $statsMeCatalog.ui.srvUsgHistSeq != ''){
				var dataParams = {};
				//선택키워드 순번
				dataParams.slctnKwrdSeq = $statsMeCatalog.ui.srvUsgHistSeq;
				//추천서비스 순번
				if($statsMeCatalog.ui.recmdSrvUsgHistSeq != null && $statsMeCatalog.ui.recmdSrvUsgHistSeq != ''){
					dataParams.recmdSrvSeq = $statsMeCatalog.ui.recmdSrvUsgHistSeq;
				}
				dataParams.areaBordType = pMapRegion;
				dataParams.mapType = pMapType;

				$.ajax({
					type: "POST",
					url : contextPath + "/ServiceAPI/statsMe/map/setStatsMeCatalogMapSrvUsageHistory.json",
					dataType: "json",
					data: dataParams,
					success: function(res){
						if(res.errCd == 0){
						} else {
							$statsMeMain.ui.alert('failed!');
						}
					},
					error: function(err) {
						$statsMeMain.ui.alert(err.responseText);
					}
				});
			}
		},

		clearHistInfo : function(pStep){
			if(pStep == "1"){
				$statsMeCatalog.ui.searchHistSeq = null;
				$statsMeCatalog.ui.srvUsgHistSeq = null;
				$statsMeCatalog.ui.recmdSrvUsgHistSeq = null;
			}else if(pStep == "2"){
				$statsMeCatalog.ui.srvUsgHistSeq = null;
				$statsMeCatalog.ui.recmdSrvUsgHistSeq = null;
			}else if(pStep == "3"){
				$statsMeCatalog.ui.recmdSrvUsgHistSeq = null;
			}
		},
		//2020년 SGIS고도화 3차(My로그) 수정 끝

		/**
		 * @name		 : searchKwrd
		 * @description  : 키워드 검색
		 * @date		 : 2019.09.03
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		searchKwrdGb : 검색 구분
		 */
		searchKwrd : function(searchKwrdGb){
			$statsMeMain.ui.searchKwrdGb = searchKwrdGb; // 키워드 검색 구분 셋팅
			//전체 검색
			if(searchKwrdGb == "all") {
				$statsMeCatalog.ui.setSearchKeywordHistory($("#statsMeCatalogKwrdAll").val()); //20200814 박은식 검색어 저장

				// 2020.02.19 log 생성
				srvLogWrite('N0', '08', '02', '00', $("#statsMeCatalogKwrdAll").val(), '');

				$statsMeMain.ui.searchKwrd = $("#statsMeCatalogKwrdAll").val();	// 키워드 검색명 셋팅
				// 추천/우리동 인기/누적인기 키워드 초기화
				$("#recmdKwrd").html("추천키워드");
				$("#recmdKwrd").removeAttr("title");
				$("#myLocationAccKwrd").html("우리동 인기 키워드");
				$("#myLocationAccKwrd").removeAttr("title");
				$("#accKwrd").html("누적 인기 키워드");
				$("#accKwrd").removeAttr("title");
				$statsMeCatalog.ui.recomendKwrd = "";
				$statsMeCatalog.ui.keyword_id = "";
			}
			//결과내 검색
			else {
				$statsMeCatalog.ui.setSearchKeywordHistory2($("#statsMeCatalogKwrd").val()); // 2020.09.10[한광희] 결과내검색어 저장
				// 2020.02.19 log 생성
				srvLogWrite('N0', '08', '11', '00', $("#statsMeCatalogKwrd").val(), '');

				$statsMeMain.ui.searchKwrd = $("#statsMeCatalogKwrd").val();	// 키워드 검색명 셋팅
			}
			var orderType = $("#selectStatMeCatalogSorting option:selected").val();
			$statsMeCatalog.ui.searchStatsGrphInfo(orderType);		// 통계지리 정보 목록 조회
			$statsMeCatalog.ui.catalogSearchKwrdAccCntDataAdd();	// 카탈로그 검색키워드 누적횟수 증가
			$statsMeCatalog.ui.catalogSearchKwrdUsageHistory();		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
		},

		/**
		 * @name		 : searchCtlgKwrdList
		 * @description  : 카탈로그 1,2차 키워드검색 목록 조회
		 * @date		 : 2019.10.22
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		searchCtlgKwrdList : function(){
			var dataParams = {};

			//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 START
			// 생애주기 param 값 셋팅
			if($statsMeMain.ui.lifeCycleItemIdList.length > 0){
				if($statsMeMain.ui.lifeCycleItemIdList[1] != null && $statsMeMain.ui.lifeCycleItemIdList[1] != ""){
					dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0] + "," + $statsMeMain.ui.lifeCycleItemIdList[1];
				} else {
					dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0];
				}

			}
			// 관심분야 param 값 셋팅
			if($statsMeMain.ui.interestRealmItemIdList.length > 0){
				if($statsMeMain.ui.interestRealmItemIdList[1] != null && $statsMeMain.ui.interestRealmItemIdList[1] != ""){
					dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0] + "," + $statsMeMain.ui.interestRealmItemIdList[1];
				} else {
					dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0];
				}
			}
			//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외 END

			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/statsMe/map/getCtlgKwrdList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						$statsMeCatalog.ui.searchKwrdList = res.result.ctlgKwrdList;
						//2020-02-17 [김남민] 서비스 목록에서 빠진 검색 키워드 제외
						$statsMeCatalog.ui.searchKwrdList2 = res.result.ctlgKwrdList2;
						$statsMeCatalog.ui.searchWidgetPopup2(res.result.ctlgKwrdList2);	// 2020.09.10[한광희] 결과내 검색 팝업 전체 리스트 생성
						$statsMeCatalog.ui.searchWidgetPopup(res.result.ctlgKwrdList)//20200819 박은식 팝업 전체 리스트 생성
						// 검색목록 자동검색
						// 전체 검색
						//20200819 박은식 costom 으로 리스트 생성시 select 이벤트 실행이 안되 데이터만 가공해서 리스트 생성 함수로 넘겨줌(불필요한 부분 삭제) start
						$("#statsMeCatalogKwrdAll").autocomplete({
							source: $statsMeCatalog.ui.searchKwrdList,
							minLength: 1,
							suggest: function( items ) {
								$statsMeCatalog.ui.recommendListRender(items)
								$statsMeCatalog.ui.historyListRender()
							}
					    });
					    //20200819 박은식 costom 으로 리스트 생성시 select 이벤트 실행이 안되 데이터만 가공해서 리스트 생성 함수로 넘겨줌(불필요한 부분 삭제) end

						// 검색목록 자동검색
						// 결과내 검색
						/** 2020.09.10[한광희] 결과내 검색 수정 START */
						$("#statsMeCatalogKwrd").autocomplete({
							source: $statsMeCatalog.ui.searchKwrdList2,
							minLength: 1,
							suggest: function( items ) {
								$statsMeCatalog.ui.recommendListRender2(items)
								$statsMeCatalog.ui.historyListRender2()
							}
					    });
						/** 2020.09.10[한광희] 결과내 검색 수정 END */

						//console.log("success");
					} else {
						$statsMeMain.ui.alert('failed!');
					}
				},
				error: function(err) {
					$statsMeMain.ui.alert(err.responseText);
				}
			});
		},

		/**
		 * @name		 : onClickEvent
		 * @description  : 키워드 마우스 클릭 이벤트
		 * @date		 : 2019.10.24
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		keyword_id : 키워드 id
		 */
		onClickEvent : function(keyword_id){
			//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 START
			//2020-02-19 [김남민] 툴팁이 사라지지 않음 START
			//툴팁 제거
			//try {
				//$("#statsMeCatalog [title]:not([disabled])").tooltip("destroy");
			//} catch(e) { }
			//try {
				//$("[id^=ui-tooltip-]").hide();
			//} catch(e) { }
			//$statsMeCatalog.ui.setTitle(false);
			//2020-02-19 [김남민] 툴팁이 사라지지 않음 END
			//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 END

			var dataParams = {};
			if(keyword_id == "view_keyword_01") {
				//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선
				$statsMeCatalog.ui.view_keyword_01_show_yn = "Y";

				//2020-02-18 [김남민] 우리동 키워드 및 누적키워드 표출 기준 확인 START
				$("#view_keyword_02").css("display", "none");
				$("#view_keyword_03").css("display", "none");
				//2020-02-18 [김남민] 우리동 키워드 및 누적키워드 표출 기준 확인 END
				/** 추천키워드 param 값 셋팅 START */
				// 생애주기 param 값 셋팅
				if($statsMeMain.ui.lifeCycleItemIdList.length > 0){
					if($statsMeMain.ui.lifeCycleItemIdList[1] != null && $statsMeMain.ui.lifeCycleItemIdList[1] != ""){
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0] + "," + $statsMeMain.ui.lifeCycleItemIdList[1];
					} else {
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0];
					}

				}
				// 관심분야 param 값 셋팅
				if($statsMeMain.ui.interestRealmItemIdList.length > 0){
					if($statsMeMain.ui.interestRealmItemIdList[1] != null && $statsMeMain.ui.interestRealmItemIdList[1] != ""){
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0] + "," + $statsMeMain.ui.interestRealmItemIdList[1];
					} else {
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0];
					}
				}

				// 생애주기, 관심분야 선택 한 경우에만 조회
				if($statsMeMain.ui.lifeCycleItemIdList.length != 0 || $statsMeMain.ui.interestRealmItemIdList.length != 0) {
					$statsMeCatalog.ui.getKwrdList(keyword_id, dataParams);
				} else {
					//2020-02-19 [김남민] 툴팁이 사라지지 않음 START
					// 추천 키워드 Title
					var lv_recmdKwrdDiv_title_1 = "생애주기와 관심분야에 ";
					var lv_recmdKwrdDiv_title_2 = "따른 추천 키워드를 선택하여 검색하실 수 있습니다.";
					if($("#lifeCycleNavigation>li").length || $("#interestRealmNavigation>li").length) {
						lv_recmdKwrdDiv_title_1 = "(";
						$("#lifeCycleNavigation>li").each(function() {
							if(lv_recmdKwrdDiv_title_1 == "(") lv_recmdKwrdDiv_title_1 += (""+$(this).text()).replace(/-/gi, "").trim();
							else lv_recmdKwrdDiv_title_1 += ","+(""+$(this).text()).replace(/-/gi, "").trim();
						});
						$("#interestRealmNavigation>li").each(function() {
							if(lv_recmdKwrdDiv_title_1 == "(") lv_recmdKwrdDiv_title_1 += (""+$(this).text()).replace(/-/gi, "").trim();
							else lv_recmdKwrdDiv_title_1 += ","+(""+$(this).text()).replace(/-/gi, "").trim();
						});
						lv_recmdKwrdDiv_title_1 += ")에 ";
					}
					//2020-02-19 [김남민] 툴팁이 사라지지 않음 END

					var html = "";
					//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 START
					if($statsMeCatalog.ui.view_keyword_01_show_yn == "Y") {
						$("#" + keyword_id).css("display", "block");		// 키워드 div 활성화
					}
					//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 END
					//2020-02-19 [김남민] 툴팁이 사라지지 않음
					html += "<a class='kw_01_li' title='"+lv_recmdKwrdDiv_title_1+lv_recmdKwrdDiv_title_2+"'>추천키워드</a>";
					html += "<div class='kw_01_div'>";
					html += "<ul>";
					html += "<li class='kw_01_li2'>";
					html += "<a>키워드가 없습니다.</a>";
					html += "</li>";
					html += "</ul>";
					html += "</div>";
					$("#" + keyword_id).html(html);
				}
				/** 추천키워드 param 값 셋팅 END */
			} else if(keyword_id == "view_keyword_02") {
				//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선
				$statsMeCatalog.ui.view_keyword_02_show_yn = "Y";

				//2020-02-18 [김남민] 우리동 키워드 및 누적키워드 표출 기준 확인 START
				$("#view_keyword_01").css("display", "none");
				$("#view_keyword_03").css("display", "none");
				/** 추천키워드 param 값 셋팅 START */
				// 생애주기 param 값 셋팅
				if($statsMeMain.ui.lifeCycleItemIdList.length > 0){
					if($statsMeMain.ui.lifeCycleItemIdList[1] != null && $statsMeMain.ui.lifeCycleItemIdList[1] != ""){
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0] + "," + $statsMeMain.ui.lifeCycleItemIdList[1];
					} else {
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0];
					}

				}
				// 관심분야 param 값 셋팅
				if($statsMeMain.ui.interestRealmItemIdList.length > 0){
					if($statsMeMain.ui.interestRealmItemIdList[1] != null && $statsMeMain.ui.interestRealmItemIdList[1] != ""){
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0] + "," + $statsMeMain.ui.interestRealmItemIdList[1];
					} else {
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0];
					}
				}
				//2020-02-18 [김남민] 우리동 키워드 및 누적키워드 표출 기준 확인 END
				/** 우리동 인기 키워드 param 값 셋팅 STRAT */
				// 위치 동의 여부에 따른 시도/시군구/읍면동 코드 변화
				if($statsMeMain.ui.my_location_yn == "Y") {
					dataParams.sido_cd = $statsMeMain.ui.my_sido_cd;			// 시도코드
					dataParams.sgg_cd = $statsMeMain.ui.my_sgg_cd;				// 시군구코드
					dataParams.emdong_cd = $statsMeMain.ui.my_emdong_cd;		// 읍면동코드
				} else {
					dataParams.sido_cd = $statsMeMain.ui.default_sido_cd;		// 시도코드
					dataParams.sgg_cd = $statsMeMain.ui.default_sgg_cd;			// 시군구코드
					dataParams.emdong_cd = $statsMeMain.ui.default_emdong_cd;	// 읍면동코드
				}

				$statsMeCatalog.ui.getKwrdList(keyword_id, dataParams);
				/** 우리동 인기 키워드 param 값 셋팅 END */
			} else {
				//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선
				$statsMeCatalog.ui.view_keyword_03_show_yn = "Y";

				//2020-02-18 [김남민] 우리동 키워드 및 누적키워드 표출 기준 확인 START
				$("#view_keyword_01").css("display", "none");
				$("#view_keyword_02").css("display", "none");
				/** 추천키워드 param 값 셋팅 START */
				// 생애주기 param 값 셋팅
				if($statsMeMain.ui.lifeCycleItemIdList.length > 0){
					if($statsMeMain.ui.lifeCycleItemIdList[1] != null && $statsMeMain.ui.lifeCycleItemIdList[1] != ""){
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0] + "," + $statsMeMain.ui.lifeCycleItemIdList[1];
					} else {
						dataParams.lifeCycleItemId = $statsMeMain.ui.lifeCycleItemIdList[0];
					}

				}
				// 관심분야 param 값 셋팅
				if($statsMeMain.ui.interestRealmItemIdList.length > 0){
					if($statsMeMain.ui.interestRealmItemIdList[1] != null && $statsMeMain.ui.interestRealmItemIdList[1] != ""){
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0] + "," + $statsMeMain.ui.interestRealmItemIdList[1];
					} else {
						dataParams.interestRealmItemId = $statsMeMain.ui.interestRealmItemIdList[0];
					}
				}
				//2020-02-18 [김남민] 우리동 키워드 및 누적키워드 표출 기준 확인 END
				// 누적 인기키워드
				$statsMeCatalog.ui.getKwrdList(keyword_id, dataParams);
			}
		},

		/**
		 * @name		 : onMouseLeave
		 * @description  : 키워드 마우스 leave
		 * @date		 : 2019.10.24
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		keyword_id : 키워드 id
		 */
		onMouseLeave : function(keyword_id){
			//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 START
			//2020-02-19 [김남민] 툴팁이 사라지지 않음 START
			//툴팁 생성
			//$statsMeCatalog.ui.setTitle(true);
			//try {
				//$("#statsMeCatalog [title]:not([disabled])").tooltip();
			//} catch(e) { }
			//2020-02-19 [김남민] 툴팁이 사라지지 않음 END
			//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 END

			//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 START
			if(keyword_id == "view_keyword_01") {
				$statsMeCatalog.ui.view_keyword_01_show_yn = "N";
			}
			else if(keyword_id == "view_keyword_02") {
				$statsMeCatalog.ui.view_keyword_02_show_yn = "N";
			}
			else if(keyword_id == "view_keyword_03") {
				$statsMeCatalog.ui.view_keyword_03_show_yn = "N";
			}
			//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 END

			$("#" + keyword_id).css("display", "none");
		},

		//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 START
		/**
		 * @name		 : setTitle
		 * @description  : 키워드 버튼 Title 세팅
		 * @date		 : 2020.02.12
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 * 		p_flag : Title 여부
		 */
		setTitle : function(p_flag){
			if(p_flag) {
				// 추천 키워드 Title
				var lv_recmdKwrdDiv_title_1 = "생애주기와 관심분야에 ";
				var lv_recmdKwrdDiv_title_2 = "따른 추천 키워드를 선택하여 검색하실 수 있습니다.";
				if($("#lifeCycleNavigation>li").length || $("#interestRealmNavigation>li").length) {
					lv_recmdKwrdDiv_title_1 = "(";
					$("#lifeCycleNavigation>li").each(function() {
						if(lv_recmdKwrdDiv_title_1 == "(") lv_recmdKwrdDiv_title_1 += (""+$(this).text()).replace(/-/gi, "").trim();
						else lv_recmdKwrdDiv_title_1 += ","+(""+$(this).text()).replace(/-/gi, "").trim();
					});
					$("#interestRealmNavigation>li").each(function() {
						if(lv_recmdKwrdDiv_title_1 == "(") lv_recmdKwrdDiv_title_1 += (""+$(this).text()).replace(/-/gi, "").trim();
						else lv_recmdKwrdDiv_title_1 += ","+(""+$(this).text()).replace(/-/gi, "").trim();
					});
					lv_recmdKwrdDiv_title_1 += ")에 ";
				}
				$("#recmdKwrdDiv").attr("title", lv_recmdKwrdDiv_title_1+lv_recmdKwrdDiv_title_2);

				// 우리동 인기 키워드 Title
				var lv_myLocationAccKwrdDiv_title_1 = "내 관심지역에서 ";
				if($statsMeMain.ui.my_location_yn == "Y") {
					lv_myLocationAccKwrdDiv_title_1 = $statsMeMain.ui.my_sido_nm+" "+$statsMeMain.ui.my_sgg_nm+" "+$statsMeMain.ui.my_emdong_nm+"에서 ";
				} else {
					lv_myLocationAccKwrdDiv_title_1 = $statsMeMain.ui.default_sido_nm+" "+$statsMeMain.ui.default_sgg_nm+" "+$statsMeMain.ui.default_emdong_nm+"에서 ";
				}
				var lv_myLocationAccKwrdDiv_title_2 = "가장 많이 검색한 인기 키워드를 선택하여 검색하실 수 있습니다.";
				$("#myLocationAccKwrdDiv").attr("title", lv_myLocationAccKwrdDiv_title_1+lv_myLocationAccKwrdDiv_title_2);

				// 누적 인기 키워드 Title
				$("#accKwrdDiv").attr("title", "전국에서 가장 많이 검색한 인기 키워드를 선택하여 검색하실 수 있습니다.");
			} else {
				$("#recmdKwrdDiv").removeAttr("title");
				$("#myLocationAccKwrdDiv").removeAttr("title");
				$("#accKwrdDiv").removeAttr("title");
			}
		},
		//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 END

		/**
		 * @name		 : getKwrdList
		 * @description  : 키워드 목록 조회
		 * @date		 : 2019.10.28
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		keyword_id : 키워드 id
		 * 		dataParams : 조회 조건
		 */
		getKwrdList : function(keyword_id, dataParams) {
			var tempUrl = "";
			var html = "";

			if(keyword_id == "view_keyword_01") {
				tempUrl = "/ServiceAPI/statsMe/map/getRecmdKwrdList.json";
			} else {
				tempUrl = "/ServiceAPI/statsMe/map/getCtlgAccKwrdList.json";
			}

			$.ajax({
				type: "POST",
				url : contextPath + tempUrl,
				dataType: "json",
				data: dataParams,
				//2020-02-18 [김남민] 우리동 키워드 및 누적키워드 표출 기준 확인
				async: false,
				success: function(res){
					if(res.errCd == 0){
						//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 START
						if(
							(keyword_id == "view_keyword_01" && $statsMeCatalog.ui.view_keyword_01_show_yn == "Y")
							|| (keyword_id == "view_keyword_02" && $statsMeCatalog.ui.view_keyword_02_show_yn == "Y")
							|| (keyword_id == "view_keyword_03" && $statsMeCatalog.ui.view_keyword_03_show_yn == "Y")
						) {
							$("#" + keyword_id).css("display", "block");		// 키워드 div 활성화
						}
						//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 END

						//2020-02-19 [김남민] 툴팁이 사라지지 않음 START
						// 추천 키워드 Title
						var lv_recmdKwrdDiv_title_1 = "생애주기와 관심분야에 ";
						var lv_recmdKwrdDiv_title_2 = "따른 추천 키워드를 선택하여 검색하실 수 있습니다.";
						if($("#lifeCycleNavigation>li").length || $("#interestRealmNavigation>li").length) {
							lv_recmdKwrdDiv_title_1 = "(";
							$("#lifeCycleNavigation>li").each(function() {
								if(lv_recmdKwrdDiv_title_1 == "(") lv_recmdKwrdDiv_title_1 += (""+$(this).text()).replace(/-/gi, "").trim();
								else lv_recmdKwrdDiv_title_1 += ","+(""+$(this).text()).replace(/-/gi, "").trim();
							});
							$("#interestRealmNavigation>li").each(function() {
								if(lv_recmdKwrdDiv_title_1 == "(") lv_recmdKwrdDiv_title_1 += (""+$(this).text()).replace(/-/gi, "").trim();
								else lv_recmdKwrdDiv_title_1 += ","+(""+$(this).text()).replace(/-/gi, "").trim();
							});
							lv_recmdKwrdDiv_title_1 += ")에 ";
						}
						//$("#recmdKwrdDiv").attr("title", lv_recmdKwrdDiv_title_1+lv_recmdKwrdDiv_title_2);

						// 우리동 인기 키워드 Title
						var lv_myLocationAccKwrdDiv_title_1 = "내 관심지역에서 ";
						if($statsMeMain.ui.my_location_yn == "Y") {
							lv_myLocationAccKwrdDiv_title_1 = $statsMeMain.ui.my_sido_nm+" "+$statsMeMain.ui.my_sgg_nm+" "+$statsMeMain.ui.my_emdong_nm+"에서 ";
						} else {
							lv_myLocationAccKwrdDiv_title_1 = $statsMeMain.ui.default_sido_nm+" "+$statsMeMain.ui.default_sgg_nm+" "+$statsMeMain.ui.default_emdong_nm+"에서 ";
						}
						var lv_myLocationAccKwrdDiv_title_2 = "가장 많이 검색한 인기 키워드를 선택하여 검색하실 수 있습니다.";
						//$("#myLocationAccKwrdDiv").attr("title", lv_myLocationAccKwrdDiv_title_1+lv_myLocationAccKwrdDiv_title_2);

						// 누적 인기 키워드 Title
						//$("#accKwrdDiv").attr("title", "전국에서 가장 많이 검색한 인기 키워드를 선택하여 검색하실 수 있습니다.");
						//2020-02-19 [김남민] 툴팁이 사라지지 않음 END
						/** 추천키워드 START */
						if(keyword_id == "view_keyword_01") {
						var recmdKwrdList = res.result.recmdKwrdList;
							if(recmdKwrdList.length > 0) {
								//2020-02-19 [김남민] 툴팁이 사라지지 않음
								html += "<a class='kw_01_li' title='"+lv_recmdKwrdDiv_title_1+lv_recmdKwrdDiv_title_2+"'>추천키워드</a>";
								html += "<div class='kw_01_div'>";
								html += "<ul>";
								html += "<li class='kw_01_li2'>";
								html += "<a href='javascript:void(0);' onclick='javascript:$statsMeCatalog.ui.kwrdClickEvent(\"" + "추천키워드" + "\", \"" + keyword_id + "\");'>전체</a>";
								html += "</li>";
								for(var i = 0; i < recmdKwrdList.length; i++){
									html += "<li class='kw_01_li2'>";
									//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 START
									//2020-02-18 [김남민] 키워드에 마우스 오버시 전체 키워드 확인이 가능하도록 툴팁을 추가했었으나 사라짐 START
									html += "<a href='javascript:void(0);' title='" + recmdKwrdList[i].recmd_kwrd + "' ";
									//html += "<a href='javascript:void(0);' ";
									//2020-02-18 [김남민] 키워드에 마우스 오버시 전체 키워드 확인이 가능하도록 툴팁을 추가했었으나 사라짐 END
									//2020-02-12 [김남민] 추천키워드 목록이 선택하려고 하면 창이 사라짐 END
									html += "onclick='javascript:$statsMeCatalog.ui.kwrdClickEvent(\"" + recmdKwrdList[i].recmd_kwrd + "\", \"" + keyword_id + "\");'>";
									html += recmdKwrdList[i].recmd_kwrd + "</a>";
									html += "</li>";
								}
								html += "</ul>";
								html += "</div>";
							} else {
								html += "<a class='kw_01_li'>추천키워드</a>";
								html += "<div class='kw_01_div'>";
								html += "<ul>";
								html += "<li class='kw_01_li2'>";
								html += "<a>키워드가 없습니다.</a>";
								html += "</li>";
								html += "</ul>";
								html += "</div>";
							}

							$("#" + keyword_id).html(html);
						}
						/** 추천키워드 END */
						/** 우리동 인기 키워드 START */
						if(keyword_id == "view_keyword_02") {
							var ctlgAccKwrdList = res.result.ctlgAccKwrdList;
							if(ctlgAccKwrdList.length > 0){
								if(keyword_id == "view_keyword_02") {
									//2020-02-19 [김남민] 툴팁이 사라지지 않음
									html += "<a class='kw_02_li' title='"+lv_myLocationAccKwrdDiv_title_1+lv_myLocationAccKwrdDiv_title_2+"'>우리동 인기 키워드</a>";
									html += "<div class='kw_02_div'>";
									html += "<ul>";
									html += "<li class='kw_02_li2'>";
									html += "<a href='javascript:void(0);' onclick='javascript:$statsMeCatalog.ui.kwrdClickEvent(\"" + "우리동 인기 키워드" + "\", \"" + keyword_id + "\");'>전체</a>";
									html += "</li>";
								}

								for(var i = 0; i < ctlgAccKwrdList.length; i++){
									html += "<li class='kw_02_li2'>";
									html += "<a href='javascript:void(0);' title='" + ctlgAccKwrdList[i].acc_kwrd + "' ";
									html += "onclick='javascript:$statsMeCatalog.ui.kwrdClickEvent(\"" + ctlgAccKwrdList[i].acc_kwrd + "\", \"" + keyword_id + "\");'>";
									html += ctlgAccKwrdList[i].acc_kwrd + "</a>";
									html += "</li>";
								}
								html += "</ul>";
								html += "</div>";
							} else {
								//2020-02-19 [김남민] 툴팁이 사라지지 않음
								html += "<a class='kw_02_li' title='"+lv_myLocationAccKwrdDiv_title_1+lv_myLocationAccKwrdDiv_title_2+"'>우리동 인기 키워드</a>";
								html += "<div class='kw_02_div'>";
								html += "<ul>";
								html += "<li class='kw_02_li2'>";
								html += "<a>키워드가 없습니다.</a>";
								html += "</li>";
								html += "</ul>";
								html += "</div>";
							}

							$("#" + keyword_id).html(html);
						}
						/** 우리동 인기 키워드 END */

						/** 누적 인기 키워드 START */
						if(keyword_id == "view_keyword_03") {
							var ctlgAccKwrdList = res.result.ctlgAccKwrdList;
							if(ctlgAccKwrdList.length > 0){
								if(keyword_id == "view_keyword_03") {
									//2020-02-19 [김남민] 툴팁이 사라지지 않음
									html += "<a class='kw_03_li' title='전국에서 가장 많이 검색한 인기 키워드를 선택하여 검색하실 수 있습니다.'>누적 인기 키워드</a>";
									html += "<div class='kw_03_div'>";
									html += "<ul>";
									html += "<li class='kw_03_li2'>";
									html += "<a href='javascript:void(0);' onclick='javascript:$statsMeCatalog.ui.kwrdClickEvent(\"" + "누적 인기 키워드" + "\", \"" + keyword_id + "\");'>전체</a>";
									html += "</li>";
								}

								for(var i = 0; i < ctlgAccKwrdList.length; i++){
									html += "<li class='kw_03_li2'>";
									html += "<a href='javascript:void(0);' title='" + ctlgAccKwrdList[i].acc_kwrd + "' ";
									html += "onclick='javascript:$statsMeCatalog.ui.kwrdClickEvent(\"" + ctlgAccKwrdList[i].acc_kwrd + "\", \"" + keyword_id + "\");'>";
									html += ctlgAccKwrdList[i].acc_kwrd + "</a>";
									html += "</li>";
								}
								html += "</ul>";
								html += "</div>";
							} else {
								//2020-02-19 [김남민] 툴팁이 사라지지 않음
								html += "<a class='kw_03_li' title='전국에서 가장 많이 검색한 인기 키워드를 선택하여 검색하실 수 있습니다.'>누적 인기 키워드</a>";
								html += "<div class='kw_03_div'>";
								html += "<ul>";
								html += "<li class='kw_03_li2'>";
								html += "<a>키워드가 없습니다.</a>";
								html += "</li>";
								html += "</ul>";
								html += "</div>";
							}

							$("#" + keyword_id).html(html);
						}
						/** 누적 인기 키워드 END */
					} else {
						$statsMeMain.ui.alert('failed!');
					}
				},
				error: function(err) {
					$statsMeMain.ui.alert(err.responseText);
				}
			});
		},

		/**
		 * @name		 : kwrdClickEvent
		 * @description  : 키워드 클릭 이벤트
		 * @date		 : 2019.10.28
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		kwrdNm : 키워드명
		 * 		keyword_id : 키워드 id
		 */
		kwrdClickEvent : function(kwrdNm, keyword_id) {
			// 2020.02.19 log 생성
			if(keyword_id == "view_keyword_01"){
			    srvLogWrite('N0', '08', '03', '00', (kwrdNm=='추천키워드'?'전체':kwrdNm), '');
			} else if(keyword_id == "view_keyword_02") {
			    srvLogWrite('N0', '08', '04', '00', (kwrdNm=='우리동 인기 키워드'?'전체':kwrdNm), '');
			} else if(keyword_id == "view_keyword_03") {
			    srvLogWrite('N0', '08', '05', '00', (kwrdNm=='누적 인기 키워드'?'전체':kwrdNm), '');
			}

			if(keyword_id == "view_keyword_01") {
				if(kwrdNm != "추천키워드") {
					$statsMeCatalog.ui.recomendKwrd = kwrdNm;
					//$("#recmdKwrd").attr("title", kwrdNm);
				} else {
					$statsMeCatalog.ui.recomendKwrd = "";
					//$("#recmdKwrd").attr("title", "");
				}
				//$("#myLocationAccKwrd").attr("title", "");

				$("#recmdKwrd").html(kwrdNm);
				$("#myLocationAccKwrd").html("우리동 인기 키워드");
				$("#accKwrd").html("누적 인기 키워드");
				//$("#accKwrd").attr("title", "");
			} else if(keyword_id == "view_keyword_02") {
				if(kwrdNm != "우리동 인기 키워드") {
					$statsMeCatalog.ui.recomendKwrd = kwrdNm;
					//$("#myLocationAccKwrd").attr("title", kwrdNm);
				} else {
					$statsMeCatalog.ui.recomendKwrd = "";
					//$("#myLocationAccKwrd").attr("title", "");
				}
				$("#myLocationAccKwrd").html(kwrdNm);

				$("#recmdKwrd").html("추천키워드");
				//$("#recmdKwrd").attr("title", "");
				$("#accKwrd").html("누적 인기 키워드");
				//$("#accKwrd").attr("title", "");
			} else if(keyword_id == "view_keyword_03") {
				if(kwrdNm != "누적 인기 키워드") {
					$statsMeCatalog.ui.recomendKwrd = kwrdNm;
					//$("#accKwrd").attr("title", kwrdNm);
				} else {
					$statsMeCatalog.ui.recomendKwrd = "";
					//$("#accKwrd").attr("title", "");
				}
				$("#accKwrd").html(kwrdNm);

				$("#recmdKwrd").html("추천키워드");
				//$("#recmdKwrd").attr("title", "");
				$("#myLocationAccKwrd").html("우리동 인기 키워드");
				//$("#myLocationAccKwrd").attr("title", "");
			}

			$statsMeCatalog.ui.searchStatsGrphInfo("default");	// 통계지리 정보 목록 조회
			$statsMeCatalog.ui.keyword_id = keyword_id;			// 추천/우리동인기/누적인기 키워드 div id 변수 셋팅
			$statsMeCatalog.ui.onMouseLeave(keyword_id);		// 키워드 div 숨김
			$statsMeCatalog.ui.catalogSearchKwrdUsageHistory();	//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
		},

		/**
		 * @name		 : goDetail
		 * @description  : 상세보기
		 * @date		 : 2019.11.27
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 * 		p_stat_data_id : stat_data_id
		 */
		goDetail : function(p_stat_data_id) {
			// 2020.02.19 log 생성
			srvLogWrite('N0', '08', '13', '00', '', '');

			var lv_params = {};
			lv_params.stat_data_id = p_stat_data_id;

			//로딩바 표시
			$statsMeMain.ui.loading(true);

			// ajax 시작
			$.ajax({
				url: contextPath+"/ServiceAPI/statsMe/map/getStatsData.json",
			    type: 'post',
			    data: lv_params
			}).always(function(res) { // 전 처리
				//로딩바 숨김
				$statsMeMain.ui.loading(false);
			}).done(function (res) { // 완료
				//변수선언
				var lv_data = res.result.data;
				var lv_adm_cd = "00";
				var lv_adm_nm = "전국";
				var lv_sido_cd = $statsMeMain.ui.default_sido_cd;
				var lv_sido_nm = $statsMeMain.ui.default_sido_nm;
				var lv_sido_coor_x = $statsMeMain.ui.default_x;
				var lv_sido_coor_y = $statsMeMain.ui.default_y;
				var lv_sgg_cd = $statsMeMain.ui.default_sgg_cd;
				var lv_sgg_nm = $statsMeMain.ui.default_sgg_nm;
				var lv_sgg_coor_x = $statsMeMain.ui.default_x;
				var lv_sgg_coor_y = $statsMeMain.ui.default_y;
				var lv_emdong_cd = $statsMeMain.ui.default_emdong_cd;
				var lv_emdong_nm = $statsMeMain.ui.default_emdong_nm;
				var lv_emdong_coor_x = $statsMeMain.ui.default_x;
				var lv_emdong_coor_y = $statsMeMain.ui.default_y;
				var lv_x = 989674;
				var lv_y = 1818313;
				var lv_zoom = 2;
				var lv_map_region = "sido";
				var lv_map_type = "color";
				var lv_curPolygonCode = 2;

				//대화형 통계지도 > 전국 사업체조사: 산업분류
				if(lv_data.menu_nm == "대화형 통계지도" && lv_data.srv_nm == "전국 사업체조사: 산업분류") {
					var lv_ksic_1_cd = lv_data.ksic_1_cd;
					var lv_ksic_4_cd = lv_data.ksic_4_cd;
					if(
						lv_ksic_1_cd != undefined && lv_ksic_1_cd != null && lv_ksic_1_cd != ""
						&& lv_ksic_4_cd != undefined && lv_ksic_4_cd != null && lv_ksic_4_cd != ""
					) {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = lv_data.stat_data_nm;
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/company.json", //전국 사업체조사: 산업분류
							"title": lv_data.stat_data_nm+" 사업체수",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"class_code": lv_ksic_1_cd+lv_ksic_4_cd,
									"area_type": "0",
									"bnd_year": bndYear,
									"year": lv_data.stat_data_base_year,
									"low_search": "1",
									"adm_cd": lv_adm_cd
								},
								"showData": "corp_cnt",
								"unit": "개",
								"api_id": "API_0304",
								"isKosis": false,
								"btntype": "normal",
								"legend": {
									"type": "color",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": lv_data.stat_data_nm+" 사업체수",
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//대화형 통계지도 > 전국 사업체조사: 테마업종
				else if(lv_data.menu_nm == "대화형 통계지도" && lv_data.srv_nm == "전국 사업체조사: 테마업종") {
					var lv_theme_cd = lv_data.theme_cd;
					if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = lv_data.stat_data_nm;
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/company.json", //전국 사업체조사: 산업분류
							"title": lv_data.stat_data_nm+" 사업체수",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"theme_cd": lv_theme_cd,
									"area_type": "0",
									"year": lv_data.stat_data_base_year,
									"low_search": "1",
									"bnd_year": bndYear,
									"adm_cd": lv_adm_cd
								},
								"showData": "corp_cnt",
								"unit": "개",
								"api_id": "API_0304",
								"isKosis": false,
								"btntype": "normal",
								"legend": {
									"type": "color",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": lv_data.stat_data_nm+" 사업체수",
								"maxYear": "2017",
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//대화형 통계지도 > 인구주택총조사
				else if(lv_data.menu_nm == "대화형 통계지도" && lv_data.srv_nm == "인구주택총조사") {
					var lv_b_class_nm = lv_data.b_class_nm;
					var lv_year = lv_data.year;
					var lv_bnd_year = lv_data.bnd_year;

					if(lv_b_class_nm == "인구조건") {
						window.open(lv_data.link_url);
					} else if(lv_b_class_nm == "가구조건") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "1인가구";
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/household.json", // 대화형 통계지도:인구주택총조사:가구조건
							"title":"1인가구",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"household_type":"A0",
									"area_type":"0",
									"year" : lv_year,
									"low_search" : "1",
									"bnd_year" : bndYear,
									"adm_cd" : lv_adm_cd
								},
								"showData" : "household_cnt",
								"unit" : "가구",
								"api_id" : "API_0305",
								"isKosis" : false,
								"btntype" : "normal",
								"legend" : {
									"type" : "color",
									"level" : 7,
									"color" : ["#ffd75d","#f6b64e","#ee953f","#e67430","#dd5321","#d53212","#cd1103"]
								},
								"title":"1인가구",
								"maxYear": null,
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					} else if(lv_b_class_nm == "주택조건") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "총주택";
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/house.json", // 대화형 통계지도:인구주택총조사:주택조건
							"title":"총주택",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"area_type" : "0",
									"year" : lv_year,
									"low_search" : "1",
									"bnd_year" : lv_bnd_year,
									"adm_cd" : lv_adm_cd
								},
								"showData" : "house_cnt",
								"unit" : "호",
								"api_id" : "API_0306",
								"isKosis" : false,
								"btntype" : "normal",
								"legend" : {
									"type" : "color",
									"level" : 7,
									"color" : [ "#ffd75d", "#f6b64e",
											"#ee953f", "#e67430", "#dd5321",
											"#d53212", "#cd1103" ]
								},
								"title" : "총주택",
								"maxYear": null,
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}

				}
				//2020-02-18 [김남민] E지방지표 링크 기능 안됨 START
				//대화형 통계지도 > e-지방지표
				else if(lv_data.menu_nm == "대화형 통계지도" && lv_data.srv_nm == "e-지방지표") {
					var lv_url = "/view/map/interactiveMap/ecountry";
					var lv_ecountry_map = $statsMeMap.ui.ecountryMapping[lv_data.stat_data_id];
					lv_url += "?list_id="+lv_ecountry_map.list_id;
					lv_url += "&tbl_id="+lv_ecountry_map.tbl_id;
					lv_url += "&base_item_id="+lv_ecountry_map.base_item_id;
					if(lv_ecountry_map.add_item_id != undefined && lv_ecountry_map.add_item_id != null && lv_ecountry_map.add_item_id != "") {
						lv_url += "&add_item_id="+lv_ecountry_map.add_item_id;
					}
					lv_url += "&prd_id="+lv_ecountry_map.prd_id;
					lv_url += "&prid_value="+lv_ecountry_map.prid_value;
					lv_url += "&adm_cd="+lv_adm_cd;
					window.open(lv_url);
				}
				//2020-02-18 [김남민] E지방지표 링크 기능 안됨 END
				//업종통계지도: 생활업종통계지도 > 시군구별 업종현황
				else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "시군구별 업종현황") {
					var lv_theme_cd = lv_data.theme_cd;
					if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "시군구별 생활업종 현황";
						lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/startupbiz/sggtobcorpcount.json", //업종통계지도: 생활업종통계지도 > 시군구별 업종현황
							"params": {
								"mapInfo": {
									"zoomlevel": 2,
									"center": [1007770, 1855549]
								},
								"paramInfo": {
									"theme_cd": lv_theme_cd,
									"theme_nm": lv_data.stat_data_nm,
									"adm_nm": "전국",
									"curSelectedStatsType": "jobArea",
									"jobAreaThemeCd": ""
								},
								"showData": null,
								"unit": null,
								"api_id": "API_0615",
								"isKosis": false,
								"btntype": null,
								"legend": {
									"type": "color",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": "시군구별 생활업종 현황",
								"maxYear": null,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//업종통계지도: 생활업종통계지도 > 개업현황
				else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "개업현황") {
					var lv_service_code = lv_data.service_code;
					if(lv_service_code != undefined && lv_service_code != null && lv_service_code != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "업종별 개업 현황";
						lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "none",
							"title": "업종별 개업 현황",
							"params": {
								"mapInfo": {
									"zoomlevel": 6, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_emdong_coor_x, lv_emdong_coor_y]
								},
								"paramInfo": {
									"curSelectedStatsType": "jobOpen",
									"theme_cd": lv_service_code,
									"theme_nm": lv_data.stat_data_nm,
									"adm_cd": lv_sido_cd+lv_sgg_cd+lv_emdong_cd,
									"adm_nm": lv_sido_nm+" "+lv_sgg_nm+" "+lv_emdong_nm,
									"year": lv_data.stat_data_base_year
								},
								"showData": null,
								"unit": null,
								"api_id": "none",
								"isKosis": false,
								"btntype": null,
								"legend": {
									"type": "heat",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": "업종별 개업 현황",
								"maxYear": null,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화
				else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "업종 밀집도 변화") {
					var lv_theme_cd = lv_data.theme_cd;
					if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "업종별 밀집도 현황";
						lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "none",
							"title": "업종별 밀집도 현황",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"curSelectedStatsType": "jobChange",
									"theme_cd": lv_theme_cd,
									"theme_nm": lv_data.stat_data_nm,
									"adm_cd": null,
									"adm_nm": lv_adm_nm,
									"year": lv_data.stat_data_base_year
								},
								"showData": null,
								"unit": null,
								"api_id": "none",
								"isKosis": false,
								"btntype": null,
								"legend": {
									"type": "heat",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": "업종별 밀집도 현황",
								"maxYear": null,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//업종통계지도: 기술업종통계지도
				else if(lv_data.menu_nm == "업종통계지도: 기술업종통계지도") {
					var lv_techbiz_m_class_cd = lv_data.techbiz_m_class_cd;
					if(lv_techbiz_m_class_cd != undefined && lv_techbiz_m_class_cd != null && lv_techbiz_m_class_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = lv_data.stat_data_nm;
						lv_params.map_type = "TECH"; // 업종통계지도: 기술업종통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/ServiceAPI/technicalBiz/sggCompanyMapInfo.json", //전국 사업체조사: 산업분류
							"params": {
								"mapInfo": {
									"zoomlevel": 2,
									"center": [1007770, 1855549]
								},
								"paramInfo": {
									"theme_cd": lv_techbiz_m_class_cd,
									"theme_nm": lv_data.stat_data_nm,
									"adm_nm": "전국",
									"viewType": "color"
								},
								"legend": {
									"type": "bubble",
									"level": "7",
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"type": "sigungu"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/technicalBiz/technicalBizMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				// 살고싶은 우리동네
				else if(lv_data.menu_nm == "살고싶은 우리동네") {
					var lv_m_class_idx_id = lv_data.m_class_idx_id;
					var lv_b_class_idx_id = lv_data.b_class_idx_id;
					if(lv_m_class_idx_id != undefined && lv_m_class_idx_id != null && lv_m_class_idx_id != ""
						&& lv_b_class_idx_id != undefined && lv_b_class_idx_id != null && lv_b_class_idx_id != ""
						) {
						// 즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "주거현황보기";
						lv_params.map_type = "HMAP";	// 살고싶은 우리동네 고정 값
						lv_params.params = JSON.stringify([{
							"url": "/SOPOpenAPI/OpenAPI3/boundary/hadmarea.geojson", // 살고싶은 우리동네
							"params": {
								"mapInfo": {
									"zoomlevel": 2,	// 1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"adm_cd": "00",
									"b_class_idx_id": lv_b_class_idx_id,
									"m_class_idx_id": lv_m_class_idx_id,
									"chkbox_chk": 1
								},
								"legend": {
									"type": "color",
									"level": "5",
									"color": ["#ccc", "#b8c4a8", "#a5bc85",	"#92b461", "#7fad3e"]
								},
								"title" : "주거현황보기",
								"type": 1,
								"mapCaptureId" : "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/house/houseAnalysisMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					} else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//나머지
				else if(lv_data.link_url != undefined && lv_data.link_url != null && lv_data.link_url != "") {
					window.open(lv_data.link_url);
				}
				//예외처리
				else {
					$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
				}
			}).fail(function (res) { // 실패
				//$statsMeMain.ui.alert(errorMessage);
			});
			// ajax 끝
		},
		//20200814 박은식 검색 기록 저장 및 삭제 기능추가 start
		/**
		 * @name		 : setSearchKeywordHistory
		 * @description  : 검색 저장
		 * @date		 : 2020.08.13
		 * @author		 : 박은식
		 * @history 	 :
		 * @param			검색 keyword
		 */
		setSearchKeywordHistory : function(value){
			if(value.trim() == "" || value.trim() == null){
				return;
			}
			var historyArray = $statsMeCatalog.ui.searchKwrHistory;
			if(historyArray.indexOf(value) != -1){ //배열에 해당 키워드가 있는 경우
				historyArray.splice(historyArray.indexOf(value), 1);
				historyArray.unshift(value);
			}else{ //배열에 해당 키워드가 없을경우
				if(historyArray.length > 9){ //키워드가 10개인 경우
					historyArray.splice(9, 1);
					historyArray.unshift(value);
				}else{//키워드가 10개 미만인 경우
					historyArray.unshift(value);
				}

			}
			$statsMeCatalog.ui.searchKwrHistory = historyArray;
			$statsMeCatalog.ui.historyListRender()
		},
		/**
		 * @name		 : setSearchKeywordHistory
		 * @description  : 검색 기록 부분삭제 및 전체삭제
		 * @date		 : 2020.08.13
		 * @author		 : 박은식
		 * @history 	 :
		 * @param			삭제 keyword(null 또는 공백일 경우 전체삭제)
		 */
		deleteSearchKeywordHistory : function(value){
			var historyArray = $statsMeCatalog.ui.searchKwrHistory;
			if(value != '' && value != null){
				if(historyArray.length == 1){
					historyArray = [];
				}else{
					historyArray.splice((historyArray.indexOf(value)), 1);
				}

			}else{
				historyArray = [];
				$statsMeMain.ui.alert("검색기록이 모두 삭제 되었습니다."); //검색기록 삭제 버튼 클릭이후 widget 을 refresh하기위함
			}
			$statsMeCatalog.ui.searchKwrHistory = historyArray;

			$statsMeCatalog.ui.historyListRender()
		},
		//20200814 박은식 검색 기록 저장 및 삭제 기능추가 end

		//20200819 박은식 팝업 리스트 생성 start
		/**
		 * @name		 : searchWidgetPopup
		 * @description  : autocomplete popup 전체 리스트 생성 부분
		 * @date		 : 2020.08.19
		 * @author		 : 박은식
		 * @history 	 :
		 * @param			키워드 리스트
		 */
		searchWidgetPopup : function(items){
			var recommend_html = "";
			$.each(items, function (index, item) {
				recommend_html += "<li class='ui-corner-all'>"+item+"</li>";
			});
			//$("#recommend_list>ul").append(recommend_html);
			var tempList = $statsMeCatalog.ui.searchKwrHistory; //20200814 박은식 검색 기록 저장 변수 변경
			var history_html = "";
        	if(tempList.length > 0) {
        		for(var i=0; i<tempList.length; i++){
        			history_html += '<li class="ui-menu-item history" id="history" style="display:none;" role="presentation" title="'+tempList[i]+'">';
        			history_html += '<a id="ui-id-'+($statsMeCatalog.ui.searchKwrdList.length+i)+'" style="display:inline; width: 95%;" class="ui-corner-all" tabindex="-1" href="javascript:$statsMeCatalog.ui.beforeSearchKwrdSelect(\''+tempList[i]+'\');">'+tempList[i]+'</a>';
        			history_html += '<button class="history_remove" style="display:inline;" onclick="javascript:$statsMeCatalog.ui.deleteSearchKeywordHistory(\''+tempList[i]+'\')">X</button>'
        			history_html += '</li>';
        		}
        		html += "<button class='all_remove' onclick='$statsMeCatalog.ui.deleteSearchKeywordHistory(\"\")' style='display: inline-block;'>전체삭제</button>"; //20200814 박은식 전체삭제 버튼 추가
        	}
        	$("#history_list>ul").append(history_html);
		},

		/**
		 * @name		 : recommendListRender
		 * @description  : autocomplete popup 추천키워드 리스트 생성 부분
		 * @date		 : 2020.08.19
		 * @author		 : 박은식
		 * @history 	 :
		 * @param			키워드 리스트
		 */
		recommendListRender : function(items){
			var listHTML = "";

			if(items.length == 0){
				if($("#statsMeCatalogKwrdAll").val()){
					if(!$("#statsMeCatalogKwrdAll").is(":focus")){
						return;
					}else{
						$("#widgetPopup .recommend_list").empty();
						$("#widgetPopup .recommend_list").append("<li class='none_data'>일치하는 키워드가 없습니다.</li>"); // 20200831 박은식 검색키워드 중 일치하는 키워드가 없을 시 문구 생성
					}
				}else{
					$("#widgetPopup .recommend_list").empty();
					$("#widgetPopup .recommend_list").append("<li class='none_data'>검색어를 입력해 주세요.</li>");
				}
			}else if(items.length != 0 || (items.length == 0 && $("#statsMeCatalogKwrdAll").val())){
				$("#widgetPopup .recommend_list").empty();
				$.each(items,function(){
					listHTML += "<li class='keyword_list' value='"+this.label+"' style='text-align:left'>"+this.label+"</li>";
				})
				$("#widgetPopup .recommend_list").append(listHTML);
			}
		},

		/**
		 * @name		 : historyListRender
		 * @description  : autocomplete popup 검색기록 리스트 생성 부분
		 * @date		 : 2020.08.19
		 * @author		 : 박은식
		 * @history 	 :
		 * @param			키워드 리스트
		 */
		historyListRender : function(){
			var tempList = $statsMeCatalog.ui.searchKwrHistory; //20200814 박은식 검색 기록 저장 변수 변경
        	var tempHTML = "";
        	$("#widgetPopup .history_list").empty();
        	if(tempList.length > 0) {
        		//20200814 박은식 검색기록 목록 생성 start
        		for(var i=0; i<tempList.length; i++){
        			tempHTML += '<li class="keyword_list" class="ui-menu-item history" id="history" role="presentation" title="'+tempList[i]+'" value="'+tempList[i]+'" style="text-align:left;">'+tempList[i];
        			tempHTML += '<button class="history_remove" id="remove_btn" style="display:inline;" onmouseup="javascript:$statsMeCatalog.ui.deleteSearchKeywordHistory(\''+tempList[i]+'\')">X</button>'
        			tempHTML += '</li>';
        		}
        		//20200814 박은식 검색기록 목록 생성 end
        		tempHTML += "<button class='all_remove' onclick='$statsMeCatalog.ui.deleteSearchKeywordHistory(\"\")' style='display: inline-block; cursor:pointer'>전체삭제</button>"; //20200814 박은식 전체삭제 버튼 추가
        		$("#widgetPopup .history_list").append(tempHTML);
        	}else{
        		tempHTML += '<li class="none_data">최근 검색항목이 없습니다.</li> '
        		$("#widgetPopup .history_list").append(tempHTML);
        	}
		}
		//20200819 박은식 팝업 리스트 생성 end

		/** 2020.09.10[한광희 결과내 검색 기록 저장 및 삭제 기능추가 START */
		/**
		 * @name		 : setSearchKeywordHistory2
		 * @description  : 검색 저장
		 * @date		 : 2020.09.10
		 * @author		 : 한광희
		 * @history 	 :
		 * @param			검색 keyword
		 */
		, setSearchKeywordHistory2 : function(value){
			if(value.trim() == "" || value.trim() == null){
				return;
			}
			var historyArray = $statsMeCatalog.ui.searchKwrHistory2;
			if(historyArray.indexOf(value) != -1){ //배열에 해당 키워드가 있는 경우
				historyArray.splice(historyArray.indexOf(value), 1);
				historyArray.unshift(value);
			}else{ //배열에 해당 키워드가 없을경우
				if(historyArray.length > 9){ //키워드가 10개인 경우
					historyArray.splice(9, 1);
					historyArray.unshift(value);
				}else{//키워드가 10개 미만인 경우
					historyArray.unshift(value);
				}

			}
			$statsMeCatalog.ui.searchKwrHistory2 = historyArray;
			$statsMeCatalog.ui.historyListRender2()
		},
		/**
		 * @name		 : setSearchKeywordHistory2
		 * @description  : 검색 기록 부분삭제 및 전체삭제
		 * @date		 : 2020.09.10
		 * @author		 : 한광희
		 * @history 	 :
		 * @param			삭제 keyword(null 또는 공백일 경우 전체삭제)
		 */
		deleteSearchKeywordHistory2 : function(value){
			var historyArray = $statsMeCatalog.ui.searchKwrHistory2;
			if(value != '' && value != null){
				if(historyArray.length == 1){
					historyArray = [];
				}else{
					historyArray.splice((historyArray.indexOf(value)), 1);
				}

			}else{
				historyArray = [];
				$statsMeMain.ui.alert("검색기록이 모두 삭제 되었습니다."); //검색기록 삭제 버튼 클릭이후 widget 을 refresh하기위함
			}
			$statsMeCatalog.ui.searchKwrHistory2 = historyArray;

			$statsMeCatalog.ui.historyListRender2();
		},
		/** 2020.09.10[한광희 결과내 검색 기록 저장 및 삭제 기능추가 END */

		/** 2020.09.10[한광희] 팝업 리스트 생성 START */
		/**
		 * @name		 : searchWidgetPopup2
		 * @description  : autocomplete popup 전체 리스트 생성 부분
		 * @date		 : 2020.09.10
		 * @author		 : 한광희
		 * @history 	 :
		 * @param			키워드 리스트
		 */
		searchWidgetPopup2 : function(items){
			var recommend_html = "";
			$.each(items, function (index, item) {
				recommend_html += "<li class='ui-corner-all'>"+item+"</li>";
			});

			var tempList = $statsMeCatalog.ui.searchKwrHistory2;
			var history_html = "";
        	if(tempList.length > 0) {
        		for(var i=0; i<tempList.length; i++){
        			history_html += '<li class="ui-menu-item history" id="history2" style="display:none;" role="presentation" title="'+tempList[i]+'">';
        			history_html += '<a id="ui-id-'+($statsMeCatalog.ui.searchKwrdList2.length+i)+'" style="display:inline; width: 95%;" class="ui-corner-all" tabindex="-1" href="javascript:$statsMeCatalog.ui.beforeSearchKwrdSelect2(\''+tempList[i]+'\');">'+tempList[i]+'</a>';
        			history_html += '<button class="history_remove" style="display:inline;" onclick="javascript:$statsMeCatalog.ui.deleteSearchKeywordHistory2(\''+tempList[i]+'\')">X</button>'
        			history_html += '</li>';
        		}
        		html += "<button class='all_remove' onclick='$statsMeCatalog.ui.deleteSearchKeywordHistory2(\"\")' style='display: inline-block;'>전체삭제</button>";
        	}
        	$("#history_list2>ul").append(history_html);
		},

		/**
		 * @name		 : recommendListRender2
		 * @description  : autocomplete popup 추천키워드 리스트 생성 부분
		 * @date		 : 2020.09.10
		 * @author		 : 한광희
		 * @history 	 :
		 * @param			키워드 리스트
		 */
		recommendListRender2 : function(items){
			var listHTML = "";

			if(items.length == 0){
				if($("#statsMeCatalogKwrd").val()){
					if(!$("#statsMeCatalogKwrd").is(":focus")){
						return;
					}else{
						$("#widgetPopup2 .recommend_list").empty();
						$("#widgetPopup2 .recommend_list").append("<li class='none_data'>일치하는 키워드가 없습니다.</li>"); // 20200831 박은식 검색키워드 중 일치하는 키워드가 없을 시 문구 생성
					}
				}else{
					$("#widgetPopup2 .recommend_list").empty();
					$("#widgetPopup2 .recommend_list").append("<li class='none_data'>검색어를 입력해 주세요.</li>");
				}
			}else if(items.length != 0 || (items.length == 0 && $("#statsMeCatalogKwrd").val())){
				$("#widgetPopup2 .recommend_list").empty();
				$.each(items,function(){
					listHTML += "<li class='keyword_list' value='"+this.label+"' style='text-align:left'>"+this.label+"</li>";
				})
				$("#widgetPopup2 .recommend_list").append(listHTML);
			}
		},

		/**
		 * @name		 : historyListRender2
		 * @description  : autocomplete popup 검색기록 리스트 생성 부분
		 * @date		 : 2020.09.10
		 * @author		 : 한광희
		 * @history 	 :
		 * @param			키워드 리스트
		 */
		historyListRender2 : function(){
			var tempList = $statsMeCatalog.ui.searchKwrHistory2;
        	var tempHTML = "";
        	$("#widgetPopup2 .history_list").empty();
        	if(tempList.length > 0) {
        		//20200814 박은식 검색기록 목록 생성 start
        		for(var i=0; i<tempList.length; i++){
        			tempHTML += '<li class="keyword_list" class="ui-menu-item history" id="history2" role="presentation" title="'+tempList[i]+'" value="'+tempList[i]+'" style="text-align:left;">'+tempList[i];
        			tempHTML += '<button class="history_remove" id="remove_btn2" style="display:inline;" onmouseup="javascript:$statsMeCatalog.ui.deleteSearchKeywordHistory2(\''+tempList[i]+'\')">X</button>'
        			tempHTML += '</li>';
        		}
        		//20200814 박은식 검색기록 목록 생성 end
        		tempHTML += "<button class='all_remove' onclick='$statsMeCatalog.ui.deleteSearchKeywordHistory2(\"\")' style='display: inline-block; cursor:pointer'>전체삭제</button>"; //20200814 박은식 전체삭제 버튼 추가
        		$("#widgetPopup2 .history_list").append(tempHTML);
        	}else{
        		tempHTML += '<li class="none_data">최근 검색항목이 없습니다.</li> '
        		$("#widgetPopup2 .history_list").append(tempHTML);
        	}
		}

	};

	$statsMeCatalog.event = {
		/**
		 * @name		 : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date		 : 2019.08.08
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		setUIEvent : function() {
			/** 20200819 박은식 마우스오버 또는 아웃될 때 css 이벤트 start*/
			$(document).on("mouseenter", ".keyword_list", function(){
				$(this).css("background-color", "#efefef").css("cursor", "pointer")
			})
			$(document).on("mouseout", ".keyword_list", function(){
				$(this).css("background-color", "#fff")
			});
			/** 20200819 박은식 마우스오버 또는 아웃될 때 css 이벤트 end*/

			/** 20200819 박은식 키워드, 검색기록 리스트 클릭 시 조회 이벤트 start*/
			$(document).on("mouseup", "#widgetPopup .keyword_list", function(e){
				if(e.target.id == "remove_btn"){
					return;
				}
				$("#statsMeCatalogKwrdAll").val($(this).attr("value"));
				$statsMeCatalog.ui.searchKwrd("all");
				$('#widgetPopup').hide();
			});

			$(document).on("mouseup", "#widgetPopup2 .keyword_list", function(e){
				if(e.target.id == "remove_btn2"){
					return;
				}
				$("#statsMeCatalogKwrd").val($(this).attr("value"));
				$statsMeCatalog.ui.searchKwrd("");
				$('#widgetPopup2').hide();
			});
			/** 20200819 박은식 키워드, 검색기록 리스트 클릭 시 조회 이벤트 end*/

			/** 20200819 박은식 autocompletePopup show hide 이벤트 start*/
			$("#statsMeCatalogKwrdAll").focusin(function(){
				$('#widgetPopup').show();
				if($(this).val() != '' && $(this).val() != null){
					$("#recommend_list_btn").trigger('click')
					$("#statsMeCatalogKwrdAll").trigger('keydown')
				}
			});

			// 결과내 검색
			$("#statsMeCatalogKwrd").focusin(function(){
				$('#widgetPopup2').show();
				if($(this).val() != '' && $(this).val() != null){
					$("#recommend_list_btn2").trigger('click')
					$("#statsMeCatalogKwrd").trigger('keydown')
				}
			});

			$("body").click(function(e) {
		    	if($(".srch_wrap").find(e.target).length == 0) {
		    		$("#widgetPopup").hide();
		    		$("#widgetPopup2").hide();
		        }
			});
			/** 20200819 박은식 autocompletePopup show hide 이벤트 end*/

			//20200814 박은식 검색기록, 추천키워드 전환 start
			$(document).on("click", "#history_list_btn", function(){
				$("#recommend_list").hide();
				$("#history_list").show();
				$(this).css("background-color", "#fff")
				$(this).css("color", "black")
				$(this).css("z-index", "2")
				$("#recommend_list_btn").css("background-color", "rgb(110, 120, 121)")
				$("#recommend_list_btn").css("color", "#fff")
				$("#recommend_list_btn").css("z-index", "1")
				$("#widgetPopup .all_remove").show();
				$("#statsMeCatalogKwrdAll").trigger("keydown")
			});
			$(document).on("click", "#recommend_list_btn",function(){
				$("#recommend_list").show();
				$("#history_list").hide();
				$(this).css("background-color", "#fff")
				$(this).css("color", "black");
				$(this).css("z-index", "2")
				$("#history_list_btn").css("background-color", "rgb(110, 120, 121)");
				$("#history_list_btn").css("color", "#fff");
				$("#history_list_btn").css("z-index", "1")
				$("#widgetPopup .all_remove").hide();
				$('#recommend_list').scrollTop(0);
				if($("#statsMeCatalogKwrdAll").val() == "" || $("#statsMeCatalogKwrdAll").val() == null){
					$("#widgetPopup .recommend_list").empty();
					$("#widgetPopup .recommend_list").append("<li class='none_data'>검색어를 입력해 주세요.</li>");
				}

			});
			$("#statsMeCatalogKwrdAll").click(function(){
				$("#widgetPopup").show();
	    		$("#widgetPopup2").hide();
				$("#recommend_list_btn").trigger("click");
			});
			//20200814 박은식 검색기록, 추천키워드 전환 end

			/** 20200819 박은식 키워드 검색시 이전키워드 검색내역 추가로 인한 수정 START  */
			$.widget("custom.autocomplete", $.ui.autocomplete, {
				//20200819 박은식 불필요한 소스제거 (render는 함수로 따로 적용)
		        _renderMenu: function (ul, items) {
		            var self = this;
		            var maxlen = items.length;
		            $.each(items, function (index, item) {
		                self._renderItemData(ul, item);
		            });
		        },
		        _suggest: function( items ) {
		            if ( $.isFunction( this.options.suggest ) ) {
		                return this.options.suggest( items );
		            }
		        },
		        _close: function( e ) {
		            if ( $.isFunction( this.options.suggest ) ) {
		                this.options.suggest( [] );
		                return this._trigger( "close", e );
		            }
		            this._super( e )
		        }
		    });
			/** 20200819 박은식 키워드 검색시 이전키워드 검색내역 추가로 인한 수정 END  */

			/** 2020.09.10[한광희] 결과내 검색 검색기록, 추천키워드 전환 START */
			$(document).on("click", "#history_list_btn2", function(){
				$("#recommend_list2").hide();
				$("#history_list2").show();
				$(this).css("background-color", "#fff")
				$(this).css("color", "black")
				$(this).css("z-index", "2")
				$("#recommend_list_btn2").css("background-color", "rgb(110, 120, 121)")
				$("#recommend_list_btn2").css("color", "#fff")
				$("#recommend_list_btn2").css("z-index", "1")
				$("#widgetPopup2 .all_remove").show();
				$("#statsMeCatalogKwrd").trigger("keydown")
			});
			$(document).on("click", "#recommend_list_btn2",function(){
				$("#recommend_list2").show();
				$("#history_list2").hide();
				$(this).css("background-color", "#fff")
				$(this).css("color", "black");
				$(this).css("z-index", "2")
				$("#history_list_btn2").css("background-color", "rgb(110, 120, 121)");
				$("#history_list_btn2").css("color", "#fff");
				$("#history_list_btn2").css("z-index", "1")
				$("#widgetPopup2 .all_remove").hide();
				$('#recommend_list2').scrollTop(0);
				if($("#statsMeCatalogKwrd").val() == "" || $("#statsMeCatalogKwrd").val() == null){
					$("#widgetPopup2 .recommend_list").empty();
					$("#widgetPopup2 .recommend_list").append("<li class='none_data'>검색어를 입력해 주세요.</li>");
				}
			});
			$("#statsMeCatalogKwrd").click(function(){
				$("#widgetPopup2").show();
				$("#widgetPopup").hide();
				$("#recommend_list_btn2").trigger("click");
			});
			/** 2020.09.10[한광희] 결과내 검색 검색기록, 추천키워드 전환 END */

			var body = $("body");

			//지도로 보기 클릭
			body.on("click", "#statsMeCatalogPageMap", function() {
				if($statsMeMain.ui.catalogCheckedDataList.length > 0){
					$statsMeCatalog.ui.catalogAccCntDataAdd();	// 카탈로그 누적횟수 증가
					$statsMeNavigation.ui.statMeCatalogNavigation($statsMeMain.ui.catalogCheckedDataList);	// 선택한 카탈로그 Navigation에 셋팅
					$statsMeMain.ui.changePage("statsMeMap");	// 화면 이동
					$("#catalogStatDataNavigation>li>a").first().trigger("click"); // 첫번째 항목 선택
				} else {
					$statsMeMain.ui.alert("통계지리 정보를 선택하세요.");
				}

			});

			//상세정보 보기 클릭
			body.on("click", "#statsMeCatalogPageDetailInfo", function() {
				if($statsMeMain.ui.catalogCheckedDataList.length > 0){
					$statsMeCatalog.ui.catalogAccCntDataAdd();	// 카탈로그 누적횟수 증가
					$statsMeNavigation.ui.statMeCatalogNavigation($statsMeMain.ui.catalogCheckedDataList);	// 선택한 카탈로그 Navigation에 셋팅
					$statsMeMain.ui.changePage("statsMeDetailInfo");	// 화면 이동
					$("#catalogStatDataNavigation>li>a").first().trigger("click"); // 첫번째 항목 선택
				} else {
					$statsMeMain.ui.alert("통계지리 정보를 선택하세요.");
				}
			});

			// 정렬순서 변경
			body.on("change", "#selectStatMeCatalogSorting", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '08', '10', '00', $("#selectStatMeCatalogSorting option:selected").text(), '');

				$("#statsMeGrpChk").prop("checked",false);

				var orderType = $("#selectStatMeCatalogSorting option:selected").val();
				$statsMeCatalog.ui.searchStatsGrphInfo(orderType);
			});

			// 목록 보기 type 변경
			body.on("change", "#selectStatMeCatalogShowType", function() {
				// 2021.11.11 log 생성 - 코드가 없음. ㅡㅡ;;;;;;;;
				//srvLogWrite('N0', '08', '10', '00', $("#selectStatMeCatalogShowType option:selected").text(), '');

				$statsMeCatalog.ui.changeCatalogShowType();
			});

			// 목록 보기 type 변경
//			body.on("change", "#selectStatMeCatalogMenuType", function() {
//				// 2021.11.11 log 생성 - 코드가 없음. ㅡㅡ;;;;;;;;
//				//srvLogWrite('N0', '08', '10', '00', $("#selectStatMeCatalogShowType option:selected").text(), '');
//
//				$statsMeCatalog.ui.changeCatalogMenuType();
//			});

			// 초기화 이미지 버튼 클릭
			body.on("click", "#list_replace", function() {
				$("#list_check").prop("checked", false);
				$statsMeCatalog.ui.titleCheckBoxEvent();
			});

			//2020-02-13 [김남민] 추천키워드, 우리동 인기 키워드, 누적 인기 키워드 아이콘에 마우스 오버시 나타나는 툴팁이 간헐적으로 사라지지 않음 START
			// 키워드 버튼 마우스 뺏을때 툴팁 강제로 숨김
			body.on("mouseleave", "#recmdKwrdDiv, #myLocationAccKwrdDiv, #accKwrdDiv", function(e) {
				$("[id^=ui-tooltip-]").hide();
			});
			//2020-02-13 [김남민] 추천키워드, 우리동 인기 키워드, 누적 인기 키워드 아이콘에 마우스 오버시 나타나는 툴팁이 간헐적으로 사라지지 않음 END

			// 카탈로그 화면 스크롤 이벤트
			body.on("mousewheel", "#statsMeBackground, #statsMeNavigation, #statsMeCatalog", function(e) {
				if($statsMeMain.ui.currentPageName == "statsMeCatalog") {
					//키워드 항목에서는 스크롤 동작 안하게 막음
					var lv_this = $(e.target);
					if(lv_this.closest("div.view_keyword_box").length || lv_this.closest("div.srch_wrap").length) {//20200820 박은식 통계지리정보 리스트 스크롤과 검색팝업 스크롤이 동시에 되는것을 방지처리
						return;
					}

					// scroll up
					if (e.originalEvent.deltaY > 0) {
						$("#statsMeCatalog").mCustomScrollbar("scrollTo","-=100", {
							//scrollInertia:950
							scrollInertia:300
						});
						$("#statsMeGrphInfoDataList_div").mCustomScrollbar("scrollTo","-=100", {
							//scrollInertia:950
							scrollInertia:300
						});
					}
					// scroll down
					else {
						$("#statsMeCatalog").mCustomScrollbar("scrollTo","+=100", {
							//scrollInertia:950
							scrollInertia:300
						});
						$("#statsMeGrphInfoDataList_div").mCustomScrollbar("scrollTo","+=100", {
							//scrollInertia:950
							scrollInertia:300
						});
					}
				}
			});

			// 윈도우 크기 변경시 카탈로그 목록 사이즈 맞춤.
			$(window).resize(function() {
				if($statsMeMain.ui.currentPageName == "statsMeCatalog") {
					setTimeout(function() {
						var lvHeight = Number($(window).outerHeight(true)) - $statsMeCatalog.ui.statsMeGrphInfoDataList_div_minus_height;
						$("#statsMeGrphInfoDataList_div").height(lvHeight);
					}, 100);
				}
			});

			//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 START
			// 카탈로그 페이지 마우스 이동 이벤트 (키워드 목록 벗어나면 숨김처리)
			body.mousemove(function(e) {
				if($statsMeMain.ui.currentPageName == "statsMeCatalog") {
					if($statsMeCatalog.ui.view_keyword_01_show_yn == "Y") {
						var lv_this = $(e.target);
						var lv_this_id = lv_this.attr("id");
						if(
							lv_this_id != "recmdKwrd"
							&& lv_this_id != "recmdKwrdDiv"
							&& lv_this_id != "view_keyword_01"
							&& !lv_this.closest("#recmdKwrdDiv").length
						) {
							$statsMeCatalog.ui.onMouseLeave("view_keyword_01");
						}
						/**20200820 박은식 추천키워드, 우리동내 인기키워드, 노적인기 키워드 mouseover 시 검색팝업 닫힘 start*/
						$("#widgetPopup").hide()
						$("#statsMeCatalogKwrdAll").focusout();
						$("#widgetPopup2").hide()
						$("#statsMeCatalogKwrd").focusout();
						/**20200820 박은식 추천키워드, 우리동내 인기키워드, 노적인기 키워드 mouseover 시 검색팝업 닫힘 end*/
					}
					if($statsMeCatalog.ui.view_keyword_02_show_yn == "Y") {
						var lv_this = $(e.target);
						var lv_this_id = lv_this.attr("id");
						if(
							lv_this_id != "myLocationAccKwrd"
							&& lv_this_id != "myLocationAccKwrdDiv"
							&& lv_this_id != "view_keyword_02"
							&& !lv_this.closest("#myLocationAccKwrdDiv").length
						) {
							$statsMeCatalog.ui.onMouseLeave("view_keyword_02");
						}
						/**20200820 박은식 추천키워드, 우리동내 인기키워드, 노적인기 키워드 mouseover 시 검색팝업 닫힘 start*/
						$("#widgetPopup").hide()
						$("#statsMeCatalogKwrdAll").focusout();
						$("#widgetPopup2").hide()
						$("#statsMeCatalogKwrd").focusout();
						/**20200820 박은식 추천키워드, 우리동내 인기키워드, 노적인기 키워드 mouseover 시 검색팝업 닫힘 end*/
					}
					if($statsMeCatalog.ui.view_keyword_03_show_yn == "Y") {
						var lv_this = $(e.target);
						var lv_this_id = lv_this.attr("id");
						if(
							lv_this_id != "accKwrd"
							&& lv_this_id != "accKwrdDiv"
							&& lv_this_id != "view_keyword_03"
							&& !lv_this.closest("#accKwrdDiv").length
						) {
							$statsMeCatalog.ui.onMouseLeave("view_keyword_03");
						}
						/**20200820 박은식 추천키워드, 우리동내 인기키워드, 노적인기 키워드 mouseover 시 검색팝업 닫힘 start*/
						$("#widgetPopup").hide()
						$("#statsMeCatalogKwrdAll").focusout();
						$("#widgetPopup2").hide()
						$("#statsMeCatalogKwrd").focusout();
						/**20200820 박은식 추천키워드, 우리동내 인기키워드, 노적인기 키워드 mouseover 시 검색팝업 닫힘 end*/
					}
				}
			});
			//2020-02-27 [김남민] 통계로-51 : 카탈로그 화면 마우스 오버 기능 개선 END



			// 2021-11-16 '그룹보기' 클릭
			$("#statsMeGrpChk").click(function(){
				$("#list_replace").trigger("click"); //목록선택 초기화
				$(".info_description").hide();

				if($("#statsMeGrpChk").is(':checked')){
					$statsMeCatalog.ui.searchStatsGrphInfo("grp");

				} else {
					$statsMeCatalog.ui.searchStatsGrphInfo("default");
				}

			});

		}
	};
}(window, document));