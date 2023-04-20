//document.write("<link rel='stylesheet' type='text/css' href='/css/main_common.css'>");
//document.write("<link rel='stylesheet' type='text/css' href='/css/default.css' />");
document.write("<link rel='stylesheet' type='text/css' href='/css/common.css' />");

console.log('this.$d', this.$d);

if( typeof this.$d == "undefined" ){
	document.write("<script src='/js/plugins/durian-v2.0.js'></script>");
	document.write("<script src='/js/common/sop.portal.absAPI.js'></script>");
}

document.write("<script type='text/javascript' src='/js/plugins/jquery.placeholder.min.js'></script>");
document.write("<script type='text/javascript' src='/js/common/includeSearch.js'></script>");
document.write("<script type='text/javascript' src='/publish_2018/include/plugin/slick/slick.js'></script>");
document.write("<script type='text/javascript' src='/publish_2018/include/js/ui.js'></script>");

//msg_20200210 김건민 (SGIS My통계로 관련 추가:탭메뉴 관련 스타일 START)
document.write('<div class="util">');
document.write('    <div class="inner">');
document.write('		<div class="global_nav">');
document.write('			<ul>');

//mng_s 20201014 추후 총조사 표출시 두줄 주석처리후 아래 3줄 사용하면됨
document.write('				<li><a href="javascript:logWriteAndMove(\'A0\', \'02\', \'\', \'\', \'\', \'\', \'/view/statsMe/statsMeMain\', false);" class="tm_my3" style="background-color:#3e65b1; z-index:0; left:95px; width:130px;"></a></li>');
document.write('				<li><a href="javascript:logWriteAndMove(\'A0\', \'02\', \'08\', \'00\', \'\', \'\', \'/view/index\', false);" class="tm_sgis2" style="box-shadow:0px -3px 3px rgba(0, 0, 0, .4); z-index:10;"></a></li>');
/** 2020.09.29[한광희] 총조사시각화 메뉴 추가 START */
//document.write('				<li><a href="javascript:logWriteAndMove(\'A0\', \'02\', \'\', \'\', \'\', \'\', \'/view/statsMe/statsMeMain\', false);" class="tm_my3" style="box-shadow:0px -3px 3px rgba(0, 0, 0, .4); background-color:#3e65b1; z-index:10; left:95px; width:150px;"></a></li>');
//document.write('				<li><a href="javascript:logWriteAndMove(\'A0\', \'02\', \'08\', \'00\', \'\', \'\', \'/view/index\', false);" class="tm_sgis2" style="box-shadow:0px -3px 3px rgba(0, 0, 0, .4); z-index:20;"></a></li>');
//document.write('				<li><a href="/view/totSurv/totSurvMain" class="tm_totSurv02" style="box-shadow:0px -3px 3px rgba(0, 0, 0, .4); background-color:#3e65b1; z-index:0; left:239px; width:180px;"></a></li>');
/** 2020.09.29[한광희] 총조사시각화 메뉴 추가 END */
document.write('			</ul>');
document.write('		</div>');
document.write('		<ul class="clearFix headerEtc">');
document.write('		</ul>');
document.write('    </div>');
document.write('</div>');
//msg_20200210 김건민 (SGIS My통계로 관련 추가:탭메뉴 관련 스타일 END)

document.write('<div class="headerDiv">');
document.write('	<div class="inner">');
document.write('	    <h1><a href="javascript:logWriteAndMove(\'A0\', \'02\', \'08\', \'00\', \'\', \'\', \'/\', false);"><img src="/images/main/logo.png" alt="통계지리정보서비스"></a></h1>');
document.write('	    <div id="gnb">');
document.write('	        <ul class="clearFix">');
document.write('	            <li><a href="javascript:apiLogWrite2(\'F0\',\'F10\',\'Header 메뉴 클릭 로그\',\'통계주제도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'09\', \'01\', \'\', \'\', \'/view/thematicMap/categoryList\', false);" tabindex="11">통계주제도</a></li>');
document.write('	            <li><a href="javascript:apiLogWrite2(\'F0\',\'F20\',\'Header 메뉴 클릭 로그\',\'대화형통계지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'01\', \'\', \'\', \'/view/map/interactiveMapMain\', false);" tabindex="21">대화형 통계지도</a></li>');
document.write('	            <li><a href="javascript:apiLogWrite2(\'F0\',\'F30\',\'Header 메뉴 클릭 로그\',\'활용서비스\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'01\', \'\', \'\', \'/view/common/serviceMain\', false);" tabindex="31">활용서비스</a></li>');
document.write('	            <li><a href="javascript:apiLogWrite2(\'F0\',\'F40\',\'Header 메뉴 클릭 로그\',\'분석지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'01\', \'\', \'\', \'/view/common/analMapMain\', false);" tabindex="41">분석지도</a></li>');

// (PM)로그는 추후에 진행키로 하심. 2020.07.23
//document.write('	            <li><a href="javascript:apiLogWrite2(\'F0\',\'F*0\',\'Header 메뉴 클릭 로그\',\'자료제공\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'**\', \'01\', \'\', \'\', \'/contents/shortcut/shortcut_05_02.jsp\', false);" tabindex="51">자료제공</a></li>');
document.write('	            <li><a href="/contents/shortcut/shortcut_05_02.jsp" tabindex="51">자료제공</a></li>');

document.write('	            <li><a href="javascript:apiLogWrite2(\'F0\',\'F50\',\'Header 메뉴 클릭 로그\',\'알림마당\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'13\', \'01\', \'\', \'\', \'/view/board/sopBoardMain\', false);" tabindex="61">알림마당</a></li>');
document.write('	        </ul>');
document.write('	    </div>');
document.write('	    <div class="searchArea">');
document.write('	        <div class="inputTxt" style="display:none;">');
document.write('	            <input type="text" id="searchKeyword" placeholder="통계정보검색" onblur="$includeSearch.ui.searchHide();" onkeydown="if(event.keyCode == 13) { $includeSearch.ui.moveSearchList(); return false; }">');
document.write('	        </div>');
document.write('	        <div class="clearFix">');
document.write('	            <button type="submit" class="btn_submit" id="searchBtn" onclick="javascript:apiLogWrite2(\'F0\',\'F60\',\'Header 메뉴 클릭 로그\',\'검색\',\'00\',\'없음\');$includeSearch.ui.moveSearchList();">검색</button>');
document.write('	            <button type="button" class="btn_sizeCtr"><span class="hidden">검색창 확대/축소 버튼</span></button>');
document.write('	        </div>');
document.write('	    </div>');
document.write('	</div>');
document.write('	<div class="subMenu" style="display:none;">');
document.write('	    <div class="inner">');
document.write('	        <div class="clearFix">');
document.write('	            <ul>');
document.write('	                <li><a id="human" href="javascript:apiLogWrite2(\'F0\',\'F11\',\'Header 메뉴 클릭 로그\',\'인구와가구\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'09\', \'02\', \'\', \'\', \'/view/thematicMap/thematicMapMain?stat_thema_map_id=5FLM8BXNH320200521093949554ioKEsoOUGI&theme=CTGR_001&mapType=05\', false);" tabindex="12">인구와 가구</a></li>');
document.write('					<li><a id="house" href="javascript:apiLogWrite2(\'F0\',\'F15\',\'Header 메뉴 클릭 로그\',\'주거와교통\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'09\', \'06\', \'\', \'\', \'/view/thematicMap/thematicMapMain?stat_thema_map_id=8mjCr1kWql20201123140825772vKMjQsNcRw&theme=CTGR_002&mapType=05\', false);" tabindex="13">주거와 교통</a></li>');
document.write('					<li><a id="welfare" href="javascript:apiLogWrite2(\'F0\',\'F12\',\'Header 메뉴 클릭 로그\',\'복지와문화\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'09\', \'03\', \'\', \'\', \'/view/thematicMap/thematicMapMain?stat_thema_map_id=sFKoutEowH20201208140301610JputqDxrrK&theme=CTGR_003&mapType=13\', false);" tabindex="14">복지와 문화</a></li>');
document.write('					<li><a id="work" href="javascript:apiLogWrite2(\'F0\',\'F13\',\'Header 메뉴 클릭 로그\',\'노동과경제\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'09\', \'04\', \'\', \'\', \'/view/thematicMap/thematicMapMain?stat_thema_map_id=njAEQxrh8y20191024164715457m1pHpdrBMn&theme=CTGR_004&mapType=03\', false);" tabindex="15">노동과 경제</a></li>');
document.write('					<li><a id="fit" href="javascript:apiLogWrite2(\'F0\',\'F14\',\'Header 메뉴 클릭 로그\',\'건강과안전\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'09\', \'05\', \'\', \'\', \'/view/thematicMap/thematicMapMain?stat_thema_map_id=wPsSdFX8Wt20210520161423833UZjHClj5U3&theme=CTGR_005&mapType=05\', false);" tabindex="16">건강과 안전</a></li>');
document.write('					<li><a id="envi" href="javascript:apiLogWrite2(\'F0\',\'F16\',\'Header 메뉴 클릭 로그\',\'환경과기후\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'09\', \'07\', \'\', \'\', \'/view/thematicMap/thematicMapMain?stat_thema_map_id=RZ3pr7Maou20201106160851389D0RGtYCGpW&theme=CTGR_006&mapType=05\', false);" tabindex="17">환경과 기후</a></li>');
document.write('	            </ul>');
document.write('	            <ul>');
document.write('	                <li><a id="mainDex" href="javascript:apiLogWrite2(\'F0\',\'F27\',\'Header 메뉴 클릭 로그\',\'총조사주요지표\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'02\', \'\', \'\', \'/view/map/interactiveMap/mainIndexView\', false);" tabindex="22">총조사 주요지표</a></li>');
document.write('					<li><a id="popHouse" href="javascript:apiLogWrite2(\'F0\',\'F28\',\'Header 메뉴 클릭 로그\',\'인구주택총조사\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'03\', \'\', \'\', \'/view/map/interactiveMap/populationHouseView\', false);" tabindex="23">인구주택총조사</a></li>');
document.write('					<li><a id="3fv" href="javascript:apiLogWrite2(\'F0\',\'F25\',\'Header 메뉴 클릭 로그\',\'농림어업총조사\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'04\', \'\', \'\', \'/view/map/interactiveMap/3fView\', false);" tabindex="24">농림어업총조사</a></li>');
document.write('					<li><a id="comp" href="javascript:apiLogWrite2(\'F0\',\'F24\',\'Header 메뉴 클릭 로그\',\'전국사업체조사\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'05\', \'\', \'\', \'/view/map/interactiveMap/companyView\', false);" tabindex="25">전국사업체조사</a></li>');
document.write('					<li><a id="ecountry" href="javascript:apiLogWrite2(\'F0\',\'F27\',\'Header 메뉴 클릭 로그\',\'e-지방지표\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'09\', \'\', \'\', \'/view/map/interactiveMap/ecountryView\', false);" tabindex="26">e-지방지표</a></li>');
document.write('					<li><a id="pubData" href="javascript:apiLogWrite2(\'F0\',\'F29\',\'Header 메뉴 클릭 로그\',\'공공데이터\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'07\', \'\', \'\', \'/view/map/interactiveMap/publicDataView\', false);" tabindex="27">공공데이터</a></li>');
document.write('					<li><a id="uData" href="javascript:apiLogWrite2(\'F0\',\'F2A\',\'Header 메뉴 클릭 로그\',\'나의데이터\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'10\', \'08\', \'\', \'\', \'/view/map/interactiveMap/userDataView\', false);" tabindex="28">나의 데이터</a></li>');
document.write('	            </ul>');
document.write('	            <ul>');
document.write('					<li><a id="catchmentArea" href="javascript:apiLogWrite2(\'F0\',\'F57\',\'Header 메뉴 클릭 로그\',\'생활권역 통계지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'09\', \'\', \'\', \'/view/catchmentArea/main\', false);" tabindex="40">생활권역 통계지도</a></li>');
document.write('					<li><a id="MyTGR" href="javascript:apiLogWrite2(\'F0\',\'F63\',\'Header 메뉴 클릭 로그\',\'My통계로\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'09\', \'\', \'\', \'\', false);call_another(\'/view/statsMe/statsMeMain\');" tabindex="32">My통계로</a></li>');
document.write('					<li><a id="workRoad" href="javascript:apiLogWrite2(\'F0\',\'F62\',\'Header 메뉴 클릭 로그\',\'일자리맵\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'02\', \'\', \'\', \'/view/workRoad/main\', false);" tabindex="33">일자리 맵</a></li>');
document.write('					<li><a id="static" href="javascript:apiLogWrite2(\'F0\',\'F56\',\'Header 메뉴 클릭 로그\',\'정책통계지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'03\', \'\', \'\', \'/view/map/policyStaticMap\', false);" tabindex="34">정책통계지도</a></li>');
document.write('					<li><a id="houseAnal" href="javascript:apiLogWrite2(\'F0\',\'F34\',\'Header 메뉴 클릭 로그\',\'살고싶은우리동네\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'04\', \'\', \'\', \'/view/house/houseAnalysisMap\', false);" tabindex="35">살고싶은 우리동네</a></li>');
document.write('					<li><a id="bizMap" href="javascript:apiLogWrite2(\'F0\',\'F61\',\'Header 메뉴 클릭 로그\',\'업종통계지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'05\', \'\', \'\', \'/view/bizStats/bizStatsMap?biz=0\', false);" tabindex="36">업종통계지도</a></li>');
document.write('					<li><a id="comIntro" href="javascript:apiLogWrite2(\'F0\',\'F35\',\'Header 메뉴 클릭 로그\',\'지역현안소통지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'06\', \'\', \'\', \'/view/community/intro\', false);" tabindex="37">지역현안 소통지도</a></li>');
document.write('					<li><a id="statexp" href="javascript:apiLogWrite2(\'F0\',\'F33\',\'Header 메뉴 클릭 로그\',\'통계지도체험\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'07\', \'\', \'\', \'/statexp/index.html\', false);" tabindex="38">통계지도체험</a></li>');
document.write('					<li><a id="gallery" href="javascript:apiLogWrite2(\'F0\',\'F57\',\'Header 메뉴 클릭 로그\',\'통계갤러리\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'11\', \'08\', \'\', \'\', \'/view/gallery/resultGallery\', false);" tabindex="39">통계갤러리</a></li>');
document.write('	            </ul>');
document.write('	            <ul>');
document.write('					<li><a id="urban" href="javascript:apiLogWrite2(\'P0\',\'F42\',\'Header 메뉴 클릭 로그\',\'도시화 분석 지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'08\', \'\', \'\', \'/view/urban/main\', false);" tabindex="47">도시화 분석 지도</a><span class="subNewLabel">N</span></li>');
document.write('					<li><a id="admSurv" href="javascript:apiLogWrite2(\'P0\',\'F42\',\'Header 메뉴 클릭 로그\',\'행정통계 시각화 지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'09\', \'\', \'\', \'/view/administStats/newlyDash\', false);" tabindex="41">행정통계 시각화 지도</a><span class="subNewLabel">N</span></li>');
document.write('					<li><a id="catchmentArea" href="javascript:apiLogWrite2(\'F0\',\'F57\',\'Header 메뉴 클릭 로그\',\'총조사 시각화 지도\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'07\', \'\', \'\', \'/view/totSurv/totSurvMain\', false);" tabindex="40">총조사 시각화 지도</a></li>');
document.write('					<li><a id="staMonth" href="javascript:apiLogWrite2(\'F0\',\'F42\',\'Header 메뉴 클릭 로그\',\'월간통계\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'02\', \'\', \'\', \'/funny_month/month/sta_month_main.do\', false);" tabindex="42">월간통계</a></li>');	
document.write('					<li><a id="pyra" href="javascript:apiLogWrite2(\'F0\',\'F44\',\'Header 메뉴 클릭 로그\',\'인구피라미드\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'03\', \'\', \'\', \'/jsp/pyramid/pyramid1.jsp\', false);" tabindex="43">인구피라미드</a></li>');
document.write('					<li><a id="pubModel" href="javascript:apiLogWrite2(\'F0\',\'F43\',\'Header 메뉴 클릭 로그\',\'고령화현황보기\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'04\', \'\', \'\', \'/publicsmodel/\', false);" tabindex="44">고령화 현황보기</a></li>	');
document.write('					<li><a id="statbdFam" href="javascript:apiLogWrite2(\'F0\',\'F45\',\'Header 메뉴 클릭 로그\',\'성씨분포\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'05\', \'\', \'\', \'/statbd/family_01.vw\', false);" tabindex="45">성씨분포</a></li>');
document.write('					<li><a id="statbdFuture" href="javascript:apiLogWrite2(\'F0\',\'F41\',\'Header 메뉴 클릭 로그\',\'지방의변화보기\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'12\', \'06\', \'\', \'\', \'/statbd/future_01.vw\', false);" tabindex="46">지방의 변화보기</a></li>');
document.write('	            </ul>');
//(PM)로그는 추후에 진행키로 하심. 2020.07.23
//document.write('	            <ul>');
//document.write('					<li><a id="sc0501" href="javascript:apiLogWrite2(\'F0\',\'F*1\',\'Header 메뉴 클릭 로그\',\'자료제공소개\'  ,\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'**\', \'02\', \'\', \'\', \'/contents/shortcut/shortcut_05_02.jsp\', false);" tabindex="52">자료제공 소개</a></li>');	
//document.write('					<li><a id="sc0502" href="javascript:apiLogWrite2(\'F0\',\'F*2\',\'Header 메뉴 클릭 로그\',\'자료제공목록\'  ,\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'**\', \'03\', \'\', \'\', \'/contents/shortcut/shortcut_05.jsp\', false);" tabindex="53">자료제공 목록</a></li>');
//document.write('					<li><a id="sc0503" href="javascript:apiLogWrite2(\'F0\',\'F*3\',\'Header 메뉴 클릭 로그\',\'자료신청\'      ,\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'**\', \'04\', \'\', \'\', \'/contents/shortcut/shortcut_05_03_step01.jsp\', false);" tabindex="54">자료신청</a></li>	');
//document.write('					<li><a id="sc0504" href="javascript:apiLogWrite2(\'F0\',\'F*4\',\'Header 메뉴 클릭 로그\',\'신청내역\'      ,\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'**\', \'05\', \'\', \'\', \'/contents/shortcut/shortcut_05_01.jsp\', false);" tabindex="55">신청자료 다운로드</a></li>');
//document.write('					<li><a id="sc0505" href="javascript:apiLogWrite2(\'F0\',\'F*5\',\'Header 메뉴 클릭 로그\',\'지방의변화보기\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'**\', \'06\', \'\', \'\', \'/contents/shortcut/shortcut_05_03_01.jsp\', false);" tabindex="56">신청내역</a></li>');
//document.write('	            </ul>');
document.write('	            <ul>');
document.write('					<li><a id="sc0501" href="/contents/shortcut/shortcut_05_02.jsp" tabindex="52">자료제공 소개</a></li>');	
document.write('					<li><a id="sc0502" href="/contents/shortcut/shortcut_05.jsp" tabindex="53">자료제공 목록</a></li>');
document.write('					<li><a id="sc0503" href="/contents/shortcut/shortcut_05_03_step01.jsp" tabindex="54">자료신청</a></li>	');
document.write('					<li><a id="sc0504" href="/contents/shortcut/shortcut_05_01.jsp" tabindex="55">신청자료 다운로드</a></li>');
document.write('					<li><a id="sc0505" href="/contents/shortcut/shortcut_05_03_01.jsp" tabindex="56">신청내역</a></li>');
document.write('	            </ul>');

document.write('	            <ul>');
document.write('	                <li><a id="sopIn" href="javascript:apiLogWrite2(\'F0\',\'F51\',\'Header 메뉴 클릭 로그\',\'SGIS플러스소개\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'13\', \'02\', \'\', \'\', \'/view/board/sopIntro01\', false);" tabindex="62">SGIS플러스 소개</a></li>');
document.write('					<li><a id="ean" href="javascript:apiLogWrite2(\'F0\',\'F52\',\'Header 메뉴 클릭 로그\',\'설명과공지\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'13\', \'03\', \'\', \'\', \'/view/board/expAndNotice\', false);" tabindex="63">설명과 공지</a></li>');
document.write('					<li><a id="eanotl" href="javascript:apiLogWrite2(\'F0\',\'F$5\',\'Header 메뉴 클릭 로그\',\'자료시점현황\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'13\', \'04\', \'\', \'\', \'/view/board/expAndNoticeOfferTableList\', false);" tabindex="64">자료 시점 현황</a></li>');
document.write('					<li><a id="qar" href="javascript:apiLogWrite2(\'F0\',\'F53\',\'Header 메뉴 클릭 로그\',\'질문과개선요청\',\'00\',\'없음\');logWriteAndMove(\'A0\', \'02\', \'13\', \'05\', \'\', \'\', \'/view/board/qnaAndRequestFaq\', false);" tabindex="65">질문과 개선요청</a></li>');
document.write('	            </ul>');
document.write('	        </div>');
document.write('	    </div>');
document.write('	</div>');
document.write('</div>');


var AuthInfo; // 세션정보
if (!AuthInfo) {
	AuthInfo = {
		authStatus : false
	};
}

//--------------------------------------------------- 개발서버 -------------------------------------------------------------------------
var statsPotalDomain = window.location.origin;
statsPotalDomain = (function () {
	var origin = window.location.origin;
	if (origin === undefined) {
		origin = window.location.protocol;
		origin += '\/\/';
		origin += window.location.host;
		window.location.origin = origin;
	}
	return origin;
})();

$(document).ready(function () {
	var frame = "<iframe id='authFrame' src='' width='0' height='0' frameborder='0'></iframe>";  //sso
	frame += "<iframe id='logoutFrame' src='' width='0' height='0' frameborder='0'></iframe>";   //로그아웃
	frame += "<iframe id='registerFrame' src='' width='0' height='0' frameborder='0'></iframe>"; //회원가입
	frame += "<iframe id='sessionCheck' name='sessionCheck' width='0' height='0' style='border:0px;' title='세션체크'></iframe>"; //세션체크

	$("footer").append(frame);

	if (window.attachEvent) {
		window.attachEvent("onmessage", receiveMessage);
	}else {
		window.addEventListener("message", receiveMessage);
	}

	$("#authFrame").attr("src", "/html/authorization/getAuth.jsp");
	$("#sessionCheck").attr("src", "//kosis.kr/oneid/auth/oneidAllLogout.jsp");

	$("#secret1").click(function(){
		return false;
//		$('head').append('<script type="text/javascript" src="/js/common/common.js"></script>');
	});
	
	if( !$class("sop.portal.logoutDeveloper.api") ){
		$class("sop.portal.logoutDeveloper.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res) {
			},
			onFail : function (status) {
			}
		});
	}
	
	/** ********* API 호출 로그 Start ********* */
	if( !$class("sop.portal.apiLogWrite.api") ){
		$class("sop.portal.apiLogWrite.api").extend(sop.portal.absAPI).define({
			onBlockUIPopup : function(){},
			onSuccess : function (status, res) {
			},
			onFail : function (status) {
			}
		});
	}
	
	if( $class("sop.portal.member.api") ){
		$class("sop.portal.member.api").extend(sop.portal.absAPI).define({
			onBlockUIPopup : function(){},
			onSuccess : function (status, res) {
			},
			onFail : function (status) {
			}
		});
	}
	
});

//연관검색 화면으로 이동
function moveSearchList() {
	var val = jQuery("#searchKeyword").val();
	var arrayKey = val.split(" ");
	if(val == "") {
		messageAlert.open("알림", "검색어를 입력하세요.");
	} else {
		window.location.href = "/view/common/searchList?searchKeyword=" + val;
	}
}

function logCntAndMoveUrl(url, type, api_id, api_title, api_parameter, api_zoomLevel, api_adm_nm){
	jQuery.ajax({
		type:"POST",
		url: "/ServiceAPI/common/APILogWrite.json",
		data:{	"type": "D3",
			"api_id" : type,
			"title" : api_title,
			"parameter" : api_parameter,
			"zoomLevel" : api_zoomLevel,
			"adm_nm" : api_adm_nm
		},
		async: true,
		success:function(data){ 
		},
		error:function(data) {
		}
	});

	if("N" != url){
		window.location.href = url;
	}

}
 
//http 주소 치환 2016.11.28 
//if(location.protocol == 'http:'){
//	location.href = location.href.replace('http:','https:');
//}

/** ********* 회원가입 Start ********* */
function memberRegister(curUrl) {
	var frame = document.getElementById("registerFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberRegister();
}
/** ********* 회원가입 End ********** */
/** ********* 기존/통합로그인 선택 Start ********* */
function goSelectLogin(curUrl) {
	if (curUrl == undefined ||  curUrl.length == 0) {
		curUrl = "/view/index";
	}
	
	if (curUrl.indexOf("thematicMap") != -1) {
		window.parent.location.href = "/view/member/login_new?returnPage=" + encodeURI(curUrl);
	}else {
		window.location.href = "/view/member/login_new?returnPage=" + encodeURI(curUrl);
	}
}
/** ********* 기존/통합로그인 선택 End ********* */
/** ********* 로그아웃 Start ********* */
function memberLogout(curUrl) {
	if (curUrl == undefined ||  curUrl.length == 0) {
		curUrl = "/view/index";
	}
	logoutCurUrl =  curUrl;

	//기존회원일 경우, 개발자사이트 로그아웃
	logoutDeveloperProcess();
	
	//통합회원/기존회원 체크필요
	//통합회원일 경우
	var frame = document.getElementById("logoutFrame");
	var doc = frame.contentWindow || frame.contentDocument;
	doc.reqMemberLogout(curUrl);
}

function logoutDeveloperProcess () {
	var sopPortalLogoutDeveloperObj = new sop.portal.logoutDeveloper.api();
	sopPortalLogoutDeveloperObj.request({
		method : "POST",
		async : false,
		url : "/ServiceAPI/member/logout.json"
	});
}

//Timstamp 만드는 함수
function makeStamp (d) { // Date d
	var y = d.getFullYear(), M = d.getMonth() + 1, D = d.getDate(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), ss = d.getMilliseconds(),

	pad = function (x) {
		x = x + '';
		if (x.length === 1) {
			return '0' + x;
		}
		return x;
	};
	return y + pad(M) + pad(D) + pad(h) + pad(m) + pad(s) + pad(ss);
}

/** APILog 추가 김종현 20151124 start**/
function apiLogWrite2(type, api_id, title, parameter, zoomLevel, adm_nm) {
	var sopPortalAPILogWriteObj = new sop.portal.apiLogWrite.api();
	sopPortalAPILogWriteObj.addParam("type", type);
	sopPortalAPILogWriteObj.addParam("api_id", api_id);
	sopPortalAPILogWriteObj.addParam("title", title);
	sopPortalAPILogWriteObj.addParam("parameter", encodeURIComponent(parameter));
	sopPortalAPILogWriteObj.addParam("zoomLevel", zoomLevel);
	sopPortalAPILogWriteObj.addParam("adm_nm", adm_nm);
	sopPortalAPILogWriteObj.request({
		method : "POST",
		async : true,
		url : "/ServiceAPI/common/APILogWrite.json"
	});
}

//세션받아오기
function setSession (auth) {
	AuthInfo = auth;
	var html = "";
	var curLogoutUrl = "view/index";
	var curLoginUrl = location.href.replace('http:', '');//.replace(statsPotalDomain, '');
	if( curLoginUrl ){
		curLoginUrl = curLoginUrl.split("?")[0];
	}
	
	if (auth.authStatus) {
		html += "<li><a href='/jsp/english/index.jsp' tabindex='10'>English</a></li>";
		html += "<li><a href='/edu/jsp/main.jsp' tabindex='4'>SGIS에듀</a></li>";
		html += "<li><a href='/developer/html/main.html' tabindex='5'  target='_self'>개발지원센터</a></li>"; //개발지원센터 개편으로 url 변경
		html += "<li><a href='/view/newhelp/us_help_50_0' tabindex='6'>사이트맵</a></li>";
		html += "<li><a href='/view/newhelp/us_help_10_0' tabindex='7'>도움말</a></li>";
		html += "<li><a href='/view/mypage/mypage' tabindex='8'>마이페이지</a></li>";
		html += "<li><a href='javascript:memberLogout();' tabindex='9'>로그아웃</a></li>";
	}
	else {
		html += "<li><a href='/jsp/english/index.jsp' tabindex='10'>English</a></li>";
		html += "<li><a href='/edu/jsp/main.jsp' tabindex='4'>SGIS에듀</a></li>";
		html += "<li><a href='/developer/html/main.html' tabindex='5' target='_self'>개발지원센터</a></li>"; //개발지원센터 개편으로 url 변경
		html += "<li><a href='/view/newhelp/us_help_50_0' tabindex='6'>사이트맵</a></li>";
		html += "<li><a href='/view/newhelp/us_help_10_0' tabindex='7'>도움말</a></li>";
		html += "<li><a href='javascript:memberRegister();' tabindex='8'>회원가입</a></li>";
		html += "<li><a title='\"자료신청 및 대화형 통계지도의 나의 데이터, 개발지원센터의 체험하기\" 서비스 이용시 로그인이 필요합니다.' href='javascript:goSelectLogin(\""+curLoginUrl+"\");' tabindex='9'>로그인</a></li>";
	}

	$(".headerEtc").html(html);
	
	$('.headerEtc a').unbind().bind("click",function(){
		var title = 'Header 메뉴 클릭 로그';
		var zoomLevel = '00'; 
		var adm_nm = '없음';
		var headerEtc = $(this).text();
		if(headerEtc == '회원가입'){
			apiLogWrite2('F0', 'F00', title, headerEtc, zoomLevel, adm_nm);			
		}else if(headerEtc == '로그인'){
			apiLogWrite2('F0', 'F01', title, headerEtc, zoomLevel, adm_nm);
		}else if(headerEtc == '사이트맵'){
			apiLogWrite2('F0', 'F02', title, headerEtc, zoomLevel, adm_nm);
		}else if(headerEtc == '도움말'){
			apiLogWrite2('F0', 'F03', title, headerEtc, zoomLevel, adm_nm);
		}else if(headerEtc == '개발지원센터'){
		apiLogWrite2('F0', 'F04', title, headerEtc, zoomLevel, adm_nm);
		}
	});
	
	// 함수 존재유무 판단
	if ($.isFunction(window.getSession)) {
		// 호출 페이지에 getSession 함수가 있으면 호출
		getSession(auth);
	}
}

function receiveMessage( e ){
	if( e.data === "closed" && e.origin === "https://kosis.kr" ){
		alert("30분동안 미사용으로 로그아웃되었습니다.");
		memberLogout();
	}
}

// 2020.09.01 이금은 추가
function call_another(url){
	window.location.href =  window.location.protocol+"//"+window.location.host + url;
}
