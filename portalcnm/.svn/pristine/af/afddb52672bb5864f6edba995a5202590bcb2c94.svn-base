<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<!-- 2020년 SGIS고도화 3차 시작 - 스타일 시트 추가 -->
	<style>
		/* 조회조건 - 차트 유형 스타일링 시작  */
		.radioBtnWrapper > input[type='radio'] {
			vertical-align:middle;
		}
		
		.radioBtnWrapper > input[type='radio'] + label {
			margin:0px 15px 0px 5px;
		}
		
		
		.radioBtnWrapper > input[type='radio']:checked + label {
			font-weight:bold;
		}
		
	</style>
	<!-- 2020년 SGIS고도화 3차 끝 - 스타일 시트 추가 -->
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' /><!--2020년 SGIS고도화 3차 - 팝업 생성 후 스크롤 동작시 뒷배경 이상현상, css 추가   -->
	<script>
	$(document).ready(function(){
		 $('input[type="checkbox"][name="sortType"]').click(function(){          
			 
	            if ($(this).prop('checked')) {
	                $('input[type="checkbox"][name="sortType"]').prop('checked', false);
	                $(this).prop('checked', true);
	            }
	        });
		
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSKeyWordMng.do'  , search_button : 'search' , search_box : 'resetForm' });
		ststistics.grid.create({
			target 	: 'datagrid-view' , 
			header : [
				{column : 'rnum' 				, type : 'text' 		, name : '순번' 			, style : {"width" : '50px'}},
				//{column : 'ctlgMainKwrd' 		, type : 'text' 		, name : '키워드명' 		, style : {"width" : '490px'}},// 2020년 SGIS고도화 3차 주석
				{column : 'ctlgMainKwrd' 		, type : 'text' 		, name : '키워드명' 		, style : {"width" : '290px'}},// 2020년 SGIS고도화 3차
				{column : 'searchCnt' 		, type : 'text' 		, name : '검색횟수' 		, style : {"width" : '100px'}},// 2020년 SGIS고도화 3차
				{column : 'sumCnt' 			, type : 'text' 		, name : '서비스' 		, style : {"width" : '100px'}},
				{column : 'useYnValue' 			, type : 'text' 		, name : '서비스여부' 		, style : {"width" : '80px'}},
				//{column : 'mapping' 			, type : 'text' 	, name : '매핑정보' 		, style : {"width" : '100px'}},
				{column : 'regTs' 			, type : 'text' 		, name : '등록일자' 		, style : {"width" : '70px'}},// 2020년 SGIS고도화 3차
				// 2020년 SGIS고도화 3차 시작
				{column : 'button' 			, type : 'button' 		, name : '삭제' 		, style : {"width" : '50px'}, callback : function(obj){
					console.log(obj.ctlgMainKwrdSerial);
					if(!confirm("삭제 하시겠습니까?"))return false;
					ststistics.asynchronous({
						url : '/api/ststistics/removeKeyword.do' ,
						data : {'ctlgMainKwrdSerial':obj.ctlgMainKwrdSerial},
						callback : function(resBody){
							if(resBody == 0){
								alert("삭제 하였습니다.");
							}
						}
					});
				}}
				// 2020년 SGIS고도화 3차 끝
			] , 
			row_callback : function(rObject){
				if(rObject.cellIndex == 3) ststistics.popup({type : 'Service'});
				else ststistics.popup({type : 'detail' });
			}
		});
	
		ststistics.register = function(){
			$("#popup , .popupWrapper").show();
			ststistics.set_value({target : 'popup' , clear : true});
		}
		
		$("#save").on("click",function(){
			ststistics.store({store_url : '/api/ststistics/registerStstisticsUSKeyWordMng.do' , store_box : 'popupForm' , validation : true , 
				validationFn : function(){
					if(isRequired($("#popupForm").find("#useYn").val())){
						return ststistics.message({message :"서비스 여부를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#popup #ctlgMainKwrd").val())){
						return ststistics.message({message :"키워드명을 입력해주세요" , returnValue : false});
					}
					return true;
				}
			});
		});
		
		var file = $("<form id='excelForm' enctype='multipart/form-data' style='height:0' ><input type='file' id='excel_file' name='excel_file' /></form>");
		$(".wrapper").append(file);
		$("#excel_file").on("change" ,function(){
			ststistics.store({store_url : '/api/ststistics/excelParseKeyWord.do' , isFile : true ,  store_box : 'excelForm' , validation : true , 
				validationFn : function(){
					return true;
				}
			});
		});
		
		//20201127 2020년 SGIS고도화 3차 시작
		excelUpload = function(){
			$('#excel_file').click();
		}
		//20201127 2020년 SGIS고도화 3차 끝
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
			<!--<div class="lefitMenuWrapper"> --><!--2020년 SGIS고도화 3차 - 주석-->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					makeLeftMenu("3", "10", "3");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span> My통계로</span><!--2020-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">키워드 관리</span>
					</p>
				</div>
				<p class="title01">키워드 관리</p>
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<!-- 2020년 SGIS고도화 3차 시작 - 조회조건 열 너비 변경 -->
							<!-- 
							<col width="130" />
							<col width="300" />
							<col width="130" />
							<col width="130" />
							 -->
							<col width="15%" />
							<col width="35%" />
							<col width="20%" />
							<col width="30%" />
							<!-- 2020년 SGIS고도화 3차 끝  - 조회조건 열 너비 변경  -->
						</colgroup>
						<tbody>
							<tr>
								<th class="right">키워드명</th>
								<td>
									<!--<input type="text" id="ctlgMainKwrd" name="ctlgMainKwrd" class="input_use03 validatebox-text" /> --><!-- 2020년 SGIS고도화 3차 주석  -->
									<input type="text" id="word" name="ctlgMainKwrd" class="input_use03 validatebox-text" style="width: 220px;"/><!-- 2020년 SGIS고도화 3차(엔터이벤트 수정 및 width값 수정)  -->
								</td>
								<th class="right">서비스여부</th>
								<td>
									<select class="input_use08" id="useYn" name="useYn">
										<option value="">전체</option>
										<option value="N">비활성</option>
										<option value="Y">활성</option>
									</select>
								</td>
							</tr>
							<!-- 2020년 SGIS고도화 3차 시작 - 정렬방식 결정을 위한 html 추가 -->
							<tr>
								<th class="right"><input type="checkbox" name="sortType" value="date" checked>등록일 정렬</th>
								<td>
									<div class="radioBtnWrapper">
										<input type="radio" name="registerDateSort" id="registerDateSortDesc" value="desc" checked="checked">
										<label for="registerDateSortDesc">내림차순</label>
										<input type="radio" name="registerDateSort" id="registerDateSortAsc" value="asc">
										<label for="registerDateSortAsc">오름차순</label>
									</div>
								</td>
								<!-- 20201127 2020년 SGIS고도화 3차(검색횟수정렬->키워드명정렬 변경) 시작-->
								<!-- 
								<th class="right">검색횟수 정렬</th>
								<td>
									<div class="radioBtnWrapper">
										<input type="radio" name="searchCntSort" id="searchCntSortDesc" value="desc" checked="checked">
										<label for="searchCntSortDesc">내림차순</label>
										<input type="radio" name="searchCntSort" id="searchCntSortAsc" value="asc">
										<label for="searchCntSortAsc">오름차순</label>
									</div>
								</td>
								 -->
								<th class="right"><input type="checkbox" name="sortType" value="kwrd" >키워드명 정렬</th>
								<td>
									<div class="radioBtnWrapper">
										<input type="radio" name="searchNmSort" id="searchNmSortDesc" value="desc" checked="checked">
										<label for="searchCntSortDesc">내림차순</label>
										<input type="radio" name="searchNmSort" id="searchNmSortAsc" value="asc">
										<label for="searchCntSortAsc">오름차순</label>
									</div>
								</td>
							</tr>
							<!-- 20201127 2020년 SGIS고도화 3차(검색횟수정렬->키워드명정렬 변경)끝-->
							<!-- 2020년 SGIS고도화 3차 끝 - 정렬방식 결정을 위한 html 추가 -->
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				<div class="searchBtn04">
					<a id="excel_templete_download" href="<c:url value="/api/ststistics/excelTempleteDownLoad.do?type=keyWord"/>"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="excel_templete_download">엑셀 양식 다운로드</label>
					</a>
					<a id="excel_upload" href="javascript:void(0);"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;" onclick="excelUpload();"><!--  20201127 2020년 SGIS고도화 3차 -->
						<label style="cursor: pointer;" for="update">엑셀 업로드</label>
					</a>
					<a id="excel_download" href="<c:url value="/api/ststistics/excelDataDownLoad.do?type=keyWord"/>" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="update">엑셀 다운로드</label>
					</a>
					<a  href="javascript:$s.register();" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="register">신규등록</label>
					</a>
				</div>
				<table class="apiTable03" summary="검색결과"></table>
				<div class="panel datagrid">
					<div class="datagrid-wrap panel-body panel-body-noheader">
						<div class="datagrid-view" style="width: 745px; height: 330px; padding-top:5px;" id="datagrid-view"></div>
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
					<form id="popupForm">
						<input type="hidden" id="CATEGORY_ID" />
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">서비스 여부</th>
									<td>
										<select class="input_use08" id="useYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>키워드명</th>
									<td>
										<input type="text" id="ctlgMainKwrd" name="ctlgMainKwrd" maxlength="50" class="input_use13" />
										<input type="hidden" id="ctlgMainKwrdSerial" name="ctlgMainKwrdSerial" maxlength="50" class="input_use13" />
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="save" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a>
<%-- 						<a id="save" class="register" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_regist02.png"/>' alt="저장" /></a>  --%>
<%-- 						<a class="cancel" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_cancel.png"/>' alt="취소" /></a> --%>
					</div>
				</div>
			</div>
		</div>
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
</html>