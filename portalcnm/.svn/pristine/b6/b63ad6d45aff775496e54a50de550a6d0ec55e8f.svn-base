/**
 * 
 * @JSName: themaMapAddMap
 * @Description:
 * 
 * @author: liudandan
 * @date: 2014/11/17/ 08:30:00
 * @version V1.0
 * 
 */
(function (W, D) {
	W.$themaMapAddMap = W.$themaMapAddMap || {};
	W.$Map = W.$Map || {};
	$(document).ready(function () {
		// click the new map button
		// 초기화 버튼 클릭
		$('#resetMap').click(function () {
			$Map.$interactiveMap.ui.doClearMap(1);
		});
		// 등록버튼 클릭
		$('#openAddMapPopupButton').click(function () {
			document.getElementById('addThemaMapMapForm').reset();
			var shareInfo = null;
			if ($Map.$interactiveMap.ui.shareUrlInfo.length > 0) {
				shareInfo = $Map.$interactiveMap.ui.shareUrlInfo[0].params ? $Map.$interactiveMap.ui.shareUrlInfo[0].params : null;
			}
			
			if ($Map.$interactiveMap.ui.shareUrlInfo.length > 0) {
				$(".popupWrapper").css("display", "block");
				// KOSIS API 표출 레벨
				if (shareInfo.isKosis) {
					var areaSelectBoxHtml = '';
					var sidoSelectBoxHtml = '';
					
					if (shareInfo.dist_level == '01') {
						// 시도레벨 까지 표출
						areaSelectBoxHtml = '<option value="01" selected>시도</option>';
						sidoSelectBoxHtml = '<option value="00" >전국</option>';
					}
					else if (shareInfo.dist_level == '02') {
						sidoSelectBoxHtml = '<option value="00" >전국</option>';
						var sidoCd = null;
						
						if (shareInfo.paramInfo.gis_se == '1') {
							// 시도레벨
							areaSelectBoxHtml = '<option value="01" selected>시도</option>';
							// 시군구 레벨
							areaSelectBoxHtml += '<option value="02">시군구</option>';
						}
						else {
							// 시도레벨
							areaSelectBoxHtml = '<option value="01" >시도</option>';
							// 시군구 레벨
							areaSelectBoxHtml += '<option value="02" selected>시군구</option>';
							// 코시스 API 시군구까지 지원하는데 현재 요청한 gis_se가 전체 시도를 요청할경우
							// gis_se는 1 에외처리
							sidoCd = shareInfo.paramInfo.gis_se.substring(0, 2);
							sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapAddMap.sidoData[sidoCd] + '</option>';
						}
						
					}
					else if (shareInfo.dist_level == '03') {
						// 읍면동레벨
						areaSelectBoxHtml = '<option value="01" >시도</option>';
						areaSelectBoxHtml += '<option value="02">시군구</option>';
						areaSelectBoxHtml += '<option value="03">읍면동</option>';
						
						sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
						var sidoCd = null;
						if (shareInfo.paramInfo.gis_se == '1') {
							// 시도레벨
							areaSelectBoxHtml = '<option value="01" selected>시도</option>';
							areaSelectBoxHtml += '<option value="02">시군구</option>';
							areaSelectBoxHtml += '<option value="03">읍면동</option>';
							
						}
						else {
							if (shareInfo.paramInfo.gis_se.length == 2) {
								// 시군구 레벨
								areaSelectBoxHtml = '<option value="02" selected>시군구</option>';
								areaSelectBoxHtml += '<option value="03">읍면동</option>';
							}
							else {
								// 읍면동 레벨
								areaSelectBoxHtml = '<option value="03" selected>읍면동</option>';
							}
							// 코시스 API 시군구까지 지원하는데 현재 요청한 gis_se가 전체 시도를 요청할경우
							// gis_se는 1 에외처리
							sidoCd = shareInfo.paramInfo.gis_se.substring(0, 2);
							sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapAddMap.sidoData[sidoCd] + '</option>';
						}
						
					}
					
					$("#STAT_DISP_LEVEL").html(areaSelectBoxHtml);
					
					$("#AREA_SET").html(sidoSelectBoxHtml);
					
				}
				else {
					// NO KOSIS 표출 레벨 성정
					var areaSelectBoxHtml = '';
					if (shareInfo.mapInfo.zoomlevel <= 3) {
						// 시단위
						// 시도레벨 까지 표출
						areaSelectBoxHtml = '<option value="01" selected >시도</option>';
						areaSelectBoxHtml += '<option value="02">시군구</option>';
						areaSelectBoxHtml += '<option value="03" >읍면동</option>';
						areaSelectBoxHtml += '<option value="04" >집계구</option>';
						
					}
					else if (shareInfo.mapInfo.zoomlevel > 3 && shareInfo.mapInfo.zoomlevel <= 5) {
						// 시군구
						areaSelectBoxHtml = '<option value="02" selected>시군구</option>';
						areaSelectBoxHtml += '<option value="03">읍면동</option>';
						areaSelectBoxHtml += '<option value="04" >집계구</option>';
					}
					else if (shareInfo.mapInfo.zoomlevel > 5 && shareInfo.mapInfo.zoomlevel <= 8) {
						// 동면읍
						areaSelectBoxHtml += '<option value="03" selected>읍면동</option>';
						areaSelectBoxHtml += '<option value="04" >집계구</option>';
					}
					else if (shareInfo.mapInfo.zoomlevel > 8) {
						// 집계구
						areaSelectBoxHtml += '<option value="04" selected>집계구</option>';
					}
					$("#STAT_DISP_LEVEL").html(areaSelectBoxHtml);
					
					// NO KOSIS 지역설정
					var sidoSelectBoxHtml = '';
					if (shareInfo.paramInfo.adm_cd.length == '2') {
						if (shareInfo.paramInfo.adm_cd == '00') {
							// 전체 시도
							sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
							$("#AREA_SET").html(sidoSelectBoxHtml);
						}
						else {
							sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
							var sidoCd = shareInfo.paramInfo.adm_cd.substring(0, 2);
							// 특정 시도
							sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapAddMap.sidoData[sidoCd] + '</option>';
							$("#AREA_SET").html(sidoSelectBoxHtml);
						}
						
					}
					else if (shareInfo.paramInfo.adm_cd.length > 2) {
						sidoSelectBoxHtml = '<option value="00" selected>전국</option>';
						var sidoCd = shareInfo.paramInfo.adm_cd.substring(0, 2);
						// 특정 시도
						sidoSelectBoxHtml += '<option value=' + sidoCd + '>' + $themaMapAddMap.sidoData[sidoCd] + '</option>';
						$("#AREA_SET").html(sidoSelectBoxHtml);
						
					}
				}
			}
			else {
				getConfirmPopup('확인', '조회된 통계가 없습니다.', 'alert');
				$('#ok_alertPopup, #close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
			
		});
		
		if ($.fn.validatebox) {
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		}
		
		$("#TITLE_AddMap").validatebox({
			required : true,
			validType : [ 'byteSizeVal[100]' ]
		});
		
		$("#TITLE_AddMap").validatebox('disableValidation');
		
		$("#EXP_AddMap").validatebox({
			required : true,
			validType : [ 'byteSizeVal[200]' ]
		});
		
		$("#EXP_AddMap").validatebox('disableValidation');
		
		// click the add button in add map page
		$('#addButton_AddMap').click(function () {
			$("#TITLE_AddMap").validatebox('enableValidation');
			$("#EXP_AddMap").validatebox('enableValidation');
			var TITLE = $('#TITLE_AddMap').val().replace(/(^\s*)|(\s*$)/g, '');
			var EXP = $('#EXP_AddMap').val().replace(/(^\s*)|(\s*$)/g, '');
			if (TITLE.length == 0) {
				$("#TITLE_AddMap").val('');
				$("#TITLE_AddMap").focus();
			}
			else if (EXP.length == 0) {
				$("#EXP_AddMap").val('');
				$("#EXP_AddMap").focus();
			}
			else {
				if ($("#TITLE_AddMap").validatebox('isValid') && $("#EXP_AddMap").validatebox('isValid')) {
					$("#TITLE_AddMap").validatebox('disableValidation');
					$("#EXP_AddMap").validatebox('disableValidation');
					getConfirmPopup('확인', '추가하시겠습니까?', 'confirm');
					$('#ok_confirmPopup').click(function () {
						$(".popupWrapper").css("display", "none");
						var CATEGORY = $('#CATEGORY_AddMap').val();
						var ARTICLE_DIV = $('#ARTICLE_DIV_AddMap').val();
						TITLE = $('#TITLE_AddMap').val().replace(/(^\s*)|(\s*$)/g, '');
						EXP = $('#EXP_AddMap').val().replace(/(^\s*)|(\s*$)/g, '');
						var METHOD=$("#METHOD_form").val() || '';
						var RELATEINFO=$("#RELATEINFO_form").val() || '';
						
						$themaMapAddMap.addMap('01', CATEGORY, ARTICLE_DIV, TITLE, EXP, $('#STAT_DISP_LEVEL').val(), $('#AREA_SET').val(), METHOD, RELATEINFO );
						confirmPopupRemove();
					});
					$('#cancel_confirmPopup').click(function () {
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			}
		});
		// click the cancel button in add map page
		$('#cancelButton_AddMap').click(function () {
			$(".popupWrapper").css("display", "none");
		});
		$('#mapFrame').load(function () {
			$('#mapFrame').contents().find('#header').hide();
			//$('#mapFrame').contents().find('#footer').hide();
			$('#mapFrame').contents().find('#footer').html('');
			$('#mapFrame').contents().find('#innerMapBtn_1').hide();
			$('#mapFrame').contents().find('#uploadBtn_1').hide();
			$('#mapFrame').contents().find('#mapAddBtn_1').hide();
			
			$('#mapFrame').contents().find('#bookmarkBtn_1').hide();
			$('#mapFrame').contents().find('#shareBtn_1').hide();
			$('#mapFrame').contents().find('#mapAddBtn_1').hide();
			
			//통계표 숨기기			
			$('#mapFrame').contents().find('#searchStatsBtn').hide();
			
			// pie Chart 숨기기
			$('#mapFrame').contents().find('.graph_remark_section').hide();
			
			//버튼바구니 숨기기
			$('#mapFrame').contents().find('#combineButton').hide();
			$('#mapFrame').contents().find('#divideButton').hide();
			$Map = $('#mapFrame').get(0).contentWindow;
			// $($Map.$interactiveMap.ui.mapList[0].mapInfo.pieChartObj).hide("always");
		});
		
	});
	$themaMapAddMap = {
		addMap : function (THEMA_MAP_TYPE, CATEGORY, ARTICLE_DIV, TITLE, EXP, STAT_DISP_LEVEL, AREA_SET, METHOD, RELATEINFO) {
			var shareUrlInfo = $Map.$interactiveMap.ui.shareUrlInfo;
			var shareList = [];
			for ( var i = 0; i < shareUrlInfo.length; i++) {
				shareUrlInfo[i].params.title = shareUrlInfo[i].title;
				var shareInfo = {
					API_CALL_URL : shareUrlInfo[i].url,
					PARAM_INFO : shareUrlInfo[i].params
				};
				shareList.push(shareInfo);
				shareInfo = null;
			}
			
			var shareInfoObject = {
				LIST : shareList
			};
			var sopOpenApiAddMapObj = new sop.openApi.addMap.api();
			sopOpenApiAddMapObj.addParam('THEMA_MAP_TYPE', THEMA_MAP_TYPE);
			sopOpenApiAddMapObj.addParam('CATEGORY', CATEGORY);
			sopOpenApiAddMapObj.addParam('ARTICLE_DIV', ARTICLE_DIV);
			sopOpenApiAddMapObj.addParam('TITLE', TITLE);
			sopOpenApiAddMapObj.addParam('EXP', EXP);
			sopOpenApiAddMapObj.addParam('STAT_DISP_LEVEL', STAT_DISP_LEVEL);
			sopOpenApiAddMapObj.addParam('AREA_SET', AREA_SET);
			sopOpenApiAddMapObj.addParam('PARAM_List', JSON.stringify(shareInfoObject));
			
			if(METHOD!=''){
				sopOpenApiAddMapObj.addParam('METHOD', encodeURIComponent(METHOD));
			}
			if(RELATEINFO!=''){
				sopOpenApiAddMapObj.addParam('RELATEINFO', encodeURIComponent(RELATEINFO));
			}
			
			sopOpenApiAddMapObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/DT/ThemaMapManage/addThemaMap.json"
			});
		},
		sidoData : {
			'00' : '전국',
			'11' : '서울',
			'31' : '경기도',
			'32' : '강원도',
			'23' : '인천',
			'34' : '충남',
			'33' : '충북',
			'25' : '대전',
			'29' : '세종',
			'36' : '전남',
			'35' : '전북',
			'24' : '광주',
			'37' : '경북',
			'38' : '경남',
			'22' : '대구',
			'21' : '부산',
			'26' : '울산',
			'39' : '제주'
		},
		catagoryData :{
			
		}
	};
	// add map
	(function () {
		$class("sop.openApi.addMap.api").extend(sop.cnm.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					if (result != null) {
						getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup, #close_confirmPopup').click(function () {
							if (result.success == true) {
								location.href = './../DT/themaMapManage.html';
							}
							confirmPopupRemove();
						});
					}
				}
				else {
					getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup, #close_confirmPopup').click(function () {
						confirmPopupRemove();
					});
				}
			},
			onFail : function (status) {
				getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function () {
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function () {
					confirmPopupRemove();
				});
			}
		});
	}());
}(window, document));