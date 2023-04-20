/**
 * 직종분류 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 직종분류 선택
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
	W.$vjSelectJobClassification = W.$vjSelectJobClassification || {};
	
	$vjSelectJobClassification.ui = {

		/**
		 * @name         : showDialog
		 * @description  : 화면 띄우기 (모달)
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		showDialog : function() {
			console.log("$vjSelectJobClassification.ui.showDialog() called.");
			
			$workRoad.ui.showDialog('#vjSelectJobClassification');
			this.loadItems();
			$workRoad.event.setToolTip("#vjSelectJobClassification #vjDataList label");
		},
		/**
		 * @name         : hideDialog
		 * @description  : 화면 닫기
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		hideDialog : function() {
			$workRoad.ui.hideDialog('#vjSelectJobClassification');
		},
		/**
		 * @name         : loadItems
		 * @description  : 직종 목록을 조회한다.
		 * @date         : 2018.11.27
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		loadItems : function() {
			var dataParams = {};
			dataParams.b_class_cd = "RCRJSS";
			dataParams.s_class_cd_len = 2;
			dataParams.condition_type = "JOB_CLASSIFICATION";
			dataParams.latest_reg_date = $wrmViewJobs.ui.today;
			dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
			dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
			$wrmViewJobs.ui.selectConditionList(dataParams, this.drawItems);
		},
//		/**
//		 * @name         : loadItemGroups
//		 * @description  : 직업전망 및 직업훈련 보기의 직종 목록(대분류)를 조회한다.
//		 * @date         : 2018.11.27
//		 * @author	     : ywKim
//		 * @history 	 : 
//		 */
//		loadItemGroups : function() {
//			var dataParams = {};
//			dataParams.b_class_cd = "RCRJSS";
//			dataParams.s_class_cd_len = 1;
//			dataParams.condition_type = "JOB_CLASSIFICATION";
//			dataParams.latest_reg_date = $wrmViewJobs.ui.today;
//			dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
//			dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
//			$wrmViewJobs.ui.selectConditionList(dataParams, $vjSelectJobClassification.ui.drawItemGroups);
//		},
		/**
		 * @name         : drawItems
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * 	2018.11.27	ywKim	drawJobClassList() 호출 부분 제거
		 */
		drawItems : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectJobClassification #vjDataList', pDataList);
			$vjSelectJobClassification.ui.drawItemGroups(pDataList);
			$vjConditionList.ui.displayCount('#vjSelectJobClassification #vjDataList');
		},
		/**
		 * @name         : 직종 선택 목록 생성
		 * @description  : 
		 * @date         : 2018.10.17
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2018.11.27	ywKim	이름변경
		 */
		drawItemGroups : function(pDataList) {
			var html = '';
			
			for(var  i = 0; i < pDataList.length; i ++) {
				html += '<option value="' + pDataList[i].cd + '">' + pDataList[i].nm + '</option>'; 
			}

			$('#vjSelectJobClassification #vjJobClassificationList').html(html);
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
			$wrmViewJobs.ui.setConditionCode('#vjSelectJobClassification');
//			if ($wrmViewJobs.ui.setConditionCode('#vjSelectJobClassification') == false){
//				alert("항목을 선택하세요.");
//				return;
//			}
			$vjConditionList.ui.displayCount('#vjSelectJobClassification #vjDataList');
			this.hideDialog();			
			$vjJobInfoList.ui.show();
			
			var slwParams = "";
            $.each($('#vjSelectJobClassification #vjDataList' + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		slwParams += $(this).val() + ','
            	}
            });
			// 2019.03.13 접근log 생성
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '03', '03', '03', '', slwParams);
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
			$("#vjSelectJobClassification #vjDataList input").removeAttr("checked");
			$("#vjSelectJobClassification #vjDataList label").removeClass("on");
			
			$wrmViewJobs.ui.setConditionCode('#vjSelectJobClassification');
			$vjConditionList.ui.displayCount('#vjSelectJobClassification #vjDataList');
		},
		
		toggleViewContents : function () {
			var $this = $('#vjSelectJobClassification .view-tab a');
			var $that = $('#vjSelectJobClassification #vjViewContents');
			
			var ck = $this.hasClass("on");
			if(!ck){
				$this.addClass("on");
				$that.hide();
			}else{
				$this.removeClass("on");
				$that.show();
			}
		},		
	};	
	
	$vjSelectJobClassification.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 */
		setUIEvent: function() {
			console.log("$vjSelectJobClassification.event.setUIEvent() called.");
			
			var $this = $vjSelectJobClassification.ui;
			
			// 다중 라디오버튼 선택
			$workRoad.event.set("click","#vjSelectJobClassification #vjDataList label",function(){
				$this.toggleItem(this);				
		    });
			// 선택완료
			$workRoad.event.set("click", "#vjSelectJobClassification #vjOk", function() {
				$this.contents_Selected();
			});			
			// 선택취소
			$workRoad.event.set("click", "#vjSelectJobClassification #vjClear", function() {
				$this.contents_Clear();
			});			
			// 취소	
			$workRoad.event.set("click", "#vjSelectJobClassification #vjCancel", function() {
				$this.hideDialog();
			});
			// 직업전망 및 직업훈련 보기
			$workRoad.event.set("click", "#vjSelectJobClassification .view-tab", function() {
				$this.toggleViewContents();
			});
			// 직업전망 보기
			$workRoad.event.set("click", "#vjSelectJobClassification #vjShowJobProspecting", function() {
				var cd = $('#vjSelectJobClassification #vjJobClassificationList option:selected').val();
				var nm = $('#vjSelectJobClassification #vjJobClassificationList option:selected').text();
				$this.hideDialog();
				
				cd = cd.substring(0, 1);
				
				$vjDataBoard.ui.showContents('/view/workRoad/viewJobs/vjJobProspectingInfo' 
						, {} 
						, '700px' 
						, function() {
							
					$('#vjJobProspectingInfo .wrmScrollable').each(function(){
						$(this).mCustomScrollbar();
					});
					$vjJobProspectingInfo.event.setUIEvent();
					$vjJobProspectingInfo.ui.init(cd, nm);
				});
				
				// 2019.03.13 접근log 생성
				srvLogWrite('D0', '03', '03', '04', '', '');
			});
			// 직업훈련(핵심직무 기반) 보기
			$workRoad.event.set("click", "#vjSelectJobClassification #vjShowJobTraining", function() {
				var cd = $('#vjSelectJobClassification #vjJobClassificationList option:selected').val();
				var nm = $('#vjSelectJobClassification #vjJobClassificationList option:selected').text();
				$this.hideDialog();
				
				cd = cd.substring(0, 1);
				
				$vjDataBoard.ui.showContents('/view/workRoad/viewJobs/vjJobTrainingInfo' 
						, {} 
						, null//'550px' 
						, function() {
							
					$('#vjJobTrainingInfo .wrmScrollable').each(function(){
						$(this).mCustomScrollbar();
					});
					$vjJobTrainingInfo.event.setUIEvent();
					$vjJobTrainingInfo.ui.init(cd, nm);
				});
			});
		},			
	}
	
}(window, document));