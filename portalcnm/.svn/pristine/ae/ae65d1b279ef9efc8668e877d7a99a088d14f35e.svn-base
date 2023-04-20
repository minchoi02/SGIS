<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<script>
		$(document).ready(function(){
			
			ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSAccumulateKeyWordMng.do'  , search_button : 'search' , search_box : 'resetForm' });
			ststistics.grid.create({
				target 	: 'datagrid-view' , 
				header : [
					{column : 'rnum' 		, type : 'text' 	, name : '순번' 		, style : {"width" : '50px'}},
					{column : 'sidoNm' 		, type : 'text' 	, name : '시도' 		, style : {"width" : '100px'}},
					{column : 'sggNm' 		, type : 'text' 	, name : '시군구' 	, style : {"width" : '100px'}},
					{column : 'emdongNm' 	, type : 'text' 	, name : '읍면동' 	, style : {"width" : '100px'}},
					{column : 'accKwrd' 	, type : 'text' 	, name : '키워드' 	, style : {"width" : '289px'}},//19년수정
					{column : 'accCnt' 		, type : 'text' 	, name : '누적횟수' 	, style : {"width" : '100px'}},
				]
			});
			
			$("#sidoCd").on("change",function(){
				ststistics.clearOption("sggCd");
				ststistics.clearOption("emdongCd");
				ststistics.asynchronous(
					{
						url : '/api/ststistics/getSgg.do' , 
						data : ststistics.serialize("#resetForm") ,
						callback : function(resBody){
							$(resBody.data).each(function(index,elem){
								$("#sggCd").append('<option value="'+this.code+'">'+this.name+'</option>')
							});
						}
					}
				);
				return false;
			});
			
			$("#sggCd").on("change",function(){
				ststistics.clearOption("emdongCd");
				ststistics.asynchronous(
					{
						url : '/api/ststistics/getEmdong.do' , 
						data : ststistics.serialize("#resetForm") ,
						callback : function(resBody){
							$(resBody.data).each(function(index,elem){
								$("#emdongCd").append('<option value="'+this.code+'">'+this.name+'</option>')
							});
						}
					}
				);
				return false;
			});
			
			ststistics.clearOption = function(id){
				$("#"+id).empty();
				$("#"+id).append('<option value="">전체</option>')
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
			<!--<div class="lefitMenuWrapper"> -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					//makeLeftMenu("3", "10", "5");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
					makeLeftMenu("3", "10", "4");//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴// 2020년 SGIS고도화 3차 - 새로운 페이지 생성으로 인한 makeLeftMenu 마지막 파라미터 값 수정
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
						<span class="fontS">누적 키워드 관리</span>
					</p>
				</div>
				<p class="title01">누적 키워드 관리</p>
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
								<th class="right">지역선택</th>
								<td>
									<select class="input_use08" id="sidoCd" name="sidoCd" style="width: 192px;">
										<option value="">전체</option>
										<c:forEach items="${sido}" var="items">
											<option value="${items.code}">${items.name}</option>
										</c:forEach>
									</select>
									<select class="input_use08" id="sggCd" name="sggCd"  style="width: 192px;">
										<option value="">전체</option>
									</select>
									<select class="input_use08" id="emdongCd" name="emdongCd"  style="width: 192px;">
										<option value="">전체</option>
									</select>
								</td>
							</tr>
							<tr>
								<th class="right">키워드명</th>
								<td>
									<input type="text" id="accKwrd" name="accKwrd" class="input_use03 validatebox-text"  style="width: 575px;"/><!-- 19년수정 -->
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				
				<div class="searchBtn04">
					<a id="excel_download" href="<c:url value="/api/ststistics/excelDataDownLoad.do?type=accumulateKeyWord"/>" style=" cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
						<label style="cursor: pointer;" for="update">엑셀 다운로드</label>
					</a>
				</div>
<!-- 				<div class="searchBtn04"> -->
<!-- 					<a id="register" style="cursor: pointer" href="javascript:ststistics.register();"> -->
<%-- 						<img src='<c:url value="/html/include/img/btn/btn_regist.png"/>' alt="신규등록" /> --%>
<!-- 					</a>  -->
<!-- 				</div> -->
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
	</div>
</body>
</html>