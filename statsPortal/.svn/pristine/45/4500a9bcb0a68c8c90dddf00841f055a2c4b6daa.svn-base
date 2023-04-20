/**
 * 대화형 통계지도 Left 메뉴(조회조건)에 관한 클래스
 *
 * history : 네이버시스템(주), 1.0, 2015/09/08  초기 작성
 * author : 김성현
 * version : 1.0
 * see :
 *
 */
(function(W, D) {
	W.$saSubMenu = W.$saSubMenu || {};

//	$(document).ready(function() {
//		console.log("-0--------------------");
//		$saSubMenu.ui.bndYearSelectbox();		//조사년도 설정
//		$saSubMenu.ui.commonDataList();		//공공데이터, 나의데이터 목록
//		$saSubMenu.ui.getConditionIndustClass();	//산업분류 조회 조건 설정
//		$saSubMenu.ui.getConditionOccupationClass();	//산업분류 조회 조건 설정
//		$saSubMenu.ui.getSidoList("current", "99", "");
//		$saSubMenu.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다.
//		//$(".sideQuick.sq02").click();	//Left 메뉴 오픈
//
//
//		//mng_s leekh 20171018 주요지표
//		if(parseInt($("#mainIndex_year").val()) == 2016){
//			$("#mainIndex_box2").hide();
//			$saSubMenu.ui.companyClassView();
//		}
//		//mng_e leekh 20171018 주요지표
//
//
//		$.cssHooks.backgroundColor = {
//			    get: function(elem) {
//			        if (elem.currentStyle)
//			            var bg = elem.currentStyle["backgroundColor"];
//			        else if (window.getComputedStyle)
//			            var bg = document.defaultView.getComputedStyle(elem,
//			                null).getPropertyValue("background-color");
//			        if (bg.search("rgb") == -1)
//			            return bg;
//			        else {
//			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//			            function hex(x) {
//			                return ("0" + parseInt(x).toString(16)).slice(-2);
//			            }
//			            if(bg != null) {
//			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
//			            } else {
//			            	return "#fff";
//			            }
//			        }
//			    }
//		};
//
//		$.cssHooks.color = {
//			    get: function(elem) {
//			        if (elem.currentStyle)
//			            var bg = elem.currentStyle["color"];
//			        else if (window.getComputedStyle)
//			            var bg = document.defaultView.getComputedStyle(elem,
//			                null).getPropertyValue("color");
//			        if (bg.search("rgb") == -1)
//			            return bg;
//			        else {
//			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//			            function hex(x) {
//			                return ("0" + parseInt(x).toString(16)).slice(-2);
//			            }
//			            if(bg != null) {
//			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
//			            } else {
//			            	return "#fff";
//			            }
//			        }
//			    }
//		};
//
//
//		$("[name='mainIndex_radio']").on('click',(function(e){
//
//			var tmpId = $(this).attr("id").split("mainIndex_radio");
//			console.log('$현재 버튼 => id / value / length / split: ' + $(this).attr("id") + " / " + $(this).attr("value") + "/"+ $("[name='mainIndex_radio']").length + "/" + tmpId[1]);
//
//			$saSubMenu.ui.subConditionNoneAll();
//			$(".stepBox.sub"+tmpId[1]).show();
//
//		}));
//
//	});

	$saSubMenu.ui = {

			searchbtnCnt : 0, // 버튼생성 카운트
			curSelectedStatsType : "population", // 현재 선택된 통계분류(인구, 가구, 사업체통계 등)
			curSelectedDetailStatsType : null, // 현재 선택된 통계상세분류(인구총괄, 인구세부조건검색 등)
			arParamList : [], // 생성된 조회버튼에 매칭된 파라미터 정보배열 ==> maxYear(기준년도) 변경시 DB에서 srv_dt_statbaseyearinfo 년도+1 해주어야함(테이블은 srv_dt_statbaseyearinfo)
			mapColor : ["#0478cb", "#9ED563", "#FF0066"],		//지도 별 고유 색상
			curSearchBtnArray : { "one":"", "two":"", "three":"" },	//지도를 조회한 버튼 아이디
			companyTree : null,						//산업분류 트리
			curSelectedCompanyNode : null,		//산업분류 트리 선택된 노드
			curSelectedThemeNode : null,			//테마업종 트리 선택된 노드
			corpClassNum : 0,		//산업분류 현재 페이지
			sqlListBoxLeft: "0px",	//
			//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 START
			selectSub05ListYn: "N", //임금수준별 최초 선택
			//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 END
			//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
			mainindexStepbox2Idx: "0",
			saSubMenuApiWork02Width : "0",
			saSubMenuKosisDetailDivDefalutLeft : "359",
			saSubMenuWrmSelectionDefalutLeft : "360",
			saSubMenuIndex5DataGubun: "",
			//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

			defaultSidoCd : "99",//기본 시도 코드 : 99:전체
			defaultSggCd : null,//기본 시군구 코드
			atdrcList : {
			    "31" : [{
			    	sgg_nm : "수원시",
			    	sgg_list : ["011","012","013","014"],
			    	adm_cd : "31010",
			    	x_coor : "956359.375",
			    	y_coor : "1920275.125"
			    },{
			    	sgg_nm : "성남시",
			    	sgg_list : ["021","022","023"],
			    	adm_cd : "31020",
		    		x_coor : "966039.3125",
		    		y_coor : "1934316.875"

			    },{
			    	sgg_nm : "안양시",
			    	sgg_list : ["041","042"],
			    	adm_cd : "31040",
		    		x_coor : "949364.4375",
		    		y_coor : "1933882.5"

			    },{
			    	sgg_nm : "부천시",
			    	sgg_list : ["051","052","053"],
			    	adm_cd : "31050",
			    	x_coor : "937137.8125",
			    	y_coor : "1945231.375"

			    },{
			    	sgg_nm : "안산시",
			    	sgg_list : ["091","092"],
			    	adm_cd : "31090",
			    	x_coor : "933248.0625",
			    	y_coor : "1921582.875"

			    },{
			    	sgg_nm : "고양시",
			    	sgg_list : ["101","103","104"],
			    	adm_cd : "31100",
			    	x_coor : "941518.9375",
			    	y_coor : "1963035.75"

			    },{
			    	sgg_nm : "용인시",
			    	sgg_list : ["191","192","193"],
			    	adm_cd : "31190",
			    	x_coor : "975315.75",
			    	y_coor : "1913666.375"

			    }],
			    "33" : [{
			    	sgg_nm : "청주시",
			    	sgg_list : ["041","042","043","044"],
			    	adm_cd : "33040",
			    	x_coor : "999888.5625",
			    	y_coor : "1847713.125"

			    }],
			    "34" : [{
			    	sgg_nm : "천안시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "34010",
			    	x_coor : "973464.0625",
			    	y_coor : "1867364.375"

			    }],
			    "35" : [{
			    	sgg_nm : "전주시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "35010",
			    	x_coor : "965298.4375",
			    	y_coor : "1759150.375"

			    }],
			    "37" : [{
			    	sgg_nm : "포항시",
			    	sgg_list : ["011","012"],
			    	adm_cd : "37010",
			    	x_coor : "1162554.625",
			    	y_coor : "1789932.875"

			    }],
			    "38" : [{
			    	sgg_nm : "창원시",
			    	sgg_list : ["111","112","113","114","115"],
			    	adm_cd : "38110",
			    	x_coor : "1100137",
			    	y_coor : "1690127.875"

			    }]
			},

			// 주석 - 2019.01.02	ywKim	변경: 불필요한 코드
//			isInnerMapShow2: false, //mng_s 그리드 메뉴일 경우 레프트메뉴 하이드시 사용
//			isInnerMapShow3: false, //mng_s 행정구역 그리드 메뉴일 경우 레프트메뉴 하이드시 사용

			/**
			 * @name         : 화면 띄우기
			 * @description  :
			 * @date         : 2018.10.24
			 * @author	     : ywKim
			 * @history 	 :
			 * 		2018.10.24	ywKim	신규
			 * @param
			 */
			show : function() {
				$saSubMenu.ui.layoutDetailMenu("-1");	// 2019.01.09	ywKim	변경: 함수사용
//				$("#saSubMenu #kosisDetailDiv").css("width", "280px");

				$saSubMenu.ui.setDetailStatsPanel("mainIndex");
				$saSubMenu.ui.init();
			},
			/**
			 * @name         : 화면 닫기
			 * @description  :
			 * @date         : 2018.10.24
			 * @author	     : ywKim
			 * @history 	 :
			 * 		2018.10.24	ywKim	신규
			 * @param
			 */
			hide : function() {
				$(".quickBox.step03").stop().animate({"left":"-560px"},200);
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
				$(".quickBox.step02").stop().animate({"left":"-560px"},200);
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
			},
			/**
			 * @name         : 화면 닫기
			 * @description  : 기존 소스에서 ready() 에 있던 코드들
			 * @date         : 2018.10.24
			 * @author	     : ywKim
			 * @history 	 :
			 * 		2018.10.24	ywKim	신규
			 * @param
			 */
			init : function() {
				console.log("-0--------------------");
				$saSubMenu.ui.bndYearSelectbox();		//조사년도 설정
//				$saSubMenu.ui.commonDataList();		//공공데이터, 나의데이터 목록 // 현재 이 메뉴에서 사용안함 - 2018.10.24	ywKim	변경: 주석
				$saSubMenu.ui.getConditionIndustClass();	//산업분류 조회 조건 설정
				$saSubMenu.ui.getConditionOccupationClass();	//산업분류 조회 조건 설정
				//2019-06-10 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
				if(gv_url == "statusAnls" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "" && gv_sgg_cd != "") {
					$saSubMenu.ui.getSidoList("current", gv_sido_cd, gv_sgg_cd);
				}
				else if(gv_url == "statusAnls" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "") {
					$saSubMenu.ui.getSidoList("current", gv_sido_cd, "");
				}
				else {
					$saSubMenu.ui.getSidoList("current", "99", "");
				}
				if(gv_url == "statusAnls" && (gv_type == "full" || gv_type == "lnb")) {
					for(var i=0; i<$saMap.ui.mapList.length; i++) {
						var map = $saMap.ui.mapList[i];
						var coord_x, coord_y, zoom;
						if (i==0) {
							zoom = 5;
							if(gv_sido_cd != "") {
								coord_x = $("#current-sido-select option:selected").data("coor-x");
								coord_y = $("#current-sido-select option:selected").data("coor-y");
							}
							if(gv_sido_cd != "" && gv_sgg_cd != "") {
								coord_x = $("#current-sgg-select option:selected").data("coor-x");
								coord_y = $("#current-sgg-select option:selected").data("coor-y");
							}
							if(gv_coord_x != "") {
								coord_x = gv_coord_x;
							}
							if(gv_coord_y != "") {
								coord_y = gv_coord_y;
							}
							if(gv_zoom != "") {
								zoom = gv_zoom;
							}
							try{
								if(coord_x != undefined && coord_y != undefined) {
									map.mapMove([coord_x, coord_y], zoom);
								}
							} catch(e) { }
						}
					}
				}
				//2019-06-10 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
//				$saSubMenu.event.setUIEvent();	//UI에 사용되는 이벤트를 설정한다. // 2018.10.24	ywKim	변경: 이동
				//$(".sideQuick.sq02").click();	//Left 메뉴 오픈

				// 선택값 초기화 - 2018.11.07	ywKim	추가
				$("#recentRegDt").click();	// 2020.04.24[한광희] 월평균자료 조회 기능 추가에 따른 초기화
				$("#saSubMenu .dbTypeCk.mt10").find("input:radio[name='mainIndex_radio']").prop("checked", false);
				$("#saSubMenu .dbTypeCk.mt10").find("input:radio[name='mainIndex_radio']").removeAttr("checked");
				$("#saSubMenu .dbTypeCk.mt10").find("label.on").removeClass("on");
				$("#saSubMenu .dbTypeCk.mt20").find("label").eq(0).click();
				//2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START
				$("#saSubMenu #current-term-select").val("0D");
				//2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END
				$("#saSubMenu .radioStepBox.validationStepBox").find("label").eq(0).click();
				$("#saSubMenu .stepBox.sub01").css('display', 'none');
				$("#saSubMenu .stepBox.sub02").css('display', 'none');
				$("#saSubMenu .stepBox.sub03").css('display', 'none');
				$("#saSubMenu .stepBox.sub04").css('display', 'none');
				$("#saSubMenu .stepBox.sub05").css('display', 'none');
				$("#saSubMenu .stepBox.sub06").css('display', 'none');
				$("#saSubMenu .stepBox.sub07").css('display', 'none');
				$("#saSubMenu .stepBox.sub01").find("label.on").removeClass("on");
				$("#saSubMenu .stepBox.sub02").find("label.on").removeClass("on");
				$("#saSubMenu .stepBox.sub03").find("label.on").removeClass("on");
				$("#saSubMenu .stepBox.sub04").find("label.on").removeClass("on");
				$("#saSubMenu .stepBox.sub05").find("label.on").removeClass("on");
				$("#saSubMenu .stepBox.sub06").find("label.on").removeClass("on");
				$("#saSubMenu .stepBox.sub07").find("label.on").removeClass("on");
				$("#saSubMenu .stepBox.sub01").find("input:checkbox[name='INDCLA']").prop("checked", false);
				$("#saSubMenu .stepBox.sub01").find("input:checkbox[name='INDCLA']").removeAttr("checked");
				$("#saSubMenu .stepBox.sub02").find("input:checkbox[name='RCRJSS']").prop("checked", false);
				$("#saSubMenu .stepBox.sub02").find("input:checkbox[name='RCRJSS']").removeAttr("checked");
				$("#saSubMenu .stepBox.sub03").find("input:checkbox[name='ENTTYP']").prop("checked", false);
				$("#saSubMenu .stepBox.sub03").find("input:checkbox[name='ENTTYP']").removeAttr("checked");
				$("#saSubMenu .stepBox.sub04").find("input:checkbox[name='EMPTYP']").prop("checked", false);
				$("#saSubMenu .stepBox.sub04").find("input:checkbox[name='EMPTYP']").removeAttr("checked");
				$("#saSubMenu .stepBox.sub05").find("input:checkbox[name='WAGETY']").prop("checked", false);
				$("#saSubMenu .stepBox.sub05").find("input:checkbox[name='WAGETY']").removeAttr("checked");
				$("#saSubMenu .stepBox.sub06").find("input:checkbox[name='ACDMCR']").prop("checked", false);
				$("#saSubMenu .stepBox.sub06").find("input:checkbox[name='ACDMCR']").removeAttr("checked");
				$("#saSubMenu .stepBox.sub07").find("input:checkbox[name='CAREER']").prop("checked", false);
				$("#saSubMenu .stepBox.sub07").find("input:checkbox[name='CAREER']").removeAttr("checked");
				$("#saSubMenu .stepBox.sub05").find("#current-salary-select-1").val("");
				$("#saSubMenu .stepBox.sub05").find("#current-salary-select-2").val("");
				$("#saSubMenu .stepBox.sub05").find("#current-salary-select-3").val("");
				$("#saSubMenu .stepBox.sub05").find("#current-salary-select-4").val("");
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
				$("#saSubMenu .mainIndex_stepBox2 input[name='mainIndex_check']").each(function() {
					var lvTempLi = $(this).parent();
					var lvTempInput = $(this);
					lvTempLi.removeClass("M_on");
					lvTempLi.removeClass("M_on2");
					lvTempInput.removeAttr("checked");
				});
				// 전역 선택 너비 세팅
	        	$saSubMenu.ui.saSubMenuApiWork02Width = "0";
	        	// 우측 분석조건 선택 접기
	        	$("#saSubMenu #API_WORK-02 .IndexSelect2 div[class^=index]").each(function(){
	        		$(this).hide();
	        	});
	        	$("#quickBox_2depth").css("width","280px");
	        	// 닫기 아이콘 (<) 위치 처리
	        	var lvStep03Left = Number($saSubMenu.ui.saSubMenuKosisDetailDivDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width);
	        	if(gv_type == "full") {
	        		lvStep03Left += -80;
	        	}
				$(".quickBox.step03").stop().animate({"left":lvStep03Left+"px"},0);
				// 선택항목 위치
				var lvWrmSelectionLeft2 = Number($saSubMenu.ui.saSubMenuWrmSelectionDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width);
        		$("#wrmSelection").stop().animate({"left":lvWrmSelectionLeft2+"px"}, 0);
				$("#saSubMenu #API_WORK-02 .IndexSelect2 .indexData label"
					/*"#saSubMenu #API_WORK-02 .IndexSelect2 .index1 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index2 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index3 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index4 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index6 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index7 .indexData label"*/
				).each(function() {
					var lvTempLi = $(this).parent();
					var lvTempInput = $(this).prev();
					var lvTempLabel = $(this);
					var lvTempDataName = lvTempInput.attr("name");
					var lvTempDataValue = lvTempInput.val();

					if(lvTempDataValue == "ALL" || lvTempDataValue.indexOf("WGTY_") >= 0){
						lvTempLabel.addClass("on");
						lvTempInput.attr("checked", "checked");
					} else{
						lvTempLabel.removeClass("on");
						lvTempInput.removeAttr("checked");
					}
				});
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
				// 세부항목 전체 설정 초기화 : 본 화면에서 중메뉴를 클릭한 경우 - 2019.01.09	ywKim	추가
				$("#saSubMenu .stepBox #saRdAll_01").next().removeAttr("data-NotFirstSet");
				$("#saSubMenu .stepBox #saRdAll_02").next().removeAttr("data-NotFirstSet");
				$("#saSubMenu .stepBox #saRdAll_03").next().removeAttr("data-NotFirstSet");
				$("#saSubMenu .stepBox #saRdAll_04").next().removeAttr("data-NotFirstSet");
				$("#saSubMenu .stepBox #saRdAll_06").next().removeAttr("data-NotFirstSet");
				$("#saSubMenu .stepBox #saRdAll_07").next().removeAttr("data-NotFirstSet");

				//20190318 손원웅 추가_슬라이드 초기화
				//2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START
				$("#slider-range5").slider("values", 0, 3);	// 1일
				$("#slider-range5").slider("values", 1, 4);	// 오늘
				//2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END

				//mng_s leekh 20171018 주요지표
				if(parseInt($("#mainIndex_year").val()) == 2016){
					$("#mainIndex_box2").hide();
					$saSubMenu.ui.companyClassView();
				}
				//mng_e leekh 20171018 주요지표


				$.cssHooks.backgroundColor = {
					    get: function(elem) {
					        if (elem.currentStyle)
					            var bg = elem.currentStyle["backgroundColor"];
					        else if (window.getComputedStyle)
					            var bg = document.defaultView.getComputedStyle(elem,
					                null).getPropertyValue("background-color");
					        if (bg.search("rgb") == -1)
					            return bg;
					        else {
					            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					            function hex(x) {
					                return ("0" + parseInt(x).toString(16)).slice(-2);
					            }
					            if(bg != null) {
					            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
					            } else {
					            	return "#fff";
					            }
					        }
					    }
				};

				$.cssHooks.color = {
					    get: function(elem) {
					        if (elem.currentStyle)
					            var bg = elem.currentStyle["color"];
					        else if (window.getComputedStyle)
					            var bg = document.defaultView.getComputedStyle(elem,
					                null).getPropertyValue("color");
					        if (bg.search("rgb") == -1)
					            return bg;
					        else {
					            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					            function hex(x) {
					                return ("0" + parseInt(x).toString(16)).slice(-2);
					            }
					            if(bg != null) {
					            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
					            } else {
					            	return "#fff";
					            }
					        }
					    }
				};


				$("[name='mainIndex_radio']").on('click',(function(e){

					var tmpId = $saSubMenu.ui.getAnlsCondIndex();
					console.log('$현재 버튼 => id / value / length / split: ' + $(this).attr("id") + " / " + $(this).attr("value") + "/"+ $("[name='mainIndex_radio']").length + "/" + tmpId);

					$saSubMenu.ui.layoutDetailMenu(tmpId);	// 2019.01.09	ywKim	변경: 함수사용

					$saSubMenu.ui.subConditionNoneAll();
					$("#saSubMenu .stepBox.sub"+tmpId).show();

					// 2018.01.02	ywKim	추가 [상세조건선택에서 "전체"선택기능 추가]
					if ($("#saSubMenu .stepBox #saRdAll_"+tmpId).next().attr("data-NotFirstSet") == undefined) {
						$("#saSubMenu .stepBox #saRdAll_"+tmpId).next().attr("data-NotFirstSet", "Y");	// 최초 한번만 자동 "전체" 선택할 수 있도록 함.
						$("#saSubMenu .stepBox #saRdAll_"+tmpId).next().click();
					}
				}));

			},
			/**
			 *
			 * @name         : layoutDetailMenu
			 * @description  : 세부항목 메뉴를 활성화/비활성화한다.
			 * @date         : 2019.01.09
			 * @author	     : ywKim
			 * @history 	 :
			 */
			layoutDetailMenu: function(pAnlsCondIndex) {
				var tmpId = (pAnlsCondIndex != undefined) ? pAnlsCondIndex : $saSubMenu.ui.getAnlsCondIndex();

				if (tmpId == "01" || tmpId == "02" || tmpId == "03") {// 업종별,직종별,기업형태별 옵션에서는 상세조건 너비를 2배로 - 2018.11.20	ywKim	변경
					$("#saSubMenu #kosisDetailDiv").css("width", "560px");
					$("#saSubMenu #saMenuAutoClose").css("display", "block");
					$workRoad.ui.setM3_SubMenu2Width(true);
					$workRoad.ui.setCoordX(2);
				} else if (tmpId == "-1") {// 처음 로딩시 세부항목 숨기기
					$("#saSubMenu #kosisDetailDiv").css("width", "0px");
					$("#saSubMenu #saMenuAutoClose").css("display", "none");
					$workRoad.ui.setM3_SubMenu2Width(false);
					$workRoad.ui.setCoordX(12);
				}
				//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 START
				else if (tmpId == "05") { //임금수준별
					// 처음한번 임금 목록 생성
					if($saSubMenu.ui.selectSub05ListYn == "N") {
						$saSubMenu.ui.selectSub05ListYn = "Y";
						var lvUl = $("#saSubMenu .stepBox.sub05 ul.dbTypeCk");
						//임금 리스트
						var lvDataList = [];
						//임금 목록 조회 (리스트에 담음)
						$.ajax({
							type: "POST",
							url: contextPath + "/ServiceAPI/workRoad/selectCommonCode.json",
							async: false,
							dataType: "json",
							data: {b_class_cd : "WAGETY"},
							success: function(res) {
								if (res.errCd == 0) {
									var dataList = res.result.dataList;
									for(var i = 0; i < dataList.length; i++) {
										//임금 리스트에 담음
										lvDataList.push({
											cd : "WAGETY_"+dataList[i].cd,
											exp : dataList[i].exp,
											nm : dataList[i].nm
										});
										//임금 세부 목록 조회 (리스트에 담음)
										$.ajax({
											type: "POST",
											url: contextPath + "/ServiceAPI/workRoad/selectCommonCode.json",
											async: false,
											dataType: "json",
											data: {b_class_cd : "WGTY_"+dataList[i].cd},
											success: function(res2) {
												if (res2.errCd == 0) {
													var dataList2 = res2.result.dataList;
													for(var j = 0; j < dataList2.length; j++) {
														//임금 리스트에 담음
														lvDataList.push({
															cd : "WGTY_"+dataList[i].cd+"_"+dataList2[j].cd,
															exp : dataList2[j].exp,
															nm : "　　"+dataList2[j].nm
														});
													}
												} else {
													alert('failed!');
												}
											} ,
											error:function(err2) {
												alert(err.responseText);
											}
										});
									}
								} else {
									alert('failed!');
								}
							} ,
							error:function(err) {
								alert(err.responseText);
							}
						});
						//임금 리스트로 체크 박스 생성
						for(var i = 0 ; i < lvDataList.length; i++) {
							var lvTempLi = $("<li/>");
							var lvTempInput = $("<input/>");
							var lvTempLabel = $("<label/>");

							var text = lvDataList[i].nm;
							if (lvDataList[i].cnt != 'undefined' && lvDataList[i].cnt > 0) {
								text += " (" + $workRoad.util.addComma(lvDataList[i].cnt) + "건)";
							}
							lvTempLabel.text(text);

							lvTempLabel.attr("data-subj", lvDataList[i].nm);
							lvTempLabel.attr("title", lvDataList[i].exp);

							lvTempInput.attr("type", "checkbox");
							lvTempInput.attr("name", "WAGETY2");
							lvTempInput.attr("id", "rd_wagety2_" + (i+1));
							lvTempInput.val(lvDataList[i].cd);

							lvTempLabel.attr("name", "WAGETY2");
							lvTempLabel.attr("for", "rd_wagety2_" + (i + 1));
							if(lvDataList[i].cd.indexOf("WGTY_") >= 0) {
								lvTempLabel.addClass("on");
								lvTempInput.attr("checked", "checked");
								lvTempLi.hide();
							}
							if(i < (lvDataList.length-1)) {
								if(lvDataList[i].cd.indexOf("WAGETY_") < 0 && lvDataList[i+1].cd.indexOf("WGTY_") >= 0) {
									lvTempLi.css("border-bottom-width","0px");
								}
							}

							$(lvTempLi).append(lvTempInput);
							$(lvTempLi).append(lvTempLabel);
							lvUl.append(lvTempLi);
						}
					}
					// 처음한번 아닌 경우 임금 목록 초기화
					else {
						$("input[name='WAGETY2']").each(function() {
							var lvTempLi = $(this).parent();
							var lvTempInput = $(this);
							var lvTempLabel = $(this).next();
							var lvTempValue = lvTempInput.val();
							if(lvTempValue.indexOf("WGTY_") >= 0) {
								lvTempLabel.addClass("on");
								lvTempInput.attr("checked", "checked");
								lvTempLi.hide();
							} else {
								lvTempLi.css("border-bottom-width","");
							}
						});
					}
					$("#saSubMenu #kosisDetailDiv").css("width", "280px");
					$("#saSubMenu #saMenuAutoClose").css("display", "block");
					$workRoad.ui.setM3_SubMenu2Width(false);
					$workRoad.ui.setCoordX(2);
				}
				//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 END
				else {
					$("#saSubMenu #kosisDetailDiv").css("width", "280px");
					$("#saSubMenu #saMenuAutoClose").css("display", "block");
					$workRoad.ui.setM3_SubMenu2Width(false);
					$workRoad.ui.setCoordX(2);
				}

				$("#wrmSelection").stop().animate({"left":$("#mCSB_18_container").width()+"px"}, 0); //20200406 이금은

				$wrmStatusAnls.ui.layout();
			},
			/**
			 *
			 * @name         : getAnlsCondIndex
			 * @description  : 분석조건 선택 목록에서 선택된 항목(단건)의 아이디 인덱스 구하기 (01, 02, 03, ...)
			 * @date         : 2019.01.09
			 * @author	     : ywKim
			 * @history 	 :
			 */
			getAnlsCondIndex: function() {
				var $that = $("[name='mainIndex_radio']:checked");

				if ($that.length > 0) {
					var idArr = $that.attr("id").split("mainIndex_radio");
					if (idArr.length == 2) {
						return idArr[1];
					} else {
						return -1;
					}
				} else {
					return -1;
				}
			},
			/**
			 *
			 * @name         : showNumberClick
			 * @description  : 통계값 표출
			 * @date         : 2018.11.29
			 * @author	     : ywKim
			 * @history 	 :
			 */
			showNumberClick : function() {
				var map_id = $saMap.ui.curMapId;
				var legend = $saMap.ui.mapList[map_id].legend;

				legend.showNumberData();
			},
			/**
			 * @name         : isMenuAutoClose
			 * @description  : 검색조건 생성시 메뉴를 자동으로 닫을지 여부
			 * @date         : 2018.11.05
			 * @author	     : ywKim
			 * @history 	 :
			 */
			isMenuAutoClose : function() {
				var ck = $('#saMenuAutoClose').find("input").is(':checked');
				return ck;
			},
			/**
			 * @name         : toggleMenuAutoClose
			 * @description  : 메뉴 자동닫기 버튼 토글 기능
			 * @date         : 2018.11.05
			 * @author	     : ywKim
			 * @history 	 :
			 */
			toggleMenuAutoClose : function() {
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
				$this = $('#saMenuAutoClose label');
				$this2 = $('#saMenuAutoClose2 label');
	        	var ck = $this.hasClass("on");

	        	$this.parent().find("label").removeClass("on");
	        	$this.parent().find("input").removeAttr("checked");
	        	$this2.parent().find("label").removeClass("on");
	        	$this2.parent().find("input").removeAttr("checked");

				if(!ck){
					$this.addClass("on");
					$this2.addClass("on");
				}else{
					$this.removeClass("on");
					$this2.removeClass("on");
				}

				$this.parent().find("input").prop("checked", !ck);
				$this2.parent().find("input").prop("checked", !ck);
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
	        },

			/**
			 * @name         : getSidoList
			 * @description  : 지역선택 - 시도 선택시 시군구 목록 조회
			 * @date         : 2016. 11. 28.
			 * @author	     : 송종대
			 * @history 	 :
			 * @param type
			 * @param defaultSido
			 * @param defaultSgg
			 * @param callback
			 */
			getSidoList: function(type,defaultSido,defaultSgg,callback) {
				$("#saSubMenu #"+type+"-sido-select, #saSubMenu #"+type+"-sgg-select").prop("disabled",true);
				$.ajax({
					method: "POST",
					//2019-06-10 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
					async: false,
					//2019-06-10 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. STOP
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
					data: {
						base_year: $saMap.ui.mapList[0].bnd_year
					},
					dataType: "json",
					success: function(res) {
						$("#saSubMenu  #"+type+"-sido-select").empty();
						$("#saSubMenu  #"+type+"-sgg-select").html('<option value="999">전체</option>');// 시군구 콤보 초기화 - 2018.11.07	ywKim	추가
						if(res.errCd=="0"){
							$("#saSubMenu #"+type+"-sido-select").append($("<option/>",{text:"전체",value:"99","data-coor-x":"","data-coor-y":""}));
							$.each(res.result.sidoList,function(cnt,node){
								if(defaultSido==node.sido_cd){
									$saSubMenu.ui.getSggList(type, node.sido_cd, defaultSgg);
								}
								$("#saSubMenu #"+type+"-sido-select").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
							});
						}

						$("#saSubMenu #"+type+"-sido-select, #saSubMenu #"+type+"-sgg-select").prop("disabled",false);
						//2019-06-21 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
						if(gv_url == "statusAnls" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "" && gv_sido_cd != "99") {
							// 시도 콤보박스 disable 처리
							//$("#saSubMenu #"+type+"-sido-select").css("background","#EEEEEE !important"); //이미 background-color가 !important로 선언된게 있어서 Chrome에서 동작안함.
							var lvTempStyle = $("#saSubMenu #"+type+"-sido-select").attr("style");
							if(lvTempStyle == undefined) lvTempStyle = "";
							$("#saSubMenu #"+type+"-sido-select").attr("style","background-color:#EEEEEE !important;"+lvTempStyle);
							$("#saSubMenu #"+type+"-sido-select").prop("disabled",true);
							$("#saSubMenu #"+type+"-sido-select").css("cursor","auto");
						}
						//2019-06-21 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
						if(typeof callback === "function"){
							callback();
						}
					},
					error: function(e) {
						$("#saSubMenu #"+type+"-sido-select, #saSubMenu #"+type+"-sgg-select").prop("disabled",false);
					}
				});
			},

			/**
			 * @name             : $houseAnalysisMap.leftmenu.getSggList
			 * @description      : 시군구리스트
			 * @date             : 2015. 12. 09.
			 * @author           : 나광흠
			 * @history          :
			 * @param type       : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역
			 * @param sido_cd    : 시도 코드
			 * @param defaultSgg : 처음 셋팅해줄 시군구 코드
			 * @param callback   : callback
			 */
			getSggList: function(type,sido_cd,defaultSgg,callback) {
				//$("#saSubMenu #"+type+"-sgg-select").prop("disabled",true);
				$.ajax({
					method: "POST",
					//2019-06-10 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
					async: false,
					//2019-06-10 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. STOP
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
					data: {
						sido_cd: sido_cd,
						base_year: $saMap.ui.mapList[0].bnd_year
					},
					dataType: "json",
					success: function(res) {
						$("#saSubMenu #"+type+"-sgg-select").empty();
						if(res.errCd=="0"){
							var coorX = $("#saSubMenu #current-sido-select option:selected").data("coor-x");
							var coorY = $("#saSubMenu #current-sido-select option:selected").data("coor-y");
							$("#saSubMenu #"+type+"-sgg-select").append($("<option/>",{text:"전체",value:"999","data-coor-x":coorX,"data-coor-y":coorY, "data-adm_cd":sido_cd}));  // 2017-08-17 [개발팀] 전체일 때 data-adm_cd 값 추가
							$.each(res.result.sggList,function(cnt,node){
								//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
								$("#saSubMenu #"+type+"-sgg-select").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor,"data-adm_cd":sido_cd+node.sgg_cd}));
							});
							/* mng_s 20200611 이금은
							if("policy"==type || "current" == type){ //2017.05.29 [개발팀] 지역별 수요변화 비자치구추가
								if($saSubMenu.ui.atdrcList[sido_cd]){
									$.each($saSubMenu.ui.atdrcList[sido_cd],function(sidoCnt,sidoNode){
										var op,index,empty = true;
										$.each(this.sgg_list,function(cnt,node){
											op = $("#saSubMenu #"+type+"-sgg-select option[value="+node+"]");
											if(op.length>0){
												empty = false;
												if(index==undefined){
													index = op.index();
												}else{
													index = Math.min(index,op.index());
												}
											}
										});
										if(!empty){
											//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
											$("#saSubMenu #"+type+"-sgg-select option:eq("+index+")").before($("<option/>",{text:sidoNode.sgg_nm,value:sidoNode.sgg_list.join(","),"data-coor-x":op.data("coor-x"),"data-coor-y":op.data("coor-y"), "data-adm_cd":sidoNode.adm_cd}));
										}
									});
								}
							}
							mng_e 20200611 이금은 */

						}else if(res.errCd=="-401"){
							accessTokenInfo(function() {
								$saSubMenu.ui.getSggList(type,sido_cd,defaultSgg);
							});
						}
						$("#saSubMenu #"+type+"-sgg-select").prop("disabled",false);
						if(typeof callback === "function"){
							callback();
						}
					},
					error: function(e) {
						$("#saSubMenu #"+type+"-sgg-select").prop("disabled",false);
					}
				});
			},
			/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 START */
			/** 2020.04.22[한광희] 월평균자료 조회 기능 추가 START */
			/**
			 * @name         : getRegDtYearList
			 * @description  : 조회기간(연도) 조회
			 * @date         : 2020. 04. 22.
			 * @author	     : 한광희
			 * @history 	 :
			 * @param type,  defaultYear, defaultMonth,  callback
			 */
			getRegDtYearList: function(type,defaultYear,defaultMonth,callback) {
				$("#saSubMenu  #"+type+"-year-select").empty();	// 연도 초기화

				$.ajax({
					type: "POST",
					url: contextPath + "/ServiceAPI/workRoad/statusAnls/getStatusAnlsMnbyRegYearList.json",
					async: false,
					dataType: "json",
					data: {},
					success: function(res) {
						if (res.errCd == 0) {
							$.each(res.result, function(i, v){
								$("#saSubMenu #"+type+"-year-select").append($("<option/>",{text:v.reg_year,value:v.reg_year}));
								if (i == 0) {
									$saSubMenu.ui.getRegDtMonthList(type, v.reg_year, defaultMonth);
								}
							});
						} else {
							alert('failed!');
						}
					} ,
					error:function(err) {
						alert(err.responseText);
					}
				});

			},
			/**
			 * @name             : getRegDtMonthList
			 * @description      : 조회기간(월)리스트
			 * @date             : 2020. 04. 22.
			 * @author           : 한광희
			 * @history          :
			 * @param type, reg_dt_year, defaultMonth, callback
			 */
			getRegDtMonthList: function(type,reg_dt_year,defaultMonth,callback) {
				$("#saSubMenu  #"+type+"-month-select").empty();
				var searchRegYear = $("#saSubMenu #"+type+"-year-select").val();
				$.ajax({
					type: "POST",
					url: contextPath + "/ServiceAPI/workRoad/statusAnls/getStatusAnlsMnbyRegMonthList.json",
					async: false,
					dataType: "json",
					data: {searchRegYear: searchRegYear},
					success: function(res) {
						if (res.errCd == 0) {
							$.each(res.result, function(i, v){
								$("#saSubMenu #"+type+"-month-select").append($("<option/>",{text:v.reg_month,value:v.reg_month,"data-reg_dt":reg_dt_year+v.reg_month}));
							});
						} else {
							alert('failed!');
						}
					} ,
					error:function(err) {
						alert(err.responseText);
					}
				});
			},
			/** 2020.04.22[한광희] 월평균자료 조회 기능 추가 END */
			/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 END */
			/**
			 *
			 * @name         : getConditionIndustClass
			 * @description  : 산업분류 조건 조회
			 * @date         : 2018. 10. 01
			 * @author	     : 현재훈
			 * @param 		 :
			 * @history 	 :
			 */
			getConditionIndustClass : function() {
				var param = [];
				var b_class_cd = "INDCLA";
				var url = contextPath + "/ServiceAPI/workRoad/statusAnls/selectCommonCode.json";

				var sopPortalIndustClassSearchObj = new sop.portal.sa.workIndustClassData.api();
				sopPortalIndustClassSearchObj.addParam("b_class_cd", b_class_cd);

				param.push({
					key : "b_class_cd",
					value : b_class_cd
				});
				sopPortalIndustClassSearchObj.request({
					method : "POST",
					async : true,
					url : url,
					options : {
						params : param,
						url : url,
					}
				});
			},

			/**
			 *
			 * @name         : getConditionOccupationClass
			 * @description  : 직종 조건 조회
			 * @date         : 2018. 10. 01
			 * @author	     : 현재훈
			 * @param 		 :
			 * @history 	 :
			 */
			getConditionOccupationClass : function() {
				var param = [];
				var b_class_cd = "RCRJSS";
				var url = contextPath + "/ServiceAPI/workRoad/statusAnls/selectCommonCode.json";

				var sopPortalIndustClassSearchObj = new sop.portal.sa.workIndustClassData.api();
				sopPortalIndustClassSearchObj.addParam("b_class_cd", b_class_cd);
				param.push({
					key : "b_class_cd",
					value : b_class_cd
				});
				sopPortalIndustClassSearchObj.request({
					method : "POST",
					async : true,
					url : url,
					options : {
						params : param,
						url : url,
					}
				});
			},

			/**
			 *
			 * @name         : subConditionNoneAll
			 * @description  : 상세조회 조건 초기화
			 * @date         : 2018. 10. 01
			 * @author	     : 현재훈
			 * @history 	 :
			 */
			subConditionNoneAll : function() {
				var objectCnt = $("[name='mainIndex_radio']").length;
				for(var i=1; i<=objectCnt; i++){
					$(".stepBox.sub0"+i).hide();
				}
			},

			/**
			 *
			 * @name         : addSearchBtn
			 * @description  : 조건검색버튼을 생성한다.
			 * @date         : 2015. 10. 01.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			addSearchBtn : function() {


				//조회버튼은 최대 10개만 가능
				//alert("else if" + this.curSelectedStatsType + "/" + this.curSelectedDetailStatsType);
				/*if(this.btnLimitCnt()) {
					//KOSIS일 경우
					if (this.curSelectedStatsType == "kosis") {
						if(saMapEtc.curSelectNodeCheck == false) {
							messageAlert.open("알림", "항목을 선택하여 주세요.");
							return false;
						} else {

							saMapEtc.checkSubMenu(saMapEtc.curSelectNode);
						}
					}*/


				//일반 버튼일 경우 파라미터 유효성 검사(this.curSelectedStatsType=>mainIndex, this.curSelectedDetailStatsType=>API_WORK_URL)
				if(this.btnValidationCheck(this.curSelectedStatsType, this.curSelectedDetailStatsType)) {
					console.log("else if" + this.curSelectedStatsType + "/" + this.curSelectedDetailStatsType);

					// 2018.11.05	ywKim	추가
					if ($saSubMenu.ui.isMenuAutoClose()) {
						$workRoad.ui.setCoordX(0);
						$saSubMenu.ui.hide(); /* 2018.10.24	ywKim	추가 */
					} else {
						$workRoad.ui.setCoordX(2);
					}

					var api_id = this.setParams(this.curSelectedStatsType, this.curSelectedDetailStatsType); // 선택된 패널의 파라미터 세팅
					this.createSearchBtn(api_id, "0"); // 버튼생성
					this.searchbtnCnt++;
					$saMapApi.request.openApiStatBaseYearProcess();	//통계별 최신년도 가져오기
					$saSubMenu.event.stepCloseAnimate(1, "check");
					if(!$('#saSubMenu #saMenuAutoClose2 label').hasClass("on")){
						$(".quickBox .bottom > a.stepClose").addClass("on");
					}
				}

			},

			/**
			 *
			 * @name         : btnLimitCnt
			 * @description  : 버튼갯수
			 * @date         : 2015. 10. 23.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			btnLimitCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
				if(cnt > 9) {
					messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
					return false;
				}
				return true;
			},

			/**
			 *
			 * @name         : getBtnCnt
			 * @description  : 버튼갯수
			 * @date         : 2015. 10. 01.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			getBtnCnt : function() {
				var cnt = $("#searchBtnResultRgn").find("li:visible").length;
			},

			/**
			 *
			 * @name         : createSearchBtn
			 * @description  : 조건버튼을 실제로 생성한다.(버튼 타이틀생성/버튼생성)
			 * @date         : 2015. 10. 01.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 * @params atdrc_yn : 자치구여부(kosis만 해당)
			 */
			createSearchBtn : function(curSelectedStatsType, atdrc_yn) {
				console.log("createSearchBtn start ... ");
				// 버튼타이틀생성
				var btnTitle = null;
				var unit = null;
				var showData = null;
				//2019-01-15 선택항목 및 지도에 년도 나오는거 날짜로 표시되게 변경.
				var today = null;
				var term = null;
				var termName = null;
				var year = null; //9월 서비스
				var regDtMonth = null;	// 2020.04.23[한광희] 월평균자료 조회 기능 추가

//				//통계버튼 보이기
//				var sq03 = $(".sideQuick.sq03");
//				if(!sq03.hasClass("on")){
//					$(".sideQuick.sq03").click();
//				}//else{ // 2018.10.24	ywKim	주석
//					//2017.07.07 추가
////					$(".sideQuick.sq03").removeClass("on");
////					$(".sideQuick.sq03").click();
////				}

				for (var i = 0; i < this.arParamList.length; i++) {
					console.log("for");
					if (this.arParamList[i].idx == this.searchbtnCnt) {
						var names = this.arParamList[i].names;
						if (Object.prototype.toString.call(names) === "[object Array]") {
							btnTitle = names.join(" + ");
						}else {
							btnTitle = names;
						}
						//9월 서비스
						for(var j=0; j<this.arParamList[i].params.length; j++) {
							var key = this.arParamList[i].params[j].key;
							if (key == "year") {
								year = this.arParamList[i].params[j].value;
							}
							//2019-01-15 선택항목 및 지도에 년도 나오는거 날짜로 표시되게 변경.
							else if (key == "today") {
								today = this.arParamList[i].params[j].value;
							}
							else if (key == "term") {
								term = this.arParamList[i].params[j].value;
								termName = $("#current-term-select option[value='"+term+"']").text();
							}
							/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 START */
							else if(key == "regDtMonth") {
								regDtMonth = this.arParamList[i].params[j].value;
							}
							/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 END */
						}
						unit = this.arParamList[i].unit;
						showData = this.arParamList[i].filterParam;
						this.arParamList[i]["title"] = btnTitle;
						this.arParamList[i]["year"] = year;
						break;
					}
				}

				//사업체 apiid 분기
				var curSelectedDetailStatsType = curSelectedStatsType.substring(0,8);
				var tmpTitle = "";

				var tmpParam = "";
				for(var i = 0; i < $saSubMenu.ui.arParamList.length; i ++) {
					if($saSubMenu.ui.arParamList[i].idx == this.searchbtnCnt) {
						tmpParam = $saSubMenu.ui.arParamList[i];

						//KOSIS일 경우
						if(curSelectedStatsType == "kosis") {
							tmpTitle = saMapEtc.curSelectedTitle;
							this.arParamList[i]["title"] = tmpTitle;
						}
						break;
					}
				}
				//2019-01-15 선택항목 및 지도에 년도 나오는거 날짜로 표시되게 변경.
				if(curSelectedStatsType != "kosis") {
					//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. START
					//tmpTitle = btnTitle + " ("+ unit +")" + " ("+$workRoad.util.dateWithSign(today, ".")+") ("+ termName +")";

					/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 START */
					// tmpTitle = btnTitle + " ("+ unit +")" + " ("+$workRoad.util.dateWithSign(today, ".")+")";
					if(regDtMonth != null && regDtMonth != "999999"){
						/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 START */
						tmpTitle = "월별 " + btnTitle + " ("+ unit +")" + " ("+$workRoad.util.dateWithSign(regDtMonth, ".")+")";
						/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 END */
					} else {
						tmpTitle = btnTitle + " ("+ unit +")" + " ("+$workRoad.util.dateWithSign(today, ".")+")";
					}
					/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 END */

					//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. END
					//9월 서비스
					/*if (year != null) {
						tmpTitle = btnTitle + " ("+ unit +")" + "-"+year+"년";
					}else {
						tmpTitle = btnTitle + " ("+ unit +")";
					}*/
				}

//				//KOSIS일 경우
//				if(curSelectedStatsType == "kosis") {
//					tmpTitle = saMapEtc.curSelectedTitle;
//					for (var i = 0; i < this.arParamList.length; i++) {
//						if (this.arParamList[i].idx == this.searchbtnCnt) {
//							this.arParamList[i]["title"] = tmpTitle;
//							break;
//						}
//					}
//					//세부조건설정 버튼 제목
//					//$("#kosisTitle").text(tmpTitle);
//				} else {	//일반 버튼일 경우
//					//9월 서비스
//					if (year != null) {
//						tmpTitle = btnTitle + " ("+ unit +")" + "-"+year+"년";
//					}else {
//						tmpTitle = btnTitle + " ("+ unit +")";
//					}
//				}

				// 2018.11.30	ywKim	추가: 데이터보드 정보 테이블의 지역 데이터 관련
				var adm_nm = "";
				if ($("#current-sido-select").find("option:selected").val() != "99") {
					adm_nm = $("#current-sido-select").find("option:selected").text();

					if ($("#current-sgg-select").find("option:selected").val() != "999") {
						adm_nm += " " + $("#current-sgg-select").find("option:selected").text();
					}
				}

				/** 2019.11.06[한광희] 구인현황분석 통계보기 선택시 해당 지역명(시도/시군구) 추가 START */
				if(adm_nm != null && adm_nm != ""){
					tmpTitle = adm_nm + " / " + tmpTitle;
				} else {
					tmpTitle = "전국 / "+tmpTitle;
				}
				/** 2019.11.06[한광희] 구인현황분석 통계보기 선택시 해당 지역명(시도/시군구) 추가 END */

				// 2018.11.01	ywKim	변경 : 모듈적용
				$workRoadSelection.ui.show({
					tooltip: tmpTitle,		// 항목에 마우스 오버시 나타나는 풍선 도움말
					text: tmpTitle,			// 항목에 표시할 텍스트
					id: curSelectedDetailStatsType + "-" + this.searchbtnCnt,
					param: tmpParam,
					adm_nm: adm_nm,										// 2018.11.30	ywKim	추가: 데이터보드 정보 테이블의 지역 데이터 관련

					item_click: function (item) {
						$wrmTodayStatus.ui.adm_nm = item.adm_nm;		// 2018.11.30	ywKim	추가: 데이터보드 정보 테이블의 지역 데이터 관련
						$saMap.callbackFunc.didMapDoubleClick(item.id, item.param);
					},
					showNumber_click: function (val) {
						$saSubMenu.ui.showNumberClick();
					}
				});

//				//버튼생성
//				var html = "<li class='dragItem' id='dragItem_"+this.searchbtnCnt+"'>" +
//								"<a href='javascript:void(0)' id='"+curSelectedDetailStatsType + "-" + this.searchbtnCnt+"' class='ellipsis drag on' title='"+tmpTitle+"'>" +
//									"<div class='text'>"+tmpTitle+"</div>" +
//									"<div class='atdrc_yn' style='display:none;'>"+atdrc_yn+"</div>"+
//								"</a>" +
//								"<a href='javascript:$saSubMenu.ui.deleteSearchBtn("+this.searchbtnCnt+");' class='sqdel'><img src='/img/um/btn_closel01.png' alt='삭제' /></a>" +
//						   "</li>";
//				/*html += "<li class='dragItem' id='dragItem_'"+this.searchbtnCnt+1+" aria-disabled='false'>"+
//				"<a href='javascript:void(0)' id='kosis-0' class='ellipsis drag on' title='행정구역(시도)별 경제활동인구  > 15세이상인구(2018.08)' style=''>"+
//				"<div class='text'>행정구역(시도)별 경제활동인구  &gt; 15세이상인구(2018.08)</div>"+
//				"<div class='atdrc_yn' style='display:none;'>0</div>"+
//				"</a>"+
//				"<a href='javascript:$saSubMenu.ui.deleteSearchBtn(0);' class='sqdel'><img src='/img/um/btn_closel01.png' alt='삭제' class='mCS_img_loaded'></a>"+
//				"</li>";*/
//
//				$("#searchBtnResultRgn ul").prepend(html);
//				$("#searchBtnResultRgn").css("height", "300px");
//
//				 //툴팁
////				$("#"+curSelectedDetailStatsType + "-" + this.searchbtnCnt).tooltip({
////					position : {my: "left+10 top-40"},
////					track: true
////				});
//
//				//버튼 드래그설정
//				$(".dragItem").draggable({
//					revert : "invalid",
//					helper : "clone",
//					cursor : "pointer",
//					zIndex : 100,
//					cursorAt : {left : -5},
//					appendTo : "body",
//					start : function(e, ui) {
//					},
//					drag : function(e, ui) {
//						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
//					},
//					stop : function(e, ui) {
//						$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
//					},
//					helper : function() {	//드래그시 폰트 색상 변경
//						var cloneElem = $(this).clone();	//버튼 클론
//						var btnId = $(cloneElem).find("a").attr("id");	//버튼 아이디
//						//아직 조회가 안된 버튼은 검정글씨
//						if($saSubMenu.ui.curSearchBtnArray["one"] != btnId &&
//							$saSubMenu.ui.curSearchBtnArray["two"] != btnId &&
//							$saSubMenu.ui.curSearchBtnArray["three"] != btnId) {
//							$(cloneElem).find("a > div:eq(0)").css("color", "#000");
//						} else {	//조회가 된 버튼은 흰글씨
//							$(cloneElem).find("a > div:eq(0)").css("color", "#fff");
//						}
//						return cloneElem;
//					}
//				});
//
//				//조건버튼 드래그, 더블클릭 설정
//				this.searchModeSetting();
//
//				//버튼 카운트
//				this.getBtnCnt();
			},

			/**
			 *
			 * @name         : searchModeSetting
			 * @description  : 조건버튼 드래그, 더블클릭 설정.
			 * @date         : 2015. 10. 14.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			searchModeSetting : function() {

				console.log("[interactiveLeftMenu.js] searchModeSetting 호출");

				// 주석 - 2019.01.02	ywKim	변경: 불필요한 코드
//				//mng_s
//				if($saSubMenu.ui.isInnerMapShow2!=undefined && $saSubMenu.ui.isInnerMapShow2) {
//					$(".dragItem").draggable( "disable" );	//드랍 차단
//					//$("#sqlListBox").draggable( "disable" ); //선택항목 패널 고정시 사용
//				} else {
					$(".dragItem").draggable( "enable" );	//드랍 허용
//				}

				//$(".dragItem").draggable( "enable" );	//드랍 허용 //mng_s
				$(".ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled").css({"opacity":1});	//disabled일때 흐려짐현상 없앰
				//더블클릭 이벤트
				// 2016. 04. 01 j.h.Seok
				$(".dragItem").off("dblclick").dblclick(function(event) {
					var id = $("#"+event.currentTarget.id).find("a").attr("id");
					var index = id.split("-")[1];
					var tmpParam = "";
					for(var i = 0; i < $saSubMenu.ui.arParamList.length; i ++) {
						if($saSubMenu.ui.arParamList[i].idx == index) {
							tmpParam = $saSubMenu.ui.arParamList[i];
						}
					}
					// 더블클릭 시, 콜백 호출
					$saMap.callbackFunc.didMapDoubleClick(id, tmpParam);
				});

				this.updateSearchBtnEffect(this.curSearchBtnArray["one"], 0);
				this.updateSearchBtnEffect(this.curSearchBtnArray["two"], 1);
				this.updateSearchBtnEffect(this.curSearchBtnArray["three"], 2);
			},

			/**
			 *
			 * @name         : updateSearchBtnEffect
			 * @description  : 해당 조건버튼의 색상 및 깜빡임 효과.
			 * @date         : 2015. 10. 14.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param btn_id : 조회 버튼 아이디 (element id)
			 * @param map_id : 지도 번호 (0, 1, 2)
			 */
			updateSearchBtnEffect : function(btn_id, map_id) {
				//모든 버튼 색상 초기화
				$("#searchBtnResultRgn ul li").each(function() {
					$(this).find("a").removeClass("M_on");
					$(this).find("a").css("background-color", "");	//해당 버튼 배경 없애기
				});

				//드랍된 버튼 아이디 저장
				if(map_id == "0") {
					this.curSearchBtnArray["one"] = btn_id;
				} else if(map_id == "1") {
					this.curSearchBtnArray["two"] = btn_id;
				} else if(map_id == "2") {
					this.curSearchBtnArray["three"] = btn_id;
				}

				//원래 드랍됐었던 조회버튼
				if(this.curSearchBtnArray["one"] != "") {
					$saSubMenu.event.dragAnimate(this.curSearchBtnArray["one"], this.mapColor[0]);
				}
				if(this.curSearchBtnArray["two"] != "") {
					$saSubMenu.event.dragAnimate(this.curSearchBtnArray["two"], this.mapColor[1]);
				}
				if(this.curSearchBtnArray["three"] != "") {
					$saSubMenu.event.dragAnimate(this.curSearchBtnArray["three"], this.mapColor[2]);
				}

				//분할 화면에 같은 버튼을 조회했을 경우
				if(this.curSearchBtnArray["one"] != "" && (this.curSearchBtnArray["one"] == this.curSearchBtnArray["two"])) {
					$saSubMenu.event.dragAnimate(this.curSearchBtnArray["one"], "#394955");
				}
				if(this.curSearchBtnArray["two"] != "" && (this.curSearchBtnArray["two"] == this.curSearchBtnArray["three"])) {
					$saSubMenu.event.dragAnimate(this.curSearchBtnArray["two"], "#394955");
				}
				if(this.curSearchBtnArray["three"] != "" && (this.curSearchBtnArray["three"] == this.curSearchBtnArray["one"])) {
					$saSubMenu.event.dragAnimate(this.curSearchBtnArray["three"], "#394955");
				}
			},

			/**
			 *
			 * @name         : setParams
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정한다.
			 * @date         : 2015. 10. 01.
			 * @author	     : 김성현
			 * @history 	 :
			 * 	2018.01.02	ywKim	checkbox 값 얻어오는 로직 변경
			 * 						- AsIs : if($(this).attr("checked") == "checked")
			 * 						- ToBe : if($(this).prop("checked"))
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 * @param api_id : 선택된 통계정보의 API ID(element id)
			 */
			setParams : function(curSelectedStatsType, api_id) {
				console.log("[$saSubMenu.js] setParams 조건버튼으로 만들어진 통계정보에 대한 파라미터정보를 설정");
				var tmpArParams = new Array();
				var tmpArNoneParams = new Array();		//API 조회조건에 사용되지 않는 파라미터
				var tmpArParamName = new Array(); // 선택된 파라미터이름 정보
				var filterParam = null;
				var unit = null;
				var filterName = null;
				var today = $wrmStatusAnls.ui.today;	// 하드코딩 제거 - 2018.11.08	ywKim	변경

				/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 START */
				var regDtMonth = $("#current-month-select option:selected").data("reg_dt");
				if(regDtMonth == undefined){
					regDtMonth = "999999";
				} else {
					regDtMonth = regDtMonth.toString();
				}
				/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 END */

				// 주요지표 목록보기
				if (curSelectedStatsType == "mainIndex") {
					// ************* 여기부터 구인현황 추가 ********************
					// 구인현황 파라메터 설정
					if (api_id == "API_WORK_URL") {
						var fullName = null;
						var tmpNames = [];
						var unitName = null;
						var resultType = null;	// 결과유형(구인수, 업체수)
						var map_type = null;	//선택된 map 타입

						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
						//구인수 && 업체수
						$("#saSubMenu .step02 input[name='rd_unit_type']").each(function() {
							if($(this).attr("checked") == "checked") {
								tmpNames.push($(this).next().text());
							}
						});
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
						//20181011 손원웅_필터파라메터명 정립 후 꼭 수정해야 될 것!!!
						filterParam = $("#API_WORK-01").find(".dbTypeCk.mt10 label.on").prev("input").val();
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
						//if(filterParam == undefined) {
							filterParam = "status_anls_all";
						//}
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
						unitName = $("#API_WORK-01").find(".dbTypeCk.mt20 label.on").prev("input").val();
						//filterParam = "right_data_val";

						fullName = $("#API_WORK-01").find(".dbTypeCk.mt10 label.on").text();

						console.log("722 : setParams filterParam / fullName / => "+ filterParam+" / " + fullName + " / " + unitName);

						if($("#API_WORK-01").find(".dbTypeCk.mt10 label.on").text().indexOf("(") > -1) {
							var lastLen = fullName.indexOf("(");
							fullName = fullName.substring(0, lastLen);
						}

						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
						if($.trim(fullName) != "") tmpNames.push($.trim(fullName));
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

						//구인현황 단위설정
						if(unitName == "rcrit_psn_cnt") {
							unit = "명";
							resultType = "PSN";
						}
						else if(unitName == "corp_cnt") {
							unit = "업체";
							resultType = "COR";
						}

						//_끝
						if (tmpNames.length > 0) {
							tmpArParamName.push(tmpNames.join());
						}

						/*$('input:checkbox[name="cDataType"]').each(function() {
						      this.checked = true;
						      if (this.checked) {
						    	  map_type = this.value;
						      }
						});*/

						map_type = $("#saSubMenu_map_type input[type='radio']:checked").val();

						var sido_cd = $("#saSubMenu #current-sido-select").val();
						var sgg_cd = $("#saSubMenu #current-sgg-select").val();
						var coor_x = $("#saSubMenu #current-sido-select option:selected").data("coor-x");
						var coor_y = $("#saSubMenu #current-sido-select option:selected").data("coor-y");
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
						//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. START
						//2019-12-26 [김남민] 일자리 맵 > 구인현황 분석 > 지역조건 오류수정 및 조회범위 읍면동 확대 (검색조건이 변하지는 않음) START
						if(sgg_cd != "999") {
							coor_x = $("#saSubMenu #current-sgg-select option:selected").data("coor-x");
							coor_y = $("#saSubMenu #current-sgg-select option:selected").data("coor-y");
						}
						//2019-12-26 [김남민] 일자리 맵 > 구인현황 분석 > 지역조건 오류수정 및 조회범위 읍면동 확대 (검색조건이 변하지는 않음) END
						//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. END
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

						// 시도 설정
						tmpArParams.push({
							key : "sido_cd",
							value : sido_cd
						});
						// 시군구 설정
						//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. START
						//2019-12-26 [김남민] 일자리 맵 > 구인현황 분석 > 지역조건 오류수정 및 조회범위 읍면동 확대 (검색조건이 변하지는 않음) START
						tmpArParams.push({
							key : "sgg_cd",
							value : sgg_cd
						});
						//2019-12-26 [김남민] 일자리 맵 > 구인현황 분석 > 지역조건 오류수정 및 조회범위 읍면동 확대 (검색조건이 변하지는 않음) END
						//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. END

						if(coor_x != ""){
							// center x
							tmpArParams.push({
								key : "coor_x",
								value : coor_x
							});
							// center y
							tmpArParams.push({
								key : "coor_y",
								value : coor_y
							});
						}

						// 기간 시작일자 설정
						tmpArParams.push({
							key : "today",
							value : today
						});

						// 결과유형 설정
						tmpArParams.push({
							key : "resultType",
							value : resultType
						});

						// 기간유형 설정(1M:1개월)
						var term = $("#current-term-select").val();
						tmpArParams.push({
							key : "term",
							value : term
						});

						/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 START */
						// 조회기간-월평균자료 선택시 설정
						if(regDtMonth != "999999"){
							tmpArParams.push({
								key : "regDtMonth",
								value : regDtMonth
							});
						}
						/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 END */

						if (filterParam == "indust_class"){
							// 업종 다중 선택
							var industClass = [];
							var tmpNames = [];
							$("input[name='INDCLA']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									industClass.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});

							if (industClass.length > 0) {
								tmpArParams.push({
									key : "industClass",
									value : industClass.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}else if (filterParam == "rcrit_jssfc"){
							// 직종 다중 선택
							var jobClass = [];
							var tmpNames = [];
							$("input[name='RCRJSS']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									jobClass.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});

							if (jobClass.length > 0) {
								tmpArParams.push({
									key : "jobClass",
									value : jobClass.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}else if (filterParam == "entrprs_type"){
							// 기업형태 다중 선택
							var enterpriseType = [];
							var tmpNames = [];
							$("input[name='ENTTYP']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									enterpriseType.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});

							if (enterpriseType.length > 0) {
								tmpArParams.push({
									key : "enterpriseType",
									value : enterpriseType.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}else if (filterParam == "emplym_type"){
							// 고용형태 다중 선택
							var employmentType = [];
							var tmpNames = [];
							$("input[name='EMPTYP']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									employmentType.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});

							if (employmentType.length > 0) {
								tmpArParams.push({
									key : "employmentType",
									value : employmentType.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}else if (filterParam == "wage_type"){
							// 임금형태 다중 선택
							/*var wageType = [];
							var tmpNames = [];
							var salary = [];
							$("input[name='WAGETY']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									wageType.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});

							if (wageType.length > 0) {
								tmpArParams.push({
									key : "wageType",
									value : wageType.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}*/
							var wageType = "";
							var salary = "";
							$("input[name='WAGETY']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									wageType = $(this).val();
									tmpArParams.push({
										key : "wageType",
										value : wageType
									});

									tmpId = $(this).attr("id");
									tmpId = tmpId.substr(10,1);
									salary = $("#current-salary-select-"+tmpId).val();
									console.log("tmpId / salary" + tmpId + " / " + salary);
									if(salary != ""){
										tmpArParams.push({
											key : "salary",
											value : salary
										});
									}
								}
							});
							//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 START
							var lvWagety2 = "";
							var lvWagety2Name = "";
							var lvWagety2WageTypeList = [];
							$("input[name='WAGETY2']").each(function() {
								var lvTempLi = $(this).parent();
								var lvTempInput = $(this);
								var lvTempLabel = $(this).next();
								if(lvTempLabel.hasClass("on")) {
									var lvTempValue = $(this).val();
									var lvTempName = $(this).next().text().trim();

									if(lvTempValue.indexOf("WAGETY_") >= 0) {
										if(lvWagety2 == "") lvWagety2 += lvTempValue;
										else lvWagety2 += ","+lvTempValue;
										if(lvWagety2Name == "") lvWagety2Name += lvTempName+":";
										else lvWagety2Name += ","+lvTempName+":";
										lvWagety2WageTypeList.push(lvTempValue.replace(/WAGETY_/g,"WGTY_"));
									}
									else {
										for(var i = 0; i < lvWagety2WageTypeList.length; i++) {
											if(lvTempValue.indexOf(lvWagety2WageTypeList[i]) >= 0) {
												if(lvWagety2 == "") lvWagety2 += lvTempValue;
												else lvWagety2 += ","+lvTempValue;
												if(lvWagety2Name == "") lvWagety2Name += lvTempName;
												else if(lvWagety2Name.slice(-1) == ":") lvWagety2Name += lvTempName;
												else lvWagety2Name += ","+lvTempName;
												break;
											}
										}
									}
								}
							});
							if(lvWagety2 != "") {
								tmpArParams.push({
									key : "wagety2",
									value : lvWagety2
								});
								tmpArParamName.push(lvWagety2Name);
							}
							//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 END
						}else if (filterParam == "acdmcr"){
							// 학력 다중 선택
							var educationLevel = [];
							var tmpNames = [];
							$("input[name='ACDMCR']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									educationLevel.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});

							if (educationLevel.length > 0) {
								tmpArParams.push({
									key : "educationLevel",
									value : educationLevel.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}
						else if (filterParam == "career"){
							// 경력 다중 선택
							var careerLevel = [];
							var tmpNames = [];
							$("input[name='CAREER']").each(function() {
								if($(this).prop("checked")) {
//								if($(this).attr("checked") == "checked") {
									careerLevel.push($(this).val());
									tmpNames.push($(this).next().text());
								}
							});

							if (careerLevel.length > 0) {
								tmpArParams.push({
									key : "careerLevel",
									value : careerLevel.join(",")
								});
								tmpArParamName.push(tmpNames.join(","));
							}
						}
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
						else if(filterParam == "status_anls_all"){
							// 업종
							if($("#mainIndex_check01").attr("checked") == "checked") {
								var industClassAllYn = "N";
								var industClass = [];
								var tmpNames = [];
								$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index1Data']").each(function() {
									if($(this).attr("checked") == "checked") {
										if($(this).val() == "ALL") {
											industClassAllYn = "Y";
										}
										else {
											industClass.push($(this).val());
											tmpNames.push($(this).next().text());
										}
									}
								});
								/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 START */
								if(regDtMonth == "999999"){
									tmpArParams.push({
										key : "industClassAllYn",
										value : industClassAllYn
									});
								}else{
									tmpArParams.push({
										key : "month",
										value : industClassAllYn
									});
								}
								/** 2021.06.02[hjh] 월평균자료 조회 기능 추가 END */
								if (industClassAllYn == "Y") {
									/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 START */
									if(regDtMonth == "999999"){
										tmpArParamName.push("업종 : 전체");
									}
									/** 2020.04.23[한광희] 월평균자료 조회 기능 추가 END */
								}
								else if (industClass.length > 0) {
									tmpArParams.push({
										key : "industClass",
										value : industClass.join(",")
									});
									tmpArParamName.push("업종 : "+tmpNames.join(","));
								}
							}

							// 직종
							if($("#mainIndex_check02").attr("checked") == "checked") {
								var jobClassAllYn = "N";
								var jobClass = [];
								var tmpNames = [];
								$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index2Data']").each(function() {
									if($(this).attr("checked") == "checked") {
										if($(this).val() == "ALL") {
											jobClassAllYn = "Y";
										}
										else {
											jobClass.push($(this).val());
											tmpNames.push($(this).next().text());
										}
									}
								});
								tmpArParams.push({
									key : "jobClassAllYn",
									value : jobClassAllYn
								});
								if (jobClassAllYn == "Y") {
									tmpArParamName.push("직종 : 전체");
								}
								else if (jobClass.length > 0) {
									tmpArParams.push({
										key : "jobClass",
										value : jobClass.join(",")
									});
									tmpArParamName.push("직종 : "+tmpNames.join(","));
								}
							}

							// 기업형태
							if($("#mainIndex_check03").attr("checked") == "checked") {
								var enterpriseTypeAllYn = "N";
								var enterpriseType = [];
								var tmpNames = [];
								$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index3Data']").each(function() {
									if($(this).attr("checked") == "checked") {
										if($(this).val() == "ALL") {
											enterpriseTypeAllYn = "Y";
										}
										else {
											enterpriseType.push($(this).val());
											tmpNames.push($(this).next().text());
										}
									}
								});
								tmpArParams.push({
									key : "enterpriseTypeAllYn",
									value : enterpriseTypeAllYn
								});
								if (enterpriseTypeAllYn == "Y") {
									tmpArParamName.push("기업형태 : 전체");
								}
								else if (enterpriseType.length > 0) {
									tmpArParams.push({
										key : "enterpriseType",
										value : enterpriseType.join(",")
									});
									tmpArParamName.push("기업형태 : "+tmpNames.join(","));
								}
							}

							// 고용형태
							if($("#mainIndex_check04").attr("checked") == "checked") {
								var employmentTypeAllYn = "N";
								var employmentType = [];
								var tmpNames = [];
								$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index4Data']").each(function() {
									if($(this).attr("checked") == "checked") {
										if($(this).val() == "ALL") {
											employmentTypeAllYn = "Y";
										}
										else {
											employmentType.push($(this).val());
											tmpNames.push($(this).next().text());
										}
									}
								});
								tmpArParams.push({
									key : "employmentTypeAllYn",
									value : employmentTypeAllYn
								});
								if (employmentTypeAllYn == "Y") {
									tmpArParamName.push("고용형태 : 전체");
								}
								else if (employmentType.length > 0) {
									tmpArParams.push({
										key : "employmentType",
										value : employmentType.join(",")
									});
									tmpArParamName.push("고용형태 : "+tmpNames.join(","));
								}
							}

							// 임금수준
							if($("#mainIndex_check05").attr("checked") == "checked") {
								var wagetyTypeAllYn = "N";
								var wagetyType = [];
								//var wagetyTypeList = [];
								var wagetyTypeName = "";
								var tmpNames = [];
								$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index5Data']").each(function() {
									var lvTempInput = $(this);
									var lvTempLabel = $(this).next();
									var lvTempValue = $(this).val();
									var lvTempName = $(this).next().text().trim();
									if(lvTempInput.attr("checked") == "checked") {
										// 전체
										if(lvTempValue == "ALL") {
											wagetyTypeAllYn = "Y";
										}
										else {
											// 상위
											if(lvTempValue.indexOf("WAGETY_") >= 0) {
												//wagetyTypeList.push(lvTempValue.replace(/WAGETY_/g,"WGTY_"));
												if(wagetyTypeName == "") wagetyTypeName += lvTempName + " :";
												else wagetyTypeName += " + "+lvTempName + " :";
												wagetyType.push(lvTempValue);

												// 하위
												$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index5Data']").each(function() {
													var lvTempInput2 = $(this);
													var lvTempLabel2 = $(this).next();
													var lvTempValue2 = $(this).val();
													var lvTempName2 = $(this).next().text().trim();
													//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. START
													if(lvTempInput2.attr("checked") == "checked" && lvTempValue2.indexOf(lvTempValue.replace(/WAGETY_/g,"WGTY_")) >= 0) {
														if(wagetyTypeName == "") wagetyTypeName += lvTempName2;
														else if(wagetyTypeName.slice(-1) == ":") wagetyTypeName += " "+lvTempName2;
														else wagetyTypeName += ","+lvTempName2;
														wagetyType.push(lvTempValue2);
													}
													//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. END
												});
											}
											//하위
											/*else {
												for(var i = 0; i < wagetyTypeList.length; i++) {
													if(lvTempValue.indexOf(wagetyTypeList[i]) >= 0) {
														if(wagetyTypeName == "") wagetyTypeName += lvTempName;
														else if(wagetyTypeName.slice(-1) == ":") wagetyTypeName += " "+lvTempName;
														else wagetyTypeName += ","+lvTempName;
													}
												}
												wagetyType.push($(this).val());
											}*/
										}
									}
								});
								tmpArParams.push({
									key : "wagetyTypeAllYn",
									value : wagetyTypeAllYn
								});
								if (wagetyTypeAllYn == "Y") {
									tmpArParamName.push("임금수준 : 전체");
								}
								else if (wagetyType.length > 0) {
									tmpArParams.push({
										key : "wagetyType",
										value : wagetyType.join(",")
									});
									tmpArParamName.push(wagetyTypeName);
								}
							}

							// 요구학력
							if($("#mainIndex_check06").attr("checked") == "checked") {
								var educationLevelAllYn = "N";
								var educationLevel = [];
								var tmpNames = [];
								$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index6Data']").each(function() {
									if($(this).attr("checked") == "checked") {
										if($(this).val() == "ALL") {
											educationLevelAllYn = "Y";
										}
										else {
											educationLevel.push($(this).val());
											tmpNames.push($(this).next().text());
										}
									}
								});
								tmpArParams.push({
									key : "educationLevelAllYn",
									value : educationLevelAllYn
								});
								if (educationLevelAllYn == "Y") {
									tmpArParamName.push("요구학력 : 전체");
								}
								else if (educationLevel.length > 0) {
									tmpArParams.push({
										key : "educationLevel",
										value : educationLevel.join(",")
									});
									tmpArParamName.push("요구학력 : "+tmpNames.join(","));
								}
							}

							// 요구경력
							if($("#mainIndex_check07").attr("checked") == "checked") {
								var careerLevelAllYn = "N";
								var careerLevel = [];
								var tmpNames = [];
								$("#saSubMenu #API_WORK-02 .IndexSelect2 input[name='index7Data']").each(function() {
									if($(this).attr("checked") == "checked") {
										if($(this).val() == "ALL") {
											careerLevelAllYn = "Y";
										}
										else {
											careerLevel.push($(this).val());
											tmpNames.push($(this).next().text());
										}
									}
								});
								tmpArParams.push({
									key : "careerLevelAllYn",
									value : careerLevelAllYn
								});
								if (careerLevelAllYn == "Y") {
									tmpArParamName.push("요구경력 : 전체");
								}
								else if (careerLevel.length > 0) {
									tmpArParams.push({
										key : "careerLevel",
										value : careerLevel.join(",")
									});
									tmpArParamName.push("요구경력 : "+tmpNames.join(","));
								}
							}
						}
						//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
						tmpArParams.push({
							key : "year",
							value : "2016"
						});
					}
					// ************* 여기까지 구인현황 추가 ********************

					if (api_id == "API_0301") {	}// 삭제 처리 함
				}

				// 인구주택총조사
				else if (curSelectedStatsType == "populationHouse") { }// 삭제 처리 함

				// 농림어업총조사
				else if (curSelectedStatsType == "3f") {}// 삭제 처리 함

				// 전국사업체조사
				else if (curSelectedStatsType == "company") {	}// 삭제 처리 함

				// KOSIS
				else if (curSelectedStatsType == "kosis") {
					tmpArParams.push({
						key : "org_id",
						value : saMapEtc.org_id
					});
					tmpArParams.push({
						key : "tbl_id",
						value : saMapEtc.tbl_id
					});

					tmpArParams.push({
						key : "obj_var_id",
						value : saMapEtc.kosis_obj_var_id
					});

					tmpArParams.push({
						key : "field_id",
						value : saMapEtc.kosis_field_id
					});

					if (saMapEtc.kosis_data_item_detail != null
							&& saMapEtc.kosis_data_item_detail.length > 2) {
						tmpArParams.push({
							key : "kosis_data_item_detail",
							value : saMapEtc.kosis_data_item_detail
						});
					} else {
						tmpArParams.push({
							key : "kosis_data_item_detail",
							value : " "
						});
					}
					tmpArParams.push({
						key : "kosis_data_item",
						value : saMapEtc.kosis_data_item
					});
					tmpArParams.push({
						key : "kosis_data_period",
						value : saMapEtc.kosis_data_period
					});
					tmpArParams.push({
						key : "kosis_data_year",
						value : saMapEtc.kosis_data_year
					});
					tmpArParams.push({
						key : "gis_se",
						value : saMapEtc.gis_se
					});
				}
				this.arParamList.push({
					idx : this.searchbtnCnt,
					params : tmpArParams,
					noneParams : tmpArNoneParams,
					names : tmpArParamName,
					filterParam : filterParam,
					/** 2020.07.17[한광희] 사람인 추가로 인한 명칭 추가 START */
					//origin: "워크넷, 인크루트 구인자료",		// 2018.11.08	ywKim	추가
					origin: "워크넷, 인크루트, 사람인 구인자료",		// 2018.11.08	ywKim	추가
					/** 2020.07.17[한광희] 사람인 추가로 인한 명칭 추가 END */
					maptype : map_type,
					unit : unit
				});
				console.log(this.arParamList);
				return api_id;
			},

			/**
			 *
			 * @name         : setRevertParams
			 * @description  : 파라미터정보를 가지고 조건버튼을 생성한다,.
			 * @date         : 2015. 11. 18.
			 * @author	     : 권차욱
			 * @history 	 :
			 * @param @param api_id
			 * @param @param data
			 */
			setRevertParams : function(data, type) {
				console.log("setRevertParams");
				console.log(data);
				console.log(ata.length);
				//일단 공유/검색 데이터일 경우
				if (data.length == 1) {
					console.log("if length 1");
					var data = data[0];

					//adm_cd 및 low_search는 추후
					var tmpParam = [];
					for (p in data.param_info.paramInfo) {
						if (p != "adm_cd" &&
							p != "low_search") {
							tmpParam.push({
								key : p,
								value : data.param_info.paramInfo[p]
							});
						}
					}

					// 2016. 03. 29 j.h.Seok
					if(data.param_info.isKosis) {
						var tmpGisSe = data.param_info.gis_se_bak;

						for(var i = 0; i < tmpParam.length; i++) {
							var temp = tmpParam[i];

							if(temp.key == "gis_se") {
								temp.value = tmpGisSe;
								break;
							}
						}
					}

					this.arParamList.push({
						idx : this.searchbtnCnt,
						params : tmpParam,
						noneParams : [],
						names : data.param_info.title.split(" + "),
						filterParam : data.param_info.showData,
						unit : data.param_info.unit
					});

					//버튼생성 및 애니메이션효과 적용
					this.createSearchBtn(data.param_info.api_id, "0");
					this.updateSearchBtnEffect(data.param_info.api_id + "-" + this.searchbtnCnt, 0);
					this.searchbtnCnt++;

					//버튼메뉴 Open
					$(".sideQuick.sq03").next(".sqListBox").stop().animate({"left":"0px"},200);
					$(".sideQuick.sq03").addClass("on");

				}
			},

			/**
			 *
			 * @name         : setDetailStatsPanel
			 * @description  : 특정 통계버튼을 생성했을 때, 해당 통계에 대한 세부통계조건선택뷰를 생성한다.
			 * @date         : 2015. 10. 01.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 통계타입
			 */
			setDetailStatsPanel : function(type) {
				console.log("[interactiveLeftMenu.js] setDetailStatsPanel 호출 : "+type);
				this.curSelectedStatsType = type;

				var menuType = {
					"mainIndex" : 0,				//주요지표 목록보기
					"populationHouse"  : 1,	//인구주택조사 통계
					"3f" 	 : 2,					//농림어가조사 통계
					"company" 		 : 3,		//사업체조사 통계
					"kosis" 	 : 4,				//KOSIS(지역통계)
					"publicData" 	 : 5,		//공공데이터
					"userData"	 : 6,			//나의 데이터
					"poi"	 : 7,					//사업체 위치조회(POI)
					"company2"		:8
				};

				var titleType = {
					"mainIndex" : "해당분류 세부항목 선택하기",				//주요지표 목록보기
					"populationHouse"  : "인구주택총조사 조건설정하기",	//인구주택조사 통계
					"3f" 	 : "농림어업총조사 검색조건",					//농림어가조사 통계
					"company" 		 : "전국사업체조사 검색조건",		//사업체조사 통계
					"kosis" 	 : "KOSIS(지역통계) 목록보기",				//행정구역 통계목록보기
					"publicData" 	 : "공공데이터 목록 선택",		//공공데이터 목록 보기
					"userData"	 : "나의 데이터 불러오기",			//사용자데이터업로드
					"poi"	 : "POI",					//POI
					"company2"	 : "전국사업체조사 검색조건"					//사업체조사 통계
				}
				var inx = menuType[type];

				if(inx!=8){
					$("#submenuTitle").text(titleType[type]);
					$("#depth1Menu").find("li").removeClass("on");
					$("#depth1Menu").find("li:eq("+inx+")").addClass("on");
					$(".totalResult").hide();
				}else{
					$("#submenuTitle").text(titleType[type]);
					$("#depth1Menu").find("li").removeClass("on");
					$("#depth1Menu").find("li:eq("+3+")").addClass("on");
					$(".totalResult").hide();

				}


				//2Depth 넓이
				$("#quickBox_2depth").removeClass("join");
				$(".quickBox.step02").find(".mCSB_container").css("width", "280px");
				$(".quickBox.step02").find(".mCSB_container").mCustomScrollbar({setWidth : 280});

				//버튼생성 보이기
				$("#buttonMakeBtn").show();
				$("#menuAutoClose2Lev").show();
				//2depth열고, 3depth, 4dpeht 닫기
//				$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
				//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
				if(gv_type == "full") {
					$(".quickBox.step02").stop().animate({"left":"0"},200);
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
					var lvStep03Left = Number($saSubMenu.ui.saSubMenuKosisDetailDivDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width)-80;
					$(".quickBox.step03").stop().animate({"left":lvStep03Left+"px"},200);
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
				}
				else {
					$(".quickBox.step02").stop().animate({"left":"80"},200);
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
					var lvStep03Left = Number($saSubMenu.ui.saSubMenuKosisDetailDivDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width);
					if(gv_type == "full") {
		        		lvStep03Left += -80;
		        	}
					$(".quickBox.step03").stop().animate({"left":lvStep03Left+"px"},200);/* 2018.10.24	ywKim	변경 */
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
				}
				//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
//				$(".quickBox.step03").stop().animate({"left":"400px"},200);
				$(".quickBox.step04").stop().animate({"left":"0px"},200);
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
				$("#saSubMenu .step03 .bottom .stepClose").stop().animate({"right":"-25px"},200);
				//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

				var obj = $("#kosisDetailDiv").offset();
				// #div의 현재 위치
				console.log("kosisDetailDiv 현재 위치 => left: " + obj.left + "px, top: " + obj.top + "px");

				switch(menuType[type]) {
					//주요지표 목록보기
					case 0:
						//this.curSelectedDetailStatsType = "API_0301";
						this.curSelectedDetailStatsType = "API_WORK_URL";
						$(".totalResult.tr0"+parseInt(inx+1)).show();

						$("#buttonMakeBtn").html("통계보기");



						break;

					//인구주택조사 통계
					case 1:
						$(".totalResult.tr0"+parseInt(inx+1)).show();

						if($(".cm01").is(":visible")) {		//인구조건
							this.populationTab("population");
						} else if($(".cm02").is(":visible")) {		//가구조건
							this.populationTab("household");
						} else if($(".cm03").is(":visible")) {		//주택조건
							this.populationTab("house");
						} else if($(".cm04").is(":visible")) {		//결합조건
							this.populationTab("combine");
						}
						break;

					//농림어가조사 통계
					case 2:
						$(".totalResult.tr0"+parseInt(inx+1)).show();

						if($("#3fTabDiv > li:eq(0)").hasClass("on")) {
							this.tripleFTab("farm");
						} else if($("#3fTabDiv > li:eq(1)").hasClass("on")) {
							this.tripleFTab("forest");
						} else if($("#3fTabDiv > li:eq(2)").hasClass("on")) {
							this.tripleFTab("fish");
						}
						$("#buttonMakeBtn").html("검색조건 생성");

						break;

					//사업체조사 통계
					case 3:
						$(".totalResult.tr0"+parseInt(inx+1)).show();

						if($(".cm01").is(":visible")) {
							this.companyTab("industry");
						} else if($(".cm02").is(":visible")) {
							this.companyTab("theme");
						}

						//2000년~2005년 :8차, 2006년~현재 :9차
						var class_deg = "";
						if($("#company_year").val() <= 2005) {
							class_deg = "8";
						} else if($("#company_year").val() > 2005) {
							class_deg = "9";
						}
						$saMap.ui.companyTree = null;
						$saSubMenu.ui.curSelectedCompanyNode = null;
						$saMapApi.request.openApiInterstryCode(0, class_deg, null);
						break;

					//행정구역 통계목록보기
					case 4:
						this.curSelectedDetailStatsType = "kosis";
						$(".totalResult.tr0"+parseInt(inx+1)).show();

						// 2016. 03. 23 j.h.Seok 수정
//						$("#buttonMakeBtn").html("세부 조건창 열기");
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();
						$saSubMenu.event.kosisTreeWidth();
						//9월 서비스
						if (saMapEtc.checkKosisBtn()) {
							$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
							$("#kosisDetailDiv").stop().animate({"left":"560px"},200);
						}
						break;

					//공공데이터 목록 보기
					case 5:
						this.curSelectedDetailStatsType = "API_0301";
						$(".totalResult.tr0"+parseInt(inx+1)).show();

						//공공데이터 목록보기에서는 버튼생성 삭제
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();
						break;

					//사용자데이터업로드
					case 6:
						this.curSelectedDetailStatsType = "API_0301";
						$(".totalResult.tr0"+parseInt(inx+1)).show();

						//사용자데이터업로드에서는 버튼생성 삭제
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();
						break;

					//POI
					case 7:
						this.curSelectedDetailStatsType = "API_0301";
						$(".totalResult.tr0"+parseInt(inx+1)).show();
						break;
					case 8:
						$saSubMenu.ui.companyTree = null;
						inx = 3;

						$(".totalResult.tr0"+parseInt(inx+1)).show();

						if($(".cm01").is(":visible")) {
							this.companyTab("industry");
						} else if($(".cm02").is(":visible")) {
							this.companyTab("theme");
						}

						//2000년~2005년 :8차, 2006년~현재 :9차
						var class_deg = "";
						if($("#company_year").val() <= 2005) {
							class_deg = "8";
						} else if($("#company_year").val() > 2005) {
							class_deg = "9";
						}
						$saMap.ui.companyTree = null;
						$saSubMenu.ui.curSelectedCompanyNode = null;
						$saMapApi.request.openApiInterstryCode(0, class_deg, null);

						$("#companyBtn").trigger("click");
						break;

					//행정구역 통계목록보기
				}
			},

			/**
			 *
			 * @name         : populationTab
			 * @description  : 인구주택조사 통계에서 인구조건, 가구조건, 주택조건, 결합조건 탭 선택시 호출.
			 * @date         : 2015. 10. 08.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			populationTab : function(type) {
				var tabType = {
					"population" : 0,				//인구조건
					"household"  : 1,				//가구조건
					"house" 	 : 2,					//주택조건
					"combine"	 : 3				//결합조건
				};

				var inx = tabType[type];
				$(".population_tab").hide();
				$("#populationTabDiv li").removeClass("on");
				$("#populationTabDiv > li:eq("+inx+")").addClass("on");

				$("#quickBox_2depth").removeClass("join");

				//통계메뉴 버튼 위치
				//$(".sideQuick.sq02").stop().animate({"left":"560px"},200);

				//2Depth 넓이
				$(".quickBox.step02").find(".mCSB_container").css("width", "280px");

				if(tabType[type] == 0) {
					$("#API_0302").show();
					this.curSelectedDetailStatsType = "API_0302";
					$("#buttonMakeBtn").html("인구조건 버튼생성");
				} else if(tabType[type] == 1) {
					$("#API_0305").show();
					this.curSelectedDetailStatsType = "API_0305";
					$("#buttonMakeBtn").html("가구조건 버튼생성");
				} else if(tabType[type] == 2) {
					$("#API_0306").show();
					this.curSelectedDetailStatsType = "API_0306";
					$("#buttonMakeBtn").html("주택조건 버튼생성");
				} else if(tabType[type] == 3) {	//결합조건
					$("#API_4011").show();
					this.curSelectedDetailStatsType = "API_4011";
					//통계메뉴 버튼 위치
					//$(".sideQuick.sq02").stop().animate({"left":"1120px"},200);

					$("#quickBox_2depth").addClass("join");
					//2Depth 넓이
					$(".quickBox.step02").find(".mCSB_container").css("width", "840px");
					$("#buttonMakeBtn").html("인구+가구+주택 결합조건 버튼생성");
				}
			},

			/**
			 *
			 * @name         : tripleFTab
			 * @description  : 농림어업총조사 통계에서 농가, 임가, 어가 탭 선택시 호출.
			 * @date         : 2015. 10. 15.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			tripleFTab : function(type) {
				var tabType = {
					"farm" : 0,				//농가
					"forest"  : 1,				//임가
					"fish" 	 : 2			//어가
				};

				var inx = tabType[type];
				$("#3fTabDiv li").removeClass("on");
				$("#3fTabDiv > li:eq("+inx+")").addClass("on");

				if(inx == 2) {		//어가일 경우만 해수면,내수면 선택
					$("#3fFishTab-title").show();
					$("#3fFishTab-content").show();

					$("#3f_year option[value='2000']").remove();
					$("#3f_year").append("<option value='2000'>2000년도</option>");
				} else if(inx == 1){		// 임가일 경우 2000년 없음
					$("#3f_year option[value='2000']").remove();
					$("#3fFishTab-title").hide();
					$("#3fFishTab-content").hide();
				} else{		//농가, 임가일 경우 숨김
					$("#3f_year option[value='2000']").remove();
					$("#3f_year").append("<option value='2000'>2000년도</option>");
					$("#3fFishTab-title").hide();
					$("#3fFishTab-content").hide();
				}
			},

			/**
			 *
			 * @name         : companyTab
			 * @description  : 전국사업체조사에서 산업분류, 테마업종 탭 선택시 호출.
			 * @date         : 2015. 10. 16.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 탭
			 */
			companyTab : function(type) {
				console.log("asdasd = " + type);
				var tabType = {
					"industry" : 0,			//산업분류
					"theme"  : 1				//테마업종
				};

				var inx = tabType[type];
				$(".company_tab").hide();
				$("#companyTabDiv li").removeClass("on");
				$("#companyTabDiv > li:eq("+inx+")").addClass("on");

				if(tabType[type] == 0) {		//산업분류
					$("#API_0304-b").show();
					this.curSelectedDetailStatsType = "API_0304-b";

					// 주석 - 2019.01.02	ywKim	변경: 불필요한 코드
//					//mng_s
//					if($saSubMenu.ui.isInnerMapShow2!=undefined && $saSubMenu.ui.isInnerMapShow2) {
//						//버튼생성 보이기
//						//기존 산업분류에서는 3뎁스에서 버튼이 존재하고 그리드에서는 2뎁스에 존재해야하므로 여기다 세팅한다.
//						$("#buttonMakeBtn").text("사업체조사 버튼생성");
//						$("#buttonMakeBtn").show();
//						$("#menuAutoClose2Lev").show();
//					} else if($saSubMenu.ui.isInnerMapShow3!=undefined && $saSubMenu.ui.isInnerMapShow3) {
//						//버튼생성 보이기
//						//기존 산업분류에서는 3뎁스에서 버튼이 존재하고 그리드에서는 2뎁스에 존재해야하므로 여기다 세팅한다.
//						$("#buttonMakeBtn").text("사업체조사 버튼생성");
//						$("#buttonMakeBtn").show();
//						$("#menuAutoClose2Lev").show();
//					} else {
						//산업분류에서는 버튼생성 삭제
						$("#buttonMakeBtn").hide();
						$("#menuAutoClose2Lev").hide();

						//산업분류를 선택했을 때, 강제로 3depth창을 연다.
						$("#saSubMenu .bottom .stepClose").stop().animate({"right":"-304px"},200);
						$saSubMenu.ui.companyClassView();
//					}

				} else if(tabType[type] == 1) {	//테마업종
					$("#API_0304-a").show();
					this.curSelectedDetailStatsType = "API_0304-a";

					//테마업종에서는 버튼생성 보이기
					$("#buttonMakeBtn").text("테마조건 버튼생성");
					$("#buttonMakeBtn").show();
					$("#menuAutoClose2Lev").show();


					//3Depth 닫기
					//$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
					$("#saSubMenu .step03 .bottom .stepClose").stop().animate({"right":"-25px"},200);
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
					$("#companyClassSearchDiv").stop().animate({"left":"0px"},200);
					$("#companyClassListDiv").stop().animate({"left":"0px"},200);
				}
			},

			/**
			 *
			 * @name         : companyClassView
			 * @description  : 표준산업분류목록 검색 클릭 시.
			 * @date         : 2015. 10. 16.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param type   : 현재 선택된 버튼
			 */
			companyClassView : function(type) {
				console.log("companyClassView");
				//메뉴버튼
				//$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
				$("#companyClassSearchDiv").stop().animate({"left":"0px"},200);
				$("#companyClassListDiv").stop().animate({"left":"360px"},200);
			},

			/**
			 *
			 * @name         : companySearch
			 * @description  : 표준산업분류 검색 시
			 * @date         : 2015. 12. 18.
			 * @author	     : 김성현
			 * @param 		: pageNum 조회할 페이지
			 * @history 	 :
			 */
			companySearch : function(pageNum) {
				if($("#companySearchText").val() == "") {
					messageAlert.open("알림", "검색어를 입력하세요.");
					return;

				} else {
					var companyClassType = "";
					//2000년~2005년 :8차, 2006년~현재 :9차
					if($("#company_year").val() <= 2005) {
						companyClassType = "8";
					} else if($("#company_year").val() > 2005) {
						companyClassType = "9";
					}

					var sopPortalCorpClassSearchObj = new sop.portal.sa.corpClassSearch.api.sa();
					sopPortalCorpClassSearchObj.addParam("class_deg", companyClassType);
					sopPortalCorpClassSearchObj.addParam("searchword", $("#companySearchText").val());
					sopPortalCorpClassSearchObj.addParam("pagenum", pageNum);
					sopPortalCorpClassSearchObj.request({
						method : "POST",
						async : true,
						url : contextPath + "/ServiceAPI/map/interactive/corpClassSearch.json"
					});
				}
			},

			/**
			 * @name         : companyPaging
			 * @description  :	Left메뉴 산업분류 데이터 페이징 처리
			 * @date         : 2015. 12. 18.
			 * @author	     : 김성현
			 * @param 		: totalCount 전체개수,  currentIndex 조회페이지
			 * @history 	 :
			 */
			companyPaging : function(totalCount, currentIndex) {
				var pageSize = 5;
				var totalPage = Math.ceil( totalCount / pageSize);
				$('#corpClassPaging .pages').paging({
					current:currentIndex+1,
					max:totalPage,
					itemClass : 'page',
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						$saSubMenu.ui.corpClassNum = page-1;
						$saSubMenu.ui.companySearch(page-1);
					}
				});
			},

			/**
			 *
			 * @name         : companyTreeShow
			 * @description  : 표준산업분류목록 보이기
			 * @date         : 2015. 10. 27.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			companyTreeShow : function() {
				$("#company_TreeBox").show();
				$("#company_SearchBox").hide();
			},

			/**
			 *
			 * @name         : deleteSearchBtn
			 * @description  : 생성된 조건검색버튼을 삭제한다.
			 * @date         : 2015. 10. 06.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param searchbtnCnt   : 조회버튼 고유값
			 */
			deleteSearchBtn : function(value) {
				var btn_id = $("#dragItem_" + value).find("a").attr("id");
				$("#dragItem_" + value).remove();

				// 삭제된 조회버튼의 파라미터정보를 삭제한다.
				for (var i = 0; i < this.arParamList.length; i++) {
					if (this.arParamList[i].idx == value) {
						this.arParamList.splice(this.arParamList.indexOf(this.arParamList[i]), 1);
						break;
					}
				}

				//지도를 조회한 버튼 아이디 초기화
				if(this.curSearchBtnArray["one"] == btn_id) {
					this.curSearchBtnArray["one"] = "";
				}
				if(this.curSearchBtnArray["two"] == btn_id) {
					this.curSearchBtnArray["two"] = "";
				}
				if(this.curSearchBtnArray["three"] == btn_id) {
					this.curSearchBtnArray["three"] = "";
				}

				//버튼 카운트
				this.getBtnCnt();
			},

			/**
			 *
			 * @name         : bndYearSelectbox
			 * @description  : 조사년도 셀렉트박스 생성.
			 * @date         : 2015. 10. 07.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			bndYearSelectbox : function() {
				console.log("bndYearSelectbox start ...");
				//mng_s 20171018 leekh
				$("#mainIndex_year").append("<option value='2016'>2016년도</option>");
				$("#population_year").append("<option value='2016'>2016년도</option>");
				$("#household_year").append("<option value='2016'>2016년도</option>");
				$("#house_year").append("<option value='2016'>2016년도</option>");
				$("#population_year_combine").append("<option value='2016'>2016년도</option>");
				//mng_s 20171017 leekh
				for(var year = 2015; year >= 2000; year--) { //2016.08.23 권차욱 9월서비스 2010->2015
					if((year % 5) == 0) {
						//주요지표 조사년도
						$("#mainIndex_year").append("<option value="+year+">"+year+"년도</option>");

						//인구조건 조사년도
						$("#population_year").append("<option value="+year+">"+year+"년도</option>");

						//가구조건 조사년도
						$("#household_year").append("<option value="+year+">"+year+"년도</option>");

						//주택조건 조사년도
						$("#house_year").append("<option value="+year+">"+year+"년도</option>");

						//인구+가구+주택 결합조건 조사년도
						$("#population_year_combine").append("<option value="+year+">"+year+"년도</option>");

						//농림어업 조사년도
						$("#3f_year").append("<option value="+year+">"+year+"년도</option>");

					}
				}

				/*
				for (var year = 2015; year >= 2000; year--) {
					if((year % 5) == 0) {
						//농림어업 조사년도
						$("#3f_year").append("<option value="+year+">"+year+"년도</option>");
					}
				}
				*/

				//2016.09.01 권차욱 9월 서비스
				for(var year = parseInt(companyDataYear); year >= 2000; year --) {
					//사업체 조사년도
					$("#company_year").append("<option value="+year+">"+year+"년도</option>");

					// mng_s 2017. 12. 05 j.h.Seok
//					$("#company_year_theme").append("<option value="+year+">"+year+"년도</option>");
					// mng_e 2017. 12. 05 j.h.Seok

					//사업체 주요지표 조사년도
					$("#mainIndex_corp_year").append("<option value="+year+">"+year+"년도</option>");
				}
				// mng_s 2017.12.06 주용민
				for(var year = parseInt(companyDataYear); year >= 2006; year --) {
					$("#company_year_theme").append("<option value="+year+">"+year+"년도</option>");
				}
				// mng_e 2017.12.06 주용민
			},

			/**
			 *
			 * @name         : btnValidationCheck
			 * @description  : 조건버튼으로 만들어진 통계정보에 대한 파라미터정보 유효성 검사.
			 * @date         : 2015. 10. 13.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param curSelectedStatsType : 선택된 통계정보 타입
			 * @param api_id : 선택된 통계정보의 API ID(element id)
			 */
			btnValidationCheck : function(curSelectedStatsType, api_id) {
				//총조사 주요지표
				if(curSelectedStatsType == "mainIndex") {
					var str = "";
					$("input[name='mainIndex_radio']").each(function() {
						if($(this).attr("checked") == "checked") {
							str = "check";
						}
					});
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
					$("#saSubMenu .mainIndex_stepBox2 input[name='mainIndex_check']").each(function() {
						if($(this).attr("checked") == "checked") {
							str = "check";
						}
					});
					/** 2020.07.15[한광희] 월 평균자료 조회시 분석조건 미선택하도록 추가 START */
					if($("#rd_regDt_type02").attr("checked")){
						str = "check";
					}
					/** 2020.07.15[한광희] 월 평균자료 조회시 분석조건 미선택하도록 추가 END */
					if(str == "") {
						messageAlert.open("알림", "분석조건을 선택하세요.");
						return false;
					}
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
				}

				// 인구주택총조사
				else if (curSelectedStatsType == "populationHouse") {
					//인구조건
					if (api_id == "API_0302") {
						var str = "";
						$("input[name='population_gender']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "성별은 필수입니다.");
							return false;
						}

						// 교육정도탭을 열고 미선택 시
						if($("#populationEduTab").hasClass("on")) {
							var eduLevel = $("#populationEduLevel option:selected").val();
							if(eduLevel == "") {
								$("#populationEduTab").click();
							}
						}

						// 혼인정도별 열고 미선택 시
						if($("#populationMarryTab").hasClass("on")) {
							var mrgState = [];
							$("input[name='mrg_state_1']").each(function() {
								if($(this).attr("checked") == "checked") {
									mrgState.push($(this).val());
								}
							});
							if (mrgState.length == 0) {
								$("#populationMarryTab").click();
							}
						}
					}

					//가구조건
					else if (api_id == "API_0305") {
						// 세대구성 열고 미선택 시
						if($("#householdTypeTab").hasClass("on")) {
							var householdType = [];
							$("input[name='household_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									householdType.push($(this).val());
								}
							});
							if (householdType.length == 0) {
								$("#householdTypeTab").click();
							}
						}

						// 점유형태 열고 미선택 시
						if($("#householdOcptnTab").hasClass("on")) {
							var ocptnType = [];
							$("input[name='ocptn_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									ocptnType.push($(this).val());
								}
							});
							if (ocptnType.length == 0) {
								$("#householdOcptnTab").click();
							}
						}
					}

					//주택조건
					else if (api_id == "API_0306") {
						// 주택유형 열고 미선택 시
						if($("#houseTypeTab").hasClass("on")) {
							var houseType = [];
							$("input[name='house_type']").each(function() {
								if($(this).attr("checked") == "checked") {
									houseType.push($(this).val());
								}
							});
							if (houseType.length == 0) {
								$("#houseTypeTab").click();
							}
						}
					}

					//결합조건
					else if(api_id == "API_4011") {
						var str = "";
						$("input[name='rd_combine_base']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "조사 기준은 필수입니다.");
							return false;
						}

						//성별탭을 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#populationGenderTab_combine").hasClass("on")) {
							$("input[name='population_gender_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "성별을 선택하세요.");
								return false;
							}
						}

						// 교육정도탭을 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#populationEduTab_combine").hasClass("on")) {
							var eduLevel = [];
							$("input[name='edulevel_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									eduLevel.push($(this).val());
								}
							});
							if (eduLevel.length == 0) {
								messageAlert.open("알림", "교육정도를 선택하세요.");
								return false;
							}
						}

						// 혼인정도별 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#populationMarryTab_combine").hasClass("on")) {
							var mrgState = [];
							$("input[name='mrg_state_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									mrgState.push($(this).val());
								}
							});
							if (mrgState.length == 0) {
								messageAlert.open("알림", "혼인정도를 선택하세요.");
								return false;
							}
						}

						// 세대구성 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#householdTypeTab_combine").hasClass("on")) {
							var householdType = [];
							$("input[name='household_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									householdType.push($(this).val());
								}
							});
							if (householdType.length == 0) {
								messageAlert.open("알림", "세대구성을 선택하세요.");
								return false;
							}
						}

						// 점유형태 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#householdOcptnTab_combine").hasClass("on")) {
							var ocptnType = [];
							$("input[name='ocptn_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									ocptnType.push($(this).val());
								}
							});
							if (ocptnType.length == 0) {
								messageAlert.open("알림", "점유형태를 선택하세요.");
								return false;
							}
						}

						// 주택유형 열고 미선택 시
						//9월 서비스
						str = "";
						if($("#houseTypeTab_combine").hasClass("on")) {
							var houseType = [];
							$("input[name='house_type_combine']").each(function() {
								if($(this).attr("checked") == "checked") {
									houseType.push($(this).val());
								}
							});
							if (houseType.length == 0) {
								messageAlert.open("알림", "주택유형을 선택하세요.");
								return false;
							}
						}
					}
				}

				// 농림어업총조사
				else if (curSelectedStatsType == "3f") {
					//선택항목이 하나라도 있을 경우 API_0310(가구원 검색)
					if($("#3fGenderTab").hasClass("on") || $("#3fAgeTab").hasClass("on")) {
						api_id = "API_0310";
					} else {	//아닐 경우 API_0307(가구검색)
						api_id = "API_0307";
					}
					this.curSelectedDetailStatsType = api_id;

					//인구조건
					if (api_id == "API_0310") {
						//어가일 경우 해수면, 내수면이 선택되어 있어야 함
						if($("#3fTabDiv > li:eq(2)").hasClass("on")) {
							var str = "";
							$("input[name='3f_fish_ppl']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "해수면어가, 내수면어가 중 하나를 선택하세요.");
								return false;
							}
						}

						if($("#3fGenderTab").hasClass("on")) {
							var str = "";
							$("input[name='3f_gender']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "성별을 선택하세요.");
								return false;
							}
						}
					}
				}

				// 전국사업체조사
				else if (curSelectedStatsType == "company") {
					//산업분류
					if (api_id == "API_0304-b") {
						//사업체수, 종사자수 선택
						var str = "";
						$("input[name='cDataType']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "대상은 필수입니다.");
							return false;
						}

						//산업분류 검색일 경우
						str = "";
						if($("#company_SearchBox").is(":visible")) {
							$("input[name='rd_company_data']").each(function() {
								if($(this).attr("checked") == "checked") {
									str = "check";
								}
							});
							if(str == "") {
								messageAlert.open("알림", "산업분류 목록을 선택하세요.");
								return false;
							}
						}
					}

					//테마업종
					else if (api_id == "API_0304-a") {
						//사업체수, 종사자수 선택
						var str = "";
						$("input[name='cDataType1']").each(function() {
							if($(this).attr("checked") == "checked") {
								str = "check";
							}
						});
						if(str == "") {
							messageAlert.open("알림", "대상은 필수입니다.");
							return false;
						}

						//테마업종 트리 미선택 시
						var isChecked = false;
						$("#themeCodeList").find("input").each(function() {
							if ($(this).attr("checked") == "checked") {
								isChecked = true;
							}
						});
						if (!isChecked) {
							messageAlert.open("알림", "테마코드를 선택하세요.");
							return false;
						}
/*						if(this.curSelectedThemeNode == null || this.curSelectedThemeNode.id.length != 5) {
							messageAlert.open("알림", "테마코드를 선택하세요.");
							return false;
						}*/


					}
				}

				// KOSIS
				else if (curSelectedStatsType == "kosis") {
//					if(saMapEtc.curSelectNodeCheck == false) {
//						messageAlert.open("알림", "항목을 선택하여 주세요.");
//						return false;
//					}
				}

				return true;
			},

			/**
			 *
			 * @name         : commonDataList
			 * @description  : 공공데이터, 나의데이터 목록 가져오기
			 * @date         : 2015. 12. 09.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			commonDataList : function() {
				$publicDataBoard.ui.leftMenuList($saMap.ui);		//공공데이터 목록
				$mydataDataBoard.ui.delegateSetting($saMap.ui);			//나의데이터 세팅
				$publicDataBoard.ui.delegateSetting($saMap.ui);			//공공데이터 세팅
			},

			/**
			 *
			 * @name         : doMaxSize
			 * @description  : 맵을 최대화한다.
			 * @date         : 2015. 11. 02.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doMaxSize : function() {
				$saMap.ui.doMaxSize();
			},


			/**
			 *
			 * @name         : doAddMap
			 * @description  : 맵을 추가한다.
			 * @date         : 2015. 11. 02.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doAddMap : function() {
				$saMap.ui.doAddMap();
			},


			/**
			 *
			 * @name         : doCombineMap
			 * @description  : 범례결합창을 표출한다.
			 * @date         : 2015. 11. 02.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doCombineMap : function() {
				var mapId = parseInt($saMap.ui.curMapId) + 1;
				$saMap.ui.doCombineMap(mapId);
			},


			/**
			 *
			 * @name         : doBookMark
			 * @description  : 북마크를 수행한다.
			 * @date         : 2015. 11. 02.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doBookMark : function() {
				var mapId = parseInt($saMap.ui.curMapId) + 1;
				$saMap.ui.doBookMark(mapId);
			},


			/**
			 *
			 * @name         : doShare
			 * @description  : 공유를 수행한다.
			 * @date         : 2015. 11. 02.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doShare : function() {
				var mapId = parseInt($saMap.ui.curMapId) + 1;
				$saMap.ui.doShare(mapId);
			},


			/**
			 *
			 * @name         : doReport
			 * @description  : 보고서를 생성한다.
			 * @date         : 2015. 11. 02.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doReport : function() {
				var mapId = parseInt($saMap.ui.curMapId) + 1;
				$saMap.ui.reportDataSet(mapId);
			},


			/**
			 *
			 * @name         : doHelp
			 * @description  : 도움말 페이지로 링크한다.
			 * @date         : 2015. 11. 02.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			doHelp : function() {
				messageAlert.open("알림", "준비중입니다.");
			},

			/**
			 *
			 * @name         : updateToolTip
			 * @description  : 툴팁의 메시지를 업데이트한다.
			 * @date         : 2015. 12. 23.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			updateToolTip : function(id, msg) {
					$("#"+id).tooltip({
				    content: msg
				});
			},

			/**
			 *
			 * @name         : showNumberClick
			 * @description  : 통계값 표출유무 버튼 클릭 시
			 * @date         : 2016. 01. 14.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberClick : function() {
				var map_id = $saMap.ui.curMapId;
				var legend = $saMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우 off로 변경
				if(legend.numberData) {
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				} else {	//통계표출 off일 경우 on으로 변경
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				}
				//통계값 표출유무 설정 호출
				legend.showNumberData();

			},

			/**
			 *
			 * @name         : showNumberSetting
			 * @description  : 통계값 표출유무 연동 (범례에서 선택 시, 지도 선택 시)
			 * @date         : 2016. 01. 14.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			showNumberSetting : function() {
				var map_id = $saMap.ui.curMapId;
				//9월 서비스
				if ($saMap.ui.mapList[map_id] == null) {
					return;
				}
				var legend = $saMap.ui.mapList[map_id].legend;
				//통계표출 on일 경우
				if(legend.numberData) {
					$("#showNumberBtn").addClass("on");
					$("#showNumberBtn").text("on");
				} else {	//통계표출 off일 경우
					$("#showNumberBtn").removeClass("on");
					$("#showNumberBtn").text("off");
				}
			},

			//2016.08.23 권차욱 9월 서비스
			/**
			 *
			 * @name         : checkFusionItem
			 * @description  : 조건결합 조건 선택에 따른 기준정보 show/hide
			 * @date         : 2016. 08. 23.
			 * @author	     : 김성현, 권차욱
			 * @history 	 :
			 */
			checkFusionItem : function(e, type) {
				//결합조건 데이터 선택 시 기준 활성화
				var pplFlag = false;		//인구기준 활성화 true/false
				var holdFlag = false;		//가구기준 활성화 true/false
				var houseFlag = false;		//주택기준 활성화 true/false

				//인구기준 활성화 여부
				$("#fusionPopulation").find(".roundTextBox").each(function() {
					var ck = $(this).hasClass("on");
					if ($(this).attr("id") == "populationGenderTab_combine" ||
						$(this).attr("id") == "populationAgeTab_combine"    ||
						$(this).attr("id") == "populationEduTab_combine"    ||
						$(this).attr("id") == "populationMarryTab_combine") {
						if(ck) {
							pplFlag = true;
						}
					}
				});
				if (pplFlag) {
					$("#rd_combine_base01").next().show();
				}else {
					$("#rd_combine_base01").next().hide();
				}

				//가구기준 활성화 여부
				$("#fusionHousehold").find(".roundTextBox").each(function() {
					var ck = $(this).hasClass("on");
					if($(this).attr("id") == "householdTypeTab_combine" || $(this).attr("id") == "householdOcptnTab_combine") {
						if(ck) {
							holdFlag = true;
						}
					}
				});
				if (holdFlag) {
					$("#rd_combine_base02").next().show();
				}else {
					$("#rd_combine_base02").next().hide();
				}

				//주택기준 활성화 여부
				$("#fusionHouse").find(".roundTextBox").each(function() {
					var ck = $(this).hasClass("on");
					if($(this).attr("id") == "houseTypeTab_combine" || $(this).attr("id") == "houseConstYearTab_combine"
							|| $(this).attr("id") == "houseBdspaceTab_combine") {
						if(ck) {
							houseFlag = true;
						}
					}
				});
				if (houseFlag) {
					$("#rd_combine_base03").next().show();
				}else {
					$("#rd_combine_base03").next().hide();
				}

				if (type == "tab") {
					$("#rd_combine_base01").removeAttr("checked");
					$("#rd_combine_base02").removeAttr("checked");
					$("#rd_combine_base03").removeAttr("checked");
					$("#rd_combine_base01").prop("checked", false);
					$("#rd_combine_base02").prop("checked", false);
					$("#rd_combine_base03").prop("checked", false);
					$("#rd_combine_base01").next().removeClass("on");
					$("#rd_combine_base02").next().removeClass("on");
					$("#rd_combine_base03").next().removeClass("on");

					//인구기준 설정
					if ((pplFlag && !holdFlag && !houseFlag) ||
						(pplFlag &&  holdFlag && !houseFlag) ||
						(pplFlag && !holdFlag && houseFlag)  ||
						(pplFlag &&  holdFlag && houseFlag)) {
						$("#rd_combine_base01").attr("checked", "checked");
						$("#rd_combine_base01").prop("checked", true);
						$("#rd_combine_base01").next().addClass("on");
					}
					//가구기준 설정
					else if ((!pplFlag &&  holdFlag && !houseFlag) ||
							  (!pplFlag &&  holdFlag &&  houseFlag)) {
						$("#rd_combine_base02").attr("checked", "checked");
						$("#rd_combine_base02").prop("checked", true);
						$("#rd_combine_base02").next().addClass("on");
					}
					//주택기준 설정
					else {
						$("#rd_combine_base03").attr("checked", "checked");
						$("#rd_combine_base03").prop("checked", true);
						$("#rd_combine_base03").next().addClass("on");
					}
				}

				if (!pplFlag && !holdFlag && !houseFlag) {
					return false;
				}else {
					//체크된 라이오 버튼이 하나밖에 없을 때, 같은 라이오버튼을 누를때 항상 체크되도록 변경
					if ($("input[name='rd_combine_base']:checked").length == 1) {
						if ($("input[name='rd_combine_base']:checked").attr("id") == $(e.target).prev().attr("id")) {
							return false;
						}else {
							return true;
						}
					}else {
						return true;
					}
				}
			},

			/**
			 *
			 * @name         : checkMustItem
			 * @description  : 필수항목에 대한 라이오 버튼처리
			 * @date         : 2016. 10. 04.
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			checkMustItem : function(e, el) {
				//체크된 라이오 버튼이 하나밖에 없을 때, 같은 라이오버튼을 누를때 항상 체크되도록 변경
				if ($("input[name='"+el+"']:checked").length == 1) {
					if ($("input[name='"+el+"']:checked").attr("id") == $(e.target).prev().attr("id")) {
						return false;
					}else {
						return true;
					}
				}else {
					return true;
				}
			},
			/**
			 *
			 * @name         : sqlListBoxPosition
			 * @description  : sqlListBox 위치 처리
			 * @date         : 2017. 04. 21.
			 * @author	     : 이경현
			 * @history 	 :
			 */
			sqlListBoxPosition : function(left) {
				$("#sqlListBox").stop().animate({"left":left},200);
			},
//			/**
//			 *
//			 * @name         : sqlListBoxPosition2
//			 * @description  : sqlListBox 위치 처리
//			 * @date         : 2017. 04. 21.
//			 * @author	     : 이경현
//			 * @history 	 :
//			 */
//			sqlListBoxPosition2 : function(left) {
//				if($("#saMenuAutoClose").attr("checked") != "checked") {
//					$saSubMenu.ui.sqlListBoxPosition(left);
//					$saSubMenu.ui.sqlListBoxLeft = left;
//				}else{
//					$saSubMenu.ui.sqlListBoxPosition("0px");
//					$saSubMenu.ui.sqlListBoxLeft = "0px";
//				}
//			}

			/**
			 * @name         : checkAllDetail
			 * @description  : 세부항목 목록의 전체 체크/해제
			 * @date         : 2018.12.28
			 * @author	     : ywKim
			 * @history 	 :
			 * 	2018.12.28	ywKim	신규 [상세조건선택에서 "전체"선택기능 추가]
			 * @param $pULSelector	: 세부항목 목록의 ul 엘리먼트 셀렉터
			 * @param pValue		: 체크여부 (true, false)
			 */
			checkAllDetail : function($pULSelector, pValue) {
				console.log("checkAllDetail");
				$pULSelector.find("li").each(function() {
					if (pValue) {
						$(this).find("input").prop("checked", true);
						$(this).find("label").addClass("on");
					} else {
						$(this).find("input").prop("checked", false);
						$(this).find("label").removeClass("on");
					}
				});
			},
			/**
			 * @name         : validateAllDetailCheckBox
			 * @description  : 세부항목 목록이 전체 체크/해제되어 있는지 확인후 "전체선택" 체크박스를 자동설정
			 * @date         : 2018.12.28
			 * @author	     : ywKim
			 * @history 	 :
			 * 	2018.12.28	ywKim	신규 [상세조건선택에서 "전체"선택기능 추가]
			 * @param $pULSelector	: 세부항목 목록의 ul 엘리먼트 셀렉터
			 */
			validateAllDetailCheckBox : function($pULSelector) {
				console.log("validateAllDetailCheckBox");
				if ($pULSelector.hasClass("all") == false) {
					console.log("validateAllDetailCheckBox-진행");
					var checkCnt = 0;
					var cnt = $pULSelector.find("li").length;
					var $allUL = $pULSelector.prev();
					$pULSelector.find("li").each(function() {
						var ck = $(this).find("label").hasClass("on");
						if (ck) {
							checkCnt++;
						}
					});

					if (cnt > 0 && cnt == checkCnt) {// 전체 선택된 상태 => "전체" 체크박스 체크
						$allUL.find("input").prop("checked", true);
						$allUL.find("label").addClass("on");
					} else if (cnt == 0 || checkCnt == 0 || cnt != checkCnt) {// 하나라도 선택이 해제된 상태 => "전체" 체크박스 해제
						$allUL.find("input").prop("checked", false);
						$allUL.find("label").removeClass("on");
					} else {

					}
				}
			},
	};

	$saSubMenu.event = {

			marker : null,
			/**
			 *
			 * @name         : setUIEvent
			 * @description  : Left 메뉴 UI에서 사용하는 이벤트 및 초기설정을 수행한다.
			 * @date         : 2015. 10. 06.
			 * @author	     : 김성현
			 * @history 	 :
			 * @param
			 */
			setUIEvent : function() {
				console.log("$saSubMenu.event.setUIEvent() called.");

				// 사용안함 - 2019.01.16	ywKim	변경
//				//슬라이드 세팅
//				this.slideValue("populationAgeFrom", "populationAgeTo", "#slider-range2", "세", 105); //9월서비스 20160729 권차욱 수정 101->105
//				this.slideValue("houseBdspaceFrom", "houseBdspaceTo", "#slider-range3", "㎡", 9); //2016.09.08 9월 추가분
//				this.slideValue("3fAgeFrom", "3fAgeTo", "#slider-range4", "세", 105); //9월서비스 권차욱 수정
//				this.slideValue("populationAgeFrom_combine", "populationAgeTo_combine", "#slider-range2_combine", "세", 105); //9월서비스 20160729 권차욱 수정 101->105
//				this.slideValue("houseBdspaceFrom_combine", "houseBdspaceTo_combine", "#slider-range3_combine", "㎡", 9); //2016.09.08 9월 추가분
				// 2018-12-27 기간설정 추가
				this.slideValue("", "", "#slider-range5", "", 0);

		    	//스크롤 생성
		    	$(".normalBox").mCustomScrollbar({axis:"xy",advanced: { autoExpandHorizontalScroll: true }});
		    	$(".resultSearchListScroll, .sqListBox.sq03 .sqList").mCustomScrollbar({axis:"xy"});

		    	// 임시 - 2018.10.31	ywKim	주석 - normalBox wrmScrollable 로 대체
//		        $(".scrollBox, .dataSideScroll, .scrolls, .mapResultList").mCustomScrollbar({
//		        	axis:"xy",
//		        	callbacks: {
//		        		whileScrolling:function() {
//		        			//2Detph 가 안보이는 버그 해결책
//		        			if($(".quickBox.step02").find(".mCSB_container").position() != undefined) {
//		        				if($(".quickBox.step02").find(".mCSB_container").position().left >= 1000) {
//		        					$(".quickBox.step02").find(".mCSB_container").css("left", "0px");
//			    				}
//		        			}
//		        		}
//		        	}
//		        });

		    	// "전체" 라디오버튼 클릭
		    	// 2018.12.28	ywKim	추가 [상세조건선택에서 "전체"선택기능 추가]
		    	$workRoad.event.set("click", "#saSubMenu ul.multiCheckBox.all label", function(){
		    		console.log("ssaMapFrame.js multiCheckBox.all clicked.");
		    		var ck = $(this).hasClass("on");
		    		var $nextUL = $(this).closest("ul").next();

		    		if (!ck){
		    			$saSubMenu.ui.checkAllDetail($nextUL, true);
		    		} else {
		    			$saSubMenu.ui.checkAllDetail($nextUL, false);
		    		}
		    	});

		        //시도 콤보박스 이벤트
		        $workRoad.event.set("change", "#saSubMenu #current-sido-select", function(){
					//$saSubMenu.event.closeAnimate(2);
					var adm_cd = $(this).val();
					$saSubMenu.ui.getSggList($(this).data("type"), adm_cd, "");
					//$saSubMenu.ui.getCategoryCnt(adm_cd);   // 2017.09.07 [개발팀] 수정
					//$saMap.ui.setMapPosition();	// 해당 지역 이동
				});

				//시군구 콤보박스 이벤트
		        $workRoad.event.set("change", "#saSubMenu #current-sgg-select", function(){
					var sigungu = $("#saSubMenu #current-sgg-select option:selected").attr("data-adm_cd");
					//$saSubMenu.ui.getCategoryCnt(sigungu);
					//$saMap.ui.setMapPosition();	// 해당 지역 이동
				});

				$workRoad.event.set("click", ".themul > li", function() {
		        	console.log("themul > li");
		            var on = $(this).hasClass("on");
		            if (!on) {
		                $(".quickBox.step01").stop().animate({ "left": "-244px" }, 200);
		                $(".quickBox.step02").stop().animate({ "left": "80" }, 200);
		                $(".interactiveBar h3").stop().animate({ "left": "348px" }, 200);
		                $(".nav-sidebar").stop().animate({ "left": "0px" }, 200);
		                $(".step01_stepClose").hide();
		                $(".shadow").hide();
		                $(this).find("span").show();
		                /*$(this).addClass("on").css("width","34px");*/
		            } else {
		                stepCloseAnimate(1);
		                $(this).find("span").show();
		                /*	&(this).removeClass("on").css("width","34px");*/
		            }
		        });
				// 주석: 이벤트 중복 방지 - 2018.11.13	ywKim	변경
//				//통계메뉴 클릭 시
//		        $workRoad.event.set("click", ".sideQuick.sq02", function(){
//					console.log(".sideQuick.sq02");
//					var on = $(this).hasClass("on");
////					if(!on){
//						//$(".sideQuick.sq02").stop().animate({"left":"280px"},200);
//						$(".step01_stepClose").show();
//						$(".quickBox.step01").stop().animate({"left":"0"},200);
//						//$(".shadow").show();
//						$(this).find("span").hide();
//						$(this).addClass("on").css("width","40px");
//						//2017.07.06 추가
//						$(".sideQuick.sq03").addClass("on");
////					}else{
////						$saSubMenu.event.stepCloseAnimate(1, "pass");
////						$(this).find("span").show();
////						//$(this).removeClass("on").css("width","90px");
////						$(".quickBox.step02").removeClass("join");
////					}
//				});
//	2018.10.24	ywKim	이동: saSelectionItem.js
//				//선택항목 클릭 시
//		        $workRoad.event.set("click",".sideQuick.sq03", function(){
//					var isDrag = $(this).hasClass("dragStart");
//					var on = $(this).hasClass("on");
//					if(!on){
//						$(this).addClass("on");
//						if (isDrag) {
//							if ($(this).next(".sqListBox").is(":visible")) {
//								$(".sqListBox.sq03").hide();
//							}else {
//								$(".sqListBox.sq03").show();
//								$("#mCSB_3_container").width("220px");
//								$("#mCSB_4_container").width("220px");
//							}
//						}else {
//							$(".sqListBox.sq03").show();
//							$(this).next(".sqListBox").stop().animate({"left":$saSubMenu.ui.sqlListBoxLeft},200);
//						}
//					}else{
//						$(this).removeClass("on");
//						if (isDrag) {
//							if ($(this).next(".sqListBox").is(":visible")) {
//								$(".sqListBox.sq03").hide();
//							}else {
//								$(".sqListBox.sq03").show();
//								$("#mCSB_3_container").width("220px");
//								$("#mCSB_4_container").width("220px");
//							}
//						}else {
//							$(".sqListBox.sq03").show();
//							$(this).next(".sqListBox").stop().animate({"left":"-550px"},200);
//						}
//					}
//				});

		        // 검색조건 생성 버튼 클릭
		        $workRoad.event.set("click","#saSubMenu #buttonMakeBtn", function() {
		        	$saSubMenu.ui.addSearchBtn();
		        });

		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		        // 검색조건 생성 버튼 클릭2
		        $workRoad.event.set("click","#saSubMenu #buttonMakeBtn2", function() {
		        	$saSubMenu.ui.addSearchBtn();
		        });
		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

		        // 메뉴 자동닫기 버튼 클릭
		        $workRoad.event.set("click","#saSubMenu #saMenuAutoClose label",function(){
		        	$saSubMenu.ui.toggleMenuAutoClose();
		        });

		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		        // 메뉴 자동닫기 버튼 클릭2
		        $workRoad.event.set("click","#saSubMenu #saMenuAutoClose2 label",function(){
		        	$saSubMenu.ui.toggleMenuAutoClose();
		        });
		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		        // 열기 버튼 클릭 시
		        $workRoad.event.set("click","#saSubMenu .bottom .stepOpen",function(){
		        	if(gv_type == "full") {
	        			$('.quickBox.step02').stop().animate({"left":"0px"}, 300);
	        			var lvStep03Left = Number($saSubMenu.ui.saSubMenuKosisDetailDivDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width)-80;
	    				$(".quickBox.step03").stop().animate({"left":lvStep03Left+"px"},300);
	        			var lvWrmSelectionLeft = Number($("#wrmSelection").css("left").replace(/px/g,""));
	        			var lvWrmSelectionLeft2 = Number($saSubMenu.ui.saSubMenuWrmSelectionDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width)-80;
	        			if(lvWrmSelectionLeft < lvWrmSelectionLeft2) $("#wrmSelection").stop().animate({"left":lvWrmSelectionLeft2+"px"}, 300);
						console.log("stepOpen end ... ");
		        	}
		        	else {
		        		var lvWrmSelectionLeft = Number($("#wrmSelection").css("left").replace(/px/g,""));
		        		$workRoadLeftMenu.ui.openAnimate();
		        		var lvWrmSelectionLeft2 = Number($saSubMenu.ui.saSubMenuWrmSelectionDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width);
		        		if(lvWrmSelectionLeft < lvWrmSelectionLeft2) $("#wrmSelection").stop().animate({"left":lvWrmSelectionLeft2+"px"}, 300);
		        	}
		        });
		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

				// 닫기 버튼 클릭 시
		        $workRoad.event.set("click","#saSubMenu .bottom .stepClose",function(){
		        	//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
		        	if(gv_type == "full") {
		        		var ck = $(this).hasClass("on");
		        		//닫을떄
		        		if(!ck) {
		        			$(this).addClass("on");
		        			$(this).css("background-image","url(../../images/workRoad/lnb_open.png)");
		        			$(this).css("left","560px");

		        			$('.quickBox.step02').stop().animate({"left":"-1120px"}, 300);
		        			$('.quickBox.step03').stop().animate({"left":"-560px"}, 0);
							console.log("stepClose end ... ");
		        		}
		        		//열때
		        		else {
		        			$(this).removeClass("on");
		        			$(this).css("background-image","");
		        			$(this).css("left","");

		        			$('.quickBox.step02').stop().animate({"left":"0px"}, 300);
		        			var lvStep03Left = Number($saSubMenu.ui.saSubMenuKosisDetailDivDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width)-80;
		    				$(".quickBox.step03").stop().animate({"left":lvStep03Left+"px"},300);
							console.log("stepOpen end ... ");
		        		}
		        	}
		        	else {
		        		$(this).css({right: '0px'});// 서브메뉴 닫을때 닫기 버튼도 숨긴다. - 2018.11.05	ywKim	추가

		        		//9월 서비스
						var idx = parseInt($(this).index("#saSubMenu .bottom .stepClose")+1);
						if (idx > 3) {
							idx = 3;
						}
						var subLeft = 0;
						//2019-06-21 박길섭 시작
						if(!$(this).hasClass("on")){
							$(".sideQuick.sq02").addClass("on");
							$workRoadLeftMenu.ui.openAnimate();
							subLeft = $("#mCSB_1").width()+$("#quickBox_2depth").width();
						}
						else{
							$saSubMenu.event.stepCloseAnimate(idx, "pass");
							if($(".nav-sidebar").length > 0 )$(".nav-sidebar").stop().animate({ "left": "-80px" }, 200);
							//						$(".bottom .stepClose").stop().animate({"right":"-25px"},200);
							$(".sideQuick.sq02").removeClass("on");
						}
						//2019-06-21 박길섭 끝
						console.log("stepClose end ... ");
			        	$("#wrmSelection").stop().animate({"left":subLeft+"px"}, 0); //20200406 이금은
		        	}
		        	//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			    });



				//조건 상세설정 열고 닫기
		        $workRoad.event.set("click","a.roundTextBox",function(e){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).children("input").prop("checked", true);
						$(this).next(".joinDefault").show();
					}else{
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide();
					}

					//2016.08.23 김성현, 권차욱 9월 서비스
					var fusionCk = $(this).parent().hasClass("joinStepBox");		//조건결합인지 true/false
					if(fusionCk) {
						$saSubMenu.ui.checkFusionItem(e, "tab");
					}
			    });

				//leekh 웹접근성 작업 20150517
				//조건 상세설정 열고 닫기
		        $workRoad.event.set("click","div.roundTextBox",function(e){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).children("input").prop("checked", true);
						$(this).next(".joinDefault").show();
					}else{
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide();
					}

					//2016.08.23 김성현, 권차욱 9월 서비스
					var fusionCk = $(this).parent().hasClass("joinStepBox");		//조건결합인지 true/false
					if(fusionCk) {
						$saSubMenu.ui.checkFusionItem(e, "tab");
					}
				});

				//전국사업체조사 테마업종
		        $workRoad.event.set("click","a.subRoundTextBox",function(){
					var idx = $("a.subRoundTextBox").index(this);
					$("a.subRoundTextBox").each(function(index) {
						if (idx != index) {
							var ck = $(this).hasClass("on");
							if (ck) {
								$(this).removeClass("on");
								$(this).children("input").prop("checked", false);
								$(this).next(".joinDefault").hide();
							}
						}
					});
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).children("input").prop("checked", true);
						$(this).next(".joinDefault").show();
					}else{
						$(this).removeClass("on");
						$(this).children("input").prop("checked", false);
						$(this).next(".joinDefault").hide();
					}
			    });

				// 구인현황분석 > 해당분류 세부항목 선택하기 > 구인현황분석
		        $workRoad.event.set("click",".mainIndex_stepBox label",function(){
					console.log(".mainIndex_stepBox label");
					$(".mainIndex_stepBox label").removeClass("on");
					$(".mainIndex_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					//$(".qmdl dd ul>li").removeClass("on");
			    });

		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		        // 구인현황분석 > 해당분류 세부항목 선택하기 > 구인현황분석2
		        $workRoad.event.set("click","#saSubMenu .mainIndex_stepBox2 .IndexSelect li[class^=index]>a",function(){
		        	//선처리(초기화)
		        	$("#saSubMenu .mainIndex_stepBox2 .IndexSelect li[class^=index]").each(function(){
		        		var lvTempUl = $(this).parent();
			        	var lvTempLi = $(this);
			        	if(lvTempLi.hasClass("M_on")) {
			        		lvTempLi.addClass("M_on2");
			        	}
			        	//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. START
			        	//체크해제
			        	lvTempLi.removeClass("M_on");
			        	lvTempLi.removeClass("M_on2");
			        	lvTempLi.children("input[name='mainIndex_check']").removeAttr("checked");
			        	//2019-08-19 [김남민] 일자리 맵 > 구인 현황분석 > 통계 조회 원복. END
		        	});
		        	$("#saSubMenu #API_WORK-02 .IndexSelect2 div[class^=index]").each(function(){
		        		$(this).hide();
		        	});

		        	//선택 항목 처리
		        	var lvUl = $(this).parent().parent();
		        	var lvLi = $(this).parent();
		        	var lvDataId = $(this).attr("data-id");
		        	var lvDataWidth = $(this).attr("data-width");
		        	var lvIndexSubDiv = $("#API_WORK-02 .IndexSelect2 .index"+lvDataId);

		        	// 선택 항목 처리
		        	if(lvUl.hasClass("IndexSelect")) {
		        		if(lvLi.hasClass("M_on")) {
		        			if($saSubMenu.ui.mainindexStepbox2Idx == lvDataId) {
		        				lvLi.removeClass("M_on");
		        				lvLi.removeClass("M_on2");
		        				$(this).prev().removeAttr("checked");
		        				//접기
		        				//$("#quickBox_2depth").css("width","280px");
		        				$("#quickBox_2depth").stop().animate({"width":"280px"},200);
		        				lvIndexSubDiv.hide();
		        				// 전역 선택 너비 세팅
		    		        	$saSubMenu.ui.saSubMenuApiWork02Width = "0";
		        			}
		        			else {
		        				lvLi.removeClass("M_on2");
		        				// 펼치기
		        				//$("#quickBox_2depth").css("width",(280+Number(lvDataWidth))+"px");
		        				$("#quickBox_2depth").stop().animate({"width":(280+Number(lvDataWidth))+"px"},200);
		        				lvIndexSubDiv.show();
		        				// 전역 선택 너비 세팅
		    		        	$saSubMenu.ui.saSubMenuApiWork02Width = lvDataWidth;
		        			}
		        		} else {
		        			lvLi.addClass("M_on");
		        			lvLi.removeClass("M_on2");
		        			$(this).prev().attr("checked","checked");
		        			// 펼치기
		        			//$("#quickBox_2depth").css("width",(280+Number(lvDataWidth))+"px");
		        			$("#quickBox_2depth").stop().animate({"width":(280+Number(lvDataWidth))+"px"},200);
		        			lvIndexSubDiv.show();
		        			// 전역 선택 너비 세팅
				        	$saSubMenu.ui.saSubMenuApiWork02Width = lvDataWidth;
		        		}
		        	}
		        	// 전역 선택 항목 세팅
		        	$saSubMenu.ui.mainindexStepbox2Idx = lvDataId;

		        	// 닫기 아이콘 (<) 위치 처리
		        	var lvStep03Left = Number($saSubMenu.ui.saSubMenuKosisDetailDivDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width);
		        	if(gv_type == "full") {
		        		lvStep03Left += -80;
		        	}
		        	//$(".quickBox.step03").css("left",lvStep03Left+"px");
					$(".quickBox.step03").stop().animate({"left":lvStep03Left+"px"},200);

	        		$("#wrmSelection").stop().animate({"left":lvStep03Left+"px"}, 0); //20200406 이금은

		        	//선택 항목 상세 데이터 불러오기
		        	//var lvIndexDataUl = lvLi.find("ul.indexData");
		        	var lvIndexDataUl = lvIndexSubDiv.find("ul.indexData");
		        	if(lvIndexDataUl.html() == "") {
		        		//업종별
		        		//직종별
		        		if(lvDataId == "1" || lvDataId == "2") {
		        			//데이터 파라미터
		        			var lvBClassCd = "";
		        			if(lvDataId == "1") lvBClassCd = "INDCLA";
		        			if(lvDataId == "2") lvBClassCd = "RCRJSS";

		        			//데이터 리스트
							var lvDataList = [];
							lvDataList.push({
								cd : "ALL",
								exp : "전체",
								nm : "전체"
							});
							//데이터 목록 조회 (리스트에 담음)
							$.ajax({
								type: "POST",
								url: contextPath + "/ServiceAPI/workRoad/statusAnls/selectCommonCode.json",
								async: false,
								dataType: "json",
								data: {b_class_cd : lvBClassCd},
								success: function(res) {
									if (res.errCd == 0) {
										var lvTempDataList = res.result.commonCdList;
										for(var i = 0; i < lvTempDataList.length; i++) {
											//임금 리스트에 담음
											lvDataList.push({
												cd : lvTempDataList[i].class_code,
												exp : lvTempDataList[i].class_nm,
												nm : lvTempDataList[i].class_nm
											});
										}
									} else {
										alert('failed!');
									}
								} ,
								error:function(err) {
									alert(err.responseText);
								}
							});
							//데이터 리스트로 체크 박스 생성
							for(var i = 0 ; i < lvDataList.length; i++) {
								var lvTempLi = $("<li/>");
								var lvTempInput = $("<input/>");
								var lvTempLabel = $("<label/>");

								var text = lvDataList[i].nm;
								if (lvDataList[i].cnt != 'undefined' && lvDataList[i].cnt > 0) {
									text += " (" + $workRoad.util.addComma(lvDataList[i].cnt) + "건)";
								}
								lvTempLabel.text(text);

								lvTempLabel.attr("data-subj", lvDataList[i].nm);
								lvTempLabel.attr("title", lvDataList[i].exp);

								lvTempInput.attr("type", "checkbox");
								lvTempInput.attr("name", "index"+lvDataId+"Data");
								lvTempInput.attr("id", "index"+lvDataId+"Data_" + i);
								lvTempInput.val(lvDataList[i].cd);

								lvTempLabel.attr("name", "index"+lvDataId+"Data");
								//lvTempLabel.attr("for", "index5Data_" + (i + 1));

								//기본체크(전체)
								if(lvDataList[i].cd == "ALL") {
									lvTempLabel.addClass("on");
									lvTempInput.attr("checked", "checked");
								}

								$(lvTempLi).append(lvTempInput);
								$(lvTempLi).append(lvTempLabel);
								lvIndexDataUl.append(lvTempLi);
							}
		        		}
		        		if(lvDataId == "5") {
		        			//임금 리스트
							var lvDataList = [];
							lvDataList.push({
								cd : "ALL",
								exp : "전체",
								nm : "전체"
							});
							//임금 목록 조회 (리스트에 담음)
							$.ajax({
								type: "POST",
								url: contextPath + "/ServiceAPI/workRoad/selectCommonCode.json",
								async: false,
								dataType: "json",
								data: {b_class_cd : "WAGETY"},
								success: function(res) {
									if (res.errCd == 0) {
										var lvTempDataList = res.result.dataList;
										for(var i = 0; i < lvTempDataList.length; i++) {
											//시급
											if(lvTempDataList[i].cd == "H") {
												//임금 리스트에 담음
												lvDataList.push({
													cd : "WAGETY_"+lvTempDataList[i].cd,
													exp : lvTempDataList[i].exp,
													nm : lvTempDataList[i].nm
												});
											}
										}
										for(var i = 0; i < lvTempDataList.length; i++) {
											//일급
											if(lvTempDataList[i].cd == "D") {
												//임금 리스트에 담음
												lvDataList.push({
													cd : "WAGETY_"+lvTempDataList[i].cd,
													exp : lvTempDataList[i].exp,
													nm : lvTempDataList[i].nm
												});
											}
										}
										for(var i = 0; i < lvTempDataList.length; i++) {
											//월급
											if(lvTempDataList[i].cd == "M") {
												//임금 리스트에 담음
												lvDataList.push({
													cd : "WAGETY_"+lvTempDataList[i].cd,
													exp : lvTempDataList[i].exp,
													nm : lvTempDataList[i].nm
												});
											}
										}
										for(var i = 0; i < lvTempDataList.length; i++) {
											//연봉
											if(lvTempDataList[i].cd == "Y") {
												//임금 리스트에 담음
												lvDataList.push({
													cd : "WAGETY_"+lvTempDataList[i].cd,
													exp : lvTempDataList[i].exp,
													nm : lvTempDataList[i].nm
												});
											}
										}
										for(var i = 0; i < lvTempDataList.length; i++) {
											//임금 리스트에 담음
											/*lvDataList.push({
												cd : "WAGETY_"+lvTempDataList[i].cd,
												exp : lvTempDataList[i].exp,
												nm : lvTempDataList[i].nm
											});*/
											//임금 세부 목록 조회 (리스트에 담음)
											$.ajax({
												type: "POST",
												url: contextPath + "/ServiceAPI/workRoad/selectCommonCode.json",
												async: false,
												dataType: "json",
												data: {b_class_cd : "WGTY_"+lvTempDataList[i].cd},
												success: function(res2) {
													if (res2.errCd == 0) {
														var lvTempDataList2 = res2.result.dataList;
														for(var j = 0; j < lvTempDataList2.length; j++) {
															//임금 리스트에 담음
															lvDataList.push({
																cd : "WGTY_"+lvTempDataList[i].cd+"_"+lvTempDataList2[j].cd,
																exp : lvTempDataList2[j].exp,
																nm : ""+lvTempDataList2[j].nm
															});
														}
													} else {
														alert('failed!');
													}
												} ,
												error:function(err2) {
													alert(err.responseText);
												}
											});
										}
									} else {
										alert('failed!');
									}
								} ,
								error:function(err) {
									alert(err.responseText);
								}
							});
							//임금 리스트로 체크 박스 생성
							for(var i = 0 ; i < lvDataList.length; i++) {
								var lvTempLi = $("<li/>");
								var lvTempInput = $("<input/>");
								var lvTempLabel = $("<label/>");

								var text = lvDataList[i].nm;
								if (lvDataList[i].cnt != 'undefined' && lvDataList[i].cnt > 0) {
									text += " (" + $workRoad.util.addComma(lvDataList[i].cnt) + "건)";
								}
								lvTempLabel.text(text);

								lvTempLabel.attr("data-subj", lvDataList[i].nm);
								lvTempLabel.attr("title", lvDataList[i].exp);

								lvTempInput.attr("type", "checkbox");
								lvTempInput.attr("name", "index5Data");
								lvTempInput.attr("id", "index5Data_" + i);
								lvTempInput.val(lvDataList[i].cd);

								lvTempLabel.attr("name", "index5Data");
								//lvTempLabel.attr("for", "index5Data_" + (i + 1));

								//기본체크(전체)
								if(lvDataList[i].cd == "ALL") {
									lvTempLabel.addClass("on");
									lvTempInput.attr("checked", "checked");
									$(lvTempLi).append(lvTempInput);
									$(lvTempLi).append(lvTempLabel);
									lvIndexSubDiv.find("ul.indexDataMain").append(lvTempLi);
								}
								//기본체크(상위)
								else if(lvDataList[i].cd.indexOf("WAGETY_") >= 0) {
									$(lvTempLi).append(lvTempInput);
									$(lvTempLi).append(lvTempLabel);
									lvIndexSubDiv.find("ul.indexDataMain").append(lvTempLi);
								}
								//기본체크(하위)
								else if(lvDataList[i].cd.indexOf("WGTY_") >= 0) {
									lvTempLabel.addClass("on");
									lvTempInput.attr("checked", "checked");
									//lvTempLi.hide();

									$(lvTempLi).append(lvTempInput);
									$(lvTempLi).append(lvTempLabel);

									var lvTempDataGubun = lvDataList[i].cd.replace(/WGTY_/g, "").charAt(0);
									lvIndexSubDiv.find("ul.indexDataSub"+lvTempDataGubun).append(lvTempLi);
								}
							}
		        		}
		        	}
			    });
		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		        // 구인현황분석 > 해당분류 세부항목 선택하기 > 상세 조건 선택/해제 시 선택항목 초기화2
		        $workRoad.event.set(
		        	"click",
		        	"#saSubMenu #API_WORK-02 .IndexSelect2 .index1 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index2 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index3 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index4 .indexData label"
		        	//+",#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexData label" (따로처리)
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index6 .indexData label"
		        	+",#saSubMenu #API_WORK-02 .IndexSelect2 .index7 .indexData label"
		        , function(){
					//체크&해제
		        	var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}

					//체크박스 제어
					var lvDataName = $(this).prev().attr("name");
					var lvDataValue = $(this).prev().val();
					//전체 인 경우 (전체 이외 체크 해제)
					if(lvDataValue == "ALL") {
						$("#saSubMenu #API_WORK-02 .IndexSelect2 ."+lvDataName.replace(/Data/g,"")+" .indexData input[name='"+lvDataName+"']").each(function(){
							var lvDataName2 = $(this).attr("name");
							var lvDataValue2 = $(this).val();
							// 체크 해제
							if(lvDataValue2 != "ALL") {
								if(!ck) {
									$(this).next().removeClass("on");
									$(this).removeAttr("checked");
								}
							}
						});
					}
					//전체 이외의 경우(전체만 체크해제)
					else {
						var lvAllNFlag = "Y";
						$("#saSubMenu #API_WORK-02 .IndexSelect2 ."+lvDataName.replace(/Data/g,"")+" .indexData input[name='"+lvDataName+"']").each(function(){
							var lvDataName2 = $(this).attr("name");
							var lvDataValue2 = $(this).val();
							// 전체체크 해제
							if(lvDataValue2 == "ALL") {
								if(!ck) {
									$(this).next().removeClass("on");
									$(this).removeAttr("checked");
								}
							}
							if($(this).attr("checked") == "checked") {
								lvAllNFlag = "N";
							}
						});
						if(lvAllNFlag == "Y") {
							$("#saSubMenu #API_WORK-02 .IndexSelect2 ."+lvDataName.replace(/Data/g,"")+" .indexData #"+lvDataName+"_0").next().addClass("on");
							$("#saSubMenu #API_WORK-02 .IndexSelect2 ."+lvDataName.replace(/Data/g,"")+" .indexData #"+lvDataName+"_0").attr("checked", "checked");
						}
					}
				});
		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		        // 구인현황분석 > 해당분류 세부항목 선택하기 > 임금수준별 > 임금수준 상세 조건 선택/해제 시 선택항목 초기화2
		        $workRoad.event.set("click", "#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexData label", function(){
					//체크&해제
		        	var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}

					//펼치기&접기
					var lvDataName = $(this).prev().attr("name");
					var lvDataValue = $(this).prev().val();
					//전체 (펼친거 모두 접고, 최상위 체크 해제)
					if(lvDataName == "index5Data" && lvDataValue == "ALL") {
						$("#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexData input[name='index5Data']").each(function(){
							var lvDataName2 = $(this).attr("name");
							var lvDataValue2 = $(this).val();
							// 하위 펼친거 모두 접음
							/*if(lvDataName2 == "index5Data" && lvDataValue2.indexOf("WGTY_") >= 0) {
								if(!ck) {
									$(this).parent().hide();
									$(this).next().addClass("on");
									$(this).attr("checked", "checked");
								}
							}*/
							// 최상위체크 해제
							if(lvDataName2 == "index5Data" && lvDataValue2.indexOf("WAGETY_") >= 0) {
								if(!ck) {
									$(this).next().removeClass("on");
									$(this).removeAttr("checked");
								}
							}
						});
						// 하위 펼친거 모두 접음
						if(!ck) {
							$("#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexSubDiv").hide();
						}
					}
					//상위
					else if(lvDataName == "index5Data" && lvDataValue.indexOf("WAGETY_") >= 0) {
						var lvAllNFlag = "Y";
						var lvTempDataGubun = lvDataValue.replace(/WAGETY_/g, "").charAt(0);

						//상위 다른거 눌렀을때 체크유지
						if($saSubMenu.ui.saSubMenuIndex5DataGubun != lvTempDataGubun) {
							if(ck) {
								$(this).addClass("on");
								$(this).prev().attr("checked", "checked");
								ck = false;
							}
						}
						$saSubMenu.ui.saSubMenuIndex5DataGubun = lvTempDataGubun;

						lvDataValue = lvDataValue.replace(/WAGETY_/g,"WGTY_");
						$("#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexData input[name='index5Data']").each(function(){
							var lvDataName2 = $(this).attr("name");
							var lvDataValue2 = $(this).val();
							// 하위 펼침
							/*if(lvDataName2 == "index5Data" && lvDataValue2.indexOf(lvDataValue) >= 0) {
								if(ck) {
									$(this).parent().hide();
								}
								else {
									$(this).parent().show();
								}
							}*/
							// 전체체크 해제
							if(lvDataName2 == "index5Data" && lvDataValue2 == "ALL") {
								if(!ck) {
									$(this).next().removeClass("on");
									$(this).removeAttr("checked");
								}
							}
							if($(this).attr("checked") == "checked" && lvDataValue2.indexOf("WAGETY_") >= 0) {
								lvAllNFlag = "N";
							}
						});
						if(lvAllNFlag == "Y") {
							$("#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexData #index5Data_0").next().addClass("on");
							$("#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexData #index5Data_0").attr("checked", "checked");
						}
						// 하위 펼침
						$("#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexSubDiv").hide();
						if(!ck) {
							$("#saSubMenu #API_WORK-02 .IndexSelect2 .index5 .indexSubDiv"+lvTempDataGubun).show();
						}
					}
				});
		        //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END

				// 구인현황분석 > 해당분류 세부항목 선택하기 > 대상 선택하기
		        $workRoad.event.set("click",".mainUnit_stepBox label",function(){
					console.log(".mainUnit_stepBox label");
					$(".mainUnit_stepBox label").removeClass("on");
					$(".mainUnit_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$(".qmdl dd ul>li").removeClass("on");
			    });

		     // 구인현황분석 > 해당분류 세부항목 선택하기 > 임금수준별 > 임금수준 상세 조건 선택/해제 시 선택항목 초기화
		        $workRoad.event.set("click", ".sub05 label", function(){
		        	//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 START
		        	//$(".sub05 label").removeClass("on");
					//$(".sub05 input").removeAttr("checked");
					//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 END
					var tmpId = $(this).prev().attr("id");
		        	var tail = tmpId.substr(10,1);

					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
						//선택 조건 초기화
						for(var i=1; i<5; i++){
							$("#current-salary-select-"+i).val("").prop("selected", true);
						}
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 START
					var lvDataName = $(this).prev().attr("name");
					var lvDataValue = $(this).prev().val();
					if(lvDataName == "WAGETY2" && lvDataValue.indexOf("WAGETY_") >= 0) {
						//밑줄처리
						if(ck) {
							$(this).parent().css("border-bottom-width","");
						}
						else {
							$(this).parent().css("border-bottom-width","0px");
						}

						lvDataValue = lvDataValue.replace(/WAGETY_/g,"WGTY_");
						//펼치기&접기
						$(".sub05 input[name='WAGETY2']").each(function(){
							var lvDataName2 = $(this).attr("name");
							var lvDataValue2 = $(this).val();
							if(lvDataName2 == "WAGETY2" && lvDataValue2.indexOf(lvDataValue) >= 0) {
								if(ck) {
									$(this).parent().hide();
								}
								else {
									$(this).parent().show();
								}
							}
						});
					}
					//2019-05-17 [김남민] 구인현황 분석 > 임금수준(일급, 시급, 연봉 등)은 OR 조건으로 검색이 가능하게 개선 END
				});

				//위치중심 공공데이터 선택
		        $workRoad.event.set("click",".publicData_stepBox label",function(){
					$(".publicData_stepBox label").removeClass("on");
					$(".publicData_stepBox input").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					$(".qmdl2 dd ul>li").removeClass("on");
					$saSubMenu.event.stepCloseAnimate(1, "check");

					//조회 실행
					var type = $(this).prev().val();
					$publicDataBoard.ui.updatePublicData(type);
			    });

				//단일 라디오버튼 선택 (li 안에 input 여러개)
		        $workRoad.event.set("click",".radioStepBox label",function(e){
					//2016.08.23 권차욱 9월 서비스
					if ($(this).prev().attr("name") == "rd_combine_base") {
						if (!$saSubMenu.ui.checkFusionItem(e)) {
							return;
						}
					}else if ($(this).prev().attr("name") == "population_gender" ||
						      $(this).prev().attr("name") == "cDataType"         ||
						      $(this).prev().attr("name") == "cDataType1") {
						var el = $(this).prev().attr("name");
						if (!$saSubMenu.ui.checkMustItem(e, el)) {
							return;
						}
					}
					var ck = $(this).hasClass("on");

					//2016.03.21 수정, 라이오버튼 중복선택 해제방지
//					var elParent = $(this).parent().parent();
//					if (elParent.attr("class").indexOf("validationStepBox") != -1) {
//						if (ck) {
//							return;
//						}
//					}
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });

				//단일 라디오버튼 선택 (li 안에 input 한개)
		        $workRoad.event.set("click",".radioStepOneBox label",function(){
					var ck = $(this).hasClass("on");
					$(this).parent().parent().find("label").removeClass("on");
					$(this).parent().parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().prev().removeAttr("checked");
					}
			    });

				//단일 라디오버튼 선택2 (li 안에 input 한개)
		        $workRoad.event.set("click",".radioStepOneBox2 label",function(){
					var ck = $(this).hasClass("on");
					$(this).parent().parent().find("label").removeClass("on");
					$(this).parent().parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });

				//다중 라디오버튼 선택
		        $workRoad.event.set("click","#saSubMenu ul.multiCheckBox label",function(){
		        	console.log("saSubMenu.js multiCheckBox clicked.");

		        	// 주석 - 2019.01.02	ywKim	변경: 불필요한 코드
//					//mng_s
//					if($saSubMenu.ui.isInnerMapShow2!=undefined && $saSubMenu.ui.isInnerMapShow2) {
//						//주택조건 탭이고 그리드일 경우 단일 선택한다. 가구조건에서는 다중선택임
//						if( $saSubMenu.ui.curSelectedDetailStatsType == "API_0306" ) {
//							$(this).parent().parent().find("label").removeClass("on");
//							$(this).parent().parent().find("input").removeAttr("checked");
//							$(this).addClass("on");
//							$(this).prev().attr("checked", "checked");
//						} else { //다중선택
//							var ck = $(this).hasClass("on");
//							if(!ck){
//								$(this).addClass("on");
//								$(this).prev().attr("checked", "checked");
//							}else{
//								$(this).removeClass("on");
//								$(this).prev().removeAttr("checked");
//							}
//						}
//
//					} else if($saSubMenu.ui.isInnerMapShow3!=undefined && $saSubMenu.ui.isInnerMapShow3) {
//						//주택조건 탭이고 그리드일 경우 단일 선택한다. 가구조건에서는 다중선택임
//						if( $saSubMenu.ui.curSelectedDetailStatsType == "API_0306" ) {
//							$(this).parent().parent().find("label").removeClass("on");
//							$(this).parent().parent().find("input").removeAttr("checked");
//							$(this).addClass("on");
//							$(this).prev().attr("checked", "checked");
//						} else { //다중선택
//							var ck = $(this).hasClass("on");
//							if(!ck){
//								$(this).addClass("on");
//								$(this).prev().attr("checked", "checked");
//							}else{
//								$(this).removeClass("on");
//								$(this).prev().removeAttr("checked");
//							}
//						}
//
//					} else {
						var ck = $(this).hasClass("on");
						if(!ck){
							$(this).addClass("on");
//							$(this).prev().attr("checked", "checked");	// 주석: label태그의 for 속성을 사용했기 때문에 이 코드는 중복됨 - 2019.01.02	ywKim	 변경 [상세조건선택에서 "전체"선택기능 추가]
						}else{
							$(this).removeClass("on");
//							$(this).prev().removeAttr("checked");
						}

						// 2018.12.28	ywKim	추가 [상세조건선택에서 "전체"선택기능 추가]
						var $ul = $(this).closest("ul");
			    		$saSubMenu.ui.validateAllDetailCheckBox($ul);
//					}

					/*
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
					*/

			    });

				//하단 패밀리사이트
		        $workRoad.event.set("click","#bottomService",function(){
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$("#bottomServiceLayer").show();
					}else{
						$(this).removeClass("on");
						$("#bottomServiceLayer").hide();
					}
				});

				//KOSIS 세부조건 확장/축소
		        $workRoad.event.set("click",".hangjungArea .resizeIcon",function(){
					var cls = $(".hangjungArea");
					var ck = cls.hasClass("on");
					if(!ck){
						cls.addClass("on");
					}else{
						cls.removeClass("on");
					}
				});

				//전국사업체조사-테마업종
		        $workRoad.event.set("click",".subRadioStepBox label",function(){
					var idx = $(".subRadioStepBox label").index(this);
					$(".subRadioStepBox label").each(function(index) {
						if (idx != index) {
							var ck = $(this).hasClass("on");
							$(this).parent().find("label").removeClass("on");
							$(this).parent().find("input").removeAttr("checked");
						}
					});
					var ck = $(this).hasClass("on");
					$(this).parent().find("label").removeClass("on");
					$(this).parent().find("input").removeAttr("checked");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
					}
			    });

		        /** 2020.04.22[한광희] 월평균자료 조회 기능 추가 START */
		        // 라디오버튼 선택
		        $workRoad.event.set("click",".radioStepRegDt label",function(){
					$(".radioStepRegDt label").removeClass("on");
					$(".radioStepRegDt label").removeAttr("checked");
					var ck = $(this).hasClass("on");
					if(!ck){
						$(this).addClass("on");
						$(this).prev().attr("checked", "checked");
						// 분석조건 표출
						$("#analsCndDiv01").show();
						$("#analsCndDiv02").show();
					}else{
						$(this).removeClass("on");
						$(this).prev().removeAttr("checked");
						// 분석조건 숨김
						$("#analsCndDiv01").hide();
						$("#analsCndDiv02").hide();
					}

					// 월평균자료 선택에 따른 연도 월 selectBox 활성화/비활성화
					var tempId = $(this).prev().attr("id");
					if(tempId == "rd_regDt_type01"){
						$("#current-year-select").prop("disabled", true);
						$("#current-month-select").prop("disabled", true);

						// 연도 월 selectBox 초기화
						$("#saSubMenu  #current-year-select").empty();
						$("#saSubMenu  #current-year-select").html('<option value="999">전체</option>');
						$("#saSubMenu  #current-month-select").empty();
						$("#saSubMenu  #current-month-select").html('<option value="999">전체</option>');

						// 분석조건 표출
						$("#analsCndDiv01").show();
						$("#analsCndDiv02").show();
					} else {
						$("#current-year-select").prop("disabled", false);
						$("#current-month-select").prop("disabled", false);

						// 연도 selectBox 생성
						$saSubMenu.ui.getRegDtYearList("current", $wrmStatusAnls.ui.today.substring(0, 4), $wrmStatusAnls.ui.today.substring(4, 6));

						// 분석조건 숨김
						$("#analsCndDiv01").hide();
						$("#analsCndDiv02").hide();
						$("#analsCndDiv02>ul>li").removeClass("M_on");	// 분석조건 대분류 class 삭제
						$("#analsCndDiv02>ul>li>input:checkbox[name='mainIndex_check']").attr("checked", false);	// 분석조건 대분류 class 삭제
						// 월평균자료 조회시 분석조건은 업종별 수로 셋팅
						$("#mainIndex_check01").attr("checked", true);
						// 우측 분석조건 선택 접기
			        	$("#saSubMenu #API_WORK-02 .IndexSelect2 div[class^=index]").each(function(){
			        		$(this).hide();
			        	});
			        	$("#quickBox_2depth").css("width","280px");
			        	// 분석조건 상세 초기화
			        	$(".indexData>li>input[type=checkbox]").attr("checked", false);
			        	$(".indexData>li>label").removeClass("on");
			        	$(".indexData>li>input[type=checkbox][value='ALL'").attr("checked", true).parent().find("label").addClass("on");

					}
			    });

		        // 조회기간-연도 콤보박스 이벤트
		        $workRoad.event.set("change", "#saSubMenu #current-year-select", function(){
					var reg_dt_year = $(this).val();
					$saSubMenu.ui.getRegDtMonthList($(this).data("type"), reg_dt_year, "");
				});

				//시군구 콤보박스 이벤트
		        $workRoad.event.set("change", "#saSubMenu #current-month-select", function(){
					var sigungu = $("#saSubMenu #current-month-select option:selected").attr("data-reg_dt_year");
				});
		        /** 2020.04.22[한광희] 월평균자료 조회 기능 추가 END */

				$('#companySearchText').keydown(function(e){
					if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
						$saSubMenu.ui.companySearch(0);
					}
				});

//				//통계메뉴바 자동 닫기
//				$workRoad.event.set("click",".menuAutoClose label",function(){
//					var ck = $(this).hasClass("on");
//					$(".menuAutoClose label").parent().find("label").removeClass("on");
//					$(".menuAutoClose label").parent().find("input").removeAttr("checked");
//					if(!ck){
//						$(".menuAutoClose label").addClass("on");
//						$(".menuAutoClose label").prev().attr("checked", "checked");
//					}else{
//						$(".menuAutoClose label").removeClass("on");
//						$(".menuAutoClose label").prev().removeAttr("checked");
//					}
//			    });

/* 2018.10.24	ywKim	이동: saSelectionItem.js
				//통계버튼창 드래그
				var top = $(".buttonBar").offset().top - 104;
				$(".buttonBar").draggable({
					containment : [0, 100, $(".containerBox").width()-100, $(".containerBox").height()-100],
					start : function(e, ui) {
						var left = $(".sqListBox.sq03").offset().left;
						if (!$(".sideQuick.sq03").hasClass("dragStart") && parseInt(left) < 0) {
							$(".sqListBox.sq03").hide();
						}
						$(".sideQuick.sq03").addClass("dragStart");
						$(".sqListBox.sq03").stop().animate({"left":"0px"},0);
					}
				});
				$(".sqListBox > .sqTabs").dblclick(function() {
					$(".buttonBar").animate({"left":"0px","top":""+top+""}, 50);
					if ($(".sideQuick.sq03").hasClass("dragStart")) {
						$(".sideQuick.sq03").removeClass("dragStart");
					}
				});
*/
				//2016.08.23 권차욱 9월 서비스 -주요지표
				/*$("#mainIndex_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#mainIndex_box2").hide();
						$("#mainIndex_box2 li").each(function() {
							if ($(this).find("label").hasClass("on")) {
								$(this).find("label").removeClass("on");
								$(this).find("label").prev().removeAttr("checked");
							}
						});
					}else {
						$("#mainIndex_box2").show();
					}
				});*/


				//mng_s 20171019 leekh 해당분류 세부항목 선택하기
				$("#mainIndex_year").change(function() {
					if (parseInt(this.value) == 2016) {
						$("#mainIndex_box2").hide();
						$("#mainIndex_box2 li").each(function() {
							if ($(this).find("label").hasClass("on")) {
								$(this).find("label").removeClass("on");
								$(this).find("label").prev().removeAttr("checked");
							}
						});
					}else if(parseInt(this.value) == 2000){
						$("#mainIndex_box2").show();

						$("#li_mainIndex_radio12").hide();
						$("#li_mainIndex_radio13").hide();

					}else {
						$("#mainIndex_box2").show();
						$("#li_mainIndex_radio12").show();
						$("#li_mainIndex_radio13").show();
					}
				});
				//mng_e 20171019 leekh 해당분류 세부항목 선택하기



				//2016.08.23 권차욱 9월 서비스 - 인구통계
				$("#population_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#populationEduTab").hide();
						$("#populationEduTab").next().hide();
						$("#populationMarryTab").hide();
						$("#populationMarryTab").next().hide();
						$("#populationEduTab").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						$("#populationMarryTab").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						if ($("#populationEduTab").hasClass("on")) {
							$("#populationEduTab").click();
						}
						if ($("#populationMarryTab").hasClass("on")) {
							$("#populationMarryTab").click();
						}
					}else {

						// 주석 - 2019.01.02	ywKim	변경: 불필요한 코드
//						//mng_s
//						if( $saSubMenu.ui.isInnerMapShow2!=undefined && $saSubMenu.ui.isInnerMapShow2 ) { //mng_s 그리드일 경우
//							//교육정도별 및 혼인정도별 메뉴는 하이드 상태그래도 유지한다.
//							$("#populationEduTab").hide();
//							$("#populationMarryTab").hide();
//						} else if( $saSubMenu.ui.isInnerMapShow3!=undefined && $saSubMenu.ui.isInnerMapShow3 ) { //mng_s 그리드일 경우
//							//교육정도별 및 혼인정도별 메뉴는 하이드 상태그래도 유지한다.
//							$("#populationEduTab").hide();
//							$("#populationMarryTab").hide();
//						} else {
							$("#populationEduTab").show();
							$("#populationMarryTab").show();
//						}

					}
				});

				//2016.08.23 권차욱 9월 서비스 - 가구통계
				$("#household_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#householdOcptnTab").hide();
						$("#householdOcptnTab").next().hide();
						$("#householdOcptnTab").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});
						if ($("#householdOcptnTab").hasClass("on")) {
							$("#householdOcptnTab").click();
						}
					}else {

						// 주석 - 2019.01.02	ywKim	변경: 불필요한 코드
//						//mng_s
//						if( $saSubMenu.ui.isInnerMapShow2!=undefined && $saSubMenu.ui.isInnerMapShow2 ) { //mng_s 그리드일 경우
//
//							$("#householdOcptnTab").hide();
//
//						} else if( $saSubMenu.ui.isInnerMapShow3!=undefined && $saSubMenu.ui.isInnerMapShow3 ) { //mng_s 그리드일 경우
//
//							$("#householdOcptnTab").hide();
//
//						} else {
							$("#householdOcptnTab").show();

//						}

					}
				});

				//2016.08.23 권차욱 9월 서비스 - 주택통계
				$("#house_year").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#householdOcptnTab").hide();
						$("#houseConstYearTab").hide();
						$("#houseConstYearTab").next().hide();
						$("#houseUsePeriodTab").show();
						$("#houseUsePeriodTab").next().hide();
						if ($("#houseConstYearTab").hasClass("on")) {
							$("#houseConstYearTab").click();
						}
						if ($("#houseUsePeriodTab").hasClass("on")) {
							$("#houseUsePeriodTab").click();
						}
					}else {
						var html = "";
						$("#houseConstYear").empty();
						switch(parseInt(this.value)) {
							case 2005:
                               	html  = '<option value="06">2005년</option>';
                               	html += '<option value="07">2000년~2004년</option>';
                               	html += '<option value="08">1995년~1999년</option>';
                               	html += '<option value="09">1990년~1994년</option>';
                               	html += '<option value="10">1980년~1989년</option>';
                               	html += '<option value="11">1970년~1979년</option>';
                               	html += '<option value="12">1960년~1969년</option>';
                               	html += '<option value="13">1959년 이전</option>';
                               	$("#houseConstYear").append(html);
                               	$("#houseConstYear").val("06"); //2005
								break;
							case 2000:
								html += '<option value="07">2000년~2004년</option>';
                               	html += '<option value="08">1995년~1999년</option>';
                               	html += '<option value="09">1990년~1994년</option>';
                               	html += '<option value="10">1980년~1989년</option>';
                               	html += '<option value="11">1970년~1979년</option>';
                               	html += '<option value="12">1960년~1969년</option>';
                               	html += '<option value="13">1959년 이전</option>';
                               	$("#houseConstYear").append(html);
                               	$("#houseConstYear").val("07"); //2000
								break;
							default:
								html += '<option value="01">2010년</option>';
                               	html += '<option value="02">2009년</option>';
                               	html += '<option value="03">2008년</option>';
                               	html += '<option value="04">2007년</option>';
                               	html += '<option value="05">2006년</option>';
                               	html += '<option value="06">2005년</option>';
                               	html += '<option value="07">2000년~2004년</option>';
                               	html += '<option value="08">1995년~1999년</option>';
                               	html += '<option value="09">1990년~1994년</option>';
                               	html += '<option value="10">1980년~1989년</option>';
                               	html += '<option value="11">1970년~1979년</option>';
                               	html += '<option value="12">1960년~1969년</option>';
                               	html += '<option value="13">1959년 이전</option>';
                               	$("#houseConstYear").append(html);
                               	$("#houseConstYear").val("01"); //2010
								break;
						}

						$("#householdOcptnTab").show();
						$("#houseConstYearTab").show();
						$("#houseConstYearTab").next().hide();
						$("#houseUsePeriodTab").hide();
						$("#houseUsePeriodTab").next().hide();
						if ($("#houseConstYearTab").hasClass("on")) {
							$("#houseConstYearTab").click();
						}
						if ($("#houseUsePeriodTab").hasClass("on")) {
							$("#houseUsePeriodTab").click();
						}
					}
				});

				//2016.08.23 권차욱 9월 서비스 - 결합통계
				$("#population_year_combine").change(function() {
					if (parseInt(this.value) > 2010) {
						$("#populationEduTab_combine").hide();
						$("#populationMarryTab_combine").hide();
						$("#householdOcptnTab_combine").hide();
						$("#householdOcptnTab_combine").hide();
						$("#houseConstYearTab_combine").hide();
						$("#houseUsePeriodTab_combine").show();
						$("#populationEduTab_combine").next().hide();
						$("#populationMarryTab_combine").next().hide();
						$("#houseConstYearTab_combine").next().hide();
						$("#houseUsePeriodTab_combine").next().hide();

						$("#populationEduTab_combine").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});

						$("#populationMarryTab_combine").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});

						$("#householdOcptnTab_combine").next().find("label").each(function() {
							if ($(this).hasClass("on")) {
								$(this).removeClass("on");
								$(this).prev().removeAttr("checked");
							}
						});

						if ($("#populationEduTab_combine").hasClass("on")) {
							$("#populationEduTab_combine").click();
						}

						if ($("#populationMarryTab_combine").hasClass("on")) {
							$("#populationMarryTab_combine").click();
						}

						if ($("#houseConstYearTab_combine").hasClass("on")) {
							$("#houseConstYearTab_combine").click();
						}

						if ($("#houseUsePeriodTab_combine").hasClass("on")) {
							$("#houseUsePeriodTab_combine").click();
						}

						if ($("#householdOcptnTab_combine").hasClass("on")) {
							$("#householdOcptnTab_combine").click();
						}
					}else {
						$("#populationEduTab_combine").show();
						$("#populationMarryTab_combine").show();
						$("#householdOcptnTab_combine").show();
						$("#householdOcptnTab_combine").show();
						$("#houseConstYearTab_combine").show();
						$("#houseConstYearTab_combine").next().hide();
						$("#houseUsePeriodTab_combine").hide();
						$("#houseUsePeriodTab_combine").next().hide();
						if ($("#houseConstYearTab_combine").hasClass("on")) {
							$("#houseConstYearTab_combine").click();
						}
						if ($("#houseUsePeriodTab_combine").hasClass("on")) {
							$("#houseUsePeriodTab_combine").click();
						}
					}
					var html = "";
					$("#houseConstYear_combine").empty();
					switch(parseInt(this.value)) {
						case 2005:
                           	html  = '<option value="06">2005년</option>';
                           	html += '<option value="07">2000년~2004년</option>';
                           	html += '<option value="08">1995년~1999년</option>';
                           	html += '<option value="09">1990년~1994년</option>';
                           	html += '<option value="10">1980년~1989년</option>';
                           	html += '<option value="11">1970년~1979년</option>';
                           	html += '<option value="12">1960년~1969년</option>';
                           	html += '<option value="13">1959년 이전</option>';
                           	$("#houseConstYear_combine").append(html);
                           	$("#houseConstYear_combine").val("06"); //2005
							break;
						case 2000:
							html += '<option value="07">2000년~2004년</option>';
                           	html += '<option value="08">1995년~1999년</option>';
                           	html += '<option value="09">1990년~1994년</option>';
                           	html += '<option value="10">1980년~1989년</option>';
                           	html += '<option value="11">1970년~1979년</option>';
                           	html += '<option value="12">1960년~1969년</option>';
                           	html += '<option value="13">1959년 이전</option>';
                           	$("#houseConstYear_combine").append(html);
                           	$("#houseConstYear_combine").val("07"); //2000
							break;
						default:
							html += '<option value="01">2010년</option>';
                           	html += '<option value="02">2009년</option>';
                           	html += '<option value="03">2008년</option>';
                           	html += '<option value="04">2007년</option>';
                           	html += '<option value="05">2006년</option>';
                           	html += '<option value="06">2005년</option>';
                           	html += '<option value="07">2000년~2004년</option>';
                           	html += '<option value="08">1995년~1999년</option>';
                           	html += '<option value="09">1990년~1994년</option>';
                           	html += '<option value="10">1980년~1989년</option>';
                           	html += '<option value="11">1970년~1979년</option>';
                           	html += '<option value="12">1960년~1969년</option>';
                           	html += '<option value="13">1959년 이전</option>';
                           	$("#houseConstYear_combine").append(html);
                           	$("#houseConstYear_combine").val("01"); //2010
							break;
					}
				});

				$("#mCSB_4_container").width("220px");
			},

			/**
			 *
			 * @name         : stepCloseAnimate
			 * @description  : 왼쪽 메뉴 닫기 애니메이션.
			 * @date         : 2015. 10. 08.
			 * @author	     : 김성현
			 * @param : inx, type (check : 통계메뉴바 자동닫기 체크,		 pass : 강제 닫기)
			 * @history 	 :
			 */
			stepCloseAnimate : function(inx, type){
				$(".quickBox .bottom > a.stepClose").removeClass("on");//2019-06-21 박길섭
				if(type == "check") {
					//통계메뉴바 자동 닫기 선택이 안되어 있을 경우
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
					if(!$saSubMenu.ui.isMenuAutoClose()) {
						if(gv_type == "full") {
							var lvWrmSelectionLeft2 = Number($saSubMenu.ui.saSubMenuWrmSelectionDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width)-80;
		        			$("#wrmSelection").stop().animate({"left":lvWrmSelectionLeft2+"px"}, 0);
			        	}
			        	else {
			        		var lvWrmSelectionLeft2 = Number($saSubMenu.ui.saSubMenuWrmSelectionDefalutLeft)+Number($saSubMenu.ui.saSubMenuApiWork02Width);
			        		$("#wrmSelection").stop().animate({"left":lvWrmSelectionLeft2+"px"}, 0);
			        	}
						return;
					}
					//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
				}
				var time = 300;
			    var fx = '.quickBox';
			    var btn = '.sideQuick.sq02';
			    $(fx).queue("step04", function(){
			    	//$(btn).stop().stop().animate({"left":"840px"},time);
			        $(fx+'.step04').stop().animate({"left":"-560px"}, time);
			    });
			    $(fx).queue("step03", function(){
			        $(fx+'.step04').css({"left":"-560px"});
			        //$(btn).stop().stop().animate({"left":"560px"},time);
			        $(fx+'.step03').css({"left":"25px"});//2019-06-21 박길섭
			        $(fx+'.step02').stop().animate({"left":"-300px"}, time);/* 2018.10.24	ywKim	추가 */
			    });
			    $(fx).queue("step02", function(){
			        $(fx+'.step04').stop().animate({"left":"-560px"}, time);//2019-06-21 박길섭
			        $(fx+'.step03').css({"left":"25px"});//2019-06-21 박길섭
			        //$(btn).stop().stop().animate({"left":"280px"},time);
			        $(fx+'.step02').stop().animate({"left":"-300px"}, time);
			        $(".quickBox.step02").removeClass("join");
			    });
			    $(fx).queue("step01", function(){
			    	$(fx+'.step04').stop().animate({"left":"-560px"}, time);//2019-06-21 박길섭
			        $(fx+'.step03').css({"left":"25px"});//2019-06-21 박길섭
			        $(fx+'.step02').stop().animate({"left":"-560px"}, time);//2019-06-21 박길섭
			       // $(btn).stop().stop().animate({"left":"0"},time).removeClass("on");
			        $(fx+'.step02').stop().animate({"left":"-1120px"}, time);
			        $(fx+'.step01').stop().animate({"left":"-560px"}, time);
			        //$(btn).find("span").show();
			        //$(btn).css("width","90px");
			        $(".shadow").hide();
			    });
			    $(fx).dequeue("step0"+inx);

			    //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
			    // 화면 기준 좌표 변경 - 2019.01.09	ywKim	추가
			    //$workRoad.ui.setCoordX(-1);
			    //$wrmStatusAnls.ui.layout();
			    //2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
			},

			/**
			 *
			 * @name         : slideValue
			 * @description  : 슬라이드 바 컨트롤.
			 * @date         : 2015. 10. 08.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			//2016.09.08 9월 추가분
			slideValue : function(from, to, slider, etc, limit) {
				$workRoad.ui.log("$saSubMenu.ui.slideValue - begin");

				// 2018-12-27 기간설정 추가
				if(slider == "#slider-range5") {
					var domFrom = "#current-term-select-0";
				    var domTo = "#current-term-select";
				    var domSlider = "#slider-range5";

//					20190314 손원웅 추가_기간설정 변경
//				    $(domSlider).slider({
//				        range: true,
//				        min: 0,
//				        max: 4,
//				        step : 1,
//				        values : [0,1,2,3,4],
//				        slide : function(e, ui) {
//				        	// 값
//				        	var lvValueFrom = ui.values[0];
//				        	var lvValueTo = ui.values[1];
//
//				        	// To는 오늘(4) 로 고정
//				        	$(domSlider).slider("values", 1, 4);
//
//				        	// From은 오늘(4) 선택 못함.
//				        	if(lvValueFrom == 4)  {
//				        		$(domSlider).slider("values", 0, 3);
//				        	}
//				        	else {
//				        		var lvValue2To = $(domTo + " option:eq(" + (3 - lvValueFrom) + ")").val();
//					        	$(domTo).val(lvValue2To);
//				        	}
//				        },
//				        start : function(e, ui) {
//				        	// 값
//				        	var lvValueFrom = ui.values[0];
//				        	var lvValueTo = ui.values[1];
//
//				        	// To는 오늘(4) 로 고정
//				        	$(domSlider).slider("values", 1, 4);
//
//				        	// From은 오늘(4) 선택 못함.
//				        	if(lvValueFrom == 4)  {
//				        		$(domSlider).slider("values", 0, 3);
//				        	}
//				        	else {
//				        		var lvValue2To = $(domTo + " option:eq(" + (3 - lvValueFrom) + ")").val();
//					        	$(domTo).val(lvValue2To);
//				        	}
//				        },
//				        stop : function(e, ui) {
//				        	// 값
//				        	var lvValueFrom = ui.values[0];
//				        	var lvValueTo = ui.values[1];
//
//				        	// To는 오늘(4) 로 고정
//				        	$(domSlider).slider("values", 1, 4);
//
//				        	// From은 오늘(4) 선택 못함.
//				        	if(lvValueFrom == 4)  {
//				        		$(domSlider).slider("values", 0, 3);
//				        	}
//				        	else {
//				        		var lvValue2To = $(domTo + " option:eq(" + (3 - lvValueFrom) + ")").val();
//					        	$(domTo).val(lvValue2To);
//				        	}
//				        }
//				    });

				    //2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START
				    $(domSlider).slider({
				        range: true,
				        min: 0,
				        max: 4,
				        step : 1,
				        values : [0,1,2,3,4],
				        slide : function(e, ui) {
				        	// 값
				        	var lvValueFrom = ui.values[0];
				        	var lvValueTo = ui.values[1];

				        	// To는 오늘(4) 로 고정
				        	if(lvValueTo != 4) {
				        		return false;
				        		//$(domSlider).slider("values", 1, 4);
				        	}

				        	// From은 오늘(4) 선택 못함.
				        	if(lvValueFrom == 4)  {
				        		return false;
				        		//$(domSlider).slider("values", 0, 3);
				        	}
				        	else {
				        		var lvValue2To = $(domTo + " option:eq(" + (3 - lvValueFrom) + ")").val();
					        	$(domTo).val(lvValue2To);
				        	}
				        }
				        /*start : function(e, ui) {
				        	// 값
				        	var lvValueFrom = ui.values[0];
				        	var lvValueTo = ui.values[1];

				        	// To는 오늘(4) 로 고정
				        	$(domSlider).slider("values", 1, 4);

				        	// From은 오늘(4) 선택 못함.
				        	if(lvValueFrom == 4)  {
				        		$(domSlider).slider("values", 0, 3);
				        	}
				        	else {
				        		var lvValue2To = $(domTo + " option:eq(" + (3 - lvValueFrom) + ")").val();
					        	$(domTo).val(lvValue2To);
				        	}
				        },
				        stop : function(e, ui) {
				        	// 값
				        	var lvValueFrom = ui.values[0];
				        	var lvValueTo = ui.values[1];

				        	// To는 오늘(4) 로 고정
				        	$(domSlider).slider("values", 1, 4);

				        	// From은 오늘(4) 선택 못함.
				        	if(lvValueFrom == 4)  {
				        		$(domSlider).slider("values", 0, 3);
				        	}
				        	else {
				        		var lvValue2To = $(domTo + " option:eq(" + (3 - lvValueFrom) + ")").val();
					        	$(domTo).val(lvValue2To);
				        	}
				        }*/
				    });
				    //2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END

				    // 기본값
				    //2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START
				    $(domSlider).slider("values", 0, 3);	// 1일
				    $(domSlider).slider("values", 1, 4);	// 오늘
				    //2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END

					// 선택박스(From) (사용안함)
				    $(domFrom).change(function(){
				    });

				    // 선택박스(To)
				    $(domTo).change(function(){
				    	var lvSelectedIndex = $(domTo).prop('selectedIndex');
				    	//2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 START
				    	$(domSlider).slider("values", 0, (3 - lvSelectedIndex));
				    	//2019-06-10 [김남민] 구인현황 분석 > 1주, 1개월, 3개월 등 히든된 기능 안정화 END
				    });

					return;
				}

				// 주석처리: 사용안함 - 2019.01.21	ywKim	변경
//			    var domFrom = "#"+from;
//			    var domTo = "#"+to;
//			    var domSlider = slider;
//			    var min = 1;
//			    //9월서비스 20160729 권차욱 수정
//			    var step = 1;
//			    var tmpValues = null;
//			    var tmpHouseSpaceList = [0, 20, 40, 60, 85, 100, 130, 165, 230, 300];
//			    var values = null;
//
//			    if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
//			    	min = 0;
//
//			    	//9월서비스 20160729 권차욱 수정
//			    	step = 5;
//			    	values = [10, 65];
//			    }else if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
//			    	min = 0;
//
//			    	//9월서비스 20160729 권차욱 수정
//			    	step = 1;
//			    	values = [0, 1];
//			    }
//
//			    var data = 0;
//				for (var i=min; i<=limit; i++) {
//					//9월서비스 20160729 권차욱 수정
//					if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
//						data = i;
//						if (i != 0 && i%5 != 0) {
//							continue;
//						}
//					}
//					var tmpText = i + etc;
//					if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
//						data = tmpHouseSpaceList[i];
//					    tmpText = tmpHouseSpaceList[i]+etc;
//					}
//					if (i == limit) {
//						tmpText = (limit-5)+"+"; //2016.10.19 lbdms
//						if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
//							tmpText = tmpHouseSpaceList[i-1]+"+";
//						}
//					}
//
//			        $(domFrom).append($("<option>", {
//			            value: data,
//			            text : tmpText
//			        }));
//			        $(domTo).append($("<option>", {
//			            value: data,
//			            text : tmpText
//			        }));
//			    }
//
//				if (from == "populationAgeFrom" 		||
//					from == "populationAgeFrom_combine" ||
//					from == "3fAgeFrom") {
//					$(domFrom).val("10");
//			    	$(domTo).val("65");
//				}else {
//					$(domFrom).val("0");
//			    	$(domTo).val("20");
//			    	$("."+from).text("약 "+(0/3.3).toFixed(1)+"평");
//				    $("."+to).text("약 "+(20/3.3).toFixed(1)+"평");
//				}
//
//				//2016.09.09 9월 서비스
//			    $(domFrom).change(function(){
//			    	var spaceTo = $(domTo).val();
//			    	var id = $(this).attr("id");
//
//			    	if (id == "populationAgeFrom" 		  ||
//			    		id == "populationAgeFrom_combine" ||
//			    		id == "3fAgeFrom") {
//				        if (parseInt($(this).val()) >= parseInt(spaceTo)) {
//				        	 $(this).val(parseInt(spaceTo)-5);
//
//				        }
//				        $(domSlider).slider("values", 0, $(this).val());
//			    	}else if (id == "houseBdspaceFrom" ||
//			    			  id == "houseBdspaceFrom_combine") {
//			    		if (parseInt($(this).val()) >= parseInt(spaceTo)) {
//			    			var idx = $(domTo).prop("selectedIndex");
//				    		idx = idx-1;
//				    		var toData = $(domTo+ " option:eq("+idx+")").val();
//				        	$(this).val(toData);
//				        }
//			    		var idx = 0;
//			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
//			    			if (tmpHouseSpaceList[i] == $(this).val()) {
//			    				idx = i;
//			    				break;
//			    			}
//			    		}
//			    		$(domSlider).slider("values", 0, idx);
//			    		$("."+from).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
//			    	}
//
//			    	//2016.09.09 9월 서비스
//			        var fromData = $(this).val();
//			        $(domTo+ " option").each(function() {
//			        	$(this).show();
//			        	if (parseInt(fromData) >= parseInt($(this).val())) {
//			        		$(this).hide();
//			        	}
//			        });
//			    });
//			    //2016.09.09 9월 서비스
//			    $(domTo).change(function(){
//			        var spaceFrom = $(domFrom).val();
//			        var id = $(this).attr("id");
//
//			        if (id == "populationAgeTo" 		||
//				    	id == "populationAgeTo_combine" ||
//				    	id == "3fAgeTo") {
//			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
//				            $(this).val(parseInt(spaceFrom)+5);
//				        }
//
//			        	//2016.10.19 lbdms
//			        	if (parseInt($(this).val()) > 100) {
//			        		$(domTo).hide();
//			        		if (id == "populationAgeTo") {
//			        			$("#ageToText").hide();
//			        		}else if (id == "populationAgeTo_combine") {
//			        			$("#ageToText_combine").hide();
//			        		}else {
//			        			$("#3fAgeToText").hide();
//			        		}
//			        	}else {
//			        		$(domTo).show();
//			        		if (id == "populationAgeTo") {
//			        			$("#ageToText").show();
//			        		}else if (id == "populationAgeTo_combine") {
//			        			$("#ageToText_combine").show();
//			        		}else {
//			        			$("#3fAgeToText").show();
//			        		}
//			        	}
//			        	$(domSlider).slider("values", 1,  $(this).val());
//			        }else if (id == "houseBdspaceTo" ||
//			    			  id == "houseBdspaceTo_combine") {
//			        	if (parseInt($(this).val()) <= parseInt(spaceFrom)) {
//			        		var idx = $(domFrom).prop("selectedIndex");
//				    		idx = idx+1;
//				    		var fromData = $(domFrom+ " option:eq("+idx+")").val();
//				        	$(this).val(fromData);
//			        	}
//			        	var idx = 0;
//			    		for (var i=0; i<tmpHouseSpaceList.length; i++) {
//			    			if (tmpHouseSpaceList[i] == $(this).val()) {
//			    				idx = i;
//			    				break;
//			    			}
//			    		}
//			    		$(domSlider).slider("values", 1, idx);
//			        	$("."+to).text("약 "+($(this).val()/3.3).toFixed(1)+"평");
//			        }
//			    });
//
//			    //2016.09.09 9월 서비스
//			    $(domTo).click(function(){
//			    	 var fromData = $(domFrom).val();
//			    	 $(domTo+ " option").each(function() {
//				        $(this).show();
//				        if (parseInt(fromData) >= parseInt($(this).val())) {
//				        	$(this).hide();
//				        }
//				      });
//			    });
//			    $(domSlider).slider({
//			        range: true,
//			        min: min,
//			        max: limit,
//
//			        //9월서비스 20160729 권차욱 수정
//			        step : step,
//
//			        values : values,
//			        slide : function(e, ui) {
//			        	if (from == "populationAgeFrom" 		||
//			        		from == "populationAgeFrom_combine" ||
//			        		from == "3fAgeFrom" ) {
//			        		//2016.10.19 lbdms
//			        		if (ui.values[1] == limit) {
//			        			$(domTo).hide();
//			        			if (from == "populationAgeFrom") {
//			        				$("#ageToText").hide();
//			        			}else if (from == "populationAgeFrom_combine") {
//			        				$("#ageToText_combine").hide();
//			        			}else {
//			        				$("#3fAgeToText").hide();
//			        			}
//			        		}else {
//			        			$(domTo).show();
//			        			if (from == "populationAgeFrom") {
//			        				$("#ageToText").show();
//			        			}else if (from == "populationAgeFrom_combine") {
//			        				$("#ageToText_combine").show();
//			        			}else {
//			        				$("#3fAgeToText").show();
//			        			}
//			        		}
//
//			        		$(domFrom).val(ui.values[0]);
//						    $(domTo).val(ui.values[1]);
//
//			        	}else if (from == "houseBdspaceFrom"  || from == "houseBdspaceFrom_combine") {
//				        	if (ui.values[1] == limit) {
//				        		$(domTo).hide();
//				        		if (from == "houseBdspaceFrom") {
//				        			$("#houseBdspaceToText").hide();
//								    $(".houseBdspaceToText").hide();
//								    $(".houseBdspaceTo").hide();
//				        		}else {
//				        			$("#houseBdspaceToText_combine").hide();
//								    $(".houseBdspaceToText_combine").hide();
//								    $(".houseBdspaceTo_combine").hide();
//				        		}
//				        	}else {
//				        		$(domTo).show();
//				        		if (from == "houseBdspaceFrom") {
//				        			$("#houseBdspaceToText").show();
//								    $(".houseBdspaceToText").show();
//								    $(".houseBdspaceTo").show();
//				        		}else {
//				        			$("#houseBdspaceToText_combine").show();
//								    $(".houseBdspaceToText_combine").show();
//								    $(".houseBdspaceTo_combine").show();
//				        		}
//				        	}
//
//				        	$(domFrom).val(tmpHouseSpaceList[ui.values[0]]);
//							$(domTo).val(tmpHouseSpaceList[ui.values[1]]);
//							$("."+from).text("약 "+(tmpHouseSpaceList[ui.values[0]]/3.3).toFixed(1)+"평");
//					        $("."+to).text("약 "+(tmpHouseSpaceList[ui.values[1]]/3.3).toFixed(1)+"평");
//				        }
//			        },
//			        //9월서비스 20160729 권차욱 수정
//			        start : function(e, ui) {
//			        	if (from == "populationAgeFrom" 		||
//				        	from == "populationAgeFrom_combine" ||
//				        	from == "3fAgeFrom"         		||
//				        	from == "houseBdspaceFrom"  		||
//				        	from == "houseBdspaceFrom_combine") {
//			        		tmpValues = ui.values;
//			        	}
//			        },
//			        stop : function(e, ui) {
//			        	if (from == "populationAgeFrom" || from == "populationAgeFrom_combine" || from == "3fAgeFrom") {
//			        		if (ui.values[0] == ui.values[1]) {
//			        			if (tmpValues[0] != ui.values[0]) {
//			        				$(domSlider).slider("values", 0, ui.values[1]-5);
//			        				$(domFrom).val(ui.values[1]-5);
//								    $(domTo).val(ui.values[1]);
//			        			}else {
//			        				$(domSlider).slider("values", 1, ui.values[0]+5);
//			        				$(domTo).val(ui.values[0]+5);
//								    $(domFrom).val(ui.values[0]);
//			        			}
//				        	}
//			        	}else if (from == "houseBdspaceFrom" || from == "houseBdspaceFrom_combine") {
//			        		if (ui.values[0] == ui.values[1]) {
//			        			if (tmpValues[0] != ui.values[0]) {
//			        				$(domSlider).slider("values", 0, ui.values[1]-1);
//			        				$(domFrom).val(tmpHouseSpaceList[ui.values[1]-1]);
//								    $(domTo).val(tmpHouseSpaceList[ui.values[1]]);
//			        			}else {
//			        				$(domSlider).slider("values", 1, ui.values[0]+1);
//			        				$(domTo).val(tmpHouseSpaceList[ui.values[0]+1]);
//								    $(domFrom).val(tmpHouseSpaceList[ui.values[0]]);
//			        			}
//				        	}
//			        	}
//			        }
//			    });
 			},

			/**
			 *
			 * @description  : 통계버튼 색상 효과.
			 * @date         : 2015. 10. 14.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			dragAppend : function(selector, bgColor) {
				$(selector).css("background-color", bgColor);
				$(selector).addClass("M_on");
			},
			dragAnimate : function(btn_id, bgColor) {
				var selector = $("#"+btn_id);
				this.dragAppend(selector, bgColor);
			},

			/**
			 *
			 * @description  : 산업분류 목록 트리 width & scroll.
			 * @date         : 2015. 10. 16.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			companyListTreeWidth : function() {
				$("#company_TreeBox").css("width","230px");
			    var stepWidth = $("#company_TreeBox > ul").prop("scrollWidth");
			    $("#company_TreeBox").css({"width":parseInt(stepWidth)+"px"});
			    $(".normalBox").mCustomScrollbar("update");
			},

			/**
			 *
			 * @description  : 테마 목록 트리 width & scroll.
			 * @date         : 2015. 10. 16.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			companyThemeTreeWidth : function() {
				$("#company_themeTreeBox").css("width","230px");
			    var stepWidth = $("#company_themeTreeBox > ul").prop("scrollWidth");
			    $("#company_themeTreeBox").css({"width":parseInt(stepWidth)+"px"});
			    $(".normalBox").mCustomScrollbar("update");
			},

			/**
			 *
			 * @description  : 테마 목록 트리 width & scroll.
			 * @date         : 2015. 10. 16.
			 * @author	     : 김성현
			 * @history 	 :
			 */
			kosisTreeWidth : function() {
				$("#kosisStatsTree").css("width","230px");
				var stepWidth = $("#kosisStatsTree > ul").prop("scrollWidth");
			    $("#kosisStatsTree").css({"width":parseInt(stepWidth)+"px"});
			    $(".normalBox").mCustomScrollbar("update");
			    //IE에서 width가 50이 되는 현상 수정
			    if(stepWidth == 0 || stepWidth == undefined) {
			    	//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
			    	$(".quickBox.step02").find(".mCSB_container").css({"width":"470px"});
			    	//2019-05-29 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
			    } else {
			    	$(".quickBox.step02").find(".mCSB_container").css({"width":(parseInt(stepWidth)) + 50 + "px"});
			    }
			    $(".quickBox.step02").find(".mCSB_container").mCustomScrollbar("update");
			},

			//집계구 번호 검색
			outputAreaSearch : function() {
				if($saSubMenu.event.marker != null){
					$saSubMenu.event.marker.remove();
					$saSubMenu.event.marker = null;
				}
				var tot_reg_cd = $("#outputArea").val().replace(/ /gi,"");
				var regNumber = /^[0-9]*$/;
				if(!regNumber.test(tot_reg_cd)){
					alert('숫자를 입력해주세요.');
					return;
				}
				if(tot_reg_cd.length > 13 || tot_reg_cd.length < 13){
					alert('13자리의 숫자가 맞는지 확인해주세요.');
					return;
				}
				jQuery.ajax({
			 		type:"POST",
			 		url: "/ServiceAPI/map/interactive/outputAreaSearch.json",
			 		data:{
			 				"tot_reg_cd": tot_reg_cd
			 			  },
			 		success:function(res){
			 			var result = res.result;
			 			if(result == undefined){
			 				alert("없는 집계구코드 입니다.");
			 				return;
			 			}
			 			var map = $saMap.ui.mapList[$saMap.ui.curMapId];
			 			map.mapMove([ result.x_coor, result.y_coor ], 10);

// 						//색상지도 표시
//			 			setTimeout(function(){
//							map.geojson.eachLayer(function(layer) {
//								if(layer.feature.properties.adm_cd == tot_reg_cd){
//									layer.setStyle({
//										weight : 5,
//										color : "#0086c6",
//										fillOpacity : 0.5,
//										fillColor : "#9adbf9"
//									});
//								}
//							});
//			 			},500);

			 			// poi 표시
						setTimeout(function(){
							map.geojson.eachLayer(function(layer) {
								if(layer.feature.properties.adm_cd == tot_reg_cd){
									$saSubMenu.event.marker = sop.marker([ result.x_coor, result.y_coor ]);
									$saSubMenu.event.marker.addTo(map.gMap);
									var toolTip  = "<table style='margin:10px;'>";
									toolTip += 		"<tr><td style='font-size: 14px; font-weight:bold; color:#3792DE;'>" + layer.feature.properties.adm_nm+"</td></tr>";
									toolTip += 		"<tr style='height:5px;'></tr>";
									toolTip += 		"<tr><td style='font-size: 12px; padding-left: 5px;'>집계구 : " + layer.feature.properties.adm_cd+"</td></tr>";
									toolTip +=		"</table>";
									$saSubMenu.event.marker.bindToolTip(toolTip,{
										minWidth:200,
										maxWidth:200,
										maxHeight:500
									});
								}
							});
						},500);
			 		}
				});
			}
	};

	// 최초 한번만 설정되도록 하는 코드임 - 2018.10.17	ywKim	추가
	if ($workRoad.ui.isSetCallback('saSubMenu')) return;

	/** ********* 산업분류 검색 목록 Start ********* */
	$class("sop.portal.sa.corpClassSearch.api.sa").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			$("#company_TreeBox").hide();
			$("#company_SearchBox").show();
			if(res.errCd == "0") {
				//총 개수
				$("#companySearchCount").text(result.totalcount);
				$("#companySearchDataList").html("");
				var html = "";
				for(var i = 0; i < result.dataList.length; i ++) {
					var data = result.dataList[i];
					html += "<li>";
					html += "	<input type='checkbox' name='rd_company_data' id='rd_company_data_"+(i+1)+"' value='"+data.class_code+"' />";
					html += "	<label for='rd_company_data_"+(i+1)+"'>"+data.class_nm+"</label>";
					html += "</li>";
				}
				$("#companySearchDataList").html(html);

				if(result.totalcount > 5){
	    			var htmlPage = "<br><br><br><div id='corpClassPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span></div>";
	    			$("#companyTablePage").html(htmlPage);
	    		}
	    		$saSubMenu.ui.companyPaging(result.totalcount, $saSubMenu.ui.corpClassNum);
			} else {
				//총 개수
				$("#companySearchCount").text(0);
				$("#companySearchDataList").html("");
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* 산업분류 검색 목록 End ********* */

	/** ********* 구인자료 현황 - 산업분류 조회 Start ********* */
	$class("sop.portal.sa.workIndustClassData.api").extend(sop.portal.absAPI).define({
		onSuccess : function (status, res, options) {
			var result = res.result;
			var setIdDefind = "";


			//$("#company_TreeBox").hide();
			//$("#company_SearchBox").show();
			if(res.errCd == "0") {
				//총 개수
				//$("#companySearchCount").text(result.totalcount);
				console.log("options : " + options.params[0].key);
				var b_class_cd = options.params[0].value;
				console.log("b_class_cd : " + b_class_cd);
				var html = "";

				if(b_class_cd == 'INDCLA'){
					setIdDefind = "setWorkIndustClassData";
				}else if(b_class_cd == 'RCRJSS'){
					setIdDefind = "setWorkOccupationClassData";
				}

				$("#"+setIdDefind).html("");
				for(var i = 0; i < result.commonCdList.length; i ++) {
					var data = result.commonCdList[i];

					if(b_class_cd == 'INDCLA'){
						html += "<li>";
						html += "	<input type='checkbox' name='INDCLA' id='rd_indclaP"+(i+1)+"' value='"+data.class_code+"' />";
						html += "	<label for='rd_indclaP"+(i+1)+"'>"+data.class_nm+"</label>";
						html += "</li>";
					}else if(b_class_cd == 'RCRJSS'){
						html += "<li>";
						html += "	<input type='checkbox' name='RCRJSS' id='rd_rcrjssP"+(i+1)+"' value='"+data.class_code+"' />";
						html += "	<label for='rd_rcrjssP"+(i+1)+"'>"+data.class_nm+"</label>";
						html += "</li>";
					}
				}

				$("#"+setIdDefind).html(html);

				// 항목 텍스트가 길어서 짤리는 경우 title속성에 추가 - 2019.01.14	ywKIm	추가
				$("#"+setIdDefind).find("label").each(function(){
					if ($(this).text().length > 23) {
						$(this).attr("title", $(this).text());
					}
				});

			} else {
				//총 개수
				//$("#companySearchCount").text(0);
				$("#"+setIdDefind).html("");
			}
		},
		onFail : function (status) {
		}
	});
	/** ********* 구인자료 현황 - 산업분류 조회 End ********* */

}(window, document));