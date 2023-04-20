/**
 * 총조사시각화 메인
 * 
 * history : 
 * 2020.08.04			총조사시각화 메인
 * 
 * 
 * author : 곽제욱
 * version : 1.0
 * see : 
 *
 */

//bndYear = "2018"; 

(function(W, D) {
	W.$populationTms = W.$populationTms || {};
	
	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$populationTms.isDev = true;
	/* 공공데이터 조회 변수*/
	$populationTms.org_id = "";
	$populationTms.tbl_id = "";
	$populationTms.kosis_data_item = "";
	$populationTms.kosis_data_period = "";
	$populationTms.kosis_data_year = "";
	$populationTms.gis_se = "";
	$populationTms.obj_var_id = "";
	$populationTms.field_id = "";
	$populationTms.kosis_data_item_detail = "";
	
	//현재 그려진 d3의 데이터를 담는 변수 start
	$populationTms.timeTotalPopulation = {};//총인구, rank Data
	$populationTms.timeForeignPopulation = {};// 외국인 Data
	$populationTms.timeGenderChangePopulation = {};// 남녀 성비 Data
	$populationTms.leftTimeGenderAgePopulation = {};// 연도별 남녀 연령별 인구 Data
	$populationTms.rightTimeGenderAgePopulation = {};// 연도별 남녀 연령별 인구 Data
	//현재 그려진 d3의 데이터를 담는 변수 end
	
	$populationTms.kosis_result_data = [];
		
	$(document).ready(function() {
		
	});
	
	//d3 반응형 이벤트
	$(window).resize( function(){
		console.log("resize")
		if($totSurvMain.ui.pageIndex == '12'){
			//총인구 차트
			timeTotalPopulationChart($populationTms.timeTotalPopulation, 'tiemTotalPopulationChart', 'Y', '150');
			
			//총인구 광역시도 중 랭킹 차트
			if($totSurvMain.ui.selectedArea != '00' && $totSurvMain.ui.selectedArea != '99'){
				timeRankChart($populationTms.timeTotalPopulation, 'timeRankPopulationChart', 'Y', '150');
			}
			
			
			//남녀 성비 비율 변화 차트
			timeTotalPopulationChart($populationTms.timeGenderChangePopulation,'tiemGenderPopulationChart','Y','150');
			
			//외국인 수 변화 차트
			timeSidoPopulationChart($populationTms.timeForeignPopulation, 'timeForeignPopulationChart', 'Y', '150');
			
			//연도별 남녀 연령 인구 table 및 차트
			if($("#rightTimeGenderAgePopulationChart").css("display") == "none"){
				$populationTms.ui.createAgeGenderTable($populationTms.rightTimeGenderAgePopulation, "rightTable");
			} else {
				timeGenderAgePopulationChart($populationTms.rightTimeGenderAgePopulation,'rightTimeGenderAgePopulationChart','Y','220');//20201028 박은식 높이수정
			}
			if($("#leftTimeGenderAgePopulationChart").css("display") == "none"){
				$populationTms.ui.createAgeGenderTable($populationTms.leftTimeGenderAgePopulation, "leftTable");
			} else {
				timeGenderAgePopulationChart($populationTms.leftTimeGenderAgePopulation,'leftTimeGenderAgePopulationChart','Y','220');//20201028 박은식 높이수정
			}
			
			// 맵 사이즈
			$('#mapRgn_1').width($("#mapArea").width());
			$('#mapRgn_2').width($("#mapArea2").width());	
				
			$(".btn_resultView").offset({top:301-$("#divContent").scrollTop(), left:$("#rightMapDiv").offset().left -60})
		}
	});
	
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {});

	$populationTms.const = {},
	
	$populationTms.ui = {
		selectedArea : '', // 선택한 지역
		//데이터
		totSurvInfoData : {}, // 총조사 시각화 정보 저장
		
		/**
		 * @name         : init 
		 * @description  : 최초 화면을 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		init : function(){
			//content 영역에 인총화면 추가
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/populationDash/tms");
		},
		
		ready : function(){
			$totSurvTmsMap.ui.createMap("mapRgn_1", 0);
			$totSurvTmsMap.ui.createMap("mapRgn_2", 1);
			
			// 최대 줌 레벨 설정
			// 2020-10-14 [주형식] 배주무관님 요청으로 최소 줌레벨 변경 START
			$totSurvTmsMap.ui.mapList[0].gMap.setMinZoom(0);
			$totSurvTmsMap.ui.mapList[1].gMap.setMinZoom(0);
			// 2020-10-14 [주형식] 배주무관님 요청으로 최소 줌레벨 변경 END
			$totSurvTmsMap.ui.mapList[0].gMap.setMaxZoom(7);
			$totSurvTmsMap.ui.mapList[1].gMap.setMaxZoom(7);
			
			// 년도 콤보박스 설정
			$populationTms.ui.searchTotSurvInfo();
			
			// 맵 기능 버튼 설정
			//$('#rExport').show();
			$('#rZoom').show();
			$('#rOut').show();
			
			// 년도별 지도 데이터를 조회		
			$totSurvMain.ui.rightSelectedYear = $('#selRightYear option:selected').val();
			$totSurvMain.ui.leftSelectedYear = $('#selLeftYear option:selected').val();
			
			$populationTms.ui.drawContent("PH0001", "T100", "", "left", $totSurvMain.ui.leftSelectedYear);			
			$populationTms.ui.drawContent("PH0001", "T100", "", "right", $totSurvMain.ui.rightSelectedYear);
			
			//20201012 박은식 융합보기 버튼 위치 조정 START
			$(".btn_resultView").offset({top:301-$("#divContent").scrollTop(), left:$("#rightMapDiv").offset().left -60})
			//20201012 박은식 융합보기 버튼 위치 조정 END
			
			// 2020-11-26 [곽제욱] setUiEvent 한번만 타도록 수정 START
			//$populationTms.event.setUIEvent(); 
			$populationTms.ui.searchData($("#selLeftYear").val(), $("#selRightYear").val());
			$populationTms.ui.searchTimeGenderAgeData($("#selLeftYear").val(), $("#selRightYear").val(), $totSurvMain.ui.selectedArea);
			$populationTms.ui.createAgeGenderTable($populationTms.rightTimeGenderAgePopulation, "rightTable");
			// 2020-11-26 [곽제욱] setUiEvent 한번만 타도록 수정 END
			//20201204 박은식 콤보박스 초기화 START
			$populationTms.ui.getAreaPopupSido("99");
			$populationTms.ui.getAreaPopupSgg("99", "999");
			//20201204 박은식 콤보박스 초기화 END
		},
		
		
		
		/**
		 * @name         : clear
		 * @description  : 인구총조사 depth 변화시마다 화면 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		clear : function(){
			// 연도별 총인구 차트 초기화
			$("#tiemTotalPopulationChart").empty();
			// 총인구 광역시도 중 랭킹 차트 초기화
			$("#timeRankPopulationChart").empty();
			// 남녀 성비 비율 번화 차트 초기화
			$("#tiemGenderPopulationChart").empty();
			// 외국인 수 변화 차트 초기화
			$("#timeForeignPopulationChart").empty();
			// 연도별 남녀 연령 인구 차트 초기화
			$("#timeGenderAgePopulationChart").empty();
		},
		
		//20201204 박은식 지역선택 팝업 로직 (콤보박스 시도 시군구 리스트 셋팅) START
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
			    	base_year:$("#leftYearBtn.YearBox.on").val()
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					//시도 목록 추가
					var lvResultList = res.result.sidoList;
					for(var i = 0; i < lvResultList.length; i++) {
						console.log(lvResultList[i].sido_cd)
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
			    	base_year:$("#leftYearBtn.YearBox.on").val(),
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
				//$totSurvMain.ui.loading(false);	// 로딩바
			});
			// ajax 끝
		},
		
//		/**
//		 * @name         : listCheckData
//		 * @description  : 체크박스 선택
//		 * @date         : 2020.10.06
//		 * @author	     : 한광희
//		 * @history 	 : 
//		 * @param
//		 * 	checkSurvDataId : 조사ID
//		 *  checkSurvDataNm : 통계명
//		 */
//		listCheckData : function(checkSurvDataId, checkSurvDataNm){
//			if(!$("#"+checkSurvDataId+"Tr").hasClass("on")){
//				// 차트 클릭 관련 초기화
//				$totSurvDetail.ui.chartSelectedItemClear();
//				
//				$totSurvDetailMap.ui.mapToggleId = "";	// 맵 선택된 정보 초기화
//				$("#totSurvDataList > tbody> tr").removeClass("on");
//				$totSurvDetail.ui.selectTotSurvDataList = []; 
//				
//				// 지역선택 팝업
//				$totSurvDetail.ui.getAreaPopupSido($("#detail_sido option:selected").val());
//				$totSurvDetail.ui.getAreaPopupSgg($("#detail_sido option:selected").val(), $("#detail_sgg option:selected").val());
//				
//				// 선택 항목 추가
//				$("#"+checkSurvDataId+"Tr").addClass("on");
//				$totSurvDetail.ui.selectTotSurvDataList.push(checkSurvDataId + '$' + checkSurvDataNm);
//				
//				// 조사표 조회
//				$totSurvMain.ui.loading(true);	// 로딩바
//				setTimeout(function() {
//					// 차트 데이터 초기화
//					$totSurvDetail.ui.chartDataClear();
//					// 선택한 항목 div 생성
//					$totSurvDetail.ui.createTotSurvDetailDiv();					
//				}, 100);				
//			}
//		},
		
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
		//20201204 박은식 지역선택 팝업 로직 (콤보박스 시도 시군구 리스트 셋팅) END
		drawContent : function(surv_id, itm_cd, c1, mapGbn, year){
			//alert("[drawContent] year = " + year);
			if($totSurvMain.ui.selectedArea=="00"){
				$totSurvTmsMapnoReverseGeoCode = true;

				if(surv_id == null|| surv_id == "" || surv_id == undefined){
					$totSurvTmsMap.ui.selectedSurvId = "PH0001"; // 인구같은경우 디폴트
				} else {
					$totSurvTmsMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트
					
				}
				
				if(itm_cd==null||itm_cd==""||itm_cd==undefined){
					$totSurvTmsMap.ui.selectedItmCd = "T100";
				} else {
					$totSurvTmsMap.ui.selectedItmCd = itm_cd;
				}

				$totSurvTmsMap.ui.selectedC1 = c1;
				$totSurvMain.ui.tileChangeYn = "N";
				
				if(mapGbn == "left"){
					$totSurvTmsMap.ui.drawMapData("sido", "color", "left", year); // 맵 그리기\
				}
				else if(mapGbn == "right"){
					$totSurvTmsMap.ui.drawMapData("sido", "color", "right", year); // 맵 그리기
				}
			/** 2020-10-07 [곽제욱] 맵토글에 따른 지역경계 그리기 변경 START */
			} else if ($totSurvMain.ui.selectedArea.length == 2){
				
				if($totSurvTmsMap.ui.mapToggleId != "" && $totSurvTmsMap.ui.mapToggleId != null){ // 2020-10-08 [곽제욱] 시계열 맵 토글 ID로 변경
					if(mapGbn == "left"){
						$totSurvTmsMap.ui.drawMapData("sido", "color", "left", year); // 맵 그리기\
					}
					else if(mapGbn == "right"){
						$totSurvTmsMap.ui.drawMapData("sido", "color", "right", year); // 맵 그리기
					}
				} else {
					if(mapGbn == "left"){
						$totSurvTmsMap.ui.drawMapData("sgg", "color", "left", year); // 맵
					}
					else if(mapGbn == "right"){
						$totSurvTmsMap.ui.drawMapData("sgg", "color", "right", year); // 맵
					}
				}
				
			} else {
				if(mapGbn == "left"){
					$totSurvTmsMap.ui.drawMapData("sgg", "color", "left", year); // 맵
				}
				else if(mapGbn == "right"){
					$totSurvTmsMap.ui.drawMapData("sgg", "color", "right", year); // 맵
				}
			}
			/** 2020-10-07 [곽제욱] 맵토글에 따른 지역경계 그리기 변경 END */
		},
		
		searchData : function(startYear, endYear){
			var regionCd = $totSurvMain.ui.selectedArea;
			if(regionCd==null || regionCd==undefined){
				regionCd = '99';
			}
			if($totSurvMain.ui.selectedYear != null && $totSurvMain.ui.selectedYear != ''){
				var year = $totSurvMain.ui.selectedYear;
			} else {
				var year = '2018'
			}
			
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/population/GetPopulationTmsChart.json",
				data: {startYear : startYear, endYear : endYear, region_cd : regionCd},
				dataType: "json",
				success: function(res) {
					
					console.log(res)
					if (res.errCd == "0") {
						$("#chartArea1").prop("disabled", false);
						$("#tableArea1").prop("disabled", false);
						$("#chartArea2").prop("disabled", false);
						$("#tableArea2").prop("disabled", false);
						$populationTms.timeTotalPopulation = res.result.timeTotalPopulation; //총인구, rank Data
						$populationTms.timeForeignPopulation = res.result.timeForeignPopulation; // 외국인 Data
						$populationTms.timeGenderChangePopulation = res.result.timeGenderChangePopulation; // 남녀 성비 비율 변화 Data
						
						timeTotalPopulationChart($populationTms.timeTotalPopulation, 'tiemTotalPopulationChart', 'N', '150');
						if($totSurvMain.ui.selectedArea != '00' && $totSurvMain.ui.selectedArea != '99'){
							timeRankChart($populationTms.timeTotalPopulation, 'timeRankPopulationChart', 'N', '150');
						} else {
							$("#timeRankPopulationChart").empty();
							//총인구 광역시도 중 랭킹 정보 전국일 경우 표출될 택스트 위치
							var sidoHtml = "";
							sidoHtml += "<div class='DataNone' id='timeRankPopulationChartNone'>";
							sidoHtml += "	<img src='/images/totSurv/locationclick.png' alt='지역을 선택하세요'>";
							sidoHtml += "	<p>지역을 선택하시면 차트가 표출됩니다.</p>";
							sidoHtml += "</div>";
							$("#timeRankPopulationChart").html(sidoHtml)
						}
						timeTotalPopulationChart($populationTms.timeGenderChangePopulation,'tiemGenderPopulationChart','N','150');
						timeSidoPopulationChart($populationTms.timeForeignPopulation, 'timeForeignPopulationChart', 'N', '150');
						if($totSurvMain.ui.selectedArea.length == 2){
							$("#rankChartTitle").text("총인구 광역시도 중 랭킹")
							$("#totalSgg").css("left", "140px")
							$("#totalSgg").attr("id", "totalSido")
						} else {
							$("#rankChartTitle").text("총인구 시군구 중 랭킹")
							$("#totalSido").css("left", "130px")
							$("#totalSido").attr("id", "totalSgg")
						}
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
		},
		
		/**
		 * 총조사 시각화 정보 조회
		 * year combobox 설정한다.
		 */
		searchTotSurvInfo : function(survId){
			
			if(survId == null) survId = "PH0001";

			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvInfo.json",
				data: {"survId": survId}, // 임시
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {						
						// 총조사시각화정보
						var totSurvInfo = res.result.totSurvInfo;
						$populationTms.ui.totSurvInfoData = totSurvInfo;
						 
						// 콤보박스 정보 설정
						setYearCombox(totSurvInfo);
					}
				},
				error: function(e) {
					alert('failed');
				} 
			});
		},
		
		/**
		 * 
		 * @name         : searchTimeGenderAgeData
		 * @description  : 연도별 성별 연령 인구 조회
		 * @date         : 2020. 09. 21
		 * @author	     : 박은식
		 * @history 	 :
		 * @param leftYear: 왼쪽 지도의 year
		 * 		 rightYear: 오른쪽 지도의 year
		 * 		  regionCd: 지역 코드
		 */	
		searchTimeGenderAgeData : function(leftYear, rightYear, regionCd){
			var param = {};
			if(leftYear != null && leftYear != "" && rightYear != null && rightYear != ""){// 첫 진입 시
				param = {leftYear: leftYear, rightYear : rightYear, region_cd : regionCd}
			} else if(leftYear != null && leftYear != ""){// 왼쪽지도의 년도가 변경된 경우
				param = {leftYear: leftYear, region_cd : regionCd}
			} else if(rightYear != null && rightYear != ""){// 오른쪽 지도의 년도가 변경된 경우
				param = { rightYear : rightYear, region_cd : regionCd}
			}
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/population/GetPopulationTmsChart.json",
				data: param, 
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						if(res.result.leftTimeGenderAgePopulation != undefined){
							$populationTms.leftTimeGenderAgePopulation = res.result.leftTimeGenderAgePopulation;
							timeGenderAgePopulationChart($populationTms.leftTimeGenderAgePopulation,'leftTimeGenderAgePopulationChart','N','220');//20201028 박은식 높이수정
						}
						if(res.result.rightTimeGenderAgePopulation != undefined){
							$populationTms.rightTimeGenderAgePopulation = res.result.rightTimeGenderAgePopulation;
							timeGenderAgePopulationChart($populationTms.rightTimeGenderAgePopulation,'rightTimeGenderAgePopulationChart','N','220');//20201028 박은식 높이수정
						}
						if($totSurvMain.ui.selectedArea.length == 2){
							$("#rankChartTitle").text("총인구 광역시도 중 랭킹")
							$("#totalSgg").css("left", "140px")
							$("#totalSgg").attr("id", "totalSido")
						} else {
							$("#rankChartTitle").text("총인구 시군구 중 랭킹")
							$("#totalSido").css("left", "130px")
							$("#totalSido").attr("id", "totalSgg")
						}
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
		},
		
		/**
		 * 
		 * @name         : createAgeGenderTable
		 * @description  : 테이블 생성
		 * @date         : 2020. 09. 21
		 * @author	     : 박은식
		 * @history 	 :
		 * @param 	 data: table 생성 data
		 * 		   target: table을 append 시킬 대상(id)
		 */	
		createAgeGenderTable : function(data, target){
			$("#"+target).empty();

			var max = d3.max(data, function(d){ return (Number(d.males)+Number(d.females))});
			var min = d3.min(data, function(d){ return (Number(d.males)+Number(d.females))});
			
			
			
			var html ="";
			html += "<div>"
			html += "	<table style='width: 100%;'>";
			html += "		<thead style='width:100%; display:inline-table; box-sizing: border-box'>"; /*2020.09.22[신예리] width값 영역에 맞게 100%로 변경*/
			html += "			<tr>";
			html += "				<th rowspan='2' style=''>지역</th>";
			html += "				<th rowspan='2' style='width:25%'>나이</th>";
			html += "				<th colspan='2' style='width:50%; border-bottom: 1px solid #fff;'>성별("+data[0].surv_year+")</th>";
			html += "			</tr>";
			html += "			<tr>";
			html += "				<th>남</th>";
			html += "				<th>여</th>";
			html += "			</tr>";
			html += "		</thead>";
			html += "		<tbody style='width:100%; display:inline-table; box-sizing: border-box'>"; /*2020.09.22[신예리] width값 영역에 맞게 100%로 변경*/
			for(var i=0; i < data.length; i++){
				var j = 0;
				var highlight = "";
				if(Number(data[i].males) + Number(data[i].females) == max){
					highlight = "data_col max";
				}else if(Number(data[i].males) + Number(data[i].females) == min){
					highlight = "data_col min";
				}else{
					highlight = "data_col"
				}

				
				html += "			<tr>";
				if(i == 0){
					html += "				<td class='table_area' style='vertical-align: baseline;' rowspan='"+data.length+"' style='width:25%'>"+data[0].region_nm+"</td>"
				}
				html += "				<td class='"+highlight+"' style='width:25%'>"+ data[i].age +"</td>";	
				if(isNaN(data[i].males)){
					html += "				<td class='"+highlight+"' style='width:25%; text-align:right;'> - </td>";	
				} else {
					html += "				<td class='"+highlight+"' style='width:25%; text-align:right;'>"+ data[i].males.replace(/\B(?=(\d{3})+(?!\d))/g,",") + " 명</td>";
				}
				if(isNaN(data[i].females)){
					html += "				<td class='"+highlight+"' style='width:25%; text-align:right;'> - </td>";
				} else {
					html += "				<td class='"+highlight+"' style='width:25%; text-align:right;'>"+ data[i].females.replace(/\B(?=(\d{3})+(?!\d))/g,",") + " 명</td>";
				}
				html += "			</tr>";
			}
			html += "		</tbody>";
			html += "	</table>";
			html += "</div>"
			$("#"+target).append(html);
			$(".table_area, .data_col").css("border", "1px solid #ddd");
			$(".max").css("background-color", "#B4E9F0")
			$(".min").css("background-color", "#FACDCD")
			
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
        	if($totSurvMap.ui.chartToggleYn=="N"){
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
		 * @date         : 2020. 09. 21
		 * @author	     : 곽제욱
		 * @history 	 :
		 */
		chartMouseOut : function(obj, color){
			if($totSurvMap.ui.selectedObj[0] != obj[0]){
	    		if($totSurvMap.ui.chartToggleYn == "Y"){
	    			obj.attr("fill", $totSurvMain.ui.tempColor); // 2020-12-07 [곽제욱] mouseOut 로직 변경
	    		} else {
	    			obj.attr("fill", $totSurvMain.ui.selectedTempColor); // 2020-12-07 [곽제욱] mouseOut 로직 변경
	    		}
	    	} else if($totSurvMap.ui.selectedObj[0] == obj[0]){ // 2020-12-07 [곽제욱] mouseOut 로직 변경
	    		obj.attr("fill", color);
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
			target.css("display", "inline-block");
			target.css("position", "absolute");
			target.css("font-family", "NanumSquare")
			target.css("z-index", "5000");
			target.css("background-color", "rgb(255, 255, 255)")
			target.css("border", "1px solid #cecece")
			target.css("border-radius", "5px")
			target.css("padding", "10px")
			target.css("text-align", "center")
			target.css("left", d3.event.pageX + x + "px")
			target.css("top", d3.event.pageY + y + "px")
			target.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year + "년 "+ title.replace('(명)', '').replace('-', ' ').replace('_', ' ') + standard + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>" + data + "</p>" + unit);
		}
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
	function getKosisDetailOption(totSurvInfo){
		
		var title = totSurvInfo[0].surv_nm;
		var gis_se = "";
		if(totSurvInfo[0].region_ctgry_end == "시도"){
			gis_se = 1;
		}
		else if(totSurvInfo[0].region_ctgry_end == "시군구"){
			gis_se = 2;
		}
		else if(totSurvInfo[0].region_ctgry_end == "읍면동"){
			gis_se = 3;
		}
			
		var surv_url = totSurvInfo[0].surv_url;
		var tmp = surv_url.split("=");
		
		$populationTms.org_id = tmp[1].split("&")[0];
		$populationTms.tbl_id = tmp[2].split("&")[0];
		
		if(!$populationTms.isDev){
			
			var kosisDetailOption = new kosis.serviceApi.kosisDetailOption.api();
			kosisDetailOption.addParam("org_id", $populationTms.org_id);
			kosisDetailOption.addParam("list_id", $populationTms.tbl_id);
			
			kosisDetailOption.addParam("title", decodeURI( title ));
			kosisDetailOption.addParam("gis_se", gis_se);
			
			kosisDetailOption.request({
				method : "GET",
				async : false,
				url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do",
			
				options : totSurvInfo
			});		
		}
		else{
			//url 파라미터 세팅
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do";
			lv_url += "?org_id="+ $populationTms.org_id;
			lv_url += "&list_id="+ $populationTms.tbl_id;
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
				
				$populationTms.obj_var_id = resultData[0].obj_var_id;
				$populationTms.field_id = resultData[0].field_id;
				
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
		
		//var map = $totSurvTmsMap.ui.map;
		
		if(!$populationTms.isDev){
			// 운영 호출 
		}
		else{}
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
		
		this.map.data.push($populationTms.kosis_result_data);
		this.map.dataType = "kosis";
		this.map.dataForCombine = $populationTms.kosis_result_data;
		
		var yearArr = [];
		var options = $('#bndYear option');
		var values = $.map(options ,function(option) {
			yearArr.push(option.value);
		});
		
		var yearMax = Math.max.apply(null, yearArr);
		var yearMin = Math.min.apply(null, yearArr);
		
		var year = $populationTms.kosis_data_year;
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
			var tempIndex = parseInt(tempData[i].CODE);
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
		$populationTms.kosis_result_data = tempData;
		
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
		if (!$totSurvTmsMap.ui.map.isFixedBound) {
			setLegendForKosisStatsData(arData);
		}
		
		return boundData;
	}
	

	$populationTms.util = {};
	
	$populationTms.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$populationTms.event.setUIEvent() called.");
			
			var body = $("body");
			
			$populationTms.ui.searchData($("#selLeftYear").val(), $("#selRightYear").val());
			$populationTms.ui.searchTimeGenderAgeData($("#selLeftYear").val(), $("#selRightYear").val(), $totSurvMain.ui.selectedArea);
			$populationTms.ui.createAgeGenderTable($populationTms.rightTimeGenderAgePopulation, "rightTable");
			//20201204 박은식 지역선택 콤보박스 이벤트 추가 START
			body.on("click", "#commonTotSurv_detailSidoselectPop_close", function(){
				if($totSurvMain.ui.pageIndex == 12){
					$populationTms.ui.areaPopupToggle(false);
				}
			})
			
			body.on("change", "#areaPopup_sido", function(){
				$populationTms.ui.getAreaPopupSgg($(this).children("option:selected").val(), $("#areaPopup_sido selected:option").val());
			})
			
			body.on("click", "#commonTotSurv_detailSidoselectPop_ok", function(){
				if($totSurvMain.ui.pageIndex == 12){
					$("#dash_sido").val($("#areaPopup_sido option:selected").val()).prop("selected", true);
					$("#dash_sgg").val($("#areaPopup_sgg option:selected").val()).prop("selected", true);
					$totSurvMain.ui.selectedArea = $("#areaPopup_sido option:selected").val() + (($("#areaPopup_sgg option:selected").val() == "999") ? "" : $("#areaPopup_sgg option:selected").val());
					if($totSurvMain.ui.selectedArea.length == 2){
						$totSurvTmsMap.ui.mapToggleId ="";
					} else {
						$totSurvTmsMap.ui.mapToggleId = $totSurvMain.ui.selectedArea;
					}
					
					// 2020-12-07 [곽제욱] 지역이동으로 인한 navigation, areaTitle 영역 수정 START
					//$totSurvMain.ui.tmsPathChange()
					// 2020-12-07 [곽제욱] 지역이동으로 인한 navigation, areaTitle 영역 수정 END
					
					$populationTms.ui.searchData($("#leftYearearRadio").find(".on").val(), $("#rightYearearRadio").find(".on").val());
					$populationTms.ui.drawContent($totSurvMain.ui.selectedSurvId, $totSurvMain.ui.selectedItmCd, $totSurvMain.ui.selectedC1, "left", $("#leftYearearRadio").find(".on").val());
					$populationTms.ui.drawContent($totSurvMain.ui.selectedSurvId, $totSurvMain.ui.selectedItmCd, $totSurvMain.ui.selectedC1, "right", $("#rightYearearRadio").find(".on").val());
					$populationTms.ui.areaPopupToggle(false);
					
				}
			})
			//20201204 박은식 지역선택 콤보박스 이벤트 추가 END
			body.on("mouseover", ".moreInfoBtn", function(e){
				$totSurvMain.ui.setHelpTooltip($(this).attr("id"))
				var x = e.pageX - 50;
				var y = e.pageY+$("#divContent").scrollTop() - 75; 
				$("#helpTooltip").css("left", x + "px").css("top", y + "px")
				$("#helpTooltip").show();
				if(($("#helpTooltip").height()+$("#helpTooltip").position().top)+80 > $(window).height()){
					var addTop = ($("#helpTooltip").height()+$("#helpTooltip").position().top+80) - $(window).height()
					$("#helpTooltip").css("top", $("#helpTooltip").position().top - addTop+$("#divContent").scrollTop())
				}
			})
			
			body.on("mouseout", ".moreInfoBtn", function(){
				
				$("#helpTooltip").hide();
			})
			
			$(".Rangecontainer").css("display", "none");
			body.on("click", "#leftYearBtn, #rightYearBtn", function(e){ //연도 click event
				if($(this).hasClass("on")){//이미 선택된 연도를 클릭 시 event 종료
					return;
				}
				if(e.target.id == "leftYearBtn"){
					$("#selLeftYear").val($(this).val()).prop("selected", true);
					$(this).parent().find("button").removeClass("on")
					$(this).addClass("on")
					$("#selLeftYear").trigger("change")
          
 					srvLogWrite('P0','03','03','01',$totSurvMain.ui.selectedThema,'l_year='+$(this).val()+',r_year='+$("#selRightYear").val()+',adm_cd='+$totSurvMain.ui.selectedArea+',왼쪽');
				} else if(e.target.id == "rightYearBtn"){
					$("#selRightYear").val($(this).val()).prop("selected", true);
					$(this).parent().find("button").removeClass("on")
					$(this).addClass("on")
					$("#selRightYear").trigger("change")

					srvLogWrite('P0','03','03','01',$totSurvMain.ui.selectedThema,'r_year='+$(this).val()+',l_year='+$("#selLeftYear").val()+',adm_cd='+$totSurvMain.ui.selectedArea+',오른쪽');
				}
			})
			
			// 지도 year 선택 이벤트
			// 년도 변경
			body.on("change", "#selLeftYear", function() {
				var lselYear = $("#selLeftYear option:selected").val();
				console.log("lselYear = " + lselYear);
				
				var rselYear = $("#selRightYear option:selected").val();
				console.log("rselYear = " + rselYear);
				
			    $totSurvMain.ui.leftSelectedYear = lselYear;
				$populationTms.ui.drawContent("PH0001", "T100", "", "left", lselYear);
				$populationTms.ui.searchData(lselYear, $totSurvMain.ui.rightSelectedYear);
				//20200921 박은식 select box 변경 시 table, chart를 해당하는 data 기준으로 다시 append start
				$populationTms.ui.searchTimeGenderAgeData($("#selLeftYear").val(), "", $totSurvMain.ui.selectedArea);
				if($("#manwoman1").css("display") != "none"){
					$populationTms.ui.searchTimeGenderAgeData(lselYear, "", $totSurvMain.ui.selectedArea);
				} else if($("#maxmin1").css("display") != "none"){
					$populationTms.ui.createAgeGenderTable($populationTms.leftTimeGenderAgePopulation, "leftTable");
				}
				//20200921 박은식 select box 변경 시 table, chart를 해당하는 data 기준으로 다시 append end
			});
			
			// 2020-12-07 [곽제욱] 시계열 지역이동 추가 START 
			//body.on("click", "#areaDiv", function(){
				//$populationTms.ui.areaPopupToggle(true);
			//});
			// 2020-12-07 [곽제욱] 시계열 지역이동 추가 END
			
			body.on("change", "#selRightYear", function() {
				var rselYear = $("#selRightYear option:selected").val();
				var leftVal = $("#selLeftYear option:selected").val();
				console.log("rselYear = " + rselYear);
				
				if($("#selLeftYear option:selected").val() >= ($("#selRightYear option:selected").val()) ){ //20200921 박은식 select box변경시 연도 변경 event 일부 수정 
					// 년도정보가 없을 경우 콤보박스 설정
					setYearCombox($populationTms.ui.totSurvInfoData, "yearGbn");
					$("#selLeftYear").find("option").each(function() {
						var opVal = $(this).val();
						console.log("option opVal = " + opVal);
						
						if(opVal < rselYear){
							console.log("opVal = " + opVal);
						}
						else{
							$(this).remove();
						}
					});
					$("#selLeftYear").prop("selectedIndex", 0);
					$("#leftYearearRadio").empty();
					for(var i=0; i < $("#selLeftYear option").length; i++){
						$("#leftYearearRadio").append($("<button/>",{'value': $("#selLeftYear option").eq(i).val(), 'id':'leftYearBtn', 'class' : 'YearBox'}).text($("#selLeftYear option").eq(i).text()))
					}
					$("#leftYearearRadio button").eq(0).addClass("on")
					
				} else {
					var data = $populationTms.ui.totSurvInfoData[0];
					
					$("#selLeftYear").empty();
					for(var i=rselYear; i >= data.start_year; i = i-1){
						if(rselYear > i){
							$("#selLeftYear").append($("<option/>",{"value":i,"text":i+"년"}))
						}	
					}	
					$("#selLeftYear").val(leftVal).prop("selected",true);
					$("#leftYearearRadio").empty();
					for(var i=0; i < $("#selLeftYear option").length; i++){
						$("#leftYearearRadio").append($("<button/>",{'value': $("#selLeftYear option").eq(i).val(), 'id':'leftYearBtn', 'class' : 'YearBox'}).text($("#selLeftYear option").eq(i).text()))
					}
					if($("#rightYearBtn").val()<$("#leftYearBtn").val()){
						$("#leftYearearRadio").find("button").removeClass("on")
						$("#leftYearearRadio button").eq(0).addClass("on")
					} else {
						for(var i=0;i<$("#leftYearearRadio button").length;i++){
							if($("#leftYearearRadio button").eq(i).val() == $("#selLeftYear option:selected").val()){
								$("#leftYearearRadio button").eq(i).addClass("on");
								break;
							} 
						}
						
					}
						
				}
				
				var lselYear = $("#selLeftYear option:selected").val();
				console.log("lselYear = " + lselYear);
				
				$totSurvMain.ui.rightSelectedYear = rselYear;
				$populationTms.ui.drawContent("PH0001", "T100", "", "right", rselYear);
				if($totSurvMain.ui.leftSelectedYear != $("#leftYearearRadio").find("button.on").val()){
					$totSurvMain.ui.leftSelectedYear = lselYear;
					$populationTms.ui.drawContent("PH0001", "T100", "", "left", lselYear);
				}
				$populationTms.ui.searchData(lselYear, rselYear)	
				
				
				//20200921 박은식 select box 변경 시 table, chart 다시 append start
				if(leftVal != $("#selLeftYear").val()){
					$populationTms.ui.searchTimeGenderAgeData(lselYear, rselYear, $totSurvMain.ui.selectedArea);
					$populationTms.ui.createAgeGenderTable($populationTms.rightTimeGenderAgePopulation, "rightTable");
					$populationTms.ui.createAgeGenderTable($populationTms.leftTimeGenderAgePopulation, "leftTable");
				} else {
					$populationTms.ui.searchTimeGenderAgeData("", rselYear, $totSurvMain.ui.selectedArea);
					$populationTms.ui.createAgeGenderTable($populationTms.rightTimeGenderAgePopulation, "rightTable");
				}
				//20200921 박은식 select box 변경 시 table, chart 다시 append end
				
			});
			
			/**20200921 박은식 지도 하단 버튼 전환 event start*/
			//leftChart, leftTable
			body.on("click", "#chartArea1, #tableArea1", function(e){
				if($populationTms.leftTimeGenderAgePopulation.length == 0){
					$("#chartArea1").prop("disabled", true);
					$("#tableArea1").prop("disabled", true);
					$("#leftTable").empty();
					return;
				}
				if(e.target.id == "chartArea1"){
					$("#manwoman1").show();
					timeGenderAgePopulationChart($populationTms.leftTimeGenderAgePopulation,'leftTimeGenderAgePopulationChart','N','220');//20201028 박은식 높이수정
				} else if(e.target.id == "tableArea1"){
					
					$("#modal").attr("style", "width: 100%; height:"+($(window).outerHeight()+11)+"px; opacity:0.4; background-color:black; position: fixed; z-index: 9999; left:0; top:-11px");
					$("#leftTableCard").show();
					
					srvLogWrite('P0','03','02','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.leftSelectedYear+',selectedArea='+$totSurvMain.ui.selectedArea);

					$populationTms.ui.createAgeGenderTable($populationTms.leftTimeGenderAgePopulation, "leftTable");
				}
			});
			body.on("click", "#chartArea2, #tableArea2", function(e){
				if($populationTms.rightTimeGenderAgePopulation.length == 0){
					$("#chartArea2").prop("disabled", true);
					$("#tableArea2").prop("disabled", true);
					$("#leftTable").empty();
					return;
				}
				
				
				if(e.target.id == "chartArea2"){
					$("#manwoman2").show();
					timeGenderAgePopulationChart($populationTms.rightTimeGenderAgePopulation,'rightTimeGenderAgePopulationChart','N','220');//20201028 박은식 높이수정
				} else if(e.target.id == "tableArea2"){
					$("#modal").attr("style", "width: 100%; height:"+($(window).outerHeight()+11)+"px; opacity:0.4; background-color:black; position: fixed; z-index: 9999; left:0; top:-11px");
					$("#leftTableCard").show();
					
					srvLogWrite('P0','03','02','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.leftSelectedYear+',selectedArea='+$totSurvMain.ui.selectedArea);
					
					$populationTms.ui.createAgeGenderTable($populationTms.rightTimeGenderAgePopulation, "leftTable");
				}
			});
			$("#modal, #closePopup").on("click", function(){
				$("#modal").hide();
				$("#leftTableCard").css("display", "none");
				$populationTmsCombineMap.event.popupClose();
			})
			$(window).on("change", "#modal", function(){
				$("#modal").attr("style", "width: 100%; height:"+($(window).outerHeight()+11)+"px; opacity:0.4; background-color:black; position: fixed; z-index: 9999; left:0; top:-11px");
			})
			//rightChart, rightTable
			
			/**20200921 박은식 지도 하단 버튼 전환 event end*/
			
			/** 기준 지도 창 최대화 버튼 클릭 */
			body.on("click", "#rExport", function() {
				
				if($(".mapExport").hasClass("on")) {
					$(".mapExport").removeClass("on");
					
					$("#leftMapDiv").show();  // 665.34, 571					
					$("#mapRgn_2").height("525");
					
					$("#rightMapDiv").width("730");
					$("#rightMapDiv").height("549");
					
					$("#leftChartDiv").show();
					$("#rightChartDiv").show();
					
					$totSurvTmsMap.ui.mapList[0].update();
				}
				else{
					$(".mapExport").addClass("on");
					
					$("#leftMapDiv").hide();
					
					$("#leftChartDiv").hide();
					$("#rightChartDiv").hide();
					
					$("#rightMapDiv").width("1405");
					$("#rightMapDiv").height("820");
					
					$("#mapRgn_2").height("800");
					$totSurvTmsMap.ui.mapList[0].update();
				}
			});
			
			/** 기준 지도 확대 버튼 클릭 */
			body.on("click", "#rZoom", function() {
				//alert("확대 버튼 클릭");
				var lv_zoom = $totSurvTmsMap.ui.mapList[0].zoom;
				$totSurvTmsMap.ui.mapList[0].setZoom((lv_zoom+1));
			});
			
			/** 기준 지도 축소 버튼 클릭 */
			body.on("click", "#rOut", function() {
				//alert("축소 버튼 클릭");
				var lv_zoom = $totSurvTmsMap.ui.mapList[0].zoom;
				$totSurvTmsMap.ui.mapList[0].setZoom((lv_zoom-1));
			});
			
			
			/* 2020-10-23 [주형식] 메타정보,차트유형,차트 이미지저장 이벤트 START */
			// 차트 이미지 저장
			body.on("click", "[name=chartBtn]", function(evnt){ 
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);
				
				if(selId == "tiemTotalPopulationDiv"){
					chartModal($populationTms.timeTotalPopulation, 'itm1', 'surv_year', 'dt', '', '인구', '명');
				}
				else if(selId == "timeRankPopulationDiv"){
					if($totSurvMain.ui.selectedArea != '00' && $totSurvMain.ui.selectedArea != '99'){
						chartModal($populationTms.timeTotalPopulation, 'itm1', 'surv_year', 'dt', '', '인구', '명');
					}
					else{
						commonTotSurv_alert("차트 데이터가 없습니다.");
						return;
					}
				}
				else if(selId == "tiemGenderPopulationDiv"){
					chartModal($populationTms.timeGenderChangePopulation, 'itm1', 'surv_year', 'dt', '', '인구', '');
				}
				else if(selId == "timeForeignPopulationDiv"){
					chartModal($populationTms.timeForeignPopulation, 'itm1', 'surv_year', 'dt', '', '인구', '명');
				}
				else if(selId == "leftChartDiv"){
					chartModal($populationTms.leftTimeGenderAgePopulation, 'itm2', 'c1_nm', 'dt');
				}
				else if(selId == "rightChartDiv"){
					chartModal($populationTms.rightTimeGenderAgePopulation, 'itm2', 'c1_nm', 'dt');
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn'], [name='tableBtn'], [name='excelBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				if(selId == "tiemTotalPopulationDiv"){
					getMataDataUrl("PH0001");
				}
				else if(selId == "timeRankPopulationDiv"){
					getMataDataUrl("PH0001");
				}
				else if(selId == "tiemGenderPopulationDiv"){
					getMataDataUrl("PH0002");
				}
				else if(selId == "timeForeignPopulationDiv"){
					getMataDataUrl("PH0001");
				}
				else if(selId == "leftChartDiv"){
					getMataDataUrl("PH0002");
				}
				else if(selId == "rightChartDiv"){
					getMataDataUrl("PH0002");
				}
			});
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				//20201203 박은식 - 융합보기 이미지 다운로드 추가 및 분기처리 START
				if($(this).prop("id") ==  "combo"){
					var selId = $(this).parent().parent().parent().parent().prop('id');
				} else {
					var selId = $(this).parent().parent().parent().prop('id');
				}
				//20201203 박은식 - 융합보기 이미지 다운로드 추가 및 분기처리 END
				console.log("selId = " + selId);

				if(selId == "tiemTotalPopulationDiv"){
					$totSurvMain.ui.chartImageDown("#tiemTotalPopulationDiv", "총인구");
				}
				else if(selId == "timeRankPopulationDiv"){
					$totSurvMain.ui.chartImageDown("#timeRankPopulationDiv", "총인구 광역시도 중 랭킹");
				}
				else if(selId == "tiemGenderPopulationDiv"){
					$totSurvMain.ui.chartImageDown("#tiemGenderPopulationDiv", "남녀 성비 비율 변화");
				}
				else if(selId == "timeForeignPopulationDiv"){
					$totSurvMain.ui.chartImageDown("#timeForeignPopulationDiv", "외국인 수 변화");
				}
				else if(selId == "leftChartDiv"){
					$totSurvMain.ui.chartImageDown("#leftChartDiv", "인구 피라미드");
				}
				else if(selId == "rightChartDiv"){
					$totSurvMain.ui.chartImageDown("#rightChartDiv", "인구 피라미드");
				}
				//20201203 박은식 - 융합보기 이미지 다운로드 추가 및 분기처리 START
				else if(selId == "combineMap"){
					$totSurvMain.ui.chartImageDown("#combineMap", "융합 보기");
				}
				//20201203 박은식 - 융합보기 이미지 다운로드 추가 및 분기처리 END
			});
			
			
			/* 2020-10-23 [주형식] 메타정보,차트유형,차트 이미지저장 이벤트 END */
		},
		
		/**
		 * @name		 : allClear 
		 * @description  : 인구총조사 모든 차트데이터, 총인구데이터 초기화
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		allClear : function(){
			$("areaPopulation").html();
			$("#local_people1").empty(); // 내국인 차트 초기화
			$("#foreigner_people1").empty(); // 외국인 차트 초기화
			$("#ageDistribution").empty(); // 연령분포 차트 초기화
			$("#populationTimeChart").empty(); // 총조사인구 차트 초기화
			$("#moveHome").empty(); // 총조사인구 차트 초기화
			$("#multiculPopulationChart").empty(); // 다문화가구 차트 초기화
			
		}
	};
	
	
	/**
	 * 년도 콤보박스 설정
	 */
	function setYearCombox(data, yearGbn){
		if(yearGbn == undefined || yearGbn == ""){
			// 두개의 콤보박스 설정
			$("#selLeftYear").empty();
			$("#selRightYear").empty();
			$("#leftYearearRadio").empty();
			$("#rightYearearRadio").empty();
			
			var startYear = Number(data[0].start_year);
			var endYear = Number(data[0].end_year);
			var updtCycle = data[0].updt_cycle;
			
			var html = "";
			
			if(updtCycle=="년"){
				updtCycle = 1;
			} else if(updtCycle=="5년"){
				updtCycle = 5;
			}
			
			for(var i=endYear; i>=startYear; i=i-Number(updtCycle)){
				console.log("i = " + i);
				$('#selRightYear').append($("<option/>",{"value":i,"text":i+"년"}));
				$("#selLeftYear").append($("<option/>",{"value":i,"text":i+"년"}));
			}
			$("#selLeftYear option:eq(0)").remove();
			$("#selLeftYear option:eq(0)").prop("selected", true);
			$("#selRightYear option:eq("+($("#selRightYear option").length-1)+")").remove();
			$("#selRightYear option:eq(0)").prop("selected", true);
			for(var i=0; i < $("#selLeftYear option").length; i++){
				$("#leftYearearRadio").append($("<button/>",{'value': $("#selLeftYear option").eq(i).val(), 'id':'leftYearBtn', 'class' : 'YearBox' }).text($("#selLeftYear option").eq(i).text()))
			}
			$("#leftYearearRadio button").eq(0).addClass("on")
			for(var i=0; i < $("#selRightYear option").length; i++){
				$("#rightYearearRadio").append($("<button/>",{'value': $("#selRightYear option").eq(i).val(), 'id':'rightYearBtn', 'class' : 'YearBox'}).text($("#selRightYear option").eq(i).text()))
			}
			$("#rightYearearRadio button").eq(0).addClass("on")
		}
		else{
			// 두개의 콤보박스 설정
			$("#selLeftYear").empty();
			$("#leftYearearRadio").empty();
			
			var startYear = Number(data[0].start_year);
			var endYear = Number(data[0].end_year);
			var updtCycle = data[0].updt_cycle;
			
			var html = "";
			
			if(updtCycle=="년"){
				updtCycle = 1;
			} else if(updtCycle=="5년"){
				updtCycle = 5;
			}
			
			for(var i=endYear; i>=2015; i=i-Number(updtCycle)){
				console.log("i = " + i);
				$("#selLeftYear").append($("<option/>",{"value":i,"text":i+"년"}));
			}
			
			$("#selLeftYear option:eq(0)").remove();
			$("#selLeftYear option:eq(0)").prop("selected", true);
			for(var i=0; i < $("#selLeftYear option").length; i++){
				$("#leftYearearRadio").append($("<button/>",{'value': $("#selLeftYear option").eq(i).val(), 'id':'leftYearBtn', 'class' : 'YearBox'}).text($("#selLeftYear option").eq(i).text()))
			}
			$("#leftYearearRadio button").eq(0).addClass("on")
		}
		
	}
	
	
	
}(window, document));

/**
 * @name		 : timeTotalPopulationChart 
 * @description  : 시계열 총인구 차트, 남녀 성비 변화 차트
 * @date		 : 2020.09.13
 * @author		 : esPark
 * @history 	 :
 * @Parameter	data : Data
 * 			  target : Chart를 그릴 div id
 * 			resizeYn : chart resize 여부
 * 			  height : chart 높이
 */
//총인구
function timeTotalPopulationChart(data, target, resizeYn, height){
  //기본셋팅
	$("#"+target).empty();
	var temp = [];
	var max = d3.max(data, function(d){ return d.dt });
	var min = d3.min(data, function(d){ return d.dt });
	if(target == "tiemTotalPopulationChart"){//값 표시 문제로 rait 설정
		var rait = 1+1/(max/100000);
	} else {
		var rait = 1.002
	}

	for(var i=1;i < data.length; i++){
			temp[i-1] = Number(data[i-1].dt)*rait;
			temp[i] = Number(data[i].dt)*rait;
		if(temp[i-1] <= temp[i]){
			temp[i-1] = data[i-1].dt
		} else {
			temp[i] = data[i].dt
		}
	}

	var width = $("#"+target).outerWidth();
	
	 var tool = $(".chartCommontoolTip");
	
	var color = (target == "tiemTotalPopulationChart") ? "#7419B1" : "#f73393"; // 총인구 꺽은선 그래프, 남녀 성비 비율 변화 꺽은선 그래프 컬러

	var margin = ({top: 10, right: 10, bottom: 20, left: 10})
	var chartData = [], categories = [];
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].dt),name:data[i].surv_year});
		categories.push(data[i].surv_year);
	}
	Highcharts.chart(target, {
    chart: {
        type: 'line'
    },
	    title: {
	        text: null
	    },
	    xAxis: {
	        categories: categories,
	        crosshair: true,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0
	    },
	    yAxis: {
	        visible:false,
		    },
	    tooltip: {
			enabled:false,
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	        },
			series: {
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 30,
				stacking: 'normal',
				dataLabels: {
	                enabled: true,
        			inside: false,
	                style: {
	                    fontWeight: '100',
	                    color: "#333",
						fontFamily: 'NanumSquare',
						textOutline: "2px white"
	                }
	            },
				point: {
					events: {mouseOver: function() {
						
							tool.css("display", "inline-block");
							//2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
							let totDtArr = data;
							$(document).on("mousemove", function(evt) {
								tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
						        tool.css("top", evt.clientY-75);								        
							});

					        
					         var unit = "명";
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + this.name +"년 총인구"+(target=='tiemTotalPopulationChart'?'':' 성비비율')+"</p>" + "<p style='color:#ec2828; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) +(target=='tiemTotalPopulationChart'?'명':'')+ "</p>");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						}
					}
				}
	        }
	    },
		legend:{enabled: false},
		credits: {
            enabled: false
        },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    series: [{marker: {
	            fillColor: 'white',
	            lineWidth: 2,
	            lineColor: color
	        },color:color,
	        data: chartData
	    }]
	});
	
}





/**
 * @name		 : timeSidoPopulationChart 
 * @description  : 외국인 수 변화 Chart
 * @date		 : 2020.09.13
 * @author		 : esPark
 * @history 	 :
 * @Parameter	data : Data
 * 			  target : Chart를 그릴 div id
 * 			resizeYn : chart resize 여부
 * 			  height : chart 높이
 */

function timeSidoPopulationChart(data, target, resizeYn, height){
	console.log(data);
	//target 분기처리 
	//data 역순 정렬
	//외국인수 총인구광역시도랭킹 서로 문제 x
	var area = $totSurvMain.ui.selectedArea;
		
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	var tool = $(".chartCommontoolTip");
	
	var margin = ({top: 10, right: 0, bottom: 20, left: 0}) // 20201015 박은식 차트 기본 마진값 변경
	var color = (target == "timeRankPopulationChart") ? ["#9925D4", "#c333f7", "#DD65FA", "#ED84FC","#F9ADFE"] : ["#637FF2", "#68ACFC", "#54D1D1", "#63F2CD","#B7FFD4"]; //2020.09.22[신예리] 시계열 외국인 수 차트 컬러 변경
	
	var chartData = [], categories = [];
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].dt),name:data[i].surv_year,color:color[i]});
		categories.push(data[i].surv_year);
	}
	
	Highcharts.chart(target, {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: null
	    },
	    xAxis: {
	        categories: categories,
	        crosshair: true,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0
	    },
	    yAxis: {
        	visible:false,
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true,	
			enabled:false,
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	        },
			series: {
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 30,
				stacking: 'normal',
				dataLabels: {
	                enabled: true,
        			inside: false,
	                style: {
	                    fontWeight: '100',
	                    color: "#333",
						fontFamily: 'NanumSquare',
						textOutline: "2px white"
	                }
	            },
				point: {
					events: {mouseOver: function() {
						
							tool.css("display", "inline-block");
							//2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
							let totDtArr = data;
							$(document).on("mousemove", function(evt) {
								tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
						        tool.css("top", evt.clientY-75);								        
							});

					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + this.name +"년 외국인 계</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "명</p>");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							if(!this.selected) deselectAllHighcharts();
							$populationDash.ui.chartItmClick($(this), data[this.index], "#576574",$totSurvMain.ui.chartTitle);
							this.select();
						},
						select: function() {
							
						}
					}
				}
	        }
	    },
		legend:{enabled: false},
		credits: {
            enabled: false
        },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    series: [{
	        data: chartData
	    }]
	});
	
}

/**
 * @name		 : timeRankChart 
 * @description  : 랭킹 차트
 * @date		 : 2020.10.06
 * @author		 : esPark
 * @history 	 :
 * @Parameter	data : Data
 * 			  target : Chart를 그릴 div id
 * 			resizeYn : chart resize 여부
 * 			  height : chart 높이
 */
//총인구
function timeRankChart(data, target, resizeYn, height){
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$populationDash.totalPopulationData = data;
	
	var area = $totSurvMain.ui.selectedArea;
	
	var tool = $(".chartCommontoolTip");
	
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	//임시 end
	
	//기본셋팅
	var margin = ({top: 10, right: 10, bottom: 20, left: 10})
	var color = ["5058b8", "7A82D4", "9AA1E9", "BFC5F7", "DFE2FB"];
	//var color = ["8FB51B", "acd325", "C8E457", "DCF17A", "EDFAA7"];
	var rait = (area.length == 2) ? 2 : 20;
	
	var color = (target == "timeRankPopulationChart") ? ["#9925D4", "#c333f7", "#DD65FA", "#ED84FC","#F9ADFE"] : ["#637FF2", "#68ACFC", "#54D1D1", "#63F2CD","#B7FFD4"]; //2020.09.22[신예리] 시계열 외국인 수 차트 컬러 변경
	
	
	var chartData = [], categories = [];
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number($totSurvMain.ui.selectedArea.length==2?18-Number(data[i].rank):290-Number(data[i].rank)),name:data[i].surv_year});
		categories.push(data[i].surv_year);
	}
	Highcharts.chart(target, {
    chart: {
        type: 'line'
    },
	    title: {
	        text: null
	    },
	    xAxis: {
	        categories: categories,
	        crosshair: true,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0
	    },
	    yAxis: {
	        visible:false,
		    },
	    tooltip: {
			enabled:false,
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	        },
			series: {
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 30,
				stacking: 'normal',
				dataLabels: {
	                enabled: true,
        			inside: false,
	                style: {
	                    fontWeight: '100',
	                    color: "#333",
						fontFamily: 'NanumSquare',
						textOutline: "2px white"
	                }
	            },
				point: {
					events: {mouseOver: function() {
						
							tool.css("display", "inline-block");
							//2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
							let totDtArr = data;
							$(document).on("mousemove", function(evt) {
								tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
						        tool.css("top", evt.clientY-75);								        
							});

					        
					         var unit = "명";
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + this.name +"년 광역시도 중 랭킹</p>" + "<p style='color:#ec2828; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) +(target=='tiemTotalPopulationChart'?'명':'')+ "</p>");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						}
					}
				}
	        }
	    },
		legend:{enabled: false},
		credits: {
            enabled: false
        },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    series: [{marker: {
	            fillColor: 'white',
	            lineWidth: 2,
	            lineColor: '#878A89'
	        },color:'#878A89',
	        data: chartData
	    }]
	});


}





/**
 * @name		 : timeGenderAgePopulationChart 
 * @description  : 연도별 남녀 나이대별 인구 정보 Chart
 * @date		 : 2020.09.13
 * @author		 : esPark
 * @history 	 :
 * @Parameter	data : Data
 * 			  target : Chart를 그릴 div id
 * 			resizeYn : chart resize 여부
 * 			  height : chart 높이
 */

function timeGenderAgePopulationChart(data, target, resizeYn, height){
	$("#"+target).empty();
	if(data.length == 0 || data.length == undefined){
		if(target == 'leftTimeGenderAgePopulationChart'){
			$("#chartArea1").prop("disabled", true);
			$("#tableArea1").prop("disabled", true);
		} else {
			$("#chartArea2").prop("disabled", true);
			$("#tableArea2").prop("disabled", true);
		}
		return;
	}

	var margin = ({ left: 80, right: 0, top: 10, bottom: 30 }); //2020.10.29[신예리] margin bottom 변경
	var w = $("#"+target).outerWidth()-150;
	var h = height - margin.top - margin.bottom
	var centreSpacing = 0 //가운데 마진값 
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center'});
	
	var chartData1 = [],chartData2 = [], categories = [];
	for(var i=0;i<data.length;i++){
		chartData1.push({y:-Number(data[i].males),color:'#21AEF1',name:data[i].age,year:data[i].surv_year});
		chartData2.push({y:Number(data[i].females),color:'#FE5959',name:data[i].age,year:data[i].surv_year});
		categories.push(data[i].age);
	}
	
	Highcharts.chart(target, {
	    chart: {
	        type: 'bar'
	    },
	    title: {
	        text: null
	    },
	    xAxis: [
			{
		        categories: categories,
		        reversed: false,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0,
			lineWidth: 1,
		        labels: {
		            step: 3
		        },
		        accessibility: {
		            description: 'male'
		        }
		    },
			{ // mirror axis on right side
		        opposite: true,
		        reversed: false,
		        categories: categories,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0,
		        linkedTo: 0,
			lineWidth: 1,
		        labels: {
		            step: 3
		        },
		        accessibility: {
		            description: 'female'
		        }
		    }
		],
	    yAxis: {
			
	        title: {
	            text: null
	        },
		    gridLineWidth: 0,
		    minorGridLineWidth: 0,
			lineWidth: 1,
	        labels: {
	            formatter: function () {
					let v = this.value;
					v = v<0?-v:v;
	                return (v>1000000?v/1000000 + "M":v>1000?v/1000 + "K":v);
	            }
	        },
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true,
			enabled:false,
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	        },
			series: {
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 7.9,
				stacking: 'normal',
				borderRadius:0,
				point: {
					events: {
						mouseOver: function() {
						
							$(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click: function() {
							if(!this.selected) deselectAllHighcharts();
							$populationDash.ui.chartItmClick($(this), data[this.index], "#576574",$totSurvMain.ui.chartTitle);
							this.select();
						},
						select: function() {
							
						}
					}
				}
	        }
	    },
		legend:{enabled: false},
		credits: {
            enabled: false
        },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    series: [{
			name:'Male',
	        data: chartData1,
			point: {
				events: {
					mouseOver: function() {
						tool.css("display", "inline-block");
						//2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
						let totDtArr = data;
						$(document).on("mousemove", function(evt) {
							tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
					        tool.css("top", evt.clientY-75);								        
						});

				        
				         var unit = "명";
				        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + this.year + "년 "+ this.name +" 남자</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(-Number(this.y)) + "명</p>");//20201202 박은식 증가 감소에 따른 색상 변경
				        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
					},
					mouseOut: function() {
						$(document).off("mousemove");
						tool.css("display", "none");
					}
				}
			}
	    },{
			name:'Female',
	        data: chartData2,
			point: {
				events: {
					mouseOver: function() {
						tool.css("display", "inline-block");
						//2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
						let totDtArr = data;
						$(document).on("mousemove", function(evt) {
							tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
					        tool.css("top", evt.clientY-75);								        
						});

				        
				         var unit = "명";
				        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + this.year + "년 "+ this.name +" 여자</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "명</p>");//20201202 박은식 증가 감소에 따른 색상 변경
				        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
					},
					mouseOut: function() {
						$(document).off("mousemove");
						tool.css("display", "none");
					}
				}
			}
	    }]
	});

}

//2020.09.22[신예리] font-size 및 컬러 추가('나이'주석 처리) END //