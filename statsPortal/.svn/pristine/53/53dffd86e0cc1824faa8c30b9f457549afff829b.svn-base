/**
 * 학력 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 학력 선택
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
	W.$vjSelectAcademicAbility = W.$vjSelectAcademicAbility || {};
	
	$vjSelectAcademicAbility.ui = {

		/**
		 * @name         : showDialog
		 * @description  : 화면 띄우기 (모달)
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		showDialog : function() {
			$workRoad.ui.showDialog('#vjSelectAcademicAbility');
			$workRoad.ui.selectCommonCode('ACDMCR', $vjSelectAcademicAbility.ui.drawItems);
		},
		/**
		 * @name         : hideDialog
		 * @description  : 화면 닫기
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		hideDialog : function() {
			$workRoad.ui.hideDialog('#vjSelectAcademicAbility');
		},
		/**
		 * @name         : drawItems
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItems : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectAcademicAbility #vjDataList', pDataList);
			$vjConditionList.ui.displayCount('#vjSelectAcademicAbility #vjDataList');
		},
		/**
		 * @name         : toggleItem
		 * @description  : (다중선택)항목 체크
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
		 * @name         : contents_Selected
		 * @description  : 선택완료 버튼 클릭
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		contents_Selected : function () {
			$wrmViewJobs.ui.setConditionCode('#vjSelectAcademicAbility');
//			if ($wrmViewJobs.ui.setConditionCode('#vjSelectAcademicAbility') == false){
//				alert("항목을 선택하세요.");
//				return;
//			}
			$vjConditionList.ui.displayCount('#vjSelectAcademicAbility #vjDataList');
			this.hideDialog();			
			$vjJobInfoList.ui.show();

			var slwParams = "";
            $.each($('#vjSelectAcademicAbility #vjDataList' + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		slwParams += $(this).val() + ','
            	}
            });
			// 2019.03.13 접근log 생성
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '03', '03', '07', '', slwParams);
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
			$("#vjSelectAcademicAbility #vjDataList input").removeAttr("checked");
			$("#vjSelectAcademicAbility #vjDataList label").removeClass("on");
			
			$wrmViewJobs.ui.setConditionCode('#vjSelectAcademicAbility');
			$vjConditionList.ui.displayCount('#vjSelectAcademicAbility #vjDataList');
		},		
	};	
	
	$vjSelectAcademicAbility.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 */
		setUIEvent: function() {
			console.log("$vjSelectAcademicAbility.event.setUIEvent() called.");

			// 다중 라디오버튼 선택
			$workRoad.event.set("click","#vjSelectAcademicAbility #vjDataList label",function(){
				$vjSelectAcademicAbility.ui.toggleItem(this);				
		    });
			// 선택완료
			$workRoad.event.set("click", "#vjSelectAcademicAbility #vjOk", function() {
				$vjSelectAcademicAbility.ui.contents_Selected();
			});			
			// 선택취소
			$workRoad.event.set("click", "#vjSelectAcademicAbility #vjClear", function() {
				$vjSelectAcademicAbility.ui.contents_Clear();
			});			
			// 취소	
			$workRoad.event.set("click", "#vjSelectAcademicAbility #vjCancel", function() {
				$vjSelectAcademicAbility.ui.hideDialog();
			});		
		},			
	}
	
}(window, document));