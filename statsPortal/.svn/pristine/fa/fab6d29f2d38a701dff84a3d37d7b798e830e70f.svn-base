document.write("<script src='https://code.highcharts.com/stock/highstock.js'></script>");
document.write("<script src='https://code.highcharts.com/stock/modules/exporting.js'></script>");
//document.write("<script src='https://code.highcharts.com/stock/modules/accessibility.js'></script>");
document.write("<script src='/js/workRoad/plugin/Highcharts-6.1.1/code/modules/accessibility.js'></script>");
document.write("<script src='https://code.highcharts.com/highcharts-more.js'></script>");

/**
 * 총조사시각화 상세페이지
 * 
 * history : 
 * 2020.10.06			총조사시각화 상세페이지
 * 
 * 
 * author : 한광희
 * version : 1.0
 * see : 
 *
 */

//bndYear = "2018"; 

(function(W, D) {
	W.$inMoreDetail = W.$inMoreDetail || {};
	
	let flag = 0;
	$(document).ready(function() {
		//srvLogWrite("P0", "09", "01", "00", $totSurvMain.ui.selectedThema, "");
		
		$(document).on("click", ".chartBtnMore", function() {
			let chartDiv = $(this).parent().parent().parent().find("[id$=Chart]").prop("id");
			if(chartDiv == "inMoreDetailCorpCountOfIndustryChart") {
				highChartModal($inMoreDetail.data.chart1, $inMoreDetail.ui.dispOptions[$("#chrItmList option:selected").data("chartord")]);
			} else if(chartDiv == "timeSeriesCorpCountIndustryChart") {
				highChartModal($inMoreDetail.data.chart2, "year");
			} else if(chartDiv == "industryOfAreaChart") {
				highChartModal($inMoreDetail.data.chart3, "area");
			}
		});
		
		Highcharts.getSVG = function (charts, options, callback) {
		    var svgArr = [],
		        top = 0,
		        width = 0;
		        addSVG = function (svgres) {
		            // Grab width/height from exported chart
		            var svgWidth = +svgres.match(
		                    /^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/
		                )[1],
		                svgHeight = +svgres.match(
		                    /^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/
		                )[1],
		                // Offset the position of this chart in the final SVG
		                svg = svgres.replace('<svg', '<g transform="translate(0,' + top + ')" ');
		            svg = svg.replace('</svg>', '</g>');
		            top += svgHeight;
		            width = Math.max(width, svgWidth);
		            svgArr.push(svg);
		        },
		        exportChart = function (i) {
		            if (i === charts.length) {
		                return callback('<svg height="' + top + '" width="' + width +
		                  '" version="1.1" xmlns="http://www.w3.org/2000/svg">' + svgArr.join('') + '</svg>');
		            }
		            charts[i].getSVGForLocalExport(options, {}, function () {
		                console.log("Failed to get SVG");
		            }, function (svg) {
		                addSVG(svg);
		                
		                return exportChart(i + 1); // Export next only when this SVG is received
		            });
		        };
		    exportChart(0);
		};

		/**
		 * Create a global exportCharts method that takes an array of charts as an argument,
		 * and exporting options as the second argument
		 */
		Highcharts.exportCharts = function (charts, options) {
		    options = Highcharts.merge(Highcharts.getOptions().exporting, options);

		    // Get SVG asynchronously and then download the resulting SVG
		    Highcharts.getSVG(charts, options, function (svg) {
		        Highcharts.downloadSVGLocal(svg, options, function () {
		            console.log("Failed to export on client side");
		        });
		    });
		};
		
		// Set global default options for all charts
		Highcharts.setOptions({
			chart: {
				events: {
					load: function() {
						$("svg.highcharts-root title[id^=highcharts-title-]").remove();
					}
				}
			},
		    exporting: {
		        fallbackToExportServer: false // Ensure the export happens on the client side or not at all
		    }
		});
	});
	
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {
		$inMoreDetail.ui.detailDivResize();
		
		if($totSurvMain.ui.chartTarget != ""
			&& typeof($totSurvMain.ui.chartIndex) == "number"
			&& $totSurvMain.ui.chartColor != ""){
			 
			$inMoreDetail.ui.chartSelectedSave("", "", "", "", "Y",  "");
		}
	});

	$inMoreDetail.chartsOption = {
		color: ["#f08246", "#009589"]
	};
	
	$inMoreDetail.const = {},	
	$inMoreDetail.data = {},
	$inMoreDetail.mapper = { "DT_1KI1509": { "org_id": "101", "tbl_id": "DT_1KI2001", "year": "2010"}, "DT_1KI1510": {"org_id": "101", "tbl_id": "DT_1KI2002", "year": "2010"},"DT_1KI1511": {"org_id": "101", "tbl_id": "DT_1KI2003", "year": "2010"},"DT_1KI1512": {"org_id": "101", "tbl_id": "DT_1KI2004", "year": "2010"},"DT_1KI1513": {"org_id": "101", "tbl_id": "DT_1KI2005", "year": "2010"},"DT_1KI1514": {"org_id": "101", "tbl_id": "DT_1KI2006", "year": "2010"},"DT_1KI1515": {"org_id": "101", "tbl_id": "DT_1KI2007", "year": "2010"},"DT_1KI1516": {"org_id": "101", "tbl_id": "DT_1KI2008", "year": "2010"}},
	$inMoreDetail.selectedCategory = "",
	$inMoreDetail.chart4 = {};
	$inMoreDetail.ui = {
		ajax : {},
		dispOptions: {},
		befDispOptions: {},
		selectedOrgId : "",
		selectedTblId : "",
		selectedCharItmId : "",
		selectedType : "",
		selectedChartOrd : 1,
		selectedObj : [],
		chartClickItmCd : "",
		// 대분류 : 인구, 가구, 주택, 농업, 임업, 어업
		bigThema : {'인구':'listMainTitle00.png', '가구':'listMainTitle01.png', '주택':'listMainTitle02.png', '농업':'listMainTitle03.png', '임업':'listMainTitle04.png', '어업':'listMainTitle05.png'},
		subThema : {"1인가구":"STHEMA00.png", "1인가구(20%표본)":"STHEMA01.png", "가축":"STHEMA02.png",
					"경력단절(20%표본)":"STHEMA03.png", "경제활동(20%표본)":"STHEMA04.png", "고령자(20%표본)":"STHEMA05.png",
					"국내인구이동통계":"STHEMA06.png", "국내인구이동통계(20%표본)":"STHEMA07.png", "내수면어업":"STHEMA08.png",
					"농가":"STHEMA09.png", "농가인구":"STHEMA10.png", "농업":"STHEMA11.png", "농업종사가구원":"STHEMA12.png",
					"다문화가구":"STHEMA13.png", "미혼모, 미혼부":"STHEMA14.png", "사회활동(20%표본)":"STHEMA15.png", 
					"산업·직업(20%표본)":"STHEMA16.png", "어가":"STHEMA17.png", "어가인구":"STHEMA18.png", "어선":"STHEMA19.png",
					"어업종사가구원":"STHEMA20.png", "여성·아동(20%표본)":"STHEMA21.png", "영유아 자녀양육 가구":"STHEMA22.png",
					"외국인":"STHEMA23.png", "외국인(20%표본)":"STHEMA24.png", "육림업,벌목업,양묘업,채취업 임가":"STHEMA25.png",
					"육림업,벌목업,양묘업,채취업 종사 가구원":"STHEMA26.png", "육림업,벌목업,양묘업,채취업임가":"STHEMA25.png", "임가인구":"STHEMA27.png",
					"인구밀도":"STHEMA28.png", "임차료(20%표본)":"STHEMA29.png", "자녀수별 가구":"STHEMA30.png", "작물":"STHEMA31.png",
					"재배임산물":"STHEMA32.png", "전수기본표":"STHEMA33.png", "전체임가":"STHEMA34.png", "주거실태(20%표본)":"STHEMA35.png",
					"주택총조사 총괄(1975년~2010년)":"STHEMA36.png", "총조사가구 총괄(1980년~2010년)":"STHEMA37.png", "총조사인구 총괄(1925년~2010년)":"STHEMA38.png",
					"전수부문(등록센서스,2015년 이후)":"STHEMA39.png", "출산시기(20%표본)":"STHEMA40.png", "통근통학(20%표본)":"STHEMA41.png", 
					"표본기본표":"STHEMA42.png", "한부모가구":"STHEMA43.png", "해수면어업":"STHEMA44.png", "활동제약(20%표본)":"STHEMA45.png", "표본(20%)부문 (2015년)":"STHEMA46.png"
				   },
		
		/**
		 * @name         : init 
		 * @description  : 최초 화면을 초기화(각 화면을 로딩)
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		init : function(){
			//$totSurvMain.ui.removeContent();
			//$totSurvMain.ui.appendContent("/view/totSurv/inMoreDetail/main");
			$inMoreDetail.ui.pageReadyYnFlag = "Y";	// 화면 로딩 후 메뉴 재 조회 방지 플래그
		},
		
		/**
		 * @name         : ready 
		 * @description  : 최초 화면을 초기화(각 화면을 로딩)
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		ready : function() {
			$inMoreDetail.ui.ajax.params = {			
				surv_year_list: $totSurvMain.ui.selectedYear				// 수록시점
				, org_id_list: $inMoreDetailMap.ui.selectedOrgId					// 조직번호
				, tbl_id_list: $inMoreDetailMap.ui.selectedTblId					// 통계표 ID
				, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
				, char_itm_id_list: $inMoreDetailMap.ui.selectedChrItmId			// 표특성항목
				, prt_type: ""												// 출력방식 total:계 else 모두
				, adm_cd: $inMoreDetailMap.ui.selectedAdmCd						// 지역코드
				, ov_l1_list: $inMoreDetailMap.ui.selectedItmLv1					// 항목 1
				, ov_l2_list: $inMoreDetailMap.ui.selectedItmLv2					// 항목 2
				, ov_l3_list: $inMoreDetailMap.ui.selectedItmLv3					// 항목 3
				, ov_l4_list: $inMoreDetailMap.ui.selectedItmLv4					// 항목 4
				, ov_l5_list: $inMoreDetailMap.ui.selectedItmLv5					// 항목 5
				, category: $inMoreDetailMap.ui.category							// 카테고리
				, odr_col_list: "DTVAL_CO"									// 정렬기준
				, odr_type: "DESC"											// 내림차순, 오름차순
			}	
			
			var mapHtml ="<div id='mapRgn_detail' style='height: 790px;'></div>"; // 2020.11.19[신예리] 영역 높이 수정
				mapHtml += '<div class="ControllBtnWrap">';
				/*mapHtml += '	<button type="button" class="mapExport" title="지도 확장"></button>';
				mapHtml += '	<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>';
				mapHtml += '	<button type="button" class="out" id="pOut" title="지도 축소"></button>';
				*/
				mapHtml += '</div>';

			$("#mapArea").html(mapHtml);
			
			$inMoreDetailMap.ui.createMap("mapRgn_detail", 0);			
			//$inMoreDetailMap.ui.drawMapData("sido", "color"); // 맵 그리기
			if($inMoreDetailMap.ui.map!=null) {						
				$inMoreDetailMap.ui.map.update();
			}	
		},
		
		/**
		 * @name         : clear
		 * @description  : 화면 초기화
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		clear : function(){
			// 관심주제 영역 숨기기
			if($("#subThemaMore").is(":visible") == false){
				$("[id^=subIcon]").hide();
				$('#subThemaHide').hide();  // 숨기기
				$('#subThemaMore').show();  // 더보기				
			}
			
			// 선택된 개수 초기화
			$('#detailSelListCnt').text("0");
			$inMoreDetail.ui.page = 1;	// 페이징 초기화
			// 정렬 초기화
			$inMoreDetail.ui.orderTypeNm = "default";
			$inMoreDetail.ui.orderType = "ASC";
			$inMoreDetail.ui.selectSubThemaList = [];	// 선택한 관심주제 초기화
			$inMoreDetailMap.ui.mapToggleId = "";	// 맵 토클 id
			// 관심주제 이미지 초기화
			$(".InterestBtnWrap li").removeClass("on");
			$(".InterestBtnWrap li").removeClass("dis");
			$(".InterestBtnWrap li").addClass("dis");
			$inMoreDetail.ui.selectTotSurvDataList = []	// 선택한 총조사 목록 초기화
			$("#inMoreDetailDataDiv").empty();	// 선택한 조사표 초기화
			// 상세영역 패널 초기화 및 문구/이미지 설정
			$("#inMoreDetailDataDiv").append(
			     $("<div/>", {"class":"DataNoneDetail", "id":"DataNoneDetail"}).append(
			        $("<img/>", {"src":"/images/totSurv/detailDataNoselect.png", "alt":"결과 목록을 선택해 주세요."}),
			        $("<p/>", {"text":"관심주제 설정에 따른 총조사 결과 목록을 선택해 주세요."})
			     )
			);
			
			// 차트 클릭 관련 초기화
			$inMoreDetail.ui.chartSelectedItemClear();
			// 차트 데이터 초기화
			$inMoreDetail.ui.chartDataClear();
		},
		
		/**
		 * @name         : detailDivResize 
		 * @description  : 상세화면 div 리사이즈
		 * @date         : 2020.10.16
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		detailDivResize : function(){
			//20201126 박은식 다른 대시보드에서 resize시 실행방지 처리 START
			if($totSurvMain.ui.pageIndex == 0){
				var survId = $(".subDetailContainer").eq(0).attr("data-id");
				$("#"+survId+"ItemChart").empty();	// 주제별 차트 초기화
				$("#"+survId+"AreaChart").empty();	// 지역비교 차트 초기화
				$("#"+survId+"TimeChart").empty();	// 시계열 차트 초기화
				$("#"+survId+"UpperAreaChart").empty();	// 상위지역비교 차트 초기화
				if($inMoreDetailMap.ui.map != undefined && $inMoreDetailMap.ui.map!=null && $inMoreDetailMap.ui.map!=""){ //20201118 박은식 undefined 조건 추가 (맵 확대, 추소시 에러 표출 수정)
					$inMoreDetailMap.ui.map.update();
				}
				$inMoreDetail.ui.chartDIVReset(survId);
			}
			//20201126 박은식 다른 대시보드에서 resize시 실행방지 처리 END
		},
						
		
		/**
		 * @name         : getAreaSido 
		 * @description  : 지역선택 팝업 시도 불러오기
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getAreaSido : function(p_sido_cd) {
			// 기본값(전체)
			$("#detail_sido").html("");
			if(p_sido_cd == "99"){
				$("#detail_sido").html("<option value=\"99\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\" selected=\"selected\">전국</option>");				
			} else {
				$("#detail_sido").html("<option value=\"99\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전국</option>");
			}
			
			//기존에 저장된 정보 있음
			if($inMoreDetail.ui.areaSidoData[$inMoreDetail.ui.bndYear] != undefined) {
				//시도 목록 추가
				var lvResultList = $inMoreDetail.ui.areaSidoData[$inMoreDetail.ui.bndYear];
				for(var i = 0; i < lvResultList.length; i++) {
					$("#detail_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
				}
				
				$inMoreDetail.ui.getAreaSgg($("#detail_sido option:selected").val(), "999");
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year: $("#tmsYears option:selected").val()
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시도 목록 저장
						$inMoreDetail.ui.areaSidoData[$inMoreDetail.ui.bndYear] = res.result.sidoList;
						
						//시도 목록 추가
						var lvResultList = res.result.sidoList;
						for(var i = 0; i < lvResultList.length; i++) {
							$("#detail_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
						}
						
						$inMoreDetail.ui.getAreaSgg($("#detail_sido option:selected").val(), "999");
					}else if(res.errCd == "-401") {
						//commonTotSurv_alert(res.errMsg);
					}else{
						//commonTotSurv_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//commonTotSurv_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
			}
		},
		
		/**
		 * @name         : getAreaSgg
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getAreaSgg : function(p_sido_cd, p_sgg_cd) {
			// 기본값(전체)
			$("#detail_sgg").html("");
			if(p_sgg_cd == "999"){
				$("#detail_sgg").html("<option value=\"999\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\" selected=\"selected\">전체</option>");				
			} else {
				$("#detail_sgg").html("<option value=\"999\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전체</option>");
			}
						
			//기존에 저장된 정보 있음
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && $inMoreDetail.ui.areaSggData[$inMoreDetail.ui.bndYear+p_sido_cd] != undefined) {
				//시군구 목록 추가
				var lvResultList = $inMoreDetail.ui.areaSggData[$inMoreDetail.ui.bndYear+p_sido_cd];
				for(var i = 0; i < lvResultList.length; i++) {
					$("#detail_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
				}
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year: $("#tmsYears option:selected").val(),
				    	sido_cd:p_sido_cd,
				    	is_interactive:"Y"
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시군구 목록 저장
						if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") {
							$inMoreDetail.ui.areaSggData[$inMoreDetail.ui.bndYear+p_sido_cd] = res.result.sggList;
						}
						
						//시군구 목록 추가
						var lvResultList = res.result.sggList;
						for(var i = 0; i < lvResultList.length; i++) {
							$("#detail_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
						}
					}else if(res.errCd == "-401") {
						//$statsMeMain.ui.alert(res.errMsg);
					}else{
						//$statsMeMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
			}
		},
		
		/**
		 * @name         : getAreaPopupSido 
		 * @description  : 지역선택 팝업 시도 불러오기
		 * @date         : 2020.10.23
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getAreaPopupSido : function(p_sido_cd) {
			// 지역선택 팝업
			$("#areaPopup_sido").html("");
			if(p_sido_cd == "99"){
				$("#areaPopup_sido").html("<option value=\"99\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\" selected=\"selected\">전국</option>");				
			} else {
				$("#areaPopup_sido").html("<option value=\"99\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전국</option>");
			}
			
			// ajax 시작
			$.ajax({
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
			    type: 'post',
			    dataType : 'json',
			    async: false,
			    data: {
			    	base_year: $("#tmsYears option:selected").val()
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					//시도 목록 추가
					var lvResultList = res.result.sidoList;
					for(var i = 0; i < lvResultList.length; i++) {
						// 지역선택 팝업
						if(lvResultList[i].sido_cd == p_sido_cd){
							$("#areaPopup_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
						} else {
							$("#areaPopup_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");								
						}
					}
				}else if(res.errCd == "-401") {
					//commonTotSurv_alert(res.errMsg);
				}else{
					//commonTotSurv_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//commonTotSurv_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//$statsMeMain.ui.loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name         : getAreaSgg
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2020.10.23
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getAreaPopupSgg : function(p_sido_cd, p_sgg_cd) {// 지역선택 팝업
			$("#areaPopup_sgg").html("");
			if(p_sgg_cd == "999"){
				$("#areaPopup_sgg").html("<option value=\"999\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\" selected=\"selected\">전체</option>");				
			} else {
				$("#areaPopup_sgg").html("<option value=\"999\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전체</option>");
			}
			
			// ajax 시작
			$.ajax({
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
			    type: 'post',
			    dataType : 'json',
			    async: false,
			    data: {
			    	base_year: $("#tmsYears option:selected").val(),
			    	sido_cd:p_sido_cd,
			    	is_interactive:"Y"
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {						
					//시군구 목록 추가
					var lvResultList = res.result.sggList;
					for(var i = 0; i < lvResultList.length; i++) {							
						if(lvResultList[i].sgg_cd == p_sgg_cd){
							$("#areaPopup_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>");
						} else {
							$("#areaPopup_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//$statsMeMain.ui.alert(res.errMsg);
				}else{
					//$statsMeMain.ui.alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//$statsMeMain.ui.alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//$statsMeMain.ui.loading(false);
				$totSurvMain.ui.loading(false);	// 로딩바
			});
			// ajax 끝
		},
		
		/**
		 * @name         : getOpenAPIAreaSido 
		 * @description  : 개방형지도 시도 불러오기
		 * @date         : 2020.10.26
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getOpenAPIAreaSido : function(p_sido_cd) {
			// 지역선택 팝업
			$("#OpenAPI_sido").html("");
			
			// ajax 시작
			$.ajax({
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
			    type: 'post',
			    dataType : 'json',
			    async: false,
			    data: {
			    	base_year: $("#tmsYears option:selected").val()
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					//시도 목록 추가
					var lvResultList = res.result.sidoList;
					for(var i = 0; i < lvResultList.length; i++) {
						if(p_sido_cd == "99" && i == 0){
							$("#OpenAPI_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
						} else {
							// 지역선택 팝업
							if(lvResultList[i].sido_cd == p_sido_cd){
								$("#OpenAPI_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
							} else {
								$("#OpenAPI_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");								
							}							
						}
					}
				}else if(res.errCd == "-401") {
					//commonTotSurv_alert(res.errMsg);
				}else{
					//commonTotSurv_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//commonTotSurv_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//$statsMeMain.ui.loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name         : getOpenAPIAreaSgg
		 * @description  : 개방형지도 시군구 불러오기
		 * @date         : 2020.10.26
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getOpenAPIAreaSgg : function(p_sido_cd, p_sgg_cd) {
			$("#OpenAPI_sgg").html("");
			
			// 전국일 경우
			if(p_sido_cd == "99"){
				p_sido_cd = $("#OpenAPI_sido option:selected").val();
			}
			
			// ajax 시작
			$.ajax({
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
			    type: 'post',
			    dataType : 'json',
			    async: false,
			    data: {
			    	base_year: $("#tmsYears option:selected").val(),
			    	sido_cd:p_sido_cd
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {						
					//시군구 목록 추가
					var lvResultList = res.result.sggList;
					for(var i = 0; i < lvResultList.length; i++) {
						if(p_sgg_cd == "999" && i == 0){
							$("#OpenAPI_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>");
						} else {
							if(lvResultList[i].sgg_cd == p_sgg_cd){
								$("#OpenAPI_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>");
							} else {
								$("#OpenAPI_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
							}							
						}
					}
				}else if(res.errCd == "-401") {
					//$statsMeMain.ui.alert(res.errMsg);
				}else{
					//$statsMeMain.ui.alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//$statsMeMain.ui.alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//$statsMeMain.ui.loading(false);
				$totSurvMain.ui.loading(false);	// 로딩바
			});
			// ajax 끝
		},
		
		/**
		 * @name         : getOpenAPIAreaEmdong
		 * @description  : 개방형지도 읍면동 불러오기
		 * @date         : 2020.10.26
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getOpenAPIAreaEmdong : function(p_sido_cd, p_sgg_cd, p_emdong_cd) {
			$("#OpenAPI_emdong").html("");
			if(p_emdong_cd == "00"){
				$("#OpenAPI_emdong").html("<option value=\"00\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\" selected=\"selected\">전체</option>");				
			} else {
				$("#OpenAPI_emdong").html("<option value=\"00\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전체</option>");
			}
			// 전국일 경우
			if(p_sido_cd == "99"){
				p_sido_cd = $("#OpenAPI_sido option:selected").val();
			}
			if(p_sgg_cd == "999"){
				p_sgg_cd = $("#OpenAPI_sgg option:selected").val();
			}
			
			// ajax 시작
			$.ajax({
				url: contextPath + "/ServiceAPI/map/admAddressList.json",
			    type: 'post',
			    dataType : 'json',
			    async: false,
			    data: {
			    	base_year:$inMoreDetail.ui.bndYear,
			    	sido_cd:p_sido_cd,
			    	sgg_cd:p_sgg_cd
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {						
					//읍면동 목록 추가
					var lvResultList = res.result.admList;
					for(var i = 0; i < lvResultList.length; i++) {
						if(p_emdong_cd != "00"){
							if(lvResultList[i].emdong_cd == p_emdong_cd){
								$("#OpenAPI_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].emdong_nm+"</option>");
							} else {
								$("#OpenAPI_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].emdong_nm+"</option>");								
							}							
						} else {
							$("#OpenAPI_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].emdong_nm+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//$statsMeMain.ui.alert(res.errMsg);
				}else{
					//$statsMeMain.ui.alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//$statsMeMain.ui.alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//$statsMeMain.ui.loading(false);
				$totSurvMain.ui.loading(false);	// 로딩바
			});
			// ajax 끝
		},
		
		/**
		 * @name         : subThemaList
		 * @description  : 관심주제 목록 조회
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		subThemaList : function(){
			var dataParams = {};
			// 선택년도
			var selYear = $("#selYear option:selected").val();
			// 시도 / 시군구 코드
			var selAdmCd = "";
			var sido = $("#detail_sido option:selected").val();
			var sgg = $("#detail_sgg option:selected").val();
			selAdmCd = sido + sgg;
			
			if(selAdmCd != "" && selAdmCd.length == 5){
				if(selAdmCd.substring(2,5) == "999"){
					selAdmCd = selAdmCd.substring(0,2);
				}				
			}			
			dataParams.selYear  = selYear;
			dataParams.selAdmCd = selAdmCd;
			
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getDetailSubThemaList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						var subThemaData = res.result.subThemaData;						
						// 소주제도 선택
						if(subThemaData.length > 0){
							$.each(subThemaData, function(key, value){
								$inMoreDetail.ui.subThemaSelect(value.sub_thema);
							});
						}
					}
					else {
						console.log("failed!");
					}
				},
				error: function(err) {
					//$statsMeMain.ui.alert(err.responseText);
					console.log("err = " + err.responseText);
				}
			});
		},
				
		/**
		 * @name         : searchList
		 * @description  : 목록 조회
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		searchList : function( clickYn ){			
			var dataParams = {};
			
			// 선택년도
			var selYear = $("#selYear option:selected").val();
			// 시도 / 시군구 코드
			var selAdmCd = "";
			var sido = $("#detail_sido option:selected").val();
			var sgg = $("#detail_sgg option:selected").val();
			selAdmCd = sido + sgg;
			
			if(selAdmCd != "" && selAdmCd.length == 5){
				if(selAdmCd.substring(2,5) == "999"){
					selAdmCd = selAdmCd.substring(0,2);
				}				
			}
			
			// 관심주제도 여러개 - 소주제 선택항목 list			
			if($inMoreDetail.ui.selectSubThemaList.length > 0){
				var selectSubThema = "";
				$.each($inMoreDetail.ui.selectSubThemaList, function(key, value){
					if($inMoreDetail.ui.selectSubThemaList.length-1 != key){
						selectSubThema += value.replace(/ /gi, "") + "@@";						
					} else {
						selectSubThema += value.replace(/ /gi, "");
					}
				});
				dataParams.subThemaList = selectSubThema;
			}
			
			if( clickYn ) {
				srvLogWrite("P0", "09", "04", "02", "", ( selectSubThema ? selectSubThema.replace(/20%/gi, '') : ''));
			}

			dataParams.selYear  = selYear;
			dataParams.selAdmCd = selAdmCd;
			// 페이지 관련 변수 설정
			dataParams.page = $inMoreDetail.ui.page;
			// 정렬
			if($inMoreDetail.ui.orderTypeNm != "default"){
				dataParams.orderTypeNm = $inMoreDetail.ui.orderTypeNm;
				dataParams.orderType = $inMoreDetail.ui.orderType;
			} else {
				dataParams.orderType = $inMoreDetail.ui.orderType;
			}
						
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						// 조회리스트 데이터
						var totalDatalist = res.result.totalData;
						var resultCount = res.result.totalDataCnt;
						$('#resultCount').text(resultCount);
						// 더보기 버튼 
						if(resultCount > ($inMoreDetail.ui.page * 10)){
							$("#totSurvDataListMore").css("visibility", "visible");
						} else {
							$("#totSurvDataListMore").css("visibility", "hidden");
						}
						// 리스트 그리기	#totSurvDataList
						$inMoreDetail.ui.drawSerchList(totalDatalist);
					}
					else {
						console.log("failed!");
					}
				},
				error: function(err) {
					//$statsMeMain.ui.alert(err.responseText);
					console.log("err = " + err.responseText);
				}
			});
			
		},
		
		/**
		 * @name         : subThemaSelect
		 * @description  : 소주제도 선택 셋팅
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	searchVal : 소주제도명칭
		 */
		subThemaSelect : function(searchVal){
			$(".sideCol-column > ul > li > span").each(function(index, item){
				if($(item).prop("title").replace(/ /gi, "") == searchVal.replace(/ /gi, "")){
					$(item).parent().removeClass("dis");
				}
			});
		},
		
		/**
		 * @name         : drawSerchList
		 * @description  : 리스트 셋팅
		 * @date         : 2020.10.07
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	totalDatalist : 조회결과 list
		 */
		drawSerchList : function(totalDatalist){
			if($inMoreDetail.ui.page == 1){
				$('#totSurvDataList > tbody').empty();
			}
			
			if(totalDatalist.length > 0){		
				$.each(totalDatalist, function(key, value){
					$('#totSurvDataList > tbody').append(
						$("<tr/>", {"id":value.surv_id+"Tr"}).append(
							$("<td/>", {"title":value.thema, "style":"width:11%;"}).append(
								$("<img/>", {"src":"/images/totSurv/"+$inMoreDetail.ui.searchThemaImgFileNm($inMoreDetail.ui.bigThema, value.thema), "class":"w25Img"})
							),
							$("<td/>", {"title":value.sub_thema, "style":"width:11%;"}).append(
								$("<img/>", {"src":"/images/totSurv/icon/"+$inMoreDetail.ui.searchThemaImgFileNm($inMoreDetail.ui.subThema, value.sub_thema), "class":"w25Img"})
							),
							$("<td/>", {"title":value.surv_nm, "text":value.surv_nm, "style":"text-align: left; width:40%;"}),
							$("<td/>", {"title": value.end_year+"년", "text":value.end_year+"년", "style":"width:13%;"}),
							$("<td/>", {"title":value.tms, "style":"width:10%; font-size: 11px;"}).append(
								$("<img/>", {"class":"listImg", "src":Number(value.tms_provd_cnt) == 1?"/images/totSurv/listiconlight.png":"/images/totSurv/menu_07.png"}),
								$("<p/>", {"text":Number(value.tms_provd_cnt) == 1?value.data_year:value.tms})
							),
							$("<td/>", {"title": value.tms_yn =="Y"?"전수":"표본(20%)", "style":"width:15%; font-size: 11px;"}).append(
								$("<img/>", {"class":"listImg", "src":value.tms_yn =="Y"?"/images/totSurv/listicon.png":"/images/totSurv/listicontxt.png"}),
								$("<p/>", {"text":value.tms_yn =="Y"?"전수":"표본(20%)"})
							)
						).click(function( e, firstYn ){
							if( !firstYn ){
								srvLogWrite("P0", "09", "04", "03", value.surv_id, "");
							}
							$inMoreDetail.ui.listCheckData(value.surv_id, value.surv_nm);
						}),
						$("<tr/>", {"style":"height:6px;"})
					);
				});
				
				// 상세페이지 첫 진입/좌측 메뉴 클릭시에만 조회 결과 첫번째 항목 클릭
				if($inMoreDetail.ui.viewTypeFalg){
					$inMoreDetail.ui.viewTypeFalg = false;
					$("#totSurvDataList > tbody > tr").eq(0).trigger("click", true);	// 조회된 결과 첫번째 항목 클릭
				}
			} else {
				$('#totSurvDataList > tbody').append("조회된 정보가 없습니다.");
			}
			$totSurvMain.ui.loading(false);	// 로딩바
		},
		
		/**
		 * @name         : searchThemaImgFileNm
		 * @description  : 대주제/소주제 이미지 파일명 검색
		 * @date         : 2020.10.07
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	checkSurvDataId : 조사ID
		 */
		searchThemaImgFileNm : function(themaType, themaNm){
			var result = "";
			$.each(themaType, function(key, value){
			    if(key.replace(/ /gi, "") == themaNm.replace(/ /gi, "")){
			    	result = value;
			    	return false;
			    }
			});
			return result;
		},
		
		/**
		 * @name         : listCheckData
		 * @description  : 체크박스 선택
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	checkSurvDataId : 조사ID
		 *  checkSurvDataNm : 통계명
		 */
		listCheckData : function(checkSurvDataId, checkSurvDataNm){
			if(!$("#"+checkSurvDataId+"Tr").hasClass("on")){
				// 차트 클릭 관련 초기화
				$inMoreDetail.ui.chartSelectedItemClear();
				
				$inMoreDetailMap.ui.mapToggleId = "";	// 맵 선택된 정보 초기화
				$("#totSurvDataList > tbody> tr").removeClass("on");
				$inMoreDetail.ui.selectTotSurvDataList = []; 
				
				// 지역선택 팝업
				$inMoreDetail.ui.getAreaPopupSido($("#detail_sido option:selected").val());
				$inMoreDetail.ui.getAreaPopupSgg($("#detail_sido option:selected").val(), $("#detail_sgg option:selected").val());
				
				// 선택 항목 추가
				$("#"+checkSurvDataId+"Tr").addClass("on");
				$inMoreDetail.ui.selectTotSurvDataList.push(checkSurvDataId + '$' + checkSurvDataNm);
				
				// 조사표 조회
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					// 차트 데이터 초기화
					$inMoreDetail.ui.chartDataClear();
					// 선택한 항목 div 생성
					$inMoreDetail.ui.createInMoreDetailDiv();					
				}, 100);				
			}
		},
		
		/**
		 * @name         : createInMoreDetailDiv
		 * @description  : 선택한 조사표 div 생성
		 * @date         : 2020.10.12
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		createInMoreDetailDiv : function(){
			$totSurvMain.ui.loading(false);	// 로딩바
			if($inMoreDetail.ui.selectTotSurvDataList.length > 0){
				if($("#detail_sido option:selected").val()=="99"){
					$inMoreDetail.ui.admNm = "전국";
					$inMoreDetail.ui.admCd = "99";
				} else {
					if($("#detail_sgg option:selected").val()=="999"){
						$inMoreDetail.ui.admNm = $("#detail_sido option:selected").text();
						$inMoreDetail.ui.admCd = $("#detail_sido option:selected").val();
					} else{
						$inMoreDetail.ui.admNm = $("#detail_sido option:selected").text()+" "+$("#detail_sgg option:selected").text();
						$inMoreDetail.ui.admCd = $("#detail_sido option:selected").val()+$("#detail_sgg option:selected").val();
					}
				}
				
				$("#inMoreDetailDataDiv").empty();
				
				$.each($inMoreDetail.ui.selectTotSurvDataList, function(key, value){
					var totSurvDataList = value.split('$');
					$("#inMoreDetailDataDiv").append(
						$("<div/>", {"id":totSurvDataList[0]}).append(
							$("<div/>", {"class":"subDetailHeder"}).append(
								$("<div/>", {"class":"subDetailHedertitle"}).append(	
									$("<h2/>", {"class":"pl20", "text":totSurvDataList[1]})
								),
								$("<div/>", {"class":"detail_titIconBox", "id":totSurvDataList[0]+"btnDiv"}).append(
									//2020.11.16[신예리] 통계표 보기 버튼 title 변경	
									$("<button/>", {"class":"detail_titIcon01", "title":"통계표 보기(KOSIS)", "type":"button", "name":"detail_titIcon", "style":"display:none;"}).click(function(){
										srvLogWrite("P0", "01", "08", "00", totSurvDataList[0], "");
										getMataDataUrl(totSurvDataList[0]);
									}),
									$("<button/>", {"class":"detail_titIcon03 on", "title":"지도 접기", "type":"button", "name":"detail_titIcon", "style":"display:none;"}).click(function(){ //20210223 박은식 title명 변경
										if($(".detail_titIcon03").hasClass("on")){
											$inMoreDetail.ui.mapDivToggle(false, totSurvDataList[0]);											
										} else {
											$inMoreDetail.ui.mapDivToggle(true, totSurvDataList[0]);
										}
									}),
									$("<button/>", {"class":"detail_titIcon04 on", "title":"표 접기", "type":"button", "name":"detail_titIcon", "style":"display:none;"}).click(function(){//20210223 박은식 title명 변경
										if($(".detail_titIcon04").hasClass("on")){
											$inMoreDetail.ui.tableDivToggle(false, totSurvDataList[0]);											
										} else {
											$inMoreDetail.ui.tableDivToggle(true, totSurvDataList[0]);
										}
									}),
									$("<button/>", {"class":"detail_titIcon05", "title":"이미지 저장", "type":"button", "name":"detail_titIcon", "style":"display:none;"}).click(function(){
										// 2020.10.26 [주형식] 이미지 저장 
										$totSurvMain.ui.chartImageDown("#"+totSurvDataList[0], totSurvDataList[1]);
									})
								)	
							),
							$("<div/>", {"class":"conWrap", "id":totSurvDataList[0]+"Detail", "style":"display:none; padding: 5px;"})
						)
					);
					
					// 첫번째 조사표 선택
					if(key == 0){
						$inMoreDetail.ui.createTotSurvDetail(totSurvDataList[0]);
					}
				});
				
			}
		},
		
		/**
		 * @name         : createTotSurvDetail
		 * @description  : 선택한 조사표 div 활성화/비활성화
		 * @date         : 2020.10.12
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 */
		createTotSurvDetail : function(survId){
			$("#"+survId+"Detail").show();	// 조사표DIV 활성화
			$("#"+survId+"btnDiv > button[name='detail_titIcon']").show();	// 조사표DIV별 버튼 활성화
			$("#"+survId+"ToggleBtn").addClass("on");	// 조사표DIV 토글 버튼 변경
			
			// 조사ID 하위 DIV 생성
			if($("#"+survId+"Detail > div").length == 0){
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					$inMoreDetail.ui.createTotSurvSubDetailDiv(survId);
				}, 100);
			} else{
				// 조사표 div 활성화시 화면에 따른 차트 리사이즈
				$inMoreDetail.ui.chartDIVReset(survId);
			}
		},
		
		/**
		 * @name         : detailDataDivNone
		 * @description  : 차트데이터 미존재시
		 * @date         : 2020.10.16
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사 DIV ID
		 *  type : 차트/테이블 구분
		 */
		detailDataDivNone : function(survId, type){
			$("#"+survId).empty();
			$("#"+survId).append(
				$("<div/>", {"class":"DataNone", "name":"tiemTableNone", "style":"text-align: center;"}).append(
					$("<img/>", {"src":type == "table"?"/images/totSurv/tableNone.png":"/images/totSurv/ChartNone.png", "alt":"선택하신 지역에 대한 정보가 없습니다.", "style":"margin-top: 45px;"}),
					$("<p/>", {"style":"margin-top: 15px;", "text":"선택하신 지역에 대한 정보가 없습니다."})
				)
			);
		},
			
		/**
		 * @name         : createTotSurvSubDetailDiv
		 * @description  : 선택한 조사ID 하위 div 생성
		 * @date         : 2020.10.12
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 */
		createTotSurvSubDetailDiv : function(survId){
			$totSurvMain.ui.loading(false);	// 로딩바
			$("#"+survId+"Detail").append(				
				// 지도 영역
				$("<div/>", {"class":"detail_colWrap", "id":survId+"MapDiv"}).append(
					$("<div/>", {"class":"detail_col", "style":"overflow:hidden;"}).append( //2020.10.27[신예리] 익스플로러 지도 영역 휠 사용 시 번짐현상 때문에 style 추가
						$("<div/>", {"class":"detailrow bb pb10"}).append(
							$("<img/>", {"src":"/images/totSurv/popmapicon.png", "class":"poptiticon"}),
							$("<h4/>", {"id":survId+"MapTit"}).append("지도 보기"),//20210304 박은식 제목 추가
							$("<button/>", {"class":"OpenAPITitBtn", "text":"개방형지도", "style":"display:none;", "id":"openAPIBtn"}),
							$("<div/>", {"class":"OpenApiMapselect"}).append(
								$("<select/>", {"id":"OpenAPI_sido", "style":"width:120%;", "name":"OpenAPISelectBox", "style":"display:none;"})										
							),
							$("<div/>", {"class":"OpenApiMapselect"}).append(
								$("<select/>", {"id":"OpenAPI_sgg", "style":"width:120%;", "name":"OpenAPISelectBox", "style":"display:none;"})									
							),
							$("<div/>", {"class":"OpenApiMapselect"}).append(
								$("<select/>", {"id":"OpenAPI_emdong", "style":"width:120%;", "name":"OpenAPISelectBox", "style":"display:none;"})										
							),
							$("<button/>", {"type":"button", "class":"detailCol_hide", "title":"영역 숨기기 버튼", "style":"margin-left: auto;"}).click(function(){ //2020.10.27[신예리] 스타일 추가
								$inMoreDetail.ui.mapDivToggle(false, survId);
							})
						),
						$("<div/>", {"class":"detail_Graph02", "style":"height:560px;"}).append(
							$("<div/>", {"class":"Map", "style":"margin-top:0;"}).append(
								$("<div/>", {"class":"mapContents", "id":survId+"mapRgn"}),
								$("<div/>", {"class":"ControllBtnWrap"}).append(
									/*$("<button/>", {"type":"button", "class":"mapExport", "id":survId+"MapExport", "title":"지도 확장 버튼"}),*/
									$("<button/>", {"type":"button", "class":"zoom", "id":survId+"Zoom", "title":"지도 확대 버튼"}),
									$("<button/>", {"type":"button", "class":"out", "id":survId+"Out", "title":"지도 축소 버튼"})
								)
							)
						)
					)
				)
			);
			
			$inMoreDetailMap.ui.createMap("mapRgn_detail");
			$inMoreDetail.ui.getTotDetailThemaChartList(survId);	// 상세페이지 주제별 차트 목록 조회
			
		},
		
		/**
		 * @name         : areaPopupToggle
		 * @description  : 지역 선택 팝업 토클
		 * @date         : 2020.10.23
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	p_flag	: true/false => 표시/감춤
		 */
		areaPopupToggle : function(p_flag){
			if(p_flag == true){
				$("#commonTotSurvDetail_popup_back").show();
				$("#detailSidoselectPop").show();
			} else {
				$("#commonTotSurvDetail_popup_back").hide();
				$("#detailSidoselectPop").hide();
			}
		},
		
		/**
		 * @name         : mapDivToggle
		 * @description  : map div 토클
		 * @date         : 2020.10.23
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	p_flag	: true/false => 표시/감춤
		 *  survId	: 조사ID
		 */
		mapDivToggle : function(p_flag, survId){
			if(p_flag == true){
				srvLogWrite("P0", "09", "02", "00", "on", "");
				$("#"+survId+"MapDiv").show();
				$(".detail_titIcon03").addClass("on");
				$(".detail_titIcon03").attr("title", "지도 접기");//20210223 박은식 title명 변경
			} else {
				srvLogWrite("P0", "09", "02", "00", "off", "");
				$("#"+survId+"MapDiv").hide();
				$(".detail_titIcon03").removeClass("on");
				$(".detail_titIcon03").attr("title", "지도 펼치기");//20210223 박은식 title명 변경
			}
		},
		
		/**
		 * @name         : tableDivToggle
		 * @description  : table div 토클
		 * @date         : 2020.10.23
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	p_flag	: true/false => 표시/감춤
		 *  survId	: 조사ID
		 */
		tableDivToggle : function(p_flag, survId){
			if(p_flag == true){
				srvLogWrite("P0", "09", "03", "00", "on", "");
				$("#"+survId+"TableDiv").show();
				$(".detail_titIcon04").addClass("on");
				$(".detail_titIcon04").attr("title", "표 접기"); //20210223 박은식 title명 변경
			} else {
				srvLogWrite("P0", "09", "03", "00", "off", "");
				$("#"+survId+"TableDiv").hide();
				$(".detail_titIcon04").removeClass("on");
				$(".detail_titIcon04").attr("title", "표 펼치기");//20210223 박은식 title명 변경
			}
		},
		
		/**
		 * @name         : getDataJson
		 * @description  : 데이터 조회
		 * @date         : 2020.10.22
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  item_seq	: 주제별 차트 id
		 *  mode : 1(지도포함 전체 변경), 2(지도제외 차트변경)
		 */
		getDataJson : function(survId, item_seq, mode){
			$inMoreDetailMap.ui.selectedSurvId = survId;
			$inMoreDetailMap.ui.selectedItemSeq = item_seq;
			// 맵 정보 조회
			if(mode == "1"){
				var p_map_region = "sido";
				if($inMoreDetail.ui.admCd.length == 2){
					p_map_region = "sido";
				} else {
					p_map_region = "sgg";
				}
				$inMoreDetailMap.ui.drawMapData(p_map_region, "color");				
			} else {
				if($inMoreDetailMap.ui.map != null){
					$inMoreDetailMap.ui.map.update();
				}
			}
		},
		
		/**
		 * @name         : getTotDetailTableDataList
		 * @description  : 표 정보 조회
		 * @date         : 2020.10.22
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  item_seq	: 주제별 차트 id
		 */
		getTotDetailTableDataList : function(survId, item_seq){
			var dataParams = {};
			dataParams.survId  = survId;
			dataParams.year  = $inMoreDetail.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $inMoreDetail.ui.admCd;
			dataParams.isAtdrc = $inMoreDetail.ui.isAtdrc;
			
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailTableDataList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						if(res.result.dataList.length > 0){
							$inMoreDetail.ui.createTable(survId, res.result.dataList, res.result.yearList);
						} else {
							$inMoreDetail.ui.detailDataDivNone(survId+"Table", "table");
						}
					}
					else {
						console.log("failed!");
					}
				},
				error: function(err) {
					//$statsMeMain.ui.alert(err.responseText);
					console.log("err = " + err.responseText);
				}
			});
		},
		
		/**
		 * @name         : createTable
		 * @description  : 상세페이지 표 생성
		 * @date         : 2020.10.22
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 *  survId		: 조사ID
		 * 	dataList	: 표 정보
		 *  yearList	: 연도 정보
		 */
		createTable : function(survId, dataList, yearList){
			$("#"+survId+"Table").empty();
			
			$("#"+survId+"Table").append(
				$("<div/>").append(
					$("<table/>",{"style":"width:100%;"}).append(
						$("<thead/>", {"style":"width:100%; display:table; box-sizing: border-box"}).append(
							$("<tr/>").append(
								$("<th/>", {"rowspan":"2", "text":"행정구역", "style":"width:15%;"}),
								$("<th/>", {"rowspan":"2", "text":"항목", "style":"width:30%;"}),
								$("<th/>", {"colspan":yearList.length, "text":$("#"+survId+"Select option:selected").text(), "style":"border-bottom: 1px solid #fff;"})
							),
							$("<tr/>", {"id":survId+"YearList"})
						),
						$("<tbody/>", {"style":"width:100%; display:table; box-sizing: border-box;table-layout: fixed;", "id":survId+"Tbody"})
					),
					$("<p/>", {"text":(dataList[0].source!=undefined && dataList[0].source!="")?"<데이터 출처 : "+dataList[0].source+">":""})
				)
			);
			
			// 연도 설정
			$.each(yearList, function(key, value){
				$("#"+survId+"YearList").append($("<th/>", {"text":value}));
			});
			
			// 데이터 셋팅
			var dataHtml = "";
			for(var i=0; i<dataList.length; i++) {
				dataHtml += "<tr>";
				if(i==0){
					dataHtml += "<td class='data_col' style='vertical-align: baseline; width:15%; padding:5px;' rowspan='"+dataList.length+"'>"+dataList[i].region_nm+"</td>";
				}
				if(dataList[i].cd == $inMoreDetail.ui.chartClickCd){
					dataHtml += "<td class='data_col on' style='text-align:left; width:30%; padding:5px;' name='"+survId+dataList[i].cd+"'>"+dataList[i].cd_nm+"</td>";
				} else {
					dataHtml += "<td class='data_col' style='text-align:left; width:30%; padding:5px;' name='"+survId+dataList[i].cd+"'>"+dataList[i].cd_nm+"</td>";					
				}
				for(var j=0; j<yearList.length; j++){
					var year = yearList[j];
					if(dataList[i].cd == $inMoreDetail.ui.chartClickCd){
						dataHtml += "<td class='data_col on' style='text-align:right; width:auto; padding:5px;' name='"+survId+dataList[i].cd+"'>"+dataList[i][year].replace(/\B(?=(\d{3})+(?!\d))/g,",")+"</td>";
					} else {
						dataHtml += "<td class='data_col' style='text-align:right; width:auto; padding:5px;' name='"+survId+dataList[i].cd+"'>"+dataList[i][year].replace(/\B(?=(\d{3})+(?!\d))/g,",")+"</td>";						
					}
				}
			}
			$("#"+survId+"Tbody").append(dataHtml);
			//20210222 박은식 차트 하이라이트처리 START
			var dataTable = $("#"+survId+"TableDiv").find("tbody").find("tr");
			for(var i=0; i < dataTable.length; i++){
				var tmp = [];
				for(var j=((i==0)?2:1); j < dataTable.eq(i).find("td").length; j++){
					tmp.push(Number(dataTable.eq(i).find("td").eq(j).text().replace(/,/gi, "")));
				}
				tmp.sort();
				for(var j=0; j < tmp.length; j++){
					for(var k=((i==0)?2:1); k < dataTable.length;k++){
						if(tmp[j] == Number(dataTable.eq(i).find("td").eq(k).text().replace(/,/gi, ""))){
							dataTable.eq(i).find("td").eq(k).css("background-color", "rgb("+(255-j*20)+", "+(255-j*20)+", "+(255-j*10)+")");
						}
					}
				}
			}
			//20210222 박은식 차트 하이라이트처리 END
		},
		
		/**
		 * @name         : getTotDetailThemaChartList
		 * @description  : 상세페이지 주제별 차트 목록 조회
		 * @date         : 2020.10.12
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 */
		getTotDetailThemaChartList : function(survId){
			var dataParams = {};
			dataParams.survId  = survId;
			dataParams.year  = $inMoreDetail.ui.bndYear;
			
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailThemaChartList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						var itemChartInfo = res.result.itemChartInfo;
						var year = res.result.year;
						// 차트 정보 저장
						$inMoreDetail.ui.itemChartInfoDetailList[survId] = res.result.itemChartInfoDetail;
						$.each(itemChartInfo, function(key, value){
							if(key == 0){
								$("#"+survId+"Select").append("<option value=\""+value.item_seq+"\" data-chart-id=\""+value.chart_id+"\" data-disp-data-type=\""+value.disp_data_type+"\" data-unit=\""+value.unit+"\" data-year=\""+year+"\" data-surv-id=\""+survId+"\" data-cd=\""+value.data_cd+"\" selected=\"selected\">"+value.data_nm+"</option>");
								if(value.unit != null && value.unit != undefined && value.unit != ""){
									$("p[name='"+survId+"Unit']").html("단위("+value.unit+")");	// 차트 단위 셋팅
									$("span[name='"+survId+"Unit']").html("단위("+value.unit+")");	// 표 정보 단위 셋팅									
								}
							} else {
								$("#"+survId+"Select").append("<option value=\""+value.item_seq+"\" data-chart-id=\""+value.chart_id+"\" data-disp-data-type=\""+value.disp_data_type+"\" data-unit=\""+value.unit+"\" data-year=\""+year+"\" data-surv-id=\""+survId+"\" data-cd=\""+value.data_cd+"\">"+value.data_nm+"</option>");			
							}
						});
						
						$inMoreDetail.ui.getDataJson(itemChartInfo[0].surv_id, itemChartInfo[0].item_seq, "1");	// 데이터 조회
					}
					else {
						console.log("failed!");
					}
				},
				error: function(err) {
					console.log("err = " + err.responseText);
				}
			});
		},
		
		/**
		 * @name         : setOpenAPIBtnToggle
		 * @description  : 개방형지도 버튼 토클
		 * @date         : 2020.10.26
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  data_cd	: 데이터 코드
		 */
		setOpenAPIBtnToggle : function(survId, data_cd){			
			// 개방형 지도 버튼 표출 유무
			if(survId == "PH0001"){	// 인구, 주택, 가구
				if(data_cd =="T100" || data_cd == "T200" || data_cd == "T310"){	// 인구(T100), 가구(T200), 주택(T310)
					$("#openAPIBtn").attr("data-surv-id", survId);
					$("#openAPIBtn").attr("data-data-cd", data_cd);
					$("#openAPIBtn").show();
				} else {
					$("#openAPIBtn").hide();
				}
			} else if(survId == "FS0013" || survId == "FS0315"){	// 농가
				if(data_cd =="T00" || data_cd == "T01"){	// 가구(T00), 가구원총수 (명)(T01)
					$("#openAPIBtn").show();
				} else {
					$("#openAPIBtn").hide();
				}
			} else {
				$("#openAPIBtn").hide();
			}
			
			if($("#openAPIBtn").css("display") == "block"){
				$inMoreDetail.ui.getOpenAPIAreaSido($("#areaPopup_sido option:selected").val());
				$inMoreDetail.ui.getOpenAPIAreaSgg($("#areaPopup_sido option:selected").val(), $("#areaPopup_sgg option:selected").val());
				$inMoreDetail.ui.getOpenAPIAreaEmdong($("#areaPopup_sido option:selected").val(), $("#areaPopup_sgg option:selected").val(), "00");
			}
		},
		
		/**
		 * @name         : getOpenAPIMapData
		 * @description  : 개방형지도 조회
		 * @date         : 2020.10.29
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  dataCd	: 데이터 코드
		 */
		getOpenAPIMapData : function(survId, dataCd){			
			// 개방형 지도 선택 지역 코드 설정
			var openApiAdmCd = "";
			if($("#OpenAPI_emdong option:selected").val() != "00"){
				openApiAdmCd = $("#OpenAPI_sido option:selected").val() + $("#OpenAPI_sgg option:selected").val() + $("#OpenAPI_emdong option:selected").val();
			} else {
				openApiAdmCd = $("#OpenAPI_sido option:selected").val() + $("#OpenAPI_sgg option:selected").val();				
			}
			$inMoreDetail.ui.openApiAdmCd = openApiAdmCd;
			
			if(survId == "PH0001"){	// 인구, 주택, 가구
				if(dataCd =="T100"){	// 인구(T100)
					$inMoreDetailMapApi.request.openApiSearchPopulation(openApiAdmCd);
				} else if(dataCd == "T200"){	// 가구(T200)
					$inMoreDetailMapApi.request.openApiHouseHold(openApiAdmCd);
				} else if(dataCd == "T310"){	// 주택(T310)
					$inMoreDetailMapApi.request.openApiHouse(openApiAdmCd);
				}
			} else if(survId == "FS0013" || survId == "FS0315"){	// 농가
				if(dataCd =="T00" || dataCd =="T01"){	// 가구(T00), 가구원총수(T01)
					$inMoreDetailMapApi.request.openApiFarmHouseHold(openApiAdmCd);
				}
			} else if(survId == "FS0013" || survId == "FS0315"){	// 해수면 어업
				if(dataCd =="T01"){	// 가구원총수(T01)
					$inMoreDetailMapApi.request.openApiFisheryHouseHold(openApiAdmCd, "2");
				}
			} else if(survId == "FS0171" || survId == "FS0469"){	// 내수면 어업
				if(dataCd =="T01"){	// 가구원총수(T01)
					$inMoreDetailMapApi.request.openApiFisheryHouseHold(openApiAdmCd, "1");
				}
			} else if(survId == "FS0235" || survId == "FS0532"){	// 임업
				if(dataCd =="T01"){	// 가구원총수(T01)
					$inMoreDetailMapApi.request.openApiForestryHouseHold(openApiAdmCd);
				}
			}
		},
		
		/**
		 * @name         : getTotDetailThemaChartDataList
		 * @description  : 상세페이지 주제별 차트 정보 조회
		 * @date         : 2020.10.14
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  item_seq	: 주제별 차트 id
		 */
		getTotDetailThemaChartDataList : function(survId, item_seq){
			var dataParams = {};
			dataParams.survId  = survId;
			dataParams.year  = $("#"+survId+"Select option:selected").attr("data-year");
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $inMoreDetail.ui.admCd; 
			
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailThemaChartDataList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						// 차트 정보 저장
						var tempData = [];
						$.each(res.result.themaData, function(key, value){
							if(value.subsum_yn == "N"){
								tempData.push(res.result.themaData[key]);								
							} else {
								$inMoreDetail.ui.setOpenAPIBtnToggle(survId, value.cd);	// 개방형지도 버튼 토글
							}
						});
						
						$inMoreDetail.ui.themaChartData[survId] = tempData;
						if($inMoreDetail.ui.themaChartData[survId].length > 0){
							$inMoreDetail.ui.themaChartTypeChange($inMoreDetail.ui.themaChartData[survId], survId, "N", "180");							
						} else {
							$inMoreDetail.ui.detailDataDivNone(survId+"ItemChart", "chart");
						}
					}
					else {
						console.log("failed!");
					}
				},
				error: function(err) {
					console.log("err = " + err.responseText);
				}
			});
		},
		
		/**
		 * @name         : themaChartTypeChange
		 * @description  : 주제별 차트 타입 변경
		 * @date         : 2020.10.27
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	data	: 차트 데이터 정보
		 *  target : 대상
		 *  resizeYn : 애니메이션 여부
		 *  height : 높이
		 *  
		 */
		themaChartTypeChange : function(data, target, resizeYn, height){
			$("#"+target+"ItemChart").empty();	// 차트 영역 초기화
			if($("select[name='themaSelectBox'] option:selected").attr("data-chart-id") == "CH1S02"){	// 막대(세로)
				setThemaVerticalBarChart(data, target, resizeYn, height);
			} else if($("select[name='themaSelectBox'] option:selected").attr("data-chart-id") == "CH1S01"){	// 막대(가로)
				setThemaHorizontalBarChart(data, target, resizeYn, height);
			} else if($("select[name='themaSelectBox'] option:selected").attr("data-chart-id") == "CH1S03"){	// 꺽은선 그래프
				setThemaBrokenLineChart(data, target, resizeYn, height);
			} else if($("select[name='themaSelectBox'] option:selected").attr("data-chart-id") == "CH1S05"){	// 방사형
				setThemaRadialChart(data, target, resizeYn, height);
			} else if($("select[name='themaSelectBox'] option:selected").attr("data-chart-id") == "CH1S06"){	// 파이차트
				setThemaPieChart(data, target, resizeYn, height);
			} else {
				$("#"+survId+"ItemChart").append(
					$("<div/>", {"class":"DataNone", "name":"tiemTableNone", "style":"text-align: center;"}).append(
						$("<img/>", {"src":"/images/totSurv/ChartNone.png", "alt":"차트 정보가 없습니다.", "style":"margin-top: 45px;"}),
						$("<p/>", {"style":"margin-top: 15px;", "text":"차트 정보가 없습니다."})
					)
				);
			}
		},
		
		/**
		 * @name         : getTotDetailAreaAtdrcCheck
		 * @description  : 상세페이지 비자치구 여부 체크
		 * @date         : 2020.10.19
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		getTotDetailAreaAtdrcCheck : function(admCd){
			// ajax 시작
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailAreaAtdrcCheck.json",
			    data: {year:$inMoreDetail.ui.bndYear, region_cd:admCd},
				dataType: "json",
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					console.log("################# res = " + res.result.rslt);
					$inMoreDetail.ui.isAtdrc = res.result.rslt;
					$inMoreDetailMap.ui.isAtdrc = res.result.rslt;
				}
			}).fail(function (res) { // 실패
				//commonTotSurv_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				$totSurvMain.ui.loading(false);	// 로딩바
			});
		},
		
		/**
		 * @name         : getTotDetailUpperAreaChartDataList
		 * @description  : 상세페이지 상위지역 차트 정보 조회
		 * @date         : 2020.10.15
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  item_seq	: 주제별 차트 id
		 */
		getTotDetailUpperAreaChartDataList : function(survId, item_seq){
			var dataParams = {};
			dataParams.survId  = survId;
			dataParams.year  = $inMoreDetail.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $inMoreDetail.ui.admCd; 
			dataParams.isAtdrc = $inMoreDetail.ui.isAtdrc;
			dataParams.chartType = "upper";
			
			// 주제별 차트 item 클릭 변수 설정
			if($inMoreDetail.ui.chartClickItmCd != "" && $inMoreDetail.ui.chartClickItmCd != undefined){
				dataParams.itm_cd = $inMoreDetail.ui.chartClickItmCd;					
			}
			if($inMoreDetail.ui.chartClickC1 != "" && $inMoreDetail.ui.chartClickC1 != undefined){
				dataParams.c1 = $inMoreDetail.ui.chartClickC1;					
			}
			if($inMoreDetail.ui.chartClickC2 != "" && $inMoreDetail.ui.chartClickC2 != undefined){
				dataParams.c2 = $inMoreDetail.ui.chartClickC2;					
			}
			if($inMoreDetail.ui.chartClickC3 != "" && $inMoreDetail.ui.chartClickC3 != undefined){
				dataParams.c3 = $inMoreDetail.ui.chartClickC3;					
			}
			if($inMoreDetail.ui.dispDataType != "" && $inMoreDetail.ui.dispDataType != undefined){
				dataParams.disp_data_type = $inMoreDetail.ui.dispDataType;
			}
			
			if($inMoreDetail.ui.admCd.length > 2){
				$.ajax({
					type: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailAreaRankChartDataList.json",
					dataType: "json",
					data: dataParams,
					success: function(res){
						if(res.errCd == 0){
							if(res.result.dataList.length > 0){ 
								$inMoreDetail.ui.upperAreaChartData[survId] = res.result.dataList;
								// 랭킹 설정
								$("#"+survId+"UpperAreaRank").html(res.result.areaRank);
								$("#"+survId+"TotalUpperArea").html(res.result.totalArea+"개 ")
								if(res.result.level == "sido"){
									$("#"+survId+"UpperAreaRankTitle").html("시도 중");
								} else if(res.result.level == "sgg"){
									$("#"+survId+"UpperAreaRankTitle").html("시군구 중");
								}
								$("#"+survId+"UpperAreaRankSubTitle").html("번째");
								
								$inMoreDetail.ui.upperAreaAvgDt[survId] = res.result.avgDt;
								
								setUpperAreaChart($inMoreDetail.ui.upperAreaChartData[survId], survId, "N", "180");
							} else {
								$inMoreDetail.ui.detailDataDivNone(survId+"UpperAreaChart", "chart");
							}
						}
						else {
							console.log("failed!");
						}
					},
					error: function(err) {
						//$statsMeMain.ui.alert(err.responseText);
						console.log("err = " + err.responseText);
					}
				});
			} else {
				//20201130 박은식 상위지역 비교 title 초기화 START
				$(".StatusWrap").find("[id *= 'UpperAreaRank']").html("");
				$(".StatusWrap").find("[id *= 'TotalUpperArea']").html("")
				$(".StatusWrap").find("[id *= 'UpperAreaRankTitle']").html("");
				$(".StatusWrap").find("[id *= 'UpperAreaRankSubTitle']").html("");
				//20201130 박은식 상위지역 비교 title 초기화 END
				$inMoreDetail.ui.detailDataDivNone(survId+"UpperAreaChart", "chart");
			}
		},
		
		/**
		 * @name         : getTotDetailTmsresChartDataList
		 * @description  : 상세페이지 시계열 차트 정보 조회
		 * @date         : 2020.10.15
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  item_seq	: 주제별 차트 id
		 */
		getTotDetailTmsresChartDataList : function(survId, item_seq){
			var dataParams = {};
			dataParams.survId  = survId;
			dataParams.year  = $inMoreDetail.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $inMoreDetail.ui.admCd;
			
			// 주제별 차트 item 클릭 변수 설정
			if($inMoreDetail.ui.chartClickItmCd != ""){
				dataParams.itm_cd = $inMoreDetail.ui.chartClickItmCd;					
			}
			if($inMoreDetail.ui.chartClickC1 != ""){
				dataParams.c1 = $inMoreDetail.ui.chartClickC1;					
			}
			if($inMoreDetail.ui.chartClickC2 != ""){
				dataParams.c2 = $inMoreDetail.ui.chartClickC2;					
			}
			if($inMoreDetail.ui.chartClickC3 != ""){
				dataParams.c3 = $inMoreDetail.ui.chartClickC3;					
			}
			if($inMoreDetail.ui.dispDataType != ""){
				dataParams.disp_data_type = $inMoreDetail.ui.dispDataType;
			}
			
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailTmsresChartDataList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						// 시계열 차트(2회 이상만)
						if(res.result.tmsresData.length > 1){ 
							$inMoreDetail.ui.tmsresChartData[survId] = res.result.tmsresData;
							setTmsresChart($inMoreDetail.ui.tmsresChartData[survId], survId, "N", "180");
						} else {
							$inMoreDetail.ui.detailDataDivNone(survId+"TimeChart", "chart");
						}
					}
					else {
						console.log("failed!");
					}
				},
				error: function(err) {
					//$statsMeMain.ui.alert(err.responseText);
					console.log("err = " + err.responseText);
				}
			});
		},
		
		/**
		 * @name         : getTotDetailAreaRankChartDataList
		 * @description  : 상세페이지 지역비교 차트 정보 조회
		 * @date         : 2020.10.20
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 * 	survId	: 조사ID
		 *  item_seq	: 주제별 차트 id
		 */
		getTotDetailAreaRankChartDataList : function(survId, item_seq){
			var dataParams = {};
			dataParams.survId  = survId;
			dataParams.year  = $inMoreDetail.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $inMoreDetail.ui.admCd; 
			dataParams.isAtdrc = $inMoreDetail.ui.isAtdrc;
			dataParams.chartType = "now";
			
			// 주제별 차트 item 클릭 변수 설정
			if($inMoreDetail.ui.chartClickItmCd != ""){
				dataParams.itm_cd = $inMoreDetail.ui.chartClickItmCd;					
			}
			if($inMoreDetail.ui.chartClickC1 != ""){
				dataParams.c1 = $inMoreDetail.ui.chartClickC1;					
			}
			if($inMoreDetail.ui.chartClickC2 != ""){
				dataParams.c2 = $inMoreDetail.ui.chartClickC2;					
			}
			if($inMoreDetail.ui.chartClickC3 != ""){
				dataParams.c3 = $inMoreDetail.ui.chartClickC3;					
			}
			if($inMoreDetail.ui.dispDataType != ""){
				dataParams.disp_data_type = $inMoreDetail.ui.dispDataType;
			}
			
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailAreaRankChartDataList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						if(res.result.dataList.length > 0){ 
							$inMoreDetail.ui.areaRankChartData[survId] = res.result.dataList;
							//20201130 박은식 해당지역 데이터 유무체크 로직 추가 START
							var localDataCheck = false;
							for(var i=0;i<res.result.dataList.length;i++){
								if(res.result.dataList[i].region_cd == $inMoreDetail.ui.admCd){
									localDataCheck = true;
									break;
								}
							}
							if($inMoreDetail.ui.admCd != "99"){
								if(localDataCheck == true){
									// 랭킹 설정
									$("#"+survId+"AreaRank").html(res.result.areaRank);
									$("#"+survId+"TotalArea").html(res.result.totalArea+"개 ")
									if(res.result.level == "sido"){
										$("#"+survId+"AreaRankTitle").html("시도 중");
									} else if(res.result.level == "sgg"){
										if($inMoreDetail.ui.isAtdrc == true){
											$("#"+survId+"AreaRankTitle").html("비자치구 중");
										} else {
											$("#"+survId+"AreaRankTitle").html("시군구 중");										
										}
									}
									$("#"+survId+"AreaRankSubTitle").html("번째");
								} else {
									$(".StatusWrap").find("[id *= 'AreaRank']").html("");
									$(".StatusWrap").find("[id *= 'TotalArea']").html("")
									$(".StatusWrap").find("[id *= 'AreaRankTitle']").html("");
									$(".StatusWrap").find("[id *= 'AreaRankSubTitle']").html("");
								}
								
							} else {
								$(".StatusWrap").find("[id *= 'AreaRank']").html("");
								$(".StatusWrap").find("[id *= 'TotalArea']").html("")
								$(".StatusWrap").find("[id *= 'AreaRankTitle']").html("");
								$(".StatusWrap").find("[id *= 'AreaRankSubTitle']").html("");
							}

							if(localDataCheck == true || $inMoreDetail.ui.admCd == "99"){
								$inMoreDetail.ui.areaAvgDt[survId] = res.result.avgDt;
								
								setAreaRankChart($inMoreDetail.ui.areaRankChartData[survId], survId, "N", "180");
							} else {
								$inMoreDetail.ui.detailDataDivNone(survId+"AreaChart", "chart");
							}
							//20201130 박은식 해당지역 데이터 유무체크 로직 추가 END
						} else {
							$inMoreDetail.ui.detailDataDivNone(survId+"AreaChart", "chart");
						}
					}
					else {
						console.log("failed!");
					}
				},
				error: function(err) {
					//$statsMeMain.ui.alert(err.responseText);
					console.log("err = " + err.responseText);
				}
			});
		},
		
		/**
		 * 
		 * @name         : createChartTool
		 * @description  : 차트 툴팁
		 * @date         : 2020.10.16
		 * @author	     : 한광희
		 * @history 	 :
		 * @param 	 year: 해당 연도
		 * 		    title: 해당 타이틀
		 * 			 data: 수치값
		 * 			 unit: 단위
		 * 		   target: chart에 선언된 툴팁
		 * 				x: 툴팁 x좌표
		 * 				y: 툴팁 y좌표
		 */	
		createChartTool : function(year, title, data, unit, target, x, y){
			$(target).css("display", "inline-block");
			$(target).css("position", "absolute");
			$(target).css("font-family", "NanumSquare")
			$(target).css("z-index", "5000");
			$(target).css("background-color", "rgb(255, 255, 255)")
			$(target).css("border", "1px solid #cecece")
			$(target).css("border-radius", "5px")
			$(target).css("padding", "10px")
			$(target).css("text-align", "center")
			var screenWidth = window.innerWidth;
			var testNum = (Number(d3.event.pageX) + 160)
			if(screenWidth <= (Number(d3.event.pageX) + 160)){
				$(target).css("left", screenWidth -180 + "px")
				$(target).css("top", d3.event.pageY + y + "px")
			} else {
				$(target).css("left", d3.event.pageX + x + "px")
				$(target).css("top", d3.event.pageY + y + "px")
			}
			$(target).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year+ "년 "+ title.replace('(명)', '').replace('-', ' ').replace('_', ' ') + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px; margin-left: 20px;;'>"+ data + "</p>" + unit);
		},
		
		/**
		 * 
		 * @name         : chartMouseOver
		 * @description  : 차트 아이템 mouse over 시 함수
		 * @date         : 2020.10.16
		 * @author	     : 한광희
		 * @history 	 :
		 */
		chartMouseOver : function(obj, color){
			// 차트선택여부가 N일 경우에만 선택항목 색 저장
        	if($inMoreDetailMap.ui.chartToggleYn=="N"){
        		$totSurvMain.ui.selectedTempColor = obj.attr("fill");        		
        	}
        	// 차트 mouseOut 시 리턴하기 위한 over항목 색 저장
        	$totSurvMain.ui.tempColor = obj.attr("fill");
        	obj.attr("fill", color);
		},
		
		/**
		 * 
		 * @name         : chartMouseOut
		 * @description  : 차트 아이템 mouse out 시 함수
		 * @date         : 2020.10.16
		 * @author	     : 한광희
		 * @history 	 :
		 */
		chartMouseOut : function(obj, color){
			if($inMoreDetailMap.ui.selectedObj[0] != obj[0]){
	    		if($inMoreDetailMap.ui.chartToggleYn == "Y"){
	    			obj.attr("fill", $totSurvMain.ui.tempColor);
	    		} else {
	    			obj.attr("fill", $totSurvMain.ui.selectedTempColor);
	    		}
	    	} else if($inMoreDetailMap.ui.selectedObj[0] == obj[0]){
	    		obj.attr("fill", color);
	    	}   	
		},
		
		/**
		 * 
		 * @name         : chartDataClear
		 * @description  : 차트 정보 초기화
		 * @date         : 2020.10.20
		 * @author	     : 한광희
		 * @history 	 :
		 */
		chartDataClear : function(){
			$inMoreDetail.ui.themaChartData = [];	// 주제별 차트
			$inMoreDetail.ui.tmsresChartData = [];	// 시계열 및 증감율
			$inMoreDetail.ui.upperAreaChartData = [];	// 상위지역 비교 차트
			$inMoreDetail.ui.upperAreaAvgDt = []; 	// 상위지역 평균 값
			$inMoreDetail.ui.areaRankChartData = []; 	// 지역비교
			$inMoreDetail.ui.areaAvgDt = [];	// 지역비교 평균 값
		},
		
		/**
		 * 
		 * @name         : chartDIVReset
		 * @description  : 차트 영역 재조회
		 * @date         : 2020.10.20
		 * @author	     : 한광희
		 * @history 	 :
		 */
		chartDIVReset : function(survId){
			// 주제별 차트
			if($inMoreDetail.ui.themaChartData[survId] != undefined && $inMoreDetail.ui.themaChartData[survId].length != 0){
				$inMoreDetail.ui.themaChartTypeChange($inMoreDetail.ui.themaChartData[survId], survId, "Y", "180");							
			} else {
				$inMoreDetail.ui.detailDataDivNone(survId+"ItemChart", "chart");
			}
			// 시계열 차트
			if($inMoreDetail.ui.tmsresChartData[survId] != undefined && $inMoreDetail.ui.tmsresChartData[survId].length != 0){ 
				setTmsresChart($inMoreDetail.ui.tmsresChartData[survId], survId, "Y", "180");
			} else {
				$inMoreDetail.ui.detailDataDivNone(survId+"TimeChart", "chart");
			}
			// 상위지역비교 차트
			if($inMoreDetail.ui.upperAreaChartData[survId] != undefined && $inMoreDetail.ui.upperAreaChartData[survId].length != 0){
				setUpperAreaChart($inMoreDetail.ui.upperAreaChartData[survId], survId, "Y", "180");
			} else {
				$inMoreDetail.ui.detailDataDivNone(survId+"UpperAreaChart", "chart");
			}
			// 지역비교 차트
			if($inMoreDetail.ui.areaRankChartData[survId] != undefined && $inMoreDetail.ui.areaRankChartData[survId].length != 0){
				setAreaRankChart($inMoreDetail.ui.areaRankChartData[survId], survId, "Y", "180");
			} else {
				$inMoreDetail.ui.detailDataDivNone(survId+"AreaChart", "chart");
			}
		},
		
		/**
		 * 
		 * @name         : chartItmClick
		 * @description  : 차트 아이템 mouse out 시 함수
		 * @date         : 2020. 09. 21
		 * @author	     : 곽제욱
		 * @history 	 :
		 */
		chartItmClick : function(obj, color, contents, chartType) {
			let curYear = $("#tmsYears option:selected").val();
			let tblist = $inMoreDetail.ui.selectedTblId;
			let itlist = $inMoreDetail.ui.selectedItemId;
			
			/*if(tblist == "DT_1KI1510" ||tblist == "DT_1KI1511"
			|| tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"
			|| tblist == "DT_1KI2002" || tblist == "DT_1KI2003"){
				if($("#sbx_sido").val() != '00'){
					var sggValues = $("#sbx_sgg>option").map(function() { return {name : $(this).text(), value: $(this).val()} });
					$.each(sggValues, function(i,v){
						if(v.name == obj[0].category){
							$("#sbx_gg").val()==='000'?$("#sbx_sgg").val(v.value):$("#sbx_gg").val(v.value)
						}
					});
					
					$inMoreDetailMap.ui.mapToggleId = $("#sbx_sido option:selected").val() + ($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
					$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
					$totSurvMain.ui.selectedArea = $inMoreDetailMap.ui.mapToggleId;
					getEmdListOpt();
					$inMoreDetail.event.allChange("1");
					
				}else{
					var sidoValues = $("#sbx_sido>option").map(function() { return {name : $(this).text(), value: $(this).val()} });
					$.each(sidoValues, function(i,v){
						if(v.name == obj[0].category){
							$totSurvMain.ui.selectedArea = v.value;
							$inMoreDetailMap.ui.mapToggleId = v.value;
							$("#sbx_sido").val(v.value);
						}
					});
					
					$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
					getSggListOpt();
					$inMoreDetail.event.allChange("1");
				}
			}else{*/
				// 선택한 obj와 이전에 선택한 obj가 다를 경우
				if(obj[0] != $inMoreDetail.ui.selectedObj[0]){
					// 타일맵 변경여부 N
					$totSurvMain.ui.tileChangeYn = "N";
					// 맵 그리기
					
					/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
		    		$inMoreDetail.event.checkIsAtdrc(tempRegionCd);		
		    		if($inMoreDetailMap.ui.isAtdrc){
		    			$inMoreDetailMap.ui.mapToggleId = "";
		    		}
		    		
		    		$(".title.charItmMapTitle.blue").text($("#chrItmList option:selected").text() + "-" + $inMoreDetail.ui.chartClickItmNm);
		    		
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */	    		
					if(obj.length > 0) {					
						if(obj[0].series != null) {
							let chartDiv = obj[0].series.chart.renderTo.id;
							if(chartDiv == "inMoreDetailCorpCountOfIndustryChart") {
								$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.ui.selectedOrgId;
								$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.ui.selectedTblId;
								$inMoreDetail.ui.ajax.params.surv_year_list = curYear;
								$inMoreDetail.ui.bnd_year = curYear;
								if(itlist != "J1_3"){
									$inMoreDetail.ui.ajax.params.char_itm_id_list = obj[0].itm_id;
									drawCharts2_1("fromDrawCharts1");
									drawCharts3_1("fromDrawCharts1");
									drawGrid1_1("fromDrawCharts1");
								}
							} else if(chartDiv == "timeSeriesCorpCountIndustryChart") {
								if(obj[0].series.name.indexOf(curYear) != -1) {
									$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.ui.selectedOrgId;
									$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.ui.selectedTblId;
									$inMoreDetail.ui.ajax.params.surv_year_list = curYear;
									$inMoreDetail.ui.bnd_year = curYear;
								} else {
									if($inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId] != undefined) {
										$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].org_id;
										$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].tbl_id;
										$inMoreDetail.ui.ajax.params.surv_year_list = $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].year;
										$inMoreDetail.ui.bnd_year = $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].year;
									}else{
										$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.ui.selectedOrgId;
										$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.ui.selectedTblId;
										$inMoreDetail.ui.ajax.params.surv_year_list = obj[0].category.substring(-5,4);
										$inMoreDetail.ui.bnd_year = obj[0].category.substring(-5,4);
										$inMoreDetail.event.allChange("1");
									}
								}
							} else if(chartDiv == "industryOfAreaChart") {
								$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.ui.selectedOrgId;
								$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.ui.selectedTblId;
								$inMoreDetail.ui.ajax.params.surv_year_list = curYear;
								$inMoreDetail.ui.bnd_year = curYear;
							}
							
							// 차트 토글여부 Y
				    		$inMoreDetail.ui.chartToggleYn = "Y";
							// 선택한 아이템이 변경되면서 선택한 아이템의 색상도 변경처리	
							if($inMoreDetail.ui.selectedObj != undefined && $inMoreDetail.ui.selectedObj != "") {
								if($inMoreDetail.ui.selectedObj[0].series != null){
									$inMoreDetail.ui.selectedObj[0].update({ color: $totSurvMain.ui.selectedTempColor });
									$inMoreDetail.ui.selectedObj[0].select(false);
								}
							}
							
							let tblIdList = $inMoreDetail.ui.ajax.params.tbl_id_list;
							
							if((tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514_10")
									&&chartDiv == "inMoreDetailCorpCountOfIndustryChart"){
								$totSurvMain.ui.selectedTempColor = obj[0].color;
								obj[0].update({ color: "#576574" });
								obj[0].select(false);
							}else{
								$totSurvMain.ui.selectedTempColor = obj[0].color;
								if($inMoreDetail.itlist == "J1_3"){
									obj[0].update({ color: "#576574" }, true, false);
								} else {
									obj[0].update({ color: '#ff0000' }, true, false);
								}
//								
//								obj[0].select(true);
								
							}
												
							// 현재 선택한 오브젝트를 변수에 저장
							$inMoreDetail.ui.selectedObj = obj;
							var title = "";
							title += contents;
							$("#itmDiv").css("display", "inline");
							$("#itmDiv").html(title);
							
						}
					}
					
					$(".colorck li>a:eq(2)").click();
					
					if($totSurvMain.ui.selectedArea == "00") {
		    			$inMoreDetailMap.ui.drawMapData("sido", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length == 2 && $totSurvMain.ui.selectedArea != "00") {
		    			$inMoreDetailMap.ui.drawMapData("sido", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length == 5 && $totSurvMain.ui.selectedArea.substring(4,5) == "0") {
		    			$inMoreDetailMap.ui.drawMapData("sgg", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length == 5 && $totSurvMain.ui.selectedArea.substring(4,5) != "0") {
		    			$inMoreDetailMap.ui.drawMapData("atdrc", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length > 5 && $inMoreDetail.ui.dispOptions[chartOrd][0].regionEnd == "읍면동") {
		    			$inMoreDetailMap.ui.drawMapData("emd", "color"); // 맵 그리기
		    		}
				} else {
				//20201014 박은식 chartSelectedSave function parameter 초기화 START
					//$inMoreDetail.ui.selectedObj[0].update({ color: $totSurvMain.ui.selectedTempColor });
					$inMoreDetail.ui.chartClickItmCd = "";
					$(".title.charItmMapTitle.blue").text($("#chrItmList option:selected").text());
					
					let tblIdList = $inMoreDetail.ui.ajax.params.tbl_id_list;
					let chartDiv = obj[0].series.chart.renderTo.id;
					
					if((tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514_10")
							&&chartDiv == "inMoreDetailCorpCountOfIndustryChart"){
						$inMoreDetail.ui.selectedObj[0].update({ color: $totSurvMain.ui.selectedTempColor });
						$inMoreDetail.ui.selectedObj[0].select(false);
					}else{
						$inMoreDetail.ui.selectedObj[0].update({ color: $totSurvMain.ui.selectedTempColor });
						$inMoreDetail.ui.selectedObj[0].select(false);
					}
					
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
					$inMoreDetail.event.checkIsAtdrc(tempRegionCd);		
		    		if($inMoreDetail.ui.isAtdrc){
		    			$inMoreDetail.ui.mapToggleId = "";
		    		}
		    		
		    		// 전 산업별로 파라미터 셋팅 차트 선택 해제
		    		$inMoreDetail.ui.selectedChartOrd = $("#chrItmList option:selected").data("chartord");
					let chartData = $inMoreDetail.ui.dispOptions[1];
					
					// 차트 selected 없을 시
					$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.ui.selectedOrgId;
					$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.ui.selectedTblId;
					$inMoreDetail.ui.ajax.params.surv_year_list = curYear;
					$inMoreDetail.ui.bnd_year = curYear;
					
					if(itlist != "J1_3"){
						drawCharts2_1();
						drawCharts3_1();
					}
					
					var chartOrd = $inMoreDetail.ui.selectedChartOrd;
					/*
					if($inMoreDetail.ui.dispOptions[chartOrd][0].regionVarOrd == 1){
						$inMoreDetail.ui.ajax.params["ov_l2_list"] = "0";
					}else{
						$inMoreDetail.ui.ajax.params["ov_l1_list"] = "0";
					}
		    		*/	
		    		$inMoreDetail.ui.chartToggleYn = "N";
		    		$inMoreDetail.ui.selectedObj = "";
		    		$("#itmDiv").css("display", "none");
		    		$("#itmDiv").html("");
		    		
		    		$(".colorck li>a:eq(0)").click();
		    		
		    		if($totSurvMain.ui.selectedArea == "00") {
		    			$inMoreDetailMap.ui.drawMapData("sido", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length == 2 && $totSurvMain.ui.selectedArea != "00") {
		    			$inMoreDetailMap.ui.drawMapData("sido", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length == 5 && $totSurvMain.ui.selectedArea.substring(4,5) == "0") {
		    			$inMoreDetailMap.ui.drawMapData("sgg", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length == 5 && $totSurvMain.ui.selectedArea.substring(4,5) != "0") {
		    			$inMoreDetailMap.ui.drawMapData("atdrc", "color"); // 맵 그리기
		    		} else if($totSurvMain.ui.selectedArea.length > 5 && $inMoreDetail.ui.dispOptions[chartOrd][0].regionEnd == "읍면동") {
		    			$inMoreDetailMap.ui.drawMapData("emd", "color"); // 맵 그리기
		    		}
				}
			//}
			//$(obj[0].series.chart.renderTo).find("g.highcharts-axis-labels.highcharts-xaxis-labels text").attr("x", "145");
		},
		
		/**
		 * 
		 * @name         : chartSelectedItemClear
		 * @description  : 주제별 차트 아이템 클릭 관련 데이터 초기화
		 * @date         : 2020.10.29
		 * @author	     : 한광희
		 * @history 	 :
		 */
		chartSelectedItemClear : function(){
			// 차트 클릭 관련 초기화
			$inMoreDetailMap.ui.chartToggleYn = "N";
			//$inMoreDetail.ui.chartClickItmCd = "";
			$inMoreDetail.ui.chartClickC1 = "";
			$inMoreDetail.ui.chartClickC2 = "";
			$inMoreDetail.ui.chartClickC3 = "";
			$inMoreDetail.ui.chartClickCd = "";
			$inMoreDetail.ui.dispDataType = "";
			$inMoreDetailMap.ui.selectedObj = "";
			// 차트 선택 명칭 설정
			$("#detailChartSelectedItemNm").css("display", "none");
    		$("#detailChartSelectedItemNm").html("");
		},
		
		/**
		 * 
		 * @name         : chartSelectedSave
		 * @description  : 주제별 차트 아이템 클릭 정보 유지
		 * @date         : 2020.10.29
		 * @author	     : 한광희
		 * @history 	 :
		 */
		chartSelectedSave : function(target, data, color, index, resizeYn, title){
			if(resizeYn == "Y"){
				$("#"+target).find(".eventGroup").eq(index).attr("fill", color);
				$inMoreDetailMap.ui.selectedObj[0] = $("#"+target).find(".eventGroup").eq(index)[0];
				if(title != "" && title != undefined){
					$("#detailChartSelectedItemNm").html(title);
				}
			} else {
				$inMoreDetail.ui.themaChartItmClick( $("#"+target).find(".eventGroup").eq(index), data, color, title);
			}
		},
	};

	$inMoreDetail.util = {};
	
	$inMoreDetail.event = {
		/**
		 * @name		 : clearSelection
		 * @description  : 지도의 선택된 객체 초기화
		 * @date		 : 2022.02.15
		 * @author		 : 이영호
		 * @history 	 :
		 * @parameter	 : 
		 */
		clearSelection : function(){
			if($inMoreDetailMap.ui.map != null) {
				if($inMoreDetailMap.ui.map.dataGeojson != null) {
					$inMoreDetailMap.ui.map.dataGeojson.eachLayer(function(layer) {
						var fillColor = layer.options.fillColor;
						var dashArray = layer.options.dashArray;
						for(var j=0; j<$totSurvMain.ui.tilePerColor.length; j++){
							if(layer.feature.properties.adm_cd == $totSurvMain.ui.tilePerColor[j].adm_cd) {
								fillColor = $totSurvMain.ui.tilePerColor[j].color;
								layer.setStyle({
									weight : 1,
									color : "white",
									dashArray : dashArray,
									fillOpacity : layer.options.fillOpacity,
									fillColor : fillColor
								});
							}
						}
					});
				}
			}
		},
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : 한광희
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$inMoreDetail.event.setUIEvent() called.");
			var body = $("body");
			
			//지역선택 시도 변경
			body.on("change", "#detail_sido", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					$inMoreDetail.ui.clear();	// 초기화
					
					$inMoreDetail.ui.my_sido_cd = $("#detail_sido option:selected").val();
					
					var param = $("#selYear option:selected").val()+"|"+$inMoreDetail.ui.my_sido_cd+"|"+($inMoreDetail.ui.my_sgg_cd?$inMoreDetail.ui.my_sgg_cd:"99");
					srvLogWrite("P0", "09", "04", "01", param, "");
					
					// 시군구 조회
					$inMoreDetail.ui.getAreaSgg($inMoreDetail.ui.my_sido_cd);
					// 관심주제 조회
					$inMoreDetail.ui.subThemaList();
					// 데이터 조회
					$inMoreDetail.ui.searchList();					
				}, 100);
			});
			
			//지역선택 시군구 변경
			body.on("change", "#detail_sgg", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					$inMoreDetail.ui.clear();	// 초기화
					$inMoreDetail.ui.my_sgg_cd = $("#detail_sgg option:selected").val();
					
					var param = $("#selYear option:selected").val()+"|"+$inMoreDetail.ui.my_sido_cd+"|"+($inMoreDetail.ui.my_sgg_cd?$inMoreDetail.ui.my_sgg_cd:"99");
					srvLogWrite("P0", "09", "04", "01", param, "");
					
					$inMoreDetail.ui.getTotDetailAreaAtdrcCheck($("#detail_sido option:selected").val()+$("#detail_sgg option:selected").val());	// 비자치구여부 조회
					// 관심주제 조회
					$inMoreDetail.ui.subThemaList();
					// 데이터 조회
					$inMoreDetail.ui.searchList();					
				}, 100);
			});
			
			// 년도 변경
			body.on("change", "#selYear", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					$inMoreDetail.ui.clear();	// 초기화
					// 시도,시군구 목록 조회
					var selYear = $("#selYear option:selected").val();
					var param = $("#selYear option:selected").val()+"|"+$inMoreDetail.ui.my_sido_cd+"|"+($inMoreDetail.ui.my_sgg_cd?$inMoreDetail.ui.my_sgg_cd:"99");
					srvLogWrite("P0", "09", "04", "01", param, "");
					
					if(selYear ==3 || selYear==5 || selYear == 10){
						$inMoreDetail.ui.bndYear =  $inMoreDetail.ui.totLastYear;
					}
					else{
						$inMoreDetail.ui.bndYear = selYear;
					}
					
					$inMoreDetail.ui.getAreaSido($("#detail_sido option:selected").val());
					$inMoreDetail.ui.getAreaSgg($("#detail_sido option:selected").val(), $("#detail_sgg option:selected").val());
										
					// 관심주제 조회
					$inMoreDetail.ui.subThemaList();
					// 데이터 조회
					$inMoreDetail.ui.searchList();					
				}, 100);
			});
						
			// 소주제 클릭 이벤트
			body.on("click", ".sideCol-column > ul > li", function() {
				// 비활성화 된 소주제 클릭 제외
				if($(this).hasClass("dis")){
					return false;
				}
				
				$totSurvMain.ui.loading(true);	// 로딩바
				// 상세영역 초기화
				$("#inMoreDetailDataDiv").empty();
				// 상세영역 패널 초기화 및 문구/이미지 설정
				$("#inMoreDetailDataDiv").append(
						$("<div/>", {"class":"DataNoneDetail", "id":"DataNoneDetail"}).append(
								$("<img/>", {"src":"/images/totSurv/detailDataNoselect.png", "alt":"결과 목록을 선택해 주세요."}),
								$("<p/>", {"text":"관심주제 설정에 따른 총조사 결과 목록을 선택해 주세요."})
						)
				);
				// 차트 데이터 초기화
				$inMoreDetail.ui.chartDataClear();
				
				// 소주제 선택 및 해제
				if($(this).hasClass("on")){
					$(this).removeClass("on");
					// 목록에서 삭제
					var selSubThema = $(this).children().prop("title") ;   // 선택된 소제목명
					$inMoreDetail.ui.selectSubThemaList.splice($inMoreDetail.ui.selectSubThemaList.indexOf(selSubThema), 1);
				}
				else{
					$(this).addClass("on");
					// 목록에서 추가
					var selSubThema = $(this).children().prop("title") ;   // 선택된 소제목명
					$inMoreDetail.ui.selectSubThemaList.push(selSubThema);
				}
				
				// 선택된 개수 초기화
				$('#detailSelListCnt').text("0");
				$inMoreDetail.ui.page = 1;	// 페이징 초기화
				$inMoreDetail.ui.selectTotSurvDataList = []	// 선택한 총조사 목록 초기화
				// 정렬 초기화
				$inMoreDetail.ui.orderTypeNm = "default";
				$inMoreDetail.ui.orderType = "ASC";
				
				// 데이터 조회
				$inMoreDetail.ui.searchList( true );
			});
			
			// 관심주제 더보기 클릭  #subThemaMore
			body.on("click", "#subThemaMore", function() {
				$("[id^=subIcon]").show();
				$('#subThemaHide').show();  // 숨기기
				$('#subThemaMore').hide();  // 더보기
			});
			
			// 관심주제 숨기기 #subThemaHide
			body.on("click", "#subThemaHide", function() {
				$("[id^=subIcon]").hide();
				$('#subThemaHide').hide();  // 숨기기
				$('#subThemaMore').show();  // 더보기
			});
			
			// 초기화 이미지 클릭
			body.on("click", "#dtailInitBtn", function(){
				srvLogWrite("P0", "09", "04", "04", "", "");
				$("#selYear option:eq(0)").prop("selected", "selected").trigger("change");
			});
			
			// 리스트 제목 정렬 이미지 클릭
			body.on("click", ".detailListHeader", function(){
				// 정렬 설정
				$inMoreDetail.ui.orderTypeNm = $(this).attr("data-id");
				$inMoreDetail.ui.orderType = $(this).attr("data-type");
				
				// 정렬 변경
				if($inMoreDetail.ui.orderType == "ASC"){
					$(this).attr("data-type", "DESC");
				} else {
					$(this).attr("data-type", "ASC");
				}
				
				// 선택된 개수 초기화
				$('#detailSelListCnt').text("0");
				$inMoreDetail.ui.page = 1;	// 페이징 초기화
				$inMoreDetail.ui.selectTotSurvDataList = []	// 선택한 총조사 목록 초기화
				
				// 데이터 조회
				$inMoreDetail.ui.searchList();
			});
			
			// 리스트 페이징 더보기 totSurvDataListMore
			body.on("click", "#totSurvDataListMore", function() {
				$inMoreDetail.ui.page++;
				// 데이터 조회
				$inMoreDetail.ui.searchList();
			});
						
			// 주제별 차트 주제 변경
			body.on("change", "select[name='themaSelectBox']", function(){
				$totSurvMain.ui.loading(true);	// 로딩바
				
				// 차트 클릭 관련 초기화
				$inMoreDetail.ui.chartSelectedItemClear();
				
				var tempItemSeq = $(this).val();
				var tempId = "#"+$(this).attr("id")+" option:selected";
				var tempSurvId = $(tempId).attr("data-surv-id");
				var tempDataCd = $(tempId).attr("data-cd");
				
				srvLogWrite("P0", "09", "05", "01", tempSurvId, "seq="+tempItemSeq);
				
				if($("#areaPopup_sgg option:selected").val() != "999"){
					$inMoreDetail.ui.admCd = $("#areaPopup_sido option:selected").val()+$("#areaPopup_sgg option:selected").val();
				} else {
					$inMoreDetail.ui.admCd = $("#areaPopup_sido option:selected").val();
				}
				
				setTimeout(function() {
					$inMoreDetail.ui.setOpenAPIBtnToggle(tempSurvId, tempDataCd);	// 개방형지도 버튼 토글
					$inMoreDetail.ui.getDataJson(tempSurvId, tempItemSeq, "1");	// 데이터 조회
				}, 100);
			});		
			
			// 지역선택 팝업 x 버튼 클릭
			body.on("click", "#commonTotSurv_detailSidoselectPop_close", function(){
				$inMoreDetail.ui.areaPopupToggle(false);
			});
			
			//지역선택 팝업 시도 변경
			body.on("change", "#areaPopup_sido", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					// 시군구 조회
					$inMoreDetail.ui.getAreaPopupSido($("#areaPopup_sido option:selected").val());
					$inMoreDetail.ui.getAreaPopupSgg($("#areaPopup_sido option:selected").val(), "999");
				}, 100);
			});
			
			//지역선택 팝업 시도 변경
			body.on("change", "#areaPopup_sgg", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				$inMoreDetail.ui.getTotDetailAreaAtdrcCheck($("#areaPopup_sido option:selected").val()+$("#areaPopup_sgg option:selected").val());	// 비자치구여부 조회
			});
						
			//지역선택 팝업 확인 버튼
			body.on("click", "#commonTotSurv_detailSidoselectPop_ok", function() {
				//20201204 박은식 시계열과 중복 발생 방지 처리 START
				if($totSurvMain.ui.pageIndex == 0){
					$inMoreDetail.ui.areaPopupToggle(false);	// 지역선택 팝업 숨김
					$totSurvMain.ui.loading(true);	// 로딩바
					
					var sido_nm = $("#areaPopup_sido option:selected").text();
					var sgg_nm = $("#areaPopup_sgg option:selected").text();
					var adm_nm = "";
					
					if($("#areaPopup_sgg option:selected").val() != "999"){
						adm_nm = sido_nm + " " + sgg_nm;
						$inMoreDetail.ui.admCd = $("#areaPopup_sido option:selected").val()+$("#areaPopup_sgg option:selected").val();
					} else {
						adm_nm = sido_nm;
						$inMoreDetail.ui.admCd = $("#areaPopup_sido option:selected").val();
					}
					
					$(".detailTit-label").html(adm_nm);
					$inMoreDetailMap.ui.mapToggleId = "";	// 맵 토클 id
					
					// 차트 클릭 관련 초기화
					$inMoreDetail.ui.chartSelectedItemClear();
					
					// 개방형지도 체크
					if($("#openAPIBtn").hasClass("on")){
						$("#openAPIBtn").removeClass("on");
						$("select[name='OpenAPISelectBox']").hide();
					}
					
					setTimeout(function() {
						// 데이터 조회
						srvLogWrite("P0", "09", "05", "03", $inMoreDetailMap.ui.selectedSurvId, "sido_cd="+$("#areaPopup_sido").val()+",sgg_cd="+($("#areapopup_sgg").val()?$("#areapopup_sgg").val():""));
						$inMoreDetail.ui.getDataJson($inMoreDetailMap.ui.selectedSurvId, $inMoreDetailMap.ui.selectedItemSeq, "1");					
					}, 100);
				}
				//20201204 박은식 시계열과 중복 발생 방지 처리 END
			});
			
			// 줌 인
			body.on("click", ".zoom", function(){
				var that = $inMoreDetailMap.ui;
				if (!that.map.isFixedBound) {
					that.map.gMap.zoomIn(1);
				}
			});
			
			// 줌 아웃
			body.on("click", ".out", function(){
				var that = $inMoreDetailMap.ui;
				if (!that.map.isFixedBound) {
					that.map.gMap.zoomOut(1);
				}
			});
			
			// 개방형 지도 조회
			body.on("click", "#openAPIBtn", function(){
				var survId = $(this).attr("data-surv-id");
				var dataCd = $(this).attr("data-data-cd");
				
				if(!$(this).hasClass("on")){
					/** 개방형지도 설명 팝업 START */
					if($totSurvMain.ui.getCookie('mapPopTit') != "true"){
	    				$('.popupWrap').show();
	    				$("#commonTotSurvDetail_popup_back").show();
	    				$('.CloseWin').show();
	    				$('.mapInfo').addClass("on"); // 팝업 표출 될 때 버튼 on 클래스 추가
	    			} else {
    			    	$('.CloseWin').hide();
    			    	// 개방형 지도 데이터 조회
    					$inMoreDetail.ui.getOpenAPIMapData(survId, dataCd);
	    			}
					$('.mapInfo').show();
					/** 개방형지도 설명 팝업 END */
				} else {
					$(this).removeClass("on");
					$("select[name='OpenAPISelectBox']").hide();
					
					// 기존 맵 정보 조회
					var p_map_region = "sido";
					if($inMoreDetail.ui.admCd.length == 2){
						p_map_region = "sido";
					} else {
						p_map_region = "sgg";
					}
					$inMoreDetailMap.ui.drawMapData(p_map_region, "color");	
				}
			});
			
			// 개방형 지도 시도 선택
			body.on("change", "#OpenAPI_sido", function(){
				// 시군구 조회
				$inMoreDetail.ui.getOpenAPIAreaSgg($(this).val(), "999");
				$("#OpenAPI_sgg").trigger("change");
			});
			
			// 개방형 지도 시군구 선택
			body.on("change", "#OpenAPI_sgg", function(){
				// 읍면동 조회
				$inMoreDetail.ui.getOpenAPIAreaEmdong($("#OpenAPI_sido option:selected").val(), $(this).val(), "00");
				$("#OpenAPI_emdong").trigger("change");
			});
			
			// 개방형 지도 읍면동 선택
			body.on("change", "#OpenAPI_emdong", function(){
				var survId = $("#openAPIBtn").attr("data-surv-id");
				var dataCd = $("#openAPIBtn").attr("data-data-cd");
				// 개방형 지도 데이터 조회
				$inMoreDetail.ui.getOpenAPIMapData(survId, dataCd);
			});
			
			// 개방형지도 설명 팝업 닫기
			body.on("click", ".openAPIPopcloseBtn", function(){ //20201202 박은식 API 팝업  닫기버튼 클레스변경 (추후 추가될 시 해당 클레스 변경 필요함)
				$('.popupWrap').hide();
				$("#commonTotSurvDetail_popup_back").hide();
				
				// 개방형 지도 데이터 조회
				var survId = $("#openAPIBtn").attr("data-surv-id");
				var dataCd = $("#openAPIBtn").attr("data-data-cd");
				$inMoreDetail.ui.getOpenAPIMapData(survId, dataCd);
			});
			
			// 개방형지도 다시보지않음 클릭
			body.on("click", "#openApiPopupClose", function(){
				$totSurvMain.ui.setCookie('mapPopTit', 'true', 365); 
				$('#openWin').hide(); 
				$('.mapInfo').removeClass('on'); 
				$('#commonTotSurvDetail_popup_back').hide();
				
				// 개방형 지도 데이터 조회
				var survId = $("#openAPIBtn").attr("data-surv-id");
				var dataCd = $("#openAPIBtn").attr("data-data-cd");
				$inMoreDetail.ui.getOpenAPIMapData(survId, dataCd);
			});
			
		},
		
		/**
		 * @name         : refresh
		 * @description  : 헤더경로에서 삭제버튼 클릭시 화면 새로 그리기
		 * @date         : 2020.08.21
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param		 : region - 지역경계구분, lv_adm_cd - 지역코드
		 */
		refresh : function(region, lv_adm_cd){
			var upperRegCd = "";
			if(lv_adm_cd.length == 2) {
				upperRegCd = "00";
			} else if(lv_adm_cd.length == 5 && lv_adm_cd.substring(4,5) == "0") {
				upperRegCd = lv_adm_cd.substring(0,2);
			} else if(lv_adm_cd.length == 5 && lv_adm_cd.substring(4,5) != "0") {
				upperRegCd = lv_adm_cd.substring(0,4) + "0";
			} else {
				//upperRegCd = $populationDash.ui.upperRegionCheck($totSurvMain.ui.selectedYear, $totSurvMain.ui.selectedArea); //비자치구 -> 행정시 이동
				upperRegCd = lv_adm_cd.substring(0,2);
			}
			
			$('#sbx_sido').val(upperRegCd).prop("selected", true);
			getSggListOpt();
//			$('#sbx_sgg').val(area_cd.substr(2,3)).prop("selected", true);
//			getEmdListOpt();
//			$('#sbx_emd').val(area_cd.substr(5,2)).prop("selected", true);
			
			var admCd = "";
			var thema = $totSurvMain.ui.selectedThema;
			$totSurvMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
			$totSurvMain.ui.tileChangeYn = "Y";
			$inMoreDetailMap.ui.mapToggleId = ""; // 선택된 맵 토글 초기화
			$(".mapInfo").hide();
			if(region == "sgg"){
				$("#ageUnit").text("단위 : 천명"); //광역시도 일 경우 연령분포 차트 단위 변경
				admCd = "00"; // 시군구에서 삭제버튼 클릭시 전국조회를 위하여 지역코드 00 세팅
				$("#dash_sido option[value='99']").attr("selected", "true");
				$inMoreDetailMap.ui.mapRegion = "sido";
				$totSurvMain.ui.selectedArea = "00";
				$("#sidoFlow").remove();
				$("#sidoNm").remove();
				$("#sidoClose").remove();
				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				$totSurvMain.ui.selectedLevel = "0";
				$inMoreDetailMap.ui.map.zoom = 1;
				$(".Rangecontainer").hide(); //20200914 박은식 드릴다운에서 다시 전국으로 이동 시 range 숨김처리
				$("#areaDiv").html("전국"); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
			} else if(region == 'emdong') {
				$("#ageUnit").text("단위 : 명"); //시군구 이하 일 경우 연령분포 차트 단위 변경
				$totSurvMain.ui.selectedLevel = "2";
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$totSurvMain.ui.getSidoSggPos(upperRegCd);
					$("#dash_sido").val(upperRegCd.substring(0,2));
					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}
				$inMoreDetailMap.ui.mapRegion = "sgg"
				$totSurvMain.ui.selectedArea = admCd;
				$inMoreDetailMap.ui.map.zoom = 4; // 2020-10-07 [곽제욱] SGIS(개방형지도) 읍면동 -> 상위로 이동할 경우 map의 줌레벨을 4로
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				var title = $("#dash_sgg option:selected").text(); // 2020-10-26 [곽제욱] 선택지역 변경 
				$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
			} else {
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$("#dash_sido").val(upperRegCd.substring(0,2));
					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}
				
				$("#dash_sgg option[value='999']").attr("selected", "true");

				if(upperRegCd != ''){
					if(region == 'emdong'){ // atrdc
						
					} else if(region == 'sgg'){		// 2020-10-14 [주형식]  atdrc명 변경 
						$totSurvMain.ui.selectedLevel = "2";
						$inMoreDetailMap.ui.mapRegion = "sgg";
						$totSurvMain.ui.getSidoSggPos(admCd.substring(0,5));
						$totSurvMain.ui.selectedArea = admCd.substring(0,5);
					} else if(region == 'atdrc'){		// 2020-10-14 [주형식]  atdrc명 변경 
						$totSurvMain.ui.selectedLevel = "2";
						$inMoreDetailMap.ui.mapRegion = "sgg";
						$totSurvMain.ui.getSidoSggPos(admCd.substring(0,2));
						$totSurvMain.ui.selectedArea = admCd.substring(0,2);
					} else {
						$totSurvMain.ui.selectedLevel = "1";
						$inMoreDetailMap.ui.mapRegion = "sido"
						$totSurvMain.ui.getSidoSggPos("00");
						$totSurvMain.ui.selectedArea = "00";
					}
				} else {
					$inMoreDetailMap.ui.mapRegion = "sgg";
					$totSurvMain.ui.getSidoSggPos(admCd.substring(0,2));
					$totSurvMain.ui.selectedArea = admCd.substring(0,2);
					var title = $("#dash_sido option:selected").text(); // 2020-10-26 [곽제욱] 선택지역 변경 
					$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
				}

				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				$totSurvMain.ui.selectedLevel = "2";
				$inMoreDetailMap.ui.map.zoom = 4;
			}
			$inMoreDetail.event.allChange("1");
		},
		
		/**
		 * @name		 : allChange 
		 * @description  : 지도 및 차트 렌더링
		 * @date		 : 2021.11.03
		 * @author		 : 이영호
		 * @history 	 :
		 */
		allChange : function(mode) {
			$(".colorck li:eq(0)").html("<a id=\"grid_lg_color_0\" href=\"javascript:void(0)\" class=\"on\" data-color=\"#cd1103\" start-color=\"#ffd75d\" style=\"background: rgb(205, 17, 3);\">#cd1103</a>");
			
			if($inMoreDetail.ui.selectedObj.length == 0) {
				$inMoreDetail.ui.selectedChartOrd = $("#chrItmList option:selected").data("chartord");
				let chartData = $inMoreDetail.ui.dispOptions[1];
				// 기본 파라미터 설정
				$inMoreDetail.ui.ajax.params = {			
					surv_year_list: $("#tmsYears option:selected").val()		// 수록시점
					, org_id_list: $inMoreDetail.ui.selectedOrgId					// 조직번호
					, tbl_id_list: $inMoreDetail.ui.selectedTblId					// 통계표 ID
					, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
					, char_itm_id_list: $inMoreDetail.ui.selectedCharItmId	// 표특성항목
					, adm_cd:  ""// 지역코드
					, prt_type: "total"												// 출력방식 total:계 else 모두		
					, category: $inMoreDetailMap.ui.category							// 카테고리
					, odr_col_list: "DTVAL_CO"									// 정렬기준
					, odr_type: "DESC"											// 내림차순, 오름차순
				};	
				
				// 설정된 옵션을 이용해 ITEM 파라미터 추가
				fn_bindItmList(chartData);
			}
			
			
			var tblIdList = $inMoreDetail.ui.ajax.params["tbl_id_list"];
			if(tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514_10" ){
				var char_itm_id_list = "";
				// 차트ord 1 2 3
				if($inMoreDetail.ui.selectedChartOrd == 1){
					char_itm_id_list = $inMoreDetail.ui.selectedCharItmId+",T201,T202,T203,T204,T205";
				}else if($inMoreDetail.ui.selectedChartOrd == 2){
					char_itm_id_list = $inMoreDetail.ui.selectedCharItmId+",T2011,T2021,T2031,T2041,T2051";
				}else if($inMoreDetail.ui.selectedChartOrd == 3){
					char_itm_id_list = $inMoreDetail.ui.selectedCharItmId+",T2012,T2022,T2032,T2042,T2052";
				}
				$inMoreDetail.ui.ajax.params["char_itm_id_list"] = char_itm_id_list;
			}
			
			
			
			$inMoreDetail.ui.ajax.params["ftn_val_lv"] = "";
			$inMoreDetail.ui.ajax.params["ftn_val_at"] = "";
			
			$inMoreDetail.event.drawContent(mode);
			
			if(mode == "1") {
				if($totSurvMain.ui.selectedArea == "00") {
					$inMoreDetailMap.ui.drawMapData("sido", "color");
				} else if($totSurvMain.ui.selectedArea.length == 2 && $totSurvMain.ui.selectedArea != "00") {
					$inMoreDetailMap.ui.drawMapData("sgg", "color");
				} else if($totSurvMain.ui.selectedArea.length == 5 && $inMoreDetail.ui.dispOptions[$("#chrItmList option:selected").data("chartord")][0].regionEnd == "시군구") {
					$inMoreDetailMap.ui.drawMapData("sgg", "color");
				} else if($totSurvMain.ui.selectedArea.length == 5 && ($inMoreDetail.ui.dispOptions[$("#chrItmList option:selected").data("chartord")][0].regionEnd == "읍면동"||$inMoreDetail.ui.dispOptions[$("#chrItmList option:selected").data("chartord")][0].regionEnd == "동읍면")) {
					$inMoreDetailMap.ui.drawMapData("emd", "color");
				}
				
				if($inMoreDetail.itlist == "J1_3"){
					drawCharts3();
				} else {
					drawCharts3_1();
				}
				
				if($("#sbx_sido option:selected").val() == "00"){
					$inMoreDetail.event.pathChange("nationwide", $("#sbx_sido option:selected").val());				
				}else if($("#sbx_sido option:selected").val() != "00"){
					if($("#sbx_sgg option:selected").val() == "000"){
						$inMoreDetail.event.pathChange("sgg", $totSurvMain.ui.selectedArea);
					}else if($("#sbx_sgg option:selected").val() != "000" && $("#sbx_emd option:selected").val() == "000"){
						$inMoreDetail.event.pathChange("atdrc", $("#sbx_sido option:selected").val() + ($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val()));
					}else if($("#sbx_sgg option:selected").val() != "000" && $("#sbx_emd option:selected").val() != "000"){
						$inMoreDetail.event.pathChange("emdong", $("#sbx_sido option:selected").val() + ($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val()) + $("#sbx_emd option:selected").val() );
					}
				}
				
				if($inMoreDetail.ui.chartClickItmCd != "" && $inMoreDetail.ui.chartClickItmCd != undefined) {
					$("#inMoreDetailCorpCountOfIndustryChart").highcharts().series[0].data.forEach(function(bar) {
						if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
		    				if(bar.category == $houseDash.chartItmClickName) {
				    			$(".ttitle.charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
				    			bar.select();
				    		}
		    			}
					});
				}
			} else if(mode == "3"){
				var sbx_sido_cd = $("#sbx_sido option:selected").val();
				var sbx_sgg_cd  = ($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				var sbx_emd_cd  = $("#sbx_emd option:selected").val();
				if(sbx_sgg_cd=='000') sbx_sgg_cd = '';
				if(sbx_emd_cd=='000') sbx_emd_cd = '';
				
				var area_cd = sbx_sido_cd+sbx_sgg_cd+sbx_emd_cd;
				
				if(area_cd.length != 7){
					if($inMoreDetailMap.ui.mapToggleId != area_cd) {
						var adm_cd = area_cd;
						var sidoCd = adm_cd.substring(0,2);
						var sggCd = "999";
						$inMoreDetail.ui.admCd = adm_cd;
						
						var clickLength = area_cd.length;
						if(clickLength=="2"){
							$("#sbx_sido").val(area_cd).prop("selected", true);
							getSggListOpt();
						}else if(clickLength=="5"){
							$('#sbx_sido').val(area_cd.substr(0,2)).prop("selected", true);
							getSggListOpt();
							$('#sbx_sgg').val(area_cd.substr(2,3)).prop("selected", true);
							getEmdListOpt();
						}else if(clickLength=="7"){
							$('#sbx_sido').val(area_cd.substr(0,2)).prop("selected", true);
							getSggListOpt();
							$('#sbx_sgg').val(area_cd.substr(2,3)).prop("selected", true);
							getEmdListOpt();
							$('#sbx_emd').val(area_cd.substr(5,2)).prop("selected", true);
						}
						
						srvLogWrite("P0", "09", "05", "03", $inMoreDetailMap.ui.selectedSurvId, "sido_cd="+adm_cd);
						$inMoreDetailMap.ui.getSidoSggPos(adm_cd);
						
						$inMoreDetail.ui.getDataJson($inMoreDetailMap.ui.selectedSurvId, $inMoreDetailMap.ui.selectedItemSeq, "2")
						
						// 선택한 지역 하이라이트
			    		$inMoreDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
			    		$inMoreDetailMap.ui.mapToggleId = area_cd;
			    		
			    		if($totSurvMain.ui.chartTarget != ""
			    			&& typeof($totSurvMain.ui.chartIndex) == "number"
			    			&& $totSurvMain.ui.chartColor != ""){
			    			 
			    			$inMoreDetail.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
			    		}
			    		
			    		$totSurvMain.ui.selectedArea = area_cd;
						//20201201 박은식 선택된 경계 재선택 시 초기화 START
					} else {
						if($inMoreDetailMap.ui.mapToggleId.length == 2){
							var adm_cd = $inMoreDetailMap.ui.mapToggleId;
							$inMoreDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
							$inMoreDetailMap.ui.mapToggleId = "99";
							$inMoreDetail.ui.admCd = "99";
							$inMoreDetail.ui.getDataJson($inMoreDetailMap.ui.selectedSurvId, $inMoreDetailMap.ui.selectedItemSeq, "2")
							$inMoreDetailMap.ui.getSidoSggPos("99");
							$totSurvMain.ui.selectedArea = "00";
						} else {
							if($inMoreDetailMap.ui.isAtdrc == true){
								var adm_cd = $inMoreDetailMap.ui.mapToggleId.substring(0,4)+"0";
								$inMoreDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
								$inMoreDetailMap.ui.mapToggleId = $inMoreDetailMap.ui.mapToggleId.substring(0,4)+"0"
								$inMoreDetail.ui.admCd = adm_cd;
								$inMoreDetail.ui.getDataJson($inMoreDetailMap.ui.selectedSurvId, $inMoreDetailMap.ui.selectedItemSeq, "2")
								$inMoreDetailMap.ui.getSidoSggPos(adm_cd)
							} else {
								var adm_cd = $inMoreDetailMap.ui.mapToggleId.substring(0,2);
								$inMoreDetailMap.ui.map.setDetailPolyLayerHighlight(adm_cd);
								$inMoreDetailMap.ui.mapToggleId = $inMoreDetailMap.ui.mapToggleId.substring(0,2);
								$inMoreDetail.ui.admCd = adm_cd;
								$inMoreDetail.ui.getDataJson($inMoreDetailMap.ui.selectedSurvId, $inMoreDetailMap.ui.selectedItemSeq, "2")
								$inMoreDetailMap.ui.getSidoSggPos(adm_cd)
							}
						}
						$inMoreDetail.ui.getDataJson($inMoreDetailMap.ui.selectedSurvId, $inMoreDetailMap.ui.selectedItemSeq, "2")
						if($totSurvMain.ui.chartTarget != ""
			    			&& typeof($totSurvMain.ui.chartIndex) == "number"
			    			&& $totSurvMain.ui.chartColor != ""){
			    			 
			    			$inMoreDetail.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
						}
					}
				}
			}
		},
		
		/**
		 * @name		 : drawContent 
		 * @description  : 차트나 표 그리기
		 * @date		 : 2021.11.03
		 * @author		 : 이영호
		 * @history 	 :
		 */
		drawContent : function(mode) {			
			if($(".switch_box .slider").hasClass("grid")) { // 차트, 표 여부
				$inMoreDetail.ui.selectedType = "grid";
			} else {
				$inMoreDetail.ui.selectedType = "chart";
			}

			let chartOrd = $inMoreDetail.ui.selectedChartOrd;
			
			if($inMoreDetail.ui.dispOptions[chartOrd][0].dispVarOrd == $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd){
				$inMoreDetail.ui.ajax.params["ftn_val_lv"] = $inMoreDetail.ui.dispOptions[chartOrd][0].dispVarOrd;
				$inMoreDetail.ui.ajax.params["ftn_val_at"] = "Y";
			}else {
				$inMoreDetail.ui.ajax.params["ftn_val_lv"] = "";
				$inMoreDetail.ui.ajax.params["ftn_val_at"] = "";
			}
			
			// 초기화
			//$inMoreDetail.ui.clear();
			// 차트 클릭 관련 초기화
			$inMoreDetail.ui.chartSelectedItemClear();
			// 차트 데이터 초기화
			$inMoreDetail.ui.chartDataClear();
			$inMoreDetail.selectedCategory = "";
			
			
			$("#inMoreDetailCorpCountOfIndustryChart").empty();
			$("#timeSeriesCorpCountIndustryChart").empty();
			if(mode!="2")
				$("#industryOfAreaChart").empty();
			
			let tblist = $inMoreDetail.ui.selectedTblId;
			let itlist = $inMoreDetail.ui.selectedItemId;
			$inMoreDetail.itlist = $inMoreDetail.ui.selectedItemId;
			
			
			if(tblist == "DT_1KI1509" || tblist == "DT_1KI1510" ||tblist == "DT_1KI1511"
				|| tblist == "DT_1KI1509_10" || tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"
				|| tblist == "DT_1KI2001" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003")	{
				$inMoreDetail.ui.ajax.params.adm_cd = "";
				$inMoreDetail.ui.ajax.params.ftn_val_at  = "";
				$inMoreDetail.ui.ajax.params.ftn_val_lv  = "";
			}
			
			if(tblist == "DT_1KI1516_10"){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
				$inMoreDetail.ui.ajax.params.ov_l2_list = "00";
				$inMoreDetail.ui.ajax.params.ov_l4_list = "F0,F1,F2,F3";
			}
			
			//if($inMoreDetail.ui.selectedType == "chart") {
				$("#title3").show();
				if(itlist == "J1_3"){
					drawCharts1_1();
					drawCharts2();
					if(mode!="2") drawCharts3();
					drawGrid1_1();
				} else {
					//경제 총조사를 제외한 나머지 총조사
					$inMoreDetail.ui.ajax.params.adm_cd = "";
					$inMoreDetail.ui.ajax.params.ftn_val_at  = "";
					$inMoreDetail.ui.ajax.params.ftn_val_lv  = "";
//					if("drawCharts1_1_success"==drawCharts1_1()){
					drawCharts1_1();
					drawCharts2_1();
					if(mode!="2") drawCharts3_1();
					drawGrid1_1();
//					}
				}
			/*} else {
				$("#title3").hide();
				$("#industryOfAreaChart2").hide();
				
				if(itlist == "J1_3"){
					drawGrid1();
					
					if(tblist == "DT_1KI1509" || tblist == "DT_1KI1510" ||tblist == "DT_1KI1511"
					|| tblist == "DT_1KI1509_10" || tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"
					|| tblist == "DT_1KI2001" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003")	{
						$("#title2").hide();
					}else{
						$("#title2").show();
						drawGrid2();
					}
				}else{
					//경제 총조사를 제외한 나머지 총조사
					$("#title2").hide();
					drawGrid1_1();
				}
			}*/
		},
		
		/**
		 * @name		 : setDispOptions 
		 * @description  : 화면 셋팅 불러오기
		 * @date		 : 2021.08.30
		 * @author		 : 이영호
		 * @history 	 :
		 */
		setDispOptions : function() {
			$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.ui.selectedOrgId;
			$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.ui.selectedTblId;			
			$inMoreDetail.ui.dispOptions = {}, $inMoreDetail.ui.befDispOptions = {};
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함				
				url: "/view/totSurv/getDispSrvDetailList.do",
				data: $inMoreDetail.ui.ajax.params,
				dataType: "json",
				success: function(res) {
					for(var i=0; i<res.dispOptions.length; i++) {
						if($inMoreDetail.ui.dispOptions[res.dispOptions[i].chartOrd] == undefined) {
							$inMoreDetail.ui.dispOptions[res.dispOptions[i].chartOrd] = [];
							for(var j=0; j<Object.keys($inMoreDetail.ui.dispOptions).length; j++) {
								if(Object.keys($inMoreDetail.ui.dispOptions)[j] == res.dispOptions[i].chartOrd) {
									$inMoreDetail.ui.dispOptions[res.dispOptions[i].chartOrd].push(res.dispOptions[i]);
								}
							}
						} else {
							for(var j=0; j<Object.keys($inMoreDetail.ui.dispOptions).length; j++) {
								if(Object.keys($inMoreDetail.ui.dispOptions)[j] == res.dispOptions[i].chartOrd) {
									$inMoreDetail.ui.dispOptions[res.dispOptions[i].chartOrd].push(res.dispOptions[i]);
								}
							}
						}						
					}
					
					// 전년도 통계표 옵션 확인 - 경제총조사만 ..
					if($inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId] != undefined) {
						$inMoreDetail.ui.ajax.params.tbl_id_list = $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].tbl_id;
						$inMoreDetail.ui.ajax.params.org_id_list = $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].org_id;
						$inMoreDetail.ui.ajax.params.surv_year_list = $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].year;
						
						// DT_1KI2008는 T10 => T01 이런식으로 반대로 되어있음
						if($inMoreDetail.ui.ajax.params.tbl_id_list == "DT_1KI2008" ){
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T01";
						}
						
						$.ajax({
							method: "POST",
							async: false,	// 반드시 동기처리 해야 함
							url: "/view/totSurv/getDispSrvDetailList.do",
							data: $inMoreDetail.ui.ajax.params,
							dataType: "json",
							success: function(res) {
								for(var i=0; i<res.dispOptions.length; i++) {
									if($inMoreDetail.ui.befDispOptions[res.dispOptions[i].chartOrd] == undefined) {
										$inMoreDetail.ui.befDispOptions[res.dispOptions[i].chartOrd] = [];
										for(var j=0; j<Object.keys($inMoreDetail.ui.befDispOptions).length; j++) {
											if(Object.keys($inMoreDetail.ui.befDispOptions)[j] == res.dispOptions[i].chartOrd) {
												$inMoreDetail.ui.befDispOptions[res.dispOptions[i].chartOrd].push(res.dispOptions[i]);
											}
										}
									} else {
										for(var j=0; j<Object.keys($inMoreDetail.ui.befDispOptions).length; j++) {
											if(Object.keys($inMoreDetail.ui.befDispOptions)[j] == res.dispOptions[i].chartOrd) {
												$inMoreDetail.ui.befDispOptions[res.dispOptions[i].chartOrd].push(res.dispOptions[i]);
											}
										}
									}						
								}						
							},
							error: function(e) {
								//$totSurvMain.ui.alert(errorMessage);
							}
						});
					}
				},
				error: function(e) {
					//$totSurvMain.ui.alert(errorMessage);
				}
			});
		},
		
		/**
		 * checkIsAtdrc
		 * 비자치구 여부 체크 
		 * admCd
		 */
		checkIsAtdrc : function(admCd){
			$inMoreDetailMap.ui.isAtdrc = false;
			// 비자치구 여부 체크
			if(admCd != undefined && admCd.length == 5){
				var tmpSido = admCd.substring(0,2);
				
				
				// ajax 시작
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/totSurv/common/getAtdrcCheck.json",
				    data: {year:$totSurvMain.ui.selectedYear, region_cd:admCd},
					dataType: "json",
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//console.log("################# res = " + res.result.rslt);
						$inMoreDetailMap.ui.isAtdrc = res.result.rslt;
					}
				});
				
			}
			else{
				$inMoreDetailMap.ui.isAtdrc = false;
			}
		},
		
		/**
		 * @name         : titleChange
		 * @description  : 각 이벤트에 대한 타이틀 변경(폴리곤 선택, 타일맵 클릭, pathChange 등)
		 * @date         : 2020.09.25
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param		 : adm_cd : 선택한 지역코드
		 */
		titleChange : function(adm_cd){
			var thema = $totSurvMain.ui.selectedThema; //20201020 박은식 대시보드 분기처리기준 변수 추가
			// 맵 선택의 경우
			if($inMoreDetailMap.ui.mapToggleId != adm_cd) {
				if(adm_cd == "00") {
					title = "전국";
				} else {					
					if(adm_cd.length == 2 && $inMoreDetailMap.ui.mapToggleId == ""){
						//20201202 박은식 주택 농업 임업 어업 첫 진입 시 전국으로 처리 하기위한 로직 추가 START
						if(adm_cd == "99" || adm_cd == "00"){
							$("#dash_sido").val("00").prop("selected", true);
							title = $("#dash_sido option:selected").text();
						} else {
							title = $("#dash_sido option:selected").text(); // 2020-10-27 [곽제욱] title 문구 변경
						}
						//20201202 박은식 주택 농업 임업 어업 첫 진입 시 전국으로 처리 하기위한 로직 추가 END
						// 2020-10-27 [곽제욱] title 문구변경 로직 추가 START
					} else if(adm_cd.length == 2 && $inMoreDetailMap.ui.mapToggleId.length == 2 && $inMoreDetailMap.ui.mapToggleId != ""){
						title = $("#dash_sido option[value='"+adm_cd+"']").text();
					} else if(adm_cd.length == 2 && $inMoreDetailMap.ui.mapToggleId.length == 5 && $inMoreDetailMap.ui.mapToggleId != ""){
						title = $("#dash_sgg option[value='"+$inMoreDetailMap.ui.mapToggleId.substring(2,5)+"']").text();
						// 2020-10-27 [곽제욱] title 문구변경 로직 추가 END
					} else if(adm_cd.length == 5 && $inMoreDetailMap.ui.mapToggleId != ""){
						title = $("#dash_sgg option[value='"+adm_cd.substring(2,5)+"']").text(); // 2020-10-27 [곽제욱] title 문구 변경
					} else if(adm_cd.length == 7){
						title = $("#sbx_emd option:selected").text();
					}else{
						/** 2020-10-06 [곽제욱] 시군구레벨에서 토글될경우 선택은 시군구, 선택취소는 시도 START */
						if($("#dash_sgg").val() == "999"){
							/** 2020-10-27 [곽제욱] sido가 전체일 경우 예외처리 START */
							if($("#dash_sido").val() == "99"){
								title = "전국";
							} else {
								title = $("#dash_sido option:selected").text();
							}
							/** 2020-10-27 [곽제욱] sido가 전체일 경우 예외처리 END */
						} else {
							title = $("#dash_sgg option:selected").text(); // 2020-10-27 [곽제욱] title 문구 변경
						}
						/** 2020-10-06 [곽제욱] 시군구레벨에서 토글될경우 선택은 시군구, 선택취소는 시도 END */
					}
				}
			} else {
				//20201215 박은식 랭크 이동 시 같은 순위의 랭크를 그대로 다시 선택할 경우 지역명 표시 안되는 문제를 일으키는 소스 제거 START
				/*if(adm_cd.length == 2){  
					title = "";
				} else {*/
				if($inMoreDetailMap.ui.isAtdrc){
					if(adm_cd.substring(0,4)+"0" == adm_cd){
						title = $("#sbx_sgg option:selected").text();
					} else {
						/** 2020-10-13 [곽제욱] 시군구 분기처리 START */
						if($totSurvMain.ui.selectedArea.length == 5 && $inMoreDetailMap.ui.mapToggleId == ""){
							title = $("#dash_sgg option[value='"+$totSurvMain.ui.selectedArea.substring(2,5)+"']").text();
						}
						else{
							title = $("#sbx_gg option:selected").text();
						}
						/** 2020-10-13 [곽제욱] 시군구 분기처리 END */
					}
				} else {
					title = $("#dash_sido option:selected").text(); // 2020-10-27 [곽제욱] title 문구 변경
				}
			}
			/*}*/ 
			//20201215 박은식 랭크 이동 시 같은 순위의 랭크를 그대로 다시 선택할 경우 지역명 표시 안되는 문제를 일으키는 소스 제거 END
			//$("#areaDiv").css("display", "inline")
			//20201203 박은식 - 시계열일 때 areaDiv index가 0인 title만 변경되므로 시계열은 분기처리해서 양쪽 모두 변경되도록 처리 START
			if($totSurvMain.ui.pageIndex == 12){
				$("#rightMapDiv > #areaDiv").html(title);
				$("#leftMapDiv > #areaDiv").html(title);
			} else {
				$("#areaDiv").html(title);
			}
			//20201203 박은식 - 시계열일 때 areaDiv index가 0인 title만 변경되므로 시계열은 분기처리해서 양쪽 모두 변경되도록 처리 END
			//20201020 박은식 대시보드 분기처리 END
		},
		
		/**
		 * @name         : pathChange
		 * @description  : 맵이동 or 타일맵 클릭으로 인하여 지역경계 변동이 일어났을경우 경로 수정
		 * @date         : 2020.08.21
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param		 : region - 지역경계구분, lv_adm_cd - 선택한 지역 코드
		 */
		pathChange : function(region, lv_adm_cd){
			$(".locationSpan").children(":gt(1)").remove();//2019-09-16 [이영호] 상단 지역 Path 초기화
			var lv_adm_nm = "";
			var lv_parent_adm_nm = "";
			var html = "";
			var emptyYn = "";
			var srvLogHtml = "javascript:srvLogWrite('P0','01','02','00','"+$totSurvMain.ui.selectedThema+"');";
			
			if(region == "sgg"){
				$("#dash_sido").val(lv_adm_cd)// 2020-11-30 [곽제욱] dash_diso 값 세팅하도록 변경
				lv_adm_nm = $("#dash_sido option[value=" + lv_adm_cd.substring(0,2) + "]").text(); 
				if(lv_adm_cd.length == 2) {
					if(lv_adm_cd != "00") {						
						html += "<span class='flow' id='sidoFlow'></span>";
						html += "<span class='name' id='sidoNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'					
					}
					$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
					$("#sggNm").remove();
					$("#sggFlow").remove();
					$("#sggClose").remove();
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 START */
					$("#emdongFlow").remove();
					$("#emdongClose").remove();
					$("#emdongNm").remove();
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 END */
				} else {
					let lv_sgg_nm = $("#dash_sgg option[value=" + lv_adm_cd.substring(2,5)+ "]").text();
					html += "<span class='flow' id='sidoFlow'></span>";
					html += "<span class='name' id='sidoNm'>"+ lv_adm_nm +"</span>"
					html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					html += "<span class='flow' id='sggFlow'></span>";
					html += "<span class='name' id='sggNm'>"+ lv_sgg_nm +"</span>"
					html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 START */
					$("#emdongFlow").remove();
					$("#emdongClose").remove();
					$("#emdongNm").remove();
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 END */
				}				
			} else if(region == "nationwide"){
				html += '<img src="/images/totSurv/marker.png" class="marker" alt="">';
	      		html += '<span class="name">대한민국</span>';
				$("#locationPath > div").html(html); //2020.11.25[신예리] location영역 div 추가
				$("#dash_sido").val("99")
			} else if(region == "atdrc"){ // 2020-10-14 [주형식] 파라메터명 변경
				$("#dash_sido").val(lv_adm_cd.substring(0,2))
				lv_parent_adm_nm = $("#sbx_sido option:selected").text();
				$("#sidoNm").html(lv_parent_adm_nm);
				$("#sidoClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+"sgg"+"\', \'"+"00"+"\')")
				$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
				lv_adm_nm = ($("#sbx_gg").val()==='000'?$("#sbx_sgg option:selected").text():$("#sbx_gg option:selected").text());
				emptyYn = $("#sggNm").html();
				/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 START */
				var sidoEmptyYn =$("#sidoNm").html();
				if(sidoEmptyYn=="" || sidoEmptyYn == undefined){
					html += "<span class='flow' id='sidoFlow'></span>";
					html += "<span class='name' id='sidoNm'>"+ lv_parent_adm_nm +"</span>"
					html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+region+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'
				} else {
					$("#sidoNm").html(lv_parent_adm_nm);
					$("#sidoClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+region+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
				}
				/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 END */
				if(emptyYn=="" || emptyYn == undefined){
					html += "<span class='flow'  id='sggFlow'></span>";
					html += "<span class='name' id='sggNm'>"+ lv_adm_nm +"</span>"
					html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
				} else {
					$("#sggNm").html(lv_adm_nm);
					/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 START */
					//$("#sggClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+region+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
					$("#sggClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 END */
					$("#emdongFlow").remove();
					$("#emdongNm").remove();
					$("#emdongClose").remove();
				} 
				$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
			} else {
				$inMoreDetailMap.ui.checkIsAtdrc(lv_adm_cd.substring(0,4)+"0")
				//  행정자치 하위 구인경우
				if($inMoreDetailMap.ui.isAtdrc){
					$totSurvMain.ui.getSidoSggPos(lv_adm_cd); // 2020-11-30 [곽제욱] dash_sido 세팅 추가
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
					lv_adm_nm = $("#sbx_sgg option:selected").text();
					// 2020-12-01 [곽제욱] 신규로직 추가 START
					var sgg_adm_nm = $("#"+($('#sbx_gg').val()==='000'?'sbx_sgg':'sbx_gg')+" option[value='"+lv_adm_cd.substring(2,5)+"']").text();
					var sido_adm_nm = $("#sbx_sido option[value='"+lv_adm_cd.substring(0,2)+"']").text();
					// 2020-12-01 [곽제욱] 신규로직 추가 START
					var stringIndex = lv_adm_nm.indexOf(" ");
					//lv_adm_nm = lv_adm_nm.substring(stringIndex, lv_adm_nm.length);
					lv_adm_nm = $("#sbx_emd option:selected").text();
					emptyYn = $("#emdongNm").html();
					
					/** 2021.06.02[한광희] 지자체 연계 URL 시군구 셋팅 수정(비자치구일 경우) START */
					var sidoEmptyYn =$("#sidoNm").html();
					if(sidoEmptyYn=="" || sidoEmptyYn == undefined){
						html += "<span class='flow' id='sidoFlow'></span>";
						html += "<span class='name' id='sidoNm'>"+ sido_adm_nm +"</span>"
						html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+"sgg"+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'
					} else {
						$("#sidoNm").html(sido_adm_nm);
						$("#sidoClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+"sgg"+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
					}
					var sggEmptyYn =$("#sggNm").html();
					if(sggEmptyYn=="" || sggEmptyYn == undefined){
						html += "<span class='flow'  id='sggFlow'></span>";
						html += "<span class='name' id='sggNm'>"+ sgg_adm_nm +"</span>"
						html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+"atdrc"+'\', \''+lv_adm_cd.substring(0,4)+"0"+'\')"></button>'
					} else {
						$("#sggNm").html(sgg_adm_nm);
						$("#sggClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+"atdrc"+"\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
					}
					/** 2021.06.02[한광희] 지자체 연계 URL 시군구 셋팅 수정(비자치구일 경우) END */
					
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='emdongFlow'></span>";
						html += "<span class='name' id='emdongNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="emdongClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+"emdong"+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						// 2020-12-01 [곽제욱] 신규로직 추가 START
						$("#sidoNm").html(sido_adm_nm);
						$("#sidoClose").attr("onclick", "$inMoreDetail.event.refresh(\'sido\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
						$("#sggNm").html(sgg_adm_nm);
						$("#sggClose").attr("onclick", "$inMoreDetail.event.refresh(\'atdrc\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
						// 2020-12-01 [곽제욱] 신규로직 추가 END
						$("#emdongNm").html(lv_adm_nm);
						$("#emdongClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					}
					$inMoreDetailMap.ui.isAtdrc = false;
				} else {
				
					$totSurvMain.ui.getSidoSggPos(lv_adm_cd); // 2020-11-30 [곽제욱] dash_sido 세팅 추가
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
					lv_adm_nm = $("#sbx_sgg option:selected").text();
					// 2020-12-01 [곽제욱] 신규로직 추가 START
					var sgg_adm_nm = $("#"+($('#sbx_gg').val()==='000'?'sbx_sgg':'sbx_gg')+" option[value='"+lv_adm_cd.substring(2,5)+"']").text();
					var sido_adm_nm = $("#sbx_sido option[value='"+lv_adm_cd.substring(0,2)+"']").text();
					// 2020-12-01 [곽제욱] 신규로직 추가 START
					var stringIndex = lv_adm_nm.indexOf(" ");
					//lv_adm_nm = lv_adm_nm.substring(stringIndex, lv_adm_nm.length);
					lv_adm_nm = $("#sbx_emd option:selected").text();
					emptyYn = $("#emdongNm").html();
					
					/** 2021.06.02[한광희] 지자체 연계 URL 시군구 셋팅 수정(비자치구일 경우) START */
					var sidoEmptyYn =$("#sidoNm").html();
					if(sidoEmptyYn=="" || sidoEmptyYn == undefined){
						html += "<span class='flow' id='sidoFlow'></span>";
						html += "<span class='name' id='sidoNm'>"+ sido_adm_nm +"</span>"
						html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+"sgg"+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'
					} else {
						$("#sidoNm").html(sido_adm_nm);
						$("#sidoClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+"sgg"+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
					}
					var sggEmptyYn =$("#sggNm").html();
					if(sggEmptyYn=="" || sggEmptyYn == undefined){
						html += "<span class='flow'  id='sggFlow'></span>";
						html += "<span class='name' id='sggNm'>"+ sgg_adm_nm +"</span>"
						html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+"atdrc"+'\', \''+lv_adm_cd.substring(0,4)+"0"+'\')"></button>'
					} else {
						$("#sggNm").html(sgg_adm_nm);
						$("#sggClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+"atdrc"+"\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
					}
					/** 2021.06.02[한광희] 지자체 연계 URL 시군구 셋팅 수정(비자치구일 경우) END */
					
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='emdongFlow'></span>";
						html += "<span class='name' id='emdongNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="emdongClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+"emdong"+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						// 2020-12-01 [곽제욱] 신규로직 추가 START
						$("#sidoNm").html(sido_adm_nm);
						$("#sidoClose").attr("onclick", "$inMoreDetail.event.refresh(\'sido\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
						$("#sggNm").html(sgg_adm_nm);
						$("#sggClose").attr("onclick", "$inMoreDetail.event.refresh(\'atdrc\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
						// 2020-12-01 [곽제욱] 신규로직 추가 END
						$("#emdongNm").html(lv_adm_nm);
						$("#emdongClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					}
					
					
					/*
					$totSurvMain.ui.getSidoSggPos(lv_adm_cd); // 2020-11-30 [곽제욱] dash_sido 세팅 추가
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
					lv_adm_nm = $("#sbx_sgg option:selected").text();
					emptyYn = $("#sggNm").html();
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='sggFlow'></span>";
						html += "<span class='name' id='sggNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$inMoreDetail.event.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						$("#sggNm").html(lv_adm_nm);
						$("#sggClose").attr("onclick", srvLogHtml+"$inMoreDetail.event.refresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					}
					*/
					
					
				}
				$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
			}
			
			$inMoreDetail.event.titleChange(lv_adm_cd); // 2020-12-01 [곽제욱] titlechange 함수 호출하지 않도록 변경
		},
	};
}(window, document));

/**
 * @name         : drawCharts1
 * @description  : 표출항목 데이터 호출(api)
 * @date         : 2021.11.03
 * @author	     : 이영호
 * @history 	 : 
 * @parameter	 : 
 */
var drawCharts1 = function() {	
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	
	//타이틀
	$("#inMoreDetailCorpCountOfIndustryChart").parent().parent().children(".item").children(".sub-L").html(
			$("#tmsYears option:selected").val() + "년 " + $("#chrItmList option:selected").text()	 
	);
	$("#inMoreDetailCorpCountOfIndustryChart").parent().parent().children(".item").children(".sub-R").html(
		"<button type='button' class='chartBtn' name='chartBtn' title='차트 유형'></button>" +
		"단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm
	);
	
	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];
		
		fn_bindItmList(chartData);
		
		// 현재 지역 파라미터 설정 필수
		if($("#sbx_sido option:selected").val() != "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val();
			if($("#sbx_sgg option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				if($("#sbx_emd option:selected").val() != "000"){
					$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();
				}
			}
		}else{
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $totSurvMain.ui.selectedArea;
		}
		
		
		
		var tblIdList = $inMoreDetail.ui.ajax.params["tbl_id_list"];
		
		// DT_1KI2008는 T10 => T01 이런식으로 반대로 되어있음
		if(tblIdList == "DT_1KI2008"){
			$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T01";
		}
		
		if(tblIdList == "DT_1KI1516" || tblIdList == "DT_1KI2008" || tblIdList == "DT_1KI1516_10"){
			if(tblIdList == "DT_1KI1516_10"){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
				$inMoreDetail.ui.ajax.params.ov_l2_list = $totSurvMain.ui.selectedArea;
				$inMoreDetail.ui.ajax.params.ov_l4_list = "F0,F1,F2,F3";
			}else{
				$inMoreDetail.ui.ajax.params.ov_l1_list = $totSurvMain.ui.selectedArea;
				$inMoreDetail.ui.ajax.params.ov_l2_list = "0";
				$inMoreDetail.ui.ajax.params.ov_l4_list = "F0,F1,F2,F3";
			}
		}
		
		if(tblIdList == "DT_1KI2006" ){
			if($inMoreDetail.ui.selectedCharItmId == "T20"){
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20,T70,T30,T40,T50,T60";
			}else if($inMoreDetail.ui.selectedCharItmId =="T21"){
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T21,T31,T41,T51,T61,T71";
			}else if($inMoreDetail.ui.selectedCharItmId == "T22"){
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T22,T32,T42,T52,T62,T72";
			}
		}
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					$inMoreDetail.data.chart1 = res;
					inMoreDetailCorpCntIndustryChart($inMoreDetail.data.chart1);
				}
			},
			error:function(data) {
				alert('오류발생~!');
			}
		});
	} else {
		$("#inMoreDetailCorpCountOfIndustryChart").parent().show();
		$("#inMoreDetailCorpCountOfIndustryChart").html($("body>.DataNone").clone().show()[0]);
	}
}

var drawCharts1_1 = function() {
//	var resultVal = ""; 
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let optChartOrd = $inMoreDetail.ui.dispOptions[chartOrd];
	
	$("#inMoreDetailCorpCountOfIndustryChart").parent().prev().children(".sub-L").html(
			$("#tmsYears option:selected").val() + "년 " + $("#chrItmList option:selected").text()	 
	);
	$("#inMoreDetailCorpCountOfIndustryChart").parent().prev().children(".sub-R").html(
		"<button type='button' class='chartBtnMore' name='chartBtnMore' title='차트 유형'></button>" +
		"<div class='unitMore'>단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm + "</div>"
	);
	
	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];

		$inMoreDetail.ui.ajax.params = {
			surv_year_list: $("#tmsYears option:selected").val()		// 수록시점
			, org_id_list: $inMoreDetail.ui.selectedOrgId					// 조직번호
			, tbl_id_list: $inMoreDetail.ui.selectedTblId					// 통계표 ID
			, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
			//, char_itm_id_list: $inMoreDetail.ui.selectedCharItmId	// 표특성항목
			, char_itm_id_list: ""										// 표특성항목
			, adm_cd:  ""// 지역코드
			, prt_type: ""												// 출력방식 total:계 else 모두		
			, category: $inMoreDetailMap.ui.category							// 카테고리
			, odr_col_list: "DTVAL_CO"									// 정렬기준
			, odr_type: "DESC"											// 내림차순, 오름차순
		};
		
		fn_bindItmList(chartData);
		
		// 현재 지역 파라미터 설정 필수
		/*
		if($("#sbx_sido option:selected").val() != "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val();
			if($("#sbx_sgg option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				if($("#sbx_emd option:selected").val() != "000"){
					$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();
				}
			}
		}else{
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $totSurvMain.ui.selectedArea;
		}
		*/
		
		for(let i=0; i<optChartOrd.length; i++) {
			if(optChartOrd[i].varOrd == optChartOrd[i].dispVarOrd) {
				if(optChartOrd[i].dispVarOrd == 0) {
					$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "";
				} else {
					$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] = "";
				}
			}
		}
		for(let i=0; i<optChartOrd.length; i++) {
			if(optChartOrd[i].varOrd == optChartOrd[i].dispVarOrd) {
				if(optChartOrd[i].dispVarOrd == 0) {
					$inMoreDetail.ui.ajax.params["list_var_ord_list"] = "13999001";
					/*if($inMoreDetail.ui.chartClickItmCd != "") {
						if(optChartOrd[i].itmId == $inMoreDetail.ui.chartClickItmCd) {
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] = optChartOrd[i].itmId;
						}
					} else {*/
						if($inMoreDetail.ui.ajax.params["char_itm_id_list"].length > 0) {
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] += "," + optChartOrd[i].itmId;
						} else {
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] = optChartOrd[i].itmId;
						}
					//}
				} else {
					/*if($inMoreDetail.ui.chartClickItmCd != "") {
						if(optChartOrd[i].itmId == $inMoreDetail.ui.chartClickItmCd) {
							$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] = optChartOrd[i].itmId; 
						}
					} else {*/
						if($inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"].length > 0) {
							$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] += "," + optChartOrd[i].itmId;
						} else {
							$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] = optChartOrd[i].itmId;
						}
					//}
				}
			}
		}
		
		$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $inMoreDetailMap.ui.mapToggleId=='99'||$inMoreDetailMap.ui.mapToggleId==''?'00':$inMoreDetailMap.ui.mapToggleId;
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res.length > 0 ){
					$inMoreDetail.data.chart1 = res;
					inMoreDetailCorpCntIndustryChart1_1($inMoreDetail.data.chart1);
//					resultVal = "drawCharts1_1_success";
				}else{
//					$("#inMoreDetailCorpCountOfIndustryChart").parent().children(".item").children(".sub-L").hide();
//					$("#inMoreDetailCorpCountOfIndustryChart").parent().children(".item").children(".sub-R").hide();
//					$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-L").hide();
//					$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-R").hide();
//					alert("데이터가 없습니다.");
					$("#inMoreDetailCorpCountOfIndustryChart").parent().show();
					$("#inMoreDetailCorpCountOfIndustryChart").html($("body>.DataNone").clone().show()[0]);
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	} else {
		$("#inMoreDetailCorpCountOfIndustryChart").parent().show();
		$("#inMoreDetailCorpCountOfIndustryChart").html($("body>.DataNone").clone().show()[0]);
	}
//	return resultVal;
}

/**
 * @name         : drawCharts2 
 * @description  : 산업별/년도별 비교 데이터 호출(api)
 * @date         : 2021.11.03
 * @author	     : 이영호
 * @history 	 : 
 * @parameter	 : 
 */
var drawCharts2 = function() {
	//타이틀
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-L").html(
		"연도별/" + $("#chrItmList option:selected").text()
	);
	$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-R").html(
		"단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm
	);
	
	// 전년도 설정 값 존재 여부
	if(Object.keys($inMoreDetail.ui.befDispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.befDispOptions[chartOrd];
		
		$inMoreDetail.ui.ajax.params = {			
			surv_year_list: $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].year			// 수록시점
			, org_id_list: $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].org_id			// 조직번호
			, tbl_id_list: $inMoreDetail.mapper[$inMoreDetail.ui.selectedTblId].tbl_id			// 통계표 ID
			, list_var_ord_list: "" 															// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
			, char_itm_id_list: ""							// 표특성항목
			, adm_cd:  ""// 지역코드
			, prt_type: "total"																	// 출력방식 total:계 else 모두		
			, category: $inMoreDetailMap.ui.category											// 카테고리
			, odr_col_list: "DTVAL_CO"															// 정렬기준
			, odr_type: "DESC"																	// 내림차순, 오름차순
		};

		// 설정된 옵션을 이용해 ITEM 파라미터 추가
		fn_bindItmList(chartData);
		
		$inMoreDetail.ui.ajax.params.adm_cd = "";
		$inMoreDetail.ui.ajax.params.adm_unit = "";
		
		// 현재 지역 파라미터 설정 필수
		if($("#sbx_sido option:selected").val() != "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val();
			if($("#sbx_sgg option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				if($("#sbx_emd option:selected").val() != "000"){
					$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();
				}
			}
		}else{
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $totSurvMain.ui.selectedArea;
		}
		
		/*var tblIdList = $inMoreDetail.ui.ajax.params["tbl_id_list"];
		
		// DT_1KI2008는 T10 => T01 이런식으로 반대로 되어있음
		if(tblIdList == "DT_1KI2008"){
			$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T01";
		}
		
		if(tblIdList == "DT_1KI1516" || tblIdList == "DT_1KI2008" || tblIdList == "DT_1KI1516_10"){
			$inMoreDetail.ui.ajax.params["ov_l1_list"] = "";
			if(tblIdList == "DT_1KI1516_10"){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
				$inMoreDetail.ui.ajax.params.ov_l2_list = "00";
				$inMoreDetail.ui.ajax.params.ov_l4_list = "F0,F1,F2,F3";
			}
		}else if(tblIdList == "DT_1KI2006" ){
			if($inMoreDetail.ui.selectedCharItmId == "T20"){
				//$inMoreDetail.ui.ajax.params.char_itm_id_list = "T70,T30,T40,T50,T60";
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20";
			}else if($inMoreDetail.ui.selectedCharItmId =="T21"){
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T31,T41,T51,T61,T71";
			}else if($inMoreDetail.ui.selectedCharItmId == "T22"){
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T32,T42,T52,T62,T72";
			}
		} else if(tblIdList == "DT_1KI2003") {
			$inMoreDetail.ui.ajax.params.char_itm_id_list = "T50";
		}*/
		
		$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $inMoreDetailMap.ui.mapToggleId=='99'||$inMoreDetailMap.ui.mapToggleId==''?'00':$inMoreDetailMap.ui.mapToggleId;
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					$inMoreDetail.data.chart2 = res;
					timeSeriesCorpCountIndustryChart($inMoreDetail.data.chart1, $inMoreDetail.data.chart2); //첫번째 차트와 전년도 자료 비교
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	} else {
		$("#timeSeriesCorpCountIndustryChart").parent().show();
		$("#timeSeriesCorpCountIndustryChart").html($("body>.DataNone").clone().show()[0]);
	}
}

var drawCharts2_1 = function(gbn) {
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let optChartOrd = $inMoreDetail.ui.dispOptions[chartOrd];
	$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-L").html(
		"시계열 및 증감률"
	);
	$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-R").html(
		/*"<button type='button' class='chartBtnMore' name='chartBtnMore' title='차트 유형'></button>" +*/
		"<div class='unitMore'>단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm + "</div>"
	);
	
	var arr = [];
	var tmsYears = "";
	 
	$.each($('#tmsYears').find("option"), function(i,o){
		arr.push (o.value);
	});
	
	tmsYears = arr.join(",");

	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];
		let itmId = $inMoreDetail.ui.ajax.params["char_itm_id_list"];
		
		for(var j=0;j<chartData.length; j++) {
			if($inMoreDetail.ui.dispOptions[chartOrd][0].dispVarOrd == 0) {
				if(chartData[j].subsumYn == "Y") {
					itmId = chartData[j].itmId;
				}
			}
		}
		
		if(gbn =="fromDrawCharts1"){
			itmId = $inMoreDetail.ui.ajax.params["char_itm_id_list"];
		}
		
		$inMoreDetail.ui.ajax.params = {
			surv_year_list: tmsYears															// 수록시점
			, org_id_list: $inMoreDetail.ui.ajax.params["org_id_list"]							// 조직번호
			, tbl_id_list: $inMoreDetail.ui.ajax.params["tbl_id_list"]							// 통계표 ID
			, list_var_ord_list: "" 															// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
			, char_itm_id_list: itmId				// 표특성항목
			, adm_cd:  ""// 지역코드
			, prt_type: "total"																	// 출력방식 total:계 else 모두		
			, category: $inMoreDetailMap.ui.category											// 카테고리
			, odr_col_list: "DTVAL_CO"															// 정렬기준
			, odr_type: "DESC"																	// 내림차순, 오름차순
		};

		// 설정된 옵션을 이용해 ITEM 파라미터 추가
		fn_bindItmList(chartData);
		
		$inMoreDetail.ui.ajax.params.adm_cd = "";
		$inMoreDetail.ui.ajax.params.adm_unit = "";
		
		// 현재 지역 파라미터 설정 필수
		if($("#sbx_sido option:selected").val() != "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val();
			if($("#sbx_sgg option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				if($("#sbx_emd option:selected").val() != "000"){
					$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();
				}
			}
		}else{
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $totSurvMain.ui.selectedArea;
		}
		
		for(let i=0; i<optChartOrd.length; i++) {
			if(optChartOrd[i].varOrd == optChartOrd[i].dispVarOrd) {
				if(optChartOrd[i].dispVarOrd == 0) {
					if($inMoreDetail.ui.chartClickItmCd != "" && $inMoreDetail.ui.chartClickItmCd != undefined) {
						if(optChartOrd[i].itmId == $inMoreDetail.ui.chartClickItmCd) {
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] = optChartOrd[i].itmId; 
						}
					} else {
						if(optChartOrd[i].subsumYn =="Y") {
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] = optChartOrd[i].itmId;
						}
					}
				} else {
					if($inMoreDetail.ui.chartClickItmCd != "" && $inMoreDetail.ui.chartClickItmCd != undefined) {
						if(optChartOrd[i].itmId == $inMoreDetail.ui.chartClickItmCd) {
							$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] = optChartOrd[i].itmId; 
						}
					} else {
						if(optChartOrd[i].subsumYn =="Y") {
							$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] = optChartOrd[i].itmId;
						}
					}
				}
			}
		}
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res.length > 0 ){
					$('#title2').parent().css('display','block');
					$inMoreDetail.data.chart2 = res;
					timeSeriesCorpCountIndustryChart2_1($inMoreDetail.data.chart2);
				}else{
//					$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-L").hide();
//					$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-R").hide();
					$("#timeSeriesCorpCountIndustryChart").parent().show();
					$("#timeSeriesCorpCountIndustryChart").html($("body>.DataNone").clone().show()[0]);
					$('#title2').parent().css('display','none');
					
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	} else {
		$("#timeSeriesCorpCountIndustryChart").parent().show();
		$("#timeSeriesCorpCountIndustryChart").html($("body>.DataNone").clone().show()[0]);
	}
}

/**
 * @name         : drawCharts3 
 * @description  : 지역별 비교 데이터 호출(api)
 * @date         : 2021.11.03
 * @author	     : 이영호
 * @history 	 : 
 * @parameter	 : 
 */
var drawCharts3 = function() {
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	//타이틀
	
	let tblName = $inMoreDetail.ui.selectedTblId;
	
	if(tblName == "DT_1KI1509" || tblName == "DT_1KI1510" || tblName == "DT_1KI1511"
		|| tblName == "DT_1KI1509_10" || tblName == "DT_1KI1510_10" || tblName == "DT_1KI1511_10"
		|| tblName == "DT_1KI2001" || tblName == "DT_1KI2002" || tblName == "DT_1KI2003"){
	
		$("#title3").children(".sub-L").html(
				$("#tmsYears option:selected").val() + "년 지역별 " + $("#chrItmList option:selected").text()
		);
		
	}else{
		
		$("#title3").children(".sub-L").html(
				$("#tmsYears option:selected").val() + "년 산업별 " + $("#chrItmList option:selected").text()
		);
		
	}
	
	$("#title3").children(".sub-R").html(
		"단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm
	);
	
	
	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];
		
		$inMoreDetail.ui.ajax.params = {			
			surv_year_list: $("#tmsYears option:selected").val()		// 수록시점
			, org_id_list: $inMoreDetail.ui.selectedOrgId					// 조직번호
			, tbl_id_list: $inMoreDetail.ui.selectedTblId					// 통계표 ID
			, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
			, char_itm_id_list: $inMoreDetail.ui.selectedCharItmId	// 표특성항목
			, adm_cd:  ""// 지역코드
			, prt_type: ""												// 출력방식 total:계 else 모두		
			, category: $inMoreDetailMap.ui.category							// 카테고리
			, odr_col_list: "DTVAL_CO"									// 정렬기준
			, odr_type: "DESC"											// 내림차순, 오름차순
		};
		
		fn_bindItmList(chartData);

		// 현재 지역 파라미터 설정 필수
		if($("#sbx_sido option:selected").val() != "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val();
			if($("#sbx_sgg option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				if($("#sbx_emd option:selected").val() != "000"){
					$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();
				}
			}
		}else{
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $totSurvMain.ui.selectedArea;
		}
		
		// 업종 분류
		if(chartData[0].regionVarOrd == 1){
			$inMoreDetail.ui.ajax.params["ov_l2_list"] = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
		}else{
			$inMoreDetail.ui.ajax.params["ov_l1_list"] = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
		}
		
		let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
		
		// DT_1KI2008는 T10 => T01 이런식으로 반대로 되어있음
		if(tblist == "DT_1KI2008" ){
			$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T01";
		}
		
		if(tblist == "DT_1KI1509" || tblist == "DT_1KI1509_10" || tblist == "DT_1KI2001" || tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"
			|| tblist == "DT_1KI1510" ||tblist == "DT_1KI1511" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003"){
			$inMoreDetail.ui.ajax.params["ov_l2_list"] = "";
			$inMoreDetail.ui.ajax.params["ov_l"+chartData[0].dispVarOrd+"_list"] = "0";
			flag = 1;
			if(tblist == "DT_1KI1509" || tblist == "DT_1KI1509_10" || tblist == "DT_1KI2001"){
				// 시군구 없는 테이블
				if(chartData[0].regionVarOrd == 1){
					$inMoreDetail.ui.ajax.params["ov_l1_list"] = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
				}else{
					$inMoreDetail.ui.ajax.params["ov_l2_list"] = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
				}
			}else{
				// 시군구 있는 테이블
				let sido = $('#sbx_sido option:selected').val();
				if(sido != "00"){
					flag = 2;
					let sgg = $('#sbx_sgg').find('option').map(function() {return $(this).val();}).get();
					// 처음 전체값 제거
					sgg.splice(0,1);
					
					let sggList = "";
					$.each(sgg, function(i,index){
						if(i != sgg.length-1){
							sggList += sido + index + ",";
						}else{
							sggList += sido + index;
						}
					})
					
					if( tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"){
						$inMoreDetail.ui.ajax.params["ov_l2_list"] = sggList;
					}
					if (tblist == "DT_1KI1510" ||tblist == "DT_1KI1511" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003"){
						$inMoreDetail.ui.ajax.params["ov_l1_list"] = sggList;
					}
					let sggSel = $('#sbx_sgg option:selected').val();
					if(sggSel != "000"){
						let emd = $('#sbx_emd').find('option').map(function() {return $(this).val();}).get();
						emd.splice(0,1);
						
						let emdList = "";
						$.each(emd, function(i,index){
							if(i != emd.length-1){
								emdList += sido + sggSel + index + ",";
							}else{
								emdList += sido + sggSel + index;
							}
						})
						
						if( tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"){
							$inMoreDetail.ui.ajax.params["ov_l2_list"] = emdList;
						}
						if (tblist == "DT_1KI1510" ||tblist == "DT_1KI1511" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003"){
							$inMoreDetail.ui.ajax.params["ov_l1_list"] = emdList;
						}
					}
				}else{
					if( tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"){
						$inMoreDetail.ui.ajax.params["ov_l2_list"] = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
					}
					if (tblist == "DT_1KI1510" ||tblist == "DT_1KI1511" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003"){
						$inMoreDetail.ui.ajax.params["ov_l1_list"] = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
					}
				}
				
			}
		}else if(tblist == "DT_1KI1516_10"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			$inMoreDetail.ui.ajax.params.ov_l2_list = $totSurvMain.ui.selectedArea;
			$inMoreDetail.ui.ajax.params.ov_l3_list = "C0";
			$inMoreDetail.ui.ajax.params.ov_l4_list = "F0";
		}else if (tblist == "DT_1KI1516" || tblist == "DT_1KI12008"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = $totSurvMain.ui.selectedArea;
			//$inMoreDetail.ui.ajax.params.ov_l2_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "0";
			$inMoreDetail.ui.ajax.params.ov_l3_list = "C0";
			$inMoreDetail.ui.ajax.params.ov_l4_list = "F0,F1,F2,F3";
		}else if(tblist == "DT_1KI1514" || tblist == "DT_1KI2006" || tblist == "DT_1KI1514_10"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
		}
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					$inMoreDetail.data.chart3 = res;
					industryOfAreaChart($inMoreDetail.data.chart3);
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	} else {
		$("#industryOfAreaChart").parent().parent().show();
		$("#industryOfAreaChart").html($("body>.DataNone").clone().show()[0]);
	}
}

var drawCharts3_1 = function(gbn) {
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let optChartOrd = $inMoreDetail.ui.dispOptions[chartOrd];
	
	$("#industryOfAreaChart").parent().children(".item").children(".sub-L").html(
		$("#tmsYears option:selected").val() + "년 지역비교"
	);
	$("#industryOfAreaChart").parent().children(".item").children(".sub-R").html(
		/*"<button type='button' class='chartBtnMore' name='chartBtnMore' title='차트 유형'></button>" +*/
		"<div class='unitMore'>단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm + "</div>"
	);
	
	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];
//		let itmId = $inMoreDetail.ui.selectedCharItmId;
		let itmId = $inMoreDetail.ui.ajax.params["char_itm_id_list"];
		
		for(var j=0;j<chartData.length; j++) {
			if($inMoreDetail.ui.dispOptions[chartOrd][0].dispVarOrd == 0) {
				if(chartData[j].subsumYn == "Y") {
					itmId = chartData[j].itmId;
				}
			}
		}
		
		if(gbn =="fromDrawCharts1"){
			itmId = $inMoreDetail.ui.ajax.params["char_itm_id_list"];
		}
		
		$inMoreDetail.ui.ajax.params = {
			surv_year_list: $("#tmsYears option:selected").val()		// 수록시점
			, org_id_list: $inMoreDetail.ui.selectedOrgId				// 조직번호
			, tbl_id_list: $inMoreDetail.ui.selectedTblId				// 통계표 ID
			, list_var_ord_list: $inMoreDetail.ui.dispOptions[chartOrd][0].objVarId 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
			, char_itm_id_list: itmId									// 표특성항목
			, adm_cd:  ""												// 지역코드
			, prt_type: "total"											// 출력방식 total:계 else 모두		
			, category: $inMoreDetailMap.ui.category					// 카테고리
			, odr_col_list: "DTVAL_CO"									// 정렬기준
			, odr_type: "DESC"											// 내림차순, 오름차순
		};
		
		fn_bindItmList(chartData);

		$inMoreDetailMap.ui.checkIsAtdrc($("#sbx_sido").val()+$("#sbx_sgg").val());		
		// 현재 지역 파라미터 설정 필수
		if($("#sbx_sido option:selected").val() != "00"){
			if($inMoreDetailMap.ui.isAtdrc && $("#sbx_gg option:selected").val() == "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:"+$inMoreDetail.ui.admCd.substring(0,2);
			}else if($("#sbx_sgg option:selected").val() == "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:"+$inMoreDetail.ui.admCd.substring(0,2);
			}else{
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:"+$("#sbx_sido").val()+$("#sbx_gg").val();
			}
			if(!$inMoreDetailMap.ui.isAtdrc&&$("#sbx_sgg option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:"+$("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				if($("#sbx_emd option:selected").val() != "000"){
					$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();
				}
			}else if($inMoreDetailMap.ui.isAtdrc&&$("#sbx_emd option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();			
			}
		}else if($("#sbx_sido option:selected").val() == "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:00";
		}else{
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $totSurvMain.ui.selectedArea;
		}
		
		for(let i=0; i<optChartOrd.length; i++) {
			if(optChartOrd[i].varOrd == optChartOrd[i].dispVarOrd) {
				if(optChartOrd[i].dispVarOrd == 0) {
					if($inMoreDetail.ui.chartClickItmCd != "" && $inMoreDetail.ui.chartClickItmCd != undefined) {
						if(optChartOrd[i].itmId == $inMoreDetail.ui.chartClickItmCd) {
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] = optChartOrd[i].itmId; 
						}
					} else {
						if(optChartOrd[i].subsumYn =="Y") {
							$inMoreDetail.ui.ajax.params["char_itm_id_list"] = optChartOrd[i].itmId;
						}
					}
				} else {
					if($inMoreDetail.ui.chartClickItmCd != "" && $inMoreDetail.ui.chartClickItmCd != undefined) {
						if(optChartOrd[i].itmId == $inMoreDetail.ui.chartClickItmCd) {
							$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] = optChartOrd[i].itmId; 
						}
					} else {
						if(optChartOrd[i].subsumYn =="Y") {
							$inMoreDetail.ui.ajax.params["ov_l" + optChartOrd[i].dispVarOrd + "_list"] = optChartOrd[i].itmId;
						}
					}
				}
			}
		}

		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res.length > 0 ){
					$('#title3').parent().css('display','block');
					if($inMoreDetailMap.ui.isAtdrc && $("#sbx_gg option:selected").val() == "000") res = res.filter((r)=>r.OV_L1_ID.substring(0,4)==($("#sbx_sido option:selected").val()+$("#sbx_sgg option:selected").val()).substring(0,4)&&r.OV_L1_ID.charAt(r.OV_L1_ID.length-1)!='0');
					//else if($("#sbx_sido option:selected").val() != "00"&&$("#sbx_sgg option:selected").val() == "000") res = res.filter((r)=>r.OV_L1_ID.charAt(r.OV_L1_ID.length-1)=='0');
					$inMoreDetail.data.chart3 = res;
					industryOfAreaChart3_1($inMoreDetail.data.chart3);
				}else{
//					$("#industryOfAreaChart").parent().children(".item").children(".sub-L").hide();
//					$("#industryOfAreaChart").parent().children(".item").children(".sub-R").hide();
//					alert("데이터가 없습니다.");
					$("#industryOfAreaChart").parent().show();
					$("#industryOfAreaChart").html($("body>.DataNone").clone().show()[0]);
					$('#title3').parent().css('display','none');
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	} else {
		$("#industryOfAreaChart").parent().show();
		$("#industryOfAreaChart").html($("body>.DataNone").clone().show()[0]);
	}
}

/**
 * @name         : corpCntIndustryChart 
 * @description  : 산업별 종사자수
 * @date         : 2021.08.23
 * @author	     : 이영호
 * @history 	 : 
 */
var inMoreDetailCorpCntIndustryChart = function(data) {	 
	var chartData = [], categories = [], stacked = {}, itmLv, totSurvWonObj = {}
	, chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let chartOpt = $inMoreDetail.ui.dispOptions[chartOrd];
	
	let itemId = "OV_L"+chartOpt[0].dispVarOrd+"_ID"
	, itemSn = "OV_L"+chartOpt[0].dispVarOrd+"_SN"
	, itemKor = "OV_L"+chartOpt[0].dispVarOrd+"_KOR"
	
	let chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 40;
	let maxVal = 0, sumVal = [];	
	let resArrCnt = [];
	
	//CHAR_ITM_ID 삽입
	for(var i=0; i<data.length; i++) {
		if(stacked[data[i].CHAR_ITM_ID] != undefined) {
			stacked[data[i].CHAR_ITM_ID].push(data[i]);
		} else {
			stacked[data[i].CHAR_ITM_ID] = [];
			stacked[data[i].CHAR_ITM_ID].push(data[i]);
		}
	}
	
	// chartData를 삽입
	if(data[0].TBL_ID == "DT_1KI1512" || data[0].TBL_ID == "DT_1KI2004" || data[0].TBL_ID == "DT_1KI1512_10" ){
		let c1 = 0, c2 = 0, c3 = 0, c4 = 0;
		for(var i=0; i<data.length; i++) {
			if(data[i].DTVAL_CO != undefined){
				if(data[i].OV_L3_ID == 'C1'){
					c1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'C2'){
					c2 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'C3'){
					c3 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'C4'){
					c4 += data[i].DTVAL_CO*1;
				}
			}
		}
		
		resArrCnt.push(c1);
		resArrCnt.push(c2);
		resArrCnt.push(c3);
		resArrCnt.push(c4);
		
		chartData.push({
			name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
			data: resArrCnt, 
			pointWidth: 15,
			states: {
				select: {
					color: "#576574",
					borderColor: "#576574",
				}
			},
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		
		maxVal = Math.round(resArrCnt[0])*1.2;
		
	}else if(data[0].TBL_ID == "DT_1KI1513" || data[0].TBL_ID == "DT_1KI2005" || data[0].TBL_ID == "DT_1KI1513_10" ){
		let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
		
		for(var i=0; i<data.length; i++) {
			if(data[i].DTVAL_CO != undefined){
				if(data[i].OV_L3_ID == 'D1'){
					d1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D2'){
					d1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D3'){
					d2 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D4'){
					d3 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D5'){
					d3 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D6'){
					d4 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D7'){
					d5 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D8'){
					d5 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'D9'){
					d6 += data[i].DTVAL_CO*1;
				}
			}
		}
		
		resArrCnt.push(d1);
		resArrCnt.push(d2);
		resArrCnt.push(d3);
		resArrCnt.push(d4);
		resArrCnt.push(d5);
		resArrCnt.push(d6);
		
		chartData.push({
			name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
			data: resArrCnt, 
			pointWidth: 15,
			states: {
				select: {
					color: "#576574",
					borderColor: "#576574",
				}
			},
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		
		maxVal = Math.round(resArrCnt[0])*1.2;
		
	}else if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10" ){
		let t201 = 0, t202 = 0, t203 = 0, t204 = 0, t205 = 0;
		for(var i=0; i<data.length; i++) {
			if(data[i].DTVAL_CO != undefined){
				if(data[0].TBL_ID == "DT_1KI2006"){
					if(data[i].CHAR_ITM_ID == "T30" || data[i].CHAR_ITM_ID == "T31" || data[i].CHAR_ITM_ID == "T32"){
						t201 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T40" || data[i].CHAR_ITM_ID == "T41" || data[i].CHAR_ITM_ID == "T42"){
						t202 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T50" || data[i].CHAR_ITM_ID == "T51" || data[i].CHAR_ITM_ID == "T52"){
						t203 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T60" || data[i].CHAR_ITM_ID == "T61" || data[i].CHAR_ITM_ID == "T62"){
						t204 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T70" || data[i].CHAR_ITM_ID == "T71" || data[i].CHAR_ITM_ID == "T72"){
						t205 += data[i].DTVAL_CO*1;
					}
				}else{
					if(data[i].CHAR_ITM_ID == "T201" || data[i].CHAR_ITM_ID == "T2011" || data[i].CHAR_ITM_ID == "T2012"){
						t201 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T202" || data[i].CHAR_ITM_ID == "T2021" || data[i].CHAR_ITM_ID == "T2022"){
						t202 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T203" || data[i].CHAR_ITM_ID == "T2031" || data[i].CHAR_ITM_ID == "T2032"){
						t203 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T204" || data[i].CHAR_ITM_ID == "T2041" || data[i].CHAR_ITM_ID == "T2042"){
						t204 += data[i].DTVAL_CO*1;
					}else if(data[i].CHAR_ITM_ID == "T205" || data[i].CHAR_ITM_ID == "T2051" || data[i].CHAR_ITM_ID == "T2052"){
						t205 += data[i].DTVAL_CO*1;
					}
				}
			}
		}
		
		resArrCnt.push({
				name: '상용근로자'
				,y  : t201});
		resArrCnt.push({
				name: '임시 및 일용근로자'
				,y  : t202});
		resArrCnt.push({
				name: '자영업자'
				,y  : t203});
		resArrCnt.push({
				name: '무급가족종사자'
				,y  : t204});
		resArrCnt.push({
				name: '기타종사자'
				,y  : t205});
		
		
		chartData.push({
			name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
			data: resArrCnt,
			states: {
				select: {
					color: "#576574",
					borderColor: "#576574",
				}
			},
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		
		maxVal = Math.round(resArrCnt[0])*1.2;
		
	}else if(data[0].TBL_ID == "DT_1KI1515" || data[0].TBL_ID == "DT_1KI2007" || data[0].TBL_ID == "DT_1KI1515_10" ){
		let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
		
		for(var i=0; i<data.length; i++) {
			if(data[0].TBL_ID == "DT_1KI1515_10"){
				if(data[i].OV_L3_ID == "E1"){
					d1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == "E2"){
					d1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == "E3"){
					d2 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "E4"){
					d2 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "E5"){
					d3 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "E6"){
					d3 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "E7"){
					d4 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "E8"){
					d5 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "E9"){
					d6 += data[i].DTVAL_CO*1;
				}
			}else{
				if(data[i].OV_L3_ID == "D1"){
					d1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == "D2"){
					d1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == "D3"){
					d2 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "D4"){
					d2 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "D5"){
					d3 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "D6"){
					d3 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "D7"){
					d4 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "D8"){
					d5 += data[i].DTVAL_CO*1; 
				}else if(data[i].OV_L3_ID == "D9"){
					d6 += data[i].DTVAL_CO*1;
				}
			}
		}
		
		resArrCnt.push(d1);
		resArrCnt.push(d2);
		resArrCnt.push(d3);
		resArrCnt.push(d4);
		resArrCnt.push(d5);
		resArrCnt.push(d6);
		
		chartData.push({
			name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
			data: resArrCnt, 
			pointWidth: 15,
			states: {
				select: {
					color: "#576574",
					borderColor: "#576574",
				}
			},
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		
		maxVal = Math.round(resArrCnt[0])*1.2;
	}else if(data[0].TBL_ID == "DT_1KI1516" || data[0].TBL_ID == "DT_1KI2008" || data[0].TBL_ID == "DT_1KI1516_10" ){
		let f1 = 0, f2 = 0, f3 = 0;
		
		for(var i=0; i<data.length; i++) {
			if(data[i].DTVAL_CO != undefined){
				if(data[i].OV_L4_ID == 'F1'){
					f1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L4_ID == 'F2'){
					f2 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L4_ID == 'F3'){
					f3 += data[i].DTVAL_CO*1;
				}
			}
		}
		
		resArrCnt.push(f1);
		resArrCnt.push(f2);
		resArrCnt.push(f3);
		
		chartData.push({
			name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
			data: resArrCnt, 
			pointWidth: 15,
			states: {
				select: {
					color: "#576574",
					borderColor: "#576574",
				}
			},
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		
		maxVal = Math.round(resArrCnt[0])*1.2;
	}else if(data[0].TBL_ID == "DT_1KI2009"){
		let f1 = 0, f2 = 0, f3 = 0,f4 = 0, f5 = 0, f6 = 0,f7 = 0, f8 = 0;
		
		for(var i=0; i<data.length; i++) {
			if(data[i].DTVAL_CO != undefined){
				if(data[i].OV_L3_ID == 'F1'){
					f1 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'F2'){
					f2 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'F3'){
					f3 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'F4'){
					f4 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'F5'){
					f5 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'F6'){
					f6 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'F7'){
					f7 += data[i].DTVAL_CO*1;
				}else if(data[i].OV_L3_ID == 'F8'){
					f8 += data[i].DTVAL_CO*1;
				}
			}
		}
		
		resArrCnt.push(f1);
		resArrCnt.push(f2);
		resArrCnt.push(f3);
		resArrCnt.push(f4);
		resArrCnt.push(f5);
		resArrCnt.push(f6);
		resArrCnt.push(f7);
		resArrCnt.push(f8);
		
		chartData.push({
			name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
			data: resArrCnt, 
			pointWidth: 15,
			states: {
				select: {
					color: "#576574",
					borderColor: "#576574",
				}
			},
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		
		maxVal = Math.round(resArrCnt[0])*1.2;
	}else{
		if(data[0].TBL_ID == "DT_1KI1509" || data[0].TBL_ID == "DT_1KI1509_10" || data[0].TBL_ID == "DT_1KI2001" 
			|| data[0].TBL_ID == "DT_1KI1510_10"|| data[0].TBL_ID == "DT_1KI1511_10" )	{
			stacked[Object.keys(stacked)[0]].sort(function(a,b){
				return a.OV_L1_ID < b.OV_L1_ID ? -1 : a.OV_L1_ID > b.OV_L1_ID ? 1 : 0;
			});
		}else{
			stacked[Object.keys(stacked)[0]].sort(function(a,b){
				return a.OV_L2_ID < b.OV_L2_ID ? -1 : a.OV_L2_ID > b.OV_L2_ID ? 1 : 0;
			});
		}
		for(var i=Object.keys(stacked).length-1; i>=0; i--) {
			let stack = stacked[Object.keys(stacked)[i]];		
			let stackData = [];
			for(var j=0; j<stack.length; j++) {
				if(stack[j].CHAR_ITM_ID != "13999001" && stack[j][itemId] != "0") {
					let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
					if(chartOpt[0].dispVarOrd == 0) {
						stackData.push({ 
							y: parseInt(Math.round(dtval/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit))),
							name: stack[j]["CHAR_ITM_NM"],
							id: stack[j]["CHAR_ITM_ID"]
						});
					} else {
						stackData.push({ 
							y: parseInt(Math.round(dtval/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit))),
							name: stack[j]["OV_L" + chartOpt[0].dispVarOrd + "_KOR"],
							id: stack[j]["OV_L" + chartOpt[0].dispVarOrd + "_ID"]
						});
					}
				}
			}
			chartData.push({
				name: stacked[Object.keys(stacked)[i]][0].CHAR_ITM_NM, 
				data: stackData, 
				pointWidth: 15,
				states: {
					select: {
						color: "#576574",
						borderColor: "#576574",
					}
				},
			});
		}
		
	}
	// 차트에 최댓값을 정의
	for(var i=0; i<Object.keys(stacked).length; i++) {
		let stack = stacked[Object.keys(stacked)[i]];
		totSurvWonObj[Object.keys(stacked)[i]] = 0;	
		for(var j=0; j<stack.length; j++) {
			let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
			if(stack[j][itemId] != "0") {
				if(sumVal[j] != undefined) {
					sumVal[j] = sumVal[j] + parseInt(dtval);
				} else {
					sumVal.push(parseInt(dtval));
				}	
			}			
			totSurvWonObj[Object.keys(stacked)[i]] += parseInt(dtval);
			//stack.sort(function(a, b) { return a[itemSn] - b[itemSn] });
		} 
		
		stacked[Object.keys(stacked)[i]].sort(function(a, b) { return a.CHAR_ITM_SN - b.CHAR_ITM_SN });
	}
	
	for(var i=0; i<sumVal.length; i++) {
		if(maxVal < sumVal[i]) {
			maxVal = sumVal[i];
		}
	}
	
	// 차트에 카테고리 작성
	if(data[0].TBL_ID == "DT_1KI1512" || data[0].TBL_ID == "DT_1KI2004" || data[0].TBL_ID == "DT_1KI1512_10" ){
		categories.push("개인사업체");
		categories.push("회사법인");
		categories.push("회사이외법인");
		categories.push("비법인단체");
	}else if(data[0].TBL_ID == "DT_1KI1513" || data[0].TBL_ID == "DT_1KI2005" || data[0].TBL_ID == "DT_1KI1513_10" ){
		categories.push("1~4인");
		categories.push("5~9인");
		categories.push("10~49인");
		categories.push("50~99인");
		categories.push("100~299인");
		categories.push("300명 이상");
	}else if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10" ){
		categories.push("상용근로자");
		categories.push("임시 및 일용근로자");
		categories.push("자영업자");
		categories.push("무급가족종사자");
		categories.push("기타종사자");
	}else if(data[0].TBL_ID == "DT_1KI1515" || data[0].TBL_ID == "DT_1KI2007" || data[0].TBL_ID == "DT_1KI1515_10" ){
		categories.push("1억원 미만");
		categories.push("1억~10억원 미만");
		categories.push("10억~100억원 미만");
		categories.push("100억~200억원 미만");
		categories.push("200억~300억원 미만");
		categories.push("300억원 이상");
	}else if(data[0].TBL_ID == "DT_1KI1516" || data[0].TBL_ID == "DT_1KI2008" || data[0].TBL_ID == "DT_1KI1516_10" ){
		categories.push("단독사업체");
		categories.push("본사,본점 등");
		categories.push("공장, 지사(점), 영업소 등");
	}else if(data[0].TBL_ID == "DT_1KI2009"){
		categories.push("10㎡ 미만");
		categories.push("10~30");
		categories.push("30~50");
		categories.push("50~100");
		categories.push("100~300");
		categories.push("300~1000");
		categories.push("1000~3000");
		categories.push("3000㎡ 이상");
	}else{
		maxVal = Math.round(parseInt(maxVal/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit))) * 1.1;
		for(var i=0; i<stacked[Object.keys(stacked)[0]].length; i++) {
			let stack = stacked[Object.keys(stacked)[0]][i];
			var isAlready = false;
			for(var j=0; j<chartOpt.length; j++) {
				if(chartOpt[j].itmId == stack[itemId] && stack[itemId] != "0") {
					categories.push(stack[itemKor]);
					isAlready = true;	
				}
			}
			
			if(!isAlready) {
				if(stack[itemId] != "0") {
					categories.push(stack[itemKor]);
				}			
			}
		}
	}
	var chartKind = '';
	var colorKind = [];
	var legendCheck = true;
	if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10"){
		chartKind = 'pie';
		colorKind = ["#5B9BD5","#ED7D31","#92D050","#FFC000","#9966FF"];
		legendCheck = true;
	}else{
		chartKind = 'bar';
		colorKind = ["#f08246"]
		legendCheck = false;
	}
	
	var tool = $("#inMoreDetailCorpCountOfIndustryChart").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	
	var inMoreDetailCorpCountOfIndustryChart = $('#inMoreDetailCorpCountOfIndustryChart').highcharts({
		chart: {
			type: chartKind,
			height: chartHeight,
			width: 600,
			events: {
				load: function(e) {
					let chartName = $("#chrItmList option:selected").text();
					for(let i=0; i<e.target.series.length; i++) {
						let sb = e.target.series[i];
						for(let j=0; j<sb.data.length; j++) {
							let itm = sb.data[j];
							if(itm.options.itm_id == $inMoreDetail.ui.chartClickItmCd) {
								itm.select();
								$inMoreDetail.ui.selectedObj = [itm];
								$(".ttitle.charItmMapTitle.blue").text(chartName + "   〉" + itm.options.name);
							}
						}
					}
				}
	        }
		},
		credits: {
	        enabled: false
	    },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		//colors: $ecnmyDash.chartsOption.color,
	    legend: {
			enabled: legendCheck,
			layout: 'vertical',
		    align: 'right',
		    verticalAlign: 'middle',
		    itemMarginTop: 10,
		    itemMarginBottom: 10,
		    labelFormatter: function() {
             	return '<b>' + this.name + '</b>&nbsp;<b>' + numberFormat(this.y) + chartOpt[0].kosisUnitNm + '</b>';
             },
	    },
	    colors: colorKind,
		title: {
			text: "",
			style: { "display": "none" }
		},
		plotOptions: {
			 pie: {
				 allowPointSelect: true,
	             cursor: 'pointer',
				 colors: colorKind,
	             showInLegend: true,
	             dataLabels: {
	                 enabled: true,
	                 color: "#000000",
	                 formatter: function() {
	                	return (this.y/this.total*100).toFixed(1) + "%";
	                 },
	                 distance: '-30%',
	                 filter: {
	                     property: 'percentage',
	                     operator: '>',
	                     value: 4
	                 }
		        }
			 },
			series: {				
				minPointLength: 5,
				stacking: 'normal',
				point: {
					events: {
						click: function() {
					    	$totSurvMain.ui.chartTarget = "inMoreDetailCorpCountOfIndustryChart";
					    	$inMoreDetail.selectedCategory = this.category;
							
					    	let charItmId = $inMoreDetail.ui.selectedCharItmId;
					    	if(stacked[charItmId] == undefined) {
					    		alert("선택된 세부항목과 차트의 항목이 불일치 합니다.\n통계정보 보기로 검색 후 실행해주시기 바랍니다.");
					    		return;
					    	}
					    	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
					    	let thisData = stacked[charItmId][this.x+1]; // 최상위에 전산업이 있기 때문에 +1 해줌
					    	let itmColumn = "";
					    	
					    	let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
					    	if (tblist == "DT_1KI1514" || tblist == "DT_1KI2006" || tblist == "DT_1KI1514_10"){
					    		thisData = stacked[charItmId][0];
					    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_ID";
					    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
					    	}else{
					    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_ID";
					    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
					    	}
					    	
					    	let tmsYear = $("#tmsYears option:selected").val();
					    	let sbxKsic = $("#sbx_ksic option:selected").text();
					    	let charItmTxt = $("#chrItmList option:selected").text();
					    	
					    	let cate = this.category;
					    	
					    	if(cate == undefined){
					    		cate = this.name;
					    	}
					    	
					    	$inMoreDetail.ui.chartClickItmCd = this.series.chart.hoverPoints[0].options.id;
		        			$inMoreDetail.ui.chartClickItmNm = this.series.chart.hoverPoints[0].options.name;
					    	
					    	$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;		
					    	$totSurvMain.ui.chartTitle = tmsYear+"년 " + sbxKsic + " " + charItmTxt;
					    	$inMoreDetail.ui.chartItmClick($(this), "#f08246", tmsYear+"년 " 
								+ cate + " " + $("#chrItmList option:selected").text());
						},
						mouseOver: function() {
					        //tool.css("display", "inline-block");
							tool.css("display", "none");
	
					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
							var key = "";
							
							for(var i=0; i<data.length; i++) {
								if(this.series.name == data[i].CHAR_ITM_NM) {
									key = data[i].CHAR_ITM_ID;
								}
							}
					        if(totSurvWonObj != 0 && totSurvWonObj !=""){
					        	ratio = (parseInt(this.series.data[this.x].y) / totSurvWonObj[key] * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					        var unit = chartOpt[0].kosisUnitNm;
					        
					        $(document).on("mousemove", function(evt) {
					        	let target = document.getElementById("inMoreDetailCorpCountOfIndustryChart");
						        let clientRect = target.getBoundingClientRect();
						        let rTop = clientRect.top;
						        let rLeft = clientRect.left;
						        let sTopLength = window.pageYOffset;
						        let sLeftLength = window.pageXOffset;
						        
								tool.css("left", evt.clientX - (rLeft + sLeftLength) - (parseInt(tool.css("width"))/2));
								let ttTop = evt.clientY + $(target).parent().parent().parent().parent().parent().scrollTop() - 325;
								//let ttTop = evt.clientY - (rTop + sTopLength);
								if(ttTop <= 0) {
									ttTop += 120;
								}
						        tool.css("top", ttTop);		
							});
					        
					        let dtval = this.series.data[this.x].y != undefined ? parseInt(this.series.data[this.x].y) : 0;
					        
					        if(data[0].TBL_ID == "DT_1KI1513" || data[0].TBL_ID == "DT_1KI2005" || data[0].TBL_ID == "DT_1KI1513_10" || data[0].TBL_ID == "DT_1KI1515" || data[0].TBL_ID == "DT_1KI2007" || data[0].TBL_ID == "DT_1KI1515_10" ){
					        	ratio = 0, vTot = 0;
								
								for(var i=0; i<this.series.data.length; i++) {
									vTot += this.series.data[i].y;
								}
								
								ratio = (parseInt(this.series.data[this.x].y) / vTot * 100).toFixed(2);
								unit = chartOpt[0].kosisUnitNm;
						        dtval = this.series.data[this.x].y != undefined ? parseInt(this.series.data[this.x].y) : 0;
						        
						        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
						        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + + stacked[key][this.x+1].PRD_DE + "년 " +
					        			" " + $("#chrItmList option:selected").text() + "</p>" +
									"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
									this.series.data[this.x].category + "</p>" +
									"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
									numberFormat(dtval) + " " + unit + "</p><br>" + 
									"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
									numberFormat(ratio) + "</p>" + "%"); 
					        }else if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10"){
					        	ratio = 0, vTot = 0;
								
								for(var i=0; i<this.series.data.length; i++) {
									vTot += this.series.data[i].y;
								}
								
								ratio = (parseInt(this.series.data[this.x].y) / vTot * 100).toFixed(2);
								unit = chartOpt[0].kosisUnitNm;
						        dtval = this.series.data[this.x].y != undefined ? parseInt(this.series.data[this.x].y) : 0;
						        
						        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
						        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + stacked[key][0].PRD_DE + "년 " + " " + $("#chrItmList option:selected").text() + "</p>" +
									"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
									this.series.data[this.x].name + "</p>" +
									"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
									numberFormat(dtval) + " " + unit + "</p><br>" + 
									"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
									numberFormat(ratio) + "</p>" + "%"); 
					        }else{
					        	//2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        	tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + stacked[key][this.x+1].PRD_DE + "년 " +
					        			 " " + $("#chrItmList option:selected").text() + "</p>" +
					        			"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
					        			this.category + "</p>" +
					        			"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
					        			numberFormat(dtval) + " " + unit + "</p><br>" + 
					        			"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
					        			numberFormat(ratio) + "</p>" + "%"); 
					        }
					        
						},
						mouseOut: function() {
							$(document).off("mousemove");							
							tool.css("display", "none");
						}
					}
				}
			}
		},
		tooltip: {
	    	formatter: function () {
	    		let vTot = 0;
				for(var i=0; i<this.series.data.length; i++) {
					vTot += this.series.data[i].y;
				}
				var key = "";
				for(var i=0; i<data.length; i++) {
					if(this.series.name == data[i].CHAR_ITM_NM) {
						key = data[i].CHAR_ITM_ID;
					}
				}
	    		for(let i=0; i< this.series.data.length;i++){
	    			if(this.series.data[i].category == this.x){
	    				let unit = chartOpt[0].kosisUnitNm;
		    			let dtval = this.series.data[i].y != undefined ? parseInt(this.series.data[i].y) : 0;
		    			let ratio = (parseInt(this.series.data[i].y) / vTot * 100).toFixed(2);
		    			if(data[0].TBL_ID == "DT_1KI1513" || data[0].TBL_ID == "DT_1KI2005" || data[0].TBL_ID == "DT_1KI1513_10"){
		    				
		    				return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" + + stacked[key][i].PRD_DE + "년 " +
		        			$("#sbx_ksic option:selected").text() + " " + $("#chrItmList option:selected").text() + "</p>" +
							"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
							this.series.data[i].category + "</p></div>" +
							"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
							numberFormat(dtval) + " " + unit + "</p></div>" + 
							"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
							numberFormat(ratio) + "</p>" + "%";
		    				
		    			}if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10"){
		    				
		    				return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" + stacked[key][i].PRD_DE + "년 " + " " + $("#chrItmList option:selected").text() + "</p>" +
							"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
							this.key + "</p>" +
							"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
							numberFormat(dtval) + " " + unit + "</p><br>" + 
							"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
							numberFormat(ratio) + "</p>" + "%" + "</div>";
		    				
		    			}else{
		    				
		    				return "<p style='color: #3d4956;margin-bottom: 5px;margin-left: 16px;'>" + stacked[key][i].PRD_DE + "년 " +
		    				$("#sbx_ksic option:selected").text() + " " + $("#chrItmList option:selected").text() + "</p>" +
		    				"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
		    				this.series.data[i].category + "</p></div>" +
		    				"<div style='text-align:center;'><p style='color:#0982d8; text-align: center; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
		    				numberFormat(dtval) + " " + unit + "</p></div>" + 
		    				"<div style='text-align:center;'><p style='color:#EE3520; text-align: center; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
		    				numberFormat(ratio) + "</p>" + "%"+"<div>" ;
		    				
		    			}
					}
				}
			},
			useHTML: true,
			shared: false,
		    shadow: false,
		    enabled: true
		},
		xAxis: {
	        categories: categories,
			lineColor: "transparent",
			tickLength: 0,
			labels: {				
				formatter: function() {
					return this.value;
				}
			}
	    },
		yAxis: {
			max: maxVal,
			min: 0,
	        title: {
				text: null
			},
			labels: {
				formatter: function() {
					return this.value;
				}
			},
			lineWidth: 1,
			stackLabels: {
	            enabled: true,
	            style: {
	                fontWeight: '100',
	                color: "#000000",
					textOutline: false
	            },
				formatter: function() {
					return numberFormat(this.total);	
				}
	        }
	    },
		series: chartData
	});
	
	// 생략 무시
	var ellipsisLegend = $("#inMoreDetailCorpCountOfIndustryChart g.highcharts-axis-labels title");
	for(var i=0; i<ellipsisLegend.length; i++) {
		if(ellipsisLegend[i]) {
			var str = $(ellipsisLegend[i]).text()
				+ "<tspan class='highcharts-br' dy='15' x='21'>&ZeroWidthSpace;</tspan>";
			$(ellipsisLegend[i]).parent().empty().append(str);
		}
	}
	if(data[0].TBL_ID == "DT_1KI1509" || data[0].TBL_ID == "DT_1KI1510" || data[0].TBL_ID == "DT_1KI1511"
		|| data[0].TBL_ID == "DT_1KI1509_10" || data[0].TBL_ID == "DT_1KI1510_10" || data[0].TBL_ID == "DT_1KI1511_10"
		|| data[0].TBL_ID == "DT_1KI2001" || data[0].TBL_ID == "DT_1KI2002" || data[0].TBL_ID == "DT_1KI2003"){
		$("#inMoreDetailCorpCountOfIndustryChart g.highcharts-axis-labels.highcharts-xaxis-labels text").attr("x", "210");
	}
	
	$("#inMoreDetailCorpCountOfIndustryChart g.highcharts-axis-labels.highcharts-xaxis-labels text").css("font-size", "11px");
	
	$("#inMoreDetailCorpCountOfIndustryChart").parent().show();
}

var inMoreDetailCorpCntIndustryChart1_1 = function(data) {
	var chartData = [], categories = [], stacked = {}, itmLv, totSurvWonObj = {}
	, chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let chartOpt = $inMoreDetail.ui.dispOptions[chartOrd];
	
	let itemId = "OV_L"+chartOpt[0].varOrd+"_ID"
	, itemSn = "OV_L"+chartOpt[0].varOrd+"_SN"
	, itemKor = "OV_L"+chartOpt[0].varOrd+"_KOR"
	
	let chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 40;
	let maxVal = 0, sumVal = [];	
	let resArrCnt = [];
	
	let unitNm = $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm;
	var chart1_1 = [];
	var total1_1 = [];
	
	var optChartOrd = $inMoreDetail.ui.dispOptions[chartOrd];
	
	for(var i=0; i<data.length; i++) {
		let isSumYn = false;
		for(var j=0;j<optChartOrd.length; j++) {
			if($inMoreDetail.ui.dispOptions[chartOrd][0].dispVarOrd == 0) {
				if(optChartOrd[j].subsumYn == "Y" && data[i]["CHAR_ITM_ID"] == optChartOrd[j].itmId) {
					isSumYn = true;
				}
			} else {
				if(optChartOrd[j].subsumYn == "Y" && data[i]["OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][0].dispVarOrd + "_ID"] == optChartOrd[j].itmId) {
					isSumYn = true;
				}
			}
		}
		
		for(var j=0;j<optChartOrd.length; j++) {
			if(chartOpt[j].dispVarOrd == 0) {
				if(data[i].CHAR_ITM_ID == chartOpt[j].itmId) {
					if(isSumYn){
						if(data[i].DTVAL_CO != undefined){
							total1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO)});
						}
						if(chartOpt[0].allDispAt == "Y") {
							if(chartOpt[j].subsumYn == "Y") {
								if(chartOpt[j].dispVarOrd == 0) {
									chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i].CHAR_ITM_SN, itm_id: data[i].CHAR_ITM_ID });
								} else {
									chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_SN"], itm_id: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_ID"] });
								}
							}
							//chart1_1.push({name: data[i].CHAR_ITM_NM, y: Number(data[i].DTVAL_CO), sn: data[i].CHAR_ITM_SN, itm_id: data[i].CHAR_ITM_ID });
						}
					}else if(!isSumYn) {
						if(data[i].DTVAL_CO != undefined){
							if(chartOpt[j].dispVarOrd == 0) {
								chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i].CHAR_ITM_SN
								, itm_id: data[i].CHAR_ITM_ID });
							} else {
								chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_SN"]
								, itm_id: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_ID"] });
							}
						}
					}
				}
			} else {
				if(data[i]["OV_L" + chartOpt[0].dispVarOrd + "_ID"] == chartOpt[j].itmId) {
					if(isSumYn){
						if(data[i].DTVAL_CO != undefined) {
							total1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO)});
						}
						if(chartOpt[0].allDispAt == "Y") {
							if(chartOpt[j].subsumYn == "Y") {
								if(chartOpt[j].dispVarOrd == 0) {
									chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i].CHAR_ITM_SN
									, itm_id: data[i].CHAR_ITM_ID });
								} else {
									chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_SN"]
									, itm_id: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_ID"] });
								}
							}
						}
					}else if(!isSumYn) {
						if(data[i].DTVAL_CO != undefined){
							if(chartOpt[j].dispVarOrd == 0) {
								chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i].CHAR_ITM_SN
								, itm_id: data[i].CHAR_ITM_ID });
							} else {
								chart1_1.push({name: optChartOrd[j].altrtvDispWrd, y: Number(data[i].DTVAL_CO), sn: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_SN"]
								, itm_id: data[i]["OV_L" + chartOpt[0].dispVarOrd + "_ID"] });
							}
						}
					}
				}
			}
		}
	}
	
	var centerTitle = total1_1[0].name + "<br/>: " + numberFormat(total1_1[0].y) + unitNm;
	
	var chartSn = "sn";
	
	chart1_1.sort(function(a, b) { return a[chartSn] - b[chartSn] });
	
	var chartType = $inMoreDetail.ui.dispOptions[chartOrd][0].chartType;
	
	Highcharts.setOptions({
	    lang: {
	        thousandsSep: ','
	    }
	});
	
	let vPointWidth;
	let vChartHeight;
	
	let vPointColors = [], vSelectedColor = "";
	
	if($inMoreDetail.itlist == "J1_3"){
		vPointColors = ["#f08246"];
		vSelectedColor = "#576574";
		vChartHeight = data.length * 40;
		vPointWidth = 20;
	} else {
		vPointColors = Highcharts.defaultOptions.colors;
		vSelectedColor = "#f08246";
		vChartHeight = undefined;
		vPointWidth = undefined;
	}
	
	if("CH1S01"==chartType){	//CH1S01 막대 그래프(가로)
		$inMoreDetail.chart1 = Highcharts.chart('inMoreDetailCorpCountOfIndustryChart', {
			
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'bar',
		        height: vChartHeight,
		        events: {
					load: function(e) {
						let chartName = $("#chrItmList option:selected").text();
						for(let i=0; i<e.target.series.length; i++) {
							let sb = e.target.series[i];
							for(let j=0; j<sb.data.length; j++) {
								let itm = sb.data[j];
								if(itm.options.itm_id == $inMoreDetail.ui.chartClickItmCd) {
									itm.select();
									$inMoreDetail.ui.selectedObj = [itm];
									$(".ttitle.charItmMapTitle.blue").text(chartName + "   〉" + itm.options.name);
								}
							}
						}
					}
		        }
		    },
		    
		    credits: {
		        enabled: false
		    },
		    
		    navigation: {
		        buttonOptions: {
		            enabled: false
		        }
		    },
		    
		    legend: {
		        enabled: false
		    },
		    
		    title: {
		    	text: null
		    },
		    
		    xAxis: {
		    	type: 'category'
			},
			
		    yAxis: {
		    	allowDecimals: false,
		        min: 0,
		        title: {
		            text: null
		        }
		    },
		    
		    lang: {
				thousandsSep: ','
			},
			
		    tooltip: {
		    	formatter: function () {
		    		var rate = (Number(this.y)/Number(total1_1[0].y)*100).toFixed(2);
		    		
    				return "<p style='color: #3d4956;white-space:nowrap;margin:8px 14px 5px 8px;'>" + $("#tmsYears option:selected").text() + "년 " +
        			$("#chrItmList option:selected").text() + "</p>" +
					"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin:8px 14px 5px 8px;'>" +
					this.key + "</p></div>" +
					"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					numberFormat(this.y) + " " + unitNm + "</p></div>" + 
					"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					rate + " %" + "</p>";
				},
				useHTML: true,
				shared: false,
			    shadow: false,
			    enabled: true
		    },
		    
		    accessibility: {
		        point: {
		            valueSuffix: unitNm
		        }
		    },
		    
		    plotOptions: {
		    	series: {
		            cursor: 'pointer'
		        }
		    },
		    
		    colors: vPointColors,
		    
		    series: 
		    [{
		        name: '',
		        colorByPoint: true,
		        showInLegend: true,
		        data: chart1_1,
		        states: {
					select: {
						color: vSelectedColor,
						borderColor: vSelectedColor,
					}
				},
		        dataLabels: {
		            enabled: true,
		            style: {
		                fontWeight: 'bold',
		            },
		            formatter: function() {
		            	var s  = numberFormat(this.y);
						return s;
		            }
		        },
		        pointWidth: vPointWidth,
		        point: {
		        	events: {
		        		click: function() {
		        			$inMoreDetail.ui.chartClickItmCd = this.series.chart.hoverPoints[0].options.itm_id;
		        			$inMoreDetail.ui.chartClickItmNm = this.series.chart.hoverPoints[0].options.name;
		        			$inMoreDetail.ui.chartItmClick($(this), vSelectedColor, this.name);
		        		}
		        	}
		        }
		    }]
		});
	}else if("CH1S02"==chartType){	//CH1S02 막대 그래프(세로)
		$inMoreDetail.chart1 = Highcharts.chart('inMoreDetailCorpCountOfIndustryChart', {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'column',
		        events: {
					load: function(e) {
						let chartName = $("#chrItmList option:selected").text();
						for(let i=0; i<e.target.series.length; i++) {
							let sb = e.target.series[i];
							for(let j=0; j<sb.data.length; j++) {
								let itm = sb.data[j];
								if(itm.options.itm_id == $inMoreDetail.ui.chartClickItmCd) {
									itm.select();
									$inMoreDetail.ui.selectedObj = [itm];
									$(".ttitle.charItmMapTitle.blue").text(chartName + "   〉" + itm.options.name);
								}
							}
						}
					}
		        }
		    },
		    
		    credits: {
		        enabled: false
		    },
		    
		    navigation: {
		        buttonOptions: {
		            enabled: false
		        }
		    },
		    
		    legend: {
		        enabled: false
		    },
		    
		    title: {
		    	text: null
		    },
		    
		    xAxis: {
		    	type: 'category'
			},
			
		    yAxis: {
		    	allowDecimals: false,
		        min: 0,
		        title: {
		            text: null
		        }
		    },
		    
		    lang: {
				thousandsSep: ','
			},
			
		    tooltip: {
		    	formatter: function () {
		    		var rate = (Number(this.y)/Number(total1_1[0].y)*100).toFixed(2);
		    		
    				return "<p style='color: #3d4956;white-space:nowrap;margin:8px 14px 5px 8px;'>" + $("#tmsYears option:selected").text() + "년 " +
        			$("#chrItmList option:selected").text() + "</p>" +
					"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin:8px 14px 5px 8px;'>" +
					this.key + "</p></div>" +
					"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					numberFormat(this.y) + " " + unitNm + "</p></div>" + 
					"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					rate + " %" + "</p>";
				},
				useHTML: true,
				shared: false,
			    shadow: false,
			    enabled: true
		    },
		    
		    accessibility: {
		        point: {
		            valueSuffix: unitNm
		        }
		    },
		    
		    plotOptions: {
		    	series: {
		            cursor: 'pointer'
		        }
		    },
		    
		    series: 
		    [{
		        name: '',
		        colorByPoint: true,
		        showInLegend: true,
		        data: chart1_1,
		        states: {
					select: {
						color: vSelectedColor,
						borderColor: vSelectedColor,
					}
				},
		        dataLabels: {
		            enabled: true,
		            style: {
		                fontWeight: 'bold',
		                color: (
		                    Highcharts.defaultOptions.title.style &&
		                    Highcharts.defaultOptions.title.style.color
		                ) || 'gray'
		            },
		            formatter: function() {
		            	var s  = numberFormat(this.y);
						return s;
		            }
		        },
		        point: {
		        	events: {
		        		click: function() {
		        			$inMoreDetail.ui.chartClickItmCd = this.series.chart.hoverPoints[0].options.itm_id;
		        			$inMoreDetail.ui.chartClickItmNm = this.series.chart.hoverPoints[0].options.name;

							srvLogWrite("P0", "09", "06", "06", '', 'itm_cd='+$inMoreDetail.ui.chartClickItmCd+',itm_nm='+$inMoreDetail.ui.chartClickItmNm);

				    		$inMoreDetail.ui.chartItmClick($(this), "#f08246", this.name);
		        		}
		        	},
		        }
		    }]
		});
	}else if("CH1S03"==chartType){	//CH1S03 꺽은선 그래프
		$inMoreDetail.chart1 = Highcharts.chart('inMoreDetailCorpCountOfIndustryChart', {
		    chart: {
		    	events: {
					load: function(e) {
						let chartName = $("#chrItmList option:selected").text();
						for(let i=0; i<e.target.series.length; i++) {
							let sb = e.target.series[i];
							for(let j=0; j<sb.data.length; j++) {
								let itm = sb.data[j];
								if(itm.options.itm_id == $inMoreDetail.ui.chartClickItmCd) {
									itm.select();
									$inMoreDetail.ui.selectedObj = [itm];
									$(".ttitle.charItmMapTitle.blue").text(chartName + "   〉" + itm.options.name);
								}
							}
						}
					}
		        }
		    },
		    
		    credits: {
		        enabled: false
		    },
		    
		    navigation: {
		        buttonOptions: {
		            enabled: false
		        }
		    },
		    
		    legend: {
		        enabled: false
		    },
		    
		    title: {
		    	text: null
		    },
		    
		    xAxis: {
		    	type: 'category'
			},
			
		    yAxis: {
		    	allowDecimals: false,
		        min: 0,
		        title: {
		            text: null
		        }
		    },
		    
		    lang: {
				thousandsSep: ','
			},
			
		    tooltip: {
		    	formatter: function () {
		    		var rate = (Number(this.y)/Number(total1_1[0].y)*100).toFixed(2);
		    		
    				return "<p style='color: #3d4956;white-space:nowrap;margin:8px 14px 5px 8px;'>" + $("#tmsYears option:selected").text() + "년 " +
        			$("#chrItmList option:selected").text() + "</p>" +
					"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin:8px 14px 5px 8px;'>" +
					this.key + "</p></div>" +
					"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					numberFormat(this.y) + " " + unitNm + "</p></div>" + 
					"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					rate + " %" + "</p>";
				},
				useHTML: true,
				shared: false,
			    shadow: false,
			    enabled: true
		    },
		    
		    accessibility: {
		        point: {
		            valueSuffix: unitNm
		        }
		    },
		    
		    plotOptions: {
		    	series: {
		            cursor: 'pointer'
		        }
		    },
		    
		    series: 
		    [{
		        name: '',
		        type: 'spline',
		        colorByPoint: true,
		        showInLegend: true,
		        data: chart1_1,
		        states: {
					select: {
						color: vSelectedColor,
						borderColor: vSelectedColor,
					}
				},
		        dataLabels: {
		            enabled: true,
		            style: {
		                fontWeight: 'bold',
		                color: (
		                    Highcharts.defaultOptions.title.style &&
		                    Highcharts.defaultOptions.title.style.color
		                ) || 'gray'
		            },
		            formatter: function() {
		            	var s  = numberFormat(this.y);
						return s;
		            }
		        },
		        point: {
		        	events: {
		        		click: function() {
		        			$inMoreDetail.ui.chartClickItmCd = this.series.chart.hoverPoints[0].options.itm_id;
		        			$inMoreDetail.ui.chartClickItmNm = this.series.chart.hoverPoints[0].options.name;
		        			$inMoreDetail.ui.chartItmClick($(this), "#f08246", this.name);
		        		}
		        	}
		        }
		    }]
		});
	}else if("CH1S06"==chartType){	//CH1S06 파이차트
		$inMoreDetail.chart1 = Highcharts.chart('inMoreDetailCorpCountOfIndustryChart', {
			
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie',
		        events: {
					load: function(e) {
						let chartName = $("#chrItmList option:selected").text();
						for(let i=0; i<e.target.series.length; i++) {
							let sb = e.target.series[i];
							for(let j=0; j<sb.data.length; j++) {
								let itm = sb.data[j];
								if(itm.options.itm_id == $inMoreDetail.ui.chartClickItmCd) {
									itm.select();
									$inMoreDetail.ui.selectedObj = [itm];
									$(".ttitle.charItmMapTitle.blue").text(chartName + "   〉" + itm.options.name);
								}
							}
						}
					}
		        }
		    },
		    
		    credits: {
		        enabled: false
		    },
		    
		    navigation: {
		        buttonOptions: {
		            enabled: false
		        }
		    },
		    
		    legend: {
		        enabled: false
		    },
		    
		    title: {
		        text: centerTitle,
		        align: 'center',
		        verticalAlign: 'middle',
		        y: 0,
		        style: {fontSize: '15px'}
		    },
		    
		    tooltip: {
		    	formatter: function () {
		    		var rate = (Number(this.y)/Number(total1_1[0].y)*100).toFixed(2);
		    		
    				return "<p style='color: #3d4956;white-space:nowrap;margin:8px 14px 5px 8px;'>" + $("#tmsYears option:selected").text() + "년 " +
        			$("#chrItmList option:selected").text() + "</p>" +
					"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin:8px 14px 5px 8px;'>" +
					this.key + "</p></div>" +
					"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					numberFormat(this.y) + " " + unitNm + "</p></div>" + 
					"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
					rate + " %" + "</p>";
				},
				useHTML: true,
				shared: false,
			    shadow: false,
			    enabled: true
		    },
		    
		    accessibility: {
		        point: {
		            valueSuffix: unitNm
		        }
		    },
		    
		    plotOptions: {
		        pie: {
		            allowPointSelect: false,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
					    formatter: function() {
				        	var nm = this.point.name;
				        	var y  = numberFormat(this.point.y);
				        	
							return '<b>'+nm+'</b> : '+y+''+unitNm;
				        }
		            }
		        }
		    },
		    
		    series: 
		    [{
		        name: '',
		        colorByPoint: true,
		        innerSize: '50%',
		        showInLegend: true,
		        data: chart1_1,
		        states: {
					select: {
						color: vSelectedColor,
						borderColor: vSelectedColor,
					}
				},
		        point: {
		        	events: {
		        		click: function() {
		        			$inMoreDetail.ui.chartClickItmCd = this.series.chart.hoverPoints[0].options.itm_id;
		        			$inMoreDetail.ui.chartClickItmNm = this.series.chart.hoverPoints[0].options.name;
		        			$inMoreDetail.ui.chartItmClick($(this), "#f08246", this.name);
		        		}
		        	}
		        }
		    }]
		});
	}
}

/**
 * @name         : timeSeriesCorpCountIndustryChart 
 * @description  : 산업별/년도별 비교 차트
 * @date         : 2021.11.03
 * @author	     : 이영호
 * @history 	 : 
 * @parameter	 : 현재데이터, 전년도데이터
 */
var timeSeriesCorpCountIndustryChart = function(data1, data2) {
	let chartHeight = 0;
	var chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let maxVal = 0, sumVal = [];	
	
	if(data1[0].TBL_ID == "DT_1KI1509" || data1[0].TBL_ID == "DT_1KI1510" || data1[0].TBL_ID == "DT_1KI1511" 
	||data1[0].TBL_ID == "DT_1KI1509_10" || data1[0].TBL_ID == "DT_1KI1510_10" || data1[0].TBL_ID == "DT_1KI1511_10" 
	||data1[0].TBL_ID == "DT_1KI2001" || data1[0].TBL_ID == "DT_1KI2002" || data1[0].TBL_ID == "DT_1KI2003" 
	){
		if(Object.keys(data1).length > 0 && Object.keys(data2).length > 0) {
			chartHeight = data1.length * 40;
			pwidth = 0;
		} else if(Object.keys(data1).length > 0 && Object.keys(data2).length == 0) {
			chartHeight = data1.length * 20;
			pwidth = 15;
		}
	}else{
		if(Object.keys(data1).length > 0 && Object.keys(data2).length > 0) {
			chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 50;
			pwidth = 15;
		} else if(Object.keys(data1).length > 0 && Object.keys(data2).length == 0) {
			chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 80;
			pwidth = 15;
		}
	}
	
	var chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let chartOpt = $inMoreDetail.ui.dispOptions[chartOrd];
	var chartData = [], categories = [], stacked = {}, itmLv, totSurvWonObj = {}
		, itemId = "OV_L"+chartOpt[0].dispVarOrd+"_ID"
		, itemSn = "OV_L"+chartOpt[0].dispVarOrd+"_SN"
		, itemKor = "OV_L"+chartOpt[0].dispVarOrd+"_KOR";
	
	//통계펴 ID가 달라서 일단 임의 처리
	var chartData2 = [], categories2 = [], stacked2 = {}, itmLv2, totSurvWonObj2 = {};
	
	for(var i=0; i<data1.length; i++) {
		if(stacked[data1[i].PRD_DE] != undefined) {
			stacked[data1[i].PRD_DE].push(data1[i]);
		} else {
			stacked[data1[i].PRD_DE] = [];
			stacked[data1[i].PRD_DE].push(data1[i]);
		}
	}
	
	for(var i=0; i<data2.length; i++) {
		if(stacked[data2[i].PRD_DE] != undefined) {
			stacked[data2[i].PRD_DE].push(data2[i]);
		} else {
			stacked[data2[i].PRD_DE] = [];
			stacked[data2[i].PRD_DE].push(data2[i]);
		}
	}
	
	// chartData를 삽입
	if(data1[0].TBL_ID == "DT_1KI1512" || data1[0].TBL_ID == "DT_1KI2004" || data1[0].TBL_ID == "DT_1KI1512_10" ){
		let resArrCnt = [];
		let resArrCnt2 = [];
		let c1 = 0, c2 = 0, c3 = 0, c4 = 0;
		
		for(var i=0; i<data1.length; i++) {
			if(data1[i].DTVAL_CO != undefined){
				if(data1[i].OV_L3_ID == 'C1'){
					c1 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'C2'){
					c2 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'C3'){
					c3 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'C4'){
					c4 += data1[i].DTVAL_CO*1;
				}
			}
		}
		resArrCnt.push(c1);
		resArrCnt.push(c2);
		resArrCnt.push(c3);
		resArrCnt.push(c4);
		
		chartData.push({
			name: Object.keys(stacked)[1] + "년", 
			data: resArrCnt, 
			pointWidth: 15 
		});
		
		c1 = 0, c2 = 0, c3 = 0, c4 = 0;
		for(var i=0; i<data2.length; i++) {
			if(data2[i].DTVAL_CO != undefined){
				if(data2[i].OV_L3_ID == 'C1'){
					c1 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'C2'){
					c2 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'C3'){
					c3 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'C4'){
					c4 += data2[i].DTVAL_CO*1;
				}
			}
		}
		resArrCnt2.push(c1);
		resArrCnt2.push(c2);
		resArrCnt2.push(c3);
		resArrCnt2.push(c4);
		
		chartData.push({
			name: Object.keys(stacked)[0] + "년", 
			data: resArrCnt2, 
			pointWidth: 15 
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		resArrCnt2.sort(function(a, b)  {
			return b - a;
		});
		
		if(resArrCnt[0] > resArrCnt2[0]){
			maxVal = Math.round(resArrCnt[0])*1.2;
		}else{
			maxVal = Math.round(resArrCnt2[0])*1.2;
		}
		
	}else if(data1[0].TBL_ID == "DT_1KI1513" || data1[0].TBL_ID == "DT_1KI2005" || data1[0].TBL_ID == "DT_1KI1513_10" ){
		let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
		
		let resArrCnt = [];
		let resArrCnt2 = [];
		
		for(var i=0; i<data1.length; i++) {
			if(data1[i].DTVAL_CO != undefined){
				if(data1[i].OV_L3_ID == 'D1'){
					d1 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D2'){
					d1 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D3'){
					d2 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D4'){
					d3 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D5'){
					d3 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D6'){
					d4 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D7'){
					d5 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D8'){
					d5 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L3_ID == 'D9'){
					d6 += data1[i].DTVAL_CO*1;
				}
			}
		}
		
		resArrCnt.push(d1);
		resArrCnt.push(d2);
		resArrCnt.push(d3);
		resArrCnt.push(d4);
		resArrCnt.push(d5);
		resArrCnt.push(d6);
		
		chartData.push({
			name: Object.keys(stacked)[1] + "년", 
			data: resArrCnt, 
			pointWidth: 15 
		});
		
		d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
		for(var i=0; i<data2.length; i++) {
			if(data2[i].DTVAL_CO != undefined){
				if(data2[i].OV_L3_ID == 'D1'){
					d1 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D2'){
					d1 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D3'){
					d2 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D4'){
					d3 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D5'){
					d3 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D6'){
					d4 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D7'){
					d5 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D8'){
					d5 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L3_ID == 'D9'){
					d6 += data2[i].DTVAL_CO*1;
				}
			}
		}
		
		resArrCnt2.push(d1);
		resArrCnt2.push(d2);
		resArrCnt2.push(d3);
		resArrCnt2.push(d4);
		resArrCnt2.push(d5);
		resArrCnt2.push(d6);
		
		chartData.push({
			name: Object.keys(stacked)[0] + "년", 
			data: resArrCnt2, 
			pointWidth: 15 
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		resArrCnt2.sort(function(a, b)  {
			return b - a;
		});
		
		if(resArrCnt[0] > resArrCnt2[0]){
			maxVal = Math.round(resArrCnt[0])*1.2;
		}else{
			maxVal = Math.round(resArrCnt2[0])*1.2;
		}
		
	}else if(data1[0].TBL_ID == "DT_1KI1514" || data1[0].TBL_ID == "DT_1KI2006" || data1[0].TBL_ID == "DT_1KI1514_10" ){
		let t201 = 0, t202 = 0, t203 = 0, t204 = 0, t205 = 0;
		let resArrCnt = [], resArrCnt2=[];
		
		for(var i=0; i<data1.length; i++) {
			if(data1[i].DTVAL_CO != undefined){
				/*if(data1[i].CHAR_ITM_ID == "T201" || data1[i].CHAR_ITM_ID == "T2011" || data1[i].CHAR_ITM_ID == "T2012"){
					t201 += data1[i].DTVAL_CO*1;
				}else if(data1[i].CHAR_ITM_ID == "T202" || data1[i].CHAR_ITM_ID == "T2021" || data1[i].CHAR_ITM_ID == "T2022"){
					t202 += data1[i].DTVAL_CO*1;
				}else if(data1[i].CHAR_ITM_ID == "T203" || data1[i].CHAR_ITM_ID == "T2031" || data1[i].CHAR_ITM_ID == "T2032"){
					t203 += data1[i].DTVAL_CO*1;
				}else if(data1[i].CHAR_ITM_ID == "T204" || data1[i].CHAR_ITM_ID == "T2041" || data1[i].CHAR_ITM_ID == "T2042"){
					t204 += data1[i].DTVAL_CO*1;
				}else if(data1[i].CHAR_ITM_ID == "T205" || data1[i].CHAR_ITM_ID == "T2051" || data1[i].CHAR_ITM_ID == "T2052"){
					t205 += data1[i].DTVAL_CO*1;
				}*/
				resArrCnt.push(data1[i].DTVAL_CO);
			}
		}
		
		/*resArrCnt.push(t201);
		resArrCnt.push(t202);
		resArrCnt.push(t203);
		resArrCnt.push(t204);
		resArrCnt.push(t205);*/
		
		chartData.push({
			name: Object.keys(stacked)[1] + "년", 
			data: resArrCnt, 
			pointWidth: 15 
		});
		
		t201 = 0, t202 = 0, t203 = 0, t204 = 0, t205 = 0;
		for(var i=0; i<data2.length; i++) {
			if(data2[i].DTVAL_CO != undefined){
				/*if(data2[i].CHAR_ITM_ID == "T30" || data2[i].CHAR_ITM_ID == "T31" || data2[i].CHAR_ITM_ID == "T32"){
					t201 += data2[i].DTVAL_CO*1;
				}else if(data2[i].CHAR_ITM_ID == "T40" || data2[i].CHAR_ITM_ID == "T41" || data2[i].CHAR_ITM_ID == "T42"){
					t202 += data2[i].DTVAL_CO*1;
				}else if(data2[i].CHAR_ITM_ID == "T50" || data2[i].CHAR_ITM_ID == "T51" || data2[i].CHAR_ITM_ID == "T52"){
					t203 += data2[i].DTVAL_CO*1;
				}else if(data2[i].CHAR_ITM_ID == "T60" || data2[i].CHAR_ITM_ID == "T61" || data2[i].CHAR_ITM_ID == "T62"){
					t204 += data2[i].DTVAL_CO*1;
				}else if(data2[i].CHAR_ITM_ID == "T70" || data2[i].CHAR_ITM_ID == "T71" || data2[i].CHAR_ITM_ID == "T72"){
					t205 += data2[i].DTVAL_CO*1;
				}*/
				resArrCnt2.push(data2[i].DTVAL_CO);
			}
		}
		
		/*resArrCnt2.push(t201);
		resArrCnt2.push(t202);
		resArrCnt2.push(t203);
		resArrCnt2.push(t204);
		resArrCnt2.push(t205);*/
		
		chartData.push({
			name: Object.keys(stacked)[0] + "년", 
			data: resArrCnt2, 
			pointWidth: 15 
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		resArrCnt2.sort(function(a, b)  {
			return b - a;
		});
		
		if(resArrCnt[0] > resArrCnt2[0]){
			maxVal = Math.round(resArrCnt[0])*1.2;
		}else{
			maxVal = Math.round(resArrCnt2[0])*1.2;
		}
		
	}else if(data1[0].TBL_ID == "DT_1KI1515" || data1[0].TBL_ID == "DT_1KI2007" || data1[0].TBL_ID == "DT_1KI1515_10" ){
		let d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
		
		let resArrCnt = [];
		let resArrCnt2 = [];
		
		for(var i=0; i<data1.length; i++) {
			if(data1[i].DTVAL_CO != undefined){
				if(data1[0].TBL_ID == "DT_1KI1515_10"){
					if(data1[i].OV_L3_ID == 'E1'){
						d1 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E2'){
						d1 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E3'){
						d2 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E4'){
						d2 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E5'){
						d3 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E6'){
						d3 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E7'){
						d4 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E8'){
						d5 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'E9'){
						d6 += data1[i].DTVAL_CO*1;
					}
				}else{
					if(data1[i].OV_L3_ID == 'D1'){
						d1 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D2'){
						d1 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D3'){
						d2 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D4'){
						d2 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D5'){
						d3 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D6'){
						d3 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D7'){
						d4 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D8'){
						d5 += data1[i].DTVAL_CO*1;
					}else if(data1[i].OV_L3_ID == 'D9'){
						d6 += data1[i].DTVAL_CO*1;
					}
				}
			}
		}
		
		resArrCnt.push(d1);
		resArrCnt.push(d2);
		resArrCnt.push(d3);
		resArrCnt.push(d4);
		resArrCnt.push(d5);
		resArrCnt.push(d6);
		
		chartData.push({
			name: Object.keys(stacked)[1] + "년", 
			data: resArrCnt, 
			pointWidth: 15 
		});
		
		d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
		for(var i=0; i<data2.length; i++) {
			if(data2[i].DTVAL_CO != undefined){
				if(data1[0].TBL_ID == "DT_1KI1515_10"){
					if(data2[i].OV_L3_ID == 'E1'){
						d1 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E2'){
						d1 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E3'){
						d2 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E4'){
						d2 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E5'){
						d3 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E6'){
						d3 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E7'){
						d4 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E8'){
						d5 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'E9'){
						d6 += data2[i].DTVAL_CO*1;
					}
				}else{
					if(data2[i].OV_L3_ID == 'D1'){
						d1 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D2'){
						d1 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D3'){
						d2 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D4'){
						d2 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D5'){
						d3 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D6'){
						d3 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D7'){
						d4 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D8'){
						d5 += data2[i].DTVAL_CO*1;
					}else if(data2[i].OV_L3_ID == 'D9'){
						d6 += data2[i].DTVAL_CO*1;
					}
				}
				
			}
		}
		
		resArrCnt2.push(d1);
		resArrCnt2.push(d2);
		resArrCnt2.push(d3);
		resArrCnt2.push(d4);
		resArrCnt2.push(d5);
		resArrCnt2.push(d6);
		
		chartData.push({
			name: Object.keys(stacked)[0] + "년", 
			data: resArrCnt2, 
			pointWidth: 15 
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		resArrCnt2.sort(function(a, b)  {
			return b - a;
		});
		
		if(resArrCnt[0] > resArrCnt2[0]){
			maxVal = Math.round(resArrCnt[0])*1.2;
		}else{
			maxVal = Math.round(resArrCnt2[0])*1.2;
		}
	}else if(data1[0].TBL_ID == "DT_1KI1516" || data1[0].TBL_ID == "DT_1KI2008" || data1[0].TBL_ID == "DT_1KI1516_10" ){
		let resArrCnt = [];
		let resArrCnt2 = [];
		let f1 = 0, f2 = 0, f3 = 0;
		
		for(var i=0; i<data1.length; i++) {
			if(data1[i].DTVAL_CO != undefined){
				if(data1[i].OV_L4_ID == 'F1'){
					f1 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L4_ID == 'F2'){
					f2 += data1[i].DTVAL_CO*1;
				}else if(data1[i].OV_L4_ID == 'F3'){
					f3 += data1[i].DTVAL_CO*1;
				}
			}
		}
		resArrCnt.push(f1);
		resArrCnt.push(f2);
		resArrCnt.push(f3);
		
		chartData.push({
			name: Object.keys(stacked)[0] + "년", 
			data: resArrCnt, 
			pointWidth: 15 
		});
		
		f1 = 0, f2 = 0, f3 = 0;
		for(var i=0; i<data2.length; i++) {
			if(data2[i].DTVAL_CO != undefined){
				if(data2[i].OV_L4_ID == 'f1'){
					f1 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L4_ID == 'f2'){
					f2 += data2[i].DTVAL_CO*1;
				}else if(data2[i].OV_L4_ID == 'f3'){
					f3 += data2[i].DTVAL_CO*1;
				}
			}
		}
		resArrCnt2.push(f1);
		resArrCnt2.push(f2);
		resArrCnt2.push(f3);
		
		chartData.push({
			name: Object.keys(stacked)[1] + "년", 
			data: resArrCnt2, 
			pointWidth: 15 
		});
		
		// 내림차순으로 정렬
		resArrCnt.sort(function(a, b)  {
			  return b - a;
		});
		resArrCnt2.sort(function(a, b)  {
			return b - a;
		});
		
		if(resArrCnt[0] > resArrCnt2[0]){
			maxVal = Math.round(resArrCnt[0])*1.2;
		}else{
			maxVal = Math.round(resArrCnt2[0])*1.2;
		}
	}else{
		if(data1[0].TBL_ID == "DT_1KI1509" || data1[0].TBL_ID == "DT_1KI1509_10" || data1[0].TBL_ID == "DT_1KI2001" 
			|| data1[0].TBL_ID == "DT_1KI1510_10"|| data1[0].TBL_ID == "DT_1KI1511_10" )	{
			for(let i = 0 ;i<Object.keys(stacked).length;i++){
				stacked[Object.keys(stacked)[i]].sort(function(a,b){
					return a.OV_L1_ID < b.OV_L1_ID ? -1 : a.OV_L1_ID > b.OV_L1_ID ? 1 : 0;
				});
			}
		}else{
			for(let i = 0 ;i<Object.keys(stacked).length;i++){
				stacked[Object.keys(stacked)[i]].sort(function(a,b){
					return a.OV_L2_ID < b.OV_L2_ID ? -1 : a.OV_L2_ID > b.OV_L2_ID ? 1 : 0;
				});
			}
		}
		for(var i=Object.keys(stacked).length-1; i>=0; i--) {
			let stack = stacked[Object.keys(stacked)[i]];		
			let stackData = [];
			for(var j=0; j<stack.length; j++) {
				if(stack[j].CHAR_ITM_ID != "13999001" && stack[j][itemId] != "0") {
					let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
					stackData.push(parseInt(Math.round(dtval/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit),1)));
				}
			}
			if(pwidth == 0) {
				chartData.push({name: Object.keys(stacked)[i] + "년", data: stackData});
			} else {
				chartData.push({name: Object.keys(stacked)[i] + "년", data: stackData, pointWidth: pwidth });
			}
		}
		
		// 최댓값 정의
		for(var i=0; i<Object.keys(stacked).length; i++) {
			let stack = stacked[Object.keys(stacked)[i]];
			totSurvWonObj[Object.keys(stacked)[i]] = 0;	
			for(var j=0; j<stack.length; j++) {
				let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
				if(stack[j][itemId] != "0") {
					if(sumVal[j] != undefined) {
						sumVal[j] = sumVal[j] + parseInt(dtval);
					} else {
						sumVal.push(parseInt(dtval));
					}	
				}			
				totSurvWonObj[Object.keys(stacked)[i]] += parseInt(dtval);
				//stack.sort(function(a, b) { return a[itemSn] - b[itemSn] });
			} 
			
			stacked[Object.keys(stacked)[i]].sort(function(a, b) { return a.CHAR_ITM_SN - b.CHAR_ITM_SN });
		}
		
		for(var i=0; i<sumVal.length; i++) {
			if(maxVal < sumVal[i]) {
				maxVal = sumVal[i];
			}
		}	
		
		let sumVal2 = [];
		for(var i=0; i<sumVal2.length; i++) {
			if(maxVal < sumVal2[i]) {
				maxVal = sumVal2[i];
			}
		}	
	}
	
	// 카테고리
	if(data1[0].TBL_ID == "DT_1KI1512" || data1[0].TBL_ID == "DT_1KI2004" || data1[0].TBL_ID == "DT_1KI1512_10" ){
		categories.push("개인사업체");
		categories.push("회사법인");
		categories.push("회사이외법인");
		categories.push("비법인단체");
	}else if(data1[0].TBL_ID == "DT_1KI1513" || data1[0].TBL_ID == "DT_1KI2005" || data1[0].TBL_ID == "DT_1KI1513_10" ){
		categories.push("1~4인");
		categories.push("5~9인");
		categories.push("10~49인");
		categories.push("50~99인");
		categories.push("100~299인");
		categories.push("300명 이상");
	}else if(data1[0].TBL_ID == "DT_1KI1514" || data1[0].TBL_ID == "DT_1KI2006" || data1[0].TBL_ID == "DT_1KI1514_10" ){
		categories.push("농업, 임업 및 어업");
		categories.push("광업");
		categories.push("제조업");
		categories.push("전기, 가스, 증기 및 수도사업");
		categories.push("하수 · 폐기물 처리, 원료재생 및 환경복원업");
		categories.push("건설업");
		categories.push("도매 및 소매업");
		categories.push("운수업");
		categories.push("숙박 및 음식점업");
		categories.push("출판, 영상, 방송통신 및 정보서비스업");
		categories.push("금융 및 보험업");
		categories.push("부동산업 및 임대업");
		categories.push("전문, 과학 및 기술 서비스업");
		categories.push("사업시설관리 및 사업지원 서비스업");
		categories.push("공공행정, 국방 및 사회보장 행정");
		categories.push("교육 서비스업");
		categories.push("보건업 및 사회복지 서비스업");
		categories.push("예술, 스포츠 및 여가관련 서비스업");
		categories.push("협회 및 단체, 수리  및 기타 개인 서비스업");

		/*categories.push("상용근로자");
		categories.push("임시 및 일용근로자");
		categories.push("자영업자");
		categories.push("무급가족종사자");
		categories.push("기타종사자");*/
	}else if(data1[0].TBL_ID == "DT_1KI1515" || data1[0].TBL_ID == "DT_1KI2007" || data1[0].TBL_ID == "DT_1KI1515_10" ){
		categories.push("1억원 미만");
		categories.push("1억~10억원 미만");
		categories.push("10억~100억원 미만");
		categories.push("100억~200억원 미만");
		categories.push("200억~300억원 미만");
		categories.push("300억원 이상");
	}else if(data1[0].TBL_ID == "DT_1KI1516" || data1[0].TBL_ID == "DT_1KI2008" || data1[0].TBL_ID == "DT_1KI1516_10" ){
		categories.push("단독사업체");
		categories.push("본사,본점 등");
		categories.push("300억원 이상");
	}else{
		maxVal = Math.round(parseInt(maxVal/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit))) * 1.1;
		for(var i=0; i<stacked[Object.keys(stacked)[0]].length; i++) {
			let stack = stacked[Object.keys(stacked)[0]][i];
			var isAlready = false;
			for(var j=0; j<chartOpt.length; j++) {
				if(chartOpt[j].itmId == stack[itemId] && stack[itemId] != "0") {
					categories.push(stack[itemKor]);
					isAlready = true;	
				}
			}
			
			if(!isAlready) {
				if(stack[itemId] != "0") {
					categories.push(stack[itemKor]);
				}			
			}
		}
	}
	
	var tool = $("#timeSeriesCorpCountIndustryChart").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	
	$inMoreDetail.chart2 = $('#timeSeriesCorpCountIndustryChart').highcharts({
		chart: {
	        type: 'bar',
	        height: chartHeight*1.1,
	        width: 600,
	        events: {
	        	load: function() {
	        		if(this.series[0].chart.renderTo.id = "timeSeriesCorpCountIndustryChart") {
	        			if($inMoreDetail.selectedCategory != "") {
		        			$("#timeSeriesCorpCountIndustryChart").highcharts().series[0].data.forEach(function(selector) {
								if(selector.category == $inMoreDetail.selectedCategory) {
									selector.select(true);
									$inMoreDetailMap.ui.selectedObj = $(selector); 
								}
							});
						}
	        		}
	        	}
	        }
	    },
		credits: {
            enabled: false
        },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		legend: {
			enabled: true,
		    itemMarginTop: 10,
		    verticalAlign: 'top',
		    itemMarginBottom: 10,
		    labelFormatter: function() {
             	return '<b>' + this.name + '</b>&nbsp;<b>';
            },
	    },
	    colors: ["#f08246", "#009589"],
		title: {
			text: "",
			style: { "display": "none" }
		},
		plotOptions: {
			 bar: {
	            dataLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: '100',
	                    color: "#000000",
						textOutline: false
	                },
	                overflow: "allow",
	                allowOverlap: true,
	                formatter: function() {
						return numberFormat(this.y);
					}
	            },
	            pointInterval: 1,
				borderWidth: 0,
				pointWidth: 16,
				groupPadding: 0.1
	        },
			series: {
				cursor: 'pointer',
				minPointLength: 5,
				point: {
					events: {
						click: function() {
					    	$totSurvMain.ui.chartTarget = "timeSeriesCorpCountIndustryChart";
					    	$inMoreDetail.selectedCategory = this.category;
							//분류가 두 종류 이상							
					    	let thisYear = this.series.name.substring(0,4);
					    	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
					    	let thisData = stacked[thisYear][this.x+1]; // 최상위에 전산업이 있기 때문에 +1 해줌
					    	let sbxKsic = $("#sbx_ksic option:selected").text();
					    	let charItmTxt = $("#chrItmList option:selected").text();
					    	let charItmId = $inMoreDetail.ui.selectedCharItmId;
					    	let itmColumn = "";
					    	
					    	let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
					    	if (tblist == "DT_1KI1514" || tblist == "DT_1KI2006" || tblist == "DT_1KI1514_10"){
					    		thisData = stacked[thisYear][this.x+1];
					    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_ID";
					    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_list"] = thisData[itmColumn];	// 분류코드	
					    		charItmId = thisData.CHAR_ITM_ID;
					    	}else{
					    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_ID";
					    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
					    	}
					    	
					    	$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;				
					    	$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 연도/" + sbxKsic + " " + charItmTxt;
				    		$inMoreDetail.ui.chartItmClick($(this), "#f08246", this.series.userOptions.name + " " 
								+ this.category + " " + $("#chrItmList option:selected").text());
						},
						mouseOver: function() {
					        //tool.css("display", "inline-block");
							tool.css("display", "none");

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0, vTot = 0;
							var key = "";
							
							for(var i=0; i<this.series.data.length; i++) {
								vTot += this.series.data[i].y;
							}
							
							ratio = (parseInt(this.series.data[this.x].y) / vTot * 100).toFixed(2);
					        
							var unit = chartOpt[0].kosisUnitNm;
							
					        $(document).on("mousemove", function(evt) {
					        	let target = document.getElementById("timeSeriesCorpCountIndustryChart");
						        let clientRect = target.getBoundingClientRect();
						        let rTop = clientRect.top;
						        let rLeft = clientRect.left;
						        let sTopLength = window.pageYOffset;
						        let sLeftLength = window.pageXOffset;
						        
								tool.css("left", evt.clientX - (rLeft + sLeftLength) - (parseInt(tool.css("width"))/2));
								//let ttTop = evt.clientY + $(target).parent().parent().parent().parent().scrollTop() - 245;
								let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
								
								let ttTop = evt.clientY - (rTop + sTopLength) +300;
								
								if(tblist == 'DT_1KI1512'){
									ttTop = evt.clientY - (rTop + sTopLength) +300;
								}else if(tblist == 'DT_1KI1513'){
									ttTop = evt.clientY - (rTop + sTopLength) +350;
								}else if(tblist == 'DT_1KI1514'){
									ttTop = evt.clientY - (rTop + sTopLength) +500;
								}else if(tblist == 'DT_1KI1515'){
									ttTop = evt.clientY - (rTop + sTopLength) +350;
								}else if(tblist == 'DT_1KI1516'){
									ttTop = evt.clientY - (rTop + sTopLength) +350;
								}else {
									ttTop = evt.clientY - (rTop + sTopLength) +500;
								}
								
						        tool.css("top", ttTop);
							});
						
					        let dtval = this.series.data[this.x].y != undefined ? parseInt(this.series.data[this.x].y) : 0;
					       
					        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + this.series.name + " " + $("#chrItmList option:selected").text() + "</p>" +
								"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
								this.series.data[this.x].category + "</p>" +
								"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
								numberFormat(dtval) + " " + unit + "</p><br>" + 
								"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
								numberFormat(ratio) + "</p>" + "%"); 
						},
						mouseOut: function() {
							$(document).off("mousemove");							
							tool.css("display", "none");
						}
					}
				}
			}
		},
		tooltip: {
        	formatter: function () {
        		let vTot = 0;
				for(var i=0; i<this.series.data.length; i++) {
					vTot += this.series.data[i].y;
				}
        		for(let i=0; i< this.series.data.length;i++){
	    			if(this.series.data[i].category == this.x){
	    				let unit = chartOpt[0].kosisUnitNm;
		    			let dtval = this.series.data[i].y != undefined ? parseInt(this.series.data[i].y) : 0;
		    			let ratio = (parseInt(this.series.data[i].y) / vTot * 100).toFixed(2);
		    			
						return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" + this.series.name + " " + $("#chrItmList option:selected").text() + "</p>" +
						"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
						this.series.data[i].category + "</p></div>" +
						"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
						numberFormat(dtval) + " " + unit + "</p></div>" + 
						"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
						numberFormat(ratio) + "</p>" + "%"+"</div>" ;
					}
				}
			},
			useHTML: true,
			shared: false,
		    shadow: false,
		    enabled: true,
		},
		xAxis: {
	        categories: categories,
			lineColor: "transparent",
			tickLength: 0,
			labels: {				
				formatter: function() {
					return this.value;
				}
			}
	    },
		yAxis: {
			max: maxVal,
			min: 0,
	        title: {
				text: null
			},
			labels: {
				formatter: function() {
					return numberFormat(this.value);
				}
			},
			lineWidth: 1,
			stackLabels: {
                enabled: true,
                style: {
                    fontWeight: '100',
                    color: "#000000",
					textOutline: false
                },
				formatter: function() {
					return numberFormat(this.total);
				}
            }
	    },
		series: chartData
	});
	
	// 생략 무시
	var ellipsisLegend = $("#timeSeriesCorpCountIndustryChart g.highcharts-axis-labels title");
	for(var i=0; i<ellipsisLegend.length; i++) {
		if(ellipsisLegend[i]) {
			var str = $(ellipsisLegend[i]).text()
				+ "<tspan class='highcharts-br' dy='15' x='21'>&ZeroWidthSpace;</tspan>";
			$(ellipsisLegend[i]).parent().empty().append(str);
		}
	}
	if(data1[0].TBL_ID == "DT_1KI1509" || data1[0].TBL_ID == "DT_1KI1510" || data1[0].TBL_ID == "DT_1KI1511" ){
		$("#timeSeriesCorpCountIndustryChart g.highcharts-axis-labels.highcharts-xaxis-labels text").attr("x", "210");
	}
	$("#timeSeriesCorpCountIndustryChart g.highcharts-axis-labels.highcharts-xaxis-labels text").css("font-size", "11px");
	
	$("#timeSeriesCorpCountIndustryChart").parent().show();
}

var timeSeriesCorpCountIndustryChart2_1 = function(data) {
	if(data.length>0) $('#title2').parent().css('display','block');
	else $('#title2').parent().css('display','none');
	
	
	var chartData = [], categories = [], stacked = {}, itmLv, totSurvWonObj = {}
	, chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let chartOpt = $inMoreDetail.ui.dispOptions[chartOrd];
	
	let itemId = "OV_L"+chartOpt[0].varOrd+"_ID"
	, itemSn = "OV_L"+chartOpt[0].varOrd+"_SN"
	, itemKor = "OV_L"+chartOpt[0].varOrd+"_KOR"
	
	let chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 40;
	let maxVal = 0, sumVal = [];	
	let resArrCnt = [];
	
	let unitNm = $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm;
	var categoriesArr = [];
	var total2_1 = [];
	var rateArr = [];
	var standard = 0; 	//기준(작년)
	var comparison = 0; //비교대상(금년)
	var rate = 0;
	var maxRateVal = 0;
	var minRateVal = 0;

	var optChartOrd = $inMoreDetail.ui.dispOptions[chartOrd];
	
	data.sort(function(a, b) { return a.ITM_RCGN_SN - b.ITM_RCGN_SN });
	data.sort(function(a, b) { return a.OV_L1_SN - b.OV_L1_SN });
	data.sort(function(a, b) { return a.PRD_DE - b.PRD_DE });
	
	for(var i=0; i<data.length; i++) {
		if(data[i].DTVAL_CO != undefined){
			categoriesArr.push(data[i].PRD_DE+"년");
			chartData.push([data[i].PRD_DE+"년", Number(data[i].DTVAL_CO)]);
		
			comparison = Number(data[i].DTVAL_CO);

			if(i==0) {
				rateArr.push(0);
			}else{
				rate = (((comparison - standard)/standard)*100).toFixed(2);
				rateArr.push(Number(rate));
			}
			standard = Number(data[i].DTVAL_CO);
		}
	}
	
	maxRateVal = Math.max.apply(null, rateArr);
	minRateVal = Math.min.apply(null, rateArr);
	
	Highcharts.setOptions({
	    lang: {
	        thousandsSep: ','
	    }
	});
	
	$inMoreDetail.chart2 = Highcharts.chart('timeSeriesCorpCountIndustryChart', {
	
		chart: {
		    zoomType: 'xy'
		},
		
		credits: {
		    enabled: false
		},
		
		navigation: {
		    buttonOptions: {
		        enabled: false
		    }
		},
		
		legend: {
	        enabled: false
	    },
		
		title: {
		    text: null
		},
	
		xAxis: {
		    categories: categoriesArr,
		    crosshair: true
		},
		
	    yAxis: [{
				allowDecimals: false,
				min: 0,
		        title: {
		            text: null
		        },
				lineWidth: 1,
			    stackLabels: {
			        enabled: true,
			        style: {
			        	fontWeight: 'bold',
			            color: (
			                Highcharts.defaultOptions.title.style &&
			                Highcharts.defaultOptions.title.style.color
			            ) || 'gray'
			        },
					formatter: function() {
						var s  = numberFormat(this.total);
						return s;
					}
			    }
		    },{
		    	tickInterval: 1,
				min: minRateVal-1,
				max: maxRateVal+1,
				allowDecimals: true,
				gridLineWidth: 0,
				minorGridLineWidth: 0,
		        title: {
		            text: null
		        },
				lineWidth: 1, opposite: true,
				stackLabels: {
			        enabled: true,
			        style: {
			            color: (
			                Highcharts.defaultOptions.title.style &&
			                Highcharts.defaultOptions.title.style.color
			            ) || 'black'
			        },
					formatter: function() {
						var s  = this.total+"%";
						return s;
					}
			    }
	    }],
	    
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	        },
			series: {
            	borderWidth: 0,
//				cursor: 'pointer',
	            pointWidth: 40,
				stacking: 'normal',
				dataLabels: {
	                enabled: true,
        			inside: false,
	                style: {
	                    fontWeight: '100',
	                    color: "#000000",
						fontFamily: 'NanumSquare',
						textOutline: false
	                }
	            }
//				point: {
//					events: {
//						click: function() {
//						var tmsYears_val = this.category.substring(-5,4);
//						$('#tmsYears').val(tmsYears_val).prop("selected",true);
//						
//			    		$inMoreDetail.ui.chartItmClick($(this), "#f08246", this.series.userOptions.name + " " 
//							+ this.category + " " + $("#chrItmList option:selected").text());
//						}
//					}
//				}
	        }
	    },
	    
	    lang: {
			thousandsSep: ','
		},
		
		colors: ['#9165E2','#000000'],
		
	    tooltip: {
	    	formatter: function () {
				return "<p style='text-align:center; padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956;white-space:nowrap;margin:8px 14px 5px 8px;'>" + this.x + " " +
    			$("#chrItmList option:selected").text() + "</p>" +
				"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
				numberFormat(this.points[0].y) + " " + unitNm + "</p></div>" + 
				"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin:8px 14px 5px 8px; white-space:nowrap;'>" + 
				"전년 대비 증감률 : " + this.points[1].y + " %" + "</p>";
			},
			useHTML: true,
			shared: true,
		    shadow: false,
		    enabled: true
	    },
		
	    series: [{
				type: 'column',
		        data: chartData
		    },{
	        	yAxis: 1,
				type: 'line',
		        data: rateArr
		    }]
		});
}

/**
 * @name         : timeSeriesCorpCountIndustryChart 
 * @description  : 산업별/년도별 비교 차트
 * @date         : 2021.11.03
 * @author	     : 이영호
 * @history 	 : 
 * @parameter	 : 현재데이터, 전년도데이터
 */
var industryOfAreaChart = function(data) {
	$("#industryOfAreaChart2").hide();
	let chartHeight = 0;
	/*
	if(data.length > 0) {
		if(data.length < 10) {
			chartHeight = data.length * 40;
		} else {
			chartHeight = data.length * 30;
		}
	}
	*/
	
	var chartData = [], chartData2 = [], categories = [], categories2 = [], stacked = {}, itmLv, totSurvWonObj = {}
		, chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let chartOpt = $inMoreDetail.ui.dispOptions[chartOrd];
	let legendChk = true;
	
	if(	  data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI1514_10" || data[0].TBL_ID == "DT_1KI2006" ){
		chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 50;
	}
	//chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 50;
	//chartHeight = data.length * 50;
	
	let admId = "OV_L"+chartOpt[0].regionVarOrd+"_ID"
	, admSn = "OV_L"+chartOpt[0].regionVarOrd+"_SN"
	, admKor = "OV_L"+chartOpt[0].regionVarOrd+"_KOR"
	
	for(var i=0; i<data.length; i++) {
		if(stacked[data[i].CHAR_ITM_ID] != undefined) {
			stacked[data[i].CHAR_ITM_ID].push(data[i]);
		} else {
			stacked[data[i].CHAR_ITM_ID] = [];
			stacked[data[i].CHAR_ITM_ID].push(data[i]);
		}
	}
	
	let maxVal = 0, maxVal2 = 0, sumVal = [];	
	for(var i=0; i<Object.keys(stacked).length; i++) {
		let stack = stacked[Object.keys(stacked)[i]];
		totSurvWonObj[Object.keys(stacked)[i]] = 0;	
		for(var j=0; j<stack.length; j++) {
			let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
			if(stack[j][admId] != "00") {
				if(sumVal[j] != undefined) {
					sumVal[j] = sumVal[j] + parseInt(dtval);
				} else {
					sumVal.push(parseInt(dtval));
				}	
			} else {
				sumVal.push(parseInt(dtval));
			}			
			totSurvWonObj[Object.keys(stacked)[i]] += parseInt(dtval);
			stack.sort(function(a, b) { return a[admSn] - b[admSn] });
		} 
		
		stacked[Object.keys(stacked)[i]].sort(function(a, b) { return a.CHAR_ITM_SN - b.CHAR_ITM_SN });
	}
	
	for(var i=1; i<sumVal.length; i++) {
		if(maxVal < sumVal[i]) {
			maxVal = sumVal[i];
		}
	}	
	maxVal = Math.round(parseInt(maxVal/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit))) * 1.1;
	
	if(data[0].TBL_ID == "DT_1KI1512" || data[0].TBL_ID == "DT_1KI2004" || data[0].TBL_ID == "DT_1KI1512_10" ){
		// 순서 지정
		var arr =[];
		var resArr = [];
		
		// 항목 선택 
		if($inMoreDetail.ui.selectedChartOrd == 1){
			charItmId = "T10";
		}else if ($inMoreDetail.ui.selectedChartOrd == 2){
			charItmId = "T20";
		}else if ($inMoreDetail.ui.selectedChartOrd == 3){
			charItmId = "T30";
		}else if ($inMoreDetail.ui.selectedChartOrd == 4){
			charItmId = "T50";
		}
		
		for(let i=0;i<data.length;i++){
			if(data[i].OV_L3_ID=="C0"){
				arr.push(data[i]);
			}
		}
		chartHeight = arr.length * 30;
		// 상위 5개 업종 리스트 추출
		let rank = ""
		for(let i=1;i<6;i++){
			if(data[0].TBL_ID == "DT_1KI1512_10"){
				if(i==5){
					rank += arr[i].OV_L1_ID;
				}else{
					rank += arr[i].OV_L1_ID+",";
				}
			}else{
				if(i==5){
					rank += arr[i].OV_L2_ID;
				}else{
					rank += arr[i].OV_L2_ID+",";
				}
			}
		}
		
		if(data[0].TBL_ID == "DT_1KI1512_10"){
			$inMoreDetail.ui.ajax.params["ov_l1_list"] = rank;
		}else{
			$inMoreDetail.ui.ajax.params["ov_l2_list"] = rank;
		}
		$inMoreDetail.ui.ajax.params["rank"] = rank;
		$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					// 업종코드 리스트
					var l2List = [];
					if(data[0].TBL_ID == "DT_1KI1512_10"){
						l2List = $inMoreDetail.ui.ajax.params.ov_l1_list.split(",");
					}else{
						l2List = $inMoreDetail.ui.ajax.params.ov_l2_list.split(",");
					}
					
					var arr1=[],arr2=[],arr3=[],arr4=[];
					var a1=0,a2=0,a3=0,a4=0;
					
					var flag = 0;
					for(let j=0;j<l2List.length;j++){
						a1=0,a2=0,a3=0,a4=0;
						for(let i =0; i<res.length; i++){
							// 같은 업종인지 체크
							if(data[0].TBL_ID == "DT_1KI1512_10"){
								if(l2List[j] == res[i].OV_L1_ID){
									// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L1_KOR);
										flag = 1;
									}
									
									if(res[i].OV_L3_ID == "C1"){
										a1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == "C2"){
										a2 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == "C3"){
										a3 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == "C4"){
										a4 += res[i].DTVAL_CO*1;
									}
								}
							}else{
								if(l2List[j] == res[i].OV_L2_ID){
									// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L2_KOR);
										flag = 1;
									}
									
									if(res[i].OV_L3_ID == "C1"){
										a1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == "C2"){
										a2 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == "C3"){
										a3 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == "C4"){
										a4 += res[i].DTVAL_CO*1;
									}
								}
							}
						}
						flag = 0;
						
						arr1.push(a1);
						arr2.push(a2);
						arr3.push(a3);
						arr4.push(a4);
						
					}
					// 차트데이터
					chartData.push(
							{	
								name: '개인사업체', 
								data: arr1 , 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '회사법인', 
								data: arr2, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '회사이외법인', 
								data: arr3, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '비법인단체', 
								data: arr4, 
								pointWidth: 15 
							}
					);
				
					maxVal = Math.round(arr1[0])*1.2;
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	}else if(data[0].TBL_ID == "DT_1KI1513" || data[0].TBL_ID == "DT_1KI2005" || data[0].TBL_ID == "DT_1KI1513_10" ){
		// 순서 지정
		var arr =[];
		var resArr = [];
		
		// 항목 선택 
		if($inMoreDetail.ui.selectedChartOrd == 1){
			charItmId = "T10";
		}else if ($inMoreDetail.ui.selectedChartOrd == 2){
			charItmId = "T20";
		}else if ($inMoreDetail.ui.selectedChartOrd == 3){
			charItmId = "T30";
		}else if ($inMoreDetail.ui.selectedChartOrd == 4){
			charItmId = "T50";
		}
		
		
		for(let i=0;i<data.length;i++){
			// D0(계)이고 전국인 항목만 추출
			if(data[i].OV_L3_ID=="D0"){
				arr.push(data[i]);
			}
		}
		chartHeight = arr.length * 40;
		let rank = ""
		for(let i=1;i<6;i++){
			if(data[0].TBL_ID == "DT_1KI1513_10"){
				if(i==5){
					rank += arr[i].OV_L1_ID;
				}else{
					rank += arr[i].OV_L1_ID+",";
				}

			}else{
				if(i==5){
					rank += arr[i].OV_L2_ID;
				}else{
					rank += arr[i].OV_L2_ID+",";
				}
			}
		}
		
		if(data[0].TBL_ID == "DT_1KI1513_10"){
			$inMoreDetail.ui.ajax.params["ov_l1_list"] = rank;
		}else{
			$inMoreDetail.ui.ajax.params["ov_l2_list"] = rank;
		}
		$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;
		$inMoreDetail.ui.ajax.params["rank"] = rank;
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					// 업종코드 리스트
					var l2List = [];
					if(data[0].TBL_ID == "DT_1KI1513_10"){
						l2List = $inMoreDetail.ui.ajax.params.ov_l1_list.split(",");
					}else{
						l2List = $inMoreDetail.ui.ajax.params.ov_l2_list.split(",");
					}
					
					var arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[];
					var d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
					
					var flag = 0;
					for(let j=0;j<l2List.length;j++){
						d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
						for(let i =0; i<res.length; i++){
							if(data[0].TBL_ID == "DT_1KI1513_10"){
								if(l2List[j] == res[i].OV_L1_ID){
									// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L1_KOR);
										flag = 1;
									}
									
									if(res[i].OV_L3_ID == 'D1'){
										d1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D2'){
										d1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D3'){
										d2 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D4'){
										d3 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D5'){
										d3 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D6'){
										d4 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D7'){
										d5 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D8'){
										d5 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D9'){
										d6 += res[i].DTVAL_CO*1;
									}
								}
							}else{
								if(l2List[j] == res[i].OV_L2_ID){
									// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L2_KOR);
										flag = 1;
									}
									
									if(res[i].OV_L3_ID == 'D1'){
										d1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D2'){
										d1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D3'){
										d2 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D4'){
										d3 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D5'){
										d3 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D6'){
										d4 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D7'){
										d5 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D8'){
										d5 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L3_ID == 'D9'){
										d6 += res[i].DTVAL_CO*1;
									}
								}
							}
						}
						flag = 0;
						
						arr1.push(d1);
						arr2.push(d2);
						arr3.push(d3);
						arr4.push(d4);
						arr5.push(d5);
						arr6.push(d6);
						
					}
					// 차트데이터
					chartData.push(
							{	
								name: '1~4인', 
								data: arr1 , 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '5~9인', 
								data: arr2, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '10~49인', 
								data: arr3, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '50~99인', 
								data: arr4, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '100~299인', 
								data: arr5, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '300명 이상', 
								data: arr6, 
								pointWidth: 15 
							}
					);
					
					for(let i=0; i<res.length; i++) {
						if(maxVal < parseInt(res[i].DTVAL_CO)) {
							maxVal = parseInt(res[i].DTVAL_CO);
						}
					}
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
		
		maxVal = maxVal;
	}else if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10" ){
		// T201 && 전국 제외하고 나온 데이터 합산해서 sort industryOfAreaChart
		var arr = [], resArr =[];
		var charItmId = "";
		
		// 항목 선택 
		if(data[0].TBL_ID == "DT_1KI2006"){
			if($inMoreDetail.ui.selectedChartOrd == 1){
				charItmId = "T30";
			}else if ($inMoreDetail.ui.selectedChartOrd == 2){
				charItmId = "T31";
			}else if ($inMoreDetail.ui.selectedChartOrd == 3){
				charItmId = "T32";
			}
		}else{
			if($inMoreDetail.ui.selectedChartOrd == 1){
				charItmId = "T201";
			} else if ($inMoreDetail.ui.selectedChartOrd == 2){
				charItmId = "T2011";
			} else if ($inMoreDetail.ui.selectedChartOrd == 3){
				charItmId = "T2012";
			} else if ($inMoreDetail.ui.selectedChartOrd == 4){
				charItmId = "T202";
			} else if ($inMoreDetail.ui.selectedChartOrd == 5){
				charItmId = "T203";
			} else if ($inMoreDetail.ui.selectedChartOrd == 6){
				charItmId = "T204";
			} else if ($inMoreDetail.ui.selectedChartOrd == 7){
				charItmId = "T205";
			}
		}
		$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;
		//$inMoreDetail.ui.ajax.params["ov_l2_list"] = "";
		
		if($inMoreDetail.ui.dispOptions[chartOrd][0].regionVarOrd==1){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
			//$inMoreDetail.ui.ajax.params.ov_l2_list = "0";
		}else{
			//$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
		}

		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					// 업종코드 리스트
					let arrRes = [];
					// 6인 이유 전국이 무조건 1번째로와서
					for(let i =0 ; i<5; i++){
						// 1514차트는 지역 정보가 OV_L2_ID에 입력 
						if(res[i].OV_L2_ID != "00"){
							arrRes.push(res[i].DTVAL_CO*1);
							categories.push(res[i].OV_L2_KOR);
						}
					}
					
					// 차트데이터
					chartData.push(
							{	
								name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
								data: arrRes , 
								pointWidth: 15 
							}
					);
					maxVal = Math.round(res[1].DTVAL_CO)*1.2;
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
		
		// T203 && 전국 제외하고 나온 데이터 합산해서 sort industryOfAreaChart2
		// 초기화 
		arr = [], resArr =[];
		charItmId = "";
		
		if(data[0].TBL_ID == "DT_1KI2006"){
			if($inMoreDetail.ui.selectedChartOrd == 1){
				charItmId = "T50";
			}else if ($inMoreDetail.ui.selectedChartOrd == 2){
				charItmId = "T51";
			}else if ($inMoreDetail.ui.selectedChartOrd == 3){
				charItmId = "T52";
			}
		}else{
			if($inMoreDetail.ui.selectedChartOrd == 1){
				charItmId = "T203";
			} else if ($inMoreDetail.ui.selectedChartOrd == 2){
				charItmId = "T2031";
			} else if ($inMoreDetail.ui.selectedChartOrd == 3){
				charItmId = "T2032";
			} else if ($inMoreDetail.ui.selectedChartOrd == 4){
				charItmId = "T202";
			} else if ($inMoreDetail.ui.selectedChartOrd == 5){
				charItmId = "T203";
			} else if ($inMoreDetail.ui.selectedChartOrd == 6){
				charItmId = "T204";
			} else if ($inMoreDetail.ui.selectedChartOrd == 7){
				charItmId = "T205";
			}
		}
		
		$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					// 업종코드 리스트
					let arrRes = [];
					// 6인 이유 전국이 무조건 1번째로와서
					for(let i =0 ; i<5; i++){
						if(res[i].OV_L2_ID != "00"){
							arrRes.push(res[i].DTVAL_CO*1);
							categories2.push(res[i].OV_L2_KOR);
						}
					}
					
					// 차트데이터
					chartData2.push(
							{	
								name: stacked[Object.keys(stacked)[0]][0].CHAR_ITM_NM, 
								data: arrRes , 
								pointWidth: 15 
							}
					);
					maxVal2 = Math.round(res[1].DTVAL_CO)*1.2;
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
		
	}else if(data[0].TBL_ID == "DT_1KI1515" || data[0].TBL_ID == "DT_1KI2007" || data[0].TBL_ID == "DT_1KI1515_10" ){
		var arr =[];
		var resArr = [];
		
		if($inMoreDetail.ui.selectedChartOrd == 1){
			charItmId = "T10";
		}else if ($inMoreDetail.ui.selectedChartOrd == 2){
			charItmId = "T20";
		}else if ($inMoreDetail.ui.selectedChartOrd == 3){
			charItmId = "T30";
		}else if ($inMoreDetail.ui.selectedChartOrd == 4){
			charItmId = "T50";
		}
	
		
		for(let i=0;i<data.length;i++){
			// D0(계)이고 전국인 항목만 추출
			if(data[i].OV_L3_ID=="D0" || data[i].OV_L3_ID=="E0"){
				arr.push(data[i]);
			}
		}
		chartHeight = arr.length * 40;
		let rank = ""
		for(let i=1;i<6;i++){
			if(data[0].TBL_ID == "DT_1KI1515_10"){
				if(i==5){
					rank += arr[i].OV_L1_ID;
				}else{
					rank += arr[i].OV_L1_ID+",";
				}

			}else{
				if(i==5){
					rank += arr[i].OV_L2_ID;
				}else{
					rank += arr[i].OV_L2_ID+",";
				}
			}
		}
		if(data[0].TBL_ID == "DT_1KI1515_10"){
			$inMoreDetail.ui.ajax.params["ov_l1_list"] = rank;
		}else{
			$inMoreDetail.ui.ajax.params["ov_l2_list"] = rank;
		}
		$inMoreDetail.ui.ajax.params["rank"] = rank;
		$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				let sumValArr = [];
				maxVal = 0;
				if( res ){
					var l2List = [];
					if(data[0].TBL_ID == "DT_1KI1515_10"){
						l2List = $inMoreDetail.ui.ajax.params.ov_l1_list.split(",");
					}else{
						l2List = $inMoreDetail.ui.ajax.params.ov_l2_list.split(",");
					}
					
					var arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[];
					var d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
					
					var flag = 0;
					for(let j=0;j<l2List.length;j++){
						d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0
						for(let i =0; i<res.length; i++){
							if(data[0].TBL_ID == "DT_1KI1515_10"){
								if(l2List[j] == res[i].OV_L1_ID){
									
									// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L1_KOR);
										flag = 1;
									}
									
									if(data[0].TBL_ID == "DT_1KI1515_10"){
										if(res[i].OV_L3_ID == "E1"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "E2"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "E3"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E4"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E5"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E6"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E7"){
											d4 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E8"){
											d5 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E9"){
											d6 += res[i].DTVAL_CO*1;
										}
									}else{
										if(res[i].OV_L3_ID == "D1"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "D2"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "D3"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D4"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D5"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D6"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D7"){
											d4 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D8"){
											d5 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D9"){
											d6 += res[i].DTVAL_CO*1;
										}
									}
								}
							}else{
								if(l2List[j] == res[i].OV_L2_ID){
									// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L2_KOR);
										flag = 1;
									}
									
									if(data[0].TBL_ID == "DT_1KI1515_10"){
										if(res[i].OV_L3_ID == "E1"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "E2"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "E3"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E4"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E5"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E6"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E7"){
											d4 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E8"){
											d5 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "E9"){
											d6 += res[i].DTVAL_CO*1;
										}
									}else{
										if(res[i].OV_L3_ID == "D1"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "D2"){
											d1 += res[i].DTVAL_CO*1;
										}else if(res[i].OV_L3_ID == "D3"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D4"){
											d2 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D5"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D6"){
											d3 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D7"){
											d4 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D8"){
											d5 += res[i].DTVAL_CO*1; 
										}else if(res[i].OV_L3_ID == "D9"){
											d6 += res[i].DTVAL_CO*1;
										}
									}
								}
							}
						}
						flag = 0;
						
						arr1.push(d1);
						arr2.push(d2);
						arr3.push(d3);
						arr4.push(d4);
						arr5.push(d5);
						arr6.push(d6);
						
						sumValArr.push(Math.round(d1));
						sumValArr.push(Math.round(d2));
						sumValArr.push(Math.round(d3));
						sumValArr.push(Math.round(d4));
						sumValArr.push(Math.round(d5));
						sumValArr.push(Math.round(d6));
					}
					// 차트데이터
					chartData.push(
							{	
								name: '1억 원 미만', 
								data: arr1 , 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '1억~10억 원 미만', 
								data: arr2, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '10억~100억 원 미만', 
								data: arr3, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '100억~200억 원 미만', 
								data: arr4, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '200억~300억 원 미만', 
								data: arr5, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '300억 원 이상', 
								data: arr6, 
								pointWidth: 15 
							}
					);
				}
				
				for(let k=0; k<sumValArr.length; k++) {
					if(maxVal < sumValArr[k]) {
						maxVal = sumValArr[k];
					}
				}
				
				maxVal = maxVal * 1.2;
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
		
	}else if(data[0].TBL_ID == "DT_1KI1516" || data[0].TBL_ID == "DT_1KI2008" || data[0].TBL_ID == "DT_1KI1516_10" ){
		// 순서 지정
		var arr =[];
		var resArr = [];
		
		// 항목 선택 
		if($inMoreDetail.ui.selectedChartOrd == 1){
			charItmId = "T10";
		}else if ($inMoreDetail.ui.selectedChartOrd == 2){
			charItmId = "T20";
		}else if ($inMoreDetail.ui.selectedChartOrd == 3){
			charItmId = "T30";
		}else if ($inMoreDetail.ui.selectedChartOrd == 4){
			charItmId = "T50";
		}
		
		for(let i=0;i<data.length;i++){
			if(data[i].OV_L4_ID=="F0"){
				arr.push(data[i]);
			}
		}
		chartHeight = arr.length * 25;
		// 상위 5개 업종 리스트 추출
		let rank = ""
		for(let i=1;i<6;i++){
			if(data[0].TBL_ID == "DT_1KI1516_10"){
				if(i==5){
					rank += arr[i].OV_L1_ID;
				}else{
					rank += arr[i].OV_L1_ID+",";
				}

			}else{
				if(i==5){
					rank += arr[i].OV_L2_ID;
				}else{
					rank += arr[i].OV_L2_ID+",";
				}
			}
		}
		if(data[0].TBL_ID == "DT_1KI1516_10"){
			$inMoreDetail.ui.ajax.params["ov_l1_list"] = rank;
		}else{
			$inMoreDetail.ui.ajax.params["ov_l2_list"] = rank;
		}
		$inMoreDetail.ui.ajax.params["rank"] = rank;
		$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;
		
		$inMoreDetail.ui.ajax.params.ov_l4_list = "F1,F2,F3";
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					var l2List = [];
					if(data[0].TBL_ID == "DT_1KI1516_10"){
						l2List = $inMoreDetail.ui.ajax.params.ov_l1_list.split(",");
					}else{
						l2List = $inMoreDetail.ui.ajax.params.ov_l2_list.split(",");
					}
					
					var arr1=[],arr2=[],arr3=[];
					var a1=0,a2=0,a3=0;
					
					var flag = 0;
					for(let j=0;j<l2List.length;j++){
						a1=0,a2=0,a3=0,a4=0;
						for(let i =0; i<res.length; i++){
							if(data[0].TBL_ID == "DT_1KI1516_10"){
							// 같은 업종인지 체크, 전국데이터인지 체크
								if(l2List[j] == res[i].OV_L1_ID){
									
									// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L1_KOR);
										flag = 1;
									}
									
									if(res[i].OV_L4_ID == "F1"){
										a1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L4_ID == "F2"){
										a2 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L4_ID == "F3"){
										a3 += res[i].DTVAL_CO*1;
									}
								}
							}else{
								if(l2List[j] == res[i].OV_L2_ID){
								// 카테고리 
									if(flag == 0){
										categories.push(res[i].OV_L2_KOR);
										flag = 1;
									}
									
									if(res[i].OV_L4_ID == "F1"){
										a1 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L4_ID == "F2"){
										a2 += res[i].DTVAL_CO*1;
									}else if(res[i].OV_L4_ID == "F3"){
										a3 += res[i].DTVAL_CO*1;
									}
								}
							}
						}
						flag = 0;
						
						arr1.push(a1);
						arr2.push(a2);
						arr3.push(a3);
						
					}
					// 차트데이터
					chartData.push(
							{	
								name: '단독사업체', 
								data: arr1 , 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '본사,본점등', 
								data: arr2, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '공장,지사(점),영업소등', 
								data: arr3, 
								pointWidth: 15 
							}
					);
				
					maxVal = Math.round(arr1[0])*1.2;
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	}else if (data[0].TBL_ID == "DT_1KI2009"){
		// 순서 지정
		var arr =[];
		var resArr = [];
		
		// 항목 선택 
		if($inMoreDetail.ui.selectedChartOrd == 1){
			charItmId = "T10";
		}else if ($inMoreDetail.ui.selectedChartOrd == 2){
			charItmId = "T20";
		}else if ($inMoreDetail.ui.selectedChartOrd == 3){
			charItmId = "T30";
		}else if ($inMoreDetail.ui.selectedChartOrd == 4){
			charItmId = "T50";
		}
		
		for(let i=0;i<data.length;i++){
			if(data[i].OV_L3_ID=="F0"){
				arr.push(data[i]);
			}
		}
		chartHeight = arr.length * 150;
		// 상위 5개 업종 리스트 추출
		let rank = ""
		for(let i=1;i<arr.length;i++){
			if(i==5) break;
			if(i==arr.length-1){
				rank += arr[i].OV_L2_ID;
			}else{
				rank += arr[i].OV_L2_ID+",";
			}
		}
		
		$inMoreDetail.ui.ajax.params["ov_l2_list"] = rank;
		$inMoreDetail.ui.ajax.params["rank"] = rank;
		$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;
		
		$.ajax({
			type:"get",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					var l2List = [];
					l2List = $inMoreDetail.ui.ajax.params.ov_l2_list.split(",");
					
					var arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[],arr7=[],arr8=[];
					let f1 = 0, f2 = 0, f3 = 0,f4 = 0, f5 = 0, f6 = 0,f7 = 0, f8 = 0;
					
					var flag = 0;
					for(let j=0;j<l2List.length;j++){
						f1 = 0, f2 = 0, f3 = 0,f4 = 0, f5 = 0, f6 = 0,f7 = 0, f8 = 0;
						for(let i =0; i<res.length; i++){
							// 같은 업종인지 체크, 전국데이터인지 체크
							if(l2List[j] == res[i].OV_L2_ID){
								
								// 카테고리 
								if(flag == 0){
									categories.push(res[i].OV_L2_KOR);
									flag = 1;
								}
								
								if(res[i].OV_L3_ID == 'F1'){
									f1 += res[i].DTVAL_CO*1;
								}else if(res[i].OV_L3_ID == 'F2'){
									f2 += res[i].DTVAL_CO*1;
								}else if(res[i].OV_L3_ID == 'F3'){
									f3 += res[i].DTVAL_CO*1;
								}else if(res[i].OV_L3_ID == 'F4'){
									f4 += res[i].DTVAL_CO*1;
								}else if(res[i].OV_L3_ID == 'F5'){
									f5 += res[i].DTVAL_CO*1;
								}else if(res[i].OV_L3_ID == 'F6'){
									f6 += res[i].DTVAL_CO*1;
								}else if(res[i].OV_L3_ID == 'F7'){
									f7 += res[i].DTVAL_CO*1;
								}else if(res[i].OV_L3_ID == 'F8'){
									f8 += res[i].DTVAL_CO*1;
								}
							}
						}
						flag = 0;
						
						arr1.push(f1);
						arr2.push(f2);
						arr3.push(f3);
						arr4.push(f4);
						arr5.push(f5);
						arr6.push(f6);
						arr7.push(f7);
						arr8.push(f8);
						
					}
					// 차트데이터
					chartData.push(
							{	
								name: '10㎡ 미만', 
								data: arr1 , 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '10~30', 
								data: arr2, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '30~50', 
								data: arr3, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '50~100', 
								data: arr4, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '100~300', 
								data: arr5, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '300~1000', 
								data: arr6, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '1000~3000', 
								data: arr7, 
								pointWidth: 15 
							}
					);
					chartData.push(
							{	
								name: '3000㎡ 이상', 
								data: arr8, 
								pointWidth: 15 
							}
					);
				
					maxVal = Math.round(res[1].DTVAL_CO)*1.2;
				}
			},
			error:function(data) {
				$(".DataNone").show();
				alert('오류발생~!');
			}
		});
	}else{
		legendChk = false;
		
		for(var i=Object.keys(stacked).length-1; i>=0; i--) {
			let stack = stacked[Object.keys(stacked)[i]];		
			let stackData = [];
			for(var j=0; j<stack.length; j++) {
				if($inMoreDetail.ui.dispOptions[chartOrd][0].regionVarOrd == 1){
					if(stack[j].CHAR_ITM_ID != "13999001" && stack[j]["OV_L1_ID"] != "00") {
						let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
						if(chartOpt[0].dispVarOrd == 0) {
							stackData.push({
								y: parseInt(dtval/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit)),
								id: stack[j]["CHAR_ITM_ID"],
								name: stack[j]["CHAR_ITM_NM"]
							});
						} else {
							stackData.push({
								y: parseInt(dtval/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit)),
								id: stack[j]["OV_" + chartOpt[0].dispVarOrd + "_ID"],
								name: stack[j]["OV_" + chartOpt[0].dispVarOrd + "_KOR"]
							});
						}
					}
				}else{
					if(stack[j].CHAR_ITM_ID != "13999001" && stack[j]["OV_L2_ID"] != "00") {
						let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
						stackData.push(parseInt(dtval/(chartOpt[0].dispUnit/chartOpt[0].kosisUnit)));
					}
				}
			}
			chartData.push(
					{
						name: stacked[Object.keys(stacked)[i]][0].CHAR_ITM_NM
						,data: stackData
						,pointWidth: 15 
			});
		}
		
		for(var i=0; i<stacked[Object.keys(stacked)[0]].length; i++) {
			let stack = stacked[Object.keys(stacked)[0]][i];
			if($inMoreDetail.ui.dispOptions[chartOrd][0].regionVarOrd == 1){
				if(stack["OV_L1_ID"] != "00") {
					categories.push(stack[admKor]);
				}	
			}else{
				if(stack["OV_L2_ID"] != "00") {
					categories.push(stack[admKor]);
				}
			}
		}
		
	}
	
	var tool = $("#industryOfAreaChart").parent().parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	
	var chartKind ='';
	if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10" ){
		chartKind = 'column';
		colorKind = ["#f08246"]
	}else{
		chartKind = 'bar';
		colorKind = ["#5B9BD5","#ED7D31","#92D050","#FFC000","#9966FF"];
	}
	
	if(	  data[0].TBL_ID == "DT_1KI1509" 		|| data[0].TBL_ID == "DT_1KI1510" 		|| data[0].TBL_ID == "DT_1KI1511" 
		||data[0].TBL_ID == "DT_1KI1509_10" 	|| data[0].TBL_ID == "DT_1KI1510_10" 	|| data[0].TBL_ID == "DT_1KI1511_10" 
		||data[0].TBL_ID == "DT_1KI2001" 		|| data[0].TBL_ID == "DT_1KI2002" 		|| data[0].TBL_ID == "DT_1KI2003" 
	){
		chartHeight = data.length * 30;
	}
	
	$inMoreDetail.chart3 = $('#industryOfAreaChart').highcharts({
		chart: {
	        type: chartKind,
	        height: chartHeight,
	        width: 600,
	        events: {
	        	load: function() {
	        		if(this.series[0].chart.renderTo.id = "industryOfAreaChart") {
	        			if($inMoreDetail.selectedCategory != "") {
		        			$("#industryOfAreaChart").highcharts().series[0].data.forEach(function(selector) {
								if(selector.category == $inMoreDetail.selectedCategory) {
									selector.select(true);
									$inMoreDetailMap.ui.selectedObj = $(selector); 
								}
							});
						}
	        		}
	        	}
	        }
	    },
		credits: {
	        enabled: false
	    },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		//colors: $ecnmyDash.chartsOption.color,
		legend: {
			enabled: legendChk,
		    itemMarginTop: 10,
		    verticalAlign: 'top',
		    itemMarginBottom: 10,
		    labelFormatter: function() {
             	return '<b>' + this.name + '</b>&nbsp;<b>';
            },
	    },			
	    colors: colorKind,
		title: {
			text: "",
			style: { "display": "none" }
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true,
					style: {
						fontWeight: '100',
						color: "#000000",
						textOutline: false,
					},
					overflow: "allow",
					allowOverlap: true,
					formatter: function() {
						return numberFormat(this.y);
					}
				},
				pointInterval: 1,
				borderWidth: 0,
				pointWidth: 16,
				groupPadding: 0.1
			},
			column: {
				dataLabels: {
					enabled: true,
					style: {
						fontWeight: '100',
						color: "#000000",
						textOutline: false
					},
					overflow: "allow",
					allowOverlap: true,
					formatter: function() {
						return numberFormat(this.y);
					}
				},
				colorByPoint: true,
				pointInterval: 1,
				borderWidth: 0,
				pointWidth: 16,
				groupPadding: 0.1
			},
			series: {
				cursor: 'pointer',
				borderWidth: 0,
				minPointLength: 5,
				grouping: true,
				point: {
					events: {
						click: function() {
							$totSurvMain.ui.chartTarget = "industryOfAreaChart";
							$inMoreDetail.selectedCategory = this.category;
							
					    	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
					    	let charItmId = $inMoreDetail.ui.selectedCharItmId;
					    	let thisData = stacked[charItmId][this.x+1]; // 최상위에 전산업이 있기 때문에 +1 해줌
					    	
					    	let itmColumn = "";
					    	
					    	// 3번쨰테이블 한항목에 여러개 들어가는 항목들 때문에 해야 하는 과정
					    	let itmId = "";
					    	for(let i =0 ; i<$inMoreDetail.ui.dispOptions[chartOrd].length; i++){
					    		if($inMoreDetail.ui.dispOptions[chartOrd][i].scrKor == this.series.name){
					    			itmId = $inMoreDetail.ui.dispOptions[chartOrd][i].itmId;
					    		}
					    	}
					    	
					    	let tmsYear = $("#tmsYears option:selected").val();
					    	let sbxKsic = $("#sbx_ksic option:selected").text();
					    	let charItmTxt = $("#chrItmList option:selected").text();
					    	
					    	let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
					    	$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;	
					    	if(tblist == "DT_1KI1509" || tblist == "DT_1KI1510" || tblist == "DT_1KI1511"
					    		|| tblist == "DT_1KI1509_10" || tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"
					    			|| tblist == "DT_1KI2001" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003"){
					    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_ID";
					    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
					    	}else{
					    		if (tblist == "DT_1KI1514" || tblist == "DT_1KI2006" || tblist == "DT_1KI1514_10"){
						    		thisData = stacked[charItmId][0];
						    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_ID";
						    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
						    	}else if(tblist == "DT_1KI1513" || tblist == "DT_1KI2005" || tblist == "DT_1KI1513_10"
						    		|| tblist == "DT_1KI1515" || tblist == "DT_1KI2007" || tblist == "DT_1KI1515_10"){
						    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_ID";
						    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
						    	}else{
						    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_ID";
						    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_list"] = itmId;	// 분류코드							
						    	}
					    	}
					    	$totSurvMain.ui.chartTitle = tmsYear+"년 " + sbxKsic + " " + charItmTxt;
					    	$inMoreDetail.ui.chartItmClick($(this), "#f08246", tmsYear+"년 " 
								+ this.category + " " + $("#chrItmList option:selected").text() + " " + this.series.name);
						},
						mouseOver: function() {
					        //tool.css("display", "inline-block");
							tool.css("display", "none");
					        //var irdsrate = parseFloat(d.data.irdsrate);
	
					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
							var key = "";
							
							for(var i=0; i<data.length; i++) {
								if(this.series.name == data[i].CHAR_ITM_NM) {
									key = data[i].CHAR_ITM_ID;
								}
							}
					        if(totSurvWonObj != 0 && totSurvWonObj !=""){
					        	ratio = (parseInt(this.series.data[this.x].y) / totSurvWonObj[key] * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					        var unit = chartOpt[0].kosisUnitNm;
					        
					        $(document).on("mousemove", function(evt) {
					        	let target = document.getElementById("industryOfAreaChart");
						        let clientRect = target.getBoundingClientRect();
						        let rTop = clientRect.top;
						        let rLeft = clientRect.left;
						        let sTopLength = window.pageYOffset;
						        let sLeftLength = window.pageXOffset;
								tool.css("left", evt.clientX - (rLeft + sLeftLength) - (parseInt(tool.css("width"))/2));
								let ttTop = evt.clientY + $(target).parent().parent().parent().parent().scrollTop()-100;
								
						        tool.css("top", ttTop);								        
							});
					        
					        if(data[0].TBL_ID == "DT_1KI1512" || data[0].TBL_ID == "DT_1KI2004" || data[0].TBL_ID == "DT_1KI1512_10" 
					        	|| data[0].TBL_ID == "DT_1KI1513" || data[0].TBL_ID == "DT_1KI2005" || data[0].TBL_ID == "DT_1KI1513_10" 
					        	|| data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10" 
						        || data[0].TBL_ID == "DT_1KI1515" || data[0].TBL_ID == "DT_1KI2007" || data[0].TBL_ID == "DT_1KI1515_10" 
							    || data[0].TBL_ID == "DT_1KI1516" || data[0].TBL_ID == "DT_1KI2008" || data[0].TBL_ID == "DT_1KI1516_10" || data[0].TBL_ID == "DT_1KI2009" 
					        	){
					        	ratio = 0, vTot = 0;
								
								for(var i=0; i<this.series.data.length; i++) {
									vTot += this.series.data[i].y;
								}
								
								ratio = (parseInt(this.series.data[this.x].y) / vTot * 100).toFixed(2);
						        
								unit = chartOpt[0].kosisUnitNm;
								
						        $(document).on("mousemove", function(evt) {
						        	let target = document.getElementById("industryOfAreaChart");
							        let clientRect = target.getBoundingClientRect();
							        let rTop = clientRect.top;
							        let rLeft = clientRect.left;
							        let sTopLength = window.pageYOffset;
							        let sLeftLength = window.pageXOffset;
							        
									tool.css("left", evt.clientX - (rLeft + sLeftLength) - (parseInt(tool.css("width"))/2));
									let ttTop = evt.clientY + $(target).parent().parent().parent().parent().scrollTop() + 320;
									//let ttTop = evt.clientY - (rTop + sTopLength) - 245;
									
							        tool.css("top", ttTop);
								});
						        
						        dtval = this.series.data[this.x].y != undefined ? parseInt(this.series.data[this.x].y) : 0;
						        var moveName = this.series.name;
						        if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10"){
						        	moveName = this.series.data[this.x].category
						        }
						        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
						        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + $("#tmsYears option:selected").val() + "년 " + " " + $("#chrItmList option:selected").text() + "</p>" +
									"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
									moveName + "</p>" +
									"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
									numberFormat(dtval) + " " + unit + "</p><br>" + 
									"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
									numberFormat(ratio) + "</p>" + "%"); 
						        
					        }else{
					        	
					        	$(document).on("mousemove", function(evt) {
						        	let target = document.getElementById("industryOfAreaChart");
							        let clientRect = target.getBoundingClientRect();
							        let rTop = clientRect.top;
							        let rLeft = clientRect.left;
							        let sTopLength = window.pageYOffset;
							        let sLeftLength = window.pageXOffset;
							        
									tool.css("left", evt.clientX - (rLeft + sLeftLength) - (parseInt(tool.css("width"))/2));
									//let ttTop = evt.clientY + $(target).parent().parent().parent().parent().scrollTop() - 245;
									let ttTop = evt.clientY + $(target).parent().parent().parent().parent().scrollTop() +200 ;
									
									let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
									
							        tool.css("top", ttTop);
								});
					        	
					        	//2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        	tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + stacked[key][this.x].PRD_DE + "년 " + 
					        			$("#chrItmList option:selected").text() + "(" + this.series.name + "성)</p>" +
					        			"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
					        			stacked[key][this.x][admKor] + "</p>" +
					        			"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
					        			numberFormat(stacked[key][this.x+1].DTVAL_CO) + " " + unit + "</p><br>" + 
					        			"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
					        			numberFormat(ratio) + "</p>" + "%"); 
					        }
						},
						mouseOut: function() {
							$(document).off("mousemove");							
							tool.css("display", "none");
						}
					}
				}
			}
		},
		tooltip: {
	    	formatter: function () {
	    		var key = "";
				for(var i=0; i<data.length; i++) {
					if(this.series.name == data[i].CHAR_ITM_NM) {
						key = data[i].CHAR_ITM_ID;
					}
				}
				let vTot = 0;
				for(var i=0; i<this.series.data.length; i++) {
					vTot += this.series.data[i].y;
				}
	    		for(let i=0; i< this.series.data.length;i++){
	    			if(this.series.data[i].category == this.x){
			    		let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
			    		let ratio = (parseInt(this.series.data[i].y) / vTot * 100).toFixed(2);
			    		let dtval = this.series.data[i].y != undefined ? parseInt(this.series.data[i].y) : 0;
						let unit = chartOpt[0].kosisUnitNm;
						
						var moveName = this.series.name;
				        if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10"){
				        	moveName = this.series.data[i].category;
				        }
	    		
			    		if(	tblist == "DT_1KI1509" 		|| tblist == "DT_1KI1510" 		|| tblist == "DT_1KI1511"
				    	 || tblist == "DT_1KI1509_10" 	|| tblist == "DT_1KI1510_10" 	|| tblist == "DT_1KI1511_10"
				    	 || tblist == "DT_1KI2001" 		|| tblist == "DT_1KI2002" 		|| tblist == "DT_1KI2003"){
			    			if(flag==1){
			    				return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" + $("#tmsYears option:selected").val() + "년 " + 
			        			$("#chrItmList option:selected").text() + "(" + this.series.name + "성)</p>" +
			        			"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
			        			stacked[key][i+1].OV_L1_KOR + "</p></div>" +
			        			"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			        			numberFormat(stacked[key][i+1].DTVAL_CO) + " " + unit + "</p></div>" + 
			        			"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			        			numberFormat(ratio) + "</p>" + "%" +"</div>";
			    			}else{
			    				return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" + $("#tmsYears option:selected").val() + "년 " + 
			        			$("#chrItmList option:selected").text() + "(" + this.series.name + "성)</p>" +
			        			"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
			        			stacked[key][i].OV_L1_KOR + "</p></div>" +
			        			"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			        			numberFormat(stacked[key][i].DTVAL_CO) + " " + unit + "</p></div>" + 
			        			"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			        			numberFormat(ratio) + "</p>" + "%" +"</div>";
			    			}
			    		}else{
			    			return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" + $("#tmsYears option:selected").val() + "년 " + " " + $("#chrItmList option:selected").text() + "</p>" +
							"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
							moveName + "</p></div>" +
							"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
							numberFormat(dtval) + " " + unit + "</p></div>" + 
							"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
							numberFormat(ratio) + "</p>" + "%" + "</div>";
			    		}
	    			}
	    		}
			},
			useHTML: true,
			shared: false,
		    shadow: false,
		    enabled: true,
		},
		xAxis: {
	        categories: categories,
			lineColor: "transparent",
			tickLength: 0,
			labels: {				
				formatter: function() {
					return this.value;
				}
			}
	    },
		yAxis: {
			max: maxVal,
			min: 0,
	        title: {
				text: null
			},
			labels: {
				formatter: function() {
					return this.value;
				}
			},
			lineWidth: 1,
			stackLabels: {
	            enabled: true,
	            style: {
	                fontWeight: '100',
	                color: "#000000",
					fontFamily: 'NanumSquare',
					textOutline: false
	            },
				formatter: function() {
					return numberFormat(this.total);
				}
	        }
	    },
		series: chartData
	});
	
	// 종사상지위별 총괄은 차트가 2개
	if(data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10" ){
		$('#industryOfAreaChart2').show();
		$inMoreDetail.chart3_1 = $('#industryOfAreaChart2').highcharts({
			chart: {
		        type: chartKind,
		        height: chartHeight,
		        width: 600,
		        events: {
		        	load: function() {
		        		if(this.series[0].chart.renderTo.id = "industryOfAreaChart2") {
		        			if($inMoreDetail.selectedCategory != "") {
			        			$("#industryOfAreaChart2").highcharts().series[0].data.forEach(function(selector) {
									if(selector.category == $inMoreDetail.selectedCategory) {
										selector.select(true);
										$inMoreDetailMap.ui.selectedObj = $(selector); 
									}
								});
							}
		        		}
		        	}
		        }
		    },
			credits: {
		        enabled: false
		    },
			navigation: {
		        buttonOptions: {
		            enabled: false
		        }
		    },
			//colors: $ecnmyDash.chartsOption.color,
			legend: {
				enabled: true,
				verticalAlign: 'top',
			    itemMarginTop: 10,
			    itemMarginBottom: 10,
			    labelFormatter: function() {
	             	return '<b>' + '사업체수' + '</b>&nbsp;<b>';
	            },			
		    },
		    colors: ["#009589"],
			title: {
				text: "",
				style: { "display": "none" }
			},
			plotOptions: {
				column: {
		            dataLabels: {
		                enabled: false,
		                style: {
		                    fontWeight: '100',
		                    color: "#000000",
							textOutline: false
		                },
		                overflow: "allow",
		                allowOverlap: true,
		                formatter: function() {
							return numberFormat(this.y);
						}
		            },
		            pointInterval: 1,
					borderWidth: 0,
					pointWidth: 16,
					groupPadding: 0.1
		        },
				series: {
					cursor: 'pointer',
					borderWidth: 0,
					stacking: 'normal',
					point: {
						events: {
							click: function() {
								$totSurvMain.ui.chartTarget = "industryOfAreaChart2";
								$inMoreDetail.selectedCategory = this.category;
								
								let chartOrd = $inMoreDetail.ui.selectedChartOrd;
						    	let charItmId = $inMoreDetail.ui.selectedCharItmId;
						    	let thisData = stacked[charItmId][this.x+1]; // 최상위에 전산업이 있기 때문에 +1 해줌
						    	
						    	let itmColumn = "";
						    	
						    	// 3번째 차트 한항목에 여러개 들어가는 항목들 때문에 해야 하는 과정
						    	let itmId = "";
						    	for(let i =0 ; i<$inMoreDetail.ui.dispOptions[chartOrd].length; i++){
						    		if($inMoreDetail.ui.dispOptions[chartOrd][i].scrKor == this.series.name){
						    			itmId = $inMoreDetail.ui.dispOptions[chartOrd][i].itmId;
						    		}
						    	}
						    	
						    	let tmsYear = $("#tmsYears option:selected").val();
						    	let sbxKsic = $("#sbx_ksic option:selected").text();
						    	let charItmTxt = $("#chrItmList option:selected").text();
						    	
						    	let tblist = $inMoreDetail.ui.ajax.params.tbl_id_list;
						    	$inMoreDetail.ui.ajax.params["char_itm_id_list"] = charItmId;	
						    	if(tblist == "DT_1KI1509" || tblist == "DT_1KI1510" || tblist == "DT_1KI1511"
						    		|| tblist == "DT_1KI1509_10" || tblist == "DT_1KI1510_10" || tblist == "DT_1KI1511_10"
						    			|| tblist == "DT_1KI2001" || tblist == "DT_1KI2002" || tblist == "DT_1KI2003"){
						    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_ID";
						    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
						    	}else{
						    		if (tblist == "DT_1KI1514" || tblist == "DT_1KI2006" || tblist == "DT_1KI1514_10"){
							    		thisData = stacked[charItmId][0];
							    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_ID";
							    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][0].varOrd + "_list"] = thisData[itmColumn];	// 분류코드							
							    	}else{
							    		itmColumn = "OV_L" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_ID";
							    		$inMoreDetail.ui.ajax.params["ov_l" + $inMoreDetail.ui.dispOptions[chartOrd][this.x+1].varOrd + "_list"] = itmId;	// 분류코드							
							    	}
						    	}
						    	$totSurvMain.ui.chartTitle = tmsYear+"년 " + sbxKsic + " " + charItmTxt;
						    	$inMoreDetail.ui.chartItmClick($(this), "#f08246", tmsYear+"년 " 
									+ this.category + " " + $("#chrItmList option:selected").text());
							},
							mouseOver: function() {
						        //tool.css("display", "inline-block");
						        tool.css("display", "none");
						        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
						        var ratio = 0;
								var key = "";
								
								for(var i=0; i<data.length; i++) {
									if(this.series.name == data[i].CHAR_ITM_NM) {
										key = data[i].CHAR_ITM_ID;
									}
								}
						        if(totSurvWonObj != 0 && totSurvWonObj !=""){
						        	ratio = (parseInt(this.series.data[this.x].y) / totSurvWonObj[key] * 100).toFixed(2)
						        } else {
						        	ratio = 100;
						        }
						        
						        var unit = chartOpt[0].kosisUnitNm;
						        
						        $(document).on("mousemove", function(evt) {
						        	let target = document.getElementById("industryOfAreaChart2");
							        let clientRect = target.getBoundingClientRect();
							        let rTop = clientRect.top;
							        let rLeft = clientRect.left;
							        let sTopLength = window.pageYOffset;
							        let sLeftLength = window.pageXOffset;
									tool.css("left", evt.clientX - (rLeft + sLeftLength) - (parseInt(tool.css("width"))/2));
									let ttTop = evt.clientY + $(target).parent().parent().parent().parent().scrollTop() - 325;
							        tool.css("top", ttTop);		
								});
						        
						        if(data[0].TBL_ID == "DT_1KI1512" || data[0].TBL_ID == "DT_1KI2004" || data[0].TBL_ID == "DT_1KI1512_10" 
						        	|| data[0].TBL_ID == "DT_1KI1513" || data[0].TBL_ID == "DT_1KI2005" || data[0].TBL_ID == "DT_1KI1513_10" 
						        	|| data[0].TBL_ID == "DT_1KI1514" || data[0].TBL_ID == "DT_1KI2006" || data[0].TBL_ID == "DT_1KI1514_10" 
							        || data[0].TBL_ID == "DT_1KI1515" || data[0].TBL_ID == "DT_1KI2007" || data[0].TBL_ID == "DT_1KI1515_10" 
								    || data[0].TBL_ID == "DT_1KI1516" || data[0].TBL_ID == "DT_1KI2008" || data[0].TBL_ID == "DT_1KI1516_10" 
						        	){
						        	ratio = 0, vTot = 0;
									
									for(var i=0; i<this.series.data.length; i++) {
										vTot += this.series.data[i].y;
									}
									
									ratio = (parseInt(this.series.data[this.x].y) / vTot * 100).toFixed(2);
							        
									unit = chartOpt[0].kosisUnitNm;
									
							        $(document).on("mousemove", function(evt) {
							        	let target = document.getElementById("industryOfAreaChart2");
								        let clientRect = target.getBoundingClientRect();
								        let rTop = clientRect.top;
								        let rLeft = clientRect.left;
								        let sTopLength = window.pageYOffset;
								        let sLeftLength = window.pageXOffset;
								        
										tool.css("left", evt.clientX - (rLeft + sLeftLength) - (parseInt(tool.css("width"))/2));
										let ttTop = evt.clientY + $(target).parent().parent().parent().parent().scrollTop() - 245;
								        tool.css("top", ttTop);
								        
								        
									});
							        
							        dtval = this.series.data[this.x].y != undefined ? parseInt(this.series.data[this.x].y) : 0;
							        
							        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정  
							        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + $("#tmsYears option:selected").val() + "년 " + " " + '사업체수' + "</p>" +
										"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
										this.series.data[this.x].category + "</p>" +
										"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
										numberFormat(dtval) + " " + unit + "</p><br>" + 
										"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
										numberFormat(ratio) + "</p>" + "%"); 
						        }else{
						        	
						        	//2020.10.13[신예리] 타일맵 툴팁 스타일 수정
						        	tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + $("#tmsYears option:selected").val() + "년 " + 
						        			$("#chrItmList option:selected").text() + "(" + this.series.name + "성)</p>" +
						        			"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" +
						        			stacked[key][this.x][admKor] + "</p>" +
						        			"<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
						        			numberFormat(stacked[key][this.x].DTVAL_CO) + " " + unit + "</p><br>" + 
						        			"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;font-weight: 100'>" + 
						        			numberFormat(ratio) + "</p>" + "%"); 
						        }
							},
							mouseOut: function() {
								$(document).off("mousemove");							
								tool.css("display", "none");
							}
						}
					}
				}
			},
			tooltip: {
		    	formatter: function () {
		    		let vTot = 0;
					for(var i=0; i<this.series.data.length; i++) {
						vTot += this.series.data[i].y;
					}
		    		for(let i=0; i< this.series.data.length;i++){
		    			if(this.series.data[i].category == this.x){
		    				let unit = chartOpt[0].kosisUnitNm;
			    			let dtval = this.series.data[i].y != undefined ? parseInt(this.series.data[i].y) : 0;
			    			let ratio = (parseInt(this.series.data[i].y) / vTot * 100).toFixed(2);
			    			
			    			var tblIdList = $inMoreDetail.ui.ajax.params["tbl_id_list"];
			    			if(tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514_10"){
			    				
			    				let tb1514 = $inMoreDetail.ui.selectedCharItmId.split(",");
			    				
			    				return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" + $("#tmsYears option:selected").val() + "년 " + " " + '사업체수' + "</p>" +
			    				"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
			    				this.series.data[i].category + "</p></div>" +
			    				"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			    				numberFormat(dtval) + " " + unit + "</p></div>" + 
			    				"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			    				numberFormat(ratio) + "</p>" + "%" +"</div>";
			    			}else{
			    				return "<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;margin-left: 16px;font-weight: 100'>" + $("#tmsYears option:selected").val() + "년 " + " " + '사업체수' + "</p>" +
			    				"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;margin-left: 16px;'>" +
			    				this.series.data[i].category + "</p></div>" +
			    				"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin-top: 5px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			    				numberFormat(dtval) + " " + unit + "</p></div>" + 
			    				"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin-top: 3px; padding-right: 3px; margin-left: 20px;;white-space:nowrap;'>" + 
			    				numberFormat(ratio) + "</p>" + "%" +"</div>";
			    			}
			    			
		    			}
		    		}
				},
				useHTML: true,
				shared: false,
			    shadow: false,
			    enabled: true,
			},
			xAxis: {
		        categories: categories2,
				lineColor: "transparent",
				tickLength: 0,
				labels: {				
					formatter: function() {
						return this.value;
					}
				}
		    },
			yAxis: {
				max: maxVal2,
				min: 0,
		        title: {
					text: null
				},
				labels: {
					formatter: function() {
						return this.value;
					}
				},
				lineWidth: 1,
				stackLabels: {
		            enabled: true,
		            style: {
		                fontWeight: '100',
		                color: "#000000",
						fontFamily: 'NanumSquare',
						textOutline: false
		            },
					formatter: function() {
						return numberFormat(this.total);
					}
		        }
		    },
			series: chartData2
		});
	}
	// 생략 무시
	var ellipsisLegend = $("#industryOfAreaChart g.highcharts-axis-labels title");
	for(var i=0; i<ellipsisLegend.length; i++) {
		if(ellipsisLegend[i]) {
			var str = $(ellipsisLegend[i]).text()
				+ "<tspan class='highcharts-br' dy='15' x='21'>&ZeroWidthSpace;</tspan>";
			$(ellipsisLegend[i]).parent().empty().append(str);
		}
	}

	$("#industryOfAreaChart g.highcharts-axis-labels.highcharts-xaxis-labels text").css("font-size", "11px");
	
	$("#industryOfAreaChart").parent().parent().show();
	
	
	let tbList = $inMoreDetail.ui.ajax.params.tbl_id_list;
	if(	  tbList == "DT_1KI1509" 		|| tbList == "DT_1KI1510" 		|| tbList == "DT_1KI1511" 
		||tbList == "DT_1KI1509_10" 	|| tbList == "DT_1KI1510_10" 	|| tbList == "DT_1KI1511_10" 
		||tbList == "DT_1KI2001" 		|| tbList == "DT_1KI2002" 		|| tbList == "DT_1KI2003" 
	){
		// 123 항목 데이터 순위 5개 색 다르게 해주기
		let stackRank = _.cloneDeep(stacked[Object.keys(stacked)]);
		stackRank.sort(function(a,b){
			return b.DTVAL_CO - a.DTVAL_CO; 
		});
		
		if($inMoreDetail.ui.dispOptions[chartOrd][0].regionVarOrd == 1){
			if(stackRank[0].OV_L1_KOR == "전국"){
				stackRank.splice(0,1);
			}
		}else{
			if(stackRank[0].OV_L2_KOR == "전국"){
				stackRank.splice(0,1);
			}
		}
		
		var lengthRank = stackRank.length > 5 ? 5 : stackRank.length;
		
		for(let i =0; i<$('#industryOfAreaChart').highcharts().series[0].data.length;i++){
			// 상위 5개
			for(let j=0;j<lengthRank;j++){
				if($('#industryOfAreaChart').highcharts().series[0].data[i].category == stackRank[j].OV_L1_KOR
						||$('#industryOfAreaChart').highcharts().series[0].data[i].category == stackRank[j].OV_L2_KOR){
					$('#industryOfAreaChart').highcharts().series[0].data[i].update({ color : "#FFE08C"});
				}
			}
		}
	}
      
}

var industryOfAreaChart3_1 = function(data) {
	var chartData = [], categories = [], stacked = {}, itmLv, totSurvWonObj = {}
	, chartOrd = $inMoreDetail.ui.selectedChartOrd;
	let chartOpt = $inMoreDetail.ui.dispOptions[chartOrd];
	
	let itemId = "OV_L"+chartOpt[0].varOrd+"_ID"
	, itemSn = "OV_L"+chartOpt[0].varOrd+"_SN"
	, itemKor = "OV_L"+chartOpt[0].varOrd+"_KOR"
	
	let chartHeight = $inMoreDetail.ui.dispOptions[chartOrd][0].dispCo * 40;
	let maxVal = 0, sumVal = [];	
	let resArrCnt = [];
	
	let unitNm = $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm;
	var categoriesArr = [];
	var total3_1  = 0;
	var maxValArr = [];
	var maxxAxis  = 4;
	
	var optChartOrd = $inMoreDetail.ui.dispOptions[chartOrd];
	
	data.sort(function(a, b) { return a.ITM_RCGN_SN - b.ITM_RCGN_SN });
	data.sort(function(a, b) { return a.OV_L1_SN - b.OV_L1_SN });
	
	for(var i=0; i<data.length; i++) {
		var area_length = data[i].OV_L1_ID.length;
		var areaCompareVal = "";
		
		if(area_length==2){
			areaCompareVal = data[i].OV_L1_ID.substr(0,1);
			if(areaCompareVal.match("0")){
				
			}else{
				if(data[i].DTVAL_CO != undefined){
					chartData.push([data[i].OV_L1_KOR, Number(data[i].DTVAL_CO), data[i].OV_L1_ID]);
					maxValArr.push([Number(data[i].DTVAL_CO)]);
					total3_1 += Number(data[i].DTVAL_CO);
				}
			}
		}else if(area_length==5){
			areaCompareVal = data[i].OV_L1_ID.substr(2,2);
			if(areaCompareVal.match("00")){
				
			}else{
				if(data[i].DTVAL_CO != undefined){
					chartData.push([data[i].OV_L1_KOR, Number(data[i].DTVAL_CO), data[i].OV_L1_ID]);
					maxValArr.push([Number(data[i].DTVAL_CO)]);
					total3_1 += Number(data[i].DTVAL_CO);
				}
			}
		}else if(area_length==7){
			if(data[i].DTVAL_CO != undefined){
				chartData.push([data[i].OV_L1_KOR, Number(data[i].DTVAL_CO), data[i].OV_L1_ID]);
				maxValArr.push([Number(data[i].DTVAL_CO)]);
				total3_1 += Number(data[i].DTVAL_CO);
			}
		}
	}
	
	chartData.sort(function (a, b) { 
		return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;  
	});
	
	maxVal = Math.max.apply(null, maxValArr);
	
	if(chartData.length<5) maxxAxis = chartData.length-1;
	
	Highcharts.setOptions({
	    lang: {
	        thousandsSep: ','
	    }
	});
	
	$inMoreDetail.chart3 = Highcharts.chart('industryOfAreaChart', {

	    chart: {
	        type: 'column',
//        	scrollablePlotArea: {
//                minHeight: data.length * 50,
//                scrollPositionY: 0
//            }
	    },

	    credits: {
	        enabled: false
	    },
	    
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    
	    legend: {
	        enabled: false
	    },
	    
	    title: {
	        text: null
	    },

	    xAxis: {
	        type: 'category',
	        min: 0,
	        max: maxxAxis,
	        scrollbar: {
	            enabled: true
	        }
	    },
	    
	    yAxis: {
	    	min: 0,
	        max: maxVal,
	    	allowDecimals: false,
	        title: {
	            text: null
	        },
	        plotLines : [ {
				color : "#FF0000",
				width : 2,
				value : (function () {
					var avg = total3_1 / chartData.length;
					return avg;
				})(),
				zIndex : 5,
				dashStyle : 'Dash',
				events: {
					mouseover: function(e) {
						var series = this.axis.series[0],
						chart = series.chart,
							PointClass = series.pointClass,
							tooltip = chart.tooltip,
							point = (new PointClass()).init(
									series, ["평균", this.options.value.toFixed(2)]
							),
							normalizedEvent = chart.pointer.normalize(e);
			              
						point.tooltipPos = [
							normalizedEvent.chartX - chart.plotLeft,
							normalizedEvent.chartY - chart.plotTop
						];
						
						$(e.currentTarget).css({ "stroke": "rgba(255, 120, 50, 0.8)", "stroke-width": "4px" });
			
						tooltip.refresh(point);
			        }
				}
			} ]
	    },
	    
	    lang: {
			thousandsSep: ','
		},
		
		colors: ['#EA899A'],
		
	    tooltip: {
	    	formatter: function () {
//	    		let vTot = 0;
//				for(var i=0; i<this.series.data.length; i++) {
//					vTot += this.series.data[i].y;
//				}
//				let ratio = (parseInt(this.y) / vTot * 100).toFixed(2);
				return "<p style='color: #3d4956;white-space:nowrap;margin:9px 14px 5px 8px;'>" + $("#tmsYears option:selected").text() + "년 " +
    			$("#chrItmList option:selected").text() + "</p>" +
				"<div style='text-align:center;'><p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin:9px 14px 5px 8px;'>" +
				this.key + "</p></div>" +
				"<div style='text-align:center;'><p style='color:#0982d8; display: inline-block; margin:9px 14px 5px 8px; white-space:nowrap;'>" + 
				numberFormat(this.y) + " " + unitNm + "</p></div>" ;
//				"<div style='text-align:center;'><p style='color:#EE3520; display: inline-block; margin:9px 12px 5px 4px; white-space:nowrap;'>" + 
//				ratio + " %" + "</p>";
			},
			useHTML: true,
			shared: false,
		    shadow: false,
		    enabled: true
	    },
	    
	    plotOptions: {
	    	series: {
	            cursor: 'pointer'
	        }
	    },

	    series: 
	    	[{
		        name: '',
		        data: chartData,
		        dataLabels: {
		            enabled: true,
		            style: {
		                fontWeight: 'bold',
		                color: (
		                    Highcharts.defaultOptions.title.style &&
		                    Highcharts.defaultOptions.title.style.color
		                ) || 'gray'
		            },
		            formatter: function() {
		            	var s  = numberFormat(this.y);
						return s;
		            }
		        },
		        point: {
		        	events: {
		        		click: function() {
		        			
//		        			let region_cd = this.series.userOptions.data[this.index][2];
//		        			
//		        			if(region_cd.length==2){
//		        				$("#sbx_sido").val(region_cd).prop("selected",true);
//		        				getSggListOpt();
//		        			}else if(region_cd.length==5){
//		        				$('#sbx_sido').val(region_cd.substr(0,2)).prop("selected", true);
//		        				getSggListOpt();
//								$('#sbx_sgg').val(region_cd.substr(2,3)).prop("selected", true);
//		        			}else if(region_cd.length==7){
//		        				$('#sbx_sido').val(region_cd.substr(0,2)).prop("selected", true);
//		        				getSggListOpt();
//								$('#sbx_sgg').val(region_cd.substr(2,3)).prop("selected", true);
//								getEmdListOpt();
//								$('#sbx_emd').val(region_cd.substr(5,2)).prop("selected", true);
//		        			}
//		        			
//		    				if($("#sbx_sido").val() != '00'){
//		    					$inMoreDetailMap.ui.mapToggleId = $("#sbx_sido option:selected").val() + ($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
//		    					$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
//		    					$totSurvMain.ui.selectedArea = $inMoreDetailMap.ui.mapToggleId;
//		    					$inMoreDetail.event.allChange("1");
//		    				}else{
//		    					var sidoValues = $("#sbx_sido>option").map(function() { return {name : $(this).text(), value: $(this).val()} });
//		    					$.each(sidoValues, function(i,v){
//		    						if(v.name == this.category){
//		    							$totSurvMain.ui.selectedArea = v.value;
//		    							$inMoreDetailMap.ui.mapToggleId = v.value;
//		    							$("#sbx_sido").val(v.value);
//		    						}
//		    					});
//		    					$inMoreDetail.ui.admCd = $inMoreDetailMap.ui.mapToggleId;
//		    					getSggListOpt();
//		    					$inMoreDetail.event.allChange("1");
//		    				}
		        			
		        			var area_cd = chartData[this.index][2];
		        			
		        			if(area_cd.length == 2){
		        				srvLogWrite("P0", "09", "05", "03", $inMoreDetailMap.ui.selectedSurvId, "sido_cd="+area_cd);
		        				
	    						$inMoreDetail.ui.admCd = area_cd;
	    						
	    						$inMoreDetailMap.ui.getSidoSggPos(area_cd);
	    						
	    						$inMoreDetail.ui.getDataJson($inMoreDetailMap.ui.selectedSurvId, $inMoreDetailMap.ui.selectedItemSeq, "2");
	    						
	    			    		$inMoreDetailMap.ui.map.setDetailPolyLayerHighlight(area_cd);
	    			    		$inMoreDetailMap.ui.mapToggleId = area_cd;
	    			    		
	    			    		if($totSurvMain.ui.chartTarget != ""
	    			    			&& typeof($totSurvMain.ui.chartIndex) == "number"
	    			    			&& $totSurvMain.ui.chartColor != ""){
	    			    			 
	    			    			$inMoreDetail.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
	    			    		}
	    			    		
	    			    		$totSurvMain.ui.selectedArea = area_cd;
		        			}
		        		}
		        	}
		        }
		    }]
	});
}

var drawGrid1 = function() {
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	
	//타이틀
	$("#inMoreDetailCorpCountOfIndustryChart").parent().parent().children(".item").children(".sub-L").html(
			$("#tmsYears option:selected").val() + "년  " + $("#chrItmList option:selected").text()	 
	);
	$("#inMoreDetailCorpCountOfIndustryChart").parent().parent().children(".item").children(".sub-R").html(
		"단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm
	);
	
	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];
		
		fn_bindItmList(chartData);
		
		var tblIdList = $inMoreDetail.ui.ajax.params["tbl_id_list"];
		
		if($inMoreDetail.ui.dispOptions[chartOrd][0].regionVarOrd == 1){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "0";
		}else{
			$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
		}
		
		if(tblIdList == "DT_1KI1512" || tblIdList == "DT_1KI2004" || tblIdList == "DT_1KI1512_10"){
			$inMoreDetail.ui.ajax.params.ov_l3_list = "C0,C1,C2,C3,C4";
		}else if(tblIdList == "DT_1KI1513" || tblIdList == "DT_1KI2005" || tblIdList == "DT_1KI1513_10"){
			$inMoreDetail.ui.ajax.params.ov_l3_list = "D0,D1,D2,D3,D4,D5,D6,D7,D8,D9";
		}else if(tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514_10"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
			
			if(tblIdList == "DT_1KI2006"){
				if(chartOrd == 1){
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20,T70,T30,T40,T50,T60";
				}else if(chartOrd == 2){
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T21,T31,T41,T51,T61,T71";
				}else if(chartOrd == 3){
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T22,T32,T42,T52,T62,T72";
				}
			}else{
				if(chartOrd == 1){ // 전체
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20,T201,T202,T203,T204,T205";
				}else if(chartOrd == 2){ // 남자
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T21,T2011,T2021,T2031,T2041,T2051";
				}else if(chartOrd == 3){ // 여자
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T22,T2012,T2022,T2032,T2042,T2052";
				}
			}
		}else if(tblIdList == "DT_1KI1515" || tblIdList == "DT_1KI2007" || tblIdList == "DT_1KI1515_10"){
			if(tblIdList == "DT_1KI1515_10"){
				$inMoreDetail.ui.ajax.params.ov_l3_list = "E0,E1,E2,E3,E4,E5,E6,E7,E8,E9";
			}else{
				$inMoreDetail.ui.ajax.params.ov_l3_list = "D0,D1,D2,D3,D4,D5,D6,D7,D8,D9";
			}
		}else if(tblIdList == "DT_1KI1516" || tblIdList == "DT_1KI2008" || tblIdList == "DT_1KI1516_10"){
			$inMoreDetail.ui.ajax.params.ov_l4_list = "F0,F1,F2,F3";
		}else if(tblIdList == "DT_1KI2009"){
			$inMoreDetail.ui.ajax.params.ov_l3_list = "F0,F1,F2,F3,F4,F5,F6,F7,F8,F9";
		}else{
			if(tblIdList == "DT_1KI1509" || tblIdList == "DT_1KI1509_10" || tblIdList == "DT_1KI2001" || tblIdList == "DT_1KI1510_10" || tblIdList == "DT_1KI1511_10" ){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
				$inMoreDetail.ui.ajax.params.ov_l2_list = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
				
				if(tblIdList == "DT_1KI1510_10" || tblIdList == "DT_1KI1511_10"){
					let sido = $('#sbx_sido option:selected').val();
					if(sido != "00"){
						let sgg = $('#sbx_sgg').find('option').map(function() {return $(this).val();}).get();
						// 처음 전체값 제거
						sgg.splice(0,1);
						
						let sggList = "";
						$.each(sgg, function(i,index){
							if(i != sgg.length-1){
								sggList += sido + index + ",";
							}else{
								sggList += sido + index;
							}
						})
						$inMoreDetail.ui.ajax.params["ov_l2_list"] = sggList;
						
						let sggSel = $('#sbx_sgg option:selected').val();
						if(sggSel != "000"){
							let emd = $('#sbx_emd').find('option').map(function() {return $(this).val();}).get();
							emd.splice(0,1);
							
							let emdList = "";
							$.each(emd, function(i,index){
								if(i != emd.length-1){
									emdList += sido + sggSel + index + ",";
								}else{
									emdList += sido + sggSel + index;
								}
							})
							$inMoreDetail.ui.ajax.params["ov_l2_list"] = emdList;
						}
					} 
				}
			}else{
				$inMoreDetail.ui.ajax.params.ov_l2_list = "0";
				$inMoreDetail.ui.ajax.params.ov_l1_list = "00,31,11,21,38,37,22,23,34,36,35,32,33,24,25,26,39,29";
				
				let sido = $('#sbx_sido option:selected').val();
				if(sido != "00"){
					let sgg = $('#sbx_sgg').find('option').map(function() {return $(this).val();}).get();
					// 처음 전체값 제거
					sgg.splice(0,1);
					
					let sggList = "";
					$.each(sgg, function(i,index){
						if(i != sgg.length-1){
							sggList += sido + index + ",";
						}else{
							sggList += sido + index;
						}
					})
					$inMoreDetail.ui.ajax.params["ov_l1_list"] = sggList;
					
					let sggSel = $('#sbx_sgg option:selected').val();
					if(sggSel != "000"){
						let emd = $('#sbx_emd').find('option').map(function() {return $(this).val();}).get();
						emd.splice(0,1);
						
						let emdList = "";
						$.each(emd, function(i,index){
							if(i != emd.length-1){
								emdList += sido + sggSel + index + ",";
							}else{
								emdList += sido + sggSel + index;
							}
						})
						$inMoreDetail.ui.ajax.params["ov_l1_list"] = emdList;
					}
				} 
			}
			if(chartOrd == 1){ 
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T10";
			}else if(chartOrd == 2){ 
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20,T201,T202";
			}else if(chartOrd == 3){ 
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T30,T40,T50";
			}else if(chartOrd == 4){ 
				$inMoreDetail.ui.ajax.params.char_itm_id_list = "T30,T50";
			}
		}
		
		// 테이블 전부 삽입해서 조건 걸기 
		if(tblIdList == "DT_1KI2008"){
			$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T01";
		}
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					let htmlTable = "";
					let arrRes = [];
					let len = chartData.length-1;
					
					if(tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI1514_10"){
						len = 6;
					}
					
					$("#sbx_ksic option:selected").text();
					htmlTable += '<div>';
					htmlTable += '<table class="gridCla">';
					htmlTable += 	'<thead>';
					htmlTable += 		'<tr>';
					htmlTable += 			'<td rowspan="2">지역</td>';
					htmlTable += 			'<td colspan="'+len+'">'+chartData[0].objNm+'</td>';
					htmlTable += 		'</tr>';
					htmlTable += 		'<tr>';
					if(tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI1514_10"){
						htmlTable +=			'<td>종사자수</td>'           ;
						htmlTable +=			'<td>상용근로자</td>'          ;
						htmlTable +=			'<td>임시 및 일용근로자</td>'     ;
						htmlTable +=			'<td>자영업자</td>'            ;
						htmlTable +=			'<td>무급가족종사자</td>'        ;
						htmlTable +=			'<td>기타종사자</td>'           ;
					}else if(tblIdList == "DT_1KI2005" || tblIdList == "DT_1KI1513" || tblIdList == "DT_1KI1513_10"){
						htmlTable +=			'<td>계</td>'                ;
						htmlTable +=			'<td>1~4인</td>'             ;
						htmlTable +=			'<td>5~9인</td>'             ;
						htmlTable +=			'<td>10~49인</td>'           ;
						htmlTable +=			'<td>50~99인</td>'           ;
						htmlTable +=			'<td>100~299인</td>'         ;
						htmlTable +=			'<td>300인 이상</td>'          ;
					}else if(tblIdList == "DT_1KI2007" || tblIdList == "DT_1KI1515" || tblIdList == "DT_1KI1515_10"){
						htmlTable +=			'<td>계</td>'               ;
						htmlTable +=			'<td>1억원 미만</td>'         ;
						htmlTable +=			'<td>1억~10억원 미만</td>'     ;
						htmlTable +=			'<td>10억~100억원 미만</td>'   ;
						htmlTable +=			'<td>100억~200억원 미만</td>'  ;
						htmlTable +=			'<td>200억~300억원 미만</td>'  ;
						htmlTable +=			'<td>300억원 이상</td>'       ;
					}else if(tblIdList == "DT_1KI1509" || tblIdList == "DT_1KI1510" ||tblIdList == "DT_1KI1511"
					|| tblIdList == "DT_1KI1509_10" || tblIdList == "DT_1KI1510_10" || tblIdList == "DT_1KI1511_10"
					|| tblIdList == "DT_1KI2001" || tblIdList == "DT_1KI2002" || tblIdList == "DT_1KI2003")	{
						if(chartOrd == 1){ 
							htmlTable +=			'<td>사업체수</td>'		;
						}else if(chartOrd == 2){ 
							htmlTable +=			'<td>계</td>'          ;
							htmlTable +=			'<td>남자</td>'         ;
							htmlTable +=			'<td>여자</td>'         ;
						}else if(chartOrd == 3){ 
							htmlTable +=			'<td>매출액</td>'          ;
							htmlTable +=			'<td>영업비용</td>'         ;
							htmlTable +=			'<td>영업이익</td>'         ;
						}else if(chartOrd == 4){ 
							htmlTable +=			'<td>매출액</td>'          ;
							htmlTable +=			'<td>영업이익</td>'         ;
							htmlTable +=			'<td>영업이익률</td>'        ;
						}
					}else{
						for(let i=1;i<chartData.length;i++){
							htmlTable +=			'<td>'+chartData[i].scrKor+'</td>'
						}
					}
					htmlTable += 		'</tr>';
					htmlTable += 	'</thead>';
					htmlTable += 	'<tbody>';
					// 테이블별 조건 줘서 등록 13,15는 연산해야함
					for(let i=1;i<chartData.length;i++){
						let ord = "OV_L"+chartData[i].varOrd+"_ID"
						let arrResLv = [];
						for(let j=0;j<res.length;j++){
							if(chartData[i].itmId == res[j][ord]){
								arrResLv.push(res[j]);
							}
						}
						arrRes.push(arrResLv);
					}
					
					for(let n=0;n<arrRes.length;n++){
						if(tblIdList == "DT_1KI1509_10" ||tblIdList == "DT_1KI1510_10" ||tblIdList == "DT_1KI1511_10" ||
							tblIdList == "DT_1KI1512_10" ||tblIdList == "DT_1KI1513_10" ||tblIdList == "DT_1KI1514_10" ||
							tblIdList == "DT_1KI1515_10" ||tblIdList == "DT_1KI1516_10"){
							arrRes[n].sort(function(a, b)  {
								return a.OV_L2_ID - b.OV_L2_ID;
							});
						}else{
							arrRes[n].sort(function(a, b)  {
								return a.OV_L1_ID - b.OV_L1_ID;
							});
						}
					}
					
					if(tblIdList == "DT_1KI1513" || tblIdList == "DT_1KI2005" || tblIdList == "DT_1KI1513_10"){
						for(let j=0;j<arrRes[0].length;j++){
							let d0 = 0,d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
							htmlTable += 	'<tr>';
							for(let i=0;i<arrRes.length;i++){
								if(arrRes[i][j].OV_L3_ID == 'D0'){
									d0 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D1'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D2'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D3'){
									d2 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D4'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D5'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D6'){
									d4 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D7'){
									d5 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D8'){
									d5 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D9'){
									d6 += arrRes[i][j].DTVAL_CO*1;
								}
							}
							if(tblIdList == "DT_1KI1513_10"){
								htmlTable += 		'<td>'+ arrRes[0][j].OV_L2_KOR+'</td>';
							}else{
								htmlTable += 		'<td>'+ arrRes[0][j].OV_L1_KOR+'</td>';
							}
							htmlTable += 		'<td>'+Number(d0).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d1).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d2).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d3).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d4).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d5).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d6).toLocaleString()+'</td>';
							htmlTable += 	'</tr>';
						}
					}else if(tblIdList == "DT_1KI1515" || tblIdList == "DT_1KI2007" || tblIdList == "DT_1KI1515_10"){
						for(let j=0;j<arrRes[0].length;j++){
							let d0 = 0,d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
							htmlTable += 	'<tr>';
							for(let i=0;i<arrRes.length;i++){
								if(arrRes[i][j].OV_L3_ID == 'D0'){
									d0 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D1'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D2'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D3'){
									d2 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D4'){
									d2 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D5'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D6'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D7'){
									d4 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D8'){
									d5 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D9'){
									d6 += arrRes[i][j].DTVAL_CO*1;
								}
							}
							if(tblIdList == "DT_1KI1515_10"){
								d0 = 0,d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
								for(let i=0;i<arrRes.length;i++){
									if(arrRes[i][j].OV_L3_ID == 'E0'){
										d0 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E1'){
										d1 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E2'){
										d1 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E3'){
										d2 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E4'){
										d2 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E5'){
										d3 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E6'){
										d3 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E7'){
										d4 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E8'){
										d5 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E9'){
										d6 += arrRes[i][j].DTVAL_CO*1;
									}
								}
								htmlTable += '<td>'+ arrRes[0][j].OV_L2_KOR+'</td>';
							}else{
								htmlTable += '<td>'+ arrRes[0][j].OV_L1_KOR+'</td>';
							}
							htmlTable += 		'<td>'+Number(d0).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d1).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d2).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d3).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d4).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d5).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d6).toLocaleString()+'</td>';
							htmlTable += 	'</tr>';
						}
					}else if(tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI1514_10"){
						let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[];
						if(tblIdList == "DT_1KI2006"){
							for(let n=0;n<res.length;n++){
								if(res[n].CHAR_ITM_ID == 'T20' || res[n].CHAR_ITM_ID == 'T21' || res[n].CHAR_ITM_ID == 'T22'){
									arr1.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T30' || res[n].CHAR_ITM_ID == 'T31' || res[n].CHAR_ITM_ID == 'T32'){
									arr2.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T40' || res[n].CHAR_ITM_ID == 'T41' || res[n].CHAR_ITM_ID == 'T42'){
									arr3.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T50' || res[n].CHAR_ITM_ID == 'T51' || res[n].CHAR_ITM_ID == 'T52'){
									arr4.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T60' || res[n].CHAR_ITM_ID == 'T61' || res[n].CHAR_ITM_ID == 'T62'){
									arr5.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T70' || res[n].CHAR_ITM_ID == 'T71' || res[n].CHAR_ITM_ID == 'T72'){
									arr6.push(res[n]);
								}
							}
						}else{
							for(let n=0;n<res.length;n++){
								if(res[n].CHAR_ITM_ID == 'T20' || res[n].CHAR_ITM_ID == 'T21' || res[n].CHAR_ITM_ID == 'T22'){
									arr1.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T201' || res[n].CHAR_ITM_ID == 'T2011' || res[n].CHAR_ITM_ID == 'T2012'){
									arr2.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T202' || res[n].CHAR_ITM_ID == 'T2021' || res[n].CHAR_ITM_ID == 'T2022'){
									arr3.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T203' || res[n].CHAR_ITM_ID == 'T2031' || res[n].CHAR_ITM_ID == 'T2032'){
									arr4.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T204' || res[n].CHAR_ITM_ID == 'T2041' || res[n].CHAR_ITM_ID == 'T2042'){
									arr5.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T205' || res[n].CHAR_ITM_ID == 'T2051' || res[n].CHAR_ITM_ID == 'T2052'){
									arr6.push(res[n]);
								}
							}
						}
						
						arr1.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
						arr2.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
						arr3.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
						arr4.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
						arr5.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
						arr6.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
						
						for(let n=0;n<arr1.length;n++){
							htmlTable += 	'<tr>';
							htmlTable += 		'<td>'+arr1[n].OV_L2_KOR+'</td>';
							htmlTable += 		'<td>'+Number(arr1[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr2[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr3[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr4[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr5[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr6[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 	'</tr>';
						}
						
					}else if(tblIdList == "DT_1KI1509" || tblIdList == "DT_1KI1510" || tblIdList == "DT_1KI1511"
					|| tblIdList == "DT_1KI1509_10" || tblIdList == "DT_1KI1510_10" || tblIdList == "DT_1KI1511_10"
					|| tblIdList == "DT_1KI2001" || tblIdList == "DT_1KI2002" || tblIdList == "DT_1KI2003")	{
						let arr1 = [],arr2 = [],arr3 = [];
						
						if(chartOrd == 1){ 
							for(let j=0;j<res.length;j++){
								htmlTable += 	'<tr>';
								if(tblIdList == "DT_1KI1509" || tblIdList == "DT_1KI1509_10" || tblIdList == "DT_1KI2001" || tblIdList == "DT_1KI1510_10"|| tblIdList == "DT_1KI1511_10" ){
									htmlTable += '<td>'+ res[j].OV_L2_KOR+'</td>';
								}else{
									htmlTable += '<td>'+ res[j].OV_L1_KOR+'</td>';
								}
								htmlTable += '<td>'+ Number(res[j].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += 	'</tr>';
							}
						}else if(chartOrd == 2){ 
							arr1 = [],arr2 = [],arr3 = [];
							for(let j=0;j<res.length;j++){
								if(res[j].CHAR_ITM_ID == 'T20'){
									arr1.push(res[j]);
								}else if(res[j].CHAR_ITM_ID == 'T201'){
									arr2.push(res[j]);
								}else if(res[j].CHAR_ITM_ID == 'T202'){
									arr3.push(res[j]);
								}
							}
							
							arr1.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
							arr2.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
							arr3.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
							
							for(let n=0;n<arr1.length;n++){
								htmlTable += 	'<tr>';
								if(tblIdList == "DT_1KI1509" || tblIdList == "DT_1KI1509_10" || tblIdList == "DT_1KI2001" || tblIdList == "DT_1KI1510_10"|| tblIdList == "DT_1KI1511_10" ){
									htmlTable += '<td>'+ arr1[n].OV_L2_KOR+'</td>';
								}else{
									htmlTable += '<td>'+ arr1[n].OV_L1_KOR+'</td>';
								}
								htmlTable += '<td>'+ Number(arr1[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += '<td>'+ Number(arr2[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += '<td>'+ Number(arr3[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += 	'</tr>';
							}
						}else if(chartOrd == 3){ 
							arr1 = [],arr2 = [],arr3 = [];
							for(let j=0;j<res.length;j++){
								if(res[j].CHAR_ITM_ID == 'T30'){
									arr1.push(res[j]);
								}else if(res[j].CHAR_ITM_ID == 'T40'){
									arr2.push(res[j]);
								}else if(res[j].CHAR_ITM_ID == 'T50'){
									arr3.push(res[j]);
								}
							}
							
							arr1.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
							arr2.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
							arr3.sort(function(a, b)  {return a.OV_L1_ID - b.OV_L1_ID;});
							
							for(let n=0;n<arr1.length;n++){
								htmlTable += 	'<tr>';
								if(tblIdList == "DT_1KI1509" || tblIdList == "DT_1KI1509_10" || tblIdList == "DT_1KI2001" || tblIdList == "DT_1KI1510_10"|| tblIdList == "DT_1KI1511_10"){
									htmlTable += '<td>'+ arr1[n].OV_L2_KOR+'</td>';
								}else{
									htmlTable += '<td>'+ arr1[n].OV_L1_KOR+'</td>';
								}
								htmlTable += '<td>'+ Number(arr1[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += '<td>'+ Number(arr2[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += '<td>'+ Number(arr3[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += 	'</tr>';
							}
						}else if(chartOrd == 4){ 
							arr1 = [],arr2 = [],arr3 = [];
							for(let j=0;j<res.length;j++){
								if(res[j].CHAR_ITM_ID == 'T30'){
									arr1.push(res[j]);
								}else if(res[j].CHAR_ITM_ID == 'T50'){
									arr2.push(res[j]);
								}
							}
							for(let n=0;n<arr1.length;n++){
								htmlTable += 	'<tr>';
								if(tblIdList == "DT_1KI1509" || tblIdList == "DT_1KI1509_10" || tblIdList == "DT_1KI2001" || tblIdList == "DT_1KI1510_10"|| tblIdList == "DT_1KI1511_10"){
									htmlTable += '<td>'+ arr1[n].OV_L2_KOR+'</td>';
								}else{
									htmlTable += '<td>'+ arr1[n].OV_L1_KOR+'</td>';
								}
								htmlTable += '<td>'+ Number(arr1[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += '<td>'+ Number(arr2[n].DTVAL_CO).toLocaleString()+'</td>';
								htmlTable += '<td>'+ Math.round( arr2[n].DTVAL_CO / arr1[n].DTVAL_CO *1000)/10 +'</td>';
								htmlTable += 	'</tr>';
							}
						}
					}else{
						for(let j=0;j<arrRes[0].length;j++){
							htmlTable += 	'<tr>';
							
							if(tblIdList == "DT_1KI1512_10"){
								htmlTable += '<td>'+ arrRes[0][j].OV_L2_KOR+'</td>';
							}else{
								htmlTable += '<td>'+ arrRes[0][j].OV_L1_KOR+'</td>';
							}
							for(let i=0;i<arrRes.length;i++){
								htmlTable += '<td>'+ Number(arrRes[i][j].DTVAL_CO).toLocaleString()+'</td>';
							}
							htmlTable += 	'</tr>';
						}
					}
					htmlTable += 	'</tbody>';
					htmlTable += '</table>';
					htmlTable += '</div>';
					
					$("#inMoreDetailCorpCountOfIndustryChart").append(htmlTable);
					$("#inMoreDetailCorpCountOfIndustryChart").parent().show();
				}
			},
			error:function(data) {
				alert('오류발생~!');
			}
		});
	} else {
		$("#inMoreDetailCorpCountOfIndustryChart").parent().show();
		$("#inMoreDetailCorpCountOfIndustryChart").html($("body>.DataNone").clone().show()[0]);
	}
}

var drawGrid1_1 = function() {
	$("#dataGrid_panel1").html();
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	
	$("#title4").children(".sub-L").html(
		"표 보기"
	);

	$("#title4").children(".sub-R").html(
		"단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm
	);
	
	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];
		
		$inMoreDetail.ui.ajax.params = {
			surv_year_list: $("#tmsYears option:selected").val()		// 수록시점
			, org_id_list: $inMoreDetail.ui.selectedOrgId					// 조직번호
			, tbl_id_list: $inMoreDetail.ui.selectedTblId					// 통계표 ID
			, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
			, char_itm_id_list: $inMoreDetail.ui.selectedCharItmId	// 표특성항목
			, adm_cd:  ""// 지역코드
			, prt_type: ""												// 출력방식 total:계 else 모두		
			, category: $inMoreDetailMap.ui.category							// 카테고리
			, odr_col_list: "DTVAL_CO"									// 정렬기준
			, odr_type: "DESC"											// 내림차순, 오름차순
		};
		
		fn_bindItmList(chartData);
		
		/*if($inMoreDetail.ui.chartClickItmCd != "") {
			if(chartData[0].dispVarOrd == 0) {
				$inMoreDetail.ui.ajax.params["char_itm_id_list"] = $inMoreDetail.ui.chartClickItmCd;
			} else {
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].dispVarOrd + "_list"] = $inMoreDetail.ui.chartClickItmCd;
			}
		} else {
			if(chartData[0].dispVarOrd == 0) {
				$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "";
			} else {
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].dispVarOrd + "_list"] = "";
			}
			
			fn_bindItmList(chartData);
		}*/
		
		// 현재 지역 파라미터 설정 필수
		if($("#sbx_sido option:selected").val() != "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:"+$("#sbx_sido option:selected").val();
			if($("#sbx_sgg option:selected").val() != "000"){
				$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:"+$("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val());
				if($("#sbx_emd option:selected").val() != "000"){
					$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $("#sbx_sido option:selected").val()+($("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val())+$("#sbx_emd option:selected").val();
				}
			}
		}else if($("#sbx_sido option:selected").val() == "00"){
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = "up:00";
		}else{
			$inMoreDetail.ui.ajax.params["ov_l" + chartData[0].regionVarOrd + "_list"] = $totSurvMain.ui.selectedArea;
		}
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res.length > 0 ){
					if($inMoreDetail.chart4[$totSurvMain.ui.selectedArea] != undefined) {
						if($inMoreDetail.chart4[$totSurvMain.ui.selectedArea].length > 0) {
							$inMoreDetail.chart4[$totSurvMain.ui.selectedArea] = [];
						}
					}
					$inMoreDetail.chart4[$totSurvMain.ui.selectedArea] = res;
					let htmlTable = "";
					let arrRes = [];
					let stacked = {};
					let stacked2 = {};
					let len = chartData.length-1;
					
					if(chartData[0].dispVarOrd == 0) {
						res.sort(function(a, b) { return a["CHAR_ITM_SN"] - b["CHAR_ITM_SN"] });
					} else {
						res.sort(function(a, b) { return a["OV_L" + chartData[0].dispVarOrd + "_SN"] - b["OV_L" + chartData[0].dispVarOrd + "_SN"] });
					}
					
					for(var i=0; i<res.length; i++) {
						if(chartData[0].dispVarOrd == 0) {
							if(stacked[res[i]["CHAR_ITM_ID"]] != undefined) {
								stacked[res[i]["CHAR_ITM_ID"]].push(res[i]);
							} else {
								stacked[res[i]["CHAR_ITM_ID"]] = [];
								stacked[res[i]["CHAR_ITM_ID"]].push(res[i]);
							}
						} else {
							if(stacked[res[i]["OV_L" + chartData[0].dispVarOrd + "_ID"]] != undefined) {
								stacked[res[i]["OV_L" + chartData[0].dispVarOrd + "_ID"]].push(res[i]);
							} else {
								stacked[res[i]["OV_L" + chartData[0].dispVarOrd + "_ID"]] = [];
								stacked[res[i]["OV_L" + chartData[0].dispVarOrd + "_ID"]].push(res[i]);
							}
						}
					}
					
					for(let i = 0 ;i<Object.keys(stacked).length;i++){
						let stack = stacked[Object.keys(stacked)[i]];
						let stackData = [], stackSn = [];
						for(var j=0; j<stack.length; j++) {
							//if(stack[j].CHAR_ITM_ID != "13999001") {
								if(chartData[0].regionVarOrd == 0) {
									stackData.push({
										region: stack[j].CHAR_ITM_NM, 
										val: Number(stack[j].DTVAL_CO), 
										sn: stack[j]["CHAR_ITM_SN"],
										region_cd: stack[j]["CHAR_ITM_ID"]
									});
								} else {
									stackData.push({
										region: stack[j]["OV_L" + chartData[0].regionVarOrd + "_KOR"], 
										val: Number(stack[j].DTVAL_CO), 
										sn: stack[j]["OV_L" + chartData[0].regionVarOrd + "_SN"],
										region_cd: stack[j]["OV_L" + chartData[0].regionVarOrd + "_ID"]
									});
								}
							//}
						}
						
						for(let k=0; k<chartData.length; k++) {
							if(chartData[k].dispVarOrd == 0) {
								if(stacked[Object.keys(stacked)[i]][0]["CHAR_ITM_ID"] == chartData[k].itmId) {
									arrRes.push({
										nm: chartData[k].altrtvDispWrd, 
										id: stacked[Object.keys(stacked)[i]][0]["CHAR_ITM_ID"],
										data: stackData, 
										sn: stacked[Object.keys(stacked)[i]][0]["CHAR_ITM_SN"],
									});
								}
							} else {
								if(stacked[Object.keys(stacked)[i]][0]["OV_L" + chartData[0].dispVarOrd + "_ID"] == chartData[k].itmId) {
									arrRes.push({
										nm: chartData[k].altrtvDispWrd, 
										id: stacked[Object.keys(stacked)[i]][0]["OV_L" + chartData[0].dispVarOrd + "_ID"],
										data: stackData, 
										sn: stacked[Object.keys(stacked)[i]][0]["OV_L" + chartData[0].dispVarOrd + "_SN"]
									});
								}
							}
						}
					}
					
					var chartSn = "sn";
					
					for(let m=0; m<arrRes.length; m++){
						arrRes[m].data.sort(function(a, b) { return a.sn - b.sn; });
						let isUnShift = false;
						for(let n=0; n<arrRes[m].data.length; n++){
							if($totSurvMain.ui.selectedArea == arrRes[m].data[n].region_cd && $totSurvMain.ui.selectedArea != "00") {
								let tmp = arrRes[m].data[n];
								arrRes[m].data.splice(n, 1);
								arrRes[m].data.splice(0, 0, tmp);
							}
						}
					}
					
					let gridWidth = 0
					
					if(arrRes.length > 4) {
						gridWidth = (arrRes.length+1) * 130;
					} else {
						gridWidth = 637;
					}
					
					$("#sbx_ksic option:selected").text();
					htmlTable += '<div>';
					
					htmlTable += '<table class="gridCla" style="width:' + gridWidth + 'px;">';
					htmlTable += '	<colgroup>';
					if(arrRes.length > 4) {
						for(let n=0;n<arrRes.length;n++){
							htmlTable += '<col style="width:130px;" />';
						}
					}
					htmlTable += '	</colgroup>';
					htmlTable += 	'<thead>';
					htmlTable += 		'<tr>';
					htmlTable += 			'<td>지역</td>';
					for(let m=0;m<arrRes.length;m++) {
						htmlTable += 		'<td>'+ arrRes[m].nm +'</td>';
					}
					htmlTable += 		'</tr>';
					htmlTable += 	'</thead>';
					htmlTable += 	'<tbody>';
					if($("#sbx_sido option:selected").val() == "00") {
						for(let m=0;m<arrRes[0].data.length;m++){
							if(arrRes[0].data[m].region_cd == "00") {
								htmlTable += 	'<tr>';
								htmlTable += '<td>'+ arrRes[0].data[m].region +'</td>';
								for(let n=0;n<arrRes.length;n++){
									for(let o=0; o<arrRes[n].data.length; o++) {
										if(arrRes[0].data[m].region_cd == arrRes[n].data[o].region_cd) {
											htmlTable += '<td>'+ numberFormat(arrRes[n].data[o].val) +'</td>';
										}
									}
								}
								htmlTable += 	'</tr>';
							}
						}
					} else {
						$totSurvMain.ui.selectedYear = $("#tmsYears option:selected").val();
						let upperCode = "", gridCode = "";
						if($totSurvMain.ui.selectedArea.length == 2) {
							upperCode = "00"
							gridCode = $totSurvMain.ui.selectedArea;
						} else if($totSurvMain.ui.selectedArea.length == 5) {
							$inMoreDetail.event.checkIsAtdrc($totSurvMain.ui.selectedArea);
							if($("#sbx_sgg option:selected").val() == "000") {
					    		if($inMoreDetailMap.ui.isAtdrc){
					    			upperCode = $totSurvMain.ui.selectedArea.substring(0,5);
					    		} else {
					    			upperCode = "00";
					    		}
					    		
					    		gridCode = $totSurvMain.ui.selectedArea.substring(0,2);
							} else {
								if($inMoreDetailMap.ui.isAtdrc){
					    			upperCode = $totSurvMain.ui.selectedArea.substring(0,5) + "0";
					    		} else {
					    			upperCode = $totSurvMain.ui.selectedArea.substring(0,2);
					    		}
								
								gridCode = $totSurvMain.ui.selectedArea.substring(0,5);
							}
						} else {
							$inMoreDetail.event.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,5));		
				    		if($inMoreDetailMap.ui.isAtdrc){
				    			upperCode = $totSurvMain.ui.selectedArea.substring(0,4) + "0";
				    		} else {
				    			upperCode = $totSurvMain.ui.selectedArea.substring(0,2);
				    		}
				    		gridCode = $totSurvMain.ui.selectedArea.substring(0,5);
						}
						
						for(let i=0; i<$inMoreDetail.chart4[upperCode].length; i++) {
							if($inMoreDetail.chart4[upperCode][i]["OV_L" + chartData[0].regionVarOrd + "_ID"] == gridCode) {
								htmlTable += 	'<tr>';
								htmlTable += '<td>'+ $inMoreDetail.chart4[upperCode][i]["OV_L" + chartData[0].regionVarOrd + "_KOR"] +'</td>';
								break;
							}
						}
						for(let i=0; i<$inMoreDetail.chart4[upperCode].length; i++) {
							if($inMoreDetail.chart4[upperCode][i]["OV_L" + chartData[0].regionVarOrd + "_ID"] == gridCode) {
								htmlTable += '<td>'+ numberFormat($inMoreDetail.chart4[upperCode][i]["DTVAL_CO"]) +'</td>';
							}
						}
						htmlTable += 	'</tr>';
					}
					
					for(let m=0;m<arrRes[0].data.length;m++){
						if(arrRes[0].data[m].region_cd.substring(0,1) != "0") {
							if(arrRes[0].data[m].region_cd == $totSurvMain.ui.selectedArea) {
								htmlTable += 	'<tr style="border: 3px #f00 solid;">';
							} else {
								htmlTable += 	'<tr>';	
							}
							htmlTable += '<td>'+ arrRes[0].data[m].region +'</td>';
							for(let n=0;n<arrRes.length;n++){
								for(let o=0; o<arrRes[n].data.length; o++) {
									if(arrRes[0].data[m].region_cd == arrRes[n].data[o].region_cd) {
										htmlTable += '<td>'+ numberFormat(arrRes[n].data[o].val) +'</td>';
									}
								}
							}
							htmlTable += 	'</tr>';
						}
					}
					htmlTable += 	'</tbody>';
					htmlTable += '</table>';
					htmlTable += '</div>';
					
					$("#dataGrid_panel1").html(htmlTable);
					$("#dataGrid_panel1").parent().show();
				}else{
//					$("#dataGrid_panel1").parent().children(".item").children(".sub-L").hide();
//					$("#dataGrid_panel1").parent().children(".item").children(".sub-R").hide();
//					alert("데이터가 없습니다.");
					$("#dataGrid_panel1").parent().show();
					$("#dataGrid_panel1").html($("body>.DataNone").clone().show()[0]);
				}
			},
			error:function(data) {
				alert('오류발생~!');
			}
		});
	} else {
		$("#dataGrid_panel1").parent().show();
		$("#dataGrid_panel1").html($("body>.DataNone").clone().show()[0]);
	}
}

var drawGrid2 = function() {
	let chartOrd = $inMoreDetail.ui.selectedChartOrd;
	
	//타이틀
	$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-L").html(
			$("#tmsYears option:selected").val() + "년  " + $("#chrItmList option:selected").text()	 
	);
	$("#timeSeriesCorpCountIndustryChart").parent().children(".item").children(".sub-R").html(
		"단위: " + $inMoreDetail.ui.dispOptions[chartOrd][0].dispUnitNm
	);
	
	if(Object.keys($inMoreDetail.ui.dispOptions).length > 0) {
		let chartData = $inMoreDetail.ui.dispOptions[chartOrd];
		
		fn_bindItmList(chartData);
		
		var tblIdList = $inMoreDetail.ui.ajax.params["tbl_id_list"];
		
		if(tblIdList == "DT_1KI1512" || tblIdList == "DT_1KI2004" || tblIdList == "DT_1KI1512_10"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "00";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			if(tblIdList == "DT_1KI1512_10"){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
				$inMoreDetail.ui.ajax.params.ov_l2_list = "00";
			}
			$inMoreDetail.ui.ajax.params.ov_l3_list = "C0,C1,C2,C3,C4";
		}else if(tblIdList == "DT_1KI1513" || tblIdList == "DT_1KI2005" || tblIdList == "DT_1KI1513_10"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "00";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			if(tblIdList == "DT_1KI1513_10"){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
				$inMoreDetail.ui.ajax.params.ov_l2_list = "00";
			}
			$inMoreDetail.ui.ajax.params.ov_l3_list = "D0,D1,D2,D3,D4,D5,D6,D7,D8,D9";
		}else if(tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514_10"){
			if(tblIdList == "DT_1KI2006"){
				if(chartOrd == 1){
					//$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20,T70,T30,T40,T50,T60";
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20";
				}else if(chartOrd == 2){
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T21,T31,T41,T51,T61,T71";
				}else if(chartOrd == 3){
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T22,T32,T42,T52,T62,T72";
				}
			}else{
				if(chartOrd == 1){ // 전체
					//$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20,T201,T202,T203,T204,T205";
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T20";
				}else if(chartOrd == 2){ // 남자
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T21,T2011,T2021,T2031,T2041,T2051";
				}else if(chartOrd == 3){ // 여자
					$inMoreDetail.ui.ajax.params.char_itm_id_list = "T22,T2012,T2022,T2032,T2042,T2052";
				}
			}
			$inMoreDetail.ui.ajax.params.ov_l1_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "00";
		}else if(tblIdList == "DT_1KI1515" || tblIdList == "DT_1KI2007" || tblIdList == "DT_1KI1515_10"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "00";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			if(tblIdList == "DT_1KI1515_10"){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0";
				$inMoreDetail.ui.ajax.params.ov_l2_list = "00";
				$inMoreDetail.ui.ajax.params.ov_l3_list = "E0,E1,E2,E3,E4,E5,E6,E7,E8,E9";
			}else{
				$inMoreDetail.ui.ajax.params.ov_l3_list = "D0,D1,D2,D3,D4,D5,D6,D7,D8,D9";
			}
		}else if(tblIdList == "DT_1KI1516" || tblIdList == "DT_1KI2008" || tblIdList == "DT_1KI1516_10"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "00";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			if(tblIdList == "DT_1KI1516_10"){
				$inMoreDetail.ui.ajax.params.ov_l1_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
				$inMoreDetail.ui.ajax.params.ov_l2_list = "00";
			}else{
			}
			$inMoreDetail.ui.ajax.params.ov_l3_list = "";
			$inMoreDetail.ui.ajax.params.ov_l4_list = "F0,F1,F2,F3";
		}else if(tblIdList == "DT_1KI2009"){
			$inMoreDetail.ui.ajax.params.ov_l1_list = "00";
			$inMoreDetail.ui.ajax.params.ov_l2_list = "0,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S";
			$inMoreDetail.ui.ajax.params.ov_l3_list = "F0,F1,F2,F3,F4,F5,F6,F7,F8,F9";
		}else{
			
		}
		
		// 테이블 전부 삽입해서 조건 걸기 
		if(tblIdList == "DT_1KI2008"){
			if(chartOrd == 1){ // 전체
			$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T01";
			}else if(chartOrd == 2){ // 전체
				$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T02";
			}else if(chartOrd == 3){ // 전체
				$inMoreDetail.ui.ajax.params["char_itm_id_list"] = "T03";
			}
		}
		
		$.ajax({
			type:"GET",
			async: false,
			//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
	 		data: $inMoreDetail.ui.ajax.params,
			success:function( res ){
				if( res ){
					let htmlTable = "";
					let arrRes = [];
					let len = chartData.length-1;
					
					if(tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI1514_10"){
						len = 6;
					}
					
					$("#sbx_ksic option:selected").text();
					htmlTable += '<div>';
					htmlTable += '<table  class="gridCla">';
					htmlTable += 	'<thead>';
					htmlTable += 		'<tr>';
					htmlTable += 			'<td rowspan="2">지역</td>';
					htmlTable += 			'<td colspan="'+len+'">'+chartData[0].objNm+'</td>';
					htmlTable += 		'</tr>';
					htmlTable += 		'<tr>';
					if(tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI1514_10"){
						htmlTable +=			'<td>종사자수</td>'
						htmlTable +=			'<td>상용근로자</td>'
						htmlTable +=			'<td>임시 및 일용근로자</td>'
						htmlTable +=			'<td>자영업자</td>'
						htmlTable +=			'<td>무급가족종사자</td>'
						htmlTable +=			'<td>기타종사자</td>'
					}else if(tblIdList == "DT_1KI2005" || tblIdList == "DT_1KI1513" || tblIdList == "DT_1KI1513_10"){
						htmlTable +=			'<td>계</td>'
						htmlTable +=			'<td>1~4인</td>'
						htmlTable +=			'<td>5~9인</td>'
						htmlTable +=			'<td>10~49인</td>'
						htmlTable +=			'<td>50~99인</td>'
						htmlTable +=			'<td>100~299인</td>'
						htmlTable +=			'<td>300인 이상</td>'
					}else if(tblIdList == "DT_1KI2007" || tblIdList == "DT_1KI1515" || tblIdList == "DT_1KI1515_10"){
						htmlTable +=			'<td>계</td>'
						htmlTable +=			'<td>1억원 미만</td>'
						htmlTable +=			'<td>1억~10억원 미만</td>'
						htmlTable +=			'<td>10억~100억원 미만</td>'
						htmlTable +=			'<td>100억~200억원 미만</td>'
						htmlTable +=			'<td>200억~300억원 미만</td>'
						htmlTable +=			'<td>300억원 이상</td>'
					}else{
						for(let i=1;i<chartData.length;i++){
							htmlTable +=			'<td>'+chartData[i].scrKor+'</td>'
						}
					}
					htmlTable += 		'</tr>';
					htmlTable += 	'</thead>';
					htmlTable += 	'<tbody>';
					// 테이블별 조건 줘서 등록 13,15는 연산해야함
					for(let i=1;i<chartData.length;i++){
						let ord = "OV_L"+chartData[i].varOrd+"_ID"
						let arrResLv = [];
						for(let j=0;j<res.length;j++){
							if(chartData[i].itmId == res[j][ord]){
								arrResLv.push(res[j]);
							}
						}
						arrRes.push(arrResLv);
					}
					
					for(let n=0;n<arrRes.length;n++){
						arrRes[n].sort(function(a, b)  {
							  return a.OV_L2_SN - b.OV_L2_SN;
						});
					}
					
					if(tblIdList == "DT_1KI1513" || tblIdList == "DT_1KI2005" || tblIdList == "DT_1KI1513_10"){
						for(let j=0;j<arrRes[0].length;j++){
							let d0 = 0 ,d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
							htmlTable += 	'<tr>';
							for(let i=0;i<arrRes.length;i++){
								if(arrRes[i][j].OV_L3_ID == 'D0'){
									d0 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D1'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D2'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D3'){
									d2 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D4'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D5'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D6'){
									d4 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D7'){
									d5 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D8'){
									d5 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D9'){
									d6 += arrRes[i][j].DTVAL_CO*1;
								}
							}
							if(tblIdList == "DT_1KI1513_10"){
								htmlTable += '<td>'+ arrRes[0][j].OV_L1_KOR+'</td>';
							}else{
								htmlTable += '<td>'+ arrRes[0][j].OV_L2_KOR+'</td>';
							}
							htmlTable += 		'<td>'+Number(d0).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d1).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d2).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d3).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d4).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d5).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d6).toLocaleString()+'</td>';
							htmlTable += 	'</tr>';
						}
					}else if(tblIdList == "DT_1KI1515" || tblIdList == "DT_1KI2007" || tblIdList == "DT_1KI1515_10"){
						for(let j=0;j<arrRes[0].length;j++){
							let d0 = 0 ,d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
							htmlTable += 	'<tr>';
							for(let i=0;i<arrRes.length;i++){
								if(arrRes[i][j].OV_L3_ID == 'D0'){
									d0 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D1'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D2'){
									d1 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D3'){
									d2 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D4'){
									d2 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D5'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D6'){
									d3 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D7'){
									d4 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D8'){
									d5 += arrRes[i][j].DTVAL_CO*1;
								}else if(arrRes[i][j].OV_L3_ID == 'D9'){
									d6 += arrRes[i][j].DTVAL_CO*1;
								}
							}
							if(tblIdList == "DT_1KI1515_10"){
								d0 = 0,d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0;
								for(let i=0;i<arrRes.length;i++){
									if(arrRes[i][j].OV_L3_ID == 'E0'){
										d0 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E1'){
										d1 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E2'){
										d1 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E3'){
										d2 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E4'){
										d2 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E5'){
										d3 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E6'){
										d3 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E7'){
										d4 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E8'){
										d5 += arrRes[i][j].DTVAL_CO*1;
									}else if(arrRes[i][j].OV_L3_ID == 'E9'){
										d6 += arrRes[i][j].DTVAL_CO*1;
									}
								}
								htmlTable += '<td>'+ arrRes[0][j].OV_L1_KOR+'</td>';
							}else{
								htmlTable += '<td>'+ arrRes[0][j].OV_L2_KOR+'</td>';
							}
							htmlTable += 		'<td>'+Number(d0).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d1).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d2).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d3).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d4).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d5).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(d6).toLocaleString()+'</td>';
							htmlTable += 	'</tr>';
						}
					}else if(tblIdList == "DT_1KI2006" || tblIdList == "DT_1KI1514" || tblIdList == "DT_1KI1514_10"){
						let arr1=[],arr2=[],arr3=[],arr4=[],arr5=[],arr6=[];
						
						if(tblIdList == "DT_1KI2006"){
							for(let n=0;n<res.length;n++){
								if(res[n].CHAR_ITM_ID == 'T20' || res[n].CHAR_ITM_ID == 'T21' || res[n].CHAR_ITM_ID == 'T22'){
									arr1.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T30' || res[n].CHAR_ITM_ID == 'T31' || res[n].CHAR_ITM_ID == 'T32'){
									arr2.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T40' || res[n].CHAR_ITM_ID == 'T41' || res[n].CHAR_ITM_ID == 'T42'){
									arr3.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T50' || res[n].CHAR_ITM_ID == 'T51' || res[n].CHAR_ITM_ID == 'T52'){
									arr4.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T60' || res[n].CHAR_ITM_ID == 'T61' || res[n].CHAR_ITM_ID == 'T62'){
									arr5.push(res[n]);           
								}else if(res[n].CHAR_ITM_ID == 'T70' || res[n].CHAR_ITM_ID == 'T71' || res[n].CHAR_ITM_ID == 'T72'){
									arr6.push(res[n]);
								}
							}
						}else{
							for(let n=0;n<res.length;n++){
								if(res[n].CHAR_ITM_ID == 'T20' || res[n].CHAR_ITM_ID == 'T21' || res[n].CHAR_ITM_ID == 'T22'){
									arr1.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T201' || res[n].CHAR_ITM_ID == 'T2011' || res[n].CHAR_ITM_ID == 'T2012'){
									arr2.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T202' || res[n].CHAR_ITM_ID == 'T2021' || res[n].CHAR_ITM_ID == 'T2022'){
									arr3.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T203' || res[n].CHAR_ITM_ID == 'T2031' || res[n].CHAR_ITM_ID == 'T2032'){
									arr4.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T204' || res[n].CHAR_ITM_ID == 'T2041' || res[n].CHAR_ITM_ID == 'T2042'){
									arr5.push(res[n]);
								}else if(res[n].CHAR_ITM_ID == 'T205' || res[n].CHAR_ITM_ID == 'T2051' || res[n].CHAR_ITM_ID == 'T2052'){
									arr6.push(res[n]);
								}
							}
						}
						
						arr1.sort(function(a, b)  {return a.OV_L2_SN - b.OV_L2_SN;});
						arr2.sort(function(a, b)  {return a.OV_L2_SN - b.OV_L2_SN;});
						arr3.sort(function(a, b)  {return a.OV_L2_SN - b.OV_L2_SN;});
						arr4.sort(function(a, b)  {return a.OV_L2_SN - b.OV_L2_SN;});
						arr5.sort(function(a, b)  {return a.OV_L2_SN - b.OV_L2_SN;});
						arr6.sort(function(a, b)  {return a.OV_L2_SN - b.OV_L2_SN;});
						
						for(let n=0;n<arr1.length;n++){
							htmlTable += 	'<tr>';
							htmlTable += '<td>'+ arr1[n].OV_L1_KOR+'</td>';
							htmlTable += 		'<td>'+Number(arr1[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr2[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr3[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr4[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr5[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 		'<td>'+Number(arr6[n].DTVAL_CO).toLocaleString()+'</td>';
							htmlTable += 	'</tr>';
						}
						
					}else{
						for(let j=0;j<arrRes[0].length;j++){
							htmlTable += 	'<tr>';
							
							if(tblIdList == "DT_1KI1512_10"){
								htmlTable += '<td>'+ arrRes[0][j].OV_L1_KOR+'</td>';
							}else{
								htmlTable += '<td>'+ arrRes[0][j].OV_L2_KOR+'</td>';
							}
							for(let i=0;i<arrRes.length;i++){
								htmlTable += '<td>'+ Number(arrRes[i][j].DTVAL_CO).toLocaleString()+'</td>';
							}
							htmlTable += 	'</tr>';
						}
					}
					htmlTable += 	'</tbody>';
					htmlTable += '</table>';
					htmlTable += '</div>';
					
					$("#timeSeriesCorpCountIndustryChart").append(htmlTable);
					$("#timeSeriesCorpCountIndustryChart").parent().show();
				}
			},
			error:function(data) {
				alert('오류발생~!');
			}
		});
	} else {
		$("#timeSeriesCorpCountIndustryChart").parent().show();
		$("#timeSeriesCorpCountIndustryChart").html($("body>.DataNone").clone().show()[0]);
	}
}

var getSidoListOpt = function() {	
	$.ajax({
		url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
	    type: 'post',
	    dataType : 'json',
	    async: true,
	    data: {
	    	base_year: $("#tmsYears option:selected").val()
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			if($("#sbx_sido").children().not(":first").length > 0) {
				$("#sbx_sido").children().not(":first").remove();
			}
			let sidoList = res.result.sidoList, sidoOpt = "";
			let isEndSido = false;
			try{
				if($inMoreDetail.ui.dispOptions[$inMoreDetail.ui.selectedChartOrd][0].regionEnd == '시도'){
					isEndSido = true;
				}
				if($inMoreDetail.ui.dispOptions[$inMoreDetail.ui.selectedChartOrd][0].regionEnd == '읍면동'){
					isEndEmd = true;
				}
				
			}catch(e){
				
			}
			if(!isEndSido){
				for(var i = 0; i < sidoList.length; i++) {
					sidoOpt += "<option value=\""+sidoList[i].sido_cd+"\" data-coor-x=\""+sidoList[i].x_coor+"\" data-coor-y=\""+sidoList[i].y_coor+"\">"+sidoList[i].sido_nm+"</option>";
				}
			}			
			$("#sbx_sido").append(sidoOpt);
		}else if(res.errCd == "-401") {
			//$statsMeMain.ui.alert(res.errMsg);
		}else{
			//$statsMeMain.ui.alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		//$statsMeMain.ui.alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		//$statsMeMain.ui.loading(false);
	});
}

var getSggListOpt = function() {
	// ajax 시작
	$.ajax({
		url: contextPath + "/ServiceAPI/map/sggAddressList.json",
	    type: 'post',
	    dataType : 'json',
	    async: false,
	    data: {
	    	base_year:$("#tmsYears option:selected").val(),
	    	sido_cd:$("#sbx_sido").val(),
	    	is_interactive:'Y',  // 비자치구 조회
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") { 
			var isEndSgg = false;
			if($("#sbx_sgg").children().not(":first").length > 0) {
				$("#sbx_sgg").children().not(":first").remove();
			}
			
			let sggList = res.result.sggList, sggOpt = "";
			
			try{
				if($inMoreDetail.ui.dispOptions[$inMoreDetail.ui.selectedChartOrd][0].regionEnd == '시군구'){
					isEndSgg = true;
				}				
			}catch(e){
				
			}
			
			
			$inMoreDetail.ui.tempGg = {};
			if(!isEndSgg){
				for(var i = 0; i < sggList.length; i++) {
					if(sggList[i].sgg_cd.charAt(sggList[i].sgg_cd.length-1)!='0'){
						if($inMoreDetail.ui.tempGg[sggList[i].sgg_cd.slice(0,2)+'0']==undefined) $inMoreDetail.ui.tempGg[sggList[i].sgg_cd.slice(0,2)+'0'] = {};	
						$inMoreDetail.ui.tempGg[sggList[i].sgg_cd.slice(0,2)+'0'][sggList[i].sgg_cd] = sggList[i];
					}else{
						sggOpt += "<option value=\""+sggList[i].sgg_cd+"\" data-coor-x=\""+sggList[i].x_coor+"\" data-coor-y=\""+sggList[i].y_coor+"\">"+sggList[i].sgg_nm+"</option>";
					}
				}			
			}
			$("#sbx_sgg").append(sggOpt);
		}else if(res.errCd == "-401") {
			//$statsMeMain.ui.alert(res.errMsg);
		}else{
			//$statsMeMain.ui.alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		//$statsMeMain.ui.alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		//$statsMeMain.ui.loading(false);
	});
}

var getEmdListOpt = function() {
	// ajax 시작
	$.ajax({
		url: contextPath + "/ServiceAPI/map/admAddressList.json",
	    type: 'post',
	    dataType : 'json',
	    async: false,
	    data: {
	    	base_year:$("#tmsYears option:selected").val(),
	    	sido_cd:$("#sbx_sido").val(),
	    	sgg_cd:$("#sbx_gg").val()==='000'?$("#sbx_sgg").val():$("#sbx_gg").val(),
	    	is_interactive:'Y',  // 비자치구 조회
	    }
	}).done(function (res) { // 완료
		if(res.errCd == "0") {
			if($("#sbx_emd").children().not(":first").length > 0) {
				$("#sbx_emd").children().not(":first").remove();
			}
			
			let emdList = res.result.admList, emdOpt = "";
			let isEndEmd = false;
			
			try{
				if($inMoreDetail.ui.dispOptions[$inMoreDetail.ui.selectedChartOrd][0].regionEnd == '동읍면'){
					isEndEmd = true;
				}				
			}catch(e){
				
			}
			
			if(!isEndEmd){
				for(var i = 0; i < emdList.length; i++) {
					emdOpt += "<option value=\""+emdList[i].emdong_cd+"\" data-coor-x=\""+emdList[i].x_coor+"\" data-coor-y=\""+emdList[i].y_coor+"\">"+emdList[i].emdong_nm+"</option>";
				}			
			}
			$("#sbx_emd").append(emdOpt);
		}else if(res.errCd == "-401") {
			//$statsMeMain.ui.alert(res.errMsg);
		}else{
			//$statsMeMain.ui.alert(res.errMsg);
		}
	}).fail(function (res) { // 실패
		//$statsMeMain.ui.alert(errorMessage);
	}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
		//$statsMeMain.ui.loading(false);
	});
}