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
	W.$houseDash = W.$houseDash || {};
	W.$houseMap = W.$houseMap || {};
	W.$totSurvMap = W.$totSurvMap || {};
	
	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$houseDash.isDev = true;
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
	
	$houseDash.ajax = {};
	$houseDash.chartsOption = {};
//	$houseDash.chartsOption.color = ["#f08246", "#009589"];
	$houseDash.chartsOption.color =["#D55905", "#DF7800", "#F6992D", "#FDB863", "#FFD095","#FFD095","#FFE6C4","#FFEFD6","#FFE6C4"];
	$houseDash.treemap;
	$houseDash.kosis_result_data = [];
	
	$houseDash.selectedChartSno = 1;
	$houseDash.selectedItmId = "T10,T20";
	$houseDash.selectedCategory = "";
	
	//현재 그려진 d3의 데이터를 담는 변수
	$houseDash.currentData = {};
	$houseDash.beforeData = {};
	
	$houseDash.emptyHouse = {};
	$houseDash.kindHouseData = {};
	$houseDash.timeEmptyHouse = {};
	$houseDash.countRoomData = {};
	//현재 그려진 d3의 데이터를 담는 변수
	
	//현재 조회하고있는 rank 지역 level
	$houseDash.regionLevel = 'sido';
	//행정시도 정보를 담아둔다
	$houseDash.atdrc = '';	
	//비자치구에서 행정시로 이동여부
	$houseDash.upperBack = false;
	//연령분포 폴리곤 클릭 시 단위 변경을 위한 기준 변수 
	$houseDash.polygonSelectArea = "";	
	
	
	$(document).ready(function() {
		Highcharts.setOptions({
		    lang: {
		        numericSymbols: null //otherwise by default ['k', 'M', 'G', 'T', 'P', 'E']
		    }
		});
	});
	
	//d3 반응형 이벤트
	$(window).resize( function(){
		if($totSurvMain.ui.pageIndex == '3'){
			
		}
	});
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {
		//chart resize
		if($totSurvMain.ui.pageIndex == '3' && !$(".mapExport").hasClass('on')){
			/*
			setHouseChart($houseDash.emptyHouse,"countRoomChart","Y", "140"); //20210226 박은식 차트 위치변경
			
			setHouseChart($houseDash.kindHouseData,"kindHouseChart","Y", "140");
			
			if($houseDash.countRoomData != null && $houseDash.countRoomData != undefined){
				setHouseChart($houseDash.countRoomData,"emptyHoseChart","Y", "140"); //20210226 박은식 차트 위치변경
			}
			*/
			//timeEmptyHouseChart($houseDash.timeEmptyHouse2, "houseTimeChart", "Y", "180");
		}
		//map resize
		if($(".mapExport").hasClass('on')){
			$(".col-SubL").width($(window).width()-430);
			$(".col-SubL").height("825px"); 
			
			// 최초지도
			$("#worldMap").width("1480px");
			$("#worldMap").height("800px"); 
							
			$("#mapArea").width($(window).width()-430);
			$("#mapArea").height("800px"); 
			
			// 맵 사이즈
			$('#mapRgn_1').width($(window).width()-430);
			$('#mapRgn_1').height("800px");
		}
		
		if($totSurvMain.ui.chartTarget != ""
			&& typeof($totSurvMain.ui.chartIndex) == "number"
			&& $totSurvMain.ui.chartColor != ""){
			 
			$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
		}
	});

	$houseDash.const = {},
	$houseMap.ui = {
			//kosisApi 2021-08-10 [이영호] api 변수 추가
			selectedPrdDe: "",		// 년도
			selectedOrgId: "",		// 조직코드
			selectedTblId: "",		// 통계표ID
			selectedChrItmId: "",	// 항목코드
			selectedAdmCd: "",		// 지역코드
			selectedItmLv1 : "", 	// 선택한 l1
			selectedItmLv2 : "", 	// 선택한 l2
			selectedItmLv3 : "", 	// 선택한 l3
			selectedItmLv4 : "", 	// 선택한 l4
			selectedItmLv5 : "", 	// 선택한 l5
			category : "", 			// 카테고리
			orderby : "",			// 정렬기준
			totTms : [],			// 데이터 수집년도 리스트
			
			/**
			 * checkIsAtdrc
			 * 비자치구 여부 체크 
			 * admCd
			 */
			
				checkIsAtdrc : function(admCd){
					$houseMap.ui.isAtdrc = false;
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
								$houseMap.ui.isAtdrc = res.result.rslt;
							}
						});
						
					}
					else{
						$houseMap.ui.isAtdrc = false;
					}
				}	
			
	}
	
	$totSurvMap.ui = {
			map : null,
			namespace : "totSurvMap",
			searchBtnType : "normal",
			mapList : [],
			curBtnId : '',
			curMapId : 0,
			isInnerMapShow : false,
			curDropParams : [],
			combinePopup : null,
			buildPopup : null,
			reportPopup : null,
			dropBtnInfo : [],
			dataTypeList : [],
			tutoIndex : 0,
			selectedObj : "", // 선택한 객체(차트의 경우 rect)
			selectedSurvId : "",// 선택한 지표id
			selectedItmCd : "", // 선택한 itm_cd
			selectedC1 : "", 	// 선택한 c1
			selectedC2 : "", // 선택한 c2
			selectedC3 : "", // 선택한 c3
			prevZoom : "1", 	// 지도 이동 이벤트에서 드래그를 막기위한 이전 줌 변수 
			isAtdrc : false,	// 비자치구 여부  (ex 수원시 (5자리) 클릭시 구정보 조회) / census 조회시 true면 5자리라도 조회 안하도록
			
			tempTilePerColor : "",
			//데이터
			mapData : null,
			mapStatsData : {}, // 통계정보 저장
			mapRegionData : {}, // 지역경계 저장
			mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
			mapType : "", // 지도유형 color, bubble, heat, poi, grid
			mapToggleId : "", // 맵 토글 id, 슬라이드 이동시에도 하이라이트 처리를 위해 사용
			mapTempColor : "", // 하이라이트를 위한 맵 임시 칼라
			tileTempColor : "", // 타일맵 하이라이트를 위한 임시 칼라 //2020-11-04 [곽제욱] 타일맵 하이라이트 처리를 위한 변수 추가 
			chartToggle : "", // 차트 토글 id가 들어감
			chartToggleYn : "N",
			mapTotalVal : 0, // 2020-11-17 [곽제욱] 맵 total값을 위한 변수 추가
			
			/**
			 * 지도데이터 초기화
			 */
			clearLayer: function() {// used
				$totSurvMain.ui.log("$totSurvMap.ui.clearLayer - begin");

				var map = this.mapList[this.curMapId];
				map.clearLayer();
			}
	}

	
	$houseDash.ui = {
		//selectedArea : '', // 선택한 지역
		//데이터
		totSurvInfoData : {}, // 총조사 시각화 정보 저장
		dispOptions: {},		// 사용자정의 화면
		
		/**
		 * @name         : init 
		 * @description  : 최초 화면을 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		init : function(){
			//content 영역에 인총화면 추가
			//20201120 박은식 초기화 추가 START
			$totSurvMain.ui.selectedArea = "00";
			$totSurvMain.ui.chartSaveClear();
		//	$totSurvMap.ui.selectedSurvId = "PH0001";
		//	$totSurvMap.ui.selectedItmCd = "T310";
			$houseMap.ui.selectedChrItmId = "T10,T20,T21,T22,T23,T30,T40,T50,T60";
			//$totSurvMain.ui.selectedYear = "2020";
			//20201120 박은식 초기화 추가 END
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/houseDash/main");
		},
		
		ready : function(){
			var level = "";
			if(gv_sido_cd!=null && gv_sido_cd!=""){
				level = 1;
				$totSurvMain.ui.selectedArea = gv_sido_cd;
				if(gv_sgg_cd != null && gv_sgg_cd !=""){
					level = 2;
				}
			}
			if($totSurvMain.ui.selectedArea==""){
				$totSurvMain.ui.selectedArea = "00";
			}
			
			// 2020-11-02 [곽제욱] url parameter 추가로 인한 로직 START
			
			$houseMap.ui.selectedOrgId = '101';
			$houseDash.selectedItmId = "00";									//전산업
			$houseDash.ajax.params = {			
				surv_year_list: $totSurvMain.ui.selectedYear				// 수록시점
				, org_id_list: $houseMap.ui.selectedOrgId					// 조직번호
				, tbl_id_list: $houseMap.ui.selectedTblId					// 통계표 ID
				, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
				, char_itm_id_list: $houseMap.ui.selectedChrItmId			// 표특성항목
				, prt_type: ""												// 출력방식 total:계 else 모두
				, adm_cd: $houseMap.ui.selectedAdmCd						// 지역코드
				, ov_l1_list: $houseMap.ui.selectedItmLv1					// 항목 1
				, ov_l2_list: $houseMap.ui.selectedItmLv2					// 항목 2
				, ov_l3_list: $houseMap.ui.selectedItmLv3					// 항목 3
				, ov_l4_list: $houseMap.ui.selectedItmLv4					// 항목 4
				, ov_l5_list: $houseMap.ui.selectedItmLv5					// 항목 5
				, category: $houseMap.ui.category							// 카테고리
				, odr_col_list: "DTVAL_CO"									// 정렬기준
				, odr_type: "DESC"											// 내림차순, 오름차순
			}			
			$houseDash.event.setDefaultParams($totSurvMain.ui.selectedYear);
			$houseDash.event.setDispOptions();
			
		//	$totSurvLeft.ui.selectTms();
			//$houseDash.ui.getRankSet("", "", "00");
			//$houseDash.ui.drawContent();
			$houseDash.event.allChange($totSurvMain.ui.selectedArea, "1");
			
			$("#itmDiv").css("display", "inline");
			$("#itmDiv").html($totSurvMain.ui.selectedYear + "년 총 주택 수");
			
			$($("div[class*=col-SubDiv]").not("div[class*=col-SubDivWrap]")[0]).css("border", "medium #aaa solid");	// 사업체수, 종사자수, 매출액, 영업이익률 선택 초기화
			

		},
		
		/**
		 * @name         : clear
		 * @description  : 인구총조사 depth 변화시마다 화면 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		clear : function(){
			//20201120 박은식 초기화 추가 START
			$totSurvMain.ui.chartSaveClear();
			$totSurvMap.ui.selectedSurvId = "PH0001";
			$totSurvMap.ui.selectedItmCd = "T310";
			//20201120 박은식 초기화 추가 END
			//chart Data 초기화
			$houseDash.emptyHouse = {};
			$houseDash.kindHouseData = {};
			$houseDash.timeEmptyHouse = {};
			$houseDash.countRoomData = {};
			$houseDash.timeEmptyHouse = {};
			//차트 초기화
			$("#emptyHoseChart").empty();
			$("#kindHouseChart").empty();
			$("#countRoomChart").empty();
			$("#houseTimeChart").empty();
		},
		
		
		drawContent : function(surv_id, itm_cd, c1, c2){
			
			if(surv_id == null|| surv_id == "" || surv_id == undefined){
				$totSurvMap.ui.selectedSurvId = "PH0001"; // 인구같은경우 디폴트
			} else {
				$totSurvMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트
				
			}
			
			if(itm_cd==null||itm_cd==""||itm_cd==undefined){
				$totSurvMap.ui.selectedItmCd = "T310";
			} else {
				$totSurvMap.ui.selectedItmCd = itm_cd;
			}
			
			$totSurvMap.ui.selectedC1 = c1;
			
			$totSurvMap.ui.selectedC2 = c2;
			
			if($totSurvMain.ui.selectedArea.length==2){
				$totSurvMapnoReverseGeoCode = true;
				if($totSurvMap.ui.map==null || $("#mapRgn_1").html() == ""){// 20201104 박은식 같은 대시보드 매뉴를 다시 클릭시 맵을 다시그려주기 위해 조건문 추가
					$("#mapRgn_1").show();
					$totSurvMap.ui.createMap("mapRgn_1", 0);
					$("#mapRgn_1").css("height", "560px");
				}				
				
				if($totSurvMain.ui.selectedArea == "00"){
					$totSurvMap.ui.drawMapData("sido", "color"); // 맵 그리기
				
				} else if($totSurvMap.ui.mapToggleId != ""){
					$totSurvMap.ui.drawMapData("sido", "color"); // 맵 그리기
				} else {
					$totSurvMap.ui.drawMapData("sgg", "color"); // 맵					
				}
				//$totSurvMap.ui.drawMapData("sido", "color"); // 맵 그리기	
			} else {
				if($totSurvMap.ui.map==null || $("#mapRgn_1").html() == ""){
					$("#worldMap").hide();
					$("#mapRgn_1").show();
					$totSurvMap.ui.createMap("mapRgn_1", 0);
				}
				$totSurvMap.ui.drawMapData("sgg", "color"); // 맵
			}
			
			if($totSurvMap.ui.map!=null) {
				$totSurvMap.ui.map.update();
			}
			//20202124 박은식 범례 추가 START
			$('.sop-control').css('display', 'inline-block');
			if($(".legendRing").attr("data-ing") == "max"){
				$(".btn_legend").trigger("click");
			} else if($(".legendRing").attr("data-ing") == "min"){
				$(".btn_legend").trigger("click").trigger("click");
			}
			$("#grid_lg_color_0").attr("data-color", "#cd1103").attr("start-color", "#ffd75d").text("#cd1103").css("background", "#cd1103");
			//20202124 박은식 범례 추가 END
		},
		
		// 총조사 시각화 정보 조회
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
						$houseDash.ui.totSurvInfoData = totSurvInfo;
						
						// 기존 맵데이터 클리어
						$totSurvMap.ui.map.clearDataOverlay();
						
						getKosisDetailOption(totSurvInfo);
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
		 * @description  : 슬라이드 변경 시 renk 조회
		 * @date         : 2020.09.08
		 * @author	     : 박은식
		 * @history 	 :
		 * @parameter	 rank	: 슬라이드 rank
		 * 				 target	: 총인구, 남녀 비율, 외국인 중 1택 
		 */
		getRankSet : function(rank, target, regionCd){
			//전국 또는 전세계일 경우 해당 ajax를 스킵
			if($totSurvMain.ui.selectedArea == "00" || $totSurvMain.ui.selectedArea == "99"){
				$("#totalHouse").hide();
				return;
			} else {
				$("#totalHouse").show();
			}
			
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 START
			if(regionCd.length == 5){
				$totSurvMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
			}
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 END
			
			/**행정시 처리 로직 (테스트)*/
			if($totSurvMap.ui.isAtdrc || $("#house_rank").attr('max') == $totSurvMain.ui.atdrcRank){
				//현재 행정시도정보를 저장한다. 
				//비자치구와 행정시의 4자리수까지는 같다는 점을 이용한다
				$houseDash.atdrc = $totSurvMain.ui.selectedArea.substring(4,0);
			}
			
			/**행정시 처리 로직 (테스트)*/
			
			var param = {};
			var type = 'house';
			var level = 'sido';

			if($totSurvMain.ui.selectedArea.length == 2){ // 2020-10-14 [박은식] 랭킹 조회 조건 변경
				lavel = 'sido'
			} else if(($totSurvMain.ui.selectedArea.substring(4) != '0' && $houseDash.atdrc == $totSurvMain.ui.selectedArea.substring(4,0))){
				level = 'atdrc'// atdrc
			} else {
				level ='sgg'
			}

			var year = $totSurvMain.ui.selectedYear;
			if(rank != null && rank != '' && rank != undefined){
				if(target == 'house_rank' || target == "" || target == null){ //총인구, 남여비율, 외국인 중 어떤 기준으로 랭크를 조회 했는지와 디폴트값 설정
					type = 'house';
					srvLogWrite('P0','05','03','02',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
				} else if(target == 'houseRatio_rank'){
					type = 'house';
					srvLogWrite('P0','05','03','03',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
				} else{
					type = 'empty';
					srvLogWrite('P0','05','03','04',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
				}
				
				param = {year : year, type : type, rank : rank, level : level}
			} else if(regionCd != null && regionCd != '' && regionCd != undefined){
				param = (level == 'atdrc') ? {year : year, regionCd : regionCd, level : level} :  {year : year, regionCd : regionCd, level : level} 
			} else {
				return false;
			}
			//2020-10-06 [곽제욱] 맵경계 toggle 설정 START
			//level이 sido 일때 regionCd가 2자리가 아닌 경우 (맵 경계 토글 시 error 발생 방지)
			if(param.level == 'sido' && param.regionCd != null && param.regionCd.length > 2){
				param.regionCd = param.regionCd.substring(0,2)
			} 
			//2020-10-06 [곽제욱] 맵경계 toggle 설정 END
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/houseDash/getTotHouseRank.json",
				data: param, 
				dataType: "json",
				success: function(res) {
					/**range value setting */
					var hosueList = res.result.houseRankData[0];
					var hosueRatioList = res.result.houseRatioRankData[0];
					var emptyList = res.result.emptyRankData[0];

					var region_cd = hosueList.region_cd;
					
					// 2020-12-01 [곽제욱] 지역 선택시 locationPath 지정 START
					if(region_cd.length==2){
						$totSurvMain.ui.pathChange("sgg", region_cd);
					} else {
						if(region_cd.substring(4,5)=="0"){
							$totSurvMain.ui.pathChange("atdrc", region_cd);
						} else {
							$totSurvMain.ui.pathChange("emdong", region_cd);
						}
					}
					// 2020-12-01 [곽제욱] 지역 선택시 locationPath 지정 END
					
					// 2020-11-24 [곽제욱] 랭크이동시 지역명 변경 추가 START
					if(regionCd==""||regionCd==null){
						$totSurvMain.ui.titleChange(region_cd);
					}
					// 2020-11-24 [곽제욱] 랭크이동시 지역명 변경 추가 END
					
					//남녀성비, 외국인 슬라이드로 조회 시 ragionCd를 param으로 넘기지 않음. regionCd결과값을 받기위해 ajax안으로 변경 START
					$totSurvMain.ui.getSidoSggPos(region_cd);
					if(regionCd!=""){
						$("#dash_sido").val(regionCd.substring(0,2));
					}
					//남녀성비, 외국인 슬라이드로 조회 시 ragionCd를 param으로 넘기지 않음. regionCd결과값을 받기위해 ajax안으로 변경 END
					
					var sido = region_cd.substring(0,2);
					var sgg = region_cd.substring(2,5);
					if(sgg=="" || sgg==null){
						sgg = "999";
					}
					
					if(target != '' && target != null){
						/** 2020-09-22 [곽제욱] 맵토글id 초기화 */
						/** set Area */
						$totSurvMain.ui.selectedArea = region_cd;
						/** init chart */
						$houseDash.ui.clear();
						
						/** chart renderer */
						if(region_cd.length == 2){
				    		$("#dash_sido option[value='"+region_cd+"']").attr("selected", "true");
				    		if(region_cd != '00' && region_cd != '99'){
				    			$("#dash_sgg option[value='999']").attr("selected", "true");
				    		}
				    		$totSurvMain.ui.tileChangeYn = "Y"; 
				    		if(region_cd == "00") {
				    			$totSurvMain.ui.selectedLevel = "0";
				    		} else {
				    		$totSurvMain.ui.selectedLevel = "1";
				    		}
				    		$houseDash.event.allChange(region_cd, "1");
				    	}
				    	// 시군구 데이터 일 경우 kosis정보 호출
						/** 2020-09-21 [곽제욱] 시군구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    	else if(region_cd.length == 5){
				    		var tempRegionCd = region_cd.substring(0,4)+"0";
				    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);								    		
				    		if($totSurvMap.ui.isAtdrc != true){
				    			// sidosgg() 시군구 세팅 로직 추가필요
				    			/** 2020-10-06 [곽제욱] 비자치구가 아닐경우 이동후 하이라이트처리 START */
				    			//$totSurvMain.ui.getSidoSggPos(region_cd.substring(0,2));
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMap.ui.mapToggleId = region_cd;
				    			/** 2020-10-06 [곽제욱] 비자치구가 아닐경우 이동후 하이라이트처리 END */
				    			$houseDash.event.allChange(region_cd, "1");
				    		}
				    		/** 2020-09-21 [곽제욱] 비자치구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    		else{
				    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 START */
				    			$totSurvMap.ui.mapToggleId = ""; //2020-10-14 [곽제욱] 자치구 이동관련하여 토글아이디 초기화 
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			console.log("#########################   비자치구 클릭됨     ##############");
				    			$houseDash.event.allChange(region_cd, "1");
				    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 END */
				    		}
				    	}
					}
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						$houseDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,hosueList.rank,hosueRatioList.rank,emptyList.rank, $totSurvMap.ui.mapToggleId);
					} else {
						$houseDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,'0','0','0', '');
					}
					//비자치구 일 경우 행정시도로 이동하는 로직
					if($houseDash.upperBack == true){
						$totSurvMap.ui.checkIsAtdrc(region_cd);	
						$totSurvMain.ui.selectedArea = region_cd
						$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
						$totSurvMap.ui.mapRegion = "sgg";
						$houseDash.event.allChange(region_cd,"1")
					}
					if(hosueRatioList.dt!=""&&hosueRatioList.dt!=null&&hosueRatioList.dt!=undefined){
						$("#houseRatioRt").html(numberFormat(hosueRatioList.dt))
					} else {
						$("#houseRatioRt").html("-")
					}
					$("#emptyDt").text(numberFormat(emptyList.dt))
					if(hosueList.irdsrate != "" && hosueList.irdsrate != null && hosueList.irdsrate != undefined){
						var houseUpDownCheck = "";
						var emptyUpDownCheck = "";
						if(parseFloat(hosueList.irdsrate) > 0){
							houseUpDownCheck = "전년도 대비 <span class='stats_up bold'>" +hosueList.irdsrate+" % </span><span class='stats_up'>▲</span>";
						} else if(parseFloat(hosueList.irdsrate) < 0){
							houseUpDownCheck = "전년도 대비 <span class='stats_down bold'>" +hosueList.irdsrate.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
						} else {
							if($totSurvMain.ui.selectedYear!="2015"){
								houseUpDownCheck = "<span class='stats_normal bold'>" +hosueList.irdsrate+" % </span><span class='stats_normal'>-</span>";
							} else {
								houseUpDownCheck = "증감율 데이터 없음";
							}
						}
					} else {
						houseUpDownCheck = "증감율 데이터 없음"
					}
					if(emptyList.irdsrate != "" && emptyList.irdsrate != null && emptyList.irdsrate != undefined){
						if(parseFloat(emptyList.irdsrate) > 0){
							emptyUpDownCheck = "전년도 대비 <span class='stats_up bold'>" +emptyList.irdsrate+" % </span><span class='stats_up'>▲</span>";
						} else if(parseFloat(emptyList.irdsrate) < 0){
							emptyUpDownCheck = "전년도 대비 <span class='stats_down bold'>" +emptyList.irdsrate.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
						} else {
							if($totSurvMain.ui.selectedYear!="2015"){
								emptyUpDownCheck = "<span class='stats_normal bold'>" +emptyList.irdsrate+" % </span><span class='stats_normal'>-</span>";
							} else {
								emptyUpDownCheck = "증감율 데이터 없음";
							}
						}
					} else {
						emptyUpDownCheck = "증감율 데이터 없음"
					}
					$("#houseChangeRt").html(houseUpDownCheck)
					$("#houseRatioChangeRt").html(houseUpDownCheck)
					$("#emptyChangeRt").html(emptyUpDownCheck)
				},
				error: function(){
					
				}
			})
			$houseDash.upperBack = false;
			if($totSurvMain.ui.chartTarget != ""
				&& typeof($totSurvMain.ui.chartIndex) == "number"
				&& $totSurvMain.ui.chartColor != ""){
				 
				$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
			}
		},
		/**
		 * 
		 * @name         : rankSlideRender
		 * @description  : 슬라이드 값 셋팅 및 background 처리
		 * @date         : 2020.09.09
		 * @author	     : 박은식
		 * @history 	 :
		 * @parameter	 regionCd		: 지역 code
		 * 				 houseRank		: 총주택 rank
		 * 				 houseRatioRank : 증감율 rank
		 * 				 emptyRank		: 빈주택 rank
		 */
		rankSlideRender : function(regionCd, houseRank, houseRatioRank, emptyRank, toggleId){
			$totSurvMain.ui.tileChangeYn = "Y";
			$("#house_range").show();
			$("#houseRatio_range").show();
			$("#empty_range").show();
			// 시도이동, 시군구이동의 경우
			if($totSurvMain.ui.selectedArea.length == 2){	// 2020-10-14 [주형식] 시도 비교 로직 수정
				// 그중 시군구 이동(지도에는 시군구 레벨로 표출, 선택지역 하이라이트 처리)
				if(toggleId.length == 5){
					$houseDash.regionLevel = 'sgg'
					$("#house_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#houseRatio_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#empty_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#house_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#houseRatio_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#empty_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$totSurvMap.ui.mapToggleId = toggleId;
					$houseDash.event.allChange(toggleId, "2");
				} else {
					$houseDash.regionLevel = 'sido'
					$("#house_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#houseRatio_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#empty_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#house_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
					$("#houseRatio_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
					$("#empty_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
				}
			} else if($totSurvMain.ui.selectedArea.substring(4) != '0' ) { // 2020-10-14 [곽제욱] 비자치구 체크조건 수정
				if($totSurvMain.ui.atdrcRank != 0) {
					$houseDash.regionLevel = 'atdrc'
					$("#house_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#houseRatio_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#empty_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#house_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
					$("#houseRatio_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
					$("#empty_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
				} else {
					$("#house_range").hide();
					$("#houseRatio_range").hide();
					$("#empty_range").hide();
				}
			} else if($("#house_rank").attr("max") != $totSurvMain.ui.atdrcRank || $houseDash.upperBack == false){ //20201013 박은식 $houseDash.upperBack 조건이 false 일때로 변경 (비자치구에서 나온경우)
				$houseDash.regionLevel = 'sgg'
				$("#house_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#houseRatio_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#empty_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#house_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
				$("#houseRatio_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
				$("#empty_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 START
			} else {
				$houseDash.regionLevel = 'sgg'
					$("#house_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#houseRatio_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#empty_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#house_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#houseRatio_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#empty_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			}
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 END
			
			$("#house_rank").val(houseRank);
			$("#houseRatio_rank").val(houseRatioRank);
			$("#empty_rank").val(emptyRank);
			$("#house_range").find("span").eq(2).text(/*$("#house_rank").val()*/houseRank+"번째");
			$("#houseRatio_range").find("span").eq(2).text(/*$("#houseRatio_rank").val()*/houseRatioRank+"번째");
			$("#empty_range").find("span").eq(2).text(/*$("#empty_rank").val()*/emptyRank+"번째");
			$("#house_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#house_rank").attr("max")-1))*($("#house_rank").val()-1)) + '%, #fff ' + ((100/($("#house_rank").attr("max")-1))*($("#house_rank").val()-1)) + '%, white 100%)');
			$("#houseRatio_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#houseRatio_rank").attr("max")-1))*($("#houseRatio_rank").val()-1)) + '%, #fff ' + ((100/($("#houseRatio_rank").attr("max")-1))*($("#houseRatio_rank").val()-1)) + '%, white 100%)');
			$("#empty_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#empty_rank").attr("max")-1))*($("#empty_rank").val()-1)) + '%, #fff ' + ((100/($("#empty_rank").attr("max")-1))*($("#empty_rank").val()-1)) + '%, white 100%)');
			$("#houseRank").html(houseRank);
			
			if($totSurvMain.ui.selectedArea.length == 2){
				$("#houseRanking").html($totSurvMain.ui.sidoMaxRank + "개 광역시도 중");
				$("#houseRanking").parent().find(".moreInfoBtn").show();
				$("#houseRanking").parent().find("button").attr("id", "totalSido")
				
				var areaTitle = $("#dash_sido option:selected").html();
				
				$("#houseRatioRanking").html(areaTitle + " 주택수 증감");
				$("#emptyRanking").html(areaTitle + " 빈집의 수");
			}else if($totSurvMain.ui.selectedArea.length == 5){
				var areaTitle = $("#dash_sgg option:selected").html();
				$("#houseRanking").parent().find(".moreInfoBtn").show();
				if($houseDash.regionLevel == 'atdrc'){
					$("#houseRanking").html($totSurvMain.ui.atdrcRank + "개 비자치구 중");
				} else {
					$("#houseRanking").html($totSurvMain.ui.sggEmdongMaxRank + "개 시군구 중");
				}
				$("#houseRanking").parent().find("button").attr("id", "totalSgg")
				$("#houseRatioRanking").html(areaTitle + " 주택수 증감");
				$("#emptyRanking").html(areaTitle + " 빈집의 수");
			}
			$("#rangeV1").find('span').eq(0).text($("#house_rank").val()+"번");
			$("#rangeV1").offset({left:133+((100/($("#house_rank").attr("max")-1))*($("#house_rank").val()-1)/100*($("#house_rank").outerWidth()-20)), top:$("#house_rank").offset().top-30}) // 538 -> $("house_rank").offset().top;
			$("#rangeV2").find('span').eq(0).text($("#houseRatio_rank").val()+"번");
			$("#rangeV2").offset({left:133+((100/($("#houseRatio_rank").attr("max")-1))*($("#houseRatio_rank").val()-1)/100*($("#house_rank").outerWidth()-20)), top:$("#houseRatio_rank").offset().top-30}) // 691
			$("#rangeV3").find('span').eq(0).text($("#empty_rank").val()+"번");
			$("#rangeV3").offset({left:133+((100/($("#empty_rank").attr("max")-1))*($("#empty_rank").val()-1)/100*($("#house_rank").outerWidth()-20)), top:$("#empty_rank").offset().top-30}) // 843
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
			$("#house_rank").val(0);
			$("#houseRatio_rank").val(0);
			$("#empty_rank").val(0);
			$houseDash.ui.rankSlideRender("00", 0,0,0, "");
			
			
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
					url: contextPath + "/ServiceAPI/totSurv/houseDash/getUpperRegionCheck.json",
					/* /ServiceAPI/totSurv/houseDash/getUpperRegionCheck.json" <- 기존*/
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
		 * @name         : chartItmClick
		 * @description  : 차트 아이템 mouse out 시 함수
		 * @date         : 2020. 09. 21
		 * @author	     : 곽제욱
		 * @history 	 :
		 */
		chartItmClick : function(obj, d, color, contents, chartType){
			/*
			if(d.TBL_ID == "DT_1JU1501"){
				surv_id  = "PH0285";
			} else if(d.TBL_ID == "DT_1JU1502"){
				surv_id  = "PH0286";
			} else if (d.TBL_ID == "DT_1JU15"){
				surv_id  = "PH0290";
			}
			*/
			
			// 선택한 레벨이 3이 아닐경우
			if($totSurvMain.ui.selectedLevel != 3){
				var params = 'year='+$totSurvMain.ui.selectedYear+',region_cd='+$totSurvMain.ui.selectedArea.substring(0,4)+"0";
				params+= ',itm_cd='+d.itm_cd+',surv_id='+d.surv_id;
				
				if( chartType == 1 ){
					srvLogWrite('P0','05','04','01',$totSurvMain.ui.selectedThema,params); //빈집 주택의 종류
				} else if( chartType == 2 ){
					srvLogWrite('P0','05','04','02',$totSurvMain.ui.selectedThema,params); //가구별 자녀의 수
				} else if( chartType == 3 ){
					srvLogWrite('P0','05','02','00',$totSurvMain.ui.selectedThema,params); //하단 차트
				}
				
				// 선택한 obj와 이전에 선택한 obj가 다를 경우
				if(obj[0] != $totSurvMap.ui.selectedObj[0]){
					// 이전에 선택한 오브젝트의 색 변경(이전선택 오브젝트가 없을경우 pass
					if($totSurvMap.ui.selectedObj[0] != "" && $totSurvMap.ui.selectedObj[0] != null){
						$totSurvMap.ui.selectedObj.attr("fill", $totSurvMain.ui.selectedTempColor)
					}
					// 타일맵 변경여부 N
					$totSurvMain.ui.tileChangeYn = "N";
					// 맵 그리기
					
					/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
		    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);		
		    		if($totSurvMap.ui.isAtdrc){
		    			$totSurvMap.ui.mapToggleId = "";
		    		}
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */
		    			
					$houseDash.ui.drawContent(d.TBL_ID, d.CHAR_ITM_ID, d.OV_L2_ID, d.OV_L3_ID); // 2020
					// 차트 토글여부 Y
					$totSurvMap.ui.chartToggleYn = "Y";
					// 현재 선택한 오브젝트를 변수에 저장
					$totSurvMap.ui.selectedObj = obj;
					// 현재 선택한 오브젝트의 색 변경
					obj.attr("fill", color);
					// 선택한 아이템이 변경되면서 선택한 아이템의 색상도 변경처리
					$totSurvMain.ui.selectedTempColor = $totSurvMain.ui.tempColor;
					var title = "";
					title += contents;
					$("#itmDiv").css("display", "inline");
					$("#itmDiv").html(title );
					
				} else {
				//20201014 박은식 chartSelectedSave function parameter 초기화 START
					$totSurvMain.ui.chartTarget = "";
		    		$totSurvMain.ui.chartIndex = "";
		    		$totSurvMain.ui.chartData = "";
		    		$totSurvMain.ui.chartColor = "";
		    		$totSurvMain.ui.chartTitle = "";   
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
		    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);		
		    		if($totSurvMap.ui.isAtdrc){
		    			$totSurvMap.ui.mapToggleId = "";
		    		}
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */
			//		$houseDash.ui.drawContent("PH0001", "T100", "");

					//$houseDash.ui.drawContent(surv_id, d.CHAR_ITM_ID, d.c1, d.c2); // 2020
		    		$houseDash.ui.drawContent(d.TBL_ID, d.CHAR_ITM_ID, d.OV_L2_ID, d.OV_L3_ID); // 2020
					if($totSurvMain.ui.chartColor != ""){
						obj.attr("fill", $totSurvMain.ui.chartColor);
					} else {
						obj.attr("fill", $totSurvMain.ui.selectedTempColor);
					}	
					//20201014 박은식 chartSelectedSave function parameter 초기화 및 색상 처리 조건추가 초기화 END	
		    		$totSurvMap.ui.chartToggleYn = "N";
		    		$totSurvMap.ui.selectedObj = "";
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
				$(target).css("top", d3.event.pageY + y + "px")
			} else {
				$(target).css("left", d3.event.pageX + x + "px")
				$(target).css("top", d3.event.pageY + y + "px")
			}
			$(target).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year+ "년 "+ title.replace('(명)', '').replace('-', ' ').replace('_', ' ') + standard + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ data + "</p>" + unit);
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
			
				options : totSurvInfo
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

		//var map = $totSurvMap.ui.map;
		
		if(!$houseDash.isDev){
			// 운영 호출 
		}
		else{
			var map = $totSurvMap.ui.map;
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
			console.log("$totSurvMain.ui.selectedArea = " + $totSurvMain.ui.selectedArea);
			if($totSurvMain.ui.selectedArea != null && $totSurvMain.ui.selectedArea.length == 5){
				lv_url += "&gis_se="+ $totSurvMain.ui.selectedArea;
			}
			else{
				lv_url += "&gis_se="+ "25030";
			}
			lv_url += "&obj_var_id=" + $houseDash.obj_var_id;
			lv_url += "&field_id=" + $houseDash.field_id;
			
			console.log("lv_url = " + lv_url);
			
			
			// 맵 zoom 설정
			var admCd = $totSurvMain.ui.selectedArea;
			$("#dash_sgg").val(admCd.substring(2,5));
			console.log("admCd = " + admCd);
			console.log("dash_sgg = " + admCd.substring(2,5));
			
			var xcoor = 0;
			var ycoor = 0;
			// 경기도 수원시  
			xcoor = $("#dash_sgg option:selected").attr("data-coor-x");
			ycoor = $("#dash_sgg option:selected").attr("data-coor-y");
			if(xcoor == undefined && ycoor == undefined){
				commonTotSurv_alert("KOSIS 지역정보 정보가 없는 시도입니다.", "");
				return false;
			}
			else{
				var center =[xcoor, ycoor];
				$totSurvMap.ui.map.mapReload(center, 6);
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
							commonTotSurv_alert("조회된 정보가 없습니다.")
							return false;
						}
						else if((result[0].CODE).length > 5){
							if((result[0].CODE).startsWith(admCd)){
								isResult = true;
								// 개방형지도란 버튼 활성화
								//$(".mapInfo").show();
													
							}
							else{
								commonTotSurv_alert("조회된 정보가 없습니다.");
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
					
					//사용자지정 경계일 경우,
					//사용자가 선택한 경계에만 통계치를 표출해야하므로
					//사용자가 지정한 경계이외의 나머지 데이터는 삭제한다.
					/*  map.selectedBoundList 없어서 데이터가 []임.
					if (map.selectedBoundMode == "multi") {
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
					}
					*/
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
						
						//데이터 넣기 (kosis data)  type, data, showDataParamName, unit, length							
						//$totSurvMap.ui.map.setKosisStatsData("normal", "emdong_"+(result[0].CODE).substring(0,5), result[i], "DATA", "");
						//정보 저장
						//$totSurvMap.ui.mapStatsData[lv_tot_surv_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = res.result.mapData;
						
						setLegendForKosisStatsData(tmpData);
						for (var i=0; i<result.length; i++) {
							map.multiLayerControl.reqBoundary(result[i].CODE, result[i], atdrc_yn, function(res) {
								var geoData = combineKosisStatsData(res);
								$totSurvMap.ui.map.setPolygonDataGeojson(geoData);
								map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(geoData, "data"));
							});
						}
						
						// zoom 레벨 변경 6
						$totSurvMap.ui.map.setZoom(6);
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
		if (!$totSurvMap.ui.map.isFixedBound) {
			setLegendForKosisStatsData(arData);
		}
		
		return boundData;
	}

	$houseDash.util = {};
	
	$houseDash.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$houseDash.event.setUIEvent() called.");
			
			var body = $("body");

			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 start*/
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#house_rank, #houseRatio_rank, #empty_rank", function(e){ // 20201014 박은식 IE event 문제로 change 추가
			//2020.09.10[신예리] 슬라이드 컬러 수정
				$totSurvMain.ui.chartTarget = "";
	    		$totSurvMain.ui.chartIndex = "";
	    		$totSurvMain.ui.chartData = "";
	    		$totSurvMain.ui.chartColor = "";
	    		$totSurvMain.ui.chartTitle = "";
	    		$totSurvMap.ui.selectedObj[0] = "";
				this.style.background = 'linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
				if(e.target.id == "house_rank"){
					$("#rangeV1").find('span').eq(0).text(this.value+"번");
					$("#rangeV1").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#house_rank").outerWidth()-20)), top:$("#house_rank").offset().top-30})
				} else if(e.target.id == "houseRatio_rank"){
					$("#rangeV2").find('span').eq(0).text(this.value+"번");
					$("#rangeV2").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#house_rank").outerWidth()-20)), top:$("#houseRatio_rank").offset().top-30})
				} else if(e.target.id == "empty_rank") {
					$("#rangeV3").find('span').eq(0).text(this.value+"번");
					$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#house_rank").outerWidth()-20)), top:$("#empty_rank").offset().top-30})
				}
			
			//left: calc(40.3333% + 1.93333px);
			})
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 end*/
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 start*/
			body.on("mouseup", "#house_rank, #houseRatio_rank, #empty_rank", function(){  // 20201012 박은식 IE event 문제로 change 추가
				$houseDash.ui.getRankSet(this.value, this.id, "");
			})
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 end*/
			
			if($totSurvMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			$houseDash.ui.getRankSet("", "",$totSurvMain.ui.selectedArea);
			// 총조사시각화정보
			/** 각 차트 영역 클릭시 tileMap 과 지도 변경 (현재는 계만 조회, 각 막대별 클릭일경우 함수 변경 필요 */

			/** 맵 선택 - 안보이게 설정*/
			$(".select").hide();
			
			// 개방형지도란 버튼 활성화/비활성화
			$(".mapInfo").hide();	
			
			/** 맵 최대크기 */
			body.on("click", ".mapExport", function(){
				
				srvLogWrite('P0','01','04','02',$totSurvMain.ui.selectedThema,( $(".mapExport").hasClass("on") ? "작게" : "크게" ) );
				
				if($(".mapExport").hasClass("on")) {
//					alert("큰화면 -> 작은화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					
					$(".mapExport").removeClass("on");
					//$("#allPopulationForTime").show(); // 2020-10-12 [곽제욱] 주석처리
					$(".col-SubL").width("");
					$(".col-SubL").height("584px"); //2020.09.16[신예리] 영역 맞춤
					// 맵 사이즈
					$('#mapRgn_1').width("");
					$('#mapRgn_1').height("560px");
					// 지도 크기 설정				
					$("#mapArea").width("");
					$("#mapArea").height("100%"); // 2020.09.10[신예리] 맵 버튼 위치 조정으로 인한 height 값 수정
					
					/** 2020-10-12 [곽제욱] 맵크기 확대, 축소시 show-hide 분기 처리 START */
					if($totSurvMain.ui.selectedLevel=="0"){

						$(".Rangecontainer").css("display", "none");

					} else if($totSurvMain.ui.selectedLevel=="1"){

						$(".Rangecontainer").css("display", "inline-block"); //2020.11.03[신예리] 맵 확대 ->축소 시 레이아웃 틀어지는 문제로 속성 변경

					} else if($totSurvMain.ui.selectedLevel=="2"){
						$(".Rangecontainer").css("display", "inline-block"); //2020.11.03[신예리] 맵 확대 ->축소 시 레이아웃 틀어지는 문제로 속성 변경

						
					} else if($totSurvMain.ui.selectedLevel=="3"){
						
						$(".Rangecontainer").css("display", "none");
					}
					/** 2020-10-12 [곽제욱] 맵크기 확대, 축소시 show-hide 분기 처리 END */
					
					if($totSurvMap.ui.map != null){
						$totSurvMap.ui.map.update();
					}
					//$houseDash.event.allChange($totSurvMain.ui.selectedArea, "2"); 2020-10-12 [곽제욱] 로직 변경으로 인한 주석처리
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 END
					
					$("#emptyHoseChart").parent().show()
					$("#kindHouseChart").parent().show()
					$("#countRoomChart").parent().show()
					$("#houseTimeChart").parent().show()
					$("#emptyHoseChart").width("100%")
					$("#kindHouseChart").width("100%")
					$("#countRoomChart").width("100%")
					$("#houseTimeChart").width("99%")
					setHouseChart($houseDash.emptyHouse,"countRoomChart","Y", "140");//20210226 박은식 차트 위치변경
					
					setHouseChart($houseDash.kindHouseData,"kindHouseChart","Y", "140");
					
					if($houseDash.countRoomData != null && $houseDash.countRoomData != undefined){
						setHouseChart($houseDash.countRoomData,"emptyHoseChart","Y", "140");//20210226 박은식 차트 위치변경
					} else {
						//2020.10.20[신예리]주택별 방의 수 데이터 없을 때 화면 START
						var countRoomHtml = "";
						countRoomHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
						countRoomHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 20px;'>";
						countRoomHtml += "	<p style='margin-top: 15px;'>2010년 이전 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
						countRoomHtml += "</div>";
						$("#countRoomChart").html(countRoomHtml)
					//2020.10.20[신예리]주택별 방의 수 데이터 없을 때 화면 END	
					}
					
					timeEmptyHouseChart($houseDash.timeEmptyHouse, "houseTimeChart", "Y", "180");
				}
				else{
//					alert("작은화면 -> 큰화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					$(".mapExport").addClass("on");
					$("#countRoomChart").width($("#countRoomChart").outerWidth())//20210226 박은식 차트 위치변경
					$("#kindHouseChart").width($("#kindHouseChart").outerWidth())
					$("#countRoomChart").width($("#countRoomChart").outerWidth())
					$("#houseTimeChart").width($("#houseTimeChart").outerWidth())
					$("#countRoomChart").parent().hide()//20210226 박은식 차트 위치변경
					$("#kindHouseChart").parent().hide()
					$("#countRoomChart").parent().hide()
					$("#houseTimeChart").parent().hide()
					
					
					// 지도 크기 설정
					$(".col-SubL").width($(window).width()-430);
					$(".col-SubL").height("825px"); //2020.09.15 [신예리] height 값 수정
					
					// 최초지도
					$("#worldMap").width("1480px");
					$("#worldMap").height("800px"); //2020.09.15 [신예리] height 값 수정
									
					$("#mapArea").width($(window).width()-430);
					$("#mapArea").height("800px"); //2020.09.15 [신예리] height 값 수정
					
					// 맵 사이즈
					$('#mapRgn_1').width($(window).width()-430);
					$('#mapRgn_1').height("800px"); //2020.09.15 [신예리] height 값 수정
					
					$totSurvMap.ui.map.update()
				}
				
			});
			
			/** 맵 확대 */
			body.on("click", "#pZoom", function(){  //20201013 박은식 class -> id로 selector변경
				var lv_zoom = $totSurvMap.ui.map.zoom;
				$totSurvMap.ui.map.setZoom((lv_zoom+1));
				//alert("맵 확대");
				
				if($totSurvMap.ui.map == null){
					alert("세계지도");
					return;
				}
				
				srvLogWrite('P0','01','04','03',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear);

				var to_sido_cd = "";
				var to_sgg_cd = "";
//				console.log("to_center = " + to_center);
				$totSurvMap.ui.getCenterToAdmCd($totSurvMap.ui.map.gMap.getCenter(), function(res) {
					/** 2020-10-12 [곽제욱] zoomIn 센터좌표 이벤트 추가 START */
					// 콤보박스 선택
					var lv_zoom = $totSurvMap.ui.map.zoom;
					if(res.result == undefined) {
						$totSurvMap.ui.map.setZoom((lv_zoom+1));
						
						return;
					}
					$totSurvMain.ui.getSidoSggPos(res.result.sido_cd+res.result.sgg_cd);
					to_sido_cd = res.result.sido_cd;
					to_sgg_cd = res.result.sgg_cd;
					$("#dash_sido").val(to_sido_cd);
					var sggZoom;
					if(to_sido_cd == '11' || to_sido_cd == '21' || to_sido_cd == '22' ||
						to_sido_cd == '24' || to_sido_cd == '25' || to_sido_cd == '26' || to_sido_cd == '29'){
                      // 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
                	   sggZoom = 5;
					} else if(to_sido_cd == '23' || to_sido_cd == '39') {
                      // 인천(23), 제주(39)
                	   sggZoom = 4;
                    } else if(to_sido_cd == '31' || to_sido_cd == '32' || to_sido_cd == '33' ||
                		   to_sido_cd == '34' || to_sido_cd == '35' || to_sido_cd == '36' || to_sido_cd == '37' || to_sido_cd == '38') {
                      // 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
                	   sggZoom = 3;
                    } else {
                	   sggZoom = 1;
                    }
					
					var emdongZoom;
					//to_sido_cd = $("#dash_sido option:selected").val(); // 2020-10-12 [곽제욱] 주석처리
					//to_sgg_cd = $("#dash_sgg option:selected").val(); // 2020-10-12 [곽제욱] 주석처리

					console.log("[res] sido_cd = " + to_sido_cd + ", sgg_cd = " + to_sgg_cd);					
					/** 2020-10-12 [곽제욱] zoomIn 센터좌표 이벤트 추가 END */
					console.log("lv_zoom = " + lv_zoom);
					//전국
					if(lv_zoom <= 1) {
						var x = $("#dash_sido option:selected").attr("data-coor-x");
						var y = $("#dash_sido option:selected").attr("data-coor-y");
						
						$totSurvMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
					}
					//시도
					else if (lv_zoom > 1 && lv_zoom <= sggZoom) { // 2020-10-12 [곽제욱] sggZoom 체크로 변경
						
						var x = $("#dash_sido option:selected").attr("data-coor-x");
						var y = $("#dash_sido option:selected").attr("data-coor-y");
						

						if(lv_zoom == sggZoom && $totSurvMap.ui.mapRegion != "sgg"){ // 2020-10-13 [곽제욱] 고정 줌을 sggZoom과 같으면으로 변경 
							$totSurvMain.ui.selectedLevel =  "1";
							
							// 콤보박스 선택
							$totSurvMain.ui.getSidoSggPos(to_sido_cd);
							
							// 지도 조회
							$totSurvMain.ui.pathChange("sgg", to_sido_cd);
							$totSurvMap.ui.mapRegion = "sgg"; // 2020-10-12 [곽제욱] mapRegion 세팅
							// 데이터 조회
							$houseDash.event.allChange(to_sido_cd, "1");
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
						}
						else{
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
						}
					}
					//시군구
					else if (
							(lv_zoom > 1 && lv_zoom <= sggZoom) // 2020-10-12 [곽제욱] sggZoom 체크로 변경
							|| (lv_zoom > sggZoom && lv_zoom <= 12) // 2020-10-12 [곽제욱] sggZoom 체크로 변경						 
					){						
						$totSurvMap.ui.map.setZoom((lv_zoom+1));
						/** 2020-10-12 [곽제욱] 센터좌표 수정 START */
						$totSurvMain.ui.selectedArea = to_sido_cd + to_sgg_cd;
						$totSurvMap.ui.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,4)+"0")
						if($totSurvMap.ui.isAtdrc==true){
							$totSurvMain.ui.selectedArea = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
							emdongZoom = 5 + $totSurvMain.ui.zoomResize();							
						} else {
							// 최종단계(시군구 or 비자치구)인 경우에는 return
							return;
						}
						if(lv_zoom >= emdongZoom){
							$totSurvMain.ui.selectedLevel =  "2";
							var x = $("#dash_sgg option:selected").attr("data-coor-x");
							var y = $("#dash_sgg option:selected").attr("data-coor-y");
							$houseDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
						}
						//var to_center = $totSurvMap.ui.map.gMap.getCenter();
						/** 2020-10-12 [곽제욱] 센터좌표 수정 END */
						
					}//읍면동
					else if (
							(lv_zoom > 1 && lv_zoom <= 3)
							|| (lv_zoom > 3 && lv_zoom <= 5 )
							|| (lv_zoom > 5 && lv_zoom <= 12 ) // 2020-10-13 [곽제욱] 최대줌 변경
					) {
						/** 2020-10-12 [곽제욱] 줌in 로직 변경 START */
						/*
						if(($totSurvMain.ui.selectedArea).length != 7){
							commonTotSurv_alert("검색할 구를 선택해 주십시오.");
							return;
						}
						*/
						$totSurvMap.ui.map.setZoom((lv_zoom+1));
						
						var to_center = $totSurvMap.ui.map.gMap.getCenter();
						$totSurvMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom+1), false);
						/** 2020-10-12 [곽제욱] 줌in 로직 변경 END */
						
					}
					
				});

			});
			
			/** 맵 축소 */
			body.on("click", "#pOut", function(){ //20201013 박은식 class -> id로 selector변경		
				var lv_zoom = $totSurvMap.ui.map.zoom;
				$totSurvMap.ui.map.setZoom((lv_zoom-1));
				console.log("lv_zoom = " + lv_zoom);

				srvLogWrite('P0','01','04','04',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear);
				
				if(lv_zoom >= 1){ // 2020-10-13 [곽제욱] zoomlevel 조건절 변경
					/** 2020-10-12 [곽제욱] zoomout 시 경계조회 이벤트 추가 START */
					var to_sido_cd = "";
					var to_sgg_cd = "";
					//$totSurvMap.ui.map.setZoom((lv_zoom-1));
					//var to_center = $totSurvMap.ui.map.gMap.getCenter();
					//$totSurvMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom-1), false);
					$totSurvMap.ui.getCenterToAdmCd($totSurvMap.ui.map.gMap.getCenter(), function(res) {
						if(res.result == undefined) {
							$totSurvMap.ui.map.setZoom((lv_zoom-1));
							
							return;
						}
						
						$totSurvMain.ui.getSidoSggPos(res.result.sido_cd+res.result.sgg_cd);
						to_sido_cd = res.result.sido_cd;
						to_sgg_cd = res.result.sgg_cd;
						$("#dash_sido").val(to_sido_cd);
						
						var sggZoom;
						if(to_sido_cd == '11' || to_sido_cd == '21' || to_sido_cd == '22' ||
							to_sido_cd == '24' || to_sido_cd == '25' || to_sido_cd == '26' || to_sido_cd == '29'){
	                      // 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
	                	   sggZoom = 5;
						} else if(to_sido_cd == '23' || to_sido_cd == '39') {
	                      // 인천(23), 제주(39)
	                	   sggZoom = 4;
	                    } else if(to_sido_cd == '31' || to_sido_cd == '32' || to_sido_cd == '33' ||
	                		   to_sido_cd == '34' || to_sido_cd == '35' || to_sido_cd == '36' || to_sido_cd == '37' || to_sido_cd == '38') {
	                      // 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
	                	   sggZoom = 3;
	                    } else {
	                	   sggZoom = 1;
	                    }
						
						var emdongZoom = 6;
						if(lv_zoom > sggZoom && lv_zoom <= 12) {
							$totSurvMap.ui.map.setZoom((lv_zoom-1));
							$totSurvMap.ui.prevZoom = $totSurvMap.ui.map.zoom;
							$totSurvMain.ui.selectedArea = to_sido_cd + to_sgg_cd;
							$totSurvMap.ui.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,4)+"0")
							if(lv_zoom <= emdongZoom){
								if($totSurvMain.ui.selectedLevel == "3") {
									if($totSurvMap.ui.isAtdrc==true){
										$totSurvMain.ui.selectedArea = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
										// dash_sgg, dash_sido 재세팅
										$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
										$totSurvMap.ui.mapToggleId = "";
										$("#dash_sido").val(to_sido_cd);
										emdongZoom = 6 + $totSurvMain.ui.zoomResize();							
									} 
									$totSurvMain.ui.selectedLevel =  "2";
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$totSurvMain.ui.pathChange("sgg", to_sido_cd);
									$houseDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$houseDash.upperBack = true;
									$houseDash.ui.getRankSet("", "sgg", $totSurvMain.ui.selectedArea);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경									
								} else {
									$totSurvMain.ui.selectedLevel =  "1";
									$totSurvMain.ui.selectedArea = to_sido_cd;
									$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$totSurvMain.ui.pathChange("sgg", to_sido_cd);
									$houseDash.upperBack = true;
									$totSurvMap.ui.mapToggleId = "";
									$houseDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$totSurvMap.ui.isAtdrc = false;
									$houseDash.ui.getRankSet("", "sido", to_sido_cd);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
								}
							} 
							/*
							var x = $("#dash_sido option:selected").attr("data-coor-x");
							var y = $("#dash_sido option:selected").attr("data-coor-y");
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom-1), false);
							*/
						} else if(lv_zoom <= sggZoom){
							$totSurvMap.ui.map.setZoom((lv_zoom-1));
							if($totSurvMain.ui.selectedLevel != "0"){
								$totSurvMain.ui.titleChange("00");
								$totSurvMap.ui.prevZoom = $totSurvMap.ui.map.zoom;
								$totSurvMain.ui.selectedArea = "00";
								$totSurvMain.ui.selectedLevel =  "0";
								var x = $("#dash_sido option:selected").attr("data-coor-x");
								var y = $("#dash_sido option:selected").attr("data-coor-y");
								$totSurvMain.ui.pathChange("nationwide", "00");
								$houseDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							}
							//$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
						}
					});
					
					/** 2020-10-12 [곽제욱] zoomout 시 경게조회 이벤트 추가 END */
				} 
			});
			
			/** 개방형지도란 이벤트*/
			body.on("click", ".mapInfo", function(){ //20201013 박은식 class -> id로 selector변경
				if($('.popupWrap').css('display') == "block"){
					$('.mapInfo').removeClass("on"); // 팝업 표출 될 때 버튼 on 클래스 추가
					$('.popupWrap').hide(); 
				}
				else{
					$('.popupWrap').show();
					$("#commonTotSurv_popup_back").show();
					$('.mapInfo').addClass("on"); // 팝업 표출 될 때 버튼 on 클래스 추가
				}
			});
			
			/** 개방형지도 팝업 닫기 버튼 이벤트 */  
			body.on("click", ".popcloseBtn, #commonTotSurv_popup_back", function(){
				$('.popupWrap').hide();
				$('#commonTotSurv_popup_back').hide();
				$('.mapInfo').removeClass("on"); // 닫기 버튼 클릭 시 버튼 on 클래스 제거 
			});
			
			//20200914 박은식 range input show hide처리(년도 변경 시 지역에 따라 range 처리) 마지막에 처리
			if($totSurvMain.ui.selectedArea == '99' || $totSurvMain.ui.selectedArea == '00' || $totSurvMain.ui.selectedArea == ''){
				$(".dataArea").find('.Rangecontainer').hide()
			} else {
				$(".dataArea").find('.Rangecontainer').show()
			}
			
			
			
			
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장, 맵 저장) 이벤트 추가 START
			//지도 이미지 저장 이벤트 
			/*body.on("click", ".downloadBtn", function(){				
				var dash = "-";
				var saveNm =  $totSurvMain.ui.selectedThema;
				if($totSurvMain.ui.selectedArea == '00' || $totSurvMain.ui.selectedArea.length == 2){
					saveNm = saveNm + dash + $totSurvMain.ui.selectedYear + dash + $("#dash_sido option:selected").html();
				}
				else if($totSurvMain.ui.selectedArea.length == 5){
					saveNm = saveNm + dash + $totSurvMain.ui.selectedYear + dash + $("#dash_sido option:selected").html() + dash + $("#dash_sgg option:selected").html();
				}
				$totSurvMain.ui.mapImageDown("#mapArea", saveNm);
				
			});*/
			
			
			// 차트 이미지 저장
			body.on("click", "[name=chartBtn]", function(evnt){ 
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','09','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				console.log("selId = " + selId);
				
				if(selId == "emptyHoseDiv"){
					chartModal($houseDash.countRoomData, 'itm1', 'itm_nm', 'dt', '', '가구', '호'); //20201202 박은식 파라미터 추가 //20210226 박은식 차트 데이터 변경
				}
				else if(selId == "ageDiv"){
					chartModal($houseDash.kindHouseData, 'itm1', 'c1_nm', 'dt', '', '가구', '호'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "countRoom"){
					chartModal($houseDash.emptyHouse, 'itm1', 'c1_nm', 'dt', '', '가구', '호'); //20210226 박은식 차트 데이터 변경
				}
				else if(selId == "allhouseForTime"){
					chartModal($houseDash.timeEmptyHouse, 'itm2', 'itm_cd', 'dt', 't3', '', '가구', '호');  // 2020.10.26 파라메터 추가 //20201202 박은식 파라미터 추가
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn'], [name='tableBtn'], [name='excelBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','08','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				if(selId == "emptyHoseDiv"){
					getMataDataUrl("PH0285");//20210226 박은식 차트 데이터 변경 
				}
				else if(selId == "ageDiv"){
					getMataDataUrl("PH0286"); //20210226 박은식 차트 데이터 변경
				}
				else if(selId == "countRoom"){
					getMataDataUrl("PH0290"); //20210226 박은식 차트 데이터 변경
				}
				else if(selId == "allhouseForTime"){
					getMataDataUrl("PH0290");
				}
			});
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);

				if(selId == "emptyHoseDiv"){
					$totSurvMain.ui.chartImageDown("#emptyHoseDiv", "빈집의 종류"); //20210226 박은식 차트 데이터 변경
				}
				else if(selId == "countRoom"){
					$totSurvMain.ui.chartImageDown("#countRoom", "거처의 종류"); //20210226 박은식 차트 데이터 변경

				}
				else if(selId == "countRoom"){
					$totSurvMain.ui.chartImageDown("#countRoom", "주택별 방의 수"); //20210226 박은식 차트 데이터 변경
				}
				else if(selId == "allhouseForTime"){
					$totSurvMain.ui.chartImageDown("#allhouseForTime", "건축연도별 빈집 비율"); //20210226 박은식 차트 데이터 변경
				}
			});
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장, 맵 저장) 이벤트 추가 END
		},
		
		/**
		 * @name		 : allChange 
		 * @description  : 인구총조사 지도에서 각 지역경계 클릭시 모든 차트데이터 변경작업
		 * @date		 : 2020.08.17
		 * @author		 : juKwak
		 * @history 	 :
		 * @parameter	 : admCd : 지역코드, mode : 1(지도포함 전체 변경), 2(지도제외 차트변경)
		 */
		allChange : function(admCd, mode){
			$houseDash.event.allClear();
			var year = $totSurvMain.ui.selectedYear;
			var regionCd = admCd;
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/houseDash/getTotHouse.json",
				data: { year: year, region_cd : regionCd}, // 
				dataType: "json",
				success: function(res) {
					console.log(res)
					if (res.errCd == "0") {
						// 전국데이터
						var totalData = res.result.totalData;
						var totalRatioData = res.result.totalRatioData;
						
						var totalHouseInit = '';
						var totalEmptyInit = '';

						//전국일 때 슬라이드 초기화 data
						if($totSurvMain.ui.selectedLevel == '0'){
							var initRank = res.result.initRank;
							for(var i=0; i < initRank.length; i++){
								if(initRank[i].surv_id == 'PH0001'){
									totalHouseInit = initRank[i];
								} else {
									totalEmptyInit = initRank[i];
								}
								 
							}
							var noneHtml = "";
							noneHtml += "<div class='DataNone' id='infoNone' style='text-align: center;'>";
							noneHtml += "	<img src='/images/totSurv/locationclick.png' alt='지역을 선택하세요' style='margin-top: 12px; width: 35px;'>";
							noneHtml += "	<p>지역을 선택하시면 차트가 표출됩니다.</p>";
							noneHtml += "</div>";
							$("#infoArea1").hide();
							$("#infoArea2").html(noneHtml);
							$("#infoArea2").show();
							
							$("#houseChangeRt").hide();
							$("#house_range").hide();
							$("#houseRatio_range").hide();
							$("#empty_range").hide();
							if(totalRatioData[0].dt!="" && totalRatioData[0].dt!=null){
								$('#houseRatioRt').html(numberFormat(totalRatioData[0].dt))								
							} else if($totSurvMain.ui.selectedYear == "2015"){
								$('#houseRatioRt').html("-");
							}
							$("#emptyDt").html(numberFormat(totalEmptyInit.dt));
							$("#houseRanking").html("전국");
							$("#houseRanking").parent().find(".moreInfoBtn").hide();
							$("#houseRatioRanking").html("전국 주택수 증감");
							$("#emptyRanking").html("전국 빈집의 수");
							if(totalHouseInit.irdsrate != "" && totalHouseInit.irdsrate != null && totalHouseInit.irdsrate != undefined){
								var houseUpDownCheck = "";
								var emptyUpDownCheck = "";
								if(parseFloat(totalHouseInit.irdsrate) > 0){
									houseUpDownCheck = "전년도 대비 <span class='stats_up bold'>" +totalHouseInit.irdsrate+" % </span><span class='stats_up'>▲</span>";
								} else if(parseFloat(totalHouseInit.irdsrate) < 0){
									houseUpDownCheck = "전년도 대비 <span class='stats_down bold'>" +totalHouseInit.irdsrate.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
								} else {
									if($totSurvMain.ui.selectedYear!="2015"){
										houseUpDownCheck = "<span class='stats_normal bold'>" +totalHouseInit.irdsrate+" % </span><span class='stats_normal'>-</span>";
									} else {
										houseUpDownCheck = "증감율 데이터 없음";
									}
								}
							} else {
								houseUpDownCheck = "증감율 데이터 없음"
							}
							if(totalEmptyInit.irdsrate != "" && totalEmptyInit.irdsrate != null && totalEmptyInit.irdsrate != undefined){
								if(parseFloat(totalEmptyInit.irdsrate) > 0){
									emptyUpDownCheck = "전년도 대비 <span class='stats_up bold'>" +totalEmptyInit.irdsrate+" % </span><span class='stats_up'>▲</span>";
								} else if(parseFloat(totalEmptyInit.irdsrate) < 0){
									emptyUpDownCheck = "전년도 대비 <span class='stats_down bold'>" +totalEmptyInit.irdsrate.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
								} else {
									if($totSurvMain.ui.selectedYear!="2015"){
										emptyUpDownCheck = "<span class='stats_normal bold'>" +totalEmptyInit.irdsrate+" % </span><span class='stats_normal'>-</span>";
									} else {
										emptyUpDownCheck = "증감율 데이터 없음";
									}
								}
							} else {
								emptyUpDownCheck = "증감율 데이터 없음"
							}
							$("#houseRatioChangeRt").html(houseUpDownCheck)
							$("#emptyChangeRt").html(emptyUpDownCheck)
						}else if($totSurvMain.ui.selectedLevel != '0'){
							$("#infoArea2").hide();
							$("#infoArea1").show();
							$("#houseChangeRt").show();
							$("#houseRatioChangeRt").show();
							$("#emptyChangeRt").show();
						}
						
						//빈집의 종류
						$houseDash.emptyHouse = res.result.emptyHouse;
						
						//주택의 종류
						$houseDash.kindHouseData = res.result.kindHouseData;
						
						//연도별 빈집의 종류 
						$houseDash.timeEmptyHouse = res.result.timeEmptyHouse;
						
						$houseDash.countRoomData = res.result.houseInRoomCount;//20210226 박은식 차트 데이터 변경
						
						$houseDash.timeEmptyHouse = res.result.timeEmptyHouse;
						
						$totSurvMain.ui.selectedArea = regionCd;
					}
				},
				error: function(e) {
					alert('failed');
				}
			});			

			var param = {}
			$houseDash.ajax.params.adm_cd = $houseDash.admLv.split("_")[1] + ":" + admCd;
			$houseDash.ajax.params.adm_unit = "total";
			
			$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
				data: $houseDash.ajax.params, // 
				dataType: "json",
				success: function(res) {
					if($totSurvMain.ui.selectedLevel == '0'){		
						res = res.filter((r)=>Number(r.DTVAL_CO)!=0);				
						var noneHtml = "";
						noneHtml += "<div class='DataNone' id='infoNone' style='text-align: center;'>";
						noneHtml += "	<img src='/images/totSurv/locationclick.png' alt='지역을 선택하세요' style='margin-top: 12px; width: 35px;'>";
						noneHtml += "	<p>지역을 선택하시면 차트가 표출됩니다.</p>";
						noneHtml += "</div>";
						
						if($houseDash.ajax.params.adm_cd.indexOf(":") != -1) {
							let regionCd = $houseDash.ajax.params.adm_cd.split(":")[1];
							$("#infoArea2").hide();
							$("#totalhouse").show();
							$("#infoArea1").show();
							
							$("#totalhouse").show();
							if(regionCd.length == 2 && regionCd == "00") {
								$("#infoArea1").hide();
								$("#infoArea2").html(noneHtml);
								$("#infoArea2").show();
							} else if(regionCd.length == 2 && regionCd != "00") {
								$("#houseRanking").html($("#house_rank").attr("max") + "개 광역시도 중");								
							} else if(regionCd.length == 5) {
								if($houseDash.regionLevel == "atdrc") {
									$("#houseRanking").html($("#house_rank").attr("max") + "개 비자치구 중");
								} else {
									$("#houseRanking").html($("#house_rank").attr("max") + "개 시군구 중");
								}								
							} else {
								$("#houseRanking").html($totSurvMain.ui.sidoMaxRank + "개 중");
							}
							$("#houseRanking").parent().find(".moreInfoBtn").show();
																			
							
						}						
					}else if($totSurvMain.ui.selectedLevel != '0'){
						$("#infoArea2").hide();
						$("#infoArea1").show();
						$("#houseRatioChangeRt").show();
						$("#houseRatioChangeRt").show();
						$("#houseChangeRt").show();
					}					
				},
				error: function(e) {
					//$totSurvMain.ui.alert(errorMessage);
				}
			});
			
			for(var i=0; i<$houseDash.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
				if($houseDash.ui.dispOptions[1][i].objVarId == "13999001") {
					$houseDash.itmLv = "ov_l2_list";
					$houseDash.admLv = "ov_l"+$houseDash.ui.dispOptions[1][i].regionVarOrd+"_list";
					break;
				}
			}
			
			//*** 주택의 종류 ***//
			$houseDash.ajax.params.adm_cd = "";
			$houseDash.ajax.params[$houseDash.itmLv] = ""; 
			$houseDash.ajax.params[$houseDash.admLv] = admCd; 
			$houseDash.ajax.params.char_itm_id_list = "T10,T20,T30,T40,T50,T60"; // 주택
			$houseDash.ajax.params.tbl_id_list = 'DT_1JU1501';
			$houseDash.ajax.params.odr_col_list = 'OV_L2_ID,CHAR_ITM_ID';
	        $houseDash.ajax.params.odr_type = 'ASC';
	        $houseDash.ajax.params.surv_year_list = $totSurvMain.ui.selectedYear;
			$.ajax({
	    		type:"GET",
				async: false,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $houseDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
						result = result.filter((r)=>Number(r.DTVAL_CO)!=0);
	    				$houseDash.currentData[result[0].CHAR_ITM_ID] = result;
    					for(var i=0; i<result.length; i++) {
    						if(result[i].CHAR_ITM_ID=="T10") {
    							$(".dataAreatit h1").html(numberFormat(result[i].DTVAL_CO));
    							break;
    						}							
    					}
	    				kindHouseChart1($houseDash.currentData[result[0].CHAR_ITM_ID]);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});
			
			/**
			 * @name         : kindHouseChart1 
			 * @description  : 1번째 차트
			 * @date         : 2021.08.19
			 * @author	     : 이영호
			 * @history 	 : 
			 */
			function kindHouseChart1(data){
				
				var List = [];
				
				for (var i=0; i < data.length; i++){
					List.push(parseInt(data[i].DTVAL_CO));
				}
				
				var max = Math.max.apply(null, List);
				
				$("#emptyHoseDiv").data(data[0].CHAR_ITM_ID);												//항목분류코드
				$("#emptyHoseDiv span#ageUnit").empty().append("단위: " + $houseDash.ui.dispOptions[1][0].dispUnitNm);	//단위 표시
				
				$("#emptyHoseDiv .colTit").html("주택의 종류");
				
				let maxVal = 0, itmLv, totSurvWon = 0;
				
				for(var i=0; i<data.length; i++) {
					let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
					if(maxVal < parseInt(dtval)) {
						maxVal = parseInt(dtval);
					}		
					totSurvWon += parseInt(dtval);
				}
				var chartData = [], categories = [];
				let chartOpt = $houseDash.ui.dispOptions[1][0];
				maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) + Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * (maxVal.toString().length/40);
				for(var i=0; i<data.length; i++) {
					let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
					chartData.push({y:parseInt(Math.round(dtval/(chartOpt.dispUnit/chartOpt.kosisUnit))), color: $houseDash.chartsOption.color[i]});
					var isAlready = false;
					for(var j=0; j<$houseDash.ui.dispOptions[1].length; j++) {			
						if($houseDash.ui.dispOptions[1][j].itmId == data[i]["OV_"+$houseDash.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
							categories.push(data[i].CHAR_ITM_NM);
							isAlready = true;	
						}
					}
					if(!isAlready) {
						categories.push(data[i].CHAR_ITM_NM.replace('-계',''));
						isAlready = true;
					}
				}
				
				for(var i=0; i<$houseDash.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
					if($houseDash.ui.dispOptions[1][i].objVarId != "13999001") {
						itmLv = $houseDash.ui.dispOptions[1][i].varOrd;
						break;
					}
				}
				
				var tool = $("#emptyHoseChart").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
				$houseDash.chartsOption.chart1MaxVal = maxVal;
				var emptyHoseDiv = $('#emptyHoseChart').highcharts({
					chart: {
				        type: 'bar',
						height: "140px",
						events: {
							load: function() {
								houseChartInitOption(this);
							},
							redraw: function() {
								houseChartInitOption(this);
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
						text: "",
						style: { "display": "none" }
					},
					plotOptions: {
						series: {
						    borderRadius: '5px',
							cursor: 'pointer',
							borderWidth: 0,
							stacking: 'normal',
							dataLabels: {
				                enabled: true,
			        			inside: false,
				                style: {
									fontSize:'12px',
				                    color: "#111111",
									fontFamily: 'NanumSquare',
									textOutline: false
				                },
								formatter:function(){ return numberFormat(this.y)}
				            },
							point: {
								events: {
									click: function() {
									//	if(!this.selected)deselectAllHouseHighcharts();
										/*let currDataKey = data[0].CHAR_ITM_ID;
										$houseDash.selectedCategory = this.category;
										$houseDash.selectedChartSno = 1;
										let d = data[this.index];
										if($houseDash.selectedItmId != "0") {
											if(this.selected == false) {
												$houseDash.selectedItmId = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
												$(".colorck li>a:eq(3)").click();
											} else {
												$houseDash.selectedItmId = "0";
												$(".colorck li>a:eq(0)").click();
											}								
										} else {
											$houseDash.selectedItmId = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
											$(".colorck li>a:eq(3)").click();
										}
											
								    	$totSurvMain.ui.chartTarget = "emptyHoseDiv";
										$houseDash.ajax.params["char_itm_id_list"] = $houseDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
										$houseMap.ui.selectedChrItmId = $houseDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
						    			$houseDash.ajax.params["ov_l" + itmLv + "_list"] = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];							
							    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 " + $houseDash.ui.dispOptions[1][0].chartNm +
							    			"(" + $houseDash.ui.dispOptions[1][0].kosisUnitNm + ")";
								    	$houseDash.ui.chartItmClick($(this), d, "#f08246",$totSurvMain.ui.selectedYear+"년", 
										 $houseDash.ui.dispOptions[1][0].chartNm, "", $houseDash.ui.dispOptions[1][0].kosisUnitNm, data[this.x].DTVAL_CO, totSurvWon);
										this.select();*/
									},
									mouseOver: function() {
									},
									mouseOut: function() {
										tool.css("display", "none");
									},
									select: function() {
									}
								}
							}
						}
					},
					tooltip: {
			        	formatter: function () {
							return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $houseDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
						},
						useHTML: true,
						shared: false,
					    shadow: false,
					    enabled: false,
					},
					xAxis: {
				        categories: categories,
						lineColor: "transparent",
						tickLength: 0,
						labels: {				
							formatter: function() {
								return this.value;
							},
							style: {
								textOverflow: "clip",
								color: "#878A89",
							}
						},
						offset: -5,
				        crosshair: true
				    },
					yAxis: {
						max:max+(max*0.2),
						visible:false,
						title: {
					        text: ''
					    },
						labels: {
				         	enabled: false
				         },
				         stackLabels: {
				        	 enabled: true,
				        	 style: {
				        		 fontSize:'13px',
				                 color: "#111111",
				                 fontFamily: 'NanumSquare',
								 textOutline: false
				        	 },
				             formatter: function() {
								if(data[this.x].SMBL_CN != undefined) {
									return data[this.x].SMBL_CN;
								} else {
									if(data[this.x].DTVAL_CO == 0) return "-";
									else return numberFormat(this.total);
									}
								}
				        },

				        gridLineWidth: 0
						
				    },	 
					series: [{
						data: chartData,
						pointWidth: 11,
						states: {
							select: {
								color: "#576574"
							}
						}
						//borderRadius: 5
					}]
				});
				
				let xaxisLabels = $("#emptyHoseDiv g.highcharts-axis-labels.highcharts-xaxis-labels text");
				for(var h=0; h<xaxisLabels.length; h++) {
					var isAlready = false;
					for(var i=0; i<data.length; i++) {
						if($(xaxisLabels[h]).text() == data[i]["OV_L"+$houseDash.ui.dispOptions[1][0].dispVarOrd+"_KOR"]) {				
							$(xaxisLabels[h]).prop("id", data[i]["OV_L"+$houseDash.ui.dispOptions[1][0].dispVarOrd+"_ID"]);
							isAlready = true;
						}
					}
					
					if(!isAlready) {
						for(var j=0; j<$houseDash.ui.dispOptions[1].length; j++) {			
							if($(xaxisLabels[h]).text() == $houseDash.ui.dispOptions[1][j].altrtvDispWrd) {
								$(xaxisLabels[h]).prop("id", $houseDash.ui.dispOptions[1][j].itmId);
								isAlready = true;
							}
						}
					}
					
					if(!isAlready) {
						for(var j=0; j<$houseDash.ui.dispOptions[1].length; j++) {			
							if($(xaxisLabels[h]).text() == $houseDash.ui.dispOptions[1][j].scrKor) {
								$(xaxisLabels[h]).prop("id", $houseDash.ui.dispOptions[1][j].itmId);
							}
						}
					}
				}
			}
			
			for(var i=0; i<$houseDash.ui.dispOptions[2].length; i++) {		// 항목분류 레벨
				if($houseDash.ui.dispOptions[2][i].objVarId != "13999001") {
					$houseDash.itmLv = "ov_l2_list";
					$houseDash.admLv = "ov_l"+$houseDash.ui.dispOptions[2][i].regionVarOrd+"_list";
					break;
				}
			}
			
			
			//*** 거처의 종류 ***//
			$houseDash.ajax.params.adm_cd = "";
			$houseDash.ajax.params[$houseDash.itmLv] = "20,101,102,103,104,105";	
			$houseDash.ajax.params[$houseDash.admLv] = admCd; 
			$houseDash.ajax.params.tbl_id_list = 'DT_1JU1502';
			$houseDash.ajax.params.char_itm_id_list = "T100"; // 거처
			$houseDash.ajax.params.odr_col_list = 'OV_L2_ID';
	        $houseDash.ajax.params.odr_type = 'ASC';
	        $houseDash.ajax.params.surv_year_list = $totSurvMain.ui.selectedYear;
			$.ajax({
	    		type:"GET",
				async: false,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $houseDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
	    				$houseDash.currentData[result[0].CHAR_ITM_ID] = result;
	    				kindHouseChart2($houseDash.currentData[result[0].CHAR_ITM_ID]);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});
			
			/**
			 * @name         : kindHouseChart2 
			 * @description  : 2번째 차트
			 * @date         : 2021.08.19
			 * @author	     : 이영호
			 * @history 	 : 
			 */
			function kindHouseChart2(data){

				var List = [];
				
				for (var i=0; i < data.length; i++){
					List.push(parseInt(data[i].DTVAL_CO));
				}
				
				var max = Math.max.apply(null, List);
				
				
				$("#ageDiv").data(data[0].CHAR_ITM_ID);	//항목분류코드
				$("#ageDiv span#ageUnit").empty().append("단위: " + $houseDash.ui.dispOptions[2][0].dispUnitNm);	//단위 표시

				$("#ageDiv .colTit").html("거처의 종류");
				
				let maxVal = 0, itmLv, totSurvWon = 0;
				
				for(var i=0; i<data.length; i++) {
					let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
					if(maxVal < parseInt(dtval)) {
						maxVal = parseInt(dtval);
					}		
					totSurvWon += parseInt(dtval);
				}
				var chartData = [], categories = [];
				let chartOpt = $houseDash.ui.dispOptions[2][0];
				maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) + Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * (maxVal.toString().length/40);
				for(var i=0; i<data.length; i++) {
					let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
					chartData.push({y:parseInt(Math.round(dtval/(chartOpt.dispUnit/chartOpt.kosisUnit))), color: $houseDash.chartsOption.color[i],name:data[i].OV_L2_KOR});
					var isAlready = false;
					for(var j=0; j<$houseDash.ui.dispOptions[2].length; j++) {			
						if($houseDash.ui.dispOptions[2][j].itmId == data[i]["OV_"+$houseDash.itmLv.split("_")[2].toUpperCase()+"_ID"]) {
							categories.push(data[i].OV_L2_KOR);
							isAlready = true;	
						}
					}
					if(!isAlready) {
						categories.push(data[i].OV_L2_KOR);
						isAlready = true;
					}
				}
				
				for(var i=0; i<$houseDash.ui.dispOptions[2].length; i++) {		// 항목분류 레벨
					if($houseDash.ui.dispOptions[2][i].objVarId != "13999001") {
						itmLv = $houseDash.ui.dispOptions[2][i].varOrd;
						break;
					}
				}
				
				var tool = $("#kindHouseChart").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
				$houseDash.chartsOption.chart2MaxVal = maxVal;
				var countRoom = $('#kindHouseChart').highcharts({
					chart: {
				        type: 'bar',
						height: "140px",
						events: {
							load: function() {
								houseChartInitOption(this);
							},
							redraw: function() {
								houseChartInitOption(this);
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
						text: "",
						style: { "display": "none" }
					},
					plotOptions: {
						series: {
							cursor: 'pointer',
							borderWidth: 0,
							borderRadius: '4px',
							stacking: 'normal',
							point: {
								events: {
									click: function() {
									//	if(!this.selected)deselectAllHouseHighcharts();
										/*let currDataKey = data[0].CHAR_ITM_ID;
										$houseDash.selectedCategory = this.category;
										$houseDash.selectedChartSno = 2;
										let d = data[this.index];
										if($houseDash.selectedItmId != "0") {
											if(this.selected == false) {
												$houseDash.selectedItmId = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
												$(".colorck li>a:eq(3)").click();
											} else {
												$houseDash.selectedItmId = "0";
												$(".colorck li>a:eq(0)").click();
											}								
										} else {
											$houseDash.selectedItmId = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
											$(".colorck li>a:eq(3)").click();
										}
											
								    	$totSurvMain.ui.chartTarget = "ageDiv";
										$houseDash.ajax.params["char_itm_id_list"] = $houseDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
										$houseMap.ui.selectedChrItmId = $houseDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
						    			$houseDash.ajax.params["ov_l" + itmLv + "_list"] = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];							
							    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 " + $houseDash.ui.dispOptions[2][0].chartNm +
							    			"(" + $houseDash.ui.dispOptions[2][0].kosisUnitNm + ")";
								    	$houseDash.ui.chartItmClick($(this),d, "#576574",$totSurvMain.ui.selectedYear+"년",  
											this.name, $houseDash.ui.dispOptions[2][0].chartNm, "", $houseDash.ui.dispOptions[2][0].kosisUnitNm, data[this.x].DTVAL_CO, totSurvWon);
										this.select();*/
									},
									mouseOver: function() {
									},
									mouseOut: function() {
										tool.css("display", "none");
									},
									select: function(){}
								}
							}
						}
					},
					tooltip: {
			        	formatter: function () {
							return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $houseDash.ui.dispOptions[2][0].kosisUnitNm + ")</b>" ;
						},
						useHTML: true,
						shared: false,
					    shadow: false,
					    enabled: false,
					},
					xAxis: {
				        categories: categories,
						lineColor: "transparent",
						tickLength: 0,
						labels: {			
							step:1,
							formatter: function() {
								return this.value;
							},
							style: {
								textOverflow: "clip",
								color: "#878A89",
							}
						},
						offset: -2
				    },
					yAxis: {
						max:max+(max*0.2),
						title: {
					        text: ''
					    },
						labels: {
				         	enabled: false
				         },
				         stackLabels: {
				        	 opacity: "",
				        	 fontSize:'8px',
				        	 enabled: true,
				        	 style: {
				        		 fontSize:'11px',
				                 color: "#111111",
				                 fontFamily: 'NanumSquare',
								 textOutline: false
				        	 },
				             formatter: function() {
								if(data[this.x].SMBL_CN != undefined) {
									return data[this.x].SMBL_CN;
								} else {
									if(data[this.x].DTVAL_CO == 0) return "-";
									else return numberFormat(this.total);
									}
								}
				        },
				        gridLineWidth: 0,
						
				    },	  
					series: [{
						data: chartData,
						pointWidth: 11,
						stacking: 'normal',
						step:1,
						states: {
							select: {
								color: "#576574"
							}
						}
						//borderRadius: 5
					}]
				});
				
				let xaxisLabels = $("#ageDiv g.highcharts-axis-labels.highcharts-xaxis-labels text");
				for(var h=0; h<xaxisLabels.length; h++) {
					var isAlready = false;
					for(var i=0; i<data.length; i++) {
						if($(xaxisLabels[h]).text() == data[i]["OV_L"+$houseDash.ui.dispOptions[2][0].dispVarOrd+"_KOR"]) {				
							$(xaxisLabels[h]).prop("id", data[i]["OV_L"+$houseDash.ui.dispOptions[2][0].dispVarOrd+"_ID"]);
							isAlready = true;
						}
					}
					
					if(!isAlready) {
						for(var j=0; j<$houseDash.ui.dispOptions[2].length; j++) {			
							if($(xaxisLabels[h]).text() == $houseDash.ui.dispOptions[2][j].altrtvDispWrd) {
								$(xaxisLabels[h]).prop("id", $houseDash.ui.dispOptions[2][j].itmId);
								isAlready = true;
							}
						}
					}
					
					if(!isAlready) {
						for(var j=0; j<$houseDash.ui.dispOptions[2].length; j++) {			
							if($(xaxisLabels[h]).text() == $houseDash.ui.dispOptions[2][j].scrKor) {
								$(xaxisLabels[h]).prop("id", $houseDash.ui.dispOptions[2][j].itmId);
							}
						}
					}
				}
			}
			
			for(var i=0; i<$houseDash.ui.dispOptions[2].length; i++) {		// 항목분류 레벨
				if($houseDash.ui.dispOptions[2][i].objVarId != "13999001") {
					$houseDash.itmLv = "ov_l2_list";
					$houseDash.admLv = "ov_l"+$houseDash.ui.dispOptions[2][i].regionVarOrd+"_list";
					break;
				}
			}
			
			//*** 빈집의 종류 ***//
			$houseDash.ajax.params[$houseDash.itmLv] = "10,20,30,40,50";			
			$houseDash.ajax.params[$houseDash.admLv] = admCd;		
			$houseDash.ajax.params.tbl_id_list = 'DT_1JU1512';
			$houseDash.ajax.params.char_itm_id_list = "T000"; //종사자 수
			$houseDash.ajax.params.odr_col_list = 'OV_L2_ID';
	        $houseDash.ajax.params.odr_type = 'ASC';
	        $houseDash.ajax.params.surv_year_list = $totSurvMain.ui.selectedYear;
			$.ajax({
	    		type:"GET",
				async: false,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $houseDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
	    				$houseDash.currentData[result[0].CHAR_ITM_ID] = result;
	    				kindHouseChart3($houseDash.currentData[result[0].CHAR_ITM_ID]);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});
			
			/**
			 * @name         : kindHouseChart3 
			 * @description  : 3번째 차트
			 * @date         : 2021.08.19
			 * @author	     : 이영호
			 * @history 	 : 
			 */
			function kindHouseChart3(data){
				
				var List = [];
				
				for (var i=0; i < data.length; i++){
					List.push(parseInt(data[i].DTVAL_CO));
				}
				
				var max = Math.max.apply(null, List);
				
				
				$("#countRoom").data(data[0].CHAR_ITM_ID);												//항목분류코드
				$("#countRoom span#ageUnit").empty().append("단위: " + $houseDash.ui.dispOptions[3][0].dispUnitNm);	//단위 표시

				$("#countRoom .colTit").html("빈집의 종류");
				
				let maxVal = 0, itmLv, totSurvWon = 0;
				
				for(var i=0; i<data.length; i++) {
					let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
					if(maxVal < parseInt(dtval)) {
						maxVal = parseInt(dtval);
					}		
					totSurvWon += parseInt(dtval);
				}
				var chartData = [], categories = [];
				let chartOpt = $houseDash.ui.dispOptions[3][0];
				maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) + Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * (maxVal.toString().length/40);
				for(var i=0; i<data.length; i++) {
					let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
					chartData.push({y:parseInt(Math.round(dtval/(chartOpt.dispUnit/chartOpt.kosisUnit))), color: $houseDash.chartsOption.color[i],name:data[i].OV_L2_KOR});
					var isAlready = false;
					for(var j=0; j<$houseDash.ui.dispOptions[3].length; j++) {			
						if($houseDash.ui.dispOptions[3][j].itmId == data[i]["OV_"+$houseDash.itmLv.split("_")[2].toUpperCase()+"_ID"]) {
							categories.push(data[i].OV_L2_KOR);
							isAlready = true;	
						}
					}
					if(!isAlready) {
						categories.push(data[i].OV_L2_KOR);
						isAlready = true;
					}
				}
				
				for(var i=0; i<$houseDash.ui.dispOptions[3].length; i++) {		// 항목분류 레벨
					if($houseDash.ui.dispOptions[3][i].objVarId != "13999001") {
						itmLv = $houseDash.ui.dispOptions[3][i].varOrd;
						break;
					}
				}
				
				var tool = $("#countRoomChart").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
				$houseDash.chartsOption.chart3MaxVal = maxVal;
				var emptyHoseDiv2 = $('#countRoomChart').highcharts({
					chart: {
				        type: 'bar',
						height: "140px",
						events: {
							load: function() {
								houseChartInitOption(this);
							},
							redraw: function() {
								houseChartInitOption(this);
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
						text: "",
						style: { "display": "none" }
					},
					plotOptions: {
						series: {
							cursor: 'pointer',
							borderWidth: 0,
							borderRadius: '5px',
							stacking: 'normal',
							point: {
								events: {
									click: function() {
									//	if(!this.selected)deselectAllHouseHighcharts();
										/*let currDataKey = data[0].CHAR_ITM_ID;
										$houseDash.selectedCategory = this.category;
										$houseDash.selectedChartSno = 1;
										let d = data[this.index];
										if($houseDash.selectedItmId != "0") {
											if(this.selected == false) {
												$houseDash.selectedItmId = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
												$(".colorck li>a:eq(3)").click();
											} else {
												$houseDash.selectedItmId = "0";
												$(".colorck li>a:eq(0)").click();
											}								
										} else {
											$houseDash.selectedItmId = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
											$(".colorck li>a:eq(3)").click();
										}
											
								    	$totSurvMain.ui.chartTarget = "countRoom";
										$houseDash.ajax.params["char_itm_id_list"] = $houseDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
										$houseMap.ui.selectedChrItmId = $houseDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
						    			$houseDash.ajax.params["ov_l" + itmLv + "_list"] = $houseDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];							
							    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 " + $houseDash.ui.dispOptions[1][0].chartNm +
							    			"(" + $houseDash.ui.dispOptions[3][0].kosisUnitNm + ")";
								    	$houseDash.ui.chartItmClick($(this),d, "#f08246",$totSurvMain.ui.selectedYear+"년 빈집의 종류 ("+this.name+")", 
											'', $houseDash.ui.dispOptions[3][0].chartNm, "", $houseDash.ui.dispOptions[1][0].kosisUnitNm, data[this.x].DTVAL_CO, totSurvWon);
										this.select();*/
									},
									mouseOver: function() {
										
									},
									mouseOut: function() {
										tool.css("display", "none");
									},
									select: function() {
									}
								}
							}
						}
					},
					tooltip: {
			        	formatter: function () {
							return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $houseDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
						},
						useHTML: true,
						shared: false,
					    shadow: false,
					    enabled: false,
					},
					xAxis: {
				        categories: categories,
						lineColor: "transparent",
						tickLength: 0,
						labels: {				
							formatter: function() {
								return this.value;
							},
							style: {
								textOverflow: "clip",
								color: "#878A89",
							}
						},
						offset: -5
				    },
					yAxis: {
						max:max+(max*0.2),
						title: {
					        text: ''
					    },
						labels: {
				         	enabled: false
				         },
				         stackLabels: {
				        	 enabled: true,
				        	 style: {
				        		 fontSize:'11px',
				                 color: "#111111",
				                 fontFamily: 'NanumSquare',
								 textOutline: false
				        	 },
				             formatter: function() {
								if(data[this.x].SMBL_CN != undefined) {
									return data[this.x].SMBL_CN;
								} else {
									if(data[this.x].DTVAL_CO == 0) return "-";
									else return numberFormat(this.total);
									}
								}
				        },
				        gridLineWidth: 0,
						
				    },	 
					series: [{
						data: chartData,
						pointWidth: 13,
						states: {
							select: {
								color: "#576574"
							}
						}
						//borderRadius: 5
					}]
				});
				
				let xaxisLabels = $("#countRoom g.highcharts-axis-labels.highcharts-xaxis-labels text");
				for(var h=0; h<xaxisLabels.length; h++) {
					var isAlready = false;
					for(var i=0; i<data.length; i++) {
						if($(xaxisLabels[h]).text() == data[i]["OV_L"+$houseDash.ui.dispOptions[2][0].dispVarOrd+"_KOR"]) {				
							$(xaxisLabels[h]).prop("id", data[i]["OV_L"+$houseDash.ui.dispOptions[2][0].dispVarOrd+"_ID"]);
							isAlready = true;
						}
					}
					
					if(!isAlready) {
						for(var j=0; j<$houseDash.ui.dispOptions[2].length; j++) {			
							if($(xaxisLabels[h]).text() == $houseDash.ui.dispOptions[2][j].altrtvDispWrd) {
								$(xaxisLabels[h]).prop("id", $houseDash.ui.dispOptions[2][j].itmId);
								isAlready = true;
							}
						}
					}
					
					if(!isAlready) {
						for(var j=0; j<$houseDash.ui.dispOptions[2].length; j++) {			
							if($(xaxisLabels[h]).text() == $houseDash.ui.dispOptions[2][j].scrKor) {
								$(xaxisLabels[h]).prop("id", $houseDash.ui.dispOptions[2][j].itmId);
							}
						}
					}
				}
			}

	         /*** 건축연도별 빈집 비율***/
	         $houseDash.ajax.params[$houseDash.itmLv] = "00,10,20,30,40,50";         
	         $houseDash.ajax.params[$houseDash.admLv] = admCd;      
	         $houseDash.ajax.params[$houseDash.admCd] = admCd;   
	         $houseDash.ajax.params.tbl_id_list = 'DT_1JU1512';
	         $houseDash.ajax.params.char_itm_id_list = "T070,T080,T090,T100,T110,T2010,T2011,T2012,T2013,T2014,T2015,T2016,T2017,T2018,T2019,T2020"; //매출액
	         $houseDash.ajax.params.odr_col_list = 'CHAR_ITM_NM,OV_L2_ID';
	         $houseDash.ajax.params.odr_type = 'DESC';
	         $houseDash.ajax.params.surv_year_list = $totSurvMain.ui.selectedYear;
	         
	         $.ajax({
	             type:"GET",
	            async: false,
	             //url: "/view/kosisApi/TotsurvStatData.do",
	            url: sgis4thApiPath,
	             data: $houseDash.ajax.params,
	             success:function( result ){
	                if( result ){
	                   $houseDash.timeEmptyHouse2 = result;
	                   timeEmptyHouseChart($houseDash.timeEmptyHouse2, "houseTimeChart", "N", "180");
	                }
	             },
	             error:function(data) {
	                alert('오류발생~!');
	             }
	          });
	         
	         
				if(mode == "1"){
					$houseDash.ui.drawContent($totSurvMap.ui.selectedSurvId, $totSurvMap.ui.selectedItmCd,  $totSurvMap.ui.selectedC1, $totSurvMap.ui.selectedC2);
				} else {
					if($totSurvMap.ui.map != null){
						$totSurvMap.ui.map.update();
					}
				}
	        
				setTimeout(function() {
					$totSurvMain.ui.loading(false);
				}, 500);
	         /*
	         
				if(mode == "1") {				
					$houseDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
					if($totSurvMain.ui.selectedArea != "00") {
						$houseDash.ui.drawMapData("sgg", "color"); // 맵 그리기
					} else {
						$houseDash.ui.drawMapData("sido", "color"); // 맵 그리기
					}
					
					$totSurvMain.ui.originTilePerColor = $totSurvMain.ui.tilePerColor;
				} else {
					if($houseDash.selectedItmId == "") {
						var houseData = $houseDash.currentData[$houseMap.ui.selectedChrItmId];
						for(var i=0; i<houseData.length; i++) {
							if($totSurvMain.ui.selectedArea == houseData[i]["OV_L" + $houseDash.ui.dispOptions[$houseDash.selectedChartSno][0].regionVarOrd + "_ID"]) {
								$(".dataAreatit h1").html(numberFormat(houseData[i].DTVAL_CO));
								break;
							}
						}
					}
					if($houseMap.ui.map != null){
						$houseMap.ui.map.update();
					}
				}
	         */

		},
		/**
		 * @name         : setTileMapChart 
		 * @description  : 차트 클릭시 변경되는 타일맵 차트
		 * @date         : 2020.09.09
		 * @author	     : juKwak
		 * @history 	 : 
		 * @parameter	 : target - 대상 div, width - 넓이, height - 높이, surv_id - 조사id
		 */
		setTileMapChart : function(target, width, height, surv_id){
			widthArray = [];
			heightArray = [];
			
			$("#itmDiv").html(""); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화
			$("#itmDiv").css("display", "none"); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화
			
			if($totSurvMain.ui.selectedLevel != "3" || $totSurvMap.ui.isAtdrc){
				// 지역별인구 영역을 초기화후 타일맵으로 변경
				$("#"+target).empty();
				$("#"+target).css("background-color", "white");
				// 선택한 지역코드
				var regionCd = $totSurvMain.ui.selectedArea;
				if(regionCd==null || regionCd==undefined){
					regionCd = '99';
				} else if(regionCd.length==2 && $totSurvMap.ui.mapToggleId!=null && $totSurvMap.ui.mapToggleId!=""){
					regionCd = '00';
				} else if(regionCd.length==5){
					// 행정시도 인지 비교
					$totSurvMap.ui.checkIsAtdrc(regionCd);
					if($totSurvMap.ui.isAtdrc){
						// 행정시도 이면서 지도 선택인 경우는 상위지역(시도레벨) 조회(타일맵 변경 없음)  
						if($totSurvMap.ui.mapToggleId!=null && $totSurvMap.ui.mapToggleId!="" && gv_type != "locgov" && gv_type!="totFarmLocgov" && gv_type!="totPeopleLocgov"){ // 2020-11-09 [곽제욱] parameter 분기처리 추가
							regionCd = regionCd.substring(0,2);
						// 아닌경우는 타일맵 변경
						} else {
							regionCd = regionCd;
						}
					}

					else{
						// 행정시도가 아닐경우 상위지역 체크
						$totSurvMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
						// 상위지역이 행정시도인 경우 행정시도로 다시 검색
						if($totSurvMap.ui.isAtdrc){
							regionCd = regionCd.substring(0,4)+"0";
						// 행정시도가 아닐경우 시도로 검색
						} else {								
							regionCd = regionCd.substring(0,2);
							$totSurvMap.ui.isAtdrc = false;
						}
					}
				}
				
				$totSurvMain.ui.titleChange(regionCd); // 2020-12-01 [곽제욱 타일맵 클릯기 titleChange 이벤트 추가
				
				// 선택년도
				var year = $totSurvMain.ui.selectedYear;
				if(surv_id == "" || surv_id == null || surv_id == undefined){
					surv_id = "PH0001";
				}
				// 선택한 itmCd
				var itm_cd = $totSurvMap.ui.selectedItmCd;
				if(itm_cd == "" || itm_cd == null || itm_cd == undefined){
					itm_cd = "T100";
				}
				
				// C1
				/** 2020-10-15 [곽제욱] 각 주제별 타일맵 변수 초기화 START */
				if(target == "areaPopulation"){
					itm_cd = "T100";
				}
				/** 2020-10-15 [곽제욱] 각 주제별 타일맵 변수 초기화 END */
				
				if(target == "areaFishery" ){
					var c1 = $totSurvMap.ui.selectedC1;
					if(c1 == "" || c1 == null || c1 == undefined){
						c1 = "000";
					}						
					itm_cd = "T00"; //20201110 박은식 어업 인구에서 가구로 변경 START
				}
				//20201019 박은식 주택 일 경우 itm_cd 변경 START
				if(target == "areaHouse"){
						itm_cd = "T310";
				}
				if(target == "areaFarm" ){
					var c1 = $totSurvMap.ui.selectedC1;
					if(c1 == "" || c1 == null || c1 == undefined){
						c1 = "000";
					}
					itm_cd = 'T00'; // 2020-11-19 [곽제욱] 농업 인구에서 가구로 변경
					$totSurvMap.ui.selectedC1 = c1;
					$totSurvMap.ui.selectedItmCd = itm_cd;
				}
				//20201019 박은식 주택 일 경우 itm_cd 변경 END
				
				// 2020-10-13 임업 대쉬보드 추가 START jhs
				if(target == "areaForestry" ){
					var c1 = $totSurvMap.ui.selectedC1;
					if(c1 == "" || c1 == null || c1 == undefined){
						c1 = "000";
					}
				}
				// 2020-10-13 임업 대쉬보드 추가 END jhs
				
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/totSurv/populationDash/getTotAreaPopulation.json", // 공통쿼리로 수정필요
					data: { year: year, region_cd : regionCd, surv_id : surv_id, itm_cd : itm_cd, isAtdrc:$totSurvMap.ui.isAtdrc, c1:c1}, // 
					dataType: "json",
					success: function(res) {
						if (res.errCd == "0") {
							var data = res.result.areaData;
							$totSurvMain.ui.sidoMaxRank = res.result.maxRank[0].cnt;
							$totSurvMain.ui.sggEmdongMaxRank = res.result.maxRank[1].cnt;
							// 행정자치시(수원시 등) 랭킹 
							$totSurvMain.ui.atdrcRank = res.result.maxRank[2].cnt;
							// set the dimensions and margins of the graph
							var margin = {top: 0, right: 0, bottom: 0, left: 0},
								width = 288 - margin.left - margin.right,
								height = 250 - margin.top - margin.bottom;
							
							// opacity(불투명도) 측정을 위한 최대도메인, 최소도메인 계산
							// data[0].dt 는 tree map 를 위한 부모데이터, 1번부터 최대길이까지 값 정렬
							var mindomain = data[1].dt;
							var maxdomain = data[data.length-1].dt;
							
					        var total = 0; 
					        /** 2020.10.12[곽제욱] 타일차트 NaN 처리 START */
					        for(var i=0; i<data.length; i++){ //20201013 박은식 반복문 i가 1부터 시작하여 첫번째 데이터를 합산 안하여 0으로 변경
					        	total += Number(data[i].dt);
					        }
					        /** 2020.10.12[곽제욱] 타일차트 NaN 처리 END */
							
							res = res.result.areaData;
							/*for(var i=0; i<res.length; i++) {
								if(res[i]["region_cd"] == $totSurvMain.ui.selectedArea) {
									res.splice(i,1);
									i--;
								}
							}*/
							
							var chartData = [];
							for(var i=0; i<res.length; i++) {
								let treeColor = "";				
								for(var j=0; j<$totSurvMain.ui.tilePerColor.length; j++) {
									if(res[i].region_cd == $totSurvMain.ui.tilePerColor[j].adm_cd) {
										treeColor = $totSurvMain.ui.tilePerColor[j].color;
									}					
								}
								
								function hexToRgba(hex) {
									var result;
									if(hex.length > 0) {
										if(hex.length > 4) {
											result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
										} else {
											result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
											result[1] += result[1];
											result[2] += result[2];
											result[3] += result[3];
										}
										
										if(result){
											var r= parseInt(result[1], 16);
											var g= parseInt(result[2], 16);
											var b= parseInt(result[3], 16);
											return "rgba("+r+","+g+","+b+", 1)";//return 23,14,45 -> reformat if needed 
										} 
									}
									
									return null;
								}
								
								chartData.push({
									id: res[i].region_cd,
									name: res[i].region_nm,
									value: parseInt(res[i].dt),
									color: hexToRgba(treeColor)
								});
							}
							console.log(chartData);
							
							var tool = $(".TileMaptoolTip");
							Highcharts.chart(target, {
								tooltip: {		        	
								    enabled: false,
								},
								plotOptions: {
									borderRadius: '5px',
									series: {
										cursor: 'pointer',
										//borderWidth: 0,
										stacking: 'normal',
										point: {
											events: {
												click: function() {			
												//20210222 박은식 총조사인구 차트선택 이후 타일맵 클릭 시 초기화 START
											    	if($totSurvMap.ui.selectedObj != undefined && 
											    	   $totSurvMap.ui.selectedObj != null &&
											    	   $totSurvMap.ui.selectedObj != "" &&
											    	   $totSurvMap.ui.selectedObj.attr("id") == "totalPopulation") {
											    		for(var i=0; i < $(".yearBtn").length; i++){
														    if($(".yearBtn").eq(i).hasClass("on")){
														    	$totSurvMain.ui.selectedYear = $(".yearBtn").eq(i).text();
														    }
														}
											    	}
											    	//20210222 박은식 총조사인구 차트선택 이후 타일맵 클릭 시 초기화 END
											    	$totSurvMain.ui.tileChangeYn = "Y";
											    	var region_cd = this.id;
											    	$totSurvMain.ui.selectedArea = region_cd; // 선택한 지역코드를 selectedArea 에 세팅
											    	$totSurvMap.ui.map.setPolyLayerHighlight(""); // 2020-10-12 [곽제욱] 하이라이트 초기화
											    	$totSurvMap.ui.mapToggleId = ""; // 맵토글 ID 초기화
											    	
											    	
											    	var params = 'year='+$totSurvMain.ui.selectedYear+',region_cd='+region_cd;
											    	if( $totSurvMain.ui.selectedThema === '주택' ){
											    		srvLogWrite('P0','05','03','01',$totSurvMain.ui.selectedThema,params);
											    	} 
											    	
								    				// 2020-10-26 [곽제욱] 어가 해수면/내수면 분기처리 END
											    	// 시도에서 rect 각 인구 클릭시  지도에서 해당지역 경계 재검색
											    	if(region_cd.length == 2){
											    		if(region_cd == "00") {
											    			$totSurvMain.ui.selectedLevel = "0";
											    		} else {
											    		$totSurvMain.ui.selectedLevel = "1";
											    		}
											    		$totSurvMain.ui.getSidoSggPos(region_cd);
											    		$totSurvMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
											    		$totSurvMap.ui.selectedC1 = "";
											    		$totSurvMap.ui.selectedC2 = "";
											    		if($totSurvMain.ui.selectedThema == "주택"){
											    			$totSurvMap.ui.selectedItmCd = "T310";
												    		$totSurvMap.ui.selectedSurvId = "PH0001";
												    		$houseDash.event.allChange(region_cd, "1");
												    		$houseDash.ui.getRankSet("", "",region_cd);//20201020 박은식 주택 대시보드에서 타일차트 클릭 시 슬라이드 셋팅
											    		}
											    		
											    		$totSurvMain.ui.tilePerColor.length = 0; // 2020-11-11 [곽제욱] 범례색상 배열 초기화
											    	}
											    	// 시군구 데이터 일 경우 kosis정보 호출
											    	else if(region_cd.length == 5){
											    		$totSurvMain.ui.selectedArea = region_cd;
											    		$totSurvMain.ui.getSidoSggPos(region_cd);
											    		$("#dash_sido").val(region_cd.substring(0,2));
											    		// 선택한 지역 하이라이트
											    		//$totSurvMap.ui.map.setPolyLayerHighlight(region_cd);
											    		// 인구.... 
											    		// 비자치 구인지 체크한다.
											    		$totSurvMap.ui.checkIsAtdrc(region_cd);	
											    		if($totSurvMap.ui.isAtdrc != true){
											    			// 2020-11-12 [곽제욱] 최하레벨 tileMap 선택시 색상변경 로직 START
											    			if($totSurvMap.ui.mapToggleId != $totSurvMain.ui.selectedArea){
											    				for(var i=0; i<$totSurvMain.ui.tilePerColor.length; i++){
											    					if($totSurvMain.ui.tilePerColor[i].adm_cd != $totSurvMain.ui.selectedArea){
											    						var tempAdmCd = $totSurvMain.ui.tilePerColor[i].adm_cd;
											    						var tempColor = $totSurvMain.ui.tilePerColor[i].color;
											    						$("rect[value='"+tempAdmCd+"']").attr("fill", tempColor);								    													    						
											    					} else {
											    						$("rect[value='"+$totSurvMain.ui.selectedArea+"']").attr("fill", "#0086c6");								    						
											    					}
											    				}
			
											    			} else {
											    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
											    				var tempColor = '';
											    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
											    					if($totSurvMain.ui.tilePerColor[i].adm_cd == $totSurvMap.ui.mapToggleId){
											    						tempColor = $totSurvMain.ui.tilePerColor[i].color
											    					}
											    				}
											    				//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $totSurvMap.ui.mapToggleId}).color;
											    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
											    				$("rect[value='"+$totSurvMap.ui.mapToggleId+"']").attr("fill", tempColor);
											    			}
											    			// 2020-11-12 [곽제욱] 최하레벨 tileMap 선택시 색상변경 로직 END
											    			if($totSurvMain.ui.selectedThema == "주택"){
											    				//20201019 박은식 타일차트 클릭 시 로직 수정 START
											    				$totSurvMain.ui.tileChangeYn = "N";
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				if($totSurvMap.ui.mapToggleId != $totSurvMain.ui.selectedArea) {
																	// 선택한 지역 하이라이트
														    		$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
														    		$totSurvMap.ui.mapToggleId = $totSurvMain.ui.selectedArea;
																} else {
																	$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
																	$totSurvMap.ui.mapToggleId = "";
																}  
																$totSurvMap.ui.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,4)+"0");
																$houseDash.event.allChange($totSurvMain.ui.selectedArea, "2"); // 맵이동 없음
											    				//20201019 박은식 타일차트 클릭 시 로직 수정 END
											    			}
											    			
											    			var title = $("#dash_sgg option:selected").html(); // 2020-10-26 [곽제욱] 선택지역 변경 
															$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
											    			// 개방형지도란 버튼 비활성화
											    			$(".mapInfo").show();
											    			
										    				// 2020-11-30 [곽제욱] 최하레벨 타일맵 클릭시 Navigation 변경 START
									    					if($totSurvMain.ui.selectedArea.substring(4,5)=="0"){
																$totSurvMain.ui.pathChange("atdrc", $totSurvMain.ui.selectedArea);
															} else {
																$totSurvMain.ui.pathChange("emdong", $totSurvMain.ui.selectedArea);
															}
									    					$totSurvMain.ui.titleChange($totSurvMain.ui.selectedArea); // 2020-12-01 [곽제욱 타일맵 클릯기 titleChange 이벤트 추가
									    					// 2020-11-30 [곽제욱] 최하레벨 타일맵 클릭시 Navigation 변경 END
											    		}
											    		else{
											    			console.log("#########################   비자치구 클릭됨     ##############");
											    			$totSurvMain.ui.selectedLevel = "2"; // 선택레벨 3으로 세팅(슬라이드 삭제)
											    			$totSurvMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
											    			if($totSurvMain.ui.selectedThema == "주택"){
			//								    				alert(">>>>>> 주택.... 비자치구..........");
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				// TODO::
											    				$houseDash.event.allChange(region_cd, "1");
											    			}
											    			
											    			// 2020-10-13 임업 대쉬보드 추가 END jhs
											    			$totSurvMain.ui.tilePerColor.length = 0; // 2020-11-11 [곽제욱] 범례색상 배열 초기화
											    		}
											    		//$totSurvMain.ui.selectedLevel = '3'; // 2020-10-15 [곽제욱] 개방형지도 기능 막기로 으로 인한 주석처리, 추후 개방형지도 기능 open시 주석 제거 필요
											    		//$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea); // 2020-10-06 [곽제욱] 타일차트 클릭시 하이라이트 설정 제거
											    		if($totSurvMain.ui.selectedThema == "주택"){
											    			$houseDash.ui.getRankSet("", "",region_cd)								    			
											    		}
											    	}				    	
											    	
												},
												mouseOver: function() {
								
													let totDtArr = res;
													
													var ratio = 0;
											        if(total != 0 && total !=""){
											        	ratio = (this.value / total * 100).toFixed(2)
											        } else {
											        	ratio = 100;
											        }
											        
											        var unit = "(호)";
											        tool.html("<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + this.name + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;'>" + numberFormat(this.value) + "</p>" + unit + "<br>" + "<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>" + numberFormat(ratio) + "</p>" + "%"); /*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
											        
													tool.css("display", "inline-block");
													
													$(document).on("mousemove", function(evt) {
														tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
												        tool.css("top", evt.clientY-70);								        
													});
											        
												},
												mouseOut: function() {
													$(document).off("mousemove");
													tool.css("display", "none");
												}
											}
										}
									}
								},
								chart: {
									width: width,
									height: height,
									marginLeft: 0,
									marginRight: 0,
									marginTop: 0,
									marginBottom: 0,
									spacingLeft: 0,
									spacingRight: 0,
									spacingTop: 0,
									spacingBottom: 0,
									events: {
										load: function() {
											
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
									text: "",
									style: { "display": "none" }
								},
							    series: [{
							        type: 'treemap',			        
							        data: chartData,
									dataLabels: {
										verticalAlign: "top",
										align: "left",
										style: {
											fontSize: '10px',
											fontWeight: '100',
											color: '#FFFFFF',
											textOverflow: 'clip',
											textOutline: 'none'
										},
										padding: 2,
										formatter: function () {
											if(this.point.shapeArgs == undefined) {
												return "";
											}
					                        var boxWidth = this.point.shapeArgs.width;
					                        var boxHeight = this.point.shapeArgs.height;
					                        if(boxWidth < 12) {
					                        	return "";
					                        }
					                        var lineLength = Math.floor(boxWidth / 11);
					                        var heightLength = Math.floor(boxHeight / 15);
					                        var nameParts = this.point.name.split("");
					                        var name = [];
					                        var line = "";
					                        for(var i=0; i<nameParts.length; i++) {
					                        	line = line.concat(nameParts[i]).concat("");
					                            if(line.length == lineLength) {
					                                name.push(line);
					                                line = "";
					                            }
					                        }
					                        name.push(line);
					                        for(var i=0; i<name.length; i++) {
					                        	if(i+1>heightLength) {
					                        		name.splice(i, name.length);
					                        		break;
					                        	}
					                        }
					                        	
					                        return name.join("<br/>"); 
					                    }
									},
									states: {
						                hover: {
						                    enabled: false
						                },
						                mouseout: {
						                	enabled: false
						                }
						            },
									layoutAlgorithm: 'squarified'
							    }]
							});
						}
					},
					error: function(e) {
						alert('failed');
					},
					complete : function(e){
						
					}
				});
			}
		},
		
		/**
		 * @name		 : allClear 
		 * @description  : 인구총조사 모든 차트데이터, 총인구데이터 초기화
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		allClear : function(){
			$("#emptyHoseChart").empty(); // 주택의 종류 초기화
			$("#kindHouseChart").empty(); // 거처의 종류 초기화
			$("#countRoomChart").empty(); // 빈집의 종류 초기화
			$("#houseTimeChart").empty(); // 건축연도별 빈집 초기화
			$(".TileMaptoolTip").html(); // 2020-10-13 [곽제욱] 초기화후 툴팁영역 재생성 방지
			$("#clickItmName").html("지도");
			/* 총인구 영역(순위, 증감율, 슬라이드) 초기화 */
			
		},
		/**
		 * @name		 : setDefaultParams 
		 * @description  : 경제총조사 기본 파라메터 셋팅
		 * @date		 : 2021.08.30
		 * @author		 : 이영호
		 * @history 	 :
		 */
		setDefaultParams : function(year) {
			$houseDash.ajax.params.surv_year_list = year;			
				$houseMap.ui.selectedTblId = 'DT_1JU1501';
				$houseDash.ajax.params.tbl_id_list = 'DT_1JU1501';
				$houseDash.ajax.params.adm_cd = 'l1:00';
			//	$houseDash.chartsOption.color = ["#f08246", "#009589"];
		},
		/**
		 * @name		 : setDispOptions 
		 * @description  : 화면 셋팅 불러오기
		 * @date		 : 2021.08.30
		 * @author		 : 이영호
		 * @history 	 :
		 */
		setDispOptions : function(year) {
			$houseDash.ui.dispOptions = {};
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: "/view/totSurv/getDispSrvList.do",
				data: {
					iemCl: "S_HOS",
					stattbYear: $totSurvMain.ui.selectedYear
				},
				dataType: "json",
				success: function(res) {
					for(var i=0; i<res.dispOptions.length; i++) {
						if($houseDash.ui.dispOptions[res.dispOptions[i].chartSno] == undefined) {
							$houseDash.ui.dispOptions[res.dispOptions[i].chartSno] = [];
							$houseDash.ui.dispOptions[res.dispOptions[i].chartSno].push(res.dispOptions[i]);
						} else {
							for(var j=0; j<Object.keys($houseDash.ui.dispOptions).length; j++) {
								if(Object.keys($houseDash.ui.dispOptions)[j] == res.dispOptions[i].chartSno) {
									$houseDash.ui.dispOptions[res.dispOptions[i].chartSno].push(res.dispOptions[i]);
								}
							}
						}						
					}
					for(var i=0; i<$houseDash.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
						if($houseDash.ui.dispOptions[1][i].objVarId == "13999001") {
							//	$houseDash.itmLv = "ov_l"+$houseDash.ui.dispOptions[1][i].varOrd+"_list";
								$houseDash.itmLv = "ov_l2_list";
								$houseDash.admLv = "ov_l"+$houseDash.ui.dispOptions[1][i].regionVarOrd+"_list";
								break;
							}
					}
					$houseDash.ajax.params[$houseDash.itmLv] = '0';
					$houseDash.ajax.params[$houseDash.admLv] = '00';
				},
				error: function(e) {
					//$totSurvMain.ui.alert(errorMessage);
				}
			});	
		},
		
	};

	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};
	
	
	
}(window, document));

/**
 * @name         : timeEmptyHouseChart 
 * @description  : 주택종류별 빈집 차트
 * @date         : 
 * @author	     : 
 * @history 	 : 2020-10-14
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이
 */
function timeEmptyHouseChart(resultData, target, resizeYn, height){
	
	$("#"+target).empty();
	var data = {
			year:[],
			house:[],
			apartment:[],
			multifamily:[],
			rowHouses:[],
			nonResident:[],
			c1:[],
			itm_cd:[],
			surv_id:[],
			//절대값
			houseDt:[],
			multifamilyDt:[],
			apartmentDt:[],
			rowHousesDt:[],
			nonResidentDt:[]
	}
	
	var max = [];
	var year = [];
	var itm_cd = [];
	//data 차트에 적용할 수 있도록 변환 작업 START
	for(var i=0;i<resultData.length; i++){ //지표 선별
		
		if(resultData[i].OV_L2_ID == '00'){
			max.push(resultData[i].DTVAL_CO);
			data.itm_cd.push(resultData[i].CHAR_ITM_ID);
			data.year.push(resultData[i].CHAR_ITM_NM);
			itm_cd.push(resultData[i].CHAR_ITM_ID);
			year.push(resultData[i].CHAR_ITM_NM);
		}
	}
	var tempData = {};
	for(var i=0;i<year.length;i++){ //빈값 0으로 데이터 추가 
		for(var j=0; j < resultData.length; j++){
			if(Object.keys(tempData).indexOf(year[i]) == -1){
				tempData[year[i]] = [];
			}
			if(year[i] == resultData[j].CHAR_ITM_NM){
				tempData[year[i]].push(resultData[j])
			}
		}
	}
	
	
	for(var i=0;i<year.length;i++){ //data 정렬
		var tempC1 = [];
		for(var j=tempData[year[i]].length-1;j>=0;j--){
			tempC1.push(tempData[year[i]][j].OV_L2_ID);
		}
		
		
	}
	
	
	for(var i=0; i < year.length; i++){		
		for(var j=4; j >= 0; j--){
			switch(tempData[year[i]][j].OV_L2_ID){
				case "10" : 
					data.house.push(tempData[year[i]][j].DTVAL_CO/max[i]*100);
					data.houseDt.push({y:Number(tempData[year[i]][j].DTVAL_CO),data:tempData[year[i]][j]})
					break;
				case "20" : 
					data.apartment.push(tempData[year[i]][j].DTVAL_CO/max[i]*100)
					data.apartmentDt.push({y:Number(tempData[year[i]][j].DTVAL_CO),data:tempData[year[i]][j]})
					break;
				case "30" :
					data.multifamily.push(tempData[year[i]][j].DTVAL_CO/max[i]*100)
					data.multifamilyDt.push({y:Number(tempData[year[i]][j].DTVAL_CO),data:tempData[year[i]][j]})
					break;
				case "40" :
					data.rowHouses.push(tempData[year[i]][j].DTVAL_CO/max[i]*100)
					data.rowHousesDt.push({y:Number(tempData[year[i]][j].DTVAL_CO),data:tempData[year[i]][j]})
					break;
				case "50" :
					data.nonResident.push(tempData[year[i]][j].DTVAL_CO/max[i]*100)
					data.nonResidentDt.push({y:Number(tempData[year[i]][j].DTVAL_CO),data:tempData[year[i]][j]})
					break;
				default :
					break;
			}
		}
	}
	//data 차트에 적용할 수 있도록 변환 작업 END
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	
	
	 var chart = {
		      type: 'column'
		   };
		   var title = {
		      text: '' 
		   };    
		   var xAxis = {
		      categories: year,
				lineColor:'#000',
		      labels:{
		    	 style :{ fontSize:'10px', fontWeight: '100',fontFamily: 'NanumSquare',}
		      }
		   };
		   var yAxis ={
		      min: 0,
		      max:100,
				tickWidth: 1,
	        	tickLength: 10,
				tickColor:'#000',
				lineColor:'#000',
				lineWidth:1,
		      tickAmount:6,
		      title: {
		        text: ''
		      }, 
		        gridLineWidth: 0,
				labels: {
	                formatter: function () {
	                    let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
						v = v==100?'100%':v;
	                    return v;
	                }            
	            }
		   };  
		   var tooltip = {  
				      //  headerFormat: '<b>{point.x}</b><br/>',
				     //   pointFormat: '{xAxis.categories} {series.name}: {point.y}호<br/>'
					/*  borderColor: '#FFFFFF',
					  backgroundColor: '#FFFFFF',
					  borderWidth: 1, 
					  useHTML: true,
		              crosshairs: true,
					  formatter: function(){
					      var content = '';
					      content += '<p style = "color: #3d4956;white-space:nowrap;margin-bottom: 5px;font-weight: 100; font-size:13px;">'+ this.x + ' ' +this.series.name + '</p>' +
					      			 '<p style = "padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;font-weight: 100"> </p>' +
					                 '<span style="color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;white-space:nowrap; font-size:13px; text-align:center;">'  +  numberFormat(this.y)  +  '</span>' +
					                  '<span style="font-size:13px;text-align:center;">호</span>';
					               return content;
					       }
				      */
				   enabled:false
		   };
	         var plotOptions = {
	                 column: {
		                  stacking: 'percent',
		                  borderWidth: 0,
		                  dataLabels: {
		                       style: {
				        			inside: false,
									fontSize:'13px',
			                        fontWeight: '100',
			                        color: '#FFFFFF',
			                        textOverflow: 'clip',
			                        textOutline: false,
									fontFamily: 'NanumSquare',
		                       },
		                           enabled: true,
		                         formatter: function() {
		                        	 if((this.y/this.total*100).toFixed(1)<10) {
		                                 return ''
		                               }
		                              return (this.y/this.total*100).toFixed(1) ;
		                        }
		                      }  ,
		                       
		                 }, 
	                 series:{
	     				slicedOffset: 0,
						states:{
							select:{
								color:'rgb(87, 101, 116)'
							}
						},
	                    pointWidth: 70,
	                    cursor: 'pointer',
	                    point: {
	                       events: {
	                    	   mouseOver: function() {
	       						
	   							tool.css("display", "inline-block");
	   							//2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
	   							let totDtArr = data;
	   							$(document).on("mousemove", function(evt) {
	   								if(window.innerWidth - evt.clientX < tool.width()) tool.css("left", window.innerWidth - 160); 
									else tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
							        tool.css("top", evt.clientY-75);								        
	   							});
	   	
	   							
	   					         var unit = "호";
	   					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year[this.x] + ' ' +this.series.name +"</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>호");//20201202 박은식 증가 감소에 따른 색상 변경
	   					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
	   						},
	   						mouseOut: function() {
	   							$(document).off("mousemove");
	   							tool.css("display", "none");
	   						},
	                          click: function(d, i) {
							//	if(!this.selected)deselectAllHouseHighcharts();
	                             //let currDataKey = $houseDash.timeEmptyHouse[0].CHAR_ITM_ID;
	                             $houseDash.selectedCategory = this.category;
	                             $houseDash.selectedChartSno = 1;
	                             if($houseDash.selectedItmId != "0") {
	                                if(this.selected == false) {
	                                   $houseDash.selectedItmId = $houseDash.timeEmptyHouse[this.index]["OV_L1_ID"];
	                                   $(".colorck li>a:eq(3)").click();
	                                } else {
	                                   $houseDash.selectedItmId = "0";
	                                   $(".colorck li>a:eq(0)").click();
	                                }                        
	                             } else {
	                                $houseDash.selectedItmId = $houseDash.timeEmptyHouse[this.index]["OV_L1_ID"];
	                                $(".colorck li>a:eq(3)").click();
	                             }
	                                
	                             $totSurvMain.ui.chartTarget = "countRoom";
	                             $houseDash.ajax.params["char_itm_id_list"] = $houseDash.timeEmptyHouse[this.index]["CHAR_ITM_ID"];
	                             $houseMap.ui.selectedChrItmId = $houseDash.timeEmptyHouse[this.index]["CHAR_ITM_ID"];
	                             $houseDash.ajax.params["ov_l1_list"] = $houseDash.timeEmptyHouse[this.index]["OV_L1_ID"];                     
	                             $totSurvMain.ui.chartTitle = year[this.x] +" 건축연도별 빈집 비율 (" + this.series.name + ")";//20210226 박은식 툴팁변경
	                             $houseDash.ui.chartItmClick($(this), this.data, "#576574", year[this.x] +" 건축연도별 빈집 비율 (" + this.series.name  + ")",3);//20210226 박은식 툴팁변경
	             				this.select();
	    					},
	    					select: function() {
	    						
	    					}
	                          
	                       }
	                    
	                    }
	                 }
	              };
		   var credits = {
		      enabled: false
		   };
		   var legend = {
				   enabled: false
		   };
		   var exporting = {
				   enabled: false
		   };
		   var houseDtInt = data.houseDt;
		   var apartmentDtInt = data.apartmentDt;
		   var multifamilyDtInt = data.multifamilyDt;
		   var rowHousesDtInt = data.rowHousesDt;
		   var nonResidentDtInt = data.nonResidentDt;
		   
		   var series= [
			   {
		            name: '비거주용 건물내 주택',
		            data: nonResidentDtInt,
		            color:'#a8ddb5'
		        }, {
		            name: '다세대주택',
		            data: rowHousesDtInt,
		            color:'#7bccc4'
		        }, {
		            name: '연립주택',
		            data: multifamilyDtInt,
		            color:'#4eb3d3'  
		        } , {
		            name: '아파트',
		            data: apartmentDtInt,
		            color:'#2b8cbe'
		        }, {
			   		name: '단독주택',
		            data: houseDtInt,
		            color:'#08589e'
		        },
		        
		  ];     
		   
		   var json = {};   
		   json.chart = chart; 
		   json.title = title;   
		   json.xAxis = xAxis;
		   json.yAxis = yAxis;   
		   json.tooltip = tooltip;
		   json.legend = legend;
		   json.exporting = exporting;
		   json.plotOptions = plotOptions;
		   json.credits = credits;
		   json.series = series;
		   $('#houseTimeChart').highcharts(json);
	
}

function houseChartInitOption(a) {
	let divId = $(a.container).parent().prop("id");
	let divWrapId = $(a.container).parent().parent().prop("id");
	$('#' + divId + ' .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#' + divId + ' .highcharts-data-labels span').last().css("top", "10px");
	
	// 생략 무시
	var ellipsisLegend = $("#" + divId + " g.highcharts-axis-labels title");
	for(var i=0; i<ellipsisLegend.length; i++) {
		if(ellipsisLegend[i]) {
			var str = $(ellipsisLegend[i]).text()
				+ "<tspan class='highcharts-br' dy='15' x='21'>&ZeroWidthSpace;</tspan>";
			$(ellipsisLegend[i]).parent().empty().append(str);
		}
	}
	
	$("#" + divId + " g.highcharts-axis-labels.highcharts-xaxis-labels text").each(function(index, textContent) {
		if($(textContent).text().length) {
			$(textContent).css("font-size", "12px");
			$(textContent).css("color", "#878A89");
			$(textContent).css("font-family", "#NanumSquare");
			if($(textContent)[0].nodeName.toLowerCase() == "span") {
				$(textContent).css("letter-spacing", "-2px");
			} else {
				$(textContent).css("letter-spacing", "-2");
			}
		}
	});
	
	let cOffsetLeft = $("#" + divId + " g.highcharts-axis-labels.highcharts-xaxis-labels").offset().left;
	
	
	$("#" + divId + " g.highcharts-axis-labels.highcharts-yaxis-labels text, #" + divId + " div.highcharts-axis-labels.highcharts-yaxis-labels span").each(function(index, textContent) {
		let yaxisWidth = $(textContent).text().length*7;
		$(textContent).css("width", yaxisWidth + "px");
		
		$(textContent).text($(textContent).text().replace(/ /g,""));
		
		if($(textContent).text().indexOf(".") != -1) {
			if($(textContent)[0].nodeName == "span") {
				$(textContent).css("letter-spacing", "-1px");
			} else {
				$(textContent).css("letter-spacing", "-1");
			}
		} else {
			if($(textContent).text().length) {
				if($(textContent)[0].nodeName.toLowerCase() == "span") {
					$(textContent).css("letter-spacing", "-2px");
				} else {
					$(textContent).css("letter-spacing", "-2");
				}
			}
		}
	});
}

function deselectAllHouseHighcharts() {
	$houseDash.highcharts.forEach(function(selector){
		if(selector.category == $houseDash.selectedCategory) {
			selector.select(false);
			$houseMap.ui.selectedObj = $(selector).slice(); 
		}

	});
}


/*********** Kosis Detail Option for SearchList Sub Start **********/
(function() {
	$class("kosis.serviceApi.kosisDetailOptionHouse.api").extend(sop.portal.absAPI).define({
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
/*********** Kosis Detail Option for SearchList Sub End  **********/



/*********** Kosis Data List Start **********/
(function() {
	$class("kosis.serviceApi.kosisDataListHouse.api").extend(sop.portal.absAPI).define({
		onSuccess : function(status, res, options) {
			var result = res.result;
			var map = options.mapDelegate;
			var atdrc_yn = options.atdrc_yn;
			console.log(res);
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
}());
/*********** Kosis Data List Sub End **********/
