/**
 * 급여수준 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 급여수준 선택
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
	W.$vjSelectSalaryLevel = W.$vjSelectSalaryLevel || {};
	
	$vjSelectSalaryLevel.ui = {

		/**
		 * @name         : 화면 띄우기 (모달)
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		showDialog : function() {
//			$wrmViewJobs.ui.conditionWageType = 'D';
			$workRoad.ui.showDialog('#vjSelectSalaryLevel');
			$workRoad.ui.selectCommonCode('WAGETY', $vjSelectSalaryLevel.ui.callback_SelectCommonCode);
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
			$workRoad.ui.hideDialog('#vjSelectSalaryLevel');
		},
		/**
		 * @name         : 콜백함수 - 구분선택 조회
		 * @description  : 
		 * @date         : 2018.10.04
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		callback_SelectCommonCode : function(pDataList) {
			$vjSelectSalaryLevel.ui.drawConditionItems('#vjSelectSalaryLevel #vjSalaryLevelGubun', pDataList);
			
			var cndId = $vjConditionList.ui.getConditionId("#vjSelectSalaryLevel");
			var cndItem = $wrmViewJobs.ui.getCondition(cndId);			
			var wageType = (cndItem != null) ? cndItem.wageType : "D";
			$("#vjSelectSalaryLevel #vjSalaryLevelGubun").val(wageType);
			
			$vjSelectSalaryLevel.ui.gubun_Changed();
		},
		/**
		 * @name         : 구분 선택 변경후
		 * @description  : 
		 * @date         : 2018.10.04
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		gubun_Changed : function() {
//			$wrmViewJobs.ui.conditionWageType = $('#vjSelectSalaryLevel #vjSalaryLevelGubun option:selected').val();
			var type = $('#vjSelectSalaryLevel #vjSalaryLevelGubun option:selected').val();
			$workRoad.ui.selectCommonCode('WGTY_' + type, $vjSelectSalaryLevel.ui.drawItems);
			$vjConditionList.ui.displayCount('#vjSelectSalaryLevel #vjDataList');
		},
		/**
		 * @name         : 구분 선택 목록 생성 
		 * @description  : 
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawConditionItems : function(pId, pDataList) {
			var html = '';
			
			for(var  i = 0; i < pDataList.length; i ++) {
				html += '<option value="' + pDataList[i].cd + '">' + pDataList[i].nm + '</option>'; 
			}

			$(pId).html(html);
		},
		/**
		 * @name         : 선택 목록 생성
		 * @description  : 
		 * @date         : 2018.10.04
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItems : function(pDataList) {			
			var html = "";
			var cndId = $vjConditionList.ui.getConditionId("#vjSelectSalaryLevel");
			var cndItem = $wrmViewJobs.ui.getCondition(cndId);
			var checked = "";
			var on = "";
			
			for(var  i = 0; i < pDataList.length; i ++) {
				if (cndItem != null && cndItem.codeList.includes(pDataList[i].exp)) {
					checked = "checked='checked'";
					on = "class='on'";
				} else {
					checked = "";
					on = "";
				}
				
				html += "<li>";
				html += "<input type='checkbox'  name='condition' id='rb" + (i+1) + "' value='" + pDataList[i].exp + "'" + checked + "/>"; 
				html += "<label for='rb" + (i+1) + "'" + on + ">" + pDataList[i].nm + "</label>";
				html += "</li>";
			}

			$("#vjSelectSalaryLevel #vjDataList").html(html);
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
			var ck = $(pSender).hasClass('on');
			if(!ck){
				$(pSender).addClass('on');
				$(pSender).prev().attr('checked', 'checked');
			}else{
				$(pSender).removeClass('on');
				$(pSender).prev().removeAttr('checked');
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
			var wageType = $('#vjSelectSalaryLevel #vjSalaryLevelGubun option:selected').val();
			$wrmViewJobs.ui.setConditionCode('#vjSelectSalaryLevel', {wageType: wageType});
//			if ($wrmViewJobs.ui.setConditionCode('#vjSelectSalaryLevel', {wageType: wageType}) == false){
//				alert("항목을 선택하세요.");
//				return;
//			}
			$vjConditionList.ui.displayCount('#vjSelectSalaryLevel #vjDataList');
			this.hideDialog();			
			$vjJobInfoList.ui.show();	
			
			var slwDeptCd = "level=" + $('#vjSelectSalaryLevel option:selected').val();
			var slwParams = "";
            $.each($('#vjSelectSalaryLevel #vjDataList' + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		slwParams += $(this).val() + ','
            	}
            });
			// 2019.03.13 접근log 생성
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '03', '03', '05', slwDeptCd, slwParams);
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
			$("#vjSelectSalaryLevel #vjDataList input").removeAttr("checked");
			$("#vjSelectSalaryLevel #vjDataList label").removeClass("on");
			
			$wrmViewJobs.ui.setConditionCode('#vjSelectSalaryLevel');
			$vjConditionList.ui.displayCount('#vjSelectSalaryLevel #vjDataList');
		},
	};	
	
	$vjSelectSalaryLevel.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 */
		setUIEvent: function() {
			console.log("$vjSelectSalaryLevel.event.setUIEvent() called.");

			$workRoad.event.set("change","#vjSelectSalaryLevel #vjSalaryLevelGubun", function() {
				$vjSelectSalaryLevel.ui.gubun_Changed();
			});					
			// 다중 라디오버튼 선택
			$workRoad.event.set("click","#vjSelectSalaryLevel #vjDataList label",function(){
				$vjSelectSalaryLevel.ui.toggleItem(this);				
		    });
			// 선택완료
			$workRoad.event.set("click", "#vjSelectSalaryLevel #vjOk", function() {
				$vjSelectSalaryLevel.ui.contents_Selected();
			});			
			// 선택취소
			$workRoad.event.set("click", "#vjSelectSalaryLevel #vjClear", function() {
				$vjSelectSalaryLevel.ui.contents_Clear();
			});			
			// 취소	
			$workRoad.event.set("click", "#vjSelectSalaryLevel #vjCancel", function() {
				$vjSelectSalaryLevel.ui.hideDialog();
			});		
		},			
	}
	
}(window, document));