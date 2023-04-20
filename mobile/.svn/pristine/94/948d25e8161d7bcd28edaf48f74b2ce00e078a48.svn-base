<%@include file="/WEB-INF/jsp/m2019/includes/taglib.jsp"%>
<%@page contentType="text/html; charset=UTF-8"%>
<script>
	$(document).ready(function() {
		$("#common_popup_confirm_close").click(function() {
			$("#common_popup_back").parent().hide();
			$("#common_popup_confirm").hide();
		});
		$("#common_popup_alert_close").click(function() {
			$("#common_popup_back").parent().hide();
			$("#common_popup_alert").hide();
		});
	});
</script>
<!-- 팝업 배경 START -->
<div class="popBack" style="display: none;">
	<div id="common_popup_back" class="aside_back" style="z-index: 9900;"></div>
</div>
<!-- 팝업 배경 END -->

<!-- 알림 팝업 START -->
<div id="common_popup_alert" class="popWrap" style="left: calc(50% - 120px); top: 100px; width: 240px; display: none;">
	<div class="i_pop pCheck"></div>
	<div class="popBox">
		<div class="popHeader">
			<button id="common_popup_alert_close" class="btn_popClose" type="button">닫기</button>
		</div>
		<div class="popContentBox">
			<div class="popContent">
				<p id="common_popup_alert_message" class="alertMessage">비밀번호를 입력하세요.</p>
				<div class="popBtnBox">
					<button id="common_popup_alert_ok" class="btn_popType3" type="button">확인</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 알림 팝업 END -->

<!-- 확인 팝업 START -->
<div id="common_popup_confirm" class="popWrap" style="left: calc(50% - 120px); top: 100px; width: 240px; display: none;">
	<div class="i_pop pAlert"></div>
	<div class="popBox">
		<div class="popHeader">
			<button id="common_popup_confirm_close" class="btn_popClose" type="button">닫기</button>
		</div>
		<div class="popContentBox">
			<div class="popContent">
				<p id="common_popup_confirm_message" class="alertMessage">저장 하시겠습니까?</p>
				<div class="popBtnBox">
					<button id="common_popup_confirm_cancel" class="btn_popType2" type="button">취소</button>
					<button id="common_popup_confirm_ok" class="btn_popType1" type="button">확인</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- 확인 팝업 END -->

<!--위치동의 팝업 START -->
<div id="common_popup_location" class="popWrap" style="left: calc(50% - 135px); top: 100px; width: 270px; display: none;">
	<div class="i_pop pin"></div>
	<div class="popBox">
		<div class="popHeader">
			<button id="common_popup_location_close" class="btn_popClose" type="button">닫기</button>
		</div>
		<div class="popContentBox">
			<div class="popTitle">위치동의</div>
			<div class="popContent">
				<p class="popMessage">
					SGIS 일자리맵에서<br> 현재 위치정보를 사용하고자 합니다.<br> 동의하시겠습니까?
				</p>
			</div>
		</div>
		<div class="PopFooter">
			<button id="common_popup_location_ok" class="btn_popSubmit" type="button">동의하고 시작하기</button>
		</div>
	</div>
</div>
<!--위치동의 팝업 END -->