/**
 * 구인정보 상세 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 구인정보상세
 * 
 * history : 
 *	2018.10.11	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjJobInfoDetail = W.$vjJobInfoDetail || {};
	
	$vjJobInfoDetail.ui = {
		data : null,
		
		ready : function() {
			$('#vjJobInfoDetail .wrmScrollable').each(function(){
				$(this).mCustomScrollbar();
			});
			
			var industClass = $("#vjJobInfoDetail #vjIndustClassCd").val();
			if (industClass == undefined || industClass == null || industClass == "" || parseInt(industClass) == 0) {
				$("#vjJobInfoDetail #vjChart2").css("display", "none");
				$("#vjJobInfoDetail #vjChart3").css("display", "none");
				$("#vjJobInfoDetail #vjChart4").css("display", "none");
			}
			
			$vjJobInfoDetail.event.setUIEvent();
		},
		/**
		 * @name         : initChart
		 * @description  : 챠트 구성
		 * 					- 모든 챠트 그리기
		 * @date         : 2018.10.17
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		initChart : function(pMode) {
			console.log("$vjJobInfoDetail.ui.initChart() called.");
			
			this.showChartContents();
			
			var dataParams = {};
			dataParams.type = "JDS";
			dataParams.base_year = "2016";
			dataParams.mode = pMode;
			
			if (pMode == 3 || pMode == 4) {
				var industClass = $("#vjJobInfoDetail #vjIndustClassCd").val();
				if (industClass != null) {
					dataParams.series_cd = industClass.substr(0, 1);// 산업대분류 코드
				} else {
					return;
				}
				
				/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 START */
				dataParams.link_id  = "D3503";
				if(pMode == 3){
					dataParams.itm_id  = "T001";					
				} else if(pMode == 4){
					dataParams.itm_id  = "T002";
				}
				/** 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경 END */
			} else if (pMode == 2) {
				var industClass = $("#vjJobInfoDetail #vjIndustClassCd").val();
				if (industClass != null) {
					dataParams.series_cd = industClass.substr(0, 3);// 산업중분류 코드
				} else {
					return;
				}
				
				dataParams.link_id  = "D3502";	//2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경
			} else if (pMode == 1) {
				var labrrCnt = $("#vjJobInfoDetail #vjLabrrCnt").val();
				if (labrrCnt != null) {
					if (labrrCnt >= 300) {
						dataParams.series_cd = 3;
					} else if (labrrCnt >= 50) {
						dataParams.series_cd = 2;
					} else {
						dataParams.series_cd = 1;
					}
				} else {
					dataParams.series_cd = 1;
				}
				
				dataParams.link_id  = "D3501";	// 2020.04.28[한광희] 일자리 맵 > 구인현황분석 > 데이터보드 차트영역 KOSIS DATA로 변경
			}
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectJobStatData.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						if (pMode == 1) {
							$("#vjJobInfoDetail #vjChart").css({height: 355});
							$("#vjJobInfoDetail #vjChart").closest(".censusChart").css({height: 358});
						} else {
							$("#vjJobInfoDetail #vjChart").css({height: 285});
							$("#vjJobInfoDetail #vjChart").closest(".censusChart").css({height: 288});
						}
						var json = $vjJobInfoDetail.ui.getChartDefaultData(res.result.categoryes, res.result.series);
						
						// y축 단위 표시 - 2019.01.11	ywKim	추가						
						if (pMode == 1) {
							json.yAxis.title.text = "%";
						} else if (pMode == 2) {
							json.yAxis.title.text = "만개";
						} else {
							json.yAxis.title.text = "만원";
						}
							
						$("#vjJobInfoDetail #vjChart").highcharts(json);
						
						$("#vjJobInfoDetail .wrmScrollable").mCustomScrollbar("scrollTo", "bottom", {timeout: 100});
					} else {
						alert("failed!");
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		/*
		 * @name         : turnOnChartBtn
		 * @description  : 챠트 보기 버튼 turn on 기능
		 * @date         : 2019.01.08
		 * @author	     : ywKim
		 * @history 	 :
		 */
		turnOnChartBtn : function(pMode) {
			$("#vjJobInfoDetail #vjChart1").removeClass("on");
			$("#vjJobInfoDetail #vjChart2").removeClass("on");
			$("#vjJobInfoDetail #vjChart3").removeClass("on");
			$("#vjJobInfoDetail #vjChart4").removeClass("on");
			
			if (pMode == 1) {
				$("#vjJobInfoDetail #vjChart1").addClass("on");
			} else if (pMode == 2) {
				$("#vjJobInfoDetail #vjChart2").addClass("on");
			} else if (pMode == 3) {
				$("#vjJobInfoDetail #vjChart3").addClass("on");
			} else if (pMode == 4) {
				$("#vjJobInfoDetail #vjChart4").addClass("on");
			}
		},
		/*
		 * @name         : displayExplanation
		 * @description  : 챠트 통계에 대한 설명 보여주기
		 * @date         : 2019.01.08
		 * @author	     : ywKim
		 * @history 	 :
		 */
		displayExplanation : function(pMode) {
			$("#vjJobInfoDetail #vjExplanation1").css("display", "none");
			$("#vjJobInfoDetail #vjExplanation2").css("display", "none");
			$("#vjJobInfoDetail #vjExplanation3").css("display", "none");
			$("#vjJobInfoDetail #vjExplanation4").css("display", "none");
			
			//mng_s 20201030 이진호, 설명문구 추가
			var labrrCnt = $("#vjJobInfoDetail #vjLabrrCnt").val();
			if (pMode == 1) {
				if(labrrCnt == 0){
					$("#vjJobInfoDetail #vjSource99").css('display', '');
					$("#vjJobInfoDetail #vjSource99").html("※'종사자 규모' 정보가 없는 구인업체는 '종사자 50인 미만' 기준의 통계값을 제공합니다.");
				}
				$("#vjJobInfoDetail #vjExplanation1").css("display", "block");
				$("#vjJobInfoDetail #vjSource1").html("종사자규모별 소득(일자리 행정통계)");
				
			} else if (pMode == 2) {
				$("#vjJobInfoDetail #vjExplanation2").css("display", "block");
				$("#vjJobInfoDetail #vjSource1").html("산업분류별 일자리(일자리 행정통계)");
				$("#vjJobInfoDetail #vjSource99").css('display', 'none');
			} else if (pMode == 3) {
				$("#vjJobInfoDetail #vjExplanation3").css("display", "block");
				$("#vjJobInfoDetail #vjSource1").html("산업대분류별 연령별 소득(일자리 행정통계)");
				$("#vjJobInfoDetail #vjSource99").css('display', 'none');
			} else if (pMode == 4) {
				$("#vjJobInfoDetail #vjExplanation4").css("display", "block");
				$("#vjJobInfoDetail #vjSource1").html("산업대분류별 연령별 소득(일자리 행정통계)");
				$("#vjJobInfoDetail #vjSource99").css('display', 'none');
			}
			//mng_e 20201030 이진호
		},		
		/*
		 * @name         : getChartDefaultData
		 * @description  : 챠트 기본 설정 구하기
		 * @date         : 2018.10.16
		 * @author	     : ywKim
		 * @history 	 :
		 */
		getChartDefaultData : function(pCategoryes, pSeries) {

			Highcharts.setOptions({
			    lang: {
			    	// default
			        numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E']
			    }
			});
			
			var json = {};
			json.chart = {
				type: "column",
				margin: [30, 5, 150, 40],		// 순서 top, right, bottom/*100*/, left
			    height: "400",/*300*/
			    zoomType: "xy",
			};
			
			json.colors = ["#ff0000", "#f79339", "#ffc000", "#92d050", "#00b0f0", "#0000FF", "#7030a0"
			               , "#880015", "#B97A57", "#FFAEC9", "#FFC90E", "#B5E61D", "#99D9EA", "#7092BE"];
						// 빨, 주, 노, 초, 파, 남, 보, 진한빨강, 밤색, 다홍(핑크), 황금, 라임(연두), 연한옥색(하늘), 청회색
			
			// 시리즈가 1개인 경우 카테고리별로 Color 설정

			json.title = { text: "" };
			json.subtitle = { text: "" };
			json.exporting = { enabled: false };
//			json.xAxis = {
//				categories: categories,
//				title: { text: "사업체 규모" }
//			};
//			json.scrollbar = {
//		        enabled:true
//			};
//			json.scrollbar = {
//	            enabled:true,
//				barBackgroundColor: "gray",
//				barBorderRadius: 7,
//				barBorderWidth: 0,
//				buttonBackgroundColor: "gray",
//				buttonBorderWidth: 0,
//				buttonArrowColor: "yellow",
//				buttonBorderRadius: 7,
//				rifleColor: "yellow",
//				trackBackgroundColor: "white",
//				trackBorderWidth: 1,
//				trackBorderColor: "silver",
//				trackBorderRadius: 7
//	    	};
			json.xAxis = {
				categories: pCategoryes,
//				categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
				crosshair: true,
//				min: 0,
//				max: 9,
//				scrollbar: {
//			        enabled: true
//				},
				lineWidth: 1,
				lineColor: "#000000",
				tickWidth: 0
			};
			json.yAxis = {
				min: 0, 
				title: { 
					text: "",
					align: "high",
					offset: 0,
					rotation: 0,
					y: -10
				},
				labels: { overflow: "justify" },
				lineWidth: 1,
				lineColor: "#000000",
				tickWidth: 0
			};
			json.tooltip = { 
				enabled: true, 
				shared: true, 
			};
//			json.tooltip = {
//				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//				pointFormat: '<tr>' +
//							 '	<td style="color:{series.color};padding:0">{series.name}: </td>' +
//		         			 '	<td style="padding:0"><b>{point.y:.1f} mm</b></td>' +
//		         			 '</tr>',
//		         footerFormat: '</table>',
//		         shared: true,
//		         useHTML: true
//			};
//			json.plotOptions = {
//				series: {
//					states: { },
//		            cursor: "pointer",
//		            point: {
//		                events: {
//		                    click: function (e) {
//		                    	$vjJobInfoDetail.ui.selectedDetailPop(this.series.name);									
//		                    }
//		                }
//		            },
//		            marker: {
//		                lineWidth: 1
//		            }
//				},
//				bar: {
//					dataLabels: { enabled: false }
//				}
//			},
			json.plotOptions = {
				column: {
					pointPadding: 0.2,
				    borderWidth: 0
				}
			};  
			json.legend = { 
				enabled: true,
		        align: "center",
		        verticalAlign: "bottom",
//		        borderWidth: 1,
		        symbolWidth: 5,
		        symbolHeight: 5,
		        symbolRadius: 1,
		        itemStyle: {
		        	fontSize: "10px",
		        	fontWeight: "normal",
		        },
			};
			if (pSeries.length <= 1) {
				json.legend.enabled = false;
			}
			json.credits = { enabled: false };
//			json.series = lineSeries;
			
			if (pSeries.length == 1) {
				for (var i = 0; i < pSeries[0].data.length; i++) {
					var obj = {};
					obj.y = pSeries[0].data[i];
					obj.color = json.colors[i];
					pSeries[0].data[i] = obj; 
				}
				
				json.xAxis.title = { text : pSeries[0].name };
			}			
			
			json.series = pSeries;
//				[{
//					name: "Tokyo",
//					data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//				 }, {
//					 name: "New York",
//				     data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
//				 }, {
//					 name: "London",
//				     data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
//				 }, {
//					 name: "Berlin",
//				     data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
//				 }];     
			
			return json;
		},
		/*
		 * @name         : toggleViewContents
		 * @description  : 
		 * @date         : 
		 * @author	     : ywKim
		 * @history 	 :
		 */
		toggleViewContents : function () {
			var $this = $('#vjJobInfoDetail #vjChartContents .view-tab a');
			var $that = $('#vjJobInfoDetail #vjChartContents');
			
			var ck = $this.hasClass("on");
			if(!ck){
				$this.addClass("on");
				$that.hide();
			}else{
				$this.removeClass("on");
				$that.show();
			}
		},		
		/**
		 * @name         : showChartContents
		 * @description  : 챠트 컨텐츠를 보여준다.
		 * 					이때 컨텐츠가 축소돼 있으면 확장시켜준다.
		 * @date         : 2018.10.16
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		showChartContents : function() {
			$('#vjJobInfoDetail #vjChartContents').show();
			var $el = $('#vjJobInfoDetail #vjChartContents .view-tab a');
			
			if ($el.hasClass('on')) {
				$el.click();
			}
		},
	};	
	
	$vjJobInfoDetail.event = {
			/**
			 * @name		 : setUIEvent 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("$vjJobInfoDetail.event.setUIEvent() called.");
				
				var $this = $vjJobInfoDetail.ui;
				
//				// 채용명 클릭
//				$workRoad.event.set("click", "#vjJobInfoDetail #vjJobInfoList_RecruNm", function() {
//					var div = $(this).closest("tr").find("#jo_data_div").val();
//					var no = $(this).closest("tr").find("#jo_data_key").val();
//					$vjJobInfoList.ui.openJobInfoPage(div, no);
//				});
				
				//20190218 손원웅 추가_시작
				// 회사명 클릭
				$workRoad.event.set("click", "#vjJobInfoDetail #vjJobInfoDetail_CorpNm", function() {
					var div = $("#vjJobInfoDetail #jo_data_div").val();
					var no = $("#vjJobInfoDetail #jo_data_key").val();
					var corp_nm = $("#vjJobInfoDetail #corp_nm").val();
					srvLogWrite('D0', '03', '04', '01', (div == 'I' ? '인크루트' : '워크넷')+', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage(div, no);
				});
				// 채용명 클릭
				$workRoad.event.set("click", "#vjJobInfoDetail #vjJobInfoList_RecruNm", function() {
					var div = $(this).closest("tr").find("#jo_data_div").val();
					var no = $(this).closest("tr").find("#jo_data_key").val();
					var corp_nm = $(this).closest("tr").find("#corp_nm").val();
					srvLogWrite('D0', '03', '04', '01', (div == 'I' ? '인크루트' : '워크넷')+', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage(div, no);
				});
				//끝
				
				// 채용사이트 아이콘 클릭
				$workRoad.event.set("click", "#vjJobInfoDetail #vj_jo_data_key", function() {
					var div = $("#vjJobInfoDetail #jo_data_div").val();
					var no = $("#vjJobInfoDetail #jo_data_key").val();
					var corp_nm = $("#vjJobInfoDetail #corp_nm").val();
					srvLogWrite('D0', '03', '04', '01', (div == 'I' ? '인크루트' : '워크넷')+', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage(div, no);
				});
				
				// 인트루트(워크넷 중복건) 아이콘 클릭				
				$workRoad.event.set("click", "#vjJobInfoDetail #vj_incruit_jo_data_key", function() {
					var div = $("#vjJobInfoDetail #jo_data_div").val();
					var no = $("#vjJobInfoDetail #jo_data_key").val();
					var corp_nm = $("#vjJobInfoDetail #corp_nm").val();
//					var no = $("#vjJobInfoDetail #incruit_jo_data_key").val();
					srvLogWrite('D0', '03', '04', '01', (div == 'I' ? '인크루트' : '워크넷')+', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					//20190218 손원웅_채용사이트 아이콘 클릭과 동일하게 변경
					$vjJobInfoList.ui.openJobInfoPage(div, no);
//					$vjJobInfoList.ui.openJobInfoPage("I", no);
				});
				
				// 2020.05.19[주형식] 데이터보드 - 사람인 CI 클릭 이벤트 추가 START								
				$workRoad.event.set("click", "#vjJobInfoDetail #vj_saramin_jo_data_key", function() {
					var div = $("#vjJobInfoDetail #jo_data_div").val();
					var no = $("#vjJobInfoDetail #jo_data_key").val();
					var corp_nm = $("#vjJobInfoDetail #corp_nm").val();
					srvLogWrite('D0', '03', '04', '01', '사람인' +', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage(div, no);
				});
				// 2020.05.19[주형식] 데이터보드 - 사람인 CI 클릭 이벤트 추가 END
				
				// 생활환경 종합
				$workRoad.event.set("click", "#vjJobInfoDetail #vjLifeEnvInfo", function() {
					var sido_cd = $(this).closest("tr").find("#sido_cd").val();
					var sgg_cd = $(this).closest("tr").find("#sgg_cd").val();
					var emdong_cd = $(this).closest("tr").find("#emdong_cd").val();					
					var sido_nm = $(this).closest("tr").find("#sido_nm").val();
					var sgg_nm = $(this).closest("tr").find("#sgg_nm").val();
					var emdong_nm = $(this).closest("tr").find("#emdong_nm").val();					
					
//					$workRoad.ui.deactivateLayerSelectionEvent("#vjJobInfoList");
					var left = parseInt($("#vjJobInfoList").css("left"));
					var top = parseInt($("#vjJobInfoList").css("top"));
					var width = parseInt($("#vjJobInfoList").css("width"));
					left = left + width - $workRoad.ui.coordX;
					top = top - $workRoad.ui.coordY;
					
					var params = {};
					params.sido_cd = sido_cd;
					params.sido_nm = sido_nm;
					if (sgg_cd != "" && sgg_cd != "999") {
						params.sgg_cd = sgg_cd;
						params.sgg_nm = sgg_nm;					
					}
					if (emdong_cd != "" && emdong_cd != "999") {
						params.emdong_cd = emdong_cd;
						params.emdong_nm = emdong_nm;
					}
					$vjLivingEnvironment.ui.ready(params);
					$vjLivingEnvironment.ui.show(left, top);
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '07', '01', '', '');
				});
				
				// 종사자 규모별 소득 현황 Click
				$workRoad.event.set("click", "#vjJobInfoDetail #vjChart1", function() {
					$this.turnOnChartBtn(1);
					$this.initChart(1);
					$this.displayExplanation(1);
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '05', '01', '', '');
				});				
				// 해당 업종 일자리 추이  Click
				$workRoad.event.set("click", "#vjJobInfoDetail #vjChart2", function() {
					$this.turnOnChartBtn(2);
					$this.initChart(2);
					$this.displayExplanation(2);
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '05', '02', '', '');
				});
				// 업종별 연령별 평균소득 현황  Click
				$workRoad.event.set("click", "#vjJobInfoDetail #vjChart3", function() {
					$this.turnOnChartBtn(3);
					$this.initChart(3);
					$this.displayExplanation(3);
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '05', '03', '', '');
				});
				// 업종별 연령별 중위소득 현황  Click
				$workRoad.event.set("click", "#vjJobInfoDetail #vjChart4", function() {
					$this.turnOnChartBtn(4);
					$this.initChart(4);
					$this.displayExplanation(4);
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '05', '04', '', '');
				});					
				// 선택한 회사 상세 정보로 통계 보기  Click
				$workRoad.event.set("click", "#vjJobInfoDetail #vjChartContents .view-tab a", function() {
					$this.toggleViewContents();
				});
				
			},			
	}
	
}(window, document));