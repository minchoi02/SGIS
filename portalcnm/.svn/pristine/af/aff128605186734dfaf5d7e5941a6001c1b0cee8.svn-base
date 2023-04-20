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
		
		//달력나오는부분
		setDatepickerDefaultRangeNew('reg_startDate','reg_endDate');
		setDatepickerDefaultRangeNew('mod_startDate','mod_endDate');
		
		ststistics.insertck = false; 
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSTotalSurveyMng.do'  , search_button : 'search' , search_box : 'resetForm' });
		ststistics.grid.create({
			target 	: 'datagrid-view' , 
			header : [
				{column : 'rnum' ,		type : 'text',	name : '항목순번'		,	style : {"width" : '60px'}},
				{column : 'stattbYear' ,	type : 'text',	name : '통계시기'		,	style : {"width" : '80px'}},
				{column : 'tblNm' ,		type : 'text',	name : '통계정보'		,	style : {"width" : '280px'}},
				{column : 'stattbSourc' ,		type : 'text',	name : '출처'		,	style : {"width" : '250px'}},
				{column : 'stattbOrder' ,		type : 'text',	name : '표출<br>순위'		,	style : {"width" : '60px'}},
			] , 
			row_callback : function(rObject){
				ststistics.insertck = false; 
				//console.log("the ID value is " + $('.datagrid-body tbody tr:eq("'+rObject.rowIndex+'") td:eq("0")').text());
				//var id =  $('.datagrid-body tbody tr:eq("'+rObject.rowIndex+'") td:eq("0")').text();
				location.href = pageContext+'/ststistics/ststisticsUSTotalSurveyRegister.do?tblGrpId='+rObject.key;
			}
		});
		
		
		
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
			$s.grid.create($s.grid.parameter);	// 배껴온 코드, $s.grid는 전역에서 접근 할 수 있기 때문에 이렇게 사용할 수 있다.
		});
		
		
		// 항목 대분류에서 제일 왼쪽 항목에서 대시보드 일때만 중분류, 소분류를 선택할 수 있다. 
		$('#ITEM_B_CLASS_ID').on('change',function(e){
			//if(this.value === 'BRD') {	// 대시보드 일 때
			if(this.value.startsWith('BRD')) {
				disableOrEnableInputs('depend_on_b_class',false);
			} else {					// 상세 페이지 일때, this.value = DLT
				disableOrEnableInputs('depend_on_b_class',true);
				selectElementChangeValue('depend_on_b_class','');
			}
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
			location.href= pageContext + '/ststistics/ststisticsUSTotalSurveyRegister.do';
		});		
		
		
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
						<span class="fontS"> 총조사시각화 관리</span>
					</p>
				</div>
				<p class="title01">총조사시각화 관리</p><!--2019-02-19 수정  -->
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="15%" />
							<col width="35%" />
							<col width="15%" />
							<col width="35%" />
						</colgroup>
						<tbody>
							<tr><td colspan="4" style="text-align:center;">조회조건 추후 정의</td></tr>
							<!-- <tr>							
								<th class="right">항목 분류</th>
								<td colspan="3">
									<select class="input_use29" id="ITEM_B_CLASS_ID" name="ITEM_B_CLASS_ID">
										<option value="">선택하세요</option>
										<option value="BRD_INFO">대시보드(정보)</option>
										<option value="N">대시보드(차트)</option>
										<option value="Y">통계더보기</option> 상세페이지 > 통계 더보기
									</select>
									ITEM_M_CLASS_ID의 값은  ITEM_B_CLASS_ID의 값이 BRD 일 때만 활성화 된다
									<select class="input_use29 depend_on_b_class" id="ITEM_M_CLASS_ID" name="ITEM_M_CLASS_ID" disabled="disabled">
										<option value="">선택하세요</option>
										<option value="PP">인구</option>
										<option value="FM">가구</option>
										<option value="HS">주택</option>
										<option value="FR">농업</option>
										<option value="FT">임업</option>
										<option value="FS">어업</option>
										<option value="FS">경제</option>
									</select>
									ITEM_S_CLASS_ID의 값은  ITEM_B_CLASS_ID의 값이 BRD 일 때만 활성화 된다
									<select class="input_use29 depend_on_b_class" id="ITEM_S_CLASS_ID" name="ITEM_S_CLASS_ID" disabled="disabled">
										<option value="">선택하세요</option>
										<option value="TOT">전국</option>
										<option value="SIDO">시도</option>
										<option value="SGG">시군구</option>
										<option value="TS">시계열</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="right">통계정보</th>
								<td>
									<input type="text" id="SURV_NM" name="SURV_NM" class="input_use03 validatebox-text"  style="width:200px"/>
								</td>
								<th class="right">자료명</th>
								<td>
									<input type="text" id="DATA_NM" name="DATA_NM" class="input_use03 validatebox-text" style="width:200px"/>
								</td>
							</tr>							
							<tr>
								<th class="right">표출순위</th>
								<td colspan="3">
									<input type="text" id="DISP_RANK" name="DISP_RANK" class="input_use03 validatebox-text"  style="width:200px"/>
								</td>
							</tr> -->
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