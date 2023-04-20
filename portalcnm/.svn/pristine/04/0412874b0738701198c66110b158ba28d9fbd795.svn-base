<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- 키워드 맵핑 -->
<div class="popupWrapperKeyWord" id="popupKeyWord" style="left: 0">
	<div class="popupWrapperKeyWord">
		<div class="aplPopupWrapper">
			<div class="aplPopupTitle">
				<div class="myTitleFont" id="popTitle">키워드 등록</div>
				<div class="myXbtn">
					<a style="cursor: pointer">
						<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
					</a>
				</div>
			</div>
			<!-- 신규등록 폼 -->	
			<div class="btnbox" style="margin-top:7px;   width : 70px; margin-left: 663px;">
				<a id="registerKeyWord" class="registerKeyWord" href="javascript:$s.popup_controller.save();" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="registerKeyWord">저장</label></a> 
<!-- 				<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> -->
			</div>	
			<form id="popupFormKeyWord" style="margin: 20px; margin-top: 27px; ">
				<table class="popupTable" summary="연관어 상세정보popup" style="margin-top: -30px; width : 713px;">
					<caption>연관어 상세정보popup</caption>
					<tbody>
						<tr>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<select class="h27 ml_0 " id="keywordMapping" style="width : 638px;">
									<option value="">선택</option>
									<c:forEach items="${keyWord}" var="items">
										<option value="${items.code}">${items.name}</option>
									</c:forEach>
								</select>
							</td>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<a id="add" class="add" href="javascript:$s.popup_controller.add();" style="cursor: pointer; color: #000; padding: 7px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="add">추가</label></a>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="popupTable" id="keyWordpopupTable" summary="연관어 상세정보popup" style="width : 713px;margin-top: 0;">
					<caption>연관어 상세정보popup</caption>
					<thead>
						<tr>
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 602px; background: #eee;" >키워드명</th>
<!-- 							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 50px; background: #eee;" >추천여부</th> -->
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 51px; background: #eee;" ></th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</form>
		</div>
	</div>
</div>
<!-- 키워드 맵핑끝 -->

<!-- 유사 키워드 맵핑 -->
<div class="popupWrapperSubKeyWord" id="popupSubKeyWord" style="left: 0">
	<div class="popupWrapperSubKeyWord">
		<div class="aplPopupWrapper">
			<div class="aplPopupTitle">
				<div class="myTitleFont" id="popTitle">유사 키워드 등록</div>
				<div class="myXbtn">
					<a style="cursor: pointer">
						<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
					</a>
				</div>
			</div>
			<!-- 신규등록 폼 -->	
			<div class="btnbox" style="margin-top:7px;   width : 70px; margin-left: 663px;">
				<a id="registerSubkeyWord" class="registerSubkeyWord" href="javascript:$s.popup_controller.save();" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="registerSubkeyWord">저장</label></a> 
			</div>	
			<form id="popupFormSubkeyWord" style="margin: 20px; margin-top: 27px; ">
				<table class="popupTable" summary="연관어 상세정보popup" style="margin-top: -30px; width : 713px;">
					<caption>연관어 상세정보popup</caption>
					<tbody>
						<tr>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<select class="h27 ml_0 " id="subKeyWordMapping" style="width : 638px;">
									<option value="">선택</option>
									<c:forEach items="${subKeyWord}" var="items">
										<option value="${items.code}">${items.name}</option>
									</c:forEach>
								</select>
							</td>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<a id="add" class="add" href="javascript:$s.popup_controller.add();" style="cursor: pointer; color: #000; padding: 7px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="add">추가</label></a>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="popupTable" id="SubKeyWordpopupTable" summary="연관어 상세정보popup" style="width : 713px;margin-top: 0;">
					<caption>연관어 상세정보popup</caption>
					<thead>
						<tr>
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 602px; background: #eee;" >키워드명</th>
<!-- 							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 50px; background: #eee;" >추천여부</th> -->
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 51px; background: #eee;" ></th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</form>
		</div>
	</div>
</div>
<!-- 키워드 맵핑끝 -->


<!-- 생애주기 맵핑 -->
<div class="popupWrapperLifeCycle" id="popupLifeCycle" style="left: 0">
	<div class="popupWrapperLifeCycle">
		<div class="aplPopupWrapper">
			<div class="aplPopupTitle">
				<div class="myTitleFont" id="popTitle">생애주기 등록</div>
				<div class="myXbtn">
					<a style="cursor: pointer">
						<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
					</a>
				</div>
			</div>
			<!-- 신규등록 폼 -->		
			<div class="btnbox" style="margin-top:7px;  width : 75px; margin-left: 663px;">
				<a id="registerLifeCycle" class="register" href="javascript:$s.popup_controller.save();" style="margin-right:5px;cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">		
					<label style="cursor: pointer;" for="registerLifeCycle">저장</label>
				</a> 
<!-- 				<a id="cancelLifeCycle" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">	 -->
<!-- 					<label style="cursor: pointer;" for="cancel">취소</label> -->
<!-- 				</a> -->
			</div>	
			<form id="popupFormLifeCycle" style="margin: 20px; margin-top: 27px;">
				<table class="popupTable" summary="연관어 상세정보popup" style="margin-top: -30px; width : 713px;">
					<caption>연관어 상세정보popup</caption>
					<tbody>
						<tr>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<select class="h27 ml_0 " id="lifeCycleMapping" style="width : 638px;">
									<option value="">선택</option>
									<c:forEach items="${lifecycle}" var="items">
										<option value="${items.code}">${items.name}</option>
									</c:forEach>
								</select>
							</td>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<a id="lifeCycleadd" class="add" href="javascript:$s.popup_controller.add();" style="cursor: pointer; color: #000; padding: 7px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="add">추가</label></a>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="popupTable"  id="lifeCyclepopupTable" summary="연관어 상세정보popup" style="width : 713px; margin-top: 0;">
					<caption>연관어 상세정보popup</caption>
					<thead>
						<tr>
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 100%; background: #eee;" colspan="3">생애주기 목록</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</form>
		</div>
	</div>
</div>
<!-- 생애주기 맵핑끝 -->

<!-- 통계거리 맵핑 -->
<div class="popupWrapperInterests" id="popupInterests" style="left: 0">
	<div class="popupWrapperInterests">
		<div class="aplPopupWrapper">
			<div class="aplPopupTitle">
				<div class="myTitleFont" id="popTitle">통계거리 등록</div>
				<div class="myXbtn">
					<a style="cursor: pointer">
						<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
					</a>
				</div>
			</div>
			<div class="btnbox" style="margin-top:7px;    width : 75px; margin-left: 663px;">
				<a id="registerInterests" class="registerInterests" href="javascript:$s.popup_controller.save();" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="registerInterests">저장</label></a> 
<!-- 				<a id="cancelInterests" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> -->
			</div>	
			<form id="popupFormInterests" style="margin: 20px;margin-top: 27px; ">
				<table class="popupTable" summary="연관어 상세정보popup" style="margin-top: -30px; width : 713px;">
					<caption>연관어 상세정보popup</caption>
					<tbody>
						<tr>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<select class="h27 ml_0 " id="interestsMapping" style="width : 638px;">
									<option value="">선택</option>
									<c:forEach items="${interests}" var="items">
										<option value="${items.code}">${items.name}</option>
									</c:forEach>
								</select>
							</td>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<a id="interestsadd" class="add" href="javascript:$s.popup_controller.add();" style="cursor: pointer; color: #000; padding: 7px;  width: 51px; line-height: 25px; ">		<label style="cursor: pointer;" for="add">추가</label></a>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="popupTable" id="interestspopupTable" summary="연관어 상세정보popup" style="width : 713px; margin-top: 0;">
					<caption>연관어 상세정보popup</caption>
					<thead>
						<tr>
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 100%; background: #eee;" colspan="3">통계거리 목록</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</form>
		</div>
	</div>
</div>
<!-- 통계거리 맵핑끝 -->

<!-- 데이터 맵핑 -->
<div class="popupWrapperService" id="popupService" style="left: 0">
	<div class="popupWrapperService">
		<div class="aplPopupWrapper">
			<div class="aplPopupTitle">
				<div class="myTitleFont" id="popTitle">서비스 등록</div>
				<div class="myXbtn">
					<a style="cursor: pointer">
						<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
					</a>
				</div>
			</div>
			<div class="btnbox" style="margin-top:7px;    width : 70px; margin-left: 663px;">
				<a id="registerService" class="registerService" href="javascript:$s.popup_controller.save();" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="registerService">저장</label></a> 
<!-- 				<a id="cancelService" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> -->
			</div>	
			<form id="popupFormService" style="margin: 20px;margin-top: 27px; ">
				<table class="popupTable" summary="연관어 상세정보popup" style="margin-top: -30px; width : 713px;">
					<caption>연관어 상세정보popup</caption>
					<tbody>
						<tr>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<select class="h27 ml_0 " id="serviceMapping" style="width : 638px;">
									<option value="">선택</option>
									<c:forEach items="${Service}" var="items">
										<option value="${items.code}">${items.name}</option>
									</c:forEach>
								</select>
							</td>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<a id="serviceadd" class="add" href="javascript:$s.popup_controller.add();" style="cursor: pointer; color: #000; padding: 7px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="add">추가</label></a>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="popupTable" id="servicepopupTable" summary="연관어 상세정보popup" style="width : 713px; margin-top: 0px;">
					<caption>연관어 상세정보popup</caption>
					<thead>
						<tr>
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 100%; background: #eee;" colspan="3">데이터 목록</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</form>
		</div>
	</div>
</div>
<!-- 데이터쪽 통계거리 맵핑 -->
<div class="popupWrapperDatainterests" id="popupDatainterests" style="left: 0">
	<div class="popupWrapperDatainterests">
		<div class="aplPopupWrapper">
			<div class="aplPopupTitle">
				<div class="myTitleFont" id="popTitle">통계거리 등록</div>
				<div class="myXbtn">
					<a style="cursor: pointer">
						<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
					</a>
				</div>
			</div>
			<div class="btnbox" style="margin-top:7px;    width : 70px; margin-left: 663px;">
				<a id="registerDatainterests" class="registerDatainterests" href="javascript:$s.popup_controller.save();" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="registerDatainterests">저장</label></a> 
<!-- 				<a id="cancelService" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 23px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> -->
			</div>	
			<form id="popupFormDatainterests" style="margin: 20px;margin-top: 27px; ">
				<table class="popupTable" summary="연관어 상세정보popup" style="margin-top: -30px; width : 713px;">
					<caption>연관어 상세정보popup</caption>
					<tbody>
						<tr>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<select class="h27 ml_0 " id="datainterestsMapping" style="width : 638px;">
									<option value="">선택</option>
									<c:forEach items="${datainterests}" var="items">
										<option value="${items.code}">${items.name}</option>
									</c:forEach>
								</select>
							</td>
							<td style="text-align: center; padding: 5px; border-left: 1px solid #cacaca;">
								<a id="datainterestsadd" class="add" href="javascript:$s.popup_controller.add();" style="cursor: pointer; color: #000; padding: 7px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="add">추가</label></a>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="popupTable" id="datainterestspopupTable" summary="연관어 상세정보popup" style="width : 713px; margin-top: 0px;">
					<caption>연관어 상세정보popup</caption>
					<thead>
						<tr>
							<th style="text-align: center; padding: 0px; border-left: 1px solid #cacaca; width : 100%; background: #eee;" colspan="3">통계거리 목록</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</form>
		</div>
	</div>
</div>
<!-- 데이터쪽 통계거리 맵핑끝 -->

<script>
	$("#keywordMapping").select2({}); 
	$("#interestsMapping").select2({}); 
	$("#serviceMapping").select2({}); 
	$("#lifeCycleMapping").select2({}); 
	$("#subKeyWordMapping").select2({}); 
	$("#datainterestsMapping").select2({});
</script>