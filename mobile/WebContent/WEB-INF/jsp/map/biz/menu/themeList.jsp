<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<!-- 업종밀집도변화 -->
<div id="${tabId }" class="list-style biz_select${tabId=='current-state'?'1':'2' }" style="${tabId=='current-state'?'':'display: none;' }">
	<div class="stepBox">
		<a href="javascript:void(0)" class="roundTextBox" style="background:#fff url(/mobile/resources/images/house/icon_box_arrow_bottom.png) no-repeat 95% center">음식점(11종)</a>
		<div class="joinDefault">
			<ul class="jobArea_stepBox">
				<li class="Check">
					<input type="radio" id="${tabId }_5001" name="theme_${tabId }" value="5001" checked="checked">
					<label for="${tabId }_5001">한식</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5002" name="theme_${tabId }" value="5002">
					<label for="${tabId }_5002">중식</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5003" name="theme_${tabId }" value="5003">
					<label for="${tabId }_5003">일식</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5004" name="theme_${tabId }" value="5004">
					<label for="${tabId }_5004">분식</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5005" name="theme_${tabId }" value="5005">
					<label for="${tabId }_5005">서양식</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5006" name="theme_${tabId }" value="5006">
					<label for="${tabId }_5006">제과점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5007" name="theme_${tabId }" value="5007">
					<label for="${tabId }_5007">패스트푸드</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5008" name="theme_${tabId }" value="5008">
					<label for="${tabId }_5008">치킨</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5009" name="theme_${tabId }" value="5009">
					<label for="${tabId }_5009">호프 및 간이주점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5010" name="theme_${tabId }" value="5010">
					<label for="${tabId }_5010">카페</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_5011" name="theme_${tabId }" value="5011">
					<label for="${tabId }_5011">기타 외국식</label>
				</li>
			</ul>
		</div>
		<a href="javascript:void(0)" class="roundTextBox">도소매(11종)</a>
		<div class="joinDefault" style="display: none;">
			<ul class="jobArea_stepBox">
				<li>
					<input type="radio" id="${tabId }_2001" name="theme_${tabId }" value="2001">
					<label for="${tabId }_2001">문구점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2002" name="theme_${tabId }" value="2002">
					<label for="${tabId }_2002">서점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2003" name="theme_${tabId }" value="2003">
					<label for="${tabId }_2003">편의점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2004" name="theme_${tabId }" value="2004">
					<label for="${tabId }_2004">식료품점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2005" name="theme_${tabId }" value="2005">
					<label for="${tabId }_2005">휴대폰점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2006" name="theme_${tabId }" value="2006">
					<label for="${tabId }_2006">의류</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2007" name="theme_${tabId }" value="2007">
					<label for="${tabId }_2007">화장품/방향제</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2008" name="theme_${tabId }" value="2008">
					<label for="${tabId }_2008">철물점</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2009" name="theme_${tabId }" value="2009">
					<label for="${tabId }_2009">주유소</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2010" name="theme_${tabId }" value="2010">
					<label for="${tabId }_2010">꽃집</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_2011" name="theme_${tabId }" value="2011">
					<label for="${tabId }_2011">슈퍼마켓</label>
				</li>
			</ul>
		</div>
		<a href="javascript:void(0)" class="roundTextBox">서비스(11종)</a>
		<div class="joinDefault" style="display: none;">
			<ul class="jobArea_stepBox">
				<li>
					<input type="radio" id="${tabId }_1001" name="theme_${tabId }" value="1001">
					<label for="${tabId }_1001">인테리어</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1002" name="theme_${tabId }" value="1002">
					<label for="${tabId }_1002">목욕탕</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1003" name="theme_${tabId }" value="1003">
					<label for="${tabId }_1003">교습학원</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1004" name="theme_${tabId }" value="1004">
					<label for="${tabId }_1004">어학원</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1005" name="theme_${tabId }" value="1005">
					<label for="${tabId }_1005">예체능학원</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1006" name="theme_${tabId }" value="1006">
					<label for="${tabId }_1006">부동산중개업</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1007" name="theme_${tabId }" value="1007">
					<label for="${tabId }_1007">이발소</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1008" name="theme_${tabId }" value="1008">
					<label for="${tabId }_1008">미용실</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1009" name="theme_${tabId }" value="1009">
					<label for="${tabId }_1009">세탁소</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1010" name="theme_${tabId }" value="1010">
					<label for="${tabId }_1010">PC방</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_1011" name="theme_${tabId }" value="1011">
					<label for="${tabId }_1011">노래방</label>
				</li>
			</ul>
		</div>
		<a href="javascript:void(0)" class="roundTextBox">숙박(3종)</a>
		<div class="joinDefault" style="display: none;">
			<ul class="jobArea_stepBox">
				<li>
					<input type="radio" id="${tabId }_001" name="theme_${tabId }" value="4001">
					<label for="${tabId }_001">호텔</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_002" name="theme_${tabId }" value="4002">
					<label for="${tabId }_002">여관(모텔포함) 및 여인숙</label>
				</li>
				<li>
					<input type="radio" id="${tabId }_003" name="theme_${tabId }" value="4003">
					<label for="${tabId }_002">팬션</label>
				</li>
			</ul>
		</div>
	</div>
</div>