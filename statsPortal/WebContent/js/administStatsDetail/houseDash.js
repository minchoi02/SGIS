/**
 * 행정통계시각화 메인
 *
 * history :
 * 2020.08.04			행정통계시각화 메인
 *
 *
 * author :
 * version : 1.0
 * see :
 *
 */

//bndYear = "2018";

(function(W, D) {
	W.$houseDash = W.$houseDash || {};
	
	//검색결과 완료여부
	$houseDash.searchDataFin = false;
	//$houseDash.searchParamReset = false;

	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$houseDash.isDev = true;
	$houseDash.isChange = true;
	$houseDash.areaMode = "";
	$houseDash.isContinue = true;
	/* 공공데이터 조회 변수*/
	$houseDash.org_id = "";
	$houseDash.tbl_id = "";
	$houseDash.kosis_data_item = "";
	$houseDash.kosis_data_period = "";
	$houseDash.kosis_data_year = "";
	$houseDash.gis_se = "";
	$houseDash.obj_var_id = "";
	$houseDash.field_id = "";
	$houseDash.kosis_data_item_detail = "";
	$houseDash.chartTitle = "";

	$houseDash.kosis_result_data = [];
	$houseDash.data = {};
	$houseDash.data.before = [];
	$houseDash.data.timeLine = [];
	$houseDash.ajax = {};
	$houseDash.ajax.params = {};
	$houseDash.chartItmClick = "";
	$houseDash.chartStackItmClick = "";
	$houseDash.timeLineChartItmClick = "";
	$houseDash.chartItmClick1 = "";
	//$houseDash.timeLineChartItmClick1 = "";
	$houseDash.chartItmClickName = "";
	//현재 조회하고있는 rank 지역 level
	$houseDash.regionLevel = 'sido';
	$houseDash.regionEnd = '';
	//행정시도 정보를 담아둔다
	$houseDash.atdrc = '';
	//비자치구에서 행정시로 이동여부
	$houseDash.upperBack = false;
	//연령분포 폴리곤 클릭 시 단위 변경을 위한 기준 변수
	$houseDash.polygonSelectArea = "";
	$houseDash.polygonSelectedAreaNm = "";
	$houseDash.polygonSelectArea1 = "";
	$houseDash.polygonSelectedAreaNm1 = "";
	$houseDash.ponconText = "";
	$houseDash.ponconText1 = "";
	$houseDash.mainChartItmClick = false;	
	$houseDash.areaChartItmClick = false;
	$(document).ready(function() {
/*		const H = Highcharts;
		  
		H.wrap(H.Tooltip.prototype, 'refresh', function (p, point, mouseEvents) {
			p.call(this, point, mouseEvents);
		    
			const label = this.label;

			if(label.text.textStr.indexOf("시도 평균") != -1) {
				$(label.element).children().css("stroke", "#FF0000");
				$(label.element).children().css("stroke-width", "3");
			} else {
				$(label.element).children().css("stroke", "#397e94");
				$(label.element).children().css("stroke-width", "1");
			}
			
			if($(label.element).parent().parent().parent().prop("id").indexOf("chartDiv") != -1) {
				$(label.element).parent().parent().find("span:eq(0)").css("top", "16px");
			}
		});*/
		
		$(document).on("click", ".panel-tit2", function(evnt){
			let toggleBtn = $(this).parent().find(".toggleBtn");
			if(toggleBtn.hasClass("on")) {
				toggleBtn.removeClass("on");
				toggleBtn.addClass("off");
			} else {
				toggleBtn.removeClass("off");
				toggleBtn.addClass("on");
			}
		});
		
		$(document).on("click", ".imgSaveBtn", function(evnt){
			var selId = $(this).parent().parent().parent().prop('id');//구조 변경으로 수정
			var tblNm = $("#" + selId).children(".panel-tit2").text();
			var chartId = "", highChartModal, selYear, selObj, chartTitle = "";
			/*
			if(selId != "panel1") {
				highChartModal = $(this).parent().parent().find("[id*=chart_]");
				for(var i=0; i<highChartModal.length; i++) {
					if(typeof $(highChartModal[i]).highcharts() == "object") {
						$(highChartModal[i]).highcharts().title.textSetter($houseDash.chartTitle);
						$(highChartModal[i]).highcharts().redraw();
					}
				}
			}
			*/
			
			//$(".ValueOnOff").removeClass("on");
			//$(".pieChartValue").hide();
			
			//$administStatsMain.ui.chartImageDown(selId, tblNm);
			
			if(selId == 'panel3' || selId == 'panel2' || selId == 'panel1'){
				$administStatsMain.ui.exportingChart(selId, true);
			}else if (selId == 'panel4'){
				$administStatsMain.ui.chartImageDown(selId, tblNm);
			}
			
		});
		
		$(document).on("click", ".prevImgSaveBtn", function(evnt){
			let selId = "#chartDiv .highcharts-container";
			$administStatsMain.ui.chartImageDown(selId, $commonChart.chartTitle);
		});
		
		$(document).on("click", "#mapRank", function(evnt){
			if($administStatsMap.ui.mapRegion == "sido"){
				$("#RankArea").text('전국 시도 '+sidoValuesDesc.length+'개 중');
			}else if($administStatsMap.ui.mapRegion == "sgg"){
				$("#RankArea").text($("#modalSearchArea option:selected").text().replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
						.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남") + " "
					+sidoValuesDesc.length+'개 중');
			}
			
			if($('.modal-location').css('display') == 'block') {
				$('.modal-location').css('display', 'none');
			} else {
				$("#area_name").text("전국");
				if(chartMode == "sido") {
					$("#RankArea").text("시도" + sidoValues.length + "개 중");
				} else {
					$("#RankArea").text("시군구" + sidoValues.length + "개 중");
				}
				$("#RankText").text("선택");
				$('.modal-location').css('display', 'block');
			}
		});
		
		// 차트 이미지 저장
		$(document).on("click", "[name=chartBtn]", function(evnt){ 
			
			var selId = $(this).parent().parent().parent().prop('id');
			
			if(selId == "corpCountOfIndustryDiv"){
				highChartModal($ecnmyDash.currentData.corpCountOfIndustry, $ecnmyDash.ui.dispOptions[1]);
			}
			else if(selId == "workerCountOfIndustryDiv"){
				highChartModal($ecnmyDash.currentData.workerCountOfIndustry, $ecnmyDash.ui.dispOptions[2]);
			}
			else if(selId == "salesOfIndustryDiv"){
				highChartModal($ecnmyDash.currentData.salesOfIndustry, $ecnmyDash.ui.dispOptions[3]);
			}
			else if(selId == "profitRatioOfIndustryDiv"){
				highChartModal($ecnmyDash.currentData.profitRatioOfIndustry, $ecnmyDash.ui.dispOptions[4]);
			}
		});
		
		$(document).on("click", "#chartValue", function(){
			if($(".ValueOnOff").hasClass("on")){
				$(".ValueOnOff").removeClass("on");
				$(".pieChartValue").hide();
				$("#chartDiv .highcharts-data-labels").fadeOut();
			} else {
				$(".ValueOnOff").addClass("on");
				$(".pieChartValue").show();
				$("#chartDiv .highcharts-data-labels").fadeIn();
			}
		});
		
		$(document).on("change, mouseup", "#rankRange", function(e) {
			$("#Rank").val(this.value);
			$("#RankText").text(this.value+"위");
			if(chartMode == "sido") {
			$("#RankArea").text($("#modalSearchArea option:selected").text().replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
					.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남")
						+ " 시도 "+ sidoValuesDesc.length + "개 중 ");
				$("#area_name").text($houseDash.rankArea[this.value-1].name.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
						.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남") + ": ");
			} else {
				$("#RankArea").text($("#modalSearchArea option:selected").text().replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
						.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남")
					+ " 시군구 "+ sidoValuesDesc.length + "개 중 ");
			$("#area_name").text($houseDash.rankArea[this.value-1].name.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
					.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남") + ": ");
			}
			$administStatsMain.ui.loading(true);
			
			$administStatsMain.ui.selectedArea = $houseDash.rankArea[this.value-1].id;
			$houseDash.polygonSelectArea = $houseDash.rankArea[this.value-1].id;
			$houseDash.polygonSelectedAreaNm = $("#modalSearchArea option:selected").text() + " " + $houseDash.rankArea[this.value-1].name;
				
				
				
			$administStatsMap.ui.map.setPolyLayerHighlight($houseDash.rankArea[this.value-1].id);
			$administStatsMap.ui.mapToggleId = $houseDash.rankArea[this.value-1].id;
			
				setTimeout(function() {
				getChartsData($("#modalSearchTitle option:selected").val()
						, $("#modalSearchYear option:selected").val()
						, $("#modalSearchTitle option:selected").data('item_id')
						, $("#modalSearchTitle option:selected").data('region_var_ord')
						, $("#modalSearchTitle option:selected").data('obj_var_id')
						, $("#modalSearchTitle option:selected").data('disp_obj_var_id')
						, $("#modalSearchTitle option:selected").data('var_ord')
						, $houseDash.rankArea[$("#rankRange").val()-1].id, '', '');
			}, 10);
			
		});
		
		$(document).on("change", "#modalSearchArea", function() {
			$administStatsMain.ui.loading(true);
			$administStatsMain.ui.selectedArea = this.value;
			$houseDash.polygonSelectArea = this.value;
			$houseDash.polygonSelectedAreaNm = $(this).find("option:selected").text();
			$houseDash.event.clearSelection();
			
			var chartOrd = $("#modalSearchTitle option:selected").val();
			var year = $("#modalSearchYear option:selected").val();
			var item_id = $("#modalSearchTitle option:selected").data('item_id');
			var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
			var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
			var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
			var var_ord = $("#modalSearchTitle option:selected").data('var_ord');

			var region_code = $administStatsMain.ui.selectedArea;
			
			//if($("#modalSearchTitle option:selected").text().indexOf($(".toggle.on").text().replace('전체', '').trim()+' 특성별') > -1){
			var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
			if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
			 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
			  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
			   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
			    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
			     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
			   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
			       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
				    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
				region_code = "2"+ region_code;
			}
			
			$administStatsMain.ui.logWrite( $("#modalSearchTitle option:selected").text(), "02", region_code ); //jrj 로그 [지역선택]
			
			if($("#mapRgn_2").is(":visible")){
				$administStatsMap.ui.isLoading = true;
			}else{
				$administStatsMap.ui.isLoading = false;
			}
			
			$houseDash.isChange = true;
			
			setTimeout(function() {
				getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code);
				
				$administStatsMain.ui.getSidoSggPos($administStatsMain.ui.selectedArea);
				let regionCd = $administStatsMain.ui.selectedArea;
				
				let sggZoom = 0;
				if(regionCd == '11' || regionCd == '21' ||
					regionCd == '24' || regionCd == '25' || regionCd == '29'){
					// 서울(11), 부산(21), 광주(24), 대전(25), 세종(29)
					sggZoom = 5;
				} else if(regionCd == '39' || regionCd == '22' || regionCd == '26') {
					// 제주(39), 대구(22), 울산(26)
					sggZoom = 4;
				} else if(regionCd == '31' || regionCd == '33' ||
						regionCd == '34' || regionCd == '35' || regionCd == '36' || regionCd == '38' || regionCd == '23') {
					// 경기(31),  충북(33), 충남(34), 전북(35), 전남(36), 경남(38), 인천(23)
					sggZoom = 3;
				} else if(regionCd == '32' || regionCd == '37') {
					// 강원(32), 경북(37)
					sggZoom = 2;
				} else {
					sggZoom = 1;
				}
				
				let xcoor = $("#dash_sido option[value=" + regionCd + "]").attr("data-coor-x");
				let ycoor = $("#dash_sido option[value=" + regionCd + "]").attr("data-coor-y");
				
				if(regionCd == "00") {
					xcoor = 982682;
					ycoor = 1744189;
				}
				if($houseDash.isContinue) {
				$administStatsMap.ui.map.mapMove([xcoor, ycoor], sggZoom, true);
					$("#rankRange").val(1);
					$("#area_name").text($("#modalSearchArea option:selected").text().replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
							.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남") + " ");
					$("#RankArea").text(' 시군구 '+sidoValuesDesc.length+'개 중');
					$("#RankText").text(" 선택");
				}
			}, 100);
		});
	});
	//ready 끝
	
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});

	$(window).resize( function() {});

	$houseDash.const = {},

	$houseDash.ui = {
		//selectedArea : '', // 선택한 지역
		//데이터
		administStatsInfoData : {}, // 행정통계 시각화 정보 저장

		/**
		 * @name         : init
		 * @description  : 최초 화면을 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 :
		 */
		init : function(){
			$administStatsMain.ui.chartSaveClear();
			// 2021.08.31[hjh] 기본값 중∙장년층 인구수
			$administStatsMap.ui.selectedParams = {
				surv_year_list : $administStatsMain.ui.selectedYear
				, org_id_list: "101"							// 조직번호
				, tbl_id_list: "DT_1OH0501"						// 통계표 ID
				, list_var_ord_list: "" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
				, prt_type: ""								// 출력방식 total:계 else 모두
				, char_itm_id_list: "T001,T002,T003,T004"						// 표특성항목
				, adm_cd: ""								// 지역코드
				, ov_l1_list : "up:00"
				, ov_l2_list : ""
				, ov_l3_list: ""								// 항목 3
				, ov_l4_list: ""								// 항목 4
				, ov_l5_list: ""								// 항목 5
				, category: "ecnmy"								// 카테고리
				, orderby: "PRD_DE"
			};
			$administStatsMap.ui.selectedUnit = "호";
			$administStatsMap.ui.selectedKey = "OV_L2_ID";
			$administStatsMap.ui.selectedCallback = undefined;

			//$administStatsMain.ui.removeContent();
			$administStatsMain.ui.appendContent("/view/administStatsDetail/houseDash/main");
		},

		ready : function(){
			//[조규환] 검색레이어 이벤트 [S]
			$(".searchLayer").fadeOut();
			$('.searchInput').val('');
			//검색 레이어
			$('.searchInput').click(function(){
				$(".searchLayer").fadeIn();
			});
			$('.searchClose').click(function(){
				$(".searchLayer").fadeOut();
			});
			$('.searchbox').mouseleave(function(){
				$(".searchLayer").fadeOut();
			});
			//[조규환] 검색레이어 이벤트 [E]
			var level = "";
			
			$administStatsMain.ui.loading(true);
			
			if($administStatsMain.ui.selectedArea=="" || $administStatsMain.ui.selectedArea=="00" || $administStatsMain.ui.selectedArea=="99"){ //20201104 박은식 화면 초기화 시 조건 추가.
				$administStatsMain.ui.selectedArea = "00";
				$administStatsMain.ui.selectedLevel = "0"; // 2020-11-02 [곽제욱] url paramter 추가로 인한 selectedLevel 세팅
			}
			// 2020-11-02 [곽제욱] url parameter 추가로 인한 로직 START
			if(gv_sido_cd!=null&&gv_sido_cd!=""){
				$administStatsMain.ui.selectedLevel = "1";
				if(gv_sgg_cd!=null&&gv_sgg_cd!=""){

					$.ajax({
						method: "POST",
						async: false,	// 반드시 동기처리 해야 함
						url: contextPath + "/ServiceAPI/administStats/common/getAtdrcCheck.json",
					    data: {year:$administStatsMain.ui.selectedYear, region_cd:gv_sido_cd+gv_sgg_cd.substring(0,2)+"0"},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$administStatsMap.ui.isAtdrc = res.result.rslt;
						}
					});

					$administStatsMain.ui.selectedLevel = "2";
					//$administStatsMain.ui.getSidoSggPos(gv_sido_cd+gv_sgg_cd);
					
					if($("#mapRgn_2").is(":visible")){
						if($administStatsMap.ui.curMapId == 1){
							$administStatsMap.ui.mapToggleId1 = gv_sido_cd+gv_sgg_cd;
						}else if($administStatsMap.ui.curMapId == 0){
							$administStatsMap.ui.mapToggleId = gv_sido_cd+gv_sgg_cd;
						}
					}else{
						$administStatsMap.ui.mapToggleId = gv_sido_cd+gv_sgg_cd;
					}
					
					//$administStatsMap.ui.mapToggleId = gv_sido_cd+gv_sgg_cd;
					$("#dash_sido").val(gv_sido_cd);
				} else {
					$administStatsMain.ui.getSidoSggPos(gv_sido_cd);
				}
				//$(".Rangecontainer").css("display", "inline-block");
				$administStatsMain.ui.selectedArea = gv_sido_cd + gv_sgg_cd;
			}
			$administStatsMap.ui.selectedSurvId = "PH0001";
			$administStatsMap.ui.selectedItmCd = "T100";
			// 2020-11-02 [곽제욱] 시도, 시군구, 행정시 랭킹 가져오기 START

			createStatsItemList();

			$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1")			/**
			if(!$('.accordion-li:first button').is('.on')){
				$('.accordion-li:first button').click();
			}
			*/



			//createCharts('DT_1OH0501', '2019');

			$administStatsMain.ui.selectedThema = $("#leftMenu #gnb .thema.current").text();
		},

		/**
		 * @name         : clear
		 * @description  : 인구행정통계 depth 변화시마다 화면 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 :
		 */
		clear : function(){
			$administStatsMain.ui.chartSaveClear();

			$("#houseHavePeopleChart1").empty();
			$("#houseHavePeopleChart2").empty();
			$("#houseHavePeopleChart3").empty();
			$("#houseHavePeopleChart4").empty();
			$("#houseHavePeopleChart5").empty();
			$("#houseHavePeopleChart6").empty();
			$("#houseHavePeopleChart7").empty();
			$("#houseHavePeopleChart8").empty();

		},

		drawContent : function(surv_id, itm_cd, c1, c2){
			
			if(surv_id == null|| surv_id == "" || surv_id == undefined){
				$administStatsMap.ui.selectedSurvId = "PH0001"; // 인구같은경우 디폴트
			} else {
				$administStatsMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트

			}

			if(itm_cd==null||itm_cd==""||itm_cd==undefined){
				$administStatsMap.ui.selectedItmCd = "T100";
			} else {
				$administStatsMap.ui.selectedItmCd = itm_cd;
			}

			$administStatsMap.ui.selectedC1 = c1;

			$administStatsMap.ui.selectedC2 = c2;

			if($administStatsMain.ui.selectedArea.length==2){
				$administStatsMapnoReverseGeoCode = true;
				if($administStatsMap.ui.map==null || $("#mapRgn_3").html() == ""){ // 20201104 박은식 같은 대시보드 매뉴를 다시 클릭시 맵을 다시그려주기 위해 조건문 추가
					$("#mapRgn_3").show();
					$administStatsMap.ui.createMap("mapRgn_3", 0);
					//$("#mapRgn_3").css("height", "560px"); 2020-11-02 [곽제욱] 주석 처리
				}
				
				if('none' != $("#mapRgn_2").css('display')){
					if ($("#mapRgn_2").html() == "") {
						$("#mapRgn_2").show();
						$administStatsMap.ui.createMap("mapRgn_2", 0);
					}
				}

				/**
				if($administStatsMain.ui.selectedArea == "00"){
					$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
				//} else if($administStatsMap.ui.mapToggleId != ""){
				} else if(($administStatsMap.ui.curMapId == 0 && $administStatsMap.ui.mapToggleId != "") || ($administStatsMap.ui.curMapid == 1 && $administStatsMap.ui.mapToggleId1 != "") ){
					$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
				} else {
					$administStatsMap.ui.drawMapData("sgg", "color"); // 맵
				}
				*/
				//$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
			} else {
				if($administStatsMap.ui.map==null || $("#mapRgn_3").html() == ""){ // 2020-11-10 [곽제욱] 맵 create 조건 추가
					$("#worldMap").hide();
					$("#mapRgn_3").show();
					$administStatsMap.ui.createMap("mapRgn_3", 0);
				}
				
				if('none' != $("#mapRgn_2").css('display')){
					if ($("#mapRgn_2").html() == "") {
						$("#mapRgn_2").show();
						$administStatsMap.ui.createMap("mapRgn_2", 0);
					}
				}
				
				$administStatsMap.ui.drawMapData("sgg", "color"); // 맵
			}
			/*if($administStatsMap.ui.map!=null) {
				$administStatsMap.ui.map.update();
			}*/
			
			for (var i=0; i<$administStatsMap.ui.mapList.length; i++) {
				if ($administStatsMap.ui.mapList[i] != null) {
					$administStatsMap.ui.mapList[i].update();
				}
			}
			
			//첫 로딩시 시도별 신혼부부 총괄 조회
			//조규환 timeout 시간 300 -> 500으로 수정 
			setTimeout(function() {
				$(".toggle.on").next().find('a')[0].click();
				setTimeout(function() {
					modalSearchBtn();
				},500);	
			},500);
		},

		// 행정통계 시각화 정보 조회
		searchAdministStatsInfo : function(survId){

			if(survId == null) survId = "PH0001";

			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/administStats/common/getAdministStatsInfo.json",
				data: {"survId": survId}, // 임시
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {

						// 행정통계시각화정보
						var administStatsInfo = res.result.administStatsInfo;
						$houseDash.ui.administStatsInfoData = administStatsInfo;

						// 기존 맵데이터 클리어
						//$administStatsMap.ui.map.clearDataOverlay();
						$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].clearDataOverlay();

						getKosisDetailOption(administStatsInfo);
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
		},

		/**
		 *
		 * @name         : getRankSet
		 * @description  : 슬라이드 변경 시 rank 조회
		 * @date         : 2020.09.08
		 * @author	     : 박은식
		 * @history 	 :
		 * @parameter	 rank	: 슬라이드 rank
		 * 				 target	: 총인구, 남녀 비율, 외국인 중 1택
		 */
		getRankSet : function(rank, target, regionCd) {
		},

		/**
		 *
		 * @name         : rankSlideRender
		 * @description  : 슬라이드 값 셋팅 및 background 처리
		 * @date         : 2020.09.09
		 * @author	     : 박은식
		 * @history 	 :
		 * @parameter	 regionCd	: 지역 code
		 * 				 totalRank	: 총인구 rank
		 * 				 genderRank : 남녀 성비 rank
		 * 				 foreignRank: 외국인 rank
		 */
		rankSlideRender : function(regionCd, totalRank, genderRank, foreignRank, toggleId) {
		},

		/**
		 *
		 * @name         : rankSlideInit
		 * @description  : 슬라이드 초기화
		 * @date         : 2020.09.09
		 * @author	     : 박은식
		 * @history 	 :
		 * @parameter
		 */
		rankSlideInit : function(){
		},

		/**
		 *
		 * @name         : upperRegionCheck
		 * @description  : 현재 위치의 상위 지역정보가 비자치구를 포함한 행정시인지 체크하기 위한 함수
		 * @date         : 2020.09.16
		 * @author	     : 박은식
		 * @history 	 :
		 * @parameter
		 */
		upperRegionCheck : function(year, regionCd){

			if(year != null && year != '' && year != undefined &&
			   regionCd != null && regionCd != '' && regionCd != undefined){
				upperRegCd = regionCd.substring(4,0) + '0';

				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/administStats/houseDash/getUpperRegionCheck.json",
					data: {year : year, regionCd : regionCd, upperRegCd : upperRegCd},
					dataType: "json",
					success: function(res) {
						if(res.result.cnt[0].cnt < 1){
							upperRegCd = '';
						}
					},
					error: function(){

					}
				})
			}
			return upperRegCd;
		},

		/**
		 *
		 * @name         : chartMouseOver
		 * @description  : 차트 아이템 mouse over 시 함수
		 * @date         : 2020. 09. 21
		 * @author	     : 곽제욱
		 * @history 	 :
		 */
		chartMouseOver : function(obj, color){
			// 차트선택여부가 N일 경우에만 선택항목 색 저장
        	if($administStatsMap.ui.chartToggleYn=="N"){
        		$administStatsMain.ui.selectedTempColor = obj.attr("fill");
        	}
        	// 차트 mouseOut 시 리턴하기 위한 over항목 색 저장
        	$administStatsMain.ui.tempColor = obj.attr("fill");
        	obj.attr("fill", color);
		},

		/**
		 *
		 * @name         : chartMouseOut
		 * @description  : 차트 아이템 mouse out 시 함수
		 * @date         : 2020. 09. 21
		 * @author	     : 곽제욱
		 * @history 	 :
		 */
		chartMouseOut : function(obj, color){
			if($administStatsMap.ui.selectedObj[0] != obj[0]){
	    		if($administStatsMap.ui.chartToggleYn == "Y"){
	    			obj.attr("fill", $administStatsMain.ui.tempColor);
	    		} else {
	    			obj.attr("fill", $administStatsMain.ui.selectedTempColor);
	    		}
	    	} else if($administStatsMap.ui.selectedObj[0] == obj[0]){
	    		obj.attr("fill", color);
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
		chartItmClick : function(obj, d, color, contents){
			//20210222 박은식 행정통계인구 경계 연도 선택이후 처리 로직 START
			if(d.surv_year == undefined || d.surv_year == null | d.surv_year == ""){
				for(var i=0; i < $(".yearBtn").length; i++){
				    if($(".yearBtn").eq(i).hasClass("on")){
				    	$administStatsMain.ui.selectedYear = $(".yearBtn").eq(i).text();
				    }
				}
			} else {
				$administStatsMain.ui.selectedYear = d.surv_year;
			}
			//20210222 박은식 행정통계인구 경계 연도 선택이후 처리 로직 END
			// 선택한 레벨이 3이 아닐경우
			if($administStatsMain.ui.selectedLevel != 3){
				// 선택한 obj와 이전에 선택한 obj가 다를 경우
				if(obj[0] != $administStatsMap.ui.selectedObj[0]){
					// 이전에 선택한 오브젝트의 색 변경(이전선택 오브젝트가 없을경우 pass
					if($administStatsMap.ui.selectedObj[0] != "" && $administStatsMap.ui.selectedObj[0] != null){
						$administStatsMap.ui.selectedObj.attr("fill", $administStatsMain.ui.selectedTempColor)
					}
					// 타일맵 변경여부 N
					$administStatsMain.ui.tileChangeYn = "N";
					// 맵 그리기

					/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $administStatsMain.ui.selectedArea.substring(0,4)+"0";
		    		$administStatsMap.ui.checkIsAtdrc(tempRegionCd);
		    		if($administStatsMap.ui.isAtdrc){
		    			//$administStatsMap.ui.mapToggleId = "";
						if($("#mapRgn_2").is(":visible")){
							if($administStatsMap.ui.curMapId == 1){
		    					$administStatsMap.ui.mapToggleId1 = "";
							}else{
		    					$administStatsMap.ui.mapToggleId = "";
							}
						}else{
		    				$administStatsMap.ui.mapToggleId = "";
						}
		    		}
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */

					$houseDash.ui.drawContent(d.surv_id, d.itm_cd, d.c1, d.c2); // 2020
					// 차트 토글여부 Y
					$administStatsMap.ui.chartToggleYn = "Y";
					// 현재 선택한 오브젝트를 변수에 저장
					$administStatsMap.ui.selectedObj = obj;
					// 현재 선택한 오브젝트의 색 변경
					obj.attr("fill", color);
					// 선택한 아이템이 변경되면서 선택한 아이템의 색상도 변경처리
					$administStatsMain.ui.selectedTempColor = $administStatsMain.ui.tempColor;
					var title = "";
					title += contents;
					$("#itmDiv").css("display", "inline");
					$("#itmDiv").html(title );
				} else {
					//20210222 박은식 행정통계인구 경계 연도 선택이후 처리 로직 START
					if(obj.attr("id") == "totalPopulation"){
						for(var i=0; i < $(".yearBtn").length; i++){
						    if($(".yearBtn").eq(i).hasClass("on")){
						    	$administStatsMain.ui.selectedYear = $(".yearBtn").eq(i).text();
						    }
						}
					}
					//20210222 박은식 행정통계인구 경계 연도 선택이후 처리 로직 END
				//20201014 박은식 chartSelectedSave function parameter 초기화 START
					$administStatsMain.ui.chartTarget = "";
		    		$administStatsMain.ui.chartIndex = "";
		    		$administStatsMain.ui.chartData = "";
		    		$administStatsMain.ui.chartColor = "";
		    		$administStatsMain.ui.chartTitle = "";
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $administStatsMain.ui.selectedArea.substring(0,4)+"0";
		    		$administStatsMap.ui.checkIsAtdrc(tempRegionCd);
		    		if($administStatsMap.ui.isAtdrc){
		    			//$administStatsMap.ui.mapToggleId = "";
		    			if($("#mapRgn_2").is(":visible")){
							if($administStatsMap.ui.curMapId == 1){
		    					$administStatsMap.ui.mapToggleId1 = "";
							}else{
		    					$administStatsMap.ui.mapToggleId = "";
							}
						}else{
		    				$administStatsMap.ui.mapToggleId = "";
						}
		    		}
		    		$administStatsMain.ui.tileChangeYn = "N";
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */
					$houseDash.ui.drawContent("PH0001", "T100", "");
					if($administStatsMain.ui.chartColor != ""){
						obj.attr("fill", $administStatsMain.ui.chartColor);
					} else {
						obj.attr("fill", $administStatsMain.ui.selectedTempColor);
					}
					//20201014 박은식 chartSelectedSave function parameter 초기화 및 색상 처리 조건추가 초기화 END
		    		$administStatsMap.ui.chartToggleYn = "N";
		    		$administStatsMap.ui.selectedObj = "";
		    		$("#itmDiv").css("display", "none");
		    		$("#itmDiv").html("");
				}
			}
		},
		/**
		 *
		 * @name         : createChartTool
		 * @description  : 테이블 생성
		 * @date         : 2020. 09. 22
		 * @author	     : 박은식
		 * @history 	 :
		 * @param 	 year: 해당 연도
		 * 		    title: 해당 타이틀
		 * 		 standard: 구분
		 * 			 data: 수치값
		 * 			 unit: 단위
		 * 		   target: chart에 선언된 툴팁
		 * 				x: 툴팁 x좌표
		 * 				y: 툴팁 y좌표
		 */
		createChartTool : function(year, title, standard, data, unit, target, x, y){
		/** 2020-10-07 [곽제욱] 툴팁 수정 START */
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
				// 2020-12-10 [곽제욱] y좌표가 맵 밖으로 이동하는 오류 수정 START
				if(d3.event.pageY+y < 2){
					$(target).css("top", "2px")
				} else {
					$(target).css("top", d3.event.pageY + y + "px")
				}
				// 2020-12-10 [곽제욱] y좌표가 맵 밖으로 이동하는 오류 수정 END
			} else {
				$(target).css("left", d3.event.pageX + x + "px")
				// 2020-12-10 [곽제욱] y좌표가 맵 밖으로 이동하는 오류 수정 START
				if(d3.event.pageY+y < 2){
					$(target).css("top", "2px")
				} else {
					$(target).css("top", d3.event.pageY + y + "px")
				}
				// 2020-12-10 [곽제욱] y좌표가 맵 밖으로 이동하는 오류 수정 END
			}
			$(target).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year+ "년 "+ title.replace('(명)', '').replace('-', ' ').replace('_', ' ') + standard + "</p>" + "<p style='color:"+((data > 0) ? "#ec2828" : "#0982d8")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ data + "</p>" + unit);//20201202 박은식 증가 감소에 따른 색상 변경
		}
		/** 2020-10-07 [곽제욱] 툴팁 수정 END */
	};


	// KosisDetailOption 조회
	/**
	 *
	 * @name         : getKosisDetailOption
	 * @description  : obj_var_id, field_id 가져오기
	 * @date         : 2015. 12. 03
	 * @author	     : 석진혁
	 * @history 	 :
	 */
	function getKosisDetailOption(administStatsInfo){

		var title = administStatsInfo[0].surv_nm;
		var gis_se = "";
		if(administStatsInfo[0].region_ctgry_end == "시도"){
			gis_se = 1;
		}
		else if(administStatsInfo[0].region_ctgry_end == "시군구"){
			gis_se = 2;
		}
		else if(administStatsInfo[0].region_ctgry_end == "읍면동"){
			gis_se = 3;
		}

		var surv_url = administStatsInfo[0].surv_url;
		var tmp = surv_url.split("=");

		$houseDash.org_id = tmp[1].split("&")[0];
		$houseDash.tbl_id = tmp[2].split("&")[0];

		if(!$houseDash.isDev){

			var kosisDetailOption = new kosis.serviceApi.kosisDetailOption.api();
			kosisDetailOption.addParam("org_id", $houseDash.org_id);
			kosisDetailOption.addParam("list_id", $houseDash.tbl_id);

			kosisDetailOption.addParam("title", decodeURI( title ));
			kosisDetailOption.addParam("gis_se", gis_se);

			kosisDetailOption.request({
				method : "GET",
				async : false,
				url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do",

				options : administStatsInfo
			});
		}
		else{
			//url 파라미터 세팅
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do";
			lv_url += "?org_id="+ $houseDash.org_id;
			lv_url += "&list_id="+ $houseDash.tbl_id;
			lv_url += "&title=" + decodeURI( title );
			lv_url += "&gis_se="+ gis_se;

			console.log("lv_url = " + lv_url);

			// ajax 시작
			$.ajax({
			    url: lv_url,
			    type: 'get'
			}).done(function (res) { // 완료
				console.log("res = " + JSON.stringify(res));
				var resultData = res.result.kosis_detail_option;
				console.log("obj_var_id = " + resultData[0].obj_var_id + ", field_id = " + resultData[0].field_id);

				$houseDash.obj_var_id = resultData[0].obj_var_id;
				$houseDash.field_id = resultData[0].field_id;

				// 데이터 조회
				getKosisDataList();

			}).fail(function (res) { // 실패
				//$statsMeMap.ui.alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//콜백함수 호출
		    	if(typeof p_callback === "function") {
					p_callback();
				}
			});
		}
	}


	// 일단 패스..
	/**
	 *
	 * @name         : getKosisStaticDataField
	 * @description  : 선택된 항목의 고정적인 세부조건 조회
	 * @date         : 2014. 10. 10
	 * @author	     : 석진혁
	 * @history 	 :
	 */
	function getKosisStaticDataFieldForSearchList (options) {
		var kosisStatsStaticField = new kosis.serviceApi.KosisDataStaticFieldsForSearchList.api();
		kosisStatsStaticField.addParam("org_id", interactiveMapKosis.org_id);
		kosisStatsStaticField.addParam("tbl_id", interactiveMapKosis.tbl_id);
		kosisStatsStaticField.addParam("obj_var_id", interactiveMapKosis.kosis_obj_var_id);
		kosisStatsStaticField.request({
			method : "GET",
			async : false,
			url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataStaticFields.do",
			options : options
		});
	}

	/**
	 *
	 * @name         : getKosisDataList
	 * @description  : 최종 데이터 조회
	 * @date         : 2014. 10. 10
	 * @author	     : 석진혁
	 * @history 	 :
	 * @param params : 선택된 항목의 결과를 조회하기 위한 parameters
	 * @param zoom   : 제공되는 레벨로 이동하기 위한 지도 줌 레벨 ( 시도 / 시군구 / 읍면동 )
	 * @param gisSe  : 버튼 드래그&드롭 으로 얻은 행정구역 코드
	 * @param atdrc_yn : 자치구경계 유무
	 */
	function getKosisDataList(params, zoom, gisSe, atdrc_yn, map) {

		//var map = $administStatsMap.ui.map;

		if(!$houseDash.isDev){
			// 운영 호출
		}
		else{
			//var map = $administStatsMap.ui.map;
			var map = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId];
			map.selectedBoundMode = "multi";

			//url 파라미터 세팅
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
			lv_url += "?org_id="+ $houseDash.org_id;
			lv_url += "&tbl_id="+ $houseDash.tbl_id;
			lv_url += "&kosis_data_item_detail=" + "%20";
			lv_url += "&kosis_data_item=" + "T100";
			lv_url += "&kosis_data_period=" + "Y";
			lv_url += "&kosis_data_year=" + "2015";
			// 선택된 구(5자리)로 설정
			console.log("$administStatsMain.ui.selectedArea = " + $administStatsMain.ui.selectedArea);
			if($administStatsMain.ui.selectedArea != null && $administStatsMain.ui.selectedArea.length == 5){
				lv_url += "&gis_se="+ $administStatsMain.ui.selectedArea;
			}
			else{
				lv_url += "&gis_se="+ "25030";
			}
			lv_url += "&obj_var_id=" + $houseDash.obj_var_id;
			lv_url += "&field_id=" + $houseDash.field_id;

			console.log("lv_url = " + lv_url);


			// 맵 zoom 설정
			var admCd = $administStatsMain.ui.selectedArea;
			$("#dash_sgg").val(admCd.substring(2,5));
			console.log("admCd = " + admCd);
			console.log("dash_sgg = " + admCd.substring(2,5));

			var xcoor = 0;
			var ycoor = 0;
			// 경기도 수원시
			xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
			ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
			if(xcoor == undefined && ycoor == undefined){
				commonAdministStats_alert("KOSIS 지역정보 정보가 없는 시도입니다.", "");
				return false;
			}
			else{
				var center =[xcoor, ycoor];
				//$administStatsMap.ui.map.mapReload(center, 6);
				$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapReload(center, 6);
			}


			// ajax 시작
			$.ajax({
			    url: lv_url,
			    type: 'get'
			}).done(function (res) { // 완료
				console.log("[getKosisDataList] res = " + JSON.stringify(res));
				var result = res.result.kosisData;

				var isResult = false;

				console.log("getKosisDataList result size = " + result.length);
				/**
				 *  조회된 코드가 읍면동 인지 확인한다. 읍면동정보가 없을시 시군구 정보를 넘겨줌.
				 */
				if(result.length > 0){
						// CODE 확인
						if((result[0].CODE).length == 2){
							commonAdministStats_alert("조회된 정보가 없습니다.")
							return false;
						}
						else if((result[0].CODE).length > 5){
							if((result[0].CODE).startsWith(admCd)){
								isResult = true;
								// 개방형지도란 버튼 활성화
								//$(".mapInfo").show(); // 2020-11-03 [곽제욱] 개방형지도 버튼 삭제

							}
							else{
								commonAdministStats_alert("조회된 정보가 없습니다.");
								return false;
							}
						}
				}

				// 정상적인 데이터 일때 지도에 표출
				if(isResult){
					//kosis데이터 정렬
					if (result != null && result.length > 0) {
						result = result.sort(function(a,b) {
							return parseFloat(b.DATA)-parseFloat(a.DATA)
						});
					}

					//소수점 2자리로 고정
					for (var i=0; i<result.length; i++) {

						if(result[i].DATA == null){
							result[i].DATA = 0;
						}

						// CODE -> adm_cd
						result[i].adm_cd = result[i].CODE;

						//result[i].kosis = true;
						result[i].DATA = parseFloat(result[i].DATA).toFixed(2);

						result[i].data = parseFloat(result[i].DATA).toFixed(2);
					}

					$houseDash.kosis_result_data = [];
					$houseDash.kosis_result_data = result;

					//경계고정일 경우,
					//기존 로직을 타지않고, multiLayerControl 로직을 탄다.
					if (map.selectedBoundMode == "multi") {
						setKosisStatsData(map, "options");
						map.multiLayerControl.clear();
						if (map.geojson != null) {
							map.geojson.remove();
							map.geojson = null;
						}
						map.multiLayerControl.multiData = [];
						map.multiLayerControl.dataGeojson = [];

						var tmpData = [];
						tmpData[0] = [];
						for (var i=0; i<result.length; i++) {
							tmpData[0].push(parseFloat(result[i].DATA));
						}


						setLegendForKosisStatsData(tmpData);
						for (var i=0; i<result.length; i++) {
							map.multiLayerControl.reqBoundary(result[i].CODE, result[i], atdrc_yn, function(res) {
								var geoData = combineKosisStatsData(res);
								//$administStatsMap.ui.map.setPolygonDataGeojson(geoData);
								$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolygonDataGeojson(geoData);
								map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(geoData, "data"));
							});
						}

						// zoom 레벨 변경 6
						//$administStatsMap.ui.map.setZoom(6);
						//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setZoom(6);
					}else {
						map.clearDataOverlay();
						// 테스트중
						setKosisStatsData(map, "options");
						if (atdrc_yn == "1") {
							map.isNoReverseGeocode = true;
							map.multiLayerControl.autoDownBoundary();
							map.openApiBoundaryHadmarea(options.adm_cd, map.bnd_year, map.boundLevel, "1");
						}else {
							map.autoDownBoundary();
						}
					}
				}


			}).fail(function (res) { // 실패
				//$statsMeMap.ui.alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//콜백함수 호출
		    	if(typeof p_callback === "function") {
					p_callback();
				}
			});

		}
	}


	/**
	 *
	 * @name         : setKosisStatsData
	 * @description  : 지도 경계 데이터에 조회한 결과 데이터를 합성하기 위한 구분자 삽입
	 * @date         : 2014. 10. 10
	 * @author	     : 석진혁
	 * @history 	 :
	 */
	function setKosisStatsData(receiveMap, logOptions) {
		if(this.map == null || this.map == undefined) {
			this.map = receiveMap;
		}
		this.map.data = [];

		var tempData = {};
		tempData.kosis = true;
		this.map.data.push(tempData);

		this.map.data.push($houseDash.kosis_result_data);
		this.map.dataType = "kosis";
		this.map.dataForCombine = $houseDash.kosis_result_data;

		var yearArr = [];
		var options = $('#bndYear option');
		var values = $.map(options ,function(option) {
			yearArr.push(option.value);
		});

		var yearMax = Math.max.apply(null, yearArr);
		var yearMin = Math.min.apply(null, yearArr);

		var year = $houseDash.kosis_data_year;
		if(year.length > 4) {
			year = year.substring(0, 4);
		}

		// 2016. 03. 23 j.h.Seok 수정
		if(year < 2000) {
			year = 2000;
		} else if(year > bndYear) {
			year = bndYear;
		}

		this.map.bnd_year = year;

	}

	/**
	 *
	 * @name         : setLegendForKosisStatsData
	 * @description  : 범례 생성을 위한 최소/최대 값 및 값의 영역 정의
	 * @date         : 2014. 10. 10
	 * @author	     : 석진혁
	 * @history 	 :
	 * @param arData : 합성된 경계 및 데이터 Object
	 */
	function setLegendForKosisStatsData(arData) {
		this.map.legend.valPerSlice = this.map.legend.calculateLegend(arData);
	}


	/**
	 *
	 * @name         : combineKosisStatsData
	 * @description  : 지도 경계 데이터에 조회한 결과 데이터 합성
	 * @date         : 2014. 10. 10
	 * @author	     : 석진혁
	 * @history 	 :
	 * @param boundData: 해당 레벨의 경계데이터
	 */
	function combineKosisStatsData(boundData) {
		var tempData = this.map.data[1];
		var arData = new Array();
		var tmpData = new Array();

		var tempList = [];

		for(var i = 0; i < tempData.length; i++) {
			var tempIndex = Number(tempData[i].CODE);
			for(var j = 0; j < boundData.features.length; j++) {
				var adm_cd = boundData.features[j].properties.adm_cd;

				if(adm_cd == tempIndex) {
					tempList.push(tempData[i]);
					break;
				}
			}
		}

		tempData = [];
		tempData = tempList;
		$houseDash.kosis_result_data = tempData;

		for(var k = 0; k < tempData.length; k++) {
			if(tempData[k] != null) {
				boundData["combine"] = true;
			} else {
				boundData["combine"] = false;
			}

			for(var i = 0; i < boundData.features.length; i++) {
				var adm_cd = boundData.features[i].properties.adm_cd;

				if(boundData.features[i].info == null) {
					boundData.features[i]["info"] = [];
				}
				if(adm_cd == tempData[k].CODE) {
					boundData.features[i]["isKosis"] = true;
					boundData.features[i].info.push(tempData[k].DATA);
					boundData.features[i].info.push(tempData[k].UNIT);
					boundData.features[i].info.push("kosis");
					boundData.features[i].info.push(tempData[k].PRD_DE);
					boundData.features[i]["dataIdx"] = k;
					tmpData.push(tempData[k].DATA *= 1);
				}
			}
		}
		arData.push(tmpData);

		//경계고정이 아닐경우, 수행
		//if (!$administStatsMap.ui.map.isFixedBound) {
		if (!$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].isFixedBound) {
			setLegendForKosisStatsData(arData);
		}

		return boundData;
	}


	$houseDash.util = {};

	$houseDash.event = {

		/**
		 * @name		 : setUIEvent
		 * @description  : 인구행정통계 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$houseDash.event.setUIEvent() called.");

			var body = $("body");



			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 end*/
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 start*/
			body.on("mouseup", "#total_rank, #gender_rank, #foreign_rank", function(){  // 20201012 박은식 IE event 문제로 change 추가
				$houseDash.ui.getRankSet(this.value, this.id, "");
			});
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 end*/

			// 2020-11-10 [곽제욱] url Parameter 추가로 인한 level체크후 rangeContainer display 변경 START
			if($administStatsMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			$houseDash.ui.getRankSet("", "",$administStatsMain.ui.selectedArea);
			// 2020-11-10 [곽제욱] url Parameter 추가로 인한 level체크후 rangeContainer display 변경 END

			// 행정통계시각화정보
			/** 각 차트 영역 클릭시 tileMap 과 지도 변경 (현재는 계만 조회, 각 막대별 클릭일경우 함수 변경 필요 */

			/** 맵 선택 - 안보이게 설정*/
			$(".select").hide();

			// 개방형지도란 버튼 활성화/비활성화
			$(".mapInfo").hide();

			/** 맵 확대 */
			body.on("click", "#pZoom", function() {
				if($("#modalSearchTitle option:selected").val() == null){
					return false;
				}
				
				srvLogWrite("S0","03","01","03","확대","");
						
				$administStatsMap.ui.mapCenter['x'] = $administStatsMap.ui.mapList[0].center[0];
				$administStatsMap.ui.mapCenter['y'] = $administStatsMap.ui.mapList[0].center[1];
				$administStatsMap.ui.mapList[0].setZoom(($administStatsMap.ui.mapList[0].zoom + 1));
			});

			/** 맵 축소 */
			body.on("click", "#pOut", function(){ //20201013 박은식 class -> id로 selector변경
				if($("#modalSearchTitle option:selected").val() == null){
					return false;
				}
				
				srvLogWrite("S0","03","01","04","축소","");
				
				$administStatsMap.ui.mapCenter['x'] = $administStatsMap.ui.mapList[0].center[0];
				$administStatsMap.ui.mapCenter['y'] = $administStatsMap.ui.mapList[0].center[1];
				$administStatsMap.ui.mapList[0].setZoom(($administStatsMap.ui.mapList[0].zoom - 1));
			});
			
			/** 맵 확대 */
			body.on("click", "#pZoom1", function() {
				if($("#modalSearchTitle option:selected").val() == null){
					return false;
				}
				$administStatsMap.ui.mapCenter['x'] = $administStatsMap.ui.mapList[1].center[0];
				$administStatsMap.ui.mapCenter['y'] = $administStatsMap.ui.mapList[1].center[1];
				$administStatsMap.ui.mapList[1].setZoom(($administStatsMap.ui.mapList[1].zoom + 1));
			});

			/** 맵 축소 */
			body.on("click", "#pOut1", function(){ //20201013 박은식 class -> id로 selector변경
				if($("#modalSearchTitle option:selected").val() == null){
					return false;
				}
				$administStatsMap.ui.mapCenter['x'] = $administStatsMap.ui.mapList[1].center[0];
				$administStatsMap.ui.mapCenter['y'] = $administStatsMap.ui.mapList[1].center[1];
				$administStatsMap.ui.mapList[1].setZoom(($administStatsMap.ui.mapList[1].zoom - 1));
			});

			// 20200914 박은식 range input show hide처리(년도 변경 시 지역에 따라 range 처리)
			// 마지막에 처리
			if($administStatsMain.ui.selectedArea == '99' || $administStatsMain.ui.selectedArea == '00' || $administStatsMain.ui.selectedArea == ''){
				$(".dataArea").find('.Rangecontainer').hide()
			} else {
				$(".dataArea").find('.Rangecontainer').show()
			}

			// 차트 이미지 저장
			body.on("click", "[name=chartBtn]", function(evnt){

				var selId = $(this).parent().parent().parent().prop('id');

//				srvLogWrite('P0','01','09','00',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear+',selId='+selId);

				console.log("selId = " + selId);

				// 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 로직 변경 START
				var unit = "";

				if($administStatsMain.ui.selectedArea.length != 2){
					unit = "명";
				} else {
					unit = "천명";
				}
				// 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 로직 변경 END

			});

			// 메타테그 이동
			body.on("click", "[name='metaBtn'], [name='tableBtn'], [name='excelBtn']", function(evnt){

				var selId = $(this).parent().parent().parent().prop('id');

//				srvLogWrite('P0','01','08','00',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear+',selId='+selId);

				if(selId == "ageDiv"){
					getMataDataUrl("PH0002");
				}
				else if(selId == "moveDiv"){
					getMataDataUrl("PH0011");
				}
				else if(selId == "allPopulationForTime"){
					getMataDataUrl("PH0298");
				}
				else if(selId == "foreignFamily"){
					getMataDataUrl("PH0205");
				}
			});
		},

		/**
		 * @name		 : clearSelection
		 * @description  : 지도의 선택된 객체 초기화
		 * @date		 : 2022.02.15
		 * @author		 : 이영호
		 * @history 	 :
		 * @parameter	 : 
		 */
		clearSelection : function(){
			if($administStatsMap.ui.map != null) {
				if($administStatsMap.ui.map.dataGeojson != null) {
					$administStatsMap.ui.map.dataGeojson.eachLayer(function(layer) {
						var fillColor = layer.options.fillColor;
						var dashArray = layer.options.dashArray;
						for(var j=0; j<$administStatsMain.ui.tilePerColor.length; j++){
							if(layer.feature.properties.adm_cd == $administStatsMain.ui.tilePerColor[j].adm_cd) {
								fillColor = $administStatsMain.ui.tilePerColor[j].color;
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
		 * @name		 : allChange
		 * @description  : 차트 데이터 조회
		 * @date		 : 2020.08.17
		 * @author		 : juKwak
		 * @history 	 :
		 * @parameter	 : admCd : 지역코드, mode : 1(지도포함 전체 변경), 2(지도제외 차트변경)
		 */
		allChange : function(admCd, mode){

			$houseDash.event.allClear();

			if("" == $administStatsMain.ui.selectedYear || null == $administStatsMain.ui.selectedYear || undefined == $administStatsMain.ui.selectedYear){
				$administStatsMain.ui.selectedYear = 2019;
			}
			
			$(".house_have_searchYear").text($administStatsMain.ui.selectedYear);
			//$(".selectedMapTitle").text($administStatsMain.ui.selectedYear + " 중∙장년층 인구수");

			var yearArr = [];
			for (var years = $administStatsMain.ui.selectedYear-3; years <= $administStatsMain.ui.selectedYear; years++) {
				yearArr.push(years);
			}

			//alert(yearArr);
			$administStatsMain.ui.years = yearArr;
			$administStatsMain.ui.selectedArea = admCd;
			var year = $administStatsMain.ui.selectedYear;
			
			
			//지도 분할시 로직 추가 20211015 csy
			var index = 0;
			if($("#mapRgn_2").is(":visible")){
				index = 1;
			}
			
			if(mode == "1"){
				$houseDash.ui.drawContent($administStatsMap.ui.selectedSurvId, $administStatsMap.ui.selectedItmCd, $administStatsMap.ui.selectedC1, $administStatsMap.ui.selectedC2);
			} else {
				for (var i=0; i<$administStatsMap.ui.mapList.length; i++) {
					if ($administStatsMap.ui.mapList[i] != null) {
						modalInit();
						$administStatsMap.ui.mapList[i].update();
					}
				}
					
			}
			
			

		},

		/**
		 * @name		 : allClear
		 * @description  : 인구행정통계 모든 차트데이터, 총인구데이터 초기화
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		allClear : function(){
			//20201028 박은식 조회조건 초기화 START
			$administStatsMap.ui.selectedSurvId = "";
			$administStatsMap.ui.selectedItmCd = "";
			$administStatsMap.ui.selectedC1 = "";
			$administStatsMap.ui.selectedC2 = "";
			//20201028 박은식 조회조건 초기화 END

			$("#houseHavePeopleChart1").empty();
			$("#houseHavePeopleChart2").empty();
			$("#houseHavePeopleChart3").empty();
			$("#houseHavePeopleChart4").empty();
			$("#houseHavePeopleChart5").empty();
			$("#houseHavePeopleChart6").empty();
			$("#houseHavePeopleChart7").empty();
			$("#houseHavePeopleChart8").empty();

		}
	};

	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};


}(window, document));

//조규환 최근검색어 변수추가
var count2 = 0;

//천단위 콤마 펑션
function addComma(value){
     value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     return value;
}


/*********** Kosis Detail Option for SearchList Sub Start **********/
/*(function() {
	$class("kosis.serviceApi.kosisDetailOption.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			if(res.errCd == "0") {
				if(result.kosis_detail_option == undefined || result.kosis_detail_option.length < 1) {
					// 2016. 03. 28 j.h.Seok modify
					messageAlert.open("알림", "대화형 통계지도에서 해당 항목을 서비스 준비중입니다.");
				} else {
					if( result.kosis_detail_option[0] == null ){
						messageAlert.open("알림", "지역코드가 없는 데이터입니다. 자세한 문의사항은 042-481-2342로 담당자에게 문의하시기 바랍니다.");
						this.onBlockUIClose();
					} else {
						$houseDash.obj_var_id = result.kosis_detail_option[0].obj_var_id;
						$houseDash.field_id = result.kosis_detail_option[0].field_id;

						// 데이터 조회
						getKosisDataList();
					}
				}
			} else if(res.errCd == "-401") {
				accessTokenInfo();
			} else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function(status) {
		}
	});
}());
*//*********** Kosis Detail Option for SearchList Sub End  **********//*



*//*********** Kosis Data List Start **********//*
(function() {
	$class("kosis.serviceApi.kosisDataList.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			var map = options.mapDelegate;
			var atdrc_yn = options.atdrc_yn;
			if(res.errCd == "0") {
				result = result.kosisData;
				//kosis데이터 정렬
				if (result != null && result.length > 0) {
					result = result.sort(function(a,b) {
						return parseFloat(b.DATA)-parseFloat(a.DATA)
					});
				}
				//소수점 2자리로 고정
				for (var i=0; i<result.length; i++) {
					if(result[i].DATA == null){
						result[i].DATA = 0;
					}
					result[i].DATA = parseFloat(result[i].DATA).toFixed(2);
				}
				//사용자지정 경계일 경우,
				//사용자가 선택한 경계에만 통계치를 표출해야하므로
				//사용자가 지정한 경계이외의 나머지 데이터는 삭제한다.
//				if (map.selectedBoundMode == "multi") {
					var tmpResult = [];
					for (var i=0; i<result.length; i++) {
						for (var x=0; x<map.selectedBoundList.length; x++) {
							var layer = map.selectedBoundList[x];
							if (result[i].CODE == layer.feature.properties.adm_cd) {
								tmpResult.push(result[i]);
								break;
							}
						}
					}
					result = tmpResult;
//				}
				$houseDash.kosis_result_data = [];
				$houseDash.kosis_result_data = result;
				//경계고정일 경우,
				//기존 로직을 타지않고, multiLayerControl 로직을 탄다.
//				if (map.selectedBoundMode == "multi") {
					setKosisStatsData(map, "options");
					map.multiLayerControl.clear();
					if (map.geojson != null) {
						map.geojson.remove();
						map.geojson = null;
					}
					map.multiLayerControl.multiData = [];
					map.multiLayerControl.dataGeojson = [];
					var tmpData = [];
					tmpData[0] = [];
					for (var i=0; i<result.length; i++) {
						tmpData[0].push(parseFloat(result[i].DATA));
					}
					setLegendForKosisStatsData(tmpData);
					for (var i=0; i<result.length; i++) {
						map.multiLayerControl.reqBoundary(result[i].CODE, result[i], atdrc_yn, function(res) {
							var geoData = interactiveMapKosis.combineKosisStatsData(res);
							map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(geoData, "data"));
						});
					}
				options["zoomlevel"] = map.zoom;
				options["center"] = map.center;
				options["dist_level"] = interactiveMapKosis.gis_se;
				if(result.length > 1 && result[0].UNIT != undefined) {
					options.params["unit"] = result[0].UNIT;
				}
				map.shareInfo.setShareInfo(options, "normal", map.id);
				$interactiveMap.ui.updateSearchTitle(options.params.title, options.params.unit, map.id);

			} else if(res.errCd == "-401") {
				accessTokenInfo();
			} else {
				messageAlert.open("알림", res.errMsg);
			}
		},
		onFail : function(status) {
		}
	});
}());*/
/*********** Kosis Data List Sub End **********/

function modalLocationClose(){
	if($('.modal-location').is(":visible") == true){
		$(".modal-location").css("display","none");
	}else{
		$("#rankRange").val(1);
		$("#area_name").text("전국");
		if(chartMode == "sido") {
			$("#RankArea").text("시도" + sidoValues.length + "개 중");
		} else {
			$("#RankArea").text("시군구" + sidoValues.length + "개 중");
		}
		$("RankText").text("선택");
		$(".modal-location").css("display","block");
	}
}

/** 통계 상세보기 스크립트 추가 */

function initMenuTitle(){
	if(gv_checkmenu == 'bubu'){
		/*$('#toplistpanelmain').text('신혼부부 통계 목록');*/ //데이터보드 삭제로 인한 주석처리[조규환]
		$('#middlepanelmain1').text('신혼부부 전체');
		$('#middlepanelmain2').text('초혼 신혼부부');
		$('#middlepanelmain3').text('재혼 신혼부부');
		$('#mainpanel3').show();
		$('#mainpanel4').hide();		
	}else if(gv_checkmenu == 'jutak'){
		/*$('#toplistpanelmain').text('주택소유 통계 목록');*/ //데이터보드 삭제로 인한 주석처리[조규환]
		$('#middlepanelmain1').text('주택수');
		$('#middlepanelmain2').text('주택소유자수');
		$('#middlepanelmain3').text('주택소유가구');
		$('#middlepanelmain4').text('무주택가구');
		$('#mainpanel3').show();
		$('#mainpanel4').show();		
	}else if(gv_checkmenu == 'jungjan'){
		/*$('#toplistpanelmain').text('중장년층 통계 목록');*/ //데이터보드 삭제로 인한 주석처리[조규환]
		$('#middlepanelmain1').text('개인');
		$('#middlepanelmain2').text('가구');
		$('#mainpanel3').hide();
		$('#mainpanel4').hide();
	}else if(gv_checkmenu == 'kinong'){
		/*$('#toplistpanelmain').text('귀농어·귀촌인 통계 목록');*/ //데이터보드 삭제로 인한 주석처리[조규환]
		$('#middlepanelmain1').text('귀농');
		$('#middlepanelmain2').text('귀어');
		$('#middlepanelmain3').text('귀촌');
		$('#mainpanel3').show();
		$('#mainpanel4').hide();
	}else if(gv_checkmenu == 'more1'){
		/*$('#toplistpanelmain').text('일자리 행정통계 목록');*/ //데이터보드 삭제로 인한 주석처리[조규환]
		$('#middlepanelmain1').text('일자리 통계편');
		$('#middlepanelmain2').hide();
		$('#middlepanelmain3').hide();
		$('#mainpanel3').hide();
		$('#mainpanel4').hide();
	}
}
/**
 * @name : searchInputButton
 * @description : 검색레이어 엔터이벤트
 * @date : 2022.12.26
 * @author : 조규환
 * @history :
 */
function searchInputButton() {
	var itemInfo = [];
	var param = {};
	$(".searchLayer").fadeIn();
	if(gv_checkmenu == 'bubu'){
		param = { 'class_cd' : '01'	}
	}else if(gv_checkmenu == 'jutak'){
		param = { 'class_cd' : '02'	}
	}else if(gv_checkmenu == 'jungjan'){
		param = { 'class_cd' : '03'	}
	}else if(gv_checkmenu == 'kinong'){
		param = { 'class_cd' : '04'	}
	}
	
	$.ajax({
		url : '/view/administStatsDetail/getStatsItemList',
		type : 'get',
		data: param
	}).done(function(res){
		itemInfo = res.list;
		console.log(itemInfo);
		var searchList = document.getElementById('searchList');
		var count1 = 0;
		var tblNm = "";
		searchList.innerHTML = '';
		
		$('#searchCount').text('0건');
		for(var i=0; i<itemInfo.length; i++){
			if(itemInfo[i].tbl_nm.length > 16) {    /** 수정 **/
				tblNm = itemInfo[i].tbl_nm.substring(0, 16) + "...";   /** 수정 **/
			} else {
				tblNm = itemInfo[i].tbl_nm;
			}
			if($('.searchInput').val() != ''){
				if(itemInfo[i].tbl_nm.includes($('.searchInput').val()) == true){
					searchList.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
											'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
											'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
											'" data-region_var_ord="' + itemInfo[i].region_var_ord +
											'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
											'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
											'<a class="searchmenuaList" onclick="javascript:openModalSearch(this);" style="width: 240px;" href="javascript:void(0);" title="' + itemInfo[i].TBL_NM + '">' + tblNm + '</a></td></tr>';
					/*searchList.innerHTML += '<tr><td data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" stattb_end_year="' + itemInfo[i].stattb_end_year + '" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end + '" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id + '" data-region_var_ord="' + itemInfo[i].region_var_ord + '" data-tbl_nm="' + itemInfo[i].tbl_nm + '">' +
					'<a class="searchmenua" style="width: 240px;" href="javascript:void(0);" title="' + itemInfo[i].TBL_NM + '">' + tblNm + '</a></td></tr>';*/
					count1++;
				}
			}
		}
		count2++;
		localStorage.setItem('memory', $('.searchInput').val());
		if($('.searchInput').val() == ''){
			alert('검색어를 입력하세요.');
			$('#searchCount').text('0건');
			$('.searchInput').focus();
			//return;
		} else {
			$('#searchMemory').append('<tr><td><a onclick="searchClickButton('+count2+')" style="cursor:pointer">' + localStorage.getItem('memory') + 
									  '</a><img src="/images/administStatsDetail/btnClose.png" id="img'+count2+'" onclick="removeButton('+count2+')" class="btnTagHidden" /></td></tr>');
			
		}
		$('#searchCount').text(count1 + '건');
		$(".searchMemory").css('max-height', '120px');
		$(".searchMemory").css({'overflow-y':'auto', 'overflow-x':'hidden'});
		$('.searchInput').val('');
		$('.searchInput').focus();
		for(var i=0; i<$("#searchList li .searchmenuaList").length; i++) {
			if($("#searchList li .searchmenuaList:eq(" + i + ")").css("color") == "#666666") {
				$("#searchList li .searchmenuaList:eq(" + i + ")").attr("onclick", "javascript:openModalSearch(this);");
				
			}
		}
	});
}
/**
 * @name : searchClickButton
 * @description : 최근검색어 클릭이벤트
 * @date : 2022.12.26
 * @author : 조규환
 * @history :
 */
function searchClickButton(n) {
	$('.searchInput').val($('#img'+n+'').parent().text());
	searchInputButton();
};
/**
 * @name : removeButton
 * @description : 검색시 검색리스트초기화
 * @date : 2022.12.26
 * @author : 조규환
 * @history :
 */
function removeButton(n) {
	$('#img'+n+'').parent().parent().remove();
};
//통계 항목 조회
function createStatsItemList(){
	initMenuTitle();
	var itemInfo = [];
	var param = {};
	var param2 = {};
	
	if(gv_checkmenu == 'bubu'){
		param = { 'class_cd' : '01'	}
		$('#searchTot').attr("onclick", "openPop('https://meta.narastat.kr/metasvc/index.do?orgId=101&confmNo=101082&kosisYn=Y')");
	}else if(gv_checkmenu == 'jutak'){
		param = { 'class_cd' : '02'	}
		$('#searchTot').attr("onclick", "openPop('https://meta.narastat.kr/metasvc/index.do?orgId=101&confmNo=101080&kosisYn=Y')");
	}else if(gv_checkmenu == 'jungjan'){
		param = { 'class_cd' : '03'	}
		$('#searchTot').attr("onclick", "openPop('https://meta.narastat.kr/metasvc/index.do?orgId=101&confmNo=101087&kosisYn=Y')");
	}else if(gv_checkmenu == 'kinong'){
		param = { 'class_cd' : '04'	}
		$('#searchTot').attr("onclick", "openPop('https://meta.narastat.kr/metasvc/index.do?orgId=101&confmNo=101082&kosisYn=Y')");
	/* 삭제 */
	}
	$.ajax({
		url : '/view/administStatsDetail/getStatsItemList',
		type : 'get',
		data: param
	}).done(function(res){
		itemInfo = res.list;
		var list1 = document.getElementById('list1');
		var list2 = document.getElementById('list2');
		var list3 = document.getElementById('list3');
		var list4 = document.getElementById('list4');
		var il1=0, il2=0, il3=0, il4=0;
		for(var i=0; i<itemInfo.length; i++){
			let tblNm = "";
			if(itemInfo[i].tbl_nm.length > 16) {    /** 길이수정 **/
				tblNm = itemInfo[i].tbl_nm.substring(0, 16) + "...";   /** 길이수정 **/
			} else {
				tblNm = itemInfo[i].tbl_nm;
			}
			if(itemInfo[i].menu_disp_yn == "Y") {
				if(itemInfo[i].s_class_cd == '0101' || itemInfo[i].s_class_cd == '0201' || itemInfo[i].s_class_cd == '0301' || itemInfo[i].s_class_cd == '0401' /*|| itemInfo[i].s_class_cd == '0501'*/){
					list1.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 175px;" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';  /** width 수정 **/
										
					il1++;
				} else if(itemInfo[i].s_class_cd == '0102' || itemInfo[i].s_class_cd == '0202'|| itemInfo[i].s_class_cd == '0302' || itemInfo[i].s_class_cd == '0402' /*|| itemInfo[i].s_class_cd == '0502'*/){
					list2.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 175px;" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';  /** width 수정 **/
					il2++;
				} else if(itemInfo[i].s_class_cd == '0103' || itemInfo[i].s_class_cd == '0203' || itemInfo[i].s_class_cd == '0303' || itemInfo[i].s_class_cd == '0403' /*|| itemInfo[i].s_class_cd == '0503'*/){
					list3.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 175px;" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';  /** width 수정 **/
					il3++;
				} else if(itemInfo[i].s_class_cd == '0104' || itemInfo[i].s_class_cd == '0204' || itemInfo[i].s_class_cd == '0304'){
										list4.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 175px;" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';  /** width 수정 **/
					il4++;
				}
			} else {
				if(itemInfo[i].s_class_cd == '0101' || itemInfo[i].s_class_cd == '0201' || itemInfo[i].s_class_cd == '0301' || itemInfo[i].s_class_cd == '0401' /*|| itemInfo[i].s_class_cd == '0501'*/){
		        	list1.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 240px;cursor: not-allowed;color:#cccccc" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';
					il1++;
				} else if(itemInfo[i].s_class_cd == '0102' || itemInfo[i].s_class_cd == '0202'|| itemInfo[i].s_class_cd == '0302' || itemInfo[i].s_class_cd == '0402'){
					list2.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 240px;cursor: not-allowed;color:#cccccc" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';
					il2++;
				} else if(itemInfo[i].s_class_cd == '0103' || itemInfo[i].s_class_cd == '0203' || itemInfo[i].s_class_cd == '0303' || itemInfo[i].s_class_cd == '0403'){
					list3.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 240px;cursor: not-allowed;color:#cccccc" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';
					il3++;
				} else if(itemInfo[i].s_class_cd == '0104' || itemInfo[i].s_class_cd == '0204' || itemInfo[i].s_class_cd == '0304'){
					list4.innerHTML += '<li data-stattb_begin_year="' + itemInfo[i].stattb_begin_year + '" data-stattb_end_year="' + itemInfo[i].stattb_end_year +
										'" data-org_id="' + itemInfo[i].org_id + '" data-region_end="' + itemInfo[i].region_end +
										'" data-s_class_cd="' + itemInfo[i].s_class_cd + '" data-tbl_id="' + itemInfo[i].tbl_id +
										'" data-region_var_ord="' + itemInfo[i].region_var_ord +
										'" data-tbl_nm="' + itemInfo[i].tbl_nm + '"' +
										'" data-menu_disp_yn="' + itemInfo[i].menu_disp_yn + '">' +
										'<a class="searchmenua" style="width: 240px;cursor: not-allowed;color:#cccccc" href="javascript:void(0);" title="' + itemInfo[i].tbl_nm + '">'+tblNm+'</a><a onclick="javascript:openPop1('+"'"+itemInfo[i].stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';
					il4++;
				} 
			} 
		}
		//2021-09-27 [이영호] 고객 요청으로 인한 사이즈 고정 메뉴 높이는 77px
		//2022-11-16 [조규환] 검색창생성으로 인한 크기 수정
		if(gv_checkmenu == 'bubu'){
			$('#list1').css({'max-height':'350px'});		/** 수정 **/
			$('#list2').css({'max-height':'350px'});        /** 수정 **/
			$('#list3').css({'max-height':'350px'});        /** 수정 **/
		}else if(gv_checkmenu == 'jutak'){
			$('#list1').css({'max-height':'455px'});		
			$('#list2').css({'max-height':'455px'});
			$('#list3').css({'max-height':'270px'});         /** 수정 **/
			$('#list4').css({'max-height':'455px'});
		}else if(gv_checkmenu == 'jungjan'){
			$('#list1').css({'max-height':'430px'});	     /** 수정 **/
			$('#list2').css({'max-height':'430px'});	     /** 수정 **/			
		}else if(gv_checkmenu == 'kinong'){
			$('#list1').css({'max-height':'350px'});         /** 수정 **/		
			$('#list2').css({'max-height':'350px'});	     /** 수정 **/
			$('#list3').css({'max-height':'350px'});         /** 수정 **/
		}else if(gv_checkmenu == 'more1'){
			$('#list1').css({'max-height':'530px'});		
			$('#list2').css({'max-height':'530px'});
			$('#list3').css({'max-height':'530px'});
			$('#list3').css({'max-height':'530px'});
		}
		
		$("#list1").css({'overflow-y':'auto', 'overflow-x':'hidden'}).css('height', 55*il1+'px');     /** 수정 **/
		$("#list2").css({'overflow-y':'auto', 'overflow-x':'hidden'}).css('height', 50*il2+'px');     /** 수정 **/
		$("#list3").css({'overflow-y':'auto', 'overflow-x':'hidden'}).css('height', 50*il3+'px');
		$("#list4").css({'overflow-y':'auto', 'overflow-x':'hidden'}).css('height', 55*il4+'px');     /** 수정 **/
		
		/*if(il1 > 6){
			$('#list1').css({'min-height':'345px', 'max-height':'345px', 'overflow-y':'auto'});
		}
		if(il2 > 6){
			$('#list2').css({'min-height':'345px', 'max-height':'345px', 'overflow-y':'auto'});
		}
		if(il3 > 6){
			$('#list3').css({'min-height':'345px', 'max-height':'345px', 'overflow-y':'auto'});
		}
		if(il4 > 6){
			$('#list4').css({'min-height':'345px', 'max-height':'345px', 'overflow-y':'auto'});
		}*/
		
		for(var i=0; i<$("a.searchmenua").length; i++) {
			if($("a.searchmenua:eq(" + i + ")").css("color") == "#666666") {
				$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:openModalSearch(this);");
			}
		}
		
		$(".accordion-li").children(":first").addClass("on");
		$(".accordion-li ul:first").slideDown();
	});
}



var chartInfo = {};
//var chartData;
var chartData = {};
var chartDataYear = {};
var dataYear = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
var itm_id_list = [];
var chkRegionEnd = '시도';
var sClassCd = "";
let befYear = 0, totDt = 0, incDec = 0, incDecStr = "", befDt = [], befDt1 = [], totDt1 = 0, incDec1 = 0, befYearSum = 0; curYearSum = 0, befYearSum1 = 0; curYearSum1 = 0;
var searchGubun = "";
var sidoSumAvg = 0;
var chartMode;
var yearCategoriesArr = {};
var yearSeriesDataArr = {};
var yearCategories1Arr = {};
var yearSeriesData1Arr = {};

function openPop(url){
		var s_status ;
		s_status=s_status + "toolbar=no,";
		s_status=s_status + "location=no,";
		s_status=s_status + "directories=no,";
		s_status=s_status + "status=no,";
		s_status=s_status + "menubar=no,";
		s_status=s_status + "scrollbars=yes,";
		s_status=s_status + "resizable=yes,";
		s_status=s_status + "width=820,";
		s_status=s_status + "height=700";

		window.open( url,"_blank",s_status);
	}
function openPop1(url, btn){
//	if( $(btn) ){ //$(btn).closest("li").data("tbl_nm")
		srvLogWrite("S0", "01", "07", "00", "", $administStatsMain.ui.selectedThema);
//	}
	
	var s_status ;
	s_status=s_status + "toolbar=no,";
	s_status=s_status + "location=no,";
	s_status=s_status + "directories=no,";
	s_status=s_status + "status=no,";
	s_status=s_status + "menubar=no,";
	s_status=s_status + "scrollbars=yes,";
	s_status=s_status + "resizable=yes,";
	s_status=s_status + "width=1280,";
	s_status=s_status + "height=860";

	window.open( url,"_blank",s_status);
}
//통계 조회
function modalSearchBtn(in_region_code, in_sgg_code){
	$administStatsMain.ui.loading(false); //[조규환] false로 변경
	setTimeout(function() {
		$('.modal-location').css('display', 'none');
		$houseDash.chartItmClick = "";
		$houseDash.chartItmClick1 = "";
		$houseDash.chartItmClickName = "";
		$houseDash.polygonSelectedAreaNm = "";
		$houseDash.polygonSelectArea = "";
		$houseDash.polygonSelectedAreaNm1 = "";
		$houseDash.polygonSelectArea1 = "";
		$houseDash.timeLineChartItmClick = "";
		//$houseDash.timeLineChartItmClick1 = "";
		$administStatsMain.ui.selectedArea = "";
		$administStatsMain.ui.selectedYear = $("#modalSearchYear option:selected").val();
		$administStatsMap.ui.mapToggleId = '';
		$administStatsMap.ui.mapToggleId1 = '';
		sggCategories = [];
		sggValues = []; 
		originSggCategories = [];
		originSggValues = []; 
		elsSggCategories = [];
		elsSggValues = []; 
		//$houseDash.searchParamReset = true;
		
		$(".selectedArea").remove();
		$('.city_select_sido').text(' 전체');
		$('.city_select').css('width','180px');
		$('.city_select button').remove();
		$('.tag_sido').text("전국");
		$("#sidoClose").remove();
		$administStatsMap.ui.mapCenter['x'] = 0;
		$administStatsMap.ui.mapCenter['y'] = 0;
		
		let iem_cl = "";
		if(gv_checkmenu == 'bubu'){
		//mng_s 20220216 이진호, log 추가
		srvLogWrite("S0", "03", "02", "01", "", "");
		//mng_e 20220216 이진호
			iem_cl = "BUBU";
		}else if(gv_checkmenu == 'jutak'){
		//mng_s 20220216 이진호, log 추가
		srvLogWrite("S0", "03", "03", "01", "", "");
		//mng_e 20220216 이진호
			iem_cl = "JUTAK";
		}else if(gv_checkmenu == 'jungjan'){
		//mng_s 20220216 이진호, log 추가
		srvLogWrite("S0", "03", "04", "01", "", "");
		//mng_e 20220216 이진호
			iem_cl = "JUNGJA";
		}else if(gv_checkmenu == 'kinong'){
		//mng_s 20220216 이진호, log 추가
		srvLogWrite("S0", "03", "05", "01", "", "");
		//mng_e 20220216 이진호
			iem_cl = "KINONG";
		}
		$houseDash.ui.dispOptions = {};
		
		$.ajax({
			method: "POST",
			async: false,	// 반드시 동기처리 해야 함
			url: contextPath + "/ServiceAPI/administStats/common/getDispSrvDetailList.json",
			data: { 
				org_id_list: '101'
				, iem_cl: iem_cl
			}, // 
			dataType: "json",
			success: function(res) {
				let resultList = res.result.resultList;
				for(let i=0; i<resultList.length; i++) {
					if(resultList[i].tblId == $("#modalSearchTitle option:selected").data("tbl_id")) {
						if($houseDash.ui.dispOptions[resultList[i].chartOrd] != undefined) {
							$houseDash.ui.dispOptions[resultList[i].chartOrd].push(resultList[i]);
						} else {
							$houseDash.ui.dispOptions[resultList[i].chartOrd] = [];
							$houseDash.ui.dispOptions[resultList[i].chartOrd].push(resultList[i]);
						}
					}
				}
			},
			error: function(e) {
				alert('failed');
			}
		});
		let strYear = "<option value='00'>전국</option>";
		for(let i=0; i<$administStatsMain.ui.areaSidoData["00"].length; i++) {
			strYear += "<option value='" + $administStatsMain.ui.areaSidoData["00"][i].sido_cd + "'>" + $administStatsMain.ui.areaSidoData["00"][i].sido_nm + "</option>";
		}
		$("#modalSearchArea").html(strYear);
		
		$houseDash.event.clearSelection();
		modalInit();
		
		if(chartInfo[Object.keys(chartInfo)[0]][0].region_end != "전국" && chartInfo[Object.keys(chartInfo)[0]][0].region_end != "시도") {
			$("#modalSearchArea").parent().show();
		} else {
			$("#modalSearchArea").parent().hide();
		}
	}, 10);
}

function modalInit(in_region_code, in_sgg_code) {
	if($('.panel-tit2.pancon1h').is('.on')){
		$('.panel-tit2.pancon1h').click();
	}
	if($('.panel-tit2.pancon2h').is('.on')){
		$('.panel-tit2.pancon2h').click();
	}
	if($('.panel-tit2.pancon3h').is('.on')){
		$('.panel-tit2.pancon3h').click();
	}
	if($('.panel-tit2.pancon4h').is('.on')){
		$('.panel-tit2.pancon4h').click();
	}
	if($('.panel-tit2.pancon11h').is('.on')){
		$('.panel-tit2.pancon11h').click();
	}
	if($('.panel-tit2.pancon21h').is('.on')){
		$('.panel-tit2.pancon21h').click();
	}
	if($('.panel-tit2.pancon22h').is('.on')){
		$('.panel-tit2.pancon22h').click();
	}
	if($('.panel-tit2.pancon31h').is('.on')){
		$('.panel-tit2.pancon31h').click();
	}
	if($('.panel-tit2.pancon41h').is('.on')){
		$('.panel-tit2.pancon41h').click();
	}
	
	$('#panel41').css('display', 'none');
	
	//$('#chartPanelContent').css('height','85vh');
	
	var chartOrd = $("#modalSearchTitle option:selected").val();
	var year = $("#modalSearchYear option:selected").val();
	var item_id = $("#modalSearchTitle option:selected").data('item_id');
	var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
	var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
	var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
	var var_ord = $("#modalSearchTitle option:selected").data('var_ord');

	var	region_code = '00';
	var sgg_code = '';

	if(in_region_code)
		region_code = in_region_code;

	if(in_sgg_code)
		sgg_code = in_sgg_code;
		
	//if($("#modalSearchTitle option:selected").text().indexOf($(".toggle.on").text().replace('전체', '').trim()+' 특성별') > -1){
	var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
	if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
	 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
	  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
	   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
	    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
	     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
	   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
	       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
		    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
		region_code = "2"+ region_code;
	}
	if($("#mapRgn_2").is(":visible")){
		$administStatsMap.ui.isLoading = true;
	}else{
		$administStatsMap.ui.isLoading = false;
	}
	
	$houseDash.chartStackItmClick = "";
	$houseDash.chartItmClick = "";
	$houseDash.isContinue = true;
	
	$houseDash.isChange = true;
	if(gv_checkmenu != "more1") { //일자리행정통계가 아닌 조건추가[조규환]
		getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, "Y");
	}
	
	//2021-09-27 [이영호] 고객 요청에 의해서 검색 이후에도 선택 팝업이 유지되도록
	//$('.modal-search').hide();
	//$('.panel-head.v2').show();
	$('.panel-bottom .stepClose').addClass("on");
	
	//맵분할 모드일때 맵2개 전부 조회
	if($("#mapRgn_2").is(":visible")){
		setTimeout(function(){
			if($administStatsMap.ui.curMapId == 1){
				$administStatsMap.ui.curMapId = 0;
				//$administStatsMap.ui.mapList[0].setZoom(1);
			}else if($administStatsMap.ui.curMapId == 0){
				$administStatsMap.ui.curMapId = 1;
				//$administStatsMap.ui.mapList[1].setZoom(1);
			}
			$administStatsMap.ui.mapToggleId = '';
			$administStatsMap.ui.mapToggleId1 = '';
			$administStatsMap.ui.isLoading = false;
			if(gv_checkmenu != "more1") { //일자리행정통계가 아닌 조건추가[조규환]
				getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, '');
			}
		}, 2000) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
	}
	
}

function fn_bindItmList(data, param) {
	let chrItmIdList = "", ovL1List = "", ovL2List = "", ovL3List = "", ovL4List = "",
			ovL5List = "", ovL6List = "", ovL7List = "", ovL8List = "";
	for(var i=0; i<data.length; i++) {
		//if(data[i].subsumYn != "Y") {
		if(data[i].varOrd == "0") {
			if(chrItmIdList != "") {
				chrItmIdList += "," + data[i].itmId;
			} else {
				chrItmIdList = data[i].itmId;
			}
		} else if(data[i].varOrd == "1") {
			if(ovL1List != "") {
				ovL1List += "," + data[i].itmId;
			} else {
				ovL1List = data[i].itmId;
			}
		} else if(data[i].varOrd == "2") {
			if(ovL2List != "") {
				ovL2List += "," + data[i].itmId;
			} else {
				ovL2List += data[i].itmId;
			}
		} else if(data[i].varOrd == "3") {
			if(ovL3List != "") {
				ovL3List += "," + data[i].itmId;
			} else {
				ovL3List += data[i].itmId;
			}
		} else if(data[i].varOrd == "4") {
			if(ovL4List != "") {
				ovL4List += "," + data[i].itmId;
			} else {
				ovL4List += data[i].itmId;
			}
		} else if(data[i].varOrd == "5") {
			if(ovL5List != "") {
				ovL5List += "," + data[i].itmId;
			} else {
				ovL5List += data[i].itmId;
			}
		} else if(data[i].varOrd == "6") {
			if(ovL6List != "") {
				ovL6List += "," + data[i].itmId;
			} else {
				ovL6List += data[i].itmId;
			}
		} else if(data[i].varOrd == "7") {
			if(ovL7List != "") {
				ovL7List += "," + data[i].itmId;
			} else {
				ovL7List += data[i].itmId;
			}
		} else if(data[i].varOrd == "8") {
			if(ovL8List != "") {
				ovL8List += "," + data[i].itmId;
			} else {
				ovL8List += data[i].itmId;
			}
		}
	}
	
	if(param.char_itm_id_list == "") { param.char_itm_id_list = chrItmIdList; }
	if(param.ov_l1_list == "") { param.ov_l1_list = ovL1List; }
	if(param.ov_l2_list == "") { param.ov_l2_list = ovL2List; }
	if(param.ov_l3_list == "") { param.ov_l3_list = ovL3List; }
	if(param.ov_l4_list == "") { param.ov_l4_list = ovL4List; }
	if(param.ov_l5_list == "") { param.ov_l5_list = ovL5List; }
	if(param.ov_l6_list == "") { param.ov_l6_list = ovL6List; }
	if(param.ov_l7_list == "") { param.ov_l7_list = ovL7List; }
	if(param.ov_l8_list == "") { param.ov_l8_list = ovL8List; }
	
	return param;
}

var tblId = '';
var tblTitle ='';
//통계 검색창 조회 및 셋팅
function openModalSearch(li){
	for(var i=0; i<$("a.searchmenua").length; i++) {
		if($("a.searchmenua:eq(" + i + ")").css("color") == "#1772a9") {
			$("a.searchmenua:eq(" + i + ")").css("color", "#666666");
			$("a.searchmenua:eq(" + i + ")").css('font-weight', 400);
		}
	}
	
	//$('.searchmenua').css('color','');
	$(li).parent().find('a:eq(0)').css('color','#1772a9');
	$(li).parent().find('a:eq(0)').css('font-weight', 700);
	
	$('.modal-search').css('display','none');
	
	var orgId = $(li).parent().data('org_id');
	
	var regionEnd = $(li).parent().data('region_end');
	$houseDash.regionEnd = $(li).parent().data('region_end');
	sClassCd = $(li).parent().data('s_class_cd');
	var stattbBeginYear = $(li).parent().data('stattb_begin_year');
	var stattbEndYear = $(li).parent().data('stattb_end_year');
	var tblNm = $(li).parent().data('tbl_nm');
	tblTitle = $(li).parent().data('tbl_nm');
	tblId = $(li).parent().data('tbl_id');
	var regionVarOrd = $(li).parent().data('region_var_ord');
	chkRegionEnd = $(li).parent().data('region_end');
	
	//시군구 통계표 선택시 데이터보드 숨김처리
	$administStatsMap.ui.mapCenter['x'] = 0;
	$administStatsMap.ui.mapCenter['y'] = 0;
	/*if(chkRegionEnd == "시군구"){
		$('.chart-panel').animate({"right": '-570'});
		$('.map-conrol').addClass('off').animate({"right": '20'});
		$('.modal-location').css('right', '75px').css('display', 'none');
	}*/

	var param = {
		'tbl_id': tblId
	}
	$.ajax({
		url: '/view/administStatsDetail/getChartsInfo',
		type: 'get',
		sync: false,
		data: param
	}).done(function(res) {
		$('#modalSearchTitle option').remove();
		$('#modalSearchYear option').remove();
		var chart_ord = '';
		console.log(res);
		var itemsMap = new HashMap();
		var regionOrdMap = new HashMap();
		var objVarIdMap = new HashMap();
		var dispObjVarIdMap = new HashMap();
		var varOrdMap = new HashMap();
		chartInfo = {};
		console.log(chart_ord);
		console.log(res.list[0].chart_ord);
		for (var i = 0; i < res.list.length; i++) {
			if (chart_ord == res.list[i].chart_ord) {
				var itemArray = itemsMap.get(chart_ord);
				itemArray.push(res.list[i].itm_id);
				itemsMap.put(chart_ord, itemArray);

				var regionOrdMapArray = regionOrdMap.get(chart_ord);
				regionOrdMapArray.push(res.list[i].region_var_ord);
				regionOrdMap.put(chart_ord, regionOrdMapArray);

				var objVarIdMapArray = objVarIdMap.get(chart_ord);
				objVarIdMapArray.push(res.list[i].obj_var_id);
				objVarIdMap.put(chart_ord, objVarIdMapArray);

				var dispObjVarIdMapArray = dispObjVarIdMap.get(chart_ord);
				dispObjVarIdMapArray.push(res.list[i].disp_obj_var_id);
				dispObjVarIdMap.put(chart_ord, dispObjVarIdMapArray);

				var varOrdMapArray = varOrdMap.get(chart_ord);
				varOrdMapArray.push(res.list[i].var_ord);
				varOrdMap.put(chart_ord, varOrdMapArray);

				chartInfo[res.list[i].chart_ord].push(res.list[i]);

			}else{
				chart_ord = res.list[i].chart_ord;

				var itemArray = new Array();
				itemArray.push(res.list[i].itm_id);
				itemsMap.put(res.list[i].chart_ord, itemArray);

				var regionOrdMapArray = new Array();
				regionOrdMapArray.push(res.list[i].region_var_ord);
				regionOrdMap.put(res.list[i].chart_ord, regionOrdMapArray);

				var objVarIdMapArray = new Array();
				objVarIdMapArray.push(res.list[i].obj_var_id);
				objVarIdMap.put(chart_ord, objVarIdMapArray);

				var dispObjVarIdMapArray = new Array();
				dispObjVarIdMapArray.push(res.list[i].disp_obj_var_id);
				dispObjVarIdMap.put(chart_ord, dispObjVarIdMapArray);

				var varOrdMapArray = new Array();
				varOrdMapArray.push(res.list[i].var_ord);
				varOrdMap.put(chart_ord, varOrdMapArray);

				chartInfo[res.list[i].chart_ord] = [res.list[i]];
			}
		}
		chart_ord = '';
		for (var i = 0; i < res.list.length; i++) {
			if (chart_ord != res.list[i].chart_ord) {
				$('#modalSearchTitle').append('<option ' +
						'data-item_id="' + itemsMap.get(res.list[i].chart_ord) + '"' +
						'data-region_var_ord="' + regionOrdMap.get(res.list[i].chart_ord) + '"' +
						'data-obj_var_id="' + objVarIdMap.get(res.list[i].chart_ord) + '"' +
						'data-disp_obj_var_id="' + dispObjVarIdMap.get(res.list[i].chart_ord) + '"' +
						'data-var_ord="' + varOrdMap.get(res.list[i].chart_ord) + '"' +
						'data-tbl_id="' + tblId + '"' +
						'" value="' + res.list[i].chart_ord + '">' + res.list[i].chart_nm + '</option>');
				
				
				
				chart_ord = res.list[i].chart_ord;
			}
		}
		for(var i=0; i<=stattbEndYear-stattbBeginYear; i++){
			$('#modalSearchYear').append('<option value="' + (stattbEndYear-i) + '">' + (stattbEndYear-i) + '</option>');
		}
		
		$("#modalSearchArea").parent().hide();
		
		$('.modal-search').css('display','block');
	});
}

//통계 검색창 검색 버튼 클릭시
function getChartsData(chartOrd, year, item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, isChange, emdong_code) {
	if(region_code == "200") {
		region_code = "000";
	} else if(region_code == "") {
		region_code = "00";
	}
	
	var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
	if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014" || tbl_id == "DT_1NW1016"
	 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
	  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
	   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
	    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
	     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
	   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
	       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
		    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
		searchGubun = "2";
	}else{
		searchGubun = "";
	}
	if($administStatsMain.ui.selectedArea != "") {
		$administStatsMain.ui.selectedArea = $administStatsMain.ui.selectedArea; 
	} else {
		$administStatsMain.ui.selectedArea = "00";
	}
	
	let sggAt = false;
	if(region_code != "00") {
		sggAt = true;
	}
	
	let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
	let regionLv = 0;

	if(region_code.length == 2 && region_code == "00") {
		chartMode = 'sido';
	} else if(region_code.length == 3) {
		chartMode = 'sido';
	} else if(region_code.length == 2 && region_code != "00") {
		if($houseDash.areaMode == "sido") {
			if($houseDash.isChange) {
				chartMode = 'sgg';
			} else {
				chartMode = 'sido';
			}
		} else {
			chartMode = 'sgg';
		}
	} else if(region_code.length == 5) {
		chartMode = 'sgg';
	} else if(region_code.length == 7) {
		chartMode = 'emdong';
	} else {
		chartMode = 'country';
	}

	console.log("chartMode => "+chartMode);
	var item_id_arr = (''+item_id).split(",");
	var regin_var_ord_arr = (''+regin_var_ord).split(",");
	var obj_var_id_arr = (''+obj_var_id).split(",");
	var disp_obj_var_id_arr = (''+disp_obj_var_id).split(",");
	var var_ord_arr = (''+var_ord).split(",");

	var itm_id_text = '';
	var ov_l1_list_value='';
	var ov_l2_list_value='';
	var ov_l3_list_value='';
	var ov_l4_list_value='';
	var ov_l5_list_value='';

	itm_id_list = [];

	for(var i=0; i<item_id_arr.length; i++){
		if(obj_var_id_arr[i] == '13999001'){
			var itm_id = ''
			if (itm_id != item_id_arr[i]) {
				if (i != 0) {
			    	itm_id_text += ','
			    }
			    itm_id_text += item_id_arr[i];
			    itm_id_list.push(item_id_arr[i]);
			    itm_id = item_id_arr[i];
			}

		}else{
			if(obj_var_id_arr[i] == disp_obj_var_id_arr[i]){
			    if(var_ord_arr[i] == '1'){
					if(ov_l1_list_value != ''){
						ov_l1_list_value += ',';
					}
					ov_l1_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '2'){
			    	if(ov_l2_list_value != ''){
						ov_l2_list_value += ',';
					}
					ov_l2_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '3'){
					if(ov_l3_list_value != ''){
						ov_l3_list_value += ',';
					}
					ov_l3_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '4'){
					if(ov_l4_list_value != ''){
						ov_l4_list_value += ',';
					}
					ov_l4_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '5'){
					if(ov_l5_list_value != ''){
						ov_l5_list_value += ',';
					}
					ov_l5_list_value += item_id_arr[i];
				} else {
					//alert('var_ord ERROR');
					$administStatsMain.ui.loading(false);
					alert('통계 데이터가 존재하지 않습니다.');
				}
			} else {
				if(var_ord_arr[i] == '1'){
					if(ov_l1_list_value != ''){
						ov_l1_list_value += ',';
					}
					ov_l1_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '2'){
			    	if(ov_l2_list_value != ''){
						ov_l2_list_value += ',';
					}
					ov_l2_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '3'){
					if(ov_l3_list_value != ''){
						ov_l3_list_value += ',';
					}
					ov_l3_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '4'){
					if(ov_l4_list_value != ''){
						ov_l4_list_value += ',';
					}
					ov_l4_list_value += item_id_arr[i];
				} else if(var_ord_arr[i] == '5'){
					if(ov_l5_list_value != ''){
						ov_l5_list_value += ',';
					}
					ov_l5_list_value += item_id_arr[i];
				} else {
					//alert('var_ord ERROR');
					$administStatsMain.ui.loading(false);
					alert('통계 데이터가 존재하지 않습니다.');
				}
			}
		}
	}

	/*if(region_code.length == 5) {
		ov_l1_list_value = "up:" + region_code.substring(0,2);
	} else {
		if($houseDash.isChange) {
			ov_l1_list_value = "up:" + region_code;
		} else {
			if($houseDash.areaMode == "sido") {
				ov_l1_list_value = "up:00";
			} else {
				ov_l1_list_value = "up:" + region_code;
			}
		}
	}*/
	
	if(searchGubun == "2"){
		adm_cd_ = "00,"+region_code;
	}

	$.ajax({
		method: "POST",
		async: false,	// 반드시 동기처리 해야 함
		url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvDetailYears.json",
		data: { orgId: '101', tblId: tblId }, // 
		dataType: "json",
		success: function(res) {
			if (res.errCd == "0") {
				year += "," + parseInt(year - res.result.tmsData[0].updt_cycle);
			}
		},
		error: function(e) {
			alert('failed');
		}
	});
	
	//지도 분할시 로직 추가 20211015 csy
		var param = {
			surv_year_list: year // 수록시점
		   	,
		   	org_id_list: "101" // 조직번호
		   	,
		   	tbl_id_list: tblId // 통계표 ID
		   	,
		   	list_var_ord_list: "" // 차트화 할 대상 T20, T21, T22, T31, T32, T41,
		   	// T42, T51, T52, T60
		   	,
		   	prt_type: "part" // 출력방식 total:합계, part
		   	,
		   	char_itm_id_list: itm_id_text // 표특성항목
		   	,
		   	//adm_cd: 'l'+regin_var_ord_arr[0]+':'+region_code_normal // 지역코드
		   	adm_cd: "" // 지역코드
		   	,
		   	adm_unit: "" // 지역단위
		   	,
		   	ov_l1_list: ov_l1_list_value // 항목 1
		   	,
		   	ov_l2_list: ov_l2_list_value // 항목 2
		   	,
		   	ov_l3_list: ov_l3_list_value // 항목 3
		   	,
		   	ov_l4_list: ov_l4_list_value // 항목 4
		   	,
		   	ov_l5_list: ov_l5_list_value // 항목 5
		   	,
		   	category: "" // 카테고리 sido, sgg
		   	,
		   	orderby: "DTVAL_CO"
		}
	
		$houseDash.ajax.params = param;
		$administStatsMap.ui.selectedParams = param;
		
		let regionVarId = "";
		if($houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][0].regionVarOrd == "0") {
			regionVarId = "char_itm_id_list";
		} else {
			regionVarId = "ov_l" + $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][0].regionVarOrd + "_list"; 
		}
		
		fn_bindItmList($houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()], param);
		if($administStatsMain.ui.selectedArea != "") {
			if($administStatsMain.ui.selectedArea.length == 2) {
				if(searchGubun == "2") {
					param[regionVarId] = "up:" + searchGubun + "00";
				} else {
					if($houseDash.isChange) {
						let selCd = $("#modalSearchArea option:selected").val();
						if(selCd == "00") {
							param[regionVarId] = "up:00";
						} else {
							param[regionVarId] = "up:" + $administStatsMain.ui.selectedArea.substring(0,2);
						}
					} else {
						if($houseDash.areaMode == "sgg") {
							param[regionVarId] = "up:" + $administStatsMain.ui.selectedArea.substring(0,2);
						} else {
							param[regionVarId] = "up:00";
						}
					}
				}
			} else if($administStatsMain.ui.selectedArea.length == 3) {
				param[regionVarId] = "up:200";
			} else {
				param[regionVarId] = "up:" + $administStatsMain.ui.selectedArea.substring(0,2);
			}
		} else {
			if(searchGubun == "2") {
				param[regionVarId] = "up:200";
			} else {
				param[regionVarId] = "up:00";
			}
		}
		
		$.ajax({
			type: "GET",
		   	//url: "/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
		   	data: param,
			async: false,
		   	success: function(result) {					
				if(chartMode == 'sgg'){
					var sgg_code_ = "";

					if(regin_var_ord_arr[0] == '1'){
						ov_l1_list_value = region_code+sgg_code_;
					} else if (regin_var_ord_arr[0] == '2'){
						ov_l2_list_value = region_code+sgg_code_;
					} else if (regin_var_ord_arr[0] == '3'){
						ov_l3_list_value = region_code+sgg_code_;
					} else if (regin_var_ord_arr[0] == '4'){
						ov_l4_list_value = region_code+sgg_code_;
					} else if (regin_var_ord_arr[0] == '5'){
						ov_l5_list_value = region_code+sgg_code_;
					}
				} else {
					//if($administStatsMain.ui.selectedArea != "") {
					//	region_code = $administStatsMain.ui.selectedArea;
					//}
					if(regin_var_ord_arr[0] == '1'){
						ov_l1_list_value = region_code;
					} else if (regin_var_ord_arr[0] == '2'){
						ov_l2_list_value = region_code;
					} else if (regin_var_ord_arr[0] == '3'){
						ov_l3_list_value = region_code;
					} else if (regin_var_ord_arr[0] == '4'){
						ov_l4_list_value = region_code;
					} else if (regin_var_ord_arr[0] == '5'){
						ov_l5_list_value = region_code;
					}
				}
	
				
				var param2 = {
						surv_year_list: '' // 수록시점
					   	,
					   	org_id_list: "101" // 조직번호
					   	,
					   	tbl_id_list: tblId // 통계표 ID
					   	,
					   	list_var_ord_list: "" // 차트화 할 대상 T20, T21, T22, T31, T32, T41,
					   	// T42, T51, T52, T60
					   	,
					   	prt_type: "total" // 출력방식 total:합계, part
					   	,
					   	char_itm_id_list: itm_id_text // 표특성항목
					   	,
						//   	adm_cd: '' // 지역코드
						//adm_cd: 'l'+regin_var_ord_arr[0]+':'+region_code_normal // 지역코드
						adm_cd: ""
					   	,
					   	adm_unit: "" // 지역단위
					   	,
					   	ov_l1_list: ov_l1_list_value // 항목 1
					   	,
					   	ov_l2_list: ov_l2_list_value // 항목 2
					   	,
					   	ov_l3_list: ov_l3_list_value // 항목 3
					   	,
					   	ov_l4_list: ov_l4_list_value // 항목 4
					   	,
					   	ov_l5_list: ov_l5_list_value // 항목 5
					   	,
					   	category: "" // 카테고리 sido, sgg
					   	,
					   	orderby: "DTVAL_CO"
				}
				
				var mapId = "";
				var polygonSelectedAreaNm = "";
				if($administStatsMap.ui.curMapId == 0){
					mapId = "";
					polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
				}else if($administStatsMap.ui.curMapId == 1){
					mapId = "1";
					polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
				}
				
				//주택자산가액기준 10분위/거주지역별 주택소유 가구수 비율 (시도별 총계데이터있고 전국에 대한 데이터없어서 차트가 안보임, 전국에대한 총합 데이터 새로 생성)
				/*if(tblId == "DT_1OH0412" || tblId == "DT_1A02005"){
					param2["adm_cd"] = 'l'+regin_var_ord_arr[0]+':'+adm_cd_;
				}*/
				
				fn_bindItmList($houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()], param2);
				
				if(chartMode == "sido") {
					if(searchGubun == "2") {
						param2["ov_" + 'l'+regin_var_ord_arr[0]+ "_list"] = "up:200";
					} else {
						param2["ov_" + 'l'+regin_var_ord_arr[0]+ "_list"] = "up:00";
					}
				} else {
					param2["ov_" + 'l'+regin_var_ord_arr[0]+ "_list"] = "up:" + region_code.substring(0,2);
				}
				
				/*if($administStatsMain.ui.selectedArea != "") {
					param2[regionVarId] = $administStatsMain.ui.selectedArea;
				} else {
					param2[regionVarId] = "00";
				}*/
				
				$.ajax({
					type: "GET",
				   	//url: "/view/kosisApi/TotsurvStatData.do",
					url: sgis4thApiPath,
				   	data: param2,
					async: false,
				   	success: function(result2) {
				    	if (result) {
	
							$houseDash.searchDataFin = true;
							
							//chartData = result;
							//chartDataYear = result2;
							
							if(chartData[region_code] != undefined) {
								if(chartData[region_code].length > 0) {
									chartData[region_code] = [];
								}
							}
							
							if(region_code.length == 3) {
								region_code = region_code.substring(1,3);
							}
							
							chartData[region_code] = result;
							
							let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
							
							if(searchGubun == "2") {
								param["ov_l" + dispOpt[0].regionVarOrd + "_list"] = "000";
								
								$.ajax({
									type: "GET",
								   	//url: "/view/kosisApi/TotsurvStatData.do",
									url: sgis4thApiPath,
								   	data: param,
									async: false,
								   	success: function(result) {
										for(let i=0; i<result.length; i++) {
											chartData[region_code].unshift(result[i]);
										}
										
										let dtOrga = chartData[region_code];
										for(let p=0; p<dtOrga.length; p++) {
											let orgaObj = dtOrga[p];
											for(let o=0; o<Object.keys(orgaObj).length; o++) {
												let key = Object.keys(orgaObj)[o];
												if(dispOpt[0].regionVarOrd == 0) {
													if(key == "CHAR_ITM_ID") {
														orgaObj[key] = orgaObj[key].substring(1, orgaObj[key].length);  
													}
												} else {
													if(key == "OV_L" + dispOpt[0].regionVarOrd + "_ID") {
														orgaObj[key] = orgaObj[key].substring(1, orgaObj[key].length);  
													}
												}
											}
										}
									}
								});
							}
							
							if(chartDataYear[region_code] != undefined) {
								if(chartDataYear[region_code].length > 0) {
									chartDataYear[region_code] = [];
								}
							}
							
							chartDataYear[region_code] = result2;
							
							if(searchGubun == "2") {
								param2["ov_l" + dispOpt[0].regionVarOrd + "_list"] = "000";
								$.ajax({
									type: "GET",
								   	//url: "/view/kosisApi/TotsurvStatData.do",
									url: sgis4thApiPath,
								   	data: param2,
									async: false,
								   	success: function(result) {
										for(let i=0; i<result.length; i++) {
											chartDataYear[region_code].unshift(result[i]);
										}
									}
								});
							}
							
							let dtOrga = chartDataYear[region_code];
							for(let p=0; p<dtOrga.length; p++) {
								let orgaObj = dtOrga[p];
								for(let o=0; o<Object.keys(orgaObj).length; o++) {
									let key = Object.keys(orgaObj)[o];
									if(dispOpt[0].regionVarOrd == 0) {
										if(key == "CHAR_ITM_ID") {
											if(searchGubun == "2") {
												orgaObj[key] = orgaObj[key].substring(1, orgaObj[key].length);
											} else {
												orgaObj[key] = orgaObj[key];
											}
										}
									} else {
										if(key == "OV_L" + dispOpt[0].regionVarOrd + "_ID") {
											if(searchGubun == "2") {
												orgaObj[key] = orgaObj[key].substring(1, orgaObj[key].length);
											} else {
												orgaObj[key] = orgaObj[key];
											}  
										}
									}
								}
							}
	
							var defaultTargetId;
							for(var i=0;i<chartInfo[chartOrd].length;i++){
								if(chartInfo[chartOrd][i].disp_obj_var_id == chartInfo[chartOrd][i].obj_var_id){
									defaultTargetId = chartInfo[chartOrd][i].itm_id;
									break;
								}
							}
							
							if(chartMode == 'country'){
								generateCharts(chartOrd, region_code, year.split(",")[0], defaultTargetId);
							} else if(chartMode == 'sido') {
								generateCharts(chartOrd, region_code, year.split(",")[0], defaultTargetId);
							} else if (chartMode == 'sgg') {
								//if(region_code_normal.length == 2) {
									generateCharts(chartOrd, region_code, year.split(",")[0], defaultTargetId);
								//} else {
								//	generateChartsSgg(chartOrd, region_code_normal.substring(0, 2), region_code_normal.substring(2, 5) , year.split(",")[0], defaultTargetId);
								//}
							} else if (chartMode == 'emdong') {
								generateChartsEmdong(chartOrd, region_code.substring(0, 2), region_code.substring(2, 5) , year.split(",")[0], defaultTargetId);
							}
							
							$administStatsMap.ui.selectedUnit = chartInfo[chartOrd][0].disp_unit_nm;
							
							if(region_code == searchGubun+'00' && (($houseDash.polygonSelectArea == "" && $administStatsMap.ui.curMapId == 0) || ($houseDash.polygonSelectArea1 == "" && $administStatsMap.ui.curMapId == 1))){
								if($('.modal-location').is(":visible")){
									//findRank(region_code);
								}	
							//} else if(chkRegionEnd == '시군구' && region_code.length == 5){
							} else if(chkRegionEnd == '시군구' && chartMode == 'sgg' && region_code.length == 5){
								if($('.modal-location').is(":visible")){
									//findRank(region_code + "" + sgg_code);
								}
							} else if(chkRegionEnd == '읍면동' && chartMode == 'emdong' && region_code.length == 5){
								if($('.modal-location').is(":visible")){
									//findRank(region_code +  "" + sgg_code +"" + emdong_code);
								}
							}else{
								if($('.modal-location').is(":visible")){
									//findRank(region_code);
								}
							}
							
							if($houseDash.isChange) {
								$administStatsMain.ui.pathChange(chartMode, region_code);
								$administStatsMap.ui.drawMapData(chartMode, "color"); // 맵 그리기
								$houseDash.areaMode = chartMode;
							}
							
							$('.panel-head.v2').css('display', 'block');
							
							$houseDash.isChange = false;
							$administStatsMain.ui.loading(false);
						}
				   	},
				   	error: function(data) {
						$administStatsMain.ui.loading(false);
				    	alert('오류발생!');
				   	}
				});
		   	},
		   	error: function(data) {
				$administStatsMain.ui.loading(false);
		    	alert('오류발생!');
		   	}
		});
	
	
	//}
	
	
	
	
}

var sidoNm = "";
var sidoValues = [], originValues = [], originCategories = [];
var sidoCategories = [];
var sggValues = [], originSggValues = [], originSggCategories = [];
var sggCategories = [];
var emdongValues = [], originEmdongValues = [], originEmdongCategories = [];
var emdongCategories = [];

// 차트 그리기
function generateCharts(chart_ord ,code, year) {
	sidoCategories = [], sidoValues = [];	
	drawCharts1(chart_ord ,code, year);
	if(!$houseDash.isContinue) {
		return false;
	}
	drawCharts2(chart_ord ,code, year);
	drawCharts3(chart_ord ,code, year);
	drawCharts4(chart_ord ,code, year);
}

// generateCharts 참고해서 다시만들어야함. 시연 때문에 수정하다가 중단함.
function generateChartsSgg(chart_ord ,code, sgg_code, emdong_code, year, target_id) {
	drawChartsSgg1(chart_ord , code, sgg_code, year);
	drawChartsSgg2(chart_ord , code, sgg_code, year);
	drawChartsSgg3(chart_ord , code, sgg_code, year);
	drawChartsSgg4(chart_ord , code, sgg_code, year);
	if($('.map-conrol').is('.off')){
		$('.chart-panel').animate({"right": '15'});
		$('.map-conrol').animate({"right": '605'});
		$('.map-conrol').removeClass('off');
		$('.modal-location').css('right', '660px').css('display', 'none');
	}
}

HashMap = function(){
	this.map = new Object();
};

HashMap.prototype ={
	put : function(key, value){
		this.map[key] = value;
	},

	get : function(key){
		return this.map[key];
	},

	getAll : function(){
		return this.map;
	},

	clear : function(){
		this.map = new Array();
	},

	getKeys : function(){
		var keys = new Array();
		for(i in this.map){
			keys.push(i);
		}
		return keys;
	}
}

var drawCharts1 = function(chart_ord ,code, year) {
	if(code == "") {
		code = "00";
	}
	
	// 차트 구성 하기위한 메타
	if($houseDash.timeLineChartItmClick != "") {
		year = $houseDash.timeLineChartItmClick;
	}
	
	var chartMeta = {};
	var notUsedChartMeta = {};
	
	$houseDash.chartOpt = {
		chart1: {
			maxVal: 0,
			pieColors: []
		}
	};
	
	var isBigItem = false;
	
	let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
	if(dispOpt[0].dispVarOrd == 0) {
		isBigItem = true;
	}
	
	let rootNode = [];
	for(var i=0; i<dispOpt.length; i++) {
		if(dispOpt[i].varOrd == dispOpt[0].dispVarOrd) {
			if(chartMeta[dispOpt[i].itmId] != undefined) {
				chartMeta[dispOpt[i].itmId] = dispOpt[i];
			} else {
				chartMeta[dispOpt[i].itmId] = {};
				chartMeta[dispOpt[i].itmId] = dispOpt[i];
			}
		}
	}
	
	let dispVarId = "", dispVarKor = "", dispUpVarKor = "", dispVarSn = "", regionVarId = "", stackVarId = "", stackVarKor = "", stackVarSn = "";
	if(dispOpt[0].dispVarOrd == "0") {
		dispVarId = "CHAR_ITM_ID";
		dispVarKor = "CHAR_ITM_NM";
		dispVarSn = "CHAR_ITM_SN";
	} else {
		dispVarId = "OV_L" + dispOpt[0].dispVarOrd + "_ID";
		dispVarKor = "OV_L" + dispOpt[0].dispVarOrd + "_KOR";
		dispUpVarKor = "OV_L" + dispOpt[0].dispVarOrd + "_UP_ITM_KOR";
		dispVarSn = "OV_L" + dispOpt[0].dispVarOrd + "_SN";
	}
	if(dispOpt[0].regionVarOrd == "0") {
		regionVarId = "CHAR_ITM_ID";
	} else {
		regionVarId = "OV_L" + dispOpt[0].regionVarOrd + "_ID";
	}
	if(dispOpt[0].stackVarOrd == "0") {
		stackVarId = "CHAR_ITM_ID";
		stackVarKor = "CHAR_ITM_NM";
		stackVarSn = "CHAR_ITM_SN";
	} else {
		stackVarId = "OV_L" + dispOpt[0].stackVarOrd + "_ID";
		stackVarKor = "OV_L" + dispOpt[0].stackVarOrd + "_KOR";
		stackVarSn = "OV_L" + dispOpt[0].stackVarOrd + "_SN";
	}
	let isSumFYn = false;
	for(let i=0; i<dispOpt.length; i++) {
		if(dispOpt[i].varOrd == dispOpt[0].dispVarOrd) {
			isSumFYn = true;
			break;
		}
	}
	
	var mapId = "";
	
	//주택자산가액기준 10분위/거주지역별 주택소유 가구수 비율 (시도별 총계데이터있고 전국에 대한 데이터없어서 차트가 안보임, 전국에대한 총합 데이터 새로 생성)
	//시도별 전 거주지역별 귀농가구원  (시도별 총계데이터있고 전국에 대한 데이터없어서 차트가 안보임, 전국에대한 총합 데이터 새로 생성)
	
	
	// 가공한 차트 데이터
	var series = [];
	var xAxis = [];
	var colors = [ {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 0,
					y2 : 1
				},
				stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
			} ];
	var total = 0;
	var showInLegend = false;
	var legend = {
		enabled : false
	};
	var stacking = "";
		
	var polygonSelectArea = "";
	var polygonSelectedAreaNm = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
	}
	
	if(polygonSelectArea.length == 2) {
		polygonSelectArea = polygonSelectArea;
	} else if(polygonSelectArea.length == 5) {
		polygonSelectArea = polygonSelectArea;
	} else {
		polygonSelectArea = "00";
	}
	
	polygonSelectArea = polygonSelectArea;

	var sido_cd = polygonSelectArea;
	if(sido_cd.length == 2) {
		sido_cd = "00";
	}
	polygonSelectedAreaNm = polygonSelectedAreaNm == "" ? "전국" : polygonSelectedAreaNm;
	
	let seriesData = [], data = [], subData1 = [], legendLen = 0;
	
	chartData[sido_cd].sort(function(a, b) { return a[dispVarId] - b[dispVarId]; });
	
	let isStackSumFYn = false;
	for(let j=0; j<dispOpt.length; j++) {
		if(dispOpt[j].varOrd == dispOpt[j].stackVarOrd) {
			if(dispOpt[j].subsumYn == "Y") {
				isStackSumFYn = true;
				break;
			}
		}
	}
	for(var j in chartMeta) {
		for(var k = 0; k < chartData[sido_cd].length; k++) { 
    		if(chartData[sido_cd][k].PRD_DE == year) {
    			let vItmId = chartMeta[j].itmId;
    			if(searchGubun == "2" && dispVarId == regionVarId) {
    				vItmId = chartMeta[j].itmId.substring(1,3);
    			}
    			if(dispVarId == regionVarId) {
    				if(chartData[sido_cd][k][regionVarId] == code                                                       
    						&& chartData[sido_cd][k][regionVarId] == vItmId) {
    					if(chartMeta[j].altrtvDispWrd != undefined) {
        					if(legendLen < chartMeta[j].altrtvDispWrd.length) {
        						legendLen = chartMeta[j].altrtvDispWrd.length;
        					}
        				}
        				if(chartData[sido_cd][k][stackVarKor] != undefined) {
        					if(legendLen < chartData[sido_cd][k][stackVarKor].length) {
        						legendLen = chartData[sido_cd][k][stackVarKor].length;
        					}
        				}
        				if(chartMeta[j].stackVarOrd != undefined) {
        					var dataObj = {
            			        name : chartMeta[j].altrtvDispWrd,
            	    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
            	    	        id : j,
            	    	        subNm : chartData[sido_cd][k][stackVarKor],
    			    	        subId : chartData[sido_cd][k][stackVarId],
            	    	        ord : chartData[sido_cd][k][stackVarSn] + "" + chartData[sido_cd][k][dispVarSn]
            	    	    };
        					if(chartMeta[j].subsumYn == "Y") {
        						$.extend(dataObj, {subsumYn: "Y"});
        					}
        					data.push(dataObj);
        				} else {
        					var dataObj = {
    							name : chartMeta[j].altrtvDispWrd,
            	    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
            	    	        id : j,
            	    	        ord : chartData[sido_cd][k][dispVarId]
            	    	    };
        					if(tblId == "DT_1NW1005") {
        						dataObj.name = chartData[sido_cd][k]["OV_L3_KOR"] + " " + chartMeta[j].altrtvDispWrd;
        					} else if(tblId == "DT_1NW1006" || tblId == "DT_1NW2003" || tblId == "DT_1NW3003") {
        						if(chartData[sido_cd][k][dispUpVarKor] != undefined) {
        							dataObj.name = chartData[sido_cd][k][dispUpVarKor] + " " + chartMeta[j].altrtvDispWrd;
        						}
    						}
        					if(chartMeta[j].subsumYn == "Y") {
        						$.extend(dataObj, {subsumYn: "Y"});
        					}
        					data.push(dataObj);
        				}
    				}
    			} else {
    			if(vItmId == chartData[sido_cd][k][dispVarId] &&
    					chartData[sido_cd][k][regionVarId] == code) {
    				if(chartMeta[j].altrtvDispWrd != undefined) {
    					if(legendLen < chartMeta[j].altrtvDispWrd.length) {
    						legendLen = chartMeta[j].altrtvDispWrd.length;
    					}
    				}
    				if(chartData[sido_cd][k][stackVarKor] != undefined) {
    					if(legendLen < chartData[sido_cd][k][stackVarKor].length) {
    						legendLen = chartData[sido_cd][k][stackVarKor].length;
    					}
    				}
    				if(chartMeta[j].stackVarOrd != undefined) {
    					var dataObj = {
        			        name : chartMeta[j].altrtvDispWrd,
        	    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
        	    	        id : j,
        	    	        subNm : chartData[sido_cd][k][stackVarKor],
			    	        subId : chartData[sido_cd][k][stackVarId],
            	    	        ord : chartData[sido_cd][k][stackVarSn] + "" + chartData[sido_cd][k][dispVarSn]
        	    	    };
    					
    					if(chartMeta[j].subsumYn == "Y") {
    						$.extend(dataObj, {subsumYn: "Y"});
    					}
    					data.push(dataObj);
    				} else {
    					var dataObj = {
							name : chartMeta[j].altrtvDispWrd,
        	    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
        	    	        id : j,
            	    	        ord : chartData[sido_cd][k][dispVarSn]
        	    	    };
    					
    					if(tblId == "DT_1NW1005") {
    						dataObj.name = chartData[sido_cd][k]["OV_L3_KOR"] + " " + chartMeta[j].altrtvDispWrd;
        						dataObj.ord = chartData[sido_cd][k][dispVarSn] + "" + chartData[sido_cd][k]["OV_L3_SN"];
    					} else if(tblId == "DT_1NW1006" || tblId == "DT_1NW2003" || tblId == "DT_1NW3003") {
    						if(chartData[sido_cd][k][dispUpVarKor] != undefined) {
    							dataObj.name = chartData[sido_cd][k][dispUpVarKor] + " " + chartMeta[j].altrtvDispWrd;
    						}
						}
    					
    					if(chartMeta[j].subsumYn == "Y") {
    						$.extend(dataObj, {subsumYn: "Y"});
    					}
    					data.push(dataObj);
        				}
    				}
    			}
    		}
		}
	}
	
	let legendWidth = (legendLen + 5) <= 16 ? 20 * 10 : (legendLen + 5) * 10;
	let chartLeft = parseInt((473-legendWidth)/473*100) < 50 ? "50%" : parseInt((473-legendWidth)/473*100).toString() + "%";
	
	data.sort(function(a, b) { return a.ord - b.ord });
	
	let isSumAt = false;
	for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
		let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
		if(optItm.varOrd == optItm.dispVarOrd) {
			if(optItm.subsumYn == "Y") {
				isSumAt = true;
				break;
			}
		}
	}
	let upAdmCd = polygonSelectArea.substring(0,2);
	let pieTotSum = 0;
	$administStatsMain.ui.pieTotSum = 0;
	for(let i=0; i<chartData[sido_cd].length; i++) {
		if(chartData[sido_cd][i].PRD_DE == year) {
			if(chartData[sido_cd][i][regionVarId] == $administStatsMain.ui.selectedArea) {
				if(isSumAt) {
					for(let j=0; j<dispOpt.length; j++) {
						if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
							if(dispOpt[j].subsumYn == "Y") {
								if(dispOpt[j].dispVarOrd == dispOpt[j].regionVarOrd && searchGubun == "2") {
									if(chartData[sido_cd][i][dispVarId] == dispOpt[j].itmId.substring(1,3)) {
										pieTotSum = parseInt(chartData[sido_cd][i].DTVAL_CO);
									}
								} else {
									if(chartData[sido_cd][i][dispVarId] == dispOpt[j].itmId) {
										pieTotSum = parseInt(chartData[sido_cd][i].DTVAL_CO);
									}
								}
							}
						}							
					}
				} else {
					for(let j=0; j<dispOpt.length; j++) {
						if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
							if(dispOpt[j].subsumYn != "Y") {
								if(dispOpt[j].dispVarOrd == dispOpt[j].regionVarOrd && searchGubun == "2") {
									if(chartData[sido_cd][i][dispVarId] == dispOpt[j].itmId.substring(1,3)) {
										pieTotSum += parseInt(chartData[sido_cd][i].DTVAL_CO);
									}
								} else {
									if(chartData[sido_cd][i][dispVarId] == dispOpt[j].itmId) {
										pieTotSum += parseInt(chartData[sido_cd][i].DTVAL_CO);
									}
								}
							}
						}
					}
				}
			}
		}
	}
	$administStatsMain.ui.pieTotSum = pieTotSum;
		for(var l=0; l<data.length; l++) {
		for(var n=0; n<dispOpt.length; n++) {
			if(dispOpt[n].allDispAt != "Y") {	// 합계 필드 보이는 통계
				if(data[l].subsumYn != "Y") {
					if(dispOpt[n].stackVarOrd != undefined) {
						if(dispOpt[n].itmId == data[l].subId && dispOpt[n].subsumYn != "Y") {
							let isAlready = false;
							for(var m=0; m<seriesData.length; m++) {
								if(data[l].id == seriesData[m].id) {
									seriesData[m].data.push(data[l].y);
									seriesData[m].ord.push(data[l].ord);
									seriesData[m].subNm.push(data[l].subNm);
									seriesData[m].subId.push(data[l].subId);
									isAlready = true;
								}
							}
							
							if(!isAlready) {
								let subDataObj = {
									name: data[l].name,
									id: data[l].id,
									data: [data[l].y],
									ord: [data[l].ord],
									subNm: [data[l].subNm],
									subId: [data[l].subId]	
								}
								
								if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
									$.extend(subDataObj, {type:"pie", size: 180, center: [chartLeft,"50%"]});
								}
								seriesData.push(subDataObj);
							}
						}
					} else {
						if(dispOpt[n].varOrd == dispOpt[n].dispVarOrd) {
							if(dispOpt[n].itmId == data[l].id && dispOpt[n].subsumYn != "Y") {
								if(dispOpt[n].itmId == data[l].id) {
									let isAlready = false;
									for(var m=0; m<seriesData.length; m++) {
										if(data[l].id == seriesData[m].id) {
											subData1[m].y.push(data[l].y);
											subData1[m].ord.push(data[l].ord);
											isAlready = true;
										}
									}
									
									if(!isAlready) {
										let subDataObj = {
											name: data[l].name,
											id: data[l].id,
											y: data[l].y,
											ord: data[l].ord
										};
										
										if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
											$.extend(subDataObj, {type:"pie", size: 180, center: [chartLeft,"50%"]});
										};
										
										subData1.push(subDataObj);
									}
								}
								
								let seriesDataObj = {
									name: dispOpt[0].chartNm,
									data: subData1	
								};
								
								if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
									$.extend(seriesDataObj, {type:"pie", size: 180, center: [chartLeft,"50%"]});
								};
								
								seriesData = [seriesDataObj];
							}
						}
					}
				}
			} else {
				if(dispOpt[n].stackVarOrd != undefined) {
					if(dispOpt[n].varOrd.toString() == dispOpt[n].stackVarOrd) {
						if(dispOpt[n].itmId == data[l].subId) {
							let isAlready = false;
							for(var m=0; m<seriesData.length; m++) {
								if(data[l].id == seriesData[m].id) {
									seriesData[m].data.push(data[l].y);
									seriesData[m].ord.push(data[l].ord);
									seriesData[m].subNm.push(data[l].subNm);
									seriesData[m].subId.push(data[l].subId);
									isAlready = true;
								}
							}
							
							if(!isAlready) {
								let subDataObj = {
									name: data[l].name,
									id: data[l].id,
									data: [data[l].y],
									ord: [data[l].ord],
									subNm: [data[l].subNm],
									subId: [data[l].subId]	
								}
								
								if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
									$.extend(subDataObj, {type:"pie", size: 180, center: [chartLeft,"50%"]});
								}
								seriesData.push(subDataObj);
							}
						}
					}
				} else {
					if(dispOpt[n].itmId == data[l].id) {
						if(dispOpt[n].itmId == data[l].id) {
							let isAlready = false;
							for(var m=0; m<seriesData.length; m++) {
								if(data[l].id == seriesData[m].id) {
									subData1[m].y.push(data[l].y);
									subData1[m].ord.push(data[l].ord);
									isAlready = true;
								}
							}
							
							if(!isAlready) {
								let subDataObj = {
									name: data[l].name,
									id: data[l].id,
									y: data[l].y,
									ord: data[l].ord
								};
								
								if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
									if(dispOpt[n].subsumYn != "Y") {
										$.extend(subDataObj, {type:"pie", size: 180, center: [chartLeft,"50%"]});
										subData1.push(subDataObj);
									}
								} else {
									subData1.push(subDataObj);
								}
							}
						}
						
						let seriesDataObj = {
							name: dispOpt[0].chartNm,
							data: subData1	
						};
						
						if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
							$.extend(seriesDataObj, {type:"pie", size: 180, center: [chartLeft,"50%"]});
						};
						
						seriesData = [seriesDataObj];
					}
				}
			}
		}
	}
	
	for(var m=0; m<seriesData.length; m++) {
		if(seriesData[m].subId != undefined) {
			for(var n=0; n<seriesData[m].subNm.length; n++) {
				for(var o=0; o<dispOpt.length; o++) {
					if(dispOpt[o].itmId == seriesData[m].subId[n]) {
						seriesData[m].subNm[n] = dispOpt[o].altrtvDispWrd;
					}
				}
			}
		} else {
			for(var o=0; o<dispOpt.length; o++) {
				if(dispOpt[o].itmId == seriesData[m].id) {
					seriesData[m].name = dispOpt[o].altrtvDispWrd;
				}
			}
		}
	}
	
	$houseDash.chartOpt = {
			chart1: {
				maxVal: 0,
				pieColors: []
			}
		};	
	
	if(seriesData.length > 0) {
	$houseDash.chartOpt.chart1.pieColors = (function () {
		  var colors = [];
		  var base = Highcharts.getOptions().colors[0];
			  if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
				  for(var l=0; l<seriesData[0].data.length; l++) {
					  colors.push(Highcharts.color(base).brighten((l-seriesData[0].data.length) / 10).get());
				  }
			  } else {
		  for(var l=0; l<seriesData.length; l++) {
			  colors.push(Highcharts.color(base).brighten((l-seriesData.length) / 10).get());
		  }
			  }
		  return colors;
	}());
	}
	
	let stackSum = {}, isOrd = false;
	for(var l=0; l<seriesData.length; l++) {
		if(seriesData[l].subId != undefined) {
			for(var m=0; m<seriesData[l].data.length; m++) {
				if(stackSum[seriesData[l].subId[m]] != undefined) {
					stackSum[seriesData[l].subId[m]] += parseFloat(seriesData[l].data[m]);
				} else {
					stackSum[seriesData[l].subId[m]] = 0;
					stackSum[seriesData[l].subId[m]] += parseFloat(seriesData[l].data[m]);
				}
				
				if(m>0 && seriesData[l].subId[m-1] > seriesData[l].subId[m]) {
					isOrd = true;
				}
			}
		}
	}
	
	/*if(isOrd) {
		for(var l=0; l<seriesData.length; l++) {
			seriesData[l].data.reverse();
			seriesData[l].subId.reverse();
			seriesData[l].subNm.reverse();
		}
	}*/
	
	if(dispOpt[0].stackVarOrd != undefined) {
		for(var l=0; l<seriesData.length; l++) {
			seriesData[l].legendIndex = l+1;
		}
	}

	if(tblId == "DT_1MA0032") {
		for(let i=0; i<seriesData.length; i++) {
			if(seriesData[i].id == "HC30") {
				seriesData[i].data.unshift(0);
			}
		}
	}
	if(seriesData.length == 0) {
		$houseDash.isChange = false;
		$houseDash.isContinue = false;
		$houseDash.iscontinue = false;
		//alert(dispOpt[0].chartNm + " - " + $("#modalSearchArea option:selected").text() + "\n표시할 데이터가 없습니다.");
		alert(dispOpt[0].chartNm + " - " + $houseDash.polygonSelectedAreaNm + "\n표시할 데이터가 없습니다.");
		$("#modalSearchArea option[value=" + ($administStatsMap.ui.mapToggleId == "" ? "00" : $administStatsMap.ui.mapToggleId) + "]").prop("selected", true);
		//$("#modalSearchArea option[value=00]").prop("selected", true);
		return false;
	} else {
		$houseDash.isContinue = true;
	}
	if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
		seriesData[0].data.sort(function(a, b) {
			return a.ord - b.ord;
		});
	}
	
	if(seriesData[0].subId != undefined) {
		for(var l=0; l<Object.keys(stackSum).length; l++) {
			if($houseDash.chartOpt.chart1.maxVal < stackSum[Object.keys(stackSum)[l]]) {
				$houseDash.chartOpt.chart1.maxVal = stackSum[Object.keys(stackSum)[l]];
			}
		}
	} else {
		for(var l=0; l<seriesData.length; l++) {
			if($houseDash.chartOpt.chart1.maxVal < seriesData[l].y) {
				$houseDash.chartOpt.chart1.maxVal = seriesData[l].y;
			}
		}
	}
	
	let totData = [];
	for(var n=0; n<dispOpt.length; n++) {
		if(dispOpt[n].allDispAt == "Y" && dispOpt[n].subsumYn == "Y") {
			for(var l=0; l<data.length; l++) {
				if(dispOpt[n].itmId == data[l].id) {
					totData.push({
						name: "전체",
						y: data[l].y
					});
				}
			}
			if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
				seriesData.push({
					type: 'pie',
					size: 140,
					center: [chartLeft,"50%"],
					name: '전체',
					id: 'total',
					data: totData,
					colors: ["#ffffff"],
					showInLegend: false,
					allowPointSelect: false,
					dataLabels : {
						distance: -75,
						enabled: true,
						formatter: function() {
							return this.key + "<br/>" + numberFormat(this.total) + dispOpt[0].dispUnitNm;
						},
						style: {
							fontSize: "14px"
						},
						position: "center",
						useHTML: true
					},
					events: {
						click: function() {
							return;
						},
						afterAnimate: function() {
							$("#chart_main"+mapId).find(".highcharts-label span").css("text-align", "center");
					    },
					},
					states: {
						hover: {
							enabled: false
						}
					},
					tooltip: { enabled: false }
				});
			}
		}
	}
	
	series = seriesData;
	if(dispOpt[0].stackVarOrd != undefined) {
		stacking = "normal";
	}
	
	if(dispOpt[0].stackVarOrd != undefined) {
		if(seriesData[0].subNm != undefined) {
			xAxis = {
				categories: seriesData[0].subNm,
			};
		} else {
			xAxis = {
				categories: seriesData[0].name,
			}
		}
		
		legend = {
			enabled: true,
			itemDistance: 5,
	    };
	} else {
		if(chartInfo[chart_ord][0].chart_type.trim() != 'CH1S06') {
			let categoriesArr = [], valuesArr = [];
			var base = Highcharts.getOptions().colors[0];
			for(let i=0; i<series[0].data.length; i++) {
				categoriesArr.push(series[0].data[i].name);				
				valuesArr.push({ y: series[0].data[i].y, color: Highcharts.color(base).brighten((i-series[0].data.length) / 10).get()});
				
				if($houseDash.chartOpt.chart1.maxVal < series[0].data[i].y) {
					$houseDash.chartOpt.chart1.maxVal = series[0].data[i].y;
				}
			}
			
			xAxis = {
				categories: categoriesArr,
				labels: {
					style: {
						fontSize: "13px",
						fontWeight: "700",
						fontFamily: "NanumSquare"
					}
				}
			};
			
			$houseDash.dataLabels = true;
			series = [{
				dataLabels: {
					enabled: $houseDash.dataLabels,
					formatter: function() {
						return numberFormat(this.y) + $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][0].dispUnitNm;
					}
				},
				data: valuesArr,
				colors: $houseDash.chartOpt.chart1.pieColors 
			}];
			
			legend = {
				enabled: false
		    };
		}
	}
	
	colors = $houseDash.chartOpt.chart1.pieColors;
	
	$houseDash.chartOpt.chart1.column = {
		stacking: stacking,
		borderWidth: 0,
		borderRadius: 0,
		dataLabels: {
			enabled: false
		}
	}
	
	showInLegend = true;
	
	var polygonSelectedAreaNm = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
    	$(".ttitle.charItmMapTitle.green").text(year + "년");
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
    	$(".ttitle1.charItmMapTitle.green").text(year + "년");
	}
	
    //if($houseDash.polygonSelectedAreaNm != "") {
    if(polygonSelectedAreaNm != "") {
    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
    	$('.tag_sido').text(polygonSelectedAreaNm);
		if(!$("#sidoClose").is(":visible")){
			$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
		}
    	if($("#modalSearchTitle option:selected").text().length > 20) {
    		//$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "...");
    		$houseDash.chartTitle = year +'년 ' + $("#modalSearchTitle option:selected").text();
    		$('.pancon1'+mapId+'h').text($houseDash.chartTitle);
    	} else {
    		$houseDash.chartTitle = year +'년 ' + $("#modalSearchTitle option:selected").text();
    		$('.pancon1'+mapId+'h').text($houseDash.chartTitle);
    	}
		if($("#mapRgn_2").is(":visible")){
			/*if($administStatsMap.ui.curMapId == 1){
				$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
			}else{
				$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
			}*/
			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기');
			$('.pancon3'+mapId+'h').text('시계열 보기');
			//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
			$('.pancon2'+mapId+'h').text('지역 비교 보기');
		}else{
			/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' );
			$('.pancon3'+mapId+'h').text('시계열 보기' );
			//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
			$('.pancon2'+mapId+'h').text('지역 비교 보기');
			if($houseDash.polygonSelectedAreaNm != "" && $houseDash.polygonSelectedAreaNm != "전국") {
				$houseDash.chartTitle = $('.pancon1'+mapId+'h').text()+ " - " + $houseDash.polygonSelectedAreaNm;
			}
			if($houseDash.chartTitle.length >= 45) {
				$houseDash.chartTitleFontSize = "13px";
			} else if($houseDash.chartTitle.length >= 40 && $houseDash.chartTitle.length < 45){
				$houseDash.chartTitleFontSize = "14px";
			} else {
				$houseDash.chartTitleFontSize = "15px";
			}
			$('.pancon1'+mapId+'h').text($houseDash.chartTitle).css("font-size", $houseDash.chartTitleFontSize);
		}
		//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
    } else {
    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
    	$('.tag_sido').text("전국");
		$("#sidoClose").remove();
		if($houseDash.chartTitle.length >= 45) {
			$houseDash.chartTitleFontSize = "13px";
		} else if($houseDash.chartTitle.length >= 40 && $houseDash.chartTitle.length < 45){
			$houseDash.chartTitleFontSize = "14px";
		} else {
			$houseDash.chartTitleFontSize = "15px";
		}
    	$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text()).css("font-size", $houseDash.chartTitleFontSize);
		$('.pancon3'+mapId+'h').text('시계열 보기');
		//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
		$('.pancon2'+mapId+'h').text('지역 비교 보기');
    }
    $(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
    if(mapId == ""){
    	if(!$("#mapRgn_2").is(":visible")){
    		$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
    	}
    } 
	$(".mapDiv"+mapId+".charItmMapDiv").show();
	
	let chartTitleStr = $("#modalSearchYear option:selected").text() + "년 " + $("#modalSearchTitle option:selected").text();
	
	if($houseDash.chartItmClickName != "") {
		chartTitleStr += ">" + $houseDash.chartItmClickName;
	}
	
	if($houseDash.polygonSelectedAreaNm != "") {
		chartTitleStr += " - " + $houseDash.polygonSelectedAreaNm;
	}
	
	let yAxisCursor = "pointer";
	if(tblId == "DT_1NW1020"		// 신혼부부 특성별 평균 출생아 수
		|| tblId == "DT_1NW1022"	// 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
		|| tblId == "DT_1NW1024"	// 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
		|| tblId == "DT_1NW1037"	// 시군구별 신혼부부 수
		|| tblId == "DT_1NW2017"	// 초혼 신혼부부 특성별 평균 출생아 수
		|| tblId == "DT_1NW2019"	// 초혼 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
		|| tblId == "DT_1NW2021"	// 초혼 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
		|| tblId == "DT_1NW2035"	// 시군구별 초혼 신혼부부 수
		|| tblId == "DT_1NW3017"	// 재혼 신혼부부 특성별 평균 출생아 수
		|| tblId == "DT_1NW3019"	// 재혼 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
		|| tblId == "DT_1NW3021"	// 재혼 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
		|| tblId == "DT_1NW3035"	// 시군구별 재혼 신혼부부 수
		|| tblId == "DT_1OH0511"	// 거주지역별 1인당 평균 소유 주택수
		) {
		yAxisCursor = "default";
	}
	if(tblId == "DT_1MA0006") {
		if($("#modalSearchTitle option:selected").val() == "3") {
			$houseDash.chartOpt.chart1.pieColors = ["#7cb5ec", "#ff6d18"];
		} else {
			$houseDash.chartOpt.chart1.pieColors = ["#7cb5ec", "#f15c80", "#90ed7d", "#f7a35c", "#8085e9", "#434348", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
		}
	} else {
		$houseDash.chartOpt.chart1.pieColors = ["#7cb5ec", "#f15c80", "#90ed7d", "#f7a35c", "#8085e9", "#434348", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
	}
	let charts;
	if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S01'){
		//막대 그래프(가로)
		
		var mapId = "";
		var polygonSelectedAreaNm = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			//$("#panel32").show();
			$("#panel41").show();
		}
		$("#panel31").hide();
		$("#panel32").hide();
		
		charts = Highcharts.chart('chart_main'+mapId, {
			chart : {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				type : 'bar',
				events: {
					load: function(e) {
						if($houseDash.chartStackItmClick != "" && $houseDash.chartStackItmClick != undefined) {
							for(let i=0; i<e.target.series.length; i++) {
								let sb = e.target.series[i];
								if(sb.userOptions.id == $houseDash.chartItmClick) {
									for(let j=0; j<sb.userOptions.subId.length; j++) {
										if(sb.userOptions.subId[j] == $houseDash.chartStackItmClick) {
											e.target.series[i].data[j].select();
											$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + sb.userOptions.subNm[j] + " " + sb.userOptions.name);
										}
									}
								}
							}
						} else {
							$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
								if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
				    				if(bar.category == $houseDash.chartItmClickName) {
						    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
						    			bar.select();
						    		}
				    			} else {
				    				if(tblId == "DT_1OH0501" || tblId == "DT_1OH0401") {
							    		$houseDash.chartItmClick = "T001";
							    		$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
							    			if(bar.category.replace(/ /g, "") == "총주택") {
							    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
							    			}
								    	});
							    	} else if(tblId == "DT_1OH0511") {
							    		$houseDash.chartItmClick = "01";
							    		$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
							    			if(bar.category == "주택 소유자") {
							    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
							    			}
								    	});
							    	}
				    			}
							});
						}
						
						$("#chart_main"+mapId).css("overflow", "unset");
						setTimeout(function() {
							$("#chart_main"+mapId).find(".highcharts-scrolling").animate({"width": "473px"});
						}, 10);
					}
				}
			},
			title : {
				text : '',
			},
			exporting : {
				enabled : false,
				filename: chartTitleStr,
				chartOptions : {
					title : {
						text : chartTitleStr,
						style: {
							color: '#333333',
				        	fontSize: '14px',
				        	fontWeight: '700',
				        	fontFamily: 'NanumSquare',
				        	fontStyle: 'none',
				        	textTransform: 'none'
						}
					}
				}
			},
			credits : {
				enabled : false
			},
			legend : legend,
			/*xAxis: {
				type: 'category'
			},*/
			xAxis : xAxis,
			yAxis : {
				max: $houseDash.chartOpt.chart1.maxVal*1.2,
				min: 0,
				title : {
					enabled : false
				},
				labels : {
					enabled : false
				},
				stackLabels: {
		            enabled: true,
		            formatter: function() {
						if(this.total <= 3) {
							return "x";
						} else {
							return numberFormat(this.total) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm
						}
					}
		        },
				gridLineWidth : 0,
				reversedStacks: false
			},
			/*colors : [ {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 0,
					y2 : 1
				},
				stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
			} ],*/
			plotOptions : {
				series : {
					dataLabels : {
						enabled : true,
						//format : '{point.y:,.0f} ' + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm,
						formatter: function() {
							if(this.total <= 3) {
								return "x";
							} else {
								return numberFormat(this.total) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm
							}
						}
					},
					cursor : yAxisCursor,
					borderRadius : 5,
					showInLegend : showInLegend,
					stacking : stacking,
					allowPointSelect: true,
					states: {
		                select: {
		                	color: "#FF0000",
		                }
		            }
				},
				bar : $.extend($houseDash.chartOpt.chart1.column, {
		            events : {
						click : function(evt) {
							if(tblId == "DT_1NW1020" || tblId == "DT_1NW1022" || tblId == "DT_1NW1024" || tblId == "DT_1NW2017" || tblId == "DT_1NW2019" || tblId == "DT_1NW2021" 
							|| tblId == "DT_1NW3017" || tblId == "DT_1NW3019"  || tblId == "DT_1NW3021" || tblId == "DT_1MA0003" || tblId == "DT_1MA0031"  ) {
								return false;
							}
							if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
								$administStatsMain.ui.logWrite( chartInfo[chart_ord][0].chart_nm, "03" ); //jrj 로그 [자세히/가로막대차트]
								$administStatsMap.ui.curMapId = 0;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
								$(".ttitle.charItmMapTitle.green").text(year + "년");
							}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
								$administStatsMap.ui.curMapId = 1;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
								$(".ttitle1.charItmMapTitle.green").text(year + "년");
							}
						    //if($houseDash.polygonSelectedAreaNm != "") {
						    if(polygonSelectedAreaNm != "") {
						    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
//						    	$('.tag_sido').text(polygonSelectedAreaNm);
								if(!$("#sidoClose").is(":visible")){
									$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
								}
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	}
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + $houseDash.polygonSelectedAreaNm);
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
								
								if($("#mapRgn_2").is(":visible")){
									/*if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
									}else{
										$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
									}*/
									$('.pancon3'+mapId+'h').text('시계열 보기');
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
								}else{
									/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
									//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
									$('.pancon3'+mapId+'h').text('시계열 보기');
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
									$('.pancon1'+mapId+'h').text($('.pancon1'+mapId+'h').text()+" - "+ polygonSelectedAreaNm);
								}
								//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
						    } else {
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
						    	$('.tag_sido').text("전국");
								$("#sidoClose").remove();
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	}		            	    	
								$('.pancon3'+mapId+'h').text('시계열 보기');
								//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
								$('.pancon2'+mapId+'h').text('지역 비교 보기');
						    }
							if(mapId == ""){
								if(!$("#mapRgn_2").is(":visible")){
									$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
								}
							} 
							$(".mapDiv"+mapId+".charItmMapDiv").show();
							
							if(evt.point.selected) {
								if(tblId != "DT_1OH0501" && tblId != "DT_1OH0511" && tblId != "DT_1OH0401" && tblId != "DT_1A02011") {
									$houseDash.chartItmClick = "";
									$houseDash.chartItmClickName = "";
									$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
						    	}
								
								if(dispOpt[0].stackVarOrd != undefined) {
									$houseDash.chartStackItmClick = "";
									$houseDash.chartItmClick = "";
									$houseDash.chartItmClickName = "";
								}
								
								$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    			if(bar.category == $houseDash.chartItmClickName) {
					    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
						    			bar.select();
					    			}
						    	});
							} else {
								if(chartMeta[Object.keys(chartMeta)[0]].stackVarOrd != undefined) {	// Stack을 사용할 경우 22.02.11 [이영호]
									for(let i=0; i<seriesData.length; i++) {
										if(seriesData[i].id == $("#chart_main").highcharts().hoverPoint.series.userOptions.id) {
											$houseDash.chartStackItmClick = seriesData[i].subId[$("#chart_main").highcharts().hoverPoint.x];
											$houseDash.chartItmClick = seriesData[i].id
											$houseDash.chartItmClickName = seriesData[i].subNm[$("#chart_main").highcharts().hoverPoint.x] + " " + seriesData[i].name; 
										}
									}
								} else {
									if(this.chart.hoverPoint.id.indexOf("highcharts") != -1) {
										$houseDash.chartItmClick = seriesData[0].data[this.chart.hoverPoint.x].id;
										$houseDash.chartItmClickName = seriesData[0].data[this.chart.hoverPoint.x].name;
									} else {
										$houseDash.chartItmClick = this.chart.hoverPoint.id;
										$houseDash.chartItmClickName = this.chart.hoverPoint.name;
									}
								}
								
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + $houseDash.chartItmClickName);
							}
							
							let region_cd = $administStatsMain.ui.selectedArea;
							if(region_cd.length == 2) {
								if(region_cd != "00") {
									region_cd = searchGubun + region_cd;
								}
							} else if(region_cd.length == 5) {
								region_cd = region_cd;
							} else {
								if(searchGubun == ""){
									region_cd = "00";
								} else {
									region_cd = "000";
								}
							}
							
							if($administStatsMap.ui.mapToggleId == "") {
								if(searchGubun == ""){
									region_cd = "00";
								} else {
									region_cd = "000";
								}
							}
							
							if(searchGubun == ""){
			            		drawCharts2(chart_ord, region_cd, year);
								drawCharts3(chart_ord, region_cd, year);
								drawCharts4(chart_ord, region_cd, year);
							}else{
			            		drawCharts2(chart_ord, region_cd, year);
								drawCharts3(chart_ord, region_cd, year);
								drawCharts4(chart_ord, region_cd, year);
							}
							
							//$('.pancon4'+mapId+'h').text(year +'년 지역별 데이터 보기');
							$('.pancon4'+mapId+'h').text('표 보기');
							
							//순위 세팅
							if($('.modal-location').is(":visible")){
								//findRank(code);
							}
							/*
							if(searchGubun + $administStatsMain.ui.selectedArea != code){
								if(code.length == 2 || searchGubun =="2"){
									$administStatsMain.ui.loading(true);
									$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기									
								} else {
									$administStatsMain.ui.loading(true);
									$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
								}
							}else{
								if($houseDash.chartItmClick != ''){
									if(code.length == 2  || searchGubun =="2"){
										$administStatsMain.ui.loading(true);
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(code.length == 5){
										$administStatsMain.ui.loading(true);
										$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
									}
								}
							}
							*/
							
							if(code.length == 2  || searchGubun =="2"){
								$administStatsMain.ui.loading(true);
								$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
							} else if(code.length == 5){
								$administStatsMain.ui.loading(true);
								$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
							}
							
							//나머지 맵도 선택
							if($("#mapRgn_2").is(":visible")){
								setTimeout(function(){
									if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
										$administStatsMap.ui.curMapId = 0;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
									}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
										$administStatsMap.ui.curMapId = 1;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
									}
									generateCharts(chart_ord ,"00", year);
									
									if(((($houseDash.polygonSelectArea == "" || $houseDash.polygonSelectArea.length == 2) && $administStatsMap.ui.curMapId == 0) || (($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2) && $administStatsMap.ui.curMapId == 1))){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(chkRegionEnd == '시군구' && chartMode == 'sgg' && (($houseDash.polygonSelectArea.length == 5 && $administStatsMap.ui.curMapId == 0) || ($houseDash.polygonSelectArea1.length == 5 && $administStatsMap.ui.curMapId == 1) )){
										$administStatsMap.ui.drawMapData("sgg", "color", region_code + "" + sgg_code); // 맵 그리기
									}
								}, 10) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
							}
						}
		            },
		            states : {
		            	select : {
		            		color : "#FF0000"
		            	},
		            	unselect: {
		            		
		            	}
		            }
				})
			},
			tooltip : {
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					let totSum = 0;
					if(tblId == "DT_1MA0001" || tblId == "DT_1MA0002" || tblId == "DT_1MA0003" || tblId == "DT_1MA0004" || tblId == "DT_1MA0005" || tblId == "DT_1MA0006"
						|| tblId == "DT_1MA0008" || tblId == "DT_1MA0007" || tblId == "DT_1MA0022" || tblId == "DT_1MA0023" || tblId == "DT_1MA0024" || tblId == "DT_1MA0026" || tblId == "DT_1MA0028"
						|| tblId == "DT_1MA0038") {
						let tblTotSum = 0;
						
						if(dispOpt[0].stackVarOrd != undefined) {
							this.series.chart.series.forEach(function(series) {
								if(series.chart.hoverPoint.category == e.chart.hoverPoint.category) {
									tblTotSum += series.data[e.chart.hoverPoint.x].y;
								}
							});
						} else {
							for(var i=0; i<this.series.data.length; i++) {
								tblTotSum += this.series.data[i].y;
							}
						}

						//return "<b>" + this.x + "<br/></b><b style='color:red'>" + (this.y/tblTotSum*100).toFixed(2) + "%</b>";
						return "<b>" + this.series.name + "</b><br/>"
							+ "<b>" + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm + "</b><br/><b style='color:red'>" + (this.y/tblTotSum*100).toFixed(2) + "%</b>";
					} if(tblId == "DT_1NW1007" || tblId == "DT_1NW2004" || tblId == "DT_1NW3004") {
						let tblTotSum = 0;
						
						if(dispOpt[0].stackVarOrd != undefined) {
							this.series.chart.series.forEach(function(series) {
								if(series.chart.hoverPoint.category == e.chart.hoverPoint.category) {
									tblTotSum += series.data[e.chart.hoverPoint.x].y;
								}
							});
						} else {
							for(var i=0; i<this.series.data.length; i++) {
								tblTotSum += this.series.data[i].y;
							}
						}
						
						return "<b>" + this.x + "</b><br/>"
						+ "<b>" + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm + "</b><br/><b style='color:red'>" + (this.y/tblTotSum*100).toFixed(2) + "%</b>";
					} else {
						befYear = parseInt(year)-1 , incDecStr = ""; 
						
						var polygonSelectArea = "";
						//if($administStatsMap.ui.curMapId == 0){
						//if(mapId == 0){
						if($(e.chart.container).parent().attr('id') == "chart_main"){
							polygonSelectArea = $houseDash.polygonSelectArea;
							totDt = 0;
							incDec = 0;
							befDt = [];
							$administStatsMap.ui.curMapId = 0;
						//}else if($administStatsMap.ui.curMapId == 1){
						//}else if(mapId == 1){
						}else if($(e.chart.container).parent().attr('id') == "chart_main1"){
							polygonSelectArea = $houseDash.polygonSelectArea1;
							befDt1 = [];
							totDt1 = 0;
							incDec1 = 0;
							$administStatsMap.ui.curMapId = 1;
						}

						if(polygonSelectArea == ""){
							polygonSelectArea = "00";
						}else{
							polygonSelectArea = searchGubun + polygonSelectArea;
						}

						var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
						for(var i=0; i<chartData[sido_cd].length; i++) {
							if(chartData[sido_cd][i].PRD_DE == befYear) {
								for(var j=0; j<Object.keys(chartMeta).length; j++) {
									let setChrItmId = Object.keys(chartMeta)[j];
									if(chartMeta[setChrItmId].varOrd == 0) {
										//if($houseDash.polygonSelectArea != "") {
										//if(polygonSelectArea != "") {
										if(polygonSelectArea != "" && polygonSelectArea != "000") {
											//if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor && this.key == chartMeta[setChrItmId].scr_kor && chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
											if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003" || chartData[sido_cd][i].TBL_ID == "DT_1NW3003" ){
												var scr_kor = "";
												if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
						       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
						       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else{
						       			        	scr_kor = chartMeta[setChrItmId].scrKor;
						       			        }
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor && this.key == scr_kor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
						       			    }else{
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor && this.key == chartMeta[setChrItmId].scrKor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
											}
										} else {
											if(code == "200"){
					        					code = "000";
					        				}
					        				if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003"  || chartData[sido_cd][i].TBL_ID == "DT_1NW3003" ){
												var scr_kor = "";
						       			        if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
						       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
						       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else{
						       			        	scr_kor = chartMeta[setChrItmId].scrKor;
						       			        }
												//if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor && this.key == chartMeta[setChrItmId].scr_kor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor && this.key == scr_kor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
						       			    }else{
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
														&& this.key == chartMeta[setChrItmId].scrKor
														&& chartData[sido_cd][i].ADM_CD == code) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
											}
										}
									} else {
										//if($houseDash.polygonSelectArea != "") {
										//if(polygonSelectArea != "") {
										if(polygonSelectArea != "" && polygonSelectArea != "000") {
											//if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor && this.key == chartMeta[setChrItmId].scr_kor && chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
											
											if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003" || chartData[sido_cd][i].TBL_ID == "DT_1NW3003"  ){
												var scr_kor = "";
						       			        if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
						       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
						       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else{
						       			        	scr_kor = chartMeta[setChrItmId].scrKor;
						       			        }
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor && this.key == scr_kor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
						       			    }else{
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor && this.key == chartMeta[setChrItmId].scrKor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
											}
										} else {
											if(code == "200"){
					        					code = "000";
					        				}
					        				
					        				if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003" || chartData[sido_cd][i].TBL_ID == "DT_1NW3003"  ){
												var scr_kor = "";
						       			        if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
						       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
						       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
						       			        }else{
						       			        	scr_kor = chartMeta[setChrItmId].scrKor;
						       			        }
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor && this.key == scr_kor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
						       			    }else{
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor 
														&& this.key == chartMeta[setChrItmId].scrKor
														&& chartData[sido_cd][i].ADM_CD == code) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													//befDt.push(chartData[sido_cd][i]);
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt.push(chartData[sido_cd][i]);
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														befDt1.push(chartData[sido_cd][i]);
													}
												}
											}	
										}
									}
								}
							} else {
								for(var j=0; j<Object.keys(chartMeta).length; j++) {
									let setChrItmId = Object.keys(chartMeta)[j];
									if(chartData[sido_cd][i][dispVarId] == chartMeta[setChrItmId].itmId 
											&& chartMeta[setChrItmId].subsumYn != "Y"
											&& chartData[sido_cd][i][regionVarId] == ($houseDash.polygonSelectArea != "" ? $houseDash.polygonSelectArea : "00")) {
										console.log(chartData[sido_cd][i]);
										totSum += parseInt(chartData[sido_cd][i].DTVAL_CO);
									}
								}
							}					
						}
						
						var incDec_ = 0;
						if($administStatsMap.ui.curMapId == 0){
							incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
							incDec_ = incDec;
							if(befDt.length > 0) {
								//if(incDec < 0) {
								if(incDec_ < 0) {
									//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
									incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
								//} else if(incDec > 0) {
								} else if(incDec_ > 0) {
									//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
									incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
								} else {
									incDecStr = "변동 없음";
								}
							} else {
								incDecStr = "전년도 자료 없음";
							}
						}else if($administStatsMap.ui.curMapId == 1){
							incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
							incDec_ = incDec1;
							if(befDt1.length > 0) {
								//if(incDec < 0) {
								if(incDec_ < 0) {
									//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
									incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
								//} else if(incDec > 0) {
								} else if(incDec_ > 0) {
									//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
									incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
								} else {
									incDecStr = "변동 없음";
								}
							} else {
								incDecStr = "전년도 자료 없음";
							}
						}
						//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
						
						/*if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}*/
						
						/*return '<b>' + this.key + '</b>' + //22.02.04 [이영호] 배창완 주무관 요청
							'<br/>' + incDecStr;*/
					}
				},
				footerFormat : ''
			},
			series : series
		});
	} else if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S02'){
		//막대 그래프(세로)
		let chartWidth = 0;
		if(series[0].data.length > 5) {
			//chartWidth = series[0].data.length * (legendLen * 8);
			chartWidth = series[0].data.length * (100);
		} else {
			chartWidth = 473;
		}
		let colWidth = 0;
		colWidth = chartWidth / (series[0].data.length*2);
		var mapId = "";
		var polygonSelectedAreaNm = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			$("#panel41").show();
		}
		$("#panel31").hide();
		$("#panel32").hide();
		
		charts = Highcharts.chart('chart_main'+mapId, {
			chart : {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				width: 473,
				scrollablePlotArea : {
					minWidth: chartWidth,
					scrollPositionX: 0,
					style : {
						height : "500px"
					}
				},
				type : 'column',
				events: {
					load: function(e) {
						if($houseDash.chartStackItmClick != "" && $houseDash.chartStackItmClick != undefined) {
							for(let i=0; i<e.target.series.length; i++) {
								let sb = e.target.series[i];
								if(sb.userOptions.id == $houseDash.chartItmClick) {
									for(let j=0; j<sb.userOptions.subId.length; j++) {
										if(sb.userOptions.subId[j] == $houseDash.chartStackItmClick) {
											e.target.series[i].data[j].select();
											$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + sb.userOptions.subNm[j] + " " + sb.userOptions.name);
										}
									}
								}
							}
						} else {
							$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
								if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
				    				if(bar.category == $houseDash.chartItmClickName) {
						    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
						    			bar.select();
						    		} else {
						    			if($houseDash.polygonSelectedAreaNm != "") {
						    				if(bar.category == $houseDash.polygonSelectedAreaNm) {
						    					$houseDash.chartItmClickName = bar.category; 
						    					$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
						    				}
						    			}
						    		}
				    			} else {
				    				if(tblId == "DT_1OH0501" || tblId == "DT_1OH0401") {
							    		$houseDash.chartItmClick = "T001";
							    		$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
							    			if(bar.category.replace(/ /g, "") == "총주택") {
							    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
								    			$houseDash.chartItmClickName = bar.category;
							    			}
								    	});
							    	} else if(tblId == "DT_1A02011") {
							    		$houseDash.chartItmClick = "00";
							    		$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
							    			if(bar.category == "평균재배면적") {
							    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
								    			$houseDash.chartItmClickName = bar.category;
							    			}
								    	});
							    	} else if(tblId == "DT_1A02010") {	// 시도별 작물별 작물재배 귀농가구
							    		$houseDash.chartItmClick = "00";
							    		$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
							    			if(bar.category == "재배가구") {
							    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
								    			$houseDash.chartItmClickName = bar.category;
							    			}
								    	});
							    	} else if(tblId == "DT_1NW1005") {
							    		$houseDash.chartItmClick = "10";
							    		$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
							    			if(bar.category == "남편 초혼") {
							    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
								    			$houseDash.chartItmClickName = bar.category;
							    			}
								    	});
							    	} else if(tblId == "DT_1A02031") {
							    		$houseDash.chartItmClick = "00";
							    		$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
							    			if(bar.category == "사육가구") {
							    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
								    			bar.select();
								    			$houseDash.chartItmClickName = bar.category;
							    			}
								    	});
							    	}
				    			}
							});
						}
						
						$("#chart_main"+mapId).css("overflow", "unset");
						setTimeout(function() {
							$("#chart_main"+mapId).find(".highcharts-scrolling").animate({"width": "473px"});
						}, 500);
					}
				}
			},
			max: $houseDash.chartOpt.chart1.maxVal,
			min: 0,
			title : {
				text : '',
			},
			exporting : {
				enabled : false,
				filename: chartTitleStr,
				chartOptions : {
					title : {
						text : chartTitleStr,
						style: {
							color: '#333333',
				        	fontSize: '14px',
				        	fontWeight: '700',
				        	fontFamily: 'NanumSquare',
				        	fontStyle: 'none',
				        	textTransform: 'none'
						}
					}
				}
			},
			credits : {
				enabled : false
			},
			legend : legend,
			/*xAxis: {
				type: 'category'
			},*/
			xAxis : xAxis,
			yAxis : {
				title : {
					enabled : false
				},
				labels : {
					enabled : false
				},
				stackLabels: {
					enabled: true,
					formatter: function() {
						if(tblId == "DT_1NW1005") {
							let avgTot = this.total / this.axis.series[this.x].yData.length;
							
							return "평균 " + numberFormat(avgTot) + dispOpt[0].dispUnitNm; 
						} else {
							return numberFormat(this.total) + dispOpt[0].dispUnitNm;
						}
					}
				},
				reversedStacks: false,
				gridLineWidth : 0
			},
			colors: $houseDash.chartOpt.chart1.pieColors,
			plotOptions : {
				series : {
					cursor : yAxisCursor,
					borderRadius : 5,
					showInLegend : showInLegend,
					stacking : stacking,
					allowPointSelect: true,
					states: {
		                select: {
		                	color: "#FF0000",
		                }
		            }
				},
				column : $.extend($houseDash.chartOpt.chart1.column,
				{
					/*dataLabels : {
						enabled : true,
						//format : '{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm
						formatter: function() {
							var sum = 0;
							var series = this.series.chart.series;
							var j = 0;

							for (var i in series) {
								if (series[i].visible && series[i].options.stacking == 'normal' && series[i].xData.indexOf(this.x) > -1)
									sum += series[i].yData[series[i].xData.indexOf(this.x)];
							}
							if (this.total > 0) {
								return Highcharts.numberFormat(sum, 1);
							} else {
								return '';
							}
						}
					},*/
				},
				{
					pointWidth: colWidth,
		            events : {
		            	unselect: function() {
		            		$houseDash.chartItmClick = "";
							$houseDash.chartItmClickName = "";
		            	},
		            	click : function(evt) {
		            		if(								// 아이템과 지역이 동일 레벨일때 클릭되면 안됨
		            			tblId == "DT_1NW1020" 		// 신혼부부 특성별 평균 출생아 수
		            			|| tblId == "DT_1NW1022" 	// 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
		            			|| tblId == "DT_1NW1024"	// 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
	            				|| tblId == "DT_1NW2017"	// 초혼 신혼부부 특성별 평균 출생아 수
            					|| tblId == "DT_1NW2019"	// 초혼 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
            					|| tblId == "DT_1NW2021"	// 초혼 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
            					|| tblId == "DT_1NW3017"	// 재혼 신혼부부 특성별 평균 출생아 수
            					|| tblId == "DT_1NW3019"	// 재혼 신혼부부 특성별 첫째자녀의 평균 출산 소요기간
            					|| tblId == "DT_1NW3021"	// 재혼 신혼부부 특성별 첫째출산 후 둘째자녀 사이의 평균 출산 소요기간
            					|| tblId == "DT_1OH0511"	// 거주지역별 1인당 평균 소유 주택수
		            		) {
		            			return false;
		            		}
		            		
		            		if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
		            			$administStatsMain.ui.logWrite( chartInfo[chart_ord][0].chart_nm, "03" ); //jrj 로그 [자세히/세로막대차트]
								$administStatsMap.ui.curMapId = 0;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
			            		$(".ttitle.charItmMapTitle.green").text(year + "년");
							}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
								$administStatsMap.ui.curMapId = 1;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
			            		$(".ttitle1.charItmMapTitle.green").text(year + "년");
							}
						    //if($houseDash.polygonSelectedAreaNm != "") {
						    if(polygonSelectedAreaNm != "") {
						    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
						    	$('.tag_sido').text(polygonSelectedAreaNm);
								if(!$("#sidoClose").is(":visible")){
									$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
								}
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	}
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + $houseDash.polygonSelectedAreaNm);
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
								//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
								if($("#mapRgn_2").is(":visible")){
									/*if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
									}else{
										$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
									}*/
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
								}else{
									/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
									//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
									$('.pancon3'+mapId+'h').text('시계열 보기');
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
									$('.pancon1'+mapId+'h').text($('.pancon1'+mapId+'h').text()+" - "+polygonSelectedAreaNm);
								}
						    } else {
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
						    	$('.tag_sido').text("전국");
								$("#sidoClose").remove();
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	}		            	    	
								$('.pancon3'+mapId+'h').text('시계열 보기');
								//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
								$('.pancon2'+mapId+'h').text('지역 비교 보기');
						    }
							if(mapId == ""){
								if(!$("#mapRgn_2").is(":visible")){
									$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
								} 
							}
							$(".mapDiv"+mapId+".charItmMapDiv").show();
							
							if(evt.point.selected) {
								if(tblId != "DT_1OH0501" && tblId != "DT_1OH0511" && tblId != "DT_1OH0401" && tblId != "DT_1A02011"
									&& tblId != "DT_1A02010" && tblId != "DT_1NW1005" && tblId != "DT_1OH0511" && tblId != "DT_1A02031") {
									$houseDash.chartItmClick = "";
									$houseDash.chartItmClickName = "";
									$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
						    	}
								
								if(dispOpt[0].stackVarOrd != undefined) {
									$houseDash.chartStackItmClick = "";
									$houseDash.chartItmClick = "";
									$houseDash.chartItmClickName = "";
								}
								
								$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    			if(bar.category == $houseDash.chartItmClickName) {
					    				$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
						    			bar.select();
					    			}
						    	});
							} else {
								if(chartMeta[Object.keys(chartMeta)[0]].stackVarOrd != undefined) {	// Stack을 사용할 경우 22.02.11 [이영호]
									for(let i=0; i<seriesData.length; i++) {
										if(seriesData[i].id == $("#chart_main").highcharts().hoverPoint.series.userOptions.id) {
											$houseDash.chartStackItmClick = seriesData[i].subId[$("#chart_main").highcharts().hoverPoint.x];
											$houseDash.chartItmClick = seriesData[i].id
											$houseDash.chartItmClickName = seriesData[i].subNm[$("#chart_main").highcharts().hoverPoint.x] + " " + seriesData[i].name; 
										}
									}
								} else {
									if(this.chart.hoverPoint.id.indexOf("highcharts") != -1) {
										$houseDash.chartItmClick = seriesData[0].data[this.chart.hoverPoint.x].id;
										$houseDash.chartItmClickName = seriesData[0].data[this.chart.hoverPoint.x].name;
									} else {
										$houseDash.chartItmClick = this.chart.hoverPoint.id;
										$houseDash.chartItmClickName = this.chart.hoverPoint.name;
									}
								}
								
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + $houseDash.chartItmClickName);
							}
							
							let region_cd = $administStatsMain.ui.selectedArea;
							if(region_cd.length == 2) {
								if(region_cd != "00") {
									region_cd = region_cd;
								}
							} else if(region_cd.length == 5) {
								region_cd = region_cd;
							} else {
								region_cd = "00";
							}

		            		drawCharts2(chart_ord, region_cd, year);
							drawCharts3(chart_ord, region_cd, year);
							drawCharts4(chart_ord, region_cd, year);
							
							$houseDash.isChange = true;
							
							//$('.pancon4'+mapId+'h').text(year +'년 지역별 데이터 보기');
							$('.pancon4'+mapId+'h').text('표 보기');
							
							//순위 세팅
							if($('.modal-location').is(":visible")){
								//findRank(code);
							}
							
							/*
							if(searchGubun + $administStatsMain.ui.selectedArea != code){
								if(code.length == 2  || searchGubun =="2"){
									$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
								} else {
									$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
								}
							}else{
								if($houseDash.chartItmClick != ''){
									if(code.length == 2  || searchGubun =="2"){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(code.length == 5){
										$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
									}
								}
							}
							*/
							
							if($houseDash.isChange) {
								$administStatsMap.ui.drawMapData(chartMode, "color"); // 맵 그리기	
							}
							
							//나머지 맵도 선택
							/*if($("#mapRgn_2").is(":visible")){
								setTimeout(function(){
									if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
										$administStatsMap.ui.curMapId = 0;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
									}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
										$administStatsMap.ui.curMapId = 1;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
									}
									generateCharts(chart_ord ,"00", year);
									
									if(((($houseDash.polygonSelectArea == "" || $houseDash.polygonSelectArea.length == 2) && $administStatsMap.ui.curMapId == 0) || (($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2) && $administStatsMap.ui.curMapId == 1))){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(chkRegionEnd == '시군구' && chartMode == 'sgg' && (($houseDash.polygonSelectArea.length == 5 && $administStatsMap.ui.curMapId == 0) || ($houseDash.polygonSelectArea1.length == 5 && $administStatsMap.ui.curMapId == 1) )){
										$administStatsMap.ui.drawMapData("sgg", "color", region_code + "" + sgg_code); // 맵 그리기
									}
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
							}*/
						},
		            }
				})
			},
			tooltip : {
				enabled: $houseDash.dataLabels == true ? false : (stacking != "" ? true : false),
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					if(tblId == "DT_1MA0001" || tblId == "DT_1MA0002" || tblId == "DT_1MA0003" || tblId == "DT_1MA0004" || tblId == "DT_1MA0005" || tblId == "DT_1MA0006"
						|| tblId == "DT_1MA0008" || tblId == "DT_1MA0007" || tblId == "DT_1MA0022" || tblId == "DT_1MA0023" || tblId == "DT_1MA0024" || tblId == "DT_1MA0026" || tblId == "DT_1MA0028"
						|| tblId == "DT_1MA0031" || tblId == "DT_1MA0032" || tblId == "DT_1MA0033" || tblId == "DT_1MA0034" || tblId == "DT_1MA0035" || tblId == "DT_1MA0036" || tblId == "DT_1MA0037"
						|| tblId == "DT_1NW1022") {
						return "<b>" + this.series.name + "<br/>" + numberFormat(this.y) + dispOpt[0].dispUnitNm + "</b><br/>" +
							"<b style='color:red'>" + (this.y/this.total*100).toFixed(2) + "%</b>";
					} else if(tblId == "DT_1NW1005") { // 평균값
						let avg = 0;
						for(let i=0; i<this.series.data.length; i++) {
							avg += this.series.data[i].y;
						}
						
						avg = avg/this.series.data.length;
						
						return "<b>" + this.x + "<br/>" + numberFormat(this.y) + dispOpt[0].dispUnitNm + "</b>";
					} else {
						return "<b>" + this.key + "<br/>" + numberFormat(this.y) + dispOpt[0].dispUnitNm + "</b>";
					}
				},
				footerFormat : ''
			},
			series : series
		});
	} else if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S03'){
		//꺽은선 그래프
		
		var mapId = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			$("#panel41").show();
		}
		$("#panel31").hide();
		$("#panel32").hide();
		
		charts = Highcharts.chart('chart_main'+mapId, {
			chart : {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				events: {
					load: function() {
						if($houseDash.chartItmClick != "") {
					    	$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    		if(bar.category == $houseDash.chartItmClickName) {
					    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
					    			bar.select();
					    		}    		
					    	});
					    }
						
						$("#chart_main"+mapId).css("overflow", "unset");
						setTimeout(function() {
							$("#chart_main"+mapId).find(".highcharts-scrolling").animate({"width": "473px"});
						}, 500);
					}
				}
			},
			title : {
				text : '',
			},
			exporting : {
				enabled : false,
				filename: chartTitleStr,
				chartOptions : {
					title : {
						text : chartTitleStr,
						style: {
							color: '#333333',
				        	fontSize: '14px',
				        	fontWeight: '700',
				        	fontFamily: 'NanumSquare',
				        	fontStyle: 'none',
				        	textTransform: 'none'
						}
					}
				}
			},
			plotOptions: {
				series: {
					cursor: yAxisCursor
				}
			},
			tooltip : {
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					befYear = parseInt(year)-1, incDecStr = ""; 
					
					var polygonSelectArea = "";
					//if($administStatsMap.ui.curMapId == 0){
					//if(mapId == 0){
					if($(e.chart.container).parent().attr('id') == "chart_main"){
						polygonSelectArea = $houseDash.polygonSelectArea;
						totDt = 0;
						incDec = 0;
						befDt = [];
						$administStatsMap.ui.curMapId = 0;
					//}else if($administStatsMap.ui.curMapId == 1){
					//}else if(mapId == 1){
					}else if($(e.chart.container).parent().attr('id') == "chart_main1"){
						polygonSelectArea = $houseDash.polygonSelectArea1;
						totDt1 = 0;
						incDec1 = 0;
						befDt1 = [];
						$administStatsMap.ui.curMapId = 1;
					}
					//if(searchGubun != "" && sido_cd == "00"){
					if(searchGubun != ""){
						if(polygonSelectArea == ""){
							polygonSelectArea = "000";
						}else{
							polygonSelectArea = searchGubun + polygonSelectArea;
						}
					}
					var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
					for(var i=0; i<chartData[sido_cd].length; i++) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							if(chartData[sido_cd][i].PRD_DE == befYear) {
								let setChrItmId = Object.keys(chartMeta)[j];
								//if($houseDash.polygonSelectArea != "") {
								//if(polygonSelectArea != "") {
								if(polygonSelectArea != "" && polygonSelectArea != "000") {
									//if(chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
									if(chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
										if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003"  || chartData[sido_cd][i].TBL_ID == "DT_1NW3003" ){
											var scr_kor = "";
					       			        if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
					       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
					       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
					       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
					       			        }else{
					       			        	scr_kor = chartMeta[setChrItmId].scrKor;
					       			        }
											if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
													&& this.key == scr_kor) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}
											}
										}else{
											if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
													&& this.key == chartMeta[setChrItmId].scrKor) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}
											}
										}
										
									}
								} else {
									if(code == "200"){
										code = "000";
									}
									if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003"  || chartData[sido_cd][i].TBL_ID == "DT_1NW3003" ){
										var scr_kor = "";
				       			        if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
				       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
				       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
				       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
				       			        }else{
					       			        scr_kor = chartMeta[setChrItmId].scrKor;
				       			        }
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
												&& this.key == scr_kor
												&& chartData[sido_cd][i].ADM_CD != code) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}
										}
									}else{
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
												&& this.key == chartMeta[setChrItmId].scrKor
												&& chartData[sido_cd][i].ADM_CD != code) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}
										}
									}
									
								}
								
								//befDt.push(chartData[sido_cd][i]);
								if($administStatsMap.ui.curMapId == 0){
									befDt.push(chartData[sido_cd][i]);
								}else if($administStatsMap.ui.curMapId == 1){
									befDt1.push(chartData[sido_cd][i]);
								}
							}
						}
					}
					
					var incDec_ = 0;
					if($administStatsMap.ui.curMapId == 0){
						incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
						incDec_ = incDec;
						if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
						incDec_ = incDec1;
						if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}
					//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
					
					/*if(befDt.length > 0) {
						//if(incDec < 0) {
						if(incDec_ < 0) {
							//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
							incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
						//} else if(incDec > 0) {
						} else if(incDec_ > 0) {
							//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
							incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
						} else {
							incDecStr = "변동 없음";
						}
					} else {
						incDecStr = "전년도 자료 없음";
					}*/
					
					return '<b>' + this.key + '</b>' +
						'<br/>' + incDecStr;
				},
				footerFormat : ''
			},
			series : series
		});
	} else if (chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
		// 파이차트
		var pieColors = (function () {
			  var colors = [];
			  var base = Highcharts.getOptions().colors[0];

			  for(var i=0; i<dispOpt.length; i++) {
				  if(dispOpt[i].varOrd == dispOpt[0].dispVarOrd) {
					  colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
				  }
			  }
			  /*for (i = 0; i < chartInfo[chart_ord].length; i += 1) {
			    // Start out with a darkened base color (negative brighten), and end
			    // up with a much brighter color
			    colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
			  }*/
			  return colors;
			}());

		for(var i=0; i<series.length; i++){
			series[i].cursor = 'pointer';
			if(!(tblId == "DT_1MA0001" || sClassCd == "0204" || (sClassCd == "0203" && tblId != "DT_1OH0401") || (sClassCd == "0202" && tblId != "DT_1OH0511") || (sClassCd == "0201" && tblId != "DT_1OH0501") || tblId == "DT_1MA0031") ){
				//eries[i].innerSize = '50%';
				if(series.length > 1) {
					if(i == 0) {
						series[0].innerSize = '70%';
					} else if((i+1) == series.length) {
						series[i].innerSize = '0%';
					} else {
						series[i].innerSize = (series.length-i)/series.length * 70;
					}
				} else {
					series[i].innerSize = '50%';
				}
			} else {
				series[i].innerSize = '50%';
			}
		}
		
		var mapId = "";
		var polygonSelectedAreaNm = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			$("#panel41").show();
		}
		$("#panel31").hide();
		$("#panel32").hide();

		charts = Highcharts.chart('chart_main'+mapId, extendChartStyle({
			chart : {
				height: '200px',
				spacing:[10, 15, 10, 5],
				events: {
					load: function() {
						if($houseDash.chartItmClick != "") {
					    	$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    		if(bar.id == $houseDash.chartItmClick) {
					    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.name);
					    			bar.select();
					    		}    		
					    	});
					    }
						
						$("#chart_main"+mapId).css("overflow", "unset");
						setTimeout(function() {
							$("#chart_main"+mapId).find(".highcharts-scrolling").animate({"width": "473px"});
						}, 10);
					}
				},
				width: 473
			},
			title : {
				text : '',
			},
			exporting : {
				sourceWidth: 500,
			    sourceHeight: 250,
			    filename: chartTitleStr,
				enabled : false,
				chartOptions : {
					title : {
						text : chartTitleStr,
						style: {
							color: '#333333',
				        	fontSize: '14px',
				        	fontWeight: '700',
				        	fontFamily: 'NanumSquare',
				        	fontStyle: 'none',
				        	textTransform: 'none'
						}
					}
				}
			},
			plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: yAxisCursor,
					colors: $houseDash.chartOpt.chart1.pieColors,
		            showInLegend: true,
		            dataLabels: {
		                enabled: false,
		                //format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
		                //format: '<b>{point.name}</b><br/><b>' + numberFormat('{point.y}') + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>',
		                /*formatter: function() {
		                	return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>';
		                },*/
		                formmater: function() {
							if(this.y <= 3) {
								return "x";
							} else {
								return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm + '</b>';
							}
						},
		                distance: '-30%',
		                filter: {
		                    property: 'percentage',
		                    operator: '>',
		                    value: 4
		                },

		            },
		            events : {
		            	click : function(evt) {
		            		if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
								$administStatsMain.ui.logWrite( chartInfo[chart_ord][0].chart_nm, "03" ); //jrj 로그 [자세히/파이차트]
								$administStatsMap.ui.curMapId = 0;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
			            		$(".ttitle.charItmMapTitle.green").text(year + "년");
							}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
								$administStatsMap.ui.curMapId = 1;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
			            		$(".ttitle1.charItmMapTitle.green").text(year + "년");
							}
		            		
		            	    //if($houseDash.polygonSelectedAreaNm != "") {
		            	    if(polygonSelectedAreaNm != "") {
		            	    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
		            	    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
		            	    	$('.tag_sido').text(polygonSelectedAreaNm);
								if(!$("#sidoClose").is(":visible")){
									$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
								}
		            	    	if($("#modalSearchTitle option:selected").text().length > 20) {
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + $houseDash.polygonSelectedAreaNm);
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + polygonSelectedAreaNm);
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	} else {
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + $houseDash.polygonSelectedAreaNm);
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + polygonSelectedAreaNm);
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	}
		            			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + $houseDash.polygonSelectedAreaNm);
		            			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
		            			//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
		            			if($("#mapRgn_2").is(":visible")){
									/*if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
									}else{
										$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
									}*/
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
								}else{
									/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
									//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
									$('.pancon3'+mapId+'h').text('시계열 보기');
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
									$('.pancon1'+mapId+'h').text($('.pancon1'+mapId+'h').text()+" - "+polygonSelectedAreaNm);
								}
		            	    } else {
		            	    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
		            	    	$('.tag_sido').text("전국");
								$("#sidoClose").remove();
		            	    	if($("#modalSearchTitle option:selected").text().length > 20) {
		            	    		//$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "...");
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	} else {
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	}		            	    	
		            			$('.pancon3'+mapId+'h').text('시계열 보기');
		            			//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
		            			$('.pancon2'+mapId+'h').text('지역 비교 보기');
		            	    }
							if(mapId == ""){
								if(!$("#mapRgn_2").is(":visible")){
									$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
								}
							} 
							$(".mapDiv"+mapId+".charItmMapDiv").show();
							
							if(evt.point.selected) {
								$houseDash.chartItmClick = "";
								$houseDash.chartItmClickName = "";
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
							} else {
								if(evt.point.name == "총계"){
									$houseDash.chartItmClick = "";
									$houseDash.chartItmClickName = "";
									$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
			            		}else{
									$houseDash.chartItmClick = this.chart.hoverPoint.id;
									$houseDash.chartItmClickName = this.chart.hoverPoint.name;
									$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + this.chart.hoverPoint.name);
								}
							}
							
							let region_cd = $administStatsMain.ui.selectedArea;
							if(region_cd.length == 2) {
								if(region_cd != "00") {
									region_cd = region_cd;
								}
							} else if(region_cd.length == 5) {
								region_cd = region_cd;
							} else {
								region_cd = "00";
							}
							
							if($administStatsMap.ui.mapToggleId == "") {
								region_cd = "00";
							}

		            		drawCharts2(chart_ord, region_cd, year);
							drawCharts3(chart_ord, region_cd, year);
							drawCharts4(chart_ord, region_cd, year);
							
							//$('.pancon4'+mapId+'h').text(year +'년 지역별 데이터 보기');
							$('.pancon4'+mapId+'h').text('표 보기');
							
							//순위 세팅
							if($('.modal-location').is(":visible")){
								//findRank(code);
							}
							
							/*
							if(searchGubun + $administStatsMain.ui.selectedArea != code){
								if(code.length == 2  || searchGubun =="2"){
									$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
								} else {
									$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
								}
							}else{
								if($houseDash.chartItmClick != ''){
									if(code.length == 2  || searchGubun =="2"){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(code.length == 5){
										$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
									}
								}
							}
							*/
							/*if($houseDash.chartItmClick == ''){
								if(evt.point.name == "총계"){
									var cd = "00";
									if($administStatsMap.ui.curMapId == 1){
										drawCharts1(chart_ord , cd, year);
									}else if($administStatsMap.ui.curMapId == 0){
					            		drawCharts1(chart_ord , cd, year);
									}
			            		}
		            		}*/

							$administStatsMain.ui.loading(true);
							$administStatsMap.ui.drawMapData(chartMode, "color"); // 맵 그리기							
							
							//나머지 맵도 선택
							if($("#mapRgn_2").is(":visible")){
								setTimeout(function(){
									if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
										$administStatsMap.ui.curMapId = 0;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
									}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
										$administStatsMap.ui.curMapId = 1;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
									}
									generateCharts(chart_ord ,"00", year);
									
									if(((($houseDash.polygonSelectArea == "" || $houseDash.polygonSelectArea.length == 2) && $administStatsMap.ui.curMapId == 0) || (($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2) && $administStatsMap.ui.curMapId == 1))){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(chkRegionEnd == '시군구' && chartMode == 'sgg' && (($houseDash.polygonSelectArea.length == 5 && $administStatsMap.ui.curMapId == 0) || ($houseDash.polygonSelectArea1.length == 5 && $administStatsMap.ui.curMapId == 1) )){
										$administStatsMap.ui.drawMapData("sgg", "color", region_code + "" + sgg_code); // 맵 그리기
									}
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
							}
							
						}
		            }
		        },

	            series: {
	                allowPointSelect: true,
	                states: {
	                    select: {
	                        color: '#f00'
	                    }
	                },
	            }
		    },
			legend: {
	            itemMarginTop:3,
	            //labelFormat: '<b>{name}</b> / {percentage:.1f}%',
	            labelFormatter: function() {
	            	if(pieTotSum == 0) {
	            		return "<b>" + this.name + "</b> / 0%";
	            	} else {
	            		return "<b>" + this.name + "</b> / " + ((this.y/pieTotSum)*100).toFixed(1) + "%";
	            	}
	            },
	            floating:false,
	            align: "right",
	            verticalAlign: "middle",
	            itemWidth: legendWidth,
	            layout: 'vertical'
			},
			max: pieTotSum,
			tooltip : {
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					befYear = parseInt(year)-1, incDecStr = ""; 
					
					var polygonSelectArea = "";
					//if($administStatsMap.ui.curMapId == 0){
					//if(mapId == 0){
					if($(e.chart.container).parent().attr('id') == "chart_main"){
						polygonSelectArea = $houseDash.polygonSelectArea;
						totDt = 0;
						incDec = 0;
						befDt = [];
						$administStatsMap.ui.curMapId = 0;
					//}else if($administStatsMap.ui.curMapId == 1){
					//}else if(mapId == 1){
					}else if($(e.chart.container).parent().attr('id') == "chart_main1"){
						polygonSelectArea = $houseDash.polygonSelectArea1;
						totDt1 = 0;
						incDec1 = 0;
						befDt1 = [];
						$administStatsMap.ui.curMapId = 1;
					}
					//if(searchGubun != "" && sido_cd == "00"){
					polygonSelectArea = polygonSelectArea.substring(0,2);
						
					for(var i=0; i<chartData[sido_cd].length; i++) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							if(chartData[sido_cd][i].PRD_DE == befYear) {
								//if($houseDash.polygonSelectArea != "") {
								//if(polygonSelectArea != "") {
								if(polygonSelectArea != "" && polygonSelectArea != "000") {
									//if(chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
									if(chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
										let setChrItmId = Object.keys(chartMeta)[j];
										if(tblId == "DT_1NW1001") {
											if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
													&& this.key == chartMeta[setChrItmId].scrKor) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}
											}
											if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
													&& this.key == "총계") {
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}
											}
										//}else if(tblId == "DT_1MA0002" || tblId == "DT_1MA0003") {
										}else if((tblId == "DT_1MA0002" && chart_ord == 1 ) || (tblId == "DT_1MA0003" && chart_ord == 2 )  
											|| (tblId == "DT_1MA0008" && (chart_ord == 2 || chart_ord == 3)) || (tblId == "DT_1MA0023" && (chart_ord == 3 || chart_ord == 4))
											 || (tblId == "DT_1MA0022" && chart_ord == 2) || (tblId == "DT_1MA0024" && chart_ord == 2) || ((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))  ) {
											if(this.key == chartData[sido_cd][i]["OV_L2_KOR"]+" "+chartMeta[setChrItmId].scrKor
												&& chartData[sido_cd][i].ADM_CD == code) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}
											}
										} else if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003"  || chartData[sido_cd][i].TBL_ID == "DT_1NW3003" ){
											var scr_kor = "";
					       			        if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
					       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
					       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
					       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
					       			        }else{
					       			        	scr_kor = chartMeta[setChrItmId].scrKor;
					       			        }
					       			        if(this.key == scr_kor) {
												if(chartMeta[setChrItmId].varOrd == 0) {
													if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}
														}
													}
												} else {
													if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor && chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_ID"] == setChrItmId) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}
														}
													}
												}									
											}
										} else {
											if(this.key == chartMeta[setChrItmId].scrKor) {
												if(chartMeta[setChrItmId].varOrd == 0) {
													if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}
														}
													}
												} else {
													if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
															}
														}
													}
												}									
											}
											if(this.key == "총계") {
												if(chartMeta[setChrItmId].varOrd == 0) {
													if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}
														}
													}
												} else {
													if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}
														}
													}
												}									
											}
										}
									}
								} else {
									let setChrItmId = Object.keys(chartMeta)[j];
									if(code == "200"){
										code = "000";
									}
									if(tblId == "DT_1NW1001") {
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
												&& this.key == chartMeta[setChrItmId].scrKor
												&& chartData[sido_cd][i].ADM_CD == code) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}
										}
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor 
												&& this.key == "총계"
												&& chartData[sido_cd][i].ADM_CD == code) {
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}
										}
									//}else if(tblId == "DT_1MA0002" || tblId == "DT_1MA0003") {
									}else if((tblId == "DT_1MA0002" && chart_ord == 1 ) || (tblId == "DT_1MA0003" && chart_ord == 2 )  
										|| (tblId == "DT_1MA0008" && (chart_ord == 2 || chart_ord == 3)) || (tblId == "DT_1MA0023" && (chart_ord == 3 || chart_ord == 4))
										 || (tblId == "DT_1MA0022" && chart_ord == 2) || (tblId == "DT_1MA0024" && chart_ord == 2) || ((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))  ) {
										if(this.key == chartData[sido_cd][i]["OV_L2_KOR"]+" "+chartMeta[setChrItmId].scrKor
											&& chartData[sido_cd][i].ADM_CD == code) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
											}
										}
									} else if(chartData[sido_cd][i].TBL_ID == "DT_1NW1006" || chartData[sido_cd][i].TBL_ID == "DT_1NW2003"  || chartData[sido_cd][i].TBL_ID == "DT_1NW3003" ){
										var scr_kor = "";
				       			        if(setChrItmId == "11" || setChrItmId == "12" || setChrItmId == "13" || setChrItmId == "14"){
				       			        	scr_kor = "남자연상 " + chartMeta[setChrItmId].scrKor;
				       			        }else if(setChrItmId == "31" || setChrItmId == "32" || setChrItmId == "33" || setChrItmId == "34"){
				       			        	scr_kor = "여자연상 " + chartMeta[setChrItmId].scrKor;
				       			        }else{
				       			        	scr_kor = chartMeta[setChrItmId].scrKor;
				       			        }
				       			        if(this.key == scr_kor) {
											if(chartMeta[setChrItmId].varOrd == 0) {
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor
														&& chartData[sido_cd][i].ADM_CD == code) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}
													}
												}
											} else {
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_KOR"] == chartMeta[setChrItmId].scrKor
														&& chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_ID"] == setChrItmId
														&& chartData[sido_cd][i].ADM_CD == code) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}
													}
												}
											}									
										}
									} else {
										if(this.key == chartMeta[setChrItmId].scrKor) {
											if(chartMeta[setChrItmId].varOrd == 0) {
												if(chartData[sido_cd][i].CHAR_ITM_ID == chartMeta[setChrItmId].itmId
														&& chartData[sido_cd][i].ADM_CD == code) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}
													}
												}
											} else {
												if(chartData[sido_cd][i][dispVarId] == chartMeta[setChrItmId].itmId
														&& chartData[sido_cd][i].ADM_CD == code) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
														}
													}
												}
											}									
										}
										if(this.key == "총계") {
											if(chartMeta[setChrItmId].varOrd == 0) {
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor
														&& chartData[sido_cd][i].ADM_CD == code) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}
													}
												}
											} else {
												if(chartData[sido_cd][i][dispVarId] == chartMeta[setChrItmId].itmId
														&& chartData[sido_cd][i].ADM_CD == code) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}
													}
												}
											}									
										}
									}
								}
								
								//befDt.push(chartData[sido_cd][i]);
								if($administStatsMap.ui.curMapId == 0){
									befDt.push(chartData[sido_cd][i]);
								}else if($administStatsMap.ui.curMapId == 1){
									befDt1.push(chartData[sido_cd][i]);
								}
							}
						}
					}
					
					var incDec_ = 0;
					if($administStatsMap.ui.curMapId == 0){
						incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
						incDec_ = incDec;
						if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
						incDec_ = incDec1;
						if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}
					//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
					
					/*if(befDt.length > 0) {
						//if(incDec < 0) {
						if(incDec_ < 0) {
							//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
							incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
						//} else if(incDec > 0) {
						} else if(incDec_ > 0) {
							//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
							incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
						} else {
							incDecStr = "변동 없음";
						}
					} else {
						incDecStr = "전년도 자료 없음";
					}*/
					
					/*if(this.y <= 3) {	//22.02.04 [이영호] 배창완 주무관 요청 증감율 제거
						return '<b>' + this.key + '</b><br/><b>' + "x" + chartInfo[chart_ord][0].kosis_unit_nm + '</b>' +
						'<br/>' + incDecStr;
					} else {
						return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartInfo[chart_ord][0].kosis_unit_nm + '</b>' +
						'<br/>' + incDecStr;
					}*/
					
					return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartInfo[chart_ord][0].kosis_unit_nm + '</b>';
				},
				footerFormat : ''
			},
			series : series
		}));
	} else {
		// 다른 차트 디자인 및 구성
	};

	//$administStatsMain.ui.chart.push( charts );
	$administStatsMain.ui.chart[0] = charts;
	
	//pie 차트 중앙 총계 범례 지우기
	var legends = $("#chart_main"+mapId+" .highcharts-legend-item.highcharts-pie-series");
	for(var i=0; i<legends.length; i++) {
		if($(legends[i]).find("text:eq(0)").text().indexOf('총계') > -1 ){
			$(legends[i]).css('display', 'none');
		}
	}
	
	/*if(tblId != "DT_1MA0001" && tblId != "DT_1MA0002" && tblId != "DT_1MA0003" && tblId != "DT_1MA0004" && tblId != "DT_1MA0005" && tblId != "DT_1MA0006"
		&& tblId != "DT_1MA0008" && tblId != "DT_1MA0007" && tblId != "DT_1MA0022" && tblId != "DT_1MA0023" && tblId != "DT_1MA0024" && tblId != "DT_1MA0026" && tblId != "DT_1MA0028"
		&& tblId != "DT_1MA0031" && tblId != "DT_1MA0032" && tblId != "DT_1MA0033" && tblId != "DT_1MA0034" && tblId != "DT_1MA0035" && tblId != "DT_1MA0036" && tblId != "DT_1MA0037"
		&& tblId != "DT_1MA0038") {
		//누적차트일 경우 category 변경 
		if(sClassCd.substring(0,2) == "03" && !((tblId == "DT_1MA0023" && chart_ord == 3) || tblId == "DT_1MA0026" || tblId == "DT_1MA0028" || tblId == "DT_1MA0035" || tblId == "DT_1MA0033" || tblId == "DT_1MA0006" )){
			var legends = $("#chart_main"+mapId+" .highcharts-axis-labels.highcharts-xaxis-labels");
			for(var i=0; i<legends.length; i++) {
				$(legends[i]).find("text:eq(0)").text('남자');
				$(legends[i]).find("text:eq(1)").text('여자');
			}
		}
	}*/
}

var elsValues = [], elsCategories = [], befTot = 0, curTot = 0;
var DT_selected_name = "";
var sidoValuesDesc = [];

var drawCharts3 = function(chart_ord ,code, year) {
	if(code == "") {
		code = "00";
	}
	
	// 차트 구성 하기위한 메타
	if($houseDash.timeLineChartItmClick != "") {
		year = $houseDash.timeLineChartItmClick;
	}
	sidoCategories = [], sidoValues = [];
	var chartMeta = {};
	var notUsedChartMeta = {};
	var isBigItem = false;
	
	let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
	if(dispOpt[0].dispVarOrd == 0) {
		isBigItem = true;
	}
	
	let rootNode = [];
	for(var i=0; i<dispOpt.length; i++) {
		if(dispOpt[i].varOrd == dispOpt[0].dispVarOrd) {
			if(chartMeta[dispOpt[i].itmId] != undefined) {
				chartMeta[dispOpt[i].itmId] = dispOpt[i];
			} else {
				chartMeta[dispOpt[i].itmId] = {};
				chartMeta[dispOpt[i].itmId] = dispOpt[i];
			}
		}
	}
	
	let dispVarId = "", regionVarId = "", stackVarId = "";
	if(chartMeta[Object.keys(chartMeta)[0]].dispVarOrd == 0) {
		dispVarId = "CHAR_ITM_ID";
	} else {
		dispVarId = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].dispVarOrd + "_ID";
	}
	if(chartMeta[Object.keys(chartMeta)[0]].regionVarOrd == 0) {
		regionVarId = "CHAR_ITM_ID";
	} else {
		regionVarId = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].regionVarOrd + "_ID";
	}
	if(chartMeta[Object.keys(chartMeta)[0]].stackVarOrd == 0) {
		stackVarId = "CHAR_ITM_ID";
	} else {
		stackVarId = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].stackVarOrd + "_ID";
	}
	let stackSumItmId = "";
	for(let q=0; q<dispOpt.length; q++) {
		if(dispOpt[q].varOrd == dispOpt[0].stackVarOrd) {
			if(dispOpt[q].subsumYn == "Y") {
				stackSumItmId = dispOpt[q].itmId;
				break;
			}
		}
	}
	
	var unitChangeEvent = function(e) {
		/*generateCharts(chart_ord ,code, year, e.point.id);
		if(code == "00" || searchGubun =="2"){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
		//}else if(chkRegionEnd == '시군구'){
		}else if(chkRegionEnd == '시군구' && chartMode == 'sgg'){
			$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
		}*/
	}
	
	var regionData = [];
	if(code.length == 2 && code == "00") {
		$administStatsMain.ui.getAreaSido("00");
		regionData = $administStatsMain.ui.areaSidoData["00"];
		regionData.forEach(function(obj) {
			obj.adm_cd = obj.sido_cd;
			obj.adm_nm = obj.sido_nm;
		});
	} else {
		if($houseDash.isChange) {
			let selCd = $("#modalSearchArea option:selected").val();
			if(selCd == "00") {
				$administStatsMain.ui.getAreaSido("00");
				regionData = $administStatsMain.ui.areaSidoData["00"];
				regionData.forEach(function(obj) {
					obj.adm_cd = obj.sido_cd;
					obj.adm_nm = obj.sido_nm;
				});
			} else {
				$administStatsMain.ui.getAreaSgg(code.substring(0,2));
				regionData = $administStatsMain.ui.areaSggData[code.substring(0,2)];
				regionData.forEach(function(obj) {
					obj.adm_cd = code.substring(0,2) + obj.sgg_cd;
					obj.adm_nm = obj.sgg_nm;
				});
			}
		} else {
			if($houseDash.areaMode == "sgg") {
				$administStatsMain.ui.getAreaSgg(code.substring(0,2));
				regionData = $administStatsMain.ui.areaSggData[code.substring(0,2)];
				regionData.forEach(function(obj) {
					obj.adm_cd = code.substring(0,2) + obj.sgg_cd;
					obj.adm_nm = obj.sgg_nm;
				});
			} else {
				if(code.length == 5) {
					$administStatsMain.ui.getAreaSgg(code.substring(0,2));
					regionData = $administStatsMain.ui.areaSggData[code.substring(0,2)];
					regionData.forEach(function(obj) {
						obj.adm_cd = code.substring(0,2) + obj.sgg_cd;
						obj.adm_nm = obj.sgg_nm;
					});
				} else {
					$administStatsMain.ui.getAreaSido("00");
					regionData = $administStatsMain.ui.areaSidoData["00"];
					regionData.forEach(function(obj) {
						obj.adm_cd = obj.sido_cd;
						obj.adm_nm = obj.sido_nm;
					});
				}
			}
		}
	}
	
	var total;
	var selected_sido_name = '대한민국';
	
	var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
	if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
	 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
	  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
	   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
	    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
	     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
	   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
	       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
		    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
		searchGubun = "2";
	}
	
	for(var i =0; i<regionData.length; i++){
		if(regionData[i].adm_cd == code){
			selected_sido_name = regionData[i].sido_nm;
			break;
		}
		if((tblId == "DT_1MA0039" || tblId == "DT_1NW1033") && regionData[i].adm_cd == $houseDash.chartItmClick){
			DT_selected_name = regionData[i].adm_nm;
			break;
		}
	}
	
	var ord = chartMeta[Object.keys(chartMeta)[0]].var_ord;
	
	elsValues = [], elsCategories = [];
	originValues = [], originCategories = [], befTot = 0, curTot = 0;
	
	var polygonSelectArea = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea;
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
	}
	
	if(polygonSelectArea.length == 2 && code == "00") {
		polygonSelectArea = "00";
	} else if(polygonSelectArea.length == 2 && code != "00") {
		polygonSelectArea = polygonSelectArea.substring(0,2);
	} else if(polygonSelectArea.length == 5) {
		polygonSelectArea = polygonSelectArea;
	} else {
		polygonSelectArea = "00";
	}
	
	//var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
	//code = sido_cd;
	//var sido_cd = polygonSelectArea.length == 2 ? "00" : polygonSelectArea.substring(0,2);
	var sido_cd = polygonSelectArea.substring(0,2);
	
	let isSumAt = false;
	for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
		let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
		if(optItm.varOrd == optItm.dispVarOrd) {
			if(optItm.subsumYn == "Y") {
				isSumAt = true;
				break;
			}
		}
	}
	
	let sumVarOrdObj = {};
	for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
		let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
		if(optItm.subsumYn == "Y") {
			sumVarOrdObj[optItm.varOrd] = "";
			sumVarOrdObj[optItm.varOrd] = optItm.itmId;
		}
	}
	
	var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
	for(var i =0; i<regionData.length; i++){
		let avgCnt = 0;
		total = 0;
		for(var j = 0; j < chartData[sido_cd].length; j++){
			if(chartData[sido_cd][j].PRD_DE == year) {
				let region_cd = chartData[sido_cd][j][regionVarId];
				/*if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
					 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
					  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
					   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
					    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
					     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
					   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
					       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
						    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
					region_cd = region_cd.substring(1, region_cd.length);
				}*/
				let isReady = true;
				if(regionData[i].adm_cd == region_cd) {
					if(isSumAt) {
						for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
							let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
							let vItmId = optItm.itmId;
							if(searchGubun == "2" && dispVarId == regionVarId) {
								vItmId = optItm.itmId.substring(1,3);
								
								if($houseDash.chartStackItmClick == "") {
									if($houseDash.chartItmClick == "") {
										if(chartData[sido_cd][j][dispVarId] == vItmId) {
											total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
										}
									} else {
										if($houseDash.chartItmClick == chartData[sido_cd][j][dispVarId]) {
											if(chartData[sido_cd][j][dispVarId] == optItm.itmId) {
												total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
											}
										} else {
											if($houseDash.chartItmClickName == chartData[sido_cd][j]["OV_L" + dispOpt[0].regionVarOrd + "_KOR"]) {
												if(chartData[sido_cd][j][dispVarId] == optItm.itmId.substring(1,3)) {
													total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
												}
											}
										}
									}
								} else {
									if(chartData[sido_cd][j][stackVarId] == $houseDash.chartStackItmClick) {
										if($houseDash.chartItmClick == "") {
											if(chartData[sido_cd][j][dispVarId] == optItm.itmId) {
												total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
											}
										} else if($houseDash.chartItmClick == chartData[sido_cd][j][dispVarId]) {
											if(chartData[sido_cd][j][dispVarId] == optItm.itmId) {
												total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
											}
										}
									}
								}
							} else {
								if($houseDash.chartStackItmClick == "") {
									if($houseDash.chartItmClick == "") {
										/*let isEquals = true;
										if(chartData[sido_cd][j]["OV_L" + optItm.regionVarOrd + "_ID"] == regionData[i].adm_cd) {
											for(let s=0; s<Object.keys(sumVarOrdObj).length; s++) {
												let key = Object.keys(sumVarOrdObj)[i], oItmId = "";
												if(key != optItm.regionVarOrd) {
													if(key == 0) {
														oItmId = "CHAR_ITM_ID";
													} else {
														oItmId = "OV_L" + key + "_ID";
													}
												}
												
												if(chartData[sido_cd][j][oItmId] != sumVarOrdObj[key]) {
													isEquals = false;
												}
											}
											
											if(isEquals) {
												total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
											}
										}*/

										/*if(chartData[sido_cd][j]["CHAR_ITM_ID"] == sumVarOrdObj[0]
											&& chartData[sido_cd][j]["OV_L1_ID"] == region_cd
											&& chartData[sido_cd][j]["OV_L2_ID"] == sumVarOrdObj[2]
											&& chartData[sido_cd][j]["OV_L3_ID"] == sumVarOrdObj[3]
											&& chartData[sido_cd][j]["OV_L4_ID"] == sumVarOrdObj[4]) {
											//if(chartData[sido_cd][j][dispVarId] == vItmId) {
												total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
											//}
										}*/
										
										//console.log(chartData[sido_cd][j].DTVAL_CO);
										/*if(optItm.varOrd == optItm.stackVarOrd) {
											if(optItm.subsumYn == "Y") {
												let stackId = "OV_L" + optItm.stackVarOrd + "_ID";
												if(chartData[sido_cd][j][stackId] == optItm.itmId) {
													for(var l=0; l<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; l++) {
														let optItm2 = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][l];
														if(optItm2.varOrd == optItm2.dispVarOrd) {
															if(optItm2.subsumYn == "Y") {
																let dispId = "OV_L" + optItm2.dispVarOrd + "_ID";
																if(chartData[sido_cd][j][dispId] == optItm2.itmId) {
																	total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
																}
															}
														}
													}
												}
											}
										}*/
										if(optItm.subsumYn == "Y") {
											if($houseDash.chartStackItmClick != "") {
												let dispId = "";
												if(optItm.stackVarOrd == 0) {
													stackId = "CHAR_ITM_ID";
												} else {
													stackId = "OV_L" + optItm.stackVarOrd + "_ID";
												}
												if(chartData[sido_cd][j][stackId] == optItm.itmId) {
													for(var l=0; l<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; l++) {
														let optItm2 = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][l];
														if(optItm2.varOrd == optItm2.dispVarOrd) {
															if(optItm2.subsumYn == "Y") {
																let dispId = "";
																if(optItm2.dispVarOrd == 0) {
																	dispId = "CHAR_ITM_ID";
																} else {
																	dispId = "OV_L" + optItm2.dispVarOrd + "_ID";
																}
																if(chartData[sido_cd][j][dispId] == optItm2.itmId) {
																	total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
																}
															}
														}
													}
												}
											} else {
												if($houseDash.chartItmClick != "") {
													for(var l=0; l<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; l++) {
														let optItm2 = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][l];
														if(optItm2.varOrd == optItm2.dispVarOrd) {
															if(optItm2.subsumYn == "Y") {
																let dispId = "";
																if(optItm2.dispVarOrd == 0) {
																	dispId = "CHAR_ITM_ID";
																} else {
																	dispId = "OV_L" + optItm2.dispVarOrd + "_ID";
																}
																if(chartData[sido_cd][j][dispId] == optItm2.itmId) {
																	total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
																}
															}
														}
													}
												} else {
													if(optItm.varOrd == optItm.dispVarOrd) {
														if(optItm.subsumYn == "Y") {
															let dispId = "";
															if(optItm.dispVarOrd == 0) {
																dispId = "CHAR_ITM_ID";
															} else {
																dispId = "OV_L" + optItm.dispVarOrd + "_ID";
															}
															if(chartData[sido_cd][j][dispId] == optItm.itmId) {
																total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
															}
														}
													}
												}
											}
										}
										/*let dispId = "OV_L" + optItm.dispVarOrd + "_ID";
										if(chartData[sido_cd][j][dispId] == optItm.itmId) {
											total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
										}*/
										/*if(optItm.subsumYn == "Y") {
											if(optItm.varOrd == optItm.dispVarOrd) {
												if(chartData[sido_cd][j][dispVarId] == vItmId) {
													total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
													//avgCnt++;
												}
											}
										}*/
									} else if($houseDash.chartItmClick == chartData[sido_cd][j][dispVarId]) {
										if(chartData[sido_cd][j][dispVarId] == optItm.itmId) {
											total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
										}
									}
								} else {
									/*if(chartData[sido_cd][j][stackVarId] == $houseDash.chartStackItmClick) {
										if($houseDash.chartItmClick == "") {
											if(optItm.subsumYn == "Y") {
												if(chartData[sido_cd][j][dispVarId] == optItm.itmId) {
													total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
												}
											}
										} else if($houseDash.chartItmClick == chartData[sido_cd][j][dispVarId]) {
											if(chartData[sido_cd][j][dispVarId] == optItm.itmId) {
												total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
											}
										}
									}*/
									if(chartData[sido_cd][j][stackVarId] == $houseDash.chartStackItmClick) {
										if(optItm.varOrd == optItm.stackVarOrd) {
											let stackId = "";
											if(optItm.stackVarOrd == 0) {
												stackId = "CHAR_ITM_ID";
											} else {
												stackId = "OV_L" + optItm.stackVarOrd + "_ID";
											}
											if(chartData[sido_cd][j][stackId] == optItm.itmId) {
												for(var l=0; l<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; l++) {
													let optItm2 = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][l];
													if(optItm2.varOrd == optItm2.dispVarOrd) {
														let dispId = "";
														if(optItm2.stackVarOrd == 0) {
															dispId = "CHAR_ITM_ID";
														} else {
															dispId = "OV_L" + optItm2.dispVarOrd + "_ID";
														}
														if(chartData[sido_cd][j][dispId] == $houseDash.chartItmClick) {
															if(chartData[sido_cd][j][dispId] == optItm2.itmId) {
																total = parseFloat(chartData[sido_cd][j].DTVAL_CO);
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					} else {
						if($houseDash.chartStackItmClick != "") {
							if(chartData[sido_cd][j][stackVarId] == $houseDash.chartStackItmClick) {
								for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
									let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
									if($houseDash.chartItmClick != "") {
										if($houseDash.chartItmClick == chartData[sido_cd][j][dispVarId]) {
											if(optItm.itmId == chartData[sido_cd][j][dispVarId]) {
												total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
												avgCnt++;
											}
										}
									} else {
										if(chartData[sido_cd][j][dispVarId] == optItm.itmId) {
											total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
											avgCnt++;
										}
									}
								}
							}
						} else {
							if(stackSumItmId != "") {
								if(chartData[sido_cd][j][stackVarId] == stackSumItmId) {
									for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
										let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
										if($houseDash.chartItmClick == "") {
											if(optItm.itmId == chartData[sido_cd][j][dispVarId]) {
												total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
												avgCnt++;
											}
										} else {
											if(chartData[sido_cd][j][dispVarId] == optItm.itmId && chartData[sido_cd][j][dispVarId] == $houseDash.chartItmClick) {
												total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
												avgCnt++;
											}
										}
									}
								}
							} else {
								for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
									let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
									if(optItm.varOrd == optItm.dispVarOrd) {
										if($houseDash.chartItmClick == "") {
											if(optItm.subsumYn != "Y") {
												if(optItm.regionVarOrd == optItm.dispVarOrd) {
													if(optItm.itmId.substring(1,3) == chartData[sido_cd][j][dispVarId]) {
														total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
														avgCnt++;
													}
												} else {
													if(optItm.itmId == chartData[sido_cd][j][dispVarId]) {
														total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
														//avgCnt++;
													}
												}
											}
										} else {
											if(tblId == "DT_1NW1005") {
												if(chartData[sido_cd][j][dispVarId] == optItm.itmId && chartData[sido_cd][j][dispVarId] == $houseDash.chartItmClick) {
													if($houseDash.chartItmClickName.indexOf(chartData[sido_cd][j]["OV_L3_KOR"]) != -1) {
														total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
														avgCnt++;
													}
												}
											} else {
												if(chartData[sido_cd][j][dispVarId] == optItm.itmId && chartData[sido_cd][j][dispVarId] == $houseDash.chartItmClick) {
													total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
													avgCnt++;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		
		if(avgCnt > 0) {
			total = total/avgCnt;
		}
		/*var polygonSelectArea = "";
		if($administStatsMap.ui.curMapId == 0){
			polygonSelectArea = $houseDash.polygonSelectArea
		}else if($administStatsMap.ui.curMapId == 1){
			polygonSelectArea = $houseDash.polygonSelectArea1;
		}
		
		if(searchGubun != ""){
			if(polygonSelectArea == ""){
				polygonSelectArea = "000";
			}else{
				polygonSelectArea = searchGubun + polygonSelectArea;
			}
		}
		*/
		if($("#mapRgn_2").is(":visible")){
			//if(tblId == "DT_1NW1005" || tblId == "DT_1NW1027" ) {
			if(tblId == "DT_1NW1005"  ) {
				//if($houseDash.polygonSelectArea == sidoData[i].sido_cd){
				if(($houseDash.polygonSelectArea.length == 2 && $houseDash.polygonSelectArea == regionData[i].adm_cd) 
						|| ($houseDash.polygonSelectArea1.length == 2 && $houseDash.polygonSelectArea1 == regionData[i].adm_cd)){
					sidoCategories.unshift(regionData[i].adm_nm);
					originCategories.unshift(regionData[i].adm_nm);
					sidoValues.unshift({
						y : parseFloat((total/(2 * Object.keys(chartMeta).length)).toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : true
					});
					originValues.unshift({
						y : parseFloat((total/(2 * Object.keys(chartMeta).length)).toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
				} else {
					elsCategories.push(regionData[i].adm_nm);
					originCategories.push(regionData[i].adm_nm);
					elsValues.push({
						y : parseFloat((total/(2 * Object.keys(chartMeta).length)).toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
					originValues.push({
						y : parseFloat((total/(2 * Object.keys(chartMeta).length)).toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});			
				}
			}else{
				//if($houseDash.polygonSelectArea == sidoData[i].sido_cd){
				//if(polygonSelectArea == searchGubun+""+sidoData[i].sido_cd){
				if(($houseDash.polygonSelectArea.length == 2 && $houseDash.polygonSelectArea == regionData[i].adm_cd) 
						|| ($houseDash.polygonSelectArea1.length == 2 && $houseDash.polygonSelectArea1 == regionData[i].adm_cd)){
					sidoCategories.unshift(regionData[i].adm_nm);
					originCategories.unshift(regionData[i].adm_nm);
					sidoValues.unshift({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : true
					});
					originValues.unshift({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
				} else {
					elsCategories.push(regionData[i].adm_nm);
					originCategories.push(regionData[i].adm_nm);
					elsValues.push({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
					originValues.push({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});			
				}
			}
		}else{
			//if(tblId == "DT_1NW1005" || tblId == "DT_1NW1027" ) {
			if(tblId == "DT_1NW1005"  ) {
				//if($houseDash.polygonSelectArea == sidoData[i].sido_cd){
				if(polygonSelectArea == regionData[i].adm_cd){
					sidoCategories.unshift(regionData[i].adm_nm);
					originCategories.unshift(regionData[i].adm_nm);
					sidoValues.unshift({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : true
					});
					originValues.unshift({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
				} else {
					elsCategories.push(regionData[i].adm_nm);
					originCategories.push(regionData[i].adm_nm);
					elsValues.push({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
					originValues.push({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});			
				}
			}else{
				//if($houseDash.polygonSelectArea == sidoData[i].sido_cd){
				if(polygonSelectArea == regionData[i].adm_cd){
					sidoCategories.unshift(regionData[i].adm_nm);
					originCategories.unshift(regionData[i].adm_nm);
					sidoValues.unshift({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : true
					});
					originValues.unshift({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
				} else {
					elsCategories.push(regionData[i].adm_nm);
					originCategories.push(regionData[i].adm_nm);
					elsValues.push({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});
					originValues.push({
						y : parseFloat(total.toFixed(2)),
						id : regionData[i].adm_cd,
						name : regionData[i].adm_nm,
						selected : false
					});			
				}
			}
		}
	}
	
	if(sido_cd == "200") {
		sido_cd = "000";
	}
	for(var i=0; i<chartData[sido_cd].length; i++){
		var admCdd = "";
		if($houseDash.areaMode == "sido") {
			admCdd = "00";
		} else {
			admCdd = code.substring(0,2);
		}
		//if(chartData[sido_cd][i].ADM_CD == "00") {
		if(chartData[sido_cd][i][regionVarId] == admCdd) {
			if(chartData[sido_cd][i].PRD_DE == year) {
				if(tblId == "DT_1NW1001") {
					if($houseDash.chartStackItmClick != "") {
						if(chartData[sido_cd][i][stackVarId] == $houseDash.chartStackItmClick){
							if($houseDash.chartItmClick != "") {
								if(ord == "0") {
									if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
										curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								} else {
									if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
										curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								}						
							} else if(chartData[sido_cd][i].CHAR_ITM_ID == "T10") {
								curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}
					} else if(chartData[sido_cd][i].CHAR_ITM_ID == "T10") {
						curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				} else {
					if(((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))){
						if(chartData[sido_cd][i]['OV_L'+chartMeta[Object.keys(chartMeta)[0]].disp_var_ord+'_KOR'] != "계"){
							continue;
						}
					}
					if($houseDash.chartStackItmClick != "") {
						if(chartData[sido_cd][i][stackVarId] == $houseDash.chartStackItmClick){
							if($houseDash.chartItmClick != "") {
								if(ord == "0") {
									if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
										curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								} else {
									if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
										curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								}						
							} else {
								curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}
					} else {
						curTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				}			
			} else {
				if(tblId == "DT_1NW1001") {
					if($houseDash.chartStackItmClick != "") {
						if(chartData[sido_cd][i][stackVarId] == $houseDash.chartStackItmClick){
							if($houseDash.chartItmClick != "") {
								if(ord == "0") {
									if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
										befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								} else {
									if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
										befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								}						
							} else if(chartData[sido_cd][i].CHAR_ITM_ID == "T10") {
								befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}
					} else if(chartData[sido_cd][i].CHAR_ITM_ID == "T10") {
						befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				} else {
					if(((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))){
						if(chartData[sido_cd][i]['OV_L'+chartMeta[Object.keys(chartMeta)[0]].disp_var_ord+'_KOR'] != "계"){
							continue;
						}
					}
					if($houseDash.chartStackItmClick != "") {
						if(chartData[sido_cd][i][stackVarId] == $houseDash.chartStackItmClick){
							if($houseDash.chartItmClick != "") {
								if(ord == "0") {
									if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
										befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								} else {
									if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
										befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
									}
								}						
							} else {
								befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}
					} else {
						befTot += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				}	
			}		
		}
	}
	if($houseDash.chartItmClick == ""){
		var code = "00";
		if(curTot != yearSeriesDataArr[code][$administStatsMain.ui.selectedYear - yearCategoriesArr[code][0]]){
			curTot = yearSeriesDataArr[code][$administStatsMain.ui.selectedYear - yearCategoriesArr[code][0]];
		}
		if(befTot != yearSeriesDataArr[code][$administStatsMain.ui.selectedYear - yearCategoriesArr[code][0]-1]){
			befTot = yearSeriesDataArr[code][$administStatsMain.ui.selectedYear - yearCategoriesArr[code][0]-1];
		}
	}
	
	elsValues.sort(function(a, b) { return b.y - a.y});
	
	for(var i=0; i<elsValues.length; i++) {
		sidoCategories.push(elsValues[i].name);
		sidoValues.push(elsValues[i]);
	}
	
	let avgValue = function() {
		let totSum = 0;
		for(var i=0; i<elsValues.length; i++) {
			totSum += parseInt(elsValues[i].y);
		}
		return (totSum/elsValues.length).toFixed(2);
	}
	
	var localSerieName = '합계'
	
	var mapId = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		$("#panel11").show();
		$(".pancon11").show();
		//$("#panel21").show();
		//$("#panel31").show();
		$("#panel41").show();
	}
	$("#panel31").hide();
	$("#panel32").hide();
		
	//차트 아이디
	var id = "";
	if($("#mapRgn_2").is(":visible")){
		id = 'chart_local';
		if((mapId == "" && $houseDash.polygonSelectArea1.length == 5) || (mapId == "1" && $houseDash.polygonSelectArea.length == 5)){
			id = 'chart_local';
		}
	}else{
		id = 'chart_local';
	}
	
	let selYear = $("#modalSearchYear option:selected").text();
	let selObj = $("#modalSearchTitle option:selected").text();
	$houseDash.chartTitle = "";
	$houseDash.chartTitle += selYear + "년 " + selObj;
	if($houseDash.chartItmClickName != "") {
		$houseDash.chartTitle += ">" + $houseDash.chartItmClickName;
	}
	if($houseDash.polygonSelectedAreaNm != "") {
		$houseDash.chartTitle += " - " + $houseDash.polygonSelectedAreaNm;
	}
	// 시도 지역별 막대 차트
	//Highcharts.chart('chart_local'+mapId, {
	
	let charts = Highcharts.chart(id, {
		chart : {
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
			type : 'column',
			scrollablePlotArea : {
				minWidth: regionData.length * 60,
				scrollPositionX: 0,
				style : {
					height : "500px"
				}
			},
			events: {
				load: function() {
					$("#" + id).css("overflow", "unset");
					setTimeout(function() {
						$("#" + id).find(".highcharts-scrolling").animate({"width": "473px"});
					}, 500);
				}
			}
		},
		title : {
			text : $houseDash.chartTitle,
			align: "center",
			verticalAlign: "top",
			margin: 0,
			padding: 0,
			//itemMarginTop : 10,
			//floating: true,
			style: {
				color: '#333333',
	        	fontSize: '14px',
	        	fontWeight: '700',
	        	fontFamily: 'NanumSquare',
	        	fontStyle: 'none',
	        	textTransform: 'none'
			}
		},
		exporting : {
			sourceWidth: 960,
		    sourceHeight: 540,
		    filename: $houseDash.chartTitle,
			enabled : false,
			fallbackToExportServer : false,
			allowHTML : true,
			chartOptions : {
				plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
        	                	return numberFormat(this.y) + chartInfo[chart_ord][0].disp_unit_nm;
        	                },
                        },
                    }
                }
			}
		},
		credits : {
			enabled : false
		},
		legend : {
			enabled : false
		},
		xAxis : {
			categories : (function () {
				var sidoValues_ = sidoValues.slice();
				var sidoCategories_ =  [];
				$.each(sidoValues_, function(i, v){
					sidoCategories_[i] = sidoValues_[i].name.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
					.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
				});
				return sidoCategories_;
			})()
		},
		yAxis : {
			title : {
				enabled : false
			},
			labels : {
				enabled : false
			},
			gridLineWidth : 0,
			/*plotLines : [ { //22-01-28 [lyh] 배창완 주무관 삭제 요청
				color : "#FF0000",
				width : 2,
				value : (function () {
					var avg = 0;
					if(tblId == "DT_1NW1005" || tblId == "DT_1NW1020" || tblId == "DT_1NW1022" || tblId == "DT_1NW1024" || tblId == "DT_1NW1027" || tblId == "DT_1NW1035"
					 || tblId == "DT_1NW2017" || tblId == "DT_1NW2019" || tblId == "DT_1NW2021" || tblId == "DT_1NW3017" || tblId == "DT_1NW3019" || tblId == "DT_1NW3021"
					 ){
						avg = curTot;
					}else{
						avg = curTot / sidoValues.length;
					}
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
									series, ["시도 평균", this.options.value.toFixed(2)]
							),
							normalizedEvent = chart.pointer.normalize(e);
			              
						point.tooltipPos = [
							normalizedEvent.chartX - chart.plotLeft,
							normalizedEvent.chartY - chart.plotTop
						];
						
						$(e.currentTarget).css({ "stroke": "rgba(255, 120, 50, 0.8)", "stroke-width": "4px" });
			
						tooltip.refresh(point);
			        },
			        mouseout: function(e) {
			        	this.axis.chart.tooltip.hide();
			        	$(e.currentTarget).css({ "stroke": "#FF0000", "stroke-width": "2px" });
			        }
				}
			} ],*/
		},
		tooltip : {
			useHTML : true,
			headerFormat : '',
			//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
			formatter: function(e) {
				let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
				let regionVarId = "OV_L" + dispOpt[0].regionVarOrd + "_ID";
				let regionVarKor = "OV_L" + dispOpt[0].regionVarOrd + "_KOR";
				befYear = parseInt(year)-1, incDecStr = ""; 
				var polygonSelectArea = "";
				//if($administStatsMap.ui.curMapId == 0){
				//if(mapId == 0){
				if($(e.chart.renderTo).attr('id') == "chart_local"){
					polygonSelectArea = $houseDash.polygonSelectArea;
					totDt = 0;
					incDec = 0;
					befDt = [];
					befYearSum = 0;
					curYearSum = 0;
					$administStatsMap.ui.curMapId = 0;
				//}else if($administStatsMap.ui.curMapId == 1){
				//}else if(mapId == 1){
				}else if($(e.chart.renderTo).attr('id') == "chart_local1"){
					polygonSelectArea = $houseDash.polygonSelectArea1;
					totDt1 = 0;
					incDec1 = 0;
					befDt1 = [];
					befYearSum1 = 0;
					curYearSum1 = 0;
					$administStatsMap.ui.curMapId = 1;
				}
				//if(searchGubun != "" && sido_cd == "00"){
				polygonSelectArea = polygonSelectArea.substring(0,2);
				
				var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
				for(var i=0; i<chartData[sido_cd].length; i++) {
					if(chartData[sido_cd][i].PRD_DE == befYear) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							let setChrItmId = Object.keys(chartMeta)[j];
							let areaNm = chartData[sido_cd][i][regionVarKor].replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
								.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
							if(tblId == "DT_1NW1001") {								
								if(setChrItmId == "T10") {
									if(chartMeta[setChrItmId].varOrd == 0) {
										if($houseDash.chartItmClick != "") {
											if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick
													&& this.key == chartData[sido_cd][i][regionVarKor]) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												//befDt.push(chartData[sido_cd][i]);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										} else {
											if(chartData[sido_cd][i].CHAR_ITM_ID == "T10"
													&& this.key == chartData[sido_cd][i][regionVarKor]) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												//befDt.push(chartData[sido_cd][i]);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										}										
									} else {
										if($houseDash.chartItmClick != "") {
											if(chartData[sido_cd][i].CHAR_ITM_ID == "T10"
												&& chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_ID"] == $houseDash.chartItmClick
												&& chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_KOR"] == chartMeta[setChrItmId].scrKor
												&& this.key == chartData[sido_cd][i][regionVarKor]) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												//befDt.push(chartData[sido_cd][i]);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										} else {
											if(chartData[sido_cd][i].CHAR_ITM_ID == "T10"
												&& chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor
												&& this.key == chartData[sido_cd][i][regionVarKor]) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												//befDt.push(chartData[sido_cd][i]);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										}										
									}
								}
							}else if(tblId == "DT_1NW2007") {								
								if(chartMeta[setChrItmId].varOrd == 0) {
									if($houseDash.chartItmClick != "") {
										if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick
												&& this.key == chartData[sido_cd][i][regionVarKor]) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									} else {
										if(chartData[sido_cd][i].CHAR_ITM_ID == "0"
												&& this.key == chartData[sido_cd][i][regionVarKor]) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}										
								} else {
									if($houseDash.chartItmClick != "") {
										if(chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_ID"] == $houseDash.chartItmClick
											&& chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_KOR"] == chartMeta[setChrItmId].scrKor
											&& this.key == chartData[sido_cd][i][regionVarKor]) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									} else {
										//if(chartData[sido_cd][i].CHAR_ITM_ID == "T10" && chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor && this.key == chartData[sido_cd][i].ADM_KOR) {
										if(chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_ID"] == "0" && chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_KOR"] == chartMeta[setChrItmId].scrKor && this.key == chartData[sido_cd][i][regionVarKor]) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}										
								}
							} else {
								if( (tblId == "DT_1MA0003" && (chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_ID"] == "EF10" || chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_ID"] == "A10")) || (tblId == "DT_1MA0031" && chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].varOrd + "_ID"] == "HT20") ) {
									continue;
								}
								if(chartMeta[setChrItmId].varOrd == 0) {
									if($houseDash.chartItmClick != "") {
										if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick
											&& this.key == chartData[sido_cd][i][regionVarKor]
											&& chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									} else {
										if(this.key == chartData[sido_cd][i][regionVarKor]
											&& chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scrKor) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}									
								} else {
									if($houseDash.chartItmClick != "") {
										if(chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_ID"] == $houseDash.chartItmClick
												&& chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_KOR"] == chartMeta[setChrItmId].scrKor 
												&& this.key == chartData[sido_cd][i][regionVarKor]) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									} else {
										if(chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].varOrd+"_KOR"] == chartMeta[setChrItmId].scrKor
											&& this.key == chartData[sido_cd][i][regionVarKor]) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}									
								}
							}
						}
						if($administStatsMap.ui.curMapId == 0){
							befYearSum += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}else if($administStatsMap.ui.curMapId == 1){
							befYearSum1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}
					} else {
						if($administStatsMap.ui.curMapId == 0){
							curYearSum += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}else if($administStatsMap.ui.curMapId == 1){
							curYearSum1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}
					}
				}
				
				var incDec_ = 0;
				if($administStatsMap.ui.curMapId == 0){
					incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
					incDec_ = incDec;
					if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
				}else if($administStatsMap.ui.curMapId == 1){
					incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
					incDec_ = incDec1;
					if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
				}
				//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
				
				/*if(befDt.length > 0) {
					//if(incDec < 0) {
					if(incDec_ < 0) {
						//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
					//} else if(incDec > 0) {
					} else if(incDec_ > 0) {
						//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
				} else {
					incDecStr = "전년도 자료 없음";
				}*/
				
				if(this.key.indexOf("평균") != -1) {
					//let avgIncDec = ((befYearSum-curYearSum) / befYearSum * 100).toFixed(2), avgIncDecStr = "";
					let avgIncDec = 0, avgIncDecStr = "";
					if($administStatsMap.ui.curMapId == 0){
						avgIncDec = ((befYearSum-curYearSum) / befYearSum * 100).toFixed(2);
						if(befYearSum != 0) {
							if(avgIncDec < 0) {
								avgIncDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(avgIncDec) + "% 증가</span>";
							} else if(avgIncDec > 0) {
								avgIncDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(avgIncDec) + "% 감소</span>";
							} else {
								avgIncDecStr = "변동 없음";
							}
						} else {
							avgIncDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						avgIncDec = ((befYearSum1-curYearSum1) / befYearSum1 * 100).toFixed(2);
						if(befYearSum1 != 0) {
							if(avgIncDec < 0) {
								avgIncDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(avgIncDec) + "% 증가</span>";
							} else if(avgIncDec > 0) {
								avgIncDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(avgIncDec) + "% 감소</span>";
							} else {
								avgIncDecStr = "변동 없음";
							}
						} else {
							avgIncDecStr = "전년도 자료 없음";
						}
					}
					
					
					/*return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm +'</b>' +
					'<br/>' + avgIncDecStr;*/
					return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm +'</b>';
				} else{
					return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].dispUnitNm +'</b>';
				}				
			},
			footerFormat : ''
		},
		colors : [ {
			linearGradient : {
				x1 : 0,
				y1 : 0,
				x2 : 0,
				y2 : 1
			},
			stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
		} ],
		plotOptions : {
			series : {
				cursor : 'pointer',
				borderRadius : 5
			},
	        column: {
	            states : {
	            	select : {
	            		color : "#FF0000"
	            	}
	            },
	            events : {
	            	click : function() {
	            		//$administStatsMap.ui.map.setPolyLayerHighlight(this.chart.hoverPoint.id);
	            		//$administStatsMap.ui.mapList[0].setPolyLayerHighlight(this.chart.hoverPoint.id);
					}
	            },			
	        }
		},
		series : [{
			name : localSerieName,
			data : sidoValues
		}]
	});
	
	//$administStatsMain.ui.chart.push( charts );
	$administStatsMain.ui.chart[2] = charts ;
}

let gridSumFVal = 0;
var drawCharts2 = function(chart_ord ,code, year) {
	if(code == "") {
		code = "00";
	}
	// 차트 구성 하기위한 메타
	// 차트 구성 하기위한 메타
	if($houseDash.timeLineChartItmClick != "") {
		year = $houseDash.timeLineChartItmClick;
	}
	var chartMeta = {};
	var notUsedChartMeta = {};
	var isBigItem = false;
	
	let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
	if(dispOpt[0].dispVarOrd == 0) {
		isBigItem = true;
	}
	
	let rootNode = [];
	for(var i=0; i<dispOpt.length; i++) {
		if(dispOpt[i].varOrd == dispOpt[0].dispVarOrd) {
			if(chartMeta[dispOpt[i].itmId] != undefined) {
				chartMeta[dispOpt[i].itmId] = dispOpt[i];
			} else {
				chartMeta[dispOpt[i].itmId] = {};
				chartMeta[dispOpt[i].itmId] = dispOpt[i];
			}
		}
	}
    
	let dispVarId = "", regionVarId = "", stackVarId = "";
	if(chartMeta[Object.keys(chartMeta)[0]].dispVarOrd != undefined) {
		if(chartMeta[Object.keys(chartMeta)[0]].dispVarOrd == 0) {
			dispVarId = "CHAR_ITM_ID";
		} else {
			dispVarId = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].dispVarOrd + "_ID";
		}
	}
	if(chartMeta[Object.keys(chartMeta)[0]].regionVarOrd != undefined) {
		if(chartMeta[Object.keys(chartMeta)[0]].regionVarOrd == 0) {
			regionVarId = "CHAR_ITM_ID";
		} else {
			regionVarId = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].regionVarOrd + "_ID";
		}
	}
	if(chartMeta[Object.keys(chartMeta)[0]].stackVarOrd != undefined) {
		if(chartMeta[Object.keys(chartMeta)[0]].stackVarOrd == 0) {
			stackVarId = "CHAR_ITM_ID";
		} else {
			stackVarId = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].stackVarOrd + "_ID";
		}
	}
	
	let stackSumItmId = "";
	for(let q=0; q<dispOpt.length; q++) {
		if(dispOpt[q].varOrd == dispOpt[0].stackVarOrd) {
			if(dispOpt[q].subsumYn == "Y") {
				stackSumItmId = dispOpt[q].itmId;
				break;
			}
		}
	}

    var polygonSelectArea = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea;
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
	}
	
	//if(searchGubun != "" && sido_cd == "00"){
	if(polygonSelectArea.length == 2) {
		polygonSelectArea = polygonSelectArea.substring(0,2);
	} else if(polygonSelectArea.length == 5) {
		polygonSelectArea = polygonSelectArea.substring(0,5);
	} else {
		polygonSelectArea = "00";
	}

	// 가공한 차트 데이터
	var series = [];
	
	var unitChangeEvent = function(e) {
		/*generateCharts(chart_ord ,code, year, e.point.id);
		if(code == "00"){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
		//}else if(chkRegionEnd == '시군구'){
		}else if(chkRegionEnd == '시군구' && chartMode == 'sgg'){
			$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
		}*/
	}
	// 시계열에서 지역 이름 변경.
	//$("#selected_local_name").text(selected_sido_name);

	polygonSelectArea = code;
	
	//if(searchGubun != "" && sido_cd == "00"){
	var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
	
	// 시계열은 chartData가 아닌 chartDataYear 사용
	var yearData = {};
	var ord = chartMeta[Object.keys(chartMeta)[0]].varOrd;
	var regionCol = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].regionVarOrd + "_ID";
	//for(var i =0; i<chartDataYear.length;i++){
	
	let sumFCnt = {};
	// 시계열 데이터 셋팅
	
	let isSumFYn = false, isStackSumFYn = false;
										for(let j=0; j<dispOpt.length; j++) {
											if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
			if(dispOpt[j].subsumYn == "Y") {
				isSumFYn = true;
				break;
															}
														}
													}
	
	let upAdmCd = sido_cd.length == 2 ? "00" : sido_cd.substring(0,2);
	
	for(let j=0; j<dispOpt.length; j++) {
		if(dispOpt[j].varOrd == dispOpt[j].stackVarOrd) {
			if(dispOpt[j].subsumYn == "Y") {
				isStackSumFYn = true;
				break;
									}
								}
							}
	
	for(let i=0; i<chartDataYear[upAdmCd].length;i++){ 
		if(chartDataYear[upAdmCd][i][regionVarId] == sido_cd) {	// 현재 행정구역 데이터만 추출
			if($houseDash.chartStackItmClick != "") {		// 차트에서 선택된 STACK 존재 확인
				if(chartDataYear[upAdmCd][i][stackVarId] == $houseDash.chartStackItmClick) {	// 현재 데이터에서 STACK 데이터만 추출
							if($houseDash.chartItmClick != "") {										// 선택된 차트 아이템 존재 확인
						if(chartDataYear[upAdmCd][i][dispVarId] == $houseDash.chartItmClick) {	// 현재 데이터에서 선택된 아이템 추출
									for(let j=0; j<dispOpt.length; j++) {
										if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
									if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
										for(let k=0; k<dispOpt.length; k++) {
											if(dispOpt[k].varOrd == dispOpt[k].stackVarOrd) {
												if(searchGubun == "2") {
													if(dispVarId == regionVarId) {
														if(dispOpt[k].itmId.substring(1,3) == chartDataYear[upAdmCd][i][stackVarId]) {
															if(isSumFYn) {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
															} else {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
																if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
																} else {
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
										}
									}
								}
							} else {
														if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
															if(isSumFYn) {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	}
															} else {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																}
																if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
																} else {
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
															}
														}
													}
												}
											} else {
													if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
														if(isSumFYn) {
															if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
															} else {
																yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
															}
														} else {
															if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	} else {
																yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	}
															if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
															} else {
																sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				} else {
				if($houseDash.chartItmClick != "") {										// 선택된 차트 아이템 존재 확인
					if(chartDataYear[upAdmCd][i][dispVarId] == $houseDash.chartItmClick) {	// 현재 데이터에서 선택된 아이템 추출
						if(tblId == "DT_1NW1005") {
							let categoryName = $houseDash.chartItmClickName.split("")[0];
							if(chartDataYear[upAdmCd][i]["OV_L3_KOR"].indexOf(categoryName) != -1) {		// 시계열이 있으면 해당 년도에 데이터 추가
								if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
									yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
								} else {
									yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
									yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
								}
								if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
									sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
								} else {
									sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
									sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
								}
							}
						} else {
							if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
								yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
							} else {
								yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
								yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
							}
							if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
								sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
							} else {
								sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
								sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
							}
						}
					}
				} else {
								for(let j=0; j<dispOpt.length; j++) {
						if(dispVarId == regionVarId) {
							if(isStackSumFYn) {
								if(dispOpt[j].varOrd == dispOpt[j].stackVarOrd) {
									if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
										for(let k=0; k<dispOpt.length; k++) {
											if(isSumFYn) {
												if(dispOpt[k].varOrd == dispOpt[k].dispVarOrd) {
													if(searchGubun == "2") {
														if(dispVarId == regionVarId) {
															if(dispOpt[k].itmId != "000") {
																if(dispOpt[k].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
																	if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	} else {
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	}
																}
															}
														} else {
															if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
										}
									}
													} else {
														if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
															if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
															} else {
																yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
								}
							}
													}
												}
											}
										}
									}
								}
						} else {
								if(isSumFYn) {
								if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
										if(searchGubun == "2") {
											if(dispVarId == regionVarId) {
												if(dispOpt[j].itmId != "000") {
													if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
														if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														} else {
															yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														}
													}
												}
											} else {
												if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
													if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													}
												}
											}
										} else {
											if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										}
									}
								} else {
									if(searchGubun == "2") {
										if(dispVarId == regionVarId) {
											if([j].itmId != "000") {
												if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
													if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													}
												}
											}
										} else {
											if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										}
									} else {
										if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
											if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											} else {
												yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
										}
									}
								}
							}
						} else {
							if(isStackSumFYn) {							
											if(dispOpt[j].subsumYn == "Y") {
									if(dispOpt[j].varOrd == dispOpt[j].stackVarOrd) {
										if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
											for(let k=0; k<dispOpt.length; k++) {
												if(isSumFYn) {							
													if(dispOpt[k].subsumYn == "Y") {
														if(dispOpt[k].varOrd == dispOpt[k].dispVarOrd) {
															if(searchGubun == "2") {
																if(dispVarId == regionVarId) {
																	if(dispOpt[k].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
																		if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		} else {
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		}
																	}
																} else {
																	if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
																		if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		} else {
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		}
																	}
																}
															} else {
																if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
																	if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	} else {
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
							} else {
								if(isSumFYn) {							
									if(dispOpt[j].subsumYn == "Y") {
										if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
											if(searchGubun == "2") {
												if(dispVarId == regionVarId) {
													if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
														if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														} else {
															yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														}
													}
												} else {
													if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
														if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														} else {
															yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														}
													}
												}
											} else {
												if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
													if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													}
												}
											}
										}
									}
								} else {
									if(searchGubun == "2") {
										if(dispVarId == regionVarId) {
											if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										} else {
											if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										}
									} else {
										if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
											if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											} else {
												yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	for(let i=0; i<Object.keys(yearData).length; i++) {
		let key = Object.keys(yearData)[i];
		for(let j=0; j<yearData[key].length; j++) {
			if(sumFCnt[chartDataYear[sido_cd][i].PRD_DE] > 0) {
				yearData[key] = yearData[key]/sumFCnt[chartDataYear[sido_cd][i].PRD_DE];
			}
		}
	}
	gridSumFVal = yearData[year];
	
	/*for(let i=0; i<chartDataYear[sido_cd].length;i++){
		let isSumAt = false;
		if(stackSumItmId == "") {
			for(let obj in chartMeta) {
				if(chartMeta[obj].subsumYn == "Y") {
					isSumAt = true;
				}
			}
		}
		for(let obj in chartMeta) {
			if(chartMeta[obj] != undefined) {
				let vItmId = chartMeta[obj].itmId;
				if(searchGubun == "2" && dispVarId == regionVarId){
					vItmId = chartMeta[obj].itmId.substring(1,3);
				}
				if(isSumAt) {
					if($houseDash.chartStackItmClick != "") {
						if(chartDataYear[sido_cd][i][stackVarId] == $houseDash.chartStackItmClick) {
							if(chartMeta[obj].subsumYn == "Y" && $houseDash.chartItmClick == "") {
								if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
									if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
										if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
											yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
										} else {
											yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
											yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
										}
									}
								}
							} else {
								if($houseDash.chartItmClick == vItmId) {
									if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
										if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
											if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
												yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
											} else {
												yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
												yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
											}
											
										}
									}
								}
							}
						}
					} else {
						if(chartMeta[obj].subsumYn == "Y" && $houseDash.chartItmClick == "") {
							if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
								if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
									if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
										yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
									} else {
										yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
										yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
									}
								}
							}
						} else {
							if($houseDash.chartItmClick == vItmId) {
								if(chartDataYear[sido_cd][i][dispVarId] == chartMeta[obj].itmId) {
									if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
										if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
											yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
										} else {
											yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
											yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
										}
										
									}
								}
							}
						}
					}
				} else {
					if(chartMeta[obj] != undefined) {
						if(chartMeta[obj].subsumYn != "Y") {
							//if(tblId == "DT_1MA0001") {	//스택필드 합계 예외 처리 22.02.11 [이영호]
							if(dispOpt[0].stackVarOrd != undefined) {
								//console.log(chartDataYear[sido_cd][i][stackVarId] + "==" + stackSumItmId);
								if(stackSumItmId != "") {
									if($houseDash.chartStackItmClick != undefined && $houseDash.chartStackItmClick != "" && $houseDash.chartStackItmClick != null) {
										if($houseDash.chartItmClick != undefined && $houseDash.chartItmClick != "" && $houseDash.chartItmClick != null) {
											if(chartDataYear[sido_cd][i][dispVarId] == vItmId && chartDataYear[sido_cd][i][dispVarId] == $houseDash.chartItmClick
												&& chartDataYear[sido_cd][i][stackVarId] == $houseDash.chartStackItmClick) {
												if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
													if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													}
													
												}
											}
										} else {
											if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
												if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
													if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													}
													
												}
											}
										}
									} else {
										if(chartDataYear[sido_cd][i][stackVarId] == stackSumItmId) {
											if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
												if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
													if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													}
													
												}
											}
										}
											//&& chartDataYear[sido_cd][i][dispVarId] == chartMeta[obj].itmId) {
											//console.log(chartDataYear[sido_cd][i][stackVarId] + "==" + stackSumItmId);
											//console.log(chartDataYear[sido_cd][i][dispVarId] + "==" + chartMeta[obj].itmId);
											
										//}
									}
								} else {
									if($houseDash.chartStackItmClick != undefined && $houseDash.chartStackItmClick != "" && $houseDash.chartStackItmClick != null) {
										if($houseDash.chartItmClick != undefined && $houseDash.chartItmClick != "" && $houseDash.chartItmClick != null) {
											if(chartDataYear[sido_cd][i][dispVarId] == vItmId && chartDataYear[sido_cd][i][dispVarId] == $houseDash.chartItmClick
												&& chartDataYear[sido_cd][i][stackVarId] == $houseDash.chartStackItmClick) {
												if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
													if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													}
													
												}
											}
										} else {
											if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
												if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
													if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													}
													
												}
											}
										}
									} else {
										if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
											if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
												if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
													yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
													yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
												}
												
											}
										}
									}
								}
							} else {
								if(chartDataYear[sido_cd][i][dispVarId] == chartMeta[obj].itmId) {
									if($houseDash.chartItmClick != undefined && $houseDash.chartItmClick != "" && $houseDash.chartItmClick != null) {
										if(chartDataYear[sido_cd][i][dispVarId] == vItmId && chartDataYear[sido_cd][i][dispVarId] == $houseDash.chartItmClick) {
											if(tblId == "DT_1NW1005") { // 평균 연령
												if($houseDash.chartItmClickName.indexOf(chartDataYear[sido_cd][i]["OV_L3_KOR"]) != -1) {
													if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
														if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
															yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
														} else {
															yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
															yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
														}
														
													}
												}
											} else {
												if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
													if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
														yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
													}
													
												}
											}
										}
									} else {
										if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
											if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
												if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
													yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
													yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
												}
												
											}
										}
									}
								}
							}
						}
					} else {
						if($houseDash.chartItmClick != undefined && $houseDash.chartItmClick != "" && $houseDash.chartItmClick != null) {
							if(chartDataYear[sido_cd][i][dispVarId] == vItmId && chartDataYear[sido_cd][i][dispVarId] == $houseDash.chartItmClick) {
								if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
									if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
										yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
									} else {
										yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
										yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
									}
									
								}
							}
						} else {
							if(chartDataYear[sido_cd][i][dispVarId] == vItmId) {
								if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
									if(yearData[chartDataYear[sido_cd][i].PRD_DE] != undefined) {
										yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
									} else {
										yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
										yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
									}
									
								}
							}
						}
					}
				} 
			}
		}
    }*/
	
	var yearCategories = [];
	var yearSeriesData = [];
	
	let sumFNm = "", avgCnt = 0;
	for(var k=0; k<$houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()].length; k++) {
		let optItm = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()][k];
		if(optItm.varOrd == optItm.dispVarOrd) {
			if(optItm.subsumYn == "Y") {
				sumFNm = optItm.itmId;
				break;
			}
		}
		
		if(optItm.varOrd != optItm.regionVarOrd) {
			if($houseDash.chartItmClick != "") {
				if($houseDash.chartItmClick == optItm.itmId) {
					avgCnt++;
				}
			} else {
				if(optItm.dispVarOrd == 0) {
					if(optItm.objVarId == "13999001") {
						avgCnt++;
					}
				} else {
					if(optItm.objVarId != "13999001") {
						avgCnt++;
					}
				}
			}
		}
	}
	
	//if(tblId == "DT_1NW1005" || tblId == "DT_1NW1027") {
	if(tblId == "DT_1NW1005" ) { // 초혼남편, 초혼아내, 재혼남편, 재혼아내 
		for(var i in yearData){
			yearCategories.push(i);
			if($houseDash.chartItmClick != "") {
				yearSeriesData.push(Number((yearData[i]).toFixed(2)));
			} else {
				yearSeriesData.push(Number((yearData[i]).toFixed(2)));
			}
			if(code == "00" && i == $administStatsMain.ui.selectedYear) sidoSumAvg = Number((yearData[i]).toFixed(2));
		}
		yearCategoriesArr[polygonSelectArea] = yearCategories;
		yearSeriesDataArr[polygonSelectArea] = yearSeriesData;
	}else{
		for(var i in yearData){
			yearCategories.push(i);
			yearSeriesData.push(parseFloat(yearData[i].toFixed(2)));
			if(tblId == "DT_1NW1020" || tblId == "DT_1NW1022" || tblId == "DT_1NW1024" || tblId == "DT_1NW2007" || tblId == "DT_1NW2017" || tblId == "DT_1NW2019" || tblId == "DT_1NW2021" || tblId == "DT_1NW3017" || tblId == "DT_1NW3019" || tblId == "DT_1NW3021"
			|| tblId == "DT_1MA0003"  || tblId == "DT_1NW1027" ){
				if(code == "00" && i == $administStatsMain.ui.selectedYear) sidoSumAvg = Number(yearData[i].toFixed(2));
			}
		}
		yearCategoriesArr[polygonSelectArea] = yearCategories;
		yearSeriesDataArr[polygonSelectArea] = yearSeriesData;
	}
	
	let lPosX = 0, lPosY = 0;
	// 시계열 정보보기
	
	var mapId = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		$("#panel11").show();
		$(".pancon11").show();
		//$("#panel21").show();
		//$("#panel31").show();
		$("#panel41").show();
	}
	
	var seriesyearData = [];
	var categoriesyearData = [];
	var legendArr = {};
	console.log(yearSeriesDataArr[code]);
	if(code == "" || code.length == 2){
		seriesyearData.push({
			name : chartInfo[chart_ord][0].altrtv_disp_wrd,
			color : "#050099",
			legendName : $houseDash.polygonSelectedAreaNm == "" ? "전국" : $houseDash.polygonSelectedAreaNm,
			data : yearSeriesDataArr[code]
		});	
		categoriesyearData.push(yearCategoriesArr[code]);
	}else if(code.length == 5){
		seriesyearData.push({
			name : chartInfo[chart_ord][0].altrtv_disp_wrd,
			color : "#050099",
			legendName : $houseDash.polygonSelectedAreaNm == "" ? "전국" : $houseDash.polygonSelectedAreaNm,
			data : yearSeriesDataArr[code]
		});	
		categoriesyearData.push(yearCategoriesArr[code]);
	}
	if($("#mapRgn_2").is(":visible")){
		if($houseDash.polygonSelectArea != $houseDash.polygonSelectArea1){
			if($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2){
				seriesyearData.push({
					name : chartInfo[chart_ord][0].altrtv_disp_wrd,
					color : "#0B610B",
					legendName : $houseDash.polygonSelectedAreaNm1 == "" ? "전국" : $houseDash.polygonSelectedAreaNm1,
					data : yearSeriesDataArr[code]
				});	
				//categoriesyearData.push(yearCategoriesArr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]);
			}else if($houseDash.polygonSelectArea1.length == 5){
				seriesyearData.push({
					name : chartInfo[chart_ord][0].altrtv_disp_wrd,
					color : "#0B610B",
					legendName : $houseDash.polygonSelectedAreaNm1 == "" ? "전국" : $houseDash.polygonSelectedAreaNm1,
					data : yearSeriesData1Arr[code]
				});	
				//categoriesyearData.push(yearCategories1Arr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]);
			}
		}
		legendArr = {
			//enabled : false
			align : "right",
			verticalAlign : "top",
			layout : "vertical",
			itemMarginTop : 10,
			itemMarginBottom : 2,
			labelFormatter : function() {
				return this.userOptions.legendName;
			}
		}
	}else{
		legendArr = {
			enabled : false
		}
	}
	
	if(seriesyearData[0].data.length == 0) {
		return false;
	}
	console.log('seriesyearData',seriesyearData);
	let selYear = $("#modalSearchYear option:selected").text();
	let selObj = $("#modalSearchTitle option:selected").text();
	$houseDash.chartTitle = "";
	$houseDash.chartTitle += selObj;
	if($houseDash.chartItmClickName != "") {
		$houseDash.chartTitle += ">" + $houseDash.chartItmClickName;
	}
	if($houseDash.polygonSelectedAreaNm != "") {
		$houseDash.chartTitle += " - " + $houseDash.polygonSelectedAreaNm;
	}

	//Highcharts.chart('chart_year'+mapId, {
	let charts = Highcharts.chart('chart_year', {
		chart : {
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
			type : 'area',
			events: {
				load: function() {
					var chart = this;					
					chart.series.forEach(function(series) {
						series.points.forEach(function(point) {
							if(lPosX == 0 || lPosY == 0) {
								if(point.dataLabel.x - lPosX > 0 && lPosY <= 15) {
									lPosX = point.dataLabel.x+point.dataLabel.width;
									lPosY = point.dataLabel.y+point.dataLabel.height;
								} else {
									point.dataLabel.translate(point.dataLabel.x, point.dataLabel.y + 20);									
								}
							} else {
								if(point.dataLabel.x - lPosX <= 0) {
									point.dataLabel.translate(point.dataLabel.x, point.dataLabel.y + 20);
									lPosX = 0, lPosY = 0;
								}
							}
						});
					});
					
					$("#chart_year").css("overflow", "unset");
				}
			}
		},
		xAxis: {
			categories: yearCategoriesArr[polygonSelectArea]
			//categories: categoriesyearData
		},
		yAxis : {
			title : {
				enabled : false
			},
			labels : {
				enabled : false
			},
			gridLineWidth : 0
		},
		title : {
			text : $houseDash.chartTitle,
			align: "center",
			verticalAlign: "top",
			margin: 40,
			//floating: true,
			style: {
				color: '#333333',
	        	fontSize: '14px',
	        	fontWeight: '700',
	        	fontFamily: 'NanumSquare',
	        	fontStyle: 'none',
	        	textTransform: 'none'
			}
		},
		exporting : {
			enabled : false,
			filename: $houseDash.chartTitle
		},
		credits : {
			enabled : false
		},
		legend : legendArr,
		tooltip : {
			useHTML : true,
			headerFormat : '',
			//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
			formatter: function(e) {
				befYear = parseInt(this.key)-1, incDecStr = "", timeLineDt = [], befVal = 0, incDec_ = "";
				let region_cd = $administStatsMain.ui.selectedArea;
				if(region_cd == "") {
					region_cd = "00";
				}
				let isBefEmpty = true;
				for(let i=0; i<yearCategoriesArr[region_cd].length; i++) {
					if(befYear == yearCategoriesArr[region_cd][i]) {
						befVal = yearSeriesDataArr[region_cd][i];
						isBefEmpty = false;
					}
				}
				
				if($administStatsMap.ui.curMapId == 0){
					incDec_ = ((befVal-this.y) / befVal * 100).toFixed(2);
					if(((befVal-this.y) / befVal * 100) < 0) {
						//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
					} else if(((befVal-this.y) / befVal * 100) > 0) {
						//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
					
					if(isBefEmpty){
						incDecStr = "전년도 자료 없음";
					}
				}else if($administStatsMap.ui.curMapId == 1){
					incDec_ = ((befVal-this.y) / befVal * 100).toFixed(2);
					if(((befVal-this.y) / befVal * 100) < 0) {
						//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
					} else if(((totDt1-this.y) / totDt1 * 100) > 0) {
						//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
					
					if(isBefEmpty){
						incDecStr = "전년도 자료 없음";
					}
				}
				
				return '<b>' + this.key + '</b>' +
					'<br/>' + incDecStr;
			},
			footerFormat : ''
		},
		plotOptions : {
			series : {
				color : "#4154C9",
				fillColor : {
					linearGradient : {
						x1 : 0,
						x2 : 0,
						y1 : 0,
						y2 : 1
					},
					stops : [ [ 0, 'rgba(202,240,255,0.5)' ], [ 1, 'rgba(255,255,255,0.5)' ] ]
				}
			},
			area: {
	            dataLabels: {
	                enabled: true,
	                formatter: function() {
	                	return numberFormat(this.y) + chartInfo[chart_ord][0].disp_unit_nm;
	                },
	                allowOverlap: true
	            }
	        }
		},
		/*series : [{
			name : chartInfo[chart_ord][0].altrtv_disp_wrd,
			data : yearSeriesDataArr[polygonSelectArea]
		}]*/
		series : seriesyearData
	});
	
	//$administStatsMain.ui.chart.push( charts );
	$administStatsMain.ui.chart[1] = charts ;
		
	for(var i=0; i<$("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text").length; i++) {
		var yearStr = $("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text:eq(" + i + ")");
		if($houseDash.timeLineChartItmClick != "") {
			if(yearStr.text() == $houseDash.timeLineChartItmClick) {
				yearStr.css({"fill": "#ff0000", "font-weight" : "bold"});
			} else {
				yearStr.css({"fill": "#666666", "font-weight" : "normal", "cursor": "pointer"});
			}
		} else {
			if(yearStr.text() == year) {
				yearStr.css({"fill": "#ff0000", "font-weight" : "bold"});
			} else {
				yearStr.css({"fill": "#666666", "font-weight" : "normal", "cursor": "pointer"});
			}
		}		
	}
	
	$("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text").on("click", function() {
		for(var i=0; i<$("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text").length; i++) {
			var yearStr = $("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text:eq(" + i + ")");
			if(yearStr.text() == $(this).text()) {
				yearStr.css({"fill": "#ff0000", "font-weight" : "bold"});
			} else {
				yearStr.css({"fill": "#666666", "font-weight" : "normal", "cursor": "pointer"});
			}		
		}
		
		if($("#modalSearchTitle option:selected").text().length > 20) {
			//$('.pancon1'+mapId+'h').text($(this).text() +' ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "...");
			$('.pancon1'+mapId+'h').text($(this).text() +' ' + $("#modalSearchTitle option:selected").text());
		} else {
			$('.pancon1'+mapId+'h').text($(this).text() +' ' + $("#modalSearchTitle option:selected").text());
		}		
		$('.pancon3'+mapId+'h').text('시계열 보기');
		//$('.pancon2'+mapId+'h').text($(this).text() + '년 지역별 비교 보기');
		//$('.pancon4'+mapId+'h').text($(this).text() +'년 지역별 데이터 보기');
		$('.pancon2'+mapId+'h').text("지역 비교 보기");
		$('.pancon4'+mapId+'h').text('표 보기');
		
		$houseDash.chartItmClick = "";
		
		if($administStatsMap.ui.curMapId == 0){
			$houseDash.polygonSelectedAreaNm = "";
			$houseDash.polygonSelectArea = "";
		}else if($administStatsMap.ui.curMapId == 1){
			$houseDash.polygonSelectedAreaNm1 = "";
			$houseDash.polygonSelectArea1 = "";
		}
		
		$houseDash.timeLineChartItmClick = "";
		$administStatsMain.ui.selectedArea = "00";
		$(".selectedArea").remove();
		$('.city_select_sido').text(' 전체');
		$('.city_select').css('width','180px');
		$('.city_select button').remove();
		
		var chartOrd = $("#modalSearchTitle option:selected").val();
		var item_id = $("#modalSearchTitle option:selected").data('item_id');
		var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
		var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
		var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
		var var_ord = $("#modalSearchTitle option:selected").data('var_ord');

		//var	region_code = '00';
		var	region_code = searchGubun + '00';
		var sgg_code = '';

		getChartsData(chartOrd, $(this).text(), item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, '');
		$("#modalSearchYear option[value=" + $(this).text() + "]")[0].selected = true;
		/*drawCharts1(chart_ord , "00", $(this).text());
		drawCharts2(chart_ord , "00", $(this).text());
		drawCharts3(chart_ord , "00", $(this).text());
		drawCharts4(chart_ord , "00", $(this).text());*/
		
		/*var selectedThema = $administStatsMain.ui.selectedThema;
		if(selectedThema == "신혼부부"){
			$newlyDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		//20201020 박은식 주택 분기 추가 START
		else if(selectedThema == "주택소유"){
			$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		//20201020 박은식 주택 분기 추가 END
		else if(selectedThema == "중장년층"){
			$middlDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
		else if(selectedThema == "귀농·귀어·귀촌"){
			$retunDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		else if(selectedThema == "통계더보기"){
			$moresDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}*/

		if($administStatsMain.ui.selectedArea == searchGubun + "00"){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
		//} else if($administStatsMap.ui.mapToggleId != ""){
		} else if(($administStatsMap.ui.curMapId == 0 && $administStatsMap.ui.mapToggleId != "") || ($administStatsMap.ui.curMapid == 1 && $administStatsMap.ui.mapToggleId1 != "") ){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
		} else {
			$administStatsMap.ui.drawMapData("sgg", "color"); // 맵
		}

		$houseDash.timeLineChartItmClick = $(this).text();
	});
}

var drawCharts4 = function(chart_ord ,code, year) {
	if(code == "") {
		code = "00";
	}
	year = $administStatsMain.ui.selectedYear;
	var tableTrColor = [
		'background-color: rgb(155, 155, 205);',
		'background-color: rgb(175, 175, 215);',
		'background-color: rgb(195, 195, 225);',
		'background-color: rgb(215, 215, 235);',
		'background-color: rgb(235, 235, 245);'
	]
	
	var mapId = "";
	var polygonSelectedAreaNm = "";
	var polygonSelectedAreaNm = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
		polygonSelectArea = $houseDash.polygonSelectArea;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		$("#position-name").text('시도');
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		polygonSelectArea = $houseDash.polygonSelectArea1;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
		$("#position-name1").text('시도');
	}
	
	if(polygonSelectArea.length == 2 && code == "00") {
		polygonSelectArea = "00"
	} else if(polygonSelectArea.length == 2 && code != "00") {
		polygonSelectArea = polygonSelectArea.substring(0,2);
	} else if(polygonSelectArea.length == 5) {
		polygonSelectArea = polygonSelectArea;
	} else {
		polygonSelectArea = "00";
	}
	
	sidoValuesDesc = Object.assign([], originValues);
	
	/*sidoValuesDesc.sort(function(a, b){
		if(a.y < b.y) return 1;
		if(a.y > b.y) return -1;
		if(a.y === b.y) return 0;
	});*/
	
	sidoValuesDesc = sidoValuesDesc.sort(function(a,b) {
		return parseFloat(b.y)-parseFloat(a.y);
	});
	
	/*
	$("#RankArea").text('전국 시도 '+sidoValuesDesc.length+'개 중');
	$("#RankProgress").attr('max', sidoValuesDesc.length).css('width', 10 * sidoValuesDesc.length+"px");
	findRank(code);
	*/
	
	// 표보기
	var table_text = '';
	table_text += '<div class="gridTitle">' + $houseDash.chartTitle + '</div>';
	table_text += '<div class="detail_Graph02 detailTable" id="PH0192Table" style="height:auto;">';
	if($('.modal-location').is(":visible")){
		table_text += '<div class="row bb pb10" style="display:flex; margin-bottom:10px; text-align:center;">';
  		table_text += '<span class="colorInfo01"></span>';
  		table_text += '<p>현재지역</p>';
  		table_text += '<span class="colorInfo02"></span>';
  		table_text += '<p>최대지역</p>';
  		table_text += '<span class="colorInfo03"></span>';
  		table_text += '<p>최소지역</p>';
		table_text += '</div>';
	}
	table_text += '<div>';
	table_text += '<table style="width:473px;margin-bottom:20px;">';
	table_text += '<caption>행정구역별 데이터 보기</caption>';
	table_text += '<thead style="width:473px; display:table; box-sizing: border-box;">';
	table_text += '<tr>';
	table_text += '<th style="width:35%;">행정구역</th>';
	/*table_text += '<th style="width:35%;">' + year + '(' + chartInfo[chart_ord][0].disp_unit_nm + ')</th>';*/
	table_text += '<th style="width:35%;text-align:right;">단위: ' + chartInfo[chart_ord][0].disp_unit_nm + '</th>';
	table_text += '<th>구성비(%)</th>';
	table_text += '</tr>';
	table_text += '</thead>';
	table_text += '<tbody style="width:473px; display:table; box-sizing: border-box;table-layout: fixed;">';
	table_text += '<tr>';
	if(tblId == "DT_1MA0039" || tblId == "DT_1NW1033"){
		if($houseDash.chartItmClick != ""){
			table_text += '<td class="data_col" style="vertical-align: middle; width:35%; padding:5px;">전국';
			table_text += "->"+DT_selected_name.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
					.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");+'</td>';
		}else{
			//table_text += '<td class="data_col" style="vertical-align: middle; width:35%; padding:5px;">전국</td>';
			table_text += '<td class="data_col" style="vertical-align: middle; width:35%; padding:5px;">전국->전국</td>';
		}
	}else{
		let areaNm = "";
		if(code == "00") {
			areaNm = "전국"
		} else {
			areaNm = $("#modalSearchArea option:selected").text();
		}
		table_text += '<td class="data_col" style="vertical-align: middle; width:35%; padding:5px;">' + areaNm + '</td>';
	}
	let totSum = 0;
	for(var i=0;i<originCategories.length;i++){
		totSum += originValues[i].y;
	}
	
	let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
	let dispVarId = ""; regionVarId = "", stackVarId = "";
	if(dispOpt[0].dispVarOrd == 0) {
		dispVarId = "CHAR_ITM_ID";
	} else {
		dispVarId = "OV_L" + dispOpt[0].dispVarOrd + "_ID";
	}
	if(dispOpt[0].regionVarOrd == 0) {
		regionVarId = "CHAR_ITM_ID";
	} else {
		regionVarId = "OV_L" + dispOpt[0].regionVarOrd + "_ID";
	}
	if(dispOpt[0].stackVarOrd == 0) {
		stackVarId = "CHAR_ITM_ID";
	} else {
		stackVarId = "OV_L" + dispOpt[0].stackVarOrd + "_ID";
	}
	let sumFCnt = {};
	let areaCd = "";
	/*if($administStatsMap.ui.mapToggleId == "") {
		areaCd = "00";
	} else {
		areaCd = code.substring(0,2);
	}*/
	var yearData = {};
	
	areaCd = polygonSelectArea.substring(0,2);		// 현재 행정구역 코드
	let isSumFYn = false, isStackSumFYn = false, isSumItmId = "", isStackSumItmId = "";;
	for(let j=0; j<dispOpt.length; j++) {
		if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
			if(dispOpt[j].subsumYn == "Y") {
				isSumFYn = true;
				isSumItmId = dispOpt[j].itmId;
				break;
			}
		}
	}
	for(let j=0; j<dispOpt.length; j++) {
		if(dispOpt[j].varOrd == dispOpt[j].stackVarOrd) {
			if(dispOpt[j].subsumYn == "Y") {
				isStackSumFYn = true;
				isStackSumItmId = dispOpt[j].itmId;
				break;
			}
		}
	}
	
	let sidoCd = "00"
	if(chartMode == "sido") {
		sidoCd = "00";
	} else {
		sidoCd = code.substring(0,2);

	}
	var upAdmCd = sidoCd.length == 2 ? "00" : code.substring(0,2);
	//var upAdmCd = code.substring(0,2);
	
	for(let i=0; i<chartDataYear[upAdmCd].length;i++){ 
		if(chartDataYear[upAdmCd][i][regionVarId] == sidoCd) {	// 현재 행정구역 데이터만 추출
						if($houseDash.chartStackItmClick != "") {		// 차트에서 선택된 STACK 존재 확인
				if(chartDataYear[upAdmCd][i][stackVarId] == $houseDash.chartStackItmClick) {	// 현재 데이터에서 STACK 데이터만 추출
									if($houseDash.chartItmClick != "") {										// 선택된 차트 아이템 존재 확인
						if(chartDataYear[upAdmCd][i][dispVarId] == $houseDash.chartItmClick) {	// 현재 데이터에서 선택된 아이템 추출
											for(let j=0; j<dispOpt.length; j++) {
												if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
									if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
														for(let k=0; k<dispOpt.length; k++) {
															if(dispOpt[k].varOrd == dispOpt[k].stackVarOrd) {
												if(searchGubun == "2") {
													if(dispVarId == regionVarId) {
														if(dispOpt[k].itmId.substring(1,3) == chartDataYear[upAdmCd][i][stackVarId]) {
															if(isSumFYn) {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	}
															} else {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																}
																if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
																} else {
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
															}
														}
													}
													} else {
														if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
															if(isSumFYn) {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
															} else {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
																if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
																} else {
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
										}
									}
								}
							}
						} else {
													if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
														if(isSumFYn) {
															if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													} else {
																yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													}
														} else {
															if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
															} else {
																yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
									}
															if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
																	} else {
																sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					} else {
				if($houseDash.chartItmClick != "") {										// 선택된 차트 아이템 존재 확인
					if(chartDataYear[upAdmCd][i][dispVarId] == $houseDash.chartItmClick) {	// 현재 데이터에서 선택된 아이템 추출
						if(tblId == "DT_1NW1005") {
							let categoryName = $houseDash.chartItmClickName.split("")[0];
							if(chartDataYear[upAdmCd][i]["OV_L3_KOR"].indexOf(categoryName) != -1) {		// 시계열이 있으면 해당 년도에 데이터 추가
								if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
									yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
								} else {
									yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
									yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
								}
								if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
									sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
								} else {
									sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
									sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
								}
							}
						} else {
							if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
								yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
							} else {
								yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
								yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
							}
							if(sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
								sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
							} else {
								sumFCnt[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
								sumFCnt[chartDataYear[upAdmCd][i].PRD_DE]++;
							}
						}
					}
				} else {
									for(let j=0; j<dispOpt.length; j++) {
						if(dispVarId == regionVarId) {
							if(isStackSumFYn) {
								if(dispOpt[j].varOrd == dispOpt[j].stackVarOrd) {
									if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
										for(let k=0; k<dispOpt.length; k++) {
											if(isSumFYn) {
												if(dispOpt[k].varOrd == dispOpt[k].dispVarOrd) {
													if(searchGubun == "2") {
														if(dispVarId == regionVarId) {
															if(dispOpt[k].itmId != "000") {
																if(dispOpt[k].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
																	if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	} else {
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	}
																}
															}
														} else {
															if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
																if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																} else {
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																	yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																}
															}
														}
													} else {
														if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
															if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
															} else {
																yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
															}
														}
													}
												}
											}
										}
									}
								}
							} else {
								if(isSumFYn) {
										if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
										if(searchGubun == "2") {
											if(dispVarId == regionVarId) {
												if(dispOpt[j].itmId != "000") {
													if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
														if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														} else {
															yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														}
													}
												}
											} else {
												if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
													if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													}
												}
											}
										} else {
											if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										}
									}
								} else {
									if(searchGubun == "2") {
										if(dispVarId == regionVarId) {
											if(dispOpt[j].itmId != "000") {
												if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
													if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													}
												}
											}
										} else {
											if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										}
									} else {
										if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
											if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											} else {
												yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
										}
									}
								}
							}
							} else {
							if(isStackSumFYn) {							
								if(dispOpt[j].subsumYn == "Y") {
									if(dispOpt[j].varOrd == dispOpt[j].stackVarOrd) {
										if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][stackVarId]) {
											for(let k=0; k<dispOpt.length; k++) {
												if(isSumFYn) {							
													if(dispOpt[k].subsumYn == "Y") {
														if(dispOpt[k].varOrd == dispOpt[k].dispVarOrd) {
															if(searchGubun == "2") {
																if(dispVarId == regionVarId) {
																	if(dispOpt[k].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
																		if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		} else {
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		}
																	}
																} else {
																	if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
																		if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		} else {
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																			yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																		}
																	}
																}
															} else {
																if(dispOpt[k].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
																	if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	} else {
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
																		yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							} else {
								if(isSumFYn) {							
										if(dispOpt[j].subsumYn == "Y") {
										if(dispOpt[j].varOrd == dispOpt[j].dispVarOrd) {
											if(searchGubun == "2") {
												if(dispVarId == regionVarId) {
													if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
														if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														} else {
															yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														}
													}
												} else {
													if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
														if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														} else {
															yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
															yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
														}
													}
												}
											} else {
												if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
													if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													} else {
														yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
														yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
													}
												}
											}
										}
									}
								} else {
									if(searchGubun == "2") {
										if(dispVarId == regionVarId) {
											if(dispOpt[j].itmId.substring(1,3) == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										} else {
											if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
												if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												} else {
													yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
													yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
												}
											}
										}
									} else {
										if(dispOpt[j].itmId == chartDataYear[upAdmCd][i][dispVarId]) {
											if(yearData[chartDataYear[upAdmCd][i].PRD_DE] != undefined) {		// 시계열이 있으면 해당 년도에 데이터 추가
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											} else {
												yearData[chartDataYear[upAdmCd][i].PRD_DE] = 0;					// 데이터 초기화
												yearData[chartDataYear[upAdmCd][i].PRD_DE] += parseFloat(chartDataYear[upAdmCd][i].DTVAL_CO);
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	for(let i=0; i<Object.keys(yearData).length; i++) {
		let key = Object.keys(yearData)[i];
		for(let j=0; j<yearData[key].length; j++) {
			if(sumFCnt[chartDataYear[sido_cd][i].PRD_DE] > 0) {
				yearData[key] = yearData[key]/sumFCnt[chartDataYear[sido_cd][i].PRD_DE];
			}
		}
	}
	//totSumVal = gridSumFVal;
	totSumVal = yearData[year];
	//table_text += '<td class="data_col" style="text-align: right; vertical-align: middle; width:35%; padding:5px;">' + numberFormat(curTot) + '</td>';
	/*if(tblId == "DT_1NW1005" || tblId == "DT_1NW1020" || tblId == "DT_1NW1022" || tblId == "DT_1NW1024" || tblId == "DT_1NW1027" || tblId == "DT_1NW2007" || tblId == "DT_1NW2017" || tblId == "DT_1NW2019" || tblId == "DT_1NW2021" || tblId == "DT_1NW3017" || tblId == "DT_1NW3019"  || tblId == "DT_1NW3021" 
		|| tblId == "DT_1MA0003"   ) {
		table_text += '<td class="data_col number" style="text-align: right; vertical-align: middle; width:35%; padding:5px;">' + numberFormat(sidoSumAvg) + '</td>';
//	}else if(tblId == "DT_1NW1035"){
//		table_text += '<td class="data_col" style="text-align: right; vertical-align: middle; width:35%; padding:5px;">' + numberFormat(curTot == 0 ? Number((totSum/originCategories.length).toFixed(2)) : Number((curTot/originCategories.length).toFixed(2)) ) + '</td>';
	}else{*/
		table_text += '<td class="data_col number" style="text-align: right; vertical-align: middle; width:35%; padding:5px;">' 
			+ (totSumVal > 0 ? numberFormat(totSumVal) : numberFormat(totSum)) + '</td>';
	//}
	if(tblId == "DT_1NW1005" || tblId == "DT_1NW1020" || tblId == "DT_1NW1022" || tblId == "DT_1NW1024" || tblId == "DT_1NW1027" || tblId == "DT_1NW1035"
		|| tblId == "DT_1NW2017" || tblId == "DT_1NW2019" || tblId == "DT_1NW2021" || tblId == "DT_1NW3017" || tblId == "DT_1NW3019" || tblId == "DT_1NW3021"
		|| tblId == "DT_1OH0511") {	// 평균이나 비중은 구성비 mask
		table_text += '<td class="data_col number" style="text-align: right; vertical-align: middle; padding:5px;">- </td>';
	} else {
	table_text += '<td class="data_col number" style="text-align: right; vertical-align: middle; padding:5px;">100%</td>';
	}
	table_text += '</tr>';
	let elsSort = [];
	
	for(var i=0; i<originValues.length; i++) {
		elsSort.push(originValues[i].y);
	}
	
	elsSort.sort(function(a, b) {
		return b - a;
	})
	
	let smblCn = ""; 
	//마지막 시도 데이터가 안나와서 수정
	//for(var i=0;i<elsCategories.length;i++){
	for(var i=0;i<originValues.length;i++){
		let isEmpty = true;
		for(let j=0; j<chartData[sidoCd].length; j++) {
			if(chartData[sidoCd][j].PRD_DE == year) {
				if(originValues[i].id == chartData[sidoCd][j][regionVarId]) {
					if($houseDash.chartStackItmClick != "" && $houseDash.chartStackItmClick != undefined) {
						if(chartData[sidoCd][j][stackVarId] == $houseDash.chartStackItmClick) {
							if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
								if(chartData[sidoCd][j][dispVarId] == $houseDash.chartItmClick) {
									originValues[i].smblCn = chartData[sidoCd][j].SMBL_CN;
								}
							} else {
								if(isSumFYn) {
									if(chartData[sidoCd][j][dispVarId] == isSumItmId) {
										originValues[i].smblCn = chartData[sidoCd][j].SMBL_CN;
									}
								} else {
									originValues[i].smblCn = chartData[sidoCd][j].SMBL_CN;
								}
							}
						}
					} else {
						if(isStackSumFYn) {
							if(chartData[sidoCd][j][stackVarId] == isSumItmId) {
								if(isSumFYn) {
						if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
										if(chartData[sidoCd][j][dispVarId] == $houseDash.chartItmClick) {
											originValues[i].smblCn = chartData[sidoCd][j].SMBL_CN;
										}
									}
								}
							}
						} else {
							if(isSumFYn) {
								if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
									if(chartData[sidoCd][j][dispVarId] == $houseDash.chartItmClick) {
										if(chartData[sidoCd][j][dispVarId] == isSumItmId) {
											originValues[i].smblCn = chartData[sidoCd][j].SMBL_CN;
										}
									}
								}
							} else {
								if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
									if(chartData[sidoCd][j][dispVarId] == $houseDash.chartItmClick) {
										if(chartData[sidoCd][j].SMBL_CN != undefined) {
											originValues[i].smblCn = chartData[sidoCd][j].SMBL_CN;
										}
									}
								} else {
									if(chartData[sidoCd][j].SMBL_CN != undefined) {
										originValues[i].smblCn = chartData[sidoCd][j].SMBL_CN;
									}
								}
							}
						}
					}
					
					isEmpty = false;
				}
			}
		}

		//if(originCategories[i] == $houseDash.polygonSelectedAreaNm) {
		//if(originCategories[i] == polygonSelectedAreaNm) {
		//table_text += '<tr value="'+elsValues[i].id+'">';
		table_text += '<tr value="'+originValues[i].id+'">';
		
		let color;
		if($('.modal-location').is(":visible")){
			for(var m=0; m<sidoValuesDesc.length; m++) {
				if(m == 0 && sidoValuesDesc[m].id == originValues[i].id && sidoValuesDesc[m].y == originValues[i].y) {
					color = "background-color: #4BA0CB;";
					break;
				}else if($administStatsMap.ui.curMapId == 0 && sidoValuesDesc[m].y == originValues[i].y && sidoValuesDesc[m].id == $houseDash.polygonSelectArea) {
					color = "background-color: #5DE5A1;";
					break;
				}else if($administStatsMap.ui.curMapId == 1 && sidoValuesDesc[m].y == originValues[i].y && sidoValuesDesc[m].id == $houseDash.polygonSelectArea1) {
					color = "background-color: #5DE5A1;";
					break;
				}else if(m == sidoValuesDesc.length-1 && sidoValuesDesc[m].id == originValues[i].id && sidoValuesDesc[m].y == originValues[i].y) {
					color = "background-color: #C76E32;";
					break;
				}
			}
		}
		for(var j=0; j<5; j++) {
			if(originValues[i].y == elsSort[j]) {
				color = tableTrColor[j];
			}
		}	

		//tr에 border 적용하면 이미지 저장할때 빨간색 테두리 잘리는 현상으로 td에 border 적용
		var _border = "";
		var _border2 = "1px solid rgb(221, 221, 221) !important; ";
		
		if( ( originValues[i].id == code || 
				((originValues[i].id == $administStatsMain.ui.selectedArea && $administStatsMap.ui.curMapId == 1) || (originValues[i].id == $administStatsMain.ui.selectedArea && $administStatsMap.ui.curMapId == 0)) ) ){
			_border = "border:7px #ff0000 solid !important; ";
		}
		if(tblId == "DT_1MA0039" || tblId == "DT_1NW1033"){
			table_text += '<td class="data_col" style="vertical-align: middle; width:35%; padding:5px;">'+originCategories[i].replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
				.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
			if($houseDash.chartItmClick != ""){
				table_text += "->"+DT_selected_name.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
					.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남")+'</td>';
			}else{
				table_text += '->전국</td>';
			}
		}else{
			table_text += '<td class="data_col" style="'+_border+'border-right:'+_border2+'vertical-align: middle; width:35%; padding:5px;">'+originCategories[i]+'</td>';
		}
		
		/*if(tblId == "DT_1NW3017" || tblId == "DT_1NW3017") {	//평균 데이터는 그대로 표시
			let val = 0;
			if(originValues[i].smblCn != undefined && originValues[i].y == 0) {
				val = originValues[i].smblCn;
			} else {
				if(isEmpty) {
					val = '-';
				} else {
					if(originValues[i].y != 0) {
						val = numberFormat(originValues[i].y <= 3 ? "x" : originValues[i].y);
					}
					if(originValues[i].smblCn != undefined) {
						val = originValues[i].smblCn;
					}
				}
			}
			
			table_text += '<td class="data_col number" style="text-align: right; width:35%; padding: 5px; ' + color + '">'+val+'</td>';
		} else {*/
			let val = 0;
			if(originValues[i].smblCn != undefined && originValues[i].y == 0) {
				val = originValues[i].smblCn;
			} else {
				if(isEmpty) {
					val = '-';
				} else {
					if(originValues[i].y != 0) {
						if(tblId == "DT_1NW1020" || tblId == "DT_1NW2017" || tblId == "DT_1NW3017" || tblId == "DT_1OH0511" || tblId == "DT_1NW3017"
							|| tblId == "DT_1NW2015") {	// 평균 통계
							val = numberFormat(originValues[i].y);
						} else {
							val = numberFormat(originValues[i].y <= 3 ? "x" : originValues[i].y);
						}
					}
					if(originValues[i].smblCn != undefined) {
						val = originValues[i].smblCn;
					}
				}
			}
			
			table_text += '<td class="data_col number" style="'+_border+'border-left:'+_border2+'border-right:'+_border2+'text-align: right; width:35%; padding: 5px; ' + color + '">'+ val +'</td>';
		//}
		
		if(tblId == "DT_1NW1005" || tblId == "DT_1NW1020" || tblId == "DT_1NW1022" || tblId == "DT_1NW1024" || tblId == "DT_1NW1027" || tblId == "DT_1NW1035"
			|| tblId == "DT_1NW2017" || tblId == "DT_1NW2019" || tblId == "DT_1NW2021" || tblId == "DT_1NW3017" || tblId == "DT_1NW3019" || tblId == "DT_1NW3021"
			|| tblId == "DT_1OH0511") {	// 평균이나 비중은 구성비 mask
			table_text += '<td class="data_col number" style="text-align: right; padding: 5px; ' + color + '">- </td>';
		} else {
			if(totSum == 0) {
				table_text += '<td class="data_col number" style="'+_border+'border-left:'+_border2+'text-align: right; padding: 5px; ' + color + '">- </td>';
			} else {
				table_text += '<td class="data_col number" style="'+_border+'border-left:'+_border2+'text-align: right; padding: 5px; ' + color + '">'+(originValues[i].y/totSum*100).toFixed(2)+'%</td>';
			}
		}
		table_text += '</tr>';
	}

	table_text += '</tbody>';
	table_text += '</table>';
	table_text += '</div>';
	table_text += '</div>';
	
	$("#chart_table").empty();
	$("#chart_table").append(table_text);
	$('#panel4').css('display', 'block');
	//$(".modal-location").css('display', 'block');
	
	if($administStatsMap.ui.curMapId == 0){
		$houseDash.ponconText = table_text;
		/*if($houseDash.polygonSelectArea1 != '' && $houseDash.polygonSelectArea1 != null && $houseDash.polygonSelectArea1.length == 5){
			$("#chart_table1").html($houseDash.ponconText1);
			for(var i=0; i < $("#chart_table1 tbody tr").length; i++){
				if( $($("#chart_table tbody1 tr")[i]).attr('value') !=  $houseDash.polygonSelectArea1){
					$($("#chart_table tbody1 tr")[i]).attr('style', '');
				}else{
					$($("#chart_table tbody tr")[i]).attr('style', 'border:7px #ff0000 solid');
				}
			}
		}*/
		$("#chart_table1").html($houseDash.ponconText1);
		for(var i=0; i < $("#chart_table1 tbody tr").length; i++){
			if( $($("#chart_table tbody1 tr")[i]).attr('value') !=  $houseDash.polygonSelectArea1){
				$($("#chart_table tbody1 tr")[i]).attr('style', '');
			}else{
				$($("#chart_table tbody tr")[i]).attr('style', 'border:7px #ff0000 solid');
			}
		}
	}else if($administStatsMap.ui.curMapId == 1){
		$houseDash.ponconText = table_text;
		if($houseDash.polygonSelectArea != '' && $houseDash.polygonSelectArea != null && $houseDash.polygonSelectArea.length == 5){
			$("#chart_table1").html($houseDash.ponconText1);
			for(var i=0; i < $("#chart_table1 tbody tr").length; i++){
				if( $($("#chart_table tbody1 tr")[i]).attr('value') !=  $houseDash.polygonSelectArea){
					$($("#chart_table tbody1 tr")[i]).attr('style', '');
				}else{
					$($("#chart_table tbody tr")[i]).attr('style', 'border:7px #ff0000 solid');
				}
			}
		}
	}
	
	/*
	if(sggValues.length == 0){
		$('#panel41').css('display', 'none');
	}else{
		$('#panel41').css('display', 'block');
	}
	*/
	
	/*if($("#mapRgn_2").is(":visible")){
		if($houseDash.polygonSelectArea != $houseDash.polygonSelectArea1){
			if($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2){
				seriesyearData.push({
					name : chartInfo[chart_ord][0].altrtv_disp_wrd,
					color : "#0B610B",
					legendName : $houseDash.polygonSelectedAreaNm1 == "" ? "전국" : $houseDash.polygonSelectedAreaNm1,
					data : yearSeriesDataArr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]
				});	
				//categoriesyearData.push(yearCategoriesArr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]);
			}else if($houseDash.polygonSelectArea1.length == 5){
				seriesyearData.push({
					name : chartInfo[chart_ord][0].altrtv_disp_wrd,
					color : "#0B610B",
					legendName : $houseDash.polygonSelectedAreaNm1 == "" ? "전국" : $houseDash.polygonSelectedAreaNm1,
					data : yearSeriesData1Arr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]
				});	
				//categoriesyearData.push(yearCategories1Arr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]);
			}
		}
		legendArr = {
			//enabled : false
			align : "right",
			verticalAlign : "top",
			layout : "vertical",
			itemMarginTop : 2,
			itemMarginBottom : 2,
			labelFormatter : function() {
				return this.userOptions.legendName;
			}
		}
		
		if(chkRegionEnd == "시군구"){
			//$("#mapRank").css('display', 'none');
			$("#mapRank").css('display', 'block');
		}else{
			$("#mapRank").css('display', 'block');
		}
		if(($administStatsMap.ui.mapToggleId.length == 2 && $administStatsMap.ui.mapToggleId1.length == 2) || 
		($administStatsMap.ui.mapToggleId.length == 2 && $administStatsMap.ui.mapToggleId1 == '') || 
		($administStatsMap.ui.mapToggleId == '' && $administStatsMap.ui.mapToggleId1.length == 2) || 
		($administStatsMap.ui.mapToggleId == '' && $administStatsMap.ui.mapToggleId1 == '') ){
			$("#panel3").show();
			$("#panel31").hide();
			$("#panel32").hide();
			$("#panel4").show();
			$("#panel41").hide();
		}else if(($administStatsMap.ui.mapToggleId.length == 5 && $administStatsMap.ui.mapToggleId1.length == 5)){
			$("#panel3").hide();
			$("#panel31").show();
			$("#panel32").show();
			$("#panel4").hide();
			$("#panel41").show();
		}else{
			$("#panel3").show();
			if($administStatsMap.ui.mapToggleId.length == 5){
				$("#panel31").show();
			}else if($administStatsMap.ui.mapToggleId1.length == 5){
				$("#panel32").show();
			}
			$("#panel4").show();
			$("#panel41").show();
		}
	}else{
		legendArr = {
			enabled : false
		}
			
		if(chkRegionEnd == "시군구"){
			//$("#mapRank").css('display', 'none');
			$("#mapRank").css('display', 'block');
		}else{
			$("#mapRank").css('display', 'block');
		}
		if($administStatsMap.ui.mapToggleId.length == 2 || $administStatsMap.ui.mapToggleId == ''){
			$("#panel3").show();
			$("#panel31").hide();
			$("#panel32").hide();
			$("#panel4").show();
			$("#panel41").hide();
		}else if($administStatsMap.ui.mapToggleId.length == 5){
			$("#panel3").hide();
			$("#panel31").show();
			$("#panel32").hide();
			$("#panel4").hide();
			$("#panel41").show();
		}
	}*/
	
	
	if($('.pancon1').css('display') == 'none') $('.pancon1h').click();
	if($('.pancon2').css('display') == 'none') $('.pancon2h').click();
	if($('.pancon3').css('display') == 'none') $('.pancon3h').click();
	if($('.pancon4').css('display') == 'none') $('.pancon4h').click();
	if($('.pancon11').css('display') == 'none') $('.pancon11h').click();
	if($('.pancon21').css('display') == 'none') $('.pancon21h').click();
	if($('.pancon22').css('display') == 'none') $('.pancon22h').click();
	if($('.pancon31').css('display') == 'none') $('.pancon31h').click();
	if($('.pancon41').css('display') == 'none') $('.pancon41h').click();
	$houseDash.rankArea = sidoValuesDesc.slice();
	$houseDash.rankArea.sort(function(a, b){ a.y - b.y });
	$("#rankRange").prop("max", $houseDash.rankArea.length);
}

var isTouches = function(elements) {
	let isBool = false;
	for(var i=0; i<elements.length; i++) {
		for(var j=0; j<elements.length; j++) {
			if(i < j) {
				const r1 = elements[i].getBoundingClientRect();
				const r2 = elements[j].getBoundingClientRect();
				
				if(r2.left - r1.right < 1 && r2.top - r1.bottom < 1) {
					isBool = true;
				}
			}
		}
	}	
	return isBool;
}

var sidoData = {};
var sggData = {};
var selected_sido_name = '대한민국';
var str_sido_name = '';

var drawChartsSgg1 = function(chart_ord ,code, sgg_cd, year) {
	year = $administStatsMain.ui.selectedYear;		
	// 차트 구성 하기위한 메타
	if($houseDash.timeLineChartItmClick != "") {
		year = $houseDash.timeLineChartItmClick;
	}
	
	var chartMeta = {};
	var notUsedChartMeta = {};
	var isBigItem = false;
    for(var i =0; i<chartInfo[chart_ord].length; i++){
    	if(chartInfo[chart_ord][i].disp_obj_var_id == chartInfo[chart_ord][i].obj_var_id){
    		if(chartInfo[chart_ord][i].disp_obj_var_id == '13999001'){
    			isBigItem = true;
    		}
    		// 차트 그릴때 필요한 값들 여기서 추가
    		chartMeta[(chartInfo[chart_ord][i].itm_id)] = {
    				kosis_unit : chartInfo[chart_ord][i].kosis_unit,
    				kosis_unit_nm : chartInfo[chart_ord][i].kosis_unit_nm,
    				disp_unit_nm : chartInfo[chart_ord][i].disp_unit_nm,
    				disp_obj_var_id : chartInfo[chart_ord][i].disp_obj_var_id,
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				disp_var_ord : chartInfo[chart_ord][i].disp_var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor,
    				region_var_ord : chartInfo[chart_ord][i].region_var_ord
    		}
    	} else {
    		notUsedChartMeta[(chartInfo[chart_ord][i].itm_id)] = {
    				kosis_unit : chartInfo[chart_ord][i].kosis_unit,
    				kosis_unit_nm : chartInfo[chart_ord][i].kosis_unit_nm,
    				disp_unit_nm : chartInfo[chart_ord][i].disp_unit_nm,
    				disp_obj_var_id : chartInfo[chart_ord][i].disp_obj_var_id,
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				disp_var_ord : chartInfo[chart_ord][i].disp_var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor,
    				region_var_ord : chartInfo[chart_ord][i].region_var_ord
    		}
    	}
    }
    
    sidoData = $administStatsMain.ui.areaSidoData["00"];
	sggData = {};
	
	// ajax 시작
	for(var i = 0; i < sidoData.length; i++){
		$.ajax({
			url: contextPath + "/ServiceAPI/map/sggAddressList.json",
		    type: 'post',
		    dataType : 'json',
		    async: false,
		    data: {
		    	base_year:$administStatsMain.ui.selectedYear,
		    	sido_cd:sidoData[i].sido_cd,
		    	is_interactive:'Y',  // 비자치구 조회
		    }
		}).done(function (res) { // 완료
			if(res.errCd == "0") {
				//시군구 목록 저장
				if(sidoData[i].sido_cd != undefined && sidoData[i].sido_cd != null && sidoData[i].sido_cd != "") {
					sggData[sidoData[i].sido_cd] = res.result.sggList;
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
	}
	
	for(var i =0; i<sidoData.length; i++){
		if(sidoData[i].sido_cd == code){
			str_sido_name = sidoData[i].sido_nm;
			for(var j =0; j<sggData[sidoData[i].sido_cd].length; j++){
				if(sggData[sidoData[i].sido_cd][j].sgg_cd == sgg_cd){
					selected_sido_name = sggData[sidoData[i].sido_cd][j].sgg_nm;
					if($administStatsMap.ui.curMapId == 0){
						$houseDash.polygonSelectedAreaNm = str_sido_name + " " + selected_sido_name;
					}else if($administStatsMap.ui.curMapId == 1){
						$houseDash.polygonSelectedAreaNm1 = str_sido_name + " " + selected_sido_name;
					}
				}
			}
		}
	}
	
	var mapId = "";
	var polygonSelectArea = "";
	var polygonSelectedAreaNm = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
		polygonSelectArea = $houseDash.polygonSelectArea;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		$(".ttitle.charItmMapTitle.green").text(year + "년");
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		polygonSelectArea = $houseDash.polygonSelectArea1;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
		$(".ttitle1.charItmMapTitle.green").text(year + "년");
	}
	
	//if(searchGubun != "" && sido_cd == "00"){
	if(polygonSelectArea == ""){
		polygonSelectArea = "00";
	}else{
		polygonSelectArea = polygonSelectArea;
	}
	
    //if($houseDash.polygonSelectedAreaNm != "") {
    if(polygonSelectedAreaNm != "") {
    	var sido_name_ = "";
    	for(var i=0; i < sidoValues.length; i++){
    		if(sidoValues[i].id == code){
    			sido_name_ = sidoValues[i].name;
    			break;
    		}
    	}
    
    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
    	//$(".ttitle"+mapId+".charItmMapTitle.red").text(sido_name_+" "+polygonSelectedAreaNm);
    	//$('.tag_sido').text(sido_name_+" "+polygonSelectedAreaNm);
    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
    	$('.tag_sido').text(polygonSelectedAreaNm);
		if(!$("#sidoClose").is(":visible")){
			$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
		}
    	if($("#modalSearchTitle option:selected").text().length > 20) {
    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + sido_name_ + " " + $houseDash.polygonSelectedAreaNm);
    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + sido_name_ + " " + polygonSelectedAreaNm);
    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + polygonSelectedAreaNm);
    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
    	} else {
    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + sido_name_ + " " + $houseDash.polygonSelectedAreaNm);
    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + sido_name_ + " " + polygonSelectedAreaNm);
    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + polygonSelectedAreaNm);
    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
    	}
		
		if($("#mapRgn_2").is(":visible")){
			/*if($administStatsMap.ui.curMapId == 1){
				$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
			}else{
				$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
			}*/
			$('.pancon3'+mapId+'h').text('시계열 보기');
			//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
			$('.pancon2'+mapId+'h').text('지역 비교 보기');
		}else{
			/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
			$('.pancon3'+mapId+'h').text('시계열 보기');
			//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
			$('.pancon2'+mapId+'h').text('지역 비교 보기');
			$('.pancon1'+mapId+'h').text($('.pancon1'+mapId+'h').text()+ " - " +polygonSelectedAreaNm);
		}
		//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
    } else {
    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
    	$('.tag_sido').text("전국");
		$("#sidoClose").remove();
    	if($("#modalSearchTitle option:selected").text().length > 20) {
    		$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text());
    	} else {
    		$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text());
    	}		            	    	
		$('.pancon3'+mapId+'h').text('시계열 보기');
		//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
		$('.pancon2'+mapId+'h').text('지역 비교 보기');
    }
    $(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
    if(mapId == ""){
    	if(!$("#mapRgn_2").is(":visible")){
    		$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
    	} 
	}
	$(".mapDiv"+mapId+".charItmMapDiv").show();
	
	
	
	// 가공한 차트 데이터
	var series = [];
	var xAxis = [];
	var colors = [ {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 0,
					y2 : 1
				},
				stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
			} ];
	var total = 0;
	var showInLegend = false;
	var legend = {
		enabled : false
	};
	var stacking = "";
	
	var polygonSelectArea = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
	}
	
	//if(searchGubun != "" && sido_cd == "00"){
	if(polygonSelectArea == ""){
		polygonSelectArea = "00";
	}else{
		polygonSelectArea = polygonSelectArea;
	}
		
	var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
	var total = 0;
	if(isBigItem){
		// 대분류만 사용
		var data = [];
		year = $administStatsMain.ui.selectedYear;
		for(var j in chartMeta){
        	for(var k = 0; k < chartData[sido_cd].length; k++){
        		if(chartData[sido_cd][k].PRD_DE == year) {
        			//if($houseDash.polygonSelectArea != "") {
        			if(polygonSelectArea != "") {
        				//if(chartData[sido_cd][k].CHAR_ITM_ID == j && chartData[sido_cd][k].ADM_CD == $houseDash.polygonSelectArea){
        				if(chartData[sido_cd][k].CHAR_ITM_ID == j && chartData[sido_cd][k].ADM_CD == polygonSelectArea){
        					if((tblId == "DT_1MA0002" && chart_ord == 1 ) || (tblId == "DT_1MA0003" && chart_ord == 2 )  
	        					|| (tblId == "DT_1MA0008" && (chart_ord == 2 || chart_ord == 3)) || (tblId == "DT_1MA0023" && (chart_ord == 3 || chart_ord == 4) )
	        					 || (tblId == "DT_1MA0022" && chart_ord == 2) || (tblId == "DT_1MA0024" && chart_ord == 2) || ((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))  ){
		       			    	var scr_kor = "";
		       			    	showInLegend = true;
		       			    	stacking = "percent";
		       			    	legend = {
									reversed : true
								}
					    	    colors = (function () {
								  var colors = [];
								  var base = Highcharts.getOptions().colors[0];
								  var i;
					
								  for (i = 0; i < 10; i += 2) {
								    // Start out with a darkened base color (negative brighten), and end
								    // up with a much brighter color
								    colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
								  }
								  return colors;
								}());
								if((tblId == "DT_1MA0023" && chart_ord == 4 ) || tblId == "DT_1MA0022" || (tblId == "DT_1MA0024" && chart_ord == 2) ){
		       			    		if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "1"){
		       			        		scr_kor = "남자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "2"){
		       			        		scr_kor = "여자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else{
		       			        		scr_kor = "";
		       			        	}
								}else if(tblId == "DT_1MA0031"){
		       			    		/*if(chartData[sido_cd][k]['OV_L3_ID'] == "1"){
		       			        		scr_kor = "남자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else if(chartData[sido_cd][k]['OV_L3_ID'] == "2"){
		       			        		scr_kor = "여자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else{
		       			        		scr_kor = "";
		       			        	}*/
								}else if((tblId == "DT_1MA0023" && chart_ord == 3 )){
	       			        		data.push({
			       			        	categories : chartMeta[j].scr_kor,
			       			        	name : chartMeta[j].scr_kor,
						    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
						    	        id : j				    	        
						    	    });
						    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
								}else{
		       			    		if(chartData[sido_cd][k]['OV_L2_ID'] == "1"){
		       			        		scr_kor = "남자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'] == "2"){
		       			        		scr_kor = "여자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else{
		       			        		scr_kor = "";
		       			        	}
								}
		       			    }else{
	               			    data.push({
	               			        name : chartMeta[j].scr_kor,
	        		    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
	        		                id : j
	        		    	    });
	        		    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
        		    	    }
        	       	    }
        			} else {
        				if(chartData[sido_cd][k].ADM_CD == code+sgg_cd && chartData[sido_cd][k].CHAR_ITM_ID == j){
               			    if((tblId == "DT_1MA0002" && chart_ord == 1 ) || (tblId == "DT_1MA0003" && chart_ord == 2 )  
	        					|| (tblId == "DT_1MA0008" && (chart_ord == 2 || chart_ord == 3)) || (tblId == "DT_1MA0023" && (chart_ord == 3 || chart_ord == 4) )
	        					 || (tblId == "DT_1MA0022" && chart_ord == 2) || (tblId == "DT_1MA0024" && chart_ord == 2) || ((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4)) ){
		       			    	var scr_kor = "";
		       			    	showInLegend = true;
		       			    	stacking = "percent";
		       			    	legend = {
									reversed : true
								}
					    	    colors = (function () {
								  var colors = [];
								  var base = Highcharts.getOptions().colors[0];
								  var i;
					
								  for (i = 0; i < 10; i += 2) {
								    // Start out with a darkened base color (negative brighten), and end
								    // up with a much brighter color
								    colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
								  }
								  return colors;
								}());
								if((tblId == "DT_1MA0023" && chart_ord == 4 ) || tblId == "DT_1MA0022" || (tblId == "DT_1MA0024" && chart_ord == 2) ){
		       			    		if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "1"){
		       			        		scr_kor = "남자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "2"){
		       			        		scr_kor = "여자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else{
		       			        		scr_kor = "";
		       			        	}
								}else if(tblId == "DT_1MA0031"){
		       			    		/*if(chartData[sido_cd][k]['OV_L3_ID'] == "1"){
		       			        		scr_kor = "남자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else if(chartData[sido_cd][k]['OV_L3_ID'] == "2"){
		       			        		scr_kor = "여자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else{
		       			        		scr_kor = "";
		       			        	}*/
								}else if((tblId == "DT_1MA0023" && chart_ord == 3 )){
	       			        		data.push({
			       			        	categories : chartMeta[j].scr_kor,
			       			        	name : chartMeta[j].scr_kor,
						    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
						    	        id : j				    	        
						    	    });
						    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
								}else{
		       			    		if(chartData[sido_cd][k]['OV_L2_ID'] == "1"){
		       			        		scr_kor = "남자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'] == "2"){
		       			        		scr_kor = "여자 ";
		       			        		data.push({
				       			        	//name : scr_kor + chartMeta[j].scr_kor,
				       			        	categories : scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
		       			        	}else{
		       			        		scr_kor = "";
		       			        	}
								}
		       			    	
               			    }else{
	               			    data.push({
	               			        name : chartMeta[j].scr_kor,
	        		    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
	        		                id : j
	        		    	    });
	        		    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
        		    	    }
        	       	    }
        			}        			
        		}	       	    
        	}
        }
		var altrtv_disp_wrd ='';
		for(var j =0; j < chartInfo[chart_ord].length; j++){
            altrtv_disp_wrd = chartInfo[chart_ord][0].chart_nm;
		}
		
		if(tblId == "DT_1MA0001" || sClassCd == "0204" || (sClassCd == "0203" && tblId != "DT_1OH0401") || (sClassCd == "0202" && tblId != "DT_1OH0511") || (sClassCd == "0201" && tblId != "DT_1OH0501") ||tblId == "DT_1MA0031" ){	//가운데 총계넣기
			var innerdata = [];
			innerdata.push({
            	name : "총계",
            	y : total,
            	color : "#BCBCBC",
            	j : "A11"
            });
			var seriesData = {
	            name : altrtv_disp_wrd,
	            innerSize : "0%",
	            data : innerdata,
	            states : {
					select : {
	            		color : "#FF0000"
	            	}
				},
				allowPointSelect: true
			};
			series.push(seriesData);
			
			seriesData = {
	            name : altrtv_disp_wrd,
	            innerSize : "80%",
	            data : data,
	            states : {
					select : {
	            		color : "#FF0000"
	            	}
				},
				allowPointSelect: true
			};
			series.push(seriesData);
			xAxis = {
					type: 'category'
				}
		}else{
			var seriesData = {
	            name : altrtv_disp_wrd,
	            data : data,
	            states : {
					select : {
	            		color : "#FF0000"
	            	}
				},
				allowPointSelect: true
			};
			series.push(seriesData);
			xAxis = {
					type: 'category'
				}
		}
	} else {
		// 대분류 중분류 모두 사용
		// 차트 데이터 가공
		for(var i =0; i < itm_id_list.length; i++){
			var data = [];
	        for(var j in chartMeta){
	        	for(var k = 0; k < chartData[sido_cd].length; k++){
	        		if(chartData[sido_cd][k].PRD_DE == year) {
	        			//if($houseDash.polygonSelectArea != "") {
	        			if(polygonSelectArea != "") {
	        				//if(j == chartData[sido_cd][k]['OV_L'+chartMeta[j].var_ord+'_ID']  && chartData[sido_cd][k].CHAR_ITM_ID == itm_id_list[i] && chartData[sido_cd][k].ADM_CD == $houseDash.polygonSelectArea){
	        				if(j == chartData[sido_cd][k]['OV_L'+chartMeta[j].var_ord+'_ID']  && chartData[sido_cd][k].CHAR_ITM_ID == itm_id_list[i] && chartData[sido_cd][k].ADM_CD == polygonSelectArea){
			       			    if((tblId == "DT_1MA0002" && chart_ord == 1 ) || (tblId == "DT_1MA0003" && chart_ord == 2 )   
			       			    	|| (tblId == "DT_1MA0008" && (chart_ord == 2 || chart_ord == 3)) || (tblId == "DT_1MA0023" && (chart_ord == 3 || chart_ord == 4))
			       			    	 || (tblId == "DT_1MA0022" && chart_ord == 2) || (tblId == "DT_1MA0024" && chart_ord == 2) || ((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))  ){
			       			    	var scr_kor = "";
			       			    	showInLegend = true;
			       			    	stacking = "percent";
			       			    	legend = {
										reversed : true
									}
			       			        colors = (function () {
									  var colors = [];
									  var base = Highcharts.getOptions().colors[0];
									  var i;
						
									  for (i = 0; i < 10; i += 2) {
									    // Start out with a darkened base color (negative brighten), and end
									    // up with a much brighter color
									    colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
									  }
									  return colors;
									}());
									if((tblId == "DT_1MA0023" && chart_ord == 4 ) || tblId == "DT_1MA0022" || (tblId == "DT_1MA0024" && chart_ord == 2) ){
			       			    		if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "1"){
			       			        		scr_kor = "남자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "2"){
			       			        		scr_kor = "여자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else{
			       			        		scr_kor = "";
			       			        	}
									}else if(tblId == "DT_1MA0031"){
			       			    		/*if(chartData[sido_cd][k]['OV_L3_ID'] == "1"){
			       			        		scr_kor = "남자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else if(chartData[sido_cd][k]['OV_L3_ID'] == "2"){
			       			        		scr_kor = "여자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else{
			       			        		scr_kor = "";
			       			        	}*/
									}else if((tblId == "DT_1MA0023" && chart_ord == 3 )){
				       			    	data.push({
				       			        	categories : chartMeta[j].scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        }else{
			       			    		if(chartData[sido_cd][k]['OV_L2_ID'] == "1"){
			       			        		scr_kor = "남자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'] == "2"){
			       			        		scr_kor = "여자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else{
			       			        		scr_kor = "";
			       			        	}
			       			        }
			       			    }else{
				       			    data.push({
				       			        name : chartMeta[j].scr_kor,
						    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
						    	        id : j				    	        
						    	    });
						    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
					    	    }
				       	    }
	        			} else {
	        				if(chartData[sido_cd][k].ADM_CD == code+sgg_cd && j == chartData[sido_cd][k]['OV_L'+chartMeta[j].var_ord+'_ID'] 
				       	     && chartData[sido_cd][k].CHAR_ITM_ID == itm_id_list[i]){
				       	    	if((tblId == "DT_1MA0002" && chart_ord == 1 ) || (tblId == "DT_1MA0003" && chart_ord == 2 )   
			       			    	|| (tblId == "DT_1MA0008" && (chart_ord == 2 || chart_ord == 3)) || (tblId == "DT_1MA0023" && (chart_ord == 3 || chart_ord == 4))
			       			    	 || (tblId == "DT_1MA0022" && chart_ord == 2) || (tblId == "DT_1MA0024" && chart_ord == 2) || ((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))  ){
			       			    	var scr_kor = "";
			       			    	showInLegend = true;
			       			    	stacking = "percent";
			       			    	legend = {
										reversed : true
									}
			       			        colors = (function () {
									  var colors = [];
									  var base = Highcharts.getOptions().colors[0];
									  var i;
						
									  for (i = 0; i < 10; i += 2) {
									    // Start out with a darkened base color (negative brighten), and end
									    // up with a much brighter color
									    colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
									  }
									  return colors;
									}());
									if((tblId == "DT_1MA0023" && chart_ord == 4 ) || tblId == "DT_1MA0022" || (tblId == "DT_1MA0024" && chart_ord == 2) ){
			       			    		if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "1"){
			       			        		scr_kor = "남자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'].substring(2,3) == "2"){
			       			        		scr_kor = "여자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else{
			       			        		scr_kor = "";
			       			        	}
									}else if(tblId == "DT_1MA0031"){
			       			    		/*if(chartData[sido_cd][k]['OV_L3_ID'] == "1"){
			       			        		scr_kor = "남자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else if(chartData[sido_cd][k]['OV_L3_ID'] == "2"){
			       			        		scr_kor = "여자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else{
			       			        		scr_kor = "";
			       			        	}*/
									}else if((tblId == "DT_1MA0023" && chart_ord == 3 )){
				       			    	data.push({
				       			        	categories : chartMeta[j].scr_kor,
				       			        	name : chartMeta[j].scr_kor,
							    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
							    	        id : j				    	        
							    	    });
							    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        }else{
			       			    		if(chartData[sido_cd][k]['OV_L2_ID'] == "1"){
			       			        		scr_kor = "남자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else if(chartData[sido_cd][k]['OV_L2_ID'] == "2"){
			       			        		scr_kor = "여자 ";
					       			    	data.push({
					       			        	//name : scr_kor + chartMeta[j].scr_kor,
					       			        	categories : scr_kor,
					       			        	name : chartMeta[j].scr_kor,
								    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
								    	        id : j				    	        
								    	    });
								    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
			       			        	}else{
			       			        		scr_kor = "";
			       			        	}
			       			        }
			       			    }else{
				       			    data.push({
				       			        name : chartMeta[j].scr_kor,
						    	        y : parseFloat(chartData[sido_cd][k].DTVAL_CO),
						    	        id : j				    	        
						    	    });
						    	    total += parseFloat(chartData[sido_cd][k].DTVAL_CO);
					    	    }
				       	    }
	        			}
	        		}		       	   
	        	}
	        }
			var altrtv_disp_wrd ='';
			for(var j =0; j < chartInfo[chart_ord].length; j++){
				if(itm_id_list[i] == chartInfo[chart_ord][j].itm_id){
					altrtv_disp_wrd = chartInfo[chart_ord][j].altrtv_disp_wrd
					break;
				}
			}
			
			if(tblId == "DT_1MA0001" || sClassCd == "0204" || (sClassCd == "0203" && tblId != "DT_1OH0401") || (sClassCd == "0202" && tblId != "DT_1OH0511") || (sClassCd == "0201" && tblId != "DT_1OH0501") || tblId == "DT_1MA0031" ){	//가운데 총계넣기
				var innerdata = [];
				innerdata.push({
	            	name : "총계",
	            	y : total,
	            	color : "#BCBCBC",
	            	j : "A11"
	            });
				var seriesData = {
		            name : altrtv_disp_wrd,
		            innerSize : "0%",
		            data : innerdata,
		            id : itm_id_list[i],
		            states : {
						select : {
		            		color : "#FF0000"
		            	}
					},
					allowPointSelect: true
				};
				series.push(seriesData);
				
				seriesData = {
		            name : altrtv_disp_wrd,
		            innerSize : "80%",
		            data : data,
		            id : itm_id_list[i],
		            states : {
						select : {
		            		color : "#FF0000"
		            	}
					},
					allowPointSelect: true
				};
				series.push(seriesData);
				xAxis = {
					type: 'category'
				}
			}else if((tblId == "DT_1MA0002" && chart_ord == 1 ) || (tblId == "DT_1MA0003" && chart_ord == 2 )  
				|| (tblId == "DT_1MA0008" && (chart_ord == 2 || chart_ord == 3)) || (tblId == "DT_1MA0023" && (chart_ord == 3 || chart_ord == 4))
				 || (tblId == "DT_1MA0022" && chart_ord == 2) || (tblId == "DT_1MA0024" && chart_ord == 2) || ((tblId == "DT_1MA0004" || tblId == "DT_1MA0005") &&(chart_ord == 3 || chart_ord == 4))  ){
				var data1_ = [], data2_ = [], categories = [], vdata = [];
				//data.sort(function(a, b) { return (b.categories) - (a.categories)});
				var name = "";
				var index = 0;
				var total1 = 0, total2 = 0;
				
				if(tblId == "DT_1MA0023" && chart_ord == 3){
					xAxis = {
						type: 'category'
					}
					showInLegend = false;
   			    	stacking = "";
   			    	legend = {
						enabled : false
					}
		    	    colors = [ {
						linearGradient : {
							x1 : 0,
							y1 : 0,
							x2 : 0,
							y2 : 1
						},
						stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
					} ];
					var seriesData = {
			            name : altrtv_disp_wrd,
			            data : data,
			            id : itm_id_list[i],
			            states : {
							select : {
			            		color : "#FF0000"
			            	}
						},
						allowPointSelect: true
					};
					series.push(seriesData);
				}else{
					for(var a = 0; a < data.length; a++){
						if(data[a].categories.trim() == "남자"){
							data1_.push(data[a]);
						}else if(data[a].categories.trim() == "여자"){
							data2_.push(data[a]);
						}
					}
					
					//data1_.sort(function(a, b) { return (b.name) - (a.name)});
					//data2_.sort(function(a, b) { return (b.name) - (a.name)});
					
					name = data1_[0].name;
					total1 = 0;
					for(var a = 0; a < data1_.length; a++){
						if(name == data1_[a].name){
							total1 += data1_[a].y;
							data1_[a].y = 0;
							if(a == data1_.length-1){
								data1_[index].y = total1;
							}
						}else{
							data1_[index].y = total1;
							index = a;
							total1 = data1_[a].y;
						}
						name = data1_[a].name;
					}
					name = data2_[0].name;
					total2 = 0;
					index = 0;
					for(var a = 0; a < data2_.length; a++){
						if(name == data2_[a].name){
							total2 += data2_[a].y;
							data2_[a].y = 0;
							if(a == data2_.length-1){
								data2_[index].y = total2;
							}
						}else{
							data2_[index].y = total2;
							index = a;
							total2 = data2_[a].y;
						}
						name = data2_[a].name;
					}
					
					categories.push("남자");
					categories.push("여자");
					xAxis = {category: categories};
					for(var a = 0; a < data1_.length; a++){
						for(var b = 0; b < data2_.length; b++){
							if(data1_[a].name == data2_[b].name && data1_[a].y != 0 && data2_[b].y != 0){
								vdata.push({
									name : data1_[a].name,
					    	        y : data1_[a].y,
					    	        id : data1_[a].id
								});
								vdata.push({
									name : data2_[b].name,
					    	        y : data2_[b].y,
					    	        id : data2_[b].id
								});
								var seriesData = {
						            name : data1_[a].name,
						            data : vdata,
						            id : itm_id_list[i],
						            states : {
										select : {
						            		color : "#FF0000"
						            	}
									},
									allowPointSelect: true
								};
								series.push(seriesData);
								vdata = [];
							}
						}
						
					}
				}
				
			}else{
				var seriesData = {
		            name : altrtv_disp_wrd,
		            data : data,
		            id : itm_id_list[i],
		            states : {
						select : {
		            		color : "#FF0000"
		            	}
					},
					allowPointSelect: true
				};
				series.push(seriesData);
				xAxis = {
					type: 'category'
				}
			}
			
			
		}
	}
	let charts;
	if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S01'){
		//막대 그래프(가로)
		
		var mapId = "";
		var polygonSelectedAreaNm = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			$("#panel41").show();
		}
		
		charts = Highcharts.chart('chart_main'+mapId, {
			chart : {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				type : 'bar',
				events: {
					load: function() {
						if($houseDash.chartItmClick != "") {
					    	$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    		if(bar.category == $houseDash.chartItmClickName) {
					    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
					    			bar.select();
					    		}    		
					    	});
					    }
					}
				}
			},
			title : {
				text : '',
				align: "center",
				verticalAlign: "top",
				margin: 0,
				//floating: true,
				style: {
					color: '#333333',
		        	fontSize: '14px',
		        	fontWeight: '700',
		        	fontFamily: 'NanumSquare',
		        	fontStyle: 'none',
		        	textTransform: 'none'
				}
			},
			exporting : {
				enabled : false
			},
			credits : {
				enabled : false
			},
			legend : {
				enabled : false
			},
			xAxis: {
				type: 'category'
			},
			yAxis : {
				title : {
					enabled : false
				},
				labels : {
					enabled : false
				},
				gridLineWidth : 0
			},
			colors : [ {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 0,
					y2 : 1
				},
				stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
			} ],
			plotOptions : {
				series : {
					dataLabels : {
						enabled : true,
						format : '{point.y:,.0f} ' + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm
					},
					cursor : 'pointer',
					borderRadius : 5,
				},
				bar : {
		            events : {
						click : function(evt) {
							if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
								$administStatsMap.ui.curMapId = 0;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
								$(".ttitle.charItmMapTitle.green").text(year + "년");
							}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
								$administStatsMap.ui.curMapId = 1;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
								$(".charItmMapTitle.green").text(year + "년");
								$(".ttitle1.charItmMapTitle.green").text(year + "년");
							}
						    //if($houseDash.polygonSelectedAreaNm != "") {
						    if(polygonSelectedAreaNm != "") {
						    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
						    	$('.tag_sido').text(polygonSelectedAreaNm);
								if(!$("#sidoClose").is(":visible")){
									$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
								}
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() );
						    	}
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + $houseDash.polygonSelectedAreaNm);
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
								
								if($("#mapRgn_2").is(":visible")){
									/*if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
									}else{
										$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
									}*/
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
								}else{
									/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
									//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
									$('.pancon1'+mapId+'h').text($('.pancon1'+mapId+'h').text()+ " - " + polygonSelectedAreaNm);
								}
								//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
						    } else {
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
						    	$('.tag_sido').text("전국");
								$("#sidoClose").remove();
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text());
						    	}		            	    	
								$('.pancon3'+mapId+'h').text('시계열 보기');
								$('.pancon2'+mapId+'h').text('지역 비교 보기');
						    }
							if(mapId == ""){
								if(!$("#mapRgn_2").is(":visible")){
									$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
								} 
							}
							$(".mapDiv"+mapId+".charItmMapDiv").show();
							
							if(evt.point.selected) {
								$houseDash.chartItmClick = "";
								$houseDash.chartItmClickName = "";
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
							} else {
								$houseDash.chartItmClick = this.chart.hoverPoint.id;
								$houseDash.chartItmClickName = this.chart.hoverPoint.name;
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + this.chart.hoverPoint.name);
							}
							if($administStatsMap.ui.curMapId == 1){
			            		drawChartsSgg2(chart_ord ,$houseDash.polygonSelectArea1, year);
								drawChartsSgg3(chart_ord ,$houseDash.polygonSelectArea1, year);
								drawChartsSgg4(chart_ord ,$houseDash.polygonSelectArea1, year);
							}else if($administStatsMap.ui.curMapId == 0){
			            		drawChartsSgg2(chart_ord ,$houseDash.polygonSelectArea, year);
								drawChartsSgg3(chart_ord ,$houseDash.polygonSelectArea, year);
								drawChartsSgg4(chart_ord ,$houseDash.polygonSelectArea, year);
							}
							//$('.pancon4'+mapId+'h').text(year +'년 지역별 데이터 보기');
							$('.pancon4'+mapId+'h').text('표 보기');
							
							//순위 세팅
							if($('.modal-location').is(":visible")){
								//findRank(code+sgg_cd);
							}
							
							if(searchGubun + $administStatsMain.ui.selectedArea != code+sgg_cd){
								if((code+sgg_cd).length == 2){
									$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기									
								} else {
									$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
								}
							}else{
								if($houseDash.chartItmClick != ''){
									if((code+sgg_cd).length == 2){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if((code+sgg_cd).length == 5) {
										$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
									}
								}
							}
							
							//나머지 맵도 선택
							if($("#mapRgn_2").is(":visible")){
								setTimeout(function(){
									if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
										$administStatsMap.ui.curMapId = 0;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
									}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
										$administStatsMap.ui.curMapId = 1;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
									}
									generateCharts(chart_ord ,"00", year);
									
									if(((($houseDash.polygonSelectArea == "" || $houseDash.polygonSelectArea.length == 2) && $administStatsMap.ui.curMapId == 0) || (($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2) && $administStatsMap.ui.curMapId == 1))){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(chkRegionEnd == '시군구' && chartMode == 'sgg' && (($houseDash.polygonSelectArea.length == 5 && $administStatsMap.ui.curMapId == 0) || ($houseDash.polygonSelectArea1.length == 5 && $administStatsMap.ui.curMapId == 1) )){
										$administStatsMap.ui.drawMapData("sgg", "color", region_code + "" + sgg_code); // 맵 그리기
									}
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
							}
							
							
						}
		            },
		            states : {
		            	select : {
		            		color : "#FF0000"
		            	},
		            	unselect: {
		            		
		            	}
		            }
				}
			},
			tooltip : {
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					befYear = parseInt(year)-1, incDecStr = ""; 
					
					var polygonSelectArea = "";
					//if($administStatsMap.ui.curMapId == 0){
					//if(mapId == 0){
					if($(e.chart.container).parent().attr('id') == "chart_main"){
						polygonSelectArea = $houseDash.polygonSelectArea;
						totDt = 0;
						incDec = 0;
						befDt = [];
						$administStatsMap.ui.curMapId = 0;
					//}else if($administStatsMap.ui.curMapId == 1){
					//}else if(mapId == 1){
					}else if($(e.chart.container).parent().attr('id') == "chart_main1"){
						polygonSelectArea = $houseDash.polygonSelectArea1;
						totDt1 = 0;
						incDec1 = 0;
						befDt1 = [];
						$administStatsMap.ui.curMapId = 1;
					}
					
					for(var i=0; i<chartData[sido_cd].length; i++) {
						if(chartData[sido_cd][i].PRD_DE == befYear) {
							for(var j=0; j<Object.keys(chartMeta).length; j++) {
								let setChrItmId = Object.keys(chartMeta)[j];
								if(chartMeta[setChrItmId].var_ord == 0) {
									//if($houseDash.polygonSelectArea != "") {
									if(polygonSelectArea != "") {
										//if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor && this.key == chartMeta[setChrItmId].scr_kor && chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor && this.key == chartMeta[setChrItmId].scr_kor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt1.push(chartData[sido_cd][i]);
											}
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt1.push(chartData[sido_cd][i]);
										}
									} else {
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
												&& this.key == chartMeta[setChrItmId].scr_kor
												&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}
								} else {
									//if($houseDash.polygonSelectArea != "") {
									if(polygonSelectArea != "") {
										//if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor && this.key == chartMeta[setChrItmId].scr_kor && chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
										if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor && this.key == chartMeta[setChrItmId].scr_kor && chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									} else {
										if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor 
												&& this.key == chartMeta[setChrItmId].scr_kor
												&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											//befDt.push(chartData[sido_cd][i]);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}
								}							
								
							}
						}						
					}
					
					var incDec_ = 0;
					if($administStatsMap.ui.curMapId == 0){
						incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
						incDec_ = incDec;
						if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
						incDec_ = incDec1;
						if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}
					//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
					
					/*if(befDt.length > 0) {
						//if(incDec < 0) {
						if(incDec_ < 0) {
							//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
							incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
						//} else if(incDec > 0) {
						} else if(incDec_ > 0) {
							//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
							incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
						} else {
							incDecStr = "변동 없음";
						}
					} else {
						incDecStr = "전년도 자료 없음";
					}*/
					
					return '<b>' + this.key + '</b>' +
						'<br/>' + incDecStr;
				},
				footerFormat : ''
			},
			series : series
		});
	} else if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S02'){
		//막대 그래프(세로)
		
		var mapId = "";
		var polygonSelectedAreaNm = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			$("#panel41").show();
		}
		
		charts = Highcharts.chart('chart_main'+mapId, {
			chart : {
				plotShadow : false,
				type : 'column',
				events: {
					load: function() {
						if($houseDash.chartItmClick != "") {
					    	$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    		if(bar.id == $houseDash.chartItmClick) {
					    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.name);
					    			bar.select();
					    		}    		
					    	});
					    }
					}
				}
			},
			title : {
				text : '',
				align: "center",
				verticalAlign: "top",
				margin: 0,
				//floating: true,
				style: {
					color: '#333333',
		        	fontSize: '14px',
		        	fontWeight: '700',
		        	fontFamily: 'NanumSquare',
		        	fontStyle: 'none',
		        	textTransform: 'none'
				}
			},
			exporting : {
				enabled : false
			},
			credits : {
				enabled : false
			},
			/*legend : {
				enabled : false
			},
			xAxis: {
				type: 'category'
			},*/
			legend : legend,
			xAxis : xAxis,
			yAxis : {
				title : {
					enabled : false
				},
				labels : {
					enabled : false
				},
				gridLineWidth : 0
			},
			/*colors : [ {
				linearGradient : {
					x1 : 0,
					y1 : 0,
					x2 : 0,
					y2 : 1
				},
				stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
			} ],*/
			colors : $houseDash.chartOpt.chart1.pieColors,
			plotOptions : {
				series : {
					dataLabels : {
						enabled : true,
						//format : '{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm
						formmater: function() {
							if(this.y <= 3) {
								return "x" + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm;
							} else {
								return numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm;
							}
						}
					},
					cursor : 'pointer',
					borderRadius : 5
					,showInLegend : showInLegend
					,stacking : stacking
				},
				column : {
		            events : {
		            	click : function(evt) {
		            		if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
								$administStatsMap.ui.curMapId = 0;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
			            		$(".ttitle.charItmMapTitle.green").text(year + "년");
							}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
								$administStatsMap.ui.curMapId = 1;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
			            		$(".ttitle1.charItmMapTitle.green").text(year + "년");
							}
						    //if($houseDash.polygonSelectedAreaNm != "") {
						    if(polygonSelectedAreaNm != "") {
						    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
						    	$('.tag_sido').text(polygonSelectedAreaNm);
								if(!$("#sidoClose").is(":visible")){
									$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
								}
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + $houseDash.polygonSelectedAreaNm);
						    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + polygonSelectedAreaNm);
						    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
						    	}
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + $houseDash.polygonSelectedAreaNm);
								//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
								//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
								if($("#mapRgn_2").is(":visible")){
									/*if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
									}else{
										$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
									}*/
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
								}else{
									/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
									//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
									$('.pancon1'+mapId+'h').text($('.pancon1'+mapId+'h').text() + " - " + polygonSelectedAreaNm);
								}
						    } else {
						    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
						    	$('.tag_sido').text("전국");
								$("#sidoClose").remove();
						    	if($("#modalSearchTitle option:selected").text().length > 20) {
						    		$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text());
						    	} else {
						    		$('.pancon1'+mapId+'h').text(year +' ' + $("#modalSearchTitle option:selected").text());
						    	}		            	    	
								$('.pancon3'+mapId+'h').text('시계열 보기');
								//$('.pancon2'+mapId+'h').text(year + '년 지역별 비교 보기');
								$('.pancon2'+mapId+'h').text('지역 비교 보기');
						    }
							if(mapId == ""){
								if(!$("#mapRgn_2").is(":visible")){
									$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
								} 
							}
							$(".mapDiv"+mapId+".charItmMapDiv").show();
							
							if(evt.point.selected) {
								$houseDash.chartItmClick = "";
								$houseDash.chartItmClickName = "";
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
							} else {								
								$houseDash.chartItmClick = this.chart.hoverPoint.id;
								$houseDash.chartItmClickName = this.chart.hoverPoint.name;
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + this.chart.hoverPoint.name);
							}
		            		if($administStatsMap.ui.curMapId == 1){
			            		drawChartsSgg2(chart_ord ,$houseDash.polygonSelectArea1, year);
								drawChartsSgg3(chart_ord ,$houseDash.polygonSelectArea1, year);
								drawChartsSgg4(chart_ord ,$houseDash.polygonSelectArea1, year);
							}else if($administStatsMap.ui.curMapId == 0){
			            		drawChartsSgg2(chart_ord ,$houseDash.polygonSelectArea, year);
								drawChartsSgg3(chart_ord ,$houseDash.polygonSelectArea, year);
								drawChartsSgg4(chart_ord ,$houseDash.polygonSelectArea, year);
							}
							
							//$('.pancon4'+mapId+'h').text(year +'년 지역별 데이터 보기');
							$('.pancon4'+mapId+'h').text('표 보기');
							
							//순위 세팅
							if($('.modal-location').is(":visible")){
								//findRank(code+sgg_cd);
							}
							
							if(searchGubun + $administStatsMain.ui.selectedArea != code+sgg_cd){
								if((code+sgg_cd).length == 2){
									$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
								} else {
									$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
								}
							}else{
								if($houseDash.chartItmClick != ''){
									if((code+sgg_cd).length == 2){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if((code+sgg_cd).length == 5){
										$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
									}
								}
							}
							
							//나머지 맵도 선택
							if($("#mapRgn_2").is(":visible")){
								setTimeout(function(){
									if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
										$administStatsMap.ui.curMapId = 0;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
									}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
										$administStatsMap.ui.curMapId = 1;
										polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
										$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
									}
									generateCharts(chart_ord ,"00", year);
									
									if(((($houseDash.polygonSelectArea == "" || $houseDash.polygonSelectArea.length == 2 ) && $administStatsMap.ui.curMapId == 0) || (($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2) && $administStatsMap.ui.curMapId == 1))){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if(chkRegionEnd == '시군구' && chartMode == 'sgg' && (($houseDash.polygonSelectArea.length == 5 && $administStatsMap.ui.curMapId == 0) || ($houseDash.polygonSelectArea1.length == 5 && $administStatsMap.ui.curMapId == 1) )){
										$administStatsMap.ui.drawMapData("sgg", "color", region_code + "" + sgg_code); // 맵 그리기
									}
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
							}
							
						}
		            }
				}
			},
			tooltip : {
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					befYear = parseInt(year)-1, incDecStr = ""; 
					var polygonSelectArea = "";
					//if($administStatsMap.ui.curMapId == 0){
					//if(mapId == 0){
					if($(e.chart.container).parent().attr('id') == "chart_main"){
						polygonSelectArea = $houseDash.polygonSelectArea;
						totDt = 0;
						incDec = 0;
						befDt = [];
						$administStatsMap.ui.curMapId = 0;
					//}else if($administStatsMap.ui.curMapId == 1){
					//}else if(mapId == 1){
					}else if($(e.chart.container).parent().attr('id') == "chart_main1"){
						polygonSelectArea = $houseDash.polygonSelectArea1;
						totDt1 = 0;
						incDec1 = 0;
						befDt1 = [];
						$administStatsMap.ui.curMapId = 1;
					}
					//if(searchGubun != "" && sido_cd == "00"){
					if(polygonSelectArea == ""){
						polygonSelectArea = "00";
					}else{
						polygonSelectArea = polygonSelectArea;
					}
					
					var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
					for(var i=0; i<chartData[sido_cd].length; i++) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							if(chartData[sido_cd][i].PRD_DE == befYear) {
								let setChrItmId = Object.keys(chartMeta)[j];
								//if($houseDash.polygonSelectArea != "") {
								if(polygonSelectArea != "") {
									//if(chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
									if(chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
										if(this.key == chartMeta[setChrItmId].scr_kor) {
											if(chartMeta[setChrItmId].var_ord == 0) {
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
														&& this.key == chartMeta[setChrItmId].scr_kor) {
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
													}
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												}
											} else {
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor) {
													//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													if($administStatsMap.ui.curMapId == 0){
														totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
													}else if($administStatsMap.ui.curMapId == 1){
														totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
													}
												}
											}
										}
									}								
								} else {
									if(this.key == chartMeta[setChrItmId].scr_kor) {
										if(chartMeta[setChrItmId].var_ord == 0) {
											if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
													&& this.key == chartMeta[setChrItmId].scr_kor
													&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}
											}
										} else {
											if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor
													&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}
											}
										}
									}
								}
								if($administStatsMap.ui.curMapId == 0){
									befDt.push(chartData[sido_cd][i]);
								}else if($administStatsMap.ui.curMapId == 1){
									befDt1.push(chartData[sido_cd][i]);
								}
							}
						}
					}
					
					var incDec_ = 0;
					if($administStatsMap.ui.curMapId == 0){
						incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
						incDec_ = incDec;
						if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
						incDec_ = incDec1;
						if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}
					//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
					
					/*if(befDt.length > 0) {
						//if(incDec < 0) {
						if(incDec_ < 0) {
							//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
							incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
						//} else if(incDec > 0) {
						} else if(incDec_ > 0) {
							//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
							incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
						} else {
							incDecStr = "변동 없음";
						}
					} else {
						incDecStr = "전년도 자료 없음";
					}*/
					
					return '<b>' + this.key + '</b>' +
						'<br/>' + incDecStr;
				},
				footerFormat : ''
			},
			series : series
		});
	} else if(chartInfo[chart_ord][0].chart_type.trim() == 'CH1S03'){
		//꺽은선 그래프
		
		var mapId = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			$("#panel41").show();
		}
		
		charts = Highcharts.chart('chart_main'+mapId, {
			chart : {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false,
				events: {
					load: function() {
						if($houseDash.chartItmClick != "") {
					    	$("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    		if(bar.id == $houseDash.chartItmClick) {
					    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.name);
					    			bar.select();
					    		}    		
					    	});
					    }
					}
				}
			},
			title : {
				text : '',
				align: "center",
				verticalAlign: "top",
				margin: 0,
				//floating: true,
				style: {
					color: '#333333',
		        	fontSize: '14px',
		        	fontWeight: '700',
		        	fontFamily: 'NanumSquare',
		        	fontStyle: 'none',
		        	textTransform: 'none'
				}
			},
			tooltip : {
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					befYear = parseInt(year)-1, incDecStr = ""; 
					
					var polygonSelectArea = "";
					//if($administStatsMap.ui.curMapId == 0){
					//if(mapId == 0){
					if($(e.chart.container).parent().attr('id') == "chart_main"){
						polygonSelectArea = $houseDash.polygonSelectArea;
						totDt = 0;
						incDec = 0;
						befDt = [];
						$administStatsMap.ui.curMapId = 0;
					//}else if($administStatsMap.ui.curMapId == 1){
					//}else if(mapId == 1){
					}else if($(e.chart.container).parent().attr('id') == "chart_main1"){
						polygonSelectArea = $houseDash.polygonSelectArea1;
						totDt1 = 0;
						incDec1 = 0;
						befDt1 = [];
						$administStatsMap.ui.curMapId = 1;
					}
					//if(searchGubun != "" && sido_cd == "00"){
					if(polygonSelectArea == ""){
						polygonSelectArea = "00";
					}else{
						polygonSelectArea = searchGubun + polygonSelectArea;
					}
					
					var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
					for(var i=0; i<chartData[sido_cd].length; i++) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							if(chartData[sido_cd][i].PRD_DE == befYear) {
								let setChrItmId = Object.keys(chartMeta)[j];
								//if($houseDash.polygonSelectArea != "") {
								if(polygonSelectArea != "") {
									//if(chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
									if(chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
												&& this.key == chartMeta[setChrItmId].scr_kor) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}
										}
									}
								} else {
									if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
											&& this.key == chartMeta[setChrItmId].scr_kor
											&& chartData[sido_cd][i].ADM_CD != code+sgg_cd) {
										//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
										if($administStatsMap.ui.curMapId == 0){
											totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
										}else if($administStatsMap.ui.curMapId == 1){
											totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
										}
									}
								}
								
								if($administStatsMap.ui.curMapId == 0){
									befDt.push(chartData[sido_cd][i]);
								}else if($administStatsMap.ui.curMapId == 1){
									befDt1.push(chartData[sido_cd][i]);
								}
							}
						}
					}
					
					var incDec_ = 0;
					if($administStatsMap.ui.curMapId == 0){
						incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
						incDec_ = incDec;
						if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
						incDec_ = incDec1;
						if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}
					//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
					
					/*if(befDt.length > 0) {
						//if(incDec < 0) {
						if(incDec_ < 0) {
							//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
							incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
						//} else if(incDec > 0) {
						} else if(incDec_ > 0) {
							//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
							incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
						} else {
							incDecStr = "변동 없음";
						}
					} else {
						incDecStr = "전년도 자료 없음";
					}*/
					
					return '<b>' + this.key + '</b>' +
						'<br/>' + incDecStr;
				},
				footerFormat : ''
			},
			series : series
		});
	} else if (chartInfo[chart_ord][0].chart_type.trim() == 'CH1S06') {
		// 파이차트
		var pieColors = (function () {
			  var colors = [];
			  var base = Highcharts.getOptions().colors[0];
			  var i;

			  for (i = 0; i < chartInfo[chart_ord].length; i += 1) {
			    // Start out with a darkened base color (negative brighten), and end
			    // up with a much brighter color
			    colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
			  }
			  return colors;
			}());

		for(var i=0; i<series.length; i++){
			series[i].cursor = 'pointer';
			if(!(tblId == "DT_1MA0001" || sClassCd == "0204" || (sClassCd == "0203" && tblId != "DT_1OH0401") || (sClassCd == "0202" && tblId != "DT_1OH0511") || (sClassCd == "0201" && tblId != "DT_1OH0501") || tblId == "DT_1MA0031") ){
				series[i].innerSize = '50%';
			}
		}
		
		var mapId = "";
		var polygonSelectedAreaNm = "";
		if($administStatsMap.ui.curMapId == 0){
			mapId = "";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		}else if($administStatsMap.ui.curMapId == 1){
			mapId = "1";
			polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
			$("#panel11").show();
			$(".pancon11").show();
			//$("#panel21").show();
			//$("#panel31").show();
			$("#panel41").show();
		}

		charts = Highcharts.chart('chart_main'+mapId, extendChartStyle({
			chart : {
				type : 'pie',
				height: '200px',
				spacing:[10, 15, 10, 5],
				events: {
					load: function() {
						if($houseDash.chartItmClick != "") {
						    $("#chart_main"+mapId).highcharts().series[0].data.forEach(function(bar) {
					    		if(bar.id == $houseDash.chartItmClick) {
					    			$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.name);
					    			bar.select();
					    		}    		
						    });
				    	}
					}
				}
			},
			title : {
				text : '',
				align: "center",
				verticalAlign: "top",
				margin: 0,
				//floating: true,
				style: {
					color: '#333333',
		        	fontSize: '14px',
		        	fontWeight: '700',
		        	fontFamily: 'NanumSquare',
		        	fontStyle: 'none',
		        	textTransform: 'none'
				}
			},
			plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
					colors: $houseDash.chartOpt.chart1.pieColors,
		            showInLegend: true,
		            dataLabels: {
		                enabled: false,
		                //format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
		                //format: '<b>{point.name}</b><br/><b>' + numberFormat('{point.y}') + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>',
		                formatter: function() {
		                	if(this.y <= 3) {
		                		return '<b>' + this.key + '</b><br/><b>' + "x" + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>';
		                	} else {
		                		return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>';
		                	}
		                },
		                distance: '-30%',
		                filter: {
		                    property: 'percentage',
		                    operator: '>',
		                    value: 4
		                },

		            },
		            events : {
		            	click : function(evt) {
		            		if($(evt.point.series.chart.container).parent()[0].id == "chart_main"){
								$administStatsMap.ui.curMapId = 0;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea;
			            		$(".ttitle.charItmMapTitle.green").text(year + "년");
							}else if($(evt.point.series.chart.container).parent()[0].id == "chart_main1"){
								$administStatsMap.ui.curMapId = 1;
								polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
								$administStatsMain.ui.selectedArea = $houseDash.polygonSelectArea1;
			            		$(".ttitle1.charItmMapTitle.green").text(year + "년");
							}
							
		            	    //if($houseDash.polygonSelectedAreaNm != "") {
		            	    if(polygonSelectedAreaNm != "") {
		            	    	//$(".charItmMapTitle.red").text($houseDash.polygonSelectedAreaNm);
		            	    	$(".ttitle"+mapId+".charItmMapTitle.red").text(polygonSelectedAreaNm);
		            	    	$('.tag_sido').text(polygonSelectedAreaNm);
								if(!$("#sidoClose").is(":visible")){
									$('.tag-item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
								}
		            	    	if($("#modalSearchTitle option:selected").text().length > 20) {
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + $houseDash.polygonSelectedAreaNm);
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text().substring(0,20) + "... -" + polygonSelectedAreaNm);
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	} else {
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + $houseDash.polygonSelectedAreaNm);
		            	    		//$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text() + "-" + polygonSelectedAreaNm);
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	}
		            			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + $houseDash.polygonSelectedAreaNm);
		            			//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
		            			//$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
		            			if($("#mapRgn_2").is(":visible")){
									/*if($administStatsMap.ui.curMapId == 1){
										$administStatsMap.ui.mapToggleId1 = $houseDash.polygonSelectArea1;
									}else{
										$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;
									}*/
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
								}else{
									/*$administStatsMap.ui.mapToggleId = $houseDash.polygonSelectArea;*/
									//$('.pancon3'+mapId+'h').text(year +' 시계열 보기' + "-" + polygonSelectedAreaNm);
									$('.pancon3'+mapId+'h').text('시계열 보기' );
									$('.pancon2'+mapId+'h').text('지역 비교 보기');
									$('.pancon1'+mapId+'h').text($('.pancon1'+mapId+'h').text() + " - " + polygonSelectedAreaNm);
								}
		            	    } else {
		            	    	$(".ttitle"+mapId+".charItmMapTitle.red").text("전국");
		            	    	$('.tag_sido').text("전국");
								$("#sidoClose").remove();
		            	    	if($("#modalSearchTitle option:selected").text().length > 20) {
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	} else {
		            	    		$('.pancon1'+mapId+'h').text(year +'년 ' + $("#modalSearchTitle option:selected").text());
		            	    	}		            	    	
		            			$('.pancon3'+mapId+'h').text('시계열 보기');
		            			$('.pancon2'+mapId+'h').text('지역 비교 보기');
		            	    }
							if(mapId == ""){
								if(!$("#mapRgn_2").is(":visible")){
									$(".mapDiv"+mapId+".charItmMapDiv").animate({"left": window.innerWidth/2 - parseInt($(".mapDiv"+mapId+".charItmMapDiv").css("width"))/2 -160 + "px"});
								}
							} 
							$(".mapDiv"+mapId+".charItmMapDiv").show();
							
							if(evt.point.selected) {
								$houseDash.chartItmClick = "";
								$houseDash.chartItmClickName = "";
								$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
							} else {
								if(evt.point.name == "총계"){
									$houseDash.chartItmClick = "";
									$houseDash.chartItmClickName = "";
									$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm);
			            		}else{
									$houseDash.chartItmClick = this.chart.hoverPoint.id;
									$houseDash.chartItmClickName = this.chart.hoverPoint.name;
									$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + this.chart.hoverPoint.name);
								}
							}
		            		if($administStatsMap.ui.curMapId == 1){
			            		drawChartsSgg2(chart_ord ,$houseDash.polygonSelectArea1.substring(0,2), $houseDash.polygonSelectArea1.substring(2,5), year);
								drawChartsSgg3(chart_ord ,$houseDash.polygonSelectArea1.substring(0,2), $houseDash.polygonSelectArea1.substring(2,5), year);
								drawChartsSgg4(chart_ord ,$houseDash.polygonSelectArea1.substring(0,2), $houseDash.polygonSelectArea1.substring(2,5), year);
							}else if($administStatsMap.ui.curMapId == 0){
			            		drawChartsSgg2(chart_ord ,$houseDash.polygonSelectArea.substring(0,2), $houseDash.polygonSelectArea.substring(2,5), year);
								drawChartsSgg3(chart_ord ,$houseDash.polygonSelectArea.substring(0,2), $houseDash.polygonSelectArea.substring(2,5), year);
								drawChartsSgg4(chart_ord ,$houseDash.polygonSelectArea.substring(0,2), $houseDash.polygonSelectArea.substring(2,5), year);
							}
							
							//$('.pancon4'+mapId+'h').text(year +'년 지역별 데이터 보기');
							$('.pancon4'+mapId+'h').text('표 보기');
							
							if($('.modal-location').is(":visible")){
								//findRank(code+sgg_cd);
							}
							
							if(searchGubun + $administStatsMain.ui.selectedArea != code+sgg_cd){
								if((code+sgg_cd).length == 2){
									$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
								} else {
									$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
								}
							}else{
								if($houseDash.chartItmClick != ''){
									if((code+sgg_cd).length == 2){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if((code+sgg_cd).length == 5){
										$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
									}
								}else{
									if(evt.point.name == "총계"){
										if($administStatsMap.ui.curMapId == 1){
											$administStatsMain.ui.loading(true);
											drawChartsSgg1(chart_ord ,$houseDash.polygonSelectArea1.substring(0,2), $houseDash.polygonSelectArea1.substring(2,5), year);
										}else if($administStatsMap.ui.curMapId == 0){
											$administStatsMain.ui.loading(true);
						            		drawChartsSgg1(chart_ord ,$houseDash.polygonSelectArea.substring(0,2), $houseDash.polygonSelectArea.substring(2,5), year);
										}
				            		}
				            		if((code+sgg_cd).length == 2){
										$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
									} else if((code+sgg_cd).length == 5){
										$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
									}
								}
							}
						}
		            },
		            states : {
		            	select : {
		            		color : "#FF0000"
		            	}
		            }
		        }
		    },
			legend: {
	            align: 'right',
	            verticalAlign: 'middle',
	            itemMarginTop:3,
	            //labelFormat: '<b>{name}</b> / {percentage:.1f}%',
	            formatter: function() {
	            	let dispOpt = $houseDash.ui.dispOptions[$("#modalSearchTitle option:selected").val()];
	            	let dispVarId = ""; regionVarId = "", stackVarId = "";
	            	if(dispOpt[0].dispVarOrd == 0) {
	            		dispVarId = "CHAR_ITM_ID";
	            	} else {
	            		dispVarId = "OV_L" + dispOpt[0].dispVarOrd + "_ID";
	            	}
	            	if(dispOpt[0].regionVarOrd == 0) {
	            		regionVarId = "CHAR_ITM_ID";
	            	} else {
	            		regionVarId = "OV_L" + dispOpt[0].regionVarOrd + "_ID";
	            	}
	            	let upAreaCd = $administStatsMain.ui.selectedArea.length == 2 ? "00" : $administStatsMain.ui.selectedArea.substring(0,2); 
	            	for(let i=0; i<chartData[upAreaCd].length; i++) {
	            		if(chartData[upAreaCd][i][regionVarId] == $administStatsMain.ui.selectedArea.substring(0,2)) {
	            		}
	            	}
	            	return "<b>{name}</b> / " + + "%";
	            },
	            floating:false,
	            itemWidth: 250,
	            layout: 'vertical'
			},
			tooltip : {
				useHTML : true,
				headerFormat : '',
				//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
				formatter: function(e) {
					
					befYear = parseInt(year)-1, incDecStr = ""; 
					
					var polygonSelectArea = "";
					//if($administStatsMap.ui.curMapId == 0){
					//if(mapId == 0){
					if($(e.chart.container).parent().attr('id') == "chart_main"){
						polygonSelectArea = $houseDash.polygonSelectArea;
						totDt = 0;
						incDec = 0;
						befDt = [];
						$administStatsMap.ui.curMapId = 0;
					//}else if($administStatsMap.ui.curMapId == 1){
					//}else if(mapId == 1){
					}else if($(e.chart.container).parent().attr('id') == "chart_main1"){
						polygonSelectArea = $houseDash.polygonSelectArea1;
						totDt1 = 0;
						incDec1 = 0;
						befDt1 = [];
						$administStatsMap.ui.curMapId = 1;
					}

					if(polygonSelectArea == ""){
						polygonSelectArea = "00";
					}else{
						polygonSelectArea = searchGubun + polygonSelectArea;
					}

					var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
					for(var i=0; i<chartData[sido_cd].length; i++) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							if(chartData[sido_cd][i].PRD_DE == befYear) {
								//if($houseDash.polygonSelectArea != "") {
								if(polygonSelectArea != "") {
									//if(chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
									if(chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
										let setChrItmId = Object.keys(chartMeta)[j];
										if(tblId == "DT_1NW1001") {
											if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
													&& this.key == chartMeta[setChrItmId].scr_kor) {
												//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}
											}
											if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
													&& this.key == "총계") {
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
												}
											}
										} else {
											if(this.key == chartMeta[setChrItmId].scr_kor) {
												if(chartMeta[setChrItmId].var_ord == 0) {
													if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}
														}
													}
												} else {
													if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}
														}
													}
												}									
											}
											if(this.key == "총계") {
												if(chartMeta[setChrItmId].var_ord == 0) {
													if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}
														}
													}
												} else {
													if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor) {
														if(chartData[sido_cd][i].DTVAL_CO != undefined) {
															if($administStatsMap.ui.curMapId == 0){
																totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}else if($administStatsMap.ui.curMapId == 1){
																totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
															}
														}
													}
												}									
											}
										}
									}
								} else {
									let setChrItmId = Object.keys(chartMeta)[j];
									if(tblId == "DT_1NW1001") {
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
												&& this.key == chartMeta[setChrItmId].scr_kor
												&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
											//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}
										}
										if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
												&& this.key == "총계"
												&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
											}
										}
									} else {
										if(this.key == chartMeta[setChrItmId].scr_kor) {
											if(chartMeta[setChrItmId].var_ord == 0) {
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor
														&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}
													}
												}
											} else {
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor
														&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}
													}
												}
											}									
										}
										if(this.key == "총계") {
											if(chartMeta[setChrItmId].var_ord == 0) {
												if(chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor
														&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}
													}
												}
											} else {
												if(chartData[sido_cd][i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor
														&& chartData[sido_cd][i].ADM_CD == code+sgg_cd) {
													if(chartData[sido_cd][i].DTVAL_CO != undefined) {
														//totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
														if($administStatsMap.ui.curMapId == 0){
															totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}else if($administStatsMap.ui.curMapId == 1){
															totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);;
														}
													}
												}
											}									
										}
									}
								}
								
								if($administStatsMap.ui.curMapId == 0){
									befDt.push(chartData[sido_cd][i]);
								}else if($administStatsMap.ui.curMapId == 1){
									befDt1.push(chartData[sido_cd][i]);
								}
							}
						}
					}
					
					var incDec_ = 0;
					if($administStatsMap.ui.curMapId == 0){
						incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
						incDec_ = incDec;
						if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
						incDec_ = incDec1;
						if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
					}
					
					if(this.y <= 3) {
						return '<b>' + this.key + '</b><br/><b>' + "x" + chartInfo[chart_ord][0].kosis_unit_nm + '</b>' +
						'<br/>' + incDecStr;
					} else {
						return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartInfo[chart_ord][0].kosis_unit_nm + '</b>' +
						'<br/>' + incDecStr;
					}
				},
				footerFormat : ''
			},
			series : series
		}));
	} else {
		// 다른 차트 디자인 및 구성
	};

	$administStatsMain.ui.chart.push( charts );
		
	//pie 차트 중앙 총계 범례 지우기
	var legends = $("#chart_main"+mapId+" .highcharts-legend-item.highcharts-pie-series");
	for(var i=0; i<legends.length; i++) {
		if($(legends[i]).find("text:eq(0)").text().indexOf('총계') > -1 ){
			$(legends[i]).css('display', 'none');
		}
	}
	
	
}

var elsSggValues = [], elsSggCategories = [] //, befTot1 = 0, curTot1 = 0;

//전국 시군구 데이터 저장
var sggAllCategories = [];
var sggAllValues = [];
var sggAllValuesDesc = [];

var sggValuesDesc = [];

var drawChartsSgg2 = function(chart_ord ,code, sgg_cd, year) {	
	// 차트 구성 하기위한 메타
	// 차트 구성 하기위한 메타
	if($houseDash.timeLineChartItmClick != "") {
		year = $houseDash.timeLineChartItmClick;
	}
	sggCategories = [], sggValues = [];
	sggAllCategories = [], sggAllValues = [];
	sggAllValuesDesc = [];
	sggValuesDesc = [];
	var chartMeta = {};
	var notUsedChartMeta = {};
	var isBigItem = false;
    for(var i =0; i<chartInfo[chart_ord].length; i++){
    	if(chartInfo[chart_ord][i].disp_obj_var_id == chartInfo[chart_ord][i].obj_var_id){
    		if(chartInfo[chart_ord][i].disp_obj_var_id == '13999001'){
    			isBigItem = true;
    		}
    		// 차트 그릴때 필요한 값들 여기서 추가
    		chartMeta[(chartInfo[chart_ord][i].itm_id)] = {
    				kosis_unit : chartInfo[chart_ord][i].kosis_unit,
    				kosis_unit_nm : chartInfo[chart_ord][i].kosis_unit_nm,
    				disp_unit_nm : chartInfo[chart_ord][i].disp_unit_nm,
    				disp_obj_var_id : chartInfo[chart_ord][i].disp_obj_var_id,
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				disp_var_ord : chartInfo[chart_ord][i].disp_var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor,
    				region_var_ord : chartInfo[chart_ord][i].region_var_ord
    		}
    	} else {
    		notUsedChartMeta[(chartInfo[chart_ord][i].itm_id)] = {
    				kosis_unit : chartInfo[chart_ord][i].kosis_unit,
    				kosis_unit_nm : chartInfo[chart_ord][i].kosis_unit_nm,
    				disp_unit_nm : chartInfo[chart_ord][i].disp_unit_nm,
    				disp_obj_var_id : chartInfo[chart_ord][i].disp_obj_var_id,
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				disp_var_ord : chartInfo[chart_ord][i].disp_var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor,
    				region_var_ord : chartInfo[chart_ord][i].region_var_ord
    		}
    	}
    }
	
	var unitChangeEvent = function(e) {
		/*generateCharts(chart_ord ,code, year, e.point.id);
		if(code == "00"){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
		//}else if(chkRegionEnd == '시군구'){
		}else if(chkRegionEnd == '시군구' && chartMode == 'sgg'){
			$administStatsMap.ui.drawMapData("sgg", "color", code+sgg_cd); // 맵 그리기
		}*/
	}
	
	var polygonSelectArea = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
	}
	var total;
	var total1;
	
	/*
	for(var i =0; i<sggData.length; i++){
		//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[i].sgg_cd == code){
		//if(polygonSelectArea.substring(0, 2) + sggData[i].sgg_cd == code){
		if(polygonSelectArea.substring(0, 2) + sggData[i].sgg_cd == code + sgg_cd){
			selected_sido_name = sggData[i].sgg_nm;
			break;
		}
	}
	*/
	
	var ord = chartMeta[Object.keys(chartMeta)[0]].varOrd;
	
	elsSggValues = [], elsSggCategories = [];
	originSggValues = [], originSggCategories = [], befTot1 = 0, curTot1 = 0;
	
	var polygonSelectArea = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
	}
	
	//if(searchGubun != "" && sido_cd == "00"){

	if(polygonSelectArea == ""){
		polygonSelectArea = "00";
	}else{
		polygonSelectArea = searchGubun + polygonSelectArea;
	}

	var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
	
	for(var m =0; m<sidoData.length; m++){
		total1 = 0;
		for(var i =0; i<sggData[sidoData[m].sido_cd].length; i++){
			total = 0;
			total1 = 0;
			year = $administStatsMain.ui.selectedYear;
			for(var j = 0; j < chartData[sido_cd].length; j++){
				if(chartData[sido_cd][j].PRD_DE == year) {
					if(tblId == "DT_1NW1001") {
						if(ord == "0") {
							if($houseDash.chartItmClick != "") {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD  && chartData[sido_cd][j].CHAR_ITM_ID == $houseDash.chartItmClick){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD  && chartData[sido_cd][j].CHAR_ITM_ID == $houseDash.chartItmClick){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD  && chartData[sido_cd][j].CHAR_ITM_ID == $houseDash.chartItmClick){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							} else {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == "T10"){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == "T10"){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == "T10"){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							}
						} else {
							if($houseDash.chartItmClick != "") {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							} else {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == "T10"){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == "T10"){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == "T10"){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							}
						}
					} else {
						if(ord == "0") {
							if($houseDash.chartItmClick != "") {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == $houseDash.chartItmClick){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == $houseDash.chartItmClick){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j].CHAR_ITM_ID == $houseDash.chartItmClick){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							} else {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							}
						} else {
							if($houseDash.chartItmClick != "") {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD && chartData[sido_cd][j]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							} else {
								//if($houseDash.polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD){
								if(polygonSelectArea.substring(0, 2) + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD){
									total += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
								if(sidoData[m].sido_cd + sggData[sidoData[m].sido_cd][i].sgg_cd == chartData[sido_cd][j].ADM_CD){
									total1 += parseFloat(chartData[sido_cd][j].DTVAL_CO);
								}
							}
						}
					}
				}			
			}
			
			sggAllCategories.unshift(sggData[sidoData[m].sido_cd][i].sgg_nm);
			sggAllValues.unshift({
				y : parseFloat(total1),
				id : sidoData[m].sido_cd + "" + sggData[sidoData[m].sido_cd][i].sgg_cd,
				sido_nm : sidoData[m].sido_nm,
				name : sggData[sidoData[m].sido_cd][i].sgg_nm,
			});
			
			if($("#mapRgn_2").is(":visible")){
				//if($houseDash.polygonSelectArea == sggData[i].sgg_cd){
				//if(polygonSelectArea.substring(0,2) == sidoData[m].sido_cd){
				if(($administStatsMap.ui.curMapId == 0 && $houseDash.polygonSelectArea.length == 5 && $houseDash.polygonSelectArea.substring(0,2) == sidoData[m].sido_cd) || ($administStatsMap.ui.curMapId == 1 && $houseDash.polygonSelectArea1.length == 5 && $houseDash.polygonSelectArea1.substring(0,2) == sidoData[m].sido_cd)){
					//if(polygonSelectArea.substring(2,5) == sggData[sidoData[m].sido_cd][i].sgg_cd){
					if(($administStatsMap.ui.curMapId == 0 && $houseDash.polygonSelectArea.substring(2,5) == sggData[sidoData[m].sido_cd][i].sgg_cd) || ($administStatsMap.ui.curMapId == 1 && $houseDash.polygonSelectArea1.substring(2,5) == sggData[sidoData[m].sido_cd][i].sgg_cd)){
						sggCategories.unshift(sggData[sidoData[m].sido_cd][i].sgg_nm);
						originSggCategories.unshift(sggData[sidoData[m].sido_cd][i].sgg_nm);
						sggValues.unshift({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : true
						});
						originSggValues.unshift({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : false
						});
					} else {
						elsSggCategories.push(sggData[sidoData[m].sido_cd][i].sgg_nm);
						originSggCategories.push(sggData[sidoData[m].sido_cd][i].sgg_nm);
						elsSggValues.push({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : false
						});
						originSggValues.push({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : false
						});			
					}
				}
			}else{
				if(polygonSelectArea.length == 5 && polygonSelectArea.substring(0,2) == sidoData[m].sido_cd){
					if(polygonSelectArea.substring(2,5) == sggData[sidoData[m].sido_cd][i].sgg_cd){
						sggCategories.unshift(sggData[sidoData[m].sido_cd][i].sgg_nm);
						originSggCategories.unshift(sggData[sidoData[m].sido_cd][i].sgg_nm);
						sggValues.unshift({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : true
						});
						originSggValues.unshift({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : false
						});
					} else {
						elsSggCategories.push(sggData[sidoData[m].sido_cd][i].sgg_nm);
						originSggCategories.push(sggData[sidoData[m].sido_cd][i].sgg_nm);
						elsSggValues.push({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : false
						});
						originSggValues.push({
							y : parseFloat(total),
							id : sggData[sidoData[m].sido_cd][i].sgg_cd,
							sido_nm : str_sido_name,
							name : sggData[sidoData[m].sido_cd][i].sgg_nm,
							selected : false
						});			
					}
				}
			}
			
		}
	}
	
	for(var i=0; i<chartData[sido_cd].length; i++){
		//if(chartData[sido_cd][i].ADM_CD == "00") {
		//if(chartData[sido_cd][i].ADM_CD == $houseDash.polygonSelectArea) {
		if(chartData[sido_cd][i].ADM_CD == polygonSelectArea) {
			if(chartData[sido_cd][i].PRD_DE == year) {
				if(tblId == "DT_1NW1001") {
					if($houseDash.chartItmClick != "") {
						if(ord == "0") {
							if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
								curTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						} else {
							if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
								curTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}						
					} else if(chartData[sido_cd][i].CHAR_ITM_ID == "T10") {
						curTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				} else {
					if($houseDash.chartItmClick != "") {
						if(ord == "0") {
							if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
								curTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						} else {
							if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
								curTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}						
					} else {
						curTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				}			
			} else {
				if(tblId == "DT_1NW1001") {
					if($houseDash.chartItmClick != "") {
						if(ord == "0") {
							if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
								befTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						} else {
							if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
								befTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}						
					} else if(chartData[sido_cd][i].CHAR_ITM_ID == "T10") {
						befTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				} else {
					if($houseDash.chartItmClick != "") {
						if(ord == "0") {
							if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick){
								befTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						} else {
							if(chartData[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
								befTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
							}
						}						
					} else {
						befTot1 += parseFloat(chartData[sido_cd][i].DTVAL_CO);
					}
				}	
			}		
		}
	}
	
	elsSggValues.sort(function(a, b) { return b.y - a.y});
	
	for(var i=0; i<elsSggValues.length; i++) {
		sggCategories.push(elsSggValues[i].name);
		sggValues.push(elsSggValues[i]);
	}
	
	let avgValue = function() {
		let totSum = 0;
		for(var i=0; i<elsSggValues.length; i++) {
			totSum += parseInt(elsSggValues[i].y);
		}
		return (totSum/elsSggValues.length).toFixed(2);
	}
	
	var localSerieName = '합계'
	
	var mapId = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		$("#panel11").show();
		$(".pancon11").show();
		//$("#panel21").show();
		//$("#panel31").show();
		$("#panel41").show();
	}
	
	
	//차트 아이디
	var id = "";
	if($("#mapRgn_2").is(":visible")){
		id = 'chart_local1';
		if(mapId == ""){
			id = 'chart_local1';
			if($houseDash.polygonSelectArea.length == 5){
				$("#panel31").show();
			}
			if($houseDash.polygonSelectArea1.length != 5){
				$("#panel32").hide();
			}
		}else if(mapId == "1"){
			id = 'chart_local2';
			if($houseDash.polygonSelectArea1.length == 5){
				$("#panel32").show();
			}
			if($houseDash.polygonSelectArea.length != 5){
				$("#panel31").hide();
			}
		}
	}else{
		id = 'chart_local1';
		$("#panel31").show();
	}
	
	// 시군구 지역별 막대 차트
	//Highcharts.chart('chart_local'+mapId, {
	let charts = Highcharts.chart(id, {
		chart : {
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
			type : 'column',
			scrollablePlotArea : {
				minWidth: 800,
				scrollPositionX: 0,
				style : {
					height : "500px"
				}
			},
			events: {
				load: function() {
					
				}
			}
		},
		title : {
			text : '',
			align: "center",
			verticalAlign: "top",
			margin: 0,
			//floating: true,
			style: {
				color: '#333333',
	        	fontSize: '14px',
	        	fontWeight: '700',
	        	fontFamily: 'NanumSquare',
	        	fontStyle: 'none',
	        	textTransform: 'none'
			}
		},
		exporting : {
			enabled : false
		},
		credits : {
			enabled : false
		},
		legend : {
			enabled : false
		},
		xAxis : {
			categories : (function () {
				var sggCategories_ = sggCategories.slice();
				/*
				$.each(sggCategories_, function(i, v){
					sggCategories_[i] = v.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
					.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
				});
				*/
				return sggCategories_;
			})()
		},
		yAxis : {
			title : {
				enabled : false
			},
			labels : {
				enabled : false
			},
			gridLineWidth : 0,
			plotLines : [ {
				color : "#FF0000",
				width : 2,
				value : (function () {
					var avg = curTot1 / sggValues.length;
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
									series, ["시군구 평균", this.options.value.toFixed(2)]
							),
							normalizedEvent = chart.pointer.normalize(e);
			              
						point.tooltipPos = [
							normalizedEvent.chartX - chart.plotLeft,
							normalizedEvent.chartY - chart.plotTop
						];
						
						$(e.currentTarget).css({ "stroke": "rgba(255, 120, 50, 0.8)", "stroke-width": "4px" });
			
						tooltip.refresh(point);
			        },
			        mouseout: function(e) {
			        	this.axis.chart.tooltip.hide();
			        	$(e.currentTarget).css({ "stroke": "#FF0000", "stroke-width": "2px" });
			        }
				}
			} ],
		},
		tooltip : {
			useHTML : true,
			headerFormat : '',
			//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
			formatter: function(e) {
				befYear = parseInt(year)-1, incDecStr = ""; 
				var polygonSelectArea = "";
				//if($administStatsMap.ui.curMapId == 0){
				//if(mapId == 0){
				if($(e.chart.renderTo).attr('id') == "chart_local"){
					polygonSelectArea = $houseDash.polygonSelectArea;
					totDt = 0;
					incDec = 0;
					befDt = [];
					befYearSum = 0;
					curYearSum = 0;
					$administStatsMap.ui.curMapId = 0;
				//}else if($administStatsMap.ui.curMapId == 1){
				//}else if(mapId == 1){
				}else if($(e.chart.renderTo).attr('id') == "chart_local1"){
					polygonSelectArea = $houseDash.polygonSelectArea1;
					totDt1 = 0;
					incDec1 = 0;
					befDt1 = [];
					befYearSum1 = 0;
					curYearSum1 = 0;
					$administStatsMap.ui.curMapId = 1;
				}
				
				for(var i=0; i<chartData[sido_cd].length; i++) {
					if(chartData[sido_cd][i].PRD_DE == befYear) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							let setChrItmId = Object.keys(chartMeta)[j];
							let areaNm = chartData[sido_cd][i].ADM_KOR.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
								.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
							if(tblId == "DT_1NW1001") {								
								if(setChrItmId == "T10") {
									if(chartMeta[setChrItmId].var_ord == 0) {
										if($houseDash.chartItmClick != "") {
											if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick
													&& this.key == chartData[sido_cd][i].ADM_KOR) {
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										} else {
											if(chartData[sido_cd][i].CHAR_ITM_ID == "T10"
													&& this.key == chartData[sido_cd][i].ADM_KOR) {
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										}										
									} else {
										if($houseDash.chartItmClick != "") {
											if(chartData[sido_cd][i].CHAR_ITM_ID == "T10"
												&& chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].var_ord+"_ID"] == $houseDash.chartItmClick
												&& chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].var_ord+"_KOR"] == chartMeta[setChrItmId].scr_kor
												&& this.key == chartData[sido_cd][i].ADM_KOR) {
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										} else {
											if(chartData[sido_cd][i].CHAR_ITM_ID == "T10"
												&& chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor
												&& this.key == chartData[sido_cd][i].ADM_KOR) {
												if($administStatsMap.ui.curMapId == 0){
													totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt.push(chartData[sido_cd][i]);
												}else if($administStatsMap.ui.curMapId == 1){
													totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
													befDt1.push(chartData[sido_cd][i]);
												}
											}
										}										
									}
								}
							} else {
								if(chartMeta[setChrItmId].var_ord == 0) {
									if($houseDash.chartItmClick != "") {
										if(chartData[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick
											&& this.key == chartData[sido_cd][i].ADM_KOR
											&& chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor) {
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									} else {
										if(this.key == chartData[sido_cd][i].ADM_KOR
											&& chartData[sido_cd][i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor) {
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}									
								} else {
									if($houseDash.chartItmClick != "") {
										if(chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].var_ord+"_ID"] == $houseDash.chartItmClick
												&& chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].var_ord+"_KOR"] == chartMeta[setChrItmId].scr_kor 
												&& this.key == chartData[sido_cd][i].ADM_KOR) {
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									} else {
										if(chartData[sido_cd][i]["OV_L"+chartMeta[setChrItmId].var_ord+"_KOR"] == chartMeta[setChrItmId].scr_kor
											&& this.key == chartData[sido_cd][i].ADM_KOR) {
											if($administStatsMap.ui.curMapId == 0){
												totDt += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt.push(chartData[sido_cd][i]);
											}else if($administStatsMap.ui.curMapId == 1){
												totDt1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
												befDt1.push(chartData[sido_cd][i]);
											}
										}
									}									
								}
							}
						}
						if($administStatsMap.ui.curMapId == 0){
							befYearSum += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}else if($administStatsMap.ui.curMapId == 1){
							befYearSum1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}
					} else {
						if($administStatsMap.ui.curMapId == 0){
							curYearSum += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}else if($administStatsMap.ui.curMapId == 1){
							curYearSum1 += parseInt(chartData[sido_cd][i].DTVAL_CO);
						}
					}
				}
				
				var incDec_ = 0;
				if($administStatsMap.ui.curMapId == 0){
					incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
					incDec_ = incDec;
					if(befDt.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
				}else if($administStatsMap.ui.curMapId == 1){
					incDec1 = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
					incDec_ = incDec1;
					if(befDt1.length > 0) {
							//if(incDec < 0) {
							if(incDec_ < 0) {
								//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
								incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
							//} else if(incDec > 0) {
							} else if(incDec_ > 0) {
								//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
								incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
							} else {
								incDecStr = "변동 없음";
							}
						} else {
							incDecStr = "전년도 자료 없음";
						}
				}
				//incDec = ((totDt-this.y) / totDt * 100).toFixed(2);
				
				/*if(befDt.length > 0) {
					//if(incDec < 0) {
					if(incDec_ < 0) {
						//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
					//} else if(incDec > 0) {
					} else if(incDec_ > 0) {
						//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
				} else {
					incDecStr = "전년도 자료 없음";
				}*/
				
				if(this.key.indexOf("평균") != -1) {
					//let avgIncDec = ((befYearSum-curYearSum) / befYearSum * 100).toFixed(2), avgIncDecStr = "";
					let avgIncDec = 0, avgIncDecStr = "";
					if($administStatsMap.ui.curMapId == 0){
						avgIncDec = ((befYearSum-curYearSum) / befYearSum * 100).toFixed(2);
						if(befYearSum != 0) {
							if(avgIncDec < 0) {
								avgIncDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(avgIncDec) + "% 증가</span>";
							} else if(avgIncDec > 0) {
								avgIncDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(avgIncDec) + "% 감소</span>";
							} else {
								avgIncDecStr = "변동 없음";
							}
						} else {
							avgIncDecStr = "전년도 자료 없음";
						}
					}else if($administStatsMap.ui.curMapId == 1){
						avgIncDec = ((befYearSum1-curYearSum1) / befYearSum1 * 100).toFixed(2);
						if(befYearSum1 != 0) {
							if(avgIncDec < 0) {
								avgIncDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(avgIncDec) + "% 증가</span>";
							} else if(avgIncDec > 0) {
								avgIncDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(avgIncDec) + "% 감소</span>";
							} else {
								avgIncDecStr = "변동 없음";
							}
						} else {
							avgIncDecStr = "전년도 자료 없음";
						}
					}
					
					
					return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>' +
					'<br/>' + avgIncDecStr;
				} else{
					if(this.y <= 3) {
						return '<b>' + this.key + '</b><br/><b>' + "x" + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>' +
						'<br/>' + incDecStr;
					} else {
						return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>' +
						'<br/>' + incDecStr;
					}
				}				
			},
			footerFormat : ''
		},
		colors : [ {
			linearGradient : {
				x1 : 0,
				y1 : 0,
				x2 : 0,
				y2 : 1
			},
			stops : [ [ 0, "#39B3B8" ], [ 1, "#3A8BC3" ] ]
		} ],
		plotOptions : {
			series : {
				cursor : 'pointer',
				borderRadius : 5
			},
	        column: {
	            states : {
	            	select : {
	            		color : "#FF0000"
	            	}
	            },
	            events : {
	            	click : function() {
	            		//$administStatsMap.ui.map.setPolyLayerHighlight(this.chart.hoverPoint.id);
	            		//$administStatsMap.ui.mapList[1].setPolyLayerHighlight(this.chart.hoverPoint.id);
					}
	            },			
	        }
		},
		series : [{
			name : localSerieName,
			data : sggValues
		}]
	});
	
	$administStatsMain.ui.chart.push( charts );
		
	if($("#mapRgn_2").is(":visible")){
		if(mapId == "" && ($houseDash.polygonSelectArea.length != $houseDash.polygonSelectArea1.length)){
			if($houseDash.polygonSelectArea1.length == 5){
				drawChartsSgg2(chart_ord, $houseDash.polygonSelectArea1.substring(0, 2), $houseDash.polygonSelectArea1.substring(2, 5), year);
			}else{
				drawCharts2(chart_ord, $houseDash.polygonSelectArea1, '', year);
			}
		}
	}
}

var drawChartsSgg3 = function(chart_ord ,code, sgg_cd, year) {
	// 차트 구성 하기위한 메타
	// 차트 구성 하기위한 메타
	if($houseDash.timeLineChartItmClick != "") {
		year = $houseDash.timeLineChartItmClick;
	}
	var chartMeta = {};
	var notUsedChartMeta = {};
	var isBigItem = false;
    for(var i =0; i<chartInfo[chart_ord].length; i++){
    	if(chartInfo[chart_ord][i].disp_obj_var_id == chartInfo[chart_ord][i].obj_var_id){
    		if(chartInfo[chart_ord][i].disp_obj_var_id == '13999001'){
    			isBigItem = true;
    		}
    		// 차트 그릴때 필요한 값들 여기서 추가
    		chartMeta[(chartInfo[chart_ord][i].itm_id)] = {
    				kosis_unit : chartInfo[chart_ord][i].kosis_unit,
    				kosis_unit_nm : chartInfo[chart_ord][i].kosis_unit_nm,
    				disp_unit_nm : chartInfo[chart_ord][i].disp_unit_nm,
    				disp_obj_var_id : chartInfo[chart_ord][i].disp_obj_var_id,
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				disp_var_ord : chartInfo[chart_ord][i].disp_var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor,
    				region_var_ord : chartInfo[chart_ord][i].region_var_ord
    		}
    	} else {
    		notUsedChartMeta[(chartInfo[chart_ord][i].itm_id)] = {
    				kosis_unit : chartInfo[chart_ord][i].kosis_unit,
    				kosis_unit_nm : chartInfo[chart_ord][i].kosis_unit_nm,
    				disp_unit_nm : chartInfo[chart_ord][i].disp_unit_nm,
    				disp_obj_var_id : chartInfo[chart_ord][i].disp_obj_var_id,
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				disp_var_ord : chartInfo[chart_ord][i].disp_var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor,
    				region_var_ord : chartInfo[chart_ord][i].region_var_ord
    		}
    	}
    }
	
	var polygonSelectArea = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
	}
	//if(searchGubun != "" && sido_cd == "00"){

	if(polygonSelectArea == ""){
		polygonSelectArea = "00";
	}else{
		polygonSelectArea = searchGubun + polygonSelectArea;
	}

	var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
	
	// 가공한 차트 데이터
	var series = []
	if(isBigItem){
		// 대분류만 사용
		var data = [];
		year = $administStatsMain.ui.selectedYear;
		for(var j in chartMeta){
			var regionCol = "OV_L" + chartMeta[j].region_var_ord + "_ID";
        	for(var k = 0; k < chartDataYear[sido_cd].length; k++){
	       	    if(chartDataYear[sido_cd][k][regionCol] == code && chartDataYear[sido_cd][k].CHAR_ITM_ID == j){
       			    data.push({
       			        name : chartMeta[j].scr_kor,
		    	        y : parseFloat(chartDataYear[sido_cd][k].DTVAL_CO),
		                id : j
		    	    });
	       	    }
        	}
        }
		var altrtv_disp_wrd ='';
		for(var j =0; j < chartInfo[chart_ord].length; j++){
            altrtv_disp_wrd = chartInfo[chart_ord][0].chart_nm;
		}
		var seriesData = {
            name : altrtv_disp_wrd,
            data : data
		};
		series.push(seriesData);
	} else {
		// 대분류 중분류 모두 사용
		// 차트 데이터 가공
		for(var i =0; i < itm_id_list.length; i++){
			var data = [];
	        for(var j in chartMeta){
	        	var regionCol = "OV_L" + chartMeta[j].region_var_ord + "_ID";
	        	for(var k = 0; k < chartDataYear[sido_cd].length; k++){
		       	    //if(chartDataYear[sido_cd][k].ADM_CD == code && j == chartDataYear[sido_cd][k]['OV_L'+chartMeta[j].var_ord+'_ID'] 
		       	    if(chartDataYear[sido_cd][k][regionCol] == code && j == chartDataYear[sido_cd][k]['OV_L'+chartMeta[j].var_ord+'_ID'] 
		       	    	&& chartDataYear[sido_cd][k].CHAR_ITM_ID == itm_id_list[i]){
	       			    data.push({
	       			        name : chartMeta[j].scr_kor,
			    	        y : parseFloat(chartDataYear[sido_cd][k].DTVAL_CO),
			    	        id : j
			    	    });
		       	    }
	        	}
	        }
			var altrtv_disp_wrd ='';
			for(var j =0; j < chartInfo[chart_ord].length; j++){
				if(itm_id_list[i] == chartInfo[chart_ord][j].itm_id){
					altrtv_disp_wrd = chartInfo[chart_ord][j].altrtv_disp_wrd
					break;
				}
			}
			var seriesData = {
	            name : altrtv_disp_wrd,
	            data : data,
	            id : itm_id_list[i]
			};
			series.push(seriesData);
		}
	}
	
	/*
	var unitChangeEvent = function(e) {
		generateCharts(chart_ord ,code, year, e.point.id);
		if(code == "00"){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기	
		//}else if(chkRegionEnd == '시군구'){
		}else if(chkRegionEnd == '시군구' && chartMode == 'sgg'){
			$administStatsMap.ui.drawMapData("sgg", "color", code); // 맵 그리기
		}
	}
	*/
	
	// 시계열에서 지역 이름 변경.
	//$("#selected_local_name").text(selected_sido_name);
	
	var polygonSelectArea = "";
	if($administStatsMap.ui.curMapId == 0){
		polygonSelectArea = $houseDash.polygonSelectArea
	}else if($administStatsMap.ui.curMapId == 1){
		polygonSelectArea = $houseDash.polygonSelectArea1;
	}
	
	//if(searchGubun != "" && sido_cd == "00"){

	if(polygonSelectArea == ""){
		polygonSelectArea = "00";
	}else{
		polygonSelectArea = searchGubun + polygonSelectArea;
	}

	var sido_cd = polygonSelectArea == "" ? "00" : polygonSelectArea;
	
	// 시계열은 chartData가 아닌 chartDataYear 사용
	var yearData = {};
	var ord = chartMeta[Object.keys(chartMeta)[0]].var_ord;
	var regionCol = "OV_L" + chartMeta[Object.keys(chartMeta)[0]].region_var_ord + "_ID";
	for(var i =0; i<chartDataYear[sido_cd].length;i++){
		//if($houseDash.polygonSelectArea != "") {
		if(polygonSelectArea != "") {
			//if(chartDataYear[sido_cd][i][regionCol] == $houseDash.polygonSelectArea) {
			if(chartDataYear[sido_cd][i][regionCol] == polygonSelectArea) {
				if(tblId == "DT_1NW1001") {
					if(ord == "0") {
						if($houseDash.chartItmClick != "") {				
							if(chartDataYear[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick) {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	} else {
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	}
							}
						} else {
							if(chartDataYear[sido_cd][i].CHAR_ITM_ID == "T10") {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	} else {
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	}
							}
						}
					} else {
						if($houseDash.chartItmClick != "") {				
							if(chartDataYear[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	} else {
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	}
							}
						} else {
							if(chartDataYear[sido_cd][i].CHAR_ITM_ID == "T10") {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	} else {
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	}
							}
						}
					}			
				} else {
					if(ord == "0") {
						if($houseDash.chartItmClick != "") {
							if(chartDataYear[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick) {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	} else {
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	}
							}
						} else {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    	} else {
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    	}
						}
					} else {
						if($houseDash.chartItmClick != "") {
							if(chartDataYear[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	} else {
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    	}
							}
						} else {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    	} else {
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    	}
						}
					}
				}
			}
		} else {
			if(tblId == "DT_1NW1001") {
				if(ord == "0") {
					if($houseDash.chartItmClick != "") {				
						if(chartDataYear[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick
								&& chartDataYear[sido_cd][i][regionCol] == code) {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	} else {
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	}
						}
					} else {
						if(chartDataYear[sido_cd][i].CHAR_ITM_ID == "T10" 
								&& chartDataYear[sido_cd][i][regionCol] == code) {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	} else {
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	}
						}
					}
				} else {
					if($houseDash.chartItmClick != "") {
						if(chartDataYear[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick) {
							if(chartDataYear[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick
									&& chartDataYear[sido_cd][i][regionCol] == code) {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
						    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    		}
						    	} else {
						    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
						    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    		}
						    	}
							}
						}
					} else {
						if(chartDataYear[sido_cd][i].CHAR_ITM_ID == "T10" 
								&& chartDataYear[sido_cd][i][regionCol] == code) {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	} else {
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	}
						}
					}
				}			
			} else {
				if(ord == "0") {
					if($houseDash.chartItmClick != "") {
						if(chartDataYear[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick) {
							if(chartDataYear[sido_cd][i][regionCol] == code 
									&& chartDataYear[sido_cd][i].CHAR_ITM_ID == $houseDash.chartItmClick) {
								if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
						    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
						    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
						    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    		}
						    	} else {
						    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
						    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
						    		}
						    	}
							}
						}						
					} else {
						if(chartDataYear[sido_cd][i][regionCol] == code) {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	} else {
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	}
						}
					}
				} else {
					if($houseDash.chartItmClick != "") {
						if(chartDataYear[sido_cd][i][regionCol] == code 
								&& chartDataYear[sido_cd][i]["OV_L" + ord + "_ID"] == $houseDash.chartItmClick) {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	} else {
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	}
						}
					} else {
						if(chartDataYear[sido_cd][i][regionCol] == code) {
							if(yearData[chartDataYear[sido_cd][i].PRD_DE] == undefined){
					    		yearData[chartDataYear[sido_cd][i].PRD_DE] = 0;
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	} else {
					    		if(chartDataYear[sido_cd][i].DTVAL_CO != undefined) {
					    			yearData[chartDataYear[sido_cd][i].PRD_DE] += parseFloat(chartDataYear[sido_cd][i].DTVAL_CO);
					    		}
					    	}
						}
					}
				}
			}
		}
    }
	
	var yearCategories1 = [];
	var yearSeriesData1 = [];
	
	for(var i in yearData){
		yearCategories1.push(i);
		yearSeriesData1.push(yearData[i]);
	}
	yearCategories1Arr[polygonSelectArea] = yearCategories1;
	yearSeriesData1Arr[polygonSelectArea] = yearSeriesData1;
	
	let lPosX = 0, lPosY = 0;
	// 시계열 정보보기
	
	var mapId = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		$("#panel11").show();
		$(".pancon11").show();
		//$("#panel21").show();
		//$("#panel31").show();
		$("#panel41").show();
	}
	
	
	var seriesyearData = [];
	var categoriesyearData = [];
	var legendArr = {};
	
	if($houseDash.polygonSelectArea == "" || $houseDash.polygonSelectArea.length == 2){
		seriesyearData.push({
			name : chartInfo[chart_ord][0].altrtv_disp_wrd,
			color : "#050099",
			legendName : $houseDash.polygonSelectedAreaNm == "" ? "전국" : $houseDash.polygonSelectedAreaNm,
			data : yearSeriesDataArr[$houseDash.polygonSelectArea == "" ? "00" : $houseDash.polygonSelectArea]
		});	
		categoriesyearData.push(yearCategoriesArr[$houseDash.polygonSelectArea == "" ? "00" : $houseDash.polygonSelectArea]);
	}else if($houseDash.polygonSelectArea.length == 5){
		seriesyearData.push({
			name : chartInfo[chart_ord][0].altrtv_disp_wrd,
			color : "#050099",
			legendName : $houseDash.polygonSelectedAreaNm == "" ? "전국" : $houseDash.polygonSelectedAreaNm,
			data : yearSeriesData1Arr[$houseDash.polygonSelectArea == "" ? "00" : $houseDash.polygonSelectArea]
		});	
		categoriesyearData.push(yearCategories1Arr[$houseDash.polygonSelectArea == "" ? "00" : $houseDash.polygonSelectArea]);
	}
	if($("#mapRgn_2").is(":visible")){
		if($houseDash.polygonSelectArea != $houseDash.polygonSelectArea1){
			if($houseDash.polygonSelectArea1 == "" || $houseDash.polygonSelectArea1.length == 2){
				seriesyearData.push({
					name : chartInfo[chart_ord][0].altrtv_disp_wrd,
					color : "#0B610B",
					legendName : $houseDash.polygonSelectedAreaNm1 == "" ? "전국" : $houseDash.polygonSelectedAreaNm1,
					data : yearSeriesDataArr[$houseDash.polygonSelectArea1 == "" ? "00" : $houseDash.polygonSelectArea1]
				});	
				//categoriesyearData.push(yearCategoriesArr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]);
			}else if($houseDash.polygonSelectArea1.length == 5){
				seriesyearData.push({
					name : chartInfo[chart_ord][0].altrtv_disp_wrd,
					color : "#0B610B",
					legendName : $houseDash.polygonSelectedAreaNm1 == "" ? "전국" : $houseDash.polygonSelectedAreaNm1,
					data : yearSeriesData1Arr[$houseDash.polygonSelectArea1 == "" ? "00" : $houseDash.polygonSelectArea1]
				});	
				//categoriesyearData.push(yearCategories1Arr[$houseDash.polygonSelectArea1 == "" ? (searchGubun == "2" ? "000" : "00") : (searchGubun == "2" ? searchGubun + $houseDash.polygonSelectArea1 : $houseDash.polygonSelectArea1)]);
			}
		}
		legendArr = {
			//enabled : false
			align : "right",
			verticalAlign : "top",
			layout : "vertical",
			itemMarginTop : 2,
			itemMarginBottom : 2,
			labelFormatter : function() {
				return this.userOptions.legendName;
			}
		}
	}else{
		legendArr = {
			enabled : false
		}
	}
	//Highcharts.chart('chart_year'+mapId, {
	let charts = Highcharts.chart('chart_year', {
		chart : {
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
			type : 'area',
			events: {
				load: function() {
					var chart = this;					
					chart.series.forEach(function(series) {
						series.points.forEach(function(point) {
							if(lPosX == 0 || lPosY == 0) {
								if(point.dataLabel.x - lPosX > 0 && lPosY <= 15) {
									lPosX = point.dataLabel.x+point.dataLabel.width;
									lPosY = point.dataLabel.y+point.dataLabel.height;
								} else {
									point.dataLabel.translate(point.dataLabel.x, point.dataLabel.y + 20);									
								}
							} else {
								if(point.dataLabel.x - lPosX <= 0) {
									point.dataLabel.translate(point.dataLabel.x, point.dataLabel.y + 20);
									lPosX = 0, lPosY = 0;
								}
							}
						});
					});
				}
			}
		},
		xAxis: {
			categories: yearCategories1Arr[polygonSelectArea]
			//categories: categoriesyearData
		},
		yAxis : {
			title : {
				enabled : false
			},
			labels : {
				enabled : false
			},
			gridLineWidth : 0
		},
		title : {
			text : '',
			align: "center",
			verticalAlign: "top",
			margin: 0,
			//floating: true,
			style: {
				color: '#333333',
	        	fontSize: '14px',
	        	fontWeight: '700',
	        	fontFamily: 'NanumSquare',
	        	fontStyle: 'none',
	        	textTransform: 'none'
			}
		},
		exporting : {
			enabled : false
		},
		credits : {
			enabled : false
		},
		legend : legendArr,
		tooltip : {
			useHTML : true,
			headerFormat : '',
			//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
			formatter: function(e) {
				befYear = parseInt(this.key)-1, incDecStr = "", timeLineDt = []; 
				
				var polygonSelectArea = "";
				//if($administStatsMap.ui.curMapId == 0){
				if($(e.chart.container).parent().attr('id') == "chart_year"){
					polygonSelectArea = $houseDash.polygonSelectArea;
					totDt = 0;
					incDec = 0;
					$administStatsMap.ui.curMapId = 0;
				//}else if($administStatsMap.ui.curMapId == 1){
				}else if($(e.chart.container).parent().attr('id') == "chart_year1"){
					polygonSelectArea = $houseDash.polygonSelectArea1;
					totDt1 = 0;
					incDec1 = 0;
					$administStatsMap.ui.curMapId = 1;
				}
				
				for(var m = 0; m < yearCategories1Arr[polygonSelectArea].length; m++){
					if(yearCategories1Arr[polygonSelectArea][m] == befYear){
						if($administStatsMap.ui.curMapId == 0){
							totDt = yearSeriesData1Arr[polygonSelectArea][m];
						}else if($administStatsMap.ui.curMapId == 1){
							totDt1 = yearSeriesData1Arr[polygonSelectArea][m];
						}
					}
				}
				
				if($administStatsMap.ui.curMapId == 0){
					incDec_ = ((totDt-this.y) / totDt * 100).toFixed(2);
					if(((totDt-this.y) / totDt * 100) < 0) {
						//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
					} else if(((totDt-this.y) / totDt * 100) > 0) {
						//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
					
					if(totDt == 0){
						incDecStr = "전년도 자료 없음";
					}
				}else if($administStatsMap.ui.curMapId == 1){
					incDec_ = ((totDt1-this.y) / totDt1 * 100).toFixed(2);
					if(((totDt1-this.y) / totDt1 * 100) < 0) {
						//incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec_) + "% 증가</span>";
					} else if(((totDt1-this.y) / totDt1 * 100) > 0) {
						//incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec_) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
					
					if(totDt1 == 0){
						incDecStr = "전년도 자료 없음";
					}
				}
				
				
				
				
				return '<b>' + this.key + '</b>' +
					'<br/>' + incDecStr;
			},
			footerFormat : ''
		},
		plotOptions : {
			series : {
				color : "#4154C9",
				fillColor : {
					linearGradient : {
						x1 : 0,
						x2 : 0,
						y1 : 0,
						y2 : 1
					},
					stops : [ [ 0, 'rgba(202,240,255,0.5)' ], [ 1, 'rgba(255,255,255,0.5)' ] ]
				}
			},
			area: {
	            dataLabels: {
	                enabled: true,
	                formatter: function() {
	                	if(this.y <= 3) {
	                		return "x" + chartInfo[chart_ord][0].disp_unit_nm;
	                	} else {
	                		return numberFormat(this.y) + chartInfo[chart_ord][0].disp_unit_nm;
	                	}
	                },
	                allowOverlap: true
	            }
	        }
		},
		/*series : [{
			name : chartInfo[chart_ord][0].altrtv_disp_wrd,
			data : yearSeriesData1Arr[polygonSelectArea]
		}]*/
		series : seriesyearData
	});
	
	$administStatsMain.ui.chart["chartId"] = new Highcharts.Chart(charts);
	
	for(var i=0; i<$("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text").length; i++) {
		var yearStr = $("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text:eq(" + i + ")");
		if($houseDash.timeLineChartItmClick != "") {
			if(yearStr.text() == $houseDash.timeLineChartItmClick) {
				yearStr.css({"fill": "#ff0000", "font-weight" : "bold"});
			} else {
				yearStr.css({"fill": "#666666", "font-weight" : "normal", "cursor": "pointer"});
			}
		} else {
			if(yearStr.text() == year) {
				yearStr.css({"fill": "#ff0000", "font-weight" : "bold"});
			} else {
				yearStr.css({"fill": "#666666", "font-weight" : "normal", "cursor": "pointer"});
			}
		}		
	}
	
	$("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text").on("click", function() {
		for(var i=0; i<$("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text").length; i++) {
			var yearStr = $("#chart_year .highcharts-axis-labels.highcharts-xaxis-labels text:eq(" + i + ")");
			if(yearStr.text() == $(this).text()) {
				yearStr.css({"fill": "#ff0000", "font-weight" : "bold"});
			} else {
				yearStr.css({"fill": "#666666", "font-weight" : "normal", "cursor": "pointer"});
			}		
		}
		
		if($("#modalSearchTitle option:selected").text().length > 20) {
			$('.pancon1'+mapId+'h').text($(this).text() +'년 ' + $("#modalSearchTitle option:selected").text());
		} else {
			$('.pancon1'+mapId+'h').text($(this).text() +'년 ' + $("#modalSearchTitle option:selected").text());
		}		
		$('.pancon3'+mapId+'h').text('시계열 보기');
		//$('.pancon2'+mapId+'h').text($(this).text() + '년 지역별 비교 보기');
		//$('.pancon4'+mapId+'h').text($(this).text() +'년 지역별 데이터 보기');
		$('.pancon2'+mapId+'h').text('지역 비교 보기');
		$('.pancon4'+mapId+'h').text('표 보기');
		
		$houseDash.chartItmClick = "";
		$houseDash.chartItmClickName = "";
		
		var polygonSelectArea = "";
		if($administStatsMap.ui.curMapId == 0){
			polygonSelectArea = $houseDash.polygonSelectArea;
			$houseDash.polygonSelectedAreaNm = "";
			$houseDash.polygonSelectArea = "";
		}else if($administStatsMap.ui.curMapId == 1){
			polygonSelectArea = $houseDash.polygonSelectArea1;
			$houseDash.polygonSelectedAreaNm1 = "";
			$houseDash.polygonSelectArea1 = "";
		}
		
		$houseDash.timeLineChartItmClick = "";
		$administStatsMain.ui.selectedArea = "00";
		$(".selectedArea").remove();
		$('.city_select_sido').text(' 전체');
		$('.city_select').css('width','180px');
		$('.city_select button').remove();
		
		var chartOrd = $("#modalSearchTitle option:selected").val();
		var item_id = $("#modalSearchTitle option:selected").data('item_id');
		var regin_var_ord = $("#modalSearchTitle option:selected").data('region_var_ord');
		var obj_var_id = $("#modalSearchTitle option:selected").data('obj_var_id');
		var disp_obj_var_id = $("#modalSearchTitle option:selected").data('disp_obj_var_id');
		var var_ord = $("#modalSearchTitle option:selected").data('var_ord');

		var	region_code = '00';
		var sgg_code = '';

		getChartsData(chartOrd, $(this).text(), item_id, regin_var_ord, obj_var_id, disp_obj_var_id, var_ord, region_code, sgg_code, '');
		$("#modalSearchYear option[value=" + $(this).text() + "]")[0].selected = true;
		/*drawCharts1(chart_ord , "00", $(this).text());
		drawCharts2(chart_ord , "00", $(this).text());
		drawCharts3(chart_ord , "00", $(this).text());
		drawCharts4(chart_ord , "00", $(this).text());*/
		
		/*var selectedThema = $administStatsMain.ui.selectedThema;
		if(selectedThema == "신혼부부"){
			$newlyDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		//20201020 박은식 주택 분기 추가 START
		else if(selectedThema == "주택소유"){
			$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		//20201020 박은식 주택 분기 추가 END
		else if(selectedThema == "중장년층"){
			$middlDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		//20201022 박은식 귀농·귀어·귀촌, 통계더보기 분기처리 추가 START
		else if(selectedThema == "귀농·귀어·귀촌"){
			$retunDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}
		else if(selectedThema == "통계더보기"){
			$moresDash.event.allChange($administStatsMain.ui.selectedArea, "1");
		}*/

		if($administStatsMain.ui.selectedArea == "00"){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
		//} else if($administStatsMap.ui.mapToggleId != ""){
		} else if(($administStatsMap.ui.curMapId == 0 && $administStatsMap.ui.mapToggleId != "") || ($administStatsMap.ui.curMapid == 1 && $administStatsMap.ui.mapToggleId1 != "") ){
			$administStatsMap.ui.drawMapData("sido", "color"); // 맵 그리기
		} else {
			$administStatsMap.ui.drawMapData("sgg", "color"); // 맵
		}

		$houseDash.timeLineChartItmClick = $(this).text();
	});
}

var drawChartsSgg4 = function(chart_ord ,code, sgg_cd, year) {
	var tableTrColor = [
		'background-color: rgb(155, 155, 205);',
		'background-color: rgb(175, 175, 215);',
		'background-color: rgb(195, 195, 225);',
		'background-color: rgb(215, 215, 235);',
		'background-color: rgb(235, 235, 245);'
	]
	
	var polygonSelectArea = "";
	var polygonSelectedAreaNm = "";
	var mapId = "";
	if($administStatsMap.ui.curMapId == 0){
		mapId = "";
		polygonSelectArea = $houseDash.polygonSelectArea;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm;
		$("#position-name").text('시군구');
	}else if($administStatsMap.ui.curMapId == 1){
		mapId = "1";
		polygonSelectArea = $houseDash.polygonSelectArea1;
		polygonSelectedAreaNm = $houseDash.polygonSelectedAreaNm1;
		$("#position-name1").text('시군구');
	}
	
	//$("#mapRank").css('display', 'none');
	$("#mapRank").css('display', 'block');
	var atr_cd = "";
	
	// 표보기
	var table_text = '';
	table_text += '<div class="detail_Graph02 detailTable" id="PH0192Table" style="height:auto;">';
	table_text += '<div>';
	table_text += '<table style="width:100%;margin-bottom:20px;">';
	table_text += '<thead style="width:100%; display:table; box-sizing: border-box">';
	table_text += '<tr>';
	//table_text += '<th colspan="2" style="width:50%;">행정구역별</th>';
	table_text += '<th style="width:25%;">행정구역(1)</th>';
	//table_text += '<th style="width:25%;">' + year + '(' + chartInfo[chart_ord][0].disp_unit_nm + ')</th>';
	table_text += '<th style="width:25%;">행정구역(2)</th>';
	table_text += '<th style="width:25%;">' + $administStatsMain.ui.selectedYear +'(' + chartInfo[chart_ord][0].disp_unit_nm + ')</th>';
	//table_text += '<th>백분율(%)</th>';
	table_text += '</tr>';
	table_text += '</thead>';
	table_text += '<tbody style="width:100%; display:table; box-sizing: border-box;table-layout: fixed;">';
	table_text += '<tr>';
	table_text += '<td colspan="2" class="data_col" style="vertical-align: middle; width:50%; padding:5px;">전국</td>';
	let totSum1 = 0;
	for(var i=0;i<sggAllValues.length;i++){
		if(sggAllValues[i].id.substring(4, 5) != "0"){
			atr_cd = sggAllValues[i].id.substring(0, 4)+"0";
		}
		
		if(atr_cd == sggAllValues[i].id){
			continue;
		}
		totSum1 += sggAllValues[i].y;
		sggAllValuesDesc.unshift({
			y : sggAllValues[i].y,
			id : sggAllValues[i].id,
			sido_nm : sggAllValues[i].sido_nm,
			name : sggAllValues[i].name,
		});
	}
	table_text += '<td class="data_col" style="text-align: right; vertical-align: middle; width:25%; padding:5px;">' + numberFormat(totSum1) + '</td>';
	//table_text += '<td class="data_col" style="text-align: right; vertical-align: middle; width:35%; padding:5px;">' + numberFormat(curTot1) + '</td>';
	//table_text += '<td class="data_col" style="text-align: right; vertical-align: middle; padding:5px;">100%</td>';
	table_text += '</tr>';
	let elsSort = [];
	for(var i=0; i<originSggValues.length; i++) {
		elsSort.push(originSggValues[i].y);
	}
	
	elsSort.sort(function(a, b) {
		return b - a;
	})
	
	var sido_nm_ = "";
	
	/*
	if($("#mapRgn_2").is(":visible")){
		//var
		for(var i=0;i<originValues.length;i++){
			//if(originCategories[i] == $houseDash.polygonSelectedAreaNm) {
			if(originCategories[i] == polygonSelectedAreaNm) {
				table_text += '<tr style="border:7px #ff0000 solid" value="'+originValues[i].id+'">';
			}else if((originValues[i].id == $administStatsMap.ui.mapToggleId && $administStatsMap.ui.curMapId == 1) || (originValues[i].id == $administStatsMap.ui.mapToggleId1 && $administStatsMap.ui.curMapId == 0)) {
				table_text += '<tr style="border:7px #ff0000 solid" value="'+originValues[i].id+'">';
			} else {
				//table_text += '<tr value="'+elsValues[i].id+'">';
				table_text += '<tr value="'+originValues[i].id+'">';
			}		
			
			let color;
			for(var j=0; j<5; j++) {
				if(originValues[i].y == elsSort[j]) {
					color = tableTrColor[j];
				}
			}		
			
			table_text += '<td class="data_col" style="vertical-align: middle; width:25%; padding:5px;">'+originCategories[i]+'</td>';
			table_text += '<td class="data_col" style="text-align: right; width:25%; padding: 5px; ' + color + '">'+numberFormat(originValues[i].y)+'</td>';
			table_text += '<td class="data_col" style="text-align: right; padding: 5px; ' + color + '">'+(originValues[i].y/totSum*100).toFixed(2)+'%</td>';  
			table_text += '</tr>';
		}
		
	}else{
	*/
		//마지막 시도 데이터가 안나와서 수정
		//for(var i=0;i<elsCategories.length;i++){
		//for(var i=0;i<originSggValues.length;i++){
		for(var i=0;i<sggAllValues.length;i++){
			/*
			//if(originSggCategories[i] == $houseDash.polygonSelectedAreaNm) {
			if(originSggCategories[i] == polygonSelectedAreaNm) {
				table_text += '<tr style="border:7px #ff0000 solid" value="'+originSggValues[i].id+'">';
			}else if((originSggValues[i].id == $administStatsMap.ui.mapToggleId && $administStatsMap.ui.curMapId == 1) || (originSggValues[i].id == $administStatsMap.ui.mapToggleId1 && $administStatsMap.ui.curMapId == 0)) {
				table_text += '<tr style="border:7px #ff0000 solid" value="'+originSggValues[i].id+'">';
			} else {
				//table_text += '<tr value="'+elsSggValues[i].id+'">';
				table_text += '<tr value="'+originSggValues[i].id+'">';
			}*/		
			//table_text += '<tr value="'+elsSggValues[i].id+'">';
			//table_text += '<tr value="'+originSggValues[i].id+'">';
			table_text += '<tr value="'+sggAllValues[i].id+'">';
			
			let color;
			for(var j=0; j<5; j++) {
				if(sggAllValues[i].y == elsSort[j]) {
					color = tableTrColor[j];
				}
			}		
			//if(sido_nm_ != originSggValues[i].sido_nm){
			if(sido_nm_ != sggAllValues[i].sido_nm){
				//table_text += '<td rowspan="'+$administStatsMain.ui.areaSggData[$houseDash.polygonSelectArea.substring(0, 2)].length+'" class="data_col" style="vertical-align: middle; width:35%; padding:5px;">'+originSggValues[i].sido_nm+'</td>';
				//table_text += '<td rowspan="'+$administStatsMain.ui.areaSggData[polygonSelectArea.substring(0, 2)].length+'" class="data_col" style="vertical-align: middle; width:25%; padding:5px;">'+originSggValues[i].sido_nm+'</td>';
				table_text += '<td rowspan="'+sggData[sggAllValues[i].id.substring(0, 2)].length+'" class="data_col" style="vertical-align: middle; width:25%; padding:5px;">'+sggAllValues[i].sido_nm+'</td>';
			}
			if(sggAllValues[i].id.substring(4, 5) != "0"){
				atr_cd = sggAllValues[i].id.substring(0, 4)+"0";
			}
			
			if(atr_cd == sggAllValues[i].id){
				continue;
			}
			//if(originSggCategories[i] == $houseDash.polygonSelectedAreaNm) {
			//if(originSggCategories[i] == polygonSelectedAreaNm) {
			//if(originSggValues[i].id == polygonSelectArea.substring(2,5)) {
			if(sggAllValues[i].id == polygonSelectArea) {
				table_text += '<td style="border-left:7px #ff0000 solid; border-top:7px #ff0000 solid; border-bottom:7px #ff0000 solid; vertical-align: middle; width:25%; padding:5px;" class="data_col">'+sggAllCategories[i]+'</td>';
				table_text += '<td style="border-top:7px #ff0000 solid; border-bottom:7px #ff0000 solid; text-align: right; width:25%; padding: 5px; ' + color + '" class="data_col">'+numberFormat(sggAllValues[i].y <= 3 ? "x" : sggAllValues[i].y)+'</td>';
				//table_text += '<td style="border-right:7px #ff0000 solid; border-top:7px #ff0000 solid; border-bottom:7px #ff0000 solid; text-align: right; padding: 5px; ' + color + '" class="data_col">'+(sggAllValues[i].y/totSum1*100).toFixed(2)+'%</td>';
			//}else if((originSggValues[i].id == $administStatsMap.ui.mapToggleId && $administStatsMap.ui.curMapId == 1) || (originSggValues[i].id == $administStatsMap.ui.mapToggleId1 && $administStatsMap.ui.curMapId == 0)) {
			}else if((sggAllValues[i].id == $administStatsMap.ui.mapToggleId && $administStatsMap.ui.curMapId == 1) || (sggAllValues[i].id == $administStatsMap.ui.mapToggleId1 && $administStatsMap.ui.curMapId == 0)) {
				table_text += '<td style="border-left:7px #ff0000 solid; border-top:7px #ff0000 solid; border-bottom:7px #ff0000 solid; vertical-align: middle; width:25%; padding:5px;" class="data_col">'+sggAllCategories[i]+'</td>';
				table_text += '<td style="border-top:7px #ff0000 solid; border-bottom:7px #ff0000 solid; text-align: right; width:25%; padding: 5px; ' + color + '" class="data_col">'+numberFormat(sggAllValues[i].y <= 3 ? "x" : sggAllValues[i].y)+'</td>';
				//table_text += '<td style="border-right:7px #ff0000 solid; border-top:7px #ff0000 solid; border-bottom:7px #ff0000 solid; text-align: right; padding: 5px; ' + color + '" class="data_col">'+(sggAllValues[i].y/totSum1*100).toFixed(2)+'%</td>';
			}else{
				table_text += '<td class="data_col" style="vertical-align: middle; width:25%; padding:5px;">'+sggAllCategories[i]+'</td>';
				table_text += '<td class="data_col" style="text-align: right; width:25%; padding: 5px; ' + color + '">'+numberFormat(sggAllValues[i].y <= 3 ? "x" : sggAllValues[i].y)+'</td>';
				//table_text += '<td class="data_col" style="text-align: right; padding: 5px; ' + color + '">'+(originSggValues[i].y/totSum1*100).toFixed(2)+'%</td>';
			}
			table_text += '</tr>';
			sido_nm_ = sggAllValues[i].sido_nm;
		}
		
		
	//}

	table_text += '</tbody>';
	table_text += '</table>';
	table_text += '</div>';
	table_text += '</div>';
	
	$("#chart_table1").empty();
	$("#chart_table1").append(table_text);
	$('#panel41').css('display', 'block');
	
	if($("#mapRgn_2").is(":visible")){
		//$('#panel41').css('display', 'block');
	}else{
		
	}
	
	if($administStatsMap.ui.curMapId == 0){
		$houseDash.ponconText1 = table_text;
		if($houseDash.polygonSelectArea1 != '' && $houseDash.polygonSelectArea1 != null && $houseDash.polygonSelectArea1.length == 2){
			$("#chart_table").html($houseDash.ponconText);
			for(var i=0; i < $("#chart_table tbody tr").length; i++){
				if( $($("#chart_table tbody tr")[i]).attr('value') !=  $houseDash.polygonSelectArea1){
					$($("#chart_table tbody tr")[i]).attr('style', '');
				}else{
					$($("#chart_table tbody tr")[i]).attr('style', 'border:7px #ff0000 solid');
				}
			}
		}
	}else if($administStatsMap.ui.curMapId == 1){
		$houseDash.ponconText1 = table_text;
		if($houseDash.polygonSelectArea != '' && $houseDash.polygonSelectArea != null && $houseDash.polygonSelectArea.length == 2){
			$("#chart_table").html($houseDash.ponconText);
			for(var i=0; i < $("#chart_table tbody tr").length; i++){
				if( $($("#chart_table tbody tr")[i]).attr('value') !=  $houseDash.polygonSelectArea){
					$($("#chart_table tbody tr")[i]).attr('style', '');
				}else{
					$($("#chart_table tbody tr")[i]).attr('style', 'border:7px #ff0000 solid');
				}
			}
		}
	}
	
	if($("#mapRgn_2").is(":visible")){
		if(($administStatsMap.ui.mapToggleId.length == 2 && $administStatsMap.ui.mapToggleId1.length == 2) || 
		($administStatsMap.ui.mapToggleId.length == 2 && $administStatsMap.ui.mapToggleId1 == '') || 
		($administStatsMap.ui.mapToggleId == '' && $administStatsMap.ui.mapToggleId1.length == 2) || 
		($administStatsMap.ui.mapToggleId == '' && $administStatsMap.ui.mapToggleId1 == '') ){
			$("#panel3").show();
			$("#panel31").hide();
			$("#panel32").hide();
			$("#panel4").show();
			$("#panel41").hide();
		}else if(($administStatsMap.ui.mapToggleId.length == 5 && $administStatsMap.ui.mapToggleId1.length == 5)){
			$("#panel3").hide();
			$("#panel31").show();
			$("#panel32").show();
			$("#panel4").hide();
			$("#panel41").show();
		}else{
			$("#panel3").show();
			if($administStatsMap.ui.mapToggleId.length == 5){
				$("#panel31").show();
			}else if($administStatsMap.ui.mapToggleId1.length == 5){
				$("#panel32").show();
			}
			$("#panel4").show();
			$("#panel41").show();
			$("#chart_local").highcharts().series[0].data.forEach(function(bar) {
				var mid = "";
				if($administStatsMap.ui.curMapId == 0){
					mid = $administStatsMap.ui.mapToggleId1;
	    		}else if($administStatsMap.ui.curMapId == 1){
					mid = $administStatsMap.ui.mapToggleId;
	    		}
	    		if(bar.id == mid) {
	    			bar.select();
	    			bar.select();
    			}
	    	});
		}
	}else{
		if($administStatsMap.ui.mapToggleId.length == 2 || $administStatsMap.ui.mapToggleId == ''){
			$("#panel3").show();
			$("#panel31").hide();
			$("#panel32").hide();
			$("#panel4").show();
			$("#panel41").hide();
		}else if($administStatsMap.ui.mapToggleId.length == 5){
			$("#panel3").hide();
			$("#panel31").show();
			$("#panel32").hide();
			$("#panel4").hide();
			$("#panel41").show();
		}
	}
	
	//$('.modal-location').css('display', 'none');
	//	시군구 데이터는 지역범위 기능 제외
	//$(".modal-location").css('display', 'block');
	sidoNm = "";
	for(var a = 0; a < sggAllValuesDesc.length; a++){
		if(sggAllValuesDesc[a].id.substring(0, 2) == code){
			sggValuesDesc.unshift({
				y : sggAllValuesDesc[a].y,
				id : sggAllValuesDesc[a].id.substring(2,5),
				sido_nm : sggAllValuesDesc[a].sido_nm,
				name : sggAllValuesDesc[a].name,
			});
		}
	}
	sidoNm = sggValues[0].sido_nm;
	sggValuesDesc = sggValuesDesc.sort(function(a,b) {
		return parseFloat(b.y)-parseFloat(a.y);
	});
	//$("#RankArea").text('전국 시군구 '+sggValuesDesc.length+'개 중');
	/*$("#RankArea").text(sidoNm+' 시군구 '+sggValuesDesc.length+'개 중');
	$("#RankProgress").attr('max', sggValuesDesc.length).css('width', "170px");
	findRank(code+sgg_cd);*/
	
	if($('.pancon1').css('display') == 'none') $('.pancon1h').click();
	if($('.pancon2').css('display') == 'none') $('.pancon2h').click();
	if($('.pancon3').css('display') == 'none') $('.pancon3h').click();
	if($('.pancon4').css('display') == 'none') $('.pancon4h').click();
	if($('.pancon11').css('display') == 'none') $('.pancon11h').click();
	if($('.pancon21').css('display') == 'none') $('.pancon21h').click();
	if($('.pancon22').css('display') == 'none') $('.pancon22h').click();
	if($('.pancon31').css('display') == 'none') $('.pancon31h').click();
	if($('.pancon41').css('display') == 'none') $('.pancon41h').click();
	$administStatsMain.ui.loading(false);
}

/*var findRank = function(code) {
	var rank = 0;
	var name = "";
	if(code.length == 5){
		for(var i=0; i<sggValuesDesc.length; i++) {
			if(code.substring(2, 5) == sggValuesDesc[i].id){
				rank = i+1;
				name = sggValuesDesc[i].sido_nm + " " + sggValuesDesc[i].name;
			}
		}	
	}else if(code.length == 2){
		for(var i=0; i<sidoValuesDesc.length; i++) {
			if(code == sidoValuesDesc[i].id){
				rank = i+1;
				name = sidoValuesDesc[i].name;
			}
		}	
	}
	$("#RankProgress").attr('value', rank);
	$("#Rank").val(rank);
	$("#RankText").text(rank+"위");
	$("#area_name").text(name);
	return rank;
}*/

function extendChartStyle(target) {
	var chartStyle = {
		title : {
			text : ''
		},
		subtitle : {
			text : ''
		},
//		navigation : {
//			buttonOptions : {}
//		},
		exporting : {
			enabled : false,
//			buttons : {
//				contextButton : {
//					menuItems : [ {
//						textKey : 'printChart',
//						onclick : function() {
//							this.print();
//						}
//					}, {
//						separator : true
//					}, {
//						textKey : 'downloadPNG',
//						onclick : function() {
//							this.exportChart();
//						}
//					}, {
//						textKey : 'downloadJPEG',
//						onclick : function() {
//							this.exportChart({
//								type : 'image/jpeg'
//							});
//						}
//					}, {
//						separator : true
//					}, {
//						textKey : 'downloadPDF',
//						onclick : function() {
//							this.exportChart({
//								type : 'application/pdf'
//							});
//						}
//					}, {
//						textKey : 'downloadSVG',
//						onclick : function() {
//							this.exportChart({
//								type : 'image/svg+xml'
//							});
//						}
//					} ]
//				}
//			}
		},
		credits : {
			enabled : false
		},
		tooltip : {
			useHTML : true,
			style : {
				fontFamily : 'Noto saNs kR, sans-serif'
			}
		},
		series : [ {
			dataLabels : {
				style : {
					fontFamily : 'Noto saNs kR, sans-serif'
				},
				overflow: 'auto',
				crop: false
			}
		} ],
		xAxis : {
			title : {
				style : {
					fontFamily : 'Noto saNs kR, sans-serif'
				}
			},
			labels : {
				style : {
					fontFamily : 'Noto saNs kR, sans-serif'
				}
			}
		},
		yAxis : {
			title : {
				style : {
					fontFamily : 'Noto saNs kR, sans-serif'
				}
			},
			labels : {
				style : {
					fontFamily : 'Noto saNs kR, sans-serif'
				}
			}
		}
	};
	return $.extend(true, target, chartStyle);
}