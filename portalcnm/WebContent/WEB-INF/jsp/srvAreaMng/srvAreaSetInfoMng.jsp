<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<style>
	</style>
	<script>
	$(document).ready(function(){
		setInfoGrid();
		
		$("#scopeType").change(function(){
			if($(this).val() == "01"){
				$("#scopeUnit").text("초");
			}else{
				$("#scopeUnit").text("m");
			}
		});
		
		
		//검색
		$("#search").on("click",function(){
			var type = $("#searchType option:selected").val();

			$('#srvAreaSetInfoList').datagrid('load',{
				type: type,
				word: $('#word').val()
		    });
		});
		
		//시설유형 분류저장
		$("#upperSave").on("click",function(){
			if(!confirm("저장 하시겠습니까?"))return false;
			if(isRequired($("#factypeLclasNm").val())){
				return ststistics.message({message :"시설유형 분류명을 입력 해주세요" , returnValue : false});
			}
			if(isRequired($("#upperUseYn").val())){
				return ststistics.message({message :"사용여부를 입력 해주세요" , returnValue : false});
			}
			if(isRequired($("#upperSrvYn").val())){
				return ststistics.message({message :"서비스여부를 입력 해주세요" , returnValue : false});
			}

			//수정(활성화 여부체크)
			if($("#upperSrvYn").val() == "Y" && $("#factypeLclasCd").val() != null && $("#factypeLclasCd").val() != ""){
				ststistics.asynchronous({url : '/api/srvAreaMng/checkServiceYn.do' , data : {'factypeLclasCd':$("#factypeLclasCd").val()} , callback : function(resBody){
					if(resBody.code == 0){
						$.ajax({
							  url: pageContext + '/api/srvAreaMng/updataUpperFactypeList.do',
							  data: $("#upperPopupForm").serialize(),
							  method : 'post',
							  success : function(resBody){
								  alert("저장 하였습니다.");
								  $("#upperPopup , .upperPopupWrapper").hide();
								  $('#srvAreaSetInfoList').datagrid('load',{word : ''});
							  },
							  error : function(){
								  alert("서버와의 통신이 원할하지 않습니다.");
							  },
						});
					}else{
						return ststistics.message({message :"해당 분류의 시설유형 등록 후 활성화  해주시기 바랍니다. 시설유형 등록시 사용여부와 서비스여부가 활성화하시기 바랍니다." , returnValue : false});
					}
				}});
			}else if($("#upperSrvYn").val() == "Y" && isRequired($("#factypeLclasCd").val())){//수정(활성화 여부체크)
				return ststistics.message({message :"신규등록시 서비스 여부는 활성화 되지 않습니다. 비활성화 후 다시 저장해주세요" , returnValue : false});
			}else{
				$.ajax({
					  url: pageContext + '/api/srvAreaMng/updataUpperFactypeList.do',
					  data: $("#upperPopupForm").serialize(),
					  method : 'post',
					  success : function(resBody){
						  alert("저장 하였습니다.");
						  $("#upperPopup , .upperPopupWrapper").hide();
						  $('#srvAreaSetInfoList').datagrid('load',{word : ''});
					  },
					  error : function(){
						  alert("서버와의 통신이 원할하지 않습니다.");
					  },
				});
			}
		});
		
		//grid유형 분류저장
		$("#gridSave").on("click",function(){
			if(!confirm("저장 하시겠습니까?"))return false;
			if(isRequired($("#gridNm").val())){
				return ststistics.message({message :"격자 유형명를 입력 해주세요" , returnValue : false});
			}
			if(isRequired($("#gridUseYn").val())){
				return ststistics.message({message :"사용여부를 입력 해주세요" , returnValue : false});
			}
			if(isRequired($("#gridSrvYn").val())){
				return ststistics.message({message :"서비스여부를 입력 해주세요" , returnValue : false});
			}
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/updataGridList.do',
				  data: $("#gridPopupForm").serialize(),
				  method : 'post',
				  success : function(resBody){
					  alert("저장 하였습니다.");
					  $("#girdPopup , .gridPopupWrapper").hide();
					  $('#srvAreaSetInfoList').datagrid('load',{word : ''});
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
		});
		
		$("#scopeSave").on("click",function(){
			if(!confirm("저장 하시겠습니까?"))return false;
			if(isRequired($("#scopeType").val())){
				return ststistics.message({message :"구분를 입력 해주세요" , returnValue : false});
			}
			if(isRequired($("#scopeNm").val())){
				return ststistics.message({message :"범위 유형명를 입력 해주세요" , returnValue : false});
			}
			if(isRequired($("#scopeUseYn").val())){
				return ststistics.message({message :"사용여부를 입력 해주세요" , returnValue : false});
			}
			if(isRequired($("#scopeSrvYn").val())){
				return ststistics.message({message :"서비스 여부를 입력 해주세요" , returnValue : false});
			}
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/updataScopeList.do',
				  data: $("#scopePopupForm").serialize(),
				  method : 'post',
				  success : function(resBody){
					  alert("저장 하였습니다.");
					  $("#scopePopup , .scopePopupWrapper").hide();
					  $('#srvAreaSetInfoList').datagrid('load',{word : ''});
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
			
		});
		
	});//ready end

	//grid
	function setInfoGrid(){
		$('#srvAreaSetInfoList').datagrid({
			columns : [ [ {
				field : 'srvType',
				title : '유형',
				width : 150,
				align : 'center',
				sortable : true
			},{
				field : 'srvTypeCd',
				title : '서비스 유형 명',
				width : 200,
				hidden : true
			},{
				field : 'srvTypeNm',
				title : '서비스 유형 명',
				width : 250,
				align : 'center',
				sortable : true
			}, {
				field : 'useYn',
				title : '사용 여부',
				width : 100,
				align : 'center',
				sortable : true
			}, {
				field : 'srvYn',
				title : '서비스 여부',
				width : 100,
				align : 'center',
				sortable : true
			}, {
				field : 'scopeType',
				title : '비고',
				width : 150,
				align : 'center',
				sortable : true
			}] ],

			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getSrvareaSetInfoList.do',
			method: 'POST',
			onClickRow : function(index,row){
				if(row.srvType == '시설유형'){
					detailUpperList(row);
				}else if(row.srvType == '격자유형'){
					detailGridList(row);
				}else{
					detailScopeList(row);
				}
			}
		});
	}
	function clearForm(target){
		 $('#'+target).find('select, input').each(function(index, elem){
			  $(this).val('');
		  });
	}
	
	function setUpperPopup(type){
		
		$("#upperPopup , .upperPopupWrapper").show();
		if(type == "detail"){
			clearForm('upperPopupForm');
			$("#popTitle02").html("생활권역 통계지도 시설유형 분류 상세/수정");
		}else{
			$("#factypeLclasCd , #factypeLclasNm, #upperUseYn, #upperOrderNo").val('');
			$("#upperSrvYn").val('N');
			$("#popTitle02").html("생활권역 통계지도 시설유형 분류 등록");
		}
	}
	
	function setGridPopup(type){
		clearForm('gridPopupForm');
		$("#girdPopup , .gridPopupWrapper").show();
		if(type == "detail"){
			$("#popTitle01").html("생활권역 통계지도 격자유형 상세/수정");
		}else{
			$("#popTitle01").html("생활권역 통계지도 격자유형 등록");
		}
	}
	
	function setScopePopup(type){
		clearForm('scopePopupForm');
		$("#scopePopup , .scopePopupWrapper").show();
		if(type == "detail"){
			$("#popTitle03").html("생활권역 통계지도 범위유형 상세/수정");
		}else{
			$("#popTitle03").html("생활권역 통계지도 범위유형 등록");
		}
	}
	
	function detailUpperList(data){
		var factypeLclasCd = data.srvTypeCd;
		$.ajax({
			  url: pageContext + '/api/srvAreaMng/getSrvAreaUpperDetailData.do',
			  data: {'factypeLclasCd' : factypeLclasCd},
			  method : 'post',
			  success : function(resBody){
				  console.log(resBody);
				  var data = $.extend(resBody.data[0]);
				  setUpperPopup('detail');

				  $('#upperPopupForm').find('select, input').each(function(index, elem){
					  $(this).val(data[this.id]);
				  });

			  },
			  error : function(){
				  alert("서버와의 통신이 원할하지 않습니다.");
			  },
		});
	}
	
	function detailGridList(data){
		var gridCd = data.srvTypeCd;
		
		$.ajax({
			  url: pageContext + '/api/srvAreaMng/getSrvAreaGridDetailData.do',
			  data: {'gridCd' : gridCd},
			  method : 'post',
			  success : function(resBody){
				  console.log(resBody);
				  var data = $.extend(resBody.data[0]);
				  setGridPopup('detail');
				  $('#gridPopupForm').find('select, input').each(function(index, elem){
					  $(this).val(data[this.id]);
				  });
			  },
			  error : function(){
				  alert("서버와의 통신이 원할하지 않습니다.");
			  },
		});
		
	}
	
	function detailScopeList(data){
		var scopeCd = data.srvTypeCd;
		$.ajax({
			  url: pageContext + '/api/srvAreaMng/getSrvAreaScopeDetailData.do',
			  data: {'scopeCd' : scopeCd},
			  method : 'post',
			  success : function(resBody){
				  var data = $.extend(resBody.data[0]);
				  setScopePopup('detail');
				  $('#scopePopupForm').find('select, input').each(function(index, elem){
					  $(this).val(data[this.id]);
				  });
			  },
			  error : function(){
				  alert("서버와의 통신이 원할하지 않습니다.");
			  },
		});
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
					makeLeftMenu("3", "13", "1");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span> 생활권역 통계지도</span>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">시설유형 관리</span>
					</p>
				</div>
				<p class="title01">생활권역 통계지도 서비스 관리</p>
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
									<select class="input_use08" id="searchType" name="searchType">
											<option value="0">선택하세요</option>
											<option value="1">시설유형 분류</option>
											<option value="2">격자유형</option>
											<option value="3">범위유형</option>
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
						<a href="javascript:setUpperPopup('new');"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;">시설유형 분류등록</label>
						</a>
						<a  href="javascript:setGridPopup('new');" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;">격자등록</label>
						</a>
						<a  href="javascript:setScopePopup('new');" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;">범위등록</label>
						</a>
					</div>
					
				</div>
				<table id="srvAreaSetInfoList" class=""  title="" style="width:743px;height:500px;"
		            data-options="singleSelect:true,collapsible:false,checkOnSelect:false,selectOnCheck:false">
		    	</table>
			</div>
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<div class="gridPopupWrapper" id="gridPopup" style="left: 0;">
			<div class="gridPopupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle01"></div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="gridPopupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">격자유형명</th>
									<td>
										<input style="display:none" data-require="true" type="text" id="gridCd" name="gridCd" data-edit="false" maxlength="50" class="input_use18" />
										<input data-require="true" type="text" id="gridNm" name="gridNm" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">격자구분명</th>
									<td>
										<input data-require="true" type="text" id="gridLevelDiv" name="gridLevelDiv" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th>사용여부</th>
									<td>
										<select class="input_use08" id="gridUseYn" name="gridUseYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>서비스 여부</th>
									<td>
										<select class="input_use08" id="gridSrvYn" name="gridSrvYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>우선 순위</th>
									<td>
										<input data-require="true" type="number" id="gridOrderNo" name="gridOrderNo" data-edit="false" maxlength="50" class="input_use32" />
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="gridSave" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		<div class="upperPopupWrapper" id="upperPopup" style="left: 0;">
			<div class="upperPopupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle02"></div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="upperPopupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>대분류 등록 popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">시설유형 분류명</th>
									<td>
										<input style="display:none" data-require="true" type="text" id="factypeLclasCd" name="factypeLclasCd" data-edit="false" maxlength="50" class="input_use18" />
										<input data-require="true" type="text" id="factypeLclasNm" name="factypeLclasNm" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th>사용여부</th>
									<td>
										<select class="input_use08" id="upperUseYn" name="upperUseYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>서비스 여부</th>
									<td>
										<select class="input_use08" id="upperSrvYn" name="upperSrvYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N" selected>비활성</option>
										</select>
										<span>*한개 이상의 시설유형을 등록 후 서비스 활성화가 가능합니다.</span>
									</td>
								</tr>
								<tr>
									<th>우선 순위</th>
									<td>
										<input data-require="true" type="number" id="upperOrderNo" name="upperOrderNo" data-edit="false" maxlength="50" class="input_use32" />
									</td>
								</tr>
								<a style="top: 18px;position: relative;right: -38px;">※ 서비스를 정상적으로 제공하기 위해서는 목록 화면에서 중심시설 POI를 연결하셔야 합니다. </a>
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="upperSave" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
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
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="scopePopupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>대분류 등록 popup</caption>
							<tbody>
								<tr>
									<th>구분</th>
									<td>
										<select class="input_use08" id="scopeType" name="scopeType">
											<option value="">선택하세요</option>
											<option value="01">주행시간 기준</option>
											<option value="02">주행거리 기준</option>
											<option value="03">반경기준</option>
										</select>
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">범위유형 명</th>
									<td>
										<input style="display:none" data-require="true" type="text" id="scopeCd" name="scopeCd" data-edit="false" maxlength="50" class="input_use18" />
										<input data-require="true" type="text" id="scopeNm" name="scopesNm" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">범위유형 값</th>
									<td>
										<input style="float: left;" data-require="true" type="text" id="scopeVal" name="scopeVal" data-edit="false" maxlength="50" class="input_use24" />
										<p style="float: left;margin-top: 10px;" id="scopeUnit"></p>
									</td>
								</tr>
								<tr>
									<th>사용여부</th>
									<td>
										<select class="input_use08" id="scopeUseYn" name="scopeUseYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>서비스 여부</th>
									<td>
										<select class="input_use08" id="scopeSrvYn" name="scopeSrvYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>우선 순위</th>
									<td>
										<input data-require="true" type="number" id="scopeOrderNo" name="scopeOrderNo" data-edit="false" maxlength="50" class="input_use32" />
									</td>
								</tr>
							
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="scopeSave" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
</body>
</html>