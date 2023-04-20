<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 인구 Tab List - START -->	
	
	<div class="currentContent" style="display: none;" data-id="API_0302" name="API_0302_DIV" id="api0302Div" style="">
		<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
		<div class="tit_top" style="display: flex;">
			<h2 class="tit">인구 상세검색 <button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0302_INFO_BOX');" style="vertical-align: middle" title="인구 상세검색 설명 팝업 열기">인구 상세검색 설명 팝업 열기</button></h2>
			<button id="API_0302_popup_area_close" class="btn_popClose" type="button"></button>
		</div>
		<div class="currentHeader">  
			<span class="cap02">*조사년도(필수)</span>   
			<div id="ppltn" class="selectbox" style="margin-right: 5px;">
				<label for="ex_select"></label> 
				<select name="API_0302_year" id="API_0302_year">
				</select>
			</div>
		</div>  
		<div class="currentListWrap">
			<div class="List-conRow mt15"> 
				<span class="cap02">*성별(필수)</span>
			</div>
			
			<!-- <div class="List-conRow mt15">
				<div class="List-ConCardFull ">
					<h2>전체</h2><input name="API_0302_gender" type="radio" value="0" checked="checked" style="visibility:hidden">  
				</div> 
			</div> -->
			
			<div class="List-conRow">
				<div class="List-ConCard on">
					<h2>전체</h2><input name="API_0302_gender" type="radio" value="0" checked="checked" style="visibility:hidden">  
				</div>
				<div class="List-ConCard">
					<h2>남자</h2><input name="API_0302_gender" type="radio" value="1" style="visibility:hidden">  
				</div>
				<div class="List-ConCard">
					<h2>여자</h2><input name="API_0302_gender" type="radio" value="2" style="visibility:hidden">  
				</div> 
			</div>
			
			<div class="List-conRow mt15">
				 <span class="cap02">연령(선택)</span>
					 <label class="selectcheck-container">
					  <input type="checkbox" name="c1" data-able="populationAge">
					  <span class="selectcheckmark"></span>
					  
					</label> 
			</div>
			
			<div class="List-conRow mt15" id="populationAge">
				<div class="selectbox" style="margin-left: 5px;">
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
				</div>
				<span style="margin-left: 5px;">이상&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;</span>	<!-- 2020.09.07[한광희] 간격 조정 -->
				<div class="selectbox" style="margin-left: 5px;">
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
				</div>
				<span id="API_0302_age_to_label" style="margin-left: 5px;">이하</span>	<!-- 2020.09.07[한광희] 간격 조정 -->
			</div>	
			
				
			<div id="API_0302_yaer_check" style="display:none">
				<div class="List-conRow mt15">
					 <span class="cap02">교육정도(선택)</span>
						 <label class="selectcheck-container">
						  <input type="checkbox" data-able="edu_level" data-type="checkbox" name="API_0302_check">
						  <span class="selectcheckmark"></span>
						  
						</label> 
				</div>
				<div id="edu_level">
					<div class="List-conRow">
						<div class="List-ConCard disabled">	<!-- 2020.09.15[한광희] 중복 class 삭제 -->
							<h2>수학없음</h2><input name="API_0302_edu_level" type="checkbox" value="1" style="visibility:hidden; width:0px; height:0px">
						</div>
						<div class="List-ConCard disabled">	<!-- 2020.09.15[한광희] 중복 class 삭제 -->
							<h2>초등학교</h2><input name="API_0302_edu_level" type="checkbox" value="2" style="visibility:hidden; width:0px; height:0px">  
						</div> 
					</div>
		
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>중학교</h2><input name="API_0302_edu_level" type="checkbox" value="3" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div>
						<div class="List-ConCard disabled">
							<h2>고등학교</h2><input name="API_0302_edu_level" type="checkbox" value="4" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>전문학사</h2><input name="API_0302_edu_level" type="checkbox" value="5" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div>
						<div class="List-ConCard disabled">
							<h2>학사</h2><input name="API_0302_edu_level" type="checkbox" value="6" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>석사</h2><input name="API_0302_edu_level" type="checkbox" value="7" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div>
						<div class="List-ConCard disabled">
							<h2>박사</h2><input name="API_0302_edu_level" type="checkbox" value="8" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div> 
					</div> 
				</div>
				
				<div class="List-conRow mt15">
					 <span class="cap02">혼인상태(선택)</span>
						 <label class="selectcheck-container">
						  <input type="checkbox" data-able="mrg_state" data-type="checkbox" name="API_0302_check">
						  <span class="selectcheckmark"></span>
						  
						</label> 
				</div>
				<div id="mrg_state">
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>미혼</h2><input name="API_0302_mrg_state" type="checkbox" value="1" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div>
						<div class="List-ConCard disabled">
							<h2>이혼</h2><input name="API_0302_mrg_state" type="checkbox" value="4" disabled="disabled" style="visibility:hidden; width:0px; height:0px">
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>기혼</h2><input name="API_0302_mrg_state" type="checkbox" value="2" disabled="disabled" style="visibility:hidden; width:0px; height:0px">
						</div>
						<div class="List-ConCard disabled">
							<h2>사별</h2><input name="API_0302_mrg_state" type="checkbox" value="3" disabled="disabled" style="visibility:hidden; width:0px; height:0px">  
						</div> 
					</div> 
	  			</div>
  			</div>
		</div>
		
		
		<div class="sfbFooter">
			<button class="btn_search" type="button" name="nextPage" data-id="API_0302">조회</button>
		</div>
	</div>

<!-- 주요지표 Tab List - END -->
