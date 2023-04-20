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
			
			var slwParams = "";
            $.each($('#vjSelectIndustryClassification #vjDataList' + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		slwParams += $(this).val() + ','
            	}
            });
			// 2019.03.13 접근log 생성
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '03', '03', '10', '', slwParams);
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

			// 다중 라디오버튼 선택
			$workRoad.event.set("click","#vjSelectIndustryClassification #vjDataList label",function(){
				$vjSelectIndustryClassification.ui.toggleItem(this);				
		    });
			// 선택완료
			$workRoad.event.set("click", "#vjSelectIndustryClassification #vjOk", function() {
				$vjSelectIndustryClassification.ui.contents_Selected();
			});			
			// 선택취소
			$workRoad.event.set("click", "#vjSelectIndustryClassification #vjClear", function() {
				$vjSelectIndustryClassification.ui.contents_Clear();
			});			
			// 취소	
			$workRoad.event.set("click", "#vjSelectIndustryClassification #vjCancel", function() {
				$vjSelectIndustryClassification.ui.hideDialog();
			});		
		},			
	}
	
}(window, document));