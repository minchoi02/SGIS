<%@page contentType="text/html; charset=UTF-8" %>
<%@include file="/WEB-INF/jsp/m2020/includes/taglib.jsp" %>
<div id="filter" class="option" style="z-index:1000;">
	<form id="filter-form">
		<div class="option__wrap">
			<div class="option__header d-flex justify-content-between">
				<h3 id="filter-name"></h3>
				<a id="filter-close-button" href="#" class="map__option--close" onclick="$('#filter').animate({'right': '-100%'},175);"><img src="${ctx }/resources/m2021/img/i_close--option.png" alt="Close"></a>
			</div>
			<div class="option__body">
				<c:choose>
					<c:when test="${param.theme=='fishery' }">
						<div class="option__container">
							<h4>어업 구분 선택</h4>
							<div id="fishery-type" class="option__content d-flex justify-content-start">
								<button type="button" data-type="sea" class="option__btn" aria-checked="true">해수면</button>
<!-- 								<button type="button" data-type="sea" class="option__btn">해수면</button> -->
								<button type="button" data-type="inland" class="option__btn">내수면</button>
							</div>
							<script>
								$("#fishery-type button").click(function(){
									$("#fishery-type button").attr("aria-checked",false);
									$(this).attr("aria-checked",true);
								});
							</script>
						</div>
					</c:when>
					<c:when test="${param.theme=='ecnmy' }">
						<div class="option__container">
							<h4>한국표준산업분류 차수 선택</h4>
							<div id="ecnmy-type" class="option__content d-flex justify-content-start">
								<!-- <button type="button" class="option__btn" data-type="ecnmy9th">9차</button> -->
								<button type="button" class="option__btn" data-type="ecnmy10th">10차</button>
								<button type="button" class="option__btn" data-type="ecnmy9th" aria-checked="true">9차</button>
								<p class="my-5px">제10차 개정은 2017년 7월 1일, 제9차 개정은 2008년 2월 1일에 시행되었습니다.</p>
							</div>
						</div>
					</c:when>
				</c:choose>
				<div id="year-container" class="option__container">
					<h4>연도 선택</h4>
					<div class="option__content d-flex justify-content-start">
						<div id="year-list">
						</div>
						<p class="my-5px" id="year-alert"></p>
					</div>
				</div>
				<div class="option__container">
					<h4>광역시·도 선택</h4>
					<div id="map-navigator-sido" class="option__content d-flex justify-content-start"></div>
				<div id="map-navigator-sgg-container" class="option__container">
					<h4>시·군·구 선택</h4>
					<div class="option__content d-flex justify-content-start">
						<div id="map-navigator-sgg">
						</div>
						<p class="my-5px">
							광역시·도를 선택하면 시·군·구 선택	메뉴가 보여집니다.<br>
							원하는 시·군·구 를 선택한 후 ‘적용＇버튼을 클릭합니다.<br>
							<span class="font-small color-gray">(광역시·도 단위의 통계정보를 조회할 경우 시·군·구는 선택하지 않고 적용 버튼 클릭)</span>
						</p>
					</div>
				</div>
			</div>
			<div class="btn__wrap d-flex justify-content-between filter_foot_btn">
				<button type="button" class="btn btn__cancel" onclick='$("#filter-form .option__container").each(function(){$(this).find("button:first").trigger("click");});'>초기화</button>
				<button type="submit" class="btn btn__submit" id="triggerBtn">적용</button>
			</div>
		</div>
	</form>
</div>
<script>
	if($("meta[name=title]").attr("content")=="행정통계 시각화 지도"){
		$("#map-navigator-sgg-container").remove();
	}
	$("#filter-name").text($("meta[name=sub-title]").attr("content")+" 조회 조건");
</script>