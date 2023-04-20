/**
 * 통합검색 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 통합검색 선택
 * 
 * history : 
 *	2019.05.10	김남민	신규
 *
 * author : 김남민
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjSelectAll = W.$vjSelectAll || {};
	
	$vjSelectAll.ui = {
		showFirstYn : "Y",
		/**
		 * @name         : 화면 띄우기 (모달)
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		showDialog : function() {
			$workRoad.ui.showDialog('#vjSelectAll');
			
			// 시도 SELECT 박스 채우기
			//{sido_cd: "99", sido_nm: "전체", y_coor: "1950400.01227", x_coor: "955182.550397"}
			if($wrmViewJobs.ui.sidoList != null && $wrmViewJobs.ui.sidoList.length > 0) {
				try {
					if($wrmViewJobs.ui.sidoList[0].sido_cd != "99") {
						var lvSidoList = [{sido_cd: "99", sido_nm: "전체", y_coor: "1818313", x_coor: "989674"}];
						lvSidoList = lvSidoList.concat($wrmViewJobs.ui.sidoList);
						$wrmViewJobs.ui.sidoList = lvSidoList;
					}
				} catch(e) { }
			}
			$workRoad.ui.setSidoCombo("#vjSelectAll #vjSelectAllSidoSelect", $wrmViewJobs.ui.sidoList);
			// 시도 항목 선택하기
			$vjSelectAll.ui.selectSido($wrmViewJobs.ui.defaultSidoCd.replace(/all/g,"99"));
			
			// 처음한번 동작
			if($vjSelectAll.ui.showFirstYn == "Y") {
				$vjSelectAll.ui.showFirstYn = "N";
				
				// 내주변 일자리 시도 코드 사용
				if(gv_url == "myNeighberhoodJob" && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "" && gv_sido_cd != "99" && $wrmViewJobs.ui.defaultSidoCd.replace(/all/g,"99") != "99") {
					// 시도 콤보박스 disable 처리
					//$("#tsMain #"+type+"-sido-select").css("background","#EEEEEE !important"); //이미 background-color가 !important로 선언된게 있어서 Chrome에서 동작안함.
					var lvTempStyle = $("#vjSelectAll #vjSelectAllSidoSelect").attr("style");
					if(lvTempStyle == undefined) lvTempStyle = "";
					$("#vjSelectAll #vjSelectAllSidoSelect").attr("style","background-color:#EEEEEE !important;"+lvTempStyle);
					$("#vjSelectAll #vjSelectAllSidoSelect").prop("disabled",true);
					$("#vjSelectAll #vjSelectAllSidoSelect").css("cursor","auto");
				}
			}
			
			/************** 기업형태 (vjSelectCompanyType.js) **************/
			var dataParams = {};
			dataParams.b_class_cd = "ENTTYP";
			dataParams.condition_type = "COMPANY_TYPE";
			dataParams.latest_reg_date = $wrmViewJobs.ui.today;
			dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
			dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
			$wrmViewJobs.ui.selectConditionList(dataParams, $vjSelectAll.ui.drawItemsCompanyType);
			$workRoad.event.setToolTip("#vjSelectAll #vjSelectAllCompanyTypeList label");
			
			/************** 직종분류 (vjSelectJobClassification.js) **************/
			dataParams = {};
			dataParams.b_class_cd = "RCRJSS";
			dataParams.s_class_cd_len = 2;
			dataParams.condition_type = "JOB_CLASSIFICATION";
			dataParams.latest_reg_date = $wrmViewJobs.ui.today;
			dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
			dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
			$wrmViewJobs.ui.selectConditionList(dataParams, $vjSelectAll.ui.drawItemsJobClassification);
			$workRoad.event.setToolTip("#vjSelectAll #vjSelectAllJobClassificationList label");
			
			/************** 급여수준 (vjSelectSalaryLevel.js) **************/
			$workRoad.ui.selectCommonCode('WAGETY', $vjSelectAll.ui.drawItemsSalaryLevel);
			$workRoad.event.setToolTip("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label");
			
			/************** 고용형태 (vjSelectEmploymentType.js) **************/
			$workRoad.ui.selectCommonCode('EMPTYP', $vjSelectAll.ui.drawItemsEmploymentType);
			$workRoad.event.setToolTip("#vjSelectAll #vjSelectAllEmploymentTypeList label");
			
			/************** 학력(vjSelectAcademicAbility.js) **************/
			$workRoad.ui.selectCommonCode('ACDMCR', $vjSelectAll.ui.drawItemsAcademicAbility);
			$workRoad.event.setToolTip("#vjSelectAll #vjSelectAllAcademicAbilityList label");
			
			/************** 경력(vjSelectCareer.js) **************/
			$workRoad.ui.selectCommonCode('CAREER', $vjSelectAll.ui.drawItemsCareer);
			$workRoad.event.setToolTip("#vjSelectAll #vjSelectAllCareerList label");
			
			/************** 산업분류(vjSelectIndustryClassification.js) **************/
			dataParams = {};
			dataParams.b_class_cd = "INDCLA";
			dataParams.s_class_cd_len = 1;
			dataParams.condition_type = "INDUSTRY_CLASSIFICATION";
			dataParams.latest_reg_date = $wrmViewJobs.ui.today;
			dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
			dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
			$wrmViewJobs.ui.selectConditionList(dataParams, $vjSelectAll.ui.drawItemsIndustryClassification);
			$workRoad.event.setToolTip("#vjSelectAll #vjSelectAllIndustryClassificationList label");
			
			/************** 기업명 **************/
			setTimeout(function() {
				$("#vjSelectAllCompanyNameList").focus();
			}, 100);
		},
		
		/**
		 * @name         : drawItemsCompanyType
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItemsCompanyType : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectAllCompanyTypeList', pDataList);						
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllCompanyTypeList');
			$("#vjSelectAll #vjSelectAllCompanyTypeList label").removeAttr("for");
		},
		
		/**
		 * @name         : drawItemsJobClassification
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		drawItemsJobClassification : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectAllJobClassificationList', pDataList);
			//$vjSelectJobClassification.ui.drawItemGroups(pDataList);
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllJobClassificationList');
			$("#vjSelectAll #vjSelectAllJobClassificationList label").removeAttr("for");
		},
		
		/**
		 * @name         : drawItemsSalaryLevel
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		drawItemsSalaryLevel : function(pDataList) {
			var lvDataList = [];
			for(var i = 0; i < pDataList.length; i++) {
				var lvCd = pDataList[i].cd;
				var lvExp = pDataList[i].exp;
				var lvNm = pDataList[i].nm;
				$.ajax({
					type: "POST",
					url: contextPath + "/ServiceAPI/workRoad/selectCommonCode.json",
					async: false,
					dataType: "json",
					data: {b_class_cd : "WGTY_"+lvCd},
					success: function(res) {
						if (res.errCd == 0) {
							var dataList = res.result.dataList;
							var lvDataList2 = [];
							lvDataList2.push({
								cd : "WAGETY_"+lvCd,
								exp : lvExp,
								nm : lvNm
							});
							for(var j = 0; j < dataList.length; j++) {
								var llvCd = "WGTY_"+lvCd+"_"+dataList[j].cd;
								var llvExp = dataList[j].exp;
								var llvNm = ""+dataList[j].nm;
								lvDataList2.push({
									cd : llvCd,
									exp : llvExp,
									nm : llvNm
								});
							}
							lvDataList.push(lvDataList2);
						} else {
							alert('failed!');
						}
					} ,
					error:function(err) {
						alert(err.responseText);
					}  
				});
			}
			for(var i = 0; i < lvDataList.length; i++) {
				var lvTempDataValue = lvDataList[i][0].cd;
				// 시급, 일급, 월급, 연봉 분기처리
				if(lvTempDataValue == "WAGETY_H") $wrmViewJobs.ui.drawConditionItems('#vjSelectAllSalaryLevelList1', lvDataList[i]);
				else if(lvTempDataValue == "WAGETY_D") $wrmViewJobs.ui.drawConditionItems('#vjSelectAllSalaryLevelList2', lvDataList[i]);
				else if(lvTempDataValue == "WAGETY_M") $wrmViewJobs.ui.drawConditionItems('#vjSelectAllSalaryLevelList3', lvDataList[i]);
				else if(lvTempDataValue == "WAGETY_Y") $wrmViewJobs.ui.drawConditionItems('#vjSelectAllSalaryLevelList4', lvDataList[i]);
			}
			//$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllSalaryLevelList');
			$("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label").removeAttr("for");
			$("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label").each(function(){
				var ck = $(this).hasClass("on");
				var lvDataValue = $(this).prev().val();
				// 펼치기/접기 (안씀)
				if(lvDataValue.indexOf("WAGETY_") >= 0) {
					// 최상위 숨김 처리
					$(this).parent().hide();
					
					lvDataValue = lvDataValue.replace(/WAGETY_/g,"WGTY_");
					$("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label").each(function(){
						var lvDataValue2 = $(this).prev().val();
						if(lvDataValue2.indexOf(lvDataValue) >= 0) {
							if(!ck) {
								//$(this).parent().hide();
							}
							else {
								//$(this).parent().show();
							}
						}
					});
				}
			});
		},
		
		/**
		 * @name         : drawItemsEmploymentType
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItemsEmploymentType : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectAllEmploymentTypeList', pDataList);
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllEmploymentTypeList');
			$("#vjSelectAll #vjSelectAllEmploymentTypeList label").removeAttr("for");
		},
		
		/**
		 * @name         : drawItemsAcademicAbility
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItemsAcademicAbility : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectAllAcademicAbilityList', pDataList);
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllAcademicAbilityList');
			$("#vjSelectAll #vjSelectAllAcademicAbilityList label").removeAttr("for");
		},
		
		/**
		 * @name         : drawItemsCareer
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItemsCareer : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectAllCareerList', pDataList);
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllCareerList');
			$("#vjSelectAll #vjSelectAllCareerList label").removeAttr("for");
		},
		
		/**
		 * @name         : drawItemsIndustryClassification
		 * @description  : 선택 목록 생성
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawItemsIndustryClassification : function(pDataList) {
			$wrmViewJobs.ui.drawConditionItems('#vjSelectAllIndustryClassificationList', pDataList);						
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllIndustryClassificationList');
			$("#vjSelectAll #vjSelectAllIndustryClassificationList label").removeAttr("for");
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
		hideDialog : function() {
			$workRoad.ui.hideDialog('#vjSelectAll');
		},
		/**
		 * @name         : SELECT 박스에서 시도 항목 강제 선택하기
		 * @description  : 
		 * @date         : 2018.10.30
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		selectSido : function (pSidoCd) {
			$('#vjSelectAll #vjSelectAllSidoSelect').val(pSidoCd).prop("selected", true);
			
			// 일자리보기 공통 시군구 목록 조회
			$wrmViewJobs.ui.setSggList(pSidoCd);
			// 시군구 SELECT 박스 채우기
			$workRoad.ui.setSggCombo("#vjSelectAll #vjSelectAllSggSelect"
					, $wrmViewJobs.ui.sggList
					, $wrmViewJobs.ui.getSidoItem(pSidoCd)
					, true);
					//, (pSidoCd == "11" || pSidoCd == "31") ? false : true);	// 각 시도별 전체 활성화(서울, 경기도 제외)
			// 시군구 항목 선택하기
			$vjSelectAll.ui.selectSgg($wrmViewJobs.ui.defaultSggCd.replace(/all/g,"999"));
		},
		/**
		 * @name         : SELECT 박스에서 시군구 항목 강제 선택하기
		 * @description  : 
		 * @date         : 2018.10.30
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		selectSgg : function (pSggCd) {
			if (pSggCd != '' && pSggCd != '999') {// 현재 일자리 보기에서는 "전체"를 사용 안함
				$('#vjSelectAll #vjSelectAllSggSelect').val(pSggCd).prop("selected", true);
			} else {
				$('#vjSelectAll #vjSelectAllSggSelect').find("option:eq(0)").prop("selected", true);
			}
		},
		
		/**
		 * @name         : 통합검색 선택완료
		 * @description  : 통합검색 레이어에서 선택완료 버튼 클릭
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 */
		selectDesiredArea : function () {
			
			// 선택된 지역 변수에 설정
			var sidoCode = $('#vjSelectAll #vjSelectAllSidoSelect option:selected').val();
			var sggCode = $('#vjSelectAll #vjSelectAllSggSelect option:selected').val();
			var sidoName = $('#vjSelectAll #vjSelectAllSidoSelect option:selected').text();
			var sggName = $('#vjSelectAll #vjSelectAllSggSelect option:selected').text();
			var sidoCoorX = $('#vjSelectAll #vjSelectAllSidoSelect option:selected').data('coor-x');
			var sidoCoorY = $('#vjSelectAll #vjSelectAllSidoSelect option:selected').data('coor-y');
			var sggCoorX = $('#vjSelectAll #vjSelectAllSggSelect option:selected').data('coor-x');
			var sggCoorY = $('#vjSelectAll #vjSelectAllSggSelect option:selected').data('coor-y');
			if(sidoCode == "99") {
				sidoCode = "all";
				sggName = "";
			}
			$wrmViewJobs.ui.defaultSidoCd = sidoCode;
			$wrmViewJobs.ui.defaultSggCd = sggCode;
			$wrmViewJobs.ui.defaultSidoNm = sidoName;
			$wrmViewJobs.ui.defaultSggNm = sggName;
			$wrmViewJobs.ui.defaultSidoCoorX = sidoCoorX;
			$wrmViewJobs.ui.defaultSidoCoorY = sidoCoorY;
			$wrmViewJobs.ui.defaultSggCoorX = sggCoorX;
			$wrmViewJobs.ui.defaultSggCoorY = sggCoorY;
			if (sggCode != '' && sggCode != '999') {
				$wrmViewJobs.ui.naviConfirm([sidoCoorX, sidoCoorY], [sggCoorX, sggCoorY]);
			} else if(sidoCode != "all") {
				$wrmViewJobs.ui.naviConfirm([sidoCoorX, sidoCoorY]);
			} else {
				$wrmViewJobs.ui.naviConfirm();
			}
			
			/************** 기업명 **************/
			$wrmViewJobs.ui.setConditionCode('#vjSelectAllCompanyNameList');
			//$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllCompanyNameList');
			
			/************** 기업형태 (vjSelectCompanyType.js) **************/
			$wrmViewJobs.ui.setConditionCode('#vjSelectAllCompanyTypeList');
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllCompanyTypeList');
			
			/************** 직종분류 (vjSelectJobClassification.js) **************/
			$wrmViewJobs.ui.setConditionCode('#vjSelectAllJobClassificationList');
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllJobClassificationList');
			
			/************** 급여수준 (vjSelectSalaryLevel.js) **************/
			$wrmViewJobs.ui.setConditionCode("[id^='vjSelectAllSalaryLevelList']");
			//$vjConditionList.ui.displayCount("#vjSelectAll [id^='vjSelectAllSalaryLevelList']");
			
			/************** 고용형태 (vjSelectEmploymentType.js) **************/
			$wrmViewJobs.ui.setConditionCode('#vjSelectAllEmploymentTypeList');
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllEmploymentTypeList');
			
			/************** 학력(vjSelectAcademicAbility.js) **************/
			$wrmViewJobs.ui.setConditionCode('#vjSelectAllAcademicAbilityList');
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllAcademicAbilityList');
			
			/************** 경력(vjSelectCareer.js) **************/
			$wrmViewJobs.ui.setConditionCode('#vjSelectAllCareerList');
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllCareerList');
			
			/************** 산업분류(vjSelectIndustryClassification.js) **************/
			$wrmViewJobs.ui.setConditionCode('#vjSelectAllIndustryClassificationList');
			$vjConditionList.ui.displayCount('#vjSelectAll #vjSelectAllIndustryClassificationList');
			
			this.hideDialog();		
			
			$vjJobInfoList.ui.show();
			if(sidoCode == "all") {
				$wrmViewJobs.ui.getJobCount();
			}
			//2019-08-27 [김남민] 일자리 보기 > 서울특별시, 경기도 수정 START
			else if((sidoCode == "11" || sidoCode == "31") && (sggCode == '' && sggCode == 'all' && sggCode == '999')) {
				if($wrmViewJobs.ui.defaultSidoCd == "11") {
					sidoCoorX = 953931.981873;
					sidoCoorY = 1952053.04791;
				}
				if($wrmViewJobs.ui.defaultSidoCd == "31") {
					sidoCoorX = 978020.5788154458;
					sidoCoorY = 1920879.3275155668;
				}
				$wrmViewJobs.ui.getJobCount(sidoCode,sidoCoorX,sidoCoorY);
			}
			
			// 2019.03.13 접근log 생성
			var slwParams = 'sido_cd='+sidoCode+', sgg_cd='+sggCode;
            $.each($('#vjSelectAll #vjSelectAllCompanyTypeList' + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		slwParams += $(this).val() + ',';
            	}
            });
			if (slwParams.length > 0) slwParams = slwParams.substring(0, slwParams.length-1);
			srvLogWrite('D0', '03', '03', '00', '', slwParams);
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
			
			var lvThis = $(pSender);
			setTimeout(function() {
				var lvDataOnFlag = false;
				var lvListUl = lvThis.parent().parent();
				var lvListUlId = lvListUl.attr("id");
				var lvDataDiv = $("#"+lvListUlId.replace(/[0-9]/g,"").replace(/List/g,"DataDiv"));
				lvDataDiv.find("ul").find("label").each(function (){
					if($(this).hasClass("on")) {
						lvDataOnFlag = true;
						return false;
					}
				});
				if(lvDataOnFlag == true) {
					$("#"+lvListUlId.replace(/[0-9]/g,"").replace(/List/g,"DataToggle")).addClass("dataon");
				}
				else {
					$("#"+lvListUlId.replace(/[0-9]/g,"").replace(/List/g,"DataToggle")).removeClass("dataon");
				}
			}, 0);
		}
	};
	
	$vjSelectAll.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 * 		2018.09.17	ywKim	신규
		 */
		setUIEvent: function() {
			console.log("$vjSelectAll.event.setUIEvent() called.");

			// 시도 콤보박스 이벤트
			$workRoad.event.set("change", "#vjSelectAll #vjSelectAllSidoSelect", function(){
				var sidoCd  = $('#vjSelectAll #vjSelectAllSidoSelect option:selected').val();
				// 일자리보기 공통 시군구 목록 조회
				$wrmViewJobs.ui.setSggList(sidoCd);
				// 시군구 SELECT 박스 채우기
				$workRoad.ui.setSggCombo("#vjSelectAll #vjSelectAllSggSelect"
						, $wrmViewJobs.ui.sggList
						, $wrmViewJobs.ui.getSidoItem(sidoCd)
						, true);
						//, (sidoCd == "11" || sidoCd == "31") ? false : true);	// 각 시도별 전체 활성화(서울, 경기도 제외)
			});
			
			// 통합검색 항목 펼치기/접기
			$workRoad.event.set("click","#vjSelectAll [name='vjSelectAllDataToggle']",function(){
				var lvThis = $(this);
				var lvThisId = lvThis.attr("id");
				var lvTartgetId = lvThisId.replace(/DataDiv/g,"DataToggle");
				var lvTartget = $("#"+lvTartgetId);
				var lvTartgetId2 = lvThisId.replace(/DataToggle/g,"DataDiv");
				var lvTartget2 = $("#"+lvTartgetId2);
				
				//희망지역(안씀)
				if(lvTartgetId == "vjSelectAllAreaDataToggle") return;
				//기업명(안씀)
				if(lvTartgetId == "vjSelectAllCompanyNameDataToggle") return;
				//항목눌렀을때 펼침 막기(급여제외)
				if(lvTartgetId != "vjSelectAllSalaryLevelDataToggle" && lvThisId == lvTartgetId2) return;
				
				//if(lvTartget2.css("display") == "none") {
				if(lvTartget.hasClass("on") == false) {
					lvTartget.addClass("on");
					//lvTartget2.slideDown(300);
					lvTartget2.css("overflow","hidden");
					lvTartget2.css("border-bottom","none");
					//lvTartget2.find("div.cont-info").css("padding","9px 0px");
					lvTartget2.stop().animate({"height":"100%"},200);
					lvTartget2.find("li label").css("white-space","normal");
					if(lvTartgetId != "vjSelectAllSalaryLevelDataToggle") {
						lvTartget2.find("li label").parent().show();
					}
				}
				else if(lvThisId != lvTartgetId2) {
					lvTartget.removeClass("on");
					//lvTartget2.slideUp(300);
					lvTartget2.css("overflow","hidden");
					lvTartget2.css("border-bottom","1px solid #dadee1");
					lvTartget2.find("div.cont-info").css("padding","0px");
					lvTartget2.stop().animate({"height":"44px"},200);
					lvTartget2.find("li label").css("white-space","");
					if(lvTartgetId != "vjSelectAllSalaryLevelDataToggle") {
						if(lvTartget2.find("li label.on").length > 0) {
							lvTartget2.find("li label").parent().hide();
							lvTartget2.find("li label.on").parent().show();
						}
					}
				}
				
				//스크롤 조정
				//$("#vjSelectAllScrollBody").mCustomScrollbar("scrollTo", 0);
		    });
			
			// 통합검색 체크박스 선택
			$workRoad.event.set("click","#vjSelectAll #vjSelectAllCompanyTypeList label",function(){
				$vjSelectAll.ui.toggleItem(this);
		    });
			$workRoad.event.set("click","#vjSelectAll #vjSelectAllJobClassificationList label",function(){
				$vjSelectAll.ui.toggleItem(this);
		    });
			$workRoad.event.set("click","#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label",function(){
				var lvDataValue = $(this).prev().val();
				
				// 체크 전 처리 (상위 체크 해제 처리)
				if(lvDataValue.indexOf("WGTY_") >= 0) {
					lvDataValue = lvDataValue.replace(/WGTY_/g,"WAGETY_");
					//상위찾기
					$("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label").each(function(){
						var lvDataValue2 = $(this).prev().val();
						var lvDataCheckFlag = true;
						if(lvDataValue.indexOf(lvDataValue2) >= 0) {
							console.log(lvDataValue);
							console.log(lvDataValue2);
							lvDataValue = lvDataValue.replace(/WAGETY_/g,"WGTY_");
							lvDataValue2 = lvDataValue2.replace(/WAGETY_/g,"WGTY_");
							//하위체크여부검색
							$("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label").each(function(){
								var lvDataValue3 = $(this).prev().val();
								if(lvDataValue3.indexOf(lvDataValue2) >= 0 && lvDataValue != lvDataValue3 && $(this).hasClass("on")) {
									lvDataCheckFlag = false;
								}
							});
							lvDataValue = lvDataValue.replace(/WGTY_/g,"WAGETY_");
							
							//상위체크해제
							if(lvDataCheckFlag == true && $(this).hasClass("on")) {
								$vjSelectAll.ui.toggleItem(this);
								$(this).parent().parent().prev().removeClass("on");
							}
						}
					});
				}
				
				// 체크 처리
				$vjSelectAll.ui.toggleItem(this);
				
				// 체크 후 처리
				lvDataValue = $(this).prev().val();
				var ck = $(this).hasClass("on");
				// 펼치기/접기 (안씀)
				if(lvDataValue.indexOf("WAGETY_") >= 0) {
					lvDataValue = lvDataValue.replace(/WAGETY_/g,"WGTY_");
					$("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label").each(function(){
						var lvDataValue2 = $(this).prev().val();
						if(lvDataValue2.indexOf(lvDataValue) >= 0) {
							if(!ck) {
								//$(this).parent().hide();
							}
							else {
								//$(this).parent().show();
							}
						}
					});
				}
				// 상위 체크 처리
				else {
					lvDataValue = lvDataValue.replace(/WGTY_/g,"WAGETY_");
					$("#vjSelectAll [id^='vjSelectAllSalaryLevelList'] label").each(function(){
						var lvDataValue2 = $(this).prev().val();
						if(lvDataValue.indexOf(lvDataValue2) >= 0) {
							if(!ck) {
								
							}
							else {
								if(!$(this).hasClass("on")){
									$vjSelectAll.ui.toggleItem(this);
									$(this).parent().parent().prev().addClass("on");
								}
							}
						}
					});
				}
		    });
			$workRoad.event.set("click","#vjSelectAll #vjSelectAllEmploymentTypeList label",function(){
				$vjSelectAll.ui.toggleItem(this);				
		    });
			$workRoad.event.set("click","#vjSelectAll #vjSelectAllAcademicAbilityList label",function(){
				$vjSelectAll.ui.toggleItem(this);				
		    });
			$workRoad.event.set("click","#vjSelectAll #vjSelectAllCareerList label",function(){
				$vjSelectAll.ui.toggleItem(this);				
			});
			$workRoad.event.set("click","#vjSelectAll #vjSelectAllIndustryClassificationList label",function(){
				$vjSelectAll.ui.toggleItem(this);				
			});
			
			// 기업명
			$workRoad.event.set("focus","#vjSelectAll #vjSelectAllCompanyNameList",function(key){
				$(this).select();
			});
			$workRoad.event.set("keydown","#vjSelectAll #vjSelectAllCompanyNameList",function(key){
				if (key.keyCode == 13) {
					$("#vjSelectAll #vjOk").click();
				}
				if (key.keyCode == 27) {
					$("#vjSelectAll #vjCancel").click();
				}
			});
			
			// 대졸자일자리이동경로조사(2016) 보기
			$workRoad.event.set("click", "#vjSelectAll #vjSelectAllViewCollegeGraduateStat", function() {
				$vjSelectAll.ui.hideDialog();
				
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
			
			// 선택완료
			$workRoad.event.set("click", "#vjSelectAll #vjOk", function() {
				$vjSelectAll.ui.selectDesiredArea();
			});			
			// 초기화
			$workRoad.event.set("click", "#vjSelectAll #vjClear", function() {
				$vjSelectAll.ui.hideDialog();
				$("#myNeighborhoodJob2").parent().parent().parent().click();
			});
			// 취소	
			$workRoad.event.set("click", "#vjSelectAll #vjCancel", function() {
				$vjSelectAll.ui.hideDialog();
			});			
		},			
	}
	
}(window, document));