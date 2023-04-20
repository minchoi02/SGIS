<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>	
	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<title>관심주제 선택패턴 현황</title>
	<style>
		
		/* 전체 팝업창 스타일 작성 */
		.whole-popupWrapper {
			position: fixed;
		    left: 0;
		    top: 0;
		    right: 0;
		    bottom: 0;
		    display: none;
		    z-index: 2;
		    background-color: rgba(0,0,0,0.5);
		}
		
		.whole-popupWrapper .aplPopupWrapper {  
		   width: 1500px;
		}
		
		.table-flow {
			overflow: hidden;
			width: 1260px;
			margin: 0 auto;
		}
		
		.table-flow table {
			float: left;
			/* margin-left: 100px; */
			margin: 0 20px
		}
		
		.table-flow caption {
		    visibility: visible;
		    text-align: left;
		    padding-top: 2rem;
		    padding-bottom: 1.5rem;
		    font-size: 1.3rem;
		}
		
		.table-flow thead > tr th  {
			text-align: center;
		}
		
		/* 메인 테이블에서 클릭을 유도하기 위한 css 추가, 선택된 지역이 없는 row에 대해서는 반응하지 않도록 함. */
		#mainSearchResultTable .locationName:not([data-location-name=""]):hover {
			background-color: #eeeeea;
			font-weight:bold;
			cursor: pointer;
		}
		
		/* 메인 테이블에서 선택된 지역이 없는 row는 눌리지 않는다는 것을 알리기 위한 css */
		#mainSearchResultTable .locationName[data-location-name=""]:hover {
			cursor: not-allowed;
		}
		
		
		/* 팝업창에서 검색시 로딩화면.  */
		#popupMask {
		    z-index: 200;
		    display: none;
		    opacity: 1;
		    background-color: rgba(0,0,0,0.5);
		}
		
		
		.popupSearchTable, .whole-popupWrapper .tilte05 {
			margin-left: 140px;
		}
		
	</style>
	<script>
		
		function rowSpanMainTable(columNum) {
			$('#mainSearchResultTable').each(function() {
				var table = this;
				$.each(columNum /* 합칠 칸 번호, 배열로 입력 ,ex = [2] ===> 2번째 컬럼이 rowspan */, function(c, v) {
					var tds = $('>tbody>tr>td:nth-child(' + v + ')', table).toArray(), i = 0, j = 0;
					for(j = 1; j < tds.length; j ++) {
						if(tds[i].innerHTML != tds[j].innerHTML) {
							$(tds[i]).attr('rowspan', j - i);
							i = j;
							continue;
						}
						$(tds[j]).hide();
					}
					j --;
					if(tds[i].innerHTML == tds[j].innerHTML) {
						$(tds[i]).attr('rowspan', j - i + 1);
					}
				});
			});
		}
		
		function serviceRankTableUpdate(arr) {	// 사용 키워드 순위 테이블 최신화
			var html = '<tbody>';
			if(arr.length === 0) {
				html += '<tr style="text-align: center;">';
				html += '<td colspan="3" style="border-left: 1px solid #cacaca;">조회되는 데이터가 없습니다.</td>';
				html += '</tr>';
			} else {
				var lastRank;
				arr.forEach(function(item,index){ 
				    html += '<tr>';
				    html += '<th class="rank">'+item.rank+'</th>';
				    html += '<td class="statDataSrvNm">'+item.statDataSrvNm+'</td>';
				    html += '<td class="count">'+item.count+'</td>';
				    html += '</tr>';
				    lastRank = item.rank;
				})
				if(arr.length < 10) {	
					var remainLoop = 10 - arr.length;
					for(var i = 0; i < remainLoop ; i++) {
						html += '<tr>';
						 html += '<th class="rank">'+(lastRank+i+1)+'</th>';
						    html += '<td class="statDataSrvNm">-</td>';
						    html += '<td class="count">-</td>';
						html += '</tr>';
					}
				}
			}
			html += '</tbody>';
			$('.serviceUsedRankTable tbody').remove();
			$('.serviceUsedRankTable').append(html);
		}
		
		function kwrdUsedRankTableUpdate(arr) { // 사용 키워드 테이블 최신화
			var html = '<tbody>';
			if(arr.length === 0) {
				html += '<tr style="text-align: center;">';
				html += '<td colspan="3" style="border-left: 1px solid #cacaca;">조회되는 데이터가 없습니다.</td>';
				html += '</tr>';
			} else {
				var lastRank;
				arr.forEach(function(item,index){ 
					html += '<tr>';
				    html += '<th class="rank">'+item.rank+'</th>';
				    html += '<td class="slctnKwrd">'+item.slctnKwrd+'</td>';
				    html += '<td class="count">'+item.count+'</td>';
				    html += '</tr>';
				    lastRank = item.rank;
				})
				if(arr.length < 10) {	
					var remainLoop = 10 - arr.length;
					for(var i = 0; i < remainLoop ; i++) {
						html += '<tr>';
						html += '<th class="rank">'+(lastRank+i+1)+'</th>';
						    html += '<td class="statDataSrvNm">-</td>';
						    html += '<td class="count">-</td>';
						html += '</tr>';
					}
				}
			}
			html += '</tbody>';
			$('.kwrdUsedRankTable tbody').remove();
			$('.kwrdUsedRankTable').append(html);
		}
		
		
		
		
		function swrdUsedRankTableUpdate(arr) { // 사용 검색어 테이블 최신화
			var html = '<tbody>';
			if(arr.length === 0) {
				html += '<tr style="text-align: center;">';
				html += '<td colspan="3" style="border-left: 1px solid #cacaca;">조회되는 데이터가 없습니다.</td>';
				html += '</tr>';
			} else {
				var lastRank;
				arr.forEach(function(item,index){ 
					html += '<tr>';
				    html += '<th class="rank">'+item.rank+'</th>';
				    html += '<td class="searchWord">'+item.searchWord+'</td>';
				    html += '<td class="count">'+item.count+'</td>';
				    html += '</tr>';
				    lastRank = item.rank;
				})
				if(arr.length < 10) {
					var remainLoop = 10 - arr.length;
					for(var i = 0; i < remainLoop ; i++) {
						html += '<tr>';
						html += '<th class="rank">'+(lastRank+i+1)+'</th>';
						    html += '<td class="statDataSrvNm">-</td>';
						    html += '<td class="count">-</td>';
						html += '</tr>';
					}
				}
			}
			html += '</tbody>';
			$('.swrdUsedRankTable tbody').remove();
			$('.swrdUsedRankTable').append(html);
		}
		
		
		// 서비스 항목 조회수 순위, 키워드 사용 순위, 검색어 사용 순위 테이블을 최신화한다.
		function updateSubTables(response) { 
			//serviceRank		: 서비스 항목 조회수
			//kwrdUsedRank		: 사용 키워드 순위
			//searchWrdUsedRank	: 사용 검색어 순위
			
			var serviceRank = response.serviceRank;
			var kwrdUsedRank = response.kwrdUsedRank;
			var searchWrdUsedRank = response.searchWrdUsedRank;
			
			//console.log(serviceRank);		
			//console.log(kwrdUsedRank);		
			//console.log(searchWrdUsedRank);	
			
			serviceRankTableUpdate(serviceRank);
			kwrdUsedRankTableUpdate(kwrdUsedRank);
			swrdUsedRankTableUpdate(searchWrdUsedRank);
			
		}
		
		window.onload = function(){
			
			// 달렷 세팅
			//setDatepickerDefaultRangeNew('startDate','endDate');
			
			// 전체 팝업창 닫힘 버튼 
			$('.myXbtn').on("click",function(e){
			    $('.whole-popupWrapper').hide();
			});
			// 전체 팝업창 [나가기] 버튼
			$('.btnbox #cancel').on("click",function(e){
			    $('.whole-popupWrapper').hide();
			});
			
			
			$('#mainSearchResultTable').on("click"," td.locationName", function(a,b){
			    var $this = $(this);
			    var locationName = $this.data('location-name');
			    if(!locationName) {
			    	return;
			    }
			    var sidoCd = $this.data('sido-cd');
				var startDate = $this.prev().data('start-date');
				var endDate = $this.prev().data('end-date');
				console.log(locationName,sidoCd,startDate,endDate);
				
				$('#wholePopupForm > input[name=startDate]').val(startDate)
				$('#wholePopupForm > input[name=endDate]').val(endDate)
				
				$('.whole-popupWrapper').show();
				ststistics.asynchronous(
				    {
				        url : '/api/ststistics/getStstisticsSubDatas.do' ,
				        method:'get', 
				        data : {sidoCd:sidoCd, startDate:startDate, endDate: endDate} ,
				        callback : function(response){
				        	
				        	// 시도 코드를 방금 누른 td의 시도 코드와 일치시킴
				        	$('#popupSidoCd').val(sidoCd);
				        	
				        	// 시군구 option 추가
				        	ststistics.asynchronous({
						        url : '/api/ststistics/getAccessAreaSggCd.do' ,
						        method:'get', 
						        data : {sidoCd:$('#popupSidoCd').val()},
						        callback : function(response){
						        	
									$('#popupSggCd').empty();
						        	var sggArray = response.data;
						        	console.log(sggArray);
						        	var html = '<option selected value="">전체</option>';
						        	sggArray.forEach(function(item,index){
						        		html += '<option value="'+item.sggCd+'">'+item.sggNm+'</option>'	        		
						        	});
						        	$('#popupSggCd').append(html); 
						        }
						    });
				        	
				        	// 팝업에 있는 서브 테이블들을 모두 업데이트
				            updateSubTables(response);
				        }
				    }
				);
			});
			
			
			
			
			$('.searchBtn04').on('click',function(e){
				var $this = $(this);
				var searchDate = $('#searchDate').val();
				var searchDateType = $('#searchDateType').val();
			    ststistics.asynchronous({
			        url : '/api/ststistics/getStstisticsUSServiceUsedCntByAreaAndDate.do' ,
			        method:'get', 
			        data : { searchDate:searchDate,searchDateType:searchDateType} ,
			        beforeSend : function() {
			        	$this.css("pointer-events","none"); // 중복 클릭 방지
			        	$('#mainMask').show();// 로딩창 띄워주기
			        }, 
			        callback : function(response){
			            console.log(response);
			            
			            /* 메서드 작성 시작 */
			            var html = '<tbody>';
			            response.serviceUsedCnt.forEach(function(item,index){
			            	html += '<tr>';
						    html += '<th class="rowNum">'+item.rowNum+'</th>';
						    html += '<td class="searchDate" data-start-date="'+item.startDate+'" data-end-date="'+item.endDate+'">'+item.date+'</td>';
						    if(item.locationName) {
						    	html += '<td class="locationName" data-location-name="'+item.locationName+'" data-sido-cd="'+item.location+'">'+item.locationName +'</td>';
						    } else {
							    html += '<td class="locationName" data-location-name="" data-sido-cd="">지역 선택 안함</td>';
						    }
						    html += '<td class="count">'+item.count+'</td>';
						    html += '</tr>';
			            });
			            html += '</tbody>';
			            
			            $('#mainSearchResultTable tbody').remove();
						$('#mainSearchResultTable').append(html);
						rowSpanMainTable([2]);
						/* 메서드 작성 끝 */
						$('#excel_download-1').attr('href', "/s-portalcnm/api/ststistics/accessAreaExcelDataDownLoad.do?type=accessArea&"+$('#resetForm').serialize());
			        },
			        complete : function(){
			        	$this.css("pointer-events","");
			        	$('#mainMask').hide();// 로딩창 없애기
			        }
			    });
			
			});
			
			
			$('#popupSubmit').on("click",function(e){
			    
				console.log("sub search Clicked");	// 지워 주세요!!!
			    
				// { pointer-events: none; }
				
				var queryString = $('#wholePopupForm').serialize();
			    
				console.log(queryString);			// 지워 주세요!!!
			    
			    ststistics.asynchronous({
			        url : '/api/ststistics/getStstisticsSubDatas.do' ,
			        method:'get', 
			        data : queryString ,
			        beforeSend : function() {
			        	$('#popupMask').css("display","block");
			        },
			        callback : function(response){
						updateSubTables(response);
			        },
			        complete : function() {
			        	$('#popupMask').css("display","none");
			        }
			    });
				
			});
			
			
			$('#popupSidoCd').on("change",function(e){
				
			    ststistics.asynchronous({
			        url : '/api/ststistics/getAccessAreaSggCd.do' ,
			        method:'get', 
			        data : { sidoCd : this.value } ,
			        beforeSend : function() {
			        	$('#popupSubmit').css("pointer-events","none");
			        },
			        callback : function(response){
			        	
						$('#popupSggCd').empty();
			        	var sggArray = response.data;
			        	var html = '<option selected value="">전체</option>';
			        	sggArray.forEach(function(item,index){
			        		html += '<option value="'+item.sggCd+'">'+item.sggNm+'</option>'	        		
			        	});
			        	$('#popupSggCd').append(html); 
			        },
			        complete : function() {
			        	$('#popupSubmit').css("pointer-events","");
			        }
			    });
			});
			
			$('.searchBtn04').click();
			
			
		}
	</script>
</head>
<body>
	
	<div class="whole-popupWrapper" id="popup" style="position:fixed;left: 0;top:0">
		
			<div class="aplPopupWrapper" style="margin-top: 20px;position: relative;">
				<!-- 마스크 시작 -->
				<div class="datagrid-mask" id="popupMask" style="display: none;opacity:1;background-color: rgba(0,0,0,0.5);">
					<div class="datagrid-mask-msg" style="left: 50%;height: 16px;margin-left: -99px;line-height: 16px;display: block;">
			       		 처리중 입니다, 기다리 십시요...
			    	</div> 
				</div>
				<!-- 마스크 끝 -->
				<div class="aplPopupTitle">
					<div class="myTitleFont" id="popTitle">지역 상세정보</div>
					<div class="myXbtn">
						<a style="cursor: pointer">
							<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
						</a>
					</div>
				</div>
				<form id="wholePopupForm">
					<div class="tilte05" style="margin-bottom:-20px">조회조건</div>
					<table class="popupTable popupSearchTable" summary="조회조건" style="width: 750px;margin-bottom:30px">
						<caption>조회조건</caption>
						<colgroup>
				            <col width="20%">
				            <col width="20%">
				            <col width="20%">
				            <col width="20%">
				            <col width="20%">
				        </colgroup>
						<tbody>
							<tr>
								<th class="right" style="text-align: center">시도 선택</th>
								<td>
									<select class="input_use08" id="popupSidoCd" name="sidoCd">
										<c:forEach items="${sidoList}" var="item">
											<option value="${item.sidoCd}">${item.sidoNm}</option>
										</c:forEach>
									</select>
								</td>
								<th class="right" style="text-align: center">시군구 선택</th>
								<td>
									<select class="input_use08" id="popupSggCd" name="sggCd">
									</select>
								</td>
								<td style="text-align: center">
									<a id="popupSubmit" class="popupSubmit" style="cursor: pointer;background: #4d75d0;color: #fff;padding: 5px 10px;line-height: 0px;"><label style="cursor: pointer;" for="cancel">지역 검색</label></a>
								</td>
							</tr>
						</tbody>
					</table>
					<input type="hidden" name="startDate" value="">
					<input type="hidden" name="endDate" value="">
				</form><!-- end of wholePopupForm(조회 조건) -->
				
				<div class="tilte05" style="margin-bottom:-20px;margin-top:50px;">검색 결과</div>
				<div class="table-flow" style="position: relative;margin-top:10px;"> <!-- 테이블들을 가로로 열거하기 위한 것이다. -->
					<table class="popupTable serviceUsedRankTable" summary="서비스 항목 조회수 순위" style="width:400px;">
						<caption>서비스 항목 조회수 순위</caption>
						<colgroup>
				            <col width="15%">
				            <col width="60%">
				            <col width="25%">
				        </colgroup>
				        <thead>
				        	<tr >
				        		<th>순위</th>
				        		<th>서비스 항목</th>
				        		<th>총 사용수</th>
				        	</tr>
				        </thead>
				        <tbody></tbody>
					</table>
					
					<table class="popupTable kwrdUsedRankTable" summary="키워드 사용 순위" style="width:370px">
						<caption>키워드 사용 순위</caption>
						<colgroup>
				            <col width="15%">
				            <col width="60%">
				            <col width="25%">
				        </colgroup>
				        <thead>
				        	<tr >
				        		<th>순위</th>
				        		<th>키워드</th>
				        		<th>총 사용수</th>
				        	</tr>
				        </thead>
				        <tbody></tbody>
					</table>
					
					<table class="popupTable swrdUsedRankTable" summary="검색어 사용 순위" style="width:370px">
						<caption>검색어 사용 순위</caption>
						<colgroup>
				            <col width="15%">
				            <col width="60%">
				            <col width="25%">
				        </colgroup>
				        <thead>
				        	<tr >
				        		<th>순위</th>
				        		<th>검색어</th>
				        		<th>총 사용수</th>
				        	</tr>
				        </thead>
				        <tbody></tbody>
					</table>
				</div> <!-- end of table-flow -->
				
				<div class="btnbox">
					<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">나가기</label></a>
				</div>
			</div>
		
	</div>
	<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020-06-22 박상언 - 브라우저 줌아웃할 시에 .acticle이 아래로 밀림, 이를 위한 css 수정 -->
				<script type="text/javascript">
					makeLeftMenu("3", "10", "9");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span class="fontS">접속지역별 이용현황</span>
					</p>
				</div>
				<p class="title01" style="margin-bottom: 30px;">접속지역별 이용현황</p>
				
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="searchMain">
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
				        	<!-- 화면을 처음 표출할 때는 기간유형 : 연도별  / 검색년도는 가장 최신 년도로 한다. -->
				            <tr>
								<th class="right">기간유형</th>
								<td>
									<select class="input_use29" id="searchDateType" name="searchDateType">
										<option selected="selected" value="yearType">연도별</option>
										<option value="quarterType">분기별</option>
										<option value="monthType">월별</option>
									</select>
								</td>
								<th class="right">검색년도</th>
								<td>
									<select class="input_use29" id="searchDate" name="searchDate">
										<c:forEach items="${yearList}" var="item">
											<option value="${item.year}">${item.year}년</option>
										</c:forEach>
									</select>
								</td>
							</tr>
				        </tbody>
				    </table>
				</form><!-- end of #resetForm -->
				
				<div class="datagrid-wrap generalWrapper" style="position: relative;">
					<div class="tilte04 select-mapping-option selected mappingAnother" style="float:left;margin-top:0">검색결과</div>
					<div class="searchBtn04-1" style="float:right">
					    <a id="excel_download-1" href="/s-portalcnm/api/ststistics/accessAreaExcelDataDownLoad.do?type=accessArea&searchDateType=yearType&searchDate=2020" style="margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
					        <label style="cursor: pointer;" for="excel_download">엑셀 다운로드</label>
					    </a>
					</div> 
					<table class="apiTable18" id="mainSearchResultTable" summary="검색결과">
						<caption>검색결과</caption>
						<colgroup>
							<col width="10%">
							<col width="20%">
							<col width="50%">
							<col width="20%">
						</colgroup>
						<thead>
							<tr>
								<th class="right">순번</th>
								<th class="right">기간</th>
								<th class="right">행정구역명</th>
								<th class="right">서비스 조회수</th>
							</tr>
						</thead>
					</table>
					<div class="datagrid-mask" id="mainMask" style="display: none;opacity:1;background-color: rgba(0,0,0,0.3);">
						<div class="datagrid-mask-msg" style="left: 50%;height: 16px;margin-left: -99px;line-height: 16px;display: block;">
				       		 처리중 입니다, 기다리 십시요...
				    	</div> 
					</div>
				</div>
				
				<div class="datagrid-wrap detailWrapper" style="position: relative;">
					
					
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
					</div>
				</div>
			</div>
		</div>
		
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
</html>