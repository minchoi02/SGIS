var bndYear = "2021";

(function(W, D) {
	
	W.$todayStatusMap = W.$todayStatusMap || {};
	
	// 페이지 로드 이벤트
	$(document).ready(function() {
				
		$todayStatusMap.ui.todayStatusSidoCd();	// 시도코드 조회
		
		$todayStatusMap.event.setMapSize();
		$todayStatusMap.ui.createMap("map");
		$todayStatusMap.event.setUIEvent();
		
		/** 2020.09.07[한광희] 오늘의 전체 일자리현황 팝업 호출 순위 변경 START */
		//오늘의 전체 일자리현황 팝업
		/*if(common_get_cookie("todayStatusPopup_no_today_yn") != "Y") {
			todayStatusPopupSelect();
		}*/
		/** 2020.09.07[한광희] 오늘의 전체 일자리현황 팝업 호출 순위 변경 END */
		
		//네비게이션 추가
		$(".leftCol .btnNavThematic").click(function(){
			if(!$(this).hasClass('active')){
	    		$(this).addClass('active');
	    		$(".nav-layer").css("display","block");
	    	}else{
	    		$(this).removeClass('active');
	    		$(".nav-layer").css("display","none");
	    	}
	    });
		
		
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$todayStatusMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$todayStatusMap.event.setMapSize();
		}, 100);
	}); 
	// 페이지 UI 변수 및 함수 선언
	$todayStatusMap.ui = {
		map : null,
		todayStatusList : [],
		map_coor_x : "",	// map x 좌표
		map_coor_y : "",	// map y 좌표
		searchAdm_cd : "",
		weekDataList : [],
		tempAdmCd : "",
		
		//내 현재위치
		my_x : null, // x
		my_y : null, // y
		my_sido_cd : null, // 시도코드
		my_sido_nm : null, // 시도명
		my_sgg_cd : null, // 시군구코드
		my_sgg_nm : null, // 시군구명
		my_emdong_cd : null, // 읍면동코드
		my_emdong_nm : null, // 읍면동명
		
		/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
		tmpCategories : [],
		categories : [],
		/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
		
		/** 
		 * @name : todayStatusSidoCd
		 * @description : 시도코드 조회
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 */
		todayStatusSidoCd : function(){
			$.ajax({
				type: "post",
				url : contextPath + "/m2019/workroad/getSidoCd.json",
				dataType: 'json',
				data: {sido_cd:"99"},
			    success: function(res){
			    	
			    	if(res.errCd == 0){
			    		var resultList = res.result.resultList;
			    		
			    		for(var i = 0; i < resultList.length; i++){
			    			// 오늘의 구인현황 상세 시도 값 셋팅 
			    			$("#todayStatusDetailSidoCd").append("<option value=\"" + resultList[i].sido_cd + "\" data-coor-x=\""+ resultList[i].x_coor + "\" data-coor-y=\"" + resultList[i].y_coor + "\">" +resultList[i].sido_nm + "</option>");
			    		}
			    	} else {
						common_alert('failed!');
					}
				} ,
				error:function(err) {
					common_alert(err.responseText);
				}
			});
		},
		
		/** 
		 * @name : todayStatusSggCd
		 * @description : 시군구코드 조회
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 */
		todayStatusSggCd : function(adm_cd, tempView){
			$("select[id='todayStatusDetailSggCd'] option").remove();
			
			var coorX = $("#todayStatusDetailSidoCd option:selected").data("coor-x");
			var coorY = $("#todayStatusDetailSidoCd option:selected").data("coor-y");
    		$("#todayStatusDetailSggCd").append("<option value=\"" + "999" + "\" data-coor-x=\""+ coorX + "\" data-coor-y=\"" + coorY + "\">" +"전체" + "</option>");
			
			$.ajax({
				type: "post",
				url : contextPath + "/m2019/workroad/getSggCd.json",
				dataType: 'json',
				data: {sido_cd:adm_cd,bnd_year:bndYear},
			    success: function(res){
			    	if(res.errCd == 0){
			    		var resultList = res.result.resultList;
			    		
			    		for(var i = 0; i < resultList.length; i++){
			    			// 오늘의 구인현황 상세 시군구 값 셋팅
			    			$("#todayStatusDetailSggCd").append("<option value=\"" + resultList[i].sgg_cd + "\" data-coor-x=\""+ resultList[i].x_coor + "\" data-coor-y=\"" + resultList[i].y_coor + "\">" +resultList[i].sgg_nm + "</option>");
			    		}
			    		
			    		if(tempView == "first"){
			    			$("#todayStatusDetailSggCd").val($todayStatusMap.ui.my_sgg_cd).prop("selected", true);	// 현위치 시도 코드 선택			    			
			    		}
			    	} else {
						common_alert('failed!');
					}
				} ,
				error:function(err) {
					common_alert(err.responseText);
				}
			});
		},
		
		/** 
		 * @name : todayStatus
		 * @description : 오늘의 구인현황 조회
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 */
		todayStatus : function(adm_cd){
			var dataParams = {};
			var map_adm_cd = ""; 
			
			switch(adm_cd.length){
				case 2:
					dataParams.sido_cd = adm_cd;
					break;
				case 5:
					dataParams.sido_cd = adm_cd.substring(0,2);
					dataParams.sgg_cd = adm_cd.substring(2,5);
					break;
				case 7:
					break;
			}
			common_loading(true); // 로딩바 표시
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/getTodayStatus.json",
				dataType: 'json',
				async: false,
				data: dataParams,
			    success: function(res){
			    	if(res.errCd == 0){
			    		$todayStatusMap.ui.todayStatusList = res.result.resultList;
			    		
			    		if(res.result.params.sido_cd != '99'){
			    			if(res.result.params.sgg_cd != undefined && res.result.params.sgg_cd != '999'){
			    				map_adm_cd = res.result.params.sido_cd + res.result.params.sgg_cd;
			    			} else {
			    				map_adm_cd = res.result.params.sido_cd;
			    			}
			    		} else {
			    			map_adm_cd = '00';
			    		}

			    		// 가져온 결과로 색지도 표현 START
			    		var option = {"showData":"right_data_val","showDataName":"업체","unit":"업체","adm_cd":map_adm_cd,"setStatsMapCensusData":true,"curPolygonCode":0};
						var data = $todayStatusMap.ui.todayStatusList;
						var parameter = {"year":"2016","bnd_year":bndYear};
						$todayStatusMap.ui.map.setStatsData(option, data, parameter);
			    		// 가져온 결과로 색지도 표현 END
						
						$todayStatusMap.ui.todayStatusMapMove(map_adm_cd);	// 선택된 지역으로 map 이동
						
						/** 오늘의 구인현황 상세내역 팝업 START */
						var resultDetailList = res.result.resultDetailList;
						var today = resultDetailList[0].reg_dt;
						var lv_all_corp_cnt = resultDetailList[0].all_corp_cnt;
						var lv_all_rcrit_psn_cnt = resultDetailList[0].all_rcrit_psn_cnt;
						var lv_new_corp_cnt = resultDetailList[0].new_corp_cnt;
						var lv_new_rcrit_psn_cnt = resultDetailList[0].new_rcrit_psn_cnt;
						var lv_clos_corp_cnt = resultDetailList[0].clos_corp_cnt;
						var lv_clos_rcrit_psn_cnt = resultDetailList[0].clos_rcrit_psn_cnt;
						var lv_all_corp_cnt_c = resultDetailList[0].all_corp_cnt_c;
						var lv_all_rcrit_psn_cnt_c = resultDetailList[0].all_rcrit_psn_cnt_c;
						var lv_new_corp_cnt_c = resultDetailList[0].new_corp_cnt_c;
						var lv_new_rcrit_psn_cnt_c = resultDetailList[0].new_rcrit_psn_cnt_c;
						var lv_clos_corp_cnt_c = resultDetailList[0].clos_corp_cnt_c;
						var lv_clos_rcrit_psn_cnt_c = resultDetailList[0].clos_rcrit_psn_cnt_c;
						
						var lv_week_all_corp_cnt = resultDetailList[0].all_corp_cnt;
						var lv_week_all_rcrit_psn_cnt = resultDetailList[0].all_rcrit_psn_cnt;
						
						$("#all_corp_cnt").html(appendCommaToNumber(lv_all_corp_cnt));					// 전체구인업체수
						$("#all_rcrit_psn_cnt").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));		// 전체구인자수
						$("#new_corp_cnt").html(appendCommaToNumber(lv_new_corp_cnt));					// 신규등록구인업체수
						$("#new_rcrit_psn_cnt").html(appendCommaToNumber(lv_new_rcrit_psn_cnt));		// 신규등록구인자수
						$("#clos_corp_cnt").html(appendCommaToNumber(lv_clos_corp_cnt));				// 종료마감구인업체수
						$("#clos_rcrit_psn_cnt").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt));		// 종료마감구인자수
											
						/** 전일대비 전체구인업체, 전체구인자수 START */
						//전일대비 (전체구인업체)
						if (lv_all_corp_cnt_c > 0) {
							$("#all_corp_cnt_c_rate_img").html("▲");
							if(Number(lv_all_corp_cnt - lv_all_corp_cnt_c) != 0){
								$("#all_corp_cnt_c_rate").html((Number((100 * lv_all_corp_cnt_c / (lv_all_corp_cnt - lv_all_corp_cnt_c)).toFixed(2)))+"%");
							} else {
								$("#all_corp_cnt_c_rate").html("100%");
							}
							$("#all_corp_cnt_c_rate_img").addClass("td_up");
							$("#all_corp_cnt_c_rate_img").removeClass("td_down");
							$("#all_corp_cnt_c_rate").addClass("td_up");
							$("#all_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_all_corp_cnt_c < 0) {
							$("#all_corp_cnt_c_rate_img").html("▼");
							$("#all_corp_cnt_c_rate").html((Number(((-100 * lv_all_corp_cnt_c) / (lv_all_corp_cnt + lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#all_corp_cnt_c_rate_img").addClass("td_down");
							$("#all_corp_cnt_c_rate_img").removeClass("td_up");
							$("#all_corp_cnt_c_rate").addClass("td_down");
							$("#all_corp_cnt_c_rate").removeClass("td_up");
						} 
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
						else {
							$("#all_corp_cnt_c_rate_img").html("");
							$("#all_corp_cnt_c_rate").html("0%");
							$("#all_corp_cnt_c_rate_img").removeClass("td_up");
							$("#all_corp_cnt_c_rate_img").removeClass("td_down");
							$("#all_corp_cnt_c_rate").removeClass("td_down");
							$("#all_corp_cnt_c_rate").removeClass("td_up");
						}
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
						
						//전일대비 (전체구인자수)
						if (lv_all_rcrit_psn_cnt_c > 0) {
							$("#all_rcrit_psn_cnt_c_rate_img").html("▲");
							if(Number((lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)) != 0){
								$("#all_rcrit_psn_cnt_c_rate").html((Number((100 * lv_all_rcrit_psn_cnt_c / (lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");								
							} else{
								$("#all_rcrit_psn_cnt_c_rate").html("100%");
							}
							$("#all_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_all_rcrit_psn_cnt_c < 0) {
							$("#all_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#all_rcrit_psn_cnt_c_rate").html((Number(((-100 * lv_all_rcrit_psn_cnt_c) / (lv_all_rcrit_psn_cnt + lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#all_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_up");
						} 
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
						else {
							$("#all_rcrit_psn_cnt_c_rate_img").html("");
							$("#all_rcrit_psn_cnt_c_rate").html("0%");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
						/** 전일대비 전체구인업체, 전체구인자수 END */
						
						/** 전일대비 신규구인업체, 신규구인자수 START */
						//전일대비 (신규구인업체)
						if (lv_new_corp_cnt_c > 0) {
							$("#new_corp_cnt_c_rate_img").html("▲");
							$("#new_corp_cnt_c_rate").html(appendCommaToNumber(lv_new_corp_cnt_c) + "개");
							$("#new_corp_cnt_c_rate_img").addClass("td_up");
							$("#new_corp_cnt_c_rate_img").removeClass("td_down");
							$("#new_corp_cnt_c_rate").addClass("td_up");
							$("#new_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_new_corp_cnt_c < 0) {
							$("#new_corp_cnt_c_rate_img").html("▼");
							$("#new_corp_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_new_corp_cnt_c)) + "개");
							$("#new_corp_cnt_c_rate_img").addClass("td_down");
							$("#new_corp_cnt_c_rate_img").removeClass("td_up");
							$("#new_corp_cnt_c_rate").addClass("td_down");
							$("#new_corp_cnt_c_rate").removeClass("td_up");
						}
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
						else {
							$("#new_corp_cnt_c_rate_img").html("");
							$("#new_corp_cnt_c_rate").html("0개");
							$("#new_corp_cnt_c_rate_img").removeClass("td_up");
							$("#new_corp_cnt_c_rate_img").removeClass("td_down");
							$("#new_corp_cnt_c_rate").removeClass("td_down");
							$("#new_corp_cnt_c_rate").removeClass("td_up");
						}
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
						//전일대비 (신규구인자수)
						if (lv_new_rcrit_psn_cnt_c > 0) {
							$("#new_rcrit_psn_cnt_c_rate_img").html("▲");
							$("#new_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(lv_new_rcrit_psn_cnt_c) + "명");
							$("#new_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_new_rcrit_psn_cnt_c < 0) {
							$("#new_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#new_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_new_rcrit_psn_cnt_c)) + "명");
							$("#new_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_up");
						} 
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
						else {
							$("#new_rcrit_psn_cnt_c_rate_img").html("");
							$("#new_rcrit_psn_cnt_c_rate").html("0명");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
						/** 전일대비 신규구인업체, 신규구인자수 END */
						
						/** 전일대비 종료마감구인업체수, 종료마감구인자수 START */
						//전일대비 (종료마감구인업체수)
						if (lv_clos_corp_cnt_c > 0) {
							$("#clos_corp_cnt_c_rate_img").html("▲");
							$("#clos_corp_cnt_c_rate").html(appendCommaToNumber(lv_clos_corp_cnt_c) + "개");
							$("#clos_corp_cnt_c_rate_img").addClass("td_up");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_down");
							$("#clos_corp_cnt_c_rate").addClass("td_up");
							$("#clos_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_clos_corp_cnt_c < 0) {
							$("#clos_corp_cnt_c_rate_img").html("▼");
							$("#clos_corp_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_clos_corp_cnt_c)) + "개");
							$("#clos_corp_cnt_c_rate_img").addClass("td_down");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_up");
							$("#clos_corp_cnt_c_rate").addClass("td_down");
							$("#clos_corp_cnt_c_rate").removeClass("td_up");
						} 
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
						else {
							$("#clos_corp_cnt_c_rate_img").html("");
							$("#clos_corp_cnt_c_rate").html("0개");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_up");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_down");
							$("#clos_corp_cnt_c_rate").removeClass("td_down");
							$("#clos_corp_cnt_c_rate").removeClass("td_up");
						}
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
						//전일대비 (종료마감구인자수)
						if (lv_clos_rcrit_psn_cnt_c > 0) {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("▲");
							$("#clos_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt_c) + "명");
							$("#clos_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_clos_rcrit_psn_cnt_c < 0) {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#clos_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_clos_rcrit_psn_cnt_c)) + "명");
							$("#clos_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_up");
						} 
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
						else {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("");
							$("#clos_rcrit_psn_cnt_c_rate").html("0명");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
						/** 전일대비 종료마감구인업체수, 종료마감구인자수 END */
						
						$("#today").html(today.substring(4, 6) + "월 " + today.substring(6, 8) + "일 기준"); // 기준일 셋팅	// 2020.09.22[한광희] 일자리 맵 상세화면 수정
						
						// 오늘의 구인현황 상세화면 상단 전체 업체및구인차트
						$todayStatusMap.ui.todayStatusChart(resultDetailList);
						
						/** 오늘의 구인현황 상세화면 요일별 전체구인현황 차트 START */
						
						/** 요일별 전체구인현황 구인업체및 구인자수 셋팅 START */
						$("#week_all_corp_cnt").html(appendCommaToNumber(lv_week_all_corp_cnt));
						$("#week_all_rcrit_psn_cnt").html(appendCommaToNumber(lv_week_all_rcrit_psn_cnt));
						/** 요일별 전체구인현황 구인업체및 구인자수 셋팅 END */
						
						/** 현재위치 전체구인현황 구인업체및 구인자수 셋팅 START */
						$("#main_all_corp_cnt").html(appendCommaToNumber(lv_week_all_corp_cnt));
						$("#main_all_rcrit_psn_cnt").html(appendCommaToNumber(lv_week_all_rcrit_psn_cnt));
						/** 현재위치 전체구인현황 구인업체및 구인자수 셋팅 END */
						
						var categories = [];
						var tmpCategories = [];
						var from, to;
						var i;
						to = new Date(res.result.data_range.to_value.substr(0,4)+"-"+
									  res.result.data_range.to_value.substr(4,2)+"-"+
									  res.result.data_range.to_value.substr(6,2));
						i = new Date(res.result.data_range.from_value.substr(0,4)+"-"+
									 res.result.data_range.from_value.substr(4,2)+"-"+
									 res.result.data_range.from_value.substr(6,2));
						
						while (i <= to) {				
							var tmpYmd = $todayStatusMap.ui.getFormatDate(i);
							categories.push(tmpYmd.substr(6, 2));
							tmpCategories.push(tmpYmd);
							i.setDate(i.getDate()+1);
						}
						
						var chartData = res.result.resultDateStatusList;
						var last_reg_dt = chartData[chartData.length - 1].reg_dt;
						var seriesRawData = [];
						for(var i = 0; i < chartData.length; i++) {
							if(chartData[i].reg_dt == last_reg_dt) {
								seriesRawData.push(chartData[i]);
							}
						}
						
						var lineSeries = [];
						var data = [];
						
						// to get series
						for (var i = 0; i < seriesRawData.length; i++) {
							data = [];
							
							var rawDataArr = [];
							for(var j = 0; j < chartData.length; j++){
								if(chartData[j].rank == i){
									rawDataArr.push(chartData[j]);
								}
							}
							
							var rawData = null;
							var tempData = null;
							
							for (var k = 0; k < tmpCategories.length; k++){
								if (rawDataArr.length != undefined) {// 데이터가 2묶음 이상인 경우
									
									for(var l = 0; l < rawDataArr.length; l++){
										if(rawDataArr[l].reg_dt == tmpCategories[k]){
											rawData = rawDataArr[l]; 
										}
									}
									
									if(rawData != undefined) {
										tempData = rawData;										
									}
								} else if (k == tmpCategories.length - 1) {
									rawData = rawDataArr;
									if(rawData != undefined) {
										tempData = rawData;										
									}
								} else {
									rawData = undefined;
									if(rawData != undefined) {
										tempData = rawData;
									}
								}
								
								if (rawData != undefined) {
									data.push(rawData.corp_irdsrate);
								} else {
									if(tempData != undefined || tempData != null) {
										data.push(tempData.corp_irdsrate);
									} else {
										data.push(0);										
									}
								}
							}
							
							if(seriesRawData[i].class_nm.indexOf("전체") > -1) {
								lineSeries.push({
									name: seriesRawData[i].class_nm,
									data: data
								});													
							}
						}
						
						$todayStatusMap.ui.weekDataList = lineSeries; 
						
						// 차트설정
			            Highcharts.setOptions({
			               lang: {
			                   thousandsSep: ",",
			                   numericSymbols: ["천", "백만", "십억", "조", "천조", "백경"]
			                }
			            });
			            
			            /** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
			            $todayStatusMap.ui.tmpCategories = tmpCategories;
			            $todayStatusMap.ui.categories = categories;
			            $todayStatusMap.ui.weekStatusChart($todayStatusMap.ui.categories, $todayStatusMap.ui.weekDataList);
			            /*
			            $('#weekStatusChart').highcharts({
							chart: {
						        type: 'line',
						        width: $(window).width(),
						        height: 170,	// 2020.09.01[한광희] 오늘의 구인현황 차트 사이즈 수정
						        marginBottom : 50,
						        marginRight: 20,
						        marginTop: 30
						    },
						    showFirstLabel: false,
						    colors: ['#45c4d8', '#755ba6'],
						    title: {
						    	text: '(일)',
						        align: 'right',
						        margin: 10,
						        y:128,	// 2020.09.01[한광희] 오늘의 구인현황 차트 수정
						        style: {
						            color: '#888888',
						            fontSize: '11px'
						        }
						    },
						    xAxis: {
                                labels: {
						            style: {
						                color: '#888888'	// y축 색상
						            }
						        },
						    	categories: categories,
						        tickWidth: 0,
								lineWidth: 1,
								lineColor: '#cccccc'
						    },
						    yAxis: {
						        title: {
						            text: ''
						        },
						        labels: {
						            style: {
						                color: '#999999'	// y축 색상
						            }
						        },
						        gridLineWidth: 0,
						        min: 0
						    },
						    legend: {
						        enabled: false
						    },
						    tooltip: {
						    	enabled: true,
						        crosshairs: true, 
						        style: {
	                                display: "none"
	                             }
						    },
						    plotOptions: {
						        series: {
						        	cursor: 'pointer',
						        	point: {
						        		events: {
						        			click: function (e) {
						        				// 선택된 포인트에 이미지 추가 START
						        				var chart = this.series.chart;
						        	            for(var i = 0; i < chart.series.length; i++) {
						        	            	for(var j = 0; j < chart.series[i].data.length; j++) {
						        	            		if(j == this.index) {
						        	            			chart.series[0].data[j].update({
						        	            				marker: {
						        	            					width: 30,
																	height: 30,
						        	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_company.png)'
						        	            						}
						        	            			});
						        	            			chart.series[1].data[j].update({
						        	            				marker: {
						        	            					width: 30,
																	height: 30,
						        	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_jobseeker.png)'
						        	            						}
						        	            			});
						        	            		} else {
						        	            			chart.series[i].data[j].update({
						        	            				marker: {
						        	            					symbol: 'circle'
						        	            						}
						        	            			});
						        	            		}
						        	            	}
						        	            }
						        				// 선택된 포인트에 이미지 추가 END
						        	            
						        	            // 구인업체수
						        				var allCorpCnt = (this.index  < $todayStatusMap.ui.weekDataList[0].data.length) ? $todayStatusMap.ui.weekDataList[0].data[this.index] : {y: 0};
						        				$("#week_all_corp_cnt").html(appendCommaToNumber(allCorpCnt.y));
						        				// 구인자수
						        				var allRcritPsnCnt = (this.index  < $todayStatusMap.ui.weekDataList[1].data.length) ? $todayStatusMap.ui.weekDataList[1].data[this.index] : {y: 0};
						        				$("#week_all_rcrit_psn_cnt").html(appendCommaToNumber(allRcritPsnCnt.y));
							            	}
						        		}
						            }					            
						        }
						    },
						    series: lineSeries
						}, function (chart){
							// 오늘의 구인현황 상세 화면 첫 조회시 요일별 전체구인현황 마지막값에 이미지 추가
							var chart = this;
	        	            for(var i = 0; i < chart.series.length; i++) {
	        	            	for(var j = 0; j < chart.series[i].data.length; j++) {
	        	            		if(j == chart.series[i].data.length-1) {
	        	            			chart.series[0].data[j].update({
	        	            				marker: {
	        	            					width: 30,
	        									height: 30,
	        	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_company.png)'
	        	            						}
	        	            			});
	        	            			chart.series[1].data[j].update({
	        	            				marker: {
	        	            					width: 30,
	        									height: 30,
	        	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_jobseeker.png)'
	        	            						}
	        	            			});
	        	            		}
	        	            	}
	        	            }
						});
						*/
						/** 오늘의 구인현황 상세화면 요일별 전체구인현황 차트 START */
						/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
						
						/** 오늘의 구인현황 상세내역 팝업 END */
			    	} else {
						common_alert('failed!');
					}
				} ,
				error:function(err) {
					common_alert(err.responseText);
				}
				,complete : function() {
			    	common_loading(false); // 로딩바 감춤
			    }
			});
		},
		
		/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
		/**
		 * @name : weekStatusChart
		 * @description : 일자별 차트
		 * @date : 2020.09.22
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		weekStatusChart : function(categories, lineSeries){
			$('#weekStatusChart').highcharts({
				chart: {
			        type: 'line',
			        width: $(window).width(),
			        height: 170,	// 2020.09.01[한광희] 오늘의 구인현황 차트 사이즈 수정
			        marginBottom : 50,
			        marginRight: 20,
			        marginTop: 30
			    },
			    showFirstLabel: false,
			    colors: ['#45c4d8', '#755ba6'],
			    title: {
			    	text: '(일)',
			        align: 'right',
			        margin: 10,
			        y:128,	// 2020.09.01[한광희] 오늘의 구인현황 차트 수정
			        style: {
			            color: '#888888',
			            fontSize: '11px'
			        }
			    },
			    xAxis: {
                    labels: {
			            style: {
			                color: '#888888'	// y축 색상
			            }
			        },
			    	categories: categories,
			        tickWidth: 0,
					lineWidth: 1,
					lineColor: '#cccccc'
			    },
			    yAxis: {
			        title: {
			            text: ''
			        },
			        labels: {
			            style: {
			                color: '#999999'	// y축 색상
			            }
			        },
			        gridLineWidth: 0,
			        min: 0
			    },
			    legend: {
			        enabled: false
			    },
			    tooltip: {
			    	enabled: true,
			        crosshairs: true, 
			        style: {
                        display: "none"
                     }
			    },
			    plotOptions: {
			        series: {
			        	cursor: 'pointer',
			        	point: {
			        		events: {
			        			click: function (e) {
			        				// 구인업체수
			        				var allCorpCnt = (this.index  < $todayStatusMap.ui.weekDataList[0].data.length) ? $todayStatusMap.ui.weekDataList[0].data[this.index] : {y: 0};
			        				// 구인자수
			        				var allRcritPsnCnt = (this.index  < $todayStatusMap.ui.weekDataList[1].data.length) ? $todayStatusMap.ui.weekDataList[1].data[this.index] : {y: 0};
			        				
			        				var selectDate = $todayStatusMap.ui.tmpCategories[this.index];
			        				if(allCorpCnt.y != 0 &&  allRcritPsnCnt.y != 0){
			        					common_loading(true); // 로딩바 표시
			        					$todayStatusMap.ui.chartSelectDayStatus(selectDate);
			        				} else {
			        					common_alert(selectDate.substr(0,4)+"년  "+selectDate.substr(4,2)+"월 "+selectDate.substr(6,2)+"일 구인현황 정보가 없습니다.");
			        					return false;
			        				}
			        				// 선택된 포인트에 이미지 추가 START
			        				var chart = this.series.chart;
			        	            for(var i = 0; i < chart.series.length; i++) {
			        	            	for(var j = 0; j < chart.series[i].data.length; j++) {
			        	            		if(j == this.index) {
			        	            			chart.series[0].data[j].update({
			        	            				marker: {
			        	            					width: 30,
														height: 30,
			        	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_company.png)'
			        	            						}
			        	            			});
			        	            			chart.series[1].data[j].update({
			        	            				marker: {
			        	            					width: 30,
														height: 30,
			        	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_jobseeker.png)'
			        	            						}
			        	            			});
			        	            		} else {
			        	            			chart.series[i].data[j].update({
			        	            				marker: {
			        	            					symbol: 'circle'
			        	            						}
			        	            			});
			        	            		}
			        	            	}
			        	            }
			        				// 선택된 포인트에 이미지 추가 END
				            	}
			        		}
			            }					            
			        }
			    },
			    series: lineSeries
			}, function (chart){
				// 오늘의 구인현황 상세 화면 첫 조회시 요일별 전체구인현황 마지막값에 이미지 추가
				var chart = this;
	            for(var i = 0; i < chart.series.length; i++) {
	            	for(var j = 0; j < chart.series[i].data.length; j++) {
	            		if(j == chart.series[i].data.length-1) {
	            			chart.series[0].data[j].update({
	            				marker: {
	            					width: 30,
									height: 30,
	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_company.png)'
	            						}
	            			});
	            			chart.series[1].data[j].update({
	            				marker: {
	            					width: 30,
									height: 30,
	            					symbol: 'url(' + contextPath + '/resources/m2020/images/icon_chart_jobseeker.png)'
	            						}
	            			});
	            		} else {
	            			chart.series[i].data[j].update({
	            				marker: {
	            					symbol: 'circle'
	            						}
	            			});
	            		}
	            	}
	            }
			});
		},
		
		/**
		 * @name : chartSelectDayStatus
		 * @description : 일자별 차트 선택 시 상단 차트 및 내역 변경
		 * @date : 2020.09.22
		 * @author : 한광희
		 * @history :
		 * @param 
		 */		
		chartSelectDayStatus : function(selectDate){
			var dataParams = {};
			
			dataParams.sido_cd =  $("#todayStatusDetailSidoCd").val();
			if($("#todayStatusDetailSggCd").val() != '999'){
				dataParams.sgg_cd = $("#todayStatusDetailSggCd").val();				
			}
			dataParams.today = selectDate;
			
			$.ajax({
				type: "POST",
				url : contextPath + "/m2019/workroad/getChartSelectDayStatus.json",
				dataType: 'json',
				async: false,
				data: dataParams,
			    success: function(res){
			    	if(res.errCd == 0){
						var resultDetailList = res.result.resultDetailList;
						var today = resultDetailList[0].reg_dt;
						var lv_all_corp_cnt = resultDetailList[0].all_corp_cnt;
						var lv_all_rcrit_psn_cnt = resultDetailList[0].all_rcrit_psn_cnt;
						var lv_new_corp_cnt = resultDetailList[0].new_corp_cnt;
						var lv_new_rcrit_psn_cnt = resultDetailList[0].new_rcrit_psn_cnt;
						var lv_clos_corp_cnt = resultDetailList[0].clos_corp_cnt;
						var lv_clos_rcrit_psn_cnt = resultDetailList[0].clos_rcrit_psn_cnt;
						var lv_all_corp_cnt_c = resultDetailList[0].all_corp_cnt_c;
						var lv_all_rcrit_psn_cnt_c = resultDetailList[0].all_rcrit_psn_cnt_c;
						var lv_new_corp_cnt_c = resultDetailList[0].new_corp_cnt_c;
						var lv_new_rcrit_psn_cnt_c = resultDetailList[0].new_rcrit_psn_cnt_c;
						var lv_clos_corp_cnt_c = resultDetailList[0].clos_corp_cnt_c;
						var lv_clos_rcrit_psn_cnt_c = resultDetailList[0].clos_rcrit_psn_cnt_c;
						var lv_week_all_corp_cnt = resultDetailList[0].all_corp_cnt;
						var lv_week_all_rcrit_psn_cnt = resultDetailList[0].all_rcrit_psn_cnt;
						
						$("#all_corp_cnt").html(appendCommaToNumber(lv_all_corp_cnt));					// 전체구인업체수
						$("#all_rcrit_psn_cnt").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));		// 전체구인자수
						$("#new_corp_cnt").html(appendCommaToNumber(lv_new_corp_cnt));					// 신규등록구인업체수
						$("#new_rcrit_psn_cnt").html(appendCommaToNumber(lv_new_rcrit_psn_cnt));		// 신규등록구인자수
						$("#clos_corp_cnt").html(appendCommaToNumber(lv_clos_corp_cnt));				// 종료마감구인업체수
						$("#clos_rcrit_psn_cnt").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt));		// 종료마감구인자수
											
						/** 전일대비 전체구인업체, 전체구인자수 START */
						//전일대비 (전체구인업체)
						if (lv_all_corp_cnt_c > 0) {
							$("#all_corp_cnt_c_rate_img").html("▲");
							if(Number(lv_all_corp_cnt - lv_all_corp_cnt_c) != 0){
								$("#all_corp_cnt_c_rate").html((Number((100 * lv_all_corp_cnt_c / (lv_all_corp_cnt - lv_all_corp_cnt_c)).toFixed(2)))+"%");
							} else {
								$("#all_corp_cnt_c_rate").html("100%");
							}
							$("#all_corp_cnt_c_rate_img").addClass("td_up");
							$("#all_corp_cnt_c_rate_img").removeClass("td_down");
							$("#all_corp_cnt_c_rate").addClass("td_up");
							$("#all_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_all_corp_cnt_c < 0) {
							$("#all_corp_cnt_c_rate_img").html("▼");
							$("#all_corp_cnt_c_rate").html((Number(((-100 * lv_all_corp_cnt_c) / (lv_all_corp_cnt + lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#all_corp_cnt_c_rate_img").addClass("td_down");
							$("#all_corp_cnt_c_rate_img").removeClass("td_up");
							$("#all_corp_cnt_c_rate").addClass("td_down");
							$("#all_corp_cnt_c_rate").removeClass("td_up");
						} else {
							$("#all_corp_cnt_c_rate_img").html("");
							$("#all_corp_cnt_c_rate").html("0%");
							$("#all_corp_cnt_c_rate_img").removeClass("td_up");
							$("#all_corp_cnt_c_rate_img").removeClass("td_down");
							$("#all_corp_cnt_c_rate").removeClass("td_down");
							$("#all_corp_cnt_c_rate").removeClass("td_up");
						}
						
						//전일대비 (전체구인자수)
						if (lv_all_rcrit_psn_cnt_c > 0) {
							$("#all_rcrit_psn_cnt_c_rate_img").html("▲");
							if(Number((lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)) != 0){
								$("#all_rcrit_psn_cnt_c_rate").html((Number((100 * lv_all_rcrit_psn_cnt_c / (lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");								
							} else{
								$("#all_rcrit_psn_cnt_c_rate").html("100%");
							}
							$("#all_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_all_rcrit_psn_cnt_c < 0) {
							$("#all_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#all_rcrit_psn_cnt_c_rate").html((Number(((-100 * lv_all_rcrit_psn_cnt_c) / (lv_all_rcrit_psn_cnt + lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#all_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_up");
						} else {
							$("#all_rcrit_psn_cnt_c_rate_img").html("");
							$("#all_rcrit_psn_cnt_c_rate").html("0%");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#all_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_down");
							$("#all_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						
						/** 전일대비 전체구인업체, 전체구인자수 END */
						
						/** 전일대비 신규구인업체, 신규구인자수 START */
						//전일대비 (신규구인업체)
						if (lv_new_corp_cnt_c > 0) {
							$("#new_corp_cnt_c_rate_img").html("▲");
							$("#new_corp_cnt_c_rate").html(appendCommaToNumber(lv_new_corp_cnt_c) + "개");
							$("#new_corp_cnt_c_rate_img").addClass("td_up");
							$("#new_corp_cnt_c_rate_img").removeClass("td_down");
							$("#new_corp_cnt_c_rate").addClass("td_up");
							$("#new_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_new_corp_cnt_c < 0) {
							$("#new_corp_cnt_c_rate_img").html("▼");
							$("#new_corp_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_new_corp_cnt_c)) + "개");
							$("#new_corp_cnt_c_rate_img").addClass("td_down");
							$("#new_corp_cnt_c_rate_img").removeClass("td_up");
							$("#new_corp_cnt_c_rate").addClass("td_down");
							$("#new_corp_cnt_c_rate").removeClass("td_up");
						} else {
							$("#new_corp_cnt_c_rate_img").html("");
							$("#new_corp_cnt_c_rate").html("0개");
							$("#new_corp_cnt_c_rate_img").removeClass("td_up");
							$("#new_corp_cnt_c_rate_img").removeClass("td_down");
							$("#new_corp_cnt_c_rate").removeClass("td_down");
							$("#new_corp_cnt_c_rate").removeClass("td_up");
						}
						
						//전일대비 (신규구인자수)
						if (lv_new_rcrit_psn_cnt_c > 0) {
							$("#new_rcrit_psn_cnt_c_rate_img").html("▲");
							$("#new_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(lv_new_rcrit_psn_cnt_c) + "명");
							$("#new_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_new_rcrit_psn_cnt_c < 0) {
							$("#new_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#new_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_new_rcrit_psn_cnt_c)) + "명");
							$("#new_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_up");
						} else {
							$("#new_rcrit_psn_cnt_c_rate_img").html("");
							$("#new_rcrit_psn_cnt_c_rate").html("0명");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#new_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_down");
							$("#new_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						
						/** 전일대비 신규구인업체, 신규구인자수 END */
						
						/** 전일대비 종료마감구인업체수, 종료마감구인자수 START */
						//전일대비 (종료마감구인업체수)
						if (lv_clos_corp_cnt_c > 0) {
							$("#clos_corp_cnt_c_rate_img").html("▲");
							$("#clos_corp_cnt_c_rate").html(appendCommaToNumber(lv_clos_corp_cnt_c) + "개");
							$("#clos_corp_cnt_c_rate_img").addClass("td_up");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_down");
							$("#clos_corp_cnt_c_rate").addClass("td_up");
							$("#clos_corp_cnt_c_rate").removeClass("td_down");
						} else if (lv_clos_corp_cnt_c < 0) {
							$("#clos_corp_cnt_c_rate_img").html("▼");
							$("#clos_corp_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_clos_corp_cnt_c)) + "개");
							$("#clos_corp_cnt_c_rate_img").addClass("td_down");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_up");
							$("#clos_corp_cnt_c_rate").addClass("td_down");
							$("#clos_corp_cnt_c_rate").removeClass("td_up");
						} else {
							$("#clos_corp_cnt_c_rate_img").html("");
							$("#clos_corp_cnt_c_rate").html("0개");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_up");
							$("#clos_corp_cnt_c_rate_img").removeClass("td_down");
							$("#clos_corp_cnt_c_rate").removeClass("td_down");
							$("#clos_corp_cnt_c_rate").removeClass("td_up");
						}
						
						//전일대비 (종료마감구인자수)
						if (lv_clos_rcrit_psn_cnt_c > 0) {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("▲");
							$("#clos_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt_c) + "명");
							$("#clos_rcrit_psn_cnt_c_rate_img").addClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").addClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_down");
						} else if (lv_clos_rcrit_psn_cnt_c < 0) {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("▼");
							$("#clos_rcrit_psn_cnt_c_rate").html(appendCommaToNumber(Math.abs(lv_clos_rcrit_psn_cnt_c)) + "명");
							$("#clos_rcrit_psn_cnt_c_rate_img").addClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate").addClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_up");
						} else {
							$("#clos_rcrit_psn_cnt_c_rate_img").html("");
							$("#clos_rcrit_psn_cnt_c_rate").html("0명");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_up");
							$("#clos_rcrit_psn_cnt_c_rate_img").removeClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_down");
							$("#clos_rcrit_psn_cnt_c_rate").removeClass("td_up");
						}
						/** 전일대비 종료마감구인업체수, 종료마감구인자수 END */
						
						$("#today").html(today.substring(4, 6) + "월 " + today.substring(6, 8) + "일 기준"); // 기준일 셋팅
						
						// 오늘의 구인현황 상세화면 상단 전체 업체및구인차트
						$todayStatusMap.ui.todayStatusChart(resultDetailList);	
						common_loading(false); // 로딩바 표시
			    	} else {
						common_alert('failed!');
					}
				} ,
				error:function(err) {
					common_alert(err.responseText);
				}
				,complete : function() {
			    	common_loading(false); // 로딩바 감춤
			    }
			});
		},
		/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
		
		/**
		 * @name : todayStatusChart
		 * @description : 오늘의 구인현황 상세화면 상단 전체 업체및구인차트
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		todayStatusChart : function(chartData){			
			var ChartData = [];		//차트 데이터
			
			ChartData.push(Number(chartData[0].all_corp_cnt));	// 전체업체수
			ChartData.push(Number(chartData[0].all_rcrit_psn_cnt));	// 전체구인자수

			// 차트설정
            Highcharts.setOptions({
               lang: {
                   thousandsSep: ",",
                   numericSymbols: ["천", "백만", "십억", "조", "천조", "백경"]
                }
            });
			
			$('#todayStatusChart').highcharts({
				chart: {
					backgroundColor: {
			            linearGradient: [500, 500, 500, 0],
			            stops: [
			            	[0, '#ffffff'],	// 하단 백그라운드 색
			            	[1, '#ffffff']	// 상단 백그라운드 색
			            ]
			        },
			        renderTo: 'container',
			        type: 'column',
			        width: $(window).width(),
			        height: 160,	// 2020.09.01[한광희] 오늘의 구인현황 차트 수정
			        marginBottom : 20,
			        marginTop: 30,
			        showAxes: false
			    },
			    title: {
			        text: ''
			    },
			    xAxis: {
			    	categories: [],
			        tickWidth: 0,
			        labels: {
			        	enabled: false
			        },
			        lineWidth: 0
			    },
			    yAxis: {
			        title: {
			            text: ''
			        },
			        labels: {
			            style: {
			                color: '#596070' ,	// y축 색상
			                fontSize: "13px"
			            }
			        },
			        gridLineWidth: 0,
			        maxPadding: 0.5
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
			                	color: '#353B48',
			                	textOutline : "0px",
			                	fontWeight: "bold",
			                	textShadow: false,
			                	fontSize: "20px"
			                }
			            },
			            enableMouseTracking: false,
			            shadow: false
			        }
			    },
			    series: [{
			    	name : "",
			        data : ChartData,
			        color: {
						linearGradient: {
							x1: 0,
							x2: 0,
							y1: 0,
							y2: 1
						},
						stops: [
							[0, '#8A93E9'],
							[1, '#2FBFDE']
						]
			        }
			    }]
			}, function (chart){
				var chart = this,
			    leftOffset = chart.plotLeft,
			    topOffset = chart.plotTop,
			    series = chart.series[0],
			    xAxis = series.xAxis,
			    yAxis = series.yAxis,
			    points = series.points;
				var index = 0;
				
				points.forEach(function(point) {
					var x = xAxis.toPixels(point.x) - leftOffset,
					y = yAxis.toPixels(point.y) - topOffset;

					if(index == 0){
						chart.renderer.image().attr({
					      href: contextPath + '/resources/m2020/images/icon_chart_company.png',
					      x: x-15,
					      y: y-10,
					      width:30,
					      height:30,
					      zIndex: 10
					    }).add(series.group);
					} else if(index == 1) {
						chart.renderer.image().attr({
					      href: contextPath + '/resources/m2020/images/icon_chart_jobseeker.png',
					      x: x-15,
					      y: y-10,
					      width:30,
					      height:30,
					      zIndex: 10
					    }).add(series.group);
					}
				    index++;
				});
			});
		},
		
		/**
		 * @name : todayStatusMapMove
		 * @description : 지도 이동
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		todayStatusMapMove : function(adm_cd){
			var coord_x = "";
			var coord_y = ""; 
			var zoomlevel = "";
			
			// 지도 x,y 좌표 및 zoomlevel 설정
            switch (adm_cd.length) {
				case 2:
					coord_x = $("#todayStatusDetailSidoCd option:selected").data("coor-x");
	                coord_y = $("#todayStatusDetailSidoCd option:selected").data("coor-y");
	                
	                if(adm_cd == '11' || adm_cd == '21' || adm_cd == '22' ||
	                		adm_cd == '24' || adm_cd == '25' || adm_cd == '26' || adm_cd == '29'){
	                	// 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
	                	zoomlevel = 4;
	                } else if(adm_cd == '23' || adm_cd == '39') {
	                	// 인천(23), 제주(39)
	                	zoomlevel = 3;
	                } else if(adm_cd == '31' || adm_cd == '32' || adm_cd == '33' ||
	                		adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '37' || adm_cd == '38') {
	                	// 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
	                	zoomlevel = 2;
	                } else {
	                	zoomlevel = 1;
	                }
					break;
				case 5:
					coord_x = $("#todayStatusDetailSggCd option:selected").data("coor-x");
	                coord_y = $("#todayStatusDetailSggCd option:selected").data("coor-y");
	                zoomlevel = 5;
					break;
				default:
					coord_x = 990480.875;
            		coord_y = 1815839.375;
            		zoomlevel = 1;
					break;
			}
			            
			this.map.mapMove([coord_x, coord_y], zoomlevel, 0);	// 선택된 지역으로 이동
		},
		
		/** * yyyyMMdd 포맷으로 반환 */ 
		getFormatDate: function(date){ 
			var year = date.getFullYear();	//yyyy 
			var month = (1+date.getMonth());	//M 
			month = month >= 10 ? month : '0' + month;	//month 두자리로 저장 
			var day = date.getDate();	//d 
			day = day >= 10 ? day : '0' + day;	//day 두자리로 저장 
			return year + '' + month + '' + day;
		},
		
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 * @param id :
		 *            html tag id
		 */
		createMap : function(id) {
			this.map = new sMap.map();
			this.map.isCurrentLocationMarker = true;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 990480.875, 1815839.375 ];
			this.map.zoom = 1;
			this.map.createMap($todayStatusMap, id, {
			});
			this.map.gMap.whenReady(function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				$todayStatusMap.ui.map.moveCurrentLocation(true, function() {
					//맵의 중앙 adm_cd 가져오기
					$todayStatusMap.ui.map.getCenterToAdmCd(null, function(res) { 
						var lv_my_center = $todayStatusMap.ui.map.gMap.getCenter();
						
						$todayStatusMap.ui.my_x = lv_my_center.x;
						$todayStatusMap.ui.my_y = lv_my_center.y;
						$todayStatusMap.ui.my_sido_cd = res.result.sido_cd;
						$todayStatusMap.ui.my_sido_nm = res.result.sido_nm;
						$todayStatusMap.ui.my_sgg_cd = res.result.sgg_cd;
						$todayStatusMap.ui.my_sgg_nm = res.result.sgg_nm;
						$todayStatusMap.ui.my_emdong_cd = res.result.emdong_cd;
						$todayStatusMap.ui.my_emdong_nm = res.result.emdong_nm;
						
						//내 위치 텍스트
						$("#currentMapMyLocation_name").text($todayStatusMap.ui.my_sido_nm+" "+$todayStatusMap.ui.my_sgg_nm+" "+$todayStatusMap.ui.my_emdong_nm);
						
						if(areaType == "all"){
							$todayStatusMap.ui.todayStatusSggCd('99');	// 시군구코드 조회
							$todayStatusMap.ui.todayStatus('99');	// 오늘의 구인현황 초기 조회
							
							$("#todayStatusAreaTit").text("오늘의 구인현황(전국 기준)");
						} else {
							/** 오늘의 구인현황 상세 화면 셋팅 및 data 조회 START */
							$("#todayStatusDetailSidoCd").val(res.result.sido_cd).prop("selected", true);	// 현위치 시도 코드 선택
							$todayStatusMap.ui.todayStatusSggCd(res.result.sido_cd, "first");	// 시군구코드 조회
							$todayStatusMap.ui.todayStatus(res.result.sido_cd+res.result.sgg_cd);	// 오늘의 구인현황 초기 조회
							/** 오늘의 구인현황 상세 화면 셋팅 및 data 조회 END */							

							$("#todayStatusAreaTit").text("오늘의 구인현황("+res.result.sido_nm+" "+res.result.sgg_nm+" 기준)");
						}
						//오늘의 전체 일자리현황 팝업
						if(common_get_cookie("todayStatusPopup_no_today_yn") != "Y") {
							todayStatusPopupSelect();
						}
					});
				});
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
		},
		
		/**
		 * @name : todayStatusDetailPopupToggle
		 * @description : 오늘의 구인현황 상세
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		todayStatusDetailPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {				
				//$("#todayStatusDetailPopup").css("top",$(window).outerHeight(true)+"px");
				$("#todayStatusDetailPopup").show().animate({
					/*top : 40*/
					bottom : "0px"
				},400,function(){
					//$("body").children("div.Wrap").children("div.Header").hide(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
					
					$todayStatusMap.ui.tempAdmCd = $("#todayStatusDetailSidoCd").val() + $("#todayStatusDetailSggCd").val();
					
					$("#todayStatusDetailPopup").scrollTop(0,0);	// 2020.09.22[한광희] 상세화면 페이지 상단 이동
				});
			}
			//감춤
			else {
				//$("body").children("div.Wrap").children("div.Header").show(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
				$("#todayStatusDetailPopup").animate({
					/*top : $(window).outerHeight(true)*/
					bottom : "-100%"
				},400,function(){
					$("#todayStatusDetailPopup").hide();
					
					var adm_cd = $("#todayStatusDetailSidoCd").val()+$("#todayStatusDetailSggCd").val();
					if($todayStatusMap.ui.tempAdmCd != adm_cd){
						$todayStatusMap.ui.todayStatus(adm_cd);						
					}
					
					/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 START */
					$todayStatusMap.ui.weekStatusChart($todayStatusMap.ui.categories, $todayStatusMap.ui.weekDataList);
					$todayStatusMap.ui.chartSelectDayStatus($todayStatusMap.ui.tmpCategories[$todayStatusMap.ui.tmpCategories.length-1]);
					/** 2020.09.22[한광희] 일자리 맵 상세화면 수정 END */
				});
			}
		}	
	};
	
	// 지도 콜백 함수 선언
	$todayStatusMap.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type == "data"){
				var lvAdmCd = data.properties.adm_cd;
				var tmpTodayStatusList = $todayStatusMap.ui.todayStatusList;
				var areaTitle = "";
				var allCorpCnt = "";
				var allRcritPsnCnt = "";
				
				/* 지도 선택후 팝업에서 지역명 기본 셋팅 START */
				var tempSidoNm = "";
				if($("#todayStatusDetailSidoCd option:selected").text() != "전국"){
					tempSidoNm = $("#todayStatusDetailSidoCd option:selected").text() + " ";
				}
				var tempSggNm = "";
				if($("#todayStatusDetailSggCd option:selected").text() != "전체"){
					tempSggNm = $("#todayStatusDetailSggCd option:selected").text() + " ";
				}
				if(lvAdmCd.length >= 5){
					areaTitle += tempSidoNm + tempSggNm;
				}
				/* 지도 선택후 팝업에서 지역명 기본 셋팅 END */
				
				for(var i = 0; i < tmpTodayStatusList.length; i++){
					if(lvAdmCd == tmpTodayStatusList[i].adm_cd){
						//2022-11-30  팝업 시도명 수정 및 추가
//						areaTitle +=  tmpTodayStatusList[i].adm_nm;					// 오늘의 구인현황:시도명
						areaTitle += (data.properties.adm_nm).substring((data.properties.adm_nm).lastIndexOf(" "), data.properties.adm_nm.length);
						allCorpCnt = tmpTodayStatusList[i].right_data_val;			// 오늘의 구인현황:전체 업체수
						allRcritPsnCnt = tmpTodayStatusList[i].right_data_val2;		// 오늘의 구인현황:전체모집인원수
					}
				}
												
				/** 오늘의 구인현황 상세화면 select box 변경 START */
				// 지도 선택시 상세 조회 화면 시도 콤보 값 변경
				$("#todayStatusDetailSidoCd option").each(function(index, element){
					if($( element ).val() == lvAdmCd) {
						$("#todayStatusDetailSidoCd option[value='" + lvAdmCd + "']").prop("selected", true);
						$todayStatusMap.ui.todayStatusSggCd(lvAdmCd);	// 2020.08.28[한광희] 시군구코드 조회 추가
						return false;
					}
				});
				// 지도 선택시 상세 조회 화면 시도 콤보 값 변경
				$("#todayStatusDetailSggCd option").each(function(index, element){
					if($( element ).val() == lvAdmCd.substring(2,5)) {
						$("#todayStatusDetailSggCd option[value='" + lvAdmCd.substring(2,5) + "']").prop("selected", true);
						return false;
					}
				});
				/** 오늘의 구인현황 상세화면 select box 변경 END */
				
				// 2020.08.28[한광희] 지도에서 선택한 지역(시군구까지) 명 표현 START
				if(lvAdmCd.length <= 5){
					$("#todayStatusAreaTit").text("오늘의 구인현황("+areaTitle+" 기준)");
				}
				// 2020.08.28[한광희] 지도에서 선택한 지역(시군구까지) 명 표현 END
				
				// 지역 선택시 해당 지역 정보 표출 START
				var areaData = "";
				//2022-11-30  팝업 시도명 수정
				// if(areaTitle == "") areaTitle = (data.properties.adm_nm).substring((data.properties.adm_nm).lastIndexOf(" "), data.properties.adm_nm.length);
				$("#todayStatusAreaTitle").html(areaTitle);
				
				if(allCorpCnt == ""){
					areaData = "구인정보 없음";					
				} else {
					areaData = appendCommaToNumber(allCorpCnt) + "업체 / " + appendCommaToNumber(allRcritPsnCnt) + "명";	
				}
				common_popup_area_click(areaTitle, "", areaData);
				// 지역 선택시 해당 지역 정보 표출 END			
				
				
				// 일자리보기 버튼 클릭에 따른 값 셋팅 START
				if(lvAdmCd.length == 2){
					$("#todayStatusAlertBoxJobDetail").attr("sido_cd",lvAdmCd);
					$("#todayStatusAlertBoxJobDetail").attr("sgg_cd","");
				} else if(lvAdmCd.length >= 5) {
					$("#todayStatusAlertBoxJobDetail").attr("sido_cd",lvAdmCd.substring(0,2));
					$("#todayStatusAlertBoxJobDetail").attr("sgg_cd",lvAdmCd.substring(2,5));
				}
				// 일자리보기 버튼 클릭에 따른 값 셋팅 END
				
				if(lvAdmCd.length < 6){
					$todayStatusMap.ui.todayStatus(lvAdmCd);	// 선택된 시도의 시군구 정보 조회					
				}
			}
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
	
	$todayStatusMap.util = {
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

	$todayStatusMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
						
			/** 오늘의 구인현황 상세화면 관련 Event START */
			// 오늘의 구인현황 상세내역 시도 콤보박스 값 변경
			$(document).on("change", "#todayStatusDetailSidoCd", function() {
				srvLogWrite('O0', '05', '02', '01', '', '');
				$todayStatusMap.ui.todayStatus($(this).val());		// 시도 선택에 따른 오늘의 구인현황  조회
				$todayStatusMap.ui.todayStatusSggCd($(this).val());	// 시군구코드 조회
				
				$("#todayStatusAreaTit").text("오늘의 구인현황("+$("#todayStatusDetailSidoCd option:selected").text()+" 기준)");	// 2020.08.28[한광희] 시도 선택에 따른 위치명칭 표기
			});
			
			// 오늘의 구인현황 상세내역 시군구 콤보박스 값 변경
			$(document).on("change", "#todayStatusDetailSggCd", function() {
				srvLogWrite('O0', '05', '02', '01', '', '');
				var adm_cd = $("#todayStatusDetailSidoCd").val() + $(this).val();
				$todayStatusMap.ui.todayStatus(adm_cd);		// 시군구 선택에 따른 값 조회
				
				// 2020.08.28[한광희] 시군구 선택에 따른 위치명칭 표기 START
				if($(this).val() != "999"){
					$("#todayStatusAreaTit").text("오늘의 구인현황("+$("#todayStatusDetailSidoCd option:selected").text()+" "+$("#todayStatusDetailSggCd option:selected").text()+" 기준)");					
				} else {
					$("#todayStatusAreaTit").text("오늘의 구인현황("+$("#todayStatusDetailSidoCd option:selected").text()+" 기준)");
				}
				// 2020.08.28[한광희] 시군구 선택에 따른 위치명칭 표기 END
			});
			
			// 상세현황 버튼 스와이프 기능 STRAT
			$("#todayStatusDetailBtn").swipe({
				threshold : 10,
				// 펼치기
				swipeUp:function(event, direction) {
					$todayStatusMap.ui.todayStatusDetailPopupToggle(true);
				},
				// 버튼 클릭
				tap:function(event, target) {
					$todayStatusMap.ui.todayStatusDetailPopupToggle(true);
				}
			});	
						
			// 오늘의 구인현황 상세화면 X 클릭
			$("body").on("click", "#todayStatusDetailPopup_close", function(){
				$todayStatusMap.ui.todayStatusDetailPopupToggle(false);
			});
			
			/** 오늘의 구인현황 상세화면 관련 Event END */
			
			//오늘의 전체 일자리현황 팝업 닫기 버튼
			$(document).on("click", "#todayStatusPopup_close", function() {
				//오늘 하루 다시 보지 않기 저장
				if($("#todayStatusPopup_check").prop("checked")) {
					common_set_cookie("todayStatusPopup_no_today_yn","Y",1);
				}
				else {
					common_remove_cookie("todayStatusPopup_no_today_yn");
				}
				
				//오늘의 전체 일자리현황 팝업 닫음
				todayStatusPopupToggle(false);
			});
			
			// 범례 버튼 클릭
			$("body").on("click", "#legendInfoBtn", function(){
				srvLogWrite('O0', '51', '05', '01', '', '');
				if ($('.tooltipbox').css('visibility') == 'hidden'){
					$(this).addClass("on");
					$('.tooltipbox').css('visibility', 'visible');
				} else {
					$(this).removeClass("on");
					$('.tooltipbox').css('visibility', 'hidden');
				}
			});
			
			// 색상 범례 새로고침 이미지 클릭
			$("body").on("click", "#reverseBtn", function(){
				$todayStatusMap.ui.map.legend.reverseColor();
			});
			
			/** 2020.09.09[한광희] 범례 팝업 닫기(X) 버튼 추가 START */
			// 범례 닫기 버튼 이벤트
			$("body").on("click", "#dataRemarks_close", function(){
				$("#legendInfoBtn").removeClass("on");
				$('.tooltipbox').css('visibility', 'hidden');
			});
			/** 2020.09.09[한광희] 범례 팝업 닫기(X) 버튼 추가 END */
		},
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($(".Wrap>.Header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}
	};
	
}(window, document));	