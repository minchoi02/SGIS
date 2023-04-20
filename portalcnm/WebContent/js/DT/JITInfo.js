/**   
 *
 * @JSName: JITInfo
 * @Description: 
 *
 * @author: liudandan   
 * @date: 2014/10/31/ 09:00:00   
 * @version V1.0      
 *    
 */
//for return
var ACTIVE_YN = getParameter('ACTIVE_YN');
var API_B_CLASS_CD_SEND = getParameter('API_B_CLASS_CD_SEND');
var API_B_CLASS_NM = getParameter('API_B_CLASS_NM');
var keywordInput = getParameter('keywordInput');
var pageNumber = getParameter('pageNumber');
var sort = getParameter('sort');
var order = getParameter('order');
(function(W, D) {
	W.$JITInfo = W.$JITInfo || {};
	//get From URL
	var API_B_CLASS_CD = getParameter('API_B_CLASS_CD');
	var API_M_CLASS_CD = getParameter('API_M_CLASS_CD');
	var SEQ = getParameter('SEQ');
	var SRV_ATTR = getParameter('SRV_ATTR');
	$(document).ready(function(){
		//page init
		document.getElementById('JITSelectForm').reset();
		document.getElementById('dataForm').reset();
		document.getElementById('paramForm').reset();
		document.getElementById('mapForm').reset();
		//set service attribute
		if(SRV_ATTR == 'DATA'){
			$('#mapDiv').hide();
			$('#SRV_ATTR').empty();
    		$('#SRV_ATTR').append("<option value='DATA'>데이터용</option>");
		} else if(SRV_ATTR == 'MAP'){
			$('#dataDiv').hide();
			$('#SRV_ATTR').empty();
    		$('#SRV_ATTR').append("<option value='MAP'>지도용</option>");
		}
		//request API_B_CLASS
		$JITInfo.reqJITType();
		if ($.fn.validatebox){
			$.fn.validatebox.defaults.missingMessage = '이 입력 항목은 필수 입력 항목 입니다.';
		}
		//param name
		$('#PARAM_NM').validatebox({
			required: true,
			validType:['byteSizeVal[20]']
		});
		//param value
		$('#PARAM_VALUE').validatebox({
			required: true,
			validType:['byteSizeVal[4000]']
		});
		//param expression
		$('#PARAM_EXP').validatebox({
			required: true,
			validType:['byteSizeVal[200]']
		});
		$('#PARAM_NM').validatebox('disableValidation');
		$('#PARAM_VALUE').validatebox('disableValidation');
		$('#PARAM_EXP').validatebox('disableValidation');
		//add param
		$('#addParamsButton').click(function(){
			if (!IsValid("formInput", $('#PARAM_NM').val())) {
				$('#PARAM_NM').val('');
				$('#PARAM_NM').focus();
				return ;
			}
			if (!IsValid("formInput", $('#PARAM_VALUE').val())) {
				$('#PARAM_VALUE').val('');
				$('#PARAM_VALUE').focus();
				return ;
			}
			if (!IsValid("formInput", $('#PARAM_EXP').val())) {
				$('#PARAM_EXP').val('');
				$('#PARAM_EXP').focus();
				return ;
			}
			
			$('#PARAM_NM').validatebox('enableValidation');
			$('#PARAM_VALUE').validatebox('enableValidation');
			$('#PARAM_EXP').validatebox('enableValidation');
			var PARAM_NM = $('#PARAM_NM').val().replace(/(^\s*)|(\s*$)/g, '');
			var PARAM_VALUE = $('#PARAM_VALUE').val().replace(/(^\s*)|(\s*$)/g, '');
			var PARAM_EXP = $('#PARAM_EXP').val().replace(/(^\s*)|(\s*$)/g, '');
			var PARAM_MUST_YN = $('#PARAM_MUST_YN').is(':checked');
			if(PARAM_NM.length == 0){
				$('#PARAM_NM').val('');
				$('#PARAM_NM').focus();
			} else if(PARAM_VALUE.length == 0){
				$('#PARAM_VALUE').val('');
				$('#PARAM_VALUE').focus();
			} else if(PARAM_EXP.length == 0){
				$('#PARAM_EXP').val('');
				$('#PARAM_EXP').focus();
			} else{
				var isNotSame = false;
				var paramsLine = $('#paramsTBody').find('tr');
				for(var i = 0; i < paramsLine.length; i++){
					if(paramsLine.eq(i).children().eq(0).text() == PARAM_NM){
						isNotSame = true;
						break;
					}
				}
				if(isNotSame == true){
					$('#PARAM_NM').focus();
					getConfirmPopup('알림', '입력하신 변수명는 중복입니다. 다시 입력하세요.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				} else if(isNotSame == false){
					var PARAM_NM = $('#PARAM_NM').val().replace(/(^\s*)|(\s*$)/g, '');
					var PARAM_VALUE = $('#PARAM_VALUE').val().replace(/(^\s*)|(\s*$)/g, '');
					var PARAM_EXP = $('#PARAM_EXP').val().replace(/(^\s*)|(\s*$)/g, '');
					if(getBytesCount(PARAM_NM)<20){
						if(getBytesCount(PARAM_VALUE)<4000){
							if(getBytesCount(PARAM_EXP)<200){
								var newParamLine = "<tr><td ondblclick='modifyOneParam(this)'>" + PARAM_NM + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_VALUE + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_EXP + "</td><td>"; 
								if(PARAM_MUST_YN == true){
									newParamLine += "<input type='checkbox' class='input_use09' checked/>";
								} else if(PARAM_MUST_YN == false){
									newParamLine += "<input type='checkbox' class='input_use09'/>";
								}
								newParamLine += "</td><td><a title='삭제' style='cursor: pointer' onclick='clickDelLineButton(this)'><img src='/s-portalcnm/img/btn_del_circle.png' alt='삭제'/></a></td></tr>";
								$('#paramsTBody').prepend(newParamLine);
								document.getElementById('paramForm').reset();
								$('#PARAM_NM').validatebox('disableValidation');
								$('#PARAM_VALUE').validatebox('disableValidation');
								$('#PARAM_EXP').validatebox('disableValidation');
							}
						}
					} else{
						getConfirmPopup('알림', '지정된  입력범위를 초과하였습니다.', 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
				}
			}
			$('#PARAM_MUST_YN').removeAttr('checked');
		});
		//param name
		$('#PARAM_NM_PARAMINFO').validatebox({
			required: true,
			validType:['byteSizeVal[20]']
		});
		//param value
		$('#PARAM_VALUE_PARAMINFO').validatebox({
			required: true,
			validType:['byteSizeVal[4000]']
		});
		//param expression
		$('#PARAM_EXP_PARAMINFO').validatebox({
			required: true,
			validType:['byteSizeVal[200]']
		});
		$('#PARAM_NM_PARAMINFO').validatebox('disableValidation');
		$('#PARAM_VALUE_PARAMINFO').validatebox('disableValidation');
		$('#PARAM_EXP_PARAMINFO').validatebox('disableValidation');
		$("#JITName").keyup(function(){
			$("#JITName").validatebox('enableValidation');
		});
		$("#PARAM_NM").keyup(function(){
			$("#PARAM_NM").validatebox('enableValidation');
		});
		$("#PARAM_VALUE").keyup(function(){
			$("#PARAM_VALUE").validatebox('enableValidation');
		});
		$("#PARAM_EXP").keyup(function(){
			$("#PARAM_EXP").validatebox('enableValidation');
		});
		//modify param
		$('#modifyButton_ParamInfo').click(function(){
			$('#PARAM_NM_PARAMINFO').validatebox('enableValidation');
			$('#PARAM_VALUE_PARAMINFO').validatebox('enableValidation');
			$('#PARAM_EXP_PARAMINFO').validatebox('enableValidation');
			var PARAM_NM = $('#PARAM_NM_PARAMINFO').val().replace(/(^\s*)|(\s*$)/g, '');
			var PARAM_VALUE = $('#PARAM_VALUE_PARAMINFO').val().replace(/(^\s*)|(\s*$)/g, '');
			var PARAM_EXP = $('#PARAM_EXP_PARAMINFO').val().replace(/(^\s*)|(\s*$)/g, '');
			var PARAM_MUST_YN = $('#PARAM_MUST_YN_PARAMINFO').is(':checked');
			if(PARAM_NM.length == 0){
				$('#PARAM_NM_PARAMINFO').val('');
				$('#PARAM_NM_PARAMINFO').focus();
			} else if(PARAM_VALUE.length == 0){
				$('#PARAM_VALUE_PARAMINFO').val('');
				$('#PARAM_VALUE_PARAMINFO').focus();
			} else if(PARAM_EXP.length == 0){
				$('#PARAM_EXP_PARAMINFO').val('');
				$('#PARAM_EXP_PARAMINFO').focus();
			} else{
				var isNotSame = false;
				var paramsLine = $('#paramsTBody').find('tr');
				for(var i = 0; i < paramsLine.length; i++){
					if(paramsLine.eq(i).children().eq(0).text() == PARAM_NM){
						isNotSame = true;
						break;
					}
				}
				if(isNotSame == true){
					$('#PARAM_NM_PARAMINFO').focus();
					getConfirmPopup('알림', '입력하신 변수명는 중복입니다. 다시 입력하세요.', 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
				} else if(isNotSame == false){
					if(getBytesCount(PARAM_NM) < 20){
						if(getBytesCount(PARAM_VALUE) < 4000){
							if(getBytesCount(PARAM_EXP) < 200){
								var newParamLine = "<tr><td ondblclick='modifyOneParam(this)'>" + PARAM_NM + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_VALUE + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_EXP + "</td><td>"; 
								if(PARAM_MUST_YN == true){
									newParamLine += "<input type='checkbox' class='input_use09' checked/>";
								} else if(PARAM_MUST_YN == false){
									newParamLine += "<input type='checkbox' class='input_use09'/>";
								}
								newParamLine += "</td><td><a title='삭제' style='cursor: pointer' onclick='clickDelLineButton(this)'><img src='/s-portalcnm/img/btn_del_circle.png' alt='삭제'/></a></td></tr>";
								$('#paramsTBody').prepend(newParamLine);
								$('#paramInfoPopup').css('display', 'none');
								$('#PARAM_NM_PARAMINFO').validatebox('disableValidation');
								$('#PARAM_VALUE_PARAMINFO').validatebox('disableValidation');
								$('#PARAM_EXP_PARAMINFO').validatebox('disableValidation');
							}
						}
					}else{
						getConfirmPopup('알림', '지정된  입력범위를 초과하였습니다.', 'alert');
						$('#ok_alertPopup').click(function(){
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							confirmPopupRemove();
						});
					}
				}
			}
			$('#PARAM_MUST_YN').removeAttr('checked');
		});
		//click cancel button on the param information popup page
		$('#cancelButton_ParamInfo').click(function(){
			$('#paramInfoPopup').css('display', 'none');
			var PARAM_NM = $('#PARAM_NM_PARAMINFO_HIDDEN').val();
			var PARAM_VALUE = $('#PARAM_VALUE_PARAMINFO_HIDDEN').val();
			var PARAM_EXP = $('#PARAM_EXP_PARAMINFO_HIDDEN').val();
			var PARAM_MUST_YN = $('#PARAM_MUST_YN_PARAMINFO_HIDDEN').val();
			var newParamLine = "<tr><td ondblclick='modifyOneParam(this)'>" + PARAM_NM + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_VALUE + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_EXP + "</td><td>"; 
			if(PARAM_MUST_YN == 'Y'){
				newParamLine += "<input type='checkbox' class='input_use09' checked/>";
			} else if(PARAM_MUST_YN == 'N'){
				newParamLine += "<input type='checkbox' class='input_use09'/>";
			}
			newParamLine += "</td><td><a title='삭제' style='cursor: pointer' onclick='clickDelLineButton(this)'><img src='/s-portalcnm/img/btn_del_circle.png' alt='삭제'/></a></td></tr>";
			$('#paramsTBody').prepend(newParamLine);
		});
		//click the close popup button
		$('#myXbtn').click(function(){
			$('#cancelButton_ParamInfo').click();
		});
		//param Name
		$('#JITName').validatebox({
			required: true,
			validType:['byteSizeVal[100]']
		});
		$('#JITName').validatebox('disableValidation');
		//source of MAP JIT
		$('#sourceTextarea').validatebox({
			required: true,
			validType:['byteSizeVal[4000]']
		});
		$("#sourceTextarea").keyup(function(){
			$("#sourceTextarea").validatebox('enableValidation');
		});
		$('#sourceTextarea').validatebox('disableValidation');
		//modify JIT
		$('#modifyJITButton').click(function(){
			var JITName = $('#JITName').val().replace(/(^\s*)|(\s*$)/g, '');
			if(JITName.length == 0){
				$('#JITName').validatebox('enableValidation');
				$('#JITName').val('');
				$('#JITName').focus();
			} else{
				if(SRV_ATTR == 'DATA'){
					if($('#JITName').validatebox('isValid')){
						//iterates params table
						var currentLine = null;
						var PARAM_List = '{"LIST":[';
						var PARAM_NM = null;
						var PARAM_VALUE = null;
						var PARAM_EXP = null;
						var PARAM_MUST_YN = null;
						var paramsLine = $('#paramsTBody').find('tr');
						if(paramsLine.length > 0){
							for(var i = 0; i < paramsLine.length; i++){
								currentLine = paramsLine.eq(i).children();
								PARAM_NM = currentLine.eq(0).text();
								PARAM_VALUE = currentLine.eq(1).text();
								PARAM_EXP = currentLine.eq(2).text();
								PARAM_MUST_YN = currentLine.eq(3).children().is(':checked') ? 'Y' : 'N';
								PARAM_List = PARAM_List + '{"PARAM_NM":"' + PARAM_NM + '", "PARAM_VALUE":"' + PARAM_VALUE + '", "PARAM_EXP":"' + PARAM_EXP + '", "PARAM_MUST_YN":"' + PARAM_MUST_YN +'"}';
								if(i < paramsLine.length - 1){
									PARAM_List = PARAM_List + ',';
								}
							}
							PARAM_List = PARAM_List + ']}';
							getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
							$('#ok_confirmPopup').click(function(){
								$JITInfo.updateDATAJIT(JITName, PARAM_List);
								confirmPopupRemove();
							});
							$('#cancel_confirmPopup').click(function(){
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function(){
								confirmPopupRemove();
							});
						} else{
							getConfirmPopup('알림', '추가 변수 없다.', 'alert');
							$('#ok_alertPopup').click(function(){
								confirmPopupRemove();
							});
							$('#close_confirmPopup').click(function(){
								confirmPopupRemove();
							});
						}
					
						
					}
				} else if(SRV_ATTR == 'MAP'){
					var sourceTextarea = $('#sourceTextarea').val().replace(/(^\s*)|(\s*$)/g, '');
					if(sourceTextarea.length == 0){
						$('#sourceTextarea').validatebox('enableValidation');
						$('#sourceTextarea').val('');
						$('#sourceTextarea').focus();
					} else{
						if($('#JITName').validatebox('isValid'))
						{
							if($('#sourceTextarea').validatebox('isValid')){
								getConfirmPopup('확인', '수정하시겠습니까?', 'confirm');
								$('#ok_confirmPopup').click(function(){
									$JITInfo.updateMAPJIT(JITName, sourceTextarea);
									confirmPopupRemove();
								});
								$('#cancel_confirmPopup').click(function(){
									confirmPopupRemove();
								});
								$('#close_confirmPopup').click(function(){
									confirmPopupRemove();
								});
							}
						}
					}
				}
			}
		});
		$('#returnToManagePageButton').click(function(){
			location.href = '../../html/DT/JITManager.html?ACTIVE_YN=' + ACTIVE_YN + '&API_B_CLASS_CD=' + API_B_CLASS_CD_SEND + '&API_B_CLASS_NM=' + API_B_CLASS_NM + '&keywordInput=' + keywordInput + '&pageNumber=' + pageNumber + '&sort=' + sort + '&order=' + order;
		});
	});
	$JITInfo = {
			//request API_B_CLASS or URL
			reqJITType : function() {
				var sopOpenApiReqJITTypeObj = new sop.openApi.reqJITType.api();
				sopOpenApiReqJITTypeObj.addParam('SRV_ATTR', SRV_ATTR);
				sopOpenApiReqJITTypeObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/JITManage/getJITType.json"
			    });
			},
			//loadJITinfo
			loadJITinfo : function() {
				var sopOpenApiLoadJITinfoObj = new sop.openApi.loadJITinfo.api();
				sopOpenApiLoadJITinfoObj.addParam('API_B_CLASS_CD', API_B_CLASS_CD);
				sopOpenApiLoadJITinfoObj.addParam('API_M_CLASS_CD', API_M_CLASS_CD);
				sopOpenApiLoadJITinfoObj.addParam('SEQ', SEQ);
				sopOpenApiLoadJITinfoObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/JITManage/loadJITinfo.json"
			    });
			},
			//update DATA JIT
			updateDATAJIT : function(JITName, PARAM_List) {
					var sopOpenApiUpdateDATAJITObj = new sop.openApi.updateDATAJIT.api();
					sopOpenApiUpdateDATAJITObj.addParam('NM', JITName);
					sopOpenApiUpdateDATAJITObj.addParam('API_B_CLASS_CD',API_B_CLASS_CD);
					sopOpenApiUpdateDATAJITObj.addParam('API_M_CLASS_CD', API_M_CLASS_CD);
					sopOpenApiUpdateDATAJITObj.addParam('SEQ', SEQ);
					sopOpenApiUpdateDATAJITObj.addParam('API_CONTENT_TYPE', $('#API_CONTENT_TYPE').val());
					sopOpenApiUpdateDATAJITObj.addParam('API_METHOD_TYPE', $('#API_METHOD_TYPE').val());
					sopOpenApiUpdateDATAJITObj.addParam('PARAM_List', PARAM_List);
					sopOpenApiUpdateDATAJITObj.request({
				        method : "POST",
				        async : false,
				        url : contextPath +"/ServiceAPI/DT/JITManage/updateDATAJIT.json"
				    });
			},
			//update MAP JIT
			updateMAPJIT : function(JITName, PARAM_VALUE) {
				var sopOpenApiUpdateMAPJITObj = new sop.openApi.updateMAPJIT.api();
				sopOpenApiUpdateMAPJITObj.addParam('API_B_CLASS_CD',API_B_CLASS_CD);
				sopOpenApiUpdateMAPJITObj.addParam('API_M_CLASS_CD', API_M_CLASS_CD);
				sopOpenApiUpdateMAPJITObj.addParam('SEQ',SEQ);
				sopOpenApiUpdateMAPJITObj.addParam('NM', $('#JITName').val().replace(/(^\s*)|(\s*$)/g, ''));
				sopOpenApiUpdateMAPJITObj.addParam('PARAM_VALUE', encodeURIComponent(PARAM_VALUE));
				sopOpenApiUpdateMAPJITObj.request({
			        method : "POST",
			        async : false,
			        url : contextPath +"/ServiceAPI/DT/JITManage/updateMAPJIT.json"
			    });
			}
	};
	//request API_B_CLASS or URL
	(function() {
	    $class("sop.openApi.reqJITType.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
            			$('#API_B_CLASS').empty();
            			if(result.LIST != null && result.LIST != ''){
            				for(var i=0;i<result.LIST.length;i++){
    	            			$('#API_B_CLASS').append("<option value='" + result.LIST[i].API_B_CLASS_CD + "'>"+result.LIST[i].API_B_CLASS_NM + "</option>");
    	            		}
            			}
            			$('#API_B_CLASS').val(API_B_CLASS_CD);
            			//request JIT information
            			$JITInfo.loadJITinfo();
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
	//loadJITinfo
	(function() {
	    $class("sop.openApi.loadJITinfo.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") { 
	            	if(result != null){
	            		var JIT = result.JIT;
	            		var JITParam = result.JITParam;
	            		$("#JITName").html(JIT.NM);	            		
	            		$('#JITName').val($("#JITName").text());
	            		if(SRV_ATTR == 'DATA'){
	            			$('#API_CALL_URL').empty();
	            			if(JIT != null && JIT != ''){
	            				$('#API_CALL_URL').append("<option value='" + JIT.API_M_CLASS_CD + "'>" + JIT.API_CALL_URL + "</option>");
			            		$('#API_CONTENT_TYPE').val(JIT.API_CONTENT_TYPE);
			            		$('#API_METHOD_TYPE').val(JIT.API_METHOD_TYPE);
	            			}
		            		$('#paramsTBody').empty();
		            		var PARAM_NM = null;
		            		var PARAM_VALUE = null;
		            		var PARAM_EXP = null;
		            		var PARAM_MUST_YN = null;
		            		var newParamLine = '';
		            		if(JITParam != null && JITParam != ''){
		            			for(var i = 0; i < JITParam.length; ++i){
			            			PARAM_NM = JITParam[i].PARAM_NM;
				            		PARAM_VALUE = JITParam[i].PARAM_VALUE;
				            		PARAM_EXP = JITParam[i].PARAM_EXP;
				            		PARAM_MUST_YN = JITParam[i].PARAM_MUST_YN.toUpperCase();
			            			newParamLine = "<tr><td ondblclick='modifyOneParam(this)'>" + PARAM_NM + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_VALUE + "</td><td ondblclick='modifyOneParam(this)'>" + PARAM_EXP + "</td><td>"; 
			    					if(PARAM_MUST_YN == 'Y'){
			    						newParamLine += "<input type='checkbox' class='input_use09' checked/>";
			    					} else if(PARAM_MUST_YN == 'N'){
			    						newParamLine += "<input type='checkbox' class='input_use09'/>";
			    					}
			    					newParamLine = newParamLine + "</td><td><a title='삭제' style='cursor:pointer' onclick='clickDelLineButton(this)'><img src='/s-portalcnm/img/btn_del_circle.png' alt='삭제'/></a></td></tr>";
			    					$('#paramsTBody').append(newParamLine);
			            		}
		            		}
	            		} else if(SRV_ATTR == 'MAP'){
	            			if(JITParam != null && JITParam != ''){
	            				$('#sourceTextarea').val(JITParam[0].PARAM_VALUE);
	            			}
	            		}
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
	//update DATA JIT
	(function() {
	    $class("sop.openApi.updateDATAJIT.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") {
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
						$('#ok_alertPopup').click(function(){
							if(result.success == true){
		            			location.href = '../../html/DT/JITManager.html?ACTIVE_YN=' + ACTIVE_YN + '&API_B_CLASS_CD=' + API_B_CLASS_CD_SEND + '&API_B_CLASS_NM=' + API_B_CLASS_NM + '&keywordInput=' + keywordInput + '&pageNumber=' + pageNumber + '&sort=' + sort + '&order=' + order;
			            	}
							confirmPopupRemove();
						});
						$('#close_confirmPopup').click(function(){
							if(result.success == true){
		            			location.href = '../../html/DT/JITManager.html?ACTIVE_YN=' + ACTIVE_YN + '&API_B_CLASS_CD=' + API_B_CLASS_CD_SEND + '&API_B_CLASS_NM=' + API_B_CLASS_NM + '&keywordInput=' + keywordInput + '&pageNumber=' + pageNumber + '&sort=' + sort + '&order=' + order;
			            	}
							confirmPopupRemove();
						});
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
	//update MAP JIT
	(function() {
	    $class("sop.openApi.updateMAPJIT.api").extend(sop.cnm.absAPI).define({
	    	onSuccess : function(status, res) {
	        	var result = res.result;
	            if(res.errCd == "0") {
	            	if(result != null){
	            		getConfirmPopup('알림', result.msg, 'alert');
	    				$('#ok_alertPopup').click(function(){
	    					if(result.success == true){
		            			location.href = './../DT/JITManager.html?ACTIVE_YN=' + ACTIVE_YN + '&API_B_CLASS_CD=' + API_B_CLASS_CD_SEND + '&API_B_CLASS_NM=' + API_B_CLASS_NM + '&keywordInput=' + keywordInput + '&pageNumber=' + pageNumber + '&sort=' + sort + '&order=' + order;
			            	}
	    					confirmPopupRemove();
	    				});
	    				$('#close_confirmPopup').click(function(){
	    					if(result.success == true){
		            			location.href = './../DT/JITManager.html?ACTIVE_YN=' + ACTIVE_YN + '&API_B_CLASS_CD=' + API_B_CLASS_CD_SEND + '&API_B_CLASS_NM=' + API_B_CLASS_NM + '&keywordInput=' + keywordInput + '&pageNumber=' + pageNumber + '&sort=' + sort + '&order=' + order;
			            	}
	    					confirmPopupRemove();
	    				});
	            	}
	            } else {
	                getConfirmPopup('알림', res.errMsg, 'alert');
					$('#ok_alertPopup').click(function(){
						confirmPopupRemove();
					});
					$('#close_confirmPopup').click(function(){
						confirmPopupRemove();
					});
	            }
	        },
	        onFail : function(status) {
	            getConfirmPopup('알림', '일시적인 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.', 'alert');
				$('#ok_alertPopup').click(function(){
					confirmPopupRemove();
				});
				$('#close_confirmPopup').click(function(){
					confirmPopupRemove();
				});
	        }
	    });
	}());
}(window, document));
//del a line param
function clickDelLineButton(delParamLineButton){
	$(delParamLineButton).parent().parent().remove();
}
//modify param
function modifyOneParam(selectedParamLine){
	document.getElementById('paramInfoForm').reset();
	$('#paramInfoPopup').css('display', 'block');
	selectedParamLine = $(selectedParamLine).parent();
	var PARAM_NM = $(selectedParamLine).children().eq(0).text();
	var PARAM_VALUE = $(selectedParamLine).children().eq(1).text();
	var PARAM_EXP = $(selectedParamLine).children().eq(2).text();
	var PARAM_MUST_YN = $(selectedParamLine).children().eq(3).children().is(':checked');
	$('#PARAM_NM_PARAMINFO').val(PARAM_NM); 
	$('#PARAM_VALUE_PARAMINFO').val(PARAM_VALUE); 
	$('#PARAM_EXP_PARAMINFO').val(PARAM_EXP);
	$('#PARAM_NM_PARAMINFO_HIDDEN').val(PARAM_NM); 
	$('#PARAM_VALUE_PARAMINFO_HIDDEN').val(PARAM_VALUE); 
	$('#PARAM_EXP_PARAMINFO_HIDDEN').val(PARAM_EXP);
	if(PARAM_MUST_YN == true){
		$('#PARAM_MUST_YN_PARAMINFO').attr('checked', true);
		$('#PARAM_MUST_YN_PARAMINFO_HIDDEN').val('Y');
	} else if(PARAM_MUST_YN == false){
		$('#PARAM_MUST_YN_PARAMINFO').removeAttr('checked');
		$('#PARAM_MUST_YN_PARAMINFO_HIDDEN').val('N');
	}
	selectedParamLine.remove();
}