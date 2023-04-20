/**
 * 산업분류 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 산업분류 선택
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
	W.$vjSelectIndustryClassification = W.$vjSelectIndustryClassification || {};
	
	$vjSelectIndustryClassification.ui = {

		/**
		 * @name         : 화면 띄우기 (모달)
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		showDialog : function() {
			$workRoad.ui.showDialog("#vjSelectIndustryClassification");
			var dataParams = {};
			dataParams.b_class_cd = "INDCLA";
			dataParams.s_class_cd_len = 1;
			dataParams.condition_type = "INDUSTRY_CLASSIFICATION";
			dataParams.latest_reg_date = $wrmViewJobs.ui.today;
			dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
			dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
			$wrmViewJobs.ui.selectConditionList(dataParams, $vjSelectIndustryClassification.ui.drawItems);
//			$wrmViewJobs.ui.selectConditionList({b_class_cd: "INDCLA", s_class_cd_len: 1}, $vjSelectIndustryClassification.ui.drawItems);
			
			$workRoad.event.setToolTip("#vjSelectIndustryClassification #vjDataList label");
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		hideDialog : function() {
			$workRoad.ui.hideDialog('#vjSelectIndustryClassification');
		},
		/**
		 * @name         : 선택 목록 생성
		 * @description  : 
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItems : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectIndustryClassification #vjDataList', pDataList);
			$vjConditionList.ui.displayCount('#vjSelectIndustryClassification #vjDataList');
		},
		/**
		 * @name         : 선택 목록 생성2
		 * @description  : 
		 * @date         : 2019.01.29
		 * @author	     : nmKim
		 * @history 	 : 
		 * @param
		 */
		drawItems2 : function(pDataList) {
			var lvId = "";
			if(pDataList != undefined && pDataList != null && pDataList.length > 0) {
				//s_class_cd
				lvId = pDataList[0].s_class_cd;
				
				//전체 추가
				pDataList.unshift({
					cd : "ALL",
					cnt : 0,
					exp : "",
					nm : "전체",
					s_class_cd : lvId
				});
				
				//조회
				$wrmViewJobs.ui.drawConditionItems('#vjSelectIndustryClassification ul[name="vjDataList_'+lvId+'"]', pDataList);
				$vjConditionList.ui.displayCount('#vjSelectIndustryClassification ul[name="vjDataList_'+lvId+'"]');
				
				//attr 추가
				$('#vjSelectIndustryClassification ul[name="vjDataList_'+lvId+'"]').find("input").attr("s_class_cd",lvId);
				
				//전체 항목 선택
				var lvInput = $('#vjSelectIndustryClassification ul[name="vjDataList_'+lvId+'"]').find("input").first();
				lvInput.attr("checked", "checked");
				lvInput.next().addClass("on");
			}
			else {
				//데이터가 없습니다.
			}
		},
		/**
		 * @name         : (다중선택)항목 체크
		 * @description  : 
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		toggleItem : function(pSender) {
			var ck = $(pSender).hasClass("on");
			if(!ck){
				$(pSender).addClass("on");
				$(pSender).prev().attr("checked", "checked");
			}else{
				$(pSender).removeClass("on");
				$(pSender).prev().removeAttr("checked");
			}
		},
		
		/**
		 * @name         : 선택완료
		 * @description  : 선택완료 버튼 클릭
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		contents_Selected : function () {
			$wrmViewJobs.ui.setConditionCode('#vjSelectIndustryClassification');
//			if ($wrmViewJobs.ui.setConditionCode('#vjSelectIndustryClassification') == false){
//				alert("항목을 선택하세요.");
//				return;
//			}
			$vjConditionList.ui.displayCount('#vjSelectIndustryClassification #vjDataList');
			this.hideDialog();			
			$vjJobInfoList.ui.show();			
		},
		/**
		 * @name         : contents_Clear
		 * @description  : 선택취소 버튼 클릭
		 * @date         : 2018.11.19
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		contents_Clear : function () {
			// 체크 모두 해제
			$("#vjSelectIndustryClassification #vjDataList input").removeAttr("checked");
			$("#vjSelectIndustryClassification #vjDataList label").removeClass("on");
			
			$wrmViewJobs.ui.setConditionCode('#vjSelectIndustryClassification');
			$vjConditionList.ui.displayCount('#vjSelectIndustryClassification #vjDataList');
		},		
	};	
	
	$vjSelectIndustryClassification.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 */
		setUIEvent: function() {
			console.log("$vjSelectIndustryClassification.event.setUIEvent() called.");

			// 다중 라디오버튼 선택(대분류)
			$workRoad.event.set("click","#vjSelectIndustryClassification #vjDataList label",function(){
				/***************************** 데이터 *****************************/
				// 선택여부 및 선택값
				var lvChecked = ($(this).prev().attr("checked") == "checked") ? true : false;
				var lvValue = $(this).prev().val();
				
				/***************************** 기본처리 *****************************/
				// 하위 목록 존재여부 체크
				var lvDataFlag = $("#vjSelectIndustryClassification #vjDataListTemp").parent().find("ul[name='vjDataList_"+lvValue+"']").length;
				
				// 하위 목록 없으면 목록 생성
				if(lvDataFlag == 0) {
					$("#vjSelectIndustryClassification #vjDataListTemp").parent().find("ul").hide();
					$("#vjSelectIndustryClassification #vjDataListTemp").parent().append("<ul class=\"multiCheckBox\" name=\"vjDataList_"+lvValue+"\">");
					
					var dataParams = {};
					dataParams.b_class_cd = "INDCLA";
					dataParams.s_class_cd = lvValue;
					dataParams.s_class_cd_len = 1;
					dataParams.condition_type = "INDUSTRY_CLASSIFICATION";
					dataParams.latest_reg_date = $wrmViewJobs.ui.today;
					dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
					dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
					$wrmViewJobs.ui.selectConditionList(dataParams, $vjSelectIndustryClassification.ui.drawItems2);
					
					//최초 1회 체크 처리
					$vjSelectIndustryClassification.ui.toggleItem(this);
				}
				// 하위 목록 보여주기
				else {
					$("#vjSelectIndustryClassification #vjDataListTemp").parent().find("ul").hide();
					$("#vjSelectIndustryClassification #vjDataListTemp").parent().find("ul[name='vjDataList_"+lvValue+"']").show();
				}
				
				/***************************** 체크 안되어 있을때 처리 *****************************/
				if(!lvChecked) {
					//하위 전체 항목 선택이 해제된 경우 체크
					var lvCheckedFlag = false;
					$('#vjSelectIndustryClassification ul[name="vjDataList_'+lvValue+'"]').find("input").each(function () {
						if($(this).attr("checked") == "checked") {
							lvCheckedFlag = true;
							return false;
						}
					});
					//하위 전체 항목 선택이 해제된 경우 전체 체크
					if(lvCheckedFlag == false) {
						$vjSelectIndustryClassification.ui.toggleItem(this);
						//전체 항목 선택
						var lvInput = $('#vjSelectIndustryClassification ul[name="vjDataList_'+lvValue+'"]').find("input").first();
						lvInput.attr("checked", "checked");
						lvInput.next().addClass("on");
					}
					
				}
				/***************************** 체크 되어 있을때 처리 *****************************/
				else {
					
				}
		    });
			// 다중 라디오버튼 선택(중분류)
			$workRoad.event.set("click","#vjSelectIndustryClassification #vjDataListSub label",function(){
				/***************************** 데이터 *****************************/
				// 선택처리
				$vjSelectIndustryClassification.ui.toggleItem(this);
				
				// 선택여부 및 선택값
				var lvChecked = ($(this).prev().attr("checked") == "checked") ? true : false;
				var lvValue = $(this).prev().val();
				var lvSClassCd = $(this).prev().attr("S_class_cd");
				/***************************** 기본처리 *****************************/
				// 전체
				if(lvValue == "ALL") {
					if(lvChecked == true) {
						// 상위 체크
						$("#vjSelectIndustryClassification #vjDataList input").each(function () {
							if($(this).val() == lvSClassCd) {
								$(this).attr("checked", "checked");
								$(this).next().addClass("on");
								return false;
							}
						});
						
						//전체를 제외한 항목 체크 해제
						$(this).parent().parent().find("input").each(function () {
							if($(this).val() != "ALL") {
								$(this).removeAttr("checked");
								$(this).next().removeClass("on");
							}
						});
					} else {
						// 상위 체크 해제
						$("#vjSelectIndustryClassification #vjDataList input").each(function () {
							if($(this).val() == lvSClassCd) {
								$(this).removeAttr("checked");
								$(this).next().removeClass("on");
								return false;
							}
						});
					}
				}
				// 전체아님
				else {
					if(lvChecked == true) {
						//상위 항목 체크
						$("#vjSelectIndustryClassification #vjDataList input").each(function () {
							if($(this).val() == lvSClassCd) {
								$(this).attr("checked", "checked");
								$(this).next().addClass("on");
								return false;
							}
						});
						
						//전체 항목 선택 해제
						var lvInput = $(this).parent().parent().find("input").first();
						lvInput.removeAttr("checked", "checked");
						lvInput.next().removeClass("on");
					}
					else {
						//모든 항목 선택이 해제된 경우 체크
						var lvCheckedFlag = false;
						$(this).parent().parent().find("input").each(function () {
							if($(this).attr("checked") == "checked") {
								lvCheckedFlag = true;
								return false;
							}
						});
						//모든 항목 선택이 해제된 경우 상위 체크 해제
						if(lvCheckedFlag == false) {
							$("#vjSelectIndustryClassification #vjDataList input").each(function () {
								if($(this).val() == lvSClassCd) {
									$(this).removeAttr("checked");
									$(this).next().removeClass("on");
									return false;
								}
							});
						}
					}
				}
		    });
			// 선택완료
			$workRoad.event.set("click", "#vjSelectIndustryClassification #vjOk", function() {
				var lvValueList1 = []; // 대분류 체크값
				var lvValueList2 = []; // 중분류 체크값(전체 제외)
				// 대분류 체크값 불러오기
				$("#vjSelectIndustryClassification #vjDataList input").each(function () {
					if($(this).attr("checked") == "checked") {
						lvValueList1.push($(this).val());
					}
				});
				// 중분류 체크값 불러오기
				$("#vjSelectIndustryClassification #vjDataListSub input").each(function () {
					if($(this).attr("checked") == "checked" && $(this).val() != "ALL") {
						lvValueList2.push($(this).val());
					}
				});
				console.log(lvValueList1);
				console.log(lvValueList2);
				return;
				
				$vjSelectIndustryClassification.ui.contents_Selected();
			});			
			// 선택취소
			$workRoad.event.set("click", "#vjSelectIndustryClassification #vjClear", function() {
				//대분류 초기화
				$vjSelectIndustryClassification.ui.contents_Clear();
				
				//중분류 초기화
				$("#vjSelectIndustryClassification #vjDataListSub ul").each(function () {
					if($(this).attr("id") == "vjDataListTemp") {
						$(this).show();
					} else {
						$(this).remove();
					}
				});
			});			
			// 취소	
			$workRoad.event.set("click", "#vjSelectIndustryClassification #vjCancel", function() {
				//대분류 초기화
				$vjSelectIndustryClassification.ui.contents_Clear();
				
				//중분류 초기화
				$("#vjSelectIndustryClassification #vjDataListSub ul").each(function () {
					if($(this).attr("id") == "vjDataListTemp") {
						$(this).show();
					} else {
						$(this).remove();
					}
				});
				
				$vjSelectIndustryClassification.ui.hideDialog();
			});		
		},			
	}
	
}(window, document));