<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<script>
		$(document).ready(function(){
			ststistics.insertck = false;
			ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSSubKeyWordMng.do'  , search_button : 'search' , search_box : 'resetForm' });
			ststistics.grid.create({
				target 	: 'datagrid-view' , 
				header : [
					{column : 'rnum' 			, type : 'text' 	, name : '순번' 		, style : {"width" : '50px'}},
					{column : 'ctlgSimilrKwrd' 	, type : 'text' 	, name : '유사키워드' 	, style : {"width" : '490px'}},
					{column : 'sumCnt' 			, type : 'text' 	, name : '메인키워드' 	, style : {"width" : '100px'}},
					{column : 'useYnValue' 		, type : 'text' 	, name : '서비스여부' 	, style : {"width" : '100px'}}
				] ,
				row_callback : function(rObject){
					ststistics.insertck = false;
					if(rObject.cellIndex == 2) ststistics.popup({type : 'KeyWord'});
					else ststistics.popup({type : 'detail' });
				}
			});
			
			ststistics.register = function(){
				ststistics.insertck = true;
				$("#popup , .popupWrapper").show();
				ststistics.set_value({target : 'popup' , clear : true});
			}
			
			//등록
			$("#save").on("click",function(){
				if(ststistics.insertck){
					ststistics.asynchronous({url : '/api/ststistics/idcheckStstisticsUSSubKeyWordMng.do' , data : { ctlgSubKwrd :$("#ctlgSubKwrd").val() } ,callback : function(resBody){
						if(resBody.code == 0){
							ststistics.save();
						}else{
							alert("이미 ID값이 존재합니다.");
						}}});
				}else{
					ststistics.save();
				}
			});
			
			ststistics.save = function(){
				ststistics.store({store_url : '/api/ststistics/registerStstisticsUSSubKeyWordMng.do' , store_box : 'popupForm' , validation : true , 
					validationFn : function(){
						//필수값 공백일 경우 알림
						if(isRequired($("#ctlgSubKwrd").val())){
							return ststistics.message({message :"유사키워드를 입력해주세요" , returnValue : false});
						}else if(isRequired($("#popupForm").find("#useYn").val())){
							return ststistics.message({message :"서비스 여부를 입력해주세요" , returnValue : false});
						}
					return true;
					}
				});
			}
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
			<div class="lefitMenuWrapper">
				<script type="text/javascript">
					makeLeftMenu("3", "10", "4");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span class="fontS">유사키워드 관리</span>
					</p>
				</div>
				<p class="title01">유사키워드 관리</p>
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="130" />
							<col width="300" />
							<col width="130" />
							<col width="130" />
						</colgroup>
						<tbody>
							<tr>
								<th class="right">키워드명</th>
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text" />
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
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				<div class="searchBtn04">
					<a id="excel_templete_download" href="<c:url value="/api/ststistics/excelTempleteDownLoad.do?type=subKeyWord"/>"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="excel_templete_download">엑셀 양식 다운로드</label>
					</a>
					<a id="excel_upload" href="javascript:alert('준비중');"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="update">엑셀 업로드</label>
					</a>
					<a id="excel_download" href="<c:url value="/api/ststistics/excelDataDownLoad.do?type=subKeyWord"/>" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
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
										<select class="input_use08" id="useYn" name="useYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>키워드명</th>
									<td>
										<input type="text" id="ctlgSimilrKwrd" name="ctlgSimilrKwrd" maxlength="50" class="input_use13" />
										<input type="hidden" id="ctlgSimilrKwrdSerial" name="ctlgSimilrKwrdSerial" maxlength="50" class="input_use13" />
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