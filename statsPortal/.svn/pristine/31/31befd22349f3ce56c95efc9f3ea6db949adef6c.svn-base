/**
 * 오늘의 구인 현황 메인 스크립트
 * 경로 : 일자리 맵 서비스 > 오늘의 구인 현황 > 
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
	W.$ssaJobQuality = W.$ssaJobQuality || {};
	
	$ssaJobQuality.ui = {
		sampleVar1 : null,			// 샘플 변수 1
		sampleVar2 : "",			// 샘플 변수 2
		sampleVar3 : [],			// 샘플 변수 3	
		pSelector  : "#ssaJobQuality",
		/*
		E3309   : 산업재해 전체 재해율
		I3308   : 사회보험 가입률
		E3307   : 총 근로시간
		I3306   : 비정규직 - 근로자 수
		I3306_1 : 비정규직 - 근로자 비율
		E3303   : 임금상승률 // 2020-05-21 [곽제욱] 저임금 근로자 비율 -> 임금상승률 로 변경
		E3301   : 월임금총액
		*/
		ssaJobQualityList : ["E3309", "I3308", "E3307", "I3306", "I3306_1", "E3303", "E3301"],
		searchbtnCnt : 0,
		SearchParam : [],
		MapType : "",
		Category : [],		//차트 데이터
		
		noReverseGeoCode : true,
		defaultSidoCd : "99",//기본 시도 코드 : 99:전체
		defaultSggCd : null,//기본 시군구 코드
		arrParamList : new Array(), // 조회된 파라미터 정보배열     //2017.09.06 [개발팀] 조회기능추가
		dataList : [],
		defaultDetailType : "ALL-COR",	//기본 차트 종류(ALL-COR, ALL-PSN, NEW-COR, NEW-PSN)
		
		
		/**
		 * @name         : ready
		 * @description  : 최초 화면 Open할때 실행 / 메뉴 선택 시점
		 * @date         : 2018.11.20
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		ready : function() {
			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '05', '03', '01', '일자리 질', '');

			$ssaJobQuality.ui.ssaJobQualityMainData();
			$ssaJobQuality.ui.ssaJobQualityMainChartData("E3309");
			$ssaJobQuality.ui.ChangeColor("E3309");	
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
			$workRoad.ui.showLayer('#ssaJobQuality');
			$workRoad.ui.toggleLayer("#ssaJobQuality", true);
			// 시도 선택
			//var sido_cd = this.defaultSidoCd;
			//var sgg_cd = this.defaultSggCd;
			//this.getSidoList("current", sido_cd, sgg_cd, function() {	});
			
			// 일자리질 > 메인 조회
			//this.ssaJobQualityMain();
			// 일자리질 > 메인 차트 데이터 조회
			//this.ssaJobQualityMainChart();
			// map 데이터 조회
			//$ssaMap.ui.getFirstMapDataLoad(null,null);
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
			$workRoad.ui.hideLayer('#ssaJobQuality');
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
			var itemInfo = "";
			
//			20190318 손원웅 수정
//			if(item == "I3306_1"){
//				itemInfo = "I3306";
//			}else{
//				itemInfo = item;
//			}
			if(item == "I3306_1"){
				itemInfo = "I3306";
			}else if(item == "I3306"){
				itemInfo = "I3305";
			}else{
				itemInfo = item;
			}
			
			
			//지표정보조회
			$workRoad.ui.selectJobStatsDataInfo(itemInfo
				, function(data) {

					//mng_s 20190319 이금은
					var statNm = data.stat_nm;
					var title = data.stat_nm;
					//mng_e 20190319 이금은
					
					//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
					
					/** 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 주석처리 START */
					/*
					$("#ssaJobQuality #ssaStatNm").html(statNm);
					$("#ssaJobQuality #ssaTitle").html(title);					// 제목
					$("#ssaJobQuality #ssaExp").html(data.stat_exp);			// 설명
					$("#ssaJobQuality #ssaOrigin").html(data.colct_source);		// 출처
					 */
					/** 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 주석처리 END */
					
					console.log("ChangeColor - DataInfo data : " + JSON.stringify(data));
				}, function(err) {
					alert(err);
			});
			
			for(var i=0; i<this.ssaJobQualityList.length; i++){
				if(this.ssaJobQualityList[i] == item){
					var oDiv = document.getElementById(item);
				    oDiv.style.backgroundColor = "#00C6ED";
				    
				    if(item == "I3306" || item == "I3306_1"){
				    	empCnt++;
				    }
				}else{
					var oDiv = document.getElementById(this.ssaJobQualityList[i]);
				    oDiv.style.backgroundColor = "#FFFFFF";
				}
			}
			
			if(empCnt == 0){
				document.getElementById("emp").style.backgroundColor = "#FFFFFF";
			}else{
				document.getElementById("emp").style.backgroundColor = "#00C6ED";
			}
			
			this.ChangeCondition(item);	//일자리현황 조회 조건 변경
			this.ssaJobQualityMainChartData(item);
		},	
		
		/**
		 * @name         : DetailInfo
		 * @description  : 일자리통계분석 > 일자리 질 > 지표 설명 정보 팝업 호출로 인한 추가
		 * @date         : 2019.05.17
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		DetailInfo : function(item, statNm, stat_exp, colct_source) {
			var left = parseInt($("#ssaJobQuality").css("left"));
			var top = parseInt($("#ssaJobQuality").css("top"));
			var width = parseInt($("#ssaJobQuality").css("width"));
			
			$("#ssaDetailInfoPopup #ssaTitle").html(statNm);			// 제목
			$("#ssaDetailInfoPopup #ssaExp").html(stat_exp);			// 설명
			$("#ssaDetailInfoPopup #ssaOrigin").html(colct_source);		// 출처
			
			if (item == 'E3309') {	// 산업재해 전체 재해율
				left = left + 180 - $workRoad.ui.coordX;
				top = top + 58 - $workRoad.ui.coordY;
			} else if (item == 'I3308') {	// 고용보험 가입률
				left = left + 165 - $workRoad.ui.coordX;
				top = top + 100 - $workRoad.ui.coordY;
			} else if (item == 'E3307') {	// 총 근로시간
				left = left + 155 - $workRoad.ui.coordX;
				top = top + 143 - $workRoad.ui.coordY;
			} else if (item == 'I3306') {	// 비정규직 > 근로자수
				left = left + 205 - $workRoad.ui.coordX;
				top = top + 187 - $workRoad.ui.coordY;
			} else if (item == 'I3306_1') {	// 비정규직 > 근로자 비율
				left = left + 210 - $workRoad.ui.coordX;
				top = top + 230 - $workRoad.ui.coordY;
			} else if (item == 'E3303') {	// 저임금 근로자 비율
				left = left + 175 - $workRoad.ui.coordX;
				top = top + 272 - $workRoad.ui.coordY;
			} else if (item == 'E3301') {	// 평균임금총액
				left = left + 160 - $workRoad.ui.coordX;
				top = top + 315 - $workRoad.ui.coordY;
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
			srvLogWrite('D0', '05', '03', '02', '', 'Link_id='+item);


			for(var i=0; i<this.ssaJobQualityList.length; i++){
				if(this.ssaJobQualityList[i] == item){
					for(var j=1; j<11; j++){	//_C10까지 있음
						if(j == 1){	//기본 서브 조건
							var DivShow = "#ssaJobQuality #"+item+"_condition_C"+j;
							$(DivShow).show();
							
							$('input:radio[name="ssaJQ_condition_map_type"]').eq(0).prop("checked", true); //지도 표출 방식 선택
							
							/*switch(item){
								case("I3114") : $('input:radio[name="unemployment_rate"]').eq(0).prop("checked", true); break;	//실업률
								case("I3104") : $('input:radio[name="employed_person"]').eq(0).prop("checked", true); break;	//취업자수
								case("I3112") : $('input:radio[name="unemployed_person"]').eq(0).prop("checked", true); break;	//실업자수
								case("I3101") : $('input:radio[name="population"]').eq(0).prop("checked", true); break;	//인구
							}*/
						}else if(j > 8){	//타이틀 설명
							var DivShow = "#ssaJobQuality #"+item+"_condition_C"+j;
							$(DivShow).show();
						}
					}
				}else{
					for(var j=1; j<11; j++){	//_C10까지 있음
						var DivHide = "#ssaJobQuality #"+this.ssaJobQualityList[i]+"_condition_C"+j;
						$(DivHide).hide();
					}
				}
			}
		},
/* ************************
 * 지표 관련 함수 END   * 
 * ************************/		
		/**
		 * @name         : 샘플 함수
		 * @description  : 샘플 함수입니다.
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.17	ywKim	신규
		 * @param id     : 아이디
		 * @param seq    : 순번
		 */
		sampleFunc : function(id, seq) {
			
		},
		
		/**
		 * @name         : ssaJobQualityMain
		 * @description  : 일자리질 조회
		 * @date         : 2018.10.01
		 * @author	     : 현재훈
		 * @param        : adm_cd - 시도/시군군 코드
		 * @history 	 : 
		 * 		2018.09.17	ywKim	신규
		 */
/*		ssaJobQualityMain : function (adm_cd) {
			var dataParams = {};
			dataParams.today = "20180628";						
			dataParams.sido_cd = "99";
			dataParams.sgg_cd = "999";
			
			if (adm_cd != 00 && adm_cd != undefined && adm_cd != null) {				
				switch(adm_cd.length) {
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
			}
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsJobQualityMain.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				data: "",
				success: function(res) {
					if (res.errCd == 0) {
						var ssaJobQualityMain = res.result;
						
						$(".iatcTableMain tbody").empty();
						
//									"	<td>" + techCdList[i].s_class_cd + "</td>" +
						for(var i=0; i<ssaJobQualityMain.length; i++){
							$(".iatcTableMain tbody").append(
									"<tr>" +
									"	<td> 산업재해  전체 재해율 </td>" +
									"	<td>" +  ssaJobQualityMain[i].dt_1 + " / " + ssaJobQualityMain[i].unit_nm_1 + "</td>" +
									"</tr>" +
									"<tr>" +
									"	<td> 사회보험 가입률 </td>" +
									"	<td>" +  ssaJobQualityMain[i].dt_2 + " / " + ssaJobQualityMain[i].unit_nm_2 + "</td>" +
									"</tr>" +
									"<tr>" +
									"	<td> 총 근로시간 </td>" +
									"	<td>" +  ssaJobQualityMain[i].dt_3 + " / " + ssaJobQualityMain[i].unit_nm_3 + "</td>" +
									"</tr>" +
									"<tr>" +
									"	<td> 근로자 수 </td>"                     +
									"	<td>" +  ssaJobQualityMain[i].dt_4 + " / " + ssaJobQualityMain[i].unit_nm_4 + "</td>" +
									"</tr>" +
									"<tr>" +
									"	<td> 근로자 비율 </td>" +
									"	<td>" +  ssaJobQualityMain[i].dt_5 + " / " + ssaJobQualityMain[i].unit_nm_5 + "</td>" +
									"</tr>" +
									"<tr>" +
									"	<td> 저 임금 근로자 비율 </td>" +
									"	<td>" +  ssaJobQualityMain[i].dt_6 + " / " + ssaJobQualityMain[i].unit_nm_6 + "</td>" +
									"</tr>" +									
									"<tr>" +
									"	<td> 월임금총액 </td>" +
									"	<td>" +  ssaJobQualityMain[i].dt_7 + " / " + ssaJobQualityMain[i].unit_nm_7 + "</td>" +
									"</tr>" 
							);
						}
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
			
			
		},*/
		
		/**
		 * @name         : ssaJobQualityMainChart
		 * @description  : 일자리질 차트조회
		 * @date         : 2018. 10. 01. 
		 * @author	     : 현재훈
		 * @history 	 :
		 * @param today
		 */
		/*
		ssaJobQualityMainChart : function(adm_cd){
			var dataParams = {};
			dataParams.today = "20180628";						
			dataParams.sido_cd = "99";
			dataParams.sgg_cd = "999";
			
			if (adm_cd != 00 && adm_cd != undefined && adm_cd != null) {				
				switch(adm_cd.length) {
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
			}	
			dataParams.search_type = "none";
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsJobQualityMainChart.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				data: "",
				success: function(res) {
					if(res.errCd == 0){

						var introData = res.result;		// 리턴데이터						
						var x_category = "1";						
						var techbizRatio = $.pick(introData, {x_category: x_category}); // 종류 체크를 위해 각 1row 추출
						var techbizIncrease = []; // 중분류별, 일자별 구인건수 비율 
						var techbizIncreaseRatio = []; // 중분류별 일자별 구인 증감률
						var categories = [];
						var tmpCategories = [];
						var tmpDay = "";
						
						// 중분류별, 일자별 구인건수 데이터 (건수 및 증감)
						for(var i=0; i<techbizRatio.length; i++){
							var m_class_cd = techbizRatio[i].rank;
							var m_class_nm = techbizRatio[i].itm_nm;							
							
							var temp_per = { m_class_cd: m_class_cd, m_class_nm: m_class_nm };	// key: value
							var temp_irds = { m_class_cd: m_class_cd, m_class_nm: m_class_nm };
															
							if(r = $.pick(introData, {rank: m_class_cd})){
								temp_per[k] = parseFloat(r.dt || 0);
								temp_irds[k] = parseFloat(r.dt || 0);
								//if(i == 0) categories.push(k);
							}
							
							techbizIncrease.push(temp_per);
							techbizIncreaseRatio.push(temp_irds);							
						}
						
						
						// 사업체 증감률 (line)
						var lineSeries = [];
						var data = [];
						for(var i=0; i<techbizIncreaseRatio.length; i++){
							data = [];
							for(var k=0; k<categories.length; k++){
								data.push(parseFloat(techbizIncreaseRatio[i][categories[k]]));
							}
							lineSeries.push({
								name: techbizIncreaseRatio[i].m_class_nm,
								data: data
							});
						}						
						
						$('#iaChartBoxMain').highcharts({
							chart: {
								margin:[20,30,90,80],		// 순서 top, right, bottom, left
							    height: '300'
							},	
							showFirstLabel: false,
							colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
							tooltip: { shared: true, crosshairs: true },
							title: { text: '' },
							subtitle: { text: '' },
							exporting: { enabled: false },
							xAxis: {
								categories: '',
								title: { text: '' }
							},
							yAxis: {
								min: 0, 
								title: { text: ''},
								labels: { overflow: 'justify' },
							}, 
							plotOptions: {								
								series: {
									//allowPointSelect : true,
									//states: { },
						            cursor: 'pointer',
						            point: {
						                events: {						                	
						                    click: function (e) {						                    	
						                    	
						                    								
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
							},							
							legend: { 
								//enabled: true,
						        align: 'center',
						        verticalAlign: 'bottom',
						        borderWidth: 0
//						        layout: 'vertical',
//						        align: 'right',
//						        verticalAlign: 'middle'
							},
							//credits: {  enabled: false },
							series: lineSeries
							
						});
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},*/
		
		/**
		 * @name         : ssaJobQualityMainData
		 * @description  : 일자리질 조회
		 * @date         : 2018.10.01
		 * @author	     : 현재훈
		 * @param        : adm_cd - 시도/시군군 코드
		 * @history 	 : 
		 * 		2018.09.17	ywKim	신규
		 */
		ssaJobQualityMainData : function () {
			/*
			var dataParams = {};
			dataParams.today = "20180628";						
			dataParams.sido_cd = "99";
			dataParams.sgg_cd = "999";
			
			if (adm_cd != 00 && adm_cd != undefined && adm_cd != null) {				
				switch(adm_cd.length) {
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
			}
			//*/
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsJobQualityMain.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				data: "",
				success: function(res) {
					if (res.errCd == 0) {
						//var ssaJobQualityMain = res.result;
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
							//2019-01-25 월 표시 => 년 표시로 수정.
							if(link_ID == "I3308") updt_cycle = "년";
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
//							var result = $workRoad.util.toNumberString(Val, {points: [0.1,3.1,6.1], units: [unit_Nm,"천호","백만호"]});
							var tooltipVal = "";
							var statNm = "";		// 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
							var colct_source = "";	// 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
							
							var item = link_ID; //비정규직-근로자 비율은 근로자 수와 같은 link_id를 이용하기 때문에 다른 변수를 선언해서 툴팁정보를 조회한다.
							
							if(item == "I3306_1"){
								item = "I3306";
							}else{
								item = item;
							}
							
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
							
							//툴팁정보조회
							$workRoad.ui.selectJobStatsDataInfo(item
								, function(data) {
									tooltipVal = data.stat_exp;
									statNm = data.stat_nm;				// 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
									colct_source = data.colct_source;	// 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
									
									console.log("ssaJobQualityMainData - DataInfo tooltipVal : " + JSON.stringify(tooltipVal));
								}, function(err) {
									alert(err);
							});
							
							if(link_ID == 'I3306' || link_ID == 'I3306_1'){	//수출입-수출, 수출입-수입 표출부분	
								$('td[id='+link_ID+'] *').remove();

								//listElement += '<dl> <dt>' + link_Nm + '</dt>';
								/** 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								//listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaJobQuality.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaJobQuality job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
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
								/** 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								//listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaJobQuality.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.24[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaJobQuality job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
								listElement += '</dl>';
								listElement += '</td>';
								listElement += '</tr>';
								listElement += '</tbody>';
								listElement += '</table>';
								listElement += '</div>';
								$('div[id='+link_ID+']').append(listElement);
								
								listElement = '<ul>';
							}
							
							$('#ssaJobQuality #'+link_ID+'_apc').attr('data-val', result.iconText);
							$('#ssaJobQuality #'+link_ID+'_apc').attr('data-subj', idaSubj);
							$('#ssaJobQuality #'+link_ID+'_apc').attr('title', idaTitle);
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
		 * @name         : ssaJobQualityMainChartData
		 * @description  : 일자리질 차트조회
		 * @date         : 2018. 10. 01. 
		 * @author	     : 현재훈
		 * @history 	 :
		 * @param today
		 */
		ssaJobQualityMainChartData : function(item){
			/*
			var dataParams = {};
			dataParams.today = "20180628";						
			dataParams.sido_cd = "99";
			dataParams.sgg_cd = "999";
			
			if (adm_cd != 00 && adm_cd != undefined && adm_cd != null) {				
				switch(adm_cd.length) {
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
			}	
			dataParams.search_type = "none";
			//*/
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsJobQualityMainChart.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				data: "",
				success: function(res) {
					if(res.errCd == 0){
						/*
						E3309   : 산업재해 전체 재해율
						I3308   : 사회보험 가입률
						E3307   : 총 근로시간
						I3306   : 비정규직 - 근로자 수
						I3306_1 : 비정규직 - 근로자 비율
						E3303   : 저 임금 근로자 비율
						E3301   : 월임금총액
						*/

						var mainChart = res.result.mainChart;
						//데이터에 따른 카테고리 설정
						//2019-01-25 월 표시 => 년 표시로 수정.
						/*if(item == "I3308" || item == "I3306" || item == "I3306_1"){
							this.Category = res.result.yearAndMonthCategory; //201808, 201708, 201608 ...
						}else{
							this.Category = res.result.yearCategory; //2018, 2017, 2016 ...
						}*/
						this.Category = res.result.yearCategory; //2018, 2017, 2016 ...
						
						
						console.log("mainChart : " + JSON.stringify(mainChart));
						
						// 일자리현황 차트 데이터 만들기
						var PC_Series = [];
						var data = [];
						var x = 1;
						var PushNm = "";	//PC_Series 에 담아줄 name
						var PushUnit = "";
						var arry_Category = [this.Category[0].mon0
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
						                     ,this.Category[0].mon11];
						console.log("arry_Category : " + JSON.stringify(arry_Category));
						//var arr_yAxis = [];
						//if(item == undefined){
							var	arr_yAxis = [{
								//min: 0, 
								//title: { text: '단위'},
								//labels: { overflow: 'justify' },
								title: { 
									text: '%',
									enabled: false,
									style: {}
								},
								labels: {
									enabled: (item == "E3309" || item == "I3306_1" || item == "E3303") ? true : false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+" %"
									},
									style: {}
								},
								lineWidth: 1,
						        lineColor: "#000000",
						        tickWidth: 0,
								min: 0,
								visible : (item == "E3309" || item == "I3306_1" || item == "E3303") ? true : false
							},
							{	title: {
									text: '%%p',
									enabled: false,
									style: {}
								},
								labels: {
									enabled: (item == "I3308") ? true : false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+" %%p"
									},
									style: {}
								},
								lineWidth: 1,
						        lineColor: "#000000",
						        tickWidth: 0,
								min: 0,
								visible : (item == "I3308") ? true : false
							},
							{	title: {
									text: '시간',
									enabled: false,
									style: {}
								},
								labels: {
									enabled: (item == "E3307") ? true : false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+" 시간"
									},
									style: {}
								},
								lineWidth: 1,
						        lineColor: "#000000",
						        tickWidth: 0,
								min: 0,
								visible : (item == "E3307") ? true : false
							},
							{	title: {
									text: '천명',
									enabled: false,
									style: {}
								},
								labels: {
									enabled: (item == "I3306") ? true : false,
									formatter: function () {
										return $workRoad.util.addComma(this.value)+" 천명"
									},
									style: {}
								},
								lineWidth: 1,
						        lineColor: "#000000",
						        tickWidth: 0,
								min: 0,
								visible : (item == "I3306") ? true : false
							},
							{	title: {
								//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 START
									text: '원',
								//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 END
									enabled: false,
									style: {}
								},
								labels: {
									enabled: (item == "E3301") ? true : false,
									formatter: function () {
										//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 START
										return $workRoad.util.addComma(this.value)+" 원"
										//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 END
									},
									style: {}
								},
								lineWidth: 1,
						        lineColor: "#000000",
						        tickWidth: 0,
								min: 0,
								visible : (item == "E3301") ? true : false
						}];
						//}
						
						if(item == undefined){
							for(var i=0; i<$ssaJobQuality.ui.ssaJobQualityList.length; i++){
								var link_id = $ssaJobQuality.ui.ssaJobQualityList[i];
								
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
								}else if(PushUnit == "%%p"){
									PC_Series.push({
										name: PushNm,
										data: data,
										yAxis: 1,
										tooltip: {
				                               valueSuffix: '%%p'
				                        }
									});
								}else if(PushUnit == "시간"){
									PC_Series.push({
										name: PushNm,
										yAxis: 2,
										data: data,
										tooltip: {
				                               valueSuffix: '시간'
				                        }
									});
								}else if(PushUnit == "천명"){
									PC_Series.push({
										name: PushNm,
										yAxis: 3,
										data: data,
										tooltip: {
				                               valueSuffix: '천명'
				                        }
									});
								//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 START
								}else if(PushUnit == "원"){
								//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 END
									PC_Series.push({
										name: PushNm,
										yAxis: 4,
										data: data,
										tooltip: {
											   //2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 START
				                               valueSuffix: '원'
				                               //2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 END
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
						}else{
							var link_id = item;
							
							//for(var i=0; i<$ssaJobQuality.ui.ssaJobQualityList.length; i++){
							//	var link_id = $ssaJobQuality.ui.ssaJobQualityList[i];
								
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
								}else if(PushUnit == "%%p"){
									PC_Series.push({
										name: PushNm,
										data: data,
										yAxis: 1,
										tooltip: {
				                               valueSuffix: '%%p'
				                        }
									});
								}else if(PushUnit == "시간"){
									PC_Series.push({
										name: PushNm,
										yAxis: 2,
										data: data,
										tooltip: {
				                               valueSuffix: '시간'
				                        }
									});
								}else if(PushUnit == "천명"){
									PC_Series.push({
										name: PushNm,
										yAxis: 3,
										data: data,
										tooltip: {
				                               valueSuffix: '천명'
				                        }
									});
								}else if(PushUnit == "만원"){
									PC_Series.push({
										name: PushNm,
										yAxis: 4,
										data: data,
										tooltip: {
				                               valueSuffix: '만원'
				                        }
									});
								//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 START
								}else if(PushUnit == "원"){
									PC_Series.push({
										name: PushNm,
										yAxis: 4,
										data: data,
										tooltip: {
				                               valueSuffix: '원'
				                        }
									});
								//2020-04-20 [곽제욱] KOSIS 연계로 인하여 만원->원으로 변경 END
								}
								
								
								/*
								PC_Series.push({
									name: PushNm,
									data: data
								});
								//*/
								
								data = [];
							//}
						}
						
						
						console.log("PC_Series = " + JSON.stringify(PC_Series));				
						
						$('#ssaJobQualityChartMain').highcharts({
							/*chart: {
								margin:[20,30,90,80],		// 순서 top, right, bottom, left
							    height: '300'
							},	
							showFirstLabel: false,*/
							chart: {
								//margin:[20,30,90,80],		// 순서 top, right, bottom, left
								width: '650',
								height: '290'
							},	
							showFirstLabel: false,
							colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
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
								gridLineWidth: 1,
								//categories: [0,1,2,3,4,5,6,7,8,9,10,11],
								categories: arry_Category,
								crosshair: true,
								labels: {enabled : (item != undefined) ? true : false},
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0/*,
								tickInterval: 1,
								startOnTick: true*/
								//title: { text: '갱신주기' }
							},
							yAxis: arr_yAxis,
							/*yAxis: [{
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
									enabled: true,
									format: '{value} %',
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
									text: '%%p',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#f79339'
									}
								},
								labels: {
									enabled: true,
									format: '{value} %%p',
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#f79339'
									}
								},opposite: false, //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
							},
							{	title: {
									text: '시간',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#ffc000'
									}
								},
								labels: {
									enabled: true,
									format: '{value} 시간',
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#ffc000'
									}
								},opposite: false, //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
							},
							{	title: {
									text: '천명',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#92d050'
									}
								},
								labels: {
									enabled: true,
									format: '{value} 천명',
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#92d050'
									}
								},opposite: false, //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
							},
							{	title: {
									text: '만원',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[2]
										color: '#00b0f0'
									}
								},
								labels: {
									enabled: true,
									format: '{value} 만원',
									style: {
										//color: Highcharts.getOptions().colors[2]
										color: '#00b0f0'
									}
								},
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
						}], */
							/*plotOptions: {								
								series: {
									//allowPointSelect : true,
									//states: { },
						            cursor: 'pointer',
						            point: {
						                events: {						                	
						                    click: function (e) {						                    	
						                    	
						                    								
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
//						        layout: 'vertical',
//						        align: 'right',
//						        verticalAlign: 'middle'
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
			E3309   : 산업재해 전체 재해율
			I3308   : 사회보험 가입률
			E3307   : 총 근로시간
			I3306   : 비정규직 - 근로자 수
			I3306_1 : 비정규직 - 근로자 비율
			E3303   : 저 임금 근로자 비율
			E3301   : 월임금총액
			*/
			
			//조회버튼은 최대 10개만 가능
			//*
			//if(this.btnLimitCnt()) {
				for(var i=0; i<this.ssaJobQualityList.length; i++){
					var oDiv = document.getElementById(this.ssaJobQualityList[i]);
					console.log("oDiv.style.backgroundColor : " + oDiv.style.backgroundColor);
					if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
						switch(this.ssaJobQualityList[i]){
							case("E3309") : Var_Title = "산업재해 전체 재해율"; break;
							case("I3308") : Var_Title = "사회보험 가입률"; break;
							case("E3307") : Var_Title = "총 근로시간"; break;
							case("I3306") : Var_Title = "근로자 수"; break;
							case("I3306_1") : Var_Title = "근로자 비율"; break;
							case("E3303") : Var_Title = "임금상승률"; break; // 2020-05-21 [곽제욱] 저임금 근로자 비율 -> 임금상승률 통계명 변경
							case("E3301") : Var_Title = "월임금총액"; break;
						}
						ParamLink_id = this.ssaJobQualityList[i];	//Link_id 세팅(첫번째 조회조건)
						DivChkCnt++;
						for(var j=1; j<9; j++){	//_C8까지 (조건만)
							var DivID = "#"+this.ssaJobQualityList[i]+"_condition_C"+j;
							
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

				$("#ssaJobQuality").hide();	//지표  팝업 숨김
				
				this.searchbtnCnt++;
				$ssaJobQualityDetailPopup.ui.show();	//검색조건 팝업 호출
			//}
		},
		
		/**
		 * @name         : getSidoList
		 * @description  : 지역선택 - 시도 선택시 시군구 목록 조회
		 * @date         : 2018. 10. 01. 
		 * @author	     : 현재훈
		 * @history 	 :
		 * @param type
		 * @param defaultSido
		 * @param defaultSgg
		 * @param callback
		 */
		getSidoList: function(type,defaultSido,defaultSgg,callback) {
			$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				data: {
					//base_year: $ssaJobQuality.ui.mapList[0].bnd_year
					base_year: "2016"
				},
				dataType: "json",
				success: function(res) {
					$("#"+type+"-sido-select").empty();
					if(res.errCd=="0"){
						$("#"+type+"-sido-select").append($("<option/>",{text:"전체",value:"99","data-coor-x":"","data-coor-y":""}));
						$.each(res.result.sidoList,function(cnt,node){
							if(defaultSido==node.sido_cd){
								$ssaJobQuality.ui.getSggList(type, node.sido_cd, defaultSgg);
							}
							$("#"+type+"-sido-select").append($("<option/>",{text:node.sido_nm,value:node.sido_cd,selected:(defaultSido==node.sido_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor}));
						});
					}
					
					$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#"+type+"-sido-select,#"+type+"-sgg-select").prop("disabled",false);
				}
			});
		},
		
		/**
		 * @name             : $houseAnalysisMap.leftmenu.getSggList
		 * @description      : 시군구리스트
		 * @date             : 2018. 10. 01. 
		 * @author	         : 현재훈
		 * @history          :
		 * @param type       : 'current' 주거현황보기 'inter-recommend' 추천지역찾기의 관심지역 
		 * @param sido_cd    : 시도 코드
		 * @param defaultSgg : 처음 셋팅해줄 시군구 코드
		 * @param callback   : callback
		 */
		getSggList: function(type,sido_cd,defaultSgg,callback) {
			$("#"+type+"-sgg-select").prop("disabled",true);
			$.ajax({
				method: "POST",
				async: true,
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				data: {
					sido_cd: sido_cd,
					base_year: "2016"
				},
				dataType: "json",
				success: function(res) {
					$("#"+type+"-sgg-select").empty();
					if(res.errCd=="0"){
						var coorX = $("#current-sido-select option:selected").data("coor-x");
						var coorY = $("#current-sido-select option:selected").data("coor-y");
						$("#"+type+"-sgg-select").append($("<option/>",{text:"전체",value:"999","data-coor-x":coorX,"data-coor-y":coorY, "data-adm_cd":sido_cd}));  // 2017-08-17 [개발팀] 전체일 때 data-adm_cd 값 추가
						$.each(res.result.sggList,function(cnt,node){
							//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
							$("#"+type+"-sgg-select").append($("<option/>",{text:node.sgg_nm,value:node.sgg_cd,selected:(defaultSgg==node.sgg_cd),"data-coor-x":node.x_coor,"data-coor-y":node.y_coor,"data-adm_cd":sido_cd+node.sgg_cd}));
						});
						if("policy"==type || "current" == type){ //2017.05.29 [개발팀] 지역별 수요변화 비자치구추가
							if($psmCombine.ui.atdrcList[sido_cd]){
								$.each($psmCombine.ui.atdrcList[sido_cd],function(sidoCnt,sidoNode){
									var op,index,empty = true;
									$.each(this.sgg_list,function(cnt,node){
										op = $("#"+type+"-sgg-select option[value="+node+"]");
										if(op.length>0){
											empty = false;
											if(index==undefined){
												index = op.index();
											}else{
												index = Math.min(index,op.index());
											}
										}
									});
									if(!empty){
										//2017.05.29 [개발팀] 지자체 URL 추가 - 비자치구 코드 추가
										$("#"+type+"-sgg-select option:eq("+index+")").before($("<option/>",{text:sidoNode.sgg_nm,value:sidoNode.sgg_list.join(","),"data-coor-x":op.data("coor-x"),"data-coor-y":op.data("coor-y"), "data-adm_cd":sidoNode.adm_cd}));
									}
								});
							}
						}

					}else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$ssaJobQuality.ui.getSggList(type,sido_cd,defaultSgg);
						});
					}
					$("#"+type+"-sgg-select").prop("disabled",false);
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					$("#"+type+"-sgg-select").prop("disabled",false);
				}
			});
		},
		
		selectedDetailPop : function(argParams){
			// 시도,시군구 조회 설정
			argParams.sido_cd = $('#current-sido-select').val();
			argParams.sgg_cd = $('#current-sgg-select').val();
			
			$tsSub.ui.show(argParams);
			$ssaJobQuality.ui.hide();
		},
		
		/**
		 * 
		 * @name         : localGovCallback
		 * @description  : 지자체연계 콜백함수
		 * @date         : 2018. 10. 01. 
		 * @author	     : 현재훈
		 * @history 	 :
		 * @param sido_cd: 시도코드
		 * @param sgg_cd : 시군구코드
		 */
		localGovCallback : function(sido_cd, sgg_cd) {
			switch(sido_cd) {
				case "00":
					$("#current-sido-select option[value='"+$ssaJobQuality.ui.defaultSidoCd+"']").prop("selected", true);
					break;
				default:
					$("#current-sido-select option[value='"+sido_cd+"']").prop("selected", true);
					$ssaJobQuality.ui.getSggList("current", sido_cd, "", function() {
						setTimeout(function() {
							//$policyStaticMap.ui.localGovSetNavi(sido_cd, sgg_cd);
							//$policyStaticMap.ui.getLocalGovBoundary(sido_cd, sgg_cd);
						}, 200);
					});
					break;
			}
		},
		
	};	
	
	$ssaJobQuality.event = {
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
			$workRoad.event.set("click", "#ssaJobQuality .wrmToggleBtn", function() {
				$workRoad.ui.toggleLayer("#ssaJobQuality");
			});
			// 닫기 버튼
			$workRoad.event.set("click", "#ssaJobQuality .topbar>a", function() {
				$workRoad.ui.toggleLayer("#ssaJobQuality");
			});
			$workRoad.event.set("click", "#ssaJobQuality .indicator-stepBox label", function() {
				$workRoad.event.checkLabel($(this));
			});
							
			$("body").on("click", "#ssaJobQualityMapView", function() {					
				$ssaMap.ui.getFirstMapDataLoad(null,null);
			});

			//시도 콤보박스 이벤트
			$("body").on("change", "#current-sido-select", function(){
				var type = $(this).data("type");
				var sido_cd = $(this).val();
				$ssaJobQuality.ui.getSggList($(this).data("type"), sido_cd, "");
				
				// 일자리질 데이터 조회
				$ssaJobQuality.ui.ssaJobQualityMain(sido_cd);
				// 차트 데이터 조회
				$ssaJobQuality.ui.ssaJobQualityMainChart(sido_cd);
				// 지도 데이터 조회
				$ssaMap.ui.getTodayStatusMapData("", sido_cd, $ssaJobQuality.ui.defaultDetailType);
			});
			
			//시군구 콤보박스 이벤트
			$("body").on("change", "#current-sgg-select", function(){
				var sgg_cd = $("#current-sgg-select option:selected").attr("data-adm_cd");

				// 일자리질 데이터 조회
				$ssaJobQuality.ui.ssaJobQualityMain(sgg_cd);
				// 차트 데이터 조회
				$ssaJobQuality.ui.ssaJobQualityMainChart(sgg_cd);
			});
		},			
	}		
		
}(window, document));