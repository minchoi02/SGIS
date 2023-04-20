/**
 * 경제상황 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 경제상황 상세팝업
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
	W.$ssaEconomicSituationDetailPopup = W.$ssaEconomicSituationDetailPopup || {};
	
	$ssaEconomicSituationDetailPopup.ui = {
		pSelector	: "#ssaEconomicSituationDetailPopup",
		DetailData : [],
		DetailDataChart : [], //데이터보드 차트
		Category : [],		//차트 데이터
		MapData : [],		//지도 데이터
		MapType : "",
		DataBoardCategory : [],
		DataBoardChart : [],
		DataBoardTable : [], //invert용
		DB_Chart_Category : [],
		CurrentDate : [],
		
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
			this.SearchPopupData();
			this.SearchPopupChart();
			this.SearchPopupMap();
			
			$workRoad.event.setToolTip(".job-arrow");
			
			//선택된 지도에 맞춰서 데이터 적용.
			var listElement = '';
			if ($ssaMap.ui.curMapId == "0") {
				$('span[id="wrmSubTitle1"] *').remove();
				listElement += '<span id="wrmSubTitle1" style="line-height:35px; font-weight:bold;"></span>';
				listElement += '<input type="hidden" id="wrmSubTitle1DetailPopup" value="ssaEconomicSituationDetailPopup">';
				$('span[id="wrmSubTitle1"]').append(listElement);
			}else if ($ssaMap.ui.curMapId == "1") {
				$('span[id="wrmSubTitle2"] *').remove();
				listElement += '<span id="wrmSubTitle2" style="line-height:35px; font-weight:bold;"></span>';
				listElement += '<input type="hidden" id="wrmSubTitle2DetailPopup" value="ssaEconomicSituationDetailPopup">';
				$('span[id="wrmSubTitle2"]').append(listElement);
			}else if ($ssaMap.ui.curMapId == "2"){
				$('span[id="wrmSubTitle3"] *').remove();
				listElement += '<span id="wrmSubTitle3" style="line-height:35px; font-weight:bold;"></span>';
				listElement += '<input type="hidden" id="wrmSubTitle3DetailPopup" value="ssaEconomicSituationDetailPopup">';
				$('span[id="wrmSubTitle3"]').append(listElement);
			}else{
				$('span[id="wrmSubTitle"] *').remove();
				listElement += '<span id="wrmSubTitle" style="line-height:35px; font-weight:bold;"></span>';
				$('span[id="wrmSubTitle"]').append(listElement);
			}
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
			//DataBoard & Map 값 세팅
			var result = [];
			var resultCnt = 0;
			
			//선택된 지도에 맞춰서 데이터 적용.
			var listElement = '';
			if ($ssaMap.ui.curMapId == "0") {
				$('span[id="wrmSubTitle1"] *').remove();
				listElement += '<span id="wrmSubTitle1" style="line-height:35px; font-weight:bold;">'+param+'</span>';
				listElement += '<input type="hidden" id="wrmSubTitle1DetailPopup" value="ssaEconomicSituationDetailPopup">';
				$('span[id="wrmSubTitle1"]').append(listElement);
			}else if ($ssaMap.ui.curMapId == "1") {
				$('span[id="wrmSubTitle2"] *').remove();
				listElement += '<span id="wrmSubTitle2" style="line-height:35px; font-weight:bold;">'+param+'</span>';
				listElement += '<input type="hidden" id="wrmSubTitle2DetailPopup" value="ssaEconomicSituationDetailPopup">';
				$('span[id="wrmSubTitle2"]').append(listElement);
			}else if ($ssaMap.ui.curMapId == "2"){
				$('span[id="wrmSubTitle3"] *').remove();
				listElement += '<span id="wrmSubTitle3" style="line-height:35px; font-weight:bold;">'+param+'</span>';
				listElement += '<input type="hidden" id="wrmSubTitle3DetailPopup" value="ssaEconomicSituationDetailPopup">';
				$('span[id="wrmSubTitle3"]').append(listElement);
			}else{
				$('span[id="wrmSubTitle"] *').remove();
				listElement += '<span id="wrmSubTitle" style="line-height:35px; font-weight:bold;"></span>';
				$('span[id="wrmSubTitle"]').append(listElement);
			}
			
			//지도데이터 생성시 adm_cd, adm_nm은 지도표출 키값
			for(var i=0; i<this.DetailData.length; i++){
				if(this.DetailData[i].c1 != "00" && this.DetailData[i].prd_de == param){
					var TmpResult = {};
					TmpResult.adm_cd = this.DetailData[i].c1;
					TmpResult.adm_nm = this.DetailData[i].c1_nm;
					TmpResult.prd_de = this.DetailData[i].prd_de;
					TmpResult.dt = this.DetailData[i].dt;
					
					result[resultCnt++] = TmpResult;
				}
			}
			
			console.log("selectDataBoardMap - result : " + JSON.stringify(result));
			
			// 2020.7.23 [곽제욱] 단위 null 일 경우 공백 처리 START
			if(this.DetailData[0].unit_nm==null){
				this.DetailData[0].unit_nm="";
			}
			// 2020.7.23 [곽제욱] 단위 null 일 경우 공백 처리 END

			var Tmpdata = { pAdmCd : "00", 
							result : result,
							showData : "dt",
							unit : this.DetailData[0].unit_nm,
						  }
			
			$ssaEconomicSituationDetailPopup.ui.MapData[0] = Tmpdata;
			$ssaEconomicSituationDetailPopup.ui.MapType = $ssaEconomicSituation.ui.MapType;
			$ssaMap.ui.ssaEconomicSituationOpenApiBoundarySido("2016");	//최신년도 데이터가 2016...
		},
		
		/**
		 * @name         : SearchPopupData
		 * @description  : 일자리통계분석(지표상세)
		 * @date         : 2018. 10. 31. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		SearchPopupData : function(){
			var that = $ssaEconomicSituation.ui;
			var dataParams = {};
			var slwParams = "";
			
			console.log("SearchPopupData - that.SearchParam : " + JSON.stringify(that.SearchParam));
			
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
			srvLogWrite('D0', '05', '04', '03', '', slwParams);
			
//			console.log("SearchPopupData - dataParams : " + JSON.stringify(dataParams));
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsEconomicSituationDetail.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						//콜백에서 사용
						this.DetailData = res.result.DetailData;
						
						//데이터에 따른 카테고리 설정
						//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
						if(this.DetailData[0].link_id == "I3401" || this.DetailData[0].link_id == "I3402" || this.DetailData[0].link_id == "I3405" || this.DetailData[0].link_id == "I3406"){
							this.Category = res.result.yearCategory;
						}else {
							this.Category = res.result.monthCategory;
						}
						
						this.CurrentDate = res.result.currentDate;
						
						//ui에서 사용
						$ssaEconomicSituationDetailPopup.ui.DetailData = this.DetailData;
						$ssaEconomicSituationDetailPopup.ui.Category = this.Category;
						$ssaEconomicSituationDetailPopup.ui.CurrentDate = this.Category;
						
//						console.log("SearchPopupData - DetailData : " + JSON.stringify(this.DetailData));
						console.log("SearchPopupData - Category : " + JSON.stringify(this.Category));
//						console.log("SearchPopupData - CurrentDate : " + JSON.stringify(this.CurrentDate));
						
						//Box 값 세팅
						var Box_DetailData = [];
						var This_Mon = this.CurrentDate[0].max_prd_de; //max데이터 월 또는 현재 월
						var Last_Mon = parseFloat(This_Mon) - 1; //This_Mon 이전 월
						
						//20190307 손원웅 추가_매년 1월일 경우 Last_Mon 잘못 세팅 되는부분 수정
						var Lr = Last_Mon.toString().substring(4,6);
						var Ll = Last_Mon.toString().substring(0,4);
						Ll = Number(Ll) - 1;
						
						if(Lr == 00){
							Last_Mon = Ll + "12";
						};
						
						for(var i=0; i<this.DetailData.length; i++){
							//if((This_Mon == this.DetailData[i].prd_de && "00" == this.DetailData[i].c1) || (Last_Mon == this.DetailData[i].prd_de && "00" == this.DetailData[i].c1)){
								Box_DetailData.push(this.DetailData[i]);
							//}
						}
						
//						console.log("SearchPopupData - Box_DetailData : " + JSON.stringify(Box_DetailData));
						
						//현재 월에 데이터 없음
						if(Box_DetailData.length == 0){
							$('div[id="ssaEconomicSituationDetail_popup"] *').remove();
							
							var listElement = '';
							listElement += '<table border="1">';
							listElement += '<colgroup>';
							listElement += '<col width="100%">';
							listElement += '</colgroup>';
							listElement += '<tbody>';
							listElement += '<tr>';
							listElement += '<td>';
							listElement += '<dl> <dt>' + that.SearchParam.Link_nm + '</dt>';
							listElement += '<dd>0</dd> <span class="job-arrow" id="popup_apc"></span>';
							listElement += '</dl>';
							listElement += '<br>';
							listElement += '<dl> <dt>현재 월 데이터가 없습니다.</dt>';
							listElement += '</dl>';
							listElement += '</td>';
							listElement += '</tr>';
							listElement += '</tbody>';
							listElement += '</table>';
							listElement += '</div>';
							$('div[id="ssaEconomicSituationDetail_popup"]').append(listElement);
							
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
							var Box_Title = "(경제상황/시도";
							
							if(that.SearchParam.Link_nm != ""){
								Box_Title = Box_Title + "/" + that.SearchParam.Link_nm;
							}
							if(that.SearchParam.Cx_nm != ""){
								Box_Title = Box_Title + "/" + that.SearchParam.Cx_nm;
							}
							
							Box_Title = Box_Title + ")"
							
							var listElement = '';
							var Val = Box_DetailData[0].dt; //지표 값
							var link_ID = Box_DetailData[0].link_id; //지표ID
							var link_Nm = Box_DetailData[0].itm_nm; //지표명
							var unit_Nm = Box_DetailData[0].unit_nm; //단위명
							var Val_apc = Box_DetailData[0].pre_dt; //이전 월(년) 데이터
							
							var valChk = Sum_Dt.toString().indexOf("-");
							var span_Nm = "";
							
							//지표 상승,하락 구분처리 및 단위 세팅
							var unitObj = $workRoad.util.getUnitList(unit_Nm);
//							var unitObj = {};
//							unitObj.points = [0,3,6]; 
//							unitObj.units = ["개","천개","백만개"];
//							unitObj.compareOperation = "-";
							unitObj.compareValue = Val_apc; // ★★★★  요기 값을 변경해야 함.  ★★★★
							var result = $workRoad.util.toNumberString(Val, unitObj);
							
							//20181214 손원웅_증감 툴팁 세팅 추가
							var idaSubj = "";
							var idaTitle = "";
							
							// 2020.7.23 [곽제욱] 단위 null 일 경우 공백 처리 START
							if(unit_Nm == null) {
								unit_Nm = '';
							}
							// 2020.7.23 [곽제욱] 단위 null 일 경우 공백 처리 END
							
							if(result.iconClass == "up"){
								if(link_ID == "I3401" || link_ID == "I3402"){
									//연도
									idaSubj = "전 연도 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 증가";
								}else{
									//월
									idaSubj = "전 월 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 증가";
								}
							}else if(result.iconClass == "down"){
								if(link_ID == "I3401" || link_ID == "I3402"){
									//연도
									idaSubj = "전 연도 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 감소";
								}else{
									//월
									idaSubj = "전 월 대비 ";
									idaTitle = result.iconValue + unit_Nm + " 감소";
								}
							}
	
							$('div[id="ssaEconomicSituationDetail_popup"] *').remove();
							
							listElement += '<table border="1">';
							listElement += '<colgroup>';
							listElement += '<col width="100%">';
							listElement += '</colgroup>';
							listElement += '<tbody>';
							listElement += '<tr>';
							listElement += '<td>';
							listElement += '<dl> <dt>' + link_Nm + '</dt>';
							//listElement += '<dd>' + (This_Dt + unit_Nm) +'</dd> <span class="job-arrow '+ span_Nm +'" id="popup_apc"></span>';
							//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. START
							if(link_ID == 'I3405' || link_ID == 'I3406'){
								listElement += '<dd title="' + result.value + '" style="text-align:left;">' + result.text + '</dd> <span class="ssaEconomicSituationDetailPopup job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
							}
							else {
								listElement += '<dd title="' + result.value + '">' + result.text + '</dd> <span class="ssaEconomicSituationDetailPopup job-arrow '+ result.iconClass +'" id='+ link_ID+"_apc" +'></span>';
							}
							//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. END
							listElement += '</dl>';
							listElement += '<br>';
							listElement += '<dl> <dt>' + Box_Title + '</dt>';
							listElement += '</dl>';
							listElement += '</td>';
							listElement += '</tr>';
							listElement += '</tbody>';
							listElement += '</table>';
							listElement += '</div>';
							$('div[id="ssaEconomicSituationDetail_popup"]').append(listElement);
							
							
							$('#ssaEconomicSituationDetailPopup #'+link_ID+'_apc').attr('data-val', result.iconText);
							$('#ssaEconomicSituationDetailPopup #'+link_ID+'_apc').attr('data-subj', idaSubj);
							$('#ssaEconomicSituationDetailPopup #'+link_ID+'_apc').attr('title', idaTitle);
							//$('#popup_apc').attr('ssaval', (Sum_Dt + unit_Nm));
							//$('#popup_apc').attr('ssaval', (Box_DetailData[0].dt + unit_Nm));
						}
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		
		/**
		 * @name         : SearchPopupChart
		 * @description  : 일자리통계분석(차트상세)
		 * @date         : 2018. 10. 31. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		SearchPopupChart : function(){
			var that = $ssaEconomicSituation.ui;
			var dataParams = {};
			
//			console.log("SearchPopupChart - that.SearchParam : " + JSON.stringify(that.SearchParam));
			
			if (that.SearchParam.Title != ""){
				dataParams.Title = that.SearchParam.Title;
			}
			if (that.SearchParam.SiDo != ""){
				dataParams.SiDo = that.SearchParam.SiDo;
			}
			if (that.SearchParam.SiDo_nm != ""){
				dataParams.SiDo_nm = that.SearchParam.SiDo_nm;
			}
			if (that.SearchParam.Link_id != ""){
				dataParams.Link_id = that.SearchParam.Link_id;
			}
			if (that.SearchParam.Link_nm != ""){
				dataParams.Link_nm = that.SearchParam.Link_nm;
			}
			if (that.SearchParam.Cx != ""){
				dataParams.Cx = that.SearchParam.Cx;
			}
			if (that.SearchParam.Cx_nm != ""){
				dataParams.Cx_nm = that.SearchParam.Cx_nm;
			}
			
//			console.log("SearchPopupChart - dataParams : " + JSON.stringify(dataParams));
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsEconomicSituationDetailChart.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						//콜백에서 사용
						this.DetailData = res.result.DetailData;
						
						console.log("dataParams.link_id : " + JSON.stringify(dataParams.link_id));
						
						//데이터에 따른 카테고리 설정
						//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
						if(this.DetailData[0].link_id == "I3401" || this.DetailData[0].link_id == "I3402" || this.DetailData[0].link_id == "I3405" || this.DetailData[0].link_id == "I3406"){
							this.Category = res.result.yearCategory;
						}else {
							this.Category = res.result.monthCategory;
						}
						//ui에서 사용
						$ssaEconomicSituationDetailPopup.ui.DetailData = this.DetailData;
						$ssaEconomicSituationDetailPopup.ui.Category = this.Category;
						
//						console.log("SearchPopupChart - DetailData : " + JSON.stringify(this.DetailData));
//						console.log("SearchPopupChart - Category : " + JSON.stringify(this.Category));
						
						
						//차트 데이터 만들기
						//Chart 값 세팅
						var Chart_DetailData = [];
						
						for(var i=0; i<this.DetailData.length; i++){
							//if(this.DetailData[i].c1 == "00"){
								Chart_DetailData.push(this.DetailData[i]);
							//}
						}
						
//						console.log("SearchPopupChart - Chart_DetailData : " + JSON.stringify(Chart_DetailData));
						
						var PC_Series = [];
						var data = [];
						
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
//						console.log("SearchPopupChart - arry_Category : " + JSON.stringify(arry_Category));
						/*
						for(var i=0; i<arry_Category.length; i++){
							var ChkCnt = 0;
							var Chk_Mon = arry_Category[i];
							for(var k=0; k<Chart_DetailData.length; k++){
								if(Chart_DetailData[k].prd_de == Chk_Mon){
									data.push(parseFloat(Chart_DetailData[k].dt));
									ChkCnt++;
								}
							}
							
							if(ChkCnt == 0){
								data.push(parseFloat(0));
							}
						}*/
						
						var PushNm = "";	//PC_Series 에 담아줄 name
						var yLabel =  ""; 	//Y축 단위값
						
						//for(var i=0; i<$ssaJobStatus.ui.ssaJobStatusList.length; i++){
						//	var link_id = $ssaJobStatus.ui.ssaJobStatusList[i];
							
							/*if(i > 0){
								PC_Series.push({
									name: PushNm,
									data: data
								});
								data = [];
							}*/
							for(var j=0; j<this.DetailData.length; j++){
							var chart_link_id = this.DetailData[j].link_id;
								//if(link_id == chart_link_id){
									PushNm = this.DetailData[j].link_nm;
									
									for(var k=1; k<13; k++){
										if(data.length < 12){
											data.push(parseFloat(this.DetailData[j]["mon"+k]));
										}else{
											if(this.DetailData[j]["mon"+k] != 0){
												data.splice((k-1),1,(parseFloat(this.DetailData[j]["mon"+k])));
											}
										}
									}
								//}
							}
						//}
							
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
						
//						console.log("SearchPopupChart - data : " + JSON.stringify(data));
						
						/*PC_Series.push({
							name: Chart_DetailData[0].itm_nm,
							data: data
						});*/
						
						PC_Series.push({
							name: PushNm,
							data: data
						});
						
						//Y축 단위 명칭 변경
//						20190314 손원웅 수정_소비자물가지수 지표 정보 변경
//						if(this.DetailData[0].link_id == "I3401" || this.DetailData[0].link_id == "I3403"){
						if(this.DetailData[0].link_id == "I3401"){
							yLabel = '%';
						}else if(this.DetailData[0].link_id == "I3402"){
							yLabel = '백만원';
						}else if(this.DetailData[0].link_id == "I3404" || this.DetailData[0].link_id == "I3403"){
							yLabel = '';
						}else if(this.DetailData[0].link_id == "I3405" || this.DetailData[0].link_id == "I3406"){
							//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
							yLabel = '백만달러';
						}
						
//						console.log("SearchPopupChart - PC_Series : " + JSON.stringify(PC_Series));
						
						$('#ssaEconomicSituationDetailChart').highcharts({
							chart: {
								//margin:[20,30,90,80],		// 순서 top, right, bottom, left
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
							xAxis: {
								gridLineWidth: 1,
								categories: arry_Category,
								title: { text: '' },
								lineWidth: 1,
								lineColor: "#000000",
								tickWidth: 0
							},
							yAxis: {
								//min: 0,
								softMin: 0,
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
						            cursor: (dataParams.Link_id == "I3401" || dataParams.Link_id == "I3402" || dataParams.Link_id == "I3403" || dataParams.Link_id == "I3405" || dataParams.Link_id == "I3406") ? 'pointer' : "",
						            point: {
						                events: {						                	
						                    click: function (e) {						                    	
						                    	console.log(this.series.name + " / " + this.series.index + " / " + e.currentTarget.index + " / " + e.point.series.index + " / " + this.series.data.name+"/"+this.category);
						                    	var lvCategory = this.category;
						                    	
						                    	//데이터보드 차트 카테고리 세팅
												$ssaEconomicSituationDetailPopup.ui.DB_Chart_Category = [];
												for(var i=0; i<$ssaEconomicSituationDetailPopup.ui.DetailData.length; i++){
													if(this.category == $ssaEconomicSituationDetailPopup.ui.DetailData[i].prd_de){
														var c1_nm = ""+$ssaEconomicSituationDetailPopup.ui.DetailData[i].c1_nm;
														$ssaEconomicSituationDetailPopup.ui.DB_Chart_Category.push(c1_nm);
													}
												}
						                    	
												//지도에 표시할 데이터가 없는 지표인 경우 이전에 조회된 지도의 정보 초기화 처리
//												20190314 손원웅 수정_소비자물가지수 지표 정보 변경
//												if(dataParams.Link_id == "I3401" || dataParams.Link_id == "I3402" || dataParams.Link_id == "I3403" || dataParams.Link_id == "I3405" || dataParams.Link_id == "I3406"){
												//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 START
												if(dataParams.Link_id == "I3401" || dataParams.Link_id == "I3402" || dataParams.Link_id == "I3405" || dataParams.Link_id == "I3406"
													 || dataParams.Link_id == "I3404"){
												//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 END	
													$ssaEconomicSituationDetailPopup.ui.selectDataBoardMap(this.category);
//													20190311 손원웅 추가_지도 연도 세팅
													$ssaMap.ui.getTodayStatusMapData("", dataParams.sido_cd, "", this.category);
//												} else if(dataParams.Link_id == "I3404"){
												//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 START
												} else if(dataParams.Link_id == "I3403"){
												//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 END
						                    		return;
						                    	}
						                    	
						                    	$ssaDataBoard.ui.updateTargetAreaEconomicSituationChart(this.category);	//데이터보드 차트
						                    	$ssaDataBoard.ui.updateTargetAreaEconomicSituationTable(this.category);	//데이터보드 표
						                    	
						                    	//데이터보드 정보표시(통계명, 출처, 자료갱신일)
												$workRoad.ui.selectJobStatsDataInfo($ssaEconomicSituation.ui.SearchParam.Link_id
													, function(data) {
//														var title = data.stat_nm + " (" + $workRoad.util.dateWithSign(data.create_dt, ".") + ")";
//														//var sido_nm = ($wrmTodayStatus.ui.sido_nm.length > 0) ? $wrmTodayStatus.ui.sido_nm : "전국";
//														
//														$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
//														$("#ssaDataBoard #ssaTitle").html(title);					// 제목
//														$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
//														$("#ssaDataBoard #ssaArea").html(data.recent_updt_de);		// 자료갱신일
//														
//														console.log("SearchPopupMap - DataInfo data : " + JSON.stringify(data));

														// 2019.08.22 이금은 this_Mon 으로 변경
														var this_Mon = $workRoad.util.dateWithSign(lvCategory, "."); //max데이터 월 또는 현재 월
														var title    = data.stat_nm + " (" + this_Mon + ")";
														$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
														$("#ssaDataBoard #ssaTitle").html(title);					// 제목
														$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
														$("#ssaDataBoard #ssaArea").html(this_Mon);		            // 자료시점
														
													}, function(err) {
														alert(err);
												});
												
												// 2019.03.13 접근log 생성
												srvLogWrite('D0', '05', '04', '04', '', 'Link_id='+dataParams.Link_id);


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
							credits: {  enabled: false },
							series: PC_Series
							
						});
						/*
						//지도 그리기_시작
						//지도 데이터 세팅
						var result = [];
						var resultCnt = 0;
						var This_Mon = this.Category[0].mon9	//나중에 mon11 으로 변경(현재 월)
						var Last_Mon = this.Category[0].mon8	//나중에 mon10 으로 변경(이전 달)
						
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
						
						$ssaEconomicSituationDetailPopup.ui.MapData[0] = Tmpdata;
						
						$ssaMap.ui.openApiBoundarySido("2016");	//최신년도 데이터가 2016...
						//*/
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
		 * @name         : SearchPopupMap
		 * @description  : 일자리통계분석(상세)
		 * @date         : 2018. 10. 31. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 */
		SearchPopupMap : function(){
			var that = $ssaEconomicSituation.ui;
			var dataParams = {};
			
			console.log("SearchPopupMap - that.SearchParam : " + JSON.stringify(that.SearchParam));
			
			if (that.SearchParam.Title != ""){
				dataParams.Title = that.SearchParam.Title;
			}
			if (that.SearchParam.SiDo != ""){
				dataParams.SiDo = that.SearchParam.SiDo;
			}
			if (that.SearchParam.SiDo_nm != ""){
				dataParams.SiDo_nm = that.SearchParam.SiDo_nm;
			}
			if (that.SearchParam.Link_id != ""){
				dataParams.Link_id = that.SearchParam.Link_id;
			}
			if (that.SearchParam.Link_nm != ""){
				dataParams.Link_nm = that.SearchParam.Link_nm;
			}
			if (that.SearchParam.Cx != ""){
				dataParams.Cx = that.SearchParam.Cx;
			}
			if (that.SearchParam.Cx_nm != ""){
				dataParams.Cx_nm = that.SearchParam.Cx_nm;
			}
			
			console.log("SearchPopupMap - dataParams : " + JSON.stringify(dataParams));
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getStatsAnlsEconomicSituationMainDataBoard.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						//콜백에서 사용
						this.DetailDataChart = res.result.DetailDataChart;
						this.DetailData = res.result.DetailData;
						//데이터에 따른 카테고리 설정
						//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정.
						if(this.DetailData[0].link_id == "I3401" || this.DetailData[0].link_id == "I3402" || this.DetailData[0].link_id == "I3405" || this.DetailData[0].link_id == "I3406"){
							this.Category = res.result.yearCategory;
						}else {
							this.Category = res.result.monthCategory;
						}
						this.CurrentDate = res.result.currentDate;
						
						//ui에서 사용
						$ssaEconomicSituationDetailPopup.ui.DetailDataChart = this.DetailDataChart;
						$ssaEconomicSituationDetailPopup.ui.DetailData = this.DetailData;
						$ssaEconomicSituationDetailPopup.ui.Category = this.Category;
						$ssaEconomicSituationDetailPopup.ui.CurrentDate = this.CurrentDate;
						
						console.log("SearchPopupMap - DetailDataChart : " + JSON.stringify(this.DetailDataChart));
						console.log("SearchPopupMap - DetailData : " + JSON.stringify(this.DetailData));
						console.log("SearchPopupMap - Category : " + JSON.stringify(this.Category));
						console.log("SearchPopupMap - CurrentDate : " + JSON.stringify(this.CurrentDate));
						
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
//								
//								console.log("SearchPopupMap - DataInfo data : " + JSON.stringify(data));
							
							// 2019.08.22 이금은 this_Mon 으로 변경
							var this_Mon = $workRoad.util.dateWithSign($ssaEconomicSituationDetailPopup.ui.CurrentDate[0].max_prd_de, "."); //max데이터 월 또는 현재 월
							var title    = data.stat_nm + " (" + this_Mon + ")";
							$("#ssaDataBoard #ssaStatPath").html(data.stat_path);
							$("#ssaDataBoard #ssaTitle").html(title);					// 제목
							$("#ssaDataBoard #ssaOrigin").html(data.colct_source);		// 출처
							$("#ssaDataBoard #ssaArea").html(this_Mon);		            // 자료시점
							
							}, function(err) {
								alert(err);
						});
						
						var This_Mon = this.CurrentDate[0].max_prd_de; //max데이터 월 또는 현재 월
						var Last_Mon = parseFloat(This_Mon) - 1; //This_Mon 이전 월
						
						//*
						//지도 그리기_시작
						//지도 데이터 세팅
						var result = [];
						var resultCnt = 0;
						//var This_Mon = this.Category[0].mon9	//나중에 mon11 으로 변경(현재 월)
						//var Last_Mon = this.Category[0].mon8	//나중에 mon10 으로 변경(이전 달)
						
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
						
						// 2020.7.23 [곽제욱] 단위 null 일 경우 공백 처리 START
						if(this.DetailData[0].unit_nm==null){
							this.DetailData[0].unit_nm="";
						}
						// 2020.7.23 [곽제욱] 단위 null 일 경우 공백 처리 END
						
						var Tmpdata ={ pAdmCd : "00", 
									result : result,
									showData : "dt",
									unit : this.DetailData[0].unit_nm,
						}
						console.log("SearchPopupMap - Tmpdata : " + JSON.stringify(Tmpdata));	
						
						$ssaEconomicSituationDetailPopup.ui.MapData[0] = Tmpdata;
						
						//지도에 표시할 데이터가 없는 지표인 경우 이전에 조회된 지도의 정보 초기화 처리
//						20190314 손원웅 수정_소비자물가지수 지표 정보 변경
//						if(dataParams.Link_id == "I3401" || dataParams.Link_id == "I3402" || dataParams.Link_id == "I3403" || dataParams.Link_id == "I3405" || dataParams.Link_id == "I3406"){
						//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 START
						if(dataParams.Link_id == "I3401" || dataParams.Link_id == "I3402" || dataParams.Link_id == "I3405" || dataParams.Link_id == "I3406"
							 || dataParams.Link_id == "I3404"){
						//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 END
//							20190311 손원웅 추가_지도 연도 세팅
							$ssaMap.ui.getTodayStatusMapData("","","",This_Mon);	//지도 연도 세팅
							$ssaMap.ui.ssaEconomicSituationOpenApiBoundarySido("2016");	//최신년도 데이터가 2016...
//						} else if(dataParams.Link_id == "I3404"){
						//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 START
						} else if(dataParams.Link_id == "I3403"){
						//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 END
                    		console.log("SearchPopupMap - $ssaMap.ui.doClearMap(1) START");
                    		//$ssaMap.ui.ssaJobGrowthOpenApiBoundarySido("2016");	//최신년도 데이터가 2016...	
                    		//setTimeout(function() {
                    		$ssaMap.ui.clearLayer();
                    		//}, 1000);
                    		console.log("SearchPopupMap - $ssaMap.ui.doClearMap(1) END");
                    	}
						
						
						//데이터보드 차트 카테고리 세팅
						$ssaEconomicSituationDetailPopup.ui.DB_Chart_Category = [];
						var Chk_Category = [];
						var Chk_Category_Cnt = 0;
						
						for(var i=0; i<this.DetailData.length; i++){
							if(This_Mon == this.DetailData[i].prd_de){
								$ssaEconomicSituationDetailPopup.ui.DB_Chart_Category.push(this.DetailData[i].c1_nm);
								var TmpResult = {};
								TmpResult.adm_cd = this.DetailData[i].c1;
								TmpResult.adm_nm = this.DetailData[i].c1_nm;
								
								Chk_Category[Chk_Category_Cnt++] = TmpResult;
							}
						}
						
						console.log("SearchPopupMap - DB_Chart_Category : " + JSON.stringify($ssaEconomicSituationDetailPopup.ui.DB_Chart_Category));
						console.log("SearchPopupMap - Chk_Category : " + JSON.stringify(Chk_Category));
						//데이터보드 차트 데이터 세팅
						var TmpMon = [];
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
						
						
						for(var i=0; i<arry_Category.length; i++){	//월별로 데이터 뽑기
							var TmpData = [];
							var TmpCnt = 0;
							for(var j=0; j<this.DetailData.length; j++){
								if(arry_Category[i] == this.DetailData[j].prd_de){
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
									TmpResult.prd_de = arry_Category[i];
									TmpResult.dt = 0;
									
									TmpData[TmpCnt++] = TmpResult;
								}
								TmpMon.push(TmpData);
							}
						}
						
						console.log("TmpMon : " + JSON.stringify(TmpMon));
						
						$ssaEconomicSituationDetailPopup.ui.DataBoardChart = [];	//초기화
						var Tmpdata2 = [];
						var TmpCnt = 0;
						
						for(var i=0; i<TmpMon.length; i++){
							var tmp_arry = [];
							var tmp_arry2 = [];
							for(var j=0; j<TmpMon[i].length; j++){
								tmp_arry.push(parseFloat(TmpMon[i][j].dt));
								tmp_arry2.push(TmpMon[i][j].adm_nm);
							}
							
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
						
						console.log("Tmpdata2 : " + JSON.stringify(Tmpdata2));
						
						$ssaEconomicSituationDetailPopup.ui.DataBoardChart = Tmpdata2;
						
						
						/***********************************************
						 *시도정보가 없을 경우 데이터보드 차트 및 테이블 표출 방식 분기*
						 ***********************************************/
						//생활물가지수
//						20190314 손원웅 수정_소비자물가지수 지표 정보 변경
//						if(this.DetailData[0].link_id == "I3404"){
						//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 START
						if(this.DetailData[0].link_id == "I3403"){
						//2020-04-22 [곽제욱] KOSIS 연계로 인하여 생활물가지수 Map 표출 END
							console.log("if문 분기 중 if 진입 : " + JSON.stringify(this.DetailData[0].link_id));
							
							
							//데이터보드 차트 카테고리 세팅
							$ssaEconomicSituationDetailPopup.ui.DB_Chart_Category = [];
							var Chk_Category = [];
							var Chk_Category_Cnt = 0;
							var data = []; //
							
							//2개 다 사용중 추후 정리 필요
							//데이터 존재하는것 만 담기는 for문
							for(var i=0; i<this.DetailData.length; i++){
								if(This_Mon == this.DetailData[i].prd_de){
									$ssaEconomicSituationDetailPopup.ui.DB_Chart_Category.push(this.DetailData[i].itm_nm);
								}
								
								var TmpResult = {};
								
								Chk_Category.push(this.DetailData[i].dt);
							}
							
							//데이터 존재여부 상관없이 1년치 데이터 담기는 for문
							for(var j=0; j<this.DetailDataChart.length; j++){
								var chart_link_id = this.DetailDataChart[j].link_id;
								PushNm = this.DetailDataChart[j].link_nm;
								
								for(var k=1; k<13; k++){
									if(data.length < 12){
										data.push(parseFloat(this.DetailDataChart[j]["mon"+k]));
									}else{
										if(this.DetailDataChart[j]["mon"+k] != 0){
											data.splice((k-1),1,(parseFloat(this.DetailDataChart[j]["mon"+k])));
										}
									}
								}
							}
							
							console.log("DB_Chart_Category : " + JSON.stringify($ssaEconomicSituationDetailPopup.ui.DB_Chart_Category));
							console.log("Chk_Category : " + JSON.stringify(Chk_Category));
							//데이터보드 차트 데이터 세팅
							var TmpMon = [];
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
							
							//데이터보드 차트에서 사용될 Y축 정보
							$ssaEconomicSituationDetailPopup.ui.DataBoardCategory = arry_Category;
							
							var TmpData = [];
							
							for(var i=0; i<arry_Category.length; i++){	//월별로 데이터 뽑기
								
								var TmpCnt = 0;
								for(var j=0; j<this.DetailData.length; j++){
									if(arry_Category[i] == this.DetailData[j].prd_de){
										var TmpResult = {};
										//TmpResult.adm_cd = this.DetailDataChart[j].c1;
										//TmpResult.adm_nm = this.DetailDataChart[j].c1_nm;
										TmpResult.name = this.DetailData[j].prd_de;
										TmpResult.data = this.DetailData[j].dt;
										
										TmpData.push(TmpResult);
										TmpCnt++;
									}
								}
								//2019-01-23 (125~128) 데이터 없는거 차트에서 제거.
								if(TmpCnt == 0) {
									TmpData.push({
										name : arry_Category[i],
										data : 0
									});
								}
								
								/*var table_name = [];
								var table_data = [];
								
								//데이터 존재여부 상관없이 1년치 데이터 담기는 for문
								for(var j=0; j<this.DetailDataChart.length; j++){
									var chart_link_id = this.DetailDataChart[j].link_id;
									PushNm = this.DetailDataChart[j].link_nm;
									
									for(var k=1; k<13; k++){
										if(table_data.length < 12){
											table_name.push(this.DetailDataChart[j].prd_de);
											table_data.push(parseFloat(this.DetailDataChart[j]["mon"+k]));
										}else{
											if(this.DetailDataChart[j]["mon"+k] != 0){
												table_name.push(this.DetailDataChart[j].prd_de);
												table_data.splice((k-1),1,(parseFloat(this.DetailDataChart[j]["mon"+k])));
											}
										}
									}
								}*/
							}
							console.log("TmpData : " + JSON.stringify(TmpData));
							
							$ssaEconomicSituationDetailPopup.ui.DataBoardChart = data;
							$ssaEconomicSituationDetailPopup.ui.DataBoardTable = TmpData;
							
							
							$ssaDataBoard.ui.updateTargetAreaEconomicSituationChartInvert(This_Mon);	//차트
							$ssaDataBoard.ui.updateTargetAreaEconomicSituationTableInvert(This_Mon);	//테이블
						}else{
							$ssaDataBoard.ui.updateTargetAreaEconomicSituationChart(This_Mon);	//차트
							$ssaDataBoard.ui.updateTargetAreaEconomicSituationTable(This_Mon);	//테이블
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
	};	
	
	$ssaEconomicSituationDetailPopup.event = {
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
				$workRoad.event.set("click", "#ssaEconomicSituationDetailPopup .topbar a", function() {
					$ssaEconomicSituation.ui.show();
				});				
			},
	}
}(window, document)); 