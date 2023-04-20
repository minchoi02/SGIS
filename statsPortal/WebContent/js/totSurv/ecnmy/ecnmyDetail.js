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
	W.$totSurvDetail2 = W.$totSurvDetail2 || {};
	
	$(document).ready(function() {
//		srvLogWrite("P0", "09", "01", "00", $totSurvMain.ui.selectedThema, "");
	});
	
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {
		$totSurvDetail2.ui.detailDivResize();
		
		if($totSurvMain.ui.chartTarget != ""
			&& typeof($totSurvMain.ui.chartIndex) == "number"
			&& $totSurvMain.ui.chartColor != ""){
			 
			$totSurvDetail2.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
		}
	});

	$totSurvDetail2.chartsOption = {
		color: ["#f08246", "#009589"]
	};
	
	$totSurvDetail2.const = {},	
	$totSurvDetail2.ui = {
		ajax : {},
		dispOptions: {},
		chartData: [],
		sidoList: [],
		admLv : "",
		itmLv : "",		
		totLastYear : '',		// 마지막 년도 조회값		
		bndYear : ''    ,       // 시도 조회 년도 
		pageReadyYnFlag : "Y",	// 화면 로딩 후 메뉴 재 조회 방지 플래그
		my_x : null, // x
		my_y : null, // y
		my_sido_cd : "99", 		// 시도코드
		my_sido_nm : null, 		// 시도명
		my_sgg_cd : "999", 		// 시군구코드
		my_sgg_nm : null, 		// 시군구명
		my_emdong_cd : null, 	// 읍면동코드
		my_emdong_nm : null, 	// 읍면동명
		// 시도 시군구
		areaSidoData : {}, 		// 시도 목록 저장
		areaSggData : {}, 		// 시군구 목록 저장
		areaEmdongData : {}, 	// 읍면동 목록 저장
		selectSubThemaList : [],		// 소주제 선택항목 list
		selectTotSurvDataList : [],		// 선택한 총조사 목록
		admNm : "",				// 선택 지역명칭
		admCd : "",				// 선택 지역코드
		openApiAdmCd : "",				// 개방형지도 선택 지역코드
		isAtdrc : false,		// 비자치구 여부
		themaChartData : [],	// 주제별 차트 데이터
		tmsresChartData : [],	// 시계열 차트 데이터
		upperAreaChartData : [], 	// 상위지역 차트 데이터
		upperAreaAvgDt : [], 	// 상위지역 평균 값
		areaRankChartData : [], // 지역비교 차트 데이터
		areaAvgDt : [], 	// 지역비교 평균 값
		itemChartInfoDetailList : [], 	// 차트정보 조회  차트별(상세항목)
		viewTypeFalg : false, 	// 상세페이지 첫진입/ 좌측메뉴 클릭 초기화 여부 변수
		page :  1,				// 리스트 페이지 번호
		orderTypeNm : "default",	// 정렬 명칭
		orderType : "ASC",		// 정렬 방식(DESC/ASC)
		chartClickItmCd : "",	// 차트 클릭 itm_cd 저장
		chartClickC1 : "",	// 차트 클릭 c1 저장
		chartClickC2 : "",	// 차트 클릭 c2 저장
		chartClickC3 : "",	// 차트 클릭 c3 저장
		chartClickCd : "",	// 차트 클릭 cd 저장
		dispDataType : "", 	// 관리자 설정 표출 type
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
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/ecnmyDash/main");
			$totSurvDetail2.ui.pageReadyYnFlag = "Y";	// 화면 로딩 후 메뉴 재 조회 방지 플래그
		},
		
		/**
		 * @name         : ready 
		 * @description  : 최초 화면을 초기화(각 화면을 로딩)
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		ready : function() {
			$totSurvDetail2.ui.ajax.params = {			
				surv_year_list: $totSurvMain.ui.selectedYear				// 수록시점
				, org_id_list: $totSurvMap.ui.selectedOrgId					// 조직번호
				, tbl_id_list: $totSurvMap.ui.selectedTblId					// 통계표 ID
				, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
				, char_itm_id_list: $totSurvMap.ui.selectedChrItmId			// 표특성항목
				, prt_type: ""												// 출력방식 total:계 else 모두
				, adm_cd: $totSurvMap.ui.selectedAdmCd						// 지역코드
				, ov_l1_list: $totSurvMap.ui.selectedItmLv1					// 항목 1
				, ov_l2_list: $totSurvMap.ui.selectedItmLv2					// 항목 2
				, ov_l3_list: $totSurvMap.ui.selectedItmLv3					// 항목 3
				, ov_l4_list: $totSurvMap.ui.selectedItmLv4					// 항목 4
				, ov_l5_list: $totSurvMap.ui.selectedItmLv5					// 항목 5
				, category: $totSurvMap.ui.category							// 카테고리
				, odr_col_list: "DTVAL_CO"									// 정렬기준
				, odr_type: "DESC"											// 내림차순, 오름차순
			}	
			
			var mapHtml ="<div id='mapRgn_detail' style='height: 855px;'></div>"; // 2020.11.19[신예리] 영역 높이 수정
				mapHtml += '<div class="ControllBtnWrap">';
				mapHtml += '	<button type="button" class="mapExport" title="지도 확장"></button>';
				mapHtml += '	<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>';
				mapHtml += '	<button type="button" class="out" id="pOut" title="지도 축소"></button>';
				mapHtml += '</div>';

			$("#mapArea").html(mapHtml);
			
			$totSurvDetail2Map.ui.createMap("mapRgn_detail", 0);
			//$totSurvDetail2Map.ui.drawMapData("sido", "color"); // 맵 그리기
			if($totSurvDetail2Map.ui.map!=null) {						
				$totSurvDetail2Map.ui.map.update();
			}	
		/*
			$totSurvDetail2.ui.selectTotSurvDataList = []	// 선택한 총조사 목록 초기화
			$totSurvDetail2.ui.pageReadyYnFlag = "N";	// 화면 로딩 후 메뉴 재 조회 방지 플래그
			$totSurvMain.ui.tmsPathChange("nationwide", "");	// 상단 헤더 지역명 초기화
			$totSurvDetail2.ui.clear();	// 초기화
			
			// 좌측 메뉴 연도 삭제
			$(".yearBtn").remove();
			// 년도및 시도(시군구는 시도 생성 후 생성) 콤보박스 셋팅
			$totSurvDetail2.ui.setYearCombo();
			$totSurvDetail2.ui.getAreaSido($("#detail_sido option:selected").val());

			// 관심주제 조회
			$totSurvDetail2.ui.subThemaList();
			// 데이터 조회
			$totSurvDetail2.ui.searchList();
			$("#locationPath").html('<button class="totSurvBI" type="button" onclick="location.href=\'/view/totSurv/totSurvMain\'"></button>');	// 상단 네비게이션 삭제 //20210225 박은식 상단 네비게이션 BI추가
			$totSurvDetail2Map.ui.mapToggleId = "";	// 맵 토클 id
			
			// 선택된 개수 표시
			$('#detailSelListCnt').text($("input[name=checkSurvDataId]:checked").length);
		*/
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
			$totSurvDetail2.ui.page = 1;	// 페이징 초기화
			// 정렬 초기화
			$totSurvDetail2.ui.orderTypeNm = "default";
			$totSurvDetail2.ui.orderType = "ASC";
			$totSurvDetail2.ui.selectSubThemaList = [];	// 선택한 관심주제 초기화
			$totSurvDetail2Map.ui.mapToggleId = "";	// 맵 토클 id
			// 관심주제 이미지 초기화
			$(".InterestBtnWrap li").removeClass("on");
			$(".InterestBtnWrap li").removeClass("dis");
			$(".InterestBtnWrap li").addClass("dis");
			$totSurvDetail2.ui.selectTotSurvDataList = []	// 선택한 총조사 목록 초기화
			$("#totSurvDetailDataDiv").empty();	// 선택한 조사표 초기화
			// 상세영역 패널 초기화 및 문구/이미지 설정
			$("#totSurvDetailDataDiv").append(
			     $("<div/>", {"class":"DataNoneDetail", "id":"DataNoneDetail"}).append(
			        $("<img/>", {"src":"/images/totSurv/detailDataNoselect.png", "alt":"결과 목록을 선택해 주세요."}),
			        $("<p/>", {"text":"관심주제 설정에 따른 총조사 결과 목록을 선택해 주세요."})
			     )
			);
			
			// 차트 클릭 관련 초기화
			$totSurvDetail2.ui.chartSelectedItemClear();
			// 차트 데이터 초기화
			$totSurvDetail2.ui.chartDataClear();
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
				if($totSurvDetail2Map.ui.map != undefined && $totSurvDetail2Map.ui.map!=null && $totSurvDetail2Map.ui.map!=""){ //20201118 박은식 undefined 조건 추가 (맵 확대, 추소시 에러 표출 수정)
					$totSurvDetail2Map.ui.map.update();
				}
				$totSurvDetail2.ui.chartDIVReset(survId);
			}
			//20201126 박은식 다른 대시보드에서 resize시 실행방지 처리 END
		},
						
		/**
		 * @name         : setYearCombo 
		 * @description  : 연도 콤보박스 설정
		 * @date         : 2020.10.06
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		setYearCombo : function(){
			if($totSurvDetail2.ui.totLastYear != ''){
				var startYear = 2015;
				
				$("#selYear").empty();
				
				for(var i=Number($totSurvDetail2.ui.totLastYear); i>=startYear; i=i-1){
					if(Number($totSurvDetail2.ui.totLastYear) == i){
						$("#selYear").append("<option value=\""+i+"\" selected=\"selected\">"+i+"년"+"</option>");
					} else {
						$("#selYear").append("<option value=\""+i+"\">"+i+"년"+"</option>");
					}
				}
				
				$('#selYear').append($("<option/>",{"value":"2010","text":"2010년"}));
				$('#selYear').append($("<option/>",{"value":"3","text":"연속 3회"}));
				$('#selYear').append($("<option/>",{"value":"5","text":"연속 5회"}));
				//$('#selYear').append($("<option/>",{"value":"10","text":"연속 10회"}));//20210223 박은식 세로차트 수치 겹침현상으로 임시 서비스 제외
				
				// 시도/시군구 조회 기준년도
				$totSurvDetail2.ui.bndYear = $("#selYear option:selected").val();
			}
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
			if($totSurvDetail2.ui.areaSidoData[$totSurvDetail2.ui.bndYear] != undefined) {
				//시도 목록 추가
				var lvResultList = $totSurvDetail2.ui.areaSidoData[$totSurvDetail2.ui.bndYear];
				for(var i = 0; i < lvResultList.length; i++) {
					$("#detail_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
				}
				
				$totSurvDetail2.ui.getAreaSgg($("#detail_sido option:selected").val(), "999");
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
				    	base_year:$totSurvDetail2.ui.bndYear
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시도 목록 저장
						$totSurvDetail2.ui.areaSidoData[$totSurvDetail2.ui.bndYear] = res.result.sidoList;
						
						//시도 목록 추가
						var lvResultList = res.result.sidoList;
						for(var i = 0; i < lvResultList.length; i++) {
							$("#detail_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
						}
						
						$totSurvDetail2.ui.getAreaSgg($("#detail_sido option:selected").val(), "999");
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
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && $totSurvDetail2.ui.areaSggData[$totSurvDetail2.ui.bndYear+p_sido_cd] != undefined) {
				//시군구 목록 추가
				var lvResultList = $totSurvDetail2.ui.areaSggData[$totSurvDetail2.ui.bndYear+p_sido_cd];
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
				    	base_year:$totSurvDetail2.ui.bndYear,
				    	sido_cd:p_sido_cd,
				    	is_interactive:"Y"
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시군구 목록 저장
						if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") {
							$totSurvDetail2.ui.areaSggData[$totSurvDetail2.ui.bndYear+p_sido_cd] = res.result.sggList;
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
			    	base_year:$totSurvDetail2.ui.bndYear
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
			    	base_year:$totSurvDetail2.ui.bndYear,
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
			    	base_year:$totSurvDetail2.ui.bndYear
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
			    	base_year:$totSurvDetail2.ui.bndYear,
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
				//$totSurvMain.ui.loading(false);	// 로딩바
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
			    	base_year:$totSurvDetail2.ui.bndYear,
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
				//$totSurvMain.ui.loading(false);	// 로딩바
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
								$totSurvDetail2.ui.subThemaSelect(value.sub_thema);
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
			if($totSurvDetail2.ui.selectSubThemaList.length > 0){
				var selectSubThema = "";
				$.each($totSurvDetail2.ui.selectSubThemaList, function(key, value){
					if($totSurvDetail2.ui.selectSubThemaList.length-1 != key){
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
			dataParams.page = $totSurvDetail2.ui.page;
			// 정렬
			if($totSurvDetail2.ui.orderTypeNm != "default"){
				dataParams.orderTypeNm = $totSurvDetail2.ui.orderTypeNm;
				dataParams.orderType = $totSurvDetail2.ui.orderType;
			} else {
				dataParams.orderType = $totSurvDetail2.ui.orderType;
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
						if(resultCount > ($totSurvDetail2.ui.page * 10)){
							$("#totSurvDataListMore").css("visibility", "visible");
						} else {
							$("#totSurvDataListMore").css("visibility", "hidden");
						}
						// 리스트 그리기	#totSurvDataList
						$totSurvDetail2.ui.drawSerchList(totalDatalist);
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
			if($totSurvDetail2.ui.page == 1){
				$('#totSurvDataList > tbody').empty();
			}
			
			if(totalDatalist.length > 0){		
				$.each(totalDatalist, function(key, value){
					$('#totSurvDataList > tbody').append(
						$("<tr/>", {"id":value.surv_id+"Tr"}).append(
							$("<td/>", {"title":value.thema, "style":"width:11%;"}).append(
								$("<img/>", {"src":"/images/totSurv/"+$totSurvDetail2.ui.searchThemaImgFileNm($totSurvDetail2.ui.bigThema, value.thema), "class":"w25Img"})
							),
							$("<td/>", {"title":value.sub_thema, "style":"width:11%;"}).append(
								$("<img/>", {"src":"/images/totSurv/icon/"+$totSurvDetail2.ui.searchThemaImgFileNm($totSurvDetail2.ui.subThema, value.sub_thema), "class":"w25Img"})
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
							$totSurvDetail2.ui.listCheckData(value.surv_id, value.surv_nm);
						}),
						$("<tr/>", {"style":"height:6px;"})
					);
				});
				
				// 상세페이지 첫 진입/좌측 메뉴 클릭시에만 조회 결과 첫번째 항목 클릭
				if($totSurvDetail2.ui.viewTypeFalg){
					$totSurvDetail2.ui.viewTypeFalg = false;
					$("#totSurvDataList > tbody > tr").eq(0).trigger("click", true);	// 조회된 결과 첫번째 항목 클릭
				}
			} else {
				$('#totSurvDataList > tbody').append("조회된 정보가 없습니다.");
			}
			//$totSurvMain.ui.loading(false);	// 로딩바
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
				$totSurvDetail2.ui.chartSelectedItemClear();
				
				$totSurvDetail2Map.ui.mapToggleId = "";	// 맵 선택된 정보 초기화
				$("#totSurvDataList > tbody> tr").removeClass("on");
				$totSurvDetail2.ui.selectTotSurvDataList = []; 
				
				// 지역선택 팝업
				$totSurvDetail2.ui.getAreaPopupSido($("#detail_sido option:selected").val());
				$totSurvDetail2.ui.getAreaPopupSgg($("#detail_sido option:selected").val(), $("#detail_sgg option:selected").val());
				
				// 선택 항목 추가
				$("#"+checkSurvDataId+"Tr").addClass("on");
				$totSurvDetail2.ui.selectTotSurvDataList.push(checkSurvDataId + '$' + checkSurvDataNm);
				
				// 조사표 조회
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					// 차트 데이터 초기화
					$totSurvDetail2.ui.chartDataClear();
					// 선택한 항목 div 생성
					$totSurvDetail2.ui.createTotSurvDetailDiv();					
				}, 100);				
			}
		},
		
		/**
		 * @name         : createTotSurvDetailDiv
		 * @description  : 선택한 조사표 div 생성
		 * @date         : 2020.10.12
		 * @author	     : 한광희
		 * @history 	 : 
		 * @param
		 */
		createTotSurvDetailDiv : function(){
			//$totSurvMain.ui.loading(false);	// 로딩바
			if($totSurvDetail2.ui.selectTotSurvDataList.length > 0){
				if($("#detail_sido option:selected").val()=="99"){
					$totSurvDetail2.ui.admNm = "전국";
					$totSurvDetail2.ui.admCd = "99";
				} else {
					if($("#detail_sgg option:selected").val()=="999"){
						$totSurvDetail2.ui.admNm = $("#detail_sido option:selected").text();
						$totSurvDetail2.ui.admCd = $("#detail_sido option:selected").val();
					} else{
						$totSurvDetail2.ui.admNm = $("#detail_sido option:selected").text()+" "+$("#detail_sgg option:selected").text();
						$totSurvDetail2.ui.admCd = $("#detail_sido option:selected").val()+$("#detail_sgg option:selected").val();
					}
				}
				
				$("#totSurvDetailDataDiv").empty();
				
				$.each($totSurvDetail2.ui.selectTotSurvDataList, function(key, value){
					var totSurvDataList = value.split('$');
					$("#totSurvDetailDataDiv").append(
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
											$totSurvDetail2.ui.mapDivToggle(false, totSurvDataList[0]);											
										} else {
											$totSurvDetail2.ui.mapDivToggle(true, totSurvDataList[0]);
										}
									}),
									$("<button/>", {"class":"detail_titIcon04 on", "title":"표 접기", "type":"button", "name":"detail_titIcon", "style":"display:none;"}).click(function(){//20210223 박은식 title명 변경
										if($(".detail_titIcon04").hasClass("on")){
											$totSurvDetail2.ui.tableDivToggle(false, totSurvDataList[0]);											
										} else {
											$totSurvDetail2.ui.tableDivToggle(true, totSurvDataList[0]);
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
						$totSurvDetail2.ui.createTotSurvDetail(totSurvDataList[0]);
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
					$totSurvDetail2.ui.createTotSurvSubDetailDiv(survId);
				}, 100);
			} else{
				// 조사표 div 활성화시 화면에 따른 차트 리사이즈
				$totSurvDetail2.ui.chartDIVReset(survId);
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
			//$totSurvMain.ui.loading(false);	// 로딩바
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
								$totSurvDetail2.ui.mapDivToggle(false, survId);
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
			
			$totSurvDetail2Map.ui.createMap("mapRgn_detail");
			$totSurvDetail2.ui.getTotDetailThemaChartList(survId);	// 상세페이지 주제별 차트 목록 조회
			
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
			$totSurvDetail2Map.ui.selectedSurvId = survId;
			$totSurvDetail2Map.ui.selectedItemSeq = item_seq;
			// 맵 정보 조회
			if(mode == "1"){
				var p_map_region = "sido";
				if($totSurvDetail2.ui.admCd.length == 2){
					p_map_region = "sido";
				} else {
					p_map_region = "sgg";
				}
				$totSurvDetail2Map.ui.drawMapData(p_map_region, "color");				
			} else {
				if($totSurvDetail2Map.ui.map != null){
					$totSurvDetail2Map.ui.map.update();
				}
			}
			$totSurvDetail2.ui.getTotDetailThemaChartDataList(survId, item_seq);	// 주제별 차트 조회
			$totSurvDetail2.ui.getTotDetailTmsresChartDataList(survId, item_seq);	// 시계열 차트 조회
			$totSurvDetail2.ui.getTotDetailUpperAreaChartDataList(survId, item_seq);	// 상위지역 차트 조회
			$totSurvDetail2.ui.getTotDetailAreaRankChartDataList(survId, item_seq);	// 지역비교 차트 조회
			$totSurvDetail2.ui.getTotDetailTableDataList(survId, item_seq);	// 표정보 조회
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
			dataParams.year  = $totSurvDetail2.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $totSurvDetail2.ui.admCd;
			dataParams.isAtdrc = $totSurvDetail2.ui.isAtdrc;
			
			$.ajax({
				type: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailTableDataList.json",
				dataType: "json",
				data: dataParams,
				success: function(res){
					if(res.errCd == 0){
						if(res.result.dataList.length > 0){
							$totSurvDetail2.ui.createTable(survId, res.result.dataList, res.result.yearList);
						} else {
							$totSurvDetail2.ui.detailDataDivNone(survId+"Table", "table");
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
				if(dataList[i].cd == $totSurvDetail2.ui.chartClickCd){
					dataHtml += "<td class='data_col on' style='text-align:left; width:30%; padding:5px;' name='"+survId+dataList[i].cd+"'>"+dataList[i].cd_nm+"</td>";
				} else {
					dataHtml += "<td class='data_col' style='text-align:left; width:30%; padding:5px;' name='"+survId+dataList[i].cd+"'>"+dataList[i].cd_nm+"</td>";					
				}
				for(var j=0; j<yearList.length; j++){
					var year = yearList[j];
					if(dataList[i].cd == $totSurvDetail2.ui.chartClickCd){
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
			dataParams.year  = $totSurvDetail2.ui.bndYear;
			
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
						$totSurvDetail2.ui.itemChartInfoDetailList[survId] = res.result.itemChartInfoDetail;
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
						
						$totSurvDetail2.ui.getDataJson(itemChartInfo[0].surv_id, itemChartInfo[0].item_seq, "1");	// 데이터 조회
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
				$totSurvDetail2.ui.getOpenAPIAreaSido($("#areaPopup_sido option:selected").val());
				$totSurvDetail2.ui.getOpenAPIAreaSgg($("#areaPopup_sido option:selected").val(), $("#areaPopup_sgg option:selected").val());
				$totSurvDetail2.ui.getOpenAPIAreaEmdong($("#areaPopup_sido option:selected").val(), $("#areaPopup_sgg option:selected").val(), "00");
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
			$totSurvDetail2.ui.openApiAdmCd = openApiAdmCd;
			
			if(survId == "PH0001"){	// 인구, 주택, 가구
				if(dataCd =="T100"){	// 인구(T100)
					$totSurvDetail2MapApi.request.openApiSearchPopulation(openApiAdmCd);
				} else if(dataCd == "T200"){	// 가구(T200)
					$totSurvDetail2MapApi.request.openApiHouseHold(openApiAdmCd);
				} else if(dataCd == "T310"){	// 주택(T310)
					$totSurvDetail2MapApi.request.openApiHouse(openApiAdmCd);
				}
			} else if(survId == "FS0013" || survId == "FS0315"){	// 농가
				if(dataCd =="T00" || dataCd =="T01"){	// 가구(T00), 가구원총수(T01)
					$totSurvDetail2MapApi.request.openApiFarmHouseHold(openApiAdmCd);
				}
			} else if(survId == "FS0013" || survId == "FS0315"){	// 해수면 어업
				if(dataCd =="T01"){	// 가구원총수(T01)
					$totSurvDetail2MapApi.request.openApiFisheryHouseHold(openApiAdmCd, "2");
				}
			} else if(survId == "FS0171" || survId == "FS0469"){	// 내수면 어업
				if(dataCd =="T01"){	// 가구원총수(T01)
					$totSurvDetail2MapApi.request.openApiFisheryHouseHold(openApiAdmCd, "1");
				}
			} else if(survId == "FS0235" || survId == "FS0532"){	// 임업
				if(dataCd =="T01"){	// 가구원총수(T01)
					$totSurvDetail2MapApi.request.openApiForestryHouseHold(openApiAdmCd);
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
			dataParams.region_cd = $totSurvDetail2.ui.admCd; 
			
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
								$totSurvDetail2.ui.setOpenAPIBtnToggle(survId, value.cd);	// 개방형지도 버튼 토글
							}
						});
						
						$totSurvDetail2.ui.themaChartData[survId] = tempData;
						if($totSurvDetail2.ui.themaChartData[survId].length > 0){
							$totSurvDetail2.ui.themaChartTypeChange($totSurvDetail2.ui.themaChartData[survId], survId, "N", "180");							
						} else {
							$totSurvDetail2.ui.detailDataDivNone(survId+"ItemChart", "chart");
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
			    data: {year:$totSurvDetail2.ui.bndYear, region_cd:admCd},
				dataType: "json",
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					console.log("################# res = " + res.result.rslt);
					$totSurvDetail2.ui.isAtdrc = res.result.rslt;
					$totSurvDetail2Map.ui.isAtdrc = res.result.rslt;
				}
			}).fail(function (res) { // 실패
				//commonTotSurv_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//$totSurvMain.ui.loading(false);	// 로딩바
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
			dataParams.year  = $totSurvDetail2.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $totSurvDetail2.ui.admCd; 
			dataParams.isAtdrc = $totSurvDetail2.ui.isAtdrc;
			dataParams.chartType = "upper";
			
			// 주제별 차트 item 클릭 변수 설정
			if($totSurvDetail2.ui.chartClickItmCd != ""){
				dataParams.itm_cd = $totSurvDetail2.ui.chartClickItmCd;					
			}
			if($totSurvDetail2.ui.chartClickC1 != ""){
				dataParams.c1 = $totSurvDetail2.ui.chartClickC1;					
			}
			if($totSurvDetail2.ui.chartClickC2 != ""){
				dataParams.c2 = $totSurvDetail2.ui.chartClickC2;					
			}
			if($totSurvDetail2.ui.chartClickC3 != ""){
				dataParams.c3 = $totSurvDetail2.ui.chartClickC3;					
			}
			if($totSurvDetail2.ui.dispDataType != ""){
				dataParams.disp_data_type = $totSurvDetail2.ui.dispDataType;
			}
			
			if($totSurvDetail2.ui.admCd.length > 2){
				$.ajax({
					type: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/totSurv/detail/getTotDetailAreaRankChartDataList.json",
					dataType: "json",
					data: dataParams,
					success: function(res){
						if(res.errCd == 0){
							if(res.result.dataList.length > 0){ 
								$totSurvDetail2.ui.upperAreaChartData[survId] = res.result.dataList;
								// 랭킹 설정
								$("#"+survId+"UpperAreaRank").html(res.result.areaRank);
								$("#"+survId+"TotalUpperArea").html(res.result.totalArea+"개 ")
								if(res.result.level == "sido"){
									$("#"+survId+"UpperAreaRankTitle").html("시도 중");
								} else if(res.result.level == "sgg"){
									$("#"+survId+"UpperAreaRankTitle").html("시군구 중");
								}
								$("#"+survId+"UpperAreaRankSubTitle").html("번째");
								
								$totSurvDetail2.ui.upperAreaAvgDt[survId] = res.result.avgDt;
								
								setUpperAreaChart($totSurvDetail2.ui.upperAreaChartData[survId], survId, "N", "180");
							} else {
								$totSurvDetail2.ui.detailDataDivNone(survId+"UpperAreaChart", "chart");
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
				$totSurvDetail2.ui.detailDataDivNone(survId+"UpperAreaChart", "chart");
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
			dataParams.year  = $totSurvDetail2.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $totSurvDetail2.ui.admCd;
			
			// 주제별 차트 item 클릭 변수 설정
			if($totSurvDetail2.ui.chartClickItmCd != ""){
				dataParams.itm_cd = $totSurvDetail2.ui.chartClickItmCd;					
			}
			if($totSurvDetail2.ui.chartClickC1 != ""){
				dataParams.c1 = $totSurvDetail2.ui.chartClickC1;					
			}
			if($totSurvDetail2.ui.chartClickC2 != ""){
				dataParams.c2 = $totSurvDetail2.ui.chartClickC2;					
			}
			if($totSurvDetail2.ui.chartClickC3 != ""){
				dataParams.c3 = $totSurvDetail2.ui.chartClickC3;					
			}
			if($totSurvDetail2.ui.dispDataType != ""){
				dataParams.disp_data_type = $totSurvDetail2.ui.dispDataType;
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
							$totSurvDetail2.ui.tmsresChartData[survId] = res.result.tmsresData;
							setTmsresChart($totSurvDetail2.ui.tmsresChartData[survId], survId, "N", "180");
						} else {
							$totSurvDetail2.ui.detailDataDivNone(survId+"TimeChart", "chart");
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
			dataParams.year  = $totSurvDetail2.ui.bndYear;
			dataParams.item_seq  = item_seq;
			dataParams.region_cd = $totSurvDetail2.ui.admCd; 
			dataParams.isAtdrc = $totSurvDetail2.ui.isAtdrc;
			dataParams.chartType = "now";
			
			// 주제별 차트 item 클릭 변수 설정
			if($totSurvDetail2.ui.chartClickItmCd != ""){
				dataParams.itm_cd = $totSurvDetail2.ui.chartClickItmCd;					
			}
			if($totSurvDetail2.ui.chartClickC1 != ""){
				dataParams.c1 = $totSurvDetail2.ui.chartClickC1;					
			}
			if($totSurvDetail2.ui.chartClickC2 != ""){
				dataParams.c2 = $totSurvDetail2.ui.chartClickC2;					
			}
			if($totSurvDetail2.ui.chartClickC3 != ""){
				dataParams.c3 = $totSurvDetail2.ui.chartClickC3;					
			}
			if($totSurvDetail2.ui.dispDataType != ""){
				dataParams.disp_data_type = $totSurvDetail2.ui.dispDataType;
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
							$totSurvDetail2.ui.areaRankChartData[survId] = res.result.dataList;
							//20201130 박은식 해당지역 데이터 유무체크 로직 추가 START
							var localDataCheck = false;
							for(var i=0;i<res.result.dataList.length;i++){
								if(res.result.dataList[i].region_cd == $totSurvDetail2.ui.admCd){
									localDataCheck = true;
									break;
								}
							}
							if($totSurvDetail2.ui.admCd != "99"){
								if(localDataCheck == true){
									// 랭킹 설정
									$("#"+survId+"AreaRank").html(res.result.areaRank);
									$("#"+survId+"TotalArea").html(res.result.totalArea+"개 ")
									if(res.result.level == "sido"){
										$("#"+survId+"AreaRankTitle").html("시도 중");
									} else if(res.result.level == "sgg"){
										if($totSurvDetail2.ui.isAtdrc == true){
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

							if(localDataCheck == true || $totSurvDetail2.ui.admCd == "99"){
								$totSurvDetail2.ui.areaAvgDt[survId] = res.result.avgDt;
								
								setAreaRankChart($totSurvDetail2.ui.areaRankChartData[survId], survId, "N", "180");
							} else {
								$totSurvDetail2.ui.detailDataDivNone(survId+"AreaChart", "chart");
							}
							//20201130 박은식 해당지역 데이터 유무체크 로직 추가 END
						} else {
							$totSurvDetail2.ui.detailDataDivNone(survId+"AreaChart", "chart");
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
			$(target).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year+ "년 "+ title.replace('(명)', '').replace('-', ' ').replace('_', ' ') + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ data + "</p>" + unit);
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
        	if($totSurvDetail2Map.ui.chartToggleYn=="N"){
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
			if($totSurvMap.ui.selectedObj[0] != obj[0]){
	    		if($totSurvDetail2Map.ui.chartToggleYn == "Y"){
	    			obj.attr("fill", $totSurvMain.ui.tempColor);
	    		} else {
	    			obj.attr("fill", $totSurvMain.ui.selectedTempColor);
	    		}
	    	} else if($totSurvMap.ui.selectedObj[0] == obj[0]){
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
			$totSurvDetail2.ui.themaChartData = [];	// 주제별 차트
			$totSurvDetail2.ui.tmsresChartData = [];	// 시계열 및 증감율
			$totSurvDetail2.ui.upperAreaChartData = [];	// 상위지역 비교 차트
			$totSurvDetail2.ui.upperAreaAvgDt = []; 	// 상위지역 평균 값
			$totSurvDetail2.ui.areaRankChartData = []; 	// 지역비교
			$totSurvDetail2.ui.areaAvgDt = [];	// 지역비교 평균 값
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
			if($totSurvDetail2.ui.themaChartData[survId] != undefined && $totSurvDetail2.ui.themaChartData[survId].length != 0){
				$totSurvDetail2.ui.themaChartTypeChange($totSurvDetail2.ui.themaChartData[survId], survId, "Y", "180");							
			} else {
				$totSurvDetail2.ui.detailDataDivNone(survId+"ItemChart", "chart");
			}
			// 시계열 차트
			if($totSurvDetail2.ui.tmsresChartData[survId] != undefined && $totSurvDetail2.ui.tmsresChartData[survId].length != 0){ 
				setTmsresChart($totSurvDetail2.ui.tmsresChartData[survId], survId, "Y", "180");
			} else {
				$totSurvDetail2.ui.detailDataDivNone(survId+"TimeChart", "chart");
			}
			// 상위지역비교 차트
			if($totSurvDetail2.ui.upperAreaChartData[survId] != undefined && $totSurvDetail2.ui.upperAreaChartData[survId].length != 0){
				setUpperAreaChart($totSurvDetail2.ui.upperAreaChartData[survId], survId, "Y", "180");
			} else {
				$totSurvDetail2.ui.detailDataDivNone(survId+"UpperAreaChart", "chart");
			}
			// 지역비교 차트
			if($totSurvDetail2.ui.areaRankChartData[survId] != undefined && $totSurvDetail2.ui.areaRankChartData[survId].length != 0){
				setAreaRankChart($totSurvDetail2.ui.areaRankChartData[survId], survId, "Y", "180");
			} else {
				$totSurvDetail2.ui.detailDataDivNone(survId+"AreaChart", "chart");
			}
		},
		
		/**
		 * 
		 * @name         : themaChartItmClick
		 * @description  : 주제별 차트 아이템 클릭
		 * @date         : 2020.10.28
		 * @author	     : 한광희
		 * @history 	 :
		 */
		themaChartItmClick : function(obj, d, color, contents){
			// 개방형지도 체크
			if($("#openAPIBtn").hasClass("on")){
				$("#openAPIBtn").removeClass("on");
				$("select[name='OpenAPISelectBox']").hide();
			}
			
			// 차트 아이템 클릭
			if(obj[0] != $totSurvMap.ui.selectedObj[0]){
				// 이전에 선택한 오브젝트의 색 변경(이전선택 오브젝트가 없을경우 pass
				if($totSurvMap.ui.selectedObj[0] != "" && $totSurvMap.ui.selectedObj[0] != null){
					$totSurvMap.ui.selectedObj.attr("fill", $totSurvMain.ui.selectedTempColor)
				}
				// 현재 선택한 오브젝트를 변수에 저장
				$totSurvMap.ui.selectedObj = obj;
				// 현재 선택한 오브젝트의 색 변경
				obj.attr("fill", color);
				// 선택한 아이템이 변경되면서 선택한 아이템의 색상도 변경처리
				$totSurvMain.ui.selectedTempColor = $totSurvMain.ui.tempColor;
				// 차트 토글여부 Y
				$totSurvDetail2Map.ui.chartToggleYn = "Y";
				
				// 코드 값 셋팅
				if(d.itm_cd != ""){
					$totSurvDetail2.ui.chartClickItmCd = d.itm_cd;
				}
				if(d.c1 != ""){
					$totSurvDetail2.ui.chartClickC1 = d.c1;
				}
				if(d.c2 != ""){
					$totSurvDetail2.ui.chartClickC2 = d.c2;
				}
				if(d.c3 != ""){
					$totSurvDetail2.ui.chartClickC3 = d.c3;
				}
				if(d.disp_data_type != ""){
					$totSurvDetail2.ui.dispDataType = d.disp_data_type;
				}
				if(d.cd != ""){
					$totSurvDetail2.ui.chartClickCd = d.cd;
				}
				
				// 비자치구에서 선택했을 경우
				var tempRegionCd = $totSurvDetail2.ui.admCd;
	    		$totSurvDetail2.ui.getTotDetailAreaAtdrcCheck(tempRegionCd);		
	    		if($totSurvDetail2Map.ui.isAtdrc){
	    			$totSurvDetail2Map.ui.mapToggleId = "";
	    		}
				
				var survId = $("select[name='themaSelectBox'] option:selected").attr("data-surv-id");
				var item_seq = $("select[name='themaSelectBox'] option:selected").val();
				var p_map_region = "sido";
				if($totSurvDetail2.ui.admCd.length == 2){
					p_map_region = "sido";
				} else {
					p_map_region = "sgg";
				}
				$totSurvDetail2Map.ui.drawMapData(p_map_region, "color");	// 맵 정보 조회
				$totSurvDetail2.ui.getTotDetailTmsresChartDataList(survId, item_seq);	// 시계열 차트 조회
				$totSurvDetail2.ui.getTotDetailUpperAreaChartDataList(survId, item_seq);	// 상위지역 차트 조회
				$totSurvDetail2.ui.getTotDetailAreaRankChartDataList(survId, item_seq);	// 지역비교 차트 조회
				$("#"+survId+"Tbody").find("td").removeClass("on");	// 표 정보 선택한 영역 표시 제거
				$("td[name='"+survId+d.cd+"'").addClass("on");	// 표 정보 선택한 영역 표시
				// 차트 선택한 item 명칭 설정
				$("#detailChartSelectedItemNm").css("display", "inline");
				$("#detailChartSelectedItemNm").html(contents );
			} else {
				$totSurvMain.ui.chartTarget = "";
				$totSurvMain.ui.chartIndex = "";
				$totSurvMain.ui.chartData = "";
				$totSurvMain.ui.chartColor = "";
				$totSurvMain.ui.chartTitle = "";
				if($totSurvMain.ui.chartColor != ""){
					obj.attr("fill", $totSurvMain.ui.chartColor);
				} else {
					obj.attr("fill", $totSurvMain.ui.selectedTempColor);
				}
				// 차트 클릭 관련 초기화
				$totSurvDetail2.ui.chartSelectedItemClear();
				
				// 비자치구 여부 조회
				var tempRegionCd = $totSurvDetail2.ui.admCd;
	    		$totSurvDetail2.ui.getTotDetailAreaAtdrcCheck(tempRegionCd);		
	    		if($totSurvDetail2Map.ui.isAtdrc){
	    			$totSurvDetail2Map.ui.mapToggleId = "";
	    		}
				
				var survId = $("select[name='themaSelectBox'] option:selected").attr("data-surv-id");
				var item_seq = $("select[name='themaSelectBox'] option:selected").val();
				var p_map_region = "sido";
				if($totSurvDetail2.ui.admCd.length == 2){
					p_map_region = "sido";
				} else {
					p_map_region = "sgg";
				}
				$totSurvDetail2Map.ui.drawMapData(p_map_region, "color");	// 맵 정보 조회
				$totSurvDetail2.ui.getTotDetailTmsresChartDataList(survId, item_seq);	// 시계열 차트 조회
				$totSurvDetail2.ui.getTotDetailUpperAreaChartDataList(survId, item_seq);	// 상위지역 차트 조회
				$totSurvDetail2.ui.getTotDetailAreaRankChartDataList(survId, item_seq);	// 지역비교 차트 조회
				$("#"+survId+"Tbody").find("td").removeClass("on");	// 표 정보 선택한 영역 표시 제거
			}
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
			$totSurvDetail2Map.ui.chartToggleYn = "N";
			$totSurvDetail2.ui.chartClickItmCd = "";
			$totSurvDetail2.ui.chartClickC1 = "";
			$totSurvDetail2.ui.chartClickC2 = "";
			$totSurvDetail2.ui.chartClickC3 = "";
			$totSurvDetail2.ui.chartClickCd = "";
			$totSurvDetail2.ui.dispDataType = "";
			$totSurvMap.ui.selectedObj = "";
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
				$totSurvMap.ui.selectedObj[0] = $("#"+target).find(".eventGroup").eq(index)[0];
				if(title != "" && title != undefined){
					$("#detailChartSelectedItemNm").html(title);
				}
			} else {
				$totSurvDetail2.ui.themaChartItmClick( $("#"+target).find(".eventGroup").eq(index), data, color, title);
			}
		},
		
		/**
		 * @name		 : setDispOptions 
		 * @description  : 화면 셋팅 불러오기
		 * @date		 : 2021.08.30
		 * @author		 : 이영호
		 * @history 	 :
		 */
		setDispOptions : function(year) {
			$totSurvDetail2.ui.dispOptions = {};
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: "/view/totSurv/getDispSrvList.do",
				data: $totSurvDetail2.ui.ajax.params,
				dataType: "json",
				success: function(res) {
					for(var i=0; i<res.dispOptions.length; i++) {
						if($totSurvDetail2.ui.dispOptions[res.dispOptions[i].chartOrd] == undefined) {
							$totSurvDetail2.ui.dispOptions[res.dispOptions[i].chartOrd] = [];
						} else {
							for(var j=0; j<Object.keys($totSurvDetail2.ui.dispOptions).length; j++) {
								if(Object.keys($totSurvDetail2.ui.dispOptions)[j] == res.dispOptions[i].chartOrd) {
									$totSurvDetail2.ui.dispOptions[res.dispOptions[i].chartOrd].push(res.dispOptions[i]);
								}
							}
						}						
					}
					for(var i=0; i<$totSurvDetail2.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
						if($totSurvDetail2.ui.dispOptions[1][i].objVarId != "13999001") {
							$totSurvDetail2.ui.itmLv = "ov_l"+$totSurvDetail2.ui.dispOptions[1][i].varOrd+"_list";
							$totSurvDetail2.ui.admLv = "ov_l"+$totSurvDetail2.ui.dispOptions[1][i].regionVarOrd+"_list";
							break;
						}
					}
					//$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = '0';
					//$ecnmyDash.ajax.params[$ecnmyDash.admLv] = '00';
				},
				error: function(e) {
					//$totSurvMain.ui.alert(errorMessage);
				}
			});	
		},
	};

	$totSurvDetail2.util = {};
	
	$totSurvDetail2.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : 한광희
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$totSurvDetail2.event.setUIEvent() called.");
			var body = $("body");
			
			//지역선택 시도 변경
			body.on("change", "#detail_sido", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					$totSurvDetail2.ui.clear();	// 초기화
					
					$totSurvDetail2.ui.my_sido_cd = $("#detail_sido option:selected").val();
					
					var param = $("#selYear option:selected").val()+"|"+$totSurvDetail2.ui.my_sido_cd+"|"+($totSurvDetail2.ui.my_sgg_cd?$totSurvDetail2.ui.my_sgg_cd:"99");
					srvLogWrite("P0", "09", "04", "01", param, "");
					
					// 시군구 조회
					$totSurvDetail2.ui.getAreaSgg($totSurvDetail2.ui.my_sido_cd);
					// 관심주제 조회
					$totSurvDetail2.ui.subThemaList();
					// 데이터 조회
					$totSurvDetail2.ui.searchList();					
				}, 100);
			});
			
			//지역선택 시군구 변경
			body.on("change", "#detail_sgg", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					$totSurvDetail2.ui.clear();	// 초기화
					$totSurvDetail2.ui.my_sgg_cd = $("#detail_sgg option:selected").val();
					
					var param = $("#selYear option:selected").val()+"|"+$totSurvDetail2.ui.my_sido_cd+"|"+($totSurvDetail2.ui.my_sgg_cd?$totSurvDetail2.ui.my_sgg_cd:"99");
					srvLogWrite("P0", "09", "04", "01", param, "");
					
					$totSurvDetail2.ui.getTotDetailAreaAtdrcCheck($("#detail_sido option:selected").val()+$("#detail_sgg option:selected").val());	// 비자치구여부 조회
					// 관심주제 조회
					$totSurvDetail2.ui.subThemaList();
					// 데이터 조회
					$totSurvDetail2.ui.searchList();					
				}, 100);
			});
			
			// 년도 변경
			body.on("change", "#selYear", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					$totSurvDetail2.ui.clear();	// 초기화
					// 시도,시군구 목록 조회
					var selYear = $("#selYear option:selected").val();
					var param = $("#selYear option:selected").val()+"|"+$totSurvDetail2.ui.my_sido_cd+"|"+($totSurvDetail2.ui.my_sgg_cd?$totSurvDetail2.ui.my_sgg_cd:"99");
					srvLogWrite("P0", "09", "04", "01", param, "");
					
					if(selYear ==3 || selYear==5 || selYear == 10){
						$totSurvDetail2.ui.bndYear =  $totSurvDetail2.ui.totLastYear;
					}
					else{
						$totSurvDetail2.ui.bndYear = selYear;
					}
					
					$totSurvDetail2.ui.getAreaSido($("#detail_sido option:selected").val());
					$totSurvDetail2.ui.getAreaSgg($("#detail_sido option:selected").val(), $("#detail_sgg option:selected").val());
										
					// 관심주제 조회
					$totSurvDetail2.ui.subThemaList();
					// 데이터 조회
					$totSurvDetail2.ui.searchList();					
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
				$("#totSurvDetailDataDiv").empty();
				// 상세영역 패널 초기화 및 문구/이미지 설정
				$("#totSurvDetailDataDiv").append(
						$("<div/>", {"class":"DataNoneDetail", "id":"DataNoneDetail"}).append(
								$("<img/>", {"src":"/images/totSurv/detailDataNoselect.png", "alt":"결과 목록을 선택해 주세요."}),
								$("<p/>", {"text":"관심주제 설정에 따른 총조사 결과 목록을 선택해 주세요."})
						)
				);
				// 차트 데이터 초기화
				$totSurvDetail2.ui.chartDataClear();
				
				// 소주제 선택 및 해제
				if($(this).hasClass("on")){
					$(this).removeClass("on");
					// 목록에서 삭제
					var selSubThema = $(this).children().prop("title") ;   // 선택된 소제목명
					$totSurvDetail2.ui.selectSubThemaList.splice($totSurvDetail2.ui.selectSubThemaList.indexOf(selSubThema), 1);
				}
				else{
					$(this).addClass("on");
					// 목록에서 추가
					var selSubThema = $(this).children().prop("title") ;   // 선택된 소제목명
					$totSurvDetail2.ui.selectSubThemaList.push(selSubThema);
				}
				
				// 선택된 개수 초기화
				$('#detailSelListCnt').text("0");
				$totSurvDetail2.ui.page = 1;	// 페이징 초기화
				$totSurvDetail2.ui.selectTotSurvDataList = []	// 선택한 총조사 목록 초기화
				// 정렬 초기화
				$totSurvDetail2.ui.orderTypeNm = "default";
				$totSurvDetail2.ui.orderType = "ASC";
				
				// 데이터 조회
				$totSurvDetail2.ui.searchList( true );
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
				$totSurvDetail2.ui.orderTypeNm = $(this).attr("data-id");
				$totSurvDetail2.ui.orderType = $(this).attr("data-type");
				
				// 정렬 변경
				if($totSurvDetail2.ui.orderType == "ASC"){
					$(this).attr("data-type", "DESC");
				} else {
					$(this).attr("data-type", "ASC");
				}
				
				// 선택된 개수 초기화
				$('#detailSelListCnt').text("0");
				$totSurvDetail2.ui.page = 1;	// 페이징 초기화
				$totSurvDetail2.ui.selectTotSurvDataList = []	// 선택한 총조사 목록 초기화
				
				// 데이터 조회
				$totSurvDetail2.ui.searchList();
			});
			
			// 리스트 페이징 더보기 totSurvDataListMore
			body.on("click", "#totSurvDataListMore", function() {
				$totSurvDetail2.ui.page++;
				// 데이터 조회
				$totSurvDetail2.ui.searchList();
			});
						
			// 주제별 차트 주제 변경
			body.on("change", "select[name='themaSelectBox']", function(){
				$totSurvMain.ui.loading(true);	// 로딩바
				
				// 차트 클릭 관련 초기화
				$totSurvDetail2.ui.chartSelectedItemClear();
				
				var tempItemSeq = $(this).val();
				var tempId = "#"+$(this).attr("id")+" option:selected";
				var tempSurvId = $(tempId).attr("data-surv-id");
				var tempDataCd = $(tempId).attr("data-cd");
				
				srvLogWrite("P0", "09", "05", "01", tempSurvId, "seq="+tempItemSeq);
				
				if($("#areaPopup_sgg option:selected").val() != "999"){
					$totSurvDetail2.ui.admCd = $("#areaPopup_sido option:selected").val()+$("#areaPopup_sgg option:selected").val();
				} else {
					$totSurvDetail2.ui.admCd = $("#areaPopup_sido option:selected").val();
				}
				
				setTimeout(function() {
					$totSurvDetail2.ui.setOpenAPIBtnToggle(tempSurvId, tempDataCd);	// 개방형지도 버튼 토글
					$totSurvDetail2.ui.getDataJson(tempSurvId, tempItemSeq, "1");	// 데이터 조회
				}, 100);
			});		
			
			// 지역선택 팝업 x 버튼 클릭
			body.on("click", "#commonTotSurv_detailSidoselectPop_close", function(){
				$totSurvDetail2.ui.areaPopupToggle(false);
			});
			
			//지역선택 팝업 시도 변경
			body.on("change", "#areaPopup_sido", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				setTimeout(function() {
					// 시군구 조회
					$totSurvDetail2.ui.getAreaPopupSido($("#areaPopup_sido option:selected").val());
					$totSurvDetail2.ui.getAreaPopupSgg($("#areaPopup_sido option:selected").val(), "999");
				}, 100);
			});
			
			//지역선택 팝업 시도 변경
			body.on("change", "#areaPopup_sgg", function() {
				$totSurvMain.ui.loading(true);	// 로딩바
				$totSurvDetail2.ui.getTotDetailAreaAtdrcCheck($("#areaPopup_sido option:selected").val()+$("#areaPopup_sgg option:selected").val());	// 비자치구여부 조회
			});
						
			//지역선택 팝업 확인 버튼
			body.on("click", "#commonTotSurv_detailSidoselectPop_ok", function() {
				//20201204 박은식 시계열과 중복 발생 방지 처리 START
				if($totSurvMain.ui.pageIndex == 0){
					$totSurvDetail2.ui.areaPopupToggle(false);	// 지역선택 팝업 숨김
					$totSurvMain.ui.loading(true);	// 로딩바
					
					var sido_nm = $("#areaPopup_sido option:selected").text();
					var sgg_nm = $("#areaPopup_sgg option:selected").text();
					var adm_nm = "";
					
					if($("#areaPopup_sgg option:selected").val() != "999"){
						adm_nm = sido_nm + " " + sgg_nm;
						$totSurvDetail2.ui.admCd = $("#areaPopup_sido option:selected").val()+$("#areaPopup_sgg option:selected").val();
					} else {
						adm_nm = sido_nm;
						$totSurvDetail2.ui.admCd = $("#areaPopup_sido option:selected").val();
					}
					
					$(".detailTit-label").html(adm_nm);
					$totSurvDetail2Map.ui.mapToggleId = "";	// 맵 토클 id
					
					// 차트 클릭 관련 초기화
					$totSurvDetail2.ui.chartSelectedItemClear();
					
					// 개방형지도 체크
					if($("#openAPIBtn").hasClass("on")){
						$("#openAPIBtn").removeClass("on");
						$("select[name='OpenAPISelectBox']").hide();
					}
					
					setTimeout(function() {
						// 데이터 조회
						srvLogWrite("P0", "09", "05", "03", $totSurvDetail2Map.ui.selectedSurvId, "sido_cd="+$("#areaPopup_sido").val()+",sgg_cd="+($("#areapopup_sgg").val()?$("#areapopup_sgg").val():""));
						$totSurvDetail2.ui.getDataJson($totSurvDetail2Map.ui.selectedSurvId, $totSurvDetail2Map.ui.selectedItemSeq, "1");					
					}, 100);
				}
				//20201204 박은식 시계열과 중복 발생 방지 처리 END
			});
			
			// 줌 인
			body.on("click", ".zoom", function(){
				var that = $totSurvDetail2Map.ui;
				if (!that.map.isFixedBound) {
					that.map.gMap.zoomIn(1);
				}
			});
			
			// 줌 아웃
			body.on("click", ".out", function(){
				var that = $totSurvDetail2Map.ui;
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
    					$totSurvDetail2.ui.getOpenAPIMapData(survId, dataCd);
	    			}
					$('.mapInfo').show();
					/** 개방형지도 설명 팝업 END */
				} else {
					$(this).removeClass("on");
					$("select[name='OpenAPISelectBox']").hide();
					
					// 기존 맵 정보 조회
					var p_map_region = "sido";
					if($totSurvDetail2.ui.admCd.length == 2){
						p_map_region = "sido";
					} else {
						p_map_region = "sgg";
					}
					$totSurvDetail2Map.ui.drawMapData(p_map_region, "color");	
				}
			});
			
			// 개방형 지도 시도 선택
			body.on("change", "#OpenAPI_sido", function(){
				// 시군구 조회
				$totSurvDetail2.ui.getOpenAPIAreaSgg($(this).val(), "999");
				$("#OpenAPI_sgg").trigger("change");
			});
			
			// 개방형 지도 시군구 선택
			body.on("change", "#OpenAPI_sgg", function(){
				// 읍면동 조회
				$totSurvDetail2.ui.getOpenAPIAreaEmdong($("#OpenAPI_sido option:selected").val(), $(this).val(), "00");
				$("#OpenAPI_emdong").trigger("change");
			});
			
			// 개방형 지도 읍면동 선택
			body.on("change", "#OpenAPI_emdong", function(){
				var survId = $("#openAPIBtn").attr("data-surv-id");
				var dataCd = $("#openAPIBtn").attr("data-data-cd");
				// 개방형 지도 데이터 조회
				$totSurvDetail2.ui.getOpenAPIMapData(survId, dataCd);
			});
			
			// 개방형지도 설명 팝업 닫기
			body.on("click", ".openAPIPopcloseBtn", function(){ //20201202 박은식 API 팝업  닫기버튼 클레스변경 (추후 추가될 시 해당 클레스 변경 필요함)
				$('.popupWrap').hide();
				$("#commonTotSurvDetail_popup_back").hide();
				
				// 개방형 지도 데이터 조회
				var survId = $("#openAPIBtn").attr("data-surv-id");
				var dataCd = $("#openAPIBtn").attr("data-data-cd");
				$totSurvDetail2.ui.getOpenAPIMapData(survId, dataCd);
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
				$totSurvDetail2.ui.getOpenAPIMapData(survId, dataCd);
			});
			
		}
	};
}(window, document));

/**
 * @name         : setThemaVerticalBarChart 
 * @description  : 주제별 차트(막대(세로))
 * @date         : 2020.10.14
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setThemaVerticalBarChart(data, target, resizeYn, height){
//20201104 박은식 지표가 기울어지면 해당 높이만큼 마진값 변경 start
	var lengthMax = d3.max(data, function(d){return d.cd_nm.length});
	var winWidth = $(window).width();
	var bMargin = 0;
	if(data.length >= 10){
		bMargin = 20+lengthMax*5
	} else if(winWidth <= 1500 && data.length >= 3){
		if(winWidth > 1400 && lengthMax >= 10){
			bMargin = 20+lengthMax*5
		} else if(1300 && lengthMax >= 8 ){
			bMargin = 20+lengthMax*5
		} else {
			bMargin = 20+lengthMax*5
		}
	} else {
		bMargin = 20;
	}
	var margin = ({top: 20, right: 10, bottom: bMargin , left: 75})
//20201104 박은식 지표가 기울어지면 해당 높이만큼 마진값 변경 end
  	$("#"+target+"ItemChart").empty();
	var width = $("#"+target+"ItemChart").outerWidth();
  
	var tool = $(".chartCommontoolTip");
	
	var colors = ["#5A101F", "#8F0925", "#B71E3E", "#DB2C41", "#FF3D43", "#FF756D","#FF9B8A", "#FFC3B1", "#FFE4D8", "#E9DED9", "#FFDDD8", "#F9C9C5", "#FD9B9C", "#FA6978", "#F54467", "#EF094D", "#CD0654", "#931339", "#6D0E2A"];
	
	var max = d3.max(data, function(d){ return Number(d.dt) })
	var min = d3.min(data, function(d){ return Number(d.dt) });
	var calVal = max-min;
	
	var domainChangeRatio = 0;
	if(0<=calVal && calVal <1000){
		domainChangeRatio = 0.4;
	} else if(1000<=calVal && calVal<10000) {
		domainChangeRatio = 0.3;
	} else if(10000<=calVal && calVal<100000) {
		domainChangeRatio = 0.2;
	} else if(100000<=calVal && calVal<1000000){
		domainChangeRatio = 0.02;
	} else {
		domainChangeRatio = 0.1;
	}
	
	max = max*(1+domainChangeRatio); // 도메인MAX값 재계산
	min = min*(1-domainChangeRatio); // 도메인MIN값 재계산
		
	
	var x = d3.scaleBand()
		.domain(d3.range(data.length))
		.rangeRound([margin.top+20, width])
		.padding(0.5)
	
	var y =  d3.scaleLinear()
				.domain([min, max])
				.rangeRound([height - margin.bottom, margin.top]);

  var xAxis = function(g){ return g.data(data)
	  			.attr("transform", 'translate(0,'+(height - margin.bottom)+')')
				.call(d3.axisBottom(x).tickFormat(function(i){ return data[i].cd_nm }).tickSizeOuter(0))
  			  }
	
  var yAxis = function(g){ return g
				.attr("transform", 'translate('+(margin.left-30)+',0)')
				.call(d3.axisLeft(y).ticks(4, "s"))
				.call(function(g){ return g.select(".domain").remove() })
				.call(function(g){ return g.append("text")
						.attr("x", 0)
						.attr("y", 10)
						.attr("fill", "steelblue")
						.attr("font-family", "NanumSquare")
						.attr("text-anchor", "start")
						.text(data.x)})
			  } 

  const chart = d3.select("#"+target+"ItemChart");
  const svg = chart
         .append("svg")
         .attr("height", height)
         .attr("width", width)
         
         if(resizeYn == "Y"){
        	 svg.append("g")
             .selectAll("rect")
             .data(data)
             .join("rect")
             .attr("class", "eventGroup")
             .attr("fill", function(d,i) { return colors[i]})
         	 .on("mouseover", function(d){
         		$totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
         		$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
         	 })
         	 .on("mouseout", function(){
         		 tool.css("display", "none");
         		$(this).attr("fill", function(d,i) { return colors[i]})
         		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			 })
			 .on("click", function(d){
				 $totSurvMain.ui.chartTarget = target+"ItemChart";
				 $totSurvMain.ui.chartIndex = $(this).index();
				 $totSurvMain.ui.chartData = d;
				 $totSurvMain.ui.chartColor = "#576574";
				 $totSurvMain.ui.chartTitle = d.surv_year+"년 "+d.cd_nm;
				 $totSurvDetail2.ui.themaChartItmClick($(this), d, "#576574", d.surv_year+"년 "+d.cd_nm);
			 })
             .attr("x", function(d, i){ return x(i) })
             .attr("width", (x.bandwidth()))
             .attr("height",  function(d) {return y(0) - y(Number(d.dt-min)) })
     		.attr("y", function(d){ return y(Number(d.dt)) })
         } else {
        	 svg.append("g")
             .selectAll("rect")
             .data(data)
             .join("rect")
             .attr("class", "eventGroup")
             .attr("fill",  function(d,i) { return colors[i]})
             .style("cursor", "pointer") //2020.10.26[신예리] 마우스 포인터 추가
              .on("mouseover", function(d){
            	  $totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
            	  $totSurvDetail2.ui.chartMouseOver($(this), "#576574");
         	 })
         	 .on("mouseout", function(){
         		 tool.css("display", "none");
         		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			 })
			 .on("click", function(d){
				 $totSurvMain.ui.chartTarget = target+"ItemChart";
				 $totSurvMain.ui.chartIndex = $(this).index();
				 $totSurvMain.ui.chartData = d;
				 $totSurvMain.ui.chartColor = "#576574";
				 $totSurvMain.ui.chartTitle = d.surv_year+"년 "+d.cd_nm;
				 $totSurvDetail2.ui.themaChartItmClick($(this), d, "#576574", d.surv_year+"년 "+d.cd_nm);
			 })
			 .attr("y", function(d){ return y(Number(d.dt)) })
             .attr("x", function(d, i){ return x(i) })
             .attr("width", (x.bandwidth()))
     		.transition()
               .duration(2000)
               .delay(function (d, i) {
             			return i * 25;
               })
             .attr("height",  function(d) {return y(0) - y(Number(d.dt-min)) })
     		
         }
         
  svg.append("g").attr("style", "color:#878A89; font-size:12px;")
	.selectAll("text")
	.data(data)
	.join("text")
	.attr("id", "chartData")
	.attr("text-anchor", "middle")
	.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
	.attr("y", function(d,i) { return y(Number(d.dt))-10 })
	.text( function(d){ 
	//20201104 박은식 값에따라 단위변경 START
		var survId = $("select[name='themaSelectBox'] option:selected").attr("data-surv-id");
		var tempUnit = $("select[name='themaSelectBox'] option:selected").attr("data-unit");
		if(data.length > 10){
			if(d3.min(data, function(d){ return Number(d.dt) }) >= 1000){
				if(tempUnit != null && tempUnit != undefined && tempUnit != ""){
					$("#"+survId+"ThemaUnit").html("단위(천"+tempUnit+")");					
				}
				return (d.dt/1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",");
			} else {
				if(tempUnit != null && tempUnit != undefined && tempUnit != ""){
					$("#"+survId+"ThemaUnit").html("단위("+tempUnit+")");
				}
				return d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,",");
			}
		} else {
			if(tempUnit != null && tempUnit != undefined && tempUnit != ""){
				$("#"+survId+"ThemaUnit").html("단위("+tempUnit+")");
			}
			return d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,",");
		}
		//20201104 박은식 값에따라 단위변경 END
	});
	
    svg.append("g")
     .call(xAxis)
     //20201104 박은식 지표 겹치면 기울기 적용 (데이터 수가 10이상일 경우에도 적용) START
     .selectAll("text")
     .data(data)
     .join("text")
     .attr("x", function(d, i){ return (data.length >= 10) ? d.cd_nm.length : ""})
     .attr('transform', function(d){
    	 	if(data.length >= 10){
    	 		return 'translate('+(5+(d.cd_nm.length/2)+(x.bandwidth()/2))+','+((d.cd_nm.length/2)+(x.bandwidth()/2))+'), rotate(45)';
    		} else if(winWidth <= 1500 && data.length >= 3){
    			if(winWidth < 1400 && lengthMax >= 10){
    				return 'translate('+(5+(d.cd_nm.length/2)+(x.bandwidth()/2))+','+(6+(d.cd_nm.length/2)+(x.bandwidth()/2))+'), rotate(45)';
    			} else if(winWidth < 1300 && lengthMax >= 8 ){
    				return 'translate('+(5+(d.cd_nm.length/2)+(x.bandwidth()/2))+','+(6+(d.cd_nm.length/2)+(x.bandwidth()/2))+'), rotate(45)';
    			} else {
    				return 'translate('+(5+(d.cd_nm.length/2)+(x.bandwidth()/2))+','+(6+(d.cd_nm.length/2)+(x.bandwidth()/2))+'), rotate(45)';
    			}
    		} else {
    			return "";
    		} 
     });
     //20201104 박은식 지표 겹치면 기울기 적용 (데이터 수가 10이상일 경우에도 적용) END
svg.append("g")
      .call(yAxis);
	$("#"+target+"ItemChart").find("line").remove();
	$("#"+target+"ItemChart").find("text").attr("style", "color:#878A89");
	$("#"+target+"ItemChart").find("path").attr("style", "color:#878A89");

}

/**
 * @name         : setThemaHorizontalBarChart 
 * @description  : 주제별 차트(막대(가로))
 * @date         : 2020.10.27
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setThemaHorizontalBarChart(data, target, resizeYn, height){
	//20201104 박은식 공백제거 및 일부 특수문자 제거 (다른 곳에서도 사용 할 경우 공통 함수로 생성 예정 )START
	var reg = /[\{\}\[\]\/?.,;|\)*~`!^\-<>@\#$&\\\=\(\'\"]/gi;//특수문자 제거(일부 특수문자는 width를 거의 차지하지 않음) //20210311 박은식 일부 특수문자 수정
	var regTrim = / /gi;//모든공백제거(공백은 width를 거의 차지하지 않음)
	//20201104 박은식 공백제거 및 일부 특수문자 제거 (다른 곳에서도 사용 할 경우 공통 함수로 생성 예정 )END
	
	var lengthMax = d3.max(data, function(d){ return (d.cd_nm.replace(reg, "").replace(regTrim, "")).length});
	var dataLengthMax = d3.max(data, function(d){ return (d.dt).length});
	
	//20210222 박은식 지표명이 길어질 떄 밀림현상 수정 START
	var sideMargin = lengthMax; //20201104 박은식 문자열 길이 많큼 양 싸이트의 margin값을 추가asas
	var margin = ({top: 20, right: 60+dataLengthMax*9.5, bottom: 20, left: (lengthMax > 10) ? (lengthMax > 20) ? lengthMax*9.5 : lengthMax*11 : lengthMax*15.5 }) //20201104 박은식 문자열 길이 많큼 left 마진값 동적으로 적용 //20210305 박은식 문자열 10보다 작은 길이의 문자열 left 수정 //20210311 박은식 문자열 마진값 수정
	//20210222 박은식 지표명이 길어질 떄 밀림현상 수정 END
	var colors = ["#044698", "#035CB1", "#057BD4", "#079FF7", "#35B3FC","#43C2FA", "#69D8FC", "#9BECFE", "#CDF8FE", "#D5E9EC", "#C0EBE8", "#A1E6E1", "#79DED7", "#4FCCC3", "#3BBEB5", "#1BA79D", "#11958C", "#047A72","#86B505","#ADD239","#FFCD3F"]; //2020.12.14[신예리] 컬러 추가
  	$("#"+target+"ItemChart").empty();
	var width = $("#"+target+"ItemChart").outerWidth();
  
	var tool = $(".chartCommontoolTip");
	
	var max = d3.max(data, function(d) { return Number(d.dt)})
	var x = d3.scaleLinear()
			  .domain([0, max*0.95])
			  .range([margin.left, width - (margin.right+sideMargin)])
	var x1 = d3.scaleLinear()
			   .domain([0, (lengthMax > 10) ? max*1.8 : max*1.2]) 	//20210222 박은식 지표명이 길어질 떄 밀림현상 수정 START
			   .range([margin.left, width -(margin.right+sideMargin)])
	var y = d3.scaleBand()
    		  .domain(d3.range(data.length))
    		  .range([0, height]) //range / domainlength 항목간 넓이
    		  .padding(0.5)
    var y1 = d3.scaleBand()
    		   .domain(d3.range(data.length))
    		   .range([0, height-10]) //range / domainlength 항목간 넓이
    		   .padding(0.1)
    var xAxis = function(g) { return g
	    		.attr("transform", "translate(0,"+ margin.top +")")
	    		.call(d3.axisTop(x).ticks(width / 80, data.format))
	    		.call( function(g) { return g.select(".domain").remove() } )
				}
	var yAxis = function(g) { return g
	    		.attr("transform", "translate("+ (margin.left+sideMargin) + ",0)")
	    		.call(d3.axisLeft(y).tickFormat(
	    				function(i) {
	    					return data[i].cd_nm
	    				}).tickSizeOuter(0))
				}
	var format = x.tickFormat(20, data.format)
	// 타겟 설정
	const chart = d3.select("#"+target+"ItemChart");
	const svg = chart
     			.append("svg")
     			.attr("height", height)
     			.attr("width", width)

    if(resizeYn == "Y"){
    		svg.append("g")
    		   .selectAll("rect")
    		   .data(data)
    		   .join("rect")
    		   .attr("class", "eventGroup")
    		   .attr("style", "cursor:pointer;")
    		   .attr("x", x(0)+sideMargin)// 추가된 문자열 길이 만큼 유동적으로 차트 시작지점 변경
    		   .attr("y", function(d, i) { return y(i) })
    		   .attr("height", y.bandwidth())
    		   .attr("fill", function(d,i) { return colors[i]})
    		   .attr("width", 0)
    		   .attr("rx", "4")
    		   .attr("ry", "4")
    		   .style("cursor", "pointer")
    		   .on("mouseover", function(d){
    			   	$totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
          	  	$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
    		   })
    		   .on("click", function(d){
    			   	$totSurvMain.ui.chartTarget = target+"ItemChart";
  				 	$totSurvMain.ui.chartIndex = $(this).index();
  				 	$totSurvMain.ui.chartData = d;
  				 	$totSurvMain.ui.chartColor = "#576574";
  				 	$totSurvMain.ui.chartTitle = d.surv_year+"년 "+d.cd_nm;
  				 	
  				 	srvLogWrite("P0", "09", "05", "02", d.surv_id, "year="+d.surv_year+",itm_cd="+d.itm_cd);
  				 	
  				 	$totSurvDetail2.ui.themaChartItmClick($(this), d, "#576574", d.surv_year+"년 "+d.cd_nm);
    		   })
    		   .on("mouseout", function(d){
    			   	tool.css("display", "none");
         		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
    		   })
    		   .attr("width",  function(d) { return x1(max)*(d.dt/(max*1.1)) });

    		svg.append("g")
    		   .attr("text-anchor", "end")
    		   .attr("font-family", "NanumSquare")
    		   .attr("font-size", 12)
    		   .attr("font-weight", 600)
    		   .selectAll("text")
    		   .data(data)
    		   .join("text")
    		   .attr("style", "pointer-events: none;")
    		   .attr("fill", "")
    		   .attr("x", margin.left+sideMargin)
    		   .attr("width",  function(d) { return x1(Number(d.dt)) }) 
    		   .attr("y", function(d, i) { return y(i) + y.bandwidth() / 2 })
    		   .attr("dy", "0.35em")
    		   .text(function(d) { return (format(d.dt) == 0) ? '': format(d.dt) })
    		   .call(function(text) { return text.filter(function(d) { return x1(Number(d.dt))}) // short bars
    		   .attr("dx", +10)
    		   .attr("text-anchor", "start") })
    		   .attr("x",  function(d) { return margin.left+x1(max)*(d.dt/(max*1.1))+sideMargin});
    } else {
    		svg.append("g")
    		   .selectAll("rect")
    		   .data(data)
    		   .join("rect")
    		   .attr("class", "eventGroup")
    		   .attr("style", "cursor:pointer;")
    		   .attr("x", x(0)+sideMargin)// 추가된 문자열 길이 만큼 유동적으로 차트 시작지점 변경
    		   .attr("y", function(d, i) { return y(i) })
    		   .attr("height", y.bandwidth())
    		   .attr("fill", function(d,i) { return colors[i]})
    		   .attr("width", 0)
    		   .attr("rx", "4")
    		   .attr("ry", "4")
    		   .style("cursor", "pointer")
    		   .on("mouseover", function(d){
    			   	$totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
             	  	$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
    		   })
    		   .on("click", function(d){
    			   	$totSurvMain.ui.chartTarget = target+"ItemChart";
  				 	$totSurvMain.ui.chartIndex = $(this).index();
  				 	$totSurvMain.ui.chartData = d;
  				 	$totSurvMain.ui.chartColor = "#576574";
  				 	$totSurvMain.ui.chartTitle = d.surv_year+"년 "+d.cd_nm;
  				 	
  				 	srvLogWrite("P0", "09", "05", "02", d.surv_id, "year="+d.surv_year+",itm_cd="+d.itm_cd);
  				 	$totSurvDetail2.ui.themaChartItmClick($(this), d, "#576574", d.surv_year+"년 "+d.cd_nm);
    		   })
    		   .on("mouseout", function(d){
    			   	tool.css("display", "none");
            		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
    		   })
    		   .transition()
    		   .duration(1000)
    		   .delay(function (d, i) {
    			   return i * 150;
    		   })
    		   .attr("width",  function(d) { return x1(max)*(d.dt/(max*1.1)) });

    		svg.append("g")
    		   .attr("text-anchor", "end")
    		   .attr("font-family", "NanumSquare")
    		   .attr("font-size", 12)
    		   .attr("font-weight", 600)
    		   .selectAll("text")
    		   .data(data)
    		   .join("text")
    		   .attr("style", "pointer-events: none;")
    		   .attr("fill", "")
    		   .attr("x", margin.left+sideMargin)
    		   .attr("width",  function(d) { return x1(Number(d.dt)) }) 
    		   .attr("y", function(d, i) { return y(i) + y.bandwidth() / 2 })
    		   .attr("dy", "0.35em")
    		   .text(function(d) { return (format(d.dt) == 0) ? '': format(d.dt) })
    		   .call(function(text) { return text.filter(function(d) { return x1(Number(d.dt))}) // short bars
    		   .attr("dx", +10)
    		   .attr("text-anchor", "start") })
    		   .transition()
    		   .duration(1000)
    		   .delay(function (d, i) {
    			   return i * 150;
    		   })
    		   .attr("x",  function(d) { return margin.left+x1(max)*(d.dt/(max*1.1))+sideMargin});
    	}


	svg.append("g")
	   .attr("style", " font-size: 11px; color:#878A89") 	//20210222 박은식 지표명이 길어질 떄 밀림현상 수정 START
	   .call(yAxis);

	$("#"+target+"ItemChart").find("line, path").remove();
}

/**
 * @name         : setThemaBrokenLineChart 
 * @description  : 주제별 차트(꺽은선 그래프)
 * @date         : 2020.10.27
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setThemaBrokenLineChart(data, target, resizeYn, height){
	if(data.length == 0){
		return;
	}	
	
	// 증감율 계산
	for(var i=0; i < data.length; i++){
		if(i == 0){
			data[0].incORdec = '0';
			continue;
		}
		var temp = data[i].dt - data[i-1].dt;
		data[i].incORdec = temp/data[i-1].dt*100;
	}
	
	$("#"+target+"ItemChart").empty();
	var width = $("#"+target+"ItemChart").outerWidth();
		
	var tool = $(".chartCommontoolTip");
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	
	//기본셋팅
	var margin = ({top: 10, right: 50, bottom: 20, left: 50})
	var color = ["5058b8", "7A82D4", "9AA1E9", "BFC5F7", "DFE2FB"];
	
	var x = d3.scaleBand()
              .domain(data.map(function(d){ return d.cd_nm }))
              .rangeRound([margin.left+margin.top, width-margin.left])
              .padding(0.5);
	var max = d3.max(data, function(d){ return Number(d.dt) })
	var y1 = d3.scaleLinear()
			   .domain([0, max*1.2]).nice()
			   .rangeRound([height - margin.bottom, margin.top]);
	var y2 =  d3.scaleLinear()
				.domain([d3.min(data, function(d){ return Number(d.incORdec)})*1.5, d3.max(data, function(d){return Number(d.incORdec)})*1.2]).nice()
				.rangeRound([height - margin.bottom, margin.top]);
	
	var line = d3.line().x(function(d){ return (x(d.cd_nm) + (Number(x.bandwidth()) / 2))})
						.y(function(d){ return y2(d.incORdec) });

	var xAxis = function(g){ return g.attr("transform", "translate("+0 +","+(height - margin.bottom)+")")
									 .call(d3.axisBottom(x)
						            		 .tickFormat(function(i){ return i })
						            		 .tickSizeOuter(0)) 
				}
	var y1Axis = function(g){ return g.attr("transform", 'translate('+margin.left+',0)')
									  .style("color", "steelblue")
          							    .call(d3.axisLeft(y1).ticks(4, "s"))
          							    .call(function(g){ return g.select(".domain").remove() })
          							    .call(function(g){ return g.append("text")
          														 .attr("x", -margin.left)
          														  .attr("y", 10)
          														  .attr("fill", "#878A89")
          														  .attr("text-anchor", "start")
          														  .attr("font-size", "15")
          														  .text(data.y2) })
  				}
	var y2Axis = function(g){ return g.attr("transform", 'translate('+(width-margin.left+10)+',0)') //20201027 박은식 x좌표 변경
            						  .call(d3.axisRight(y2).ticks(5).tickFormat(function(d){return d+"%"}))
            						  .call(function(g){return g.select(".domain").remove() })
            						  .call(function(g){return g.append("text")
            													 .attr("x", margin.right)
            													 .attr("y", 10)
            													 .attr("fill", "#878A89")
            													 .attr("text-anchor", "end")
            													 .attr("font-size", "15")
            													 .text(data.y2) })
  				}
	//타겟설정
	const chart = d3.select("#"+target+"ItemChart");

	//차트 renderer시작
	const svg = chart.append("svg")
         			 .attr("height", height)
         			 .attr("width", width);
	
	
	if(resizeYn == "Y"){
		//path를 생성하여 변수에 담음
		var path = svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#F6BF29")
			.attr("stroke-miterlimit", 2)
			.attr("stroke-width", 2)
			.attr("d", line)
			
		//path의 총 길이를 계싼
		var totalLength;
		if(path.node() != null) {		
			totalLength = path.node().getTotalLength();	
			
			path.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)	
				.transition()
			    .duration(1200)
			    .ease(d3.easeLinear)
			    .attr('stroke-dashoffset', 0)
		}
	} else {
		//path를 생성하여 변수에 담음
		var path = svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#F6BF29")
			.attr("stroke-miterlimit", 2)
			.attr("stroke-width", 2)
			.attr("d", line)
			
		//path의 총 길이를 계싼
		var totalLength;
		if(path.node() != null) {		
			totalLength = path.node().getTotalLength();	
			
			path.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)	
				.transition()
			    .duration(1200)
			    .ease(d3.easeLinear)
			    .attr('stroke-dashoffset', 0)
		}
	}

	svg.append("g")
		.attr("style", "pointer-events: none;")
		  .selectAll("circle")
		  .data(data)
		  .join("circle")
		.on("mouseover", function(d){
			$totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
		})
		.on("click", function(d){
			$totSurvMain.ui.chartTarget = target+"ItemChart";
			$totSurvMain.ui.chartIndex = $(this).index();
			$totSurvMain.ui.chartData = d;
			$totSurvMain.ui.chartColor = "#576574";
			$totSurvMain.ui.chartTitle = d.surv_year+"년 "+d.cd_nm;
			$totSurvDetail2.ui.themaChartItmClick($(this), d, "#576574", d.surv_year+"년 "+d.cd_nm);
		})
		.on("mouseout", function(){
			tool.css("display", "none");
		})
		.attr("fill", "#fff")
		.attr("stroke", "#F6BF29")
		.attr("stroke-width", 2)
		.attr("style", "pointer-events: all; cursor: pointer;")
		.attr("cx", function(d){ return x(d.cd_nm) + x.bandwidth() / 2 })
		.attr("cy", function(d){ return y2(d.incORdec) })
		.attr("r", 4);

	svg.append("g")
	   .attr("fill", "none")
	   .attr("pointer-events", "all")
	   .attr("style", "pointer-events: none;")
	     .selectAll("rect")
	     .data(data)
	     .join("rect")
	   .attr("x", function(d){ return x(d.cd_nm) })
	   .attr("width", x.bandwidth())
	   .attr("y", 0)
	   .attr("height", height);


	  svg.append("g").attr("style", "color:#878A89; font-size:11px;")
		.selectAll("text")
		.data(data)
		.join("text")
		.attr("style", "pointer-events: none;")
		.attr("id", "chartData")
		.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(d.cd_nm)+ x.bandwidth() / 2})
		.attr("y", function(d) { return y1(Number(d.dt))-10 })
		.text( function(d){ return d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,",") })
	
	svg.append("g")
		.call(xAxis);

	svg.append("g")
		.call(y1Axis);
	
	$("#"+target+"ItemChart").find("text").attr("fill", "#878A89");
}

/**
 * @name         : setThemaRadialChart 
 * @description  : 주제별 차트(방사형)
 * @date         : 2020.10.27
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setThemaRadialChart(p_data, target, resizeYn, p_height){
	var tool = $(".chartPoptoolTip");
	var margin = {top: 15, right: 40, bottom: 10, left: 50},
    // 사이즈 변경
    width = Math.min(p_height, window.innerWidth - 10) - (margin.left + margin.right)/1.2;
    height = Math.min(p_height, window.innerHeight - margin.top - margin.bottom - 20);

	var color = d3.scaleOrdinal().range(["#58D6C7","#CC333F","#00A0B0"]);
	
	var radarChartOptions = {
	  w: width,
	  h: height,
	  margin: margin,
	  maxValue: 0.5,
	  levels: 5,
	  roundStrokes: true,
	  color: color,
	  opacityCircles: 0.1
	};
	///////////////// 설정 끝
	
	$("#"+target+"ItemChart").empty();
	// center로
    $("#"+target+"ItemChart").css("text-align","center");
	
	var data = []; 	data[0] = p_data;
	
	 var cfg = {
	     w: 600,                //Width of the circle
	     h: 600,                //Height of the circle
	     margin: {top: 5, right: 20, bottom: 5, left: 20}, //The margins of the SVG
	     levels: 3,             //How many levels or inner circles should there be drawn
	     maxValue: 0,           //What is the value that the biggest circle will represent
	     labelFactor: 1.25,     //How much farther than the radius of the outer circle should the labels be placed
	     wrapWidth: 60,         //The number of pixels after which a label needs to be given a new line
	     opacityArea: 0.35,     //The opacity of the area of the blob
	     dotRadius: 4,          //The size of the colored circles of each blog
	     opacityCircles: 0.1,   //The opacity of the circles of each blob
	     strokeWidth: 2,        //The width of the stroke around each blob
	     roundStrokes: false,   //If true the area and stroke will follow a round path (cardinal-closed)
	     color: d3.scaleOrdinal(d3.schemeCategory10)    //Color function
	    };
	    //2020.10.21[신예리] 방사형 그래프 margin값 및 크기 수정 END
	    //Put all of the options into a variable called cfg
	    if('undefined' !== typeof radarChartOptions){
	      for(var i in radarChartOptions){
	        if('undefined' !== typeof radarChartOptions[i]){ cfg[i] = radarChartOptions[i]; }
	      }//for i
	    }//if

	    // 변경
	    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
	    var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){
	    		return Number(o.dt);
	    }))}));
	    
	    // 변경
	    var allAxis = (data[0].map(function(i, j){
	    			return i.cd_nm
	    	})), //Names of each axis
	        total = allAxis.length,                 //The number of different axes
	        radius = Math.min(cfg.w/2, cfg.h/2),    //Radius of the outermost circle
	        Format = d3.format(''),             //Percentage formatting
	        angleSlice = Math.PI * 2 / total;       //The width in radians of each "slice"

	    //Scale for the radius
	    var rScale = d3.scaleLinear()
	        .range([0, radius])
	        .domain([0, maxValue]);

	    /////////////////////////////////////////////////////////
	    //////////// Create the container SVG and g /////////////
	    /////////////////////////////////////////////////////////

	    //Remove whatever chart with the same id/class was present before
	    d3.select("#"+target+"ItemChart").select("svg").remove();

	    //Initiate the radar chart SVG
	    var svg = d3.select("#"+target+"ItemChart").append("svg")
	            .attr("width",  (cfg.w + cfg.margin.left + cfg.margin.right)*1.1)
	            .attr("height", cfg.h)
	            .attr("class", "radar"+"#"+target+"ItemChart");
	    //Append a g element        
	    var g = svg.append("g")
	            .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 - cfg.margin.top) + ")");

	    /////////////////////////////////////////////////////////
	    ////////// Glow filter for some extra pizzazz ///////////
	    /////////////////////////////////////////////////////////

	    //Filter for the outside glow
	    var filter = g.append('defs').append('filter').attr('id','glow'),
	        feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
	        feMerge = filter.append('feMerge'),
	        feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
	        feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	    /////////////////////////////////////////////////////////
	    /////////////// Draw the Circular grid //////////////////
	    /////////////////////////////////////////////////////////

	    //Wrapper for the grid & axes
	    var axisGrid = g.append("g").attr("class", "axisWrapper");

	    //Draw the background circles
	    axisGrid.selectAll(".levels")
	       .data(d3.range(1,(cfg.levels+1)).reverse())
	       .enter()
	        .append("circle")
	        .attr("class", "gridCircle")
	        .attr("r", function(d, i){return radius/cfg.levels*d;})
	        .style("fill", "#CDCDCD")
	        .style("stroke", "#CDCDCD")
	        .style("fill-opacity", cfg.opacityCircles)
	        .style("filter" , "url(#glow)");

	    //Text indicating at what % each level is
	    axisGrid.selectAll(".axisLabel")
	       .data(d3.range(1,(cfg.levels+1)).reverse())
	       .enter().append("text")
	       .attr("class", "axisLabel")
	       .attr("x", 4)
	       .attr("y", function(d){return -d*radius/cfg.levels;})
	       .attr("dy", "0.4em")
	       .style("font-size", "10px")
	       .attr("fill", "#737373")
	       .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	    /////////////////////////////////////////////////////////
	    //////////////////// Draw the axes //////////////////////
	    /////////////////////////////////////////////////////////

	    //Create the straight lines radiating outward from the center
	    var axis = axisGrid.selectAll(".axis")
	        .data(allAxis)
	        .enter()
	        .append("g")
	        .attr("class", "axis");
	    //Append the lines
	    axis.append("line")
	        .attr("x1", 0)
	        .attr("y1", 0)
	        .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
	        .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
	        .attr("class", "line")
	        .style("stroke", "#CDCDCD")
	        .style("stroke-width", "1px");

	    //Append the labels at each axis
	    axis.append("text")
	        .attr("class", "legend")
	        .style("font-size", "11px")
	        .attr("text-anchor", "middle")
	        .attr("dy", "0.35em")
	        .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
	        .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
	        .text(function(d){return d})
	        .call(wrap, cfg.wrapWidth);

	    /////////////////////////////////////////////////////////
	    ///////////// Draw the radar chart blobs ////////////////
	    /////////////////////////////////////////////////////////

	    //The radial line function
	    var radarLine = d3.radialLine()
	        .curve(d3.curveLinearClosed)
	        // 변경
	        .radius(function(d) {
	        		return rScale(d.dt);
	        })
	        .angle(function(d,i) {  return i*angleSlice; });

	    if(cfg.roundStrokes) {
	        radarLine.curve(d3.curveCardinalClosed);
	    }

	    //Create a wrapper for the blobs    
	    var blobWrapper = g.selectAll(".radarWrapper")
	        .data(data)
	        .enter().append("g")
	        .attr("class", "radarWrapper");



	    //Append the backgrounds    
	    blobWrapper
	        .append("path")
	        .attr("class", "radarArea")
	        .attr("d", function(d,i) { return radarLine(d); })
	        .style("fill", function(d,i) { return cfg.color(i); })
	        .style("fill-opacity", cfg.opacityArea)
	        .on('mouseover', function (d,i){
	            //Dim all blobs
	            d3.selectAll(".radarArea")
	                .transition().duration(200)
	                .style("fill-opacity", 0.1); 
	            //Bring back the hovered over blob
	            d3.select(this)
	                .transition().duration(200)
	                .style("fill-opacity", 0.7);    
	        })
	        .on('mouseout', function(){
	            //Bring back all blobs
	            d3.selectAll(".radarArea")
	                .transition().duration(200)
	                .style("fill-opacity", cfg.opacityArea);
	        });

	    //Create the outlines   
	    blobWrapper.append("path")
	        .attr("class", "radarStroke")
	        .attr("d", function(d,i) { return radarLine(d); })
	        .style("stroke-width", cfg.strokeWidth + "px")
	        .style("stroke", function(d,i) { return cfg.color(i); })
	        .style("fill", "none")
	        .style("filter" , "url(#glow)");        

	    //Append the circles
	    blobWrapper.selectAll(".radarCircle")
	        .data(function(d,i) { return d; })
	        .enter().append("circle")
	        .attr("class", "radarCircle")
	        .attr("r", cfg.dotRadius)
	        // 변경
	        .attr("cx", function(d,i){
	        		return rScale(d.dt) * Math.cos(angleSlice*i - Math.PI/2);
	        })
	        .attr("cy", function(d,i){
	        		return rScale(d.dt) * Math.sin(angleSlice*i - Math.PI/2);
	        })
	        .style("fill", "#058A9F") //2020.10.21[신예리] circle 컬러 값 지정
	        .attr("stroke", "#058A9F")
	        .attr("stroke-width", 8)
	        .attr("stroke-opacity", 0.2)
	        .style("fill-opacity", 0.8);

	    /////////////////////////////////////////////////////////
	    //////// Append invisible circles for tooltip ///////////
	    /////////////////////////////////////////////////////////

	    //Wrapper for the invisible circles on top
	    var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
	        .data(data)
	        .enter().append("g")
	        .attr("class", "radarCircleWrapper");

	    //Append a set of invisible circles on top for the mouseover pop-up
	    blobCircleWrapper.selectAll(".radarInvisibleCircle")
	        .data(function(d,i) { return d; })
	        .enter().append("circle")
	        .attr("class", "radarInvisibleCircle")
	        .attr("r", cfg.dotRadius*1.5)
	        // 변경
	        .attr("cx", function(d,i){
	        		return rScale(d.dt) * Math.cos(angleSlice*i - Math.PI/2);
	        })
	        .attr("cy", function(d,i){
	        		return rScale(d.dt) * Math.sin(angleSlice*i - Math.PI/2);
	        })
	        .style("fill", "none")
	        .style("pointer-events", "all")
	        .style("cursor", "pointer")
	        .on("mouseover", function(d,i) {
	        	$totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
         	  	$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
	        })
	        .on("click", function(d){
	        	$totSurvMain.ui.chartTarget = target+"ItemChart";
				$totSurvMain.ui.chartIndex = $(this).index();
				$totSurvMain.ui.chartData = d;
				$totSurvMain.ui.chartColor = "#576574";
				$totSurvMain.ui.chartTitle = d.surv_year+"년 "+d.cd_nm;
				$totSurvDetail2.ui.themaChartItmClick($(this), d, "#576574", d.surv_year+"년 "+d.cd_nm);
    		})
	        .on("mouseout", function(){
	        	tool.css("display", "none");
        		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
	        });

	    //Set up the small tooltip for when you hover over a circle
	    var tooltip = g.append("text")
	        .attr("class", "tooltip")
	        .style("opacity", 0);

	    /////////////////////////////////////////////////////////
	    /////////////////// Helper Function /////////////////////
	    /////////////////////////////////////////////////////////

	    //Taken from http://bl.ocks.org/mbostock/7555321
	    //Wraps SVG text    
	    function wrap(text, width) {
	      text.each(function() {
	        var text = d3.select(this),
	            words = text.text().split(/\s+/).reverse(),
	            word,
	            line = [],
	            lineNumber = 0,
	            lineHeight = 1.4, // ems
	            y = text.attr("y"),
	            x = text.attr("x"),
	            dy = parseFloat(text.attr("dy")),
	            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

	        while (word = words.pop()) {
	          line.push(word);
	          tspan.text(line.join(" "));
	          if (tspan.node().getComputedTextLength() > width) {
	            line.pop();
	            tspan.text(line.join(" "));
	            line = [word];
	            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	          }
	        }
	      });
	    }//wrap 
}

/**
 * @name         : setThemaPieChart 
 * @description  : 주제별 차트(파이)
 * @date         : 2020.10.28
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setThemaPieChart(data, target, resizeYn, height){
	var tool = $(".chartPoptoolTip");
	
	var margin = {top: 20, right: 100, bottom: 20, left: 100}
	var w = height*3, h = height; //width값 임시 (반응형 처리전)
	var graphData = [data.length];
	for (var i = 0; i < data.length; i++) {
		graphData[i] = data[i].dt;
		
	}
	
	var colorData = ["#21AEF1", "#FE5959", "#F28E2B", "#FFBE7D", "#F1CE63","#8BD17C","#B5982C", "#5BA151", "#499894", "#86BCB6", "#E15759", "#FF9D9A", "#79706E", "#BAB0AC", "#D37295", "#FABFD2", "#B07AA1", "#D4A6C8", "#9D7660", "#D7B5A6"];
	var pie = d3.pie();
	// 사이즈 조정
	var arc = d3.arc().innerRadius(60).outerRadius(90);
	 
	var svg = d3.select("#"+target+"ItemChart")
	    .append("svg")
	    .attr("width", w)
	    .attr("height", h)
	    .attr("id", "graphWrap");
	 
	var g = svg.selectAll(".pie")
	    .data(pie(graphData))
	    .enter()
	    .append("g")
	    .attr("class", "pie")
	    .attr("transform","translate("+w/2.5+","+h/2+")");
	
	 if(resizeYn == "Y"){
		 g.append("path")
		 	.attr("class", "eventGroup")
		    .on("mouseover", function(d, i){
		    	var toolData = data[i];
		    	$totSurvDetail2.ui.createChartTool(toolData.surv_year, toolData.cd_nm, numberFormat(toolData.dt), toolData.unit, tool, -20, -100);
	     	  	$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
		    })
		    .on("mouseout", function(d, i){
		    	$forestryDash.ui.chartMouseOut($(this), "#576574");
		    	tool.css('display', 'none');
		    })
		    .on("click", function(d, i){
		    	var toolData = data[i];
		    	$totSurvMain.ui.chartTarget = target+"ItemChart";
				$totSurvMain.ui.chartIndex = $(this).parent().index();
				$totSurvMain.ui.chartData = toolData;
				$totSurvMain.ui.chartColor = "#576574";
				$totSurvMain.ui.chartTitle = toolData.surv_year+"년 "+toolData.cd_nm;
				$totSurvDetail2.ui.themaChartItmClick($(this), toolData, "#576574", toolData.surv_year+"년 "+toolData.cd_nm);
    		})
		    .attr("fill", function(d, i) {
		        return colorData[i];
		    }) 
		    .transition()
		    .duration(0)
		    .attrTween("d", function(d, i) { 
		        var interpolate = d3.interpolate(
		            {startAngle : d.startAngle, endAngle : d.startAngle}, 
		            {startAngle : d.startAngle, endAngle : d.endAngle} 
		        );
		        return function(t){
		            return arc(interpolate(t)); 
		        }
		    });
	 } else {
		 g.append("path")
		   .attr("class", "eventGroup")
		   .attr("style", "cursor:pointer;")
		    .on("mouseover", function(d, i){
		    	var toolData = data[i];
		    	$totSurvDetail2.ui.createChartTool(toolData.surv_year, toolData.cd_nm, numberFormat(toolData.dt), toolData.unit, tool, -20, -100);
	     	  	$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
		    })
		    .on("mouseout", function(d, i){
		    	tool.css('display', 'none');
		    	$forestryDash.ui.chartMouseOut($(this), "#576574");
		    })
		    .on("click", function(d, i){
		    	var toolData = data[i];
		    	$totSurvMain.ui.chartTarget = target+"ItemChart";
				$totSurvMain.ui.chartIndex = $(this).parent().index();
				$totSurvMain.ui.chartData = toolData;
				$totSurvMain.ui.chartColor = "#576574";
				$totSurvMain.ui.chartTitle = toolData.surv_year+"년 "+toolData.cd_nm;
				$totSurvDetail2.ui.themaChartItmClick($(this), toolData, "#576574", toolData.surv_year+"년 "+toolData.cd_nm);
    		})
		    .attr("fill", function(d, i) {
		        return colorData[i];
		    }) 
		    .transition()
		    .duration(500)
		    .delay(function(d, i) { 
		        return i * 500;
		    })
		    .attrTween("d", function(d, i) { 
		        var interpolate = d3.interpolate(
		            {startAngle : d.startAngle, endAngle : d.startAngle}, 
		            {startAngle : d.startAngle, endAngle : d.endAngle} 
		        );
		        return function(t){
		            return arc(interpolate(t)); 
		        }
		    });
	 }
	 
	 var dtMax = d3.max(data, function(d){return Number(d.dt)});
	 
	 svg.append("text")
	    .attr("class", "total")
	    .attr("transform", "translate("+(w/2.5-(dtMax+"").length*6)+", "+(h/2+5)+")")
	    .text("합계:" + numberFormat(d3.sum(graphData)));
	
	svg.append("g")
		.selectAll("circle")
		.data(data)
		.join("circle")
		.attr("cx", function(d, i){ return w - margin.left*1.9 - 10} )
		.attr("cy", function(d, i){ return i*25 + 80})
		.attr("r", 4)
		.attr("fill", function(d, i){return colorData[i];})
		
	svg.append("g")
		.selectAll("text")
		.data(pie(data))
		.join("text")
		.attr("x", function(d, i){ return w - margin.left*1.9} )
		.attr("y", function(d, i){ return i*25 + 85 })
		.text(function(d, i) {
			return data[i].cd_nm + " : " + numberFormat(graphData[i]);
	    })
}

/**
 * @name         : setTmsresChart 
 * @description  : 시계열 차트
 * @date         : 2020.10.16
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setTmsresChart(data, target, resizeYn, height){
	if(data.length == 0){
		return;
	}	
	
	// 증감율 계산
	for(var i=0; i < data.length; i++){
		if(i == 0){
			data[0].incORdec = '0';
			continue;
		}
		var temp = data[i].dt - data[i-1].dt;
		data[i].incORdec = temp/data[i-1].dt*100;
	}
	
	$("#"+target+"TimeChart").empty();
	var width = $("#"+target+"TimeChart").outerWidth();
		
	var tool = $(".chartCommontoolTip");
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	
	//기본셋팅
	var margin = ({top: 50, right: 50, bottom: 20, left: 50}) //20201027 박은식 margin.left 변경 //20201204 박은식 top 수정
	var color = ["5058b8", "7A82D4", "9AA1E9", "BFC5F7", "DFE2FB"];
	
	var x = d3.scaleBand()
              .domain(data.map(function(d){ return d.surv_year }))
              .rangeRound([margin.left+margin.top, width-margin.left])//20201027 박은식 rangeRound 범위 변경
              .padding(0.5);
	var max = d3.max(data, function(d){ return Number(d.dt) })
	var min = d3.min(data, function(d){ return Number(d.dt) });
	var calVal = max-min;
	var domainChangeRatio = 0;
	if(0<=calVal && calVal <1000){
		domainChangeRatio = 0.4;
	} else if(1000<=calVal && calVal<10000) {
		domainChangeRatio = 0.3;
	} else if(10000<=calVal && calVal<100000) {
		domainChangeRatio = 0.2;
	} else if(100000<=calVal && calVal<1000000){
		domainChangeRatio = 0.02;
	} else {
		domainChangeRatio = 0.02;
	}
	
	max = max*(1+domainChangeRatio); // 도메인MAX값 재계산
	min = min*(1-domainChangeRatio); // 도메인MIN값 재계산
	
	var y1 = d3.scaleLinear()
				.domain([min, max])
			   .rangeRound([height - margin.bottom, margin.top]);
	var y2 =  d3.scaleLinear()
				.domain([d3.min(data, function(d){ return Number(d.incORdec)}), d3.max(data, function(d){return Number(d.incORdec)})]).nice()
				.rangeRound([height - margin.bottom, margin.top]);
	
	var line = d3.line().x(function(d){ return (x(d.surv_year) + (Number(x.bandwidth()) / 2))})
						.y(function(d){ return y2(d.incORdec) });

	var xAxis = function(g){ return g.attr("transform", "translate("+0 +","+(height - margin.bottom)+")")
									 .call(d3.axisBottom(x)
						            		 .tickFormat(function(i){ return i })
						            		 .tickSizeOuter(0)) 
				}
	var y1Axis = function(g){ return g.attr("transform", 'translate('+margin.left+',0)')
									  .style("color", "steelblue")
          							    .call(d3.axisLeft(y1).ticks(4, "s"))
          							    .call(function(g){ return g.select(".domain").remove() })
          							    .call(function(g){ return g.append("text")
          														 .attr("x", -margin.left)
          														  .attr("y", 10)
          														  .attr("fill", "#878A89")
          														  .attr("text-anchor", "start")
          														  .attr("font-size", "15")
          														  .text(data.y1) })
  				}
	var y2Axis = function(g){ return g.attr("transform", 'translate('+(width-margin.left+10)+',0)') //20201027 박은식 x좌표 변경
            						  .call(d3.axisRight(y2).ticks(5).tickFormat(function(d){return d+"%"}))
            						  .call(function(g){return g.select(".domain").remove() })
            						  .call(function(g){return g.append("text")
            													 .attr("x", margin.right)
            													 .attr("y", 10)
            													 .attr("fill", "#878A89")
            													 .attr("text-anchor", "end")
            													 .attr("font-size", "15")
            													 .text(data.y2) })
  				}
	//타겟설정
	const chart = d3.select("#"+target+"TimeChart");

	//차트 renderer시작
	const svg = chart.append("svg")
         			 .attr("height", height)
         			 .attr("width", width);
	
	
	if(resizeYn == "Y"){
		svg.append("g")
		.attr("fill-opacity", 0.8)
		  .selectAll("rect")
		  .data(data)
		  .join("rect")
		  .attr("class", "eventGroup")
		.attr("value", function(d){ return d.surv_year } )
		.on('mouseover', function(d){
			$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
			$totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
		})
		.on('mouseout', function(){
			$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			tool.css("display", "none");
		})
		.attr("fill", function(d){ //최고값기준으로 해당하는 %에 맞게 색상을 지정
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
		.attr("x", function(d){ return x(d.surv_year) })
		.attr("width", x.bandwidth())
		.attr("color", function(d){ //mouseout event에 사용될 변수
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
        .attr("height",  function(d) {return y1(0) - y1(Number(d.dt-min)) })
		.attr("y", function(d){ return y1(Number(d.dt)) })
        //이벤트
		
		//path를 생성하여 변수에 담음
		var path = svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#97BB03")
			.attr("stroke-miterlimit", 2)
			.attr("stroke-width", 2)
			.attr("d", line)
			
		//path의 총 길이를 계싼
		var totalLength;
		if(path.node() != null) {		
			totalLength = path.node().getTotalLength();	
			
			path.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)	
				.transition()
			    .duration(1200)
			    .ease(d3.easeLinear)
			    .attr('stroke-dashoffset', 0)
		}
	} else {
		svg.append("g")
		.attr("fill-opacity", 0.8)
		  .selectAll("rect")
		  .data(data)
		  .join("rect")
		  .attr("class", "eventGroup")
		.attr("value", function(d){ return d.surv_year } )
		.on('mouseover', function(d){
			$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
			$totSurvDetail2.ui.createChartTool(d.surv_year, d.cd_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
		})
		.on('mouseout', function(){
			$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			tool.css("display", "none");
		})
		.attr("fill", function(d){ //최고값기준으로 해당하는 %에 맞게 색상을 지정
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
		.attr("x", function(d){ return x(d.surv_year) })
		.attr("width", x.bandwidth())
		.attr("color", function(d){ //mouseout event에 사용될 변수
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
		  .transition()
          .duration(1250)
          .delay(function (d, i) {
        			return i * 50;
          })
        .attr("height",  function(d) {return y1(0) - y1(Number(d.dt-min)) })
		.attr("y", function(d){ return y1(Number(d.dt)) })
        //이벤트
		
		//path를 생성하여 변수에 담음
		var path = svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#97BB03")
			.attr("stroke-miterlimit", 2)
			.attr("stroke-width", 2)
			.attr("d", line)
			
		//path의 총 길이를 계싼
		var totalLength;
		if(path.node() != null) {		
			totalLength = path.node().getTotalLength();	
			
			path.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)	
				.transition()
			    .duration(1200)
			    .ease(d3.easeLinear)
			    .attr('stroke-dashoffset', 0)
		}
	}

	svg.append("g")
		.attr("style", "pointer-events: none;")
		  .selectAll("circle")
		  .data(data)
		  .join("circle")
		.on("mouseover", function(d){
			$totSurvDetail2.ui.createChartTool(d.surv_year, "증감율", (d.incORdec == 0) ? "-" : d.incORdec.toFixed(2), (d.incORdec == 0) ? "" : "%", tool, -20, -90);
		})
		.on("mouseout", function(){
			tool.css("display", "none");
		})
		.attr("fill", "#fff")
		.attr("stroke", "#97BB03")
		.attr("stroke-width", 2)
		.attr("style", "pointer-events: all;")
		.attr("cx", function(d){ return x(d.surv_year) + x.bandwidth() / 2 })
		.attr("cy", function(d){ return y2(d.incORdec) })
		.attr("r", 4);

	svg.append("g")
	   .attr("fill", "none")
	   .attr("pointer-events", "all")
	   .attr("style", "pointer-events: none;")
	     .selectAll("rect")
	     .data(data)
	     .join("rect")
	   .attr("x", function(d){ return x(d.surv_year) })
	   .attr("width", x.bandwidth())
	   .attr("y", 0)
	   .attr("height", height);


	  svg.append("g").attr("style", "font-size:12px;")
		.selectAll("text")
		.data(data)
		.join("text")
		.attr("style", "pointer-events: none;")
		.attr("id", "chartData")
		.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(d.surv_year)+ x.bandwidth() / 2})
		.attr("y", function(d) { return y1(Number(d.dt))-10 })
		.text( function(d){ return d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,",") })
	
	svg.append("g")
		.attr("style", "font-size: 12px;")
		.call(xAxis);

	svg.append("g")
		.attr("style", "font-size: 11px;")
		.call(y1Axis);

	svg.append("g")
		.attr("style", "font-size: 11px;")
		.call(y2Axis);	
	
	d3.selectAll("#textG>g>text").attr("id","textRange");
	$("#textRange").after("<text>%</text>");
	$("#"+target+"TimeChart").find("text").attr("fill", "#878A89");
}

/**
 * @name         : setUpperAreaChart 
 * @description  : 상위지역비교 차트
 * @date         : 2020.10.20
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setUpperAreaChart(data, target, resizeYn, height){
	var margin = ({top: 20, right: 10, bottom: 20, left: 75})

  	$("#"+target+"UpperAreaChart").empty();
	var width = $("#"+target+"UpperAreaChart").outerWidth();
  
	var tool = $(".chartCommontoolTip");
	
	var colors = ["#D81D62", "#fc2862", "#FD5D79", "#FE7D87", "#FEAAA8","#FED8D3"];
	
	var x = d3.scaleBand()
		.domain(d3.range(data.length))
		.range([margin.top+20, width])
		.padding(0.5)
	
	var y = d3.scaleLinear()
						.domain([0, d3.max(data, function(d){ return Number(d.dt)*1.2 })])
						.rangeRound([height - margin.bottom, margin.top])

  var xAxis = function(g){ return g.data(data)
	  			.attr("transform", 'translate(0,'+(height - margin.bottom)+')')
				.call(d3.axisBottom(x).tickFormat(function(i){ return data[i].region_nm }).tickSizeOuter(0))
  			  }
	
  var yAxis = function(g){ return g
				.attr("transform", 'translate('+(margin.left-30)+',0)')
				.call(d3.axisLeft(y).ticks(4, "s"))//20201028 박은식 도메인 포멧 변경
				.call(function(g){ return g.select(".domain").remove() })
				.call(function(g){ return g.append("text")
						.attr("x", 0)
						.attr("y", 10)
						.attr("fill", "steelblue")
						.attr("font-family", "NanumSquare")
						.attr("text-anchor", "start")
						.text(data.x)})
			  } 

  const chart = d3.select("#"+target+"UpperAreaChart");
  const svg = chart
         .append("svg")
         .attr("height", height)
         .attr("width", width)
        
         
         if(resizeYn == "Y"){
        	 svg.append("g")
             .selectAll("rect")
             .data(data)
             .join("rect")
             .attr("class", "eventGroup")
             .attr("fill", function(d){
            	 var color = '';
            	 if(d.region_cd.length == 2){
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd.substring(0,2)) ?  "#637FF2" : "#54D1D1";
            	 } else {
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd.substring(0,4)+"0") ?  "#637FF2" : "#54D1D1";
            	 }
            	 return color })
         	 .on("mouseover", function(d){
         		$totSurvDetail2.ui.createChartTool(d.surv_year, d.region_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
         		$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
         	 })
         	 .on("mouseout", function(){
         		 tool.css("display", "none");
         		$(this).attr("fill", "#F6BF29")
         		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			 })
             .attr("x", function(d, i){ return x(i) })
             .attr("width", (x.bandwidth()))
             .attr("y", function(d){ return y(0) })
             .attr("height",  function(d) {return y(0) - y(Number(d.dt)) })
     		.attr("y", function(d){ return y(Number(d.dt)) })
         } else {
        	 svg.append("g")
             .selectAll("rect")
             .data(data)
             .join("rect")
             .attr("class", "eventGroup")
             .attr("fill", function(d){
            	 var color = '';
            	 if(d.region_cd.length == 2){
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd.substring(0,2)) ?  "#637FF2" : "#54D1D1";
            	 } else {
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd.substring(0,4)+"0") ?  "#637FF2" : "#54D1D1";
            	 }
            	 return color })
              .on("mouseover", function(d){
            	  $totSurvDetail2.ui.createChartTool(d.surv_year, d.region_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
            	  $totSurvDetail2.ui.chartMouseOver($(this), "#576574");
         	 })
         	 .on("mouseout", function(){
         		 tool.css("display", "none");
         		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			 })
             .attr("x", function(d, i){ return x(i) })
             .attr("width", (x.bandwidth()))
             .attr("y", function(d){ return y(0) })
     		.transition()
               .duration(2000)
               .delay(function (d, i) {
             			return i * 25;
               })
             .attr("height",  function(d) {return y(0) - y(Number(d.dt)) })
     		.attr("y", function(d){ return y(Number(d.dt)) })
         }
         
  svg.append("g").attr("style", "color:#878A89; font-size:11px;")
	.selectAll("text")
	.data(data)
	.join("text")
	.attr("id", "chartData")
	.attr("text-anchor", "middle")
	.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
	.attr("y", function(d) { return y(Number(d.dt))-10 })
	.text( function(d){ return d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,",") })

    svg.append("g")
    	.attr("style", "font-size: 12px;")
    	.call(xAxis);
	  
  	svg.append("g")
  		.attr("style", "font-size: 12px;")
  		.attr('id', target+'domain')
  		.call(yAxis);
	
	var dtMax = d3.max(data, function(d){ return Number(d.dt) });
	var dtAve = Number($totSurvDetail2.ui.upperAreaAvgDt[target]);
	
	var xAxis1 = function(g){ return g.data(data)
		.attr("transform", 'translate(0,'+y(Number(dtAve))+')')
		.attr("id", target+"UpperxAxis1_1")
		.call(d3.axisBottom(x).tickFormat(function(i){ return ""}).tickSizeOuter(0))
	  }
	
	var xAxisEvent = function(g){ return g.data(data)
		.attr("transform", 'translate(0,'+y(Number(dtAve))+')')
		.attr("id", target+"UpperxAxis1")
		.on("mouseover", function(d){
			$(this).css("opacity", "0.3");
			$totSurvDetail2.ui.createChartTool(d.surv_year, "평균", $totSurvDetail2.ui.upperAreaAvgDt[target].replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
		})
		.on("mouseout", function(){
			$(this).css("opacity", "0");
     		 tool.css("display", "none");
		 })
		.call(d3.axisBottom(x).tickFormat(function(i){ return ""}).tickSizeOuter(0))
	  }
  
	svg.append("g")
     .call(xAxis1);	
	svg.append("g")
     .call(xAxisEvent);
	
	$("#"+target+"UpperxAxis1").attr("style", "stroke-width:10px; opacity:0;");
	$("#"+target+"UpperxAxis1_1").find("path").attr("stroke", "#F10C8E");
	$("#"+target+"UpperxAxis1").find("path").attr("stroke", "#F10C8E");
	
	$("#"+target+"UpperAreaChart").find("line").remove();
	$("#"+target+"UpperAreaChart").find("text").attr("style", "color:#878A89");
	$("#"+target+"UpperAreaChart").find("path").attr("style", "color:#878A89");
}

/**
 * @name         : setAreaRankChart 
 * @description  : 지역비교 차트
 * @date         : 2020.10.20
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setAreaRankChart(data, target, resizeYn, height){
	
	var margin = ({top: 20, right: 10, bottom: 20, left: 75})

  	$("#"+target+"AreaChart").empty();
	var width = $("#"+target+"AreaChart").outerWidth();
  
	var tool = $(".chartCommontoolTip");
	
	var colors = ["#D81D62", "#fc2862", "#FD5D79", "#FE7D87", "#FEAAA8","#FED8D3"];
	
	var x = d3.scaleBand()
		.domain(d3.range(data.length))
		.range([margin.top+20, width])
		.padding(0.5)
	
	var y = d3.scaleLinear()
						.domain([0, d3.max(data, function(d){ return Number(d.dt)*1.2 })])
						.rangeRound([height - margin.bottom, margin.top])

  var xAxis = function(g){ return g.data(data)
	  			.attr("transform", 'translate(0,'+(height - margin.bottom)+')')
				.call(d3.axisBottom(x).tickFormat(function(i){
					if($totSurvDetail2.ui.isAtdrc == true){
						return data[i].region_nm.substring(data[i].region_nm.indexOf(" "));
					} else {
						return data[i].region_nm						
					}
					}).tickSizeOuter(0))
  			  }
	
  var yAxis = function(g){ return g
				.attr("transform", 'translate('+(margin.left-30)+',0)')
				.call(d3.axisLeft(y).ticks(4, "s"))//20201028 박은식 도메인 포멧 변경
				.call(function(g){ return g.select(".domain").remove() })
				.call(function(g){ return g.append("text")
						.attr("x", 0)
						.attr("y", 10)
						.attr("fill", "steelblue")
						.attr("font-family", "NanumSquare")
						.attr("text-anchor", "start")
						.text(data.x)})
			  } 

  const chart = d3.select("#"+target+"AreaChart");
  const svg = chart
         .append("svg")
         .attr("height", height)
         .attr("width", width)
        
         
         if(resizeYn == "Y"){
        	 svg.append("g")
             .selectAll("rect")
             .data(data)
             .join("rect")
             .attr("class", "eventGroup")
             .attr("fill", function(d){
            	 var color = '';
            	 if(d.region_cd.length == 2){
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd.substring(0,2)) ?  "#637FF2" : "#54D1D1";
            	 } else {
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd) ?  "#637FF2" : "#54D1D1";
            	 }
            	 return color })
         	 .on("mouseover", function(d){
         		$totSurvDetail2.ui.createChartTool(d.surv_year, d.region_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
         		$totSurvDetail2.ui.chartMouseOver($(this), "#576574");
         	 })
         	 .on("mouseout", function(){
         		 tool.css("display", "none");
         		$(this).attr("fill", "#F6BF29")
         		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			 })
             .attr("x", function(d, i){ return x(i) })
             .attr("width", (x.bandwidth()))
             .attr("y", function(d){ return y(0) })
             .attr("height",  function(d) {return y(0) - y(Number(d.dt)) })
     		.attr("y", function(d){ return y(Number(d.dt)) })
         } else {
        	 svg.append("g")
             .selectAll("rect")
             .data(data)
             .join("rect")
             .attr("class", "eventGroup")
             .attr("fill", function(d){
            	 var color = '';
            	 if(d.region_cd.length == 2){
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd.substring(0,2)) ?  "#637FF2" : "#54D1D1";
            	 } else {
            		 color = (d.region_cd == $totSurvDetail2.ui.admCd) ?  "#637FF2" : "#54D1D1";
            	 }
            	 return color })
              .on("mouseover", function(d){
            	  $totSurvDetail2.ui.createChartTool(d.surv_year, d.region_nm, d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
            	  $totSurvDetail2.ui.chartMouseOver($(this), "#576574");
         	 })
         	 .on("mouseout", function(){
         		 tool.css("display", "none");
         		$totSurvDetail2.ui.chartMouseOut($(this), "#576574");
			 })
             .attr("x", function(d, i){ return x(i) })
             .attr("width", (x.bandwidth()))
             .attr("y", function(d){ return y(0) })
     		.transition()
               .duration(2000)
               .delay(function (d, i) {
             			return i * 25;
               })
             .attr("height",  function(d) {return y(0) - y(Number(d.dt)) })
     		.attr("y", function(d){ return y(Number(d.dt)) })
         }
         
  svg.append("g").attr("style", "color:#878A89; font-size:12px;")
	.selectAll("text")
	.data(data)
	.join("text")
	.attr("id", "chartData")
	.attr("text-anchor", "middle")
	.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
	.attr("y", function(d) { return y(Number(d.dt))-10 })
	.text( function(d){ return d.dt.replace(/\B(?=(\d{3})+(?!\d))/g,",") })

    svg.append("g")
    	.attr("style", "font-size: 12px;")
    	.call(xAxis);
	  
  	svg.append("g")
  		.attr("style", "font-size: 12px;")
  		.attr('id', target+'domain')
  		.call(yAxis);
	
	var dtMax = d3.max(data, function(d){ return Number(d.dt) });
	var dtAve = Number($totSurvDetail2.ui.areaAvgDt[target]);
	
	var xAxis1 = function(g){ return g.data(data)
		.attr("transform", 'translate(0,'+y(dtAve)+')')
		.attr("id", target+"xAxis1_1")
		.call(d3.axisBottom(x).tickFormat(function(i){ return ""}).tickSizeOuter(0))
	  }
	
	var xAxisEvent = function(g){ return g.data(data)
		.attr("transform", 'translate(0,'+y(dtAve)+')')
		.attr("id", target+"xAxis1")
		.on("mouseover", function(d){
			$(this).css("opacity", "0.3");
			$totSurvDetail2.ui.createChartTool(d.surv_year, "평균", $totSurvDetail2.ui.areaAvgDt[target].replace(/\B(?=(\d{3})+(?!\d))/g,","), d.unit, tool, -20, -100);
		})
		.on("mouseout", function(){
			$(this).css("opacity", "0");
     		 tool.css("display", "none");
		 })
		.call(d3.axisBottom(x).tickFormat(function(i){ return ""}).tickSizeOuter(0))
	  }
  
	svg.append("g")
     .call(xAxis1);
	svg.append("g")
     .call(xAxisEvent);
	
	$("#"+target+"xAxis1").attr("style", "stroke-width:10px; opacity:0;");
	$("#"+target+"xAxis1_1").find("path").attr("stroke", "#F10C8E");
	$("#"+target+"xAxis1").find("path").attr("stroke", "#F10C8E");
	
	$("#"+target+"AreaChart").find("line").remove();
	$("#"+target+"AreaChart").find("text").attr("style", "color:#878A89");
	$("#"+target+"AreaChart").find("path").attr("style", "color:#878A89");
}
