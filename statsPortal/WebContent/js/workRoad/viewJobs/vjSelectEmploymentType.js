/**
 * 고용형태 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 고용형태 선택
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
	W.$vjSelectEmploymentType = W.$vjSelectEmploymentType || {};
	
	$vjSelectEmploymentType.ui = {

		/**
		 * @name         : 화면 띄우기 (모달)
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		showDialog : function() {
			$workRoad.ui.showDialog('#vjSelectEmploymentType');
			$workRoad.ui.selectCommonCode('EMPTYP', $vjSelectEmploymentType.ui.drawItems);
			
			$workRoad.event.setToolTip("#vjSelectEmploymentType #vjDataList label");
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
			$workRoad.ui.hideDialog('#vjSelectEmploymentType');
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
			$wrmViewJobs.ui.drawConditionItems('#vjSelectEmploymentType #vjDataList', pDataList);
			$vjConditionList.ui.displayCount('#vjSelectEmploymentType #vjDataList');
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
			$wrmViewJobs.ui.setConditionCode('#vjSelectEmploymentType');
//			if ($wrmViewJobs.ui.setConditionCode('#vjSelectEmploymentType') == false){
//				alert("항목을 선택하세요.");
//				return;
//			}
			$vjConditionList.ui.displayCount('#vjSelectEmploymentType #vjDataList');
			this.hideDialog();			
			$vjJobInfoList.ui.show();		

			var slwParams = "";
            $.each($('#vjSelectEmploymentType #vjDataList' + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		slwParams += $(this).val() + ','
            	}
            });
			// 2019.03.13 접근log 생성
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '03', '03', '06', '', slwParams);
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
			$("#vjSelectEmploymentType #vjDataList input").removeAttr("checked");
			$("#vjSelectEmploymentType #vjDataList label").removeClass("on");
			
			$wrmViewJobs.ui.setConditionCode('#vjSelectEmploymentType');
			$vjConditionList.ui.displayCount('#vjSelectEmploymentType #vjDataList');
		},		
	};	
	
	$vjSelectEmploymentType.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 */
		setUIEvent: function() {
			console.log("$vjSelectEmploymentType.event.setUIEvent() called.");

			// 다중 라디오버튼 선택
			$workRoad.event.set("click","#vjSelectEmploymentType #vjDataList label",function(){
				$vjSelectEmploymentType.ui.toggleItem(this);				
		    });
			// 선택완료
			$workRoad.event.set("click", "#vjSelectEmploymentType #vjOk", function() {
				$vjSelectEmploymentType.ui.contents_Selected();
			});			
			// 선택취소
			$workRoad.event.set("click", "#vjSelectEmploymentType #vjClear", function() {
				$vjSelectEmploymentType.ui.contents_Clear();
			});			
			// 취소	
			$workRoad.event.set("click", "#vjSelectEmploymentType #vjCancel", function() {
				$vjSelectEmploymentType.ui.hideDialog();
			});		
		},			
	}
	
}(window, document));