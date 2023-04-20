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
	/*$commonChart.colors = ["#4E79A7", "#9FCAE8", "#F28E2B", "#FFBE7D", "#F1CE63","#8BD17C","#B5982C", "#5BA151", "#499894", "#86BCB6", "#E15759", "#FF9D9A", "#79706E", "#BAB0AC", "#D37295", "#FABFD2", "#B07AA1", "#D4A6C8", "#9D7660", "#D7B5A6","#A462DE"]; //2020.11.10[신예리] 차트 컬러 추가
*/	
	$commonChart.noDataHtml = "<div class='DataNone' style='text-align: center;'><img src='/images/totSurv/ChartNone.png' alt='선택하신 차트 정보가 없습니다.' style='margin-top: 138px;'><p style='margin-top: 15px;'>선택하신 차트 정보가 없습니다.</p></div>";
	
	
	$commonChart.modalBg = "";
	$commonChart.modalZindex = 9999;
	$commonChart.modalCss = "{        position: 'fixed',        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',        zIndex: $commonChart.modalZindex + 1,        top: '50%',        left: '50%',        transform: 'translate(-50%, -50%)',        msTransform: 'translate(-50%, -50%)',        webkitTransform: 'translate(-50%, -50%)'    }";
	

	$(document).ready(function() {
		console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@   $commonChart   ready        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		$commonChart.ui.clear();
	    $commonChart.ui.init();
	});
	//ready 끝
	
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
			
			body.on("click", "button[class*=chartKind]", function(event){
				event.stopPropagation();
				$("button[class*=chartKind]").removeClass("on");
				var target = event.target.className;
				
				//2021-08-26 [이영호] 경제총조사 HighChart 부분 추가
				if($commonChart.dataType.indexOf("HighChart") != -1) {
					//$commonChart.ui.clear();
					$(this).addClass("on");
					if(target == "chartKind00" || target == "chartKind00 on"){						
						horizentalBarHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind01" || target == "chartKind01 on"){
						verticalBarHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind02" || target == "chartKind02 on"){
						horizontalLineHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind04" || target == "chartKind04 on"){
						polarLineHighChart($commonChart.chartData, $commonChart.chartType);
					} else if(target == "chartKind05" || target == "chartKind05 on"){
						pieHighChart($commonChart.chartData, $commonChart.chartType);
					}
				}else{
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
			
			body.on("click", "div[class*=chartKind]", function(event){
				var target = event.target.className;
				
				
			});
			
			
			// 2020.10.28 공통차트 이미지 저장 버튼 추가 START
			body.on("click", "#cmmChartSave", function(event){
				event.stopPropagation();
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
 * @name         : horizontalBarChart 
 * @description  : 막대 그래프(가로)
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function horizontalBarChart(){
	console.log("horizontalBarChart !!!!");
	
	if($commonChart.chartData == null || $commonChart.chartData.length == 0 || $commonChart.chartData == ""){
		$("#chartDiv").html($commonChart.noDataHtml);
		return;
	}
	
	if($commonChart.dataType == "itm1"){
			
		var data = $commonChart.chartData;
		//20201104 박은식 max length체크하여 길이만큼 마진값 변경 START
		var reg = /[\{\}\[\]\/?.,;:|\)*`!^\_<>@\#$%&\\\=\(\'\"]/gi;//특수문자 제거(일부 특수문자는 width를 거의 차지하지 않음)
		
		var lengthMax = d3.max(data, function(d) {
	  		// 변경
	  		if("c1_nm" ==$commonChart.columnVal){
	  			return d.c1_nm.replace(reg, "").length
	  		}
	  		else if("itm_nm" ==$commonChart.columnVal){
	  			return d.itm_nm.replace(reg, "").length
	  		}
	  		else if("c2_nm" ==$commonChart.columnVal){
	  			return d.c2_nm.replace(reg, "").length
	  		}
	  		else if("surv_year" ==$commonChart.columnVal){
	  			return d.surv_year.replace(reg, "").length
	  		}
	  		// 상세 cd_nm
	  		else if("cd_nm" ==$commonChart.columnVal){
	  			return d.cd_nm.replace(reg, "").length
	  		}
		})
		var margin = ({top: 100, right: 220, bottom: 120, left: 10+lengthMax*10}) //2020.10.21[신예리] margin 값 변경
		//20201104 박은식 max length체크하여 길이만큼 마진값 변경 END
		//var colors = $commonChart.colors;
		console.log(margin);

		$("#chartDiv").empty();
		var width = $("#chartDiv").outerWidth()-90; //2020.10.21[신예리] -값 변경
		var height = '450'; 
		var tool = $(".chartPoptoolTip");
		
		console.log("data 2 = " + JSON.stringify(data));
		
		var total = 0;
		for(var i=0; i<data.length; i++){
			// 변경
			total = Number(data[i].dt) + total;
		}
		
		  var x = d3.scaleLinear()
		  			//변경
		  			.domain([0, d3.max(data, function(d) {
		  				if("dt" ==$commonChart.dataVal){
		  					return Number(d.dt) 
		  				}
		  			})])
		            .range([margin.left, width - (margin.right+margin.left)])
		  var x1 = d3.scaleLinear()
		  			//.변경
		  			.domain([0, d3.max(data, function(d) { 
		  				if("dt" ==$commonChart.dataVal){
		  					return Number(d.dt)
		  				}
		  			})])
		            .range([0, width - (margin.right+margin.left)])
		  var y = d3.scaleBand()
		            .domain(d3.range(data.length))
		            .range([0, height]) //range / domainlength 항목간 넓이
		            .padding((data.length > 15) ? 0.5 : 0.4) //2020.10.21[신예리] 데이터 개수에 따른 차트 높이 조정
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
		      	    .attr("transform", "translate("+ (margin.left+5) + ",0)")
		      	    .call(d3.axisLeft(y).tickFormat(
		      	    	function(i) {
		      	    		// 변경
		      	    		if("c1_nm" ==$commonChart.columnVal){
		      	    			return data[i].c1_nm
		      	    		}
		      	    		else if("itm_nm" ==$commonChart.columnVal){
		      	    			return data[i].itm_nm
		      	    		}
		      	    		else if("c2_nm" ==$commonChart.columnVal){
		      	    			return data[i].c2_nm
		      	    		}
		      	    		else if("surv_year" ==$commonChart.columnVal){
		      	    			return data[i].surv_year
		      	    		}
		      	    		// 상세 cd_nm
		      	    		else if("cd_nm" ==$commonChart.columnVal){
		      	    			return data[i].cd_nm
		      	    		}
		      	    		
		      	    	}).tickSizeOuter(0))
		  			}
		  var format = x.tickFormat(20, data.format)
		  //타겟 설정
		  const chart = d3.select("#chartDiv");
		  const svg = chart
				     .append("svg")
				     .attr("height", height)
				     .attr("width", width)
		    
		  svg.append("g")
		        .selectAll("rect")
		        .data(data)
		        .join("rect")
		      .attr("class", "eventGroup") 
		      .attr("x", x(0))
		      //.attr("y", function(d, i) { return y(i) }) 116 
		      .attr("y", function(d, i) { return ((data.length > 15) ? y(i) : y(i)+((y.bandwidth()-20)/2)) })
		      //.attr("height", y.bandwidth())
		      .attr("height", ((data.length > 15) ? y.bandwidth() : 20))
		      .attr("fill", function(d,i) { return colors[i]})
		      .attr("width", 0)
		      .attr("rx", "4")
		      .attr("ry", "4")
		      // 변경
		      .on("mouseover", function(d){
			    	$commonChart.ui.chartMouseOver($(this), "#576574");
			    	if("c1_nm" ==$commonChart.columnVal){
      	    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가 
      	    		}
      	    		else if("itm_nm" ==$commonChart.columnVal){
      	    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가
      	    		}
      	    		else if("c2_nm" ==$commonChart.columnVal){
      	    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.c2_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가
      	    		}
      	    		else if("surv_year" ==$commonChart.columnVal){
      	    			$commonChart.ui.createChartTool(d.surv_year, "","", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가
      	    		}
			    	// 상세 cd_nm
      	    		else if("cd_nm" ==$commonChart.columnVal){
      	    			$commonChart.ui.createChartTool(d.surv_year, d.cd_nm," ", numberFormat(d.dt), d.unit, tool, -140, -80); //20201202 박은식 파라미터 수정 
      	    		}
			    	
			  })
			  .on("click", function(d){
//				    $totSurvMain.ui.chartTarget = chartDiv
//		    		$totSurvMain.ui.chartIndex = $(this).index()
//		    		$totSurvMain.ui.chartData = d;
//		    		$totSurvMain.ui.chartColor = "#576574";
//		    		// 변경
//		    		//$totSurvMain.ui.chartTitle =  $totSurvMain.ui.selectedYear+"년 "+d.itm_nm
//		    		if("c1_nm" ==$commonChart.columnVal){
//      	    			$commonChart.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.c1_nm);
//      	    		}
//      	    		else if("itm_nm" ==$commonChart.columnVal){
//      	    			$commonChart.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.itm_nm);
//      	    		}
//      	    		else if("c2_nm" ==$commonChart.columnVal){
//      	    			$commonChart.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.c2_nm);
//      	    		}
//      	    		else if("surv_year" ==$commonChart.columnVal){
//      	    			$commonChart.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.surv_year);
//      	    		}
			   })
			   .on("mouseout", function(){
			    	$commonChart.ui.chartMouseOut($(this), "#576574");
			    	tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
			   })
			   .transition()
		      .duration(1000)
		      .delay(function (d, i) {
		          return i * 150;
		      })
		      .attr("width",  function(d) {
		    	  if("dt" ==$commonChart.dataVal){
		    		  return x1(Number(d.dt)) 
		    	  }
		      }); 

		  svg.append("g")
		      .attr("text-anchor", "end")
		      .attr("font-family", "NanumSquare") // 2020.09.15[신예리]폰트 수정
		      .attr("font-size", 12) // 2020.09.22[신예리]폰트 사이즈 수정
		      .attr("font-weight", 600)
		      .selectAll("text")
		      .data(data)
		      .join("text")
		      .attr("fill", "")
		      .attr("x", 0)
		      // 변경
		      .attr("width",  function(d) {
		    	  if("dt" ==$commonChart.dataVal){
		    		  return x1(Number(d.dt)) 
		    	  }
		      })
		      .attr("dy", "0.35em")
		      // 변경
		      .text(function(d) {
		    	  if("dt" ==$commonChart.dataVal){
		    		  return (format(d.dt) == 0) ? '': format(d.dt)
		    	  }
		      })
		      .call(function(text) { return text.filter(function(d) {
		    	  if("dt" ==$commonChart.dataVal){
		    		  return x1(Number(d.dt))
		    	  }
		      }) // short bars
		      .attr("dx", +10)
		      .attr("text-anchor", "start") })
		      .attr("y", function(d, i) { return y(i) + y.bandwidth() / 2 })
		      .attr("x", margin.left)
		      .transition()
		      .duration(1000)
		      .delay(function (d, i) {
		          return i * 150;
		      })
		      .attr("x",  function(d) {
		    	  if("dt" ==$commonChart.dataVal){
		    		  return x1(Number(d.dt))+margin.left
		    	  }
		      });

		  svg.append("g")
		     .attr("style", "margin-left:250px; font-size: 11px; color:#878A89")
		     .call(yAxis);

		  $("#chartDiv").find("line, path").remove();
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}

	
}



/**
 * @name         : verticalBarChart 
 * @description  : 막대 그래프(세로)
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function verticalBarChart(){
	console.log("verticalBarChart !!!!");
	
	if($commonChart.chartData == null || $commonChart.chartData.length == 0 || $commonChart.chartData == ""){
		$("#chartDiv").html($commonChart.noDataHtml);
		return;
	}
	
	if($commonChart.dataType == "itm1"){
		var data = $commonChart.chartData;
//		console.log("data = " + JSON.stringify(data));
		
		var margin = ({top: 60, right: (data.length >= 15) ? 30 : 15, bottom:(data.length >= 15) ? data.length*12 : 80, left: 50}) //2020.11.03[신예리] margin값 변경 //20210304 박은식 높이값 수정
		// 칼라 세팅
		var color = $commonChart.colors;
		var max = d3.max(data, function(d) {
			if("dt" ==$commonChart.dataVal){
				return Number(d.dt) 
			}
		});
		
		$("#chartDiv").empty();
		var width = $("#chartDiv").outerWidth()-50; //2020.10.21[신예리] -50 추가
		var height = '450';	
		
		// X축 세팅(domain : 눈금범위, range : 길이범위)
		var x = d3.scaleBand()
	    .domain(d3.range(data.length))
	    .range([margin.left, width - margin.right])
	    
	    // Y축 세팅(domain : 눈금범위, range : 길이범위)
		var y = d3.scaleLinear()
		    .domain([0, d3.max(data, function(d) {
		    	if("dt" ==$commonChart.dataVal){
		    		return Number(d.dt) 
		    	}
		    })]).nice()
		    .range([height - margin.bottom, margin.top]);
		
		// X 축 정보
		var xAxis = function(g) { return g
		    .attr("transform", "translate("+0+","+(height-margin.bottom)+")")
		    // 변경
		    .call(d3.axisBottom(x).tickFormat(function(i) {
		    	if("c1_nm" ==$commonChart.columnVal){
  	    			return data[i].c1_nm.replace("세", "").replace("이상", "~") 
  	    		}
  	    		else if("itm_nm" ==$commonChart.columnVal){
  	    			return data[i].itm_nm.replace("세", "").replace("이상", "~")
  	    		}
  	    		else if("c2_nm" ==$commonChart.columnVal){
  	    			return data[i].c2_nm.replace("세", "").replace("이상", "~")
  	    		}
  	    		else if("surv_year" ==$commonChart.columnVal){
  	    			return data[i].surv_year.replace("세", "").replace("이상", "~")
  	    		}
		    	// 상세 cd_nm
  	    		else if("cd_nm" ==$commonChart.columnVal){
  	    			return data[i].cd_nm
  	    		}
		    }).tickSizeOuter(0))
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
		
		const chart = d3.select("#chartDiv");

		const svg = chart
		    .append("svg")
		    .attr("height", height)
		    .attr("width", width)
		    .attr("style", "margin-left:-10px"); // 2020.10.21 [신예리] 마진값 변경
	    
	    //var tool = d3.select("body").append("div").attr("class", "chartCommontoolTip");
	    //var tool = $(".chartCommontoolTip"); 		/** 2020-10-07 [곽제욱] 툴팁 수정 */
		var tool = $(".chartPoptoolTip");

	    	// 실제 차트 start
	        svg.append("g")
	    	.selectAll("rect")
	    	.data(data)
	    	.join("rect")
	    	.attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
	    	.attr("x", function(d, i) { return (data.length > 15) ? (x(i)+10) : (x(i)+((x.bandwidth()-20)/2)) }) //2020.10.21[신예리] 데이터 값에 따른 위치 조정
	    	.attr("y", function(d) { return y(0) }) // 시작점 Y좌표
	    	.attr("width", (data.length > 15) ? (x.bandwidth()-20) : 20)//2020.10.21[신예리] 데이터 값에 따른 차트 너비 조정
	    	.attr("fill", function(d,i) {return color[i]})
	        .on("mouseover", function(d){
	        	$commonChart.ui.chartMouseOver($(this), "#576574"); 
	        	// 변경
	        	if("c1_nm" ==$commonChart.columnVal){
  	    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가
  	    		}
  	    		else if("itm_nm" ==$commonChart.columnVal){
  	    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가
  	    		}
  	    		else if("c2_nm" ==$commonChart.columnVal){
  	    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.c2_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가
  	    		}
  	    		else if("surv_year" ==$commonChart.columnVal){
  	    			$commonChart.ui.createChartTool(d.surv_year, "","", numberFormat(d.dt), $commonChart.chartUnit, tool, -140, -80); // 2020-12-02 [곽제욱] 차트 변수 추가
  	    		}
	        	// 상세 cd_nm
  	    		else if("cd_nm" ==$commonChart.columnVal){
  	    			$commonChart.ui.createChartTool(d.surv_year, d.cd_nm," ", numberFormat(d.dt), d.unit, tool, -140, -80); //20201202 박은식 파라미터 수정 
  	    		}
	    	})
	    	.on("mouseout", function(){
	    		$commonChart.ui.chartMouseOut($(this), "#576574"); //2020.09.22[신예리] 마우스 오버 시 차트 컬러 변경
	    		tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
	    	})
	    	.on("click", function(d){
	    		//20201014 박은식 chartSelectedSave function parameter 변수 셋팅 START
//		    	$totSurvMain.ui.chartTarget = target
//		    	$totSurvMain.ui.chartIndex = $(this).index()
//		    	$totSurvMain.ui.chartData = d;
//		    	$totSurvMain.ui.chartColor = "#576574";
		    	
		    	// 변경
		    	//$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.c1_nm+" "+d.itm_nm;
//		    	if("c1_nm" ==$commonChart.columnVal){
//  	    			$commonChart.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ d.c1_nm);
//  	    		}
//  	    		else if("itm_nm" ==$commonChart.columnVal){
//  	    			$commonChart.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+ d.itm_nm);
//  	    		}
//  	    		else if("c2_nm" ==$commonChart.columnVal){
//  	    			$commonChart.ui.chartItmClick($(this), d, "#576574", $totSurvMain.ui.selectedYear+"년 "+d.c2_nm);
//  	    		}
//  	    		else if("surv_year" ==$commonChart.columnVal){
//  	    			$commonChart.ui.chartItmClick($(this), d, "#576574", d.surv_year +"년 ");
//  	    		}
	    	})
	    	//.attr("height", 0)
	    	.transition()
	    	.duration(1000)
	    	.delay(function (d, i) {
	    	return i * 50;
	    	})
	    	.attr("height",  function(d) {
	    		if("dt" ==$commonChart.dataVal){
	    			return y(0) - y(Number(d.dt)) 
	    		}
	    	})
	    	.attr("y", function(d) { return y(Number(d.dt)) })

	     svg.append("g").attr("style", "color:#878A89; font-size:11px;")
	 		.selectAll("text")
		 	.data(data)
		 	.join("text")
		 	.attr("text-anchor", "middle")
			.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
		 	.attr("y", function(d) { 
		 		if("dt" ==$commonChart.dataVal){
		 			return y(Number(d.dt))-10 
		 		}
		 	})
		 	.text( function(d){
		 		if("dt" ==$commonChart.dataVal){
		 			return numberFormat(d.dt) //20201117 박은식 number format 변경
		 		}
		 	})
		 	//20201111 박은식 하단 지표정보가 겹치는 현상 처리 START
			if(data.length >= 15){
				 svg.append("g")
			     .call(xAxis)
			     .attr("style", "font-size: 11px;")
			     .selectAll("text")
			     .data(data)
			     .join("text")
			     //20210304 박은식 문자열 조건 수정 START
			     .attr("x", function(d, i){ 
			    	if("c1_nm" ==$commonChart.columnVal){
			    		return d.c1_nm.length
	  	    		}
	  	    		else if("itm_nm" ==$commonChart.columnVal){
	  	    			return d.itm_nm.length
	  	    		}
	  	    		else if("c2_nm" ==$commonChart.columnVal){
	  	    			return d.c2_nm.length
	  	    		}
	  	    		else if("surv_year" ==$commonChart.columnVal){
	  	    			return d.surv_year.length
	  	    		}
		        	// 상세 cd_nm
	  	    		else if("cd_nm" ==$commonChart.columnVal){
	  	    			return d.cd_nm.length 
	  	    		} 
			     })
			     .attr('transform', function(d){ 
			    	 if("c1_nm" ==$commonChart.columnVal){
			    		 	return 'translate('+((d.c1_nm.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.c1_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
		  	    		else if("itm_nm" ==$commonChart.columnVal){
		  	    			return 'translate('+((d.itm_nm.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.itm_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
		  	    		else if("c2_nm" ==$commonChart.columnVal){
		  	    			return 'translate('+((d.c2_nm.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.c2_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
		  	    		else if("surv_year" ==$commonChart.columnVal){
		  	    			return 'translate('+((d.surv_year.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.surv_year.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
			        	// 상세 cd_nm
		  	    		else if("cd_nm" ==$commonChart.columnVal){
		  	    			return 'translate('+(((d.cd_nm.length)+(x.bandwidth()/2))/2)+','+(((data.length >= 15) ? 5 : 0) +(d.cd_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		} 
			    	//20210304 박은식 문자열 조건 수정 EMD
			     });
			} else {
				svg.append("g")
				   .attr("style", "color:#878A89; font-size:11px;") //2020.11.05[신예리] 폰트 사이즈 및 컬러 지정
				   .call(xAxis);
			}
			//20201111 박은식 하단 지표정보가 겹치는 현상 처리 END
		
		svg.append("g")
		.attr("style", "color:#878A89; font-size:11px;")
		.call(yAxis);
		
		// 실제 차트 end
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
	
	
}


/**
 * @name         : brokenLineChart 
 * @description  : 꺾은선 그래프
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function brokenLineChart(data, target, resizeYn, height, gubun){
	console.log("brokenLineChart !!!!");
	
	if($commonChart.chartData == null || $commonChart.chartData.length == 0 || $commonChart.chartData == ""){
		$("#chartDiv").html($commonChart.noDataHtml);
		return;
	}
	
	if($commonChart.dataType == "itm1"){
		var height = 450;
		var data = $commonChart.chartData;
		//console.log("data = " + JSON.stringify(data));
		
		//기본셋팅
		$("#chartDiv").empty();
		var temp = [];
		// 변경
		var max = d3.max(data, function(d){
			if("dt" ==$commonChart.dataVal){
				return d.dt 
			}
		});
		var min = d3.min(data, function(d){
			if("dt" ==$commonChart.dataVal){
				return d.dt 
			}
		});
		//값 표시 문제로 rait 설정
		var rait = 1.002
		
		/*for(var i=1;i < data.length; i++){
			if("dt" ==$commonChart.dataVal){
				temp[i-1] = Number(data[i-1].dt)*rait;
				temp[i] = Number(data[i].dt)*rait;
				if(temp[i-1] <= temp[i]){
					temp[i-1] = data[i-1].dt
				} else {
					temp[i] = data[i].dt
				}
			}	
		}*/

		var width = $("#chartDiv").outerWidth()-50; //2020.10.21[신예리] -50추가
		
		 var tool = $(".chartPoptoolTip");
		
		var color = "#7419B1"; 

		var margin = ({top: 50, right: (data.length >= 15) ? 50 : 40, bottom: (data.length >= 15) ? data.length*12 : 80, left: 50}) //2020.11.03[신예리] margin값 변경 //20210304 박은식 높아깂 수정
		var radius = Math.min(width, height) / 2;
				
		var x = d3.scaleBand()
				// 변경
				  .domain(data.map(function(d){
					  if("c1_nm" ==$commonChart.columnVal){
	      	    		  return d.c1_nm
	      	    	  }
	      	    	  else if("itm_nm" ==$commonChart.columnVal){
	      	    		  return d.itm_cd
	      	    	  }
	      	    	  else if("c2_nm" ==$commonChart.columnVal){
	      	    		  return d.c2_nm
	      	    	  }
	      	    	  else if("surv_year" ==$commonChart.columnVal){
	      	    		  return d.surv_year
	      	    	  }
					  // 상세 cd_nm
    	    		  else if("cd_nm" ==$commonChart.columnVal){
    	    			  return d.cd_nm
    	    		  }
				  }))
				  .rangeRound([margin.left-10, width - margin.right+10])
				  .padding(0.4);


		var x1 = d3.scaleLinear()
					// 변경
				   .domain([0, d3.max(data, function(d){
					   if("dt" ==$commonChart.dataVal){
						   return d.dt 
					   }
				    })])
				   .range([width - margin.right, margin.left-10])
		
				   
		var line = d3.line()
					// 변경
					 .x(function(d){
						 if("c1_nm" ==$commonChart.columnVal){
		      	    		return x(d.c1_nm) + x.bandwidth() / 2
	      	    		 }
	      	    		 else if("itm_nm" ==$commonChart.columnVal){
	      	    		 	return x(d.itm_cd) + x.bandwidth() / 2
	      	    		 }
	      	    		 else if("c2_nm" ==$commonChart.columnVal){
	      	    			return x(d.c2_nm) + x.bandwidth() / 2
	      	    		 }
	      	    		 else if("surv_year" ==$commonChart.columnVal){
	      	    			return x(d.surv_year) + x.bandwidth() / 2
	      	    		 }
						 // 상세 cd_nm
	    	    		 else if("cd_nm" ==$commonChart.columnVal){
	    	    			 return x(d.cd_nm) + x.bandwidth() / 2
	    	    		 }
						 
						})
					 .y(function(d){ 
						 if("dt" ==$commonChart.dataVal){
							 return y2(d.dt) 
						 }
					  });		   
		/*		   
		var x2 = d3.scaleBand()
					// 변경
					.domain(data.map(function(d){ 
						if("c1_nm" ==$commonChart.columnVal){
		      	    		  return d.c1_nm
		      	    	  }
		      	    	  else if("itm_nm" ==$commonChart.columnVal){
		      	    		  return d.itm_nm
		      	    	  }
		      	    	  else if("c2_nm" ==$commonChart.columnVal){
		      	    		  return d.c2_nm
		      	    	  }
		      	    	  else if("surv_year" ==$commonChart.columnVal){
		      	    		  return d.surv_year
		      	    	  }
					}))
					.rangeRound([margin.left+10, width - margin.right+10])
		*/

		
		var y2 = d3.scaleLinear()
				   .domain(d3.extent(data, function(d, i){ return Number(d.dt) }))
//				   .domain(d3.extent(data, function(d, i){ return Number(temp[i]) }))
				   .rangeRound([height - margin.bottom-20, margin.top+10]);
		
		/*var dy = d3.scaleBand()
				   .domain(d3.range(data.length))
				   .range([0, height]) //range / domainlength 항목간 넓이
				   .padding(0.5);
		
		var dy1 = d3.scaleBand()
					.domain(d3.range(data.length))
		 			.range([0, height-105]) //range / domainlength 항목간 넓이
		 			.padding(0.1);
		*/
		var xAxis = function(g){ return g.attr("transform", 'translate(0,'+(height - margin.bottom)+')')
						  .call(d3.axisBottom(x)
								  .tickFormat(function(i){
									  if("itm_nm" == $commonChart.columnVal || "data_nm" == $commonChart.columnVal){
										  for(var j=0;j < data.length; j++){
											if(data[j].itm_cd == i){
												return data[j].itm_nm;
											}	 
										  }  
									  }else{
										  return i;  
									  }
								})
								  .tickSizeOuter(0));
							}
		
		var y1Axis = function(g){ return g.attr("transform", 'translate('+(margin.left)+','+(height - margin.bottom)+')')
						   .style("color", "steelblue")
						   
						   .call(function(g){ return g.append("text")
								   	   .attr("x", -margin.left)
								   	   .attr("y", 4)
								   	   .attr("fill", "#878A89")
								   	   .attr("font-family", "NanumSquare")
								   	   .attr("text-anchor", "start")
								   	   .text(data.y2) });
						}
		
		var yAxis = function(g){ return g.attr("transform", 'translate('+(margin.left)+',0)')
			  .style("color", "#878A89") //2020.10.21[신예리] 차트 y축 컬러 변경
			  .style("font-size", "12px")
			    .call(d3.axisLeft(y2).ticks(4, "s"))
			    .call(function(g){ return g.select(".domain").remove() })
			    .call(function(g){ return g.append("text")
										 .attr("x", -margin.left)
										  .attr("y", 10)
										  .attr("fill", "#878A89")
										  .attr("font-family", "NanumSquare")
										  .attr("text-anchor", "start")
										  .attr("font-size", "15")
										  .text(data.y2) })
		}
		

		var format = x1.tickFormat(20, data.format)
		var arc = d3.arc()
					.outerRadius(radius)
					.innerRadius(50);

		//타겟설정
		const chart = d3.select("#chartDiv");

		//차트 renderer시작
		const svg = chart.append("svg")
						 .attr("height", height)
						 .attr("width", width);

		
		var path = svg.append("path")
			  .attr("fill", "none")
			  .attr("stroke", color)
			  .attr("stroke-miterlimit", 1)
			  .attr("stroke-width", 1)
			  .attr("d", line(data));
	
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
		
		svg.append("g")
		    .selectAll("circle")
		   	.data(data)
		    .join("circle")
		    .attr("fill", "#fff") 
		    .attr("stroke", color) 
		    .attr("stroke-width", 2) 
		    // 변경
		    .attr("cx", function(d){
			   if("c1_nm" ==$commonChart.columnVal){
   	    		  return x(d.c1_nm) + x.bandwidth() / 2
   	    	   }
   	    	   else if("itm_nm" ==$commonChart.columnVal){
   	    		  return x(d.itm_cd) + x.bandwidth() / 2
   	    	   }
   	    	   else if("c2_nm" ==$commonChart.columnVal){
   	    		  return x(d.c2_nm) + x.bandwidth() / 2
   	    	   }
   	    	   else if("surv_year" ==$commonChart.columnVal){
 	    		  return x(d.surv_year) + x.bandwidth() / 2
 	    	   }
			   // 상세 cd_nm
	    	   else if("cd_nm" ==$commonChart.columnVal){
	    		   return x(d.cd_nm) + x.bandwidth() / 2
	    	   }
			})
		   .attr("cy", function(d){
			   if("dt" ==$commonChart.dataVal){
				   return y2(d.dt) 
			   }
		   })   
		   .attr("r", 4)
		   .attr("radius", 1)
		   .attr("d", arc);

		svg.append("g")
			.selectAll("rect")
			.data(data)
			.join("rect")
			 .on("mouseover", function(d){
				d3.select(this).attr("fill", "#468442")
				.attr("style", "fill-opacity:0.1;")
				
				if("c1_nm" ==$commonChart.columnVal){
					 if("dt" ==$commonChart.dataVal){
						 $commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm, "", numberFormat(d.dt), $commonChart.chartUnit, tool, 10, -30); // 2020-12-02 [곽제욱] 차트 변수 추가
					 }
  	    		}
  	    		else if("itm_nm" ==$commonChart.columnVal){
  	    			if("dt" ==$commonChart.dataVal){
  	    				$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm, "", numberFormat(d.dt), $commonChart.chartUnit, tool, 10, -30); // 2020-12-02 [곽제욱] 차트 변수 추가
  	    			}
  	    		}
  	    		else if("c2_nm" ==$commonChart.columnVal){
  	    			if("dt" ==$commonChart.dataVal){
  	    				$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.c2_nm, "", numberFormat(d.dt), $commonChart.chartUnit, tool, 10, -30); // 2020-12-02 [곽제욱] 차트 변수 추가
  	    			}
  	    		}
  	    		else if("surv_year" ==$commonChart.columnVal){
  	    			if("dt" ==$commonChart.dataVal){
  	    				$commonChart.ui.createChartTool(d.surv_year, "", "", numberFormat(d.dt), $commonChart.chartUnit, tool, 10, -30); // 2020-12-02 [곽제욱] 차트 변수 추가
  	    			}
  	    		}
				// 상세 cd_nm
 	    	    else if("cd_nm" ==$commonChart.columnVal){
 	    	    	if("dt" ==$commonChart.dataVal){
  	    				$commonChart.ui.createChartTool(d.surv_year, d.cd_nm, "", numberFormat(d.dt), d.unit, tool, 10, -30); //20201202 박은식 파라미터 수정 
  	    			}
 	    	    }
			 })
			 .on("mouseout", function(){
				 tool.css("display", "none");
				 d3.select(this).attr("fill", "#468442")
				.attr("style", "fill-opacity:0;")
			 })
			 // 변경
			.attr("x", function(d){
					if("c1_nm" ==$commonChart.columnVal){
	  	    			return (x(d.c1_nm) + x.bandwidth() / 2)-10
	  	    		}
	  	    		else if("itm_nm" ==$commonChart.columnVal){
	  	    			return (x(d.itm_cd) + x.bandwidth() / 2)-10
	  	    		}
	  	    		else if("c2_nm" ==$commonChart.columnVal){
	  	    			return (x(d.c2_nm) + x.bandwidth() / 2)-10
	  	    		}
	  	    		else if("surv_year" ==$commonChart.columnVal){
	  	    			return (x(d.surv_year) + x.bandwidth() / 2)-10
	  	    		}
					// 상세 cd_nm
	 	    	    else if("cd_nm" ==$commonChart.columnVal){
	 	    	    	return (x(d.cd_nm) + x.bandwidth() / 2)-10
	 	    	    }
			})
			.attr("y", 5)
			.attr('width', 20)
			.attr('height', 400)
			.attr("style", "fill-opacity:0;")
			
		svg.append("g").attr("style", "color:#878A89; font-size:11px;")
			.selectAll("text")
			.data(data)
			.join("text")
			.attr("id", "chartData")
			.attr("text-anchor", "middle")
			// 변경
			.attr("x", function(d,i){ 
				if("c1_nm" ==$commonChart.columnVal){
  	    			return x(d.c1_nm)+ x.bandwidth() / 2
  	    		}
  	    		else if("itm_nm" ==$commonChart.columnVal){
  	    			return x(d.itm_cd)+ x.bandwidth() / 2
  	    		}
  	    		else if("c2_nm" ==$commonChart.columnVal){
  	    			return x(d.c2_nm)+ x.bandwidth() / 2
  	    		}
  	    		else if("surv_year" ==$commonChart.columnVal){
  	    			return x(d.surv_year)+ x.bandwidth() / 2
  	    		}
				// 상세 cd_nm
 	    	    else if("cd_nm" ==$commonChart.columnVal){
 	    	    	return x(d.cd_nm)+ x.bandwidth() / 2
 	    	    }
			})
			.attr("y", function(d) {
				if("dt" ==$commonChart.dataVal){
					return y2(Number(d.dt))-10 
				}
			})
			.text( function(d){
				if("dt" ==$commonChart.dataVal){
					return numberFormat(d.dt) //20201117 박은식 number format 변경
				}
			})
		//20201111 박은식 하단 지표정보가 겹치는 현상 처리 START
		if(data.length > 18){
			 svg.append("g")
		     .call(xAxis)
		     .attr("style", "font-size: 11px;")
		     .selectAll("text")
		     .data(data)
		     .join("text")
		     //20210304 박은식 문자열 조건 수정 START
		     .attr("x", function(d, i){ 
			    	if("c1_nm" ==$commonChart.columnVal){
			    		return d.c1_nm.length
	  	    		}
	  	    		else if("itm_nm" ==$commonChart.columnVal){
	  	    			return d.itm_nm.length
	  	    		}
	  	    		else if("c2_nm" ==$commonChart.columnVal){
	  	    			return d.c2_nm.length
	  	    		}
	  	    		else if("surv_year" ==$commonChart.columnVal){
	  	    			return d.surv_year.length
	  	    		}
		        	// 상세 cd_nm
	  	    		else if("cd_nm" ==$commonChart.columnVal){
	  	    			return d.cd_nm.length 
	  	    		} 
			     })
			     .attr('transform', function(d){ 
			    	 if("c1_nm" ==$commonChart.columnVal){
			    		 	return 'translate('+((d.c1_nm.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.c1_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
		  	    		else if("itm_nm" ==$commonChart.columnVal){
		  	    			return 'translate('+((d.itm_nm.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.itm_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
		  	    		else if("c2_nm" ==$commonChart.columnVal){
		  	    			return 'translate('+((d.c2_nm.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.c2_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
		  	    		else if("surv_year" ==$commonChart.columnVal){
		  	    			return 'translate('+((d.surv_year.length)+(x.bandwidth()/2))+','+(((data.length >= 15) ? 5 : 0) +(d.surv_year.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		}
			        	// 상세 cd_nm
		  	    		else if("cd_nm" ==$commonChart.columnVal){
		  	    			return 'translate('+(((d.cd_nm.length)+(x.bandwidth()/2))/2)+','+(((data.length >= 15) ? 5 : 0) +(d.cd_nm.length)+(x.bandwidth()/2))+'), rotate(55)';
		  	    		} 
			    	//20210304 박은식 문자열 조건 수정 EMD
			     });
		} else {
			svg.append("g")
			   .attr("style", "color:#878A89; font-size:11px;") //2020.11.05[신예리] 폰트 사이즈 및 컬러 지정
			   .call(xAxis);
		}
		//20201111 박은식 하단 지표정보가 겹치는 현상 처리 END
		
		svg.append("g")
		   .call(y1Axis);
		svg.append("g")
		   .call(yAxis);
		
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
	
}



/**
 * @name         : radialChart 
 * @description  : 방사형 그래프
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function radialChart(){
	console.log("radialChart !!!!");
	
	if($commonChart.chartData == null || $commonChart.chartData.length == 0 || $commonChart.chartData == ""){
		$("#chartDiv").html($commonChart.noDataHtml);
		return;
	}
	
	var tool = $(".chartPoptoolTip");
	
	if($commonChart.dataType == "itm1"){
		///////////////////////// 설정 시작
		//2020.10.21[신예리] 방사형 그래프 margin값 및 크기 수정 START
		var height = '500';
		
		var margin = {top: 70, right: 100, bottom: 80, left: 100},  // 2020.10.29 임업경영형태 데이터 출력되도록 마진 수정
	    // 사이즈 변경
	    width = Math.min(height, window.innerWidth - 10) - margin.left - margin.right,
	    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

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
		
		$("#chartDiv").empty();
		// center로
	    $('#chartDiv').css("text-align","center");
		
		var data = []; 	data[0] = $commonChart.chartData;
		//var data = $commonChart.chartData;
		
	    var cfg = {
	     w: 500,                //Width of the circle
	     h: 500,                //Height of the circle
	     margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
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
	    	if("dt" ==$commonChart.dataVal){
	    		return Number(o.dt);
	    	}
	    }))}));
	    
	    // 변경
	    var allAxis = (data[0].map(function(i, j){
	    		if("c1_nm" ==$commonChart.columnVal){
	    			return i.c1_nm
	    		}
	    		else if("itm_nm" ==$commonChart.columnVal){
	    			return i.itm_nm
	    		}
	    		else if("c2_nm" ==$commonChart.columnVal){
	    			return i.c2_nm
	    		}
	    		else if("surv_year" ==$commonChart.columnVal){
	    			return i.surv_year
	    		}
	    		// 상세 cd_nm
 	    	    else if("cd_nm" ==$commonChart.columnVal){
 	    	    	return i.cd_nm
 	    	    }
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
	    d3.select("#chartDiv").select("svg").remove();

	    //Initiate the radar chart SVG
	    var svg = d3.select("#chartDiv").append("svg")
	            .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
	            .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
	            .attr("class", "radar"+"#chartDiv");
	    //Append a g element        
	    var g = svg.append("g")
	            .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

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
	       .text(function(d,i) { return numberFormat(maxValue * d/cfg.levels); }); //20201117 박은식 number format 변경

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
	        	if("dt" ==$commonChart.dataVal){
	        		return rScale(d.dt); 
	        	}
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
	        	if("dt" ==$commonChart.dataVal){
	        		return rScale(d.dt) * Math.cos(angleSlice*i - Math.PI/2);
	        	}
	        })
	        .attr("cy", function(d,i){
	        	if("dt" ==$commonChart.dataVal){
	        		return rScale(d.dt) * Math.sin(angleSlice*i - Math.PI/2);
	        	}
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
	        	if("dt" ==$commonChart.dataVal){
	        		return rScale(d.dt) * Math.cos(angleSlice*i - Math.PI/2);
	        	}
	        })
	        .attr("cy", function(d,i){
	        	if("dt" ==$commonChart.dataVal){
	        		return rScale(d.dt) * Math.sin(angleSlice*i - Math.PI/2);
	        	}
	        })
	        .style("fill", "none")
	        .style("pointer-events", "all")
	        .on("mouseover", function(d,i) {
	        	// 변경
	        	if("dt" ==$commonChart.dataVal){
	        		if("c1_nm" ==$commonChart.columnVal){
	        			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.c1_nm, "", numberFormat(d.dt), $commonChart.chartUnit, tool, 0, 0); //툴팁추가 // 2020-12-02 [곽제욱] 차트 변수 추가
		    		}
		    		else if("itm_nm" ==$commonChart.columnVal){
		    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm, "", numberFormat(d.dt), $commonChart.chartUnit, tool, 0, 0); //툴팁추가 // 2020-12-02 [곽제욱] 차트 변수 추가
		    		}
		    		else if("c2_nm" ==$commonChart.columnVal){
		    			$commonChart.ui.createChartTool($totSurvMㄴain.ui.selectedYear, d.c2_nm, "", numberFormat(d.dt), $commonChart.chartUnit, tool, 0, 0); //툴팁추가 // 2020-12-02 [곽제욱] 차트 변수 추가
		    		}
		    		else if("surv_year" ==$commonChart.columnVal){
		    			$commonChart.ui.createChartTool(d.surv_year, "", "", numberFormat(d.dt), $commonChart.chartUnit, tool, 0, 0); //툴팁추가 // 2020-12-02 [곽제욱] 차트 변수 추가
		    		}
	        		// 상세 cd_nm
	 	    	    else if("cd_nm" ==$commonChart.columnVal){
	 	    	    	$commonChart.ui.createChartTool(d.surv_year, d.cd_nm, "", numberFormat(d.dt), d.unit, tool, 0, 0); //툴팁추가  //20201202 박은식 파라미터 수정 
	 	    	    }
//	            	$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, "", "", d.dt, "", tool, 0, 0); //툴팁추가
	        	}
	        })
	        .on("mouseout", function(){
	            tool.css('display', 'none')
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
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
	
	
}



/**
 * @name         : pieChart 
 * @description  : 파이 차트
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function pieChart(data, target, resizeYn, height, gubun){
	console.log("pieChart !!!!");
	
	if($commonChart.chartData == null || $commonChart.chartData.length == 0 || $commonChart.chartData == ""){
		$("#chartDiv").html($commonChart.noDataHtml);
		return;
	}
	
	if($commonChart.dataType == "itm1"){
		$("#chartDiv").empty();
		$('#chartDiv').css("text-align","center");
		
		// hshs
		var tool = $(".chartPoptoolTip");
		
		var data = $commonChart.chartData;
		var margin = {top: 50, right: 100, bottom: 20, left: 100} //2020.10.21[신예리] margin 추가
		var w = 800, h = 450; //width값 임시 (반응형 처리전) //20210304 박은식 파이차트 width값 수정 (텍스트가 긴 지표처리하기 위함)
		var graphData = [data.length];
		var itemData = [data.length];
		for (var i = 0; i < data.length; i++) {
			// 변경
			if("dt" ==$commonChart.dataVal){
				graphData[i] = data[i].dt;
			}
			if("c1_nm" ==$commonChart.columnVal){
				itemData[i] = data[i].c1_nm;
    		}
    		else if("itm_nm" ==$commonChart.columnVal){
    			itemData[i] = data[i].itm_nm;
    		}
    		else if("c2_nm" ==$commonChart.columnVal){
    			itemData[i] = data[i].c2_nm;
    		}
    		else if("surv_year" ==$commonChart.columnVal){
    			itemData[i] = data[i].surv_year;
    		}
			// 상세 cd_nm
	    	else if("cd_nm" ==$commonChart.columnVal){
	    		itemData[i] = data[i].cd_nm;
	    	}
			
		}
		
		var colorData = $commonChart.colors;
		var pie = d3.pie();
		// 사이즈 조정
		var arc = d3.arc().innerRadius(85).outerRadius(180); //2020.10.21[신예리] 파이차트 크기 조정
		 
		var svg = d3.select("#chartDiv")
		    .append("svg")
		    .attr("width", w)
		    .attr("height", h)
		    .attr("id", "graphWrap");
		 
		var g = svg.selectAll(".pie")
		    .data(pie(graphData))
		    .enter()
		    .append("g")
		    .attr("class", "pie")
		    .attr("transform","translate("+w/1.6+","+h/2+")"); //2020.10.21[신예리] 차트 위치 수정
		 
		g.append("path")
		    .on("mouseover", function(d, i){
		    	console.log("d = " + d);
		    	//20201202 박은식 상세일때와 대시보드일때 파라미터가 다르므로 분기처리 START
		    	if($totSurvMain.ui.pageIndex == 0){
		    		$commonChart.ui.createChartTool(data[i].surv_year, data[i].cd_nm, " ", numberFormat(d.data), data[i].unit, tool, 0, 0);// 툴팁추가 //20201201 박은식 파라미터 수정
		    	} else {
		    		// 2020-12-02 [곽제욱] 공통차트 분기처리 START
		    		if("c1_nm" ==$commonChart.columnVal){
		    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, data[i].c1_nm, " ", numberFormat(d.data), $commonChart.chartUnit, tool, 0, 0);
		    		}
		    		else if("itm_nm" ==$commonChart.columnVal){
		    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, data[i].itm_nm, " ", numberFormat(d.data), $commonChart.chartUnit, tool, 0, 0);
		    		}
		    		else if("c2_nm" ==$commonChart.columnVal){
		    			$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, data[i].c2_nm, " ", numberFormat(d.data), $commonChart.chartUnit, tool, 0, 0);
		    		}
		    		else if("surv_year" ==$commonChart.columnVal){
		    			$commonChart.ui.createChartTool(data[i].surv_year, "", " ", numberFormat(d.data), $commonChart.chartUnit, tool, 0, 0);
		    		}
		    		// 2020-12-02 [곽제욱] 공통차트 분기처리 END
		    	}
		    	//20201202 박은식 상세일때와 대시보드일때 파라미터가 다르므로 분기처리 END
		    })
		    .on("mouseout", function(d, i){
		    	tool.css('display', 'none');
		    })
		    .style("fill", function(d, i) {
		        return colorData[i];
		    }) 
		    .attr("class", function(d){return d.index;})
		    .transition()
		    .duration(50)
		    .delay(function(d, i) { 
		        return i * 50;
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
		
		////////////////////////////////////////////////////////////////////////////
		let radius = Math.min(w, h) / 2;
		let labelArc1 = d3.arc()
	  					 .outerRadius(radius - 25)
				  		 .innerRadius(radius - 25);
		let labelArc2 = d3.arc()
 					 	 .outerRadius(radius - 40)
				  		 .innerRadius(radius - 40);
				  		 
		g.append("text")
		.attr("style", "pointer-events: none;")
	    .attr("class", "pieChartValue")
	    .attr("display", "none")
	    .attr("transform", function(d, i){
	    	var index =  $(this).parent().find("path").attr("class");
	    	return 'translate('+((index%2 == 1) ? labelArc1.centroid(d) : labelArc2.centroid(d))+')';
	    })
	    .attr("dy", ".25em")
	    .style("font", "14px NanumSquare")
	    .style("font-weight", "700")
	    .style("text-anchor", "middle")
	    .style("stroke-width", "3px")
	    .style("opacity", 0.8)
	    .text(function(d, i){ return numberFormat(data[i].dt) });
		 ///////////////////////////////////////////////////////////
		
		
		//2020.10.21[신예리] 파이 차트 합계 중복 코드 삭제 및 위치 조정 START 		
		//파이 차트 값 표시 위치 변경 START
		svg.append("text")
		    .attr("class", "total")
		    .attr("transform", "translate("+(w/1.6-45)+", "+(h/2+5)+")")
		    .text("합계: " + $totSurvMain.util.addComma(d3.sum(graphData)));
		
		svg.append("g")
			.selectAll("circle")
			.data(data)
			.join("circle")
			// 범례 위치 지정 (색)
			.attr("cx", function(d, i){return 15} )
			.attr("cy", function(d, i){ return i*20+30}) // 20201110 박은식 파이차트 택스트 위치 조절
			//.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.attr("r", 4)
			.attr("fill", function(d, i){return colorData[i];})
			
		svg.append("g")
			.selectAll("text")
			.data(pie(data))
			.join("text")
			// 범례 위치 지정 
			.attr("x", function(d, i){ return 25} )
			.attr("y", function(d, i){ return i*20+35})// 20201110 박은식 파이차트 택스트 위치 조절
			//.attr('font-size')
			//.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
			.text(function(d, i) { return itemData[i]; })
			//파이 차트 값 표시 위치 변경 START
		    //2020.10.21[신예리] 파이 차트 합계 중복 코드 삭제 및 위치 조정  END
		$("#chartDiv").append("<button class='ValueOnOff' id='chartValue' title='값 표출'></button>")
		$("#chartValue").attr("style", "position:absolute; margin-top:10px; right: 30px;")
		$("#chartValue").on("click", function(){
			if($(".pieChartValue").css("display") == "none"){
				$(".ValueOnOff").addClass("on")
				$(".pieChartValue").show()
			} else {
				$(".ValueOnOff").removeClass("on")
				$(".pieChartValue").hide()
			}
		})
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
		
}



/**
 * @name         : multiBrokenLineChart 
 * @description  : 멀티 꺾은선 그래프
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function multiBrokenLineChart(data, target, resizeYn, height, gubun){
	console.log("multiBrokenLineChart !!!!");
	
	$("#chartDiv").empty();
	
	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		//$("#chartDiv").html("TODO CHART");
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
}



/**
 * @name         : barBrokenLineChart 
 * @description  : 꺾은선&막대 그래프
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function barBrokenLineChart(){
	console.log("barBrokenLineChart !!!!");
	$("#chartDiv").empty();
	
	
	var height = '400'
	
	
	if($commonChart.dataType == "itm2"){
		
		
		// 인구 - 총조사 인구
		if($commonChart.chartType == "t1"){
			// [총조사인구 차트] 넘어온 데이터 체크  START  2020-10-13  jhs
			var data = $commonChart.chartData;
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
			
			$("#chartDiv").empty();
			var width = $("#chartDiv").outerWidth();
			
			var tool = $(".chartPoptoolTip"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
			var maxVal = d3.max(data, function(d){ return Number(d.dt) });
			//임시 end
			
			//기본셋팅
			var margin = ({top: 30, right: 75, bottom: 20, left: 50})
			
			var color = ["5058b8", "7A82D4", "9AA1E9", "BFC5F7", "DFE2FB", "EBDFFB", "DEC9FB", "D0ADFE", "C092FC", "AE72FE", "894BDB" ]; //2020.10.28[신예리] 차트 컬러 지정
			//var color =  $commonChart.colors;
			
			
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
			const chart = d3.select("#chartDiv");

			//차트 renderer시작
			const svg = chart.append("svg")
		         			 .attr("height", height)
		         			 .attr("width", width);
			
				svg.append("g")
				.attr("fill-opacity", 0.8)
				  .selectAll("rect")
				  .data(data)
				  .join("rect")
				  .attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
				.attr("value", function(d){ return d.surv_year } )
				.on("mousedown", function(d){
					
				})
				.on('mouseover', function(d){
					$commonChart.ui.chartMouseOver($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
					$commonChart.ui.createChartTool(d.surv_year, "총인구","", numberFormat(d.dt), "명", tool, -20, -100); //20201117 박은식 number format 변경
				})
				.on('mouseout', function(){
					$commonChart.ui.chartMouseOut($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
					tool.css("display", "none"); /** 2020-10-07 [곽제욱] 툴팁 수정 */
				})
				.attr("fill", function(d){ //최고값기준으로 해당하는 %에 맞게 색상을 지정
					var dp = ((Number(d.dt)/Number(maxVal))*100); 
					var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
					return "#"+color[num]})
				.attr("x", function(d){ return x(d.surv_year) })
				.attr("width", x.bandwidth())
				.attr("y", function(d){ return y1(0) })
				.attr("color", function(d){ //mouseout event에 사용될 변수
					var dp = ((Number(d.dt)/Number(maxVal))*100); 
					var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
					return "#"+color[num]})
				  .transition()
		          .duration(1250)
		          .delay(function (d, i) {
		        			return i * 50;
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

			svg.append("g")
				.attr("style", "pointer-events: none;")
				  .selectAll("circle")
				  .data(data)
				  .join("circle")
				.on("mouseover", function(d){
					$commonChart.ui.createChartTool(d.surv_year, "증감율","", (d.incORdec == 0) ? "-" : d.incORdec.toFixed(2), (d.incORdec == 0) ? "" : "%", tool, -20, -90); //2020.10.14[신예리] 증감율 툴팁 y값 -100에서 -90으로 변경
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


			  svg.append("g").attr("style", "color:#878A89; font-size:11px;")
				.selectAll("text")
				.data(data)
				.join("text")
				.attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
				.attr("style", "pointer-events: none;") //2020.10.14[신예리] 그래프 증감율 툴팁 선택 
				.attr("id", "chartData")
				.attr("text-anchor", "middle")
				.attr("x", function(d,i){ return x(d.surv_year)+ x.bandwidth() / 2})
				.attr("y", function(d) { return y1(Number(d.dt))-10 })
				.text( function(d){ return numberFormat(d.dt) }) //20201117 박은식 number format 변경
			
			svg.append("g")
				.attr("style", "color:#878A89; font-size:11px;")
				.call(xAxis);

			svg.append("g")
				.call(y1Axis);

			svg.append("g")
				.call(y2Axis);	
			
			d3.selectAll("#textG>g>text").attr("id","textRange")
			$("#textRange").after("<text>%</text>")
			$("#chartDiv").find("text").attr("fill", "#878A89")
			
		}
		// 농업 - 농축산물 판매 금액별
		else if($commonChart.chartType == "t4"){
			
			var data = $commonChart.chartData;
			var height = "400";
			
			$("#chartDiv").empty();
			var width = $("#chartDiv").outerWidth();
			
			//$farmDash.totalPopulationData = data;
			
			var tool = $(".chartPoptoolTip");
			var maxVal = d3.max(data, function(d){ return Number(d.dt) });
			//임시 end
			
			//기본셋팅
			var margin = ({top: 30, right: 55, bottom: 20, left: 45})
			var color = ["37A660", "64C97F", "88E498", "B4F6B9", "D9FAD9" ,"E0FCBC", "D5EB99","BAD56F","88AA29"]; //2020.10.28[신예리] 차트 컬러 지정
			//var color = $commonChart.colors;
			
			var x = d3.scaleBand()
		              //.domain(data.map(function(d){ return d.surv_year }))
					  //.domain(data.map(function(d){ return d.itm_nm }))
					  .domain(data.map(function(d){ return d.itm_nm }))
		              .rangeRound([margin.left, width - margin.right])
		              .padding(0.5);
			var y1 = d3.scaleLinear()
					   .domain([0, d3.max(data, function(d){ return Number(d.dt) })]).nice()
					   .rangeRound([height - margin.bottom, margin.top]);
			var y2 =  d3.scaleLinear()
						.domain([-20, 20])
						.rangeRound([height - margin.bottom, margin.top]);
			
			//var line = d3.line().x(function(d){ return (x(d.surv_year) + (Number(x.bandwidth()) / 2))})
			var line = d3.line().x(function(d){ return (x(d.itm_nm) + (Number(x.bandwidth()) / 2))})
								//.y(function(d){ return y2(d.incORdec) });
								.y(function(d){ return y1(d.dt) });
			
			
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
			var y2Axis = function(g){ return g.attr("transform", 'translate('+(width - margin.right)+',0)')
		            						  .call(d3.axisRight(y2).ticks(5, "s"))
		            						  .call(function(g){ return g.select(".domain").remove() })
		            						  .call(function(g){ return g.append("text")
		            													 .attr("x", margin.right)
		            													 .attr("y", 10)
		            													 .attr("fill", "#878A89")
		            													 .attr("text-anchor", "end")
		            													 .attr("font-size", "15")
		            													 .text(data.y2) })
		  				}
			//타겟설정
			const chart = d3.select("#chartDiv");

			//차트 renderer시작
			const svg = chart.append("svg")
		         			 .attr("height", height)
		         			 .attr("width", width);
			
			
			
				svg.append("g")
				.attr("fill-opacity", 0.8)
				  .selectAll("rect")
				  .data(data)
				  .join("rect")
				//.attr("value", function(d){ return d.surv_year } )
				  .attr("value", function(d){ return d.itm_nm } )
				  .attr("class", "eventGroup")
				.on("mousedown", function(d){
				})
				.on('mouseover', function(d){
					$commonChart.ui.chartMouseOver($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
					$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -20, -100); //20201117 박은식 number format 변경 // 2020-12-02 [곽제욱] 차트 변수 추가
				})
				.on('mouseout', function(){
					$commonChart.ui.chartMouseOut($(this), "#576574"); // 2020.09.22[신예리] 총조사 인구 차트 마우스 오버 컬러 변경
					tool.css("display", "none");
				})
				.attr("fill", function(d){ //최고값기준으로 해당하는 %에 맞게 색상을 지정
					var dp = ((Number(d.dt)/Number(maxVal))*100); 
					var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
					return "#"+color[num]})
				//.attr("x", function(d){ return x(d.surv_year) })
					.attr("x", function(d){ return x(d.itm_nm) })
				.attr("width", x.bandwidth())
				.attr("y", function(d){ return y1(0) })
				.attr("color", function(d){ //mouseout event에 사용될 변수
					var dp = ((Number(d.dt)/Number(maxVal))*100); 
					var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
					return "#"+color[num]})
				  .transition()
		          .duration(1250)
		          .delay(function (d, i) {
		        			return i * 50;
		          })
		        .attr("height",  function(d) {return y1(0) - y1(Number(d.dt)) })
				.attr("y", function(d){ return y1(Number(d.dt)) })
		        //이벤트
				
				//path를 생성하여 변수에 담음
				var path = svg.append("path")
					.datum(data)
					.attr("fill", "none")
					.attr("stroke", "#FFA200") // 2020.09.22[신예리] 총조사 인구 stroke color 변경
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

			svg.append("g")
				.attr("style", "pointer-events: none;")
				  .selectAll("circle")
				  .data(data)
				  .join("circle")
				.on("mouseover", function(d){
					$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, d.itm_nm,"", numberFormat(d.dt), $commonChart.chartUnit, tool, -20, -100); //20201117 박은식 number format 변경 // 2020-12-02 [곽제욱] 차트 변수 추가
				})
				.on("mouseout", function(){
					tool.css("display", "none");
				})
				.attr("fill", "#fff") // 2020.09.22[신예리] 총조사 인구 circle fill color 변경
				.attr("stroke", "#FFA200") // 2020.09.22[신예리] 총조사 인구 circle stroke 추가
				.attr("stroke-width", 2) // 2020.09.22[신예리] 총조사 인구 circle stroke width 추가
				.attr("style", "pointer-events: all;")
				//.attr("cx", function(d){ return x(d.surv_year) + x.bandwidth() / 2 })
				.attr("cx", function(d){ return x(d.itm_nm) + x.bandwidth() / 2 })
				//.attr("cy", function(d){ return y2(d.incORdec) })
				.attr("cy", function(d){ return y1(d.dt) })
				.attr("r", 4)

			svg.append("g")
			   .attr("fill", "none")
			   .attr("pointer-events", "all")
			   .attr("style", "pointer-events: none;")
			     .selectAll("rect")
			     .data(data)
			     .join("rect")
			   //.attr("x", function(d){ return x(d.surv_year) })
			     .attr("x", function(d){ return x(d.itm_nm) })
			   .attr("width", x.bandwidth())
			   .attr("y", 0)
			   .attr("height", height);
			
			// 2020.11.04 [주형식] 수치 표출 추가	
			svg.append("g").attr("style", "color:#878A89; font-size:12px;") 
				.selectAll("text")
				.data(data)
				.join("text")
				.style("cursor", "pointer")
			 	.on("click", function(d, i){
			 	})
			 	.attr("text-anchor", "middle")
				.attr("x", function(d,i){ return x(d.itm_nm)+ x.bandwidth() / 2})
			 	.attr("y", function(d) { return y1(Number(d.dt))-10 })
			 	.text( function(d){ return numberFormat(d.dt) }) //20201117 박은식 number format 변경
				  
			svg.append("g")
				.call(xAxis);

			svg.append("g")
				.call(y1Axis);

			svg.append("g")
				.call(y2Axis);

			$("#chartDiv").find("text").attr("fill", "#878A89")
			
		}
	}
}



/**
 * @name         : compareBarChart 
 * @description  : 막대 그래프(좌우 비교)
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function compareBarChart(){
	console.log("compareBarChart !!!!");
	$("#chartDiv").empty();
	
	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		
		
		var height = '450';
		var data = $commonChart.chartData;
		
		// item 분리
		var column1, column2;
		var colTmp = $commonChart.columnVal.split(",");
		
		column1 = colTmp[0];
		column2 = colTmp[1];
		console.log("column1 = " + column1 + ", column2 = " + column2);
		
		if(data.length == 0 || data.length == undefined){
//			if(target == 'leftTimeGenderAgePopulationChart'){
//				$("#chartArea1").prop("disabled", true);
//				$("#tableArea1").prop("disabled", true);
//			} else {
//				$("#chartArea2").prop("disabled", true);
//				$("#tableArea2").prop("disabled", true);
//			}
			return;
		}

		var margin = ({ left: 80, right: 0, top: 30, bottom: 25 });
		var w = $("#chartDiv").outerWidth()-150;
		var h = height - margin.top - margin.bottom
		var centreSpacing = 0 //가운데 마진값 
		
		var y = d3.scaleBand() // bar 그리는 부분
					// 변경
				  .domain(data.map(function(d){
					  if("age" == $commonChart.dataVal){
						  return d.age 
					  }
				  }))
				  .range([h, 0])
				  .padding(0.1);
		// 변경
		var maxVal = d3.max(data, function(d){
			if("males" == column1 && "females" == column2){
				return d3.max([Number(d.males), Number(d.females)])
			}
		})
		
		var tool = $(".chartPoptoolTip");
		
		var x = d3.scaleLinear()
				  .domain([0, maxVal]).nice()
				  .range([0, (w - centreSpacing)/2 ]);

		var xReverse = d3.scaleLinear()
						 .domain([maxVal, 0]).nice()
						 .range([0, (w - centreSpacing)/2])

		var svg = d3.select("#chartDiv")
					.append('svg')
					.attr("height", height)
					.attr("width", w+100);

	 // male population
	 // create a g element ('group element') into which we will place the bars for the male population
		var gM = svg.append("g")
					.attr('class', 'male')
		 			.attr("transform", "translate(" + (Number(margin.left)) + "," + margin.top + ")");
		
		// create bars for males
		gM.selectAll('rect')
		  .data(data)
		  .enter()
		  .append('rect')
		  .attr('x', function(d){ return (w - centreSpacing) / 2 }) // 시작 x 좌표
		  // 변경
		  .attr('y', function(d){ 
			  if("age" == $commonChart.dataVal){
				  return y(d.age) 
			  }
		  })
		  .attr('height', y.bandwidth())
		  .on("mouseover", function(d){
			  // 변경
			  if("age" == $commonChart.dataVal){
				//$commonChart.ui.createChartTool(d.surv_year, d.age, "  ", d.males.replace(/\B(?=(\d{3})+(?!\d))/g,","), "명", tool, 80, -30);
				  if("males" == column1){
					  $commonChart.ui.createChartTool(d.surv_year, d.age, "", d.males.replace(/\B(?=(\d{3})+(?!\d))/g,","), $commonChart.chartUnit, tool, 80, -30); // 2020-12-02 [곽제욱] 차트 변수 추가
				  }
			  }
				$commonChart.ui.chartMouseOver($(this), "#576574") // 마우스오버 컬러 변경
		  })
		  .on("mouseout", function(){
			  tool.css("display", "none");
			  $commonChart.ui.chartMouseOut($(this), $totSurvMain.ui.tempColor)
		  })
		  .transition()
		  .duration(1000)
		  .delay(function (d, i) {
			  		return i * 50;
		  		})
		  // 변경		
		  .attr('width', function(d){ 
			  if("males" == column1){
				  return x(d.males)
			  }
			  //return x('d.males')
		  })
		  .attr('x', function(d){
			  if("males" == column1){
				  return (w - centreSpacing) / 2 -x(d.males)
			  }
			  //return (w - centreSpacing) / 2 -x(column1)
		  }) // 종료 x
		  .attr('fill', '#21AEF1'); // 2020.09.23[신예리]남 차트 컬러 변경

			
		// female population
		// create g element for bars
		var gF = svg.append("g")
					.attr('class', 'female')
		 			.attr(
		 					'transform',
		 					'translate(' +
		 					(margin.left + (w - centreSpacing) / 2 + centreSpacing) +
		 					"," +
		 					margin.top +
		 					")"
		 			);
		
		// create bars for females
		gF.selectAll('rect')
		  .data(data)
		  .enter()
		  .append('rect')
		  .on("mouseover", function(d){
			  	// 변경
			  	if("age" == $commonChart.dataVal){
			  		if("females" == column2){
			  			$commonChart.ui.createChartTool(d.surv_year, d.age, "  ", d.females.replace(/\B(?=(\d{3})+(?!\d))/g,","), $commonChart.chartUnit, tool, -200, -30); // 2020-12-02 [곽제욱] 차트 변수 추가
			  		}
			  		//$commonChart.ui.createChartTool(d.surv_year, d.age, "  ", column2.replace(/\B(?=(\d{3})+(?!\d))/g,","), "명", tool, -200, -30);
			  	}
				$commonChart.ui.chartMouseOver($(this), "#BC5757") //2020.09.23[신예리] 마우스오버 컬러 변경
		  })
		  .on("mouseout", function(){
			  tool.css("display", "none");
			  $commonChart.ui.chartMouseOut($(this), $totSurvMain.ui.tempColor)
		  })
		  .attr('x', 0)
		  // 변경
		  .attr('y', function(d){
			  if("age" == $commonChart.dataVal){
			  	return y(d.age) 
			  }
		  })
		  .attr('height', y.bandwidth())
		  .attr('width', 0)
		  .transition()
		  .duration(1000)
		  .delay(function (d, i) {
			  		return i * 50;
		  		})
		  // 변경
		  .attr('width', function(d){ 
			  if("females" == column2){
				  return x(d.females)
			  }
//			  return x(column2) 
		  }) //여성인구 width
		  .attr('fill', '#FE5959'); //2020.09.23[신예리] 여자 차트 컬러 변경

			
		// add labels for age groups in the centre of the chart
		// first, a g element for the labels
		var gLabels = svg.append('g')
						 .attr('class', 'label')
		 				 .attr(
		 						 'transform',
		 						 'translate(' +
		 						($("#timeForeignPopulationChart").width()/($("#timeForeignPopulationChart").width()/100)+230)+ ',' + margin.top + ')'
		 				 );

		// 2020.09.22[신예리] font-size 및 컬러 추가 ('나이'주석 처리) START //
		// then, add the labels
		gLabels.selectAll('text')
		 	   .data(data)
		 	   .enter()
		 	   .append('text')
		 	   .attr('fill','#596070')
		 	   .attr("font-size", 12)
		 	   .attr('x', -330)
		 	   // 변경
		 	   .attr('y', function(d){
		 		  if("age" == $commonChart.dataVal){
		 			  return y(d.age) + y.bandwidth() / 2
		 		  }
		 	   })
		 	   .text(function(d, i){ 
		 		   if("age" == $commonChart.dataVal){
		 			   // TODO
		 			   return (i != data.length - 1 ? (i % 5 == 0 ? d.age : '') : '85세 이상')
		 		   }
		 	   });

		// add Male/Female labels
		gF.append('text')
		  //.text('여자(명)')
		  .attr('x', (w - centreSpacing) / 2)
		  .attr('y', h - 7)
		  .attr("font-size", 12)
		  .style('text-anchor', 'end');
	 
		gM.append('text')
		  //.text('남자(명)')
		  .attr('x', 0)
		  .attr('y', h - 7)
		  .attr("font-size", 12)
		  .style('text-anchor', 'start');

		// add an axis for female pop values
		gF.append("g")
		  .attr('transform', 'translate(0,' + (h + 3) + ')')
		  .call(d3.axisBottom(x).ticks(w / 80, "s"));

		// add an axis for male pop values
		gM.append("g")
		  .attr('transform', 'translate(0,' + (h + 3) + ')')
		  .call(d3.axisBottom(xReverse).ticks(w / 80, "s"));
		
		
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
}



/**
 * @name         : areaChart 
 * @description  : 면적챠트
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function areaChart(data, target, resizeYn, height, gubun){
	console.log("areaChart !!!!");
	$("#chartDiv").empty();
	
	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		
		
		var data = $commonChart.chartData;
		
		//$("#chartDiv").html("농업 - 인구와 농가인구의 연령대별 분포");
		var margin = ({ top: 10, right: 10, bottom: 40, left: 35}); //2020.10.20[신예리] margin값 수정
			
			
		var tool = $(".chartPoptoolTip"); 
			
		   const height = 450;
		   const width = 800;

		   const innerHeight = height- margin.top - margin.bottom;
		   const innerWidth = width - margin.left - margin.right;

		   const keys = Object.keys(data[0]).slice(1);

		   const stack = d3.stack()
		     .keys(keys)
		     .order(d3.stackOrderDescending); // so that the largest grouping is stacked below the others

		   const series = stack(data);
		   //const series = stack(farmAgeData);

		   // set up the x scale
		   const xScale = d3.scaleLinear()
		   .domain(d3.extent(data, function(d){ return d.seq }))
		   .range([0, innerWidth]);
		   
		   const yScale = d3.scaleLinear()   // 이거만 하면 차트가 뒤바뀜
		      .domain([
		    	d3.min(series, function(series){ return d3.min(series, function(d){ return 0 })}),
		        d3.max(series, function(series){ return d3.max(series, function(d){ return d[1] }) })
//		    	  0,25,50,75,100
		      ])
		      .range([innerHeight, 0]);
		   
		  const y2 = d3.scaleLinear()
		   .domain([0, 100]).nice()
		   .rangeRound([height - margin.bottom, margin.top])
		   
		   // bottom axis generator
		  const xAxis = d3.axisBottom()
		     .scale(xScale)
		     .ticks(4, "s")
		     .tickFormat(d3.format(''));

		  // left axis generator
		  const yAxis = d3.axisLeft()
		     .scale(yScale)
		     .tickValues([0, 25, 50, 75, 100])
		     .tickFormat(function(d) { return d+'%'});
		
		   // color scale
		   const cScale = d3.scaleOrdinal(["#C7DE44", "#FFE065"]); //2020.10.20[신예리] 차트 컬러 변경

		//타겟설정
		const chart = d3.select("#chartDiv");

		//차트 renderer시작
		const svg = chart.append("svg")
			.attr("height", height)
			.attr("width", width);
		   
		   const main = svg.append('g')
		     .attr('class', 'main')
		     .attr('transform', 'translate('+margin.left+', '+margin.top+')');


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
		   .y0(function(d){ return yScale(d[0]) })
		   .y1(function(d){ return yScale(d[1]) })

		  // create the stacked area paths
		  main2.selectAll('.area')
		    .data(series)
		    .enter().append('path')
		        .attr('class', 'area')
		        .attr('fill', function(d){ return cScale(d.key) })
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
		   .y0(function(d){ return yScale(d[0]) })
		   .y1(function(d){ return yScale(d[1]) })

		  // create the stacked area paths
		  main3.selectAll('.area')
		    .data(series)
		    .enter().append('path')
		        .attr('class', 'area')
		        .attr('fill', function(d) { return cScale(d.key) })
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
		      .call(d3.axisBottom(x).ticks(4, "s").tickFormat(function(i) 
		    	{ 
		    	  return (data[i].itm_nm).indexOf(":") == -1 ?  data[i].itm_nm : (data[i].itm_nm).split(":")[1]   
		    	}).tickSizeOuter(15))
		     }
			  
		     svg.append("g").call(xAxis1);  
		//$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
}



/**
 * @name         : percentageHorizontalBarChart 
 * @description  : 막대 그래프(백분율)
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function percentageHorizontalBarChart(data, target, resizeYn, height, gubun){
	console.log("percentageHorizontalBarChart !!!!");
	$("#chartDiv").empty();
	
	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		//$("#chartDiv").html("TODO CHART");
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
}



/**
 * @name         : accmltVerticalBarChart 
 * @description  : 막대 그래프(세로 누적)
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function accmltVerticalBarChart(data, target, resizeYn, height, gubun){
	console.log("accmltVerticalBarChart !!!!");
	$("#chartDiv").empty();

	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		//$("#chartDiv").html("TODO CHART");
		//$("#chartDiv").html(">>>> 주택 - 빈집 차트");
		
		$("#chartDiv").empty();
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
		
		resultData = $commonChart.chartData;
		var height = '450';
		
		var max = [];
		var year = [];
		var itm_cd = [];
		var c1 = ['10', '20', '30', '40', '50'];
		//data 차트에 적용할 수 있도록 변환 작업 START
		for(var i=0;i<resultData.length; i++){ //지표 선별
			
			if(data.year.indexOf(resultData[i].itm_nm) == -1){
				if(resultData[i].c1 == '00'){
					max.push(resultData[i].dt)
				}
				data.itm_cd.push(resultData[i].itm_cd)
				data.year.push(resultData[i].itm_nm);
				itm_cd.push(resultData[i].itm_cd)
				year.push(resultData[i].itm_nm)
			}
		}
		var tempData = {};
		for(var i=0;i<year.length;i++){ //빈값 0으로 데이터 추가 
			for(var j=0; j < resultData.length; j++){
				if(Object.keys(tempData).indexOf(year[i]) == -1){
					tempData[year[i]] = [];
				}
				if(year[i] == resultData[j].itm_nm){
					tempData[year[i]].push(resultData[j])
				}
			}
		}
		
		
		for(var i=0;i<year.length;i++){ //data 정렬
			var tempC1 = [];
			for(var j=0;j<tempData[year[i]].length;j++){
				tempC1.push(tempData[year[i]][j].c1);
			}
			
			for(var j=0 ; j <= 5 ; j++){
				if(tempC1.indexOf(((j == 0) ? '00' : j*10+"")) > -1){
					continue;
				}else{
					tempData[year[i]].push({'itm_nm':year[i], 'c1':((j == 0) ? '00' : j*10+"") , 'dt':0})
				}
			}
			
		}
			
		
		var tempList = [];
		for(var i=0;i<year.length;i++){ //차트에 맞게 data 가공
			var k = 0;
			while(1){
				if(tempData[year[i]][k].c1 == ((k == 0) ? '00' : k*10+"")){
					tempList.push(tempData[year[i]][k])
				}
				k++;
				if(tempList.length%6 != 0 &&  k == 6){
					k = 0;
				}
				if(tempList.length%6 == 0 &&  k == 6){
					k = 0;
					break;
				}
			}
				
		}
		
		
		for(var i=0; i < year.length; i++){		
			for(var j=0; j < 6; j++){
				switch(tempData[year[i]][j].c1){
					case "10" : 
						data.house.push(tempData[year[i]][j].dt/max[i]*100);
						data.houseDt.push(tempData[year[i]][j].dt)
						break;
					case "20" : 
						data.apartment.push(tempData[year[i]][j].dt/max[i]*100)
						data.apartmentDt.push(tempData[year[i]][j].dt)
						break;
					case "30" :
						data.multifamily.push(tempData[year[i]][j].dt/max[i]*100)
						data.multifamilyDt.push(tempData[year[i]][j].dt)
						break;
					case "40" :
						data.rowHouses.push(tempData[year[i]][j].dt/max[i]*100)
						data.rowHousesDt.push(tempData[year[i]][j].dt)
						break;
					case "50" :
						data.nonResident.push(tempData[year[i]][j].dt/max[i]*100)
						data.nonResidentDt.push(tempData[year[i]][j].dt)
						break;
					default :
						break;
				}
			}
		}
		//data 차트에 적용할 수 있도록 변환 작업 END
		
		var tool = $(".chartPoptoolTip"); //툴팁 생성
		
		const width = "1200", //20201117 박은식 width값 변경
		  margin = { top: 20, right: 40, bottom: 20, left: 40 },
		  chartWidth = width - margin.left - margin.right,
		  chartHeight = height - margin.top - margin.bottom;

		// convert to a list of { Issue, house, Disapprove, None }
		const transformedData = data.year.map(function(year, index){ return ({
		  year:data.year[index],
		  //상대값
		  house: data.house[index],
		  apartment: data.apartment[index],
		  multifamily: data.multifamily[index],
		  rowHouses: data.rowHouses[index],
		  nonResident: data.nonResident[index],
		  c1:data.c1[index],
		  itm_cd:data.itm_cd[index],
		  region_cd:data.surv_id[index],
		  //절대값
		  houseDt:data.houseDt[index],
		  apartmentDt:data.apartmentDt[index],
		  multifamilyDt:data.multifamilyDt[index],
		  rowHousesDt:data.rowHousesDt[index],
		  nonResidentDt:data.nonResidentDt[index]
		}) });

		const answers = ['house', 'apartment', 'multifamily','rowHouses','nonResident'];

		const x = d3
		  .scaleBand()
		  .paddingInner(0.1)
		  .range([0, chartWidth])
		  .domain(data.year);
		const y = d3.scaleLinear().range([chartHeight, 0]).domain([0, 100]);
		const z = d3
		  .scaleOrdinal()
		  .range(['#08589e', '#2b8cbe', '#4eb3d3', '#7bccc4', '#a8ddb5', '#ccebc5', '#e0f3db', '#f7fcf0'])
		  .domain(answers);

		const stack = d3.stack().keys(answers)(transformedData);

		const svg = d3
		  .select('#chartDiv')
		  .append('svg')
		  .attr('width', width)
		  .attr('height', height);

		const chart = svg
		  .append('g')
		  .attr('width', chartWidth)
		  .attr('height', chartHeight)
		  .attr('transform', 'translate('+margin.left+','+margin.top+')');

		// Add the X-axis
		const xAxis = d3.axisBottom().scale(x).tickSize(0);

		chart
		  .append('g')
		  .attr('class', 'x axis')
		  .attr('transform', 'translate(0,'+chartHeight+')')
		  .call(xAxis)
		  .selectAll('text')
		  .style('text-anchor', 'center') 
		  .attr('fill','#576574');

		// Add the Y-axis
		const yAxis = d3
		  .axisLeft()
		  .scale(y)
		  .tickFormat(function(d){return (d === 100 ? '100%' : d) })
		  .tickSize(15).ticks(4, "s");

		chart
		  .append('g')
		  .attr('class', 'y axis')
		  .attr('transform', 'translate(-10, 0)')
		  .call(yAxis)
		  .selectAll('text')
		  .attr('transform', 'translate(16, -10)')
		  .attr('fill','#576574');

		const serieColor = function(d){ return z(d.key) }; 

		const serie = chart
		  .selectAll('.serie')
		  .data(stack)
		  .enter()
		  .append('g')
		  .attr('class', 'serie')
		  .attr('id', function(d, i){return 'serie'+(i+1)*10})
		  .attr('fill', serieColor)
		  .attr('c1', function(d, i){return (i+1)*10});

		const bar = serie
		  .selectAll('.bar')
		  .data(
				function(data, i, nodes) {
						return data.map(function(d){
											d.value = d.data[nodes[i].__data__.key];
											return d;
										}	
								)
				}
			)
		  .enter()
		  .append('g')
		  .attr('class', 'bar')
		  .attr('itm_cd', function(d, i){return itm_cd[i]});
		
		
		
			bar
			  .append('rect')
			  .attr("class", "eventGroup")
			  .on("click", function(d, i){
//				  var param = {};
//				  param.c1 = $(this).parent().parent().attr('c1');
//				  param.surv_id = "PH0290";
//				  param.itm_cd = $(this).parent().attr('itm_cd');
//				  $totSurvMain.ui.chartTarget = $(this).parent().parent().attr('id')
//				  $totSurvMain.ui.chartIndex = $(this).parent().index()
//				  $totSurvMain.ui.chartData = param;
//				  $totSurvMain.ui.chartColor = "#576574";
//				  $totSurvMain.ui.chartTitle = d.data.year+" 주택종류별 빈집 (" + d.c1_nm + ")";
//				  $houseDash.ui.chartItmClick($(this), param, "#576574",d.data.year+" 주택종류별 빈집 (" + d.c1_nm + ")");
			  })
			  .on('mouseover', function(d){
				  var c1 = $(this).parent().parent().attr('c1');
				  var dt = '';
				  switch(c1){
					case "10" : 
						d.c1_nm = '단독주택';
						dt = d.data.houseDt;
						break;
					case "20" : 
						d.c1_nm = '아파트';
						dt = d.data.apartmentDt;
						break;
					case "30" :
						d.c1_nm = '연립주택';
						dt = d.data.multifamilyDt;
						break;
					case "40" :
						d.c1_nm = '다세대주택';
						dt = d.data.rowHousesDt;
						break;
					case "50" :
						d.c1_nm = '비거주용 건물내 주택';
						dt = d.data.nonResidentDt;
						break;
					default :
						break;
				  }
				  $commonChart.ui.chartMouseOver($(this), "#576574");
				  $commonChart.ui.createChartTool(d.data.year.replace("년", ""), d.c1_nm,"", numberFormat(dt), "호", tool, -20, -100); // 2020-12-02 [곽제욱] 오류 수정
			  })
			  .on('mouseout', function(){
				  $commonChart.ui.chartMouseOut($(this), "#576574");
				  tool.css("display", "none");
			  })
			  .attr('x', function(d){ return x(d.data.year) })
			  .attr('width', x.bandwidth())
			  .transition()
		          .duration(1250)
		          .delay(function (d, i) {
		        			return i * 50;
		          })
			  .attr('y', function(d){ return y(d[1]) })
			  .attr('height', function(d){ if(typeof(d.value) == 'string' || d.value == undefined){return 0}else{ return y(d[0]) - y(d[1]) }})
			  .style("cursor", "pointer");

		bar
		  .append('text')
		  .attr('x', function(d){ return x(d.data.year) + x.bandwidth() / 2 })
		  .attr('y', function(d){ if(typeof(d.value) == 'string' || d.value == undefined){return 0}else{ return y(d[1]) + (y(d[0]) - y(d[1])) / 2 }})
		  .attr('dy', '0.35em')
		  .attr('text-anchor', 'middle')
		  .attr("style", "pointer-events: none;")
		  .attr('fill', '#fff')
		  .attr('font-weight','700')
		  .attr('font-size','12px')
		  .text(function(d){if(typeof(d.value) == 'string'){return}else{ return (d.value > 11 ? d.value.toFixed(1) : '') }});

		d3.selectAll('.serie')
		  .selectAll('rect')
		  .attr('fill', function(){return $(this).parent().parent().attr('fill')})
		
		//$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
}



/**
 * @name         : accmltHorizontalBarChart 
 * @description  : 막대 그래프(가로 누적)
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function accmltHorizontalBarChart(data, target, resizeYn, height, gubun){
	console.log("accmltHorizontalBarChart !!!!");
	$("#chartDiv").empty();

	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		//$("#chartDiv").html("TODO CHART");
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
}



/**
 * @name         : groupVerticalBarChart  
 * @description  : 막대 그래프(세로) 그룹
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function groupVerticalBarChart(data, target, resizeYn, height, gubun){
	console.log("groupVerticalBarChart !!!!");
	$("#chartDiv").empty();

	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		//$("#chartDiv").html("TODO CHART");
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
}



/**
 * @name         : multiRadialChart 
 * @description  : 방사형 멀티
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function multiRadialChart(data, target, resizeYn, height, gubun){
	console.log("multiRadialChart !!!!");
	$("#chartDiv").empty();

	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		//$("#chartDiv").html("TODO CHART");
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
}



/**
 * @name         : bubbleChart 
 * @description  : 버블 차트
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function bubbleChart(data, target, resizeYn, height, gubun){
	console.log("bubbleChart !!!!");
	$("#chartDiv").empty();

	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		//$("#chartDiv").html("TODO CHART");
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
}



/**
 * @name         : histogramChart 
 * @description  : 히스토그램 차트
 * @date         : 2020.10.19
 * @author	     : hsJu
 * @history 	 : 
 */
function histogramChart(data, target, resizeYn, height, gubun){
	console.log("histogramChart !!!!");
	$("#chartDiv").empty();
	
	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		$("#chartDiv").html("TODO CHART");
	}
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
}


/**
 * @name         : houseHoleAreaChart 
 * @description  : 가구-성별, 연령별 가구의 주택 차트
 * @date         : 2020.10.26
 * @author	     : hsJu
 * @history 	 : 2020.11.04   변경된 차트로 변경
 */
function houseHoleAreaChart(){
	console.log("houseHoleAreaChart !!!!");
	$("#chartDiv").empty();
	
	if($commonChart.dataType == "itm1"){
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	else if($commonChart.dataType == "itm2"){
		
		// t2
		$("#chartDiv").empty();
		
		var data = [];
		
		var tool = $(".chartPoptoolTip"); //툴팁 생성
		
		var c2 = [];
		var itm_nm = []; 
		var itm_cd = []; 
		for(var i=0; i<16;i++){
			data.push({});
		}
		var columns = [];
		columns.push("columns")
		
		var resultData = $commonChart.chartData;
		var height = '450';
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
					color = "#008457";
					break;
				case "주택_아파트":
					itm_cd = "T22";
					color = "#009E58";
					break;
				case "주택_다세대주택":
					itm_cd = "T23";
					color = "#30B457";
					break;
				case "주택_연립주택":
					itm_cd = "T24";
					color = "#60BB46";
					break;
				case "주택_비거주용건물 내 주택":
					itm_cd = "T25";
					color = "#9ACD66";
					break;
				case "주택이외 거처_오피스텔":
					itm_cd = "T31";
					color = "#BCD73F";
					break;
				case "주택이외 거처_호텔 · 여관등 숙박업소의 객실":
					itm_cd = "T32";
					color = "#D9E13C";
					break;
				case "주택이외 거처_기숙사 및 특수 사회시설":
					itm_cd = "T33";
					color = "#E8E96B";
					break;
				case "주택이외 거처_판잣집,비닐하우스":
					itm_cd = "T34";
					color = "#ECED86";
					break;
				case "주택이외 거처_기타":
					itm_cd = "T35";
					color = "#EAF1BA";
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
		$("#chartDiv").empty();
		var width = $("#chartDiv").outerWidth();
		const chart = d3.select("#chartDiv");
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
	  
		const color = ['#008457', '#009E58', '#30B457', '#60BB46', '#9ACD66', '#BCD73F', '#D9E13C', '#E8E96B','#ECED86','#EAF1BA']; //2020.11.02[신예리] color추가
		const rects = gSvg.selectAll("g").data(series).enter()
	    				  .append("g")
	    				  .attr("class", function(d, i){ return "eventGroup"+i})
	    				  .attr("itm_cd", function(d,i){return itm_cd[i]})
	    				  .attr("itm_nm", function(d,i){return itm_nm[i]})
	    				  //.attr("fill", function(d){ return color(d.key) }); //Color is assigned here because you want everyone for the series to be the same color
		
			rects.selectAll("rect")
			.data(function(d){ console.log(d);return d})
			.join("rect")
			.attr("fill", function(d,i){
				return itmCdReturn($(this).parent().attr("itm_nm"), "1")
			})
			.attr("x", function(d, i){return xScale(d.data.category)})
			.attr("y", function(d){ return yScale(d[1]) })
			.attr("title", function(d){return d.data.category})
			.attr("width", xScale.bandwidth())
			.on("mouseover", function(d){
				var title = ($(this).parent().attr("itm_nm")).replace("주택", "");
				$commonChart.ui.chartMouseOver($(this), "#576574");
				// 2020-12-02 [곽제욱] 차트 변수 추가, 2021-08-04 [이영호] 누적 제거  numberFormat(d[1]-d[0]
				$commonChart.ui.createChartTool($totSurvMain.ui.selectedYear, title + " " + $(this).attr("title"),"", numberFormat(d[1]-d[0]), $commonChart.chartUnit, tool, -20, -100);
			})
			.on("mouseout", function(d){
				$commonChart.ui.chartMouseOut($(this), "#576574");
				tool.hide();
			})
			.on("click", function(d){
//				var c2 = c2Return($(this).attr("title"));
//				var data = {
//		 				surv_id : "PH0196",
//		 				itm_cd : $(this).parent().attr("itm_cd"),
//		 				c1 : "0",
//		 				c2 : c2,
//		 				idx : $(this).parent().index()
//		 		}
//				var title = ($(this).parent().attr("itm_nm")).replace("주택_", "") + " " + $(this).attr("title");
//				$totSurvMain.ui.chartTarget = target
//				$totSurvMain.ui.chartIndex = $(this).index()
//				$totSurvMain.ui.chartData = data;
//				$totSurvMain.ui.chartColor = "#576574";
//				$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 "+d.itm_nm;
//		    	$houseHoldDash.ui.chartItmClick($(this).parent().find("rect").eq(i), data, "#576574", $totSurvMain.ui.selectedYear+"년 "+title);
			})
			.attr("height",function(d){
				return (!isNaN(yScale(d[0]) - yScale(d[1]))) ?  yScale(d[0]) - yScale(d[1]) : 0})

			
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
	else{
		$("#chartDiv").html($commonChart.noDataHtml);
	}
	
}


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
 * @name : chartModal
 * @description : 다른 유형의 차트 보기
 * @date : 2020.10.19
 * @author : jhs
 * @history :
 * @param  data      데이터
 * 		   dataType  데이터유형 (아이템 갯수 1 : itm1, 아이템 갯수 2 : itm2, 아이템 갯수 3 : itm3)
 *         columnVal 컬럼값   (ex) itm_nm, c1_nm..
 *         dataVal   데이터값 (ex) dt ...   
 *         chartType 아이탬 갯수 2일때 차트 타입 (항목2일때 어떤차트인지 구분하기 위한 변수)
 *         인구-총조사인구 t1, 가구-성별연령별 가구의 주택 t2, 주택종류별 빈집 t3, 농업-농축산물 판매금액별 t4, 농업-인구와농가인기의 연령대별 분포 t5 , 임업 X)
 */
function chartModal(data, dataType, columnVal, dataVal, chartType, titleSubNm , unit) { // 2020-12-02 [곽제욱] 공통차트 변수 추가
	
	console.log("[chartModal] dataType = " + dataType + ", columnVal = " + columnVal + ", dataVal = " + dataVal + ", chartType= " + chartType);
	
	//d3의 데이터를 담는 변수
	$commonChart.chartData = data;
	// 현재 차트 타입
	$commonChart.dataType = dataType;
	// 컬럼 항목
	$commonChart.columnVal = columnVal;
	// 데이터 항목
	$commonChart.dataVal   = dataVal;
	// chart 타입
	$commonChart.chartType = chartType;
	
	// 2020-12-02 [곽제욱] 공통차트 변수 추가 START
	// 소제목명
	$commonChart.titleSubNm = titleSubNm;
	
	$commonChart.chartUnit = unit;
	// 2020-12-02 [곽제욱] 공통차트 변수 추가 END
	
    var zIndex = 9999;
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
    
    $commonChart.ui.init();
    
}

/**
 * @name : highChartModal
 * @description : 다른 유형의 차트 보기
 * @date : 2021.08.25
 * @author : 이영호
 * @history :
 * @param  data      데이터
 */
function highChartModal(data, chartType) { // 2021-08-25 [이영호] 공통차트 변수 추가
	$("[class^=chartKind]").removeClass("on");
	$('.chartKind04').hide();		//막대 그래프(백분율)
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
				
	let chartObjData = {};
	for(var i=0; i<data.length; i++) {
		if(Object.keys(chartObjData).length != 0) {
			let isAlready = false;
			for(var j=0; j<Object.keys(chartObjData).length; j++) {
				if(data[i].CHAR_ITM_ID == Object.keys(chartObjData)[j]) {
					isAlready = true;
				}
			}
			if(isAlready) {
				chartObjData[data[i].CHAR_ITM_ID].push(data[i]);
			} else {
				chartObjData[data[i].CHAR_ITM_ID] = [];
				chartObjData[data[i].CHAR_ITM_ID].push(data[i]);
			}		
		} else {
			chartObjData[data[i].CHAR_ITM_ID] = [];
			chartObjData[data[i].CHAR_ITM_ID].push(data[i]);
		}
	}

	//HighChart의 데이터를 담는 변수
	$commonChart.chartData = chartObjData;
	// 현재 차트 타입
	$commonChart.chartType = chartType;
	$commonChart.dataType = "HighChart";
	var zIndex = 9999;
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

	$('.chartKind00').addClass("on");
	horizentalBarHighChart($commonChart.chartData, $commonChart.chartType);
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
 * @name         : horizentalBarHighChart 
 * @description  : 세로 바 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function horizentalBarHighChart(data, type) {
	var colorPt = ["#f08246", "#009589"];
	var chartData = [], categories = [];
	
	var isAlready = false, ovLv;
	
	let maxVal = 0, sumVal = [];
	let chartOpt = type[0];
	let dataArr = [];
	let defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"], colorCnt = 0;
	if((typeof type) == "object") {
		for(let i=0; i<type.length; i++) {
			if(type[i].dispVarOrd == 0) {
				for(let j=0; j<Object.keys(data).length; j++) {
					let key = Object.keys(data)[j];
					if(type[i].varOrd == type[i].dispVarOrd) {
						for(let k=0; k<data[key].length; k++) {
							if(type[i].itmId == data[key][k]["CHAR_ITM_ID"]) {
								if(type[i].subsumYn != "Y") {
									dataArr.push(
										{
											y:parseFloat(data[key][k].DTVAL_CO)
											, color: defaultColors[colorCnt]
										}
									);
									categories.push(data[key][k]["CHAR_ITM_NM"]);
									
									if(maxVal < data[key][k].DTVAL_CO) {
										maxVal = parseFloat(data[key][k].DTVAL_CO);
									}
									colorCnt++;
								}
							}
						}
					}
				}
			} else {
				for(let j=0; j<Object.keys(data).length; j++) {
					let key = Object.keys(data)[j];
					if(type[i].varOrd == type[i].dispVarOrd) {
						for(let k=0; k<data[key].length; k++) {
							if(type[i].itmId == data[key][k]["OV_L" + type[i].dispVarOrd + "_ID"]) {
								if(type[i].subsumYn != "Y") {
									dataArr.push(
										{
											y:parseFloat(data[key][k].DTVAL_CO)
											, color: defaultColors[colorCnt]
										}
									);
									categories.push(data[key][k]["OV_L" + type[i].dispVarOrd + "_KOR"]);
									
									if(maxVal < data[key][k].DTVAL_CO) {
										maxVal = parseFloat(data[key][k].DTVAL_CO);
									}
									colorCnt++;
								}
							}
						}
					}
				}
			}
		}
	} else if((typeof type) == "string"){
		if(type == "year") {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				for(let k=0; k<data[key].length; k++) {
					dataArr.push(
						{
							y:parseFloat(data[key][k].DTVAL_CO)
							, color: defaultColors[colorCnt]
						}
					);
					categories.push(data[key][k]["PRD_DE"]);
					
					if(maxVal < data[key][k].DTVAL_CO) {
						maxVal = parseFloat(data[key][k].DTVAL_CO);
					}
					colorCnt++;
				}
			}
		} else if(type == "area") {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				for(let k=0; k<data[key].length; k++) {
					let chartOpt = $inMoreDetail.ui.dispOptions[$("#chrItmList option:selected").data("chartord")];
					dataArr.push(
						{
							y:parseFloat(data[key][k].DTVAL_CO)
							, color: defaultColors[colorCnt]
						}
					);
					categories.push(data[key][k]["OV_L" + chartOpt[0].regionVarOrd + "_KOR"]);
					
					if(maxVal < data[key][k].DTVAL_CO) {
						maxVal = parseFloat(data[key][k].DTVAL_CO);
					}
					colorCnt++;
				}
			}
		}
	}
	
	chartData.push({name: type[0].chartNm, data: dataArr, pointWidth: 15});
	
	/*for(var i=Object.keys(data).length-1; i>=0; i--) {
		let ds = data[Object.keys(data)[i]];
		let dsMax = 0;	

		
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
				
				if(type[0].dispUnitNm != "%") {
					let dtval = parseInt(ds[j].DTVAL_CO);
					dataArr.push(dtval);
					if(maxVal < dtval) {
						maxVal = dtval;
					}
				} else {
					for(var k=0; k<$ecnmyDash.currentData.salesOfIndustry.length; k++) {
						if(ds[j]["OV_" + $ecnmyDash.itmLv.split("_")[1].toUpperCase() + "_ID"] == $ecnmyDash.currentData.salesOfIndustry[k]["OV_L" + $ecnmyDash.ui.dispOptions[4][0].dispVarOrd + "_ID"]) {
							let dtval = (ds[j].DTVAL_CO != undefined ? ds[j].DTVAL_CO : 0);
							dataArr.push({y:parseFloat((parseInt(dtval)/parseInt($ecnmyDash.currentData.salesOfIndustry[k].DTVAL_CO)*100).toFixed(1)), color: $ecnmyDash.chartsOption.color[0]});
							
							if(maxVal < parseInt(dtval)) {
								maxVal = parseFloat((parseInt(dtval)/parseInt($ecnmyDash.currentData.salesOfIndustry[k].DTVAL_CO)*100).toFixed(1));
							}	
						}
					}
				}				
			}
			
			var isAlready = false;
			for(var k=0; k<type.length; k++) {
				if(type[k].itemId != "13999001") {
					if(type[k].itmId == ds[j]["OV_L" + ovLv + "_ID"]) {
						categories.push(type[k].scrKor);
						isAlready = true;	
					}
				}			
			}
			if(!isAlready) {
				categories.push(ds[j]["OV_L" + ovLv + "_KOR"]);
			}
		}
		chartData.push({name: data[Object.keys(data)[i]][0].CHAR_ITM_NM, data: dataArr, pointWidth: 15 });		
	}*/

	maxVal = maxVal + maxVal * (maxVal.toString().length/70);

	var chartDiv = $('#chartDiv').highcharts({
		chart: {
	        type: 'bar',
	        events: {
				load: function() {
					$("#chartDiv .highcharts-root").css("width", "auto");
					highChartInitOption(this);
				},
				redraw: function() {
					$("#chartDiv .highcharts-root").css("width", "auto");
					highChartInitOption(this);
				}
			},
	    },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		legend: {
	        enabled: false			
	    },
	    credits: {
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
						return "<b>" + this.key + ": <br/>" + numberFormat(this.y) + type[0].kosisUnitNm + "</b>" ;
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
				},
				style: {
					textOverflow: "clip"
				},
				x: -5
			}
	    },
		yAxis: {
			max: maxVal,
			min: 0,
	        title: {
				text: null
			},
			lineWidth: 1,
			stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					fontFamily: 'NanumSquare',
					textOutline: "none"
                },
				formatter: function() {
					if(type[0].dispUnitNm != "%") {
						return numberFormat(Math.round(this.total)) + chartOpt.kosisUnitNm;
					} else {
						return this.total + "%";
					}
				}
            },
            labels: {				
				formatter: function() {
					if(type[0].dispUnitNm != "%") {
						//return numberFormat(this.value) + chartOpt.kosisUnitNm;
						return this.value;
					} else {
						return this.value.toFixed(1) + "%";
					}				
				}
			}
	    },
		series: chartData
	});
	
	$('#chartDiv .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#chartDiv .highcharts-data-labels span').last().css("top", "10px");
	
	var textArr = $("#chart_modal .highcharts-label text");;
	for(var i=0; i<textArr.length; i++) {
		if(!$(textArr[i]).attr("isUpdateComplete")) {
			let maxWidth = $(textArr[i])[0].getClientRects()[0].x + $(textArr[i])[0].getClientRects()[0].width;
			let maxHeight = $(textArr[i])[0].getClientRects()[0].y + $(textArr[i])[0].getClientRects()[0].height;
			let sizeX = $(textArr[i])[0].getClientRects()[0].width;
			let sizeY = $(textArr[i])[0].getClientRects()[0].height;
			for(var j=0; j<textArr.length; j++) {
				if(!$(textArr[i]).attr("isUpdateComplete")) {
					if(i != j) {
						let maxWidth2 = $(textArr[j])[0].getClientRects()[0].x + $(textArr[j])[0].getClientRects()[0].width;
						let maxHeight2 = $(textArr[j])[0].getClientRects()[0].y + $(textArr[j])[0].getClientRects()[0].height;
						let sizeX2 = $(textArr[j])[0].getClientRects()[0].width;
						let sizeY2 = $(textArr[j])[0].getClientRects()[0].height;
						if(Math.abs(maxWidth2 - maxWidth) <= sizeX) {
							if(Math.abs(maxHeight2 - maxHeight) <= sizeY) {
								$(textArr[i]).attr("y", parseFloat($(textArr[i]).attr("y")) - 15);
								$(textArr[i]).attr("isUpdateComplete", true);
							}
						}
					}
				}
			}
		}
	}
}

/**
 * @name         : verticalBarHighChart 
 * @description  : 가로 바 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function verticalBarHighChart(data, type) {  
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
	let dataArr = [];
	let defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"], colorCnt = 0;
	
	for(let i=0; i<type.length; i++) {
		if(type[i].dispVarOrd == 0) {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["CHAR_ITM_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y:parseFloat(data[key][k].DTVAL_CO)
										, color: defaultColors[colorCnt]
									}
								);
								categories.push(data[key][k]["CHAR_ITM_NM"]);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
								colorCnt++;
							}
						}
					}
				}
			}
		} else {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["OV_L" + type[i].dispVarOrd + "_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y:parseFloat(data[key][k].DTVAL_CO)
										, color: defaultColors[colorCnt]
									}
								);
								categories.push(data[key][k]["OV_L" + type[i].dispVarOrd + "_KOR"]);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
								colorCnt++;
							}
						}
					}
				}
			}
		}
	}
	
	chartData.push({name: type[0].chartNm, data: dataArr, pointWidth: 15 });
	
	maxVal = maxVal + maxVal * (maxVal.toString().length/70);

	var chartDiv = $('#chartDiv').highcharts({
		chart: {
	        type: 'column',
	        events: {
	        	load: function() {
	        		$("#chartDiv .highcharts-root").css("width", "auto");
	        	}
	        }
	    },
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		legend: {
	        enabled: false			
	    },
	    credits: {
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
						return "<b>" + this.key + ": <br/>" + numberFormat(this.y) + type[0].kosisUnitNm + "</b>" ;
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
                allowOverlap: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					fontFamily: 'NanumSquare'
                },
				formatter: function() {
					if(type[0].dispUnitNm != "%") {
						return numberFormat(Math.round(this.total)) + chartOpt.kosisUnitNm;
					} else {
						return this.total + "%";
					}
				}
            },
            labels: {				
				formatter: function() {
					if(type[0].dispUnitNm != "%") {
						return this.value;
					} else {
						return this.value.toFixed(1) + "%";
					}				
				},
				allowOverlay: true,
				style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					fontFamily: 'NanumSquare',
					overflow: "allow"
                }
			}
	    },
		series: chartData
	});
	
	$('#chartDiv .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#chartDiv .highcharts-data-labels span').last().css("top", "10px");
	
	var textArr = $("#chart_modal g.highcharts-label.highcharts-stack-labels");
	for(var i=0; i<textArr.length; i++) {
		if(i > 0) {
			if(!$(textArr[i]).attr("isUpdateComplete")) {
				let transf = $("#chart_modal g.highcharts-label.highcharts-stack-labels:eq(" + i + ")").attr("transform");
				let maxWidth = parseInt(transf.substring(transf.indexOf("(")+1, transf.indexOf(")")).split(",")[0]);
				let maxHeight = parseInt(transf.substring(transf.indexOf("(")+1, transf.indexOf(")")).split(",")[1]);
				let sizeX = $(textArr[i])[0].getClientRects()[0].width;
				let sizeY = $(textArr[i])[0].getClientRects()[0].height;
				
				let transf2 = $("#chart_modal g.highcharts-label.highcharts-stack-labels:eq(" + parseInt(i-1) + ")").attr("transform");
				let maxWidth2 = parseInt(transf2.substring(transf.indexOf("(")+1, transf2.indexOf(")")).split(",")[0]);
				let maxHeight2 = parseInt(transf2.substring(transf.indexOf("(")+1, transf2.indexOf(")")).split(",")[1]);
				let sizeX2 = $(textArr[parseInt(i-1)])[0].getClientRects()[0].width;
				let sizeY2 = $(textArr[parseInt(i-1)])[0].getClientRects()[0].height;
				if(Math.abs(maxWidth2 - maxWidth) <= sizeX2) {
					if(Math.abs(maxHeight2 - maxHeight) <= sizeY2) {
						$(textArr[i]).attr("transform", "translate(" + parseInt(maxWidth).toString() + "," + parseInt(maxHeight-20).toString() + ")");
						//$(textArr[i])[0].getClientRects()[0].y = $(textArr[i])[0].getClientRects()[0].y -15;
						$(textArr[i]).attr("isUpdateComplete", true);
						
					}
				}
			}
		}
	}
}

/**
 * @name         : verticalLineHighChart 
 * @description  : 세로 라인 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function horizontalLineHighChart(data, type) {
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
	let dataArr = [];
	let defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"], colorCnt = 0;
	
	for(let i=0; i<type.length; i++) {
		if(type[i].dispVarOrd == 0) {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["CHAR_ITM_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y:parseFloat(data[key][k].DTVAL_CO)
										, color: defaultColors[colorCnt]
									}
								);
								categories.push(data[key][k]["CHAR_ITM_NM"]);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
								colorCnt++;
							}
						}
					}
				}
			}
		} else {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["OV_L" + type[i].dispVarOrd + "_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y:parseFloat(data[key][k].DTVAL_CO)
										, color: defaultColors[colorCnt]
									}
								);
								categories.push(data[key][k]["OV_L" + type[i].dispVarOrd + "_KOR"]);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
								colorCnt++;
							}
						}
					}
				}
			}
		}
	}
	
	chartData.push({name: type[0].chartNm, data: dataArr, pointWidth: 15 });
	
	maxVal = maxVal + maxVal * (maxVal.toString().length/70);

	var chartDiv = $('#chartDiv').highcharts({
		chart: {
			events: {
	        	load: function() {
	        		$("#chartDiv .highcharts-root").css("width", "auto");
	        	}
	        }
		},
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		legend: {
	        enabled: false			
	    },
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    credits: {
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
						return "<b>" + this.key + ": <br/>" + numberFormat(this.y) + type[0].kosisUnitNm + "</b>" ;
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
                allowOverlap: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					fontFamily: 'NanumSquare',
					textOutline: "none",
					textOverflow: "clip"
                },
				formatter: function() {
					if(type[0].dispUnitNm != "%") {
						return numberFormat(Math.round(this.total)) + chartOpt.kosisUnitNm;
					} else {
						return this.total + "%";
					}
				}
            },
            labels: {				
				formatter: function() {
					if(type[0].dispUnitNm != "%") {
						return this.value;
					} else {
						return this.value.toFixed(1) + "%";
					}				
				},
				style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					fontFamily: 'NanumSquare',
					overflow: "allow"
                }
			}
	    },
		series: chartData
	});
	
	$('#chartDiv .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#chartDiv .highcharts-data-labels span').last().css("top", "10px");
	
	var textArr = $("#chart_modal g.highcharts-label.highcharts-stack-labels");
	for(var i=0; i<textArr.length; i++) {
		if(i > 0) {
			if(!$(textArr[i]).attr("isUpdateComplete")) {
				let transf = $("#chart_modal g.highcharts-label.highcharts-stack-labels:eq(" + i + ")").attr("transform");
				let maxWidth = parseInt(transf.substring(transf.indexOf("(")+1, transf.indexOf(")")).split(",")[0]);
				let maxHeight = parseInt(transf.substring(transf.indexOf("(")+1, transf.indexOf(")")).split(",")[1]);
				let sizeX = $(textArr[i])[0].getClientRects()[0].width;
				let sizeY = $(textArr[i])[0].getClientRects()[0].height;
				
				let transf2 = $("#chart_modal g.highcharts-label.highcharts-stack-labels:eq(" + parseInt(i-1) + ")").attr("transform");
				let maxWidth2 = parseInt(transf2.substring(transf.indexOf("(")+1, transf2.indexOf(")")).split(",")[0]);
				let maxHeight2 = parseInt(transf2.substring(transf.indexOf("(")+1, transf2.indexOf(")")).split(",")[1]);
				let sizeX2 = $(textArr[parseInt(i-1)])[0].getClientRects()[0].width;
				let sizeY2 = $(textArr[parseInt(i-1)])[0].getClientRects()[0].height;
				if(Math.abs(maxWidth2 - maxWidth) <= sizeX2) {
					if(Math.abs(maxHeight2 - maxHeight) <= sizeY2) {
						$(textArr[i]).attr("transform", "translate(" + parseInt(maxWidth).toString() + "," + parseInt(maxHeight-20).toString() + ")");
						//$(textArr[i])[0].getClientRects()[0].y = $(textArr[i])[0].getClientRects()[0].y -15;
						$(textArr[i]).attr("isUpdateComplete", true);
						
					}
				}
			}
		}
	}
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
	let dataArr = [];
	let defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"], colorCnt = 0;
	
	for(let i=0; i<type.length; i++) {
		if(type[i].dispVarOrd == 0) {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["CHAR_ITM_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y:parseFloat(data[key][k].DTVAL_CO)
										, color: defaultColors[colorCnt]
									}
								);
								categories.push(data[key][k]["CHAR_ITM_NM"]);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
							}
						}
					}
				}
			}
		} else {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["OV_L" + type[i].dispVarOrd + "_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y:parseFloat(data[key][k].DTVAL_CO)
										, color: defaultColors[colorCnt]
									}
								);
								categories.push(data[key][k]["OV_L" + type[i].dispVarOrd + "_KOR"]);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
							}
						}
					}
				}
			}
		}
	}
	
	chartData.push({name: type[0].chartNm, data: dataArr, pointWidth: 15 });
	
	maxVal = maxVal + maxVal * (maxVal.toString().length/70);

	var chartDiv = $('#chartDiv').highcharts({
		chart: {
			polar: true,
			type: 'column'
		},
		legend: {
	        enabled: false	        
	    },
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    credits: {
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
	            allowOverlap: true,
	            textOverflow: "clip",
	            //overflow: "allow"
	        }			
	    },
		yAxis: {
			min: 0,
			stackLabels: {
                enabled: true,
                allowOverlap: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
					fontFamily: 'NanumSquare',
					textOutline: "none",
					textOverflow: "clip",
					overflow: "allow"
                },
				formatter: function() {
					if(type[0].dispUnitNm != "%") {
						return numberFormat(Math.round(this.total)) + chartOpt.kosisUnitNm;
					} else {
						return this.total + "%";
					}
				}
            }
	    },
		series: chartData
	});
	
	$('#chartDiv .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#chartDiv .highcharts-data-labels span').last().css("top", "10px");
	
	var textArr = $("#chart_modal g.highcharts-axis-labels.highcharts-xaxis-labels.highcharts-radial-axis-labels text");
	for(var i=0; i<textArr.length; i++) {
		if(!$(textArr[i]).attr("isUpdateComplete")) {
			let maxWidth = $(textArr[i])[0].clientWidth;
			let maxHeight = $(textArr[i])[0].clientHeight;
			let sizeX = maxWidth - parseFloat($(textArr[i]).attr("x"));
			let sizeY = maxHeight - parseFloat($(textArr[i]).attr("y"));
			for(var j=0; j<textArr.length; j++) {
				if(!$(textArr[i]).attr("isUpdateComplete")) {
					if(i != j) {
						let maxWidth2 = $(textArr[j])[0].clientWidth;
						let maxHeight2 = $(textArr[j])[0].clientHeight;
						let sizeX2 = maxWidth - parseFloat($(textArr[j]).attr("x"));
						let sizeY2 = maxHeight - parseFloat($(textArr[j]).attr("y"));
						if(Math.abs(maxWidth2 - maxWidth) <= sizeX) {
							if(Math.abs(maxHeight2 - maxHeight) <= sizeY) {
								console.log(parseFloat($(textArr[i]).attr("x")));
								console.log(parseFloat($(textArr[i]).attr("y")));
								if(parseInt($("#chart_modal").css("width"))/2 > parseFloat($(textArr[i]).attr("X"))) {
									$(textArr[i]).attr("y", parseFloat($(textArr[i]).attr("y")) - 15);
								} else {
									$(textArr[i]).attr("y", parseFloat($(textArr[i]).attr("y")) + 15);
								}
								$(textArr[i]).attr("isUpdateComplete", true);
							}
						}
					}
				}
			}
		}
	}
}

/**
 * @name         : pieHighChart 
 * @description  : 파이 차트
 * @date         : 2021.08.25
 * @author	     : 이영호
 * @history 	 : 
 */
function pieHighChart(data, type) {  
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
	let dataArr = [];
	let defaultColors = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"], colorCnt = 0;
	
	for(let i=0; i<type.length; i++) {
		if(type[i].dispVarOrd == 0) {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["CHAR_ITM_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y:parseFloat(data[key][k].DTVAL_CO),
										name: data[key][k]["CHAR_ITM_NM"],
										color: defaultColors[colorCnt]
									}
								);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
								colorCnt++;
							}
						}
					}
				}
			}
		} else {
			for(let j=0; j<Object.keys(data).length; j++) {
				let key = Object.keys(data)[j];
				if(type[i].varOrd == type[i].dispVarOrd) {
					for(let k=0; k<data[key].length; k++) {
						if(type[i].itmId == data[key][k]["OV_L" + type[i].dispVarOrd + "_ID"]) {
							if(type[i].subsumYn != "Y") {
								dataArr.push(
									{
										y: parseFloat(data[key][k].DTVAL_CO),
										name: data[key][k]["OV_L" + type[i].dispVarOrd + "_KOR"],
										color: defaultColors[colorCnt]
									}
								);
								
								if(maxVal < data[key][k].DTVAL_CO) {
									maxVal = parseFloat(data[key][k].DTVAL_CO);
								}
								colorCnt++;
							}
						}
					}
				}
			}
		}
	}
	
	chartData.push({name: type[0].chartNm, data: dataArr, pointWidth: 15 });

	var chartDiv = $('#chartDiv').highcharts({
		chart: {
			type: "pie",
			events: {
	        	load: function() {
	        		$("#chartDiv .highcharts-root").css("width", "auto");
	        	}
	        }
		},
		plotOptions: {
	        series: {
	            dataLabels: {
	                enabled: true
	            }
	        }
	    },
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    credits: {
            enabled: false
        },
		title: {
			text: "",
			style: { "display": "none" }
		},
		tooltip: {
        	formatter: function () {
				return "<b>" + this.key + ": <br/>" + numberFormat(this.y) + type[0].kosisUnitNm + "</b>" ;
			},
			useHTML: true,
			shared: false,
		    shadow: false,
		    enabled: true,
		},
		series: chartData,
		responsive: {
			rules: [{
				condition: {
					maxWidth: 400
				},
				chartOptions: {
					series: [{}, {
						id: 'genderData',
						dataLabels: {
							enabled: false
						}
					}]
				}
			}]
		},
		exporting: {
			showTable: true
		}
	});
	
	$('#chartDiv .highcharts-data-labels span').css("font-family", "NanumSquare");
	$('#chartDiv .highcharts-data-labels span').last().css("top", "10px");
	
	var textArr = $("#chart_modal .highcharts-label text");;
	for(var i=0; i<textArr.length; i++) {
		if(!$(textArr[i]).attr("isUpdateComplete")) {
			let maxWidth = $(textArr[i])[0].clientWidth;
			let maxHeight = $(textArr[i])[0].clientHeight;
			let sizeX = maxWidth - parseFloat($(textArr[i]).attr("x"));
			let sizeY = maxHeight - parseFloat($(textArr[i]).attr("y"));
			for(var j=0; j<textArr.length; j++) {
				if(!$(textArr[i]).attr("isUpdateComplete")) {
					if(i != j) {
						let maxWidth2 = $(textArr[j])[0].clientWidth;
						let maxHeight2 = $(textArr[j])[0].clientHeight;
						let sizeX2 = maxWidth - parseFloat($(textArr[j]).attr("x"));
						let sizeY2 = maxHeight - parseFloat($(textArr[j]).attr("y"));
						if(Math.abs(maxWidth2 - maxWidth) <= sizeX) {
							if(Math.abs(maxHeight2 - maxHeight) <= sizeY) {
								$(textArr[i]).attr("y", parseFloat($(textArr[i]).attr("y")) - 15);
								$(textArr[i]).attr("isUpdateComplete", true);
							}
						}
					}
				}
			}
		}
	}
}
