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
	W.$houseHoldDash = W.$houseHoldDash || {};
	
	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$houseHoldDash.isDev = true;
	/* 공공데이터 조회 변수*/
	$houseHoldDash.org_id = "";
	$houseHoldDash.tbl_id = "";
	$houseHoldDash.kosis_data_item = "";
	$houseHoldDash.kosis_data_period = "";
	$houseHoldDash.kosis_data_year = "";
	$houseHoldDash.gis_se = "";
	$houseHoldDash.obj_var_id = "";
	$houseHoldDash.field_id = "";
	$houseHoldDash.kosis_data_item_detail = "";
	
	$houseHoldDash.kosis_result_data = [];
	
	//현재 그려진 d3의 데이터를 담는 변수
	$houseHoldDash.onePeopleData = {};
	$houseHoldDash.sixtyFiveOverData = {};
	$houseHoldDash.childrenData = {};
	$houseHoldDash.mergeData = {};
	//현재 그려진 d3의 데이터를 담는 변수
	
	//현재 조회하고있는 rank 지역 level
	$houseHoldDash.regionLevel = 'sido';
	//행정시도 정보를 담아둔다
	$houseHoldDash.atdrc = '';	
	//비자치구에서 행정시로 이동여부
	$houseHoldDash.upperBack = false;
//	$houseHoldDash.noReverseGeoCode = true;
	
	$(document).ready(function() {
		
	});
	
	//d3 반응형 이벤트
	$(window).resize( function(){
		if($totSurvMain.ui.pageIndex == '2' && !$(".mapExport").hasClass('on')){
			//20201014 박은식 맵확대 축소시 고정값에서 비율로 변경 START
			$("#one_people").outerWidth('100%');
			$("#age65over").outerWidth('100%');
			$("#children").outerWidth('100%');
			$("#houseHoldTimeChart").outerWidth('100%')
			//20201014 박은식 맵확대 축소시 고정값에서 비율로 변경 ENM
			// 내국인 차트 세팅
			// 2020-10-14 [곽제욱] resize 후 차트 새로그릴때 조건절 추가 START
			if($houseHoldDash.onePeopleData.length > 0){
				setOnePeopleChart($houseHoldDash.onePeopleData, "one_people", "Y", "138"); //2020.09.22[신예리] 1인 가구 거처 종류 height값 수정
			}
			
			// 외국인 차트 세팅
			if($houseHoldDash.sixtyFiveOverData.length > 0){ 
				setHouseBarChart($houseHoldDash.sixtyFiveOverData, "age65over", "Y", "135", "1"); //2020.09.22[신예리] 65세 이상 가구의 수 height값 수정
			}
			
			
			//연령분포 차트 세팅
			if($houseHoldDash.childrenData.length > 0){ 
				setHouseBarChart($houseHoldDash.childrenData, "children", "Y", "135", "2"); //2020.09.22[신예리] 65세 이상 가구의 수 height값 수정
			}
			
			//거주지이동 차트 세팅
			if($houseHoldDash.mergeData.length > 0){ 
				houseAreaChart($houseHoldDash.mergeData, "houseHoldTimeChart", "Y", "160"); //2020.10.23 박은식 파라미터 수정
			}
			// 2020-10-14 [곽제욱] resize 후 차트 새로그릴때 조건절 추가 END
			
			 //20201014 박은식 차트 색상 유지 처리 START
			if($totSurvMain.ui.chartTarget != ""
				&& typeof($totSurvMain.ui.chartIndex) == "number"
				&& $totSurvMain.ui.chartColor != ""){
				 
				$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, $totSurvMain.ui.chartData, $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
			}
			 //20201014 박은식 차트 색상 유지 처리 END
		}
		if($totSurvMain.ui.pageIndex == '2' && $(".mapExport").hasClass('on')){ // 20201013 박은식 map resize 조건문 추가
			$(".col-SubL").width($(window).width()-430);
			$(".col-SubL").height("825"); //2020.09.15 [신예리] height 값 수정
							
			$("#mapArea").width($(window).width()-430);
			$("#mapArea").height("800"); //2020.09.15 [신예리] height 값 수정
			
			// 맵 사이즈
			$('#mapRgn_1').width($(window).width()-430);
			$('#mapRgn_1').height("800"); //2020.09.15 [신예리] height 값 수정
		}
	});
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {});

	$houseHoldDash.const = {},
	
	$houseHoldDash.ui = {
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
			$totSurvMap.ui.selectedItmCd = "T200";
			//20201120 박은식 초기화 추가 END
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/houseHoldDash/main");
		},
		
		ready : function(){			
			// 전체 화면 reload
			
			//20201104 박은식 화면 초기화 시 조건 추가 START
			if($totSurvMain.ui.selectedArea=="" || $totSurvMain.ui.selectedArea=="00" || $totSurvMain.ui.selectedArea=="99"){ 
				$totSurvMain.ui.selectedArea = "00";
				$totSurvMain.ui.selectedLevel = "0"; // 2020-11-02 [곽제욱] url paramter 추가로 인한 selectedLevel 세팅
			} 
			//20201104 박은식 화면 초기화 시 조건 추가 END
			// 2020-11-02 [곽제욱] url parameter 추가로 인한 로직 START
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
			// 2020-11-02 [곽제욱] url parameter 추가로 인한 로직 END
			$totSurvMap.ui.selectedSurvId = "PH0001";
			$totSurvMap.ui.selectedItmCd = "T200";
			
			// 2020-11-02 [곽제욱] 시도, 시군구, 행정시 랭킹 가져오기 START
			$.ajax({
				method: "POST",
				async: false,	
				url: contextPath + "/ServiceAPI/totSurv/common/getTotSurvRegionCount.json",
				data: { year: $totSurvMain.ui.selectedYear, region_cd : $totSurvMain.ui.selectedArea, surv_id : $totSurvMap.ui.selectedSurvId, itm_cd : $totSurvMap.ui.selectedItmCd, isAtdrc:$totSurvMap.ui.isAtdrc, thema:"population"}, // 
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
			//$houseHoldDash.ui.clear();
			// 2020-11-02 [곽제욱] 시도, 시군구, 행정시 랭킹 가져오기 END
			$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "1");
			
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
			$totSurvMap.ui.selectedItmCd = "T200";
			//20201120 박은식 초기화 추가 END
			// 1인가구 거처 종류 차트 초기화
			$("#one_people").empty();
			// 65세 차트 초기화
			$("#age65over").empty();
			// 가구별 자녀의 수 차트 초기화
			$("#children").empty();
			// 성별, 연력별 가구의 주택
			$("#houseHoldTimeChart").empty();
		},
		
		drawContent : function(surv_id, itm_cd, c1, c2){
			if(surv_id == null|| surv_id == "" || surv_id == undefined){
				$totSurvMap.ui.selectedSurvId = "PH0001"; // 인구같은경우 디폴트
			} else {
				$totSurvMap.ui.selectedSurvId = surv_id; // 인구같은경우 디폴트
				
			}
			

			if(itm_cd==null||itm_cd==""||itm_cd==undefined){
				$totSurvMap.ui.selectedItmCd = "T200"; //20201120 박은식 초기화 itm_cd변경
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
			// TODO 시군구(5자리)인 선택한 코드값 설정
			//$houseHoldDash.gis_se = region_cd;
			//alert("$houseHoldDash.gis_se = " + $houseHoldDash.gis_se);

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
						$houseHoldDash.ui.totSurvInfoData = totSurvInfo;
						
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
					url: contextPath + "/ServiceAPI/totSurv/houseHoldDash/getUpperRegionCheck.json",
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
		chartItmClick : function(obj, d, color, contents){
			// 선택한 레벨이 3이 아닐경우
			if($totSurvMain.ui.selectedLevel != 3){
				var params = 'year='+$totSurvMain.ui.selectedYear+',region_cd='+$totSurvMain.ui.selectedArea.substring(0,4)+"0";
				params+= ',itm_cd='+d.itm_cd+',surv_id='+d.surv_id;
				
				
			
				
				if( d.surv_id == 'PH0209' ){
					srvLogWrite('P0','04','04','01',$totSurvMain.ui.selectedThema,params); //1인 가구 거처 종류
				} else if( d.surv_id == 'PH0202'){
					srvLogWrite('P0','04','04','02',$totSurvMain.ui.selectedThema,params); //65세 이상 가구의 수
				} else if( d.surv_id == 'PH0214'){
					srvLogWrite('P0','04','04','03',$totSurvMain.ui.selectedThema,params); //가구별 자녀의 수
				} else if( d.surv_id == 'PH0196'){
					srvLogWrite('P0','04','02','00',$totSurvMain.ui.selectedThema,params); //하단 차트
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
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
		    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);		
		    		if($totSurvMap.ui.isAtdrc){
		    			$totSurvMap.ui.mapToggleId = "";
		    		}
		    			
					$houseHoldDash.ui.drawContent(d.TBL_ID, d.CHAR_ITM_ID, d.OV_L2_ID, d.OV_L3_ID); // 2020
					// 차트 토글여부 Y
					$totSurvMap.ui.chartToggleYn = "Y";
					// 현재 선택한 오브젝트를 변수에 저장
					$totSurvMap.ui.selectedObj = obj;
					// 현재 선택한 오브젝트의 색 변경
					obj.attr("fill", color);
					// 선택한 아이템이 변경되면서 선택한 아이템의 색상도 변경처리
					$totSurvMain.ui.selectedTempColor = $totSurvMain.ui.tempColor;
					/*var title = "";
					title += contents;
					*/
					
					var title = contents;
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
		    		$houseHoldDash.ui.drawContent("PH0001", "T200", "");
					if($totSurvMain.ui.chartColor != ""){
						obj.attr("fill", $totSurvMain.ui.chartColor);
					} else {
						obj.attr("fill", $totSurvMain.ui.selectedTempColor);
					}	
					//20201014 박은식 chartSelectedSave function parameter 초기화 및 색상 처리 조건추가 초기화 END	
		    		$totSurvMap.ui.chartToggleYn = "N";
		    		$totSurvMap.ui.selectedObj = "";
		    		$("#itmDiv").css("display", "none");
		    		$("#itmDiv").html(title);
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
			if($totSurvMap.ui.isAtdrc || $("#total_rank").attr('max') == $totSurvMain.ui.atdrcRank){
				//현재 행정시도정보를 저장한다. 
				//비자치구와 행정시의 4자리수까지는 같다는 점을 이용한다
				$houseHoldDash.atdrc = $totSurvMain.ui.selectedArea.substring(4,0);
			}
			
			/**행정시 처리 로직 (테스트)*/
			
			var param = {};
			var type = 'total';
			var level = 'sido';

			if($totSurvMain.ui.selectedArea.length == 2 && !$totSurvMap.ui.isAtdrc){
				lavel = 'sido'
			} else if(($totSurvMain.ui.selectedArea.substring(4) != '0' && $houseHoldDash.atdrc == $totSurvMain.ui.selectedArea.substring(4,0))){
				level = 'atdrc'// atdrc
			} else {
				level ='sgg'
			}

			var year = $totSurvMain.ui.selectedYear;
			if(rank != null && rank != '' && rank != undefined){
				if(target == 'total_rank' || target == "" || target == null){ //총인구, 남여비율, 외국인 중 어떤 기준으로 랭크를 조회 했는지와 디폴트값 설정
					type = 'total';
					srvLogWrite('P0','04','03','02',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
				} else if(target == 'totalRatio_rank'){
					type = 'totalRatio';
					srvLogWrite('P0','04','03','03',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
				} else{
					type = 'oneHouse';
					srvLogWrite('P0','04','03','04',$totSurvMain.ui.selectedThema,'adm_cd='+regionCd+",year="+year+",rank="+rank);
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
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/houseHold/getTotHouseHoldRank.json",
				data: param, 
				dataType: "json",
				success: function(res) {
					/**range value setting */
					var totalList = res.result.totalRankData[0];
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						var totalRatioList = res.result.totalRatioRankData[0];
						var oneHouseList = res.result.oneHouseRankData[0];
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
					
					var sido = region_cd.substring(0,2);
					var sgg = region_cd.substring(2,5);
					if(sgg=="" || sgg==null){
						sgg = "999";
					}
					
					$("#dash_sido").val(sido);
					$("#dash_sgg").val(sgg);
					
					if(target != '' && target != null){
						/** set Area */
						$totSurvMain.ui.selectedArea = region_cd;
						/** init chart */
						$houseHoldDash.ui.clear();
						
						/** chart renderer */
						if(region_cd.length == 2){
				    		$("#dash_sido option[value='"+region_cd+"']").attr("selected", "true");
				    		if(region_cd != '00' && region_cd != '99'){
				    			$("#dash_sgg option[value='999']").attr("selected", "true");
				    		}
				    		$totSurvMain.ui.tileChangeYn = "Y"; 
				    		$totSurvMain.ui.selectedLevel = "1";
				    		$houseHoldDash.event.allChange(region_cd, "1");
				    	}
				    	// 시군구 데이터 일 경우 kosis정보 호출
				    	else if(region_cd.length == 5){
				    		var tempRegionCd = region_cd.substring(0,4)+"0";
				    		$totSurvMap.ui.checkIsAtdrc(tempRegionCd);
				    		// 행정시가 아닐경우
				    		if($totSurvMap.ui.isAtdrc != true){
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMap.ui.mapToggleId = region_cd;
				    			$houseHoldDash.event.allChange(region_cd, "1");
				    		}
				    		// 행정시일 경우
				    		else{
				    			$totSurvMap.ui.mapToggleId = "";  
				    			$totSurvMain.ui.selectedArea = region_cd;
				    			$totSurvMain.ui.getSidoSggPos(region_cd);
				    			$("#dash_sido").val(region_cd.substring(0,2));
				    			$houseHoldDash.event.allChange(region_cd, "1");
				    		}
				    	}
					}
					if($totSurvMain.ui.selectedArea != '99' && $totSurvMain.ui.selectedArea != '00'){
						$houseHoldDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,totalList.rank,totalRatioList.rank,oneHouseList.rank);
					} else {
						$houseHoldDash.ui.rankSlideRender($totSurvMain.ui.selectedArea,'0','0','0');
					}
					//비자치구 일 경우 행정시도로 이동하는 로직
					if($houseHoldDash.upperBack == true){
						$totSurvMap.ui.checkIsAtdrc(regionCd);	
						$totSurvMain.ui.selectedArea = regionCd
						$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
						$totSurvMap.ui.mapRegion = "sgg";
						$houseHoldDash.event.allChange(regionCd,"1")
					}
				},
				error: function(){
					
				}
			})
			$houseHoldDash.upperBack = false;
			if($totSurvMain.ui.chartTarget != ""
				&& typeof($totSurvMain.ui.chartIndex) == "number"
				&& $totSurvMain.ui.chartColor != ""){
				 
				$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, $totSurvMain.ui.chartData, $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
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
		rankSlideRender : function(regionCd,totalRank, genderRank, foreignRank){
			$totSurvMain.ui.tileChangeYn = "Y";
			$("#total_range").show();
			$("#totalRatio_range").show();
			$("#oneHouse_range").show();
			if($totSurvMain.ui.selectedArea.length == 2 && !$totSurvMap.ui.isAtdrc){
				$houseHoldDash.regionLevel = 'sido'
				$("#total_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
				$("#totalRatio_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
				$("#oneHouse_rank").attr("max", $totSurvMain.ui.sidoMaxRank);
				$("#total_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
				$("#totalRatio_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
				$("#oneHouse_range").find("span").eq(1).text($totSurvMain.ui.sidoMaxRank+"번");
			} else if($totSurvMain.ui.selectedArea.substring(4) != '0' && $houseHoldDash.atdrc == $totSurvMain.ui.selectedArea.substring(4,0) ) {
				$houseHoldDash.regionLevel = 'atdrc'
				$("#total_rank").attr("max", $totSurvMain.ui.atdrcRank);
				$("#totalRatio_rank").attr("max", $totSurvMain.ui.atdrcRank);
				$("#oneHouse_rank").attr("max", $totSurvMain.ui.atdrcRank);
				$("#total_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
				$("#totalRatio_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
				$("#oneHouse_range").find("span").eq(1).text($totSurvMain.ui.atdrcRank+"번");
			} else if($("#total_rank").attr("max") != $totSurvMain.ui.atdrcRank || $houseHoldDash.upperBack == true){
				$houseHoldDash.regionLevel = 'sgg'
				$("#total_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#totalRatio_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#oneHouse_rank").attr("max", $totSurvMain.ui.sggEmdongMaxRank);
				$("#total_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
				$("#totalRatio_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
				$("#oneHouse_range").find("span").eq(1).text($totSurvMain.ui.sggEmdongMaxRank+"번");
			}
			$("#total_rank").val(totalRank);
			$("#totalRatio_rank").val(genderRank);
			$("#oneHouse_rank").val(foreignRank);
			$("#total_range").find("span").eq(2).text(/*$("#total_rank").val()*/totalRank+"번째");
			$("#totalRatio_range").find("span").eq(2).text(/*$("#totalRatio_rank").val()*/genderRank+"번째");
			$("#total_rank").css('background','linear-gradient(to right, #2FBFDC  0%, #2FBFDC  ' + ((100/($("#total_rank").attr("max")-1))*($("#total_rank").val()-1)) + '%, #fff ' + ((100/($("#total_rank").attr("max")-1))*($("#total_rank").val()-1)) + '%, white 100%)');
			$("#totalRatio_rank").css('background','linear-gradient(to right, #2FBFDC  0%, #2FBFDC  ' + ((100/($("#totalRatio_rank").attr("max")-1))*($("#totalRatio_rank").val()-1)) + '%, #fff ' + ((100/($("#totalRatio_rank").attr("max")-1))*($("#totalRatio_rank").val()-1)) + '%, white 100%)');
			$("#oneHouse_rank").css('background','linear-gradient(to right, #2FBFDC  0%, #2FBFDC  ' + ((100/($("#oneHouse_rank").attr("max")-1))*($("#oneHouse_rank").val()-1)) + '%, #fff ' + ((100/($("#oneHouse_rank").attr("max")-1))*($("#oneHouse_rank").val()-1)) + '%, white 100%)');
			$("#rangeV1").find('span').eq(0).text($("#total_rank").val()+"번");
			$("#rangeV1").offset({left:133+((100/($("#total_rank").attr("max")-1))*($("#total_rank").val()-1)/100*($("#total_rank").outerWidth()-20)), top:$("#total_rank").offset().top-30}) // 538 -> $("total_rank").offset().top;
			$("#rangeV2").find('span').eq(0).text($("#totalRatio_rank").val()+"번");
			$("#rangeV2").offset({left:133+((100/($("#totalRatio_rank").attr("max")-1))*($("#totalRatio_rank").val()-1)/100*($("#total_rank").outerWidth()-20)), top:$("#totalRatio_rank").offset().top-30}) // 691
			$("#rangeV3").find('span').eq(0).text($("#oneHouse_rank").val()+"번");
			$("#rangeV3").offset({left:133+((100/($("#oneHouse_rank").attr("max")-1))*($("#oneHouse_rank").val()-1)/100*($("#total_rank").outerWidth()-20)), top:$("#oneHouse_rank").offset().top-30}) // 843
			$("#houseRank").html(totalRank); 
			
			if($totSurvMain.ui.selectedArea.length == 2){
				$("#houseHoldRanking").html($totSurvMain.ui.sidoMaxRank + "개 시도 중");
				$("#houseHoldRanking").parent().find("button").attr("id", "totalSido")
				
				var areaTitle = $("#dash_sido option:selected").html();
				
				$("#houseHoldRatioRanking").html(areaTitle + " 가구수 증감");
				$("#oneHouseRanking").html(areaTitle + " 1인가구 수");
			}else if($totSurvMain.ui.selectedArea.length == 5){
				var areaTitle = $("#dash_sgg option:selected").html();
				if($houseHoldDash.regionLevel == 'atdrc'){
					$("#houseHoldRanking").html($totSurvMain.ui.atdrcRank + "개 비자치구 중");
				} else {
					$("#houseHoldRanking").html($totSurvMain.ui.sggEmdongMaxRank + "개 시군구 중");
				}
				$("#houseHoldRanking").parent().find("button").attr("id", "totalSgg")
				$("#houseHoldRatioRanking").html(areaTitle + " 가구수 증감");
				$("#oneHouseRanking").html(areaTitle + " 1인가구 수");
			}
			$("#totPeopleNumber").html("총가구 - " + areaTitle);
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
			$("#totalRatio_rank").val(0);
			$("#oneHouse_rank").val(0);
			$houseHoldDash.ui.rankSlideRender("00", 0,0,0);
			
			
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
						if(res.result.cnt >= 1){
							upperRegCd = '';
						}
					},
					error: function(){
						
					}
				})
			}
			return upperRegCd;
		}
	};
	
	
	$houseHoldDash.util = {};
	
	$houseHoldDash.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			
			var body = $("body");
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 start*/
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#total_rank, #totalRatio_rank, #oneHouse_rank", function(e){ // 20201014 박은식 IE event 문제로 change 추가
			//2020.09.10[신예리] 슬라이드 컬러 수정
				this.style.background = 'linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
				if(e.target.id == "total_rank"){
					$("#rangeV1").find('span').eq(0).text(this.value+"번");
					$("#rangeV1").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#total_rank").outerWidth()-20)), top:$("#total_rank").offset().top-30})
				} else if(e.target.id == "totalRatio_rank"){
					$("#rangeV2").find('span').eq(0).text(this.value+"번");
					$("#rangeV2").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#totalRatio_rank").outerWidth()-20)), top:$("#totalRatio_rank").offset().top-30})
				} else if(e.target.id == "oneHouse_rank") {
					$("#rangeV3").find('span').eq(0).text(this.value+"번");
					$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#oneHouse_rank").outerWidth()-20)), top:$("#oneHouse_rank").offset().top-30})
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
			
			// 2020-11-10 [곽제욱] url Parameter 추가로 인한 level체크후 rangeContainer display 변경 START
			if($totSurvMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			$houseHoldDash.ui.getRankSet("", "",$totSurvMain.ui.selectedArea);
			// 2020-11-10 [곽제욱] url Parameter 추가로 인한 level체크후 rangeContainer display 변경 END
			
			/** 각 차트 영역 클릭시 tileMap 과 지도 변경 (현재는 계만 조회, 각 막대별 클릭일경우 함수 변경 필요 */
			
			/** 맵 선택 - 안보이게 설정*/
			$(".select").hide();
			
			// 개방형지도란 버튼 활성화/비활성화
			$(".mapInfo").hide();	
			
			/** 세계지도일 경우 버튼 안보이도록 설정 */
			if($totSurvMap.ui.map == null){
				$(".mapExport").hide();
				$(".zoom").hide();
				$(".out").hide();
			}			
			
			/** 맵 최대크기 */
			$(".mapExport").on("click", function(){
				
				srvLogWrite('P0','01','04','02',$totSurvMain.ui.selectedThema,( $(".mapExport").hasClass("on") ? "작게" : "크게" ) );
				
				if($(".mapExport").hasClass("on")) {
//					alert("큰화면 -> 작은화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					
					$(".mapExport").removeClass("on");
					$(".col-SubL").width("");
					$(".col-SubL").height("584"); //2020.09.16[신예리] 영역 맞춤
					// 맵 사이즈
					$('#mapRgn_1').width("");
					$('#mapRgn_1').height("560");
					
					$("#moveDiv22").show(); 
					$("#ageDiv").show(); 
					$("#moveDiv2").show();
					$("#allhouseHoldForTime").show();
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
					//$populationDash.event.allChange($totSurvMain.ui.selectedArea, "2"); 2020-10-12 [곽제욱] 로직 변경으로 인한 주석처리
					
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 START
					var html = "";
					html += "<div class='DataNone' id='onePeopleNone' style='text-align: center;'>";
					html += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 25px;'>";
					html += "	<p style='margin-top: 15px;'>해당년도 통계정보가 없습니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
					html += "</div>";
					
					if($houseHoldDash.onePeopleData.length>0){
						setOnePeopleChart($houseHoldDash.onePeopleData, "one_people", "N", "138");
					} else {
						$("#one_people").html(html);
					}
					if($houseHoldDash.sixtyFiveOverData.length>0){
						setHouseBarChart($houseHoldDash.sixtyFiveOverData, "age65over", "Y", "140", "1");
					} else {
						// 2020-12-10 [곽제욱] 데이터 없는 지표 커스텀 처리 START
						html = "";
						html += "<div class='DataNone' id='onePeopleNone' style='text-align: center;'>";
						html += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 25px;'>";
						html += "	<p style='margin-top: 15px;'>2017년부터 제공하는 통계입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
						html += "</div>";
						// 2020-12-10 [곽제욱] 데이터 없는 지표 커스텀 처리 END
						$("#age65over").html(html);
					}
					if($houseHoldDash.childrenData.length>0){
						// 2020-12-10 [곽제욱] 데이터 없는 지표 커스텀 처리 START
						html = "";
						html += "<div class='DataNone' id='onePeopleNone' style='text-align: center;'>";
						html += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 25px;'>";
						html += "	<p style='margin-top: 15px;'>2016년부터 제공하는 통계입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
						html += "</div>";
						// 2020-12-10 [곽제욱] 데이터 없는 지표 커스텀 처리 END
						setHouseBarChart($houseHoldDash.childrenData, "children", "Y", "131", "2");
					} else {
						$("#children").html(html);
					}
					if($houseHoldDash.mergeData.length>0){
						houseAreaChart($houseHoldDash.mergeData, "houseHoldTimeChart", "N", "160");
					} else {
						$("#houseHoldTimeChart").html(html);
					}
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, $totSurvMain.ui.chartTarget, $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 END
				}
				else{
//					alert("작은화면 -> 큰화면");
					$totSurvMap.ui.map.gMap.setMinZoom(1);
					//20201014 박은식 맵 확대 시 width 고정처리 START
					if($("#one_people").find("svg").length>0){
						$("#one_people").outerWidth($("svg").find("svg").outerWidth());
					}
					if($("#age65over").find("svg").length>0){
						$("#age65over").width($("#age65over").find("svg").outerWidth()-10);
					}
					if($("#children").find("svg").length>0){
						$("#children").outerWidth($("#children").find("svg").outerWidth()-10);
					}
					if($("#houseHoldTimeChart").find("svg").length>0){
						$("#houseHoldTimeChart").outerWidth($("#houseHoldTimeChart").find("svg").outerWidth()-10);
					}
					//20201014 박은식 맵 확대 시 width 고정처리 START
					$(".mapExport").addClass("on");
					$("#moveDiv22").hide(); 
					$("#ageDiv").hide(); 
					$("#moveDiv2").hide();
					$("#allhouseHoldForTime").hide();
					
					// 지도 크기 설정
					$(".col-SubL").width($(window).width()-430);
					$(".col-SubL").height("825"); //2020.09.15 [신예리] height 값 수정
									
					$("#mapArea").width($(window).width()-430);
					$("#mapArea").height("800"); //2020.09.15 [신예리] height 값 수정
					
					// 맵 사이즈
					$('#mapRgn_1').width($(window).width()-430);
					$('#mapRgn_1').height("800"); //2020.09.15 [신예리] height 값 수정
					
					$totSurvMap.ui.map.update()
					
				}
				
			});
			
			/** 맵 확대 */
			body.on("click", "#pZoom", function(){  //20201013 박은식 class -> id로 selector변경
				
				srvLogWrite('P0','01','04','03',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear);
				var lv_zoom = $totSurvMap.ui.map.zoom;
				$totSurvMap.ui.map.setZoom((lv_zoom+1));
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
							$houseHoldDash.event.allChange(to_sido_cd, "1");
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
							$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
									$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$houseHoldDash.upperBack = true;
									$houseHoldDash.ui.getRankSet("", "sgg", $totSurvMain.ui.selectedArea);
									$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경									
								} else {
									$totSurvMain.ui.selectedLevel =  "1";
									$totSurvMain.ui.selectedArea = to_sido_cd;
									$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$totSurvMain.ui.pathChange("sgg", to_sido_cd);
									$houseHoldDash.upperBack = true;
									$totSurvMap.ui.mapToggleId = "";
									$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$totSurvMap.ui.isAtdrc = false;
									$houseHoldDash.ui.getRankSet("", "sido", to_sido_cd);
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
								$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							}
							//$totSurvMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
						}
					});
					
					/** 2020-10-12 [곽제욱] zoomout 시 경게조회 이벤트 추가 END */
				}				
				 
			});
			
			/** 개방형지도란 이벤트*/
			$(".mapInfo").on("click", function(){
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
			
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#total_rank, #gender_rank, #foreign_rank", function(e){ // 20201014 박은식 IE event 문제로 change 추가
				$totSurvMain.ui.chartTarget = "";
	    		$totSurvMain.ui.chartIndex = "";
	    		$totSurvMain.ui.chartData = "";
	    		$totSurvMain.ui.chartColor = "";
	    		$totSurvMain.ui.chartTitle = "";
	    		$totSurvMap.ui.selectedObj[0] = "";
				this.style.background = 'linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
				if(e.target.id == "total_rank"){
					$("#rangeV1").find('span').eq(0).text(this.value+"번");
					$("#rangeV1").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#total_rank").outerWidth()-20)), top:$("#total_rank").offset().top-30})
				} else if(e.target.id == "totalRatio_rank"){
					$("#rangeV2").find('span').eq(0).text(this.value+"번");
					$("#rangeV2").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#total_rank").outerWidth()-20)), top:$("#totalRatio_rank").offset().top-30})
				} else if(e.target.id == "oneHouse_rank") {
					$("#rangeV3").find('span').eq(0).text(this.value+"번");
					$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#total_rank").outerWidth()-20)), top:$("#oneHouse_rank").offset().top-30})
				}
			
			})
				
			body.on("mouseup", "#total_rank, #totalRatio_rank, #oneHouse_rank", function(){  // 20201012 박은식 IE event 문제로 change 추가
				$houseHoldDash.ui.getRankSet(this.value, this.id, "");
			})
			
			
			// 2020-10-22 공통 이벤트 (메타정보, 다른차트, 이미지 저장, 맵 저장) 이벤트 추가 START
			
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
				
				if(selId == "highChartDiv1Wrap"){
					chartModal($houseHoldDash.onePeopleData, 'itm1', 'itm_nm', 'dt', '', '주택', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "highChartDiv2Wrap"){
					chartModal($houseHoldDash.sixtyFiveOverData, 'itm1', 'itm_nm', 'dt', '', '주택', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "highChartDiv3Wrap"){
					chartModal($houseHoldDash.childrenData, 'itm1', 'itm_nm', 'dt', '', '주택', '가구'); //20201202 박은식 파라미터 추가
				}
				else if(selId == "highChartDiv4Wrap"){
					chartModal($houseHoldDash.mergeData, 'itm2', 'males,females', 'dt', "t2", '', '주택', '가구');	// 2020.11.04 [주형식] 차트 유형 변수 추가 //20201202 박은식 파라미터 추가
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn']", function(evnt){

				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','08','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				
				if(selId == "highChartDiv1Wrap"){
					getMataDataUrl("PH0209");
				}
				else if(selId == "highChartDiv2Wrap"){
					getMataDataUrl("PH0202");
				}
				else if(selId == "highChartDiv3Wrap"){
					getMataDataUrl("PH0214");
				}
				else if(selId == "highChartDiv4Wrap"){
					getMataDataUrl("PH0196");
				}
			});
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);
				if(selId == "highChartDiv1Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv1Wrap", "1인 가구 거처 종류");
				}
				else if(selId == "highChartDiv2Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv2Wrap", "65세 이상 가구의 수");
				}
				else if(selId == "highChartDiv3Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv3Wrap", "가구별 자녀의 수");
				}
				else if(selId == "highChartDiv4Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv4Wrap", "주택");
				}
			});
			
			// 2020-10-22 공통 이벤트 (메타정보, 다른차트, 이미지 저장, 맵 저장) 이벤트 추가 END
		},
		
		/**
		 * @name		 : allChange 
		 * @description  : 가구총조사 지도에서 각 지역경계 클릭시 모든 차트데이터 변경작업
		 * @date		 : 2020.08.17
		 * @author		 : juKwak
		 * @history 	 :
		 * @parameter	 : admCd : 지역코드, mode : 1(지도포함 전체 변경), 2(지도제외 차트변경)
		 */
		allChange : function(admCd, mode){
			$houseHoldDash.event.allClear();

			var year = $totSurvMain.ui.selectedYear;
			var regionCd = admCd;
			$totSurvMap.ui.selectedItmCd = "T20"
				odr_col_list = "ITM_RCGN_SN";
				odr_type = "ASC";		
				
	/*		
			var params = {
					surv_year_list: year							// 수록시점
						, org_id_list: "101"							// 조직번호
							, tbl_id_list: "DT_1PL1501"						// 통계표 ID
							, list_var_ord_list: "" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
							, prt_type: ""								    // 출력방식 total:합계
							, char_itm_id_list: "T20"						// 표특성항목
							, adm_cd: ""								// 지역코드
							, adm_unit: ""								// 지역단위
							, ov_l1_list: regionCd								// 항목 1
							, ov_l2_list: "000"								// 항목 2							// 항목 2
							, ov_l3_list: ""								// 항목 3
							, ov_l4_list: ""								// 항목 4
							, ov_l5_list: ""								// 항목 5
							, category: ""									// 카테고리 sido, sgg
							, orderby: ""
				}*/
			/*--------------------------------[ 1인가구 ]-----------------------*/
				
			var params1 = {
					surv_year_list: year				// 수록시점
					, org_id_list: "101"							// 조직번호
						, tbl_id_list: "DT_1PL1501"						// 통계표 ID
						, list_var_ord_list: "" 						// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
						, prt_type: "part"								    // 출력방식 total:합계
						, char_itm_id_list: "T21,T22,T22,T23,T24,T25,T30"						// 표특성항목
						, adm_cd: "00"								// 지역코드
						, adm_unit: "part"								// 지역단위
						, ov_l1_list: regionCd								// 항목 1
						, ov_l2_list: "0"								// 항목 2							// 항목 2
						, ov_l3_list: ""								// 항목 3
						, ov_l4_list: ""								// 항목 4
						, ov_l5_list: ""								// 항목 5
						, category: ""									// 카테고리 sido, sgg
						, orderby: "ASC"
					}
					console.log(params1);
				$.ajax({
		    		type:"GET",
		    		//url: "/view/kosisApi/TotsurvStatData.do",
					url: sgis4thApiPath,
			 		data: params1,
		    		success:function( result ){
		    			
		    			if(result.length>0){
							result = result.filter((r)=>Number(r.DTVAL_CO)!=0);
		    				drawHighChart1_houseHold(result.sort((a,b)=>a.CHAR_ITM_ID < b.CHAR_ITM_ID ? -1:a.CHAR_ITM_ID > b.CHAR_ITM_ID ? 1: 0));
							//setOnePeopleChart(onePeople, "one_people", "N", "138"); //2020.09.22[신예리] 1인 가구 거처 종류 height값 수정
						} else {
							var html = "";
							html += "<div class='DataNone' id='onePeopleNone' style='text-align: center;'>";
							html += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 25px;'>";
							html += "	<p style='margin-top: 15px;'>해당년도 통계정보가 없습니다.</p>"; //2020.10.14[신예리] 맞춤법 수정
							html += "</div>";
							$("#one_people").html(html);
						}
		    			
		    			if( result ){
							// 2021-08-26 [이영호] 합계 컬럼 제거 START 
							
		    			}
		    		},
		    		error:function(data) {
		    			alert('1인가구 인것 같은 api 오류발생~!');
		    		}
		    	});
			
			/*--------------------------------[ 65세 이상  ]-----------------------*/

				
				var params65 = {
						surv_year_list: "2020",
					    org_id_list: "101",
					    tbl_id_list: "DT_1JC1723",
					    list_var_ord_list: "",
					    odr_type: "",
					    prt_type: "",
					    char_itm_id_list: "T10,T20,T30",
					    adm_unit: "",
					    adm_cd: "00",
					    ov_l1_list: regionCd,
					    ov_l2_list: "",
					    ov_l3_list: "",
					    ov_l4_list: "",
					    ov_l5_list: "",
					    category: "",
					    orderby: ""
				}
				$.ajax({
		    		type:"GET",
		    		//url: "/view/kosisApi/TotsurvStatData.do",
					url: sgis4thApiPath,
			 		data: params65,
		    		success:function( result ){
		    			// 65세 이상 가구의 수 sixtyFiveOver
						if(result.length>0){
							result = result.filter((r)=>Number(r.DTVAL_CO)!=0);
							drawHighChart2_houseHold(result);
							//setHouseBarChart(sixtyFiveOver, "age65over", "N", "135", "1"); //2020.09.22[신예리] 65세 이상 가구의 수 height값 수정
						} else {
							var html = "";
							html += "<div class='DataNone' id='onePeopleNone' style='text-align: center;'>";
							html += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 25px;'>";
							html += "	<p style='margin-top: 15px;'>2017년부터 제공하는 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정 //2020-12-10 [곽제욱] 안내문구 수정
							html += "</div>";
							$("#age65over").html(html);
						}
						
						
						
		    		},
		    		error:function(data) {
		    			alert('65인가구 인것 같은 api 오류발생~!');
		    		}
		    	});
			
			
			/*--------------------------------[ 자녀수  ]-----------------------*/
				
				var params3 = {
						surv_year_list: year,
					    org_id_list: "101",
					    tbl_id_list: "DT_1BC1601",
					    list_var_ord_list: "",
					    odr_type: "",
					    prt_type: "",
					    char_itm_id_list: "T20,T21,T22,T23,T24",
					    adm_unit: "",
					    adm_cd: "00",
					    ov_l1_list: regionCd,
					    ov_l2_list: "",
					    ov_l3_list: "",
					    ov_l4_list: "",
					    ov_l5_list: "",
					    category: "",
					    orderby: ""
				}
				
				$.ajax({
		    		type:"GET",
		    		//url: "/view/kosisApi/TotsurvStatData.do",
					url: sgis4thApiPath,
			 		data: params3,
		    		success:function( result ){
		    			// 가구별 자녀의 수 children
						if(result.length>0){
							result = result.filter((r)=>Number(r.DTVAL_CO)!=0);
							drawHighChart3_houseHold(result);
							//setHouseBarChart(children, "children", "N", "135", "2"); //2020.09.22[신예리] 가구별 자녀의 수 height값 수정
						} else {
							var html = "";
							html += "<div class='DataNone' id='onePeopleNone' style='text-align: center;'>";
							html += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 25px;'>";
							html += "	<p style='margin-top: 15px;'>2016년부터 제공하는 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정 //2020-12-10 [곽제욱] 안내문구 수정
							html += "</div>";
							$("#children").html(html);
						}
		    		},
		    		error:function(data) {
		    			alert('자녀수 api 오류발생~!');
		    		}
		    	});
			
			/*--------------------------------[ 주택 ]-----------------------*/


				var params4 = {
						surv_year_list: year,
					    org_id_list: "101",
					    tbl_id_list: "DT_1JC1514",
					    list_var_ord_list: "",
					    odr_type: "",
					    prt_type: "",
					    char_itm_id_list: "T21,T22,T23,T24,T25,T31,T32,T33,T34,T35",
					    adm_unit: "",
					    adm_cd: "00",
					    ov_l1_list: regionCd,
					    ov_l2_list: "0",
					    ov_l3_list: "015,020,025,030,035,040,045,050,055,060,065,070,075,080,085,086",
					    ov_l4_list: "",
					    ov_l5_list: "",
					    category: "",
					    orderby: ""
				}
				
				
				
				$.ajax({
		    		type:"GET",
		    		//url: "/view/kosisApi/TotsurvStatData.do",
					url: sgis4thApiPath,
			 		data: params4,
		    		success:function( result ){
		    			// 주택
						if(result.length>0){
							result = result.filter((r)=>Number(r.DTVAL_CO)!=0);
							drawHighChart4_houseHold(result);
							//setHouseBarChart(children, "children", "N", "135", "2"); //2020.09.22[신예리] 가구별 자녀의 수 height값 수정
						} else {
							var html = "";
							html += "<div class='DataNone' id='onePeopleNone' style='text-align: center;'>";
							html += "	<img src='/images/totSurv/ChartNone.png' alt='선택하신 지역에 대한 차트 정보가 없습니다.' style='margin-top: 25px;'>";
							html += "	<p style='margin-top: 15px;'>2016년부터 제공하는 통계정보입니다.</p>"; //2020.10.14[신예리] 맞춤법 수정 //2020-12-10 [곽제욱] 안내문구 수정
							html += "</div>";
							$("#houseHoldTimeChart").html(html);
						}
		    		},
		    		error:function(data) {
		    			alert('주택 인것 같은 api 오류발생~!');
		    		}
		    	});
				
				/*------------------------------차트 api 호출 끝 ---------------------*/
			//$totSurvMap.ui.selectedItmCd = "T200"; //20201120 박은식 데이터 조회 시 초기화
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/totSurv/houseHold/getTotHouseHold.json",
				//url: sgis4thApiPath,
				data: { year: year, region_cd : regionCd}, // 
				dataType: "json",
				success: function(res) {
					console.log(res)
					
					if (res.errCd == "0") {
						// 전국데이터
						var totalData = res.result.totalData;
						// 총가구 증감데이터
						var totalRatioData = res.result.totalRatioData;
						// 1인 가구의 수(T10) 총계
						var onePeopleInfo = res.result.onePeopleInfo;
						// 1인 가구의 수(T20)  // 1인 가구 거처 종류 ('T21','T22','T23','T24','T25','T30')
						var onePeople = res.result.onePeople;
						// 65세 이상 가구의 수
						var sixtyFiveOver = res.result.sixtyFiveOver;
						// 가구별 자녀의 수 children
						var children = res.result.children;
						// 성별, 연력별 가구의 주택   sexAgeHouse
						var sexAgeHouse = res.result.sexAgeHouse;
						
						$houseHoldDash.onePeopleData = "";
						$houseHoldDash.sixtyFiveOverData = "";
						$houseHoldDash.childrenData = "";
						$houseHoldDash.mergeData = "";
						
						var totHouse = totalData[0].dt;
						var totHouseRank = "";
						var totHouseRt = "";
						var totalRatio = totalRatioData[0].dt;
						if(totalRatio!= "" && totalRatio != null && totalRatio != undefined){
							totalRatio = numberFormat(totalRatio);
						} else {
							totalRatio = "-";
						}
						var totalRatioRt = totalRatioData[0].irdsrate;
						
						// 데이터가 없을 경우 0
						var onePeple2 = '';
						var onePepleRate2 = '';
						if(onePeopleInfo.length != undefined){
							onePeple2 = onePeopleInfo[0].dt;
							onePepleRate2 = onePeopleInfo[0].irdsrate;
						}
						
						totHouse     = totalData[0].dt;
						totHouseRank = totalData[0].rank;
						totHouseRt   = totalData[0].irdsrate;
						
						var upDownCheck = "";

						if(totHouseRt!="" && totHouseRt != undefined){
							// 2021-08-04 [이영호] 가구 현황 소수점 2자리로 수정
							totHouseRt = parseFloat(totHouseRt).toFixed(2);
							if(parseFloat(totHouseRt) > 0){
								upDownCheck = "<span class='stats_up bold'>" +totHouseRt+" % </span><span class='stats_up'>▲</span>";
							} else if(parseFloat(totHouseRt) < 0){
								totHouseRt = totHouseRt.replace("-", ""); // 2020-10-06 [곽제욱] 감소율에서 - 표시 제거 
								upDownCheck = "<span class='stats_down bold'>" +totHouseRt+" % </span><span class='stats_down'>▼</span>";
							} else {
								upDownCheck = "<span class='stats_normal bold'>" +totHouseRt+" % </span>"; // 2020-10-13 [곽제욱] 0일경우 - 표현 삭제
								
							}
							if($totSurvMain.ui.selectedYear != "2015") {
								$("#houseChangeRt").html("전년도 대비 "+ upDownCheck);
							} else {
								$("#houseChangeRt").html("증감율 데이터 없음");
							}
						} else if($totSurvMain.ui.selectedLevel != "3"){
							$("#houseChangeRt").html("<span class='stats_normal'>증감율 데이터 없음</span>"); // 2020-10-13 [곽제욱] 데이터 없을경우- 처리
						} 
						
						if(totalRatioRt!="" && totalRatioRt != undefined){
							// 2021-08-04 [이영호] 가구 증감 소수점 2자리로 수정
							totalRatioRt = parseFloat(totalRatioRt).toFixed(2);
							if(parseFloat(totalRatioRt) > 0){
								upDownCheck = "<span class='stats_up bold'>" +totalRatioRt+" % </span><span class='stats_up'>▲</span>";
							} else if(parseFloat(totalRatioRt) < 0){
								totalRatioRt = totalRatioRt.replace("-", ""); // 2020-10-06 [곽제욱] 감소율에서 - 표시 제거 
								upDownCheck = "<span class='stats_down bold'>" +totalRatioRt+" % </span><span class='stats_down'>▼</span>";
							} else {
								upDownCheck = "<span class='stats_normal bold'>" +totalRatioRt+" % </span>"; // 2020-10-13 [곽제욱] 0일경우 - 표현 삭제
							}
							if($totSurvMain.ui.selectedYear != "2015") {
								$("#houseRatioChangeRt").html("전년도 대비 "+ upDownCheck);
							} else {
								$("#houseRatioChangeRt").html("증감율 데이터 없음");
							}
						} else if($totSurvMain.ui.selectedLevel != "3"){
							$("#houseRatioChangeRt").html("<span class='stats_normal'>증감율 데이터 없음</span>"); // 2020-10-13 [곽제욱] 데이터 없을경우- 처리
						}
						
						if(onePepleRate2!="" && onePepleRate2 != undefined){
							// 2021-08-04 [이영호] 1인 가구 수 소수점 2자리로 수정
							onePepleRate2 = parseFloat(onePepleRate2).toFixed(2);
							if(parseFloat(onePepleRate2) > 0){
								upDownCheck = "<span class='stats_up bold'>" +onePepleRate2+" % </span><span class='stats_up'>▲</span>";
							} else if(parseFloat(onePepleRate2) < 0){
								onePepleRate2 = onePepleRate2.replace("-", "");  
								upDownCheck = "<span class='stats_down bold'>" +onePepleRate2+" % </span><span class='stats_down'>▼</span>";
							} else {
								upDownCheck = "<span class='stats_normal bold'>" +onePepleRate2+" % </span>"; // 2020-10-13 [곽제욱] 0일경우 - 표현 삭제

							}
							if($totSurvMain.ui.selectedYear != "2015") {
								$("#oneHouseChangeRt").html("전년도 대비 "+ upDownCheck);
							} else {
								$("#oneHouseChangeRt").html("증감율 데이터 없음");
							}
						} else if($totSurvMain.ui.selectedLevel != "3"){
							$("#oneHouseChangeRt").html("<span class='stats_normal'>증감율 데이터 없음</span>"); // 2020-10-13 [곽제욱] 데이터 없을경우- 처리
						}
						
						// 각 값, 비율 세팅
						if($totSurvMain.ui.selectedLevel=="0"){  // 최초 (전국)
							var noneHtml = "";
							noneHtml += "<div class='DataNone' id='infoNone' style='text-align: center;'>";
							noneHtml += "	<img src='/images/totSurv/locationclick.png' alt='지역을 선택하세요' style='margin-top: 12px; width: 35px;'>";
							noneHtml += "	<p>지역을 선택하시면 정보가 표출됩니다.</p>";
							noneHtml += "</div>";
							$("#infoArea1").css("display", "inline-block");
							$("#infoArea1").html(noneHtml);
							
							$("#infoArea2").css("display", "none");
							//$("#houseHoldRanking").html("전국");
							$("#houseHoldRatioRanking").html("전국 가구수 증감")
							$("#oneHouseRanking").html("전국 1인가구 수")
							$("#totHouseHold").html('<h1>'+numberFormat(totHouse)+'</h1><span class="ml5">가구</span>');
							$("#houseRank").html(totHouseRank);
							//
							$("#houseTotalRatioRt").html(totalRatio);
							//$("#houseRatioChangeRt").html(totalRatioRt+ "%");
							// 1인 가구의 수
							$("#onePeple").html(numberFormat(onePeple2)); //20200914 박은식 numberFormat 처리
							$(".Rangecontainer").css("display", "none");
						}
						else if($totSurvMain.ui.selectedLevel=="1" || $totSurvMain.ui.selectedLevel=="2"){
							$("#infoArea2").css("display", "inline-block");
							$("#infoArea1").css("display", "none");
							$("#totHouseHold").html('<h1>'+numberFormat(totHouse)+'</h1><span class="ml5">가구</span>');
							$("#houseRank").html(totHouseRank);
							$("#houseTotalRatioRt").html(totalRatio);

							// 1인 가구의 수
							$("#onePeple").html(numberFormat(onePeple2)); //20200914 박은식 numberFormat 처리
							$(".Rangecontainer").css("display", "inline-block");
						} else if($totSurvMain.ui.selectedLevel=="3"){
							$(".Rangecontainer").css("display", "none");
						}
						
						
						//$houseHoldDash.ui.drawContent("PH0001", "T200", "");
						$totSurvMap.ui.selectedSurvId = "PH0001";
						$totSurvMap.ui.selectedItmCd  = "T200";
						
						
						// 1인 가구 거처 종류 ('T21','T22','T23','T24','T25','T30')
						// onePeople
						var onePeopleChart = onePeople.splice(0,1);
						
						
						
						
						// 성별, 연력별 가구의 주택   sexAgeHouse
//						var data = testData();
//						console.log("testData = " + JSON.stringify(data));
//						houseAreaChart(data, "houseHoldTimeChart", "N", 160);
						
						// 성별, 연력별 가구의 주택   sexAgeHouse
						//var data = mergeData(sexAgeHouse);
						var data = sexAgeHouse;
//						console.log("mergeData = " + JSON.stringify(data));
						$houseHoldDash.mergeData = sexAgeHouse;
						//houseAreaChart(sexAgeHouse, "houseHoldTimeChart", "N", 160);
						
						if(onePeople.length > 0){
							$houseHoldDash.onePeopleData = onePeople;
						}
						
						if(sixtyFiveOver.length > 0){
							$houseHoldDash.sixtyFiveOverData = sixtyFiveOver;
						}
						
						if(children.length > 0){
							$houseHoldDash.childrenData = children;
						}
						
						if(data.length > 0){
							$houseHoldDash.mergeData = data;
						}
						
						$totSurvMain.ui.selectedArea = regionCd;
						
						if (typeof pCallback === "function"){
							//총인구 세계지도인 경우 pass
							if(regindCd != ''){							
								pCallback(res.result.sidoList);// [{sido_cd, sido_nm, x_coor, y_coor} ... ]
							}
						}
					}
				},
				error: function(e) {
					alert('allchange: rank failed');
				}
			});
			
			//구버전
			if(mode == "1"){
				$houseHoldDash.ui.drawContent($totSurvMap.ui.selectedSurvId, $totSurvMap.ui.selectedItmCd, "");
			} else {
				if($totSurvMap.ui.map != null){
					$totSurvMap.ui.map.update();
				}
			}
			setTimeout(function() {
				$totSurvMain.ui.loading(false);
			}, 500);
	/*		
			//하이차트 버전 
			if(mode == "1") {				
				$houseHoldDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
				if($totSurvMain.ui.selectedArea != "00") {
					$houseHoldDash.ui.drawMapData("sgg", "color"); // 맵 그리기
				} else {
					$houseHoldDash.ui.drawMapData("sido", "color"); // 맵 그리기
				}
				//지도 색상 반영
				
				$totSurvMain.ui.originTilePerColor = $totSurvMain.ui.tilePerColor;
			} else {
				if($houseHoldDash.selectedItmId == "") {
					var houseHoldData = $houseHoldDash.currentData[$totSurvMap.ui.selectedChrItmId];
					for(var i=0; i<houseHoldData.length; i++) {
						if($totSurvMain.ui.selectedArea == houseHoldData[i]["OV_L" + $houseHoldDash.ui.dispOptions[$houseHoldDash.selectedChartSno][0].regionVarOrd + "_ID"]) {
							$(".dataAreatit h1").html(numberFormat(houseHoldData[i].DTVAL_CO));
							break;
						}
					}
				}
				if($totSurvMap.ui.map != null){
					$totSurvMap.ui.map.update();
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
											    	if( $totSurvMain.ui.selectedThema === '인구' ){
											    		srvLogWrite('P0','02','03','01',$totSurvMain.ui.selectedThema,params);								    	
											    	} else if( $totSurvMain.ui.selectedThema === '가구' ){
											    		srvLogWrite('P0','04','03','01',$totSurvMain.ui.selectedThema,params);
											    	} else if( $totSurvMain.ui.selectedThema === '주택' ){
											    		srvLogWrite('P0','05','03','01',$totSurvMain.ui.selectedThema,params);
											    	} else if( $totSurvMain.ui.selectedThema === '농업' ){
											    		srvLogWrite('P0','06','04','01',$totSurvMain.ui.selectedThema,params);
											    	} else if( $totSurvMain.ui.selectedThema === '임업' ){
											    		srvLogWrite('P0','07','04','01',$totSurvMain.ui.selectedThema,params);
											    	} else if( $totSurvMain.ui.selectedThema === '어업' ){
											    		srvLogWrite('P0','08','04','01',$totSurvMain.ui.selectedThema+'|'+$fisheryDash.fisheryTypeNm,params);
											    	}
											    	
											    	// 2020-10-26 [곽제욱] 어가 해수면/내수면 분기처리 START
											    	if($totSurvMain.ui.selectedThema == "어업"){
											    		if($totSurvMain.ui.selectedYear == "2015"){
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
								    				// 2020-10-26 [곽제욱] 어가 해수면/내수면 분기처리 END
											    	// 시도에서 rect 각 인구 클릭시  지도에서 해당지역 경계 재검색
											    	if(region_cd.length == 2){
											    		$totSurvMain.ui.selectedLevel = "1";
											    		$totSurvMain.ui.getSidoSggPos(region_cd);
											    		$totSurvMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
											    		$totSurvMap.ui.selectedC1 = "";
											    		$totSurvMap.ui.selectedC2 = "";
											    		if($totSurvMain.ui.selectedThema == "인구"){
												    		$totSurvMap.ui.selectedItmCd = "T100";
												    		$totSurvMap.ui.selectedSurvId = "PH0001";
												    		$populationDash.event.allChange(region_cd, "1");
												    		$populationDash.ui.getRankSet("", "",region_cd);
											    		}
											    		else if($totSurvMain.ui.selectedThema == "가구"){
											    			$totSurvMap.ui.selectedItmCd = "T200";
												    		$totSurvMap.ui.selectedSurvId = "PH0001";
												    		$houseHoldDash.event.allChange(region_cd, "1");
												    		$houseHoldDash.ui.getRankSet("", "",region_cd); // 2020-10-19 [곽제욱] 가구 랭크 추가
											    		}
											    		else if($totSurvMain.ui.selectedThema == "주택"){
											    			$totSurvMap.ui.selectedItmCd = "T310";
												    		$totSurvMap.ui.selectedSurvId = "PH0001";
												    		$houseDash.event.allChange(region_cd, "1");
												    		$houseDash.ui.getRankSet("", "",region_cd);//20201020 박은식 주택 대시보드에서 타일차트 클릭 시 슬라이드 셋팅
											    		}
											    		else if($totSurvMain.ui.selectedThema == "농업"){
											    			$totSurvMap.ui.selectedC1 = "000";
											    			//$totSurvMap.ui.selectedItmCd = "T01";
											    			$totSurvMap.ui.selectedItmCd = "T00";    // 2020.11.10 주형식 가구수로 변경
												    		if($totSurvMain.ui.selectedYear == "2015"){
											    				$totSurvMap.ui.selectedSurvId = "FS0013";								    				
											    			} else if($totSurvMain.ui.selectedYear == "2010"){
											    				$totSurvMap.ui.selectedSurvId = "FS0315";
											    			}
												    		$farmDash.event.allChange(region_cd, "1");
												    		$farmDash.ui.getRankSet("", "",region_cd);//20201020 박은식 주택 대시보드에서 타일차트 클릭 시 슬라이드 셋팅
											    		}
											    		// 2020-10-13 임업대쉬보드 추가 START jhs
											    		else if($totSurvMain.ui.selectedThema == "임업"){
											    			$totSurvMap.ui.selectedC1 = "000";
											    			$totSurvMap.ui.selectedItmCd = "T00"; // 2020-11-17 [곽제욱] 임업 itm_cd 수정 T01->T00
												    		if($totSurvMain.ui.selectedYear == "2015"){
											    				$totSurvMap.ui.selectedSurvId = "FS0235";								    				
											    			} else if($totSurvMain.ui.selectedYear == "2010"){
											    				$totSurvMap.ui.selectedSurvId = "FS0532";
											    			}
												    		$forestryDash.event.allChange(region_cd, "1");
												    		$forestryDash.ui.getRankSet("", "",region_cd); //20201022 박은식 임업 rank 셋팅 추가
											    		}
											    		// 2020-10-13 임업대쉬보드 추가 END jhs
											    		else if($totSurvMain.ui.selectedThema == "어업"){
											    			$totSurvMap.ui.selectedC1 = "000";
											    			$totSurvMap.ui.selectedItmCd = "T00"; //20201110 박은식 어업 itm_cd 변경
			//								    			/** 2020-10-26 [곽제욱] 해수면/내수면 분기로 인한 주석처리 START */
											    			/** if($totSurvMain.ui.selectedYear == "2015"){
										    					$totSurvMap.ui.selectedSurvId = "FS0112";
											    			} else if($totSurvMain.ui.selectedYear == "2010"){
										    					$totSurvMap.ui.selectedSurvId = "FS0413";
											    			} */
											    			/** 2020-10-26 [곽제욱] 해수면/내수면 분기로 인한 주석처리 START */
												    		$fisheryDash.event.allChange(region_cd, "1");
												    		$fisheryDash.ui.getRankSet("", "",region_cd); //20201026 박은식 어업 rank 셋팅 추가
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
											    			if($totSurvMain.ui.selectedThema == "인구"){
											    				//$totSurvMain.ui.selectedLevel = "3";  // 2020-10-12 [곽제욱] 주석처리후 selectedLevel 변경은 mapApi 에서 처리
											    				//$totSurvMapApi.request.openApiSearchPopulation(region_cd); // 2020-10-15 [곽제욱] 공간정보서비스과 요청으로 읍면동 조회 주석처리 
											    				// 개방형 지도 호출 후 처리하도록 수정 (2020-010-06) totSurvMapApi로 소스이동
											    				/** 2020-10-15 [곽제욱] 개방형지도 데이터조회 주석처리후 차트변경, 이후 개방형지도 open시 해당부분 삭제처리 필요 START */
																// 인구 읍면동 경계 조회 함수  
																/*2020-10-06 totSurvMain 로직 분기 */
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
											    				$populationDash.event.allChange($totSurvMain.ui.selectedArea, "2"); // 맵이동 없음
											    				/** 2020-10-15 [곽제욱] 개방형지도 데이터조회 주석처리후 차트변경, 이후 개방형지도 open시 해당부분 삭제처리 필요 END */
											    			}
											    			else if($totSurvMain.ui.selectedThema == "가구"){
											    				/** 2020-10-20 [곽제욱] 가구쪽 개방형지도 클릭시 이벤트 수정 START */
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
											    				$houseHoldDash.event.allChange($totSurvMain.ui.selectedArea, "2"); // 맵이동 없음
											    				/** 2020-10-20 [곽제욱] 가구쪽 개방형지도 클릭시 이벤트 수정 END */
											    			}
											    			else if($totSurvMain.ui.selectedThema == "주택"){
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
											    			else if($totSurvMain.ui.selectedThema == "어업"){
											    				
											    				//20201026 박은식 타일차트 클릭 시 로직 수정 START
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
																$fisheryDash.event.allChange($totSurvMain.ui.selectedArea, "2"); // 맵이동 없음
											    				//20201026 박은식 타일차트 클릭 시 로직 수정 END
											    			}
											    			else if($totSurvMain.ui.selectedThema == "농업"){
											    				// 2020-10-29 [곽제욱] 농업 타일차트 클릭 로직 수정 START
			//								    				$totSurvMain.ui.tileChangeYn = "N";
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
											    				// 2020-10-29 [곽제욱] 농업 타일차트 클릭 로직 수정 END
											    				// TODO::
											    				$farmDash.event.allChange(region_cd, "2"); // 맵이동 없음
											    			}
											    			// 2020-10-13 임업 대쉬보드 추가 START jhs
											    			else if($totSurvMain.ui.selectedThema == "임업"){
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
																$forestryDash.event.allChange($totSurvMain.ui.selectedArea, "2"); // 맵이동 없음
											    				//20201019 박은식 타일차트 클릭 시 로직 수정 END
											    			}
											    			// 2020-10-13 임업 대쉬보드 추가 END jhs
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
											    			if($totSurvMain.ui.selectedThema == "인구"){
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				$populationDash.event.allChange(region_cd, "1");
											    			}
											    			else if($totSurvMain.ui.selectedThema == "가구"){
			//								    				alert(">>>>>> 가구.... 비자치구..........");
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				// TODO::
											    				$houseHoldDash.event.allChange(region_cd, "1");
											    			}
											    			else if($totSurvMain.ui.selectedThema == "주택"){
			//								    				alert(">>>>>> 주택.... 비자치구..........");
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				// TODO::
											    				$houseDash.event.allChange(region_cd, "1");
											    			}
											    			else if($totSurvMain.ui.selectedThema == "어업"){
			//								    				alert(">>>>>> 어업.... 비자치구..........");
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				// TODO::
											    				$fisheryDash.event.allChange(region_cd, "1");
											    			}
											    			else if($totSurvMain.ui.selectedThema == "농업"){
			//								    				alert(">>>>>> 어업.... 비자치구..........");
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				// TODO::
											    				$farmDash.event.allChange(region_cd, "1");
											    			}
											    			// 2020-10-13 임업 대쉬보드 추가 START jhs
											    			else if($totSurvMain.ui.selectedThema == "임업"){
			//								    				alert(">>>>>> 어업.... 비자치구..........");
											    				$totSurvMap.ui.mapRegion = "sgg";
											    				// TODO::
											    				$forestryDash.event.allChange(region_cd, "1");
											    			}
											    			// 2020-10-13 임업 대쉬보드 추가 END jhs
											    			$totSurvMain.ui.tilePerColor.length = 0; // 2020-11-11 [곽제욱] 범례색상 배열 초기화
											    		}
											    		//$totSurvMain.ui.selectedLevel = '3'; // 2020-10-15 [곽제욱] 개방형지도 기능 막기로 으로 인한 주석처리, 추후 개방형지도 기능 open시 주석 제거 필요
											    		//$totSurvMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea); // 2020-10-06 [곽제욱] 타일차트 클릭시 하이라이트 설정 제거
											    		if($totSurvMain.ui.selectedThema == "인구"){
											    			$populationDash.ui.getRankSet("", "",region_cd)								    			
											    		}
											    		//20201019 박은식 주택 추가 START
											    		else if($totSurvMain.ui.selectedThema == "주택"){
											    			$houseDash.ui.getRankSet("", "",region_cd)								    			
											    		}
											    		else if($totSurvMain.ui.selectedThema == "가구"){
											    			$houseHoldDash.ui.getRankSet("", "",region_cd)								    			
											    		}
											    		else if($totSurvMain.ui.selectedThema == "농업"){
											    			$farmDash.ui.getRankSet("", "",region_cd)								    			
											    		}
											    		//20201019 박은식 주택 추가 END
								    					//20201022 박은식 임업, 어업 분기 추기 START
											    		else if($totSurvMain.ui.selectedThema == "임업"){
											    			$forestryDash.ui.getRankSet("", "",region_cd)
											    		}
											    		else if($totSurvMain.ui.selectedThema == "어업"){
											    			$fisheryDash.ui.getRankSet("", "",region_cd)
											    		}
														//20201022 박은식 임업, 어업 분기 추기 END
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
											        
											        var unit = "가구";
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
					                        if(boxWidth < 15) {
					                        	return "";
					                        }
					                        var lineLength = boxWidth / 15;
					                        var heightLength = boxHeight / 15;
					                        var nameParts = this.point.name.split("");
					                        var name = [];
					                        var line = "";
					                        for(var i=0; i<nameParts.length; i++) {
					                        	line = line.concat(nameParts[i]).concat("");
					                            if(line.length > lineLength) {
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
			
			// 개방형지도란 버튼 비활성화
			$(".mapInfo").hide();
			
			
			$("areaPopulation").html();
			$("#one_people").empty(); // 1인 가구 거처 종류 차트 초기화
			$("#age65over").empty(); // 65세 이상 가구의 수 차트 초기화
			$("#children").empty(); // 가구별 자녀의 수 차트 초기화
			$("#houseHoldTimeChart").empty(); // 성별, 연력별 가구의 주택 차트 초기화
			/* 총인구 영역(순위, 증감율, 슬라이드) 초기화 */
			
		}
	};
	
	
	
	
	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};
	
	
}(window, document));



/*-------------------하이차트 함수 선언 구간 -------------------------*/

/**
 * @name         : drawHighChart1_houseHold 
 * @description  : 1번째 차트
 * @date         : 2021.08.19
 * @author	     : 이영호
 * @history 	 : 
 */

function drawHighChart1_houseHold(data){
	data.forEach(d=>{d.CHAR_ITM_NM = d.CHAR_ITM_NM.replace('주택_','').replace('_계','')});
	var margin = ({top: 0, right: 150, bottom: 5, left: 140}) //2020.10.28[신예리] 이미지 저장 범례 잘리는 문제로 left 값 수정
	/*var colors = ["#E08214", "#FDB863", "#FEE0B6", "#D8DAEB", "#B2ABD2","#8073AC","#B8C9D8"];*/ //2020.09.23[신예리] 차트 컬러 변경 //2020.12.10[신예리] 차트 컬러 주석
	var colors = ["#D55905", "#DF7800", "#F6992D", "#FDB863", "#FFD095","#FFE6C4","#FFEFD6"]; //2020.09.22[신예리] 차트 컬러 변경 //2020.12.10[신예리] 차트 컬러 변경
	
	
	$("#highChartDiv1Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	
	let chartTitle = "1인 가구 거처 종류";

	$("#highChartDiv1Wrap .colTit").html(chartTitle);
	
	let maxVal = 0, itmLv, totSurvWon = 0;
	var chartData = [];
	var xhouse = [];
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({y:parseInt(dtval), color: colors[i],name:data[i].CHAR_ITM_NM});		
		
		xhouse.push(data[i].CHAR_ITM_NM);
		if(maxVal < parseInt(dtval)) {
			maxVal = parseInt(dtval);
		}
		totSurvWon += parseInt(dtval);
	}
	
	var highChartDiv1 = $('#one_people').highcharts({
		 chart: {
			 type: 'bar',
			 height: "141px",
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
			series:{
				cursor: 'pointer',
				borderWidth: 0,
				stacking: 'normal',
				point: {
					events: {
						click: function() {
							$houseHoldDash.ui.chartItmClick($(this), data[this.index], "#576574", $totSurvMain.ui.selectedYear+"년 "+this.name,'',3);
							this.select();
							if(!this.selected) $houseHoldDash.deselectAllHighcharts();
						},
						select: function() {
						},
						mouseOver: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							if(data[0].CHAR_ITM_ID == "T50") {
								currDataKey = "T30";
							}
					        //tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
					        if(totSurvWon != 0 && totSurvWon !=""){
					        	ratio = (parseInt(data[this.x].DTVAL_CO) / totSurvWon * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					       ///var unit = $houseHoldDash.ui.dispOptions[1][0].kosisUnitNm;
						},
						mouseOut: function() {
							//tool.css("display", "none");
						}
					}
				}
			}

	    },
		
		xAxis: {
	        categories: xhouse,
			lineColor: "transparent",
			tickLength: 0,
			offset: -12
	    },
	    tooltip: {	
			enabled:false,
	    },
	    yAxis: {
	        title: {
				text: null
			},
			labels: {
	         	enabled: false
	         },
			stackLabels: {
                enabled: true,
                padding: 3,
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
	    
	    credits: {
	        enabled: false
	    },
	    series: [{
			data: chartData,
			pointWidth: 10.62,
			borderRadius:5,
			borderWidth: 0,
			cursor: 'pointer',
			stacking: 'normal',
			states: {
				select: {
					color: "#576574"
				}
			}
		}]
		  
	});
	
	let xaxisLabels = $("#highChartDiv1Wrap g.highcharts-axis-labels.highcharts-xaxis-labels text");
}


function drawHighChart2_houseHold(data){
	
	var colors = ["#1E7DD5", "#49A2EF", "#77BDF9"]; //2020.09.22[신예리] 차트 컬러 변경 //2020.12.10[신예리] 차트 컬러 변경
	
	$("#highChartDiv2Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	let chartTitle = "65세 이상 가구의 수";
	$("#highChartDiv2Wrap .colTit").html(chartTitle);
	
	let maxVal = 0, itmLv, totSurvWon = 0;
	var chartData = [];
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({name: data[i].CHAR_ITM_NM , y:parseInt(dtval), color: colors[i]});		
		
		if(maxVal < parseInt(dtval)) {
			maxVal = parseInt(dtval);
		}
		totSurvWon += parseInt(dtval);
	}
	
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	var highChartDiv2 = $('#age65over').highcharts({
		chart: {
	        type: 'column',
	        height: "133px",
	    },
	    title: {
			text: "",
			style: { "display": "none" }
		},
		credits: {
            enabled: false
        },    
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    xAxis: {
	        type: 'category',
			tickColor:'#878787',
				lineColor:'#878787'
	    },
	    yAxis: {
	    	max : maxVal + (maxVal*.1),
	        title: {
				text: null
			},
			tickAmount:5,
			gridLineWidth : 0,
			labels: {
                formatter: function () {
                    let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
					v = v<1000000?(v<1000?v:(v/1000)+"K"):Math.round(v/1000000)+"M";
                    return v;
                }            
            }          
			
	    },
	    legend: {
	        enabled: false
	    },
	    tooltip: {	
			enabled:false,
	    },
	    plotOptions: {
	    	series:{
	    		states:{
					select:{
						color:'rgb(87, 101, 116)'
					}
				},
				cursor: 'pointer',
				borderWidth: 0,
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
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 "+data[this.x].CHAR_ITM_NM+"</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){

							$houseHoldDash.ui.chartItmClick($(this), data[this.index], "#576574", $totSurvMain.ui.selectedYear+"년 "+this.name,'',3);
							this.select();
						},
						select: function() {
							
						}
					}
				}
	            
			}
	        
	    },
	   
	    series: [{
			data: chartData
		
			//borderRadius: 5
		}]
	});

}

function drawHighChart3_houseHold(data){
	
	var colors = ["#fc2862", "#FD5D79", "#FE7D87", "#FEAAA8","#FED8D3"] ; //2020.09.22[신예리] 차트 컬러 변경 //2020.12.10[신예리] 차트 컬러 변경
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	
	$("#highChartDiv3Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	let chartTitle = "가구별 자녀의 수";
	$("#highChartDiv3Wrap .colTit").html(chartTitle);
	
	let maxVal = 0, itmLv, totSurvWon = 0;
	var chartData = [];
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({name: data[i].CHAR_ITM_NM , y:parseInt(dtval), color: colors[i]});		
		
		if(maxVal < parseInt(dtval)) {
			maxVal = parseInt(dtval);
		}
		totSurvWon += parseInt(dtval);
	}
	
	var highChartDiv3 = $('#children').highcharts({
		chart: {
	        type: 'column',
	        height: "135px",
	    },
	    title: {
			text: "",
			style: { "display": "none" }
		},
		credits: {
            enabled: false
        },    
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    xAxis: {
	        type: 'category',
			lineColor:'#878787',
	    },
	    yAxis:{
	    	max : maxVal + (maxVal*.2),
	    	tickAmount:6,
			gridLineWidth : 0,
			title: { 
				enabled: false
			},
			labels: {
                formatter: function () {
                    let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
                    v = v<1000000?(v<1000?v:(v/1000)+"K"):Math.round(v/1000000)+"M";
                    return v;
                }
                
            }          
	    }	    ,
	    legend: {
	        enabled: false
	    },
	    tooltip: {	
			enabled:false,
	    },
	    plotOptions: {
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
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 "+data[this.x].CHAR_ITM_NM+"</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){
							$houseHoldDash.ui.chartItmClick($(this), data[this.index], "#576574", $totSurvMain.ui.selectedYear+"년 "+this.name,'',3);
							this.select();
						},
						select: function() {
							
						}
					}
				}
	        }
	        
	        
	    },
	    series: [{
			data: chartData,
			//borderRadius: 5
		}]
	});

}
function drawHighChart4_houseHold(data){
	$("#highChartDiv4Wrap").data("charitmid", "주택"); //하드코딩											
	
	
		
	let chartTitle = "주택";
	$("#highChartDiv4Wrap .colTit").html(chartTitle);
	
	var colors=["#06776C", "#009E73", "#0DC86A", "#7ADC26", "#C3D924", "#FFDF0C", "#F9CD52", "#F8DC6C", "#FFEB9A", "#FFF3C1"];
	var tool = $(".chartCommontoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	tool.css({display:'none',"position":"absolute","fontFamily":"NanumSquare",zIndex:'5000',backgroundColor:"rgb(255, 255, 255)",
	border:'1px solid #cecece',borderRadius:"5px",padding:'10px',textAlign:'center',whiteSpace: 'nowrap'});
	
    var chartData = [];
	var xCategory =[];
	
	//단독주택세미만
	var T21=[], T22=[], T23=[], T24=[], T25=[], T31=[], T32=[], T33=[], T34=[], T35=[];

	for(var i=0; i<data.length; i++) {
		xCategory.push(data[i].OV_L3_KOR);
		if (data[i].CHAR_ITM_ID=="T21"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T21.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[0],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T22"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T22.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval),color:colors[1],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T23"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T23.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval),  color:colors[2],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T24"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T24.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[3],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T25"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T25.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[4],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T31"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T31.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[5],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T32"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T32.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[6],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T33"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T33.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[7],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T34"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T34.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[8],data:data[i] });
		}
		if (data[i].CHAR_ITM_ID=="T35"){
			let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
			T35.push({name:data[i].CHAR_ITM_NM, y:parseInt(dtval), color:colors[9],data:data[i] });
		}

		
	}	
	//중복제거
	const set = new Set(xCategory);
	const uniqueXcategory = [...set];
	
	var highChartDiv4 = $('#houseHoldTimeChart').highcharts({
		chart: {
	        type: 'column',
	        height: "170px",
			width: 1400
	    },
	    colors:colors,
	    title: {
			text: "",
			style: { "display": "none" }
		},
		credits: {
            enabled: false
        },    
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    xAxis: {
	    	categories: uniqueXcategory,
				tickWidth: 1,
	        	tickLength: 5,
				tickColor:'#000',
				lineColor:'#000',
	    },
	    yAxis:{
	    	tickAmount:4,
				tickWidth: 1,
	        	tickLength: 5,
				tickColor:'#000',
				lineColor:'#000',
			gridLineWidth : 0,
				lineWidth: 1,
			title: { 
				enabled: false
			},
			labels: {
                formatter: function () {
                    let v = Math.round(Number(this.axis.defaultLabelFormatter.call(this).replace(/ /gi, "")));
                    v = v<1000000?(v<1000?v:(v/1000)+"K"):Math.round(v/1000000)+"M";
                    return v;
                }
                
            } 
	    	/*min:0,
		    gridLineWidth : 0,
		    //max: totSurvWon,
			labels : {
				format: '{value:,.0f}',
			},
			opposite : false,
			title: { 
				enabled: false
			}*/
			 
		} ,
	    legend: {
	        enabled: false
	    },
	    tooltip: {
	    	enabled:false,
	    },
	    plotOptions: {
	    	column: {
	            dataLabels: {
	                enabled: false
	            }
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
							tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 "+this.series.data[0].name+" "+data[this.x].OV_L3_KOR+"</p>" + "<p style='color:"+((this.y > 0) ? "#0982d8" : "#ec2828")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ numberFormat(this.y) + "</p>가구");//20201202 박은식 증가 감소에 따른 색상 변경
							$(document).on("mousemove", function(evt) {
								if(window.innerWidth - evt.clientX < tool.width()) tool.css("left", window.innerWidth - 250); 
								else tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
						        tool.css("top", evt.clientY-75);						        
							});
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");                        
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						click:function(){

							$houseHoldDash.ui.chartItmClick($(this), this.series.data[this.index].data, "#576574", $totSurvMain.ui.selectedYear+"년 "+this.series.data[this.index].name.replace('주택_','')+" "+this.series.data[this.index].category,'',3);
							this.select();
						},
						select: function() {
							
						}
					}
				}
	        }
	    },
	    
	    series: [
	    	{data: T35,pointWidth: 75},
	    	{data: T34,pointWidth: 75},
	    	{data: T33,pointWidth: 75},
	    	{data: T32,pointWidth: 75},
	    	{data: T31,pointWidth: 75},
	    	{data: T25,pointWidth: 75},
	    	{data: T24,pointWidth: 75},
	    	{data: T23,pointWidth: 75},
	    	{data: T22,pointWidth: 75},
	    	{data: T21,pointWidth: 75}
	    ]
	});

}

//deselectall highcharts
$houseHoldDash.deselectAllHighcharts =  function deselectAllHighcharts(){
	$houseHoldDash.highcharts.forEach(function(chart){
		if(!chart||!chart.series) return;
		chart.series.forEach(function(s){
			s.data.forEach(function(point){
		        point.select(false);
		      });
		});
	});
}



/*-------------------하이차트 함수 선언 구간 ----끝 ! ---------------------*/


/**
 * @name         : setHouseBarChart 
 * @description  : 가구별 자녀의 수 차트
 * @date         : 2020.08.06
 * @author	     : juKwak
 * @history 	 : 
 */
function setHouseBarChart(data, target, resizeYn, height, gubun){
	// 마진값 세팅
	var margin = ({top: 20, right: 0, bottom: 20, left: 70})
	// 칼라 세팅
	if(gubun == "1"){
		var color = ["#1B7ED5", "#49A2EF", "#77BDF9","#98CFFF","#CBE7FF","#B8C9D8","#CCDBE9","#E7EEF5","#EBEBEB"] //2020.10.23[신예리] 65세 이상 가구의 수 색
		$houseHoldDash.sixtyFiveOverData = data;
	} else if(gubun == "2"){
		var color = ["#fc2862", "#FD5D79", "#FE7D87", "#FEAAA8","#FED8D3"] //2020.10.21[신예리] 가구별 자녀의 수 차트 컬러 변경
		$houseHoldDash.childrenData = data;
	}
	var max = d3.max(data, function(d) { return Number(d.dt) });
	var backGroundData = [
		//{"itm_nm" : "0~4세", "dt" : max}, {"c1_nm" : "5~9세", "dt" : max}
		{"dt" : max}, {"dt" : max}
	];
	
	var tool = $(".chartCommontoolTip");
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	$houseHoldDash.ageDistributionData = data;
	
	// X축 세팅(domain : 눈금범위, range : 길이범위)
	var x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    
    // Y축 세팅(domain : 눈금범위, range : 길이범위)
	var y = d3.scaleLinear()
	    .domain([0, d3.max(data, function(d) { return Number(d.dt) })]).nice()
	    .range([height - margin.bottom, margin.top]);
	
	// X 축 정보
	var xAxis = function(g) { return g
	    .attr("transform", "translate("+0+","+(height-margin.bottom)+")")
	    .call(d3.axisBottom(x).tickFormat(function(i) { return data[i].itm_nm} ).tickSizeOuter(0))
	};

	// Y 축 정보
	var yAxis = function(g) { return g
	    .attr("transform", "translate("+margin.left+"," + 0 + ")")
	    .call(d3.axisLeft(y).ticks(4, "s"))
	    .call(function(g) { return g.select(".domain").remove() })
	    .call(function(g) { return g.append("text") 
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
	    .attr("width", width);
    
    if(resizeYn == "Y"){
    	// 실제 차트 start
        svg.append("g")
    	.selectAll("rect")
    	.data(data)
    	.join("rect")
    	.attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
    	.attr("y", function(d) { return y(0) }) // 시작점 Y좌표
    	.attr("width",  23)
    	.attr("x", function(d, i) { return x(i)+(x.bandwidth()/2)-11.5 })
    	.attr("fill", function(d,i) {return color[i]})
    	.style("cursor", "pointer")
    	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
        .on("mouseover", function(d){
        	$houseHoldDash.ui.chartMouseOver($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
        	$houseHoldDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm,"가구", numberFormat(d.dt), "가구", tool, -20, -100);//20201120 박은식 number format 변경
    	})
    	.on("mouseout", function(){
    		$houseHoldDash.ui.chartMouseOut($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
    		tool.css("display", "none");
    	})
    	.on("click", function(d){
    		if($totSurvMain.ui.selectedLevel != "3"){
         		$totSurvMain.ui.chartTarget = target
        		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
        		$totSurvMain.ui.chartData = d;
        		$totSurvMain.ui.chartColor = "#576574";
        		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.itm_nm;
     		}
    		$houseHoldDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.itm_nm); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
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
    	.attr("y", function(d) { return y(0) }) // 시작점 Y좌표
    	.attr("width",  23)
    	.attr("x", function(d, i) { return x(i)+(x.bandwidth()/2)-11.5 })
    	.attr("fill", function(d,i) {return color[i]})
    	.style("cursor", "pointer")
    	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
        .on("mouseover", function(d){
        	$houseHoldDash.ui.chartMouseOver($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
        	$houseHoldDash.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm,"가구", numberFormat(d.dt), "가구", tool, -20, -100); //20201120 박은식 number format 변경
    	})
    	.on("mouseout", function(){
    		$houseHoldDash.ui.chartMouseOut($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
    		tool.css("display", "none");
    	})
    	.on("click", function(d){
    		if($totSurvMain.ui.selectedLevel != "3"){
         		$totSurvMain.ui.chartTarget = target
        		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
        		$totSurvMain.ui.chartData = d;
        		$totSurvMain.ui.chartColor = "#576574";
        		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.itm_nm;
     		}
    		$houseHoldDash.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.itm_nm); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
    	})
    	//.attr("height", 0)
    	.transition()
    	.duration(1000)
    	.delay(function (d, i) {
    	return i * 150;
    	})
    	.attr("height",  function(d) { return y(0) - y(Number(d.dt)) })
    	.attr("y", function(d) { return y(Number(d.dt)) })
    	
    }
    
    svg.append("g").attr("style", "color:#878A89; font-size:12px;") // 2020.10.28[신예리] 폰트 사이즈 변경
		.selectAll("text")
 	.data(data)
 	.join("text")
 	.style("cursor", "pointer")
 	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
 	.on("click", function(d, i){
 		if($totSurvMain.ui.selectedLevel != "3"){
     		$totSurvMain.ui.chartTarget = target
    		$totSurvMain.ui.chartIndex = d.itm_cd;//20201126 박은식  data 변경
    		$totSurvMain.ui.chartData = d;
    		$totSurvMain.ui.chartColor = "#576574";
    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.itm_nm;
 		}
 		$populationDash.ui.chartMouseOver($("#"+target).find("rect.eventGroup").eq(i), "#576574");
		$houseHoldDash.ui.chartItmClick($("#"+target).find("rect.eventGroup").eq(i), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.itm_nm);
 	})
 	.attr("text-anchor", "middle")
	.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
 	.attr("y", function(d) { return y(Number(d.dt))-10 })
 	.text( function(d){ return numberFormat(d.dt) })//20201120 박은식 number format 변경
	
	
	svg.append("g")
	.attr("style", "color:#878A89; font-size:12px;") //2020.10.28[신예리] 폰트 사이즈 추가
	.call(xAxis);
	
	svg.append("g")
	.attr("style", "color:#878A89; font-size:12px;") //2020.10.28[신예리] 폰트 사이즈 추가
	.call(yAxis);
	
	$("#"+target+"").find("line").remove();
	// 실제 차트 end
    
}

/**
 * @name         : setOnePeopleChart 
 * @description  : 1인 가구 거처 종류
 * @date         : 
 * @author	     : 
 * @history 	 : 
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이, surv_id - 조사id
 */
function setOnePeopleChart(data, target, resize, height){
	data.forEach(d=>{d.CHAR_ITM_NM = d.CHAR_ITM_NM.replace('주택_','').replace('_계','')});
	var margin = ({top: 0, right: 150, bottom: 5, left: 140}) //2020.10.28[신예리] 이미지 저장 범례 잘리는 문제로 left 값 수정
	/*var colors = ["#E08214", "#FDB863", "#FEE0B6", "#D8DAEB", "#B2ABD2","#8073AC","#B8C9D8"];*/ //2020.09.23[신예리] 차트 컬러 변경 //2020.12.10[신예리] 차트 컬러 주석
	var colors = ["#D55905", "#DF7800", "#F6992D", "#FDB863", "#FFD095","#FFE6C4","#FFEFD6"]; //2020.09.22[신예리] 차트 컬러 변경 //2020.12.10[신예리] 차트 컬러 변경
	
	
	$("#highChartDiv1Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	
	let chartTitle = "1인 가구 거처 종류";

	$("#highChartDiv1Wrap .colTit").html(chartTitle);
	
	let maxVal = 0, itmLv, totSurvWon = 0;
	var chartData = [];
	var xhouse = [];
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({y:parseInt(dtval), color: colors[i],name:data[i].CHAR_ITM_NM});		
		
		xhouse.push(data[i].CHAR_ITM_NM);
		if(maxVal < parseInt(dtval)) {
			maxVal = parseInt(dtval);
		}
		totSurvWon += parseInt(dtval);
	}
	
	var highChartDiv1 = $('#one_people').highcharts({
		 chart: {
			 type: 'bar',
			 height: "141px",
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
			series:{
				cursor: 'pointer',
				borderWidth: 0,
				stacking: 'normal',
				point: {
					events: {
						click: function() {
							$houseHoldDash.ui.chartItmClick($(this), data[this.index], "#576574", $totSurvMain.ui.selectedYear+"년 "+this.name,'',3);
							this.select();
							if(!this.selected) $houseHoldDash.deselectAllHighcharts();
						},
						select: function() {
						},
						mouseOver: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							if(data[0].CHAR_ITM_ID == "T50") {
								currDataKey = "T30";
							}
					        //tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
					        if(totSurvWon != 0 && totSurvWon !=""){
					        	ratio = (parseInt(data[this.x].DTVAL_CO) / totSurvWon * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					       ///var unit = $houseHoldDash.ui.dispOptions[1][0].kosisUnitNm;
						},
						mouseOut: function() {
							//tool.css("display", "none");
						}
					}
				}
			}

	    },
		
		xAxis: {
	        categories: xhouse,
			lineColor: "transparent",
			tickLength: 0,
			offset: -12
	    },
	    tooltip: {	
			enabled:false,
	    },
	    yAxis: {
	        title: {
				text: null
			},
			labels: {
	         	enabled: false
	         },
			stackLabels: {
                enabled: true,
                padding: 3,
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
	    
	    credits: {
	        enabled: false
	    },
	    series: [{
			data: chartData,
			pointWidth: 10.62,
			borderRadius:5,
			borderWidth: 0,
			cursor: 'pointer',
			stacking: 'normal',
			states: {
				select: {
					color: "#576574"
				}
			}
		}]
		  
	});
	
	let xaxisLabels = $("#highChartDiv1Wrap g.highcharts-axis-labels.highcharts-xaxis-labels text");
}



//20201124 박은식 불필요한 소스 제거 START
//function houseAreaChart1(data, target, resizeYn, height){
//	
//	   $("#"+target+"").empty();
//	   var width = $("#"+target+"").outerWidth();
//	   
//	   var margin = ({top: 20, right: 30, bottom: 30, left: 40}) 
//	   
//	   var tool = $(".chartCommontoolTip");
//	   
//	   $houseHoldDash.mergeData = data;
//	   
////	   console.log("=======   series 전 ==============")
//	   var series = d3.stack().keys(data.columns.slice(1))(data);
////	   console.log(series)
////	   console.log(data);
//	   var x = d3.scaleTime()
//       .domain(d3.extent(data, function(d){
//    	   return d.seq }))
//       .range([margin.left, width - margin.right])
//	   
//	   var x1 = d3.scaleBand()
//              .domain(data.map(function(d){ return d.seq }))
//              .rangeRound([margin.left, width - margin.right])
//	   
//	   
//	   /*var x1 = d3.scaleTime()
//       .domain(d3.extent(data, function(d){
//    	   return d.seq }))*/
//       .range([margin.left, width - margin.right])
//	   
//	   var y = d3.scaleLinear()
//	           .domain([0, d3.max(series, function(d){ return d3.max(d, function(d){ return Number(d[1]) }) })]).nice()
//	           .range([height - margin.bottom, margin.top])
//	           
//	   var color = ["#598202", "#6E9B03", "#86B505", "#ADD239", "#CCE860","#E5F797","#F3FBCA","#FFF6CC","#FFEA99","#FFDC66","#FFCD3F","#FFB600","#DB9600","#B77800"]; //2020.10.21[신예리] 차트 컬러 변경
//	   /*var color = d3.scaleOrdinal()
//	              .domain(data.columns.slice(1))
//	              .range(d3.schemeCategory10)*/ //2020.09.24[신예리] 차트 컬러 커스텀으로 변경위해 주석처리
//
//	   var xAxis = function(g){ return g.attr("transform", 'translate(0,'+(height - margin.bottom)+')')
//	                              .call(d3.axisBottom(x)
//	                                    .ticks(width / 80)
//	                                    .tickSizeOuter(0)) 
//	                       }
//	   //console.log(data)
//	  var xAxisT = function(g){ return g.data(data).attr("transform", 'translate(0,'+(height - margin.bottom)+')')
//		   // 타이틀 변경
//           .call(d3.axisBottom(x1).tickFormat(function(d,i) {return data[i].xTitle} ).tickSizeOuter(0))
//      }
//
//	   var yAxis = function(g){ return g.attr("transform", 'translate('+margin.left+',0)')
//	                              .call(d3.axisLeft(y).ticks(4, "s"))
//	                              .call(function(g){ return g.select(".domain").remove() })
//	                              .call(function(g){ return g.select(".tick:last-of-type text")
//	                                                   .clone()
//	                                                   .attr("x", 3)
//	                                                   .attr("text-anchor", "start")
//	                                                   .attr("font-weight", "bold")
//	                                                   .text(data.y) 
//	                                            })
//	                       }
//	   
//	   
//	   var area = d3.area()
//	             .x(function(d, i){
//	            	 return x(d.data.seq) })
//	             .y0(function(d){  return y(Number(d[0])) })
//	             .y1(function(d){  return y(Number(d[1])) })
//	   
//	             
//	   const chart = d3.select("#"+target);
//
//	   const svg = chart.append("svg")
//	   			  .attr("style", "color:#878A89;")
//	              .attr("viewBox", [0, 0, Number(width), Number(height)]);
//	   
//	   
//
//	   svg.append("g")
//	   	  .attr("style","font-size:12px;") //2020.10.28[신예리] 폰트 사이즈 수정
//	      .call(xAxisT);
//
//	   svg.append("g")
//	      .attr("style","font-size:12px;") //2020.10.28[신예리] 폰트 사이즈 수정
//	      .call(yAxis);
//	   
//	   svg.append("g")
//	      .selectAll("path")
//	      .data(series)
//	      .join("path")
//	      .attr("fill", function(d,i) { return color[i]}) //2020.09.24[신예리] 차트 컬러 커스텀으로 변경
//	      .style("cursor", "pointer")
//	      //.attr("data-id", "")
//	      .attr("d", area)
//	      .on("mouseover", function(d){
//	    	  var title = "";
//	    	  if(d.key == "T21"){
//	    		  title = "주택-단독주택";
//	    	  } else if(d.key == "T22") {
//	    		  title = "주택-아파트";
//	    	  } else if(d.key == "T23") {
//	    		  title = "주택-연립주택";
//	    	  } else if(d.key == "T24") {
//	    		  title = "주택-다세대주택";
//	    	  } else if(d.key == "T25") {
//	    		  title = "주택-비거주용건물 내 주택";
//	    	  } else if(d.key == "T31") {
//	    		  title = "주택외-오피스텔";
//	    	  } else if(d.key == "T32") {
//	    		  title = "주택외-호텔 · 여관등 숙박업소의 객실";
//	    	  } else if(d.key == "T33") {
//	    		  title = "주택외-기숙사 및 특수 사회시설";
//	    	  } else if(d.key == "T34") {
//	    		  title = "주택외-판잣집,비닐하우스";
//	    	  } else if(d.key == "T35") {
//	    		  title = "주택외-기타";
//	    	  }
//	    	  $houseHoldDash.ui.chartMouseOver($(this), "#576574"); //2020.10.21[신예리] 마우스 오버 시 차트 컬러 변경
//	    	  $(tool).css("display", "inline-block");
//	    	  $(tool).css("position", "absolute");
//	    	  $(tool).css("font-family", "NanumSquare")
//	    	  $(tool).css("z-index", "5000");
//	    	  $(tool).css("background-color", "rgb(255, 255, 255)")
//	    	  $(tool).css("border", "1px solid #cecece")
//	    	  $(tool).css("border-radius", "5px")
//	    	  $(tool).css("padding", "10px")
//	    	  $(tool).css("text-align", "center")
//	    	  var screenWidth = window.innerWidth;
//	    	  var testNum = (Number(d3.event.pageX) + 160)
//	    	  if(screenWidth <= (Number(d3.event.pageX) + 160)){
//	    		  $(tool).css("left", screenWidth -180 + "px")
//	    		  $(tool).css("top", d3.event.pageY -80 + "px")
//	    	  } else {
//	    		  $(tool).css("left", d3.event.pageX -140 + "px")
//	    		  $(tool).css("top", d3.event.pageY -80 + "px")
//	    	  }
//	    	  $(tool).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + $totSurvMain.ui.selectedYear+ "년 "+ title + "</p>");
//	      })
//	      .on("mouseout", function(d){
//	    	  tool.css("display", "none");
//	    	  $houseHoldDash.ui.chartMouseOut($(this), "#fff");
//	    	  
//	      })
//	      //.append("title")
//	      //.text(function(d){return d.key });
//}
//20201124 박은식 불필요한 소스 제거 END
function mergeData(sexAgeHouse){
	console.log(sexAgeHouse);
	var dataMod = [];
	var c2ItemList = ["015","020","025","030","035","040","045","050","055","060","065","070","075","080","085","086"];
	var tmpItm = {};
	
	for(var j=0; j < c2ItemList.length; j++){
		
		for(var i = 0; i < sexAgeHouse.length; i++){
			
			if(sexAgeHouse[i].c2 == c2ItemList[j]){
				tmpItm.seq = j;
				if(sexAgeHouse[i].itm_cd == "T10"){
					tmpItm.T10 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T20"){
					tmpItm.T20 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T21"){
					tmpItm.T21 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T22"){
					tmpItm.T22 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T24"){
					tmpItm.T24 = sexAgeHouse[i].dt;
				}
				//T25	주택_비거주용건물 내 주택
				else if(sexAgeHouse[i].itm_cd == "T25"){
					tmpItm.T25 = sexAgeHouse[i].dt;
				}// T30 주택의외 거처 - 계
				else if(sexAgeHouse[i].itm_cd == "T30"){
					tmpItm.T30 = sexAgeHouse[i].dt;
				} 
				else if(sexAgeHouse[i].itm_cd == "T31"){
					tmpItm.T31 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T32"){
					tmpItm.T32 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T33"){
					tmpItm.T33 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T34"){
					tmpItm.T34 = sexAgeHouse[i].dt;
				}
				else if(sexAgeHouse[i].itm_cd == "T35"){
					tmpItm.T35 = sexAgeHouse[i].dt;
				}
				tmpItm.xTitle = sexAgeHouse[i].c2_nm;
			}
		}
		dataMod[j] = tmpItm;
		tmpItm = {};
	}
	dataMod["columns"] = ["seq", "T10", "T20", "T21", "T22", "T24", "T25","T30", "T31"];
	
	
	if(dataMod[0].seq == undefined){
		dataMod.splice(0,1);
	}	
	
	return dataMod;
}

/**
 * @name         : timeEmptyHouseChart 
 * @description  : 주택종류별 빈집 차트
 * @date         : 
 * @author	     : 
 * @history 	 : 2020-10-14
 * @parameter	 : target - 대상 div, resizeTn - 반응형 여부, height - 높이
 */
function houseAreaChart(resultData, target, resizeYn, height){
	
	var data = [];
	
	var tool = $(".chartCommontoolTip"); //툴팁 생성
	
	var c2 = [];
	var itm_nm = []; 
	var itm_cd = []; 
	for(var i=0; i<16;i++){
		data.push({});
	}
	var columns = [];
	columns.push("columns")
	//data 스텍 구분 생성
	for(var i=0;i < resultData.length; i++){
		if(columns.indexOf(resultData[i].itm_cd) == -1){
			columns.push(resultData[i].itm_cd)
		}
		if(itm_cd.indexOf(resultData[i].itm_cd) == -1){
			itm_cd.push(resultData[i].itm_cd)
		}
		if(itm_nm.indexOf(resultData[i].itm_nm) == -1){
			itm_nm.push(resultData[i].itm_nm)
		}
		if(c2.indexOf(resultData[i].c2) == -1){
			c2.push(resultData[i].c2)
		}
	}
	
	//data set 생성
	for(var i=0;i < resultData.length; i++){

		var temp = {};
		switch(resultData[i].c2){
			case "015" :
				data[0][resultData[i].itm_cd] = resultData[i].dt;
				data[0]["category"] = resultData[i].c2_nm
				break;
			case "020" :
				data[1][resultData[i].itm_cd] = resultData[i].dt;
				data[1]["category"] = resultData[i].c2_nm
				break;
			case "025" :
				data[2][resultData[i].itm_cd] = resultData[i].dt;
				data[2]["category"] = resultData[i].c2_nm
				break;
			case "030" :
				data[3][resultData[i].itm_cd] = resultData[i].dt;
				data[3]["category"] = resultData[i].c2_nm
				break;
			case "035" :
				data[4][resultData[i].itm_cd] = resultData[i].dt;
				data[4]["category"] = resultData[i].c2_nm
				break;
			case "040" :
				data[5][resultData[i].itm_cd] = resultData[i].dt;
				data[5]["category"] = resultData[i].c2_nm
				break;
			case "045" :
				data[6][resultData[i].itm_cd] = resultData[i].dt;
				data[6]["category"] = resultData[i].c2_nm
				break;
			case "050" :
				data[7][resultData[i].itm_cd] = resultData[i].dt;
				data[7]["category"] = resultData[i].c2_nm
				break;
			case "055" :
				data[8][resultData[i].itm_cd] = resultData[i].dt;
				data[8]["category"] = resultData[i].c2_nm
				break;
			case "060" :
				data[9][resultData[i].itm_cd] = resultData[i].dt;
				data[9]["category"] = resultData[i].c2_nm
				break;
			case "065" :
				data[10][resultData[i].itm_cd] = resultData[i].dt;
				data[10]["category"] = resultData[i].c2_nm
				break;
			case "070" :
				data[11][resultData[i].itm_cd] = resultData[i].dt;
				data[11]["category"] = resultData[i].c2_nm
				break;
			case "075" :
				data[12][resultData[i].itm_cd] = resultData[i].dt;
				data[12]["category"] = resultData[i].c2_nm
				break;
			case "080" :
				data[13][resultData[i].itm_cd] = resultData[i].dt;
				data[13]["category"] = resultData[i].c2_nm
				break;
			case "085" :
				data[14][resultData[i].itm_cd] = resultData[i].dt;
				data[14]["category"] = resultData[i].c2_nm
				break;
			case "086" :
				data[15][resultData[i].itm_cd] = resultData[i].dt;
				data[15]["category"] = resultData[i].c2_nm
				break;
			default :
				break;
		}
	}
	
	this.c2Return = function(title){
		
		var  c2= "";
		
		switch(title){
			case "15세미만" :
				c2 = "015"
			case "15~19세" :
				c2 = "020";
				break;
			case "20~24세" :
				c2 = "025";
				break;
			case "25~29세" :
				c2 = "030";
				break;
			case "30~34세" :
				c2 = "035";
				break;
			case "35~39세" :
				c2 = "040";
				break;
			case "40~44세" :
				c2 = "045";
				break;
			case "45~49세" :
				c2 = "050";
				break;
			case "50~54세" :
				c2 = "055";
				break;
			case "55~59세" :
				c2 = "060";
				break;
			case "60~64세" :
				c2 = "065";
				break;
			case "65~69세" :
				c2 = "070";
				break;
			case "70~74세" :
				c2 = "075";
				break;
			case "75~79세" :
				c2 = "080";
				break;
			case "80~84세" :
				c2 = "085";
				break;
			case "85세 이상" :
				c2 = "086";
				break;
			default :
				break;
		}
		return c2;
	}
	
	this.itmCdReturn = function(title, col){
		var itm_cd = "";
		var color = "";
		switch(title){
			case "주택_단독주택":
				itm_cd = "T21";
				color = "#06776C"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택_아파트":
				itm_cd = "T22";
				color = "#009E73"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택_다세대주택":
				itm_cd = "T23";
				color = "#0DC86A"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택_연립주택":
				itm_cd = "T24";
				color = "#7ADC26"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택_비거주용건물 내 주택":
				itm_cd = "T25";
				color = "#C3D924"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택이외 거처_오피스텔":
				itm_cd = "T31";
				color = "#FFDF0C"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택이외 거처_호텔 · 여관등 숙박업소의 객실":
				itm_cd = "T32";
				color = "#F9CD52"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택이외 거처_기숙사 및 특수 사회시설":
				itm_cd = "T33";
				color = "#F8DC6C"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택이외 거처_판잣집,비닐하우스":
				itm_cd = "T34";
				color = "#FFEB9A"; //2020.11.23[신예리] 컬러 변경
				break;
			case "주택이외 거처_기타":
				itm_cd = "T35";
				color = "#FFF3C1"; //2020.11.23[신예리] 컬러 변경
				break;
			default :
				break;
		}
		if(col == undefined){
			return itm_cd;
		} else {
			return color;
		}
		
	}
	
	data["columns"] = columns;
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	const chart = d3.select("#"+target+"");
	 const svg = chart.append("svg")
					.attr("height", height)
			     	.attr("width", width)
	var series = d3.stack().keys(data.columns.slice(1))(data);
	var margin =  {top: 10, right: 35, bottom: 20, left: 35};
	  
	const gSvg = svg.append("g")
					.attr("transform", "translate("+margin.left+","+margin.top+")");
	
	const xScale = d3.scaleBand()
					.domain(data.map(function(d){return d.category;}))
					.range([0, width-margin.right-margin.left])
					.padding(0.1);
	const yScale = d3.scaleLinear()
					 .domain([0,  d3.max(series, function(d){return d3.max(d, function(d){ return d[1]})})*1.2  ])
					 .range([height-margin.top-margin.bottom,margin.bottom]);
  
	//const color = d3.scaleOrdinal(d3.schemeCategory10);
	const color = ['#06776C', '#009E73', '#0DC86A', '#7ADC26', '#C3D924', '#FFDF0C', '#F9CD52', '#F8DC6C','#FFEB9A','#FFF3C1']; //2020.11.02[신예리] color추가 //2020.11.23[신예리] 차트 컬러 변경
//	  .attr("itm_cd", function(d,i){return columns[i]})
	const rects = gSvg.selectAll("g").data(series).enter()
    				  .append("g")
    				  .attr("class", function(d, i){ return "eventGroup"+i})
    				  .attr("itm_cd", function(d,i){return itm_cd[i]})
    				  .attr("itm_nm", function(d,i){return itm_nm[i]})
    				  //.attr("fill", function(d){ return color(d.key) }); //Color is assigned here because you want everyone for the series to be the same color
	
	if(resizeYn == "Y"){
		rects.selectAll("rect")
		.data(function(d){ 
			//console.log(d);
			return d;
			})
		.join("rect")
		.style("cursor", "pointer") //2020.10.27[신예리] 마우스포인터 
		.attr("fill", function(d,i){
			return itmCdReturn($(this).parent().attr("itm_nm"), "1")
		})
		.attr("x", function(d, i){return xScale(d.data.category)})
		.attr("y", function(d){ return yScale(d[1]) })
		//.attr("item", function(d){return d.data.category}) //20201202 박은식 - 불필요하여 삭제
		.attr("width", xScale.bandwidth())
		.attr("item", function(){ return $(this).parent().attr("itm_cd") }) //20201202 박은식 - item 부모의 값 셋팅 
		.on("mouseover", function(d){
			var title = ($(this).parent().attr("itm_nm")).replace("주택", "");
			$houseHoldDash.ui.chartMouseOver($(this), "#576574");
			$houseHoldDash.ui.createChartTool($totSurvMain.ui.selectedYear, title + " " + $(this).attr("item"),"", numberFormat(d[1]-d[0]), "가구", tool, -20, -100); //20201124 박은식 누적데이터 표출 수정 //20201202 박은식 - 툴팁 내용 변경
		})
		.on("mouseout", function(d){
			$houseHoldDash.ui.chartMouseOut($(this), "#576574");
			tool.hide();
		})
		.on("click", function(d){
			var c2 = c2Return($(this).attr("item")); //20201203 박은식 c2값 셋팅
			var data = {
	 				surv_id : "PH0196",
	 				itm_cd : $(this).parent().attr("itm_cd"),
	 				c1 : "0",
	 				c2 : c2,
	 				idx : $(this).parent().index()
	 		}
			var title = ($(this).parent().attr("itm_nm")).replace("주택_", "") + " " + $(this).attr("item"); //20201202 박은식 - 툴팁 내용 변경 
			$totSurvMain.ui.chartTarget = target
			$totSurvMain.ui.chartIndex = $(this).attr("item"); //20201202 박은식 차트 유지 index값 변경
			$totSurvMain.ui.chartData = data;
			$totSurvMain.ui.chartColor = "#576574";
			$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+title; //20201202 박은식 - 툴팁 내용 변경
	    	$houseHoldDash.ui.chartItmClick($(this).parent().find("rect").eq(i), data, "#576574", $totSurvMain.ui.selectedYear+"년 "+title);
		})
		.attr("height",function(d){
			return (!isNaN(yScale(d[0]) - yScale(d[1]))) ?  yScale(d[0]) - yScale(d[1]) : 0})
	} else {
		rects.selectAll("rect")
		.data(function(d){ /*console.log(d);*/return d})
		.join("rect")
		.style("cursor", "pointer")
		.attr("fill", function(d,i){
			return itmCdReturn($(this).parent().attr("itm_nm"), "1")
		})
		.attr("x", function(d, i){return xScale(d.data.category)})
		.attr("y", function(d){ return yScale(d[1]) })
		.attr("item", function(d){return d.data.category}) //20201202 박은식 - title -> item 으로 변경
		.attr("width", xScale.bandwidth())
		.on("mouseover", function(d){
			var title = ($(this).parent().attr("itm_nm")).replace("주택", "");
			$houseHoldDash.ui.chartMouseOver($(this), "#576574");
			$houseHoldDash.ui.createChartTool($totSurvMain.ui.selectedYear, title + " " + $(this).attr("item"),"", numberFormat(d[1]-d[0]), "가구", tool, -20, -100); //20201124 박은식 누적데이터 표출 수정 //20201202 박은식 - 툴팁 내용 변경
		})
		.on("mouseout", function(d){
			$houseHoldDash.ui.chartMouseOut($(this), "#576574");
			tool.hide();
		})
		.on("click", function(d, i){
			var c2 = c2Return($(this).attr("item")); //20201202 박은식 - c2값 셋팅
			var data = {
	 				surv_id : "PH0196",
	 				itm_cd : $(this).parent().attr("itm_cd"),
	 				c1 : "0",
	 				c2 : c2,
	 				idx : $(this).parent().index()
	 		}
			var title = ($(this).parent().attr("itm_nm")).replace("주택_", "") + " " + $(this).attr("item"); //20201202 박은식 - 툴팁 내용변경
			$totSurvMain.ui.chartTarget = target;
			$totSurvMain.ui.chartIndex = $(this).attr("item"); //20201202 박은식 - 차트유지 index값 변경
			$totSurvMain.ui.chartData = data;
			$totSurvMain.ui.chartColor = "#576574";
			$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+title; //20201202 박은식 - 툴팁 내용 변경
	    	$houseHoldDash.ui.chartItmClick($(this).parent().find("rect").eq(i), data, "#576574", $totSurvMain.ui.selectedYear+"년 "+title);
		})
		.transition()
	      .duration(1000)
	      .delay(function (d, i) {
	          return i * 150;
	    })
		.attr("height",function(d){	return (!isNaN(yScale(d[0]) - yScale(d[1]))) ?  yScale(d[0]) - yScale(d[1]) : 0})
	}
	
	

		
  const xAxis = gSvg.append("g")
    .attr("id", "xAxis")
    .attr("style", "color:#878A89; font-size:12px;")
    .attr("transform", "translate(0,"+(height-margin.top-margin.bottom)+")")
    .call(d3.axisBottom(xScale));
  
  const yAxis = gSvg.append("g")
  	.attr("style", "color:#878A89; font-size:12px;")
    .attr("id", "yAxis")
    .call(d3.axisLeft(yScale).ticks(5, "s"));
	
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
}());*/
/*********** Kosis Detail Option for SearchList Sub End  **********/



/*********** Kosis Data List Start **********/
/*(function() {
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
}());*/
/*********** Kosis Data List Sub End **********/