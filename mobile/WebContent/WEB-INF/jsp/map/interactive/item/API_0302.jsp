<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div class="Detail2_2" data-id="API_0302" style="display:none;">
	<a class="Info Title" onclick="$('#API_0302_INFO_BOX').show();">도움말</a>
	<h4>조사년도(필수)</h4>
	<span class="SelectBox">
		<select name="API_0302_year" id="API_0302_year">
  	  		<!--  mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가 interactive.map.js 참고 -->
		</select>
	</span>
	<h4>성별(필수)</h4>
	<ul class="List">
		<li class="Check" style="width: 96%"><label><input name="API_0302_gender" type="radio" value="0" checked="checked">전체</label></li>
		<li><label><input name="API_0302_gender" type="radio" value="1">남자</label></li>
		<li><label><input name="API_0302_gender" type="radio" value="2">여자</label></li>
	</ul>
	<h4>연령(선택) <label><input type="checkbox" data-able="populationAge">선택</label></h4>
	<p id="populationAge">
		<span class="SelectBox disabled">
			<select name="API_0302_age_from" id="API_0302_age_from" disabled="disabled">
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
			<select name="API_0302_age_to"  id="API_0302_age_to"  disabled="disabled">
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
		<span id="API_0302_age_to_label">이하</span>
	</p>
	<div id="API_0302_yaer_check" style="display:none">
		<h4>교육정도(선택) <label><input type="checkbox" data-able="edu_level" data-type="checkbox" name="API_0302_check">선택</label></h4>
		<ul id="edu_level" class="List">
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="1" disabled="disabled">수학없음</label></li>
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="2" disabled="disabled">초등학교</label></li>
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="3" disabled="disabled">중학교</label></li>
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="4" disabled="disabled">고등학교</label></li>
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="5" disabled="disabled">전문학사</label></li>
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="6" disabled="disabled">학사</label></li>
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="7" disabled="disabled">석사</label></li>
			<li class="disabled"><label><input name="API_0302_edu_level" type="checkbox" value="8" disabled="disabled">박사</label></li>
		</ul>
		<h4>혼인상태(선택) <label><input type="checkbox" data-able="mrg_state" data-type="checkbox" name="API_0302_check">선택</label></h4>
		<ul id="mrg_state" class="List">
			<li class="disabled"><label><input name="API_0302_mrg_state" type="checkbox" value="1" disabled="disabled">미혼</label></li>
			<li class="disabled"><label><input name="API_0302_mrg_state" type="checkbox" value="4" disabled="disabled">이혼</label></li>
			<li class="disabled"><label><input name="API_0302_mrg_state" type="checkbox" value="2" disabled="disabled">기혼</label></li>
			<li class="disabled"><label><input name="API_0302_mrg_state" type="checkbox" value="3" disabled="disabled">사별</label></li>
		</ul>
	</div>
</div>
