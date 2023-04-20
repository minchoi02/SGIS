<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
srvLogWrite("M0","05", "01", "01", "", "");
</script>
<div class="Detail2_1" style="display: block;" data-id="API_0301">
	<a class="Info Title" onclick="$('#API_0301_INFO_BOX').show();">도움말</a>
	<h4>검색항목(필수)</h4>
	<ul class="List" id="api0301ul">
		<li class="Check">
			<label for="tot_ppltn">
				<input type="radio" name="API_0301" checked="checked" value="tot_ppltn" id="tot_ppltn" data-show-name="총인구" data-unit="명">
					총인구(명)
			</label>
		</li>
		<li><label for="avg_age"><input type="radio" name="API_0301" value="avg_age" id="avg_age" data-show-name="평균나이" data-unit="세">평균나이(세)</label></li>
		<li><label for="ppltn_dnsty"><input type="radio" name="API_0301" value="ppltn_dnsty" id="ppltn_dnsty" data-show-name="인구밀도" data-unit="명/㎢">인구밀도(명/㎢)</label></li>
		<li><label for="aged_child_idx"><input type="radio" name="API_0301" value="aged_child_idx" id="aged_child_idx" data-show-name="노령화지수" data-unit="일백명당 명">노령화지수</label></li>
		<li><label for="oldage_suprt_per"><input type="radio" name="API_0301" value="oldage_suprt_per" id="oldage_suprt_per" data-show-name="노년부양비" data-unit="일백명당 명">노년부양비</label></li>
		<li><label for="juv_suprt_per"><input type="radio" name="API_0301" value="juv_suprt_per" id="juv_suprt_per" data-show-name="유년부양비" data-unit="일백명당 명">유년부양비</label></li>
		<li><label for="tot_family"><input type="radio" name="API_0301" value="tot_family" id="tot_family" data-show-name="가구" data-unit="가구">가구(가구)</label></li>
		<li><label for="avg_fmember_cnt"><input type="radio" name="API_0301" value="avg_fmember_cnt" id="avg_fmember_cnt" data-show-name="평균 가구원" data-unit="명">평균 가구원(명)</label></li>
		<li><label for="tot_house"><input type="radio" name="API_0301" value="tot_house" id="tot_house" data-show-name="주택" data-unit="호">주택(호)</label></li>
		<li><label for="nongga_cnt"><input type="radio" name="API_0301" value="nongga_cnt" id="nongga_cnt" data-show-name="농가" data-unit="가구">농가(가구)</label></li>
		<li><label for="imga_cnt"><input type="radio" name="API_0301" value="imga_cnt" id="imga_cnt" data-show-name="임가" data-unit="가구">임가(가구)</label></li>
		<li><label for="naesuoga_cnt"><input type="radio" name="API_0301" value="naesuoga_cnt" id="naesuoga_cnt" data-show-name="내수면 어가" data-unit="가구">내수면 어가(가구)</label></li>
		<li><label for="haesuoga_cnt"><input type="radio" name="API_0301" value="haesuoga_cnt" id="haesuoga_cnt" data-show-name="해수면 어가" data-unit="가구">해수면 어가(가구)</label></li>
		<li><label for="corp_cnt"><input type="radio" name="API_0301" value="corp_cnt" id="corp_cnt" data-show-name="사업체수" data-unit="개">사업체수(전체 사업체)</label></li>
	</ul>
	<div id="ppltn">
		<h4>주요지표 조사년도(필수)</h4>
		<span class="SelectBox">
			<select name="API_0301_ppltn_year" id="API_0301_ppltn_year">
			<!--  mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가 interactive.map.js 참고 -->
			</select>
		</span>
	</div>
	<div id="corp" style="display:none;">
		<h4 class="pt15">사업체 주요지표 조사년도(필수)</h4>
		<span class="SelectBox">
			<select name="API_0301_corp_year" id="API_0301_corp_year">
			<!--  mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가 interactive.map.js 참고 -->
			</select>
		</span>
	</div>
</div>