<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<script type="text/javascript">
	//2021년 SGIS4 도시화 시작
	$(document).ready(function(){
		ststistics.initialize({search_url : '/api/urban/getIdSetInfoList.do'  , search_button : 'search' , search_box : 'resetForm' });
 		ststistics.grid.create({
			target 	: 'datagrid-view' , 
			header : [
				{column : 'mainUrbarId' ,		type : 'text',	name : '대표도시지역ID'		,	style : {"width" : '150px'}},
				{column : 'mainUrbarNm' ,	 type : 'text' , name : '대표도시지역명' 	, style : {"width" : '340px'}},
				{column : 'useYn' ,		type : 'text',	name : '사용여부'		,	style : {"width" : '100px'}},
				{column : 'mainUrbanManage' ,		type : 'button',	name : '대표도시 관리'		,	style : {"width" : '105px'}, callback : function(obj){
					 $("#scopePopup , .scopePopupWrapper").show();
					 $("#popTitle03").text("대표도시 관리");
					 
					 $.ajax({
						  url: pageContext + '/api/urban/getMainIdDetailCd.do',
						  data: {'mainUrbarId' : obj.mainUrbarId, 'urbarId' : obj.urbarId},
						  method : 'post',
						  success : function(resBody){	
							  $(".popup_tr").remove();
							  $("#popup_tbody_tr_active").remove();
							  var html = "";
							  if(resBody.data.length == 0 || resBody.data.length == 1 && resBody.urbarId == 0){	
								  html += "<tr id = 'popup_tbody_tr_active'>";
								  html += "<td colspan = '7' style='text-align: center; font-size: 15px;'>등록된 도시지역이 존재하지 않습니다.</td>";
								  html += "</tr>";	
								  $("#popup_tbody").append(html);  
								  $('#popup_tbody_tr_active').show();
								  $('.mainUrbarId').val(resBody.mainUrbarId);
								  $('.baseYear').val("");
								  $('.urbarType').val("");
								  $('.urbarId').val("");
								  $('.useYn').val("");
							  }else{
								 for(i = 0; i <resBody.data.length; i++){
									  var data = $.extend(resBody.data[i]);
									  html += "<tr class = 'popup_tr' id = popup_tr" + i + 1 +">"
									  html += "<td id = popup_td_mainUrbarId" + i +1 +">"+ data.mainUrbarId + "</td>"
									  html += "<td id = popup_td_baseYear" + i +1 +">"+ data.baseYear + "</td>"
									  html += "<td id = popup_td_urbarId" + i +1 + ">" + data.urbarId + "</td>"
									  html += "<td id = popup_td_urbarType" + i+ 1 + ">" + data.urbarType + "</td>"
									  html += "<td id = popup_td_useYn" + i+ 1 + ">" + data.useYn + "</td>"
									  html += "<td><button id='select_sido' type = 'button' class='select_sido' style='cursor: pointer; border: 1px solid #d3d6da; background: #fff;  padding: 3px;  color: #777676;  font-size: 11px; '>선택</button></td>"
									  html += "<td><button id='delete_sido' type = 'button' class='delete_sido' style='cursor: pointer;  border: 1px solid #d3d6da; background: #fff;  padding: 3px;  color: #777676;  font-size: 11px;'>삭제</button></td>"
									  html += "</tr>"
								  }
								  $("#popup_tbody").append(html);  
								  var data = $.extend(resBody.data[0]);
								  $('#scopePopupForm').find('select, input').each(function(index, elem){
									  $(this).val(data[this.id]);
								  });
							 }
						  },
						  error : function(){
							  alert("서버와의 통신이 원할하지 않습니다.");
						  }
					});
				}},
				{column : 'remove' 			, type : 'button' 		, name : '삭제' 		, style : {"width" : '37px'}, callback : function(obj){
					console.log(obj);
					if(!confirm("삭제 하시겠습니까?"))return false;
					ststistics.asynchronous({
						url : '/api/urban/removeMainId.do' ,
						data : {'mainUrbarId':obj.mainUrbarId},
						callback : function(resBody){
							if(resBody == 0){
								alert("삭제 하였습니다.");
								setTimeout(function(){
									location.reload();
								},100);
							}
						}
					});
				}}
			
			] ,
			 row_callback : function(rObject){
				if(rObject.cellIndex == 0 || rObject.cellIndex == 1 || rObject.cellIndex == 2){
				var mainUrbarId = ststistics.grid.getSelectRowData().mainUrbarId;
				
				 $.ajax({
					  url: pageContext + '/api/urban/getMainIdDetailData.do',
					  data: {'mainUrbarId' : mainUrbarId},
					  method : 'post',
					  success : function(resBody){
						  console.log(resBody);
						  var data = $.extend(resBody.data[0]);
						  setUrbanPopup('detail');

						  $('#upperPopupForm').find('select, input').each(function(index, elem){
							  $(this).val(data[this.id]);
						  });

					  },
					  error : function(){
						  alert("서버와의 통신이 원할하지 않습니다.");
					  }
				}); 
				}
			}
		});
 		//2021년 SGIS4 도시화 끝
 		//2021년 SGIS4 도시화 시작
 		//대표ID 저장
		$(".upperSave").on("click",function(){
			var inputId = $('input[name=mainUrbarId]').val();
			var inputNm = $('input[name=mainUrbarNm]').val();
			var selectUse = $('select[name=useYn]').val();
			
			if(!confirm("저장 하시겠습니까?"))return false;
			if(isRequired(inputId)){
				return ststistics.message({message :"대표도시 지역ID를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(inputNm)){
				return ststistics.message({message :"대표도시 지역명을 입력 해주세요" , returnValue : false});
			}
			if(isRequired(selectUse)){
				return ststistics.message({message :"사용여부를 입력 해주세요" , returnValue : false});
			}
			
			//수정(활성화 여부체크)
			if(selectUse == 'Y ' && inputId != null && inputId != ""){
						$.ajax({
							  url: pageContext + '/api/urban/updataMainIdList.do',
							  data: $("#upperPopupForm").serialize(),
							  method : 'post',
							  success : function(resBody){
								  alert("저장 하였습니다.");
								  $("#upperPopup , .upperPopupWrapper").hide();
								  location.reload();
							  },
							  error : function(){
								  alert("서버와의 통신이 원할하지 않습니다.");
							  },
						});
			}else{
				$.ajax({
					  url: pageContext + '/api/urban/updataMainIdList.do',
					  data: $("#upperPopupForm").serialize(),
					  method : 'post',
					  success : function(resBody){
						  alert("저장 하였습니다.");
						  $("#upperPopup , .upperPopupWrapper").hide();
						  location.reload();
					  },
					  error : function(){
						  alert("서버와의 통신이 원할하지 않습니다.");
					  }
				});
			}
		});
		//2021년 SGIS4 도시화 끝
		//2021년 SGIS4 도시화 시작
		//시설유형 분류저장
		$(".mainIdSave").on("click",function(){			
			var listId = $('#popup_tr01').children('td:eq(0)').text();
			var listYear = $('#popup_tr01').children('td:eq(1)').text();
			var listUrban = $('#popup_tr01').children('td:eq(2)').text();
			var listType = $('#popup_tr01').children('td:eq(3)').text();
			var listUse = $('#popup_tr01').children('td:eq(4)').text();
			var textId = $('.mainUrbarId').val();
			var textYear = $('.baseYear').val();
			var textUrban = $('.urbarId').val();
			var textType = $('.urbarType').val();
			var textUse = $('.useYn').val();
			
			if(!confirm("저장 하시겠습니까?"))return false;
		 	if(isRequired(textId)){
				return ststistics.message({message :"대표지역ID를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(textYear)){
				return ststistics.message({message :"기준년도를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(urbarId)){
				return ststistics.message({message :"도시지역ID를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(urbarType)){
				return ststistics.message({message :"경계타입을 입력 해주세요" , returnValue : false});
			}
			if(isRequired(textUse)){
				return ststistics.message({message :"사용여부를 입력 해주세요" , returnValue : false});
			}
			
			if(textId != null || textId != "" ){
				ststistics.asynchronous({url : '/api/urban/getMainIdExists.do' ,
										data : {'mainUrbarId': textId} ,
										callback : function(resBody){
					if(resBody.code == 0){
						$.ajax({
							  url: pageContext + '/api/urban/updataMainIdMappingList.do',
							  data: $("#scopePopupForm").serialize(),
							  method : 'post',
							  success : function(resBody){
								  setDetailReloadList()
								  if(textId != listId && textId == null || textId == ""){
										return ststistics.message({message :"존재하지않는 대표도시지역ID입니다." , returnValue : false});
								  }
								  if(listId == textId && listYear == textYear && listUrban == textUrban && listType == textType && listUse == textUse){
										return ststistics.message({message :"리스트에 동일한 조건이 존재합니다." , returnValue : false});
								  }else{
									    alert("저장 하였습니다.");	
								  }
							  },
							  error : function(){
								  alert("error.");
							  }
						});
					}else{
						return ststistics.message({message :"목록에 동일한 조건의 값이 존재합니다." , returnValue : false});
					}
				}});
			}
		});
		//2021년 SGIS4 도시화 끝
		//2021년 SGIS4 도시화 시작
	});//ready end
	// 디테일 데이터 선택해서 text로 변경
	$(document).on('click','#select_sido',function(){
		var mainUrbarId = $(this).closest('tr').children('td:eq(0)').text();
		var baseYear = $(this).closest('tr').children('td:eq(1)').text();
		var urbarId = $(this).closest('tr').children('td:eq(2)').text();
		var urbarType = $(this).closest('tr').children('td:eq(3)').text();
		var useYn = $(this).closest('tr').children('td:eq(4)').text();
		$.ajax({
			  url: pageContext + '/api/urban/getMainIdDataByPk.do',
			  data: {'baseYear' : baseYear,
				  	 'urbarId' : urbarId,
				  	 'urbarType' : urbarType,
				  	 'useYn' : useYn},
			  method : 'post',
			  success : function(resBody){
				  if(baseYear == resBody.baseYear && urbarId == resBody.urbarId && urbarType == resBody.urbarType && useYn == resBody.useYn){
					  $('#mainIdSave').text('수정');
				  }
				  $('.baseYear').val(resBody.baseYear);
				  $('.urbarId').val(resBody.urbarId);
				  $('.urbarType').val(resBody.urbarType);
				  $('.useYn').val(resBody.useYn);
			  },
			  error : function(){
				  alert("서버와의 통신이 원할하지 않습니다.");
			  }
		});
	});
	//2021년 SGIS4 도시화 끝
	//2021년 SGIS4 도시화 시작
	// 맵핑row 삭제
	$(document).on('click','#delete_sido',function(){		
		var mainUrbarId = $(this).closest('tr').children('td:eq(0)').text();
		var baseYear = $(this).closest('tr').children('td:eq(1)').text();
		var urbarId = $(this).closest('tr').children('td:eq(2)').text();
		var urbarType = $(this).closest('tr').children('td:eq(3)').text();
		
		if(!confirm("삭제 하시겠습니까?"))return false;
		ststistics.asynchronous({
			url : '/api/urban/removeMainIdMappingByPk.do' ,
			data : {'mainUrbarId' : mainUrbarId,
					'baseYear' : baseYear,
				  	 'urbarId' : urbarId,
				  	 'urbarType' : urbarType},
			callback : function(resBody){
				if(resBody == 0){
					alert("삭제 하였습니다.");
					setDetailReloadList()
				}
			}
		});
	});
	//2021년 SGIS4 도시화 끝
	//2021년 SGIS4 도시화 시작
	//삭제나 수정후에 리스트 리로딩 
	function setDetailReloadList(){
		var mainUrbarId = $('.mainUrbarId').val();
		$.ajax({
			  url: pageContext + '/api/urban/getMainIdDetailCd.do',
			  data: {'mainUrbarId' : mainUrbarId},
			  method : 'post',
			  success : function(resBody){
				  $(".popup_tr").remove();
				  $("#popup_tbody_tr_active").remove();
				  var html = "";
				  if(resBody.data.length == 0 || resBody.data.length == 1 && resBody.urbarId == 0){	
					  html += "<tr id = 'popup_tbody_tr_active'>";
					  html += "<td colspan = '7' style='text-align: center; font-size: 15px;'>등록된 도시지역이 존재하지 않습니다.</td>";
					  html += "</tr>";	
					  $("#popup_tbody").append(html);  
					  $('#popup_tbody_tr_active').show();
					  $('.mainUrbarId').val(resBody.mainUrbarId);
					  $('.baseYear').val("");
					  $('.urbarType').val("");
					  $('.urbarId').val("");
					  $('.useYn').val("");
				  }else{
					 for(i = 0; i <resBody.data.length; i++){
						  var data = $.extend(resBody.data[i]);
						  html += "<tr class = 'popup_tr' id = popup_tr" + i + 1 +">"
						  html += "<td id = popup_td_mainUrbarId" + i +1 +">"+ data.mainUrbarId + "</td>"
						  html += "<td id = popup_td_baseYear" + i +1 +">"+ data.baseYear + "</td>"
						  html += "<td id = popup_td_urbarId" + i +1 + ">" + data.urbarId + "</td>"
						  html += "<td id = popup_td_urbarType" + i+ 1 + ">" + data.urbarType + "</td>"
						  html += "<td id = popup_td_useYn" + i+ 1 + ">" + data.useYn + "</td>"
						  html += "<td><button id='select_sido' type = 'button' class='select_sido' style='cursor: pointer; border: 1px solid #d3d6da; background: #fff;  padding: 3px;  color: #777676;  font-size: 11px; '>선택</button></td>"
						  html += "<td><button id='delete_sido' type = 'button' class='delete_sido' style='cursor: pointer;  border: 1px solid #d3d6da; background: #fff;  padding: 3px;  color: #777676;  font-size: 11px;'>삭제</button></td>"
						  html += "</tr>"
					  }
					  $("#popup_tbody").append(html);
					  var data = $.extend(resBody.data[0]);
					  $('#scopePopupForm').find('select, input').each(function(index, elem){
						  $(this).val(data[this.id]);
					  });
				 }
				  $("#scopePopup , .scopePopupWrapper").show();
				  $("#popTitle03").text("시도코드 관리");
			  },
			  error : function(){
				  alert("서버와의 통신이 원할하지 않습니다.");
			  }
		});	
	}
	//2021년 SGIS4 도시화 끝
	//2021년 SGIS4 도시화 시작
	//popup창 열때 text 종류와 title 명을 수정
	function setUrbanPopup(type){
		$("#upperPopup , .upperPopupWrapper").show();
		
	if(type == "detail"){
			$('#mainUrbarId').prop('readonly', true);
			$('select[name=dstrctLclasCd]').hide();
			$("#input_tr").show();
			clearForm('upperPopupForm');			
			$("#popTitle02").html("대표도시 상세/수정");
	}else if(type = "new"){
			$('#mainUrbarId').prop('readonly', false);
			clearForm('upperPopupForm');
			$("#popTitle02").html("대표도시 등록");
		} 
	}
	//2021년 SGIS4 도시화 끝
	//2021년 SGIS4 도시화 시작
	//팝업창 내에 정보를 초기화.
	function clearForm(target){
		 $('#'+target).find('select, input').each(function(index, elem){
			  $(this).val('');
		  });
	}
	//2021년 SGIS4 도시화 끝
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
					makeLeftMenu("3", "14", "2");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
				</script>
			</div>
			<!-- cls:left end -->
			<div class="acticle">
				<div class="location">
					<p>
						<a><img src='<c:url value="/html/include/img/ico/ico_home.png"/>' alt="home" /></a>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span>도시화 분석 지도</span>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span>
						<span class="fontS">대표ID 관리</span> 
					</p>
				</div>
				<p class="title01">도시화 분석 대표ID 관리</p>
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer" href="#"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="20%" />
							<col width="30%" />
							<col width="20%" />
							<col width="30%" />
						</colgroup>
						<tbody>
							<tr>
								<th class="right">유형</th>
								<td>
									<select class="input_use08" id="type" name="type">
											<option value="0">전체</option>
											<option value="1">대표도시지역ID</option>
											<option value="2">대표도시지역명</option>
									</select>
								</td>
								<th class="right">검색 명</th>
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text"/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				<div class="searchBtn04">
					<div class="searchBtn04">
						<a  href="javascript:setUrbanPopup('new');" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;">대표도시 등록</label>
						</a>
					</div>
				</div>
			<table class="apiTable03" summary="검색결과"></table>
				<div class="panel datagrid">
					<div class="datagrid-wrap panel-body panel-body-noheader">
						<div class="datagrid-view" style="width: 745px; height: max-content; padding-top:5px;" id="datagrid-view"></div>
						<table id="srvAreaSetInfoList" class=""  title="" data-options="singleSelect:true,collapsible:false,checkOnSelect:false,selectOnCheck:false"> 	</table>
						<div class="datagrid-pager pagination"></div>
						<div class="datagrid-mask" style="display:none;"></div>
						<div class="datagrid-mask-msg" style="display:none; left : 50%; height: 16px; margin-left: -99px; line-height: 16px;">처리중 입니다, 기다리 십시요...</div>
					</div>
				</div>
			</div>
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<div class="upperPopupWrapper" id="upperPopup" style="left: 0;">
			<div class="upperPopupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle02"></div>
						<div class="urbanXbtn"  style="padding-top: 15px; float: right; padding-right: 17px; " >
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<form id="upperPopupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="권역 등록 popup">
							<caption>대분류 등록 popup</caption>
							<tbody>
								<tr id = "input_tr">
									<th class="right" style="width:100px;">대표도시지역ID</th>
									<td>
										<input data-require="true" type="text" id="mainUrbarId" name="mainUrbarId" data-edit="false"class="input_use13" readonly="readonly"/>
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;">도시지역명</th>
									<td>
										<input style="float: left;" data-require="true" type="text" id="mainUrbarNm" name="mainUrbarNm" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th>사용여부</th>
									<td>
										<select class="input_use08" id="useYn" name="useYn">
											<option value="">선택하세요</option>
											<option value="Y ">활성</option>
											<option value="N ">비활성</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="upperSave" class="upperSave save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		<div class="scopePopupWrapper" id="scopePopup" style="left: 0;">
			<div class="scopePopupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle03"></div>
						<div  class="urbanXbtn"  style="padding-top: 15px; float: right; padding-right: 17px; ">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<form id="scopePopupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable">
						<tbody>
								<tr id = "input_tr">
									<th class="right" style="width:100px;">대표도시지역ID</th>
									<td>
										<input data-require="true" type="text" id="mainUrbarId" name="mainUrbarId" data-edit="false"class="input_use13 mainUrbarId" readonly="readonly"  />
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;">기준년도</th>
									<td>
											<select class="input_use08 baseYear" id="baseYear" name="baseYear">
											<option value="">선택하세요</option>
											<option value="2000">2000</option>
											<option value="2005">2005</option>
											<option value="2010">2010</option>
											<option value="2015">2015</option>
											<option value="2016">2016</option>
											<option value="2017">2017</option>
											<option value="2018">2018</option>
											<option value="2019">2019</option>
											<option value="2020">2020</option>
										</select>
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;">도시지역ID</th>
									<td>
										<input style="float: left;" data-require="true" type="text" id="urbarId" name="urbarId" data-edit="false" maxlength="50" class="input_use13 urbarId" />
									</td>
								</tr>
								<tr>
									<th>경계타입</th>
									<td>
										<select class="input_use08 urbarType" id="urbarType" name="urbarType">
											<option value="">선택하세요</option>
											<option value="01">01</option>
											<option value="02">02</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>사용여부</th>
									<td>
										<select class="input_use08 useYn" id="useYn" name="useYn">
											<option value="">선택하세요</option>
											<option value="Y ">활성</option>
											<option value="N ">비활성</option>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="popupTable" id ="popupTable" summary="권역 등록 popup">
							<caption>대분류 등록 popup</caption>
							<thead>
								<tr>
								<th>대표도시지역ID</th>	
								<th style="width: 50px;">기준년도</th>
								<th>도시지역ID</th>
								<th style="width: 50px;">경계타입</th>
								<th style="width: 50px;">사용여부</th>
								<th style="width: 37px;">선택</th>
								<th style="width: 37px;">삭제</th>
								</tr>
							</thead>
							<tbody id ="popup_tbody" style="border:1px solid #cacaca;">
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="mainIdSave" class="mainIdSave save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;"><label style="cursor: pointer;" for="save">저장</label></a>
						<a id="delete_cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>