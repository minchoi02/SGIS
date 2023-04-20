<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 주요지표 Tab List - START -->	
	
	<div class="currentContent" style="display: block;" data-id="API_0301" name="API_0301_DIV" id="api0301Div">
		<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 -->
		<div class="tit_top" style="display: flex;">
			<h2 class="tit">주요지표 상세검색 <button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0301_INFO_BOX');" style="vertical-align: middle" title="주요지표 상세검색 설명 팝업 열기">주요지표 상세검색 설명 팝업 열기</button></h2> 
			<button id="API_0301_popup_area_close" class="btn_popClose" type="button"></button>
		</div>
		<!-- <div class="currentHeader">  
			<span class="cap02">*검색항목(필수)</span>  
		</div> -->
<!-- 		<div class="currentHeader">   
			<span class="cap02">*주요지표조사년도</span>
			<div id="ppltn" class="selectbox" style="margin-right: 5px;">
				<label for="ex_select"></label> 
				<select name="API_0301_ppltn_year" id="API_0301_ppltn_year">
				</select>
			</div>
			
			<div id="corp" class="selectbox" style="display:none; margin-right: -25px;">
				<span class="cap02">사업체 주요지표 조사년도(필수)</span>
				<label for="ex_select"></label> 
				<select name="API_0301_corp_year" id="API_0301_corp_year">
				</select>
			</div>
		</div> -->
		<!-- 2022-10-14 [송은미] 테마검색 년도 추가 -->
		<div class="currentHeader">   
			<span class="cap02">*주요지표조사년도</span>
			<div id="ppltn" class="selectbox" style="margin-right: 5px;">
				<label for="ex_select"></label> 
				<select name="API_0301_ppltn_year" id="API_0301_ppltn_year">
				</select>
			</div>
		</div>
		<div class="currentHeader"> 
			<span class="cap02">*사업체 주요지표 조사년도</span>  
				<div class="selectbox" style="margin-right: 5px;">
					<label for="ex_select"></label> 
					<select name="API_0301_corp_year" id="API_0301_corp_year">
					</select>
				</div>
		</div>
		
		<div class="currentListWrap">
		
			<div class="List-conRow">
				<div class="List-ConCard on">
					<h2 style="word-break: keep-all;">총인구(명)</h2> <input type="radio" name="API_0301" checked="checked" value="tot_ppltn" id="tot_ppltn" data-show-name="총인구" data-unit="명" style="visibility:hidden; width:0px; height:0px">
				</div>
				<div class="List-ConCard">
					<h2>평균나이(세)</h2><input type="radio" name="API_0301" value="avg_age" id="avg_age" data-show-name="평균나이" data-unit="세" style="visibility:hidden; width:0px; height:0px">  
				</div> 
			</div>

			<div class="List-conRow">
				<div class="List-ConCard">
					<h2>인구밀도(명/㎢)</h2><input type="radio" name="API_0301" value="ppltn_dnsty" id="ppltn_dnsty" data-show-name="인구밀도" data-unit="명/㎢" style="visibility:hidden; width:0px; height:0px">  
				</div>
				<div class="List-ConCard">
					<h2>노령화지수</h2><input type="radio" name="API_0301" value="aged_child_idx" id="aged_child_idx" data-show-name="노령화지수" data-unit="일백명당 명" style="visibility:hidden; width:0px; height:0px">  
				</div> 
			</div>
			
			<div class="List-conRow">
				<div class="List-ConCard">
					<h2>노년부양비</h2><input type="radio" name="API_0301" value="oldage_suprt_per" id="oldage_suprt_per" data-show-name="노년부양비" data-unit="일백명당 명" style="visibility:hidden; width:0px; height:0px">  
				</div>
				<div class="List-ConCard">
					<h2>유년부양비</h2><input type="radio" name="API_0301" value="juv_suprt_per" id="juv_suprt_per" data-show-name="유년부양비" data-unit="일백명당 명" style="visibility:hidden; width:0px; height:0px">  
				</div> 
			</div>
			
			<div class="List-conRow">
				<div class="List-ConCard">
					<h2>가구(가구)</h2><input type="radio" name="API_0301" value="tot_family" id="tot_family" data-show-name="가구" data-unit="가구" style="visibility:hidden; width:0px; height:0px">  
				</div>
				<div class="List-ConCard">
					<h2>평균 가구원(명)</h2><input type="radio" name="API_0301" value="avg_fmember_cnt" id="avg_fmember_cnt" data-show-name="평균 가구원" data-unit="명" style="visibility:hidden; width:0px; height:0px">  
				</div> 
			</div>
			
			<div class="List-conRow">
				<div class="List-ConCard">
					<h2>주택(호)</h2><input type="radio" name="API_0301" value="tot_house" id="tot_house" data-show-name="주택" data-unit="호" style="visibility:hidden; width:0px; height:0px">  
				</div>
				<div class="List-ConCard">
					<h2>농가(가구)</h2><input type="radio" name="API_0301" value="nongga_cnt" id="nongga_cnt" data-show-name="농가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
				</div> 
			</div>
			
			<div class="List-conRow">
				<div class="List-ConCard">
					<h2>임가(가구)</h2><input type="radio" name="API_0301" value="imga_cnt" id="imga_cnt" data-show-name="임가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
				</div>
				<div class="List-ConCard">
					<h2>내수면 어가(가구)</h2><input type="radio" name="API_0301" value="naesuoga_cnt" id="naesuoga_cnt" data-show-name="내수면 어가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">  
				</div> 
			</div>
			
			<div class="List-conRow">
				<div class="List-ConCard">
					<h2>해수면 어가(가구)</h2><input type="radio" name="API_0301" value="haesuoga_cnt" id="haesuoga_cnt" data-show-name="해수면 어가" data-unit="가구" style="visibility:hidden; width:0px; height:0px">
				</div>
				<div class="List-ConCard">
					<h2 style="word-break: keep-all;">사업체 수(전체 사업체)</h2>	<!-- 2020.09.15[한광희] 개행 수정 -->
					<input type="radio" name="API_0301" value="corp_cnt" id="corp_cnt" data-show-name="사업체수" data-unit="개" style="visibility:hidden; width:0px; height:0px">  
				</div> 
			</div>  
		</div>
		
		
		<div class="sfbFooter">
			<button class="btn_search" type="button" name="nextPage"  data-id="API_0301">조회</button>
		</div>
	</div>
<!-- 주요지표 Tab List - END -->
