<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>관심주제 선택패턴 현황</title>
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<style>
		/* .title-select-wrapper "생애주기 => 관심분야 (매핑 통계)   /   생애주기 => 관심분야 (매핑 통계)" */
		.title-select-wrapper {
			margin-top:50px;
		}
		.title-select-wrapper > .select-mapping-option {
			font-weight:bold;
		}
		.title-select-wrapper > .select-mapping-option:not(.selected) {
			opacity:0.7;
			font-weight:lighter;
			cursor:pointer;
		}
		
		/* 처음에는 뒷쪽에  */
		#Mapping_With_Self_Table {
			display : none;
			 /* style="vertical-align:middle; */
		}
		
		
		/* 관심주제 선택패턴 상세의 라디오버튼에 대한 CSS 시작 */
		.radioBtnWrapper {
			margin: 20px 0px 0px 0px
		}
		
		input[type=radio][name=UserPatternDetailSelect] {
			vertical-align:middle;
		}
		
		input[type=radio][name=UserPatternDetailSelect] + label {
			margin:0px 20px 0px 10px;
		}
		
		
		input[type=radio][name=UserPatternDetailSelect]:checked + label {
			font-weight:bold;
		}
		/* 관심주제 선택패턴 상세의 라디오버튼에 대한 CSS 끝 */
		
		
		
		/* 관심주제 선택패턴 상세를 표출하는 테이블에 대한 CSS 시작 */
		.selectDetailTable {
			display: none;
		}
		
		.selectDetailTable.selected {
			display: table;
		}
		/* 관심주제 선택패턴 상세를 표출하는 테이블에 대한 CSS 끝 */
		
		
		
		
	</style>
	<script>
		
		function UpdateUserPatternTable(response) { 
			$('#User_Pattern_Table tbody').remove();
			var html = '<tbody>';
			response.general.forEach(function(a,b){ // statDistanceList 가 8개 ,  lfeCycleList가 7개여서 더 긴것을 기준으로 for문을 돌림
			    html += '<tr>';
			    html += '<th class="rowNum">'+a.rowNum+'</th>';
			    html += '<td class="lfeCycleSlctnCnt">'+a.lfeCycleSlctnCnt+'</td>';
			    html += '<td class="statDstncSlctnCnt">'+a.statDstncSlctnCnt+'</td>';
			    html += '<td class="count">'+a.count+'</td>';
			    html += '<td class="percentage">'+a.percentage+'</td>';
			    html += '</tr>';
			})
			html += '</tbody>';
			$('#User_Pattern_Table').append(html);
		}
		
		function UpdateDetailPatternTable(detailTableId,response) { 
			$('#'+detailTableId+' tbody').remove();
			
			var html = '<tbody>';
			
			if(detailTableId === 'LifeCycleAndInterestTable') {
				
				response.lifeAndDstnc.forEach(function(a,b){ 
				    html += '<tr>';
				    html += '<td class="lfeCycle1Name">'+a.lfeCycle1Name+'</td>';
				    html += '<td class="lfeCycle2Name">'+a.lfeCycle2Name+'</td>';
				    html += '<td class="statDstnc1Name">'+a.statDstnc1Name+'</td>';
				    html += '<td class="statDstnc2Name">'+a.statDstnc2Name+'</td>';
				    html += '<td class="count">'+a.count+'</td>';
				    /* html += '<td class="patternPercentage-LifeNDstnc">'+a.percentage+'</td>'; */
				    html += '</tr>';
				})
				
				
				
			} else if(detailTableId === 'LifeCycleAndLifeCycleTable') {
				
				response.life.forEach(function(a,b){
					html += '<tr>';
					html += '<th class="rowNum">'+a.rowNum+'</th>';
					html += '<td class="lfeCycle1Name">'+a.lfeCycle1Name+'</td>';
					html += '<td class="lfeCycle2Name">'+a.lfeCycle2Name+'</td>';
					html += '<td class="count">'+a.count+'</td>';
					html += '<td class="percentage">'+a.percentage+'</td>';
					html += '</tr>';
				});
				
			} else if(detailTableId === 'InterestAndInterestTable') {
				
				response.dstnc.forEach(function(a,b){
					html += '<tr>';
					html += '<th class="rowNum">'+a.rowNum+'</th>';
					html += '<td class="lfeCycle1Name">'+a.statDstnc1Name+'</td>';
					html += '<td class="lfeCycle2Name">'+a.statDstnc2Name+'</td>';
					html += '<td class="count">'+a.count+'</td>';
					html += '<td class="percentage">'+a.percentage+'</td>';
					html += '</tr>';
				});
				
			}
			
			html += '</tbody>';
			$('#'+detailTableId).append(html);
		}
		
		
		// 마스크 아이디는 크게 두 가지 입니다: generalMask(관심주제 선택패턴용 마스크),  detailMask(관심주제 선택패턴 상세용 마스크)
		// 특정 테이블에 로딩 화면을 생성합니다.
		function maskTable(targetMaskId) {
			$('#'+targetMaskId).show();
		}
		
		// 특정 테이블에 있는 로딩 화면을 제거합니다.
		function unMaskTable(targetMaskId) {
			$('#'+targetMaskId).hide();
		}
		
		// 선택패턴 상세 테이블을 화면에서 안 보이게 하는 메서드
		function hideAllDetailTable() {
			$('.selectDetailTable').removeClass('selected');
		}
		
		
		// 선택패턴 상세 테이블 한 개를 화면에 보여주는 메서드
		function showOneDetailTable(detailPattern) {
			//주의! 인자값 target은  $('...')의 형태로 넣어야한다.
			hideAllDetailTable();
			$('#'+detailPattern+'Table').addClass('selected');
		}
		
		
		
		
		function updateDetailPagingTable(paging) {	//AJAX를 통해서 받은 paging이라는 객체를 받는다.
			
			console.log(page);
			$('#pagingTable tbody').remove();
			
			var tbody	= $("<tbody>");
			var tr		= $("<tr>");
			var page	= paging;
			
			var td 		= $("<td>").addClass("pagination-links");
			var classV	= "pagination-link l-btn l-btn-small l-btn-plain";
			var a		= $("<a>").addClass(classV).attr("data-page" , page.prevPageBlockNo);
			var span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			var icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			var icon2	= $("<span>").addClass("l-btn-icon pagination-first").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			
			td 		= $("<td>").addClass("pagination-links");
			a		= $("<a>").addClass("pagination-link l-btn l-btn-small l-btn-plain").attr("data-page" , page.prevPageNo);
			span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			icon2	= $("<span>").addClass("l-btn-icon pagination-prev").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			
			for(var i = page.startPageNo ; i <=  page.endPageNo; i++){
				var td 			= $("<td>").addClass("pagination-links");
				var class_attr 	= "pagination-link l-btn l-btn-small l-btn-plain";
				if(i == page.pageNo) class_attr += " l-btn-selected l-btn-plain-selected";
				var a			= $("<a>").addClass(class_attr).attr("data-page" , i);
				var span		= $("<span>").addClass("l-btn-left")
				var label		= $("<span>").addClass("l-btn-text").text(i);
				td.append(a.append(span.append(label.append())));
				tr.append(td);
			}
			
			td 		= $("<td>").addClass("pagination-links");
			a		= $("<a>").addClass("pagination-link l-btn l-btn-small l-btn-plain").attr("data-page" , page.nextPageNo);
			span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			icon2	= $("<span>").addClass("l-btn-icon pagination-next").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			
			td 		= $("<td>").addClass("pagination-links");
			a		= $("<a>").addClass("l-btn l-btn-small l-btn-plain ").attr("data-page" , page.nextPageBlockNo);
			span	= $("<span>").addClass("l-btn-left l-btn-icon-left")
			icon1	= $("<span>").addClass("l-btn-text l-btn-empty").append($('<p>&nbsp;</p>'));
			icon2	= $("<span>").addClass("l-btn-icon pagination-last").append($('<p>&nbsp;</p>'));
			td.append(a.append(span.append(icon1).append(icon2)));
			tr.append(td);
			
			tbody.append(tr);
			$('#pagingTable').append(tbody);
			
		}
		
		
		
		$(document).ready(function(){
			
			// 달렷 세팅
			setDatepickerDefaultRangeNew('startDate','endDate');
			
			
			// 페이징 버튼 관련
			$('#pagingTable').on("click","a",function(e){
			   
			    var pageNo = $(this).data('page');
			    
			    var patternSelect = $('.radioBtnWrapper input:checked').val();
			    
			    var patternName = patternSelect.substring(0,patternSelect.indexOf('Select'));
			    
			    var apiUrl = '/api/ststistics/';
			    
			    if(patternName === 'LifeCycleAndInterest') { 
			    	
			    	apiUrl +='getStstisticsUSSelectPatternDetailLifeAndDstnc.do'; 
			    	
			    } else if(patternName === 'LifeCycleAndLifeCycle') {
			    	
			    	apiUrl +='getStstisticsUSSelectPatternDetailLife.do';	
			    	
			    } else if(patternName === 'InterestAndInterest') {
			    	
			    	apiUrl +='getStstisticsUSSelectPatternDetailDstnc.do';
			    	
			    } 
			    
			    maskTable("detailMask");
			    ststistics.asynchronous({
			        url : apiUrl ,			// 검색 버튼 클릭시 무조건 처음은 [생애주기 & 통계거리]
			        data : {startDate:$('#startDate').val(), endDate:$('#endDate').val(), pageNo:pageNo} , // 라디오 버튼 클릭시 상세페이지는 무조건 1페이부터 보게 된다.
			        callback : function(response){
			        	UpdateDetailPatternTable(patternName+'Table',response);	// table의 정보를 최신화 하고
			        	showOneDetailTable(patternName);						// 해당 테이블을 눈에 보이게 한다.
			        	updateDetailPagingTable(response.paging);
			        	unMaskTable("detailMask");										// 해당 테이블을 덮고 있는 로딩 화면을 없앤다.
			        }
			    });
			    
			});
			
			var first_try = true;
			
			// 검색 버튼 클릭에 대한 이벤트 
			$('.searchBtn04').on("click",function(event){
				console.log("loading...");
				var startDate = $('#startDate').val();
				var endDate = $('#endDate').val();
				
				if(first_try) {
					first_try = false;
				} else {
					if(!startDate || !endDate) {
					    alert("기간 검색을 하시려면 시작과 끝 모두 입력해주셔야 합니다.");
					    return;
					}
				}
				// 마스크를 씌운다.
				maskTable("generalMask");
				
				$('.searchBtn04').css("pointer-events","none"); // 마우스 여러 번 눌림 금지, 여러번 누르면 ststistics 의 alert 메시지가 여러번 올 때가 있음
				
				ststistics.asynchronous({
					
					url : '/api/ststistics/getStstisticsUSSelectPatternGeneral.do' ,
					data : {startDate:startDate, endDate:endDate} ,
					callback : function(response){
						
						console.log(response);
						UpdateUserPatternTable(response);
								
						//$('#dummySelect').click();
						//$('#LifeCycleAndInterestSelect').click();
								
						maskTable("detailMask");
					    ststistics.asynchronous({
					        url : '/api/ststistics/getStstisticsUSSelectPatternDetailLifeAndDstnc.do' ,			// 검색 버튼 클릭시 무조건 처음은 [생애주기 & 통계거리]
					        data : {startDate:$('#startDate').val(), endDate:$('#endDate').val(), pageNo:"1"} , // 라디오 버튼 클릭시 상세페이지는 무조건 1페이부터 보게 된다.
					        callback : function(response){
					        	console.log(response);
					        	UpdateDetailPatternTable('LifeCycleAndInterestTable',response);	// table의 정보를 최신화 하고
					        	showOneDetailTable('LifeCycleAndInterest');						// 해당 테이블을 눈에 보이게 한다.
					        	updateDetailPagingTable(response.paging);
					        	unMaskTable("detailMask");										// 해당 테이블을 덮고 있는 로딩 화면을 없앤다.
					        	unMaskTable("generalMask");										// 관심주제 선택패턴의 로딩화면도 없애준다.
					        	$('.searchBtn04').css("pointer-events",""); 					// 다시 클릭이 가능하도록 바꾼다.
					        	console.log("done!!!");
					        	$('#excel_download-1').attr("href","/s-portalcnm/api/ststistics/selectPatternExcelDataDownLoad.do?type=general&startDate="+startDate+"&endDate="+endDate);
					        	$('#excel_download-2').attr("href","/s-portalcnm/api/ststistics/selectPatternExcelDataDownLoad.do?type=LifeCycleAndInterest&startDate="+startDate+"&endDate="+endDate);
					       		$('#LifeCycleAndInterestSelect').prop('checked', true);
					        }
					    });
					}
			    });
				
			});
			
			
			// 관심주제 선택패턴 상세의 라디오 버튼에 대한 이벤트
			$('.radioBtnWrapper input[type=radio]').on("change",function(e){

				var startDate = $('#startDate').val();
				var endDate = $('#endDate').val();
				
				var target = e.target.value;
			    
			    var patternName = target.substring(0,target.indexOf('Select'));
			    
			    var apiUrl = '/api/ststistics/';
			    var detailTableId = patternName+'Table';
			    
			    if(patternName === 'dummy') {
			    	return;
			    } else if(patternName === 'LifeCycleAndInterest') { 
			    	
			    	apiUrl +='getStstisticsUSSelectPatternDetailLifeAndDstnc.do'; 
			    	
			    } else if(patternName === 'LifeCycleAndLifeCycle') {
			    	
			    	apiUrl +='getStstisticsUSSelectPatternDetailLife.do';	
			    	
			    } else if(patternName === 'InterestAndInterest') {
			    	
			    	apiUrl +='getStstisticsUSSelectPatternDetailDstnc.do';
			    	
			    } else {
			    	console.error("no such radio button exists");
			    	return;
			    }
			    
			    
			    maskTable("detailMask");
			    ststistics.asynchronous({
			        url : apiUrl ,
			        data : {startDate:$('#startDate').val(), endDate:$('#endDate').val(), pageNo:"1"} , // 라디오 버튼 클릭시 상세페이지는 무조건 1페이부터 보게 된다.
			        callback : function(response){
			        	console.log(response);
			        	UpdateDetailPatternTable(detailTableId,response);	// table의 정보를 최신화 하고
			        	showOneDetailTable(patternName);					// 해당 테이블을 눈에 보이게 한다.
			        	updateDetailPagingTable(response.paging);
			        	unMaskTable("detailMask");							// 해당 테이블을 덮고 있는 로딩 화면을 없앤다.
			        	$('#excel_download-2').attr("href","/s-portalcnm/api/ststistics/selectPatternExcelDataDownLoad.do?type="+patternName+"&startDate="+startDate+"&endDate="+endDate);
			        }
			    });
			    
			   	
			    
			}); // end of Radio Button EventHandler
			
			
			// 초기화면 <table> 생성
			$('.searchBtn04').click();
			
			
			
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
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020-06-22 박상언 - 브라우저 줌아웃할 시에 .acticle이 아래로 밀림, 이를 위한 css 수정 -->
				<script type="text/javascript">
					makeLeftMenu("3", "10", "10");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
				</script>
			</div>
			<!-- cls:left end -->
			<div class="acticle">
				<div class="location">
					<p>
						<a><img src="/s-portalcnm/html/include/img/ico/ico_home.png" alt="home"></a>
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음"></span>
						<span>서비스 관리</span> 
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음"></span> 
						<span> My통계로</span><!--2020-02-19 수정  -->
						<span><img src="/s-portalcnm/html/include/img/ico/ico_navi.png" alt="다음"></span> 
						<span class="fontS">관심주제 선택패턴 현황</span>
					</p>
				</div>
				<p class="title01" style="margin-bottom: 30px;">관심주제 선택패턴 현황</p>
				
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src="/s-portalcnm/html/include/img/btn/btn_search.png" alt="검색"></a>
				</div>
				<form id="resetForm" style="margin-bottom: 3em">
				    <table class="apiTable02" summary="조회조건">
				        <caption>조회조건</caption>
				        <colgroup>
				            <col width="141">
				            <col width="230">
				            <col width="141">
				            <col width="230">
				        </colgroup>
				        <tbody>
				            <tr>
								<th>검색기간</th>
								<td colspan="3" id="DATE">
									<div class="searchBtn02">
										<a>
											<input type="text" class="input_use06" id="startDate" style="width:90px; margin-right: 5px" readonly>
										</a>
									</div>
									<div class="searchBtn02">
										<a>
											<input type="text" class="input_use06" id="endDate" style="width:90px; margin-right: 5px" readonly>
										</a>
									</div>
	                             </td>
							</tr>
				        </tbody>
				    </table>
				</form><!-- end of #resetForm -->
				
				<div class="datagrid-wrap generalWrapper" style="position: relative;">
					<div class="tilte04 select-mapping-option selected mappingAnother" style="margin-top:50px;float:left">관심주제 선택패턴</div>
					<div class="searchBtn04-1" style="margin-top: 50px;float: right;">
					    <a id="excel_download-1" href="/s-portalcnm/api/ststistics/selectPatternExcelDataDownLoad.do?type=general" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
					        <label style="cursor: pointer;" for="excel_download">엑셀 다운로드</label>
					    </a>
					</div>
					<table class="apiTable18 select" id="User_Pattern_Table" summary="관심주제 선택패턴 통계">
						<caption>관심주제 선택패턴 통계</caption>
						<colgroup>
							<col width="50px">
							<col width="170px">
							<col width="170px">
							<col width="170px">
							<col width="170px">
						</colgroup>
						<thead>
							<tr>
								<th class="right">순번</th>
								<th class="right">생애주기 선택수</th>
								<th class="right">관심거리 선택수</th>
								<th class="right">패턴 총회수</th>
								<th class="right">패턴 비율(%)</th>
							</tr>
						</thead>
					</table>
					<div class="datagrid-mask" id="generalMask" style="display: none;opacity:1;background-color: rgba(0,0,0,0.05);">
						<div class="datagrid-mask-msg" style="left: 50%;height: 16px;margin-left: -99px;line-height: 16px;display: block;">
				       		 처리중 입니다, 기다리 십시요...
				    	</div> 
					</div>
				</div>
				
				<div class="datagrid-wrap detailWrapper" style="position: relative;">
					<div class="tilte04" style="margin-top:50px;margin-bottom:10px">관심주제 선택패턴 상세</div>
					<div class="radioBtnWrapper" style="float:left">
						<input type="radio" name="UserPatternDetailSelect" id="LifeCycleAndInterestSelect" value="LifeCycleAndInterestSelect" checked="checked"><label for="LifeCycleAndInterestSelect">생애주기 &amp; 관심분야</label>
						<input type="radio" name="UserPatternDetailSelect" id="LifeCycleAndLifeCycleSelect" value="LifeCycleAndLifeCycleSelect"><label for="LifeCycleAndLifeCycleSelect">생애주기 &amp; 생애주기</label>
						<input type="radio" name="UserPatternDetailSelect" id="InterestAndInterestSelect" value="InterestAndInterestSelect"><label for="InterestAndInterestSelect">관심분야 &amp; 관심분야</label>
						<input type="radio" name="UserPatternDetailSelect" id="dummySelect" value="dummySelect" style="display:none">
					</div>
					<div class="searchBtn04-2" style="margin-top: 15px;float: right;">
					    <a id="excel_download-2" href="/s-portalcnm/api/ststistics/selectPatternExcelDataDownLoad.do?type=LifeCycleAndInterest" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
					        <label style="cursor: pointer;" for="excel_download">엑셀 다운로드</label>
					    </a>
					</div>
					<!-- 작업시작 생애주기 + 관심거리 테이블 작성 -->
				    <table class="apiTable20 selectDetailTable selected" id="LifeCycleAndInterestTable" summary="관심주제 선택패턴 상세">
						<caption>관심주제 선택패턴 상세</caption>
						<colgroup>
							<col width="20%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
						</colgroup>
						<thead>
							<tr>
								<th>생애주기1</th>
								<th>생애주기2</th>
								<th>관심분야1</th>
								<th>관심분야2</th>
								<th>패턴 조회수</th>
							</tr>
						</thead>
					</table>
				    
				    <table class="apiTable20 selectDetailTable" id="LifeCycleAndLifeCycleTable" summary="관심주제 선택패턴 상세">
						<caption>관심주제 선택패턴 상세</caption>
						<colgroup>
							<col width="10%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
						</colgroup>
						<thead>
							<tr>
								<th>번호</th>
								<th>생애주기1</th>
								<th>생애주기2</th>
								<th>패턴 조회수</th>
								<th>패턴 선택비율</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th class="number">1</th>
								<td class="selectedLifeCycle1">영유아/어린이</td>
								<td class="selectedLifeCycle2">선택 안함</td>
								<td class="patternCnt">412</td>
								<td class="patternPercentage">1.0%</td>
							</tr>
							<tr>
								<th class="number">2</th>
								<td class="selectedLifeCycle1">영유아/어린이</td>
								<td class="selectedLifeCycle2">청소년</td>
								<td class="patternCnt">231</td>
								<td class="patternPercentage">0.5%</td>
							</tr>
							<tr>
								<th class="number">3</th>
								<td class="selectedLifeCycle1">영유아/어린이</td>
								<td class="selectedLifeCycle2">청년</td>
								<td class="patternCnt">1000</td>
								<td class="patternPercentage">1.8%</td>
							</tr>
							<tr>
								<th class="number">4</th>
								<td class="selectedLifeCycle1">영유아/어린이</td>
								<td class="selectedLifeCycle2">장년</td>
								<td class="patternCnt">233</td>
								<td class="patternPercentage">0.5%</td>
							</tr>
							<tr>
								<th class="number">5</th>
								<td class="selectedLifeCycle1">영유아/어린이</td>
								<td class="selectedLifeCycle2">노년</td>
								<td class="patternCnt">1000</td>
								<td class="patternPercentage">2.2%</td>
							</tr>
							<tr>
								<th class="number">6</th>
								<td class="selectedLifeCycle1">영유아/어린이</td>
								<td class="selectedLifeCycle2">임신/출산/육아여성</td>
								<td class="patternCnt">563</td>
								<td class="patternPercentage">1.0%</td>
							</tr>
							<tr>
								<th class="number">7</th>
								<td class="selectedLifeCycle1">영유아/어린이</td>
								<td class="selectedLifeCycle2">1인가구</td>
								<td class="patternCnt">122</td>
								<td class="patternPercentage">0.1%</td>
							</tr>
							<tr>
								<th class="number">8</th>
								<td class="selectedLifeCycle1">청소년</td>
								<td class="selectedLifeCycle2">선택 안함</td>
								<td class="patternCnt">321</td>
								<td class="patternPercentage">0.8%</td>
							</tr>
							<tr>
								<th class="number">9</th>
								<td class="selectedLifeCycle1">청소년</td>
								<td class="selectedLifeCycle2">청년</td>
								<td class="patternCnt">1500</td>
								<td class="patternPercentage">4.5%</td>
							</tr>
							<tr>
								<th class="number">10</th>
								<td class="selectedLifeCycle1">청소년</td>
								<td class="selectedLifeCycle2">장년</td>
								<td class="patternCnt">233</td>
								<td class="patternPercentage">1.0%</td>
							</tr>
						</tbody>
					</table>
				    
				    
				    <table class="apiTable20 selectDetailTable" id="InterestAndInterestTable" summary="관심주제 선택패턴 상세">
				    	<caption>관심주제 선택패턴 상세</caption>
						<colgroup>
							<col width="10%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
							<col width="20%">
						</colgroup>
				    	<thead>
							<tr>
								<th>번호</th>
								<th>관심분야1</th>
								<th>관심분야2</th>
								<th>패턴 조회수</th>
								<th>패턴 조회율</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th class="number">1</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">선택 안함</td>
								<td class="patternCnt">412</td>
								<td class="patternPercentage">1.0%</td>
							</tr>
							<tr>
								<th class="number">2</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">청소년</td>
								<td class="patternCnt">231</td>
								<td class="patternPercentage">0.5%</td>
							</tr>
							<tr>
								<th class="number">3</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">청년</td>
								<td class="patternCnt">1000</td>
								<td class="patternPercentage">1.8%</td>
							</tr>
							<tr>
								<th class="number">4</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">장년</td>
								<td class="patternCnt">233</td>
								<td class="patternPercentage">0.5%</td>
							</tr>
							<tr>
								<th class="number">5</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">배울거리</td>
								<td class="patternCnt">1000</td>
								<td class="patternPercentage">2.2%</td>
							</tr>
							<tr>
								<th class="number">6</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">보고 놀거리</td>
								<td class="patternCnt">563</td>
								<td class="patternPercentage">1.0%</td>
							</tr>
							<tr>
								<th class="number">7</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">건강거리</td>
								<td class="patternCnt">122</td>
								<td class="patternPercentage">0.1%</td>
							</tr>
							<tr>
								<th class="number">8</th>
								<td class="selectedLifeCycle1">먹거리</td>
								<td class="selectedLifeCycle2">안전거리</td>
								<td class="patternCnt">321</td>
								<td class="patternPercentage">0.8%</td>
							</tr>
							<tr>
								<th class="number">9</th>
								<td class="selectedLifeCycle1">살거리</td>
								<td class="selectedLifeCycle2">일거리</td>
								<td class="patternCnt">1500</td>
								<td class="patternPercentage">4.5%</td>
							</tr>
							<tr>
								<th class="number">10</th>
								<td class="selectedLifeCycle1">살거리</td>
								<td class="selectedLifeCycle2">탈거리</td>
								<td class="patternCnt">233</td>
								<td class="patternPercentage">1.0%</td>
							</tr>
						</tbody>
				    </table>
					
				    
				    
				    
				    
				    
	
					
					<!-- 페이징 테이블 -->
				    <table cellspacing="0" id="pagingTable" cellpadding="0" border="0" style="margin:10px auto">
						<tbody>
							<tr>
								<td class="pagination-links">
									<a class="pagination-link l-btn l-btn-small l-btn-plain"
										href="javascript:$('#pageNo').val('1');$s.grid.create($s.grid.parameter);">
										<span class="l-btn-left l-btn-icon-left">
											<span class="l-btn-text l-btn-empty">
												<p>&nbsp;</p>
											</span>
											<span class="l-btn-icon pagination-first">
												<p>&nbsp;</p>
											</span>
										</span>
									</a>
								</td>
								<td class="pagination-links">
									<a class="pagination-link l-btn l-btn-small l-btn-plain"
										href="javascript:$('#pageNo').val('1');$s.grid.create($s.grid.parameter);">
										<span class="l-btn-left l-btn-icon-left">
											<span class="l-btn-text l-btn-empty">
												<p>&nbsp;</p>
											</span>
											<span class="l-btn-icon pagination-prev">
												<p>&nbsp;</p>
											</span>
										</span>
									</a>
								</td>
									<td class="pagination-links"><a	class="pagination-link l-btn l-btn-small l-btn-plain l-btn-selected l-btn-plain-selected" href="#"><span class="l-btn-left"><span class="l-btn-text">1</span></span></a></td>
									<td class="pagination-links"><a class="pagination-link l-btn l-btn-small l-btn-plain" href="#"><span class="l-btn-left"><span class="l-btn-text">2</span></span></a></td>
						        	<td class="pagination-links"><a class="pagination-link l-btn l-btn-small l-btn-plain" href="#"><span class="l-btn-left"><span class="l-btn-text">3</span></span></a></td>
						        	<td class="pagination-links"><a class="pagination-link l-btn l-btn-small l-btn-plain" href="#"><span class="l-btn-left"><span class="l-btn-text">4</span></span></a></td>
						        	<td class="pagination-links"><a class="pagination-link l-btn l-btn-small l-btn-plain" href="#"><span class="l-btn-left"><span class="l-btn-text">5</span></span></a></td>
								<td class="pagination-links">
									<a class="pagination-link l-btn l-btn-small l-btn-plain"
										href="javascript:$('#pageNo').val('2');$s.grid.create($s.grid.parameter);">
										<span class="l-btn-left l-btn-icon-left">
											<span class="l-btn-text l-btn-empty">
												<p>&nbsp;</p>
											</span>
											<span class="l-btn-icon pagination-next">
												<p>&nbsp;</p>
											</span>
										</span>
									</a>
								</td>
								<td class="pagination-links">
									<a class="l-btn l-btn-small l-btn-plain"
										href="javascript:$('#pageNo').val('6');$s.grid.create($s.grid.parameter);">
										<span class="l-btn-left l-btn-icon-left">
											<span class="l-btn-text l-btn-empty">
												<p>&nbsp;</p>
											</span>
											<span class="l-btn-icon pagination-last">
												<p>&nbsp;</p>
											</span>
										</span>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					
					<div class="datagrid-mask" id="detailMask" style="display: none;opacity:1;background-color: rgba(0,0,0,0.05);">
						<div class="datagrid-mask-msg" style="left: 50%;height: 16px;margin-left: -99px;line-height: 16px;display: block;">
				       		 처리중 입니다, 기다리 십시요...
				    	</div> 
					</div>  
				</div> <!-- end of wrapper -->
			</div><!-- end of article -->
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<div class="popupWrapper" id="popup" style="position:fixed;left: 0">
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
									<th class="right" style="width:100px;">서비스 여부</th>
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