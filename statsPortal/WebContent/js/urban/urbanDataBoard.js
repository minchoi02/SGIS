/**
 * 도시화 분석 지도 데이터보드에 대한 클래스
 *
 * history : 2021/11/08 초기 작성 version : 1.0 see :
 *
 */
(function(W, D) {
	W.$urbanDataBoard = W.$urbanDataBoard || {};

	$(document).ready(
		function() {

			$urbanDataBoard.event.setUIEvent();

			//2022 SGIS5 추가 
			$(".tab_content").hide();

			// 첫번째 탭콘텐츠 보이기
			$(".tab_container").each(function () {
			  $(this).children(".tabs li:first").addClass("active"); //Activate first tab
			  $(this).children(".tab_content").first().show();
			});
			//탭메뉴 클릭 이벤트
			$(".tabs li a").click(function () {

			  $(this).parent().siblings("li").removeClass("active");
			  $(this).parent().addClass("active"); $(this).parent().parent().parent().parent().find(".tab_content").hide();
			  var activeTab = $(this).attr("rel");
			   $("#" + activeTab).fadeIn();
			});



	});
	//2022 SGIS5 추가 
	function vaildData(type,data){
		var result;
		var areaResult =[];
		var areaResult2 =[];
		for(var i=0; i<data.length; i++){
			if(Object.keys(data[i]) == type){
				var dataSet= data[i];
				result = datasList(dataSet);
			}
		}

		return result;
	}
	//2022 SGIS5 추가 
	function vaildData2(data){
		var result;
		var areaResult =[];
		var areaResult2 =[];
		for(var i in data){
			if(Object.keys(data[i]) =='areaSize'){
				var area = data[i];
				result = areaDataList(area);
			}
		}
		return result;
	}
	//2022 SGIS5 추가 
	function empChartReturn(data){
		if(data){
			console.log(data)
			return data;
		}
	}
	//2022 SGIS5 추가 
	function areaNames(data){
		var result;
		for(var i in data){
			if(Object.keys(data[i]) =='areaSize'){
				result = data[i].areaSize[0].area_nm
			}
		}
		return result;
	}
	//2022 SGIS5 추가 
	function areaDataList(data){
		var dataSet = [];
		 if(Object.keys(data) =='areaSize'){
			// console.log(data)
			// 	if(data.areaSize[0].base_year1)dataSet.push({name :data.areaSize[0].base_year1 , y :data.areaSize[0].area1/1000000  });
			// 	if(data.areaSize[0].base_year2)dataSet.push({name :data.areaSize[0].base_year2 , y :data.areaSize[0].area2/1000000 });
			// 	if(data.areaSize[0].base_year3)dataSet.push({name :data.areaSize[0].base_year3 , y : data.areaSize[0].area3/1000000 });
			// 	if(data.areaSize[0].base_year4)dataSet.push({name :data.areaSize[0].base_year4 , y : data.areaSize[0].area4/1000000 });
			// 	if(data.areaSize[0].base_year5)dataSet.push({name :data.areaSize[0].base_year5 , y : data.areaSize[0].area5/1000000 });
			// 	if(data.areaSize[0].base_year6)dataSet.push({name :data.areaSize[0].base_year6 , y : data.areaSize[0].area6/1000000 });
			// 	if(data.areaSize[0].base_year7)dataSet.push({name :data.areaSize[0].base_year7 , y : data.areaSize[0].area7/1000000 });
			// SGIS5 변경
			if(data.areaSize[0].area){
				for(var i=0; i<data.areaSize.length; i++){
					dataSet.push({name :data.areaSize[i].base_year , y :data.areaSize[i].area/1000000  });
				}	
				for(var i=0; i<dataSet.length; i++){
					if(dataSet[i].y === 0){
						dataSet[i].y = null;
					}
				}
			}
			// SGIS5 변경 끝
			 if(data.areaSize.length >=1 && data.areaSize[0].area_nm){
				for(var i=0; i<data.areaSize.length; i++){
					dataSet.push({name :data.areaSize[i].base_year , y :data.areaSize[i].area_size/1000000  });
					dataSet.sort();
				}
				for(var i=0; i<dataSet.length; i++){
					if(dataSet[i].y === 0 || dataSet[i].y === null ){
						dataSet[i].y = null;
					}
				}
			}

		 }
		 
		 return dataSet;
	}
	//2022 SGIS5 추가 
	function datasList(data){
		var dataList = [];
		 if(Object.keys(data) =='pops'){
			if(data.pops[0] === null || data.pops[0].tot_cnt == 0){
				$urbanDataBoard.ui.clearDatatable('chart2');
			}else{
				dataList.push({name : "0~9세", y : data.pops[0].age_1_cnt});
				dataList.push({name : "10~19세", y : data.pops[0].age_2_cnt});
				dataList.push({name : "20~29세", y : data.pops[0].age_3_cnt});
				dataList.push({name : "30~39세", y : data.pops[0].age_4_cnt});
				dataList.push({name : "40~49세", y : data.pops[0].age_5_cnt});
				dataList.push({name : "50~59세", y : data.pops[0].age_6_cnt});
				dataList.push({name : "60~69세", y : data.pops[0].age_7_cnt});
				dataList.push({name : "70~79세", y : data.pops[0].age_8_cnt});
				dataList.push({name : "80세 이상", y : data.pops[0].age_9_cnt});
			}

		}else if(Object.keys(data) =='family'){
			if(data.family[0] === null || data.family[0].tot_cnt == 0){
				$urbanDataBoard.ui.clearDatatable('chart3');
			}else{
				dataList.push({name : "친족 가구", y : data.family[0].family_3_cnt});
				dataList.push({name : "1인 가구", y : data.family[0].family_1_cnt});
				dataList.push({name : "비친족 가구", y : data.family[0].family_2_cnt});
			}
		} else if(Object.keys(data) =='house'){
			if(data.house[0] === null || data.house[0].tot_cnt == 0){
				$urbanDataBoard.ui.clearDatatable('chart4');
			}else{
				dataList.push({name : "단독주택", y : data.house[0].house_1_cnt});
				dataList.push({name : "아파트", y : data.house[0].house_2_cnt});
				dataList.push({name : "연립주택", y : data.house[0].house_3_cnt});
				dataList.push({name : "다세대주택", y : data.house[0].house_4_cnt});
				dataList.push({name : "비거주용 건물내 주택", y : data.house[0].house_5_cnt});
			}
		}else if(Object.keys(data) =='corp'){
			var colorPalette = ['#D66B44','#ffaa01','#fed747','#D8C8B2','#0B2E5D','#2A7AC1','#7DB6E9','#91e8e1','#CBE9F0','#B82647','#ED5980','#D584B9','#F1B49A','#35908F','#6AB048','#90ed7d','#bdce3b','#6A5BA8','#8085e9','#434348','#7A7D7F'];
			var isRandomColor = false;

//			//사업체&종사자 공통
			var corpDataTemp = deepCopy(data.corp);
			var corpData = [];
			var totCorpCnt = 0;
			var workerData = [];
			var workerChartData = [];
			var totWorkerCnt = 0;
			var clrIdx = 0;

			$.each(corpDataTemp, function(index, item){
				corpData.push({name : item.ksic_nm, y : item.corp_cnt, clr : clrIdx});
				workerData.push({name : item.ksic_nm, y : item.employee_cnt, clr : clrIdx});

				totCorpCnt = totCorpCnt + Number(item.corp_cnt);
				totWorkerCnt = totWorkerCnt + Number(item.employee_cnt);

				clrIdx = clrIdx + 1;
				if(clrIdx === colorPalette.length){
					clrIdx = 0;
				}
			});
			//사업체
			if(isNaN(totCorpCnt)){
				totCorpCnt = 0;
			}
			corpData.sort(function (a, b) {
				return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
			});
			var corpLoopCnt = corpData.length;
			if(totCorpCnt > 0 && corpLoopCnt > 0){

				var corpChartColor = new Array();
				var top3CorpLoopCnt = (corpLoopCnt >= 3) ? 3 : corpLoopCnt;
				var top7CorpLoopCnt = (corpLoopCnt >= 3) ? 3 : corpLoopCnt;		// 7 -> 3
				var top3Corpcnt = 0;
				var top7Corpcnt = 0;

				for(var i=0; i < top7CorpLoopCnt; i++){		// top7 까지만
					if(i < top3CorpLoopCnt){
						// top3 합
						top3Corpcnt += corpData[i].y;
					}
					top7Corpcnt += corpData[i].y;
					dataList.push(corpData[i]);
					if(isRandomColor){
						corpChartColor.push(colorPalette[corpData[i].clr]);
					}else{
						corpChartColor.push(colorPalette[i]);
					}
				}
				if(totCorpCnt < top3Corpcnt){
					// 총합이 탑3합보다 작으면
					totCorpCnt = top3Corpcnt;
				}
				if(totCorpCnt < top7Corpcnt){
					// 총합이 탑7합보다 작으면
					totCorpCnt = top7Corpcnt;
				}

				// top7 나머지
				var etcCorpCnt = totCorpCnt - top7Corpcnt;
				dataList.push({name : '기타 사업체', y : etcCorpCnt});
				corpChartColor.push('#E9E9E9');
			}
			//종사자
			if(isNaN(totWorkerCnt)){
				totWorkerCnt = 0;
			}

			workerData.sort(function (a, b) {
				return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
			});

			var workerLoopCnt = workerData.length;
			if(totWorkerCnt > 0 && workerLoopCnt > 0){

				var workerChartColor = new Array();
				var top3WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;
				var top7WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;		// 7 -> 3
				var top3Workercnt = 0;
				var top7Workercnt = 0;
				for(var i=0; i < top7WorkerLoopCnt; i++){		// top7 까지만
					if(i < top3WorkerLoopCnt){
						// top3 합
						top3Workercnt += workerData[i].y;
					}
					top7Workercnt += workerData[i].y;
					dataList.push(workerData[i]);
					if(isRandomColor){
						workerChartColor.push(colorPalette[workerData[i].clr]);
					}else{
						workerChartColor.push(colorPalette[i]);
					}
				}
				if(totWorkerCnt < top3Workercnt){
					// 총합이 탑3합보다 작으면
					totWorkerCnt = top3Workercnt;
				}
				if(totWorkerCnt < top7Workercnt){
					// 총합이 탑7합보다 작으면
					totWorkerCnt = top7Workercnt;
				}

				// top7 나머지
				var etcWorkerCnt = totWorkerCnt - top7Workercnt;
				dataList.push({name : '기타 사업체', y : etcWorkerCnt});
				workerChartColor.push('#E9E9E9');
				empChartReturn(workerChartData);
			}
		}

		return dataList
	}

	$urbanDataBoard.ui = {

			namespace : "urbanDataBoard",
			idxIdntfrs : ["ppltn_density","avg_age","old_child_ratio","psn_1_family_per","apt_per","new_bild_per","old_bild_per","greens_per"],	//2022 SGIS5 추가 
			idxNms : ["인구 밀도", "평균 나이", "노령화 지수", "1인가구 비율", "아파트 비율","신규건축물비율","노후건축물비율","녹지비율"],	//2022 SGIS5 추가 

			/**
			 *
			 * @name         : initializeUI
			 * @description  : 초기정보를 설정한다.
			 *
			 */
			initializeUI : function(pFlag) {

			},

			/**
			 *
			 * @name         : clearUI
			 * @description  : 화면을 정리한다.
			 *
			 */
			clearUI : function(pFlag) {
				//pFlag: menu01-도시화 통계 데이터보드
				if(pFlag === "menu01"){
					$('.btn-extend-close').trigger('click');

					$urbanDataBoard.ui.clearDataBoardHead();

					var $bowl = $(".extend-data .chk01 .secMem");
					$.each($bowl, function(idx, item){
						$urbanDataBoard.ui.resetM01Board($(item), "B", true, false);
					});
				}

			},

			changeDataBoardView : function(pView) {
				$(".extend-data .chk").hide();
				$(".extend-data ." + pView).show();

				if(pView == "chk02" || pView == "chk05"){
					$(".extend-data .extend-search").addClass("check_search");
				}else{
					$(".extend-data .extend-search").removeClass("check_search");
				}
			},

			/**
			 *
			 * @name         : setDataBoardHead
			 * @description  : 도시화통계 데이터 보드의 헤더정보를 표시한다.
			 *
			 */
			setDataBoardHead : function(pObj, pGb){
				//pGb: A-도시화통계, B-도시화지표분석

				$("#db01_head_year").html($urbanObj.getValueMappedToKey(["base_year"], pObj) + "년");
				var tmpTxt = "";
				var urbanCls = $urbanObj.getValueMappedToKey(["urban_cls_gb"], pObj);
				if(urbanCls == $urbanObj.urbanCls_UN){
					tmpTxt = "";
					//tmpTxt = "UN 도시 분류";
				}else if(urbanCls == $urbanObj.urbanCls_SGIS){
					tmpTxt = "";
					//tmpTxt = "통계청 분류";
				}
				var urbanType = $urbanObj.getValueMappedToKey(["urban_type"], pObj);
				if(urbanType == "01"){
					tmpTxt += "도시";
				}else if(urbanType == "02"){
					tmpTxt += "준도시";
				}

				$("#db01_head_cls").html(tmpTxt);
				$("#db01_head_urbars_nm").html($urbanObj.getValueMappedToKey(["urban_nm"], pObj));
				//2022 SGIS5 추가 
				$("#db01_head_urbars_nm1").html($urbanObj.getValueMappedToKey(["urban_nm"], pObj));
				$("#db01_head_urbars_nm2").html($urbanObj.getValueMappedToKey(["urban_nm"], pObj));

				//하위 행정구역 요청
				if(pGb == "A"){
					$(".comparison-btn").hide();
					$("#db01_head_subRegion").show();
					//2022 SGIS5 추가 
					$urbanMain.ui.reqCommonInfo("subRegion", pObj);
				}else if(pGb == "B"){
					$("#db01_head_subRegion").hide();
					$(".comparison-btn").show();
					/*
					var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
					var urbarsMap = $urbanObj.getUrbanAreasInfo(paramObj);
					if(urbarsMap !== undefined && urbarsMap !== null){
						var dstrctCd = $urbanObj.getValueMappedToKey(["dstrct_lclas_cd"], pObj);
						var urbars = urbarsMap[dstrctCd];

						var urbanId = $urbanObj.getValueMappedToKey(["urban_id"], pObj);
						$urbanDataBoard.ui.setSiblingArea(urbars, urbanId);
					}
					*/
				}
			},

			setDataBoardTab : function(pObj){
				var tmpTxt = "";
				var urbanCls = $urbanObj.getValueMappedToKey(["urban_cls_gb"], pObj);
				if(urbanCls == $urbanObj.urbanCls_UN){
					tmpTxt = "UN 도시 분류";
				}else if(urbanCls == $urbanObj.urbanCls_SGIS){
					tmpTxt = "통계청 분류";
				}

				var urbanType = $urbanObj.getValueMappedToKey(["urban_type"], pObj);
				if(urbanType == "01"){
					tmpTxt += " (도시)";
				}else if(urbanType == "02"){
					tmpTxt += " (준도시)";
				}

				var urbanNm = $urbanObj.getValueMappedToKey(["urban_nm"], pObj);
				var admNm = $urbanObj.getValueMappedToKey(["adm_nm"], pObj);
				var sggNm = $urbanObj.getValueMappedToKey(["sgg_nm"], pObj);

				$(".extend-data .chk02 .chk02_top div:eq(0) > span").html(tmpTxt + '<br>' + urbanNm + '_' + sggNm);
				$(".extend-data .chk02 .chk02_top div:eq(1) > span").html('행정구역<br>' + admNm);
			},

			/**
			 *
			 * @name         : clearDataBoardHead
			 * @description  : 도시화통계 데이터 보드의 헤더정보를 초기화한다.
			 *
			 */
			clearDataBoardHead : function(){
				$("#db01_head_year").html("-----");
				$("#db01_head_cls").html("----------");
				$("#db01_head_urbars_nm").html("-------");
				//2022 SGIS5 추가 
				$('.gps-input').attr('placeholder','');
				$("#db01_head_urbars_nm2").html("-------");
				$("#db01_head_subRegion").empty();
				$("#db01_head_subRegion").html('<option value="" selected>행정구역</option>');
				$("#db01_head_subRegion").hide();
				$(".comparison-btn").hide();
				$(".extend-data .extend-search").removeClass("check_search");
				$(".extend-data .chk").hide();
				$('.orange-btn2').hide();
				$('.green-btn2').hide();
				$('.gray-btn2').hide();
				$('.district-btn').show();


			},

			/**
			 *
			 * @name         : setSubRegion
			 * @description  : 도시화통계 데이터 보드의 헤더정보(하위 시군구)를 표시한다.
			 *
			 */

//			setSubRegion : function(pRes, pOptions){
//				$("#db01_head_subRegion").empty();
//				var htmlString = '<option value="" selected>행정구역</option>';
//
//				var errCd = parseInt(pRes.errCd);
//				if(errCd === 0){
//					var list = pRes.result.list;
//					$.each(list, function(index, item){
//						htmlString += '<option value="' + item.sido_cd + item.sgg_cd + '/' + item.urban_id + '/' + item.base_year + '/' + item.type + '/' + item.x_coor + '/' + item.y_coor + '/' + item.urban_nm + '/' + item.sgg_nm + '">' + item.sido_nm + ' ' + item.sgg_nm + '</option>';
//					});
//				}
//
//				$("#db01_head_subRegion").html(htmlString);
//
//				$("#db01_head_subRegion").trigger("change");
//			},
			//2022 SGIS5 추가 
			setSubRegion : function(pRes, pOptions){
				$("#district .green-box").empty();
				var htmlString = '';

				var errCd = parseInt(pRes.errCd);
				if(errCd === 0){
					var list = pRes.result.list;
					$.each(list, function(index, item){
//						htmlString += '<sapn "' + item.sido_cd + item.sgg_cd + '/' + item.urban_id + '/' + item.base_year + '/' + item.type + '/' + item.x_coor + '/' + item.y_coor + '/' + item.urban_nm + '/' + item.sgg_nm + '">' + item.sido_nm + ' ' + item.sgg_nm + '</span>';
						htmlString += '<ul>';
						htmlString += '<li><a href="#" class="" data-value="' + item.sido_cd + item.sgg_cd + '/' + item.urban_id + '/' + item.base_year + '/' + item.type + '/' + item.x_coor + '/' + item.y_coor + '/' + item.urban_nm + '/' + item.sgg_nm + '">' + item.sido_nm + ' ' + item.sgg_nm + '</a></li>';
						htmlString += '</ul>';
					});
				}

				$("#district .green-box").html(htmlString);

				$("#db01_head_subRegion").trigger("change");
			},

			/**
			 *
			 * @name         : setSiblingArea
			 * @description  : 도시화통계 데이터 보드의 헤더정보(동일 대권역에 속한 도시화 지역 목록)를 표시한다.
			 *
			 */
			/*
			setSiblingArea : function(pList, pExclusion){
				var urbars = pList;
				$("#db01_head_subRegion").empty();
				var htmlString = '<option value="" selected>비교권역</option>';

				if(urbars !== undefined && urbars !== null && urbars.length > 0){
					$.each(urbars, function(index, item){
						if(item.urban_id !== pExclusion){
							var sidoCd = "";
							if(item.sido_cd !== undefined && item.sido_cd !== null){
								sidoCd = item.sido_cd;
							}
							var sggCd = "";
							if(item.sgg_cd !== undefined && item.sgg_cd !== null){
								sggCd = item.sgg_cd;
							}
							var type = "";
							if(item.type !== undefined && item.type !== null){
								type = item.type;
							}
							htmlString += '<option value="' + sidoCd + sggCd + '/' + item.urban_id + '/' + item.base_year + '/' + type + '/' + item.x_coor + '/' + item.y_coor + '/' + item.urban_nm + '">' + item.urban_nm + '</option>';
						}
					});
				}

				$("#db01_head_subRegion").html(htmlString);

				$("#db01_head_subRegion").trigger("change");
			},
			*/

			/**
			 *
			 * @name         : resetM01Board
			 * @description  : 도시화 통계 데이터보드를 정리한다.
			 *
			 */
			resetM01Board : function(pSecEle, pContGb, pIsClear, pIsBlockShow) {
				// pContGb : B-기본 통계, C-세부항목별 통계

				var $bowl = pSecEle;
				if($bowl.length > 0){
					if(pIsClear){
						var $contSec = $bowl.find('.div_basic');
						if($contSec.length > 0){
							var $resetTxtTgt = $contSec.find('[data-reset]');
							$.each($resetTxtTgt, function(index, item){
								$(item).html($(item).attr('data-reset'));
							});

							var $resetChtTgt = $contSec.find('.reset.chart');
							$.each($resetChtTgt, function(index, item){
								if($(item).highcharts() !== undefined && $(item).highcharts() !== null){
									$(item).highcharts().destroy();
								}

								var chtId = $(item).attr('id');
								$urbanDataBoard.ui.createEmptyOnePieChart(chtId);
							});

							var $resetClrTgt = $contSec.find('[data-reset-clr]');
							$.each($resetClrTgt, function(index, item){
								$(item).css("background", $(item).attr('data-reset-clr'));
							});
						}

						var $totSec = $bowl.find('.div_tot');
						if($totSec !== undefined && $totSec !== null && $totSec.length > 0){
							var $resetTxtTgt = $totSec.find('[data-reset]');
							$.each($resetTxtTgt, function(index, item){
								$(item).html($(item).attr('data-reset'));
							});
						}
					}

					if(pIsBlockShow){
						$bowl.find(".div_block").show();
					}else{
						$bowl.find(".div_block").hide();
					}
				}
			},


			/**
			 *
			 * @name         : createOnePieChart
			 * @description  : 파이차트 생성
			 *
			 */
			createOnePieChart : function (target, statData, statColors, pWidth, pHeight) {

				var unitNm = "명";
				if(target.startsWith('family')){
					unitNm = "가구";
				}else if(target.startsWith('house')){
					unitNm = "호";
				}else if(target.startsWith('corp')){
					unitNm = "개";
				}

				$("#"+target).highcharts({
						chart: {
			  				type: 'pie',
			  				spacingTop: 0,
			  				spacingRight: 0,
			  				spacingBottom: 0,
			  				spacingLeft: 0,
			  				width: pWidth,
			  				height: pHeight
			  			},
			  			title: {
			  				text : ''
			  			},
			  			tooltip: {
			  		        pointFormat: '<b>{point.y} ' + unitNm + '</b><br/>{point.percentage:.1f} %'
			  		    },
			  			exporting: {
			  		        enabled: false
			  		    },
			  			plotOptions: {
							pie: {
								allowPointSelect: true,
							    cursor: 'pointer',
							    dataLabels: {
							        enabled: false
							    }
		                   }
		               },
		               series: [{
			  				size: '100%',
			  			    innerSize: '50%',
			  				data: statData,
			  				colors : statColors
			  			}]
					});
			},

			/**
			 *
			 * @name         : createEmptyOnePieChart
			 * @description  : 빈 파이차트 생성
			 *
			 */
			createEmptyOnePieChart : function (targetId) {

				// 기본크기 대상 : familyChart, popCChart, familyCChart, houseCChart
				var chtWidth = 220;
				var chtHeight = 140;
				if(targetId == 'popChart'){
					chtWidth = 140;
				}

				var statData = [];
				var statColors = ['#E9E9E9'];
				statData.push({name : "검색결과 없음", y : 100});

				$("#"+targetId).highcharts({
						chart: {
			  				type: 'pie',
			  				spacingTop: 0,
			  				spacingRight: 0,
			  				spacingBottom: 0,
			  				spacingLeft: 0,
			  				width: chtWidth,
			  				height: chtHeight
			  			},
			  			title: {
			  				text : ''
			  			},
			  			tooltip: {
			  		        pointFormat: ''
			  		    },
			  			exporting: {
			  		        enabled: false
			  		    },
			  			plotOptions: {
							pie: {
								allowPointSelect: true,
							    cursor: 'pointer',
							    dataLabels: {
							        enabled: false
							    }
		                   }
		               },
		               series: [{
			  				size: '100%',
			  			    innerSize: '50%',
			  				data: statData,
			  				colors : statColors
			  			}]
					});
			},
			/*
			 * 	막대 차트
			 */
			//2022 SGIS5 추가 
			columnChart : function (target,namesData ,statData,colorSet) {
				var unitNm ="";
				var formatter ='{point.y}';
				// SGIS5 추가
				let chartFontSize;
				if(target == 'totchart2'){
					chartFontSize =8;
				}else if(target == 'deschart3' || target == 'deschart4'){
					chartFontSize =8;
				}else{
					chartFontSize =8;
				}
				let yAxisPadding = (target == 'totchart2' || target == 'deschart3' || target == 'deschart4') ? 0 : 5;
				
				
				if(target ==='tab1Chart1' || target ==='totchart1' || target ==='deschart1' || target ==='deschart2'){
					unitNm = "㎢";
					formatter = '{point.y:,.0f}';
				}else if(target ==='chart2' || target ==='chart6' || target ==='totchart2' ||
						target ==='totchart6' || target ==='deschart3' || target ==='deschart4' || target ==='deschart11' || target ==='deschart12'){
					unitNm = "명";
					formatter = '{point.y:,.0f}';
				}else if(target ==='chart3' || target ==='totchart3' || target ==='deschart5' || target ==='deschart6'){
					unitNm = "가구";
					formatter = '{point.y:,.0f}';
				}else if(target ==='chart4' || target ==='totchart4' || target ==='deschart7' || target ==='deschart8'){
					unitNm = "호";
					formatter = '{point.y:,.0f}';
				}else if(target ==='chart5' || target ==='totchart5' |target ==='deschart9' || target ==='deschart10'){
					unitNm = "개";
					formatter = '{point.y:,.0f}';
				}

				var list =[];
				if(colorSet)var dataColorSet =colorSet;
				for(var i in statData){
					list.push(statData[i].name)
					if('color' in statData[i]){
						//SGIS5 추가
						statData.splice(i, 1); 
					}
				}
				//SGIS5 추가
				let newArr = list.filter((element) => {					
					return element !== undefined && element !== '';
				});
				
				// 종합통계보기 인구 카테고리 텍스트 변경
				if(target == "totchart2"  || target == 'deschart3' || target == 'deschart4') 	newArr = newArr.map(element => element.replace(" 인구",""));
				// SGIS5 추가 끝
				if(dataColorSet){
					Highcharts.setOptions({
						colors: [dataColorSet],
					});
				}else{
					Highcharts.setOptions({
						colors: ['#F1423E', '#198754'],
					});
				}
				
				$("#"+target).highcharts({
					chart:{
						type:'column',
						//SGIS5 추가
						spacingLeft:0
					},
					title: {
					    text:''
					  },
					  xAxis: {
						// categories:list,
					    categories:newArr, // 변경
						// SGIS5 추가
					    labels: {
					    	rotation: 0,
					    	style: {
					    		fontSize: chartFontSize,
					    		overflow:"justify"
					    	}
					    }
					  },
					  yAxis: [{
						title: {
							text: '',
						},
						pointOnColumn: false,
						showLabel:false,
						showFirstLabel: false,
						labels: {
							enabled : false
						},
						   
					}],
					  tooltip: {
						// pointFormat:namesData+  '{point.y:,.0f}' +unitNm
					        pointFormat:'{point.y:,.0f}' +unitNm //변경 
					    },
					  series:[{
						    data:statData,
						    name : namesData,
						    dataLabels:{
								  allowOverlap: false, //추가
						    	  enabled: true,
						    	  inside: false,
								  shadow: false,
						    	  format: '<b>'+ formatter+'' + unitNm + '</b>',
						    	  color:"#fff",
						    	  textOutline : true,
						    	  style:{
									fontSize:'12px',
									fontWeight: 'normal',
									textShadow :"1px 1px #000, 1px -1px #000, -1px -1px #000, -1px 1px #000",
									//textOutline : "2px #fff",
								  }
						    }
							
						  }],
					});
			},


			/**
			 *
			 * @name         : compareChart
			 * @description  : 비교차트
			 *
			 */
				//2022 SGIS5 추가 
			compareChart : function (target,names1,names2,statData1,statData2) {
				var unitNm ="";
				var formatter ='{point.y}';
				if(target ==='tab1Chart2' || target ==='totchart1' ){
					unitNm = "㎢";
					formatter = '{point.y:,.0f}'; //변경
				}else if(target ==='chart2' || target ==='chart6'){
					unitNm = "명";
					formatter = '{point.y:,.1f}'; // 변경
				}else if(target ==='chart3'){
					unitNm = "가구";
					formatter = '{point.y:,.1f}'; //변경
				}else if(target ==='chart4'){
					unitNm = "호";
					formatter = '{point.y:,.1f}'; //변경
				}else if(target ==='chart5'){
					unitNm = "개";
					formatter = '{point.y:,.1f}'; //변경
				}

				var list =[];
				for(var i in statData1){
					list.push(statData1[i].name)
				}
				Highcharts.setOptions({
					colors: ['#198754', '#868686'],
					lang: {
						thousandsSep: ','
					}
				});


				$("#"+target).highcharts({
					title: {
					    text: ''
					  },
					  xAxis: {
					    categories:list,
					    labels : {
					    	enabled : true,
					    	align: 'center',
				            rotation: 0,
					    }
					    
					  },
					  tooltip: {
					        pointFormat: formatter +unitNm //변경
					    },

					  yAxis: [{
						  pointOnColumn: false,
							showLabel:false,
							showFirstLabel: false,
							labels: {
								enabled : false
							},
							title: {
						      text: ''
						    },
						  /*min:0,
						  gridLineWidth : 0,
						  labels : {
					    		format:'{value:,.0f}'
					    			},
						  startOnTick: false,
				          endOnTick: false,
				          tickInterval: 500,
						  title: {
						      text: ''
						    },
						  showFirstLabel: false*/

					}],
					  labels: {
					    items: [{
					      html: '',
					      style: {
					        left: '50px',
					        top: '18px',
					        color:  'black'
					      }
					    }]
					  },
					  series:[{
						    type: 'column',
						    name: names1,
						    data:statData1,
						    dataLabels:{
						    	allowOverlap: false, //추가
						        enabled : true, //각각의 데이터 값을 나타낼 것인지
						        color:'black', // 데이터 값을 나타낼 때 색
						        format: '<b>'+ formatter+'' + unitNm + '</b>',
						        textOutline : true,
						        style:{
						            fontSize:'12px',
						            textShadow :"1px 1px #fff, 1px -1px #fff, -1px -1px #fff, -1px 1px #fff",
						            //textOutline : "2px #fff",
						            	
						          }
						      }
						  }, {
						    type: 'column',
						    name: names2,
						    data: statData2,
						    dataLabels:{
								allowOverlap: false, //추가
						        enabled : true, //각각의 데이터 값을 나타낼 것인지
						        color:'black', // 데이터 값을 나타낼 때 색
						        textOutline : true,
						        format: '<b>'+ formatter+'' + unitNm + '</b>',
						        style:{
						            fontSize:'12px',
						            textShadow :"1px 1px #fff, 1px -1px #fff, -1px -1px #fff, -1px 1px #fff",
						            textOutline : "2px #fff",
						          }
						      }
						  }]
					});
			},
			/**
			 *
			 * @name         : clearDatatable
			 * @description  : 샘플 비교차트 클리어
			 *
			 */
			//2022 SGIS5 추가 
			clearDatatable : function (target) {
				$("#"+target).highcharts({
						chart: {
			  				spacingBottom: 0,
			  				type: 'column'

			  			},
			  			title: {
			  				text : ''
			  			},
			  			xAxis: {
			  				categories: 'sample'
			  			},
	  		  			yAxis: {
			  				min: 0,
			  	            title: {
			  	                enabled: false
			  	            }
			  			},
	  		  			tooltip: {
			  	            shared: true
			  	        },
			  			legend: {
			  	            enabled: false
			  	        },
			  			exporting: {
			  		        enabled: false
			  		    },
			  		  data: {
			  		    table: ''
			  		  }
					});
			},
			/**
			 *
			 * @name         : compareChart
			 * @description  : 비교차트
			 *
			 */
				//2022 SGIS5 추가 
			dualLineColumnChart : function (target,statYear,statData1,statData2,statData3) {
				var unitNm ="";
				var formatter ='{point.y}';
				if(target ==='chart2' || target ==='chart4' || target ==='totCompIndexesChart3' ||  target ==='totCompIndexesChart1' || target ==='totIndexesChart3' || target ==='totIndexesChart1'){
					unitNm = "명";
					formatter = '{point.y:,.1f}'; //변경
				}else if(target ==='chart3' || target === 'totCompIndexesChart2' || target ==='totIndexesChart2'){
					unitNm = "세";
					formatter = '{point.y:,.1f}'; //변경
				}else {
					
					unitNm = "%";
					formatter = '{point.y:,.1f}'; //변경
				}
				function validCheck(){
					if(!statData3){
						return [
							{	type: 'column'
								,name: statData1.name
								,data:statData1.data
								,dataLabels: {
								        enabled: true,
								        inside:true,
								        format: '<b>'+ formatter+'' + unitNm + '</b>',
								        color:  '#fff',
								        textOutline : true,
								        style:{
								        	fontSize:12,
								        	textShadow :"1px 1px #F1423E, 1px -1px #F1423E, -1px -1px #F1423E, -1px 1px #F1423E",
								        	//textOutline : "2px #fff",
								        }
								      }

							}
						   ,{type: 'spline', name: statData2.name,data: statData2.data, dataLabels: {
						        enabled: true,
						        allowOverlap: false,
						        format: '<b>'+ formatter+'' + unitNm + '</b>',
						        color:  '#fff',
						        //textOutline : "2px #fff",
						        /*borderRadius: 5,
				                backgroundColor: 'rgba(179, 191, 202, 0.7)',
				                borderWidth: 1,
				                borderColor: '#AAA',
				                y: -10,*/
						        //textOutline : true,
						        style:{
						        	fontSize:12,
						        	textShadow :"1px 1px #6C8DA7, 1px -1px #6C8DA7, -1px -1px #6C8DA7, -1px 1px #6C8DA7",
						        	//textOutline : "2px #fff",
						        }
						      }}
						   ]
					}else{
						return [
							{type: 'column',name: statData1.name,data:statData1.data, dataLabels: {
								allowOverlap: false,
						        enabled: true,
						        inside:true,
								// crop:false,
								// overflow:'justify',													
						        format: '<b>'+ formatter+'' + unitNm + '</b>',
						        color:'#fff',
						        //textOutline : true,
						        style:{
						        	fontSize:'12px',
						        	textShadow :"1px 1px #F1423E, 1px -1px #F1423E, -1px -1px #F1423E, -1px 1px #F1423E",
						        	//textOutline : "2px #fff",
						        }
						      }}
							,{type: 'column', name: statData2.name,data:statData2.data, dataLabels: {
								allowOverlap: false,
						        enabled: true,
						        inside:true,
						        format: '<b>'+ formatter+'' + unitNm + '</b>',
						        color:'#fff',
						        //textOutline : true,
						        style:{
						        	fontSize:'12px',
						        	textShadow :"1px 1px #272F4B, 1px -1px #272F4B, -1px -1px #272F4B, -1px 1px #272F4B",
						        	//textOutline : "2px #fff",
						        }
						      }}
							, {type: 'spline',name: statData3.name,data: statData3.data, dataLabels: {
								allowOverlap: false,
						        enabled: true,
						        
						        format: '<b>'+ formatter+'' + unitNm + '</b>',
								//textOutline:2,
						        color:'#fff',
						        //textOutline : "2px #fff",
						        /*borderRadius: 5,
						        backgroundColor: 'rgba(179, 191, 202, 0.7)', 
				                borderWidth: 1,
				                borderColor: '#AAA',
				                y: -10,*/
						        //textOutline : true,
						        style:{
						        	fontSize:'12px',
						        	textShadow :"1px 1px #6C8DA7, 1px -1px #6C8DA7, -1px -1px #6C8DA7, -1px 1px #6C8DA7",
						        	//textOutline : "2px #fff",
						        }
						      }
						}]
					}
				}
				if(!statData3){
					Highcharts.setOptions({
						colors: [statData1.color, statData2.color],
					});
				}else{
					Highcharts.setOptions({
						colors: [statData1.color,statData2.color,statData3.color],
					});
				}

				$("#"+target).highcharts({
					plotOptions: {
						series: {
							pointWidth: 17,
							pointPadding: 0.55,
						},
					},
					title: {
					    text: ''
					  },
					  xAxis: {
					    categories:statYear
					  },
					  tooltip: {
					        pointFormat: '{point.y:,.1f}' +unitNm //변경
					    },
					  yAxis: [{
						  min:0,
						  gridLineWidth : 0,
						  startOnTick: false,
				          endOnTick: false,
				          labels : {
				        	  enabled : false,
					    		format:'{value:,.0f}'
					    			},
				        //   tickInterval: 1000,
						  title: {
						      text: ''
						    },
						    showFirstLabel: false

					}],
					  labels: {
					    items: [{
					      html: '',
					      style: {
					        left: '50px',
					        top: '18px',
					        color:  'black',
							overfolow:'justify',
							align: 'center'
					      }
					    }]
					  },
					  series : validCheck()
					});
			},

			/**
			 *
			 * @name         : sampleColunmChartClear
			 * @description  : 샘플 막대차트 클리어
			 *
			 */
				//2022 SGIS5 추가 
			sampleColunmChartClear : function (target) {
				$("#"+target).highcharts({
						chart: {
			  				spacingBottom: 0,
			  				type: 'column'

			  			},
			  			title: {
			  				text : ''
			  			},
			  			xAxis: {
			  				categories: 'sample'
			  			},
	  		  			yAxis: {
			  				min: 0,
			  	            title: {
			  	                enabled: false
			  	            }
			  			},
	  		  			tooltip: {
			  	            shared: true
			  	        },
			  			legend: {
			  	            enabled: false
			  	        },
			  			exporting: {
			  		        enabled: false
			  		    },

					});
			},

			/**
			 *
			 * @name         : createLineChart
			 * @description  : 라인차트 생성
			 *
			 */
				//2022 SGIS5 추가 
			createLineChart : function (target, statYear, statData, pWidth, pHeight) {
				$("#"+target).highcharts({
						chart: {
			  				spacingBottom: 0,
			  				width: pWidth,
			  				height: pHeight
			  			},
			  			title: {
			  				text : ''
			  			},
			  			xAxis: {
			  				categories: statYear
			  			},
	  		  			yAxis: {
			  				min: 0,
			  	            title: {
			  	                enabled: false
			  	            }
			  			},
	  		  			tooltip: {
			  	            shared: true
			  	        },
			  			legend: {
			  	            enabled: false
			  	        },
			  			exporting: {
			  		        enabled: false
			  		    },
			  		    series: statData
					});
			},

			/**
			 *
			 * @name         : reqUrbarsStatistics
			 * @description  : 도시화지역 통계정보 요청
			 *
			 */
			
			reqUrbarsStatistics : function(pObj, pCategory, pWorkGb) {
				// pCategory: 0-전체, 1-인구/가구/주택, 2-사업체/종사자
				// pWorkGb: T-도시화지역, C-행정구역 선택 시(비교)
				if(pWorkGb === "T"){
					$urbanObj.setStatsParamInfo(pObj);
				}

				var param = pObj;
				if(!param){
					param = {};
				}
				param.class_deg = $urbanMain.ui.classDeg;

				var remainCnt = 1;
				if(pCategory === '0'){
					if(pWorkGb === "T"){
						remainCnt = 4;
					}else if(pWorkGb === "C"){
						remainCnt = 10;
					}
				}else if(pCategory === '1'){
					if(pWorkGb === "T"){
						remainCnt = 3;
					}else if(pWorkGb === "C"){
						remainCnt = 6;
					}
				}else if(pCategory === '2'){
					if(pWorkGb === "C"){
						remainCnt = 2;
					}
				}
				$urbanMask.startProcess(remainCnt, param);

				var options;
				if(pCategory === '0' && pWorkGb === "C"){
					param.work_gb = "areaSize";
					param.comparison_gb = "CT1";
					options = $urbanMain.ui.reqSetParams("API_202173", param);
					$urbanMain.ui.requestOpenApi(options);

					param.comparison_gb = "CT2";
					options = $urbanMain.ui.reqSetParams("API_202173", param);
					$urbanMain.ui.requestOpenApi(options);
				}

				if(pCategory === '1' || pCategory === '0'){
					if(pWorkGb === "T"){
						param.comparison_gb = "";
						param.work_gb = "areaSize";	//2022 SGIS5 추가 
						options = $urbanMain.ui.reqSetParams("API_202173", param);	//2022 SGIS5 추가 
						$urbanMain.ui.requestOpenApi(options);	//2022 SGIS5 추가 
						//인구
						param.work_gb = "pops";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						//가구
						param.work_gb = "family";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						//주택
						param.work_gb = "house";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);
					}else if(pWorkGb === "C"){
						//인구
						param.work_gb = "pops";
						param.comparison_gb = "CT1";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						param.comparison_gb = "CT2";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						//가구
						param.work_gb = "family";
						param.comparison_gb = "CT1";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						param.comparison_gb = "CT2";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						//주택
						param.work_gb = "house";
						param.comparison_gb = "CT1";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						param.comparison_gb = "CT2";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);
					}
				}

				if(pCategory === '2' || pCategory === '0'){
					if(pWorkGb === "T"){
						param.work_gb = "corp";
						param.comparison_gb = "";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);
					}else if(pWorkGb === "C"){
						param.work_gb = "corp";
						param.comparison_gb = "CT1";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);

						param.comparison_gb = "CT2";
						options = $urbanMain.ui.reqSetParams("API_202173", param);
						$urbanMain.ui.requestOpenApi(options);
					}
				}
			},

			/**
			 *
			 * @name         : setUrbarsStatistics
			 * @description  : 도시화지역 통계정보 처리
			 *
			 */
			setUrbarsStatistics : function(pRes, pOptions) {
				var discriptNm = $('#db01_head_urbars_nm').text();	//2022 SGIS5 추가 
				var result = pRes.result;
				var params = pOptions.params;
				var $bowl;
				var viewClsGb = "chk01";	//기본값
				var viewSubClsGb = "";		//기본값
				var idSuffix = "";			//기본값
				var comparisonGb = params["comparison_gb"];
				var databordColor;	//2022 SGIS5 추가 
				var selectTyBox = $('#urban_ty_box_1 li.active');	//2022 SGIS5 추가 
				if(comparisonGb == "CT1" || comparisonGb == "CT2"){
					viewClsGb = "chk02";
					viewSubClsGb = ".sec" + comparisonGb;
					idSuffix = comparisonGb;
				}

				if(params.work_gb == "areaSize"){
						//2022 SGIS5 추가 
					var areaSize = $('.menu-list2 a.active');
					var areaList = [];
					$('.div_basic').empty();
					var stHtml  ='<div class="div_basic">';
						stHtml +='<div class="graph_bg un_shape">';
						if($(selectTyBox).attr('data-urbar-type') ==='02'){
							stHtml +='<img src="/images/urban/shape02_yellow.png">';
							$('.sec01 #sec01AreaSize').empty();
							$('.popup_con01 .graph_bg').html('<img src="/images/urban/shape02_yellow.png"><span id="sec01AreaSize" data-reset="00.00 ㎢">'+(Number($(areaSize).attr('data-urban-area')) / 1000000) + " ㎢"+'</span>');
						}else{
							stHtml +='<img src="/images/urban/shape02_red.png">';
							$('.popup_con01 .graph_bg').html('<img src="/images/urban/shape02_red.png"><span id="sec01AreaSize" data-reset="00.00 ㎢">'+(Number($(areaSize).attr('data-urban-area')) / 1000000) + " ㎢"+'</span>');
						}
						
						stHtml +='<span id="sec01AreaSize" data-reset="00.00 ㎢">'+(Number($(areaSize).attr('data-urban-area')) / 1000000) + " ㎢"+'</span>';
//						stHtml +='<span id="sec01AreaSize" data-reset="00.00 ㎢">'+$urbanMain.ui.comma((Number($(areaSize).attr('data-urban-area')) / 1000000).toFixed(2)) + " ㎢"+'</span>';
						stHtml +='</div>';
						stHtml +='<div id="tab1Chart1" style="width:900px; height:150px">';
						stHtml +='</div>';
						stHtml +='</div>';
						$('#tab1').html(stHtml);
						// SGIS5 추가
						for (var i = 0; i < result.areaSize.length; i++){
							areaList.push({name :result.areaSize[i].base_year , y :result.areaSize[i].area/1000000 });
						}
						// for(var i=0; i<areaList.length; i++){
						// 	if(areaList[i].y === 0){
						// 		areaList[i].y = null;
						// 	}
						// }
						// SGIS5 추가 끝

						// if(result.areaSize[0].base_year1)
						// if(result.areaSize[0].base_year2)areaList.push({name :result.areaSize[0].base_year2 , y :result.areaSize[0].area2/1000000  });
						// if(result.areaSize[0].base_year3)areaList.push({name :result.areaSize[0].base_year3 , y : result.areaSize[0].area3/1000000 });
						// if(result.areaSize[0].base_year4)areaList.push({name :result.areaSize[0].base_year4 , y : result.areaSize[0].area4/1000000 });
						// if(result.areaSize[0].base_year5)areaList.push({name :result.areaSize[0].base_year5 , y : result.areaSize[0].area5/1000000 });
						// if(result.areaSize[0].base_year6)areaList.push({name :result.areaSize[0].base_year6 , y : result.areaSize[0].area6/1000000 });
						// if(result.areaSize[0].base_year7)areaList.push({name :result.areaSize[0].base_year7 , y : result.areaSize[0].area7/1000000 });
						if($(selectTyBox).attr('data-urbar-type') ==='02'){
							databordColor = "#FFD050";
						}
						// areaList.reverse();
						$urbanDataBoard.ui.columnChart('tab1Chart1',discriptNm,areaList,databordColor);
						
						$urbanDataBoard.ui.columnChart('totchart1',discriptNm,areaList,databordColor);
						//2022 SGIS5 추가  끝


//					var svgPath=$('.sop-overlay-pane').find('.sop-zoom-animated').find('.sop-interactive');
//					$.each(svgPath,function(index,item){
//						if($(item).attr('fill-opacity')==='0.3'){
//							stHtml +="<div class='area_img'>";
//							stHtml +='<svg pointer-events="none" class="sop-zoom-animated" width="300" height="200" viewBox="452 -89 1015 1070" style="transform: translate3d(452px, -89px, 0px);">';
//							stHtml +="<path d='"+$(this).attr('d')+"' />";
//							stHtml +="</svg>"
//							stHtml +="</div>";
//							$('#tab1').html(stHtml)
//						}
//
//					})

					$bowl = $(".extend-data ." + viewClsGb + " .sec01" + viewSubClsGb);
//					if(result.areaSize[0] === null || result.areaSize[0].area_size == 0){
//
//						$urbanDataBoard.ui.resetM01Board($bowl, "B", true, true);
//					}else{
//
//						var areaList = [];

//						$("#sec01AreaSize" + idSuffix).html($urbanMain.ui.comma((Number(result.areaSize[0].area_size) / 1000000).toFixed(2)) + " ㎢");
//						$("#sec01AreaTxt" + idSuffix).html(result.areaSize[0].area_nm + ' 기준');
//						areaList.push({name :result.areaSize[0].base_year1 , y :result.areaSize[0].area1/1000 });
//						areaList.push({name :result.areaSize[0].base_year2 , y :result.areaSize[0].area2/1000  });
//						areaList.push({name :result.areaSize[0].base_year3 , y : result.areaSize[0].area3/1000 });
//						areaList.push({name :result.areaSize[0].base_year4 , y : result.areaSize[0].area4/1000 });
//						areaList.push({name :result.areaSize[0].base_year5 , y : result.areaSize[0].area5/1000 });
//						areaList.push({name :result.areaSize[0].base_year6 , y : result.areaSize[0].area6/1000 });
//						$urbanDataBoard.ui.columnChart('chart1',titleList[0],discriptNm,areaList);
//					}
				}

				if(params.work_gb == "pops"){
					$bowl = $(".extend-data ." + viewClsGb + " .sec02" + viewSubClsGb);

					if(result.pops[0] === null || result.pops[0].tot_cnt == 0){
						$("#manPerBar" + idSuffix).css("height", "100%");
						$("#womanPerBar" + idSuffix).css("height", "86%");
						$urbanDataBoard.ui.resetM01Board($bowl, "B", true, true);
					}else{
						$bowl.find(".div_block").hide();

						//인구 - 차트
						var popsData = [];
						var popsColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0'];
						popsData.push({name : "0~9세", y : result.pops[0].age_1_cnt});
						popsData.push({name : "10~19세", y : result.pops[0].age_2_cnt});
						popsData.push({name : "20~29세", y : result.pops[0].age_3_cnt});
						popsData.push({name : "30~39세", y : result.pops[0].age_4_cnt});
						popsData.push({name : "40~49세", y : result.pops[0].age_5_cnt});
						popsData.push({name : "50~59세", y : result.pops[0].age_6_cnt});
						popsData.push({name : "60~69세", y : result.pops[0].age_7_cnt});
						popsData.push({name : "70~79세", y : result.pops[0].age_8_cnt});
						popsData.push({name : "80세 이상", y : result.pops[0].age_9_cnt});
						
						//2022 SGIS5 추가 
						if($(selectTyBox).attr('data-urbar-type') ==='02'){
							databordColor = "#FFD050";
						}
						$urbanDataBoard.ui.columnChart('totchart2',discriptNm,popsData,databordColor);
						$urbanDataBoard.ui.columnChart('chart2',discriptNm,popsData,databordColor);
						//2022 SGIS5 추가 

						//인구 - 텍스트
						var totPpltnCnt = result.pops[0].tot_cnt;
						var popsArray = [result.pops[0].age_1_cnt, result.pops[0].age_2_cnt, result.pops[0].age_3_cnt, result.pops[0].age_4_cnt, result.pops[0].age_5_cnt,
							result.pops[0].age_6_cnt,result.pops[0].age_7_cnt, result.pops[0].age_8_cnt, result.pops[0].age_9_cnt];
						var maxPop = Math.max.apply(null, popsArray); //최대값
						var perPop = (maxPop / totPpltnCnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perPop)){
							perPop = 0;
						}
						var perPopTxt = "";
						$.each(popsData, function(index, item){
							if(item.y == maxPop){
								perPopTxt = item.name;
							}
						});
						$("#totPops" + idSuffix).html($urbanMain.ui.comma(totPpltnCnt) + '<span class="sa_txt04">명</span>');
						$("#totPops" + idSuffix).attr('data-total', totPpltnCnt);
						$("#perPopTxt" + idSuffix).html('전체 인구 중 '+ perPopTxt);
						$("#perPop" + idSuffix).html($urbanMain.ui.comma(maxPop)+'명');

						var manCnt = result.pops[0].man_cnt;
						var womanCnt = result.pops[0].woman_cnt;
						$("#manTtlCnt" + idSuffix).html($urbanMain.ui.comma(manCnt) + "명");
						$("#womanTtlCnt" + idSuffix).html($urbanMain.ui.comma(womanCnt) + "명");

						// 전체 인구에 대한 남여 인구 비율
						var manPer = (manCnt / totPpltnCnt * 100).toFixed(2);
						var womanPer = (womanCnt / totPpltnCnt * 100).toFixed(2);
						if((manPer + womanPer) > 100){
							if(manPer > womanPer){
								womanPer = womanPer - ((manPer + womanPer) - 100);
							}else if(womanPer > manPer){
								manPer = manPer - ((manPer + womanPer) - 100);
							}
						}
						$("#manPer" + idSuffix).html(manPer + '%');
						$("#womanPer" + idSuffix).html(womanPer + '%');

						if(manCnt > womanCnt){
							$("#manPerBar" + idSuffix).css("height", "100%");
							$("#womanPerBar" + idSuffix).css("height", (womanCnt / manCnt * 100).toFixed(0) + "%");
						}else if(manCnt < womanCnt){
							$("#manPerBar" + idSuffix).css("height", (manCnt / womanCnt * 100).toFixed(0) + "%");
							$("#womanPerBar" + idSuffix).css("height", "100%");
						}else{
							$("#manPerBar" + idSuffix).css("height", "100%");
							$("#womanPerBar" + idSuffix).css("height", "100%");
						}

						$("#popBaseYear" + idSuffix).html('(' + params.base_year + '년 기준)');
					}
				}

				if(params.work_gb == "family"){
					$bowl = $(".extend-data ." + viewClsGb + " .sec03" + viewSubClsGb);

					if(result.family[0] === null || result.family[0].tot_cnt == 0){
						$urbanDataBoard.ui.resetM01Board($bowl, "B", true, true);
					}else{
						$bowl.find(".div_block").hide();

						//가구 - 차트
						var familyData = [];
						var familyColor = ['#ED5980', '#ffaa01', '#7DB6E9'];
						familyData.push({name : "친족 가구", y : result.family[0].family_3_cnt});
						familyData.push({name : "1인 가구", y : result.family[0].family_1_cnt});
						familyData.push({name : "비친족 가구", y : result.family[0].family_2_cnt});
						
						//2022 SGIS5 추가 
						if($(selectTyBox).attr('data-urbar-type') ==='02'){
							databordColor = "#FFD050";
						}
//						$urbanDataBoard.ui.createOnePieChart(('totchart3' + idSuffix), familyData, familyColor, 220, 140);
						$urbanDataBoard.ui.columnChart('chart3',discriptNm,familyData,databordColor);	//2022 SGIS5 추가 
						$urbanDataBoard.ui.columnChart('totchart3',discriptNm,familyData,databordColor);	//2022 SGIS5 추가 



						//가구 - 텍스트
						var familyArray = [result.family[0].family_1_cnt, result.family[0].family_2_cnt, result.family[0].family_3_cnt];
						var maxfamily = Math.max.apply(null, familyArray); //최대값
						var perfamily = (maxfamily / result.family[0].tot_cnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perfamily)){
							perfamily = 0;
						}
						var perfamilyTxt = "";
						$.each(familyData, function(index, item){
							if(item.y == maxfamily){
								perfamilyTxt = item.name;
							}
						});

						$("#totFamily" + idSuffix).html($urbanMain.ui.comma(result.family[0].tot_cnt) + '<span class="sa_txt04">가구</span>');
						$("#totFamily" + idSuffix).attr('data-total', result.family[0].tot_cnt);
						$("#perFamilyTxt" + idSuffix).html('전체 가구 중 '+perfamilyTxt);
						$("#perFamily" + idSuffix).html($urbanMain.ui.comma(maxfamily)+'가구');
						$("#familyBaseYear" + idSuffix).html('(' + params.base_year + '년 기준)');
					}
				}

				if(params.work_gb == "house"){
					$bowl = $( viewClsGb + ".sec04" + viewSubClsGb);

					if(result.house[0] === null || result.house[0].tot_cnt == 0){
						$urbanDataBoard.ui.resetM01Board($bowl, "B", true, true);
					}else{
						$bowl.find(".div_block").hide();

						//주택 - 차트
						var houseData = [];
						var houseColor = ['#7DB6E9','#ffaa01','#93EC85','#fed747', '#35908F'];		// 주택이외의 거처: #ED5980
						houseData.push({name : "단독주택", y : result.house[0].house_1_cnt});
						houseData.push({name : "아파트", y : result.house[0].house_2_cnt});
						houseData.push({name : "연립주택", y : result.house[0].house_3_cnt});
						houseData.push({name : "다세대주택", y : result.house[0].house_4_cnt});
						houseData.push({name : "비거주용 건물내 주택", y : result.house[0].house_5_cnt});

						//2022 SGIS5 추가 
						if($(selectTyBox).attr('data-urbar-type') ==='02'){
							databordColor = "#FFD050";
						}
//						$urbanDataBoard.ui.createOnePieChart(('totchart4'  + idSuffix), houseData, houseColor, 220, 140);
						$urbanDataBoard.ui.columnChart('chart4',discriptNm,houseData,databordColor);	//2022 SGIS5 추가 
						$urbanDataBoard.ui.columnChart('totchart4',discriptNm,houseData,databordColor);	//2022 SGIS5 추가 


						//주택 - 텍스트
						var houseArray = [result.house[0].house_1_cnt, result.house[0].house_2_cnt, result.house[0].house_3_cnt,
							result.house[0].house_4_cnt, result.house[0].house_5_cnt];		// result.house[0].house_6_cnt
						var maxhouse = Math.max.apply(null, houseArray); //최대값
						var perhouse = (maxhouse / result.house[0].tot_cnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perhouse)){
							perhouse = 0;
						}
						var perhouseTxt = "";
						$.each(houseData, function(index, item){
							if(item.y == maxhouse){
								perhouseTxt = item.name;
							}
						});

						$("#totHouse" + idSuffix).html($urbanMain.ui.comma(result.house[0].tot_cnt) + '<span class="sa_txt04">호</span>');
						$("#totHouse" + idSuffix).attr('data-total', result.house[0].tot_cnt);
						$("#perHouseTxt" + idSuffix).html('전체 주택 중 '+perhouseTxt);
						$("#perHouse" + idSuffix).html($urbanMain.ui.comma(maxhouse)+'호');
						$("#houseBaseYear" + idSuffix).html('(' + params.base_year + '년 기준)');
					}
				}

				if(params.work_gb == "corp"){

					var colorPalette = ['#D66B44','#ffaa01','#fed747','#D8C8B2','#0B2E5D','#2A7AC1','#7DB6E9','#91e8e1','#CBE9F0','#B82647','#ED5980','#D584B9','#F1B49A','#35908F','#6AB048','#90ed7d','#bdce3b','#6A5BA8','#8085e9','#434348','#7A7D7F'];
					var isRandomColor = false;

					//사업체&종사자 공통
					var corpDataTemp = deepCopy(result.corp);
					var corpData = [];
					var corpChartData = [];
					var totCorpCnt = 0;
					var workerData = [];
					var workerChartData = [];
					var totWorkerCnt = 0;
					var clrIdx = 0;

					$.each(corpDataTemp, function(index, item){
						corpData.push({name : item.ksic_nm, y : item.corp_cnt, clr : clrIdx});
						workerData.push({name : item.ksic_nm, y : item.employee_cnt, clr : clrIdx});

						totCorpCnt = totCorpCnt + Number(item.corp_cnt);
						totWorkerCnt = totWorkerCnt + Number(item.employee_cnt);

						clrIdx = clrIdx + 1;
						if(clrIdx === colorPalette.length){
							clrIdx = 0;
						}
					});

					//사업체
					if(isNaN(totCorpCnt)){
						totCorpCnt = 0;
					}
					corpData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
					});


					// $bowl = $(".extend-data ." + viewClsGb + " .sec05" + viewSubClsGb);
					$bowl = $(viewClsGb + " .sec05" + viewSubClsGb);	//2022 SGIS5 추가 
					var corpLoopCnt = corpData.length;
					if(totCorpCnt > 0 && corpLoopCnt > 0){
						$bowl.find(".div_block").hide();
						$bowl.show();

						var corpChartColor = new Array();
						var top3CorpLoopCnt = (corpLoopCnt >= 3) ? 3 : corpLoopCnt;
						var top7CorpLoopCnt = (corpLoopCnt >= 3) ? 3 : corpLoopCnt;		// 7 -> 3
						var top3Corpcnt = 0;
						var top7Corpcnt = 0;
						for(var i=0; i < top7CorpLoopCnt; i++){		// top7 까지만
							if(i < top3CorpLoopCnt){
								// top3 합
								top3Corpcnt += corpData[i].y;
							}
							top7Corpcnt += corpData[i].y;
							corpChartData.push(corpData[i]);
							//2022 SGIS5 추가 
							if($(selectTyBox).attr('data-urbar-type') ==='02'){
								databordColor = "#FFD050";
							}
							if(isRandomColor){
								corpChartColor.push(colorPalette[corpData[i].clr]);
							}else{
								corpChartColor.push(colorPalette[i]);
							}
						}
						if(totCorpCnt < top3Corpcnt){
							// 총합이 탑3합보다 작으면
							totCorpCnt = top3Corpcnt;
						}
						if(totCorpCnt < top7Corpcnt){
							// 총합이 탑7합보다 작으면
							totCorpCnt = top7Corpcnt;
						}

						// top7 나머지
						var etcCorpCnt = totCorpCnt - top7Corpcnt;
						corpChartData.push({name : '기타 사업체', y : etcCorpCnt});
						corpChartColor.push('#E9E9E9');
//						$urbanDataBoard.ui.createOnePieChart(('totchart5' + idSuffix), corpChartData, corpChartColor, 220, 140);
						$urbanDataBoard.ui.columnChart('chart5',discriptNm,corpChartData,databordColor);	//2022 SGIS5 추가
						$('#topCorp1').css('display','block');	//2022 SGIS5 추가
						$urbanDataBoard.ui.columnChart('totchart5',discriptNm,corpChartData,databordColor);	//2022 SGIS5 추가



						// top3 범례 문구
						var perTotCorp, perCorp, eleCorp;
						var $corpLgnd = $bowl.find(".div_basic .txt_box03");
						for(var i=0; i < 3; i++){
							eleCorp = "top" + (i+1) + "_corp_txt" + idSuffix;
							if(i < top3CorpLoopCnt){
								perTotCorp = (corpData[i].y / totCorpCnt  * 100).toFixed(1);
								if(isNaN(perTotCorp) || !isFinite(perTotCorp)){
									perTotCorp = 0;
								}
								perCorp = ( corpData[i].y / top3Corpcnt * 100).toFixed(1);
								if(isNaN(perCorp) || !isFinite(perCorp)){
									perCorp = 0;
								}

								//$("#" + eleCorp).html((i+1) + '. '+ corpData[i].name + ' (전체의 '+perTotCorp+'%, TOP3의 '+perCorp+'%)');
								//$("#" + eleCorp).html((i+1) + '. '+ corpData[i].name + ' (전체 대비 '+perTotCorp+' %)');
								$("#" + eleCorp).html((i+1) + '. '+ corpData[i].name);
								if(isRandomColor){
									$corpLgnd.find('.cr0' + (i+1)).css("background", colorPalette[corpData[i].clr]);
								}else{
									$corpLgnd.find('.cr0' + (i+1)).css("background", colorPalette[i]);
								}
							}else{
								// $("#" + eleCorp).html((i+1) + '. 사업체 통계 없음');
								// $corpLgnd.find('.cr0' + (i+1)).css("background", "#d4d4d4");
							}
						}

						$('.sec05 .basic_chart .left_tit').css('display','block');	//2022 SGIS5 추가
						$("#totCorp" + idSuffix).html($urbanMain.ui.comma(totCorpCnt) + '<span class="sa_txt04">개</span>'); //총사업체수
						$("#totCorp" + idSuffix).attr('data-total', totCorpCnt);
						$("#top3CorpPerAmongAll" + idSuffix).html($urbanMain.ui.comma(top3Corpcnt) + "개");

						$("#corpBaseYear" + idSuffix).html('(' + params.base_year + '년 기준)');
					}else{
						$('#topCorp1').css('display','none');		//2022 SGIS5 추가
						$('.sec05 .basic_chart .left_tit').css('display','none');	//2022 SGIS5 추가
						$urbanDataBoard.ui.clearDatatable('totchart5');	//2022 SGIS5 추가

						// 화면 정리
						$urbanDataBoard.ui.resetM01Board($bowl, "B", true, true);
						$bowl.hide();
					}

					//종사자
					if(isNaN(totWorkerCnt)){
						totWorkerCnt = 0;
					}

					workerData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
					});

					$bowl = $(".extend-data ." + viewClsGb + " .sec06" + viewSubClsGb);
					var workerLoopCnt = workerData.length;
					if(totWorkerCnt > 0 && workerLoopCnt > 0){
						$bowl.find(".div_block").hide();
						$bowl.show();

						var workerChartColor = new Array();
						var top3WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;
						var top7WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;		// 7 -> 3
						var top3Workercnt = 0;
						var top7Workercnt = 0;
						for(var i=0; i < top7WorkerLoopCnt; i++){		// top7 까지만
							if(i < top3WorkerLoopCnt){
								// top3 합
								top3Workercnt += workerData[i].y;
							}
							top7Workercnt += workerData[i].y;
							workerChartData.push(workerData[i]);
							//2022 SGIS5 추가
							if($(selectTyBox).attr('data-urbar-type') ==='02'){
								workerChartData.push({color : "#928BE8"});
							}
							if(isRandomColor){
								workerChartColor.push(colorPalette[workerData[i].clr]);
							}else{
								workerChartColor.push(colorPalette[i]);
							}
						}
						if(totWorkerCnt < top3Workercnt){
							// 총합이 탑3합보다 작으면
							totWorkerCnt = top3Workercnt;
						}
						if(totWorkerCnt < top7Workercnt){
							// 총합이 탑7합보다 작으면
							totWorkerCnt = top7Workercnt;
						}
						//2022 SGIS5 추가
						if($(selectTyBox).attr('data-urbar-type') ==='02'){
							databordColor = "#FFD050";
						}
						// top7 나머지
						var etcWorkerCnt = totWorkerCnt - top7Workercnt;
						workerChartData.push({name : '기타 사업체', y : etcWorkerCnt});
						// workerChartColor.push('#E9E9E9');
						console.log(corpChartData)
//						$urbanDataBoard.ui.createOnePieChart(('totchart6' + idSuffix), workerChartData, workerChartColor, 220, 140);
						$urbanDataBoard.ui.columnChart('chart6',discriptNm,workerChartData,databordColor);	//2022 SGIS5 추가
						$('#topWorker1').css('display','block');	//2022 SGIS5 추가
						$urbanDataBoard.ui.columnChart('totchart6',discriptNm,workerChartData,databordColor);	//2022 SGIS5 추가


						// top3 범례 문구
						var perTotWorker, perWorker, eleWorker;
						var $workerLgnd = $bowl.find(".div_basic .txt_box03");
						for(var i=0; i < 3; i++){
							eleWorker = "top" + (i+1) + "_worker_txt" + idSuffix;
							if(i < top3WorkerLoopCnt){
								perTotWorker = (workerData[i].y / totWorkerCnt  * 100).toFixed(1);
								if(isNaN(perTotWorker) || !isFinite(perTotWorker)){
									perTotWorker = 0;
								}	
								perWorker = ( workerData[i].y / top3Workercnt * 100).toFixed(1);
								if(isNaN(perWorker) || !isFinite(perWorker)){
									perWorker = 0;
								}

//								$(".sec06 .basic_chart .left_tit").html((i+1) + '. '+ workerData[i].name + ' (전체의 '+perTotWorker+'%, TOP3의 '+perWorker+'%)');
//								$(".sec06 .basic_chart .left_tit").html((i+1) + '. '+ workerData[i].name + ' (전체 대비 '+perTotWorker+' %)');
//								$(".sec06 .basic_chart .left_tit").html((i+1) + '. '+ workerData[i].name);
								if(isRandomColor){
									$workerLgnd.find('.cr0' + (i+1)).css("background", colorPalette[workerData[i].clr]);
								}else{
									$workerLgnd.find('.cr0' + (i+1)).css("background", colorPalette[i]);
								}
							}else{
								$(".sec06 .basic_chart .left_tit").html((i+1) + '. 종사자 통계 없음');
								$workerLgnd.find('.cr0' + (i+1)).css("background", "#d4d4d4");
							}
						}

						$('.sec06 .basic_chart .left_tit').css('display','block');	//2022 SGIS5 추가
						$("#totWorker" + idSuffix).html($urbanMain.ui.comma(totWorkerCnt) + '<span class="sa_txt04">명</span>');//총종사자수
						$("#totWorker" + idSuffix).attr('data-total', totWorkerCnt);
						$("#top3WorkerPerAmongAll" + idSuffix).html($urbanMain.ui.comma(top3Workercnt) + "명");

						$("#workerBaseYear" + idSuffix).html('(' + params.base_year + '년 기준)');
					}else{
						// 화면 정리
						$('#topWorker1').css('display','none'); 	//2022 SGIS5 추가
						$('.sec06 .basic_chart .left_tit').css('display','none');	//2022 SGIS5 추가
						$urbanDataBoard.ui.clearDatatable('totchart6');	//2022 SGIS5 추가
						$urbanDataBoard.ui.resetM01Board($bowl, "B", true, true);
						$bowl.hide();
					}
				}
			},
			/**
			 *				
			 * @name         : setUrbarsStatistics
			 * @description  : 도시화지역 통계정보 처리
			 *
			 */
			//2022 SGIS5 추가
			setUrbarsStatistics2 : function(pRes1,pRes2, pOptions) {
				var areaNm1 =$('.menu-list2 a.active').text();
				var areaNm2 =areaNames(pRes2);
				var params = pOptions.params;
				var areaSize =null;
				var areaSize2 =null;
				var selectTyBox = $('#urban_ty_box_1 li.active');
				if(params.work_gb == "areaSize"){
					var areaData1=vaildData2(pRes1)
					var areaData2=vaildData2(pRes2);
					// areaData1.reverse();
					// areaData2.sort();	
					if(areaData1 !=null &&areaData2 !=null){
						areaSize=areaData1[areaData1.length -1].y //변경
						areaSize2=areaData2[areaData2.length -1].y //변경
					}
						$('.div_basic').empty();
						var stHtml  ='<div class="div_basic">';
						stHtml +='<div class="graph_bg">';
//						if($(selectTyBox).attr('data-urbar-type') ==='02'){
//							stHtml +='<img src="/images/urban/shape02_yellow.png" class="areaImgBg2">';
//						}else{
//							stHtml +='<img src="/images/urban/shape02_red.png" class="areaImgBg2">';
//						}
						stHtml +='<img src="/images/urban/shape02.png" class="areaImgBg2">'; //변경
						stHtml +='<span id="areaSizeCT1" data-reset="00.00 ㎢">'+(Number(areaSize)) + " ㎢"+'</span>';
//						stHtml +='<span id="areaSizeCT1" data-reset="00.00 ㎢">'+$urbanMain.ui.comma((Number(areaSize)).toFixed(2)) + " ㎢"+'</span>';
						stHtml +='</div>';
						stHtml +='<div class="graph_bg un_shape">';
						stHtml +='<img src="/images/urban/shape03.png" class="areaImgBg1">';
//						stHtml +='<span id="areaSizeCT2" data-reset="00.00 ㎢">'+(Number(areaSize2)) + " ㎢"+'</span>';
						stHtml +='<span id="areaSizeCT2" data-reset="00.00 ㎢">'+$urbanMain.ui.comma((Number(areaSize2)).toFixed(0)) + " ㎢"+'</span>';
						stHtml +='</div>';
						stHtml +='<div id="tab1Chart2" style="width:780px; height:150px;">';
						stHtml +='</div>';
						stHtml +='</div>';
						$('#tab1').html(stHtml);
						$('.descAreaSize1').html('<span id="sec01AreaSize" data-reset="00.00 ㎢">'+Number(areaSize)+'㎢</span>')
						$('.descAreaSize2').html('<span id="sec01AreaSize" data-reset="00.00 ㎢">'+$urbanMain.ui.comma((Number(areaSize2)).toFixed(0))+'㎢</span>')
				
						$urbanDataBoard.ui.columnChart('tab1Chart2',areaNm1,areaData1,'#198754');
						$urbanDataBoard.ui.columnChart('deschart1',areaNm1,areaData1,'#198754');
						$urbanDataBoard.ui.columnChart('deschart2',areaNm2,areaData2,'#868686');
				}

				if(params.work_gb == "pops"){

					var popsData1=vaildData("pops",pRes1);
					var popsData2=vaildData("pops",pRes2);
					$urbanDataBoard.ui.columnChart('deschart3',areaNm1,popsData1,'#198754');
					$urbanDataBoard.ui.columnChart('deschart4',areaNm2,popsData2,'#868686');
					if(popsData1){
						$urbanDataBoard.ui.clearDatatable('chart2');
						$urbanDataBoard.ui.compareChart('chart2',areaNm1,areaNm2, popsData1,popsData2);
					}else{
						$urbanDataBoard.ui.clearDatatable('chart2');
					}

					var totPpltnCnt;
					var totPpltnCnt2;
					var result;
					var result2;
					for(var i=0; i<pRes1.length; i++){
						if(Object.keys(pRes1[i]) =='pops'){
							result = pRes1[i];
							totPpltnCnt=pRes1[i].pops[0].tot_cnt;
						}
					}
					for(var i=0; i<pRes2.length; i++){
						if(Object.keys(pRes2[i]) =='pops'){
							if(pRes2[i].pops[0] === null){
								totPpltnCnt2=0;
								result2 =[];
							}else{
								result2 =pRes2[i];
								totPpltnCnt2=pRes2[i].pops[0].tot_cnt;
							}
						}
					}
					var popsArray = [result.pops[0].age_1_cnt, result.pops[0].age_2_cnt, result.pops[0].age_3_cnt, result.pops[0].age_4_cnt, result.pops[0].age_5_cnt,
						result.pops[0].age_6_cnt,result.pops[0].age_7_cnt, result.pops[0].age_8_cnt, result.pops[0].age_9_cnt];
						if(result2?.length ===0){
							var popsArray2 = [0, 0,0, 0,0,0,0,0,0];
						}else{
							var popsArray2 = [result2.pops[0].age_1_cnt, result2.pops[0].age_2_cnt, result2.pops[0].age_3_cnt, result2.pops[0].age_4_cnt, result2.pops[0].age_5_cnt,
							result2.pops[0].age_6_cnt,result2.pops[0].age_7_cnt, result2.pops[0].age_8_cnt, result2.pops[0].age_9_cnt];
						}
					var maxPop = Math.max.apply(null, popsArray); //최대값
					var maxPop2 = Math.max.apply(null, popsArray2); //최대값
					var perPop = (maxPop / totPpltnCnt * 100).toFixed(1); //백분율(반올림)
					var perPop2 = (maxPop2 / totPpltnCnt2 * 100).toFixed(1); //백분율(반올림)
					if(isNaN(perPop)){
						perPop = 0;
					}
					if(isNaN(perPop2)){
						perPop2 = 0;
					}
					var perPopTxt = "";
					$.each(popsData1, function(index, item){
						if(item.y == maxPop){
							perPopTxt = item.name;
						}
					});
					var perPopTxt2 = "";
					$.each(popsData2, function(index, item){
						if(item.y == maxPop2){
							perPopTxt2 = item.name;
						}
					});
					$("#perPopTxt1").html('전체 인구 중 '+ perPopTxt);
					$("#perPop1").html($urbanMain.ui.comma(maxPop)+'명');
					$("#cntPops1").html($urbanMain.ui.comma(totPpltnCnt)+'명');
					$("#perPopTxt2").html('전체 인구 중 '+ perPopTxt2);
					$("#perPop2").html($urbanMain.ui.comma(maxPop2)+'명');
					$("#cntPops2").html($urbanMain.ui.comma(totPpltnCnt2)+'명');

				}

				if(params.work_gb == "family"){
					var familyData1=vaildData("family",pRes1);
					var familyData2=vaildData("family",pRes2);
					var result;
					var result2;
					$urbanDataBoard.ui.columnChart('deschart5',areaNm1,familyData1,'#198754');
					$urbanDataBoard.ui.columnChart('deschart6',areaNm2,familyData2,'#868686');
					if(familyData1){
						$urbanDataBoard.ui.clearDatatable('chart3');
						$urbanDataBoard.ui.compareChart('chart3',areaNm1,areaNm2, familyData1,familyData2);
					}else{
						$urbanDataBoard.ui.clearDatatable('chart3');
					}
					//가구 - 텍스트
					for(var i=0; i<pRes1.length; i++){
						if(Object.keys(pRes1[i]) =='family'){
							result = pRes1[i];
						}
					}
					for(var i=0; i<pRes2.length; i++){
						if(Object.keys(pRes2[i]) =='family'){
							if(pRes2[i].family[0] === null){
								result2 =[];
							}else{
								result2 =pRes2[i];
							}
						}
					}
					if(result){
						var familyarray = [result.family[0].family_1_cnt, result.family[0].family_2_cnt, result.family[0].family_3_cnt];
					}
					console.log(familyarray)
					if(result2?.length ===0){
						var familyarray2 = [0,0,0];
					}else{
						var familyarray2 = [result2.family[0].family_1_cnt, result2.family[0].family_2_cnt, result2.family[0].family_3_cnt];
					}
					console.log(familyarray2)
					var maxfamily = Math.max.apply(null, familyarray); //최대값
					var maxfamily2 = Math.max.apply(null, familyarray2); //최대값
					var perfamily = (maxfamily / result.family[0].tot_cnt * 100)
//					var perfamily = (maxfamily / result.family[0].tot_cnt * 100).tofixed(1); //백분율(반올림)
					if(result2?.length ===0){
						var perfamily2 =0;
					}else{
						var perfamily2 = (maxfamily2 / result2.family[0].tot_cnt * 100)						
					}
//					var perfamily2 = (maxfamily2 / result2.family[0].tot_cnt * 100).tofixed(1); //백분율(반올림)
					if(isNaN(perfamily)){
						perfamily = 0;
					}
					if(isNaN(perfamily2)){
						perfamily2 = 0;
					}
					var perfamilytxt = "";
					var perfamilytxt2 = "";

					$.each(familyData1, function(index, item){
						if(item.y == maxfamily){
							perfamilytxt = item.name;
						}
					});
					$.each(familyData2, function(index, item){
						if(item.y == maxfamily2){
							perfamilytxt2 = item.name;
						}
					});
					$("#perFamilyTxt1").html('전체 가구 중 '+perfamilytxt);
					$("#perFamily1").html($urbanMain.ui.comma(result.family[0].tot_cnt) + '<span class="sa_txt04">가구</span>');
					$("#totCntFamily1").html($urbanMain.ui.comma(maxfamily)+'가구');
					$("#perFamilyTxt2").html('전체 가구 중 '+perfamilytxt2);
					if(result2?.length ===0){
						$("#perFamily2").html('0<span class="sa_txt04">가구</span>');
					}else{
						$("#perFamily2").html($urbanMain.ui.comma(result2.family[0].tot_cnt) + '<span class="sa_txt04">가구</span>');
					}
					$("#totCntFamily2").html($urbanMain.ui.comma(maxfamily2)+'가구');


				}

				if(params.work_gb == "house"){
					var houseData1=vaildData("house",pRes1);
					var houseData2=vaildData("house",pRes2);
					var result;
					var result2;

					$urbanDataBoard.ui.columnChart('deschart7',areaNm1,houseData1,'#198754');
					$urbanDataBoard.ui.columnChart('deschart8',areaNm2,houseData2,'#868686');
					if(houseData1){
						$urbanDataBoard.ui.clearDatatable('chart4');
						$urbanDataBoard.ui.compareChart('chart4',areaNm1,areaNm2, houseData1,houseData2);
					}else{
						$urbanDataBoard.ui.clearDatatable('chart4');
					}
					for(var i=0; i<pRes1.length; i++){
						if(Object.keys(pRes1[i]) =='house'){
							result = pRes1[i];
						}
					}
					for(var i=0; i<pRes2.length; i++){
						if(Object.keys(pRes2[i]) =='house'){
							if(pRes2[i].house[0] === null){
								result2 =[];
							}else{
								result2 =pRes2[i];
							}
						}
					}
					var houseArray = [result.house[0].house_1_cnt, result.house[0].house_2_cnt, result.house[0].house_3_cnt,
						result.house[0].house_4_cnt, result.house[0].house_5_cnt];	
						if(result2?.length ===0){
							var houseArray2 = [0,0,0,0,0]		// result.house[0].house_6_cnt;
						}else{
							var houseArray2 = [result2.house[0].house_1_cnt, result2.house[0].house_2_cnt, result2.house[0].house_3_cnt,
							result2.house[0].house_4_cnt, result2.house[0].house_5_cnt];		// result.house[0].house_6_cnt
						}	
					var maxhouse = Math.max.apply(null, houseArray); //최대값
					var maxhouse2 = Math.max.apply(null, houseArray2); //최대값
					var perhouse = (maxhouse / result.house[0].tot_cnt * 100).toFixed(1); //백분율(반올림)
					if(result2?.length ===0){
						var perhouse2 = 0;
					}else{
						var perhouse2 = (maxhouse2 / result2.house[0].tot_cnt * 100).toFixed(1); //백분율(반올림)
					}
					if(isNaN(perhouse)){
						perhouse = 0;
					}
					if(isNaN(perhouse2)){
						perhouse = 0;
					}
					var perhouseTxt = "";
					var perhouseTxt2 = "";
					$.each(houseData1, function(index, item){
						if(item.y == maxhouse){
							perhouseTxt = item.name;
						}
					});
					$.each(houseData2, function(index, item){
						if(item.y == maxhouse){
							perhouseTxt2 = item.name;
						}
					});
					$("#perHouseTxt1").html('전체 주택 중 '+perhouseTxt);
					$("#perHouseTxt2").html('전체 주택 중 '+perhouseTxt2);
					$("#perHouse1").html($urbanMain.ui.comma(result.house[0].tot_cnt) + '<span class="sa_txt04">호</span>');
					if(result2?.length ===0){
						$("#perHouse2").html('0<span class="sa_txt04">호</span>');
					}else{
						$("#perHouse2").html($urbanMain.ui.comma(result2.house[0].tot_cnt) + '<span class="sa_txt04">호</span>');
					}
					$("#totCntHouse1").html($urbanMain.ui.comma(maxhouse)+'호');
					$("#totCntHouse2").html($urbanMain.ui.comma(maxhouse2)+'호');
					}

				if(params.work_gb == "corp"){
					var corpData1 =[];
					var corpData2 =[];
					var empData1 =[];
					var empData2 =[];
					var result;
					var result2;
					for(var i=0; i<pRes1.length; i++){
						if(Object.keys(pRes1[i]) =='corp'){
							if(pRes1[i].corp[0] === null){
								result=[];
							}else{
								result = pRes1[i]
							}
						}
					}
					for(var i=0; i<pRes2.length; i++){
						if(Object.keys(pRes2[i]) =='corp'){
							if(pRes2[i].corp[0] === null){
								result2=[];
							}else{
								result2 = pRes2[i]
							}
						}
					}
					if(result?.length >0 && result2?.length >0){
					}
					var corpDataTemp = deepCopy(result.corp);
					var corpDataTemp2 = deepCopy(result2.corp);
					var totData1=vaildData("corp",pRes1);
					var totData2=vaildData("corp",pRes2);
					var totCorpCnt =0;
					var totWorkerCnt =0;
					var totCorpCnt2 =0;
					var totWorkerCnt2=0;
					$.each(corpDataTemp, function(index, item){
						totCorpCnt = totCorpCnt + Number(item.corp_cnt);
						totWorkerCnt = totWorkerCnt + Number(item.employee_cnt);
					});
					$.each(corpDataTemp2, function(index, item){
						totCorpCnt2 = totCorpCnt2 + Number(item.corp_cnt);
						totWorkerCnt2 = totWorkerCnt2 + Number(item.employee_cnt);
					});
					//사업체
					if(isNaN(totCorpCnt)){
						totCorpCnt = 0;
					}
					if(isNaN(totCorpCnt2)){
						totCorpCnt = 0;
					}
					for(var i in totData1){
						if(i < 4){
							corpData1.push(totData1[i]);
						}else if(i >3){
							empData1.push(totData1[i])
						}
					}
					for(var i in totData2){
						if(i < 4){
							corpData2.push(totData2[i])
						}else if(i >3){
							empData2.push(totData2[i])
						}
					}
					var corpLoopCnt = totData1.length;
					var corpLoopCnt2 = totData2.length;
					if(totCorpCnt > 0 && corpLoopCnt > 0){
						var top3CorpLoopCnt = (corpLoopCnt >= 3) ? 3 : corpLoopCnt;
						var top7CorpLoopCnt = (corpLoopCnt >= 3) ? 3 : corpLoopCnt;		// 7 -> 3
						var top3Corpcnt = 0;
						var top7Corpcnt = 0;
						for(var i=0; i < top7CorpLoopCnt; i++){		// top7 까지만
							if(i < top3CorpLoopCnt){
								// top3 합
								top3Corpcnt += totData1[i].y;
							}
							top7Corpcnt += totData1[i].y;

						}

						if(totCorpCnt < top3Corpcnt){
							// 총합이 탑3합보다 작으면
							totCorpCnt = top3Corpcnt;
						}
						if(totCorpCnt < top7Corpcnt){
							// 총합이 탑7합보다 작으면
							totCorpCnt = top7Corpcnt;
						}
					}
					if(totCorpCnt2 > 0 && corpLoopCnt2 > 0){
						var top3CorpLoopCnt2 = (corpLoopCnt2 >= 3) ? 3 : corpLoopCnt2;
						var top7CorpLoopCnt2 = (corpLoopCnt2 >= 3) ? 3 : corpLoopCnt2;		// 7 -> 3
						var top3Corpcnt2 = 0;
						var top7Corpcnt2 = 0;
						for(var i=0; i < top7CorpLoopCnt2; i++){		// top7 까지만
							if(i < top3CorpLoopCnt2){
								// top3 합
								top3Corpcnt2 += totData2[i].y;
							}
							top7Corpcnt2 += totData2[i].y;
						}
						if(totCorpCnt2 < top3Corpcnt2){
							// 총합이 탑3합보다 작으면
							totCorpCnt2 = top3Corpcnt2;
						}
						if(totCorpCnt2 < top7Corpcnt2){
							// 총합이 탑7합보다 작으면
							totCorpCnt2 = top7Corpcnt2;
						}
					}

					var workerLoopCnt = empData1.length;
					if(totWorkerCnt > 0 && workerLoopCnt > 0){
						var top3WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;
						var top7WorkerLoopCnt = (workerLoopCnt >= 3) ? 3 : workerLoopCnt;		// 7 -> 3
						var top3Workercnt = 0;
						var top7Workercnt = 0;
						for(var i=0; i < top7WorkerLoopCnt; i++){		// top7 까지만
							if(i < top3WorkerLoopCnt){
								// top3 합
								top3Workercnt += empData1[i].y;
							}
							top7Workercnt += empData1[i].y;
						}
						if(totWorkerCnt < top3Workercnt){
							// 총합이 탑3합보다 작으면
							totWorkerCnt = top3Workercnt;
						}
						if(totWorkerCnt < top7Workercnt){
							// 총합이 탑7합보다 작으면
							totWorkerCnt = top7Workercnt;
						}
					}
					var workerLoopCnt2 = empData2.length;
					if(totWorkerCnt2 > 0 && workerLoopCnt2 > 0){
						var top3WorkerLoopCnt2 = (workerLoopCnt2 >= 3) ? 3 : workerLoopCnt2;
						var top7WorkerLoopCnt2 = (workerLoopCnt2 >= 3) ? 3 : workerLoopCnt2;		// 7 -> 3
						var top3Workercnt2 = 0;
						var top7Workercnt2 = 0;
						for(var i=0; i < top7WorkerLoopCnt2; i++){		// top7 까지만
							if(i < top3WorkerLoopCnt2){
								// top3 합
								top3Workercnt2 += empData2[i].y;
							}
							top7Workercnt2 += empData2[i].y;
						}
						if(totWorkerCnt2 < top3Workercnt2){
							// 총합이 탑3합보다 작으면
							totWorkerCnt2 = top3Workercnt2;
						}
						if(totWorkerCnt2 < top7Workercnt2){
							// 총합이 탑7합보다 작으면
							totWorkerCnt2 = top7Workercnt2;
						}
					}
					if(corpData1.length ===0 || corpData2.length ===0){
						$('.totpopup_layer.district ul.popup_con02 > li.sec05').css('display','none');
					}else{
						$('.totpopup_layer.district ul.popup_con02 > li.sec05').css('display','block');
						$urbanDataBoard.ui.columnChart('deschart9',areaNm1,corpData1,'#198754');
						$urbanDataBoard.ui.columnChart('deschart10',areaNm2,corpData2,'#868686');
					}
					if(empData1.length ===0 && empData2.length ===0){
						$('.totpopup_layer.district ul.popup_con02 > li.sec06').css('display','none');
					}else{
						$('.totpopup_layer.district ul.popup_con02 > li.sec06').css('display','block');
						$urbanDataBoard.ui.columnChart('deschart11',areaNm1,empData1,'#198754');
						$urbanDataBoard.ui.columnChart('deschart12',areaNm2,empData2,'#868686');
					}
					$urbanDataBoard.ui.compareChart('chart5',areaNm1,areaNm2, corpData1,corpData2);
					$urbanDataBoard.ui.compareChart('chart6',areaNm1,areaNm2, empData1,empData2);

					$("#allCorp1").html($urbanMain.ui.comma(totCorpCnt) + '<span class="sa_txt04">개</span>'); //총사업체수
					$("#allCorp2").html($urbanMain.ui.comma(totCorpCnt2) + '<span class="sa_txt04">개</span>'); //총사업체수
					$("#allWork1").html($urbanMain.ui.comma(totWorkerCnt) + '<span class="sa_txt04">개</span>'); //종사자수
					$("#allWork2").html($urbanMain.ui.comma(totWorkerCnt2) + '<span class="sa_txt04">개</span>'); //종사자수
					$("#top3CorpPerAmongAll1").html($urbanMain.ui.comma(top3Corpcnt) + "개");
					$("#top3CorpPerAmongAll2").html($urbanMain.ui.comma(top3Corpcnt2) + "개");
					$("#top3WorkerPerAmongAll1").html($urbanMain.ui.comma(top3Workercnt) + "개");
					$("#top3WorkerPerAmongAll2").html($urbanMain.ui.comma(top3Workercnt2) + "개");
				}else{
					$('.totpopup_layer.district ul.popup_con02 > li.sec05').css('display','none');
					$('.totpopup_layer.district ul.popup_con02 > li.sec06').css('display','none');
				}
			},

			/**
			 *
			 * @name         : reqUrbarsIndexes
			 * @description  : 도시화지역 지표 요청
			 *
			 */
			reqUrbarsIndexes : function(pObj, pWorkGb) {
				// pWorkGb: T-도시화지역, C-비교권역 선택 시(비교)

				if(pWorkGb === "T"){
					$urbanObj.setStatsParamInfo(pObj);
				}

				var param = pObj;
				if(!param){
					param = {};
				}

				var remainCnt = 1;
				$urbanMask.startProcess(remainCnt, param);

				var options;

			// 	if(pWorkGb === "T"){
			// 		param.comparison_gb = "";
			// 		options = $urbanMain.ui.reqSetParams("API_202175", param);
			// 		$urbanMain.ui.requestOpenApi(options);
			// 	}else if(pWorkGb === "C"){
			// 		param.comparison_gb = "CT2";
			// 		options = $urbanMain.ui.reqSetParams("API_202175", param);
			// 		$urbanMain.ui.requestOpenApi(options);
			// 	}					
			// },
				// 2022 SGIS5 추가
				if(pWorkGb === "T"){
					param.comparison_gb = "";
					var map = $urbanMain.ui.getMap(0);
					var xCoor =$('.menu-list2 a.active').attr('data-urban-x')
					var yCoor =$('.menu-list2 a.active').attr('data-urban-y')
					map.mapMove([ xCoor, yCoor ], map.zoom);
					options = $urbanMain.ui.reqSetParams("API_202175", param);
					$urbanMain.ui.requestOpenApi(options);

				}else if(pWorkGb === "C"){
					param.comparison_gb = "CT2";
					var map = $urbanMain.ui.getMap(0);
					var xCoor =$('.menu-list2 a.active').attr('data-urban-x')
					var yCoor =$('.menu-list2 a.active').attr('data-urban-y')
					var icon = sop.icon({ iconUrl: "/images/urban/marker_A.png", iconSize: 25});
					var marker = sop.marker([xCoor,yCoor],{icon:icon})
					marker.addTo(map.gMap)
					map.mapMove([ xCoor, yCoor ], map.zoom);
					$('.orange-btn1').css({
						'background-image': 'url(/images/urban/marker_A.png)',
						'background-size': '20px',
						'background-repeat': 'no-repeat',
						'background-position':'left center',
						'padding':'8px 10px 8px 30px'
					})
					$('#db01_head_urbars_nm1').on('click',function(){
						marker.remove();
						$('.menu-list2 a.active').trigger('click');
					})
					$('.menu-list2').on('click',function(){
						marker.remove();
					})
					$('#gnb_menu_1').on('click',function(){
						marker.remove();
					})
					$('#gnb_menu_2').on('click',function(){
						marker.remove();
					})
					$('#gnb_menu_3').on('click',function(){
						marker.remove();
					})
					$('#gnb_menu_4').on('click',function(){
						marker.remove();
					})
					$('.sinceNew').on('change',function(){
						marker.remove();
					});

					options = $urbanMain.ui.reqSetParams("API_202175", param);
					$urbanMain.ui.requestOpenApi(options);
				}
			},	// 2022 SGIS5 추가 끝

			/**
			 * 
			 * @name         : setUrbarsIndexes
			 * @description  : 도시화지역 지표정보 처리
			 * 
			 */
// 			setUrbarsIndexes : function(pRes, pOptions) {
// 				var rstList = pRes.result["list"];
// 				var rstByYear = pRes.result["byYear"];
// 				var params = pOptions.params;
// 				var $bowl;
// 				var idxIdntfrList = $urbanDataBoard.ui.idxIdntfrs;
// 				var idxNmList = $urbanDataBoard.ui.idxNms;
// 				var viewClsGb = "chk03";	//기본값
// 				var comparisonGb = params["comparison_gb"];
// 				var isComparison = false;

// 				if(comparisonGb == "CT2"){
// 					viewClsGb = "chk05";
// 					isComparison = true;
// 				}

// 				var selBaseYear = $urbanObj.getValueMappedToKey(["base_year"], params);
// 				var selUrbanId = $urbanObj.getValueMappedToKey(["urban_id"], params);
// 				var selUrbanNm = $urbanObj.getValueMappedToKey(["urban_nm"], params);
// 				var selUrbanCls = $urbanObj.getValueMappedToKey(["urban_cls_gb"], params);
// 				var selUrbanType = $urbanObj.getValueMappedToKey(["urban_type"], params);
// 				var comparisonUrbanId = "";
// 				var comparisonUrbanNm = "";
// 				if(isComparison){
// 					comparisonUrbanId = $urbanObj.getValueMappedToKey(["comparison_urban_id"], params);
// 					comparisonUrbanNm = $urbanObj.getValueMappedToKey(["comparison_urban_nm"], params);
// 				}
				
// 				if(rstList !== undefined && rstList !== null && rstList.length > 0){
// 					$.each(idxIdntfrList, function(idx, item){
// 						$bowl = $(".extend-data ." + viewClsGb + " .comparison-item[data-idx-id=" + idxIdntfrList[idx] + "]");
						
// 						var curKey = idxIdntfrList[idx]; 
// 						rstList.sort(function (a, b) {
// 							return Number(a[curKey]) > Number(b[curKey]) ? -1 : Number(a[curKey]) < Number(b[curKey]) ? 1 : 0;						
// 						});
						
// 						var idxDataList = [];
// 						var ranking = -1;
// 						var selRanking = -1;
// 						var comparisonRanking = -1;
// 						var idxPrevVal = 0;
// 						var totCnt = 0;
// 						var isFirst = true;
// 						$.each(rstList, function(idx2, item2){
// 							var idxVal = item2[curKey];
// 							if(idxVal !== undefined && idxVal !== null){
// 								if(!isFirst){
// 									if(idxVal < idxPrevVal){
// 										ranking = totCnt + 1;
// 									}
// 									idxPrevVal = idxVal;
// 								}else{
// 									ranking = 1;
// 									idxPrevVal = idxVal;
// 									isFirst = false;									
// 								}
// 								idxDataList.push({urban_id : item2["urban_id"], urban_nm : item2["urban_nm"], base_year : item2["base_year"], urban_cls : selUrbanCls, type : item2["type"], sido_cd : item2["sido_cd"], sgg_cd : item2["sgg_cd"], x_coor : item2["x_coor"], y_coor : item2["y_coor"], area : item2["area"], main_urban_id : item2["main_urban_id"], itmVal : idxVal, rank : ranking});

// 								if(selUrbanId == item2["urban_id"]){
// 									selRanking = ranking;
// 								}
// 								if(isComparison && comparisonUrbanId == item2["urban_id"]){
// 									comparisonRanking = ranking;
// 								}
								
// 								totCnt = totCnt + 1;
// 							}
// 						});
						
// 						$urbanObj.setIdxStatsMap(idxIdntfrList[idx], idxDataList);
						
// 						if(isComparison){
// 							$bowl.find(".full-right").html($urbanMain.ui.comma(totCnt) + "위");
// 							if(selRanking > 0){								
// 								var tmpVal = ((selRanking / totCnt) * 100).toFixed(0); 
// 								$bowl.find(".left .slider-conbox .slider .bar").css("width", tmpVal + "%");
// 								$bowl.find(".left .slider-conbox .slider .dot").css("left", tmpVal + "%");
// 								$bowl.find(".left .slider-conbox .slider .dot span").html($urbanMain.ui.comma(selRanking) + "위");

// 							}else{
// 								$bowl.find(".left .slider-conbox .slider .bar").css("width", "100%");
// 								$bowl.find(".left .slider-conbox .slider .dot").css("left", "100%");
// 								$bowl.find(".left .slider-conbox .slider .dot span").html($urbanMain.ui.comma(totCnt) + "위");
// 							}
							
// 							if(comparisonRanking > 0){								
// 								var tmpVal = ((comparisonRanking / totCnt) * 100).toFixed(0); 
// 								$bowl.find(".right .slider-conbox .slider .bar").css("width", tmpVal + "%");
// 								$bowl.find(".right .slider-conbox .slider .dot").css("left", tmpVal + "%");
// 								$bowl.find(".right .slider-conbox .slider .dot span").html($urbanMain.ui.comma(comparisonRanking) + "위");

// 							}else{
// 								$bowl.find(".right .slider-conbox .slider .bar").css("width", "100%");
// 								$bowl.find(".right .slider-conbox .slider .dot").css("left", "100%");
// 								$bowl.find(".right .slider-conbox .slider .dot span").html($urbanMain.ui.comma(totCnt) + "위");
// 							}
							
// 						}else{
// 							$bowl.find(".full-right").html($urbanMain.ui.comma(totCnt) + "위");
// 							$bowl.find(".dot.btn-modal").attr("data-cur-rank-id", selUrbanId);

// 							if(selRanking > 0){
// 								$bowl.find(".dot.dot01 span").html($urbanMain.ui.comma(selRanking) + "위");
// 								var tmpVal = ((selRanking / totCnt) * 100).toFixed(0); 
// 								$bowl.find(".slider-conbox .slider .bar").css("width", tmpVal + "%");
// 								$bowl.find(".slider-conbox .slider .dot").css("left", tmpVal + "%");
								
// 							}else{
// 								$bowl.find(".line-01 strong").html("-<span>위</span>");
// 								$bowl.find(".slider-conbox .slider .bar").css("width", "100%");
// 								$bowl.find(".slider-conbox .slider .dot").css("left", "100%");
// 							}
// 						}
// 					});					
// 				}else{
// 					// 초기화
// 				}
				
// 				if(rstByYear !== undefined && rstByYear !== null && rstByYear.length > 0){
// 					// 정렬상태로 반환중
// //					rstByYear.sort(function (a, b) {
// //						return a.base_year > b.base_year ? -1 : a.base_year < b.base_year ? 1 : 0;						
// //					});
					
// 					var avgHeaderTxt = "";
// 					if(selUrbanCls == $urbanObj.urbanCls_UN){
// 						if(selUrbanType == "02"){
// 							avgHeaderTxt = "준도시 평균";
// 						}else{
// 							avgHeaderTxt = "도시 평균";
// 						}						
// 					}else if(selUrbanCls == $urbanObj.urbanCls_SGIS){
// 						avgHeaderTxt = "통계청분류 평균";
// 					}

// 					var curUrbanVal = 0;
// 					var comparisonUrbanVal = 0;
// 					var curAllVal = 0;
// 					var prevUrbanVal = 0;
// 					var curIdx = 0;
// 					var firstYear = "";	// 전년도 대비 계산용 변수, 비교권역 선택에선 미사용 
// 					var rateOfChange = 0;
// 					var maxChartLen = 180;
// 					$.each(idxIdntfrList, function(idx, item){
// 						$bowl = $(".extend-data ." + viewClsGb + " .comparison-item[data-idx-id=" + idxIdntfrList[idx] + "]");
// 						curUrbanVal = 0;
// 						comparisonUrbanVal = 0;
// 						curAllVal = 0;
// 						prevUrbanVal = 0;
// 						curIdx = 0;
// 						firstYear = "";

// 						var xAxisCategories = [];
// 						var xAxisData1 = [];
// 						var xAxisData2 = [];
// 						var xAxisData3 = [];
// 						var idxChartData = [];
						
// 						$.each(rstByYear, function(idx2, item2){
// 							var tmpUrbanVal = item2[idxIdntfrList[idx] + "_itm"];
// 							var tmpComparisonUrbanVal;
// 							if(isComparison){
// 								tmpComparisonUrbanVal = item2[idxIdntfrList[idx] + "_cmprsn"];
// 							}
// 							var tmpAllVal = item2[idxIdntfrList[idx] + "_all"];
// 							var tmpItmCnt = item2["exist_itm"];
// 							var tmpCmprsnCnt = item2["exist_cmprsn"];
							
// 							if(selBaseYear == item2.base_year){
// 								curUrbanVal = tmpUrbanVal;								
// 								if(isComparison){
// 									comparisonUrbanVal = tmpComparisonUrbanVal;
// 								}
// 								curAllVal = tmpAllVal;
								
// 								curIdx = idx2;
// 								if(idx2 > 0){
// 									prevUrbanVal = rstByYear[idx2 - 1][idxIdntfrList[idx] + "_itm"];
// 								}								
// 							}
							
// 							xAxisCategories.push(item2.base_year);
// 							if(Number(tmpItmCnt) === 0){
// 								xAxisData1.push(null);
// 							}else{
// 								xAxisData1.push(Number(tmpUrbanVal));
// 								if(firstYear === ""){
// 									firstYear = item2.base_year;
// 								}
// 							}							
// 							xAxisData2.push(Number(tmpAllVal));
// 							if(isComparison){
// 								if(Number(tmpCmprsnCnt) === 0){
// 									xAxisData3.push(null);
// 								}else{
// 									xAxisData3.push(Number(tmpComparisonUrbanVal));
// 								}								
// 							}
// 						});
						
// 						if(isComparison){
// 							idxChartData.push({name : selUrbanNm, data : xAxisData1, color: "#ff9600"});
// 							idxChartData.push({name : comparisonUrbanNm, data : xAxisData3, color: "#1b7ed5"});
// 							idxChartData.push({name : avgHeaderTxt, data : xAxisData2, color: "#b3bfc9"});	
							
// 							$bowl.find(".chart-conbox .color-item01 dd span").html($urbanMain.ui.comma(curUrbanVal));
// 							$bowl.find(".chart-conbox .color-item03 dd span").html($urbanMain.ui.comma(comparisonUrbanVal));
// 							$bowl.find(".chart-conbox .color-item02 dd span").html($urbanMain.ui.comma(curAllVal));							

// 							var curUrbanValNum = Number(curUrbanVal);
// 							var comparisonUrbanValNum = Number(comparisonUrbanVal);
// 							var curAllValNum = Number(curAllVal);
// 							var maxValNum = Math.max(curUrbanValNum, comparisonUrbanValNum, curAllValNum);
							
// 							$bowl.find(".chart-conbox .color-item01 dd div").css("width", (maxChartLen * (curUrbanValNum / maxValNum)).toFixed(0) + "px");
// 							$bowl.find(".chart-conbox .color-item03 dd div").css("width", (maxChartLen * (comparisonUrbanValNum / maxValNum)).toFixed(0) + "px");
// 							$bowl.find(".chart-conbox .color-item02 dd div").css("width", (maxChartLen * (curAllValNum / maxValNum)).toFixed(0) + "px");

// 							//차트 바 이름
// 							$bowl.find(".chart-conbox .color-item01 dt").html(selUrbanNm);
// 							$bowl.find(".chart-conbox .color-item03 dt").html(comparisonUrbanNm);
// 							$bowl.find(".chart-conbox .color-item02 dt").html(avgHeaderTxt);							
							
// 						}else{
// 							idxChartData.push({name : selUrbanNm, data : xAxisData1, color: "#ff9600"}); 
// 							idxChartData.push({name : avgHeaderTxt, data : xAxisData2, color: "#b3bfc9"});
							
// 							$bowl.find(".chart-conbox .color-item01 dd span").html($urbanMain.ui.comma(curUrbanVal));
// 							$bowl.find(".chart-conbox .color-item02 dd span").html($urbanMain.ui.comma(curAllVal));
					
// 							var curUrbanValNum = Number(curUrbanVal);
// 							var prevUrbanValNum = Number(prevUrbanVal);
// 							var curAllValNum = Number(curAllVal);
// 							var maxValNum = Math.max(curUrbanValNum, curAllValNum);
// 							$bowl.find(".chart-conbox .color-item01 dd div").css("width", (maxChartLen * (curUrbanValNum / maxValNum)).toFixed(0) + "px");
// 							$bowl.find(".chart-conbox .color-item02 dd div").css("width", (maxChartLen * (curAllValNum / maxValNum)).toFixed(0) + "px");
							
// 							//전년도 대비
// 							var tkdtmddosgkfkr = "-";
// 							if(prevUrbanValNum === 0){
// 								if(firstYear == selBaseYear || curUrbanValNum === 0){
// 									rateOfChange = 0;
// 								}else{
// 									rateOfChange = 100;
// 									tkdtmddosgkfkr = "▲";
// 								}							
// 							}else{
// 								rateOfChange = ((curUrbanValNum - prevUrbanValNum) / prevUrbanValNum * 100).toFixed(2);
// 								if(rateOfChange > 0){
// 									tkdtmddosgkfkr = "▲";
// 								}else if(rateOfChange < 0){
// 									tkdtmddosgkfkr = "▼";
// 								}							
// 							}
// 							if(firstYear == selBaseYear){
// 								//$bowl.find(".line-01 p span").html(" - <b>-</b>");
// 							}else{
// 								//$bowl.find(".line-01 p span").html(rateOfChange + "% <b>" + tkdtmddosgkfkr + "</b>");
// 							}
// 							//차트 바 이름
// 							$bowl.find(".chart-conbox .color-item01 dt").html(selUrbanNm);
// 							$bowl.find(".chart-conbox .color-item02 dt").html(avgHeaderTxt);
// 						}
// 						$urbanDataBoard.ui.createLineChart($bowl.find(".graph-box > .graph-in"), xAxisCategories, idxChartData, 430, 110);
// 					});
// 				}else{
// 					// 초기화
// 				}
// 			}


			/**
			 *
			 * @name         : setUrbarsIndexes
			 * @description  : 도시화지역 지표정보 처리
			 * @history 	 : 22.10 변경
			 */
			// 2022 SGIS5 추가
			setUrbarsIndexes : function(pRes, pOptions) {
				var curData1 =[];
				var curData2 =[];
				var lankData =[];
				var tmpData=[];
				var curPxList =[];
				var dosiPxList =[];
				var compList =[];
				var compLankList=[];
				var compCurlData1 =[];
				var compCurlData2 =[];
				var compCurlData3 =[];
				var compCurlValData1 =[];
				var compCurlValData2 =[];
				var compCurlValData3 =[];
				var rstList = pRes.result["list"];
				var rstByYear = pRes.result["byYear"];
				var params = pOptions.params;
				var $bowl;
				var idxIdntfrList = $urbanDataBoard.ui.idxIdntfrs;
				var idxNmList = $urbanDataBoard.ui.idxNms;
				var viewClsGb = "chk03";	//기본값
				var comparisonGb = params["comparison_gb"];
				var isComparison = false;
				var selectTyBox = $('#urban_ty_box_1 li.active');
				if(comparisonGb == "CT2"){
					viewClsGb = "chk05";
					isComparison = true;
				}

				var selBaseYear = $urbanObj.getValueMappedToKey(["base_year"], params);
				var selUrbanId = $urbanObj.getValueMappedToKey(["urban_id"], params);
				var selUrbanNm = $urbanObj.getValueMappedToKey(["urban_nm"], params);
				var selUrbanCls = $urbanObj.getValueMappedToKey(["urban_cls_gb"], params);
				var selUrbanType = $urbanObj.getValueMappedToKey(["urban_type"], params);
				var comparisonUrbanId = "";
				var comparisonUrbanNm = "";
				if(isComparison){
					comparisonUrbanId = $urbanObj.getValueMappedToKey(["comparison_urban_id"], params);
					comparisonUrbanNm = $urbanObj.getValueMappedToKey(["comparison_urban_nm"], params);
				}
				if(rstList !== undefined && rstList !== null && rstList.length > 0){
					$.each(idxIdntfrList, function(idx, item){
						$bowl = $(".extend-data ." + viewClsGb + " .comparison-item[data-idx-id=" + idxIdntfrList[idx] + "]");

						var curKey = idxIdntfrList[idx];
						rstList.sort(function (a, b) {
							return Number(a[curKey]) > Number(b[curKey]) ? -1 : Number(a[curKey]) < Number(b[curKey]) ? 1 : 0;
						});

						var idxDataList = [];
						var ranking = -1;
						var selRanking = -1;
						var comparisonRanking = -1;
						var idxPrevVal = 0;
						var totCnt = 0;
						var isFirst = true;
						$.each(rstList, function(idx2, item2){
							var idxVal = item2[curKey];
							if(idxVal !== undefined && idxVal !== null){
								if(!isFirst){
									if(idxVal < idxPrevVal){
										ranking = totCnt + 1;
									}
									idxPrevVal = idxVal;
								}else{
									ranking = 1;
									idxPrevVal = idxVal;
									isFirst = false;
								}
								idxDataList.push({urban_id : item2["urban_id"], urban_nm : item2["urban_nm"], base_year : item2["base_year"], urban_cls : selUrbanCls, type : item2["type"], sido_cd : item2["sido_cd"], sgg_cd : item2["sgg_cd"], x_coor : item2["x_coor"], y_coor : item2["y_coor"], area : item2["area"], main_urban_id : item2["main_urban_id"], itmVal : idxVal, rank : ranking});
								if(selUrbanId == item2["urban_id"]){
									selRanking = ranking;
								}
								if(isComparison && comparisonUrbanId == item2["urban_id"]){
									comparisonRanking = ranking;
								}

								totCnt = totCnt + 1;
							}
						});

						$urbanObj.setIdxStatsMap(idxIdntfrList[idx], idxDataList);

						if(isComparison){
							if(selRanking > 0){
								var tmpVal = ((selRanking / totCnt) * 100).toFixed(0);
								lankData.push(selRanking);
								tmpData.push(tmpVal);
								for(var i=0; i<lankData.length; i++){
									$('.totIndexes_layer .item_02 .indexes'+i).find(".full-right").html($urbanMain.ui.comma(totCnt) + "위");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color01 .bar").css("width", tmpData[i] + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color01 .dot").css("left", tmpData[i] + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color01 .dot").find('span').html($urbanMain.ui.comma(lankData[i]) + "위");
								}
								
							}else{
								$bowl.find(".left .slider-conbox .slider .bar").css("width", "100%");
								$bowl.find(".left .slider-conbox .slider .dot").css("left", "100%");
								$bowl.find(".left .slider-conbox .slider .dot span").html($urbanMain.ui.comma(totCnt) + "위");
							}

							if(comparisonRanking > 0){
								var tmpVal = ((comparisonRanking / totCnt) * 100).toFixed(0);
								compList.push(tmpVal);
								compLankList.push(comparisonRanking);
								for(var i=0; i<compLankList.length; i++){
									$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color04 .bar").css("width", compList[i] + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color04 .dot").css("left", compList[i] + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color04 .dot span").html($urbanMain.ui.comma(compLankList[i]) + "위");
								}
							}else{
								$bowl.find(".right .slider-conbox .slider .bar").css("width", "100%");
								$bowl.find(".right .slider-conbox .slider .dot").css("left", "100%");
								$bowl.find(".right .slider-conbox .slider .dot span").html($urbanMain.ui.comma(totCnt) + "위");
							}

						}else{
							// $('.item_01 .flex-box').find(".full-right").html($urbanMain.ui.comma(totCnt) + "위");
							if(selRanking > 0){
								lankData.push(selRanking);
								for(var i=0; i<lankData.length; i++){
									$('.totIndexes_layer .item_01 .indexes'+i).find(".full-right").html($urbanMain.ui.comma(totCnt) + "위");
									$('.totIndexes_layer .item_01 .indexes'+i).find(".dot").find('span').html($urbanMain.ui.comma(lankData[i]) + "위");
								}
								var tmpVal = ((selRanking / totCnt) * 100).toFixed(0);
								tmpData.push(tmpVal);
								for(var i=0; i<tmpData.length; i++){
									$('.totIndexes_layer .item_01 .indexes'+i).find(".slider-conbox .slider .bar").css("width", tmpData[i] + "%");
									$('.totIndexes_layer .item_01 .indexes'+i).find(".dot").css("left",tmpData[i] + "%");
								}
							}else{
								$bowl.find(".line-01 strong").html("-<span>위</span>");
								$bowl.find(".slider-conbox .slider .bar").css("width", "100%");
								$bowl.find(".slider-conbox .slider .dot").css("left", "100%");
							}
						}
					});
				}else{
					// 초기화
				}

				if(rstByYear !== undefined && rstByYear !== null && rstByYear.length > 0){
					// 정렬상태로 반환중
//					rstByYear.sort(function (a, b) {
//						return a.base_year > b.base_year ? -1 : a.base_year < b.base_year ? 1 : 0;
//					});

					var avgHeaderTxt = "";
					if(selUrbanCls == $urbanObj.urbanCls_UN){
						if(selUrbanType == "02"){
							avgHeaderTxt = "준도시 평균";
						}else{
							avgHeaderTxt = "도시 평균";
						}
					}else if(selUrbanCls == $urbanObj.urbanCls_SGIS){
						avgHeaderTxt = "통계청분류 평균";
					}

					var curUrbanVal = 0;
					var comparisonUrbanVal = 0;
					var curAllVal = 0;
					var prevUrbanVal = 0;
					var curIdx = 0;
					var firstYear = "";	// 전년도 대비 계산용 변수, 비교권역 선택에선 미사용
					var rateOfChange = 0;
					var maxChartLen = 180;
					$.each(idxIdntfrList, function(idx, item){
						$bowl = $(".extend-data ." + viewClsGb + " .comparison-item[data-idx-id=" + idxIdntfrList[idx] + "]");
						curUrbanVal = 0;
						comparisonUrbanVal = 0;
						curAllVal = 0;
						prevUrbanVal = 0;
						curIdx = 0;
						firstYear = "";

						var xAxisCategories = [];
						var xAxisData1 = [];
						var xAxisData2 = [];
						var xAxisData3 = [];
						var idxChartData = [];
						
						$.each(rstByYear, function(idx2, item2){
							var tmpUrbanVal = item2[idxIdntfrList[idx] + "_itm"];
							var tmpComparisonUrbanVal;
							if(isComparison){
								tmpComparisonUrbanVal = item2[idxIdntfrList[idx] + "_cmprsn"];
							}
							var tmpAllVal = item2[idxIdntfrList[idx] + "_all"];
							var tmpItmCnt = item2["exist_itm"];
							var tmpCmprsnCnt = item2["exist_cmprsn"];

							if(selBaseYear == item2.base_year){
								curUrbanVal = tmpUrbanVal;
								if(isComparison){
									comparisonUrbanVal = tmpComparisonUrbanVal;
								}
								curAllVal = tmpAllVal;

								curIdx = idx2;
								if(idx2 > 0){
									prevUrbanVal = rstByYear[idx2 - 1][idxIdntfrList[idx] + "_itm"];
								}
							}

							xAxisCategories.push(item2.base_year);
							if(Number(tmpItmCnt) === 0){
								xAxisData1.push(null);
							}else{
								xAxisData1.push(Number(tmpUrbanVal));
								if(firstYear === ""){
									firstYear = item2.base_year;
								}
							}
							xAxisData2.push(Number(tmpAllVal));
							if(isComparison){
								if(Number(tmpCmprsnCnt) === 0){
									xAxisData3.push(null);
								}else{
									xAxisData3.push(Number(tmpComparisonUrbanVal));
								}
							}
						});

						if(isComparison){
							if($(selectTyBox).attr('data-urbar-type') ==='02'){
								idxChartData.push({name : selUrbanNm, data : xAxisData1, color: "#FFD050"});
								idxChartData.push({name : comparisonUrbanNm, data : xAxisData3, color: "#272f4b"});
								idxChartData.push({name : avgHeaderTxt, data : xAxisData2, color: "#b3bfc9"});
							}else{
								idxChartData.push({name : selUrbanNm, data : xAxisData1, color: "#F1423E"});
								idxChartData.push({name : comparisonUrbanNm, data : xAxisData3, color: "#272F4B"});
								idxChartData.push({name : avgHeaderTxt, data : xAxisData2, color: "#b3bfc9"});
							}
							compCurlValData1.push(curUrbanVal)
							compCurlValData2.push(comparisonUrbanVal)
							compCurlValData3.push(curAllVal)
							for(var i=0; i<compCurlValData1.length; i++) {
								$('.totIndexes_layer .item_02 .indexes'+i).find(".color-item01 dd span").html($urbanMain.ui.comma(compCurlValData1[i]));
								$('.totIndexes_layer .item_02 .indexes'+i).find(".color-item03 dd span").html($urbanMain.ui.comma(compCurlValData2[i]));
								$('.totIndexes_layer .item_02 .indexes'+i).find(".color-item02 dd span").html($urbanMain.ui.comma(compCurlValData3[i]));
							}
							var curUrbanValNum = Number(curUrbanVal);
							var comparisonUrbanValNum = Number(comparisonUrbanVal);
							var curAllValNum = Number(curAllVal);
							var maxValNum = Math.max(curUrbanValNum, comparisonUrbanValNum, curAllValNum);
							compCurlData1.push(((maxChartLen * (curUrbanValNum / maxValNum)).toFixed(0)-40));
							compCurlData2.push(((maxChartLen * (comparisonUrbanValNum / maxValNum)).toFixed(0)-40));
							compCurlData3.push(((maxChartLen * (curAllValNum / maxValNum)).toFixed(0)-40));
							// SGIS5 추가
							var maxWidth =$('.totIndexes_layer .item_02 .indexes1').find(".chart-conbox .color-item01 dd div").css('max-width');
							maxWidth = maxWidth.slice(0,3)
							
							for(var i=0; i<compCurlData1.length; i++) {
								// SGIS5  추가
								if(maxWidth == 140){
									$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item01 dd div").css("width",((compCurlData1[i]/maxWidth)*100)  + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item03 dd div").css("width",((compCurlData2[i]/maxWidth)*100)  + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item02 dd div").css("width",((compCurlData3[i]/maxWidth)*100)  + "%");
								}else if(maxWidth == 280){
									$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item01 dd div").css("width",(((compCurlData1[i]*2)/maxWidth)*100)  + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item03 dd div").css("width",(((compCurlData2[i]*2)/maxWidth)*100)  + "%");
									$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item02 dd div").css("width",(((compCurlData3[i]*2)/maxWidth)*100)  + "%");
								}
								// SGIS5 추가 끝
								$('.totIndexes_layer .item_02 .indexes'+i).find(".color-item01 .totPopCol").css("background",idxChartData[0].color );
								$('.totIndexes_layer .item_02 .indexes'+i).find(".color-item03 .totPopCol").css("background",idxChartData[1].color );
								$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color01 .bar").css("background", idxChartData[0].color);
								$('.totIndexes_layer .item_02 .indexes'+i).find(".type-color04 .bar").css("background", idxChartData[1].color);
								$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item01 dt").html(selUrbanNm);
								$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item03 dt").html(comparisonUrbanNm);
								$('.totIndexes_layer .item_02 .indexes'+i).find(".chart-conbox .color-item02 dt").html(avgHeaderTxt);
							}
							//차트 바 이름

						}else{
							if($(selectTyBox).attr('data-urbar-type') ==='02'){
								idxChartData.push({name : selUrbanNm, data : xAxisData1, color: "#FFD050"});
								idxChartData.push({name : avgHeaderTxt, data : xAxisData2, color: "#b3bfc9"});
							}else{
								idxChartData.push({name : selUrbanNm, data : xAxisData1, color: "#F1423E"});
								idxChartData.push({name : avgHeaderTxt, data : xAxisData2, color: "#b3bfc9"});
							}

//							$(".totPopAvg").html($urbanMain.ui.comma(curUrbanValNum));
//							$(".dosiAvg").html($urbanMain.ui.comma(curAllValNum));
							var curUrbanValNum = Number(curUrbanVal);
							var prevUrbanValNum = Number(prevUrbanVal);
							var curAllValNum = Number(curAllVal);
							var maxValNum = Math.max(curUrbanValNum, curAllValNum);
							curData1.push(curUrbanValNum);
							curData2.push(curAllValNum);
							

							//전년도 대비
							var tkdtmddosgkfkr = "-";
							if(prevUrbanValNum === 0){
								if(firstYear == selBaseYear || curUrbanValNum === 0){
									rateOfChange = 0;
								}else{
									rateOfChange = 100;
									tkdtmddosgkfkr = "▲";
								}
							}else{
								rateOfChange = ((curUrbanValNum - prevUrbanValNum) / prevUrbanValNum * 100).toFixed(2);
								if(rateOfChange > 0){
									tkdtmddosgkfkr = "▲";
								}else if(rateOfChange < 0){
									tkdtmddosgkfkr = "▼";
								}
							}

							if(firstYear == selBaseYear){
								//$bowl.find(".line-01 p span").html(" - <b>-</b>");
							}else{
								//$bowl.find(".line-01 p span").html(rateOfChange + "% <b>" + tkdtmddosgkfkr + "</b>");
							}
							//차트 바 이름
							$bowl.find(".chart-conbox .color-item02 dt").html(avgHeaderTxt);
						}
						// wkwk 1111
//						$urbanDataBoard.ui.createLineChart($bowl.find(".graph-box > .graph-in"), xAxisCategories, idxChartData, 430, 110);
						curPxList.push(((maxChartLen * (curUrbanValNum / maxValNum)).toFixed(0)-40));
						dosiPxList.push(((maxChartLen * (curAllValNum / maxValNum)).toFixed(0)-40));
						for(var i=0; i<curData1.length; i++){
							$('.totIndexes_layer .item_01 .indexes'+i).find(".totAvg").html($urbanMain.ui.comma(curData1[i]));
							$('.totIndexes_layer .item_01 .indexes'+i).find(".dosiAvg").html($urbanMain.ui.comma(curData2[i]));
							$('.totIndexes_layer .item_01 .indexes'+i).find("#totPop").html(selUrbanNm);
							$('.totIndexes_layer .item_01 .indexes'+i).find(".totPopCol").css("width", curPxList[i] + "px");
							$('.totIndexes_layer .item_01 .indexes'+i).find(".totPopCol").css("background",idxChartData[0].color );
							$('.totIndexes_layer .item_01 .indexes'+i).find(".type-color01 .bar").css("background",idxChartData[0].color);
							$('.totIndexes_layer .item_01 .indexes'+i).find(".chart-conbox .color-item02 dd div").css("width",dosiPxList[i]  + "px");
						}
						
						if(comparisonGb ==='CT2'){
							$urbanDataBoard.ui.dualLineColumnChart('chart'+(idx+2), xAxisCategories, idxChartData[0],idxChartData[1],idxChartData[2]);
							$urbanDataBoard.ui.dualLineColumnChart('totCompIndexesChart'+(idx+1), xAxisCategories, idxChartData[0],idxChartData[1],idxChartData[2]);
						}else{
							$urbanDataBoard.ui.dualLineColumnChart('chart'+(idx+2), xAxisCategories, idxChartData[0],idxChartData[1]);
							$urbanDataBoard.ui.dualLineColumnChart('totIndexesChart'+(idx+1), xAxisCategories, idxChartData[0],idxChartData[1]);
						}
					});
				}else{
					// 초기화

				}
			}


	};

	$urbanDataBoard.callbackFunc = {

	};

	$urbanDataBoard.event = {

			/**
			 *
			 * @name         : setUIEvent
			 * @description  : 데이터보드 UI에서 사용하는 이벤트 및 초기설정을 수행한다.
			 *
			 */
			setUIEvent : function() {
				var body = $("body");

				//행정구역 선택박스
				// wkwk 준혁
				body.on('click','#district .green-box li>a',function(e){
					e.preventDefault();
					$('#district .green-box li>a').addClass('active');
					$('#district .green-box li>a').not($(this)).removeClass('active');
				})

				body.on('click','#district .btn_1',function(){
					var selVal = $('#district .green-box li>a.active').attr('data-value');
					var selText =$('#district .green-box li>a.active').text();

					var selValArray = selVal.split("/");
					var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();	//선택박스 변경 시점에는 왼쪽 대메뉴가 선택되어 있으므로(문제시 data-sel-menu 속성 사용)
					if($('#district .green-box li>a').hasClass('active')){
						if(selMenuId === "gnb_menu_1"){		//도시화 통계
							if(selValArray.length >= 7){
								var selAdmCd = selValArray[0];
								var selUrbanId = selValArray[1];
								var selXcoor = selValArray[4];
								var selYcoor = selValArray[5];
								var selUrbanNm = selValArray[6];
								var selSggNm = selValArray[7];
								var selAdmNm = $(this).find('active').text();

								if(selAdmCd.length >= 5){
									$urbanDataBoard.ui.changeDataBoardView("chk02");

									var param = $urbanObj.getStatsParamInfo();
									if(param !== null){
										var map = $urbanMain.ui.getMap(param.map_id);
										map.mapMove([selXcoor, selYcoor], 6);

										var sidoCd = selAdmCd.substring(0, 2);
										var sggCd = selAdmCd.substring(2, 5);

										param.urban_sido_cd = sidoCd;
										param.urban_sgg_cd = sggCd;


										// 비교 탭
//										var paramForTab = deepCopy(param);
//										paramForTab.urban_nm = selUrbanNm;
//										paramForTab.urban_id = selUrbanId;
//										paramForTab.adm_nm = selAdmNm;
//										paramForTab.sgg_nm = selSggNm;
//										$urbanDataBoard.ui.setDataBoardTab(paramForTab);

										// 도형
										var paramForGeo = deepCopy(param);
										paramForGeo.comparison_gb = "CG1";
										//paramForGeo.urban_id = selUrbanId;		// 'UN도시분류'에 사용되는 2개의 도형 테이블간 urbar_id가 연결되면 주석처리 해도 됨
										paramForGeo.map_id = 0;
										paramForGeo.async = false;
										//reqUrbarsGeometry 호출 시 전달하는 param이 다른곳과 다름($urbanObj.getStatsParamInfo()을 사용)
						    			$urbanMain.ui.reqUrbarsGeometry(paramForGeo, false);

						    			// 통계 wkwk
										$urbanDataBoard.ui.reqUrbarsStatistics(param, "0", "C");

									}
								}
							}else{
								//SGIS4_220215_도시화_수정_시작
								var geo = $urbanMain.ui.getGeo();
								//0805 wkwk
								geo.clearGeo2();
								$urbanDataBoard.ui.changeDataBoardView("chk01");
								//SGIS4_220215_도시화_수정_끝
							}
						} // end
						$('#district .close').trigger("click");
						setTimeout(() => {
							var svgPath=$('.sop-overlay-pane').find('.sop-zoom-animated').find('.sop-interactive');
							$.each(svgPath,function(index,item){
								if($(item).attr('stroke') === '#000000'){
									$(this).attr('fill','#868686');
									$(this).attr('pointer-events','none'); //추가
									$(this).attr('fill-opacity','0.3');
								}

							})
							}, "500") //변경


					}else{
						messageAlert.open("알림", "조회 대상을 선택해 주세요.");
					}
					$('#district .green-box li>a').removeClass('active');
					$('.gray-btn2').html(selText);
					$('.orange-btn2').show();
					$('.green-btn2').show();
					$('.gray-btn2').show();
					$('.district-btn').hide();


				});


//				body.on('change', '#db01_head_subRegion', function(){
//					if($urbanMain.ui.writeSrvLogYn == "Y"){
//						srvLogWrite('R0', '03', '04', '01', $("#db01_head_subRegion option:selected").text(), ''); // 2022.02.15 log 생성
//					}
//					$urbanMain.ui.writeSrvLogYn = "Y"; //클릭 한번으로 여러개의 log가 생성되는 것을 막기 위한 제어변수
//					var selVal = $(this).val();
//					var selValArray = selVal.split("/");
//
//					var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();	//선택박스 변경 시점에는 왼쪽 대메뉴가 선택되어 있으므로(문제시 data-sel-menu 속성 사용)
//					if(selMenuId === "gnb_menu_1"){		//도시화 통계
//						if(selValArray.length >= 7){
//							var selAdmCd = selValArray[0];
//							var selUrbanId = selValArray[1];
//							var selXcoor = selValArray[4];
//							var selYcoor = selValArray[5];
//							var selUrbanNm = selValArray[6];
//							var selSggNm = selValArray[7];
//							var selAdmNm = $(this).find('option:selected').text();
//							if(selAdmCd.length >= 5){
//								$urbanDataBoard.ui.changeDataBoardView("chart2");
//
//								var param = $urbanObj.getStatsParamInfo();
//								if(param !== null){
//									var map = $urbanMain.ui.getMap(param.map_id);
//									map.mapMove([selXcoor, selYcoor], 6);
//
//									var sidoCd = selAdmCd.substring(0, 2);
//									var sggCd = selAdmCd.substring(2, 5);
//
//									param.urban_sido_cd = sidoCd;
//									param.urban_sgg_cd = sggCd;
//
//									// 비교 탭
//									var paramForTab = deepCopy(param);
//									paramForTab.urban_nm = selUrbanNm;
//									paramForTab.urban_id = selUrbanId;
//									paramForTab.adm_nm = selAdmNm;
//									paramForTab.sgg_nm = selSggNm;
//									$urbanDataBoard.ui.setDataBoardTab(paramForTab);
//
//									// 도형
//									var paramForGeo = deepCopy(param);
//									paramForGeo.comparison_gb = "CG1";
//									//paramForGeo.urban_id = selUrbanId;		// 'UN도시분류'에 사용되는 2개의 도형 테이블간 urbar_id가 연결되면 주석처리 해도 됨
//									paramForGeo.map_id = 0;
//									paramForGeo.async = false;
//									//reqUrbarsGeometry 호출 시 전달하는 param이 다른곳과 다름($urbanObj.getStatsParamInfo()을 사용)
//					    			$urbanMain.ui.reqUrbarsGeometry(paramForGeo, false);
//
//					    			// 통계
//									$urbanDataBoard.ui.reqUrbarsStatistics(param, "0", "C");
//								}
//							}
//						}else{
//							//SGIS4_220215_도시화_수정_시작
//							var geo = $urbanMain.ui.getGeo(0);
//							// 0805 wkwk
//							geo.clearGeo2();
//							$urbanDataBoard.ui.changeDataBoardView("chk01");
//							//SGIS4_220215_도시화_수정_끝
//						}
//					}else if(selMenuId === "gnb_menu_3"){	//도시화 지표분석
//						if(selValArray.length >= 7){
//							$urbanDataBoard.ui.changeDataBoardView("chk05");
//						}else{
//							$urbanDataBoard.ui.changeDataBoardView("chk03");
//						}
//					}
//		    	});

		        //도시화 통계 > 도시지역 선택
//		        body.on('click', '.extend-search.check_search .value_col03 ._yel', function(){
//		        	//SGIS4_220215_도시화_수정_시작
//
//					var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();	//버튼 클릭 시점에는 왼쪽 대메뉴가 선택되어 있으므로
//					if(selMenuId === "gnb_menu_1"){		//도시화 통계
//			        	$("#db01_head_subRegion").find("option:eq(0)").prop("selected", true);
//			        	$("#db01_head_subRegion").trigger("change");
//					}else if(selMenuId === "gnb_menu_3"){	//도시화 지표분석
//						var geo = $urbanMain.ui.getGeo();
//						geo.clearGeo2();
//						$urbanDataBoard.ui.changeDataBoardView("chk03");
//					}
//					//SGIS4_220215_도시화_수정_끝
//		        });

		        //wkwkw 0801
		        //도시화 통계 > 도시지역 선택
		        body.on('click', '.extend-search.check_search .data-value-right .green-btn2', function(){
		        	//SGIS5_220801_도시화_수정_시작
					var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();	//버튼 클릭 시점에는 왼쪽 대메뉴가 선택되어 있으므로
					if(selMenuId === "gnb_menu_1"){		//도시화 통계
//			        	$("#db01_head_subRegion2").find("option:eq(0)").prop("selected", true);
			        	$("#db01_head_subRegion").trigger("change");
			        	$('.gray-btn2').html('행정구역이름');
			        	$('.district-btn').show();
			        	$('.orange-btn2').hide();
						$('.green-btn2').hide();
						$('.gray-btn2').hide();
					}else if(selMenuId === "gnb_menu_3"){	//도시화 지표분석
						var geo = $urbanMain.ui.getGeo(0);
						geo.clearGeo2();
						$urbanDataBoard.ui.changeDataBoardView("chk03");
					}
					//SGIS4_220215_도시화_수정_끝

		        });



		        //팝업 호출(공통)
		        body.on('click', '.btn-modal', function(){
		        	var scrollToVal = 0;

		        	if($(this).hasClass('comparison-btn')){	//비교권역 선택
						
		        		var map = $urbanMain.ui.getMap(0);
		        		var sidoSelectId = map.mapNavigation.sidoSelectId;
		        		var sggSelectId = map.mapNavigation.sggSelectId;
					
						var sidoVal = $("#" + sidoSelectId).val();
						if(sidoVal === undefined || sidoVal === null){
							sidoVal = "";
						}
						var sggVal = $("#" + sggSelectId).val();
						if(sggVal === undefined || sggVal === null){
							sggVal = "";
						}

						if(sidoVal === ""){
							$("#sidoSelect_comparison_1").val("").prop("selected", true);
							$("#sidoSelect_comparison_1").trigger("change");
						}else{
							var sidoArray = sidoVal.split("/");
							var sidoId = sidoArray[0];
							$("#sidoSelect_comparison_1").val(sidoVal).prop("selected", true);	//sidoId 아님
							var param = {};
							param.sido_cd = sidoId;
							if(sggVal === ""){
								param.sel_sgg_cd = "";
							}else{
								var sggArray = sggVal.split("/");
								var sggId = sggArray[0];
								param.sel_sgg_cd = sggId;
							}

							$urbanMain.ui.reqAddress("sgg", param);

							var apiParam = $urbanLeftMenu.ui.makeParamMap("urbars");
							apiParam.urban_sido_cd = sidoId;
							apiParam.urban_sgg_cd = sggId;
							$urbanMain.ui.reqCommonInfo("urbars_adm", apiParam);
						}
		        	}else if($(this).hasClass('dot')){	//순위 선택

		        		var $parent = $(this).parents('.comparison-item');
		        		var idxKey = $parent.attr('data-idx-id');
		        		var curRankId = $(this).attr("data-cur-rank-id");

		        		var curRowIdx = $urbanMain.ui.setIdxRankList(idxKey, curRankId);
		        		scrollToVal = 30 * curRowIdx - 90;
		        		if(scrollToVal < 0){
		        			scrollToVal = 0;
		        		}


		        	}
		            var $target = $($(this).data('modal'));
		            $target.show();
		            $('.modal-bg').show();

		            $target.find('.rank-list').scrollTop(scrollToVal);
		            return false;
		        });

		        //팝업 닫기(공통)
		        body.on('click', '.modal .close', function(){
		            var $target = $(this).parents('.modal');
		            $target.hide();
		            $('.modal-bg').hide();
		            return false;
		        });
			}
	};

}(window, document));