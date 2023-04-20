/**
 * 일자리 현황 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 일자리 현황 상세팝업
 * 
 * history : 
 *	2018.10.31	손원웅
 *
 * author : 손원웅
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaDetailPopup = W.$ssaDetailPopup || {};
	
	$ssaDetailPopup.ui = {
		pSelector	: "#ssaDetailPopup",
		DetailData : [],
		Category : [],		//차트 데이터
		MapData : [],		//지도 데이터
		MapType : "",
		DataBoardChart : [],
		DB_Chart_Category_All : [], // 데이터에 존재하는 모든 카테고리
		DB_Chart_Category : [],
		DB_Chart_Category_CD : [],
		CurrentDate : [],
		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * 		2019.05.31 한광희 param 값 추가(ParamLink_id)
		 * @param
		 */
		show : function(ParamLink_id) {
			$workRoad.ui.showLayer(this.pSelector);
			this.SearchPopup(ParamLink_id);		// 2019.05.31[한광희] 일자리 현황 조회조건 팝업화면 변경으로 인한 param 값 추가
			
			$workRoad.event.setToolTip(".job-arrow");
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
		 * @name         : selectDataBoardMap
		 * @description  : 
		 * @date         : 2018.11.02
		 * @author	     : 손원웅
		 * @history 	 : 
		 * 		2018.11.02	손원웅	신규
		 * @param
		 */
		selectDataBoardMap : function(param) {
			//지도 데이터 세팅
			var result = [];
			var resultCnt = 0;
			
			var listElement = '';

			if ($ssaMap.ui.curMapId == "0") {
				$('span[id="wrmSubTitle1"] *').remove();
				listElement += '<span id="wrmSubTitle1" style="line-height:35px; font-weight:bold;">'+param+'</span>';
				$('span[id="wrmSubTitle1"]').append(listElement);
			}else if ($ssaMap.ui.curMapId == "1") {
				$('span[id="wrmSubTitle2"] *').remove();
				listElement += '<span id="wrmSubTitle2" style="line-height:35px; font-weight:bold;">'+param+'</span>';
				$('span[id="wrmSubTitle2"]').append(listElement);
			}else if ($ssaMap.ui.curMapId == "2"){
				$('span[id="wrmSubTitle3"] *').remove();
				listElement += '<span id="wrmSubTitle3" style="line-height:35px; font-weight:bold;">'+param+'</span>';
				$('span[id="wrmSubTitle3"]').append(listElement);
			}else{
				$('span[id="wrmSubTitle"] *').remove();
				listElement += '<span id="wrmSubTitle" style="line-height:35px; font-weight:bold;"></span>';
				$('span[id="wrmSubTitle"]').append(listElement);
			}
			
			if($ssaJobStatus.ui.SearchParam.Link_id == "I3116") {
        		//청년실업률용 분기 카테고리
				param = param.replace(/년 /g,"0").replace(/분기/g,"");
        	}
			
			for(var i=0; i<this.DetailData.length; i++){
				if(param == this.DetailData[i].prd_de && "00" != this.DetailData[i].c1){
					var TmpResult = {};
					TmpResult.adm_cd = this.DetailData[i].c1;
					TmpResult.adm_nm = this.DetailData[i].c1_nm;
					TmpResult.prd_de = this.DetailData[i].prd_de;
					TmpResult.dt = this.DetailData[i].dt;
					
					result[resultCnt++] = TmpResult;
				}
				
			}
			
			var Tmpdata ={ pAdmCd : "00", 
						result : result,
						showData : "dt",
						unit : this.DetailData[0].unit_nm,
			}
			
			$ssaDetailPopup.ui.MapData[0] = Tmpdata;
			$ssaDetailPopup.ui.MapType = $ssaJobStatus.ui.MapType;
			$ssaMap.ui.openApiBoundarySido("2016");	//최신년도 데이터가 2016...
		},
		
		/**
		 * @name         : SearchPopup
		 * @description  : 일자리통계분석(일자리 현황 상세)
		 * @date         : 2018. 10. 31. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * 	2019.05.31 한광희	일자리 현황 조회조건 팝업 화면 변경으로 인한 param 값 추가
		 * @param today
		 */
		SearchPopup : function(ParamLink_id){
			/** 2019.05.31[한광희] 일자리 현황 조회조건 팝업 화면 변경으로 인한 수정 START */
			if(ParamLink_id =="I3111" || ParamLink_id == "I3116") {		// 고용률, 청년실업률
				var that = $ssaJobStatus.ui;
			}
			/** 2020.05.14 [곽제욱] 일자리 증감 피보험자보험 팝업 화면 추가 START */
			else if(ParamLink_id =="E3224") {
				var that = $ssaJobGrowthSearchPopup.ui;				
			}
			/** 2020.05.14 [곽제욱] 일자리 증감 피보험자보험 팝업 화면 추가 END */
			else {
				var that = $ssaJobStatusSearchPopup.ui;				
			}
			/** 2019.05.31[한광희] 일자리 현황 조회조건 팝업 화면 변경으로 인한 수정 END */
			var dataParams = {};
			var slwParams = "";
			
			if (that.SearchParam.Title != ""){
				dataParams.Title = that.SearchParam.Title;
			}
			if (that.SearchParam.SiDo != "" && that.SearchParam.SiDo != null){
				dataParams.SiDo = that.SearchParam.SiDo;
				slwParams += "SiDo=" + that.SearchParam.SiDo + ",";
			}
			if (that.SearchParam.SiDo_nm != "" && that.SearchParam.SiDo_nm != null){
				dataParams.SiDo_nm = that.SearchParam.SiDo_nm;
				slwParams += "SiDo_nm=" + that.SearchParam.SiDo_nm + ",";
			}
			if (that.SearchParam.Link_id != "" && that.SearchParam.Link_id != null){
				dataParams.Link_id = that.SearchParam.Link_id;
				slwParams += "Link_id=" + that.SearchParam.Link_id + ",";
			}
			if (that.SearchParam.Link_nm != "" && that.SearchParam.Link_nm != null){
				dataParams.Link_nm = that.SearchParam.Link_nm;
				slwParams += "Link_nm=" + that.SearchParam.Link_nm + ",";
			}
			if (that.SearchParam.Cx != "" && that.SearchParam.Cx != null){
				dataParams.Cx = that.SearchParam.Cx;
				slwParams += "Cx=" + that.SearchParam.Cx + ",";
			}
			if (that.SearchParam.Cx_nm != "" && that.SearchParam.Cx_nm != null){
				dataParams.Cx_nm = that.SearchParam.Cx_nm;
				slwParams += "Cx_nm=" + that.SearchParam.Cx_nm + ",";
			}
			
			// 2019.03.13 접근log 생성
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '05', '01', '03', '', slwParams);

			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getSsaDetailPopup.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						//콜백에서 사용
						this.DetailData = res.result.DetailData;
						
						if(dataParams.Link_id == "I3116") {
							//청년실업률용 분기 카테고리
							this.Category = res.result.ssaCategoryQuerter;
						}else{
							this.Category = res.result.Category;
						}
						
						this.CurrentDate = res.result.currentDate
						//ui에서 사용
						$ssaDetailPopup.ui.DetailData = this.DetailData;
						$ssaDetailPopup.ui.Category = this.Category;
						$ssaDetailPopup.ui.CurrentDate = this.CurrentDate;
						
						//Box 값 세팅
						var Box_DetailData = [];
						var This_Mon = this.CurrentDate[0].max_prd_de; //max데이터 월 또는 현재 월
						var Last_Mon;  //This_Mon 이전 월	
						//mng_s 이금은 2020.02.26
						if(This_Mon.substring(4,6) == '01'){ 
							Last_Mon= (parseFloat(This_Mon.substring(0,4)) - 1) + '12';
						} else {	
							Last_Mon = parseFloat(This_Mon) - 1;				
						}	
						//mng_e 이금은 2020.02.26
						
						for(var i=0; i<this.DetailData.length; i++){
							if((This_Mon == this.DetailData[i].prd_de && "00" == this.DetailData[i].c1) || (Last_Mon == this.DetailData[i].prd_de && "00" == this.DetailData[i].c1)){
								Box_DetailData.push(this.DetailData[i]);
							}
						}
						
						//현재 월에 데이터 없음
						if(Box_DetailData.length == 0){
							$('div[id="detail_popup"] *').remove();
							
							var listElement = "";
							listElement += '<table border="1">';
							listElement += '<colgroup>';
							listElement += '<col width="100%">';
							listElement += '</colgroup>';
							listElement += '<tbody>';
							listElement += '<tr>';
							listElement += '<td>';
							listElement += '<dl> <dt></dt>';
							listElement += '<dd>0</dd> <span class="job-arrow" id="popup_apc"></span>';
							//listElement += '<dd>0</dd>';
							listElement += '</dl>';
							listElement += '<br>';
							listElement += '<dl> <dt>현재 월 데이터가 없습니다.</dt>';
							listElement += '</dl>';
							listElement += '</td>';
							listElement += '</tr>';
							listElement += '</tbody>';
							listElement += '</table>';
//							listElement += '</ul>';
//							listElement += '</div>';
							$('div[id="detail_popup"]').append(listElement);
							
//							listElement = '<ul>';
							//}
							
						}else{
							var Sum_Dt = "";
							var This_Dt = "";
							var Last_Dt = "";
							
							for(var i = 0; i < Box_DetailData.length; i++) {
								var Prd_de = Box_DetailData[i].prd_de;
								if(Prd_de == This_Mon){
									This_Dt = Box_DetailData[i].dt;
								}else{
									Last_Dt = Box_DetailData[i].dt;
								}
							}
							
							if(Box_DetailData[0].link_id == "I3101" || Box_DetailData[0].link_id == "I3102" || Box_DetailData[0].link_id == "I3103"){
								Sum_Dt  = parseFloat(This_Dt)-parseFloat(Last_Dt);
							}else{
								Sum_Dt  = (parseFloat(This_Dt)-parseFloat(Last_Dt)).toFixed(1);
							}
							
							//Box 하단 조회 정보
							var Box_Title = "(일자리현황/시도";
							
							if(that.SearchParam.Link_nm != ""){
								Box_Title = Box_Title + "/" + that.SearchParam.Link_nm;
							}
							if(that.SearchParam.Cx_nm != ""){
								Box_Title = Box_Title + "/" + that.SearchParam.Cx_nm;
							}
							
							Box_Title = Box_Title + ")"
							
							var listElement = '';
//							var listElement = '<ul>';
							var unit_Nm = Box_DetailData[0].unit_nm;
							
							var valChk = Sum_Dt.toString().indexOf("-");
							var span_Nm = "";
							
							// 2018.12.11	ywKim	추가
							var unitObj = $workRoad.util.getUnitList(unit_Nm);
							var result = $workRoad.util.toNumberString(This_Dt, unitObj);
							var resultSum = $workRoad.util.toNumberString(Sum_Dt, unitObj);
							var tooltipVal = "";
							
							//20181214 손원웅_증감 툴팁 세팅 추가
							var idaSubj = "";
							var idaTitle = "";
							var iadVal = resultSum.value.replace("-","");
							
							//증감 이미지 세팅
							if (Sum_Dt != 0) {
								if(valChk == "-1"){
									span_Nm = "up"
									if(that.SearchParam.Link_id == "I3116"){
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
									if(that.SearchParam.Link_id == "I3116"){
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
	
							$('div[id="detail_popup"] *').remove();
							
							listElement += '<table border="1">';
							listElement += '<colgroup>';
							listElement += '<col width="100%">';
							listElement += '</colgroup>';
							listElement += '<tbody>';
							listElement += '<tr>';
							listElement += '<td>';
							listElement += '<dl> <dt>' + Box_DetailData[0].itm_nm + '</dt>';
							listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="job-arrow '+ span_Nm +'" id="popup_apc"></span>';
//							listElement += '<dd>' + (This_Dt + unit_Nm) +'</dd> <span class="job-arrow '+ span_Nm +'" id="popup_apc"></span>';
							listElement += '</dl>';
							listElement += '<br>';
							listElement += '<dl> <dt>' + Box_Title + '</dt>';
							listElement += '</dl>';
							listElement += '</td>';
							listElement += '</tr>';
							listElement += '</tbody>';
							listElement += '</table>';
//							listElement += '</ul>';
//							listElement += '</div>';
							$('div[id="detail_popup"]').append(listElement);
							
//							listElement = '<ul>';

							if (Sum_Dt != 0) {
								if(that.SearchParam.Link_id == "I3116"){
									$('#popup_apc').attr('data-val', $("#I3116_apc").attr("data-val"));									
								} else {
									$('#popup_apc').attr('data-val', resultSum.text.replace("-",""));									
								}
								$('#popup_apc').attr('data-subj', idaSubj);
								$('#popup_apc').attr('title', idaTitle);
//								$('#popup_apc').attr('data-val', (Sum_Dt.replace('-','') + unit_Nm));
							} else {
								$('#popup_apc').attr('data-val', '');
								$('#popup_apc').attr('title', '');
							}
						}
						
						// 일자리현황 차트 데이터 만들기
						//Chart 값 세팅
						var Chart_DetailData = [];
						
						for(var i=0; i<this.DetailData.length; i++){
							if(this.DetailData[i].link_id == "I3103"){
								if(this.DetailData[i].c1 == "00" && this.DetailData[i].c2 == "00"){
									Chart_DetailData.push(this.DetailData[i]);
								}
							}else{
								if(this.DetailData[i].c1 == "00"){
									Chart_DetailData.push(this.DetailData[i]);
								}
							}
							
						}
						
						var PC_Series = [];
						var data = [];
						var yLabel =  ""; 	//Y축 단위값
						
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
						                     ,this.Category[0].mon11]
						
						for(var i=0; i<arry_Category.length; i++){
							var ChkCnt = 0;
							var Chk_Mon = arry_Category[i];
							if(dataParams.Link_id == "I3116") {
								//청년실업률용 분기 카테고리
								Chk_Mon = Chk_Mon.replace(/년 /g,"0").replace(/분기/g,"");
							}
							for(var k=0; k<Chart_DetailData.length; k++){
								if(Chart_DetailData[k].prd_de == Chk_Mon){
									data.push(parseFloat(Chart_DetailData[k].dt));
									ChkCnt++;
								}
							}
							
							if(ChkCnt == 0){		//해당하는 달에 데이터가 없을 경우 0을 넣어준다.
								data.push(parseFloat(0));
							}
						}
						
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
						if(arry_Category != null && arry_Category.length > 0) This_Mon = arry_Category[arry_Category.length-1].replace(/년 /g,"0").replace(/분기/g,"");
							
						PC_Series.push({
							name: Chart_DetailData[0].itm_nm,
							data: data
						});
						
						//Y축 단위 명칭 변경
						if(this.DetailData[0].link_id == "I3111" || this.DetailData[0].link_id == "I3114" || this.DetailData[0].link_id == "I3116"){
							yLabel = '%';
						}else if(this.DetailData[0].link_id == "I3104" || this.DetailData[0].link_id == "I3112" || this.DetailData[0].link_id == "I3117"){
							yLabel = '천명';
						}else if(this.DetailData[0].link_id == "I3101"){
							yLabel = '호';
						}
						
						$('#ssaDetailChart').highcharts({
							chart: {
								//margin:[20,30,90,80],		// 순서 top, right, bottom, left
								//type : 'column',
							    width: '600',
							    height: '150'
							},
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
							credits: { enabled: false },
							xAxis: {
								gridLineWidth: 1,
								categories: arry_Category,
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
								//title: { text: '갱신주기' }
							},
							yAxis: {
								min: 0, 
								title: { text: ''},
								labels: {
						            formatter: function () {
						                return $workRoad.util.addComma(this.value) + " " + yLabel;
						            }
						        },
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
							}, 
							plotOptions: {								
								series: {
									//allowPointSelect : true,
									//states: { },
						            cursor: 'pointer',
						            point: {
						                events: {						                	
						                    click: function (e) {						                    	
						                    	var lvCategory = this.category;
						                    	//20181211 추가_손원웅
						                    	$ssaDetailPopup.ui.selectDataBoardMap(lvCategory);	//지도
						                    	
						                    	if($ssaJobStatus.ui.SearchParam.Link_id == "I3116") {
						                    		//청년실업률용 분기 카테고리
						                    		lvCategory = lvCategory.replace(/년 /g,"0").replace(/분기/g,"");
						                    	}
						                    	
						                    	if($ssaJobStatus.ui.MapType == "color"){
						                    		$ssaMap.ui.getTodayStatusMapData("", dataParams.sido_cd, "", lvCategory);	//지도 년도 세팅
						                    	}
						                    	$ssaDataBoard.ui.updateTargetAreaChart(lvCategory);	//데이터보드 차트
						                    	$ssaDataBoard.ui.updateTargetAreaTable(lvCategory);		//데이터보드 표
						                    	//데이터보드 정보표시(통계명, 출처, 자료갱신일)
												$workRoad.ui.selectJobStatsDataInfo(dataParams.Link_id
													, function(data) {
//														var title = data.stat_nm + " (" + $workRoad.util.dateWithSign(data.create_dt, ".") + ")";
//														
//														$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
//														$("#ssaDataBoard #ssaTitle").html(title);					// 제목
//														$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
//														$("#ssaDataBoard #ssaArea").html(data.recent_updt_de);		// 자료갱신일

														// 2019.08.22 이금은 this_Mon 으로 변경
														var this_Mon = $workRoad.util.dateWithSign(lvCategory, "."); //max데이터 월 또는 현재 월
														var ssaArea  = "";
														if($ssaJobStatus.ui.SearchParam.Link_id == "I3116"){//청년실업률
															ssaArea = this_Mon.substring(0,4);
															
															var imsi = this_Mon.substring(5,7);
															switch(imsi) {
																case "01":
																	ssaArea += "년 1분기";
																	break;
																case "02":
																	ssaArea += "년 2분기";
																	break;
																case "03":
																	ssaArea += "년 3분기";
																	break;
																case "04":
																	ssaArea += "년 4분기";
																	break;
															}
															
														} else {
															ssaArea = this_Mon;
														}
														var title    = data.stat_nm + " (" + ssaArea + ")";
														$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
														$("#ssaDataBoard #ssaTitle").html(title);					// 제목
														$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
														$("#ssaDataBoard #ssaArea").html(ssaArea);		            // 자료시점
														
													}, function(err) {
														alert(err);
												});	
												
												// 2019.03.13 접근log 생성
												srvLogWrite('D0', '05', '01', '04', '', 'Link_id='+$ssaJobStatus.ui.SearchParam.Link_id);						                    	
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
								enabled: false,
						        align: 'center',
						        verticalAlign: 'bottom',
						        borderWidth: 0
//						        layout: 'vertical',
//						        align: 'right',
//						        verticalAlign: 'middle'
							},
							//credits: {  enabled: false },
							series: PC_Series
							
						});
						
						//데이터보드 정보표시(통계명, 출처, 자료갱신일)
						$workRoad.ui.selectJobStatsDataInfo(this.DetailData[0].link_id
							, function(data) {
//								var title = data.stat_nm + " (" + $workRoad.util.dateWithSign(data.create_dt, ".") + ")";
//								//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
//								
//								$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
//								$("#ssaDataBoard #ssaTitle").html(title);					// 제목
//								$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
//								$("#ssaDataBoard #ssaArea").html(data.recent_updt_de);		// 자료갱신일
															
								// 2019.08.22 이금은 this_Mon 으로 변경
								var this_Mon = $workRoad.util.dateWithSign($ssaDetailPopup.ui.CurrentDate[0].max_prd_de, "."); //max데이터 월 또는 현재 월
								var ssaArea  = "";
								if($ssaJobStatus.ui.SearchParam.Link_id == "I3116"){//청년실업률
									ssaArea = this_Mon.substring(0,4);
									
									var imsi = this_Mon.substring(5,7);
									switch(imsi) {
										case "01":
											ssaArea += "년 1분기";
											break;
										case "02":
											ssaArea += "년 2분기";
											break;
										case "03":
											ssaArea += "년 3분기";
											break;
										case "04":
											ssaArea += "년 4분기";
											break;
									}
									
								} else {
									ssaArea = this_Mon;
								}
								var title    = data.stat_nm + " (" + ssaArea + ")";
								$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
								$("#ssaDataBoard #ssaTitle").html(title);					// 제목
								$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
								$("#ssaDataBoard #ssaArea").html(ssaArea);		            // 자료시점
								
							}, function(err) {
								alert(err);
						});	
						
						//지도 그리기_시작
						//지도 데이터 세팅
						var result = [];
						var resultCnt = 0;
						
						for(var i=0; i<this.DetailData.length; i++){
							if(This_Mon == this.DetailData[i].prd_de && "00" != this.DetailData[i].c1){
								var TmpResult = {};
								TmpResult.adm_cd = this.DetailData[i].c1;
								TmpResult.adm_nm = this.DetailData[i].c1_nm;
								TmpResult.prd_de = this.DetailData[i].prd_de;
								TmpResult.dt = this.DetailData[i].dt;
								
								result[resultCnt++] = TmpResult;
							}
							
						}
						
						var Tmpdata ={ pAdmCd : "00", 
									result : result,
									showData : "dt",
									unit : this.DetailData[0].unit_nm,
						}
						
						$ssaDetailPopup.ui.MapData[0] = Tmpdata;
						$ssaDetailPopup.ui.MapType = $ssaJobStatus.ui.MapType;
						//20181211 손원웅_지도 타입에 따른 에러 임시 수정
						if($ssaJobStatus.ui.MapType == "color"){
							$ssaMap.ui.getTodayStatusMapData("","","");	//년도 세팅
                    	}
						
						$ssaMap.ui.openApiBoundarySido("2016");	//지도 그리기 시작
						
						//데이터보드 차트 카테고리 세팅
						$ssaDetailPopup.ui.DB_Chart_Category = [];
						var Chk_Category_All_List = [];
						var Chk_Category_All_Map = {};
						var Chk_Category = [];
						var Chk_Category_Cnt = 0;
						var Chk_Category_Cnt2 = 0;
						
						for(var i=0; i<this.DetailData.length; i++){
							if(This_Mon == this.DetailData[i].prd_de && "00" != this.DetailData[i].c1){ //20181112 계 삭제
								$ssaDetailPopup.ui.DB_Chart_Category.push(this.DetailData[i].c1_nm);

								var TmpCategory = {};
								TmpCategory.c1_nm = this.DetailData[i].c1_nm;
								TmpCategory.c1 = this.DetailData[i].c1;
								TmpCategory.dt = this.DetailData[i].dt;
								
								$ssaDetailPopup.ui.DB_Chart_Category_CD[Chk_Category_Cnt2++] = TmpCategory;
								
								var TmpResult = {};
								TmpResult.adm_cd = this.DetailData[i].c1;
								TmpResult.adm_nm = this.DetailData[i].c1_nm;
								
								Chk_Category[Chk_Category_Cnt++] = TmpResult;
							}
							
							Chk_Category_All_Map[this.DetailData[i].c1] = this.DetailData[i].c1_nm;
						}
						
						$.each(Chk_Category_All_Map,function(pKey,pValue) {
							$ssaDetailPopup.ui.DB_Chart_Category_All.push({adm_cd : pKey, adm_nm : pValue});
						});

						//데이터보드 표 데이터 세팅
						var TmpMon = [];
						
						for(var i=0; i<arry_Category.length; i++){	//월별로 데이터 뽑기
							var TmpData = [];
							var TmpCnt = 0;
							var lvCategory = arry_Category[i];
	                    	if(dataParams.Link_id == "I3116") {
	                    		//청년실업률용 분기 카테고리
	                    		lvCategory = lvCategory.replace(/년 /g,"0").replace(/분기/g,"");
	                    	}
							for(var j=0; j<this.DetailData.length; j++){
								if(lvCategory == this.DetailData[j].prd_de && "00" != this.DetailData[j].c1){	//20181112 계 삭제
									var TmpResult = {};
									TmpResult.adm_cd = this.DetailData[j].c1;
									TmpResult.adm_nm = this.DetailData[j].c1_nm;
									TmpResult.prd_de = this.DetailData[j].prd_de;
									TmpResult.dt = this.DetailData[j].dt;
									
									TmpData[TmpCnt++] = TmpResult;
								}
							}
							if(TmpCnt > 0){
								TmpMon.push(TmpData);
							}else{
								for(var k=0; k<Chk_Category.length; k++){
									var TmpResult = {};
									TmpResult.adm_cd = Chk_Category[k].adm_cd;
									TmpResult.adm_nm = Chk_Category[k].adm_nm;
									TmpResult.prd_de = lvCategory;
									TmpResult.dt = 0;
									
									TmpData[TmpCnt++] = TmpResult;
								}
								TmpMon.push(TmpData);
							}
						}
						
						$ssaDetailPopup.ui.DataBoardChart = [];	//초기화
						var Tmpdata2 = [];
						var TmpCnt = 0;
						
						for(var i=0; i<TmpMon.length; i++){
							var tmp_arry = [];
							var tmp_arry2 = [];
							for(var j=0; j<TmpMon[i].length; j++){
								tmp_arry.push(parseFloat(TmpMon[i][j].dt));
								tmp_arry2.push(TmpMon[i][j].adm_nm);
							}
							
							if(TmpMon[i].length > 0) {
								var Tmpdata ={ name: TmpMon[i][0].prd_de,
											   data: tmp_arry,
											   category : tmp_arry2
								}
								
								if(TmpCnt > 0){
									Tmpdata2.push(Tmpdata);
	//								Tmpdata2 = Tmpdata2+","+Tmpdata;
								}else{
									Tmpdata2.push(Tmpdata);
	//								Tmpdata2 = Tmpdata;
									TmpCnt++;
								}
							}
						}
						
						$ssaDetailPopup.ui.DataBoardChart = Tmpdata2;
						
						$ssaDataBoard.ui.updateTargetAreaChart(This_Mon);	//차트
						$ssaDataBoard.ui.updateTargetAreaTable(This_Mon);	//테이블
						
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
	};	
	
	$ssaDetailPopup.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				// 닫기 버튼
				$workRoad.event.set("click", "#ssaDetailPopup .topbar a", function() {
					$ssaJobStatus.ui.show();
				});
			},
	}
}(window, document)); 