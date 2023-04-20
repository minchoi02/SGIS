<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' /><!-- 2020년 SGIS고도화 3차 - 팝업 생성 후 스크롤 동작시 뒷배경 이상현상, css 추가  -->
	<script>
	$(document).ready(function(){
		ststistics.insertck = false; 
		ststistics.initialize({search_url : '/api/ststistics/getStstisticsUSLifeCycleMng.do' ,  remove_url : '' , search_button : 'search' , search_box : 'resetForm' , remove_btn : 'remove'});
		ststistics.grid.create({
			target 	: 'datagrid-view' , 
			header : [
				{column : 'dispRank' 	, type : 'text'		, name : '표출순위' 	, style : {"width" : '60px'}},
				{column : 'iconUrl' 	, type : 'image' 	, name : '아이콘' 	, style : {"width" : '50px'}},
				{column : 'lfeCycleNm' 	, type : 'text' 	, name : '생애주기명' 	, style : {"width" : '358px'}},
				{column : 'statCnt' 	, type : 'text' 	, name : '관심분야' 	, style : {"width" : '80px'}},
				{column : 'useYnValue' 	, type : 'text' 	, name : '서비스여부' 	, style : {"width" : '70px'}},
				//20201127 2020년 SGIS고도화 3차 시작(삭제버튼 추가)
				{column : 'romove' 			, type : 'button' 		, name : '삭제' 		, style : {"width" : '50px'}, callback : function(obj){
					if(!confirm("삭제 하시겠습니까?"))return false;
					ststistics.asynchronous({
						url : '/api/ststistics/removeLfeCycle.do' ,
						data : {'lfeCycleId':obj.lfeCycleId},
						callback : function(resBody){
							if(resBody == 0){
								alert("삭제 하였습니다.");
								setTimeout(function(){
									location.reload();
								},100);
							}
						}
					});
				}},
				//20201127 2020년 SGIS고도화 3차 끝
				{column : 'button' 		, type : 'button' 	, name : '추천키워드' 	, style : {"width" : '70px'} , callback : function(obj){
					obj.from = "Interests";
					ststistics.asynchronous({url : '/api/ststistics/getStstisticsUSMappingDataMng.do' , data : obj ,callback : function(resBody){
						$("#popupFormAdvice #statDistanceId").empty();
						$("#popupFormAdvice #statDistanceId").append($("<option>").text("선택하세요").attr("value" , ""));
						$(resBody.data).each(function(){
							$("#popupFormAdvice #statDistanceId").append($("<option>").text(this.statDistanceNm).attr("value" , this.statDistanceId));
						});
						$("#popupAdvice , .popupWrapperAdvice").show();
						$("#popupFormAdvice #lfeCycleNm").val(obj.lfeCycleNm);
						$("#popupFormAdvice #lfeCycleId").val(obj.lfeCycleId);
						$("#popupFormAdvice #statDistanceId").trigger("change");
					}});
					
					
				}}
			] , 
			row_callback : function(rObject){
				ststistics.insertck = false; 
				if(rObject.cellIndex == 3) ststistics.popup({type : 'Interests'});
				else ststistics.popup({type : 'detail' });
				$("#lfeCycleId").prop('readonly', true);//2020년 SGIS고도화 3차(생애주기 아이디 수정 못하도록 설정)
			}
		});
		
		$("#popupFormAdvice #statDistanceId").on("change" , function(){
			var lfeCycleId = $("#popupFormAdvice #lfeCycleId").val();
			var statDistanceId = $(this).val();
			ststistics.asynchronous({url : '/api/ststistics/getStstisticsUSLifeCycleRecmdkwrd.do',data:{'lfeCycleId':lfeCycleId,'statDistanceId':statDistanceId},callback : function(resBody){
				var targets = $("#recmdKwrd1 , #recmdKwrd2 , #recmdKwrd3 , #recmdKwrd4 , #recmdKwrd5");
				targets.val('');
				if(resBody){
					targets.each(function(){
						$(this).val(resBody[$(this).attr("id")]);
					});
					if(statDistanceId == null || statDistanceId == ""){
						targets.val('');
					}
				}
			}});
		});
	
		ststistics.register = function(){
			ststistics.insertck = true;
			$("#popup , .popupWrapper").show();
			ststistics.set_value({target : 'popup' , clear : true});
			$("#lfeCycleId").prop('readonly', false);
			$("#lfeCycleId").val("LFECYCLE_");
		}
		
		$("#popupAdvice #save").on("click",function(){
			var param =  jQuery("#popupFormAdvice").serialize();
			var recmdkwrdck = [];
			var ckresult = false;
			
			//키워드 중복체크
			$("#recmdKwrd").find("input").each(function(){
				var value = $(this).val();
				if(recmdkwrdck.indexOf(value) == -1){
					recmdkwrdck.push(value);
					ckresult = true;
				}else{
					alert("추천키워드가 중복입니다.");	
					ckresult = false;
				}				
			});
			
			if(ckresult){
				ststistics.asynchronous({url : '/api/ststistics/registerStstisticsUSLifeCycleRecmdkwrd.do' , data : param , callback : function(resBody){
					if(resBody.code == 0){
						alert("정상 처리 되었습니다.");					
					}else{
						alert("추천 키워드 등록에 실패 했습니다.");
					}
				}});
			}
			
		});
		
		//등록
		$("#popup #save").on("click",function(){
			console.log("등록")
			console.log($("#popup #lfeCycleId").val());
			if(ststistics.insertck){
				/*
				if($("#lfeCycleId").val() == "LFECYCLE_"){
					alert("ID를 입력하세요");
					return false;
				}
				*/
				ststistics.asynchronous({url : '/api/ststistics/idcheckStstisticsUSLifeCycleMng.do' , data : { lfeCycleId :$("#popup #lfeCycleId").val() } ,callback : function(resBody){
					if(resBody.code == 0){
						//2020년 SGIS고도화 3차(서비스 활성화 시 이모티콘 없으면 등록 안됨) 시작
						if($("#popupForm").find("#useYn").val() == "Y"){
							console.log($("#popup #uploadfile").val());
							if(isRequired($("#popup #uploadfile").val())){
								ststistics.message({message :"서비스 활성화 시 아이콘을 업로드 해주세요" , returnValue : false});
							}else{
								ststistics.save();
							}
							
						}else{
							ststistics.save();
						}
						//ststistics.save(); //2020년 SGIS고도화 3차(서비스 활성화 시 이모티콘 없으면 등록 안됨)
						//2020년 SGIS고도화 3차(서비스 활성화 시 이모티콘 없으면 등록 안됨) 끝
					}else{
						alert("이미 ID값이 존재합니다.");
					}}});
			}else{
				//2020년 SGIS고도화 3차(서비스 활성화 시 이모티콘 없으면 등록 안됨) 시작
				if($("#popupForm").find("#useYn").val() == "Y"){
					console.log($("#popup #uploadfile").val());
					if(isRequired($("#popup #uploadfile").val())){
						ststistics.message({message :"서비스 활성화 시 아이콘을 업로드 해주세요" , returnValue : false});
					}else{
						ststistics.save();
					}
					
				}else{
					ststistics.save();
				}
				//ststistics.save(); //2020년 SGIS고도화 3차(서비스 활성화 시 이모티콘 없으면 등록 안됨)
				//2020년 SGIS고도화 3차(서비스 활성화 시 이모티콘 없으면 등록 안됨) 끝
			}
		});	
		
		ststistics.save = function(){
			ststistics.store({store_url : '/api/ststistics/registerStstisticsUSLifeCycleMng.do' , isFile : true ,  store_box : 'popupForm' , validation : true , 
				validationFn : function(){
					//필수값 공백일 경우 알림
					if(isRequired($("#popup #lfeCycleId").val())){
						return ststistics.message({message :"생애주기 아이디를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#popupForm").find("#useYn").val())){
						return ststistics.message({message :"서비스 여부를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#popup #dispRank").val())){
						return ststistics.message({message :"표출순위를 입력해주세요" , returnValue : false});
					}else if(isRequired($("#popup #lfeCycleNm").val())){
						return ststistics.message({message :"생애주기명를 입력해주세요" , returnValue : false});
					}
					//2020년 SGIS고도화 3차 시작(신규등록시 아이콘 없이 등록되도록 수정)
					/*else if(isRequired($("#popup #tempUrl").val())){
						return ststistics.message({message :"아이콘을 업로드해주세요" , returnValue : false});
					}*/
					//2020년 SGIS고도화 3차 끝
					else if(isRequired($("#popup #iconExp").val())){
						return ststistics.message({mes0sage :"설명을 입력해주세요" , returnValue : false});
					}
					
				return true;
				}
			});
		}
		
		var file = $("<form id='excelForm' enctype='multipart/form-data' style='height:0' ><input type='file' id='excel_file' name='excel_file' /></form>");
		$(".wrapper").append(file);
		$("#excel_file").on("change" ,function(){
			ststistics.store({store_url : '/api/ststistics/excelParseLifeCycle.do' , isFile : true ,  store_box : 'excelForm' , validation : true , 
				validationFn : function(){
					return true;
				}
			});
		});
		//20201127 2020년 SGIS고도화 3차 시작
		excelUpload = function(){
			$('#excel_file').click();
		}
		
		fileUpload = function(){
			$('#uploadfile').click();
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
			<!-- <div class="lefitMenuWrapper"> --><!-- 2020년 SGIS고도화 3차 주석 -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					makeLeftMenu("3", "10", "1");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span class="fontS">생애주기 관리</span>
					</p>
				</div>
				<p class="title01">생애주기 관리</p><!--2019-02-19 수정  -->
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
								<th class="right">생애주기명</th>
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text"/>
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
					
					<div class="searchBtn04">
						<a id="excel_templete_download" href="<c:url value="/api/ststistics/excelTempleteDownLoad.do?type=lifeCycle"/>"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for="excel_templete_download">엑셀 양식 다운로드</label>
						</a>
						<a id="excel_upload" href="javascript:void(0);"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;" onclick="excelUpload();"><!--  20201127 2020년 SGIS고도화 3차 -->
							<label style="cursor: pointer;" for="update">엑셀 업로드</label>
						</a>	
						<a id="excel_download" href="<c:url value="/api/ststistics/excelDataDownLoad.do?type=lifeCycle"/>" style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for="excel_data_download">엑셀 다운로드</label>
						</a>
						<a  href="javascript:$s.register();" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for="register">신규등록</label>
						</a>
					</div>
					
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
		<!-- <div class="popupWrapper" id="popup" style="left: 0"> --><!-- 2020년 SGIS고도화 3차 - 주석 -->
		<div class="popupWrapper" id="popup" style="left: 0;"><!-- 2020년 SGIS고도화 3차 - ;추가 -->
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
					<form id="popupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">생애주기 아이디</th>
									<td>
										<input type="text" id="lfeCycleId" name="lfeCycleId" maxlength="50" class="input_use13" />
									</td>
								</tr>
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
									<th>표출순위</th>
									<td>
										<input type="number" class="input_use13" id="dispRank" name="dispRank" maxlength="2" min="1" step="1" style="width:170px;" />
									</td>
								</tr>
								<tr>
									<th>생애주기명</th>
									<td><input type="text" id="lfeCycleNm" name="lfeCycleNm" maxlength="100" class="input_use13" /></td>
								</tr>
								<tr>
									<th>아이콘</th>
									<td>
										<label for="uploadfile">
											<a  style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 14px; margin-right: 10px;" onclick="fileUpload();">업로드</a><!-- 20201127 2020년 SGIS고도화 3차 추가 -->
											<input type="file" class="input_use11" id="uploadfile" name="uploadfile" value="파일업로드" onchange="javascript:$s.setFile(this);" style="display: none;"/>
										</label>
										<input type="text" id="tempUrl" name="tempUrl"  class="input_use11" style="margin-left: -10px; margin-top: -2px; width: 434px; height: 21px;"/>
									</td>
								</tr>
								<tr>
									<th>설명</th>
									<td>
										<textarea rows="2" cols="20" class="input_use10"  style="resize: none; width :500px;" id="iconExp" name="iconExp" ></textarea>
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
		<div class="popupWrapperAdvice" id="popupAdvice" style="left: 0">
			<div class="popupWrapperAdvice">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">추천키워드</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="popupFormAdvice" >
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">생애주기명</th>
									<td>
										<input disabled="disabled" data-require="true" type="text" id="lfeCycleNm" name="lfeCycleNm" data-edit="false" maxlength="50" class="input_use13" />
										<input type="hidden" id="lfeCycleId" name="lfeCycleId" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">관심분야</th>
									<td>
										<select class="input_use08" id="statDistanceId" name="statDistanceId" style="width: 512px">
											<option value="">선택하세요</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>추천키워드</th>
									<td id="recmdKwrd">
										<div style="margin-top: 5px;">
											<input type="text" id="recmdKwrd1" name="recmdKwrd1" class="input_use11" style="width: 500px; height: 21px;" />
										</div>
										<div style="margin-top: 5px;">
											<input type="text" id="recmdKwrd2" name="recmdKwrd2" class="input_use11" style="width: 500px; height: 21px;"/>
										</div>
										<div style="margin-top: 5px;">
											<input type="text" id="recmdKwrd3" name="recmdKwrd3" class="input_use11" style="width: 500px; height: 21px;"/>
										</div>
										<div style="margin-top: 5px;">
											<input type="text" id="recmdKwrd4" name="recmdKwrd4" class="input_use11" style="width: 500px; height: 21px;"/>
										</div>
										<div style="margin-top: 5px;">
											<input type="text" id="recmdKwrd5" name="recmdKwrd5" class="input_use11" style="width: 500px; height: 21px;" />
										</div>
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