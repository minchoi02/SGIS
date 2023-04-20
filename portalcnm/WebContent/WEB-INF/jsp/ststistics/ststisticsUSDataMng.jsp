<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<script>
	$(document).ready(function(){
		
		$("#exp_upload").on("click",function(){
			ststistics.asynchronous({url : '/api/ststistics/proccessExpUpload.do' , data : {} ,callback : function(resBody){
				if (resBody.expRelTb != null || resBody.expRelTb != undefined) {
					alert("성공.");
					return false;
				}
				alert("실패.");
			}});
			return false;
		});
		
		ststistics.mode = 0;
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSDataMng.do'  , search_button : 'search' , search_box : 'resetForm' });
		//	그리드 생성  
		ststistics.grid.create({
			target 	: 'datagrid-view' , 
			header : [
				{column : 'rnum' 			, type : 'text' 	, name : '순번' 		, style : {"width" : '50px'}},
				{column : 'statDataNm' 		, type : 'text' 	, name : '통계자료명' 	, style : {"width" : '440px'}},
				{column : 'kwordCount' 		, type : 'text' 	, name : '키워드' 	, style : {"width" : '90px'}},
				{column : 'dstncCount' 		, type : 'text' 	, name : '관심분야' 	, style : {"width" : '90px'}},
// 				{column : 'lfecycleCount' 	, type : 'text' 	, name : '생애주기수' 	, style : {"width" : '90px'}},
				{column : 'srvYnValue' 		, type : 'text' 	, name : '서비스여부' 	, style : {"width" : '70px'}}
			] , 
			row_callback : function(rObject){
				if(rObject.cellIndex == 2) 		ststistics.popup({type : 'MainKeyWord' ,});
				else if(rObject.cellIndex == 3) ststistics.popup({type : 'Datainterests'});
				else ststistics.popup({type : 'detail' });
				ststistics.mode = 2;//수정
				$("#menuNm").attr("disabled",true);
				$("#srvNm").attr("disabled",true);
			}
		});
		
		ststistics.register = function(){
			$("#menuNm").attr("disabled",false);
			$("#popup , .popupWrapper").show();
			ststistics.set_value({target : 'popup' , clear : true});
			ststistics.mode = 1;//등록
			$("#srvNm").attr("disabled",false);
			return false;
		};
		
		$("#save").on("click",function(){
			if(ststistics.mode == 1){
				//ID중복체크
				ststistics.asynchronous({url : '/api/ststistics/idcheckStstisticsUSDataMng.do' , data : { statDataId :$("#statDataId").val() } ,callback : function(resBody){
					if(resBody.code == 0){
						ststistics.save();
						return false;
					} 
					alert("이미 ID값이 존재합니다.");
				}});
			}else{
				ststistics.save();
			}
		});
		
		
		ststistics.save = function(){
			ststistics.store({store_url : '/api/ststistics/registerOrEditStstisticsUSDataMng.do' , store_box : 'popupForm' , validation : true , 
				validationFn : function(){
					//필수값 공백일 경우 알림
					if(isRequired($("#menuNm").val())){
						return ststistics.message({message :"메뉴 명을 입력해주세요" , returnValue : false});
					}else if(isRequired($("#popupForm").find("#statDataNm").val())){
						return ststistics.message({message :"통계 자료명을 입력해주세요" , returnValue : false});
					}else if(isRequired($("#popupForm").find("#statDataSrvNm").val())){
						return ststistics.message({message :"통계 자료 서비스명을 입력해주세요" , returnValue : false});
					}
					
					
					
					/*else if(isRequired($("#statDataId").val())){
						return ststistics.message({message :"통계 자료코드를 입력해주세요" , returnValue : false});
					} else if(isRequired($("#popupForm").find("#statDataNm").val())){
						return ststistics.message({message :"통계 자료명을 입력해주세요" , returnValue : false});
					}else if(isRequired($("#srvNm").val())){
						return ststistics.message({message :"서비스 명을 입력해주세요" , returnValue : false});
					}else if(isRequired($("#BClassNm").val())){
						return ststistics.message({message :"대분류 명을 입력해주세요" , returnValue : false});
					}else if(isRequired($("#MClassNm").val())){
						return ststistics.message({message :"중분류 명을 입력해주세요" , returnValue : false});
					}else if(isRequired($("#SClassNm").val())){
						return ststistics.message({message :"소분류 명을 입력해주세요" , returnValue : false});
					}else if(isRequired($("#source").val())){
						return ststistics.message({message :"출처를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#baseYear").val())){
						return ststistics.message({message :"기준년도를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#statDataBaseYear").val())){
						return ststistics.message({message :"통계데이터 기준년도를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#updtPeriod").val())){
						return ststistics.message({message :"갱신 주기를 입력해주세요" , returnValue : false});
					}else if(!$("input:checkbox[id='sidoDispYn']").is(":checked")&&!$("input:checkbox[id='sggDispYn']").is(":checked")&&!$("input:checkbox[id='emdongDispYn']").is(":checked")&&!$("input:checkbox[id='totRegDispYn']").is(":checked")&&!$("input:checkbox[id='gridDispYn']").is(":checked")){
						return ststistics.message({message :"표출 여부를 입력해주세요" , returnValue : false});
					}else if(!$("input:checkbox[id='colorDispYn']").is(":checked")&&!$("input:checkbox[id='ballnDispYn']").is(":checked")&&!$("input:checkbox[id='tpDispYn']").is(":checked")&&!$("input:checkbox[id='poiDispYn']").is(":checked")){
						return ststistics.message({message :"지도 유형를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#srvYn").val())){
						return ststistics.message({message :"서비스 여부를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#statDataExp").val())){
						return ststistics.message({message :"설명을 입력해주세요" , returnValue : false});
					} */
					return true;
				}
			});
		}
		
		var file = $("<form id='excelForm' enctype='multipart/form-data' style='height:0' ><input type='file' id='excel_file' name='excel_file' /></form>");
		$(".wrapper").append(file);
		$("#excel_file").on("change" ,function(){
			ststistics.store({store_url : '/api/ststistics/excelParseData.do' , isFile : true ,  store_box : 'excelForm' , validation : true , 
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
			<!--<div class="lefitMenuWrapper"> -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					//makeLeftMenu("3", "10", "6");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
					makeLeftMenu("3", "10", "5"); //탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴// 2020년 SGIS고도화 3차 - 새로운 페이지 생성으로 인한 makeLeftMenu 마지막 파라미터 값 수정
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
						<span> My통계로</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">서비스 관리</span>
					</p>
				</div>
				<p class="title01">서비스 관리</p><!--2019-02-19 수정  -->
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
<%-- 					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a> --%>
					<a id="searchBtn" href="javascript:void(0);" class="searchBtn" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 23px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="searchBtn">검색</label>
					</a>
				
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="100" />
							<col width="100" />
							<col width="100" />
							<col width="100" />
							<col width="100" />
							<col width="100" />
						</colgroup>
						<tbody>
							<tr>
								<th class="right">통계자료명</th>
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text" style="width:125px;"/>
								</td>
								<th class="right">서비스여부</th>
								<td>
									<select class="input_use08" id="useYn" name="useYn">
										<option value="">전체</option>
										<option value="N">비활성</option>
										<option value="Y">활성</option>
									</select>
								</td>
								<!-- 20201127 2020년 SGIS고도화 3차 추가 시작 -->
								<th class="right">통계자료명 정렬</th>
								<td>
									<div class="radioBtnWrapper">
										<input type="radio" name="searchNmSort" id="searchNmSortDesc" value="desc" checked="checked">
										<label for="searchCntSortDesc">내림차순</label>
										<input type="radio" name="searchNmSort" id="searchNmSortAsc" value="asc">
										<label for="searchCntSortAsc">오름차순</label>
									</div>
								</td>
								<!-- 20201127 2020년 SGIS고도화 3차 추가 끝-->
							</tr>
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				<div class="searchBtn04">
					<a id="exp_upload" href="javascript:void(0);"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;display:none;">		
						<label style="cursor: pointer;" for="excel_templete_download">설명갱신</label>
					</a>
					<a id="excel_templete_download" href="<c:url value="/api/ststistics/excelTempleteDownLoad.do?type=data"/>"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="excel_templete_download">엑셀 양식 다운로드</label>
					</a>
					<a id="excel_upload" href="javascript:void(0);"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;" onclick="excelUpload();"><!--  20201127 2020년 SGIS고도화 3차 -->
						<label style="cursor: pointer;" for="update">엑셀 업로드</label>
					</a>
					<a id="excel_download" href="<c:url value="/api/ststistics/excelDataDownLoad.do?type=data"/>" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="excel_download">엑셀 다운로드</label>
					</a>
					<!-- <a id="excel_download" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="excel_download">엑셀 다운로드</label>
					</a> -->
					<a id="register" href="javascript:ststistics.register();" class="register" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
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
		<!-- 2020년 SGIS고도화 3차 시작 - 팝업 생성시 스크롤에 의한 문제점 개선 -->
		<!--	<div class="popupWrapper"> --><!-- 주석 -->
		<!--		<div class="aplPopupWrapper">--><!-- 주석 -->
			<div> 	<!-- 참고) 본래 이 div는 class="popupWrapper" 클래스 값을 가졌던 것을 삭제함. div 자체를 삭제하는 것 위험하다고 생각해서 하지 않음 -->
				<div class="aplPopupWrapper" style="margin-top: 5%;">
		<!-- 2020년 SGIS고도화 3차 끝 - 팝업 생성시 스크롤에 의한 문제점 개선 -->
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
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th>메뉴명</th>
									<td  colspan="3">
<!-- 										<input type="text" id="menuNm"  maxlength="50" class="input_use13" title="서비스명"/> -->
										<select id="menuNm" name="menuNm" class="input_use08" style="width:512px" disabled>
											<option value="">선택하세요.</option>
											<option value="대화형 통계지도">대화형 통계지도</option>
											<option value="살고싶은 우리동네">살고싶은 우리동네</option>
											<option value="업종통계지도: 기술업종통계지도">업종통계지도: 기술업종통계지도</option>
											<option value="업종통계지도: 생활업종통계지도">업종통계지도: 생활업종통계지도</option>
											<option value="일자리 맵">일자리 맵</option>
											<option value="정책통계지도">정책통계지도</option>
											<option value="통계주제도">통계주제도</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>통계자료코드</th>
									<td  colspan="3">
										<input type="text" id="statDataId"  maxlength="50" class="input_use13" title="통계자료코드" disabled/>
									</td>
								</tr>
								<tr>
									<th>통계자료명</th>
									<td  colspan="3">
										<input type="text" id="statDataNm"  maxlength="50" class="input_use13" title="통계자료명"/>
									</td>
								</tr>
								
								<tr>
									<th>서비스명</th>
									<td  colspan="3">
										<input type="text" id="srvNm"  maxlength="50" class="input_use13" title="서비스명" disabled="disabled"/>
									</td>
								</tr>
								
								<tr>
									<th>통계자료서비스명</th>
									<td  colspan="3">
										<input type="text" id="statDataSrvNm"  maxlength="50" class="input_use13" title="통계자료 서비스명"/>
									</td>
								</tr>
								
								<tr>
									<th>대표키워드</th>
									<td  colspan="3">
										<input type="text" id="mainKwrd"  maxlength="50" class="input_use13" title="대표키워드"/>
									</td>
								</tr>
								<tr>
									<th>대분류명</th>
									<td  colspan="3">
										<input type="text" id="BClassNm"  maxlength="50" class="input_use13" title="통계자대분류명료명"/>
									</td>
								</tr>
								<tr>
									<th>중분류명</th>
									<td  colspan="3">
										<input type="text" id="MClassNm"  maxlength="50" class="input_use13" title="중분류명"/>
									</td>
								</tr>
								<tr>
									<th>소분류명</th>
									<td  colspan="3">
										<input type="text" id="SClassNm"  maxlength="50" class="input_use13" title="소분류명"/>
									</td>
								</tr>
								<tr>
									<th>출처</th>
									<td colspan="3"><input type="text" id="source" maxlength="50" class="input_use13" /></td>
								</tr>
								<tr>
									<th>기준 년도</th>
									<td><input type="text" id="baseYear" maxlength="50" class="input_use13" /></td>
								</tr>
								<tr>
									<th>통계데이터 기준 년도</th>
									<td><input type="text" id="statDataBaseYear" maxlength="50" class="input_use13" /></td>
								</tr>
								<tr>
									<th>갱신 주기</th>
									<td><input type="text" id="updtPeriod" maxlength="50" class="input_use13" /></td>
								</tr>	
								<tr>
									<th>표출 여부</th>
									<td colspan="3">
										<input type="checkbox" id="sidoDispYn" name="sidoDispYn" class="input_use09" /><label for="sidoDispYn" class="ml_5">시도</label>
										<input type="checkbox" id="sggDispYn" name="sggDispYn" class="input_use09 ml_10" /><label for="sggDispYn" class="ml_5">시군구</label>
										<input type="checkbox" id="emdongDispYn" name="emdongDispYn" class="input_use09 ml_10" /><label for="emdongDispYn" class="ml_5">읍면동</label>
										<input type="checkbox" id="totRegDispYn" name="totRegDispYn" class="input_use09 ml_10" /><label for="totRegDispYn" class="ml_5">집계구</label>
										<input type="checkbox" id="gridDispYn" name="gridDispYn" class="input_use09 ml_10" /><label for="gridDispYn" class="ml_5">격자</label>
									
									</td>
								</tr>
								<tr>
									<th>지도 유형</th>
									<td colspan="3">
										<input type="checkbox" id="colorDispYn" name="colorDispYn" class="input_use09" /><label for="colorDispYn" class="ml_5">색상지도</label>
										<input type="checkbox" id="ballnDispYn" name="ballnDispYn" class="input_use09 ml_10" /><label for="ballnDispYn" class="ml_5">버블지도</label>
										<input type="checkbox" id="tpDispYn" name="tpDispYn" class="input_use09 ml_10" /><label for="tpDispYn" class="ml_5">열지도</label>
										<input type="checkbox" id="poiDispYn" name="poiDispYn" class="input_use09 ml_10" /><label for="poiDispYn" class="ml_5">POI지도</label>
									
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">서비스 여부</th>
									<td  colspan="3">
										<select class="input_use08 width161" id="srvYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>설명관련테이블</th>
									<td colspan="3"><input type="text" id="expRelTb" maxlength="50" class="input_use13" /></td>
								</tr>
								<tr>
									<th>설명관련컬럼</th>
									<td colspan="3"><input type="text" id="expRelExpCol" maxlength="50" class="input_use13" /></td>
								</tr>
								<tr>
									<th>설명관련ID컬럼</th>
									<td colspan="3"><input type="text" id="expRelIdCol" maxlength="50" class="input_use13" /></td>
								</tr>
								<tr>
									<th>설명관련아이디</th>
									<td colspan="3"><input type="text" id="expRelId" maxlength="50" class="input_use13" /></td>
								</tr>
								<tr>
									<th>설명</th>
									<td colspan="3">
										<textarea rows="2" cols="20" class="input_use10" style="resize: none" id="statDataExp" ></textarea>
									</td>
								</tr>
								<tr>
									<th>부가설명</th>
									<td colspan="3">
										<textarea rows="2" cols="20" class="input_use10" style="resize: none" id="statDataAddExp" ></textarea>
									</td>
								</tr>
								<!-- 2020년 SGIS고도화 3차 시작  -->
								<tr>
									<th>출처 URL</th>
									<td colspan="3"><input type="text" id="sourceUrl" maxlength="50" class="input_use13" /></td>
								</tr>
								<!-- 2020년 SGIS고도화 3차 끝 -->
							</tbody>
						</table>
					</form>
					<div class="btnbox">
<%-- 						<a id="save" class="save" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_regist02.png"/>' alt="저장" /></a>  --%>
<%-- 						<a class="cancel" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_cancel.png"/>' alt="취소" /></a> --%>
						<a id="save" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a>
					</div>
				</div>
			</div>
		</div>
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
<form id="excelDownForm" name="excelDownForm" method="post">
</form>
</html>