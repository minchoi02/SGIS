<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<script>
	$(document).ready(function(){
		$('#scheduleDate, #scheduleDateDetail').datepicker({
			showOn: 'both',
			buttonImageOnly: true,
			buttonImage: './../html/include/img/ico/ico_calendar.png',
			buttonText: '달력',
			changeYear: true,
			changeMonth: true,
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			monthNamesShort: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
			dateFormat: 'yy-mm-dd',
			minDate: new Date(Date.now()).
						toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
			  			replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')

		});
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSProvideDataMng.do'  , search_button : 'search' , search_box : 'resetForm' });
		ststistics.grid.create({
			target 	: 'datagrid-view' ,
			header : [
				{column : 'rnum' ,	 type : 'text' , name : '번호' 	, style : {"width" : '50px'}},
				{column : 'workNm' ,	type : 'text',	name : '업무명'		,	style : {"width" : '318px'}},
				{column : 'workInfo' ,		type : 'text',	name : '구분'		,	style : {"width" : '80px'}},
  				{column : 'workState' ,		type : 'text',	name : '작업상태'		,	style : {"width" : '80px'}},
 				{column : 'startDt' ,			type : 'text',	name : '시작일시'		,	style : {"width" : '80px'}},
				{column : 'endDt' 			, type : 'text' 		, name : '종료일시' 		, style : {"width" : '80px'}},
				{column : 'remove' 			, type : 'button' 		, name : '삭제' 		, style : {"width" : '50px'}, callback : function(obj){
					if(!confirm("삭제 하시겠습니까?"))return false;
					ststistics.asynchronous({
						url : '/api/ststistics/removeProvideData.do' ,
						data : {'workNo':obj.workNo},
						callback : function(resBody){
							if(resBody == 0){
								alert("삭제 하였습니다.");
								setTimeout(function(){
									location.reload();
								},100);
							}
						}
					});
				}}
				], 
				row_callback : function(rObject){
					$("#popupDetail").show();
 					//var data = this.data[rObject.rowIndex]
 					//var data = ststistics.grid.getSelectRowData();
 					var data = rObject.itmInfo;
					$("#workNo").val(data["workNo"]);
					$("#workNmDetail").val(data["workNm"]);
					if(data["reservInfo"] !== undefined){
						$("#scheduleDateDetail").val(data["reservInfo"].substr(0,8).replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3"));
						$("#scheduleHourDetail").val(data["reservInfo"].substr(8,2));
					}else{
						$("#scheduleDateDetail").val("");
						$("#scheduleHourDetail").val("");
					}
					$("#quInfoDetail").val(data["quInfo"]);
					if(data["workInfo"] == "마트구축"){
						$("#martYnDetail").prop("checked",true);
					}else if(data["workInfo"] == "파일생성"){
						$("#fileYnDetail").prop("checked",true);
					}else{
						$("#martYnDetail").prop("checked",true);
						$("#fileYnDetail").prop("checked",true);
					}
					if(data["dataDistinct"] == "norm"){
						$("#normDetail").prop("checked",true).change();
					}else{
						$("#gridDetail").prop("checked",true).change();
					}
					$("#dataTypeDetail").val(data["dataType"]);
					$("#startYearDetail").val(data["startYear"]);
					$("#endYearDetail").val(data["endYear"]);
					$("#errMsgDetail").val(data["errMsg"]);
					
				}
			
		});
		
		function popupClear(){
			$("#workNm").val("");
			$("#scheduleDate").val("");
			$("#quInfo").val("");
			$("#martYn").prop("checked",false);
			$("#fileYn").prop("checked",false);
			$("#norm").prop("checked",true).change();
			$("#dataType").val("");
			$("#startYear").val("");
			$("#endYear").val("");
			$("#scheduleHour").val("");
		}
		
		$("#registerPopup").on("click",function(){
			popupClear();
			$("#popup").show();
		});
		
		$("#stopDetail").on("click",function(){
			if(!confirm("중지 하시겠습니까?"))return false;
			ststistics.asynchronous({
				url : '/api/ststistics/updateStopDt.do' ,
				data : {'workNo':$("#workNo").val()},
				callback : function(resBody){
					if(resBody == 0){
						alert("중지 하였습니다.");
						setTimeout(function(){
							location.reload();
						},100);
						$("#popup"+targetId).hide();
					}
				}
			});
		});
		
		$("#excuteDetail").on("click",function(){
			if(!confirm("즉시실행 하시겠습니까?"))return false;
			ststistics.asynchronous({
				url : '/api/ststistics/updateExcuteNow.do' ,
				data : {'workNo':$("#workNo").val()},
				callback : function(resBody){
					if(resBody == 0){
						alert("즉시실행 하였습니다.");
						setTimeout(function(){
							location.reload();
						},100);
						$("#popup"+targetId).hide();
					}
				}
			});
		});
		
		$("#save, #saveDetail").on("click",function(event){
			var targetId = $(this).attr("id") == "saveDetail" ? "Detail" : "";
			if($("#workNm"+targetId).val() == ""){
				alert("업무명을 입력하세요");
				return
			}else if($("#quInfo"+targetId).val() == ""){
				alert("분기를 선택하세요");
				return
			}else if(!($("#martYn"+targetId).is(":checked") || $("#fileYn"+targetId).is(":checked"))){
				alert("작업구분을 선택하세요");
				return
			}else if($("#scheduleDate"+targetId).val() == "" && $("#scheduleHour"+targetId).val() != ""){
				alert("예약 날짜를 입력하세요");
				return
			}else if($("#scheduleDate"+targetId).val() != "" && $("#scheduleHour"+targetId).val() == ""){
				alert("예약 시간을 입력하세요");
				return
			}else if($("#grid"+targetId).is(":checked") && $("#dataType"+targetId).val() == ""){
				alert("인총/사총을 선택하세요");
				return
			}else if($("#grid"+targetId).is(":checked") && ($("#startYear"+targetId).val() == "" || $("#endYear"+targetId).val() == "")){
				alert("년도를 선택하세요");
				return
			}else{
				if(!confirm("저장 하시겠습니까?"))return false;
				var formData = new Object();
				formData["workNo"] = targetId == "Detail"? $("#workNo").val() : "";
				formData["workNm"] = $("#workNm"+targetId).val();
				formData["scheduleDate"] = $("#scheduleDate"+targetId).val().replace(/-/g,"") + $("#scheduleHour"+targetId).val()
				formData["quInfo"] = $("#quInfo"+targetId).val();
				if($("#martYn"+targetId).is(":checked") == true && $("#fileYn"+targetId).is(":checked")== false){
					formData["workInfo"] = "mart";
				}else if($("#martYn"+targetId).is(":checked") == false && $("#fileYn"+targetId).is(":checked")== true){
					formData["workInfo"] = "file";
				}else{
					formData["workInfo"] = "martfile";
				}
						
				if($("input[name=provide"+targetId+"]:checked").val() == "norm"+targetId){
					formData["dataDistinct"] = "norm";
				}else{
					formData["dataDistinct"] = "grid";
					formData["dataType"] = $("#dataType"+targetId).val();
					formData["startYear"] = $("#startYear"+targetId).val();
					formData["endYear"] = $("#endYear"+targetId).val();
				}
				
				$.ajax({
		            url: pageContext + '/api/ststistics/duplicateStstisticsUSProvideDataMng.do',
		            data: formData,
		            type: 'POST',
		            success: function(result){
		            	if (result) {
		            		if (!confirm('5시간 내에 같은 작업이 있습니다. 등록하시겠습니까?')) {return false};
		            	}
		            	$.ajax({
				            url: pageContext + '/api/ststistics/registerStstisticsUSProvideDataMng.do',
				            data: formData,
				            type: 'POST',
				            success: function(result){
				            	alert("등록에 성공하셨습니다.");
				            	$s.grid.create($s.grid.parameter);
				            	$("#popup"+targetId).hide();
				            } ,
				            error : function(){
				            	alert("저장에 실패하였습니다.");
				            	$s.grid.create($s.grid.parameter);
				            	$("#popup"+targetId).hide();
							}
				        });
		            }
		        });
				
				
			
			}
		});
		
		
		$("input[name='provide']").change(function(){
			if($("input[name='provide']:checked").val() == "grid"){
				$(".gridSelected").css("display","")
			}else{
				$(".gridSelected").css("display","none")
			}
		});
		
		$("input[name='provideDetail']").change(function(){
 			if($("input[name='provideDetail']:checked").val() == "gridDetail"){
				$(".gridSelectedDetail").css("display","")
			}else{
				$(".gridSelectedDetail").css("display","none")
			}
		});
		
		$("#startYear, #endYear").change(function(){
			if($("#startYear").val() != '' && $("#endYear").val() != ''){
				if($("#startYear").val() > $("#endYear").val()){
					var startYear = $("#startYear").val();
					var endYear = $("#endYear").val();
					$("#endYear").val(startYear);
					$("#startYear").val(endYear);
				}
			}
		})
	});
	</script>
</head>
	<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<!--<div class="lefitMenuWrapper"> --><!-- 2020년 SGIS고도화 3차 주석-->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					makeLeftMenu("3", "7", "5");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span>자료제공 관리</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">자료제공서비스 자동화</span><!-- 20201127 2020년 SGIS고도화 3차 수정-->
					</p>
				</div>
				<p class="title01">자료제공서비스 자동화</p><!--2019-02-19 수정  --><!-- 20201127 2020년 SGIS고도화 3차 수정-->
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="130" />
							<col width="560" />

						</colgroup>
						<tbody>
							<tr>
								<th class="right">업무명</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text" style="width:550px;"/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				
				<div class="searchBtn04">
					<a id="registerPopup" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for=registerPopup>신규등록</label>
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
						<div class="myTitleFont" id="popTitle">자료제공서비스 자동화 업무 등록</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<form id="popupForm" enctype="multipart/form-data">
						<table class="popupTable">
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">자동화 업무명</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									<td>
										<input type="text" id="workNm" name="workNm" maxlength="50" class="input_use13"/>
									</td>
								</tr>
								<tr>
									<th>작업예약</th>
									<td>
										<div>
											<a>
												<input type="text" class="input_use06" id="scheduleDate" style="width:150px; margin-right: 5px" readonly>
											</a>
											<select class="input_use08" id="scheduleHour" name="scheduleHour">
												<option value='' selected>선택하세요.</option>
												<script>
													for(hour=0;hour<=23;hour++){
														if(hour <= 9){
															document.write("<option value='0"+hour+"'>"+"0"+hour+":00"+ "</option>");
														}else{
															document.write("<option value='"+hour+"'>"+hour+":00"+ "</option>");
														}
													 }
												</script>
											</select>
										</div>
									</td>
								</tr>
								<tr>
									<th>분기</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									<td>
										<select class="input_use08" id="quInfo" name="quInfo">
											<option value="" selected>선택하세요.</option>
											<option value="2">2분기</option>
											<option value="4">4분기</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>작업구분</th>
									<td>
										<input type="checkbox" id="martYn" class="input_use09" /><label for="martYn" class="ml_5">마트구축</label>
										<input type="checkbox" id="fileYn" class="input_use09" /><label for="fileYn" class="ml_5">파일생성</label>
									</td>
								</tr>
								<tr>
									<th>자료제공</th>
									<td>
										<div class="radioBtnWrapper">
											<input type="radio" name="provide" id="norm" value="norm" checked="checked">
											<label for="norm">일반제료제공</label>
											<input type="radio" name="provide" id="grid" value="grid">
											<label for="grid">격자</label>
										</div>
									</td>
								</tr>
								<tr class="gridSelected" style="display:none">
									<th>자료대상</th>
									<td>
										<select class="input_use08" id="dataType" name="dataType">
											<option value="" disabled selected hidden>선택하세요.</option>
											<option value="인총">인구주택총조사</option>
											<option value="사총">전국사업체조사</option>
											<option value="농총">농림어업총조사</option>
										</select>
									</td>
								</tr>
								<tr class="gridSelected" style="display:none">
									<th>년도</th>
									<td>
										<select class="input_use08" id="startYear" name="startYear">
											<option value='' selected>시작년도</option>
											<script>
												var end_year = new Date().getFullYear() - 1
												for(year=2000;year<=end_year;year++){
												 document.write("<option value='"+year+"'>"+year+"</option>");
												}
											</script>
										</select>
										<select class="input_use08" id="endYear" name="endYear">
											<option value='' selected>종료년도</option>
											<script>
												var end_year = new Date().getFullYear() - 1
												for(year=2000;year<=end_year;year++){
												 document.write("<option value='"+year+"'>"+year+"</option>");
												}
											</script>
										</select>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					
					<div class="btnbox">
						<a id="save" 	class="save" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" 	class="cancel" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">닫기</label></a>
					</div>
				</div>
			</div>
		</div>
		
		<div class="popupWrapper" id="popupDetail" style="left: 0">
			<div class="popupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont">자료제공서비스 자동화 업무 수정</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<form id="popupFormDetail" enctype="multipart/form-data">
						<input type="hidden" id="workNo" name="workNo"/>
						<table class="popupTable">
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">자동화 업무명</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									<td>
										<input type="text" id="workNmDetail" name="workNmDetail" maxlength="50" class="input_use13"/>
									</td>
								</tr>
								<tr>
									<th>작업예약</th>
									<td>
										<div>
											<a>
												<input type="text" class="input_use06" id="scheduleDateDetail" style="width:150px; margin-right: 5px" readonly>
											</a>
											<select class="input_use08" id="scheduleHourDetail" name="scheduleHourDetail">
												<option value='' selected>선택하세요.</option>
												<script>
													for(hour=0;hour<=23;hour++){
														if(hour <= 9){
															document.write("<option value='0"+hour+"'>"+"0"+hour+":00"+ "</option>");
														}else{
															document.write("<option value='"+hour+"'>"+hour+":00"+ "</option>");
														}
													 }
												</script>
											</select>
										</div>
									</td>
								</tr>
								<tr>
									<th>분기</th><!-- 20201127 2020년 SGIS고도화 3차 수정-->
									<td>
										<select class="input_use08" id="quInfoDetail" name="quInfoDetail">
											<option value="" selected>선택하세요.</option>
											<option value="2">2분기</option>
											<option value="4">4분기</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>작업구분</th>
									<td>
										<input type="checkbox" id="martYnDetail" class="input_use09" /><label for="martYnDetail" class="ml_5">마트구축</label>
										<input type="checkbox" id="fileYnDetail" class="input_use09" /><label for="fileYnDetail" class="ml_5">파일생성</label>
									</td>
								</tr>
								<tr>
									<th>자료제공</th>
									<td>
										<div class="radioBtnWrapper">
											<input type="radio" name="provideDetail" id="normDetail" value="normDetail">
											<label for="normDetail">일반제료제공</label>
											<input type="radio" name="provideDetail" id="gridDetail" value="gridDetail">
											<label for="gridDetail">격자</label>
										</div>
									</td>
								</tr>
								<tr class="gridSelectedDetail" style="display:none">
									<th>인총/사총</th>
									<td>
										<select class="input_use08" id="dataTypeDetail" name="dataTypeDetail">
											<option value="" selected>선택하세요.</option>
											<option value="인총">인총</option>
											<option value="사총">사총</option>
											<option value="농총">농총</option>
										</select>
									</td>
								</tr>
								<tr class="gridSelectedDetail" style="display:none">
									<th>년도</th>
									<td>
										<select class="input_use08" id="startYearDetail" name="startYearDetail">
											<option value='' selected>시작년도</option>
											<script>
												var end_year = new Date().getFullYear() - 1
												for(year=2000;year<=end_year;year++){
												 document.write("<option value='"+year+"'>"+year+"</option>");
												}
											</script>
										</select>
										<select class="input_use08" id="endYearDetail" name="endYearDetail">
											<option value='' selected>종료년도</option>
											<script>
												var end_year = new Date().getFullYear() - 1
												for(year=2000;year<=end_year;year++){
												 document.write("<option value='"+year+"'>"+year+"</option>");
												}
											</script>
										</select>
									</td>
								</tr>
								<tr>
									<th>실패정보</th>
									<td>
										<input type="text" id="errMsgDetail" maxlength="50" class="input_use13" readonly/>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					
					<div class="btnbox">
						<a id="excuteDetail" 	class="excute" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="excute">즉시실행</label></a>
						<!-- <a id="stopDetail" 	class="stop" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="stop">작업정지</label></a> -->
						<a id="saveDetail" 	class="save" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancelDetail" 	class="cancel" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">닫기</label></a>
					</div>
				</div>
			</div>
		</div>
	</div>
<body>


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	