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
		drawGrid();
		
		// 검색 클릭 이벤트 재 작성 - 이유: 검색을 하기 전에 검색 조건을 잘 작성했는지 확인하기 위함이다.
		// 기존 검색 버튼에 대한 클릭 이벤트에는 그런 게 없다.
		$(document.querySelector('#search')).unbind('click');	// 1. 일단 걸려있는 이벤트를 잘라낸다(unbind).
		console.log("the event of #search has been changed for search condition value's validation check !!!!");
		$('#search').on("click",function(){						// 2. 검색 버튼 클릭 이벤트를 다시 작성한다. 참고로 맨 밑의 2줄은 ststistics.js 의 initialize 메서드에서 배껴온 것이다.
			$('.pageNo').val('1');				// 배껴온 코드
			$s.grid.create($s.grid.parameter);	// 배껴온 코드, $s.grid는 전역에서 접근 할 수 있기 때문에 이렇게 사용할 수 있다.
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
			location.href= pageContext + '/ststistics/ststisticsUSTotalStblRegister.do';
		});		
		
		$.ajax({
			method: "POST",
			async: false,	// 반드시 동기처리 해야 함
			url: pageContext + "/ststistics/selectStattbDiv.do",
			dataType: "json",
			success: function(res) {
				var str = "";
				str += "<option value=''>선택하세요</option>";
				for(var i=0; i<res.resultList.length; i++) {
					str += "<option value='" + res.resultList[i].stattbDiv + "'>" + res.resultList[i].stattbDiv + "</option>";
				}
				
				$("#STATTB_DIV").html(str);
			}
		});
		
		$(".iconBox button").on("click", function(e) {
			let btnId = $(this).prop("id");
			if(btnId == "populationDash") {	//인구
				
			} else if(btnId == "houseHoldDash") { //가구
				
			} else if(btnId == "houseDash") { //주택
				
			} else if(btnId == "farmDash") { //농업
				
			} else if(btnId == "forestryDash") {	//임업
				
			} else if(btnId == "fisheryDash") {	//어업
				
			} else if(btnId == "ecnmyDash") {	//경제
				dataForm.action = "/view/totSurv/ecnmyDash";
				dataForm.submit();
			}
		});		
	});
	//ready 끝
	
	function drawGrid() {
		ststistics.insertck = false; 
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSTotalStblList.do'  , search_button : 'search' , search_box : 'resetForm' });
		ststistics.grid.create({
			target 	: 'datagrid-view' ,
			header : [
				{column : 'rnum' ,		type : 'text',	name : '항목순번'		,	style : {"width" : '60px'}},
				{column : 'stattbDiv' ,		type : 'text',	name : '통계구분'		,	style : {"width" : '100px'}},
				{column : 'stattbYear' ,	type : 'text',	name : '통계시기'		,	style : {"width" : '60px'}},
				{column : 'tblNm' ,		type : 'text',	name : '통계표명'		,	style : {"width" : '280px'}},				
				{column : 'stattbSourc' ,		type : 'text',	name : '출처'		,	style : {"width" : '170px'}},
				{column : 'stattbOrder' ,		type : 'text',	name : '표출<br>순위'		,	style : {"width" : '60px'}},
			] , 
			row_callback : function(rObject){
				ststistics.insertck = false;
				$("#dataForm").attr("action", pageContext + "/ststistics/ststisticsUSTotalStblInfo.do");
				$("#isModify").val(false), $("#orgId").val(rObject.itmInfo.orgId), $("#tblId").val(rObject.itmInfo.tblId);
				$("#dataForm").submit();
			}
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
						<span class="fontS"> 대쉬보드 차트 관리</span>
					</p>
				</div>
				<p class="title01">대쉬보드 차트 관리</p><!--2019-02-19 수정  -->
				<form id="dataForm" method="POST">
					<input type="hidden" id="serviceKey" name="serviceKey" value="%ED%86%B5%EA%B3%84%EC%A7%80%EB%A6%AC%EC%A0%95%EB%B3%B4%EC%84%9C%EB%B9%84%EC%8A%A4%EA%B4%80%EB%A6%AC"/>
				</form>
				<div class="iconBox">
					<button id="populationDash" class="deActive">인 구</button>
					<button id="houseHoldDash" class="deActive">가 구</button>
					<button id="houseDash" class="deActive">주 택</button><br/>
					<button id="farmDash" class="deActive">농 업</button>
					<button id="forestryDash" class="deActive">임 업</button>
					<button id="fisheryDash" class="deActive">어 업</button><br/>
					<button id="ecnmyDash">경 제</button>
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