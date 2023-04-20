/**
 * 도시화 분석 지도 왼쪽 화면에 대한 클래스
 *
 * history : 2021/11/08 초기 작성 version : 1.0 see :
 *
 */
(function(W, D) {
	W.$urbanLeftMenu = W.$urbanLeftMenu || {};

	$(document).ready(function() {
			srvLogWrite('A0', '04', '03', '07', '', ''); // 2022.02.15 log 생성
			$('.totpopup_layer').hide();
			$urbanLeftMenu.event.setUIEvent();
			$urbanLeftMenu.ui.initializeUI('');
			// 2022 SGIS5 추가
			$('.gnb .gnb-li > a').off('click').on('click', function(){
				 var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
				 var map = $urbanMain.ui.getMap(0)
				 if(selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_2"|| selMenuId === "gnb_menu_3"){
					 if($(".multyView").has('active')){
						 $(".multyView").removeClass('active');
					 }
						if(!map){
							var cnt =$urbanLeftMenu.ui.getCheckedYear().length;
							$urbanMain.ui.doRemoveMap(cnt);
							$urbanMain.ui.doInitMap();
							$(".multyView").trigger('click');
							if($("#yearReset").has('active')){
								$("#yearReset").removeClass('active');
							}

		    			}
					}
			 });
			 // 2022 SGIS5 추가 끝


	});

	$urbanLeftMenu.ui = {

			namespace : "urbanLeftMenu",

			/**
			 *
			 * @name         : initializeUI
			 * @description  : 초기정보를 설정한다.
			 *
			 */
			initializeUI : function(pFlag) {

			},

			/**
			 *
			 * @name         : clearUI
			 * @description  : 화면을 정리한다.
			 *
			 */
			clearUI : function(pFlag) {

			},

			/**
			 *
			 * @name         : setYearSelBar
			 * @description  : 년도선택 ui 구성
			 *
			 */
			setYearSelBar : function(pFlag, pIsRun) {
				// pFlag: UN도시분류/통계청분류 구분

				var $bowl = $('#aside .since');
				var $sinceBox = $('#aside .sinceBox');  // 2022 SGIS5 추가
				var $select =$('#aside .sinceNew');		// 2022 SGIS5 추가
				var curSinceGb = $bowl.attr("data-since-gb");
				var curSinceNewGb = $sinceBox.attr("data-since-gb"); // 2022 SGIS5 추가
				if(curSinceGb !== pFlag){
					var selYear = "";
					var selYear2 = "";	// 2022 SGIS5 추가
					var $selYear = $bowl.find(".since-button a.active");
					var $selYear2 = $select.find(".sinceNew option:selected"); // 2022 SGIS5 추가
					if($selYear.length > 0){
						selYear = $selYear.attr('data-year');
						selYear2=$selYear2.val(); // 2022 SGIS5 추가
					}

					var years;
					if(pFlag == $urbanObj.urbanCls_SGIS){
						years = $urbanMain.ui.statsBaseYear02;
					}else{
						years = $urbanMain.ui.statsBaseYear01;
					}

					var htmlString = '';	//'<div class="since-tit">년도선택</div>'
					var htmlString2 ='';	// 2022 SGIS5 추가

					$.each(years, function(index, item){

						if(selYear === item){
							htmlString += '<div class="since-button"><a href="#" data-year="' + item + '" class="active">' + item + '</a></div>'
							;
							htmlString2 += '<option value="'+ item+'" selected >' +item + '</option>';	// 2022 SGIS5 추가
						}else{
							htmlString += '<div class="since-button"><a href="#" data-year="' + item + '">' + item + '</a></div>';
							htmlString2 += '<option value="'+ item+'" >' +item + '</option>';	// 2022 SGIS5 추가
						}
					});

					$bowl.html(htmlString);
					$select.html(htmlString2)	// 2022 SGIS5 추가
					$bowl.attr("data-since-gb", pFlag);
					$select.attr("data-since-gb", pFlag); // 2022 SGIS5 추가

					//최근년도 선택
					//(기본값)최초 생성이므로 버튼 활성화만, (필요시)클릭 이벤트 호출
					$selYear = $bowl.find(".since-button a.active");
					$selYear2 = $select.find(".sinceNew :selected");	// 2022 SGIS5 추가
					//wkwkwk
					if($selYear.length === 1){
						if(pIsRun){
							$selYear.trigger('click');
						}else{
							$selYear.addClass('active');
						}
					}else{
						var $yearBtn;
						if(selYear !== "" && pFlag == $urbanObj.urbanCls_SGIS){
							$yearBtn = $bowl.find('.since-button').last();
						}else{
							$yearBtn = $bowl.find('.since-button').first();
						}

						if(pIsRun){
							$yearBtn.find('a').trigger('click');
						}else{
							$yearBtn.find('a').addClass('active');
						}
					}

//					if($selYear2.length === 0){
//
//						if(pIsRun){
//							$selYear2.trigger('click');
//						}else{
//							$selYear2.addClass('selected');
//						}
//					}else{
//						var $yearBtn;
//						if(selYear2 !== "" && pFlag == $urbanObj.urbanCls_SGIS){
//							$yearBtn = $bowl.find('.since-button').last();
//						}else{
//							$yearBtn = $bowl.find('.since-button').first();
//						}
//
//						if(pIsRun){
//							$yearBtn.find('a').trigger('click');
//						}else{
//							$yearBtn.find('a').addClass('active');
//						}
//					}

				}
			},

			/**
			 *
			 * @name         : getSelectedYear
			 * @description  : 선택된 년도 반환
			 *
			 */
			getSelectedYear : function() {
				var rtnVal = "";
				var rtnVal2 = "";	// 2022 SGIS5 추가
				var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
				var $selYear =  $("#aside .since .since-button a.active");
				var $selYear2 =  $("#aside .sinceNew :selected");	// 2022 SGIS5 추가
				if($selYear.length > 0){
					rtnVal = $selYear.attr('data-year');
				}
				// 2022 SGIS5 추가
				if($selYear2.length >= 0){
					rtnVal2 = $selYear2.val();
				}
				// 2022 SGIS5 추가 끝
				if(selMenuId === "gnb_menu_4"){
					return rtnVal;
				}else{
					return rtnVal2;
				}
				
			},


			/**
			 *
			 * @name         : getCheckedYear
			 * @description  : 체크된 년도 반환
			 * @history      :	2022.08	
			 */
			getCheckedYear : function(){
				  var chkCnt = 'input[name="yearChk"]:checked';
				  var chkYear =[];
				  $('input[name="yearChk"]:checked').each(function(){
					  chkYear.push($(this).val());
				  });
				  return chkYear;
			},

			/**
			 *
			 * @name         : getSelectedLeftMenuId
			 * @description  : 현재 선택된 왼쪽 대메뉴의 id값을 반환한다.
			 *
			 */
			getSelectedLeftMenuId : function() {
				//gnb_menu_1-도시화 통계, gnb_menu_2-시계열 변화, gnb_menu_3-도시화 지표분석, gnb_menu_4-생활시설 분포
				var rtnVal = "";
				var $menu = $('#gnb').find('.gnb-li.active');
				if($menu.length === 1){
					var menuId = $menu.attr("id");
					if(menuId !== undefined && menuId !== null && menuId !== ""){
						rtnVal = menuId;
					}
				}

				return rtnVal;
			},

			/**
			 *
			 * @name         : setLeftMenuUI
			 * @description  : 왼쪽 서브메뉴 화면을 구성한다.
			 *
			 */
			setLeftMenuUI : function(pClose, pChange) {
				var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
				var isClose = ((pClose === undefined || pClose === null) ? false : pClose);
				var $bowl = $('#' + selMenuId);

				if(selMenuId === "gnb_menu_2") srvLogWrite('R0', '02', '01', '01', '', ''); // 도시변화
				else if(selMenuId === "gnb_menu_1") srvLogWrite('R0', '03', '01', '01', '', ''); // 도시화 통계
				else if(selMenuId === "gnb_menu_3") srvLogWrite('R0', '04', '01', '01', '', ''); // 도시화 지표분석

				if($bowl.length === 1){
					if(selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4"){	//도시화 통계 or 도시화 지표분석 or 생활시설분포 
						$urbanMain.ui.resetUrbanTimeSeries(); //시계열 초기화
						var $selClsTy = $bowl.find('ul li a.active');
						if($selClsTy.length !== 1){
							return;
						}
						var clsTy = $selClsTy.attr('data-cls-type');
						if(clsTy === $urbanObj.urbanCls_UN){
//							if($("input:radio[name=ro_urban_ty]:checked").length == 0){
//								$("#urban_ty_center").prop("checked", true);
//							}
							//SGIS5 추가
							setTimeout(() => {
								$("#urban_ty_box_1 > li:nth-child(2)").trigger("click");
								$("#urban_ty_box_1 > li:nth-child(1)").trigger("click");
							}, 200);
							if($('#urban_ty_box_1 > li.active').length == 0){
								$("#urban_ty_box_1 > li:nth-child(1)").addClass("active");
							}
							$('#urban_ty_box_1').show();
						}else if(clsTy === $urbanObj.urbanCls_SGIS){
							$('#urban_ty_box_1').hide();

						}

						//권역 콤보 닫기
						if(isClose){
							$urbanLeftMenu.ui.closeDistrictCombo();
						}

						//도시지역 목록 호출
						if(pChange){
							var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
							$urbanMain.ui.reqCommonInfo("urbars", paramObj);
						}

						if($('.menu-close').hasClass('active')){
							$('.menu-close').trigger('click');
						}
					}else if(selMenuId === "gnb_menu_2"){	//시계열 변화
						//현재 하는일 없음
						var clsTy = $('#gnb_menu_2').find('ul li a.active').attr('data-cls-type');
						var statYears = $urbanMain.ui.getStatYearList(clsTy, false);
						$urbanMain.ui.setTimeSeriesYearUi(statYears);
						$('.sViewBtn').hide(200)	// 2022 SGIS5 추가
					}
					// 2022 SGIS5 추가
					if(selMenuId ==="gnb_menu_4"){
						$('.facility-layer').css('display','block');
					}else{
						$('.facility-layer').css('display','none');
						if($('.facility-layer').hasClass('active')){
							$('.facility-layer').trigger('click');
						}
					}	// 2022 SGIS5 추가 끝
				}
			},

			/**
			 *
			 * @name         : setDistrictInfo
			 * @description  : 권역정보 목록을 구성한다.
			 *
			 */
			setDistrictInfo : function(pRes, pOptions) {
				var list = pRes.result.list;
				var $bowl = $('#menu_group_box');
				var $subGroup = $('.subGroupCon'); // 추가
				var htmlString = '';
				var htmlString2 = ''; //추가

				$.each(list, function(index, item){
					var expStr = item.dstrct_lclas_exp;
					if(expStr !== undefined && expStr !== null && expStr !== ""){
						expStr = "(" + expStr + ")";
					}else{
						expStr = "";
					}
					htmlString += '<div class="menu-group" data-dstrct-cd="' + item.dstrct_lclas_cd + '">';
					htmlString += '<a href="#" class="menu-toggle">' + item.dstrct_lclas_nm + expStr + '</a>';
					htmlString += '</div>';
					htmlString2 += '<div class="menu-group2" data-dstrct-cd="' + item.dstrct_lclas_cd + '">';	// 2022 SGIS5 추가
					htmlString2 += '<div class="menu-list2">';	// 2022 SGIS5 추가
					htmlString2 += '</div>';// 2022 SGIS5 추가
					htmlString2 += '</div>';// 2022 SGIS5 추가
				});

				$bowl.html(htmlString);
				$subGroup.html(htmlString2); //추가

				// 초기화면 설정
				var param = pOptions.params;
				$urbanMain.ui.doInitView("init_complete", param);
			},

			/**
			 *
			 * @name         : setLivingCnt
			 * @description  : 생활시설 목록을 구성한다.
			 * @history		 : 22 .09
			 */
			setLivingCnt : function(pRes, pOptions) {
				var list = pRes.result.list;
				var $bowl = $('.facility');
				var htmlString = '';
				$.each(list, function(index, item){
						if(item.ksic_5_cd != null)$('.facility ul>li:eq('+index+')').find('.iconbox').attr('data-ksic_5_cd',item.ksic_5_cd)
						if(item.urbar_id != null)$('.facility ul>li:eq('+index+')').find('.iconbox').attr('data-urbar-id',item.urbar_id)
						if(item.urbar_type != null)$('.facility ul>li:eq('+index+')').find('.iconbox').attr('data-urbar-type',item.urbar_type)
						$('.facility ul>li:eq('+index+')').find('span:eq(0)').html(item.type_nm);
						$('.facility ul>li:eq('+index+')').find('span:eq(1)').html(item.cnt);
				});


				// 초기화면 설정
				var param = pOptions.params;
				$urbanMain.ui.doInitView("init_complete", param);
			},
			clearLiving : function(){
				for(var i=0; i<12; i++){
					$('.facility ul>li:eq('+i+')').find('span:eq(1)').html('-');
				}
			},


			/**
			 *
			 * @name         : setUrbanAreas
			 * @description  : 도시지역 목록을 구성한다.
			 *
			 */
			setUrbanAreas : function(pRes, pOptions) {
				var errCd = parseInt(pRes.errCd);
				if(errCd === 0){
					var urbarsMap = $urbanObj.setUrbanAreasInfo(pRes, pOptions, false);	// 결과값 캐시
					$urbanLeftMenu.ui.makeUrbanAreas(pOptions, urbarsMap);
				}else{
					// errCd(-100) 포함...결과값 없음 처리...일단 위랑 처리내용이 같네?
					var urbarsMap = $urbanObj.setUrbanAreasInfo(pRes, pOptions, false);	// 결과값 캐시
					$urbanLeftMenu.ui.makeUrbanAreas(pOptions, urbarsMap);
				}
			},

			/**
			 *
			 * @name         : makeUrbanAreas
			 * @description  : 도시지역 목록을 구성한다.
			 *
			 */
			makeUrbanAreas : function(pOptions, pMap) {
				
				var urbarsMap;
				if(pMap !== undefined && pMap !== null){
					urbarsMap = pMap;
				}else{
					urbarsMap = $urbanObj.getUrbanAreasInfo(pOptions);

				}

				if(urbarsMap !== undefined && urbarsMap !== null){
					// 총합
					//$("#urban_tot_cnt_1").html(urbarsMap["total_cnt"]);

					//
					var urbanCls = $urbanObj.getValueMappedToKey(["urban_cls_gb"], pOptions);
					var $bowl = $("#menu_group_box");
					var $subGroup = $('.subGroupCon');	// 2022 SIGS5 추가
//					var $grpList = $bowl.find(".menu-group[data-dstrct-cd]");	//data-dstrct-cd 속성이 있어야 유효
					var $subList = $subGroup.find(".menu-group2[data-dstrct-cd]");	// 2022 SIGS5 추가
					$.each($subList, function(idx, item){
						var dstrctCd = $(item).attr("data-dstrct-cd");
						var uList = urbarsMap[dstrctCd];
						var $listBowl = $(item).find(".menu-list2");	 // 2022 SIGS5 추가
						$listBowl.empty();

						if(uList !== undefined && uList !== null){
							var htmlString = '';

							$.each(uList, function(idx2, item2){
								var type = (item2["type"] === undefined ? "" : item2["type"]);
								var sido_cd = (item2["sido_cd"] === undefined ? "" : item2["sido_cd"]);
								var sgg_cd = (item2["sgg_cd"] === undefined ? "" : item2["sgg_cd"]);
								var main_urban_id = (item2["main_urban_id"] === undefined ? "" : item2["main_urban_id"]);

								htmlString += '<a href="#" data-urban-id="' + item2["urban_id"] + '" data-urban-year="' + item2["base_year"] + '" data-urban-cls="' + urbanCls + '" data-urban-type="' + type + '" data-urban-sido="' + sido_cd + '" data-urban-sgg="' + sgg_cd + '" data-urban-x="' + item2["x_coor"] + '" data-urban-y="' + item2["y_coor"] + '" data-urban-area="' + item2["area"] + '" data-urban-main-id="' + main_urban_id + '" class="mightOverflow">' + item2["urban_nm"] + '</a>';
							});

							$listBowl.html(htmlString);
							$listBowl.hide();	// 2022 SIGS5 추가
						}

					});
					// 기선택(초기 화면설정) 처리
					$urbanMain.ui.doInitView("uaList_complete");

					var curUrbanId = $urbanObj.getCurIdentifier();
					$urbanObj.setCurIdentifier("");

					if(curUrbanId !== ""){
						// var $bowl = $('#menu_group_box');
						var $bowl = $('#sub_group_box');
						var $targetItm = $bowl.find(".menu-list2 > a[data-urban-id=" + curUrbanId + "]");

						// 이하 didSelectedPolygon 처리와 동일
						if($targetItm !== undefined && $targetItm !== null && $targetItm.length > 0){
							// $($targetItm).closest(".menu-group").find(".menu-toggle").trigger('click');
							$($targetItm).closest(".menu-group2").trigger('click'); //변경

							var $menuList = $($targetItm).closest(".menu-list2");
							var $menuItms = $menuList.find('a');
							var topPos2 = 0;
							$.each($menuItms, function(index, item){
								if(item == $targetItm[0]){
									return false;
								}
								topPos2 = topPos2 + $(item).outerHeight(true);
							});

							$menuList.scrollTop(topPos2);

							$($targetItm).trigger('click');
						}
					}

				}
			},

			/**
			 *
			 * @name         : closeDistrictCombo
			 * @description  : 권역 콤보박스를 모두 닫는다.
			 *
			 */
			closeDistrictCombo : function() {
				var $grpList = $("#menu_group_box .menu-group.active");
				$.each($grpList, function(idx, item){
					$(item).find(".menu-toggle").trigger('click');	//최대 1개만 열려있으니까
				});
			},

			/**
			 *
			 * @name         : makeParamMap
			 * @description  : api에 전달할 파라미터 정보를 만든다.
			 *
			 */
			makeParamMap : function(pWorkGb) {
				var rtnObj = {};
				if(pWorkGb == "urbars"){
					var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
					var $bowl = $('#' + selMenuId);

					if($bowl.length === 1){
						var $selClsTy = $bowl.find('ul li a.active');

						if($selClsTy.length === 1){
							rtnObj.base_year = $urbanLeftMenu.ui.getSelectedYear();

							var clsTy = $selClsTy.attr('data-cls-type');
							// wkwk 0816
							if(selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4"){	//도시화 통계 or 도시화 지표분석 or 생활시설분포
								rtnObj.urban_cls_gb = clsTy;

								if(clsTy === $urbanObj.urbanCls_UN){
									//rtnObj.urban_type = $("input:radio[name=ro_urban_ty]:checked").val();
									rtnObj.urban_type = $('#urban_ty_box_1 > li.active').attr("data-urbar-type");
								}
							}else if(selMenuId === "gnb_menu_2"){	//시계열 변화
								rtnObj.urban_cls_gb = clsTy;
							}
						}
					}
				}

				return rtnObj;
			}

	};

	$urbanLeftMenu.callbackFunc = {

	};

	$urbanLeftMenu.event = {

			/**
			 *
			 * @name         : setUIEvent
			 * @description  : Left 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다.
			 *
			 */
			setUIEvent : function() {
				var body = $("body");

//				$('a[href="#"]').click(function(e) { e.preventDefault(); });

				//년도 선택 원본
//		        body.on('click', '.since .since-button > a', function(){
//		        	if(!$(this).hasClass('active')){
//			        	$(this).closest('.since').find('a').removeClass('active');
//			        	$(this).addClass('active');
//
//			        	//var selYear = $(this).attr("data-year");
//
//			        	//년도 버튼을 클릭하면.. 많은 일들이.. 어느정도 정리되면 함수로 분리
//			        	//1. 현재 선택된 왼쪽 메뉴와 메뉴화면이 열려있는지에 따라
//			        	var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
//			        	var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
//
//			        	paramObj.map_id = 0;
//			        	paramObj.async = false;
//						if(selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3"){	//도시화 통계 or 도시화 지표분석
//							if(selMenuId === "gnb_menu_1") srvLogWrite('R0', '03', '02', '01', '년도: '+$(this).attr("data-year"), ''); // 2022.02.15 log 생성
//							else if(selMenuId === "gnb_menu_3") srvLogWrite('R0', '04', '02', '01', '년도: '+$(this).attr("data-year"), ''); // 2022.02.15 log 생성
//
//
//							if($(".menu-content-1").is(':visible')){	//화면 열려있을때만
//								$urbanLeftMenu.ui.closeDistrictCombo();
//
//								//권역 목록 요청
//								$urbanMain.ui.reqCommonInfo("urbars", paramObj);
//
//								//도형
//								$urbanMain.ui.reqUrbarsGeometry(paramObj, true);
//							}
//						}else if(selMenuId === "gnb_menu_2"){	//시계열 변화
//							//도형
//							$urbanMain.ui.reqUrbarsGeometry(paramObj, true);
//						}
//		        	}
//
//		        	return false;
//		    	});

				// 2022 SIGS5 추가
		        body.on('click','.sViewBtn', function(){
		        	var svg = '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" fill="#222222"/></svg>';
		        	if(!$(this).hasClass('active')){
		        		$(this).addClass('active');
		        		$(".tab_container").hide(200);
		        		$(".sViewBtn").css("bottom", "74px");
		        		$(".extend-data").css("height", "65px");
		        		$(".sViewBtn").html("자세히 보기 " + svg)

		        	}else{
		        		$(this).removeClass('active');
		        		$(".tab_container").show(200);
		        		$(".sViewBtn").css("bottom", "309px");
		        		$(".extend-data").css("height", "300px");
		        		$(".sViewBtn").html("접기 " + svg)
		        	}
		        });

		     	// 2022 SIGS5 추가

		        var num = 0;
            	$(".multy-view-box").click(function(){
            	if($('.time-graphLine .control').hasClass('stop'))$('.time-graphLine .control').trigger('click')
            	var clsTy = $('#gnb_menu_2').find('ul li a.active').attr('data-cls-type');
		    	var statYears = $urbanMain.ui.getStatYearList(clsTy, false);
		    	$urbanMain.ui.setTimeSeriesYearUi(statYears);

                 var yearCnt=$urbanLeftMenu.ui.getCheckedYear().length;
           	     $('input[name="yearChk"]').removeAttr('onclick');
	             	num ++;
            		if(num == 1){ // 열고        
            			$urbanMain.ui.resetUrbanTimeSeries();
            			$(".multy-view-box button img").css("width","0px");
            			$(".multy-view-box button").html("▶ 연도별 재생");
	            		$(".check-timeLine").css("display","block");
	            		$(".time-graphLine").css("display","none");
	            		$('#yearPlay').css('display','block');
	            		$('#yearPlay').addClass('active');
	            		$('.multyView').addClass('active');
	            	}else{ // 닫고       
            			$(".multy-view-box button").html('<img src="/images/urban/icon-multyView.png" alt="멀티뷰"> 멀티뷰');
	            		$(".check-timeLine").css("display","none");
	            		$(".time-graphLine").css("display","block");
	            		$('.check-timeLine input').prop('checked',false);
	            		$('#yearPlay').removeClass('active');
	            		$('.multyView').removeClass('active');
	            		if(!$urbanMain.ui.getMap(0)){
	            			$urbanMain.ui.doRemoveMap(yearCnt);
		            		$urbanMain.ui.doInitMap();
	            		}
	            		if($('#yearReset').hasClass('active')){
	            			$('#yearReset').trigger('click');
	            		}
	            		num = 0;
	            	}

	            });
		  body.on('click','.check-timeLine input', function(){
			  var chkCnt = 'input[name="yearChk"]:checked';
			  var selected = document.querySelectorAll(chkCnt).length;
			  if(selected >=5){
				  messageAlert.open("알림", "년도는 4개까지만 선택할 수 있습니다.")
				  $(this).prop('checked',false);
			  }

		  })
		  // 2022 SIGS5 추가
          body.on('click','#yearPlay',function(e){
        	  var yearCnt=$urbanLeftMenu.ui.getCheckedYear().length;
        	  if(yearCnt == 1 || yearCnt == 0){
        		  messageAlert.open("알림", "년도를 2개 선택 해주세요 .");
        		  return;
        	  }
        	  $('#yearPlay').removeClass('active');
        	  $('#yearReset').addClass('active');
        	  $urbanMain.ui.doRemoveMap(0);  //이전 지도 삭제
        	//   $('.control-wrap').css('display','none');
	        //   $('.mapContents').css('display','none');
	          $urbanMain.ui.doCreateMap(yearCnt);
	          $('input[name="yearChk"]').attr('onclick','return false;');
	          for(var i=1; i<=yearCnt; i++){
	        	  $('.mapType'+i).attr('data-map-type','white').trigger('click');
	          }
	          if($(this).has('active')){
	        	  $('#yearPlay').css('display','none');
	        	  $('#yearReset').css('display','block');
	        	  body.on('click','#yearReset',function(){
					 $('.wrapDipYear').hide();
	        		  $('#yearReset').removeClass('active');
	        		  $('#yearPlay').addClass('active');
	        		  var yearCnt=$urbanLeftMenu.ui.getCheckedYear().length;
	        		    $urbanMain.ui.doRemoveMap(yearCnt);
	            		$urbanMain.ui.doInitMap();
						$('#yearPlay').css('display','block');
						$('#yearReset').css('display','none');
						$('input[name="yearChk"]').prop('checked',false);
						$('input[name="yearChk"]').removeAttr('onclick');
						$urbanMain.ui.resetUrbanTimeSeries();
						var clsTy = $('#gnb_menu_2').find('ul li a.active').attr('data-cls-type');
						var statYears = $urbanMain.ui.getStatYearList(clsTy, false);
						$urbanMain.ui.setTimeSeriesYearUi(statYears);
						var paramTimeObj = {};
						paramTimeObj.urban_cls_gb = clsTy;
						paramTimeObj.base_year = '2000'
						paramTimeObj.map_id = 0;
						paramTimeObj.async = false;
		    			$urbanMain.ui.reqUrbarsGeometry(paramTimeObj, true);
	        	  })
	          }

          });

		       // 2022 SIGS5 추가
		        $('.sinceNew').change(function(){
		        	var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
		        	var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
		        	var selYear = $('.sinceNew :selected').text();
		        	$('.sViewBtn').hide();
		        	paramObj.base_year = selYear;
		        	paramObj.map_id = 0;
		        	paramObj.async = false;
					if(selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3"){	//도시화 통계 or 도시화 지표분석
						if(selMenuId === "gnb_menu_1") srvLogWrite('R0', '03', '02', '01', '년도: '+$(this).val(), ''); // 2022.02.15 log 생성
						else if(selMenuId === "gnb_menu_3") srvLogWrite('R0', '04', '02', '01', '년도: '+$(this).val(), ''); // 2022.02.15 log 생성

						if($(".menu-content-1").is(':visible')){	//화면 열려있을때만
							$urbanLeftMenu.ui.closeDistrictCombo();
							//권역 목록 요청
							$urbanMain.ui.reqCommonInfo("urbars", paramObj);

							//도형
							$urbanMain.ui.reqUrbarsGeometry(paramObj, true);
						}
					}else if(selMenuId === "gnb_menu_2"){	//시계열 변화
						//도형
						$urbanMain.ui.reqUrbarsGeometry(paramObj, true);
					}

		        });

		        //왼쪽 대메뉴 선택
		        body.on('click', '.gnb .gnb-li > a', function(){
		        	var map =  $urbanMain.ui.getMap(0);
					var geo = $urbanMain.ui.getGeo(0);
		        	var $bowl = $(this).parent();
		        	var newIdentifier;
		        	var options;
		        	var chartList=['chart1','chart2','chart3','chart4','chart5','chart6'];
		        	var remainCnt =1;
		        	var param = {};
					
		    		if(!$bowl.is('.active')){
						$('.orange-btn1').trigger('click');
		    			$bowl.siblings().removeClass("active");
		    			$bowl.addClass("active");
		    			//시계열 bar, 안내문구
		    			$('#noticeTextPopup01').hide();
		    			var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
		    			if(selMenuId ==="gnb_menu_4" || selMenuId ==="gnb_menu_2"){
		    				$('.sinceBox').hide();

		    			}else if(selMenuId ==="gnb_menu_3" || selMenuId ==="gnb_menu_1"){
		    				$('.sinceBox').show();
		    				body.on('click','.menu-list2 > a',function(){
		    					$('.sViewBtn').show();
		    				})
		    			}
		    			// 2022 SIGS5 추가
		    			if(selMenuId ==="gnb_menu_4"){

		    				body.on('click','.menu-list2 > a',function(){
		    					$('.sViewBtn').hide();
		    					$('.facility li').removeClass('active');
		    					map.markers.clearLayers();
		    					param.urban_id = $(this).attr('data-urban-id');
		    					param.urban_type=$(this).attr('data-urban-type');
		    					param.work_gb = "urbar";
		    					param.countdown = 1;
		    					newIdentifier = $urbanObj.setInitMap(param);
								$urbanObj.setCurIdentifier(newIdentifier);
								param.identifier =$urbanObj.curIdentifier;
		    					options = $urbanMain.ui.reqSetParams("API_220801", param);
		    					$urbanMask.startProcess(remainCnt, param);
								$urbanMain.ui.requestOpenApi(options);
								if($('.subGroupCon .menu-list2 >a.active')){
					        		$('.gps-input').attr('placeholder',$('.subGroupCon .menu-list2 >a.active').text());
					        	}
								if($(this).is('.active')){
									$('.facility li').off('click').on('click',function(){
										const start = new Date();
										if($(this).hasClass('active') ===true){
											map.markers.clearLayers();
										}else{
											var curLyr = geo.curSelectedLayer;
											if(curLyr !== undefined && curLyr !== null){
												var nxtZoom = map.gMap.getBoundsZoom(curLyr.getBounds(), false);
												map.gMap.fitBounds(curLyr.getBounds(), {
													maxZoom : nxtZoom +6
												});

											}
											param.countdown = 1;
					    					newIdentifier = $urbanObj.setInitMap(param);
											$urbanObj.setCurIdentifier(newIdentifier);
											param.identifier =$urbanObj.curIdentifier;
											param.urban_id=$(this).find('.iconbox').attr('data-urbar-id')
											param.urban_type=$(this).find('.iconbox').attr('data-urbar-type')
											param.ksic_5_cd=$(this).find('.iconbox').attr('data-ksic_5_cd')
											param.work_gb = "urbar";
											$urbanMask.startProcess(remainCnt, param);
											options = $urbanMain.ui.reqSetParams("API_220830", param);
											$urbanMain.ui.requestOpenApi(options);
											map.markers.clearLayers(); //마커 초기화
											$('#admSelect_mapNavi_1 option:selected').change(function(){
												alert('tttt')
											})
											if($('.menu-list2 a.active').attr('data-urban-id') ==='center_006'){

											}
//											if($('.menu-list2 a.active').attr('data-urban-id') ==='center_006' && $('.facility li.active').attr('data-ksic_5_cd') ==='87210'){
//												alert('true')
//											}
										}
									})
								}
		    				})

						}else{
							$urbanLeftMenu.ui.clearLiving();
							map.markers.clearLayers();
						}

		    			if(selMenuId === "gnb_menu_2"){
		    				$('.time-graph-pop').addClass('active');
		    				$(".multy-view-box").show();
							

		    			}else{
							// 2022 SIGS5 추가
		    				$('.time-graph-pop').removeClass('active');
		    				$('.control-foot').show();
		    				$(".multy-view-box").hide();
		    				$('.control-foot').css('right','20px');
		    				$('.sViewBtn').hide(10);
		    				$('.control-top ').hide(10);
		    				if($(".multyView").text() ==='▶ 연도별 재생'){	
		    					$(".multyView").trigger('click');
		    				}
							// 2022 SIGS5 추가 끝

	    					//지도 : 전국으로 전환
		    				/*
							var map = $urbanMain.ui.getMap(0);
							map.mapMove([989674, 1818313], 1);
							*/

		    				if(selMenuId === "gnb_menu_1"){
		    					$('#noticeTextPopup01').show();

		    				}
		    			}

		    			//대메뉴 변경 시 -> 'UN도시분류'와 '통계청 분류' 버튼 초기화
		    			/*
			        	var $actives = $bowl.find('ul li a.active');
			        	if($actives.length > 0){
			        		$bowl.find('ul li a').removeClass("active");
			        		$actives.trigger('click');
			        	}else{
			    			//첫번째 분류(UN도시) 선택
			    			$bowl.find('ul li:nth-child(1) a').trigger('click');
			        	}
			        	*/
		    			$bowl.find('ul li a').removeClass("active");
			        	var ck = $('.header-left .switchBox').hasClass("off");
			        	if(ck){
			        		$bowl.find('ul li:nth-child(2) a').trigger('click');
			        	}else{
			        		$bowl.find('ul li:nth-child(1) a').trigger('click');
			        	}
		    		}

		    		return false;
		    	});

		        //분류(UN도시/통계청 분류) 버튼 선택
		        body.on('click', '.gnb .gnb-li ul li a', function(){
		    		if(!$(this).is('.active')){
		    			//버튼 활성화
		    			$(this).parent().siblings().find('a').removeClass("active");
		    			$(this).addClass("active");

		    			//0. 년도선택바
		    			var clsTy = $(this).attr('data-cls-type');
		    			$urbanLeftMenu.ui.setYearSelBar(clsTy, false);

			    		//1. 세부화면 구성
			    		$urbanLeftMenu.ui.setLeftMenuUI(true, true);

			    		//2. 세부화면 표출
			    		//.menu-content-1/2/3 중에서 1만 사용
			    		//도시화 통계 & 도시화지표분석 : .menu-content-1 공유
			    		//시계열 변화 : 왼쪽 메뉴 없음
			    		/*
			    		var _idx = $(this).closest('.gnb-li').index() + 1;
			    		if(!$('.menu .menu-content-'+_idx+'').is(':visible')){
			    			$('.menu').show();
			    			$('.menu-content').hide();
			    			$('.menu-content-'+_idx+'').show();
			    		}
			    		*/
			    		var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
			    		if(selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4"){
				    		if(!$('.menu .menu-content-1').is(':visible')){
				    			$('.menu').show();
				    			$('.menu-content').hide();
				    			$('.menu-content-1').show();
				    		}
	
			    		}else{
				    		$('.menu').hide();
				    		$('.menu-content').hide();
				    		$('#sub_group_box').hide();
			    		}

						if(clsTy == $urbanObj.urbanCls_UN){
							$(".time-legend").show();
						}else{
							$(".time-legend").hide();
						}

			    		//3. 도형정보 요청
			    		var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
		    			paramObj.map_id = 0;
		    			paramObj.async = false;
			    		if(selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4"){
			    			$urbanMain.ui.reqUrbarsGeometry(paramObj, true);
			    		}else{
			    			$('#reverseBtn').removeClass('active'); //통계년도 오름차순, 내림차순 초기화

			    			var paramTimeObj = {};
			    			paramTimeObj.urban_cls_gb = clsTy;
			    			if(clsTy == $urbanObj.urbanCls_UN){
			    				paramTimeObj.base_year = "2000";
			    			}else{
			    				paramTimeObj.base_year = "2015";
			    			}
			    			paramTimeObj.map_id = 0;
			    			paramTimeObj.async = false;
			    			$urbanMain.ui.reqUrbarsGeometry(paramTimeObj, true);
			    		}

		    			//4. 데이터보드 초기화
		    			//1번(setLeftMenuUI > reqCommonInfo)에서 공통으로 데이터보드 초기화 중, reqCommonInfo를 호출하지 않는 '시계열 변화'
		    			if(selMenuId === "gnb_menu_2"){
		    				$urbanDataBoard.ui.clearUI("menu01");
		    				$('.btn-extend-open').hide();
		    			}else{
		    				$('.btn-extend-open').show();
		    			}

		    			//5. TODO : 필요한 초기화 작업 추가
		        	}

		    		return false;
		        });

				//권역 콤보 선택
				// body.on('click', '.menu .menu-toggle', function(){
				// 	var $bowl = $(this).closest('div.menu-group');
				// 	var $actives = $bowl.siblings('.menu-group.active');
				// 	if($actives.length > 0){
				// 		$.each($actives, function(index, item){
				// 			$(item).removeClass('active');
				// 			$(item).find('.menu-list').stop().slideUp();
				// 		});
				// 	}
				// 	$bowl.toggleClass('active');
				// 	$(this).next('.menu-list').stop().slideToggle();

				// 	return false;
				// });
				

		        //권역 콤보 선택 2022 SGIS5 변경
		        body.on('click', '.menu-group', function(){
		        	var $bowl = $(this).closest('div.menu-group');
		        	var $actives = $bowl.siblings('.menu-group.active');
		        	var $activeDstrct=$bowl.attr("data-dstrct-cd");
		        	var $subGroup = $('.subGroupCon');
					var $subList = $subGroup.find(".menu-group2[data-dstrct-cd]");
					var dosiNmList =["수도권 도시분류","강원권 도시분류","세종권 도시분류"
									,"충북권 도시분류","대전충남권 도시분류","전북권 도시분류","광주진남권 도시분류","대구경북권 도시분류","부산울산경남 도시분류","제주권 도시분류"];
					$("#sub_group_box").css("display","block");
					var cnt =0;

					if($actives.length > 0){

						$.each($actives, function(index, item){
				    		$(item).removeClass('active');

						});
		        	}
		        	//  2022 SGIS5 변경
		        	if('.menu-group.active'){
	        			$.each($subList, function(index, item){
	        				if($activeDstrct == $(item).attr('data-dstrct-cd')){
	        					var svg = '<svg class="smenu-close" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" fill="#222222"/></svg>';
	        					var svg2 = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L18 18" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	        					$(this).addClass('active');
	        					$(this).find('li > a').addClass('active');
	        					$(this).children('.menu-list2').show();
	        					$('.subGroupTit').html(dosiNmList[index]+svg2);
	        					//$('.subGroupTit2').html(dosiNmList[index]+svg);

	        				}
	        				else{
	        					cnt=0;
	        					$(this).removeClass('active');
	        					$(this).children('.menu-list2').hide();
	        				}
						});
		        	}
		        	// 도시 선택 안할시 목록 지우기(토글 값 반대로 되어 있음....)
		        	if($bowl.attr('class') == 'menu-group active'){
		        		$("#sub_group_box").css("display","none");

		        	}


		         	$bowl.toggleClass('active');
//		    		$(this).next('.menu-list').stop().slideToggle();

		    		return false;
		    	});

		        //왼쪽 메뉴 닫기 버튼 선택
		        body.on('click', '.menu .menu-close', function(){
		        	/*$('.gnb .gnb-li').removeClass('active');
		    		$('.menu').hide();
		    		$('.menu-content').hide();*/
		        	if($(this).hasClass('active')){	
		        		$(this).removeClass('active');	
		        		//$("#noticeTextPopup01").css("left", "180px");
			    		$('#menu_group_box').show(200);
			    		$("#sub_group_box").animate({"top":"305px"},200);
		        	}else{
		        		$(this).addClass('active');
		        		//$("#noticeTextPopup01").css("left", "180px");
		        		$('#menu_group_box').hide(200);
			    		//$('.menu').stop().animate({"left":"-205px"},200);
			    		$("#sub_group_box").animate({"top":"185px"},200);
		        	}
		    		// TODO : 왼쪽 메뉴 창을 닫았다는건 지도든 데이터보드든 모두 초기화해야할 필요가 있음
		    		return false;
		        });


		        //도시분류 클릭
		        //2022 SGIS5 추가
		        body.on('click', '.subGroupTit', function(){
		        	if($(this).hasClass('active')){
		        		$(this).removeClass('active');
		        		$(".subGroupScBox").show(200);
		        		$(".subGroupTit").css("border-radius","5px 5px 0px 0px");
		        	}else{
		        		$(this).addClass('active');
		        		$(".subGroupScBox").hide(200);
		        		$(".subGroupTit").css("border-radius","5px");

		        	}
		    		return false;
		        });

				//2022 SGIS5 추가
		      //생활시설분포레이어
		        body.on('click', '.facility-layer', function(){
		        	if($(this).hasClass('active')){
		        		$(this).removeClass('active');
		        		$(".facility").hide(200);
		        		$('.facility li').removeClass('active');
		        		var map =  $urbanMain.ui.getMap(0);
						map.markers.clearLayers(); //마커 초기화

		        	}else{
		        		$(this).addClass('active');
		        		$(".facility").show(200);

		        	}
		        	return false;
		        });

				//2022 SGIS5 추가
		        //생활시설분포
		        body.on('click', '.facility li', function(){
		        	var $bowl = $(this).closest('div.facility li');
		        	var $actives = $bowl.siblings('li.active');
					if($actives.length > 0){
						$.each($actives, function(index, item){
				    		$(item).removeClass('active');
						});
		        	}
		        	$bowl.toggleClass('active');

		        });


		        //도시타입(도시/준도시) 선택
		        //body.on('change', '#urban_ty_box_1 input[name="ro_urban_ty"]:radio', function(){
		        body.on('click', '#urban_ty_box_1 > li', function(){
					$('.sViewBtn').hide();
					$urbanMain.ui.doInitView("map_complete");
		        	if(!$(this).is('.active')){
		        		$(this).siblings().removeClass("active");
		        		$(this).addClass("active");
		        		if($('#urban_ty_box_1 li.active').attr('data-urbar-type') == '02'){
		        			$('#menu_group_box').removeClass('active1');
		        			$('#menu_group_box').addClass('active2');
		        			$('#sub_group_box').removeClass('active1');
		        			$('#sub_group_box').addClass('active2');


			        	}else{
			        		$('#menu_group_box').removeClass('active2');
			        		$('#menu_group_box').addClass('active1');
			        		$('#sub_group_box').removeClass('active2');
		        			$('#sub_group_box').addClass('active1');
			        		}

						if($urbanMain.ui.writeSrvLogYn == "Y"){
							if( $("#gnb li.active").index() == "1") srvLogWrite('R0', '03', '03', '01', $(this).text(), ''); // 2022.02.15 log 생성
							else if( $("#gnb li.active").index() == "2") srvLogWrite('R0', '04', '03', '01', $(this).text(), ''); // 2022.02.15 log 생성
						}

						$urbanLeftMenu.ui.closeDistrictCombo();

						var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
						$urbanMain.ui.reqCommonInfo("urbars", paramObj);

						/*
		    			paramObj.map_id = 0;
		    			$urbanMain.ui.reqUrbarsGeometry(paramObj, true);
		    			*/

		        	}
		        });

		        //도시화 통계 > 도시지역 선택
		        // 태그 아이디 변경
		        body.on('click', '.menu-group2 .menu-list2 > a', function(event, data){
		        	$("#sub_group_box .menu-list2 > a").removeClass("active");
		        	$('.totpopup_layer').removeClass('district');
		        	$(this).addClass("active");
		        	$('.sViewBtn').show();
					$('.orange-btn1').trigger('click');
		        	var dstrctCd = $(this).closest('.menu-group2').attr("data-dstrct-cd");
		        	 var xCoor = $(this).attr("data-urban-x");
		        	 var yCoor= $(this).attr("data-urban-y");
		        	var area = $(this).attr("data-urban-area");

					if($urbanMain.ui.writeSrvLogYn == "Y"){
		        		if( $("#gnb li.active").index() == "1") srvLogWrite('R0', '03', '03', '02', area+' '+$(this).text(), ''); // 2022.02.15 log 생성
		        		else if( $("#gnb li.active").index() == "2") srvLogWrite('R0', '04', '03', '02',  area+' '+$(this).text(), ''); // 2022.02.15 log 생성
						$urbanMain.ui.writeSrvLogYn = "N"; //클릭 한번으로 여러개의 log가 생성되는 것을 막기 위한 제어변수
					}
					var param = $urbanObj.makeSelectedUrbarsInfo($(this));
					param.dstrct_lclas_cd = dstrctCd;
					param.map_id = 0;

					var map = $urbanMain.ui.getMap(param.map_id);
//					map.mapMove([xCoor, yCoor], 6);
					// 도형
					var geo = $urbanMain.ui.getGeo(param.map_id);
					geo.setCurUrbanKey($urbanObj.getGeometryKey(param));
					if(!(data !== undefined && data["isMapMove"] === "N")){
						var curLyr = geo.curSelectedLayer;
						if(curLyr !== undefined && curLyr !== null){
							var nxtZoom = map.gMap.getBoundsZoom(curLyr.getBounds(), false);
							map.gMap.fitBounds(curLyr.getBounds(), {
								maxZoom : nxtZoom - 2.5
							});

						}
					}

					// 격자
					/*
					if(param["urban_cls_gb"] == $urbanObj.urbanCls_UN){
						var paramForGeo = deepCopy(param);
						paramForGeo.comparison_gb = "GRID";
		    			$urbanMain.ui.reqUrbarsGeometry(paramForGeo, false);
		        	}
		        	*/

		        	// 데이터보드
		    		var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
		    		var indexList =['종합','인구밀도','평균나이','노령화지수','1인가구비율','아파트비율','신규건축물비율','노후건축물비율','녹지비율']
		    		var statisticsList =['면적','인구','가구','주택','사업체','종사자']
		    		var items = $('.tabs li a');

		    		if(selMenuId === "gnb_menu_1"){
		    			//2022 SGIS5 추가
						var year = $('.sinceNew option:selected').val();
		    			$('.tabs li:eq(0)').show();
		    			$('.tabs li:eq(0) > a').trigger('click');
						year ==='2021'? $('.tabs li:eq(4)').hide() : $('.tabs li:eq(4)').show();
						year ==='2021'? $('.tabs li:eq(5)').hide() : $('.tabs li:eq(5)').show();
		    			$('.tabs li:eq(6)').hide();
		    			$('.tabs li:eq(7)').hide();
		    			$('.tabs li:eq(8)').hide();
		    			$('.tabs li:eq(9)').hide();
		    			$urbanDataBoard.ui.clearDataBoardHead();
			        	$urbanDataBoard.ui.setDataBoardHead(param, "A");
			        	$urbanDataBoard.ui.changeDataBoardView("chart2");
			        	$('.orange-btn1').hide();

			        	$("#sec01AreaSize").html($urbanMain.ui.comma((Number(area) / 1000000).toFixed(2)) + " ㎢");
			        	//var locTxt = $(this).closest('.menu-group').find('.menu-toggle').html() + " " + $(this).html();
			        	var locTxt = $(this).html();
			        	$("#sec01AreaTxt").html(locTxt + ' 기준');

			       		 //2022 SGIS5 추가
			        	$.each(items,function(idx,item){
			        		$(item).text(statisticsList[idx])
			        	})
			        	$urbanMain.ui.doInitDatabordClear();
			        	$urbanDataBoard.ui.reqUrbarsStatistics(param, "0", "T");

			        	$('#db01_head_year').html($('.sinceNew :selected').text()+"년");
			        	$('.content_panel .year').html($('.sinceNew :selected').text()+"년");
			        	$('.content_panel .tit').html($('#db01_head_urbars_nm').text());
			        	if($('.subGroupCon .menu-list2 >a.active')){
			        		$('.gps-input').attr('placeholder',$('.subGroupCon .menu-list2 >a.active').text());
			        	}
						$('#popUpBtn').off('click').on('click',function(){
							$urbanMain.ui.doDownPDF('totPopupContent','totContent');
						})

			        	body.on('click','.totDashBtn',function(){
			        		$('.totIndexes_layer').hide();
							
			        		if(!$('.totpopup_layer').hasClass('district')){
			        			$('.popup_con01').css('display','block');
								$('.popup_con02').css('display','none');
			        		}
				        	$('.totpopup_layer').show();
							$('.totpopup_layer .data_content').scrollTop(0);
			        	})
			        	$('.layer_close').on('click',function(){
			        		$('.totpopup_layer').hide();
			        	})
			        	$('.totCloseBtn').on('click',function(){
			        		$('.totpopup_layer').hide();
			        	})
						
		    		}else if(selMenuId === "gnb_menu_3"){
		    			//2022 SGIS5 추가
		    			$('#tab1').empty();
		    			$('.area_img').remove();
		    			$('.tabs li:eq(0)').hide();
		    			$('.tabs li:eq(0)').removeClass('active');
		    			$('.tabs li:eq(1)').addClass('active');
		    			$('.totpopup_layer').removeClass('district');
		    			$('.tabs li:eq(1) > a').trigger('click');
		    			$('.tabs li:eq(6)').show();
		    			$('.tabs li:eq(7)').show();
		    			$('.tabs li:eq(8)').show();
		    			$('.tabs li:eq(9)').show();
		    			$('.orange-btn1').show();
						let urbarType =$('#urban_ty_box_1 li.active').attr('data-urbar-type');
						if(urbarType ==='02'){
							$('.orange-btn1').css({'background-color':'#FFD050','color':'#000'});
						}else{
							$('.orange-btn1').css({'background-color':'','color':''});
						}
		    			$urbanDataBoard.ui.clearDataBoardHead();
		    			$urbanDataBoard.ui.setDataBoardHead(param, "B");
		    			$urbanDataBoard.ui.changeDataBoardView("chk03");
		    			$('.district-btn').hide();
						$('#indexesBtn').off('click').on('click',function(){
							$urbanMain.ui.doDownPDF('layer_indexes','totIndexesContent');
						});
		    			body.on('click','.totDashBtn',function(){
		    				$('.totpopup_layer').hide();
			        		$('.totIndexes_layer').show();
							$('.totIndexes_layer .data_content').scrollTop(0);
			        	})
			        	$('#btn_close').on('click',function(){
			        		$('.totIndexes_layer').hide();
			        	})
			        	$('.totCloseBtn').on('click',function(){
			        		$('.totIndexes_layer').hide();
			        	})
		    			$.each(items,function(idx,item){
			        		$(item).text(indexList[idx])
			        	})
			        	$urbanMain.ui.doInitDatabordClear();
		    			$urbanDataBoard.ui.reqUrbarsIndexes(param, "T");
						$('.totIndexes_layer').removeClass('comparison');
		    			$('.orange-btn1').html($('#db01_head_urbars_nm').text());
		    			$('.totIndexes_layer .content_panel .tit').html($('#db01_head_urbars_nm').text());
		    			$('#db01_head_year').html($('.sinceNew :selected').text()+"년");
		    			$('.content_panel .year').html($('.sinceNew :selected').text()+"년");
		    			$('.totIndexes_layer .content_panel .year').html($('.sinceNew :selected').text()+"년");
		    			if($('.subGroupCon .menu-list2 >a.active')){
			        		$('.gps-input').attr('placeholder',$('.subGroupCon .menu-list2 >a.active').text());
			        	}

		    		}
		        	if(!$('#wrap').hasClass('_extend')){
		        		$('.btn-extend-open').trigger('click');
		        	}

		    		return false;
		        });
			}
	};

}(window, document));