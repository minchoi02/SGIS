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
	W.$ecnmyDash = W.$ecnmyDash || {};
	
	/* 공공데이터 조회 시 실운영은  "연결을 거부했습니다"로 나옴
	     임시로 "통계청 계발서버"로 연결하면 데이터 가져옴
	   isDev = true; 테스트
	   isDev = false; 실운영
	 */
	$ecnmyDash.isDev = true;
	/* 공공데이터 조회 변수*/
	$ecnmyDash.org_id = "";
	$ecnmyDash.tbl_id = "";
	$ecnmyDash.kosis_data_item = "";
	$ecnmyDash.kosis_data_period = "";
	$ecnmyDash.kosis_data_year = "";
	$ecnmyDash.gis_se = "";
	$ecnmyDash.obj_var_id = "";
	$ecnmyDash.field_id = "";
	$ecnmyDash.kosis_data_item_detail = "";
	$ecnmyDash.ecnmyType = "ecnmy9th";
	$ecnmyDash.ajax = {};
	$ecnmyDash.admLv = 0;
	$ecnmyDash.itmLv = 0;
	$ecnmyDash.chartsOption = {};
	$ecnmyDash.chartsOption.color = ["#f08246", "#009589"];
	$ecnmyDash.chartsOption.corpMaxVal = 0;
	$ecnmyDash.chartsOption.workerMaxVal = 0;
	$ecnmyDash.chartsOption.salesMaxVal = 0;
	$ecnmyDash.chartsOption.profitMaxVal = 0;
	$ecnmyDash.treemap;
	$ecnmyDash.kosis_result_data = [];
	$ecnmyDash.loading = false;
	
	$ecnmyDash.selectedChartSno = 1;
	$ecnmyDash.selectedItmId = "0";
	$ecnmyDash.selectedCategory = "";
	//현재 그려진 d3의 데이터를 담는 변수
	$ecnmyDash.currentData = {};
	$ecnmyDash.beforeData = {};
	$ecnmyDash.emptyHouse = {};
	$ecnmyDash.kindHouseData = {};
	$ecnmyDash.timeEmptyHouse = {};
	$ecnmyDash.countRoomData = {};
	$ecnmyDash.dispWord = {};
	//현재 그려진 d3의 데이터를 담는 변수
	
	//현재 조회하고있는 rank 지역 level
	$ecnmyDash.regionLevel = 'sido';
	//행정시도 정보를 담아둔다
	$ecnmyDash.atdrc = '';	
	//비자치구에서 행정시로 이동여부
	$ecnmyDash.upperBack = false;
	//연령분포 폴리곤 클릭 시 단위 변경을 위한 기준 변수 
	$ecnmyDash.polygonSelectArea = "";	
	
	
	$(document).ready(function() {
		Highcharts.setOptions({
		    lang: {
		        numericSymbols: null //otherwise by default ['k', 'M', 'G', 'T', 'P', 'E']
		    }
		});
	});
	
	$(window).load(function() {
		//$ecnmyDash.event.allChange("00", 1);		
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
		/*
		if($totSurvMain.ui.pageIndex == '3' && !$(".mapExport").hasClass('on')){
			
			setHouseChart($ecnmyDash.emptyHouse,"countRoomChart","Y", "140"); //20210226 박은식 차트 위치변경
			
			setHouseChart($ecnmyDash.kindHouseData,"kindHouseChart","Y", "140");
			
			if($ecnmyDash.countRoomData != null && $ecnmyDash.countRoomData != undefined){
				setHouseChart($ecnmyDash.countRoomData,"emptyHoseChart","Y", "140"); //20210226 박은식 차트 위치변경
			}
			
			timeEmptyHouseChart($ecnmyDash.timeEmptyHouse, "houseTimeChart", "Y", "180");
		}
		*/
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

	$ecnmyDash.const = {},
	
	$ecnmyDash.ui = {
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
			$totSurvMain.ui.chartSaveClear();
			$ecnmyMap.ui.selectedChrItmId = "T10";
			$ecnmyMap.ui.category = "ecnmy";
			$ecnmyDash.ecnmyType = "ecnmy9th";
			
			if($totSurvMain.ui.selectedYear != "2010") {
				$totSurvMain.ui.selectedYear = "2015";
			}
			
			//20201120 박은식 초기화 추가 END
			$totSurvMain.ui.removeContent();
			$totSurvMain.ui.appendContent("/view/totSurv/ecnmyDash/main");
		},
		
		ready : function(){			
			$ecnmyMap.ui.selectedOrgId = '101';
			$ecnmyDash.selectedItmId = "0";									//전산업
			if(gv_sido_cd != "") {
				$totSurvMain.ui.selectedArea = gv_sido_cd;
				if($totSurvMain.ui.selectedArea.length==2){
					$ecnmyDash.event.pathChange("sgg", $totSurvMain.ui.selectedArea);
				} else {
					if(region_cd.substring(4,5)=="0"){
						$ecnmyDash.event.pathChange("atdrc", $totSurvMain.ui.selectedArea);
					} else {
						$ecnmyDash.event.pathChange("emdong", $totSurvMain.ui.selectedArea);
					}
				}
			}
			if(gv_year != "") {
				$totSurvMain.ui.selectedYear = gv_year;
			}
			$ecnmyDash.ajax.params = {			
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
			$ecnmyDash.event.setDefaultParams($totSurvMain.ui.selectedYear);
			$ecnmyDash.event.setDispOptions();
			$ecnmyDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
			$ecnmyDash.ui.drawContent();
			$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, 1);
			
			$("#itmDiv").css("display", "inline");
			$("#itmDiv").html($totSurvMain.ui.selectedYear + "년 전산업 사업체 수");
			
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
			$ecnmyMap.ui.selectedSurvId = "PH0001";
			$ecnmyMap.ui.selectedItmCd = "T310";
			//20201120 박은식 초기화 추가 END
			//chart Data 초기화
			$ecnmyDash.emptyHouse = {};
			$ecnmyDash.kindHouseData = {};
			$ecnmyDash.timeEmptyHouse = {};
			$ecnmyDash.countRoomData = {};
			$ecnmyDash.timeEmptyHouse = {};
			//차트 초기화
			$("#emptyHoseChart").empty();
			$("#kindHouseChart").empty();
			$("#countRoomChart").empty();
			$("#houseTimeChart").empty();
		},
		
		/**
		 * @name         : setTileMapChart 
		 * @description  : 차트 클릭시 변경되는 타일맵 차트
		 * @date         : 2020.09.09
		 * @author	     : juKwak
		 * @history 	 : 
		 * @parameter	 : target - 대상 div, width - 넓이, height - 높이, surv_id - 조사id
		 */
		setTileMapChart : function(target, width, height){
			//$("#itmDiv").html(""); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화
			//$("#itmDiv").css("display", "none"); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화
			
			let tileMapChartDiv;
			if($totSurvMain.ui.selectedYear == "2010") {
				tileMapChartDiv = "#areaEcnmyY2010";
				$(".con-L .y2015").hide();
				$(".con-L .y2010").fadeIn(function() {
					$(".con-L .y2010").css("display", "inline-block");
				});				
			} else {
				tileMapChartDiv = "#areaEcnmyY2015";				
				$(".con-L .y2010").hide();
				$(".con-L .y2015").fadeIn();
			}
			$(tileMapChartDiv).empty();
			
			$(tileMapChartDiv).css("background-color", "white");
			
			var regionCd = $totSurvMain.ui.selectedArea;
			if(regionCd==null || regionCd==undefined ){
				regionCd = '99';
			} else if(regionCd.length==2 && $ecnmyMap.ui.mapToggleId!=null && $ecnmyMap.ui.mapToggleId!=""){
				regionCd = '00';
			} else if(regionCd.length==5){
				// 행정시도 인지 비교
				$ecnmyMap.ui.checkIsAtdrc(regionCd);
				if($ecnmyMap.ui.isAtdrc){
					// 행정시도 이면서 지도 선택인 경우는 상위지역(시도레벨) 조회(타일맵 변경 없음)  
					if($ecnmyMap.ui.mapToggleId!=null && $ecnmyMap.ui.mapToggleId!="" && gv_type != "locgov" && gv_type!="totFarmLocgov" && gv_type!="totPeopleLocgov"){ // 2020-11-09 [곽제욱] parameter 분기처리 추가
						regionCd = regionCd.substring(0,2);
					// 아닌경우는 타일맵 변경
					} else {
						regionCd = regionCd;
					}
				}

				else{
					// 행정시도가 아닐경우 상위지역 체크
					$ecnmyMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
					// 상위지역이 행정시도인 경우 행정시도로 다시 검색
					if($ecnmyMap.ui.isAtdrc){
						regionCd = regionCd.substring(0,4)+"0";
					// 행정시도가 아닐경우 시도로 검색
					} else {								
						regionCd = regionCd.substring(0,2);
						$ecnmyMap.ui.isAtdrc = false;
					}
				}
			}			
			
			var res = $ecnmyMap.ui.mapStatsData[$ecnmyMap.ui.selectedTblId];
			let totAdm = res[0];
			
			for(var i=0; i<res.length; i++) {
				if(res[i]["adm_cd"] == $totSurvMain.ui.selectedArea) {
					res.shift();
				}
			}
			
			var chartData = [];
			for(var i=0; i<res.length; i++) {
				let treeColor = "";				
				for(var j=0; j<$totSurvMain.ui.tilePerColor.length; j++) {
					if(res[i].adm_cd == $totSurvMain.ui.tilePerColor[j].adm_cd) {
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
					id: res[i].adm_cd,
					name: res[i].adm_kor,
					value: parseInt(res[i].dtval_co),
					color: hexToRgba(treeColor)
				});
			}
			
			var tool = $(".TileMaptoolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
			
			Highcharts.chart('areaEcnmyY' + $totSurvMain.ui.selectedYear, {
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
							    	//20210222 박은식 총조사인구 차트선택 이후 타일맵 클릭 시 초기화 END
							    	$totSurvMain.ui.tileChangeYn = "Y";
							    	$totSurvMain.ui.selectedArea = this.options.id; // 선택한 지역코드를 selectedArea 에 세팅
							    	$ecnmyMap.ui.map.setPolyLayerHighlight(""); // 2020-10-12 [곽제욱] 하이라이트 초기화
							    	$ecnmyMap.ui.mapToggleId = ""; // 맵토글 ID 초기화
							    	
									let region_cd = this.options.id;
									$totSurvMain.ui.selectedArea = region_cd;
									
									if(region_cd.length == 2){
										$("#dash_sido").val(region_cd.substring(0,2));
										$totSurvMain.ui.getSidoSggPos(region_cd);
										$ecnmyDash.ui.getRankSet("", "",region_cd);	//allChange 실행 전 사업체 현황 정보 반영
							    		$ecnmyDash.event.allChange(region_cd, "1");
							    		$ecnmyMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
							    		$ecnmyMap.ui.mapToggleId = $totSurvMain.ui.selectedArea;
							    	}
							    	// 시군구 데이터 일 경우 kosis정보 호출
							    	else if(region_cd.length == 5){
							    		$totSurvMain.ui.getSidoSggPos(region_cd);
							    		$("#dash_sido").val(region_cd.substring(0,2));
										$ecnmyDash.ui.getRankSet("", "",region_cd);	//allChange 실행 전 사업체 현황 정보 반영
										
							    		$ecnmyMap.ui.checkIsAtdrc(region_cd);	
							    		if($ecnmyMap.ui.isAtdrc != true){
							    			// 2020-11-12 [곽제욱] 최하레벨 tileMap 선택시 색상변경 로직 START
							    			if($ecnmyMap.ui.mapToggleId != $totSurvMain.ui.selectedArea){
							    				for(var i=0; i<$totSurvMain.ui.tilePerColor.length; i++){
							    					if($totSurvMain.ui.tilePerColor[i].adm_cd != $totSurvMain.ui.selectedArea){
							    						/*var tempAdmCd = $totSurvMain.ui.tilePerColor[i].adm_cd;
							    						var tempColor = $totSurvMain.ui.tilePerColor[i].color;
							    						$ecnmyDash.treemap.find("g.highcharts-level-group-1 rect[admcd='"+tempAdmCd+"']").attr("fill", tempColor);	*/							    													    						
							    					} else {
							    						$ecnmyDash.treemap.find("g.highcharts-level-group-1 rect[admcd='"+$totSurvMain.ui.selectedArea+"']").attr("fill", "#0086c6");								    						
							    					}
							    				}

							    			} else {
							    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
							    				var tempColor = '';
							    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
							    					if($totSurvMain.ui.tilePerColor[i].adm_cd == $ecnmyMap.ui.mapToggleId){
							    						tempColor = $totSurvMain.ui.tilePerColor[i].color
							    					}
							    				}
							    				//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $ecnmyMap.ui.mapToggleId}).color;
							    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
							    				$ecnmyDash.treemap.find("g.highcharts-level-group-1 rect[admcd='"+$ecnmyMap.ui.mapToggleId+"']").attr("fill", tempColor);
							    			}
							    			
						    				$totSurvMain.ui.tileChangeYn = "N";
						    				$ecnmyMap.ui.mapRegion = "sgg";

											// 선택한 지역 하이라이트
								    		$ecnmyMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
								    		$ecnmyMap.ui.mapToggleId = $totSurvMain.ui.selectedArea;
											
											$ecnmyMap.ui.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,4)+"0");
											$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "2"); // 맵이동 없음
											
							    			$(".mapInfo").show();						
							    		}
							    		else{
											// 2020-11-30 [곽제욱] 최하레벨 타일맵 클릭시 Navigation 변경 START
							    			console.log("#########################   비자치구 클릭됨     ##############");
							    			$totSurvMain.ui.selectedLevel = "2"; // 선택레벨 3으로 세팅(슬라이드 삭제)
							    			$totSurvMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화							    			
						    				$ecnmyMap.ui.mapRegion = "sgg";
						    				$ecnmyDash.event.allChange(region_cd, "1");
							    			// 2020-10-13 임업 대쉬보드 추가 END jhs
							    			$totSurvMain.ui.tilePerColor.length = 0; // 2020-11-11 [곽제욱] 범례색상 배열 초기화
							    			$ecnmyMap.ui.map.setPolyLayerHighlight($totSurvMain.ui.selectedArea);
								    		$ecnmyMap.ui.mapToggleId = $totSurvMain.ui.selectedArea;
							    		}
							    	}
									
									srvLogWrite('P0','10','02','01',$totSurvMain.ui.selectedThema, 'year='+$totSurvMain.ui.selectedYear+',region_cd='+region_cd);
									
									// 2020-11-30 [곽제욱] 최하레벨 타일맵 클릭시 Navigation 변경 START
									if(region_cd.length==2){
										$ecnmyDash.event.pathChange("sgg", region_cd);
									} else {
										if(region_cd.substring(4,5)=="0"){
											$ecnmyDash.event.pathChange("atdrc", region_cd);
										} else {
											$ecnmyDash.event.pathChange("emdong", region_cd);
										}
									}
			    					$ecnmyDash.event.titleChange($totSurvMain.ui.selectedArea); // 2020-12-01 [곽제욱 타일맵 클릯기 titleChange 이벤트 추가
			    					// 2020-11-30 [곽제욱] 최하레벨 타일맵 클릭시 Navigation 변경 END
								},
								mouseOver: function() {
									var total = 0;
									
									//let totDtArr = $ecnmyMap.ui.mapStatsData[$ecnmyMap.ui.selectedTblId];
									for(var i=0; i<this.series.data.length; i++) {
										total += parseFloat(this.series.data[i].value);
									}
									
									var ratio = 0;
							        if(total != 0 && total !=""){
							        	ratio = (this.value / total * 100).toFixed(2)
							        } else {
							        	ratio = 100;
							        }
							        
							        var unit = "개";
							        tool.html("<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + this.name + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;'>" + numberFormat(this.value) + "</p>" + unit + "<br>" + "<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>" + numberFormat(ratio) + "</p>" + "%"); /*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
							        
									tool.css("display", "inline-block");
									
									$(document).on("mousemove", function(evt) {
										tool.css("left", evt.clientX-parseInt(tool.css("width"))/2); 
								        tool.css("top", evt.clientY-70);								        
									});
							        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
							        
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
							for(var i=0; i<this.series[0].data.length; i++) {
								if(this.series[0].data[i].id == $ecnmyMap.ui.mapToggleId) {
									this.series[0].data[i].update({ color: "#0086c6" });
									this.series[0].data[i].select(true);
								}
							}
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
			
			$('#' + 'areaEcnmyY' + $totSurvMain.ui.selectedYear).find(".highcharts-label tspan").attr("stroke-width", "0px");
			$ecnmyDash.treemap = $('#' + 'areaEcnmyY' + $totSurvMain.ui.selectedYear); 
			let tmData = $('#' + 'areaEcnmyY' + $totSurvMain.ui.selectedYear).highcharts().series[0].data;
			for(var i=0; i<tmData.length; i++) {
				if(tmData[i].value > 0) {	// 값이 마이너스면 트리맵 차트로 구현이 안됨.
					$(tmData[i].graphic.element).attr("admCd", tmData[i].id);
				}
			}
		},
		
		drawContent : function(){
			var mapHtml ="<div id='mapRgn_1' style='height: 588px;'></div>"; // 2020.11.19[신예리] 영역 높이 수정
			mapHtml += "<div class='ControllBtnWrap'>";
			mapHtml += "	<button type='button' class='mapExport' title='지도 확장'></button>";
			mapHtml += "	<button type='button' class='zoom' id='pZoom' title='지도 확대'></button>";
			mapHtml += "	<button type='button' class='out' id='pOut' title='지도 축소'></button>";
			mapHtml += "</div>";

			$("#mapArea").html(mapHtml);
							
			$ecnmyMap.ui.createMap("mapRgn_1", 0);
			$("#mapRgn_1").css("height", "588px");
			
			if($ecnmyMap.ui.map!=null) {
				$ecnmyMap.ui.map.update();
			}
			
			$('.sop-control').css('display', 'inline-block');
			if($(".legendRing").attr("data-ing") == "min"){
				$(".btn_legend").trigger("click").trigger("click");
			} else  if($(".legendRing").attr("data-ing") == "max"){
				$(".btn_legend").trigger("click");
			}
			//20202124 박은식 범례 추가 END
			
			//$totSurvMain.ui.loading(false);
		},
		
		/**
		 * @name : drawMapData
		 * @description : 지도 데이터 그리기
		 * @date : 2021.08.05
		 * @author : 이영호
		 * @history :
		 * @param :
		 * 		p_map_region : 지역경계
		 * 		p_map_type : 지도유형(heat 고정)
		 */
		drawMapData : function(p_map_region, p_map_type) {
			$totSurvMain.ui.loading(true); // 2020-10-14 [곽제욱] 맵 그리기 시작할때 loading바 생성
			$ecnmyDash.loading = true;
			/** 인구 지도 이벤트 버튼 제어*/
			if($ecnmyMap.ui.map != null){
				$(".mapExport").show();
				$(".zoom").show();
				$(".out").show();
			}
			var lv_map_region_before = $ecnmyMap.ui.mapRegion;
			var lv_map_type_before = $ecnmyMap.ui.mapType;
			
			if(p_map_region == undefined || p_map_region == null) {
				p_map_region = $totSurvMain.ui.mapRegion;
			}
			else {
				$ecnmyMap.ui.mapRegion = p_map_region;
			}
			if(p_map_type == undefined || p_map_type == null) {
				p_map_type = $totSurvMain.ui.mapType;
			}
			else {
				$ecnmyMap.ui.mapType = p_map_type;
			}
							
			//지역변수
			var lv_adm_cd = "00";
			var lv_adm_nm = "전국";
			var lv_adm_coor_x = 990480.875;
			var lv_adm_coor_y = 1815839.375;
							
			/* 총조사 시각화의 경우 각 시도정보는  $totSurvMain.ui.selectedArea 로 가져온다 */
			var lv_sido, lv_sido_cd, lv_sido_nm, lv_sido_coor_x, lv_sido_coor_y;
			var lv_sgg, lv_sgg_cd, lv_sgg_nm, lv_sgg_coor_x, lv_sgg_coor_y;
			var lv_emdong, lv_emdong_cd, lv_emdong_nm, lv_emdong_coor_x, lv_emdong_coor_y;
			if($totSurvMain.ui.selectedArea.length == 2) {
				lv_sido = $("#dash_sido");
				lv_sido_cd = $("#dash_sido option[value=" + $totSurvMain.ui.selectedArea.substring(0,2) + "]").val();
				lv_sido_nm = $("#dash_sido option:selected").text();
				lv_sido_coor_x = $("#dash_sido option:selected").attr("data-coor-x");
				lv_sido_coor_y = $("#dash_sido option:selected").attr("data-coor-y");
			} else if($totSurvMain.ui.selectedArea.length == 5) {
				lv_sido = $("#dash_sido");
				lv_sido_cd = $("#dash_sido option[value=" + $totSurvMain.ui.selectedArea.substring(0,2) + "]").val();
				lv_sido_nm = $("#dash_sido option:selected").text();
				lv_sido_coor_x = $("#dash_sido option:selected").attr("data-coor-x");
				lv_sido_coor_y = $("#dash_sido option:selected").attr("data-coor-y");
				lv_sgg = $("#dash_sgg");
				lv_sgg_cd = $("#dash_sgg option[value=" + $totSurvMain.ui.selectedArea.substring(2,5) + "]").val();
				lv_sgg_nm = $("#dash_sgg option:selected").text();
				lv_sgg_coor_x = $("#dash_sgg option:selected").attr("data-coor-x");
				lv_sgg_coor_y = $("#dash_sgg option:selected").attr("data-coor-y");
			} else {
				lv_sido = $("#dash_sido");
				lv_sido_cd = $("#dash_sido option[value=" + $totSurvMain.ui.selectedArea.substring(0,2) + "]").val();
				lv_sido_nm = $("#dash_sido option:selected").text();
				lv_sido_coor_x = $("#dash_sido option:selected").attr("data-coor-x");
				lv_sido_coor_y = $("#dash_sido option:selected").attr("data-coor-y");
				lv_sgg = $("#dash_sgg");
				lv_sgg_cd = $("#dash_sgg option[value=" + $totSurvMain.ui.selectedArea.substring(2,5) + "]").val();
				lv_sgg_nm = $("#dash_sgg option:selected").text();
				lv_sgg_coor_x = $("#dash_sgg option:selected").attr("data-coor-x");
				lv_sgg_coor_y = $("#dash_sgg option:selected").attr("data-coor-y");
				lv_emdong = $("#dash_emdong");
				lv_emdong_cd = $("#dash_emdong").val();
				lv_emdong_nm = $("#dash_emdong option:selected").text();
				lv_emdong_coor_x = $("#dash_emdong option:selected").attr("data-coor-x");
				lv_emdong_coor_y = $("#dash_emdong option:selected").attr("data-coor-y");
			}
			
			//지역변수 데이터 정리
			if(lv_sido_cd != "99") {
				lv_adm_coor_x = lv_sido_coor_x;
				lv_adm_coor_y = lv_sido_coor_y;
			}
			if(lv_sgg_cd != "999") {
				lv_adm_coor_x = lv_sgg_coor_x;
				lv_adm_coor_y = lv_sgg_coor_y;
			}
			if(lv_emdong_cd != "99") {
				lv_adm_coor_x = lv_emdong_coor_x;
				lv_adm_coor_y = lv_emdong_coor_y;
			}
			
			if(lv_sido_cd == "99") lv_sido_cd = "00";
			lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
			lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
			if(lv_sido_cd == "99") lv_adm_cd = "00";
			else if(lv_sgg_cd == "999") lv_adm_cd = lv_sido_cd;
			else if(lv_emdong_cd == "99") lv_adm_cd = lv_sido_cd + lv_sgg_cd;
			if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
			else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
			else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
			//지도 Clear
			$ecnmyMap.ui.clearMap($ecnmyMap.ui.map);
			//색상/버블
			if(p_map_type == "color" || p_map_type == "bubble") {
				//색상/버블 (시도)
				if(p_map_region == "sido") {
					//
					$ecnmyDash.ui.setTotSurvData($ecnmyMap.ui.map, "sido", "color", "", "", "", "ecnmy", function(p_list) {
						//리스트에서 unit 가져오기
						var lv_unit = "개";
						var lv_unit_nm = "수";
						//데이터 넣기
						$ecnmyMap.ui.map.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "dtval_co", lv_unit);

						//경계 그리기
						$ecnmyMap.ui.setTotSurvRegion($ecnmyMap.ui.map, "sido", $ecnmyMap.ui.getTotSurvRegionYear(), "", "", "", function() {
							if($ecnmyMap.ui.mapToggleId != "" && $ecnmyMap.ui.mapToggleId != null){
								// 2020-10-06 [곽제욱] 지도 새로 그릴경우 선택된 지역과 이동한 지역이 다를경우, 선택지역으로 세팅 START
								/*if($ecnmyMap.ui.mapToggleId!=$totSurvMain.ui.selectedArea){
									$ecnmyMap.ui.mapToggleId = $totSurvMain.ui.selectedArea;
								}*/
								// 2020-10-06 [곽제욱] 지도 새로 그릴경우 선택된 지역과 이동한 지역이 다를경우, 선택지역으로 세팅 END
								// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
								var highLightAmdCd = $ecnmyMap.ui.mapToggleId;
								// 맵토글ID 초기화
								$ecnmyMap.ui.mapToggleId = "";
								$ecnmyMap.ui.map.setPolyLayerHighlight(highLightAmdCd);
								// 하이라이트 처리 후 맵토글ID 세팅
								$ecnmyMap.ui.mapToggleId = highLightAmdCd;
								// 2020-11-02 [곽제욱] 타일차트 색변경 추가 START
								if(adm_cd != "00"){
									//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
				    				var tempColor = '';
				    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
				    					if($totSurvMain.ui.tilePerColor[i].adm_cd == adm_cd){
				    						tempColor = $totSurvMain.ui.tilePerColor[i].color
				    					}
				    				}
									//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {	return x.adm_cd == adm_cd}).color; 
				    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
									if($ecnmyMap.ui.tileTempColor!=""){
										//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
					    				var tempColor = '';
					    				for(var i=0;i < $totSurvMain.ui.tilePerColor.length; i++){
					    					if($totSurvMain.ui.tilePerColor[i].adm_cd == $ecnmyMap.ui.mapToggleId){
					    						tempColor = $totSurvMain.ui.tilePerColor[i].color
					    					}
					    				}
										//var tempColor = $totSurvMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $ecnmyMap.ui.mapToggleId}).color;
					    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
					    				$("rect[value='"+$ecnmyMap.ui.mapToggleId+"']").attr("fill", tempColor); 
									}
									$ecnmyMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
						    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
								}
					    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
							}
							// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
							setTimeout(function(){
								//$totSurvMain.ui.loading(false); 									
							}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
							// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
						});
						
					});
					
				}
				//색상/버블 (시군구)
				else if(p_map_region == "sgg") {
					console.log("================  sgg  =================");
					// 비자치구 일경우 
					if($ecnmyMap.ui.isAtdrc == true && ($totSurvMain.ui.selectedArea).length == 5){ // 2020-10-07 [곽제욱] 순위검색 case 예외처리 // 2020-11-05 [곽제욱] 조건 추가
						var s_sido_cd = "";
						var s_sgg_cd = "";
						
						if($totSurvMain.ui.selectedArea.length == 5){
							/** 2020-10-14 [곽제욱] 조건문 삭제후 하나로 변경 START */
							s_sido_cd = ($totSurvMain.ui.selectedArea).substring(0,2);
							s_sgg_cd  = ($totSurvMain.ui.selectedArea).substring(2,4)+"0";
							// atdrc 상태에서 랭크이동인 경우 맵토글id 재지정
							/*if($totSurvMain.ui.selectedArea.substring(4,5)!= "0"){
								$ecnmyMap.ui.mapToggleId = $totSurvMain.ui.selectedArea; 
							}*/
							/** 2020-10-14 [곽제욱] 조건문 삭제후 하나로 변경 END */
						} else {
							s_sido_cd = ($totSurvMain.ui.selectedArea).substring(0,2);
							s_sgg_cd  = ($totSurvMain.ui.selectedArea).substring(2,5); 
						}
						console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
						console.log(" sido_cd = " + s_sido_cd);
						console.log(" sgg_cd  = " + s_sgg_cd);
						console.log(" 비자치구 여부 체크 isAtdrc = " + $ecnmyMap.ui.isAtdrc);
						console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
						
						$ecnmyDash.ui.setTotSurvData($ecnmyMap.ui.map, "sgg", "color", s_sido_cd, s_sgg_cd, "", "ecnmy", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							$ecnmyMap.ui.map.setStatsData("normal", {"pAdmCd": s_sido_cd+s_sgg_cd, "result" : p_list}, "dtval_co", lv_unit);
							
							//경계 그리기
							var lv_region = "sgg"; //비자치구 여부 체크
							
							//if(data.atdrc_yn != undefined && data.atdrc_yn != null && data.atdrc_yn == "Y") lv_region = "atdrc";
							$ecnmyMap.ui.setTotSurvRegion($ecnmyMap.ui.map, lv_region, $ecnmyMap.ui.getTotSurvRegionYear(), s_sido_cd+s_sgg_cd, "", "", function() {										
								if($ecnmyMap.ui.mapToggleId != "" && $ecnmyMap.ui.mapToggleId != null){
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									var highLightAmdCd = $ecnmyMap.ui.mapToggleId;
									// 맵토글ID 초기화
									$ecnmyMap.ui.mapToggleId = "";
									$ecnmyMap.ui.map.setPolyLayerHighlight(highLightAmdCd);
									// 하이라이트 처리 후 맵토글ID 세팅
									$ecnmyMap.ui.mapToggleId = highLightAmdCd;
									if($ecnmyMap.ui.tileTempColor!=""){
										$("rect[value='"+$ecnmyMap.ui.mapToggleId+"']").attr("fill", $ecnmyMap.ui.tileTempColor); 
									}
									$ecnmyMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
						    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
						    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
								}
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
								setTimeout(function(){
									//$totSurvMain.ui.loading(false); 									
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
							});
						});
					}
					else{
						$ecnmyMap.ui.isAtdrc = false;
						$ecnmyDash.ui.setTotSurvData($ecnmyMap.ui.map, "sgg", "color", lv_sido_cd, lv_sgg_cd, "", "ecnmy", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
								
							//데이터 넣기
							$ecnmyMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "dtval_co", lv_unit);
							
							//경계 그리기
							var lv_region = "sgg"; //비자치구 여부 체크
							// 시군구레벨인 경우
							$ecnmyMap.ui.setTotSurvRegion($ecnmyMap.ui.map, lv_region, $ecnmyMap.ui.getTotSurvRegionYear(), lv_sido_cd, "", "", function() {
								//2020-12-01 [곽제욱] pathChange 로직 변경 START
								// $totSurvMain.ui.pathChange(lv_region, lv_sido_cd);
								
								/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 START */
								lv_sgg = $("#dash_sgg");
								lv_sgg_cd = $("#dash_sgg").val();
								lv_sgg_nm = $("#dash_sgg option:selected").text();
								/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 END */
								
								var tempRegionCd = lv_sido_cd;
								if(lv_sgg_cd != "999" && lv_sgg_cd != "" && lv_sgg_cd != null){
									tempRegionCd += lv_sgg_cd;
									if(tempRegionCd.substring(4,5)=="0"){
										lv_region = "atdrc";											
									} else {
										lv_region = "emdong";
									}
								}
								//$ecnmyDash.event.pathChange(lv_region, tempRegionCd);
								
								//2020-12-01 [곽제욱] pathChange 로직 변경 END
								if($totSurvMain.ui.selectedThema == "인구"){
									$totSurvMain.ui.selectedLevel = 2;
								}
								if($ecnmyMap.ui.mapToggleId != "" && $ecnmyMap.ui.mapToggleId != null){
									// 랭크이동시 mapToggleId를 초기화하고 하이라이트 처리
									var highLightAmdCd = $ecnmyMap.ui.mapToggleId;
									// 맵토글ID 초기화
									$ecnmyMap.ui.mapToggleId = "";
									$ecnmyMap.ui.map.setPolyLayerHighlight(highLightAmdCd);
									// 하이라이트 처리 후 맵토글ID 세팅
									$ecnmyMap.ui.mapToggleId = highLightAmdCd;
									// 2020-11-02 [곽제욱] 타일차트 색변경 추가 START
									if($ecnmyMap.ui.tileTempColor!=""){
										$("rect[value='"+$ecnmyMap.ui.mapToggleId+"']").attr("fill", $ecnmyMap.ui.tileTempColor); 
									}
									$ecnmyMap.ui.tileTempColor = $("rect[value='"+adm_cd+"']").attr("fill");
						    		$("rect[value='"+adm_cd+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
						    		// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
								}
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 START
								setTimeout(function(){
									//$totSurvMain.ui.loading(false); 									
								}, 500) // 2020-11-23 [곽제욱] 맵 그리기 완료 1초에서 0.5초로 수정
								// 2020-11-19 [곽제욱] 맵 그리기 완료 + 1초후 loading바 닫기 END
							});
						});
						
					}
				}
				//색상/버블 (읍면동)
				else if(p_map_region == "emdong") {
					
					console.log("================  emdong  =================");
					
				}
				
				var zoomlevel = $ecnmyMap.ui.map.zoom;
				var coord_x;
				var coord_y;
				
				
				var adm_cd = $totSurvMain.ui.selectedArea;
				console.log("[ecnmyMap] ###  adm_cd = " + adm_cd);
				
					/** 시도별 zoom 설정 */
				switch (adm_cd.length) {
		            case 2:
		            	if($totSurvMain.ui.selectedLevel == "1" || $totSurvMain.ui.selectedLevel == "0") {
			               coord_x = $("#dash_sido option:selected").data("coor-x");
			               coord_y = $("#dash_sido option:selected").data("coor-y");
			               
		                   if(adm_cd == '11' || adm_cd == '21' || adm_cd == '22' ||
		                         adm_cd == '24' || adm_cd == '25' || adm_cd == '26' || adm_cd == '29'){
		                      // 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
		                   } else if(adm_cd == '23' || adm_cd == '39') {
		                      // 인천(23), 제주(39)
		                   } else if(adm_cd == '31' || adm_cd == '32' || adm_cd == '33' ||
		                         adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '37' || adm_cd == '38') {
		                      // 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
		                   }
		            	} else if($totSurvMain.ui.selectedLevel == "2"){
			            	coord_x = $("#dash_sgg option:selected").data("coor-x");
				            coord_y = $("#dash_sgg option:selected").data("coor-y");
		            	}
		               break;
		            case 5:
		               coord_x = $("#dash_sgg option:selected").data("coor-x");
		               coord_y = $("#dash_sgg option:selected").data("coor-y");
		               break;
		            default:
		            	  coord_x = 990480.875;
		                  coord_y = 1815839.375; 
		               break;
		         }
				
				console.log("zoomlevel = " + zoomlevel);
				
				setTimeout(function(){
					$totSurvMain.ui.loading(false); 									
				}, 500);
			}
			//열지도
			else if(p_map_type == "heat") {}
			//POI
			else if(p_map_type == "poi") {}
			
			$ecnmyDash.loading = false;
		},
		
		/**
		 * 
		 * @name         : setTotSurvData
		 * @description  : 지도 데이터 가져오기
		 * @date         : 2021. 08. 05. 
		 * @author	     : 이영호
		 * @history 	 : 
		 * @param
		 * 		p_callback : 콜백 함수
		 */
		setTotSurvData : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_surv_id, p_callback) {			
			//변수 선언
			var lv_tot_surv_id = p_surv_id;
			//adm_cd
			var lv_adm_cd = "00";
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
				}
			}
			
			//파라미터
			var lv_params = {};
			lv_params.surv_id = p_surv_id;
			lv_params.surv_year = (p_surv_id=="PH0298") ? $totSurvMain.ui.timeTotPopulationYear : $totSurvMain.ui.selectedYear;
			lv_params.itm_cd = $ecnmyMap.ui.selectedItmCd;
			// 비자치구 여부 
			lv_params.isAtdrc = $ecnmyMap.ui.isAtdrc;
			
			var p_c1 = $ecnmyMap.ui.selectedC1;
			var p_c2 = $ecnmyMap.ui.selectedC2; 
			
			if(p_type != undefined && p_type != null && p_type != "") lv_params.map_ty = p_type;
			//p_region : poi는 기본적으로 all이지만 열지도는 all이 아니므로 all일때는 그냥 파라미터 제외함.
			if(p_region != undefined && p_region != null && p_region != "" && p_region != "all") lv_params.area_bndry_se = p_region;
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") lv_params.sido_cd = p_sido_cd;
			if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") lv_params.sgg_cd = p_sgg_cd;
			if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_params.emdong_cd = p_emdong_cd;
			if(p_c1 != undefined && p_c1 != null && p_c1 != "") lv_params.c1 = p_c1;
			if(p_c2 != undefined && p_c2 != null && p_c2 != "") lv_params.c2 = p_c2;
			
			if($totSurvMain.ui.selectedArea.length == 2){ // 2020-10-14 [박은식] 랭킹 조회 조건 변경
				level = 'sido'
			} else if($totSurvMain.ui.selectedArea.length == 5 && $ecnmyMap.ui.isAtdrc){
				level = 'atdrc'// atdrc
			} else {
				level ='sgg'
			}
			if($ecnmyDash.ajax.params.char_itm_id_list != "") {
				if($ecnmyDash.ajax.params.char_itm_id_list.indexOf(",") != -1) {
					$ecnmyDash.ajax.params.char_itm_id_list = $ecnmyDash.ajax.params.char_itm_id_list.split(",")[0];
				}				
			} else {
				$ecnmyDash.ajax.params.char_itm_id_list = "T10";				
			}
			
			$ecnmyDash.ajax.params[$ecnmyDash.admLv] = "";
			$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = $ecnmyDash.selectedItmId;
			if(p_region.length == 2) {
				$ecnmyDash.ajax.params.adm_cd = $ecnmyDash.admLv.split("_")[1] + ":00";
			} else {				
				$ecnmyDash.ajax.params.adm_cd = $ecnmyMap.ui.isAtdrc 
				? $ecnmyDash.admLv.split("_")[1] + ":" + $totSurvMain.ui.selectedArea.substring(0,4)
				: $ecnmyDash.admLv.split("_")[1] + ":" + $totSurvMain.ui.selectedArea;
			}
			$ecnmyDash.ajax.params.adm_unit = level;
			$ecnmyDash.ajax.params.prt_type = "part";
			 
			// 선택년도			
			$.ajax({
				method: "GET",
				async: false,	// 반드시 동기처리 해야 함
				//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
				data: $ecnmyDash.ajax.params, // 
				dataType: "json",
				success: function(res) {
					//2021-08-09 [이영호] 비율계산을 위한 맵데이터값 계산로직 START 경총
					//if(res[0].ADM_CD.length == 2) {
						$ecnmyMap.ui.mapTotalVal = 0;
						if(res[0].ADM_CD == "00") {
							$ecnmyMap.ui.mapTotalVal = parseFloat(res[0].DTVAL_CO);
						} else {
							for(var i=0; i<res.length; i++) {
								if($totSurvMain.ui.selectedArea.length == 2) {
									$ecnmyMap.ui.checkIsAtdrc(res[i].ADM_CD);
									if(!$ecnmyMap.ui.isAtdrc){
										$ecnmyMap.ui.mapTotalVal += parseFloat(res[i].DTVAL_CO);
									}
								} else if($totSurvMain.ui.selectedArea.length == 5) {
									$ecnmyMap.ui.checkIsAtdrc(res[i].ADM_CD);
									if($ecnmyMap.ui.isAtdrc){
										$ecnmyMap.ui.mapTotalVal += parseFloat(res[i].DTVAL_CO);
									}
								}
							}
						}
					//}
					
					
					for(var i=0; i<res.length; i++) {
						res[i] = Object.keys(res[i]).reduce(function(obj, key) {
							obj[key.toLowerCase()] = res[i][key];
							return obj;
						}, {});
					}
					let result = [];
					if($ecnmyMap.ui.isAtdrc) {
						for(var i=0; i<res.length; i++) {
							result.push(res[i]);
						}	
					} else {
						for(var i=0; i<res.length; i++) {
							if(res[i].adm_cd.substring(4,5) == "0" || res[i].adm_cd.length == 2) {
								result.push(res[i]);
							}
						}
					}
										
					//정보 저장
					$ecnmyMap.ui.mapStatsData[res[0].tbl_id] = result;
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback(res);
					}					
				},
				error: function(e) {
					//$totSurvMain.ui.alert(errorMessage);
				}
			});
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
			$("#totalEcnmy").hide();
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 START
			if(regionCd.length == 5){
				$ecnmyMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
			}
			// 2020-12-01 [곽제욱] 랭크이동으로 조회할경우 isAtdrc 새로 체크 END								
			
			if(regionCd!=""){
				$("#dash_sido").val(regionCd.substring(0,2));
			}
			//남녀성비, 외국인 슬라이드로 조회 시 ragionCd를 param으로 넘기지 않음. regionCd결과값을 받기위해 ajax안으로 변경 END
			
			var sido = regionCd.substring(0,2);
			var sgg = regionCd.substring(2,5);
			if(sgg=="" || sgg==null){
				sgg = "999";
			}
					
			/**행정시 처리 로직 (테스트)*/
			if($ecnmyMap.ui.isAtdrc || $("#corp_rank").attr('max') == $totSurvMain.ui.atdrcRank){
				//현재 행정시도정보를 저장한다. 
				//비자치구와 행정시의 4자리수까지는 같다는 점을 이용한다
				$ecnmyDash.atdrc = $totSurvMain.ui.selectedArea.substring(4,0);
			}
			
			/**행정시 처리 로직 (테스트)*/
			
			var param = {};
			var type = 'house';
			var level = 'sido';

			if(regionCd.length == 2){ // 2020-10-14 [박은식] 랭킹 조회 조건 변경
				level = 'sido';
			} else if(regionCd.length == 5 && regionCd.substring(4) != '0') {
				level = 'atdrc';// atdrc
			} else if(regionCd.length == 5 && regionCd.substring(4) == '0') {
				level ='sgg';
			} else {
				level ='emdong';
			}
			
			let currentYear = $totSurvMain.ui.selectedYear;
			let beforeYear = $totSurvMain.ui.selectedYear - $ecnmyMap.ui.totTms[0].updt_cycle < 0 ? $ecnmyMap.ui.totTms[0].start_year : $totSurvMain.ui.selectedYear - $ecnmyMap.ui.totTms[0].updt_cycle;				
					
			if(regionCd != "") {				
				$ecnmyMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
				$ecnmyDash.event.setDefaultParams(currentYear);
				$ecnmyDash.ajax.params.char_itm_id_list = "T10,T20,T30";
				$ecnmyDash.ajax.params[$ecnmyDash.admLv] = "";
				$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "0";
				if(regionCd.length == 2) {
					$ecnmyDash.ajax.params.adm_cd = $ecnmyDash.admLv.split("_")[1] + ":00";
				} else {				
					$ecnmyDash.ajax.params.adm_cd = $ecnmyMap.ui.isAtdrc 
					? $ecnmyDash.admLv.split("_")[1] + ":" + regionCd.substring(0,4)
					: $ecnmyDash.admLv.split("_")[1] + ":" + regionCd;
				}
				$ecnmyDash.ajax.params.adm_unit = level;
				$ecnmyDash.ajax.params.prt_type = "total";
				
				$.ajax({
		    		type:"GET",
		    		//url: "/view/kosisApi/TotsurvStatData.do",
		    		url: sgis4thApiPath,
					async: false,
			 		data: $ecnmyDash.ajax.params,
		    		success:function( result ){
		    			if( result ){
							$ecnmyDash.currentData.ecnmyRank = {};
							for(var i=0; i<result.length; i++) {
								if($ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID] == undefined) {
									$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID] = [];
								}
								if($ecnmyMap.ui.isAtdrc) {
									if($ecnmyDash.ajax.params.adm_unit == "sgg") {
										if(result[i].ADM_CD.length == 5 && result[i].ADM_CD.substring(4,5) == "0") {										
											if(result[i] != null && result[i].CHAR_ITM_ID == "T10") { // T10 사업체수										
												$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
											} else if(result[i] != null && result[i].CHAR_ITM_ID == "T20") { // T20 종사자수
												$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
											} else if(result[i] != null && result[i].CHAR_ITM_ID == "T30") { // T30 매출액 
												$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
											}
										}
									} else {
										if(result[i].ADM_CD.length == 5 && result[i].ADM_CD.substring(4,5) != "0") {										
											if(result[i] != null && result[i].CHAR_ITM_ID == "T10") { // T10 사업체수										
												$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
											} else if(result[i] != null && result[i].CHAR_ITM_ID == "T20") { // T20 종사자수
												$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
											} else if(result[i] != null && result[i].CHAR_ITM_ID == "T30") { // T30 매출액 
												$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
											}
										}
									}
								} else {
									if(result[i].ADM_CD.length == 2 || (result[i].ADM_CD.length == 5 && result[i].ADM_CD.substring(4,5) == "0")) {
										if(result[i] != null && result[i].CHAR_ITM_ID == "T10") { // T10 사업체수										
											$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
										} else if(result[i] != null && result[i].CHAR_ITM_ID == "T20") { // T20 종사자수
											$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
										} else if(result[i] != null && result[i].CHAR_ITM_ID == "T30") { // T30 매출액 
											$ecnmyDash.currentData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
										}
									}
								}
							}
		    			}
		    		},
		    		error:function(data) {
		    			alert('오류발생~!');
		    		}
		    	});
	
				if(currentYear != beforeYear){
					$ecnmyDash.event.setDefaultParams(beforeYear);
					$ecnmyDash.ajax.params.char_itm_id_list = "T10,T20,T30";
					$ecnmyDash.ajax.params[$ecnmyDash.admLv] = "";
					$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "0";
					if(regionCd.length == 2) {
						$ecnmyDash.ajax.params.adm_cd = $ecnmyDash.admLv.split("_")[1] + ":00";
					} else {				
						$ecnmyDash.ajax.params.adm_cd = $ecnmyMap.ui.isAtdrc 
						? $ecnmyDash.admLv.split("_")[1] + ":" + $totSurvMain.ui.selectedArea.substring(0,4)
						: $ecnmyDash.admLv.split("_")[1] + ":" + $totSurvMain.ui.selectedArea;
					}
					$ecnmyDash.ajax.params.adm_unit = level;
					$.ajax({
			    		type:"GET",
						async: false,
			    		//url: "/view/kosisApi/TotsurvStatData.do",
						url: sgis4thApiPath,
				 		data: $ecnmyDash.ajax.params,
			    		success:function( result ){
			    			if( result ){
								$ecnmyDash.beforeData.ecnmyRank = {};
								for(var i=0; i<result.length; i++) {
									if($ecnmyDash.beforeData.ecnmyRank[result[i].CHAR_ITM_ID] == undefined) {
										$ecnmyDash.beforeData.ecnmyRank[result[i].CHAR_ITM_ID] = [];
									}
									if(result[i] != null && result[i].CHAR_ITM_ID == "T10") { // T10 사업체수										
										$ecnmyDash.beforeData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
									} else if(result[i] != null && result[i].CHAR_ITM_ID == "T20") { // T20 종사자수
										$ecnmyDash.beforeData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
									} else if(result[i] != null && result[i].CHAR_ITM_ID == "T30") { // T30 매출액 
										$ecnmyDash.beforeData.ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
									}
								}
			    			}
			    		},
			    		error:function(data) {
			    			alert('오류발생~!');
			    		}
			    	});
					$ecnmyDash.event.setDefaultParams(currentYear);
					$ecnmyDash.ajax.params.adm_cd = $ecnmyDash.admLv.split("_")[1] + ":" + regionCd;
				}
				
				let workerRatio = 0, ratioStr = "";
				let ecnmyRank, workerRank, salesRank; 
				
				let tgRegionCd = "";
				if(rank != "" && target != "") {
					let idx = parseInt(rank);
					if(target == "corp_rank") {
						tgRegionCd = $ecnmyDash.currentData.ecnmyRank["T10"][idx].ADM_CD;
					} else if(target == "worker_rank") {
						tgRegionCd = $ecnmyDash.currentData.ecnmyRank["T20"][idx].ADM_CD;
					} else if(target == "sales_rank") {
						tgRegionCd = $ecnmyDash.currentData.ecnmyRank["T30"][idx].ADM_CD;
					}				
				}	
				
				if(tgRegionCd != "") {
					regionCd = tgRegionCd;
				}
				
				if(target != '' && target != null){
					/** 2020-09-22 [곽제욱] 맵토글id 초기화 */
					/** set Area */
					$totSurvMain.ui.selectedArea = regionCd;
					/** init chart */
					$ecnmyDash.ui.clear();
					
					/** chart renderer */
					if(regionCd.length == 2){
			    		$("#dash_sido option[value='"+regionCd+"']").attr("selected", "true");
			    		if(regionCd != '00' && regionCd != '99'){
			    			$("#dash_sgg option[value='999']").attr("selected", "true");
			    		}
			    		$totSurvMain.ui.tileChangeYn = "Y"; 
			    		$totSurvMain.ui.selectedLevel = "1";
			    	}
			    	// 시군구 데이터 일 경우 kosis정보 호출
					/** 2020-09-21 [곽제욱] 시군구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
			    	else if(regionCd.length == 5){
			    		var tempRegionCd = regionCd.substring(0,4)+"0";
			    		$ecnmyMap.ui.checkIsAtdrc(tempRegionCd);								    		
			    		if($ecnmyMap.ui.isAtdrc != true){
			    			// sidosgg() 시군구 세팅 로직 추가필요
			    			/** 2020-10-06 [곽제욱] 비자치구가 아닐경우 이동후 하이라이트처리 START */
			    			//$totSurvMain.ui.getSidoSggPos(regionCd.substring(0,2));
			    			$totSurvMain.ui.getSidoSggPos(regionCd);
			    			$("#dash_sido").val(regionCd.substring(0,2));
			    			$totSurvMain.ui.selectedArea = regionCd;
			    			$ecnmyMap.ui.mapToggleId = regionCd;
			    			/** 2020-10-06 [곽제욱] 비자치구가 아닐경우 이동후 하이라이트처리 END */
			    		}
			    		/** 2020-09-21 [곽제욱] 비자치구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
			    		else{
			    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 START */
			    			$ecnmyMap.ui.mapToggleId = ""; //2020-10-14 [곽제욱] 자치구 이동관련하여 토글아이디 초기화 
			    			$totSurvMain.ui.selectedArea = regionCd;
			    			$totSurvMain.ui.getSidoSggPos(regionCd);
			    			$("#dash_sido").val(regionCd.substring(0,2));
			    			console.log("#########################   비자치구 클릭됨     ##############");
			    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 END */
			    		}
			    	}
				}
				
				let curEcnmyRankT10 = $ecnmyDash.currentData.ecnmyRank["T10"];
				if(curEcnmyRankT10 != undefined) {
					for(var i=0; i<curEcnmyRankT10.length; i++) {						
						if(curEcnmyRankT10[i].ADM_CD == regionCd) {
							ecnmyRank = curEcnmyRankT10[i];
							ecnmyRank.rank = i;
							let befEcnmyRank = $ecnmyDash.beforeData.ecnmyRank["T10"], isExist = false;
							if(befEcnmyRank != undefined) {
								for(var j=0; j<befEcnmyRank.length; j++) {
									if(curEcnmyRankT10[i].ADM_CD == befEcnmyRank[j].ADM_CD) {
										isExist = true;									
										workerRatio = ((parseInt($ecnmyDash.beforeData.ecnmyRank["T10"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T10"][i].DTVAL_CO))
															/parseInt($ecnmyDash.beforeData.ecnmyRank["T10"][j].DTVAL_CO)*100).toFixed(1);
										let increaseVal = parseInt($ecnmyDash.beforeData.ecnmyRank["T10"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T10"][i].DTVAL_CO);
										if(workerRatio < 0) {
											$("#ecnmyChangeRt").html(
												"<span class='ml5 black'>" +
												"전주기 대비 <span class='stats_up bold'>" + workerRatio.replace("-", "") +" % </span><span class='stats_up'>▲</span>"
											);
											$("#ecnmyRt").html(
												"<span class='stats_up bold'>" + numberFormat(Math.abs(increaseVal)) + "</span>" +
												"<span class='ml5 red'>개 증가</span>"
											);	
										} else if(workerRatio > 0) {
											$("#ecnmyChangeRt").html("<span class='ml5 black'>" +
												"전주기 대비 <span class='stats_down bold'>" + workerRatio +" % </span><span class='stats_down'>▼</span>");
											$("#ecnmyRt").html(
												"<span class='stats_down bold'>" + numberFormat(Math.abs(increaseVal)) + "</span>" +
												"<span class='ml5 blue'>개 감소</span>"
											);
										} else {
											$("#ecnmyChangeRt").html("<span class='stats_normal bold'>" + workerRatio +" % </span><span class='stats_normal'>-</span>");
											$("#ecnmyRt").html("변동 없음");
										}
									}
								}
								if(!isExist) {
									$("#ecnmyRt").html("0");
									$("#ecnmyChangeRt").html("전주기 자료 없음");
								}
							} else {
								$("#ecnmyRt").html(numberFormat(parseInt($ecnmyDash.currentData.ecnmyRank["T10"][i].DTVAL_CO)) +
								"<span class='ml5 black'>개</span>");
								$("#ecnmyChangeRt").html("전주기 자료 없음");
							}
						}
					}
				} else {
					$("#ecnmyRt").html("0");
					$("#ecnmyChangeRt").html("전주기 자료 없음");
				}
				
				let curEcnmyRankT20 = $ecnmyDash.currentData.ecnmyRank["T20"], isExist = false;
				if(curEcnmyRankT20 != undefined) {
					for(var i=0; i<curEcnmyRankT20.length; i++) {
						if(curEcnmyRankT20[i].ADM_CD == regionCd) {
							workerRank = curEcnmyRankT20[i];
							workerRank.rank = i;
							let befEcnmyRank = $ecnmyDash.beforeData.ecnmyRank["T20"];
							if(befEcnmyRank != undefined) {
								for(var j=0; j<befEcnmyRank.length; j++) {
									if(curEcnmyRankT20[i].ADM_CD == befEcnmyRank[j].ADM_CD) {
										isExist = true;			
										workerRatio = ((parseInt($ecnmyDash.beforeData.ecnmyRank["T20"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T20"][i].DTVAL_CO))
															/parseInt($ecnmyDash.beforeData.ecnmyRank["T20"][j].DTVAL_CO)*100).toFixed(1);
										let increaseVal = parseInt($ecnmyDash.beforeData.ecnmyRank["T20"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T20"][i].DTVAL_CO);
										if(workerRatio < 0) {
											$("#workerRatioChangeRt").html(
												"<span class='ml5 black'>" +
												"전주기 대비 <span class='stats_up bold'>" + workerRatio.replace("-", "") +" % </span><span class='stats_up'>▲</span>"
											);
										} else if(workerRatio > 0) {
											$("#workerRatioChangeRt").html(
												"<span class='ml5 black'>" +
												"전주기 대비 <span class='stats_up bold'>" + workerRatio.replace("-", "") +" % </span><span class='stats_down'>▼</span>"
											);
										} else {
											$("#workerRatioChangeRtworkerRatioChangeRt").html("<span class='stats_normal bold'>" + workerRatio +" % </span><span class='stats_normal'>-</span>");
											$("#workerRatioChangeRt").html("변동 없음");
										}
										$("#workerRatioRt").html(numberFormat(parseInt($ecnmyDash.currentData.ecnmyRank["T20"][i].DTVAL_CO)) + 
											"<span class='ml5 black'>명</span>");
									}		
								}
								if(!isExist) {
									$("#workerRatioRt").html("0");
									$("#workerRatioChangeRt").html("전주기 자료 없음");
								}
							} else {
								$("#workerRatioRt").html(numberFormat(parseInt($ecnmyDash.currentData.ecnmyRank["T20"][i].DTVAL_CO)) +
								"<span class='ml5 black'>명</span>");
								$("#workerRatioChangeRt").html("전주기 자료 없음");
							}
						}						
					}
				} else {
					$("#workerRatioRt").html("0");
					$("#workerRatioChangeRt").html("");
				}
							
				let curEcnmyRankT30 = $ecnmyDash.currentData.ecnmyRank["T30"];
				if(curEcnmyRankT30 != undefined) {
					for(var i=0; i<curEcnmyRankT30.length; i++) {
						if(curEcnmyRankT30[i].ADM_CD == regionCd) {
							salesRank = curEcnmyRankT30[i];
							salesRank.rank = i;
							let befEcnmyRank = $ecnmyDash.beforeData.ecnmyRank["T30"], isExist = false;
							if(befEcnmyRank != undefined) {
								for(var j=0; j<befEcnmyRank.length; j++) {
									if(curEcnmyRankT30[i].ADM_CD == befEcnmyRank[j].ADM_CD) {
										isExist = true;
										salesRatio = ((parseInt($ecnmyDash.beforeData.ecnmyRank["T30"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T30"][i].DTVAL_CO))
															/parseInt($ecnmyDash.beforeData.ecnmyRank["T30"][j].DTVAL_CO)*100).toFixed(1);
										let sales = parseInt($ecnmyDash.currentData.ecnmyRank["T30"][i].DTVAL_CO);
										if(salesRatio < 0) {
											$("#salesChangeRt").html(
												"<span class='ml5 black'>" +
												"전주기 대비 <span class='stats_up bold'>" + salesRatio.replace("-", "") +" % </span><span class='stats_up'>▲</span>"
											);											
										} else if(salesRatio > 0) {
											$("#salesChangeRt").html("<span class='ml5 black'>" +
												"전주기 대비 <span class='stats_down bold'>" + salesRatio +" % </span><span class='stats_down'>▼</span>"
											);
										} else {
											$("#salesChangeRt").html("<span class='stats_normal bold'>" + salesRatio +" % </span><span class='stats_normal'>-</span>");
											$("#salesDt").html("변동 없음");
										}
										$("#salesDt").html(
											"<span class='bold'>" + numberFormat(Math.abs(sales)) + "</span>" +
											"<span class='ml5 black'></span>" +
											"<span class='ml5 black'>" + $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm + "</span>"
										);	
									}		
								}
								if(!isExist) {
									$("#salesDt").html("0");
									$("#salesChangeRt").html("전주기 자료 없음");
								}
							} else {
								$("#salesDt").html(numberFormat(parseInt($ecnmyDash.currentData.ecnmyRank["T30"][i].DTVAL_CO)) +
								"<span class='ml5 black'>" + $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm + "</span>");
								$("#salesChangeRt").html("전주기 자료 없음");
							}
						}
					}
				} else {
					$("#salesDt").html("0");
					$("#salesChangeRt").html("증");
				}
				
				$ecnmyDash.ui.rankSlideRender(regionCd, ecnmyRank, workerRank, salesRank, $ecnmyMap.ui.mapToggleId);
				$ecnmyDash.upperBack = false;
				if($totSurvMain.ui.chartTarget != ""
					&& typeof($totSurvMain.ui.chartIndex) == "number"
					&& $totSurvMain.ui.chartColor != ""){
					 
					$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
				}
			} else {
				let workerRatio = 0, ratioStr = "";
				let ecnmyRank, workerRank, salesRank; 
				
				let tgRegionCd = "";
				if(rank != "" && target != "") {
					let idx = parseInt(rank);
					if(target == "corp_rank") {
						tgRegionCd = $ecnmyDash.currentData.ecnmyRank["T10"][idx].ADM_CD;
					} else if(target == "worker_rank") {
						tgRegionCd = $ecnmyDash.currentData.ecnmyRank["T20"][idx].ADM_CD;
					} else if(target == "sales_rank") {
						tgRegionCd = $ecnmyDash.currentData.ecnmyRank["T30"][idx].ADM_CD;
					}				
				}	
				
				if(tgRegionCd != "") {
					regionCd = tgRegionCd;
				}
				
				if(target != '' && target != null){
					/** 2020-09-22 [곽제욱] 맵토글id 초기화 */
					/** set Area */
					$totSurvMain.ui.selectedArea = regionCd;
					/** init chart */
					$ecnmyDash.ui.clear();
					
					/** chart renderer */
					if(regionCd.length == 2){
			    		$("#dash_sido option[value='"+regionCd+"']").attr("selected", "true");
			    		if(regionCd != '00' && regionCd != '99'){
			    			$("#dash_sgg option[value='999']").attr("selected", "true");
			    		}
			    		$totSurvMain.ui.tileChangeYn = "Y"; 
			    		$totSurvMain.ui.selectedLevel = "1";
			    	}
			    	// 시군구 데이터 일 경우 kosis정보 호출
					/** 2020-09-21 [곽제욱] 시군구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
			    	else if(regionCd.length == 5){
			    		var tempRegionCd = regionCd.substring(0,4)+"0";
			    		$ecnmyMap.ui.checkIsAtdrc(tempRegionCd);								    		
			    		if($ecnmyMap.ui.isAtdrc != true){
			    			// sidosgg() 시군구 세팅 로직 추가필요
			    			/** 2020-10-06 [곽제욱] 비자치구가 아닐경우 이동후 하이라이트처리 START */
			    			//$totSurvMain.ui.getSidoSggPos(regionCd.substring(0,2));
			    			$totSurvMain.ui.getSidoSggPos(regionCd);
			    			$("#dash_sido").val(regionCd.substring(0,2));
			    			$totSurvMain.ui.selectedArea = regionCd;
			    			$ecnmyMap.ui.mapToggleId = regionCd;
			    			/** 2020-10-06 [곽제욱] 비자치구가 아닐경우 이동후 하이라이트처리 END */
			    		}
			    		/** 2020-09-21 [곽제욱] 비자치구 상태에서 슬라이드 이동시 시군구 레벨로 이동, 선택지역을 하이라이트 처리하도록 변경 */
			    		else{
			    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 START */
			    			$ecnmyMap.ui.mapToggleId = ""; //2020-10-14 [곽제욱] 자치구 이동관련하여 토글아이디 초기화 
			    			$totSurvMain.ui.selectedArea = regionCd;
			    			$totSurvMain.ui.getSidoSggPos(regionCd);
			    			$("#dash_sido").val(regionCd.substring(0,2));
			    			console.log("#########################   비자치구 클릭됨     ##############");
			    			/** 2020-10-06 [곽제욱] 자치구일 경우 이동후 하이라이트처리 END */
			    		}
			    	}
				}
				
				if($ecnmyDash.currentData.ecnmyRank["T10"] != undefined) {
					let curEcnmyRank = $ecnmyDash.currentData.ecnmyRank["T10"];
					if(curEcnmyRank != undefined) {
						for(var i=0; i<curEcnmyRank.length; i++) {						
							if(curEcnmyRank[i].ADM_CD == regionCd) {
								ecnmyRank = curEcnmyRank[i];
								ecnmyRank.rank = i;
								let befEcnmyRank = $ecnmyDash.beforeData.ecnmyRank["T10"], isExist = false;
								if(befEcnmyRank != undefined) {
									for(var j=0; j<befEcnmyRank.length; j++) {
										if(curEcnmyRank[i].ADM_CD == befEcnmyRank[j].ADM_CD) {
											isExist = true;									
											workerRatio = ((parseInt($ecnmyDash.beforeData.ecnmyRank["T10"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T10"][i].DTVAL_CO))
																/parseInt($ecnmyDash.beforeData.ecnmyRank["T10"][j].DTVAL_CO)*100).toFixed(1);
											let increaseVal = parseInt($ecnmyDash.beforeData.ecnmyRank["T10"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T10"][i].DTVAL_CO);
											if(workerRatio < 0) {
												$("#ecnmyChangeRt").html(
													"<span class='ml5 black'>" +
													"전주기 대비 <span class='stats_up bold'>" + workerRatio.replace("-", "") +" % </span><span class='stats_up'>▲</span>"
												);
												$("#ecnmyRt").html(
													"<span class='stats_up bold'>" + numberFormat(Math.abs(increaseVal)) + "</span>" +
													"<span class='ml5 red'>개 증가</span>"
												);	
											} else if(workerRatio > 0) {
												$("#ecnmyChangeRt").html("<span class='ml5 black'>" +
													"전주기 대비 <span class='stats_down bold'>" + workerRatio +" % </span><span class='stats_down'>▼</span>");
												$("#ecnmyRt").html(
													"<span class='stats_down bold'>" + numberFormat(Math.abs(increaseVal)) + "</span>" +
													"<span class='ml5 blue'>개 감소</span>"
												);
											} else {
												$("#ecnmyChangeRt").html("<span class='stats_normal bold'>" + workerRatio +" % </span><span class='stats_normal'>-</span>");
												$("#ecnmyRt").html("증감율 데이터 없음");
											}
										}
									}
									if(!isExist) {
										$("#ecnmyRt").html("0");
										$("#ecnmyChangeRt").html("증감율 데이터 없음");
									}
								} else {
									$("#ecnmyChangeRt").html("증감율 데이터 없음");
								}
							}						
						}
					} else {
						$("#ecnmyRt").html("0");
						$("#ecnmyChangeRt").html("증감율 데이터 없음");
					}
				} else {
					$("#workerRatioChangeRt").html("증감율 데이터 없음");
				}
				
				if($ecnmyDash.currentData.ecnmyRank["T20"] != undefined) {
					let curEcnmyRank = $ecnmyDash.currentData.ecnmyRank["T20"], isExist = false;
					if(curEcnmyRank != undefined) {
						for(var i=0; i<curEcnmyRank.length; i++) {
							if(curEcnmyRank[i].ADM_CD == regionCd) {								
								workerRank = curEcnmyRank[i];
								workerRank.rank = i;
								let befEcnmyRank = $ecnmyDash.beforeData.ecnmyRank["T20"];
								if(befEcnmyRank != undefined) {
									for(var j=0; j<befEcnmyRank.length; j++) {
										if(curEcnmyRank[i].ADM_CD == befEcnmyRank[j].ADM_CD) {
											isExist = true;			
											workerRatio = ((parseInt($ecnmyDash.beforeData.ecnmyRank["T20"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T20"][i].DTVAL_CO))
																/parseInt($ecnmyDash.beforeData.ecnmyRank["T20"][j].DTVAL_CO)*100).toFixed(1);
											let increaseVal = parseInt($ecnmyDash.beforeData.ecnmyRank["T20"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T20"][i].DTVAL_CO);
											if(workerRatio < 0) {
												$("#workerRatioChangeRt").html(
													"<span class='ml5 black'>" +
													"전주기 대비 <span class='stats_up bold'>" + workerRatio.replace("-", "") +" % </span><span class='stats_up'>▲</span>"
												);
											} else if(workerRatio > 0) {
												$("#workerRatioChangeRt").html(
													"<span class='ml5 black'>" +
													"전주기 대비 <span class='stats_up bold'>" + workerRatio.replace("-", "") +" % </span><span class='stats_down'>▼</span>"
												);
											} else {
												$("#workerRatioChangeRtworkerRatioChangeRt").html("<span class='stats_normal bold'>" + workerRatio +" % </span><span class='stats_normal'>-</span>");
												$("#workerRatioChangeRt").html("증감율 데이터 없음");
											}
											$("#workerRatioRt").html(numberFormat(parseInt($ecnmyDash.currentData.ecnmyRank["T20"][i].DTVAL_CO)) + 
												"<span class='ml5 black'>명</span>");
										}		
									}
									if(!isExist) {
										$("#workerRatioRt").html("0");
										$("#workerRatioChangeRt").html("증감율 데이터 없음");
									}
								} else {
									$("#workerRatioChangeRt").html("증감율 데이터 없음");
								}
							}						
						}
					} else {
						$("#workerRatioRt").html("0");
						$("#workerRatioChangeRt").html("증감율 데이터 없음");
					}				
				} else {
					$("#workerRatioChangeRt").html("증감율 데이터 없음");
				}
							
				if($ecnmyDash.currentData.ecnmyRank["T30"] != undefined) {
					let curEcnmyRank = $ecnmyDash.currentData.ecnmyRank["T30"];
					if(curEcnmyRank != undefined) {
						for(var i=0; i<curEcnmyRank.length; i++) {
							if(curEcnmyRank[i].ADM_CD == regionCd) {								
								salesRank = curEcnmyRank[i];
								salesRank.rank = i;
								let befEcnmyRank = $ecnmyDash.beforeData.ecnmyRank["T30"], isExist = false;
								if(befEcnmyRank != undefined) {
									for(var j=0; j<befEcnmyRank.length; j++) {
										if(curEcnmyRank[i].ADM_CD == befEcnmyRank[j].ADM_CD) {
											isExist = true;
											salesRatio = ((parseInt($ecnmyDash.beforeData.ecnmyRank["T30"][j].DTVAL_CO)-parseInt($ecnmyDash.currentData.ecnmyRank["T30"][i].DTVAL_CO))
																/parseInt($ecnmyDash.beforeData.ecnmyRank["T30"][j].DTVAL_CO)*100).toFixed(1);
											let sales = parseInt($ecnmyDash.currentData.ecnmyRank["T30"][i].DTVAL_CO);
											if(salesRatio < 0) {
												$("#salesChangeRt").html(
													"<span class='ml5 black'>" +
													"전주기 대비 <span class='stats_up bold'>" + salesRatio.replace("-", "") +" % </span><span class='stats_up'>▲</span>"
												);											
											} else if(salesRatio > 0) {
												$("#salesChangeRt").html("<span class='ml5 black'>" +
													"전주기 대비 <span class='stats_down bold'>" + salesRatio +" % </span><span class='stats_down'>▼</span>"
												);
											} else {
												$("#salesChangeRt").html("<span class='stats_normal bold'>" + salesRatio +" % </span><span class='stats_normal'>-</span>");
												$("#salesDt").html("증감율 데이터 없음");
											}
											$("#salesDt").html(
												"<span class='bold'>" + numberFormat(Math.abs(sales)) + "</span>" +
												"<span class='ml5 black'></span>" +
												"<span class='ml5 black'>" + $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm + "</span>"
											);	
										}		
									}
									if(!isExist) {
										$("#salesDt").html("0");
										$("#salesChangeRt").html("");
									}
								} else {
									$("#salesChangeRt").html("증감율 데이터 없음");
								}
							}
						}
					} else {
						$("#salesDt").html("0");
						$("#salesChangeRt").html("");
					}
				} else {
					$("#salesChangeRt").html("");
				}
				
				
				$ecnmyDash.ui.rankSlideRender(regionCd, ecnmyRank, workerRank, salesRank, $ecnmyMap.ui.mapToggleId);
				$ecnmyDash.upperBack = false;
				if($totSurvMain.ui.chartTarget != ""
					&& typeof($totSurvMain.ui.chartIndex) == "number"
					&& $totSurvMain.ui.chartColor != ""){
					 
					$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
				}	
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
		 * 				 ecnmyRank		: 총주택 rank
		 * 				 workerRatioRank : 증감율 rank
		 * 				 salesRank		: 빈주택 rank
		 */
		rankSlideRender : function(regionCd, ecnmyRank, workerRank, salesRank, toggleId){			
			$totSurvMain.ui.tileChangeYn = "Y";
			if(regionCd == "00") {
				$("#corp_range").hide();
				$("#worker_range").hide();
				$("#seles_range").hide();
				return;
			}
			$("#corp_range").show();
			$("#worker_range").show();
			$("#seles_range").show();
			
			let corpCnt = $ecnmyDash.currentData.ecnmyRank["T10"].length-1;
			let workerCnt = $ecnmyDash.currentData.ecnmyRank["T20"].length-1;
			let salesCnt = $ecnmyDash.currentData.ecnmyRank["T30"].length-1;
			$("#corp_rank").attr("max", corpCnt);
			$("#worker_rank").attr("max", workerCnt);
			$("#sales_rank").attr("max", salesCnt);
			$("#corp_range").find("span").eq(1).text(corpCnt+"번");
			$("#worker_range").find("span").eq(1).text(workerCnt+"번");
			$("#seles_range").find("span").eq(1).text(salesCnt+"번");
						
			// 시도이동, 시군구이동의 경우
			if($totSurvMain.ui.selectedArea.length == 2){	// 2020-10-14 [주형식] 시도 비교 로직 수정
				// 그중 시군구 이동(지도에는 시군구 레벨로 표출, 선택지역 하이라이트 처리)				
				if(toggleId.length == 5){
					$ecnmyDash.regionLevel = 'sgg';
					$ecnmyMap.ui.mapToggleId = toggleId;
					$ecnmyDash.event.allChange(toggleId, "2");
				} else {
					$ecnmyDash.regionLevel = 'sido'
				}
			} else { // 2020-10-14 [곽제욱] 비자치구 체크조건 수정
				if($totSurvMain.ui.selectedArea.substring(4,5) != "0") {
					$ecnmyDash.regionLevel = 'atdrc'
				} else {
					$ecnmyDash.regionLevel = 'sgg'
				}
			}
			
			$("#corp_rank").val(ecnmyRank.rank);
			$("#worker_rank").val(workerRank.rank);
			$("#sales_rank").val(salesRank.rank);
			$("#corp_range").find("span").eq(2).text(/*$("#corp_rank").val()*/ecnmyRank.rank+"번째");
			$("#worker_range").find("span").eq(2).text(/*$("#workerRatio_rank").val()*/workerRank.rank+"번째");
			$("#seles_range").find("span").eq(2).text(/*$("#sales_rank").val()*/salesRank.rank+"번째");
			$("#corp_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#corp_rank").attr("max")-1))*($("#corp_rank").val()-1)) + '%, #fff ' + ((100/($("#corp_rank").attr("max")-1))*($("#corp_rank").val()-1)) + '%, white 100%)');
			$("#worker_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#worker_rank").attr("max")-1))*($("#worker_rank").val()-1)) + '%, #fff ' + ((100/($("#worker_rank").attr("max")-1))*($("#worker_rank").val()-1)) + '%, white 100%)');
			$("#sales_rank").css('background','linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/($("#sales_rank").attr("max")-1))*($("#sales_rank").val()-1)) + '%, #fff ' + ((100/($("#sales_rank").attr("max")-1))*($("#sales_rank").val()-1)) + '%, white 100%)');
			$("#ecnmyRank").html(ecnmyRank.rank);
			
			if(regionCd.length == 2){
				$("#ecnmyRanking").html(corpCnt + "개 광역시도 중");
				$("#ecnmyRanking").parent().find(".moreInfoBtn").show();
				$("#ecnmyRanking").parent().find("button").attr("id", "totalSido")
				
				var areaTitle = $("#dash_sido option[value=" + $totSurvMain.ui.selectedArea.substring(0,2) + "]").text();
				
				$("#ecnmyRatioRanking").html(areaTitle + " 종사자 수");
				$("#salesRanking").html(areaTitle + " 매출액");
			} else if(regionCd.length == 5) {
				var areaTitle = $("#dash_sgg option:selected").text();
				$("#ecnmyRanking").parent().find(".moreInfoBtn").show();				
				if(regionCd.substring(4,5) == "0"){
					$("#ecnmyRanking").html(corpCnt + "개 시군구 중");	
				} else {
					$("#ecnmyRanking").html(corpCnt + "개 비자치구 중");	
				}
				$("#ecnmyRanking").parent().find("button").attr("id", "totalSgg")
				$("#ecnmyRatioRanking").html(areaTitle + " 종사자 수");
				$("#salesRanking").html(areaTitle + " 매출액");
			}
			$("#rangeV1").find('span').eq(0).text($("#corp_rank").val()+"번");
			$("#rangeV1").offset({left:133+((100/($("#corp_rank").attr("max")-1))*($("#corp_rank").val()-1)/100*($("#corp_rank").outerWidth()-20)), top:$("#corp_rank").offset().top-21}) // 538 -> $("corp_rank").offset().top;
			$("#rangeV2").find('span').eq(0).text($("#worker_rank").val()+"번");
			$("#rangeV2").offset({left:133+((100/($("#worker_rank").attr("max")-1))*($("#worker_rank").val()-1)/100*($("#corp_rank").outerWidth()-20)), top:$("#worker_rank").offset().top-30}) // 691
			$("#rangeV3").find('span').eq(0).text($("#sales_rank").val()+"번");
			$("#rangeV3").offset({left:133+((100/($("#sales_rank").attr("max")-1))*($("#sales_rank").val()-1)/100*($("#corp_rank").outerWidth()-20)), top:$("#sales_rank").offset().top-30}) // 843
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
			$("#corp_rank").val(0);
			$("#worker_rank").val(0);
			$("#sales_rank").val(0);
			$ecnmyDash.ui.rankSlideRender("00", 0,0,0, "");
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
					url: contextPath + "/ServiceAPI/totSurv/ecnmyDash/getUpperRegionCheck.json",
					/* /ServiceAPI/totSurv/ecnmyDash/getUpperRegionCheck.json" <- 기존*/
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
        	if($ecnmyMap.ui.chartToggleYn=="N"){
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
			if($ecnmyMap.ui.selectedObj[0] != obj[0]){
	    		if($ecnmyMap.ui.chartToggleYn == "Y"){
	    			obj.attr("fill", $totSurvMain.ui.tempColor);
	    		} else {
	    			obj.attr("fill", $totSurvMain.ui.selectedTempColor);
	    		}
	    	} else if($ecnmyMap.ui.selectedObj[0] == obj[0]){
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
		chartItmClick : function(obj, color, year, category, cl, iem, unit, thisCnt, totCnt, currDataKey, cd4){
			srvLogWrite('P0','10','03',cd4,$totSurvMain.ui.selectedThema, 'itm_cd='+currDataKey+',region_cd='+($ecnmyMap.ui.mapToggleId?$ecnmyMap.ui.mapToggleId:'00'));
			
			// 선택한 레벨이 3이 아닐경우
			$("div[class*=col-SubDiv]").not("div[class*=col-SubDivWrap]").css("border", "thin #ccc solid");	// 사업체수, 종사자수, 매출액, 영업이익률 선택 초기화
			$(obj[0].graphic.element).parents("div[class*=col-SubDiv]").not("div[class*=col-SubDivWrap]").css("border", "medium #aaa solid"); // 활성화된 차트 아웃라인 하이라이트 사업체수, 종사자수, 매출액, 영업이익률
			/*
			$("#ecnmyTitle").html(cl);
			$(".col.y" + $totSurvMain.ui.selectedYear + " .dataAreatit span.ml5").html(unit);*/
			
			if($totSurvMain.ui.selectedLevel != 3){
				// 선택한 obj와 이전에 선택한 obj가 다를 경우
				if(obj[0] != $ecnmyMap.ui.selectedObj[0]){
					if(iem != "") {
						cl += "(" + iem + ")";
					}
					
					// 타일맵 변경여부 N
					$totSurvMain.ui.tileChangeYn = "N";
					// 맵 그리기
					
					/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
		    		$ecnmyMap.ui.checkIsAtdrc(tempRegionCd);		
		    		if($ecnmyMap.ui.isAtdrc){
		    			$ecnmyMap.ui.mapToggleId = "";
		    		}
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */
		    				    		
		    		if($totSurvMain.ui.selectedArea != "00") {
						$ecnmyDash.ui.drawMapData("sgg", "color"); // 맵 그리기
					} else {
						$ecnmyDash.ui.drawMapData("sido", "color"); // 맵 그리기
					}
		    		
					// 차트 토글여부 Y
					$ecnmyMap.ui.chartToggleYn = "Y";
					// 선택한 아이템이 변경되면서 선택한 아이템의 색상도 변경처리	
					if($ecnmyMap.ui.selectedObj != undefined && $ecnmyMap.ui.selectedObj != "") {
						if($ecnmyMap.ui.selectedObj[0].category != null) {
							$ecnmyMap.ui.selectedObj[0].update({ color: $totSurvMain.ui.selectedTempColor });
							$ecnmyMap.ui.selectedObj[0].select(false);
						}
					}					
					
					$totSurvMain.ui.selectedTempColor = obj[0].color;
					obj[0].update({ color: "#576574" });
					obj[0].select(true);
										
					// 현재 선택한 오브젝트를 변수에 저장
					$ecnmyMap.ui.selectedObj = obj.slice();
					var title = "";
					title += year + " " + category + " " + cl;
					$("#itmDiv").css("display", "inline");
					$("#itmDiv").html(title);
					//$(".col.y" + $totSurvMain.ui.selectedYear + " .dataAreatit h1").html(numberFormat(thisCnt));
				} else {
				//20201014 박은식 chartSelectedSave function parameter 초기화 START
					if(iem != "") {
						cl += "";
					}
					$ecnmyMap.ui.selectedObj[0].update({ color: $totSurvMain.ui.selectedTempColor });
					$ecnmyMap.ui.selectedObj[0].select(false);
					$totSurvMain.ui.chartTarget = "";
		    		$totSurvMain.ui.chartIndex = "";
		    		$totSurvMain.ui.chartData = "";
		    		$totSurvMain.ui.chartColor = "";
		    		$totSurvMain.ui.chartTitle = "";  
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 START */
					var tempRegionCd = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
		    		$ecnmyMap.ui.checkIsAtdrc(tempRegionCd);		
		    		if($ecnmyMap.ui.isAtdrc){
		    			$ecnmyMap.ui.mapToggleId = "";
		    		}
		    		/** 2020-10-15 [곽제욱] 비자치구 에서 클릭한 경우 로직 추가 END */
		    		if($totSurvMain.ui.selectedArea != "00") {
						$ecnmyDash.ui.drawMapData("sgg", "color"); // 맵 그리기
					} else {
						$ecnmyDash.ui.drawMapData("sido", "color"); // 맵 그리기
					}
					//20201014 박은식 chartSelectedSave function parameter 초기화 및 색상 처리 조건추가 초기화 END	
		    		$ecnmyMap.ui.chartToggleYn = "N";
		    		$ecnmyMap.ui.selectedObj = "";
		    		var title = "";
					title += year + " 전산업 " + cl;
					$("#itmDiv").css("display", "inline");
					$("#itmDiv").html(title);
		    		
		    		//지도 색상 반영
					if($ecnmyDash.ecnmyType =="ecnmy9th"){
						$(".colorck li>a:eq(0)").click();
					} else {
						$(".colorck li>a:eq(2)").click();
					}
					//$(".col.y" + $totSurvMain.ui.selectedYear + " .dataAreatit h1").html(numberFormat(totCnt));
				}
			}
			
			/*function setTileMapChange() {
				setTimeout(function() {
					if($ecnmyDash.loading) {
						setTileMapChange();
					} else {
						if($totSurvMain.ui.selectedYear == "2015") {
							$ecnmyDash.ui.setTileMapChart("areaEcnmy", "288", "250");
						} else if($totSurvMain.ui.selectedYear == "2010") {
							$ecnmyDash.ui.setTileMapChart("areaEcnmy", "288", "260");
						}
					}
				}, 500);
			}
			
			setTileMapChange();*/
			//$(obj[0].series.chart.renderTo).find("g.highcharts-axis-labels.highcharts-xaxis-labels text").attr("x", "145");
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
		
		$ecnmyDash.org_id = tmp[1].split("&")[0];
		$ecnmyDash.tbl_id = tmp[2].split("&")[0];
		
		if(!$ecnmyDash.isDev){
			
			var kosisDetailOption = new kosis.serviceApi.kosisDetailOption.api();
			kosisDetailOption.addParam("org_id", $ecnmyDash.org_id);
			kosisDetailOption.addParam("list_id", $ecnmyDash.tbl_id);
			
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
			lv_url += "?org_id="+ $ecnmyDash.org_id;
			lv_url += "&list_id="+ $ecnmyDash.tbl_id;
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
				
				$ecnmyDash.obj_var_id = resultData[0].obj_var_id;
				$ecnmyDash.field_id = resultData[0].field_id;
				
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

		//var map = $ecnmyMap.ui.map;
		
		if(!$ecnmyDash.isDev){
			// 운영 호출 
		}
		else{
			var map = $ecnmyMap.ui.map;
			map.selectedBoundMode = "multi";
			
			//url 파라미터 세팅
			var lv_url = "https://link.kostat.go.kr/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do";
			lv_url += "?org_id="+ $ecnmyDash.org_id;
			lv_url += "&tbl_id="+ $ecnmyDash.tbl_id;
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
			lv_url += "&obj_var_id=" + $ecnmyDash.obj_var_id;
			lv_url += "&field_id=" + $ecnmyDash.field_id;
			
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
				$ecnmyMap.ui.map.mapReload(center, 6);
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
					$ecnmyDash.kosis_result_data = [];
					$ecnmyDash.kosis_result_data = result;
					
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
						//$ecnmyMap.ui.map.setKosisStatsData("normal", "emdong_"+(result[0].CODE).substring(0,5), result[i], "DATA", "");
						//정보 저장
						//$ecnmyMap.ui.mapStatsData[lv_tot_surv_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = res.result.mapData;
						
						setLegendForKosisStatsData(tmpData);
						for (var i=0; i<result.length; i++) {
							map.multiLayerControl.reqBoundary(result[i].CODE, result[i], atdrc_yn, function(res) {
								var geoData = combineKosisStatsData(res);
								$ecnmyMap.ui.map.setPolygonDataGeojson(geoData);
								map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(geoData, "data"));
							});
						}
						
						// zoom 레벨 변경 6
						$ecnmyMap.ui.map.setZoom(6);
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
		
		this.map.data.push($ecnmyDash.kosis_result_data);
		this.map.dataType = "kosis";
		this.map.dataForCombine = $ecnmyDash.kosis_result_data;
		
		var yearArr = [];
		var options = $('#bndYear option');
		var values = $.map(options ,function(option) {
			yearArr.push(option.value);
		});
		
		var yearMax = Math.max.apply(null, yearArr);
		var yearMin = Math.min.apply(null, yearArr);
		
		var year = $ecnmyDash.kosis_data_year;
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
		$ecnmyDash.kosis_result_data = tempData;
		
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
		if (!$ecnmyMap.ui.map.isFixedBound) {
			setLegendForKosisStatsData(arData);
		}
		
		return boundData;
	}

	$ecnmyDash.util = {};
	
	$ecnmyDash.event = {
			
		/**
		 * @name		 : setUIEvent 
		 * @description  : 인구총조사 이벤트 바인딩
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		setUIEvent : function(){
			console.log("■$ecnmyDash.event.setUIEvent() called.");
			
			var body = $("body");

			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 start*/
			body.on( ($totSurvMain.ui.isThisBrowser == 'Mozilla') ? "change" : "input" , "#corp_rank, #worker_rank, #sales_rank", function(e){ // 20201014 박은식 IE event 문제로 change 추가
			//2020.09.10[신예리] 슬라이드 컬러 수정
				$totSurvMain.ui.chartTarget = "";
	    		$totSurvMain.ui.chartIndex = "";
	    		$totSurvMain.ui.chartData = "";
	    		$totSurvMain.ui.chartColor = "";
	    		$totSurvMain.ui.chartTitle = "";
	    		$ecnmyMap.ui.selectedObj[0] = "";
				this.style.background = 'linear-gradient(to right, #03a9f4  0%, #03a9f4  ' + ((100/(this.max-1))*(this.value-1)) + '%, #fff ' + ((100/(this.max-1))*(this.value-1)) + '%, white 100%)';
				if(e.target.id == "corp_rank"){
					$("#rangeV1").find('span').eq(0).text(this.value+"번");
					$("#rangeV1").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#corp_rank").outerWidth()-20)), top:$("#corp_rank").offset().top-21});
				} else if(e.target.id == "worker_rank"){
					$("#rangeV2").find('span').eq(0).text(this.value+"번");
					$("#rangeV2").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#worker_rank").outerWidth()-20)), top:$("#worker_rank").offset().top-30})
				} else if(e.target.id == "sales_rank") {
					$("#rangeV3").find('span').eq(0).text(this.value+"번");
					$("#rangeV3").offset({left:133+((100/(this.max-1))*(this.value-1)/100*($("#corp_rank").outerWidth()-20)), top:$("#sales_rank").offset().top-30})
				}
			
			//left: calc(40.3333% + 1.93333px);
			})
			
			/** 2020908 박은식 슬라이드 움직일때 마다 background-color 조절 end*/
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 start*/
			body.on("mouseup", "#corp_rank, #worker_rank, #sales_rank", function(){  // 20201012 박은식 IE event 문제로 change 추가
				var rankval = this.value;
				if(this.id == "corp_rank"){
					$ecnmyDash.ui.getRankSet(this.value, this.id, "");
					if($totSurvMain.ui.selectedArea != $ecnmyDash.currentData.ecnmyRank["T10"][this.value].ADM_CD) {
						$totSurvMain.ui.selectedArea = $ecnmyDash.currentData.ecnmyRank["T10"][this.value].ADM_CD;
					}
					
					srvLogWrite('P0','10','02','02',$totSurvMain.ui.selectedThema, 'adm_cd='+$totSurvMain.ui.selectedArea+',year='+$totSurvMain.ui.selectedYear+',rank='+rankval);
				} else if(this.id == "worker_rank"){
					$ecnmyDash.ui.getRankSet(this.value, this.id, "");
					if($totSurvMain.ui.selectedArea != $ecnmyDash.currentData.ecnmyRank["T20"][this.value].ADM_CD) {
						$totSurvMain.ui.selectedArea = $ecnmyDash.currentData.ecnmyRank["T20"][this.value].ADM_CD;
					}
					
					srvLogWrite('P0','10','02','03',$totSurvMain.ui.selectedThema, 'adm_cd='+$totSurvMain.ui.selectedArea+',year='+$totSurvMain.ui.selectedYear+',rank='+rankval);
				} else if(this.id == "sales_rank") {
					$ecnmyDash.ui.getRankSet(this.value, this.id, "");
					if($totSurvMain.ui.selectedArea != $ecnmyDash.currentData.ecnmyRank["T30"][this.value].ADM_CD) {
						$totSurvMain.ui.selectedArea = $ecnmyDash.currentData.ecnmyRank["T30"][this.value].ADM_CD;
					}
					
					srvLogWrite('P0','10','02','04',$totSurvMain.ui.selectedThema, 'adm_cd='+$totSurvMain.ui.selectedArea+',year='+$totSurvMain.ui.selectedYear+',rank='+rankval);
				}
				
				let region_cd = $totSurvMain.ui.selectedArea;
				if(region_cd.length==2){
					$ecnmyDash.event.pathChange("sgg", region_cd);
				} else {
					if(region_cd.substring(4,5)=="0"){
						$ecnmyDash.event.pathChange("atdrc", region_cd);
					} else {
						$ecnmyDash.event.pathChange("emdong", region_cd);
					}
				}
				$ecnmyDash.event.titleChange($totSurvMain.ui.selectedArea);
				$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "1");
			})
			/** 2020908 박은식 슬라이드 움직일때 마다 rank 조회 end*/
			
			if($totSurvMain.ui.selectedLevel=="0"){
				$(".Rangecontainer").css("display", "none");
			} else {
				$(".Rangecontainer").css("display", "inline-block");
			}
			//$ecnmyDash.ui.getRankSet("", "",$totSurvMain.ui.selectedArea);
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
					$ecnmyMap.ui.map.gMap.setMinZoom(1);
					
					$(".mapExport").removeClass("on");
					//$("#allPopulationForTime").show(); // 2020-10-12 [곽제욱] 주석처리
					$(".col-SubL").width("");
					$(".col-SubL").height("584px"); //2020.09.16[신예리] 영역 맞춤
					// 맵 사이즈
					$('#mapRgn_1').width("");
					$('#mapRgn_1').height("588px");
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
					
					if($ecnmyMap.ui.map != null){
						$ecnmyMap.ui.map.update();
					}
					//$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "2"); 2020-10-12 [곽제욱] 로직 변경으로 인한 주석처리
					if($totSurvMain.ui.chartTarget != ""
						&& typeof($totSurvMain.ui.chartIndex) == "number"
						&& $totSurvMain.ui.chartColor != ""){
						$totSurvMain.ui.chartSelectedSave($totSurvMain.ui.chartTarget, "", $totSurvMain.ui.chartColor, $totSurvMain.ui.chartIndex, "Y",  $totSurvMain.ui.chartTitle);
					}
					//20201014 박은식 지도 확대 축소 시 chart 다시그리도록 처리 END					
				}
				else{
//					alert("작은화면 -> 큰화면");
					$ecnmyMap.ui.map.gMap.setMinZoom(1);
					$(".mapExport").addClass("on");					
					
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
					
					$ecnmyMap.ui.map.update()
				}
				
			});
			
			/** 맵 확대 */
			body.on("click", "#pZoom", function(){  //20201013 박은식 class -> id로 selector변경
				var lv_zoom = $ecnmyMap.ui.map.zoom;
				$ecnmyMap.ui.map.setZoom((lv_zoom+1));
				//alert("맵 확대");
				
				if($ecnmyMap.ui.map == null){
					alert("세계지도");
					return;
				}
				
				srvLogWrite('P0','01','04','03',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear);

				var to_sido_cd = "";
				var to_sgg_cd = "";
//				console.log("to_center = " + to_center);
				$ecnmyMap.ui.getCenterToAdmCd($ecnmyMap.ui.map.gMap.getCenter(), function(res) {
					/** 2020-10-12 [곽제욱] zoomIn 센터좌표 이벤트 추가 START */
					// 콤보박스 선택
					var lv_zoom = $ecnmyMap.ui.map.zoom;
					if(res.result == undefined) {
						$ecnmyMap.ui.map.setZoom((lv_zoom+1));
						
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
						
						$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
					}
					//시도
					else if (lv_zoom > 1 && lv_zoom <= sggZoom) { // 2020-10-12 [곽제욱] sggZoom 체크로 변경
						
						var x = $("#dash_sido option:selected").attr("data-coor-x");
						var y = $("#dash_sido option:selected").attr("data-coor-y");
						

						if(lv_zoom == sggZoom && $ecnmyMap.ui.mapRegion != "sgg"){ // 2020-10-13 [곽제욱] 고정 줌을 sggZoom과 같으면으로 변경 
							$totSurvMain.ui.selectedLevel =  "1";
							
							// 콤보박스 선택
							$totSurvMain.ui.getSidoSggPos(to_sido_cd);
							
							// 지도 조회
							$ecnmyDash.event.pathChange("sgg", to_sido_cd);
							$ecnmyMap.ui.mapRegion = "sgg"; // 2020-10-12 [곽제욱] mapRegion 세팅
							// 데이터 조회
							$ecnmyDash.event.allChange(to_sido_cd, "1");
							$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
						}
						else{
							$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
						}
					}
					//시군구
					else if (
							(lv_zoom > 1 && lv_zoom <= sggZoom) // 2020-10-12 [곽제욱] sggZoom 체크로 변경
							|| (lv_zoom > sggZoom && lv_zoom <= 12) // 2020-10-12 [곽제욱] sggZoom 체크로 변경						 
					){						
						$ecnmyMap.ui.map.setZoom((lv_zoom+1));
						/** 2020-10-12 [곽제욱] 센터좌표 수정 START */
						$totSurvMain.ui.selectedArea = to_sido_cd + to_sgg_cd;
						$ecnmyMap.ui.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,4)+"0")
						if($ecnmyMap.ui.isAtdrc==true){
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
							$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
						}
						//var to_center = $ecnmyMap.ui.map.gMap.getCenter();
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
						$ecnmyMap.ui.map.setZoom((lv_zoom+1));
						
						var to_center = $ecnmyMap.ui.map.gMap.getCenter();
						$ecnmyMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom+1), false);
						/** 2020-10-12 [곽제욱] 줌in 로직 변경 END */
						
					}
					
				});

			});
			
			/** 맵 축소 */
			body.on("click", "#pOut", function(){ //20201013 박은식 class -> id로 selector변경		
				var lv_zoom = $ecnmyMap.ui.map.zoom;
				$ecnmyMap.ui.map.setZoom((lv_zoom-1));
				console.log("lv_zoom = " + lv_zoom);

				srvLogWrite('P0','01','04','04',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear);
				
				if(lv_zoom >= 1){ // 2020-10-13 [곽제욱] zoomlevel 조건절 변경
					/** 2020-10-12 [곽제욱] zoomout 시 경계조회 이벤트 추가 START */
					var to_sido_cd = "";
					var to_sgg_cd = "";
					//$ecnmyMap.ui.map.setZoom((lv_zoom-1));
					//var to_center = $ecnmyMap.ui.map.gMap.getCenter();
					//$ecnmyMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom-1), false);
					$ecnmyMap.ui.getCenterToAdmCd($ecnmyMap.ui.map.gMap.getCenter(), function(res) {
						if(res.result == undefined) {
							$ecnmyMap.ui.map.setZoom((lv_zoom-1));
							
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
							$ecnmyMap.ui.map.setZoom((lv_zoom-1));
							$ecnmyMap.ui.prevZoom = $ecnmyMap.ui.map.zoom;
							$totSurvMain.ui.selectedArea = to_sido_cd + to_sgg_cd;
							$ecnmyMap.ui.checkIsAtdrc($totSurvMain.ui.selectedArea.substring(0,4)+"0")
							if(lv_zoom <= emdongZoom){
								if($totSurvMain.ui.selectedLevel == "3") {
									if($ecnmyMap.ui.isAtdrc==true){
										$totSurvMain.ui.selectedArea = $totSurvMain.ui.selectedArea.substring(0,4)+"0";
										// dash_sgg, dash_sido 재세팅
										$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
										$ecnmyMap.ui.mapToggleId = "";
										$("#dash_sido").val(to_sido_cd);
										emdongZoom = 6 + $totSurvMain.ui.zoomResize();							
									} 
									$totSurvMain.ui.selectedLevel =  "2";
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$ecnmyDash.event.pathChange("sgg", to_sido_cd);
									$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$ecnmyDash.upperBack = true;
									$ecnmyDash.ui.getRankSet("", "sgg", $totSurvMain.ui.selectedArea);
									$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경									
								} else {
									$totSurvMain.ui.selectedLevel =  "1";
									$totSurvMain.ui.selectedArea = to_sido_cd;
									$totSurvMain.ui.getSidoSggPos($totSurvMain.ui.selectedArea);
									var x = $("#dash_sgg option:selected").attr("data-coor-x");
									var y = $("#dash_sgg option:selected").attr("data-coor-y");
									$ecnmyDash.event.pathChange("sgg", to_sido_cd);
									$ecnmyDash.upperBack = true;
									$ecnmyMap.ui.mapToggleId = "";
									$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "1");
									$ecnmyMap.ui.isAtdrc = false;
									$ecnmyDash.ui.getRankSet("", "sido", to_sido_cd);
									$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
								}
							} 
							/*
							var x = $("#dash_sido option:selected").attr("data-coor-x");
							var y = $("#dash_sido option:selected").attr("data-coor-y");
							$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom-1), false);
							*/
						} else if(lv_zoom <= sggZoom){
							$ecnmyMap.ui.map.setZoom((lv_zoom-1));
							if($totSurvMain.ui.selectedLevel != "0"){
								$ecnmyDash.event.titleChange("00");
								$ecnmyMap.ui.prevZoom = $ecnmyMap.ui.map.zoom;
								$totSurvMain.ui.selectedArea = "00";
								$totSurvMain.ui.selectedLevel =  "0";
								var x = $("#dash_sido option:selected").attr("data-coor-x");
								var y = $("#dash_sido option:selected").attr("data-coor-y");
								$ecnmyDash.event.pathChange("nationwide", "00");
								$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "1");
							}
							//$ecnmyMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
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
				
				srvLogWrite('P0','19','09','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);

				if(selId == "highChartDiv1Wrap"){
					highChartModal($ecnmyDash.currentData[$("#highChartDiv1Wrap").data("charitmid")], $ecnmyDash.ui.dispOptions[1]);
				}
				else if(selId == "highChartDiv2Wrap"){
					highChartModal($ecnmyDash.currentData[$("#highChartDiv2Wrap").data("charitmid")], $ecnmyDash.ui.dispOptions[2]);
				}
				else if(selId == "highChartDiv3Wrap"){
					highChartModal($ecnmyDash.currentData[$("#highChartDiv3Wrap").data("charitmid")], $ecnmyDash.ui.dispOptions[3]);
				}
				else if(selId == "highChartDiv4Wrap"){
					highChartModal($ecnmyDash.currentData[$("#highChartDiv4Wrap").data("charitmid")], $ecnmyDash.ui.dispOptions[4]);
				}
			});
			
			// 메타테그 이동
			body.on("click", "[name='metaBtn'], [name='tableBtn'], [name='excelBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				
				srvLogWrite('P0','01','08','00',$totSurvMain.ui.selectedThema,'year='+$totSurvMain.ui.selectedYear+',selId='+selId);
				getKosisMataDataUrl($ecnmyDash.ui.dispOptions[1][0].stattbUrl);//20210226 박은식 차트 데이터 변경 
			});
			
			
			// 이미지 저장
			body.on("click", "[name='imgSaveBtn']", function(evnt){
				
				var selId = $(this).parent().parent().parent().prop('id');
				console.log("selId = " + selId);

				if(selId == "workerCompositioDiv"){
					$totSurvMain.ui.chartImageDown("#workerCompositioDiv", "보건업∙사업복지서비스업 종사자 구성비");
				}
				else if(selId == "highChartDiv1Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv1Wrap", "산업별 사업체수");
				}
				else if(selId == "highChartDiv2Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv2Wrap", "산업별 종사자수");
				}
				else if(selId == "highChartDiv3Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv3Wrap", "산업별 매출액");
				}
				else if(selId == "highChartDiv4Wrap"){
					$totSurvMain.ui.chartImageDown("#highChartDiv4Wrap", "산업별 영업이익률");
				}
			});
			// 2020-10-23 공통 이벤트 (메타정보, 다른차트, 이미지 저장, 맵 저장) 이벤트 추가 END
			
			// 2021-08-11 [이영호] 산업분류 9차, 10차 개정 클릭 이벤트 추가 START
			body.on("click", ".ecnmyToggle",function(e){				
				$(".ecnmyToggle").removeClass("on");
				$("#corp_range").hide();
				$("#worker_range").hide();
				$("#sales_range").hide();
				//$totSurvMain.ui.removeMap();
				
				if($(this).attr("id") == "ecnmy9th"){
					$ecnmyDash.ecnmyType = "ecnmy9th"					
					$("#ecnmy9thButton").show();
					$("#ecnmy10thButton").hide();					
					$("#ecnmyMainHelp").hide();			
					if($(this).hasClass("on")){
						return;
					} else {						
						//$totSurvMain.ui.tilePerColor = [];
						$(this).addClass("on");
					}
					
					$ecnmyDash.chartsOption.color = ["#f08246", "#009589"];
				} else {
					$ecnmyDash.ecnmyType = "ecnmy10th"
					if($(this).hasClass("on2")){ //2020.11.16[신예리] 내수면 탭 버튼 on
						return;
					}										
					$("#ecnmy9thButton").hide();
					$("#ecnmy10thButton").show();
					$("#ecnmyMainHelp").show();
					//$totSurvMain.ui.tilePerColor = [];
					
					$(this).addClass("on"); //2020.11.16[신예리] 내수면 탭 버튼 on
					
					$ecnmyDash.chartsOption.color = ["#c189bb", "#0b4f60"];
				}
				
				$totSurvLeft.ui.selectTms();
				$ecnmyDash.event.setDefaultParams($totSurvMain.ui.selectedYear);
				$ecnmyDash.event.setDispOptions();
				$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "1");
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
			$ecnmyDash.event.allClear();
			let totTms = $ecnmyMap.ui.totTms[0];
			let totTmsStr = "";
			for(var i=parseInt(totTms.end_year); i>=parseInt(totTms.start_year); i=i-parseInt(totTms.updt_cycle)) { 
				if(i-parseInt(totTms.updt_cycle) <= totTms.start_year) {
					if(totTmsStr.length > 0) {
						totTmsStr += "," + totTms.start_year.toString();
					} else {
						totTmsStr += totTms.start_year.toString();
					}
				} else {
					if(totTmsStr.length > 0) {
						totTmsStr += "," + totTms.start_year.toString();
					} else {
						totTmsStr += totTms.start_year.toString();
					}
				}
			}
			
			var param = {}
			$ecnmyDash.ajax.params.adm_cd = $ecnmyDash.admLv.split("_")[1] + ":" + admCd;
			$ecnmyDash.ajax.params.adm_unit = "total";
			
			$.ajax({
				method: "GET",
				async: true,	// 반드시 동기처리 해야 함
				//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
				data: $ecnmyDash.ajax.params, // 
				dataType: "json",
				success: function(res) {
					if($totSurvMain.ui.selectedLevel == '0'){						
						var noneHtml = "";
						if($ecnmyDash.ecnmyType == "ecnmy9th") {
							noneHtml += "<div class='DataNone' id='infoNone' style='text-align: center;'>";
							noneHtml += "	<img src='/images/totSurv/locationclick.png' alt='지역을 선택하세요' style='margin-top: 12px; width: 35px;'>";
							noneHtml += "	<p>지역을 선택하시면 차트가 표출됩니다.</p>";
							noneHtml += "</div>";
							
							$ecnmyDash.chartsOption.color = ["#f08246", "#009589"];
						} else {
							noneHtml += "<div class='DataNone' id='infoNone' style='text-align:left;color:rgba(34,91,130,1);font-size:13px;line-height:1.3'>";
							noneHtml += "\'15년 기준 경제총조사 산업분류 10차 개정 자료는 9차 산업분류를 10차로 연계하여 서비스함";
							noneHtml += "<div style='height:13px;'></div>";
							noneHtml +=	"9차 산업분류에서 10차 산업분류로 개정되면서 산업대분류별 사업체 수 등이 변경되었으므로 산업분류 차수 간 비교보다는 ";
							noneHtml += "통계활용도 제고를 위한 참고용으로 활용하도록 권고함";
							noneHtml += "</div>";
							
							$ecnmyDash.chartsOption.color = ["#c189bb", "#0b4f60"];
						}
						
						if($ecnmyDash.ajax.params.adm_cd.indexOf(":") != -1) {
							let regionCd = $ecnmyDash.ajax.params.adm_cd.split(":")[1];
							$("#infoArea2").hide();
							$("#totalEcnmy").show();
							$("#infoArea1").show();
							
							$("#totalEcnmy").show();
							if(regionCd.length == 2 && regionCd == "00") {
								$("#ecnmyRanking").html("전국 전주기 대비 사업체수 증감");
								$("#ecnmyRatioRanking").html("전국 종사자 수");
								$("#salesRanking").html("전국 매출액");
								$("#totalEcnmy").hide();
							} else if(regionCd.length == 2 && regionCd != "00") {
								$("#ecnmyRanking").html($("#corp_rank").attr("max") + "개 광역시도 중");								
							} else if(regionCd.length == 5) {
								if($ecnmyDash.regionLevel == "atdrc") {
									$("#ecnmyRanking").html($("#corp_rank").attr("max") + "개 비자치구 중");
								} else {
									$("#ecnmyRanking").html($("#corp_rank").attr("max") + "개 시군구 중");
								}								
							} else {
								$("#ecnmyRanking").html($totSurvMain.ui.sidoMaxRank + "개 중");
							}
							$("#ecnmyRanking").parent().find(".moreInfoBtn").show();
																			
							
						}						
					}else if($totSurvMain.ui.selectedLevel != '0'){
						$("#infoArea2").hide();
						$("#infoArea1").show();
						$("#ecnmyChangeRt").show();
						$("#ecnmyRatioChangeRt").show();
						$("#emptyChangeRt").show();
					}					
				},
				error: function(e) {
					//$totSurvMain.ui.alert(errorMessage);
				}
			});
			
			for(var i=0; i<$ecnmyDash.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
				if($ecnmyDash.ui.dispOptions[1][i].objVarId != "13999001") {
					$ecnmyDash.itmLv = "ov_l"+$ecnmyDash.ui.dispOptions[1][i].varOrd+"_list";
					$ecnmyDash.admLv = "ov_l"+$ecnmyDash.ui.dispOptions[1][i].regionVarOrd+"_list";
					break;
				}
			}
								
			/*** 2021-08-17 [이영호] 보건업·사업복지서비스업 종사자 구성비 성별 ***/
			$ecnmyDash.ajax.params.adm_cd = "";
			$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "Q"; //보건업·사회복지서비스업
			$ecnmyDash.ajax.params[$ecnmyDash.admLv] = admCd; //보건업·사회복지서비스업
			if($totSurvMain.ui.selectedYear == "2010") { // 2010, 2015 남, 녀 코드가 다름
				$ecnmyDash.ajax.params.char_itm_id_list = "T21,T22"; //종사자수, 남, 녀
			} else {
				if($ecnmyDash.ecnmyType == "ecnmy9th") {
					$ecnmyDash.ajax.params.char_itm_id_list = "T201,T202"; //종사자수, 남, 녀
				} else {
					$ecnmyDash.ajax.params.char_itm_id_list = "T201,T202"; //종사자수, 남, 녀
				}
			}
			$.ajax({
	    		type:"GET",
				async: true,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $ecnmyDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
	    				$ecnmyDash.currentData.helthender = result;
						workerCompositionChart1($ecnmyDash.currentData.helthender);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			/*** 2021-08-17 [이영호] 보건업·사업복지서비스업 종사자 구성비 업종별 ***/
			$ecnmyDash.ajax.params.char_itm_id_list = "T20"; //종사자수
			$ecnmyDash.ajax.params[$ecnmyDash.admLv] = admCd;
			$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "86,87"; //보건업:86,사회복지서비스업:87
			$.ajax({
	    		type:"GET",
				async: true,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $ecnmyDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
	    				$ecnmyDash.currentData.helth = result;
						workerCompositionChart2($ecnmyDash.currentData.helth);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			/*** 2021-08-17 [이영호] 산업별 사업체 수 ***/
			$ecnmyDash.ajax.params.char_itm_id_list = "T10"; //사업체 수
			$ecnmyDash.ajax.params[$ecnmyDash.admLv] = admCd;
			$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "";				
			$ecnmyDash.ajax.params.odr_col_list = "DTVAL_CO";
			$ecnmyDash.ajax.params.odr_type = "DESC";		
			for(var i=0; i<$ecnmyDash.ui.dispOptions[1].length; i++) {
				if($ecnmyDash.ui.dispOptions[1][i].objVarId != "13999001") {
					if($ecnmyDash.ajax.params[$ecnmyDash.itmLv].length > 0) {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += "," + $ecnmyDash.ui.dispOptions[1][i].itmId;
					} else {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += $ecnmyDash.ui.dispOptions[1][i].itmId;
					}
				}					
			}
			$.ajax({
	    		type:"GET",
				async: true,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $ecnmyDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
						/* 2021-08-26 [이영호] 합계 컬럼 제거 START */
						let sumColId, colOrd;							
						for(var i=0; i<$ecnmyDash.ui.dispOptions[1].length; i++) {
							if($ecnmyDash.ui.dispOptions[1][i].objVarId != "13999001" && $ecnmyDash.ui.dispOptions[1][i].subsumYn == "Y") {
								sumColId = $ecnmyDash.ui.dispOptions[1][i].itmId;
								sumOrd = $ecnmyDash.ui.dispOptions[1][i].varOrd; 
							}
						}
						
						let itmLvId = "OV_L" + sumOrd + "_ID";
						let itmLvSn = "OV_L" + sumOrd + "_SN";
						
						$ecnmyDash.currentData[result[0].CHAR_ITM_ID] = result.slice();
						
						for(var i=0; i<result.length; i++) {
							if(result[i][itmLvId] == sumColId) {
								result.splice(i, 1);
							}
						}
						result.sort(function(a, b) { return a[itmLvSn] - b[itmLvSn] }); //정렬
						/* 2021-08-26 [이영호] 합계 컬럼 제거 END */						
	    				
	    				if(result[0].CHAR_ITM_ID == $ecnmyMap.ui.selectedChrItmId) {
	    					var ecnmyData = $ecnmyDash.currentData[$ecnmyMap.ui.selectedChrItmId];
	    					for(var i=0; i<ecnmyData.length; i++) {
	    						if(ecnmyData[i]["OV_L" + $ecnmyDash.ui.dispOptions[$ecnmyDash.selectedChartSno][0].dispVarOrd + "_ID"] == $ecnmyDash.selectedItmId) {
	    							if($ecnmyDash.selectedItmId == "0") {
	    								$(".dataAreatit h1").html(numberFormat(ecnmyData[i].DTVAL_CO));
	    							}
	    							break;
	    						}							
	    					}
	    				}
	    				
						drawHighChart1(result);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			/*** 2021-08-17 [이영호] 산업별 종사자 수 ***/
			$ecnmyDash.ajax.params.char_itm_id_list = "T201,T202"; //종사자 수
			for(var i=0; i<$ecnmyDash.ui.dispOptions[2].length; i++) {
				if($ecnmyDash.ui.dispOptions[2][i].objVarId == "13999001") {
					if($ecnmyDash.ajax.params.char_itm_id_list.length > 0) {
						$ecnmyDash.ajax.params.char_itm_id_list += "," + $ecnmyDash.ui.dispOptions[2][i].itmId;
					} else {
						$ecnmyDash.ajax.params.char_itm_id_list += $ecnmyDash.ui.dispOptions[2][i].itmId;
					}
				}
			}
			$ecnmyDash.ajax.params[$ecnmyDash.admLv] = admCd;
			$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "";				
			$ecnmyDash.ajax.params.odr_col_list = "DTVAL_CO";
			$ecnmyDash.ajax.params.odr_type = "DESC";
			for(var i=0; i<$ecnmyDash.ui.dispOptions[2].length; i++) {
				if($ecnmyDash.ui.dispOptions[2][i].objVarId != "13999001") {
					if($ecnmyDash.ajax.params[$ecnmyDash.itmLv].length > 0) {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += "," + $ecnmyDash.ui.dispOptions[2][i].itmId;
					} else {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += $ecnmyDash.ui.dispOptions[2][i].itmId;
					}
				}
			}
			$.ajax({
	    		type:"GET",
				async: true,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $ecnmyDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
						/* 2021-08-26 [이영호] 합계 컬럼 제거 START */
						let sumColId, colOrd;							
						for(var i=0; i<$ecnmyDash.ui.dispOptions[2].length; i++) {
							if($ecnmyDash.ui.dispOptions[2][i].objVarId != "13999001" && $ecnmyDash.ui.dispOptions[2][i].subsumYn == "Y") {
								sumColId = $ecnmyDash.ui.dispOptions[2][i].itmId;
								sumOrd = $ecnmyDash.ui.dispOptions[2][i].varOrd; 
							}
						}
						
						let itmLvId = "OV_L" + sumOrd + "_ID";
						let itmLvSn = "OV_L" + sumOrd + "_SN";
						let resultArr = [];
						result.forEach(function(item, index, object) { 
							if(item[itmLvId] != sumColId) {
								resultArr.push(item);
							}
						});
						
						resultArr.sort(function(a, b) { return a[itmLvSn] - b[itmLvSn] }); //정렬
						/* 2021-08-26 [이영호] 합계 컬럼 제거 END */
						$ecnmyDash.currentData[resultArr[0].CHAR_ITM_ID] = resultArr;
						
						if(resultArr[0].CHAR_ITM_ID == $ecnmyMap.ui.selectedChrItmId) {
	    					var ecnmyData = $ecnmyDash.currentData[$ecnmyMap.ui.selectedChrItmId];
	    					for(var i=0; i<ecnmyData.length; i++) {
	    						if(ecnmyData[i]["OV_L" + $ecnmyDash.ui.dispOptions[$ecnmyDash.selectedChartSno][0].dispVarOrd + "_ID"] == $ecnmyDash.selectedItmId) {
	    							//$(".dataAreatit h1").html(numberFormat(ecnmyData[i].DTVAL_CO));
	    							break;
	    						}							
	    					}
	    				}
						
						drawHighChart2($ecnmyDash.currentData[resultArr[0].CHAR_ITM_ID]);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			/*** 2021-08-17 [이영호] 산업별 매출액 ***/
			$ecnmyDash.ajax.params.char_itm_id_list = "T30"; //매출액
			$ecnmyDash.ajax.params[$ecnmyDash.admLv] = admCd;
			$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "";				
			$ecnmyDash.ajax.params.odr_col_list = "DTVAL_CO";
			$ecnmyDash.ajax.params.odr_type = "DESC";
			for(var i=0; i<$ecnmyDash.ui.dispOptions[3].length; i++) {
				if($ecnmyDash.ui.dispOptions[3][i].objVarId != "13999001") {
					if($ecnmyDash.ajax.params[$ecnmyDash.itmLv].length > 0) {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += "," + $ecnmyDash.ui.dispOptions[3][i].itmId;
					} else {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += $ecnmyDash.ui.dispOptions[3][i].itmId;
					}
				}
			}
			$.ajax({
	    		type:"GET",
				async: false,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $ecnmyDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
						/* 2021-08-26 [이영호] 합계 컬럼 제거 START */
						let sumColId, colOrd;							
						for(var i=0; i<$ecnmyDash.ui.dispOptions[3].length; i++) {
							if($ecnmyDash.ui.dispOptions[3][i].objVarId != "13999001" && $ecnmyDash.ui.dispOptions[3][i].subsumYn == "Y") {
								sumColId = $ecnmyDash.ui.dispOptions[3][i].itmId;
								sumOrd = $ecnmyDash.ui.dispOptions[3][i].varOrd; 
							}
						}
						
						let itmLvId = "OV_L" + sumOrd + "_ID";
						let itmLvSn = "OV_L" + sumOrd + "_SN";
						for(var i=0; i<result.length; i++) {
							if(result[i][itmLvId] == sumColId) {
								result.splice(i, 1);
							}
						}
						result.sort(function(a, b) { return a[itmLvSn] - b[itmLvSn] }); //정렬
						/* 2021-08-26 [이영호] 합계 컬럼 제거 END */
	    				$ecnmyDash.currentData[result[0].CHAR_ITM_ID] = result;
	    				
	    				if(result[0].CHAR_ITM_ID == $ecnmyMap.ui.selectedChrItmId) {
	    					var ecnmyData = $ecnmyDash.currentData[$ecnmyMap.ui.selectedChrItmId];
	    					for(var i=0; i<ecnmyData.length; i++) {
	    						if(ecnmyData[i]["OV_L" + $ecnmyDash.ui.dispOptions[$ecnmyDash.selectedChartSno][0].dispVarOrd + "_ID"] == $ecnmyDash.selectedItmId) {
	    							//$(".dataAreatit h1").html(numberFormat(ecnmyData[i].DTVAL_CO));
	    							break;
	    						}							
	    					}
	    				}
	    				
						drawHighChart3($ecnmyDash.currentData[result[0].CHAR_ITM_ID]);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});

			/*** 2021-08-17 [이영호] 산업별 영업 이익률 ***/
			/*** 2021-08-17 [이영호] 산업별 매출액 ***/
			$ecnmyDash.ajax.params.char_itm_id_list = "T50"; //매출액
			$ecnmyDash.ajax.params[$ecnmyDash.admLv] = admCd;
			$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = "";				
			$ecnmyDash.ajax.params.odr_col_list = "DTVAL_CO";
			$ecnmyDash.ajax.params.odr_type = "DESC";
			for(var i=0; i<$ecnmyDash.ui.dispOptions[4].length; i++) {
				if($ecnmyDash.ui.dispOptions[4][i].objVarId != "13999001") {
					if($ecnmyDash.ajax.params[$ecnmyDash.itmLv].length > 0) {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += "," + $ecnmyDash.ui.dispOptions[4][i].itmId;
					} else {
						$ecnmyDash.ajax.params[$ecnmyDash.itmLv] += $ecnmyDash.ui.dispOptions[4][i].itmId;
					}
				}
			}
			$.ajax({
	    		type:"GET",
				async: true,
	    		//url: "/view/kosisApi/TotsurvStatData.do",
				url: sgis4thApiPath,
		 		data: $ecnmyDash.ajax.params,
	    		success:function( result ){
	    			if( result ){
						/* 2021-08-26 [이영호] 합계 컬럼 제거 START */
						let sumColId, colOrd;							
						for(var i=0; i<$ecnmyDash.ui.dispOptions[4].length; i++) {
							if($ecnmyDash.ui.dispOptions[4][i].objVarId != "13999001" && $ecnmyDash.ui.dispOptions[4][i].subsumYn == "Y") {
								sumColId = $ecnmyDash.ui.dispOptions[4][i].itmId;
								sumOrd = $ecnmyDash.ui.dispOptions[4][i].varOrd; 
							}
						}
						
						let itmLvId = "OV_L" + sumOrd + "_ID";
						for(var i=0; i<result.length; i++) {
							if(result[i][itmLvId] == sumColId) {
								result.splice(i, 1);
							}
						}
						/* 2021-08-26 [이영호] 합계 컬럼 제거 END */
	    				$ecnmyDash.currentData[result[0].CHAR_ITM_ID] = result;
	    				
	    				if(result[0].CHAR_ITM_ID == $ecnmyMap.ui.selectedChrItmId) {
	    					var ecnmyData = $ecnmyDash.currentData[$ecnmyMap.ui.selectedChrItmId];
	    					for(var i=0; i<ecnmyData.length; i++) {
	    						if(ecnmyData[i]["OV_L" + $ecnmyDash.ui.dispOptions[$ecnmyDash.selectedChartSno][0].dispVarOrd + "_ID"] == $ecnmyDash.selectedItmId) {
	    							//$(".dataAreatit h1").html(numberFormat(ecnmyData[i].DTVAL_CO));
	    							break;
	    						}							
	    					}
	    				}
	    				
						drawHighChart4($ecnmyDash.currentData[result[0].CHAR_ITM_ID]);
	    			}
	    		},
	    		error:function(data) {
	    			alert('오류발생~!');
	    		}
	    	});
			
			
			if(mode == "1") {				
				$ecnmyDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
				if($totSurvMain.ui.selectedArea != "00") {
					$ecnmyDash.ui.drawMapData("sgg", "color"); // 맵 그리기
				} else {
					$ecnmyDash.ui.drawMapData("sido", "color"); // 맵 그리기
				}
				
				//지도 색상 반영
				if($ecnmyDash.ecnmyType =="ecnmy9th"){
					$(".colorck li>a:eq(0)").click();
				} else {
					$(".colorck li>a:eq(2)").click();
				}
				$totSurvMain.ui.originTilePerColor = $totSurvMain.ui.tilePerColor;
			} else {
				if($ecnmyDash.selectedItmId == "") {
					var ecnmyData = $ecnmyDash.currentData[$ecnmyMap.ui.selectedChrItmId];
					for(var i=0; i<ecnmyData.length; i++) {
						if($totSurvMain.ui.selectedArea == ecnmyData[i]["OV_L" + $ecnmyDash.ui.dispOptions[$ecnmyDash.selectedChartSno][0].regionVarOrd + "_ID"]) {
							//$(".dataAreatit h1").html(numberFormat(ecnmyData[i].DTVAL_CO));
							break;
						}
					}
				}
				if($ecnmyMap.ui.map != null){
					$ecnmyMap.ui.map.update();
				}
			}
			$totSurvMain.ui.loading(false);
		},
		
		/**
		 * @name		 : allClear 
		 * @description  : 인구총조사 모든 차트데이터, 총인구데이터 초기화
		 * @date		 : 2020.08.06
		 * @author		 : juKwak
		 * @history 	 :
		 */
		allClear : function(){
			$("#emptyHoseChart").empty(); // 빈집 주택의 종류 초기화
			$("#kindHouseChart").empty(); // 종류별 주택 초기화
			$("#moveHomeNone").empty(); // 주택별 방의 수 초기화
			$("#houseTimeChart").empty(); // 주택별 빈집 초기화
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
			$ecnmyDash.ajax.params.surv_year_list = year;			
			if(year == "2010") {
				$ecnmyMap.ui.selectedTblId = 'DT_1KI2002';
				$ecnmyDash.ajax.params.tbl_id_list = 'DT_1KI2002';
				$ecnmyDash.ajax.params.adm_cd = 'l1:00';
				$ecnmyDash.chartsOption.color = ["#f08246", "#009589"];
			} else {
				if($ecnmyDash.ecnmyType == "ecnmy9th") {
					$ecnmyMap.ui.selectedTblId = 'DT_1KI1510';
					$ecnmyDash.ajax.params.tbl_id_list = 'DT_1KI1510';
					$ecnmyDash.ajax.params.adm_cd = 'l1:00';
					$ecnmyDash.chartsOption.color = ["#f08246", "#009589"];
				} else {
					$ecnmyMap.ui.selectedTblId = 'DT_1KI1510_10';
					$ecnmyDash.ajax.params.tbl_id_list = 'DT_1KI1510_10';
					$ecnmyDash.ajax.params.adm_cd = 'l2:00';
					$ecnmyDash.chartsOption.color = ["#c189bb", "#0b4f60"];
				}
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
			$ecnmyDash.ui.dispOptions = {};
			let tblOrd;	//사업 차수
			if($ecnmyDash.ecnmyType == "ecnmy9th") {
				tblOrd = "9";
			} else {
				tblOrd = "10";
			}
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: "/view/totSurv/getDispSrvList.do",
				data: {
					iemCl: "S_ECN",
					tblOrd:	tblOrd,
					stattbYear: $totSurvMain.ui.selectedYear
				},
				dataType: "json",
				success: function(res) {
					for(var i=0; i<res.dispOptions.length; i++) {
						if($ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno] == undefined) {
							$ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno] = [];
							$ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno].push(res.dispOptions[i]);
						} else {
							for(var j=0; j<Object.keys($ecnmyDash.ui.dispOptions).length; j++) {
								if(Object.keys($ecnmyDash.ui.dispOptions)[j] == res.dispOptions[i].chartSno) {
									$ecnmyDash.ui.dispOptions[res.dispOptions[i].chartSno].push(res.dispOptions[i]);
								}
							}
						}						
					}
					for(var i=0; i<$ecnmyDash.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
						if($ecnmyDash.ui.dispOptions[1][i].objVarId != "13999001") {
							$ecnmyDash.itmLv = "ov_l"+$ecnmyDash.ui.dispOptions[1][i].varOrd+"_list";
							$ecnmyDash.admLv = "ov_l"+$ecnmyDash.ui.dispOptions[1][i].regionVarOrd+"_list";
							break;
						}
					}
					$ecnmyDash.ajax.params[$ecnmyDash.itmLv] = '0';
					$ecnmyDash.ajax.params[$ecnmyDash.admLv] = '00';
				},
				error: function(e) {
					//$totSurvMain.ui.alert(errorMessage);
				}
			});	
		},
		
		/**
		 * @name         : pathChange
		 * @description  : 맵이동 or 타일맵 클릭으로 인하여 지역경계 변동이 일어났을경우 경로 수정
		 * @date         : 2020.08.21
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param		 : region - 지역경계구분, lv_adm_cd - 선택한 지역 코드
		 */
		pathChange : function(region, lv_adm_cd){
			$(".locationSpan").children(":gt(1)").remove();//2019-09-16 [이영호] 상단 지역 Path 초기화
			var lv_adm_nm = "";
			var lv_parent_adm_nm = "";
			var html = "";
			var emptyYn = "";
			var srvLogHtml = "javascript:srvLogWrite('P0','01','02','00','"+$totSurvMain.ui.selectedThema;
			srvLogHtml += ( $totSurvMain.ui.selectedThema == '어업' ? '|'+$fisheryDash.fisheryTypeNm : '' )+"','region="+region+",lv_adm_cd="+lv_adm_cd+"');";
			
			if(region == "sgg"){
				$("#dash_sido").val(lv_adm_cd)// 2020-11-30 [곽제욱] dash_diso 값 세팅하도록 변경
				lv_adm_nm = $("#dash_sido option[value=" + lv_adm_cd.substring(0,2) + "]").text(); 
				if(lv_adm_cd.length == 2) {
					html += "<span class='flow' id='sidoFlow'></span>";
					html += "<span class='name' id='sidoNm'>"+ lv_adm_nm +"</span>"
					html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+region+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'					
					$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
					$("#sggNm").remove();
					$("#sggFlow").remove();
					$("#sggClose").remove();
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 START */
					$("#emdongFlow").remove();
					$("#emdongClose").remove();
					$("#emdongNm").remove();
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 END */
				} else {
					let lv_sgg_nm = $("#dash_sgg option[value=" + lv_adm_cd.substring(2,5)+ "]").text();
					html += "<span class='flow' id='sidoFlow'></span>";
					html += "<span class='name' id='sidoNm'>"+ lv_adm_nm +"</span>"
					html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+region+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'
					html += "<span class='flow' id='sggFlow'></span>";
					html += "<span class='name' id='sggNm'>"+ lv_sgg_nm +"</span>"
					html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+region+'\', \''+lv_adm_cd.substring(0,5)+'\')"></button>'
					$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 START */
					$("#emdongFlow").remove();
					$("#emdongClose").remove();
					$("#emdongNm").remove();
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 END */
				}				
			} else if(region == "nationwide"){
				html += '<img src="/images/totSurv/marker.png" class="marker" alt="">';
	      		html += '<span class="name">대한민국</span>';
				$("#locationPath > div").html(html); //2020.11.25[신예리] location영역 div 추가
				$("#dash_sido").val("99")
			} else if(region == "atdrc"){ // 2020-10-14 [주형식] 파라메터명 변경
				if(lv_adm_cd.length == 2) {
					$("#dash_sido").val(lv_adm_cd)// 2020-11-30 [곽제욱] dash_diso 값 세팅하도록 변경
					lv_adm_nm = $("#dash_sido option[value=" + lv_adm_cd.substring(0,2) + "]").text(); 
					html += "<span class='flow' id='sidoFlow'></span>";
					html += "<span class='name' id='sidoNm'>"+ lv_adm_nm +"</span>"
					html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+region+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'					
					$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
					$("#sggNm").remove();
					$("#sggFlow").remove();
					$("#sggClose").remove();
					/** 2020-10-13 [곽제욱] 읍면동 네비게이션 삭제 START */
					$("#emdongFlow").remove();
					$("#emdongClose").remove();
					$("#emdongNm").remove();
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2))
					lv_parent_adm_nm = $("#dash_sido option:selected").text();
					$("#sidoNm").html(lv_parent_adm_nm);
					$("#sidoClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+"sgg"+"\', \'"+"00"+"\')")
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
					lv_adm_nm = $("#dash_sgg option:selected").text();
					emptyYn = $("#sggNm").html();
					/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 START */
					var sidoEmptyYn =$("#sidoNm").html();
					if(sidoEmptyYn=="" || sidoEmptyYn == undefined){
						html += "<span class='flow' id='sidoFlow'></span>";
						html += "<span class='name' id='sidoNm'>"+ lv_parent_adm_nm +"</span>"
						html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+region+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'
					} else {
						$("#sidoNm").html(lv_parent_adm_nm);
						$("#sidoClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+region+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
					}
					/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 END */
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='sggFlow'></span>";
						html += "<span class='name' id='sggNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						$("#sggNm").html(lv_adm_nm);
						/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 START */
						//$("#sggClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+region+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
						$("#sggClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
						/** 2021.06.01[한광희] 지자체 연계 URL 시군구 셋팅 수정 END */
						$("#emdongFlow").remove();
						$("#emdongNm").remove();
						$("#emdongClose").remove();
					} 
					$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
				}
			} else {
				$ecnmyMap.ui.checkIsAtdrc(lv_adm_cd.substring(0,4)+"0")
				//  행정자치 하위 구인경우
				if($ecnmyMap.ui.isAtdrc){
					$totSurvMain.ui.getSidoSggPos(lv_adm_cd); // 2020-11-30 [곽제욱] dash_sido 세팅 추가
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
					lv_adm_nm = $("#dash_sgg option:selected").text();
					// 2020-12-01 [곽제욱] 신규로직 추가 START
					var sgg_adm_nm = $("#dash_sgg option[value='"+lv_adm_cd.substring(2,4)+"0"+"']").text();
					var sido_adm_nm = $("#dash_sido option[value='"+lv_adm_cd.substring(0,2)+"']").text();
					// 2020-12-01 [곽제욱] 신규로직 추가 START
					var stringIndex = lv_adm_nm.indexOf(" ");
					lv_adm_nm = lv_adm_nm.substring(stringIndex, lv_adm_nm.length)
					emptyYn = $("#emdongNm").html();
					
					/** 2021.06.02[한광희] 지자체 연계 URL 시군구 셋팅 수정(비자치구일 경우) START */
					var sidoEmptyYn =$("#sidoNm").html();
					if(sidoEmptyYn=="" || sidoEmptyYn == undefined){
						html += "<span class='flow' id='sidoFlow'></span>";
						html += "<span class='name' id='sidoNm'>"+ sido_adm_nm +"</span>"
						html += '<button class="locationClose" id="sidoClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+"sgg"+'\', \''+lv_adm_cd.substring(0,2)+'\')"></button>'
					} else {
						$("#sidoNm").html(sido_adm_nm);
						$("#sidoClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+"sgg"+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
					}
					var sggEmptyYn =$("#sggNm").html();
					if(sggEmptyYn=="" || sggEmptyYn == undefined){
						html += "<span class='flow'  id='sggFlow'></span>";
						html += "<span class='name' id='sggNm'>"+ sgg_adm_nm +"</span>"
						html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+"atdrc"+'\', \''+lv_adm_cd.substring(0,4)+"0"+'\')"></button>'
					} else {
						$("#sggNm").html(sgg_adm_nm);
						$("#sggClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+"atdrc"+"\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
					}
					/** 2021.06.02[한광희] 지자체 연계 URL 시군구 셋팅 수정(비자치구일 경우) END */
					
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='emdongFlow'></span>";
						html += "<span class='name' id='emdongNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="emdongClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+"emdong"+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						// 2020-12-01 [곽제욱] 신규로직 추가 START
						$("#sidoNm").html(sido_adm_nm);
						$("#sidoClose").attr("onclick", "$ecnmyDash.event.refresh(\'sido\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
						$("#sggNm").html(sgg_adm_nm);
						$("#sggClose").attr("onclick", "$ecnmyDash.event.refresh(\'atdrc\', \'"+lv_adm_cd.substring(0,4)+"0"+"\')");
						// 2020-12-01 [곽제욱] 신규로직 추가 END
						$("#emdongNm").html(lv_adm_nm);
						$("#emdongClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					}
					$ecnmyMap.ui.isAtdrc = false;
				} else {
					$totSurvMain.ui.getSidoSggPos(lv_adm_cd); // 2020-11-30 [곽제욱] dash_sido 세팅 추가
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
					lv_adm_nm = $("#dash_sgg option:selected").text();
					emptyYn = $("#sggNm").html();
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='sggFlow'></span>";
						html += "<span class='name' id='sggNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="sggClose" onclick="'+srvLogHtml+'$ecnmyDash.event.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						$("#sggNm").html(lv_adm_nm);
						$("#sggClose").attr("onclick", srvLogHtml+"$ecnmyDash.event.refresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					}
				}
				$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
			}
			
			$ecnmyDash.event.titleChange(lv_adm_cd); // 2020-12-01 [곽제욱] titlechange 함수 호출하지 않도록 변경
		},
		
		/**
		 * @name         : refresh
		 * @description  : 헤더경로에서 삭제버튼 클릭시 화면 새로 그리기
		 * @date         : 2020.08.21
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param		 : region - 지역경계구분, lv_adm_cd - 지역코드
		 */
		refresh : function(region, lv_adm_cd){
			// 수원시(행정자치) 인 경우 타지않도록 변경필요
			$("div[class*=col-SubDiv]").not("div[class*=col-SubDivWrap]").css("border", "thin #ccc solid");	// 사업체수, 종사자수, 매출액, 영업이익률 선택 초기화
			$($("div[class*=col-SubDiv]").not("div[class*=col-SubDivWrap]")[0]).css("border", "medium #aaa solid");	// 사업체수, 종사자수, 매출액, 영업이익률 선택 초기화
			var upperRegCd = "";
			if(lv_adm_cd.length == 2) {
				upperRegCd = "00";
			} else if(lv_adm_cd.length == 5 && lv_adm_cd.substring(4,5) == "0") {
				upperRegCd = lv_adm_cd.substring(0,2);
			} else if(lv_adm_cd.length == 5 && lv_adm_cd.substring(4,5) != "0") {
				upperRegCd = lv_adm_cd.substring(0,4) + "0";
			} else {
				upperRegCd = $populationDash.ui.upperRegionCheck($totSurvMain.ui.selectedYear, $totSurvMain.ui.selectedArea); //비자치구 -> 행정시 이동
			}
			var admCd = "";
			var thema = $totSurvMain.ui.selectedThema;
			$totSurvMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
			$totSurvMain.ui.tileChangeYn = "Y";
			$ecnmyMap.ui.mapToggleId = ""; // 선택된 맵 토글 초기화
			$(".mapInfo").hide();
			if(region == "sgg"){
				if(lv_adm_cd.length == 2) {
					//$("#ageUnit").text("단위 : 천명"); //광역시도 일 경우 연령분포 차트 단위 변경
					admCd = "00"; // 시군구에서 삭제버튼 클릭시 전국조회를 위하여 지역코드 00 세팅
					$("#dash_sido option[value='99']").attr("selected", "true");
					$ecnmyMap.ui.mapRegion = "sido";
					$totSurvMain.ui.selectedArea = "00";
					$("#sidoFlow").remove();
					$("#sidoNm").remove();
					$("#sidoClose").remove();
					$("#sggFlow").remove();
					$("#sggNm").remove();
					$("#sggClose").remove();
					$("#emdongFlow").remove();
					$("#emdongNm").remove();
					$("#emdongClose").remove();
					$totSurvMain.ui.selectedLevel = "0";
					$ecnmyMap.ui.map.zoom = 1;
					
					$ecnmyDash.ui.rankSlideInit();//20200908 박은식 슬라이드 초기화
					
					$(".Rangecontainer").hide(); //20200914 박은식 드릴다운에서 다시 전국으로 이동 시 range 숨김처리
					$("#areaDiv").html("전국"); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
				} else {
					//$("#ageUnit").text("단위 : 천명"); //광역시도 일 경우 연령분포 차트 단위 변경
					admCd = "00"; // 시군구에서 삭제버튼 클릭시 전국조회를 위하여 지역코드 00 세팅
					$("#dash_sido option[value='99']").attr("selected", "true");
					$ecnmyMap.ui.mapRegion = "sido";
					$totSurvMain.ui.selectedArea = $totSurvMain.ui.selectedArea.substring(0,2);
					$("#sggFlow").remove();
					$("#sggNm").remove();
					$("#sggClose").remove();
					$("#emdongFlow").remove();
					$("#emdongNm").remove();
					$("#emdongClose").remove();
					$totSurvMain.ui.selectedLevel = "0";
					$ecnmyMap.ui.map.zoom = 1;
					
					$ecnmyDash.ui.rankSlideInit();//20200908 박은식 슬라이드 초기화
					
					$(".Rangecontainer").hide(); //20200914 박은식 드릴다운에서 다시 전국으로 이동 시 range 숨김처리
					$("#areaDiv").html($("#sidoNm").text()); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
				}
			} else if(region == 'emdong') {
				$("#ageUnit").text("단위 : 명"); //시군구 이하 일 경우 연령분포 차트 단위 변경
				$totSurvMain.ui.selectedLevel = "2";
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$totSurvMain.ui.getSidoSggPos(upperRegCd);
					$("#dash_sido").val(upperRegCd.substring(0,2));
					
					$ecnmyDash.upperBack = true;
					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}
				$ecnmyMap.ui.mapRegion = "sgg"
				$totSurvMain.ui.selectedArea = admCd;
				$ecnmyMap.ui.map.zoom = 4; // 2020-10-07 [곽제욱] SGIS(개방형지도) 읍면동 -> 상위로 이동할 경우 map의 줌레벨을 4로
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				var title = $("#dash_sgg option:selected").text(); // 2020-10-26 [곽제욱] 선택지역 변경 
				$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
			} else {
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$("#dash_sido").val(upperRegCd.substring(0,2));
					
					$ecnmyDash.upperBack = true;					
					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}
				
				$("#dash_sgg option[value='999']").attr("selected", "true");

				if(upperRegCd != ''){
					if(region == 'emdong'){ // atrdc
						
					} else if(region == 'sgg'){		// 2020-10-14 [주형식]  atdrc명 변경 
						$totSurvMain.ui.selectedLevel = "2";
						$ecnmyMap.ui.mapRegion = "sgg";
						$totSurvMain.ui.getSidoSggPos(admCd.substring(0,5));
						$totSurvMain.ui.selectedArea = admCd.substring(0,5);
					} else if(region == 'atdrc'){		// 2020-10-14 [주형식]  atdrc명 변경 
						$totSurvMain.ui.selectedLevel = "2";
						$ecnmyMap.ui.mapRegion = "sgg";
						$totSurvMain.ui.getSidoSggPos(admCd.substring(0,2));
						$totSurvMain.ui.selectedArea = admCd.substring(0,2);
					} else {
						$totSurvMain.ui.selectedLevel = "1";
						$ecnmyMap.ui.mapRegion = "sido"
						$totSurvMain.ui.getSidoSggPos("00");
						$totSurvMain.ui.selectedArea = "00";
					}
				} else {
					$ecnmyMap.ui.mapRegion = "sgg";
					$totSurvMain.ui.getSidoSggPos(admCd.substring(0,2));
					$totSurvMain.ui.selectedArea = admCd.substring(0,2);
					var title = $("#dash_sido option:selected").text(); // 2020-10-26 [곽제욱] 선택지역 변경 
					$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
				}

				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				$totSurvMain.ui.selectedLevel = "2";
				$ecnmyMap.ui.map.zoom = 4;
				
				$ecnmyDash.ui.rankSlideInit(); // 2021-08-17 [이영호]
			}

			$ecnmyDash.event.allClear();
			$ecnmyDash.event.allChange($totSurvMain.ui.selectedArea, "1");
			$ecnmyDash.ui.getRankSet("", "", $totSurvMain.ui.selectedArea);
		},
		
		/**
		 * @name         : titleChange
		 * @description  : 각 이벤트에 대한 타이틀 변경(폴리곤 선택, 타일맵 클릭, pathChange 등)
		 * @date         : 2020.09.25
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * @param		 : adm_cd : 선택한 지역코드
		 */
		titleChange : function(adm_cd){
			var thema = $totSurvMain.ui.selectedThema; //20201020 박은식 대시보드 분기처리기준 변수 추가
			// 맵 선택의 경우
			if($ecnmyMap.ui.mapToggleId != adm_cd) {
				if(adm_cd.length == 2 && $ecnmyMap.ui.mapToggleId == ""){
				//20201202 박은식 주택 농업 임업 어업 첫 진입 시 전국으로 처리 하기위한 로직 추가 START
					if(adm_cd == "99" || adm_cd == "00"){
						$("#dash_sido").val("00").prop("selected", true);
						title = $("#dash_sido option:selected").text();
					} else {
						title = $("#dash_sido option:selected").text(); // 2020-10-27 [곽제욱] title 문구 변경
					}
				//20201202 박은식 주택 농업 임업 어업 첫 진입 시 전국으로 처리 하기위한 로직 추가 END
				// 2020-10-27 [곽제욱] title 문구변경 로직 추가 START
				} else if(adm_cd.length == 2 && $ecnmyMap.ui.mapToggleId.length == 2 && $ecnmyMap.ui.mapToggleId != ""){
					title = $("#dash_sido option[value='"+adm_cd+"']").text();
				} else if(adm_cd.length == 2 && $ecnmyMap.ui.mapToggleId.length == 5 && $ecnmyMap.ui.mapToggleId != ""){
					title = $("#dash_sgg option[value='"+$ecnmyMap.ui.mapToggleId.substring(2,5)+"']").text();
				// 2020-10-27 [곽제욱] title 문구변경 로직 추가 END
				} else if(adm_cd.length == 5 && $ecnmyMap.ui.mapToggleId != ""){
					title = $("#dash_sgg option[value='"+adm_cd.substring(2,5)+"']").text(); // 2020-10-27 [곽제욱] title 문구 변경
				} else {
					/** 2020-10-06 [곽제욱] 시군구레벨에서 토글될경우 선택은 시군구, 선택취소는 시도 START */
					if($("#dash_sgg").val() == "999"){
						/** 2020-10-27 [곽제욱] sido가 전체일 경우 예외처리 START */
						if($("#dash_sido").val() == "99"){
							title = "전국";
						} else {
							title = $("#dash_sido option:selected").text();
						}
						/** 2020-10-27 [곽제욱] sido가 전체일 경우 예외처리 END */
					} else {
						title = $("#dash_sgg option:selected").text(); // 2020-10-27 [곽제욱] title 문구 변경
					}
					/** 2020-10-06 [곽제욱] 시군구레벨에서 토글될경우 선택은 시군구, 선택취소는 시도 END */
				}
			} else {
				//20201215 박은식 랭크 이동 시 같은 순위의 랭크를 그대로 다시 선택할 경우 지역명 표시 안되는 문제를 일으키는 소스 제거 START
				/*if(adm_cd.length == 2){  
					title = "";
				} else {*/
				if($ecnmyMap.ui.isAtdrc){
					if(adm_cd.substring(0,4)+"0" == adm_cd){
						title = $("#dash_sgg option:selected").text();
					} else {
						/** 2020-10-13 [곽제욱] 시군구 분기처리 START */
						if($totSurvMain.ui.selectedArea.length == 5 && $ecnmyMap.ui.mapToggleId == ""){
							title = $("#dash_sgg option[value='"+$totSurvMain.ui.selectedArea.substring(2,5)+"']").text();
						}
						else{
							title = $("#dash_sgg option:selected").text();
						}
						/** 2020-10-13 [곽제욱] 시군구 분기처리 END */
					}
				} else {
					if(adm_cd.length == 2) {
						title = $("#dash_sido option:selected").text();
					} else {
						if(adm_cd.substring(0,4)+"0" == adm_cd){
							title = $("#dash_sgg option:selected").text();
						} else {
							/** 2020-10-13 [곽제욱] 시군구 분기처리 START */
							if($totSurvMain.ui.selectedArea.length == 5 && $ecnmyMap.ui.mapToggleId == ""){
								title = $("#dash_sgg option[value='"+$totSurvMain.ui.selectedArea.substring(2,5)+"']").text();
							}
							else{
								title = $("#dash_sgg option:selected").text();
							}
							/** 2020-10-13 [곽제욱] 시군구 분기처리 END */
						}
					}
				}
			}
			/*}*/ 
			//20201215 박은식 랭크 이동 시 같은 순위의 랭크를 그대로 다시 선택할 경우 지역명 표시 안되는 문제를 일으키는 소스 제거 END
			$("#areaDiv").css("display", "inline")
			//20201203 박은식 - 시계열일 때 areaDiv index가 0인 title만 변경되므로 시계열은 분기처리해서 양쪽 모두 변경되도록 처리 START
			if($totSurvMain.ui.pageIndex == 12){
				$("#rightMapDiv > #areaDiv").html(title);
				$("#leftMapDiv > #areaDiv").html(title);
			} else {
				$("#areaDiv").html(title);
			}
			//20201203 박은식 - 시계열일 때 areaDiv index가 0인 title만 변경되므로 시계열은 분기처리해서 양쪽 모두 변경되도록 처리 END
			//20201020 박은식 대시보드 분기처리 END
		},
	};

	/** ie11 오류로 추가 */
	String.prototype.replaceAll = function (search, replacement) {
	    var target = this;
	    return target.replace(search, replacement);
	};
	
	$(document).on("click", ".chartSizeLow", function() {
		if(this.parentElement.parentElement.id.indexOf("highChartDiv1") != -1) {
			chart1Size = chart1Size*2;
			$('#highChartDiv1').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart1MaxVal*chart1Size
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv2") != -1) {
			chart2Size = chart2Size*2;
			$('#highChartDiv2').highcharts().yAxis[0].update({
					max: $ecnmyDash.chartsOption.chart2MaxVal*chart2Size
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv3") != -1) {
			chart3Size = chart3Size*2;
			$('#highChartDiv3').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart3MaxVal*chart3Size
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv4") != -1) {
			chart4Size = chart4Size*2;
			$('#highChartDiv4').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart4MaxVal*chart4Size
			});
		}
	});
	
	$(document).on("click", ".chartSizeInit", function() {
		chart1Size = 1, chart2Size = 1, chart3Size = 1, chart4Size = 1;
		if(this.parentElement.parentElement.id.indexOf("highChartDiv1") != -1) {
			$('#highChartDiv1').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart1MaxVal
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv2") != -1) {
			$('#highChartDiv2').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart2MaxVal
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv3") != -1) {
			$('#highChartDiv3').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart3MaxVal
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv4") != -1) {
			$('#highChartDiv4').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart4MaxVal
			});
		}
	});
	
	$(document).on("click", ".chartSizeUp", function() {
		if(this.parentElement.parentElement.id.indexOf("highChartDiv1") != -1) {
			chart1Size = chart1Size/2;
			$('#highChartDiv1').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart1MaxVal*chart1Size
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv2") != -1) {
			chart2Size = chart2Size/2;
			$('#highChartDiv2').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart2MaxVal*chart2Size
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv3") != -1) {
			chart3Size = chart3Size/2;
			$('#highChartDiv3').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart3MaxVal*chart3Size
			});
		} else if(this.parentElement.parentElement.id.indexOf("highChartDiv4") != -1) {
			chart4Size = chart4Size/2;
			$('#highChartDiv4').highcharts().yAxis[0].update({
				max: $ecnmyDash.chartsOption.chart4MaxVal*chart4Size
			});
		}
	});
}(window, document));
//ready 끝

let chart1Size = 1, chart2Size = 1, chart3Size = 1, chart4Size = 1;
/**
 * @name         : workerCompositionChart1
 * @description  : 보건업·사업복지서비스업 종사자 구성비(성별 종사자)
 * @date         : 2021.08.17
 * @author	     : 이영호
 * @history 	 : 
 */
function workerCompositionChart1(data){
	var chartData = [], sumVal = 0, totSurvWon = 0;
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({name:"보건업·사업복지서비스업 종사자 (" + data[i].CHAR_ITM_NM + ")", y: parseInt(data[i].DTVAL_CO), color: $ecnmyDash.chartsOption.color[i]});
		sumVal += parseInt(data[i].DTVAL_CO);
		totSurvWon += parseInt(dtval);
	}
	
	var tool = $("#workerCompositionChart1").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	
	var workerCompositionChart = $('#workerCompositionChart1').highcharts({
		chart: {
			width: 280,
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
				cursor: 'pointer',
				borderWidth: 0,
				point: {
					events: {
						mouseOver: function() {
					        tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
					        if(totSurvWon != 0 && totSurvWon !=""){
					        	ratio = (parseInt(data[this.x].DTVAL_CO) / totSurvWon * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					        var unit = "명";

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
					        
					        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;font-weight: 100'>" + data[this.x].PRD_DE + "년 " + 
								data[this.x].CHAR_ITM_NM + "</p>" +
								"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;font-weight: 100'>(" +
								data[this.x]["OV_" + $ecnmyDash.itmLv.split("_")[1].toUpperCase() + "_KOR"] + ")</p>" +
								"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;white-space:nowrap;'>" + 
								numberFormat(data[this.x].DTVAL_CO) + "</span> <span style='font-weight:700'>" + unit + "</span>"
								/*"<br>" + 
								"<p style='color:#EE3520; font-weight: 500; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;'>" + 
								numberFormat(ratio) + "</p>" + "%"*/
							); 
							/*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
					        
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
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			labelFormatter: function () {
				return "<tspan>" + this.name.replace("보건업·사업복지서비스업 종사자 (","").replace(")","성").replace("종사자수_","") + " </tspan> <tspan x='45'>: " 
					+ numberFormat(parseInt(Math.round(this.y/1000))) + "천명" + "</tspan>";
			},
			symbolRadius: 0,
			itemMarginBottom:7,
			itemWidth: 120,
			padding: 0,
			margin: 10,
			y: 15,
			itemStyle: {
				fontWeight: "100",
				fontFamily: "NanumSquare"
			}
		},
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		title: {
			text: "성별 종사자<br>" + numberFormat(parseInt(Math.round(sumVal/1000))) + "천명",
			verticalAlign: "middle",
			x: -65,
			y: 13,
			floating: true,
			style: { "font-size": "8pt", "font-weight": "100", "font-family": "NanumSquare"}
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
			type: 'pie',
			size: '130%',
			innerSize: '50%',
			showInLegend: true,
			dataLabels: {
				enabled: true,
				formatter: function() {
					return (this.y/this.total*100).toFixed(1) + "%";
				},
				distance: -5,
				borderWidth: 0,
				color: "#000000",
				style: {
					textOutline: "2px white", // 2021-12-22 [이영호] 배창완 주무관 요청
					fontWeight: "100",
					fontSize: "12px",
					textOverflow: 'clip'
                }
			},
			data: chartData
		}]
	}, function(chart) {
        var W = chart.plotWidth + 35,
            h = $('#container').height();
        
        if(W < 412) {
            chart.series[0].update({
                center: ['50%','50%']
            });
        } else {
            chart.series[0].update({
                center: [h/2 - 30,'50%']
            });
        }
    });

	$("#workerCompositionChart1 .highcharts-br").attr("dy", "15");
	$("#workerCompositionChart1 .highcharts-legend-item.highcharts-pie-series").css({"font-size": "12pt", "font-weight":"900", "font-family": "NanumSquare"});
	
	// 범례 생략 무시
	var ellipsisLegend = $("#workerCompositionChart1 g.highcharts-legend title").html();
	if(ellipsisLegend) {
		var str = ellipsisLegend.split(":")[0] + ":"
			+ "<tspan class='highcharts-br' dy='15' x='21'>&ZeroWidthSpace;</tspan>"
			+ ellipsisLegend.split(":")[1];
		$("#workerCompositionChart1 g.highcharts-legend title").parent().html(str);
	}
	
	/*setTimeout(function() {
		// 라벨 생략 무시
		var dataLabels = $("#workerCompositionChart1 g.highcharts-label.highcharts-data-label title");
		for(var i=0; i<dataLabels.length; i++) {
			$(dataLabels[i]).parent().text($(dataLabels[i]).text());
		}
	}, 500);*/
	
	let haloText = $("<tspan class='highcharts-text-outline' fill='white' stroke='white' stroke-width='4px' stroke-linejoin='round' />");
	$("#workerCompositionChart1 .highcharts-label.highcharts-data-label text").each(function(idx, txt) {
		//haloText.html($(txt).text());
		//$(txt).html(haloText);
	});
}

/**
 * @name         : workerCompositionChart2 
 * @description  : 보건업·사업복지서비스업 종사자 구성비(산업별 종사자)
 * @date         : 2021.08.17
 * @author	     : 이영호
 * @history 	 : 
 */
function workerCompositionChart2(data){
	var chartData = [], sumVal = 0, totSurvWon = 0;
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({name:data[i].OV_L2_KOR, y: parseInt(data[i].DTVAL_CO), color: $ecnmyDash.chartsOption.color[i]});
		sumVal += parseInt(data[i].DTVAL_CO);
		totSurvWon += parseInt(dtval);
	}
	
	var tool = $("#workerCompositionChart2").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	
	var workerCompositionChart = $('#workerCompositionChart2').highcharts({
		chart: {
			width: 280,
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
				cursor: 'pointer',
				borderWidth: 0,
				point: {
					events: {
						mouseOver: function() {
					        tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
					        if(totSurvWon != 0 && totSurvWon !=""){
					        	ratio = (parseInt(data[this.x].DTVAL_CO) / totSurvWon * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					        var unit = "명";

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
					        
					        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;font-weight: 100'>" + data[this.x].PRD_DE + "년 " + 
								data[this.x].CHAR_ITM_NM + "</p>" +
								"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;font-weight: 100'>(" +
								data[this.x]["OV_" + $ecnmyDash.itmLv.split("_")[1].toUpperCase() + "_KOR"] + ")</p>" +
								"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;white-space:nowrap;'>" + 
								numberFormat(data[this.x].DTVAL_CO) + "</span> <span style='font-weight:700'>" + unit + "</span>"
								/*"<br>" + 
								"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;'>" + 
								numberFormat(ratio) + "</p>" + "%"*/
								); 
							/*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
					        
					        $(".highcharts-halo.highcharts-color-0, .highcharts-halo.highcharts-color-1").css("visibility", "hidden");
						},
						mouseOut: function() {
							$(document).off("mousemove");
							tool.css("display", "none");
						},
						select: function() {
							console.log("선택");
						}
					}
				}
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			labelFormatter: function () {
				return "<tspan>"+this.name + "</tspan> <tspan x='120'>: " + numberFormat(this.y) + "</tspan>";
			},
			labelFormatter: function () {
				console.log(this.name + " "+this.options.color);
				if(this.options.color =="#009589" || this.options.color =="#0b4f60" ){
					// 사회복지
					return "<tspan>사회복지 </tspan> <tspan x='70'>: " + numberFormat(parseInt(Math.round(this.y/1000))) + "천명" + "</tspan>";
				}else if (this.options.color =="#f08246" || this.options.color =="#c189bb" ){
					// 보건업
					return "<tspan>보건업 </tspan> <tspan x='70'>: " + numberFormat(parseInt(Math.round(this.y/1000))) + "천명"; + "</tspan>";
				}
			},
			symbolRadius: 0,
			itemMarginBottom:7,
			itemWidth: 130,
			padding: 0,
			margin: 10,
			y: 15,
			itemStyle: {
				fontWeight: "100",
				fontFamily: "NanumSquare",
				"word-wrap": "break-word"
			}
		},		
		navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
		title: {
			text: "산업별 종사자<br>" + numberFormat(parseInt(Math.round(sumVal/1000))) + "천명",
			verticalAlign: "middle",
			x: -70,
			y: 13,
			floating: true,
			style: { "font-size": "8pt", "font-weight": "100", "font-family": "NanumSquare"}
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
			type: 'pie',
			size: '130%',
			innerSize: '50%',
			showInLegend: true,
			dataLabels: {
				enabled: true,
				formatter: function() {
					return (this.y/this.total*100).toFixed(1) + "%";
				},
				distance: -5,
				borderWidth: 0,
				color: "#000000",
				style: {
					textOutline: "2px white", // 2021-12-22 [이영호] 배창완 주무관 요청
					fontWeight: "100",
					fontSize: "12px",
					textOverflow: 'clip'
                }
			},
			data: chartData
		}]
	}, function(chart) {
        var W = chart.plotWidth + 35,
            h = $('#container').height();
        
        if(W < 412) {
            chart.series[0].update({
                center: ['50%','50%']
            });
        } else {
            chart.series[0].update({
                center: [h/2 - 30,'50%']
            });
        }
    });
	
	$("#workerCompositionChart2 .highcharts-br").attr("dy", "15");
	$("#workerCompositionChart2 .highcharts-legend-item.highcharts-pie-series").css({"font-size": "12pt", "font-weight":"900", "font-family": "NanumSquare"});
	
	// 범례 생략 무시
	var ellipsisLegend = $("#workerCompositionChart2 g.highcharts-legend title").html();
	if(ellipsisLegend) {
		var str = ellipsisLegend.split(":")[0] + ":"
			+ "<tspan class='highcharts-br' dy='15' x='21'>&ZeroWidthSpace;</tspan>"
			+ ellipsisLegend.split(":")[1];
		$("#workerCompositionChart2 g.highcharts-legend title").parent().html(str);
	}
}

/**
 * @name         : drawHighChart1 
 * @description  : 1번째 차트
 * @date         : 2021.08.19
 * @author	     : 이영호
 * @history 	 : 
 */
function drawHighChart1(data){
	$("#highChartDiv1Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	$("#highChartDiv1Wrap span#ageUnit").empty().append("단위: " + $ecnmyDash.ui.dispOptions[1][0].dispUnitNm);	//단위 표시
	let chartTitle = "";
	if($ecnmyDash.ui.dispOptions[1][0].objNm != undefined) {
		chartTitle += $ecnmyDash.ui.dispOptions[1][0].objNm;
	}
	if(chartTitle.length > 0) {
		if($ecnmyDash.ui.dispOptions[1][0].chartNm != undefined) {
			chartTitle += " " + $ecnmyDash.ui.dispOptions[1][0].chartNm;
		}
	} else {
		if($ecnmyDash.ui.dispOptions[1][0].chartNm != undefined) {
			chartTitle += $ecnmyDash.ui.dispOptions[1][0].chartNm;
		}
	}
	$("#highChartDiv1Wrap .colTit").html(chartTitle);
	
	let maxVal = 0, itmLv, totSurvWon = 0;
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		if(maxVal < parseInt(dtval)) {
			maxVal = parseInt(dtval);
		}
		totSurvWon += parseInt(dtval);
	}
	
	var chartData = [], categories = [];	
	let chartOpt = $ecnmyDash.ui.dispOptions[1][0];
	maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) + Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * (maxVal.toString().length/40);
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({y:parseInt(Math.round(dtval/(chartOpt.dispUnit/chartOpt.kosisUnit))) , color: $ecnmyDash.chartsOption.color[1]});
		var isAlready = false;
		for(var j=0; j<$ecnmyDash.ui.dispOptions[1].length; j++) {			
			if($ecnmyDash.ui.dispOptions[1][j].itmId == data[i]["OV_"+$ecnmyDash.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
				categories.push($ecnmyDash.ui.dispOptions[1][j].altrtvDispWrd);
				isAlready = true;	
			}
		}
		if(!isAlready) {
			categories.push(data[i].OV_L2_KOR);
		}
	}
	for(var i=0; i<$ecnmyDash.ui.dispOptions[1].length; i++) {		// 항목분류 레벨
		if($ecnmyDash.ui.dispOptions[1][i].objVarId != "13999001") {
			itmLv = $ecnmyDash.ui.dispOptions[1][i].varOrd;
			break;
		}
	}
	
	$ecnmyDash.chartsOption.chart1MaxVal = maxVal;
	var tool = $("#highChartDiv1").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	
	var highChartDiv1 = $('#highChartDiv1').highcharts({
		chart: {
	        type: 'bar',
			height: "364px",
			events: {
				load: function() {
					highChartInitOption(this);
				},
				redraw: function() {
					highChartInitOption(this);
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
				stacking: 'normal',
				point: {
					events: {
						click: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							$ecnmyDash.selectedCategory = this.category;
							$ecnmyDash.selectedChartSno = 1;
							$ecnmyDash.selectedStackItmId = "";
							if($ecnmyDash.selectedItmId != "0") {
								if(this.selected == false) {
									$ecnmyDash.selectedItmId = data[this.index]["OV_L" + itmLv + "_ID"];									
									$(".colorck li>a:eq(3)").click();
								} else {
									$ecnmyDash.selectedItmId = "0";
									$(".colorck li>a:eq(0)").click();
								}								
							} else {
								$ecnmyDash.selectedItmId = data[this.index]["OV_L" + itmLv + "_ID"];
								$(".colorck li>a:eq(3)").click();
							}
								
							$totSurvMain.ui.chartTarget = "highChartDiv1";
							$ecnmyDash.ajax.params["char_itm_id_list"] = data[this.index]["CHAR_ITM_ID"];
							$ecnmyMap.ui.selectedChrItmId = data[this.index]["CHAR_ITM_ID"];
			    			$ecnmyDash.ajax.params["ov_l" + itmLv + "_list"] = data[this.index]["OV_L" + itmLv + "_ID"];
							$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 " + $ecnmyDash.ui.dispOptions[1][0].chartNm + "(" + $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm + ")";
					    	$ecnmyDash.ui.chartItmClick($(this)
								, "#576574",$totSurvMain.ui.selectedYear+"년", this.category, $ecnmyDash.ui.dispOptions[1][0].chartNm, "", $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm
								, data[this.x].DTVAL_CO
								, totSurvWon
								, currDataKey
								, '01'
							);							
						},
						mouseOver: function() {
					        tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);
					        
					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
					        if(totSurvWon != 0 && totSurvWon !=""){
					        	ratio = (parseInt(data[this.x].DTVAL_CO) / totSurvWon * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					        var unit = $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm;
					        
					        const target = document.getElementById("highChartDiv1");
					        const clientRect = target.getBoundingClientRect();
					        const rTop = clientRect.top;
					        const rLeft = clientRect.left;
					        const sTopLength = window.pageYOffset;
					        const sLeftLength = window.pageXOffset;
					        
					        $(document).on("mousemove", function(evt) {					        	
					        	tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
					            tool.css("top", evt.clientY + 10);
							});
					        
					        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956; font-weight: 100;'>" + data[this.x].PRD_DE + "년 " + 
								data[this.x].CHAR_ITM_NM + " " + data[this.x]["OV_" + $ecnmyDash.itmLv.split("_")[1].toUpperCase() + "_KOR"] + "</p>" +
								"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>" + 
								numberFormat(data[this.x].DTVAL_CO) + "</span><span style='font-weight:700;'>" + unit + "</span>"
								/*"<br>" + 
								"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;font-weight: 100'>" + 
								numberFormat(ratio) + "</p>" + "%"*/
								); 
							/*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
						},
						mouseOut: function() {
							$(document).off("mousemove");							
							tool.css("display", "none");
						}
					}
				}
			}
		},
		tooltip: {
        	formatter: function () {
				return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
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
					textOverflow: 'none'
				}
			},
			offset: -12
	    },
		yAxis: {
			max: maxVal,
			min: 0,
	        title: {
				text: null
			},
			stackLabels: {
                enabled: true,
                padding: 3,
                style: {
                    fontWeight: '100',
                    color: "#000000",
					fontFamily: 'NanumSquare',
					whiteSpace: 'nowrap',
					textOutline: false,
					textOverflow: 'none'
                },
				formatter: function() {
					if(data[this.x].SMBL_CN != undefined) {
						return data[this.x].SMBL_CN;
					} else {
						if(data[this.x].DTVAL_CO == 0) return "-";
						else return numberFormat(this.total);
					}
				},
				events: {
					mouseover: function() {
				          var chart = this.chart,
				            tooltip = chart.tooltip,
				            points = chart.series[0].points,
				            thisValue = this.pos;

				          tooltip.refresh(points[thisValue]);
				        }
				}
            },
			lineWidth: 1,
			labels: {
				useHTML: true,
				formatter: function() {
					let label = this.value;
					let title = this.value;
					let width = this.value.toString().length*7;
					let style = "text-overflow: none; overflow: justify; width: " + width + "px";
					return '<div style="' + style + '" title="' + title + '">' + numberFormat(label) + '</div>';
				},
				style: {
					width: '100%',
					"min-width": "7px"
				}
			}
	    },
		series: [{
			data: chartData,
			pointWidth: 15,
			states: {
				select: {
					color: "#576574"
				}
			}
			//borderRadius: 5
		}]
	});
	
	let xaxisLabels = $("#highChartDiv1 g.highcharts-axis-labels.highcharts-xaxis-labels text");
	for(var h=0; h<xaxisLabels.length; h++) {
		var isAlready = false;
		for(var i=0; i<data.length; i++) {
			if($(xaxisLabels[h]).text() == data[i]["OV_L"+$ecnmyDash.ui.dispOptions[1][0].dispVarOrd+"_KOR"]) {				
				$(xaxisLabels[h]).prop("id", data[i]["OV_L"+$ecnmyDash.ui.dispOptions[1][0].dispVarOrd+"_ID"]);
				isAlready = true;
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[1].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[1][j].altrtvDispWrd) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[1][j].itmId);
					isAlready = true;
				}
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[1].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[1][j].scrKor) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[1][j].itmId);
				}
			}
		}
	}
	
	$("#highChartDiv1 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mousemove", function(evt) {
		let charItmId = $("#highChartDiv1").parent().parent().data("charitmid");
		let dtvalArr = $ecnmyDash.currentData[charItmId];
		
		for(var i=0; i<dtvalArr.length; i++) {
			if(evt.currentTarget.id == dtvalArr[i]["OV_L" + $ecnmyDash.ui.dispOptions[1][0].dispVarOrd + "_ID"]) {
				tool.css("display", "inline-block");
				var unit = $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm;
				
		        tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
		        tool.css("top", evt.clientY + 10);

		        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
		        tool.html("<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956; font-weight:100;'>" + dtvalArr[i].PRD_DE + "년 " + 
		        	dtvalArr[i].CHAR_ITM_NM + " " + 
		        	dtvalArr[i]["OV_" + $ecnmyDash.itmLv.split("_")[1].toUpperCase() + "_KOR"] + "</p>" +
					"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>" + 
					numberFormat(dtvalArr[i].DTVAL_CO) + "</span><span style='font-weight:700;'>" + unit + "</span>" 
					/*"<br>" + 
					"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;font-weight: 100'>" + 
					numberFormat(ratio) + "</p>" + "%"*/
					); 
			}
		}
	});
	
	$("#highChartDiv1 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mouseout", function(evt) {
		tool.css("display", "none");
	});
}

/**
 * @name         : highChartDiv2 
 * @description  : 2번재 차트
 * @date         : 2021.08.23
 * @author	     : 이영호
 * @history 	 : 
 */
function drawHighChart2(data){
	$("#highChartDiv2Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	$("#highChartDiv2Wrap span#ageUnit").empty().append("단위: " + $ecnmyDash.ui.dispOptions[2][0].dispUnitNm);	//단위 표시
	
	let chartTitle = "";
	if($ecnmyDash.ui.dispOptions[2][0].objNm != undefined) {
		chartTitle += $ecnmyDash.ui.dispOptions[2][0].objNm;
	}
	if(chartTitle.length > 0) {
		if($ecnmyDash.ui.dispOptions[2][0].chartNm != undefined) {
			chartTitle += " " + $ecnmyDash.ui.dispOptions[2][0].chartNm;
		}
	} else {
		if($ecnmyDash.ui.dispOptions[2][0].chartNm != undefined) {
			chartTitle += $ecnmyDash.ui.dispOptions[2][0].chartNm;
		}
	}
	$("#highChartDiv2Wrap .colTit").html(chartTitle);
	
	var chartData = [], categories = [], stacked = {}, itmLv, totSurvWonObj = {};
	for(var i=0; i<data.length; i++) {
		if(data[i].CHAR_ITM_ID != "T20") {
			if(stacked[data[i].CHAR_ITM_ID] != undefined) {
				stacked[data[i].CHAR_ITM_ID].push(data[i]);
			} else {
				stacked[data[i].CHAR_ITM_ID] = [];
				stacked[data[i].CHAR_ITM_ID].push(data[i]);
			}
		}
	}
	
	let maxVal = 0, sumVal = [];
	let chartOpt = $ecnmyDash.ui.dispOptions[2][0];
	for(var i=0; i<Object.keys(stacked).length; i++) {
		let stack = stacked[Object.keys(stacked)[i]];
		totSurvWonObj[Object.keys(stacked)[i]] = 0;	
		for(var j=0; j<stack.length; j++) {
			let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
			if(sumVal[j] != undefined) {
				sumVal[j] = sumVal[j] + parseInt(dtval);
			} else {
				sumVal.push(parseInt(dtval));
			}
			totSurvWonObj[Object.keys(stacked)[i]] += parseInt(dtval);
			var ovLvSn = "OV_"+$ecnmyDash.itmLv.split("_")[1].toUpperCase()+"_SN";
			stack.sort(function(a, b) { return a[ovLvSn] - b[ovLvSn] });
		} 
				
		stacked[Object.keys(stacked)[i]].sort(function(a, b) { return a.CHAR_ITM_SN - b.CHAR_ITM_SN });
	}
	
	for(var i=0; i<sumVal.length; i++) {
		if(maxVal < sumVal[i]) {
			maxVal = sumVal[i];
		}
	}
	maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) + Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * (maxVal.toString().length/40);
	
	for(var i=Object.keys(stacked).length-1; i>=0; i--) {
		let stack = stacked[Object.keys(stacked)[i]];		
		let stackData = [];
		for(var j=0; j<stack.length; j++) {
			if(stack[j].CHAR_ITM_ID != "13999001") {
				let dtval = (stack[j].DTVAL_CO != undefined ? stack[j].DTVAL_CO : 0);
				stackData.push({ y: parseInt(dtval/(chartOpt.dispUnit/chartOpt.kosisUnit)), id: stack[j]["OV_L" + chartOpt.dispVarOrd + "_ID"]});
			}
		}
		//chartData.push({name: stacked[Object.keys(stacked)[i]][0].CHAR_ITM_NM, data: stackData, pointWidth: 15, borderRadius: 5});
		chartData.push({name: stacked[Object.keys(stacked)[i]][0].CHAR_ITM_NM, data: stackData, pointWidth: 15 ,
			states: {
				select: {
					//color: "#576574"
					color: "#576574"
				}
			},
			stackId:stacked[Object.keys(stacked)[i]][0].CHAR_ITM_ID
		});
	}
	
	for(var i=0; i<stacked[Object.keys(stacked)[0]].length; i++) {
		let stack = stacked[Object.keys(stacked)[0]][i];
		var isAlready = false;
		for(var j=0; j<$ecnmyDash.ui.dispOptions[2].length; j++) {			
			if($ecnmyDash.ui.dispOptions[2][j].itmId == stack["OV_"+$ecnmyDash.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
				categories.push($ecnmyDash.ui.dispOptions[2][j].altrtvDispWrd);
				isAlready = true;	
			}
		}
		if(!isAlready) {
			categories.push(stack.OV_L2_KOR);
		}
	}
	
	for(var i=0; i<$ecnmyDash.ui.dispOptions[2].length; i++) {		// 항목분류 레벨
		if($ecnmyDash.ui.dispOptions[2][i].objVarId != "13999001") {
			itmLv = $ecnmyDash.ui.dispOptions[2][i].varOrd;
			break;
		}
	}
	
	var tool = $("#highChartDiv2").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	$ecnmyDash.chartsOption.chart2MaxVal = maxVal;
	var highChartDiv2 = $('#highChartDiv2').highcharts({
		chart: {
	        type: 'bar',
			height: "364px",
			events: {
				load: function() {
					highChartInitOption(this);
				},
				redraw: function() {
					highChartInitOption(this);
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
		colors: $ecnmyDash.chartsOption.color,
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
				stacking: 'normal',
				point: {
					events: {
						click: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							$ecnmyDash.selectedCategory = this.category;
							$ecnmyDash.selectedChartSno = 2;
							$ecnmyDash.selectedStackItmId = this.series.userOptions.stackId;
							if($ecnmyDash.selectedItmId != "0") {
								if(this.selected == false) {
									$ecnmyDash.selectedItmId = this.options.id;
									$(".colorck li>a:eq(3)").click();
								} else {
									$ecnmyDash.selectedItmId = "0";
									$(".colorck li>a:eq(0)").click();	
								}								
							} else {
								$ecnmyDash.selectedItmId = this.options.id;
								$(".colorck li>a:eq(3)").click();
							}
					    	
					    	$totSurvMain.ui.chartTarget = "highChartDiv2";
					    	
					    	let bData = $ecnmyDash.currentData[currDataKey], bObj = {};							
							for(var i=0; i<bData.length; i++) {
								if(bObj[bData[i].CHAR_ITM_NM] != undefined) {
									bObj[bData[i].CHAR_ITM_NM].push(bData[i]);
								} else {
									bObj[bData[i].CHAR_ITM_NM] = [];
									bObj[bData[i].CHAR_ITM_NM].push(bData[i]);
								}
							}
							
					    	$ecnmyDash.ajax.params["char_itm_id_list"] = bObj[this.series.name][this.index]["CHAR_ITM_ID"];
					    	$ecnmyMap.ui.selectedChrItmId = bObj[this.series.name][this.index]["CHAR_ITM_ID"];
			    			$ecnmyDash.ajax.params["ov_l" + itmLv + "_list"] = bObj[this.series.name][this.index]["OV_L" + itmLv + "_ID"];							
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 " +
				    			$ecnmyDash.ui.dispOptions[1][0].chartNm + "(" + this.series.name + "성:" + $ecnmyDash.ui.dispOptions[2][0].kosisUnitNm + ")";
				    		
				    		let totCnt = 0;
				    		for(var i=0; i<Object.keys(totSurvWonObj).length; i++) {
				    			totCnt += totSurvWonObj[Object.keys(totSurvWonObj)[i]];
				    		}
				    		
					    	$ecnmyDash.ui.chartItmClick($(this), "#f08246",$totSurvMain.ui.selectedYear+"년", 
								this.category, $ecnmyDash.ui.dispOptions[2][0].chartNm, this.series.name + "성", $ecnmyDash.ui.dispOptions[2][0].kosisUnitNm
								, bObj[this.series.name][this.x]["DTVAL_CO"]
					    		, totCnt
					    		, currDataKey
					    		, '02'
					    	);
					    	/*
					    	let chartDt = this.series.chart.series, selectIndex = 0, selectColor = "", isSeries = false;
					    	for(var i=0; i<chartDt.length; i++) {
					    		for(var j=0; j<chartDt[i].data.length; j++) {
					    			if(chartDt[i].data[j].selected) {
					    				selectIndex = j;
					    				selectColor = chartDt[i].data[j].color;
					    				let isSeries = true;
					    			}
					    		}
					    		if(!isSeries) {
					    			chartDt[i].data[selectIndex].update({ color: chartDt[i].color });
					    		} else {
					    			chartDt[i].data[selectIndex].update({ color: selectColor });
					    		}
					    	}*/
						},
						mouseOver: function() {
					        tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
							var key = "";
							
							for(var i=0; i<data.length; i++) {
								if(this.series.name == data[i].CHAR_ITM_NM) {
									key = data[i].CHAR_ITM_ID;
								}
							}
					        if(totSurvWonObj != 0 && totSurvWonObj !=""){
					        	ratio = (parseInt(stacked[key][this.x].DTVAL_CO) / totSurvWonObj[key] * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					        var unit = $ecnmyDash.ui.dispOptions[2][0].kosisUnitNm;

					        const target = document.getElementById("highChartDiv2");
					        const clientRect = target.getBoundingClientRect();
					        const rTop = clientRect.top;
					        const rLeft = clientRect.left;
					        const sTopLength = window.pageYOffset;
					        const sLeftLength = window.pageXOffset;
					        
					        $(document).on("mousemove", function(evt) {					        	
					        	tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
					            tool.css("top", evt.clientY + 10);					        
							});
					        
					        let dtvalArr = [];
					        for(var i=0; i<Object.keys(stacked).length; i++) {
					        	for(var j=0; j<stacked[Object.keys(stacked)[i]].length; j++) {
					        		if(j == this.x) {
					        			dtvalArr.push({
					        				"charItmNm": stacked[Object.keys(stacked)[i]][j].CHAR_ITM_NM + "성",
							        		"dtval": parseInt(stacked[Object.keys(stacked)[i]][j].DTVAL_CO),
							        		"index": j+1
							        	});
					        		}
					        	}
					        }
					        
					        let totSum = 0;
							for(j=0; j<dtvalArr.length; j++) {
								totSum += dtvalArr[j].dtval;
							}
							
							dtvalArr.push({
								"charItmNm": "합계",
								"dtval": totSum,
								"index": 0
							});
							
							dtvalArr.sort(function(a, b) { return a.index - b.index });
					        
							let ctCn = "";
							for(var j=0; j<dtvalArr.length; j++) {
								ctCn += "<span style='font-weight:700;'>" + dtvalArr[j].charItmNm + "</span> " 
									+ "<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;white-space:nowrap;'>" +
									numberFormat(dtvalArr[j].dtval) + "</span><span style='font-weight:700;'> " + unit + "</span>";
								if(j<dtvalArr.length-1) {
									ctCn += "<br/>";
								}
							}
							
					        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        tool.html("<p style='color: #3d4956; padding-bottom: 5px; font-weight: 100;'>" + stacked[key][this.x].PRD_DE + "년 " + 
					        	$ecnmyDash.ui.dispOptions[2][0].chartNm + "</p>" +
					        	"<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956; font-weight: 100;'>(" + this.category + ")</p>" +
					        	ctCn
								/*"<br>" + 
								"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;font-weight: 100'>" + 
								numberFormat(ratio) + "</p>" + "%"*/
								); 
							/*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
						},
						mouseOut: function() {
							tool.css("display", "none");
						}
					}
				}
			}
		},
		tooltip: {
        	formatter: function () {
				for(var i=0; i<Object.keys(stacked).length; i++) {
					if(stacked[Object.keys(stacked)[i]][0].CHAR_ITM_NM == this.series.name) {
						return "<b>" + this.key + ": <br/>" + this.series.name + "성 " + numberFormat(parseInt(stacked[Object.keys(stacked)[i]][this.point.index].DTVAL_CO)) 
							+ "(" + $ecnmyDash.ui.dispOptions[2][0].kosisUnitNm + ")</b>" ;
					}
				}
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
					textOverflow: "clip"
				}
			},
			offset: -12
	    },
		yAxis: {
			max: maxVal,
			min: 0,
	        title: {
				text: null
			},
			labels: {
				formatter: function() {
					return numberFormat(this.value);
				}
			},
			lineWidth: 1,
			stackLabels: {
                enabled: true,
                padding: 3,
                style: {
                    fontWeight: '100',
                    color: "#000000",
					fontFamily: 'NanumSquare',
					textOutline: false
                },
				formatter: function() {
					let vTot = 0;
					for(var i=0; i<Object.keys(stacked).length; i++) {
						let dtval = stacked[Object.keys(stacked)[i]][this.x].DTVAL_CO != undefined ? parseInt(stacked[Object.keys(stacked)[i]][this.x].DTVAL_CO) : 0;
						vTot += dtval;
					}
					vTot = Math.round(vTot/(chartOpt.dispUnit/chartOpt.kosisUnit));
					if(data[this.x].SMBL_CN != undefined) {
						return data[this.x].SMBL_CN;
					} else {
						if(vTot == 0) return "0";
						else return numberFormat(vTot);
					}	
				}
            }
	    },
		series: chartData
	});
	
	let xaxisLabels = $("#highChartDiv2 g.highcharts-axis-labels.highcharts-xaxis-labels text");
	for(var h=0; h<xaxisLabels.length; h++) {
		var isAlready = false;
		for(var i=0; i<data.length; i++) {
			if($(xaxisLabels[h]).text() == data[i]["OV_L"+$ecnmyDash.ui.dispOptions[2][0].dispVarOrd+"_KOR"]) {				
				$(xaxisLabels[h]).prop("id", data[i]["OV_L"+$ecnmyDash.ui.dispOptions[2][0].dispVarOrd+"_ID"]);
				isAlready = true;
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[2].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[2][j].altrtvDispWrd) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[2][j].itmId);
					isAlready = true;
				}
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[2].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[2][j].scrKor) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[2][j].itmId);
				}
			}
		}
	}
	
	$("#highChartDiv2 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mousemove", function(evt) {
		let charItmId = $("#highChartDiv2").parent().parent().data("charitmid");
		//let dtvalArr = $ecnmyDash.currentData[charItmId];
		
		var unit = $ecnmyDash.ui.dispOptions[2][0].kosisUnitNm;
		
		let ctValArr = [], ctCn = "";
		
		for(var j=0; j<stacked[Object.keys(stacked)[0]].length; j++) {
			let isAlready = false;
			if(evt.currentTarget.id == stacked[Object.keys(stacked)[0]][j]["OV_L" + $ecnmyDash.ui.dispOptions[2][0].dispVarOrd + "_ID"]) {
				ctCn += "<p style='color: #3d4956; padding-bottom: 5px; font-weight: 100;'>" + stacked[Object.keys(stacked)[0]][j].PRD_DE + "년 " + 
				$ecnmyDash.ui.dispOptions[2][0].chartNm + "</p>";
				ctCn += "<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956; font-weight: 100;'>(";
				for(var k=0; k<$ecnmyDash.ui.dispOptions[2].length; k++) {
					if(stacked[Object.keys(stacked)[0]][j]["OV_L" + $ecnmyDash.ui.dispOptions[2][0].dispVarOrd + "_ID"] == $ecnmyDash.ui.dispOptions[2][k].itmId) {
						ctCn += $ecnmyDash.ui.dispOptions[2][k].altrtvDispWrd;
						isAlready = true;
					}
				}
				
				if(!isAlready) {
					ctCn += stacked[Object.keys(stacked)[0]][j]["OV_L" + $ecnmyDash.ui.dispOptions[2][0].dispVarOrd + "_KOR"];
				}
				ctCn += ")</p>";
				break;
			}
		}
		
		for(var i=0; i<Object.keys(stacked).length; i++) {
			for(var j=0; j<stacked[Object.keys(stacked)[i]].length; j++) {
				let ctValObj = {};
				if(evt.currentTarget.id == stacked[Object.keys(stacked)[i]][j]["OV_L" + $ecnmyDash.ui.dispOptions[2][0].dispVarOrd + "_ID"]) {
					for(var k=0; k<$ecnmyDash.ui.dispOptions[2].length; k++) {
						if(stacked[Object.keys(stacked)[i]][j]["OV_L" + $ecnmyDash.ui.dispOptions[2][0].dispVarOrd + "_ID"] == $ecnmyDash.ui.dispOptions[2][k].itmId) {
							ctValObj = {
								"charItmNm": stacked[Object.keys(stacked)[i]][j].CHAR_ITM_NM + "성",
								"dtval": (stacked[Object.keys(stacked)[i]][j].DTVAL_CO != undefined && stacked[Object.keys(stacked)[i]][j].DTVAL_CO != 0) 
										? stacked[Object.keys(stacked)[i]][j].DTVAL_CO : "-",
								"index": k+1
							} ;
							ctValArr.push(ctValObj);
						}
					}
				}
			}
		}
		
		let totSum = 0;
		for(j=0; j<ctValArr.length; j++) {
			if(ctValArr[j].dtval != "-") {
				totSum += parseInt(ctValArr[j].dtval);
			}
		}
		
		ctValArr.push({
			"charItmNm": "합계",
			"dtval": totSum,
			"index": 0
		});
		
		ctValArr.sort(function(a, b) { return a.index - b.index });
		
		for(var j=0; j<ctValArr.length; j++) {
			ctCn += "<span style='font-weight:700;'>" + ctValArr[j].charItmNm + "</span> " 
				+ "<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;white-space:nowrap;'>" +
				numberFormat(ctValArr[j].dtval) + "</span><span style='font-weight:700;'>" + unit + "</span>";
			if(j<ctValArr.length-1) {
				ctCn += "<br/>";
			}
		}
		
		tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
        tool.css("top", evt.clientY + 10);
		
		tool.html(ctCn);
		tool.css("display", "inline-block");
	});
	
	$("#highChartDiv2 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mouseout", function(evt) {
		tool.css("display", "none");
	});
	
	var legendDiv = document.createElement("div");
	$(legendDiv).css({"position":"absolute","top":"45px"});
	let idx = Object.keys(stacked).length-1;
	for(var i=0; i<Object.keys(stacked).length; i++) {
		var legend = document.createElement("text");
		$(legend).html(stacked[Object.keys(stacked)[i]][0].CHAR_ITM_NM.replace("종사자수_","") + "성");
		$(legend).css({"color":"#606060","cursor":"default","font-size":"11px","font-weight":"100","fill":"#606060","width":"126px","text-overflow":"ellipsis"
					,"border-left":"13px solid","padding-left":"2px","border-color":$ecnmyDash.chartsOption.color[idx],"padding-right":"5px"});
		$(legendDiv).append(legend);
		idx--;
	}
	$('#highChartDiv2').append(legendDiv);
}

/**
 * @name         : drawHighChart3 
 * @description  : 3번째 차트
 * @date         : 2021.08.19
 * @author	     : 이영호
 * @history 	 : 
 */
function drawHighChart3(data){
	$("#highChartDiv3Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	$("#highChartDiv3Wrap span#ageUnit").empty().append("단위: " + $ecnmyDash.ui.dispOptions[3][0].dispUnitNm);	//단위 표시
	
	let chartTitle = "";
	if($ecnmyDash.ui.dispOptions[3][0].objNm != undefined) {
		chartTitle += $ecnmyDash.ui.dispOptions[3][0].objNm;
	}
	if(chartTitle.length > 0) {
		if($ecnmyDash.ui.dispOptions[3][0].chartNm != undefined) {
			chartTitle += " " + $ecnmyDash.ui.dispOptions[3][0].chartNm;
		}
	} else {
		if($ecnmyDash.ui.dispOptions[3][0].chartNm != undefined) {
			chartTitle += $ecnmyDash.ui.dispOptions[3][0].chartNm;
		}
	}
	$("#highChartDiv3Wrap .colTit").html(chartTitle);
	
	let maxVal = 0, itmLv, totSurvWon = 0;
	
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		if(maxVal < parseInt(dtval)) {
			maxVal = parseInt(dtval);
		}		
		totSurvWon += parseInt(dtval);
	}

	var chartData = [], categories = [];
	let chartOpt = $ecnmyDash.ui.dispOptions[3][0];
	maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) + Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * (maxVal.toString().length/40);
	for(var i=0; i<data.length; i++) {
		let dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
		chartData.push({y:parseInt(Math.round(dtval/(chartOpt.dispUnit/chartOpt.kosisUnit))), color: $ecnmyDash.chartsOption.color[0]});
		var isAlready = false;
		for(var j=0; j<$ecnmyDash.ui.dispOptions[3].length; j++) {			
			if($ecnmyDash.ui.dispOptions[3][j].itmId == data[i]["OV_"+$ecnmyDash.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
				categories.push($ecnmyDash.ui.dispOptions[3][j].altrtvDispWrd);
				isAlready = true;	
			}
		}
		if(!isAlready) {
			categories.push(data[i].OV_L2_KOR);
		}
	}
	
	for(var i=0; i<$ecnmyDash.ui.dispOptions[3].length; i++) {		// 항목분류 레벨
		if($ecnmyDash.ui.dispOptions[3][i].objVarId != "13999001") {
			itmLv = $ecnmyDash.ui.dispOptions[3][i].varOrd;
			break;
		}
	}
	
	var tool = $("#highChartDiv3").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	$ecnmyDash.chartsOption.chart3MaxVal = maxVal;
	var highChartDiv3 = $('#highChartDiv3').highcharts({
		chart: {
	        type: 'bar',
			height: "364px",
			events: {
				load: function() {
					highChartInitOption(this);
				},
				redraw: function() {
					highChartInitOption(this);
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
				stacking: 'normal',
				point: {
					events: {
						click: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							$ecnmyDash.selectedCategory = this.category;
							$ecnmyDash.selectedChartSno = 3;
							if($ecnmyDash.selectedItmId != "0") {
								if(this.selected == false) {
									$ecnmyDash.selectedItmId = $ecnmyDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
									$(".colorck li>a:eq(3)").click();
								} else {
									$ecnmyDash.selectedItmId = "0";
									$(".colorck li>a:eq(0)").click();
								}								
							} else {
								$ecnmyDash.selectedItmId = $ecnmyDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
								$(".colorck li>a:eq(3)").click();
							}
								
					    	$totSurvMain.ui.chartTarget = "highChartDiv3";
							$ecnmyDash.ajax.params["char_itm_id_list"] = $ecnmyDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
							$ecnmyMap.ui.selectedChrItmId = $ecnmyDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
			    			$ecnmyDash.ajax.params["ov_l" + itmLv + "_list"] = $ecnmyDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];							
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 " + $ecnmyDash.ui.dispOptions[3][0].chartNm +
				    			"(" + $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm + ")";
					    	$ecnmyDash.ui.chartItmClick($(this), "#f08246",$totSurvMain.ui.selectedYear+"년", 
								this.category, $ecnmyDash.ui.dispOptions[3][0].chartNm, "", $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm, data[this.x].DTVAL_CO, totSurvWon, currDataKey, '03');
						},
						mouseOver: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							if(data[0].CHAR_ITM_ID == "T50") {
								currDataKey = "T30";
							}
					        tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
					        if(totSurvWon != 0 && totSurvWon !=""){
					        	ratio = (parseInt(data[this.x].DTVAL_CO) / totSurvWon * 100).toFixed(2)
					        } else {
					        	ratio = 100;
					        }
					        
					        var unit = $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm;

					        const target = document.getElementById("highChartDiv3");
					        const clientRect = target.getBoundingClientRect();
					        const rTop = clientRect.top;
					        const rLeft = clientRect.left;
					        const sTopLength = window.pageYOffset;
					        const sLeftLength = window.pageXOffset;
					        
					        $(document).on("mousemove", function(evt) {					        	
					        	tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
					            tool.css("top", evt.clientY + 10);					        
							});
					        
					        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;font-weight: 100'>" + data[this.x].PRD_DE + "년 " + 
								data[this.x].CHAR_ITM_NM + "</p>" +
								"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;font-weight: 100'>(" +
								this.category + ")</p>" +
								"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;white-space:nowrap;'>" + 
								numberFormat(data[this.x].DTVAL_CO) + "</span><span style='font-weight:700;'> " + unit + "</span>"
								/*"<br>" + 
								"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;font-weight: 100'>" + 
								numberFormat(ratio) + "</p>" + "%"*/
								); 
							/*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
						},
						mouseOut: function() {
							tool.css("display", "none");
						}
					}
				}
			}
		},
		tooltip: {
        	formatter: function () {
				return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm + ")</b>" ;
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
					textOverflow: "clip"
				}
			},
			offset: -12
	    },
		yAxis: {
			max: maxVal,
			min: 0,
	        title: {
				text: null
			},
			labels: {
				formatter: function() {
					return numberFormat(this.value);
				}
			},
			stackLabels: {
                enabled: true,
                padding: 3,
                style: {
                    fontWeight: '100',
                    color: "#000000",
					fontFamily: 'NanumSquare',
					textOutline: false,
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
			lineWidth: 0.9
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
	
	let xaxisLabels = $("#highChartDiv3 g.highcharts-axis-labels.highcharts-xaxis-labels text");
	for(var h=0; h<xaxisLabels.length; h++) {
		var isAlready = false;
		for(var i=0; i<data.length; i++) {
			if($(xaxisLabels[h]).text() == data[i]["OV_L"+$ecnmyDash.ui.dispOptions[3][0].dispVarOrd+"_KOR"]) {				
				$(xaxisLabels[h]).prop("id", data[i]["OV_L"+$ecnmyDash.ui.dispOptions[3][0].dispVarOrd+"_ID"]);
				isAlready = true;
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[3].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[3][j].altrtvDispWrd) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[3][j].itmId);
					isAlready = true;
				}
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[3].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[3][j].scrKor) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[3][j].itmId);
				}
			}
		}
	}
	
	$("#highChartDiv3 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mousemove", function(evt) {
		let charItmId = $("#highChartDiv3").parent().parent().data("charitmid");
		let dtvalArr = $ecnmyDash.currentData[charItmId];
		
		for(var i=0; i<dtvalArr.length; i++) {
			if(evt.currentTarget.id == dtvalArr[i]["OV_L" + $ecnmyDash.ui.dispOptions[3][0].dispVarOrd + "_ID"]) {
				tool.css("display", "inline-block");
				var unit = $ecnmyDash.ui.dispOptions[3][0].kosisUnitNm;
				
		        tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
		        tool.css("top", evt.clientY + 10);

		        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
		        tool.html("<p style='padding-bottom: 5px;  color: #3d4956; font-weight: 100;'>" + dtvalArr[i].PRD_DE + "년 " + 
		        	dtvalArr[i].CHAR_ITM_NM + "</p><p style='border-bottom: 1px solid #ddd;padding-bottom: 7px; font-weight: 100;'>(" + 
		        	dtvalArr[i]["OV_L" + $ecnmyDash.ui.dispOptions[3][0].dispVarOrd + "_KOR"] + ")</p>" +
					"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>" + 
					numberFormat((dtvalArr[i].DTVAL_CO != undefined && dtvalArr[i].DTVAL_CO != 0)? dtvalArr[i].DTVAL_CO : "-") + "</span><span style='font-weight:700;'> " + unit + "</span>"
					/*"<br>" + 
					"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;font-weight: 100'>" + 
					numberFormat(ratio) + "</p>" + "%"*/
					); 
			}
		}
	});
	
	$("#highChartDiv3 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mouseout", function(evt) {
		tool.css("display", "none");
	});
}

/**
 * @name         : highChartDiv4 
 * @description  : 4번재 차트
 * @date         : 2021.08.19
 * @author	     : 이영호
 * @history 	 : 
 */
function drawHighChart4(data){
	$("#highChartDiv4Wrap").data("charitmid", data[0].CHAR_ITM_ID);												//항목분류코드
	$("#highChartDiv4Wrap span#ageUnit").empty().append("단위: " + $ecnmyDash.ui.dispOptions[4][0].dispUnitNm);	//단위 표시
	
	let chartTitle = "";
	if($ecnmyDash.ui.dispOptions[4][0].objNm != undefined) {
		chartTitle += $ecnmyDash.ui.dispOptions[4][0].objNm;
	}
	if(chartTitle.length > 0) {
		if($ecnmyDash.ui.dispOptions[4][0].chartNm != undefined) {
			chartTitle += " " + $ecnmyDash.ui.dispOptions[4][0].chartNm;
		}
	} else {
		if($ecnmyDash.ui.dispOptions[4][0].chartNm != undefined) {
			chartTitle += $ecnmyDash.ui.dispOptions[4][0].chartNm;
		}
	}
	$("#highChartDiv4Wrap .colTit").html(chartTitle);
	
	let maxVal = 0, itmLv, totSurvWon = 0, mRatio = 0;    

	var chartData = [], categories = [];
	
	for(var i=0; i<$ecnmyDash.ui.dispOptions[4].length; i++) {		// 항목분류 레벨
		if($ecnmyDash.ui.dispOptions[4][i].objVarId != "13999001") {
			itmLv = $ecnmyDash.ui.dispOptions[4][i].varOrd;
			break;
		}
	}
	
	data.sort(function(a, b) { return a["OV_"+$ecnmyDash.itmLv.split("_")[1].toUpperCase()+"_SN"] - b["OV_"+$ecnmyDash.itmLv.split("_")[1].toUpperCase()+"_SN"] });
	for(var i=0; i<data.length; i++) {
		let dtval;
		let currDataKey = data[i].CHAR_ITM_ID;
		if(data[i].CHAR_ITM_ID == "T50") {
			currDataKey = "T30";
		}
		for(var j=0; j<$ecnmyDash.currentData[currDataKey].length; j++) {
			if(data[i]["OV_L" + itmLv + "_ID"] == $ecnmyDash.currentData[currDataKey][j]["OV_L" + itmLv + "_ID"]) {
				dtval = (data[i].DTVAL_CO != undefined ? data[i].DTVAL_CO : 0);
				chartData.push({y:parseFloat((parseInt(dtval)/parseInt($ecnmyDash.currentData[currDataKey][j].DTVAL_CO)*100).toFixed(1)), color: $ecnmyDash.chartsOption.color[0]});
				
				let tRatio = (parseInt(dtval) / $ecnmyDash.currentData[currDataKey][j].DTVAL_CO * 100).toFixed(2);
				if(parseFloat(mRatio) < parseFloat(tRatio)) {
					mRatio = tRatio;
				}
			}
		}		
		
		var isAlready = false;
		for(var j=0; j<$ecnmyDash.ui.dispOptions[4].length; j++) {			
			if($ecnmyDash.ui.dispOptions[4][j].itmId == data[i]["OV_"+$ecnmyDash.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
				categories.push($ecnmyDash.ui.dispOptions[4][j].altrtvDispWrd);
				isAlready = true;	
			}			
		}
		if(!isAlready) {
			categories.push(data[i].OV_L2_KOR);
		}
		
		totSurvWon += parseInt(dtval);
	}
	//maxVal = Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) + Math.round(parseInt(maxVal/(chartOpt.dispUnit/chartOpt.kosisUnit))) * (maxVal.toString().length/40);
	maxVal = parseFloat(mRatio) + parseFloat(mRatio) * (mRatio.toString().length/40);

	var tool = $("#highChartDiv4").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
	$ecnmyDash.chartsOption.chart4MaxVal = maxVal;
	var highChartDiv4 = $('#highChartDiv4').highcharts({
		chart: {
	        type: 'bar',
			height: "364px",
			events: {
				load: function() {
					highChartInitOption(this);
				},
				redraw: function() {
					highChartInitOption(this);
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
				stacking: 'normal',
				point: {
					events: {
						click: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							$ecnmyDash.selectedCategory = this.category;
							$ecnmyDash.selectedChartSno = 4;
							$ecnmyDash.selectedStackItmId = "";
					    	if($ecnmyDash.selectedItmId != "0") {
								if(this.selected == false) {
									$ecnmyDash.selectedItmId = $ecnmyDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
									$(".colorck li>a:eq(3)").click();
								} else {
									$ecnmyDash.selectedItmId = "0";
									$(".colorck li>a:eq(3)").click();
								}								
							} else {
								$ecnmyDash.selectedItmId = $ecnmyDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];
								$(".colorck li>a:eq(2)").click();
							}
								
					    	$totSurvMain.ui.chartTarget = "highChartDiv4";
							$ecnmyDash.ajax.params["char_itm_id_list"] = $ecnmyDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
							$ecnmyMap.ui.selectedChrItmId = $ecnmyDash.currentData[currDataKey][this.index]["CHAR_ITM_ID"];
			    			$ecnmyDash.ajax.params["ov_l" + itmLv + "_list"] = $ecnmyDash.currentData[currDataKey][this.index]["OV_L" + itmLv + "_ID"];							
				    		$totSurvMain.ui.chartTitle = $totSurvMain.ui.selectedYear+"년 " + $ecnmyDash.ui.dispOptions[4][0].chartNm +
				    			"(" + $ecnmyDash.ui.dispOptions[4][0].kosisUnitNm + ")";
					    	$ecnmyDash.ui.chartItmClick($(this), "#f08246",$totSurvMain.ui.selectedYear+"년", 
								this.category, $ecnmyDash.ui.dispOptions[4][0].chartNm, "", $ecnmyDash.ui.dispOptions[4][0].kosisUnitNm, data[this.x].DTVAL_CO, totSurvWon, currDataKey, '04');
						},
						mouseOver: function() {
							let currDataKey = data[0].CHAR_ITM_ID;
							if(data[0].CHAR_ITM_ID == "T50") {
								currDataKey = "T30";
							}
					        tool.css("display", "inline-block");
					        //var irdsrate = parseFloat(d.data.irdsrate);

					        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
					        var ratio = 0;
					        
					        ratio = (parseInt(data[this.x].DTVAL_CO) / $ecnmyDash.currentData[currDataKey][this.x].DTVAL_CO * 100).toFixed(2);
					        
					        var unit = $ecnmyDash.ui.dispOptions[4][0].kosisUnitNm;

					        const target = document.getElementById("highChartDiv4");
					        const clientRect = target.getBoundingClientRect();
					        const rTop = clientRect.top;
					        const rLeft = clientRect.left;
					        const sTopLength = window.pageYOffset;
					        const sLeftLength = window.pageXOffset;
					        
					        $(document).on("mousemove", function(evt) {					        	
					        	tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
					            tool.css("top", evt.clientY + 10);					        
							});
					        
					        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
					        tool.html("<p style='color: #3d4956;white-space:nowrap;margin-bottom: 5px;font-weight: 100'>" + data[this.x].PRD_DE + "년 " + 
								data[this.x].CHAR_ITM_NM + "</p>" +
								"<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956; white-space:nowrap;margin-bottom: 5px;font-weight: 100'>(" +
								this.category + ")</p>" +
								"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;'>" + 
								numberFormat(data[this.x].DTVAL_CO) + "</span><span style='font-weight:100px;'> " + unit + "</span>"
					        	/*"<br>" + 
								"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;font-weight: 100'>" + 
								numberFormat(ratio) + "</p>" + "%"*/
								); 
							/*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
						},
						mouseOut: function() {
							tool.css("display", "none");
						}
					}
				}
			}
		},
		tooltip: {
        	formatter: function () {
				if(this.total == "0") return "<b>" + this.key + ": <br/>-</b>" ;  
					else return "<b>" + this.key + ": <br/>" + this.total + "</b>" ;
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
					textOverflow: "clip"
				}
			},
			offset: -12
	    },
		yAxis: {
			allowDecimals: true,
			max: maxVal,
	        title: {
				text: null
			},
			stackLabels: {
                enabled: true,
                padding: 3,
                style: {
                    fontWeight: '100',
                    color: "#000000",
					fontFamily: 'NanumSquare',
					textOutline: false
                },
				formatter: function() {
					if(data[this.x].SMBL_CN != undefined) {
						return data[this.x].SMBL_CN;
					} else {
						if(data[this.x].DTVAL_CO != undefined && data[this.x].DTVAL_CO != 0) {
							return this.total.toFixed(2);
						} else {
							return "-";
						}
					}
				}
            },
			labels: {				
				formatter: function() {
					return this.value.toFixed(2);
				}
			},
			lineWidth: 1
	    },
		series: [{
			data: chartData,
			pointWidth: 14,
			states: {
				select: {
					color: "#576574"
				}
			}
			//borderRadius: 5
		}]
	});
	
	let xaxisLabels = $("#highChartDiv4 g.highcharts-axis-labels.highcharts-xaxis-labels text");
	for(var h=0; h<xaxisLabels.length; h++) {
		var isAlready = false;
		for(var i=0; i<data.length; i++) {
			if($(xaxisLabels[h]).text() == data[i]["OV_L"+$ecnmyDash.ui.dispOptions[4][0].dispVarOrd+"_KOR"]) {				
				$(xaxisLabels[h]).prop("id", data[i]["OV_L"+$ecnmyDash.ui.dispOptions[4][0].dispVarOrd+"_ID"]);
				isAlready = true;
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[4].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[4][j].altrtvDispWrd) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[4][j].itmId);
					isAlready = true;
				}
			}
		}
		
		if(!isAlready) {
			for(var j=0; j<$ecnmyDash.ui.dispOptions[4].length; j++) {			
				if($(xaxisLabels[h]).text() == $ecnmyDash.ui.dispOptions[4][j].scrKor) {
					$(xaxisLabels[h]).prop("id", $ecnmyDash.ui.dispOptions[4][j].itmId);
				}
			}
		}
	}
	
	$("#highChartDiv4 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mousemove", function(evt) {
		let charItmId = $("#highChartDiv4").parent().parent().data("charitmid");
		let dtvalArr = $ecnmyDash.currentData[charItmId];
		
		for(var i=0; i<dtvalArr.length; i++) {
			if(evt.currentTarget.id == dtvalArr[i]["OV_L" + $ecnmyDash.ui.dispOptions[4][0].dispVarOrd + "_ID"]) {
				tool.css("display", "inline-block");
				var unit = $ecnmyDash.ui.dispOptions[4][0].kosisUnitNm;
				
		        tool.css("left", evt.clientX - (parseInt(tool.css("width"))/2));
		        tool.css("top", evt.clientY + 10);
		        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
		        tool.html("<p style='padding-bottom: 5px; color: #3d4956; font-weight:100;'>" + dtvalArr[i].PRD_DE + "년 " + 
		        	dtvalArr[i].CHAR_ITM_NM + "</p><p style='border-bottom: 1px solid #ddd; padding-bottom: 5px; font-weight: 100;'>(" + 
		        	dtvalArr[i]["OV_L" + $ecnmyDash.ui.dispOptions[4][0].dispVarOrd + "_KOR"] + ")</p>" +
					"<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 8px; padding-right: 3px;'>" + 
					numberFormat((dtvalArr[i].DTVAL_CO != undefined && dtvalArr[i].DTVAL_CO != 0)? dtvalArr[i].DTVAL_CO : "-") + "</span><span style='font-weight:700;'>" + unit + "</span>"
					/*"<br>" + 
					"<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;white-space:nowrap;font-weight: 100'>" + 
					numberFormat(ratio) + "</p>" + "%"*/
					); 
			}
		}
	});
	
	$("#highChartDiv4 g.highcharts-axis-labels.highcharts-xaxis-labels text").on("mouseout", function(evt) {
		tool.css("display", "none");
	});
}

function highChartInitOption(a) {
	let divId = $(a.container).parent().prop("id");
	let divWrapId = $(a.container).parent().parent().parent().prop("id");
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
			$(textContent).css("font-size", "14px");
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
	
	for(let i=0; i<$("div[id^=highChartDiv").not("div[id$=Wrap]").length; i++) {
		let highchartModel = $($("div[id^=highChartDiv").not("div[id$=Wrap]")[i]).highcharts();
		if(highchartModel != undefined) {
			for(let i=0; i<highchartModel.series.length; i++) {
				highchartModel.series[i].data.forEach(function(selector) {
					selector.select(false);
				});
			}
		}
	}
	if($totSurvMain.ui.chartTarget != "highChartDiv2") {
	if($totSurvMain.ui.chartTarget != "") {
			if($("#" + $totSurvMain.ui.chartTarget).highcharts().series.length == 1) {
		$("#" + $totSurvMain.ui.chartTarget).highcharts().series[0].data.forEach(function(selector) {
			if(selector.category == $ecnmyDash.selectedCategory) {
						if($ecnmyDash.selectedStackItmId != "") {
							if($ecnmyDash.selectedStackItmId == selector.series.options.stackId) {
								if($ecnmyDash.selectedItmId != "") {
									if($ecnmyDash.selectedItmId == selector.options.id) {
				selector.select(true);
				$ecnmyMap.ui.selectedObj = $(selector).slice(); 
									}
								}
							}
						} else {
							if($ecnmyDash.selectedItmId != "") {
								selector.select(true);
								$ecnmyMap.ui.selectedObj = $(selector).slice(); 
							}
						}
					}
				});
			} else {
				for(let i=0; i<$("#" + $totSurvMain.ui.chartTarget).highcharts().series.length; i++) {
					$("#" + $totSurvMain.ui.chartTarget).highcharts().series[i].data.forEach(function(selector) {
						if(selector.category == $ecnmyDash.selectedCategory) {
							if($ecnmyDash.selectedStackItmId != "") {
								if($ecnmyDash.selectedStackItmId == selector.series.options.stackId) {
									if($ecnmyDash.selectedItmId != "") {
										if($ecnmyDash.selectedItmId == selector.options.id) {
											selector.select(true);
											$ecnmyMap.ui.selectedObj = $(selector).slice(); 
										}
									}
								}
							} else {
								if($ecnmyDash.selectedItmId != "") {
									selector.select(true);
									$ecnmyMap.ui.selectedObj = $(selector).slice(); 
								}
							}
						}
					});
				}
			}
		}
	} else {
		if($totSurvMain.ui.chartTarget != "") {
			if($("#" + $totSurvMain.ui.chartTarget).highcharts().series.length == 1) {
				$("#" + $totSurvMain.ui.chartTarget).highcharts().series[0].data.forEach(function(selector) {
					if(selector.category == $ecnmyDash.selectedCategory) {
						if($ecnmyDash.selectedStackItmId != "") {
							if($ecnmyDash.selectedStackItmId == selector.series.options.stackId) {
								if($ecnmyDash.selectedItmId != "") {
									if($ecnmyDash.selectedItmId == selector.options.id) {
										selector.select(true);
										$ecnmyMap.ui.selectedObj = $(selector).slice(); 
									}
								}
							}
						} else {
							if($ecnmyDash.selectedItmId != "") {
								selector.select(true);
								$ecnmyMap.ui.selectedObj = $(selector).slice(); 
							}
						}
					}
		});
			} else {
				for(let i=0; i<$("#" + $totSurvMain.ui.chartTarget).highcharts().series.length; i++) {
					$("#" + $totSurvMain.ui.chartTarget).highcharts().series[i].data.forEach(function(selector) {
						if(selector.category == $ecnmyDash.selectedCategory) {
							if($ecnmyDash.selectedStackItmId != "") {
								if($ecnmyDash.selectedStackItmId == selector.series.options.stackId) {
									if($ecnmyDash.selectedItmId != "") {
										if($ecnmyDash.selectedItmId == selector.options.id) {
											selector.select(true);
											$ecnmyMap.ui.selectedObj = $(selector).slice(); 
										}
									}
								}
							} else {
								if($ecnmyDash.selectedItmId != "") {
									selector.select(true);
									$ecnmyMap.ui.selectedObj = $(selector).slice(); 
								}
							}
						}
					});
				}
			}
		}
	}
}
/*********** Kosis Detail Option for SearchList Sub Start **********/
(function() {
	
}());
/*********** Kosis Detail Option for SearchList Sub End  **********/



/*********** Kosis Data List Start **********/
(function() {
	
}());
/*********** Kosis Data List Sub End **********/
