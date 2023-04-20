<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<style type="text/css">
	#ITEM_B_CLASS_ID, #ITEM_M_CLASS_ID, #ITEM_S_CLASS_ID {
		width: 192px;
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
	
	$(document).ready(function(){
		// 검색 클릭 이벤트 재 작성 - 이유: 검색을 하기 전에 검색 조건을 잘 작성했는지 확인하기 위함이다.
		// 기존 검색 버튼에 대한 클릭 이벤트에는 그런 게 없다.
		$(document.querySelector('#search')).unbind('click');	// 1. 일단 걸려있는 이벤트를 잘라낸다(unbind).
		console.log("the event of #search has been changed for search condition value's validation check !!!!");
		$('#search').on("click",function(){						// 2. 검색 버튼 클릭 이벤트를 다시 작성한다. 참고로 맨 밑의 2줄은 ststistics.js 의 initialize 메서드에서 배껴온 것이다.
		
			/*---------- 날짜 체크 [START] ----------*/
			// 등록일자
			/* var reg_startDate = document.querySelector('#reg_startDate').value;
			var reg_endDate = document.querySelector('#reg_endDate').value; */
			
			// 수정일자
			/* var mod_startDate = document.querySelector('#mod_startDate').value;
			var mod_endDate = document.querySelector('#mod_endDate').value; */
			
			/* var check_reg = reg_startDate + reg_endDate;
			var check_mod = mod_startDate + mod_endDate;
				
			
			if(check_reg && check_reg.length !== 20) {
				alert('등록일자는 시작값과 끝값 둘 다 있거나 둘 다 없어야 합니다.');
				return false;
			}
			
			if(check_mod && check_mod.length !== 20) {
				alert('수정일자는 시작값과 끝값 둘 다 있거나 둘 다 없어야 합니다.');
				return false;
			} */
			/*---------- 날짜 체크 [END] ----------*/
			
			
			
			$('.pageNo').val('1');				// 배껴온 코드
			//$s.grid.create($s.grid.parameter);	// 배껴온 코드, $s.grid는 전역에서 접근 할 수 있기 때문에 이렇게 사용할 수 있다.
			selectedStblDetailList();
		});
		
		// input 태그 혹은 select 태그 등에서 태그에서 값을 사용하지 못하도록 막는 함수입니다.
		function disableOrEnableInputs(className,isDisabled){
			var nodeList = document.querySelectorAll('.'+className);
			Array.prototype.forEach.call(nodeList,function(item,index){
				 item.disabled = isDisabled;
			});
		}
		
		// selectElement 에서 원하는 value 값으로 변경하는 함수입니다.
		function selectElementChangeValue(className, valueToSelect) {    
			var nodeList = document.querySelectorAll('.'+className);
			Array.prototype.forEach.call(nodeList,function(item,index){
				item.value = valueToSelect;
			});
		}
		
		
		$('.excelDownload').click(function(){
			location.href = pageContext+"/api/ststistics/ststisticsUsTotalSurveyExcelDownload.do?"+getMethodParameterMaker('resetForm');
		})
		
		
		// HTTP GET 메서드를 사용할 때 보낼 파라미터들 문자열을 만드는 함수입니다.
		function getMethodParameterMaker(formId) {
			var form = document.getElementById(formId);
			var parameters = "";
			
			for(var i = 0 ; i < form.length ; i++) {
			    if(!form[i].value) continue;
			    console.log(form[i].name+'='+form[i].value);
			    parameters += form[i].name+'='+form[i].value+'&';
			}
			
			parameters = parameters.substr(0,parameters.lastIndexOf('&'));	// 맨 마지막 &만 뺀다.
			return parameters;
		}
		
		// 신규등록 버튼 클릭에 대한 이벤트 등록
		$('#new_register').on('click',function(e){
			e.preventDefault();	// a 태그의 기본 동작을 방지
			location.href= pageContext + '/ststistics/ststisticsUSTotalStblDetailRegister.do';
		});		
		
		function selectedStblDetailList() {
			if($("#ITEM_B_CLASS_ID option:selected").val() == "STATS1") { // 총조사 여부
				$("#TOT_SURV_YN").val("N");
				if($("#ITEM_M_CLASS_ID option:selected").val() == "ST1_S1") { // 상세 여부
					$("#DET_YN").val("N");
				} else {
					$("#DET_YN").val("Y");
				}
			} else {
				$("#TOT_SURV_YN").val("Y");
				if($("#ITEM_M_CLASS_ID option:selected").val() == "ST2_S1") { // 상세 여부
					$("#DET_YN").val("N");	
				} else {
					$("#DET_YN").val("Y");
				}
			}
			
			setDatepickerDefaultRangeNew('reg_startDate','reg_endDate');
			setDatepickerDefaultRangeNew('mod_startDate','mod_endDate');
			
			ststistics.insertck = false; 
			ststistics.initialize({search_url : '/api/ststistics/ststisticsUSTotalStblDetailList.do'  , search_button : 'search' , search_box : 'resetForm' });
			ststistics.grid.create({
				target 	: 'datagrid-view' , 
				header : [
					{column : 'rnum' ,		type : 'text',	name : '항목순번'		,	style : {"width" : '60px'}},
					{column : 'stattbDiv' ,		type : 'text',	name : '카테고리'		,	style : {"width" : '120px'}},
					{column : 'stattbYear' ,	type : 'text',	name : '수집시기'		,	style : {"width" : '60px'}},
					{column : 'tblNm' ,		type : 'text',	name : '통계명'		,	style : {"width" : '250px'}},				
					{column : 'chartNm' ,		type : 'text',	name : '차트명'		,	style : {"width" : '240px'}},
				] , 
				row_callback : function(rObject){
					ststistics.insertck = false;
					$("#resetForm").attr("action", pageContext + "/ststistics/ststisticsUSTotalStblDetailInfo.do");
					$("#isModify").val(false), $("#ORG_ID").val(rObject.itmInfo.orgId), $("#TBL_ID").val(rObject.itmInfo.tblId), $("#CHART_ORD").val(rObject.itmInfo.chartOrd);
					$("#TOT_SURV_YN").val(rObject.itmInfo.totSurvYn), $("#DET_YN").val(rObject.itmInfo.detYn);
					$("#resetForm").submit();
				}
			});
		}
		
		$("#ITEM_B_CLASS_ID").on("change", function() {
			let bClassId = $("#ITEM_B_CLASS_ID option:selected").val();
			if(bClassId == "") { $("#ITEM_M_CLASS_ID").prop("disabled", true); return; }
			else $("#ITEM_M_CLASS_ID").prop("disabled", false);
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
					$("#ITEM_M_CLASS_ID option:eq(1)").attr("selected", true).trigger("change");
				}
			});
		});
		
		$("#ITEM_M_CLASS_ID").on("change", function() {
			let mClassId = $("#ITEM_M_CLASS_ID option:selected").val();
			if(mClassId == "") { $("#ITEM_S_CLASS_ID").prop("disabled", true); return; }
			else $("#ITEM_S_CLASS_ID").prop("disabled", false);
			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: pageContext + "/ststistics/selectItmSClass.do",
				data: {
					bClassCd: mClassId
				},
				dataType: "json",
				success: function(res) {
					var str = "";
					str += "<option value=''>선택하세요</option>";
					for(var i=0; i<res.resultList.length; i++) {
						str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";
					}
					
					$("#ITEM_S_CLASS_ID").html(str);					
					$("#ITEM_S_CLASS_ID option:eq(1)").attr("selected", true).trigger("change");
				}
			});
		});
		
		$.ajax({
			method: "POST",
			async: false,	// 반드시 동기처리 해야 함
			url: pageContext + "/ststistics/selectItmBClass.do",
			dataType: "json",
			success: function(res) {
				var str = "";
				str += "<option value=''>선택하세요</option>";
				for(var i=0; i<res.resultList.length; i++) {
					str += "<option value='" + res.resultList[i].SClassCd + "'>" + res.resultList[i].SClassCdNm + "</option>";	
				}
				
				$("#ITEM_B_CLASS_ID").html(str);				
				$("#ITEM_B_CLASS_ID option:eq(1)").attr("selected", true).trigger("change");
			}
		});
		
		selectedStblDetailList();
	});
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
						<span class="fontS"> 총조사시각화 통계표 관리</span>
					</p>
				</div>
				<p class="title01">총조사시각화 통계표 관리</p> <!--2019-02-19 수정  -->
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="dataForm" method="POST">
					
					
				</form>
				
				<form id="resetForm" method="POST">
					<input type="hidden" id="isModify" name="isModify" />
					<input type="hidden" id="ORG_ID" name="ORG_ID" />
					<input type="hidden" id="TBL_ID" name="TBL_ID" />
					<input type="hidden" id="TOT_SURV_YN" name="TOT_SURV_YN" />
					<input type="hidden" id="DET_YN" name="DET_YN" />
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
								<th class="right">항목분류</th>
								<td colspan="3">
									<select class="input_use29" id="ITEM_B_CLASS_ID" name="ITEM_B_CLASS_ID">
										<option value="">선택하세요</option>
									</select>
									<select class="input_use29 depend_on_b_class" id="ITEM_M_CLASS_ID" name="ITEM_M_CLASS_ID" disabled="disabled">
										<option value="">선택하세요</option>
									</select>
									<select class="input_use29 depend_on_b_class" id="ITEM_S_CLASS_ID" name="ITEM_S_CLASS_ID" disabled="disabled">
										<option value="">선택하세요</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="right">수집시기</th>
								<td>
									<input type="text" id="STATTB_YEAR" name="STATTB_YEAR" class="input_use03 validatebox-text"  style="width:200px"/>
								</td>
								<th class="right">카테고리명</th>
								<td>
									<input type="text" id="CATEGORY" name="CATEGORY" class="input_use03 validatebox-text" placeholder="예)경제총조사" style="width:200px"/>
								</td>
							</tr>							
							<tr>
								<th class="right">통계명</th>
								<td>
									<input type="text" id="TBL_NM" name="TBL_NM" class="input_use03 validatebox-text"  style="width:200px"/>
								</td>
								<th class="right">차트명</th>
								<td>
									<input type="text" id="CHART_NM" name="CHART_NM" class="input_use03 validatebox-text" style="width:200px"/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				
				<div class="tilte03">검색결과</div>
				<div class="searchBtn04">
					<a id="excel_data_download" class="excelDownload" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="excel_data_download">엑셀 다운로드</label>
					</a>
					<a id="new_register" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="new_register">신규등록</label>
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
		<!-- cls:footer end -->
		<div class="popupWrapper" id="popup" style="left: 0">
			<div class="popupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">신규등록</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="popupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">관심분야 아이디</th>
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
									<th>관심분야 명</th>
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
					</form>
					<div class="btnbox">
						<a id="save" 	class="save" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" 	class="cancel" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a>
					</div>
				</div>
			</div>
		</div>
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
</html>