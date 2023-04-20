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
	W.$forestryDash = W.$forestryDash || {};
	
	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$forestryDash.isDev = true;
	/* 공공데이터 조회 변수*/
	$forestryDash.org_id = "";
	$forestryDash.tbl_id = "";
	$forestryDash.kosis_data_item = "";
	$forestryDash.kosis_data_period = "";
	$forestryDash.kosis_data_year = "";
	$forestryDash.gis_se = "";
	$forestryDash.obj_var_id = "";
	$forestryDash.field_id = "";
	$forestryDash.kosis_data_item_detail = "";
	
	$forestryDash.kosis_result_data = [];
	$forestryDash.highcharts = [];
	//현재 그려진 d3의 데이터를 담는 변수
	$forestryDash.forestryMngmtAge = {};
	$forestryDash.forestryMngmtCareerPd = {};
	$forestryDash.forestrySale = {};
	$forestryDash.businessChart = {};
	$forestryDash.plumbingForestryChart = {};
	$forestryDash.fsrcsCtvtCropsForestry_0 = {}; // 2020-11-17 [곽제욱] 전체 그룹핑 변수 추가
	$forestryDash.fsrcsCtvtCropsForestry_1 = {};
	$forestryDash.fsrcsCtvtCropsForestry_2 = {};
	$forestryDash.fsrcsCtvtCropsForestry_3 = {};
	$forestryDash.fsrcsCtvtCropsForestry_4 = {};
	$forestryDash.fsrcsCtvtCropsForestry_5 = {};
	//현재 그려진 d3의 데이터를 담는 변수
	
	$forestryDash.mulType = "";//20201117 박은식 임산물 재배 작물별 임가 차트유지 변수
	//현재 조회하고있는 rank 지역 level
	$forestryDash.regionLevel = 'sido';
	//행정시도 정보를 담아둔다
	$forestryDash.atdrc = '';	
	//비자치구에서 행정시로 이동여부
	$forestryDash.upperBack = false;
//	$forestryDash.noReverseGeoCode = true;
	
	$(document).ready(function() {
		
		
	});
	
	//d3 반응형 이벤트
	$(window).resize( function(){
		if($totSurvMain.ui.pageIndex == '5'){
			if($(".mapExport").hasClass('on')){
				$(".map-col-SubL").width($(window).width()-430);
				$(".map-col-SubL").height("825px"); 
				
				// 최초지도
				$("#worldMap").width("1480px");
				$("#worldMap").height("800px"); 
								
				$("#mapArea").width($(window).width()-430);
				$("#mapArea").height("800px"); 
				
				// 맵 사이즈
				$('#mapRgn_forestry').width($(window).width()-430);
				$('#mapRgn_forestry').height("800px");
			} else {
				// 임산물 재배 작물별 임가
				//20201119 박은식 data 없을 경우 이미지 표출 START
				var moveHtml = "";
				var imgH = "";
				moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
				moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px;'>";
				moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
				moveHtml += "</div>";
				// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 START
				if($("#fsrcsCtvtCropsForestry_0").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_0.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_0, "fsrcsCtvtCropsForestry", "Y", "220");
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_1").hasClass("on")){
				// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 END
					if($forestryDash.fsrcsCtvtCropsForestry_1.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_1, "fsrcsCtvtCropsForestry", "Y", "220");
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}							
				} else if($("#fsrcsCtvtCropsForestry_2").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_2.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_2, "fsrcsCtvtCropsForestry", "Y", "220");
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_3").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_3.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_3, "fsrcsCtvtCropsForestry", "Y", "220");
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_4").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_4.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_4, "fsrcsCtvtCropsForestry", "Y", "220");
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_5").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_5.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_5, "fsrcsCtvtCropsForestry", "Y", "220");
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				}
				//20201119 박은식 data 없을 경우 이미지 표출 END
				// 경영주 임업 경력기간별 임가
				setForestryMngmtCareerPdChart($forestryDash.forestryMngmtCareerPd, "forestryMngmtCareerPd", "Y", "135");
										
				setForestryMngmtAgeChart($forestryDash.forestryMngmtAge, "forestryMngmtAge", "Y", "140"); //2020.10.28[신예리] 높이 변경
				
				//function radialForestryChart(data, target, resizeYn, p_height){
				radialForestryChart($forestryDash.businessChart, "", "Y");
				
				if($totSurvMain.ui.selectedArea.length == 2){
					fsrcsSleAmountChart($forestryDash.plumbingForestryChart, 'Y', 280);
				} 
			}
		}
		if($totSurvMain.ui.chartTarget != ""
			&& typeof($totSurvMain.ui.chartIndex) == "number"
			&& $totSurvMain.ui.chartColor != ""){
			 
			$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
		}
	});
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {});

	$forestryDash.const = {},
	
	$forestryDash.ui = {
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
			$totSurvMap.ui.selectedSurvId = "DT_1FO105";
			$totSurvMap.ui.selectedItmCd = "T00";
			//20201120 박은식 초기화 추가 END
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/forestryDash/main");
		},
		
		ready : function(){
			
			console.log("...... forestryDash ...... ready .........");
			
			$totSurvMain.ui.selectedArea = '00';
			
			if(gv_sido_cd!=null&&gv_sido_cd!=""){
				if(gv_sido_cd == "00") {
					$totSurvMain.ui.selectedLevel = "0";
				} else {
				$totSurvMain.ui.selectedLevel = "1";
				}
				if(gv_sgg_cd!=null&&gv_sgg_cd!=""){
					
					$.ajax({
						method: "POST",
						async: false,	// 반드시 동기처리 해야 함
						url: contextPath + "/ServiceAPI/totSurv/common/getAtdrcCheck.json",
					    data: {year:$totSurvMain.ui.selectedYear, region_cd:gv_sido_cd+gv_sgg_cd.substring(0,2)+"0"},
						dataType: "json",
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							console.log("################# res = " + res.result.rslt);
							$totSurvMap.ui.isAtdrc = res.result.rslt;
						}
					});
					
					$totSurvMain.ui.selectedLevel = "2";
					//$totSurvMain.ui.getSidoSggPos(gv_sido_cd+gv_sgg_cd);
					$totSurvMap.ui.mapToggleId = gv_sido_cd+gv_sgg_cd;
					$totSurvMain.ui.getSidoSggPos(gv_sido_cd+gv_sgg_cd);
					$("#dash_sido").val(gv_sido_cd);
				} else {
					$totSurvMain.ui.getSidoSggPos(gv_sido_cd);
				}
				
				$totSurvMain.ui.selectedArea = gv_sido_cd + gv_sgg_cd;
			} 
			
			if($totSurvMain.ui.selectedYear == "2010"){
				$totSurvMap.ui.selectedSurvId = "FS0532";								    				
			} else if($totSurvMain.ui.selectedYear == "2015"){
				$totSurvMap.ui.selectedSurvId = "FS0235";
			} else{
				$totSurvMap.ui.selectedSurvId = "FS0607";
			}

			
			$totSurvMap.ui.selectedItmCd = "T00";
			$totSurvMap.ui.selectedC1    = "000";
			
			
			$.ajax({
				method: "POST",
				async: false,	
				url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvRegionCount.json",
				data: { year: $totSurvMain.ui.selectedYear, region_cd : $totSurvMain.ui.selectedArea, surv_id : $totSurvMap.ui.selectedSurvId, itm_cd : $totSurvMap.ui.selectedItmCd, c1 : $totSurvMap.ui.selectedC1, isAtdrc:$totSurvMap.ui.isAtdrc, thema:"population"}, // 
				dataType: "json",
				success: function(res) {
					$totSurvMain.ui.sidoMaxRank = res.result.maxRank[0].cnt;
					$totSurvMain.ui.sggEmdongMaxRank = res.result.maxRank[1].cnt;
					// 행정자치시(수원시 등) 랭킹 
					$totSurvMain.ui.atdrcRank = res.result.maxRank[2].cnt;
				},
				error: function(e) {
					alert('failed');
				},
				complete : function(e){
					
				}
			});
			
			$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
		},
		
		/**
		 * @name         : clear
		 * @description  : 인구총조사 depth 변화시마다 화면 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		clear : function(){
			/*
			*/
			//20201120 박은식 초기화 추가 START
			$totSurvMain.ui.chartSaveClear();
			$totSurvMap.ui.selectedSurvId = "FS0235";
			$totSurvMap.ui.selectedItmCd = "T00";
			//20201120 박은식 초기화 추가 END
		},
		
		drawContent : function(surv_id, itm_cd, c1, c2, c3){
			if(surv_id == null|| surv_id == "" || surv_id == undefined || surv_id == "PH0001"){/*||  || surv_id != "FS0532"*/
				if($totSurvMain.ui.selectedYear == "2015"){
					$totSurvMap.ui.selectedSurvId = "DT_1FO15105"; // 인구같은경우 디폴트
				} else {
					$totSurvMap.ui.selectedSurvId = "DT_1FO105"; // 인구같은경우 디폴트
				}
			} else {
				$totSurvMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트
			}
			
			if(itm_cd==null||itm_cd==""||itm_cd==undefined || itm_cd == "T100"){
				$totSurvMap.ui.selectedItmCd = "T00";
			} else {
				$totSurvMap.ui.selectedItmCd = itm_cd;
			}
			if(c1 == null || c1=="" || c1==undefined ){
				$totSurvMap.ui.selectedC1 = "000";
			} else {
				$totSurvMap.ui.selectedC1 = c1;
			}
			
			
			$totSurvMap.ui.selectedC2 = c2;
			
			if($totSurvMain.ui.selectedArea.length==2){
				$totSurvMapnoReverseGeoCode = true;
				if($totSurvMap.ui.map==null || $("#mapRgn_forestry").html() == ""){ // 20201104 박은식 같은 대시보드 매뉴를 다시 클릭시 맵을 다시그려주기 위해 조건문 추가
					$("#mapRgn_forestry").show();
					$totSurvMap.ui.createMap("mapRgn_forestry", 0);
					$("#mapRgn_forestry").css("height", "590px");
				}
				
				if($totSurvMain.ui.selectedArea == "00"){
					$totSurvMap.ui.drawMapData("sido", "color"); // 맵 그리기
				
				} else if($totSurvMap.ui.mapToggleId != ""){
					$totSurvMap.ui.drawMapData("sido", "color"); // 맵 그리기
				} else {
					$totSurvMap.ui.drawMapData("sgg", "color"); // 맵					
				}
				
			} else {
				if($totSurvMap.ui.map==null){
					$("#worldMap").hide();
					$("#mapRgn_forestry").show();
					$totSurvMap.ui.createMap("mapRgn_forestry", 0);
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
			$("#grid_lg_color_0").attr("data-color", "#4F7001").attr("start-color", "#D4D05D").text("#4F7001").css("background", "#4F7001");
			//20202124 박은식 범례 추가 END
		},
		
		// 총조사 시각화 정보 조회
		searchTotSurvInfo : function(survId){
			
			if(survId == null) survId = ($totSurvMain.ui.selectedYear == "2015") ? "DT_1FO15105" : "DT_1FO105";

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
						$forestryDash.ui.totSurvInfoData = totSurvInfo;
						
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
			
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 START
			if(regionCd.length == 5){
				$totSurvMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
			}
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 END
			
			/**행정시 처리 로직 (테스트)*/
			if($totSurvMap.ui.isAtdrc || $("#forestry_rank").attr('max') == $totSurvMain.ui.atdrcRank){
				//현재 행정시도정보를 저장한다. 
				//비자치구와 행정시의 4자리수까지는 같다는 점을 이용한다
				$forestryDash.atdrc = $totSurvMain.ui.selectedArea.substring(4,0);
			}
			
			/**행정시 처리 로직 (테스트)*/
			var level = 'sido';

			if($totSurvMain.ui.selectedArea.length == 2){ // 2020-10-14 [박은식] 랭킹 조회 조건 변경
				lavel = 'sido'
			} else if(($totSurvMain.ui.selectedArea.substring(4) != '0' && $forestryDash.atdrc == $totSurvMain.ui.selectedArea.substring(4,0))){
				level = 'atdrc'// atdrc
			} else {
				level ='sgg'
			}

			var param = {};
			if(regionCd != null && regionCd != ""){
				param = {year : $totSurvMain.ui.selectedYear, regionCd : regionCd, level : level}
			} else if(rank != null && rank != ""){
				srvLogWrite('P0','07','04','02',$totSurvMain.ui.selectedThema,'regionCd='+regionCd+",year="+$totSurvMain.ui.selectedYear+",rank="+rank);
				param = {year : $totSurvMain.ui.selectedYear, rank : rank, level : level}
			} else {
				return;
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
				url: contextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestryRank.json",
				data: param, 
				dataType: "json",
				success: function(res) {
					console.log(res)
					
					var rank =  res.result.forestryHouseRank[0];
					var forestryList = res.result.forestryRatio;
					var oldForestryList = res.result.totOldForestry;
					var forestryHouseList = res.result.forestryHouseRatio;					
					var forestryThisYearData = {};
					var oldForestyThisYearData = {};
					var forestryHouseThisYearData ={};
					var forestryRatio = 0;
					var forestryIncOrDec = 0;
					var oldForestyRatio = 0;
					var forestryHouseRatio = 0;					
					var tempForestryThisYearData = {};
					var tempForestryBeforeYearData = {};
					var tempOldForestyThisYearData = {};
					var tempOldForestyBeforeYearData = {};
					var tempForestryHouseThisYearData = {};
					var tempForestryHouseBeforeYearData = {};
					
					// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 START
					var forestryHouseHoldList = res.result.forestryHouseHoldRatio;
					var forestryHouseHoldRatio = 0;
					var tempForestryHouseHoldThisYearData = {};
					var tempForestryHouseHoldBeforeYearData = {};
					// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 END
					
					if($totSurvMain.ui.selectedYear == '2010'){
						tempForestryThisYearData = forestryList[0];
						tempOldForestyThisYearData = oldForestryList[0];
						tempForestryHouseThisYearData = forestryHouseList[0];
						// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 START
						tempForestryHouseHoldBeforeYearData = forestryHouseHoldList[0];
						// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 END
					} else {
						for(var j = 0; j < forestryList.length; j++){
							if(forestryList[j].surv_year == $totSurvMain.ui.selectedYear){
								tempForestryThisYearData = forestryList[j];
							}
							if(oldForestryList[j].surv_year == $totSurvMain.ui.selectedYear){
								tempOldForestyThisYearData = oldForestryList[j];
							}
							if(forestryHouseList[j].surv_year == $totSurvMain.ui.selectedYear){
								tempForestryHouseThisYearData = forestryHouseList[j];
							}							
							if(forestryList[j].surv_year == $totSurvMain.ui.selectedYear-5){
								tempForestryBeforeYearData = forestryList[j];
							}
							if(oldForestryList[j].surv_year == $totSurvMain.ui.selectedYear-5){
								tempOldForestyBeforeYearData = oldForestryList[j];
							}
							if(forestryHouseList[j].surv_year == $totSurvMain.ui.selectedYear-5){
								tempForestryHouseBeforeYearData = forestryHouseList[j];
							}
							// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 START
							if(forestryHouseHoldList[j].surv_year == $totSurvMain.ui.selectedYear){
								tempForestryHouseHoldThisYearData = forestryHouseHoldList[j];
							}
							if(forestryHouseHoldList[j].surv_year == $totSurvMain.ui.selectedYear-5){
								tempForestryHouseHoldBeforeYearData = forestryHouseHoldList[j];
							}
							// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 END
						}
						forestryRatio = forestryRatioCalculation(tempForestryThisYearData.dt, tempForestryBeforeYearData.dt);
						forestryHouseRatio = forestryRatioCalculation(tempForestryHouseThisYearData.dt, tempForestryHouseBeforeYearData.dt);
						// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 START
						forestryHouseHoldRatio = forestryRatioCalculation(tempForestryHouseHoldThisYearData.dt, tempForestryHouseHoldBeforeYearData.dt);
						// 2021-08-02 [이영호] 임업 인구수에서 가구수로 변경 END
					}
					/**슬라이드에 사용될 데이터 */
					/**
					forestryRatio -> 총인구 증감
					oldForestyRatio -> 고령인구 증감
					forestryHouseRatio -> 가구증감
					tempForestryThisYearData -> 총인구 데이터
					tempOldForestyThisYearData -> 고령데이터
					tempForestryHouseThisYearData -> 가구데이터
					*/
					/**슬라이드에 사용될 데이터 */
					
					/**range value setting */
					
					
					var region_cd = rank.region_cd;
					// 2020-12-01 [곽제욱] 지역 선택시 locationPath 지정 START
					if(region_cd != "00"){
						if(region_cd.length==2){
							$totSurvMain.ui.pathChange("sgg", region_cd);
						} else {
							if(region_cd.substring(4,5)=="0"){
								$totSurvMain.ui.pathChange("atdrc", region_cd);
							} else {
								$totSurvMain.ui.pathChange("emdong", region_cd);
							}
						}
					}
					// 2020-12-01 [곽제욱] 지역 선택시 locationPath 지정 END

					// 2020-11-24 [곽제욱] 랭크이동시 지역명 변경 추가 START
					if(regionCd==""||regionCd==null){
						$totSurvMain.ui.titleChange(region_cd);
					}
					// 2020-11-24 [곽제욱] 랭크이동시 지역명 변경 추가 END
					
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
						$forestryDash.ui.clear();
						
						/** chart renderer */
						if(region_cd.length == 2){
				    		$("#dash_sido option[value='"+region_cd+"']").attr("selected", "true");
				    		if(region_cd != '00' && region_cd != '99'){
				    			$("#dash_sgg option[value='999']").attr("selected", "true");
				    		}
				    		$totSurvMain.ui.tileChangeYn = "Y"; 
				    		$totSurvMain.ui.selectedLevel = "1";
				    		$forestryDash.event.allChange(region_cd, "1");
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
				    			$forestryDash.event.allChange(region_cd, "1");
				    		}
				    		/** 2020-09-21 [곽제욱] 비자치구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    		else{
				    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 START */
				    			$totSurvMap.ui.mapToggleId = ""; //2020-10-14 [곽제욱] 자치구 이동관련하여 토글아이디 초기화 
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			console.log("#########################   비자치구 클릭됨     ##############");
				    			$forestryDash.event.allChange(region_cd, "1");
				    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 END */
				    		}
				    	}
					}
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						$forestryDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,rank.rank, $totSurvMap.ui.mapToggleId);
					} else {
						$forestryDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,'0', '');
					}
					//비자치구 일 경우 행정시도로 이동하는 로직
					if($forestryDash.upperBack == true){
						$totSurvMap.ui.checkIsAtdrc(region_cd);	
						$totSurvMain.ui.selectedArea = region_cd
						$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
						$totSurvMap.ui.mapRegion = "sgg";
						$forestryDash.event.allChange(region_cd,"1")
					}

					/**슬라이드에 사용될 데이터 */
					$("#totalForestry > h1").text(numberFormat(tempForestryThisYearData.dt))
					$("#oldForestryRt").text(numberFormat(tempOldForestyThisYearData.dt))
					$("#forestryHouseDt").text(numberFormat(tempForestryHouseThisYearData.dt))
					
					var forestryUpDownCheck = "";
					var oldForestryUpDownCheck = "";
					var forestryHouseUpDownCheck = "";
					
					oldForestyRatio = (tempOldForestyThisYearData.dt/tempForestryThisYearData.dt*100).toFixed(2);
					oldForestryUpDownCheck = "총 임가 인구 중 <span class='stats_normal bold'>" +((isNaN(oldForestyRatio)) ? 0 : oldForestyRatio)+" % </span><span class='stats_up'></span>"; //20201201 박은식 NaN 처리 추가
					
					// 2021-08-05 [이영호] 임업 임가현황 인구수에서 가구수로 변경 START
					if(forestryHouseHoldRatio != "" && forestryHouseHoldRatio != null && forestryHouseHoldRatio != undefined){
						forestryIncOrDec = numberFormat(tempForestryHouseHoldThisYearData.dt - tempForestryHouseHoldBeforeYearData.dt);
						if(parseFloat(forestryHouseHoldRatio) > 0){
							forestryUpDownCheck = "전주기 대비 <span class='stats_up bold'>" +forestryHouseHoldRatio+" % </span><span class='stats_up'>▲</span>";
						} else if(parseFloat(forestryHouseHoldRatio) < 0){
							forestryUpDownCheck = "전주기 대비 <span class='stats_down bold'>" +forestryHouseHoldRatio.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
						} else {
							forestryUpDownCheck = "<span class='stats_normal bold'>" +forestryHouseHoldRatio+" % </span><span class='stats_normal'>-</span>";
						}
					} 
					// 2021-08-05 [이영호] 임업 임가현황 인구수에서 가구수로 변경 END
					 else {
						forestryIncOrDec = "-";
						forestryUpDownCheck = "증감율 데이터 없음"
					}
					if(forestryHouseRatio != "" && forestryHouseRatio != null && forestryHouseRatio != undefined){
						if(parseFloat(forestryHouseRatio) > 0){
							forestryHouseUpDownCheck = "전주기 대비 <span class='stats_up bold'>" +forestryHouseRatio+" % </span><span class='stats_up'>▲</span>";
						} else if(parseFloat(forestryHouseRatio) < 0){
							forestryHouseUpDownCheck ="전주기 대비 <span class='stats_down bold'>" +forestryHouseRatio.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
						} else {
							forestryHouseUpDownCheck = "<span class='stats_normal bold'>" +forestryHouseRatio+" % </span><span class='stats_normal'>-</span>";
						}
					} else {
						forestryHouseUpDownCheck = "증감율 데이터 없음"
					}
					if($totSurvMain.ui.selectedYear == "2010"){
						forestryUpDownCheck = "증감율 데이터 없음"
						forestryHouseUpDownCheck = "증감율 데이터 없음"
					}
					if(parseFloat(forestryIncOrDec) > 0){
						upDownCheck2 = "<h1 class='stats_up bold'>"+numberFormat(forestryIncOrDec)+"</h1><span class='ml5 stats_up'>가구 증가</span>";									
					} else if(parseFloat(forestryIncOrDec) < 0){
						upDownCheck2 = "<h1 class='stats_down bold'>"+numberFormat(forestryIncOrDec.replace("-", ""))+"</h1><span class='ml5 stats_down'>가구 감소</span>";
					} 
					//20201201 박은식 NaN 처리 추가 START
					else if(isNaN(forestryIncOrDec)){
						upDownCheck2 = "<h1 class='stats_normal bold'> - </h1><span class='ml5 stats_normal'>가구 유지</span>";
					//20201201 박은식 NaN 처리 추가 END
					} else {
						upDownCheck2 = "<h1 class='stats_normal bold'>"+numberFormat(forestryIncOrDec)+"</h1><span class='ml5 stats_normal'>가구 유지</span>";
					}
					$("#totalForestry").html(upDownCheck2);
					//$("#forestryRank").html(forestryIncOrDec);
					$("#forestryChangeRt").html(forestryUpDownCheck)
					$("#oldForestryChangeRt").html(oldForestryUpDownCheck)
					$("#forestryHouseChangeRt").html(forestryHouseUpDownCheck)
				},
				error: function(){
					
				}
			})
			$forestryDash.upperBack = false;
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
		 * @parameter	 regionCd	: 지역 code
		 * 				 totalRank	: 총인구 rank
		 * 				 genderRank : 남녀 성비 rank
		 * 				 foreignRank: 외국인 rank
		 */
		rankSlideRender : function(regionCd, forestryHouseRank, toggleId){
			$totSurvMain.ui.tileChangeYn = "Y";
			$("#forestry_range").show();
			$("#oldForestry_range").show();
			$("#forestryHouse_range").show();
			// 시도이동, 시군구이동의 경우
			if($totSurvMain.ui.selectedArea.length == 2){	// 2020-10-14 [주형식] 시도 비교 로직 수정
				// 그중 시군구 이동(지도에는 시군구 레벨로 표출, 선택지역 하이라이트 처리)
				if(toggleId.length == 5){
					$forestryDash.regionLevel = 'sgg'
					$("#forestryHouse_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#forestryHouse_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$totSurvMap.ui.mapToggleId = toggleId;
					$forestryDash.event.allChange(toggleId, "2");
				} else {
					$forestryDash.regionLevel = 'sido'
					$("#forestryHouse_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#forestryHouse_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
				}
			} else if($totSurvMain.ui.selectedArea.substring(4) != '0' ) { // 2020-10-14 [곽제욱] 비자치구 체크조건 수정
				if($totSurvMain.ui.atdrcRank != 0) {
					$forestryDash.regionLevel = 'atdrc'
					$("#forestryHouse_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#forestryHouse_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
				} else {
					$("#forestryHouse_range").hide();
				}
			} else if($("#forestry_rank").attr("max") != $totSurvMain.ui.atdrcRank || $forestryDash.upperBack == false){ //20201013 박은식 $forestryDash.upperBack 조건이 false 일때로 변경 (비자치구에서 나온경우)
				$forestryDash.regionLevel = 'sgg'
				$("#forestryHouse_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#forestryHouse_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 START
			} else {
				$forestryDash.regionLevel = 'sgg'
				$("#forestryHouse_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#forestryHouse_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			}
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 END
			$("#forestryHouse_rank").val(forestryHouseRank);
			$("#forestryHouse_range").find("span").eq(2).text(/*$("#forestryHouse_rank").val()*/forestryHouseRank+"번째");
			$("#forestryHouse_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#forestryHouse_rank").attr("max")-1))*($("#forestryHouse_rank").val()-1)) + '%, #fff ' + ((100/($("#forestryHouse_rank").attr("max")-1))*($("#forestryHouse_rank").val()-1)) + '%, white 100%)');
			
			if($totSurvMain.ui.selectedArea.length == 2){
				var areaTitle = $("#dash_sido option:selected").html();
				$("#forestryRanking").html(areaTitle +" 전주기 대비 임가 수");
				$("#forestryRanking").parent().find(".moreInfoBtn").show();
				$("#oldForestryRanking").html(areaTitle + " 임가 인구 중 고령 인구");
				$("#forestryHouseRanking").html(areaTitle + " 임가 인구");
			}else if($totSurvMain.ui.selectedArea.length == 5){
				var areaTitle = $("#dash_sgg option:selected").html();
				$("#forestryRanking").parent().find(".moreInfoBtn").show();
				if($forestryDash.regionLevel == 'atdrc'){
					$("#forestryRanking").html(areaTitle +" 전주기 대비 임가 수");
				} else {
					$("#forestryRanking").html(areaTitle +" 전주기 대비 임가 수");
				}
				$("#oldForestryRanking").html(areaTitle + " 임가 인구 중 고령 인구");
				$("#forestryHouseRanking").html(areaTitle + "  임가 인구");
			} 
			if($totSurvMain.ui.selectedArea == "00" || $totSurvMain.ui.selectedArea == "99" || $totSurvMain.ui.selectedArea == ""){
				$("#forestryRanking").html("전국  전주기 대비 임가 수");
				$("#oldForestryRanking").html("전국 임가 인구 중 고령 인구");
				$("#forestryHouseRanking").html("전국  임가 인구");
				$("#forestryHouse_range").hide();
			}
			$("#rangeV3").find('span').eq(0).text($("#forestryHouse_rank").val()+"번");
			
			$("#rangeV3").offset({left:133+((100/($("#forestryHouse_rank").attr("max")-1))*($("#forestryHouse_rank").val()-1)/100*($("#forestryHouse_rank").outerWidth()-20)), top:$("#forestryHouse_rank").offset().top-30}) // 843
			$("#totForestryNumber").html("임가 인구 - " + areaTitle);
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
			$forestryDash.ui.rankSlideRender("00",0, "");
			
			
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
		chartMouseOver : function(obj, color, text){
			// 차트선택여부가 N일 경우에만 선택항목 색 저장
        	if($totSurvMap.ui.chartToggleYn=="N"){
        		if(text == undefined || text == null || text == ""){
        			$totSurvMain.ui.selectedTempColor = obj.attr("fill");
        		} else {
        			$totSurvMain.ui.selectedTempColor = obj.attr("stroke");
        		}
        	}
        	// 차트 mouseOut 시 리턴하기 위한 over항목 색 저장
        	if(text == undefined || text == null || text == ""){
        		$totSurvMain.ui.tempColor = obj.attr("fill");
            	obj.attr("fill", color);
        	} else {
        		$totSurvMain.ui.tempColor = obj.attr("stroke");
            	obj.attr("stroke", color);
        	}
        	
		},
		
		/**
		 * 
		 * @name         : chartMouseOut
		 * @description  : 차트 아이템 mouse out 시 함수
		 * @date         : 2020. 09. 21
		 * @author	     : 곽제욱
		 * @history 	 :
		 */
		chartMouseOut : function(obj, color, text){
			if($totSurvMap.ui.selectedObj[0] != obj[0]){
	    		if($totSurvMap.ui.chartToggleYn == "Y"){
	    			if(text == undefined || text == null || text == ""){
	    				obj.attr("fill", $totSurvMain.ui.tempColor);
	    			} else {
	    				obj.attr("stroke", $totSurvMain.ui.tempColor);
	    			}
	    			
	    		} else {
	    			if(text == undefined || text == null || text == ""){
	    				obj.attr("fill", $totSurvMain.ui.selectedTempColor);
	    			} else {
	    				obj.attr("stroke", $totSurvMain.ui.selectedTempColor);
	    			}
	    		}
	    	} else if($totSurvMap.ui.selectedObj == obj){
	    		if(text == undefined || text == null || text == ""){
	    			obj.attr("fill", color);
	    		} else {
	    			obj.attr("stroke", color);
	    		}
	    		
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
		chartItmClick : function(obj, d, color, contents, text, chartType){
			
			var params = 'year='+$totSurvMain.ui.selectedYear+',region_cd='+$totSurvMain.ui.selectedArea.substring(0,4)+"0";
			params+= ',itm_cd='+d.itm_cd+',surv_id='+d.surv_id;
			
			if( chartType == 1 ){
				srvLogWrite('P0','07','05','01',$totSurvMain.ui.selectedThema,params); //경영형태별 임가
			} else if( chartType == 2 ){
				srvLogWrite('P0','07','05','02',$totSurvMain.ui.selectedThema,params); //임산물 판매금액별 임가
			} else if( chartType == 3 ){
				srvLogWrite('P0','07','05','03',$totSurvMain.ui.selectedThema,params); //임산물 재배 작물별 임가
			} else if( chartType == 4 ){
				srvLogWrite('P0','07','02','00',$totSurvMain.ui.selectedThema,params); //경영주 연령별 임가
			} else if( chartType == 5 ){
				srvLogWrite('P0','07','03','00',$totSurvMain.ui.selectedThema,params); //경영주 임업 경력기간별 임가
			}
			
			// 선택한 레벨이 3이 아닐경우
			if($totSurvMain.ui.selectedLevel != 3){
				// 선택한 obj와 이전에 선택한 obj가 다를 경우
				if(obj[0] != $totSurvMap.ui.selectedObj[0]){
					if(obj == 'clear') {
						$totSurvMain.ui.chartTarget = "";
			    		$totSurvMain.ui.chartIndex = "";
			    		$totSurvMain.ui.chartData = "";
			    		$totSurvMain.ui.chartColor = "";
			    		$totSurvMain.ui.chartTitle = "";   
			    		var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
			    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);		
			    		if($totSurvMap.ui.isAtdrc){
			    			$totSurvMap.ui.mapToggleId = "";
			    		}
			    		
			    		if($totSurvMain.ui.selectedYear == "2015"){
			    			//$farmDash.ui.drawContent("DT_1AG15104", "T01", "000");	    			
			    			$farmDash.ui.drawContent("DT_1AG15104", "T00", "000");
			    		} else {
			    			// 2020.11.10 [주형식] 명 -> 가구로 변경
			    			// $farmDash.ui.drawContent("DT_1AG104", "T01", "000");
			    			$farmDash.ui.drawContent("DT_1AG104", "T00", "000");
			    		}
						if($totSurvMain.ui.chartColor != ""){
							$totSurvMap.ui.selectedObj.attr("fill", $totSurvMain.ui.chartColor);
						} else {
							$totSurvMap.ui.selectedObj.attr("fill", $totSurvMain.ui.selectedTempColor);
						}	
						$totSurvMap.ui.chartToggleYn = "N";
			    		$totSurvMap.ui.selectedObj = "";
			    		$("#itmDiv").css("display", "none");
			    		$("#itmDiv").html("");
			    		return;
					}
					// 이전에 선택한 오브젝트의 색 변경(이전선택 오브젝트가 없을경우 pass
					if($totSurvMap.ui.selectedObj[0] != "" && $totSurvMap.ui.selectedObj[0] != null){
						if(text == undefined || text == null || text == ""){
							$totSurvMap.ui.selectedObj.attr("fill", $totSurvMain.ui.selectedTempColor)
						} else {
							$totSurvMap.ui.selectedObj.attr("stroke", $totSurvMain.ui.selectedTempColor)
						}
						
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
		    			
					$forestryDash.ui.drawContent(d.surv_id, d.itm_cd, d.c1, d.c2); // 2020
					// 차트 토글여부 Y
					$totSurvMap.ui.chartToggleYn = "Y";
					// 현재 선택한 오브젝트를 변수에 저장
					$totSurvMap.ui.selectedObj = obj;
					// 현재 선택한 오브젝트의 색 변경
					if(text == undefined || text == null || text == ""){
						obj.attr("fill", color);
					} else {
						obj.attr("stroke", color);
					}
					
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
					//$forestryDash.ui.drawContent("DT_1IN1502", "T100", "");
					if($totSurvMain.ui.chartColor != ""){
						if(text == undefined || text == null || text == ""){
							obj.attr("fill", $totSurvMain.ui.chartColor);
						} else {
							obj.attr("stroke", $totSurvMain.ui.chartColor);
						}
						
					} else {
						if(text == undefined || text == null || text == ""){
							obj.attr("fill", $totSurvMain.ui.selectedTempColor);
						} else {
							obj.attr("stroke", $totSurvMain.ui.selectedTempColor);
						}
						
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
				$(target).css("top", d3.event.pageY + y - 20 + "px")
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
		
		$forestryDash.org_id = tmp[1].split("&")[0];
		$forestryDash.tbl_id = tmp[2].split("&")[0];
		
		if(!$forestryDash.isDev){
			
			var kosisDetailOption = new kosis.serviceApi.kosisDetailOption.api();
			kosisDetailOption.addParam("org_id", $forestryDash.org_id);
			kosisDetailOption.addParam("list_id", $forestryDash.tbl_id);
			
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
			lv_url += "?org_id="+ $forestryDash.org_id;
			lv_url += "&list_id="+ $forestryDash.tbl_id;
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
				
				$forestryDash.obj_var_id = resultData[0].obj_var_id;
				$forestryDash.field_id = resultData[0].field_id;
				
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
		
		if(!$forestryDash.isDev){
			// 운영 호출 
		}
		else{
			var map = $totSurvMap.ui.map;
			map.selectedBoundMode = "multi";
			
			//url 파라미터 세팅
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
			lv_url += "?org_id="+ $forestryDash.org_id;
			lv_url += "&tbl_id="+ $forestryDash.tbl_id;
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
			lv_url += "&obj_var_id=" + $forestryDash.obj_var_id;
			lv_url += "&field_id=" + $forestryDash.field_id;
			
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
					
					$forestryDash.kosis_result_data = [];
					$forestryDash.kosis_result_data = result;
					
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
		
		this.map.data.push($forestryDash.kosis_result_data);
		this.map.dataType = "kosis";
		this.map.dataForCombine = $forestryDash.kosis_result_data;
		
		var yearArr = [];
		var options = $('#bndYear option');
		var values = $.map(options ,function(option) {
			yearArr.push(option.value);
		});
		
		var yearMax = Math.max.apply(null, yearArr);
		var yearMin = Math.min.apply(null, yearArr);
		
		var year = $forestryDash.kosis_data_year;
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
		$forestryDash.kosis_result_data = tempData;
		
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
	

	$forestryDash.util = {};
	
	$forestryDash.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$forestryDash.event.setUIEvent() called.");
			
			var body = $("body");
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 start*/
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#forestryHouse_rank", function(e){ // 20201014 박은식 IE event 문제로 change 추가
			//2020.09.10[신예리] 슬라이드 컬러 수정
				$totSurvMain.ui.chartTarget = "";
	    		$totSurvMain.ui.chartIndex = "";
	    		$totSurvMain.ui.chartData = "";
	    		$totSurvMain.ui.chartColor = "";
	    		$totSurvMain.ui.chartTitle = "";
	    		$totSurvMap.ui.selectedObj[0] = "";
				this.style.background = 'linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
				$("#rangeV3").find('span').eq(0).text(this.value+"번");
				$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#forestryHouse_rank").outerWidth()-20)), top:$("#forestryHouse_rank").offset().top-30})
			
			//left: calc(40.3333% + 1.93333px);
			})
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 end*/
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 start*/
			body.on("mouseup", "#forestryHouse_rank", function(){  // 20201012 박은식 IE event 문제로 change 추가
				$forestryDash.ui.getRankSet(this.value, this.id, "");
			})
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 end*/
			
			if($totSurvMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			$forestryDash.ui.getRankSet("", "",$totSurvMain.ui.selectedArea);
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
					$(".map-col-SubL").width("");
					$(".map-col-SubL").height("616px"); //2020.09.16[신예리] 영역 맞춤
					// 맵 사이즈
					$('#mapRgn_forestry').width("");
					$('#mapRgn_forestry').height("590px");
					// 지도 크기 설정				
					$("#mapArea").width("");
					$("#mapArea").height("100%"); // 2020.09.10[신예리] 맵 버튼 위치 조정으로 인한 height 값 수정
					
					/** 2020-10-12 [곽제욱] 맵크기 확대, 축소시 show-hide 분기 처리 START */
					if($totSurvMain.ui.selectedLevel=="0"){

						$(".Rangecontainer").css("display", "none");

					} else if($totSurvMain.ui.selectedLevel=="1"){

						$(".Rangecontainer").css("display", "inline-block");

					} else if($totSurvMain.ui.selectedLevel=="2"){
						$(".Rangecontainer").css("display", "inline-block");

						
					} else if($totSurvMain.ui.selectedLevel=="3"){
						
						$(".Rangecontainer").css("display", "none");
					}
					/** 2020-10-12 [곽제욱] 맵크기 확대, 축소시 show-hide 분기 처리 END */
					
					if($totSurvMap.ui.map != null){
						$totSurvMap.ui.map.update();
					}
					//$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "2"); 2020-10-12 [곽제욱] 로직 변경으로 인한 주석처리
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 END
					
					$("#fsrcsCtvtCropsForestry").parent().show()
					$("#ownerForesty").parent().show()
					$("#fsrcsSleAmount").parent().show()
					$("#forestryMngmtAge").parent().show()
					$("#forestryMngmtCareerPd").parent().show()
					$("#fsrcsCtvtCropsForestry").width("100%")
					$("#ownerForesty").width("100%")
					$("#fsrcsSleAmount").width("100%")
					$("#forestryMngmtAge").width("90%")
					$("#forestryMngmtCareerPd").width("100%")
					
					// 임산물 재배 작물별 임가				
					// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 START
					//20201119 박은식 data 없을 경우 이미지 표출 START
					var moveHtml = "";
					var imgH = "";
					moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
					moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px;'>";
					moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
					moveHtml += "</div>";
					// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 START
					if($("#fsrcsCtvtCropsForestry_0").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_0.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_0, "fsrcsCtvtCropsForestry", "N", "220"); //20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else if($("#fsrcsCtvtCropsForestry_1").hasClass("on")){
					// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 END
						if($forestryDash.fsrcsCtvtCropsForestry_1.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_1, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}							
					} else if($("#fsrcsCtvtCropsForestry_2").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_2.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_2, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else if($("#fsrcsCtvtCropsForestry_3").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_3.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_3, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else if($("#fsrcsCtvtCropsForestry_4").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_4.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_4, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else if($("#fsrcsCtvtCropsForestry_5").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_5.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_5, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					}
					//20201119 박은식 data 없을 경우 이미지 표출 END
					// 경영주 임업 경력기간별 임가
					setForestryMngmtCareerPdChart($forestryDash.forestryMngmtCareerPd, "forestryMngmtCareerPd", "N", "135");
											
					setForestryMngmtAgeChart($forestryDash.forestryMngmtAge, "forestryMngmtAge", "N", "140"); //2020.10.28[신예리] 높이 변경
					
					//function radialForestryChart(data, target, resizeYn, p_height){
					radialForestryChart($forestryDash.businessChart, "" ,"N");
					
					if($forestryDash.plumbingForestryChart.length != 0){
						fsrcsSleAmountChart($forestryDash.plumbingForestryChart, 'N', 280);
					} else {
						$("#fsrcsSleAmount").empty();
						var moveHtml = "";
						moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
						moveHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 50px;'>"; //20201120 박은식 마진값 수정
						moveHtml += "	<p style='margin-top: 15px;'> 광역시도에서 제공하는 통계정보입니다.</p>";
						moveHtml += "</div>";
						$("#fsrcsSleAmount").html(moveHtml)
					}
				}
				else{
//					alert("작은화면 -> 큰화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					$(".mapExport").addClass("on");
					$("#fsrcsCtvtCropsForestry").width($("#fsrcsCtvtCropsForestry").outerWidth())
					$("#ownerForesty").width($("#ownerForesty").outerWidth())
					$("#fsrcsSleAmount").width($("#fsrcsSleAmount").outerWidth())
					$("#forestryMngmtAge").width($("#forestryMngmtAge").outerWidth())
					$("#forestryMngmtCareerPd").width($("#forestryMngmtCareerPd").outerWidth())
					$("#fsrcsCtvtCropsForestry").parent().hide()
					$("#ownerForesty").parent().hide()
					$("#fsrcsSleAmount").parent().hide()
					$("#forestryMngmtAge").parent().hide()
					$("#forestryMngmtCareerPd").parent().hide()
					
					
					// 지도 크기 설정
					$(".map-col-SubL").width($(window).width()-430);
					$(".map-col-SubL").height("825px"); //2020.09.15 [신예리] height 값 수정
					
					// 최초지도
					$("#worldMap").width("1480px");
					$("#worldMap").height("800px"); //2020.09.15 [신예리] height 값 수정
									
					$("#mapArea").width($(window).width()-430);
					$("#mapArea").height("800px"); //2020.09.15 [신예리] height 값 수정
					
					// 맵 사이즈
					$('#mapRgn_forestry').width($(window).width()-430);
					$('#mapRgn_forestry').height("800px"); //2020.09.15 [신예리] height 값 수정
					
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
							$forestryDash.event.allChange(to_sido_cd, "1");
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
							$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
									$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$forestryDash.upperBack = true;
									$forestryDash.ui.getRankSet("", "sgg", $totSurvMain.ui.selectedArea);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경									
								} else {
									$totSurvMain.ui.selectedLevel =  "1";
									$totSurvMain.ui.selectedArea = to_sido_cd;
									$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$totSurvMain.ui.pathChange("sgg", to_sido_cd);
									$forestryDash.upperBack = true;
									$totSurvMap.ui.mapToggleId = "";
									$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$totSurvMap.ui.isAtdrc = false;
									$forestryDash.ui.getRankSet("", "sido", to_sido_cd);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
								}
							} 
							
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
								$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							}
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
			
			
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장) 이벤트 추가 START
			// 차트 이미지 저장
			body.on("click", "[name=chartBtn]", function(evnt){ 
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','09','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				console.log("selId = " + selId);
				
				if(selId == "fsrcsCtvtCropsForestryDiv"){
					// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 START
					if($("#fsrcsCtvtCropsForestry_0").hasClass("on")){
						chartModal($forestryDash.fsrcsCtvtCropsForestry_0, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
					} else if($("#fsrcsCtvtCropsForestry_1").hasClass("on")){
					// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 END
						chartModal($forestryDash.fsrcsCtvtCropsForestry_1, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
					} else if($("#fsrcsCtvtCropsForestry_2").hasClass("on")){
						chartModal($forestryDash.fsrcsCtvtCropsForestry_2, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
					} else if($("#fsrcsCtvtCropsForestry_3").hasClass("on")){
						chartModal($forestryDash.fsrcsCtvtCropsForestry_3, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
					} else if($("#fsrcsCtvtCropsForestry_4").hasClass("on")){
						chartModal($forestryDash.fsrcsCtvtCropsForestry_4, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
					} else if($("#fsrcsCtvtCropsForestry_5").hasClass("on")){
						chartModal($forestryDash.fsrcsCtvtCropsForestry_5, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
					}
				}
				else if(selId == "ownerForestyDiv"){
					chartModal($forestryDash.businessChart, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "fsrcsSleAmountDiv"){
					chartModal($forestryDash.plumbingForestryChart, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "forestryMngmtAgeDiv"){
					let cmdata = JSON.parse(JSON.stringify($forestryDash.forestryMngmtAge));
					if($totSurvMain.ui.selectedYear=='2020') cmdata.map(d=>{d.itm_nm = d.c1_nm;});
					chartModal(cmdata, 'itm2', 'itm_nm', 'dt', 't4', '', '임가', '가구');		// 2020.11.04 [주형식] 공통차트 유형 및 파라메터 변경  //20201202 박은식 파라미터 추가
				}
				else if(selId == "forestryMngmtCareerPdDiv"){
					chartModal($forestryDash.forestryMngmtCareerPd, 'itm1', 'itm_nm', 'dt', '', '임가', '가구'); //20201202 박은식 파라미터 추가
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','08','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				// 임산물 재배 작물별 임가
				if(selId == "fsrcsCtvtCropsForestryDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0610");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0260");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0555");
					}
				}
				// 경영형태별 임가
				else if(selId == "ownerForestyDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0608");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0229");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0526");
					}
				}
				// 임산물 판매금액별 임가
				else if(selId == "fsrcsSleAmountDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0609");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0249");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0544");
					}
				}
				// 경영주 연령별 임가
				else if(selId == "forestryMngmtAgeDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0613");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0238");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0535");
					}
				}
				// 경영주 임업 경력기간별 임가
				else if(selId == "forestryMngmtCareerPdDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0612");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0246");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0542");
					}
				}
			});
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);

				if(selId == "fsrcsCtvtCropsForestryDiv"){
					$totSurvMain.ui.chartImageDown("#fsrcsCtvtCropsForestryDiv", "임산물 재배 작물별 임가");
				}
				else if(selId == "ownerForestyDiv"){
					$totSurvMain.ui.chartImageDown("#ownerForestyDiv", "경영형태별 임가");

				}
				else if(selId == "fsrcsSleAmountDiv"){
					$totSurvMain.ui.chartImageDown("#fsrcsSleAmountDiv", "임산물 판매금액별 임가");
				}
				else if(selId == "forestryMngmtAgeDiv"){
					$totSurvMain.ui.chartImageDown("#forestryMngmtAgeDiv", "경영주 연령별 임가");
				}
				else if(selId == "forestryMngmtCareerPdDiv"){
					$totSurvMain.ui.chartImageDown("#forestryMngmtCareerPdDiv", "경영주 임업 경력기간별 임가");
				}
			});
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장, 맵 저장) 이벤트 추가 END
			
			body.on("click", "#fsrcsCtvtCropsForestry_0, #fsrcsCtvtCropsForestry_1, #fsrcsCtvtCropsForestry_2, #fsrcsCtvtCropsForestry_3, #fsrcsCtvtCropsForestry_4, #fsrcsCtvtCropsForestry_5", function(){ // 2020-11-17 [곽제욱] 전체 그루핑 추가
				$(".forestKindBtnWrap > button").removeClass("on");
				$(this).addClass("on");
				//20201119 박은식 data 없을 경우 이미지 표출 START
				var moveHtml = "";
				var imgH = "";
				moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
				moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px;'>";
				moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
				moveHtml += "</div>";
				// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 START
				if($("#fsrcsCtvtCropsForestry_0").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_0.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_0, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_1").hasClass("on")){
				// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 END
					if($forestryDash.fsrcsCtvtCropsForestry_1.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_1, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}							
				} else if($("#fsrcsCtvtCropsForestry_2").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_2.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_2, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_3").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_3.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_3, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_4").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_4.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_4, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				} else if($("#fsrcsCtvtCropsForestry_5").hasClass("on")){
					if($forestryDash.fsrcsCtvtCropsForestry_5.length != 0){
						setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_5, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
					} else {
						$("#fsrcsCtvtCropsForestry").html(moveHtml);
					}
				}
				//20201119 박은식 data 없을 경우 이미지 표출 END
				//20201117 박은식 영역 선택 시 차트 유지 로직 추가 START
				if($totSurvMain.ui.chartTarget != ""
					&& $totSurvMain.ui.chartIndex != "" //20201126 박은식 조건수정
					&& $totSurvMain.ui.chartColor != ""
					&& $forestryDash.mulType == $(this).attr("id")){
					$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
				}
				//20201117 박은식 영역 선택 시 차트 유지 로직 추가 END
			});
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
			
			console.log("...... forestryDash ...... allChange .........");
			
			if($totSurvMain.ui.selectedYear == "2015"){
				$totSurvMap.ui.selectedSurvId = "DT_1FO15105";								    				
			} else if($totSurvMain.ui.selectedYear == "2010"){
				$totSurvMap.ui.selectedSurvId = "DT_1FO105";
			}else{
				$totSurvMap.ui.selectedSurvId = "DT_1FO20104";
			}
			$totSurvMap.ui.selectedItmCd = "T00";//20201120 박은식 데이터 조회 시 초기화
			
			var year = $totSurvMain.ui.selectedYear;
			var regionCd = admCd;
			
			if($totSurvMain.ui.chartTarget == ""){
				$("#clickItmName").html("지도");
			}
			
			// 임업경영형태
			// 임업경영형태별 임가 차트 데이터 변경 START
			
			if(year == '2020'){
			  	var itm_tabl='DT_1FO20103';
			} else if(year == '2015'){
			  	var itm_tabl='DT_1FO15103';
			} else if( year == '2010' ){
				var itm_tabl='DT_1FO103';
			}else{
				var itm_tabl='DT_1FO20103';
			}
			var businessChart = businessJson(year, itm_tabl ,regionCd, "T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19"); //DT_1FO15103
			
			var tempbusinessChartData = [];
			var tempSum1 = 0;
			var tempSum2 = 0;
			$.each(businessChart, function(key, value){
				//합계
				if(value.CHAR_ITM_ID == "T01" || value.CHAR_ITM_ID == "T02" || value.CHAR_ITM_ID == "T03"){	// 비재배임업만 경영 중 육림업, 벌목업, 양묘업
					var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
					surv_id: value.surv_id?value.surv_id:itm_tabl};
					tempbusinessChartData.push(tempValue);
				}
				
				// 채취업 합계
				if(value.CHAR_ITM_ID == "T04" || value.CHAR_ITM_ID == "T05" || value.CHAR_ITM_ID == "T06" || value.CHAR_ITM_ID == "T07" || value.CHAR_ITM_ID == "T08" || value.CHAR_ITM_ID == "T09"){
					tempSum1 = tempSum1 + Number(value.DTVAL_CO);
				}
				
				if(value.CHAR_ITM_ID == "T09"){
					var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T04,T05,T06,T07,T08,T09", 
									 itm_nm: "채취업", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id?value.surv_id:itm_tabl, unit_nm: value.unit_nm};
					tempbusinessChartData.push(tempValue);
				}
				// 비재배임업과 재배임업 겸업 합계
				if(value.CHAR_ITM_ID == "T10" || value.CHAR_ITM_ID == "T11" || value.CHAR_ITM_ID == "T12" || value.CHAR_ITM_ID == "T13" || 
						value.CHAR_ITM_ID == "T14" || value.CHAR_ITM_ID == "T15" || value.CHAR_ITM_ID == "T16" || value.CHAR_ITM_ID == "T17" || value.CHAR_ITM_ID == "T18"){
					tempSum2 = tempSum2 + Number(value.DTVAL_CO);
				}
				
				if(year=='2015'){
                    if(value.CHAR_ITM_ID == "T13"){
					    var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum2.toString(), irdsrate: value.irdsrate , itm_cd: "T10,T11,T12,T13,T14,T15,T16,T17,T18", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
									 itm_nm: "겸업(비재배+재배)", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id?value.surv_id:itm_tabl, unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
					tempbusinessChartData.push(tempValue);
                    }
				} else {
                    if(value.CHAR_ITM_ID == "T18"){
					    var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum2.toString(), irdsrate: value.irdsrate , itm_cd: "T10,T11,T12,T13,T14,T15,T16,T17,T18", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
									 itm_nm: "겸업(비재배+재배)", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id?value.surv_id:itm_tabl, unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
					tempbusinessChartData.push(tempValue);
                    }
				}
				
				// 재배임업만 경영
				if(value.CHAR_ITM_ID == "T19"){
				var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, surv_id: value.surv_id?value.surv_id:itm_tabl};
					tempbusinessChartData.push(tempValue);
				}
				
			});
			// 임업경영형태별 임가 차트 데이터 변경 END
			 businessChart = tempbusinessChartData;
			//2020-11-23 [곽제욱] 주석 처리 END
			$forestryDash.businessChart = businessChart; // 2020-11-23 [곽제욱] 차트데이터 변경
			radialForestryChart(businessChart, "ownerForesty" ,"N"); // 2020-11-23 [곽제욱] 차트데이터 변경
			
			// 임산물 판매금액별 임가
			var tmplumbingForestryChart =[];
			if(year == '2020'){
			  	var itm_tabl='DT_1FO20413';
			} else if(year == '2015'){
			  	var itm_tabl='DT_1FO15206';
			} else if( year == '2010' ){
				var itm_tabl='DT_1FO205';
			}else{
				var itm_tabl='DT_1FO20413';
			}
			var tmpValue = businessJson(year, itm_tabl ,regionCd, year == '2020'?"T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13":"T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12"); //DT_1FO15206
			
			$.each(tmpValue, function(key, value){
			 var tmp= {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
		surv_id: value.surv_id?value.surv_id:itm_tabl};
				tmplumbingForestryChart.push(tmp);
			});
			var plumbingForestryChart = tmplumbingForestryChart;
			$forestryDash.plumbingForestryChart = plumbingForestryChart;
			
			if(plumbingForestryChart.length != 0){
						fsrcsSleAmountChart(plumbingForestryChart, 'N', 280);
					} else {
						$("#fsrcsSleAmount").empty();
						var moveHtml = "";
						moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
						moveHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 50px;'>"; //20201120 박은식 마진값 수정
						moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다.</p>";
						moveHtml += "</div>";
						$("#fsrcsSleAmount").html(moveHtml)
					}
		
			// 경영주 임업 경력기간별 임가DT_1AG20107
			var tmpforestryMngmtCareerPd=[];
			if(year == '2020'){
			  	var itm_tabl='DT_1FO20203';
			} else if(year == '2015'){
			  	var itm_tabl='DT_1FO15203';
			} else if( year == '2010' ){
				var itm_tabl='DT_1FO203';
			}else{
				var itm_tabl='DT_1FO20203';
			}
			var tmpValue = businessJson(year, itm_tabl ,regionCd, "T01,T02,T03,T04,T05"); //DT_1FO15203
			$.each(tmpValue, function(key, value){
			 var tmp= {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, 
		dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, surv_id: value.surv_id?value.surv_id:itm_tabl};
				tmpforestryMngmtCareerPd.push(tmp);
			});
			var forestryMngmtCareerPd = tmpforestryMngmtCareerPd;
			$forestryDash.forestryMngmtCareerPd = forestryMngmtCareerPd;
			// 경영주 임업 경력기간별 임가
			setForestryMngmtCareerPdChart(forestryMngmtCareerPd, "forestryMngmtCareerPd", "N", "135");
			
			// 경영주 연령별 분류 현황
			var tmpforestryMngmtAge=[]; 
			if(year == '2015'){
			  	var itm_tabl='DT_1FO15108';
				var tmpValue = businessJson(year, itm_tabl ,regionCd, "T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13"); //DT_1FO15203
			} else if( year == '2010' ){
				var itm_tabl='DT_1FO108';
				var tmpValue = businessJson(year, itm_tabl ,regionCd, "T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13"); //DT_1FO15203
			}else{
				var itm_tabl='DT_1FO20112';
				var tmpValue = businessJson(year, itm_tabl ,regionCd, "T00",'O25,O30,O35,O40,O45,O50,O55,O60,O65,O70,O75,O80,O85,O90'); //DT_1FO15203
			}
			$.each(tmpValue, function(key, value){
			 var tmp= {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, 
		irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, surv_id: value.surv_id?value.surv_id:itm_tabl};
				tmpforestryMngmtAge.push(tmp);
			});
			var forestryMngmtAge = tmpforestryMngmtAge;
			$forestryDash.forestryMngmtAge = forestryMngmtAge;
			setForestryMngmtAgeChart(forestryMngmtAge, "forestryMngmtAge", "N", "140"); //2020.10.28[신예리] 높이 변경
			
			//임산물 재배 작물별 임가 2015
			if(year == '2015'||year == '2020'){
				$forestryDash.fsrcsCtvtCropsForestry_0 = [];
				let tItem_cd=''; 
				if(year=='2015') tItem_cd = "T00,T02,T04,T06,T08,T10,T40,T12,T14,T16,T18,T20,T22,T24,T26,T42,T28,T30,T32,T34,T36,T44,T38,T46,T48,T50,T52,T54,T56,T58,T60,T62";
				else tItem_cd = "T00,T02,T04,T06,T08,T10,T42,T12,T14,T16,T18,T20,T22,T24,T26,T28,T44,T30,T32,T34,T36,T38,T46,T40,T48,T50,T52,T54,T56,T58,T60,T62,T64"; 
				var tmpValue = businessJson(year, year=='2015'?"DT_1FO15501":'DT_1FO20401',regionCd, tItem_cd); //DT_1FO15501
				var tmpfsrcsCtvtCropsForestry_0 = [];
				var tempSum1 = 0; var tempSum2 = 0; var tempSum3 = 0; var tempSum4 = 0; var tempSum5 = 0;
				$.each(tmpValue, function(key, value){
					//산나물
					if(year=='2015'){
						if(value.CHAR_ITM_ID == "T00" || value.CHAR_ITM_ID == "T02" || value.CHAR_ITM_ID == "T04" || value.CHAR_ITM_ID == "T06" || value.CHAR_ITM_ID == "T08" || value.CHAR_ITM_ID == "T10" || value.CHAR_ITM_ID == "T40"){
							tempSum1 = tempSum1 + Number(value.DTVAL_CO);
						}
					}else{
						if(value.CHAR_ITM_ID == "T00" || value.CHAR_ITM_ID == "T02" || value.CHAR_ITM_ID == "T04" || value.CHAR_ITM_ID == "T06" || value.CHAR_ITM_ID == "T08" || value.CHAR_ITM_ID == "T10" || value.CHAR_ITM_ID == "T42"){
							tempSum1 = tempSum1 + Number(value.DTVAL_CO);
						}
					}
					//약용작물
					if(year=='2015'){
						if(value.CHAR_ITM_ID == "T12" || value.CHAR_ITM_ID == "T14" || value.CHAR_ITM_ID == "T16" || value.CHAR_ITM_ID == "T18" || value.CHAR_ITM_ID == "T20" || value.CHAR_ITM_ID == "T22"  || value.CHAR_ITM_ID == "T24" || value.CHAR_ITM_ID == "T26" || value.CHAR_ITM_ID == "T42" ){
							tempSum2 = tempSum2 + Number(value.DTVAL_CO);
						}
					}else{
						if(value.CHAR_ITM_ID == "T12" || value.CHAR_ITM_ID == "T14" || value.CHAR_ITM_ID == "T16" || value.CHAR_ITM_ID == "T18" || value.CHAR_ITM_ID == "T20" || value.CHAR_ITM_ID == "T22"  || value.CHAR_ITM_ID == "T24" || value.CHAR_ITM_ID == "T26" || value.CHAR_ITM_ID == "T28" || value.CHAR_ITM_ID == "T44"){
							tempSum2 = tempSum2 + Number(value.DTVAL_CO);
						}
					}
					//관상작물
					if(year=='2015'){
						if(value.CHAR_ITM_ID == "T28" || value.CHAR_ITM_ID == "T30" || value.CHAR_ITM_ID == "T32" || value.CHAR_ITM_ID == "T34" || value.CHAR_ITM_ID == "T36" || value.CHAR_ITM_ID == "T44"){
							tempSum3 = tempSum3 + Number(value.DTVAL_CO);
						}
					}else{
						if(value.CHAR_ITM_ID == "T30" || value.CHAR_ITM_ID == "T32" || value.CHAR_ITM_ID == "T34" || value.CHAR_ITM_ID == "T36" || value.CHAR_ITM_ID == "T38" || value.CHAR_ITM_ID == "T46"){
							tempSum3 = tempSum3 + Number(value.DTVAL_CO);
						}
					}
					//표고버섯
					if(year=='2015'){
						if(value.CHAR_ITM_ID == "T38" || value.CHAR_ITM_ID == "T46" || value.CHAR_ITM_ID == "T48"){
							tempSum4 = tempSum4 + Number(value.DTVAL_CO);
						}
					}else{
						if(value.CHAR_ITM_ID == "T40" || value.CHAR_ITM_ID == "T48" || value.CHAR_ITM_ID == "T50"){
							tempSum4 = tempSum4 + Number(value.DTVAL_CO);
						}
					}
					//유실수
					if(year=='2015'){
						if(value.CHAR_ITM_ID == "T50" || value.CHAR_ITM_ID == "T52" || value.CHAR_ITM_ID == "T54" || value.CHAR_ITM_ID == "T56" || value.CHAR_ITM_ID == "T58" || value.CHAR_ITM_ID == "T60"|| value.CHAR_ITM_ID == "T62"){
							tempSum5 = tempSum5 + Number(value.DTVAL_CO);
						}
					}else{
						if(value.CHAR_ITM_ID == "T52" || value.CHAR_ITM_ID == "T54" || value.CHAR_ITM_ID == "T56" || value.CHAR_ITM_ID == "T58" || value.CHAR_ITM_ID == "T60" || value.CHAR_ITM_ID == "T62"|| value.CHAR_ITM_ID == "T64"){
							tempSum5 = tempSum5 + Number(value.DTVAL_CO);
						}
					}
					
					//산나물 취합
					if((year=='2015' && value.CHAR_ITM_ID == "T40") || (year=='2020' && value.CHAR_ITM_ID == "T42")){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, 
										dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: year=='2015'?"T00,T02,T04,T06,T08,T10,T40":"T00,T02,T04,T06,T08,T10,T42", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "산나물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:value.TBL_ID, unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//약용작물 취합
					if((year=='2015' && value.CHAR_ITM_ID == "T42") || (year=='2020' && value.CHAR_ITM_ID == "T44")){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, 
										dt: tempSum2.toString(), irdsrate: value.irdsrate , itm_cd: year=='2015'?"T12,T14,T16,T18,T20,T22,T24,T26,T42":"T12,T14,T16,T18,T20,T22,T24,T26,T28,T44", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "약용작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:value.TBL_ID, unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//관상식물 취합
					if((year=='2015' && value.CHAR_ITM_ID == "T44") || (year=='2020' && value.CHAR_ITM_ID == "T46")){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, 
										dt: tempSum3.toString(), irdsrate: value.irdsrate , itm_cd: year=='2015'?"T28,T30,T32,T34,T36,T44":"T30,T32,T34,T36,T38,T46", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "관상작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:value.TBL_ID, unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//표고버섯 취합
					if((year=='2015' && value.CHAR_ITM_ID == "T48") || (year=='2020' && value.CHAR_ITM_ID == "T50")){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, 
										dt: tempSum4.toString(), irdsrate: value.irdsrate , itm_cd: year=='2015'?"T38,T46,T48":"T40,T48,T50", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "표고버섯", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:value.TBL_ID, unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//유실수 취합
					if((year=='2015' && value.CHAR_ITM_ID == "T62") || (year=='2020' && value.CHAR_ITM_ID == "T64")){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, 
										dt: tempSum5.toString(), irdsrate: value.irdsrate , itm_cd: year=='2015'?"T50,T52,T54,T56,T58,T60,T62":"T52,T54,T56,T58,T60,T62,T64", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "유실수", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:value.TBL_ID, unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_0 = tmpfsrcsCtvtCropsForestry_0;
				
				
				//임산물 재배 작물별 임가 01
				var tmpfsrcsCtvtCropsForestry_1 = [];
				$.each(tmpValue, function(key, value){
					if((year=='2015' && (value.CHAR_ITM_ID == "T00" || value.CHAR_ITM_ID == "T02" || value.CHAR_ITM_ID == "T04" || value.CHAR_ITM_ID == "T06" || value.CHAR_ITM_ID == "T08" || value.CHAR_ITM_ID == "T10" || value.CHAR_ITM_ID == "T40")) 
					||(year=='2020' && (value.CHAR_ITM_ID == "T00" || value.CHAR_ITM_ID == "T02" || value.CHAR_ITM_ID == "T04" || value.CHAR_ITM_ID == "T06" || value.CHAR_ITM_ID == "T08" || value.CHAR_ITM_ID == "T10" || value.CHAR_ITM_ID == "T42"))){
							var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, surv_id: 
							value.surv_id?value.surv_id:value.TBL_ID};
							tmpfsrcsCtvtCropsForestry_1.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_1 =tmpfsrcsCtvtCropsForestry_1
				
				//임산물 재배 작물별 임가 02
				var tmpfsrcsCtvtCropsForestry_2 = [];
				$.each(tmpValue, function(key, value){
					if((year=='2015' && (value.CHAR_ITM_ID == "T12" || value.CHAR_ITM_ID == "T14" || value.CHAR_ITM_ID == "T16" || value.CHAR_ITM_ID == "T18" || value.CHAR_ITM_ID == "T20" || value.CHAR_ITM_ID == "T22"  || value.CHAR_ITM_ID == "T24" || value.CHAR_ITM_ID == "T26" || value.CHAR_ITM_ID == "T42")) 
					||(year=='2020' && (value.CHAR_ITM_ID == "T12" || value.CHAR_ITM_ID == "T14" || value.CHAR_ITM_ID == "T16" || value.CHAR_ITM_ID == "T18" || value.CHAR_ITM_ID == "T20" || value.CHAR_ITM_ID == "T22" || value.CHAR_ITM_ID == "T24" || value.CHAR_ITM_ID == "T26" || value.CHAR_ITM_ID == "T28" || value.CHAR_ITM_ID == "T44"))){
							var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
							surv_id: value.surv_id?value.surv_id:value.TBL_ID};
							tmpfsrcsCtvtCropsForestry_2.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_2 =tmpfsrcsCtvtCropsForestry_2
				
				//임산물 재배 작물별 임가 03
				var tmpfsrcsCtvtCropsForestry_3 = [];
				$.each(tmpValue, function(key, value){
				if((year=='2015' && (value.CHAR_ITM_ID == "T28" || value.CHAR_ITM_ID == "T30" || value.CHAR_ITM_ID == "T32" || value.CHAR_ITM_ID == "T34" || value.CHAR_ITM_ID == "T36" || value.CHAR_ITM_ID == "T44")) 
					||(year=='2020' && (value.CHAR_ITM_ID == "T30" || value.CHAR_ITM_ID == "T32" || value.CHAR_ITM_ID == "T34" || value.CHAR_ITM_ID == "T36" || value.CHAR_ITM_ID == "T38" || value.CHAR_ITM_ID == "T46"))){					
				var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
				surv_id: value.surv_id?value.surv_id:value.TBL_ID};
							tmpfsrcsCtvtCropsForestry_3.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_3 =tmpfsrcsCtvtCropsForestry_3
				
				//임산물 재배 작물별 임가 04
				var tmpfsrcsCtvtCropsForestry_4 = [];
				$.each(tmpValue, function(key, value){
				if((year=='2015' && (value.CHAR_ITM_ID == "T38" || value.CHAR_ITM_ID == "T46" || value.CHAR_ITM_ID == "T48")) 
					||(year=='2020' && (value.CHAR_ITM_ID == "T40" || value.CHAR_ITM_ID == "T48" || value.CHAR_ITM_ID == "T50"))){					
				var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
				surv_id: value.surv_id?value.surv_id:value.TBL_ID};
							tmpfsrcsCtvtCropsForestry_4.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_4 =tmpfsrcsCtvtCropsForestry_4
				
				//임산물 재배 작물별 임가 05
				var tmpfsrcsCtvtCropsForestry_5 = [];
				$.each(tmpValue, function(key, value){
				if((year=='2015' && (value.CHAR_ITM_ID == "T50" || value.CHAR_ITM_ID == "T52" || value.CHAR_ITM_ID == "T54" || value.CHAR_ITM_ID == "T56" || value.CHAR_ITM_ID == "T58" || value.CHAR_ITM_ID == "T60"|| value.CHAR_ITM_ID == "T62")) 
					||(year=='2020' && (value.CHAR_ITM_ID == "T52" || value.CHAR_ITM_ID == "T54" || value.CHAR_ITM_ID == "T56" || value.CHAR_ITM_ID == "T58" || value.CHAR_ITM_ID == "T60" || value.CHAR_ITM_ID == "T62"|| value.CHAR_ITM_ID == "T64"))){	
				var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
				surv_id: value.surv_id?value.surv_id:value.TBL_ID};
							tmpfsrcsCtvtCropsForestry_5.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_5 =tmpfsrcsCtvtCropsForestry_5
			
			} else if( year == '2010' ){
				//임산물 재배 작물별 임가 2010
				var tmpValue = businessJson(year, "DT_1FO501" ,regionCd, "T00,T02,T04,T06,T08,T10,T12,T14,T16,T18,T20,T22,T24,T26,T28,T30,T32,T34,T36,T38,T40,T42,T44,T46,T48,T50,T52"); //DT_1FO15501
				var tmpfsrcsCtvtCropsForestry_0 = [];
				var tmpfsrcsCtvtCropsForestry_0 = [];
			var tempSum1 = 0; var tempSum2 = 0; var tempSum3 = 0; var tempSum4 = 0; var tempSum5 = 0;
				$.each(tmpValue, function(key, value){
					//산나물
					if(value.CHAR_ITM_ID == "T00" || value.CHAR_ITM_ID == "T02" || value.CHAR_ITM_ID == "T04" || value.CHAR_ITM_ID == "T06" || value.CHAR_ITM_ID == "T08" || value.CHAR_ITM_ID == "T30"){						tempSum1 = tempSum1 + Number(value.DTVAL_CO);
					}
					//약용작물
					if(value.CHAR_ITM_ID == "T10" || value.CHAR_ITM_ID == "T12" || value.CHAR_ITM_ID == "T14" || value.CHAR_ITM_ID == "T16" || value.CHAR_ITM_ID == "T18" || value.CHAR_ITM_ID == "T20"  || value.CHAR_ITM_ID == "T22" || value.CHAR_ITM_ID == "T32" ){
						tempSum2 = tempSum2 + Number(value.DTVAL_CO);
					}
					//관상작물
					if(value.CHAR_ITM_ID == "T24" || value.CHAR_ITM_ID == "T26" || value.CHAR_ITM_ID == "T34"){						
						tempSum3 = tempSum3 + Number(value.DTVAL_CO);
					}
					//표고버섯
					if(value.CHAR_ITM_ID == "T28" || value.CHAR_ITM_ID == "T36" || value.CHAR_ITM_ID == "T38"){		
						tempSum4 = tempSum4 + Number(value.DTVAL_CO);
					}
					//유실수
					if(value.CHAR_ITM_ID == "T40" || value.CHAR_ITM_ID == "T42" || value.CHAR_ITM_ID == "T44" || value.CHAR_ITM_ID == "T46" || value.CHAR_ITM_ID == "T48" || value.CHAR_ITM_ID == "T50" || value.CHAR_ITM_ID == "T52"){		
						tempSum5 = tempSum5 + Number(value.DTVAL_CO);
					}
					
					//산나물 취합
					if(value.CHAR_ITM_ID == "T30"){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T00,T02,T04,T06,T08,T30", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "산나물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:'DT_1FO501', unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//약용작물 취합
					if(value.CHAR_ITM_ID == "T32"){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum2.toString(), irdsrate: value.irdsrate , itm_cd: "T10,T12,T14,T16,T18,T20,T22,T32", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "약용작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:'DT_1FO501', unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//관상식물 취합
					if(value.CHAR_ITM_ID == "T34"){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum3.toString(), irdsrate: value.irdsrate , itm_cd: "T24,T26,T34", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "관상작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:'DT_1FO501', unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//표고버섯 취합
					if(value.CHAR_ITM_ID == "T38"){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum4.toString(), irdsrate: value.irdsrate , itm_cd: "T28,T36,T38", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "표고버섯", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:'DT_1FO501', unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
					
					//유실수 취합
					if(value.CHAR_ITM_ID == "T52"){
						var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum5.toString(), irdsrate: value.irdsrate , itm_cd: "T40,T42,T44,T46,T48,T50,T52", // 2020-11-19 [곽제욱] tempSum1 -> tempSum2 으로 변경   
										 itm_nm: "유실수", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, 
									surv_id: value.surv_id?value.surv_id:'DT_1FO501', unit_nm: value.unit_nm}; // 2020-11-17 [곽제욱] 항목명 변경
						tmpfsrcsCtvtCropsForestry_0.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_0 = tmpfsrcsCtvtCropsForestry_0;
				
				
				//임산물 재배 작물별 임가 01
				var tmpfsrcsCtvtCropsForestry_1 = [];
				$.each(tmpValue, function(key, value){
					if(value.CHAR_ITM_ID == "T00" || value.CHAR_ITM_ID == "T02" || value.CHAR_ITM_ID == "T04" || value.CHAR_ITM_ID == "T06" || value.CHAR_ITM_ID == "T08" || value.CHAR_ITM_ID == "T30"){
							var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
							surv_id: value.surv_id?value.surv_id:'DT_1FO501'};
							tmpfsrcsCtvtCropsForestry_1.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_1 =tmpfsrcsCtvtCropsForestry_1
				
				//임산물 재배 작물별 임가 02
				var tmpfsrcsCtvtCropsForestry_2 = [];
				$.each(tmpValue, function(key, value){
					if(value.CHAR_ITM_ID == "T10" || value.CHAR_ITM_ID == "T12" || value.CHAR_ITM_ID == "T14" || value.CHAR_ITM_ID == "T16" || value.CHAR_ITM_ID == "T18" || value.CHAR_ITM_ID == "T20"  || value.CHAR_ITM_ID == "T22" || value.CHAR_ITM_ID == "T32" ){
							var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
							surv_id: value.surv_id?value.surv_id:'DT_1FO501'};
							tmpfsrcsCtvtCropsForestry_2.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_2 =tmpfsrcsCtvtCropsForestry_2
				
				//임산물 재배 작물별 임가 03
				var tmpfsrcsCtvtCropsForestry_3 = [];
				$.each(tmpValue, function(key, value){
				if(value.CHAR_ITM_ID == "T24" || value.CHAR_ITM_ID == "T26" || value.CHAR_ITM_ID == "T34"){						
				var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
				surv_id: value.surv_id?value.surv_id:'DT_1FO501'};
							tmpfsrcsCtvtCropsForestry_3.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_3 =tmpfsrcsCtvtCropsForestry_3
				
				//임산물 재배 작물별 임가 04
				var tmpfsrcsCtvtCropsForestry_4 = [];
				$.each(tmpValue, function(key, value){
				if(value.CHAR_ITM_ID == "T28" || value.CHAR_ITM_ID == "T36" || value.CHAR_ITM_ID == "T38"){						
				var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
				surv_id: value.surv_id?value.surv_id:'DT_1FO501'};
							tmpfsrcsCtvtCropsForestry_4.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_4 =tmpfsrcsCtvtCropsForestry_4
				
				//임산물 재배 작물별 임가 05
				var tmpfsrcsCtvtCropsForestry_5 = [];
				$.each(tmpValue, function(key, value){
				if(value.CHAR_ITM_ID == "T40" || value.CHAR_ITM_ID == "T42" || value.CHAR_ITM_ID == "T44" || value.CHAR_ITM_ID == "T46" || value.CHAR_ITM_ID == "T48" || value.CHAR_ITM_ID == "T50" || value.CHAR_ITM_ID == "T52"){		
				var tempValue = {c1: value.OV_L2_ID, c1_nm: value.OV_L2_KOR, dt: value.DTVAL_CO, irdsrate: value.irdsrate , itm_cd: value.CHAR_ITM_ID, itm_nm: value.CHAR_ITM_NM, 
				surv_id: value.surv_id?value.surv_id:'DT_1FO501'};
							tmpfsrcsCtvtCropsForestry_5.push(tempValue);
					}
				});
				$forestryDash.fsrcsCtvtCropsForestry_5 =tmpfsrcsCtvtCropsForestry_5
			
			}
			// 임산물 재배 작물별 임가
						//20201119 박은식 data 없을 경우 이미지 표출 START
						var moveHtml = "";
						var imgH = "";
						moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
						moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px'>"; //20201120 박은식 마진값 수정
						moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
						moveHtml += "</div>";
						
			
			if($("#fsrcsCtvtCropsForestry_0").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_0.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_0, "fsrcsCtvtCropsForestry", "N", "220");
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else // 2020-11-17 [곽제욱] 임가 전체그루핑 추가 START
					 if($("#fsrcsCtvtCropsForestry_1").hasClass("on")){
					// 2020-11-17 [곽제욱] 임가 전체그루핑 추가 END
						if($forestryDash.fsrcsCtvtCropsForestry_1.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_1, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}							
					} else if($("#fsrcsCtvtCropsForestry_2").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_2.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_2, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else if($("#fsrcsCtvtCropsForestry_3").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_3.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_3, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else if($("#fsrcsCtvtCropsForestry_4").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_4.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_4, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} else if($("#fsrcsCtvtCropsForestry_5").hasClass("on")){
						if($forestryDash.fsrcsCtvtCropsForestry_5.length != 0){
							setFsrcsCtvtCropsForestryChart($forestryDash.fsrcsCtvtCropsForestry_5, "fsrcsCtvtCropsForestry", "N", "220");//20201126 박은식 resize parameter 수정
						} else {
							$("#fsrcsCtvtCropsForestry").html(moveHtml);
						}
					} 
			
			
			$totSurvMain.ui.selectedArea = regionCd;
						if($totSurvMain.ui.selectedArea == "00"){
							$forestryDash.ui.getRankSet("","","00")
			}
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestry.json",
				data: { year: year, region_cd : regionCd}, // 
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
					
						// 인구주택농림어업 총조사 임가 인구 조회	getTotForestry
						var totForestryData = res.result.totForestryData; //tmppop[0].DTVAL_CO
						// 인구주택농림어업 총조사 임가 2010 대비  itmCd T00   :: now_year,befor_year, total, rt
						var totForestryRtData = res.result.totForestryRtData;
						// 임가(가구)수  증감율 조회  T01  :: now_year,befor_year, total, rt
						var totForestrHouseRtData = res.result.totForestrHouseRtData;
						// 인구주택농림어업총조사 임가 인구 중 고령인 인구 조회
						var totForestryOldPeoData = res.result.totForestryOldPeoData;
						// 임가인구
						var totForestry = totForestryData[0].dt;

	
						// 고령인구 계산 
						var tOldNm = Number(totForestryOldPeoData[0].dt);
						var sumNm = 0;
						for(var i=1; i<totForestryOldPeoData.length; i++){
							sumNm = sumNm + Number(totForestryOldPeoData[i].dt);
						}
						var oldNum = sumNm;
						var oldRt = (tOldNm / sumNm).toFixed(2);
						
						var rtTxt = "'전주기 대비 ";
						// 각 값, 비율 세팅
						$(".dataAreatit").html('<h1>'+numberFormat(totForestry)+'</h1><span class="ml5">가구</span>');
						
						
						//20201119 박은식 data 없을 경우 이미지 표출 END
						
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
			
			if(mode == "1"){
				$forestryDash.ui.drawContent($totSurvMap.ui.selectedSurvId, $totSurvMap.ui.selectedItmCd, $totSurvMap.ui.selectedC1);
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
			
			$totSurvMain.ui.chartTarget = "";
    		$totSurvMain.ui.chartIndex = "";
    		$totSurvMain.ui.chartData = "";
    		$totSurvMain.ui.chartColor = "";
    		$totSurvMain.ui.chartTitle = "";
    		$totSurvMap.ui.selectedObj[0] = "";
			$forestryDash.highcharts = [];
			// 경영주 연령별 분류 현황
			$("#fsrcsCtvtCropsForestry").empty();
			// 경영주 교육 정도
			$("#forestryMngmtCareerPd").empty();
			// 가구원수별 농가
			$("#houseFarm").empty();
			
			// TODO ::
			// 인구와 농가인구의 연령대별 분포
			//var peopleFarmAge = res.result.peopleFarmAge;
//			// 농축산물 판매 금액별  
			$("#fsrcsSleAmount").empty();
			$totSurvMap.ui.selectedItmCd = "T00";
			$totSurvMap.ui.selectedC1 = "000";
			$totSurvMap.ui.selectedC2 = "";
			
			
			/* 총인구 영역(순위, 증감율, 슬라이드) 초기화 */			
		}
	};
	
	
	
	
	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};
	
	
}(window, document));

function businessJson(year, tbl_id,regionCd, itm_cd,c2){
		var retval;
		var param = {
				surv_year_list: year							
					, org_id_list: "101"							
						, tbl_id_list: tbl_id					
						, list_var_ord_list: "" 						
						, prt_type: "part"								    
						, char_itm_id_list: itm_cd						
						, adm_cd: "00"								
						, adm_unit: ""								
						, ov_l1_list: regionCd								
						, ov_l2_list: c2?c2:"000"								
						, ov_l3_list: ""								
						, ov_l4_list: ""								
						, ov_l5_list: ""								
						, category: ""									
						, orderby: "DTVAL_CO"
			}
			
			$.ajax({
    		type:"GET",
			async: false,	// 반드시 동기처리 해야 함
    		url: sgis4thApiPath,
	 		data: param,
	 		dataType: "json",
    		success:function( result ){
    			retval=result.sort((a,b)=>{return a.CHAR_ITM_ID < b.CHAR_ITM_ID ? -1:a.CHAR_ITM_ID > b.CHAR_ITM_ID ? 1: 0}).filter((r)=>Number(r.DTVAL_CO)!=0);
    		},
    		error:function(data) {
    			alert('fail~!');
    		}
    	});
    	 return retval;
	};

/**
 * @name         : radialForestryChart 
 * @description  : 임업경영형태별 임가
 * @date         : 2020.10.15
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function radialForestryChart(data, target, resizeYn, p_height){
	if(target==''){
		target = 'ownerForesty';
	}
	$("#ownerForesty").empty();
	var chartData = [],total=0;
	var tool = $(".chartCommontoolTip");
	var margin = {top: 20, right: 100, bottom: 20, left: 100}
	var w = 400, h = 250; //width값 임시 (반응형 처리전) //2020.10.20[신예리] width값 변경
	
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	
	//var titleMaxLength = d3.max(data, function(d){return d.itm_nm.replace("(가구)", "").replace("비재배임업만경영:","").replace("비재배임업과 재배임업 겸업", "겸업").length});
	
	var colorData = ["#E85757", "#599BD4", "#ED7D31", "#FFC000", "#B9D430","#4473C5"]; //2020.10.20[신예리] 차트 컬러 변경
	for (var i = 0; i < data.length; i++) {
	if(isNaN(Number(data[i].dt))) data[i].dt = 0;
		chartData.push({
			name:data[i].itm_nm.replace("(가구)", "").replace("비재배임업만경영:","").replace("비재배임업과 재배임업 겸업", "겸업"),
			color:colorData[i],
			y:Number(data[i].dt),
			itm_cd:data[i].itm_cd,
			surv_id : data[i].surv_id
		});
		total += Number(data[i].dt);
	}
	
	//chartData.sort(function(a,b){return b.y-a.y});
	$forestryDash.radialHighcharts = Highcharts.chart(target, {
	    chart: {
			width: 400,
			height:285,
			spacing:0,
			spacingBottom:15,
			spacingLeft:15,
			spacingRight:0,
			spacingTop:15
		},
		credits: {
            enabled: false
        },
	    plotOptions: {
	        series: {
    			slicedOffset: 0,
				cursor: 'pointer',
				borderWidth: 0,
				states:{
					select:{
						color:'rgb(87, 101, 116)'
					}
				},
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
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 "+ this.name +" </p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							if(!this.selected) deselectAllHighcharts();
							//$forestryDash.ui.chartItmClick($(this), data[this.index], "#576574",$totSurvMain.ui.chartTitle,'',1);
							if(!this.selected) $forestryDash.deselectAllHighcharts();
							var toolData = chartData[this.index];
					    	$totSurvMain.ui.chartTarget = "ownerForesty"
				    		$totSurvMain.ui.chartIndex = $(this).parent().index()
				    		$totSurvMain.ui.chartData = toolData;
				    		$totSurvMain.ui.chartColor = "#576574";
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+ "년 경영형태별 임가 (" + toolData.name.replace("(가구)", "").replace("비재배임업만경영:","").replace("비재배임업과 재배임업 겸업", "겸업") + ")";
					    	$forestryDash.ui.chartItmClick($(this), toolData, "#576574",$totSurvMain.ui.chartTitle,'',1);
							this.select();
						},
						select: function() {
							
						}
					}
				}
			}
	    },
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			labelFormatter: function () {
				return "<tspan>"+this.name + "</tspan> <tspan x='130'>: " + numberFormat(this.y) + "</tspan>";
			},
			itemMarginBottom:7,
			itemWidth: 200,
			padding: 0,
			margin: 0,
			itemStyle: {
				fontWeight: "100",
				fontFamily: "NanumSquare",
				fontSize: '13px'
			}
		},
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		title: {
			text: "합계:" + numberFormat(total),
			verticalAlign: "middle",
			x: -100,
			y: 13,
			floating: true,
			style: { "font-size": "11pt", "font-weight": "100", "font-family": "NanumSquare"}
		},
		tooltip: {
        	formatter: function () {
				return "<b>" + this.key + ": <br/>" + numberFormat(this.y) + "명</b>" ;
			},
			useHTML: true,
			shared: false,
		    shadow: false,
		    enabled: false,
		},
	    series: [{
    		slicedOffset: 0,
			type: 'pie',
			dataLabels: {
				enabled: false
			},
			size: '90%',
			innerSize: '60%',
			showInLegend: true,
	        data: chartData
	    }]
	});
	
	$forestryDash.highcharts.push($forestryDash.radialHighcharts);
	
	
}


/**
 * @name         : fsrcsSleAmountChart 
 * @description  : 임산물 판매금액별 임가
 * @date         : 2020.10.15
 * @author	     : jhs
 * @history 	 : 
 */
function fsrcsSleAmountChart(data, resizeYn, height){
	var margin = ({top: 0, right: 100, bottom: 5, left: 80}) //2020.10.26[신예리] x축 잘려서 left값 조정

	var indexData = [data.length]; // index를 정할 data값 배열 생성
	for(var i=0;i<data.length; i++){ // 배열에 data 저장
		indexData[i] = data[i].dt;
	}
	
	//var colors = ["#4E3691","#5F46A8","#7057B8","#8068C5","#A88FE6","#C1ABF0","#D2BFF7","#E7DAFC","#F0DAFC","#F9EFFF","#EFEAF2","#F5F5F5"]; //2020.11.11[신예리] 판매금액별 차트 컬러 12단계 지정 //2020.11.18[신예리] 색상표 변경
	var min = d3.min(data,function(d){return Number(d.dt)});
	var max = d3.max(data,function(d){return Number(d.dt)});
	var colors = d3.scaleLinear().domain([min,max]).range(['#F5F5F5','#4E3691']);
	var chartData = [], categories = [];
	var total = d3.sum(data,function(d){return Number(d.dt)});
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].dt),color:colors(Number(data[i].dt))});
		categories.push(data[i].itm_nm.replace("(가구)","").replace("판매금액별임가:","").replace('재배 임산물 판매금액별 임가:',''));
	}
	
	$("#fsrcsSleAmount").empty();
	
	var width = $("#fsrcsSleAmount").outerWidth();
		
	$forestryDash.fsrcsHighcharts = Highcharts.chart('fsrcsSleAmount', {
	    chart: {
	        type: 'bar'
	    },
	    title: {
	        text: null
	    },
	    xAxis: {
	        categories: categories,
	        crosshair: true,
			lineWidth:0
	    },
	    yAxis: {
			max:max+(max*.2),
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
				states:{
					select:{
						color:'rgb(87, 101, 116)'
					}
				},
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 10,
				stacking: 'normal',
				borderRadius:5,
				dataLabels: {
	                enabled: true,
        			inside: false,
					formatter:function(){return numberFormat(this.y)},
	                style: {
						fontSize:'13px',
	                    color: "#111111",
						fontFamily: 'NanumSquare',
						textOutline: false
	                }
	            },
				point: {
					events: {
						click: function() {
							if(!this.selected) $forestryDash.deselectAllHighcharts();
							let d = data[this.index];
							var title ="임산물 판매금액별 임가 (" + d.itm_nm.replace(" (가구)", "")+")";
							if($totSurvMain.ui.selectedLevel != "3"){    			
					    		$totSurvMain.ui.chartTarget = "fsrcsSleAmount"
					    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
					    		$totSurvMain.ui.chartData = d;
					    		$totSurvMain.ui.chartColor = "#576574";
					    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.c1_nm+" "+title;
				    		}
							$forestryDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+title,"",2);
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
	
	$forestryDash.highcharts.push($forestryDash.fsrcsHighcharts);
	
}

/**
 * @name         : setForestryMngmtAgeChart 
 * @description  : 경영주 연령별 임가
 * @date         : 2020.09.09
 * @author	     : esPark
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setForestryMngmtAgeChart(data, target, resizeYn, height){
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	//임시 end
	
	//기본셋팅
	var margin = ({top: 15, right: 20, bottom: 25, left: 30}) //2020.10.28[신예리] 마진 값 변경
	var color = ["4dc7ac","4dc7ac","dd95da","dd95da","dd95da","dd95da","dd95da","dd95da","f5ca87","f5ca87","f5ca87","f5ca87","f5ca87","f5ca87"];
	
	var chartData = [], categories = [];
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].dt),color:"#"+color[i],name:data[i].itm_nm});
		if($totSurvMain.ui.selectedYear=='2020')
			categories.push(data[i].c1_nm.replace(/\세/g,'').replace(/\이상/g,'세이상'));
		else
			categories.push(data[i].itm_nm.replace("(가구)","").replace("경영주연령별임가:",""));
	}
	
	$forestryDash.mngmtageHighcharts = Highcharts.chart(target, {
	    title: {
	        text: null
	    },
	    xAxis: {
	        categories: categories,
	        crosshair: true,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0,
				tickWidth: 1,
	        	tickLength: 5,
				color:'#000',
				tickColor:'#000',
				lineColor:'#000'
	    },
	    yAxis: {
			allowDecimals: true,
			  gridLineWidth: 0,
			step:5,
			  minorGridLineWidth: 0,
			tickWidth: 1,
        	tickLength: 5,
			color:'#000',
				tickColor:'#000',
	        max: maxVal,
	        title: {
	            text: null
	        },
			lineWidth: 0,
			tickLength:5,
			labels: {
                formatter: function () {
                    let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
					v = v<1000?v:Math.round(v/1000)+"K";
                    return v;
                }            
            }
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
				states:{
					select:{
						color:'rgb(87, 101, 116)'
					}
				},
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 30,
				stacking: 'normal',
				dataLabels: {
	                enabled: true,
        			inside: false,
					formatter:function(){return numberFormat(this.y)},
	                style: {
	                    fontWeight: '100',
	                    color: "#333",
						fontFamily: 'NanumSquare',
						textOutline: "2px white"
	                }
	            },
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
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear +"년 "+this.name+"</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click: function() {
							if(!this.selected) $forestryDash.deselectAllHighcharts();
							var title = "경영주 연령별 임가 (" + this.series.points[this.x].category+")";
							if($totSurvMain.ui.selectedLevel != "3"){    	
					    		$totSurvMain.ui.chartTarget = target
					    		$totSurvMain.ui.chartIndex = data[this.index].itm_cd;//20201126 박은식  data 변경
					    		$totSurvMain.ui.chartData = data[this.index];
					    		$totSurvMain.ui.chartColor = "#576574";
					    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+data[this.index].c1_nm+" "+title;
				    		}
		
							$forestryDash.ui.chartItmClick($(this), data[this.index], "#576574", $totSurvMain.ui.selectedYear+"년 "+title,'',4);
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
			type: 'column',
	        data: chartData
	    },{
			marker: {
	            fillColor: 'white',
	            lineWidth: 2,
	            lineColor: 'rgb(255, 162, 0)'
	        },
			color:'rgb(255, 162, 0)',
			dataLabels: {
	                enabled: false},
			type: 'line',
	        data: chartData
	    }]
	});

	$forestryDash.highcharts.push($forestryDash.mngmtageHighcharts);
}

/**
 * @name         : setForestryMngmtCareerPdChart
 * @description  : 경영주 임업 경력기간별 임가
 * @date         : 2020.11.10
 * @author	     : 한광희
 * @history 	 : 
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이, surv_id - 조사id
 */
function setForestryMngmtCareerPdChart(data, target, resize, height){
	var margin = ({top: 0, right: 150, bottom: 5, left: 60}) //2020.10.26[신예리] x축 잘려서 left값 조정
	var colors = ["#37A660", "#64C97F", "#88E498", "#CAEB6F", "#E2DE67"]; //2020.10.20[신예리] 차트 컬러 변경

	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	var max = d3.max(data, function(d){ return Number(d.dt) });
	$forestryDash.moveHomeData = data;
	
		var total = 0;
		for(var i=0; i<data.length; i++){
			total = Number(data[i].dt) + total;
		}

	var chartData = [], categories = [];	
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].dt),color:colors[i]});
		categories.push((data[i].itm_nm).indexOf(":") == -1 ? data[i].itm_nm.replace("(가구)", "") : (data[i].itm_nm).split(":")[1].replace("(가구)", ""));
	}
	
	$forestryDash.careerHighcharts = Highcharts.chart(target, {
	    chart: {
	        type: 'bar'
	    },
	    title: {
	        text: null
	    },
	    xAxis: {
			lineWidth: 0,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0,
	        categories: categories,
	        crosshair: true
	    },
	    yAxis: {
			max:max+(max*.1),
			lineWidth: 0,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0,
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
				states:{
					select:{
						color:'rgb(87, 101, 116)'
					}
				},
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 10,
				stacking: 'normal',
				borderRadius:5,
				dataLabels: {
	                enabled: true,
        			inside: false,
					formatter:function(){return numberFormat(this.y)},
	                style: {
						fontSize:'13px',
	                    color: "#111111",
						fontFamily: 'NanumSquare',
						textOutline: false
	                }
	            },
				point: {
					events: {
						click: function() {
							if(!this.selected) $forestryDash.deselectAllHighcharts();
							var title ="경영주 교육 정도 (" + data[this.index].itm_nm.replace(" (가구)", "").replace("경영주교육정도별임가:", "")+")";
							
							$forestryDash.ui.chartItmClick($(this), data[this.index], "#576574", $totSurvMain.ui.selectedYear+"년 "+ title,'',5);
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
	
	
	 $forestryDash.highcharts.push($forestryDash.careerHighcharts);
}

/**
 * @name         : setFsrcsCtvtCropsForestryChart 
 * @description  : 임산물 재배 작물별 임가
 * @date         : 2020.08.06
 * @author	     : juKwak
 * @history 	 : 
 */
function setFsrcsCtvtCropsForestryChart(data, target, resizeYn, height){
	// 마진값 세팅
	var margin = ({top: 10, right: 0, bottom: 20, left: 40}) //2020.10.28[신예리] 마진 변경
	// 칼라 세팅
	var color = ["#1F5253","#2D7B7B","#379293","#3CA4A5","#42AFB2","#73C8CB","#B4E2E2","#BFD4D4","#CFDEDE"] //20201022 박은식 청년 장년 노년 연령 색상 변경 
	var min = d3.min(data,function(d){return Number(d.dt)});
	var max = d3.max(data,function(d){return Number(d.dt)});
	var colors = d3.scaleLinear().domain([min,(max-min)/2,max]).range(['rgb(207, 222, 222)',"rgb(45, 123, 123)",'rgb(31, 82, 83)']);
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	
	//20201117 박은식 데이터 크기별 index 추가 START
	var chartData = [], categories = [];	
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].dt),color:colors(data[i].dt),name:data[i].itm_nm.replace("(가구)", "").replace("_임가", "").replace("산나물:","").replace("약용작물:","").replace("관상작물:","").replace("유실수:","").replace("(가구)","").replace("시설작물:산나물", "시설재배").replace("약용작물", "시설재배").replace("관상작물","시설재배").replace("표고버섯원목재배(노지):임가","접종(노지)").replace("표고버섯 톱밥배지재배", "톱밥 배지(시설)").replace("표고버섯원목재배", "원목 재배(시설)").replace(":임가", "")});
		categories.push(data[i].itm_nm.replace("(가구)", "").replace("_임가", "").replace("산나물:","").replace("약용작물:","").replace("관상작물:","").replace("유실수:","").replace("(가구)","").replace("시설작물:산나물", "시설재배").replace("약용작물", "시설재배").replace("관상작물","시설재배").replace("표고버섯원목재배(노지):임가","접종(노지)").replace("표고버섯 톱밥배지재배", "톱밥 배지(시설)").replace("표고버섯원목재배", "원목 재배(시설)").replace(":임가", ""));
	}
	
	$forestryDash.forestryHighcharts = Highcharts.chart(target, {
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
			allowDecimals: true,
			lineWidth: 0,
			  gridLineWidth: 0,
			  minorGridLineWidth: 0,
	        max: max + (max*.15),
	        title: {
	            text: null
	        },
			labels: {
                formatter: function () {
                    return Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, ""))/1000+"K";
                }            
            }
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
				states:{
					select:{
						color:'rgb(87, 101, 116)'
					}
				},
            	borderWidth: 0,
				cursor: 'pointer',
	            pointWidth: 32,
				stacking: 'normal',
				dataLabels: {
	                enabled: true,
        			inside: false,
					formatter:function(){return numberFormat(this.y)},
	                style: {
	                    fontWeight: '100',
	                    color: "#333",
						fontFamily: 'NanumSquare',
						textOutline: "2px white"
	                }
	            },
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
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 "+this.name+"</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							if(!this.selected) $forestryDash.deselectAllHighcharts();
							let d = data[this.index];
							if(d.itm_cd!="T40"&&d.itm_cd!="T42"&&d.itm_cd!="T44"){
					    		d.itm_nm = d.itm_nm.replace("(가구)", "").replace("_임가", "").replace("산나물:","").replace("약용작물:","").replace("관상작물:","").replace("유실수:","").replace("(가구)","").replace("표고버섯원목재배(노지):임가","접종(노지)").replace("표고버섯 톱밥배지재배", "톱밥 배지(시설)").replace("표고버섯원목재배", "원목 재배(시설)")
					    	} else {
					    		d.itm_nm = d.itm_nm.replace("(가구)", "").replace("_임가", "").replace("산나물:","").replace("약용작물:","").replace("관상작물:","").replace("유실수:","").replace("(가구)","").replace("시설작물:산나물", "시설재배").replace("약용작물", "시설재배").replace("관상작물","시설재배");
					    	}
							var title = "임산물 재배 작물별 임가 (" + d.itm_nm+")"; 
							
							$forestryDash.ui.chartItmClick($(this), data[this.index], "#576574", $totSurvMain.ui.selectedYear+"년 "+title,'',3);
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
			type: 'column',
	        data: chartData
	    }]
	});
	   
	 $forestryDash.highcharts.push($forestryDash.forestryHighcharts);
    
}
//deselectall highcharts
$forestryDash.deselectAllHighcharts = function(){
	$forestryDash.highcharts.forEach(function(chart){
		if(!chart||!chart.series) return;
		chart.series.forEach(function(s){
			s.data.forEach(function(point){
		        point.select(false);
		      });
		});
	});
}

//증감율 계산
function forestryRatioCalculation(thisData, beforeData){
	var ratio = 0;
	if(thisData == undefined || thisData == null || thisData == '0'){
		ratio = 100
	} else if(beforeData == undefined || beforeData == null || beforeData == '0') {
		ratio = -100
	} else {
		ratio = (thisData - beforeData) / beforeData * 100;
	}
	
	return ratio.toFixed(2);
}
