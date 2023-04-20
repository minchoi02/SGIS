/**
 * 조건 선택 목록 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 조건 선택 목록
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
	W.$vjConditionList = W.$vjConditionList || {};
	
	$vjConditionList.ui = {

		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function() {
			$workRoad.ui.showLayer('#vjConditionList');
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideLayer('#vjConditionList');
		},
		//2019-06-10 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
		/**
		 * @name         : 화면 초기화
		 * @description  : 
		 * @date         : 2019.06.10
		 * @author	     : 김남민
		 * @history 	 : 
		 * 		2019.06.10	김남민	신규
		 * @param
		 */
		clear : function() {
			$vjConditionList.ui.clearCount();
			
			// 기업명 초기화
			$("#vjSelectAllCompanyNameList").val("");
			
			// 검색항목 접고 class 제거
			$("#vjSelectAll [name='vjSelectAllDataToggle']").each(function(){
				var lvThis = $(this);
				var lvThisId = lvThis.attr("id");
				var lvTartgetId = lvThisId.replace(/DataDiv/g,"DataToggle");
				var lvTartget = $("#"+lvTartgetId);
				var lvTartgetId2 = lvThisId.replace(/DataToggle/g,"DataDiv");
				var lvTartget2 = $("#"+lvTartgetId2);
				
				//희망지역 제외
				if(lvTartgetId == "vjSelectAllAreaDataToggle") return;
				//기업명 제외
				if(lvTartgetId == "vjSelectAllCompanyNameDataToggle") return;
				
				lvTartget.removeClass("on");
				lvTartget.removeClass("dataon");
				lvTartget2.css("overflow","hidden");
				lvTartget2.css("border-bottom","1px solid #dadee1");
				lvTartget2.find("div.cont-info").css("padding","0px");
				lvTartget2.stop().animate({"height":"44px"},200);
				if(lvTartgetId != "vjSelectAllSalaryLevelDataToggle") {
					if(lvTartget2.find("li label.on").length > 0) {
						lvTartget2.find("li label").parent().hide();
						lvTartget2.find("li label.on").parent().show();
					}
				}
		    });
			
			//급여수준 초기화
			$("#vjSelectAllSalaryLevelList1Name").removeClass("on");
			$("#vjSelectAllSalaryLevelList2Name").removeClass("on");
			$("#vjSelectAllSalaryLevelList3Name").removeClass("on");
			$("#vjSelectAllSalaryLevelList4Name").removeClass("on");
			
			//지역 초기화
			$("#vjSelectAll #vjSelectAllSidoSelect").prop("disabled",false);
			$("#vjSelectAll #vjSelectAllSidoSelect").css("background-color","");
			$("#vjSelectAll #vjSelectAllSidoSelect").css("cursor","");
		},
		//2019-06-10 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
		/**
		 * @name         : 위치 이동
		 * @description  : 
		 * @date         : 2018.10.29
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param	pRight	: style right 값
		 * 					  undefined - 0
		 */
		move : function(pRight) {
			if (typeof pRight != 'undefined') {
				$('#vjConditionList .info-job').stop().animate({right: pRight},200);
			} else {
				$('#vjConditionList .info-job').stop().animate({right: '5px'},200);
			}
		},
		/**
		 * @name         : 조건(메뉴) 선택
		 * @description  : 조건 목록중에서 하나를 선택했을때
		 * @date         : 2018.09.10
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.10	ywKim	신규
		 * @param pIndex	: 메뉴 순번
		 */
		changeSubMenu : function (pIndex) {
			
//			$wrmViewJobs.ui.setConditionIndex(pIndex);
			
			switch (pIndex){
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
			case -1: $vjSelectAll.ui.showDialog(); break;			// 통합검색
			case 0: $vjSelectDesiredArea.ui.showDialog(); break;			// 희망지역
			case 1: $vjSelectCompanyType.ui.showDialog(); break;			// 기업형태
			case 2: break;													// 회사규모
			case 3: $vjSelectJobClassification.ui.showDialog(); break;		// 직종분류
			case 4: $vjSelectSalaryLevel.ui.showDialog(); break;			// 급여수준
			case 5: $vjSelectEmploymentType.ui.showDialog(); break;			// 고용형태
			case 6:	break;													// 근무형태
			case 7: $vjSelectAcademicAbility.ui.showDialog(); break;		// 학력
			case 8: $vjSelectCareer.ui.showDialog(); break;					// 경력
			case 9: $vjSelectIndustryClassification.ui.showDialog(); break;	// 산업분류
			}
		},
//		getConditionId : function (pIndex) {
//			
//			switch (pIndex) {
//			case 0: return "";//'DESIRED_AREA'; break;
//			case 1: return "COMPANY_TYPE";
////			case 2: return "COMPANY_SIZE";
//			case 3: return "INDUSTRY_CLASSIFICATION";
//			case 4: return "JOB_CLASSIFICATION";
//			case 5: return "SALARY_LEVEL";
//			case 6: return "EMPLOYMENT_TYPE";
////			case 7: return "WORK_TYPE";"
//			case 8: return "ACADEMIC_ABILITY";
//			case 9: return "CAREER";
//			}
//		},
		getConditionId : function (pSelector) {
			var layerId = pSelector;
			if (pSelector.split(" ").length > 1) {
				layerId = pSelector.split(" ")[0];
			}
			
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
			if(layerId.indexOf("#vjSelectAllSalaryLevelList") >= 0) layerId = "#vjSelectAllSalaryLevelList";
			switch (layerId) {
			case "#vjSelectAll": return "ALL";
			case "#vjSelectDesiredArea": return "";//'DESIRED_AREA'; break;
			case "#vjSelectCompanyType": return "COMPANY_TYPE";
			case "#vjSelectAllCompanyNameList": return "COMPANY_NAME";
			case "#vjSelectAllCompanyTypeList": return "COMPANY_TYPE";
			case "#vjSelectCompanySize": return "COMPANY_SIZE";
			case "#vjSelectJobClassification": return "JOB_CLASSIFICATION";
			case "#vjSelectAllJobClassificationList": return "JOB_CLASSIFICATION";
			case "#vjSelectSalaryLevel": return "SALARY_LEVEL";
			case "#vjSelectAllSalaryLevelList":
			case "[id^='vjSelectAllSalaryLevelList']": return "SALARY_LEVEL2"; // 다른방식으로 처리
			case "#vjSelectEmploymentType": return "EMPLOYMENT_TYPE";
			case "#vjSelectAllEmploymentTypeList": return "EMPLOYMENT_TYPE";
			case "#vjSelectWorkType": return "WORK_TYPE";
			case "#vjSelectAcademicAbility": return "ACADEMIC_ABILITY";
			case "#vjSelectAllAcademicAbilityList": return "ACADEMIC_ABILITY";
			case "#vjSelectCareer": return "CAREER";
			case "#vjSelectAllCareerList": return "CAREER";
			case "#vjSelectIndustryClassification": return "INDUSTRY_CLASSIFICATION";
			case "#vjSelectAllIndustryClassificationList": return "INDUSTRY_CLASSIFICATION";
			}
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
			return "";
		},
		getMenuIndex : function (pSelector) {
			var layerId = pSelector;
			if (pSelector.split(" ").length > 1) {
				layerId = pSelector.split(" ")[0];
			}
			
			switch (layerId) {
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
			case "#vjSelectAll": return -1;
			case "#vjSelectDesiredArea": return 0;
			case "#vjSelectCompanyType": return 1;
			case "#vjSelectCompanySize": return 2;
			case "#vjSelectJobClassification": return 3;
			case "#vjSelectSalaryLevel": return 4;
			case "#vjSelectEmploymentType": return 5;
			case "#vjSelectWorkType": return 6;
			case "#vjSelectAcademicAbility": return 7;
			case "#vjSelectCareer": return 8;
			case "#vjSelectIndustryClassification": return 9;
			}
			return -1;
		},
		clearCount : function () {
			$("#vjConditionList ul").children("li").each(function(){
				var $that = $(this).find("a");
				var html = $that.html();
				var pos = html.indexOf(" (");				
				if (pos >= 0) {
					html = html.substring(0, pos);
				}
				
				$that.html(html);
			});
		},
		displayCount : function (pSelector) {
			var cndId = $vjConditionList.ui.getConditionId(pSelector);
			var cndItem = $wrmViewJobs.ui.getCondition(cndId);
			var cnt = (cndItem != null) ? cndItem.codeList.length : 0;			
			var idx = $vjConditionList.ui.getMenuIndex(pSelector);
			var $liList = $("#vjConditionList ul").children("li");
			
			if (idx >= 0 && idx < $liList.length) {
				var $li = $liList.eq(idx);
				
				var html = $li.find("a").html();
				var pos = html.indexOf(" (");
				
				if (cnt > 0) {										
					if (pos >= 0) {
						html = html.substring(0, pos);
					}
					html = html + " (" + cnt + ")";
				} else {
					if (pos >= 0) {
						html = html.substring(0, pos);
					}
				}
				
				$li.find("a").html(html);
			}
		},
	};	
	
	$vjConditionList.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 * 		2018.09.17	ywKim	신규
		 */
		setUIEvent: function() {
			console.log("$vjConditionList.event.setUIEvent() called.");
			
			$workRoad.event.set("click", "#vjConditionList .choice-list a", function() {
				$("#vjConditionList .choice-list a").removeClass("on");
				$(this).addClass("on");
				
				var idx = $(this).closest('li').index();
				//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선.
				$vjConditionList.ui.changeSubMenu(idx-1);
			});
		},			
	}
	
}(window, document));