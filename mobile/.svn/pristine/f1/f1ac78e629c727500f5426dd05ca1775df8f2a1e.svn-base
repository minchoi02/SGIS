<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 농림어가 Tab List - START -->	
<div class="currentContent" style="display: block;" data-id="API_0310" name="API_0310_DIV" id="api0310Div">
	<div class="tit_top" style="display: flex;">
		<h2 class="tit">농림어가 상세검색</h2> 
		<button id="API_0304_popup_area_close" class="btn_popClose" type="button"></button>
	</div>
	<!-- Swiper -->
	<!-- 2022.12.13 swiper 삭제 및 css 수정 -->
	<!-- <div class="swiper-container gallery-thumbstxt" style="height: 48px;">
		<div class="swiper-wrapper" style="margin-bottom: 15px; background-color:#fff;" id="API3010_Opt" >  -->
	<div class="gallery-thumbstxt" style="display:block;">
		<div class="" style="background-color:#fff; display: flex;" id="API3010_Opt" > 
		<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가  START-->
			<div class="tabDataboardtxt current" id="generation">
				<!-- <p><a href="#" class="tab-item" >가구원별 상세조건</a><button class="currentMap_moreInfo on" type="button" onclick="javascript:helpPopup('API_0310_a_INFO_BOX');" title="가구원별 상세조건 설명 팝업 열기">가구원별 상세조건 설명 팝업 열기 </button></p> -->
				<p><a href="#" class="tab-item" >가구원별 상세조건</a><button class="currentMap_moreInfo on" type="button" onclick="javascript:helpPopup('API_0310_a_INFO_BOX');" title="가구원별 상세조건 설명 팝업 열기"></button></p>
			</div>
			<div class="tabDataboardtxt" id="houseHold">
				<!-- <p><a href="#" class="tab-item" >가구별 상세조건</a><button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0310_b_INFO_BOX');"title="가구별 상세조건 설명 팝업 열기">가구별 상세조건 설명 팝업 열기 </button></p> -->
				<p><a href="#" class="tab-item" >가구별 상세조건</a><button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0310_b_INFO_BOX');"title="가구별 상세조건 설명 팝업 열기"></button></p>
			</div>
		<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 END -->
		</div>
	</div>
	
	<div class="TabArea" id="generation_serch_div">
		<div class="gridWrap02" style="padding-top: 0;">
			<div class="currentHeader mt15">  
				<span class="cap02">*조사년도(필수)</span>  
				<div class="selectbox" style="margin-left: 10px;">
					<label for="ex_select"></label> 
					<select name="API_0310_year" id="API_0310_year">
					</select>
				</div>  
			</div> 
			
			<div class="currentHeader mt15"> 
				<span class="cap02">*대상(필수)</span>
			</div>
			<div id="data_type">
				<div class="List-conRow">
					<div class="List-ConCard on">
						<h2>농가</h2><input name="data_type" type="radio" value="1" checked="checked" style="width:0px; height:0px;">
					</div>
					<div class="List-ConCard">
						<h2>임가</h2><input name="data_type" type="radio" value="2" style="width:0px; height:0px;">  
					</div> 
				</div>
	
				<div class="List-conRow">
					<div class="List-ConCard">
						<h2>해수면어가</h2><input name="data_type" type="radio" value="3"  style="width:0px; height:0px;">  
					</div>
					<div class="List-ConCard">
						<h2>내수면어가</h2><input name="data_type" type="radio" value="4"  style="width:0px; height:0px;">  
					</div> 
				</div>
			</div>
			
			<div class="currentHeader"> 
				<span class="cap02">성별(선택)</span>
				 <label class="selectcheck-container">
				  <input type="checkbox" data-able="3fGender" name="c1">
				  <span class="selectcheckmark"></span>
				</label> 
			</div>
			
			<div id="3fGender">
				<div class="List-conRow">
					<div class="List-ConCardFull disabled">
						<h2>전체</h2><input name="API_0310_gender" type="radio" checked="checked" value="0" style="width:0px; height:0px;">  
					</div>
					
				</div>
				
				<div class="List-conRow">
					<div class="List-ConCard disabled">
						<h2>남자</h2><input name="API_0310_gender" type="radio" value="1"  style="width:0px; height:0px;">  
					</div> 
					<div class="List-ConCard disabled">
						<h2>여자</h2><input name="API_0310_gender" type="radio" value="2"  style="width:0px; height:0px;">  
					</div> 
				</div>
			</div>
			
			<div class="currentHeader">
				<span class="cap02">연령(선택)</span>
				<label class="selectcheck-container">
					<input type="checkbox" data-able="3fAge" name="c1">
					<span class="selectcheckmark"></span>
				</label> 
			</div>	
		
			<div class="List-conRow mt15" id="3fAge">
				<div class="selectbox" style="margin-left: 5px;"> 
					<select name="API_0310_age_from" disabled="disabled">
						<c:forEach begin="0" end="95" var="item" varStatus="status" step="5">
							<option value="${item }" ${item==10?'selected="selected"':'' }>
								${item }세
							</option>
							<c:if test="${status.last }">
								<option value="150">
									100세
								</option>
							</c:if>
						</c:forEach>
					</select>
				</div> 
				<label style="margin-left: 5px;">이상</label>		<!-- 2020.09.02[한광희] 문구 간격 조정 -->
				<div class="selectbox" style="margin-left: 20px;"> 
					<select name="API_0310_age_to" disabled="disabled">
						<c:forEach begin="4" end="99" var="item" varStatus="status" step="5">
							<option value="${item }" ${item==49?'selected="selected"':'' }>
								${item }세
							</option>
							<c:if test="${status.last }">
								<option value="150">
									+
								</option>
							</c:if>
						</c:forEach>
					</select>
				</div> 
				<label style="margin-left: 5px;">이하</label>		<!-- 2020.09.02[한광희] 문구 간격 조정 -->
			</div>
		</div>
	</div>				
			
	<div class="TabArea" style="display:none"  id="houseHold_serch_div">	
		<div class="gridWrap02" style="padding-top: 0;">
			<div class="currentHeader mt15">  
				<span class="cap02">*조사년도(필수)</span>  
				<div class="selectbox" style="margin-left: 10px;">
					<label for="ex_select"></label> 
					<select name="API_0310_year" id="API_0310_year_1">
					</select>
				</div>  
			</div>
			
			<div class="currentHeader mt15">  
				<span class="cap02">*대상(필수)</span>  
			</div>
			<div id="conditionType">
				<div class="List-conRow">
					<div class="List-ConCard on">
						<h2>농가가구</h2><input name="condition-type" type="radio" value="farm_cnt" data-api="API_0307" data-show-name="농가수" data-unit="가구"  checked="checked" style="visibility:hidden;">
					</div>
					<div class="List-ConCard">
						<h2>임가가구</h2><input name="condition-type" type="radio" value="forestry_cnt" data-api="API_0308" data-show-name="임가수" data-unit="가구" style="visibility:hidden;">
					</div> 
				</div>
				
				<div class="List-conRow">
					<div class="List-ConCard">
						<h2>어가가구</h2><input name="condition-type" type="radio" value="fishery_cnt" data-api="API_0309" data-show-name="어가수" data-unit="가구" style="visibility:hidden;">  
					</div>
				</div>
			</div> 
		</div>
	</div>	
	<div class="sfbFooter">
		<button class="btn_search" type="button" name="nextPage" data-id="API_0310">조회</button>
	</div>
</div>


	
<!-- 주요지표 Tab List - END -->

<!-- Initialize Swiper -->
<script>
	/* var galleryThumbs = new Swiper('.gallery-thumbstxt1', {
		spaceBetween: 1,
		slidesPerView: 2,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	}); */
	/* var galleryTop = new Swiper('swiper-container.gallery-top1', {
		pagination : { // 페이징 설정
			el : '.swiper-pagination',
			clickable : true, // 페이징을 클릭하면 해당 영역으로 이동, 필요시 지정해 줘야 기능 작동
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	}); */
	
	
//임시
/* 	$("#generation, #houseHold").on("click", function(){
		if($(this).attr("id") == "generation"){
			$("#houseHold").removeClass("on");
			$("#generation").addClass("on");
		}else{
			$("#generation").removeClass("on");
			$("#houseHold").addClass("on");
		}
	}) */
</script> 
