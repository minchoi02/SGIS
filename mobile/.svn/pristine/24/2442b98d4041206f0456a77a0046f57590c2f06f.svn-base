<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div class="Detail2_2" data-id="API_0310" style="display: none;">
	<div class="TabGroup">
		<div class="tab M_on"><a href="#" class="tab-item">가구원별 상세조건</a> <a class="Info" onclick="$('#API_0310_a_INFO_BOX').show();">도움말</a></div>
		<div class="tab"><a href="#" class="tab-item">가구별 상세조건</a> <a class="Info" onclick="$('#API_0310_b_INFO_BOX').show();">도움말</a></div>
	</div>
	<div class="TabArea">
		<h4>조사년도(필수)</h4>
		<span class="SelectBox">
			<select name="API_0310_year" id="API_0310_year">
				<!--  mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가 interactive.map.js 참고 -->
			</select>
		</span>
		<h4>대상(필수)</h4>
		<ul class="List">
			<li class="Check"><label><input name="data_type" type="radio" value="1" checked="checked">농가</label></li>
			<li><label><input name="data_type" type="radio" value="2">임가</label></li>
			<li><label><input name="data_type" type="radio" value="3">해수면어가</label></li>
			<li><label><input name="data_type" type="radio" value="4">내수면어가</label></li>
		</ul>

		<h4>성별(선택) <label><input type="checkbox" data-able="3fGender" data-type="radio">선택</label></h4>
		<ul id="3fGender" class="List">
			<li class="disabled"><label><input name="API_0310_gender" type="radio" value="0" disabled="disabled">전체</label></li>
			<li class="disabled"><label><input name="API_0310_gender" type="radio" value="1" disabled="disabled">남자</label></li>
			<li class="disabled"><label><input name="API_0310_gender" type="radio" value="2" disabled="disabled">여자</label></li>
		</ul>
		
		<h4>연령(선택) <label><input type="checkbox" data-able="3fAge">선택</label></h4>
		<p id="3fAge">
			<span class="SelectBox disabled">
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
			</span>
			<span>이상&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;</span>
			<span class="SelectBox disabled">
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
			</span> 
			<span id="API_0310_age_to_label">이하</span>
		</p>
	</div>
	<div class="TabArea" style="display:none;">
		<h4>조사년도(필수)</h4>
		<span class="SelectBox">
			<select name="API_0310_year" id="API_0310_year_1">
				<!--  mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가 interactive.map.js 참고 -->
			</select>
		</span>	
		<h4>대상(필수)</h4>
		<ul class="List">
			<li class="Check"><label><input name="condition-type" type="radio" value="farm_cnt" data-api="API_0307" data-show-name="농가수" data-unit="가구" checked="checked">농가가구</label></li>
			<li><label><input name="condition-type" type="radio" value="forestry_cnt" data-api="API_0308" data-show-name="임가수" data-unit="가구">임가가구</label></li>
			<li><label><input name="condition-type" type="radio" value="fishery_cnt" data-api="API_0309" data-show-name="어가수" data-unit="가구">어가가구</label></li>
		</ul>
	</div>
</div>