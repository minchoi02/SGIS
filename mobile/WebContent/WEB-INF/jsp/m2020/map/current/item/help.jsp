<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp" %>
<div id="API_0301_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">인구총조사 결과 중 주요지표에 대한 통계 조회가 가능합니다.</h2>
			<button class="help_popClose" type="button" onclick="javascript:helpPopupClose('API_0301_INFO_BOX');"></button>
			<!-- <button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0301_INFO_BOX');"></button> --> <!-- 2022.10.14 [송은미] class 명 변경-->
		</div>
		<div class="popContentBox_help" style="height: 280px;">	<!-- 2020.09.10[한광희] 개행추가로 인한 사이즈 조정 -->
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				<ul>
					<li style="word-break: keep-all;"><strong>·인구밀도</strong> : 1㎢(1㎞ Ⅹ 1㎞)면적에 거주하는 인구</li>
					<li style="word-break: keep-all;"><strong>·노령화지수</strong> : 유소년(14세 이하) 인구 1백명 당 고령(65세 이상) 인구</li>
					<li style="word-break: keep-all;"><strong>·노년부양비</strong> : 생산가능(15세 ~ 64세) 인구 1백명 당 고령(65세 이상) 인구</li>
					<li style="word-break: keep-all;"><strong>·유년부양비</strong> : 생산가능(15세 ~ 64세) 인구 1백명 당 유소년(14세 이하) 인구</li>
					<li style="word-break: keep-all;"><strong>·총부양비</strong> : 노년부양비 + 유년부양비</li>
				</ul>
				<p style="word-break: keep-all;">※ 특별조사구(해외주재공관, 교도소·소년원, 군부대, 전투경찰대, 의무소방대 등)및 외국인 제외</p>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0301_INFO_BOX');">확인</button>
			</div>
	</div>
</div>
<div id="API_0302_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">인구총조사 항목 중 상세조건 설정에 따른 인구통계 조회가 가능합니다.</h2>
			<button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0302_INFO_BOX');"></button>
		</div>
		<div class="popContentBox_help" style="height: 115px;">
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				
				<ul>
					<li style="word-break: keep-all;"><strong>·성별</strong> : 남성/여성 (필수)</li>
					<li style="word-break: keep-all;"><strong>·연령</strong> : 0세 ~ 100세 이상 (선택)</li>
					<li style="word-break: keep-all;"><strong>·교육</strong> : 미취학 ~ 박사 (선택)</li>
				</ul>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0302_INFO_BOX');">확인</button>
			</div>
	</div>
</div>
<div id="API_0304-a_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">전국사업체조사 결과 중 생활밀접업종에 대해 쉽게 통계조회가 가능합니다.</h2>
			<button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0304-a_INFO_BOX');"></button>
		</div>
		<div class="popContentBox_help" style="height: 135px;">	<!-- 2020.09.10[한광희] 개행추가로 인한 사이즈 조정 -->
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				
				<strong>·테마유형(선택)</strong>
				<ul>
					<!-- 2020.12.07[심창무] 테마유형 대분류명으로 수정 START -->
					<li style="word-break: keep-all;"><strong>-</strong> 농림어업, 기업, 소매업, 생활서비스, 교통, 여가생활, 숙박, 음식, 교육, 의료, 공공</li>
					<!-- 2020.12.07[심창무] 테마유형 대분류명으로 수정 END -->
				</ul>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0304-a_INFO_BOX');">확인</button>
			</div>
	</div>
</div>
<div id="API_0304-b_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">전국사업체조사 항목 중 산업분류에 따른 사업체통계 조회가 가능합니다.</h2>
			<button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0304-b_INFO_BOX');"></button>
		</div>
		<div class="popContentBox_help" style="height: 100px;">
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				
				<p style="word-break: keep-all;">※ 장소가 일정치 않은 개인운수(개인택시 등)업체 제외</p>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0304-b_INFO_BOX');">확인</button>
			</div>
	</div>
</div>

<div id="API_0305_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">인구총조사 항목 중 상세조건 설정에 따른 가구통계 조회가 가능합니다.</h2>
			<button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0305_INFO_BOX');"></button>
		</div>
		<div class="popContentBox_help" style="height: 225px;">
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				
				<h3>·세대구성</h3>
				
				<strong style="word-break: keep-all;">일반가구에 한하여 가구주와 그 가족의 친족관계에 따라 구분</strong>
				<ul>
					<li style="word-break: keep-all;"><strong>- 1세대가구</strong> : 부부가구, 형제자매가구 등 한세대가 가구를 구성한 경우</li>
					<li style="word-break: keep-all;"><strong>- 2세대가구</strong> : 부모를 모시고 사는 부부가구 등 두세대가 가구를 구성한 경우</li>
					<li style="word-break: keep-all;"><strong>- 3세대가구</strong> : 부모를 모시면서 자식도 같이 가구를 구성하는 경우</li>
					<li style="word-break: keep-all;"><strong>- 1인가구</strong> : 혼자서 살림하는 가구</li>
				</ul>
				
				<h3>·점유형태</h3>
				<strong style="word-break: keep-all;">일반가구에 대하여 현재 사는 집을 점유하는 형태</strong>
				<ul>
					<li style="word-break: keep-all;"><strong>- 자 기 집</strong> : 법률상 소유 여하를 불문하고 실제 거주자 소유로 되어 있는 집<br></li>
					<li style="word-break: keep-all;"><strong>- 전 세</strong> : 일정액의 현금 또는 기타 방법으로 전세금을 내고 계약기간 세 들어 사는 경우<br></li>
					<li style="word-break: keep-all;"><strong>- 보증금 있는 월세</strong> : 일정액의 보증금을 내고 매월 집세를 내는 경우<br></li>
					<li style="word-break: keep-all;"><strong>- 보증금 없는 월세</strong> : 일정액의 보증금 없이 매월 집세(또는 월세)를 내는 경우<br></li>
					<li style="word-break: keep-all;"><strong>- 사 글 세</strong> : 세입자가 집세를 한꺼번에 내고 매월 1개월분의 집세를 공제하는 경우<br></li>
					<li style="word-break: keep-all;"><strong>- 무 상</strong> : 다른 사람 소유의 건물 등을 사용하지만 임차료 등 대가를 지불하지 않는 경우<br></li>
				</ul>
				<p style="word-break: keep-all;">※ 특별조사구, 집단가구, 외국인가구 제외</p>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0305_INFO_BOX');">확인</button>
			</div>
	</div>
</div>
<div id="API_0306_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">주택총조사 항목 중 상세조건 설정에 따른 주택통계 조회가 가능합니다.</h2>
			<button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0306_INFO_BOX');"></button>
		</div>
		<div class="popContentBox_help" style="height: 240px;">
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				
				<strong>·유형</strong>
				<ul>
					<li style="word-break: keep-all;"><strong>- 단독주택</strong> : 한 가구가 생활할 수 있도록 건축된 일반 단독주택과 여러 가구가 살 수 있도록 설계된 다가구 단독주택</li>
					<li style="word-break: keep-all;"><strong>- 아 파 트</strong> : 한 건물 내에 여러 가구가 거주할 수 있도록 지은 5층 이상의 영구건물로서, 구조적으로 한 가구씩 독립하여 살 수 있도록 건축된 주택</li>
					<li style="word-break: keep-all;"><strong>- 연립주택</strong> : 한 건물 안에 여러 가구가 살 수 있도록 지은 4층 이하의 영구건물로서 건축 당시 ‘연립주택’으로 허가받은 주택</li>
					<li style="word-break: keep-all;"><strong>- 다세대 주택</strong> : 한 건물 내에 여러 가구가 살 수 있도록 건축된 4층 이하의 영구건물로서 건물의 연면적이 660㎡이하이면서 건축 당시 다세대주택으로 허가받은 주택</li>
					<li style="word-break: keep-all;"><strong>- 비거주용 건물 내 주택 </strong> : 비거주용 건물에 사람이 살되, 그 거주 부분이 주택의 요건(방, 부엌, 독립된 출입구)을 갖추고 있는 경우</li>
				</ul>
				<p style="word-break: keep-all;">※ 특별조사구, 외국인, 빈집 제외</p>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0306_INFO_BOX');">확인</button>
			</div>
	</div>
</div>
<div id="API_0310_a_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">농림어업총조사 항목 중 상세조건 설정에 따른 인구통계 조회가 가능합니다.</h2>
			<button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0310_a_INFO_BOX');"></button>
		</div>
		<div class="popContentBox_help" style="height: 195px;">	<!-- 2020.09.10[한광희] 개행추가로 인한 사이즈 조정 -->
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				
				<h3>·대상 (필수)</h3>
				<ul>
					<li style="word-break: keep-all;"><strong>-</strong> 농가, 임가, 해수면어가, 내수면어가 중 택1</li>
				</ul>
				
				<h3>·성별 (필수)</h3>
				<ul>
					<li style="word-break: keep-all;"><strong>-</strong> 전체, 남성, 여성 중 택1</li>
				</ul>
				
				<h3>·연령 (필수)</h3>
				<ul>
					<li style="word-break: keep-all;"><strong>-</strong> 가구원 나이에 대한 조건 설정</li>
				</ul>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0310_a_INFO_BOX');">확인</button>
			</div>
	</div>
</div>
<div id="API_0310_b_INFO_BOX" class="popWrap" style="display: none;"> <!-- 2020-09-03 [곽제욱] jsp 위치 이동에 따른 스타일 변경 -->
	<div class="popBox">
		<div class="popHeader">
			<h2 class="pop_Info_tit" style="word-break: keep-all;">농림어업총조사 항목 중 상세조건 설정에 따른 가구통계 조회가 가능합니다.</h2>
			<button class="btn_popClose" type="button" onclick="javascript:helpPopupClose('API_0310_b_INFO_BOX');"></button>
		</div>
		<div class="popContentBox_help" style="height: 260px;">
			<div class="popContent">
				<!-- 2020.09.10[한광희] 개행수정 START -->
				
				<h3>·대상</h3>
				<ul>
					<li style="word-break: keep-all;"><strong>- 농가</strong> : 생계, 영리, 연구를 목적으로 농업을 경영하거나 농업에 종사하는 가구</li>
					<li style="word-break: keep-all;"><strong>- 임가</strong> : 산림면적을 3ha 이상 보유하면서 지난 5년간 육림작업 실적이 있거나 지난 1년간 벌목업, 양묘업을 경영하였거나, 직접 생산한 임산물 판매대금이 120만 원 이상인 가구</li>
					<li style="word-break: keep-all;"><strong>- 어가</strong> : 지난 1년간 판매 목적으로 1개월 이상 어선어업, 마을어업, 양식어업을 직접 경영한 가구이거나, 지난 1년간 직접 잡거나 양식한 수산물을 판 금액이 120만 원 이상인 가구</li>
				</ul>
				<!-- 2020.09.10[한광희] 개행수정 END -->
			</div>
		</div> 
			<div class="popBtnBox_help">
				<button class="btn_popType3" type="button" onclick="javascript:helpPopupClose('API_0310_b_INFO_BOX');">확인</button>
			</div>
	</div>
</div>