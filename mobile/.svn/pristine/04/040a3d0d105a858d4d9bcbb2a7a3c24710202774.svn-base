<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>내 주변 통계</title>
<meta name="title" content="내 주변 통계">
<link rel="stylesheet" href="${ctx }/resources/m2020/css/subpage.css" />
<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />
<!-- kakao api -->
<script src="${ctx }/resources/plugins/kakao_script_api.js"></script>
<script src="${ctx }/resources/m2020/plugins/swiper.min.js"
	type="text/javascript"></script>
<!-- 하단 리스트 위 아래 Swipe 이벤트 -->
<script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js"
	type="text/javascript"></script>
<!-- bootstrap & bootstrap-multiselect 사용 -->
<script src="${ctx }/resources/m2020/plugins/bootstrap.bundle.min.js"
	type="text/javascript"></script>
<link rel="stylesheet"
	href="${ctx }/resources/m2020/plugins/bootstrap-multiselect.css" />
<script src="${ctx }/resources/m2020/plugins/bootstrap-multiselect.js"
	type="text/javascript"></script>
<!-- 좌우 스크롤 -->
<script src="${ctx }/resources/m2020/js/jquery.touchFlow.js"
	type="text/javascript"></script>
<!-- 페이지 전역변수 -->
<script type="text/javascript">
	var gv_list_gubun = "${params.list_gubun}";
	var gv_sido_cd = "${params.sido_cd}";
	var gv_sgg_cd = "${params.sgg_cd}";
	var gv_todaystatus_pop_yn = "${params.todaystatus_pop_yn}";
</script>
<!-- 기본 js -->
<script src="${ctx }/resources/m2020/js/current/current.map.js"></script>
<script src="${ctx }/resources/m2020/js/current/current.api.js"></script>
<script src="${ctx }/resources/m2020/js/current/current.search.js"></script>	
</head>
<body>

	<!-- 지도 영역 START -->
	<div class="MapArea">
		<div class="Map"
			style="overflow: hidden; position: fixed; top: 40px; width: 100%;">
			<div id="map"></div>
		</div>
	</div>
	<!-- 지도 영역 END -->

	<!-- 메뉴 버튼 Swiper START -->
	<div class="swiper-container Tabarea mlr16" style="z-index: 9999;">
		<div class="swiper-wrapper Tab-wrapper">
			<div class="swiper-slide Tabbtn on3">
				<a href="">주요지표</a>
			</div>
			<div class="swiper-slide Tabbtn">
				<a href="">인구</a>
			</div>
			<div class="swiper-slide Tabbtn">
				<a href="">가구</a>
			</div>
			<div class="swiper-slide Tabbtn">
				<a href="">주택</a>
			</div>
			<div class="swiper-slide Tabbtn">
				<a href="">사업체</a>
			</div>
			<div class="swiper-slide Tabbtn">
				<a href="">농림어가</a>
			</div>
		</div>

	</div>

	<!-- Initialize Swiper -->
	<script>
		var swiper = new Swiper('.swiper-container', {
			slidesPerView : 3.2,
			spaceBetween : 10,
			pagination : {
				el : '.swiper-pagination',
				clickable : true,
			},
		});
		srvLogWrite('O0', '07', '01', '00', '', '');
	</script>

	<!-- 메뉴 버튼 Swiper END -->
	<div class="map_tit">
		<div class="currenSettingWrap maptit03">
					<div class="currenSetting" style="bottom: 0;">
						<span id="">10세~49세+남자인구+농가(명)</span>
						<button id="" class="btn_Setting" type="button"></button> 
					</div> 
				</div>   
	</div>

	<!-- 생활환경 정보 START -->
	<div id="lifeEnvironmentToggle" class="btn_infoView infoOff"></div>
	<!-- 생활환경 정보 END -->

 

		<!-- 내주변통계 리스트 START-->
		<div class="resultWrap"> 
			<!-- 내 위치 버튼 START -->
	 			<div class="currenPositionWrap">
					<div class="currenPosition" style="bottom: 0;">
						<span id="houseMapMapArea"></span>
						<button id="houseMyLocation" class="btn_goPostion" type="button">현재위치로</button>
						<!-- 관심지역 설정 버튼 -->
						<button id="selectArea" class="databtn04"></button> 
					</div>
					<div class="databtnWrap">
						<!-- POI Btn -->
						<a href="" class="dataPoiBtn"></a>
						<!-- 통계수치on/off -->
						<a href="javascript:$statsMeMap.ui.showNumberClick();" id="showNumberBtn" class="databtn01"></a>
						<!-- 범례 -->
						<a href="#" id="btnrvTotletop" class="databtn02"></a> 
					</div>
				</div> 
			</div>
			
			<script>

			$('#btnrvTotletop').click(function() {
				srvLogWrite('O0', '51', '05', '01', '', '');
				if ($('.tooltipbox').css('visibility') == 'hidden')
					$('.tooltipbox').css('visibility', 'visible');
				else
					$('.tooltipbox').css('visibility', 'hidden');
			});
			</script>
			
			<!-- 색상 범례 START -->
					<div id="dataRemarksColor" class="tooltipbox" style="display: none;">
					<div class="tooltipbox_row">
					<div class="tooltipbox_Vrow">
						<button type="button" class="syncBtn"></button>
						<div class="color_checkbox">
							<div class="checkbox custom">
								<input name="color" id="box" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
								<label for="box" class="css-label"></label>
							</div>
							<div class="checkbox custom">
								<input name="color" id="box1" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
									<label for="box1" class="css-label-red"></label>
							</div>
							<div class="checkbox custom">
								<input name="color" id="box2" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
									<label for="box2" class="css-label-yellow"></label>
							</div>
							<div class="checkbox custom">
								<input name="color" id="box3" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
									<label for="box3" class="css-label-blue"></label>
							</div>
							<div class="checkbox custom">
								<input name="color" id="box4" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
									<label
									for="box4" class="css-label-purple"></label>
							</div>
							<div class="checkbox custom">
								<input name="color" id="box5" class="css-checkbox" type="checkbox" onclick="oneCheckcolor(this)" />
									<label for="box5" class="css-label-orange"></label>
							</div>
						</div>
					</div>
					<div class="tooltipbox_Vrow">
						<div class="color_checkbox" style="width: 90px;">
							<div class="color-step step-css-checkbox">
								<input name="color-step" id="step01" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
								<label for="step01" class="step-css-label"></label>
							</div>
							<div class="color-step step-css-checkbox">
								<input name="color-step" id="step02" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
									<label for="step02" class="step-css-label-2step"></label>
							</div>
							<div class="color-step step-css-checkbox">
								<input name="color-step" id="step03" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
								<label for="step03" class="step-css-label-3step"></label>
							</div>
							<div class="color-step step-css-checkbox">
								<input name="color-step" id="step04" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
									<label for="step04" class="step-css-label-4step"></label>
							</div>
							<div class="color-step step-css-checkbox">
								<input name="color-step" id="step05" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
									<label for="step05" class="step-css-label-5step"></label>
							</div>
							<div class="color-step step-css-checkbox">
								<input name="color-step" id="step06" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
									<label for="step06" class="step-css-label-6step"></label>
							</div>
							<div class="color-step step-css-checkbox">
								<input name="color-step" id="step07" class="step-css-checkbox" type="checkbox" onclick="oneCheckbox(this)" />
									<label for="step07" class="step-css-label-7step"></label>
							</div> 
						</div>
						
						<div class="tooltipbox_row">
						<p style="margin-left: 10px;">6,762</p>
						<span>초과</span>
						</div>
					</div> 
					</div>
					</div>
					<!-- 색상범례 END -->	 
			
		 
		<!-- 주요지표 Tab List - START -->	
			<div class="currentAllWrap" id="" style="display: block;">
			<div class="currentContent">
				<h2 class="tit">주요지표 상세검색</h2> 
				<div class="currentHeader">  
					<span class="cap02">*검색항목(필수)</span>  
				</div>
				<div class="currentListWrap">
				
					<div class="List-conRow">
						<div class="List-ConCard on">
							<h2>총인구(명)</h2>  
						</div>
						<div class="List-ConCard">
							<h2>평균나이(세)</h2>  
						</div> 
					</div>

					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>인구밀도(명/㎢)</h2>  
						</div>
						<div class="List-ConCard">
							<h2>노령화지수</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>노년부양비</h2>  
						</div>
						<div class="List-ConCard">
							<h2>유년부양비</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>가구(가구)</h2>  
						</div>
						<div class="List-ConCard">
							<h2>평균 가구원(명)</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>주택(호)</h2>  
						</div>
						<div class="List-ConCard">
							<h2>농가(가구)</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>임가(가구)</h2>  
						</div>
						<div class="List-ConCard">
							<h2>내수면 어가(가구)</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>해수면 어가(가구)</h2>  
						</div>
						<div class="List-ConCard">
							<h2>사업체 수(전체 사업체)</h2>  
						</div> 
					</div>  
				</div>
				
				<div class="currentHeader">   
					<span class="cap02">*주요지표조사년도</span>
					<div class="selectbox" style="margin-right: 5px;">
						<label for="ex_select"></label> <select id="ex_select">
							<option selected>2018</option>
							<option>2017</option>
							<option>2016</option>
						</select>
					</div>
					<!-- <div class="selectbox">
						<label for="ex_select"></label> <select id="ex_select">
							<option selected>제목순</option>
							<option>작성자</option>
							<option>작성일</option>
						</select>
					</div>   -->
				</div>
				<div class="sfbFooter">
					<button class="btn_search" type="button" name="nextPage" style="width: 100%;">조회</button>
				</div>
				</div>
			</div>
		<!-- 주요지표 Tab List - END -->
		
		<!-- 인구 Tab List - START -->	
			<div class="currentAllWrap" id="" style="display: none;">
			<div class="currentContent">
				<h2 class="tit">주요지표 상세검색</h2> 
				<div class="currentHeader">  
					<span class="cap02">*조사년도(필수)</span>  
					<div class="selectbox" style="margin-right: 5px;">
						<label for="ex_select"></label> <select id="ex_select">
							<option selected>2018</option>
							<option>2017</option>
							<option>2016</option>
						</select>
					</div>  
				</div>
				<div class="currentListWrap">
				
					<div class="List-conRow"> 
							<span class="cap02">유형(선택)</span>
							 <label class="selectcheck-container">
							  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
							  <span class="selectcheckmark"></span>
							</label> 
					</div>

					<div class="List-conRow mt15">
						<div class="List-ConCardFull">
							<h2>전체</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>남자</h2>  
						</div>
						<div class="List-ConCard">
							<h2>여자</h2>  
						</div> 
					</div>
					
					<div class="List-conRow mt15">
						 <span class="cap02">연령(선택)</span>
							 <label class="selectcheck-container">
							  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
							  <span class="selectcheckmark"></span>
							</label> 
					</div>
					
					<div class="List-conRow mt15">
					<div class="selectbox" style="margin-left: 5px;"> 
								<select id="ex_select">
									<option selected>선택안함</option>
									<option>5세</option>
									<option>10세</option>
									<option>15세</option>
									<option>20세</option>
									<option>25세</option>
									<option>30세</option>
									<option>35세</option>
									<option>40세</option>
									<option>45세</option>
									<option>50세</option>
									<option>55세</option> 
								</select>
								<label for="ex_select">이상</label>
							</div>  
							<div class="selectbox" style="margin-left: 20px;"> 
								<select id="ex_select">
									<option selected>선택안함</option>
									<option>9세</option>
									<option>10세</option>
									<option>14세</option>
									<option>19세</option>
									<option>24세</option>
									<option>29세</option>
									<option>34세</option>
									<option>39세</option>
									<option>44세</option>
									<option>49세</option>
									<option>54세</option>
								</select>
								<label for="ex_select">이하</label>
							</div> 
					</div>
					 
				</div>
				<div class="sfbFooter">
					<button class="btn_search" type="button" name="nextPage" style="width: 100%;">조회</button>
				</div>
				</div>
			</div>
		<!-- 인구 Tab List - END -->
		
		<!-- 가구 Tab List - START -->	
			<div class="currentAllWrap" id="" style="display: none;">
			<div class="currentContent">
				<h2 class="tit">주요지표 상세검색</h2> 
				<div class="currentHeader">  
					<span class="cap02">*조사년도(필수)</span>  
					<div class="selectbox" style="margin-right: 5px;">
						<label for="ex_select"></label> <select id="ex_select">
							<option selected>2018</option>
							<option>2017</option>
							<option>2016</option>
						</select>
					</div>  
				</div>
				<div class="currentListWrap">
				
					<div class="List-conRow"> 
							<span class="cap02">유형(선택)</span>
							 <label class="selectcheck-container">
							  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
							  <span class="selectcheckmark"></span>
							</label> 
					</div> 
					
					<div class="List-conRow mt15">
						<div class="List-ConCard">
							<h2>단독주택</h2>  
						</div>
						<div class="List-ConCard">
							<h2>아파트</h2>  
						</div> 
					</div>
					
					<div class="List-conRow" style="padding-bottom: 5px;">
						<div class="List-ConCard">
							<h2>연립주택</h2>  
						</div>
						<div class="List-ConCard">
							<h2>다세대 주택</h2>  
						</div> 
					</div>
					
					<div class="List-conRow pt10 bt">
						<div class="List-ConCard">
							<h2>1인가구</h2>  
						</div>
						<div class="List-ConCard">
							<h2>비혈연가구</h2>  
						</div> 
					</div> 
				</div>
				<div class="sfbFooter">
					<button class="btn_search" type="button" name="nextPage" style="width: 100%;">조회</button>
				</div>
				</div>
			</div>
		<!-- 가구 Tab List - END -->
		
		<!-- 주택 Tab List - START -->	
			<div class="currentAllWrap" id="" style="display: none;">
			<div class="currentContent">
				<h2 class="tit">주요지표 상세검색</h2> 
				
				<div class="currentHeader">  
					<span class="cap02">*조사년도(필수)</span>  
					<div class="selectbox" style="margin-left: 10px;">
						<label for="ex_select"></label> <select id="ex_select">
							<option selected>2018</option>
							<option>2017</option>
							<option>2016</option>
						</select>
					</div>  
				</div>
				<div class="currentListWrap"> 
					
					<div class="currentHeader"> 
							<span class="cap02">유형(선택)</span>
							 <label class="selectcheck-container">
							  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
							  <span class="selectcheckmark"></span>
							</label> 
					</div> 
					
					<div class="List-conRow mt15">
						<div class="List-ConCard">
							<h2>단독주택</h2>  
						</div>
						<div class="List-ConCard">
							<h2>아파트</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>연립주택</h2>  
						</div>
						<div class="List-ConCard">
							<h2>다세대 주택</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCardFull">
							<h2>비거주용 건물(상가,공장,여관 등) 내 주택</h2>  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard">
							<h2>주택이외의 거처</h2>  
						</div>  
					</div>
					
					<div class="currentHeader">
						<span class="cap02">건축년도(선택)</span>
							<label class="selectcheck-container">
							  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
							  <span class="selectcheckmark"></span>
							</label>
						<div class="selectbox" style="margin-left: 10px;">
							<label for="ex_select"></label> <select id="ex_select">
								<option selected>2018</option>
								<option>2017</option>
								<option>2016</option>
							</select>
						</div>
					</div>
					
					<div class="List-conRow mt15">
						 <span class="cap02">연면적(선택)</span>
							 <label class="selectcheck-container">
							  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
							  <span class="selectcheckmark"></span>
							</label> 
					</div>
					
					<div class="List-conRow mt15">
						<div class="selectbox" style="margin-left: 5px;"> 
							<select id="ex_select"> 
								<option selected>0㎡</option>
								<option>20㎡</option>
								<option>40㎡</option>
								<option>60㎡</option>
								<option>85㎡</option>
								<option>100㎡</option>
								<option>130㎡</option>
								<option>165㎡</option>
								<option>230㎡</option> 
							</select>
							<label for="ex_select">초과</label>
						</div>  
							<div class="selectbox" style="margin-left: 20px;"> 
								<select id="ex_select"> 
									<option selected>20㎡</option>
									<option>40㎡</option>
									<option>60㎡</option>
									<option>85㎡</option>
									<option>100㎡</option>
									<option>130㎡</option>
									<option>165㎡</option>
									<option>230㎡</option>
									<option>+</option>
								</select>
								<label for="ex_select">이하</label>
							</div> 
					</div>
					
				</div>
				 
				
				<div class="sfbFooter">
					<button class="btn_search" type="button" name="nextPage" style="width: 100%;">조회</button>
				</div>
				</div>
			</div>
		<!-- 주택 Tab List - END -->
		
		<!-- 사업체 Tab List - START -->	
			<div class="currentAllWrap" id="" style="display: none;">
				<div class="currentContent">
					<h2 class="tit">주요지표 상세검색</h2>
					
					<div class="currentListWrap"> 
					<!-- Swiper -->
						<div class="swiper-container gallery-thumbstxt" style="height: 48px;">
							<div class="swiper-wrapper" style="margin-bottom: 15px;">
							
								<div class="swiper-slide tabDataboardtxt">
									<p><a href="">산업분류검색</a><button class="currentMap_moreInfo" type="button"></button></p>
								</div>
								<div class="swiper-slide tabDataboardtxt">
									<p><a href="">테마검색</a><button class="currentMap_moreInfo" type="button"></button></p>
								</div>
								 
							</div>
						</div>
						
						<div class="swiper-container gallery-top" style="min-height: 100%; overflow: auto;">
						
							<div class="swiper-wrapper" style="min-height: 720px;">
								<div class="swiper-slide gridWrap02" style="padding-top: 0;">
								<div class="currentHeader mt15">  
									<span class="cap02">*조사년도(필수)</span>  
									<div class="selectbox" style="margin-left: 10px;">
										<label for="ex_select"></label> <select id="ex_select">
											<option selected>2018</option>
											<option>2017</option>
											<option>2016</option>
										</select>
									</div>  
								</div> 
								
								<div class="currentHeader"> 
									<span class="cap02">*대상(필수)</span> 
								</div> 
								
								<div class="List-conRow mt15">
									<div class="List-ConCard">
										<h2>사업체수</h2>  
									</div>
									<div class="List-ConCard">
										<h2>종사자수</h2>  
									</div> 
								</div>
								
								<div class="currentHeader"> 
									<span class="cap02">*산업분류(필수)</span>
									<button tyle="button" class="itemSearchToggle" id="itemSearchToggle">분류찾기</a> 
								</div>
								
								<div id="itemSearchList">
								<form class="search-result">
									<input type="text" id="search-bar02" placeholder="검색어 입력">
									<a href="#"><img class="search-icon" src="/mobile/resources/m2020/images/main/search_rnb.png"></a>
								</form>
								</div>
								
								<div class="List-conRow mt10" style="display: block;">
									<ul class="itemSearchList">
										<li class="on"><span class="on">1</span><p>광업</p></li>
										<li><span>2</span><p>석탄,원유 및 천연가스 광업</p></li>
										<li><span>3</span><p>광업</p></li>
										<li><span>4</span><p>광업</p></li> 
									</ul>
								</div>
								
								<div>
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>석탄,원유 및 천연가스 광업</h2>  
									</div>
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>금속 광업</h2>  
									</div>
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>비금속광물 광업 ; 연료용 제외</h2>  
									</div>
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>광업 지원 서비스업</h2>  
									</div>
								</div>
								</div> 
							</div>
							 
								<div class="swiper-slide gridWrap02" style="padding-top: 0;">
								<div class="currentHeader mt15">  
									<span class="cap02">*조사년도(필수)</span>  
									<div class="selectbox" style="margin-left: 10px;">
										<label for="ex_select"></label> <select id="ex_select">
											<option selected>2018</option>
											<option>2017</option>
											<option>2016</option>
										</select>
									</div>  
								</div>  
								<div class="currentHeader"> 
									<span class="cap02">*테마유형(필수)</span>
									<button tyle="button" class="itemSearchToggle" id="itemSearchToggle">분류찾기</a> 
								</div>
								
								<div id="itemSearchList">
								<form class="search-result">
									<input type="text" id="search-bar02" placeholder="검색어 입력">
									<a href="#"><img class="search-icon" src="/mobile/resources/m2020/images/main/search_rnb.png"></a>
								</form>
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>생활서비스</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div id="itemDropCon0" style="display: block;">
									<div class="List-conRow mt15">
										<div class="List-ConCard on">
											<h2>목욕탕</h2>  
										</div>
										<div class="List-ConCard on">
											<h2>교습학원</h2>  
										</div> 
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>어학원</h2>  
										</div>
										<div class="List-ConCard">
											<h2>예체능학원</h2>  
										</div> 
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>부동산중개업</h2>  
										</div>
										<div class="List-ConCard">
											<h2>이발소</h2>  
										</div> 
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>미용실</h2>  
										</div>
										<div class="List-ConCard">
											<h2>세탁소</h2>  
										</div> 
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>PC방</h2>  
										</div>
										<div class="List-ConCard">
											<h2>노래방</h2>  
										</div> 
									</div>
								</div>
								 
								 <div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>도소매</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>숙박</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>음식점</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>교통</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>공공</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>교육</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>기업</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>편의/문화</h2>
										<button type="button" class="itemDropboxBtn" id="itemDropboxBtn"></button>
									</div> 
								</div>  
								</div>
							</div> 
						
						<!-- Initialize Swiper -->
								<script>
							      var galleryThumbs = new Swiper('.gallery-thumbstxt', {
							        spaceBetween: 0,
							        slidesPerView: 1,
							        freeMode: true,
							        watchSlidesVisibility: true,
							        watchSlidesProgress: true,
							      });
							      var galleryTop = new Swiper('.gallery-top', {
							        spaceBetween: 10,
							        navigation: {
							          nextEl: '.swiper-button-next',
							          prevEl: '.swiper-button-prev',
							        },
							        thumbs: {
							          swiper: galleryThumbs
							        }
							      });
							    </script>
					 
				</div>
				
				</div>
				
					
				</div>
				 
				
				<div class="sfbFooter">
					<button class="btn_search" type="button" name="nextPage" style="width: 100%;">조회</button>
				</div>
				</div>
			</div>
		<!-- 사업체 Tab List - END -->
		
		<!-- 농림어가 Tab List - START -->	
			<div class="currentAllWrap" id="" style="display: none;">
				<div class="currentContent">
					<h2 class="tit">주요지표 상세검색</h2>
					
					<div class="currentListWrap"> 
					<!-- Swiper -->
						<div class="swiper-container gallery-thumbstxt1" style="height: 48px;">
							<div class="swiper-wrapper" style="margin-bottom: 15px;"> 
								<div class="swiper-slide tabDataboardtxt">
									<p><a href="">가구원별 상세조건</a><button class="currentMap_moreInfo" type="button"></button></p>
								</div>
								<div class="swiper-slide tabDataboardtxt">
									<p><a href="">가구별 상세조건</a><button class="currentMap_moreInfo" type="button"></button></p>
								</div> 
							</div>
						</div>
						
						<div class="swiper-container gallery-top1">
						
							<div class="swiper-wrapper" style="min-height: 720px;">
								<div class="swiper-slide gridWrap02" style="padding-top: 0;">
								<div class="currentHeader mt15">  
									<span class="cap02">*조사년도(필수)</span>  
									<div class="selectbox" style="margin-left: 10px;">
										<label for="ex_select"></label> <select id="ex_select">
											<option selected>2018</option>
											<option>2017</option>
											<option>2016</option>
										</select>
									</div>  
								</div> 
								
								<div class="currentHeader"> 
									<span class="cap02">*대상(필수)</span> 
								</div> 
								
								<div class="List-conRow">
									<div class="List-ConCard">
										<h2>농가</h2>  
									</div>
									<div class="List-ConCard">
										<h2>임가</h2>  
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCard">
										<h2>해수면어가</h2>  
									</div>
									<div class="List-ConCard">
										<h2>내수면어가</h2>  
									</div> 
								</div>
								
								<div class="currentHeader mt15"> 
										<span class="cap02">성별(선택)</span>
										 <label class="selectcheck-container">
										  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
										  <span class="selectcheckmark"></span>
										</label> 
								</div>
			
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>전체</h2>  
									</div> 
								</div> 
								<div class="List-conRow">
									<div class="List-ConCard">
										<h2>남자</h2>  
									</div>
									<div class="List-ConCard">
										<h2>여자</h2>  
									</div> 
								</div>
								
								<div class="currentHeader mt15">
									 <span class="cap02">연령(선택)</span>
										 <label class="selectcheck-container">
										  <input type="checkbox" name="c1" onclick="showSelect('ageSelectbox')">
										  <span class="selectcheckmark"></span>
										</label> 
								</div>
								
								<div class="List-conRow">
								<div class="selectbox" style="margin-left: 5px;"> 
											<select id="ex_select">
												<option selected>선택안함</option>
												<option>5세</option>
												<option>10세</option>
												<option>15세</option>
												<option>20세</option>
												<option>25세</option>
												<option>30세</option>
												<option>35세</option>
												<option>40세</option>
												<option>45세</option>
												<option>50세</option>
												<option>55세</option> 
											</select>
											<label for="ex_select">이상</label>
										</div>  
										<div class="selectbox" style="margin-left: 20px;"> 
											<select id="ex_select">
												<option selected>선택안함</option>
												<option>9세</option>
												<option>10세</option>
												<option>14세</option>
												<option>19세</option>
												<option>24세</option>
												<option>29세</option>
												<option>34세</option>
												<option>39세</option>
												<option>44세</option>
												<option>49세</option>
												<option>54세</option>
											</select>
											<label for="ex_select">이하</label>
										</div> 
								</div> 
							</div>

								<div class="swiper-slide gridWrap02" style="padding-top: 0;">
								<div class="currentHeader mt15">  
									<span class="cap02">*조사년도(필수)</span>  
									<div class="selectbox" style="margin-left: 10px;">
										<label for="ex_select"></label> <select id="ex_select">
											<option selected>2018</option>
											<option>2017</option>
											<option>2016</option>
										</select>
									</div>  
								</div>
								
								<div class="currentHeader"> 
									<span class="cap02">*대상(필수)</span> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCard">
										<h2>농가가구</h2>  
									</div>
									<div class="List-ConCard">
										<h2>임가가구</h2>  
									</div> 
								</div>
								
								<div class="List-conRow">
									<div class="List-ConCard">
										<h2>어가가구</h2>  
									</div>
								</div> 
								</div>
							</div> 
						
							<!-- Initialize Swiper -->
								<script>
							      var galleryThumbs = new Swiper('.gallery-thumbstxt1', {
							        spaceBetween: 0,
							        slidesPerView: 1,
							        freeMode: true,
							        watchSlidesVisibility: true,
							        watchSlidesProgress: true,
							      });
							      var galleryTop = new Swiper('.gallery-top1', {
							        spaceBetween: 10,
							        navigation: {
							          nextEl: '.swiper-button-next',
							          prevEl: '.swiper-button-prev',
							        },
							        thumbs: {
							          swiper: galleryThumbs
							        }
							      });
							    </script> 
						</div> 
					</div>
				</div>
				 
				
				<div class="sfbFooter">
					<button class="btn_search" type="button" name="nextPage" style="width: 100%;">조회</button>
				</div>
				</div>
			</div>
		<!-- 농림어가 Tab List - END -->
		 
		 
		
		<!-- tab 물음표 버튼 클릭 시 표출되는 팝업 - START -->
		<div id="currentMap_moreInfo" class="currentMap_moreInfo" style="display: none;">
		 <div class="currentmoreInfoWrap">
			 <div class="popHeader">
				<button id="common_popup_alert_close" class="btn_popClose" type="button"></button>
			 </div>
			 <div class="currentmoreInfoCon">
				<div class="bb pb13">
				<p class="currentPoptit">농임어업 총조사 항목 중 상세조건 설정에 따른 가구 통계 조회가 가능합니다.</p>
				<p class="currentFocus mt10">*대상</p>
				</div>
				<div> 
					<ul class="mt10">
					<li><p class="currentFocus">-농가 : </p><span>생계, 영리, 연구를 목적으로 농업을 경영하거나 농업에 종사하는 가구</span></li>
					<li><p class="currentFocus">-임가 : </p><span>산림면적을 3ha이상 보유하면서 지난 5년간 육림작업 실적이 있거나 지난 1년간 벌목업, 양묘업을 경영하였거나,
					직접 생산한 임산물을 판매대금이 120만원 이상인 가구</span></li>
					<li><p class="currentFocus">-어가 : </p><span>지난 1년간 판매 목적으로 1개월 이상 어선어업, 마을 어업, 양식어업을 직접 경영한 가구이거나, 지난 1년간 직접 잡거나
					양식한 수산물을 판 금액이 120만원 이상인 가구</span></li>
					</ul>
				</p>
				</div>
			</div>
		 </div>
		</div>
	
		<!-- tab 물음표 버튼 클릭 시 표출되는 팝업 - START --> 
	 </div> 
		
		<script>		
		 
		//인구 리스트 check box 클릭 시 나이 선택 selectbox 표출 
		
		function showSelect (box) {
        
        var chboxs = document.getElementsByName("c1");
        var vis = "none";
        for(var i=0;i<chboxs.length;i++) { 
            if(chboxs[i].checked){
             vis = "flex";
                break;
            }
        }
        document.getElementById(box).style.display = vis;  
    }
		
		//농림어가 성별 check box 클릭 시 성별 선택 selectbox 표출 
				
				function genderSelect(genderSelectbox) {
		        
		        var chboxs2 = document.getElementsByName("c2");
		        var vis = "none";
		        for(var i=0;i<chboxs2.length;i++) { 
		            if(chboxs2[i].checked){
		             vis = "block";
		                break;
		            }
		        }
		        document.getElementById(genderSelectbox).style.display = vis;  
		    }
		
		//분류찾기 버튼 클릭 시 분류찾기 목록 표출 
				
			$("#itemSearchToggle").click(function(){
			  $(this).toggleClass("on"); 
			  $("#itemSearchList").slideToggle();
			});
		
		//테마검색 목록 드롭다운  
		//생활서비스 드롭다운
		$("#itemDropboxBtn").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon0").slideToggle();
		});
		
		//도소매 드롭다운
		$("#itemDropboxBtn1").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon1").slideToggle();
		});
		
		//숙박 드롭다운
		$("#itemDropboxBtn2").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon2").slideToggle();
		});
		
		//음식점 드롭다운
		$("#itemDropboxBtn3").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon3").slideToggle();
		});
		
		//교통 드롭다운
		$("#itemDropboxBtn4").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon4").slideToggle();
		});
		
		//공공 드롭다운
		$("#itemDropboxBtn5").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon5").slideToggle();
		});
		
		//교육 드롭다운
		$("#itemDropboxBtn6").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon6").slideToggle();
		});
		
		//기업 드롭다운
		$("#itemDropboxBtn7").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon7").slideToggle();
		});
		
		//편의/문화 드롭다운
		$("#itemDropboxBtn8").click(function(){
		  $(this).toggleClass("on"); 
		  $("#itemDropCon8").slideToggle();
		});

		
		</script>
		<!-- 내주변통계 리스트 END-->
		 
		 
		<!-- 관심지역 POI조회 Popup - START -->
		<div id="interactivePOIPopup" style="position: absolute; right: 0; top: 0; height: 100%; width: 100%; overflow: auto; z-index: 1800; background-color: #ffffff; display: none;">
			<div class="Header">
				<header id="headerArea">
					<div class="gnb">
						<h2>관심지점(POI)</h2>
						<button id="interactivePOIPopup_close" class="btn_popClose" type="button"></button> 
					</div>
				</header>
			</div>
			<div class="Conten" style="background-color: #ffffff"> 
					<div class="nav_h_type interMenuWrap"  style="position: relative; width : 100%;">
				    	<ul class="" >
							<li style="width: 15px;"></li> 
							<li class="interMenu on"><a href="#">생활서비스</a></li>
							<li ><a href="#">도소매</a></li>
							<li ><a href="#">교통</a></li>
							<li ><a href="">숙박</a></li>
							<li ><a href="">음식점</a></li> 
							<li ><a href="">공공</a></li> 
							<li ><a href="">교육</a></li> 
							<li ><a href="">기업</a></li>
							<li ><a href="">편의문화</a></li>
				        </ul>
				    </div>
				    
				    <!-- 생활서비스 START -->
					<div id="interactivePOIPopup_page_0" class="infoPage" style="display: none; flex-direction: column;">
						<div> 		
								<div class="tab-conRow02" style="margin-top: 10px;">  
									<div class="tab-ConCard02 on" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1001.png">
										<p class="Catalogtxt">인테리어</p>
									</div> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1002.png">
										<p class="Catalogtxt">목욕탕</p>
									</div> 
								</div>
								
								<div class="tab-conRow02">  
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1003.png">
										<p class="Catalogtxt">교습학원</p>
									</div>
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1004.png">
										<p class="Catalogtxt">어학원</p>
									</div>
								</div> 
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1005.png">
										<p class="Catalogtxt">예체능학원</p>
									</div> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1006.png">
										<p class="Catalogtxt">부동산중개업</p>
									</div>
								</div>
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1007.png">
										<p class="Catalogtxt">이발소</p>
									</div> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1008.png">
										<p class="Catalogtxt">미용실</p>
									</div>
								</div>
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1009.png">
										<p class="Catalogtxt">세탁소</p>
									</div> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1010.png">
										<p class="Catalogtxt">PC방</p>
									</div>
								</div>
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_1011.png">
										<p class="Catalogtxt">노래방</p>
									</div>
								</div> 
							</div>
					</div>
					<!-- 생활서비스 END -->
					
					<!-- 도소매 START -->
					<div id="interactivePOIPopup_page_1" class="infoPage" style="display: flex; flex-direction: column;">
						<div> 		
								<div class="tab-conRow02" style="margin-top: 10px;">  
									<div class="tab-ConCard02 on" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2001.png">
										<p class="Catalogtxt">문구점</p>
									</div> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2002.png">
										<p class="Catalogtxt">서점</p>
									</div> 
								</div>
								
								<div class="tab-conRow02">  
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2003.png">
										<p class="Catalogtxt">편의점</p>
									</div>
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2004.png">
										<p class="Catalogtxt">식료품점</p>
									</div>
								</div> 
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2005.png">
										<p class="Catalogtxt">휴대폰점</p>
									</div> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2006.png">
										<p class="Catalogtxt">의류</p>
									</div>
								</div>
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2007.png">
										<p class="Catalogtxt">화장품/방향제</p>
									</div> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2008.png">
										<p class="Catalogtxt">철물점</p>
									</div> 
								</div>
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2009.png">
										<p class="Catalogtxt">주유소</p>
									</div>
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2010.png">
										<p class="Catalogtxt">꽃집</p>
									</div>
								</div>
								
								<div class="tab-conRow02"> 
									<div class="tab-ConCard02" data-search-item="true" data-type="radio" data-parent-id="1" data-id="1" data-title="남자" data-name="liketown_1" data-default="Y">
										<img src="/mobile/resources/m2020/images/sub/current/poi_icon_2011.png">
										<p class="Catalogtxt">슈퍼마켓</p>
									</div>
								</div>
								
							</div>
						</div>
					<!-- 도소매 END -->
					
					</div>
			</div>		
		<!-- 관심지역 POI조회 Popup - END -->
		
		
		<!-- 20200720_구소스 START -->
		<!-- 주요지표(API_0301) START -->
				<!-- 
				<div class="Btnarea">
					<button type="button" class="swiperBtn" name="button" id="swiperBtn"></button>
				</div>
				<div class="result_list" id="result_list" style="height: 200px; display:none" name="API_0301_DIV" id="api0301Div">
					<h2 class="tit">주요지표</h2>
					<form class="search-result">
						<input type="text" id="search-bar02" placeholder="결과 내 재검색">
						<a href="#"><img class="search-icon" src="${ctx }/resources/m2020/images/main/search_rnb.png"></a>
					</form>
					<div class="gridWrap currentWrap">
						<div class="gridheader" >
							<p>
								14<span>건</span>
							</p>
							<span class="cap">*주요지표조사년도</span>
							<div id="ppltn" class="selectbox" style="margin-right: -25px;">
								<label for="ex_select"></label> 
								<select name="API_0301_ppltn_year" id="API_0301_ppltn_year">
								</select>
							</div>
							<div class="selectbox">
								<label for="ex_select"></label> <select id="ex_select">
									<option selected>제목순</option>
									<option>작성자</option>
									<option>작성일</option>
								</select>
							</div>
							<div id="corp" class="selectbox" style="display:none; margin-right: -25px;">
								<span class="cap">사업체 주요지표 조사년도(필수)</span>
								<label for="ex_select"></label> 
								<select name="API_0301_corp_year" id="API_0301_corp_year">
								</select>
							</div>
						</div>
						<div class="gridheader_con on">
							<div class="gridrow">
								<h2>총인구(명)</h2>
								<input type="radio" name="API_0301" checked="checked" value="tot_ppltn" id="tot_ppltn" data-show-name="총인구" data-unit="명" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
	
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>평균나이(세)</h2>
								<input type="radio" name="API_0301" value="avg_age" id="avg_age" data-show-name="평균나이" data-unit="세" style="visibility:hidden; width:0px; height:0px">
								<a href="#"class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
	
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>인구밀도(명/㎢)</h2>
								<input type="radio" name="API_0301" value="ppltn_dnsty" id="ppltn_dnsty" data-show-name="인구밀도" data-unit="명/㎢" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>노령화지수</h2>
								<input type="radio" name="API_0301" value="aged_child_idx" id="aged_child_idx" data-show-name="노령화지수" data-unit="일백명당 명" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>노년부양비</h2>
								<input type="radio" name="API_0301" value="oldage_suprt_per" id="oldage_suprt_per" data-show-name="노년부양비" data-unit="일백명당 명" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>유년부양비</h2>
								<input type="radio" name="API_0301" value="juv_suprt_per" id="juv_suprt_per" data-show-name="유년부양비" data-unit="일백명당 명" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>가구(가구)</h2>
								<input type="radio" name="API_0301" value="tot_family" id="tot_family" data-show-name="가구" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>평균 가구원(명)</h2>
								<input type="radio" name="API_0301" value="avg_fmember_cnt" id="avg_fmember_cnt" data-show-name="평균 가구원" data-unit="명" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>주택(호)</h2>
								<input type="radio" name="API_0301" value="tot_house" id="tot_house" data-show-name="주택" data-unit="호" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>농가(가구)</h2>
								<input type="radio" name="API_0301" value="nongga_cnt" id="nongga_cnt" data-show-name="농가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>임가(가구)</h2>
								<input type="radio" name="API_0301" value="imga_cnt" id="imga_cnt" data-show-name="임가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>내수면 어가(가구)</h2>
								<input type="radio" name="API_0301" value="naesuoga_cnt" id="naesuoga_cnt" data-show-name="내수면 어가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>해수면 어가(가구)</h2>
								<input type="radio" name="API_0301" value="haesuoga_cnt" id="haesuoga_cnt" data-show-name="해수면 어가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>사업체 수(전체 사업체)</h2>
								<input type="radio" name="API_0301" value="corp_cnt" id="corp_cnt" data-show-name="사업체수" data-unit="개" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn" style="color:#ddd" >데이터보드</a>
							</div> 
						</div>
					</div>
				</div>
				-->
					
				<!-- 인구(API_0302) Tab List - START -->	
				<div class="result_list" name="API_0302_DIV" id="api0302Div" style="height: 275px; display: none;">
					<h2 class="tit pb13">인구</h2> 
					<div class="gridheader">
						<p>
							3<span>건</span>
						</p> 
					</div>
					<div class="gridrow">
						<span class="cap02">*조사년도(필수)</span>
						<div class="selectbox">
							<label for="ex_select"></label>
							<select id="API_0302_year" name="API_0302_year">
							</select>
						</div> 
					</div>
				
					<div class="gridrow" style="margin-bottom: 10px;">
						<span class="cap02">연령(선택)</span>
						 <label class="selectcheck-container">
						  <input type="checkbox" name="c1" onclick="$currentMap.ui.showSelect('ageSelectbox')">
						  <span class="selectcheckmark"></span>
						</label>
					</div>
					
					<!-- 나이 범위 선택 영역 -->
					<div class="gridrow" id="ageSelectbox" style="margin-bottom: 10px; display: none;">
						 <div class="selectbox"> 
							<select id="API_0302_age_from" name="API_0302_age_from" disabled="disabled">
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
							<label for="ex_select">이상</label>
						</div>  
						<div class="selectbox"> 
							<select id="API_0302_age_to" name="API_0302_age_to" disabled="disabled" style="margin-left: -90px;">
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
							<label for="ex_select">이하</label>
						</div> 
					</div>
					
					<div class="gridWrap" style="height: 160px;">
						<div class="gridheader_con on">
							<div class="gridrow">
								<h2>전체</h2><input name="API_0302_gender" type="radio" value="0" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
	
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>남자</h2><h2>전체</h2><input name="API_0302_gender" type="radio" value="1" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
	
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>여자</h2><h2>전체</h2><input name="API_0302_gender" type="radio" value="2" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div> 
					</div> 
					
					<div class="gridWrap" id="API_0302_yaer_check" style="display:none">
						<div class="gridheader_con on">
							<div class="gridrow">
								<h2>수학없음</h2><input name="API_0302_edu_level" type="checkbox" value="1" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>초등학교</h2><input name="API_0302_edu_level" type="checkbox" value="2" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>중학교</h2><input name="API_0302_edu_level" type="checkbox" value="3" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>고등학교</h2><input name="API_0302_edu_level" type="checkbox" value="4" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>전문학사</h2><input name="API_0302_edu_level" type="checkbox" value="5" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>학사</h2><input name="API_0302_edu_level" type="checkbox" value="6" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>석사</h2><input name="API_0302_edu_level" type="checkbox" value="7" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>박사</h2><input name="API_0302_edu_level" type="checkbox" value="8" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
					</div>
				</div>  
				<!-- 인구 Tab(API_0302) List - END -->
				
				<!-- 가구 Tab(API_0305) List - START -->	
				<div class="result_list" name="API_0305_DIV" id="api0305Div" style="height: 230px; display: none;">
					<h2 class="tit pb13">가구</h2> 
					<div class="gridheader">
						<p>
							7<span>건</span>
						</p> 
					</div>
					<div class="gridrow">
						<span class="cap02">*조사년도(필수)</span>
						<div class="selectbox">
							<label for="ex_select"></label> 
								<select name="API_0305_year" id="API_0305_year">
								</select>
						</div> 
					</div>
					<div class="gridrow" style="margin-bottom: 10px;">
						<span class="cap02">세대구성(선택)</span>
						 <label class="selectcheck-container">
						  <input type="checkbox" onclick="">
						  <span class="selectcheckmark"></span>
						</label>
					</div>
					<div class="gridWrap" style="height: 220px;">
						<div class="gridheader_con on">
							<div class="gridrow">
								<h2>총가구</h2><input name="API_0305_household_type" type="checkbox" value="00" disabled="disabled" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
	
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>1세대 가구</h2><input name="API_0305_household_type" type="checkbox" value="01" disabled="disabled" >
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
	
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>2세대 가구</h2><input name="API_0305_household_type" type="checkbox" value="02" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow"><input name="API_0305_household_type" type="checkbox" value="03" disabled="disabled">
								<h2>3세대 가구</h2>
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>4세대 이상 가구</h2><input name="API_0305_household_type" type="checkbox" value="04" disabled="disabled">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>1인가구</h2><input name="API_0305_household_type" type="checkbox" value="A0" disabled="disabled" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div>
						
						<div class="gridheader_con">
							<div class="gridrow">
								<h2>비혈연가구</h2><input name="API_0305_household_type" type="checkbox" value="B0" disabled="disabled" style="visibility:hidden; width:0px; height:0px">
								<a href="#" class="databoardBtn">데이터보드</a>
							</div> 
						</div> 
					</div> 
				</div> 
				<!-- 가구 Tab List - END -->
			<!-- 20200720 구소스 END -->
		
</body>
</html>