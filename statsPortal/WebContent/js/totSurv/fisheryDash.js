/**
 * 총조사시각화 어업
 * 
 * history : 
 * 2020.09.22			총조사시각화 어업
 * 
 * 
 * author : 한광희
 * version : 1.0
 * see : 
 *
 */

//bndYear = "2018"; 

(function(W, D) {
	W.$fisheryDash = W.$fisheryDash || {};
	
	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$fisheryDash.isDev = true;
	/* 공공데이터 조회 변수*/
	$fisheryDash.org_id = "";
	$fisheryDash.tbl_id = "";
	$fisheryDash.kosis_data_item = "";
	$fisheryDash.kosis_data_period = "";
	$fisheryDash.kosis_data_year = "";
	$fisheryDash.gis_se = "";
	$fisheryDash.obj_var_id = "";
	$fisheryDash.field_id = "";
	$fisheryDash.kosis_data_item_detail = "";
	$fisheryDash.oga_div = "2"; // 해수면/내수면 구분값 (1:내수면, 2:해수면)
	$fisheryDash.fisheryTypeNm = '해수면';
	
	$fisheryDash.ajax = {};
	
	$fisheryDash.kosis_result_data = [];
	$fisheryDash.highcharts = [];
	//현재 그려진 d3의 데이터를 담는 변수
	$fisheryDash.totFisheryAge = {}; // 경영주 연령 분포
	$fisheryDash.totGetFish = {}; // 품종별(어류) 어획 어가
	$fisheryDash.totGetOthersFish = {}; // 품종별(기타) 어획 어가
	$fisheryDash.totPriceFish = {}; // 판매 금액별 어가
	$fisheryDash.totFisheryCareer = {} // 경영주 어업 경력 기간별 어가
	$fisheryDash.totInshoreFishery = {} // 근해 어업
	$fisheryDash.totBlockFishery = {} // 구획 어업
	$fisheryDash.totCoastalFishery = {} // 연안 어업
	$fisheryDash.totOthersFishery = {} // 기타 어업
	$fisheryDash.totFisheryOperationType = {} // 경영 형태별 어가
	$fisheryDash.totFisheryTotal = {} // 20201117 박은식 전체 어업 차트데이터 변수 선언
	$fisheryDash.totGetFishTotal = {} // 20201117 박은식 어획품종별(전체) 어획어가 차트데이터 변수 선언
	
 	//현재 그려진 d3의 데이터를 담는 변수
	
	//현재 조회하고있는 rank 지역 level
	$fisheryDash.regionLevel = 'sido';
	//행정시도 정보를 담아둔다
	$fisheryDash.atdrc = '';	
	//비자치구에서 행정시로 이동여부
	$fisheryDash.upperBack = false;
//	$fisheryDash.noReverseGeoCode = true;
	//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 변수 선언 START
	$fisheryDash.chartOpacity = 0;
	$fisheryDash.chartOpacityState = "off";
	$fisheryDash.mulType = "";
	//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 변수 선언 END
	//해수면 내수면 구분
	if($("#seaWater").hasClass("on")){
		$fisheryDash.fisheryType = "sea";
		$fisheryDash.fisheryTypeNm = '해수면';
	} else if($("#inlandWater").hasClass("on2")){
		$fisheryDash.fisheryType = "inland";
		$fisheryDash.fisheryTypeNm = '내수면';
	} else {
		$fisheryDash.fisheryType = "sea";
		$fisheryDash.fisheryTypeNm = '해수면';
	}
	//해수면-내수면 전환 시 지도 상태값
	$fisheryDash.mapState = "off";
	
	$(document).ready(function() {
		
	});
	
	//d3 반응형 이벤트
	$(window).resize( function(){
		if($totSurvMain.ui.pageIndex == '6'){
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
			} else {
				var moveHtml = "";
				var imgH = "";
				moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
				moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px'>"; //20201120 박은식 이미지 마진값 추가
				moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
				moveHtml += "</div>";
				
				// 경영주 연령 분포 셋팅
				if($fisheryDash.totFisheryAge.length > 0){
					setFisheryAgeChart($fisheryDash.totFisheryAge, "totOperatorAge", "Y", "145"); //2020.11.19[신예리] 차트 영역 높이 값 수정
				} else {
					$("#totSlvlIwrsFhrshs").empty();
					$("#totSlvlIwrsFhrshs").append(moveHtml);
				}
				//경영 형태별
				if($fisheryDash.totFisheryOperationType.length > 0){
					fisheryTypePieChart($fisheryDash.totFisheryOperationType, "Y", "180");
				} else {
					$("#fisheryType").empty();
					$("#fisheryType").append(moveHtml);
				}
				if($fisheryDash.fisheryType == "sea"){
					$("#totOperatorAge").parent().find(".chartTitle").eq(0).text("경영주 연령별 어가");
				} else {
					$("#totOperatorAge").parent().find(".chartTitle").eq(0).text("경영주 연령별 어가");
				}
				if($fisheryDash.totFisheryCareer.length > 0){
					//경영주 어업 경력기간별 어가
					setFisheryCareerChart($fisheryDash.totFisheryCareer, "totCareer", "Y", "145"); //2020.11.19[신예리] 차트 영역 높이 값 수정
				} else {
					$("#totCareer").empty();
					$("#totCareer").append(moveHtml);
				}	
				if($("#fish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
					// 품종별(어류) 어획 어가 차트 셋팅
					if($fisheryDash.totGetFish.length > 0){
						totGetFishChart($fisheryDash.totGetFish, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				} else if($("#othersFish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
					if($fisheryDash.totGetOthersFish.length > 0){
						// 품종별(기타) 어획 어가 차트 셋팅
						totGetFishChart($fisheryDash.totGetOthersFish, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				//20201117 박은식 리사이즈 이벤트 추가 START
				} else if($("#inlandAll").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
					if($fisheryDash.totGetFishTotal.length > 0){
						// 품종별(기타) 어획 어가 차트 셋팅
						totGetFishChart($fisheryDash.totGetFishTotal, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				//20201117 박은식 리사이즈 이벤트 추가 END
				} else if($("#inshoreFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
					// 근해어업 차트
					if($fisheryDash.totInshoreFishery.length > 0){
						totGetFishChart($fisheryDash.totInshoreFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				} else if($("#blockFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
					if($fisheryDash.totBlockFishery.length > 0){
						// 구획어업 차트
						totGetFishChart($fisheryDash.totBlockFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				} else if($("#coastalFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
					if($fisheryDash.totCoastalFishery.length > 0){
						// 연안어업 차트
						totGetFishChart($fisheryDash.totCoastalFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
					
				} else if($("#tohersFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
					if($fisheryDash.totOthersFishery.length > 0){
						// 기타어업 차트
						totGetFishChart($fisheryDash.totOthersFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				//20201117 박은식 리사이즈 이벤트 추가 START
				} else if($("#seaAll").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
					if($fisheryDash.totFisheryTotal.length > 0){
						// 기타어업 차트
						totGetFishChart($fisheryDash.totFisheryTotal, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				//20201117 박은식 리사이즈 이벤트 추가 END
				}
				if($fisheryDash.totPriceFish.length > 0){
					// 동력 판매 금액별 어가 차트 셋팅
					setMngerEdcChart($fisheryDash.totPriceFish, "totPriceFish", "Y", "285"); //2020.10.28[신예리] 높이값 변경
				} else {
					imgH = "45";
					$("#totPriceFish").empty();
					$("#totPriceFish").append(moveHtml);
				}
			}

			if($totSurvMain.ui.chartTarget != ""
				&& typeof($totSurvMain.ui.chartIndex) == "number"
				&& $totSurvMain.ui.chartColor != ""){
				 
				$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
				if($totSurvMain.ui.chartTarget  == 'getFishery'){
					$("#"+$totSurvMain.ui.chartTarget).find(".eventGroup").eq($totSurvMain.ui.chartIndex).attr("opacity", 1);
				}
			}
		}
	});
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {});

	$fisheryDash.const = {},
	
	$fisheryDash.ui = {
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
			//20201120 박은식 어가 조회 초기화 START
			$totSurvMain.ui.chartSaveClear();
			$fisheryDash.fisheryType = "sea"
			$totSurvMap.ui.selectedSurvId = "FS0614"; 
			$totSurvMain.ui.tilePerColor = []; 
			//20201120 박은식 어가 조회 초기화 END
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/fisheryDash/main");
		},
		
		ready : function(){
			
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
			var surv_id = 'FS0614';
			if($totSurvMain.ui.selectedYear == "2020"){
				if($fisheryDash.fisheryType =="sea"){
					surv_id = "FS0614";
				} else {
					surv_id = "FS0621";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2015"){
				if($fisheryDash.fisheryType =="sea"){
					surv_id = "FS0112";
				} else {
					surv_id = "FS0171";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2010"){
				if($fisheryDash.fisheryType =="sea"){
					surv_id = "FS0413";
				} else {
					surv_id = "FS0469";
				}
			}
			$totSurvMap.ui.selectedItmCd = "T00";
			
			//$fisheryDash.ui.getRankSet("","","00");
			
			$.ajax({
				method: "POST",
				async: false,	
				url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvRegionCount.json",
				data: { year: $totSurvMain.ui.selectedYear, region_cd : $totSurvMain.ui.selectedArea, surv_id : surv_id, itm_cd : $totSurvMap.ui.selectedItmCd, isAtdrc:$totSurvMap.ui.isAtdrc, thema:"population"}, // 
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
			
			$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
		},
		
		/**
		 * @name         : clear
		 * @description  : 인구총조사 depth 변화시마다 화면 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		clear : function(){

		},
		
		drawContent : function(surv_id, itm_cd, c1, c2){			
			if(surv_id == null|| surv_id == "" || surv_id == undefined){
				if($totSurvMain.ui.selectedYear == "2020"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS20103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI20103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2015"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS15103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI15103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2010"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI103";
					}
				}
			} else {
				$totSurvMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트
				
			}
			
			if(itm_cd==null||itm_cd==""||itm_cd==undefined){
				
				$totSurvMap.ui.selectedItmCd = "T00";
			} else {
				$totSurvMap.ui.selectedItmCd = itm_cd;
			}
			
			$totSurvMap.ui.selectedC1 = c1;
			
			$totSurvMap.ui.selectedC2 = c2;
			
			if($totSurvMain.ui.selectedArea.length==2){
				$totSurvMapnoReverseGeoCode = true;
				if($totSurvMap.ui.map==null || $("#mapRgn_1").html() == ""){ // 20201104 박은식 같은 대시보드 매뉴를 다시 클릭시 맵을 다시그려주기 위해 조건문 추가
					$("#mapRgn_1").show();
					$totSurvMap.ui.createMap("mapRgn_1", 0);
					$("#mapRgn_1").css("height", "590px"); // 2020.11.19[신예리] 영역 높이 수정
					//통계값 표출유무 설정 호출
					//var legend = $totSurvMap.ui.map.legend;
					//console.log("legend.numberData = " + legend.numberData);
					//legend.showNumberData();
				}
				
				if($totSurvMain.ui.selectedArea == "00"){
					$totSurvMap.ui.drawMapData("sido", "color"); // 맵 그리기
				
				} else if($totSurvMap.ui.mapToggleId != ""){
					$totSurvMap.ui.drawMapData("sido", "color"); // 맵 그리기
				} else {
					$totSurvMap.ui.drawMapData("sgg", "color"); // 맵					
				}
				
			} else if ($totSurvMain.ui.selectedArea!="00" && $totSurvMain.ui.selectedArea!="99"){
				if($totSurvMap.ui.map==null){
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
			if($(".legendRing").attr("data-ing") == "min"){
				$(".btn_legend").trigger("click").trigger("click");
			} else  if($(".legendRing").attr("data-ing") == "max"){
				$(".btn_legend").trigger("click");
			}
			if($fisheryDash.fisheryType =="sea"){
				$("#grid_lg_color_0").attr("data-color", "#1A4351").attr("start-color", "#60A8C2").text("#1A4351").css("background", "#1A4351");
			} else {
				$("#grid_lg_color_0").attr("data-color", "#360D3E").attr("start-color", "#BE86C9").text("#360D3E").css("background", "#360D3E");
			}
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
			
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 START
			if(regionCd.length == 5){
				$totSurvMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
			}
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 END
			
			/**행정시 처리 로직 (테스트)*/
			if($totSurvMap.ui.isAtdrc || $("#total_rank").attr('max') == $totSurvMain.ui.atdrcRank){
				//현재 행정시도정보를 저장한다. 
				//비자치구와 행정시의 4자리수까지는 같다는 점을 이용한다
				$fisheryDash.atdrc = $totSurvMain.ui.selectedArea.substring(4,0);
			}
			
			/**행정시 처리 로직 (테스트)*/
			
			var param = {};

			var type = 'total';
			var level = 'sido';

			if($totSurvMain.ui.selectedArea.length == 2 && !$totSurvMap.ui.isAtdrc){
				lavel = 'sido'
			} else if(($totSurvMain.ui.selectedArea.substring(4) != '0' && $fisheryDash.atdrc == $totSurvMain.ui.selectedArea.substring(4,0))){
				level = 'atdrc'// atdrc
			} else {
				level ='sgg'
			}

			
			var year = $totSurvMain.ui.selectedYear;
			if(rank != null && rank != '' && rank != undefined){
				srvLogWrite('P0','08','04','02',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,'regionCd='+regionCd+",year="+year+",rank="+rank);
				param = {year : year, rank : rank, level : level, fisheryType : $fisheryDash.fisheryType}
			} else if(regionCd != null && regionCd != '' && regionCd != undefined){
				param = {year : year, regionCd : regionCd, level : level, fisheryType : $fisheryDash.fisheryType} 
			} else {
				return false;
			}
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFisheryRank.json",
				data: param, 
				dataType: "json",
				success: function(res) {
					console.log(res)
					if(res.result.totFisheryRatio.length == 0 || res.result.totFisheryHouseRnak.length == 0){
						//비자치구 일 경우 행정시도로 이동하는 로직
						if($fisheryDash.upperBack == true){
							$totSurvMap.ui.checkIsAtdrc(region_cd);	
							$totSurvMain.ui.selectedArea = region_cd
							$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
							$totSurvMap.ui.mapRegion = "sgg";
							//$fisheryDash.event.allChange(region_cd,"1")
						}
						return;
					}
					var fisheryRatioLise = [...res.result.totFisheryRatio.filter(d=>d.surv_id==($totSurvMain.ui.selectedYear == '2020'?$fisheryDash.fisheryType=='sea'?
					'FS0614':'FS0621':$fisheryDash.fisheryType=='sea'?
					'FS0112':'FS0171')),
					...res.result.totFisheryRatio.filter(d=>d.surv_id==($totSurvMain.ui.selectedYear == '2020'?
					$fisheryDash.fisheryType=='sea'?
					'FS0112':'FS0171':$fisheryDash.fisheryType=='sea'?
					'FS0413':'FS0469'))];
					var fisheryHouseRankList = res.result.totFisheryHouseRnak;
					var oldFisheryList = [...res.result.totOldFishery.filter(d=>d.surv_id==($totSurvMain.ui.selectedYear == '2020'?$fisheryDash.fisheryType=='sea'?'FS0620':'FS0627':$fisheryDash.fisheryType=='sea'?'FS0146':'FS0205')),...res.result.totOldFishery.filter(d=>d.surv_id==($totSurvMain.ui.selectedYear == '2020'?$fisheryDash.fisheryType=='sea'?'FS0146':'FS0205':$fisheryDash.fisheryType=='sea'?'FS0446':'FS0502'))];
					var fisheryHouseRatioList = [...res.result.totFisheryHouseRatio.filter(d=>d.surv_id==($totSurvMain.ui.selectedYear == '2020'?$fisheryDash.fisheryType=='sea'?'FS0614':'FS0621':$fisheryDash.fisheryType=='sea'?'FS0112':'FS0171')),...res.result.totFisheryHouseRatio.filter(d=>d.surv_id==($totSurvMain.ui.selectedYear == '2020'?$fisheryDash.fisheryType=='sea'?'FS0112':'FS0171':$fisheryDash.fisheryType=='sea'?'FS0413':'FS0469'))];	
					var oldRatio =  0;
					var fisheryRatio = 0;
					var fisheryHouseRatio = 0;
					
					if($fisheryDash.fisheryType == "sea"){
						$("#totFishery").html('<h5 class="colTit" style="margin-top:-5px;">총 어가 수(해수면) </h5><h1>'+numberFormat(fisheryHouseRatioList[0].dt)+'</h1><span class="ml5">가구</span>');
					} else {
						$("#totFishery").html('<h5 class="colTit" style="margin-top:-5px;">총 어가 수(내수면) </h5><h1>'+numberFormat(fisheryHouseRatioList[0].dt)+'</h1><span class="ml5">가구</span>');
					}
					
					if($totSurvMain.ui.selectedYear != '2010'){
						if(oldFisheryList[0].dt == undefined){
							oldRatio = 0;
						}else {
							oldRatio = oldFisheryList[0].dt/fisheryRatioLise[0].dt*100;
						}
						if(fisheryRatioLise.length == 2){
							if(fisheryRatioLise[0].dt == undefined){
								thisRatio = 0
							} else { 
								thisRatio = fisheryRatioLise[0].dt
							}
							if(fisheryRatioLise[1].dt == undefined){
								beforeRatio = 0
							} else {
								beforeRatio = fisheryRatioLise[1].dt
							}
							var upDownCheck2 = "";
							if($totSurvMain.ui.selectedYear != '2010'){
								var calcRatio = thisRatio - beforeRatio;
							} 
							upDownCheck2 = "<h1 class='bold'>"+numberFormat(fisheryRatioLise[0].dt)+"</h1><span class='ml5'>명</span>";									
							$("#fisheryRankRow").html(upDownCheck2);
							//$("#fisheryRank").html(numberFormat( thisRatio - beforeRatio ))
							fisheryRatio = fisheryRratioCalculation(thisRatio,beforeRatio)
						} else {
							$("#fisheryRank").html("-")
							fisheryRatio = ""
						}
						

						
						$("#oldFisheryRt").html(numberFormat((oldFisheryList[0].dt != undefined) ? oldFisheryList[0].dt : 0));
						$("#oldFisheryChangeRt").html("총 어가 인구 중 <span class='stats_normal bold'>"+ oldRatio.toFixed(2)+"% </span>");
						if(fisheryRatio != "" && fisheryRatio != null && fisheryRatio != undefined){
							if(parseFloat(fisheryRatio) > 0){
								fisheryUpDownCheck = "전주기 대비  <span class='stats_up bold'>" +fisheryRatio+" % </span><span class='stats_up'>▲</span>";
							} else if(parseFloat(fisheryRatio) < 0){
								fisheryUpDownCheck = "전주기 대비  <span class='stats_down bold'>" +fisheryRatio.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
							} else {
								fisheryUpDownCheck = "<span class='stats_normal bold'>" +fisheryRatio+" % </span><span class='stats_normal'>-</span>";
							}
						} 
						
						if(fisheryHouseRatioList.length == 2){
							fisheryHouseRatio = fisheryRratioCalculation(fisheryHouseRatioList[0].dt,fisheryHouseRatioList[1].dt)
							if(fisheryHouseRatio != "" && fisheryHouseRatio != null && fisheryHouseRatio != undefined){
								if(parseFloat(fisheryHouseRatio) > 0){
									fisheryHouseUpDownCheck = "전주기 대비 <span class='stats_up bold'>" +fisheryHouseRatio+" % </span><span class='stats_up'>▲</span>";
								} else if(parseFloat(fisheryHouseRatio) < 0){
									fisheryHouseUpDownCheck ="전주기 대비  <span class='stats_down bold'>" +fisheryHouseRatio.replace("-", "")+" % </span><span class='stats_down'>▼</span>";
								} else {
									fisheryHouseUpDownCheck = "<span class='stats_normal bold'>" +fisheryHouseRatio+" % </span><span class='stats_normal'>-</span>";
								}
							} 
						} else {
							fisheryHouseRatio = "-"
							fisheryHouseUpDownCheck = "<span class='stats_normal bold'>" +fisheryHouseRatio+" % </span><span class='stats_normal'></span>";
						}
						
					} else {
						oldRatio = (oldFisheryList[1].dt != undefined) ? oldFisheryList[1].dt/fisheryRatioLise[0].dt*100 : 0/fisheryRatioLise[0].dt*100;
						$("#fisheryRank").html("-")
//						$("#fisheryChangeRt")
						$("#oldFisheryRt").html(numberFormat((oldFisheryList[0].dt != undefined) ? oldFisheryList[0].dt : 0));
						$("#oldFisheryChangeRt").html("총 어가 인구 중 <span class='stats_normal bold'>"+ oldRatio.toFixed(2)+"% </span>");
						$("#fisheryHouser").html(numberFormat(fisheryHouseRankList[0].dt))
						
						$("#fisheryRank").html("-")
						$("#fisheryChangeRt")
						$("#oldFisheryRt").html(numberFormat((oldFisheryList[1].dt != undefined) ? oldFisheryList[1].dt : 0));
						$("#oldFisheryChangeRt").html("총 어가 인구 중 <span class='stats_normal bold'>"+ oldRatio.toFixed(2)+"% </span>");
						$("#fisheryHouser").html(numberFormat(fisheryHouseRankList[0].dt))
						
						var upDownCheck2 = "";
						var calcRatio = '-'
						upDownCheck2 = "<h1 class='stats_normal bold'>"+calcRatio+"</h1><span class='ml5 stats_normal'>명 유지</span>";
						$("#fisheryRankRow").html(upDownCheck2);
						
						fisheryHouseUpDownCheck = "증감율 데이터 없음";
						fisheryRatio = "-";
						fisheryUpDownCheck = "증감율 데이터 없음";
					}
					if(fisheryHouseRatioList.length == 2){
						if(fisheryHouseRatioList[0].dt-fisheryHouseRatioList[1].dt > 0){
							fisheryHouseInfoUpDown = "<h1 class='stats_up bold'>"+numberFormat(fisheryHouseRatioList[0].dt-fisheryHouseRatioList[1].dt)+"</h1>" //2020.11.18[신예리] row클래스 삭제
							fisheryHouseInfoUpDown += "<span class='m15 stats_up'>가구 증가</span>"
						} else if(fisheryHouseRatioList[0].dt-fisheryHouseRatioList[1].dt < 0){
							fisheryHouseInfoUpDown = "<h1 class='stats_down bold'>"+(numberFormat(fisheryHouseRatioList[0].dt-fisheryHouseRatioList[1].dt)+"").replace("-", "")+"</h1>" //2020.11.18[신예리] row클래스 삭제
							fisheryHouseInfoUpDown += "<span class='m15 stats_down'>가구 감소</span>"
						} else {
							fisheryHouseInfoUpDown = "<h1 class='stats_normal bold'>-</h1>" //2020.11.18[신예리] row클래스 삭제
							fisheryHouseInfoUpDown += "<span class='m15 stats_normal'>가구 유지</span>"
						}
					} else {
						fisheryHouseInfoUpDown = "<h1 class='stats_normal bold'>-</h1>" //2020.11.18[신예리] row클래스 삭제
						fisheryHouseInfoUpDown += "<span class='m15 stats_normal'></span>"
					}
					$("#fisheryHouseInfo").html(fisheryHouseInfoUpDown);
					$("#fisheryChangeRt").html(fisheryUpDownCheck);
					$("#fisheryHosueChangeRt").html(fisheryHouseUpDownCheck);
					
					var region_cd = fisheryHouseRankList[0].region_cd;
					
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
						$fisheryDash.ui.clear();
						
						/** chart renderer */
						if(region_cd.length == 2){
				    		$("#dash_sido option[value='"+region_cd+"']").attr("selected", "true");
				    		if(region_cd != '00' && region_cd != '99'){
				    			$("#dash_sgg option[value='999']").attr("selected", "true");
				    		}
				    		$totSurvMain.ui.tileChangeYn = "Y"; 
				    		$totSurvMain.ui.selectedLevel = "1";
				    		$fisheryDash.event.allChange(region_cd, "1");
				    	}
				    	// 시군구 데이터 일 경우 kosis정보 호출
						/** 2020-09-21 [곽제욱] 시군구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    	else if(region_cd.length == 5){
				    		var tempRegionCd = region_cd.substring(0,4)+"0";
				    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);								    		
				    		if($totSurvMap.ui.isAtdrc != true){
				    			// sidosgg() 시군구 세팅 로직 추가필요
				    			$totSurvMain.ui.getSidoSggPos(region_cd.substring(0,2));
				    			$totSurvMap.ui.mapToggleId = region_cd;
				    			$totSurvMain.ui.selectedArea = region_cd.substring(0,2);
				    			$fisheryDash.event.allChange(region_cd, "1");
				    		}
				    		/** 2020-09-21 [곽제욱] 비자치구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
				    		else{
				    			$totSurvMain.ui.selectedArea = tempRegionCd;
				    			console.log("#########################   비자치구 클릭됨     ##############");
				    			$fisheryDash.event.allChange(tempRegionCd, "1");
				    		}
				    	}
					}
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						$fisheryDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,fisheryHouseRankList[0].rank, $totSurvMap.ui.mapToggleId);
					} else {
						$fisheryDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,'0','0','0', '');
					}
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						 
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
				},
				error: function(){
					
				}
			})
			$fisheryDash.upperBack = false;
			
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
		rankSlideRender : function(regionCd, fisheryHouseRank, toggleId){
			if(regionCd !="00" && regionCd !="99" && regionCd !=""){
				$("#fisheryHouse_range").show();
			} else {
				$("#fisheryHouse_range").hide();
			}
			
			$totSurvMain.ui.tileChangeYn = "Y";
			// 시도이동, 시군구이동의 경우
			if($totSurvMain.ui.selectedArea.length == 2){	// 2020-10-14 [주형식] 시도 비교 로직 수정
				// 그중 시군구 이동(지도에는 시군구 레벨로 표출, 선택지역 하이라이트 처리)
				if(toggleId.length == 5){
					$fisheryDash.regionLevel = 'sgg'
					$("#fisheryHouse_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#fisheryHouse_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
					$totSurvMap.ui.mapToggleId = toggleId;
					$fisheryDash.event.allChange(toggleId, "2");
				} else {
					$fisheryDash.regionLevel = 'sido'
					$("#fisheryHouse_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
					$("#fisheryHouse_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
				}
			} else if($totSurvMain.ui.selectedArea.substring(4) != '0' ) { // 2020-10-14 [곽제욱] 비자치구 체크조건 수정
				if($totSurvMain.ui.atdrcRank != 0) {
					$fisheryDash.regionLevel = 'atdrc'
					$("#fisheryHouse_rank").attr("max", $totSurvMain.ui.atdrcRank);
					$("#fisheryHouse_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
				} else {
					$("#fisheryHouse_range").hide();
				}
			} else if($("#fisheryHouse_rank").attr("max") != $totSurvMain.ui.atdrcRank || $fisheryDash.upperBack == false){ //20201013 박은식 $fisheryDash.upperBack 조건이 false 일때로 변경 (비자치구에서 나온경우)
				$fisheryDash.regionLevel = 'sgg'
				$("#fisheryHouse_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#fisheryHouse_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 START
			} else {
				$fisheryDash.regionLevel = 'sgg'
					$("#fisheryHouse_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
					$("#fisheryHouse_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			}
			// 20201013 박은식 모든조건을 만족하지 않으면 시군구 인 경우조건 추가 END
			$("#fisheryHouse_rank").val(fisheryHouseRank);
			$("#fisheryHouse_range").find("span").eq(2).text(fisheryHouse_rank+"번째");
			$("#fisheryHouse_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#fisheryHouse_rank").attr("max")-1))*($("#fisheryHouse_rank").val()-1)) + '%, #fff ' + ((100/($("#fisheryHouse_rank").attr("max")-1))*($("#fisheryHouse_rank").val()-1)) + '%, white 100%)');
			
			if($totSurvMain.ui.selectedArea.length == 2){
				var areaTitle = $("#dash_sido option:selected").html();
				if($totSurvMain.ui.selectedArea == "00" ||$totSurvMain.ui.selectedArea == "99"){
					$("#fisheryRanking").html("전국 "+"어가 인구")
					$("#OldFisheryRanking").html("전국 어가 인구 중 고령인구");
					$("#fisheryHouseRanking").html("전국 전주기 대비 어가 수");
				} else{
					$("#fisheryRanking").html(areaTitle+" "+"어가 인구")
					$("#OldFisheryRanking").html(areaTitle + " 어가 인구 중 고령인구");
					$("#fisheryHouseRanking").html(areaTitle + " 전주기 대비 어가 수");
				}
				
			}else if($totSurvMain.ui.selectedArea.length == 5){
				var areaTitle = $("#dash_sgg option:selected").html();
				$("#fisheryRanking").html(areaTitle+" "+"어가 인구 대비")
				$("#OldFisheryRanking").html(areaTitle + " 어가 인구 중 고령인구");
				$("#fisheryHouseRanking").html(areaTitle + " 전주기 대비 어가 수");
			}
			$("#rangeV3").find('span').eq(0).text($("#fisheryHouse_rank").val()+"번");
			$("#rangeV3").offset({left:133+((100/($("#fisheryHouse_rank").attr("max")-1))*($("#fisheryHouse_rank").val()-1)/100*($("#fisheryHouse_rank").outerWidth()-20)), top:$("#fisheryHouse_rank").offset().top-30}) // 843
			$("#fisherytitle").html("총 주택 - " + areaTitle);
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
			$fisheryDash.ui.rankSlideRender("00", 0,0,0, "");
			
			
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
	    	} else if($totSurvMap.ui.selectedObj == obj){
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
			params+= ',itm_cd='+d.CHAR_ITM_NM+',surv_id='+d.TBL_ID;
			
			if( chartType == 1 ){
				srvLogWrite('P0','08','05','01',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,params); //경영형태별 어가
			} else if( chartType == 2 ){
				srvLogWrite('P0','08','05','02',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,params); //수산물 판매금액별 어가
			} else if( chartType == 3 ){
				srvLogWrite('P0','08','05','03',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,params); //어획품종별 어가
			} else if( chartType == 4 ){
				srvLogWrite('P0','08','02','00',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,params); //경영주 연령별 어가
			} else if( chartType == 5 ){
				srvLogWrite('P0','08','03','00',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,params); //경영주 어업 경력기간별 어가
			}
			
			// 선택한 레벨이 3이 아닐경우
			if($totSurvMain.ui.selectedLevel != 3){
				// 선택한 obj와 이전에 선택한 obj가 다를 경우
				if(obj[0] != $totSurvMap.ui.selectedObj[0]){
						//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 조건 START
					if(obj.parent().parent().parent().attr("id") == "getFishery"){
						$fisheryDash.chartOpacityState = "on";
					}
						//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 조건 END
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
			    			if($fisheryDash.fisheryType =="sea"){
			    				$farmDash.ui.drawContent("FS0614", "T00", "000");
			    			} else {
			    				$farmDash.ui.drawContent("FS0621", "T00", "000");
			    			}
			    		} else if($totSurvMain.ui.selectedYear == "2015"){
			    			if($fisheryDash.fisheryType =="sea"){
			    				$farmDash.ui.drawContent("FS0112", "T00", "000");
			    			} else {
			    				$farmDash.ui.drawContent("FS0171", "T00", "000");
			    			}
			    		} else {
			    			if($fisheryDash.fisheryType =="sea"){
			    				$farmDash.ui.drawContent("FS0413", "T00", "000");
			    			} else {
			    				$farmDash.ui.drawContent("FS0469", "T00", "000");
			    			}
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
						//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 조건 START
						if($totSurvMap.ui.selectedObj != "" && $totSurvMap.ui.selectedObj.parent().parent().parent().attr("id") == "getFishery"){
							$totSurvMap.ui.selectedObj.attr("opacity", $totSurvMap.ui.selectedObj.attr("data-base"));
						}
						//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 조건 END
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
		    		// 
		    		
		    			$fisheryDash.ui.drawContent(d.TBL_ID, d.CHAR_ITM_ID, d.OV_L1_ID, d.OV_L2_ID); // 2020
					
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
		    		$fisheryDash.chartOpacityState = "off" //20201117 박은식 opacity 유지 초기화
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
		    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);		
		    		if($totSurvMap.ui.isAtdrc){
		    			$totSurvMap.ui.mapToggleId = "";
		    		}
		    		
		    	if($totSurvMain.ui.selectedYear == "2020"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS20103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI20103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2015"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS15103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI15103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2010"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI103";
					}
				}
		    		//////////////////////////
					$fisheryDash.ui.drawContent($totSurvMap.ui.selectedSurvId, "T00", "000");
					if($totSurvMain.ui.chartColor != ""){
						obj.attr("fill", $totSurvMain.ui.chartColor);
						//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 조건 START
						if($totSurvMap.ui.selectedObj != "" && $totSurvMap.ui.selectedObj.parent().parent().parent().attr("id") == "getFishery"){
							$totSurvMap.ui.selectedObj.attr("opacity", $totSurvMap.ui.selectedObj.attr("data-base"));
						}
						//20201117 박은식 해수면 어로어업, 내수면 어획 차트 opacity 유지 조건 END
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
				//20201117 박은식 툴팁 위치 조절 START
				$(target).css("left", screenWidth -((title.length > 10) ? 260 : 210) + "px")
				$(target).css("top", d3.event.pageY + y - 10 + "px")
				//20201117 박은식 툴팁 위치 조절 END
			} else {
				$(target).css("left", d3.event.pageX + x + "px")
				$(target).css("top", d3.event.pageY + y + "px")
			}
			$(target).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year+ "년 "+ title.replace('(명)', '').replace('-', ' ').replace('_', ' ') + standard + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ data + "</p>" + unit);
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
		
		$fisheryDash.org_id = tmp[1].split("&")[0];
		$fisheryDash.tbl_id = tmp[2].split("&")[0];
		//$fisheryDash.gis_se = gis_se;
		
		if(!$fisheryDash.isDev){
			
		}
		else{
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do";
			lv_url += "?org_id="+ $fisheryDash.org_id;
			lv_url += "&list_id="+ $fisheryDash.tbl_id;
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
				
				$fisheryDash.obj_var_id = resultData[0].obj_var_id;
				$fisheryDash.field_id = resultData[0].field_id;
				
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
		
		if(!$fisheryDash.isDev){
			// 운영 호출 
		}
		else{
			
			var map = $totSurvMap.ui.map;
			map.selectedBoundMode = "multi";
			
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
			lv_url += "?org_id="+ $fisheryDash.org_id;
			lv_url += "&tbl_id="+ $fisheryDash.tbl_id;
			lv_url += "&kosis_data_item_detail=" + "%20";
			lv_url += "&kosis_data_item=" + "T100";
			lv_url += "&kosis_data_period=" + "Y";
			//lv_url += "&kosis_data_year=" + $totSurvMain.ui.selectedYear;
			lv_url += "&kosis_data_year=" + "";
			//lv_url += "&atdrc_yn=Y";
			//lv_url += "&gis_se="+ $fisheryDash.gis_se;
			// 선택된 구(5자리)로 설정
			console.log("$totSurvMain.ui.selectedArea = " + $totSurvMain.ui.selectedArea);
			if($totSurvMain.ui.selectedArea != null && $totSurvMain.ui.selectedArea.length == 5){
				lv_url += "&gis_se="+ $totSurvMain.ui.selectedArea;
			}
			else{
				lv_url += "&gis_se="+ "25030";
			}
			lv_url += "&obj_var_id=" + $fisheryDash.obj_var_id;
			lv_url += "&field_id=" + $fisheryDash.field_id;
			
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
								// 개방형지도란 버튼 활성화
								//$(".mapInfo").show();
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
					$fisheryDash.kosis_result_data = [];
					$fisheryDash.kosis_result_data = result;
					
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
		
		this.map.data.push($fisheryDash.kosis_result_data);
		this.map.dataType = "kosis";
		this.map.dataForCombine = $fisheryDash.kosis_result_data;
		
		var yearArr = [];
		var options = $('#bndYear option');
		var values = $.map(options ,function(option) {
			yearArr.push(option.value);
		});
		
		var yearMax = Math.max.apply(null, yearArr);
		var yearMin = Math.min.apply(null, yearArr);
		
		var year = $fisheryDash.kosis_data_year;
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
		$fisheryDash.kosis_result_data = tempData;
		
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
	

	$fisheryDash.util = {};
	
	$fisheryDash.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			
			console.log("■$fisheryDash.event.setUIEvent() called.");
			
			var body = $("body");
			//20201117 박은식 해수면 어로어업 전체 추가 및 데이터 없을 시 이미치 추가 START
			body.on("click", "#inshoreFishery, #blockFishery, #coastalFishery, #tohersFishery, #seaAll", function(){
				var moveHtml = "";
				var imgH = "";
				moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
				moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px'>"; //20201120 박은식 이미지 마진값 추가
				moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
				moveHtml += "</div>";
			//20201117 박은식 해수면 어로어업 전체 추가 및 데이터 없을 시 이미치 추가 END
				$("#seaButton > button").removeClass("on");
				$(this).addClass("on")
				if($(this).attr("id") == 'inshoreFishery'){
					if($fisheryDash.totInshoreFishery.length > 0){
						totGetFishChart($fisheryDash.totInshoreFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				} else if($(this).attr("id") == 'blockFishery'){
					if($fisheryDash.totBlockFishery.length > 0){
						// 구획어업 차트
						totGetFishChart($fisheryDash.totBlockFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				} else if($(this).attr("id") == 'coastalFishery'){
					if($fisheryDash.totCoastalFishery.length > 0){
						// 연안어업 차트
						totGetFishChart($fisheryDash.totCoastalFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				} else if($(this).attr("id") == 'tohersFishery'){
					if($fisheryDash.totOthersFishery.length > 0){
						// 기타어업 차트
						totGetFishChart($fisheryDash.totOthersFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
			//20201117 박은식 해수면 어로어업 전체 추가 및 차트 선택 유지 로직 추가 START
				} else if($(this).attr("id") == 'seaAll'){
					if($fisheryDash.totFisheryTotal.length > 0){
						// 기타어업 차트
						totGetFishChart($fisheryDash.totFisheryTotal, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
				}
				if($totSurvMain.ui.chartTarget != ""
					&& $totSurvMain.ui.chartIndex != "" //20201126 박은식 조건문 변경
					&& $totSurvMain.ui.chartColor != ""
					&& $fisheryDash.mulType == $(this).attr("id")){
					//20201126 박은식 index 로직 추가 START
					var index;
					for(var i=0;i < $("#"+$totSurvMain.ui.chartTarget).find(".eventGroup").length; i++){
						if($("#"+$totSurvMain.ui.chartTarget).find(".eventGroup").attr("item") == $totSurvMain.ui.chartIndex){
							index = i;
							break;
						}
					}
					//20201126 박은식 index 로직 추가 START
					$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					$("#"+$totSurvMain.ui.chartTarget).find(".eventGroup").eq(index).attr("opacity", 1); //20201126 박은식 찾은 index로 요소 적용
				}
				//20201117 박은식 해수면 어로어업 전체 추가 및 차트 선택 유지 로직 추가 END
			})
			
			//20201117 박은식 내수면 어획 전체 추가 데이터 없을 시 이미지 추가 START
			body.on("click", "#fish, #othersFish, #inlandAll", function(){
				var moveHtml = "";
				var imgH = "";
				moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
				moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px'>"; //20201120 박은식 이미지 마진값 추가
				moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
				moveHtml += "</div>";
			//20201117 박은식 내수면 어획 전체 추가 데이터 없을 시 이미지 추가 END
				if($(this).attr('id') == "fish"){
					if($(this).hasClass("on")){
						return
					}
					if($fisheryDash.totGetFish.length > 0){
						totGetFishChart($fisheryDash.totGetFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
					$(this).addClass("on")
					$("#othersFish").removeClass("on")
					$("#inlandAll").removeClass("on") //20201117 박은식 id값 변경
					//20201117 박은식 불필요한 소스 삭제 START
//					$("#shellfish").removeClass("on")
//					$("#inlandothersFish").removeClass("on")
//				} else if($(this).attr("id") == "shellfish"){
//					if($(this).hasClass("on")){
//						return
//					}
//					if($fisheryDash.totGetShellfish.length > 0){
//						// 품종별(패류,갑각류) 어획 어가 차트 셋팅
//						totGetFishChart($fisheryDash.totGetShellfish, "getFishery", "N", "190");
//					} else {
//						$("#getFishery").empty();
//						$("#getFishery").append(moveHtml);
//					}
//					$(this).addClass("on")
//					$("#fish").removeClass("on")
//					$("#othersFish").removeClass("on")
//					$("#inlandothersFish").removeClass("on")
					//20201117 박은식 불필요한 소스 삭제 END
				} else if($(this).attr("id") == "othersFish"){
					if($(this).hasClass("on")){
						return
					}
					if($fisheryDash.totGetOthersFish.length > 0){
						// 품종별(기타) 어획 어가 차트 셋팅
						totGetFishChart($fisheryDash.totGetOthersFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
					$(this).addClass("on")
					$("#fish").removeClass("on")
					$("#inlandAll").removeClass("on") //20201117 박은식 id값 변경
				} else if($(this).attr("id") == "inlandAll"){ //20201117 박은식 조건문 변경
					if($(this).hasClass("on")){
						return
					}
					if($fisheryDash.totGetFishTotal.length > 0){ //20201117 박은식 조건문 변경
						// 품종별(기타) 어획 어가 차트 셋팅
						totGetFishChart($fisheryDash.totGetFishTotal, "getFishery", "N", "210"); //20201117 박은식 변수 변경 //2020.11.19[신예리] 높이값 변경
					} else {
						$("#getFishery").empty();
						$("#getFishery").append(moveHtml);
					}
					$(this).addClass("on")
					$("#fish").removeClass("on")
					//$("#shellfish").removeClass("on") //20201117 박은식 불필요한 소스 삭제
					$("#othersFish").removeClass("on")
				}
				//20201117 박은식 차트유지 이벤트 추가 START
				if($totSurvMain.ui.chartTarget != ""
					&& typeof($totSurvMain.ui.chartIndex) == "number"
					&& $totSurvMain.ui.chartColor != ""
					&& $fisheryDash.mulType == $(this).attr("id")){
					$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					$("#"+$totSurvMain.ui.chartTarget).find(".eventGroup").eq($totSurvMain.ui.chartIndex).attr("opacity", 1);
				}
				//20201117 박은식 차트유지 이벤트 추가 END
			})
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 start*/
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#fisheryHouse_rank", function(e){ // 20201014 박은식 IE event 문제로 change 추가
			//2020.09.10[신예리] 슬라이드 컬러 수정
				$totSurvMain.ui.chartTarget = "";
	    		$totSurvMain.ui.chartIndex = "";
	    		$totSurvMain.ui.chartData = "";
	    		$totSurvMain.ui.chartColor = "";
	    		$totSurvMain.ui.chartTitle = "";
	    		$totSurvMap.ui.selectedObj[0] = "";
				this.style.background = 'linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
					$("#rangeV3").find('span').eq(0).text(this.value+"번");
					$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#fisheryHouse_rank").outerWidth()-20)), top:$("#fisheryHouse_rank").offset().top-30})
			})
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 end*/
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 start*/
			body.on("mouseup", "#fisheryHouse_rank", function(){  // 20201012 박은식 IE event 문제로 change 추가
				$fisheryDash.ui.getRankSet(this.value, this.id, "");
			})
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 end*/
			
			if($totSurvMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			$fisheryDash.ui.getRankSet("", "",$totSurvMain.ui.selectedArea);
			// 총조사시각화정보
			/** 각 차트 영역 클릭시 tileMap 과 지도 변경 (현재는 계만 조회, 각 막대별 클릭일경우 함수 변경 필요 */
			
			/** 맵 선택 - 안보이게 설정*/
			$(".select").hide();
			
			// 개방형지도란 버튼 활성화/비활성화
			$(".mapInfo").hide();	
			
			/** 맵 최대크기 */
			body.on("click", ".mapExport", function(){
				
				srvLogWrite('P0','01','04','02',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,( $(".mapExport").hasClass("on") ? "작게" : "크게" ) );
				
				if($(".mapExport").hasClass("on")) {
					$fisheryDash.mapState = "off"
//					alert("큰화면 -> 작은화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					
					$(".mapExport").removeClass("on");
					//$("#allPopulationForTime").show(); // 2020-10-12 [곽제욱] 주석처리
					$(".col-SubL").width("");
					$(".col-SubL").height(""); //2020.09.16[신예리] 영역 맞춤 //2020.11.19[신예리] 높이값 삭제
					// 맵 사이즈
					$('#mapRgn_1').width("");
					$('#mapRgn_1').height("590px");  // 2020.11.19[신예리] 영역 높이 수정
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
					//$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "2"); 2020-10-12 [곽제욱] 로직 변경으로 인한 주석처리
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 END
					
					$("#graphWrap").parent().show()
					$("#totOperatorAge").parent().show()
					$("#getFishery").parent().show()
					$("#totPriceFish").parent().show()
					$("#totCareer").parent().show()
					$("#fisheryType").parent().show()
					$("#graphWrap").width("100%")
					$("#totOperatorAge").width("100%")
					$("#getFishery").width("100%")
					$("#totPriceFish").width("100%")
					$("#totCareer").width($("#totCareerDiv").width()-20);
					$("#fisheryType").width("100%")
					var moveHtml = "";
					var imgH = "";
					moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
					moveHtml += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px'>"; //20201120 박은식 이미지 마진값 추가
					moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
					moveHtml += "</div>";
					
					// 경영주 연령 분포 셋팅
					if($fisheryDash.totFisheryAge.length > 0){
						setFisheryAgeChart($fisheryDash.totFisheryAge, "totOperatorAge", "N", "145"); //2020.11.19[신예리] 차트 영역 높이 값 수정
					} else {
						$("#totSlvlIwrsFhrshs").empty();
						$("#totSlvlIwrsFhrshs").append(moveHtml);
					}
					//20201117 박은식 불필요한 소스 삭제 START
//					if($fisheryDash.fisheryType == "sea"){
//						$("#totOperatorAge").parent().find(".chartTitle").eq(0).text("경영주 연령별 어가");
//					} else {
//						$("#totOperatorAge").parent().find(".chartTitle").eq(0).text("경영주 연령별 어가");
//					}
					//20201117 박은식 불필요한 소스 삭제 END
					if($fisheryDash.totFisheryCareer.length > 0){
						//경영주 어업 경력기간별 어가
						setFisheryCareerChart($fisheryDash.totFisheryCareer, "totCareer", "N", "145"); //2020.11.19[신예리] 차트 영역 높이 값 수정
					} else {
						$("#totCareer").empty();
						$("#totCareer").append(moveHtml);
					}
					if($("#fish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
						// 품종별(어류) 어획 어가 차트 셋팅
						if($fisheryDash.totGetFish.length > 0){
							totGetFishChart($fisheryDash.totGetFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					}/* else if($("#shellfish").hasClass("on")){
						if($fisheryDash.totGetShellfish.length > 0){
							// 품종별(패류,갑각류) 어획 어가 차트 셋팅
							totGetFishChart($fisheryDash.totGetShellfish, "getFishery", "N", "180");
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
						
					}*/ else if($("#othersFish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
						if($fisheryDash.totGetOthersFish.length > 0){
							// 품종별(기타) 어획 어가 차트 셋팅
							totGetFishChart($fisheryDash.totGetOthersFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					//20201117 박은식 리사이즈 이벤트 추가 START
					} else if($("#inlandAll").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
						if($fisheryDash.totGetFishTotal.length > 0){
							// 품종별(기타) 어획 어가 차트 셋팅
							totGetFishChart($fisheryDash.totGetFishTotal, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					} else if($("#inshoreFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						// 근해어업 차트
						if($fisheryDash.totInshoreFishery.length > 0){
							totGetFishChart($fisheryDash.totInshoreFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					} else if($("#blockFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totBlockFishery.length > 0){
							// 구획어업 차트
							totGetFishChart($fisheryDash.totBlockFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					} else if($("#coastalFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totCoastalFishery.length > 0){
							// 연안어업 차트
							totGetFishChart($fisheryDash.totCoastalFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
						
					} else if($("#tohersFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totOthersFishery.length > 0){
							// 기타어업 차트
							totGetFishChart($fisheryDash.totOthersFishery, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
						
					} else if($("#seaAll").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totFisheryTotal.length > 0){
							// 기타어업 차트
							totGetFishChart($fisheryDash.totFisheryTotal, "getFishery", "Y", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					//20201117 박은식 리사이즈 이벤트 추가 END
					}
//					if($fisheryDash.totPowerTons.length > 0){
//						// 동력 톤수별 어가 차트 셋팅
//						setMngerEdcChart($fisheryDash.totPowerTons, "totPowerTons", "N", "170"); //2020.10.28[신예리] 높이값 변경
//					} else {
//						$("#totPowerTons").empty();
//						$("#totPowerTons").append(moveHtml);
//					}
					if($fisheryDash.totPriceFish.length > 0){
						// 동력 판매 금액별 어가 차트 셋팅
						setMngerEdcChart($fisheryDash.totPriceFish, "totPriceFish", "N", "285"); //2020.10.28[신예리] 높이값 변경
					} else {
						$("#totPriceFish").empty();
						$("#totPriceFish").append(moveHtml);
					}

				}
				else{
//					alert("작은화면 -> 큰화면");
					$fisheryDash.mapState = "on"
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					$(".mapExport").addClass("on");
					$("#fisheryType").width($("#fisheryType").outerWidth())
					$("#graphWrap").width($("#graphWrap").outerWidth())
					$("#totOperatorAge").width($("#totOperatorAge").outerWidth())
					$("#getFishery").width($("#getFishery").outerWidth())
					$("#totPriceFish").width($("#totPriceFish").outerWidth())
					$("#totCareer").width($("#totCareer").outerWidth())
					$("#graphWrap").parent().hide()
					$("#totCareer").parent().hide()
					$("#totOperatorAge").parent().hide()
					$("#getFishery").parent().hide()
					$("#totPriceFish").parent().hide()
					$("#fisheryType").parent().hide()
					
					// 지도 크기 설정
					$(".col-SubL").width($(window).width()-430);
					$(".col-SubL").height("833px"); //2020.09.15 [신예리] height 값 수정 //2020.11.20[신예리] height 값 수정
					
					// 최초지도
					$("#worldMap").width("1480px");
					$("#worldMap").height("807px"); //2020.09.15 [신예리] height 값 수정 //2020.11.20[신예리] height 값 수정
									
					$("#mapArea").width($(window).width()-430);
					$("#mapArea").height("807px"); //2020.09.15 [신예리] height 값 수정 //2020.11.20[신예리] height 값 수정
					
					// 맵 사이즈
					$('#mapRgn_1').width($(window).width()-430);
					$('#mapRgn_1').height("807px"); //2020.09.15 [신예리] height 값 수정 //2020.11.20[신예리] height 값 수정
					
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
				
				srvLogWrite('P0','01','04','03',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,'year='+$totSurvMain.ui.selectedYear);

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
					/** 2020-10-12 [곽제욱] zoomIn 센터좌표 이벤트 추가 END */
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
							$fisheryDash.event.allChange(to_sido_cd, "1");
							$totSurvMap.ui.map.mapMove([x, y], (lv_zoom+1), false); 
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
							$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
						$totSurvMap.ui.map.setZoom((lv_zoom+1));
						
						var to_center = $totSurvMap.ui.map.gMap.getCenter();
						$totSurvMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom+1), false);
						
					}
					
				});

			});
			
			/** 맵 축소 */
			body.on("click", "#pOut", function(){ //20201013 박은식 class -> id로 selector변경		
				var lv_zoom = $totSurvMap.ui.map.zoom;
				$totSurvMap.ui.map.setZoom((lv_zoom-1));
				console.log("lv_zoom = " + lv_zoom);

				srvLogWrite('P0','01','04','04',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,'year='+$totSurvMain.ui.selectedYear);
				
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
									$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$fisheryDash.upperBack = true;
									$fisheryDash.ui.getRankSet("", "sgg", $totSurvMain.ui.selectedArea);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경									
								} else {
									$totSurvMain.ui.selectedLevel =  "1";
									$totSurvMain.ui.selectedArea = to_sido_cd;
									$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$totSurvMain.ui.pathChange("sgg", to_sido_cd);
									$fisheryDash.upperBack = true;
									$totSurvMap.ui.mapToggleId = "";
									$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$totSurvMap.ui.isAtdrc = false;
									$fisheryDash.ui.getRankSet("", "sido", to_sido_cd);
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
								$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
			
			var body = $("body");
			
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장) 이벤트 추가 START
			// 차트 이미지 저장
			body.on("click", "[name=chartBtn]", function(evnt){ 
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','09','00',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				console.log("selId = " + selId);
				
				if(selId == "fisheryTypeDiv"){
					//경영 형태별 어가
					chartModal($fisheryDash.totFisheryOperationType.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "totCareerDiv"){
					chartModal($fisheryDash.totFisheryCareer.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "moveDiv"){
					if($fisheryDash.fisheryType =="sea"){
						if($("#inshoreFishery").hasClass("on")){
							//근해어업
							chartModal($fisheryDash.totInshoreFishery.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
						}	
						else if($("#blockFishery").hasClass("on")){
							//구획어업
							chartModal($fisheryDash.totBlockFishery.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구');  //20201202 박은식 파라미터 추가
						}	
						else if($("#coastalFishery").hasClass("on")){
							//연안어업
							chartModal($fisheryDash.totCoastalFishery.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
						}	
						else if($("#tohersFishery").hasClass("on")){
							//기타어업
							chartModal($fisheryDash.totOthersFishery.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
						}
						//20201117 박은식 전체 차트유형 추가 START
						else if($("#seaAll").hasClass("on")){
							//전체
							chartModal($fisheryDash.totFisheryTotal.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
						}
						//20201117 박은식 전체 차트유형 추가 END
					} else {
						if($("#fish").hasClass("on")){
							//어류
							chartModal($fisheryDash.totGetFish.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
						}
						else if($("#othersFish").hasClass("on")){
							//기타류
							chartModal($fisheryDash.totGetOthersFish.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
						}
						//20201117 박은식 전체 차트유형 추가 START
						else if($("#inlandAll").hasClass("on")){
							//전체
							chartModal($fisheryDash.totGetFishTotal.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
						}
						//20201117 박은식 전체 차트유형 추가 END
					}		
				}
				else if(selId == "fishPriceDiv"){
					//수산물 판매 금액별 어가
					chartModal($fisheryDash.totPriceFish.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm1', 'itm_nm', 'dt', '', '어가', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "totOperatorAgeDiv"){
					//경영주 연령분포
					chartModal($fisheryDash.totFisheryAge.map(function(value){
						value.c1 = value.OV_L2_ID;
						value.c1_nm = value.OV_L2_KOR;
						value.dt = Number(value.DTVAL_CO);
						value.itm_cd = value.CHAR_ITM_ID;
						value.itm_nm = value.CHAR_ITM_NM;
					return value;
					}), 'itm2', 'itm_nm', 'dt', 't4', '', '어가', '가구'); //20201202 박은식 파라미터 추가
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn']", function(evnt){
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','08','00',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				if($totSurvMain.ui.selectedYear == "2020"){
					if($fisheryDash.fisheryType =="sea"){
						if(selId == "fisheryTypeDiv"){ //경영 형태별 어가
							getMataDataUrl("FS0615");
						}
						else if(selId == "totCareerDiv"){ // 경력기간별  
							getMataDataUrl("FS0619");
						}
						else if(selId == "moveDiv"){ // 어로어업 어가
							getMataDataUrl("FS0617");
						}
						else if(selId == "fishPriceDiv"){ //수산물 판매 금액별 어가
							getMataDataUrl("FS0616");
						}
						else if(selId == "totOperatorAgeDiv"){ //연령별 어가
							getMataDataUrl("FS0618");
						}
						
					} else {
						//$totSurvMap.ui.selectedSurvId = "FS0171";
						if(selId == "fisheryTypeDiv"){ //경영 형태별 어가
							getMataDataUrl("FS0622");
						}
						else if(selId == "totCareerDiv"){// 경력기간별  
							getMataDataUrl("FS0626");
						}
						else if(selId == "moveDiv"){// 어획별 어가
							getMataDataUrl("FS0624");
						}
						else if(selId == "fishPriceDiv"){//수산물 판매 금액별 어가
							getMataDataUrl("FS0623");
						}
						else if(selId == "totOperatorAgeDiv"){//연령별 어가
							getMataDataUrl("FS0625");
						}
					}			
				} else if($totSurvMain.ui.selectedYear == "2015"){
					if($fisheryDash.fisheryType =="sea"){
						if(selId == "fisheryTypeDiv"){ //경영 형태별 어가
							getMataDataUrl("FS0111");
						}
						else if(selId == "totCareerDiv"){ // 경력기간별  
							getMataDataUrl("FS0119");
						}
						else if(selId == "moveDiv"){ // 어로어업 어가
							getMataDataUrl("FS0124");
						}
						else if(selId == "fishPriceDiv"){ //수산물 판매 금액별 어가
							getMataDataUrl("FS0136");
						}
						else if(selId == "totOperatorAgeDiv"){ //연령별 어가
							getMataDataUrl("FS0115");
						}
						
					} else {
						//$totSurvMap.ui.selectedSurvId = "FS0171";
						if(selId == "fisheryTypeDiv"){ //경영 형태별 어가
							getMataDataUrl("FS0170");
						}
						else if(selId == "totCareerDiv"){// 경력기간별  
							getMataDataUrl("FS0178");
						}
						else if(selId == "moveDiv"){// 어획별 어가
							getMataDataUrl("FS0186");
						}
						else if(selId == "fishPriceDiv"){//수산물 판매 금액별 어가
							getMataDataUrl("FS0195");
						}
						else if(selId == "totOperatorAgeDiv"){//연령별 어가
							getMataDataUrl("FS0174");
						}
					}			
				} else if($totSurvMain.ui.selectedYear == "2010"){
					if($fisheryDash.fisheryType =="sea"){
						
						if(selId == "fisheryTypeDiv"){
							getMataDataUrl("FS0412");
						}
						else if(selId == "totCareerDiv"){
							getMataDataUrl("FS0417");
						}
						else if(selId == "moveDiv"){
							getMataDataUrl("FS0424");
						}
						else if(selId == "fishPriceDiv"){
							getMataDataUrl("FS0436");
						}
						else if(selId == "totOperatorAgeDiv"){//연령별 어가
							getMataDataUrl("FS0416");
						}
						
					} else {
						
						if(selId == "fisheryTypeDiv"){
							getMataDataUrl("FS0468");
						}
						else if(selId == "totCareerDiv"){
							getMataDataUrl("FS0476");
						}
						else if(selId == "moveDiv"){
							getMataDataUrl("FS0483");
						}
						else if(selId == "fishPriceDiv"){
							getMataDataUrl("FS0492");
						}
						else if(selId == "totOperatorAgeDiv"){//연령별 어가
							getMataDataUrl("FS0472");
						}
					}
				}
			
			});
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);

				if(selId == "fisheryTypeDiv"){
					$totSurvMain.ui.chartImageDown("#fisheryTypeDiv", "경영 형태별 어가");
				}
				else if(selId == "totCareerDiv"){
					$totSurvMain.ui.chartImageDown("#totCareerDiv", "경영주 어업 경력 기간별 어가");

				}
				else if(selId == "moveDiv"){
					if($fisheryDash.fisheryType == "sea"){
						$totSurvMain.ui.chartImageDown("#moveDiv", "주된 어로어업 방법별 어가"); //20201118 박은식 명칭 변경
					} else {
						$totSurvMain.ui.chartImageDown("#moveDiv", "주된 어획품종별 어가"); //20201118 박은식 명칭 변경
					}
					
				}
				else if(selId == "fishPriceDiv"){
					$totSurvMain.ui.chartImageDown("#fishPriceDiv", "판매 금액별 어가");
				}
				else if(selId == "totOperatorAgeDiv"){
					$totSurvMain.ui.chartImageDown("#totOperatorAgeDiv", "경영주 연령별 어가");
				}
			});
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장) 이벤트 추가 END
			
			body.on("click", ".fisheryToggle",function(e){
				if($(this).attr("id") == "seaWater"){
					$totSurvMain.ui.chartSaveClear(); //20201126 박은식 조회정보 clear
					$fisheryDash.fisheryType = "sea"
					$("#seaButton").show();
					$("#inlandButton").hide();
					if($(this).hasClass("on")){
						return;
					} else {
						$totSurvMain.ui.removeMap();
						$totSurvMain.ui.tilePerColor = [];
						$("#fisheryType").parent().find(".chartTitle").text("경영형태별 어가");
						  
						$("#getFishery").parent().find(".colTit").text("주된 어로어업 방법별 어가");//20201118 박은식 명칭 변경
						$("#totPriceFish").parent().find(".chartTitle").text("수산물 판매 금액별 어가");
						$("#totCareer").parent().find(".chartTitle").text("경영주 어업 경력기간별 어가");
						$(this).addClass("on");
						$("#inlandWater").removeClass("on2"); //2020.11.16[신예리] 내수면 탭 버튼 on
					}
				} else {
					$totSurvMain.ui.chartSaveClear(); //20201126 박은식 조회정보 clear
					$fisheryDash.fisheryType = "inland"
					//if($(this).hasClass("on2")){ //2020.11.16[신예리] 내수면 탭 버튼 on
					//	return;
					//}
					$totSurvMain.ui.removeMap();
					$("#seaButton").hide();
					$("#inlandButton").show();
					$totSurvMain.ui.tilePerColor = [];
					//$("#fisheryType").parent().find(".chartTitle").text("경영형태별 어가");
					$("#getFishery").parent().find(".colTit").text("주된 어획품종별 어가"); //20201118 박은식 명칭 변경
					//$("#totPriceFish").parent().find(".chartTitle").text("수산물 판매 금액별 어가");
					//$("#totCareer").parent().find(".chartTitle").text("경영주 어업 경력기간별 어가");
					$(this).addClass("on2"); //2020.11.16[신예리] 내수면 탭 버튼 on
					$("#seaWater").removeClass("on");
				}
				if($totSurvMain.ui.selectedYear == "2020"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS20103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI20103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2015"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS15103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI15103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2010"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI103";
					}
				}
				if($fisheryDash.mapState == "off"){
					var mapHtml ="<div id='mapRgn_1' style='height: 590px;'></div>"; // 2020.11.19[신예리] 영역 높이 수정
					mapHtml += '<div class="ControllBtnWrap">';
					mapHtml += '	<button type="button" class="mapExport" title="지도 확장"></button>';
					mapHtml += '	<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>';
					mapHtml += '	<button type="button" class="out" id="pOut" title="지도 축소"></button>';
					mapHtml += '</div>';
				} else {
					var mapHtml ="<div id='mapRgn_1' style='height: 800px;'></div>";
					mapHtml += '<div class="ControllBtnWrap">';
					mapHtml += '	<button type="button" class="mapExport on" title="지도 확장"></button>';
					mapHtml += '	<button type="button" class="zoom" id="pZoom" title="지도 확대"></button>';
					mapHtml += '	<button type="button" class="out" id="pOut" title="지도 축소"></button>';
					mapHtml += '</div>';
				}
				$("#mapArea").html(mapHtml);
				$totSurvMap.ui.createMap("mapRgn_1", 0);
				$fisheryDash.event.allChange($totSurvMain.ui.selsctedArea, "1");
				if($fisheryDash.fisheryType == "sea"){
					$("#seaAll").trigger("click"); //20201117 박은식 id 변경
				} else {
					$("#inlandAll").trigger("click"); //20201117 박은식 id 변경
				}
			})
			
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
			console.log("...... fisheryDash ...... allChange .........");
			/*
			 * FS0112 ===> DT_1FS15103 (해수면) 가구원수별 어가
			 * FS0171 ===> DT_1FI15103 (내수면) 가구원수별 어가
			 * FS0413 ===> DT_1FS103   (해수면) 가구원수별 어가
			 * FS0469 ===> DT_1FI103   (내수면) 가구원수별 어가
			*/
			$fisheryDash.ajax.params = {			
					surv_year_list: ""						// 수록시점
					, org_id_list: "101"					// 조직번호
					, tbl_id_list: "DT_1FS20103"						// 통계표 ID
					, list_var_ord_list: "" 				// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
					, odr_type:""
					, prt_type: ""							// 출력방식 total:합계
					, char_itm_id_list:""					// 표특성항목
					, adm_unit: ""							// 지역단위
					, adm_cd: ""		// 지역코드		
					, ov_l1_list: ""						// 항목 1
					, ov_l2_list: ""						// 항목 2 지역코드
					, ov_l3_list: ""						// 항목 3
					, ov_l4_list: ""						// 항목 4
					, ov_l5_list: ""						// 항목 5
					, category: ""							// 카테고리 sido, sgg
					, orderby: ""
			}
			
			if($totSurvMap.ui.selectedSurvId == null|| $totSurvMap.ui.selectedSurvId == "" || $totSurvMap.ui.selectedSurvId == undefined){
				if($totSurvMain.ui.selectedYear == "2020"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS20103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI20103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2015"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS15103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI15103";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2010"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "DT_1FS103";
					} else {
						$totSurvMap.ui.selectedSurvId = "DT_1FI103";
					}
				}
			} 
			
			$fisheryDash.event.allClear();		
			$fisheryDash.ui.selectedItmCd = "T00";
			
			if($("#seaWater").hasClass("on")){
				$fisheryDash.fisheryType = "sea";
				$fisheryDash.fisheryTypeNm = '해수면';
			} else {
				$fisheryDash.fisheryType = "inland";
				$fisheryDash.fisheryTypeNm = '내수면';
			}
			
			var fisheryType = $fisheryDash.fisheryType;
			
			if($totSurvMain.ui.chartTarget == ""){
				$("#clickItmName").html("지도");
			}
			
			
			// 타일 차트 위에 가구수 처리
			$fisheryDash.ajax.params.surv_year_list =$totSurvMain.ui.selectedYear;
			$fisheryDash.ajax.params.list_var_ord_list =""; // 여기 봐야됨
			//지역은 모든 차트에 공통으로 적용됨
			$fisheryDash.ajax.params.ov_l1_list = (admCd == null|| admCd== "" || admCd == undefined || admCd == '00')?"up:00":admCd;
			$fisheryDash.ajax.params.ov_l2_list ="000";
			$fisheryDash.ajax.params.char_itm_id_list ="T00"; // 어가 계만 가져옴
			if($totSurvMain.ui.selectedYear == "2020"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS20103";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI20103";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2015"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS15103";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI15103";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2010"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS103";
				} else {
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI103";
				}
			}
			
			$totSurvMain.ui.selectedArea = (admCd == null|| admCd== "" || admCd == undefined)?"00":admCd;
			var totFishery =0;
			/*$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				url: sgis4thApiPath, 
				data: $fisheryDash.ajax.params, 
				dataType: "json",
				success: function(res) {
				
				},
				error: function(e) {
					alert('failed-인구수');
				}
			});
				*/
			
			
			//데이터 없을 때
			var moveHtml = "";
			var imgH = "";
			moveHtml += "<div class='DataNone' id='moveHomeNone' style='text-align: center;'>";
			moveHtml += "	<img src='/images/totSurv/ChartNone.png' id='emptyImg' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top:50px'>"; //20201120 박은식 이미지 마진값 추가
			moveHtml += "	<p style='margin-top: 15px;'> 선택하신 지역에 대한 차트 정보가 없습니다. </p>";
			moveHtml += "</div>";
			
			//경영형태별어가 
			$fisheryDash.ajax.params.surv_year_list =$totSurvMain.ui.selectedYear;
			$fisheryDash.ajax.params.list_var_ord_list =""; // 여기 봐야됨
			//지역은 모든 차트에 공통으로 적용됨
			$fisheryDash.ajax.params.ov_l1_list = (admCd == null|| admCd== "" || admCd == undefined)?"00":admCd;
			$fisheryDash.ajax.params.ov_l2_list ="000";
			$fisheryDash.ajax.params.odr_col_list ="CHAR_ITM_SN";
			if($totSurvMain.ui.selectedYear == "2020"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS20102";
					$fisheryDash.ajax.params.char_itm_id_list ="T02,T03,T04,T05,T06,T07,T09,T10,T11,T12,T13,T14";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI20102";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T03,T04,T05,T06";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2015"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS15102";
					$fisheryDash.ajax.params.char_itm_id_list ="T02,T05,T07,T08,T09,T10,T11,T12";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI15102";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T03,T04,T05,T06";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2010"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS102";
					$fisheryDash.ajax.params.char_itm_id_list ="T02,T05,T07,T08,T09,T10,T11,T12";
				} else {
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI102";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T03,T04,T05,T06";
				}
			}
			$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				url: sgis4thApiPath, 
				data: $fisheryDash.ajax.params, 
				dataType: "json",
				success: function(res) {
					res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
					//경영 형태별
					$fisheryDash.totFisheryOperationType = res;
					if($fisheryDash.totFisheryOperationType.length > 0){
						fisheryTypePieChart($fisheryDash.totFisheryOperationType, "N", "180");
					} else {
						$("#fisheryType").empty();
						$("#fisheryType").append(moveHtml);
					}
				},
				error: function(e) {
					alert('failed-경영형태별어가');
				}
			});
			
				
			//수산물 판매금액별 어가
			$fisheryDash.ajax.params.surv_year_list =$totSurvMain.ui.selectedYear;
			$fisheryDash.ajax.params.list_var_ord_list =""; // 여기 봐야됨
			$fisheryDash.ajax.params.ov_l2_list ="000";
			$fisheryDash.ajax.params.list_var_ord_list="";
			
			if($totSurvMain.ui.selectedYear == "2020"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS20122";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI20122";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2015"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS15127";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI15127";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2010"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS126";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12";
				} else {
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI126";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11";
				}
			}

			$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				url: sgis4thApiPath, 
				data: $fisheryDash.ajax.params, 
				dataType: "json",
				success: function(res) {
					res = res.filter((r)=>Number(r.DTVAL_CO)!=0)
					// 판매 금액별 어가
					$fisheryDash.totPriceFish = res;		
					if($fisheryDash.totPriceFish.length > 0){
						setMngerEdcChart($fisheryDash.totPriceFish, "totPriceFish", "N", "285"); //2020.10.28[신예리] 높이값 변경
					} else {
						imgH = "45";
						$("#totPriceFish").empty();
						$("#totPriceFish").append(moveHtml);
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
			
			//주된 어로어업 전체 어가
			$fisheryDash.ajax.params.surv_year_list =$totSurvMain.ui.selectedYear;
			$fisheryDash.ajax.params.list_var_ord_list =""; // 여기 봐야됨
			$fisheryDash.ajax.params.ov_l2_list ="000";
			$fisheryDash.ajax.params.list_var_ord_list="";
			//해수면,내수면 2015, 2010모두 같음
			if( $totSurvMain.ui.selectedYear == '2020' ){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.char_itm_id_list ="T03,T04,T05,T06,T07,T08,T09,T10," +
					"T11,T12,T13,T14,T15,T16,T17,T18,T19,T20," +
					"T21,T22,T23,T25,T26,T27,T28,T29,T30," +
					"T31,T32,T34,T35,T36,T37,T38,T39,T40,T42,T43,T44";
				}
				else {
					$fisheryDash.ajax.params.char_itm_id_list ="T03,T04,T05,T06,T07,T08,T09,T10," +
					"T11,T12,T13,T14,T15,T17,T18,T19,T21,T22,T23,T24";
				}
			}else{
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.char_itm_id_list ="T02,T03,T04,T05,T06,T07,T08,T09,T10," +
					"T11,T12,T13,T14,T15,T16,T17,T18,T19,T20," +
					"T21,T22,T23,T24,T25,T26,T27,T28,T29,T30," +
					"T31,T32,T33,T34,T35,T36,T37,T38,T39,T40";
				}
				else {
					$fisheryDash.ajax.params.char_itm_id_list ="T02,T03,T04,T05,T06,T07,T08,T09,T10," +
					"T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21";
				}
			}
			if($totSurvMain.ui.selectedYear == "2020"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS20112";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI20115";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2015"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS15115";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI15118";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2010"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS114";
				} else {
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI117";
				}
			}

			$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				url: sgis4thApiPath, 
				data: $fisheryDash.ajax.params, 
				dataType: "json",
				success: function(res) {
					res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
					//겁내 돌려야것네
					//해수면용
					var totInshoreFishery = [], totCoastalFishery = [], totBlockFishery = [],totOthersFishery = [], totTotal=[];
					//내수면용
                    var totInTotal=[], totInGetFish=[], totInGetOtherFish =[];
					//전체해수면 : 근해어업, 구획어업, 연안 복합어업, 기타 어업
					//전체내수면 : 어류, 갑각류, 패류, 기타 수산동식물
					var total1 =0, total2=0, total3 =0, total4 =0;
					
					if($fisheryDash.fisheryType =="sea"){
						//해수면일 때 데이터 처리
						for(var i=0;i<res.length;i++){
							var cNum = Number(res[i].CHAR_ITM_ID.substr(1,2));
							
							if($totSurvMain.ui.selectedYear == "2020"){
								if (cNum < 24 ){
									//근해어업
									total1 += Number(res[i].DTVAL_CO);
									cNum==2?res[i].CHAR_ITM_NM ="외끌이대형저인망":res[i].CHAR_ITM_NM=res[i].CHAR_ITM_NM;
									totInshoreFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID, "CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
									
								} else if (cNum > 23 && cNum < 33) {
									//연안복합어업
									total2 += Number(res[i].DTVAL_CO);
									totCoastalFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID,"CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
								} else if (cNum > 33 && cNum < 40) {
									//구획어업
									total3 += Number(res[i].DTVAL_CO);
									totBlockFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID,"CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
								} else if (cNum > 39 ) {
									//기타어업
									total4 += Number(res[i].DTVAL_CO);
									totOthersFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID,"CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
								}
							}else{
								if (cNum < 23 ){
									//근해어업
									total1 += Number(res[i].DTVAL_CO);
									cNum==2?res[i].CHAR_ITM_NM ="외끌이대형저인망":res[i].CHAR_ITM_NM=res[i].CHAR_ITM_NM;
									totInshoreFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID, "CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
									
								} else if (cNum > 22 && cNum < 31) {
									//연안복합어업
									total2 += Number(res[i].DTVAL_CO);
									totCoastalFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID,"CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
								} else if (cNum > 30 && cNum < 37) {
									//구획어업
									total3 += Number(res[i].DTVAL_CO);
									totBlockFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID,"CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
								} else if (cNum > 36 ) {
									//기타어업
									total4 += Number(res[i].DTVAL_CO);
									totOthersFishery.push({"CHAR_ITM_ID":res[i].CHAR_ITM_ID,"CHAR_ITM_NM":res[i].CHAR_ITM_NM , "DTVAL_CO":res[i].DTVAL_CO, "TBL_ID" :res[i].tbl_id_list, "OV_L1_ID": res[i].ov_l1_list, "OV_L2_ID":res[i].ov_l2_list} );
								}
							}
							
						}
						//전체
						if($totSurvMain.ui.selectedYear == "2020"){
							totTotal.push({"CHAR_ITM_ID":"T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21,T22,T23", 
								"CHAR_ITM_NM": "근해어업", "DTVAL_CO":total1, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T34,T35,T36,T37,T38,T39",
								"CHAR_ITM_NM": "구획어업", "DTVAL_CO":total3, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T25,T26,T27,T28,T29,T30,T31,T32",
								"CHAR_ITM_NM": "연안어업", "DTVAL_CO":total2, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T40,T42,T43,T44", 
								"CHAR_ITM_NM": "기타어업", "DTVAL_CO":total4, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list});
						}else if($totSurvMain.ui.selectedYear == "2015"){
							totTotal.push({"CHAR_ITM_ID":"T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21,T22,T23", 
								"CHAR_ITM_NM": "근해어업", "DTVAL_CO":total1, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T34,T35,T36,T37,T38,T39",
								"CHAR_ITM_NM": "구획어업", "DTVAL_CO":total3, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T25,T26,T27,T28,T29,T30,T31,T32",
								"CHAR_ITM_NM": "연안어업", "DTVAL_CO":total2, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T40,T42,T43,T44", 
								"CHAR_ITM_NM": "기타어업", "DTVAL_CO":total4, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list});
						}else{
							totTotal.push({"CHAR_ITM_ID":"T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13,T14,T15,T16,T17,T18,T19,T20,T21,T22", 
								"CHAR_ITM_NM": "근해어업", "DTVAL_CO":total1, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T31,T32,T33,T34,T35,T36",
								"CHAR_ITM_NM": "구획어업", "DTVAL_CO":total3, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T23,T24,T25,T26,T27,T28,T29,T30",
								"CHAR_ITM_NM": "연안어업", "DTVAL_CO":total2, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list} );
							totTotal.push({"CHAR_ITM_ID":"T37,T38,T39,T40", 
								"CHAR_ITM_NM": "기타어업", "DTVAL_CO":total4, "TBL_ID" :$fisheryDash.ajax.params.tbl_id_list, "OV_L1_ID": $fisheryDash.ajax.params.ov_l1_list, "OV_L2_ID":$fisheryDash.ajax.params.ov_l2_list});
						}
						$fisheryDash.totFisheryTotal = totTotal;
						$fisheryDash.totInshoreFishery = totInshoreFishery;
						$fisheryDash.totCoastalFishery = totCoastalFishery;
						$fisheryDash.totBlockFishery = totBlockFishery;
						$fisheryDash.totOthersFishery = totOthersFishery;
						
						if($("#inshoreFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
							// 근해어업 차트
							if($fisheryDash.totInshoreFishery.length > 0){
								totGetFishChart($fisheryDash.totInshoreFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
						} else if($("#blockFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
							if($fisheryDash.totBlockFishery.length > 0){
								// 구획어업 차트
								totGetFishChart($fisheryDash.totBlockFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
						} else if($("#coastalFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
							if($fisheryDash.totCoastalFishery.length > 0){
								// 연안어업 차트
								totGetFishChart($fisheryDash.totCoastalFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
							
						} else if($("#tohersFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
							if($fisheryDash.totOthersFishery.length > 0){
								// 기타어업 차트
								totGetFishChart($fisheryDash.totOthersFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
						//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 START
						} else if($("#seaAll").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
							if($fisheryDash.totFisheryTotal.length > 0){
								// 기타어업 차트
								totGetFishChart($fisheryDash.totFisheryTotal, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
						//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 END
						}
					} else {
						//내수면일때 데이터 처리
						for(var i=0;i<res.length;i++){
							var cNum = Number(res[i].CHAR_ITM_ID.substr(1,2));
							if($totSurvMain.ui.selectedYear != "2020"){
								if (cNum < 15 ){
									//어류
									total1 += Number(res[i].DTVAL_CO);
									totInGetFish.push({"CHAR_ITM_NM":res[i].CHAR_ITM_NM.replace("어류:","").replace("갑각류:","").replace("패류:","") , "DTVAL_CO":res[i].DTVAL_CO});
								} else if (cNum > 14 && cNum < 18) {
									//갑각류
									total2 += Number(res[i].DTVAL_CO);
									totInGetOtherFish.push({"CHAR_ITM_NM":res[i].CHAR_ITM_NM.replace("어류:","").replace("갑각류:","").replace("패류:",""), "DTVAL_CO":res[i].DTVAL_CO});
								} else if (cNum > 17 && cNum < 21) {
									//패류
									total3 += Number(res[i].DTVAL_CO);
									totInGetOtherFish.push({"CHAR_ITM_NM":res[i].CHAR_ITM_NM.replace("어류:","").replace("갑각류:","").replace("패류:",""), "DTVAL_CO":res[i].DTVAL_CO});
								} else if (cNum > 20 ) {
									//기타수산동식물
									total4 += Number(res[i].DTVAL_CO);
									totInGetOtherFish.push({"CHAR_ITM_NM":res[i].CHAR_ITM_NM.replace("어류:","").replace("갑각류:","").replace("패류:","") , "DTVAL_CO":res[i].DTVAL_CO});
								}
							}else{
								if (cNum < 16 ){
									//어류
									total1 += Number(res[i].DTVAL_CO);
									totInGetFish.push({"CHAR_ITM_NM":res[i].CHAR_ITM_NM.replace("어류:","").replace("갑각류:","").replace("패류:","") , "DTVAL_CO":res[i].DTVAL_CO});
								} else if (cNum > 15) {
									//갑각류
									total2 += Number(res[i].DTVAL_CO);
									totInGetOtherFish.push({"CHAR_ITM_NM":res[i].CHAR_ITM_NM.replace("어류:","").replace("갑각류:","").replace("패류:",""), "DTVAL_CO":res[i].DTVAL_CO});
								}
							}
						}
						//전체
						if(total1)
							totInTotal.push({"CHAR_ITM_NM": "어류", "DTVAL_CO":total1});
						if(total2)
							totInTotal.push({"CHAR_ITM_NM": $totSurvMain.ui.selectedYear == "2020"?"기타 어획 품종":"갑각류", "DTVAL_CO":total2});
						if(total3)
							totInTotal.push({"CHAR_ITM_NM": "패류", "DTVAL_CO":total3});
						if(total4)
							totInTotal.push({"CHAR_ITM_NM": "기타수산동식물", "DTVAL_CO":total4});
						
						$fisheryDash.totGetFishTotal = totInTotal;
						$fisheryDash.totGetFish = totInGetFish; // 품종별(어류) 어획 어가
						$fisheryDash.totGetOthersFish = totInGetOtherFish; // 기타어획
						
						if($("#fish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
							// 품종별(어류) 어획 어가 차트 셋팅
							if($fisheryDash.totGetFish.length > 0){
								totGetFishChart($fisheryDash.totGetFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
						} else if($("#othersFish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
							if($fisheryDash.totGetOthersFish.length > 0){
								// 품종별(기타) 어획 어가 차트 셋팅
								totGetFishChart($fisheryDash.totGetOthersFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
						//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 START	
						} else if($("#inlandAll").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
							if($fisheryDash.totGetFishTotal.length > 0){
								// 품종별(전체) 어획 어가 차트 셋팅
								totGetFishChart($fisheryDash.totGetFishTotal, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
							} else {
								$("#getFishery").empty();
								$("#getFishery").append(moveHtml);
							}
						//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 END
						}
					}
				},
				error: function(e) {
					alert('failed 주된어로어업 전체 어가');
				}
			});
			
			//경영주 연령별 어가
			$fisheryDash.ajax.params.surv_year_list =$totSurvMain.ui.selectedYear;
			$fisheryDash.ajax.params.list_var_ord_list =""; // 여기 봐야됨
			$fisheryDash.ajax.params.ov_l2_list ="000";
			$fisheryDash.ajax.params.list_var_ord_list="";
			//해수면,내수면 2015, 2010모두 같음
			$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05,T06,T07,T08,T09,T10,T11,T12,T13";
			if($totSurvMain.ui.selectedYear == "2020"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS20106";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI20106";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2015"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS15106";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI15106";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2010"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS106";
				} else {
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI106";
				}
			}

			$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				url: sgis4thApiPath, 
				data: $fisheryDash.ajax.params, 
				dataType: "json",
				success: function(res) {
					res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
					// 경영주 연령 분포 셋팅
					$fisheryDash.totFisheryAge = res;
					if($fisheryDash.totFisheryAge.length > 0){
						setFisheryAgeChart($fisheryDash.totFisheryAge, "totOperatorAge", "N", "145"); //2020.11.19[신예리] 차트 영역 높이 값 수정
					} else {
						$("#totSlvlIwrsFhrshs").empty();
						$("#totSlvlIwrsFhrshs").append(moveHtml);;
					}
				},
				error: function(e) {
					alert('failed 경영주 연령별 어가');
				}
			});
			
			//경영주 어업 경력기간별 어가
			$fisheryDash.ajax.params.surv_year_list =$totSurvMain.ui.selectedYear;
			$fisheryDash.ajax.params.list_var_ord_list =""; // 여기 봐야됨
			$fisheryDash.ajax.params.ov_l2_list ="000";
			$fisheryDash.ajax.params.list_var_ord_list="";
			
			if($totSurvMain.ui.selectedYear == "2020"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS20107";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI20107";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2015"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS15110";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05";
				} else {                                   
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI15110";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05";
				}
								
			} else if($totSurvMain.ui.selectedYear == "2010"){
				if($fisheryDash.fisheryType =="sea"){
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FS110";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05";
				} else {
					$fisheryDash.ajax.params.tbl_id_list ="DT_1FI110";
					$fisheryDash.ajax.params.char_itm_id_list ="T01,T02,T03,T04,T05";
				}
			}

			$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				url: sgis4thApiPath, 
				data: $fisheryDash.ajax.params, 
				dataType: "json",
				success: function(res) {
					res = res.filter((r)=>Number(r.DTVAL_CO)!=0);
					// 경영주 어업 경력기간별 어가
					$fisheryDash.totFisheryCareer = res;
					if($fisheryDash.totFisheryCareer.length > 0){
						setFisheryCareerChart($fisheryDash.totFisheryCareer, "totCareer", "N", "145"); //2020.11.19[신예리] 차트 영역 높이 값 수정
					} else {
						$("#totCareer").empty();
						$("#totCareer").append(moveHtml);
					}
				},
				error: function(e) {
					alert('failed 경영주 경력기간');
				}
			});
			
					// 전국데이터
					//if(admCd == "00"){
					//	$totSurvMain.ui.refresh('sgg', '00')
					//	return;
					//}
					//var totalData = res.result.totalData;
				
					/*
					// 경영주 연령 분포
					$fisheryDash.totFisheryAge =  res.result.totFisheryAge;
					// 품종별(어류) 어획 어가(해수면 내수면)
					$fisheryDash.totGetFish = res.result.totGetFish;
					// 품종별(기타) 어획 어가(해수면 내수면)
					$fisheryDash.totGetOthersFish = res.result.totGetOthersFish;
					
					
					// 근해 어업
					$fisheryDash.totInshoreFishery = res.result.totInshoreFishery;
					// 구획 어업
					$fisheryDash.totBlockFishery =  res.result.totBlockFishery;
					// 연안 어업
					$fisheryDash.totCoastalFishery = res.result.totCoastalFishery;
					// 기타 어업
					$fisheryDash.totOthersFishery =  res.result.totOthersFishery;
					// 경영 형태별
					$fisheryDash.totFisheryOperationType = res.result.totFisheryOperationType;
					
					
					//20201117 박은식 해수면 어로어업 전체, 내수면 어획 전체 차트데이터 변수 저장 START
					if(res.result.totFisheryTotal != undefined && res.result.totFisheryTotal != null && res.result.totFisheryTotal.length != 0){
						// 전체 어업
						//20201118 박은식 dt 체크 추가 START
						$fisheryDash.totFisheryTotal = [];
						for(var i=0; i<res.result.totFisheryTotal.length;i++){
							if(res.result.totFisheryTotal[i].dt != undefined && res.result.totFisheryTotal[i].dt != null){
								$fisheryDash.totFisheryTotal.push(res.result.totFisheryTotal[i])
							}						
						}
						//$fisheryDash.totFisheryTotal =  res.result.totFisheryTotal;
						//20201118 박은식 dt 체크 추가 END
					}
					if(res.result.totGetFishTotal != undefined && res.result.totGetFishTotal != null && res.result.totGetFishTotal.length != 0){
						// 어획품종별(전체) 어획어가
						//20201118 박은식 dt 체크 추가 START
						$fisheryDash.totGetFishTotal = [];
						for(var i=0; i<res.result.totGetFishTotal.length;i++){
							if(res.result.totGetFishTotal[i].dt != undefined && res.result.totGetFishTotal[i].dt != null){
								$fisheryDash.totGetFishTotal.push(res.result.totGetFishTotal[i])
							}						
						}
						//$fisheryDash.totGetFishTotal = res.result.totGetFishTotal;
						//20201118 박은식 dt 체크 추가 END 
					}
					//20201117 박은식 해수면 어로어업 전체, 내수면 어획 전체 차트데이터 변수 저장 END
					
					totFishery = totalData[0].dt;
					totFisheryRank = totalData[0].rank;
					totFisheryRt = totalData[0].irdsrate;
					
					$totSurvMain.ui.selectedArea = regionCd;
					
					if($fisheryDash.fisheryType == "sea"){
						$("#totFishery").html('<h5 class="colTit" style="margin-top:-5px;">총 어가 수(해수면) </h5><h1>'+numberFormat(totFishery)+'</h1><span class="ml5">가구</span>');
					} else {
						$("#totFishery").html('<h5 class="colTit" style="margin-top:-5px;">총 어가 수(내수면) </h5><h1>'+numberFormat(totFishery)+'</h1><span class="ml5">가구</span>');
					}
					
					
					
					if($fisheryDash.fisheryType == "sea"){
						$("#totOperatorAge").parent().find(".chartTitle").eq(0).text("경영주 연령별 어가");
					} else {
						$("#totOperatorAge").parent().find(".chartTitle").eq(0).text("경영주 연령별 어가");
					}
					
					if($("#fish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
						// 품종별(어류) 어획 어가 차트 셋팅
						if($fisheryDash.totGetFish.length > 0){
							totGetFishChart($fisheryDash.totGetFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					} else if($("#othersFish").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
						if($fisheryDash.totGetOthersFish.length > 0){
							// 품종별(기타) 어획 어가 차트 셋팅
							totGetFishChart($fisheryDash.totGetOthersFish, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 START	
					} else if($("#inlandAll").hasClass("on") && $fisheryDash.fisheryType == 'inland'){
						if($fisheryDash.totGetFishTotal.length > 0){
							// 품종별(전체) 어획 어가 차트 셋팅
							totGetFishChart($fisheryDash.totGetFishTotal, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 END
					}
					
					if($("#inshoreFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						// 근해어업 차트
						if($fisheryDash.totInshoreFishery.length > 0){
							totGetFishChart($fisheryDash.totInshoreFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					} else if($("#blockFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totBlockFishery.length > 0){
							// 구획어업 차트
							totGetFishChart($fisheryDash.totBlockFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					} else if($("#coastalFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totCoastalFishery.length > 0){
							// 연안어업 차트
							totGetFishChart($fisheryDash.totCoastalFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
						
					} else if($("#tohersFishery").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totOthersFishery.length > 0){
							// 기타어업 차트
							totGetFishChart($fisheryDash.totOthersFishery, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 START
					} else if($("#seaAll").hasClass("on") && $fisheryDash.fisheryType == 'sea'){
						if($fisheryDash.totFisheryTotal.length > 0){
							// 기타어업 차트
							totGetFishChart($fisheryDash.totFisheryTotal, "getFishery", "N", "210"); //2020.11.19[신예리] 높이값 변경
						} else {
							$("#getFishery").empty();
							$("#getFishery").append(moveHtml);
						}
					//20201117 박은식 대시보드 진입 시 첫 차트 로직 추가 END
					}
					if($fisheryDash.totPriceFish.length > 0){
						// 동력 판매 금액별 어가 차트 셋팅
						setMngerEdcChart($fisheryDash.totPriceFish, "totPriceFish", "N", "285"); //2020.10.28[신예리] 높이값 변경
					} else {
						imgH = "45";
						$("#totPriceFish").empty();
						$("#totPriceFish").append(moveHtml);
					}
					*/
					if($totSurvMain.ui.selectedArea == "00"){
						$fisheryDash.ui.getRankSet("","","00")
					}
					
				
			if(mode == "1"){
				$fisheryDash.ui.drawContent($totSurvMap.ui.selectedSurvId, $totSurvMap.ui.selectedItmCd, "000");
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
			if($totSurvMap.ui.selectedSurvId == null|| $totSurvMap.ui.selectedSurvId == "" || $totSurvMap.ui.selectedSurvId == undefined){
				if($totSurvMain.ui.selectedYear == "2020"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "FS0614";
					} else {
						$totSurvMap.ui.selectedSurvId = "FS0621";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2015"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "FS0112";
					} else {
						$totSurvMap.ui.selectedSurvId = "FS0171";
					}
									
				} else if($totSurvMain.ui.selectedYear == "2010"){
					if($fisheryDash.fisheryType =="sea"){
						$totSurvMap.ui.selectedSurvId = "FS0413";
					} else {
						$totSurvMap.ui.selectedSurvId = "FS0469";
					}
				}
			} 
			$totSurvMap.ui.selectedItmCd = "T00";
			$totSurvMap.ui.selectedC1 = "000";
			$totSurvMap.ui.selectedC2 = "";
			$fisheryDash.highcharts = [];
		}
	};
	
	
	
	
	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};
	
	
}(window, document));
function businessJson(year, tbl_id,regionCd, itm_cd){
	var retval;
	var param = {
			surv_year_list: year							
				, org_id_list: "101"							
					, tbl_id_list: tbl_id					
					, list_var_ord_list: "T100" 						
					, prt_type: "part"								    
					, char_itm_id_list: itm_cd						
					, adm_cd: "00"								
					, adm_unit: ""								
					, ov_l1_list: regionCd								
					, ov_l2_list: "000"								
					, ov_l3_list: ""								
					, ov_l4_list: ""								
					, ov_l5_list: ""								
					, category: ""									
					, orderby: "DTVAL_CO"
		}
		
		$.ajax({
		type:"GET",
		async: false,	// 반드시 동기처리 해야 함
		url: "/view/totSurv/proxy?" + "http://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?",
 		data: param,
 		dataType: "json",
		success:function( result ){
			retval=result;
		},
		error:function(data) {
			alert('fail~!');
		}
	});
	 return retval;
};

/**
 * @name         : setSlvlIwrsFhrshsChart 
 * @description  : 해수면/내수면 어가 차트 세팅
 * @date         : 2020.09.23
 * @author	     : 한광희
 * @history 	 : 
 */
function setSlvlIwrsFhrshsChart(data, target, resizeYn, height){
	// 전체 data중 필요한 값만 꺼내쓰기 위한 새 배열
	var totSlvlIwrsFhrshs = data;
	var margin = ({top: 0, right: 150, bottom: 5, left: 50})
	var colors = ["#568AF1", "#0FBDCB"]; //2020.10.27[신예리] 차트 컬러 변경

	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$fisheryDash.totSlvlIwrsFhrshs = data;
	
	var total = 0;
	for(var i=0; i<data.length; i++){
		total = Number(data[i].dt) + total;
	}
		
	  var x = d3.scaleLinear()
	  			.domain([0, d3.max(data, function(d) { return Number(d.dt)})*0.95])
	            .range([margin.left, width - margin.right])
	  var x1 = d3.scaleLinear()
	  			.domain([0, d3.max(data, function(d) { return Number(d.dt)})])
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
	      	    .attr("transform", "translate("+ (margin.left) + ",0)")
	      	    .data(totSlvlIwrsFhrshs)
	      	    .call(d3.axisLeft(y).tickFormat(
	      	    	function(i) {
	      	    		var itm_nm = "";
	      	    		if(totSlvlIwrsFhrshs[i].surv_id == "FS0112"){
	      	    			itm_nm = "해수면"
	      	    		} else if(totSlvlIwrsFhrshs[i].surv_id == "FS0171"){
	      	    			itm_nm = "내수면"
	      	    		}
	      	    		return itm_nm;
	      	    	}).tickSizeOuter(0))
	  			};
	  var format = x.tickFormat(20, data.format)
	  //타겟 설정
	  const chart = d3.select("#"+target+"");
	  // 2020-06-02 [곽제욱] 차트 width, height 적용
	  const svg = chart
			     .append("svg")
			     .attr("height", height)
			     .attr("width", width)
	
	  if(resizeYn == "Y"){
		  svg.append("g")
	        .selectAll("rect")
	        .data(data)
	        .join("rect")
	        .attr('class', 'eventGroup')
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	       .on("mouseover", function(){
	    	$fisheryDash.ui.chartMouseOver($(this), "#576574");
		    })
		    .on("click", function(d){
		    	var itm_nm = "";
  	    		if(d.surv_id == "FS0112"){
  	    			itm_nm = "해수면"
  	    		} else if(d.surv_id == "FS0171"){
  	    			itm_nm = "내수면"
  	    		}
		    	var title ="해수면/내수면 어가"+"("+itm_nm+")";
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
		    	$fisheryDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle);
		    })
		    .on("mouseout", function(){
		    	$fisheryDash.ui.chartMouseOut($(this), "#576574");
		    })
	      .attr("x", x(0))
	      .attr("y", function(d, i) { return y(i) })
	      .attr("height", y.bandwidth())
	      .attr("fill", function(d,i) { return colors[i]})
	      .attr("width", 0)
	      .attr("rx", "4")
	      .attr("ry", "4")
	      .attr("width",  function(d) { return x1(Number(d.dt)) }); // { return bx(Number(d.dt)/total*100*0.65); }
	
	  svg.append("g")
	      .attr("text-anchor", "end")
	      .attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
	      .attr("font-size", 13)
	      .attr("font-weight", 600)
	        .selectAll("text")
	        .data(data)
	        .join("text")
	        .style("cursor", "pointer")
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		 	.on("click", function(d, i){
		 		var itm_nm = "";
  	    		if(d.surv_id == "FS0112"){
  	    			itm_nm = "해수면"
  	    		} else if(d.surv_id == "FS0171"){
  	    			itm_nm = "내수면"
  	    		}
		    	var title ="해수면/내수면 어가"+"("+itm_nm+")";
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
	    		$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
		    	$fisheryDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.chartTitle);
		 	})
	      .attr("fill", "")
	      .attr("x", 0)
	      .attr("width",  function(d) { return x1(Number(d.dt)) })
	      .attr("x",  function(d) { return x1(Number(d.dt))+50})
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
	        .style("cursor", "pointer") //2020.10.27[신예리] 마우스포인터
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	        .on("mouseover", function(){
	        	$fisheryDash.ui.chartMouseOver($(this), "#576574");
		    })
		    .on("click", function(d){
		    	var itm_nm = "";
  	    		if(d.surv_id == "FS0112"){
  	    			itm_nm = "해수면"
  	    		} else if(d.surv_id == "FS0171"){
  	    			itm_nm = "내수면"
  	    		}
		    	var title ="해수면/내수면 어가"+"("+itm_nm+")";
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
		    	$fisheryDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle);
		    })
		    .on("mouseout", function(){
		    	$fisheryDash.ui.chartMouseOut($(this), "#576574");
		    })
		  .attr("x", function(d){return x(0)})
		  .attr("y", function(d, i) { return y(i) })
		  .attr("height", y.bandwidth())
	      .attr("fill", function(d,i) { return colors[i]})
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
	      .attr("font-size", 12) // 2020.09.22[신예리]폰트 사이즈 수정
	      .attr("font-weight", 600)
	        .selectAll("text")
	        .data(data)
	        .join("text")
	        .style("cursor", "pointer")
	        .attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		 	.on("click", function(d, i){
		 		var itm_nm = "";
  	    		if(d.surv_id == "FS0112"){
  	    			itm_nm = "해수면"
  	    		} else if(d.surv_id == "FS0171"){
  	    			itm_nm = "내수면"
  	    		}
		    	var title ="해수면/내수면 어가"+"("+itm_nm+")";
		    	$totSurvMain.ui.chartTarget = target
	    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
	    		$totSurvMain.ui.chartData = d;
	    		$totSurvMain.ui.chartColor = "#576574";
	    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
	    		$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
		    	$fisheryDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.chartTitle);
		 	})
	      .attr("fill", "")
	      .attr("x", x1(0)+margin.left)
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
	      .attr("x",  function(d) { return x1(Number(d.dt))+50});
	  }
	  
	
	  svg.append("g")
	      .attr("style", "margin-left:250px; font-size: 12px; color:#878A89")
	        .call(yAxis);	
	  
	// 실데이터 그리기 end
		$("#"+target+"").find("line, path").remove();
}

/**
 * @name         : setMngerEdcChart 
 * @description  : 수산물 판매금액별 어가
 * @date         : 
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이, surv_id - 조사id
 */
function setMngerEdcChart(data, target, resize, height){
	var margin = ({top: 0, right: 150, bottom: 5, left:(target == "totPowerTons") ? 90 : 100})
	
	//var colors = ["#4E3691","#5F46A8","#7057B8","#8068C5","#A88FE6","#C1ABF0","#D2BFF7","#E7DAFC","#F0DAFC","#F9EFFF","#EFEAF2","#F5F5F5"]; //2020.11.11[신예리] 판매금액별 차트 컬러 12단계 지정 //2020.11.18[신예리] 색상표 변경
	
	
	
	var min = d3.min(data,function(d){return Number(d.DTVAL_CO)});
	var max = d3.max(data,function(d){return Number(d.DTVAL_CO)});
	var colors = d3.scaleLinear().domain([min,max]).range(['#F5F5F5','#4E3691']);
	var chartData = [], categories = [];
	//var total = d3.sum(data,function(d){return Number(d.dt)});
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].DTVAL_CO),color:colors(Number(data[i].DTVAL_CO))});
		 switch(data[i].CHAR_ITM_ID){
		  case "T01":
			  categories.push("판매없음");
			  break;
		  default:
			  categories.push(data[i].CHAR_ITM_NM);
		      break;
		 }
		
	}
	
	$fisheryDash.fsrcsHighcharts = Highcharts.chart(target, {
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
							if(!this.selected) $fisheryDash.deselectAllHighcharts();
							let d = data[this.index];
							var title = $("#"+target).parent().find(".chartTitle").text()+ " - " + d.CHAR_ITM_NM.replace("(가구)","").replace("경영주교육정도별어가:","").replace("수산물판매금액별어가:","");
					    	$totSurvMain.ui.chartTarget = target
				    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
				    		$totSurvMain.ui.chartData = d;
				    		$totSurvMain.ui.chartColor = "#576574";
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 수산물 판매금액별 어가 "+ title;
					    	$fisheryDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle,2);
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
	
	$fisheryDash.highcharts.push($fisheryDash.fsrcsHighcharts);
	
	
	
	
}


/**
 * @name         :  totGetFishChart 
 * @description  : 어획품종별 어가 차트
 * @date         : 2020.09.10
 * @author	     : esPark
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function totGetFishChart(data, target, resizeYn, height){
  var margin = ({top: 20, right: (data.length > 11 && $fisheryDash.fisheryType == "sea") ? 20 : 10, bottom: (data.length > 11 && $fisheryDash.fisheryType == "sea") ? 95 : 20, left: 40}) //20201117 박은식 하단 마진값 수정
  
  $("#"+target).empty();
	var width = $("#"+target).outerWidth();
  
	//var tool = d3.select("body").append("div").attr("class", "totPopulationMulticultoolTip");
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	//20201117 박은식 데이터 순위별 색상 변경 로직 추가 (기존에 있는 색상은 삭제) START
	//var colors = ["#D81D62", "#fc2862", "#FD5D79", "#FE7D87", "#FEAAA8","#F9C9C5","#FFDDD8", "#FFE4D8","#FF9B8A","#FF756D","#FF3D43","#DB2C41","#B71E3E","#8F0925","#D81D62", "#fc2862", "#FD5D79", "#FE7D87", "#FEAAA8","#F9C9C5","#FFDDD8"]; //2020.10.27[신예리] 차트 컬러 추가
	var maxColor = "#D81D62";
	var min = d3.min(data,function(d){return Number(d.DTVAL_CO)});
	var max = d3.max(data,function(d){return Number(d.DTVAL_CO)});
	var colors = d3.scaleLinear().domain([min,(max-min)/2,max]).range(['#FFDDD8',"#FD5D79",'#D81D62']);
	var chartData = [], categories = [];	
	for(var i=0;i<data.length;i++){
		if(data[i].DTVAL_CO){		
			chartData.push({y:Number(data[i].DTVAL_CO),color:colors(data[i].DTVAL_CO),name:data[i].CHAR_ITM_NM});
			categories.push(data[i].CHAR_ITM_NM);
		}
	}
	
	
	$fisheryDash.forestryHighcharts = Highcharts.chart(target, {
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
                    let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
					v = v<1000?v:Math.round(v/1000)+"K";
                    return v ;
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
	            pointWidth: 26,
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
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 "+this.name+" 가구수</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							if(!this.selected) $fisheryDash.deselectAllHighcharts();
							let d = data[this.index];
							 var title = "";
		          		 if($fisheryDash.fisheryType == "sea"){
		 	          		   title = $totSurvMain.ui.selectedYear+"년 주된 어로어업 방법별 어가 - "+ d.CHAR_ITM_NM.replace("주된어로어업방법별어가:", "").replace("(가구)", ""); //20201118 박은식 명칭 변경
		 	          		   $fisheryDash.mulType = $("#seaButton > .on").attr("id") 
		 	          	   } else {
		 	          		//20201118 박은식 명칭 변경 및 replace 추가 START
		 	          		   title = $totSurvMain.ui.selectedYear+"년  주된 어획품종별 어가 - "+ d.CHAR_ITM_NM.replace("(가구)", "")
									   															   .replace("패류:", "")
									   															   .replace("아류:", "")
									   															   .replace("갑각류:", "");
		 	          		   //20201118 박은식 명칭 변경 및 replace 추가 END
		 	          		 $fisheryDash.mulType = $("#inlandButton > .on").attr("id") 
		 	          	   }
		 		             //20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
		           	 	if($totSurvMain.ui.selectedLevel != "3"){
		 		            	$totSurvMain.ui.chartTarget = target
		 		         		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
		 		         		$totSurvMain.ui.chartData = d;
		 		         		$totSurvMain.ui.chartColor = "#576574";
		 				    	$totSurvMain.ui.chartTitle = title;
		           	 	}
		 					//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 END
		 			    	$totSurvMain.ui.tileChangeYn = "N";
		 			    	$fisheryDash.ui.chartItmClick($(this), d, "#576574", title,3); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
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
	   
	 $fisheryDash.highcharts.push($fisheryDash.forestryHighcharts);
    


}



//증감율 계산
function fisheryRratioCalculation(thisData, beforeData){
	if(beforeData == 0 ){
		return "-";
	}
	var ratio = (thisData - beforeData) / beforeData*100;
	return ratio.toFixed(2);
}

/**
 * @name         : setFisheryCareerChart 
 * @description  : 경영주 어업 경력기간별 어가
 * @date         : 2020.09.09
 * @author	     : esPark
 * @history 	 : 
 * @parameter	 : target - 대상 div, width - 넓이, height - 높이
 */
function setFisheryCareerChart(data, target, resizeYn, height){
	
	var margin = ({top: 0, right: 50, bottom: 5, left: 60}) //2020.10.26[신예리] x축 잘려서 left값 조정
	var colors = ["#37A660", "#64C97F", "#88E498", "#CAEB6F", "#E2DE67"]; //2020.10.20[신예리] 차트 컬러 변경

	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$fisheryDash.moveHomeData = data;
	
	var max = d3.max(data,function(d){return Number(d.DTVAL_CO)});
	/*var min = d3.min(data,function(d){return Number(d.dt)});
	
	var total = d3.sum(data,function(d){return Number(d.dt)});*/
	var chartData = [], categories = [];
	for(var i=0;i<data.length;i++){
		chartData.push({y:Number(data[i].DTVAL_CO),color:colors[i]});
		data[i].CHAR_ITM_ID=="T01"? data[i].CHAR_ITM_NM="5년미만":data[i].CHAR_ITM_NM=data[i].CHAR_ITM_NM;
		categories.push(data[i].CHAR_ITM_NM);
	}
	
	 
	$fisheryDash.fsrcsHighcharts = Highcharts.chart(target, {
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
			max:max+ ( max*.15),
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
							if(!this.selected) $fisheryDash.deselectAllHighcharts();
							let d = data[this.index];
							var title ="경영주 어업 경력기간별 어가  (" + d.CHAR_ITM_NM.replace(" (가구)", "").replace("경영주교육정도별어가:", "")+")";
					    	$totSurvMain.ui.chartTarget = target
				    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
				    		$totSurvMain.ui.chartData = d;
				    		$totSurvMain.ui.chartColor = "#576574";
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+ title;
					    	$fisheryDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ title,5);
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
	
	$fisheryDash.highcharts.push($fisheryDash.fsrcsHighcharts);
	
	
	
		   
}

/**
 * @name         : setFisheryAgeChart 
 * @description  : 연령분포 차트 세팅
 * @date         : 2020.08.06
 * @author	     : juKwak
 * @history 	 : 
 */
function setFisheryAgeChart(data, target, resizeYn, height){

	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	var maxVal = d3.max(data, function(d){ return Number(d.DTVAL_CO) });
	var colors = ["#4dc7ac","#4dc7ac","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#f5ca87","#f5ca87","#f5ca87","#f5ca87","#f5ca87"] //20201022 박은식 청년 장년 노년 연령 색상 변경
	
	//임시 end
	var chartData = [], categories = [];
	for(var i=0;i<data.length;i++){
		data[i].CHAR_ITM_ID=="T01"? data[i].CHAR_ITM_NM =data[i].CHAR_ITM_NM.replace('경영주연령별어가:',''):data[i].CHAR_ITM_ID=data[i].CHAR_ITM_ID;
		chartData.push({y:Number(data[i].DTVAL_CO),color:colors[i],name:data[i].CHAR_ITM_NM});
		categories.push(data[i].CHAR_ITM_NM);
	}

	$fisheryDash.mngmtageHighcharts = Highcharts.chart(target, {
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
	        max: maxVal + (maxVal*.15),
	        title: {
	            text: null
	        },
			lineWidth: 0,
			tickInterval:maxVal/4,
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
							if(!this.selected) $fisheryDash.deselectAllHighcharts();
							let d = data[this.index];
							if($totSurvMain.ui.selectedLevel != "3"){    			
					    		$totSurvMain.ui.chartTarget = target
					    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
					    		$totSurvMain.ui.chartData = d;
					    		$totSurvMain.ui.chartColor = "#576574";
					    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 경영주 연령벌 어가 ("+this.name+")";
				    		}
							$fisheryDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.chartTitle, 4);
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

	$fisheryDash.highcharts.push($fisheryDash.mngmtageHighcharts);
	
}

/**
 * @name         : fisheryTypePieChart 
 * @description  : 영영 형태별 어가
 * @date         : 2020.10.15
 * @author	     : jhs
 * @history 	 : 
 */
function fisheryTypePieChart(data, resizeYn, height){
	$("#fisheryType").empty();
	var chartData = [],total=0;
	var tool = $(".chartCommontoolTip");
	var margin = {top: 20, right: 100, bottom: 20, left: 100}
	var w = 400, h = 250; //width값 임시 (반응형 처리전) //2020.10.20[신예리] width값 변경

	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	
	var colorData = ["#4473C5", "#599BD4", "#ED7D31", "#FFC000", "#B9D430", "#BDC6F5", "#E85757","#E8CB78"]; //2020.10.20[신예리] 차트 컬러 변경
	var graphData = [data.length];
	if($("#seaWater").hasClass("on")){
		for (var i = 0; i < data.length; i++) {
			graphData[i] = data[i].DTVAL_CO;
		    if(isNaN(Number(data[i].DTVAL_CO))) data[i].DTVAL_CO = 0;
		    if($totSurvMain.ui.selectedYear == "2020") {
		    	switch(data[i].CHAR_ITM_ID){
		    	  case "T01":
		    		  data[i].CHAR_ITM_NM ="어로어업(가구)"; //근해, 연안, 구획, 정치망, 마을, 기타의 합계
		    		  break;
			      case "T02":
			    	  data[i].CHAR_ITM_NM ="근해어업";
			    	  break;
			      case "T03":
			    	  data[i].CHAR_ITM_NM ="연안어업";
			    	  break;
			      case "T04":
			    	  data[i].CHAR_ITM_NM ="구획어업";
			    	  break;
			      case "T05":
			    	  data[i].CHAR_ITM_NM ="정치망"; 
			    	  break;ㅣ
			      case "T06":
			    	  data[i].CHAR_ITM_NM ="마을어업";
			    	  break;
			      case "T07":
			    	  data[i].CHAR_ITM_NM ="기타어업";
			    	  break;
			      case "T09":
			    	  data[i].CHAR_ITM_NM ="양식업(어류)";
			    	  break;
			      case "T10":
			    	  data[i].CHAR_ITM_NM ="양식업(갑각류)";
			    	  break;
			      case "T11":
			    	  data[i].CHAR_ITM_NM ="양식업(패류)";
			    	  break;
			      case "T12":
			    	  data[i].CHAR_ITM_NM ="양식업(기타)";
			    	  break;
			      case "T13":
			    	  data[i].CHAR_ITM_NM ="양식업(해조류)";
			    	  break;
			      case "T14":
			    	  data[i].CHAR_ITM_NM ="양식업(종자-종묘)";
			    	  break;
			      default:
			      break;
		     }
		    } else {
		    	switch(data[i].CHAR_ITM_ID){
		    	  case "T01":
		    		  data[i].CHAR_ITM_NM ="어로어업";
		    		  break
			      case "T02":
			    	  data[i].CHAR_ITM_NM ="어로어업(어선사용)";
			    	  break
			      case "T05":
			    	  data[i].CHAR_ITM_NM ="어로어업(어선미사용)";
			    	  break
			      case "T07":
			    	  data[i].CHAR_ITM_NM ="양식업(어류)";
			    	  break
			      case "T08":
			    	  data[i].CHAR_ITM_NM ="양식업(갑각류)"; 
			    	  break
			      case "T09":
			    	  data[i].CHAR_ITM_NM ="양식업(패류)";
			    	  break
			      case "T10":
			    	  data[i].CHAR_ITM_NM ="양식업(기타)";
			    	  break
			      case "T11":
			    	  data[i].CHAR_ITM_NM ="양식업(해조류)";
			    	  break
			      case "T12":
			    	  data[i].CHAR_ITM_NM ="양식업(종묘)";
			    	  break
			      default:
			      break;
		     }
		    }
		    
		    chartData.push({name:data[i].CHAR_ITM_NM,color:colorData[i],y:Number(data[i].DTVAL_CO)});
		    total += Number(data[i].DTVAL_CO);
		}
	} else {
		for (var i = 0; i < data.length; i++) {
			graphData[i] = data[i].DTVAL_CO;
		    if(isNaN(Number(data[i].DTVAL_CO))) data[i].DTVAL_CO = 0;
		    switch(data[i].CHAR_ITM_ID){
		    	  case "T01":
		    		  data[i].CHAR_ITM_NM ="어로어업";
		    		  break;
			      case "T03":
			    	  data[i].CHAR_ITM_NM ="양식업(어류)";
			    	  break;
			      case "T04":
			    	  data[i].CHAR_ITM_NM ="양식업(갑각류)";
			    	  break;
			      case "T05":
			    	  data[i].CHAR_ITM_NM ="양식업(패류)";
			    	  break;
			      case "T06":
			    	  data[i].CHAR_ITM_NM ="양식업(기타)";
			    	  break;
			      default:
			      break;
		     }
		    chartData.push({name:data[i].CHAR_ITM_NM,color:colorData[i],y:Number(data[i].DTVAL_CO)});
		    total += Number(data[i].DTVAL_CO);
		}
	}
		
	
	$fisheryDash.pieHighcharts = Highcharts.chart('fisheryType', {
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
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 경영형태별 어가 - "+ this.name +" </p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							if(!this.selected) $fisheryDash.deselectAllHighcharts();
							var toolData = data[this.index];
					    	$totSurvMain.ui.chartTarget = "fisheryType"
				    		$totSurvMain.ui.chartIndex = $(this).parent().index()
				    		$totSurvMain.ui.chartData = toolData;
				    		$totSurvMain.ui.chartColor = "#576574";
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 경영형태별 어가 - " + toolData.CHAR_ITM_NM.replace(":소계 (가구)", "").replace("(가구)", "");
					    	$fisheryDash.ui.chartItmClick($(this), toolData, "#576574",$totSurvMain.ui.chartTitle,1);
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
				return "<tspan>"+this.name + "</tspan> <tspan x='140'>: " + numberFormat(this.y) + "</tspan>";
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
	
	$fisheryDash.highcharts.push($fisheryDash.pieHighcharts);
	
	$fisheryDash.deselectAllHighcharts = function(){
		$fisheryDash.highcharts.forEach(function(chart){
			if(!chart||!chart.series) return;
			chart.series.forEach(function(s){
				s.data.forEach(function(point){
			        point.select(false);
			      });
			});
		});
	}
	
}
