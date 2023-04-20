/**
 * 경제상황 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 경제상황 주요지표  
 * 
 * history : 
 *	2018.09.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaEconomicSituation = W.$ssaEconomicSituation || {};
	
	$ssaEconomicSituation.ui = {
		pSelector  : "#ssaEconomicSituation",
		/*
		I3401 :	경제성장률
		I3402 :	지역내총생산
		I3403 :	소비자물가지수
		I3404 :	설비투자지수 -> 생활물가 적용
		I3405 :	수출입 - 수출
		I3406 :	수출입 - 수입
		*/
		ssaEconomicSituationList : ["I3401","I3402","I3403","I3404","I3405","I3406"],
		searchbtnCnt : 0,
		SearchParam : [],
		MapType : "",
		Category : [],		//차트 데이터

		/**
		 * @name         : ready
		 * @description  : 최초 화면 Open할때 실행 / 메뉴 선택 시점
		 * @date         : 2018.11.20
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		ready : function() {
			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '05', '04', '01', '경제상황', '');

			$ssaEconomicSituation.ui.ssaEconomicSituationMainData(); //메인지표정보조회
			$ssaEconomicSituation.ui.ssaEconomicSituationMainChartData("I3401"); //메인차트정보조회
			$ssaEconomicSituation.ui.ChangeColor("I3401"); // 경제성장률
			$workRoad.event.setToolTip(".ar");	
			$workRoad.event.setToolTip(".job-arrow");
		},
		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function() {
			$workRoad.ui.showLayer(this.pSelector);
			$workRoad.ui.toggleLayer("#ssaEconomicSituation", true);
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideLayer('#ssaEconomicSituation');
		},	
		
/* ************************
 * 지표 관련 함수 STATR * 
 * ************************/		
		/**
		 * @name         : ChangeColor
		 * @description  : 지표 백그라운드 컬러 변경
		 * @date         : 2018.10.24
		 * @author	     : 손원웅
		 * @history 	 : 
		 */
		ChangeColor : function(item) {
			var empCnt = 0;
			
			//지표정보조회
			$workRoad.ui.selectJobStatsDataInfo(item
				, function(data) {

					//mng_s 20190319 이금은
					var statNm = data.stat_nm;
					var title = data.stat_nm;
					//mng_s 20190319 이금은
					
					//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
					
					/** 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 주석처리 START */
					/* 
					$("#ssaEconomicSituation #ssaStatNm").html(statNm);
					$("#ssaEconomicSituation #ssaTitle").html(title);					// 제목
					$("#ssaEconomicSituation #ssaExp").html(data.stat_exp);				// 설명
					$("#ssaEconomicSituation #ssaOrigin").html(data.colct_source);		// 출처
					 */
					/** 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 주석처리 END */
					
					console.log("ChangeColor - DataInfo data : " + JSON.stringify(data));
				}, function(err) {
					alert(err);
			});
			
			for(var i=0; i<this.ssaEconomicSituationList.length; i++){
				if(this.ssaEconomicSituationList[i] == item){
					var oDiv = document.getElementById(item);
				    oDiv.style.backgroundColor = "#00C6ED";
				    
				    if(item == "I3104" || item == "I3112"){
				    	empCnt++;
				    }
				}else{
					var oDiv = document.getElementById(this.ssaEconomicSituationList[i]);
				    oDiv.style.backgroundColor = "#FFFFFF";
				}
			}
			
			if(empCnt == 0){
				document.getElementById("emp").style.backgroundColor = "#FFFFFF";
			}else{
				document.getElementById("emp").style.backgroundColor = "#00C6ED";
			}
			
			this.ChangeCondition(item);	//일자리현황 조회 조건 변경
			this.ssaEconomicSituationMainChartData(item);
		},
		
		/**
		 * @name         : DetailInfo
		 * @description  : 일자리통계분석 > 경제상황 > 지표 설명 정보 팝업 호출로 인한 추가
		 * @date         : 2019.05.17
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		DetailInfo : function(item, statNm, stat_exp, colct_source) {			
			var left = parseInt($("#ssaEconomicSituation").css("left"));
			var top = parseInt($("#ssaEconomicSituation").css("top"));
			var width = parseInt($("#ssaEconomicSituation").css("width"));
			
			$("#ssaDetailInfoPopup #ssaTitle").html(statNm);			// 제목
			$("#ssaDetailInfoPopup #ssaExp").html(stat_exp);			// 설명
			$("#ssaDetailInfoPopup #ssaOrigin").html(colct_source);		// 출처
			
			if (item == 'I3401') {	// 경제성장률
				left = left + 155 - $workRoad.ui.coordX;
				top = top + 58 - $workRoad.ui.coordY;
			} else if (item == 'I3402') {	// 지역내총생산
				left = left + 160 - $workRoad.ui.coordX;
				top = top + 100 - $workRoad.ui.coordY;
			} else if (item == 'I3404') {	// 생활물가지수
				left = left + 160 - $workRoad.ui.coordX;
				top = top + 143 - $workRoad.ui.coordY;
			} else if (item == 'I3405') {	// 수출입 > 수출
				left = left + 190 - $workRoad.ui.coordX;
				top = top + 187 - $workRoad.ui.coordY;
			} else if (item == 'I3406') {	// 수출입 > 수입
				left = left + 190 - $workRoad.ui.coordX;
				top = top + 230 - $workRoad.ui.coordY;
			} 
			
			$ssaDetailInfoPopup.ui.show(left, top);
		},
		
		/**
		 * @name         : ChangeCondition
		 * @description  : 지표 조회 조건 변경
		 * @date         : 2018.10.29
		 * @author	     : 손원웅
		 * @history 	 : 
		 */
		ChangeCondition : function(item) {

			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '05', '04', '02', '', 'Link_id='+item);


			for(var i=0; i<this.ssaEconomicSituationList.length; i++){
				if(this.ssaEconomicSituationList[i] == item){
					for(var j=1; j<11; j++){	//_C10까지 있음
						if(j == 1){	//기본 서브 조건
							var DivShow = "#ssaEconomicSituation #"+item+"_condition_C"+j;
							$(DivShow).show();
							
							$('input:radio[name="ssaES_condition_map_type"]').eq(0).prop("checked", true); //지도 표출 방식 선택
							
							switch(item){
								case("I3114") : $('input:radio[name="unemployment_rate"]').eq(0).prop("checked", true);	//실업률
								case("I3104") : $('input:radio[name="employed_person"]').eq(0).prop("checked", true);	//취업자수
								case("I3112") : $('input:radio[name="unemployed_person"]').eq(0).prop("checked", true);	//실업자수
								case("I3101") : $('input:radio[name="population"]').eq(0).prop("checked", true);	//인구
							}
						}else if(j > 8){	//타이틀 설명
							var DivShow = "#ssaEconomicSituation #"+item+"_condition_C"+j;
							$(DivShow).show();
						}
					}
				}else{
					for(var j=1; j<11; j++){	//_C10까지 있음
						var DivHide = "#ssaEconomicSituation #"+this.ssaEconomicSituationList[i]+"_condition_C"+j;
						$(DivHide).hide();
					}
				}
			}
			
		},
/* ************************
 * 지표 관련 함수 END   * 
 * ************************/		
		/**
		 * @name         : ssaEconomicSituationMainData
		 * @description  : 일자리통계분석(경제상황_지표)
		 * @date         : 2018. 10. 23. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		ssaEconomicSituationMainData : function(){
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsEconomicSituationMain.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						/*
						I3401 :	경제성장률
						I3402 :	지역내총생산
						I3403 :	소비자물가지수
						I3404 :	설비투자지수 -> 생활물가 적용
						I3405 :	수출입 - 수출
						I3406 :	수출입 - 수입
						*/
						
						var mainData = res.result;
						
						console.log("mainData : " + JSON.stringify(mainData));
						//console.log("mainData.length : " + mainData.length);
						
						var listElement = '<ul>';
						for(var i = 0; i < mainData.length; i++) {
							
							var Val = mainData[i].dt; //지표 값
							var link_ID = mainData[i].link_id; //지표ID
							//var link_Nm = mainData[i].link_nm;
							var link_Nm = mainData[i].itm_nm; //지표명
							//2019-01-04 지표 명 또는 지표 수치 옆에 (년), (분기), (월)에 대한 작은 아이콘을 두어 구분.
							var updt_cycle = mainData[i].updt_cycle;
							var updt_cycle_html = "<span style=\"min-width:0;\"";
							if(updt_cycle == "년") {
								updt_cycle_html += "style=\"min-width:0;\" class=\"point-label annual-income\""; 
							} else if(updt_cycle == "월") {
								updt_cycle_html += "style=\"min-width:0;\" class=\"point-label salary\"";
							} else if(updt_cycle == "분기") {
								updt_cycle_html += "style=\"min-width:0;\" class=\"point-label bg-box\"";
							} else if(updt_cycle == "매일") {
								updt_cycle_html += "style=\"min-width:0;\" class=\"point-label dayly-pay\"";
							} else if(updt_cycle == "") {
								updt_cycle_html += "style=\"display:none;\"";
							} else {
								updt_cycle_html += "style=\"min-width:0;\" class=\"point-label hourly-pay\"";
							}
							updt_cycle_html += ">"; 
							updt_cycle_html += updt_cycle;
							updt_cycle_html += "</span>";
							var unit_Nm = mainData[i].unit_nm; //단위명
							//var Val_apc = mainData[i].total;
							var Val_apc = mainData[i].pre_dt; //이전 월(년) 데이터
							
							var valChk = Val.indexOf("-");
							var span_Nm = "";	//class명
							
							//지표 상승,하락 구분처리 및 단위 세팅
							var unitObj = $workRoad.util.getUnitList(unit_Nm);
//							var unitObj = {};
//							unitObj.points = [0,3,6]; 
//							unitObj.units = ["개","천개","백만개"];
//							unitObj.compareOperation = "-";
							unitObj.compareValue = Val_apc; // ★★★★  요기 값을 변경해야 함.  ★★★★
							var result = $workRoad.util.toNumberString(Val, unitObj);
							
							/*if(unitObj != ""){
								result = $workRoad.util.toNumberString(Val, unitObj);
							}else{
								result.value = Val;
								result.text = Val;
							}*/
//							var result = $workRoad.util.toNumberString(Val, {points: [0.1,3.1,6.1], units: [unit_Nm,"천호","백만호"]});
							var tooltipVal = "";
							var statNm = "";		// 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
							var colct_source = "";	// 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
							
							//20181214 손원웅_증감 툴팁 세팅 추가
							var idaSubj = "";
							var idaTitle = "";
							
							// 2019.11.04[한광희] 단위 null 일 경우 공백 처리
							if(unit_Nm == null ) {
								unit_Nm = '';
							}
							
							if(result.iconClass == "up"){
								//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
								if(link_ID == "I3401" || link_ID == "I3402" || link_ID == "I3405" || link_ID == "I3406"){
									//연도
									idaSubj = "전 연도 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 증가";
								}else{
									//월
									idaSubj = "전 월 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 증가";
								}
							}else if(result.iconClass == "down"){
								//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
								if(link_ID == "I3401" || link_ID == "I3402" || link_ID == "I3405" || link_ID == "I3406"){
									//연도
									idaSubj = "전 연도 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 감소";
								}else{
									//월
									idaSubj = "전 월 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 감소";
								}
							}
							
							//툴팁정보조회
							$workRoad.ui.selectJobStatsDataInfo(link_ID
								, function(data) {
									tooltipVal = data.stat_exp;
									statNm = data.stat_nm;				// 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
									colct_source = data.colct_source;	// 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
									
									console.log("ssaEconomicSituationMainData - DataInfo tooltipVal : " + JSON.stringify(tooltipVal));
								}, function(err) {
									alert(err);
							});
							
							if(link_ID == 'I3405' || link_ID == 'I3406'){	//수출입-수출, 수출입-수입 표출부분	
								$('td[id='+link_ID+'] *').remove();

								//listElement += '<dl> <dt>' + link_Nm + '</dt>';
								/** 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								// listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaEconomicSituation.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
								listElement += '<dd title="' + result.value + '" style="text-align:left;">' + result.text + '</dd> <span class="ssaEconomicSituation job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
								listElement += '</dl>';
								listElement += '</td>';
								$('td[id='+link_ID+']').append(listElement);
								
								listElement = '<ul>';
							}else{
								$('div[id='+link_ID+'] *').remove();
								
								listElement += '<table border="1">';
								listElement += '<colgroup>';
								listElement += '<col width="100%">';
								listElement += '</colgroup>';
								listElement += '<tbody>';
								listElement += '<tr>';
								listElement += '<td>';
								//listElement += '<dl> <dt>' + link_Nm + '</dt>';
								/** 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								// listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaEconomicSituation.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.28[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaEconomicSituation job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
								listElement += '</dl>';
								listElement += '</td>';
								listElement += '</tr>';
								listElement += '</tbody>';
								listElement += '</table>';
								listElement += '</div>';
								$('div[id='+link_ID+']').append(listElement);
								
								listElement = '<ul>';
							}
							
							$('#ssaEconomicSituation #'+link_ID+'_apc').attr('data-val', result.iconText);
							$('#ssaEconomicSituation #'+link_ID+'_apc').attr('data-subj', idaSubj);
							$('#ssaEconomicSituation #'+link_ID+'_apc').attr('title', idaTitle);
							//$('#'+link_ID+'_apc').attr('ssaval', (Val + unit_Nm));
						}
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		
		/**
		 * @name         : ssaEconomicSituationMainChartData
		 * @description  : 일자리통계분석(일자리 현황)
		 * @date         : 2018. 10. 23. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		ssaEconomicSituationMainChartData : function(item){
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsEconomicSituationMainChart.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						/*
						I3401 :	경제성장률
						I3402 :	지역내총생산
						I3403 :	소비자물가지수
						I3404 :	설비투자지수 -> 생활물가 적용
						I3405 :	수출입 - 수출
						I3406 :	수출입 - 수입
						*/
						
						var mainChart = res.result.mainChart;
						//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
						if(item == "I3401" || item == "I3402" || item == "I3405" || item == "I3406") {
							this.Category = res.result.yearCategory;
						} else {
							this.Category = res.result.monthCategory;
						}
						
						console.log("this.Category : " + JSON.stringify(this.Category));
						
						var arry_Category = [
							this.Category[0].mon0
							,this.Category[0].mon1
							,this.Category[0].mon2
							,this.Category[0].mon3
							,this.Category[0].mon4
							,this.Category[0].mon5
							,this.Category[0].mon6
							,this.Category[0].mon7
							,this.Category[0].mon8
							,this.Category[0].mon9
							,this.Category[0].mon10
							,this.Category[0].mon11
		                ];
						console.log("arry_Category : " + JSON.stringify(arry_Category));
						
						// 전체
						var arr_yAxis = [{
								//min: 0, 
								//title: { text: '단위'},
								//labels: { overflow: 'justify' },
								title: { 
									text: '%',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[0]
										color: '#ff0000'
									}
								},
								labels: {
									enabled: false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+" %"
									},
									style: {
										//color: Highcharts.getOptions().colors[0]
										color: '#ff0000'
									}
								},
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
							},
							{	title: {
									text: '백만원',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#f79339'
									}
								},
								labels: {
									enabled: false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+" 백만원"
									},
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#f79339'
									}
								},opposite: true //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
							},
							{	title: {
									text: '',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#ffc000'
									}
								},
								labels: {
									enabled: false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+""
									},
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#ffc000'
									}
								},opposite: true //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
							},
							{	title: {
									text: '천불',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[2]
										color: '#92d050'
									}
								},
								labels: {
									enabled: false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+" 천불"
									},
									style: {
										//color: Highcharts.getOptions().colors[2]
										color: '#92d050'
									}
								},
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
						}];
						
						if(item != undefined) {
							arr_yAxis = [
								{
									title: { 
										text: '%',
										enabled: false,
										style: { }
									},
									labels: {
										// 경제성장률, 소비자물가지수
										enabled: (item == "I3401" || item == "I3404")? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" %"
										},
										style: { }
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									
									//mng_s 20220118 주석처리
									//min: (item == "I3404") ? undefined : 0, // 2019.11.04[한광희] 생활물가지수 별도 처리
									softMin: 0, //mng_s 20220118 추가
											
									visible : (item == "I3401" || item == "I3404") ? true : false
								},
								{	title: {
										text: '백만원',
										enabled: false,
										style: { }
									},
									labels: {
										// 지역내총생산
										enabled: (item == "I3402") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 백만원"
										},
										style: { }
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: (item == "I3404") ? undefined : 0, // 2019.11.04[한광희] 생활물가지수 별도 처리
									visible : (item == "I3402") ? true : false
								},
								{	title: {
										text: '',
										enabled: false,
										style: { }
									},
									labels: {
										// 생활물가지수
										enabled: (item == "I3404") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+""
										},
										style: { }
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: (item == "I3404") ? undefined : 0, // 2019.11.04[한광희] 생활물가지수 별도 처리
									visible : (item == "I3404") ? true : false
								},
								{	title: {
										//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
										text: '백만달러',
										enabled: false,
										style: { }
									},
									labels: {
										// 수출, 수입
										enabled: (item == "I3405" || item == "I3406") ? true : false,
										formatter: function () {
											//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
											return $workRoad.util.addComma(this.value)+" 백만달러"
										},
										style: { }
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: (item == "I3404") ? undefined : 0, // 2019.11.04[한광희] 생활물가지수 별도 처리
									visible : (item == "I3405" || item == "I3406") ? true : false
								}
							];
						}
						
						console.log("mainChart : " + JSON.stringify(mainChart));
						
						// 경제상황 차트 데이터 만들기
						var PC_Series = [];
						var data = [];
						var x = 1;
						var PushNm = "";	//PC_Series 에 담아줄 name
						
						if(item == undefined) {
							for(var i=0; i<$ssaEconomicSituation.ui.ssaEconomicSituationList.length; i++){
								var link_id = $ssaEconomicSituation.ui.ssaEconomicSituationList[i];
								
								/*if(i > 0){
									PC_Series.push({
										name: PushNm,
										data: data
									});
									data = [];
								}*/
								for(var j=0; j<mainChart.length; j++){
								var chart_link_id = mainChart[j].link_id;
									if(link_id == chart_link_id){
										PushNm = mainChart[j].link_nm;
										PushUnit = mainChart[j].unit_nm;
										
										for(var k=1; k<13; k++){
											if(data.length < 12){
												//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
												if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 10 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
													data.push('-');
												}else{
													data.push(parseFloat(mainChart[j]["mon"+k]));
												}
												//data.push(parseFloat(mainChart[j]["mon"+k]));
											}else{
												if(mainChart[j]["mon"+k] != 0){
													//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
													if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 10 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
														data.splice((k-1),1,'-');
													}else{
														data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
													}
													//data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
												}
											}
										}
									}
								}
								
								console.log("PushUnit : " + PushUnit);
								
								if(PushUnit == "%"){
									PC_Series.push({
										name: PushNm,
										data: data,
										tooltip: {
				                               valueSuffix: '%'
				                        }
									});
								}else if(PushUnit == "백만원"){
									PC_Series.push({
										name: PushNm,
										data: data,
										yAxis: 1,
										tooltip: {
				                               valueSuffix: '백만원'
				                        }
									});
								}else if(PushUnit == ""){
									PC_Series.push({
										name: PushNm,
										yAxis: 2,
										data: data,
										tooltip: {
				                               valueSuffix: ''
				                        }
									});
								}else if(PushUnit == "천불"){
									PC_Series.push({
										name: PushNm,
										yAxis: 3,
										data: data,
										tooltip: {
				                               valueSuffix: '천불'
				                        }
									});
								}
								
								/*
								PC_Series.push({
									name: PushNm,
									data: data
								});
								//*/
								
								data = [];
							}
						}
						else {
							var link_id = item;
							
							/*if(i > 0){
								PC_Series.push({
									name: PushNm,
									data: data
								});
								data = [];
							}*/
							for(var j=0; j<mainChart.length; j++){
							var chart_link_id = mainChart[j].link_id;
								if(link_id == chart_link_id){
									PushNm = mainChart[j].link_nm;
									PushUnit = mainChart[j].unit_nm;
									
									for(var k=1; k<13; k++){
										if(data.length < 12){
											//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
											if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 10 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
												data.push('-');
											}else{
												data.push(parseFloat(mainChart[j]["mon"+k]));
											}
											//data.push(parseFloat(mainChart[j]["mon"+k]));
										}else{
											if(mainChart[j]["mon"+k] != 0){
												//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
												if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 10 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
													data.splice((k-1),1,'-');
												}else{
													data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
												}
												//data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
											}
										}
									}
								}
							}
							
							console.log("PushUnit : " + PushUnit);
							
							//2019-01-23 (125~128) 데이터 없는거 차트에서 제거.
							var temp_arry_Category = [];
							var temp_data = [];
							var temp_flag = false;
							//data = data.reverse();
							// 앞줄 제거
							for(var i = 0; i < arry_Category.length; i++) {
								if(data.length > i) {
									var lvCategory = arry_Category[i];
									var lvData = data[i];
									if(lvData != undefined && lvData != null && lvData != "0" && lvData != "-") {
										temp_flag = true;
									}
									if(temp_flag == true) {
										temp_arry_Category.push(lvCategory);
										temp_data.push(lvData);
									}
								}
							}
							arry_Category = temp_arry_Category;
							data = temp_data;
							temp_arry_Category = [];
							temp_data = [];
							temp_flag = false;
							// 뒷줄 제거
							for(var i = (arry_Category.length-1); i >= 0; i--) {
								if(data.length > i) {
									var lvCategory = arry_Category[i];
									var lvData = data[i];
									if(lvData != undefined && lvData != null && lvData != "0" && lvData != "-") {
										temp_flag = true;
									}
									if(temp_flag == true) {
										temp_arry_Category.push(lvCategory);
										temp_data.push(lvData);
									}
								}
							}
							arry_Category = temp_arry_Category.reverse();
							data = temp_data.reverse();
							
							if(PushUnit == "%"){
								PC_Series.push({
									name: PushNm,
									data: data,
									tooltip: {
			                               valueSuffix: '%'
			                        }
								});
							}else if(PushUnit == "백만원"){
								PC_Series.push({
									name: PushNm,
									data: data,
									yAxis: 1,
									tooltip: {
			                               valueSuffix: '백만원'
			                        }
								});
							}else if(PushUnit == ""){
								PC_Series.push({
									name: PushNm,
									yAxis: 2,
									data: data,
									tooltip: {
			                               valueSuffix: ''
			                        }
								});
							}else if(PushUnit == "천불"){
								PC_Series.push({
									name: PushNm,
									yAxis: 3,
									data: data,
									tooltip: {
			                               valueSuffix: '천불'
			                        }
								});
							}
							//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. START
							else if(PushUnit == "백만달러"){
								PC_Series.push({
									name: PushNm,
									yAxis: 3,
									data: data,
									tooltip: {
			                               valueSuffix: '백만달러'
			                        }
								});
							}
							//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. END
							
							/*
							PC_Series.push({
								name: PushNm,
								data: data
							});
							//*/
							
							data = [];
						}
						
						console.log("PC_Series = " + JSON.stringify(PC_Series));
						$('#ssaEconomicSituationChartMain').highcharts({
							/*chart: {
								margin:[20,30,90,80],		// 순서 top, right, bottom, left
							    height: '300'
							},	
							showFirstLabel: false,*/
							chart: {
								//margin:[20,30,90,80],		// 순서 top, right, bottom, left
								width: '650',
								height: '240'
							},	
							showFirstLabel: false,
							//colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
							colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF'], //2018.01.11 [개발팀] 컬러수정
							tooltip: { 
								shared: true, 
								crosshairs: true,
								formatter: function () {	// 2018.12.04	ywKim	추가							
									var s = "<span>" + this.x + "</span>";	// 제목
									$.each(this.points, function() {
										s += "<br/>";
										s += "<span style='color:" + this.series.color + "'>" + this.series.name + "</span>: ";
										s += "<b style='font-family:NanumBarunGothic;'>";
										s += $workRoad.util.addComma(this.y);
										s += "</b>";
									});
									return s;
				                }
							},
							title: { text: '' },
							subtitle: { text: '' },
							exporting: { enabled: false },
							xAxis: {
								//crosshair: true,
								labels: {enabled : (item != undefined) ? true : false},
								//title: { text: '갱신주기' },
								categories: arry_Category,
								gridLineWidth: 1,
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
							},
							yAxis: arr_yAxis,
							/*plotOptions: {								
								series: {
									//allowPointSelect : true,
									//states: { },
						            cursor: 'pointer',
						            point: {
						                events: {						                	
						                    click: function (e) {						                    	
						                    	//console.log(this.series.name + " / " + this.series.index + " / " + e.currentTarget.index + " / " + e.point.series.index + " / " + this.series.data.name);
						                    	if(this.series.name.indexOf("전체") != -1){
						                    		dataParams.series = "ALL";						                    							                    	
						                    	}else{
						                    		dataParams.series = "NEW";
						                    	}	
						                    	dataParams.seriesIndex = this.series.index;
						                    	$tsMain.ui.selectedDetailPop(dataParams);									
						                    }
						                }
						            },					            				                    
						            marker: {
						                lineWidth: 1
						            }
								},
								bar: {
									dataLabels: { enabled: false }
								}
							},	*/						
							legend: { 
								enabled: (item != undefined) ? false : true,
								layout: 'vertical',
						        align: 'left',
						        verticalAlign: 'top',
//								        layout: 'vertical',
//								        align: 'right',
//								        verticalAlign: 'middle'
							},
							credits: {  enabled: false },
							series: PC_Series
							
						});
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		
		/**
		 * 
		 * @name         : addSearchBtn
		 * @description  : 조건검색버튼을 생성한다.
		 * @date         : 2018. 10. 30. 
		 * @author	     : 손원웅
		 * @history 	 :
		 */
		addSearchBtn : function() {
			var DivChkCnt = 0;
			var SearchParam = [];
			var Var_Title = "";
			var ParamLink_id = "";
			var ParamLink_Nm = "";
			var ParamCx = "";
			var ParamCx_Nm = "";
			
			/*
			I3401 :	경제성장률
			I3402 :	지역내총생산
			I3403 :	소비자물가지수
			I3404 :	설비투자지수 -> 생활물가 적용
			I3405 :	수출입 - 수출
			I3406 :	수출입 - 수입
			*/
			
			//조회버튼은 최대 10개만 가능
			//*
			//if(this.btnLimitCnt()) {
				for(var i=0; i<this.ssaEconomicSituationList.length; i++){
					var oDiv = document.getElementById(this.ssaEconomicSituationList[i]);
					console.log("oDiv.style.backgroundColor : " + oDiv.style.backgroundColor);
					if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
						switch(this.ssaEconomicSituationList[i]){
							case("E3224") : Var_Title = "고용보험 신규취득자수"; break; // 2020-07-23 [곽제욱] 고용보험 증감->고용보험 신규취득자수로 변경
							case("I3220") : Var_Title = "취업자 증감"; break;
							case("E3218") : Var_Title = "구직자"; break;
							case("E3208") : Var_Title = "구인인원"; break;
							case("I3204") : Var_Title = "축소수"; break;
							case("I3203") : Var_Title = "확장수"; break;
							case("I3207") : Var_Title = "폐업수"; break;
							case("I3206") : Var_Title = "창업수"; break;
						}
						ParamLink_id = this.ssaEconomicSituationList[i];	//Link_id 세팅(첫번째 조회조건)
						DivChkCnt++;
						for(var j=1; j<9; j++){	//_C8까지 (조건만)
							var DivID = "#"+this.ssaEconomicSituationList[i]+"_condition_C"+j;
							
							if($(DivID).css("display") == "block"){
								if(DivID.indexOf("_C1") == "-1"){
									ParamCx = $(DivID+" input[type='radio']:checked").val();	//(두번째 조회조건) 
									ParamCx_Nm = $('label[for='+$(DivID+" input[type='radio']:checked").prop("id")+']').text();	//label text
								}else{	//C1일 경우
									ParamLink_id = $(DivID+" input[type='radio']:checked").val();		//C1 있을 경우 위에서 세팅한 Link_id 값 대체(첫번째 조회조건)
									ParamLink_Nm = $('label[for='+$(DivID+" input[type='radio']:checked").prop("id")+']').text();	//label text
								}
							}
						}
					}
				}
				
				//지표 선택여부 확인
				if(DivChkCnt == 0){
					messageAlert.open("알림", "검색 하려는 지표를 선택해주세요!!");
					return;
				}
				//*/
				
				//최종 param 세팅
				this.SearchParam = {
					Title : Var_Title,
					/*SiDo : 	$("#SiDo input[type='radio']:checked").val(),
					SiDo_nm : $('label[for='+$("#SiDo input[type='radio']:checked").prop("id")+']').text(),*/
					Link_id : ParamLink_id,
					Link_nm : ParamLink_Nm,
					Cx : ParamCx,
					Cx_nm : ParamCx_Nm
				}

				$("#ssaEconomicSituation").hide();	//지표  팝업 숨김
				
				this.searchbtnCnt++;
				$ssaEconomicSituationDetailPopup.ui.show();	//검색조건 팝업 호출
			//}
		},
	};	
	
	$ssaEconomicSituation.event = {
		/**
		 * @name		 : 이벤트 바인딩 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 * 		2018.09.17	ywKim	신규
		 */
		setUIEvent: function() {
			
			// 토글버튼 클릭
			$workRoad.event.set("click", "#ssaEconomicSituation .wrmToggleBtn", function() {
				$workRoad.ui.toggleLayer("#ssaEconomicSituation");
			});
			// 닫기 버튼
			$workRoad.event.set("click", "#ssaEconomicSituation .topbar>a", function() {
				$workRoad.ui.toggleLayer("#ssaEconomicSituation");
			});		
			$workRoad.event.set("click", "#ssaEconomicSituation .indicator-stepBox label", function() {
				$workRoad.event.checkLabel($(this));
			});
		},			
	}
	
/* 지표 mouseover 정보 표출 START */
	//고용률 mouseover
	$("#ssaEconomicSituation #I3111").mouseover(function() {
		// 위치 조정
		$("#I3111_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '150px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3111_over").show();
	});
	
	$("#ssaEconomicSituation #I3111").mouseout(function() {
		$("#I3111_over").hide();
	});
	
	//실업률 mouseover
	$("#ssaEconomicSituation #I3114").mouseover(function() {
		// 위치 조정
		$("#I3114_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '200px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3114_over").show();
	});
	
	$("#ssaEconomicSituation #I3114").mouseout(function() {
		$("#I3114_over").hide();
	});
	
	//청년실업률 mouseover
	$("#ssaEconomicSituation #I3116").mouseover(function() {
		// 위치 조정
		$("#I3116_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '200px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3116_over").show();
	});
	
	$("#ssaEconomicSituation #I3116").mouseout(function() {
		$("#I3116_over").hide();
	});
	
	//취업자수 mouseover
	$("#ssaEconomicSituation #I3104").mouseover(function() {
		// 위치 조정
		$("#I3104_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '200px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3104_over").show();
	});
	
	$("#ssaEconomicSituation #I3104").mouseout(function() {
		$("#I3104_over").hide();
	});
	
	//실업자수 mouseover
	$("#ssaEconomicSituation #I3112").mouseover(function() {
		// 위치 조정
		$("#I3112_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '200px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3112_over").show();
	});
	
	$("#ssaEconomicSituation #I3112").mouseout(function() {
		$("#I3112_over").hide();
	});
	
	//비경제활동인구 mouseover
	$("#ssaEconomicSituation #I3117").mouseover(function() {
		// 위치 조정
		$("#I3117_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '200px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3117_over").show();
	});
	
	$("#ssaEconomicSituation #I3117").mouseout(function() {
		$("#I3117_over").hide();
	});
	
	//인구 mouseover
	$("#ssaEconomicSituation #I3101").mouseover(function() {
		// 위치 조정
		$("#I3101_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '200px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3101_over").show();
	});
	
	$("#ssaEconomicSituation #I3101").mouseout(function() {
		$("#I3101_over").hide();
	});
	
	///////////////////////////////////////////////// 조회 조건 클릭_시작
	//실업률
	$("#ssaEconomicSituation #I3114").click(function() {
		$("#I3114_condition_C1").show();
		$("#I3114_condition_C2").show();
	});
	
	$("#ssaEconomicSituation #I3114_condition_C1").click(function() {
		$("input[name=unemployment_rate]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3114"){	//성별
					$("#I3114_condition_C3").hide();
					$("#I3114_condition_C2").show();
				}else if($(this).val() == "I3115"){	//연령별
					$("#I3114_condition_C2").hide();
					$("#I3114_condition_C3").show();
				}
			}
		})
	});
	
	//취업자수
	$("#ssaEconomicSituation #I3104").click(function() {
		$("#I3104_condition_C1").show();
		$("#I3104_condition_C2").show();
	});
	
	$("#ssaEconomicSituation #I3104_condition_C1").click(function() {
		$("input[name=employed_person]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3104"){	//성별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==2){	//연령별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3105"){	//연령별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==3){	//연령별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3106"){	//교육정도별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==4){	//교육정도별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3107"){	//종사상지위별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==5){	//조사상지위별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3108"){	//취업시간별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==6){	//취업시간별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3109"){	//직업별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==7){	//직업별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3110"){	//산업별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==8){	//산업별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}
			}
		})
	});
	
	//실업자수
	$("#ssaEconomicSituation #I3112").click(function() {
		$("#I3112_condition_C1").show();
		$("#I3112_condition_C2").show();
	});
	
	$("#ssaEconomicSituation #I3112_condition_C1").click(function() {
		$("input[name=unemployed_person]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3112"){	//성별
					$("#I3112_condition_C3").hide();
					$("#I3112_condition_C2").show();
				}else if($(this).val() == "I3113"){	//연령별
					$("#I3112_condition_C2").hide();
					$("#I3112_condition_C3").show();
				}
			}
		})
	});
	
	//비경제활동인구
	$("#ssaEconomicSituation #I3117").click(function() {
		$("#I3117_condition_C2").show();
	});
	
	//인구
	$("#ssaEconomicSituation #I3101").click(function() {
		$("#I3101_condition_C1").show();
	});
	
	$("#ssaEconomicSituation #I3101_condition_C1").click(function() {
		$("input[name=population]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3101"){	//세대수
					$("#I3101_condition_C3").hide();
					$("#I3101_condition_C4").hide();
				}else if($(this).val() == "I3102"){	//총전입,전출,순이동,시도내,시도간(전출입)
					$("#I3101_condition_C4").hide();
					$("#I3101_condition_C3").show();
				}else if($(this).val() == "I3103"){	//이동자수,순이동자수
					$("#I3101_condition_C3").hide();
					$("#I3101_condition_C4").show();
				}
			}
		})
	});
/* 지표 mouseover 정보 표출 END */
	
}(window, document));