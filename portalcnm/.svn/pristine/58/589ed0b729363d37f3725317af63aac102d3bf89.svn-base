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
	// IE 에서 startsWith 사용하기 위한 폴리필
	if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
	    position = position || 0;
	    return this.indexOf(searchString, position) === position;
	  };
	}
	

	function checkedFirst(_this,_event){
		var subSumCheckBox = $(_this).closest('tr').find('.subSumCheckBox')[0];
		subSumCheckBox.checked = false; 
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
	        	return '<input type="checkbox" class="subSumCheckBox" checked="checkded" onchange="checkedSubSum(this,event)" />';
	 		}
	 		return '<input type="checkbox" class="subSumCheckBox" onchange="checkedSubSum(this,event)" />';
	 		
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
		function setGrid(survId){
			
			var itemSeq = "${configurationMap.itemSeq}"; // 수정화면에서만 itemSeq가 값이 있다. 그게 아니면 그냥 빈 문자열이다.
			$('#itemList').datagrid({
				view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				columns : [ [ {
					field : 'itmCheckbox',
					title : '선택',
					width : setWidth[0],
					align : 'center',
					formatter:formatIt
				},{
					field : 'itmCd',
					title : '코드',
					width : setWidth[1],
					align : 'center',
					sortable : false
				}, {
					field : 'itmNm',
					title : '표출명',
					width : setWidth[2],
					align : 'center',
					sortable : false,
					formatter:formatIt3
				}, {
					field : 'subSumCheckbox',
					title : '소계여부',
					width : setWidth[3],
					align : 'center',
					formatter:formatIt2
				} ] ],
				queryParams : {
					// 여기에 http 요청을 할 때 보내고 싶은 파라미터를 넣는다.
					survId : survId	
					, itemSeq : itemSeq
				},
				url : pageContext + '/api/ststistics/getStstisticsUSTotalSurveyItemSelectList.do',
				method: 'POST',
				onLoadSuccess: onSuccessDataGrid
			});
			

			$('#contentList_1').datagrid({
				view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				columns : [ [ {
					field : 'c1Checkbox',
					title : '선택',
					width : setWidth[0],
					align : 'center',
					formatter:formatIt
				},{
					field : 'c1',
					title : '코드',
					width : setWidth[1],
					align : 'center',
					sortable : false
				}, {
					field : 'c1Nm',
					title : '표출명',
					width : setWidth[2],
					align : 'center',
					sortable : false,
					formatter:formatIt3
				}, {
					field : 'subSumCheckbox',
					title : '소계여부',
					width : setWidth[3],
					align : 'center',
					formatter:formatIt2
				} ] ],
				queryParams : {
					survId : survId
					, itemSeq : itemSeq
				},
				url : pageContext + '/api/ststistics/getStstisticsUSTotalSurveyContent_1_SelectList.do',
				method: 'POST',
				onLoadSuccess: onSuccessDataGrid
			});
			
			$('#contentList_2').datagrid({
				view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				columns : [ [ {
					field : 'c2Checkbox',
					title : '선택',
					width : setWidth[0],
					align : 'center',
					formatter:formatIt
				},{
					field : 'c2',
					title : '코드',
					width : setWidth[1],
					align : 'center',
					sortable : false
				}, {
					field : 'c2Nm',
					title : '표출명',
					width : setWidth[2],
					align : 'center',
					sortable : false,
					formatter:formatIt3
				}, {
					field : 'subSumCheckbox',
					title : '소계여부',
					width : setWidth[3],
					align : 'center',
					formatter:formatIt2
				} ] ],
				queryParams : {
					survId : survId
					, itemSeq : itemSeq
				},
				url : pageContext + '/api/ststistics/getStstisticsUSTotalSurveyContent_2_SelectList.do',
				method: 'POST',
				onLoadSuccess: onSuccessDataGrid
			});
			
			
			$('#contentList_3').datagrid({
				view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				columns : [ [ {
					field : 'c3Checkbox',
					title : '선택',
					width : setWidth[0],
					align : 'center',
					formatter:formatIt
				},{
					field : 'c3',
					title : '코드',
					width : setWidth[1],
					align : 'center',
					sortable : false
				}, {
					field : 'c3Nm',
					title : '표출명',
					width : setWidth[2],
					align : 'center',
					sortable : false,
					formatter:formatIt3
				}, {
					field : 'subSumCheckbox',
					title : '소계여부',
					width : setWidth[3],
					align : 'center',
					formatter:formatIt2
				} ] ],
				queryParams : {
					survId : survId
					, itemSeq : itemSeq
				},
				url : pageContext + '/api/ststistics/getStstisticsUSTotalSurveyContent_3_SelectList.do',
				method: 'POST',
				onLoadSuccess: onSuccessDataGrid
			});
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

		$('#SURV_ID').on('change',function(e){
			// 참고로 this.value 가 공백인 값도 받아줘야 한다.
			// if(this.value === '') return ==> 이런 코드는 작성 X
			console.log("survId selected : "+this.value);
			console.log("sending Ajax for Grid Rendering");
			setGrid(this.value);
			
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
			setGrid();
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
	    var mod_surv_id = "${configurationMap.survId}";
	    ${isModify ? 'setModifyConfigure();setGrid(mod_surv_id);' : 'setGrid()'}
	    
	});
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
						<span> 총조사시각화 관리</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS"> ${isModify ? '수정/삭제' : '등록'}</span>
					</p>
				</div>
				<p class="title01">총조사시각화 관리 ${isModify ? '수정/삭제' : '등록'}</p><!--2019-02-19 수정  -->
				<div id="HeaderWrapper" style="overflow: hidden; margin-bottom: 10px;margin-top: 50px">
					<div class="tilte03" style="margin-top:0px">항목 설정</div>
					<c:if test="${isModify}">
						<button id="modifyBtn">수정</button>
					</c:if>
					<button id="searchNmAndExpRankBtn">자료명 및 표출순위 조회</button>
				</div>
				 
				<form id="resetForm">
					<c:if test="${isModify }">
						<input type="hidden" id="ITEM_SEQ" name="ITEM_SEQ" value="${configurationMap.itemSeq}">
					</c:if>
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="15%" />
							<col width="35%" />
							<col width="15%" />
							<col width="35%" />
						</colgroup>
						<tbody>
							<tr>
								<th class="right">통계표명</th>
								<td id="classTd"></td>
								<th class="right">표출명</th>
								<td></td>
							</tr>
							
							<tr>
								<th class="right">툥계표URL</th>
								<td colspan="3">
								</td>
							</tr>
							
							<tr>
								<th class="right">도움말(설명)</th>
								<td colspan="3">
									<textarea rows="7" cols="90" id="EXP" name="EXP"></textarea>
								</td>
							</tr>
							<tr>
								<th class="right">도움말(출처)</th>
								<td>
									<input type="text" class="input_use03 validatebox-text" id="SOURCE" name="SOURCE" style="width: 200px"/>
								</td>
								<th class="right">표출 항목 상세</th>
								<td>
									<!-- <input type="text" class="input_use03 validatebox-text" id="DSIP" name="SOURCE" style="width: 200px"/> -->
									<select class="input_use29 detail_selects" name="DISP_DATA_TYPE" id="DISP_DATA_TYPE">
										<option value="ITM">아이템</option>
										<option value="C1">항목1</option>
										<option value="C2">항목2</option>
										<option value="C3">항목3</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="right">단위</th>
									<td>
										<input type="text" class="input_use03 validatebox-text" id="UNIT" name="UNIT" style="width: 100px;"  />
									</td>
								<th class="right">차트유형</th>
								<td>
									<select class="input_use29 CHART_ID" id="CHART_ID" name="CHART_ID">
										<option value="">선택하세요</option>
										<option value="CH1S01">선택 1 - 막대 그래프(가로)</option>
										<option value="CH1S02">선택 1 - 막대 그래프(세로)</option>
										<option value="CH1S03">선택 1 - 꺽은선 그래프</option>
										<option value="CH1S04">선택 1 - 히스토그램</option>
										<option value="CH1S05">선택 1 - 방사형</option>
										<option value="CH1S06">선택 1 - 파이차트</option>
										<option value="CH1S07">선택 1 - 타일차트</option>
										<option value="CH2S01">선택 2 - 꺽은선 &amp; 막대 그래프</option>
										<option value="CH2S02">선택 2 - 면적 차트</option>
										<option value="CH2S03">선택 2 - 피라미드</option>
										<option value="CH2S04">선택 2 - 꺽은선 그래프</option>
										<option value="CH2S05">선택 2 - 막대(세로)</option>
										<option value="CH2S06">선택 2 - 막대(백분율)</option>
										<option value="CH2S07">선택 2 - 막대(세로 누적)</option>
										<option value="CH2S08">선택 2 - 막대(가로 누적)</option>
										<option value="CH2S09">선택 2 - 방사형</option>
										<option value="CH3S01">선택 3 - 버블차트</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				
				<div id="detailHeaderWrapper" style="overflow: hidden; margin-bottom: 10px;margin-top: 50px">
					<div class="tilte03" style="margin-top: 0;">항목 상세 설정</div>
					<c:if test="${isModify}">
						<button id="detailModifyBtn" style="">수정</button>
					</c:if>
				</div>
				<div class="table-flow" style="position: relative; overflow: hidden; margin-bottom: 50px"> <!-- 테이블들을 가로로 열거하기 위한 것이다. -->
					<div class="table-flow-item" id="table-flow-item-itemList" data-type="ITM" style="float: left; margin-right: 50px">
						<!-- 진짜 혹시나 해서 하는 말이지만 class="easyui-datagrid"를 쓰지 말길 바란다.
							  class="easyui-datagrid" 를 하면 datagrid 라이브러리가 자동으로 테이블을 한 번 만들어낸다.
							  문제는 javascript 소스상에서   $('#??').datagrid({..}); 처럼 호출하면 한 번 더 테이블을  만든다. 
							  즉 쓸데없이 한 번 더 호출되는 것이다. 이러한 현상은 html이 생성중인 화면 초기에만 나타난다.
						-->
						<table id="itemList" class=""  title="아이템 목록" style="width:340px;height:300px;"
		            		data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
		    			</table>
	    			</div>
	    			<div class="table-flow-item" id="table-flow-item-contentList_1" data-type="C1" style="float: left">
						<table id="contentList_1" class="" title="항목 1 목록" style="width:340px;height:300px;"
		            		data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
		    			</table>
	    			</div>
				</div>
				<div class="table-flow" style="position: relative; overflow: hidden;"> <!-- 테이블들을 가로로 열거하기 위한 것이다. -->
					<div class="table-flow-item" id="table-flow-item-contentList_2" data-type="C2" style="float: left; margin-right: 50px">
						<table id="contentList_2" class=""  title="항목 2 목록" style="width:340px;height:300px;"
		            		data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
		    			</table>
	    			</div>
	    			<div class="table-flow-item" id="table-flow-item-contentList_3" data-type="C3" style="float: left">
						<table id="contentList_3" class="" title="항목 3 목록" style="width:340px;height:300px;"
		            		data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
		    			</table>
	    			</div>
				</div>
				
				<div class="btnbox">
						<c:if test="${not isModify }">
							<a id="register" 	class="register" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">
								<label style="cursor: pointer;" for="save">저장</label>
							</a>
						</c:if>
						<c:if test="${isModify}">
							<a id="deleteAllConfigures" 	class="deleteAllConfigures" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">
								<label style="cursor: pointer;" for="delete">삭제</label>
							</a>
						</c:if>
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
					<%-- <form id="popupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">통계거리 아이디</th>
									<td>
										<input data-require="true" type="text" id="statDistanceId" data-edit="false" name="statDistanceId" maxlength="50" class="input_use13"/>
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">서비스 여부</th>
									<td>
										<select class="input_use08" id="useYn" name="useYn" data-require="true">
											<option value="">선택하세요.</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>표출순위</th>
									<td>
										<input data-require="true" type="number" class="input_use13" id="dispRank" name="dispRank" maxlength="2" min="1" step="1" style="width:170px;" />
									</td>
								</tr>
								<tr>
									<th>통계거리 명</th>
									<td>
										<input data-require="true" type="text" id="statDistanceNm" name="statDistanceNm" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th>아이콘</th>
									<td>
										<label for="uploadfile">
											<a  style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 14px;  width: 51px; margin-right: 10px;">업로드</a>
											<input type="file" class="input_use11" id="uploadfile" name="uploadfile" value="파일업로드" onchange="javascript:$s.setFile(this);" style="display: none;"/>
										</label>
										<input type="text" id="tempUrl" name="tempUrl"  class="input_use11" style="margin-left: -10px; margin-top: -2px; width: 434px; height: 21px;"/>
									</td>
								</tr>
								<tr>
									<th>설명</th>
									<td>
										<textarea rows="2" cols="20" class="input_use10"  style="resize: none; width :500px;" id="iconExp" name="iconExp" ></textarea>
									</td>
								</tr>
							</tbody>
						</table>
					</form> --%>
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