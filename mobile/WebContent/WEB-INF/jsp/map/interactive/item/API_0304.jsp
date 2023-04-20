<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="Detail2_2" data-id="API_0304" style="display: none;">
	<div class="TabGroup">
		<div class="tab M_on"><a href="#" class="tab-item">산업분류검색</a> <a class="Info" onclick="$('#API_0304-b_INFO_BOX').show();">도움말</a></div>
		<div class="tab"><a href="#" class="tab-item">테마검색</a> <a class="Info" onclick="$('#API_0304-a_INFO_BOX').show();">도움말</a></div>
	</div>
	<div class="TabArea">
		<h4>조사년도(필수)</h4>
		<span class="SelectBox">
			<select name="API_0304_year" id="API_0304_year">
				<!--  mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가 interactive.map.js 참고 -->
			</select>
		</span>	
		<h4>검색항목(필수)</h4>
		<ul class="List">
			<li class="Check"><label><input type="radio" name="API_0304_1" value="corp_cnt" checked="checked" data-show-name="사업체수" data-unit="개">사업체수</label></li>
			<li><label><input type="radio" name="API_0304_1" value="tot_worker" data-show-name="종사자수" data-unit="명" id="API_0304_1_check">종사자수</label></li>
		</ul>
		<h4>산업분류(필수)</h4>
		<form id="find_search">
			<div class="FindClass">
				<button class="btn_find" type="button" onclick="$(this).next('div.FindBox').show();">분류찾기</button>
				<div class="FindBox" style="display:none;">
					<label for="keywords" class="Hidden" >검색어</label>
					<input type="text" name="keywords" id="keywords" placeholder="검색어 입력">
					<button class="find_search" type="submit">검색</button>
					<button class="find_close" type="button" onclick="$(this).parents('.FindBox').hide();">분류찾기닫기</button>
				</div>
			</div>
		</form>
		<p class="SearchPath"></p>
		<ul id="company-list" class="List NextAction">
		</ul>
	</div>
	<div class="TabArea" style="display:none;">
		<h4>검색항목(필수)</h4>
		<ul class="List">
			<li class="Check"><label><input type="radio" name="API_0304_2" value="corp_cnt" checked="checked" data-show-name="사업체수" data-unit="개">사업체수</label></li>
			<li><label><input type="radio" name="API_0304_2" value="tot_worker" data-show-name="종사자수" data-unit="명">종사자수</label></li>
		</ul>
		<h4>테마유형(필수)</h4>
		<ul class="Theme_List">
			<li class="theme-list">
				<a href="#">생활서비스</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="1001">인탱\\\</label></li>
					<li><label><input type="radio" name="theme-code" value="1002">목욕탕</label></li>
					<li><label><input type="radio" name="theme-code" value="1003">교습학원</label></li>
					<li><label><input type="radio" name="theme-code" value="1004">어학원</label></li>
					<li><label><input type="radio" name="theme-code" value="1005">예체능학원</label></li>
					<li><label><input type="radio" name="theme-code" value="1006">부동산중개업</label></li>
					<li><label><input type="radio" name="theme-code" value="1007">이발소</label></li>
					<li><label><input type="radio" name="theme-code" value="1008">미용실</label></li>
					<li><label><input type="radio" name="theme-code" value="1009">세탁소</label></li>
					<li><label><input type="radio" name="theme-code" value="1010">PC방</label></li>
					<li><label><input type="radio" name="theme-code" value="1011">노래방</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">도소매</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="2001">문구점</label></li>
					<li><label><input type="radio" name="theme-code" value="2002">서점</label></li>
					<li><label><input type="radio" name="theme-code" value="2003">편의점</label></li>
					<li><label><input type="radio" name="theme-code" value="2004">식료품점</label></li>
					<li><label><input type="radio" name="theme-code" value="2005">휴대폰점</label></li>
					<li><label><input type="radio" name="theme-code" value="2006">의류</label></li>
					<li><label><input type="radio" name="theme-code" value="2007">화장품/방향제</label></li>
					<li><label><input type="radio" name="theme-code" value="2008">철물점</label></li>
					<li><label><input type="radio" name="theme-code" value="2009">주유소</label></li>
					<li><label><input type="radio" name="theme-code" value="2010">꽃집</label></li>
					<li><label><input type="radio" name="theme-code" value="2011">슈퍼마켓</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">숙박</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="4001">호텔</label></li>
					<li><label><input type="radio" name="theme-code" value="4002">여관(모텔포함) 및 여인숙</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">음식점</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="5001">한식</label></li>
					<li><label><input type="radio" name="theme-code" value="5002">중식</label></li>
					<li><label><input type="radio" name="theme-code" value="5003">일식</label></li>
					<li><label><input type="radio" name="theme-code" value="5004">분식</label></li>
					<li><label><input type="radio" name="theme-code" value="5005">서양식</label></li>
					<li><label><input type="radio" name="theme-code" value="5006">제과점</label></li>
					<li><label><input type="radio" name="theme-code" value="5007">패스트푸드</label></li>
					<li><label><input type="radio" name="theme-code" value="5008">치킨</label></li>
					<li><label><input type="radio" name="theme-code" value="5009">호프 및 간이주점</label></li>
					<li><label><input type="radio" name="theme-code" value="5010">카페</label></li>
					<li><label><input type="radio" name="theme-code" value="5011">기타 외국식</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">교통</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="3001">지하철역</label></li>
					<li><label><input type="radio" name="theme-code" value="3002">터미널</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">공공</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="6001">우체국</label></li>
					<li><label><input type="radio" name="theme-code" value="6002">행정기관</label></li>
					<li><label><input type="radio" name="theme-code" value="6003">경찰/지구대</label></li>
					<li><label><input type="radio" name="theme-code" value="6004">소방서</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">교육</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="7001">초등학교</label></li>
					<li><label><input type="radio" name="theme-code" value="7002">중학교</label></li>
					<li><label><input type="radio" name="theme-code" value="7003">고등학교</label></li>
					<li><label><input type="radio" name="theme-code" value="7004">전문대학</label></li>
					<li><label><input type="radio" name="theme-code" value="7005">대학교</label></li>
					<li><label><input type="radio" name="theme-code" value="7006">대학원</label></li>
					<li><label><input type="radio" name="theme-code" value="7007">어린이보육원</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">기업</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="8001">제조/화학</label></li>
					<li><label><input type="radio" name="theme-code" value="8002">서비스</label></li>
					<li><label><input type="radio" name="theme-code" value="8003">통신/IT</label></li>
					<li><label><input type="radio" name="theme-code" value="8004">건설</label></li>
					<li><label><input type="radio" name="theme-code" value="8005">판매/유통</label></li>
					<li><label><input type="radio" name="theme-code" value="8006">기타금융업</label></li>
					<li><label><input type="radio" name="theme-code" value="8007">기타의료업</label></li>
					<li><label><input type="radio" name="theme-code" value="8008">문화/체육</label></li>
				</ul>
			</li>
			<li class="theme-list">
				<a href="#">편의/문화</a>
				<ul>
					<li><label><input type="radio" name="theme-code" value="9001">백화점/중대형마트</label></li>
					<li><label><input type="radio" name="theme-code" value="9002">은행</label></li>
					<li><label><input type="radio" name="theme-code" value="9003">병원</label></li>
					<li><label><input type="radio" name="theme-code" value="9004">극장/영화관</label></li>
					<li><label><input type="radio" name="theme-code" value="9005">도서관/박물관</label></li>
				</ul>
			</li>
		</ul>
	</div>
</div>
