<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 주택 Tab List - START -->	
	<div class="currentContent" style="display: none;" data-id="API_0306" name="API_0306_DIV" id="api0306Div">
	<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
		<div class="tit_top" style="display: flex;">
			<h2 class="tit">주택 상세검색 <button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0306_INFO_BOX');"  style="vertical-align: middle" title="주택 상세검색 설명 팝업 열기">주택 상세검색 설명 팝업 열기</button></h2>
			<button id="API_0304_popup_area_close" class="btn_popClose" type="button"></button>
		</div>
		<div class="currentHeader">  
			<span class="cap02">*조사년도(필수)</span>  
			<div class="selectbox" style="margin-right: 5px;">
				<label for="ex_select"></label>
				<select name="API_0306_year" id="API_0306_year">
				</select>
			</div>  
		</div>
		
		
		
		
		<div class="currentListWrap">
			
			<div class="List-conRow mt15"> 
				<span class="cap02">유형(선택)</span>
					<label class="selectcheck-container">
						<input type="checkbox" name="API_0306_check" data-able="house_type" data-type="checkbox">
					<span class="selectcheckmark"></span>
				</label> 
			</div> 
			<div id="house_type">
				<div class="List-conRow">
					<div class="List-ConCard disabled">
						<h2>단독주택</h2> <input name="API_0306_house_type" type="checkbox" value="01" style="visibility:hidden; width:0px; height:0px">
					</div>
					<div class="List-ConCard disabled">
						<h2>아파트</h2><input name="API_0306_house_type" type="checkbox" value="02" style="visibility:hidden; width:0px; height:0px">  
					</div> 
				</div>
	
				<div class="List-conRow">
					<div class="List-ConCard disabled">
						<h2>연립주택</h2><input name="API_0306_house_type" type="checkbox" value="03" style="visibility:hidden; width:0px; height:0px">  
					</div>
					<div class="List-ConCard disabled">
						<h2>다세대주택</h2><input name="API_0306_house_type" type="checkbox" value="04" style="visibility:hidden; width:0px; height:0px">  
					</div> 
				</div>
				
				<div class="List-conRow">
					<div class="List-ConCard disabled">
						<h2 style="word-break: keep-all;">비주거용 건물(상가, 공장, 여관 등) 내 주택</h2><input name="API_0306_house_type" type="checkbox" value="05" style="visibility:hidden; width:0px; height:0px">	<!-- 2020.09.15[한광희] 개행 수정 -->
					</div>
					<div class="List-ConCard disabled">
						<h2>주택이외의 거처</h2><input name="API_0306_house_type" type="checkbox" value="06" style="visibility:hidden; width:0px; height:0px">  
					</div> 
				</div> 
			</div>
		</div>
		
		

		<div class="currentHeader">
			<span class="cap02">건축년도(선택)</span>
			<label class="selectcheck-container" >
			  <input type="checkbox" name="c1" data-able="house_use_prid_cd">
			  <span class="selectcheckmark"></span>
			</label>
		</div>
		<div class="List-conRow mt15" id="house_use_prid_cd">
			<div class="selectbox"  style="margin-left: 10px;">
				<select name="API_0306_house_use_prid_cd" id="API_0306_house_use_prid_cd_form" disabled="disabled">
				
					<option value="20" selected>2020년</option>
					<option value="19">2019년</option>
					<option value="01">2018년</option>
					<!-- mng_e 20211021 이진호 -->
					
					<option value="02">2017년</option>
					<option value="03">2016년</option>
					<option value="04">2015년</option>
					<option value="05">2014년</option>
					<option value="06">2013년</option>
					<option value="07">2012년</option>
					<option value="08">2011년</option>
					<option value="09">2010년</option>
					<option value="10">2009년~2005년</option>
					<option value="11">2004년~2000년</option>
					<option value="12">1999년~1990년</option>
					<option value="13">1989년 ~ 1980년</option>
					<option value="14">1979년 이전</option>
					<option value="99">미상</option>
				</select>
			</div>
		</div>
		
		<div class="List-conRow mt15">
			<span class="cap02">연면적(선택)</span>
				<label class="selectcheck-container">
					<input type="checkbox" name="c1" data-able="bdspace">
					<span class="selectcheckmark"></span>
				</label> 
		</div>
		<div class="List-conRow mt15" id="bdspace">
			<div class="selectbox" style="margin-left: 5px;"> 
				<select  name="API_0306_bdspace_from" id="API_0306_bdspace_from" disabled="disabled"> 
					<option value="0" selected>0㎥</option>
					<option value="20">20㎥</option>
					<option value="40">40㎥</option>
					<option value="60">60㎥</option>
					<option value="85">85㎥</option>
					<option value="100">100㎥</option>
					<option value="130">130㎥</option>
					<option value="165">165㎥</option>
					<option value="230">230㎥</option> 
				</select>
				<label for="ex_select">초과</label>
			</div>  
			<div class="selectbox" style="margin-left: 20px;"> 
				<select name="API_0306_bdspace_to" id="API_0306_bdspace_to" disabled="disabled"> 
					<option value="20">20㎥</option>
					<option value="40">40㎥</option>
					<option value="60">60㎥</option>
					<option value="85">85㎥</option>
					<option value="100">100㎥</option>
					<option value="130">130㎥</option>
					<option value="165">165㎥</option>
					<option value="230">230㎥</option>
					<option value="300">+</option>
				</select>
				<label for="ex_select">이하</label>
			</div> 
		</div>
		<div class="sfbFooter">
			<button class="btn_search" type="button" name="nextPage" data-id="API_0306">조회</button>
		</div>
	</div>
	
<!-- 주요지표 Tab List - END -->
