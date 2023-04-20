/**
 * 일자리 현황 조회 조건 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계분석 > 일자리 증감 > 주요지표 > 조회 조건 팝업
 * 
 * history : 
 *	2020.05.14	곽제욱 최초 생성
 *
 * author : 곽제욱
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaJobGrowthSearchPopup = W.$ssaJobGrowthSearchPopup || {};
	
	$ssaJobGrowthSearchPopup.ui = {
		pSelector	: "#ssaJobGrowthSearchPopup",
		ssaJobGrowthSearchPopupList : ["E3224"],
		searchbtnCnt : 0,
		
		
		
		/**
		 * @name         : ready
		 * @description  : 최초 화면 Open할때 실행 / 메뉴 선택 시점
		 * @date         : 2020.05.14
		 * @author	     : 곽제욱
		 * @history 	 : 
		 */
		ready : function(ParamLink_id) {
			
		},
		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2020.05.14
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * 		2020.05.14	곽제욱	신규
		 * @param
		 */
		show : function(ParamLink_id) {
			$workRoad.ui.showDialog(this.pSelector);
			
			$ssaJobGrowthSearchPopup.ui.ChangeCondition(ParamLink_id);
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2020.05.14
		 * @author	     : 곽제욱
		 * @history 	 : 
		 * 		2020.05.14	곽제욱	 신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideDialog("#ssaJobGrowthSearchPopup");
		},	
		
		/**
		 * @name         : ChangeCondition
		 * @description  : 일자리현황 조회 조건 변경
		 * @date         : 2020.05.14
		 * @author	     : 곽제욱
		 * @history 	 : 
		 */
		ChangeCondition : function(item) {
			for(var i=0; i<this.ssaJobGrowthSearchPopupList.length; i++){
				if(this.ssaJobGrowthSearchPopupList[i] == item){
					for(var j=1; j<11; j++){	//_C10까지 있음
						if(j == 1){	//기본 서브 조건
							var DivShow = "";
							DivShow = "#ssaJobGrowthSearchPopup #"+item+"_condition_C"+j;
							
							$(DivShow).show();
							
							$('input:radio[name="condition_map_type"]').eq(0).prop("checked", true);	//지도 선택
							
							switch(item){
								case("E3224") : $('input:radio[name="unemployment_rate"]').eq(0).next().click();
												$("#ssaJobGrowthSearchPopup #E3224_condition_C1").click();
												$("#E3224_condition_C1 input[type='radio']").prop("checked", true);
												$("#E3224_condition_C2 input[type='radio']").eq(0).prop("checked", true);
								break;	//피보험자 증감
							}
						}else if(j > 8){	//타이틀 설명
							var DivShow = "#ssaJobGrowthSearchPopup #"+item+"_condition_C"+j;
							$(DivShow).show();
						}
					}
				}else{
					for(var j=1; j<11; j++){	//_C10까지 있음
						var DivHide = "#ssaJobGrowthSearchPopup #"+this.ssaJobGrowthSearchPopupList[i]+"_condition_C"+j;
						$(DivHide).hide();
					}
				}
			}
		},
		
		/**
		 * 
		 * @name         : addSearchBtn
		 * @description  : 조건검색버튼을 생성한다.	->	상세 조회 팝업으로 변경(20181101)
		 * @date         : 2020.05.14
		 * @author	     : 곽제욱
		 * @history 	 :
		 */
		addSearchBtn : function() {
			var DivChkCnt = 0;
			var SearchParam = [];
			var Var_Title = "";
			var ParamLink_id = "";
			var ParamLink_Nm = "";
			var ParamCx = "";
			var ParamCx_Nm = "";
			//20181211 손원웅 추가_맵 타이틀 년,월 정보 삭제.
			if ($ssaMap.ui.curMapId == "0") {
				$('span[id="wrmSubTitle1"] *').remove();
			}else if ($ssaMap.ui.curMapId == "1") {
				$('span[id="wrmSubTitle2"] *').remove();
			}else if ($ssaMap.ui.curMapId == "2"){
				$('span[id="wrmSubTitle3"] *').remove();
			}else{
				$('span[id="wrmSubTitle"] *').remove();
			}
			
			//조회버튼은 최대 10개만 가능
			//if(this.btnLimitCnt()) {
				for(var i=0; i<this.ssaJobGrowthSearchPopupList.length; i++){
					var oDiv = document.getElementById(this.ssaJobGrowthSearchPopupList[i]);
					if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
						switch(this.ssaJobGrowthSearchPopupList[i]){
							case("E3224") : Var_Title = "피보험자 증감"; break;
						}
						ParamLink_id = this.ssaJobGrowthSearchPopupList[i];	//Link_id 세팅(첫번째 조회조건)
						DivChkCnt++;
						for(var j=1; j<9; j++){	//_C8까지 (조건만)
							var DivID = "#ssaJobGrowthSearchPopup #"+this.ssaJobGrowthSearchPopupList[i]+"_condition_C"+j;
							
							if($(DivID).css("display") == "block"){
								if(DivID.indexOf("_C1") == "-1"){
									ParamCx = $(DivID+" input[type='radio']:checked").val();	//(두번째 조회조건) 
									ParamCx_Nm = $('label[for='+$(DivID+" input[type='radio']:checked").prop("id")+']').text();	//label text
								}else{	//C1일 경우
									//ParamLink_id = $(DivID+" input[type='radio']:checked").val();		//C1 있을 경우 위에서 세팅한 Link_id 값 대체(첫번째 조회조건)
									ParamLink_id = $(DivID+" input[type='radio']:checked").val();
									ParamLink_Nm = $('label[for='+$(DivID+" input[type='radio']:checked").prop("id")+']').text();	//label text
								}
							}
						}
					}
				}
				
				//지표 선택여부 확인
				if(DivChkCnt == 0){
					messageAlert.open("알림", "검색조건을 생성 할 지표를 선택해주세요!!");
					return;
				}
				
				var that = $ssaJobGrowth.ui;
				
				/** 2020.05.14 [곽제욱] 일자리증감 조회조건을 팝업 변경으로 인한 수정 START */
				if(ParamLink_id==undefined){
					for(var i=0; i<this.ssaJobGrowthList.length; i++){
						var oDiv = document.getElementById(this.ssaJobGrowthList[i]);
						if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
							switch(this.ssaJobGrowthList[i]){
								case("E3224") : ParamLink_id = "E3224"; break; // ParamLink_id 가 없는경우 선택한 통계 확인하여 ID 세팅
							}
						}
					}
				}
				
				//최종 param 세팅
				that.SearchParam = {
					Title : Var_Title,
					Link_id : ParamLink_id,
					Link_nm : ParamLink_Nm,
					Cx : ParamCx,
					Cx_nm : ParamCx_Nm
				}
				
				this.MapType = $("#ssaJobGrowthSearchPopup_map_type input[type='radio']:checked").val();

				$workRoad.ui.hideDialog("#ssaJobGrowthSearchPopup");
				$ssaJobGrowth.ui.hide();
				
				this.searchbtnCnt++;
				$ssaJobGrowthDetailPopup.ui.show();
			//}
		},
		
		/**
		 * 
		 * @name         : btnLimitCnt
		 * @description  : 버튼갯수 
		 * @date         : 2020.05.14
		 * @author	     : 곽제욱
		 * @history 	 :
		 * @param
		 */
		btnLimitCnt : function() {
			var cnt = $("#ssaSearchPopup #searchBtnResultRgn").find("li:visible").length;
			if(cnt > 9) {
				messageAlert.open("알림", "버튼은 최대 10개까지 생성 가능합니다.");
				return false;
			}
			return true;
		},

	};	
	
	$ssaJobGrowthSearchPopup.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2020.05.14
			 * @author		 : 곽제욱
			 * @history 	 :
			 * 		2020.05.14	곽제욱		신규
			 */
			setUIEvent: function() {
				// 닫기 버튼
				$workRoad.event.set("click", "#ssaJobGrowthSearchPopup .topbar>a", function() {
					$workRoad.ui.hideDialog("#ssaJobGrowthSearchPopup");
				});
				$workRoad.event.set("click", "#ssaJobGrowthSearchPopup .indicator-stepBox label", function() {
					$workRoad.event.checkLabel($(this));
				});
			},
	}
	
	//피보험자 증감
	$("#ssaJobGrowthSearchPopup #E3224_condition_C1").click(function() {
		$("#ssaJobGrowthSearchPopup #E3224_condition_C1").show();
		$("#ssaJobGrowthSearchPopup #E3224_condition_C2").show();
	});
	
	
}(window, document)); 