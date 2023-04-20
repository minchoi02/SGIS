(function(W, D) {

	W.$statsAnlsMap = W.$statsAnlsMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		/** 2019.12.05[한광희] 2017년 정보 추가및 요청사항으로 주석처리. START */
		/*$statsAnlsMap.event.setMapSize();
		$statsAnlsMap.ui.createMap("map");*/
		/** 2019.12.05[한광희] 2017년 정보 추가및 요청사항으로 주석처리. END */
		
		$statsAnlsMap.event.setUIEvent();
		
		/** 2019.12.05[한광희] 2017년 정보 추가및 요청사항으로 주석처리 및 변경. START */
		//$statsAnlsMap.ui.statsAnalsTypeOfIndustry(gv_type_of_industry);	// 업종 정보 가져오기
		/** 2019.09.30[한광희] 업종 중분류 정보조회 주석 처리 START */
		// $statsAnlsMap.ui.statsAnalsSelectTypeOfIndustryMiddleClassification(gv_type_of_industry_middle_classification); // 업종 중분류 정보 가져오기
		/** 2019.09.30[한광희] 업종 중분류 정보조회 주석 처리 END */
		//$statsAnlsMap.ui.statsAnalsMapDataCount('T1');	// 최초 화면 로드시 사업체수 정보 가져오기
		
		$statsAnlsMap.ui.statsAnalsAnnualSalary('3');
		/** 2019.12.05[한광희] 2017년 정보 추가및 요청사항으로 주석처리 및 변경. END */
		
		Highcharts.setOptions({     
			lang: {
				thousandsSep: ','
					}
		});
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$statsAnlsMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$statsAnlsMap.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$statsAnlsMap.ui = {
		map : null,
		mapChartData : [],
		
		/** 
		 * @name : statsAnalsTypeOfIndustry
		 * @description : 업종 선택 조회
		 * @date : 2019. 07. 01.
		 * @author : 한광희
		 * @history :
		 */
		statsAnalsTypeOfIndustry : function(p_s_class_cd){
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/getStatsAnalsTypeOfIndustry.json",
				dataType: 'json',
				async: false,
				data: {
			    	b_class_cd: "INDCLA",
			    	s_class_cd_len: 1
			    },
			    success: function(res){
			    	if(res.errCd == 0){
			    		var resultList = res.result.resultList;
			    		
			    		for(var i = 0; i < resultList.length; i++){
			    			if(p_s_class_cd == resultList[i].s_class_cd) {
			    				$("#statsAnalsSelectTypeOfIndustry").append("<option value=\"" + resultList[i].s_class_cd + "\" selected=\"selected\">" +resultList[i].s_class_cd_nm + "</option>");
			    			}
			    			else {
			    				$("#statsAnalsSelectTypeOfIndustry").append("<option value=\"" + resultList[i].s_class_cd + "\">" +resultList[i].s_class_cd_nm + "</option>");
			    			}
			    		}
			    	} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				}
			});
		},
		
		/** 
		 * @name : statsAnalsSelectTypeOfIndustryMiddleClassification
		 * @description : 업종 선택(중분류) 조회
		 * @date : 2019. 07. 16.
		 * @author : 한광희
		 * @history :
		 */
		statsAnalsSelectTypeOfIndustryMiddleClassification : function(p_s_class_cd){
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/getStatsAnalsTypeOfIndustryMiddleClassification.json",
				dataType: 'json',
				async: false,
				data: {b_class_cd: "JDS02S"},
			    success: function(res){
			    	if(res.errCd == 0){
			    		var resultList = res.result.resultList;
			    		
			    		for(var i = 0; i < resultList.length; i++){
			    			if(p_s_class_cd == resultList[i].cd) {
			    				$("#statsAnalsSelectTypeOfIndustryMiddleClassification").append("<option value=\"" + resultList[i].cd + "\" selected=\"selected\">" +resultList[i].nm + "</option>");
			    			}
			    			else {
			    				$("#statsAnalsSelectTypeOfIndustryMiddleClassification").append("<option value=\"" + resultList[i].cd + "\">" +resultList[i].nm + "</option>");
			    			}
			    		}
			    	} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				}
			});
			
			$("#statsSelectDiv2").hide();	// 업종 중분류 숨김
		},
		
		/** 
		 * @name : statsAnalsMapDataCount
		 * @description : 사업체수, 종사자수 조회
		 * @date : 2019. 07. 01.
		 * @author : 한광희
		 * @history :
		 */
		statsAnalsMapDataCount : function(item){
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. START */
			$("#alertBox").hide();	// 지역 상세 정보 팝업 숨김
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. END */
			
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. START */
			$("#alertBox1").hide();	// 설명팝업 숨김
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. END */
			
			$("#statsSelectDiv").show();	// 업종 대분류 숨김
			$("#statsSelectDiv2").hide();	// 업종 중분류 표시
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$("#statsSelectDiv3").hide();	// 종사자 규모 숨김
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
			var dataParams = {};
			dataParams.itm_id = item;	// 사업체, 종사자 구분
			dataParams.c2 = $('#statsAnalsSelectTypeOfIndustry').val();	// 업종 값 가져오기
						
			$("#statsAnalsSelectTypeOfIndustry").attr('disabled', false);	// 업종선택 disabled 처리			
			$("#touchFlow").removeClass('statsMenuWrap2');		// sub 타이틀 div class 추가
			$("#touchFlow").addClass('statsMenuWrap');			// sub 타이틀 div class 삭제
			
			// 차트영역 숨김
			$("#statsGraphWrapDiv").attr('style', 'display: none;');
			$("#statsGraphWrapDiv2").attr('style', 'display: none;'); 
			$("#statsGraphWrapDiv3").attr('style', 'display: none;'); 
			
			
			if (item == 'T1') {
				$('#I3201_T1').addClass('on');				// 사업체수 버튼 class 추가
				$('#I3201_T2').removeClass('on');			// 종사자수 버튼 class 삭제
				srvLogWrite('M0','11','02','00','사업체수',''); // 통계 정보 선택

			} else if (item == 'T2') {
				$('#I3201_T1').removeClass('on');			// 사업체수 버튼 class 삭제
				$('#I3201_T2').addClass('on');				// 종사자수 버튼 class 추가
				srvLogWrite('M0','11','02','00','종사자수',''); // 통계 정보 선택
			}
			$('#annualSalary').removeClass('on');			// 연봉 버튼 class 삭제
			$('#jobTransition').removeClass('on');			// 일자리추이 버튼 class 삭제
			$('#E3503').removeClass('on');					// 일자리 만족도 버튼 class 삭제
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$('#E3501').removeClass('on');			// 소득현황 버튼 class 삭제
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/getStatsAnalsMapDataCount.json",
				dataType: 'json',
				data: dataParams,
			    success: function(res){
			    	if(res.errCd == 0){
			    		$statsAnlsMap.ui.mapChartData = res.result.resultList;
			    		
			    		// 가져온 결과로 색지도 표현 START
			    		var option = {"showData":"dt","showDataName":"총인구","unit":"명","adm_cd":"00","setStatsMapCensusData":true,"curPolygonCode":0};
						var data = $statsAnlsMap.ui.mapChartData;
						var parameter = {"year":"2016","bnd_year":"2018"};
						$statsAnlsMap.ui.map.setStatsData(option, data, parameter);
			    		// 가져온 결과로 색지도 표현 END	
						
						/** 2019.10.01[한광희] 일자리통계정보 출처 및 기준년도 문구 추가. START */
						$("#statsGraopSubTitle1").attr('style', 'display: block;');
						$("#statsGraopSubTitle1").html(res.result.resultList[0].prd_de + "년 기준 " + res.result.resultList[0].colct_source);
						/** 2019.10.01[한광희] 일자리통계정보 출처 및 기준년도 문구 추가. END */
						
			    	} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				}
			});
		},
		
		/** 
		 * @name : statsAnalsAnnualSalary
		 * @description : 연봉(연령별 평균소득, 연령별 중위소득) 조회
		 * @date : 2019. 06. 27.
		 * @author : 한광희
		 * @history :
		 */
		statsAnalsAnnualSalary : function(item) {	// 2019.12.05[한광희] 2017년 정보 추가및 요청사항으로 변수 추가.
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. START */
			$("#alertBox").hide();	// 지역 상세 정보 팝업 숨김
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. END */
			
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. START */
			$("#alertBox1").hide();	// 설명팝업 숨김
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. END */
			
			$("#statsSelectDiv").show();	// 업종 대분류 숨김
			$("#statsSelectDiv2").hide();	// 업종 중분류 표시
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$("#statsSelectDiv3").hide();	// 종사자 규모 숨김
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			$("#statsAnalsSelectTypeOfIndustry").attr('disabled', false);	// 업종선택 disabled 처리	
			
			$("#touchFlow").addClass('statsMenuWrap2');			// sub 타이틀 div class 추가
			$("#touchFlow").removeClass('statsMenuWrap');		// sub 타이틀 div class 삭제
			$("#statsGraphWrapDiv2").attr('style', 'position: absolute; top: 50px; z-index:1050; padding-top: 60px; height: 100%; overflow-y:auto; padding-bottom:100px;'); //overflow-y:auto; padding-bottom:100px; 추가
			$("#statsGraphWrapDiv3").attr('style', 'display: none;'); 
			
			$('#I3201_T1').removeClass('on');		// 사업체수 버튼 class 삭제
			$('#I3201_T2').removeClass('on');		// 종사자수 버튼 class 삭제
			$('#annualSalary').addClass('on');		// 연봉 버튼 class 추가
			$('#jobTransition').removeClass('on');	// 일자리추이 버튼 class 삭제
			$('#E3503').removeClass('on');			// 일자리 만족도 버튼 class 삭제
			$('#3').addClass("on1");
			$('#4').removeClass("on1");
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$('#E3501').removeClass('on');			// 소득현황 버튼 class 삭제
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
			if($('#statsAnalsSelectTypeOfIndustry').val() == 0){
				// 2019.12.05[한광희] 2017년 정보 추가및 요청사항으로 주석처리.
				//common_alert("업종을 선택하셔야 통계정보를 확인하실수 있습니다.");
				$('#statsAnalsChartMain2').hide();
				$('#statsAnalsChartMain3').hide();
				/** 2019.10.01[한광희] 연봉 sub title 숨김. START */
				$("#statsGraopSubTitle2").attr('style', 'display: none;');
				/** 2019.10.01[한광희] 연봉 sub title 숨김. END */
				return false;
			} else {
				$('#statsAnalsChartMain2').show();
			}
			srvLogWrite('M0','11','02','00','연봉-업종:'+$('#statsAnalsSelectTypeOfIndustry option:selected').text(),''); // 통계 정보 선택

			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/selectJobStatData.json",
				async: false,
				dataType: "json",
				data: {type: "JDS"
				      ,base_year: "2016"
				      ,mode: "3"
				      ,series_cd: $('#statsAnalsSelectTypeOfIndustry').val() //업종
				      /** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
				      ,link_id: "D3503"
				      ,itm_id: "T001"
				      /** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
				    },
				success: function(res) {
					if(res.errCd == 0){
						/** 2019.10.01[한광희] 연봉 sub title 추가. START */
						$("#statsGraopSubTitle2").attr('style', 'display: block; font-size: 13px; text-align:right;');
						// 2019.12.03[한광희] 기준년도 변경으로 인한 수정 START
						$("#statsGraopSubTitle2").html(res.result.params.base_year + "년 기준  산업대분류별 연령별 소득(일자리행정통계)");
						//$("#statsGraopSubTitle2").html("2016년 기준  산업대분류별 연령별 소득(일자리행정통계)");
						// 2019.12.03[한광희] 기준년도 변경으로 인한 수정 END
						/** 2019.10.01[한광희] 연봉 sub title 추가. END */
						
						$('#statsAnalsChartMain2').highcharts({
							chart: {
								backgroundColor: {
						            linearGradient: [500, 500, 500, 0],
						            stops: [
						            	[0, '#3F84C5'],	// 하단 백그라운드 색
						            	[1, '#2B6CB5']	// 상단 백그라운드 색
						            ]
						        },
						        type: 'column',
						        width: $(window).width(),
						        height: $(window).height(),
						        marginBottom : 330
						    },
						    title: {
						    	text: '만원',
						        align: 'left',
						        margin: 10,
						        style: {
						            color: '#BBC7E6',
						            fontSize: '11px'
						        }
						    },
						    xAxis: {
						    	categories: res.result.categoryes,
						        labels: {
						            style: {
						                color: '#BBC7E6'	// x축 색상
						            }
						        }
						    },
						    yAxis: {
						        title: {
						            text: ''
						        },
						        labels: {
						            formatter: function () {
						            	 return appendCommaToNumber(this.value);
						            },
						            style: {
						                color: '#BBC7E6'	// y축 색상
						            }
						        }

						    },
						    legend: {
						        enabled: false
						    },
						    plotOptions: {
						        series: {
						            borderWidth: 0,
						            dataLabels: {
						                enabled: true,
						                allowOverlap:true,
						                style: {
						                	color: '#FFFFFF',
						                	textOutline : "0px",
						                	fontWeight: "normal",
						                	textShadow: false 
						                }
						            },
						            enableMouseTracking: false,
						            shadow: false
						        }
						    },

						    series: [{
						    	name : "",
						    	colorByPoint: true,
						        data : res.result.series[0].data
						        }]
						});
						
					} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				} 
			});
			
			// 연령별 중위소득 현황 조회
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/selectJobStatData.json",
				async: false,
				dataType: "json",
				data: {type: "JDS"
				      ,base_year: "2016"
				      ,mode: "4"
				      ,series_cd: $('#statsAnalsSelectTypeOfIndustry').val() //업종
				      /** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
				      ,link_id: "D3503"
				      ,itm_id: "T002"
				      /** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
				    },
				success: function(res) {
					if(res.errCd == 0){
						/** 2019.10.01[한광희] 연봉 sub title 추가. START */
						$("#statsGraopSubTitle2").attr('style', 'display: block; font-size: 13px; text-align:right;');
						// 2019.12.03[한광희] 기준년도 변경으로 인한 수정. START
						$("#statsGraopSubTitle2").html(res.result.params.base_year + "년 기준  산업대분류별 연령별 소득(일자리행정통계)");
						//$("#statsGraopSubTitle2").html("2016년 기준  산업대분류별 연령별 소득(일자리행정통계)");
						// 2019.12.03[한광희] 기준년도 변경으로 인한 수정. END
						/** 2019.10.01[한광희] 연봉 sub title 추가. END */
						
						$('#statsAnalsChartMain3').highcharts({
							chart: {
								backgroundColor: {
						            linearGradient: [500, 500, 500, 0],
						            stops: [
						            	[0, '#3F84C5'],	// 하단 백그라운드 색
						            	[1, '#2B6CB5']	// 상단 백그라운드 색
						            ]
						        },
						        type: 'column',
						        width: $(window).width(),
						        height: $(window).height(),
						        marginBottom : 330
						    },
						    title: {
						    	text: '만원',
						        align: 'left',
						        margin: 10,
						        style: {
						            color: '#BBC7E6',
						            fontSize: '11px'
						        }
						    },
						    xAxis: {
						    	categories: res.result.categoryes,
						        labels: {
						            style: {
						                color: '#BBC7E6'	// x축 색상
						            }
						        }
						    },
						    yAxis: {
						        title: {
						            text: ''
						        },
						        labels: {
						            formatter: function () {
						            	 return appendCommaToNumber(this.value);
						            },
						            style: {
						                color: '#BBC7E6'	// y축 색상
						            }
						        }

						    },
						    legend: {
						        enabled: false
						    },
						    plotOptions: {
						        series: {
						            borderWidth: 0,
						            dataLabels: {
						                enabled: true,
						                allowOverlap:true,
						                style: {
						                	color: '#FFFFFF',
						                	textOutline : "0px",
						                	fontWeight: "normal",
						                	textShadow: false 
						                }
						            },
						            enableMouseTracking: false,
						            shadow: false
						        }
						    },

						    series: [{
						    	name : "",
						    	colorByPoint: true,
						        data : res.result.series[0].data
						        }]
						});
						
					} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				} 
			});
		},
				
		/** 
		 * @name : statsAnalsJobTransition
		 * @description : 일자리 추이 조회
		 * @date : 2019. 06. 28.
		 * @author : 한광희
		 * @history :
		 */
		statsAnalsJobTransition : function() {
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. START */
			$("#alertBox").hide();	// 지역 상세 정보 팝업 숨김
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. END */
			
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. START */
			$("#alertBox1").hide();	// 설명팝업 숨김
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. END */
			
			/** 2019.09.30[한광희] 일자리 추이 선택시 업종 중분류 정보조회 추가. START */
			if($("#statsAnalsSelectTypeOfIndustryMiddleClassification option").length == 1) {
				$statsAnlsMap.ui.statsAnalsSelectTypeOfIndustryMiddleClassification(gv_type_of_industry_middle_classification); // 업종 중분류 정보 가져오기				
			}
			/** 2019.09.30[한광희] 일자리 추이 선택시 업종 중분류 정보조회 추가. END */

			$("#statsSelectDiv").hide();	// 업종 대분류 숨김
			$("#statsSelectDiv2").show();	// 업종 중분류 표시
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$("#statsSelectDiv3").hide();	// 종사자 규모 숨김
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
			$("#touchFlow").addClass('statsMenuWrap2');			// sub 타이틀 div class 추가
			$("#touchFlow").removeClass('statsMenuWrap');		// sub 타이틀 div class 삭제
			$("#statsGraphWrapDiv3").attr('style', 'position: absolute; top: 50px; z-index:1050; padding-top: 60px; height: 100%;');	// 연령별 취업자수, 일자리추이, 일자리만족도 차트 영역 속성
			
			/** 2019.10.01[한광희] 일자리 추이 설명팝업 추가. START */
			// $("#statsGraopTitle").html("일자리추이"); // 차트영역 타이틀
			$("#statsGraopTitle").html("일자리추이 " + '<img alt="물음표" src="'+contextPath+'/resources/m2019/images/ico_tooltip01.png" onclick="javascript:$statsAnlsMap.ui.tooltipImgClick();">'); // 차트영역 타이틀
			/** 2019.10.01[한광희] 일자리 추이 설명팝업 추가. END */
			
			$("#statsGraopSubTitle").attr('style', 'display: none;'); // 2019.09.17[한광희] 일자리 통계정보 sub title 추가로 인한 수정.
			$("#statsGraphWrapDiv2").attr('style', 'display: none;'); 
						
			$('#I3201_T1').removeClass('on');		// 사업체수 버튼 class 삭제
			$('#I3201_T2').removeClass('on');		// 종사자수 버튼 class 삭제
			$('#annualSalary').removeClass('on');	// 연봉 버튼 class 삭제
			$('#jobTransition').addClass('on');		// 일자리추이 버튼 class 추가
			$('#E3503').removeClass('on');			// 일자리 만족도 버튼 class 삭제
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$('#E3501').removeClass('on');			// 소득현황 버튼 class 삭제
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
			if($('#statsAnalsSelectTypeOfIndustryMiddleClassification').val() == 0){
				common_alert("일자리 추이 업종을 선택하셔야 정보를 확인하실수 있습니다.");
				$('#statsAnalsChartMain4').hide();	// 차트 숨김
				return false;
			} else {
				$('#statsAnalsChartMain4').show();	// 차트 표시
			}
//			srvLogWrite('M0','11','02','00','연봉-업종:'+$('#statsAnalsSelectTypeOfIndustry').val(),''); // 통계 정보 선택
			srvLogWrite('M0','11','02','00','일자리추이-업종:'+$('#statsAnalsSelectTypeOfIndustryMiddleClassification option:selected').text(),''); // 통계 정보 선택
			
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/selectJobStatData.json",
				async: false,
				dataType: "json",
				data: {type: "JDS"
				      ,base_year: "2016"
				      ,mode: "2"
				      ,series_cd: $('#statsAnalsSelectTypeOfIndustryMiddleClassification').val() // 업종 중분류
				      ,link_id: "D3502"	// 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 
				    },
				success: function(res) {
					if(res.errCd == 0){
						/** 2019.10.01[한광희] 일자리 추이 sub title 추가. START */
						$("#statsGraopSubTitle").attr('style', 'display: block; text-align:right; padding-top:0px;');
						// 2019.12.03[한광희] 기준년도 변경으로 인한 수정. START
						$("#statsGraopSubTitle").html(res.result.params.base_year + "년 기준 산업분류별 일자리(일자리 행정통계)");
						//$("#statsGraopSubTitle").html("2016년 기준 산업분류별 일자리(일자리 행정통계)");
						// 2019.12.03[한광희] 기준년도 변경으로 인한 수정. END
						/** 2019.10.01[한광희] 일자리 추이 sub title 추가. END */
						
						$('#statsAnalsChartMain4').highcharts({
							chart: {
								backgroundColor: {
						            linearGradient: [500, 500, 500, 0],
						            stops: [
						            	[0, '#3F84C5'],	// 하단 백그라운드 색
						            	[1, '#2B6CB5']	// 상단 백그라운드 색
						            ]
						        },
						        type: 'column',
						        width: $(window).width(),
						        height: $(window).height(),
						        marginBottom : 320
						    },
						    title: {
						    	text: '만개',
						        align: 'left',
						        margin: 10,
						        style: {
						            color: '#BBC7E6',
						            fontSize: '11px'
						        }
						    },
						    xAxis: {
						    	categories: res.result.categoryes,
						        labels: {
						            style: {
						                color: '#BBC7E6'	// x축 색상
						            }
						        }
						    },
						    yAxis: {
						        title: {
						            text: ''
						        },
						        labels: {
						            formatter: function () {
						            	 return appendCommaToNumber(this.value);
						            },
						            style: {
						                color: '#BBC7E6'	// y축 색상
						            }
						        }

						    },
						    legend: {
						        enabled: false
						    },
						    plotOptions: {
						        series: {
						            borderWidth: 0,
						            dataLabels: {
						                enabled: true,
						                allowOverlap:true,
						                style: {
						                	color: '#FFFFFF',
						                	textOutline : "0px",
						                	fontWeight: "normal",
						                	textShadow: false 
						                }
						            },
						            enableMouseTracking: false,
						            shadow: false
						        }
						    },

						    series: [{
						    	name : "",
						    	colorByPoint: true,
						        data : res.result.series[0].data
						        }]
						});
						
					} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				} 
			});
		},
		
		/** 
		 * @name : statsAnalsJobSatisfactionDegree
		 * @description : 일자리 만족도 조회
		 * @date : 2019. 06. 26.
		 * @author : 한광희
		 * @history :
		 */
		statsAnalsJobSatisfactionDegree : function(item) {
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. START */
			$("#alertBox").hide();	// 지역 상세 정보 팝업 숨김
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 숨김 처리. END */
			
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. START */
			$("#alertBox1").hide();	// 설명팝업 숨김
			/** 2019.10.01[한광희] 일자리추이 설명팝업 숨김 처리. END */
			
			$("#statsSelectDiv").show();	// 업종 대분류 숨김
			$("#statsSelectDiv2").hide();	// 업종 중분류 표시
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$("#statsSelectDiv3").hide();	// 종사자 규모 숨김
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
			$('#statsAnalsChartMain4').show();	// 차트 표시
			
			$("#statsAnalsSelectTypeOfIndustry").attr('disabled', true);	// 업종선택 disabled 처리
			$("#statsAnalsSelectTypeOfIndustry option:eq(0)").prop("selected", true);	// 업종선택 기본값으로 변경
			$("#statsAnalsSelectTypeOfIndustryMiddleClassification option:eq(0)").prop("selected", true);	// 업종선택 기본값으로 변경
			
			$("#touchFlow").addClass('statsMenuWrap2');			// sub 타이틀 div class 추가
			$("#touchFlow").removeClass('statsMenuWrap');		// sub 타이틀 div class 삭제
			
			$("#statsGraphWrapDiv3").attr('style', 'position: absolute; top: 50px; z-index:1050; padding-top: 60px;');
			$("#statsGraopTitle").html("일자리 만족도"); // 차트영역 타이틀
			/** 2019.09.17[한광희] 일자리 통계정보 sub title 추가로 인한 수정. START */
			$("#statsGraopSubTitle").attr('style', 'display: block; padding-top:0px;');	// 2019.10.01[한광희] sub title style 수정.
			$("#statsGraopSubTitle").html("(통계청 사회조사) 일자리의 전반적인 만족도 질문에 대하여 '매우 만족' 또는 '만족'으로 응답한 비율");
			/** 2019.09.17[한광희] 일자리 통계정보 sub title 추가로 인한 수정. END */
			$("#statsGraphWrapDiv2").attr('style', 'display: none;'); 
						
			$('#I3201_T1').removeClass('on');		// 사업체수 버튼 class 삭제
			$('#I3201_T2').removeClass('on');		// 종사자수 버튼 class 삭제
			$('#annualSalary').removeClass('on');	// 연봉 버튼 class 삭제
			$('#jobTransition').removeClass('on');	// 일자리추이 버튼 class 삭제
			$('#E3503').addClass('on');				// 일자리 만족도 버튼 class 추가
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			$('#E3501').removeClass('on');			// 소득현황 버튼 class 삭제
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
			
			srvLogWrite('M0','11','02','00','일자리만족도',''); // 통계 정보 선택

			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/getStatsAnalsJobSatisfactionDegree.json",
				async: false,
				dataType: "json",
				data: {item : item},
				success: function(res) {
					if(res.errCd == 0){
						
						var mainChart = res.result.statsAnalsJobSatisfactionDegree;
						
						var ChartData = [];		//차트 데이터
						var Category = [];		//차트 카테고리
						
						for(var i = 0; i < mainChart.length; i++) {
							ChartData.push(Number(mainChart[i].dt));
							Category.push(mainChart[i].prd_de);
						}
																		
						$('#statsAnalsChartMain4').highcharts({
						    chart: {
						    	backgroundColor: {
						            linearGradient: [500, 500, 500, 0],
						            stops: [
						            	[0, '#3F84C5'],	// 하단 백그라운드 색
						            	[1, '#2B6CB5']	// 상단 백그라운드 색
						            ]
						        },
						        type: 'line',
						        width: $(window).width(),
						        height: $(window).height(),
						        marginBottom : 330	// 2019.09.17[한광희] 일자리 통계정보 sub title 추가로 인한 수정.
						    },
						    title: {
						    	text: '%',
						        align: 'left',
						        margin: 10,
						        style: {
						            color: '#BBC7E6',
						            fontSize: '11px'
						        }
						    },
						    xAxis: {
						        categories: Category,
						        labels: {
						            style: {
						                color: '#BBC7E6'	// x축 색상
						            }
						        }
						    },
						    yAxis: {
						    	title: {
						            text: ''
						        },
						    	labels: {
						            formatter: function () {
						            	return appendCommaToNumber(this.value);
						            },
						            style: {
						                color: '#BBC7E6'	// y축 색상
						            }
						        },
						        min: 0,
						        max: 100
						    },
						    plotOptions: {
						        line: {
						            dataLabels: {
						                enabled: true,
						                allowOverlap:true,
						                style: {
						                	color: '#FFFFFF',
						                	textOutline : "0px",
						                	fontWeight: "normal",
						                	textShadow: false 
						                }
						            },
						            enableMouseTracking: false
						        },
						        series: {
						            color: '#45C4D8',	// line 색상
						            shadow: false
						        }
						    },
						    legend: {
				                enabled: false
				            },
						    series: [{
						    	name : "",
						        data : ChartData
						    }]
						    
						});
						
					} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				} 
			});
		},
		
		/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
		/** 
		 * @name : statsAnalsEnfsnIncomeSttus
		 * @description : 종사자 규모별 소득현황
		 * @date : 2020. 04. 28.
		 * @author : 한광희
		 * @history :
		 */
		statsAnalsEnfsnIncomeSttus : function(item) {
			$("#alertBox").hide();	// 지역 상세 정보 팝업 숨김
			$("#alertBox1").hide();	// 설명팝업 숨김

			$("#statsSelectDiv").show();	// 업종 대분류 숨김
			$("#statsSelectDiv2").hide();	// 업종 중분류 숨김
			$("#statsSelectDiv3").show();	// 종사자 규모 표시
			
			$("#touchFlow").addClass('statsMenuWrap2');			// sub 타이틀 div class 추가
			$("#touchFlow").removeClass('statsMenuWrap');		// sub 타이틀 div class 삭제
			/*$("#statsGraphWrapDiv3").attr('style', 'position: absolute; top: 50px; z-index:1050; padding-top: 60px; height: 100%;'); // 연령별 취업자수, 일자리추이, 일자리만족도 차트 영역 속성  padding-top 값 변경 */
			$("#statsGraphWrapDiv3").attr('style', 'position: absolute; top: 50px; z-index:1050; padding-top: 0px; height: 100%;');	// 연령별 취업자수, 일자리추이, 일자리만족도 차트 영역 속성
			$("#statsGraopTitle").html("종사자 규모별 소득 현황"); // 차트영역 타이틀
			
			$("#statsGraopSubTitle").attr('style', 'display: none;');
			$("#statsGraphWrapDiv2").attr('style', 'display: none;'); 
						
			$('#I3201_T1').removeClass('on');		// 사업체수 버튼 class 삭제
			$('#I3201_T2').removeClass('on');		// 종사자수 버튼 class 삭제
			$('#annualSalary').removeClass('on');	// 연봉 버튼 class 삭제
			$('#jobTransition').removeClass('on');	// 일자리추이 버튼 class 삭제
			$('#E3503').removeClass('on');			// 일자리 만족도 버튼 class 삭제
			$('#E3501').addClass('on');			// 소득현황 버튼 class 추가
						
			if($('#statsAnalsSelectEnfsn').val() == 0){
				common_alert("규모를 선택하셔야 정보를 확인하실수 있습니다.");
				$('#statsAnalsChartMain4').hide();	// 차트 숨김
				return false;
			} else {
				$('#statsAnalsChartMain4').show();	// 차트 표시
			}
			
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/selectJobStatData.json",
				async: false,
				dataType: "json",
				data: {type: "JDS"
				      ,base_year: "2016"
				      ,mode: "1"
				      ,series_cd: $('#statsAnalsSelectEnfsn').val() // 업종 중분류
				      ,link_id: "D3501" 
				    },
				success: function(res) {
					if(res.errCd == 0){
						$("#statsGraopSubTitle").attr('style', 'display: block; text-align:right; padding-top:0px;');
						$("#statsGraopSubTitle").html(res.result.params.base_year + "년 기준 종사자규모별 일자리(일자리 행정통계)");
						
						$('#statsAnalsChartMain4').highcharts({
							chart: {
								backgroundColor: {
						            linearGradient: [500, 500, 500, 0],
						            stops: [
						            	[0, '#3F84C5'],	// 하단 백그라운드 색
						            	[1, '#2B6CB5']	// 상단 백그라운드 색
						            ]
						        },
						        type: 'column',
						        width: $(window).width(),
						        height: $(window).height(),
						        marginBottom : 320
						    },
						    title: {
						    	text: '%',
						        align: 'left',
						        margin: 10,
						        style: {
						            color: '#BBC7E6',
						            fontSize: '11px'
						        }
						    },
						    xAxis: {
						    	categories: res.result.categoryes,
						        labels: {
						            style: {
						                color: '#BBC7E6'	// x축 색상
						            }
						        }
						    },
						    yAxis: {
						        title: {
						            text: ''
						        },
						        labels: {
						            formatter: function () {
						            	 return appendCommaToNumber(this.value);
						            },
						            style: {
						                color: '#BBC7E6'	// y축 색상
						            }
						        }

						    },
						    legend: {
						        enabled: false
						    },
						    plotOptions: {
						        series: {
						            borderWidth: 0,
						            dataLabels: {
						                enabled: true,
						                allowOverlap:true,
						                style: {
						                	color: '#FFFFFF',
						                	textOutline : "0px",
						                	fontWeight: "normal",
						                	textShadow: false 
						                }
						            },
						            enableMouseTracking: false,
						            shadow: false
						        }
						    },

						    series: [{
						    	name : "",
						    	colorByPoint: true,
						        data : res.result.series[0].data
						        }]
						});
						
					} else {
						messageAlert.open('failed!');
					}
				} ,
				error:function(err) {
					messageAlert.open(err.responseText);
				} 
			});
		},
		/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
		
		/**
		 * @name : statsAnlsChart
		 * @description : 사업체수&종사자수 chart 조회
		 * @date : 2019. 07. 02.
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		statsAnlsChart : function() {

			$("#statsGraphWrapDiv").attr('style', 'position: absolute; z-index:1050;');	// 차트 속성
						
			var mainChart = $statsAnlsMap.ui.mapChartData;
			
			var ChartData = [];		//차트 데이터
			var Category = [];		//차트 카테고리
			var formatter = {};
			
			for(var i = 0; i < mainChart.length; i++) {
				ChartData.push(Number(mainChart[i].dt));
				Category.push(mainChart[i].adm_nm);
				formatter[mainChart[i].adm_nm] = mainChart[i].unit_nm;
			}
			
			$('#statsAnalsChartMain').highcharts({
				chart: {
					backgroundColor: {
			            linearGradient: [500, 500, 500, 0],
			            stops: [
			            	[0, '#3F84C5'],	// 하단 백그라운드 색
			            	[1, '#2B6CB5']	// 상단 백그라운드 색
			            ]
			        },
			        type: 'column',
			        width: 1300,
			        height: 240,
			        marginBottom : 50,
			        showAxes: false
			    },
			    title: {
			        text: ''
			    },
			    xAxis: {
			    	categories: Category,
			        labels: {
			            style: {
			                color: '#BBC7E6'	// x축 색상
			            }
			        },
			        tickWidth: 0
			    },
			    yAxis: {
			        title: {
			            text: ''
			        },
			        labels: {
			        	enabled: false,
			            style: {
			                color: '#BBC7E6'	// y축 색상
			            }
			        },
			        gridLineWidth: 0
			    },
			    legend: {
			        enabled: false
			    },
			    plotOptions: {
			        series: {
			            borderWidth: 0,
			            dataLabels: {
			                enabled: true,
			                allowOverlap:true,
			                style: {
			                	color: '#FFFFFF',
			                	textOutline : "0px",
			                	fontWeight: "normal",
			                	textShadow: false 
			                },
			                formatter: function () {
			                	return appendCommaToNumber(this.y) + formatter[this.x];	// 조회 건수에 해당 단위 적용
				            }
			            },
			            enableMouseTracking: false,
			            shadow: false
			        }
			    },

			    series: [{
			    	name : "",
			    	colorByPoint: true,
			        data : ChartData
			        }]
			});
		},
		
		/** 2019.10.01[한광희] 일자리추이 설명팝업 이벤트 추가. START */
		/**
		 * @name : tooltipImgClick
		 * @description : 일자리 추이 물음표 클릭 이벤트
		 * @date : 2019. 10. 01.
		 * @author : 한광희
		 * @history :
		 * @param :
		 */
		tooltipImgClick : function() {
			$("#alertBox1").show();
		},
		/** 2019.10.01[한광희] 일자리추이 설명팝업 이벤트 추가. END */
				
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2019. 06. 25.
		 * @author : 한광희
		 * @history :
		 * @param id :
		 *            html tag id
		 */
		createMap : function(id) {
			this.map = new sMap.map();
			//2019-09-23 [김남민] 모바일 > 일자리 통계정보 > get_sido_2018.js 두번 불러오는거 잡음. START
			this.map.curPolygonCode = 0;
			//2019-09-23 [김남민] 모바일 > 일자리 통계정보 > get_sido_2018.js 두번 불러오는거 잡음. END
			this.map.isCurrentLocationMarker = true;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 989674, 1818313 ];
			this.map.zoom = 1;
			this.map.createMap($statsAnlsMap, id, {
				/*
				isZoomControl : true,
				isCurrentControl : true,
				isMapSizeControl : true,
				isPoiControl : true,
				isMapNavigator : true,
				navigatorOption : {
					id : "map-navigator-",
					min : "emdong"
				},
				mapStatToggleOption : // 통계 폴리곤 토글 버튼의 옵션
				{
					defaultShowMapStat : false
				// 초기에 지도의 통계를 보여줄지의 유무
				},
				isMapCaptionToggleControl : true,// 통계 캡션 토글 버튼 생성 유무
				mapCaptionToggleOption : // 통계 캡션 토글 옵션
				{
					defaultShowCaption : false,// 초기에 지도의 통계 캡션을 보여줄지의 유무
					callback : function(isOn) {
					}
				}
				*/
			});
			/*
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.addControlEvent("drag");
			this.map.addControlEvent("dragend");
			*/
			this.map.gMap.whenReady(function() {
				// $statsAnlsMapApi.request.initialize();
				
			});	
		}
	};
	
	// 지도 콜백 함수 선언
	$statsAnlsMap.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 추가. START */
			var areaTitle = data.properties.adm_nm;	// 지역명
			var areaData = data.info[0].result.dt;	// 지역 값
			var areaDataYear = data.info[0].result.prd_de;	// 기준년도
			var areaDataUnitNm = data.info[0].result.unit_nm;	// 단위명
			
			// 지역 선택시 해당 지역 정보 표출 START
			$("#alertBox").show();
			$("#statsAnlsMapAreaTitle").html(areaTitle);
			$("#statsAnlsMapAreaData").html(areaDataYear + "년 : " + appendCommaToNumber(areaData) + "(" + areaDataUnitNm + ")");
			// 지역 선택시 해당 지역 정보 표출 END
			/** 2019.09.30[한광희] 지역 클릭 시 상세 정보 팝업 추가. END */
			
			//console.log("didSelectedPolygon - START");
		}
		// 지도이동. createMap()에서 "movestart" 이벤트 선언시 콜백됨. 
		,didMapMoveStart : function(event, map) {
			//console.log("didMapMoveStart - START");
		}
		// 지도이동종료. createMap()에서 "moveend" 이벤트 선언시 콜백됨.
		,didMapMoveEnd : function(event, map) {
			//console.log("didMapMoveEnd - START");
		}
		// 줌 시작. createMap()에서 "zoomstart" 이벤트 선언시 콜백됨. 
		,didMapZoomStart : function(event, map) {
			//console.log("didMapZoomStart - START");
		}
		// 줌 종료. createMap()에서 "zoomend" 이벤트 선언시 콜백됨. 
		,didMapZoomEnd : function(event, map) {
			//console.log("didMapZoomEnd - START");
		}
		// 지도 드래그. createMap()에서 "drag" 이벤트 선언시 콜백됨. 
		,didMapDrag : function(event, map) {
			//console.log("didMapDrag - START");
		}
		// 지도 드래그 종료. createMap()에서 "dragend" 이벤트 선언시 콜백됨. 
		,didMapDragEnd : function(event, map) {
			//console.log("didMapDragEnd - START");
		}
	};
	
	$statsAnlsMap.util = {
			/**
			 * 숫자에 천단위 콤마추가 및 꼬리말 추가
			 */
			addComma : function (pNumberString, pTrailer) {
				if (pNumberString == undefined) {
					return "";
				}
				
				var parts = pNumberString.toString().split(".");
				var str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
				
			    if (typeof pTrailer != 'undefined') {
			    	str += pTrailer;
			    }
			    
			    return str;
			}
	};

	$statsAnlsMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2019.06.25
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
			/** 2019.09.30[한광희] 지역 정보 팝업 닫기. START */
			// 지역정보 alert 닫기버튼
			$(document).on("click", "#statsAnlsMapAlertBoxClose", function(){
				$("#alertBox").hide();
			});
			/** 2019.09.30[한광희] 지역 정보 팝업 닫기. END */
			
			/** 2019.10.01[한광희] 일자리추이 설명팝업 닫기. START */
			// 일자리추이 설명 alert 닫기버튼
			$(document).on("click", "#statsAnlsMapAlertBoxClose1", function(){
				$("#alertBox1").hide();
			});
			/** 2019.10.01[한광희] 일자리추이 설명팝업 닫기. END */
			
			// 업종선택에 따른 사업체, 종사자수, 연봉 정보 가져오기
			$(document).on("change", "#statsAnalsSelectTypeOfIndustry", function() {
				var item = $('.on').attr('id');
				
				if(item == 'I3201_T1'){
					item = 'T1';
					$statsAnlsMap.ui.statsAnalsMapDataCount(item);
				} else if(item == 'I3201_T2'){
					item = 'T2';
					$statsAnlsMap.ui.statsAnalsMapDataCount(item);
				} else if(item == 'annualSalary'){
					var item2 = $('.on1').attr('id');
					$statsAnlsMap.ui.statsAnalsAnnualSalary(item2);
				}
			});
			
			// 업종(중분류)선택에 따른 일자리추이 정보 가져오기
			$(document).on("change", "#statsAnalsSelectTypeOfIndustryMiddleClassification", function() {
				$statsAnlsMap.ui.statsAnalsJobTransition();
			});
			
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
			// 규모선택에 따른 종사자 규모별 소득현황 정보 가져오기
			$(document).on("change", "#statsAnalsSelectEnfsn", function() {
				$statsAnlsMap.ui.statsAnalsEnfsnIncomeSttus('E3501');
			});
			/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
									
			// 통계그래프 버튼 스와이프 기능 STRAT
			$("#statsAnlsChartDiv").swipe({
				threshold : 10,
				// 펼치기
				swipeUp:function(event, direction) {
					$statsAnlsMap.ui.statsAnlsChart();
				},
				// 버튼 클릭
				tap:function(event, target) {
					srvLogWrite('M0','11','03','00','통계그래프 On',''); // 통계 정보 선택(On)
					$statsAnlsMap.ui.statsAnlsChart();
				}
			});			
			$("#statsGraphWrapDiv").swipe({
				threshold : 10,
				// 접기
				swipeDown:function(event, direction) {
					$("#statsGraphWrapDiv").hide();	// 차트 숨김
				},
				// 닫기 버튼 클릭
				tap:function(event, target) {
					var lvThis = $(target);
					var lvThisId = lvThis.attr("id");
					if(lvThisId == "statsAnlsChartClose") {
						srvLogWrite('M0','11','03','00','통계그래프 Off',''); // 통계 정보 선택(Off)
						$("#statsGraphWrapDiv").attr('style', 'display: none;');	// 차트 숨김
					}
				}
			});
			// 통계그래프 버튼 스와이프 기능 END
		},
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($(".Wrap>.Header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}
	};
	
	
}(window, document));