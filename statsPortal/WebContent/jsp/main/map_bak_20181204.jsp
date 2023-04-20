<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- allMap / 전국지도 -->
<div class="allMap">
	<span class="allMap-view"><img src="../images/map/map00.png" alt="" usemap="#all-map"></span>
	<map name="all-map" id="all-map" class="allMap-point">
		<area shape="poly" coords="49,64,52,64,52,61,55,59,58,60,58,63,61,65,57,70,51,69,49,68" href="#" alt="서울" data-area-name="seoul"  data-detail="ss_bg" data-code="11"/>
		<area shape="poly" coords="32,55,29,60,33,65,35,71,35,75,23,76,25,81,32,84,37,80,41,77,40,75,39,70,42,69,47,73,49,69,48,65,45,64,41,65,40,60,41,58,38,53" href="#" alt="인천 "  data-code="23" data-area-name="inchon" data-detail="ic_bg"/>
		<area shape="poly" coords="40,57,40,61,42,65,45,63,49,66,57,60,60,62,61,66,59,70,47,71,45,72,45,77,43,80,46,83,47,87,50,91,59,90,66,91,79,80,79,65,72,62,72,55,73,51,67,44,60,43,60,39,49,43,51,45,49,48,45,48,46,53,44,55" href="#" alt="경기도"  data-code="31" data-area-name="kk" data-detail="kk_bg" />
		<area shape="poly" coords="60,37,64,35,66,37,88,36,89,33,96,31,97,27,99,27,107,44,121,66,129,76,125,81,105,83,88,77,84,81,77,79,81,62,73,62,71,51,72,50,67,43,61,42" href="#" alt="강원도" data-area-name="kw" data-detail="kw_bg"  data-code="32"/>
		<area shape="poly" coords="28,94,27,99,30,102,31,99,34,104,33,106,34,112,39,113,42,127,49,126,51,119,56,119,56,123,59,124,63,121,66,122,69,126,75,127,75,124,73,117,70,117,63,117,64,111,68,107,65,102,64,97,67,95,64,91,59,89,52,91,45,88,43,89,42,87,37,85" href="#" alt="충청남"  data-code="34" data-area-name="chungnam" data-detail="chn_bg"/>
		<area shape="poly" coords="65,90,69,96,71,98,71,102,67,106,72,109,72,117,75,119,75,125,83,125,89,117,84,114,84,104,84,100,94,93,97,95,101,94,100,90,105,85,88,78,85,81,79,80" href="#" alt="충청북"  data-code="33"  data-area-name="chungbuk" data-detail="chb_bg"/>
		<area shape="poly" coords="65,97,64,102,67,105,71,103,71,96" href="#" alt="세종"  data-code="29" data-area-name="sejong" data-detail="sj_bg"/>
		<area shape="poly" coords="67,107,64,111,63,117,69,118,70,113,72,110" href="#" alt="대전"  data-code="25" data-area-name="dj" data-detail="dj_bg"/>
		<area shape="poly" coords="76,134,83,131,92,135,96,140,108,139,113,144,119,140,119,145,124,150,115,155,114,158,106,159,102,162,102,167,107,166,108,164,112,165,110,173,106,177,95,171,89,172,88,177,80,176,79,162,74,151" href="#" alt="경상남도"  data-code="38" data-area-name="gyeongnam" data-detail="gsn_bg"/>
		<area shape="poly" coords="93,93,83,101,84,105,83,112,85,115,89,116,88,119,84,124,84,130,95,136,95,140,100,140,100,128,107,125,112,126,110,132,105,142,113,144,125,137,132,138,136,123,133,123,131,119,133,93,131,90,131,85,129,79,125,82,105,83,102,88,100,93,95,94" href="#" alt="경상북도"  data-code="37" data-area-name="gyeongbuk" data-detail="gsb_bg"/>
		<area shape="poly" coords="99,131,100,140,105,139,111,131,110,126,104,124" href="#" alt="대구"  data-code="22" data-area-name="dg" data-detail="dg_bg"/>
		<area shape="poly" coords="45,155,44,160,46,163,52,162,55,159,53,155" href="#" alt="광주"  data-code="24" data-area-name="kj" data-detail="kj_bg"/>
		<area shape="poly" coords="35,149,34,158,24,159,25,162,26,166,21,172,21,183,24,183,17,195,21,198,29,193,28,190,32,191,35,188,36,193,60,191,61,189,67,185,71,189,74,186,70,180,77,181,81,178,79,166,73,153,55,152,54,149,48,146,46,148,39,152" href="#" alt="전라남도"  data-code="36" data-area-name="jeonnam" data-detail="jln_bg"/>
		<area shape="poly" coords="43,127,43,132,38,140,38,148,40,151,47,149,49,147,54,147,56,152,73,153,76,133,84,131,82,125,73,123,72,126,67,124,66,120,60,122,57,120,54,119,50,119,48,124" href="#" alt="전라북도"  data-code="35" data-area-name="jeonbuk" data-detail="jlb_bg"/>
		<area shape="poly" coords="119,139,119,146,124,148,127,151,130,149,132,137,125,136" href="#" alt="울산"  data-code="26" data-area-name="ws" data-detail="us_bg" />
		<area shape="poly" coords="102,166,102,161,106,158,114,159,116,155,124,150,127,151,125,157,112,164,108,162" href="#" alt="부산"  data-code="21" data-area-name="bs" data-detail="bs_bg"/>
		<area shape="poly" coords="33,208,36,204,44,203,48,203,52,205,53,210,47,214,36,216,31,217,26,212,28,209" href="#" alt="제주"  data-code="39" data-area-name="jeju" data-detail="jj_bg"/>
	</map>
</div>
<!--// allMap / 전국지도 -->