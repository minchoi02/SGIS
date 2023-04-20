/**
 * 경력 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 경력 선택
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
	W.$vjSelectCareer = W.$vjSelectCareer || {};
	
	$vjSelectCareer.ui = {

		/**
		 * @name         : 화면 띄우기 (모달)
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		showDialog : function() {
			$workRoad.ui.showDialog('#vjSelectCareer');
			$workRoad.ui.selectCommonCode('CAREER', $vjSelectCareer.ui.drawItems);
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
			$workRoad.ui.hideDialog('#vjSelectCareer');
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
			$wrmViewJobs.ui.drawConditionItems('#vjSelectCareer #vjDataList', pDataList);
			$vjConditionList.ui.displayCount('#vjSelectCareer #vjDataList');
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
			$wrmViewJobs.ui.setConditionCode('#vjSelectCareer');
//			if ($wrmViewJobs.ui.setConditionCode('#vjSelectCareer') == false){
//				alert("항목을 선택하세요.");
//				return;
//			}
			$vjConditionList.ui.displayCount('#vjSelectCareer #vjDataList');
			this.hideDialog();			
			$vjJobInfoList.ui.show();	

			var slwParams = "";
            $.each($('#vjSelectCareer #vjDataList' + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		slwParams += $(this).val() + ','
            	}
            });
			// 2019.03.13 접근log 생성
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '03', '03', '08', '', slwParams);
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
			$("#vjSelectCareer #vjDataList input").removeAttr("checked");
			$("#vjSelectCareer #vjDataList label").removeClass("on");
			
			$wrmViewJobs.ui.setConditionCode('#vjSelectCareer');
			$vjConditionList.ui.displayCount('#vjSelectCareer #vjDataList');
		},		
	};	
	
	$vjSelectCareer.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 */
		setUIEvent: function() {
			console.log("$vjSelectCareer.event.setUIEvent() called.");

			// 다중 라디오버튼 선택
			$workRoad.event.set("click","#vjSelectCareer #vjDataList label",function(){
				$vjSelectCareer.ui.toggleItem(this);				
		    });
			// 선택완료
			$workRoad.event.set("click", "#vjSelectCareer #vjOk", function() {
				$vjSelectCareer.ui.contents_Selected();
			});			
			// 선택취소
			$workRoad.event.set("click", "#vjSelectCareer #vjClear", function() {
				$vjSelectCareer.ui.contents_Clear();
			});			
			// 취소	
			$workRoad.event.set("click", "#vjSelectCareer #vjCancel", function() {
				$vjSelectCareer.ui.hideDialog();
			});		
			// 대졸자일자리이동경로조사(2016) 보기
			$workRoad.event.set("click", "#vjSelectCareer #vjViewCollegeGraduateStat", function() {
				$vjSelectCareer.ui.hideDialog();
				
				$workRoad.ui.showLoading();
				$vjDataBoard.ui.showContents('/view/workRoad/viewJobs/vjFirstCollegeGraduateJobStat' 
						, {} 
						, '660px' 
						, function() {
							
					$('#vjFCGJS .wrmScrollable').each(function(){
						$(this).mCustomScrollbar();
					});
					$vjFCGJS.event.setUIEvent();
					$vjFCGJS.ui.initChart();
					$workRoad.ui.hideLoading();
				});
				
				// 2019.03.13 접근log 생성
				srvLogWrite('D0', '03', '03', '09', '', '');
			});		
			
		},			
	}
	
}(window, document));