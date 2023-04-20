<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<style type="text/css">
	#ITEM_B_CLASS_ID, #ITEM_M_CLASS_ID, #ITEM_S_CLASS_ID, #THEMA_LIST, #SURV_ID {
		width: 192px;
	}
	.table-flow {
		overflow: hidden;
		width: 744px;
		margin: 0 auto;
	}
	
	.table-flow-item {
		border-bottom: 1px solid darkgray;
	}
	
	#detailModifyBtn, #modifyBtn, #searchNmAndExpRankBtn {
		margin-top: 1px;
		margin-left: 10px;
		background: #4d75d0;
		color: #fff;
		width: 50px;
		height: 25px;
		border:none;
		cursor: pointer;
		border-radius: 5%;
	}
	
	#searchNmAndExpRankBtn {
		width: 150px;
		border-radius: 5%;
	}
	
	.datagrid-row-selected {
	    background: none;
	}
	
	textarea[readonly], input[type="text"][readonly] {
		background: rgba(0,0,0,0.2);
	}
	</style>
	<script>
	var regist = {};
	regist.step = 0;
	// IE 에서 startsWith 사용하기 위한 폴리필
	if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
	    position = position || 0;
	    return this.indexOf(searchString, position) === position;
	  };
	}
	
	function checkedSubSum(_this,_event){
		
	}
	

	if(history.state != null) {
		alert('수정 혹은 삭제 이후 해당 페이지로 되돌아갈 수 없습니다');
		location.href = pageContext + "/ststistics/ststisticsUSTotalSurveyMng.do";
	}
	
	
	$(document).ready(function(){
		
		// 수정 + 삭제 페이지에서 항목 상세 설정의 datagrid의 onLoadSuccess 에서 사용할 콜백 메소드이다.
		var firstCheckForModify = '${isModify ? "Y" : "N"}';
		var rememberFirstData = [];
		
		function onSuccessDataGrid(data) {
			if($('#ITEM_B_CLASS_ID').val() !== 'DTL') {
				disableSubSumCheckBox();
			} else {
				enableSubSumCheckBox();
			}
		
			if(firstCheckForModify === 'Y') {
				var details = getSelectedDetails('table-flow-item-'+this.id);
				rememberFirstData = rememberFirstData.concat(details);
			}
			
		}
		
		
		// 항목 상세 설정의 각 컬럼의 가로 너비입니다.
		var setWidth = [40,60,180,60];
		
		
		// 참고 - https://www.jeasyui.com/forum/index.php?topic=4370.msg10502#msg10502
		// 내용 - easyui datagrid 에서 체크박스가 있는 컬럼에서 header 에 이름을 넣고 싶으면 어떡해 하는지를 알려준다.
	 	function formatIt(value,row){
			if(value == 'Y') {	// itmCheckbox의 값이 'Y' 면 체크가 된 상태의 체크 박스를 넣어준다.
				return '<input type="checkbox" class="selectCheckBox" checked="checkded" onchange="checkedFirst(this,event)" />';
			}
			return '<input type="checkbox" class="selectCheckBox"  onchange="checkedFirst(this,event)" />';
	    }
		
	 	function formatIt2(value,row){
	 		if(value == 'Y') {
	        	return '<input type="checkbox" class="subSumCheckBox" checked="checkded" onchange="checkedSubSum(this,event)" disabled/>';
	 		}
	 		return '<input type="checkbox" class="subSumCheckBox" onchange="checkedSubSum(this,event)" disabled/>';	 		
	    }
	 	
	 	// 표출이름에 대한 작업
	 	function formatIt3(value,row) {
	 		return '<input type="text" class="showNm" value="'+value+'"/>'
	 	}
	 	
	 	
	 	/* 데이터가 없을 때, 데이터가 없다는 것에 대한 메시지를 작성하는 설정, 참고 : https://www.jeasyui.com/forum/index.php?topic=2457.0 */
	 	var myview = $.extend({}, $.fn.datagrid.defaults.view, {
	 	    onAfterRender: function (target) {
	 	        $.fn.datagrid.defaults.view.onAfterRender.call(this, target);
	 	        var opts = $(target).datagrid('options');
	 	        var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
	 	        vc.children('div.datagrid-empty').remove();
	 	        if (!$(target).datagrid('getRows').length) {
	 	            var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || '조회되는 데이터가 없습니다.').appendTo(vc);
	 	            d.css({
	 	                position: 'absolute',
	 	                left: 0,
	 	                top: 100,
	 	                width: '100%',
	 	                textAlign: 'center'
	 	            });
	 	        }
	 	    }
	 	});
		
	    function setDataNmAndExpRankGrid() {
	    	var bClass = document.querySelector('#ITEM_B_CLASS_ID').value;
	    	var mClass = document.querySelector('#ITEM_M_CLASS_ID').value;
	    	var sClass = document.querySelector('#ITEM_S_CLASS_ID').value;
	    	console.log(bClass, mClass, sClass);
	    	
	    	if(bClass.startsWith('BRD')) {
	    		if(!bClass || !mClass || !sClass) {
	    			alert('\"대시보드(정보)\" 혹은 \"대시보드(정보)\"과 관련된 자료명 및 표출순위를\n조회하려면 항목 분류를 모두 선택하셔야 합니다.');
	    			return;
	    		}
	    	}
	    	
	    	
	    	$('#searchNmAndExpRankTable').datagrid({
	    		view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				columns : [ [ {
					field : 'dispRank',
					title : '표출순위',
					width:80,
					fixed:true,
					align : 'center',
					sortable : false
				},{
					field : 'dataNm',
					title : '자료명',
					align : 'center',
					width:260,
					sortable : false
				} ] ],
				queryParams : {
					bClass : bClass	
					, mClass : mClass
					, sClass : sClass
				},
				url : pageContext + '/api/ststistics/getStstisticsUSTotalSurveyDataNmAndExpRank.do',
				method: 'POST'
	    	});
	    	
	    }
	 	
		// https://www.jeasyui.com/forum/index.php?topic=4442.0  참고
		function setGrid(){
			let orgId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").data("orgid"); // 선택된 통계표 조직ID
			let tblId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").val(); // 선택된 통계표 ID
			
			$("#stattbDiv").val(regist.beingRegisteredStblList[tblId].STAT_NM);
			$("#tblNm").val(regist.beingRegisteredStblList[tblId].TBL_NM);
			$("#pathNm").val(regist.beingRegisteredStblList[tblId].LIST_NM_PATH);
			$("#stattbUrl").val(regist.beingRegisteredStblList[tblId].SVC_URL);
			$("#stattbBeginYear").val(regist.beingRegisteredStblList[tblId].STRT_PRD_DE);
			$("#stattbEndYear").val(regist.beingRegisteredStblList[tblId].END_PRD_DE);
			$("#stattbYear").val(regist.beingRegisteredStblList[tblId].PRD_DE);
			
			regist.beingRegisteredStblList[tblId].REGION_BEGIN = $("#regionBegin option:selected").val();
			regist.beingRegisteredStblList[tblId].REGION_END = $("#regionEnd option:selected").val();
		}
		
		
		// 항목 대분류에서 제일 왼쪽 항목에서 대시보드 일때만 중분류, 소분류를 선택할 수 있다. 
		$('#ITEM_B_CLASS_ID').on('change',function(e){
			
			configurationOpenClose(this.value);
			
			if(this.value !== 'DTL') {
				disableSubSumCheckBox();
			} else {
				enableSubSumCheckBox();
			}
			
		});
		
		// input 태그 혹은 select 태그 등에서 태그에서 값을 사용하지 못하도록 막는 함수입니다.
		function disableOrEnableInputs(className,isDisabled){
			var nodeList = document.querySelectorAll('.'+className);
			Array.prototype.forEach.call(nodeList,function(item,index){	// nodeList는 유사배열이므로 이렇게 forEach를 사용합니다. IE에서는 이렇게 해야된다.
				 item.disabled = isDisabled;
			});
		}
		
		// selectElement 에서 원하는 value 값으로 변경하는 함수입니다.
		function selectElementChangeValue(className, valueToSelect) {    
			var nodeList = document.querySelectorAll('.'+className);
			Array.prototype.forEach.call(nodeList,function(item,index){ // nodeList는 유사배열이므로 이렇게 forEach를 사용합니다. IE에서는 이렇게 해야된다.
				item.value = valueToSelect;
			});
		}
		
		$('#THEMA_LIST').on('change',function(e){
			if(this.value) {
				// ajax 요청, 이 thema와 일치하는 조사 ID들을 가져온다.
				$.ajax({
					url:"/s-portalcnm/api/ststistics/getStstisticsUSTotalSurveySurvIdList.do" ,
					data:{thema : this.value},
					method : 'get',
					success : function(response){
						var survIdList = response.survIdList;
						var html = '<option value="">선택하세요</option>';
						console.log(survIdList);
						$('#SURV_ID').empty();
						
						survIdList.forEach(function(item,index){
							var path = item.path.length > 130 ? '...' + item.path.substr(30) : item.path;
							html += '<option value="'+item.survId+'">'+path+'</option>'
						});
						
						$('#SURV_ID').append(html);
						disableOrEnableInputs('depend_on_themaList',false);
						
				    },
				    error : function(){
				    	alert("테마와 관련된 조사 ID를 얻어오지 못했습니다.");
				    	disableOrEnableInputs('depend_on_themaList',true);
						selectElementChangeValue('depend_on_themaList','');
				    }
				});				
			} else {
				disableOrEnableInputs('depend_on_themaList',true);
				selectElementChangeValue('depend_on_themaList','');
			}
		});
		
		
		// 수정 + 삭제 화면에서 항목 설정의 [수정] 버튼에 대한 이벤트이다.
		$('#modifyBtn').on('click',function(e){
			e.preventDefault();
			if(!ConfigurationValidCheck()) return;
			$.ajax({
				url: pageContext + "/api/ststistics/updateConfigureStstisticsUSTotalSurvey.do" ,
				data: formDataToObject('resetForm'),
				method : 'post',
				beforeSend: function(xhr,opts) {
					$('#modifyBtn').css("pointer-events","none");
				},
				success : function(response){
					
					console.log(response);
					
					if(response.notSuccess === "duplicateWithOther") {
						alert('이미 동일한 데이터가 존재합니다.\n조회 페이지에서 검색해서 찾아보시기 바랍니다.')
						return;
					} else if (response.notSuccess == "duplicateWithSelf") {
						alert('수정된 항목이 없습니다.\n수정을 원하시면 기존의 값과 다르게 작성해주시기 바랍니다.')
						return;
					} else if(response.successCnt > 0) {
						alert('[항목 설정]에 대한 수정이 완료되었습니다.');
						history.replaceState({},null,null);	// 뒤로가기 방지
						location.href = pageContext + "/ststistics/ststisticsUSTotalSurveyMng.do";
					} else if(response.error) {
						alert(response.error);
						return;
					} else {
						alert('서버의 알고리즘 문제로 인해 입력에 실패하셨습니다.')
					}
					
			    },
			    error : function(){
			    	alert('서버상의 문제로 데이터 입력에 실패하셨습니다');
			    },
			    complete:function(){
			    	$('#modifyBtn').css("pointer-events","");
			    }
			});
		});
		
		
		$('#detailModifyBtn').on('click',function(e){
			e.preventDefault();
			if(!DetailValidCheck()) return;
			
			var tablesToGetDetails = document.querySelectorAll('[class^="table-flow-item"]');
			var selectedDetails = [];
			
			// 아래 코드는 항목 상세 설정 테이블을 모두 순회하면서 체크되어 있는 row에 대한 데이터를 찾고,
			// 찾은 모든 데이터들을 selectedDetails 배열에 넣는 것이다.
			Array.prototype.forEach.call(tablesToGetDetails,function(item,index){
				Array.prototype.push.apply(selectedDetails,getSelectedDetails(item.id));
			});
			
			var changed = selectedDetails;
			var original = rememberFirstData;
			/* if(changed.length === 0) {
				alert('항목 상세 설정은 최소 하나를 선택해야합니다.');
				return;
			} */
			
			
			// 아래 forEach는 datagrid가 맨 처음 그려질 때 가져온 데이터들(=원본 데이터)과 현재 수정버튼을 누르는 시점의 데이터들을 비교해서
			// 원본 데이터에는 있지만 수정 데이터에는 없는, 즉 삭제되는 목록들을 찾아내고, 
			// 찾아낸것을 수정 데이터 목록에 넣어주는 것이다. 다른 데이터들과 달리 이 데이터(객체)는 'delYn' 이라는 속성을 갖는다.
			var appendingDataArr = [];
			var matchingIndex = [];
			
			original.forEach(function(ori_item,ori_index){
			    var lengthCk = changed.length;
			    
			    var deleteCk = changed.some(function(ch_item,ch_index){
			    	if((ori_item.dataCd === ch_item.dataCd) && (ori_item.dataType === ch_item.dataType)) {
			    		// 같은게 있음에도 어떠한 수정도 일어나지 않았으면 'nochange' 라는 속성을 준다
			    		if(compareDetail(ori_item,ch_item)) {
			    			ch_item['nochange'] = 'Y';
			    		}
			    		return true;
			    	}
			    }) 
			    
			    // 기존에 있었지만 없어진것
			    if(!deleteCk) {
			    	var append = $.extend({},ori_item);
			    	append['delYn'] = 'Y';
			    	appendingDataArr.push(append);
			    }
			    
			    
			});
			
			changed = changed.concat(appendingDataArr);
			
			console.log(appendingDataArr);
			console.log(changed);
			
			
			$.ajax({
				url: pageContext + "/api/ststistics/updateDetailStstisticsUSTotalSurvey.do" ,
				data:{itemSeq : $('#ITEM_SEQ').val(),detailString : JSON.stringify(changed) },
				method : 'post',
				success : function(response){
					console.log(response);
					history.replaceState({},null,null);	// 뒤로가기 방지
					alert('[항목 상세 설정] 수정에 성공하셨습니다');
					location.href = pageContext + "/ststistics/ststisticsUSTotalSurveyMng.do";
			    },
			    error : function(){
			    	alert('서버상의 문제로 데이터 입력에 실패하셨습니다');
			    }
			})
			
		});
		
		
		// 수정 + 삭제 화면에서 하단의 삭제 버튼 클릭시의 이벤트이다.
		$('#deleteAllConfigures').on('click',function(e){
			e.preventDefault();
			console.log('clicked delete Button!');
			
			$.ajax({
				url: pageContext + "/api/ststistics/deleteStstisticsUSTotalSurvey.do" ,
				data: {ITEM_SEQ : $('#ITEM_SEQ').val()},
				method : 'post',
				success : function(response){
					
					console.log(response);
					history.replaceState({},null,null);	// 뒤로가기 방지
					location.href = pageContext + "/ststistics/ststisticsUSTotalSurveyMng.do";
					
			    },
			    error : function(){
			    	alert('서버상의 문제로 데이터 입력에 실패하셨습니다');
			    }
			})
			
		});
		
		
		// 등록버튼 클릭 시
		$('a.register').on('click',function(e){
			e.preventDefault();
			
			// 1. validation check
			
			// 1-1. 항목 설정에 대한 validation check
			if(!ConfigurationValidCheck()) return;
			
			
			// 1-2. 항목 상세 설정에 대한 validation check ==> 수정: 상세 설정은 아예 안 고를 수도 있다고 함. 심부장님 피셜.
			if(!DetailValidCheck()) return;
			
			// 1-3. 항목 상세 설정들을 보낼
			var tablesToGetDetails = document.querySelectorAll('[class^="table-flow-item"]');
			var selectedDetails = [];
			
			// 아래 코드는 항목 상세 설정 테이블을 모두 순회하면서 체크되어 있는 row에 대한 데이터를 찾고,
			// 찾은 모든 데이터들을 selectedDetails 배열에 넣는 것이다.
			Array.prototype.forEach.call(tablesToGetDetails,function(item,index){
				Array.prototype.push.apply(selectedDetails,getSelectedDetails(item.id));
			});
			
			// 2. AJAX 요청 
			//	 - 성공시: 등록이 완료되었음을 alert 창으로 알리고, replaceState으로 자국을 남겨서 뒤로가기를 못하게 한다.
			//	 - 실패시: 등록이 실패되었음을 alert 창으로 알리고 아무일도 일어나지 않게 한다.
			
			$.ajax({
				url: pageContext + "/api/ststistics/insertAllStstisticsUsTotalSurvey.do" ,
				data: {
					configuration: JSON.stringify(formDataToObject('resetForm')),
					configurationDetails : JSON.stringify(selectedDetails)
				},
				method : 'post',
				success : function(response){
					
					console.log(response)
					
					// 만약 에러가 있다면...
					if(response.error) {
						alert(response.error);
						return;
					}
					
					alert('데이터 입력이 완료되었습니다');
					resetFormData();				// 뒤로가기를 대비한다. 등록이 성공한 이후에는 내용을 모두 지워버린다.
					location.href= pageContext + "/ststistics/ststisticsUSTotalSurveyMng.do";	// 페이지 이동
					
			    },
			    error : function(){
			    	alert('서버상의 문제로 데이터 입력에 실패하셨습니다');
			    }
			});
			
		});
		
		// 자료명 및 표출순위를 죠회한다.
		$('#searchNmAndExpRankBtn').on('click',function(e){
			console.log("자료명 및 표출 순위 보기 버튼 클릭");
			setDataNmAndExpRankGrid();
			$('#popup').show();
		});
		
		// HTTP GET 메서드를 사용할 때 보낼 파라미터들을 문자열로 만드는 함수입니다.
		function getMethodParameterMaker(formId) {
			var form = document.getElementById(formId);
			var parameters = "";
			for(var i = 0 ; i < form.length ; i++) {
			    if(!form[i].value.trim() || !form[i].name) continue;
			    var name = form[i].name.trim();
			    var value = form[i].value.trim();
			    //console.log(name+'='+value);
			    parameters += name+'='+value+'&';
			}
			
			parameters = parameters.substr(0,parameters.lastIndexOf('&'));	// 맨 마지막 &만 뺀다.
			return parameters;
		}
		
		
		// Form에 있는 데이터를 객체로 매핑해주는 메소드입니다. 
		function formDataToObject(formId) {
			var result = {};
			var form = document.getElementById(formId);
			for(var i = 0 ; i < form.length ; i++) {
			    if(!form[i].name) continue;
			   var name = form[i].name.trim();
			    var value = form[i].value.trim();
			    result[name] = value;
			}
			return result;
		}
		
		
		// https://www.aspsnippets.com/Articles/Get-selected-checked-CheckBox-Row-values-of-HTML-Table-using-JavaScript.aspx  참고
		// 항목 상세 설정에서 체크한 항목에 대한 데이터를 가져온다.
		function getSelectedDetails(dataGridId) {
	        
			var dataType = document.querySelector('#'+dataGridId).getAttribute('data-type');
			
	        // row[i].cells 처럼 쓰려면 getElementsByTagName를 사용해야한다.
	        var checkBoxes = document.querySelector('#'+dataGridId+' .datagrid-view2 .datagrid-btable').getElementsByTagName("INPUT");
	        var rowItems = [];
	        
	        for (var i = 0; i < checkBoxes.length; i++) {
	        	
	        	// 체크가 되어 있으면서 테이블 맨 앞쪽의 [선택] 컬럼만 가져온다. 체크 박스가 한개의 로우 2개여서 이렇게 했다.
	        	if (checkBoxes[i].checked && (checkBoxes[i].className === 'selectCheckBox' )) {
	            	var row = checkBoxes[i].parentNode.parentNode.parentNode;	// 체크박스가 포함된 tr 태그를 가져온다.
	                
	        		var dataCd = row.cells[1].querySelector('.datagrid-cell').innerHTML;
	        		var dataNm = row.cells[2].querySelector('.datagrid-cell input').value;
	        		var subsumYn = row.cells[3].querySelector('.datagrid-cell input').checked;
	        		
	                rowItems.push({
	                	dataType : dataType,
	                	dataCd : dataCd,
	                	dataNm : dataNm,
	                	subsumYn : subsumYn
	                });
	            }
	        }
	       	
		    
	        return rowItems;
	 
	    }
		
		function compareDetail(detail_1, detail_2) {
			
			if(detail_1.dataCd === detail_2.dataCd 
				&& detail_1.dataNm === detail_2.dataNm 
				&& detail_1.dataType === detail_2.dataType
				&& detail_1.subsumYn === detail_2.subsumYn
			) {
				return true;
			} else {
				return false;
			}
		}
		
		
		// 수정을 하기 위한 화면을 보여주기 위한 세팅 메소드 (2020-09-08 작성, pse)
		function setModifyConfigure() {
			// 항목 대분류, 중분류, 소분류에 대한 값을 맞춰주고
			var bigClassId = '${configurationMap.itemBClassId}';
			document.querySelector('#ITEM_B_CLASS_ID').value = bigClassId;
			
			// 2020-10-07 수정 : 항목분류는 수정 불가 
			var itemBClassId_selectBox = document.querySelector('#ITEM_B_CLASS_ID');
			var itemMClassId_selectBox = document.querySelector('#ITEM_M_CLASS_ID');
			var itemSClassId_selectBox = document.querySelector('#ITEM_S_CLASS_ID');
			itemBClassId_selectBox.disabled = true;
			itemMClassId_selectBox.disabled = true;
			itemSClassId_selectBox.disabled = true;
			
			
			if(bigClassId.startsWith('BRD')) {	// 대시 보드일 경우에만 중분류, 소분류가 있다.
				// 2020-10-07 수정 : 항목분류는 수정 불가
				// var itemMClassId_selectBox = document.querySelector('#ITEM_M_CLASS_ID');
				// var itemSClassId_selectBox = document.querySelector('#ITEM_S_CLASS_ID');
				itemMClassId_selectBox.value = '${configurationMap.itemMClassId}';
				itemSClassId_selectBox.value = '${configurationMap.itemSClassId}';
				
				// 2020-10-07 수정 : 항목분류는 수정 불가
				// itemMClassId_selectBox.disabled = false;
				// itemSClassId_selectBox.disabled = false;
				
			} 
			
			var BClassText = $('#ITEM_B_CLASS_ID option:selected').text();
			var MClassText = $('#ITEM_M_CLASS_ID option:selected').text();
			var SClassText = $('#ITEM_S_CLASS_ID option:selected').text();
			
			if(itemBClassId_selectBox.value.startsWith('BRD')) {
				$('#classTd').append('<h1>'+BClassText + '  >  ' + MClassText +'  >  ' + SClassText +'</h1>');
			} else {
				$('#classTd').append('<h1>'+BClassText+'</h1>');
			}
			/* if(MClassText === '' && SClassText === '') {	// 상세보기의 경우이다.
			} else {
				
			} */
			
			document.querySelector('#EXP').value = '${configurationMap.exp}';
			document.querySelector('#SOURCE').value = '${configurationMap.source}';
			document.querySelector('#UNIT').value = '${configurationMap.unit}';
			document.querySelector('#DATA_NM').value = '${configurationMap.dataNm}';
			document.querySelector('#DISP_RANK').value = '${configurationMap.dispRank}'
			document.querySelector('#CHART_ID').value = '${configurationMap.chartId}';
			document.querySelector('#DISP_DATA_TYPE').value = '${configurationMap.dispDataType}';
			
			configurationOpenCloseAtModify(bigClassId);
		}
		
		// 한 방에 모든 전송 데이터를 초기화한다. 뒤로가기에 대한 처리를 위해서 만든 함수이다.
		function resetFormData() {
			document.querySelector('#resetForm').reset();
			disableOrEnableInputs('depend_on_themaList',true);
			//selectElementChangeValue('depend_on_themaList','');
			disableOrEnableInputs('depend_on_b_class',true);
			//selectElementChangeValue('depend_on_b_class','');
			disableOrEnableInputs('chart_id',true);
			//selectElementChangeValue('chart_id','');
		}
		
		
		// 항목 분류에서 대분류( => 대시보드(정보) / 대시보드(차트) / 상세페이지 )에 따라서 
		// 항목설정 및 항목 상세 설정에서 입력할 수 있는 부분을 열어두거나 제한하는 함수이다.
		function configurationOpenClose(bigClass, isModify) {
			
			var exp = document.querySelector('#EXP');
			var source = document.querySelector('#SOURCE');
			var itemMClassId = document.querySelector('#ITEM_M_CLASS_ID');
			var itemSClassId = document.querySelector('#ITEM_S_CLASS_ID');
			var unit = document.querySelector('#UNIT');
			var chartId = document.querySelector('#CHART_ID');
			
		    if(!bigClass) {
		    	
		    	// 중분류 및 소분류는 선택이 가능하도록 열어둔다.
		    	disableOrEnableInputs('depend_on_b_class',false);
		    	selectElementChangeValue('depend_on_b_class','');
		    	
		    	// 도움말(출처)는 내용물을 비우고 readOnly를 해제한다.
		    	exp.value = "";
		    	exp.readOnly = false;
		    	
		    	// 도움말(출처)는 내용물을 비우고 readOnly를 해제한다.
		    	source.value = "";
		    	source.readOnly = false;
		    	
		    	// 차트 유형을 선택을 못하도록 enabled한다.
		    	chartId.disabled = false;
		        selectElementChangeValue('CHART_ID','');
		        
		        // 내용물들을 모두 초기화한다.
		    	
		        
		    } else if(bigClass === 'BRD_INFO') {
				
		    	disableOrEnableInputs('depend_on_b_class',false);
		    	
		    	exp.value = "";
		    	exp.readOnly = false;
		    	
		    	source.value = "";
		    	source.readOnly = false;
		    	
		    	chartId.disabled = true;
		        selectElementChangeValue('CHART_ID','');
		        
			} else if(bigClass === 'BRD_CHART') {
				
		    	disableOrEnableInputs('depend_on_b_class',false);
		    	
		    	exp.value = "";
		    	exp.readOnly = true;
		    	
		    	source.value = "";
		    	source.readOnly = true;
		    	
		    	chartId.disabled = false;
		        selectElementChangeValue('CHART_ID','');
				
			} else if(bigClass === 'DTL') {
				
		    	disableOrEnableInputs('depend_on_b_class',true);
		    	selectElementChangeValue('depend_on_b_class','');
		    	
		    	exp.value = "";
		    	exp.readOnly = true;
		    	
		    	source.value = "";
		    	source.readOnly = true;
				
		    	chartId.disabled = false;
		        selectElementChangeValue('CHART_ID','');
				
			}
		    
		}
		
		function configurationOpenCloseAtModify(bigClass) {
			var exp = document.querySelector('#EXP');
			var source = document.querySelector('#SOURCE');
			var chartId = document.querySelector('#CHART_ID');
			
			if(bigClass === 'BRD_INFO') {
				chartId.disabled = true;
			} else if(bigClass === 'BRD_CHART' || bigClass === 'DTL') {
				exp.readOnly = true;
				source.readOnly = true;
			}
		}
		
		function disableSubSumCheckBox() {
			var subSumCheckBox = $('td[field="subSumCheckbox"] input[type="checkbox"]');
			subSumCheckBox.enable(false);
			subSumCheckBox.prop('checked',false);
		}
		
		function enableSubSumCheckBox() {
			var subSumCheckBox = $('td[field="subSumCheckbox"] input[type="checkbox"]');
			subSumCheckBox.enable(true);
			if(firstCheckForModify === 'N') {
				subSumCheckBox.prop('checked',false);
			}
		}
		
		function ConfigurationValidCheck() {

			var itemBClassId = document.querySelector('#ITEM_B_CLASS_ID').value.trim(); // 공통
			var itemMClassId = document.querySelector('#ITEM_M_CLASS_ID').value.trim();
			var itemSClassId = document.querySelector('#ITEM_S_CLASS_ID').value.trim();
			var survId		 = document.querySelector('#SURV_ID').value.trim();			// 공통
			var dataNm		 = document.querySelector('#DATA_NM').value.trim();			// 공통
			var dispRank	 = document.querySelector('#DISP_RANK').value.trim();		// 공통
			var exp			 = document.querySelector('#EXP').value.trim();
			var source		 = document.querySelector('#SOURCE').value.trim();
			var dispDataType = document.querySelector('#DISP_DATA_TYPE').value.trim();
			var unit		 = document.querySelector('#UNIT').value.trim();			// 공통
			var chartId		 = document.querySelector('#CHART_ID').value.trim();	
			
			
			// 1-1. 본격적인 검사를 시작한다.
			if(!itemBClassId) 	{ alert('항목분류 - 대분류를 선택하세요'); return; }
			
			if(itemBClassId.startsWith('BRD')) {
				if(!itemMClassId) 	{ alert('항목분류 - 중분류를 선택하세요'); return; }
				if(!itemSClassId) 	{ alert('항목분류 - 소분류를 선택하세요'); return; }
			}
			
			if(!survId) { alert('통계정보를 입력하세요'); return; }
			if(!dataNm) { alert('자료명을 입력하세요'); return; }
			if(!dispRank) { 
				alert('표출순위를 입력하세요'); return; 
			} else {
				dispRank = Number(dispRank).toFixed(0).toString();
				if(dispRank <= 0) {
					alert('표출 순위는 0보다 큰 정수여야 합니다');
					return;
				}
			}
			
			if(itemBClassId === 'BRD_INFO') {
				if(!exp) 		{ alert('도움말에 사용할 설명을 입력하세요'); return; }
				if(!source) 	{ alert('도움말에 작성에 사용된 출처를 입력하세요'); return; }
			}
			/* 
			if(dispDataType === '' ) {
				
			}
			 */
			if(!unit) { alert('단위를 입력하세요'); return; }
			
			if(itemBClassId !== 'BRD_INFO') {
				if(!chartId) { alert('차트 유형을 선택하세요'); return; }
			}
			
			return true;
		}
		
		// 항목 상세 설정에 대한 검사는 간단하다.
		// 항목 설정에서 선택한 "표출 항목 상세"과 일치하는 항목 상세 설정 표출 테이블에서
		// 최소 하나를 선택을 해야만 한다.
		function DetailValidCheck() {
			
			var detail = $('#DISP_DATA_TYPE');
			var detail_value = detail.val(); 
			var detail_table = $('.table-flow-item[data-type="'+detail_value+'"]');
			if( detail_table.find('input.selectCheckBox:checked').length > 0 ) {
				return true;
			} else {
				alert('선택하신\"표출 항목 상세\"와 일치하는 항목 상세 설정에서\n최소 하나를 선택하셔야 합니다.');
				return false;
			}
			
		}
		
		<%-- 수정이면 setGrid 값을 달리한다. --%>
	    <%-- javascript 에러가 나지만 무시해도 상관없습니다. $에 의한 에러지만 JSP가 처리 후에 페이지가 보이기 때문에 상관없습니다. --%>
	    /* var mod_surv_id = "${configurationMap.survId}";
	    ${isModify ? 'setModifyConfigure();setGrid(mod_surv_id);' : 'setGrid()'} */
	    
	    
	    $(".regProc.step1").show();
	    regist.step = 1;
	    		
		$.ajax({
			method: "POST",
			async: false,	// 반드시 동기처리 해야 함
			url: proxyURL + "http://link.kostat.go.kr/view/kosisApi/getListStblCategories.do",
			dataType: "json",
			success: function(res) {
				var str = "";
				for(var i=0; i<res.length; i++) {
					str += "<option value='" + res[i].STAT_NM + "'>" + res[i].STAT_NM + "</option>";
				}
				
				if(res.length > 10) {
					$("#selectListStblCategory").attr("size", 10);
				} else {
					$("#selectListStblCategory").attr("size", res.length);
				}			
				$("#selectListStblCategory").html(str);
				
				$("#selectListStblCategory").select2({
				    placeholder: "카테고리 선택",
				    allowClear: true
				});
			},
			error: function(e) {
				//$totSurvMain.ui.alert(errorMessage);
			}
		});
	 
		$("#selectListStblCategory").on("change", function() {
			$("#stattbDiv").val($("#selectListStblCategory option:selected").val());
			$(".regProc.detail").show().find(".step1").show();
		});
		
		$("#newListStbl").on("change", function() {
			//tblId remove ..
			let tblNm = $("#newListStbl option:selected").text().substring($("#newListStbl option:selected").text().indexOf(")")+1)
			$("#orgId").val($("#newListStbl option:selected").data("orgid"));
			$("#tblId").val($("#newListStbl option:selected").val());
			$("#tblNm").val(tblNm);
			$("#dispNm").val(tblNm);
		})
		
		$("a.cancel_1").on("click", function() {
			window.location.href = "/s-portalcnm/ststistics/ststisticsUSTotalStblMng.do";
		});
		
		$("a.prev").on("click", function() {
			if(regist.step == 2) {
				regist.step = 1;
				$(".regProc.step2").hide();
				$(".regProc.detail .step2").hide();
				$("a.prev").hide();
				$("a.cancel_1").show();				
				$(".regProc.step1").show();				
			} else if(regist.step == 3) {
				regist.step = 2;
				$("a.save").hide();				
				$(".regProc.step3").hide();
				$(".regProc.detail .step3").hide();
				$("a.next").show();
				$(".regProc.step2").show();
			}						
		});
		
		$("a.next").on("click", function() {
			if(regist.step == 1) {
				if($("#selectListStblCategory option:selected").val() == undefined) {
					alert("카테고리 선택은 필수입니다.");
					return;
				}
				
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: pageContext + "/ststistics/registeredStblList.do",
					dataType: "json",
					success: function(res) {
						regist.registeredStblList = res.resultList;
					},
					error: function(e) {
						//$totSurvMain.ui.alert(errorMessage);
					}
				});
				
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: proxyURL + "http://link.kostat.go.kr/view/kosisApi/getStblList.do",
					data: {
						category: $("#selectListStblCategory option:selected").val()
					},
					dataType: "json",
					success: function(res) {
						var str = ""; registeredStr = "";
						for(var i=0; i<res.length; i++) {
							let isAready = false;
							for(var j=0; j<regist.registeredStblList.length; j++) {
								if(res[i].TBL_ID == regist.registeredStblList[j].tblId) {
									isAready = true;
									break;
								}
							}
							if(isAready) {
								registeredStr += "<option value='" + res[i].TBL_ID + "' data-orgid='" + res[i].ORG_ID + "'";
								registeredStr += " data-itmlv='" + res[i].ITM_LV + "' data-origin='Y'>" + res[i].TBL_NM + "</option>";
							} else {
								str += "<option value='" + res[i].TBL_ID + "' data-orgid='" + res[i].ORG_ID + "'";
								str += " data-itmlv='" + res[i].ITM_LV + "'>" + res[i].TBL_NM + "</option>";
							}
							
							regist.newStblList = res;
						}
						
						$("#newListStbl").html(str);
						$("#registeredListStbl").html(registeredStr);
						
						$(".regProc.step1").hide();
						$(".regProc.step2").show();
						
						$(".regProc.detail .step2").show();
						regist.step = 2;
					},
					error: function(e) {
						//$totSurvMain.ui.alert(errorMessage);
					}
				});
				
				$("a.prev").show();
			} else if(regist.step == 2) {
				$(".regProc.step2").hide();				
				$("a.next").hide();
				$("a.save").show();
				$(".regProc.detail .step3").show();
				$(".regProc.step3").show();								
				regist.step = 3;
				
				let selRegistered = $("#registeredListStbl option[data-origin!=Y]").clone();
				$(".registeredListStbl_step3").html(selRegistered);
				
				$(".registeredListStbl_step3").select2();
				$(".regProc.step3 .stblTable span.select2").css("width", "100%");
				
				let stblOpts = $(".regProc.step3 .stblInfo select.registeredListStbl_step3 option"), stblList = "";
				for(var i=0; i<stblOpts.length; i++) {
					if(i!=0) {
						stblList += "," + $(stblOpts[i]).val();
					} else {
						stblList += $(stblOpts[i]).val();
					}
				}
				
				$.ajax({
					url: proxyURL + "http://link.kostat.go.kr/view/kosisApi/getStblItmList.do",
					data: {
						orgId : stblOpts.data("orgid"),
						stblList : stblList
					},
					method : 'POST',
					success : function(res){
						//regist.beingRegisteredStblList = res;
						regist.beingRegisteredStblList = {};
						for(var i=0; i<res.length; i++) {
							if(regist.beingRegisteredStblList[res[i].TBL_ID] == undefined) {
								regist.beingRegisteredStblList[res[i].TBL_ID] = [];
								regist.beingRegisteredStblList[res[i].TBL_ID] = res[i];
							}
						}
						setGrid();
				    },
				    error : function(){
				    	alert("테마와 관련된 조사 ID를 얻어오지 못했습니다.");
				    	//disableOrEnableInputs('depend_on_themaList',true);
						//selectElementChangeValue('depend_on_themaList','');
				    }
				});
			}
		});
		
		//newListStbl registeredListStbl
		$(".regProc.step2 img.append").on("click", function() {
			if($("#newListStbl option:selected").length == 0) {
				alert("선택된 통계표가 없습니다.");
			} else {
				let selStbl = $("#newListStbl option:selected");
				$("#newListStbl option:selected").remove();
				$("#registeredListStbl").append(selStbl);
			}
		});
		
		$(".regProc.step2 img.remove").on("click", function() {
			if($("#registeredListStbl option:selected").length == 0) {
				alert("선택된 통계표가 없습니다.");
			} else {
				let selStbl = $("#registeredListStbl option:selected"), originAt = false;
				for(var i=0; i<selStbl.length; i++) {
					if($(selStbl[i]).data("origin") == "Y") {
						originAt = true;
					}
				}
				
				if(originAt) {
					alert("등록된 통계표는 임의로 삭제할 수 없습니다.\n관리자에게 문의하십시오.");
					return;
				}
				
				$("#registeredListStbl option:selected").remove();
				$("#newListStbl").append(selStbl);
			}
		});
		
		$(".regProc.step3 .stblInfo .registeredListStbl_step3").on("change", function() {
			let orgId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").data("orgid"); // 선택된 통계표 조직ID
			let tblId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").val(); // 선택된 통계표 ID
			
			$("#regionBegin option[value='전국']").attr("selected", true);
			$("#regionEnd option[value='전국']").attr("selected", true);
			
			$("#stattbDiv").val(regist.beingRegisteredStblList[tblId].STAT_NM == undefined ? "" : regist.beingRegisteredStblList[tblId].STAT_NM);
			$("#pathNm").val(regist.beingRegisteredStblList[tblId].LIST_NM_PATH == undefined ? "" : regist.beingRegisteredStblList[tblId].LIST_NM_PATH);
			$("#tblNm").val(regist.beingRegisteredStblList[tblId].TBL_NM == undefined ? "" : regist.beingRegisteredStblList[tblId].TBL_NM);
			$("#stattbUrl").val(regist.beingRegisteredStblList[tblId].SVC_URL == undefined ? "" : regist.beingRegisteredStblList[tblId].SVC_URL);
			$("#stattbSourc").val(regist.beingRegisteredStblList[tblId].STATTB_SOURC == undefined ? "" : regist.beingRegisteredStblList[tblId].STATTB_SOURC);
			$("#objNm").val(regist.beingRegisteredStblList[tblId].OBJ_NM == undefined ? "" : regist.beingRegisteredStblList[tblId].OBJ_NM);
			if(regist.beingRegisteredStblList[tblId].REGION_BEGIN == undefined) {
				$("#regionBegin option[value='전국']").prop("selected", true);	
			} else {
				$("#regionBegin option[value='" + regist.beingRegisteredStblList[tblId].REGION_BEGIN + "']").prop("selected", true);
			}
			if(regist.beingRegisteredStblList[tblId].REGION_END == undefined) {
				$("#regionEnd option[value='전국']").prop("selected", true);	
			} else {
				$("#regionEnd option[value='" + regist.beingRegisteredStblList[tblId].REGION_END + "']").prop("selected", true);
			}
			$("#regionVarOrd").val(regist.beingRegisteredStblList[tblId].REGION_VAR_ORD);
			$("#stattbYear").val(regist.beingRegisteredStblList[tblId].STATTB_YEAR);
			$("#stattbOrder").val(regist.beingRegisteredStblList[tblId].STATTB_ORDER);
			$("#stattbBeginYear").val(regist.beingRegisteredStblList[tblId].STATTB_BEGIN_YEAR);
			$("#stattbEndYear").val(regist.beingRegisteredStblList[tblId].STATTB_END_YEAR);
		});
		
		//카테고리는 step1에서 선택하고 들어왔기 때문에 고정
		$("#stattbDiv").on("keydown", function() {
			let orgId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").data("orgid"); // 선택된 통계표 조직ID
			let tblId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").val(); // 선택된 통계표 ID
			
			for(var i=0; i<regist.beingRegisteredStblList.length; i++) {
				
			}
		});
		
		//통계표 정보 변경
		$("#objNm, #stattbUrl, #stattbSourc, #regionBegin, #regionEnd, #regionVarOrd, #stattbYear, #stattbOrder, #stattbBeginYear, #stattbEndYear").on("change", function() {
			let orgId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").data("orgid"); // 선택된 통계표 조직ID
			let tblId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").val(); // 선택된 통계표 ID
			
			if(this.id == "objNm") {
				regist.beingRegisteredStblList[tblId].OBJ_NM = $("#objNm").val();
			} else if(this.id == "stattbUrl") {
				regist.beingRegisteredStblList[tblId].STATTB_URL = $("#stattbUrl").val();
			} else if(this.id == "stattbSourc") {
				regist.beingRegisteredStblList[tblId].STATTB_SOURC = $("#stattbSourc").val();
			} else if(this.id == "regionBegin") {
				regist.beingRegisteredStblList[tblId].REGION_BEGIN = $("#regionBegin option:selected").val();
			} else if(this.id == "regionEnd") {
				regist.beingRegisteredStblList[tblId].REGION_END = $("#regionEnd option:selected").val();
			} else if(this.id == "regionVarOrd") {
				regist.beingRegisteredStblList[tblId].REGION_VAR_ORD = $("#regionVarOrd").val();
			} else if(this.id == "stattbYear") {
				regist.beingRegisteredStblList[tblId].STATTB_YEAR = $("#stattbYear").val();
			} else if(this.id == "stattbOrder") {
				regist.beingRegisteredStblList[tblId].STATTB_ORDER = $("#stattbOrder").val();
			} else if(this.id == "stattbBeginYear") {
				regist.beingRegisteredStblList[tblId].STATTB_BEGIN_YEAR = $("#stattbBeginYear").val();
			} else if(this.id == "stattbEndYear") {
				regist.beingRegisteredStblList[tblId].STATTB_END_YEAR = $("#stattbEndYear").val();
			}
		});
		
		$("a.save").on("click", function() {			
			let stblInfoMapList = [];
			for(var i=0; i<Object.keys(regist.beingRegisteredStblList).length; i++) {
				stblInfoMapList.push(regist.beingRegisteredStblList[Object.keys(regist.beingRegisteredStblList)[i]]);
			}
			$.ajax({
				url: pageContext + "/api/ststistics/insertStstisticsUSTotalStblList.do",
				data: JSON.stringify(stblInfoMapList),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				method : 'POST',
				success : function(res){
					console.log("저장");
			    },
			    error : function(){
			    	alert("테마와 관련된 조사 ID를 얻어오지 못했습니다.");
			    	//disableOrEnableInputs('depend_on_themaList',true);
					//selectElementChangeValue('depend_on_themaList','');
			    }
			});
			
		});
		
		$("#newStblSearch").keyup(function(evt) {
			let searchKeyword = $("#newStblSearch").val();
			for(var i=0; i<$("#newListStbl option").length; i++) {
				if(searchKeyword != "") {
					if(createFuzzyMatcher(searchKeyword).test($("#newListStbl option")[i].text)) {
						$("#newListStbl option")[i].style.display = "block";
					} else {
						$("#newListStbl option")[i].style.display = "none";
					}
				} else {
					$("#newListStbl option")[i].style.display = "block";
				}			
			}
		});
		
		$("#registeredStblSearch").keyup(function(evt) {
			let searchKeyword = $("#registeredStblSearch").val();
			for(var i=0; i<$("#registeredListStbl option").length; i++) {
				if(searchKeyword != "") {
					if(createFuzzyMatcher(searchKeyword).test($("#registeredListStbl option")[i].text)) {
						$("#registeredListStbl option")[i].style.display = "block";
					} else {
						$("#registeredListStbl option")[i].style.display = "none";
					}
				} else {
					$("#registeredListStbl option")[i].style.display = "block";
				}
			}
		});
	});	
	//ready 끝
	var change;
	var original;
	
	/* function compareDetail(detail_1, detail_2) {
		
		if(detail_1.dataCd === detail_2.dataCd 
			&& detail_1.dataNm === detail_2.dataNm 
			&& detail_1.dataType === detail_2.dataType
			&& detail_1.subsumYn === detail_2.subsumYn
		) {
			return true;
		} else {
			return false;
		}
	} */
	
	/* 
	function getSelectedDetails(dataGridId) {
        
		var dataType = document.querySelector('#'+dataGridId).getAttribute('data-type');
		
        // row[i].cells 처럼 쓰려면 getElementsByTagName를 사용해야한다.
        var checkBoxes = document.querySelector('#'+dataGridId+' .datagrid-view2 .datagrid-btable').getElementsByTagName("INPUT");
        var rowItems = [];
        
        for (var i = 0; i < checkBoxes.length; i++) {
        	
        	// 체크가 되어 있으면서 테이블 맨 앞쪽의 [선택] 컬럼만 가져온다. 체크 박스가 한개의 로우 2개여서 이렇게 했다.
        	if (checkBoxes[i].checked && (checkBoxes[i].className === 'selectCheckBox' )) {
               
            	var row = checkBoxes[i].parentNode.parentNode.parentNode;	// 체크박스가 포함된 tr 태그를 가져온다.
                
        		var dataCd = row.cells[1].querySelector('.datagrid-cell').innerHTML;
        		var dataNm = row.cells[2].querySelector('.datagrid-cell').innerHTML;
        		var subsumYn = row.cells[3].querySelector('.datagrid-cell input').checked;
        		
                rowItems.push({
                	dataType : dataType,
                	dataCd : dataCd,
                	dataNm : dataNm,
                	subsumYn : subsumYn
                });
            }
        }
       
	    
        return rowItems;
 
    } */
	
	function ch2pattern(ch) {
		const offset = 44032; /* '가'의 코드 */
		// 한국어 음절
		if (/[가-힣]/.test(ch)) {
			const chCode = ch.charCodeAt(0) - offset;
			// 종성이 있으면 문자 그대로를 찾는다.
			if (chCode % 28 > 0) {
				return ch;
			}
			const begin = Math.floor(chCode / 28) * 28 + offset;
			const end = begin + 27;
			return "[\\u".concat(begin.toString(16), "-\\u").concat(end.toString(16), "]");
		}
		// 한글 자음
		if (/[ㄱ-ㅎ]/.test(ch)) {
			const con2syl = {
				'ㄱ': '가'.charCodeAt(0),
				'ㄲ': '까'.charCodeAt(0),
				'ㄴ': '나'.charCodeAt(0),
				'ㄷ': '다'.charCodeAt(0),
				'ㄸ': '따'.charCodeAt(0),
				'ㄹ': '라'.charCodeAt(0),
				'ㅁ': '마'.charCodeAt(0),
				'ㅂ': '바'.charCodeAt(0),
				'ㅃ': '빠'.charCodeAt(0),
				'ㅅ': '사'.charCodeAt(0)
			};
    	    const _begin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 /* 'ㅅ'의 코드 */ ) * 588 + con2syl['ㅅ'] );
    	    const _end = _begin + 587;
    	    return "[".concat(ch, "\\u").concat(_begin.toString(16), "-\\u").concat(_end.toString(16), "]");
		}
		// 그 외엔 그대로 내보냄
		// escapeRegExp는 lodash에서 가져옴
		return _.escapeRegExp(ch);
	}
    
    function createFuzzyMatcher(input) {
		const pattern = input.split('').map(ch2pattern).join('.*?');
		return new RegExp(pattern);
	}
	</script>
</head>

<body>
	<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					makeLeftMenu("3", "12", "1");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
				</script>
			</div>
			<!-- cls:left end -->
			<div class="acticle">
				<div class="location">
					<p>
						<a><img src='<c:url value="/html/include/img/ico/ico_home.png"/>' alt="home" /></a>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span>
						<span>서비스 관리</span> 
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span> 총조사시각화</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span> 총조사시각화 통계표 관리</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">
							등록
						</span>
					</p>
				</div>
				<p class="title01">총조사시각화 통계표 관리 등록</p><!--2019-02-19 수정  -->
				<div id="HeaderWrapper" style="overflow: hidden; margin-bottom: 10px;margin-top: 50px">
					<%-- <div class="tilte03" style="margin-top:0px">항목 설정</div>
					<c:if test="${isModify}">
						<button id="modifyBtn">수정</button>
					</c:if>
					<button id="searchNmAndExpRankBtn">자료명 및 표출순위 조회</button> --%>
				</div>
								
				<div>					
					<div class="regProc step3" style="display: block;">
						<span class="title">3. 신규 등록 통계표 목록</span>
						<div class="stblInfoBox">
							<div class="stblInfo">
								<table class="stblTable" summary="조회조건">
									<colgroup>
										<col width="15%" />
										<col width="35%" />
										<col width="15%" />
										<col width="35%" />
									</colgroup>
									<tbody>
										<tr class="step2">
											<th class="right">통계표명</th>
											<td colspan="3">
												<input type="hidden" id="orgId" name="orgId"/>
												<input type="hidden" id="tblId" name="tblId"/>
												<input type="text" class="input_use03 validatebox-text" id="tblNm" name="tblNm" disabled
													value="${requestParam.get(0).tblNm }"/>
											</td>
										</tr>
										<tr class="step1">
											<th class="right">카테고리</th>
											<td colspan="3">
												<input type="text" class="validatebox-text" id="stattbDiv" name="stattbDiv" disabled
													value="${requestParam.get(0).stattbDiv}"/>
											</td>
										</tr>
										<tr class="step1">
											<th class="right">분야</th>
											<td colspan="3">
												<input type="text" class="validatebox-text" id="pathNm" name="pathNm" disabled
													value="${requestParam.get(0).pathNm}" />
											</td>
										</tr>										
										<tr class="step3">
											<th class="right">툥계표URL</th>
											<td colspan="3">
												<input type="text" class="validatebox-text" id="stattbUrl" name="stattbUrl"
													value="${requestParam.get(0).stattbUrl}"/>
											</td>
										</tr>
										<tr class="step2">
											<th class="right">도움말(출처)</th>
											<td colspan="3">
												<input type="text" class="validatebox-text" id="stattbSourc" name="stattbSourc" placeholder="예)통계청,「경제총조사」"
													value="${requestParam.get(0).stattbSourc}"/>
											</td>
										</tr>
										<tr class="step3">
											<th class="right">통계표출항목</th>
											<td>
												<input type="text" class="validatebox-text" id="objNm" name="objNm" placeholder="예) 산업대분류별" 
													value="${requestParam.get(0).objNm}"/>
											</td>
											<th class="right">통계지역</th>
											<td>
												<select class="split" id="regionBegin">
													<option value="전국">전국</option>
													<option value="시도">시도</option>
													<option value="시군구">시군구</option>
													<option value="읍면동">읍면동</option>
												</select>
												<span class="flow">~</span>
												<select class="split" id="regionEnd">
													<option value="전국">전국</option>
													<option value="시도">시도</option>
													<option value="시군구">시군구</option>
													<option value="읍면동">읍면동</option>
												</select>
											</td>
										</tr>
										<tr>
											<th class="right">지역 표출 레벨</th>
											<td>
												<input type="text" class="validatebox-text" id="regionVarOrd" name="regionVarOrd" placeholder="예) 1"
													value="${requestParam.get(0).regionVarOrd}" />
											</td>
											<th class="right">수록시점</th>
											<td>
												<input type="text" class="validatebox-text" id="stattbYear" name="stattbYear" placeholder="2021"
													value="${requestParam.get(0).stattbYear}"/>
											</td>
										</tr>
										<tr class="step3">
											<th class="right">정렬순서</th>
											<td>
												<input type="text" class="validatebox-text" id=stattbOrder name="stattbOrder" placeholder="예) 1" 
													value="${requestParam.get(0).stattbOrder}"/>
											</td>
											<th class="right">수록기간</th>
											<td>
												<input type="text" class="validatebox-text split" id="stattbBeginYear" name="stattbBeginYear" placeholder="예) 2010" 
													value="${requestParam.get(0).stattbBeginYear}"/>
												<span class="flow">~</span>
												<input type="text" class="validatebox-text split" id="stattbEndYear" name="stattbEndYear" placeholder="예) 2021" 
													value="${requestParam.get(0).stattbEndYear}"/>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="btnbox">
					<a id="cancel_1" 	class="cancel_1">
						<label style="cursor: pointer;" for="cancel">취소</label>
					</a>						
					<a id="prev" 	class="prev">
						<label style="cursor: pointer;" for="prev">이전</label>
					</a>
					<!-- <a id="preview" 	class="preview">
						<label style="cursor: pointer;" for="preview">미리보기</label>
					</a> -->
					<a id="next" 	class="next">
						<label style="cursor: pointer;" for="next">다음</label>
					</a>
					<a id="save" 	class="save">
						<label style="cursor: pointer;" for="save">저장</label>
					</a>
				</div>
			</div><!-- end of article -->
			
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<div class="popupWrapper" id="popup" style="left: 0">
			<div class="popupWrapper">
				<div class="aplPopupWrapper" style="width: 340px; height: auto;">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">자료명 및 표출순위 조회</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<div>
					<div id="searchNmAndExpRankTable_Wrapper">
						<table id="searchNmAndExpRankTable" style="width:340px;height:300px;"></table>
	    			</div>
					</div>					
					<div class="btnbox">
						<a id="cancel" 	class="cancel" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">나가기</label></a>
					</div>
				</div>
			</div>
		</div>
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
</html>