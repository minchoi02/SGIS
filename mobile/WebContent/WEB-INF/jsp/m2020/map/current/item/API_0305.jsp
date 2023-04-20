<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 가구 Tab List - START -->	
	

	<div class="currentContent" name="API_0305_DIV" id="api0305Div" data-id="API_0305" style="display: none;">
	<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
		<div class="tit_top" style="display: flex;">
			<h2 class="tit">가구 상세검색 <button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0305_INFO_BOX');" style="vertical-align: middle" title="가구 상세검색 설명 팝업 열기">가구 상세검색 설명 팝업 열기</button></h2>
			<button id="API_0305_popup_area_close" class="btn_popClose" type="button"></button>
		</div>
		<div class="currentHeader">  
			<span class="cap02">*조사년도(필수)</span>  
			<div class="selectbox" style="margin-right: 5px;">
				<select name="API_0305_year" id="API_0305_year">
				</select>
			</div>
		</div>
		
		
		
		
		
		
		<div class="currentListWrap">
			<div class="List-conRow mt15"> 
				<span class="cap02">세대구성(선택)</span>
			 	<label class="selectcheck-container">
				  	<input type="checkbox" name="API_0305_check" data-type="checkbox" data-able="household_type">
				  	<span class="selectcheckmark"></span>
				</label> 
			</div> 
			<div id="household_type">
				<div class="List-conRow">
					<div class="List-ConCard disabled">
						<h2>1세대가구</h2> <input name="API_0305_household_type" type="checkbox" value="01" style="visibility:hidden; width:0px; height:0px"> 
					</div>
					<div class="List-ConCard disabled">
						<h2>2세대가구</h2><input name="API_0305_household_type" type="checkbox" value="02" style="visibility:hidden; width:0px; height:0px">  
					</div> 
				</div>
	
				<div class="List-conRow">
					<div class="List-ConCard disabled">
						<h2>3세대가구</h2><input name="API_0305_household_type" type="checkbox" value="03" style="visibility:hidden; width:0px; height:0px">  
					</div>
					<div class="List-ConCard disabled">
						<h2>4세대이상 가구</h2><input name="API_0305_household_type" type="checkbox" value="04" style="visibility:hidden; width:0px; height:0px">  
					</div> 
				</div>
				
				<div class="List-conRow">
					<div class="List-ConCard disabled">
						<h2>1인가구</h2><input name="API_0305_household_type" type="checkbox" value="A0" style="visibility:hidden; width:0px; height:0px">  
					</div>
					<div class="List-ConCard disabled">
						<h2>비혈연가구</h2><input name="API_0305_household_type" type="checkbox" value="B0" style="visibility:hidden; width:0px; height:0px">  
					</div> 
				</div>
			</div>
			
			
			
			
			<div id="API_0305_yaer_check" style="display:none">
				<div class="List-conRow mt15"> 
					<span class="cap02">점유형태(선택)</span>
				 	<label class="selectcheck-container">
					  	<input type="checkbox" name="API_0305_check" data-type="checkbox" data-able="ocptn_type">
					  	<span class="selectcheckmark"></span>
					</label> 
				</div> 
				<div id="ocptn_type">
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>자기집</h2><input name="API_0305_ocptn_type" type="checkbox" value="1" style="visibility:hidden; width:0px; height:0px">  
						</div>
						<div class="List-ConCard disabled">
							<h2>보증금있는 월세</h2><input name="API_0305_ocptn_type" type="checkbox" value="2" style="visibility:hidden; width:0px; height:0px">  
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>전세(월세없음)</h2><input name="API_0305_ocptn_type" type="checkbox" value="3" style="visibility:hidden; width:0px; height:0px">  
						</div>
						<div class="List-ConCard disabled">
							<h2>보증금없는 월세<input name="API_0305_ocptn_type" type="checkbox" value="4" style="visibility:hidden; width:0px; height:0px">
						</div> 
					</div>
					
					<div class="List-conRow">
						<div class="List-ConCard disabled">
							<h2>사글세</h2><input name="API_0305_ocptn_type" type="checkbox" value="5" style="visibility:hidden; width:0px; height:0px">
						</div>
						<div class="List-ConCard disabled">
							<h2 style="word-break: keep-all;">무상(관사, 사택, 친척집)</h2><input name="API_0305_ocptn_type" type="checkbox" value="6" style="visibility:hidden; width:0px; height:0px">	<!-- 2020.09.15[한광희] 개행 수정 -->
						</div> 
					</div>
				</div> 
			</div>
		</div>

		<div class="sfbFooter">
			<button class="btn_search" type="button" name="nextPage" data-id="API_0305">조회</button>
		</div>
	</div>
<!-- 주요지표 Tab List - END -->
