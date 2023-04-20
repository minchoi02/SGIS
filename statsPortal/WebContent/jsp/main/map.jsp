<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!-- allMap / 전국지도 -->
<div class="allMap">
	<span class="allMap-view"><img src="../images/map/map00.png" alt="" usemap="#all-map"></span>
	<map name="all-map" id="all-map" class="allMap-point">
		<area shape="poly" coords="54,78,54,83,58,84,60,83,63,84,68,79,65,76,64,72,60,72,57,75" href="#" alt="서울" data-area-name="seoul"  data-detail="ss_bg" data-code="11"/>
		<area shape="poly" coords="41,84,45,81,50,85,54,81,53,77,49,75,45,76,43,71,44,69,41,64,38,64,35,64,32,66,32,68,30,70,30,73,33,73,35,75,38,81,36,87,28,88,25,91,26,95,30,96,35,98,40,93,44,93,44,87,40,87,38,87,37,87" href="#" alt="인천 "  data-code="23" data-area-name="inchon" data-detail="ic_bg"/>
		<area shape="poly" coords="43,70,46,76,50,76,53,78,61,72,63,74,63,77,67,77,62,83,53,81,49,84,47,92,45,97,49,98,52,104,57,107,66,104,72,105,88,95,88,77,81,74,81,63,75,55,69,52,62,48,53,50,53,55,54,56,52,58,50,63,50,66" href="#" alt="경기도"  data-code="31" data-area-name="kk" data-detail="kk_bg" />
		<area shape="poly" coords="65,48,67,54,76,56,79,63,78,68,81,77,87,77,89,96,98,94,137,98,143,92,143,88,118,53,110,37,106,36,104,40,98,40,98,46,71,46,68,44" href="#" alt="강원도" data-area-name="kw" data-detail="kw_bg"  data-code="32"/>
		<area shape="poly" coords="29,109,40,98,45,99,47,104,53,102,55,107,66,103,71,105,75,110,74,112,70,114,71,118,75,121,73,123,70,129,70,135,78,137,78,135,80,135,84,143,80,146,74,145,73,139,67,139,64,142,62,143,61,137,57,138,51,145,45,145,43,130,38,130,35,123,36,118,33,116,32,117,29,114" href="#" alt="충청남도"  data-code="34" data-area-name="chungnam" data-detail="chn_bg"/>
		<area shape="poly" coords="73,105,74,113,78,114,78,121,75,123,79,127,77,133,82,135,82,144,94,143,98,139,97,133,95,134,93,131,93,121,91,118,104,108,106,112,111,111,111,104,116,99,97,92,91,95,88,96" href="#" alt="충청북도"  data-code="33"  data-area-name="chungbuk" data-detail="chb_bg"/>
		<area shape="poly" coords="70,112,70,117,76,123,78,117,78,111" href="#" alt="세종"  data-code="29" data-area-name="sejong" data-detail="sj_bg"/>
		<area shape="poly" coords="75,123,70,128,71,136,78,137,78,131,80,127" href="#" alt="대전"  data-code="25" data-area-name="dj" data-detail="dj_bg"/>
		<area shape="poly" coords="90,151,84,157,80,177,89,188,89,203,100,203,100,199,107,196,120,202,123,200,125,190,120,189,117,192,113,192,114,186,119,182,122,184,127,184,130,179,138,173,133,167,133,161,125,166,116,161,103,161,105,156" href="#" alt="경상남도"  data-code="38" data-area-name="gyeongnam" data-detail="gsn_bg"/>
		<area shape="poly" coords="105,107,108,111,112,110,113,105,117,99,139,97,144,92,147,98,146,105,148,110,147,137,148,143,151,141,153,144,149,159,137,157,125,164,117,160,124,152,121,144,118,144,110,149,111,160,103,159,103,154,93,151,98,136,92,143,98,133,94,132,92,120,92,119" href="#" alt="경상북도"  data-code="37" data-area-name="gyeongbuk" data-detail="gsb_bg"/>
		<area shape="poly" coords="172,38,168,39,168,43,173,47,178,47,182,50,182,46,177,43,177,38" href="#" alt="경상북도"  data-code="37" data-area-name="gyeongbuk" data-detail="gsb_bg"/>
		<area shape="poly" coords="111,160,117,160,123,152,121,145,117,145,110,148" href="#" alt="대구"  data-code="22" data-area-name="dg" data-detail="dg_bg"/>
		<area shape="poly" coords="48,180,48,183,52,185,57,187,61,184,61,181,58,178,50,177" href="#" alt="광주"  data-code="24" data-area-name="kj" data-detail="kj_bg"/>
		<area shape="poly" coords="24,181,37,180,40,171,47,175,52,172,52,169,56,167,60,171,62,175,82,175,90,187,89,203,87,208,80,207,82,212,78,215,76,213,66,217,66,220,43,221,39,216,36,217,31,218,31,221,21,227,18,220,26,207,23,207,22,197,26,189,28,190,28,187" href="#" alt="전라남도"  data-code="36" data-area-name="jeonnam" data-detail="jln_bg"/>
		<area shape="poly" coords="47,146,48,152,44,159,40,169,46,175,51,172,52,170,55,168,63,172,83,177,83,159,92,151,92,145,83,144,80,146,75,145,74,140,69,139,64,142,59,137,56,139,55,144" href="#" alt="전라북도"  data-code="35" data-area-name="jeonbuk" data-detail="jlb_bg"/>
		<area shape="poly" coords="133,161,133,168,142,176,148,161,138,157" href="#" alt="울산"  data-code="26" data-area-name="ws" data-detail="us_bg" />
		<area shape="poly" coords="113,187,114,192,118,192,120,190,123,189,139,183,142,176,138,173,129,179,127,183,119,182" href="#" alt="부산"  data-code="21" data-area-name="bs" data-detail="bs_bg"/>
		<area shape="poly" coords="31,237,36,238,40,233,54,231,59,235,60,240,49,246,38,247,35,249,29,243" href="#" alt="제주"  data-code="39" data-area-name="jeju" data-detail="jj_bg"/>
	</map>
</div>
<!--// allMap / 전국지도 -->