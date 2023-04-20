/**
 * 일자리 현황 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 일자리 현황 주요지표  
 * 
 * history : 
 *	2018.10.25	손원웅
 *
 * author : 손원웅
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaJobStatus = W.$ssaJobStatus || {};
	
	$ssaJobStatus.ui = {
		pSelector	: "#ssaJobStatus",
		/*pParam1 : {
			align : 'top-left',
			left : '380px',
			top: '68px',
			width : '1100px',
			height: '540px'
		},*/
		ssaJobStatusList : ["I3111","I3114","I3116","I3104","I3112","I3117","I3101"],
		searchbtnCnt : 0,
		SearchParam : [],
		MapType : "",
		indicatorTitle_I3111 : "",
		indicatorTitle_I3114 : "",
		indicatorTitle_I3116 : "",
		indicatorTitle_I3104 : "",
		indicatorTitle_I3112 : "",
		indicatorTitle_I3117 : "",
		indicatorTitle_I3101 : "",
		slwFlag : 0,
		/*
		-일자리 현황 목록-
		I3111	고용률
		I3114	실업률            	
		I3116	청년실업률      	
		I3104	취업자수         	
		I3112	실업자수         	
		I3117	비경제활동인구	
		I3101	세대수   
		*/
		
		
		
		/**
		 * @name         : ready
		 * @description  : 최초 화면 Open할때 실행 / 메뉴 선택 시점
		 * @date         : 2018.11.20
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		ready : function() {
			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '05', '01', '01', '일자리 현황', '');
			
			
			//20181206 전체지표차트 없이 개별차트별로 표현_손원웅 *전체로 바꾸려면 파라메터만 삭제하세요.
			$ssaJobStatus.ui.ssajobStatusMainData("I3111");
			$ssaJobStatus.ui.ChangeColor("I3111");
			$workRoad.event.setToolTip(".ar");
			$workRoad.event.setToolTip(".job-arrow");
			
			//알수 없는 현상으로 인한 추가... 지우지 마세요
			$("#I3114_condition_C1 label").eq(0).addClass("on");
			$("#I3114_condition_C1 label").eq(0).prev().attr("checked", "checked");	
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
			$ssaSearchPopup.ui.hide();
			$workRoad.ui.showLayer(this.pSelector, {
				scrollOptions: {
					key:$('#ssaJobStatus'), 
					target:$('#ssaJobStatus .normalBox'), 
					mCustom : true,
					maxHeight : 510
				}
			});
			$workRoad.ui.toggleLayer("#ssaJobStatus", true);
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
			$workRoad.ui.hideLayer(this.pSelector);
		},	
		
		
		/**
		 * @name         : ChangeColor
		 * @description  : 일자리현황 백그라운드 컬러 변경
		 * @date         : 2018.10.24
		 * @author	     : 손원웅
		 * @history 	 : 
		 */
		ChangeColor : function(item) {
			var empCnt = 0;
			
			//지표정보조회
			$workRoad.ui.selectJobStatsDataInfo(item
				, function(data) {
				    // mng_s 20190319 이금은
					var statNm = data.stat_nm;
					var title = data.stat_nm;
					// mng_e 20190319 이금은
					
					//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";

					/** 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 주석처리 START */
					/*
					$("#ssaJobStatus #ssaStatNm").html(statNm);
					$("#ssaJobStatus #ssaTitle").html(title);					// 제목
					$("#ssaJobStatus #ssaExp").html(data.stat_exp);				// 설명
					$("#ssaJobStatus #ssaOrigin").html(data.colct_source);		// 출처
					*/
					/** 2019.05.17[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 주석처리 END */
					
				}, function(err) {
					alert(err);
			});
			
			for(var i=0; i<this.ssaJobStatusList.length; i++){
				if(this.ssaJobStatusList[i] == item){
					var oDiv = document.getElementById(item);
				    oDiv.style.backgroundColor = "#00C6ED";
				    //$("#ssaJobStatus #"+ item +"_tip").css('background-color','#00C6ED');
				    
				    //[0].style.backgroundColor = "rgb(0, 198, 237)";
				    //.attr('style','background-color:#00C6ED;');
				    //.css('background-color','#00C6ED');
				    
				    if(item == "I3104" || item == "I3112"){
				    	empCnt++;
				    }
				}else{
					var oDiv = document.getElementById(this.ssaJobStatusList[i]);
				    oDiv.style.backgroundColor = "#FFFFFF";
				    //$("#ssaJobStatus #"+ item +"_tip").css('background-color','#FFFFFF');
				}
			}
			
			if(empCnt == 0){
				document.getElementById("emp").style.backgroundColor = "#f6f7f8";
				
			}else{
				document.getElementById("emp").style.backgroundColor = "#00C6ED";
			}
			
			//this.ChangeCondition(item);	//일자리현황 조회 조건 변경:2019.05.31[한광희] 일자리 현황 조회 조건 팝업 변경으로 인한 주석 처리
			this.ssajobStatusMainData(item);
		},
		
		/**
		 * @name         : DetailInfo
		 * @description  : 일자리통계분석 > 일자리현황 > 지표 설명 정보 팝업 호출로 인한 추가
		 * @date         : 2019.05.17
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		DetailInfo : function(item, statNm, stat_exp, colct_source) {
			var left = parseInt($("#ssaJobStatus").css("left"));
			var top = parseInt($("#ssaJobStatus").css("top"));
			var width = parseInt($("#ssaJobStatus").css("width"));
			
			$("#ssaDetailInfoPopup #ssaTitle").html(statNm);			// 제목
			$("#ssaDetailInfoPopup #ssaExp").html(stat_exp);			// 설명
			$("#ssaDetailInfoPopup #ssaOrigin").html(colct_source);		// 출처
			
			if (item == 'I3111') {	// 고용률
				left = left + 140 - $workRoad.ui.coordX;
				top = top + 58 - $workRoad.ui.coordY;
			} else if (item == 'I3114') {	// 실업률
				left = left + 140 - $workRoad.ui.coordX;
				top = top + 100 - $workRoad.ui.coordY;
			} else if (item == 'I3116') {	// 청년실업률
				left = left + 160 - $workRoad.ui.coordX;
				top = top + 143 - $workRoad.ui.coordY;
			} else if (item == 'I3104') {	// 경제활동인구 > 취업자수
				left = left + 200 - $workRoad.ui.coordX;
				top = top + 187 - $workRoad.ui.coordY;
			} else if (item == 'I3112') {	// 경제활동인구 > 실업자수
				left = left + 200 - $workRoad.ui.coordX;
				top = top + 230 - $workRoad.ui.coordY;
			} else if (item == 'I3117') {	// 비경제활동인구
				left = left + 165 - $workRoad.ui.coordX;
				top = top + 272 - $workRoad.ui.coordY;
			} else if (item == 'I3101') {	// 세대수
				left = left + 140 - $workRoad.ui.coordX;
				top = top + 315 - $workRoad.ui.coordY;
			}
			
			$ssaDetailInfoPopup.ui.show(left, top);
		},
		
		/**
		 * @name         : ChangeCondition
		 * @description  : 일자리현황 조회 조건 변경
		 * @date         : 2018.10.29
		 * @author	     : 손원웅
		 * @history 	 : 
		 */
		ChangeCondition : function(item) {
			for(var i=0; i<this.ssaJobStatusList.length; i++){
				if(this.ssaJobStatusList[i] == item){
					for(var j=1; j<11; j++){	//_C10까지 있음
						if(j == 1){	//기본 서브 조건
							var DivShow = "#ssaJobStatus #"+item+"_condition_C"+j;
							$(DivShow).show();
							
							$('input:radio[name="condition_map_type"]').eq(0).prop("checked", true);	//지도 선택
							//$('input:radio[name="Sido"]').eq(0).prop("checked", true);	//전국
							
							switch(item){
								case("I3114") : $('input:radio[name="unemployment_rate"]').eq(0).prop("checked", true); break;	//실업률
								case("I3104") : $('input:radio[name="employed_person"]').eq(0).prop("checked", true); break;	//취업자수
								case("I3112") : $('input:radio[name="unemployed_person"]').eq(0).prop("checked", true); break;	//실업자수
								case("I3101") : $('input:radio[name="population"]').eq(0).prop("checked", true); break;	//세대수
							}
						}else if(j > 8){	//타이틀 설명
							var DivShow = "#ssaJobStatus #"+item+"_condition_C"+j;
							$(DivShow).show();
						}
					}
				}else{
					for(var j=1; j<11; j++){	//_C10까지 있음
						var DivHide = "#ssaJobStatus #"+this.ssaJobStatusList[i]+"_condition_C"+j;
						$(DivHide).hide();
					}
				}
			}
		},

		/**
		 * @name         : ssajobStatusChart
		 * @description  : 일자리통계분석(일자리 현황)
		 * @date         : 2018. 10. 23. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		ssajobStatusMainData : function(item){
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getSsaJobStatusMainData.json",
				async: false,
				dataType: "json",
				//data: dataParams,
				success: function(res) {
					
					// 2019.03.13 접근log 생성
					if(item == "I3111" && $ssaJobStatus.ui.slwFlag == 0 ) {
						$ssaJobStatus.ui.slwFlag = 1;
					} else {
						srvLogWrite('D0', '05', '01', '02', '', 'Link_id='+item);	
						$ssaJobStatus.ui.slwFlag = 0;
					}
					
					if(res.errCd == 0){
						/*
						I3111	고용률
						I3114	실업률            	
						I3116	청년실업률      	
						I3104	취업자수         	
						I3112	실업자수         	
						I3117	비경제활동인구	
						I3101	세대수   
						*/
						
						var mainData = res.result.mainData;
						var mainChart = res.result.mainChart;
						//var Category = res.result.Category;
						var Category = [];
						var indicatorTitle = res.result.indicator_Title;
						
						if(item == "I3116"){
							//청년실업률용 분기 카테고리
							Category = res.result.ssaCategoryQuerter;
						}else{
							Category = res.result.Category;
						}
						
						var listElement = '<ul>';
						for(var i = 0; i < mainData.length; i++) {
							var Val = mainData[i].tm;
							var link_ID = mainData[i].link_id;
							var link_Nm = mainData[i].link_nm;
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
							var unit_Nm = mainData[i].unit_nm;
							var Val_apc = mainData[i].total;
							
							var valChk = Val_apc.indexOf("-");
							var span_Nm = "";	//class명
							
							var unitObj = $workRoad.util.getUnitList(unit_Nm);
							var result = $workRoad.util.toNumberString(Val, unitObj);
							var resultSum = $workRoad.util.toNumberString(Val_apc, unitObj);
							var tooltipVal = "";
							var statNm = "";		// 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
							var colct_source = "";	// 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
							
							//20181214 손원웅_증감 툴팁 세팅 추가
							var idaSubj = "";
							var idaTitle = "";
							var iadVal = resultSum.value.replace("-","");
							
							// 2019.11.04[한광희] 단위 null 일 경우 공백 처리
							if(unit_Nm == null ) {
								unit_Nm = '';
							}
							
							if (Val_apc != 0) {
								if(valChk == "-1"){
									span_Nm = "up"
									if(link_ID == "I3116"){
										//분기
										idaSubj = "전 분기 대비 ";
										idaTitle = iadVal + unit_Nm + " 증가";
									}else{
										//월
										idaSubj = "전 월 대비 ";
										idaTitle = iadVal + unit_Nm + " 증가";
									}
								}else{
									span_Nm = "down"
									if(link_ID == "I3116"){
										//분기
										idaSubj = "전 분기 대비 ";
										idaTitle = iadVal + unit_Nm + " 감소";
									}else{
										//월
										idaSubj = "전 월 대비 ";
										idaTitle = iadVal + unit_Nm + " 감소";
									}
								}
							}

							//20181119 손원웅 tooltip 추가
							for(var j=0; j<indicatorTitle.length; j++){
								if(link_ID == indicatorTitle[j].link_id){
									tooltipVal = indicatorTitle[j].stat_exp;
									statNm = indicatorTitle[j].stat_nm;				// 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 제목 변수 선언
									colct_source = indicatorTitle[j].colct_source;	// 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 출처 변수 선언
								}
							}
							
							if(link_ID == 'I3104' || link_ID == 'I3112'){	//취업자수, 실업자수는 다르게 그림	
								$('td[id='+link_ID+'] *').remove();
								
								//listElement += '<dl> <dt>' + link_Nm + '</dt>';
								/** 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								// listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaJobStatus.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="job-arrow '+ span_Nm +'" id='+ link_ID+"_apc" +'></span>';
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
								/** 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 START */
								// listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<a href="javascript:void(0)" class="ar" id='+ link_ID+"_tip" +' data-subj="'+link_Nm+'" title="'+tooltipVal+'"><img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표"/></a></dt>';
								listElement += '<dl> <dt>' + link_Nm + updt_cycle_html + '&nbsp;&nbsp;<img src="/images/workRoad/ico/ico_tooltip01.png" alt="물음표" onmouseover="javascript:$ssaJobStatus.ui.DetailInfo(\'' + link_ID + '\', \''+ statNm +'\', \''+ tooltipVal +'\', \'' + colct_source + '\');" onmouseout="javascript:$ssaDetailInfoPopup.ui.hide();"/></dt>';
								/** 2019.05.30[한광희] 일자리 통계분석 > 용어 설명 팝업 호출로 인한 수정 END */
								listElement += '<dd title="' + result.value + '">' + result.text +'</dd> <span class="job-arrow '+ span_Nm +'" id='+ link_ID+"_apc" +'></span>';
								listElement += '</dl>';
								listElement += '</td>';
								listElement += '</tr>';
								listElement += '</tbody>';
								listElement += '</table>';
								listElement += '</div>';
								$('div[id='+link_ID+']').append(listElement);
								
								listElement = '<ul>';
							}
							
							$('#ssaJobStatus #'+link_ID+'_apc').attr('data-val', resultSum.text.replace("-",""));
							$('#ssaJobStatus #'+link_ID+'_apc').attr('data-subj', idaSubj);
							$('#ssaJobStatus #'+link_ID+'_apc').attr('title', idaTitle);
//							$('#'+link_ID+'_apc').attr('data-val', (Val + unit_Nm));
						}
						
						// 일자리현황 차트 데이터 만들기
						var PC_Series = [];
						var data = [];
						var PushNm = "";	//PC_Series 에 담아줄 name
						var PushUnit = "";
						var arry_Category = [Category[0].mon0
						                     ,Category[0].mon1
						                     ,Category[0].mon2
						                     ,Category[0].mon3
						                     ,Category[0].mon4
						                     ,Category[0].mon5
						                     ,Category[0].mon6
						                     ,Category[0].mon7
						                     ,Category[0].mon8
						                     ,Category[0].mon9
						                     ,Category[0].mon10
						                     ,Category[0].mon11];
						var	arr_yAxis = [{
								title: { text: '%',
										 enabled: false,
										 style: {}
										},
										labels: {
											enabled: (item == "I3111" || item == "I3114" || item == "I3116") ? true : false,
											formatter: function () {
												return $workRoad.util.addComma(this.value)+" %"
											},
											style: {}
										},
										lineWidth: 1,
								        lineColor: "#000000",
								        tickWidth: 0,
								        min: 0,
										visible : (item == "I3111" || item == "I3114" || item == "I3116") ? true : false
								},
								{title: { text: '천명',
										  enabled: false,
										 style: {}
									},
									labels: {
										enabled: (item == "I3104" || item == "I3112" || item == "I3117") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 천명"
										},
										style: {}
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "I3104" || item == "I3112" || item == "I3117") ? true : false
								},
								{title: { 
									text: '천호',
									enabled: false,
									style: {}
									},
									labels: {
										enabled: (item == "I3101") ? true : false,
										formatter: function () {
											return $workRoad.util.addComma(this.value)+" 천호"
										},
										style: {}
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0,
									min: 0,
									visible : (item == "I3101") ? true : false
								}
							];
						//}
						
						//chart 데이터
						if(item == undefined){
							for(var i=0; i<$ssaJobStatus.ui.ssaJobStatusList.length; i++){
								var link_id = $ssaJobStatus.ui.ssaJobStatusList[i];
								
								for(var j=0; j<mainChart.length; j++){
								var chart_link_id = mainChart[j].link_id;
									if(link_id == chart_link_id){
										PushNm = mainChart[j].link_nm;
										PushUnit = mainChart[j].unit_nm;
										
										for(var k=1; k<13; k++){
											if(data.length < 12){
												//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
												if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 2 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
													data.push('-');
												}else{
													data.push(parseFloat(mainChart[j]["mon"+k]));
												}
												//data.push(parseFloat(mainChart[j]["mon"+k]));
											}else{
												if(mainChart[j]["mon"+k] != 0){
													//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
													if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 2 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
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
								
								
								if(PushUnit == "%"){
									PC_Series.push({
										name: PushNm,
										data: data.reverse(),
										tooltip: {
				                               valueSuffix: '%'
				                        }
									});
								}else if(PushUnit == "천명"){
									PC_Series.push({
										name: PushNm,
										data: data.reverse(),
										yAxis: 1,
										tooltip: {
				                               valueSuffix: '천명'
				                        }
									});
								}else if(PushUnit == "호"){
									PC_Series.push({
										name: PushNm,
										yAxis: 2,
										data: data.reverse(),
										tooltip: {
				                               valueSuffix: '호'
				                        }
									});
								}

								data = [];
							}
						}else{
							/*link_id 있을 경우 지표 하나씩 표현*/
							var link_id = item;
							
							for(var j=0; j<mainChart.length; j++){
							var chart_link_id = mainChart[j].link_id;
								if(link_id == chart_link_id){
									PushNm = mainChart[j].link_nm;
									PushUnit = mainChart[j].unit_nm;
									
									for(var k=1; k<13; k++){
										if(data.length < 12){
											//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
											if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 2 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
												data.push('-');
											}else{
												if(link_id == "I3101"){
													data.push(parseFloat((mainChart[j]["mon"+k]/1000).toFixed(1))); //toFixed(1):소수점 1자리까지만 표현 하기 위해 
												}else{
													data.push(parseFloat(mainChart[j]["mon"+k]));
												}
											}
											//data.push(parseFloat(mainChart[j]["mon"+k]));
										}else{
											if(mainChart[j]["mon"+k] != 0){
												//차트 맨앞, 맨뒤 0인 데이터 '-'로 변환
												if((k == 1 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 2 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 11 && parseFloat(mainChart[j]["mon"+k]) == 0) || (k == 12 && parseFloat(mainChart[j]["mon"+k]) == 0)){
													data.splice((k-1),1,'-');
												}else{
													if(link_id == "I3101"){
														data.splice((k-1),1,(parseFloat((mainChart[j]["mon"+k]/1000).toFixed(1)))); //toFixed(1):소수점 1자리까지만 표현 하기 위해 
													}else{
														data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
													}
												}
												//data.splice((k-1),1,(parseFloat(mainChart[j]["mon"+k])));
											}
										}
									}
								}
							}
							
							//2019-01-23 (125~128) 데이터 없는거 차트에서 제거.
							var temp_arry_Category = [];
							var temp_data = [];
							var temp_flag = false;
							data = data.reverse();
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
							}else if(PushUnit == "천명"){
								PC_Series.push({
									name: PushNm,
									data: data,
									yAxis: 1,
									tooltip: {
			                               valueSuffix: '천명'
			                        }
								});
							}else if(PushUnit == "호"){
								PC_Series.push({
									name: PushNm,
									yAxis: 2,
									data: data,
									tooltip: {
			                               valueSuffix: '호'
			                        }
								});
							}

							data = [];
						}
						
						$('#ssaJobStatusChartMain').highcharts({
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
							showFirstLabel:false,
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
				                }},
							title: { text: '' },
							subtitle: { text: '' },
							exporting: { enabled: false },
							xAxis: {
								gridLineWidth: 1,
								categories: arry_Category,
								crosshair: true,
								labels: {enabled : (item != undefined) ? true : false},
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
								//title: { text: '갱신주기' }
							},
							yAxis: arr_yAxis,
							/*
							 yAxis: [{
								//min: 0, 
								//labels: { overflow: 'justify' },
								title: { text: '%',
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
								{title: { text: '천명',
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
									},opposite: false,},
								{title: { text: '천호',
									enabled: false,
									 style: {
										 //color: Highcharts.getOptions().colors[2]
										 color: '#ffc000'
									 }
									},
									labels: {
										enabled: true,
										format: '{value} 천호',
										style: {
											 //color: Highcharts.getOptions().colors[2]
											color: '#ffc000'
										}
									},
									lineWidth: 1,
									lineColor: "#000000",
									tickWidth: 0
							}], 
							//*/
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
								enabled: false,
								layout: 'vertical',
						        align: 'left',
						        verticalAlign: 'top',
						        //verticalAlign: 'left',
						        //borderWidth: 0
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
		 * @description  : 조건검색버튼을 생성한다.	->	상세 조회 팝업으로 변경(20181101)
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
			//20181211 손원웅 추가_맵 타이틀 년,월 정보 삭제.
			if ($ssaMap.ui.curMapId == "0") {
				$('span[id="wrmSubTitle1"] *').remove();
			}else if ($ssaMap.ui.curMapId == "1") {
				$('span[id="wrmSubTitle2"] *').remove();
			}else if ($ssaMap.ui.curMapId == "2"){
				$('span[id="wrmSubTitle3"] *').remove();
			}else{
				$('span[id="wrmSubTitle"] *').remove();
			}
			
			//조회버튼은 최대 10개만 가능
			//if(this.btnLimitCnt()) {
				for(var i=0; i<this.ssaJobStatusList.length; i++){
					var oDiv = document.getElementById(this.ssaJobStatusList[i]);
					if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
						switch(this.ssaJobStatusList[i]){
							case("I3111") : Var_Title = "고용률"; break;
							case("I3114") : Var_Title = "실업률"; break;
							case("I3116") : Var_Title = "청년실업률"; break;
							case("I3104") : Var_Title = "취업자수"; break;
							case("I3112") : Var_Title = "실업자수"; break;
							case("I3117") : Var_Title = "비경제활동인구"; break;
							case("I3101") : Var_Title = "세대수"; break;
						}
						ParamLink_id = this.ssaJobStatusList[i];	//Link_id 세팅(첫번째 조회조건)
						DivChkCnt++;
						for(var j=1; j<9; j++){	//_C8까지 (조건만)
							var DivID = "#ssaJobStatus #"+this.ssaJobStatusList[i]+"_condition_C"+j;
							
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
					messageAlert.open("알림", "검색조건을 생성 할 지표를 선택해주세요!!");
					return;
				}
				
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
				
				this.MapType = $("#ssaJobStatus_map_type input[type='radio']:checked").val();

				/** 2019.05.31[한광희] 일자리현황 조회조건을 팝업 변경으로 인한 수정 START */
				if(ParamLink_id =="I3111" || ParamLink_id == "I3116") {		// 고용률, 청년실업률
					$("#ssaJobStatus").hide();
					$ssaDetailPopup.ui.show(ParamLink_id);
				} else {	// 조회조건 팝업 호출
					$("#ssaJobStatusSearchPopup #ssaJobStatusSearchTitle").html(Var_Title);	
					$ssaJobStatusSearchPopup.ui.show(ParamLink_id);
				}
				
				//$("#ssaJobStatus").hide();	
				
				this.searchbtnCnt++;
				//$ssaDetailPopup.ui.show();
				/** 2019.05.31[한광희] 일자리현황 조회조건을 팝업 변경으로 인한 수정 END */
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
			var cnt = $("#ssaSearchPopup #searchBtnResultRgn").find("li:visible").length;
			if(cnt > 9) {
				messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
				return false;
			}
			return true;
		},

	};	
	
	$ssaJobStatus.event = {
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
				$workRoad.event.set("click", "#ssaJobStatus .wrmToggleBtn", function() {
					$workRoad.ui.toggleLayer("#ssaJobStatus");
				});
				// 닫기 버튼
				$workRoad.event.set("click", "#ssaJobStatus .topbar>a", function() {
					$workRoad.ui.toggleLayer("#ssaJobStatus");
				});
				$workRoad.event.set("click", "#ssaJobStatus .indicator-stepBox label", function() {
					$workRoad.event.checkLabel($(this));
				});
			},
	}
	/*
	20181112 mouseover 빼기로 함
	//고용률 mouseover
	$("#ssaJobStatus #I3111").mouseover(function() {
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
	
	$("#ssaJobStatus #I3111").mouseout(function() {
		$("#I3111_over").hide();
	});
	
	//실업률 mouseover
	$("#ssaJobStatus #I3114").mouseover(function() {
		// 위치 조정
		$("#I3114_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '150px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3114_over").show();
	});
	
	$("#ssaJobStatus #I3114").mouseout(function() {
		$("#I3114_over").hide();
	});
	
	//청년실업률 mouseover
	$("#ssaJobStatus #I3116").mouseover(function() {
		// 위치 조정
		$("#I3116_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '150px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3116_over").show();
	});
	
	$("#ssaJobStatus #I3116").mouseout(function() {
		$("#I3116_over").hide();
	});
	
	//취업자수 mouseover
	$("#ssaJobStatus #I3104").mouseover(function() {
		// 위치 조정
		$("#I3104_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '150px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3104_over").show();
	});
	
	$("#ssaJobStatus #I3104").mouseout(function() {
		$("#I3104_over").hide();
	});
	
	//실업자수 mouseover
	$("#ssaJobStatus #I3112").mouseover(function() {
		// 위치 조정
		$("#I3112_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '150px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3112_over").show();
	});
	
	$("#ssaJobStatus #I3112").mouseout(function() {
		$("#I3112_over").hide();
	});
	
	//비경제활동인구 mouseover
	$("#ssaJobStatus #I3117").mouseover(function() {
		// 위치 조정
		$("#I3117_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '150px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3117_over").show();
	});
	
	$("#ssaJobStatus #I3117").mouseout(function() {
		$("#I3117_over").hide();
	});
	
	//세대수 mouseover
	$("#ssaJobStatus #I3101").mouseover(function() {
		// 위치 조정
		$("#I3101_over").css({'top': '450px', 
			  'left': '170px',
			  'height': '150px',
			  'width': '900px',
			  'background': 'rgba(157,207,255,0.8)',
			  'position': 'absolute',
			  'z-index': 1100					  
		});
		$("#I3101_over").show();
	});
	
	$("#ssaJobStatus #I3101").mouseout(function() {
		$("#I3101_over").hide();
	});*/
	
	///////////////////////////////////////////////// 조회 조건 클릭_시작
	//실업률
	$("#ssaJobStatus #I3114").click(function() {
		$("#ssaJobStatus #I3114_condition_C1").show();
		$("#ssaJobStatus #I3114_condition_C2").show();
	});
	
	$("#ssaJobStatus #I3114_condition_C1").click(function() {
		$("input[name=unemployment_rate]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3114"){	//성별
					$("#ssaJobStatus #I3114_condition_C3").hide();
					$("#ssaJobStatus #I3114_condition_C2").show();
				}else if($(this).val() == "I3115"){	//연령별
					$("#ssaJobStatus #I3114_condition_C2").hide();
					$("#ssaJobStatus #I3114_condition_C3").show();
				}
			}
		})
	});
	
	//취업자수
	$("#ssaJobStatus #I3104").click(function() {
		$("#ssaJobStatus #I3104_condition_C1").show();
		$("#ssaJobStatus #I3104_condition_C2").show();
	});
	
	$("#ssaJobStatus #I3104_condition_C1").click(function() {
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
	$("#ssaJobStatus #I3112").click(function() {
		$("#ssaJobStatus #I3112_condition_C1").show();
		$("#ssaJobStatus #I3112_condition_C2").show();
	});
	
	$("#ssaJobStatus #I3112_condition_C1").click(function() {
		$("input[name=unemployed_person]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3112"){	//성별
					$("#ssaJobStatus #I3112_condition_C3").hide();
					$("#ssaJobStatus #I3112_condition_C2").show();
				}else if($(this).val() == "I3113"){	//연령별
					$("#ssaJobStatus #I3112_condition_C2").hide();
					$("#ssaJobStatus #I3112_condition_C3").show();
				}
			}
		})
	});
	
	//비경제활동인구
	$("#ssaJobStatus #I3117").click(function() {
		$("#ssaJobStatus #I3117_condition_C2").show();
	});
	
	//세대수
	$("#ssaJobStatus #I3101").click(function() {
		$("#ssaJobStatus #I3101_condition_C1").show();
	});
	
	//$workRoad.event.set('click', '#ssaJobStatus #I3101_condition_C1', fun... 
	$("#ssaJobStatus #I3101_condition_C1").click(function() {
		$("input[name=population]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3101"){	//세대수
					$("#ssaJobStatus #I3101_condition_C3").hide();
					$("#ssaJobStatus #I3101_condition_C4").hide();
				}else if($(this).val() == "I3102"){	//총전입,전출,순이동,시도내,시도간(전출입)
					$("#ssaJobStatus #I3101_condition_C4").hide();
					$("#ssaJobStatus #I3101_condition_C3").show();
				}else if($(this).val() == "I3103"){	//이동자수,순이동자수
					$("#ssaJobStatus #I3101_condition_C3").hide();
					$("#ssaJobStatus #I3101_condition_C4").show();
				}
			}
		})
	});
	///////////////////////////////////////////////// 조회 조건 클릭_끝
	/*$workRoad.event.set('click', '#ssaJobStatus', function(e) {
		console.log(e.target);
		console.log($(e.target).html());
		if (typeof $(e.target).attr('id') != 'undeifned'){
			
		}
	});*/
	
}(window, document)); 