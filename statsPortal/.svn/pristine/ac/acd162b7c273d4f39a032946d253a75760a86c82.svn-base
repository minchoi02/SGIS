/**
 * 삶의 질 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 삶의 질 주요지표  
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
	W.$ssaLifeQuality = W.$ssaLifeQuality || {};
	
	$ssaLifeQuality.ui = {	
		pSelector  : "#ssaLifeQuality",
		/*
		E3506 : 삶에 대한 만족도
		E3505 : 소비생활만족도
		E3503 : 일자리 만족도
		E3504 : 소득 만족도
		E3502 : 상대적 빈곤율
		E3501 : 지니계수
		*/
		ssaLifeQualityList : ["E3506","E3505","E3503","E3504","E3502","E3501"],
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
			srvLogWrite('D0', '05', '05', '01', '삶의 질', '');

			$ssaLifeQuality.ui.ssaLifeQualityMainData(); //메인지표정보조회
			$ssaLifeQuality.ui.ssaLifeQualityMainChartData("E3506"); //메인차트정보조회	
			$ssaLifeQuality.ui.ChangeColor("E3506"); // 삶의 대한 만족도
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
			$workRoad.ui.toggleLayer("#ssaLifeQuality", true);
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
			$workRoad.ui.hideLayer('#ssaLifeQuality');
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
					$("#ssaLifeQuality #ssaStatNm").html(statNm);
					$("#ssaLifeQuality #ssaTitle").html(title);					// 제목
					$("#ssaLifeQuality #ssaExp").html(data.stat_exp);				// 설명
					$("#ssaLifeQuality #ssaOrigin").html(data.colct_source);		// 출처
					 */
					/** 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 주석처리 END */
					
					console.log("ChangeColor - DataInfo data : " + JSON.stringify(data));
				}, function(err) {
					alert(err);
			});
			
			for(var i=0; i<this.ssaLifeQualityList.length; i++){
				if(this.ssaLifeQualityList[i] == item){
					var oDiv = document.getElementById(item);
				    oDiv.style.backgroundColor = "#00C6ED";
				    
				    if(item == "I3104" || item == "I3112"){
				    	empCnt++;
				    }
				}else{
					var oDiv = document.getElementById(this.ssaLifeQualityList[i]);
				    oDiv.style.backgroundColor = "#FFFFFF";
				}
			}
			
			if(empCnt == 0){
				document.getElementById("emp").style.backgroundColor = "#FFFFFF";
			}else{
				document.getElementById("emp").style.backgroundColor = "#00C6ED";
			}
			
			this.ChangeCondition(item);	//일자리현황 조회 조건 변경
			this.ssaLifeQualityMainChartData(item);
		},
		
		/**
		 * @name         : DetailInfo
		 * @description  : 일자리통계분석 > 일자리현황 > 지표 설명 정보 팝업 호출로 인한 추가
		 * @date         : 2019.05.17
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		DetailInfo : function(item, statNm, stat_exp, colct_source) {
			var left = parseInt($("#ssaLifeQuality").css("left"));
			var top = parseInt($("#ssaLifeQuality").css("top"));
			var width = parseInt($("#ssaLifeQuality").css("width"));
			
			$("#ssaDetailInfoPopup #ssaTitle").html(statNm);			// 제목
			$("#ssaDetailInfoPopup #ssaExp").html(stat_exp);			// 설명
			$("#ssaDetailInfoPopup #ssaOrigin").html(colct_source);		// 출처
			
			if (item == 'E3506') {	// 삶에 대한 만족도
				left = left + 170 - $workRoad.ui.coordX;
				top = top + 58 - $workRoad.ui.coordY;
			} else if (item == 'E3505') {	// 소비생활만족도
				left = left + 170 - $workRoad.ui.coordX;
				top = top + 100 - $workRoad.ui.coordY;
			} else if (item == 'E3503') {	// 일자리만족도
				left = left + 160 - $workRoad.ui.coordX;
				top = top + 143 - $workRoad.ui.coordY;
			} else if (item == 'E3504') {	// 소득만족도
				left = left + 155 - $workRoad.ui.coordX;
				top = top + 187 - $workRoad.ui.coordY;
			} else if (item == 'E3502') {	// 상대적빈곤율
				left = left + 160 - $workRoad.ui.coordX;
				top = top + 230 - $workRoad.ui.coordY;
			} else if (item == 'E3501') {	// 지니계수
				left = left + 150 - $workRoad.ui.coordX;
				top = top + 272 - $workRoad.ui.coordY;
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
			srvLogWrite('D0', '05', '05', '02', '', 'Link_id='+item);
			
			
			for(var i=0; i<this.ssaLifeQualityList.length; i++){
				if(this.ssaLifeQualityList[i] == item){
					for(var j=1; j<11; j++){	//_C10까지 있음
						if(j == 1){	//기본 서브 조건
							var DivShow = "#ssaLifeQuality #"+item+"_condition_C"+j;
							$(DivShow).show();
							
							$('input:radio[name="ssaLQ_condition_map_type"]').eq(0).prop("checked", true);	//지도 표출 방식 선택
							
							switch(item){
								case("I3114") : $('input:radio[name="unemployment_rate"]').eq(0).prop("checked", true);	//실업률
								case("I3104") : $('input:radio[name="employed_person"]').eq(0).prop("checked", true);	//취업자수
								case("I3112") : $('input:radio[name="unemployed_person"]').eq(0).prop("checked", true);	//실업자수
								case("I3101") : $('input:radio[name="population"]').eq(0).prop("checked", true);	//인구
							}
						}else if(j > 8){	//타이틀 설명
							var DivShow = "#ssaLifeQuality #"+item+"_condition_C"+j;
							$(DivShow).show();
						}
					}
				}else{
					for(var j=1; j<11; j++){	//_C10까지 있음
						var DivHide = "#ssaLifeQuality #"+this.ssaLifeQualityList[i]+"_condition_C"+j;
						$(DivHide).hide();
					}
				}
			}
			
		},
/* ************************
 * 지표 관련 함수 END   * 
 * ************************/		
		/**
		 * @name         : ssaLifeQualityMainData
		 * @description  : 일자리통계분석(삶의질_지표)
		 * @date         : 2018. 10. 23. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		ssaLifeQualityMainData : function(){
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsLifeQualityMain.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						/*
						E3506 : 삶에 대한 만족도
						E3505 : 소비생활만족도
						E3503 : 일자리 만족도
						E3504 : 소득 만족도
						E3502 : 상대적 빈곤율
						E3501 : 지니계수
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
							var updt_cycle_html = "<span ";
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
							var tooltipVal = "";
							var statNm = "";		// 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
							var colct_source = "";	// 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
							
							//툴팁정보조회
							$workRoad.ui.selectJobStatsDataInfo(link_ID
								, function(data) {
									tooltipVal = data.stat_exp.replace(/[']/g,"&quot;");	// 2019.05.29[한광희] 지표설명 popup 호출시 해당 정보에 ' 표시 오류로 인한 수정:replace를 통해 ' → &quot;로 변경
									statNm = data.stat_nm;				// 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
									colct_source = data.colct_source;	// 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
									
									console.log("ssaLifeQualityMainData - DataInfo tooltipVal : " + JSON.stringify(tooltipVal));
								}, function(err) {
									alert(err);
							});
														
							//20181214 손원웅_증감 툴팁 세팅 추가
							var idaSubj = "";
							var idaTitle = "";
							
							// 2019.11.04[한광희] 단위 null 일 경우 공백 처리
							if(unit_Nm == null ) {
								unit_Nm = '';
							}
							
							if(result.iconClass == "up"){
									//연도
								idaSubj = "전 연도 대비 ";
								idaTitle = result.iconValue + unit_Nm + " 증가";
							}else if(result.iconClass == "down"){
									//연도
								idaSubj = "전 연도 대비 ";
								idaTitle = result.iconValue + unit_Nm + " 감소";
							}
							
							if(link_ID == 'I3405' || link_ID == 'I3406'){	//수출입-수출, 수출입-수입 표출부분	
								$('td[id='+link_ID+'] *').remove();

								//listElement += '<dl> <dt>' + link_Nm + '</dt>';
								/** 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								// listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ssaLifeQuality ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaLifeQuality.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaLifeQuality job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
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
								/** 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								// listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaLifeQuality.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.29[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaLifeQuality job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
								listElement += '</dl>';
								listElement += '</td>';
								listElement += '</tr>';
								listElement += '</tbody>';
								listElement += '</table>';
								listElement += '</div>';
								$('div[id='+link_ID+']').append(listElement);
								
								listElement = '<ul>';
							}
							
							$('#ssaLifeQuality #'+link_ID+'_apc').attr('data-val', result.iconText);
							$('#ssaLifeQuality #'+link_ID+'_apc').attr('data-subj', idaSubj);
							$('#ssaLifeQuality #'+link_ID+'_apc').attr('title', idaTitle);
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
		 * @name         : ssaLifeQualityMainChartData
		 * @description  : 일자리통계분석(삶의질 차트)
		 * @date         : 2018. 10. 23. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		ssaLifeQualityMainChartData : function(item){
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsLifeQualityMainChart.json",
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
						this.Category = res.result.yearCategory;
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
								text: '점',
								enabled: false,
								style: {
									//color: Highcharts.getOptions().colors[1]
									color: '#f79339'
								}
							},
							labels: {
								enabled: false,
								formatter: function () {
									return $workRoad.util.addComma(this.value)+" 점"
								},
								style: {
									//color: Highcharts.getOptions().colors[1]
									color: '#f79339'
								}
							},opposite: true //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
						},
						{	title: {
								text: '계수',
								enabled: false,
								style: {
									//color: Highcharts.getOptions().colors[1]
									color: '#ffc000'
								}
							},
							labels: {
								enabled: false,
								formatter: function () {
									return $workRoad.util.addComma(this.value)+" 계수"
								},
								style: {
									//color: Highcharts.getOptions().colors[1]
									color: '#ffc000'
								}
							},opposite: true //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
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
										//소비생활만족도, 일자리만족도, 소득만족도, 상대적빈곤율
										enabled: (item == "E3505" || item == "E3503" || item == "E3504" || item == "E3502") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" %"
										},
										style: { }
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "E3505" || item == "E3503" || item == "E3504" || item == "E3502") ? true : false
								},
								{	title: {
										text: '점',
										enabled: false,
										style: { }
									},
									labels: {
										//삶의 대한 만족도
										enabled: (item == "E3506") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 점"
										},
										style: { }
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "E3506") ? true : false
								},
								{	title: {
										text: '계수',
										enabled: false,
										style: { }
									},
									labels: {
										//지니계수
										enabled: (item == "E3501") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 계수"
										},
										style: { }
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "E3501") ? true : false
								}
							];
						}
						
						console.log("mainChart : " + JSON.stringify(mainChart));
						
						// 일자리현황 차트 데이터 만들기
						var PC_Series = [];
						var data = [];
						var x = 1;
						var PushNm = "";	//PC_Series 에 담아줄 name
						if(item == undefined) {
							for(var i=0; i<$ssaLifeQuality.ui.ssaLifeQualityList.length; i++) {
								var link_id = $ssaLifeQuality.ui.ssaLifeQualityList[i];
								
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
												if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
													data.push('-');
												}else{
													data.push(parseFloat(mainChart[j]["mon"+k]));
												}
												//data.push(parseFloat(mainChart[j]["mon"+k]));
											}else{
												if(mainChart[j]["mon"+k] != 0){
													//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
													if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
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
								}else if(PushUnit == "점"){
									PC_Series.push({
										name: PushNm,
										data: data,
										yAxis: 1,
										tooltip: {
				                               valueSuffix: '점'
				                        }
									});
								}else if(PushUnit == "계수"){
									PC_Series.push({
										name: PushNm,
										yAxis: 2,
										data: data,
										tooltip: {
				                               valueSuffix: '계수'
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
											if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
												data.push('-');
											}else{
												data.push(parseFloat(mainChart[j]["mon"+k]));
											}
											//data.push(parseFloat(mainChart[j]["mon"+k]));
										}else{
											if(mainChart[j]["mon"+k] != 0){
												//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
												if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
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
//									20190319 손원웅 추가
									temp_flag = false;
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
//									20190319 손원웅 추가
									temp_flag = false;
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
							}else if(PushUnit == "점"){
								PC_Series.push({
									name: PushNm,
									data: data,
									yAxis: 1,
									tooltip: {
			                               valueSuffix: '점'
			                        }
								});
							}else if(PushUnit == "계수"){
								PC_Series.push({
									name: PushNm,
									yAxis: 2,
									data: data,
									tooltip: {
			                               valueSuffix: '계수'
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
						
						console.log("PC_Series = " + JSON.stringify(PC_Series));
						$('#ssaLifeQualityChartMain').highcharts({
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
//										        layout: 'vertical',
//										        align: 'right',
//										        verticalAlign: 'middle'
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
				for(var i=0; i<this.ssaLifeQualityList.length; i++){
					var oDiv = document.getElementById(this.ssaLifeQualityList[i]);
					console.log("oDiv.style.backgroundColor : " + oDiv.style.backgroundColor);
					if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
						switch(this.ssaLifeQualityList[i]){
							case("E3506") : Var_Title = "삶에 대한 만족도"; break;
							case("E3505") : Var_Title = "소비생활만족도"; break;
							case("E3503") : Var_Title = "일자리 만족도"; break;
							case("E3504") : Var_Title = "소득 만족도"; break;
							case("E3502") : Var_Title = "상대적 빈곤율"; break;
							case("E3501") : Var_Title = "지니계수"; break;
						}
						ParamLink_id = this.ssaLifeQualityList[i];	//Link_id 세팅(첫번째 조회조건)
						DivChkCnt++;
						for(var j=1; j<9; j++){	//_C8까지 (조건만)
							var DivID = "#"+this.ssaLifeQualityList[i]+"_condition_C"+j;
							
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

				$("#ssaLifeQuality").hide();	//지표  팝업 숨김
				
				this.searchbtnCnt++;
				$ssaLifeQualityDetailPopup.ui.show();	//검색조건 팝업 호출
				$ssaDataBoard.ui.toggleDataboard(true);				
			//}
		},
		
		/**
		 * 
		 * @name         : btnLimitCnt
		 * @description  : 버튼갯수 
		 * @date         : 2015. 10. 23. 
		 * @author	     : 김성현
		 * @history 	 :
		 * @param
		 */
		btnLimitCnt : function() {
			var cnt = $("#ssaLifeQualityDetailPopup #searchBtnResultRgn").find("li:visible").length;
			if(cnt > 9) {
				messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
				return false;
			}
			return true;
		},
	};	
	
	$ssaLifeQuality.event = {
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
			$workRoad.event.set("click", "#ssaLifeQuality .wrmToggleBtn", function() {
				$workRoad.ui.toggleLayer("#ssaLifeQuality");
			});
			// 닫기 버튼
			$workRoad.event.set("click", "#ssaLifeQuality .topbar>a", function() {
				$workRoad.ui.toggleLayer("#ssaLifeQuality");
			});		
			$workRoad.event.set("click", "#ssaLifeQuality .indicator-stepBox label", function() {
				$workRoad.event.checkLabel($(this));
			});
		},			
	}
	
}(window, document));