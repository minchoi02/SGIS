<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div style="display:none;" id="tabArea">
<ul class="tab" style="margin-top:30px;">
	<li class="on"><a href="javascript:areainfo4_gubun('5')">음식점</a></li>
	<li><a href="javascript:areainfo4_gubun('2')" >도소매</a></li>
	<li><a href="javascript:areainfo4_gubun('1')" >서비스</a></li>
	<li><a href="javascript:areainfo4_gubun('4')" >숙박업</a></li>
</ul>
</div>
<div id="areainfo-4" class="areainfo" style="display:none; overflow: auto;">
	<div class="MapTitle1" style="width: 100%; height: 24px; background: #000; display: none; opacity: 0.6; position: absolute; z-index: 500;">
		<h3 class = "TitleText" style="width: 100%; box-sizing: border-box; padding: 2px 0; position: absolute; left: 0; top: 0; text-align: center; color: #fff; z-index: 501; font-weight: normal; font-size: 12px; overflow: hidden; white-space: nowrap;"></h3>
		<span class="MapTitleBg">&nbsp;</span>
	</div>
	<p style="display:none;">
		<label><input type="radio" name="business-radio" value="ratio" checked="checked" data-title="소상공인 업종별 사업체 비율 (%)"> 업종별 비율 </label>
		<label><input type="radio" name="business-radio" value="incdec" data-title="소상공인 업종별 증감 (%)"> 업종별 증감 </label>
		<label><input type="radio" name="business-radio" value="facility" data-title="주요시설물 현황 (%)"> 주요시설물 현황 </label>
	</p>
	<div id="areainfo-4-ratio" class="chart"></div>
	<div id="areainfo-4-incdec" style="display:none;">
			<a class="subject1 M_on" id="areainfo4-button1">음식점</a>
			<a class="subject2" id="areainfo4-button2">도소매</a>
			<a class="subject3" id="areainfo4-button3">서비스</a>
			<a class="subject4" id="areainfo4-button4">숙박업</a>
			<div id="incDecSwiper" class="swiper-container" style="height:70px; padding-top:10px">
			<div class="swiper-wrapper">
			
				<div class="swiper-slide" id="areainfo4-swiper1_1" data-theme-cd="5001"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5001.png" alt="" /></em>한식</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_2" data-theme-cd="5002"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5002.png" alt="" /></em>중식</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_3" data-theme-cd="5003"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5003.png" alt="" /></em>일식</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_4" data-theme-cd="5004"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5004.png" alt="" /></em>분식</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_6" data-theme-cd="5006"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5006.png" alt="" /></em>제과점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_7" data-theme-cd="5007"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5007.png" alt="" /></em>패스트푸드</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_8" data-theme-cd="5008"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5008.png" alt="" /></em>치킨</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_9" data-theme-cd="5009"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5009.png" alt="" /></em>호프 및 간이주점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_10" data-theme-cd="5010"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5010.png" alt="" /></em>카페</span></div>
				<div class="swiper-slide" id="areainfo4-swiper1_11" data-theme-cd="5011"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_5011.png" alt="" /></em>기타 외국식</span></div>
				
				<div class="swiper-slide" id="areainfo4-swiper2_1" data-theme-cd="2001"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2001.png" alt="" /></em>문구점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_2" data-theme-cd="2002"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2002.png" alt="" /></em>서점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_3" data-theme-cd="2003"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2003.png" alt="" /></em>편의점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_4" data-theme-cd="2004"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2004.png" alt="" /></em>식료품점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_5" data-theme-cd="2005"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2005.png" alt="" /></em>휴대폰점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_6" data-theme-cd="2006"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2006.png" alt="" /></em>의류</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_7" data-theme-cd="2007"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2007.png" alt="" /></em>화장품/방향제</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_8" data-theme-cd="2008"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2008.png" alt="" /></em>철물점</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_9" data-theme-cd="2009"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2009.png" alt="" /></em>주유소</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_10" data-theme-cd="2010"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2010.png" alt="" /></em>꽃집</span></div>
				<div class="swiper-slide" id="areainfo4-swiper2_11" data-theme-cd="2011"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_2011.png" alt="" /></em>슈퍼마켓</span></div>
				
				<div class="swiper-slide swiper_m_on" id="areainfo4-swiper3_1" data-theme-cd="1001"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1001.png" alt="" /></em>인테리어</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_2" data-theme-cd="1002"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1002.png" alt="" /></em>목욕탕</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_3" data-theme-cd="1003"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1003.png" alt="" /></em>교습학원</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_4" data-theme-cd="1004"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1004.png" alt="" /></em>어학원</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_5" data-theme-cd="1005"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1005.png" alt="" /></em>예체능학원</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_6" data-theme-cd="1006"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1006.png" alt="" /></em>부동산중개업</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_7" data-theme-cd="1007"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1007.png" alt="" /></em>이발소</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_8" data-theme-cd="1008"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1008.png" alt="" /></em>미용실</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_9" data-theme-cd="1009"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1009.png" alt="" /></em>세탁소</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_10" data-theme-cd="1010"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1010.png" alt="" /></em>PC방</span></div>
				<div class="swiper-slide" id="areainfo4-swiper3_11" data-theme-cd="1011"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_1011.png" alt="" /></em>노래방</span></div>
				
				<div class="swiper-slide" id="areainfo4-swiper4_1" data-theme-cd="4001"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_4001.png" alt="" /></em>호텔</span></div>
				<div class="swiper-slide" id="areainfo4-swiper4_2" data-theme-cd="4002"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_4002.png" alt="" /></em>여관(모텔포함) 및 여인숙</span></div>
				<div class="swiper-slide" id="areainfo4-swiper4_3" data-theme-cd="4003"  style="display:none;"><span class="theme_icon"><em><img src="${ctx }/resources/images/map/current/ico_sector_img_4003.png" alt="" /></em>펜션</span></div>
			</div>
			<div id="businessDivIncDecScrollbar" class="swiper-scrollbar" style="padding-top:10px"></div>
			<div id="businessDivIncNext" class="swiper-button-next" style="padding-top:10px"></div>
			<div id="businessDivIncPrev" class="swiper-button-prev" style="padding-top:10px"></div>
		</div>
		<div class="chart"></div>
	</div>
		<div id="areainfo-4-facility" style="display:none;">
			<div class="chart"></div>
		</div>
	<!-- mng_s 20200421 김건민 (년도 수정) -->	
	<p class="origin_txt">출처 : 통계청, 전국사업체조사 (2018)</p>
</div>