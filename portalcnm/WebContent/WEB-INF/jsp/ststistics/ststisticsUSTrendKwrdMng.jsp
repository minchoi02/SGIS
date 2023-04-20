<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<style>
	 .apiTable02 tr td img{
			margin-left:4px;
			margin-right:4px;
	 }
	 .loader {
    	position: absolute;
    	left: 49%;
    	top: 40%;
    	z-index: 1;
    	width: 141px;
    	height: 58px;
    	border: gray 3px solid;"
	}
	</style>
	<script>
	var startDate, endDate, word;
	
	$(document).ready(function(){
		
		setDatepickerDefaultRangeNew('startDate','endDate');//달력나오는부분
		setTrendGrid();//트렌드 키워드 목록 grid
		setMainKwrdGrid();//메인키워드목록 grid
		
		//트렌드키워드 > 키워드 매핑
		$("#trendApply").click(function(){
			console.log('trend Apply');
			var trendRows = $('#trendList').datagrid('getSelections');
			var mainKwrdRows = $('#mainKwrdList').datagrid('getSelections');
			var trendSrchwrdSeqs=[];
			var ctlgMainKwrdSerials=[];
			
			//선택된 트렌드 키워드
			$.each(trendRows, function(index, item){
				trendSrchwrdSeqs.push(item.seq);
			});
			
			//선택된 메인키워드
			$.each(mainKwrdRows, function(index, item){
				ctlgMainKwrdSerials.push(item.ctlgMainKwrdSerial);
			});
			console.log(trendSrchwrdSeqs);
			console.log(ctlgMainKwrdSerials);
			if(trendSrchwrdSeqs.length == 0){
				alert("트렌드 검색명을 선택하세요");
				return false;
			}
			
			if(ctlgMainKwrdSerials.length == 0){
				alert("키워드명을 선택하세요");
				return false;
			}

			$.ajax({
				  url: pageContext + '/api/ststistics/registerStstisticsUSTrendKwrdMapping.do',
				  data: {"trendSrchwrdSeqs":trendSrchwrdSeqs, "ctlgMainKwrdSerials":ctlgMainKwrdSerials},
				  method : 'post',
				  success : function(resBody){
					  alert("등록에 성공하셨습니다.");
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});

		});//트렌드키워드 > 키워드 저장 및 서비스 매핑 end
		
		//유사도 적용 start
		$("#simildegerKwrdApply").click(function(){
			$('#mainKwrdList').datagrid({
				data: []
			}); //초기화
			var trendRows = $('#trendList').datagrid('getSelections');
			var trendSrchwrdSeqs=[];
			console.log(trendRows);
			if(trendRows.length == 0){
				alert("트렌드 검색명을 선택하세요");
			}else{
				$("#loader").show();
				//선택된 키워드
				$.each(trendRows, function(index, item){
					trendSrchwrdSeqs.push(item.seq);
				});
				
				$.ajax({
					  url: pageContext + '/api/ststistics/selectCtlgRelWordList.do',
					  data: {"trendSrchwrdSeqs":trendSrchwrdSeqs, "simildeger":$("#simildeger").val()},
					  method : 'post',
					  success : function(resBody){
						  $("#loader").hide();
						  $(resBody.rows).each(function(){
							  console.log(this);
							  if(this.ctlgMainKwrd != null && this.ctlgMainKwrd != "undefined" && this.ctlgMainKwrd != ""){
							  $('#mainKwrdList').datagrid('appendRow',{
								  ctlgMainKwrdSerial : this.ctlgMainKwrd,
								  ctlgMainKwrd : this.ctlgMainKwrd,
								  trendSrchwrd : this.trendSrchwrd,
								  simildeger : this.simildeger
								});
							  }
							});
					  },
					  error : function(){
						  alert("서버와의 통신이 원할하지 않습니다.");
					  },
				});
			}
		});//유사도 적용 end
		
	});//ready end
	
	function setTrendGrid(){
		$('#trendList').datagrid({
			columns : [ [ {
				field : 'seq',
				title : '체크',
				width : 120,
				align : 'center',
				checkbox : true
			},{
				field : 'rnum',
				title : '순위',
				width : 40,
				align : 'center',
				sortable : true
			}, {
				field : 'trendKwrdNm',
				title : '트렌드 검색명',
				width : 150,
				align : 'center',
				sortable : true
			}, {
				field : 'trendKwrdCnt',
				title : '검색수',
				width : 80,
				align : 'center',
				sortable : true
			} ] ],
			queryParams : {
				//startDate : startDate,
				//endDate : endDate
			},
			url : pageContext + '/api/ststistics/getStstisticsUSTrendKwrdList.do',
			method: 'POST'
		});
	}
	
	function setMainKwrdGrid(){
		$('#mainKwrdList').datagrid({
			columns : [ [ {
				field : 'ctlgMainKwrdSerial',
				title : '체크',
				width : 28,
				align : 'center',
				checkbox : true
			},{
				field : 'ctlgMainKwrd',
				title : '대표 키워드명',
				width : 250,
				align : 'center',
				sortable : true
			},{
				field : 'trendSrchwrd',
				title : '연관 트렌드명',
				width : 250,
				align : 'center',
				sortable : true
			},{
				field : 'simildeger',
				title : '유사도',
				width : 70,
				align : 'center',
				sortable : true
			} ] ]	
		});	
	}
	
	//검색
	function doSearch(index){
		if(index == 'trend'){
			console.log('trend');

			$('#trendList').datagrid('load',{
				startDate: $('#startDate').val(),
				endDate: $('#endDate').val()
		    });
		}else{	

			$('#mainKwrdList').datagrid({
				data: []
			}); //초기화

			$.ajax({
				  url: pageContext + '/api/ststistics/getStstisticsUSMainKwrdList.do',
				  data: {"word":$('#word').val()},
				  method : 'post',
				  success : function(resBody){
					  $(resBody.rows).each(function(){
						  console.log(this);
						  if(this.ctlgMainKwrd != null && this.ctlgMainKwrd != "undefined" && this.ctlgMainKwrd != ""){
						  $('#mainKwrdList').datagrid('appendRow',{
							  ctlgMainKwrdSerial : this.ctlgMainKwrd,
							  ctlgMainKwrd : this.ctlgMainKwrd,

							});
						  }
						});
					 
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});			
		}

	}
	
	</script>
</head>

<body>
	<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents" style="width:1260px">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box">
				<script type="text/javascript">
					makeLeftMenu("3", "10", "11");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
				</script>
			</div>
			<!-- cls:left end -->
			<div class="acticle" style="width:1020px">
				<div class="location">
					<p>
						<a><img src='<c:url value="/html/include/img/ico/ico_home.png"/>' alt="home" /></a>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span>
						<span>서비스 관리</span> 
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span> My통계로</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">트렌드관리</span>
					</p>
				</div>
				<p class="title01">트렌드관리</p><!--2019-02-19 수정  -->
				
				<div style="float: left;width: 300px;margin-right: 35px;"><!-- 트렌드키워드 -->
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="trendSearch" >
					<a href="#" onclick="doSearch('trend');" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm1">
					<table class="apiTable02" summary="조회조건" style="width: 300px;">
						<caption>조회조건</caption>
						<colgroup>
							<col width="20%" />
							<col width="20%" />
						</colgroup>
						<tbody>
							<tr>
								<th>기간</th>
								<td colspan="3" id="DATE">
									<div class="searchBtn02">
										<a>
											<input type="text" class="input_use06" id="startDate" name="startDate" style="width:66px;" readonly>
										</a>
									</div>
									<div class="searchBtn02">
										<a>
											<input type="text" class="input_use06" id="endDate" name="endDate" style="width:66px;" readonly>
										</a>
									</div>
	                             </td>
							</tr>
						</tbody>
					</table>
				</form>
				<table id="trendList" class="" title="검색결과" style="width:300px;height:700px"
            		data-options="singleSelect:true,collapsible:true"><!-- 20201127 2020년 SGIS고도화 3차-->
    			</table>
			</div><!-- 트렌드 키워드 end  -->

			<div style="position: relative;top: 270px; rigth:6px">
				<select class="input_use08" id="simildeger" name="simildeger" style="width:65px;">
					<option value="">전체</option>
					<option value="0.1">0.1</option>
					<option value="0.2">0.2</option>
					<option value="0.3">0.3</option>
					<option value="0.4">0.4</option>
					<option value="0.5">0.5</option>
					<option value="0.6">0.6</option>
					<option value="0.7">0.7</option>
					<option value="0.8">0.8</option>
					<option value="0.9">0.9</option>
				</select>
			</div>									
			<div style="position: relative;top: 277px; rigth:6px"><!-- 적용버튼 -->
				<input type='button' id="simildegerKwrdApply" value='유사도 적용' style="width:65px;"/>
			</div><!-- 적용버튼 end-->
			<div style="position: relative;top: 283px;"><!-- 적용버튼 -->
				<input type='button' id="trendApply" value='키워드 매핑' style="width:65px;"/>
			</div><!-- 적용버튼 end-->
			
			<div style="float: left;width:600px;margin-left: 418px;position: absolute;top: 70px;"><!-- 서비스 -->
				
				<div class="tilte03">조회조건</div>
			<div class="searchBtn04" id="serviceSearch" >
			<a href="#" onclick="doSearch('service');" style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
			</div>
		<form id="resetForm2">
					<table class="apiTable02" summary="조회조건" style="width: 600px;">
						<caption>조회조건</caption>
						<colgroup>
							<col width="16%" />
							<col width="20%" />
						</colgroup>
						<tbody>
							<tr>
								<th class="right">키워드명</th>
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text" style="width:450px"/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<table id="mainKwrdList" class="" title="검색결과" style="width:600px;height:700px"
            		data-options="singleSelect:false,collapsible:true">
    			</table>
				</div><!-- 서비스 end-->
				
			</div>
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<div class="loader" id="loader" style="display:none;"><p style="padding-top: 12%;padding-left: 9%;font-size: 18px;">진행중입니다.</p></div>
	</div>
</body>
</html>