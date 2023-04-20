<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<script>
	$(document).ready(function(){
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSGridInfo.do'  , search_button : 'search' , search_box : 'resetForm' });
		ststistics.grid.create({
			target 	: 'datagrid-view' ,
			header : [
				{column : 'rnum' ,	 type : 'text' , name : '번호' 	, style : {"width" : '50px'}},
				{column : 'workNm' ,	type : 'text',	name : '업무명'		,	style : {"width" : '438px'}},
 				{column : 'startDt' ,			type : 'text',	name : '등록일'		,	style : {"width" : '195px'}},
				{column : 'remove' 			, type : 'button' 		, name : '삭제' 		, style : {"width" : '55px'}, callback : function(obj){
					deleteGridInfo(obj.workNo);
				}}
				], 
				row_callback : function(rObject){
					$("#popupDetail").show();
 					//var data = this.data[rObject.rowIndex]
 					//var data = ststistics.grid.getSelectRowData();
 					var data = rObject.itmInfo;
					$('#workNo').val(data['workNo']);
					$("#workNmDetail").val(data["workNm"]);
					$("#dataTypeDetail").val(data["dataType"]).change();
					$("#baseYearDetail").val(data["baseYear"]).change();
					$("#"+data["gridType"]+"Detail").prop('checked',true);
					var selectCodeSpl = data.selectCode.split(',');
					for (codeIdx = 0; codeIdx < selectCodeSpl.length; codeIdx++) {
						$("#selectCodeDetail #"+selectCodeSpl[codeIdx].split('\r').join('').split('\n').join('')).prop('checked',true);
					}
					$("#queryDetail").val(data.query.replaceAll("&apos;","'"));
					data["startDt"] ? $("#startDtDetail").text(data["startDt"]) : $("#startDtDetail").text('')
				}
		});
		function popupClear(){
			$("#workNm").val("");
			$("#dataType").val("");
			$("#baseYear").val("");
			$("#100km").prop("checked",true).change();
			$('#selectCode').children().remove();
			$("#query").val("");
		}
		
		function createQuery(isDetail) {
			var dataType = $('#dataType'+isDetail).val()
			var baseYear = $('#baseYear'+isDetail).val()
			var gridType = $('input[name=gridType'+isDetail+']:checked').val()
			var checkedCodes = $('#selectCode'+isDetail+' :checked')
			var codeIds = []
			for(idx=0; idx <= checkedCodes.length - 1; idx++){
				codeIds.push("'" + checkedCodes[idx].id + "'")
			}
			var infoCode = codeIds.join(',')
			var query =	"Select * from kostat.srv_dt_grid_info_mart " + 
				"Where base_year='"+baseYear+"' and info_type = '"+dataType+"' " +
				"And grid_level_div = '"+gridType+"' and info_code in ("+infoCode+")"
			$('#query'+isDetail).val(query)
		}
		
		function deleteGridInfo(workNo) {
			if(!confirm("삭제 하시겠습니까?"))return false;
			ststistics.asynchronous({
				url : '/api/ststistics/removeGridInfo.do' ,
				data : {'workNo':workNo},
				callback : function(resBody){
					if(resBody == 0){
						alert("삭제 하였습니다.");
						setTimeout(function(){
							location.reload();
						},100);
					}
				}
			});
		}
		
		$('#deleteDetail').on('click', function() {
			deleteGridInfo($("#workNo").val());
		});
		
		$("#registerPopup").on("click",function(){
			popupClear();
			$("#popup").show();
		});
		
		$("#dataType, #dataTypeDetail").on('change', function(){
			var targetId = $(this).attr("id") == "dataTypeDetail" ? "#baseYearDetail" : "#baseYear";
			$(targetId).removeAttr('disabled');
			$(targetId).children('option').remove()
			$(targetId).append('<option value='+'""'+'>'+'선택하세요.'+ '</option>');
			var lastYear = new Date().getFullYear() - 1
			if( this.value == 'comp' ) {
				for (year=2000; year<=lastYear; year++) {
					if(year==2016) {
						$(targetId).append('<option value=2016>'+'2016(9차)'+ '</option>');
						$(targetId).append('<option value=9016>'+'2016(10차)'+ '</option>');
					} else {
						$(targetId).append('<option value='+year+'>'+year+'</option>');
					}
				}
			} else {
				$(targetId).append('<option value='+'2000'+'>'+'2000'+ '</option>');
				$(targetId).append('<option value='+'2005'+'>'+'2005'+ '</option>');
				$(targetId).append('<option value='+'2010'+'>'+'2010'+ '</option>');
				$(targetId).append('<option value='+'2015'+'>'+'2015'+ '</option>');
				for (year=2016; year<=lastYear; year++) {
					$(targetId).append('<option value='+year+'>'+year+'</option>');
				}
			}
			if(targetId == "#baseYearDetail") {
				createQuery("Detail")
			} else {
				createQuery()
			}
		});
		
		$("#baseYear, #baseYearDetail").on("change",function(){
			var isDetail = $(this).attr("id") == "baseYearDetail" ? "Detail" : "";
			var data = new Object();
			var dataType = $('#dataType'+isDetail).val()
			if (dataType == 'comp' || dataType == 'emp') {
				data['dataType'] = dataType
				if (this.value <= 2005) {
					data['depthNo'] = 8
				} else if(this.value <= 2016) {
					data['depthNo'] = 9
				} else {
					data['depthNo'] = 10
				}
			} else {
				data['depthNo'] = 0
				data['dataType'] = dataType
			}
			$('#selectCode'+isDetail).children().remove();
			$.ajax({
	            url: pageContext + '/api/ststistics/getStstisticsUSGridInfoCode.do',
	            data: data,
	            async: false,
	            type: 'POST',
	            success: function(result){
	            	var data = result.data
	            	for (idx=0; idx < data.length; idx++) {
	            		$('#selectCode'+isDetail).append('<div><input type="checkbox" id="'+data[idx].infoCd.split('\r').join('').split('\n').join('')+'" class="input_use09"/><label for="'+data[idx].infoCd+'" class="ml_5">'+data[idx].description+'</label><div>')
	            	}
	            }
	        });
			createQuery(isDetail)
		});
		
		$('#selectCode, #selectCodeDetail').on('change', 'input[type="checkbox"]', function() {
			var isDetail = $(this.parentElement).attr('id') == "selectCodeDetail" ? "Detail" : "";
			createQuery(isDetail)
		});
		
		$('#gridTypeRadio, #gridTypeRadioDetail').on('change', 'input[type="radio"]', function() {
			var isDetail = $(this.parentElement).attr('id') == "gridTypeRadioDetail" ? "Detail" : "";
			createQuery(isDetail)
		});
		
		$("#save, #saveDetail").on("click",function(event){
			var targetId = $(this).attr("id") == "saveDetail" ? "Detail" : "";
			if($("#workNm"+targetId).val() == ""){
				alert("업무명을 입력하세요");
				return
			} else if($("#dataType"+targetId).val() == ""){
				alert("자료대상을 선택하세요");
				return
			
			} else if($("#baseYear"+targetId).val() == ""){
				alert("년도를 선택하세요");
				return
			} else if($('#selectCode'+targetId+' :checked').length == 0){
				alert("세부자료명을 선택하세요");
				return
			}else {
				if(!confirm("저장 하시겠습니까?"))return false;
				var formData = new Object();
				formData["workNo"] = targetId == "Detail"? $("#workNo").val() : "";
				formData['workNm'] = $("#workNm"+targetId).val();
				formData['dataType'] = $("#dataType"+targetId).val();
				formData['baseYear'] = $("#baseYear"+targetId).val();
				formData['gridType'] = $('input[name=gridType'+targetId+']:checked').val();
				
				var checkedCodes = $('#selectCode'+targetId+' :checked')
				var codeIds = []
				for(idx=0; idx <= checkedCodes.length - 1; idx++){
					codeIds.push(checkedCodes[idx].id)
				}
				
				formData['selectCode'] = codeIds.join(',');
				formData['query'] = $('#query'+targetId).val();
				
				$.ajax({
		            url: pageContext + '/api/ststistics/registerStstisticsUSGridInfo.do',
		            data: formData,
		            type: 'POST',
		            success: function(result){
		            	alert("등록에 성공하셨습니다.");
		            	$s.grid.create($s.grid.parameter);
		            	$("#popup"+targetId).hide();
		            } ,
		            error : function(){
		            	alert("저장에 실패하였습니다.");
		            	$s.grid.create($s.grid.parameter);
		            	$("#popup"+targetId).hide();
					}
		        });
			}
		})
	})
	
	
	</script>
</head>
<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<!--<div class="lefitMenuWrapper"> --><!-- 2020년 SGIS고도화 3차 주석-->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					makeLeftMenu("3", "7", "6");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span>자료제공 관리</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">선택형 격자자료 제공서비스 자동화</span><!-- 20201127 2020년 SGIS고도화 3차 수정-->
					</p>
				</div>
				<p class="title01">선택형 격자자료 제공서비스 자동화</p><!--2019-02-19 수정  --><!-- 20201127 2020년 SGIS고도화 3차 수정-->
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="130" />
							<col width="560" />

						</colgroup>
						<tbody>
							<tr>
								<th class="right">업무명</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text" style="width:550px;"/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				
				<div class="searchBtn04">
					<a id="registerPopup" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for=registerPopup>신규등록</label>
					</a>
				</div>
				<table class="apiTable03" summary="검색결과"></table>
				<div class="panel datagrid">
					<div class="datagrid-wrap panel-body panel-body-noheader">
						<div class="datagrid-view" style="width: 745px; height: max-content; padding-top:5px;" id="datagrid-view"></div>
						<div class="datagrid-pager pagination"></div>
						<div class="datagrid-mask" style="display:none;"></div>
						<div class="datagrid-mask-msg" style="display:none; left : 50%; height: 16px; margin-left: -99px; line-height: 16px;">처리중 입니다, 기다리 십시요...</div>
					</div>
				</div>
			</div>
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
	</div>	
	
	<div class="popupWrapper" id="popup" style="left: 0">
		<div class="popupWrapper">
			<div class="aplPopupWrapper">
				<div class="aplPopupTitle">
					<div class="myTitleFont" id="popTitle">선택형 격자자료제공 서비스 자동화 등록</div>
					<div class="myXbtn">
						<a style="cursor: pointer">
							<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
						</a>
					</div>
				</div>
				<form id="popupForm" enctype="multipart/form-data">
					<table class="popupTable">
						<tbody>
							<tr>
								<th class="right" style="width:100px;'">자동화 업무명</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
								<td>
									<input type="text" id="workNm" name="workNm" maxlength="50" class="input_use13"/>
								</td>
							</tr>
							<tr>
								<th>자료대상</th>
								<td>
									<div>
										<select class="input_use08" id="dataType" name="targetData" style="width:180px">
											<option value='' selected>선택하세요.</option>
											<option value='person' >인구</option>
											<option value='family' >가구</option>
											<option value='house' >주택</option>
											<option value='comp' >사업체</option>
											<option value='emp' >종업원</option>
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<th>년도</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
								<td>
									<select class="input_use08" id="baseYear" name="year" style="width:180px" disabled>
										<option value='' selected>자료대상을 먼저 선택하세요.</option>
										<!-- <script>
											var currentYear = new Date().getFullYear() - 1
											for(year=2000;year<=currentYear;year++){
												if(year == 2016) {
													document.write("<option value='"+2016+"'>"+"2016(9차)"+ "</option>");
													document.write("<option value='"+9016+"'>"+"2016(10차)"+ "</option>");
												} else {
													document.write("<option value='"+year+"'>"+year+ "</option>");
												}
											 }
										</script> -->
									</select>
								</td>
							</tr>
							<tr>
								<th>격자구분</th>
								<td>
									<div id="gridTypeRadio" class="radioBtnWrapper">
										<input type="radio" name="gridType" id="100km" value="100k" checked="checked">
										<label for="100km">100km</label>
										<input type="radio" name="gridType" id="10km" value="10k">
										<label for="10km">10km</label>
										<input type="radio" name="gridType" id="1km" value="1k">
										<label for="1km">1km</label>
										<input type="radio" name="gridType" id="500m" value="500m">
										<label for="500m">500m</label>
										<input type="radio" name="gridType" id="100m" value="100m">
										<label for="100m">100m</label>
									</div>
								</td>
							</tr>
							<tr>
								<th>세부자료명</th>
								<td>
									<div id="selectCode" style="overflow-y:scroll; width:100%; height:120px;">
									</div>
								</td>
							</tr>
							<tr>
								<th>쿼리</th>
								<td>
									<textarea id="query" style="width:505px; height:100px; resize:none;" readonly></textarea>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				
				<div class="btnbox">
					<a id="save" 	class="save" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
					<a id="cancel" 	class="cancel" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">닫기</label></a>
				</div>
			</div>
		</div>
	</div>
	<div class="popupWrapper" id="popupDetail" style="left: 0">
		<div class="popupWrapper">
			<div class="aplPopupWrapper">
				<div class="aplPopupTitle">
					<div class="myTitleFont" id="popTitleDetail">선택형 격자자료제공 서비스 자동화 상세</div>
					<div class="myXbtn">
						<a style="cursor: pointer">
							<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
						</a>
					</div>
				</div>
				<form id="popupFormDetail" enctype="multipart/form-data">
					<input type="hidden" id="workNo" name="workNo"/>
					<table class="popupTable">
						<tbody>
							<tr>
								<th class="right" style="width:100px;'">자동화 업무명</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
								<td>
									<input type="text" id="workNmDetail" name="workNmDetail" maxlength="50" class="input_use13"/>
								</td>
							</tr>
							<tr>
								<th>자료대상</th>
								<td>
									<div>
										<select class="input_use08" id="dataTypeDetail" name="targetDataDetail" style="width:180px">
											<option value='' selected>선택하세요.</option>
											<option value='person' >인구</option>
											<option value='family' >가구</option>
											<option value='house' >주택</option>
											<option value='comp' >사업체</option>
											<option value='emp' >종업원</option>
										</select>
									</div>
								</td>
							</tr>
							<tr>
								<th>년도</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
								<td>
									<select class="input_use08" id="baseYearDetail" name="yearDetail" style="width:180px" disabled>
										<option value='' selected>자료대상을 먼저 선택하세요.</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>격자구분</th>
								<td>
									<div id="gridTypeRadioDetail" class="radioBtnWrapper">
										<input type="radio" name="gridTypeDetail" id="100kmDetail" value="100k" checked="checked">
										<label for="100km">100km</label>
										<input type="radio" name="gridTypeDetail" id="10kmDetail" value="10k">
										<label for="10km">10km</label>
										<input type="radio" name="gridTypeDetail" id="1kmDetail" value="1k">
										<label for="1km">1km</label>
										<input type="radio" name="gridTypeDetail" id="500mDetail" value="500m">
										<label for="500m">500m</label>
										<input type="radio" name="gridTypeDetail" id="100mDetail" value="100m">
										<label for="100m">100m</label>
									</div>
								</td>
							</tr>
							<tr>
								<th>세부자료명</th>
								<td>
									<div id="selectCodeDetail" style="overflow-y:scroll; width:100%; height:120px;">
									</div>
								</td>
							</tr>
							<tr>
								<th>쿼리</th>
								<td>
									<textarea id="queryDetail" style="width:505px; height:100px; resize:none;" readonly></textarea>
								</td>
							</tr>
							<tr>
								<th>등록일</th>
								<td>
									<p id="startDtDetail"></p>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				
				<div class="btnbox">
					<a id="saveDetail" 	class="save" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="saveDetail">저장</label></a> 
					<a id="deleteDetail" 	class="delete" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="deleteDetail">삭제</label></a> 
					<a id="cancelDetail" 	class="cancel" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancelDetail">닫기</label></a>
				</div>
			</div>
		</div>
	</div>