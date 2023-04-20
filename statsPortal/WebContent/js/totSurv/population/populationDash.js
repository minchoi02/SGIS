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
	W.$populationDash = W.$populationDash || {};

	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$populationDash.isDev = true;
	/* 공공데이터 조회 변수*/
	$populationDash.org_id = "";
	$populationDash.tbl_id = "";
	$populationDash.kosis_data_item = "";
	$populationDash.kosis_data_period = "";
	$populationDash.kosis_data_year = "";
	$populationDash.gis_se = "";
	$populationDash.obj_var_id = "";
	$populationDash.field_id = "";
	$populationDash.kosis_data_item_detail = "";
	$populationDash.ajax = {};
	
	$populationDash.kosis_result_data = [];
	
	//현재 그려진 d3의 데이터를 담는 변수
	$populationDash.localPopleData = {};
	$populationDash.foreignerData = {};
	$populationDash.ageDistributionData = {};
	$populationDash.moveHomeData = {};
	$populationDash.totalPopulationData = {};
	$populationDash.totPopulationMulticulData = {};
	//현재 그려진 d3의 데이터를 담는 변수
	
	//현재 조회하고있는 rank 지역 level
	$populationDash.regionLevel = 'sido';
	//행정시도 정보를 담아둔다
	$populationDash.atdrc = '';	
	//비자치구에서 행정시로 이동여부
	$populationDash.upperBack = false;
	//연령분포 폴리곤 클릭 시 단위 변경을 위한 기준 변수 
	$populationDash.polygonSelectArea = "";	
	
	
	$(document).ready(function() {
		
	});
	
	//d3 반응형 이벤트
	$(window).resize( function(){
		if($totSurvMain.ui.pageIndex == '1' && !$(".mapExport").hasClass('on')){
			//20201014 박은식 맵확대 축소시 고정값에서 비율로 변경 START
			$("#localDiv").outerWidth('50%');
			$("#foreignerDiv").outerWidth('50%');
			$("#ageDistribution").outerWidth('100%');
			$("#moveHome").outerWidth('100%');
			$("#multiculPopulationChart").outerWidth('100%');
			$("#populationTimeChart").outerWidth('100%');
			//20201014 박은식 맵확대 축소시 고정값에서 비율로 변경 ENM
			// 내국인 차트 세팅
			// 2020-10-14 [곽제욱] resize 후 차트 새로그릴때 조건절 추가 START
			if($populationDash.localPopleData.length > 0){
				genderPieChart($populationDash.localPopleData, "local_people1", "Y", "140");
			}
			
			// 외국인 차트 세팅
			if($populationDash.foreignerData.length > 0){ 
				genderPieChart($populationDash.foreignerData, "foreigner_people1", "Y", "140");
			}
			
			
			//연령분포 차트 세팅
			if($populationDash.ageDistributionData.length > 0){ 
				setPeopleAgeChart($populationDash.ageDistributionData, "ageDistribution", "Y", "131"); //2020.10.15[신예리] 높이 값 수정
			}
			
			//거주지이동 차트 세팅
			if($populationDash.moveHomeData.length > 0){ 
				setPopulationMoveHomeChart($populationDash.moveHomeData, "moveHome", "Y", "173"); //2020.10.21[신예리] 높이 값 수정
			}
			
			//총조사인구 차트 세팅
			if($populationDash.totalPopulationData.length > 0){ 
				setPopulationForTimeChart($populationDash.totalPopulationData,"populationTimeChart","Y","160");
			}
			
			//다문화가구 차트 세팅
			if($populationDash.totPopulationMulticulData.length > 0){ 
				if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '' && $totSurvMain.ui.selectedArea != null && $totSurvMain.ui.selectedArea != undefined){
					totPopulationMulticul($populationDash.totPopulationMulticulData,"multiculPopulationChart","Y", "160"); //2020.09.22[신예리] 높이 값 수정
				}
			}
			// 2020-10-14 [곽제욱] resize 후 차트 새로그릴때 조건절 추가 END
			
			 //20201014 박은식 차트 색상 유지 처리 START
			if($totSurvMain.ui.chartTarget != ""
				&& typeof($totSurvMain.ui.chartIndex) == "number"
				&& $totSurvMain.ui.chartColor != ""){
				 
				$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
			}
			 //20201014 박은식 차트 색상 유지 처리 END
		}
		if($totSurvMain.ui.pageIndex == '1' && $(".mapExport").hasClass('on')){ // 20201013 박은식 map resize 조건문 추가
			$(".col-SubL").width($(window).width()-430);
			$(".col-SubL").height("825"); //2020.09.15 [신예리] height 값 수정
			
			// 최초지도
			$("#worldMap").width("1480");
			$("#worldMap").height("800"); //2020.09.15 [신예리] height 값 수정
							
			$("#mapArea").width($(window).width()-430);
			$("#mapArea").height("800"); //2020.09.15 [신예리] height 값 수정
			
			// 맵 사이즈
			$('#mapRgn_3').width($(window).width()-430);
			$('#mapRgn_3').height("800"); //2020.09.15 [신예리] height 값 수정
		}
	});
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {});

	$populationDash.const = {},
	
	$populationDash.ui = {
		//selectedArea : '', // 선택한 지역
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
			//20201120 박은식 초기화 추가 START
			$totSurvMain.ui.chartSaveClear();
			$totSurvMap.ui.selectedSurvId = "PH0001";
			$totSurvMap.ui.selectedItmCd = "T00";
			//20201120 박은식 초기화 추가 END
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/populationDash/main");
		},
		
		ready : function(){
			$populationDash.ui.selectedOrgId = '101';
			$populationDash.selectedItmId = "0";									
			$populationDash.ajax.params = {			
				surv_year_list: $totSurvMain.ui.selectedYear				// 수록시점
				, org_id_list: $ecnmyMap.ui.selectedOrgId					// 조직번호
				, tbl_id_list: $ecnmyMap.ui.selectedTblId					// 통계표 ID
				, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
				, char_itm_id_list: $ecnmyMap.ui.selectedChrItmId			// 표특성항목
				, prt_type: ""												// 출력방식 total:계 else 모두
				, adm_cd: $ecnmyMap.ui.selectedAdmCd						// 지역코드
				, ov_l1_list: $ecnmyMap.ui.selectedItmLv1					// 항목 1
				, ov_l2_list: $ecnmyMap.ui.selectedItmLv2					// 항목 2
				, ov_l3_list: $ecnmyMap.ui.selectedItmLv3					// 항목 3
				, ov_l4_list: $ecnmyMap.ui.selectedItmLv4					// 항목 4
				, ov_l5_list: $ecnmyMap.ui.selectedItmLv5					// 항목 5
				, category: $ecnmyMap.ui.category							// 카테고리
				, odr_col_list: "DTVAL_CO"									// 정렬기준
				, odr_type: "DESC"											// 내림차순, 오름차순
			}			
			$populationDash.event.setDefaultParams();
			$populationDash.event.setDispOptions();
			$populationDash.ui.getRankSet("", "", "00");
			$populationDash.ui.drawContent();
			$populationDash.event.allChange("00", 1);
			
			$("#itmDiv").css("display", "inline");
			$("#itmDiv").html($totSurvMain.ui.selectedYear + "년 전산업 사업체 수");
			
			$populationDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
			$totSurvMap.ui.selectedItmCd = "T00";
			//20201120 박은식 초기화 추가 END
			// 내국인 차트 초기화
			$("#local_people1").empty();
			// 외국인 차트 초기화
			$("#foreigner_people1").empty();
			// 연령분포 차트 초기화
			$("#ageDistribution").empty();
			
			$("#moveHome").empty();
			// 총조사인구 차트 초기화
			$("#populationTimeChart").empty();
			// 다문화가구 차트 초기화
			$("#multiculPopulationChart").empty();
		},
		
		drawContent : function(surv_id, itm_cd, c1, c2){
			
			if(surv_id == null|| surv_id == "" || surv_id == undefined){
				$totSurvMap.ui.selectedSurvId = "PH0001"; // 인구같은경우 디폴트
			} else {
				$totSurvMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트
				
			}
			
			if(itm_cd==null||itm_cd==""||itm_cd==undefined){
				$totSurvMap.ui.selectedItmCd = "T100";
			} else {
				$totSurvMap.ui.selectedItmCd = itm_cd;
			}
			
			$totSurvMap.ui.selectedC1 = c1;
			
			$totSurvMap.ui.selectedC2 = c2;

			if($totSurvMain.ui.selectedArea.length==2){
				$totSurvMapnoReverseGeoCode = true;
				if($totSurvMap.ui.map==null || $("#mapRgn_3").html() == ""){ // 20201104 박은식 같은 대시보드 매뉴를 다시 클릭시 맵을 다시그려주기 위해 조건문 추가
					$("#mapRgn_3").show();
					$totSurvMap.ui.createMap("mapRgn_3", 0);
					//$("#mapRgn_3").css("height", "560px"); 2020-11-02 [곽제욱] 주석 처리
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
				if($totSurvMap.ui.map==null || $("#mapRgn_3").html() == ""){ // 2020-11-10 [곽제욱] 맵 create 조건 추가
					$("#worldMap").hide();
					$("#mapRgn_3").show();
					$totSurvMap.ui.createMap("mapRgn_3", 0);
				}
				$totSurvMap.ui.drawMapData("sgg", "color"); // 맵
			}
			if($totSurvMap.ui.map!=null) {
				$totSurvMap.ui.map.update();
			}
			//20210224 박은식 범례추가 START
			$('.sop-control').css('display', 'inline-block');
			if($(".legendRing").attr("data-ing") == "max"){
				$(".btn_legend").trigger("click");
			} else if($(".legendRing").attr("data-ing") == "min"){
				$(".btn_legend").trigger("click").trigger("click");
			}
			$("#grid_lg_color_0").attr("data-color", "#cd1103").attr("start-color", "#ffd75d").text("#cd1103").css("background", "#cd1103");
			//20210224 박은식 범례추가 END
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
						$populationDash.ui.totSurvInfoData = totSurvInfo;
						
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
		 * @description  : 슬라이드 변경 시 rank 조회
		 * @date         : 2020.09.08
		 * @author	     : 박은식
		 * @history 	 :
		 * @parameter	 rank	: 슬라이드 rank
		 * 				 target	: 총인구, 남녀 비율, 외국인 중 1택 
		 */
		getRankSet : function(rank, target, regionCd){
			//전국 또는 전세계일 경우 해당 ajax를 스킵
			if($totSurvMain.ui.selectedArea == "00" || $totSurvMain.ui.selectedArea == "99"){
				return;
			}
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 START
			if(regionCd.length == 5){
				$totSurvMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
			}
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 END
			/**행정시 처리 로직 (테스트)*/
			if($totSurvMap.ui.isAtdrc || $("#total_rank").attr('max') == $totSurvMain.ui.atdrcRank){
				//현재 행정시도정보를 저장한다. 
				//비자치구와 행정시의 4자리수까지는 같다는 점을 이용한다
				$populationDash.atdrc = $totSurvMain.ui.selectedArea.substring(4,0);
			}
			/**행정시 처리 로직 (테스트)*/
			
			var param = {};
			var type = 'total';
			var level = 'sido';

			if($totSurvMain.ui.selectedArea.length == 2){ // 2020-10-14 [박은식] 랭킹 조회 조건 변경
				lavel = 'sido'
			} else if(($totSurvMain.ui.selectedArea.substring(4) != '0' && $populationDash.atdrc == $totSurvMain.ui.selectedArea.substring(4,0)) //  || //2020-11-10 [곽제욱] 필요없는 조건 제거  
					   /*($("#total_rank").attr('max') == $totSurvMain.ui.atdrcRank && $populationDash.upperBack == false)*/){ // 2020-11-10 [곽제욱] 필요없는 조건 제거 
				level = 'atdrc'// atdrc
			} else {
				level ='sgg'
			}

			var year = $totSurvMain.ui.selectedYear;
			if(rank != null && rank != '' && rank != undefined){
				if(target == 'total_rank' || target == "" || target == null){ //총인구, 남여비율, 외국인 중 어떤 기준으로 랭크를 조회 했는지와 디폴트값 설정
					type = 'total';
					srvLogWrite('P0','02','03','02',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
				} else if(target == 'gender_rank'){
					type = 'gender';
					srvLogWrite('P0','02','03','03',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
				} else{
					type = 'foreign';
					srvLogWrite('P0','02','03','04',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
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
				url: contextPath + "/ServiceAPI/totSurv/populationDash/getTotPopulationRank.json",
				data: param, 
				dataType: "json",
				success: function(res) {
					/**range value setting */
					var totalList = res.result.totalRankData[0];
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						var genderList = res.result.genderRankData[0];
						var foreignList = res.result.foreignRankData[0];
					}
					var region_cd = totalList.region_cd;
					
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
						$populationDash.ui.clear();
						
						/** chart renderer */
						if(region_cd.length == 2){
				    		$("#dash_sido option[value='"+region_cd+"']").attr("selected", "true");
				    		if(region_cd != '00' && region_cd != '99'){
				    			$("#dash_sgg option[value='999']").attr("selected", "true");
				    		}
				    		$totSurvMain.ui.tileChangeYn = "Y"; 
				    		$totSurvMain.ui.selectedLevel = "1";
				    		$populationDash.event.allChange(region_cd, "1");
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
				    			$populationDash.event.allChange(region_cd, "1");
				    		}
				    		/** 2020-09-21 [곽제욱] 비자치구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    		else{
				    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 START */
				    			$totSurvMap.ui.mapToggleId = ""; //2020-10-14 [곽제욱] 자치구 이동관련하여 토글아이디 초기화 
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			console.log("#########################   비자치구 클릭됨     ##############");
				    			$populationDash.event.allChange(region_cd, "1");
				    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 END */
				    		}
				    	}
					}
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						$populationDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,totalList.rank,genderList.rank,foreignList.rank, $totSurvMap.ui.mapToggleId);
					} else {
						$populationDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,'0','0','0', '');
					}
					//비자치구 일 경우 행정시도로 이동하는 로직
					if($populationDash.upperBack == true){
						$totSurvMap.ui.checkIsAtdrc(region_cd);	
						$totSurvMain.ui.selectedArea = region_cd
						$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
						$totSurvMap.ui.mapRegion = "sgg";
						$populationDash.event.allChange(region_cd,"1")
					}
				},
				error: function(){
					
				}
			})
			$populationDash.upperBack = false;
			//20201014 박은식 range 이동 시 차트 클릭 정보 유지START
			if($totSurvMain.ui.chartTarget != ""
				&& typeof($totSurvMain.ui.chartIndex) == "number"
				&& $totSurvMain.ui.chartColor != ""){
				 
				$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
			}
			//20201014 박은식 range 이동 시 차트 클릭 정보 유지END
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
		rankSlideRender : function(regionCd, totalRank, genderRank, foreignRank, toggleId){
			$totSurvMain.ui.tileChangeYn = "Y";
			$("#total_range").show();
			$("#gender_range").show();
			$("#foreign_range").show();
			// 시도이동, 시군구이동의 경우
			if($totSurvMain.ui.selectedArea.length == 2){	// 2020-10-14 [주형식] 시도 비교 로직 수정
				// 그중 시군구 이동(지도에는 시군구 레벨로 표출, 선택지역 하이라이트 처리)
				if(toggleId.length == 5){
					$populationDash.regionLevel = 'sgg'
					$("#total_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#gender_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#foreign_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#total_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#gender_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#foreign_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$totSurvMap.ui.mapToggleId = toggleId;
					$populationDash.event.allChange(toggleId, "2");
				} else {
					$populationDash.regionLevel = 'sido'
					$("#total_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#gender_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#foreign_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#total_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
					$("#gender_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
					$("#foreign_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
				}
			} else if($totSurvMain.ui.selectedArea.substring(4) != '0' ) { // 2020-10-14 [곽제욱] 비자치구 체크조건 수정
				if($totSurvMain.ui.atdrcRank != 0) {
					$populationDash.regionLevel = 'atdrc'
					$("#total_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#gender_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#foreign_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#total_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
					$("#gender_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
					$("#foreign_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
				} else {
					$("#total_range").hide();
					$("#gender_range").hide();
					$("#foreign_range").hide();
				}
			} else if($("#total_rank").attr("max") != $totSurvMain.ui.atdrcRank || $populationDash.upperBack == false){ //20201013 박은식 $populationDash.upperBack 조건이 false 일때로 변경 (비자치구에서 나온경우)
				$populationDash.regionLevel = 'sgg'
				$("#total_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#gender_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#foreign_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#total_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
				$("#gender_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
				$("#foreign_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 START
			} else {
				$populationDash.regionLevel = 'sgg'
					$("#total_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#gender_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#foreign_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#total_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#gender_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$("#foreign_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			}
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 END
			
			$("#total_rank").val(totalRank);
			$("#gender_rank").val(genderRank);
			$("#foreign_rank").val(foreignRank);
			$("#total_range").find("span").eq(2).text(/*$("#total_rank").val()*/totalRank+"번째");
			$("#gender_range").find("span").eq(2).text(/*$("#gender_rank").val()*/genderRank+"번째");
			$("#foreign_range").find("span").eq(2).text(/*$("#foreign_rank").val()*/foreignRank+"번째");
			$("#total_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#total_rank").attr("max")-1))*($("#total_rank").val()-1)) + '%, #fff ' + ((100/($("#total_rank").attr("max")-1))*($("#total_rank").val()-1)) + '%, white 100%)');
			$("#gender_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#gender_rank").attr("max")-1))*($("#gender_rank").val()-1)) + '%, #fff ' + ((100/($("#gender_rank").attr("max")-1))*($("#gender_rank").val()-1)) + '%, white 100%)');
			$("#foreign_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#foreign_rank").attr("max")-1))*($("#foreign_rank").val()-1)) + '%, #fff ' + ((100/($("#foreign_rank").attr("max")-1))*($("#foreign_rank").val()-1)) + '%, white 100%)');
			$("#rangeV1").find('span').eq(0).text($("#total_rank").val()+"번");
			$("#rangeV1").offset({left:133+((100/($("#total_rank").attr("max")-1))*($("#total_rank").val()-1)/100*($("#total_rank").outerWidth()-20)), top:$("#total_rank").offset().top-30}) // 538 -> $("total_rank").offset().top;
			$("#rangeV2").find('span').eq(0).text($("#gender_rank").val()+"번");
			$("#rangeV2").offset({left:133+((100/($("#gender_rank").attr("max")-1))*($("#gender_rank").val()-1)/100*($("#total_rank").outerWidth()-20)), top:$("#gender_rank").offset().top-30}) // 691
			$("#rangeV3").find('span').eq(0).text($("#foreign_rank").val()+"번");
			$("#rangeV3").offset({left:133+((100/($("#foreign_rank").attr("max")-1))*($("#foreign_rank").val()-1)/100*($("#total_rank").outerWidth()-20)), top:$("#foreign_rank").offset().top-30}) // 843
			$("#peopleRank").html(totalRank);
			
			if($totSurvMain.ui.selectedArea.length == 2){
				$("#populationRanking").html($totSurvMain.ui.sidoMaxRank + "개 시도 중");
				$("#populationRanking").parent().find("button").attr("id", "totalSido")
				
				var areaTitle = $("#dash_sido option:selected").html();
				
				$("#genderRanking").html(areaTitle + " 남녀 성비");//20201027 박은식 ~의 삭제
				$("#foreignRanking").html(areaTitle + " 외국인 수");//20201027 박은식 ~의 삭제
			}else if($totSurvMain.ui.selectedArea.length == 5){
				var areaTitle = $("#dash_sgg option:selected").html();
				if($populationDash.regionLevel == 'atdrc'){
					$("#populationRanking").html($totSurvMain.ui.atdrcRank + "개 비자치구 중");
				} else {
					$("#populationRanking").html($totSurvMain.ui.sggEmdongMaxRank + "개 시군구 중");
				}
				$("#populationRanking").parent().find("button").attr("id", "totalSgg")
				$("#genderRanking").html(areaTitle + " 남녀 성비");//20201027 박은식 ~의 삭제
				$("#foreignRanking").html(areaTitle + " 외국인 수");//20201027 박은식 ~의 삭제
			}
			//$("#totPeopleNumber").html("총인구 - " + areaTitle); // 2020-10-26 [곽제욱] 주석 처리
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
			$("#total_rank").val(0);
			$("#gender_rank").val(0);
			$("#foreign_rank").val(0);
			$populationDash.ui.rankSlideRender("00", 0,0,0, "");
			
			
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
					url: contextPath + "/ServiceAPI/totSurv/populationDash/getUpperRegionCheck.json",
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
		chartItmClick : function(obj, d, color, contents){
			//20210222 박은식 총조사인구 경계 연도 선택이후 처리 로직 START
			if(d.surv_year == undefined || d.surv_year == null | d.surv_year == ""){
				for(var i=0; i < $(".yearBtn").length; i++){
				    if($(".yearBtn").eq(i).hasClass("on")){
				    	$totSurvMain.ui.selectedYear = $(".yearBtn").eq(i).text();
				    }
				}
			} else {
				$totSurvMain.ui.selectedYear = d.surv_year;
			}
			//20210222 박은식 총조사인구 경계 연도 선택이후 처리 로직 END			
			// 선택한 레벨이 3이 아닐경우
			if($totSurvMain.ui.selectedLevel != 3){
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
		    			
					$populationDash.ui.drawContent(d.surv_id, d.itm_cd, d.c1, d.c2); // 2020
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
					//20210222 박은식 총조사인구 경계 연도 선택이후 처리 로직 START
					if(obj.attr("id") == "totalPopulation"){
						for(var i=0; i < $(".yearBtn").length; i++){
						    if($(".yearBtn").eq(i).hasClass("on")){
						    	$totSurvMain.ui.selectedYear = $(".yearBtn").eq(i).text();
						    }
						}
					}
					//20210222 박은식 총조사인구 경계 연도 선택이후 처리 로직 END
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
		    		$totSurvMain.ui.tileChangeYn = "N";
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */
					$populationDash.ui.drawContent("PH0001", "T100", "");
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
		
		$populationDash.org_id = tmp[1].split("&")[0];
		$populationDash.tbl_id = tmp[2].split("&")[0];
		
		if(!$populationDash.isDev){
			
			var kosisDetailOption = new kosis.serviceApi.kosisDetailOption.api();
			kosisDetailOption.addParam("org_id", $populationDash.org_id);
			kosisDetailOption.addParam("list_id", $populationDash.tbl_id);
			
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
			lv_url += "?org_id="+ $populationDash.org_id;
			lv_url += "&list_id="+ $populationDash.tbl_id;
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
				
				$populationDash.obj_var_id = resultData[0].obj_var_id;
				$populationDash.field_id = resultData[0].field_id;
				
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
		
		if(!$populationDash.isDev){
			// 운영 호출 
		}
		else{
			var map = $totSurvMap.ui.map;
			map.selectedBoundMode = "multi";
			
			//url 파라미터 세팅
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
			lv_url += "?org_id="+ $populationDash.org_id;
			lv_url += "&tbl_id="+ $populationDash.tbl_id;
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
			lv_url += "&obj_var_id=" + $populationDash.obj_var_id;
			lv_url += "&field_id=" + $populationDash.field_id;
			
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
								//$(".mapInfo").show(); // 2020-11-03 [곽제욱] 개방형지도 버튼 삭제
													
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
					$populationDash.kosis_result_data = [];
					$populationDash.kosis_result_data = result;
					
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
		
		this.map.data.push($populationDash.kosis_result_data);
		this.map.dataType = "kosis";
		this.map.dataForCombine = $populationDash.kosis_result_data;
		
		var yearArr = [];
		var options = $('#bndYear option');
		var values = $.map(options ,function(option) {
			yearArr.push(option.value);
		});
		
		var yearMax = Math.max.apply(null, yearArr);
		var yearMin = Math.min.apply(null, yearArr);
		
		var year = $populationDash.kosis_data_year;
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
		$populationDash.kosis_result_data = tempData;
		
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
	

	$populationDash.util = {};
	
	$populationDash.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$populationDash.event.setUIEvent() called.");
			
			var body = $("body");

			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 start*/
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#total_rank, #gender_rank, #foreign_rank", function(e){ // 20201014 박은식 IE event 문제로 change 추가
			//2020.09.10[신예리] 슬라이드 컬러 수정
				this.style.background = 'linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
				if(e.target.id == "total_rank"){
					$("#rangeV1").find('span').eq(0).text(this.value+"번");
					$("#rangeV1").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#total_rank").outerWidth()-20)), top:$("#total_rank").offset().top-30})
				} else if(e.target.id == "gender_rank"){
					$("#rangeV2").find('span').eq(0).text(this.value+"번");
					$("#rangeV2").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#total_rank").outerWidth()-20)), top:$("#gender_rank").offset().top-30})
				} else if(e.target.id == "foreign_rank") {
					$("#rangeV3").find('span').eq(0).text(this.value+"번");
					$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#total_rank").outerWidth()-20)), top:$("#foreign_rank").offset().top-30})
				}
				//20201110 박은식 랭크 이동 시 차트 이벤트 초기화 START
				$totSurvMain.ui.chartTarget = "";
	    		$totSurvMain.ui.chartIndex = "";
	    		$totSurvMain.ui.chartData = "";
	    		$totSurvMain.ui.chartColor = "";
	    		$totSurvMain.ui.chartTitle = "";
	    		$totSurvMap.ui.selectedObj[0] = "";
	    		//20201110 박은식 랭크 이동 시 차트 이벤트 초기화 END
			
			//left: calc(40.3333% + 1.93333px);
			})
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 end*/
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 start*/
			body.on("mouseup", "#total_rank, #gender_rank, #foreign_rank", function(){  // 20201012 박은식 IE event 문제로 change 추가
				$populationDash.ui.getRankSet(this.value, this.id, "");
			})
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 end*/
			
			// 2020-11-10 [곽제욱] url Parameter 추가로 인한 level체크후 rangeContainer display 변경 START
			if($totSurvMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			$populationDash.ui.getRankSet("", "",$totSurvMain.ui.selectedArea)
			// 2020-11-10 [곽제욱] url Parameter 추가로 인한 level체크후 rangeContainer display 변경 END
			
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
					if($totSurvMain.ui.selectedLevel == 0){
						//$("#allPopulationForTime").show(); // 2020-10-12 [곽제욱] 주석처리
						$(".col-SubL").width("");
						$(".col-SubL").height("584"); //2020.09.16[신예리] 영역 맞춤
						// 맵 사이즈
						$('#mapRgn_3').width("");
						$('#mapRgn_3').height("560");
					} else {
						$(".col-SubL").width("");
						$(".col-SubL").height("825"); //2020.09.16[신예리] 영역 맞춤
						$('#mapRgn_3').width("");
						$('#mapRgn_3').height("800");
					}
					
					 $("#foreignFamily").show(); // 2020-10-12 [곽제욱] 주석처리  //2020.10.14[신예리] 개방형지도 구 선택 시 지도 확대 축소 했을때 영역 사라져서 주석 처리 삭제
					 $("#moveDiv").show(); //2020.10.14[신예리] 개방형지도 구 선택 시 지도 확대 축소 했을때 영역 유지
					
					// 지도 크기 설정
									
					$("#mapArea").width("");
					$("#mapArea").height("100%"); // 2020.09.10[신예리] 맵 버튼 위치 조정으로 인한 height 값 수정
					
					/** 2020-10-12 [곽제욱] 맵크기 확대, 축소시 show-hide 분기 처리 START */
					if($totSurvMain.ui.selectedLevel=="0"){
						$("#allPopulationForTime").show();
						$("#pieChartDiv").show();
						$("#moveDiv").show();
						$("#ageDiv").show();
						$(".Rangecontainer").css("display", "none");
						$("#foreignFamily").hide();
					} else if($totSurvMain.ui.selectedLevel=="1"){
						$("#foreignFamily").show();
						$("#pieChartDiv").show();
						$("#moveDiv").show();
						$("#ageDiv").show();
						$(".Rangecontainer").css("display", "inline-block");
						$("#allPopulationForTime").hide();
					} else if($totSurvMain.ui.selectedLevel=="2"){
						$(".Rangecontainer").css("display", "inline-block");
						$("#foreignFamily").show(); //2020.10.14[신예리] 지도 확대 축소 시 다문화 가구 차트 표출
						$("#pieChartDiv").show();
						$("#moveDiv").show();
						$("#ageDiv").show();
						$("#allPopulationForTime").hide();
					} else if($totSurvMain.ui.selectedLevel=="3"){
						if($("#pieChartDiv").find("svg").length>0) {
							$("#pieChartDiv").show();
						}
						if($("#moveDiv").find("svg").length>0) {
							$("#moveDiv").show();
						}
						if($("#ageDiv").find("svg").length>0) {
							$("#ageDiv").show();
						}
						if($("#foreignFamily").find("svg").length>0) {
							$("#foreignFamily").show();
						}
						$(".Rangecontainer").css("display", "none");
					}
					/** 2020-10-12 [곽제욱] 맵크기 확대, 축소시 show-hide 분기 처리 END */
					
					if($totSurvMap.ui.map != null){
						$totSurvMap.ui.map.update();
					}
					//$populationDash.event.allChange($totSurvMain.ui.selectedArea, "2"); 2020-10-12 [곽제욱] 로직 변경으로 인한 주석처리
					
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 START
					genderPieChart($populationDash.localPopleData, "local_people1", "Y", "140");
					genderPieChart($populationDash.foreignerData, "foreigner_people1", "Y", "140");
					setPeopleAgeChart($populationDash.ageDistributionData, "ageDistribution", "Y", "131");
					setPopulationForTimeChart($populationDash.totalPopulationData,"populationTimeChart","Y","160")
					if($totSurvMain.ui.selectedYear != '2015' && $populationDash.moveHomeData.length > 0){
						setPopulationMoveHomeChart($populationDash.moveHomeData, "moveHome", "Y", "173"); //2020.10.21[신예리] 높이 값 수정
					} else {
						var moveHtml = "";
						moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
						moveHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 45px;'>";
						moveHtml += "	<p style='margin-top: 15px;'>2016년부터 제공하는 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
						moveHtml += "</div>";
						$("#moveHome").html(moveHtml)
					}
					if($totSurvMain.ui.selectedArea != '99' 
						&& $totSurvMain.ui.selectedArea != '' 
						&& $totSurvMain.ui.selectedArea != null 
						&& $totSurvMain.ui.selectedArea != undefined
						&& $totSurvMain.ui.selectedYear != '2015'
						&& $populationDash.totPopulationMulticulData.length > 0){
						totPopulationMulticul($populationDash.totPopulationMulticulData,"multiculPopulationChart","Y", "160"); //2020.09.22[신예리] 높이 값 수정
					} else {
						var noticeStr = "광역시도에 해당하는 통계정보입니다.";
						if($totSurvMain.ui.selectedYear == '2015'){
							noticeStr = "2016년부터 제공하는 통계정보입니다.";
						}
						var foreignHtml = "";
						foreignHtml += "<div class='DataNone' style='text-align: center; margin-left: -30px;'>";
						foreignHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 35px;'>";
						foreignHtml += "	<p style='margin-top: 15px;'>" + noticeStr + "</p>"; //2020.10.14[신예리] 맞춤법 수정
						foreignHtml += "</div>";
						$("#multiculPopulationChart").html(foreignHtml)
					}
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 END
				}
				else{
//					alert("작은화면 -> 큰화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					$(".mapExport").addClass("on");
					
					// 차트1(내국인 /외국인) 안보이게 수정
					$(".col-SubR.mb10").hide();
					// 연령분포 차트
					$("#ageDiv").hide();
					// 거주지이동 차트
					$("#moveDiv").hide();
					// 총조사인구 차트
					$("#allPopulationForTime").hide();
					
					$("#foreignFamily").hide();
					
					// 지도 크기 설정
					$(".col-SubL").width($(window).width()-430);
					$(".col-SubL").height("825"); //2020.09.15 [신예리] height 값 수정
					
					// 최초지도
					$("#worldMap").width("1480");
					$("#worldMap").height("800"); //2020.09.15 [신예리] height 값 수정
									
					$("#mapArea").width($(window).width()-430);
					$("#mapArea").height("800"); //2020.09.15 [신예리] height 값 수정
					
					// 맵 사이즈
					$('#mapRgn_3').width($(window).width()-430);
					$('#mapRgn_3').height("800"); //2020.09.15 [신예리] height 값 수정
					
					$totSurvMap.ui.map.update()
					//20201014 박은식 맵 확대 시 width 고정처리 START
					$("#localDiv").outerWidth($("svg").find("svg").outerWidth());
					$("#ageDistribution").width($("#ageDistribution").find("svg").outerWidth()-10);
					$("#moveHome").outerWidth($("#ageDistribution").find("svg").outerWidth()-10);
					$("#multiculPopulationChart").outerWidth($("#ageDistribution").find("svg").outerWidth()-10);
					$("#populationTimeChart").outerWidth($("#populationTimeChart").find("svg").outerWidth()-10); // 2020-11-04 [곽제욱] outerWidth 수치 변경
					//20201014 박은식 맵 확대 시 width 고정처리 START
				}
				
			});
			
			/** 맵 확대 */
			body.on("click", "#pZoom", function(){  //20201013 박은식 class -> id로 selector변경
				//alert("맵 확대");
				var lv_zoom = $totSurvMap.ui.map.zoom;
				$totSurvMap.ui.map.setZoom((lv_zoom+1));
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
							$populationDash.event.allChange(to_sido_cd, "1");
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
							$populationDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
									$populationDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$populationDash.upperBack = true;
									$populationDash.ui.getRankSet("", "sgg", $totSurvMain.ui.selectedArea);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경									
								} else {
									$totSurvMain.ui.selectedLevel =  "1";
									$totSurvMain.ui.selectedArea = to_sido_cd;
									$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$totSurvMain.ui.pathChange("sgg", to_sido_cd);
									$populationDash.upperBack = true;
									$totSurvMap.ui.mapToggleId = "";
									$populationDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$totSurvMap.ui.isAtdrc = false;
									$populationDash.ui.getRankSet("", "sido", to_sido_cd);
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
								$populationDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
			
			
			// 2020-10-21 [주형식] 지도 이미지 저장 이벤트 START
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
				
			});
			2020-10-23 totSurvMain으로 이동*/ 
			// 2020-10-21 [주형식] 지도 이미지 저장 이벤트 END
			
			
			// 2020-10-21 [주형식] PDF 저장, 출력, 공유 이벤트 START
			// 2020-10-22 [주형식] PDF 저장, 출력 totSurvMain.js로 이동 START 
//			// PDF저장
//			body.on("click", ".HpdfBtn", function(){
//				$totSurvMain.ui.pdfDown('#divContent',"테스트");
//			});
//			
//			// 출력버튼 이벤트
//			body.on("click", ".HprintBtn", function(){
//				
//				var g_oBeforeBody = document.getElementById('divContent').innerHTML;
//				
//				// 프린트를 보이는 그대로 나오기위한 셋팅
//                window.onbeforeprint = function (ev) {
//                    document.body.innerHTML = g_oBeforeBody;
//                };
//                
//                window.onafterprint = function(){
//                    //새로고침하여 페이지를 다시 출력합니다.
//                    this.window.location.reload();
//                }  
//                
//				window.focus();
//	 			window.print();
//	 			setTimeout(function(){
//	 				window.close();
//	 			}, 1);
//			});
			// 2020-10-22 [주형식] PDF 저장, 출력 totSurvMain.js로 이동 END
			
			// 차트 이미지 저장
			body.on("click", "[name=chartBtn]", function(evnt){ 
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','09','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				console.log("selId = " + selId);
				
				// 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 로직 변경 START
				var unit = "";

				if($totSurvMain.ui.selectedArea.length != 2){
					unit = "명";
				} else {
					unit = "천명";
				}
				// 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 로직 변경 END
				
				if(selId == "ageDiv"){
					chartModal($populationDash.ageDistributionData, 'itm1', 'c1_nm', 'dt', '', '인구', unit); // 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 함수 변경
				}
				else if(selId == "moveDiv"){
					chartModal($populationDash.moveHomeData, 'itm1', 'itm_nm', 'dt', '', '인구', '명'); // 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 함수 변경
				}
				else if(selId == "allPopulationForTime"){
					chartModal($populationDash.totalPopulationData, 'itm2', 'males,females', 'age', "t1", '인구', '명');  // 2020.10.26 [주형식] 차트 유형 변수 추가 // 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 함수 변경
				}
				else if(selId == "foreignFamily"){
					chartModal($populationDash.totPopulationMulticulData, 'itm1', 'c1_nm', 'dt', '', '인구', '명'); // 2020-12-02 [곽제욱] 공통차트 변수 추가로 인한 함수 변경
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn'], [name='tableBtn'], [name='excelBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','08','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
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
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);

				if(selId == "ageDiv"){
					$totSurvMain.ui.chartImageDown("#ageDiv", "연령분포"); //20201023 주형식 차트 명칭 추가 
				}
				else if(selId == "moveDiv"){
					$totSurvMain.ui.chartImageDown("#moveDiv", "거주지이동"); //20201023 주형식 차트 명칭 추가 

				}
				else if(selId == "allPopulationForTime"){
					$totSurvMain.ui.chartImageDown("#allPopulationForTime", "총조사인구"); //20201023 주형식 차트 명칭 추가 
				}
				else if(selId == "foreignFamily"){
					$totSurvMain.ui.chartImageDown("#foreignFamily", "다문화가구"); //20201023 주형식 차트 명칭 추가 
				}
			});
			
			// 공통 기능 버튼 이벤트 추가 2020-10-20  END
			
			// 2020-10-21 [주형식] PDF 저장, 출력, 공유 이벤트 END
		},
		
		/**
		 * @name		 : setDefaultParams 
		 * @description  : 인구총조사 기본 파라메터 셋팅
		 * @date		 : 2021.08.30
		 * @author		 : 이영호
		 * @history 	 :
		 */
		setDefaultParams : function() {
			//$ecnmyDash.ajax.params.surv_year_list = year;
			$ecnmyDash.ajax.params.tbl_id_list = 'DT_1IN1502';
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: "/view/totSurv/getStblInfo.do",
				data: $ecnmyDash.ajax.params, // 임시
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						
						// 총조사시각화정보
						var totSurvInfo = res.result.totSurvInfo;
						$ecnmyDash.ui.totSurvInfoData = totSurvInfo;
						
						// 기존 맵데이터 클리어
						$ecnmyMap.ui.map.clearDataOverlay();
						
						getKosisDetailOption(totSurvInfo);
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
			$ecnmyDash.ajax.params.adm_cd = 'l1:00';
			$ecnmyDash.chartsOption.color = ["#f08246", "#009589"];
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
			$populationDash.event.allClear();

			var year = $totSurvMain.ui.selectedYear;
			var regionCd = admCd;
			
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/populationDash/getTotPopulation.json",
				data: { year: year, region_cd : regionCd}, // 
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						// 전국데이터
						var totalData = res.result.totalData;
						// 지역별 인구데이터
						//var areaData = res.result.areaData;
						// 전세계 데이터
						var worldData = res.result.worldData;

						var genderData = res.result.genderData; // 2020-10-13 [곽제욱] 남녀성비 조회를 위한 변수 추가
						// 내국인 데이터
						var localData = res.result.localData;
						// 외국인 데이터
						var foreignData = res.result.foreignData;
						// 외국인 전체데이터
						var foreignRt = res.result.foreignRt;
						// 연령분포 데이터
						var ageData = res.result.ageData;
						// 거주지이동 데이터
						var moveHomeData = res.result.moveHomeData;
						// 다문화 가정 데이터 
						var multiculData = res.result.multiculData;
						// 총조사인구 데이터
						var populationForTimeData = res.result.populationForTimeData;
						
						var totPeople = "";
						var totPeopleRank = "";
						var totPeopleMaxRank = "";
						var totPeopleRt = "";
						
						/** 2020-10-14 [곽제욱] 화면 resize를 위한 차트데이터 변수 초기화 START */
						$populationDash.localPopleData = "";
						$populationDash.foreignerData = "";
						$populationDash.ageDistributionData = "";
						$populationDash.moveHomeData = "";
						$populationDash.totalPopulationData = "";
						$populationDash.totPopulationMulticulData = "";
						/** 2020-10-14 [곽제욱] 화면 resize를 위한 차트데이터 변수 초기화 END */
						
						/** 2020-10-13 [곽제욱] 미사용변수 주석처리 START */
						/*
						var tempGenderRt1 = 1;
						var tempGenderRt2 = 1;
						var tempGenderChangeRt1 = 1;
						var tempGenderChangeRt2 = 1;
						*/
						/** 2020-10-13 [곽제욱] 미사용변수 주석처리 END */
						// 외국인 찾기
						var forigen = ""; //totalData.find(x => x.itm_cd === 'T140' ).dt;
						var forigenRt = ""; //totalData.find(x => x.itm_cd === 'T140' ).irdsrate;

						
						totPeople = totalData[0].dt;
						
						// 지역코드가 99(총인구의 세계조회인 경우) - 인구랭킹, 증감율 변경
						if(regionCd == '99' || regionCd == '00'){
							//IMF 지표에서 값 가져오기
							if(worldData.length > 0){
								totPeopleRank = worldData[0].rank;
								
								totPeopleRt = worldData[0].irdsrate;
	
								totPeopleMaxRank = worldData[0].maxRank;
								
								var currentYear = worldData[0].currentYear;
								
								var beforeYear = worldData[0].beforeYear;
								
								var worldPeopleRatio = 0; 
								
								if(currentYear!="" && beforeYear!=""){
									var worldPeopleRatio = parseFloat((currentYear - beforeYear) / currentYear).toFixed(2);
									if(parseFloat(worldPeopleRatio) > 0){
										upDownCheck = "<span class='stats_up bold'>" +worldPeopleRatio+" % </span><span class='stats_up'>▲</span>";
									} else if(parseFloat(worldPeopleRatio) < 0){
										worldPeopleRatio = worldPeopleRatio.replace("-", ""); // 2020-10-12 [곽제욱] 감소율에서 - 표시 제거 
										upDownCheck = "<span class='stats_down bold'>" +worldPeopleRatio+" % </span><span class='stats_down'>▼</span>";
									} else {
										upDownCheck = "<span class='stats_normal bold'>" +worldPeopleRatio+" % </span><span class='stats_normal'>-</span>";
									}
									$("#worldPeopleChangeRt").html("IMF " + totPeopleMaxRank +"개 국가 "+upDownCheck); //20201013 박은식 문구 변경
								} else {
									$("#worldPeopleChangeRt").html("증감률 데이터 없음");
								}
								
								$(".populationRankCap").show();
							} 
						} else if($totSurvMain.ui.selectedLevel != "3"){
							totPeopleRank = totalData[0].rank;
							totPeopleRt = totalData[0].irdsrate;
							$(".populationRankCap").hide();
						}
						
						/** 2020-10-13 [곽제욱] 미사용소스 주석처리 START */
						/*
						for(var i=0; i<localData.length; i++){
							if(localData[i].itm_cd == 'T131'){
								tempGenderRt1 = localData[i].dt;
								tempGenderChangeRt1 = localData[i].irdsrate;
							} else if(localData[i].itm_cd == 'T132'){
								tempGenderRt2 = localData[i].dt;
								tempGenderChangeRt2 = localData[i].irdsrate;
							} 
						}
						*/
						/** 2020-10-13 [곽제욱] 미사용소스 주석처리 END */
						
						
						
						forigen = foreignRt[0].dt;
						forigenRt = foreignRt[0].irdsrate;
						// 지역코드가 99(총인구의 세계조회인 경우) - 인구랭킹, 증감율 변경
											
						// 성비 찾기
						/** 2020-10-13 [곽제욱] 남녀성비 변경 START */
						var genderRt = parseFloat(genderData[0].dt).toFixed(1); //20201130 박은식 소수점 첫째 자리까지만 표시
						
						var genderChangeRt = genderData[0].irdsrate
						//if(tempGenderChangeRt1!="" && tempGenderChangeRt2!=""){
						//	genderChangeRt = (tempGenderChangeRt1 / tempGenderChangeRt2).toFixed(2);
						// 2020-10-13 [곽제욱] 둘다 데이터 없는경우 0처리 START 
						//} 
						/** 2020-10-13 [곽제욱] 남녀성비 변경 END */

						/** 2020-10-14 [곽제욱] 각 차트 데이터 존재시 입력 START */
						if(localData.length > 0){
							$populationDash.localPopleData = localData;
						}
						
						if(foreignData.length > 0){
							$populationDash.foreignerData = foreignData;
						}
						
						if(ageData.length > 0){
							$populationDash.ageDistributionData = ageData;
						}
						
						if(moveHomeData.length > 0){
							$populationDash.moveHomeData = moveHomeData;
						}
						
						if(populationForTimeData.length > 0){
							$populationDash.totalPopulationData = populationForTimeData;
						}
						
						if(multiculData.length > 0){
							$populationDash.totPopulationMulticulData = multiculData;
						}
						/** 2020-10-14 [곽제욱] 각 차트 데이터 존재시 입력 END */
						
						if($(".mapExport").hasClass("on")) {
							
							$("#allPopulationForTime").hide();
							$("#foreignFamily").hide();
							$("#pieChartDiv").hide();
							$("#moveDiv").hide();
							$("#ageDiv").hide();
						} else {
							if($totSurvMain.ui.selectedLevel=="0"){
								$("#mapRgn_3").css("height", "560px");
								$(".col-SubL").css("height", "584px"); //2020.09.16[신예리] 영역 맞춤
								$("#populationRanking").html("IMF " + totPeopleMaxRank +" 개 국가 중 ");
								$("#populationRanking").parent().find("button").attr("id", "totalIMF")
								//20201014 박은식 맵 토글 시 전국일 때 남녀성비, 외국인 수 지역정보 변경 START
								$("#genderRanking").html("전국 남녀 성비");//20201027 박은식 ~의 삭제
								$("#foreignRanking").html("전국 외국인 수");//20201027 박은식 ~의 삭제
								//20201014 박은식 맵 토글 시 전국일 때 남녀성비, 외국인 수 지역정보 변경 END
								$("#allPopulationForTime").show();
								$("#pieChartDiv").show();
								$("#moveDiv").show();
								$("#ageDiv").show();
								$(".Rangecontainer").css("display", "none");
								$("#foreignFamily").hide();
							} else if($totSurvMain.ui.selectedLevel=="1"){
								$("#mapRgn_3").css("height", "800px"); //2020.09.15[신예리] 높이값 변경
								$(".col-SubL").css("height", "825px"); //2020.09.15[신예리] 높이값 변경
								$("#foreignFamily").show();
								$("#pieChartDiv").show();
								$("#moveDiv").show();
								$("#ageDiv").show();
								$(".Rangecontainer").css("display", "inline-block");
								$("#allPopulationForTime").hide();
							} else if($totSurvMain.ui.selectedLevel=="2"){
								$("#mapRgn_3").css("height", "800px"); //2020.09.15[신예리] 높이값 변경
								$(".col-SubL").css("height", "825px"); //2020.09.15[신예리] 높이값 변경
								$(".Rangecontainer").css("display", "inline-block");
								$("#pieChartDiv").show();
								$("#moveDiv").show();
								$("#ageDiv").show();
								$("#pieChartDiv").show();
								$("#allPopulationForTime").hide();
								$("#foreignFamily").show();//20201015 박은식 줌이동 시 다문화가구 차트 표출
							} else if($totSurvMain.ui.selectedLevel=="3"){
								$(".Rangecontainer").css("display", "none");
							}
						} // 2020-10-14 [곽제욱] 맵 확대시에도 차트 생성되게 수정 START 	
							
							// 내국인 차트 세팅
							if(localData.length > 0){
								genderPieChart(localData, "local_people1", "N", "140");							
							}
							
							// 외국인 차트 세팅
							if(foreignData.length > 0){
								genderPieChart(foreignData, "foreigner_people1", "N", "140");
							}
							
							//연령분포 차트 세팅
							if($totSurvMain.ui.selectedArea.length != 2){
								$("#ageUnit").text("단위 : 명")
							} else {
								if($populationDash.polygonSelectArea.length != 2 && $populationDash.polygonSelectArea != ""){ // 2020-10-14 [곽제욱] 단위명 변경 조건 수정
									$("#ageUnit").text("단위 : 명")
								} else {
									$("#ageUnit").text("단위 : 천명")
								}
							}
							setPeopleAgeChart(ageData, "ageDistribution", "N", "131"); //2020.10.15[신예리] 높이 값 수정
							
							//거주지이동 차트 세팅
							if(moveHomeData.length > 0){
								//$("#moveDiv").show(); // 2020-10-14 [곽제욱] 주석처리
								setPopulationMoveHomeChart(moveHomeData, "moveHome", "N", "173"); //2020.10.21[신예리] 높이 값 수정
							} else {
								//2020.10.14[신예리] 거주지이동 차트 없을 때 화면 (hide, show로 변경) START
								var moveHtml = "";
								moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
								moveHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 45px;'>";
								moveHtml += "	<p style='margin-top: 15px;'>2016년부터 제공하는 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
								moveHtml += "</div>";
								$("#moveHome").html(moveHtml)
								//2020.10.14[신예리] 거주지이동 차트 없을 때 화면 (hide, show로 변경) END
							}
							
							//다문화가구 차트 세팅
							if(regionCd != '99' && regionCd != '00' && regionCd != null && regionCd != undefined){
								if(multiculData.length > 0) {
									//$("#foreignFamily").show(); // 2020-10-14 [곽제욱] 주석처리
									totPopulationMulticul(multiculData,"multiculPopulationChart","1000", "160"); //2020.09.22[신예리] 높이 값 수정
								} else {
									//2020.10.14[신예리] 다문화 가구 차트 없을 때 화면 (hide, show로 변경) START 
									var noticeStr = "광역시도에 해당하는 통계정보입니다.";
									if($totSurvMain.ui.selectedYear == '2015'){
										noticeStr = "2016년부터 제공하는 통계정보입니다.";
									}
									var foreignHtml = "";
									foreignHtml += "<div class='DataNone' style='text-align: center; margin-left: -30px;'>";
									foreignHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 35px;'>";
									foreignHtml += "	<p style='margin-top: 15px;'>" + noticeStr + "</p>"; //2020.10.14[신예리] 맞춤법 수정
									foreignHtml += "</div>";
									$("#multiculPopulationChart").html(foreignHtml)
									//2020.10.14[신예리] 다문화 가구 차트 없을 때 화면 (hide, show로 변경) END
								}
							}
							
							//총조사인구 차트 세팅
							if($totSurvMain.ui.selectedArea == '99' || $totSurvMain.ui.selectedArea == '00'){
								setPopulationForTimeChart(populationForTimeData,"populationTimeChart","N","160")
							}
						//} // 2020-10-14 [곽제욱] 맵 확대시에도 차트 생성되게 수정
						
						// 각 값, 비율 세팅
						$(".dataAreatit").html('<h1>'+numberFormat(totPeople)+'</h1><span class="ml5">명</span>');
						if(totPeopleRank != "") {
							$("#peopleRank").html(totPeopleRank);
						}
						var upDownCheck = "";

						if(totPeopleRt!="" && totPeopleRt != undefined ){	// 2020.10.13[곽제욱] undefined 추가	
							if(parseFloat(totPeopleRt) > 0){
								upDownCheck = "<span class='stats_up bold'>" +totPeopleRt+" % </span><span class='stats_up'>▲</span>";
							} else if(parseFloat(totPeopleRt) < 0){
								totPeopleRt = totPeopleRt.replace("-", ""); // 2020-10-06 [곽제욱] 감소율에서 - 표시 제거 
								upDownCheck = "<span class='stats_down bold'>" +totPeopleRt+" % </span><span class='stats_down'>▼</span>";
							} else {
								upDownCheck = "<span class='stats_normal bold'>" +totPeopleRt+" % </span>"; // 2020-10-13 [곽제욱] 0일경우 - 표현 삭제 
							}
							$("#peopleChangeRt").html("전년도 대비 "+ upDownCheck);
						} else if($totSurvMain.ui.selectedLevel != "3"){
							$("#peopleChangeRt").html("<span class='stats_normal'>-</span>"); // 2020-10-13 [곽제욱] 데이터 없을경우- 처리
						} 
						
						$("#genderRt").html(genderRt);
						
						/** 2020-10-13 [곽제욱] 배창환주무관 요청으로 남녀성비 전년도 대비 영역 제거 START */
						/*
						if(genderChangeRt!=""){
							if(parseFloat(genderChangeRt) > 0){
								upDownCheck = "<span class='stats_up bold'>" +genderChangeRt+" % </span><span class='stats_up'>▲</span>";
							} else if(parseFloat(genderChangeRt) < 0){
								genderChangeRt = genderChangeRt.replace("-", ""); // 2020-10-06 [곽제욱] 감소율에서 - 표시 제거 
								upDownCheck = "<span class='stats_down bold'>" +genderChangeRt+" % </span><span class='stats_down'>▼</span>";
							} else {
								upDownCheck = "<span class='stats_normal bold'>" +genderChangeRt+" % </span>"; // 2020-10-13 [곽제욱] 0일경우 - 표현 삭제
							}
							$("#genderChangeRt").html("전년도 대비 "+ upDownCheck);
						} else {
							$("#genderChangeRt").html("<span class='stats_normal'>-</span>"); // 2020-10-13 [곽제욱] 데이터 없을경우- 처리
						}
						*/
						/** 2020-10-13 [곽제욱] 배창환주무관 요청으로 남녀성비 전년도 대비 영역 제거 END */
						
						$("#forigen").html(numberFormat(forigen));
						
						if(forigenRt!="" && forigenRt!= undefined){	// 2020.10.13[곽제욱] undefined 추가
							if(parseFloat(forigenRt) > 0){
								upDownCheck = "<span class='stats_up bold'>" +forigenRt+" % </span><span class='stats_up'>▲</span>";
							} else if(parseFloat(forigenRt) < 0){
								forigenRt = forigenRt.replace("-", ""); // 2020-10-06 [곽제욱] 감소율에서 - 표시 제거 
								upDownCheck = "<span class='stats_down bold'>" +forigenRt+" % </span><span class='stats_down'>▼</span>";
							} else {
								upDownCheck = "<span class='stats_normal bold'>" +forigenRt+" % </span>"; // 2020-10-13 [곽제욱] 0일경우 - 표현 삭제
							}
							$("#foriegnChangeRt").html("전년도 대비 "+upDownCheck);
						} else{
							$("#foriegnChangeRt").html("<span class='stats_normal'>-</span>"); // 2020-10-13 [곽제욱] 데이터 없을경우- 처리
						}
						
						$totSurvMain.ui.selectedArea = regionCd;
						
						//20200909 박은식 슬라이드 Rank값 셋팅 end
						if($totSurvMap.ui.mapRegion != "emdong"){
							$(".mapInfo").hide();
						}
						
						
						if (typeof pCallback === "function"){
							//총인구 세계지도인 경우 pass
							if(regindCd != ''){							
								pCallback(res.result.sidoList);// [{sido_cd, sido_nm, x_coor, y_coor} ... ]
							}
						}
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
			if(mode == "1"){
				$populationDash.ui.drawContent($totSurvMap.ui.selectedSurvId, $totSurvMap.ui.selectedItmCd, $totSurvMap.ui.selectedC1, $totSurvMap.ui.selectedC2);
			} else {
				if($totSurvMap.ui.map != null){
					$totSurvMap.ui.map.update();
				}
			}
			
			setTimeout(function() {
				$totSurvMain.ui.loading(false);
			}, 500);
		},
		
		/**
		 * @name		 : allClear 
		 * @description  : 인구총조사 모든 차트데이터, 총인구데이터 초기화
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		allClear : function(){
			//20201028 박은식 조회조건 초기화 START
			$totSurvMap.ui.selectedSurvId = "";
			$totSurvMap.ui.selectedItmCd = "";
			$totSurvMap.ui.selectedC1 = "";
			$totSurvMap.ui.selectedC2 = "";
			//20201028 박은식 조회조건 초기화 END
			$("areaPopulation").html();
			$("#local_people1").empty(); // 내국인 차트 초기화
			$("#foreigner_people1").empty(); // 외국인 차트 초기화
			$("#ageDistribution").empty(); // 연령분포 차트 초기화
			$("#populationTimeChart").empty(); // 총조사인구 차트 초기화
			$("#moveHome").empty(); // 총조사인구 차트 초기화
			$("#multiculPopulationChart").empty(); // 다문화가구 차트 초기화
			$("#clickItmName").html("지도"); // 다문화가구 차트 초기화
			$(".TileMaptoolTip").html(); // 2020-10-13 [곽제욱] 초기화후 툴팁영역 재생성 방지 
			/* 총인구 영역(순위, 증감율, 슬라이드) 초기화 */
			
		}
	};

	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};
	
	
}(window, document));

/**
 * @name         : setPeopleLocalChart 
 * @description  : 내국인, 외국인 차트 세팅
 * @date         : 2020.08.06
 * @author	     : juKwak
 * @history 	 : 
 */
function setPeopleLocalChart(data, target, resizeYn, height, gubun){
	// 전체 길이를 위한 합산값
	var total = 0;
	// 전체 data중 필요한 값만 꺼내쓰기 위한 새 배열
	var localData = data;
	
	//반응형
	$("#"+target).empty();
	var width = $("#localDiv").outerWidth();
	if(width < 655){
		width = width -100;
	}
	for(var i=0; i<localData.length; i++){
		total += Number(localData[i].dt);
	}
	if(target == "local_people1"){
		$populationDash.localPopleData = data;
	} else if(target == "local_people1"){

		$populationDash.foreignerData = data;
	}
	
	
	// 마진값 세팅
	var margin = ({top: 0, right: 50, bottom: 5, left: 30});
	// barChart 색 세팅(해당 차트는 막대그래프가 2개)
	var colors = ["#1FB3DC", "#3AD1A6"];
	
	// X축 세팅(domain : 눈금범위, range : 길이범위)
	var x = d3.scaleLinear()
	    .domain([0, d3.max(localData, function(d){return Number(d.dt)} )])
	    .range([margin.left, width - margin.right]);
	
	var bx = d3.scaleLinear()
	    .domain([0, 100])
	    .range([margin.left, width - margin.right]);
	
	// Y축 세팅(domain : 눈금범위, range : 길이범위, 해당 차트에서는 눈금이 2개(데이터의 길이 2))
	var y = d3.scaleBand()
	    .domain(d3.range(localData.length))
	    .range([0, height]) //range / domainlength 항목간 넓이
	    .padding(0.5);
	
	var xAxis = function(g){ return g
	    .attr("transform", "translate("+0+"," +margin.top+")")
	    .call(d3.axisTop(x).ticks(width / 80, localData.format))
	    .call(function(g){ return g.select(".domain").remove()});
	}
	
	var yAxis = function(g){ return g
    .attr("transform", "translate("+margin.left+","+0+")")
		.data(localData)
		.call(d3.axisLeft(y).tickFormat(
				function(i){
					var itm_nm = ""
      	    		if(localData[i].itm_cd == "T131" || localData[i].itm_cd == "T141"){
      	    			itm_nm = "남"
      	    		} else if(localData[i].itm_cd == "T132" || localData[i].itm_cd == "T142"){
      	    			itm_nm = "여"
      	    		}
      	    		return itm_nm;
  	    		})
		.tickSizeOuter(0))
	};
	
	var format = x.tickFormat(20, localData.format);
	
	// 차트 그릴 위치(target)
	const chart = d3.select("#"+target+"");
	
	// 차트에 svg(실제 차트가 그려지는 영역) 추가, widht, height 설정
	const svg = chart
	    .append("svg")
	    .attr("id", 'chart')
	    .attr("height", height)
	    .attr("width", width);
	
	//백그라운드 그리기 start
    svg.append("g")
	    .selectAll("rect")
	    .data(localData)
	    .join("rect")
		    .attr("x", x(0))
		    .attr("y", function(d, i){ return y(i) })
		    .attr("width", function(d) { return bx(100)*0.55 })
		    .attr("height", y.bandwidth())
		    .attr("fill",  "#ebebeb")
		    .attr("rx", "8")
    		.attr("ry", "8")
    		.attr("class", "back");
    
    svg.append("g")
	    .attr("text-anchor", "end")
	    .attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
	    .attr("font-size", 13)
	    .selectAll("text")
	    .data(localData)
	    .join("text")
	    	.attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
	    	.attr("fill", "#818181")
		    .attr("x", function(d) { return bx(70)+160})
		    .attr("y", function(d, i){ return y(i) + y.bandwidth() / 2} )
		    .attr("dy", "0.35em")
		    .attr("dx", -4)
	    .text(function(d) { return (Number(d.dt)/Number(total)*100).toFixed(2)  + "%" })
	    .call(function(text) { return text.filter(function(d) { return x(Number(d.dt))  - x(0)  < 20 })  // short bars
		    .attr("dx", +4)
		    .attr("fill", "black")
		    .attr("text-anchor", "start") })
		    .attr("class", "data");
    //백그라운드 그리기 end

    //실데이터 그리기 start
    if(resizeYn == "Y"){
    	svg.append("g")
	    .selectAll("rect")
	    .data(localData)
	    .join("rect")
		      .attr("x", x(0))
		      .attr("y", function(d, i) { return y(i) })
		      .attr("height", y.bandwidth())
        .attr("fill",  function(d, i){return colors[i];})
        .on("mouseover", function(){
        	// 마우스 over시 함수(object, 색상)
        	$populationDash.ui.chartMouseOver($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
	    })
	    .on("mouseout", function(d){
	    	$populationDash.ui.chartMouseOut($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경	
	    })
	    .on("click", function(d){
	    	$populationDash.ui.chartItmClick($(this), d, "#576574",$totSurvMain.ui.selectedYear+"년 "+d.itm_nm); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
	    })
        .attr("width", 0)
        .attr("width",  function(d){ return bx(Number(d.dt)/total*100*0.65)-50; })
        .attr("rx", "8")
		.attr("ry", "8")
    } else {
    	svg.append("g")
	    .selectAll("rect")
	    .data(localData)
	    .join("rect")
		      .attr("x", x(0))
		      .attr("y", function(d, i) { return y(i) })
		      .attr("height", y.bandwidth())
        .attr("fill",  function(d, i){return colors[i];})
        .on("mouseover", function(){
        	$populationDash.ui.chartMouseOver($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
	    })
	    .on("mouseout", function(d){
	    	$populationDash.ui.chartMouseOut($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
	    })
	    .on("click", function(d){
	    	$populationDash.ui.chartItmClick($(this),d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.itm_nm); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
	    })
        .attr("width", 0)
              .transition()
              .duration(1000)// 20201111 박은식 animation 지연시간 변경
              .delay(function (d, i) {
                  return i * 150;
              })
        .attr("width",  function(d){ return bx(Number(d.dt)/total*100*0.65)-50; })
        .attr("rx", "8")
		.attr("ry", "8")
    }
    

	svg.append("g")
		.attr("text-anchor", "end")
		.attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
		.attr("font-size", 13)
        .attr("font-weight", 600)
	    .selectAll("text")
	    .data(localData)
	    .join("text")
	    	.attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
        	.attr("fill", function(d, i){return colors[i]})
			.attr("x", function(d) { return bx(70)+85})
			.attr("y", function(d, i) { return y(i) + y.bandwidth() / 2 } )
			.attr("dy", "0.35em")
			.attr("dx", -4)
        .text(function(d) { return format(d.dt) + " 명" } )
		    .call(function(text) { return text.filter(function(d) { return x(Number(d.dt)) - x(0)  < 20 })  // short bars
		    .attr("dx", +4)
		    .attr("text-anchor", "start") });

	
	svg.append("g").attr("style", "margin-left:250px;")
		.attr("style", " font-size:13px; font-weight:600;")
		.data(data)
		.attr("color", function(d, i){ return colors[i]})
		.call(yAxis);
	
	// 실데이터 그리기 end
	$("#"+target+"").find("line, path").remove();
	
}

/**
 * @name         : setPeopleAgeChart 
 * @description  : 연령분포 차트 세팅
 * @date         : 2020.08.06
 * @author	     : juKwak
 * @history 	 : 
 */
function setPeopleAgeChart(data, target, resizeYn, height){
	// 마진값 세팅
	var margin = ({top: 20, right: 0, bottom: 20, left: 70})
	// 칼라 세팅
	var color = ["#92d0ef", "#92d0ef", "#f1d16e","#f1d16e","#4dc7ac","#4dc7ac","#4dc7ac","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#f5ca87","#f5ca87","#f5ca87","#f5ca87","#f5ca87"] //20201022 박은식 청년 장년 노년 연령 색상 변경 
	var max = d3.max(data, function(d) { return Number(d.dt) });
	var backGroundData = [
		{"c1_nm" : "0~4세", "dt" : max*1.3}, {"c1_nm" : "5~9세", "dt" : max*1.3}
	];
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$populationDash.ageDistributionData = data;
	
	// X축 세팅(domain : 눈금범위, range : 길이범위)
	var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    
    // Y축 세팅(domain : 눈금범위, range : 길이범위)
	var y = d3.scaleLinear()
	    .domain([0, d3.max(data, function(d) { return Number(d.dt)*1.2 })]).nice()
	    .range([height - margin.bottom, margin.top]);
	
	// X 축 정보
	var xAxis = function(g) { return g
	    .attr("transform", "translate("+0+","+(height-margin.bottom)+")")
	    .call(d3.axisBottom(x).tickFormat(function(i) { return data[i].c1_nm.replace("세", "").replace("이상", "~")} ).tickSizeOuter(0))
	};

	// Y 축 정보
	var yAxis = function(g) { return g
	    .attr("transform", "translate("+margin.left+"," + 0 + ")")
	    .call(d3.axisLeft(y).ticks(4, "s"))//20201027 박은식 수치 출력 개수 및 단위값 추가 
	    .call(function(g) { return g.select(".domain").remove() })
	    .call(function(g) { return g.append("text") 
	    	.attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
		    .attr("x", -margin.left)
		    .attr("y", 10)
		    .attr("fill", "currentColor")
		    .attr("text-anchor", "start")
		    .text(data.x) })
	};
	
	const chart = d3.select("#"+target+"");
    // 2020-06-02 [곽제욱] 차트 width, height 적용
    const svg = chart
	    .append("svg")
	    .attr("height", height)
	    .attr("width", width)
	    .attr("style", "margin-left:-15px"); // 2020-10-06 [곽제욱] 마진값 변경
    
    //var tool = d3.select("body").append("div").attr("class", "chartCommontoolTip");
    var tool = $(".chartCommontoolTip"); 		/** 2020-10-07 [곽제욱] 툴팁 수정 */
    
    //백그라운드 1(영유아/어린이)
    svg.append("g")
	    .selectAll("rect")
	    .data(backGroundData)
	    .join("rect")
		    .attr("x", function(d, i) { return (x(i)-5) })
		    .attr("y", function(d) { return y(Number(d.dt)) })
		    .attr("width", (x.bandwidth())*2)
		    .attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
		    .attr("fill",  "#F4FAFD");
    
    //백그라운드 2(청소년)
    svg.append("g")
	    .selectAll("rect")
	    .data(backGroundData)
	    .join("rect")
		    .attr("x", function(d, i) { return (x(i+2)-3) })
		    .attr("y", function(d) { return y(Number(d.dt)) })
		    .attr("width", (x.bandwidth())*2)
		    .attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
		    .attr("fill",  "#FEFDF0");
    
    //백그라운드 3(청년)
    svg.append("g")
	    .selectAll("rect")
	    .data(backGroundData)
	    .join("rect")
		    .attr("x", (function(d, i) { return (x(i+4)) }))
		    .attr("y", function(d) { return y(Number(d.dt)) })
		    .attr("width", (x.bandwidth())*4 +7 ) //20201022 박은식 청년 범위 변경
		    .attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
		    .attr("fill",  "#F2F8EF");
    
    //백그라운드 4(장년)
    svg.append("g")
	    .selectAll("rect")
	    .data(backGroundData)
	    .join("rect")
		    .attr("x", function(d, i) { return (x(i+7)) -3}) //20201022 박은식 장년 범위 변경
		    .attr("y", function(d) { return y(Number(d.dt)) })
		    .attr("width", (x.bandwidth())*10) //20201022 박은식 장년 범위 변경 //2020.10.23[신예리] ie에서 가로 스크롤 생김-> width값 변경
		    .attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
		    .attr("fill",  "#FCEFF5");
    
    //백그라운드 5(노년)
    svg.append("g")
		.selectAll("rect")
		.data(backGroundData)
		.join("rect")
			.attr("x", function(d, i) { return (i == 1)? x(i+13) : (x(i+13)) } ) //20201022 박은식 노년 범위 변경
			.attr("y", function(d) { return y(Number(d.dt)) })
			.attr("width", (x.bandwidth())*4) //2020.10.23[신예리] ie에서 가로 스크롤 생김-> width값 변경
			.attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
			.attr("fill",  "#FEF7EE");
    if(resizeYn == "Y"){
    	// 실제 차트 start
        svg.append("g")
    	.selectAll("rect")
    	.data(data)
    	.join("rect")
    	.attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
    	.attr("x", function(d, i) { return (x(i))+x.bandwidth()/2-15 }) // 20201028 박은식 차트 width 값 변경
    	.attr("y", function(d) { return y(0) }) // 시작점 Y좌표
    	.attr("width", 30) // 20201028 박은식 차트 width 값 변경
    	.attr("fill", function(d,i) {return color[i]})
    	.style("cursor", "pointer") //2020.11.03[신예리] 마우스 커서 추가
    	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
        .on("mouseover", function(d){
        	$populationDash.ui.chartMouseOver($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
        	$populationDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm," 인구", d.origin_dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), "명", tool, -140, -80);
    	})
    	.on("mouseout", function(){
    		$populationDash.ui.chartMouseOut($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
    		
    		tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
    	})
    	.on("click", function(d){
    	//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
    		if($totSurvMain.ui.selectedLevel != "3"){    			
	    		$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 연"+d.c1_nm+" "+d.itm_nm.replace("(명)", "").replace("총인구", "총 인구");//20201028 박은식 타이틀 변경
    		}
    	//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END

    		srvLogWrite('P0','02','04','03',$totSurvMain.ui.selectedThema,'itm_cd='+d.itm_cd+",region_cd="+d.region_cd+",c1="+d.c1+",surv_id="+d.surv_id);

    		$populationDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
    	})
    	.attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
    	.attr("y", function(d) { return y(Number(d.dt)) })
    	
    } else {
    	// 실제 차트 start
        svg.append("g")
    	.selectAll("rect")
    	.data(data)
    	.join("rect")
    	.attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
    	.attr("x", function(d, i) { return (x(i))+x.bandwidth()/2-15 })// 20201028 박은식 차트 width 값 변경
    	.attr("y", function(d) { return y(0) }) // 시작점 Y좌표
    	.attr("width", 30)// 20201028 박은식 차트 width 값 변경
    	.attr("fill", function(d,i) {return color[i]})
    	.style("cursor", "pointer")
    	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
        .on("mouseover", function(d){
        	$populationDash.ui.chartMouseOver($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
        	$populationDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm," 인구", d.origin_dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), "명", tool, -140, -80);
    	})
    	.on("mouseout", function(){
    		$populationDash.ui.chartMouseOut($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
    		tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
    	})
    	.on("click", function(d){
    		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
    		if($totSurvMain.ui.selectedLevel != "3"){
	    		$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.c1_nm+" "+d.itm_nm.replace("(명)", "").replace("총인구", "총 인구");
    		}
    		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END

			srvLogWrite('P0','02','04','03',$totSurvMain.ui.selectedThema,'itm_cd='+d.itm_cd+",region_cd="+d.region_cd+",c1="+d.c1+",surv_id="+d.surv_id);

    		$populationDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
    	})
    	//.attr("height", 0)
    	.transition()
    	.duration(1000)
    	.delay(function (d, i) {
    	return i * 150; //20201111 박은식 animaion 지연시간 변경
    	})
    	.attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
    	.attr("y", function(d) { return y(Number(d.dt)) })
    	
    }
    


     svg.append("g").attr("style", "color:#878A89; font-size:12px;") // 2020.10.28[신예리] 폰트 사이즈 변경
 		.selectAll("text")
	 	.data(data)
	 	.join("text")
	 	//20201028 박은식 text click event 추가 START
	 	.style("cursor", "pointer")
	 	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	 	.on("click", function(d, i){
    		if($totSurvMain.ui.selectedLevel != "3"){
	    		$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.c1_nm+" "+d.itm_nm.replace("(명)", "").replace("총인구", "총 인구");
    		}
    		$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
    		$populationDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.chartTitle); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
	 	})
	 	//20201028 박은식 text click event 추가 END
	 	.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
	 	.attr("y", function(d) { return y(Number(d.dt))-10 })
	 	.text( function(d){ return numberFormat(d.dt) })//20201120 박은식 number format 변경
 	
	svg.append("g")
	.attr("style", "color:#878A89; font-size:12px;") // 2020.10.28[신예리] 폰트 사이즈 변경
	.call(xAxis);
	
	svg.append("g")
	.attr("style", "color:#878A89; font-size:12px;") // 2020.10.28[신예리] 폰트 사이즈 변경
	.call(yAxis);
	   
	   
	$("#"+target+"").find("line").remove();
	// 실제 차트 end
    
}

/**
 * @name         : setPopulationMoveHomeChart 
 * @description  : 거주지 이동 차트
 * @date         : 
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이, surv_id - 조사id
 */
function setPopulationMoveHomeChart(data, target, resize, height){
	var margin = ({top: 0, right: 150, bottom: 5, left: 130}) //2020.10.28[신예리] 이미지 저장 시 차트 범례명 잘림 - left 값 수정
	  var colors = ["#1B7ED5", "#49A2EF", "#77BDF9", "#98CFFF", "#B8C9D8","#94A3B1","#5E6B6D"]; //2020.09.22[신예리] 차트 컬러 변경

	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$populationDash.moveHomeData = data;
	
		var total = 0;
		for(var i=0; i<data.length; i++){
			total = Number(data[i].dt) + total;
		}
	
	  var x = d3.scaleLinear()
	  			.domain([0, d3.max(data, function(d) { return Number(d.dt)})*0.95])
	            .range([margin.left, width - margin.right])
	  var x1 = d3.scaleLinear()
	  			.domain([0, d3.max(data, function(d) { return Number(d.dt)})*1.2])
	            .range([0, width - margin.right])
	  var y = d3.scaleBand()
	            .domain(d3.range(data.length))
	            //.rangeRound([margin.top, height - margin.bottom])
	            .range([0, height]) //range / domainlength 항목간 넓이
	            .padding(0.5)
	  var y1 = d3.scaleBand()
	            .domain(d3.range(data.length))
	            //.rangeRound([margin.top, height - margin.bottom])
	            .range([0, height-10]) //range / domainlength 항목간 넓이
	            .padding(0.1)
	  var xAxis = function(g) { return g
	      	    .attr("transform", "translate(0,"+ margin.top +")")
	      	    .call(d3.axisTop(x).ticks(width / 80, data.format))
	      	    .call( function(g) { return g.select(".domain").remove() } )
	  			}
	  var yAxis = function(g) { return g
	      	    .attr("transform", "translate("+ (margin.left+5) + ",0)")
	      	    .call(d3.axisLeft(y).tickFormat(
	      	    	function(i) {
	      	    		return data[i].itm_nm.replace("-", " ")//20201028 박은식 택스트제거
	      	    	//	return itm_nm;
	      	    	}).tickSizeOuter(0))
	  			}
	  var format = x.tickFormat(20, data.format)
	  //타겟 설정
	  const chart = d3.select("#"+target+"");
	  // 2020-06-02 [곽제욱] 차트 width, height 적용
	  const svg = chart
			     .append("svg")
			     .attr("height", height)
			     .attr("width", width)
	  
	    
	  if(resize == "Y"){
		  svg.append("g")
	        .selectAll("rect")
	        .data(data)
	        .join("rect")
	      .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
	      .attr("x", x(0))
	      .attr("y", function(d, i) { return y(i) })
	      .attr("height", y.bandwidth())
	      .attr("fill", function(d,i) { return colors[i]})
	      .attr("width", 0)
	      .attr("rx", "4")
	      .attr("ry", "4")
	      .attr("width",  function(d) { return x1(Number(d.dt)) })
	      .style("cursor", "pointer") //2020.11.03[신예리] 마우스 커서 추가
	      .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	      .on("mouseover", function(){
		    	$populationDash.ui.chartMouseOver($(this), "#576574");
		   })
		   .on("click", function(d){
		   		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
			   if($totSurvMain.ui.selectedLevel != "3"){
				    $totSurvMain.ui.chartTarget = target
		    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
		    		$totSurvMain.ui.chartData = d;
		    		$totSurvMain.ui.chartColor = "#576574";
		    		$totSurvMain.ui.chartTitle =  $totSurvMain.ui.selectedYear+"년 거주지 이동-"+d.itm_nm.replace("-", " ");//20201028 박은식 텍스트 제거
			   }
		    	//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END
			   
			   srvLogWrite('P0','02','04','04',$totSurvMain.ui.selectedThema,'itm_cd='+d.itm_cd+",region_cd="+d.region_cd+",c1="+d.c1+",surv_id="+d.surv_id);

		    	$populationDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle);//20201028 박은식 타이틀 변경
		   })
		   .on("mouseout", function(){
		    	$populationDash.ui.chartMouseOut($(this), "#576574");
		   });

	  svg.append("g")
	      .attr("text-anchor", "end")
	      .attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
	      .attr("font-size", 13)
	      .attr("font-weight", 600)
	        .selectAll("text")
	        .data(data)
	        .join("text")
	       //20201028 박은식 클릭이벤트 추가 START
	      .style("cursor", "pointer")
	      .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		   .on("click", function(d, i){
				 if($totSurvMain.ui.selectedLevel != "3"){
					    $totSurvMain.ui.chartTarget = target
			    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
			    		$totSurvMain.ui.chartData = d;
			    		$totSurvMain.ui.chartColor = "#576574";
			    		$totSurvMain.ui.chartTitle =  $totSurvMain.ui.selectedYear+"년 거주지 이동-"+d.itm_nm.replace("-", " ")
				}
				$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
			    $populationDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.chartTitle);
		   })
	       //20201028 박은식 클릭이벤트 추가 END
	      .attr("fill", "")
	      .attr("x", 0)
	      .attr("width",  function(d) { return x1(Number(d.dt)) })
	      .attr("x",  function(d) { return x1(Number(d.dt))+margin.left})
	      .attr("y", function(d, i) { return y(i) + y.bandwidth() / 2 })
	      .attr("dy", "0.35em")
	      .text(function(d) { return (format(d.dt) == 0) ? '': format(d.dt) })
	        .call(function(text) { return text.filter(function(d) { return x1(Number(d.dt))}) // short bars
	      .attr("dx", +10)
	      .attr("text-anchor", "start") });
	  } else {
		  svg.append("g")
	        .selectAll("rect")
	        .data(data)
	        .join("rect")
	      .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
	      .attr("x", x(0))
	      .attr("y", function(d, i) { return y(i) })
	      .attr("height", y.bandwidth())
	      .attr("fill", function(d,i) { return colors[i]})
	      .attr("width", 0)
	      .attr("rx", "4")
	      .attr("ry", "4")
	      //.attr("width",  function(d) { return x1(Number(d.dt)) }) //20201026 박은식 animation효과 적용으로 위치 이동
	      .style("cursor", "pointer")
	      .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	       .on("mouseover", function(){
		    	$populationDash.ui.chartMouseOver($(this), "#576574");
		   })
		   .on("click", function(d){
			   //20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
			   if($totSurvMain.ui.selectedLevel != "3"){
				    $totSurvMain.ui.chartTarget = target
		    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
		    		$totSurvMain.ui.chartData = d;
		    		$totSurvMain.ui.chartColor = "#576574";
		    		$totSurvMain.ui.chartTitle =  $totSurvMain.ui.selectedYear+"년 거주지 이동-"+d.itm_nm.replace("-", " ")//20201028 박은식 텍스트제거
			   }
				//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END

			   srvLogWrite('P0','02','04','04',$totSurvMain.ui.selectedThema,'itm_cd='+d.itm_cd+",region_cd="+d.region_cd+",c1="+d.c1+",surv_id="+d.surv_id);	

		    	$populationDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle);//20201028 박은식 타이틀 변경
		   })
		   .on("mouseout", function(){
		    	$populationDash.ui.chartMouseOut($(this), "#576574");
		   })
		   //20201026 박은식 animaion 효과 수정 START
		   .transition()
	      .duration(1000)
	      .delay(function (d, i) {
	          return i * 150;
	      	})
		   .attr("width",  function(d) { return x1(Number(d.dt)) }); 
		  //20201026 박은식 animaion 효과 수정 END
		  
	  svg.append("g")
	      .attr("text-anchor", "end")
	      .attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
	      .attr("font-size", 12) // 2020.09.22[신예리]폰트 사이즈 수정
	      .attr("font-weight", 600)
	        .selectAll("text")
	        .data(data)
	        .join("text")
	       //20201028 박은식 클릭이벤트 추가 START
	      .style("cursor", "pointer")
	      .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		   .on("click", function(d, i){
				 if($totSurvMain.ui.selectedLevel != "3"){
					    $totSurvMain.ui.chartTarget = target
			    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
			    		$totSurvMain.ui.chartData = d;
			    		$totSurvMain.ui.chartColor = "#576574";
			    		$totSurvMain.ui.chartTitle =  $totSurvMain.ui.selectedYear+"년 거주지 이동-"+d.itm_nm.replace("-", " ")
				}
				$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
			    $populationDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.chartTitle);
		   })
	       //20201028 박은식 클릭이벤트 추가 END
	      .attr("fill", "")
	      .attr("x", margin.left)//20201026 박은식 시작 x위치 변경
	      //20201026 박은식 animation 효과 변경 위치이동 START
//	      .transition()
//	      .duration(1000)
//	      .delay(function (d, i) {
//	          return i * 150;
//	      })
	      //20201026 박은식 animation 효과 변경 위치이동 END
	      .attr("width",  function(d) { return x1(Number(d.dt)) })
	      //.attr("x",  function(d) { return x1(Number(d.dt))+margin.left})//20201026 박은식 animation 효과 변경 위치이동 
	      .attr("y", function(d, i) { return y(i) + y.bandwidth() / 2 })
	      .attr("dy", "0.35em")
	      .text(function(d) { return (format(d.dt) == 0) ? '': format(d.dt) })
	        .call(function(text) { return text.filter(function(d) { return x1(Number(d.dt))}) // short bars
	      .attr("dx", +10)
	      .attr("text-anchor", "start") })
	     //20201026 박은식 animation 효과 변경 위치이동 START
	      .transition()
	      .duration(1000)
	      .delay(function (d, i) {
	          return i * 150;
	      })
	      .attr("x",  function(d) { return x1(Number(d.dt))+margin.left});//20201026 박은식 animation 효과 변경 위치이동
	  	//20201026 박은식 animation 효과 변경 위치이동 END
	  }
	  

	  svg.append("g")
	      .attr("style", "margin-left:250px; font-size: 12px; color:#878A89") // 2020.10.28[신예리] 폰트 사이즈 변경
	        .call(yAxis);

	  $("#"+target+"").find("line, path").remove()
}

/**
 * @name         : setPopulationForTimeChart 
 * @description  : 총조사인구 차트
 * @date         : 2020.09.09
 * @author	     : esPark
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setPopulationForTimeChart(data, target, resizeYn, height){
	
	// [총조사인구 차트] 넘어온 데이터 체크  START  2020-10-13  jhs
	if(data.length == 0){
		return;
	}
	// [총조사인구 차트] 넘어온 데이터 체크  END  2020-10-13  jhs
	
	//임시 start
	for(var i=0; i < data.length; i++){
		if(i == 0){
			data[0].incORdec = '0';
			continue;
		}
		var temp = data[i].dt - data[i-1].dt;
		data[i].incORdec = temp/data[i-1].dt*100;
	}
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$populationDash.totalPopulationData = data;
	
	//var tool = d3.select("body").append("div").attr("class", "populationTimetoolTip");
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	//임시 end
	
	//기본셋팅
	var margin = ({top: 10, right: (resizeYn == "Y") ? 65 : 50, bottom: 20, left: 30}) //20201103 박은식 resize 될때 right값 조절
	var color = ["5058b8", "7A82D4", "9AA1E9", "BFC5F7", "DFE2FB"];
	//var color = ["8FB51B", "acd325", "C8E457", "DCF17A", "EDFAA7"];
	
	var x = d3.scaleBand()
              .domain(data.map(function(d){ return d.surv_year }))
              .rangeRound([margin.left, width - margin.right])
              .padding(0.5);
	var y1 = d3.scaleLinear()
			   .domain([0, d3.max(data, function(d){ return Number(d.dt)+5000000 })]).nice()
			   .rangeRound([height - margin.bottom, margin.top]);
	var y2 =  d3.scaleLinear()
				.domain([-20, 20])
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
          							    						 .attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
          														 .attr("x", -margin.left)
          														  .attr("y", 10)
          														  .attr("fill", "#878A89")
          														  .attr("text-anchor", "start")
          														  .attr("font-size", "15")
          														  .text(data.y1) })
  				}
	var y2Axis = function(g){ return g.attr("transform", 'translate('+(width - margin.right)+',0)')
            						  .call(d3.axisRight(y2).ticks(5).tickFormat(function(d){return d+"%"}))
            						  .call(function(g){return g.select(".domain").remove() })
            						  .call(function(g){return g.append("text")
            							  						 .attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
            							  						 .attr("x", margin.right)
            													 .attr("y", 10)
            													 .attr("fill", "#878A89")
            													 .attr("text-anchor", "end")
            													 .attr("font-size", "15")
            													 .text(data.y2) })
  				}
	//타겟설정
	const chart = d3.select("#"+target+"");

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
		  .attr("id", "totalPopulation")//20210222 박은식 총조사인구 차트 클릭 시 타겟을 잡아주기 위한 id값 추가
		  .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
		  .style("cursor", "pointer") //2020.11.03[신예리] 마우스 커서 추가
		  .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		  .attr("value", function(d){ return d.surv_year } )
		.on("mousedown", function(d){
			//20201202 박은식 2010년 이전 정보는 조회 안되도록 처리 START
			if(Number(d.surv_year) >= 2010){
				//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
				if($totSurvMain.ui.selectedLevel != "2"){//20210217 박은식 조회 level 변경
					$totSurvMain.ui.chartTarget = target
		    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
		    		$totSurvMain.ui.chartData = d;
		    		$totSurvMain.ui.chartColor = "#576574";
		    		$totSurvMain.ui.chartTitle = d.surv_year+"년 총 인구";//20201028 박은식 띄어쓰기 추가
				}
	    		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END

				srvLogWrite('P0','02','02','00',$totSurvMain.ui.selectedThema,'year='+d.surv_year);

				$totSurvMain.ui.timeTotPopulationYear = d3.select(this).attr('value');
				$populationDash.ui.chartItmClick($(this), d , "#576574", d.surv_year+"년  총 인구"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경 //20201028 박은식 띄어쓰기 추가
			} else {
				commonTotSurv_alert("지도서비스는 2010년 이후 정보만 조회가능합니다.", "");
			}
			//20201202 박은식 2010년 이전 정보는 조회 안되도록 처리 END
			
		})
		.on('mouseover', function(d){
			$populationDash.ui.chartMouseOver($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
			$populationDash.ui.createChartTool(d.surv_year, "총 인구","", numberFormat(d.dt), "명", tool, -20, -100); //20201028 박은식 띄어쓰기 추가//20201120 박은식 number format 변경
		})
		.on('mouseout', function(){
			$populationDash.ui.chartMouseOut($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
			tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
		})
		.attr("fill", function(d){ //최고값기준으로 해당하는 %에 맞게 색상을 지정
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
		.attr("x", function(d){ return x(d.surv_year)+x.bandwidth()/2-20 })// 20201028 박은식 차트 width 값 변경
		.attr("width", 40)// 20201028 박은식 차트 width 값 변경
		.attr("y", function(d){ return y1(0) })
		.attr("color", function(d){ //mouseout event에 사용될 변수
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
        .attr("height",  function(d) {return y1(0) - y1(Number(d.dt)) })
		.attr("y", function(d){ return y1(Number(d.dt)) })
        //이벤트
		
		//path를 생성하여 변수에 담음
		var path = svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#97BB03")//20201202 박은식 색상 변경
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
		  .attr("id", "totalPopulation")//20210222 박은식 총조사인구 차트 클릭 시 타겟을 잡아주기 위한 id값 추가
		  .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
		  .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		.attr("value", function(d){ return d.surv_year } )
		.on("mousedown", function(d){
			//20201202 박은식 2010년 이전 정보는 조회 안되도록 처리 START
			if(Number(d.surv_year) >= 2010){
				//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
				if($totSurvMain.ui.selectedLevel != "2"){//20210217 박은식 조회 level 변경
					$totSurvMain.ui.chartTarget = target
		    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
		    		$totSurvMain.ui.chartData = d;
		    		$totSurvMain.ui.chartColor = "#576574";
		    		$totSurvMain.ui.chartTitle = d.surv_year+"년 총 인구";//20201028 박은식 띄어쓰기 추가
				}
	    		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END

			srvLogWrite('P0','02','02','00',$totSurvMain.ui.selectedThema,'year='+d.surv_year);

				$totSurvMain.ui.timeTotPopulationYear = d3.select(this).attr('value');
				$populationDash.ui.chartItmClick($(this), d , "#576574", d.surv_year+"년  총 인구"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경 //20201028 박은식 띄어쓰기 추가
			} else {
				commonTotSurv_alert("지도서비스는 2010년 이후 정보만 조회가능합니다.", "");
			}
			//20201202 박은식 2010년 이전 정보는 조회 안되도록 처리 END
		})
		.on('mouseover', function(d){
			$populationDash.ui.chartMouseOver($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
			$populationDash.ui.createChartTool(d.surv_year, "총 인구","", numberFormat(d.dt), "명", tool, -20, -100); //20201028 박은식 띄어쓰기 추가//20201120 박은식 number format 변경
		})
		.on('mouseout', function(){
			$populationDash.ui.chartMouseOut($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
			tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
		})
		.attr("fill", function(d){ //최고값기준으로 해당하는 %에 맞게 색상을 지정
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
		.attr("x", function(d){ return x(d.surv_year)+x.bandwidth()/2-20 })// 20201028 박은식 차트 width 값 변경
		.attr("width", 40)// 20201028 박은식 차트 width 값 변경
		.attr("y", function(d){ return y1(0) })
		.attr("color", function(d){ //mouseout event에 사용될 변수
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
		  .transition()
          .duration(1000) //20201111 박은식 animation 지연시간 변경
          .delay(function (d, i) {
        			return i * 150;//20201111 박은식 animation 지연시간 변경
          })
        .attr("height",  function(d) {return y1(0) - y1(Number(d.dt)) })
		.attr("y", function(d){ return y1(Number(d.dt)) })
		.style("cursor", "pointer") // 2020-10-22 [신예리] 커서 추가
        //이벤트
		
		//path를 생성하여 변수에 담음
		var path = svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#97BB03") // 2020.09.22[신예리] 총조사 인구 stroke color 변경
			.attr("stroke-miterlimit", 2)
			.attr("stroke-width", 2) // 2020.09.22[신예리] 총조사 인구 stroke width값 조정
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
			$populationDash.ui.createChartTool(d.surv_year, "증감율","", (d.incORdec == 0) ? "-" : d.incORdec.toFixed(2), (d.incORdec == 0) ? "" : "%", tool, -20, -90); //2020.10.14[신예리] 증감율 툴팁 y값 -100에서 -90으로 변경
		})
		.on("mouseout", function(){
			tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
		})
		.attr("fill", "#fff") // 2020.09.22[신예리] 총조사 인구 circle fill color 변경
		.attr("stroke", "#97BB03") // 2020.09.22[신예리] 총조사 인구 circle stroke 추가
		.attr("stroke-width", 2) // 2020.09.22[신예리] 총조사 인구 circle stroke width 추가
		.attr("style", "pointer-events: all;")
		.attr("cx", function(d){ return x(d.surv_year) + x.bandwidth() / 2 })
		.attr("cy", function(d){ return y2(d.incORdec) })
		.attr("r", 4)
		.style("cursor", "pointer") // 2020-10-22 [신예리] 커서 추가

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


	  svg.append("g").attr("style", "color:#878A89; font-size:12px;") // 2020.10.28[신예리] 폰트 사이즈 변경
		.selectAll("text")
		.data(data)
		.join("text")
		.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		//20201028 박은식 클릭이벤트 추가 START
	   .on("mousedown", function(d, i){
		 //20201203 박은식 - 2010년 이전 정보는 조회 불가하도록 처리 START 
		 //20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
		   if(Number(d.surv_year) >= 2010){
			   if($totSurvMain.ui.selectedLevel != "2"){//20210217 박은식 조회 level 변경
					$totSurvMain.ui.chartTarget = target
		    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
		    		$totSurvMain.ui.chartData = d;
		    		$totSurvMain.ui.chartColor = "#576574";
		    		$totSurvMain.ui.chartTitle = d.surv_year+"년 총 인구";//20201028 박은식 띄어쓰기 추가
				}
	   		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END
				$totSurvMain.ui.timeTotPopulationYear = $("#"+target).find("rect.eventGroup").eq(i).attr('value');
				$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
				$populationDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d , "#576574", d.surv_year+"년  총 인구"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경 //20201028 박은식 띄어쓰기 추가   
		   } else {
			   commonTotSurv_alert("지도서비스는 2010년 이후 정보만 조회가능합니다.", "");
		   }
		 //20201203 박은식 - 2010년 이전 정보는 조회 불가하도록 처리 END
	    })
	    .attr("cursor", "pointer")
	    //20201028 박은식 클릭이벤트 추가 END 
		.attr("id", "chartData")
		.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(d.surv_year)+ x.bandwidth() / 2})
		.attr("y", function(d) { return y1(Number(d.dt))-10 })
		.text( function(d){ return numberFormat(d.dt) })//20201120 박은식 number format 변경
	
	svg.append("g")
		.attr("style", "color:#878A89; font-size:12px;") // 2020.10.28[신예리] 폰트 사이즈 추가
		.call(xAxis);

	svg.append("g")
		.attr("style", "color:#878A89; font-size:11px;") // 2020.10.28[신예리] 폰트 사이즈 추가
		.call(y1Axis);

	svg.append("g")
		.attr("style", "color:#878A89; font-size:11px;") // 2020.10.28[신예리] 폰트 사이즈 추가
		.call(y2Axis);	
	
	d3.selectAll("#textG>g>text").attr("id","textRange")
	$("#textRange").after("<text>%</text>")
	$("#"+target+"").find("text").attr("fill", "#878A89")
}

/**
 * @name         : totPopulationMulticul 
 * @description  : 다문화가구 차트
 * @date         : 2020.09.10
 * @author	     : esPark
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function totPopulationMulticul(data, target, resizeYn, height){
  var margin = ({top: 20, right: 10, bottom: 20, left: 80})
  
  $("#"+target).empty();
	var width = $("#"+target).outerWidth();
  
	$populationDash.totPopulationMulticulData = data;
	
	//var tool = d3.select("body").append("div").attr("class", "totPopulationMulticultoolTip");
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	
	var colors = ["#D81D62", "#fc2862", "#FD5D79", "#FE7D87", "#FEAAA8","#FED8D3"];
	
	var x = d3.scaleBand()
		.domain(d3.range(data.length))
		.range([margin.bottom+10, width - (margin.left/2)])
		.padding(0.5)
	
	var topDt = d3.max($.map(data, function(d){ return Number(d.dt) }));
	
	var y = d3.scaleLinear()
						.domain([0, d3.max($.map(data, function(d){ return Number(d.dt) }))]).nice()
						.rangeRound([height - margin.bottom, margin.top])

  var xAxis = function(g){ return g.data(data)
	  			.attr("transform", 'translate(4,'+(height - margin.bottom)+')')
				.call(d3.axisBottom(x).tickFormat(function(i){ return (data[i].c1_nm).replace("국인", "").replace("국인", "") }).tickSizeOuter(0))
  			  }
  
  var yAxis = function(g){ return g
				.attr("transform", 'translate('+(margin.left/2)+',0)') //2020.10.14[신예리] 다문화 가구 yAxis, xAxis 겹치는 부분 수정
				.call(d3.axisLeft(y).ticks(4, "s"))
				.call(function(g){ return g.select(".domain").remove() })
				.call(function(g){ return g.append("text")
						.attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
						.attr("x", 0)
						.attr("y", 10)
						.attr("fill", "steelblue")
						.attr("font-family", "NanumSquare")
						.attr("text-anchor", "start")
						.text(data.x)})
			  } 

  const chart = d3.select("#"+target+"");
  const svg = chart
         .append("svg")
         .attr("height", height)
         .attr("width", width)
        
         
         if(resizeYn == "Y"){
        	 svg.append("g")
             .selectAll("rect")
             .data(data)
             .join("rect")
             .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
             .attr("fill", function(d,i) { return colors[i]})
             .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
         	 .on("mouseover", function(d){
         		$populationDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm," 가구", numberFormat(d.dt), " 가구", tool, -20, -100);//20201028 박은식 띄어쓰기 추가//20201120 박은식 number format 변경
         		$populationDash.ui.chartMouseOver($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
         	 })
         	 .on("click", function(d){
         	 	//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
         		if($totSurvMain.ui.selectedLevel != "2"){//20210217 박은식 조회 level 변경
	         		$totSurvMain.ui.chartTarget = target
	        		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	        		$totSurvMain.ui.chartData = d;
	        		$totSurvMain.ui.chartColor = "#576574";
	        		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년  다문화 가구-"+d.c1_nm + " 가구";//20201028 박은식 타이틀 변경
         		}
         		//20210217 박은식 시도일때만 조회 가능하도록 처리 START
        	 	else {
        	 		commonTotSurv_alert("시도경계에서 조회가능합니다.", "");
        	 		return;
        	 	}
        	 	//20210217 박은식 시도일때만 조회 가능하도록 처리 END
        		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END
         		
         		srvLogWrite('P0','02','04','05',$totSurvMain.ui.selectedThema,'itm_cd='+d.itm_cd+",region_cd="+d.region_cd+",c1="+d.c1+",surv_id="+d.surv_id);
         		
        		$totSurvMain.ui.tileChangeYn = "N"; //20201014 박은식 resize 일때와 아닐때 모두 포함(기존 미포함)
         		$populationDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
		    })
         	 .on("mouseout", function(){
         		 tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
         		$(this).attr("fill", function(d,i) { return colors[i]})
         		$populationDash.ui.chartMouseOut($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
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
             .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
             .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
             .attr("fill", function(d,i) { return colors[i]})
             .on("click", function(d){
		             //20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
            	 	if($totSurvMain.ui.selectedLevel != "2"){//20210217 박은식 조회 level 변경
		            	$totSurvMain.ui.chartTarget = target
		         		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
		         		$totSurvMain.ui.chartData = d;
		         		$totSurvMain.ui.chartColor = "#576574";
				    	$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년  다문화 가구-"+d.c1_nm + " 가구";//20201028 박은식 타이틀 변경
            	 	} 
            	 	//20210217 박은식 시도일때만 조회 가능하도록 처리 START
            	 	else {
            	 		commonTotSurv_alert("시도경계에서 조회가능합니다.", "");
            	 		return;
            	 	}
            	 	//20210217 박은식 시도일때만 조회 가능하도록 처리 END
					//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END

					srvLogWrite('P0','02','04','05',$totSurvMain.ui.selectedThema,'itm_cd='+d.itm_cd+",region_cd="+d.region_cd+",c1="+d.c1+",surv_id="+d.surv_id);

			    	$totSurvMain.ui.tileChangeYn = "N";
			    	$populationDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
			    })
              .on("mouseover", function(d){
            	  $populationDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm," 가구", numberFormat(d.dt), " 가구", tool, -20, -100);//20201028 박은식 타이틀 변경//20201120 박은식 number format 변경
            	  $populationDash.ui.chartMouseOver($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
         	 })
         	 .on("mouseout", function(){
         		 tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
         		$populationDash.ui.chartMouseOut($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
			 })
             .attr("x", function(d, i){ return x(i) })
             .attr("width", (x.bandwidth()))
             .attr("y", function(d){ return y(0) })
     		.transition()
               .duration(1000) //20201111 박은식 animation 지연시간 변경
               .delay(function (d, i) {
             			return i * 150;//20201111 박은식 animation 지연시간 변경
               })
             .attr("height",  function(d) {return y(0) - y(Number(d.dt)) })
     		.attr("y", function(d){ return y(Number(d.dt)) })
     		.style("cursor", "pointer")
         }
         
  svg.append("g")
	.selectAll("text")
	.data(data)
	.join("text")
	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	//20201028 박은식 클릭이벤트 추가 START
   .on("click", function(d, i){
	   if($totSurvMain.ui.selectedLevel != "3"){
       	$totSurvMain.ui.chartTarget = target
    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
    		$totSurvMain.ui.chartData = d;
    		$totSurvMain.ui.chartColor = "#576574";
	    	$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년  다문화 가구-"+d.c1_nm + " 가구";
 		}
    	$totSurvMain.ui.tileChangeYn = "N";
    	$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
    	$populationDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.chartTitle);
    })
    .attr("cursor", "pointer")
    //20201028 박은식 클릭이벤트 추가 END
	.attr("id", "chartData")
	.attr("text-anchor", "middle")
	.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
	.attr("y", function(d) { return y(Number(d.dt))-10 })
	.text( function(d){ return numberFormat(d.dt) })//20201120 박은식 number format 변경



    svg.append("g")
     .attr("style", "color:#878A89; font-size:12px;") // 2020.11.02[신예리] 폰트 사이즈 변경v
     .call(xAxis);

  svg.append("g")
  	  .attr("style", "color:#878A89; font-size:12px;") // 2020.11.02[신예리] 폰트 사이즈 변경
      .call(yAxis);
	$("#"+target+"").find("line").remove();
	$("#"+target+"").find("text").attr("style", "color:#878A89")
	$("#"+target+"").find("path").attr("style", "color:#878A89")

}

/**
 * @name         : genderPieChart 
 * @description  : 내국인, 외국인 차트 세팅
 * @date         : 2020.08.06
 * @author	     : esPark
 * @history 	 : 
 */
function genderPieChart(data, target, resizeYn, height){
	if(target == "local_people1"){
		$("#local_people1").empty(); // 내국인 차트 초기화
		$populationDash.localPopleData = data;
		$("#localMales").text(data[0].dt.replace(/\B(?=(\d{3})+(?!\d))/g,",")+"명")
		$("#localFemales").text(data[1].dt.replace(/\B(?=(\d{3})+(?!\d))/g,",")+"명")
	} else{
		$("#foreigner_people1").empty(); // 외국인 차트 초기화
		$populationDash.foreignerData = data;
		$("#foreignMales").text(data[0].dt.replace(/\B(?=(\d{3})+(?!\d))/g,",")+"명")
		$("#foreignFemales").text(data[1].dt.replace(/\B(?=(\d{3})+(?!\d))/g,",")+"명")
	}
	
	var colors = ["#21AEF1","#FE5959"];
	var colorsOver = ["#177CA0","#BC5757"];

	//var tool = d3.select("body").append("div").attr("class", "chartCommontoolTip");
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	
	let margin =  {
		  top: 0,
		  right: 10,
		  bottom: 10,
		  left: 10,
		}
	let width = 0;
	if($("#localDiv").outerWidth() <= 500){
		width = $("#localDiv").outerWidth()/1.2;
	}else{
		width = 500/1.2;
	}
	
	
	  let radius = Math.min(width, height) / 1.68;
	  let chart = d3.select("#"+target)
	  let svg = chart.append("svg")
	  				 .attr("width",160) // 2020-11-02 [신예리] 파이차트 width 변경
	  				 .attr("height",height)
	  let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
	  
	  let totals = data.map(function(element){ return element.dt });
	  let grandTotal = totals.reduce(function(a, b){ return Number(a) + Number(b) });
	  
	  let arc = d3.arc()
	  	.outerRadius(radius - 25)
	  	.innerRadius(1.5);
	  
	  let labelArc = d3.arc()
	  	.outerRadius(radius - 54)
	  	.innerRadius(radius - 54);
	  
	  let pie = d3.pie()
	  	.sort(function(a, b){ return d3.ascending(a, b) })
	  	.value(function(d){ return d.dt })
	  	.padAngle(0.01);
	  
	  let arcGroup = svg.append("g")
	  	.attr("class", "arc-group")
	  	.attr("transform", 'translate('+(width/3.5 - margin.left - margin.right)+','+(height/2 + margin.top + margin.bottom)+')'); // 2020-10-06 [곽제욱] 차트 trasnform 수치 변경
	  
	  let arcs = arcGroup.selectAll(".arc")
	  	.data(pie(data)).enter()
	  	.append("g")
	  	.attr("class", "arc");
	  
	  //20201027 박은식 리사이즈 로직 추가 START
	  if(resizeYn == "Y"){
		  arcs.append("path")
		    .attr("class", "eventGroup")
		    .on("mouseover", function(d, i){
		    	$populationDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.data.itm_nm.replace("(명)", ""),"인구", d.data.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), "명", tool, -20, -100);//20201028 박은식 타이틀 변경
	        	$populationDash.ui.chartMouseOver($(this), "#576574");
		  	})
		  	.on("mouseout", function(d, i){
		  		tool.css("display", "none") /** 2020-10-07 [곽제욱] 툴팁 수정 */
		  		$populationDash.ui.chartMouseOut($(this), "#576574");
		  	})
		  	.on("mousedown", function(d,i){
		  		if($totSurvMain.ui.selectedLevel != "3"){
			  		$totSurvMain.ui.chartTarget = target
		    		$totSurvMain.ui.chartIndex = $(this).parent().index()
		    		$totSurvMain.ui.chartData = d;
		    		$totSurvMain.ui.chartColor = "#576574";
		    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.data.itm_nm.replace("(명)", "");//20201028 박은식 타이틀 변경
		  		}

				if( d.data.itm_cd == "T131" || d.data.itm_cd == "T132" ){
					srvLogWrite('P0','02','04','01',$totSurvMain.ui.selectedThema,'itm_cd='+d.data.itm_cd+",region_cd="+d.data.region_cd+",rank="+d.data.rank+",surv_id="+d.data.surv_id);
				} else if( d.data.itm_cd == "T141" || d.data.itm_cd == "T142" ){
					srvLogWrite('P0','02','04','02',$totSurvMain.ui.selectedThema,'itm_cd='+d.data.itm_cd+",region_cd="+d.data.region_cd+",rank="+d.data.rank+",surv_id="+d.data.surv_id);
				}

		  		$populationDash.ui.chartItmClick($(this), d.data, "#576574",$totSurvMain.ui.chartTitle); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경//20201028 박은식 타이틀 변경
		  	})
		    .attr("fill", function(d,i){ return colors[i]})
		  	.style("cursor", "pointer")
		  	.attr("d", arc);
	    //20201027 박은식 리사이즈 로직 추가 START
	  } else {
		  arcs.append("path")
		    //.attr("d", arc)// 20201027 박은식 애니메이션 처리를 위해 위치이동
		    .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
		    .on("mouseover", function(d, i){
		    	$populationDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.data.itm_nm,"인구", d.data.dt.replace(/\B(?=(\d{3})+(?!\d))/g,","), "명", tool, -20, -100);
	
				//20201014 박은식 주석처리 START
	//	    	if($totSurvMap.ui.chartToggleYn=="N"){
	//        		$totSurvMain.ui.selectedTempColor = $(this).attr("fill");        		
	//        	}
	//        	// 차트 mouseOut 시 리턴하기 위한 over항목 색 저장
	//        	$totSurvMain.ui.tempColor = $(this).attr("fill");
	//        	if($totSurvMap.ui.selectedObj[0] != $(this)[0]){ 
	//        		$(this).attr("fill", colorsOver[i]);
	//        	}
				//20201014 박은식 주석처리 END
	        	$populationDash.ui.chartMouseOver($(this), "#576574");
		  	})
		  	.on("mouseout", function(d, i){
		  		tool.css("display", "none") /** 2020-10-07 [곽제욱] 툴팁 수정 */
		  		//20201014 박은식 주석처리 START
	//	  		if($totSurvMap.ui.selectedObj[0] != $(this)[0]){
	//	    		if($totSurvMap.ui.chartToggleYn == "Y"){
	//	    			$(this).attr("fill", $totSurvMain.ui.tempColor);
	//	    		} else {
	//	    			$(this).attr("fill", $totSurvMain.ui.selectedTempColor);
	//	    		}
	//	    	} else if($totSurvMap.ui.selectedObj[0] == $(this)[0]){
	//	    		$(this).attr("fill", "#576574");
	//	    	}   
		  		//20201014 박은식 주석처리 END
		  		$populationDash.ui.chartMouseOut($(this), "#576574");
		  	})
		  	.on("mousedown", function(d,i){ // 20201014 박은식 파라메터 추가
			  	//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
		  		if($totSurvMain.ui.selectedLevel != "3"){
			  		$totSurvMain.ui.chartTarget = target
		    		$totSurvMain.ui.chartIndex = $(this).parent().index() // 20201014 박은식 인덱스 수정
		    		$totSurvMain.ui.chartData = d;
		    		$totSurvMain.ui.chartColor = "#576574";
		    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.data.itm_nm.replace("(명)", "");//20201028 박은식 타이틀 변경
		  		}
        if( d.data.itm_cd == "T131" || d.data.itm_cd == "T132" ){
	  			srvLogWrite('P0','02','04','01',$totSurvMain.ui.selectedThema,'itm_cd='+d.data.itm_cd+",region_cd="+d.data.region_cd+",rank="+d.data.rank+",surv_id="+d.data.surv_id);
	  		} else if( d.data.itm_cd == "T141" || d.data.itm_cd == "T142" ){
	  			srvLogWrite('P0','02','04','02',$totSurvMain.ui.selectedThema,'itm_cd='+d.data.itm_cd+",region_cd="+d.data.region_cd+",rank="+d.data.rank+",surv_id="+d.data.surv_id);
	  		}
				//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END
		  		$populationDash.ui.chartItmClick($(this), d.data, "#576574",$totSurvMain.ui.chartTitle); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경//20201028 박은식 타이틀 변경
		  	})
		    .attr("fill", function(d,i){ return colors[i]})
		  	.style("cursor", "pointer")// 2020-10-22 [신예리] 커서 추가
		  	//20201027 박은식 애니메이션 로직 추가 START
		  	.transition()
		    .duration(500) // 20201111 박은식 animation 로드 시간 변경
		    .delay(function(d, i) {
		        return i * 150;// 20201111 박은식 animation 로드 시간 변경
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
		  //20201027 박은식 애니메이션 로직 추가 END
	  }
	  
	  let legendPadding = 5;
	  let legendBox = svg.append("g")
	  	.attr("class", "legend-group")
	  	.attr("transform", 'translate('+(width/2+radius)+', '+((3/4) * radius)+')');
	  
	  let legend = legendBox.selectAll(".legend")
	  	.data(data).enter()
	  	.append("g")
	  	.attr("class", "legend")
	  	.attr("transform", function(d, i){ return 'translate(0,'+(i * 20 + 206)+')' });
	  
	  let displacement = "0.4em"
	  /*20201021 박은식 pieChart 비정상적인 circle 제거  START*/
//	  legend.append("circle")
//	    .attr("class", "legend-color")
//	    .attr("r", displacement)
//	    .attr("fill", function(d,i){ return colors[i]}); 
	  /*20201021 박은식 pieChart 비정상적인 circle 제거  END*/	  
	  arcs.append("text")
	    .attr("transform", function(d){ return 'translate('+labelArc.centroid(d)+')' })
	    .attr("style", "pointer-events: none;")//20201020 박은식 텍스트 인식되어 event 작동이 안되는 현상 처리
	    .attr("dy", ".35em")
	    .attr("fill","#fff")
	    .style("font", "12px NanumSquare") // 2020.10.28[신예리] 폰트 사이즈 변경
	    .style("font-weight", "700")
	    .style("text-anchor", "middle")
	    .text(function(d, i){ return ((totals[i] / grandTotal) * 100).toFixed(2)+'%' });
	  
	  svg.append("text")
	  	  .attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
	      .attr("x", width/2)				
	      .attr("y", 30)
	      .style("text-anchor", "middle")
	      .style("font", "14px sans-serif")
	      .text(data.itm_cd);
}

/*********** Kosis Detail Option for SearchList Sub Start **********/
(function() {
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
						$populationDash.obj_var_id = result.kosis_detail_option[0].obj_var_id;
						$populationDash.field_id = result.kosis_detail_option[0].field_id;
						
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
				$populationDash.kosis_result_data = [];
				$populationDash.kosis_result_data = result;
				
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
