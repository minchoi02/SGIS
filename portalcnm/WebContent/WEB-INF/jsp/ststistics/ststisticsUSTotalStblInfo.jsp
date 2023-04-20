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
	regist.beingRegisteredStblList = {};
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
		let isModify = ${requestParam.isModify};
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
			if(isModify) {
				$("#dataForm").attr("action", pageContext + "/ststistics/ststisticsUSTotalStblInfo.do");
				$("#isModify").val(false);
				$("#dataForm").submit();
			} else {
				location.href = pageContext + "/ststistics/ststisticsUSTotalStblMng.do";
			}
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
		
		//카테고리는 step1에서 선택하고 들어왔기 때문에 고정
		$("#stattbDiv").on("keydown", function() {
			let orgId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").data("itminfo"); // 선택된 통계표 조직ID
			let tblId = $(".regProc.step3 .stblInfo .registeredListStbl_step3 option:selected").val(); // 선택된 통계표 ID
			
			for(var i=0; i<regist.beingRegisteredStblList.length; i++) {
				
			}
		});
		
		$("#regionBegin, #regionEnd").on("chnage", function() {
			let orgId = $("#orgId"); // 선택된 통계표 조직ID
			let tblId = $("#tblId").val(); // 선택된 통계표 ID
			
			if(this.id == "regionBegin") {
				regist.beingRegisteredStblList[tblId].REGION_BEGIN = $("#regionBegin option:selected").val();
			} else if(this.id == "regionEnd") {
				regist.beingRegisteredStblList[tblId].REGION_END = $("#regionEnd option:selected").val();
			}
		});
			
		//통계표 정보 변경
		$("#objNm, #stattbUrl, #stattbSourc, #regionVarOrd, #stattbYear, #stattbOrder, #stattbBeginYear, #stattbEndYear").on("keyup", function() {
			let orgId = $("#orgId"); // 선택된 통계표 조직ID
			let tblId = $("#tblId").val(); // 선택된 통계표 ID
			
			if(this.id == "objNm") {
				regist.beingRegisteredStblList[tblId].OBJ_NM = $("#objNm").val();
			} else if(this.id == "stattbUrl") {
				regist.beingRegisteredStblList[tblId].STATTB_URL = $("#stattbUrl").val();
			} else if(this.id == "stattbSourc") {
				regist.beingRegisteredStblList[tblId].STATTB_SOURC = $("#stattbSourc").val();
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
		
		$("a.delete").on("click", function() {
			$.ajax({
				url: pageContext + "/ststistics/deleteStstisticsUSTotalStblInfo.do",
				data: {
					orgId : $("#orgId").val(),
					tblId : $("#tblId").val()
				},
				method : 'POST',
				success : function(res){
					if(res.result == "success") {
						alert("정상적으로 삭제되었습니다.");
						location.href = pageContext + "/ststistics/ststisticsUSTotalStblMng.do";	
					} else {
						alert("삭제에 실패하였습니다. 관리자에게 문의하십시오.");
					}					
			    },
			    error : function(){
			    	alert("테마와 관련된 조사 ID를 얻어오지 못했습니다.");
			    	//disableOrEnableInputs('depend_on_themaList',true);
					//selectElementChangeValue('depend_on_themaList','');
			    }
			});
		});
		
		$("a.update").on("click", function() {
			let stblInfoMapList = [];
			for(var i=0; i<Object.keys(regist.beingRegisteredStblList).length; i++) {
				stblInfoMapList.push(regist.beingRegisteredStblList[Object.keys(regist.beingRegisteredStblList)[i]]);
			}
			$.ajax({
				url: pageContext + "/api/ststistics/updateStstisticsUSTotalStblList.do",
				data: JSON.stringify(stblInfoMapList),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				method : 'POST',
				success : function(res){
					alert("저장이 완료되었습니다.");
					location.href = pageContext + "/ststistics/ststisticsUSTotalStblMng.do";
			    },
			    error : function(){
			    	alert("테마와 관련된 조사 ID를 얻어오지 못했습니다.");
			    	//disableOrEnableInputs('depend_on_themaList',true);
					//selectElementChangeValue('depend_on_themaList','');
			    }
			});
		});
		
		$("a.modify").on("click", function() {
			$("#dataForm").attr("action", pageContext + "/ststistics/ststisticsUSTotalStblInfo.do");
			$("#isModify").val(true);
			$("#dataForm").submit();
		});
				
		if(isModify) {
			$("#regionBegin option[value=" + "${resultList.get(0).regionBegin}" + "]").prop("selected", true);
			$("#regionEnd option[value=" + "${resultList.get(0).regionEnd}" + "]").prop("selected", true);
			let tblId = "${resultList.get(0).tblId}";
			regist.beingRegisteredStblList[tblId] = {};
			
			regist.beingRegisteredStblList[tblId].ORG_ID = "${resultList.get(0).orgId}";
			regist.beingRegisteredStblList[tblId].TBL_ID = "${resultList.get(0).tblId}";
			regist.beingRegisteredStblList[tblId].STATTB_SOURC = "${resultList.get(0).stattbSourc}";
			regist.beingRegisteredStblList[tblId].STATTB_CLASS = "${resultList.get(0).stattbClass}";
			regist.beingRegisteredStblList[tblId].STATTB_URL = "${resultList.get(0).stattbUrl}";
			regist.beingRegisteredStblList[tblId].PATH_NM = "${resultList.get(0).pathNm}";
			regist.beingRegisteredStblList[tblId].STATTB_BEGIN_YEAR = "${resultList.get(0).stattbBeginYear}";
			regist.beingRegisteredStblList[tblId].STATTB_END_YEAR = "${resultList.get(0).stattbEndYear}";
			regist.beingRegisteredStblList[tblId].REGION_VAR_ORD = "${resultList.get(0).regionVarOrd}";
			regist.beingRegisteredStblList[tblId].REGION_BEGIN = "${resultList.get(0).regionBegin}";
			regist.beingRegisteredStblList[tblId].REGION_END = "${resultList.get(0).regionEnd}";
			regist.beingRegisteredStblList[tblId].STATTB_ORDER = "${resultList.get(0).stattbOrder}";
			regist.beingRegisteredStblList[tblId].STATTB_DIV = "${resultList.get(0).stattbDiv}";
			regist.beingRegisteredStblList[tblId].TBL_NM = "${resultList.get(0).tblNm}";
			regist.beingRegisteredStblList[tblId].MENU_DISP_YN = "${resultList.get(0).menuDispYn}";
			regist.beingRegisteredStblList[tblId].OBJ_NM = "${resultList.get(0).objNm}";
			regist.beingRegisteredStblList[tblId].STATTB_YEAR = "${resultList.get(0).stattbYear}";
		}
	});	
	//ready 끝
	var change;
	var original;
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
						<span> 총조사시각화 통계표</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">상세</span>
					</p>
				</div>
				<p class="title01">총조사시각화 통계표 상세</p><!--2019-02-19 수정  -->
				<div id="HeaderWrapper" style="overflow: hidden; margin-bottom: 10px;margin-top: 50px">
					<%-- <div class="tilte03" style="margin-top:0px">항목 설정</div>
					<c:if test="${isModify}">
						<button id="modifyBtn">수정</button>
					</c:if>
					<button id="searchNmAndExpRankBtn">자료명 및 표출순위 조회</button> --%>
				</div>
					
				<form id="dataForm" method="POST">
					<input type="hidden" id="isModify" name="isModify" />
					<input type="hidden" id="orgId" name="orgId" value="${resultList.get(0).orgId}" />
					<input type="hidden" id="tblId" name="tblId" value="${resultList.get(0).tblId}" />
				</form>
							
				<div>				
					<div class="regProc step3" style="display: block">
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
										<tr>
											<th class="right">통계표명</th>
											<td colspan="3">
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="tblId" name="tblId" value="${resultList.get(0).tblNm}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).tblNm}
													</c:otherwise>
												</c:choose>
											</td>
										</tr>
										<tr class="step1">
											<th class="right">카테고리</th>
											<td colspan="3">
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class="validatebox-text showLabel" id="stattbDiv" name="stattbDiv" value="${resultList.get(0).stattbDiv}" disabled/>
													</c:when>
													<c:otherwise>
														${resultList.get(0).stattbDiv}
													</c:otherwise>
												</c:choose>
											</td>
										</tr>
										<tr class="step1">
											<th class="right">분야</th>
											<td colspan="3">
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="pathNm" name="pathNm" value="${resultList.get(0).pathNm}" disabled/>
													</c:when>
													<c:otherwise>
														${resultList.get(0).pathNm}
													</c:otherwise>
												</c:choose>	
											</td>
										</tr>
										<tr class="step3">
											<th class="right">툥계표URL</th>
											<td colspan="3">
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="stattbUrl" name="stattbUrl" value="${resultList.get(0).stattbUrl}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).stattbUrl}
													</c:otherwise>
												</c:choose>
											</td>
										</tr>
										<tr class="step2">
											<th class="right">도움말(출처)</th>
											<td colspan="3">
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="stattbSourc" name="stattbSourc" value="${resultList.get(0).stattbSourc}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).stattbSourc}
													</c:otherwise>
												</c:choose>
											</td>
										</tr>
										<tr class="step3">
											<th class="right">통계표출항목<span style='color:#f00;font-size: 14px;float: right; position: absolute;'> *</span></th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="objNm" name="objNm" value="${resultList.get(0).objNm}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).objNm}
													</c:otherwise>
												</c:choose>
											</td>
											<th class="right">통계지역<span style='color:#f00;font-size: 14px;float: right; position: absolute;'> *</span></th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<select class="split" id="regionBegin" name="regionEnd">
															<option value="전국">전국</option>
															<option value="시도">시도</option>
															<option value="시군구">시군구</option>
															<option value="읍면동">읍면동</option>
														</select>
													</c:when>
													<c:otherwise>
														${resultList.get(0).regionBegin}
													</c:otherwise>
												</c:choose>
												<span class="flow">~</span>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<select class="split" id="regionEnd" name="regionEnd">
															<option value="전국">전국</option>
															<option value="시도">시도</option>
															<option value="시군구">시군구</option>
															<option value="읍면동">읍면동</option>
														</select>
													</c:when>
													<c:otherwise>
														${resultList.get(0).regionEnd}
													</c:otherwise>
												</c:choose>
											</td>
										</tr>
										<tr>
											<th class="right">지역 표출 레벨<span style='color:#f00;font-size: 14px;float: right; position: absolute;'> *</span></th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="regionVarOrd" name="regionVarOrd" value="${resultList.get(0).regionVarOrd}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).regionVarOrd}
													</c:otherwise>
												</c:choose>
											</td>
											<th class="right">수록시점<span style='color:#f00;font-size: 14px;float: right; position: absolute;'> *</span></th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="stattbYear" name="stattbYear" value="${resultList.get(0).stattbYear}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).stattbYear}
													</c:otherwise>
												</c:choose>
											</td>
										</tr>
										<tr class="step3">
											<th class="right">정렬순서</th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" id="stattbOrder" name="stattbOrder" value="${resultList.get(0).stattbOrder}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).stattbOrder}
													</c:otherwise>
												</c:choose>
											</td>
											<th class="right">수록기간<span style='color:#f00;font-size: 14px;float: right; position: absolute;'> *</span></th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class="split" id="stattbBeginYear" name="stattbBeginYear" value="${resultList.get(0).stattbBeginYear}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).stattbBeginYear}
													</c:otherwise>
												</c:choose>
												<span class="flow">~</span>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class="split" id="stattbEndYear" name="stattbEndYear" value="${resultList.get(0).stattbEndYear}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).stattbEndYear}
													</c:otherwise>
												</c:choose>
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
					<c:choose>
						<c:when test="${requestParam.isModify}">
							<a id="update" 	class="update">
								<label style="cursor: pointer;" for="update">저장</label>
							</a>
						</c:when>
						<c:otherwise>
							<a id="delete" 	class="delete">
								<label style="cursor: pointer;" for="delete">삭제</label>
							</a>
							<a id="modify" 	class="modify">
								<label style="cursor: pointer;" for="modify">수정</label>
							</a>
						</c:otherwise>
					</c:choose>
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