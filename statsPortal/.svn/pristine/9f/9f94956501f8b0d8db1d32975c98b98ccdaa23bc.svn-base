/**
 * 일자리 증감 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 일자리 증감 주요지표 
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
	W.$ssaJobGrowth = W.$ssaJobGrowth || {};
	
	$ssaJobGrowth.ui = {
		sampleVar1 : null,			// 샘플 변수 1
		sampleVar2 : "",			// 샘플 변수 2
		sampleVar3 : [],			// 샘플 변수 3	
		pSelector  : "#ssaJobGrowth",
		/*
		E3224 :	고용보험 증감
		I3220 :	취업자 증감
		E3218 :	일자리 - 구직자
		E3208 :	일자리 - 구인인원
		I3207 :	사업체 - 폐업수
		I3206 :	사업체 - 창업수
		*/
		ssaJobGrowthList : ["E3224","I3220","E3218","E3208","I3207","I3206"],
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
			srvLogWrite('D0', '05', '02', '01', '일자리 증감', '');

			$ssaJobGrowth.ui.ssaJobGrowthMainData();
			$ssaJobGrowth.ui.ssaJobGrowthMainChartData("E3224");	
			$ssaJobGrowth.ui.ChangeColor("E3224");
			$workRoad.event.setToolTip(".ar");
			$workRoad.event.setToolTip(".job-arrow");
		},
		
		/**
		 * @name         : 화면(Layer) 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function() {
			$workRoad.ui.showLayer('#ssaJobGrowth');
			$workRoad.ui.toggleLayer("#ssaJobGrowth", true);
		},
		/**
		 * @name         : 화면(Layer) 닫기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideLayer('#ssaJobGrowth');
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
					var statNm = data.stat_nm + " (" + data.updt_cycle + ")";
					var title = data.stat_nm + " (" + data.create_dt + ")";
					//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
					
					$("#ssaJobGrowth #ssaStatNm").html(statNm);
					$("#ssaJobGrowth #ssaTitle").html(title);					// 제목
					$("#ssaJobGrowth #ssaExp").html(data.stat_exp);				// 설명
					$("#ssaJobGrowth #ssaOrigin").html(data.colct_source);		// 출처
					
					console.log("ChangeColor - DataInfo data : " + JSON.stringify(data));
				}, function(err) {
					alert(err);
			});
			
			for(var i=0; i<this.ssaJobGrowthList.length; i++){
				if(this.ssaJobGrowthList[i] == item){
					var oDiv = document.getElementById(item);
				    oDiv.style.backgroundColor = "#00C6ED";
				    
				    if(item == "E3218" || item == "E3208" || item == "I3207" || item == "I3206"){
				    	empCnt++;
				    }
				}else{
					var oDiv = document.getElementById(this.ssaJobGrowthList[i]);
				    oDiv.style.backgroundColor = "#FFFFFF";
				}
			}
			
			if(empCnt == 0){
				document.getElementById("emp").style.backgroundColor = "#FFFFFF";
			}else{
				document.getElementById("emp").style.backgroundColor = "#00C6ED";
			}
			
			this.ChangeCondition(item);	//일자리현황 조회 조건 변경
			this.ssaJobGrowthMainChartData(item);
			
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
			var slwDepCd = "";
			switch(item){
				case("E3224") : slwDepCd = "고용보험 증감"; break;
				case("I3220") : slwDepCd = "취업자 증감"; break;
				case("E3218") : slwDepCd = "구직자"; break;
				case("E3208") : slwDepCd = "구인인원"; break;
				case("I3207") : slwDepCd = "폐업수"; break;
				case("I3206") : slwDepCd = "창업수"; break;
			}
			srvLogWrite('D0', '05', '02', '02', slwDepCd, 'Link_id='+item);
			
			
			for(var i=0; i<this.ssaJobGrowthList.length; i++){
				if(this.ssaJobGrowthList[i] == item){
					for(var j=1; j<11; j++){	//_C10까지 있음
						if(j == 1){	//기본 서브 조건
							var DivShow = "#ssaJobGrowth #"+item+"_condition_C"+j;
							$(DivShow).show();
							
							$('input:radio[name="ssaJG_condition_map_type"]').eq(0).prop("checked", true); //지도 표출 방식 선택
							
							/*switch(item){
								case("I3114") : $('input:radio[name="unemployment_rate"]').eq(0).prop("checked", true); break;	//실업률
								case("I3104") : $('input:radio[name="employed_person"]').eq(0).prop("checked", true); break;	//취업자수
								case("I3112") : $('input:radio[name="unemployed_person"]').eq(0).prop("checked", true); break;	//실업자수
								case("I3101") : $('input:radio[name="population"]').eq(0).prop("checked", true); break;	//인구
							}*/
						}else if(j > 8){	//타이틀 설명
							var DivShow = "#ssaJobGrowth #"+item+"_condition_C"+j;
							$(DivShow).show();
						}
					}
				}else{
					for(var j=1; j<11; j++){	//_C10까지 있음
						var DivHide = "#ssaJobGrowth #"+this.ssaJobGrowthList[i]+"_condition_C"+j;
						$(DivHide).hide();
					}
				}
			}
		},
/* ************************
 * 지표 관련 함수 END   * 
 * ************************/		
		/**
		 * @name         : ssaJobGrowthMainData
		 * @description  : 일자리통계분석(경제상황_지표)
		 * @date         : 2018. 10. 23. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		ssaJobGrowthMainData : function(){
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsJobGrowthMain.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				success: function(res) {
					
					if(res.errCd == 0){
						/*
						E3224 :	고용보험 증감
						I3220 :	취업자 증감
						E3218 :	일자리 - 구직자
						E3208 :	일자리 - 구인인원
						I3207 :	사업체 - 폐업수
						I3206 :	사업체 - 창업수
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
							
							var unitObj = $workRoad.util.getUnitList(unit_Nm);
//							var unitObj = {};
//							unitObj.points = [0,3,6]; 
//							unitObj.units = ["개","천개","백만개"];
//							unitObj.compareOperation = "-";
							unitObj.compareValue = Val_apc; // ★★★★  요기 값을 변경해야 함.  ★★★★
							var result = $workRoad.util.toNumberString(Val, unitObj);
//							var result = $workRoad.util.toNumberString(Val, {points: [0.1,3.1,6.1], units: [unit_Nm,"천호","백만호"]});
							var tooltipVal = "";
							
							//20181214 손원웅_증감 툴팁 세팅 추가
							var idaSubj = "";
							var idaTitle = "";
							
							if(result.iconClass == "up"){
								if(link_ID == "I3207"){
									//연도
									idaSubj = "전 연도 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 증가";
								}else{
									//월
									idaSubj = "전 월 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 증가";
								}
							}else if(result.iconClass == "down"){
								if(link_ID == "I3207"){
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
									
									console.log("ssaJobGrowthMainData - DataInfo tooltipVal : " + JSON.stringify(tooltipVal));
								}, function(err) {
									alert(err);
							});
							

							if(link_ID == "E3218" || link_ID == "E3208" || link_ID == "I3207" || link_ID == "I3206"){	//일자리 - 구직자, 일자리 - 구인인원, 사업체 - 폐업수, 사업체 - 창업수 표출부분	
								$('td[id='+link_ID+'] *').remove();

								//listElement += '<dl> <dt>' + link_Nm + '</dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaJobGrowth job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
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
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaJobGrowth job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
								listElement += '</dl>';
								listElement += '</td>';
								listElement += '</tr>';
								listElement += '</tbody>';
								listElement += '</table>';
								listElement += '</div>';
								$('div[id='+link_ID+']').append(listElement);
								
								listElement = '<ul>';
							}
							
							$('#ssaJobGrowth #'+link_ID+'_apc').attr('data-val', result.iconText);
							$('#ssaJobGrowth #'+link_ID+'_apc').attr('data-subj', idaSubj);
							$('#ssaJobGrowth #'+link_ID+'_apc').attr('title', idaTitle);
//							$('#'+link_ID+'_apc').attr('data-val', (Val + unit_Nm));
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
		 * @name         : ssaJobGrowthMainDataChart
		 * @description  : 일자리통계분석(일자리 현황)
		 * @date         : 2018. 10. 23. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		ssaJobGrowthMainChartData : function(item){
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsJobGrowthMainChart.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						/*
						E3224 :	고용보험 증감
						I3220 :	취업자 증감
						E3218 :	일자리 - 구직자
						E3208 :	일자리 - 구인인원
						I3207 :	사업체 - 폐업수
						I3206 :	사업체 - 창업수
						*/
						
						var mainChart = res.result.mainChart;
						
						//데이터에 따른 카테고리 설정
						if(item == "I3207"){
							this.Category = res.result.yearCategory; //2018, 2017, ...
						}else{
							this.Category = res.result.monthCategory; //201811, 201810, ...
						}
						
						console.log("mainChart : " + JSON.stringify(mainChart));
						console.log("this.Category : " + JSON.stringify(this.Category));
						
						// 일자리 증감 차트 데이터 만들기
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
						var arr_yAxis = [{
									title: { 
										text: '명',
										enabled: false,
										style: {}
									},
									labels: {
										enabled: (item == "E3224" || item == "E3208" || item == "I3207") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 명"
										},
										style: {}
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "E3224" || item == "E3208" || item == "I3207") ? true : false
								},
								{	title: {
										text: '천명',
										enabled: false,
										style: {}
									},
									labels: {
										enabled: (item == "I3220") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 천명"
										},
										style: {}
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "I3220") ? true : false
								},
								{	title: {
										text: '개',
										enabled: false,
										style: {}
									},
									labels: {
										enabled: (item == "I3206") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 개"
										},
										style: {}
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "I3206") ? true : false
								},
								{	title: {
										text: '건',
										enabled: false,
										style: {}
									},
									labels: {
										enabled: (item == "E3218") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 건"
										},
										style: {}
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "E3218") ? true : false
								}
							];
						//}
						
						if(item == undefined){
							for(var i=0; i<$ssaJobGrowth.ui.ssaJobGrowthList.length; i++){
								var link_id = $ssaJobGrowth.ui.ssaJobGrowthList[i];
								
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
												
											}else{
												if(mainChart[j]["mon"+k] != 0){
													//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
													if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 10 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
														data.splice((k-1),1,'-');
													}else{
														data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
													}
													
												}
											}
										}
									}
								}
								
								console.log("PushUnit : " + PushUnit);
								
								if(PushUnit == "명"){
									PC_Series.push({
										name: PushNm,
										data: data,
										tooltip: {
				                               valueSuffix: '명'
				                        }
									});
								}else if(PushUnit == "천명"){
									PC_Series.push({
										name: PushNm,
										data: data,
										yAxis: 1,
										tooltip: {
				                               valueSuffix: '천명'
				                        }
									});
								}else if(PushUnit == "개"){
									PC_Series.push({
										name: PushNm,
										yAxis: 2,
										data: data,
										tooltip: {
				                               valueSuffix: '개'
				                        }
									});
								}else if(PushUnit == "건"){
									PC_Series.push({
										name: PushNm,
										yAxis: 3,
										data: data,
										tooltip: {
				                               valueSuffix: '건'
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
							
							//for(var i=0; i<$ssaJobGrowth.ui.ssaJobGrowthList.length; i++){
								//var link_id = $ssaJobGrowth.ui.ssaJobGrowthList[i];
								
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
												
											}else{
												if(mainChart[j]["mon"+k] != 0){
													//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
													if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 10 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
														data.splice((k-1),1,'-');
													}else{
														data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
													}
													
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
								
								if(PushUnit == "명"){
									PC_Series.push({
										name: PushNm,
										data: data,
										tooltip: {
				                               valueSuffix: '명'
				                        }
									});
								}else if(PushUnit == "천명"){
									PC_Series.push({
										name: PushNm,
										data: data,
										yAxis: 1,
										tooltip: {
				                               valueSuffix: '천명'
				                        }
									});
								}else if(PushUnit == "개"){
									PC_Series.push({
										name: PushNm,
										yAxis: 2,
										data: data,
										tooltip: {
				                               valueSuffix: '개'
				                        }
									});
								}else if(PushUnit == "건"){
									PC_Series.push({
										name: PushNm,
										yAxis: 3,
										data: data,
										tooltip: {
				                               valueSuffix: '건'
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
						//}
						
						
						
						console.log("PC_Series = " + JSON.stringify(PC_Series));
						
						$('#ssaJobGrowthChartMain').highcharts({
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
									text: '명',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[0]
										color: '#ff0000'
									}
								},
								labels: {
									enabled: true,
									format: '{value} 명',
									style: {
										//color: Highcharts.getOptions().colors[0]
										color: '#ff0000'
									}
								},
							},
							{	title: {
									text: '천명',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#f79339'
									}
								},
								labels: {
									enabled: true,
									format: '{value} 천명',
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#f79339'
									}
								},opposite: false, //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
							},
							{	title: {
									text: '개',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#ffc000'
									}
								},
								labels: {
									enabled: true,
									format: '{value} 개',
									style: {
										//color: Highcharts.getOptions().colors[1]
										color: '#ffc000'
									}
								},opposite: false, //Y축의 위치 설정(true의 경우 우측에 나온다.) 현재 Y축 숨김으로 설정 안해도 됨.
							},
							{	title: {
									text: '건',
									enabled: false,
									style: {
										//color: Highcharts.getOptions().colors[2]
										color: '#92d050'
									}
								},
								labels: {
									enabled: true,
									format: '{value} 건',
									style: {
										//color: Highcharts.getOptions().colors[2]
										color: '#92d050'
									}
								},
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
						}],*/
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
								//layout: 'vertical',
						        //align: 'left',
						        //verticalAlign: 'top',
						        layout: 'vertical',
						        align: 'right',
						        verticalAlign: 'middle'
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
			E3224 :	고용보험 증감
			I3220 :	취업자 증감
			E3218 :	일자리 - 구직자
			E3208 :	일자리 - 구인인원
			I3207 :	사업체 - 폐업수
			I3206 :	사업체 - 창업수
			*/
			
			//조회버튼은 최대 10개만 가능
			//*
			//if(this.btnLimitCnt()) {
				for(var i=0; i<this.ssaJobGrowthList.length; i++){
					var oDiv = document.getElementById(this.ssaJobGrowthList[i]);
					console.log("oDiv.style.backgroundColor : " + oDiv.style.backgroundColor);
					if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
						switch(this.ssaJobGrowthList[i]){
							case("E3224") : Var_Title = "고용보험 증감"; break;
							case("I3220") : Var_Title = "취업자 증감"; break;
							case("E3218") : Var_Title = "구직자"; break;
							case("E3208") : Var_Title = "구인인원"; break;
							case("I3207") : Var_Title = "폐업수"; break;
							case("I3206") : Var_Title = "창업수"; break;
						}
						ParamLink_id = this.ssaJobGrowthList[i];	//Link_id 세팅(첫번째 조회조건)
						DivChkCnt++;
						for(var j=1; j<9; j++){	//_C8까지 (조건만)
							var DivID = "#"+this.ssaJobGrowthList[i]+"_condition_C"+j;
							
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
				
				this.MapType = $("#ssaJobGrowth_map_type input[type='radio']:checked").val();

				$("#ssaJobGrowth").hide();	//지표  팝업 숨김
				
				this.searchbtnCnt++;
				$ssaJobGrowthDetailPopup.ui.show();	//검색조건 팝업 호출
				
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
			var cnt = $("#ssaJobGrowthDetailPopup #searchBtnResultRgn").find("li:visible").length;
			if(cnt > 9) {
				messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
				return false;
			}
			return true;
		},
		
		
		
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
		
	};	
	
	$ssaJobGrowth.event = {
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
				$workRoad.event.set("click", "#ssaJobGrowth .wrmToggleBtn", function() {
					$workRoad.ui.toggleLayer("#ssaJobGrowth");
				});
				// 닫기 버튼
				$workRoad.event.set("click", "#ssaJobGrowth .topbar>a", function() {
					$workRoad.ui.toggleLayer("#ssaJobGrowth");
				});
				$workRoad.event.set("click", "#ssaJobGrowth .indicator-stepBox label", function() {
					$workRoad.event.checkLabel($(this));
				});				
			},			
	}
	
	
	//고용률 mouseover
	$("#ssaJobGrowth #I3111").mouseover(function() {
		// 위치 조정
		$("#I3111_over").css({'top': '450px', 
			  'left': '90px',
			  'height': '200px',
			  'width': '700px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3111_over").show();
	});
	
	$("#ssaJobGrowth #I3111").mouseout(function() {
		$("#I3111_over").hide();
	});
	
	//실업률 mouseover
	$("#ssaJobGrowth #I3114").mouseover(function() {
		// 위치 조정
		$("#I3114_over").css({'top': '450px', 
			  'left': '90px',
			  'height': '200px',
			  'width': '700px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3114_over").show();
	});
	
	$("#ssaJobGrowth #I3114").mouseout(function() {
		$("#I3114_over").hide();
	});
	
	//청년실업률 mouseover
	$("#ssaJobGrowth #I3116").mouseover(function() {
		// 위치 조정
		$("#I3116_over").css({'top': '450px', 
			  'left': '90px',
			  'height': '200px',
			  'width': '700px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3116_over").show();
	});
	
	$("#ssaJobGrowth #I3116").mouseout(function() {
		$("#I3116_over").hide();
	});
	
	//취업자수 mouseover
	$("#ssaJobGrowth #I3104").mouseover(function() {
		// 위치 조정
		$("#I3104_over").css({'top': '450px', 
			  'left': '90px',
			  'height': '200px',
			  'width': '700px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3104_over").show();
	});
	
	$("#ssaJobGrowth #I3104").mouseout(function() {
		$("#I3104_over").hide();
	});
	
	//실업자수 mouseover
	$("#ssaJobGrowth #I3112").mouseover(function() {
		// 위치 조정
		$("#I3112_over").css({'top': '450px', 
			  'left': '90px',
			  'height': '200px',
			  'width': '700px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3112_over").show();
	});
	
	$("#ssaJobGrowth #I3112").mouseout(function() {
		$("#I3112_over").hide();
	});
	
	//비경제활동인구 mouseover
	$("#ssaJobGrowth #I3117").mouseover(function() {
		// 위치 조정
		$("#I3117_over").css({'top': '450px', 
			  'left': '90px',
			  'height': '200px',
			  'width': '700px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3117_over").show();
	});
	
	$("#ssaJobGrowth #I3117").mouseout(function() {
		$("#I3117_over").hide();
	});
	
	//인구 mouseover
	$("#ssaJobGrowth #I3101").mouseover(function() {
		// 위치 조정
		$("#I3101_over").css({'top': '450px', 
			  'left': '90px',
			  'height': '200px',
			  'width': '700px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3101_over").show();
	});
	
	$("#ssaJobGrowth #I3101").mouseout(function() {
		$("#I3101_over").hide();
	});
	
}(window, document));