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
(function(W, D) {
	W.$commonChart = W.$commonChart || {};
	
	//d3의 데이터를 담는 변수
	$commonChart.chartData = {};
	// 현재 차트 타입
	$commonChart.chartType = "";	// 항목 1 : 
	// 컬럼 항목
	$commonChart.columnVal = "";
	// 데이터 항목
	$commonChart.dataVal   = "";
	// 데이터 유형
	$commonChart.dataType = "";	// 항목 1 : itm1, 항목2 : itm2, 항목3 : itm 3
	// 데이터 유형(관리자 정의)	
	// 차트 유형 2021-08-26 [이영호] 차트별 관리자 정의
	$commonChart.chartType = "";	// 항목2일때 어떤차트인지 구분하기 위한 변수 (인구-총조사인구 t1, 가구-성별연령별 가구의 주택 t2, 주택종류별 빈집 t3, 농업-농축산물 판매금액별 t4, 농업-인구와농가인기의 연령대별 분포 t5 , 임업-판매 금액별 임가 t4)
	$commonChart.chartTitle = "";
	// 2020-12-02 [곽제욱] 차트 단위 처리를 위한 변수 추가 START
	// 차트별 소제목(인구, 가구, 주택, 농가, 임가, 어가)
	$commonChart.titleSubNm = "";
	// 차트변 단위
	$commonChart.chartUnit = "";
	// 2020-12-02 [곽제욱] 차트 단위 처리를 위한 변수 추가 END
	
	$commonChart.chartKind = [
		"horizontalBarChart",		//	막대 그래프(가로)
		"verticalBarChart",			//	막대 그래프(세로)
		"brokenLineChart",			//	꺾은선 그래프
		"radialChart",				//	방사형
		"pieChart",					//	파이차트
		"multiBrokenLineChart",		//	멀티 꺾은선 그래프
		"barBrokenLineChart",		//	꺾은선&막대 그래프
		"compareBarChart",			//	막대 그래프(좌우 비교)
		"areaChart",				//	면적챠트
		// 신규 차트
		"percentageHorizontalBarChart",	//	막대 그래프(백분율)
		"accmltVerticalBarChart",	//	막대 그래프(세로 누적)
		"accmltHorizontalBarChart",	//	막대 그래프(가로 누적)
		"groupVerticalBarChart",	//	막대 그래프(세로) 그룹
		"multiRadialChart",			//	방사형 멀티
		"bubbleChart",				//	버블 차트
		"histogramChart	"			//	히스토그램
	];
	
	//2020.10.21[신예리] 차트 컬러 변경
	//$commonChart.colors = ["#AE8ACE", "#978ACE", "#8A9ECE", "#8AB5CE", "#8ACDCE","#8ED9B6","#B3DDCC", "#DCECC9", "#ECEAC9", "#C2E5EE", "#ACCDE9", "#83B1D9", "#6F93C9", "#606FA8", "#535B7D", "#78809F", "#9AA1BC", "#BEC2D2", "#D8DBE6", "#EDEEF5"];
	$commonChart.colors = ["#4E79A7", "#9FCAE8", "#F28E2B", "#FFBE7D", "#F1CE63","#8BD17C","#B5982C", "#5BA151", "#499894", "#86BCB6", "#E15759", "#FF9D9A", "#79706E", "#BAB0AC", "#D37295", "#FABFD2", "#B07AA1", "#D4A6C8", "#9D7660", "#D7B5A6","#A462DE"]; //2020.11.10[신예리] 차트 컬러 추가
	
	$commonChart.noDataHtml = "<div class='DataNone' style='text-align: center;'><img src='/images/totSurv/ChartNone.png' alt='선택하신 차트 정보가 없습니다.' style='margin-top: 138px;'><p style='margin-top: 15px;'>선택하신 차트 정보가 없습니다.</p></div>";
	
	
	$commonChart.modalBg = "";
	$commonChart.modalZindex = 9998;
	$commonChart.modalCss = "{        position: 'fixed',        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',        zIndex: $commonChart.modalZindex + 1,        top: '50%',        left: '50%',        transform: 'translate(-50%, -50%)',        msTransform: 'translate(-50%, -50%)',        webkitTransform: 'translate(-50%, -50%)'    }";
	

	$(document).ready(function() {
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   $commonChart   ready        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		//$commonChart.ui.clear();
	    //$commonChart.ui.init();
	});
		
	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){});
	
	$(window).resize( function() {});

	$commonChart.const = {},
	
	$commonChart.ui = {
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
			$commonChart.event.setUIEvent();
			clearChartType();
			
			// 데이터 유형이  아이템2 일경우 누적차트 비활성화
			if($commonChart.dataType == "itm2" || $commonChart.dataType == "itm3"){
				$('.chartKind00').hide();
				$('.chartKind01').hide();
				$('.chartKind02').hide();
				$('.chartKind04').hide();
				$('.chartKind05').hide();
				/* 06 ~ 15 */
				
				$('.chartKind06').hide();
				$('.chartKind07').hide();
				$('.chartKind08').hide();
				$('.chartKind09').hide();
				$('.chartKind10').hide();
				$('.chartKind11').hide();
				$('.chartKind12').hide();
				$('.chartKind13').hide();
				$('.chartKind14').hide();
				$('.chartKind15').hide();
				
				
				// 항목2일때 어떤차트인지 구분하기 위한 변수 (인구-총조사인구 t1, 가구-성별연령별 가구의 주택 t2, 주택종류별 빈집 t3, 농업-농축산물 판매금액별 t4, 농업-인구와농가인기의 연령대별 분포 t5 , 임업 X)
				if($commonChart.chartType == "t1"){
					$('.chartKind10').show();   // 꺽은선,막대 그래프
					$('.chartKind10').addClass("on");
					barBrokenLineChart();
				}
				else if($commonChart.chartType == "t2"){
					// 신규 (산)
					$('.chartKind12').show();   // 면적차트
					$('.chartKind12').addClass("on");
					houseHoleAreaChart();
				}else if($commonChart.chartType == "t3"){
					// 세로 퍼센트 신규	
					// chartKind07  세로 누적
					$('.chartKind07').show();   // 면적차트
					$('.chartKind07').addClass("on");
					accmltVerticalBarChart();
				}
				// 농업-농축산물 판매금액별
				else if($commonChart.chartType == "t4"){
					$('.chartKind10').show();   // 꺽은선,막대 그래프
					$('.chartKind10').addClass("on");
					barBrokenLineChart();
				}
				//농업-인구와농가인기의 연령대별 분포
				else if($commonChart.chartType == "t5"){
					$('.chartKind12').show();   // 면적차트
					$('.chartKind12').addClass("on");
					areaChart();
				}
				// 인구 시계열 (날개)
				
				
			}
			else if($commonChart.dataType == "itm1"){
				
				// 첫번재 차트 유형
				$('.chartKind00').addClass("on");
				horizontalBarChart();
				
				$('.chartKind00').show();
				$('.chartKind01').show();
				$('.chartKind02').show();
				$('.chartKind04').show();
				$('.chartKind05').show();
				
				
				/* 06 ~ 15 */
				$('.chartKind06').hide();
				$('.chartKind07').hide();
				$('.chartKind08').hide();
				$('.chartKind09').hide();
				$('.chartKind10').hide();
				$('.chartKind11').hide();
				$('.chartKind12').hide();
				$('.chartKind13').hide();
				$('.chartKind14').hide();
				$('.chartKind15').hide();
			}
			
			
		},
		
		ready : function(){
			
		},
		
		/**
		 * @name         : clear
		 * @description  : 인구총조사 depth 변화시마다 화면 초기화(각 화면을 로딩)
		 * @date         : 2020.08.03
		 * @author	     : juKwak
		 * @history 	 : 
		 */
		clear : function(){
			// 차트 초기화
			$("#chartDiv").empty();
			clearChartType();
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
			$(target).css("z-index", "11000");
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
			$(target).html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + year+ "년 "+ title.replace('(명)', '').replace('_', ' ') + standard + "</p>" + "<p style='color:"+((title == "증감율") ? ((data > 0) ? "#ec2828" : "#0982d8") : "#0982d8")+"; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>"+ data + "</p>" + unit); //20201120 박은식 불필요한  replace 삭제 //20201202 박은식 증가 감소에 따른 색상 추가 
		}
		/** 2020-10-07 [곽제욱] 툴팁 수정 END */
	};
	
	

	$commonChart.util = {};
	
	$commonChart.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$commonChart.event.setUIEvent() called.");
			
			var body = $("body");
			
			body.on("click", "div[class*=chartKind]", function(event){
				var target = event.target.className;
				
				//2021-08-26 [이영호] 경제총조사 HighChart 부분 추가
				if($commonChart.dataType.indexOf("HighChart") != -1) {
					$commonChart.ui.clear();					
					if(target == "chartKind00" || target == "chartKind00 on"){
						verticalBarHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind01" || target == "chartKind01 on"){
						horizentalBarHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind02" || target == "chartKind02 on"){
						verticalLineHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind04" || target == "chartKind04 on"){
						polarLineHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind05" || target == "chartKind05 on"){
						pieHighChart($commonChart.chartData, $commonChart.chartType);
					}
				} else {					
					if(target == "chartCon" || target == "chartKindBar" || target == "" || target instanceof SVGAnimatedString){ //20201117 박은식 타겟 조건 변경
						return;
					}
					
					if(target.indexOf("chartKind") < -1){
						return;
					}
					
					
					// 이미지 저장 버튼 클릭 시 이벤트 발상 안하도록 추가
					if(target == "cmmChartSave"){
						return;
					}
						
					
					
					
					for(var i=0; i < 16; i++){
						if(i < 10){
							$('.chartKind0'+i).removeClass("on");
						}
						else if(i >= 10){
							$('.chartKind'+i).removeClass("on");
						}
					}
					
					// hshs
					console.log("target = " + target);
					$('#chartDiv').css("text-align","center");
					
					if(target == "chartKind00" || target == "chartKind00 on"){
						$('.chartKind00').addClass("on");
						horizontalBarChart();
					}
					else if(target == "chartKind01" || target == "chartKind01 on"){
						$('.chartKind01').addClass("on");
						verticalBarChart();
					}
					else if(target == "chartKind02" || target == "chartKind02 on"){
						$('.chartKind02').addClass("on");
						brokenLineChart();
					}
					else if(target == "chartKind03" || target == "chartKind03 on"){
						$('.chartKind03').addClass("on");
						histogramChart();
					}
					else if(target == "chartKind04" || target == "chartKind04 on"){
						$('.chartKind04').addClass("on");
						radialChart();
					}
					else if(target == "chartKind05" || target == "chartKind05 on"){
						$('.chartKind05').addClass("on");
						pieChart();
					}
					else if(target == "chartKind09" || target == "chartKind09 on"){
						$('.chartKind09').addClass("on");
						multiBrokenLineChart();
					}
					else if(target == "chartKind10" || target == "chartKind10 on"){
						$('.chartKind10').addClass("on");
						barBrokenLineChart();
					}
					else if(target == "chartKind11" || target == "chartKind11 on"){
						$('.chartKind11').addClass("on");
						compareBarChart();
					}
					else if(target == "chartKind12" || target == "chartKind12 on"){
						$('.chartKind12').addClass("on");
						areaChart();
					}
					else if(target == "chartKind06" || target == "chartKind06 on"){
						$('.chartKind06').addClass("on");
						percentageHorizontalBarChart();
					}
					else if(target == "chartKind07" || target == "chartKind07 on"){
						$('.chartKind07').addClass("on");
						accmltVerticalBarChart();
					}
					else if(target == "chartKind08" || target == "chartKind08 on"){
						$('.chartKind08').addClass("on");
						accmltHorizontalBarChart();
					}
					else if(target == "chartKind13" || target == "chartKind13 on"){
						$('.chartKind13').addClass("on");
						groupVerticalBarChart();
					}
					else if(target == "chartKind14" || target == "chartKind14 on"){
						$('.chartKind14').addClass("on");
						multiRadialChart();
					}
					else if(target == "chartKind15" || target == "chartKind15 on"){
						$('.chartKind15').addClass("on");
						bubbleChart();
					}
				}
			});
			
			
			// 2020.10.28 공통차트 이미지 저장 버튼 추가 START
			body.on("click", "#cmmChartSave", function(event){
				if($('.chartKind00').hasClass("on")){
					//$totSurvMain.ui.chartImageDown("#ageDiv", "연령분포"); //20201023 주형식 차트 명칭 추가
					//console.log("title = " + $('.chartKind00').prop("title"));
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind00').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				else if($('.chartKind01').hasClass("on")){
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind01').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				else if($('.chartKind02').hasClass("on")){
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind02').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				else if($('.chartKind04').hasClass("on")){
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind04').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				else if($('.chartKind05').hasClass("on")){
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind05').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				// 07, 10, 12
				else if($('.chartKind07').hasClass("on")){
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind07').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				else if($('.chartKind10').hasClass("on")){
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind10').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				else if($('.chartKind12').hasClass("on")){
					$totSurvMain.ui.chartImageDown('#chartDiv', $('.chartKind12').prop("title"));
					$('#commonTotSurv_popup_confirm').css('z-index','11000');
					// 백그라운드 없어져서 다시 검은색으로....
					$('#commonTotSurvDetail_popup_back').show();
				}
				
				//$('#commonTotSurv_popup_confirm').css('z-index','5000');
			});
			// 2020.10.28 공통차트 이미지 저장 버튼 추가 END
			
			
		}
	
	
		
	};

	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};
	
	
}(window, document));

/**
 * 차트 유형 선택 초기화
 * @returns
 */
function clearChartType(){
	for(var i=0; i < 16; i++){
		if(i < 10){
			$('.chartKind0'+i).removeClass("on");
		}
		else if(i >= 10){
			$('.chartKind'+i).removeClass("on");
		}
	}
}

/**
 * @name : highChartModal
 * @description : 다른 유형의 차트 보기
 * @date : 2021.08.25
 * @author : 이영호
 * @history :
 * @param  data      데이터
 */
function highChartModal(year, selector) { // 2021-08-25 [이영호] 공통차트 변수 추가
	$('.chartKind06').hide();		//막대 그래프(백분율)
	$('.chartKind07').hide();		//막대 그래프(세로 누적)
	$('.chartKind08').hide();		//막대 그래프(가로 누적)
	$('.chartKind09').hide();		//다중 꺽은선 그래프
	$('.chartKind10').hide();		//꺽은선, 막대 그래프
	$('.chartKind11').hide();		//막대 그래프(좌우 비교)
	$('.chartKind12').hide();		//면적차트
	$('.chartKind13').hide();		//그물 막대 그래프(세로)
	$('.chartKind14').hide();		//다중 방사형
	$('.chartKind15').hide();		//버블차트
		
	var chartMeta = {};
	var notUsedChartMeta = {};
	var isBigItem = false;
	let chart_ord = chartInfo[Object.keys(chartInfo)[0]][0].chart_ord, code = '';
	if($administStatsMain.ui.selectedArea == '') {
		code = "00";
	} else {
		code = $administStatsMain.ui.selectedArea;
	}
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
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor
    		}
    	} else {
    		notUsedChartMeta[(chartInfo[chart_ord][i].itm_id)] = {
    				kosis_unit : chartInfo[chart_ord][i].kosis_unit,
    				kosis_unit_nm : chartInfo[chart_ord][i].kosis_unit_nm,
    				disp_unit_nm : chartInfo[chart_ord][i].disp_unit_nm,
    				disp_unit : chartInfo[chart_ord][i].disp_unit,
    				var_ord : chartInfo[chart_ord][i].var_ord,
    				scr_kor : chartInfo[chart_ord][i].scr_kor
    		}
    	}
    }

	//HighChart의 데이터를 담는 변수
	$commonChart.chartData = series;
	// 현재 차트 타입
	//$commonChart.chartType = chartType;
	$commonChart.dataType = "HighChart";
	var zIndex = 9998;
    var modal = $('#chart_modal');
    
    $commonChart.modalBg = "";
    // 모달 div 뒤에 희끄무레한 레이어
    $commonChart.modalBg = $('<div>')
    .css({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // 레이어 색갈은 여기서 바꾸면 됨
        backgroundColor: 'rgba(0,0,0,0.4)'
    })
    .appendTo('body');
    
	modal
        .css({
            position: 'fixed',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

            // 시꺼먼 레이어 보다 한칸 위에 보이기
            zIndex: zIndex + 1,

            // div center 정렬
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)',
            webkitTransform: 'translate(-50%, -50%)'
        })
        .show()
        // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
        .find('.modal_close_btn')
        .on('click', function() {
        	$commonChart.modalBg.remove();
            //bg.remove();
            modal.hide();
            $('#commonTotSurvDetail_popup_back').hide();
        });

	if(selector == "panel1") {
		var series = []
		if(isBigItem){
			// 대분류만 사용
			var data = [];
			for(var j in chartMeta){
	        	for(var k = 0; k < chartData.length; k++){
	        		if(chartData[k].PRD_DE == year) {
	        			if($houseDash.polygonSelectArea != "") {
	        				if(chartData[k].CHAR_ITM_ID == j
	        						&& chartData[k].ADM_CD == $houseDash.polygonSelectArea){
	               			    data.push({
	               			        name : chartMeta[j].scr_kor,
	        		    	        y : parseFloat(chartData[k].DTVAL_CO),
	        		                id : j
	        		    	    });
	        	       	    }
	        			} else {
	        				if(chartData[k].ADM_CD == code && chartData[k].CHAR_ITM_ID == j){
	               			    data.push({
	               			        name : chartMeta[j].scr_kor,
	        		    	        y : parseFloat(chartData[k].DTVAL_CO),
	        		                id : j
	        		    	    });
	        	       	    }
	        			}        			
	        		}	       	    
	        	}
	        }
			var altrtv_disp_wrd ='';
			for(var j =0; j < chartInfo[chart_ord].length; j++){
	            altrtv_disp_wrd = chartInfo[chart_ord][0].chart_nm;
			}
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
		} else {
			// 대분류 중분류 모두 사용
			// 차트 데이터 가공
			for(var i =0; i < itm_id_list.length; i++){
				var data = [];
		        for(var j in chartMeta){
		        	for(var k = 0; k < chartData.length; k++){
		        		if(chartData[k].PRD_DE == year) {
		        			if($houseDash.polygonSelectArea != "") {
		        				if(j == chartData[k]['OV_L'+chartMeta[j].var_ord+'_ID'] 
					       	    	&& chartData[k].CHAR_ITM_ID == itm_id_list[i]
		        					&& chartData[k].ADM_CD == $houseDash.polygonSelectArea){
				       			    data.push({
				       			        name : chartMeta[j].scr_kor,
						    	        y : parseFloat(chartData[k].DTVAL_CO),
						    	        id : j				    	        
						    	    });
					       	    }
		        			} else {
		        				if(chartData[k].ADM_CD == code && j == chartData[k]['OV_L'+chartMeta[j].var_ord+'_ID'] 
					       	    	&& chartData[k].CHAR_ITM_ID == itm_id_list[i]){
				       			    data.push({
				       			        name : chartMeta[j].scr_kor,
						    	        y : parseFloat(chartData[k].DTVAL_CO),
						    	        id : j				    	        
						    	    });
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
			}
		}
		
		pieHighChart(series, chartMeta, year, code, chart_ord);
	} else {		
		verticalBarHighChart(chartMeta, year, code, chart_ord);
	}
}

/**
 * @name         : copyToClipboard 
 * @description  : 클립보드 데이터 넣기
 * @date         : 2020.10.21
 * @author	     : hsJu
 * @history 	 : 
 */
function copyToClipboard(text) {  
//	console.log("copyToClipboard....")
	if(window.clipboardData){  
		console.log("copyToClipboard....clipboardData")
		// IE처리
		// 클립보드에 문자열 복사
		window.clipboardData.setData('text', text);

		// 클립보드의 내용 가져오기
		// window.clipboardData.getData('Text');

		// 클립보드의 내용 지우기
		// window.clipboardData.clearData("Text");

	}  else {
		console.log("copyToClipboard....else")
		// 비IE 처리    
		window.prompt ("Copy to clipboard: Ctrl+C, Enter", text);  
	}
}

/**
 * @name         : verticalLineHighChart 
 * @description  : 세로 라인 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function verticalLineHighChart(data, type) {  
	var colorPt = ["#f08246", "#009589"];
	var chartData = [], categories = [];
	
	var isAlready = false, ovLv;
	for(var j=0; j<type.length; j++) {		// 항목분류 레벨
		if(type[j].objVarId != "13999001") {
			ovLv = type[j].varOrd;
			break;
		}
	}
	
	let maxVal = 0, sumVal = [];
	let chartOpt = type[0];
	for(var i=0; i<Object.keys(data).length; i++) {
		let ds = data[Object.keys(data)[i]];
		let dsMax = 0;	

		let dataArr = [];
		for(var j=0; j<ds.length; j++) {
			if(sumVal[j] != undefined) {
				sumVal[j] = sumVal[j] + parseInt(ds[j].DTVAL_CO);
			} else {
				sumVal.push(parseInt(ds[j].DTVAL_CO));
			}
		}
		for(var j=0; j<ds.length; j++) {
			var ovLvSn = "OV_L" + ovLv + "_SN";
			ds.sort(function(a, b) { return a[ovLvSn] - b[ovLvSn] }); //정렬
			
			if(ds[j].CHAR_ITM_ID != "13999001") {
				if(type[0].dispUnitNm != "%") {
					dataArr.push(parseInt(ds[j].DTVAL_CO/(chartOpt.dispUnit/chartOpt.kosisUnit)));	
				} else {
					let sum = sumVal.reduce(function add(sum, curVal) { return sum + curVal;}, 0);
					dataArr.push(parseFloat(parseFloat(ds[j].DTVAL_CO/sum*100).toFixed(2)));
				}				
			}
			
			var isAlready = false;
			for(var k=0; k<type.length; k++) {
				if(type[k].itemId != "13999001") {
					if(type[k].itmId == ds[j]["OV_L" + ovLv + "_ID"]) {
						categories.push(type[k].altrtvDispWrd);
						isAlready = true;	
					}
				}			
			}
			if(!isAlready) {
				categories.push(ds[j]["OV_L" + ovLv + "_KOR"]);
			}
		}
		chartData.push({name: data[Object.keys(data)[i]][0].CHAR_ITM_NM, data: dataArr, pointWidth: 15 });		
	}
	
	for(var i=0; i<sumVal.length; i++) {
		if(maxVal < sumVal[i]) {
			maxVal = sumVal[i];
		}
	}
		
	if(type[0].dispUnitNm == "%") {
		let sum = sumVal.reduce(function add(sum, curVal) { return sum + curVal;}, 0);
		maxVal = parseFloat((maxVal/sum*100*1.1).toFixed(2));
	} else {
		maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * 1.1;
	}
	
	var chartDiv = $('#chartDiv').highcharts({
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		colors: colorPt,
		legend: {
	        enabled: false			
	    },
		title: {
			text: "",
			style: { "display": "none" }
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				stacking: 'normal'
			}
		},
		tooltip: {
        	formatter: function () {
				for(var i=0; i<Object.keys(data).length; i++) {
					if(data[Object.keys(data)[i]][0].CHAR_ITM_NM == this.series.name) {
						return "<b>" + this.key + ": <br/>" + this.series.name + numberFormat(parseInt(data[Object.keys(data)[i]][this.point.index].DTVAL_CO)) + type[0].kosisUnitNm + "</b>" ;
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
			labels: {				
				formatter: function() {
					return this.value;
				}
			}
	    },
		yAxis: {
			max: maxVal,
	        title: {
				text: null
			},
			lineWidth: 1,
			stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					fontFamily: 'NanumSquare'
                },
				formatter: function() {
					return numberFormat(this.total);
				}
            }			
	    },
		series: chartData
	});
	
	$('#chartDiv .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#chartDiv .highcharts-data-labels span').last().css("top", "10px");
}

/**
 * @name         : polarLineHighChart 
 * @description  : 폴라 라인 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function polarLineHighChart(data, type) {
	var colorPt = ["#f08246", "#009589"];
	var chartData = [], categories = [];
	
	var isAlready = false, ovLv;
	for(var j=0; j<type.length; j++) {		// 항목분류 레벨
		if(type[j].objVarId != "13999001") {
			ovLv = type[j].varOrd;
			break;
		}
	}
	
	let maxVal = 0, sumVal = [];
	let chartOpt = type[0];
	for(var i=0; i<Object.keys(data).length; i++) {
		let ds = data[Object.keys(data)[i]];
		let dsMax = 0;	

		let dataArr = [];
		for(var j=0; j<ds.length; j++) {
			if(sumVal[j] != undefined) {
				sumVal[j] = sumVal[j] + parseInt(ds[j].DTVAL_CO);
			} else {
				sumVal.push(parseInt(ds[j].DTVAL_CO));
			}
		}
		for(var j=0; j<ds.length; j++) {
			var ovLvSn = "OV_L" + ovLv + "_SN";
			ds.sort(function(a, b) { return a[ovLvSn] - b[ovLvSn] }); //정렬
			
			if(ds[j].CHAR_ITM_ID != "13999001") {
				if(type[0].dispUnitNm != "%") {
					dataArr.push(parseInt(ds[j].DTVAL_CO));	
				} else {
					let sum = sumVal.reduce(function add(sum, curVal) { return sum + curVal;}, 0);
					dataArr.push(parseFloat(parseFloat(ds[j].DTVAL_CO/sum*100).toFixed(2)));
				}				
			}
			
			var isAlready = false;
			for(var k=0; k<type.length; k++) {
				if(type[k].itemId != "13999001") {
					if(type[k].itmId == ds[j]["OV_L" + ovLv + "_ID"]) {
						categories.push(type[k].altrtvDispWrd);
						isAlready = true;	
					}
				}			
			}
			if(!isAlready) {
				categories.push(ds[j]["OV_L" + ovLv + "_KOR"]);
			}
		}
		chartData.push({name: data[Object.keys(data)[i]][0].CHAR_ITM_NM, data: dataArr, type: "line"});		
	}
	
	for(var i=0; i<sumVal.length; i++) {
		if(maxVal < sumVal[i]) {
			maxVal = sumVal[i];
		}
	}
		
	if(type[0].dispUnitNm == "%") {
		let sum = sumVal.reduce(function add(sum, curVal) { return sum + curVal;}, 0);
		maxVal = parseFloat((maxVal/sum*100).toFixed(2));
	} else {
		maxVal = Math.round(parseInt(maxVal));
	}
	
	var chartDiv = $('#chartDiv').highcharts({
		chart: {
			polar: true,
			type: 'column'			
		},
		colors: colorPt,
		legend: {
	        enabled: false			
	    },
		title: {
			text: "",
			style: { "display": "none" }
		},
		tooltip: {
        	formatter: function () {
				for(var i=0; i<Object.keys(data).length; i++) {
					if(data[Object.keys(data)[i]][0].CHAR_ITM_NM == this.series.name) {
						return "<b>" + this.key + ": <br/>" + this.series.name + numberFormat(parseInt(data[Object.keys(data)[i]][this.point.index].DTVAL_CO)) + type[0].kosisUnitNm + "</b>" ;
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
			tickmarkPlacement: 'on',
	        labels: {
	            align: 'center',
				allowOverlap: true
	        }			
	    },
		yAxis: {
			min: 0
	    },
		series: chartData
	});
	
	$('#chartDiv .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#chartDiv .highcharts-data-labels span').last().css("top", "10px");
}

/**
 * @name         : pieHighChart 
 * @description  : 파이 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function pieHighChart(series, chartMeta, year, code, chart_ord) {  
	// 파이차트
	var pieColors = (function () {
		  var colors = [];
		  var base = Highcharts.getOptions().colors[0];
		  var i;

		  for (i = 0; i < 10; i += 1) {
		    // Start out with a darkened base color (negative brighten), and end
		    // up with a much brighter color
		    colors.push(Highcharts.color(base).brighten((i-Object.keys(chartMeta).length) / 10).get());
		  }
		  return colors;
		}());

	for(var i=0; i<series.length; i++){
		series[i].cursor = 'pointer';
		series[i].innerSize = '50%';
	}

	Highcharts.chart('chartDiv', extendChartStyle({
		chart : {
			type : 'pie',
			events: {
				load: function() {
					if($houseDash.chartItmClick != "") {
				    	$("#chartDiv").highcharts().series[0].data.forEach(function(bar) {
				    		if(bar.id == $houseDash.chartItmClick) {
				    			$(".charItmMapTitle.red").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.name);
				    			bar.select();
				    		}    		
				    	});
				    }
				}
			}
		},
		title : {
			text : ''
		},
		plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
				colors: pieColors,
	            showInLegend: true,
	            dataLabels: {
	                enabled: true,
	                //format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
	                //format: '<b>{point.name}</b><br/><b>' + numberFormat('{point.y}') + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>',
	                formatter: function() {
	                	return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>';
	                },
	                alignTo: 'connectors'
	            },
	            events : {
	            	click : function(evt) {
	            		
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
            labelFormat: '<b>{name}</b> / {percentage:.1f}%',
            floating:false,
            itemWidth: 150,
            layout: 'vertical'
		},
		tooltip : {
			useHTML : true,
			headerFormat : '',
			//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
			formatter: function() {
				let befYear = parseInt(year)-1, totDt = 0, incDec = 0, incDecStr = "", befDt =[]; 
				
				for(var i=0; i<chartData.length; i++) {
					for(var j=0; j<Object.keys(chartMeta).length; j++) {
						if(chartData[i].PRD_DE == befYear) {
							if($houseDash.polygonSelectArea != "") {
								if(chartData[i].ADM_CD == $houseDash.polygonSelectArea) {
									let setChrItmId = Object.keys(chartMeta)[j];
									if(tblId == "DT_1NW1001") {
										if(chartData[i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
												&& this.key == chartMeta[setChrItmId].scr_kor) {
											totDt += parseInt(chartData[i].DTVAL_CO);
										}
									} else {
										if(this.key == chartMeta[setChrItmId].scr_kor) {
											if(chartMeta[setChrItmId].var_ord == 0) {
												if(chartData[i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor) {
													if(chartData[i].DTVAL_CO != undefined) {
														totDt += parseInt(chartData[i].DTVAL_CO);
													}
												}
											} else {
												if(chartData[i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor) {
													if(chartData[i].DTVAL_CO != undefined) {
														totDt += parseInt(chartData[i].DTVAL_CO);
													}
												}
											}									
										}
									}
								}
							} else {
								let setChrItmId = Object.keys(chartMeta)[j];
								if(tblId == "DT_1NW1001") {
									if(chartData[i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor 
											&& this.key == chartMeta[setChrItmId].scr_kor
											&& chartData[i].ADM_CD == code) {
										totDt += parseInt(chartData[i].DTVAL_CO);
									}
								} else {
									if(this.key == chartMeta[setChrItmId].scr_kor) {
										if(chartMeta[setChrItmId].var_ord == 0) {
											if(chartData[i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor
													&& chartData[i].ADM_CD == code) {
												if(chartData[i].DTVAL_CO != undefined) {
													totDt += parseInt(chartData[i].DTVAL_CO);
												}
											}
										} else {
											if(chartData[i]["OV_L" + chartMeta[setChrItmId].var_ord + "_KOR"] == chartMeta[setChrItmId].scr_kor
													&& chartData[i].ADM_CD == code) {
												if(chartData[i].DTVAL_CO != undefined) {
													totDt += parseInt(chartData[i].DTVAL_CO);
												}
											}
										}									
									}
								}
							}
							
							befDt.push(chartData[i]);
						}
					}
				}
				
				incDec = ((totDt-this.y) / totDt * 100).toFixed(1);
				
				if(befDt.length > 0) {
					if(incDec < 0) {
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
					} else if(incDec > 0) {
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
				} else {
					incDecStr = "전년도 자료 없음";
				}
				
				return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartInfo[chart_ord][0].kosis_unit_nm + '</b>' +
					'<br/>' + incDecStr;
			},
			footerFormat : ''
		},
		series : series
	}));
	
	$("#chartDiv .highcharts-data-labels").hide();
	//통계값 짤림 해결
	let modHeight = parseInt($("#chartDiv svg").attr("height"))+20;
	$("#chartDiv.chartCon").css("height", modHeight+10);
	$("#chartDiv .highcharts-container").css("height", modHeight);
	$("#chartDiv svg").attr("height", modHeight);
}

let lPosX = 0, lPosY = 0;

/**
 * @name         : pieHighChart 
 * @description  : 파이 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function verticalBarHighChart(chartMeta, year, code, chart_ord) {
	var localSerieName = '합계'

	// 지역별 막대 차트
	Highcharts.chart('chartDiv', {
		chart : {
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false,
			type : 'column',			
			events: {
				load: function() {
					var chart = this;					
					chart.series.forEach(function(series) {
						series.points.forEach(function(point) {
							if(lPosX == 0) {
								lPosX = point.dataLabel.x+point.dataLabel.width;
								lPosY = point.dataLabel.y+point.dataLabel.height;
							} else {
								if(Math.abs(point.dataLabel.y - lPosY) >= 20) {
									lPosX = point.dataLabel.x;
									lPosY = point.dataLabel.y;
								} else {
									point.dataLabel.translate(point.dataLabel.x, point.dataLabel.y-20);
									lPosX = point.dataLabel.x;
									lPosY = point.dataLabel.y-20;
								}
							}							
						});
					});
				},
				redraw: function() {
					var chart = this;					
					chart.series.forEach(function(series) {
						series.points.forEach(function(point) {
							if(lPosX == 0) {
								lPosX = point.dataLabel.x+point.dataLabel.width;
								lPosY = point.dataLabel.y+point.dataLabel.height;
							} else {
								if(Math.abs(point.dataLabel.y - lPosY) >= 20) {
									lPosX = point.dataLabel.x;
									lPosY = point.dataLabel.y;
								} else {
									point.dataLabel.translate(point.dataLabel.x, point.dataLabel.y-20);
									lPosX = point.dataLabel.x;
									lPosY = point.dataLabel.y-20;
								}
							}							
						});
					});
				}
			}
		},
		title : {
			text : ''
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
				var sidoCategories_ = sidoCategories.slice();
				$.each(sidoCategories_, function(i, v){
					sidoCategories_[i] = v.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
					.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
				});
				return sidoCategories_;
			})()
		},
		yAxis : {
			title : {
				enabled : false
			},			
			gridLineWidth : 0,
			plotLines : [ {
				color : "#FF0000",
				width : 2,
				value : (function () {
					var avg = curTot / sidoValues.length;
					return avg;
				})(),
				
				zIndex : 5,
				dashStyle : 'Dash',
				/*label: {
					formatter: function() {
						let curAvg = curTot / sidoValues.length, befAvg = befTot / sidoValues.length, incDecStr = "";
						let incDec = (befTot - curTot) / befTot * 100;
						if(incDec < 0) {
							incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.round(Math.abs(incDec) * 10) / 10 + "% 증가</span>";
						} else if(incDec > 0){
							incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.round(Math.abs(incDec) * 10) / 10 + "% 감소</span>";
						} else {
							incDecStr = "변동 없음";
						}
						return "<b>" + numberFormat(Math.round(curAvg*10)/10) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + "</b><br/>" + incDecStr;
					}
				},*/
				events: {
					mouseover: function(e) {
						var series = this.axis.series[0],
						chart = series.chart,
							PointClass = series.pointClass,
							tooltip = chart.tooltip,
							point = (new PointClass()).init(
									series, ["시도 평균", this.options.value.toFixed(1)]
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
			//pointFormat : '<b>{point.name}</b><br/><b>{point.y:,.0f} '+chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>',
			formatter: function() {
				let befYear = parseInt(year)-1, totDt = 0, incDec = 0, incDecStr = "", befDt = [], befYearSum = 0; curYearSum = 0; 
				
				for(var i=0; i<chartData.length; i++) {
					if(chartData[i].PRD_DE == befYear) {
						for(var j=0; j<Object.keys(chartMeta).length; j++) {
							let setChrItmId = Object.keys(chartMeta)[j];
							let areaNm = chartData[i].ADM_KOR.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "")
								.replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
							if(tblId == "DT_1NW1001") {								
								if(setChrItmId == "T10") {
									if(chartMeta[setChrItmId].var_ord == 0) {
										if($houseDash.chartItmClick != "") {
											if(chartData[i].CHAR_ITM_ID == $houseDash.chartItmClick
													&& this.key == chartData[i].ADM_KOR) {
												totDt += parseInt(chartData[i].DTVAL_CO);
												befDt.push(chartData[i]);
											}
										} else {
											if(chartData[i].CHAR_ITM_ID == "T10"
													&& this.key == chartData[i].ADM_KOR) {
												totDt += parseInt(chartData[i].DTVAL_CO);
												befDt.push(chartData[i]);
											}
										}										
									} else {
										if($houseDash.chartItmClick != "") {
											if(chartData[i].CHAR_ITM_ID == "T10"
												&& chartData[i]["OV_L"+chartMeta[setChrItmId].var_ord+"_ID"] == $houseDash.chartItmClick
												&& chartData[i]["OV_L"+chartMeta[setChrItmId].var_ord+"_KOR"] == chartMeta[setChrItmId].scr_kor
												&& this.key == chartDataYear[i].ADM_KOR) {
												totDt += parseInt(chartData[i].DTVAL_CO);
												befDt.push(chartData[i]);
											}
										} else {
											if(chartData[i].CHAR_ITM_ID == "T10"
												&& chartData[i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor
												&& this.key == chartData[i].ADM_KOR) {
												totDt += parseInt(chartData[i].DTVAL_CO);
												befDt.push(chartData[i]);
											}
										}										
									}
								}
							} else {
								if(chartMeta[setChrItmId].var_ord == 0) {
									if($houseDash.chartItmClick != "") {
										if(chartData[i].CHAR_ITM_ID == $houseDash.chartItmClick
											&& this.key == chartData[i].ADM_KOR
											&& chartData[i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor) {
											totDt += parseInt(chartData[i].DTVAL_CO);
											befDt.push(chartData[i]);
										}
									} else {
										if(this.key == chartData[i].ADM_KOR
											&& chartData[i].CHAR_ITM_NM == chartMeta[setChrItmId].scr_kor) {
											totDt += parseInt(chartData[i].DTVAL_CO);
											befDt.push(chartData[i]);
										}
									}									
								} else {
									if($houseDash.chartItmClick != "") {
										if(chartData[i]["OV_L"+chartMeta[setChrItmId].var_ord+"_ID"] == $houseDash.chartItmClick
												&& chartData[i]["OV_L"+chartMeta[setChrItmId].var_ord+"_KOR"] == chartMeta[setChrItmId].scr_kor 
												&& this.key == chartData[i].ADM_KOR) {
											totDt += parseInt(chartData[i].DTVAL_CO);
											befDt.push(chartData[i]);
										}
									} else {
										if(chartData[i]["OV_L"+chartMeta[setChrItmId].var_ord+"_KOR"] == chartMeta[setChrItmId].scr_kor
											&& this.key == chartData[i].ADM_KOR) {
											totDt += parseInt(chartData[i].DTVAL_CO);
											befDt.push(chartData[i]);
										}
									}									
								}
							}
						}
						befYearSum += parseInt(chartData[i].DTVAL_CO);
					} else {
						curYearSum += parseInt(chartData[i].DTVAL_CO);
					}
				}
				
				incDec = ((totDt-this.y) / totDt * 100).toFixed(1);
				
				if(befDt.length > 0) {
					if(incDec < 0) {
						incDecStr = "<span style='color:#ff0000;'>전년 대비 " + Math.abs(incDec) + "% 증가</span>";
					} else if(incDec > 0) {
						incDecStr = "<span style='color:#0000ff;'>전년 대비 " + Math.abs(incDec) + "% 감소</span>";
					} else {
						incDecStr = "변동 없음";
					}
				} else {
					incDecStr = "전년도 자료 없음";
				}
				
				if(this.key.indexOf("평균") != -1) {
					let avgIncDec = ((befYearSum-curYearSum) / befYearSum * 100).toFixed(1), avgIncDecStr = "";
					
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
					
					return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>' +
					'<br/>' + avgIncDecStr;
				} else{
					return '<b>' + this.key + '</b><br/><b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm+'</b>' +
					'<br/>' + incDecStr;
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
				borderRadius : 5,
				dataLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: '100',
	                    color: "#000000",
						whiteSpace: 'nowrap',
						textOutline: false
	                },
					formatter: function() {
						return '<b>' + numberFormat(this.y) + chartMeta[Object.keys(chartMeta)[0]].disp_unit_nm + '</b>';
					},
					allowOverlap: true
	            }
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
					}
	            },			
	        },	        
		},
		series : [{
			name : localSerieName,
			data : sidoValues
		}]
	});
	
	$("#chartDiv div.highcharts-label.highcharts-toolip span").css("top", "16px");
	$("#chartDiv .highcharts-data-labels").hide();
	//통계값 짤림 해결
	let modHeight = parseInt($("#chartDiv svg").attr("height"))+20;
	$("#chartDiv.chartCon").css("height", modHeight+10);
	$("#chartDiv .highcharts-container").css("height", modHeight);
	$("#chartDiv svg").attr("height", modHeight);
}
