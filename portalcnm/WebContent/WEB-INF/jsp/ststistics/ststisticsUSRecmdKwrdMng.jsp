<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<%@include file="/jsp/include/ststisticsScript.jsp" %>
<!-- 2020-06-23 박상언, 팝업 생성 후 스크롤 동작시 뒷배경 이상, css 추가  -->
<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
<script type="text/javascript">
	var searchKwrdNm = []; //검색키워드명
	var searchKwrdCnt = []; //검색키워드 검색수
	var selectSearchKwrd = '';
	var rowId= '';
	
	$(document).ready(function(){
		
		//달력나오는부분
		setDatepickerDefaultRangeNew('startDate','endDate');
		
		//생애주기 검색조건
		ststistics.asynchronous({
			url : '/api/ststistics/getStstisticsUSLifeCycleList.do' ,
			data : "",
			callback : function(resBody){
				$("#lifeCycleNm").empty();
				$("#lifeCycleNm").append($("<option>").text("선택하세요").attr("value" , ""));
				$(resBody.data).each(function(){
					$("#lifeCycleNm").append($("<option>").text(this.lfeCycleNm).attr("value" , this.lfeCycleId));
				});
				
				//통계거리 검색조건
// 				ststistics.asynchronous({
// 					url : '/api/ststistics/getMappingInterestsList.do' ,
// 					data : "",
// 					callback : function(resBody){
// 						$("#interestsNm").empty();
// 						$("#interestsNm").append($("<option>").text("선택하세요").attr("value" , ""));
// 						$(resBody.data).each(function(){
// 							$("#interestsNm").append($("<option>").text(this.statDistanceNm).attr("value" , this.statDistanceId));
// 						});
// 					}
// 				});				
			}
		});
		
		//통계거리 검색조건
		$("#lifeCycleNm").on("change", function(){
			var lifeCycleId = $(this).val();
			if(lifeCycleId == ''){
				$("#interestsNm").empty();
				$("#interestsNm").append($("<option>").text("선택하세요").attr("value" , ""));				
			}else{
				ststistics.asynchronous({
					url : '/api/ststistics/getMappingInterestsList.do' ,
					data : {'lifeCycleId':lifeCycleId},
					callback : function(resBody){
						$("#interestsNm").empty();
						$("#interestsNm").append($("<option>").text("선택하세요").attr("value" , ""));
						$(resBody.data).each(function(){
							$("#interestsNm").append($("<option>").text(this.statDistanceNm).attr("value" , this.statDistanceId));
						});
					}
				});
			}
		});
		
		//검색
		$("#search").click(function(){
			var lifeCycleId = $("#lifeCycleNm option:selected").val();
			var interestsId = $("#interestsNm option:selected").val();
			var startDate = ($("#startDate").val()).replace(/\-/g,'');
			var endDate = ($("#endDate").val()).replace(/\-/g,'');

			if(lifeCycleId == undefined || lifeCycleId == null || lifeCycleId == ''){
				alert("생애주기를 선택해주세요");
				return;
			}else{
				//초기화
				for(var i=0; i<10; i++ ){
					//my통계로 검색키워드
					$("#searchKwrdNm_"+(i + 1)).text('');
					$("#searchKwrdCnt_"+(i + 1)).text('');
										
					//검색키워드 선택 팝업창 데이터
					$("#ssKwrdNm_"+(i + 1)).text('');
					$("#ssval_"+(i + 1)).val('');
					
					//트렌드 키워드
					$("#ctlgMainKwrdNm_"+(i + 1)).text('');
					$("#ctlgMainKwrdModDate_"+(i + 1)).text('');
//	 				$("#trendKwrdNm_"+(i + 1)).text('');
//	 				$("#trendKwrdCnt_"+(i + 1)).text('');
//	 				$("#trendKwrdSource_"+(i + 1)).text('');

					//메인키워드 선택 팝업창 데이터
					$("#ttKwrdNm_"+(i + 1)).text('');
					$("#ttval_"+(i + 1)).val('');
				}				
				
				$("#lfeCycleId").val(lifeCycleId);
				$("#statDistanceId").val(interestsId);
				
				searchKwrdNm = [];//차트데이터 초기화
				searchKwrdCnt = [];//차트데이터 초기화
				
				//추천키워드 내역 조회
				ststistics.asynchronous({
					url : '/api/ststistics/getRecmdAndSearchKwrdList.do' ,
					data : {'lifeCycleId':lifeCycleId, 'interestsId':interestsId, 'startDate':startDate, 'endDate':endDate},
					callback : function(resBody){
						console.log(resBody);
						var targets = $("#recmdKwrd1 , #recmdKwrd2 , #recmdKwrd3 , #recmdKwrd4 , #recmdKwrd5");
						targets.val('');
						//추천키워드
						if(resBody.recmd){
							targets.each(function(){
								$(this).val(resBody.recmd[$(this).attr("id")]);
								
							});
						}
						//검색키워드 
						if(resBody.search){
							$.each(resBody.search, function(index, item){
								
								
								//차트
								/*
								searchKwrdNm.push(item.searchWord);
								searchKwrdCnt.push(item.cnt);
								startChart();
								*/
								//표
								$("#searchKwrdNm_"+(index + 1)).text(item.searchWord);
								$("#searchKwrdCnt_"+(index + 1)).text(item.cnt);
								
								//검색키워드 선택 팝업창 데이터
								$("#ssKwrdNm_"+(index + 1)).text(item.searchWord);
								//$("#ssKwrdCnt_"+(index + 1)).text(item.cnt);
								$("#ssval_"+(index + 1)).val(item.searchWord);
							});
						}
						//트렌드키워드
						if(resBody.mainKwrd){
							$.each(resBody.mainKwrd, function(index, item){
								$("#ctlgMainKwrdNm_"+(index + 1)).text(item.ctlgMainKwrd);
								$("#ctlgMainKwrdModDate_"+(index + 1)).text(item.modDate);
// 								$("#trendKwrdNm_"+(index + 1)).text(item.trendSrchwrd);
// 								$("#trendKwrdCnt_"+(index + 1)).text(item.accCnt);
// 								$("#trendKwrdSource_"+(index + 1)).text(item.trendKwrdSource);
								
								$("#ttKwrdNm_"+(index + 1)).text(item.ctlgMainKwrd);
								//$("#ttKwrdCnt_"+(index + 1)).text(item.accCnt);
								$("#ttval_"+(index + 1)).val(item.ctlgMainKwrd);
								
							});
						}
					}
				});
			}
		});
		
		$("#popup #savebtn").click(function(){
			selectSearchKwrd = $(":input:radio[name=keyword]:checked").val();
			
			if(selectSearchKwrd == undefined || selectSearchKwrd == null || selectSearchKwrd == ''){
				alert("수정 대상(인기검색어/메인키워드)을 선택해주세요.");
				return;
			}else{
				$("#"+rowId).val(selectSearchKwrd);
				$("#popup , .popupWrapper").hide();				
			}
		});
		
		$("#recmdKwrdSave").click(function(){
// 			$("#lfeCycleId").val($("#lifeCycleNm option:selected").val());
// 			$("#statDistanceId").val($("#interestsNm option:selected").val());
			var lifeCycleId = $("#lfeCycleId").val();
			var interestsId = $("#statDistanceId").val();
			console.log($("#lfeCycleId").val());
			console.log($("#statDistanceId").val());

			if((lifeCycleId == undefined || lifeCycleId == null || lifeCycleId == '')
					 && (interestsId == undefined || interestsId == null || interestsId == '')){
				alert("추천키워드 검색 후 이용가능합니다.");
				return;
			}else{
				var param =  jQuery("#recmdKwrdList").serialize();
				var recmdkwrdck = [];
				var chkOverlap = true;
				
				//console.log($("#recmdKwrdList").val());
				//추천키워드 중복체크
				var temp = $("#recmdKwrdList td").find('input[type="text"]')
				
				temp.each(function(index, item){
					var value = $("#"+item.id).val()
					
					if(value != undefined && value != ''){
						if(recmdkwrdck.indexOf(value) == -1){
							recmdkwrdck.push(value);
						}else{
							chkOverlap = false;
						}
					}
				});
	
				//추천키워드 저장
				if(chkOverlap){
					if(confirm('저장하시겠습니까?') != 0){
						console.log("저장?");
						ststistics.asynchronous({url : '/api/ststistics/registerStstisticsUSLifeCycleRecmdkwrd.do' , data : param , callback : function(resBody){
							if(resBody.code == 0){
								alert("정상 처리 되었습니다.");					
							}else{
								alert("추천 키워드 등록에 실패 했습니다.");
							}
						}}); 
					}else{
						console.log("저장안한다");
					}
				}else{
					alert("추천키워드가 중복입니다.");
				}
			}
		});
		

	});//ready end
	
	//차트
	/*
	function startChart(){
		var chartOptions = {
			chart: {
    			renderTo: 'chart',
  				type: 'bar'
  			},
  			title: {
  				text: '검색 키워드 순위'
  			},
  			xAxis: {
  				categories: searchKwrdNm
  			},
  			yAxis: {
  				title: 'Value'
  			},
  			series: [{
  				name: '검색 수',
  				data: searchKwrdCnt
  			}]
		}

		var chart = new Highcharts.Chart(chartOptions);
	}
	*/
	
	function startPopup(data){
		rowId = data;
		$("#popup , .popupWrapper").show();
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
					makeLeftMenu("3", "10", "6");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span class="fontS">추천키워드 관리</span>
					</p>
				</div>
				<p class="title01">추천키워드 관리</p>
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="130" />
							<col width="250" />
							<col width="130" />
							<col width="250" />
						</colgroup>
						<tbody>
							<tr>
								<th class="right">생애주기</th>
								<td>
									<select class="input_use29" id="lifeCycleNm" name="lifeCycleNm">
										<option value="">선택하세요</option>
									</select>
								</td>
								<th class="right">관심분야</th>
								<td>
									<select class="input_use29" id="interestsNm" name="interestsNm">
										<option value="">선택하세요</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>검색키워드<br> 검색기간</th>
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
				</form>
				<div class="tilte03">생애주기 및 관심분야별 추천키워드</div>
				<div class="searchBtn04">
					
					<div class="searchBtn04" style="margin-bottom: 15px;">
						<a  id="recmdKwrdSave" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 10px;">		
							<label style="cursor: pointer;" for="register">저장</label>
						</a>
					</div>
					
				</div>
				<form id="recmdKwrdList" >
				<table class="apiTable15" summary="검색결과">
					<tr style="display:none;">
						<th class="right" style="width:100px;'">추천키워드</th>
						<td>
							<input type="hidden" id="lfeCycleId" name="lfeCycleId" data-edit="false" maxlength="50" class="input_use13" />
							<input type="hidden" id="statDistanceId" name="statDistanceId" data-edit="false" maxlength="50" class="input_use13" />
						</td>
					</tr>
					<tr>
						<th class="right">순번</th>
						<th class="right">추천키워드</th>
						<th class="right">수정</th>
					</tr>
					<!-- 추천키워드1 -->
					<tr>
						<td>1</td>
						<td>
							<input type="text" id="recmdKwrd1" name="recmdKwrd1" class="input_use30" style="width: 500px; height: 20px;" />
						</td>
						<td class="right">
							<input type="button" value="선택" style="border: 1px solid #d3d6da;background: #fff;padding: 3px;color: #777676;font-size: 11px;" onclick="startPopup('recmdKwrd1');"/>
						</td>
					</tr>
					<!-- 추천키워드2 -->
					<tr>
						<td>2</td>
						<td>
							<input type="text" id="recmdKwrd2" name="recmdKwrd2" class="input_use30" style="width: 500px; height: 20px;" />
						</td>
						<td class="right">
							<input type="button" value="선택" style="border: 1px solid #d3d6da;background: #fff;padding: 3px;color: #777676;font-size: 11px;" onclick="startPopup('recmdKwrd2');"/>
						</td>
					</tr>
					<!-- 추천키워드3 -->
					<tr>
						<td>3</td>
						<td>
							<input type="text" id="recmdKwrd3" name="recmdKwrd3" class="input_use30" style="width: 500px; height: 20px;" />
						</td>
						<td class="right">
							<input type="button" value="선택" style="border: 1px solid #d3d6da;background: #fff;padding: 3px;color: #777676;font-size: 11px;" onclick="startPopup('recmdKwrd3');"/>
						</td>
					</tr>
					<!-- 추천키워드4 -->
					<tr>
						<td>4</td>
						<td>
							<input type="text" id="recmdKwrd4" name="recmdKwrd4" class="input_use30" style="width: 500px; height: 20px;" />
						</td>
						<td class="right">
							<input type="button" value="선택" style="border: 1px solid #d3d6da;background: #fff;padding: 3px;color: #777676;font-size: 11px;" onclick="startPopup('recmdKwrd4');"/>
						</td>
					</tr>
					<!-- 추천키워드5 -->
					<tr>
						<td>5</td>
						<td>
							<input type="text" id="recmdKwrd5" name="recmdKwrd5" class="input_use30" style="width: 500px; height: 20px;" />
						</td>
						<td class="right">
							<input type="button" value="선택" style="border: 1px solid #d3d6da;background: #fff;padding: 3px;color: #777676;font-size: 11px;" onclick="startPopup('recmdKwrd5');"/>
						</td>
					</tr>
				</table>
				</form>
				<!-- 차트 start-->
				<!--  <div id="chart"></div> -->
				<!-- 차트 end -->
				<!-- 2020-06-23 박상언, IE(Internet Explorer)를 통한 페이지 호출 시, float:initial 이 먹히지 않아서 float:none으로 수정 -->
				<div class="tilte03" style="margin-bottom:7px; float:none;">My통계로 인기검색어 및 메인키워드 </div>
				<div style="float:left; width:48%;">
				<table class="apiTable15" summary="검색결과" style="width:100%;">
					<tr>
						<th class="right" style="width:30px;">순위</th>
						<th class="right">인기검색어</th>
						<th class="right">검색횟수</th>
					</tr>
					<tbody  id="searchTable">
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">1</td>
						<td id="searchKwrdNm_1"></td>
						<td id="searchKwrdCnt_1" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">2</td>
						<td id="searchKwrdNm_2"></td>
						<td id="searchKwrdCnt_2" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">3</td>
						<td id="searchKwrdNm_3"></td>
						<td id="searchKwrdCnt_3" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">4</td>
						<td id="searchKwrdNm_4"></td>
						<td id="searchKwrdCnt_4" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">5</td>
						<td id="searchKwrdNm_5"></td>
						<td id="searchKwrdCnt_5" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">6</td>
						<td id="searchKwrdNm_6"></td>
						<td id="searchKwrdCnt_6" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">7</td>
						<td id="searchKwrdNm_7"></td>
						<td id="searchKwrdCnt_7" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">8</td>
						<td id="searchKwrdNm_8"></td>
						<td id="searchKwrdCnt_8" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">9</td>
						<td id="searchKwrdNm_9"></td>
						<td id="searchKwrdCnt_9" class="right"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">10</td>
						<td id="searchKwrdNm_10"></td>
						<td id="searchKwrdCnt_10" class="right"></td>
					</tr>
					</tbody>
				</table>
				</div>
				<div style= "float:right; width:48%;">
				<table class="apiTable15" summary="검색결과" style="width:100%;">
					<tr>
						<th class="right" style="width:30px;">순위</th>
						<th class="right">메인키워드</th>
						<th class="right">등록일자</th>
					</tr>
					<tbody id="trendTable">
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">1</td>
						<td id="ctlgMainKwrdNm_1"></td>
						<td id="ctlgMainKwrdModDate_1"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">2</td>
						<td id="ctlgMainKwrdNm_2"></td>
						<td id="ctlgMainKwrdModDate_2"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">3</td>
						<td id="ctlgMainKwrdNm_3"></td>
						<td id="ctlgMainKwrdModDate_3"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">4</td>
						<td id="ctlgMainKwrdNm_4"></td>
						<td id="ctlgMainKwrdModDate_4"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">5</td>
						<td id="ctlgMainKwrdNm_5"></td>
						<td id="ctlgMainKwrdModDate_5"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">6</td>
						<td id="ctlgMainKwrdNm_6"></td>
						<td id="ctlgMainKwrdModDate_6"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">7</td>
						<td id="ctlgMainKwrdNm_7"></td>
						<td id="ctlgMainKwrdModDate_7"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">8</td>
						<td id="ctlgMainKwrdNm_8"></td>
						<td id="ctlgMainKwrdModDate_8"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">9</td>
						<td id="ctlgMainKwrdNm_9"></td>
						<td id="ctlgMainKwrdModDate_9"></td>
					</tr>
					<tr>
						<td style="background:#f8f8f8;font-weight:bold">10</td>
						<td id="ctlgMainKwrdNm_10"></td>
						<td id="ctlgMainKwrdModDate_10"></td>
					</tr>
					</tbody>
				</table>				
<!-- 				<table class="apiTable15" summary="검색결과" style="width:100%;"> -->
<!-- 					<tr> -->
<!-- 						<th class="right">순위</th> -->
<!-- 						<th class="right">트렌드 키워드</th> -->
<!-- 						<th class="right">검색수</th> -->
<!-- 						<th class="right">출처</th> -->
<!-- 					</tr> -->
<!-- 					<tbody id="trendTable"> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">1</td> -->
<!-- 						<td id="trendKwrdNm_1"></td> -->
<!-- 						<td id="trendKwrdCnt_1" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_1"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">2</td> -->
<!-- 						<td id="trendKwrdNm_2"></td> -->
<!-- 						<td id="trendKwrdCnt_2" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_2"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">3</td> -->
<!-- 						<td id="trendKwrdNm_3"></td> -->
<!-- 						<td id="trendKwrdCnt_3" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_3"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">4</td> -->
<!-- 						<td id="trendKwrdNm_4"></td> -->
<!-- 						<td id="trendKwrdCnt_4" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_4"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">5</td> -->
<!-- 						<td id="trendKwrdNm_5"></td> -->
<!-- 						<td id="trendKwrdCnt_5" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_5"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">6</td> -->
<!-- 						<td id="trendKwrdNm_6"></td> -->
<!-- 						<td id="trendKwrdCnt_6" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_6"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">7</td> -->
<!-- 						<td id="trendKwrdNm_7"></td> -->
<!-- 						<td id="trendKwrdCnt_7" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_7"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">8</td> -->
<!-- 						<td id="trendKwrdNm_8"></td> -->
<!-- 						<td id="trendKwrdCnt_8" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_8"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">9</td> -->
<!-- 						<td id="trendKwrdNm_9"></td> -->
<!-- 						<td id="trendKwrdCnt_9" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_9"></td> -->
<!-- 					</tr> -->
<!-- 					<tr> -->
<!-- 						<td style="background:#f8f8f8;font-weight:bold">10</td> -->
<!-- 						<td id="trendKwrdNm_10"></td> -->
<!-- 						<td id="trendKwrdCnt_10" class="right"></td> -->
<!-- 						<td id="trendKwrdSource_10"></td> -->
<!-- 					</tr> -->
<!-- 					</tbody> -->
<!-- 				</table> -->
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
						<div class="myTitleFont" id="popTitle">추천키워드 수정</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" style="margin-top: 10px;"/>
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="popupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup" >
							<caption>추천키워드 등록popup</caption>
							<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="35%" />
							<col width="10%" />
							<col width="35%" />
						</colgroup>
								<tr>
									<th class="right">순위</th>
									<th class="right"> </th>
									<th class="right">인기검색어</th>
									<th class="right"> </th>
									<th class="right">메인키워드</th>
								</tr>
								<tbody id="ssTable">
								<tr>
									<td>1</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_1">
									</td>
									<td id="ssKwrdNm_1"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_1">
									</td>
									<td id="ttKwrdNm_1"></td>
								</tr>
								<tr>
									<td>2</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_2">
									</td>
									<td id="ssKwrdNm_2"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_2">
									</td>
									<td id="ttKwrdNm_2"></td>
								</tr>
								<tr>
									<td>3</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_3">
									</td>
									<td id="ssKwrdNm_3"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_3">
									</td>
									<td id="ttKwrdNm_3"></td>
								</tr>
								<tr>
									<td>4</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_4">
									</td>
									<td id="ssKwrdNm_4"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_4">
									</td>
									<td id="ttKwrdNm_4"></td>
								</tr>
								<tr>
									<td>5</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_5">
									</td>
									<td id="ssKwrdNm_5"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_5">
									</td>
									<td id="ttKwrdNm_5"></td>
								</tr>
								<tr>
									<td>6</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_6">
									</td>
									<td id="ssKwrdNm_6"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_6">
									</td>
									<td id="ttKwrdNm_6"></td>
								</tr>
								<tr>
									<td>7</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_7">
									</td>
									<td id="ssKwrdNm_7"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_7">
									</td>
									<td id="ttKwrdNm_7"></td>
								</tr>
								<tr>
									<td>8</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_8">
									</td>
									<td id="ssKwrdNm_8"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_8">
									</td>
									<td id="ttKwrdNm_8"></td>
								</tr>
								<tr>
									<td>9</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_9">
									</td>
									<td id="ssKwrdNm_9"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_9">
									</td>
									<td id="ttKwrdNm_9"></td>
								</tr>
								<tr>
									<td>10</td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ssval_10">
									</td>
									<td id="ssKwrdNm_10"></td>
									<td style="border-left: 1px solid #cacaca;">
										<input type="radio" name="keyword" id="ttval_10">
									</td>
									<td id="ttKwrdNm_10"></td>
								</tr>
							</tbody>
						</table>
					<div class="btnbox">
						<a id="savebtn" class="savebtn" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="savebtn">등록</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
</html>