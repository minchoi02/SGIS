<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@include file="/jsp/include/ststisticsScript.jsp"%>
<link rel="stylesheet"
	href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
<style type="text/css">
#ITEM_B_CLASS_ID, #ITEM_M_CLASS_ID, #ITEM_S_CLASS_ID, #THEMA_LIST,
	#SURV_ID {
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
	border: none;
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
	background: rgba(0, 0, 0, 0.2);
}
</style>
<script>
	var update = {};
	update.beingUpdatedStblList = {};
	update.step = 0;
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
		let isModify = "${requestParam.isModify}";
		// 수정 + 삭제 페이지에서 항목 상세 설정의 datagrid의 onLoadSuccess 에서 사용할 콜백 메소드이다.
		
		
		// 항목 상세 설정의 각 컬럼의 가로 너비입니다.
		//var setWidth = [30,40,140,140,140,40,40,40,40,40,40];
		var setWidth = [40,60,180,60];
		
		
		// 참고 - https://www.jeasyui.com/forum/index.php?topic=4370.msg10502#msg10502
		// 내용 - easyui datagrid 에서 체크박스가 있는 컬럼에서 header 에 이름을 넣고 싶으면 어떡해 하는지를 알려준다.
		function formatItEn(value,row){
			if(isModify == "true") {
				if(row.choiseYn == 'Y') {	// itmCheckbox의 값이 'Y' 면 체크가 된 상태의 체크 박스를 넣어준다.
					return '<input type="checkbox" class="selectCheckBox choiseYn" checked="checkded" onchange="checkedEvent(this,event)" />';
				}
				return '<input type="checkbox" class="selectCheckBox choiseYn"  onchange="checkedEvent(this,event)" />';	
			} else {
				if(row.choiseYn == 'Y') {	// itmCheckbox의 값이 'Y' 면 체크가 된 상태의 체크 박스를 넣어준다.
					return '<input type="checkbox" class="selectCheckBox choiseYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
				}
				return '<input type="checkbox" class="selectCheckBox choiseYn"  onchange="checkedEvent(this,event)" disabled/>';
			}
	    }
		
	 	function formatIt2En(value, row){
	 		if(isModify == "true") {
	 			if(row.subsumYn == "Y") {
		        	return '<input type="checkbox" class="subSumCheckBox subsumYn" checked="checkded" onchange="checkedEvent(this,event)"/>';
		 		}
		 		return '<input type="checkbox" class="subSumCheckBox subsumYn" onchange="checkedEvent(this,event)" />';	
	 		} else {
	 			if(row.subsumYn == "Y") {
		        	return '<input type="checkbox" class="subSumCheckBox subsumYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
		 		}
		 		return '<input type="checkbox" class="subSumCheckBox subsumYn" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	    }
	 	
	 	// 표출이름에 대한 작업
	 	function formatIt3En(value,row) {
	 		return '<input type="text" class="showNm altrtvDispWrd" value="'+(value==undefined?"":value)+'" onchange="inputKeyUpEvent(this,event)" />'
	 	}
	 	
	 	// 표출이름에 대한 작업
	 	function formatIt_ChartNmByArea(value,row) {
	 		return '<input type="text" class="showNm chartNmByArea" value="'+(value==undefined?"":value)+'" onchange="inputKeyUpEvent(this,event)" />'
	 	}
	 	
	 	// 표출이름에 대한 작업
	 	function formatIt_ChartNmByYear(value,row) {
	 		return '<input type="text" class="showNm chartNmByYear" value="'+(value==undefined?"":value)+'" onchange="inputKeyUpEvent(this,event)" />'
	 	}
	 
	 	// 표출이름에 대한 작업
	 	function formatIt_dChartNmByArea(value,row) {
	 		return value;
	 	}
	 	
	 // 표출이름에 대한 작업
	 	function formatIt_dChartNmByYear(value,row) {
	 		return value;
	 	}
	 
	 	// 표출이름에 대한 작업
	 	function formatIt3En(value,row) {
	 		return '<input type="text" class="showNm altrtvDispWrd" value="'+(value==undefined?"":value)+'" onchange="inputKeyUpEvent(this,event)" />'
	 	}
	 
	 	function format_UnActivyYn(value, row){
	 		if(isModify == "true") {
	 			if(row.unactivyYn == "Y") {
		        	return '<input type="checkbox" class="unactivyYnCheckBox unactivyYn" checked="checkded" onchange="checkedEvent(this,event)"/>';
		 		}
		 		return '<input type="checkbox" class="unactivyYnCheckBox unactivyYn" onchange="checkedEvent(this,event)" />';	
	 		} else {
	 			if(row.unactivyYn == "Y") {
		        	return '<input type="checkbox" class="unactivyYnCheckBox unactivyYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
		 		}
		 		return '<input type="checkbox" class="unactivyYnCheckBox unactivyYn" onchange="checkedEvent(this,event)" disabled/>';	
	 		}
	    }
	 	
	 	function format_ClickEventYn(value, row){
	 		if(isModify == "true") {
		 		if(row.clickEventYn == "Y") {
		        	return '<input type="checkbox" class="clickEventYnCheckBox clickEventYn" checked="checkded" onchange="checkedEvent(this,event)"/>';
		 		}
		 		return '<input type="checkbox" class="clickEventYnCheckBox clickEventYn" onchange="checkedEvent(this,event)" />';
	 		} else {
	 			if(row.clickEventYn == "Y") {
		        	return '<input type="checkbox" class="clickEventYnCheckBox clickEventYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
		 		}
		 		return '<input type="checkbox" class="clickEventYnCheckBox clickEventYn" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	    }
	 	
	 	function format_TtipUseYn(value, row){
	 		if(row.ttipUseYn == "Y") {
	        	return '<input type="checkbox" class="ttipUseYnCheckBox ttipUseYn" checked="checkded" onchange="checkedEvent(this,event)"/>';
	 		}
	 		return '<input type="checkbox" class="ttipUseYnCheckBox ttipUseYn" onchange="checkedEvent(this,event)" />';	 		
	    }
	 	
	 	function format_LabelUseYn(value, row){
	 		if(row.labelUseYn == "Y") {
	        	return '<input type="checkbox" class="labelUseYnCheckBox labelUseYn" checked="checkded" onchange="checkedEvent(this,event)"/>';
	 		}
	 		return '<input type="checkbox" class="labelUseYnCheckBox labelUseYn" onchange="checkedEvent(this,event)" />';	 		
	    }
	 	
	 	function format_UseYnByYearChart(value, row){
	 		if(row.labelUseYn == "Y") {
	        	return '<input type="checkbox" class="useYnByYearChartCheckBox useYnByYearChart" checked="checkded" onchange="checkedEvent(this,event)"/>';
	 		}
	 		return '<input type="checkbox" class="useYnByYearChartCheckBox useYnByYearChart" onchange="checkedEvent(this,event)" />';	 		
	    }
	 	
	 	function formatIt(value,row){
			if(row.choiseYn == 'Y') {	// itmCheckbox의 값이 'Y' 면 체크가 된 상태의 체크 박스를 넣어준다.
				return '<input type="checkbox" class="selectCheckBox choiseYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
			}
			return '<input type="checkbox" class="selectCheckBox choiseYn"  onchange="checkedEvent(this,event)" disabled/>';
	    }
		
	 	function formatIt2(value, row){
	 		if(row.subsumYn == "Y") {
	        	return '<input type="checkbox" class="subSumCheckBox subsumYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	 		return '<input type="checkbox" class="subSumCheckBox subsumYn" onchange="checkedEvent(this,event)" disabled/>';	 		
	    }
	 	
	 	// 표출이름에 대한 작업
	 	function formatIt3(value,row) {
	 		return '<input type="text" class="showNm altrtvDispWrd" value="'+(value==undefined?"":value)+'" onchange="inputKeyUpEvent(this,event)" />'
	 	}

	 	function format_dUnActivyYn(value, row){
	 		if(row.unactivyYn == "Y") {
	        	return '<input type="checkbox" class="unactivyYnCheckBox unactivyYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	 		return '<input type="checkbox" class="unactivyYnCheckBox unactivyYn" onchange="checkedEvent(this,event)" disabled/>';	 		
	    }
	 	
	 	function format_dClickEventYn(value, row){
	 		if(row.clickEventYn == "Y") {
	        	return '<input type="checkbox" class="clickEventYnCheckBox clickEventYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	 		return '<input type="checkbox" class="clickEventYnCheckBox clickEventYn" onchange="checkedEvent(this,event)" disabled/>';	 		
	    }
	 	
	 	function format_dTtipUseYn(value, row){
	 		if(row.ttipUseYn == "Y") {
	        	return '<input type="checkbox" class="ttipUseYnCheckBox ttipUseYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	 		return '<input type="checkbox" class="ttipUseYnCheckBox ttipUseYn" onchange="checkedEvent(this,event)" disabled/>';	 		
	    }
	 	
	 	function format_dLabelUseYn(value, row){
	 		if(row.labelUseYn == "Y") {
	        	return '<input type="checkbox" class="labelUseYnCheckBox labelUseYn" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	 		return '<input type="checkbox" class="labelUseYnCheckBox labelUseYn" onchange="checkedEvent(this,event)" disabled/>';	 		
	    }
	 	
	 	function format_dUseYnByYearChart(value, row){
	 		if(row.labelUseYn == "Y") {
	        	return '<input type="checkbox" class="useYnByYearChartCheckBox useYnByYearChart" checked="checkded" onchange="checkedEvent(this,event)" disabled/>';
	 		}
	 		return '<input type="checkbox" class="useYnByYearChartCheckBox useYnByYearChart" onchange="checkedEvent(this,event)" disabled/>';	 		
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
			$.ajax({
				url: pageContext + "/ststistics/getStstisticsUSTotalStblDetailInfo.do" ,
				data: $("#dataForm").serialize(),
				method : 'POST',
				success : function(res){
					let charItm = [], itm1 =[], itm2 = [], itm3 = [];
					let resultList = res.resultList;
					update.resultList = res.resultList;
					for(var i=0; i<resultList.length; i++) {
						if(resultList[i].varOrd == "0") {
							charItm.push(resultList[i]);
						} else if(resultList[i].varOrd == "1") {
							itm1.push(resultList[i]);
						} else if(resultList[i].varOrd == "2") {
							itm2.push(resultList[i]);
						} else if(resultList[i].varOrd == "3") {
							itm3.push(resultList[i]);
						}
					}
					
					charItm.sort(function(a, b) { return a.itmId - b.itmId });
					itm1.sort(function(a, b) { return a.itmId - b.itmId });
					itm2.sort(function(a, b) { return a.itmId - b.itmId });
					itm3.sort(function(a, b) { return a.itmId - b.itmId });
					
					if(isModify) {
						$("#dispVarOrd option[value='" + resultList[0].dispVarOrd + "']").prop("selected", true);
						$("#chartType option[value='" + resultList[0].chartType + "']").prop("selected", true);
						
						$('#itemList').datagrid({
							view: myview,
							emptyMsg: '조회되는 데이터가 없습니다.',
							columns : [ [ {
								field : 'itmCheckbox',
								title : '선택',
								width : setWidth[0],
								align : 'center',
								formatter: formatItEn
							},{
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false,
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false,
								formatter: formatIt3En
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_UseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2En
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_UnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_ClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_TtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_LabelUseYn
							} */ ] ]
						});
						$('#itemList').datagrid("loadData", charItm);

						$('#contentList_1').datagrid({
							view: myview,
							emptyMsg: '조회되는 데이터가 없습니다.',
							columns : [ [ {
								field : 'c1Checkbox',
								title : '선택',
								width : setWidth[0],
								align : 'center',
								formatter: formatItEn
							},{
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false,
								formatter: formatIt3En
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_UseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2En
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_UnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_ClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_TtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_LabelUseYn
							} */ ] ]
						});
						$('#contentList_1').datagrid("loadData", itm1);
						
						$('#contentList_2').datagrid({
							view: myview,
							emptyMsg: '조회되는 데이터가 없습니다.',
							columns : [ [ {
								field : 'c2Checkbox',
								title : '선택',
								width : setWidth[0],
								align : 'center',
								formatter: formatItEn
							},{
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false,
								formatter: formatIt3En
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_UseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2En
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_UnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_ClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_TtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_LabelUseYn
							} */ ] ]
						});
						$('#contentList_2').datagrid("loadData", itm2);
						
						$('#contentList_3').datagrid({
							view: myview,
							emptyMsg: '조회되는 데이터가 없습니다.',
							columns : [ [ {
								field : 'c3Checkbox',
								title : '선택',
								width : setWidth[0],
								align : 'center',
								formatter: formatItEn
							},{
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false,
								formatter: formatIt3En
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_ChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_UseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2En
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_UnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_ClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_TtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_LabelUseYn
							} */ ] ]
						});
						$('#contentList_3').datagrid("loadData", itm3);
					} else {
						$("#dispVarOrd").html($("#dispVarOrdEE option[value='" + resultList[0].dispVarOrd + "']").text());
						$("#chartType").html($("#chartTypeEE option[value='" + resultList[0].chartType + "']").text());
						$('#itemList').datagrid({
							view: myview,
							emptyMsg: '조회되는 데이터가 없습니다.',
							columns : [ [ {
								field : 'itmCheckbox',
								title : '선택',
								width : setWidth[0],
								align : 'center',
								formatter: formatIt
							},{
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false,
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_dUseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_dUnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_dClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_dTtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_dLabelUseYn
							} */ ] ]
						});
						$('#itemList').datagrid("loadData", charItm);

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
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_dUseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_dUnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_dClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_dTtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_dLabelUseYn
							} */ ] ]
						});
						$('#contentList_1').datagrid("loadData", itm1);
						
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
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_dUseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_dUnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_dClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_dTtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_dLabelUseYn
							} */ ] ]
						});
						$('#contentList_2').datagrid("loadData", itm2);
						
						$('#contentList_3').datagrid({
							view: myview,
							emptyMsg: '조회되는 데이터가 없습니다.',
							columns : [ [ {
								field : 'c3Checkbox',
								title : '선택',
								width : setWidth[0],
								align : 'center',
								formatter: formatIt
							},{
								field : 'itmId',
								title : '코드',
								width : setWidth[1],
								align : 'center',
								sortable : false
							}, {
								field : 'altrtvDispWrd',
								title : '표출명',
								width : setWidth[2],
								align : 'center',
								sortable : false
							}/* , {
								field : 'chartNmByArea',
								title : '서브차트(지역)명',
								width : setWidth[3],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByArea
							}, {
								field : 'chartNmByYear',
								title : '서브차트(년도)명',
								width : setWidth[4],
								align : 'center',
								sortable : false,
								formatter: formatIt_dChartNmByYear
							}, {
								field : 'useYnByYearChart',
								title : '연도별차트사용여부',
								width : setWidth[5],
								align : 'center',
								formatter: format_dUseYnByYearChart
							} */, {
								field : 'subsumYn',
								title : '소계',
								width : setWidth[3],
								align : 'center',
								formatter: formatIt2
							}/* , {
								field : 'unactivyYn',
								title : '비활성',
								width : setWidth[7],
								align : 'center',
								formatter: format_dUnActivyYn
							}, {
								field : 'clickEventYn',
								title : '클릭',
								width : setWidth[8],
								align : 'center',
								formatter: format_dClickEventYn
							}, {
								field : 'ttipUseYn',
								title : '툴팁',
								width : setWidth[9],
								align : 'center',
								formatter: format_dTtipUseYn
							}, {
								field : 'labelUseYn',
								title : '라벨',
								width : setWidth[10],
								align : 'center',
								formatter: format_dLabelUseYn
							} */ ] ]
						});
						$('#contentList_3').datagrid("loadData", itm3);	
					}
			    },
			    error : function(){
			    	alert("테마와 관련된 조사 ID를 얻어오지 못했습니다.");
			    	disableOrEnableInputs('depend_on_themaList',true);
					selectElementChangeValue('depend_on_themaList','');
			    }
			});
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
		
		$("a.cancel_1").on("click", function() {
			if(isModify == "true") {
				$("#dataForm").attr("action", pageContext + "/ststistics/ststisticsUSTotalStblDetailInfo.do");
				$("#isModify").val(false);
				$("#dataForm").submit();
			} else {
				location.href = pageContext + "/ststistics/ststisticsUSTotalStblDetailMng.do";
			}
		});
		
		//카테고리는 step1에서 선택하고 들어왔기 때문에 고정
		$("#stattbDiv").on("keydown", function() {
			let orgId = $("#ORG_ID").val(); // 선택된 통계표 조직ID
			let tblId = $("#TBL_ID").val(); // 선택된 통계표 ID
			
			for(var i=0; i<update.beingRegisteredStblList.length; i++) {
				
			}
		});
		
		$("#dispVarOrd, #chartType").on("change", function() {
			let result = $("#itemList").datagrid("getRows");
			if(this.id == "dispVarOrd") {
				result[0].dispVarOrd = $("#dispVarOrd option:selected").val();
			} else if(this.id == "chartType") {
				result[0].chartType = $("#chartType option:selected").val();
			}
		});
			
		//통계표 정보 변경
		$("#kosisUnitNm, #kosisUnit, #dispUnitNm, #dispUnit, #chartSno, #rmndrUseYn").on("keyup", function() {
			let result = $("#itemList").datagrid("getRows");
			if(this.id == "kosisUnitNm") {
				result[0].kosisUnitNm = $("#kosisUnitNm").val();
			} else if(this.id == "kosisUnit") {
				result[0].kosisUnit = $("#kosisUnit").val();
			} else if(this.id == "dispUnitNm") {
				result[0].dispUnitNm = $("#dispUnitNm").val();
			} else if(this.id == "dispUnit") {
				result[0].dispUnit = $("#dispUnit").val();
			} else if(this.id == "dispCo") {
				result[0].dispCo = $("#dispCo").val();
			} else if(this.id == "chartSno") {
				result[0].chartSno = $("#chartSno").val();
			} else if(this.id == "rmndrUseYn") {
				result[0].rmndrUseYn = $("#rmndrUseYn").val();
			}
		});
		
		$("a.delete").on("click", function() {						
			$.ajax({
				url: pageContext + "/ststistics/deleteStstisticsUSTotalStblDetailList.do",
				data: {
					ORG_ID : $("#ORG_ID").val(),
					TBL_ID : $("#TBL_ID").val(),
					CHART_ORD : $("#CHART_ORD").val(),
					TOT_SURV_YN : $("#TOT_SURV_YN").val(),
					DET_YN : $("#DET_YN").val()
				},
				method : 'POST',
				success : function(res){
					if(res.result == "success") {
						alert("삭제되었습니다.");
						location.href = pageContext + "/ststistics/ststisticsUSTotalStblDetailMng.do";	
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
			let dataRows = [];
			dataRows = dataRows.concat($("#itemList").datagrid("getRows"), $("#contentList_1").datagrid("getRows"), $("#contentList_2").datagrid("getRows"), $("#contentList_3").datagrid("getRows"));
			if(dataRows[0].dispVarOrd == undefined) {
				dataRows[0].dispVarOrd = $("#dispVarOrd option:selected").val();
			}
			
			$.ajax({
				url: pageContext + "/api/ststistics/updateStstisticsUSTotalStblDetailList.do",
				data: JSON.stringify(dataRows),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				method : 'POST',
				success : function(res){
					alert("저장이 완료되었습니다.");
					location.href = pageContext + "/ststistics/ststisticsUSTotalStblDetailMng.do";
			    },
			    error : function(){
			    	alert("테마와 관련된 조사 ID를 얻어오지 못했습니다.");
			    	//disableOrEnableInputs('depend_on_themaList',true);
					//selectElementChangeValue('depend_on_themaList','');
			    }
			});
		});
		
		$("a.modify").on("click", function() {
			$("#isModify").val(true);
			$("#dataForm").attr("action", pageContext + "/ststistics/ststisticsUSTotalStblDetailInfo.do");
			$("#dataForm").submit();
		});
		
		$("a.preview").on("click", function() {
			/* $("#previewBox").dialog({
				title: "미리보기",
				modal: false,
				height: "auto",
				width: "auto",
				draggable: true,
				open: function(event, ui) {
					$(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
					$(event.target).dialog('widget')
			            .css({ position: 'fixed' })
			            .position({ my: 'center', at: 'center', of: window });
				},
				buttons: {
					"닫기": function() { $(this).dialog("close"); }
				}
			}); */
			
			getChartData();
			//previewContainer
		});
		
		setGrid();
		
		if("${isModify}" == "true") {
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: pageContext + "/ststistics/selectItmBClass.do",
				dataType: "json",
				success: function(res) {
					let resultList = res.resultList, str = "";
					str += "<option value=''>선택하세요</option>";
					for(var i=0; i<resultList.length; i++) {
						if("${resultList.get(0).totSurvYn}" == "Y") {
							if(resultList[i].SClassCd == "STATS2") {
								str += "<option value='" + res.resultList[i].SClassCd + "' selected>" + res.resultList[i].SClassCdNm + "</option>";	
							} else {
								str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
							}
						} else {
							if(resultList[i].SClassCd == "STATS1") {
								str += "<option value='" + res.resultList[i].SClassCd + "' selected>" + res.resultList[i].SClassCdNm + "</option>";	
							} else {
								str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
							}
						} 
					}
					
					$("#ITEM_B_CLASS_ID").html(str);
				}
			});
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: pageContext + "/ststistics/selectItmMClass.do",
				dataType: "json",
				data: {
					bClassCd: $("#ITEM_B_CLASS_ID option:selected").val()
				},
				success: function(res) {
					let resultList = res.resultList, str = "";
					str += "<option value=''>선택하세요</option>";
					for(var i=0; i<resultList.length; i++) {
						if("${resultList.get(0).detYn}" == "Y") {
							if(resultList[i].SClassCd.indexOf("_D1") != -1) {
								str += "<option value='" + res.resultList[i].SClassCd + "' selected>" + res.resultList[i].SClassCdNm + "</option>";	
							} else {
								str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
							}
						} else {
							if(resultList[i].SClassCd.indexOf("_S1") != -1) {
								str += "<option value='" + res.resultList[i].SClassCd + "' selected>" + res.resultList[i].SClassCdNm + "</option>";	
							} else {
								str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
							}
						} 
					}
					
					$("#ITEM_M_CLASS_ID").html(str);
				}
			});
			
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: pageContext + "/ststistics/selectItmSClass.do",
				data: {
					bClassCd: $("#ITEM_M_CLASS_ID option:selected").val()
				},
				dataType: "json",
				success: function(res) {
					let resultList = res.resultList, str = "";
					str += "<option value=''>선택하세요</option>";
					for(var i=0; i<resultList.length; i++) {
						if(resultList[i].SClassCd == "${resultList.get(0).iem}") {
							str += "<option value='" + res.resultList[i].SClassCd + "' selected>" + res.resultList[i].SClassCdNm + "</option>";	
						} else {
							str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
						}
					}
					
					$("#ITEM_S_CLASS_ID").html(str);
				}
			});
		} else {
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: pageContext + "/ststistics/selectItmSClass.do",
				data: {
					sClassCd: $("#IEM_CL").val()
				},
				dataType: "json",
				success: function(res) {
					if(res.resultList.length > 0) {
						if(res.resultList[0].level == 4) {
							var str = "";
							str += "<option value=''>선택하세요</option>";
							str += "<option value='" + res.resultList[0].SClassCd + "' selected>" + res.resultList[0].SClassCdNm + "</option>";
							$("#ITEM_S_CLASS_ID").html(str);	
						} else if(res.resultList[0].level == 3) {
							var str = "";
							str += "<option value=''>선택하세요</option>";
							str += "<option value='" + res.resultList[0].SClassCd + "' selected>" + res.resultList[0].SClassCdNm + "</option>";
							$("#ITEM_M_CLASS_ID").html(str);
						}
						
						$.ajax({
							method: "POST",
							async: false,	// 반드시 동기처리 해야 함
							url: pageContext + "/ststistics/selectItmSClass.do",
							data: {
								sClassCd: res.resultList[0].BClassCd
							},
							dataType: "json",
							success: function(res) {
								if(res.resultList[0].level == 3) {
									var mStr = "";
									mStr += "<option value=''>선택하세요</option>";
									mStr += "<option value='" + res.resultList[0].SClassCd + "' selected>" + res.resultList[0].SClassCdNm + "</option>";
									$("#ITEM_M_CLASS_ID").html(mStr);	
								} else if(res.resultList[0].level == 2) {
									var bStr = "";
									bStr += "<option value=''>선택하세요</option>";
									bStr += "<option value='" + res.resultList[0].BClassCd + "' selected>" + res.resultList[0].BClassCdNm + "</option>";
									$("#ITEM_B_CLASS_ID").html(bStr);
								}
							},
							error: function(err) {
								
							}
						});
					} else {
						$.ajax({
							method: "POST",
							async: false,	// 반드시 동기처리 해야 함
							url: pageContext + "/ststistics/selectItmSClass.do",
							data: {
								sClassCd: $("#IEM_CL").val()
							},
							dataType: "json",
							success: function(res) {
								if(res.resultList.length > 0) {
									var mStr = "";
									mStr += "<option value=''>선택하세요</option>";
									mStr += "<option value='" + res.resultList[0].SClassCd + "' selected>" + res.resultList[0].SClassCdNm + "</option>";
									$("#ITEM_M_CLASS_ID").html(mStr);
									
									var bStr = "";
									bStr += "<option value=''>선택하세요</option>";
									bStr += "<option value='" + res.resultList[0].BClassCd + "' selected>" + res.resultList[0].BClassCdNm + "</option>";
									$("#ITEM_B_CLASS_ID").html(bStr);	
								}
							},
							error: function(err) {
								
							}
						});
					}
				}
			});	
		}
		
		$("#ITEM_B_CLASS_ID").on("change", function() {
			let bClassId = $("#ITEM_B_CLASS_ID option:selected").val();
			if(bClassId == "") {
				$("#ITEM_M_CLASS_ID option:eq(0)").prop("selected", true);
				$("#ITEM_M_CLASS_ID").prop("disabled", true); return; 
			} else {
				$("#ITEM_M_CLASS_ID").prop("disabled", false);
			}
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: pageContext + "/ststistics/selectItmMClass.do",
				data: {
					bClassCd: bClassId
				},
				dataType: "json",
				success: function(res) {
					var str = "";
					str += "<option value=''>선택하세요</option>";
					for(var i=0; i<res.resultList.length; i++) {
						str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
					}
					
					$("#ITEM_M_CLASS_ID").html(str);
					//$("#ITEM_M_CLASS_ID option:eq(1)").attr("selected", true).trigger("change");
				}
			});
		});
		
		$("#ITEM_M_CLASS_ID").on("change", function() {
			let bClassId = $("#ITEM_M_CLASS_ID option:selected").val();
			if(bClassId == "") { 
				$("#ITEM_S_CLASS_ID option:eq(0)").prop("selected", true);
				$("#ITEM_S_CLASS_ID").prop("disabled", true); return; 
			} else {				
				$("#ITEM_S_CLASS_ID").prop("disabled", false);
			}
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: pageContext + "/ststistics/selectItmSClass.do",
				data: {
					bClassCd: bClassId
				},
				dataType: "json",
				success: function(res) {
					var str = "";
					str += "<option value=''>선택하세요</option>";
					for(var i=0; i<res.resultList.length; i++) {
						str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
					}
					
					$("#ITEM_S_CLASS_ID").html(str);					
					//$("#ITEM_S_CLASS_ID option:eq(1)").attr("selected", true).trigger("change");
				}
			});
		});
	});	
	//ready 끝

	function checkedEvent(_this,_event){
		var rowIdx = $(_this).closest('tr').index();
		var gridId = $(_this).parents(".table-flow-item").attr("id").replace("table-flow-item-","");
		var dispVarOrd = $("#dispVarOrd option:selected").val();
		if($(_this).hasClass("choiseYn")) {
			if(_this.checked) {
				/* if(dispVarOrd == 0) {
					if($("#table-flow-item-contentList_1 input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-contentList_2 input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-contentList_3 input.selectCheckBox.choiseYn:checked").length > 1) {
						alert("표출항목상세를 제외한 아이템이나 항목은 하나를 초과 선택하실 수 없습니다.");
						$(_this).prop("checked", false);
					}
				} else if(dispVarOrd == 1) {
					if($("#table-flow-item-itemList input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-contentList_2 input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-contentList_3 input.selectCheckBox.choiseYn:checked").length > 1) {
						alert("표출항목상세를 제외한 아이템이나 항목은 하나를 초과 선택하실 수 없습니다.");
						$(_this).prop("checked", false);
					}
				} else if(dispVarOrd == 2) {
					if($("#table-flow-item-contentList_1 input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-itemList input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-contentList_3 input.selectCheckBox.choiseYn:checked").length > 1) {
						alert("표출항목상세를 제외한 아이템이나 항목은 하나를 초과 선택하실 수 없습니다.");
						$(_this).prop("checked", false);
					}
				} else if(dispVarOrd == 3) {
					if($("#table-flow-item-contentList_1 input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-contentList_2 input.selectCheckBox.choiseYn:checked").length > 1 
							|| $("#table-flow-item-itemList input.selectCheckBox.choiseYn:checked").length > 1) {
						alert("표출항목상세를 제외한 아이템이나 항목은 하나를 초과 선택하실 수 없습니다.");
						$(_this).prop("checked", false);
					}
				} */
				$("#" + gridId).datagrid("getRows")[rowIdx].choiseYn = "Y";	
			} else {
				$("#" + gridId).datagrid("getRows")[rowIdx].choiseYn = "N";
			}
		} else if($(_this).hasClass("subsumYn")) {			
			if(_this.checked) {
				$("#table-flow-item-" + gridId + " input.subSumCheckBox.subsumYn:checked").prop("checked", false);
				$("#" + gridId).datagrid("getRows").forEach(function(data) { data.subsumYn = "N" });
				$(_this).prop("checked", true);
				$("#" + gridId).datagrid("getRows")[rowIdx].subsumYn = "Y";	
			} else {
				$("#" + gridId).datagrid("getRows")[rowIdx].subsumYn = "N";
			}	
		} else if($(_this).hasClass("unactivyYn")) {			
			if(_this.checked) {
				$("#table-flow-item-" + gridId + " input.unactivyYnCheckBox.unactivyYn:checked").prop("checked", false);
				$("#" + gridId).datagrid("getRows").forEach(function(data) { data.unactivyYn = "N" });
				$(_this).prop("checked", true);
				$("#" + gridId).datagrid("getRows")[rowIdx].unactivyYn = "Y";	
			} else {
				$("#" + gridId).datagrid("getRows")[rowIdx].unactivyYn = "N";
			}	
		} else if($(_this).hasClass("clickEventYn")) {			
			if(_this.checked) {
				$("#table-flow-item-" + gridId + " input.clickEventYnCheckBox.clickEventYn:checked").prop("checked", false);
				$("#" + gridId).datagrid("getRows").forEach(function(data) { data.clickEventYn = "N" });
				$(_this).prop("checked", true);
				$("#" + gridId).datagrid("getRows")[rowIdx].clickEventYn = "Y";	
			} else {
				$("#" + gridId).datagrid("getRows")[rowIdx].clickEventYn = "N";
			}	
		} else if($(_this).hasClass("ttipUseYn")) {			
			if(_this.checked) {
				$("#table-flow-item-" + gridId + " input.ttipUseYnCheckBox.ttipUseYn:checked").prop("checked", false);
				$("#" + gridId).datagrid("getRows").forEach(function(data) { data.ttipUseYn = "N" });
				$(_this).prop("checked", true);
				$("#" + gridId).datagrid("getRows")[rowIdx].ttipUseYn = "Y";	
			} else {
				$("#" + gridId).datagrid("getRows")[rowIdx].ttipUseYn = "N";
			}	
		} else if($(_this).hasClass("labelUseYn")) {			
			if(_this.checked) {
				$("#table-flow-item-" + gridId + " input.labelUseYnCheckBox.labelUseYn:checked").prop("checked", false);
				$("#" + gridId).datagrid("getRows").forEach(function(data) { data.labelUseYn = "N" });
				$(_this).prop("checked", true);
				$("#" + gridId).datagrid("getRows")[rowIdx].labelUseYn = "Y";	
			} else {
				$("#" + gridId).datagrid("getRows")[rowIdx].labelUseYn = "N";
			}	
		} else if($(_this).hasClass("useYnByYearChart")) {			
			if(_this.checked) {
				$("#table-flow-item-" + gridId + " input.useYnByYearChartCheckBox.useYnByYearChart:checked").prop("checked", false);
				$("#" + gridId).datagrid("getRows").forEach(function(data) { data.useYnByYearChart = "N" });
				$(_this).prop("checked", true);
				$("#" + gridId).datagrid("getRows")[rowIdx].useYnByYearChart = "Y";	
			} else {
				$("#" + gridId).datagrid("getRows")[rowIdx].useYnByYearChart = "N";
			}	
		}
	}
	
	function inputKeyUpEvent(_this, _event) {
		var rowIdx = $(_this).closest('tr').index();
		var gridId = $(_this).parents(".table-flow-item").attr("id").replace("table-flow-item-","");
		var dispVarOrd = $("#dispVarOrd option:selected").val();
		if($(_this).hasClass("altrtvDispWrd")) {
			$("#" + gridId).datagrid("getRows")[rowIdx].altrtvDispWrd = $("#table-flow-item-" + gridId + " input.altrtvDispWrd").val();
		} else if($(_this).hasClass("chartNmByArea")) {
			$("#" + gridId).datagrid("getRows")[rowIdx].chartNmByArea = $("#table-flow-item-" + gridId + " input.chartNmByArea").val();
		} else if($(_this).hasClass("chartNmByYear")) {
			$("#" + gridId).datagrid("getRows")[rowIdx].chartNmByYear = $("#table-flow-item-" + gridId + " input.chartNmByYear").val();
		}
	}
		
	function getChartData() {
		let dataRows = [];
		dataRows = dataRows.concat($("#itemList").datagrid("getRows"), $("#contentList_1").datagrid("getRows"), $("#contentList_2").datagrid("getRows"), $("#contentList_3").datagrid("getRows"));
		if(dataRows[0].dispVarOrd == undefined) {
			dataRows[0].dispVarOrd = $("#dispVarOrd option:selected").val();
		}
		
		let charItmList = "", itm1 = "", itm2 = "", itm3 = "";
		for(var i=0; i<dataRows.length; i++) {
			if(dataRows[i].objVarId == "13999001") {
				if(dataRows[i].choiseYn == "Y") {
					let isReady = false;
					for(var j=0; j<charItmList.split(",").length; j++) {
						if(dataRows[i].itmId == charItmList[j]) {
								isReady = true;
								break;
						}
					}
					
					if(!isReady) {
						if(charItmList.length > 0) {
							charItmList += "," + dataRows[i].itmId;
						} else {
							charItmList += dataRows[i].itmId;
						}
					}
				}
			} else {
				if(dataRows[i].varOrd == "1") {
					if(dataRows[i].choiseYn == "Y") {
						if(itm1.length > 0) {
							itm1 += "," + dataRows[i].itmId;
						} else {
							itm1 += dataRows[i].itmId;
						}
					}
				} else if(dataRows[i].varOrd == "2") {
					if(dataRows[i].choiseYn == "Y") {
						if(itm2.length > 0) {
							itm2 += "," + dataRows[i].itmId;
						} else {
							itm2 += dataRows[i].itmId;
						}
					}
				} else if(dataRows[i].varOrd == "3") {
					if(dataRows[i].choiseYn == "Y") {
						if(itm3.length > 0) {
							itm3 += "," + dataRows[i].itmId;
						} else {
							itm3 += dataRows[i].itmId;
						}
					}
				}
			}
		}
		
		/* let admCd = "";
		if($("#contentList_3").datagrid("getRows").length == 0) {
			admCd = "l3:00";
		}
		if($("#contentList_2").datagrid("getRows").length == 0) {
			admCd = "l2:00";
		}
		if($("#contentList_1").datagrid("getRows").length == 0) {
			admCd = "l1:00";
		} */
		
		update.params = {			
			surv_year_list: dataRows[0].stattbYear						// 수록시점
			, org_id_list: dataRows[0].orgId							// 조직번호
			, tbl_id_list: dataRows[0].tblId							// 통계표 ID
			, list_var_ord_list: "" 									// 
			, char_itm_id_list: charItmList								// 표특성항목
			, prt_type: ""												// 출력방식 total:계 else 모두
			, adm_cd: ""												// 지역코드
			, ov_l1_list: itm1											// 항목 1
			, ov_l2_list: itm2											// 항목 2
			, ov_l3_list: itm3											// 항목 3
			, ov_l4_list: ""											// 항목 4
			, ov_l5_list: ""											// 항목 5
			, category: ""												// 카테고리
			, odr_col_list: "DTVAL_CO"									// 정렬기준
			, odr_type: "DESC"											// 내림차순, 오름차순
		}
		update.params["ov_l" + dataRows[0].regionVarOrd + "_list"] = "00";
		
		$.ajax({
			method: "GET",
			async: false,	// 반드시 동기처리 해야 함
			url: proxyURL + "http://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do?",
			//url: pageContext + "/api/proxy.do?" + encodeURIComponent("http://localhost/view/kosisApi/TotsurvStatData.do"),
			data: update.params, // 
			dataType: "json",
			success: function(res) {
				if(res.length == 0) {
					alert("데이터가 존재하지 않습니다.");
					return;
				}
				
				if(typeof res[0] != "object") {
					if(res[0].indexOf("error") != -1) {
						let str = res[0].replace(/[ㄱ-ㅎ|ㅏ-ㅓ|가-힣|a-zA-Z|~!@#\#$%<>^&*:_. ]/g, "");
						alert("항목" + str + "가 선택되지 않았습니다.");
						return;
					}	
				}
				
				if($("#kosisUnit").val() == "" || $("#dispUnit").val() == "") {
					alert("미리보기를 하려면 단위 입력은 필수입니다.");
					return;
				}
				
				if($("#chartType option:selected").val() == "") {
					alert("미리보기를 하려면 차트유형 선택은 필수입니다.");
					return;
				}
				
				$("#previewBox").dialog({
					title: "미리보기",
					modal: false,
					height: "auto",
					width: "auto",
					draggable: true,
					open: function(event, ui) {
						$(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
						$(event.target).dialog('widget')
				            .css({ position: 'fixed' })
				            .position({ my: 'center', at: 'center', of: window });
					},
					buttons: {
						"닫기": function() { $(this).dialog("close"); }
					}
				});
				
				update.chartData = res;
				
				drawChart();
			},
			error: function(e) {
				//$totSurvMain.ui.alert(errorMessage);
			}
		});
	}
	
	function drawChart() {
		let chartType = $("#chartType option:selected").val();
		
		let categories = [], yAxisVal = [], chartData = [], maxVal = 0, stacked = {};
		let dispVarOrd = $("#dispVarOrd option:selected").val();
		update.chartData.sort(function(a, b) { return a["OV_L"+dispVarOrd+"_SN"] - b["OV_L"+dispVarOrd+"_SN"] });
		let totSum = 0;
		let dataRows = [];
		dataRows = dataRows.concat($("#itemList").datagrid("getRows"), $("#contentList_1").datagrid("getRows"), $("#contentList_2").datagrid("getRows"), $("#contentList_3").datagrid("getRows"));
		// 표특성항목 별 데이터 담기
		for(var i=0; i<update.chartData.length; i++) {
			if(stacked[update.chartData[i].CHAR_ITM_ID] != undefined) {
				stacked[update.chartData[i].CHAR_ITM_ID].push(update.chartData[i]);
			} else {
				stacked[update.chartData[i].CHAR_ITM_ID] = [];
				stacked[update.chartData[i].CHAR_ITM_ID].push(update.chartData[i]);
			}
		}
		
		let charItmSumVal = {};
		// 표특성항목 데이로 stacked 쌓기
		for(var i=0; i<Object.keys(stacked).length; i++) {
			for(var j=0; j<stacked[Object.keys(stacked)[i]].length; j++) {
				let isSumYn = false;
				let stackData = stacked[Object.keys(stacked)[i]], category = {};
				for(var k=0; k<dataRows.length; k++) {
					if(dispVarOrd == "0") {
						if(stackData[j].CHAR_ITM_ID == dataRows[k].itmId && dataRows[k].subsumYn == "Y") {
							totSum = parseFloat(stackData[j].DTVAL_CO);
							isSumYn = true;
						}	
					} else {
						if(stackData[j]["OV_L" + dispVarOrd + "_ID"] == dataRows[k].itmId && dataRows[k].subsumYn == "Y") {
							totSum = parseFloat(stackData[j].DTVAL_CO);
							isSumYn = true;
						}	
					}
				}
				if(!isSumYn) {
					if(dispVarOrd == "0") {
						let isReadyCategories = false;
						for(var k=0; k<categories.length; k++) {
							if(categories[k].id == stackData[j].CHAR_ITM_ID) {
								isReadyCategories = true;
								break;
							}
						}
									
						if(!isReadyCategories) {
							category.name = stackData[j].CHAR_ITM_NM;
							category.id = stackData[j].CHAR_ITM_ID;
						}
					} else if(dispVarOrd == "1") {
						let isReadyCategories = false;
						for(var k=0; k<categories.length; k++) {
							if(categories[k].id == stackData[j].OV_L1_ID) {
								isReadyCategories = true;
								break;
							}
						}
									
						if(!isReadyCategories) {
							category.name = stackData[j].OV_L1_KOR;
							category.id = stackData[j].OV_L1_ID;
						}
					} else if(dispVarOrd == "2") {
						let isReadyCategories = false;
						for(var k=0; k<categories.length; k++) {
							if(categories[k].id == stackData[j].OV_L2_ID) {
								isReadyCategories = true;
								break;
							}
						}
									
						if(!isReadyCategories) {
							category.name = stackData[j].OV_L2_KOR;
							category.id = stackData[j].OV_L2_ID;
						}
					} else if(dispVarOrd == "3") {
						let isReadyCategories = false;
						for(var k=0; k<categories.length; k++) {
							if(categories[k].id == stackData[j].OV_L3_ID) {
								isReadyCategories = true;
								break;
							}
						}
									
						if(!isReadyCategories) {
							category.name = stackData[j].OV_L3_KOR;
							category.id = stackData[j].OV_L3_ID;
						}
					}
					
					if(dispVarOrd == "0") {
						if(charItmSumVal[stackData[j].CHAR_ITM_ID] != undefined) {
							charItmSumVal[stackData[j].CHAR_ITM_ID] += parseFloat(stackData[j].DTVAL_CO);
						} else {
							charItmSumVal[stackData[j].CHAR_ITM_ID] = 0;
							charItmSumVal[stackData[j].CHAR_ITM_ID] += parseFloat(stackData[j].DTVAL_CO);
						}	
					} else {						
						if(charItmSumVal[stackData[j]["OV_L" + dispVarOrd + "_ID"]] != undefined) {
							charItmSumVal[stackData[j]["OV_L" + dispVarOrd + "_ID"]] += parseFloat(stackData[j].DTVAL_CO);
						} else {
							charItmSumVal[stackData[j]["OV_L" + dispVarOrd + "_ID"]] = 0;
							charItmSumVal[stackData[j]["OV_L" + dispVarOrd + "_ID"]] += parseFloat(stackData[j].DTVAL_CO);
						}
					}
					
					if(Object.keys(category).length > 0) {
						categories.push(category.name);
						chartData.push({ y: parseFloat(stackData[j].DTVAL_CO), name: category.name });
					}
				}
			}
		}

		for(var i=0; i<Object.keys(charItmSumVal).length; i++) {
			if(maxVal<charItmSumVal[Object.keys(charItmSumVal)[i]]) {
				maxVal = charItmSumVal[Object.keys(charItmSumVal)[i]];
			}
		}
		
		let dispUnit = parseFloat($("#dispUnit").val());
		let kosisUnit = parseFloat($("#kosisUnit").val());
		
		maxVal = Math.round(parseInt(maxVal/(dispUnit/kosisUnit))) + Math.round(parseInt(maxVal/(dispUnit/kosisUnit))) * (maxVal.toString().length/40);
		
		var tool = $("#previewContainer").parent().find(".chartToolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
		
		if(chartType == "CH1S01") {			// 막대 그래프(가로)
			var previewContainer = $('#previewContainer').highcharts({
				chart: {
			        type: 'bar',
			        width: 411,
			        height: 364
			    },
				credits: {
		            enabled: false
		        },
				navigation: {
			        buttonOptions: {
			            enabled: false
			        }
			    },
				legend: {
			        enabled: false
			    },
				title: {
					text: "",
					style: { "display": "none" }
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						borderWidth: 0,
						stacking: 'normal',
						point: {
							events: {
								mouseOver: function() {
							      
								},
								mouseOut: function() {

								}
							}
						}
					}
				},
				tooltip: {
		        	formatter: function () {
						return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
					},
					useHTML: true,
					shared: false,
				    shadow: false,
				    enabled: false,
				},
				xAxis: {
			        categories: categories,
					lineColor: "transparent",
					tickLength: 0,
					labels: {				
						formatter: function() {
							return this.value;
						},
						useHTML: true
					}
			    },
				yAxis: {
					max: maxVal,
			        title: {
						text: null
					},
					stackLabels: {
		                enabled: true,
		                style: {
		                    fontWeight: '100',
		                    color: "#000000",
							fontFamily: 'NanumSquare',
							whiteSpace: 'nowrap',
							textOutline: false
		                },
						formatter: function() {
							return numberFormat(this.total);
						}
		            },
					lineWidth: 1
			    },
				series: [{
					data: chartData,
					pointWidth: 15,
					states: {
						select: {
							color: "#576574"
						}
					}
					//borderRadius: 5
				}]
			});
		} else if(chartType == "CH1S02") { 	// 막대 그래프(세로)
			var previewContainer = $('#previewContainer').highcharts({
				chart: {
			        type: 'column',
			        width: 411,
			        height: 364
			    },
				credits: {
		            enabled: false
		        },
				navigation: {
			        buttonOptions: {
			            enabled: false
			        }
			    },
				legend: {
			        enabled: false
			    },
				title: {
					text: "",
					style: { "display": "none" }
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						borderWidth: 0,
						stacking: 'normal',
						point: {
							events: {
								mouseOver: function() {
							      
								},
								mouseOut: function() {

								}
							}
						}
					}
				},
				tooltip: {
		        	formatter: function () {
						return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
					},
					useHTML: true,
					shared: false,
				    shadow: false,
				    enabled: false,
				},
				xAxis: {
			        categories: categories,
					lineColor: "transparent",
					tickLength: 0,
					labels: {				
						formatter: function() {
							return this.value;
						},
						useHTML: true
					}
			    },
				yAxis: {
					max: maxVal,
			        title: {
						text: null
					},
					stackLabels: {
		                enabled: true,
		                style: {
		                    fontWeight: '100',
		                    color: "#000000",
							fontFamily: 'NanumSquare',
							whiteSpace: 'nowrap',
							textOutline: false
		                },
						formatter: function() {
							return numberFormat(this.total);
						}
		            },
					lineWidth: 1
			    },
				series: [{
					data: chartData,
					pointWidth: 15,
					states: {
						select: {
							color: "#576574"
						}
					}
					//borderRadius: 5
				}]
			});
		} else if(chartType == "CH1S03") {	// 꺽은선 그래프
			var previewContainer = $('#previewContainer').highcharts({
				chart: {
			        type: 'line',
			        width: 411,
			        height: 364
			    },
				credits: {
		            enabled: false
		        },
				navigation: {
			        buttonOptions: {
			            enabled: false
			        }
			    },
				legend: {
			        enabled: false
			    },
				title: {
					text: "",
					style: { "display": "none" }
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						borderWidth: 0,
						stacking: 'normal',
						point: {
							events: {
								mouseOver: function() {
							      
								},
								mouseOut: function() {

								}
							}
						}
					}
				},
				tooltip: {
		        	formatter: function () {
						return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
					},
					useHTML: true,
					shared: false,
				    shadow: false,
				    enabled: false,
				},
				xAxis: {
			        categories: categories,
					lineColor: "transparent",
					tickLength: 0,
					labels: {				
						formatter: function() {
							return this.value;
						},
						useHTML: true
					}
			    },
				yAxis: {
					max: maxVal,
			        title: {
						text: null
					},
					stackLabels: {
		                enabled: true,
		                style: {
		                    fontWeight: '100',
		                    color: "#000000",
							fontFamily: 'NanumSquare',
							whiteSpace: 'nowrap',
							textOutline: false
		                },
						formatter: function() {
							return numberFormat(this.total);
						}
		            },
					lineWidth: 1
			    },
				series: [{
					data: chartData,
					pointWidth: 15,
					states: {
						select: {
							color: "#576574"
						}
					}
					//borderRadius: 5
				}]
			});
		} else if(chartType == "CH1S04") {	// 히스토그램
			
		} else if(chartType == "CH1S05") {	// 방사형
			var previewContainer = $('#previewContainer').highcharts({
				chart: {
					polar: true,
					type: 'column',
			        width: 411,
			        height: 364
			    },
				credits: {
		            enabled: false
		        },
				navigation: {
			        buttonOptions: {
			            enabled: false
			        }
			    },
				legend: {
			        enabled: false
			    },
				title: {
					text: "",
					style: { "display": "none" }
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						borderWidth: 0,
						stacking: 'normal',
						point: {
							events: {
								mouseOver: function() {
							      
								},
								mouseOut: function() {

								}
							}
						}
					}
				},
				tooltip: {
		        	formatter: function () {
						return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
					},
					useHTML: true,
					shared: false,
				    shadow: false,
				    enabled: false,
				},
				xAxis: {
			        categories: categories,
					lineColor: "transparent",
					tickLength: 0,
					labels: {				
						formatter: function() {
							return this.value;
						},
						useHTML: true
					}
			    },
				yAxis: {
					max: maxVal,
			        title: {
						text: null
					},
					stackLabels: {
		                enabled: true,
		                style: {
		                    fontWeight: '100',
		                    color: "#000000",
							fontFamily: 'NanumSquare',
							whiteSpace: 'nowrap',
							textOutline: false
		                },
						formatter: function() {
							return numberFormat(this.total);
						}
		            },
					lineWidth: 1
			    },
				series: [{
					data: chartData,
					pointWidth: 15,
					states: {
						select: {
							color: "#576574"
						}
					}
					//borderRadius: 5
				}]
			});
		} else if(chartType == "CH1S06") {	// 파이차트
			var previewContainer = $('#previewContainer').highcharts({
				chart: {
			        type: 'pie',
			        width: 411,
			        height: 364
			    },
				credits: {
		            enabled: false
		        },
				navigation: {
			        buttonOptions: {
			            enabled: false
			        }
			    },
				legend: {
			        enabled: false
			    },
				title: {
					text: "",
					style: { "display": "none" }
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						borderWidth: 0,
						stacking: 'normal',
						point: {
							events: {
								mouseOver: function() {
							      
								},
								mouseOut: function() {

								}
							}
						}
					}
				},
				tooltip: {
		        	formatter: function () {
						return "<b>" + this.key + ": <br/>" + numberFormat(parseInt(data[this.point.index].DTVAL_CO)) + "(" + $ecnmyDash.ui.dispOptions[1][0].kosisUnitNm + ")</b>" ;
					},
					useHTML: true,
					shared: false,
				    shadow: false,
				    enabled: false,
				},
				xAxis: {
			        categories: categories,
					lineColor: "transparent",
					tickLength: 0,
					labels: {				
						formatter: function() {
							return this.value;
						},
						useHTML: true
					}
			    },
				yAxis: {
					max: maxVal,
			        title: {
						text: null
					},
					stackLabels: {
		                enabled: true,
		                style: {
		                    fontWeight: '100',
		                    color: "#000000",
							fontFamily: 'NanumSquare',
							whiteSpace: 'nowrap',
							textOutline: false
		                },
						formatter: function() {
							return numberFormat(this.total);
						}
		            },
					lineWidth: 1
			    },
				series: [{
					data: chartData,
					pointWidth: 15,
					states: {
						select: {
							color: "#576574"
						}
					}
					//borderRadius: 5
				}]
			});
		} else if(chartType == "CH1S07") {	// 타일차트
			
		} else if(chartType == "CH2S01") {	// 꺽은선 &amp; 막대 그래프
			
		} else if(chartType == "CH2S02") {	// 면적 차트
			
		} else if(chartType == "CH2S03") {	// 피라미드
			
		} else if(chartType == "CH2S04") {	// 꺽은선 그래프
			
		} else if(chartType == "CH2S05") {	// 막대(세로)
			
		} else if(chartType == "CH2S06") {	// 막대(백분율)
			
		} else if(chartType == "CH2S07") {	// 막대(세로 누적)
			
		} else if(chartType == "CH2S08") {	// 막대(가로 누적)
			
		} else if(chartType == "CH2S09") {	// 방사형
			
		} else if(chartType == "CH3S01") {	// 버블차트
			
		}
		
		let xaxisLabels = $("#previewContainer .highcharts-container > div.highcharts-axis-labels span");
		for(var h=0; h<xaxisLabels.length; h++) {
			var isAlready = false;
			for(var i=0; i<update.chartData.length; i++) {
				if($("#dispVarOrd").val() == "0") {
					if($(xaxisLabels[h]).text() == update.chartData[i]["CHAR_ITM_NM"]) {				
						$(xaxisLabels[h]).prop("id", update.chartData[i]["CHAR_ITM_ID"]);
						isAlready = true;
					}
				} else {
					if($(xaxisLabels[h]).text() == update.chartData[i]["OV_L"+$("#dispVarOrd").val()+"_KOR"]) {				
						$(xaxisLabels[h]).prop("id", update.chartData[i]["OV_L"+$("#dispVarOrd").val()+"_ID"]);
						isAlready = true;
					}	
				}
			}
			
			if(!isAlready) {
				for(var j=0; j<dataRows.length; j++) {			
					if($(xaxisLabels[h]).text() == dataRows[j].altrtvDispWrd) {
						$(xaxisLabels[h]).prop("id", dataRows[j].itmId);
						isAlready = true;
					}
				}
			}
			
			if(!isAlready) {
				for(var j=0; j<dataRows.length; j++) {			
					if($(xaxisLabels[h]).text() == dataRows[j].scrKor) {
						$(xaxisLabels[h]).prop("id", dataRows[j].itmId);
					}
				}
			}
		}
		
		$("#previewContainer .highcharts-container > div.highcharts-axis-labels span").on("mousemove", function(evt) {
			var unit = $("#kosisUnitNm").val();
			
			let ctValArr = [], ctCn = "";
			
			for(var j=0; j<stacked[Object.keys(stacked)[0]].length; j++) {
				let isAlready = false;
				if($("#dispVarOrd").val() == "0") {
					if(evt.currentTarget.id == stacked[Object.keys(stacked)[0]][j]["CHAR_ITM_ID"]) {
						ctCn += "<p style='color: #3d4956; padding-bottom: 5px; font-weight: 100;'>" + stacked[Object.keys(stacked)[0]][j].PRD_DE + "년 " + 
						$("#chartNm").val() + "</p>";
						ctCn += "<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956; font-weight: 100;'> (";
						for(var k=0; k<dataRows.length; k++) {
							if(stacked[Object.keys(stacked)[0]][j]["CHAR_ITM_ID"] == dataRows[k].itmId) {
								ctCn += dataRows[k].altrtvDispWrd;
								isAlready = true;
							}
						}
						
						if(!isAlready) {
							ctCn += stacked[Object.keys(stacked)[0]][j]["CHAR_ITM_NM"];
						}
						ctCn += ")</p>";
						break;
					}
				} else {
					if(evt.currentTarget.id == stacked[Object.keys(stacked)[0]][j]["OV_L" + $("#dispVarOrd").val() + "_ID"]) {
						ctCn += "<p style='color: #3d4956; padding-bottom: 5px; font-weight: 100;'>" + stacked[Object.keys(stacked)[0]][j].PRD_DE + "년 " + 
						$("#chartNm").val() + "</p>";
						ctCn += "<p style='padding-bottom: 7px; border-bottom: 1px solid #ddd; color: #3d4956; font-weight: 100;'> (";
						if($("#dispVarOrd").val() == "0") {
							for(var k=0; k<dataRows.length; k++) {
								if(stacked[Object.keys(stacked)[0]][j]["OV_L" + $("#dispVarOrd").val() + "_ID"] == dataRows[k].itmId) {
									ctCn += dataRows[k].altrtvDispWrd;
									isAlready = true;
								}
							}
							
							if(!isAlready) {
								ctCn += stacked[Object.keys(stacked)[0]][j]["OV_L" + $("#dispVarOrd").val() + "_KOR"];
							}
							break;
						} else {
							for(var k=0; k<dataRows.length; k++) {
								if(stacked[Object.keys(stacked)[0]][j]["OV_L" + $("#dispVarOrd").val() + "_ID"] == dataRows[k].itmId) {
									ctCn += dataRows[k].altrtvDispWrd;
									isAlready = true;
								}
							}
							
							if(!isAlready) {
								ctCn += stacked[Object.keys(stacked)[0]][j]["OV_L" + $("#dispVarOrd").val() + "_KOR"];
							}
							break;	
						}
						ctCn += ")</p>";
					}	
				}
			}
			
			for(var i=0; i<Object.keys(stacked).length; i++) {
				for(var j=0; j<stacked[Object.keys(stacked)[i]].length; j++) {
					let ctValObj = {};
					if($("#dispVarOrd").val() == "0") {
						if(evt.currentTarget.id == stacked[Object.keys(stacked)[i]][j]["CHAR_ITM_ID"]) {
							for(var k=0; k<dataRows.length; k++) {
								if(stacked[Object.keys(stacked)[i]][j]["CHAR_ITM_ID"] == dataRows[k].itmId) {
									ctValObj = {
										"charItmNm": stacked[Object.keys(stacked)[i]][j].CHAR_ITM_NM,
										"dtval": (stacked[Object.keys(stacked)[i]][j].DTVAL_CO != undefined && stacked[Object.keys(stacked)[i]][j].DTVAL_CO != 0) 
												? stacked[Object.keys(stacked)[i]][j].DTVAL_CO : "-",
										"index": k+1
									} ;
									ctValArr.push(ctValObj);
								}
							}
						}
					} else {
						if(evt.currentTarget.id == stacked[Object.keys(stacked)[i]][j]["OV_L" + $ecnmyDash.ui.dispOptions[2][0].dispVarOrd + "_ID"]) {
							for(var k=0; k<dataRows.length; k++) {
								if(stacked[Object.keys(stacked)[i]][j]["OV_L" + $("#dispVarOrd").val() + "_ID"] == dataRows[k].itmId) {
									ctValObj = {
										"charItmNm": stacked[Object.keys(stacked)[i]][j].CHAR_ITM_NM,
										"dtval": (stacked[Object.keys(stacked)[i]][j].DTVAL_CO != undefined && stacked[Object.keys(stacked)[i]][j].DTVAL_CO != 0) 
												? stacked[Object.keys(stacked)[i]][j].DTVAL_CO : "-",
										"index": k+1
									} ;
									ctValArr.push(ctValObj);
								}
							}
						}	
					}
				}
			}
			
			ctValArr.push({
				"charItmNm": "합계",
				"dtval": totSum,
				"index": 0
			});
			
			ctValArr.sort(function(a, b) { return a.index - b.index });
			
			for(var j=0; j<ctValArr.length; j++) {
				ctCn += "<span style='font-weight:700;'>" + ctValArr[j].charItmNm + "</span> " 
					+ "<span style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;white-space:nowrap;'>" +
					numberFormat(ctValArr[j].dtval) + "</span><span style='font-weight:700;'>" + unit + "</span>";
				if(j<ctValArr.length-1) {
					ctCn += "<br/>";
				}
			}
			
			tool.css("left", evt.clientX - parseFloat($("div.ui-dialog").css("left")));
	        tool.css("top", evt.clientY - parseFloat($("div.ui-dialog").css("top")) - 20);
			
			tool.html(ctCn);
			tool.css("display", "inline-block");
		});
		
		$("#previewContainer .highcharts-container > div.highcharts-axis-labels span").on("mouseout", function(evt) {
			tool.css("display", "none");
		});		
	}
	
	var change;
	var original;
	</script>
</head>

<body>
	<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp"%>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper"
				style="width: 200px; box-sizing: border-box">
				<!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					makeLeftMenu("3", "12", "1");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
				</script>
			</div>
			<!-- cls:left end -->
			<div class="acticle">
				<div class="location">
					<p>
						<a><img
							src='<c:url value="/html/include/img/ico/ico_home.png"/>'
							alt="home" /></a> <span><img
							src='<c:url value="/html/include/img/ico/ico_navi.png"/>'
							alt="다음" /></span> <span>서비스 관리</span> <span><img
							src='<c:url value="/html/include/img/ico/ico_navi.png"/>'
							alt="다음" /></span> <span> 총조사시각화</span>
						<!--2019-02-19 수정  -->
						<span><img
							src='<c:url value="/html/include/img/ico/ico_navi.png"/>'
							alt="다음" /></span> <span> 총조사시각화 통계표</span>
						<!--2019-02-19 수정  -->
						<span><img
							src='<c:url value="/html/include/img/ico/ico_navi.png"/>'
							alt="다음" /></span> <span class="fontS">상세</span>
					</p>
				</div>
				<p class="title01">총조사시각화 통계표 상세</p>
				<!--2019-02-19 수정  -->
				<div id="HeaderWrapper"
					style="overflow: hidden; margin-bottom: 10px; margin-top: 0px">
					<%-- <div class="tilte03" style="margin-top:0px">항목 설정</div>
					<c:if test="${isModify}">
						<button id="modifyBtn">수정</button>
					</c:if>
					<button id="searchNmAndExpRankBtn">자료명 및 표출순위 조회</button> --%>
				</div>

				<form id="dataForm" method="POST">
					<input type="hidden" id="isModify" name="isModify"
						value="${isModify}" /> <input type="hidden" id="ORG_ID"
						name="ORG_ID" value="${requestParam.ORG_ID}" /> <input
						type="hidden" id="TBL_ID" name="TBL_ID"
						value="${requestParam.TBL_ID}" /> <input type="hidden"
						id="CHART_ORD" name="CHART_ORD" value="${requestParam.CHART_ORD}" />
					<input type="hidden" id="TOT_SURV_YN" name="TOT_SURV_YN"
						value="${requestParam.TOT_SURV_YN}" /> <input type="hidden"
						id="DET_YN" name="DET_YN" value="${requestParam.DET_YN}" />
				</form>

				<div>
					<div class="regProc step3" style="display: block">
						<div class="stblInfoBox">
							<div class="stblDetailInfo">
								<table class="stblTable" summary="조회조건">
									<colgroup>
										<col width="15%" />
										<col width="35%" />
										<col width="15%" />
										<col width="35%" />
									</colgroup>
									<tbody>
										<tr>
											<th class="right">항목분류</th>
											<td colspan="3"><c:choose>
													<c:when test="${requestParam.isModify}">
														<select class="input_use29" id="ITEM_B_CLASS_ID"
															name="ITEM_B_CLASS_ID">
															<option value="">선택하세요</option>
														</select>
														<select class="input_use29 depend_on_b_class"
															id="ITEM_M_CLASS_ID" name="ITEM_M_CLASS_ID">
															<option value="">선택하세요</option>
														</select>
														<select class="input_use29 depend_on_b_class"
															id="ITEM_S_CLASS_ID" name="ITEM_S_CLASS_ID">
															<option value="">선택하세요</option>
														</select>
													</c:when>
													<c:otherwise>
														<select class="input_use29" id="ITEM_B_CLASS_ID"
															name="ITEM_B_CLASS_ID" disabled="disabled">
															<option value="">선택하세요</option>
														</select>
														<select class="input_use29 depend_on_b_class"
															id="ITEM_M_CLASS_ID" name="ITEM_M_CLASS_ID"
															disabled="disabled">
															<option value="">선택하세요</option>
														</select>
														<select class="input_use29 depend_on_b_class"
															id="ITEM_S_CLASS_ID" name="ITEM_S_CLASS_ID"
															disabled="disabled">
															<option value="">선택하세요</option>
														</select>
													</c:otherwise>
												</c:choose> <input type="hidden" id="IEM_CL" name="IEM_CL"
												value="${resultList.get(0).iemCl}" /></td>
										</tr>
										<tr>
											<th class="right">통계표명</th>
											<td colspan="3">${resultList.get(0).tblNm}</td>
										</tr>
										<tr class="step1">
											<th class="right">카테고리</th>
											<td colspan="3">${resultList.get(0).stattbDiv}</td>
										</tr>
										<tr class="step1">
											<th class="right">분야</th>
											<td colspan="3">${resultList.get(0).pathNm}</td>
										</tr>
										<tr class="step3">
											<th class="right">툥계표URL</th>
											<td colspan="3">${resultList.get(0).stattbUrl}</td>
										</tr>
										<tr class="step2">
											<th class="right">도움말(출처)</th>
											<td colspan="3">${resultList.get(0).stattbSourc}</td>
										</tr>
										<tr class="step2">
											<th class="right">차트명</th>
											<td colspan="3"><c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text" id="chartNm"
															name="chartNm" style="width: 100%;"
															value="${resultList.get(0).chartNm}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).chartNm}
													</c:otherwise>
												</c:choose></td>
										</tr>
										<%-- <tr>
											<th class="right">주석</th>
											<td>
												${resultList.get(0).chartCm}
											</td>
											<th class="right">나머지표출여부</th>
											<td>
												${resultList.get(0).rmndrUseYn}
											</td>
										</tr> --%>
										<tr>
											<th class="right">차트순번</th>
											<td>${resultList.get(0).chartOrd}</td>
											<th class="right">표출개수제한</th>
											<td><c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text" id="dispCo"
															name="dispCo"
															style="width: 100%; text-alingn: right !important;"
															value="${resultList.get(0).dispCo}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).dispCo}
													</c:otherwise>
												</c:choose></td>
										</tr>
										<tr class="step3">
											<th class="right">통계표출항목</th>
											<td>${resultList.get(0).objNm}</td>
											<th class="right">통계지역</th>
											<td>${resultList.get(0).regionBegin} <span class="flow">~</span>
												${resultList.get(0).regionEnd}
											</td>
										</tr>
										<tr>
											<th class="right">지역표출레벨</th>
											<td>${resultList.get(0).regionVarOrd}</td>
											<th class="right">수록시점</th>
											<td>${resultList.get(0).stattbYear}</td>
										</tr>
										<tr class="step3">
											<th class="right">정렬순서</th>
											<td>${resultList.get(0).stattbOrder}</td>
											<th class="right">수록기간</th>
											<td>${resultList.get(0).stattbBeginYear} <span
												class="flow">~</span> ${resultList.get(0).stattbEndYear}
											</td>
										</tr>
										<tr class="step3">
											<th class="right">KOSIS단위명</th>
											<td><c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text"
															id="kosisUnitNm" name="kosisUnitNm" style="width: 100%;"
															value="${resultList.get(0).kosisUnitNm}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).kosisUnitNm}
													</c:otherwise>
												</c:choose></td>
											<th class="right">KOSIS단위</th>
											<td><c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text"
															id="kosisUnit" name="kosisUnit" style="width: 100%;"
															value="${resultList.get(0).kosisUnit}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).kosisUnit}
													</c:otherwise>
												</c:choose></td>
										</tr>
										<tr class="step3">
											<th class="right">표출단위명</th>
											<td><c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text"
															id="dispUnitNm" name="dispUnitNm" style="width: 100%;"
															value="${resultList.get(0).dispUnitNm}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).dispUnitNm}
													</c:otherwise>
												</c:choose></td>
											<th class="right">표출단위</th>
											<td><c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text" id="dispUnit"
															name="dispUnit" style="width: 100%;"
															value="${resultList.get(0).dispUnit}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).dispUnit}
													</c:otherwise>
												</c:choose></td>
										</tr>
										<tr class="step3">
											<th class="right">표출항목상세</th>
											<td><c:choose>
													<c:when test="${requestParam.isModify}">
														<select class="input_use29" name="dispVarOrd"
															id="dispVarOrd">
															<option value="0">아이템</option>
															<option value="1">항목1</option>
															<option value="2">항목2</option>
															<option value="3">항목3</option>
														</select>
													</c:when>
													<c:otherwise>
														<span id="dispVarOrd">
															<c:choose>
																<c:when test="${resultList.get(0).dispVarOrd == 0}">
																	아이템
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 1}">
																	항목1
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 2}">
																	항목2
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 3}">
																	항목3
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 4}">
																	항목4
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 5}">
																	항목5
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 6}">
																	항목6
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 7}">
																	항목7
																</c:when>
																<c:when test="${resultList.get(0).dispVarOrd == 8}">
																	항목8
																</c:when>
															</c:choose>
														</span>
													</c:otherwise>
												</c:choose></td>
											<th class="right">차트유형</th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<select class="input_use29" id="chartType"
															name="chartType">
															<option value="">선택하세요</option>
															<option value="CH1S01">선택 1 - 막대 그래프(가로)</option>
															<option value="CH1S02">선택 1 - 막대 그래프(세로)</option>
															<option value="CH1S03">선택 1 - 꺽은선 그래프</option>
															<!-- <option value="CH1S04">선택 1 - 히스토그램</option>
															<option value="CH1S05">선택 1 - 방사형</option> -->
															<option value="CH1S06">선택 1 - 파이차트</option>
															<!-- <option value="CH1S07">선택 1 - 타일차트</option>
															<option value="CH2S01">선택 2 - 꺽은선 &amp; 막대 그래프</option>
															<option value="CH2S02">선택 2 - 면적 차트</option>
															<option value="CH2S03">선택 2 - 피라미드</option>
															<option value="CH2S04">선택 2 - 꺽은선 그래프</option>
															<option value="CH2S05">선택 2 - 막대(세로)</option>
															<option value="CH2S06">선택 2 - 막대(백분율)</option>
															<option value="CH2S07">선택 2 - 막대(세로 누적)</option>
															<option value="CH2S08">선택 2 - 막대(가로 누적)</option>
															<option value="CH2S09">선택 2 - 방사형</option>
															<option value="CH3S01">선택 3 - 버블차트</option> -->
														</select>
													</c:when>
													<c:otherwise>
														<span id="chartType">
														<c:choose>
															<c:when test="${resultList.get(0).chartType == 'CH1S01'}">
																막대 그래프(가로)
															</c:when>
															<c:when test="${resultList.get(0).chartType == 'CH1S02'}">
																막대 그래프(세로)
															</c:when>
															<c:when test="${resultList.get(0).chartType == 'CH1S03'}">
																꺽은선 그래프
															</c:when>
															<c:when test="${resultList.get(0).chartType == 'CH1S06'}">
																파이차트
															</c:when>
														</c:choose>
														</span>
													</c:otherwise>
												</c:choose>
											</td>
										</tr>
										<%-- <tr class="step3">
											<th class="right">화면표출번호</th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text" id="chartSno" name="chartSno" style="width:100%;" value="${resultList.get(0).chartSno}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).chartSno}
													</c:otherwise>
												</c:choose>
											</td>
											<th class="right">소수점자리수</th>
											<td>
												<c:choose>
													<c:when test="${requestParam.isModify}">
														<input type="text" class=" validatebox-text" id="rmndrUseYn" name="rmndrUseYn" style="width:100%;" value="${resultList.get(0).rmndrUseYn}" />
													</c:when>
													<c:otherwise>
														${resultList.get(0).rmndrUseYn}
													</c:otherwise>
												</c:choose>
											</td>
										</tr> --%>
									</tbody>
								</table>
							</div>
						</div>
					</div>

					<div class="table-flow"
						style="position: relative; overflow: hidden; margin-bottom: 50px; width: 100%">
						<!-- 테이블들을 가로로 열거하기 위한 것이다. -->
						<div class="table-flow-item" id="table-flow-item-itemList"
							data-type="ITM" style="float: left; margin-right: 50px;">
							<!-- 진짜 혹시나 해서 하는 말이지만 class="easyui-datagrid"를 쓰지 말길 바란다.
								  class="easyui-datagrid" 를 하면 datagrid 라이브러리가 자동으로 테이블을 한 번 만들어낸다.
								  문제는 javascript 소스상에서   $('#??').datagrid({..}); 처럼 호출하면 한 번 더 테이블을  만든다. 
								  즉 쓸데없이 한 번 더 호출되는 것이다. 이러한 현상은 html이 생성중인 화면 초기에만 나타난다.
							-->
							<table id="itemList" class="" title="아이템 목록"
								style="width: 340px; max-height: 300px;"
								data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
							</table>
						</div>
						<div class="table-flow-item" id="table-flow-item-contentList_1"
							data-type="C1" style="float: left;"">
							<table id="contentList_1" class="" title="항목 1 목록"
								style="width: 340px; max-height: 300px;"
								data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
							</table>
						</div>
						<div class="table-flow-item" id="table-flow-item-contentList_2"
							data-type="C2" style="float: left; margin-right: 50px;">
							<table id="contentList_2" class="" title="항목 2 목록"
								style="width: 340px; max-height: 300px;"
								data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
							</table>
						</div>
						<div class="table-flow-item" id="table-flow-item-contentList_3"
							data-type="C3" style="float: left;">
							<table id="contentList_3" class="" title="항목 3 목록"
								style="width: 340px; height: max-300px;"
								data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
							</table>
						</div>
					</div>
				</div>
				<div class="btnbox">
					<a id="cancel_1" class="cancel_1"> <label
						style="cursor: pointer;" for="cancel">취소</label>
					</a>
					<c:choose>
						<c:when test="${requestParam.isModify}">
							<a id="update" class="update"> <label
								style="cursor: pointer;" for="update">저장</label>
							</a>
							<a id="preview" class="preview"> <label
								style="cursor: pointer;" for="preview">미리보기</label>
							</a>
						</c:when>
						<c:otherwise>
							<a id="delete" class="delete"> <label
								style="cursor: pointer;" for="delete">삭제</label>
							</a>
							<a id="modify" class="modify"> <label
								style="cursor: pointer;" for="modify">수정</label>
							</a>
						</c:otherwise>
					</c:choose>
				</div>
			</div>
			<!-- end of article -->
			<div style="display: none;">
				<select class="input_use29" name="dispVarOrdEE" id="dispVarOrdEE">
					<option value="0">아이템</option>
					<option value="1">항목1</option>
					<option value="2">항목2</option>
					<option value="3">항목3</option>
				</select> <select class="input_use29" id="chartTypeEE" name="chartTypeEE">
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
			</div>
		</div>
		<div id="previewBox">
			<div id="previewContainer" style="width: 411px; height: 400px;">
			</div>
			<div class="chartToolTip"></div>
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
							<a style="cursor: pointer"> <img
								src='<c:url value="/html/include/img/btn/btn_popupX.png"/>'
								alt="종료" />
							</a>
						</div>
					</div>
					<div>
						<div id="searchNmAndExpRankTable_Wrapper">
							<table id="searchNmAndExpRankTable"
								style="width: 340px; height: 300px;"></table>
						</div>
					</div>
					<div class="btnbox">
						<a id="cancel" class="cancel"
							style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px; width: 51px; line-height: 25px;">
							<label style="cursor: pointer;" for="cancel">나가기</label>
						</a>
					</div>
				</div>
			</div>
		</div>
		<%@include file="/jsp/include/ststisticsEtal.jsp"%>
	</div>
</body>
</html>