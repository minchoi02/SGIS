/**
 * 일자리 현황 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계 분석 > 선택 팝업  
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
	W.$ssaSearchPopup = W.$ssaSearchPopup || {};
	
	$ssaSearchPopup.ui = {
		pSelector	: "#ssaSearchPopup",
		arParamList : [],		//조회 팝업 List & Param
		tmpParam : [],
		parentParamsList : [],
		/*Title : null,
		SiDo : null, 
		SiDo_nm : null, 
		Link_id : null, 
		Link_nm : null,
		Cx : null, 
		Cx_nm : null, */
		
		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function(param) {
			$ssaSearchPopup.ui.parentParams.add(0, param);
			
			$workRoad.ui.showLayer(this.pSelector, 100, 50);
			this.SearchPopup();
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
		 * @name         : 일자리현황 조회 조건 팝업
		 * @description  : 
		 * @date         : 2018.10.31
		 * @author	     : 손원웅
		 * @history 	 : 
		 * 		2018.10.31	손원웅	신규
		 * @param
		 */
		SearchPopup : function () {
			var that = $ssaJobStatus.ui;
			//var SearchBtnCnt = that.searchbtnCnt;
			
			this.arParamList.push({
				idx : that.searchbtnCnt,
				params : that.SearchParam,
			});
			
			var Title = that.SearchParam.Title;
			var SiDo_nm = that.SearchParam.SiDo_nm;
			var SiDo = that.SearchParam.SiDo;
			var Link_id = that.SearchParam.Link_id;
			var Link_nm = that.SearchParam.Link_nm;
			var Cx = that.SearchParam.Cx;
			var Cx_nm = that.SearchParam.Cx_nm;
			
			var tmpTitle = Title+"-"+SiDo_nm;
			
			if(Link_nm != ""){
				tmpTitle = tmpTitle+"-"+Link_nm
			}
			if(Cx_nm != ""){
				tmpTitle = tmpTitle+"-"+Cx_nm;
			}
			
			//버튼생성
			var html = "<li class='dragItem' id='dragItem_"+that.searchbtnCnt+"'>" +
							"<a href='javascript:void(0)' id='"+Link_id + "-" + that.searchbtnCnt+"' class='ellipsis drag on' title='"+tmpTitle+"'>" +
								"<div class='text'>"+tmpTitle+"</div>" +
								/*"<div class='atdrc_yn' style='display:none;'>"+atdrc_yn+"</div>"+*/
							"</a>" +
							"<a href='javascript:$ssaSearchPopup.ui.deleteSearchBtn("+that.searchbtnCnt+");' class='sqdel'><img src='/img/um/btn_closel01.png' alt='삭제' /></a>" +
					   "</li>";
			$("#searchBtnResultRgn ul").prepend(html);
			$("#searchBtnResultRgn").css("height", "300px");
			
			console.log("this.arParamList : " + JSON.stringify(this.arParamList));
			
			this.searchModeSetting();
			
			/*
			//버튼 드래그설정
			$(".dragItem").draggable({ 
				revert : "invalid",
				helper : "clone",
				cursor : "pointer",
				zIndex : 100,
				cursorAt : {left : -5},
				appendTo : "body",
				start : function(e, ui) {
				},
				drag : function(e, ui) {
					$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
				},
				stop : function(e, ui) {
					$(".sqListBox.sq03 .mCSB_container, .sqListBox.sq03 .sqList, .sqListBox.sq03 .mCustomScrollBox,.sqListBox.sq03 .mCSB_container_wrapper").css("overflow", "hidden");
				},
				helper : function() {	//드래그시 폰트 색상 변경
					var cloneElem = $(this).clone();	//버튼 클론
					var btnId = $(cloneElem).find("a").attr("id");	//버튼 아이디
					//아직 조회가 안된 버튼은 검정글씨
					if($interactiveLeftMenu.ui.curSearchBtnArray["one"] != btnId &&
						$interactiveLeftMenu.ui.curSearchBtnArray["two"] != btnId &&
						$interactiveLeftMenu.ui.curSearchBtnArray["three"] != btnId) {
						$(cloneElem).find("a > div:eq(0)").css("color", "#000");
					} else {	//조회가 된 버튼은 흰글씨
						$(cloneElem).find("a > div:eq(0)").css("color", "#fff");
					}
					return cloneElem;
				}
			});
			*/
		},
		
		/**
		 * 
		 * @name         : deleteSearchBtn
		 * @description  : 생성된 조건검색버튼을 삭제한다.
		 * @date         : 2018. 10. 31. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param searchbtnCnt   : 조회버튼 고유값
		 */
		deleteSearchBtn : function(value) {
			var btn_id = $("#dragItem_" + value).find("a").attr("id");
			$("#dragItem_" + value).remove();
			
			/*var delVal = (Number(value)-1);
			console.log("delVal : " + delVal);*/

			// 삭제된 조회버튼의 파라미터정보를 삭제한다.
			for (var i = 0; i < this.arParamList.length; i++) {
				if (this.arParamList[i].idx == value) {
					this.arParamList.splice(this.arParamList.indexOf(this.arParamList[i]), 1);
					break;
				}
			}
			
			console.log("this.arParamList_del!! : " + JSON.stringify(this.arParamList));
			
			/*//지도를 조회한 버튼 아이디 초기화
			if(this.curSearchBtnArray["one"] == btn_id) {
				this.curSearchBtnArray["one"] = "";
			}
			if(this.curSearchBtnArray["two"] == btn_id) {
				this.curSearchBtnArray["two"] = "";
			}
			if(this.curSearchBtnArray["three"] == btn_id) {
				this.curSearchBtnArray["three"] = "";
			}
*/
			//버튼 카운트
			//this.getBtnCnt();
		},
		
		/**
		 * 
		 * @name         : getBtnCnt
		 * @description  : 버튼갯수 
		 * @date         : 2015. 10. 01. 
		 * @author	     : 김성현
		 * @history 	 :
		 * @param
		 */
		getBtnCnt : function() {
			var cnt = $("#searchBtnResultRgn").find("li:visible").length;
		},
		
		/**
		 * 
		 * @name         : searchModeSetting
		 * @description  : 조건버튼 드래그, 더블클릭 설정. 
		 * @date         : 2015. 10. 14.
		 * @author	     : 김성현
		 * @history 	 :
		 */
		searchModeSetting : function() {
			var that = $ssaSearchPopup.ui;
			/*
			console.log("[interactiveLeftMenu.js] searchModeSetting 호출");
			
			//mng_s
			if($interactiveLeftMenu.ui.isInnerMapShow2!=undefined && $interactiveLeftMenu.ui.isInnerMapShow2) {
				$(".dragItem").draggable( "disable" );	//드랍 차단
				//$("#sqlListBox").draggable( "disable" ); //선택항목 패널 고정시 사용
			} else {
				$(".dragItem").draggable( "enable" );	//드랍 허용
			}
			*/
			//$(".dragItem").draggable( "enable" );	//드랍 허용 //mng_s
			$(".ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header .ui-state-disabled").css({"opacity":1});	//disabled일때 흐려짐현상 없앰
			//더블클릭 이벤트
			// 2016. 04. 01 j.h.Seok
			$(".dragItem").off("dblclick").dblclick(function(event) {
				console.log("더블클릭 이벤트");

				var id = $("#"+event.currentTarget.id).find("a").attr("id");
				var index = id.split("-")[1];
				
				for(var i=0; i<that.arParamList.length; i++){
					var idxChk = that.arParamList[i]["idx"];
					if(idxChk == index){
						that.tmpParam = that.arParamList[i]["params"];
					}
				}
				
				console.log("this.tmpParam : " + JSON.stringify(that.tmpParam));
				
				$("#ssaSearchPopup").hide();	//선택  팝업 숨김
				$ssaDetailPopup.ui.show();	//상세지표 팝업 호출
			});
			/*
			this.updateSearchBtnEffect(this.curSearchBtnArray["one"], 0);
			this.updateSearchBtnEffect(this.curSearchBtnArray["two"], 1);
			this.updateSearchBtnEffect(this.curSearchBtnArray["three"], 2);*/
		},
		
		/**
		 * @name         : dtlSearch
		 * @description  : 일자리통계분석(일자리 현황 상세)
		 * @date         : 2018. 10. 31. 
		 * @author	     : 손원웅
		 * @history 	 :
		 * @param today
		 *//*
		dtlSearch : function(){
			var dataParams = {};
			
			if (this.tmpParam.Title != ""){
				dataParams.Title = this.tmpParam.Title;
			}
			if (this.tmpParam.SiDo != ""){
				dataParams.SiDo = this.tmpParam.SiDo;
			}
			if (this.tmpParam.SiDo_nm != ""){
				dataParams.SiDo_nm = this.tmpParam.SiDo_nm;
			}
			if (this.tmpParam.Link_id != ""){
				dataParams.Link_id = this.tmpParam.Link_id;
			}
			if (this.tmpParam.Link_nm != ""){
				dataParams.Link_nm = this.tmpParam.Link_nm;
			}
			if (this.tmpParam.Cx != ""){
				dataParams.Cx = this.tmpParam.Cx;
			}
			if (this.tmpParam.Cx_nm != ""){
				dataParams.Cx_nm = this.tmpParam.Cx_nm;
			}
			
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/statsAnls/getSsaSearchPopupDetail.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						var mainData = res.result.mainData;
						var mainChart = res.result.mainChart;
						
						var listElement = '<ul>';
						for(var i = 0; i < mainData.length; i++) {
							
							var Val = mainData[i].tm;
							var link_ID = mainData[i].link_id;
							var link_Nm = mainData[i].link_nm;
							var unit_Nm = mainData[i].unit_nm;
							var Val_apc = mainData[i].total;
							
							var valChk = Val.indexOf("-");
							var span_Nm = "";	//class명
							
							if(valChk == "-1"){
								span_Nm = "top"
							}else{
								span_Nm = "bottom"
							}
							
							if(link_ID == 'I3104' || link_ID == 'I3112'){	//취업자수, 실업자수는 다르게 그림	
								$('td[id='+link_ID+'] *').remove();

								listElement += '<dl> <dt>' + link_Nm + '</dt>';
								listElement += '<dd>' + (Val + unit_Nm) +'</dd> <span class="job-arrow '+ span_Nm +'" id='+ link_ID+"_apc" +'></span>';
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
								listElement += '<dl> <dt>' + link_Nm + '</dt>';
								listElement += '<dd>' + (Val + unit_Nm) +'</dd> <span class="job-arrow '+ span_Nm +'" id='+ link_ID+"_apc" +'></span>';
								listElement += '</dl>';
								listElement += '</td>';
								listElement += '</tr>';
								listElement += '</tbody>';
								listElement += '</table>';
								listElement += '</div>';
								$('div[id='+link_ID+']').append(listElement);
								
								listElement = '<ul>';
							}
							
							$('#'+link_ID+'_apc').attr('ssaval', (Val + unit_Nm));
						}
						
						// 일자리현황 차트 데이터 만들기
						var PC_Series = [];
						var data = [];
						var x = 1;
						for(var i=0; i<mainChart.length; i++){
							data = [];

							for(var k=1; k<13; k++){
								data.push(parseFloat(mainChart[i]["mon"+k]));
							}
							PC_Series.push({
								name: mainChart[i].link_nm,
								data: data
							});
						}
						
						$('#ssaJobStatusChartMain').highcharts({
							chart: {
								margin:[20,30,90,80],		// 순서 top, right, bottom, left
							    height: '300'
							},	
							showFirstLabel: false,
							chart: {
								//margin:[20,30,90,80],		// 순서 top, right, bottom, left
							    width: '650'
							},
							colors: ['#ff0000', '#f79339', '#ffc000', '#92d050', '#00b0f0', '#0000FF', '#7030a0'], //2018.01.11 [개발팀] 컬러수정
							tooltip: { shared: true, crosshairs: true },
							title: { text: '' },
							subtitle: { text: '' },
							//exporting: { enabled: false },
							xAxis: {
								//categories: tmpCategories,
								title: { text: '갱신주기' }
							},
							yAxis: {
								min: 0, 
								title: { text: '단위'},
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
		},*/
	};	
	
	$ssaSearchPopup.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				
//				$workRoad.event.set("click", "#ssaJobStatus #ssaJobStatusEvent", function() {
//					$ssaSampleLayer.ui.show();
//				});
//				$workRoad.event.set("click", "#ssaJobStatusClose", function() {
//					$ssaSearchPopup.ui.hide();
//				});
//				
//				
			},
	}
}(window, document)); 