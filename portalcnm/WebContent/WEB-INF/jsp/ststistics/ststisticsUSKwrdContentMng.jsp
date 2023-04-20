<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style>

/* 2020-06-23 박상언, 팝업 생성 후 스크롤 동작시 뒷배경 이상, css 내용 추가 (시작)*/ 
div[class^='popupWrapper']{top: 0; width: 100%; height: 100%; position:fixed;}
div[class^='popupWrapper'] > div[class^='popupWrapper'] {
	display: block !important;
	position: relative !important;
	background: none;
}
/* 2020-06-23 박상언, 팝업 생성 후 스크롤 동작시 뒷배경 이상, css 내용 추가 (끝)*/
/* 	참고) 정확한 이유는 알 수 없지만 <link>를 사용한 popupIssueFix.css 추가는 에러가 남. 
	어쩔 수 없이  popupIssueFix.css 의 내용을 복사해서 붙여 놓음. */

#tabs{
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  padding-top : 20px;
}

#tabs li{
  float: left;
  margin: 0 .5em 0 0;
}

#tabs a{
  position: relative;
  background: #ddd;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ddd));
  background-image: -webkit-linear-gradient(top, #fff, #ddd);
  background-image: -moz-linear-gradient(top, #fff, #ddd);
  background-image: -ms-linear-gradient(top, #fff, #ddd);
  background-image: -o-linear-gradient(top, #fff, #ddd);
  background-image: linear-gradient(to bottom, #fff, #ddd);  
  padding: .7em 3.5em;
  float: left;
  text-decoration: none;
  color: #444;
  text-shadow: 0 1px 0 rgba(255,255,255,.8);
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
  border-radius: 5px 0 0 0;
  -moz-box-shadow: 0 2px 2px rgba(0,0,0,.4);
  -webkit-box-shadow: 0 2px 2px rgba(0,0,0,.4);
  box-shadow: 0 2px 2px rgba(0,0,0,.4);
}

#tabs a:hover,
#tabs a:hover::after,
#tabs a:focus,
#tabs a:focus::after{
  background: #fff;
}

#tabs a:focus{
  outline: 0;
}

#tabs a::after{
  content:'';
  position:absolute;
  top: 0;
  right: -.5em;  
  bottom: 0;
  width: 1em;
  background: #ddd;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ddd));
  background-image: -webkit-linear-gradient(top, #fff, #ddd);
  background-image: -moz-linear-gradient(top, #fff, #ddd);
  background-image: -ms-linear-gradient(top, #fff, #ddd);
  background-image: -o-linear-gradient(top, #fff, #ddd);
  background-image: linear-gradient(to bottom, #fff, #ddd);  
  -moz-box-shadow: 2px 2px 2px rgba(0,0,0,.4);
  -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,.4);
  box-shadow: 2px 2px 2px rgba(0,0,0,.4);
  -webkit-transform: skew(10deg);
  -moz-transform: skew(10deg);
  -ms-transform: skew(10deg);
  -o-transform: skew(10deg);
  transform: skew(10deg);
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
  border-radius: 0 5px 0 0;  
}

#tabs #current a,
#tabs #current a::after{
  background: #fff;
}

/* ------------------------------------------------- */

#content
{
    background: #fff;
    padding: 2em;
	height: 220px;
	position: relative;
	z-index: 2;	
    -moz-border-radius: 0 5px 5px 5px;
    -webkit-border-radius: 0 5px 5px 5px;
    border-radius: 0 5px 5px 5px;
    -moz-box-shadow: 0 -2px 3px -2px rgba(0, 0, 0, .5);
    -webkit-box-shadow: 0 -2px 3px -2px rgba(0, 0, 0, .5);
    box-shadow: 0 -2px 3px -2px rgba(0, 0, 0, .5);
}

#content h2, #content h3, #content p
{
    margin: 0 0 15px 0;
}

#about
{
    color: #999;
}

#about a
{
    color: #eee;
}

</style>
</head>
<%@include file="/jsp/include/ststisticsScript.jsp" %>
<script type="text/javascript">

	$(document).ready(function(){
		
		setPopupGrid();
		
		var kwrdWord = $("input[name=word]").val();
		var startDate = $("#serviceStartDate").val();
		var endDate = $("#serviceEndDate").val();
		
		//탭 이벤트
		$(".content_aa").hide();// Initially hide all content
		$("#tabs li:first").attr("id","current"); // Activate first tab
		$("#tab_content div:first").show(); // Show first tab content
		startService();
	    
		$('#tabs a').click(function(e) {
	        e.preventDefault();        
	       	$(".content_aa").hide(); //Hide all content
	        $("#tabs li").attr("id",""); //Reset id's
	        $(this).parent().attr("id","current"); // Activate this
	        $('#' + $(this).attr('title')).fadeIn(); // Show content for current tab
	        $('#' + $(this).attr('title')).children().css("display","block");
	   
	        var division = $(this).attr('title');
	       
	        if(division == 'lifeCycle'){
	        	startLifecycle();
	        }else if(division == 'interests'){
	        	startInterests();
	        }else if(division == 'recmdService'){
	        	startService();
	        }else if(division == 'mapType'){
	        	startMaptype();
	        }
	        
	    });
		
		$('#serviceDetailCancel, #serviceDetailCancel').click(function(){ 
			jQuery("div[class^='popupWrapper']").css("display","none");	 //20200423 운영자 페이지 닫기 버튼 안되서 수정 (코드추가) 
			startService();
		});

		$('.excelDownload').click(function(){
			var kwrdWord = $("input[name=word]").val();
			var startDate = $("#serviceStartDate").val();
			var endDate = $("#serviceEndDate").val();

			if(this.id == 'kwrdContent_service'){
				location.href = pageContext+"/api/ststistics/statusExcelDataDownLoad.do?type=service&word="+kwrdWord+"&startDate="+startDate+"&endDate="+endDate;
			}else if(this.id == 'kwrdContent_maptype'){
				location.href = pageContext+"/api/ststistics/statusExcelDataDownLoad.do?type=maptype&word="+kwrdWord+"&startDate="+startDate+"&endDate="+endDate;
			}else if(this.id == 'kwrdContent_lifecycle'){
				location.href = pageContext+"/api/ststistics/statusExcelDataDownLoad.do?type=lifecycle&word="+kwrdWord+"&startDate="+startDate+"&endDate="+endDate;
			}else{
				location.href = pageContext+"/api/ststistics/statusExcelDataDownLoad.do?type=interests_service&word="+kwrdWord+"&startDate="+startDate+"&endDate="+endDate;
			}
		})
		
	});//ready end
	
	function startService(){
		setDatepickerDefaultRangeNew('serviceStartDate','serviceEndDate');
		
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSKwrdRecmdserviceList.do' ,  remove_url : '' , search_button : 'recmdServiceSearch' , search_box : 'resetForm1' , remove_btn : 'remove'});
		
		//create Grid -추천서비스
	    ststistics.grid.create({
	    		target 	: 'datagrid-view-1' , 
	    			header : [
	    				{column : 'rnum' 		, type : 'text'		, name : '순위' 		, style : {"width" : '40px'}},
	    				{column : 'slctnKwrd' 	, type : 'text' 	, name : '대표키워드명' 	, style : {"width" : '165px'}},
	    				{column : 'emCnt' 	, type : 'text' 	, name : '대화형<br>통계지도' 	, style : {"width" : '75px'}},/*20201127 2020년 SGIS고도화 3차 수정*/
	    				{column : 'lvbotCnt' 	, type : 'text' 	, name : '살고싶은<br>우리동네' 	, style : {"width" : '80px'}},/*20201127 2020년 SGIS고도화 3차 수정 */
	    				{column : 'techbizCnt' 	, type : 'text' 	, name : '기술업종<br>통계지도' 	, style : {"width" : '80px'}},/*20201127 2020년 SGIS고도화 3차 수정 */
	    				{column : 'lvlhbizCnt' 	, type : 'text' 	, name : '생활업종<br>통계지도' 	, style : {"width" : '80px'}},/*20201127 2020년 SGIS고도화 3차 수정 */
	    				{column : 'wmCnt' 	, type : 'text' 	, name : '일자리맵' 	, style : {"width" : '70px'}},
	    				{column : 'psmCnt' 	, type : 'text' 	, name : '정책통계지도' 	, style : {"width" : '75px'}},
	    				{column : 'tmCnt' 	, type : 'text' 	, name : '통계주제도' 	, style : {"width" : '70px'}},
	    				],
	    				
	    				row_callback : function(){
	    				
	    					var kwrdWord = ststistics.grid.getSelectRowData().slctnKwrd;
	    					var startDate = $("#serviceStartDate").val();
	    					var endDate = $("#serviceEndDate").val();
	    					
	    					$("#serviceDetailKwrdWord").val(kwrdWord);
	    					$("#serviceDetailStartDate").val(startDate);
	    					$("#serviceDetailEndDate").val(endDate)
	    					
	    					$("#detailMainKwrd").text(kwrdWord);
	    					$("#popupAdvice , .popupWrapperAdvice").show();
	    					
	    					startdetailPopup(kwrdWord, startDate, endDate);
	    					
							
	    				}
	    		});
	}
	
	function startMaptype(){
		setDatepickerDefaultRangeNew('maptypeStartDate','maptypeEndDate');
		
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSKwrdMaptypeList.do' ,  remove_url : '' , search_button : 'mapTypeSearch' , search_box : 'resetForm2' , remove_btn : 'remove'});
		//create Grid -지도 유형
		ststistics.grid.create({
			target 	: 'datagrid-view-2' , 
			header : [
				{column : 'rnum' 		, type : 'text'		, name : '순위' 		, style : {"width" : '40px'}},
				{column : 'slctnKwrd' 	, type : 'text' 	, name : '대표키워드명' 	, style : {"width" : '200px'}},
				{column : 'jeongugCnt' 	, type : 'text' 	, name : '전국' 	, style : {"width" : '55px'}},
				{column : 'sidoCnt' 	, type : 'text' 	, name : '시도' 	, style : {"width" : '55px'}},
				{column : 'sigunguCnt' 	, type : 'text' 	, name : '시군구' 	, style : {"width" : '55px'}},
				{column : 'eupmyeondongCnt' 	, type : 'text' 	, name : '읍명동' 	, style : {"width" : '55px'}},
				{column : 'gyeogjaCnt' 	, type : 'text' 	, name : '격자' 	, style : {"width" : '55px'}},
				{column : 'colorCnt' 	, type : 'text' 	, name : '색상지도' 	, style : {"width" : '55px'}},
				{column : 'bubbleCnt' 	, type : 'text' 	, name : '버블지도' 	, style : {"width" : '55px'}},
				{column : 'heatCnt' 	, type : 'text' 	, name : '열지도' 	, style : {"width" : '55px'}},
				{column : 'poiCnt' 	, type : 'text' 	, name : 'POI' 	, style : {"width" : '55px'}},
				],
		});
	}
	
	function startLifecycle(){
		setDatepickerDefaultRangeNew('lifecycleStartDate','lifecycleEndDate');
	
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSKwrdLifecycleList.do' ,  remove_url : '' , search_button : 'lifeCycleSearch' , search_box : 'resetForm3' , remove_btn : 'remove'});
		//create Grid -생애주기
		ststistics.grid.create({
			target 	: 'datagrid-view-3' , 
			header : [
				{column : 'rnum' 		, type : 'text'		, name : '순위' 		, style : {"width" : '40px'}},
				{column : 'slctnKwrd' 	, type : 'text' 	, name : '대표키워드명' 	, style : {"width" : '160px'}},
				{column : 'infantChildCnt' 	, type : 'text' 	, name : '영유아/어린이' 	, style : {"width" : '80px'}},
				{column : 'yngbgsCnt' 	, type : 'text' 	, name : '청소년' 	, style : {"width" : '70px'}},
				{column : 'ygmnCnt' 	, type : 'text' 	, name : '청년' 	, style : {"width" : '80px'}},
				{column : 'adultCnt' 	, type : 'text' 	, name : '장년' 	, style : {"width" : '80px'}},
				{column : 'odsnCnt' 	, type : 'text' 	, name : '노년' 	, style : {"width" : '70px'}},
				{column : 'pccfCnt' 	, type : 'text' 	, name : '임신/출산/육아여성' 	, style : {"width" : '85px'}},
				{column : 'family1Cnt' 	, type : 'text' 	, name : '1인가구' 	, style : {"width" : '70px'}},
			],
		});
	}
	
	function startInterests(){
		setDatepickerDefaultRangeNew('interestsStartDate','interestsEndDate');
		
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSKwrdInterestsList.do' ,  remove_url : '' , search_button : 'interestsSearch' , search_box : 'resetForm4' , remove_btn : 'remove'});
		//create Grid -통계거리
		ststistics.grid.create({
			target 	: 'datagrid-view-4' , 
			header : [
				{column : 'rnum' 		, type : 'text'		, name : '순위' 		, style : {"width" : '55px'}},
				{column : 'slctnKwrd' 	, type : 'text' 	, name : '대표키워드명' 	, style : {"width" : '200px'}},
				{column : 'fdCnt' 	, type : 'text' 	, name : '먹거리' 	, style : {"width" : '60px'}},
				{column : 'houseCnt' 	, type : 'text' 	, name : '살거리' 	, style : {"width" : '60px'}},
				{column : 'jobCnt' 	, type : 'text' 	, name : '일거리' 	, style : {"width" : '60px'}},
				{column : 'trnsportCnt' 	, type : 'text' 	, name : '탈거리' 	, style : {"width" : '60px'}},
				{column : 'eduCnt' 	, type : 'text' 	, name : '배울거리' 	, style : {"width" : '60px'}},
				{column : 'plyCnt' 	, type : 'text' 	, name : '보고놀거리' 	, style : {"width" : '60px'}},
				{column : 'healthCnt' 	, type : 'text' 	, name : '건강거리' 	, style : {"width" : '60px'}},
				{column : 'safeCnt' 	, type : 'text' 	, name : '안전거리' 	, style : {"width" : '60px'}},
				],
		});
	}
	
	function startdetailPopup(kwrd, startD, endD){
		console.log(kwrd, startD, endD)
		//

		$('#detailPopGrid').datagrid({
			queryParams: {
				word : kwrd,
				startDate : startD,
				endDate : endD,
			},
			url : pageContext + '/api/ststistics/getStstisticsUSKwrdRecmdserviceDetail.do',
			method: 'POST'
		});

		/*
		//$("#datagrid-view-5 > tbody").empty();
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSKwrdRecmdserviceDetail.do' ,  remove_url : '' , search_button : '' , search_box : 'resetForm5' , remove_btn : 'remove'});
		
		ststistics.grid.create({
			target 	: 'datagrid-view-5' , 
			header : [
				{column : 'rnum' 		, type : 'text'		, name : '순위' 		, style : {"width" : '60px'}},
				{column : 'serviceNm' 		, type : 'text'		, name : '서비스 명' 		, style : {"width" : '520px'}},
				{column : 'serviceCnt' 	, type : 'text' 	, name : '검색 수' 	, style : {"width" : '60px'}},
				],
		});	
		*/
	}
	
	function setPopupGrid(){
		$('#detailPopGrid').datagrid({
			columns : [ [ {
				field : 'rnum',
				title : '순위',
				width : 60,
				align : 'center',
				sortable : true
			},{
				field : 'serviceNm',
				title : '서비스명',
				width : 520,
				align : 'center',
				sortable : true
			},{
				field : 'serviceCnt',
				title : '검색수',
				width : 60,
				align : 'center',
				sortable : true
			}] ],
			/*
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getSrvAreaFacilityTypeList.do',
			method: 'POST',
			onClickRow : function(index,row){
				detailList(row);
			}
			*/
		});
	}
</script>
<body>
		<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020-06-22 박상언 - 브라우저 줌아웃할 시에 .acticle이 아래로 밀림, 이를 위한 css 수정 -->
				<script type="text/javascript">
					makeLeftMenu("3", "10", "7");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span> My통계로</span>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">키워드 콘텐츠 현황</span>
					</p>
				</div>
				<p class="title01">키워드 콘텐츠  현황</p>
				<!-- 탭메뉴 -->
				<div id="tabs">
					<ul>
						<li><a href="#" title="recmdService">추천서비스</a></li>
    					<li><a href="#" title="mapType">지도유형</a></li> 
						<li><a href="#" title="lifeCycle" id="lifeCyclebtn">생애주기</a></li>
    					<li><a href="#" title="interests">관심분야</a></li>
					</ul>
				</div>
				<div id="tab_content">
					<!--추천서비스  -->
					<div id="recmdService" class = "content_aa">
					<div class="tilte03">조회조건</div>
						<div class="searchBtn08" id="recmdServiceSearch">
							<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<form id="resetForm1">
							<table class="apiTable02" summary="조회조건">
								<caption>조회조건</caption>
									<colgroup>
										<col width="10%" />
										<col width="50%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="14%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="25%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									</colgroup>
								<tbody>
									<tr>
										<th>기 간</th>
										<td id="DATE"><!-- 20201127 2020년 SGIS고도화 3차 수정-->
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="serviceStartDate" name="startDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="serviceEndDate" name="endDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
	                             		</td>
	                             		<th>통합검색</th>
										<td>
											<input type="text" id="serviceKwrdWord" name="word" class="input_use03 validatebox-text" style="width:230px;" />
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 시작 -->
									<tr>
										<th class="right">정렬</th>
										<td colspan="3">
											<div class="radioBtnWrapper">
												<input type="radio" name="serviceSearchNmSort" id="serviceSearchNmSortDesc" value="desc" checked="checked">
												<label for="searchCntSortDesc">대표키워드 명 내림차순</label>
												<input type="radio" name="serviceSearchNmSort" id="serviceSearchNmSortAsc" value="asc">
												<label for="searchCntSortAsc">대표키워드 명 오름차순</label>
											</div>
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 끝 -->
								</tbody>
							</table>
						</form>
						<div class="tilte03">검색결과</div>
						<div class="searchBtn04">
							<div class="searchBtn04">	
								<a id="kwrdContent_service" class="excelDownload" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
								<label style="cursor: pointer;" for="excel_data_download">엑셀 다운로드</label>
								</a>
							</div>
						</div>
						<table class="apiTable15" summary="검색결과" style="border:#ffffff"></table>
						<div class="panel datagrid">
							<div class="datagrid-wrap panel-body panel-body-noheader">
								<div class="datagrid-view" style="width: 745px; height: max-content; padding-top:5px;" id="datagrid-view-1"></div>
								<div class="datagrid-pager pagination"></div>
								<div class="datagrid-mask" style="display:none;"></div>
								<div class="datagrid-mask-msg" style="display:none; left : 50%; height: 16px; margin-left: -99px; line-height: 16px;">처리중 입니다, 기다리 십시요...</div>
							</div>
						</div>
					</div><!--추천서비스  end-->
					<!--지도유형  -->
					<div id="mapType" class = "content_aa">
					<div class="tilte03">조회조건</div>
						<div class="searchBtn08" id="mapTypeSearch">
							<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<form id="resetForm2">
							<table class="apiTable02" summary="조회조건">
								<caption>조회조건</caption>
									<colgroup>
										<col width="10%" />
										<col width="50%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="14%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="25%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									</colgroup>
								<tbody>
									<tr>
										<th>기 간</th>
										<td id="DATE"><!-- 20201127 2020년 SGIS고도화 3차 추가-->
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="maptypeStartDate" name="startDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="maptypeEndDate" name="endDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
	                             		</td>
	                             		<th>통합검색</th>
										<td>
											<input type="text" id="maptypeKwrdWord" name="word" class="input_use03 validatebox-text" style="width:230px;" />
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 시작 -->
									<tr>
										<th class="right">정렬</th>
										<td colspan="3">
											<div class="radioBtnWrapper">
												<input type="radio" name="mapSearchNmSort" id="mapSearchNmSortDesc" value="desc" checked="checked">
												<label for="searchCntSortDesc">대표키워드 명 내림차순</label>
												<input type="radio" name="mapSearchNmSort" id="mapSearchNmSortAsc" value="asc">
												<label for="searchCntSortAsc">대표키워드 명 오름차순</label>
											</div>
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 끝 -->
								</tbody>
							</table>
						</form>
						<div class="tilte03">검색결과</div>
						<div class="searchBtn04">
							<div class="searchBtn04">	
								<a id="kwrdContent_maptype" class="excelDownload" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
								<label style="cursor: pointer;" for="excel_data_download">엑셀 다운로드</label>
								</a>
							</div>
						</div>
						<table class="apiTable15" summary="검색결과" style="border:#ffffff"></table>
						<div class="panel datagrid">
							<div class="datagrid-wrap panel-body panel-body-noheader">
								<div class="datagrid-view" style="width: 745px; height: max-content; padding-top:5px;" id="datagrid-view-2"></div>
								<div class="datagrid-pager pagination"></div>
								<div class="datagrid-mask" style="display:none;"></div>
								<div class="datagrid-mask-msg" style="display:none; left : 50%; height: 16px; margin-left: -99px; line-height: 16px;">처리중 입니다, 기다리 십시요...</div>
							</div>
						</div>
					</div><!--지도유형 end-->
					<!--생애주기  -->
					<div id="lifeCycle" class = "content_aa">
					<div class="tilte03">조회조건</div>
						<div class="searchBtn08" id="lifeCycleSearch">
							<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<form id="resetForm3">
							<table class="apiTable02" summary="조회조건">
								<caption>조회조건</caption>
									<colgroup>
										<col width="10%" />
										<col width="50%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="14%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="25%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									</colgroup>
								<tbody>
									<tr>
										<th>기 간</th>
										<td id="DATE"><!-- 20201127 2020년 SGIS고도화 3차 추가 -->
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="lifecycleStartDate" name="startDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="lifecycleEndDate" name="endDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
	                             		</td>
	                             		<th>통합검색</th>
										<td>
											<input type="text" id="lifecycleKwrdWord" name="word" class="input_use03 validatebox-text" style="width:230px;" />
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 시작 -->
									<tr>
										<th class="right">정렬</th>
										<td colspan="3">
											<div class="radioBtnWrapper">
												<input type="radio" name="lifSearchNmSort" id="lifSearchNmSortDesc" value="desc" checked="checked">
												<label for="searchCntSortDesc">대표키워드 명 내림차순</label>
												<input type="radio" name="lifSearchNmSort" id="lifSearchNmSortAsc" value="asc">
												<label for="searchCntSortAsc">대표키워드 명 오름차순</label>
											</div>
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 끝 -->
								</tbody>
							</table>
						</form>
						<div class="tilte03">검색결과</div>
						<div class="searchBtn04">
							<div class="searchBtn04">	
								<a id="kwrdContent_lifecycle" class="excelDownload" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
								<label style="cursor: pointer;" for="excel_data_download">엑셀 다운로드</label>
								</a>
							</div>
						</div>
						<table class="apiTable15" summary="검색결과" style="border:#ffffff"></table>
						<div class="panel datagrid">
							<div class="datagrid-wrap panel-body panel-body-noheader">
								<div class="datagrid-view" style="width: 745px; height: max-content; padding-top:5px;" id="datagrid-view-3"></div>
								<div class="datagrid-pager pagination"></div>
								<div class="datagrid-mask" style="display:none;"></div>
								<div class="datagrid-mask-msg" style="display:none; left : 50%; height: 16px; margin-left: -99px; line-height: 16px;">처리중 입니다, 기다리 십시요...</div>
							</div>
						</div>
					</div><!--생애주기  end-->
					<!--통계거리  -->
					<div id="interests" class = "content_aa">
					<div class="tilte03">조회조건</div>
						<div class="searchBtn08" id="interestsSearch">
							<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<form id="resetForm4">
							<table class="apiTable02" summary="조회조건">
								<caption>조회조건</caption>
									<colgroup>
										<col width="10%" />
										<col width="50%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="14%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
										<col width="25%" /><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									</colgroup>
								<tbody>
									<tr>
										<th>기 간</th>
										<td id="DATE"><!-- 20201127 2020년 SGIS고도화 3차 수정-->
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="interestsStartDate" name="startDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
											<div class="searchBtn02">
												<a>
													<input type="text" class="input_use06" id="interestsEndDate" name="endDate" style="width:90px; margin-right: 5px" readonly>
												</a>
											</div>
	                             		</td>
	                             		<th>통합검색</th>
										<td>
											<input type="text" id="interestsKwrdWord" name="word" class="input_use03 validatebox-text" style="width:230px;" />
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 시작 -->
									<tr>
										<th class="right">정렬</th>
										<td colspan="3">
											<div class="radioBtnWrapper">
												<input type="radio" name="interestsSearchNmSort" id="interestsSearchNmSortDesc" value="desc" checked="checked">
												<label for="searchCntSortDesc">대표키워드 명 내림차순</label>
												<input type="radio" name="interestsSearchNmSort" id="interestsSearchNmSortAsc" value="asc">
												<label for="searchCntSortAsc">대표키워드 명 오름차순</label>
											</div>
										</td>
									</tr>
									<!-- 20201127 2020년 SGIS고도화 3차 추가 끝 -->
								</tbody>
							</table>
						</form>
						<div class="tilte03">검색결과</div>
						<div class="searchBtn04">
							<div class="searchBtn04">	
								<a id="kwrdContent_interests" class="excelDownload" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
								<label style="cursor: pointer;" for="excel_data_download">엑셀 다운로드</label>
								</a>
							</div>
						</div>
						<table class="apiTable15" summary="검색결과" style="border:#ffffff"></table>
						<div class="panel datagrid">
							<div class="datagrid-wrap panel-body panel-body-noheader">
								<div class="datagrid-view" style="width: 745px; height: max-content; padding-top:5px;" id="datagrid-view-4"></div>
								<div class="datagrid-pager pagination"></div>
								<div class="datagrid-mask" style="display:none;"></div>
								<div class="datagrid-mask-msg" style="display:none; left : 50%; height: 16px; margin-left: -99px; line-height: 16px;">처리중 입니다, 기다리 십시요...</div>
							</div>
						</div>
					</div><!--통계거리  end-->
					
				</div><!-- tab_cantent end -->
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
				<div class="popupWrapperAdvice" id="popupAdvice" style="left: 0">
			<div class="popupWrapperAdvice">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">키워드 콘텐츠 상세보기</div>
						<div id = "serviceDetailCancel">
							<a style="cursor: pointer">
								<img style="position: relative;top: 13px;left: 482px;" src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<form id="popupFormAdvice">
						<div style="position: relative;top: 20px;margin-bottom: 30px;left: 40px;">
							● 메인키워드 :<a id='detailMainKwrd' style="font-size:15px;"></a>
						</div>
						<div style="left: 40px; position: relative; top: 10px; font-size: 15px;">● 추천서비스</div>
						<div  style="margin-left: 42px;margin-top: 13px;">
						<table id="detailPopGrid" class=""  title="" style="width:650px;height:500px;"
		           			data-options="singleSelect:false,collapsible:false,checkOnSelect:false,selectOnCheck:false">
		    			</table>
		    			</div>
					</form>
					<div class="btnbox">
						<a id="serviceDetailCancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
</html>