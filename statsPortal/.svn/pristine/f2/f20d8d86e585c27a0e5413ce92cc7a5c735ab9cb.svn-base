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
	W.$farmDash = W.$farmDash || {};
	
	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$farmDash.servMappring = {
		FS0600:{2020:'DT_1AG20104'},
		FS0010:{2015:'DT_1AG15102',2010:'DT_1AG102',},
		FS0013:'DT_1AG15103'
	};
	$farmDash.isDev = true;
	$farmDash.ajax = {};
	/* 공공데이터 조회 변수*/
	$farmDash.org_id = "";
	$farmDash.tbl_id = "";
	$farmDash.kosis_data_item = "";
	$farmDash.kosis_data_period = "";
	$farmDash.kosis_data_year = "";
	$farmDash.gis_se = "";
	$farmDash.obj_var_id = "";
	$farmDash.field_id = "";
	$farmDash.kosis_data_item_detail = "";
	
	$farmDash.kosis_result_data = [];
	$farmDash.highcharts = [];
	//현재 그려진 d3의 데이터를 담는 변수
	$farmDash.ownerKindFarmLand = {};
	$farmDash.ownerKindFarmFacility = {};
	$farmDash.farmSaleData = {};
	$farmDash.ownerFarmScale = {};
	$farmDash.ownerAgeCal = {};
	$farmDash.ownerCareer = {};
	
	
	//현재 조회하고있는 rank 지역 level
	$farmDash.regionLevel = 'sido';
	//행정시도 정보를 담아둔다
	$farmDash.atdrc = '';	
	//비자치구에서 행정시로 이동여부
	$farmDash.upperBack = false;
//	$farmDash.noReverseGeoCode = true;
	
	$(document).ready(function() {
		  
	});
	
	//d3 반응형 이벤트
	$(window).resize( function(){
		if($totSurvMain.ui.pageIndex == '4' && !$(".mapExport").hasClass('on')){
			// 경영형태별 농가
			//if($('#farmLand').hasClass("on")){ // 2020-11-17 [곽제욱] 노지, 시설 합계데이터 수정 START
			if($farmDash.ownerKindFarmLand.length > 0){
				farmPieChart($farmDash.ownerKindFarmLand, "Y", "285");
			}
			/*else if($('#farmFacility').hasClass("on")){
				if($farmDash.ownerKindFarmFacility.length > 0){
					farmPieChart($farmDash.ownerKindFarmFacility, "Y", "285");
				}
			}*/
			// 2020-11-17 [곽제욱] 노지, 시설 합계데이터 수정 END
			
			// 농축산물 판매금액별 농가
			if($farmDash.farmSaleData.length > 0){
				setFarmPayChart($farmDash.farmSaleData,"farmPay","Y","285");
			}
			
			// 경영주 규모별 농가
			if($farmDash.ownerFarmScale.length > 0){ 
				setFarmScaleChart($farmDash.ownerFarmScale, "ownerScale", "Y", "225");
			}
			
			// 경영주 연령별 농가
			if($farmDash.ownerAgeCal.length > 0){ 
				setFarmAgeCalChart($farmDash.ownerAgeCal, "all2", "Y", "145");
			}
			
			// 경영주 경력기간별 농가
			if($farmDash.ownerCareer.length > 0){
				setOwnerCareerChart($farmDash.ownerCareer, "all1", "Y", "135");
			}
			
			if($totSurvMain.ui.chartTarget != ""
				&& typeof($totSurvMain.ui.chartIndex) == "number"
				&& $totSurvMain.ui.chartColor != ""){
				 
				$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
			}
		}else if($totSurvMain.ui.pageIndex == '4' &&$(".mapExport").hasClass('on')){
			$(".map-col-SubL").width($(window).width()-430);
			$(".map-col-SubL").height("825px"); 
			
			// 최초지도
			$("#worldMap").width("1480px");
			$("#worldMap").height("800px"); 
							
			$("#mapArea").width($(window).width()-430);
			$("#mapArea").height("800px"); 
			
			// 맵 사이즈
			$('#mapRgn_farm').width($(window).width()-430);
			$('#mapRgn_farm').height("800px"); 
		}
	});
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {});

	$farmDash.const = {},
	
	$farmDash.ui = {
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
			if($totSurvMain.ui.selectedYear == "2020"){
				$totSurvMap.ui.selectedSurvId = "FS0600";								    				
			}else if($totSurvMain.ui.selectedYear == "2015"){
				$totSurvMap.ui.selectedSurvId = "FS0013";								    				
			} else if($totSurvMain.ui.selectedYear == "2010"){
				$totSurvMap.ui.selectedSurvId = "FS0315";
			}
			$totSurvMap.ui.selectedItmCd = "T00";
			//20201120 박은식 초기화 추가 END
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/farmDash/main");
		},
		
		ready : function(){
			
			// 전체 화면 reload
			//20201104 박은식 화면 초기화 시 조건 추가 START
			if($totSurvMain.ui.selectedArea=="" || $totSurvMain.ui.selectedArea=="00" || $totSurvMain.ui.selectedArea=="99"){ 
				$totSurvMain.ui.selectedArea = "00";
				$totSurvMain.ui.selectedLevel = "0"; // 2020-11-02 [곽제욱] url paramter 추가로 인한 selectedLevel 세팅
			} 
			//20201104 박은식 화면 초기화 시 조건 추가 END
			
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
					$totSurvMap.ui.mapToggleId = gv_sido_cd+gv_sgg_cd;
					$totSurvMain.ui.getSidoSggPos(gv_sido_cd+gv_sgg_cd);
					$("#dash_sido").val(gv_sido_cd);
				} else {
					$totSurvMain.ui.getSidoSggPos(gv_sido_cd);
				}
				$totSurvMain.ui.selectedArea = gv_sido_cd + gv_sgg_cd;
			} 
			if($totSurvMain.ui.selectedYear == "2020"){
				$totSurvMap.ui.selectedSurvId = "FS0600";								    				
			}else if($totSurvMain.ui.selectedYear == "2015"){
				$totSurvMap.ui.selectedSurvId = "FS0013";								    				
			} else if($totSurvMain.ui.selectedYear == "2010"){
				$totSurvMap.ui.selectedSurvId = "FS0315";
			}
			//$totSurvMain.ui.selectedArea = '00';
			$totSurvMap.ui.selectedItmCd = "T00"; // 2020-11-17 [곽제욱] 농가 명에서 가구수로 변경
			$totSurvMap.ui.selectedC1    = "000";
			if(gv_year != "") {
				$totSurvMain.ui.selectedYear = gv_year;
			}
			
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
			
			$farmDash.event.allChange($totSurvMain.ui.selectedArea, "1");
		},
		
		/**
		 * @name         : clear
		 * @description  : 농업총조사 depth 변화시마다 화면 초기화(각 화면을 로딩)
		 * @date         : 2020.10.26
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		clear : function(){
			//20201120 박은식 초기화 추가 START
			$totSurvMain.ui.chartSaveClear();
			$totSurvMap.ui.selectedSurvId = "FS0600";
			$totSurvMap.ui.selectedItmCd = "T00";
			//20201120 박은식 초기화 추가 END
			$("#ownerAge").empty();
			$("#ownerEducat").empty();
			$("#houseFarm").empty();
			$("#all2").empty();
			$("#all1").empty();
		},
		
		drawContent : function(surv_id, itm_cd, c1, c2){
			
			if(surv_id == null|| surv_id == "" || surv_id == undefined){
				if($totSurvMain.ui.selectedYear == "2010"){
					$totSurvMap.ui.selectedSurvId = "FS0315"; // 인구같은경우 디폴트
				}else if($totSurvMain.ui.selectedYear == "2015"){
					$totSurvMap.ui.selectedSurvId = "FS0013"; // 인구같은경우 디폴트
				}else {
					$totSurvMap.ui.selectedSurvId = "FS0600"; // 인구같은경우 디폴트
				}
			} else {
				$totSurvMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트
			}
			
			if(itm_cd==null||itm_cd==""||itm_cd==undefined){
				$totSurvMap.ui.selectedItmCd = "T00"; // 2020-11-17 [곽제욱] 농가 명->가구로 변경
			} else {
				$totSurvMap.ui.selectedItmCd = itm_cd;
			}
			//20201127 박은식 C1 코드 셋팅 로직 추가 START
			if(c1 == null || c1 == "" || c1 == undefined){
				$totSurvMap.ui.selectedC1 = "000"
			} else {
				$totSurvMap.ui.selectedC1 = c1;
			}
			//20201127 박은식 C1 코드 셋팅 로직 추가 END
			$totSurvMap.ui.selectedC2 = c2;
			
			if($totSurvMain.ui.selectedArea.length==2){
				$totSurvMapnoReverseGeoCode = true;
				if($totSurvMap.ui.map==null || $("#mapRgn_farm").html() == ""){// 20201104 박은식 같은 대시보드 매뉴를 다시 클릭시 맵을 다시그려주기 위해 조건문 추가
					$("#mapRgn_farm").show();
					$totSurvMap.ui.createMap("mapRgn_farm", 0);
					$("#mapRgn_farm").css("height", "590px");
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
				if($totSurvMap.ui.map==null){
					$("#mapRgn_farm").show();
					$totSurvMap.ui.createMap("mapRgn_farm", 0);
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
			$("#grid_lg_color_0").attr("data-color", "#CB5B1B").attr("start-color", "#F5A020").text("#CB5B1B").css("background", "#CB5B1B");
			//20202124 박은식 범례 추가 END			
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
				return;
			}
			
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 START
			if(regionCd.length == 5){
				$totSurvMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
			}
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 END
			
			/**행정시 처리 로직 (테스트)*/
			if($totSurvMap.ui.isAtdrc || $("#totalFarm_rank").attr('max') == $totSurvMain.ui.atdrcRank){
				//현재 행정시도정보를 저장한다. 
				//비자치구와 행정시의 4자리수까지는 같다는 점을 이용한다
				$farmDash.atdrc = $totSurvMain.ui.selectedArea.substring(4,0);
			}
			
			
			/**행정시 처리 로직 (테스트)*/
			
			var param = {};
//			if((target == "total_rank" && rank == $("#"+target).val()) || (rank == '' && rank == null && rank == undefined)){
//			 return true;	
//			}
			var type = 'total';
			var level = 'sido';

			if($totSurvMain.ui.selectedArea.length == 2){
				lavel = 'sido'
			} else if(($totSurvMain.ui.selectedArea.substring(4) != '0' && $farmDash.atdrc == $totSurvMain.ui.selectedArea.substring(4,0)) 
					   ){
				level = 'atdrc'// atdrc
			} else {
				level ='sgg'
			}

			var year = $totSurvMain.ui.selectedYear;
			if(rank != null && rank != '' && rank != undefined){
				if(target == 'totalFarm_rank' || target == "" || target == null){ //총인구, 남여비율, 외국인 중 어떤 기준으로 랭크를 조회 했는지와 디폴트값 설정
					type = 'totalFarm';
				} else if(target == 'gender_rank'){
					type = 'gender';
				} else{
					type = 'totalFarm';
				}
				
				srvLogWrite('P0','06','04','02',$totSurvMain.ui.selectedThema,'regionCd='+regionCd+",year="+year+",rank="+rank+",type="+type);
				param = {year : year, type : type, rank : rank, level : level}
			} else if(regionCd != null && regionCd != '' && regionCd != undefined){
				param = (level == 'atdrc') ? {year : year, regionCd : regionCd, level : level} :  {year : year, regionCd : regionCd, level : level} 
			} else {
				return false;
			}
			
			$totSurvMain.ui.getSidoSggPos(regionCd);
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/farmDash/getTotFarmRank.json",
				data: param, 
				dataType: "json",
				success: function(res) {
					/**range value setting */
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						//var genderList = res.result.oldFarmData[0];
						var totalFarmList = res.result.totalFarmData[0];
					}
					var region_cd = totalFarmList.region_cd;
		
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
					
					$totSurvMain.ui.getSidoSggPos(region_cd);
					if(regionCd!=""){
						$("#dash_sido").val(regionCd.substring(0,2));
					}
					
					var sido = region_cd.substring(0,2);
					var sgg = region_cd.substring(2,5);
					if(sgg=="" || sgg==null){
						sgg = "999";
					}

					if(target != '' && target != null){
						/** 2020-09-22 [곽제욱] 맵토글id 초기화 */
						//$totSurvMap.ui.mapToggleId = "";
						/** set Area */
						$totSurvMain.ui.selectedArea = region_cd;
						/** init chart */
						$farmDash.ui.clear();
						
						/** chart renderer */
						if(region_cd.length == 2){
				    		$("#dash_sido option[value='"+region_cd+"']").attr("selected", "true");
				    		if(region_cd != '00' && region_cd != '99'){
				    			$("#dash_sgg option[value='999']").attr("selected", "true");
				    		}
				    		$totSurvMain.ui.tileChangeYn = "Y"; 
				    		$totSurvMain.ui.selectedLevel = "1";
				    		$farmDash.event.allChange(region_cd, "1");
				    	}
				    	// 시군구 데이터 일 경우 kosis정보 호출
						/** 2020-09-21 [곽제욱] 시군구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    	else if(region_cd.length == 5){
				    		var tempRegionCd = region_cd.substring(0,4)+"0";
				    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);								    		
				    		if($totSurvMap.ui.isAtdrc != true){
				    			// sidosgg() 시군구 세팅 로직 추가필요
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMap.ui.mapToggleId = region_cd;
				    			$farmDash.event.allChange(region_cd, "1");
				    			//$totSurvMapApi.request.openApiSearchPopulation(region_cd); // 2020-09-21 주석처리
				    		}
				    		/** 2020-09-21 [곽제욱] 비자치구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    		else{
				    			$totSurvMap.ui.mapToggleId = ""; //2020-10-14 [곽제욱] 자치구 이동관련하여 토글아이디 초기화 
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			console.log("#########################   비자치구 클릭됨     ##############");
				    			$farmDash.event.allChange(region_cd, "1");
				    		}
				    	}
					}
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						$farmDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,"","",totalFarmList.rank, $totSurvMap.ui.mapToggleId);
					} else {
						$farmDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,'0','0','0', '');
					}
					//비자치구 일 경우 행정시도로 이동하는 로직
					if($farmDash.upperBack == true){
						$totSurvMap.ui.checkIsAtdrc(region_cd);	
						$totSurvMain.ui.selectedArea = region_cd
						$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
						$totSurvMap.ui.mapRegion = "sgg";
						$farmDash.event.allChange(region_cd,"1")
					}
				},
				error: function(){
					
				}
			})
			$farmDash.upperBack = false;
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
		 * 				 farmRatio	: 농가대비 rank(랭크데이터 사용불가)
		 * 				 oldFarm : 고령농가 rank(랭크데이터 사용불가)
		 * 				 totalFarm: 총농가 rank
		 */
		rankSlideRender : function(regionCd, farmRatio, oldFarm, totalFarm, toggleId){
			$totSurvMain.ui.tileChangeYn = "Y";
			// 시도이동, 시군구이동의 경우
			if($totSurvMain.ui.selectedArea.length == 2){
				// 그중 시군구 이동(지도에는 시군구 레벨로 표출, 선택지역 하이라이트 처리)
				if(toggleId.length == 5){
					$farmDash.regionLevel = 'sgg';
					$("#totalFarm_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#totalFarm_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$totSurvMap.ui.mapToggleId = toggleId;
					$farmDash.event.allChange(toggleId, "2");
				} else {
					$farmDash.regionLevel = 'sido';
					$("#totalFarm_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#totalFarm_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
				}
			} else if($totSurvMain.ui.selectedArea.substring(4) != '0') {
				if($totSurvMain.ui.atdrcRank != 0) {
					$farmDash.regionLevel = 'atdrc'
					$("#totalFarm_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#totalFarm_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
				} else {
					$("#totalFarm_range").hide();
				}
			} else if($("#total_rank").attr("max") != $totSurvMain.ui.atdrcRank || $farmDash.upperBack == false){
				$farmDash.regionLevel = 'sgg';
				$("#totalFarm_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#totalFarm_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			}  else {
				$farmDash.regionLevel = 'sgg';
				$("#totalFarm_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#totalFarm_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			}
			
			if($totSurvMain.ui.selectedArea.length == 2){
				var areaTitle = $("#dash_sido option:selected").html();
			}else if($totSurvMain.ui.selectedArea.length == 5){
				var areaTitle = $("#dash_sgg option:selected").html();
			} 
			
			if($totSurvMain.ui.selectedArea == "00" || $totSurvMain.ui.selectedArea == "99" || $totSurvMain.ui.selectedArea == ""){
				var areaTitle = "전국";
			}
			$("#totFarmRatioRtRanking").html(areaTitle +" "+ "전주기 대비 농가 수");
			$("#oldRtRanking").html(areaTitle + " 농가 인구 중 고령인구");
			$("#totalFarmRanking").html(areaTitle + " 농가 인구");
			
			$("#totalFarm_rank").val(totalFarm);
			$("#totalFarm_range").find("span").eq(2).text(totalFarm+"번째");
			$("#totalFarm_rank").css('background','linear-gradient(to right, #2FBFDC  0%, #2FBFDC  ' + ((100/($("#totalFarm_rank").attr("max")-1))*($("#totalFarm_rank").val()-1)) + '%, #fff ' + ((100/($("#totalFarm_rank").attr("max")-1))*($("#totalFarm_rank").val()-1)) + '%, white 100%)');
			$("#rangeV3").find('span').eq(0).text($("#totalFarm_rank").val()+"번");
			$("#rangeV3").offset({left:133+((100/($("#totalFarm_rank").attr("max")-1))*($("#totalFarm_rank").val()-1)/100*($("#totalFarm_rank").outerWidth()-20)), top:$("#totalFarm_rank").offset().top-30}) // 843
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
			/*
			$("#total_rank").val(0);
			$("#gender_rank").val(0);
			*/
			$("#totalFarm_rank").val(0);
			$farmDash.ui.rankSlideRender("00", 0,0,0, "");
			
			
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
		chartItmClick : function(obj, d, color, contents, chartType){
			
			var params = 'year='+$totSurvMain.ui.selectedYear+',region_cd='+$totSurvMain.ui.selectedArea.substring(0,4)+"0";
			params+= ',itm_cd='+d.itm_cd+',surv_id='+d.surv_id;
			
			
			if( chartType == 1 ){
				srvLogWrite('P0','06','05','01',$totSurvMain.ui.selectedThema,params); //경영형태별 농가
			} else if( chartType == 2 ){
				srvLogWrite('P0','06','05','02',$totSurvMain.ui.selectedThema,params); //농축산물 판매금액별 농가
			} else if( chartType == 3 ){
				srvLogWrite('P0','06','05','03',$totSurvMain.ui.selectedThema,params); //경영주 규모별 농가
			} else if( chartType == 4 ){
				srvLogWrite('P0','06','02','00',$totSurvMain.ui.selectedThema,params); //경영주 연령별 농가
			} else if( chartType == 5 ){
				srvLogWrite('P0','06','03','00',$totSurvMain.ui.selectedThema,params); //경영주 경력기간별 농가
			}
			
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
		    		
		    		if($totSurvMain.ui.selectedYear == "2020"){  			
		    			$farmDash.ui.drawContent("FS0600", "T00", "000");
		    		} else if($totSurvMain.ui.selectedYear == "2015"){
		    			// 2020.11.10 [주형식] 명 -> 가구로 변경
		    			//$farmDash.ui.drawContent("FS0013", "T01", "000");	    			
		    			$farmDash.ui.drawContent("FS0013", "T00", "000");
		    		}else{
		    			// 2020.11.10 [주형식] 명 -> 가구로 변경
		    			// $farmDash.ui.drawContent("FS0315", "T01", "000");
		    			$farmDash.ui.drawContent("FS0315", "T00", "000");
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
					$totSurvMap.ui.selectedObj.attr("fill", $totSurvMain.ui.selectedTempColor)
				}
				// 타일맵 변경여부 N
				$totSurvMain.ui.tileChangeYn = "N";
				var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
	    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);		
	    		if($totSurvMap.ui.isAtdrc){
	    			$totSurvMap.ui.mapToggleId = "";
	    		}
				// 맵 그리기
				$farmDash.ui.drawContent(d.TBL_ID, d.CHAR_ITM_ID, d.OV_L2_ID, d.OV_L3_ID);
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
				$("#itmDiv").html(title);
			} else {
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
	    		
	    		if($totSurvMain.ui.selectedYear == "2020"){   			
	    			$farmDash.ui.drawContent("FS0600", "T00", "000");
	    		} else if($totSurvMain.ui.selectedYear == "2015"){
	    			// 2020.11.10 [주형식] 명 -> 가구로 변경
	    			//$farmDash.ui.drawContent("FS0013", "T01", "000");	    			
	    			$farmDash.ui.drawContent("FS0013", "T00", "000");
	    		}else{
	    			// 2020.11.10 [주형식] 명 -> 가구로 변경
	    			// $farmDash.ui.drawContent("FS0315", "T01", "000");
	    			$farmDash.ui.drawContent("FS0315", "T00", "000");
	    		}
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
			if(screenWidth <= (Number(d3.event.pageX) + 250)){
				$(target).css("left", screenWidth -270 + "px")
				$(target).css("top", d3.event.pageY + y - 20 + "px")
			} else {
				$(target).css("left", d3.event.pageX + x + "px")
				$(target).css("top", d3.event.pageY + y + "px")
			}
			$(target).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year+ "년 "+ title.replace('(가구)', '').replace('-', ' ').replace('_', ' ') + standard + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ data + "</p>" + unit);
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
//		console.log(" org_id = " + tmp[1].split("&")[0]);
//		console.log(" list_id = " + tmp[2].split("&")[0]);
//		console.log(" title = " + title);
//		console.log(" gis_se = " + gis_se);
		
		$farmDash.org_id = tmp[1].split("&")[0];
		$farmDash.tbl_id = tmp[2].split("&")[0];
		//$farmDash.gis_se = gis_se;
		
		if(!$farmDash.isDev){
			
			var kosisDetailOption = new kosis.serviceApi.kosisDetailOption.api();
			kosisDetailOption.addParam("org_id", $farmDash.org_id);
			kosisDetailOption.addParam("list_id", $farmDash.tbl_id);
			
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
			//url : "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do?org_id=101&list_id=DT_1JC1501&title=%EA%B0%80%EA%B5%AC%ED%98%95%ED%83%9C%EB%B3%84+%EA%B0%80%EA%B5%AC+%EB%B0%8F+%EA%B0%80%EA%B5%AC%EC%9B%90+-+%EC%9D%8D%EB%A9%B4%EB%8F%99%282015%29%2C+%EC%8B%9C%EA%B5%B0%EA%B5%AC%282016~%29&gis_se=3",
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do";
			lv_url += "?org_id="+ $farmDash.org_id;
			lv_url += "&list_id="+ $farmDash.tbl_id;
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
				
				$farmDash.obj_var_id = resultData[0].obj_var_id;
				$farmDash.field_id = resultData[0].field_id;
				
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
		
		if(!$farmDash.isDev){
			// 운영 호출 
		}
		else{
			
			// hshs 테스트용
//			if($totSurvMap.ui.map==null){
//				$totSurvMap.ui.createMap("mapRgn_farm", 0);
//			}
			
			var map = $totSurvMap.ui.map;
			map.selectedBoundMode = "multi";
			
			
			/*
			 *  org_id: 101
				tbl_id: DT_1IN1502
				obj_var_id: A
				field_id: OV_L1_ID
				> kosis_data_item_detail:  
				> kosis_data_item: T100
				> kosis_data_period: Y
				 kosis_data_year: 2015
				gis_se: 34370
			 */
			
			//url 파라미터 세팅
			//url : "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do?org_id=101&tbl_id=DT_1B26001_A01&kosis_data_item_detail=%20&kosis_data_item=T10&kosis_data_period=M&kosis_data_year=202007&gis_se=34&obj_var_id=A&field_id=OV_L1_ID",
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
			lv_url += "?org_id="+ $farmDash.org_id;
			lv_url += "&tbl_id="+ $farmDash.tbl_id;
			lv_url += "&kosis_data_item_detail=" + "%20";
			lv_url += "&kosis_data_item=" + "T100";
			lv_url += "&kosis_data_period=" + "Y";
			//lv_url += "&kosis_data_year=" + $totSurvMain.ui.selectedYear;
			lv_url += "&kosis_data_year=" + "2015";
			//lv_url += "&atdrc_yn=Y";
			//lv_url += "&gis_se="+ $farmDash.gis_se;
			// 선택된 구(5자리)로 설정
			console.log("$totSurvMain.ui.selectedArea = " + $totSurvMain.ui.selectedArea);
			if($totSurvMain.ui.selectedArea != null && $totSurvMain.ui.selectedArea.length == 5){
				lv_url += "&gis_se="+ $totSurvMain.ui.selectedArea;
			}
			else{
				lv_url += "&gis_se="+ "25030";
			}
			lv_url += "&obj_var_id=" + $farmDash.obj_var_id;
			lv_url += "&field_id=" + $farmDash.field_id;
			
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
				alert("KOSIS 지역정보 정보가 없는 시도입니다.");
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
				/*
				 * res = {"id":"9008","result":{"kosisData":[{"PRD_DE":"2015","NAME":"고덕면","UNIT":"명","RN":"1","TBL_ID":"DT_1IN1502","DATA":"4953","ORG_ID":"101","CODE":"3437038"},{"PRD_DE":"2015","NAME":"광시면","UNIT":"명","RN":"2","TBL_ID":"DT_1IN1502","DATA":"3232","ORG_ID":"101","CODE":"3437033"},{"PRD_DE":"2015","NAME":"대술면","UNIT":"명","RN":"3","TBL_ID":"DT_1IN1502","DATA":"2658","ORG_ID":"101","CODE":"3437031"},{"PRD_DE":"2015","NAME":"대흥면","UNIT":"명","RN":"4","TBL_ID":"DT_1IN1502","DATA":"1882","ORG_ID":"101","CODE":"3437034"},{"PRD_DE":"2015","NAME":"덕산면","UNIT":"명","RN":"5","TBL_ID":"DT_1IN1502","DATA":"7173","ORG_ID":"101","CODE":"3437036"},{"PRD_DE":"2015","NAME":"봉산면","UNIT":"명","RN":"6","TBL_ID":"DT_1IN1502","DATA":"2829","ORG_ID":"101","CODE":"3437037"},{"PRD_DE":"2015","NAME":"삽교읍","UNIT":"명","RN":"7","TBL_ID":"DT_1IN1502","DATA":"7641","ORG_ID":"101","CODE":"3437012"},{"PRD_DE":"2015","NAME":"신암면","UNIT":"명","RN":"8","TBL_ID":"DT_1IN1502","DATA":"4147","ORG_ID":"101","CODE":"3437039"},{"PRD_DE":"2015","NAME":"신양면","UNIT":"명","RN":"9","TBL_ID":"DT_1IN1502","DATA":"3173","ORG_ID":"101","CODE":"3437032"},{"PRD_DE":"2015","NAME":"예산읍","UNIT":"명","RN":"10","TBL_ID":"DT_1IN1502","DATA":"36493","ORG_ID":"101","CODE":"3437011"},{"PRD_DE":"2015","NAME":"오가면","UNIT":"명","RN":"11","TBL_ID":"DT_1IN1502","DATA":"4819","ORG_ID":"101","CODE":"3437040"},{"PRD_DE":"2015","NAME":"응봉면","UNIT":"명","RN":"12","TBL_ID":"DT_1IN1502","DATA":"2747","ORG_ID":"101","CODE":"3437035"}]},"errMsg":"Success","errCd":0,"trId":"BGGJ_9008_1599013327860"}
				 */
				var result = res.result.kosisData;
				
				var isResult = false;
				
				console.log("getKosisDataList result size = " + result.length);
				/**
				 *  조회된 코드가 읍면동 인지 확인한다. 읍면동정보가 없을시 시군구 정보를 넘겨줌.
				 */
				if(result.length > 0){
//					for (var i=0; i<result.length; i++) {
						// CODE 확인
						if((result[0].CODE).length == 2){
							alert("조회된 정보가 없습니다.")
							return false;
						}
						else if((result[0].CODE).length > 5){
							if((result[0].CODE).startsWith(admCd)){
								isResult = true;
							}
							else{
								alert("조회된 정보가 없습니다.");
								return false;
							}
						}
//					}
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
					$farmDash.kosis_result_data = [];
					$farmDash.kosis_result_data = result;
					
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
//		if(interactiveMapKosis.pAdmCd == "1") {
//			interactiveMapKosis.pAdmCd = "00";
//		}
//		tempData.pAdmCd = interactiveMapKosis.pAdmCd;
		this.map.data.push(tempData);
		
		this.map.data.push($farmDash.kosis_result_data);
		this.map.dataType = "kosis";
		this.map.dataForCombine = $farmDash.kosis_result_data;
		
		var yearArr = [];
		var options = $('#bndYear option');
		var values = $.map(options ,function(option) {
			yearArr.push(option.value);
		});
		
		var yearMax = Math.max.apply(null, yearArr);
		var yearMin = Math.min.apply(null, yearArr);
		
		var year = $farmDash.kosis_data_year;
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
		$farmDash.kosis_result_data = tempData;
		
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
	

	$farmDash.util = {};
	
	$farmDash.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$farmDash.event.setUIEvent() called.");
			
			var body = $("body");
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 start*/
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#totalFarm_rank", function(e){
			//2020.09.10[신예리] 슬라이드 컬러 수정
				$totSurvMain.ui.chartTarget = "";
	    		$totSurvMain.ui.chartIndex = "";
	    		$totSurvMain.ui.chartData = "";
	    		$totSurvMain.ui.chartColor = "";
	    		$totSurvMain.ui.chartTitle = "";
	    		$totSurvMap.ui.selectedObj[0] = "";
				this.style.background = 'linear-gradient(to right, #029be6  0%, #029be6  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
				$(this).parent().find('span').eq(2).text(this.value+"번째");
				//$("#rangeV3").find('span').eq(0).text(this.value+"번");
				$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#totalFarm_rank").outerWidth()-20)), top:$("#totalFarm_rank").offset().top-30})
			})
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 end*/
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 start*/
			body.on("mouseup", "#totalFarm_rank", function(){
				$farmDash.ui.getRankSet(this.value, this.id, "");
			})
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 end*/
			
			if($totSurvMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			$farmDash.ui.getRankSet("", "",$totSurvMain.ui.selectedArea);
			
			/** 각 차트 영역 클릭시 tileMap 과 지도 변경 (현재는 계만 조회, 각 막대별 클릭일경우 함수 변경 필요 */
			
			/** 맵 선택 - 안보이게 설정*/
			$(".select").hide();
			
			// 개방형지도란 버튼 활성화/비활성화
			$(".mapInfo").hide();	
			
			/** 맵 최대크기 */
			$(".mapExport").on("click", function(){
				
				srvLogWrite('P0','01','04','02',$totSurvMain.ui.selectedThema,( $(".mapExport").hasClass("on") ? "작게" : "크게" ) );
				
				if($(".mapExport").hasClass("on")) {
//					alert("큰화면 -> 작은화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					$(".mapExport").removeClass("on");
					
					$("#ownerFarmDiv").show();
					$("#farmPayDiv").show();
					$("#ownerScaleDiv").show();
					$("#Allcount01").show();
					$("#Allcount00").show();
					$("#ownerKindFarm").width("100%")
					$("#farmPay").width("100%")
					$("#ownerScale").width("100%")
					$("#all2").width("100%")
					$("#all1").width("100%")
					
					
					if($totSurvMain.ui.selectedLevel=="0"){
						$(".Rangecontainer").css("display", "none");						
					} else if($totSurvMain.ui.selectedLevel=="1"){
						$(".Rangecontainer").css("display", "inline-block");
					} else if($totSurvMain.ui.selectedLevel=="2"){
						$(".Rangecontainer").css("display", "inline-block");
					} else if($totSurvMain.ui.selectedLevel=="3"){
						$(".Rangecontainer").css("display", "inline-block");
					}
					
					// 지도 크기 설정
					$(".col-SubL").width("");
					$(".col-SubL").height("614"); //2020.09.16[신예리] 영역 맞춤

					$("#mapArea").width("");
					$("#mapArea").height("100%"); // 2020.09.10[신예리] 맵 버튼 위치 조정으로 인한 height 값 수정
					
					// 맵 사이즈
					$('#mapRgn_farm').width("");
					$('#mapRgn_farm').height("590");
					
					$("#mapArea").width("");
					$("#mapArea").height("100%"); // 2020.09.10[신예리] 맵 버튼 위치 조정으로 인한 height 값 수정
					
					if($totSurvMap.ui.map != null){
						$totSurvMap.ui.map.update();
					}
					
					// 경영주 연령별 농가
					if($farmDash.ownerAgeCal.length > 0){
						setFarmAgeCalChart($farmDash.ownerAgeCal, "all2", "N", "145");
					}
					
					
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
				}
				else{
//					alert("작은화면 -> 큰화면");
					$(".mapExport").addClass("on");
					
					$("#ownerKindFarm").outerWidth($("#ownerFarmDiv").find("svg").outerWidth());
					$("#farmPay").outerWidth($("#farmPayDiv").find("svg").outerWidth());
					$("#ownerScale").outerWidth($("#ownerScaleDiv").find("svg").outerWidth());
					$("#all2").outerWidth($("#Allcount01").find("svg").outerWidth());
					$("#all1").outerWidth($("#Allcount00").find("svg").outerWidth());
					
					$("#ownerFarmDiv").hide();
					$("#farmPayDiv").hide();
					$("#ownerScaleDiv").hide();
					$("#Allcount01").hide();
					$("#Allcount00").hide();
					
					
					// 지도 크기 설정
					$(".col-SubL").width("1495");
					$(".col-SubL").height("825"); //2020.09.15 [신예리] height 값 수정
					
					// 최초지도
					$("#worldMap").width("1480");
					$("#worldMap").height("800"); //2020.09.15 [신예리] height 값 수정
									
					$("#mapArea").width("1495");
					$("#mapArea").height("800"); //2020.09.15 [신예리] height 값 수정
					
					// 맵 사이즈
					$('#mapRgn_farm').width("1495");
					$('#mapRgn_farm').height("800"); //2020.09.15 [신예리] height 값 수정
					
					$totSurvMap.ui.map.update();
				}
				
			});
			
			/** 맵 확대 */
			$(".zoom").on("click", function(){
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
//				var to_center = $totSurvMap.ui.map.gMap.getCenter();
//				console.log("to_center = " + to_center);
				$totSurvMap.ui.getCenterToAdmCd($totSurvMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) {
						$totSurvMap.ui.map.setZoom((lv_zoom+1));
						
						return;
					}
					$totSurvMain.ui.getSidoSggPos(res.result.sido_cd+res.result.sgg_cd);
					to_sido_cd = $("#dash_sido option:selected").val();
					to_sgg_cd = $("#dash_sgg option:selected").val();
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
					var lv_zoom = $totSurvMap.ui.map.zoom;
					//전국
					if(lv_zoom <= 1) {
						//$totSurvMap.ui.map.setZoom((lv_zoom+1));
						//var to_center = $totSurvMap.ui.map.gMap.getCenter();
						var x = $("#dash_sido option:selected").attr("data-coor-x");
						var y = $("#dash_sido option:selected").attr("data-coor-y");
						$totSurvMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
					}
					//시도
					else if (lv_zoom > 1 && lv_zoom <= sggZoom) { // 2020-10-12 [곽제욱] sggZoom 체크로 변경
						
						//var to_center = $totSurvMap.ui.map.gMap.getCenter();
						var x = $("#dash_sido option:selected").attr("data-coor-x");
						var y = $("#dash_sido option:selected").attr("data-coor-y");
						
						if(lv_zoom == sggZoom && $totSurvMap.ui.mapRegion != "sgg"){ // 2020-10-13 [곽제욱] 고정 줌을 sggZoom과 같으면으로 변경 
							$totSurvMain.ui.selectedLevel =  "1";
							
							// 콤보박스 선택
							$totSurvMain.ui.getSidoSggPos(to_sido_cd);
							
							// 지도 조회
							$totSurvMain.ui.pathChange("sgg", to_sido_cd);
							$totSurvMap.ui.mapRegion = "sgg";
							
							// 데이터 조회
							$farmDash.event.allChange(to_sido_cd, "1");
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
						}
						else{
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
						}
					}
					//시군구
					else if (
							(lv_zoom > 1 && lv_zoom <= sggZoom) 
							|| (lv_zoom > sggZoom && lv_zoom <= 12) 							
					){
						$totSurvMap.ui.map.setZoom((lv_zoom+1));
						$totSurvMain.ui.selectedArea = to_sido_cd + to_sgg_cd;
						$totSurvMap.ui.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,4)+"0")
						
						var to_center = $totSurvMap.ui.map.gMap.getCenter();
						$totSurvMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom+1), false);
						$totSurvMain.ui.selectedLevel =  "2";
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
							$farmDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
						}
						
					}//읍면동
					else if (
							(lv_zoom > 1 && lv_zoom <= 3)
							|| (lv_zoom > 3 && lv_zoom <= 5 )
							|| (lv_zoom > 5 && lv_zoom <= 12 )
					) {
						$totSurvMap.ui.map.setZoom((lv_zoom+1));
						
						var to_center = $totSurvMap.ui.map.gMap.getCenter();
						$totSurvMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom+1), false);
						
					}
					
				});

			});
			
			/** 맵 축소 */
			$(".out").on("click", function(){				
				srvLogWrite('P0','01','04','04',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear);
				
				var lv_zoom = $totSurvMap.ui.map.zoom;
				$totSurvMap.ui.map.setZoom((lv_zoom-1));
				
				if(lv_zoom >= 1){ // 2020-10-13 [곽제욱] zoomlevel 조건절 변경
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
									$farmDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$farmDash.upperBack = true;
									$farmDash.ui.getRankSet("", "sgg", $totSurvMain.ui.selectedArea);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경									
								} else {
									$totSurvMain.ui.selectedLevel =  "1";
									$totSurvMain.ui.selectedArea = to_sido_cd;
									$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$totSurvMain.ui.pathChange("sgg", to_sido_cd);
									$farmDash.upperBack = true;
									$totSurvMap.ui.mapToggleId = "";
									$farmDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$totSurvMap.ui.isAtdrc = false;
									$farmDash.ui.getRankSet("", "sido", to_sido_cd);
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
								$farmDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							}
						}
					});
					
				}				
				 
			});
			
			/** 개방형지도란 이벤트*/
			$(".mapInfo").on("click", function(){
				//alert("개방형지도란?");
				$('.popupWrap').show();
				$('.mapInfo').addClass("on"); // 팝업 표출 될 때 버튼 on 클래스 추가
			});
			
			/** 개방형지도 팝업 닫기 버튼 이벤트 */  
			$(".popcloseBtn").on("click", function(){
				$('.popupWrap').hide();
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
				
				// 경영형태별 농가
				if(selId == "ownerFarmDiv"){
					// 2020-11-17 [곽제욱] 그루핑 해제후 합산데이터 변경으로 인한 로직변경 START
					//if($('#farmLand').hasClass("on")){
					
					var year = $totSurvMain.ui.selectedYear
					if(year == '2015'){
						$farmDash.ownerKindFarmLand = $farmDash.ownerKindFarmLand.slice(0,16);
					}
					
					var chartModelData = [];
					for (var i = 0; i < $farmDash.ownerKindFarmLand.length; i++) {
						var name = $farmDash.ownerKindFarmLand[i].CHAR_ITM_NM.replace('_노지','').replace('_시설','').replace('·','/').replace('경영형태별농가:','');
						if(chartModelData.length){
							if(chartModelData[chartModelData.length-1].itm_nm == name){
								chartModelData[chartModelData.length-1].dt += Number($farmDash.ownerKindFarmLand[i].DTVAL_CO);
							} else {
								chartModelData.push({
									dt : Number($farmDash.ownerKindFarmLand[i].DTVAL_CO),
									c1: $farmDash.ownerKindFarmLand[i].OV_L2_ID,
									c1_nm : $farmDash.ownerKindFarmLand[i].OV_L2_KOR,
									irdsrate : '0',
									itm_cd : $farmDash.ownerKindFarmLand[i].CHAR_ITM_ID,
									itm_nm: name,
								});
							}
						} else {
							chartModelData.push({
									dt : Number($farmDash.ownerKindFarmLand[i].DTVAL_CO),
									c1: $farmDash.ownerKindFarmLand[i].OV_L2_ID,
									c1_nm : $farmDash.ownerKindFarmLand[i].OV_L2_KOR,
									irdsrate : '0',
									itm_cd : $farmDash.ownerKindFarmLand[i].CHAR_ITM_ID,
									itm_nm: name,
							});
						}
					}				
					
					chartModal(chartModelData, 'itm1', 'itm_nm', 'dt', '', '농가', '가구'); //20201202 박은식 파라미터 추가
					//}
					//else if($('#farmFacility').hasClass("on")){
					//chartModal($farmDash.ownerKindFarmFacility, 'itm1', 'itm_nm', 'dt');
					//}
					// 2020-11-17 [곽제욱] 그루핑 해제후 합산데이터 변경으로 인한 로직변경 START
				}
				// 농축산물 판매금액별 농가
				else if(selId == "farmPayDiv"){
					$farmDash.farmSaleData = $farmDash.farmSaleData.slice(0,12);
					chartModal($farmDash.farmSaleData.map(function(value){
						var newValue = {};
						newValue.c1 = value.OV_L2_ID;
						newValue.c1_nm = value.OV_L2_KOR;
						newValue.dt = value.DTVAL_CO;
						newValue.irdsrate = '0';
						newValue.itm_cd = value.CHAR_ITM_ID;
						newValue.itm_nm = value.CHAR_ITM_NM;
				     	return newValue;
					}), 'itm1', 'itm_nm', 'dt', '', '농가', '가구')		
					//chartModal($farmDash.farmSaleData, 'itm1', 'itm_nm', 'dt', '', '농가', '가구'); //20201202 박은식 파라미터 추가
				}
				// 경영주 규모별 농가
				else if(selId == "ownerScaleDiv"){
					$farmDash.ownerFarmScale = $farmDash.ownerFarmScale.slice(0,17)
					chartModal($farmDash.ownerFarmScale.map(function(value){
						var newValue = {};
						newValue.c1 = value.OV_L2_ID;
						newValue.c1_nm = value.OV_L2_KOR;
						newValue.dt = value.DTVAL_CO;
						newValue.irdsrate = '0';
						newValue.itm_cd = value.CHAR_ITM_ID;
						newValue.itm_nm = value.CHAR_ITM_NM;
				     	return newValue;
					}), 'itm1', 'itm_nm', 'dt', '', '농가', '가구')
					//chartModal($farmDash.ownerFarmScale, 'itm1', 'itm_nm', 'dt', '', '농가', '가구'); //20201202 박은식 파라미터 추가
				}
				// 경영주 연령별 농가
				else if(selId == "Allcount01"){
					chartModal($farmDash.ownerAgeCal.map(function(value){
						var newValue = {};
						newValue.c1 = value.OV_L2_ID;
						newValue.c1_nm = value.OV_L2_KOR;
						newValue.dt = value.DTVAL_CO;
						newValue.irdsrate = '0';
						newValue.itm_cd = value.CHAR_ITM_ID;
						newValue.itm_nm = value.CHAR_ITM_NM;
				     	return newValue;
					}), 'itm2', 'itm_nm', 'dt', 't4', '', '농가', '가구')
					//chartModal($farmDash.ownerAgeCal, 'itm2', 'itm_nm', 'dt', 't4', '', '농가', '가구'); //20201202 박은식 파라미터 추가
				}
				// 경영주 경력기간별 농가
				else if(selId == "Allcount00"){
					$farmDash.ownerCareer = $farmDash.ownerCareer.slice(0,5)
					chartModal($farmDash.ownerCareer.map(function(value){
						var newValue = {};
						newValue.c1 = value.OV_L2_ID;
						newValue.c1_nm = value.OV_L2_KOR;
						newValue.dt = value.DTVAL_CO;
						newValue.irdsrate = '0';
						newValue.itm_cd = value.CHAR_ITM_ID;
						newValue.itm_nm = value.CHAR_ITM_NM;
				     	return newValue;
					}), 'itm1', 'itm_nm', 'dt', '', '농가', '가구')
					//chartModal($farmDash.ownerCareer, 'itm1', 'itm_nm', 'dt', '', '농가', '가구'); //20201202 박은식 파라미터 추가
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','08','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				if(selId == "ownerFarmDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0601");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0010");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0312");
					}
				}
				else if(selId == "farmPayDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0602");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0028");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0330");
					}
				}
				else if(selId == "ownerScaleDiv"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0603");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0002");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0304");
					}
				}
				// 경영주 연령별 농가
				else if(selId == "Allcount01"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0604");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0016");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0318");
					}
				}
				// 경영주 경력기간별 농가
				else if(selId == "Allcount00"){
					if($totSurvMain.ui.selectedYear == "2020"){
						getMataDataUrl("FS0605");
					}
					else if($totSurvMain.ui.selectedYear == "2015"){
						getMataDataUrl("FS0017");
					}
					else if($totSurvMain.ui.selectedYear == "2010"){
						getMataDataUrl("FS0319");
					}
				}
			});
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);

				if(selId == "ownerFarmDiv"){
					$totSurvMain.ui.chartImageDown("#ownerFarmDiv", "경영형태별 농가");
				}
				else if(selId == "farmPayDiv"){
					$totSurvMain.ui.chartImageDown("#farmPayDiv", "농축산물 판매금액별 농가");
				}
				else if(selId == "ownerScaleDiv"){
					$totSurvMain.ui.chartImageDown("#ownerScaleDiv", "경영주 규모별 농가");
				}
				else if(selId == "Allcount01"){
					$totSurvMain.ui.chartImageDown("#Allcount01", "경영주 연령별 농가");
				}
				else if(selId == "Allcount00"){
					$totSurvMain.ui.chartImageDown("#Allcount00", "경영주 경력기간별 농가");
				}
			});
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장) 이벤트 추가 END
			
			
			
			// 경영형태별 농가 (노지/ 시설 )선택 이벤트  START
			body.on("click", "#farmLand", function(evnt){
				if($(this).hasClass("on")){
					return
				}
				if($farmDash.ownerKindFarmLand.length > 0){
					farmPieChart($farmDash.ownerKindFarmLand,  "N", "285");
				} else {
					$("#ownerKindFarm").empty();
					$("#ownerKindFarm").append(moveHtml);
				}
				$(this).addClass("on")
				$("#farmFacility").removeClass("on");
			});
			
			body.on("click", "#farmFacility", function(evnt){
				if($(this).hasClass("on")){
					return
				}
				if($farmDash.ownerKindFarmFacility.length > 0){
					farmPieChart($farmDash.ownerKindFarmFacility,  "N", "285");
				} else {
					$("#ownerKindFarm").empty();
					$("#ownerKindFarm").append(moveHtml);
				}
				$(this).addClass("on")
				$("#farmLand").removeClass("on");
			});
			// 경영형태별 농가 (노지/ 시설 )선택 이벤트  END
		},
		
		/**
		 * @name		 : allChange 
		 * @description  : 농업총조사 지도에서 각 지역경계 클릭시 모든 차트데이터 변경작업
		 * @date		 : 2020.08.17
		 * @author		 : juKwak
		 * @history 	 :
		 * @parameter	 : admCd : 지역코드, mode : 1(지도포함 전체 변경), 2(지도제외 차트변경)
		 */
		allChange : function(admCd, mode){
			
			var noneHtml = "";
			noneHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
			noneHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 45px;'>";
			noneHtml += "	<p style='margin-top: 15px;'>2015년부터 제공하는 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
			noneHtml += "</div>";
			
			$farmDash.event.allClear();

			var year = $totSurvMain.ui.selectedYear;
			var regionCd = admCd;
			
			$totSurvMap.ui.selectedItmCd = "T00"; //20201120 박은식 데이터 조회 시 초기화 추가
			
						// 경영형태별 농가
			var param = {
				surv_year_list: year							// 수록시점
					, org_id_list: "101"							// 조직번호
						, tbl_id_list: year=='2020'?'DT_1AG20103':year=='2015'?'DT_1AG15102':'DT_1AG102'						// 통계표 ID
						, list_var_ord_list: "13999001" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
						, prt_type: "part"								    // 출력방식 total:합계
						, char_itm_id_list: "T01,T02,T05,T06,T10,T09,T03,T04,T17,T07,T08,T13,T14,T11,T12,T15,T16"						// 표특성항목
						, adm_cd: ""								// 지역코드
						, adm_unit: ""								// 지역단위
						, ov_l1_list: regionCd								// 항목 1
						, ov_l2_list: "000"								// 항목 2
						, ov_l3_list: ""								// 항목 3
						, ov_l4_list: ""								// 항목 4
						, ov_l5_list: ""								// 항목 5
						, category: ""									// 카테고리 sido, sgg
						, orderby: ""
			}
			$.ajax({
	    		type:"GET",
	    		//url: "/view/kosisApi/TotsurvStatData.do",
	    		url: sgis4thApiPath,
		 		data: param,
	    		success:function(res){
					if(res){
						// 경영형태별 농가  (ownerKindFarm)
						res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
						//var ownerKindFarmLand = res.map(function(r){r.surv_id='FS0010';r.itm_cd=r.CHAR_ITM_ID;return r;}).filter((r)=>Number(r.DTVAL_CO)!=0);
						var ownerKindFarmLand = res;
						if(ownerKindFarmLand.length > 0){ 
							farmPieChart(ownerKindFarmLand,  "N", "285"); // 2020-11-20 [곽제욱] 병합데이터로 변경
							$farmDash.ownerKindFarmLand = ownerKindFarmLand; // 2020-11-20 [곽제욱] 병합데이터로 변경
							if(ownerKindFarmLand.length > 0){ 
								farmPieChart(ownerKindFarmLand,  "N", "285"); // 2020-11-20 [곽제욱] 병합데이터로 변경
							}
							else{
								$("#ownerKindFarm").html(noneHtml);
							}
						}
						else{
							$("#ownerKindFarm").html(noneHtml);
						}
					}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});
			
			// 농축산물 판매금액별 농가
			var param2 = {
				surv_year_list: year							// 수록시점
					, org_id_list: "101"							// 조직번호
						, tbl_id_list: year=='2020'?'DT_1AG20111':year==2015?'DT_1AG15117':'DT_1AG117'						// 통계표 ID
						, list_var_ord_list: "13999001" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
						, prt_type: "part"								    // 출력방식 total:합계
						, char_itm_id_list: year=='2020'?"T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13":"T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12"						// 표특성항목
						, adm_cd: ""								// 지역코드
						, adm_unit: ""								// 지역단위
						, ov_l1_list: regionCd								// 항목 1
						, ov_l2_list: "000"								// 항목 2
						, ov_l3_list: ""								// 항목 3
						, ov_l4_list: ""								// 항목 4
						, ov_l5_list: ""								// 항목 5
						, category: ""									// 카테고리 sido, sgg
						, orderby: ""
			}
			$.ajax({
	    		type:"GET",
	    		//url: "/view/kosisApi/TotsurvStatData.do",
	    		url: sgis4thApiPath,
		 		data: param2,
	    		success:function(res){
					if(res){
						res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
						res = res.filter(d=>d.CHAR_ITM_NM.indexOf('세')==-1);
						res.sort((a,b)=>{return a.CHAR_ITM_ID < b.CHAR_ITM_ID ? -1:a.CHAR_ITM_ID > b.CHAR_ITM_ID ? 1: 0}).filter((r)=>Number(r.DTVAL_CO)!=0);
						var farmSale = res.map(function(r){r.surv_id='FS0028';r.itm_cd=r.CHAR_ITM_ID;return r;});
						// 농축산물 판매금액별 농가
						if(farmSale.length > 0){
							setFarmPayChart(farmSale,"farmPay","Y","285");
							$farmDash.farmSaleData = farmSale;
						} else {
							$("#farmPay").html(noneHtml);
						}
					}
					
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			// 경지 규모별 농가
			var param3 = {
				surv_year_list: year							// 수록시점
					, org_id_list: "101"							// 조직번호
						, tbl_id_list: year=='2020'?'DT_1AG20101':year==2015?'DT_1AG15101':'DT_1AG101'						// 통계표 ID
						, list_var_ord_list: "13999001" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
						, prt_type: "part"								    // 출력방식 total:합계
						, char_itm_id_list: "T01,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14,T15,T16,T17,T18"						// 표특성항목
						, adm_cd: ""								// 지역코드
						, adm_unit: ""								// 지역단위
						, ov_l1_list: regionCd								// 항목 1
						, ov_l2_list: "000"								// 항목 2
						, ov_l3_list: ""								// 항목 3
						, ov_l4_list: ""								// 항목 4
						, ov_l5_list: ""								// 항목 5
						, category: ""									// 카테고리 sido, sgg
						, orderby: ""
			}
			$.ajax({
	    		type:"GET",
	    		//url: "/view/kosisApi/TotsurvStatData.do",
	    		url: sgis4thApiPath,
		 		data: param3,
	    		success:function(res){
					if(res){
						res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
						res = res.filter(d=>d.CHAR_ITM_NM.indexOf('세')==-1);
						res.sort((a,b)=>{return a.CHAR_ITM_ID < b.CHAR_ITM_ID ? -1:a.CHAR_ITM_ID > b.CHAR_ITM_ID ? 1: 0}).filter((r)=>Number(r.DTVAL_CO)!=0);
						var ownerFarmScale 	= res.map(function(r){r.surv_id='FS0002';r.itm_cd=r.CHAR_ITM_ID;return r;});
						// 경영주 규모별 농가
						if(ownerFarmScale.length > 0){
							setFarmScaleChart(ownerFarmScale, "ownerScale", "N", "225");
							$farmDash.ownerFarmScale = ownerFarmScale;
						} else {
							$("#ownerScale").html(noneHtml);
						}
					}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			// 경영주 연령별 농가
			var param4 = {
				surv_year_list: year							// 수록시점
					, org_id_list: "101"							// 조직번호
						, tbl_id_list: year=='2020'?'DT_1AG20107':year==2015?'DT_1AG15107':'DT_1AG107'						// 통계표 ID
						, list_var_ord_list: "13999001" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
						, prt_type: "part"								    // 출력방식 total:합계
						, char_itm_id_list: year=='2020'?"T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14":"T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13"						// 표특성항목
						, adm_cd: ""								// 지역코드
						, adm_unit: ""								// 지역단위
						, ov_l1_list: regionCd								// 항목 1
						, ov_l2_list: "000"								// 항목 2
						, ov_l3_list: ""								// 항목 3
						, ov_l4_list: ""								// 항목 4
						, ov_l5_list: ""								// 항목 5
						, category: ""									// 카테고리 sido, sgg
						, orderby: ""
			}
			$.ajax({
	    		type:"GET",
	    		//url: "/view/kosisApi/TotsurvStatData.do",
	    		url: sgis4thApiPath,
		 		data: param4,
	    		success:function(res){
					if(res){
						res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
						// 경영주 연령별 농가
						res.sort((a,b)=>{return a.CHAR_ITM_ID < b.CHAR_ITM_ID ? -1:a.CHAR_ITM_ID > b.CHAR_ITM_ID ? 1: 0}).filter((r)=>Number(r.DTVAL_CO)!=0);
						var ownerAgeCal = res.map(function(r){r.surv_id='FS0016';r.itm_cd=r.CHAR_ITM_ID;return r;});
						if(ownerAgeCal.length > 0){
							setFarmAgeCalChart(ownerAgeCal, "all2", "N", "145");
							$farmDash.ownerAgeCal = ownerAgeCal;
						} else {
							$("#all2").html(noneHtml);
						}
					}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			// 경영주 농업 경력기간별 농가
			var param5 = {
				surv_year_list: year							// 수록시점
					, org_id_list: "101"							// 조직번호
						, tbl_id_list: year=='2020'?'DT_1AG20108':year==2015?'DT_1AG15108':'DT_1AG108'						// 통계표 ID
						, list_var_ord_list: "13999001" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
						, prt_type: "part"								    // 출력방식 total:합계
						, char_itm_id_list: "T01,T02,T03,T04,T05"						// 표특성항목
						, adm_cd: ""								// 지역코드
						, adm_unit: ""								// 지역단위
						, ov_l1_list: regionCd								// 항목 1
						, ov_l2_list: "000"								// 항목 2
						, ov_l3_list: ""								// 항목 3
						, ov_l4_list: ""								// 항목 4
						, ov_l5_list: ""								// 항목 5
						, category: ""									// 카테고리 sido, sgg
						, orderby: ""
			}
			$.ajax({
	    		type:"GET",
	    		//url: "/view/kosisApi/TotsurvStatData.do",
	    		url: sgis4thApiPath,
		 		data: param5,
	    		success:function(res){
					if(res){
						res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
						res = res.filter(d=>d.CHAR_ITM_NM.indexOf('세')==-1);
						res.sort((a,b)=>{return a.CHAR_ITM_ID < b.CHAR_ITM_ID ? -1:a.CHAR_ITM_ID > b.CHAR_ITM_ID ? 1: 0}).filter((r)=>Number(r.DTVAL_CO)!=0);
						var ownerCareer = res.map(function(r){r.surv_id='FS0017';r.itm_cd=r.CHAR_ITM_ID;return r;});
						// 경영주 경력기간별 농가
						if(ownerCareer.length > 0){
							setOwnerCareerChart(ownerCareer, "all1", "N", "135");
							$farmDash.ownerCareer = ownerCareer;
						} else {
							$("#all1").html(noneHtml);
						}
					
					}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/farmDash/getTotFarm.json",
				data: { year: year, region_cd : regionCd}, // 
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						
						// 개방형지도란 버튼 비활성화
						$(".mapInfo").hide();
						
						//console.log("res.result = " + JSON.stringify(res.result));
						
						// 농업총조사 농가 인구 조회
						var totFarmData = res.result.totFarmData;
						// 농업총조사 농가(가구) 조회 
						//var totFarmHouseData = res.result.totFarmHouseData;
						
						// 농업총조사 농가 2010 대비  itmCd T00   :: now_year,befor_year, total, rt
						var totFarmRtData = res.result.totFarmRtData;
						// 농가(가구)수  증감율 조회  T01  :: now_year,befor_year, total, rt
						var totFarmHouseRtData = res.result.totFarmHouseRtData;						
						
						// 농업총조사 농가 인구 중 고령인 인구 조회
						var totFarmOldPeoData = res.result.totFarmOldPeoData;
						
						// 경영주 연령별 분류 현황
						var ownerAge = res.result.ownerAge;
						// 경영형태별 농가  (ownerKindFarm)
						var ownerKindFarmLand 		= [];
						//var ownerKindFarmFacility 	= res.result.ownerKindFarmFacility; //2020-11-17 [곽제욱] 농총과 요청으로 노지+시설로 변경으로 인한 주석처리
						// 경영주 규모별 농가
						var ownerFarmScale 	= res.result.ownerFarmScale;
						// 경영주 연령별 농가
						var ownerAgeCal 	= res.result.ownerAgeCal;
						// 경영주 경력기간별 농가
						var ownerCareer 	= res.result.ownerCareer;
						
						var getTotFramHouseRt = res.result.getTotFramHouseRt;//20201117 박은식 가구 증감율 데이터 추가
						// 경영주 교육 정도
//						var ownerEducat = res.result.ownerEducat;
//						// 가구원수별 농가
//						var houseFarm = res.result.houseFarm;
//						// 인구와 농가인구의 연령대별 분포
//						var peopleFarmAge = res.result.peopleFarmAge;
						
						// 농축산물 판매 금액별  
						var farmSale = res.result.farmSale;
						
						$farmDash.ownerAgeData = "";
						$farmDash.ownerEducatData = "";
						$farmDash.houseFarmData = "";
						$farmDash.peopleFarmAgeData = "";
						$farmDash.farmSaleData = "";
						
						// 추가
						$farmDash.ownerKindFarmLand = ownerKindFarmLand;
						//$farmDash.ownerKindFarmFacility = ownerKindFarmFacility; //2020-11-17 [곽제욱] 농총과 요청으로 노지+시설로 변경으로 인한 주석처리
						
						var totFarm = totFarmData[0].dt;
						
						//20201117 박은식 증감율 데이터 변경 START
						if(getTotFramHouseRt.length>0){
							
							var totFarmRatio = getTotFramHouseRt[0].total; 
							var totFarmRatioRt = getTotFramHouseRt[0].rt;
						} 
						//20201117 박은식 증감율 데이터 변경 END
						
						if(totFarmHouseRtData.length>0){
							var houseNm = totFarmHouseRtData[0].total;
							var houseRt = totFarmHouseRtData[0].rt;
						}
						// 고령인구 계산 
						var tOldNm = Number(totFarmOldPeoData[0].dt);
						var sumNm = 0;
						for(var i=1; i<totFarmOldPeoData.length; i++){
							sumNm = sumNm + Number(totFarmOldPeoData[i].dt);
						}
						var oldNum = sumNm;
						var oldRt = ((sumNm/tOldNm)*100).toFixed(2); //20201117 박은식 농가인구 중 고령인구 비율 계산식 변경
						//var rtTxt = ($totSurvMain.ui.selectedYear - 5) +"년 대비 ";
						var rtTxt = "전주기 대비 ";

						$(".dataAreatit").html('<h1>'+numberFormat(totFarm)+'</h1><span class="ml5">가구</span>');
						
						var upDownCheck = "";
						var upDownCheck2 = "";
						if($totSurvMain.ui.selectedYear != "2010"){
							if(totFarmRatio!="" && totFarmRatio!=undefined){
								if(parseFloat(totFarmRatio) > 0){
									upDownCheck2 = "<h1 class='stats_up bold'>"+numberFormat(totFarmRatio)+"</h1><span class='ml5 stats_up'>가구 증가</span>";									
								} else if(parseFloat(totFarmRatio) < 0){
									upDownCheck2 = "<h1 class='stats_down bold'>"+numberFormat(totFarmRatio.replace("-", ""))+"</h1><span class='ml5 stats_down'>가구 감소</span>";
								} else {
									upDownCheck2 = "<h1 class='stats_normal bold'>"+numberFormat(totFarmRatio)+"</h1><span class='ml5 stats_normal'>가구 유지</span>";
								}
								$("#totFarmRatio").html(upDownCheck2);
							} else {
								$("#totFarmRatio").html("-");
							}
							if(totFarmRatioRt!="" && totFarmRatioRt!= undefined){
								if(parseFloat(totFarmRatioRt) > 0){
									upDownCheck = "<span class='stats_up bold'>" +totFarmRatioRt+" % </span><span class='stats_up'>▲</span>";
								} else if(parseFloat(totFarmRatioRt) < 0){
									upDownCheck = "<span class='stats_down bold'>" +totFarmRatioRt.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
								} else {
									upDownCheck = "<span class='stats_normal bold'>" +totFarmRatioRt+" % </span>"; 
								}
								$("#totFarmRatioRt").html(rtTxt + upDownCheck);
							} else {
								$("#totFarmRatioRt").html(rtTxt + "<span class='stats_normal'>-</span>");
							}
							$("#oldNum").html(numberFormat(oldNum));
							
							$("#oldRt").html("농가인구 중 " + oldRt+ "%");
							if(totFarmRtData.length>0){
								$("#houseNm").html(numberFormat(totFarmRtData[0].now_year));
							} else {
								$("#houseNm").html("-");
							}
							//$("#houseNm").html(numberFormat(houseNm));
							
							if(houseRt!="" && houseRt!= undefined){
								if(parseFloat(houseRt) > 0){
									upDownCheck = "<span class='stats_up bold'>" +houseRt+" % </span><span class='stats_up'>▲</span>";
								} else if(parseFloat(houseRt) < 0){
									upDownCheck = "<span class='stats_down bold'>" +houseRt.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
								} else {
									upDownCheck = "<span class='stats_normal bold'>" +houseRt+" % </span>"; 
								}
								$("#houseNmRt").html(rtTxt + upDownCheck);
							} else {
								$("#houseNmRt").html(rtTxt + "<span class='stats_normal'>-</span>");
							}
							//$("#houseNmRt").html(rtTxt + houseRt+" %");
						} else {
							$("#oldNum").html(numberFormat(oldNum));
							$("#oldRt").html("농가인구 중 " + oldRt+ "%");
							$("#totFarmRatio").html("-")
							$("#totFarmRatioRt").html("증감율 데이터 없음")
							$("#houseNmRt").html("증감율 데이터 없음")
							if(totFarmRtData.length>0){
								$("#houseNm").html(numberFormat(totFarmRtData[0].befor_year))
							} else {
								$("#houseNm").html("-")
							}
						}
						

						if($(".mapExport").hasClass("on")) {
							$("#ownerAgeDiv").hide();
							$("#onwerEducatDiv").hide();
							$("#houseFarmDiv").hide();
							$("#Allcount01").hide();
							$("#Allcount00").hide();
						} else {
							if($totSurvMain.ui.selectedLevel=="0"){
								$(".Rangecontainer").css("display", "none");
							} else if($totSurvMain.ui.selectedLevel=="1"){
								$(".Rangecontainer").css("display", "inline-block");
							} else if($totSurvMain.ui.selectedLevel=="2"){
								$(".Rangecontainer").css("display", "inline-block");
							} else if($totSurvMain.ui.selectedLevel=="3"){
								$(".Rangecontainer").css("display", "none");
							}
							$("#ownerAgeDiv").show();
							$("#onwerEducatDiv").show();
							$("#houseFarmDiv").show();
							$("#Allcount01").show();
							$("#Allcount00").show();
						}
						 
						var noneHtml = "";
						noneHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
						noneHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 45px;'>";
						noneHtml += "	<p style='margin-top: 15px;'>2015년부터 제공하는 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
						noneHtml += "</div>";
						
						// 경영형태별 농가 노지 / 시설
						// 2020-11-17 [곽제욱] 농총과 요청으로 노지+시설 데이터합산으로 변경으로 인한 로직 변경 START
						/*
						if($('#farmLand').hasClass("on")){
							if(ownerKindFarmLand.length > 0){
								farmPieChart(ownerKindFarmLand,  "N", "285");
								$farmDash.ownerKindFarmLand = ownerKindFarmLand;
							}
							else{
								$("#ownerKindFarm").html(noneHtml);
							}
						}
						else if($('#farmFacility').hasClass("on")){
							if(ownerKindFarmFacility.length > 0){
								farmPieChart(ownerKindFarmFacility,  "N", "285");
								$farmDash.ownerKindFarmFacility = ownerKindFarmFacility;
							}
							else{
								$("#ownerKindFarm").html(noneHtml);
							}
						}*/
						// 2020-11-20 [곽제욱] 주석 처리 START
						/*
						var tempOwnerKindFarmLandData = [];
						var tempSum1 = 0;
						$.each(ownerKindFarmLand, function(key, value){
							if(value.itm_cd == "T01"){	// 논벼_노지, 논벼_시설(현재 DB에 논벼시설 데이터가 없음)
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T01"){ // 논벼 데이터 합산
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T01,T02", 
										 itm_nm: "논벼", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 식량작물_노지, 식량작물_시설
							if(value.itm_cd == "T03" || value.itm_cd == "T04"){
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T04"){
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T03,T04", 
												 itm_nm: "식량작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 채소·산나물_노지, 채소·산나물_시설
							if(value.itm_cd == "T05" || value.itm_cd == "T06"){
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T06"){
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T05,T06", 
												 itm_nm: "채소/산나물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 특용작물·버섯_노지, 특용작물·버섯_시설
							if(value.itm_cd == "T07" || value.itm_cd == "T08"){
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T08"){
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T07,T08", 
												 itm_nm: "특용작물/버섯", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 과수_노지, 과수_시설
							if(value.itm_cd == "T09" || value.itm_cd == "T10"){
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T10"){
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T09,T10", 
												 itm_nm: "과수", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 약용작물_노지, 약용작물_시설
							if(value.itm_cd == "T11" || value.itm_cd == "T12"){
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T12"){
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T11,T12", 
												 itm_nm: "약용작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 화초·관상작물_노지, 화초·관상작물_시설
							if(value.itm_cd == "T13" || value.itm_cd == "T14"){
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T14"){
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T13,T14", 
												 itm_nm: "화초/관상작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 기타작물_노지, 기타작물_시설
							if(value.itm_cd == "T15" || value.itm_cd == "T16"){
								tempSum1 = tempSum1 + Number(value.dt);
							}
							if(value.itm_cd == "T16"){
								var tempValue = {c1: value.c1, c1_nm: value.c1_nm, c2: value.c2, c2_nm: value.c2_nm, dt: tempSum1.toString(), irdsrate: value.irdsrate , itm_cd: "T15,T16", 
												 itm_nm: "기타작물", rank: value.rank, region_cd: value.region_cd, region_nm: value.region_nm, surv_id: value.surv_id, unit_nm: value.unit_nm};
								tempOwnerKindFarmLandData.push(tempValue);
								tempSum1 = 0;
							}
							// 재배임업만 경영
							if(value.itm_cd == "T17"){
								tempOwnerKindFarmLandData.push(value);
							}
						});
						*/
						// 2020-11-20 [곽제욱] 주석 처리 END
						
						/*
						if(ownerKindFarmLand.length > 0){ 
							farmPieChart(ownerKindFarmLand,  "N", "285"); // 2020-11-20 [곽제욱] 병합데이터로 변경
							$farmDash.ownerKindFarmLand = ownerKindFarmLand; // 2020-11-20 [곽제욱] 병합데이터로 변경
						}
						else{
							$("#ownerKindFarm").html(noneHtml);
						}
						// 2020-11-17 [곽제욱] 농총과 요청으로 노지+시설 데이터합산으로 변경으로 인한 로직 변경 END
						
						// 농축산물 판매금액별 농가
						if(farmSale.length > 0){
							setFarmPayChart(farmSale,"farmPay","Y","285");
							$farmDash.farmSaleData = farmSale;
						} else {
							$("#farmPay").html(noneHtml);
						}
												
						
						// 경영주 규모별 농가
						if(ownerFarmScale.length > 0){
							setFarmScaleChart(ownerFarmScale, "ownerScale", "N", "225");
							$farmDash.ownerFarmScale = ownerFarmScale;
						} else {
							$("#ownerScale").html(noneHtml);
						}
						
						
						// 경영주 연령별 농가
						if(ownerAgeCal.length > 0){
							setFarmAgeCalChart(ownerAgeCal, "all2", "N", "145");
							$farmDash.ownerAgeCal = ownerAgeCal;
						} else {
							$("#all2").html(noneHtml);
						}
						
						
						// 경영주 경력기간별 농가
						if(ownerCareer.length > 0){
							setOwnerCareerChart(ownerCareer, "all1", "N", "135");
							$farmDash.ownerCareer = ownerCareer;
						} else {
							$("#all1").html(noneHtml);
						}
						*/
						
					}
					if($totSurvMain.ui.selectedArea == "00" || $totSurvMain.ui.selectedArea == "99" || $totSurvMain.ui.selectedArea == ""){
						//$("#totFarmRatioRtRanking").html("전국 " + ($totSurvMain.ui.selectedYear - 5) +"년 대비");
						$("#totFarmRatioRtRanking").html("전국 " + "전주기" +" 대비 농가 수");
						$("#oldRtRanking").html("전국 농가 인구 중 고령인구");
						$("#totalFarmRanking").html("전국 농가 인구");
					}
					$totSurvMain.ui.selectedArea = regionCd;
				},
				error: function(e) {
					alert('failed');
				}
			});
			if(mode == "1"){
				$farmDash.ui.drawContent($totSurvMap.ui.selectedSurvId, $totSurvMap.ui.selectedItmCd, $totSurvMap.ui.selectedC1, $totSurvMap.ui.selectedC2);
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
			
			// 경영주 연령별 분류 현황
			$("#ownerAge").empty();
			// 경영주 교육 정도
			$("#ownerEducat").empty();
			// 가구원수별 농가
			$("#houseFarm").empty();
//			// 농축산물 판매 금액별  
			$("#all1").empty();
			$("#all2").empty();
			$farmDash.highcharts = [];
			$(".TileMaptoolTip").html();
			
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
 * @name         : setFarmPayChart
 * @description  : 농충산물 판매금액별 농가
 * @date         : 
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이, surv_id - 조사id
 */
function setFarmPayChart(data, target, resize, height){
	
	// 나이 통계가 같이 들어와서 잘라냄. api개선되면 수정필요.
	//data = data.slice(0,12);
	
	var margin = ({top: 0, right: 150, bottom: 5, left: 100})
	
	var indexData = [data.length]; // index를 정할 data값 배열 생성
	for(var i=0;i<data.length; i++){ // 배열에 data 저장
		indexData[i] = data[i].DTVAL_CO;
	}
	var pie = d3.pie(); // pie 함수를 이용 (데이터 크기순으로  index 정하는 메소드를 사용)
	var indexCnt = pie(indexData); // data 크기별 index 추가
	//var colors = ["#4E3691","#5F46A8","#7057B8","#8068C5","#A88FE6","#C1ABF0","#D2BFF7","#E7DAFC","#F0DAFC","#F9EFFF","#EFEAF2","#F5F5F5"]; //2020.11.11[신예리] 판매금액별 차트 컬러 12단계 지정 //2020.11.18[신예리] 색상표 변경
	var min = d3.min(data,function(d){return Number(d.DTVAL_CO)});
	var max = d3.max(data,function(d){return Number(d.DTVAL_CO)});
	var colors = d3.scaleLinear().domain([min,(max-min)/2,max]).range(['#F5F5F5','rgb(193, 171, 240)','#4E3691']);
	var chartData = [], categories = [];
	var total = d3.sum(data,function(d){return Number(d.DTVAL_CO)});
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].DTVAL_CO),color:colors(Number(data[i].DTVAL_CO))});
		categories.push(data[i].CHAR_ITM_NM.replace('농축산물판매금액별농가:',''));
	}
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$farmDash.moveHomeData = data;
	
		var total = 0;
		for(var i=0; i<data.length; i++){
			total = Number(data[i].DTVAL_CO) + total;
		}

	
	  $farmDash.payHighcharts = Highcharts.chart(target, {
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
					max:max+(max*.2),
				visible:false,
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		        footerFormat: '</table>',
		        shared: true,
		    enabled: false,
		        useHTML: true
		    },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0,
		        },
				series: {
    				slicedOffset: 0,
					states:{
						select:{
							color:'rgb(87, 101, 116)'
						}
					},
	            	borderWidth: 0,
					cursor: 'pointer',
		            pointWidth: 13,
					stacking: 'normal',
					borderRadius:5,
					dataLabels: {
		                enabled: true,
	        			inside: false,
		                style: {
							fontSize:'13px',
		                    color: "#111111",
							fontFamily: 'NanumSquare',
							textOutline: false
		                },
						formatter:function(){ return numberFormat(this.y)}
		            },
					point: {
						events: {
							click:function(){
								if(!this.selected) $farmDash.deselectAllHighcharts();
								let d = data[this.index];
								$totSurvMain.ui.selectedNm = d.CHAR_ITM_NM;
								var title ="농축산물 판매금액별 농가 (" + d.CHAR_ITM_NM.replace(" (가구)", "").replace("경영주교육정도별농가:", "")+")"; //20201202 박은식 임가-> 농가
						    	$totSurvMain.ui.chartTarget = target
					    		$totSurvMain.ui.chartIndex = d.CHAR_ITM_ID;//20201126 박은식  data 변경
					    		$totSurvMain.ui.chartData = d;
					    		$totSurvMain.ui.chartColor = "#576574";
					    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
						    	$farmDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ title,2);
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

	   $farmDash.highcharts.push($farmDash.payHighcharts);
}




/**
 * @name         : setOwnerFarmChart
 * @description  : 가구원수별 농가
 * @date         : 
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이, surv_id - 조사id
 */
function setOwnerFarmChart(data, target, resize, height){
	//console.log("[setFarmOwnerAgeChart] data = " + JSON.stringify(data));
	
	var margin = ({top: 0, right: 150, bottom: 5, left: 100})
	var colors = ["#2B6FAE", "#2B6FAE", "#3495C6", "#3495C6", "#8DD0D0","#8DD0D0","#CCE8C8","#CCE8C8"]; //2020.10.20[신예리] 차트 컬러 변경

	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$farmDash.moveHomeData = data;
	
		var total = 0;
		for(var i=0; i<data.length; i++){
			total = Number(data[i].dt) + total;
		}
		
		/*
		data.forEach((item) => {
			total = item.value + total;
		});
		*/
	
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
	  var xAxis = function(g) {console.log(123); return g
	      	    .attr("transform", "translate(0,"+ margin.top +")")
	      	    .call(d3.axisTop(x).ticks(width / 80, data.format))
	      	    .call( function(g) { return g.select(".domain").remove() } )
	  			}
	  var yAxis = function(g) { return g
	      	    .attr("transform", "translate("+ (margin.left+5) + ",0)")
	      	    .call(d3.axisLeft(y).tickFormat(
	      	    	function(i) {
	      	    		var title;
	      	    		if((data[i].itm_nm).indexOf(":") == -1){
	      	    			title = data[i].itm_nm
	      	    		} else {
	      	    			title = (data[i].itm_nm).split(":")[1]
	      	    		}
	      	    		return (i == 7) ? title.replace("(가구)", "") : title.replace("(가구)", "명");
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
			     .attr("width", width);
	    
	  if(resize == "Y"){
		  svg.append("g")
	        .selectAll("rect")
	        .data(data)
	        .join("rect")
	        .attr('class', 'eventGroup')
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	       .on("mouseover", function(){
		    	$farmDash.ui.chartMouseOver($(this), "#576574");
		    })
		    .on("click", function(d){
		    	var title ="경영주 교육 정도 (" + d.itm_nm.replace(" (가구)", "").replace("경영주교육정도별농가:", "")+")"; //20201202 박은식 임가-> 농가
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
		    	$farmDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ title);
		    })
		    .on("mouseout", function(){
		    	$farmDash.ui.chartMouseOut($(this), "#576574");
		    })
	      .attr("x", x(0))
	      .attr("y", function(d, i) { return y(i)+y.bandwidth()/2-4.25 })
	      .attr("height", 8.5)
	      .attr("fill", function(d,i) { return colors[i]})
	      .attr("width", 0)
	      .attr("rx", "4")
	      .attr("ry", "4")
	      .attr("width",  function(d) { return x1(Number(d.dt)) }); // { return bx(Number(d.dt)/total*100*0.65); }

	  svg.append("g")
	      .attr("text-anchor", "end")
	      .attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
	      .attr("font-size", 12) // 2020.09.24[신예리]폰트 사이즈 수정
	      .attr("font-weight", 600)
	        .selectAll("text")
	        .data(data)
	        .join("text")
	        .style("cursor", "pointer")
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		 	.on("click", function(d, i){
		 		var title ="경영주 교육 정도 (" + d.itm_nm.replace(" (가구)", "").replace("경영주교육정도별농가:", "")+")"; //20201202 박은식 임가-> 농가
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
	    		$farmDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
	    		$farmDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ title);
		 	})
	      .attr("fill", "")
	      .attr("x", 0)
	      .attr("width",  function(d) { return x1(Number(d.dt)) })
	      .attr("x",  function(d) { return x1(Number(d.dt))+95})
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
	        .attr('class', 'eventGroup')
	        .style("cursor", "pointer") //2020.10.26[신예리] 마우스 포인터 추가
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	       .on("mouseover", function(){
		    	$farmDash.ui.chartMouseOver($(this), "#576574");
		    })
		    .on("click", function(d){
		    	var title ="경영주 교육 정도 (" + d.itm_nm.replace(" (가구)", "").replace("경영주교육정도별농가:", "")+")"; //20201202 박은식 임가-> 농가
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
		    	$farmDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ title);
		    })
		    .on("mouseout", function(){
		    	$farmDash.ui.chartMouseOut($(this), "#576574");
		    })
	      .attr("x", x(0))
	      .attr("y", function(d, i) { return y(i)+y.bandwidth()/2-4.25 })
	      .attr("height", 8.5)
	      .attr("fill", function(d,i) { return colors[i]})
	      .attr("width", 0)
	      .attr("rx", "4")
	      .attr("ry", "4")
	      .transition()
	      .duration(1000)
	      .delay(function (d, i) {
	          return i * 150;
	      })
	      .attr("width",  function(d) { return x1(Number(d.dt)) }); // { return bx(Number(d.dt)/total*100*0.65); }

	  svg.append("g")
	      .attr("text-anchor", "end")
	      .attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
	      .attr("font-size", 12) // 2020.09.24[신예리]폰트 사이즈 수정
	      .attr("font-weight", 600)
	        .selectAll("text")
	        .data(data)
	        .join("text")
	        .style("cursor", "pointer")
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		 	.on("click", function(d, i){
		 		var title ="경영주 교육 정도 (" + d.itm_nm.replace(" (가구)", "").replace("경영주교육정도별농가:", "")+")"; //20201202 박은식 임가-> 농가
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
	    		$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
	    		$farmDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ title);
		 	})
	      .attr("fill", "")
	      .attr("x", margin.left)
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
	      .attr("x",  function(d) { return x1(Number(d.dt))+95});
	  }
	  

	  svg.append("g")
	      .attr("style", "margin-left:250px; font-size: 12px; color:#878A89") //2020.10.28[신예리] 폰트 사이즈 수정
	        .call(yAxis);

	  $("#"+target+"").find("line, path").remove()
}




/**
 * @name         : setFarmAgeCalChart 
 * @description  : 경영주 연령별 농가
 * @date         : 2020.11.09
 * @author	     : esPark
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setFarmAgeCalChart(data, target, resizeYn, height){
	
	console.log("[setFarmAgeCalChart] data = " + JSON.stringify(data));
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$farmDash.totalPopulationData = data;
	
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	var maxVal = d3.max(data, function(d){ return Number(d.DTVAL_CO) });
	//임시 end
	
	//기본셋팅
	var margin = ({top: 5, right: 50, bottom: 35, left: 40})
	var color = ["#4dc7ac","#4dc7ac","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#f5ca87","#f5ca87","#f5ca87","#f5ca87","#f5ca87","#f5ca87"] //20201022 박은식 청년 장년 노년 연령 색상 변경
	
	var chartData = [], categories = [];
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].DTVAL_CO),color:	color[i],name:data[i].CHAR_ITM_NM});
		categories.push(data[i].CHAR_ITM_NM.replace("경영주연령별농가:", ""));
	}
	
	$farmDash.mngmtageHighcharts = Highcharts.chart(target, {
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
			  minorGridLineWidth: 0,
	        max: maxVal + (maxVal*.17),
			tickInterval: maxVal/4,
			color:'#000',
				tickColor:'#000',
			tickLength:5,
	        title: {
	            text: null
	        },
			lineWidth: 0,
			labels: {
                formatter: function () {
                    let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
					v = v<1000?v:Math.round(v/1000)+"K";
                    return v + " - ";
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
	
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear +"년 경영주 연령별 농가 ("+this.name+")</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click: function() {
							if(!this.selected) $farmDash.deselectAllHighcharts();
							let d = data[this.index];
							
							
							if($totSurvMain.ui.selectedLevel != "3"){    			
					    		$totSurvMain.ui.chartTarget = target
					    		$totSurvMain.ui.chartIndex = d.CHAR_ITM_ID;//20201126 박은식  data 변경
					    		$totSurvMain.ui.selectedNm = d.CHAR_ITM_NM;
					    		$totSurvMain.ui.chartData = d;
					    		$totSurvMain.ui.chartColor = "#576574";
					    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 경영주 연령별 농가 ("+d.CHAR_ITM_NM.replace("경영주연령별농가:", "")+")";
				    		}
							$farmDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle,4);
							
							
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
	
	$farmDash.highcharts.push($farmDash.mngmtageHighcharts);
	
}


/**
 * @name         : setFarmAgeChartCall 
 * @description  : 인구와 농가인구의 연령대별 분포 차트
 * @date         : 2020.09.09
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setFarmAgeChartCall(data, target, resizeYn, p_height){
	
	console.log("[setFarmAgeChartCall] data = " + JSON.stringify(data));
	
		$("#"+target).empty();
	   var margin = ({ top: 10, right: 10, bottom: 40, left: 35}); //2020.10.20[신예리] margin값 수정

	   const height = p_height;
	   const width = 578;

	   const innerHeight = height- margin.top - margin.bottom;
	   const innerWidth = width - margin.left - margin.right;

	   const keys = Object.keys(data[0]).slice(1);
	   //const keys = Object.keys(farmAgeData[0]).slice(1);
	   

	   const stack = d3.stack()
	     .keys(keys)
	     .order(d3.stackOrderDescending); // so that the largest grouping is stacked below the others

	   const series = stack(data);
	   //const series = stack(farmAgeData);

	   // set up the x scale
	   const xScale = d3.scaleLinear()
	   .domain(d3.extent(data, function(d){ return d.seq }))
	   .range([0, innerWidth]);
	   
	   // set up the y scale
//	    note: referencing the series property returned by format() even though it's defined below!
	   
	   const yScale = d3.scaleLinear()   // 이거만 하면 차트가 뒤바뀜
	      .domain([
	    	d3.min(series, function(series){ return d3.min(series, function(d){ return 0 })}),
	        d3.max(series, function(series){ return d3.max(series, function(d){ return d[1] }) })
//	    	  0,25,50,75,100
	      ])
	      .range([innerHeight, 0]);
	   
	  const y2 = d3.scaleLinear()
	   .domain([0, 100]).nice()
	   .rangeRound([height - margin.bottom, margin.top])
	   
	   // bottom axis generator
	  const xAxis = d3.axisBottom()
	     .scale(xScale)
	     .ticks(15)
	     .tickFormat(d3.format(''));

	  // left axis generator
	  const yAxis = d3.axisLeft()
	     .scale(yScale)
	     .tickValues([0, 25, 50, 75, 100])
	     .tickFormat(function(d) { return d+'%'});

	   const cScale = d3.scaleOrdinal(["#C7DE44", "#FF9100"]); //2020.10.20[신예리] 차트 컬러 변경

	//타겟설정
	const chart = d3.select("#"+target+"");

	//차트 renderer시작
	const svg = chart.append("svg")
		.attr("height", height)
		.attr("width", width);
	   
	   const main = svg.append('g')
	     .attr('class', 'main')
	     .attr('transform', 'translate('+margin.left+', '+margin.top+')');

	   // x axis
//	  main.append('g')
//	     .attr('class', 'axis x')
//	     .attr('transform', 'translate('+0+', '+innerHeight+')')
//	     .call(xAxis);

	   // x axis label
	  d3.select('g.axis.x')
	     .append('text')
	     .attr('class', 'label')
	     .attr('x', innerWidth / 2)
	     .attr('y', 35)
	     .text('age')
	     .style('text-anchor', 'middle');


	   // y axis
	 main.append('g')
	     .attr('class', 'axis y')
	     .attr("style", "font-size: 12px; color:#878A89;") //2020.10.28[신예리] 폰트 사이즈 및 컬러 추가
	     .call(yAxis);

	  // y axis label
	  d3.select('.y.axis').append('text')
	     .attr('class', 'label')
	    .attr('x', -innerHeight / 2 + 25)
	    .attr('y', -50)
	    .attr('transform', 'rotate(-90 0 0)')
	    .text('percent')
	    .style('text-anchor', 'middle');


	const main2 = svg.append('g')
	     .attr('class', 'main')
	     .attr('transform', 'translate('+margin.left+','+margin.top+')');
	
	   // define an area path generator
	  const area2 = d3.area()
	  .x(function(d){ return xScale(d.data.seq) })
	  //.x(d => xScale(d.data.name))
	   .y0(function(d){ return (yScale(d[0]) == "NaN") ? 0 : yScale(d[0]) })
	   .y1(function(d){ return (yScale(d[1]) == "NaN") ? 0 : yScale(d[1]) })
	   var a = [];
	  // create the stacked area paths
	  main2.selectAll('.area')
	    .data(series)
	    .enter().append('path')
	        .attr('class', 'area')
	        .attr('fill', function(d){ return (cScale(d.key) != "NaN") ? cScale(d.key) : "" })
	        .attr('d', area2);
	// main svg group
	  const main3 = svg.append('g')
	  	 .style("cursor","pointer") //2020.10.26[신예리] 마우스 포인터 추가
	     .attr('class', 'main')
	     .attr('transform', 'translate('+margin.left+','+margin.top+')');

	  // x axis label
	  d3.select('g.axis.x')
	     .append('text')
	     .attr('class', 'label')
	     .attr('x', innerWidth / 2)
	     .attr('y', 35)
	     .text('age')
	     .style('text-anchor', 'middle');

	 // generate y axis
	 main3.append('g')
	     .attr('class', 'axis y')
	     .attr("style", "font-size: 12px; color:#878A89;") //2020.10.28[신예리] 폰트 사이즈 및 컬러 추가
	     .call(yAxis);

	  // y axis label
	  d3.select('.y.axis').append('text')
	     .attr('class', 'label')
	    .attr('x', -innerHeight / 2 + 25)
	    .attr('y', -50)
	    .attr('transform', 'rotate(-90 0 0)')
	    .text('percent')
	    .style('text-anchor', 'middle');

	  // define an area path generator
	  const area3 = d3.area()
	  .x(function(d){ return xScale(d.data.seq) })
	  //.x(d => xScale(d.data.name))
	   .y0(function(d){ return (yScale(d[0]) == "NaN") ? 0 : yScale(d[0]) })
	   .y1(function(d){ return (yScale(d[1]) == "NaN") ? 0 : yScale(d[1]) })

	  // create the stacked area paths
	  main3.selectAll('.area')
	    .data(series)
	    .enter().append('path')
	        .attr('class', 'area')
	        .attr('fill', function(d) { return (cScale(d.key) != "NaN") ? cScale(d.key) : "" })
	        .attr('d', area3);
	  
	  
	  // X축 세팅(domain : 눈금범위, range : 길이범위)
	     var x = d3.scaleBand()
	      .domain(d3.range(data.length))
	      .range([margin.left, width - margin.right])

	      // X 축 정보
	      //var xScale1 = function(g) { return g
	      var xAxis1 = function(g) { return g
	      //.attr("transform", "translate("+(-margin.left)+","+(height-margin.bottom-5)+")")
	      .attr("transform", "translate("+(0)+","+(height-margin.bottom)+")") 	 
	      .call(d3.axisBottom(x).ticks(15, "").tickFormat(function(i) 
	    	{ 
	    	  return (data[i].itm_nm).indexOf(":") == -1 ?  data[i].itm_nm : (data[i].itm_nm).split(":")[1]   
	    	}).tickSizeOuter(15))
	     }
		  
	     
	     svg.append("g")
	     	.attr("style", "font-size: 11px; color:#878A89;") //2020.10.28[신예리] 폰트 사이즈 및 컬러 추가
	     	.call(xAxis1);  
	  

	}
//deselectall highcharts
$farmDash.deselectAllHighcharts =  function deselectAllHighcharts(){
	$farmDash.highcharts.forEach(function(chart){
		if(!chart||!chart.series) return;
		chart.series.forEach(function(s){
			s.data.forEach(function(point){
		        point.select(false);
		      });
		});
	});
}

/**
 * @name         : setFarmScaleChart 
 * @description  : 경영주 규모별 농가 차트 세팅
 * @date         : 2020.08.06
 * @author	     : juKwak
 * @history 	 : 
 */
function setFarmScaleChart(data, target, resizeYn, height){
	data = data.slice(0,17);
	var tool = $(".chartCommontoolTip");
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	// 마진값 세팅
	var margin = ({top: 5, right: (data.length > 15) ? 10 : 0, bottom: (data.length > 15) ? 75 : 35, left: 70})
	// 칼라 세팅
	//var color = ["#054D87","#01579B","#0277BD","#0288D1","#039BE5","#03A9F4","#29B6F6","#4FC3F7","#81D4FA","#B3E5FC","#C9ECFC","#D9F3FF","#E7F5FC","#F2FBFF","#E1E6E8","#EDF0F2","#F4F6F8"]; // 20201117 박은식 색상표 변경 //2020.11.18[신예리] 색상표 변경
	var min = d3.min(data,function(d){return Number(d.DTVAL_CO)});
	var max = d3.max(data,function(d){return Number(d.DTVAL_CO)});
	var colors = d3.scaleLinear().domain([min,(max-min)/2,max]).range(['#F4F6F8',"rgb(3, 169, 244)",'#054D87']);
	
	var backGroundData = [
		{"itm_nm" : "0~4세", "dt" : max*1.3}, {"itm_nm" : "5~9세", "dt" : max*1.3}
	];
	
	//20201117 박은식 데이터 크기별 index 추가 START
	var chartData = [], categories = [];	
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].DTVAL_CO),color:colors(Number(data[i].DTVAL_CO)),name:data[i].CHAR_ITM_NM});
		categories.push(data[i].CHAR_ITM_NM);
	}
	
	$farmDash.scaleHighcharts = Highcharts.chart(target, {
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
	        max: max+ (max*.1),
			//tickInterval: max/4,
			tickLength:5,
	        title: {
	            text: null
	        },
			lineWidth: 0,
			lineColor:'#000',
			  gridLineWidth: 0,
			  minorGridLineWidth: 0,
			labels: {
                formatter: function () {
					let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
					v = v<1000?v:Math.round(v/1000)+"K";
                    return v;
                }            
            }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true,
			enabled: false
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
							$(document).on("mousemove", function(evt) {					        	
					        	if(window.innerWidth - evt.clientX < tool.width()) tool.css("left", window.innerWidth - 280); 
								else tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
					        	let scrY = 0;
					        	if(evt.clientY > 850) {
					        		scrY = evt.clientY - 120;
					        	} else {
					        		scrY = evt.clientY + 10;
					        	}
					            tool.css("top", scrY);
							});
							
							
							tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" 
							+ $totSurvMain.ui.selectedYear+ "년 경영주 규모별 농가 ("
							+ this.name 
							+  ")</p>" 
							+ "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"
							+ numberFormat(this.y) + "</p>가구");
						
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							if(!this.selected) $farmDash.deselectAllHighcharts();
							let d = data[this.index];
								$totSurvMain.ui.selectedNm = d.CHAR_ITM_NM;
							if($totSurvMain.ui.selectedLevel != "3"){
					    		$totSurvMain.ui.chartTarget = target
					    		$totSurvMain.ui.chartIndex = d.CHAR_ITM_ID;//20201126 박은식  data 변경
					    		$totSurvMain.ui.chartData = d;
					    		$totSurvMain.ui.chartColor = "#576574";
					    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.CHAR_ITM_NM.replace("경영주연령별농가:", "").replace("(가구)", "");
				    		}
				    		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END
				    		$farmDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년  경영주 규모별 농가 ("+d.CHAR_ITM_NM.replace("경영주연령별농가:", "").replace("(가구)", "")+")",3); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
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
	   
	   
	$farmDash.highcharts.push($farmDash.scaleHighcharts);
    
}





/**
 * @name         : farmPieChart 
 * @description  : 경영형태별 농가 도넛차트 세팅
 * @date         : 2020.11.09
 * @author	     : jhs
 * @history 	 : 
 */
function farmPieChart(data, resizeYn, height){
	var year = $totSurvMain.ui.selectedYear
	if(year == '2015'){
		//data = data.slice(0,17);
	}
	$("#ownerKindFarm").empty();
	var chartData = [],total=0;
	var tool = $(".chartCommontoolTip");
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	var margin = {top: 20, right: 100, bottom: 20, left: 100}
	var w = 400, h = 270; // 2020-11-17 [곽제욱] 축산항목 추가로 인한 height 조정(250->270) 
	// 사용안해서 주석처리함.
	//var graphData = [data.length];
	//for (var i = 0; i < data.length; i++) {
	//	graphData[i] = data[i].dt;
	//}
	
	//var titleMaxLength = d3.max(data, function(d){return d.itm_nm.replace("_노지","").replace("_시설","").replace("경영형태별농가:","").length});

	var colorData = ["#20C894", "#599BD4", "#73C8CB", "#FFC000", "#B9D430","#E85757","#37A660", "#ED7D31","#74507B"]; //2020.11.10[신예리] 차트 컬러 변경 //2020.11.17[신예리] 범례 추가로 인한 컬러 추가
	
	var chartData = [];
	// 노지와 시설 구분 안하고 합치기 위한 로직
	for (var i = 0; i < data.length; i++) {
		var name = data[i].CHAR_ITM_NM.replace('_노지','').replace('_시설','').replace('·','/').replace('경영형태별농가:','');
		if(chartData.length){
			if(chartData[chartData.length-1].name == name){
				chartData[chartData.length-1].y += Number(data[i].DTVAL_CO);
			} else {
				chartData.push({name:name,color:colorData[chartData.length],y:Number(data[i].DTVAL_CO),id:data[i].CHAR_ITM_ID,tblId:data[i].TBL_ID});
			}
		} else {
			chartData.push({name:name,color:colorData[chartData.length],y:Number(data[i].DTVAL_CO),id:data[i].CHAR_ITM_ID,tblId:data[i].TBL_ID});
		}
		total += Number(data[i].DTVAL_CO);
	}
	//chartData.sort(function(a,b){return b.y-a.y});
	$farmDash.pieHighcharts = Highcharts.chart('ownerKindFarm', {
	    chart: {
			width: 400,
			height:285,
			spacing:0,
			spacingBottom:15,
			spacingLeft:15,
			spacingRight:0,
			spacingTop:15,
			events: {
				load: function() {
					for(let i=0; i<$("#ownerKindFarm").highcharts().series.length; i++) {
						$("#ownerKindFarm").highcharts().series[i].data.forEach(function(selector) {
							if(selector.name == $totSurvMain.ui.selectedNm) {
								selector.select(true);
								$totSurvMap.ui.selectedObj = $(selector).slice(); 
							}
						});
					}
				},
				redraw: function() {
					for(let i=0; i<$("#ownerKindFarm").highcharts().series.length; i++) {
						$("#ownerKindFarm").highcharts().series[i].data.forEach(function(selector) {
							if(selector.name == $totSurvMain.ui.selectedNm) {
								selector.select(true);
								$totSurvMap.ui.selectedObj = $(selector).slice(); 
							}
						});
					}
				}
			}
		},
		credits: {
            enabled: false
        },
	    plotOptions: {
	        series: {
				cursor: 'pointer',
				borderWidth: 0,
				point: {
					events: {
						mouseOver: function() {
							tool.css("display", "inline-block");
							$(document).on("mousemove", function(evt) {					        	
					        	tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
					        	let scrY = 0;
					        	if(evt.clientY > 850) {
					        		scrY = evt.clientY - 120;
					        	} else {
					        		scrY = evt.clientY + 10;
					        	}
					            tool.css("top", scrY);
							});
							
							tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" 
							+ $totSurvMain.ui.selectedYear+ "년 경영형태별 농가 ("
							+ this.name.replace('(가구)', '').replace('-', ' ').replace('_', ' ') 
							+  ")</p>" 
							+ "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"
							+ numberFormat(this.y) + "</p>가구");
						
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							if(!this.selected) $farmDash.deselectAllHighcharts();
							//console.log(chartData);
							var toolData = chartData[this.index];
								$totSurvMain.ui.selectedNm = toolData.name;
					    	$totSurvMain.ui.chartTarget = "ownerKindFarm"
				    		$totSurvMain.ui.chartIndex = $(this).parent().index();
					    	let objData = {};
					    	objData.TBL_ID = this.options.tblId;
					    	objData.OV_L2_ID = "000";
					    	if(this.options.id == "T01") {
					    		objData.CHAR_ITM_ID = "T01,T02";
					    	} else if(this.options.id == "T03") {
					    		objData.CHAR_ITM_ID = "T03,T04";
					    	} else if(this.options.id == "T05") {
					    		objData.CHAR_ITM_ID = "T05,T06";
					    	} else if(this.options.id == "T07") {
					    		objData.CHAR_ITM_ID = "T07,T08";
					    	} else if(this.options.id == "T09") {
					    		objData.CHAR_ITM_ID = "T09,T10";
					    	} else if(this.options.id == "T11") {
					    		objData.CHAR_ITM_ID = "T11,T12";
					    	} else if(this.options.id == "T13") {
					    		objData.CHAR_ITM_ID = "T13,T14";
					    	} else if(this.options.id == "T15") {
					    		objData.CHAR_ITM_ID = "T15,T16";
					    	} else if(this.options.id == "T17") {
					    		objData.CHAR_ITM_ID = "T17";
					    	}
				    		$totSurvMain.ui.chartData = toolData;
				    		$totSurvMain.ui.chartColor = "#576574";
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 경영형태별 농가 (" + toolData.name.replace("_노지","").replace("_시설","").replace("경영형태별농가:","") + ")";
					    	$farmDash.ui.chartItmClick($(this), objData, "#576574",$totSurvMain.ui.selectedYear+"년 경영형태별 농가 (" + toolData.name.replace("_노지","").replace("_시설","").replace("경영형태별농가:","") + ")", 1);
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
        	itemMarginTop: 3,
			labelFormatter: function () {
				return "<tspan>"+this.name + "</tspan> <tspan x='120'>: " + numberFormat(this.y) + "</tspan>";
			},
			itemMarginBottom:7,
			itemWidth: 200,
			padding: 0,
			margin: 0,
			itemStyle: {
				fontWeight: "100",
				fontFamily: "NanumSquare",
				fontSize:'13.5px'
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
			style: { "font-size": "10pt", "font-weight": "100", "font-family": "NanumSquare"}
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
				states:{
					select:{
						color:'rgb(87, 101, 116)'
					}
				},
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
	
	$farmDash.highcharts.push($farmDash.pieHighcharts);
}



/**
 * @name         : setOwnerCareerChart
 * @description  : 경영주 경력기간별 농가
 * @date         : 
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이, surv_id - 조사id
 */
function setOwnerCareerChart(data, target, resize, height){
	data = data.slice(0,5)
	var margin = ({top: 0, right: 150, bottom: 5, left: 55})
	var colors = ["#37A660", "#64C97F", "#88E498", "#CAEB6F", "#E2DE67"]; //2020.11.10[신예리] 차트 컬러 변경
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	var max = d3.max(data, function(d) { return Number(d.DTVAL_CO) });
	
	$farmDash.moveHomeData = data;
	
		var total = 0;
		for(var i=0; i<data.length; i++){
			total = Number(data[i].DTVAL_CO) + total;
		}

	var chartData = [], categories = [];	
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].DTVAL_CO),color:colors[i]});
		categories.push((data[i].CHAR_ITM_NM).indexOf(":") == -1 ? data[i].CHAR_ITM_NM.replace("(가구)", "") : (data[i].CHAR_ITM_NM).split(":")[1].replace("(가구)", ""));
	}
	categories = categories.map(function(c){if((c).indexOf("년") == -1) c = c + '년'; return c;});
	$farmDash.careerHighcharts = Highcharts.chart(target, {
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
	            pointWidth: 13,
				stacking: 'normal',
				borderRadius:5,
				dataLabels: {
	                enabled: true,
        			inside: false,
	                style: {
						fontSize:'13px',
	                    color: "#111111",
						fontFamily: 'NanumSquare',
						textOutline: false
	                },
					formatter:function(){ return numberFormat(this.y)}
	            },
				point: {
					events: {
						click:function(){
							if(!this.selected) $farmDash.deselectAllHighcharts();
							let d = data[this.index];
								$totSurvMain.ui.selectedNm = d.CHAR_ITM_NM;
							var title ="경영주 경력기간별 농가 (" + d.CHAR_ITM_NM.replace(" (가구)", "").replace("경영주의농사경력기간별농가:", "")+")";
					    	$totSurvMain.ui.chartTarget = target
				    		$totSurvMain.ui.chartIndex = d.CHAR_ITM_ID;//20201126 박은식  data 변경
				    		$totSurvMain.ui.chartData = d;
				    		$totSurvMain.ui.chartColor = "#576574";
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
					    	$farmDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ title,5);
							
							
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

	  $farmDash.highcharts.push($farmDash.careerHighcharts);
}

