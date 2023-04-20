/**
 * 생활권역서비스 데이터보드에 대한 클래스
 * 
 * history : 2020/06/16 초기 작성 version : 1.0 see : 원형(/js/interactive/interactiveMapApi.js)
 * 
 */
(function(W, D) {
	W.$catchmentAreaDataBoard = W.$catchmentAreaDataBoard || {};

	$(document).ready(
		function() {
			//$('.pop_statistics.pop_chk01').css('display', 'block');
			
			console.log("$catchmentAreaDataBoard.js");

			$catchmentAreaDataBoard.event.setUIEvent();
			
			$catchmentAreaDataBoard.ui.initializeUI('');
		});
	
	$catchmentAreaDataBoard.ui = {
			
			selectIndex : 0, //SGIS4_1210 수정
			girdCnt : 0,
			girdCnt2: 0,
			curBoardPage : "",			// 1:pop_chk01, 2:pop_chk02, 3:pop_chk03
			statDataOption : [],
			gridTypeUnit: {pops:'인구 수', family: '가구 수 ', house: '주택 수', copr_bus: '사업체 수', copr_worker: '종사자 수', idlv:'공시지가'},
			gridTypeAttrNm: {
				pops: 		 {sum: 'tot_sum_ppltn_cnt', avg: 'tot_avg_ppltn_cnt'},
				family: 	 {sum: 'tot_sum_family_cnt', avg: 'tot_avg_family_cnt'},
				house: 		 {sum: 'tot_sum_resid_cnt', avg: 'tot_avg_resid_cnt'},
				copr_bus: 	 {sum: 'tot_sum_copr_cnt', avg: 'tot_avg_copr_cnt'},
				copr_worker: {sum: 'tot_sum_employee_cnt', avg: 'tot_avg_employee_cnt'},
				idlv: 		 {sum: 'tot_olnlp', avg: 'tot_avg_olnlp'}
			},
			cacheDoubleColumnChart: null,	// 설명 : 상세분석 그리드 데이터보드의 차트를 그리고 나서, 범례의 기준의 양쪽 지도 중에서 하나로 바뀌게 되면 차트를 해당 범례에 맞게 다시 그려야한다.
											// 그 때 cacheDoubleColumnChart()를 호출한다. 해당 변수(함수)는 settingDetailGridDataBoard 메소드에서 클로저를 갖고 있는 함수를 반환 받는다.
			pop01SecSet : {
					area	: "sec01",
					pops	: "sec02",
					family	: "sec03",
					house	: "sec04",
					copr	: "sec05",
					employee	: "sec06"						
			},
			//SGIS4_1025_생활권역 시작
			dStatType : "",
			dItemIds : [],
			dItemLbls : [],
			//SGIS4_1025_생활권역 끝
			
			/**
			 * 
			 * @name         : initializeUI
			 * @description  : 초기정보를 설정한다.
			 * 
			 */
			initializeUI : function(flag) {
				
				$catchmentAreaDataBoard.ui.setBaseYearBox('1', 'A');
				$catchmentAreaDataBoard.ui.setBaseYearBox('2', 'B');
				$catchmentAreaDataBoard.ui.setBaseYearBox('3', 'A');
				//$$catchmentAreaDataBoard.ui.setBaseYearBox('4', 'A');
				$catchmentAreaDataBoard.ui.setBaseYearBox('4', 'A', 'bYearSel04');
				$catchmentAreaDataBoard.ui.setBaseYearBox('5', 'A');

				$("#select_legend").hide();
			},
			
			/**
			 * 
			 * @name         : clearUI
			 * @description  : 화면을 정리한다.
			 * 
			 */
			clearUI : function(pFlag) {
				// pFlag : 왼쪽메뉴의 화면 번호 (1-첫화면, 2-시설유형 목록 화면, 3-영역설정 화면, 4-통계 화면)
				
				$("#wrapper .pop_statistics").css("display", "none");
//				$("#wrapper .pop_chk01").css("display", "none");
//				$("#wrapper .pop_chk02").css("display", "none");
//				$("#wrapper .pop_chk03").css("display", "none");
//				$("#wrapper .pop_chk05").css("display", "none");
				$('.pop_btn01').hide();
				
				$catchmentAreaMain.ui.adjustUI();
			},

			/**
			 * 
			 * @name         : resetPop01
			 * @description  : 전체정보 데이터보드를 정리한다.
			 * 
			 */
			resetPop01 : function(pSecGb) {
//				var secSet = {
//						area	: "sec01",
//						pops	: "sec02",
//						family	: "sec03",
//						house	: "sec04",
//						copr	: "sec05",
//						employee	: "sec06"						
//				};


				
			},
			
			setSelectIndex : function(idx){
				if(idx < 1){
					idx = 1;
				}
				$catchmentAreaDataBoard.ui.selectIndex = idx;
			},

			/**
			 * 
			 * @name         : adjustPop01Board
			 * @description  : 특성별 통계 보기 on/off에 맞게 화면을 정리한다.
			 * 
			 */
			adjustPop01Board : function(pSecGb, pIsOn) {
				//SGIS4_생활권역 시작
				/*
				if(pSecGb == "all"){
					if(pIsOn){
						$('.pop_chk01 .mode_box01').show();
						$('.pop_chk01 .btn_chartr').trigger('click');						
					}else{
						$('.pop_chk01 .mode_box01').hide();
						$('.pop_chk01 .btn_basic').trigger('click');
					}
				}else{
					var section = $catchmentAreaDataBoard.ui.pop01SecSet[pSecGb];
					if(section != undefined && section != null){
						if(pIsOn){
							$('.pop_chk01 .' + section + ' .mode_box01').show();
							$('.pop_chk01 .' + section + ' .btn_chartr').trigger('click');
						}else{
							$('.pop_chk01 .' + section + ' .mode_box01').hide();
							$('.pop_chk01 .' + section + ' .btn_basic').trigger('click');	
						}
					}
				}
				*/
				if(pSecGb == "all"){
					if(pIsOn){
						$('.pop_chk01 .mode_box01').show();
						$('.pop_chk01 .div_basic .zoomBox').removeClass('left');
						
						$(".pop_chk01 .mode_box01 .switchBox").each(function(index, item){
							if(!$(item).hasClass('chartr')){
								$(item).trigger('click');
							}
						});
					}else{
						$('.pop_chk01 .mode_box01').hide();
						$('.pop_chk01 .div_basic .zoomBox').addClass('left');
						
						$(".pop_chk01 .mode_box01 .switchBox.chartr").each(function(index, item){
							$(item).trigger('click');
						});						
					}
				}else{
					var section = $catchmentAreaDataBoard.ui.pop01SecSet[pSecGb];
					if(section !== undefined && section !== null){
						if(pIsOn){
							$('.pop_chk01 .' + section + ' .mode_box01').show();
							$('.pop_chk01 .' + section + ' .div_basic .zoomBox').removeClass('left');
							
							if(!$('.pop_chk01 .' + section + ' .mode_box01 .switchBox').hasClass('chartr')){
								$('.pop_chk01 .' + section + ' .mode_box01 .switchBox').trigger('click');
							}							
						}else{
							$('.pop_chk01 .' + section + ' .mode_box01').hide();
							$('.pop_chk01 .' + section + ' .div_basic .zoomBox').addClass('left');
							
							if($('.pop_chk01 .' + section + ' .mode_box01 .switchBox').hasClass('chartr')){
								$('.pop_chk01 .' + section + ' .mode_box01 .switchBox').trigger('click');
							}							
						}
					}
				}
				//SGIS4_생활권역 끝
			},
			
			/**
			 * 
			 * @name         : settiongSrvAreaDataBoard
			 * @description  : 영향권 데이터 보드
			 * 
			 */
//			settiongSrvAreaDataBoard : function(result){
//				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
//				console.log("$catchmentAreaDataBoard.ui.settiongSrvAreaDataBoard 호출");
//				console.log(result);
//				
//				
//				/*타이틀정보*/
//				$("#titleAreaTxt_1").html($("#mapLocation_4").text());
//				//console.log( $("#statsType01 ul li").children("a")[0].innerHTML);
//				var titleTypeTxt = "";
//				if(rangeType == "stats01"){
//					titleTypeTxt = '주행시간 ' + $("#statsType01 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
//				}else if(rangeType == "stats02"){
//					titleTypeTxt = '주행거리 ' + $("#statsType01 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
//				}else{
//					titleTypeTxt = '반경 ' + $("#statsType01 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
//				}
//				$("#titleTypeTxt_1").html(titleTypeTxt);
//				
//				/*통계정보*/
//				//면적
//				$("#areaSize").html($catchmentAreaDataBoard.ui.comma(parseInt(Number(result.areaSize[0].area_size) / 1000)) + "㎢");
//				$("#sec01AreaTxt").html($("#mapLocation_4").text()+' 기준')
//				
//				//인구
//				//인구 -차트
//				var popsData = [];
//				var popsColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0', '#FEF4CC', '#FFFAE3'];
//				popsData.push({name : "0~9세 인구", y : result.pops[0].age_1_cnt});
//				popsData.push({name : "10~19세 인구", y : result.pops[0].age_2_cnt});
//				popsData.push({name : "20~29세 인구", y : result.pops[0].age_3_cnt});
//				popsData.push({name : "30~39세 인구", y : result.pops[0].age_4_cnt});
//				popsData.push({name : "40~49세 인구", y : result.pops[0].age_5_cnt});
//				popsData.push({name : "50~59세 인구", y : result.pops[0].age_6_cnt});
//				popsData.push({name : "60~69세 인구", y : result.pops[0].age_7_cnt});
//				popsData.push({name : "70~79세 인구", y : result.pops[0].age_8_cnt});
//				popsData.push({name : "80~89세 인구", y : result.pops[0].age_9_cnt});
//				popsData.push({name : "90~99세 인구", y : result.pops[0].age_10_cnt});
//				popsData.push({name : "100세이상 인구", y : result.pops[0].age_11_cnt});
//
//				$catchmentAreaDataBoard.ui.createOnePieChart('popChart', popsData, popsColor, 120, 120);
//				
//				//인구 - 텍스트
//				var popsArray = [result.pops[0].age_1_cnt, result.pops[0].age_2_cnt, result.pops[0].age_3_cnt, result.pops[0].age_4_cnt, result.pops[0].age_5_cnt, 
//					result.pops[0].age_6_cnt,result.pops[0].age_7_cnt, result.pops[0].age_8_cnt, result.pops[0].age_9_cnt, result.pops[0].age_10_cnt, result.pops[0].age_11_cnt];
//				var maxPop = Math.max.apply(null, popsArray); //최대값
//				var perPop = (maxPop / result.pops[0].tot_ppltn_cnt * 100).toFixed(1); //백분율(반올림)
//				var perPopTxt = "";
//				$.each(popsData, function(index, item){
//					if(item.y == maxPop){
//						perPopTxt = item.name;
//					}
//				});
//				$("#totPops").html($catchmentAreaDataBoard.ui.comma(result.pops[0].tot_ppltn_cnt) + '<span class="sa_txt04">명</span>');
//				$("#perPopTxt").html(perPopTxt + " 비율");
//				$("#perPop").html(perPop+'%');
//				
//				//가구
//				//가구 - 차트
//				var familyData = [];
//				var familyColor = ['#2CC8A7', '#FBBA1F'];
//				familyData.push({name : "1인 가구", y : result.family[0].family_1_cnt});
//				familyData.push({name : "비1인 가구", y : result.family[0].family_2_cnt});
//				console.log(familyData);
//				$catchmentAreaDataBoard.ui.createOnePieChart('familyChart', familyData, familyColor, 210, 140);
//				
//				//가구 - 텍스트
//				var familyArray = [result.family[0].family_1_cnt, result.family[0].family_2_cnt];
//				var maxfamily = Math.max.apply(null, familyArray); //최대값
//				var perfamily = (maxfamily / result.family[0].tot_family_cnt * 100).toFixed(1); //백분율(반올림)
//				var perfamilyTxt = "";
//				$.each(familyData, function(index, item){
//					if(item.y == maxfamily){
//						perfamilyTxt = item.name;
//					}
//				});
//				
//				$("#totFamily").html($catchmentAreaDataBoard.ui.comma(result.family[0].tot_family_cnt) + '<span class="sa_txt04">가구</span>');
//				$("#perFamilyTxt").html('전체 가구 중 '+perfamilyTxt);
//				$("#perFamily").html(perfamily+'%');
//				
//				//주택
//				//주택 - 차트
//				var houseData = [];
//				var houseColor = ['#1577D5','#6EB5F7','#34D6B4','#FBBA1F', '#2CC8A7'];	// 주택이외의 거처: #3393EE
//				houseData.push({name : "단독주택", y : result.house[0].house_1_cnt});
//				houseData.push({name : "아파트", y : result.house[0].house_2_cnt});
//				houseData.push({name : "연립주택", y : result.house[0].house_3_cnt});
//				houseData.push({name : "다세대주택", y : result.house[0].house_4_cnt});
//				houseData.push({name : "비거주용 건물 내주택", y : result.house[0].house_5_cnt});
//				//houseData.push({name : "주택이외의 거처", y : result.house[0].house_6_cnt});
//				console.log(houseData);
//				$catchmentAreaDataBoard.ui.createOnePieChart('houseChart', houseData, houseColor, 205, 140);
//				
//				//주택 - 텍스트
//				var houseArray = [result.house[0].house_1_cnt, result.house[0].house_2_cnt, result.house[0].house_3_cnt, 
//					result.house[0].house_4_cnt, result.house[0].house_5_cnt];		// result.house[0].house_6_cnt
//				var maxhouse = Math.max.apply(null, houseArray); //최대값
//				var perhouse = (maxhouse / result.house[0].tot_house_cnt * 100).toFixed(1); //백분율(반올림)
//				var perhouseTxt = "";
//				$.each(houseData, function(index, item){
//					if(item.y == maxhouse){
//						perhouseTxt = item.name;
//					}
//				});
//				
//				$("#totHouse").html($catchmentAreaDataBoard.ui.comma(result.house[0].tot_house_cnt) + '<span class="sa_txt04">개</span>');
//				$("#perHouseTxt").html('전체 주택 중 '+perhouseTxt);
//				$("#perHouse").html(perhouse+'%');
//
//				//사업체
//				//사업체 - 차트
//				var top3Color = ['#C5D3F6', '#FFAA01', '#FED747'];
//				var tempColor = ['#E9E9E9'];
//				var coprDataTemp = deepCopy(result.copr);
//				var coprData = [];
//				$.each(coprDataTemp, function(index, item){
//					coprData.push({name : item.ksic_3_nm , y : item.corp_cnt});
//				});
//				//top3
//				var top3_coprData = new Array();
//				for(var i=0; i < 3; i++){
//					top3_coprData[i] = coprData[i];
//				}
//				var top3Coprcnt = 0;
//				$.each(top3_coprData, function(index, item){
//					top3Coprcnt += item.y;
//				});
//				//top3 나머지
//				var tempCoprcnt = 0;
//				$.each(coprData, function(index, item){
//					if(index > 3){
//						tempCoprcnt += item.y;
//					}
//				});
//				var tempCoprData = [{name : '기타 사업체', y : tempCoprcnt}];
//				$catchmentAreaDataBoard.ui.createTwoPieChart('coprChart', tempCoprData, tempColor, top3_coprData, top3Color, 210, 170);
//				
//				//사업체 - 텍스트
//				var totCoprCnt = 0;
//					$.each(coprData, function(index, item){
//						totCoprCnt += item.y;
//					});
//				var perTotCopr_1 = (top3_coprData[0].y / totCoprCnt  * 100).toFixed(1); //총사업체수 백분율(반올림)
//				var perCopr_1 = ( top3_coprData[0].y / top3Coprcnt * 100).toFixed(1); //top1 사업체수 백분율
//				
//				var perTotCopr_2 = (top3_coprData[1].y / totCoprCnt * 100).toFixed(1); //총사업체수 백분율(반올림)
//				var perCopr_2 = (top3_coprData[1].y / top3Coprcnt * 100).toFixed(1); //top2 사업체수 백분율
//				
//				var perTotCopr_3 = (top3_coprData[2].y / totCoprCnt * 100).toFixed(1); //총사업체수 백분율(반올림)
//				var perCopr_3 = (top3_coprData[2].y / top3Coprcnt * 100).toFixed(1); //top3 사업체수 백분율
//
//				
//				$("#top1_copr_txt").html('1. '+ top3_coprData[0].name + '(전체의'+perTotCopr_1+'%, TOP3의'+perCopr_1+'%)'); //범례 TOP1
//				$("#top2_copr_txt").html('2. '+ top3_coprData[1].name + '(전체의'+perTotCopr_2+'%, TOP3의'+perCopr_2+'%)'); //범례 TOP2
//				$("#top3_copr_txt").html('3. '+ top3_coprData[2].name + '(전체의'+perTotCopr_3+'%, TOP3의'+perCopr_3+'%)'); //범례 TOP3
//				$("#totCopr").html($catchmentAreaDataBoard.ui.comma(totCoprCnt) + '<span class="sa_txt04">개</span>'); //총사업체수
//
//			
//				//종사자
//				//종사자 - 차트
//				var workerDataTemp = deepCopy(result.copr);
//				var workerData = [];
//				$.each(workerDataTemp, function(index, item){
//					workerData.push({name : item.ksic_3_nm , y : item.employee_cnt});
//				});
//				//top3
//				var top3_workerData  = new Array();
//				workerData = $catchmentAreaDataBoard.ui.sortData(workerData, "y");
//				for(var i=0; i < 3; i++){
//					top3_workerData[i] = workerData[i];
//				}
//				var top3Workercnt = 0;
//				$.each(top3_workerData, function(index, item){
//					top3Workercnt += item.y;
//				});
//				//top3 나머지
//				var tempWorkercnt = 0;
//				$.each(workerData, function(index, item){
//					if(index > 3){
//						tempWorkercnt += item.y;
//					}
//				});
//				var tempWorkerData = [{name : '기타 사업체', y : tempWorkercnt}];
//				$catchmentAreaDataBoard.ui.createTwoPieChart('workerChart', tempWorkerData, tempColor, top3_workerData, top3Color, 210, 170);
//				
//				//종사자 - 텍스트
//				var totWorkercnt = 0;
//				$.each(workerData, function(index, item){
//					totWorkercnt += item.y;
//				});
//				var perTotWorker_1 = (top3_workerData[0].y / totWorkercnt  * 100).toFixed(1); //총사업체수 백분율(반올림)
//				var perWorker_1 = ( top3_workerData[0].y / top3Workercnt * 100).toFixed(1); //top1 사업체수 백분율
//				
//				var perTotWorker_2 = (top3_workerData[1].y / totWorkercnt * 100).toFixed(1); //총사업체수 백분율(반올림)
//				var perWorker_2 = (top3_workerData[1].y / top3Workercnt * 100).toFixed(1); //top2 사업체수 백분율
//				
//				var perTotWorker_3 = (top3_workerData[2].y / totWorkercnt * 100).toFixed(1); //총사업체수 백분율(반올림)
//				var perWorker_3 = (top3_workerData[2].y / top3Workercnt * 100).toFixed(1); //top3 사업체수 백분율
//				
//				$("#top1_worker_txt").html('1. '+ top3_workerData[0].name + '(전체의'+perTotWorker_1+'%, TOP3의'+perWorker_1+'%)');
//				$("#top2_worker_txt").html('2. '+ top3_workerData[1].name + '(전체의'+perTotWorker_2+'%, TOP3의'+perWorker_2+'%)');
//				$("#top3_worker_txt").html('3. '+ top3_workerData[2].name + '(전체의'+perTotWorker_3+'%, TOP3의'+perWorker_3+'%)');
//				var totWorkercnt = 0;
//				$.each(workerData, function(index, item){
//					totWorkercnt += item.y;
//				});
//				$("#totWorker").html($catchmentAreaDataBoard.ui.comma(totWorkercnt) + '<span class="sa_txt04">명</span>');//총종사자수
//			},

			/**
			 * 
			 * @name         : setServiceAreaHeaderData
			 * @description  : 영향권 데이터 보드의 헤더정보를 표시한다.
			 * 
			 */
			setServiceAreaHeaderData : function(){
				$("#titleAreaTxt_1").html($("#mapLocation_4").text());
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				// SGIS4_1025_생활권역_임의영역 시작
				var rndmFlag = $catchmentAreaLeftMenu.ui.rndmFlag;
				var scopeType = $('input[name=rndscopeType]:checked').val(); // 선택된 기준구분의 value값 // SGIS4_생활권역_임의영역 수정
				var rndmScopeInfo = $catchmentAreaLeftMenu.ui.rndmScopeInfo[scopeType];
				var titleTypeTxt = "";
				if(rndmFlag) {
					titleTypeTxt = rndmScopeInfo.s_class_cd_nm.split(' ')[0]+' ';
				} else {
					if(rangeType == "stats01"){
						titleTypeTxt = '주행시간 ';
					}else if(rangeType == "stats02"){
						titleTypeTxt = '주행거리 ';
					}else if(rangeType == "stats03"){
						titleTypeTxt = '반경 ';
					}
				}
				// SGIS4_1025_생활권역_임의영역 끝
				titleTypeTxt = titleTypeTxt + $("#statsType01 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
				$("#titleTypeTxt_1").html(titleTypeTxt);
				$("#sec01RangeTxt").html(titleTypeTxt + ' 영역 면적');
				$("#sec01GridTxt").html('');
			},

			/**
			 * 
			 * @name         : setServiceAreaStatisticsData
			 * @description  : 영향권 통계정보 표출(데이터 보드)
			 * 
			 */
			setServiceAreaStatisticsData : function(result, options){
				$catchmentAreaMain.ui.isReportShow = true;
				$catchmentAreaMain.ui.isReportType = "srv";
				$catchmentAreaDataBoard.ui.statDataOption = options;
				
				var params = options.params;
				if(params.workGb == "areaSize"){
					//면적
					$("#areaSize").html($catchmentAreaDataBoard.ui.comma((Number(result.areaSize[0].area_size) / 1000000).toFixed(2)) + "㎢");
					$("#sec01AreaTxt").html($("#mapLocation_4").text()+' 기준');					
				}
				
				//$("#sec01GridTxt").html('통계자료 : ' + options.params.grid_level + ' 격자 기반');
				$("#sec01GridTxt").html('(' + options.params.grid_level + ' 격자 기반)');

				if(params.workGb == "pops" || params.workGb == "s3"){
					if(result.pops[0] === null || result.pops[0].popsTotOgl == 0){
						$("#manPerBar").css("height", "100%");
						$("#womanPerBar").css("height", "86%");
						//SGIS4_생활권역 시작
						$catchmentAreaDataBoard.ui.resetAreaDataboard("pops", "B", true, true);
						//SGIS4_생활권역 끝
					}else{
						$(".pop_statistics.pop_chk01 .sec02 .div_block").hide();
						
						//인구 - 차트
						var popsData = [];
						//var popsColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0', '#FEF4CC', '#FFFAE3'];
						var popsColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0'];
						popsData.push({name : "0~9세 인구", y : result.pops[0].age_1_cnt});
						popsData.push({name : "10~19세 인구", y : result.pops[0].age_2_cnt});
						popsData.push({name : "20~29세 인구", y : result.pops[0].age_3_cnt});
						popsData.push({name : "30~39세 인구", y : result.pops[0].age_4_cnt});
						popsData.push({name : "40~49세 인구", y : result.pops[0].age_5_cnt});
						popsData.push({name : "50~59세 인구", y : result.pops[0].age_6_cnt});
						popsData.push({name : "60~69세 인구", y : result.pops[0].age_7_cnt});
						popsData.push({name : "70~79세 인구", y : result.pops[0].age_8_cnt});
						popsData.push({name : "80세 이상 인구", y : result.pops[0].age_9_cnt});
	//					popsData.push({name : "90~99세 인구", y : result.pops[0].age_10_cnt});
	//					popsData.push({name : "100세이상 인구", y : result.pops[0].age_11_cnt});
		
						$catchmentAreaDataBoard.ui.createOnePieChart('popChart', popsData, popsColor, 130, 130);
					
						//인구 - 텍스트
						var totPpltnCnt = result.pops[0].tot_ppltn_cnt;
						var totPpltnCnt2 = result.pops[0].tot_ppltn_cnt2;
						var totPpltnCntOgl = result.pops[0].popsTotOgl;
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
						//$("#totPops").html($catchmentAreaDataBoard.ui.comma(totPpltnCnt) + '<span class="sa_txt04">명</span>');
						$("#totPops").html($catchmentAreaDataBoard.ui.comma(totPpltnCntOgl) + '<span class="sa_txt04">명</span>');
						$("#totPops").attr('data-total', totPpltnCnt);
						//SGIS4_생활권역 시작
						$("#totPops").attr('data-total-ogl', totPpltnCntOgl);												
						$("#perPopTxt").html('전체 인구 중 '+perPopTxt);
						//$("#perPop").html(perPop+'%');
						$("#perPop").html($catchmentAreaDataBoard.ui.comma(maxPop)+'명');
						//SGIS4_생활권역 끝
						
						var manCnt = result.pops[0].man_cnt;
						var womanCnt = result.pops[0].woman_cnt;
						$("#manTtlCnt").html($catchmentAreaDataBoard.ui.comma(manCnt) + "명");
						$("#womanTtlCnt").html($catchmentAreaDataBoard.ui.comma(womanCnt) + "명");
						
						// 여자 인구 대비 남자 인구 비율(기존)
	//					var manPer = (manCnt / womanCnt * 100);
	//					$("#manPer").html(manPer.toFixed(2) + '%');
	//					
	//					if(manPer > 100){						
	//						$("#manPerBar").css("height", "100%");
	//						$("#womanPerBar").css("height", (womanCnt / manCnt * 100 * 0.86).toFixed(0) + "%");						
	//					}else if(manPer < 100){
	//						$("#manPerBar").css("height", manPer.toFixed(0) + "%");
	//						$("#womanPerBar").css("height", "86%");						
	//					}else{
	//						$("#manPerBar").css("height", "100%");
	//						$("#womanPerBar").css("height", "86%");
	//					}
						
						// 전체 인구에 대한 남여 인구 비율(변경)
						var manPer = (manCnt / totPpltnCnt2 * 100).toFixed(2);
						var womanPer = (womanCnt / totPpltnCnt2 * 100).toFixed(2);
						if((manPer + womanPer) > 100){
							if(manPer > womanPer){
								womanPer = womanPer - ((manPer + womanPer) - 100);
							}else if(womanPer > manPer){
								manPer = manPer - ((manPer + womanPer) - 100);
							}
						}
						$("#manPer").html(manPer + '%');
						$("#womanPer").html(womanPer + '%');
	
						if(manCnt > womanCnt){
							$("#manPerBar").css("height", "100%");
							$("#womanPerBar").css("height", (womanCnt / manCnt * 100 * 0.86).toFixed(0) + "%");						
						}else if(manCnt < womanCnt){
							$("#manPerBar").css("height", (manCnt / womanCnt * 100).toFixed(0) + "%");
							$("#womanPerBar").css("height", "86%");						
						}else{
							$("#manPerBar").css("height", "100%");
							$("#womanPerBar").css("height", "86%");
						}
						
						$("#popBaseYear").html('(' + params.base_year + '년 기준)');
						
						// 인구 통계정보만 도형 툴팁용으로 사용
						var param = {};
						param.rangeType = params.rangeType;
						param.rangeVal = params.rangeVal;
						param.workGb = params.workGb;
						param.statsYear = params.base_year;
						param.statsVal = totPpltnCntOgl;
						$catchmentAreaObj.addAttrToGeoInfo(param);
					}
				}
				
				if(params.workGb == "family" || params.workGb == "s3"){
					if(result.family[0] === null || result.family[0].familyTotOgl == 0){
						//SGIS4_생활권역 시작
						$catchmentAreaDataBoard.ui.resetAreaDataboard("family", "B", true, true);
						//SGIS4_생활권역 끝
					}else{
						$(".pop_statistics.pop_chk01 .sec03 .div_block").hide();
						
						//가구 - 차트
						var familyData = [];
						//var familyColor = ['#FBBA1F', '#2CC8A7'];
						//SGIS4_1025_생활권역 시작
						var familyColor = ['#ED5980', '#ffaa01', '#7DB6E9'];						
						familyData.push({name : "친족 가구", y : result.family[0].family_3_cnt});
						familyData.push({name : "1인 가구", y : result.family[0].family_1_cnt});
						familyData.push({name : "비친족 가구", y : result.family[0].family_2_cnt});						
						//SGIS4_1025_생활권역 끝
						//console.log(familyData);
						$catchmentAreaDataBoard.ui.createOnePieChart('familyChart', familyData, familyColor, 210, 140);
						
						//가구 - 텍스트
						var familyArray = [result.family[0].family_1_cnt, result.family[0].family_2_cnt, result.family[0].family_3_cnt];
						var maxfamily = Math.max.apply(null, familyArray); //최대값
						var perfamily = (maxfamily / result.family[0].tot_family_cnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perfamily)){
							perfamily = 0;
						}
						var perfamilyTxt = "";
						$.each(familyData, function(index, item){
							if(item.y == maxfamily){
								perfamilyTxt = item.name;
							}
						});
						
						//$("#totFamily").html($catchmentAreaDataBoard.ui.comma(result.family[0].tot_family_cnt) + '<span class="sa_txt04">가구</span>');
						$("#totFamily").html($catchmentAreaDataBoard.ui.comma(result.family[0].familyTotOgl) + '<span class="sa_txt04">가구</span>');
						$("#totFamily").attr('data-total', result.family[0].tot_family_cnt);
						//SGIS4_생활권역 시작
						$("#totFamily").attr('data-total-ogl', result.family[0].familyTotOgl);												
						$("#perFamilyTxt").html('전체 가구 중 '+perfamilyTxt);
						//$("#perFamily").html(perfamily+'%');
						$("#perFamily").html($catchmentAreaDataBoard.ui.comma(maxfamily)+'가구');
						//SGIS4_생활권역 끝	
						
						$("#familyBaseYear").html('(' + params.base_year + '년 기준)');						
					}
				}
				
				if(params.workGb == "house" || params.workGb == "s3"){
					if(result.house[0] === null || result.house[0].houseTotOgl  == 0){
						//SGIS4_생활권역 시작
						$catchmentAreaDataBoard.ui.resetAreaDataboard("house", "B", true, true);
						//SGIS4_생활권역 끝
					}else{
						$(".pop_statistics.pop_chk01 .sec04 .div_block").hide();
						
						//주택 - 차트
						var houseData = [];
						//var houseColor = ['#1577D5','#6EB5F7','#34D6B4','#FBBA1F', '#2CC8A7','#3393EE'];
						var houseColor = ['#7DB6E9','#ffaa01','#93EC85','#fed747', '#35908F'];		// 주택이외의 거처: #ED5980
						houseData.push({name : "단독주택", y : result.house[0].house_1_cnt});
						houseData.push({name : "아파트", y : result.house[0].house_2_cnt});
						houseData.push({name : "연립주택", y : result.house[0].house_3_cnt});
						houseData.push({name : "다세대주택", y : result.house[0].house_4_cnt});
						houseData.push({name : "비거주용 건물 내주택", y : result.house[0].house_5_cnt});
						//houseData.push({name : "주택이외의 거처", y : result.house[0].house_6_cnt});
						//console.log(houseData);
						$catchmentAreaDataBoard.ui.createOnePieChart('houseChart', houseData, houseColor, 205, 140);
						
						//주택 - 텍스트
						var houseArray = [result.house[0].house_1_cnt, result.house[0].house_2_cnt, result.house[0].house_3_cnt, 
							result.house[0].house_4_cnt, result.house[0].house_5_cnt];		// result.house[0].house_6_cnt
						var maxhouse = Math.max.apply(null, houseArray); //최대값
						var perhouse = (maxhouse / result.house[0].tot_house_cnt * 100).toFixed(1); //백분율(반올림)
						if(isNaN(perhouse)){
							perhouse = 0;
						}
						var perhouseTxt = "";
						$.each(houseData, function(index, item){
							if(item.y == maxhouse){
								perhouseTxt = item.name;
							}
						});
						
						//$("#totHouse").html($catchmentAreaDataBoard.ui.comma(result.house[0].tot_house_cnt) + '<span class="sa_txt04">호</span>');
						$("#totHouse").html($catchmentAreaDataBoard.ui.comma(result.house[0].houseTotOgl) + '<span class="sa_txt04">호</span>');
						$("#totHouse").attr('data-total', result.house[0].tot_house_cnt);
						//SGIS4_생활권역 시작
						$("#totHouse").attr('data-total-ogl', result.house[0].houseTotOgl);													
						$("#perHouseTxt").html('전체 주택 중 '+perhouseTxt);
						//$("#perHouse").html(perhouse+'%');
						$("#perHouse").html($catchmentAreaDataBoard.ui.comma(maxhouse)+'호');
						//SGIS4_생활권역 끝
						
						$("#houseBaseYear").html('(' + params.base_year + '년 기준)');
					}
				}

				//SGIS4_생활권역 시작
				if(params.workGb == "copr"){
					var colorPalette = ['#D66B44','#ffaa01','#fed747','#D8C8B2','#0B2E5D','#2A7AC1','#7DB6E9','#91e8e1','#CBE9F0','#B82647','#ED5980','#D584B9','#F1B49A','#35908F','#6AB048','#90ed7d','#bdce3b','#6A5BA8','#8085e9','#434348','#7A7D7F'];
					var isRandomColor = false;
					
					//사업체&종사자 공통
					var coprDataTemp = deepCopy(result.copr);
					var coprData = [];
					var coprChartData = [];
					var totCoprCntOgl = 0;
					var totCoprCntForCalc;
					var workerData = [];
					var workerChartData = [];
					var totWorkerCntOgl = 0;
					var totWorkerCntForCalc;
					var clrIdx = 0;

					$.each(coprDataTemp, function(index, item){
						if(item.name == "전체"){							
							totCoprCntOgl = item.corp_cnt;
							totWorkerCntOgl = item.employee_cnt;
						}else if(item.name == "bsca_전체"){							
							totCoprCntForCalc = item.corp_cnt;
							totWorkerCntForCalc = item.employee_cnt;
						}else{
							coprData.push({name : item.name, y : item.corp_cnt, clr : clrIdx});
							workerData.push({name : item.name, y : item.employee_cnt, clr : clrIdx});
						}
						
						clrIdx = clrIdx + 1;
						if(clrIdx === colorPalette.length){
							clrIdx = 0;
						}
					});
					
					//사업체
					var totCoprCnt = 0;
					if(totCoprCntOgl === undefined || totCoprCntOgl === null){
						totCoprCntOgl = 0;
					}
					if(totCoprCntForCalc === undefined || totCoprCntForCalc === null){
						totCoprCntForCalc = totCoprCntOgl;	//바꾸지 말것
					}
					totCoprCnt = totCoprCntForCalc;		//totCoprCnt = totCoprCntOgl;
					
					coprData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;						
					});

					var coprLoopCnt = coprData.length; 
					if(coprLoopCnt > 0){
						$(".pop_statistics.pop_chk01 .sec05 .div_block").hide();
						
						var coprChartColor = new Array();						
						var top3CoprLoopCnt = (coprLoopCnt >= 3) ? 3 : coprLoopCnt;
						var top7CoprLoopCnt = (coprLoopCnt >= 3) ? 3 : coprLoopCnt;		// 7 -> 3
						var top3Coprcnt = 0;
						var top7Coprcnt = 0;
						for(var i=0; i < top7CoprLoopCnt; i++){		// top7 까지만
							if(i < top3CoprLoopCnt){
								// top3 합
								top3Coprcnt += coprData[i].y;
							}
							top7Coprcnt += coprData[i].y;
							coprChartData.push(coprData[i]);
							if(isRandomColor){
								coprChartColor.push(colorPalette[coprData[i].clr]);
							}else{
								coprChartColor.push(colorPalette[i]);								
							}
						}
						if(totCoprCnt < top3Coprcnt){
							// 머시기로 구한 총합이 탑3합보다 작으면  
							totCoprCnt = top3Coprcnt;
						}
						if(totCoprCnt < top7Coprcnt){
							// 머시기로 구한 총합이 탑7합보다 작으면  
							totCoprCnt = top7Coprcnt;
						}
						
						// top7 나머지
						var etcCoprCnt = totCoprCnt - top7Coprcnt;
						coprChartData.push({name : '기타 사업체', y : etcCoprCnt});
						coprChartColor.push('#E9E9E9');

						$catchmentAreaDataBoard.ui.createOnePieChart('coprChart', coprChartData, coprChartColor, 210, 170);
						
						// top3 범례 문구
						var perTotCopr, perCopr, eleCopr;
						var $coprLgnd = $(".pop_statistics.pop_chk01 .sec05 .div_basic .txt_box03");
						for(var i=0; i < 3; i++){
							eleCopr = "top" + (i+1) + "_copr_txt";
							if(i < top3CoprLoopCnt){
								perTotCopr = (coprData[i].y / totCoprCnt  * 100).toFixed(1);
								if(isNaN(perTotCopr) || !isFinite(perTotCopr)){
									perTotCopr = 0;
								}
								perCopr = ( coprData[i].y / top3Coprcnt * 100).toFixed(1);
								if(isNaN(perCopr) || !isFinite(perCopr)){
									perCopr = 0;
								}
							
								//$("#" + eleCopr).html((i+1) + '. '+ coprData[i].name + ' (전체의 '+perTotCopr+'%, TOP3의 '+perCopr+'%)');
								$("#" + eleCopr).html((i+1) + '. '+ coprData[i].name + ' (전체 대비 '+perTotCopr+' %)');
								if(isRandomColor){
									$coprLgnd.find('.cr0' + (i+1)).css("background", colorPalette[coprData[i].clr]);
								}else{
									$coprLgnd.find('.cr0' + (i+1)).css("background", colorPalette[i]);
								}
							}else{
								$("#" + eleCopr).html((i+1) + '. 사업체 통계 없음');
								$coprLgnd.find('.cr0' + (i+1)).css("background", "#d4d4d4");
							}
						}

						$("#totCopr").html($catchmentAreaDataBoard.ui.comma(totCoprCntOgl) + '<span class="sa_txt04">개</span>'); //총사업체수
						$("#totCopr").attr('data-total', totCoprCnt);
						$("#totCopr").attr('data-total-ogl', totCoprCntOgl);
													
//						var top3CoprPerAmongAll = (top3Coprcnt / totCoprCnt * 100).toFixed(1);
//						if(isNaN(top3CoprPerAmongAll) || !isFinite(top3CoprPerAmongAll)){
//							top3CoprPerAmongAll = 0;
//						}
//						$("#top3CoprPerAmongAll").html(top3CoprPerAmongAll + "%");
						$("#top3CoprPerAmongAll").html($catchmentAreaDataBoard.ui.comma(top3Coprcnt) + "개");
						
						$("#coprBaseYear").html('(' + params.copr_base_year + '년 기준)');
					}else{
						// 화면 정리
						$catchmentAreaDataBoard.ui.resetAreaDataboard("copr", "B", true, true);
					}

					//종사자
					var totWorkercnt = 0;
					if(totWorkerCntOgl === undefined || totWorkerCntOgl === null){
						totWorkerCntOgl = 0;
					}
					if(totWorkerCntForCalc === undefined || totWorkerCntForCalc === null){
						totWorkerCntForCalc = totWorkerCntOgl;	//바꾸지 말것
					}
					totWorkercnt = totWorkerCntForCalc;		//totWorkercnt = totWorkerCntOgl;					

					workerData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;						
					});

					var workerLoopCnt = workerData.length;
					if(workerLoopCnt > 0){
						$(".pop_statistics.pop_chk01 .sec06 .div_block").hide();
						
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
							if(isRandomColor){
								workerChartColor.push(colorPalette[workerData[i].clr]);
							}else{
								workerChartColor.push(colorPalette[i]);
							}
						}
						if(totWorkercnt < top3Workercnt){
							// 머시기로 구한 총합이 탑3합보다 작으면  
							totWorkercnt = top3Workercnt;
						}
						if(totWorkercnt < top7Workercnt){
							// 머시기로 구한 총합이 탑7합보다 작으면  
							totWorkercnt = top7Workercnt;
						}

						// top7 나머지
						var etcWorkerCnt = totWorkercnt - top7Workercnt;
						workerChartData.push({name : '기타 사업체', y : etcWorkerCnt});
						workerChartColor.push('#E9E9E9');
						
						$catchmentAreaDataBoard.ui.createOnePieChart('workerChart', workerChartData, workerChartColor, 210, 170);

						// top3 범례 문구
						var perTotWorker, perWorker, eleWorker;
						var $workerLgnd = $(".pop_statistics.pop_chk01 .sec06 .div_basic .txt_box03");
						for(var i=0; i < 3; i++){
							eleWorker = "top" + (i+1) + "_worker_txt"; 
							if(i < top3WorkerLoopCnt){
								perTotWorker = (workerData[i].y / totWorkercnt  * 100).toFixed(1);
								if(isNaN(perTotWorker) || !isFinite(perTotWorker)){
									perTotWorker = 0;
								}
								perWorker = ( workerData[i].y / top3Workercnt * 100).toFixed(1);	
								if(isNaN(perWorker) || !isFinite(perWorker)){
									perWorker = 0;
								}
							
								//$("#" + eleWorker).html((i+1) + '. '+ workerData[i].name + ' (전체의 '+perTotWorker+'%, TOP3의 '+perWorker+'%)');
								$("#" + eleWorker).html((i+1) + '. '+ workerData[i].name + ' (전체 대비 '+perTotWorker+' %)');
								if(isRandomColor){
									$workerLgnd.find('.cr0' + (i+1)).css("background", colorPalette[workerData[i].clr]);
								}else{
									$workerLgnd.find('.cr0' + (i+1)).css("background", colorPalette[i]);
								}
							}else{
								$("#" + eleWorker).html((i+1) + '. 종사자 통계 없음');
								$workerLgnd.find('.cr0' + (i+1)).css("background", "#d4d4d4");
							}
						}

						$("#totWorker").html($catchmentAreaDataBoard.ui.comma(totWorkerCntOgl) + '<span class="sa_txt04">명</span>');//총종사자수
						$("#totWorker").attr('data-total', totWorkercnt);
						$("#totWorker").attr('data-total-ogl', totWorkerCntOgl);
												
//						var top3WorkerPerAmongAll = (top3Workercnt / totWorkercnt * 100).toFixed(1);
//						if(isNaN(top3WorkerPerAmongAll) || !isFinite(top3WorkerPerAmongAll)){
//							top3WorkerPerAmongAll = 0;
//						}
//						$("#top3WorkerPerAmongAll").html(top3WorkerPerAmongAll + "%");
						$("#top3WorkerPerAmongAll").html($catchmentAreaDataBoard.ui.comma(top3Workercnt) + "명");
						
						$("#workerBaseYear").html('(' + params.copr_base_year + '년 기준)');
					}else{
						// 화면 정리
						$catchmentAreaDataBoard.ui.resetAreaDataboard("employee", "B", true, true);
					}			
				}
				//SGIS4_생활권역 끝
			},

			/**
			 * 
			 * @name         : setServiceAreaHeaderData
			 * @description  : 영향권 데이터 보드의 헤더정보를 표시한다.
			 * 
			 */
//			setServiceAreaHeaderData : function(){
//				$("#titleAreaTxt_1").html($("#mapLocation_4").text());
//				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
//				var titleTypeTxt = "";
//				if(rangeType == "stats01"){
//					titleTypeTxt = '주행시간 ' + $("#statsType01 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
//				}else if(rangeType == "stats02"){
//					titleTypeTxt = '주행거리 ' + $("#statsType02 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
//				}else if(rangeType == "stats03"){
//					titleTypeTxt = '반경 ' + $("#statsType03 ul li").children("a")[$catchmentAreaDataBoard.ui.selectIndex-1].innerHTML;
//				}
//				$("#titleTypeTxt_1").html(titleTypeTxt);				
//			},

			/**
			 * 
			 * @name         : setCharacteristicsStatsData
			 * @description  : 특성별 통계정보 표출(데이터 보드)
			 * 
			 */
			setCharacteristicsStatsData : function(pData, pOpt){
				
				var sData = pData;
				var params = pOpt.params;
				var sItems;
				var sItem;
				
				//인구
				if(sData.hasOwnProperty('pops')){
					sItems = sData.pops;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totPops").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){							
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["ppltn_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
									
									if(itemCnt > totCnt){	// 1개뿐인 표출 항목이 표출 총값보다 크면
										itemCnt = totCnt;
									}								
	
									$catchmentAreaDataBoard.ui.createSolidGaugeChart('popCChart', itemCnt, totCnt, 210, 140);
									$("#numPopC").html($catchmentAreaDataBoard.ui.comma(itemCnt) + '명');
									
									var ratio = (itemCnt / totCnt * 100).toFixed(1);
									if(isNaN(ratio)){
										ratio = 0;
									}									
									$("#perPopC").html(ratio + '%');								
								}
							}
						}
					}

					var itemNm = params["pops_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#perPopCTxt").html(itemNm);
					
					$catchmentAreaDataBoard.ui.adjustPop01Board('pops', true);
					
					$catchmentAreaDataBoard.ui.resetAreaDataboard("pops", "C", isClear, isBlockShow);
					//SGIS4_생활권역 끝
				}
				
				//가구
				if(sData.hasOwnProperty('family')){
					sItems = sData.family;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totFamily").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["family_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}

									$catchmentAreaDataBoard.ui.createSolidGaugeChart('familyCChart', itemCnt, totCnt, 210, 140);
									$("#numFamilyC").html($catchmentAreaDataBoard.ui.comma(itemCnt) + '가구');					
									
									var ratio = (itemCnt / totCnt * 100).toFixed(1);
									if(isNaN(ratio)){
										ratio = 0;
									}									
									$("#perFamilyC").html(ratio + '%');								
								}
							}
						}
					}

					var itemNm = params["family_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#perFamilyCTxt").html(itemNm);
					
					$catchmentAreaDataBoard.ui.adjustPop01Board('family', true);
					
					$catchmentAreaDataBoard.ui.resetAreaDataboard("family", "C", isClear, isBlockShow);
					//SGIS4_생활권역 끝					
				}
				
				//주택
				if(sData.hasOwnProperty('house')){
					sItems = sData.house;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totHouse").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["resid_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}

									$catchmentAreaDataBoard.ui.createSolidGaugeChart('houseCChart', itemCnt, totCnt, 210, 140);
									$("#numHouseC").html($catchmentAreaDataBoard.ui.comma(itemCnt) + '호');
									
									var ratio = (itemCnt / totCnt * 100).toFixed(1);
									if(isNaN(ratio)){
										ratio = 0;
									}									
									$("#perHouseC").html(ratio + '%');	
								}
							}
						}
					}

					var itemNm = params["house_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#perHouseCTxt").html(itemNm);
					
					$catchmentAreaDataBoard.ui.adjustPop01Board('house', true);
					
					$catchmentAreaDataBoard.ui.resetAreaDataboard("house", "C", isClear, isBlockShow);
					//SGIS4_생활권역 끝				
				}
				
				//사업체
				if(sData.hasOwnProperty('copr')){
					sItems = sData.copr;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totCopr").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["copr_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}

									$catchmentAreaDataBoard.ui.createSolidGaugeChart('coprCChart', itemCnt, totCnt, 210, 140);
									$("#numCoprC").html($catchmentAreaDataBoard.ui.comma(itemCnt) + '개');
									
									var ratio = (itemCnt / totCnt * 100).toFixed(1);
									if(isNaN(ratio)){
										ratio = 0;
									}									
									$("#perCoprC").html(ratio + '%');	
								}
							}
						}
					}

					var itemNm = params["copr_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#perCoprCTxt").html(itemNm);
					
					$catchmentAreaDataBoard.ui.adjustPop01Board('copr', true);
					
					$catchmentAreaDataBoard.ui.resetAreaDataboard("copr", "C", isClear, isBlockShow);
					//SGIS4_생활권역 끝
				}
				
				//종사자
				if(sData.hasOwnProperty('employee')){
					sItems = sData.employee;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totWorker").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["employee_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}

									$catchmentAreaDataBoard.ui.createSolidGaugeChart('workerCChart', itemCnt, totCnt, 210, 140);
									$("#numWorkerC").html($catchmentAreaDataBoard.ui.comma(itemCnt) + '명');
									
									var ratio = (itemCnt / totCnt * 100).toFixed(1); //백분율(반올림)
									if(isNaN(ratio)){
										ratio = 0;
									}									
									$("#perWorkerC").html(ratio + '%');
								}
							}
						}
					}

					var itemNm = params["employee_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#perWorkerCTxt").html(itemNm);					
					
					$catchmentAreaDataBoard.ui.adjustPop01Board('employee', true);
					
					$catchmentAreaDataBoard.ui.resetAreaDataboard("employee", "C", isClear, isBlockShow);
					//SGIS4_생활권역 끝			
				}
			},

			/**
			 * 
			 * @name         : settiongGridDataBoard
			 * @description  : 격자 데이터 보드
			 * 
			 */
			settiongGridDataBoard : function(result, options){
				$catchmentAreaMain.ui.isReportShow = true;
				$catchmentAreaMain.ui.isReportType = "grid";
				$catchmentAreaDataBoard.ui.statDataOption = options;
				
				//$catchmentAreaDataBoard.ui.clearSelectGrid();
				this.clearSelectGridDataBord();
				
				var type = options.params.statType;
				var unit = options.params.unit;
				var coprType = options.params.grdstatType;
   			 	var base_year = options.params.base_year;		//$catchmentAreaLeftMenu.ui.getBaseYear();
   			 	var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
   			 	
   			 	/*타이틀정보*/
				$("#titleAreaTxt_2").html($("#mapLocation_4").text());
				//console.log( $("#statsType01 ul li").children("a")[0].innerHTML);
				var titleTypeTxt = "";
				
				if(rangeType == "stats01"){
					titleTypeTxt = '주행시간 ' + $("#statsType02 ul").children(".active").children("a")[0].innerHTML;
				}else if(rangeType == "stats02"){
					titleTypeTxt = '주행거리 ' + $("#statsType02 ul").children(".active").children("a")[0].innerHTML;
				}else{
					titleTypeTxt = '반경 ' + $("#statsType02 ul").children(".active").children("a")[0].innerHTML;
				}
				$("#titleTypeTxt_2").html(titleTypeTxt);
				$("#titleYearTxt_2").html(options.params.base_year + "년");
				
				/*데이터보드 정보*/
				//var grid_totSum_txt = "격자 내 전체 ";
				//var grid_totAvg_txt = "격자 당 평균 ";
				var statSuffix = "";
				var statCalMetd = "합계";
				/*
				if(type == "pops"){//인구
					statSuffix = "인구 수";
				}else if(type == "family"){//가구
					statSuffix = "가구 수";
				}else if(type == "house"){//주택
					statSuffix = "주택 수";
				}else if(type == "copr"){//사업체
					if(coprType == "copr"){
						statSuffix = "사업체 수";
					}else{
						statSuffix = "종사자 수";
					}
				}else if(type == "idlv"){//공시지가
					statSuffix = "공시지가";
				}
				*/
				statSuffix = this.getTypeUnit(type,coprType);
				//grid_totSum_txt += statSuffix;
				//grid_totAvg_txt += statSuffix;
				
				//$("#grid_totSum_txt").html(grid_totSum_txt);
				//$("#grid_totAvg_txt").html(grid_totAvg_txt);
				$("#grid_statCalcMethod_txt").html(statCalMetd + "(" + unit + ")");
				$("#grid_bordRange_txt").html(result.itgSgg);

				if(type == "idlv"){
					$("#grid_statTitle_txt").html(statSuffix);
					$("#grid_statTitle_txt2").html(statSuffix);
				}else{
					$("#grid_statTitle_txt").html("[" + options.params.schCondNm + "]");
					$("#grid_statTitle_txt2").html("[" + options.params.schCondNm + "]");
				}
				
				$("#gird_graph_schCond").html(options.params.schCondNm);
				
				var gridCnt, gridArea;
				/*
				$.each(result.gridStat, function(index, item){
					if(item.base_year == base_year){
						if(type == "pops"){
							$("#grid_totSum").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_ppltn_cnt) + " " + unit);
							$("#grid_totAvg").html($catchmentAreaDataBoard.ui.comma(item.tot_avg_ppltn_cnt) + " " + unit);							
							$("#grid_legendTot_txt").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_ppltn_cnt));							
						}else if(type == "family"){
							$("#grid_totSum").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_family_cnt) + " " + unit);
							$("#grid_totAvg").html($catchmentAreaDataBoard.ui.comma(item.tot_avg_family_cnt) + " " + unit);
							$("#grid_legendTot_txt").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_family_cnt));
						}else if(type == "house"){
							$("#grid_totSum").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_resid_cnt) + " " + unit);
							$("#grid_totAvg").html($catchmentAreaDataBoard.ui.comma(item.tot_avg_resid_cnt)  + " " + unit);
							$("#grid_legendTot_txt").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_resid_cnt));
						}else if(type == "copr"){
							if(coprType == "copr"){
								console.log("사업체");
								$("#grid_totSum").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_copr_cnt) + " " + unit);
								$("#grid_totAvg").html($catchmentAreaDataBoard.ui.comma(item.tot_avg_copr_cnt) + " " + unit);//반올림
								$("#grid_legendTot_txt").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_copr_cnt));
							}else{
								console.log("종사자");
								$("#grid_totSum").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_employee_cnt) + " " + unit);
								$("#grid_totAvg").html($catchmentAreaDataBoard.ui.comma(item.tot_avg_employee_cnt) + " " + unit);//반올림
								$("#grid_legendTot_txt").html($catchmentAreaDataBoard.ui.comma(item.tot_sum_employee_cnt));
							}
						}else if(type == "idlv"){
							$("#grid_totSum").html($catchmentAreaDataBoard.ui.comma(item.tot_olnlp) + " " + unit);
							$("#grid_totAvg").html($catchmentAreaDataBoard.ui.comma(item.tot_avg_olnlp) + " " + unit);
							$("#grid_legendTot_txt").html($catchmentAreaDataBoard.ui.comma(item.tot_olnlp));
						}
						
						gridCnt = item.grid_cnt;
						gridArea = item.grid_area;
					}
				});				
				*/
				var baseYearGridStat = result.gridStat.filter(function(item, index, originalArr){
					return item.base_year == base_year;
				})[0];

				var attrNm = this.getSumAndAvgAttrNm(type,coprType);				
				
				if(baseYearGridStat === undefined){
					$("#grid_totSum").html("0 " + unit);
					gridCnt = '0';
					gridArea = '0';					
				}else{
					$("#grid_totSum").html($catchmentAreaDataBoard.ui.comma(baseYearGridStat[attrNm.sum]) + " " + unit);
					//$("#grid_totAvg").html($catchmentAreaDataBoard.ui.comma(baseYearGridStat[attrNm.avg]) + " " + unit);//반올림
					//$("#grid_legendTot_txt").html($catchmentAreaDataBoard.ui.comma(baseYearGridStat[attrNm.sum]));
					gridCnt = baseYearGridStat.grid_cnt;
					gridArea = baseYearGridStat.grid_area;
				}
				
				var gridLevelNm = options.params.grid_level_nm;
				$("#grid_size_txt").html(gridLevelNm + " * " + gridLevelNm);
				$("#grid_totSum_txt").html('영역 전체 ' + gridLevelNm + ' 격자 기반 ' + statSuffix);
				$("#grid_selSum_txt").html('선택한 격자의 ' + statSuffix);
				$("#grid_count_txt").html($catchmentAreaDataBoard.ui.comma(gridCnt) + " 개");
				$("#grid_area_txt").html($catchmentAreaDataBoard.ui.comma((Number(gridArea) * Number(gridCnt) / 1000000).toFixed(2)) + " ㎢");
				
				/*차트*/
				var chartTitleText = "";
				var statYear = [];
				//var statData = [];
				var statData2 = [];
				/*
				if(type == 'pops'){//인구
					chartTitleText = "인구 수";
				}else if(type == 'family'){//가구
					chartTitleText = "가구 수";
				}else if(type == 'house'){//주택
					chartTitleText = "주택 수";
				}else if(type == 'copr'){//사업체
					if(coprType == "copr"){
						chartTitleText = "사업체 수";
					}else{
						chartTitleText = "종사자 수";
					}	
				}else{//공시지가
					chartTitleText = "공시지가";
				}
				*/
				chartTitleText = this.getTypeUnit(type,coprType);

				//통계정보를 sort한다.
				if (result.gridStat != null && result.gridStat.length > 0) {
					result.gridStat = result.gridStat.sort(function(a, b) {
						return parseFloat(a["base_year"])-parseFloat(b["base_year"]);
					});
				}
				
				$.each(result.gridStat, function(index, item){
					/*
					if(type == 'pops'){//인구
						statYear.push(item.base_year);
						statData.push(Number(item.tot_avg_ppltn_cnt));
					}else if(type == 'family'){//가구
						statYear.push(item.base_year);
						statData.push(Number(item.tot_avg_family_cnt));
					}else if(type == 'house'){//주택
						statYear.push(item.base_year);
						statData.push(Number(item.tot_avg_resid_cnt));
					}else if(type == 'copr'){//사업체
						if(coprType == "copr"){
							statYear.push(item.base_year);
							statData.push(Number(item.tot_avg_copr_cnt));
						}else{
							statYear.push(item.base_year);
							statData.push(Number(item.tot_avg_employee_cnt));
						}	
					}else if(type == 'idlv'){//공시지가
						statYear.push(item.base_year);
						statData.push(Number(item.tot_avg_olnlp));
					}
					*/
					statYear.push(item.base_year + " 년");
					//statData.push(Number(item[attrNm.avg]));
					statData2.push(Number(item[attrNm.sum]));
	    		});
				
				$('#gird_graph_title').html('영역 전체 총 ' + chartTitleText + ' 변화');
				$('#gird_graph_title').attr('data-subj', chartTitleText);				
//				$('#gird_graph_left').removeClass('active');
//				$('#gird_graph_right').addClass('active');
				// 평균이 초기화면이 되도록
//				$('#gird_graph_left').addClass('active');
//				$('#gird_graph_left').trigger('click');
				
				//$catchmentAreaDataBoard.ui.createBarChart('gridStatChart_left', statYear ,statData ,chartTitleText, 440, 205);
				$catchmentAreaDataBoard.ui.createBarChart('gridStatChart_right', statYear ,statData2 ,chartTitleText, 440, 205);
			},
			
			/**
			 * 
			 * @name         : getTypeUnit
			 * @description  : 데이터보드 조회 데이터에서 type과 coprTypr에 따른 
			 * @param {string} type 타입명
			 * @param {string} 사업체 및 종사자 구별 타입명
			 * 
			 */
			getTypeUnit : function (type,coprType) {
			    var result = "";
			    if(type == 'copr'){//사업체
			        if(coprType == "copr"){
			            result = this.gridTypeUnit['copr_bus'];
			        }else if(coprType == 'employee'){
			            result = this.gridTypeUnit['copr_worker'];
			        }
			    }else{// 사업체 외
					result = this.gridTypeUnit[type];
			    }
			    
			    return result;
			},
			
			/**
			 * 
			 * @name         : getSumAndAvgAttrNm
			 * @description  : 데이터보드 조회 데이터에서 type과 coprTypr에 따른 "합계"와 "평균"에 대한 속성 이름을 가져온다. 
			 * @param {string} type 타입명
			 * @param {string} 사업체 및 종사자 구별 타입명
			 * 
			 */
			getSumAndAvgAttrNm : function(type,coprType) {
				var result = null;
			    if(type == 'copr'){//사업체
			        if(coprType == "copr"){
			            result = this.gridTypeAttrNm['copr_bus'];
			        }else if(coprType == 'employee'){
			            result = this.gridTypeAttrNm['copr_worker'];
			        }
			    }else{// 사업체 외
					result = this.gridTypeAttrNm[type];
			    }
			    
			    if(!result) {throw new Error('존재하지 않는 type입니다');}
			    
			    return result;
			},
			
			/**
			 * 
			 * @name         : settingDetailGridDataBoard
			 * @description  : 상세분석 격자 데이터 보드
			 * @parameter	 : leftData는 격자 데이터보드의 왼쪽, 즉 왼쪽 지도에 대한 데이터를 의미한다 / rightData는 반대로 오른쪽 지도에 대한 데이터를 의미한다
			 * 				   이 데이터는 $catchmentAreaMainApi.request.getGridSrvAreaDataBoardList 에서 받은 데이터를 기반으로 한다.
			 */
			settingDetailGridDataBoard : function(leftData, rightData, common){
				// leftData - API의 결과로 받은 것들(왼쪽 지도) ,  rightData - API의 결과로 받은 것들(오른쪽 지도), common - 왼쪽/오른족 지도 모두에 대한 
				//SGIS4_1025_생활권역_상세분석 시작
				if($("#detailedAnal01").hasClass("active")){
					var selectClassTitle = $('#detailedAnal01 > a').text();
				}else if ($("#detailedAnal02").hasClass("active")){
					var selectClassTitle = $('#detailedAnal02 > a').text();
				}				
				var selectStatTxt = $('#statsType02 > ul > li.active > a').text();
				//SGIS4_1025_생활권역_상세분석 끝
				var titleTypeTxt = "";
				var base_year = common.base_year;		// 공간적,시간적 상세분석에서 사용
				var left_base_year = common['left_base_year'] || base_year;
				var right_base_year = common['right_base_year'] || base_year;
				var compare_year = common.compare_year;	// 시간적 상세분석에서만 사용
				var coprType = common.grdstatType;
				var unit = common.unit;
				var statType = common.statType;
				var statSuffix = "";
				var statCalMetd = "합계";
				
				// 1. 데이터 보드의 내용 초기화
				$('.pop_chk03.diff_with_original #titleYearTxt_3').text('');	// 제목란의 좌측, 연도 표기 지우기
				$('.pop_chk03.diff_with_original #titleAreaTxt_3').text('');	// 제목란의 중심, 제목 표기 지우기
				$('.pop_chk03.diff_with_original #titleTypeTxt_3').text('');	// 제목란의 우측, 조건 표기 지우기
				$('.pop_chk03.diff_with_original .detail_subtitle span:nth-child(2n-1)').text(''); // 좌측, 우측의 모든 위치(혹은 시간)을 지우기
				// 여기서 위치, 연도 파란박스 수정을 위해서 삭제요망
				if(common.requestFromYear) {
					$('.pop_chk03.diff_with_original #titleYearTxt_3').text($('#mapLocation_4').text()); //SGIS4_1025_생활권역_상세분석
					$('.pop_chk03.diff_with_original .detail_subtitle > img').attr('src','/images/catchmentArea/pop_ico02.png');
					$('.pop_chk03.diff_with_original .detail_subtitle.left span:nth-child(2n)').text('연도1:');
					$('.pop_chk03.diff_with_original .detail_subtitle.right span:nth-child(2n)').text('연도2:');
					$('#legend_standard_left + label').text('연도1 기준');
					$('#legend_standard_right + label').text('연도2 기준');
				} else {
					$('.pop_chk03.diff_with_original #titleYearTxt_3').text(common.base_year + "년");
					$('.pop_chk03.diff_with_original .detail_subtitle > img').attr('src','/images/catchmentArea/pop_ico01.png');
					$('.pop_chk03.diff_with_original .detail_subtitle.left span:nth-child(2n)').text('위치1:');
					$('.pop_chk03.diff_with_original .detail_subtitle.right span:nth-child(2n)').text('위치2:');
					$('#legend_standard_left + label').text('위치1 기준');
					$('#legend_standard_right + label').text('위치2 기준');
				}
				
				$('#select_grid_sum_left, #select_grid_sum_right').text('');	// 선택 격자 통계 지우기
				$('#select_gridNm_left, #select_gridNm_right').text('');		// 선택 격자 이름 지우기
				$('#select_legend_left, #select_legend_right').css("background","").css("border","");	// 선택 격자 범례 없애기
				//$('.detail_grid_info_box.detail span:nth-child(2n)').text('');	// 전체 격자 정보에서 [격자크기, 영역 내 격자 개수, 총 격자 면적] 지우기
				$('.detail_legend_box span:nth-child(2n)').text(''); // 데이터보드 제일 아래에 있는 범례에 대한 [통계명칭, 산출방식, 행정구역, 전체통계] 지우기
				
				document.querySelector('#legend_standard_left').checked = true;	// 좌측 지도를 선택한 상태로 변환한다.
				
				// 2. 가져온 인자값으로 다시 내용을 채운다.
				$('.pop_chk03.diff_with_original #titleAreaTxt_3').text(selectClassTitle);
				
				if(common.rangeType === 'stats01') {	// 주행시간 기준
					titleTypeTxt += "주행시간 ";
				} else if(common.rangeType === 'stats02') {	// 주행거리 기준
					titleTypeTxt += "주행거리 ";
				} else if(common.rangeType === 'stats03') {	// 반경기준
					titleTypeTxt += "반경 ";
				}
				
				titleTypeTxt += selectStatTxt;
				
				$('.pop_chk03.diff_with_original #titleTypeTxt_3').text(titleTypeTxt);
				
				
				// 제목란 오른쪽에 titleTypeTxt 넣기
				var grid_totSum_txt = "격자 내 전체 ";
				//var grid_totAvg_txt = "격자 당 평균 ";
				var addingTxt = this.getTypeUnit(statType, coprType);
				/*
				if(statType == "copr"){//사업체
					if(coprType == "copr"){
						//addingTxt = "사업체 수";
						addingTxt = this.gridTypeUnit['copr_bus'];
					}else{
						//addingTxt = "종사자 수";
						addingTxt = this.gridTypeUnit['copr_worker'];
					}
				}else{
					addingTxt = this.gridTypeUnit[statType];
				}
				*/
				
				
				grid_totSum_txt += addingTxt;
				//grid_totAvg_txt += addingTxt;
				
				$(".pop_chk03.diff_with_original .detail_grid_tot").text(grid_totSum_txt);
				//$(".pop_chk03.diff_with_original .detail_grid_avg").text(grid_totAvg_txt);
				
				
				// 여기서 위치1, 위치2 <==> 연도1,연도2 수정 및 값 지정,  detail_location_compare_1를 쓸 건지, 
				if(common.requestFromYear) {
					$('.detail_subtitle.left span:nth-child(2n-1)').text($('#detail_year_compare_1').text());
					$('.detail_subtitle.right span:nth-child(2n-1)').text($('#detail_year_compare_2').text());					
				} else {
					$('.detail_subtitle.left span:nth-child(2n-1)').text($('#detail_location_compare_1').text());
					$('.detail_subtitle.right span:nth-child(2n-1)').text($('#detail_location_compare_2').text());					
				}
				
				
				var baseYearLeftData = leftData.gridStat.filter(function(item, index, originalArr){
					return item.base_year == left_base_year;
				})[0];
				
				var baseYearRightData = rightData.gridStat.filter(function(item, index, originalArr){
					return item.base_year == right_base_year;
				})[0];
				
				
				this.setDetailSumAndAvg(baseYearLeftData,  statType, {sumDomId:'grid_totSum_detail_left', avgDomId: 'grid_totAvg_detail_left',   unit: common.unit, coprType: coprType});
				this.setDetailSumAndAvg(baseYearRightData, statType, {sumDomId:'grid_totSum_detail_right', avgDomId: 'grid_totAvg_detail_right', unit: common.unit, coprType: coprType});
				this.setDetailAllGridInfo('left',  baseYearLeftData , common.grid_level_nm);
				this.setDetailAllGridInfo('right', baseYearRightData, common.grid_level_nm);
				
				var sumAttrNm = this.getSumAndAvgAttrNm(statType,coprType)['sum'];
				
				var legendTxtBoxData = {
					schCondNm: common.schCondNm
					, statCalMetd: statCalMetd
					, unit: common.unit
					, itgSgg: leftData.itgSgg
					, totalValue: baseYearLeftData[sumAttrNm]
				}
				this.setDetailLegendTxtBox('left', legendTxtBoxData);

				legendTxtBoxData['itgSgg'] = rightData.itgSgg;
				legendTxtBoxData['totalValue'] = baseYearRightData[sumAttrNm]
				this.setDetailLegendTxtBox('right',legendTxtBoxData);
				
				
				// 차트
				var detailAnalType = $('#detail_analysis_tab li.active').data('detailAnalType');
				
				var data1_nm = "";
				var data2_nm = "";
				
				if(detailAnalType === 'spatial') {
					data1_nm = $('#detail_location_compare_1').text();
					data2_nm = $('#detail_location_compare_2').text();
				} else if(detailAnalType === 'year') {
					data1_nm = $('#detail_year_compare_1').text();
					data2_nm = $('#detail_year_compare_2').text();
				} else {
					throw new Error('no such detail Analysis Type!!!!');
				}
				
				var chartOption = {
					width: 250,	//SIGS4_1027_생활권역
					height: 210,	//SIGS4_1027_생활권역
					//title : this.gridTypeUnit[statType] + ' 각 범례의 격자 수 비교',
					title : this.getTypeUnit(statType, coprType) + ' 각 범례의 격자 수 비교',
					legendBoundary : common.cntPerLegend[0].map(function(item){return item.legendSection}),
					data1_nm : data1_nm,
					data1	 : common.cntPerLegend[0].map(function(item){return item.cnt}),
					data2_nm : data2_nm,
					data2	 : common.cntPerLegend[1].map(function(item){return item.cnt})
				}
				
				//SGIS4_1027_생활권역 시작
				chartOption.legendBoundary = chartOption.legendBoundary.reverse();
				chartOption.data1 = chartOption.data1.reverse();
				chartOption.data2 = chartOption.data2.reverse();
				//SGIS4_1027_생활권역 끝
				
				//SGIS4_1025_생활권역 시작
				//this.createDoubleBarChart('detailGridChart' , chartOption);
				this.createDoubleBarChart2('detailGridChart' , chartOption);
				//SGIS4_1025_생활권역 끝
				
				var cacheOption = {
					//title : this.gridTypeUnit[statType] + ' 각 범례의 격자 수 비교', 
					title : this.getTypeUnit(statType, coprType) + ' 각 범례의 격자 수 비교', 
					width: 250, //SIGS4_1025_생활권역_상세분석 수정
					height: 210,	//SIGS4_1027_생활권역
					data1_nm : data1_nm,
					data2_nm : data2_nm
				}
				this.cacheDoubleColumnChart = this.cacheDoubleColumnChartMethod('detailGridChart', deepCopy(common.originalLegendBoundary), cacheOption);
				
				//SGIS4_1025_생활권역 시작
				var grid_statTilte = '영역 전체 ' + common.grid_level_nm + ' 격자 기반 ';
				
				if(common.statType == 'pops'){
					grid_statTilte += '인구 수'
				}else if(common.statType == 'family'){
					grid_statTilte += '가구 수'
				}else if(common.statType == 'house'){
					grid_statTilte += '주택 수'
				}else if(common.statType == 'copr'){
					grid_statTilte += '사업체 수'
				}else{
					grid_statTilte += '종사자 수'
				}
				
				$('#grid_statTilte_left').html(grid_statTilte);
				$('#grid_statTilte_right').html(grid_statTilte);
				//SGIS4_1025_생활권역 끝
			},
			
			
			setDetailSumAndAvg : function(data, statType, option) {
				
				/*
				if(option.coprType) {
					if(option.coprType === 'copr') {
					
						sumAttrNm = this.gridTypeAttrNm['copr_bus']['sum'];
						avgAttrNm = this.gridTypeAttrNm['copr_bus']['avg'];
						
					} else if(option.coprType === 'employee') {
						
						sumAttrNm = this.gridTypeAttrNm['copr_worker']['sum'];
						avgAttrNm = this.gridTypeAttrNm['copr_worker']['avg'];
						
					}
				} else {
					
					sumAttrNm = this.gridTypeAttrNm[statType]['sum'];
					avgAttrNm = this.gridTypeAttrNm[statType]['avg'];
					
				}
				*/
				
				var attrNm = this.getSumAndAvgAttrNm(statType, option.coprType);
				
				var sumData = this.comma(data[attrNm.sum]) + ' ' + option.unit;
				//var avgData = (+data[attrNm.avg]).toFixed(1) + ' ' + option.unit;
				$('#' + option.sumDomId).text(sumData);
				//$('#' + option.avgDomId).text(avgData);
				
			},
			
			
			setDetailAllGridInfo : function(leftOrRight, data, gridLevelNm) {
				$('.detail_grid_info_box.' + leftOrRight + ' span:nth-child(2n)').text('');
				$('.grid_size_detail.' + leftOrRight).text(gridLevelNm + " * " + gridLevelNm);
				$('.grid_count_detail.' + leftOrRight).text(this.comma(data.grid_cnt) + ' 개');
				$('.grid_area_detail.' + leftOrRight).html(this.comma(((+data.grid_area) * (+data.grid_cnt) / 1000000).toFixed(2)) + " ㎢");
			},
			
			
			setDetailLegendTxtBox : function(leftOrRight, data) {
				$('#grid_statTitle_txt_' + leftOrRight).text(data.schCondNm);
				$('#grid_statCalcMethod_txt_' + leftOrRight).text(data.statCalMetd + '(' + data.unit + ')');
				$('#grid_bordRange_txt_' + leftOrRight).text(data.itgSgg);
				$('#grid_legendTot_txt_' + leftOrRight).text(this.comma(data.totalValue));
			},
			
			// 클로저를 이용해서 target, legendBoudnaryInfo, cacheOption을 스냅샷을 찍듯이 계속 보존하고, 차트를 그릴때 사용한다.
			// 상세분석의 데이터보드의 차트를 그릴 때 사용된다.
			cacheDoubleColumnChartMethod : function(target, legendBoundaryInfo, cacheOption){
				
				var map1legend = legendBoundaryInfo[0];
				var map2legend = legendBoundaryInfo[1];
				var data1 = cLegendInfo.catchmentAreaLegendInfo.fixed_legend_data_duplicate_remain1.slice();	// 전역 데이터이므로 slice로 옅은복사 후 사용
				var data2 = cLegendInfo.catchmentAreaLegendInfo.fixed_legend_data_duplicate_remain2.slice();	// 전역 데이터이므로 slice로 옅은복사 후 사용
				var boundCnt1 = cLegendInfo.catchmentAreaLegendInfo.fixed_boundCnt_1;
				var boundCnt2 = cLegendInfo.catchmentAreaLegendInfo.fixed_boundCnt_2;
				
				return function(mapId) {
					
					var map = $catchmentAreaMain.ui.getMap(mapId);
					var valPerSlice = mapId == 0 ? map1legend : map2legend;
					var bndCnt = mapId == 0 ? boundCnt1 : boundCnt2;
					var data = mapId == 0 ? data1 : data2;
					
					if(mapId === 0) {
						var perData1 = $catchmentAreaLeftMenu.ui.cntDataByLegendSection(map1legend, data1);
						var perData2 = $catchmentAreaLeftMenu.ui.cntDataByLegendSection(map1legend, data2);
						
						cacheOption['legendBoundary'] = perData1.map(function(item){return item.legendSection});
						cacheOption['data1'] = perData1.map(function(item){return item.cnt});
						cacheOption['data2'] = perData2.map(function(item){return item.cnt});
						
					} else if(mapId === 1) {
						var perData1 = $catchmentAreaLeftMenu.ui.cntDataByLegendSection(map2legend, data1);
						var perData2 = $catchmentAreaLeftMenu.ui.cntDataByLegendSection(map2legend, data2);
						
						cacheOption['legendBoundary'] = perData1.map(function(item){return item.legendSection});
						cacheOption['data1'] = perData1.map(function(item){return item.cnt});
						cacheOption['data2'] = perData2.map(function(item){return item.cnt});
					}
					
					map.legend.setGoganSum(valPerSlice, data, bndCnt, true);
					//SGIS4_1027_생활권역 시작
					cacheOption.legendBoundary = cacheOption.legendBoundary.reverse();
					cacheOption.data1 = cacheOption.data1.reverse();
					cacheOption.data2 = cacheOption.data2.reverse();
					//SGIS4_1027_생활권역 끝
					//SGIS4_1025_생활권역 시작
					//$catchmentAreaDataBoard.ui.createDoubleBarChart(target, cacheOption);
					$catchmentAreaDataBoard.ui.createDoubleBarChart2(target, cacheOption);
					//SGIS4_1025_생활권역 끝
				}
			},
			
			createOnePieChart : function (target, statData, statColors, pWidth, pHeight) {
				console.log("$catchmentAreaDataBoard.ui.createChart 호출");
				console.log(target);
				var unitNm = "명";
				if(target == 'familyChart' || target == 'familyCChart'){
					unitNm = "가구";
				}else if(target == 'houseChart' || target == 'houseCChart'){
					unitNm = "호";
				}else if(target == 'coprChart' || target == 'coprCChart'){
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
			  				//SGIS4_생활권역 시작
			  		        pointFormat: '<b>{point.y} ' + unitNm + '</b><br/>{point.percentage:.1f} %'
			  		        //SGIS4_생활권역 끝
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
			createTwoPieChart : function (target, statData, tempColor, top3Data, top3Color, pWidth, pHeight) {
				var unitNm = "명";
				if(target == 'coprChart'){
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
			  		        pointFormat: '<b>{point.y} ' + unitNm + '</b>'
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
			  			    innerSize: '70%',
			  				data: statData,
			  				colors : tempColor
			  			},{
			  				size: '70%',
			  				data : top3Data,
			  				colors : top3Color
			  			}]
					});
			},
			createEmptyOnePieChart : function (targetId) {
				
				// 기본크기 대상 : familyChart, popCChart, familyCChart, houseCChart
				var chtWidth = 210;		
				var chtHeight = 140;
				if(targetId == 'popChart'){
					chtWidth = 130;
					chtHeight = 130;
				}else if(targetId == 'houseChart'){
					chtWidth = 205;
					chtHeight = 140;
				}else if(targetId == 'coprChart' || targetId == 'workerChart' || targetId == 'coprCChart' || targetId == 'workerCChart'){
					chtWidth = 210;
					chtHeight = 170;
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
			// 버그 수정. 격자 메뉴에서 데이터보드를 닫고, 격자 조회를 클릭 후, 다시 데이터보드를 열면 차트가 데이터보드를 넘쳐버림.
			// 그래서 width와 height을 항상 부여하도록 변경
			createBarChart : function (target, statYear ,statData ,titleText, width, height) {
				
				var catNm = "격자 당 평균 ";
				if(target == 'gridStatChart_right'){
					catNm = "격자 내 전체  ";
				}
				//console.log(statYear + statData);
				$("#"+target).highcharts({
					chart: {
						type: 'column',
		  				spacingRight: 0,
		  				spacingLeft: 0,
		  				width: width,
		  				height: height
		  				//marginTop: 30
		  			},
		  			legend: {
//		  	            layout: 'vertical',
//		  	            verticalAlign: 'top',
//		  	            align: 'right',
//		  	            floating: true,
//		  	            x: 0,
//		  	            y: -15,
		  	            enabled: false
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
		  	            	// y축 제목 꼭대기로 올리기
//		  	            	align: 'high',
//		  	            	offset: -70,
//		  	            	rotation: 0,
//		  	            	y: -15,
//		  	                text: catNm + titleText,
		  	                enabled: false
		  	            }
		  			},		  			
		  			exporting: {
		  		        enabled: false
		  		    },
		  		    plotOptions: {
		  		        column: {
		  		            pointPadding: 0.2,
		  		            borderWidth: 0,
		  		            maxPointWidth: 30,
							dataLabels: {
								enabled: true
							}		  		            
		  		        }
		  		    },		  		    
		  			series: [{		  				
		  				name: titleText,
		  				data: statData
		  			}]
				});
				
			},
			
			createDoubleBarChart : function (target, option) {
				
				var colorObj = {};
				
				 option.legendBoundary.forEach(function(item,index){
					 colorObj[item] = $catchmentAreaMain.ui.getMap(0).legend.getColorForLevel(index);
				 });
				 
				
				$("#"+target).highcharts({
					
					chart: {
						type: 'column',
		  				spacingRight: 0,
		  				spacingLeft: 0,
		  				width: option.width,
		  				height: option.height,
		  				marginTop: 60,
		  				marginBottom: 100
		  			},
		  			legend: {
		  	            layout: 'vertical',
		  	            verticalAlign: 'top',
		  	            align: 'right',
		  	            floating: true,
		  	            x: 0,
		  	            y: 0
		  	        },
		  			title: {
		  				text : option.title,
		  				verticalAlign: 'bottom',
		  				style: {
		  					"fontSize": "12px",
		  		        }
		  			},
		  			xAxis: {
		  				categories: option.legendBoundary,
		  	            labels: {
		  	            	rotation: -50,   // x축의 글자가 삐딱해진다.
		  	                useHTML : true,
		  	                formatter : function() {
		  	                	var color = colorObj[this.value];
		  	                	var html = '<span style="display:inline-block;background: '+ color +'; width:10px;height:10px; border-radius: 50%; margin-right: 2px; border:1px solid rgba(0,0,0,0.2)"></span>'
		  	                	html += '<span style="font-weight:bold">' + this.value + '</span>';
		  	                	return  html;
		  	                }
		  	            },
		  	            crosshair: true
		  			},
		  			yAxis: {
		  				min: 0,
		  	            title: {
		  	            	// y축 제목 꼭대기로 올리기
		  	            	align: 'high',
		  	            	offset: 0,
		  	            	rotation: 0,
		  	            	y: -10,
		  	                text: '격자 수'
		  	            }
		  			},
		  			tooltip: {
		  	            shared: true
		  	        },
		  			exporting: {
		  		        enabled: false
		  		    },
		  		    plotOptions: {
		  		        column: {
		  		            pointPadding: 0.2,
		  		            borderWidth: 0,
		  		            maxPointWidth: 15
		  		        },
		  	            series: {
		  	                events: {
		  	                    legendItemClick: function () {
		  	                        return false;
		  	                    }
		  	                }
		  	            }
		  		    },		  		    
					series: [{
					    name: option.data1_nm,
					    data: option.data1
					}, {
					    name: option.data2_nm,
					    data: option.data2
					}]
		  		    
				});
			},

			//SGIS4_1027_생활권역 시작
			//공간적/시간적 비교에서 사용
			createDoubleBarChart2 : function (target, option) {
				
				var colorObj = {};
				
				 option.legendBoundary.forEach(function(item,index){
					 colorObj[item] = $catchmentAreaMain.ui.getMap(0).legend.getColorForLevel(index);
				 });

				 $("#detailAnal_lgd01_nm").html(option.data1_nm);
				 $("#detailAnal_lgd02_nm").html(option.data2_nm);

				$("#"+target).highcharts({
					
					chart: {
						type: 'bar',
		  				width: option.width,
		  				height: option.height,
		  				marginTop: 1,
		  				spacingBottom: 5
		  			},
		  			legend: {
		  				enabled : false
		  	        },
		  			title: {
		  				text : ''
		  			},
		  			xAxis: {
		  				categories: option.legendBoundary,
		  				labels: {
		  					enabled: false
		  	            },
		  	            crosshair: true
		  			},
		  			yAxis: {
		  				min: 0,
		  	            title: {
		  	            	// y축 제목 꼭대기로 올리기
		  	            	align: 'high',
//		  	            	offset: 0,
//		  	            	rotation: 0,
		  	            	y: -5,
		  	                text: '격자 수'
		  	            }
		  			},
		  			tooltip: {
		  	            shared: true
		  	        },
		  			exporting: {
		  		        enabled: false
		  		    },
//		  		    plotOptions: {
//		  		        bar: {
//		  		            dataLabels: {
//		  		                enabled: true,
//		  		                allowOverlap : true
//		  		            },		  		        	
//		  		            pointPadding: 0.1,
//		  		            borderWidth: 0,
//		  		            pointWidth : 10
//		  		        }
//		  		    },		  		    
					series: [{
					    name: option.data1_nm,
					    data: option.data1,
					    color: "#82B3EB",
					    index: 1
					}, {
					    name: option.data2_nm,
					    data: option.data2,
					    color: "#434348",
					    index: 0
					}]
		  		    
				});
			},
			//SGIS4_1027_생활권역 끝
			
			// https://jsfiddle.net/0Ltc9hfj/2/  참고
			createHeatMapChart : function(target, axisArr, resultArr, title, width, height) {
				
				$("#"+target).highcharts({
					chart: {
				        type: 'heatmap',
				        width: width,
				        height: height,
				        // marginTop: 20,
				        //marginBottom: 20,
				        plotBorderWidth: 1
				    },
				    
				    title: {
				        text: title
				    },
				    
				    xAxis: {
				    	categories : axisArr
				    },
				    
				    yAxis: {
				        categories: axisArr,
				        reversed: true
				    },
				    
				    colorAxis: {
				    	reversed :false,
				        min: -1,
				        max : 1,
				        /*stops: [
				        	[-1, 'rgb(88,140,239)'], //rgb(88,140,239)
				        	[1, 'rgb(254,186,105)'] // rgb(254,186,105)
				        ]*/
				        //minColor: '#FFFFFF',
				    	 minColor: 'rgb(88,140,239)'
				    	, maxColor: 'rgb(254,186,105)'
				        //maxColor: Highcharts.getOptions().colors[0]
				    },
				    
				    legend: {
				        align: 'right',
				        layout: 'vertical',
				        margin: 0,
				        verticalAlign: 'top',
				        y: 25,
				        symbolHeight: 280
				    },
				    /*
				    tooltip: {
				        formatter: function () {
				            return '<b>' + getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
				                this.point.value + '</b> items on <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
				        }
				    },*/
				    series: [{
				        name: 'Sales per employee',
				        borderWidth: 1,
				        data: resultArr,
				        dataLabels: {
				            enabled: true,
				            color: '#000000'
				        }
				    }],
				    
				    exporting: {
				        enabled: false
				    },
				    
				    tooltip: {
						enabled: false
					}
				    
				});
				
			},
			
			//SGIS4_생활권역 시작
			createSolidGaugeChart : function (target, itemCnt, totCnt, pWidth, pHeight) {
				var unitNm = "명";
				if(target == 'familyChart' || target == 'familyCChart'){
					unitNm = "가구";
				}else if(target == 'houseChart' || target == 'houseCChart'){
					unitNm = "호";
				}else if(target == 'coprChart' || target == 'coprCChart'){
					unitNm = "개";
				}
				
				var seriesColors = [];
				var ratio = (itemCnt / totCnt * 100).toFixed(0);
				if(isNaN(ratio)){
					ratio = 0;
				}
				
				//SGIS4_1025_생활권역 시작
				//var $lgnd = $("#"+target).closest('.txt_box01').siblings('.txt_box03').find('.cr02'); 
				var $lgnd = $("#"+target).siblings('.txt_box03').find('.cr02');
				//SGIS4_1025_생활권역 끝 
				if(ratio <= 20){
					seriesColors.push($catchmentAreaMain.ui.saShpColor[2]);
					$lgnd.css("background", $catchmentAreaMain.ui.saShpColor[2]);
				}else if(ratio <= 70){
					seriesColors.push($catchmentAreaMain.ui.saShpColor[3]);
					$lgnd.css("background", $catchmentAreaMain.ui.saShpColor[3]);
				}else{
					seriesColors.push($catchmentAreaMain.ui.saShpColor[0]);
					$lgnd.css("background", $catchmentAreaMain.ui.saShpColor[0]);
				}
				
				$("#"+target).highcharts({
				    chart: {
				        type: 'solidgauge',
				        //SGIS4_1025_생활권역 시작
				        spacing: [-20, 0, 20, 0],		// [14, 10, 11, 10]
				        //SGIS4_1025_생활권역 끝
						width: pWidth,
						height: pHeight
				    },

				    title: null,

				    pane: {
				        center: ['50%', '85%'],
				        //SGIS4_1025_생활권역 시작
				        size: '130%',
				        //SGIS4_1025_생활권역 끝
				        startAngle: -90,
				        endAngle: 90,
				        background: {
				            backgroundColor: '#EEE',
				            innerRadius: '60%',
				            outerRadius: '100%',
				            shape: 'arc'
				        }
				    },

				    exporting: {
				        enabled: false
				    },

				    tooltip: {
				        enabled: false
				    },

				    yAxis: {
//				        stops: [
//				            [0.1, '#55BF3B'], // green
//				            [0.5, '#DDDF0D'], // yellow
//				            [0.9, '#DF5353'] // red
//				        ],
				        lineWidth: 0,
				        tickWidth: 0,
				        minorTickInterval: null,
				        //tickAmount: 2,
				        min: 0,
				        max: (totCnt < itemCnt ? itemCnt : totCnt),				        
				        title: {
				            //y: -70,
				            text: ''
				        },
				        labels: {
				            //y: 16
				        	enabled: false
				        }
				    },

				    plotOptions: {
				        solidgauge: {
				            dataLabels: {
				                y: 5,
				                borderWidth: 0,
				                useHTML: true
				            }
				        }
				    },

				    credits: {
				        enabled: false
				    },

				    series: [{
				        name: '',
				        data: [itemCnt],
				        colors: seriesColors,
				        dataLabels: {
				        	enabled: false
//				            format:
//				                '<div style="text-align:center">' +
//				                '<span style="font-size:25px">{y}</span>' +
//				                '<br/><span style="font-size:12px;opacity:0.4">' + unitNm + '</span>' +
//				                '</div>'
				        },
				        tooltip: {
				            valueSuffix: ' ' + unitNm
				        }
				    }]				    
				});		
			},			

			createEmptySolidGaugeChart : function (targetId) {

				//SGIS4_1025_생활권역 시작
				var chtWidth = 240;		
				var chtHeight = 140;
				//SGIS4_1025_생활권역 끝
//				if(targetId == 'coprCChart' || targetId == 'workerCChart'){
//					chtWidth = 210;
//					chtHeight = 170;
//				}

				var $lgnd = $("#"+targetId).closest('.txt_box01').siblings('.txt_box03').find('.cr02'); 
				$lgnd.css("background", $catchmentAreaMain.ui.saShpColor[2]);
					
				$("#"+targetId).highcharts({
				    chart: {
				        type: 'solidgauge',
				        //SGIS4_1025_생활권역 시작
				        spacing: [-20, 0, 20, 0],		// [14, 10, 11, 10]
				        //SGIS4_1025_생활권역 끝
						width: chtWidth,
						height: chtHeight
				    },

				    title: null,

				    pane: {
				        center: ['50%', '85%'],
				        //SGIS4_1025_생활권역 시작
				        size: '130%',
				        //SGIS4_1025_생활권역 끝
				        startAngle: -90,
				        endAngle: 90,
				        background: {
				            backgroundColor: '#EEE',
				            innerRadius: '60%',
				            outerRadius: '100%',
				            shape: 'arc'
				        }
				    },

				    exporting: {
				        enabled: false
				    },

				    tooltip: {
				        enabled: false
				    },

				    yAxis: {
				        lineWidth: 0,
				        tickWidth: 0,
				        minorTickInterval: null,
				        min: 0,
				        max: 100,				        
				        title: {
				            text: ''
				        },
				        labels: {
				        	enabled: false
				        }
				    },

				    plotOptions: {
				        solidgauge: {
				            dataLabels: {
				                y: 5,
				                borderWidth: 0,
				                useHTML: true
				            }
				        }
				    },

				    credits: {
				        enabled: false
				    },

				    series: [{
				        name: '',
				        data: [0],
				        dataLabels: {
				        	enabled: false
				        }				        
				    }]				    
				});
			},

			/**
			 * 
			 * @name         : resetAreaDataboard
			 * @description  : 영역 내 전체정보 데이터보드를 정리한다.
			 * 
			 */
			resetAreaDataboard : function(pSecGb, pContGb, pIsClear, pIsBlockShow) {
				// pContGb : B-기본 통계, C-세부항목별 통계

				var $rootSec = $("." + $catchmentAreaDataBoard.ui.pop01SecSet[pSecGb]);
				if($rootSec.length > 0){
					if(pIsClear){
						var $contSec;						
						if(pContGb == "B"){
							$contSec = $rootSec.find('.div_basic');
						}else if(pContGb == "C"){
							$contSec = $rootSec.find('.div_chartr');
						}						
						if($contSec !== undefined && $contSec !== null && $contSec.length > 0){							
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
								if(pContGb == "B"){
									$catchmentAreaDataBoard.ui.createEmptyOnePieChart(chtId);
								}else if(pContGb == "C"){
									$catchmentAreaDataBoard.ui.createEmptySolidGaugeChart(chtId);
								}												
							});
							
							var $resetClrTgt = $contSec.find('[data-reset-clr]');
							$.each($resetClrTgt, function(index, item){
								$(item).css("background", $(item).attr('data-reset-clr'));	
							});
						}
						
						var $totSec = $rootSec.find('.div_tot');						
						if($totSec !== undefined && $totSec !== null && $totSec.length > 0){
							var $resetTxtTgt = $totSec.find('[data-reset]');
							$.each($resetTxtTgt, function(index, item){
								$(item).html($(item).attr('data-reset'));	
							});								
						}
					}
					
					if(pIsBlockShow){
						$rootSec.find(".div_block").show();
					}else{
						$rootSec.find(".div_block").hide();
					}
				}				
			},
			
			//SGIS4_생활권역 끝
			
			comma : function(str){
				str = String(str);
		        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
			},
			
			settingSelectGridDataBord : function(data, fillColor, lgdIdx, option){
				console.log("$catchmentAreaDataBoard.ui.settingSelectGridDataBord 호출");
//				if(data[0].showData == 'ppltn_cnt'){//인구
//					$("#select_grid_sum").html($catchmentAreaDataBoard.ui.comma(data[0].ppltn_cnt) + " " + data[0].unit)
//				}else if(data[0].showData == 'fmember_cnt'){//가구
//					$("#select_grid_sum").html($catchmentAreaDataBoard.ui.comma(data[0].fmember_cnt) + " " + data[0].unit)
//				}else if(data[0].showData == 'resid_cnt'){//주택
//					$("#select_grid_sum").html($catchmentAreaDataBoard.ui.comma(data[0].resid_cnt) + " " + data[0].unit)
//				}else if(data[0].showData == 'corp_cnt'){//사업체
//					$("#select_grid_sum").html($catchmentAreaDataBoard.ui.comma(data[0].corp_cnt) + " " + data[0].unit)
//				}else if(data[0].showData == 'employee_cnt'){//공시지가
//					$("#select_grid_sum").html($catchmentAreaDataBoard.ui.comma(data[0].employee_cnt) + " " + data[0].unit)
//				}else{
//					$("#select_grid_sum").html($catchmentAreaDataBoard.ui.comma(data[0].olnlp) + " " + data[0].unit)
//				}
//				//선택격자 색상
//				$("#select_legend").css("background",fillColor);
//				$("#select_legend").css("border", "1px solid #ccc");
//				//선택격자 데이터
//				$("#select_gridNm").html(data[0].adm_nm);
				
				if(!option) {
					if(data[0][data[0].showData] != undefined){
						//선택격자 통계치
						$("#select_grid_sum").html($catchmentAreaDataBoard.ui.comma(data[0][data[0].showData]) + " " + data[0].unit);
						//선택격자 색상
						$("#select_legend").css("background", fillColor);
						$("#select_legend_txt").html((lgdIdx + 1) + "구간");
						$("#select_legend_txt").css("cursor", "pointer");
						
						var liLen = $('#legendListDiv1 li').length - 1;		//빈격자 제외
						var tltip = $('#legendListDiv1 li:nth-child(' + (liLen - lgdIdx) + ')').text();
						$("#select_legend_txt").attr('title', tltip);
						
						$("#select_legend").show();
						//선택격자 이름
						$("#select_gridNm").html(data[0].adm_nm);
					}else{
						//빈격자 통계치
						$("#select_grid_sum").html("0");
						//빈격자 색상
						$("#select_legend").css("background", "");
						$("#select_legend_txt").html("빈격자");

						$("#select_legend").show();
						//빈격자 이름
						$("#select_gridNm").html(data);
					}
				} else if(option.gridRequestor === 'detailAnalysis' && option.leftOrRight) {
					if(data[0][data[0].showData] != undefined){
						$('#select_grid_sum_' + option.leftOrRight).html($catchmentAreaDataBoard.ui.comma(data[0][data[0].showData]) + " " + data[0].unit);
						$('#select_legend_' + option.leftOrRight).css("background",fillColor);;
						$('#select_gridNm_' + option.leftOrRight).html(data[0].adm_nm);
					}else{
						//빈격자 통계치
						$('#select_grid_sum_' + option.leftOrRight).html("");
						//빈격자 색상
						$('#select_legend_' + option.leftOrRight).css("background","");;
						//빈격자 이름
						$('#select_gridNm_' + option.leftOrRight).html(data);
					}
				}
				
				
			},
			
			clearSelectGridDataBord : function(leftOrRight){
				if(!leftOrRight) {
					$("#select_grid_sum").html("0");
					$("#select_legend").hide();
					$("#select_legend_txt").html("");
					$("#select_legend_txt").css("cursor", "auto");
					$("#select_legend_txt").attr('title', '');
					$("#select_gridNm").html("");
				} else if(leftOrRight === 'left' || leftOrRight === 'right'){
					$('#select_grid_sum_' + leftOrRight).html("");
					$('#select_legend_' + leftOrRight).css("background",'');
					$('#select_legend_' + leftOrRight).css("border", "1px solid #ccc");
					$('#select_gridNm_' + leftOrRight).html("");
				}
			},
			
			settingGridinfo : function(girdCnt){
				var gridSize = $(".grid_size").children(".active").attr("value");
				var gridSizsText = "";
				var gridTotAreaSize = girdCnt * (gridSize * gridSize);

				if(gridSize = '1000'){
					gridSizsText = '1Km * 1Km';
				}else{
					gridSizsText = gridSize+"m * "+ gridSize +"m"
				}
				
				$("#info_Gridsize").text(gridSizsText); //격자크기
				$("#info_Gridcnt").text($catchmentAreaDataBoard.ui.comma(girdCnt)); //영역 내 격자 개수
				$("#info_Areasize").html($catchmentAreaDataBoard.ui.comma(gridTotAreaSize)+"m<sup>2</sup>"); // 총 격자면적
			},
			
			clearSelectGrid : function(){
				$("#select_grid_sum").html("0");
				$("#select_gridNm").html("");
				$("#select_legend").css("background","");
				$("#select_legend").css("border","");
			},
			
			sortData : function(data, standard){
				data.sort(function(a, b){
					return a.standard - b.standard;
				});
				
				return data;
			},
			
			clearDataBord : function(){
				$('#popChart').highcharts().destroy(); //차트
				$('#familyChart').highcharts().destroy();
				$('#houseChart').highcharts().destroy();
				$('#coprChart').highcharts().destroy();
				$('#workerChart').highcharts().destroy();
			},
			
			setBaseYearBox : function(pSelGb, pListGb, detailSelectBoxId, isDetailYear){
				//SGIS4_1027_생활권역 시작
				// pSelGb: 1-영향권(인구/가구/주택), 2-영향권(사업체/종사자), 3-격자, 
				//							   4(미사용)-그 외    ex) 상세분석(공간+시간), 상세분석(상관관계), 단 4번은 detailSelectBoxId 값, 즉 정확하게 해당 selectBox의 값을 줘야한다.	- pse 2020-10-20 작성
				//							   5(미사용)-상관관계 분석
				//							   6-(시간적 비교)연도1, 7-(시간적 비교)연도2
				// pListGb: A-인구/가구/주택, B-사업체/종사자, C-공시지가
				var $selObj;
				if(pSelGb == '1'){
					$selObj = $('#bYearSel01'); 
				}else if(pSelGb == '2'){
					$selObj = $('#bYearSel02'); 
				}else if(pSelGb == '3'){
					$selObj = $('#bYearSel06'); 
				}else if(pSelGb == '4' && detailSelectBoxId) {
					//$selObj = $('#'+detailSelectBoxId);
				}else if(pSelGb == '5'){
					//$selObj = $('#bYearSel05'); 
				}else if(pSelGb == '6'){
					$selObj = $('#year_select1'); 
				}else if(pSelGb == '7'){
					$selObj = $('#year_select2'); 
				}

				if($selObj != null && $selObj!= undefined){					
					var years;
					if(pListGb == 'A'){
						years = $catchmentAreaMain.ui.statsBaseYear01;												
					}else if(pListGb == 'B'){
						years = $catchmentAreaMain.ui.statsBaseYear02;												
					}else if(pListGb == 'C'){
						years = $catchmentAreaMain.ui.statsBaseYear03;												
					}
					
					var prevSelVal = $selObj.val();	//이전값

					$selObj.empty();
					if(pSelGb == '6' || pSelGb == '7'){
						$selObj.append('<option value="">선택하세요</option>');
					}
					
					for (var i=0; i < years.length; i++) {				
						$selObj.append('<option value="'+years[i]+'">'+years[i]+'</option>');
					}
					
					if(pSelGb == '6' || pSelGb == '7'){
						if($selObj.find('option[value="' + prevSelVal + '"]').length === 1){
							$selObj.val(prevSelVal).prop("selected", true);
						}else{
							$selObj.find('option:eq(0)').prop("selected", true);
						}						
					}else{
						$selObj.val(years[0]).prop("selected", true);
						
						if(pSelGb == '1'){	
				        	var param = {};
				        	param.processGb = "sel";
				        	param.elemId = "#areaSetting .select_constYear";
				        	param.bClassCd = "SA" + years[0];
				        	
				        	$catchmentAreaMain.ui.getCodeData(param);
						}						
						
						if(pSelGb == '3' || pSelGb == '4'){						
							$selObj.trigger("change");
						}						
					}
				}
				//SGIS4_1027_생활권역 끝
			},
			
			/**
			 * 
			 * @name         : 	getGridInfoFromMap
			 * @autor		 :  pse
			 * @description  : 	그리드와 관련된 데이터보드를 그리기 위해서 정보를 Ajax로 읽어오는 메소드이다.
			 * 					그리고 return 값은 Promise 인데, 이것은 grid 정보를 얻어오는 것이 하나의 지도에서만 얻어오는 경우도 있지만, 지도가 좌,우로 같이 있는 경우도 있다. 
			 * 					두 지도의 격자 데이터를 AJAX로 요청한 후, 두 ajax 요청이 다 마쳐야만 할 수 있는 작업들이 있다. ex: 차트(highcharts)
			 * 					이런 경우 때문에 Promise를 반환하고, 이 메소드를 사용하는 곳에서는 아래 처럼 사용하면 된다.
			 * 		
			 * 	Promise.all([getGridInfoFromMap(~), getGridInfoFromMap(~)])
			 *  .then(function(result){
			 * 		//하고 싶은 작업 하기...
			 *  });
			 * 
			 * @reference	 : https://ko.javascript.info/promise-api 
			 * @주의할_점		 : IE에서 동작이 안될 거 같지만, 이미 Polyfill이 존재해서 잘 동작한다.
			 */
			getGridInfoFromMap: function (mapId, options) {	// 작업중
				
			    return new Promise(function (resolve, reject) {
			        $.ajax({
			            url: contextPath + '/ServiceAPI/OpenAPI3/catchmentArea/getGridSrvAreaDataBoardList.json',
			            dataType: 'json',
			            data: {
			                base_year: options.baseYear,
			                accessToken: accessToken,
			                grid_level: options.grid_level,
			                area: options.area,
			                statType: options.statType,
			                srvAreaType: options.srvAreaType
			            },
			            success: function (result) {
			                var promiseResult = {
			                    result: result.result,
			                    mapId: mapId
			                };
			                resolve(promiseResult);
			            },
			            error: function (error) {
			                reject(new Error('데이터보드 생성시 문제가 생겼습니다.'));
			            }
			        });
			    
			    });
			},
			
			//SGIS4_1025_생활권역 시작
			setDetailDataBoard : function(divType, dataType){

	        	$catchmentAreaDataBoard.ui.changeScreenForAreaDataboard(true, dataType);
				
				var dataTitle = "";
				var dataYear = "";
				var rangeType = $catchmentAreaDataBoard.ui.statDataOption.params.rangeType;
				var rangeVal = $catchmentAreaDataBoard.ui.statDataOption.params.rangeVal;

				if(dataType == "pops"){//인구
					dataTitle = "인구";
					dataYear = $("#bYearSel01").val();
				}else if(dataType == "family"){//가구
					dataTitle = "가구";
					dataYear = $("#bYearSel01").val();
				}else if(dataType == "house"){//주택
					dataTitle = "주택";
					dataYear = $("#bYearSel01").val();
				}else if(dataType == "copr"){//사업체
					dataTitle = "사업체";
					dataYear = $("#bYearSel02").val();
				}else{//종사자
					dataTitle = "종사자";
					dataYear = $("#bYearSel02").val();
				}
				
				$("#datail_data_type").html(dataTitle);
				$("#datail_data_year").html("("+ dataYear + "년 기준)");

				if(!$('.dtlCond_chk.on').is(':visible') || divType == "basic"){
					//기본정보보기
					$("#chkDetail").hide();
					$("#basicDetail").show();
					
					$catchmentAreaDataBoard.ui.basicDetailData(dataType, dataYear, rangeType, rangeVal);
				}else{
					//세부조선 설정 보기
					$("#basicDetail").hide();
					$("#chkDetail").show();
					
					$catchmentAreaDataBoard.ui.showChkDetailDiv(dataType);
				}
			},
			
			basicDetailData : function(dataType, baseYear, rangType, rangeVal){
				var rangTypeTemp = "rgChk";
				
				if(rangType == "stats01"){
					rangTypeTemp = "T_" + rangeVal;
				}else if(rangType == "stats02"){
					rangTypeTemp = "D_" + rangeVal;
				}else if(rangType == "stats03"){
					rangTypeTemp = "C_" + rangeVal;
				}
				//종사자가 copr에 종사자수, 사업체수 같이 들어있어서..
				var tempDataType = dataType;
				if(tempDataType == "employee"){
					tempDataType = "copr";
				}
				var statsData = $catchmentAreaObj.statsALLmap[tempDataType][baseYear][rangTypeTemp]["data"];
				
				var data = [];
				var dataTot = 0;
				var chartColor = [];
				var colorPalette = ['#D66B44','#ffaa01','#fed747','#D8C8B2','#0B2E5D','#2A7AC1','#7DB6E9','#91e8e1','#CBE9F0','#B82647','#ED5980','#D584B9','#F1B49A','#35908F','#6AB048','#90ed7d','#bdce3b','#6A5BA8','#8085e9','#434348','#7A7D7F'];
				
				if(dataType == "pops"){
					chartColor = ['#D66B44','#E28E49', '#EBA04E', '#F0AF52', '#F6BD58', '#F9CC60', '#FCDA70', '#FDE48B', '#FEEEB0'];
					
					data.push({name : "0~9세 인구", y : statsData[0].age_1_cnt});
					data.push({name : "10~19세 인구", y : statsData[0].age_2_cnt});
					data.push({name : "20~29세 인구", y : statsData[0].age_3_cnt});
					data.push({name : "30~39세 인구", y : statsData[0].age_4_cnt});
					data.push({name : "40~49세 인구", y : statsData[0].age_5_cnt});
					data.push({name : "50~59세 인구", y : statsData[0].age_6_cnt});
					data.push({name : "60~69세 인구", y : statsData[0].age_7_cnt});
					data.push({name : "70~79세 인구", y : statsData[0].age_8_cnt});
					data.push({name : "80세 이상 인구", y : statsData[0].age_9_cnt});
					//data.push({name : "90~99세 인구", y : statsData[0].age_10_cnt});
					//data.push({name : "100세이상 인구", y : statsData[0].age_11_cnt});
					
					dataTot = statsData[0].tot_ppltn_cnt;
					$('#basicDetailTot').html('<span class="sa_txt01">영역 내 전체 인구</span>' + $catchmentAreaDataBoard.ui.comma(statsData[0].popsTotOgl) + '<span class="sa_txt04">명</span>');
				}else if(dataType == "family"){
					//SGIS4_1001_생활권역 시작
					chartColor = ['#ED5980', '#ffaa01', '#7DB6E9'];
					data.push({name : "친족 가구", y : statsData[0].family_3_cnt});
					data.push({name : "1인 가구", y : statsData[0].family_1_cnt});
					data.push({name : "비친족 가구", y : statsData[0].family_2_cnt});					
					//SGIS4_1001_생활권역 끝
					
					dataTot = statsData[0].tot_family_cnt;
					$('#basicDetailTot').html('<span class="sa_txt01">영역 내 전체 가구</span>' + $catchmentAreaDataBoard.ui.comma(statsData[0].familyTotOgl) + '<span class="sa_txt04">가구</span>');
				}else if(dataType == "house"){
					chartColor = ['#7DB6E9','#ffaa01','#93EC85','#fed747', '#35908F'];
					
					data.push({name : "단독주택", y : statsData[0].house_1_cnt});
					data.push({name : "아파트", y : statsData[0].house_2_cnt});
					data.push({name : "연립주택", y : statsData[0].house_3_cnt});
					data.push({name : "다세대주택", y : statsData[0].house_4_cnt});
					data.push({name : "비거주용 건물 내주택", y : statsData[0].house_5_cnt});
					//data.push({name : "주택이외의 거처", y : statsData[0].house_6_cnt});
					
					dataTot = statsData[0].tot_house_cnt;
					$('#basicDetailTot').html('<span class="sa_txt01">영역 내 전체 주택</span>' + $catchmentAreaDataBoard.ui.comma(statsData[0].houseTotOgl) + '<span class="sa_txt04">호</span>');
				}else if(dataType == "copr"){
					var tempData = [];
					$.each(statsData, function(index, item){
						if(item.name != "전체"){
							//chartColor.push(colorPalette[index]);
							tempData.push({name : item.name, y : item.corp_cnt});
						}else{
							dataTot = item.corp_cnt;
						}
					});
					
					//top 3
					tempData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;						
					});
					var top3Cnt = 0;
					for(var i=0; i<3; i++){
						chartColor.push(colorPalette[i]);
						data.push({name : tempData[i].name, y : tempData[i].y});
						top3Cnt += tempData[i].y;
					}
					
					data.push({name : "기타사업체", y : dataTot - top3Cnt});
					chartColor.push('#E9E9E9');
					
					$('#basicDetailTot').html('<span class="sa_txt01">영역 내 전체 사업체</span>' + $catchmentAreaDataBoard.ui.comma(dataTot) + '<span class="sa_txt04">개</span>');
				}else{
					var tempData = [];
					$.each(statsData, function(index, item){
						if(item.name != "전체"){
							//chartColor.push(colorPalette[index]);
							tempData.push({name : item.name, y : item.employee_cnt});
						}else{
							dataTot = item.employee_cnt;
						}
					});
					
					//top 3
					tempData.sort(function (a, b) {
						return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;						
					});
					
					var top3Cnt = 0;
					for(var i=0; i<3; i++){
						chartColor.push(colorPalette[i]);
						data.push({name : tempData[i].name, y : tempData[i].y});
						top3Cnt += tempData[i].y;
					}
					
					data.push({name : "기타사업체", y : dataTot - top3Cnt})
					chartColor.push('#E9E9E9');
					
					$('#basicDetailTot').html('<span class="sa_txt01">영역 내 전체 종사자</span>' + $catchmentAreaDataBoard.ui.comma(dataTot) + '<span class="sa_txt04">명</span>');
				}
				
				//기본 상세보기 차트
				$catchmentAreaDataBoard.ui.setDatailPieChart(dataType, data, "basicDetailChart", 480, 320, chartColor);
				//기본 상세보기 범례
				$catchmentAreaDataBoard.ui.setDatailLegend(data, chartColor);
				//기본 상세보기 표
				$catchmentAreaDataBoard.ui.setBasicDatailTable(dataTot, data);
			},
			
			setDatailPieChart : function(dataType, statData, target, pWidth, pHeight, statColors){
				var unitNm = "명";
				if(dataType == 'family'){
					unitNm = "가구";
				}else if(dataType == 'house'){
					unitNm = "호";
				}else if(dataType == 'copr'){
					unitNm = "개";
				}

				$.each(statData, function(index, item){
					if(dataType == 'copr' || dataType == 'employee'){
						if(item.name !== undefined && item.name !== null && item.name.length > 10){
							item['d_name'] = item.name.substring(0, 8) + '...';
						}else{
							item['d_name'] = item.name;
						}
					}else{
						item['d_name'] = item.name;
					}
				});				

				$("#"+target).highcharts({
					chart: {
		  				type: 'pie',
		  				spacing: 50,
		  				//margin: 10,
		  				width: pWidth,
		  				height: pHeight
		  			},
		  			title: {
		  				text : ''
		  			},
		  			tooltip: {
		  				//SGIS4_생활권역 시작
		  		        pointFormat: '<b>{point.y} ' + unitNm + '</b><br/>{point.percentage:.1f} %'
		  		        //SGIS4_생활권역 끝
		  		    },
		  			exporting: {
		  		        enabled: false
		  		    },
		  			plotOptions: {
						pie: {
							allowPointSelect: true,
						    cursor: 'pointer',
						    dataLabels: {
						    	//distance: 10,
						        //format: '{y:,.0f}' + unitNm,						    	
						    	//crop : true,
						    	//overflow : "justify",
						        format: '{point.d_name}<br/>{point.y:,.0f} ' + unitNm,
						        //alignTo: 'connectors',		//plotEdges, connectors
						        style :{
						        	fontSize : '13px'
						        	, fontWeight: 'normal'
						        	//textOverflow: 'ellipsis',		// clip,   ellipsis
						        	//fontFamily : 'Dotum',
						        	//SGIS4_1027_생활권역 시작
						        	, color : 'black'		// darkorange, steelblue, darkolivegreen, slategray
						        	//SGIS4_1027_생활권역 끝	
						        }
						    }
	                   },
	               },
	               
	               legend : {
	            	   align: 'center',
	               },
	               
	               series: [{
		  				size: '100%',
		  			    innerSize: '40%',
		  				data: statData,
		  				colors : statColors
		  			}]
				});
			},
			
			setBasicDatailTable : function(totData, statData){
				var html = "";
		
				$.each(statData, function(index, item){
					html += "<tr>";
					html += 	"<td>"+(index+1)+"</td>";
					html += 	"<td>"+item.name+"</td>";
					html += 	"<td>"+$catchmentAreaDataBoard.ui.comma(item.y)+"</td>";
					html += 	"<td>"+((item.y/totData)*100).toFixed(1)+"</td>";
					html += "</tr>"
				});
				
				$("#detail_data_list").html(html);
				
				//SGIS4_1027_생활권역 시작(ie)
				var agent = navigator.userAgent.toLowerCase();
				if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
					if(statData !== undefined && statData !== null){
						var loopCnt = statData.length;
						if(loopCnt > 0){
							var tblH = $("#detail_data_list").height();
							//if(tblH === undefined || tblH === null){
								tblH = 216;
							//}
							var trH = Math.floor(tblH / loopCnt);
							
							$("#detail_data_list tr").css('height', trH + 'px');
						}else{
							//
						}					
					}
				}
				//SGIS4_1027_생활권역 끝				
				
				$catchmentAreaLeftMenu.event.resizePopup();
			},
			
			setDatailLegend : function(statData, statColors){
				var html = "";
				
				$.each(statData, function(index, item){
					html += "<a href='javascript:void(0);' style='margin-right: 30px; min-width: 100px;'>"
					html += 	"<span style='display: inline-block; width: 13px; height: 9px; background: "+statColors[index]+"; margin-right: 5px;'></span>";
					html += 	"<span>"+item.name+"</span>";
					html += "</a>"
				});
				
				$("#basicDatilLengd").html(html);
			},
			
			//세부조건 설정 상세통계정보 - 해당 세부항목에 대한 전체 데이터
			setChkDetailAllData : function(dataType, params, statData){
				if(dataType == 'pops'){
					var popsData  = [];
					var popsCategories  = [];
					
					if(params.stats_class_gb == 'age_5'){//5세 단위
						//$("#popTotTitle").html("영역 내 5세 단위 인구 수");
						
						popsCategories = ['0~4세 인구', '5~9세 인구', '10~14세 인구', '15~19세 인구', '20~24세 인구', '25~29세 인구', '30~34세 인구', '35~39세 인구'
							, '40~44세 인구', '45~49세 인구', '50~54세 인구', '55~59세 인구', '60~64세  인구', '65~69세  인구', '70~74세  인구', '75~79세  인구', '80~84세  인구'
							, '85~89세  인구', '90세이상 인구'/* '90~94세  인구', '95~99세  인구', '100세이상 인구'*/]; //SGIS4_1210_생활권역
						if(statData == null){
							popsData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //SGIS4_1210_생활권역
						}else{
							//SGIS4_1210_생활권역 시작
							popsData = [statData[0].age_1_cnt == null ? 0 : statData[0].age_1_cnt, statData[0].age_2_cnt == null ? 0 : statData[0].age_2_cnt
									, statData[0].age_3_cnt == null ? 0 : statData[0].age_3_cnt, statData[0].age_4_cnt == null ? 0 : statData[0].age_4_cnt
									, statData[0].age_5_cnt == null ? 0 : statData[0].age_5_cnt, statData[0].age_6_cnt == null ? 0 : statData[0].age_6_cnt
									, statData[0].age_7_cnt == null ? 0 : statData[0].age_7_cnt, statData[0].age_8_cnt == null ? 0 : statData[0].age_8_cnt
									, statData[0].age_9_cnt == null ? 0 : statData[0].age_9_cnt, statData[0].age_10_cnt == null ? 0 : statData[0].age_10_cnt
									, statData[0].age_11_cnt == null ? 0 : statData[0].age_11_cnt, statData[0].age_12_cnt == null ? 0 : statData[0].age_12_cnt
									, statData[0].age_13_cnt == null ? 0 : statData[0].age_13_cnt, statData[0].age_14_cnt == null ? 0 : statData[0].age_14_cnt
									, statData[0].age_15_cnt == null ? 0 : statData[0].age_15_cnt, statData[0].age_16_cnt == null ? 0 : statData[0].age_16_cnt
									, statData[0].age_17_cnt == null ? 0 : statData[0].age_17_cnt, statData[0].age_18_cnt == null ? 0 : statData[0].age_18_cnt
									, statData[0].age_19_cnt == null ? 0 : statData[0].age_19_cnt/*, statData[0].age_20_cnt == null ? 0 : statData[0].age_20_cnt
									, statData[0].age_21_cnt == null ? 0 : statData[0].age_21_cnt*/];
							//SGIS4_1210_생활권역 끝
						}
						/*
						popsData.push({name : "0~4세 인구", data : statData[0].age_1_cnt});
						popsData.push({name : "5~9세 인구", data : statData[0].age_2_cnt});
						popsData.push({name : "10~14세 인구", data : statData[0].age_3_cnt});
						popsData.push({name : "15~19세 인구", data : statData[0].age_4_cnt});
						popsData.push({name : "20~24세 인구", data : statData[0].age_5_cnt});
						popsData.push({name : "25~29세 인구", data : statData[0].age_6_cnt});
						popsData.push({name : "30~34세 인구", data : statData[0].age_7_cnt});
						popsData.push({name : "35~39세 인구", data : statData[0].age_8_cnt});
						popsData.push({name : "40~44세 인구", data : statData[0].age_9_cnt});
						popsData.push({name : "45~49세 인구", data : statData[0].age_10_cnt});
						popsData.push({name : "50~54세 인구", data : statData[0].age_11_cnt});
						popsData.push({name : "55~59세 인구", data : statData[0].age_12_cnt});
						popsData.push({name : "60~64세  인구", data : statData[0].age_13_cnt});
						popsData.push({name : "65~69세  인구", data : statData[0].age_14_cnt});
						popsData.push({name : "70~74세  인구", data : statData[0].age_15_cnt});
						popsData.push({name : "75~79세  인구", data : statData[0].age_16_cnt});
						popsData.push({name : "80~84세  인구", data : statData[0].age_17_cnt});
						popsData.push({name : "85~89세  인구", data : statData[0].age_18_cnt});
						popsData.push({name : "90~94세  인구", data : statData[0].age_19_cnt});
						popsData.push({name : "95~99세  인구", data : statData[0].age_20_cnt});
						popsData.push({name : "100세이상 인구", data : statData[0].age_21_cnt});
						*/

					}else if(params.stats_class_gb == 'age_10'){//10세 단위
						//$("#popTotTitle").html("영역 내 10세 단위 인구 수");
						
						popsCategories = ['0~9세 인구', '10~19세 인구', '20~29세 인구', '30~39세 인구', '40~49세 인구', '50~59세 인구', '60~69세 인구'
							, '70~79세 인구', '80~89세 인구', '90세이상 인구'/*'90~99세 인구', '100세이상 인구'*/]; //SGIS4_1210_생활권역
						
						if(statData == null){
							popsData = [0,0,0,0,0,0,0,0,0,0]; //SGIS4_1210_생활권역
						}else{
							popsData = [statData[0].age_1_cnt == null ? 0 : statData[0].age_1_cnt, statData[0].age_2_cnt == null ? 0 : statData[0].age_2_cnt
									, statData[0].age_3_cnt == null ? 0 : statData[0].age_3_cnt, statData[0].age_4_cnt == null ? 0 : statData[0].age_4_cnt
									, statData[0].age_5_cnt == null ? 0 : statData[0].age_5_cnt, statData[0].age_6_cnt == null ? 0 : statData[0].age_6_cnt
									, statData[0].age_7_cnt == null ? 0 : statData[0].age_7_cnt, statData[0].age_8_cnt == null ? 0 : statData[0].age_8_cnt
									, statData[0].age_9_cnt == null ? 0 : statData[0].age_9_cnt, statData[0].age_10_cnt == null ? 0 : statData[0].age_10_cnt
									/*, statData[0].age_11_cnt == null ? 0 : statData[0].age_11_cnt*/]; //SGIS4_1210_생활권역
						}
						
							console.log(popsData);
							/*
						popsData.push({name : "0~9세 인구", data : statData[0].age_1_cnt});
						popsData.push({name : "10~19세 인구", data : statData[0].age_2_cnt});
						popsData.push({name : "20~29세 인구", data : statData[0].age_3_cnt});
						popsData.push({name : "30~39세 인구", data : statData[0].age_4_cnt});
						popsData.push({name : "40~49세 인구", data : statData[0].age_5_cnt});
						popsData.push({name : "50~59세 인구", data : statData[0].age_6_cnt});
						popsData.push({name : "60~69세 인구", data : statData[0].age_7_cnt});
						popsData.push({name : "70~79세 인구", data : statData[0].age_8_cnt});
						popsData.push({name : "80~89세 인구", data : statData[0].age_9_cnt});
						popsData.push({name : "90~99세 인구", data : statData[0].age_10_cnt});
						popsData.push({name : "100세이상 인구", data : statData[0].age_11_cnt});
						*/
					}else{//주요구간
						//$("#popTotTitle").html("영역 내 주요구간 인구 수");
						
						popsCategories = ['0~14세 인구', '20~34세 인구', '35~64세 인구', '15~64세 인구', '65세이상 인구', '80세이상 인구'];
						
						if(statData == null){
							popsData = [0,0,0,0,0,0,0];
						}else{
							popsData = [statData[0].age_1_cnt == null ? 0 : statData[0].age_1_cnt, statData[0].age_2_cnt == null ? 0 :  statData[0].age_2_cnt
									, statData[0].age_3_cnt == null ? 0 : statData[0].age_3_cnt, statData[0].age_4_cnt == null ? 0 : statData[0].age_4_cnt
									, statData[0].age_5_cnt == null ? 0 : statData[0].age_5_cnt, statData[0].age_6_cnt == null ? 0 : statData[0].age_6_cnt];
						}

							/*
						popsData.push({name : "0~14세 인구", data : statData[0].age_1_cnt});
						popsData.push({name : "20~34세 인구", data : statData[0].age_2_cnt});
						popsData.push({name : "35~64세 인구", data : statData[0].age_3_cnt});
						popsData.push({name : "15~64세 인구", data : statData[0].age_4_cnt});
						popsData.push({name : "65세이상 인구", data : statData[0].age_5_cnt});
						popsData.push({name : "80세이상 인구", data : statData[0].age_6_cnt});
						*/
					}
					
					$catchmentAreaDataBoard.ui.setChkDetailAllBarChart(dataType, "popTotDChart", popsCategories, popsData, 460, 370);
				}else if(dataType == 'family'){
					var familyPieData = [];
					
					if(statData == null){
						familyPieData.push({name : "친족 가구", y : 0});
						familyPieData.push({name : "1인 가구", y : 0});
						familyPieData.push({name : "비친족 가구", y : 0});						
						
						var familyCategories = ['1세대 가구', '2세대 가구', '3세대 가구', '4세대 이상'];
						var familyData = [0, 0, 0, 0];
					}else{
						//파이차트
						familyPieData.push({name : "친족 가구", y : statData[0].f03_cnt  == null ? 0 : statData[0].f03_cnt});
						familyPieData.push({name : "1인 가구", y : statData[0].f01_cnt == null ? 0 : statData[0].f01_cnt});
						familyPieData.push({name : "비친족 가구", y : statData[0].f02_cnt  == null ? 0 : statData[0].f02_cnt});						
						
						//bar차트
						var familyCategories = ['1세대 가구', '2세대 가구', '3세대 가구', '4세대 이상'];
						var familyData = [statData[0].f04_cnt == null ? 0 : statData[0].f04_cnt, statData[0].f05_cnt == null ? 0 : statData[0].f05_cnt
							, statData[0].f06_cnt == null ? 0 : statData[0].f06_cnt, statData[0].f07_cnt == null ? 0 : statData[0].f07_cnt];
						
						var familyColor = ['#ED5980', '#ffaa01', '#7DB6E9'];
					}

					$catchmentAreaDataBoard.ui.dTotPieChart('family', familyPieData, 'familyTotDPieChart', 450, 180, familyColor);
					//SGIS4_1027_생활권역 시작
					$catchmentAreaDataBoard.ui.createBarChart('familyTotDBarChart', familyCategories, familyData, this.getTypeUnit(dataType), 450, 180);
					//SGIS4_1027_생활권역 끝
					
				}else if(dataType == 'house'){
					var houseData  = [];
					var houseCategories  = [];
					if(statData == null){
						if(params.stats_class_gb == 'area'){//연면적
							houseCategories = ['20㎡ 이하', '20㎡ ~ 40㎡', '40㎡ ~ 60㎡', '60㎡ ~ 85㎡', '85㎡ ~ 100㎡',
								'100㎡ ~ 130㎡', '130㎡ ~ 165㎡', '165㎡ ~ 230㎡', '230㎡ 초과'];
							houseData = [0,0,0,0,0,0,0,0,0];
						}else{
							houseCategories = ['단독주택', '아파트', '연립주택', '다세대주택', '비거주용 건물 내 주택'];
							houseData = [0,0,0,0,0];
						}
					}else{
						if(params.stats_class_gb == 'area'){//연면적
							houseCategories = ['20㎡ 이하', '20㎡ ~ 40㎡', '40㎡ ~ 60㎡', '60㎡ ~ 85㎡', '85㎡ ~ 100㎡',
								'100㎡ ~ 130㎡', '130㎡ ~ 165㎡', '165㎡ ~ 230㎡', '230㎡ 초과'];
							houseData = [statData[0].h01_cnt  == null ? 0 : statData[0].h01_cnt, statData[0].h02_cnt == null ? 0 : statData[0].h02_cnt
								, statData[0].h03_cnt == null ? 0 : statData[0].h03_cnt, statData[0].h04_cnt  == null ? 0 : statData[0].h04_cnt
								, statData[0].h05_cnt == null ? 0 : statData[0].h05_cnt, statData[0].h06_cnt == null ? 0 : statData[0].h06_cnt
								, statData[0].h07_cnt == null ? 0 : statData[0].h07_cnt, statData[0].h08_cnt == null ? 0 : statData[0].h08_cnt
								, statData[0].h09_cnt == null ? 0 : statData[0].h09_cnt];
						}else{
							houseCategories = ['단독주택', '아파트', '연립주택', '다세대주택', '비거주용 건물 내 주택'];
							houseData  = [statData[0].h01_cnt == null ? 0 : statData[0].h01_cnt, statData[0].h02_cnt == null ? 0 : statData[0].h02_cnt
								, statData[0].h03_cnt == null ? 0 : statData[0].h03_cnt, statData[0].h04_cnt == null ? 0 : statData[0].h04_cnt , statData[0].h05_cnt == null ? 0 : statData[0].h05_cnt];
						}
					}

					$catchmentAreaDataBoard.ui.setChkDetailAllBarChart(dataType, "houseTotDBarChart", houseCategories, houseData, 460, 410);
					
				}else if(dataType == 'copr'){
					var coprCategories = [];
					var coprData = [];
					
					//SGIS4_1001_생활권역 시작
					var condInfo = params.copr_cond;
					var isLifeBiz = false;
					if(condInfo !== undefined && condInfo !== null){
						var splitStr = condInfo.split('_');
						if(splitStr.length >= 4){
							if(splitStr[3] === "Y"){
								isLifeBiz = true;
							}
						}
					}
					
					if(statData.length == 1){//소분류, 세분류, 세세분류
						if(statData[0].hasOwnProperty('ksic_5_cd')){//세세분류
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_1_cd + ". ")) + statData[0].ksic_1_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_2_cd + ". ")) + statData[0].ksic_2_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_3_cd + ". ")) + statData[0].ksic_3_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_4_cd + ". ")) + statData[0].ksic_4_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_5_cd + ". ")) + statData[0].ksic_5_cd_nm);
							
							coprData.push(statData[0].ksic_1_cnt);
							coprData.push(statData[0].ksic_2_cnt);
							coprData.push(statData[0].ksic_3_cnt);
							coprData.push(statData[0].ksic_4_cnt);
							coprData.push(statData[0].ksic_5_cnt);
						}else if(statData[0].hasOwnProperty('ksic_4_cd')){//세분류
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_1_cd + ". ")) + statData[0].ksic_1_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_2_cd + ". ")) + statData[0].ksic_2_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_3_cd + ". ")) + statData[0].ksic_3_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_4_cd + ". ")) + statData[0].ksic_4_cd_nm);
							
							coprData.push(statData[0].ksic_1_cnt);
							coprData.push(statData[0].ksic_2_cnt);
							coprData.push(statData[0].ksic_3_cnt);
							coprData.push(statData[0].ksic_4_cnt);
						}else{//소분류
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_1_cd + ". ")) + statData[0].ksic_1_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_2_cd + ". ")) + statData[0].ksic_2_cd_nm);
							coprCategories.push((isLifeBiz ? "" : (statData[0].ksic_3_cd + ". ")) + statData[0].ksic_3_cd_nm);
							
							coprData.push(statData[0].ksic_1_cnt);
							coprData.push(statData[0].ksic_2_cnt);
							coprData.push(statData[0].ksic_3_cnt);
						}	
					}else{//대분류, 중분류
						statData.sort(function (a, b) {
							return a.grp_id < b.grp_id ? -1 : a.grp_id > b.grp_id ? 1 : 0;					
						});
						
						$.each(statData, function(idx, item){
							coprCategories.push((isLifeBiz ? "" : (item.grp_id + ". ")) + item.grp_nm);
							coprData.push(item.copr_cnt);
						});	
					}					
					//SGIS4_1001_생활권역 끝
					
					$catchmentAreaDataBoard.ui.setChkDetailAllBarChart(dataType, "coprTotDBarChart", coprCategories, coprData, 460, 410);
				}else{
					var employeeCategories = [];
					var employeeData = [];

					//SGIS4_1001_생활권역 시작
					var condInfo = params.copr_cond;
					var isLifeBiz = false;
					if(condInfo !== undefined && condInfo !== null){
						var splitStr = condInfo.split('_');
						if(splitStr.length >= 4){
							if(splitStr[3] === "Y"){
								isLifeBiz = true;
							}
						}
					}
					
					if(statData.length == 1){//소분류, 세분류, 세세분류
						if(statData[0].hasOwnProperty('ksic_5_cd')){//세세분류
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_1_cd + ". ")) + statData[0].ksic_1_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_2_cd + ". ")) + statData[0].ksic_2_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_3_cd + ". ")) + statData[0].ksic_3_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_4_cd + ". ")) + statData[0].ksic_4_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_5_cd + ". ")) + statData[0].ksic_5_cd_nm);
							
							employeeData.push(statData[0].ksic_1_cnt);
							employeeData.push(statData[0].ksic_2_cnt);
							employeeData.push(statData[0].ksic_3_cnt);
							employeeData.push(statData[0].ksic_4_cnt);
							employeeData.push(statData[0].ksic_5_cnt);
						}else if(statData[0].hasOwnProperty('ksic_4_cd')){//세분류
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_1_cd + ". ")) + statData[0].ksic_1_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_2_cd + ". ")) + statData[0].ksic_2_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_3_cd + ". ")) + statData[0].ksic_3_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_4_cd + ". ")) + statData[0].ksic_4_cd_nm);
							
							employeeData.push(statData[0].ksic_1_cnt);
							employeeData.push(statData[0].ksic_2_cnt);
							employeeData.push(statData[0].ksic_3_cnt);
							employeeData.push(statData[0].ksic_4_cnt);
						}else{//소분류
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_1_cd + ". ")) + statData[0].ksic_1_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_2_cd + ". ")) + statData[0].ksic_2_cd_nm);
							employeeCategories.push((isLifeBiz ? "" : (statData[0].ksic_3_cd + ". ")) + statData[0].ksic_3_cd_nm);
							
							employeeData.push(statData[0].ksic_1_cnt);
							employeeData.push(statData[0].ksic_2_cnt);
							employeeData.push(statData[0].ksic_3_cnt);
						}	
					}else{//대분류, 중분류
						statData.sort(function (a, b) {
							return a.grp_id < b.grp_id ? -1 : a.grp_id > b.grp_id ? 1 : 0;
						});
						
						$.each(statData, function(idx, item){
							employeeCategories.push((isLifeBiz ? "" : (item.grp_id + ". ")) + item.grp_nm);
							employeeData.push(item.employee_cnt);
						});	
					}
					//SGIS4_1001_생활권역 끝
					
					$catchmentAreaDataBoard.ui.setChkDetailAllBarChart(dataType, "employeeTotDBarChart", employeeCategories, employeeData, 460, 410);
				}
			},
			
			setChkDetailAllBarChart : function(dataType, target, xCategories, statData, pWidth, pHeight){
				var unitNm = "명";
				if(dataType == 'family'){
					unitNm = "가구";
				}else if(dataType == 'house'){
					unitNm = "호";
				}else if(dataType == 'copr'){
					unitNm = "개";
				}
				
				if(xCategories !== undefined && xCategories !== null){
					for(var i = 0; i < xCategories.length; i++) {
						xCategories[i] = xCategories[i].replace(/ /gi, "&nbsp;");
					}
				}

				$("#"+target).highcharts({
					chart: {
		  				type: 'bar',
		  				width: pWidth,
		  				height: pHeight,
		  				spacingRight : 20,
		  				marginRight: 20
		  			},
		  			title: {
		  				text : ''
		  			},
		  			tooltip: {
		  				//SGIS4_생활권역 시작
		  		        pointFormat: '<b>{point.y} ' + unitNm + '</b>',
		  		        useHTML: true
		  		        //SGIS4_생활권역 끝
		  		    },
		  			exporting: {
		  		        enabled: false
		  		    },
		  		    xAxis : {
						categories: xCategories,
						labels : { 
							rotation : 0,
							//enabled: labelsVisible
							useHTML : true
						}
					},
					yAxis : {
						min : 0,
						title : {
							text : ''
						}
					},
		  			plotOptions: {
						pie: {
							allowPointSelect: true,
						    cursor: 'pointer',
						    dataLabels: {
						    	distance: 5,
						        format: '{y:,.0f}' + unitNm,
						        style :{
						        	fontSize : "13px"
						        }
						    }
	                   },
	               },
	               legend : {
	            	   enabled: false
	               },
	               
	               series: [{
		  				data: statData,
		  			}]
				});
			},
			
			//세부조건 설정 상세통계정보 - 세부조건 설정한 데이터
			setChkDeatailData : function(pData, pOpt){		
				var sData = pData;
				var params = pOpt.params;
				var sItems;
				var sItem;

				//인구
				if(sData.hasOwnProperty('pops')){
					$("#popTotBtn a").removeClass("active");
					if(params.stats_class_gb == "age_5"){
						$("#popTotBtn a").eq(0).addClass("active");
					}else if(params.stats_class_gb == "age_10"){
						$("#popTotBtn a").eq(1).addClass("active");
					}else{
						$("#popTotBtn a").eq(2).addClass("active");
					}
					
					sItems = sData.pops; //인구
					var sItems2 = sData.pops_gender;//성별
					var isClear = true;
					//SGIS4_생활권역 시작
					var totCnt = Number($("#totPops").attr('data-total-ogl'));	// 표출 총값
					var totPerCnt = sData.pops_class[0].tot_ppltn_cnt;
					
					if(totCnt > 0){
						if(sItems instanceof Array && sItems.length > 0){							
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["ppltn_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
									
									if(itemCnt > totCnt){	// 1개뿐인 표출 항목이 표출 총값보다 크면
										itemCnt = totCnt;
									}								
									
									//세부조건 - 상세보기
									$catchmentAreaDataBoard.ui.createSolidGaugeChart('popDChart', itemCnt, totPerCnt, 240, 140);
									$("#dPopTot").html('영역 내 전체 인구 <span class="dChartTextHl01">'+ $catchmentAreaDataBoard.ui.comma(totCnt) + '</span> 명 중');
									$("#dPopitemCnt").html($catchmentAreaDataBoard.ui.comma(itemCnt));
								}
							}
						}
					}

					var itemNm = params["pops_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					
					$("#dPopType").html(itemNm);
					
					//세부조건 - 남녀
					if(sItems2 instanceof Array && sItems2.length > 0){							
						$.each(sItems2, function(idx, item){
							var itemCnt = Number(item.ppltn_cnt);
							if(!isNaN(itemCnt)){
								if(item.base_year == "1"){
									$("#dMen").html($catchmentAreaDataBoard.ui.comma(itemCnt));
								}else{
									$("#dWoman").html($catchmentAreaDataBoard.ui.comma(itemCnt));
								}
							}
						});
					}

					//데이터 null
					if(isClear){
						//$catchmentAreaDataBoard.ui.createSolidGaugeChart('popDChart', itemCnt, totCnt, 250, 140);
						$("#dPopTot").html('영역 내 전체 인구 <span class="dChartTextHl01">'+ (totCnt == 0 ? '0' : $catchmentAreaDataBoard.ui.comma(totCnt)) + '</span> 명 중');
						$("#dPopitemCnt").html('0');
						
						$("#dMen").html('0');
						$("#dWoman").html('0');
						
						$catchmentAreaDataBoard.ui.createEmptySolidGaugeChart('popDChart');
					}
					
					//bar 차트.. 호출
					$catchmentAreaDataBoard.ui.setChkDetailAllData('pops', params, sData.pops_class);
				}
				
				//가구
				if(sData.hasOwnProperty('family')){
					sItems = sData.family;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totFamily").attr('data-total-ogl'));	// 표출 총값
					var totPerCnt = sData.family_class[0].tot_family_cnt
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["family_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}
									
									//전체일 경우
									if(params.family_cond == "family_all"){
										totPerCnt = itemCnt;
									}
									
									$catchmentAreaDataBoard.ui.createSolidGaugeChart('familyDChart', itemCnt, totPerCnt, 240, 140);
									$("#dFamilyTot").html('영역 내 전체 가구 <span class="dChartTextHl01">' + $catchmentAreaDataBoard.ui.comma(totCnt) + '</span> 가구 중');
									$("#dFamilyitemCnt").html($catchmentAreaDataBoard.ui.comma(itemCnt));											
								}
							}
						}
					}

					var itemNm = params["family_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dFamilyType").html(itemNm);
					
					//데이터 null
					if(isClear){
						$("#dFamilyTot").html('영역 내 전체 가구 <span class="dChartTextHl01">' + (totCnt == 0 ? '0' : $catchmentAreaDataBoard.ui.comma(totCnt)) + '</span> 가구 중');
						$("#dFamilyitemCnt").html('0');
						
						$catchmentAreaDataBoard.ui.createEmptySolidGaugeChart('familyDChart');
					}
					
					//bar 차트.. 호출
					$catchmentAreaDataBoard.ui.setChkDetailAllData('family', params, sData.family_class);
				}
				
				//주택
				if(sData.hasOwnProperty('house')){
					$("#houseTotBtn a").removeClass("active");
					if(params.stats_class_gb == "area"){
						$("#houseTotBtn a").eq(1).addClass("active");
					}else{
						$("#houseTotBtn a").first().addClass("active");
					}
					sItems = sData.house;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totHouse").attr('data-total-ogl'));	// 표출 총값
					var totPerCnt = sData.house_class[0].tot_house_cnt
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["resid_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}
									
									//전체일 경우
									if(params.house_cond == "house_all_all_all"){
										totPerCnt = itemCnt;
									}

									$catchmentAreaDataBoard.ui.createSolidGaugeChart('houseDChart', itemCnt, totPerCnt, 240, 140);
									$("#dHouseTot").html('영역 내 전체 주택 <span class="dChartTextHl01">' + $catchmentAreaDataBoard.ui.comma(totCnt) + '</span> 호 중');
									$("#dHouseitemCnt").html($catchmentAreaDataBoard.ui.comma(itemCnt));				
								}
							}
						}
					}

					var itemNm = params["house_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dHouseType").html(itemNm);	
					
					//데이터 null
					if(isClear){
						$("#dHouseTot").html('영역 내 전체 주택 <span class="dChartTextHl01">' + (totCnt == 0 ? '0' : $catchmentAreaDataBoard.ui.comma(totCnt)) + '</span> 호 중');
						$("#dHouseitemCnt").html('0');
						
						$catchmentAreaDataBoard.ui.createEmptySolidGaugeChart('houseDChart');
					}
					
					//bar 차트.. 호출
					$catchmentAreaDataBoard.ui.setChkDetailAllData('house', params, sData.house_class);
				}
				
				//사업체
				if(sData.hasOwnProperty('copr')){
					sItems = sData.copr;
					//SGIS4_생활권역 시작
					var isClear = true;
					var totCnt = Number($("#totCopr").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["copr_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}

									$catchmentAreaDataBoard.ui.createSolidGaugeChart('coprDChart', itemCnt, totCnt, 240, 140);
									$("#dCoprTot").html('영역 내 전체 사업체 <span class="dChartTextHl01">' + $catchmentAreaDataBoard.ui.comma(totCnt) + '</span> 개 중');
									$("#dCopritemCnt").html($catchmentAreaDataBoard.ui.comma(itemCnt));
								}
							}
						}
					}

					var itemNm = params["copr_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dCoprType").html(itemNm);
					
					//데이터 null
					if(isClear){
						$("#dCoprTot").html('영역 내 전체 사업체 <span class="dChartTextHl01">' + (totCnt == 0 ? '0' : $catchmentAreaDataBoard.ui.comma(totCnt)) + '</span> 개 중');
						$("#dCopritemCnt").html('0');
						
						$catchmentAreaDataBoard.ui.createEmptySolidGaugeChart('coprDChart');
					}
					
					//bar 차트.. 호출
					$catchmentAreaDataBoard.ui.setChkDetailAllData('copr', params, sData.copr_class);
				}
				
				//종사자
				if(sData.hasOwnProperty('employee')){
					sItems = sData.employee;
					//SGIS4_생활권역 시작
					var isClear = true;
					var isBlockShow = true;
					var totCnt = Number($("#totWorker").attr('data-total-ogl'));	// 표출 총값
					
					if(totCnt > 0){
						isBlockShow = false;
						if(sItems instanceof Array && sItems.length > 0){
							sItem = sItems[0];
							if(sItem !== undefined && sItem !== null){
								var itemCnt = Number(sItem["employee_cnt"]);
								if(!isNaN(itemCnt)){
									isClear = false;
	
									if(itemCnt > totCnt){
										itemCnt = totCnt;
									}

									$catchmentAreaDataBoard.ui.createSolidGaugeChart('employeeDChart', itemCnt, totCnt, 240, 140);
									$("#dEmployeeTot").html('영역 내 전체 종사자 <span class="dChartTextHl01">' +$catchmentAreaDataBoard.ui.comma(totCnt) + '</span> 명 중');
									$("#dEmployeeitemCnt").html($catchmentAreaDataBoard.ui.comma(itemCnt));
								}
							}
						}
					}

					var itemNm = params["employee_cond_nm"];
					if(itemNm != undefined && itemNm != null){
						itemNm = itemNm.substring((itemNm.indexOf(":") + 1), itemNm.length).trim();
					}
					$("#dEmployeeType").html(itemNm);
					
					//데이터 null
					if(isClear){
						$("#dEmployeeTot").html('영역 내 전체 종사자 <span class="dChartTextHl01">' + (totCnt == 0 ? '0' : $catchmentAreaDataBoard.ui.comma(totCnt)) + '</span> 명 중');
						$("#dEmployeeitemCnt").html('0');
						
						$catchmentAreaDataBoard.ui.createEmptySolidGaugeChart('employeeDChart');
					}
					
					//bar 차트.. 호출
					$catchmentAreaDataBoard.ui.setChkDetailAllData('employee', params, sData.employee_class);
				}
				
			
			},
			
			//세부조건 설정 상세통계정보 화면설정
			showChkDetailDiv : function(dataType){
				$("#noDataMsg").hide();
				
				$("#dPopDiv").hide();
				$("#dFamilyDiv").hide();
				$("#dHouseDiv").hide();
				$("#dCoprDiv").hide();
				$("#dEmployeeDiv").hide();
				
				if(dataType == "pops"){//인구
					$("#dPopDiv").show();
				}else if(dataType == "family"){//가구
					$("#dFamilyDiv").show();
				}else if(dataType == "house"){//주택
					$("#dHouseDiv").show();
				}else if(dataType == "copr"){//사업체
					$("#dCoprDiv").show();
				}else if(dataType == "employee"){//종사자
					$("#dEmployeeDiv").show();
				}else{
					$("#noDataMsg").show();
				}
			},

			/**
			 * 
			 * @name         : changeScreenForAreaDataboard
			 * @description  : 영역 내 전체정보 데이터보드에서 전체와 세부조건 보기화면간 전환 관련 메소드이다.
			 * 
			 */
			changeScreenForAreaDataboard : function(pDetailVisible, pType) {
				if(pDetailVisible){
					$("#data_popup").hide();
					$("#detail_data_popup").show();
					//보고서 버튼
		        	$(".toolBar .tb_right ul li a").hide();
					
					if(pType == "pops" || pType == "family" || pType == "house"){
						$('#bYearSel01').attr("disabled", false);
						$('#bYearSel02').attr("disabled", true);
					}else{
						$('#bYearSel01').attr("disabled", true);
						$('#bYearSel02').attr("disabled", false);
					}					
				}else{
					$("#detail_data_popup").hide();
		        	$("#data_popup").show();
		        	
					$('#bYearSel01').attr("disabled", false);
					$('#bYearSel02').attr("disabled", false);
					
					//보고서 버튼
		        	$(".toolBar .tb_right ul li a").show();	 
				}
			},
			
			requestDatilTotStat : function(pIds, pNms, statType){
				if(!pIds instanceof Array || !pNms instanceof Array){
					return false;
				}
				
				var loopCnt = pIds.length;
				if(!(loopCnt > 0 && loopCnt == pNms.length)){
					return false;
				}

				var param = {};
				var pageNo = $catchmentAreaDataBoard.ui.selectIndex;
				var area = ""; 
				var radius;
				var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();
				var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('01', pageNo);

				if(rangeType == "stats01" || rangeType == "stats02"){
					var selectIndex = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr.length - pageNo;
					var polyPoints = $catchmentAreaLeftMenu.ui.selectPolygonPointsArr[selectIndex];
					area = 'POLYGON((';
					for(var i = 0; i < polyPoints.length; i++) {
						area += polyPoints[i][0] + " " + 
						polyPoints[i][1] + ",";
						
						if(i == polyPoints.length - 1) {
							area += polyPoints[i][0] + " " + 
							polyPoints[i][1];
						}					
					}					
					area += '))';
					
					param.area = area;
					param.srvAreaType = 1;
				}else if(rangeType == "stats03"){
					area = 'POINT(';
					area += $catchmentAreaLeftMenu.ui.selectCoordinate_x + " " + $catchmentAreaLeftMenu.ui.selectCoordinate_y;
					area += ')';
					radius = $catchmentAreaLeftMenu.ui.selectRangeArr[pageNo-1];
					
					param.area = area;
					param.radius = radius;
					param.srvAreaType = 2;
				}				
				
				if(area != ""){
					// pops:인구, family:가구, house:주택, copr:사업체/종사자, s3:인구/가구/주택
					param.base_year = $catchmentAreaMain.ui.getBaseYear("1");
					param.copr_base_year = $catchmentAreaMain.ui.getBaseYear("2");
					param.classDeg = $catchmentAreaMain.ui.classDeg;
					param.rangeType = rangeType;
					param.rangeVal = rangeVal;
					
					// TO-DO : grid_level 계산하기
					var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
					var gLvl = $catchmentAreaMain.ui.getGridLevel(shpArea);
					param.grid_level = gLvl;
					
					// 마스크
					var identifier = new Date().getTime();
					param.identifier = identifier;
					var remainCnt = loopCnt;

					$catchmentAreaMask.startProcess(identifier, remainCnt);
					
					param.stats_class_gb = statType;

					var itemId, itemLbl, memCondCd, params;
					for(var i=0; i<loopCnt; i++){
		    		   itemId = pIds[i];
		    		   itemLbl = pNms[i];	        			
		    			   
	    			   if(itemId.startsWith("pops_")){
	    				   //인구 관련 조건
	    				   memCondCd = "pops_cond";
	    				   //param.stats_class_gb = rangeVal;
	    			   }else if(itemId.startsWith("family_")){
	    				   //가구 관련 조건
	    				   memCondCd = "family_cond";
	    			   }else if(itemId.startsWith("house_")){
	    				   //주택 관련 조건
	    				   memCondCd = "house_cond";
	    			   }else if(itemId.startsWith("copr_copr_")){
	    				   //사업체 관련 조건
	    				   memCondCd = "copr_cond";
	    			   }else if(itemId.startsWith("copr_employee_")){
	    				   //종사자 관련 조건
	    				   memCondCd = "employee_cond";
	    			   }
	    			   
	    			   params = $catchmentAreaMain.ui.reqSetParams("API_202098", param);
	    			   params[memCondCd] = itemId;
	    			   params[memCondCd + "_nm"] = itemLbl;	    			   
		    			/*
	    			   var storedInfo = $catchmentAreaObj.getStatisticsInfo("S02", params, memCondCd);
	    			   if(storedInfo.addCnt > 0){
	    				   $catchmentAreaMask.endUnitWork(identifier);
	    				   $catchmentAreaMain.ui.processWithStoredInfo("S02", storedInfo);
	    			   }else{							
	    				   $catchmentAreaMain.ui.requestOpenApi(params);
	    			   }
	    			   */
	    			   $catchmentAreaMain.ui.requestOpenApi(params);
		    	   }					
				}				
			},
			
			dTotPieChart : function(dataType, data, target, pWidth, pHeight, statColors){
				var unitNm = "명";
				if(dataType == 'family'){
					unitNm = "가구";
				}else if(dataType == 'house'){
					unitNm = "호";
				}else if(dataType == 'copr'){
					unitNm = "개";
				}

				$("#"+target).highcharts({
					chart: {
		  				type: 'pie',
		  				width: pWidth,
		  				height: pHeight,
		  				marginRight: 120,
		  			},
		  			title: {
		  				text : ''
		  			},
		  			tooltip: {
		  				//SGIS4_생활권역 시작
		  		        pointFormat: '<b>{point.y} ' + unitNm + '</b><br/>{point.percentage:.1f} %'
		  		        //SGIS4_생활권역 끝
		  		    },
		  			exporting: {
		  		        enabled: false
		  		    },
		  			plotOptions: {
						pie: {
							allowPointSelect: true,
						    cursor: 'pointer',
						    dataLabels: {
						    	distance: 5,
						        format: '{y:,.0f}' + unitNm,
						        style :{
						        	fontSize : "13px"
						        }
						    },
						    showInLegend: true
	                   },
	               },
	               legend: {
	            	   enabled: true,
	                   align: 'right',
	                   verticalAlign: 'top',
	                   layout: 'vertical',
	                   x: 0,
	                   y: 50
	               },
	               series: [{
		  				size: '100%',
		  			    innerSize: '50%',
		  				data: data,
		  				colors : statColors
		  			}]
				});
			},	//SGIS4_1028_생활권역
			//SGIS4_1025_생활권역 끝
			
			//SGIS4_1028_생활권역 시작
			/**
			 * 
			 * @name         : clickBeforeAndAfterButton
			 * @description  : 영역 내 전체정보 데이터보드의 이전/이후 버튼 클릭 관련 메소드이다.
			 * 
			 */
			clickBeforeAndAfterButton : function(pPageNo) {
	        	//SGIS4_1025_생활권역_상세보기 데이터보드 숨기기 시작
	        	$catchmentAreaDataBoard.ui.changeScreenForAreaDataboard(false);
	        	//SGIS4_1025_생활권역_상세보기 데이터보드 숨기기 끝
	        	
	        	//데이터보드 내용 전환 요청 시에는 '기본정보 보기' 모드로 전환시킨다.
	        	$('.mogb_chk.off.basic').trigger('click');

	        	$catchmentAreaDataBoard.ui.selectIndex = pPageNo;

	        	//$catchmentAreaLeftMenu.ui.settingStatisticsData(base_year, rangeType, pPageNo);
	        	$catchmentAreaLeftMenu.ui.requestSrvAreaStatsData('0', pPageNo);				
			}
			//SGIS4_1028_생활권역 끝
	};
	
	$catchmentAreaDataBoard.callbackFunc = {};
	
	$catchmentAreaDataBoard.event = {
			
			getDataBoard : function(falg){
				console.log(falg)
				/*
				if(falg == 1){
					console.log("영향권 통계정보 데이터 보드");
					$("#wrapper .pop_chk02").css("display", "none");
					$("#wrapper .pop_chk01").css("display", "block");
				}else{
					console.log("격자 통계정보 데이터 보드");
					$("#wrapper .pop_chk01").css("display", "none");
					$("#wrapper .pop_chk02").css("display", "block");
				}
				*/
				$("#dataBoard > #wrapper > [class*='pop_chk']").each(function(index,item){
				    $(item).css("display", "none");
				});
				
				//SGIS4_1027_생활권역 시작
				if(falg == 1){
					$catchmentAreaDataBoard.ui.changeScreenForAreaDataboard(false);
				}
				//SGIS4_1027_생활권역 끝				
				$("#dataBoard > #wrapper > [class*='pop_chk0"+falg+"']").css("display", "block");
				
				$catchmentAreaMain.ui.adjustUI();
			},
			
			setUIEvent : function() {
				var body = $("body");
				//영향권 데이터보드 이전, 이후 버튼 이벤트
		        body.on("click", "#prevBtn, #nextBtn", function(){
		        	//SGIS4_1028_생활권역 시작		        	
		        	var selectArray = [];
		        	var pageNo = $catchmentAreaDataBoard.ui.selectIndex;
		        	var rangeType = $catchmentAreaLeftMenu.ui.getRangeType();

		        	$("#statsType01 > ul").children("li").each(function(index, item){
		        		selectArray.push($(this).children("a").attr("id"));
					});
		        	
		        	if($(this).attr("id") == "prevBtn"){//이전
		        		if(pageNo == 1){
		        			pageNo = selectArray.length;
		        		}else{
		        			pageNo--;
		        		}
		        	}else{//이후
		        		if(pageNo >= selectArray.length){
		        			pageNo = 1;
		        		}else{
		        			pageNo++;
		        		}
		        	}

					var rangeVal = $catchmentAreaLeftMenu.ui.getRangeVal('01', pageNo);		        	
		        	var shpArea = $catchmentAreaObj.getShapeArea(rangeType, rangeVal);
		        	shpArea = Number(shpArea);
		        	
		        	if(shpArea > $catchmentAreaMain.ui.maxAreaUsingService){
		        		caMessageConfirm.open(
								 "알림", 
								 "면적이 " + ($catchmentAreaMain.ui.maxAreaUsingService / 1000000) + "㎢ 이상인 영역에 대해서는 다소 시간이 걸릴 수 있습니다.<br>" +
								 "진행하시겠습니까?",
								 btns = [
									{
									    title : "예",
									    fAgm : null,
									    disable : false,
									    func : function(opt) {								        	
								        	$catchmentAreaDataBoard.ui.clickBeforeAndAfterButton(pageNo);
									    }
									 },
									 
								     {
									   title : "아니오",
									   fAgm : null,
									   disable : false,
									   func : function(opt) { return; }
								     }   
								 ]
							);		        		
		        	}else{		        	
		        		$catchmentAreaDataBoard.ui.clickBeforeAndAfterButton(pageNo);
		        	}
		        	//SGIS4_1028_생활권역 끝
		    	});
		        
		        $('#bYearSel01').change(function(){
		        	//SGIS4_1025_생활권역_상세보기 데이터보드 숨기기 시작
		        	$catchmentAreaDataBoard.ui.changeScreenForAreaDataboard(false);
		        	//SGIS4_1025_생활권역_상세보기 데이터보드 숨기기 끝
		        	
					srvLogWrite('Q0','03','02','03',$('.grp_txt01').text()+'/'+$('#bYearSel01 option:selected').val(),'');
		        	//데이터보드 내용 전환 요청 시에는 '기본정보 보기' 모드로 전환시킨다.
		        	$('.mogb_chk.off.basic').trigger('click');		        	
		        	$catchmentAreaLeftMenu.ui.requestSrvAreaStatsData('1', $catchmentAreaDataBoard.ui.selectIndex);
		        	
		        	//SGIS4_생활권역 시작
		        	var param = {};
		        	param.processGb = "sel";
		        	param.elemId = "#areaSetting .select_constYear";
		        	param.bClassCd = "SA" + this.value;
		        	
		        	$catchmentAreaMain.ui.getCodeData(param);		        	
		        	//SGIS4_생활권역 끝
		        });
		        
		        $('#bYearSel02').change(function(){
		        	//SGIS4_1025_생활권역_상세보기 데이터보드 숨기기 시작
		        	$catchmentAreaDataBoard.ui.changeScreenForAreaDataboard(false);
		        	//SGIS4_1025_생활권역_상세보기 데이터보드 숨기기 끝
		        	
					srvLogWrite('Q0','03','02','03',$('.grp_txt02').text()+'/'+$('#bYearSel02 option:selected').val(),'');
		        	//데이터보드 내용 전환 요청 시에는 '기본정보 보기' 모드로 전환시킨다.
		        	$('.mogb_chk.off.basic').trigger('click');			        	
		        	$catchmentAreaLeftMenu.ui.requestSrvAreaStatsData('2', $catchmentAreaDataBoard.ui.selectIndex);
		        });
		        
		        //데이터보드 닫기, 열기 이벤트
		        $('.close_btn01').click(function(){
		        	$('.pop_chk01').hide();
		        	$('.pop_btn01').show();
		        	
		        	$catchmentAreaMain.ui.adjustUI();
		        	$catchmentAreaDataBoard.ui.curBoardPage = "1";
		        });

		        $('.close_btn02').click(function(){
		        	$('.pop_chk02').hide();
		        	$('.pop_btn01').show();
		        	
		        	$catchmentAreaMain.ui.adjustUI();
		        	$catchmentAreaDataBoard.ui.curBoardPage = "2";
		        });
		        
		        
		        $('.close_btn03').click(function(){	// 상세분석 데이터보드 닫기 버튼
		        	$('.pop_chk03').hide();
		        	$('.pop_btn01').show();
		        	
		        	$catchmentAreaMain.ui.adjustUI();
		        	$catchmentAreaDataBoard.ui.curBoardPage = "3";
		        });
		        
		        $('.pop_btn01').click(function(){
		        	$('.pop_btn01').hide();
		        	
		        	if($catchmentAreaDataBoard.ui.curBoardPage == "1"){
		        		$('.pop_chk01').show();
		        	}else if($catchmentAreaDataBoard.ui.curBoardPage == "2"){
		        		$('.pop_chk02').show();
		        	}else if($catchmentAreaDataBoard.ui.curBoardPage == "3"){
		        		$('.pop_chk03').show();
		        	}
		        	
		        	$catchmentAreaMain.ui.adjustUI();
		        });
		        
		        // 상세분석 데이터보드의 지도 범례 기준을 정해주는 라디오 버튼에 대한 콜백 등록
		        body.on('change', 'input[name="detail_databoard_legend_standard"]', function(e){
					
		        	$catchmentAreaDataBoard.ui.clearSelectGridDataBord('left');
		        	$catchmentAreaDataBoard.ui.clearSelectGridDataBord('right');
		        	
					var map1 = $catchmentAreaMain.ui.getMap(0);
		        	var map2 = $catchmentAreaMain.ui.getMap(1);
		        	map1.clearToolTip();
		        	map2.clearToolTip();
		        	
		        	if(this.id === 'legend_standard_left') {
			        	map1.legend.legendCopy(0, true);
			        	map2.legend.legendCopy(0, true);
			        	$catchmentAreaDataBoard.ui.cacheDoubleColumnChart(0);
		        	} else {
		        		map1.legend.legendCopy(1, true);
			        	map2.legend.legendCopy(1, true);
			        	$catchmentAreaDataBoard.ui.cacheDoubleColumnChart(1);
		        	}
		        	
		        });
		        
		        body.on("click", ".btn_basic", function(){
		        	if(!$(this).hasClass('active')){
		        		$(this).addClass('active');
		        		$(this).siblings().removeClass('active');		        		
			        	$(this).parent().siblings('div.div_chartr').hide();
			        	$(this).parent().siblings('div.div_basic').show();			        		
		        	}	        	
		        });
		        
		        body.on("click", ".btn_chartr", function(){
		        	if(!$(this).hasClass('active')){
		        		$(this).addClass('active');
		        		$(this).siblings().removeClass('active');
			        	$(this).parent().siblings('div.div_basic').hide();
			        	$(this).parent().siblings('div.div_chartr').show();			        		
		        	}		        	
		        });
		        
		        body.on("click", "#gird_graph_left", function(){
		        	if($(this).hasClass('active')){
		        		$(this).removeClass('active');
		        		$('#gird_graph_right').addClass('active');		        		
		        		$('#gird_graph_title').html('격자 1개당 평균 ' + $('#gird_graph_title').attr('data-subj') + ' 변화');
		        		
		        		$('#gridStatChart_right').hide();
		        		$('#gridStatChart_left').show();		        		
		        	}		        	
		        });
		        
		        body.on("click", "#gird_graph_right", function(){
		        	if($(this).hasClass('active')){
		        		$(this).removeClass('active');
		        		$('#gird_graph_left').addClass('active');
		        		$('#gird_graph_title').html('영역 전체 총 ' + $('#gird_graph_title').attr('data-subj') + ' 변화');
		        		
		        		$('#gridStatChart_left').hide();
		        		$('#gridStatChart_right').show();		        		
		        	}		        	
		        });
		        
		        body.on("click", "#gridDataBordInfo, #gridDataBordInfo02", function(e){
		        	e.preventDefault();
					$('#catchmentDataBoardHelpPopup').addClass('active');
		        });
		        
				//SGIS4_생활권역 시작
		        body.on("click", ".pop_chk01 .mode_box01 .switchBox", function(){		        	
		        	$(this).toggleClass('chartr');
		        	
		        	if($(this).hasClass('chartr')){
			        	$(this).parent().siblings('div.div_basic').hide();
			        	$(this).parent().siblings('div.div_chartr').show();	
		        	}else{
			        	$(this).parent().siblings('div.div_chartr').hide();
			        	$(this).parent().siblings('div.div_basic').show();			        		
		        	}	        	
		        });
		        
		        
				//SGIS4_1025_생활권역_상세데이터 보기 시작
		        //상세데이터 보기 _ 뒤로가기
		        body.on("click", ".detail_back_btn", function(){		        	
		        	$catchmentAreaDataBoard.ui.changeScreenForAreaDataboard(false);		        	
		        });
		        
		        body.on("click", ".zoomBox.left", function(){
		        	$catchmentAreaDataBoard.ui.setDetailDataBoard("basic", $(this).attr("data-type"));
		        });
		        
		        //SGIS4_1029_생활권역 시작
		        body.on("click", ".dSec_div_btn", function(){		        	
		        	$(this).siblings('.dSec_div_btn').removeClass("active");
		        	$(this).addClass("active");
		        	var statType = $(this).attr("data-totStat-type");
		        	var dItemIds = $catchmentAreaDataBoard.ui.dItemIds;
		        	var dItemLbls = $catchmentAreaDataBoard.ui.dItemLbls;
		        	$catchmentAreaDataBoard.ui.requestDatilTotStat(dItemIds, dItemLbls, statType);
		        	
		        });
		        
//		        body.on("click", ".dBtn.dPopBtn", function(){
//		        	$(".dBtn.dPopBtn").removeClass("active");
//		        	
//		        	var statType = $(this).attr("data-totStat-type");
//		        	var dItemIds = $catchmentAreaDataBoard.ui.dItemIds;
//		        	var dItemLbls = $catchmentAreaDataBoard.ui.dItemLbls;
//		        	$catchmentAreaDataBoard.ui.requestDatilTotStat(dItemIds, dItemLbls, statType);
//		        	
//		        	$(this).addClass("active");
//		        });
//		        
//		        body.on("click", ".dBtn.dHouseBtn", function(){
//		        	$(".dBtn.dHouseBtn").removeClass("active");
//		        	//연면적 : area, 주택종류 : resid_type
//		        	var statType = $(this).attr("data-totStat-type");
//		        	var dItemIds = $catchmentAreaDataBoard.ui.dItemIds;
//		        	var dItemLbls = $catchmentAreaDataBoard.ui.dItemLbls;
//		        	$catchmentAreaDataBoard.ui.requestDatilTotStat(dItemIds, dItemLbls, statType);
//		        	
//		        	$(this).addClass("active");
//		        });
		        //SGIS4_1029_생활권역 끝
		        //SGIS4_1025_생활권역_상세데이터 보기 끝
			}
			
	};
	
}(window, document));