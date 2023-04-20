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
		ststistics.initialize({search_url : '/api/urban/getUrbanSetInfoList.do'  , search_button : 'search' , search_box : 'resetForm' });
		ststistics.grid.create({
			target 	: 'datagrid-view' , 
			header : [
				{column : 'lclasCd' ,		type : 'text',	name : '권역 코드'		,	style : {"width" : '130px'}},
				{column : 'lclasNm' ,	 type : 'text' , name : '권역 명' 	, style : {"width" : '250px'}},
				{column : 'srvYn' ,	type : 'text',	name : '서비스여부'		,	style : {"width" : '110px'}},//2020년 SGIS고도화 3차 수정(명칭변경)
				{column : 'useYn' ,		type : 'text',	name : '사용여부'		,	style : {"width" : '110px'}},
				{column : 'sidoCd' ,		type : 'button',	name : '시도코드 관리'		,	style : {"width" : '100px'}, callback : function(obj){
					$.ajax({
						  url: pageContext + '/api/urban/getDstClasCd.do',
						  data: {'dstrctLclasCd' : obj.lclasCd, 'sidoCd' : obj.sidoCd},
						  method : 'post',
						  success : function(resBody){							
							  $(".popup_tr").remove();
							  $("#popup_tbody_tr_active").remove();
							  var html = "";
							  if(resBody.data.length == 1 && resBody.sidoCd == 0){
								  html += "<tr id = 'popup_tbody_tr_active'>";
								  html += "<td colspan = '7' style='text-align: center; font-size: 15px;'>등록된 시도코드가 존재하지 않습니다.</td>";
								  html += "</tr>";
								  $("#popup_tbody").append(html); 
								  $('.useYn').val("0");
								  $('.sidoCd').val("");
							  }else if(resBody.data[0].sidoCd != 0 || resBody.data[0].sidoCd != undefined ){
								 for(i = 0; i <resBody.data.length; i++){
									  var data = $.extend(resBody.data[i]);
									  html += "<tr class = 'popup_tr' id = popup_tr" + i + 1 +">"
									  html += "<td id = popup_td_cd" + i +1 +">"+ data.dstrctLclasCd + "</td>"
									  html += "<td id = popup_td_sidoCd" + i +1 + ">" + data.sidoCd + "</td>"
									  html += "<td id = popup_td_use" + i+ 1 + ">" + data.useYn + "</td>"
									  html += "<td><button id='select_sido' type = 'button' class='select_sido' style='cursor: pointer; border: 1px solid #d3d6da; background: #fff;  padding: 3px;  color: #777676;  font-size: 11px; '>선택</button></td>"
									  html += "<td><button id='delete_sido' type = 'button' class='delete_sido' style='cursor: pointer;  border: 1px solid #d3d6da; background: #fff;  padding: 3px;  color: #777676;  font-size: 11px;'>삭제</button></td>"
									  html += "</tr>"
								  }
								  $("#popup_tbody").append(html);  
							 }
							  $("#scopePopup , .scopePopupWrapper").show();
							  $("#popTitle03").text("시도코드 관리");
							  var data = $.extend(resBody.data[0]);
							  $('#scopePopupForm').find('select, input').each(function(index, elem){
								  $(this).val(data[this.id]);
							  });
						  },
						  error : function(){
							  alert("서버와의 통신이 원할하지 않습니다.");
						  }
					});	
				}},
				{column : 'remove' 			, type : 'button' 		, name : '삭제' 		, style : {"width" : '37px'}, callback : function(obj){
					if(!confirm("삭제 하시겠습니까?"))return false;
					ststistics.asynchronous({
						url : '/api/urban/removeUrban.do' ,
						data : {'dstrctLclasCd':obj.lclasCd},
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
				var dstrctLclasCd = ststistics.grid.getSelectRowData().lclasCd;
				if(rObject.cellIndex == 0 || rObject.cellIndex == 1 || rObject.cellIndex == 2 || rObject.cellIndex == 3){
					$.ajax({
						  url: pageContext + '/api/urban/getUrbanDetailData.do',
						  data: {'dstrctLclasCd' : dstrctLclasCd},
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
						  },
					});
				}				
			}
		});
		//2021년 SGIS4 도시화 끝
		//2021년 SGIS4 도시화 시작
		//권역 저장
		$(".upperSave").on("click",function(){
			var selectCd = $('select[name=dstrctLclasCd]').val();
			var inputCd = $('input[name=dstrctLclasCd]').val();
			var inputNm = $('input[name=dstrctLclasNm]').val();
			var inputOrderNo = $('input[name=orderNo]').val();
			var selectUse = $('select[name=useYn]').val();
			var selectSrv = $('select[name=srvYn]').val();
			
			if(!confirm("저장 하시겠습니까?"))return false;
			if(selectCd == "" && inputCd == ""){
				return ststistics.message({message :"권역코드를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(inputNm)){
				return ststistics.message({message :"권역명을 입력 해주세요" , returnValue : false});
			}
			if(isRequired(selectUse)){
				return ststistics.message({message :"사용여부를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(selectSrv)){
				return ststistics.message({message :"서비스여부를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(inputOrderNo)){
				return ststistics.message({message :"우선순위를 입력 해주세요" , returnValue : false});
			}
			
			//수정(활성화 여부체크)
			if(selectSrv == 'Y' && selectCd != null && selectCd != ""){
				ststistics.asynchronous({url : '/api/urban/checkServiceYn.do' ,
										data : {'dstrctLclasCd': selectCd} ,
										callback : function(resBody){
					if(resBody.code == 0){
						$.ajax({
							  url: pageContext + '/api/urban/updataUbanList.do',
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
					}else{
						return ststistics.message({message :"권역 등록 후 활성화  해주시기 바랍니다. 권역 등록시 사용여부와 서비스여부가 활성화하시기 바랍니다." , returnValue : false});
					}
				}});
			}else{
				$.ajax({
					  url: pageContext + '/api/urban/updataUbanList.do',
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
			}
		});
		//2021년 SGIS4 도시화 끝
		//2021년 SGIS4 도시화 시작
		//시도 관리 part 저장버튼
		$(".mainIdSave").on("click",function(){
			var listCd = $('#popup_tr01').children('td:eq(0)').text();
			var listSidoCd = $('#popup_tr01').children('td:eq(1)').text();
			var listUse = $('#popup_tr01').children('td:eq(2)').text();
			var textCd = $('.dstrctLclasCd').val();
			var textSidoCd = $('.sidoCd').val();
			var textUse = $('.useYn').val();
			
			if(!confirm("저장 하시겠습니까?"))return false;
			if(isRequired(textCd)){
				return ststistics.message({message :"분류 코드를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(textSidoCd)){
				return ststistics.message({message :"시도 코드를 입력 해주세요" , returnValue : false});
			}
			if(isRequired(textUse)){
				return ststistics.message({message :"사용 여부를 입력 해주세요" , returnValue : false});
			}
			
			if(textCd != null || textCd != ""){
				ststistics.asynchronous({url : '/api/urban/getDstrctLclasCdExists.do' ,
										data : {'dstrctLclasCd': textCd} ,
										callback : function(resBody){
					if(resBody.code == 0){
						$.ajax({
							  url: pageContext + '/api/urban/updataSidoList.do',
							  data: $("#scopePopupForm").serialize(),
							  method : 'post',
							  success : function(resBody){
								  setDetailReloadList();
								  if(listCd == textCd && listSidoCd == textSidoCd && listUse == textUse){
										return ststistics.message({message :"리스트에 동일한 조건이 존재합니다." , returnValue : false});

								  }else{
									     alert("저장 하였습니다.");	
								  }
							  },
							  error : function(){
								  if(textSidoCd > 99){
										alert("시도코드 100이내 정수만 등록하실 수 있습니다.");
								  }else{
								  		alert("시도코드는 중복될수 없습니다.");
								  }
							  }
						});
					}else{
						return ststistics.message({message :"권역 등록 후 등록해주시기 바랍니다." , returnValue : false});
					}
				}});
			}
		});
		//2021년 SGIS4 도시화 끝
		//2021년 SGIS4 도시화 시작
	});//ready end
	// 시도코드 선택
	$(document).on('click','#select_sido',function(){
		var cd = $(this).closest('tr').children().first().text();
		var sido = $(this).closest('tr').children('td:eq(1)').text();
		var use = $(this).closest('tr').children('td:eq(2)').text();
		$.ajax({
			  url: pageContext + '/api/urban/getSidoDetailData.do',
			  data: {'dstrctLclasCd' : cd, 'sidoCd' : sido, 'useYn' : use},
			  method : 'post',
			  success : function(resBody){
				  if(cd == resBody.dstrctLclasCd && sido == resBody.sidoCd && use == resBody.useYn){
					  $('#mainIdSave').text('수정');
				  }
				  $('.dstrctLclasCd').val(resBody.dstrctLclasCd);
				  $('.sidoCd').val(resBody.sidoCd);
				  $('.useYn').val(resBody.useYn);

			  },
			  error : function(){
				  alert("서버와의 통신이 원할하지 않습니다.");
			  },
		});
	});
	//2021년 SGIS4 도시화 끝
	//2021년 SGIS4 도시화 시작
	// 시도코드 삭제
	$(document).on('click','#delete_sido',function(){
		var cd = $(this).closest('tr').children().first().text();
		var sido = $(this).closest('tr').children('td:eq(1)').text();
		var use = $(this).closest('tr').children('td:eq(2)').text();
		
		if(!confirm("삭제 하시겠습니까?"))return false;
		ststistics.asynchronous({
			url : '/api/urban/removeUrbanMappingByTwoCd.do' ,
			data : {'dstrctLclasCd':cd, 'sidoCd' : sido},
			callback : function(resBody){
				if(resBody == 0){
					alert("삭제 하였습니다.");
					setDetailReloadList();
				}
			}
		});
	});
	//2021년 SGIS4 도시화 끝
	//2021년 SGIS4 도시화 시작
	//삭제나 수정후에 리스트 리로딩 
	function setDetailReloadList(){
		var dstrctLclasCd = $('.dstrctLclasCd').val();
		$.ajax({
			  url: pageContext + '/api/urban/getDstClasCd.do',
			  data: {'dstrctLclasCd' : dstrctLclasCd},
			  method : 'post',
			  success : function(resBody){							
				  $(".popup_tr").remove();
				  $("#popup_tbody_tr_active").remove();
				  var html = "";
				  if(resBody.data.length == 1 && resBody.sidoCd == 0){
					  html += "<tr id = 'popup_tbody_tr_active'>";
					  html += "<td colspan = '7' style='text-align: center; font-size: 15px;'>등록된 시도코드가 존재하지 않습니다.</td>";
					  html += "</tr>";
					  $("#popup_tbody").append(html); 
					  $('.useYn').val("0");
					  $('.sidoCd').val("");
				  }else if(resBody.data[0].sidoCd != 0 || resBody.data[0].sidoCd != undefined ){
					 for(i = 0; i <resBody.data.length; i++){
						  var data = $.extend(resBody.data[i]);
						  html += "<tr class = 'popup_tr' id = popup_tr" + i + 1 +">"
						  html += "<td id = popup_td_cd" + i +1 +">"+ data.dstrctLclasCd + "</td>"
						  html += "<td id = popup_td_sidoCd" + i +1 + ">" + data.sidoCd + "</td>"
						  html += "<td id = popup_td_use" + i+ 1 + ">" + data.useYn + "</td>"
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
			  },
		});	
	}
	//2021년 SGIS4 도시화 끝
	//2021년 SGIS4 도시화 시작
	//popup창 열때 text 종류와 title 명을 수정
	function setUrbanPopup(type){
		$("#upperPopup , .upperPopupWrapper").show();
	if(type == "detail"){
			$("#dstrctLclasCd").show();
			$('select[name=dstrctLclasCd]').hide();
			$("#input_tr").show();
			clearForm('upperPopupForm');
			$("#popTitle02").html("도시화 분석 지도 상세/수정");
	}else if(type = "new"){
			$("#input_tr").show();
			$("#dstrctLclasCd").hide();
			$('select[name=dstrctLclasCd]').show();
			clearForm('upperPopupForm');
			$("#popTitle02").html("도시화 분석 지도 등록");
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
					makeLeftMenu("3", "14", "1");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span class="fontS">권역 관리</span> 
					</p>
				</div>
				<p class="title01">도시화 분석 지도 권역 관리</p>
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
											<option value="1">권역 코드</option>
											<option value="2">권역 명</option>
											<!-- 	<option value="3">범위유형</option> -->
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
							<label style="cursor: pointer;">권역등록</label>
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
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="upperPopupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="권역 등록 popup">
							<caption>대분류 등록 popup</caption>
							<tbody>
								<tr id = "input_tr">
									<th class="right" style="width:100px;">구분</th>
									<td>
									<input data-require="true" type="text" id="dstrctLclasCd" name="dstrctLclasCd" data-edit="false"class="input_use13" readonly="readonly" />
										<select class="input_use08" id="dstrctLclasCd" name="dstrctLclasCd">
											<option value="">선택하세요</option>
											<option value="01">권역 코드</option>
										</select>
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;">권역 명</th>
									<td>
										<input data-require="true" type="text" id="dstrctLclasNm" name="dstrctLclasNm" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;">권역 설명</th>
									<td>
										<input style="float: left;" data-require="true" type="text" id="dstrctLclasExp" name="dstrctLclasExp" data-edit="false" maxlength="50" class="input_use24" />
									</td>
								</tr>
								<tr>
									<th>사용여부</th>
									<td>
										<select class="input_use08" id="useYn" name="useYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>서비스 여부</th>
									<td>
										<select class="input_use08" id="srvYn" name="srvYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>우선 순위</th>
									<td>
										<input data-require="true" type="number" id="orderNo" name="orderNo" data-edit="false" maxlength="50" class="input_use32" />
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
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="scopePopupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable">
							<tr>
			 					<th class="right" style="width:100px;">권역코드</th>
			 					<td>
			 						<input data-require="true" type="text" id="dstrctLclasCd" name="dstrctLclasCd" data-edit="false" maxlength="50" readonly="readonly" class="input_use13 dstrctLclasCd" />
								</td>
								</tr>
								<tr>			
									<th class="right" style="width:100px;">시도 코드</th>
									<td>
										<input data-require="true" type="text" id="sidoCd" name="sidoCd" data-edit="false" maxlength="50" class="input_use13 sidoCd" />
									</td>
								</tr>
								<tr>
									<th>사용여부</th>
									<td>
										<select class="input_use08 useYn" id="useYn" name="useYn">
											<option value="0">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
						</table>
						<table class="popupTable" id ="popupTable" summary="권역 등록 popup">
							<caption>대분류 등록 popup</caption>
							<thead>
								<tr>	
								<th >권역코드</th>
								<th>시도코드</th>
								<th>사용여부</th>
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