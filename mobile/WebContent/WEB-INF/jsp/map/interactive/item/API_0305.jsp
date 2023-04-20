<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="Detail2_1" data-id="API_0305" style="display: none;">
	<a class="Info Title" onclick="$('#API_0305_INFO_BOX').show();">도움말</a>
	<h4>조사년도(필수)</h4>
	<span class="SelectBox">
		<select name="API_0305_year" id="API_0305_year">
  	  		<!--  mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가 interactive.map.js 참고 -->
		</select>
	</span>
	<h4>세대구성(선택)<label><input type="checkbox" data-able="household_type" data-type="checkbox">선택</label></h4>
	<ul id="household_type" class="List">
		<li class="disabled"><label><input name="API_0305_household_type" type="checkbox" value="01" disabled="disabled">1세대가구</label></li>
		<li class="disabled"><label><input name="API_0305_household_type" type="checkbox" value="02" disabled="disabled">2세대가구</label></li>
		<li class="disabled"><label><input name="API_0305_household_type" type="checkbox" value="03" disabled="disabled">3세대가구</label></li>
		<li class="disabled"><label><input name="API_0305_household_type" type="checkbox" value="04" disabled="disabled">4세대이상 가구</label></li>
		<li class="hr"></li>
		<li class="disabled"><label><input name="API_0305_household_type" type="checkbox" value="A0" disabled="disabled">1인가구</label></li>
		<li class="disabled"><label><input name="API_0305_household_type" type="checkbox" value="B0" disabled="disabled">비혈연가구</label></li>
	</ul>
	<div id="API_0305_yaer_check" style="display:none">
		<h4>점유형태(선택) <label><input type="checkbox" data-able="ocptn_type" data-type="checkbox" name="API_0305_check">선택</label></h4>
		<ul id="ocptn_type" class="List">
			<li class="disabled"><label><input name="API_0305_ocptn_type" type="checkbox" value="1" disabled="disabled">자기집</label></li>
			<li class="disabled"><label><input name="API_0305_ocptn_type" type="checkbox" value="2" disabled="disabled">보증금있는월세</label></li>
			<li class="disabled"><label><input name="API_0305_ocptn_type" type="checkbox" value="3" disabled="disabled">전세(월세없음)</label></li>
			<li class="disabled"><label><input name="API_0305_ocptn_type" type="checkbox" value="4" disabled="disabled">보증금없는월세</label></li>
			<li class="disabled"><label><input name="API_0305_ocptn_type" type="checkbox" value="5" disabled="disabled">사글세</label></li>
			<li class="disabled LongText"><label><input name="API_0305_ocptn_type" type="checkbox" value="6" disabled="disabled">무상(관사, 사택, 친척집 등)</label></li>
		</ul>
	</div>
</div>
