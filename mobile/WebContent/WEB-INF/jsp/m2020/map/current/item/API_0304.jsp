<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 사업체 Tab List - START -->	
<style>
.currentListWrap0304 { overflow-y:auto; height:calc(100vh - 220px); }
.sfbFooter3 { 
	border-top:1px solid #d5d5d5;
	height: 50px;
	padding:10px 0;
    width: 100%;
    margin: 0 auto;
    position: fixed;
    text-align: center;
    font-size: 12px; 
    left:0px; bottom:0px;

}

.sfbFooter3 .btn_search { margin:0; }
</style>	
	<div class="currentContent" data-id="API_0304" name="API_0304_DIV" id="api0304Div" style="display:none;">
		<div class="tit_top" style="display: flex;">
			<h2 class="tit">사업체 상세검색</h2>
			<button id="API_0304_popup_area_close" class="btn_popClose" type="button"></button>
		</div>
		<div class="currentListWrap currentListWrap0304">
		<!-- Swiper -->
			<!-- 2022.12.12 swiper 삭제 및 css 수정 -->
			<!-- <div class="swiper-container gallery-thumbstxt" style="height: 48px;" id="API0304_Opt" > 
					<div class="swiper-wrapper" style="margin-bottom: 15px; background-color:#fff;">
				<div class="gallery-thumbstxt" style="height: 48px;" id="API0304_Opt" >
					<div class="" style="margin-bottom: 15px; background-color:#fff;"> -->
			<div class="gallery-thumbstxt" style="display: block;" id="API0304_Opt" >
				<div class="" style="background-color:#fff; display: flex;">
				
					<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 START -->
					<div class="tabDataboardtxt current" id="industry">
						<!-- <p><a href="#">산업분류검색</a><button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0304-b_INFO_BOX');" title="산업분류검색 설명 팝업 열기">산업분류검색 설명 팝업 열기</button></p> -->
						<p><a href="#">산업분류검색</a><button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0304-b_INFO_BOX');" title="산업분류검색 설명 팝업 열기"></button></p>
					</div>
					<div class="tabDataboardtxt" id="thema">
						<!-- <p><a href="#">테마검색</a><button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0304-a_INFO_BOX');" title="테마검색 설명 팝업 열기">테마검색 설명 팝업 열기</button></p> -->
						<p><a href="#">테마검색</a><button class="currentMap_moreInfo" type="button" onclick="javascript:helpPopup('API_0304-a_INFO_BOX');" title="테마검색 설명 팝업 열기"></button></p>
					</div>
					<!-- 2020.09.11[신예리] 웹접근성 문제로 인한 text 추가 END -->
					 
				</div>
			</div>
			
			<div class="gallery-top" style="min-height: 100%; overflow: auto;">
						
				<div class="TabArea" style="min-height: 720px;" id="industry_serch_div">
					<div class="gridWrap02" style="padding-top: 0;">
						<div class="currentHeader mt15">  
							<span class="cap02">*조사년도(필수)</span>  
							<div class="selectbox" style="margin-left: 10px;">
								<label for="ex_select"></label> 
									<select name="API_0304_year" id="API_0304_year">
									</select>
								</select>
							</div>  
						</div> 
						
						<!-- <div class="currentHeader"> -->
						<div class="currentHeader mt15"> 
							<span class="cap02">*대상(필수)</span> 
						</div>
						
						<div class="List-conRow mt15">
							<div class="List-ConCard on">
								<h2>사업체수</h2><input type="radio" name="API_0304_1" value="corp_cnt" checked="checked" data-show-name="사업체수" data-unit="개" style="width:0px; height:0px"> 
							</div>
							<div class="List-ConCard">
								<h2>종사자수</h2><input type="radio" name="API_0304_1" value="tot_worker" data-show-name="종사자수" data-unit="명" id="API_0304_1_check" style="width:0px; height:0px">  
							</div> 
						</div>
						
						<div class="currentHeader"> 
							<span class="cap02">*산업분류(필수)</span>
							
							<button tyle="button" class="itemSearchToggle" id="itemSearchToggle">분류찾기</a> 
						</div>
						
						<div class="industrySearchBar" id="itemSearchList" style="display:none">
							<form class="search-result" id="find_search">
								<label for="keywords" class="Hidden" >검색어</label>
								<input type="text" id="search-bar02" name="keywords" placeholder="검색어 입력">
								<a href="#"><img class="search-icon" onclick="$('#find_search').submit();" src="/mobile/resources/m2020/images/main/search_rnb.png"></a>
								</div>
							</form>
						</div>
						
						<p class="SearchPath"></p>
						
						<!-- 각 뎁스 선택 영역 START -->						
						<div class="List-conRow mt10" style="display: block;">
							<ul class="itemSearchList">
								<!-- <li id="depth1" class="on"><span class="on">1</span><p></p></li>
								<li id="depth2"><span>2</span><p></p></li>
								<li id="depth3"><span>3</span><p></p></li>
								<li id="depth4"><span>4</span><p></p></li> -->
							</ul>
						</div>
						<!-- 각 뎁스 선택 영역 END --> 
						
						<!-- 각 뎁스별 선택시 사업체 출력영역 반복 START -->
						<div id="company-list">
				
						</div>
						<!-- 각 뎁스별 선택시 사업체 출력영역 END --> 
						</div>
						<div class="TabArea" style="display:none;" id="thema_serch_div">
					
					<div class="gridWrap02" style="padding-top: 0;">
						<!-- 2022-10-14 [송은미] 테마검색 년도 추가 -->						
						<div class="currentHeader mt15"> 
							<span class="cap02">*조사년도(필수)</span>  
								<div class="selectbox" style="margin-left: 10px;">
									<label for="ex_select"></label> 
									<select name="API_0304_year_theme" id="API_0304_year_theme">
									</select>
								</div>
						</div>
						<!-- <div class="currentHeader"> -->
						<div class="currentHeader mt15">		  
							<span class="cap02">*대상(필수)</span> 
						</div> 
						
						<div class="List-conRow mt15">
							<div class="List-ConCard on">
								<h2>사업체수</h2><input type="radio" name="API_0304_2" value="corp_cnt" checked="checked" data-show-name="사업체수" data-unit="개" style="width:0px; height:0px;">
							</div>
							<div class="List-ConCard"><input type="radio" name="API_0304_2" value="tot_worker" data-show-name="종사자수" data-unit="명" style="width:0px; height:0px;">
								<h2>종사자수</h2>  
							</div> 
						</div>
						
						<div class="currentHeader"> 
							<span class="cap02">*테마유형(필수)</span> 
						</div>
						<!-- 현행에는 검색 기능  x  -->
					<!-- 	<div id="itemSearchList"> 
								<form class="search-result">
									<input type="text" id="search-bar02" placeholder="검색어 입력">
									<a href="#"><img class="search-icon" src="/mobile/resources/m2020/images/main/search_rnb.png"></a>
								</form>
								</div> -->
								<!-- 2020.12.01[심창무] 테마코드 명칭변경 및 재정렬 START -->
						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>농림어업</h2>
								<button type="button" class="itemDropboxBtn" value="0" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon0" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>농업</h2><input type="radio" name="theme-code" value="A001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>임업</h2><input type="radio" name="theme-code" value="A002" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>어업</h2><input type="radio" name="theme-code" value="A003" style="width:0px; height:0px;">
								</div>
							</div>
							 
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>기업</h2>
								<button type="button" class="itemDropboxBtn" value="1" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon1" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>제조/화학</h2><input type="radio" name="theme-code" value="8001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>서비스</h2><input type="radio" name="theme-code" value="8002" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>통신/IT</h2><input type="radio" name="theme-code" value="8003" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>건설</h2><input type="radio" name="theme-code" value="8004" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>판매/유통</h2><input type="radio" name="theme-code" value="8005" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>기타금융업</h2><input type="radio" name="theme-code" value="8006" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>문화/체육</h2><input type="radio" name="theme-code" value="8008" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>전기/가스/수도</h2><input type="radio" name="theme-code" value="B001" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>환경</h2><input type="radio" name="theme-code" value="B002" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>방송/미디어</h2><input type="radio" name="theme-code" value="B003" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>연구개발</h2><input type="radio" name="theme-code" value="B004" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>협회 및 단체</h2><input type="radio" name="theme-code" value="B005" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>광업</h2><input type="radio" name="theme-code" value="B006" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>운송</h2><input type="radio" name="theme-code" value="B007" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>소매업</h2>
								<button type="button" class="itemDropboxBtn" value="2" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon2" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>인테리어</h2><input type="radio" name="theme-code" value="1001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>문구점</h2><input type="radio" name="theme-code" value="2001" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>서점</h2><input type="radio" name="theme-code" value="2002" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>편의점</h2><input type="radio" name="theme-code" value="2003" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>식료품점</h2><input type="radio" name="theme-code" value="2004" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>휴대폰점</h2><input type="radio" name="theme-code" value="2005" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>의류</h2><input type="radio" name="theme-code" value="2006" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>화장품/방향제</h2><input type="radio" name="theme-code" value="2007" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>철물점</h2><input type="radio" name="theme-code" value="2008" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>주유소</h2><input type="radio" name="theme-code" value="2009" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>꽃집</h2><input type="radio" name="theme-code" value="2010" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>슈퍼마켓</h2><input type="radio" name="theme-code" value="2011" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>백화점/중대형마트</h2><input type="radio" name="theme-code" value="9001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>가구</h2><input type="radio" name="theme-code" value="C001" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>가전제품</h2><input type="radio" name="theme-code" value="C002" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>통신판매</h2><input type="radio" name="theme-code" value="C003" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>신발</h2><input type="radio" name="theme-code" value="C004" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>생활서비스</h2>
								<button type="button" class="itemDropboxBtn" value="3" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon3" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>목욕탕</h2><input type="radio" name="theme-code" value="1002" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>이발소</h2><input type="radio" name="theme-code" value="1007" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>부동산중개업</h2><input type="radio" name="theme-code" value="1006" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>미용실</h2><input type="radio" name="theme-code" value="1008" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>세탁소</h2><input type="radio" name="theme-code" value="1009" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>은행</h2><input type="radio" name="theme-code" value="9002" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>생활용품임대</h2><input type="radio" name="theme-code" value="D001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>독서실</h2><input type="radio" name="theme-code" value="D002" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>생활용품수리</h2><input type="radio" name="theme-code" value="D003" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>카센터</h2><input type="radio" name="theme-code" value="D004" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>피부/미용</h2><input type="radio" name="theme-code" value="D005" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>마사지</h2><input type="radio" name="theme-code" value="D006" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>택배/배달</h2><input type="radio" name="theme-code" value="D007" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>교통</h2>
								<button type="button" class="itemDropboxBtn" value="4" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon4" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>지하철역</h2><input type="radio" name="theme-code" value="3001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>터미널</h2><input type="radio" name="theme-code" value="3002" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>여가생활</h2>
								<button type="button" class="itemDropboxBtn" value="5" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon5" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>PC방</h2><input type="radio" name="theme-code" value="1010" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>노래방</h2><input type="radio" name="theme-code" value="1011" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>극장/영화관</h2><input type="radio" name="theme-code" value="9004" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>도서관/박물관</h2><input type="radio" name="theme-code" value="9005" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>생활체육시설</h2><input type="radio" name="theme-code" value="F001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>여행사</h2><input type="radio" name="theme-code" value="F002" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>숙박</h2>
								<button type="button" class="itemDropboxBtn" value="6" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon6" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>호텔</h2><input type="radio" name="theme-code" value="4001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>여관(모텔포함) 및 여인숙</h2><input type="radio" name="theme-code" value="4002" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>펜션</h2><input type="radio" name="theme-code" value="4003" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>민박</h2><input type="radio" name="theme-code" value="G001" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>음식</h2>
								<button type="button" class="itemDropboxBtn" value="7" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon7" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>한식</h2><input type="radio" name="theme-code" value="5001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>중식</h2><input type="radio" name="theme-code" value="5002" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>일식</h2><input type="radio" name="theme-code" value="5003" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>분식</h2><input type="radio" name="theme-code" value="5004" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>서양식</h2><input type="radio" name="theme-code" value="5005" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>제과점</h2><input type="radio" name="theme-code" value="5006" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>패스트푸드</h2><input type="radio" name="theme-code" value="5007" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>치킨</h2><input type="radio" name="theme-code" value="5008" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>호프/간이주점</h2><input type="radio" name="theme-code" value="5009" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>카페</h2><input type="radio" name="theme-code" value="5010" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>기타 외국식</h2><input type="radio" name="theme-code" value="5011" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>교육</h2>
								<button type="button" class="itemDropboxBtn" value="8" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon8" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>교습학원</h2><input type="radio" name="theme-code" value="1003" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>어학원</h2><input type="radio" name="theme-code" value="1004" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>예체능학원</h2><input type="radio" name="theme-code" value="1005" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>초등학교</h2><input type="radio" name="theme-code" value="7001" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>중학교</h2><input type="radio" name="theme-code" value="7002" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>고등학교</h2><input type="radio" name="theme-code" value="7003" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>전문대학</h2><input type="radio" name="theme-code" value="7004" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>대학교</h2><input type="radio" name="theme-code" value="7005" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>대학원</h2><input type="radio" name="theme-code" value="7006" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>어린이보육업</h2><input type="radio" name="theme-code" value="7007" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>기술직업훈련</h2><input type="radio" name="theme-code" value="I001" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>의료</h2>
								<button type="button" class="itemDropboxBtn" value="9" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon9" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>병원</h2><input type="radio" name="theme-code" value="9003" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>동물병원</h2><input type="radio" name="theme-code" value="J001" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>약국</h2><input type="radio" name="theme-code" value="J002" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>한방병원</h2><input type="radio" name="theme-code" value="J003" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>기타의료업</h2><input type="radio" name="theme-code" value="8007" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

						<div class="List-conRow">
							<div class="List-ConCardFull">
								<h2>공공</h2>
								<button type="button" class="itemDropboxBtn" value="10" id="itemDropboxBtn" ></button>
							</div>
						</div>
						<div id="itemDropCon10" style="display: none;">
							<div class="List-conRow mt15">
								<div class="List-ConCard">
									<h2>우체국</h2><input type="radio" name="theme-code" value="6001" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>행정기관</h2><input type="radio" name="theme-code" value="6002" style="width:0px; height:0px;">
								</div>
							</div>
							<div class="List-conRow">
								<div class="List-ConCard">
									<h2>경찰/지구대</h2><input type="radio" name="theme-code" value="6003" style="width:0px; height:0px;">
								</div>
								<div class="List-ConCard">
									<h2>소방서</h2><input type="radio" name="theme-code" value="6004" style="width:0px; height:0px;">
								</div>
							</div>
						</div>

								<!--
								생활서비스
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>생활서비스</h2>
										<button type="button" class="itemDropboxBtn" value="0" id="itemDropboxBtn" ></button>
									</div> 
								</div>
								<div id="itemDropCon0" style="display: none;">
									<div class="List-conRow mt15">
										<div class="List-ConCard">
											<h2>인테리어</h2><input type="radio" name="theme-code" value="1001" style="width:0px; height:0px;"> 
										</div>
										<div class="List-ConCard">	
											<h2>목욕탕</h2><input type="radio" name="theme-code" value="1002" style="width:0px; height:0px;">  
										</div>
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>교습학원</h2><input type="radio" name="theme-code" value="1003" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>어학원</h2><input type="radio" name="theme-code" value="1004" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>예체능학원</h2><input type="radio" name="theme-code" value="1005" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>부동산중개업</h2><input type="radio" name="theme-code" value="1006" style="width:0px; height:0px;">  
										</div>

									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>이발소</h2><input type="radio" name="theme-code" value="1007" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>미용실</h2><input type="radio" name="theme-code" value="1008" style="width:0px; height:0px;">  
										</div>
										 
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>세탁소</h2><input type="radio" name="theme-code" value="1009" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>PC방</h2><input type="radio" name="theme-code" value="1010" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>노래방</h2><input type="radio" name="theme-code" value="1011" style="width:0px; height:0px;">  
										</div> 
									</div>
								</div>
								
								 도소매
								 <div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>도소매</h2>
										<button type="button" class="itemDropboxBtn" value="1" id="itemDropboxBtn"></button>
									</div> 
								</div>
								
								<div id="itemDropCon1" style="display: none;">
									<div class="List-conRow mt15">
										<div class="List-ConCard">
											<h2>문구점</h2><input type="radio" name="theme-code" value="2001" style="width:0px; height:0px;"> 
										</div>
										<div class="List-ConCard">	
											<h2>서점</h2><input type="radio" name="theme-code" value="2002" style="width:0px; height:0px;">  
										</div>
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>편의점</h2><input type="radio" name="theme-code" value="2003" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>식료품점</h2><input type="radio" name="theme-code" value="2004" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>휴대폰점</h2><input type="radio" name="theme-code" value="2005" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>의류</h2><input type="radio" name="theme-code" value="2006" style="width:0px; height:0px;">  
										</div>

									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>화장품/방향제</h2><input type="radio" name="theme-code" value="2007" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>철물점</h2><input type="radio" name="theme-code" value="2008" style="width:0px; height:0px;">  
										</div>
										 
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>주유소</h2><input type="radio" name="theme-code" value="2009" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>꽃집</h2><input type="radio" name="theme-code" value="2010" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>슈퍼마켓</h2><input type="radio" name="theme-code" value="2011" style="width:0px; height:0px;">  
										</div> 
									</div>
								</div>
								
								숙박			
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>숙박</h2>
										<button type="button" class="itemDropboxBtn" value="2" id="itemDropboxBtn"></button>
									</div> 
								</div>
								<div id="itemDropCon2" style="display: none;">
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>호텔</h2><input type="radio" name="theme-code" value="4001" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>여관(모텔포함) 및 여인숙</h2><input type="radio" name="theme-code" value="4002" style="width:0px; height:0px;">  
										</div>								
									</div>
								</div>
								
								음식점
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>음식점</h2>
										<button type="button" class="itemDropboxBtn" value="3" id="itemDropboxBtn"></button>
									</div> 
								</div>
								<div id="itemDropCon3" style="display: none;">
									<div class="List-conRow mt15">
										<div class="List-ConCard">
											<h2>한식</h2><input type="radio" name="theme-code" value="5001" style="width:0px; height:0px;"> 
										</div>
										<div class="List-ConCard">	
											<h2>중식</h2><input type="radio" name="theme-code" value="5002" style="width:0px; height:0px;">  
										</div>
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>일식</h2><input type="radio" name="theme-code" value="5003" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>분식</h2><input type="radio" name="theme-code" value="5004" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>서양식</h2><input type="radio" name="theme-code" value="5005" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>제과점</h2><input type="radio" name="theme-code" value="5006" style="width:0px; height:0px;">  
										</div>

									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>패스트푸드</h2><input type="radio" name="theme-code" value="5007" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>치킨</h2><input type="radio" name="theme-code" value="5008" style="width:0px; height:0px;">  
										</div>
										 
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>호프 및 간이주점</h2><input type="radio" name="theme-code" value="5009" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>카페</h2><input type="radio" name="theme-code" value="5010" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>기타 외국식</h2><input type="radio" name="theme-code" value="5011" style="width:0px; height:0px;">  
										</div> 
									</div>
								</div>
								
								
								교통
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>교통</h2>
										<button type="button" class="itemDropboxBtn" value="4" id="itemDropboxBtn"></button>
									</div> 
								</div>
								<div id="itemDropCon4" style="display: none;">
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>지하철역</h2><input type="radio" name="theme-code" value="3001" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>터미널</h2><input type="radio" name="theme-code" value="3002" style="width:0px; height:0px;">  
										</div>								
									</div>
								</div>
								
								공공
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>공공</h2>
										<button type="button" class="itemDropboxBtn" value="5" id="itemDropboxBtn"></button>
									</div> 
								</div>
								<div id="itemDropCon5" style="display: none;">
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>우체국</h2><input type="radio" name="theme-code" value="6001" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>행정기관</h2><input type="radio" name="theme-code" value="6002" style="width:0px; height:0px;">  
										</div>								
									</div>
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>경찰/지구대</h2><input type="radio" name="theme-code" value="6003" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>소방서</h2><input type="radio" name="theme-code" value="6004" style="width:0px; height:0px;">  
										</div>								
									</div>
								</div>
								
								교육
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>교육</h2>
										<button type="button" class="itemDropboxBtn" value="6" id="itemDropboxBtn"></button>
									</div> 
								</div>
								<div id="itemDropCon6" style="display: none;">
									<div class="List-conRow mt15">
										<div class="List-ConCard">
											<h2>초등학교</h2><input type="radio" name="theme-code" value="7001" style="width:0px; height:0px;"> 
										</div>
										<div class="List-ConCard">	
											<h2>중학교</h2><input type="radio" name="theme-code" value="7002" style="width:0px; height:0px;">  
										</div>
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>고등학교</h2><input type="radio" name="theme-code" value="7003" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>전문대학</h2><input type="radio" name="theme-code" value="7004" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>대학교</h2><input type="radio" name="theme-code" value="7005" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>대학원</h2><input type="radio" name="theme-code" value="7006" style="width:0px; height:0px;">  
										</div>

									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>어린이보육원</h2><input type="radio" name="theme-code" value="7007" style="width:0px; height:0px;">  
										</div> 
									</div>
								</div>
								
								
								기업
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>기업</h2>
										<button type="button" class="itemDropboxBtn"value="7" id="itemDropboxBtn"></button>
									</div> 
								</div>
								<div id="itemDropCon7" style="display: none;">
									<div class="List-conRow mt15">
										<div class="List-ConCard">
											<h2>제조/화학</h2><input type="radio" name="theme-code" value="8001" style="width:0px; height:0px;"> 
										</div>
										<div class="List-ConCard">	
											<h2>서비스</h2><input type="radio" name="theme-code" value="8002" style="width:0px; height:0px;">  
										</div>
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>통신/IT</h2><input type="radio" name="theme-code" value="8003" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>건설</h2><input type="radio" name="theme-code" value="8004" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>판매/유통</h2><input type="radio" name="theme-code" value="8005" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>기타금융업</h2><input type="radio" name="theme-code" value="8006" style="width:0px; height:0px;">  
										</div>

									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>기타의료업</h2><input type="radio" name="theme-code" value="8007" style="width:0px; height:0px;">  
										</div> 
										<div class="List-ConCard">
											<h2>문화/체육</h2><input type="radio" name="theme-code" value="8008" style="width:0px; height:0px;">  
										</div> 
									</div>
								</div>
								
								
								편의/문화
								<div class="List-conRow">
									<div class="List-ConCardFull">
										<h2>편의/문화</h2>
										<button type="button" class="itemDropboxBtn" value="8" id="itemDropboxBtn"></button>
									</div> 
								</div>
								<div id="itemDropCon8" style="display: none;">
									<div class="List-conRow mt15">
										<div class="List-ConCard">
											<h2>백화점/중대형마트</h2><input type="radio" name="theme-code" value="8001" style="width:0px; height:0px;"> 
										</div>
										<div class="List-ConCard">	
											<h2>은행</h2><input type="radio" name="theme-code" value="8002" style="width:0px; height:0px;">  
										</div>
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>병원</h2><input type="radio" name="theme-code" value="8003" style="width:0px; height:0px;">  
										</div>
										<div class="List-ConCard">
											<h2>극장/영화관</h2><input type="radio" name="theme-code" value="8004" style="width:0px; height:0px;">  
										</div>
										
									</div>
									
									<div class="List-conRow">
										<div class="List-ConCard">
											<h2>도서관/박물관</h2><input type="radio" name="theme-code" value="8005" style="width:0px; height:0px;">  
										</div> 
									</div>
							</div> -->
							<!-- 2020.12.01[심창무] 테마코드 명칭변경 및 재정렬 START -->
						</div>
					</div>
					</div>	
				
			</div>	
			<div class="sfbFooter3">
				<button class="btn_search" type="button" name="nextPage"  data-id="API_0304">조회</button>
			</div>
		</div>
		
		
<!-- 사업체검색 Tab List - END -->
