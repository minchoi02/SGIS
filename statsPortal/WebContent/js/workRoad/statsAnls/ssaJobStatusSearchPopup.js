/**
 * 일자리 현황 조회 조건 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 통계분석 > 일자리 현황 > 주요지표 > 조회 조건 팝업
 * 
 * history : 
 *	2019.05.30	한광희
 *
 * author : 한광희
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$ssaJobStatusSearchPopup = W.$ssaJobStatusSearchPopup || {};
	
	$ssaJobStatusSearchPopup.ui = {
		pSelector	: "#ssaJobStatusSearchPopup",
		ssaJobStatusSearchPopupList : ["I3111","I3114","I3116","I3104","I3112","I3117","I3101"],
		searchbtnCnt : 0,
		
		
		
		/**
		 * @name         : ready
		 * @description  : 최초 화면 Open할때 실행 / 메뉴 선택 시점
		 * @date         : 2019.05.30
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		ready : function(ParamLink_id) {
			
		},
		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2019.05.30
		 * @author	     : 한광희
		 * @history 	 : 
		 * 		2019.05.30	한광희	신규
		 * @param
		 */
		show : function(ParamLink_id) {
			$workRoad.ui.showDialog(this.pSelector);
			
			$ssaJobStatusSearchPopup.ui.ChangeCondition(ParamLink_id);
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2019.05.30
		 * @author	     : 한광희
		 * @history 	 : 
		 * 		2019.05.30	한광희	 신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideDialog("#ssaJobStatusSearchPopup");
		},	
		
		/**
		 * @name         : ChangeCondition
		 * @description  : 일자리현황 조회 조건 변경
		 * @date         : 2019.05.30
		 * @author	     : 한광희
		 * @history 	 : 
		 */
		ChangeCondition : function(item) {
			for(var i=0; i<this.ssaJobStatusSearchPopupList.length; i++){
				if(this.ssaJobStatusSearchPopupList[i] == item){
					for(var j=1; j<11; j++){	//_C10까지 있음
						if(j == 1){	//기본 서브 조건
							/** 2019.07.31[한광희] 일자리통계분석 > 일자리현황 > 비경제활동인구 POPUP 조회 오류 수정 START */
							//var DivShow = "#ssaJobStatusSearchPopup #"+item+"_condition_C"+j;
							var DivShow = "";
							if(item == "I3117"){
								DivShow = "#ssaJobStatusSearchPopup #"+item+"_condition_C2";
							} else {
								DivShow = "#ssaJobStatusSearchPopup #"+item+"_condition_C"+j;
							}
							/** 2019.07.31[한광희] 일자리통계분석 > 일자리현황 > 비경제활동인구 POPUP 조회 오류 수정 END */
							
							$(DivShow).show();
							
							$('input:radio[name="condition_map_type"]').eq(0).prop("checked", true);	//지도 선택
							//$('input:radio[name="Sido"]').eq(0).prop("checked", true);	//전국
							
							switch(item){
								case("I3114") : $('input:radio[name="unemployment_rate"]').eq(0).next().click();
												$("#ssaJobStatusSearchPopup #I3114_condition_C1").click();
								break;	//실업률
								case("I3104") : $('input:radio[name="employed_person"]').eq(0).next().click();
												$("#ssaJobStatusSearchPopup #I3104_condition_C1").click();
								break;	//취업자수
								case("I3112") : $('input:radio[name="unemployed_person"]').eq(0).next().click(); 
												$("#ssaJobStatusSearchPopup #I3112_condition_C1").click();
								break;	//실업자수
								case("I3101") : $('input:radio[name="population"]').eq(0).next().click();
												$("#ssaJobStatusSearchPopup #I3101_condition_C1").click();
								break;	//세대수
							}
						}else if(j > 8){	//타이틀 설명
							var DivShow = "#ssaJobStatusSearchPopup #"+item+"_condition_C"+j;
							$(DivShow).show();
						}
					}
				}else{
					for(var j=1; j<11; j++){	//_C10까지 있음
						var DivHide = "#ssaJobStatusSearchPopup #"+this.ssaJobStatusSearchPopupList[i]+"_condition_C"+j;
						$(DivHide).hide();
					}
				}
			}
		},
		
		/**
		 * 
		 * @name         : addSearchBtn
		 * @description  : 조건검색버튼을 생성한다.	->	상세 조회 팝업으로 변경(20181101)
		 * @date         : 2019.05.30
		 * @author	     : 한광희
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
				for(var i=0; i<this.ssaJobStatusSearchPopupList.length; i++){
					var oDiv = document.getElementById(this.ssaJobStatusSearchPopupList[i]);
					if(oDiv.style.backgroundColor == "rgb(0, 198, 237)"){	//rgb(0, 198, 237) = #00C6ED	백그라운드 컬러 바뀌면 변경해야함
						switch(this.ssaJobStatusSearchPopupList[i]){
							case("I3111") : Var_Title = "고용률"; break;
							case("I3114") : Var_Title = "실업률"; break;
							case("I3116") : Var_Title = "청년실업률"; break;
							case("I3104") : Var_Title = "취업자수"; break;
							case("I3112") : Var_Title = "실업자수"; break;
							case("I3117") : Var_Title = "비경제활동인구"; break;
							case("I3101") : Var_Title = "세대수"; break;
						}
						ParamLink_id = this.ssaJobStatusSearchPopupList[i];	//Link_id 세팅(첫번째 조회조건)
						DivChkCnt++;
						for(var j=1; j<9; j++){	//_C8까지 (조건만)
							var DivID = "#ssaJobStatusSearchPopup #"+this.ssaJobStatusSearchPopupList[i]+"_condition_C"+j;
							
							if($(DivID).css("display") == "block"){
								if(DivID.indexOf("_C1") == "-1"){
									ParamCx = $(DivID+" input[type='radio']:checked").val();	//(두번째 조회조건) 
									ParamCx_Nm = $('label[for='+$(DivID+" input[type='radio']:checked").prop("id")+']').text();	//label text
								}else{	//C1일 경우
									ParamLink_id = $(DivID+" input[type='radio']:checked").val();		//C1 있을 경우 위에서 세팅한 Link_id 값 대체(첫번째 조회조건)
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
				
				//최종 param 세팅
				this.SearchParam = {
					Title : Var_Title,
					Link_id : ParamLink_id,
					Link_nm : ParamLink_Nm,
					Cx : ParamCx,
					Cx_nm : ParamCx_Nm
				}
				
				this.MapType = $("#ssaJobStatusSearchPopup_map_type input[type='radio']:checked").val();

				$workRoad.ui.hideDialog("#ssaJobStatusSearchPopup");
				$ssaJobStatus.ui.hide();
				
				this.searchbtnCnt++;
				$ssaDetailPopup.ui.show(ParamLink_id);
			//}
		},
		
		/**
		 * 
		 * @name         : btnLimitCnt
		 * @description  : 버튼갯수 
		 * @date         : 2019.05.30
		 * @author	     : 한광희
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
	
	$ssaJobStatusSearchPopup.event = {
			/**
			 * @name		 : 이벤트 바인딩 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2019.05.30
			 * @author		 : 한광희
			 * @history 	 :
			 * 		2019.05.30	한광희		신규
			 */
			setUIEvent: function() {
				// 닫기 버튼
				$workRoad.event.set("click", "#ssaJobStatusSearchPopup .topbar>a", function() {
					$workRoad.ui.hideDialog("#ssaJobStatusSearchPopup");
				});
				$workRoad.event.set("click", "#ssaJobStatusSearchPopup .indicator-stepBox label", function() {
					$workRoad.event.checkLabel($(this));
				});
			},
	}
	
	//실업률
	$("#ssaJobStatusSearchPopup #I3114").click(function() {
		$("#ssaJobStatusSearchPopup #I3114_condition_C1").show();
		$("#ssaJobStatusSearchPopup #I3114_condition_C2").show();
	});
	
	$("#ssaJobStatusSearchPopup #I3114_condition_C1").click(function() {
		$("input[name=unemployment_rate]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3114"){	//성별
					$("#ssaJobStatusSearchPopup #I3114_condition_C3").hide();
					$("#ssaJobStatusSearchPopup #I3114_condition_C2").show();
				}else if($(this).val() == "I3115"){	//연령별
					$("#ssaJobStatusSearchPopup #I3114_condition_C2").hide();
					$("#ssaJobStatusSearchPopup #I3114_condition_C3").show();
				}
			}
		})
	});
	
	//취업자수
	$("#ssaJobStatusSearchPopup #I3104").click(function() {
		$("#ssaJobStatusSearchPopup #I3104_condition_C1").show();
		$("#ssaJobStatusSearchPopup #I3104_condition_C2").show();
	});
	
	$("#ssaJobStatusSearchPopup #I3104_condition_C1").click(function() {
		$("input[name=employed_person]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3104"){	//성별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==2){	//연령별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3105"){	//연령별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==3){	//연령별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3106"){	//교육정도별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==4){	//교육정도별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3107"){	//종사상지위별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==5){	//조사상지위별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3108"){	//취업시간별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==6){	//취업시간별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3109"){	//직업별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==7){	//직업별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}else if($(this).val() == "I3110"){	//산업별
					for(var i=2; i<9; i++){
						var Div_Num = "#I3104_condition_C"+i;
						if(i==8){	//산업별
							$(Div_Num).show();
						}else{
							$(Div_Num).hide();
						}
					}
				}
			}
		})
	});
	
	//실업자수
	$("#ssaJobStatusSearchPopup #I3112").click(function() {
		$("#ssaJobStatusSearchPopup #I3112_condition_C1").show();
		$("#ssaJobStatusSearchPopup #I3112_condition_C2").show();
	});
	
	$("#ssaJobStatusSearchPopup #I3112_condition_C1").click(function() {
		$("input[name=unemployed_person]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3112"){	//성별
					$("#ssaJobStatusSearchPopup #I3112_condition_C3").hide();
					$("#ssaJobStatusSearchPopup #I3112_condition_C2").show();
				}else if($(this).val() == "I3113"){	//연령별
					$("#ssaJobStatusSearchPopup #I3112_condition_C2").hide();
					$("#ssaJobStatusSearchPopup #I3112_condition_C3").show();
				}
			}
		})
	});
	
	//비경제활동인구
	$("#ssaJobStatusSearchPopup #I3117").click(function() {
		$("#ssaJobStatusSearchPopup #I3117_condition_C2").show();
	});
	
	//세대수
	$("#ssaJobStatusSearchPopup #I3101").click(function() {
		$("#ssaJobStatusSearchPopup #I3101_condition_C1").show();
	});
	
	//$workRoad.event.set('click', '#ssaJobStatusSearchPopup #I3101_condition_C1', fun... 
	$("#ssaJobStatusSearchPopup #I3101_condition_C1").click(function() {
		$("input[name=population]").each(function(){
			if($(this).is(":checked")== true){
				if($(this).val() == "I3101"){	//세대수
					$("#ssaJobStatusSearchPopup #I3101_condition_C3").hide();
					$("#ssaJobStatusSearchPopup #I3101_condition_C4").hide();
				}else if($(this).val() == "I3102"){	//총전입,전출,순이동,시도내,시도간(전출입)
					$("#ssaJobStatusSearchPopup #I3101_condition_C4").hide();
					$("#ssaJobStatusSearchPopup #I3101_condition_C3").show();
				}else if($(this).val() == "I3103"){	//이동자수,순이동자수
					$("#ssaJobStatusSearchPopup #I3101_condition_C3").hide();
					$("#ssaJobStatusSearchPopup #I3101_condition_C4").show();
				}
			}
		})
	});
	
}(window, document)); 