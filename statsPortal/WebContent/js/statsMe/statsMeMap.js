/**
 * My통계로 (지도)
 * 
 * history : 
 * 2019.08.08	김남민	최초작성
 * 
 * 
 * author : 김남민
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$statsMeMap = W.$statsMeMap || {};

	$(document).ready(function() {
		//지도 생성
		$statsMeMap.ui.createMap("statsMeMapMap");
		
		//데이터 보드 열기(기본값)
		$statsMeMap.ui.dataBoardToggle(true);
		
		//페이지 이벤트
		$statsMeMap.event.setUIEvent();
		
		//툴팁 설정
		$("#statsMeMap [title]:not([disabled])").tooltip();
	});

	$statsMeMap.ui = {
		//페이지
		callCount : 0, //페이지 호출 횟수
		pageLoadMapMoveYn : "N",
		pageLoadMapMoveX : 0,
		pageLoadMapMoveY : 0,
		pageLoadMapMoveZoom : 1,
		
		//지도
		map : null,
		markers : null,
		markerList : null,
		mapId : makeStamp(new Date()),
		mapObj : null, // 위성, 일반, 백지도 선택 버튼
		zoomObj : null, // 확대 축소 버튼
		baseTileLayer : null,
		targetTileLayer : null,
		namespace : "statsMeMap",
		mapCenterDefalut : [ 1039674, 1818313 ], // 기존 [ 989674, 1818313 ] 에서 살짝 왼쪽으로 옮김
		mapFirstMoveYn : "N", // 카테고리 조회 시 맵 처음 이동 여부
		mapMoveEventYn : "N", // 맵 이동 이벤트 사용 여부
		mapMoveEventYn2 : "N", // 맵 이동 이벤트 사용 여부 (마커 클러스터에서 사용함)
		mapMoveEventDelay : 200, // 맵 이동 이벤트 사용 막은 후 다시 사용하게 할 시간 (1/1000초)
		heatMapPolygonCode : "",
		poiMapPolygonCode : "",
		
		//데이터
		mapData : null,
		mapStatsData : {}, // 통계정보 저장
		mapRegionData : {}, // 지역경계 저장
		mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
		mapType : "", // 지도유형 color, bubble, heat, poi, grid
		
		//보고서
		reportPopup : null,
		
		//대화형 통계지도 > e-지방지표 API 정보
		ecountryMapping : {
			//2020-02-19 [김남민] e-지방지표 현행화
			PH0005:{list_id:'109',tbl_id:'DT_1YL20921',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'재정자립도(세입과목개편전)',add_item_id:''}
			,PH0006:{list_id:'109',tbl_id:'DT_1YL20891',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'재정자주도(세입과목개편전)',add_item_id:''}
			,PH0007:{list_id:'109',tbl_id:'DT_1YL20831',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'사업체수',add_item_id:''}
			,PH0008:{list_id:'109',tbl_id:'DT_1YL20841',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'사업체수',add_item_id:''}
			,PH0009:{list_id:'109',tbl_id:'DT_1YL20851',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'종사자수',add_item_id:''}
			,PH0010:{list_id:'109',tbl_id:'DT_1YL20551E',atdrc_yn:'U',prd_id:'H',prid_value:'201902',base_item_id:'16142T1',base_item_nm:'신설법인수',add_item_id:''}
			,PH0011:{list_id:'109',tbl_id:'INH_1JC1501',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T1100',base_item_nm:'총가구_가구',add_item_id:''}
			,PH0012:{list_id:'109',tbl_id:'INH_1EA1045',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'계',add_item_id:''}
			,PH0014:{list_id:'109',tbl_id:'INH_1ZB7001',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'어업가구',add_item_id:''}
			,PH0015:{list_id:'109',tbl_id:'DT_1YL20121',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'건수',add_item_id:'OV_L2_ID::101'}
			,PH0016:{list_id:'109',tbl_id:'DT_1YL20131',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'10',base_item_nm:'건수',add_item_id:'OV_L2_ID::101'}
			,PH0018:{list_id:'109',tbl_id:'DT_1YL5701',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'제조업사업체수',add_item_id:''}
			,PH0019:{list_id:'109',tbl_id:'DT_1YL5801',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'제조업종사자수',add_item_id:''}
			,PH0021:{list_id:'109',tbl_id:'DT_1YL6101',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'도소매업사업체수',add_item_id:''}
			,PH0022:{list_id:'109',tbl_id:'DT_1YL6201',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'도소매업종사자수',add_item_id:''}
			,PH0023:{list_id:'109',tbl_id:'INH_1K31005_02',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T3',base_item_nm:'백화점 경상금액',add_item_id:''}
			,PH0024:{list_id:'109',tbl_id:'DT_1YL6301',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'서비스업사업체수',add_item_id:''}
			,PH0026:{list_id:'109',tbl_id:'DT_1YL5901',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'운수업기업체수',add_item_id:''}
			,PH0027:{list_id:'109',tbl_id:'DT_1YL6001',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'운수업종사자수',add_item_id:''}
			,PH0032:{list_id:'106',tbl_id:'DT_1YL1101',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'구인배수',add_item_id:''}
			,PH0036:{list_id:'106',tbl_id:'DT_1YL20531E',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T80',base_item_nm:'청년실업률',add_item_id:''}
			,PH0037:{list_id:'106',tbl_id:'DT_1YL20541',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'취업자 증가수',add_item_id:''}
			,PH0038:{list_id:'106',tbl_id:'INH_1SSLA0812R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0039:{list_id:'106',tbl_id:'DT_1YL20561',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'인원수',add_item_id:'OV_L2_ID::0'}
			,PH0040:{list_id:'105',tbl_id:'INH_1EA1501',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T210',base_item_nm:'농업소득',add_item_id:''}
			,PH0041:{list_id:'105',tbl_id:'INH_1SSIC050R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T21',base_item_nm:'- 매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0042:{list_id:'105',tbl_id:'INH_1SSIC010R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 여유있음',add_item_id:'OV_L2_ID::000'}
			,PH0043:{list_id:'105',tbl_id:'INH_1C86_01',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T4',base_item_nm:'1인당 민간소비',add_item_id:''}
			,PH0044:{list_id:'105',tbl_id:'INH_1SSIC060R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0045:{list_id:'105',tbl_id:'INH_1EA1611',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T002',base_item_nm:'부채-연도말',add_item_id:''}
			,PH0046:{list_id:'105',tbl_id:'DT_1YL6801E',atdrc_yn:'U',prd_id:'M',prid_value:'201911',base_item_id:'13103112609999',base_item_nm:'예금은행대출금액',add_item_id:''}
			,PH0047:{list_id:'105',tbl_id:'DT_1YL6701E',atdrc_yn:'U',prd_id:'M',prid_value:'201911',base_item_id:'13103112608999',base_item_nm:'예금은행예금액',add_item_id:''}
			,PH0050:{list_id:'104',tbl_id:'DT_1YL21171',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학생수',add_item_id:''}
			,PH0051:{list_id:'104',tbl_id:'DT_1YL8901',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'대학교 교원수',add_item_id:''}
			,PH0052:{list_id:'104',tbl_id:'DT_1YL8801',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'대학교 재학생수',add_item_id:''}
			,PH0053:{list_id:'104',tbl_id:'DT_1YL21221',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'교원수',add_item_id:''}
			,PH0054:{list_id:'104',tbl_id:'DT_1YL21211',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'원아수',add_item_id:''}
			,PH0055:{list_id:'104',tbl_id:'DT_1YL21251',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'교원수',add_item_id:''}
			,PH0056:{list_id:'104',tbl_id:'DT_1YL21241',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학생수',add_item_id:''}
			,PH0057:{list_id:'104',tbl_id:'DT_1YL21201',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'유치원수',add_item_id:''}
			,PH0058:{list_id:'104',tbl_id:'DT_1YL21191',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학원수',add_item_id:''}
			,PH0059:{list_id:'104',tbl_id:'DT_1YL21181',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'대학수',add_item_id:''}
			,PH0060:{list_id:'104',tbl_id:'DT_1YL21231',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학교수',add_item_id:''}
			,PH0061:{list_id:'104',tbl_id:'INH_1SSED019R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0062:{list_id:'104',tbl_id:'INH_1SSED064R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우효과있음',add_item_id:'OV_L2_ID::000'}
			,PH0063:{list_id:'111',tbl_id:'DT_1YL9801',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'기온',add_item_id:''}
			,PH0064:{list_id:'111',tbl_id:'DT_1YL9901',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'강수량',add_item_id:''}
			,PH0066:{list_id:'111',tbl_id:'DT_1YL20391',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'소비량',add_item_id:''}
			,PH0067:{list_id:'111',tbl_id:'DT_1YL20061',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'보급률',add_item_id:''}
			,PH0068:{list_id:'111',tbl_id:'DT_1YL4801E',atdrc_yn:'U',prd_id:'M',prid_value:'201812',base_item_id:'16310T2008_0117',base_item_nm:'전력판매량',add_item_id:''}
			,PH0069:{list_id:'111',tbl_id:'INH_1SSEN053R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'전혀 불안하지 않음',add_item_id:'OV_L2_ID::000'}
			,PH0070:{list_id:'101',tbl_id:'DT_1YL20631',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'고령인구비율',add_item_id:''}
			,PH0071:{list_id:'101',tbl_id:'DT_1YL20701',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'남녀성비',add_item_id:''}
			,PH0072:{list_id:'101',tbl_id:'DT_1YL12501E',atdrc_yn:'U',prd_id:'Y',prid_value:'2047',base_item_id:'T10',base_item_nm:'노령화지수',add_item_id:''}
			,PH0073:{list_id:'101',tbl_id:'INH_1B82A01',atdrc_yn:'Y',prd_id:'M',prid_value:'201812',base_item_id:'T1',base_item_nm:'사망자수',add_item_id:'OV_L2_ID::0'}
			,PH0074:{list_id:'101',tbl_id:'INH_1B80A18',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T4',base_item_nm:'사망률',add_item_id:'OV_L1_ID::0'}
			,PH0075:{list_id:'101',tbl_id:'INH_1B26001_A021',atdrc_yn:'Y',prd_id:'M',prid_value:'201911',base_item_id:'T25',base_item_nm:'순이동',add_item_id:'OV_L2_ID::0'}
			,PH0076:{list_id:'101',tbl_id:'DT_1YL21261',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'외국인수',add_item_id:''}
			,PH0077:{list_id:'101',tbl_id:'DT_1YL21271',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'외국인수',add_item_id:''}
			,PH0078:{list_id:'101',tbl_id:'DT_1YL20621',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'인구증가율',add_item_id:''}
			,PH0079:{list_id:'101',tbl_id:'INH_1B26001_A022',atdrc_yn:'Y',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'총전입',add_item_id:'OV_L2_ID::0'}
			,PH0080:{list_id:'101',tbl_id:'INH_1B26001_A023',atdrc_yn:'Y',prd_id:'M',prid_value:'201911',base_item_id:'T20',base_item_nm:'총전출',add_item_id:'OV_L2_ID::0'}
			,PH0081:{list_id:'101',tbl_id:'DT_1YL20651E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'T20',base_item_nm:'계',add_item_id:''}
			,PH0082:{list_id:'101',tbl_id:'DT_1BPB002E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2035',base_item_id:'T10',base_item_nm:'추계인구',add_item_id:'OV_L2_ID::0'}
			,PH0083:{list_id:'101',tbl_id:'INH_1B81A01',atdrc_yn:'N',prd_id:'M',prid_value:'201812',base_item_id:'T1',base_item_nm:'계',add_item_id:''}
			,PH0084:{list_id:'101',tbl_id:'INH_1B81A17',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T1',base_item_nm:'합계출산율',add_item_id:''}
			,PH0085:{list_id:'101',tbl_id:'INH_1EA1011_01',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T02',base_item_nm:'농가인구',add_item_id:''}
			,PH0087:{list_id:'101',tbl_id:'INH_1ZB7024',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'어가인구',add_item_id:'OV_L2_ID::A00,OV_L3_ID::B00'}
			,PH0089:{list_id:'102',tbl_id:'DT_1YL21161',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'비율',add_item_id:''}
			,PH0090:{list_id:'102',tbl_id:'INH_1B8000I_01',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T51',base_item_nm:'조이혼율 (천명당)',add_item_id:''}
			,PH0091:{list_id:'102',tbl_id:'INH_1B83A35',atdrc_yn:'N',prd_id:'M',prid_value:'201812',base_item_id:'T3',base_item_nm:'혼인',add_item_id:''}
			,PH0092:{list_id:'102',tbl_id:'INH_1B83A23',atdrc_yn:'N',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'계',add_item_id:''}
			,PH0093:{list_id:'102',tbl_id:'INH_1B8000I_02',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T41',base_item_nm:'조혼인율 (천명당)',add_item_id:''}
			,PH0094:{list_id:'102',tbl_id:'INH_1SSWE011R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'많이 좋아짐',add_item_id:'OV_L2_ID::000'}
			,PH0095:{list_id:'102',tbl_id:'DT_1YL20951',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0096:{list_id:'102',tbl_id:'DT_1YL12701',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'독거노인비율',add_item_id:''}
			,PH0097:{list_id:'102',tbl_id:'INH_1SSFA139R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T31',base_item_nm:'-매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0098:{list_id:'102',tbl_id:'INH_1SSFA021R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T20',base_item_nm:'장남 또는 맏며느리',add_item_id:'OV_L2_ID::000'}
			,PH0099:{list_id:'103',tbl_id:'DT_1YL21021E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'EQ-5D',add_item_id:''}
			,PH0100:{list_id:'103',tbl_id:'DT_1YL21011E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'주관적 건강수준인지율',add_item_id:''}
			,PH0101:{list_id:'103',tbl_id:'DT_1YL0301E',atdrc_yn:'U',prd_id:'F',prid_value:'2017',base_item_id:'B44T16',base_item_nm:'남',add_item_id:''}
			,PH0103:{list_id:'103',tbl_id:'DT_1YL11001E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'16117ABC0915',base_item_nm:'결핵신고 신환자수',add_item_id:''}
			,PH0104:{list_id:'103',tbl_id:'DT_1YL20291E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'고위험음주율',add_item_id:''}
			,PH0105:{list_id:'103',tbl_id:'DT_1YL20991E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'음주율',add_item_id:''}
			,PH0106:{list_id:'103',tbl_id:'DT_1YL21031E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'비만율',add_item_id:''}
			,PH0107:{list_id:'103',tbl_id:'DT_1YL21041E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'스트레스 인지율',add_item_id:''}
			,PH0108:{list_id:'103',tbl_id:'DT_1YL21001E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'흡연율',add_item_id:''}
			,PH0109:{list_id:'103',tbl_id:'INH_1SSHE020R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T40',base_item_nm:'규칙적 운동-실천한다',add_item_id:'OV_L2_ID::000'}
			,PH0110:{list_id:'103',tbl_id:'DT_1YL8101E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'16350AAA0',base_item_nm:'의료기관 수술인원',add_item_id:''}
			,PH0111:{list_id:'103',tbl_id:'DT_1YL20971',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'병상수',add_item_id:''}
			,PH0112:{list_id:'103',tbl_id:'DT_1YL20981',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'의사수',add_item_id:''}
			,PH0113:{list_id:'107',tbl_id:'DT_1YL7401E',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'13103792712T1',base_item_nm:'건축착공면적',add_item_id:''}
			,PH0114:{list_id:'107',tbl_id:'DT_1YL7701',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'건축허가면적 증감률',add_item_id:''}
			,PH0115:{list_id:'107',tbl_id:'DT_1YL7501E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'13103871094T1',base_item_nm:'주택건설실적',add_item_id:''}
			,PH0116:{list_id:'107',tbl_id:'DT_1YL13401E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'13103871096T6',base_item_nm:'주택보급률',add_item_id:''}
			,PH0117:{list_id:'107',tbl_id:'INH_1JU1501',atdrc_yn:'N',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주택',add_item_id:''}
			,PH0118:{list_id:'107',tbl_id:'DT_1YL20201E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'13103114386T2',base_item_nm:'면적',add_item_id:''}
			,PH0119:{list_id:'107',tbl_id:'DT_1YL20161E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'아파트매매가격지수',add_item_id:''}
			,PH0120:{list_id:'107',tbl_id:'DT_1YL20191E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'아파트월세가격지수',add_item_id:''}
			,PH0121:{list_id:'107',tbl_id:'DT_1YL20181E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'아파트월세통합가격지수',add_item_id:''}
			,PH0122:{list_id:'107',tbl_id:'DT_1YL20171E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'아파트전세가격지수',add_item_id:''}
			,PH0123:{list_id:'107',tbl_id:'DT_1YL1701',atdrc_yn:'Y',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'주택가격 변동률',add_item_id:''}
			,PH0124:{list_id:'107',tbl_id:'DT_1YL13501E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'주택매매가격지수',add_item_id:''}
			,PH0125:{list_id:'107',tbl_id:'DT_1YL20151E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'주택월세가격지수',add_item_id:''}
			,PH0126:{list_id:'107',tbl_id:'DT_1YL20141E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'주택월세통합가격지수',add_item_id:''}
			,PH0127:{list_id:'107',tbl_id:'DT_1YL13601E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'주택전세가격지수',add_item_id:''}
			,PH0128:{list_id:'107',tbl_id:'DT_1YL20881E',atdrc_yn:'N',prd_id:'M',prid_value:'201912',base_item_id:'13103890822T1',base_item_nm:'지가변동률',add_item_id:''}
			,PH0129:{list_id:'107',tbl_id:'DT_1YL20761',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'개소',add_item_id:''}
			,PH0130:{list_id:'107',tbl_id:'DT_1YL20721',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'도로포장률',add_item_id:''}
			,PH0131:{list_id:'107',tbl_id:'DT_1YL20731',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'등록대수',add_item_id:''}
			,PH0132:{list_id:'107',tbl_id:'DT_1YL20071',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'확보율',add_item_id:''}
			,PH0133:{list_id:'107',tbl_id:'DT_1YL21291E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'16315T2008_0012',base_item_nm:'도시지역면적',add_item_id:''}
			,PH0134:{list_id:'107',tbl_id:'DT_1YL14001',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'음주운전 교통사고 비율',add_item_id:''}
			,PH0135:{list_id:'107',tbl_id:'DT_1YL21051',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'건수',add_item_id:''}
			,PH0136:{list_id:'107',tbl_id:'DT_1YL20331',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'지수',add_item_id:'OV_L2_ID::00'}
			,PH0137:{list_id:'108',tbl_id:'INH_1SSCL050R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T12',base_item_nm:'관광자 1인당 여행횟수',add_item_id:'OV_L2_ID::000'}
			,PH0138:{list_id:'108',tbl_id:'INH_1SSCL060R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T12',base_item_nm:'· 관광여행자 1인당 여행횟수(평균)',add_item_id:'OV_L2_ID::000'}
			,PH0139:{list_id:'108',tbl_id:'INH_1SSCL030R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'관람횟수(평균)',add_item_id:'OV_L2_ID::000'}
			,PH0140:{list_id:'108',tbl_id:'INH_1SSCL091R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0141:{list_id:'108',tbl_id:'INH_1SSCL092R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T01',base_item_nm:'경제적 부담',add_item_id:'OV_L2_ID::000'}
			,PH0142:{list_id:'108',tbl_id:'DT_1YL20931',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0143:{list_id:'108',tbl_id:'DT_1YL2401',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0144:{list_id:'108',tbl_id:'DT_1YL10901',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'지정등록문화재',add_item_id:''}
			,PH0145:{list_id:'108',tbl_id:'DT_1YL21281',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'조성면적',add_item_id:''}
			,PH0146:{list_id:'108',tbl_id:'DT_1YL4001E',atdrc_yn:'U',prd_id:'H',prid_value:'200702',base_item_id:'13103112708T1',base_item_nm:'인터넷이용률',add_item_id:''}
			,PH0147:{list_id:'110',tbl_id:'DT_1YL3401',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'발생건수',add_item_id:''}
			,PH0148:{list_id:'110',tbl_id:'DT_1YL3001',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'발생건수',add_item_id:''}
			,PH0149:{list_id:'110',tbl_id:'DT_1YL20321',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'발생건수',add_item_id:'OV_L2_ID::10'}
			,PH0150:{list_id:'110',tbl_id:'DT_1YL21081',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'건수',add_item_id:''}
			,PH0151:{list_id:'110',tbl_id:'DT_1YL8601',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'화재발생 건수',add_item_id:''}
			,PH0152:{list_id:'110',tbl_id:'DT_1YL13901',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'뺑소니 교통사고율',add_item_id:''}
			,PH0153:{list_id:'110',tbl_id:'DT_1YL10005',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T001',base_item_nm:'사망률(십만명당)',add_item_id:''}
			,PH0154:{list_id:'110',tbl_id:'INH_1SSSA010R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 안전',add_item_id:'OV_L2_ID::000'}
			,PH0155:{list_id:'110',tbl_id:'INH_1SSSA131R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T20',base_item_nm:'두려운 곳이 있다',add_item_id:'OV_L2_ID::000'}
			,PH0156:{list_id:'110',tbl_id:'DT_1YL21061',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0157:{list_id:'110',tbl_id:'DT_1YL21071',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0158:{list_id:'110',tbl_id:'DT_1YL21111',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'이수율',add_item_id:''}
			,PH0159:{list_id:'110',tbl_id:'DT_1YL20341',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'등급',add_item_id:'OV_L2_ID::10'}
			,PH0160:{list_id:'110',tbl_id:'DT_1YL20351',atdrc_yn:'U',prd_id:'Y',prid_value:'2016',base_item_id:'T10',base_item_nm:'합계',add_item_id:'OV_L2_ID::10'}
			,PH0161:{list_id:'110',tbl_id:'DT_1YL21091',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0162:{list_id:'110',tbl_id:'DT_1YL21101',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0163:{list_id:'110',tbl_id:'DT_1YL20361',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'합계',add_item_id:''}
			,PH0164:{list_id:'112',tbl_id:'DT_1YL20301',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'인구수',add_item_id:'OV_L2_ID::10'}
			,PH0165:{list_id:'112',tbl_id:'DT_1YL20311',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'진료실인원',add_item_id:'OV_L2_ID::10'}
			,PH0166:{list_id:'112',tbl_id:'DT_1YL13801E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'TT',base_item_nm:'국민기초생활보장 수급자수',add_item_id:''}
			,PH0167:{list_id:'112',tbl_id:'DT_1YL8001E',atdrc_yn:'N',prd_id:'M',prid_value:'200812',base_item_id:'1635413103140064SC0',base_item_nm:'요양기관수',add_item_id:''}
			,PH0168:{list_id:'112',tbl_id:'DT_1YL20961',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0170:{list_id:'112',tbl_id:'DT_1YL20271',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'종사자수',add_item_id:'OV_L2_ID::00'}
			,PH0171:{list_id:'112',tbl_id:'DT_1YL20941',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0172:{list_id:'112',tbl_id:'DT_1YL13001',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'보건 및 사회복지사업체 비율',add_item_id:''}
			,PH0173:{list_id:'112',tbl_id:'DT_1YL13101',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'보건 및 사회복지사업 종사자 비율',add_item_id:''}
			,PH0176:{list_id:'112',tbl_id:'DT_1YL2101E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'16110T2009_036',base_item_nm:'지방자치단체공무원 현원',add_item_id:''}
			,PH0177:{list_id:'112',tbl_id:'DT_1YL2201',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'인구 천명당 지방자치단체 공무원 현원',add_item_id:''}
			,PH0178:{list_id:'112',tbl_id:'DT_1YL20901',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'비중',add_item_id:''}
			,PH0179:{list_id:'112',tbl_id:'DT_1YL10801',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'관리기금 현황',add_item_id:''}
			,PH0181:{list_id:'112',tbl_id:'INH_1SSSP020R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0182:{list_id:'112',tbl_id:'INH_1SSSP052R',atdrc_yn:'U',prd_id:'F',prid_value:'2017',base_item_id:'T10',base_item_nm:'참여자',add_item_id:'OV_L2_ID::000'}
			,PH0183:{list_id:'112',tbl_id:'INH_1SSSP181R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T10',base_item_nm:'참여한 적 있다',add_item_id:'OV_L2_ID::000'}
			,PH0185:{list_id:'111',tbl_id:'DT_1YL20751',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'보급률',add_item_id:''}
			,PH0186:{list_id:'111',tbl_id:'DT_1YL21311',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'일반폐기물재활용률',add_item_id:''}
			,PH0187:{list_id:'111',tbl_id:'DT_1YL21321',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'배출량',add_item_id:''}
			,PH0188:{list_id:'111',tbl_id:'DT_1YL21301E',atdrc_yn:'N',prd_id:'Y',prid_value:'2017',base_item_id:'13103130602I119',base_item_nm:'폐수배출업소수',add_item_id:''}
			,PH0189:{list_id:'111',tbl_id:'INH_1SSEN015R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 좋다',add_item_id:'OV_L2_ID::000'}
			,PH0190:{list_id:'111',tbl_id:'DT_1YL13201',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'개발제한구역',add_item_id:''}
			,PH0191:{list_id:'111',tbl_id:'INH_1EB002',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T20',base_item_nm:'논',add_item_id:''}
			,PH0192:{list_id:'103',tbl_id:'INH_1SSHE102R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0193:{list_id:'106',tbl_id:'INH_1ES3A02S_01',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T2',base_item_nm:'경제활동인구 (천명)',add_item_id:'OV_L2_ID::S0'}
			,PH0194:{list_id:'106',tbl_id:'INH_1DA7014S_01',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T20',base_item_nm:'경제활동인구',add_item_id:'OV_L2_ID::0'}
			,PH0195:{list_id:'106',tbl_id:'INH_1ES3A02S_02',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T6',base_item_nm:'경제활동참가율 (％)',add_item_id:'OV_L2_ID::S0'}
			,PH0196:{list_id:'106',tbl_id:'INH_1DA7014S_02',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T60',base_item_nm:'경제활동참가율',add_item_id:'OV_L2_ID::0'}
			,PH0197:{list_id:'106',tbl_id:'INH_1ES3A02S_03',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T7',base_item_nm:'고용률 (%)',add_item_id:'OV_L2_ID::S0'}
			,PH0198:{list_id:'106',tbl_id:'INH_1DA7014S_03',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T90',base_item_nm:'고용률',add_item_id:'OV_L2_ID::0'}
			,PH0199:{list_id:'106',tbl_id:'DT_1YL15007E',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T1',base_item_nm:'구직급여 신청자수',add_item_id:''}
			,PH0200:{list_id:'106',tbl_id:'DT_1YL15005E',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'index2',base_item_nm:'상용총근로시간',add_item_id:''}
			,PH0201:{list_id:'106',tbl_id:'DT_1YL15002',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T001',base_item_nm:'비정규직근로자 비율',add_item_id:''}
			,PH0202:{list_id:'106',tbl_id:'DT_1YL15003',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T001',base_item_nm:'상용직 비중',add_item_id:''}
			,PH0203:{list_id:'106',tbl_id:'DT_1YL15004',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T001',base_item_nm:'상용직 비중',add_item_id:''}
			,PH0204:{list_id:'106',tbl_id:'INH_1DA7104S',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T80',base_item_nm:'실업률',add_item_id:'OV_L2_ID::0'}
			,PH0205:{list_id:'106',tbl_id:'INH_1ES3A01S',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T8',base_item_nm:'실업률 (％)',add_item_id:''}
			,PH0206:{list_id:'106',tbl_id:'DT_1YL15006',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T001',base_item_nm:'상용 월평균 임금',add_item_id:''}
			,PH0207:{list_id:'106',tbl_id:'INH_1DA7015S',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T90',base_item_nm:'고용률',add_item_id:'OV_L2_ID::75'}
			,PH0208:{list_id:'106',tbl_id:'INH_1ES3A03_A01S',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T12',base_item_nm:'고용률 (%)',add_item_id:'OV_L2_ID::010'}
			,PH0209:{list_id:'106',tbl_id:'INH_1DA7030S',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T30',base_item_nm:'취업자',add_item_id:'OV_L2_ID::0'}
			,PH0210:{list_id:'106',tbl_id:'INH_1ES3A02S_04',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T3',base_item_nm:'취업자 (천명)',add_item_id:'OV_L2_ID::S0'}
			,PH0211:{list_id:'104',tbl_id:'DT_1YL15001',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T001',base_item_nm:'전체',add_item_id:''}
			,PH0212:{list_id:'112',tbl_id:'INH_1SSSP062R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T10',base_item_nm:'기부함',add_item_id:'OV_L2_ID::000'}
			,PH0213:{list_id:'112',tbl_id:'INH_1SSSP041R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'몸이 아파 집안일을 부탁할 경우 - 도움을 받을 수 있는 사람 있음',add_item_id:'OV_L2_ID::000'}
			,PH0214:{list_id:'112',tbl_id:'INH_1ES4G07S',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'- 국민연금',add_item_id:''}
			,PH0215:{list_id:'109',tbl_id:'DT_1YL6501',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'부도업체수',add_item_id:''}
			,PH0216:{list_id:'109',tbl_id:'DT_1YL15010',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T001',base_item_nm:'증감률',add_item_id:''}
			,PH0217:{list_id:'109',tbl_id:'DT_1YL15009',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T001',base_item_nm:'증감률',add_item_id:''}
			,PH0218:{list_id:'109',tbl_id:'DT_1YL15012',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T001',base_item_nm:'종사자수',add_item_id:'OV_L2_ID::0'}
			,PH0220:{list_id:'105',tbl_id:'INH_1C86_04',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T3',base_item_nm:'1인당 개인소득',add_item_id:''}
			,PH0221:{list_id:'105',tbl_id:'INH_1C86_03',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T2',base_item_nm:'1인당 지역총소득',add_item_id:''}
			,PH0224:{list_id:'105',tbl_id:'DT_1YL20581',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'변동률',add_item_id:''}
			,PH0225:{list_id:'105',tbl_id:'INH_1J17112',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T',base_item_nm:'소비자물가지수',add_item_id:'OV_L2_ID::0'}
			,PH0226:{list_id:'110',tbl_id:'DT_1YL15013',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T001',base_item_nm:'경찰공무원 1인당 담당주민수',add_item_id:''}
			,PH0227:{list_id:'101',tbl_id:'INH_1IN1503_01',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'총인구(명)',add_item_id:''}
			,PH0228:{list_id:'101',tbl_id:'INH_1B83A10',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T1',base_item_nm:'남편',add_item_id:''}
			,PH0229:{list_id:'101',tbl_id:'INH_1B83A09',atdrc_yn:'N',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'남편',add_item_id:''}
			,PH0230:{list_id:'101',tbl_id:'INH_1IN1503_02',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'총인구(명)',add_item_id:'OV_L2_ID::126'}
			,PH0231:{list_id:'107',tbl_id:'DT_1YL20731',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'등록대수',add_item_id:''}
			,PH0233:{list_id:'107',tbl_id:'DT_1YL15008',atdrc_yn:'Y',prd_id:'F',prid_value:'2015',base_item_id:'T002',base_item_nm:'자기집',add_item_id:''}
			,PH0234:{list_id:'111',tbl_id:'DT_1YL20401',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T01',base_item_nm:'생산량',add_item_id:'OV_L2_ID::10'}
			,PH0235:{list_id:'111',tbl_id:'DT_1YL20411',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T01',base_item_nm:'생산량',add_item_id:'OV_L2_ID::11'}
		},
		
		/**
		 * @name		 : init
		 * @description  : 페이지 초기화 함수 
		 * @date		 : 2019.08.19 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		init : function() {
			//처음 페이지 로드
			//if($statsMeMap.ui.callCount == 0) {
			//}
			
			//임시 데이터 불러오기
			//$statsMeMap.ui.loadMapData("TM0003");
			
			//페이지 맵이동 데이터 처리
			if($statsMeMap.ui.pageLoadMapMoveYn == "Y") {
				$statsMeMap.ui.pageLoadMapMoveYn = "N";
				$statsMeMap.ui.mapMoveEventYn = "N";
				$statsMeMap.ui.map.mapMove([$statsMeMap.ui.pageLoadMapMoveX, $statsMeMap.ui.pageLoadMapMoveY], $statsMeMap.ui.pageLoadMapMoveZoom);
			}
			
			//페이지 호출 횟수 증가
			$statsMeMap.ui.callCount++;
		},
	
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2019.08.20
		 * @author : 김남민
		 * @history :
		 * @param
		 */
		createMap : function(id) {
			//지도 불러오기 전 처리(지도 div가 display block 상태에서 지도를 불러와야 화면 안깨짐)
			var lvStatsMeMapShowYn = "Y";
			if($("#statsMeMap").css("display") == "none") {
				lvStatsMeMapShowYn = "N";
			}
			if(lvStatsMeMapShowYn == "N") {
				$("#statsMeMap").parent().css("overflow","hidden");
				$("#statsMeMap").show();
			}
			
			//지도 불러오기
			this.map = new sMap.map();
			this.map.id = id;
			this.map.isDrop = true;
			this.map.isInnerMapShow = true;
			this.map.isTradeMapShow = false;
			this.map.boundLevel = 0; // 확대 상관없이 지역경계 표시하게함
			this.map.createMap($statsMeMap, id, {
				//대전 서구 둔산동
				//center : [ 989674, 1818313 ],
				//zoom : 8, //9->8
				//전국
				center : $statsMeMap.ui.mapCenterDefalut,
				zoom : 1,
				measureControl : false,
				statisticTileLayer: true
			});
			
			/*
			this.map.createMap() 안에 기본적으로 세팅이 되게 되어있음 (불필요함)
			this.bounds = this.map.gMap.getBounds();
			this.render = sop.svg();
			this.markers = sop.markerClusterGroup({
				animateAddingMarkers: true
			});
			this.map.gMap.addLayer(this.markers);
			*/
			
			//지도 이벤트 등록
			//this.map.addControlEvent("movestart");
			//this.map.addControlEvent("moveend");
			//this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			//this.map.addControlEvent("drag");
			//this.map.addControlEvent("dragend");
			this.map.gMap.on("moveend", function (e) {
				var that = $statsMeMap.ui.map;
				if (that.delegate && 
					that.delegate.callbackFunc && 
					that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
					that.delegate.callbackFunc.didMapMoveEnd(e, that);
				}
			});
			
			//지도 버튼 콜백 함수 등록 
			this.map.mapBtnInfo = $statsMeMap.mapBtnInfo;
			
			//지도 범례 등록
			//this.map.legend = $statsMeMap.legend;
			var legend = new sLegendInfo.legendInfo($statsMeMap.ui.map);
			legend.linkTooltip = function() {}; //툴팁오류 방지
			legend.drawBubbleMap = $statsMeMap.ui.drawBubbleMap; // 버블 지도 Override
			legend.initialize($statsMeMap.ui);
			this.map.legend = legend;
			legend.createLegend();
			//타입설정 버튼 숨김
			$("#legendPopEvent00_"+ $statsMeMap.ui.map.legend.id).parent().hide();
			//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 START
			//legend 색상 변경시 색상 고정
			$("#legendColor_"+$statsMeMap.ui.map.legend.id+" li>a").on("click",function() {
				$statsMeMap.ui.map.legend.legendType = "auto";
			});
			//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 END
			
			//지도 불러오기 완료 후 처리
			this.map.gMap.whenReady(function() {
				//열지도 생성
				$statsMeMap.ui.map.createHeatMap();
				
				//위성, 일반, 백지도 선택 버튼 추가
				var mapUI = sop.control({position: 'topright'});
				mapUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'map_' + $statsMeMap.ui.mapId);
				    $(this._div).css("margin-top","45px");
				    $statsMeMap.ui.mapObj = this._div;
				    return this._div;
				};
				mapUI.update = function (props) {
					var html = "";
					html += "<div class='mapBtnWrapper' data-html2canvas-ignore=true>";
					html += "<a class='rightQuick rq06'><span>GPS</span></a>";
					html += "<ul class='rqListBox rq06'>";
					html += 	"<li><a name='settlite' class='ico_side_gps01'><span>위성</span></a></li>"; 
					html += 	"<li><a name='normal' class='ico_side_gps02'><span>일반</span></a></li>";
					//html += 	"<li><a name='white' class='ico_side_gps02'><span>백지도</span></a></li>";//2019-05-28 박길섭
					//2020-02-19 [김남민] 통계로-40 : 백지도 기능 숨김처리.
					html += 	"<li id='backMap' style='display:none;'><a name='white' class='ico_side_gps02'><span>백지도</span></a></li>";//2019-05-28 박길섭
					html += 	"<li id='white_child' style='margin-left: 78px;margin-top: 10px; display:none;'><a name='white_child' class='ico_side_gps02'><span>숨기기</span></a></li>";//2019-05-28 박길섭
					html += "</ul>";
					html += "</div>";
					this._div.innerHTML = html;
				};
				mapUI.addTo($statsMeMap.ui.map.gMap);
				
				//확대 축소 버튼 추가
				var zoomUI = sop.control({position: 'topright'});
				zoomUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'zoom_' + $statsMeMap.ui.mapId);
				    $statsMeMap.ui.zoomObj = this._div;
				    return this._div;
				};
				zoomUI.update = function (props) {
					var html = "";
					html += "<div class='mapZoomWrapper' data-html2canvas-ignore=true>"
					html += "<a class='rightQuick rq03'>확대하기</a>";
					html += "<a class='rightQuick rq04' style='top:32px;'>전국</a>";
					html += "<a class='rightQuick rq05' style='top:52px;'>축소하기</a>";
					html += "</div>";
					this._div.innerHTML = html;
				};
				zoomUI.addTo($statsMeMap.ui.map.gMap);
				
				//현재위치 가져오기
				$statsMeMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {
					if(p_flag == true) {
						//변수 입력
						$statsMeMain.ui.my_x = p_center[0];
						$statsMeMain.ui.my_y = p_center[1];
						//지역조회
						$statsMeMap.ui.getCenterToAdmCd(p_center, function(res) {
							//변수 입력
							$statsMeMain.ui.my_location_yn = "Y";
							$statsMeMain.ui.my_sido_cd = res.result.sido_cd;
							$statsMeMain.ui.my_sido_nm = res.result.sido_nm;
							$statsMeMain.ui.my_sgg_cd = res.result.sgg_cd;
							$statsMeMain.ui.my_sgg_nm = res.result.sgg_nm;
							$statsMeMain.ui.my_emdong_cd = res.result.emdong_cd;
							$statsMeMain.ui.my_emdong_nm = res.result.emdong_nm;
							
							//내 위치 조회 후 콜백
							if(gv_bookmark_yn == "N") {
								$statsMeMain.ui.getMyPositionCallback();
							}
						});
					}
					else {
						//$statsMeMain.ui.alert("위치정보조회를 실패하였습니다.");
						//if(!p_msg2) $statsMeMain.ui.alert(p_msg2);
						//else $statsMeMain.ui.alert(p_msg);
					}
				});
				
				//즐겨찾기 조회
				if(gv_bookmark_yn == "Y") {
					// 위치 저장
					$statsMePopup.ui.getAreaSido(gv_bookmark_params_info.paramInfo.sido_cd);
					$statsMePopup.ui.getAreaSgg(gv_bookmark_params_info.paramInfo.sido_cd, gv_bookmark_params_info.paramInfo.sgg_cd);
					$statsMePopup.ui.getAreaEmdong(gv_bookmark_params_info.paramInfo.sido_cd, gv_bookmark_params_info.paramInfo.sgg_cd, gv_bookmark_params_info.paramInfo.emdong_cd);
					$statsMeMain.ui.default_sido_cd = gv_bookmark_params_info.paramInfo.sido_cd;
					$statsMeMain.ui.default_sido_nm = gv_bookmark_params_info.paramInfo.sido_nm;
					$statsMeMain.ui.default_sido_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
					$statsMeMain.ui.default_sido_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
					$statsMeMain.ui.default_sgg_cd = gv_bookmark_params_info.paramInfo.sgg_cd;
					$statsMeMain.ui.default_sgg_nm = gv_bookmark_params_info.paramInfo.sgg_nm;
					$statsMeMain.ui.default_sgg_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
					$statsMeMain.ui.default_sgg_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
					$statsMeMain.ui.default_emdong_cd = gv_bookmark_params_info.paramInfo.emdong_cd;
					$statsMeMain.ui.default_emdong_nm = gv_bookmark_params_info.paramInfo.emdong_nm;
					$statsMeMain.ui.default_emdong_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
					$statsMeMain.ui.default_emdong_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
					$statsMeMain.ui.default_x = gv_bookmark_params_info.paramInfo.x;
					$statsMeMain.ui.default_y = gv_bookmark_params_info.paramInfo.y;
					
					//카테고리 추가
					/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
					// $statsMeNavigation.ui.statMeCatalogNavigation([gv_bookmark_params_info.paramInfo.stat_data_id+"$"+gv_bookmark_params_info.paramInfo.stat_data_nm]);
					$statsMeNavigation.ui.statMeCatalogNavigation([gv_bookmark_params_info.paramInfo.stat_data_id+"$"+gv_bookmark_params_info.paramInfo.stat_data_srv_nm]);
					/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
					$("#catalogStatDataNavigation>li>a").addClass("current");
					
					//상세보기 버튼으로 활성화 하기
					if(gv_bookmark_params_info.paramInfo.page == "statsMeDetailInfo") {
						$("#statsMeNavigation a[id^='statsMeNavigationPageMove_']").closest("div.view_map").addClass("disable");
						$("#statsMeNavigation a[id^='statsMeNavigationPageMove_']").closest("div.view_text").removeClass("disable");
					}
					
					//지도 조회
					$statsMeMap.ui.loadMapData(gv_bookmark_params_info.paramInfo.stat_data_id);
				}
				
				/** 2020.04.06[한광희] SGIS 포털 검색 시 My통계로 카탈로그 조회 START */
				if(gv_potal_search_type == "Y"){
					$statsMeNavigation.ui.statMeCatalogNavigation([gv_stat_data_id+"$"+gv_stat_data_srv_nm]);
					$("#catalogStatDataNavigation>li>a").addClass("current");
					
					// 지도 조회
					$statsMeMap.ui.loadMapData(gv_stat_data_id);
				}
				/** 2020.04.06[한광희] SGIS 포털 검색 시 My통계로 카탈로그 조회 END */
			});
			
			//지도 불러오기 후 처리
			if(lvStatsMeMapShowYn == "N") {
				$("#statsMeMap").hide();
				$("#statsMeMap").parent().css("overflow","");
			}
		},
		
		/**
		 * 
		 * @name         : clearMap
		 * @description  : 지도 Clear
		 * @date         : 2019. 08. 29. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		clearMap : function(p_map) {
			//2019-11-27 경계 Clear 수정. START
			//경계 Clear
			try { p_map.clearLayer(); } catch(e) { }
			if (p_map.tradeGeojson) {
				p_map.tradeGeojson.remove();
			}
			// 2017. 05. 15 개발팀 수정요청
			p_map.bnd_year = bndYear;
			p_map.data = [];
			p_map.combineData = [];
			p_map.dataGeojson = null;
			p_map.curDropPolygonCode = null;
			p_map.valPerSlice = [];
			p_map.legendValue = [];
			p_map.lastGeojsonInfo = null;
			p_map.isNoReverseGeocode = false;
			p_map.isTradeMapShow = false;
			p_map.lastDrawList = [];
			p_map.legendValue.user = [];
			if (p_map.drawControl) {
				p_map.drawControl.removeOverlay();
			}
			//2019년반영 시작
			if(p_map.mapMode!="white"){
				p_map.markers.clearLayers();
			}
			//2019년반영 끝
			p_map.selectedBoundMode = null;
			p_map.selectedBoundList = [];
			p_map.dataGeojsonLayer = null;
			p_map.curAdmCd = null;
			p_map.dataForCombine = null;
			p_map.multiLayerControl.clear();
			p_map.legend.removeDataOverlay();
			p_map.legend.data = []; //9월 서비스
			if (p_map.heatMap) {
				p_map.heatMap.setUTMKs([]);
			}
			p_map.gMap.eachLayer(function(layer) {
				if (layer._layer) {
					_layer.remove();
				}
			});
			//2019-11-27 경계 Clear 수정. END
			
			//색상/버블 Clear (mapNavigation 관련 스크립트 오류 있음)
			//p_map.clearDataOverlay();
			
			//POI Type (1, 3) 마커 클러스터 Clear
			p_map.markers.clearLayers();
			
			//POI Type (2, 4, 5) 마커 Clear
			$.each(p_map.gMap._layers, function(i, e) {
				var lv_poi_se_nm = e.poi_se_nm;
				if(lv_poi_se_nm != undefined && lv_poi_se_nm != null && (lv_poi_se_nm == "2" || lv_poi_se_nm == "4" || lv_poi_se_nm == "5")) {
					p_map.gMap.removeLayer(e);
				}
			});
		},
		
		/**
		 * 
		 * @name         : createSatelliteCRS
		 * @description  : 위성지도에 사용하는 좌표체계 생성
		 * @date         : 2015. 10. 15. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		createSatelliteCRS : function() {
			var code = 'EPSG:900913';
			var def = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs';
			var options = {
				resolutions: [
					156543.0339,
					78271.51695,
					39135.758475,
					19567.8792375,
					9783.93961875,
					4891.969809375,
					2445.9849046875,
					1222.99245234375,
					611.496226171875,
					305.7481130859375,
					152.87405654296876,
					76.43702827148438,
					38.21851413574219,
					19.109257067871095,
					9.554628533935547,
					4.777314266967774,
					2.388657133483887,
					1.1943285667419434,
					0.5971642833709717,
					0.29858214168548586,
					0.14929107084274293
				],
				origin: [-20037508.34, 20037508.34]
			};

			// 새로 정의한 CRS 객체 생성.
			var crs = new sop.CRS.Proj(code, def, options);

			// projection 영역 설정.
			crs.projection.bounds = sop.bounds(
					[13232210.28055642, 3584827.864295762],
					[15238748.249933105, 5575460.5658249445]
			);

			return crs;
		},
		
		
		/**
		 * 
		 * @name         : createSatelliteTileLayer
		 * @description  : 위성 타일레이어 생성
		 * @date         : 2015. 10. 15. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		createSatelliteTileLayer : function() {
			
			//mng_s 20210506 이진호, 위성지도 URL 변경
			//mng_s 20201119 크롬에서 위성지도가 나오지 않아서 수정
			//var satTileURL = "http://xdworld.vworld.kr:8080/2d/Satellite/201301/{z}/{x}/{y}.jpeg";
			//var satTileURL = "https://xdworld.vworld.kr/2d/Satellite/201301/{z}/{x}/{y}.jpeg";
			var satTileURL = "https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg";
			//mng_e 20210506 이진호
			var satTileOptions = {
				maxZoom: 19,
				minZoom: 6
			};
			var satTileLayer = new sop.TileLayer(satTileURL, satTileOptions);
			return satTileLayer;
		},
		
		/**
		 * 
		 * @name         : createTileLayer
		 * @description  : 타일레이어 토글버튼 생성
		 * @date         : 2015. 10. 15. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		createTileLayer : function(map, crs, baseLayer, targetLayer, zoomMargin) {
			var that = $statsMeMap.ui;
			
			if(map.hasLayer(baseLayer)){
				return;
			}
			var center = map.getCenter();
			var zoom = that.map.zoom;
			map.removeLayer(targetLayer);
			map.options.crs = crs;
			baseLayer.addTo(map);
			that.map.setFixedBoundLevel(that.map.isFixedBound);
			that.map.mapMove([center.x, center.y], zoom);
		},
		
		/**
		 * 
		 * @name         : createWhiteTileLayer
		 * @description  : 백지도 타일레이어 생성
		 * @date         : 2019. 10. 29. 
		 * @author	     : 김남민
		 * @history 	 : 2019.10.29 interactiveMapBtn.js 에서 가져옴
		 */
		createWhiteTileLayer : function() {
			var url = "https://sgisapi.kostat.go.kr/tiles/wbmap/L{z}/{y}/{x}.png";
			var options = {
					errorTileUrl: 'https://sgisapi.kostat.go.kr/tiles/missing.png',
					maxZoom: 13,
					minZoom: 0,
					zoomReverse: false,
					continuousWorld: false,
					tms: false
			};
			var layer = new sop.TileLayer(url, options);
			
			layer.fillZero = function (strB, strLen) {
				return '00000000'.substr(0, strLen - (strB + '').length) + strB;
			}
			
			layer.getTileUrl =  function (coords) {
				var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;
				return sop.Util.template(this._url, sop.extend({
					x: 'C' + this.fillZero(coords.x.toString(16), 8),
					y: 'R' + this.fillZero(y.toString(16), 8),
					z: this.fillZero(this._getZoomForUrl().toString(10), 2)
				}, this.options));
			}
			return layer;
		},
		
		/**
		 * 
		 * @name         : createNomalTileLayer
		 * @description  : 일반지도 타일레이어 생성
		 * @date         : 2019. 10. 29. 
		 * @author	     : 김남민
		 * @history 	 : 2019.10.29 interactiveMapBtn.js 에서 가져옴
		 */
		createNomalTileLayer : function() {
			var url = "https://sgisapi.kostat.go.kr/tiles/bmap4/L{z}/{y}/{x}.png";
			var options = {
					errorTileUrl: 'https://sgisapi.kostat.go.kr/tiles/missing.png',
					maxZoom: 13,
					minZoom: 0,
					zoomReverse: false,
					continuousWorld: false,
					tms: false
			};
			var layer = new sop.TileLayer(url, options);
			
			layer.fillZero = function (strB, strLen) {
				return '00000000'.substr(0, strLen - (strB + '').length) + strB;
			}
			
			layer.getTileUrl =  function (coords) {
				var y = this.options.tms ? this._tileNumBounds.max.y - coords.y : coords.y;
				return sop.Util.template(this._url, sop.extend({
					x: 'C' + this.fillZero(coords.x.toString(16), 8),
					y: 'R' + this.fillZero(y.toString(16), 8),
					z: this.fillZero(this._getZoomForUrl().toString(10), 2)
				}, this.options));
			}
			return layer;
		},
		
		/**
		 * @name : getCurrentLocation
		 * @description : 현재위치 좌표 얻기
		 * @date : 2019.08.22
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		callback : callback 함수
		 */
		getCurrentLocation : function(callback){
			var center = [989674, 1818313];
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
					center = [utmkXY.x, utmkXY.y];
					if(typeof callback === "function"){
						callback(center,true);
					}
				}, function(error) {
					var message;
					if (error.code === 1) {
						message = "현재위치를 동의하지 않았습니다";
					} else if (error.code === 2) {
						message = "GPS를 확인할 수 없습니다";
					} else {
						message = "현재 위치를 찾는데 실패하였습니다";
					}
					console.warn(message);
					if(typeof callback === "function"){
						callback(center,false,error.code,message);
					}
				}, {
					timeout: 5000
				});
			}else{
				if(typeof callback === "function"){
					callback(center,false,"현재 위치를 찾는데 실패하였습니다");
				}
			}
			return center;
		},
		
		/**
		 * @name           : getCenterToAdmCd
		 * @description    : 지도의 중심점으로 집계구값 얻기
		 * @date           : 2019.08.22
		 * @author	       : 김남민
		 * @history        :
		 * @param center   : 중심
		 * @param callback : callback
		 */
		getCenterToAdmCd : function(center,callback) {
			var obj = new sop.openApi.personal.findcodeinsmallarea.api();
			var x,y;
			if(Object.prototype.toString.call(center)==="[object Array]"&&center.length==2){
				x = center[0];
				y = center[1];
			}else{
				center = $statsMeMap.ui.map.gMap.getCenter();
				x = center.x;
				y = center.y;
			}
			obj.addParam("accessToken", accessToken);
			obj.addParam("x_coor", x);
			obj.addParam("y_coor", y);
			obj.request({
				method : "GET",
				async : true, // false : 로딩표시, true : 로딩숨김
				url : openApiPath+"/OpenAPI3/personal/findcodeinsmallarea.json",
				options : {
					callback : callback,
					center : center,
					target : $statsMeMap.ui
				}
			});
		},
		
		/**
		 * @name : dataBoardToggle
		 * @description : 데이터보드 토글
		 * @date : 2019.08.21
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 * 		p_delay : 딜레이
		 */
		dataBoardToggle : function(p_flag, p_delay) {
			//딜레이 기본값
			if(p_delay == undefined) p_delay = 0;
			
			//표시
			if(p_flag == true) {
				//열기버튼 숨기고 닫기버튼 보여주기
				$("#statsMeMapDataBoard_close").show();
				$("#statsMeMapDataBoard_open").hide();
				
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
				$("#statsMeMapDataBoard_title").show();
				$("#statsMeMapDataBoard_body").show();
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
				
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
				//$("#statsMeMapDataBoard").css("right", "-300px");
				//20200925 이금은   width : 300 -> 360
				$("#statsMeMapDataBoard").animate({
					width : 360
				},p_delay,function(){
					
				});
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
				
				//지도 선택 버튼 이동
				$("#map_"+$statsMeMap.ui.mapId).css("right", "0px");
				$("#map_"+$statsMeMap.ui.mapId).animate({
					right : 300
				},p_delay,function(){
					
				});
				
				//지도 확대/축소 버튼 이동
				$("#zoom_"+$statsMeMap.ui.mapId).css("right", "0px");
				$("#zoom_"+$statsMeMap.ui.mapId).animate({
					right : 300
				},p_delay,function(){
					
				});
			}
			//감춤
			else {
				//닫기버튼 숨기고 열기버튼 보여주기
				$("#statsMeMapDataBoard_close").hide();
				$("#statsMeMapDataBoard_open").show();
				
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 START
				//$("#statsMeMapDataBoard").css("right", "0px");
				$("#statsMeMapDataBoard").animate({
					width : 0
				},p_delay,function(){
					$("#statsMeMapDataBoard_title").hide();
					$("#statsMeMapDataBoard_body").hide();
				});
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
				
				//지도 선택 버튼 이동
				$("#map_"+$statsMeMap.ui.mapId).css("right", "300px");
				$("#map_"+$statsMeMap.ui.mapId).animate({
					right : 0
				},p_delay,function(){
					
				});
				
				//지도 확대/축소 버튼 이동
				$("#zoom_"+$statsMeMap.ui.mapId).css("right", "300px");
				$("#zoom_"+$statsMeMap.ui.mapId).animate({
					right : 0
				},p_delay,function(){
					
				});
			}
		},
		
		/**
		 * @name : loadMapData
		 * @description : 지도 데이터 조회
		 * @date : 2019.08.21
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_stat_data_id : 통계자료코드
		 */
		loadMapData : function(p_stat_data_id) {
			//임시 페이지 이동
			if($statsMeMain.ui.currentPageName != "statsMeDetailInfo" && $statsMeMain.ui.currentPageName != "statsMeMap") {
				$statsMeMain.ui.changePage("statsMeMap");
			}
			
			//저장된 위치 불러오기
			//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
			//$("#statsMePopupArea_sido").val($statsMeMain.ui.default_sido_cd);
			$statsMePopup.ui.getAreaSido($statsMeMain.ui.default_sido_cd);
			$statsMePopup.ui.getAreaSgg($statsMeMain.ui.default_sido_cd, $statsMeMain.ui.default_sgg_cd);
			$statsMePopup.ui.getAreaEmdong($statsMeMain.ui.default_sido_cd, $statsMeMain.ui.default_sgg_cd, $statsMeMain.ui.default_emdong_cd);
			$statsMeMain.ui.setPositionText();
			var lv_adm_coor_x = 990480.875;
			var lv_adm_coor_y = 1815839.375;
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
			if(lv_sido_cd != "99") {
				lv_adm_coor_x = lv_sido_coor_x;
				lv_adm_coor_y = lv_sido_coor_y;
			}
			if(lv_sgg_cd != "999") {
				lv_adm_coor_x = lv_sgg_coor_x;
				lv_adm_coor_y = lv_sgg_coor_y;
			}
			if(lv_emdong_cd != "99") {
				lv_adm_coor_x = lv_emdong_coor_x;
				lv_adm_coor_y = lv_emdong_coor_y;
			}
			/*
			//지도 위치 초기화
			$statsMeMap.ui.mapMoveEventYn = "N";
			$statsMeMap.ui.map.mapMove([lv_adm_coor_x, lv_adm_coor_y], $statsMeMap.ui.map.zoom);
			//지도 페이지 아니면 위치를 저장
			if($statsMeMain.ui.currentPageName != "statsMeMap") {
				$statsMeMap.ui.pageLoadMapMoveYn = "Y";
				$statsMeMap.ui.pageLoadMapMoveX = lv_adm_coor_x;
				$statsMeMap.ui.pageLoadMapMoveY = lv_adm_coor_y;
				$statsMeMap.ui.pageLoadMapMoveZoom = null;
			}
			*/
			
			//카테고리 처음 조회시 지도 이동하게 초기화
			$statsMeMap.ui.mapFirstMoveYn = "Y";
			
			var obj = new sop.openApi.statsMe.statsMeMap.loadMapData();
			obj.addParam("stat_data_id", p_stat_data_id);
			obj.addParam("sido_cd", $("#statsMePopupArea_sido").val());
			obj.addParam("sgg_cd", $("#statsMePopupArea_sgg").val());
			obj.addParam("emdong_cd", $("#statsMePopupArea_emdong").val());
			
			//로딩바
			$statsMeMain.ui.loading(true);
			obj.request({
				method: "POST",
				//async: false,
				url: contextPath + "/ServiceAPI/statsMe/map/getStatsData.json"
			});
		},
		
		/**
		 * @name : setMapData
		 * @description : 지도 데이터 화면처리
		 * @date : 2019.08.21
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		setMapData : function() {
			//Validation
			if($statsMeMap.ui.mapData == null) {
				$statsMeMain.ui.alert("조회된 데이터가 없습니다.");
				return;
			}
			
			//변수
			var data = $statsMeMap.ui.mapData.data;
			
			//데이터 텍스트 매핑
			/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
			// $("#statsMeMapStatDataNm").html(data.stat_data_nm);
			// $("#statsMeMapStatDataNm2").html(data.stat_data_nm);
			$("#statsMeMapStatDataNm").html(data.stat_data_srv_nm);
			$("#statsMeMapStatDataNm2").html(data.stat_data_srv_nm);
			/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
			/** 2020.05.14[한광희] My통계로 신규 지표 추가로 인한 설명자료 값이 없을 경우 처리 START */
			//2020-02-18 [김남민] 설명자료 개행
			//$("#statsMeMapStatDataExp").html((""+data.stat_data_exp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>'));
			if(data.stat_data_exp != undefined){
				$("#statsMeMapStatDataExp").html((""+data.stat_data_exp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>'));
			}
			/** 2020.05.14[한광희] My통계로 신규 지표 추가로 인한 설명자료 값이 없을 경우 처리 END */
			
			/**  2020.05.19[한광희] 자료출처 클릭 시 e-지방지표 화면으로 이동할 수 있는 link 추가 START */
			// $("#statsMeMapSource").html("* 출처 : "+data.source);
			var sourceHtml = "";
			sourceHtml += "* 출처 : ";
			if(data.source_url != undefined){
				sourceHtml += "<a style='white-space: normal; word-break:keep-all; width: 260px; text-decoration: underline; text-underline-position: under; color:blue;' href='javascript:void(0);'>";
				sourceHtml += data.source;
				sourceHtml += "</a>";
			} else {
				sourceHtml += data.source;
			}
			$("#statsMeMapSource").html(sourceHtml);
			/**  2020.05.19[한광희] 자료출처 클릭 시 e-지방지표 화면으로 이동할 수 있는 link 추가 END */
			
			//대화형 통계지도 > e-지방지표
			//2020-02-18 [김남민] E지방지표 링크 기능 안됨 START
			/*
			if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
				//$("#statsMeMapGoDetail>a").css("text-decoration","none").css("cursor","default").css("color","#999");
				$("#statsMeMapGoDetail").addClass("hidden");
				$("#statsMeMapGoDetail>a").html("");
				//$("#statsMeMapGoDetail>a").html("<strong>"+data.menu_nm+"</strong>");
			}
			else {
			*/
				//$("#statsMeMapGoDetail>a").css("text-decoration","").css("cursor","").css("color","");
				$("#statsMeMapGoDetail").removeClass("hidden");
			
				/** 2019.12.03[한광희] 데이터보드 바로가기 폰트 사이즈 수정 START */
				if(data.menu_nm == "업종통계지도: 생활업종통계지도" || data.menu_nm == "업종통계지도: 기술업종통계지도") {
					$("#statsMeMapGoDetail>a").html("<strong style='font-size:13px;'>"+data.menu_nm+" 바로가기</strong>");
				} else {
					$("#statsMeMapGoDetail>a").html("<strong>"+data.menu_nm+" 바로가기</strong>");					
				}
				/** 2019.12.03[한광희] 데이터보드 바로가기 폰트 사이즈 수정 END */
			//}
			//2020-02-18 [김남민] E지방지표 링크 기능 안됨 END
			
			//지역경계 초기화
			$("#statsMeMapMapRegion>li").hide();
			//지역경계 시도표출여부
			if(data.sido_disp_yn == "Y") $("#statsMeMapMapRegion_sido").show();
			//지역경계 시군구표출여부
			if(data.sgg_disp_yn == "Y") $("#statsMeMapMapRegion_sgg").show();
			//지역경계 읍면동표출여부
			if(data.emdong_disp_yn == "Y") $("#statsMeMapMapRegion_emdong").show();
			//지역경계 소지역표출여부
			if(data.tot_reg_disp_yn == "Y") $("#statsMeMapMapRegion_totreg").show();
			
			//지도유형 초기화
			$("#statsMeMapMapType>li").hide();
			//$("#statsMeMapMapType_grid").hide();
			//지도유형 색상지도표출여부
			if(data.color_disp_yn == "Y") $("#statsMeMapMapType_color").show();
			//지도유형 버블지도표출여부
			if(data.balln_disp_yn == "Y") $("#statsMeMapMapType_bubble").show();
			//지도유형 열지도표출여부
			if(data.tp_disp_yn == "Y") $("#statsMeMapMapType_heat").show();
			//지도유형 POI지도표출여부
			if(data.poi_disp_yn == "Y") $("#statsMeMapMapType_poi").show();
			//지도유형 격자표출여부
			//if(data.grid_disp_yn == "Y") $("#statsMeMapMapType_grid").show();
			
			//지도 그리기
			var lv_map_region = "sido";
			var lv_map_type = "color";
			if(data.sido_disp_yn == "Y") lv_map_region = "sido";
			if(data.sgg_disp_yn == "Y") lv_map_region = "sgg";
			if(data.emdong_disp_yn == "Y") lv_map_region = "emdong";
			if(data.tot_reg_disp_yn == "Y") lv_map_region = "totreg";
			
			if(data.color_disp_yn == "Y") lv_map_type = "color";
			else if(data.balln_disp_yn == "Y") lv_map_type = "bubble";
			else if(data.tp_disp_yn == "Y") lv_map_type = "heat";
			else if(data.poi_disp_yn == "Y") lv_map_type = "poi";
			//else if(data.grid_disp_yn == "Y") lv_map_type = "grid";
			
			//즐겨찾기 조회
			if(gv_bookmark_yn == "Y" && gv_bookmark_params_info.map_use_yn == "N") {
				gv_bookmark_params_info.map_use_yn = "Y";
				lv_map_region = gv_bookmark_params_info.paramInfo.map_region;
				lv_map_type = gv_bookmark_params_info.paramInfo.map_type;
			}
			
			$statsMeMap.ui.drawMapData(lv_map_region, lv_map_type);
		},
		
		/**
		 * @name : drawMapData
		 * @description : 지도 데이터 그리기
		 * @date : 2019.08.22
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_map_region : 지역경계
		 * 		p_map_type : 지도유형
		 */
		drawMapData : function(p_map_region, p_map_type) {
			//전역 데이터 처리
			var lv_map_region_before = $statsMeMap.ui.mapRegion;
			var lv_map_type_before = $statsMeMap.ui.mapType;
			if(p_map_region == undefined || p_map_region == null) {
				p_map_region = $statsMeMap.ui.mapRegion;
			}
			else {
				$statsMeMap.ui.mapRegion = p_map_region;
			}
			if(p_map_type == undefined || p_map_type == null) {
				p_map_type = $statsMeMap.ui.mapType;
			}
			else {
				$statsMeMap.ui.mapType = p_map_type;
			}
			
			//버튼 CSS처리
			if(p_map_region != undefined && p_map_region != null) {
				$("#statsMeMapMapRegion>li").removeClass("current");
				$("#statsMeMapMapRegion_"+p_map_region).addClass("current");
			}
			if(p_map_type != undefined && p_map_type != null) {
				$("#statsMeMapMapType>li").removeClass("current");
				$("#statsMeMapMapType_"+p_map_type).addClass("current");
			}
			
			//현재위치 명칭
			$statsMeMain.ui.setPositionText();
			
			//조회변수
			var data = $statsMeMap.ui.mapData.data;
			
			//지역변수
			var lv_adm_cd = "00";
			var lv_adm_nm = "전국";
			var lv_adm_coor_x = 990480.875;
			var lv_adm_coor_y = 1815839.375;
			var lv_sido = $("#statsMePopupArea_sido");
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			var lv_sgg = $("#statsMePopupArea_sgg");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			var lv_emdong = $("#statsMePopupArea_emdong");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();
			var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
			
			//지역변수 데이터 정리
			if(lv_sido_cd != "99") {
				lv_adm_coor_x = lv_sido_coor_x;
				lv_adm_coor_y = lv_sido_coor_y;
			}
			if(lv_sgg_cd != "999") {
				lv_adm_coor_x = lv_sgg_coor_x;
				lv_adm_coor_y = lv_sgg_coor_y;
			}
			if(lv_emdong_cd != "99") {
				lv_adm_coor_x = lv_emdong_coor_x;
				lv_adm_coor_y = lv_emdong_coor_y;
			}
			if(lv_sido_cd == "99") lv_sido_cd = "00";
			lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
			lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
			if(lv_sido_cd == "99") lv_adm_cd = "00";
			else if(lv_sgg_cd == "999") lv_adm_cd = lv_sido_cd;
			else if(lv_emdong_cd == "99") lv_adm_cd = lv_sido_cd + lv_sgg_cd;
			if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
			else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
			else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
			
			//지도 Clear
			$statsMeMap.ui.clearMap($statsMeMap.ui.map);
			
			//색상/버블
			if(p_map_type == "color" || p_map_type == "bubble") {
				//legendBox 표시
				$("#legendBox_"+$statsMeMap.ui.map.legend.id).show();
				if(p_map_type == "color") $("#lgTypeList_"+$statsMeMap.ui.map.legend.id+">li:eq(1)>a").trigger("click");
				if(p_map_type == "bubble") $("#lgTypeList_"+$statsMeMap.ui.map.legend.id+">li:eq(2)>a").trigger("click");
				
				//색상/버블 (시도)
				if(p_map_region == "sido") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "sido", "", "", "", function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", lv_year, "", "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "sido", "color", "", "", "", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "stats_dta_co", lv_unit);
							
							//경계 그리기
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear(), "", "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					
					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove($statsMeMap.ui.mapCenterDefalut, 1);
						//$statsMeMap.ui.map.mapMove([$statsMeMain.ui.my_x, $statsMeMain.ui.my_y], 1);
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = $statsMeMap.ui.mapCenterDefalut[0];
							$statsMeMap.ui.pageLoadMapMoveY = $statsMeMap.ui.mapCenterDefalut[1];
							$statsMeMap.ui.pageLoadMapMoveZoom = 1;
						}
					}
				}
				//색상/버블 (시군구)
				else if(p_map_region == "sgg") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "sgg", lv_sido_cd, "", "", function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4); // 년도
							var lv_region = "sgg"; //비자치구 여부 체크
							if($statsMeMap.ui.ecountryMapping[data.stat_data_id].atdrc_yn == "Y") lv_region = "atdrc";
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, lv_region, lv_year, lv_sido_cd, "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "sgg", "color", lv_sido_cd, "", "", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "stats_dta_co", lv_unit);
							
							//경계 그리기
							var lv_region = "sgg"; //비자치구 여부 체크
							if(data.atdrc_yn != undefined && data.atdrc_yn != null && data.atdrc_yn == "Y") lv_region = "atdrc";
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, lv_region, $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					
					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sido_coor_x, lv_sido_coor_y] , 4);
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sido_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sido_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 4;
						}
					}
				}
				//색상/버블 (읍면동)
				else if(p_map_region == "emdong") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "emdong", lv_sido_cd, lv_sgg_cd, "", function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", lv_year, lv_sido_cd, lv_sgg_cd, "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "emdong", "color", lv_sido_cd, lv_sgg_cd, "", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd+lv_sgg_cd, "result" : p_list}, "stats_dta_co", lv_unit);
							
							//경계 그리기
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					
					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sgg_coor_x, lv_sgg_coor_y] , 6);
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sgg_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sgg_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 6;
						}
					}
				}
				//색상/버블 (소지역)
				else if(p_map_region == "totreg") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "totreg", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", lv_year, lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "totreg", "color", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}
							
							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd+lv_sgg_cd+lv_emdong_cd, "result" : p_list}, "stats_dta_co", lv_unit);
							
							//경계 그리기
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
							});
						});
					}
					
					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_emdong_coor_x, lv_emdong_coor_y] , 9);
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_emdong_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_emdong_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 9;
						}
					}
				}
				//색상/버블 (격자 100k)
				/*else if(p_map_region == "100k") {
					
				}*/
				//색상/버블 (격자 10k)
				/*else if(p_map_region == "10k") {
					
				}*/
				//색상/버블 (격자 1k)
				/*else if(p_map_region == "1k") {
					
				}*/
				//색상/버블 (격자 100m)
				/*else if(p_map_region == "100m") {
					
				}*/
			}
			//열지도
			else if(p_map_type == "heat") {
				//legendBox 표시
				$("#legendBox_"+$statsMeMap.ui.map.legend.id).show();
				$("#lgTypeList_"+$statsMeMap.ui.map.legend.id+">li:eq(4)>a").trigger("click");
				
				//데이터보드 데이터 보기 숨김
				$("#statsMeMapDataBoard_dataTable").hide();
				$("#statsMeMapDataBoard_dataTable_page").parent().hide();
				
				/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 START */
				// 상세보기화면 데이터 보기 숨김
				$("#statsMeDetailInfo_dataTable").hide();
				$("#statsMeDetailInfo_dataTable_page").parent().hide();
				/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 END */
				
				var lv_region_yn = "N";
				//지도이동
				if($statsMeMap.ui.mapFirstMoveYn == "Y") {
					lv_region_yn = "Y";
					
					//시도
					if(p_map_region == "sido") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove($statsMeMap.ui.mapCenterDefalut, 1);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "1";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = $statsMeMap.ui.mapCenterDefalut[0];
							$statsMeMap.ui.pageLoadMapMoveY = $statsMeMap.ui.mapCenterDefalut[1];
							$statsMeMap.ui.pageLoadMapMoveZoom = 1;
						}
					}
					//시군구
					else if(p_map_region == "sgg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sido_coor_x, lv_sido_coor_y] , 4);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "3";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sido_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sido_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 4;
						}
					}
					//읍면동
					else if(p_map_region == "emdong") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sgg_coor_x, lv_sgg_coor_y] , 6);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "4";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sgg_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sgg_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 6;
						}
					}
					//소지역
					else if(p_map_region == "totreg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_emdong_coor_x, lv_emdong_coor_y] , 9);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "5";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_emdong_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_emdong_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 9;
						}
					}
				}
				
				//heatMapPolygonCode
				$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
				
				//통계주제도
				if(data.menu_nm == "통계주제도") {
					var lv_region = "100m";
					
					//열지도 (격자 10k)
					if($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2") {
						lv_region = "10k";
					}
					//열지도 (격자 1k)
					else if($statsMeMap.ui.map.curPolygonCode == "3") {
						lv_region = "1k";
					}
					//열지도 (격자 100m)
					else if($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5") {
						lv_region = "100m";
					}
					
					//데이터 조회
					$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, lv_region, "heat", "", "", "", function(p_list) {
						if(lv_region_yn == "Y") {
							//지역경계
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear());
						}
						
						//최대값 계산
						var max = null;
						var tempData = [];
						var list = p_list;
						for (var i=0; i<list.length; i++) {
							tempData.push(list[i].stats_dta_co);
						}
						max = Math.max.apply(null, tempData);
						
						//열지도 데이터 입력
						for (var i=0; i<list.length; i++) {
							$statsMeMap.ui.map.addHeatMap(list[i].x_coor, list[i].y_coor, list[i].stats_dta_co);
						}
						
						//통계주제도 열지도 세팅
						if ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"){
							$statsMeMap.ui.map.zoomLevelHeat = true;
						} else {
							$statsMeMap.ui.map.zoomLevelHeat = false;
						}
						if($statsMeMap.ui.map.zoom <= 3) {
							$statsMeMap.ui.map.heatRadius = 15;
							$statsMeMap.ui.map.heatBlur = 30;
						} else if($statsMeMap.ui.map.zoom == 4) {
							$statsMeMap.ui.map.heatRadius = 20;
							$statsMeMap.ui.map.heatBlur = 30;
						} else if($statsMeMap.ui.map.zoom == 5) {
							$statsMeMap.ui.map.heatRadius = 35;
							$statsMeMap.ui.map.heatBlur = 60;
						} else if($statsMeMap.ui.map.zoom == 6) {
							$statsMeMap.ui.map.heatRadius = 20;
							$statsMeMap.ui.map.heatBlur = 70;
						} else if($statsMeMap.ui.map.zoom == 7 || $statsMeMap.ui.map.zoom == 8 || $statsMeMap.ui.map.zoom == 9) {
							$statsMeMap.ui.map.heatRadius = 25;
							$statsMeMap.ui.map.heatBlur = 80;
						}
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusSlider").slider("values", 0, $statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusText").text($statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurSlider").slider("values", 0, $statsMeMap.ui.map.heatBlur);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurText").text($statsMeMap.ui.map.heatBlur);
						$statsMeMap.ui.map.setHeatMapOptions($statsMeMap.ui.map.heatRadius, $statsMeMap.ui.map.heatBlur, max);
					});
				}
				//업종통계지도: 생활업종통계지도 > 개업현황 or 업종 밀집도 변화
				else if(data.menu_nm == "업종통계지도: 생활업종통계지도" && (data.srv_nm == "개업현황" || data.srv_nm == "업종 밀집도 변화")) {
					var lv_region = p_map_region;
					var lv_temp_sido_cd = lv_sido_cd;
					var lv_temp_sgg_cd = lv_sgg_cd;
					var lv_temp_emdong_cd = lv_emdong_cd;
					
					//열지도 (시도)
					if(lv_region == "sido") {
						lv_temp_sido_cd = "";
						lv_temp_sgg_cd = "";
						lv_temp_emdong_cd = "";
					}
					//열지도 (시군구)
					else if(lv_region == "sgg") {
						lv_temp_sgg_cd = "";
						lv_temp_emdong_cd = "";
					}
					//열지도 (읍면동)
					else if(lv_region == "emdong") {
						lv_temp_emdong_cd = "";
					}
					//열지도 (소지역)
					else if(lv_region == "totreg") {
						//데이터는 읍면동 데이터 사용함
						lv_region = "emdong";
					}
					
					//데이터 조회
					$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, lv_region, "heat", lv_temp_sido_cd, lv_temp_sgg_cd, lv_temp_emdong_cd, function(p_list) {
						//지역경계
						//열지도 (시도)
						if(p_map_region == "sido") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear());
						}
						//열지도 (시군구)
						else if(p_map_region == "sgg") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sgg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd);
						}
						//열지도 (읍면동)
						else if(p_map_region == "emdong") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd);
						}
						//열지도 (소지역)
						else if(p_map_region == "totreg") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd);
						}
						
						//최대값 계산
						var max = null;
						var tempData = [];
						var list = p_list;
						for (var i=0; i<list.length; i++) {
							tempData.push(list[i].stats_dta_co);
						}
						max = Math.max.apply(null, tempData);
						
						//열지도 데이터 입력
						for (var i=0; i<list.length; i++) {
							$statsMeMap.ui.map.addHeatMap(list[i].x_coor, list[i].y_coor, list[i].stats_dta_co);
						}
						
						//업종통계지도: 생활업종통계지도 열지도 세팅
						$statsMeMap.ui.map.heatRadius = 15;
						$statsMeMap.ui.map.heatBlur = 30;
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusSlider").slider("values", 0, $statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusText").text($statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurSlider").slider("values", 0, $statsMeMap.ui.map.heatBlur);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurText").text($statsMeMap.ui.map.heatBlur);
						if($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"|| $statsMeMap.ui.map.curPolygonCode == "5") {
							$statsMeMap.ui.map.zoomLevelHeat = false;
							$statsMeMap.ui.map.setHeatMapOptions($statsMeMap.ui.map.heatRadius, $statsMeMap.ui.map.heatBlur, max);
						}
						else {
							$statsMeMap.ui.map.zoomLevelHeat = true;
							$statsMeMap.ui.map.setHeatMapOptions($statsMeMap.ui.map.heatRadius, $statsMeMap.ui.map.heatBlur, 1);
						}
					});
				}
			}
			//POI
			else if(p_map_type == "poi") {
				//legendBox 숨김
				$("#legendBox_"+$statsMeMap.ui.map.legend.id).hide();
				
				//데이터보드 데이터 보기 숨김
				$("#statsMeMapDataBoard_dataTable").hide();
				$("#statsMeMapDataBoard_dataTable_page").parent().hide();
				
				/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 START */
				// 상세정보화면 데이터 보기 숨김
				$("#statsMeDetailInfo_dataTable").hide();
				$("#statsMeDetailInfo_dataTable_page").parent().hide();
				/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 END */
				
				//지도이동
				if($statsMeMap.ui.mapFirstMoveYn == "Y") {
					//시도
					if(p_map_region == "sido") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove($statsMeMap.ui.mapCenterDefalut, 1);
						$statsMeMap.ui.poiMapPolygonCode = "1";
						$statsMeMap.ui.map.curPolygonCode = "1";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = $statsMeMap.ui.mapCenterDefalut[0];
							$statsMeMap.ui.pageLoadMapMoveY = $statsMeMap.ui.mapCenterDefalut[1];
							$statsMeMap.ui.pageLoadMapMoveZoom = 1;
						}
					}
					//시군구
					else if(p_map_region == "sgg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sido_coor_x, lv_sido_coor_y] , 4);
						$statsMeMap.ui.poiMapPolygonCode = "3";
						$statsMeMap.ui.map.curPolygonCode = "3";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sido_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sido_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 4;
						}
					}
					//읍면동
					else if(p_map_region == "emdong") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sgg_coor_x, lv_sgg_coor_y] , 6);
						$statsMeMap.ui.poiMapPolygonCode = "4";
						$statsMeMap.ui.map.curPolygonCode = "4";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sgg_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sgg_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 6;
						}
					}
					//소지역
					else if(p_map_region == "totreg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_emdong_coor_x, lv_emdong_coor_y] , 9);
						$statsMeMap.ui.poiMapPolygonCode = "5";
						$statsMeMap.ui.map.curPolygonCode = "5";
						
						//지도 페이지 아니면 위치를 저장
						if($statsMeMain.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_emdong_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_emdong_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 9;
						}
					}
				}
				
				//업종통계지도: 생활업종통계지도 > 개업현황 (시도, 시군구 제외)
				if(data.menu_nm == "업종통계지도: 생활업종통계지도" && data.srv_nm == "개업현황"
					&& (p_map_region == "sido" || p_map_region == "sgg")
				) {
					//2020-02-28 [김남민] 통계로-49 : 업종통계지도 열지도 및 POI 표출 기준 변경
					$statsMeMap.ui.drawMapData(p_map_region,"heat");
					return;
				}
				//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화 (시도, 시군구, 읍면동 제외)
				if(data.menu_nm == "업종통계지도: 생활업종통계지도" && data.srv_nm == "업종 밀집도 변화"
					&& (p_map_region == "sido" || p_map_region == "sgg" || p_map_region == "emdong")
				) {
					//2020-02-28 [김남민] 통계로-49 : 업종통계지도 열지도 및 POI 표출 기준 변경
					$statsMeMap.ui.drawMapData(p_map_region,"heat");
					return;
				}
				
				//시도
				if(p_map_region == "sido") {
					//시도경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear(), "", "", "", function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", "", "", "", function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
				//시군구
				else if(p_map_region == "sgg") {
					//시군구경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sgg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, "", "", function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", lv_sido_cd, "", "", function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
				//읍면동
				else if(p_map_region == "emdong") {
					//읍면동경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, "", function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", lv_sido_cd, lv_sgg_cd, "", function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
				//소지역
				else if(p_map_region == "totreg") {
					//소지역경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
			}
			
			/* 기타 처리 */
			//통계주제도
			if(data.menu_nm == "통계주제도") {
				
			}
			//정책통계지도
			else if(data.menu_nm == "정책통계지도") {
				
			}
			//일자리 맵
			else if(data.menu_nm == "일자리 맵") {
				
			}
			//업종통계지도: 생활업종통계지도
			else if(data.menu_nm == "업종통계지도: 생활업종통계지도") {
				
			}
			//업종통계지도: 기술업종통계지도
			else if(data.menu_nm == "업종통계지도: 기술업종통계지도") {
				
			}
			//살고싶은 우리동네
			else if(data.menu_nm == "살고싶은 우리동네") {
				
			}
			//대화형 통계지도
			else if(data.menu_nm == "대화형 통계지도") {
				
			}
		},
	    
		/**
		 * 
		 * @name         : setStatsDataEcountry
		 * @description  : 지도 데이터 가져오기 (대화형 통계지도 > e-지방지표)
		 * @date         : 2019. 10. 15. 
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 * 		p_map : 지도
		 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
		 * 		p_sido_cd : 시도 코드 (옵션)
		 * 		p_sgg_cd : 시군구 코드 (옵션)
		 * 		p_emdong_cd : 읍면동 코드 (옵션)
		 * 		p_callback : 콜백 함수
		 */
		setStatsDataEcountry : function(p_map, p_region, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
			//로딩바 표시
			if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
				$statsMeMain.ui.loading(true);
			}
			if($("#"+p_map.id+"_loading").length) {
				$("#"+p_map.id+"_loading").show();
			}
			
			//변수 선언
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_stat_data_id = lv_data.stat_data_id;
			
			//adm_cd
			var lv_adm_cd = "00";
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
				}
			}
			
			//기존에 저장된 정보 있음
			if($statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd] != undefined) {
				setTimeout(function() {
					//데이터 입력
					p_map.setStatsData(
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].type,
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].data,
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].showData,
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].unit
					);
					
					//로딩바 숨김
					if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
						$statsMeMain.ui.loading(false);
					}
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback();
					}
				}, 0);
			}
			//기존에 저장된 정보 없음
			else {
				//url 파라미터 세팅
				var lv_url = contextPath + "/view/ecountry/getData.json";
				lv_url += "?tbl_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].tbl_id;
				lv_url += "&base_item_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].base_item_id;
				if($statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id != undefined && $statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id != null && $statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id != "") {
					lv_url += "&add_item_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id;
				}
				lv_url += "&prd_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prd_id;
				lv_url += "&prid_value="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value;
				lv_url += "&adm_cd="+lv_adm_cd;
				
				// ajax 시작
				$.ajax({
				    url: lv_url,
				    type: 'get'
				}).done(function (res) { // 완료
					var lv_result_list = res.result.data;
					var unit = res.result.unit;
					if(unit == undefined || unit == null || unit == "") {
						unit = "수";
					}
					//%제외 하고 5미만 N/A 처리
					/*if(unit.indexOf("%") == -1 && unit.indexOf("율") == -1 && unit.indexOf("률") == -1 && unit.indexOf("℃") == -1) {
						if(lv_result_list != null && lv_result_list.length > 0) {
							for(var i = 0; i < lv_result_list.length; i++) {
								if(lv_result_list[i].data_value < 5) {
									lv_result_list[i].data_value = 0;
								}
							}
						}
					}*/
					
					//정보 저장
					$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd] = {
						type : "normal",
						data : {"pAdmCd": lv_adm_cd, "result" : lv_result_list},
						showData : "data_value",
						unit : unit
					};
					
					//데이터 입력
					p_map.setStatsData("normal", {"pAdmCd": lv_adm_cd, "result" : lv_result_list}, "data_value", unit);
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//로딩바 숨김
					if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
						$statsMeMain.ui.loading(false);
					}
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback();
					}
				});
				// ajax 끝
			}
		},
		
		/**
		 * 
		 * @name         : setStatsDataOne
		 * @description  : 지도 데이터 가져오기
		 * @date         : 2019. 10. 15. 
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 * 		p_map : 지도
		 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
		 * 		p_type : 유형 (color/heat/poi) (색상(버블)/열지도/POI)
		 * 		p_sido_cd : 시도 코드 (옵션)
		 * 		p_sgg_cd : 시군구 코드 (옵션)
		 * 		p_emdong_cd : 읍면동 코드 (옵션)
		 * 		p_callback : 콜백 함수
		 */
		setStatsDataOne : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
			//로딩바 표시
			if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
				$statsMeMain.ui.loading(true);
			}
			if($("#"+p_map.id+"_loading").length) {
				$("#"+p_map.id+"_loading").show();
			}
			
			//변수 선언
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_stat_data_id = lv_data.stat_data_id;
			
			//adm_cd
			var lv_adm_cd = "00";
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
				}
			}
			
			//기존에 저장된 정보 있음
			if($statsMeMap.ui.mapStatsData[lv_stat_data_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] != undefined) {
				setTimeout(function() {
					//로딩바 숨김
					if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
						$statsMeMain.ui.loading(false);
					}
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback($statsMeMap.ui.mapStatsData[lv_stat_data_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd]);
					}
				}, 0);
			}
			//기존에 저장된 정보 없음
			else {
				//파라미터
				var lv_params = {};
				lv_params.stat_data_id = lv_stat_data_id;
				if(p_type != undefined && p_type != null && p_type != "") lv_params.map_ty = p_type;
				//p_region : poi는 기본적으로 all이지만 열지도는 all이 아니므로 all일때는 그냥 파라미터 제외함.
				if(p_region != undefined && p_region != null && p_region != "" && p_region != "all") lv_params.area_bndry_se = p_region;
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") lv_params.sido_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") lv_params.sgg_cd = p_sgg_cd;
				if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_params.emdong_cd = p_emdong_cd;
				
				//데이터 마트로 조회
				//var lv_url = contextPath+"/ServiceAPI/statsMe/map/getStatsDataOne.json";
				//원 테이블로 조회
				var lv_url = contextPath+"/ServiceAPI/statsMe/map/getStatsDataOne2.json";
				//일자리 보기는 원 테이블로 조회
				if(lv_data.menu_nm == "일자리 맵" && lv_data.srv_nm == "일자리보기") {
					lv_url = contextPath+"/ServiceAPI/statsMe/map/getStatsDataOne2.json";
				}
				// ajax 시작
				$.ajax({
					url: lv_url,
				    type: 'post',
				    data: lv_params
				}).always(function(res) { // 전 처리
					//로딩바 숨김
					if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
						$statsMeMain.ui.loading(false);
					}
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
				}).done(function (res) { // 완료
					//정보 저장
					$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = res.result.list;
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback(res.result.list);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				});
				// ajax 끝
			}
		},
		
		/**
		 * 
		 * @name         : getStatsRegionYear
		 * @description  : 지도 경계 년도 가져오기
		 * @date         : 2019. 08. 23. 
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 */
		getStatsRegionYear : function() {
			if($statsMeMap.ui.mapData == null) {
				return bndYear;
			}
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_year = bndYear;
			if(lv_data.stat_data_base_year != undefined && lv_data.stat_data_base_year != null && lv_data.stat_data_base_year != "" && (""+lv_data.stat_data_base_year).length > 4) {
				lv_year = lv_data.stat_data_base_year.substr(0,4);
				if($.isNumeric(lv_year) == false) {
					if(lv_data.base_year != undefined && lv_data.base_year != null && lv_data.base_year != "") {
						lv_year = lv_data.base_year;
					}
					else {
						lv_year = bndYear;
					}
				}
			}
			else if(lv_data.base_year != undefined && lv_data.base_year != null && lv_data.base_year != "") {
				lv_year = lv_data.base_year;
			}
			return lv_year;
		},
		
		/**
		 * 
		 * @name         : setStatsRegion
		 * @description  : 지도 경계 그리기
		 * @date         : 2019. 08. 23. 
		 * @author	     : 김남민
		 * @history 	 : 
		 * @param
		 * 		p_map : 지도 객체
		 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
		 * 		p_base_year : 대상년도 (옵션)
		 * 		p_sido_cd : 시도 코드 (옵션)
		 * 		p_sgg_cd : 시군구 코드 (옵션)
		 * 		p_emdong_cd : 읍면동 코드 (옵션)
		 * 		p_callback : 콜백 함수
		 */
		setStatsRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
			//년도 입력이 들어왔는데 bndYear 보다 큰 경우 bndYear 사용 
			if(p_base_year != undefined && p_base_year != null && p_base_year != "" && p_base_year > bndYear) {
				p_base_year = bndYear;
			}
			//시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
			if(p_region == "sido") {
				//년도 입력 안들어온경우 common.js bndYear 사용
				if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
					p_base_year = bndYear;
				}
			}
			
			//로딩바 표시
			if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
				$statsMeMain.ui.loading(true);
			}
			if($("#"+p_map.id+"_loading").length) {
				$("#"+p_map.id+"_loading").show();
			}
			
			//이미 불러온 정보는 다시 불러오지 않게 처리
			var lv_adm_cd = "00";
			var lv_year = "max";
			if(p_base_year != undefined && p_base_year != null && p_base_year != "") {
				lv_year = p_base_year;
			}
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
				}
			}
			//기존에 저장된 정보 있음
			if($statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] != undefined) {
				setTimeout(function() {
					//경계 데이터 생성
					var lv_res = {
						type : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].type,
						id : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].id,
						errMsg : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].errMsg,
						errCd : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].errCd,
						trId : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].trId,
						ts : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].ts,
						pAdmCd : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].pAdmCd
					};
					var lv_features = [];
					for(var i = 0; i < $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features.length; i++) {
						lv_features.push({
							type : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features[i].type,
							geometry : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features[i].geometry,
							properties : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features[i].properties
						});
					}
					lv_res.features = lv_features;
					
					//지도에 경계 그리기
					p_map.setPolygonDataGeojson(lv_res);
					
					//로딩바 숨김
					if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
						$statsMeMain.ui.loading(false);
					}
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
					
					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback();
					}
				}, 0);
			}
			//기존에 저장된 정보 없음
			else {
				//시도 인 경우 데이터 양이 많아 속도가 느려지므로 geo_sido_xxxx.js 사용
				if(p_region == "sido") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = bndYear;
					}
					
					//시도경계 불러오기
					p_map.openApiBoundarySido(p_base_year, function(p_map2, p_res) {
						//정보 저장
						$statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = p_res;
						
						//로딩바 숨김
						if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
							$statsMeMain.ui.loading(false);
						}
						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}
						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
					});
				}
				//시도 이외의 경계 데이터 조회
				else {
					var params = {};
					params.region = p_region;
					if(p_base_year != undefined && p_base_year != null && p_base_year != "") params.base_year = p_base_year; 
					if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") params.sido_cd = p_sido_cd; 
					if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") params.sgg_cd = p_sgg_cd; 
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") params.emdong_cd = p_emdong_cd;
					
					// ajax 시작
					$.ajax({
					    url: contextPath + "/ServiceAPI/statsMe/map/getStatsRegion.geojson",
					    type: 'get',
					    data: params
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							//지역모드세팅
							res.pAdmCd = "00";
							if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") res.pAdmCd = p_sido_cd; 
							if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") res.pAdmCd += p_sgg_cd; 
							if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") res.pAdmCd += p_emdong_cd;
							
							//정보 저장
							$statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = res;
							
							//경계그리기
							p_map.setPolygonDataGeojson(res);
						}else if(res.errCd == "-401") {
							//$statsMeMain.ui.alert(res.errMsg);
						}else{
							//$statsMeMain.ui.alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						//$statsMeMain.ui.alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						//로딩바 숨김
						if($statsMeMain.ui.currentPageName == "statsMeMap" && p_map.id == "statsMeMapMap") {
							$statsMeMain.ui.loading(false);
						}
						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}
						
						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
					});
					// ajax 끝
				}
			}
		},
		
		/**
		 * 
		 * @name         : createInfoTooltip
		 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
		 * @date         : 2015. 10. 12. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param event  : 선택된 경계레이어
		 * @param data   : 선택된 경계레이어의 데이터정보
		 */
		createInfoTooltip : function(p_event, p_data, p_type, p_map) {
			//변수
			var lv_data = $statsMeMap.ui.mapData.data;
			
			// HTML 생성
			var lv_html = "<table style='margin:10px;'>";
			lv_html += "<tr><td colspan='3' class='admName' style='font-size: 14px; font-weight: bold; color: #3792de;'>";
			lv_html += p_data.properties.adm_nm; 
			lv_html += "</td></tr>";
			if (p_type != "polygon") {
				lv_html += "<tr style='height:5px'></tr>";
			}
			
			// 집계구 정보
			var lv_adm_cd = p_data.properties.adm_cd;
			if(lv_adm_cd != undefined && lv_adm_cd != null && lv_adm_cd.length == 13) {
				if (p_type == "polygon") {
					lv_html += "<tr style='height:5px'></tr>";
				}
				lv_html += "<tr><td class='statsData' style='font-size: 12px; padding-left: 5px;'>집계구 : "+lv_adm_cd+"</td></tr>";
			}
			
			// 데이터
			if (p_type != "polygon") {
				lv_html += "<tr>";
				if(p_data.info != null && p_data.info.length > 0) {
					var lv_title = "";
					if(p_data.info[0].tooltip_cn != undefined && p_data.info[0].tooltip_cn != null && p_data.info[0].tooltip_cn != "") lv_title += (""+p_data.info[0].tooltip_cn).replace(lv_title,"").trim();
					//2019-02-19 [김남민] e-지방지표 툴팁 수정. START
					try {
						if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "e-지방지표") {
							var lv_ecountry_map = $statsMeMap.ui.ecountryMapping[$statsMeMap.ui.mapData.data.stat_data_id];
							lv_title = lv_ecountry_map.base_item_nm;
						}
					} catch(e) { }
					//2019-02-19 [김남민] e-지방지표 툴팁 수정. END
					var lv_value = ""+appendCommaToNumber(parseFloat(p_data.info[0][p_data.info[0].showData]));
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
					if(lv_title != "") {
						lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>"+lv_title+"</td>";
						lv_html += "<td>&nbsp;:&nbsp;</td>";
					}
					lv_html += "<td>";
					lv_html += lv_value;
					if(p_data.info[0].unit != undefined && p_data.info[0].unit != null && p_data.info[0].unit != "") {
						lv_html += " ("+ p_data.info[0].unit +")";
					}
					lv_html += "</td>";
				} else {
					lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>N/A</td>";
				}
				lv_html += "</tr>";
			}
			lv_html += "</table>";
			
			//통계주제도
			if(lv_data.menu_nm == "통계주제도") {
				
			}
			//정책통계지도
			else if(lv_data.menu_nm == "정책통계지도") {
				
			}
			//일자리 맵
			else if(lv_data.menu_nm == "일자리 맵") {
				
			}
			//업종통계지도: 생활업종통계지도
			else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도") {
				
			}
			//업종통계지도: 기술업종통계지도
			else if(lv_data.menu_nm == "업종통계지도: 기술업종통계지도") {
				
			}
			//살고싶은 우리동네
			else if(lv_data.menu_nm == "살고싶은 우리동네") {
				
			}
			//대화형 통계지도
			else if(lv_data.menu_nm == "대화형 통계지도") {
				
			}
			
			// HTML 화면표시
			p_event.target.bindToolTip(lv_html, {
				direction: 'right',
				noHide:true,
				opacity: 1

			}).addTo(p_map.gMap)._showToolTip(p_event);
		},
		
		/**
	     * 
	     * @name         : drawBubbleMap
	     * @description  : 버블지도를 생성한다. (Override)
	     * @date         : 2019. 09. 02. 
	     * @author	     : 김남민
	     * @history 	 :
	     * @param geojson : 경계데이터
	     */
	    drawBubbleMap : function(geojson) {
	    	if (geojson == null) {
	    		return;
	    	} 
	    	var that = $statsMeMap.ui.map.legend;
	    			
		    geojson.eachLayer(function(layer) {
		    	var info = null;
		    	var data = null;
		    	var unit = null;
		    	var toolTip = "";
		    	var color = layer.options.fillColor;
		    	var idx = 0;
		    	var x = layer.feature.properties.x;
		    	var y = layer.feature.properties.y;
		    	var adm_nm = layer.feature.properties.adm_nm;
		    	if (layer.feature.info.length > 0) {
	    			info = layer.feature.info[0];		    			
	    			data = info[info.showData];
			    	unit = info.unit;
			    	
			    	var lv_title = "";
					if(info.tooltip_cn != undefined && info.tooltip_cn != null && info.tooltip_cn != "") lv_title += (""+info.tooltip_cn).replace(lv_title,"").trim();
					var lv_value = ""+appendCommaToNumber(parseFloat(info[info.showData]));
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
			    	toolTip  = "<div style='margin:10px;'>";
			    	toolTip += "<div style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</div>";
			    	toolTip += "<div style='height:5px;'></div>";
			    	if(lv_title != "") {
			    		toolTip += "<div style='font-size:12px;padding-left:5px;'>"+lv_title+" : "+lv_value+" ("+unit+")</div>";
			    	} else {
			    		toolTip += "<div style='font-size:12px;padding-left:5px;'>"+lv_value+" ("+unit+")</div>";
			    	}
	    			toolTip += "</div>";
			    		
		    		if (that.legendType == "negative") {
		    			that.legendColor = that.negativeLegendColor;
		    		}
		    		
			    	for (var i=0; i<that.legendColor.length; i++) {
			    		if (color == that.legendColor[i]) {
			    			idx = i;
			    			break;
			    		}
			    	}
			    	
			    	var marker = $statsMeMap.ui.map.addCircleMarker(x, y, {
			    		radius : that.legendCircleRadius[idx],
			    		fillColor : color,
			    		color : "white",
			    		weight : 1,
			    		tooltipMsg : toolTip,
			    		options : {
			    			idx : idx,
			    			data : data
			    		}
			    	});
			    	that.circleMarkerGroup.push(marker);
		    	}
		    });	 
	    },
		
		/**
	     * 
	     * @name         : doBookMark
	     * @description  : 즐겨찾기를 생성한다.
	     * @date         : 2019. 09. 27. 
	     * @author	     : 김남민
	     * @history 	 :
	     * @param p_hist_type : SHARE : 공유, BMARK : 즐겨찾기
	     * @param p_callback : 콜백 함수
	     */
	    doBookMark : function(p_hist_type, p_callback) {
	    	//로딩바 표시
	    	$statsMeMain.ui.loading(true);
	    	
			//변수
			var data = $statsMeMap.ui.mapData.data;
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();
			var lv_x = $statsMeMap.ui.map.gMap.getCenter().x;
			var lv_y = $statsMeMap.ui.map.gMap.getCenter().y;
			//읍면동 x, y 죄표 사용
			var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
			lv_x = lv_emdong_coor_x;
			lv_y = lv_emdong_coor_y;
			var lv_zoom = $statsMeMap.ui.map.zoom;
			
			//즐겨찾기 테이블에 등록
			var lv_params = {};
			var lv_hist_id = makeRandomThirtySevenDigitString();
			lv_params.hist_id = lv_hist_id;
			lv_params.hist_type = p_hist_type; // SHARE : 공유, BMARK : 즐겨찾기
			//2020-01-31 [김남민] 통계Me => My통계로 명칭 변경. START
			/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
			// lv_params.hist_nm = "My통계로 : "+data.stat_data_nm;
			lv_params.hist_nm = "My통계로 : "+data.stat_data_srv_nm;
			/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
			lv_params.map_type = "STME"; // My통계로
			//2020-01-31 [김남민] 통계Me => My통계로 명칭 변경. END
			lv_params.params = JSON.stringify([{
				"params": {
					"mapInfo": {
						"zoomlevel": lv_zoom,
						"center": [lv_x, lv_y]
					},
					"paramInfo": {
						"page": $statsMeMain.ui.currentPageName,
						"stat_data_id": data.stat_data_id,
						/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
						// "stat_data_nm": data.stat_data_nm,
						"stat_data_srv_nm": data.stat_data_srv_nm,
						/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
						"map_region": $statsMeMap.ui.mapRegion,
						"map_type": $statsMeMap.ui.mapType,
						"sido_cd": lv_sido_cd,
						"sido_nm": lv_sido_nm,
						"sgg_cd": lv_sgg_cd,
						"sgg_nm": lv_sgg_nm,
						"emdong_cd": lv_emdong_cd,
						"emdong_nm": lv_emdong_nm,
						"x": lv_x,
						"y": lv_y
					}
				}
			}]);
			// ajax 시작
			$.ajax({
			    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
			    type: 'post',
			    async : false,
			    data: lv_params
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					
				}else if(res.errCd == "-401") {
					//$statsMeMain.ui.alert(res.errMsg);
				}else{
					//$statsMeMain.ui.alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//$statsMeMain.ui.alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				$statsMeMain.ui.loading(false);
			});
			// ajax 끝
			
			//지도 이미지 캡쳐
			//지도 화면 아닌 경우 전 처리(지도 div가 display block 상태에서 지도를 불러와야 화면 안깨짐)
			var lvStatsMeMapShowYn = "Y";
			if($("#statsMeMap").css("display") == "none") {
				lvStatsMeMapShowYn = "N";
			}
			if(lvStatsMeMapShowYn == "N") {
				$("#statsMeMap").parent().css("overflow","hidden");
				$("#statsMeMap").children("div").css("top", "-"+$(window).outerHeight(true)+"px");
				$("#statsMeMap").show();
			}
			
			//로딩바 표시
	    	$statsMeMain.ui.loading(true);
	    	
	    	//이미지 캡쳐
			$statsMeMap.ui.doCapture("#statsMeMapMap", function(data) {
				var saveData =  data.replace(/^data:image\/(png|jpg);base64,/, '');
				var base64ImageContent = saveData.replace(/^data:image\/(png|jpg);base64,/, "");				
				var formData = new FormData();
				formData.append('fileName', lv_hist_id);
				formData.append('type', 'bookMark');
				formData.append('data', base64ImageContent); 
				
				$.ajax({
				    url: contextPath +"/ServiceAPI/gallery/urlMakeBase64.json",
				    data: formData,
				    type: 'POST',
				    contentType: false,
				    processData: false,
				    complete : function() {
				    	//로딩바 숨김
				    	$statsMeMain.ui.loading(false);
				    	
				    	//지도 화면 아닌 경우 후 처리
						if(lvStatsMeMapShowYn == "N") {
							$("#statsMeMap").hide();
							$("#statsMeMap").children("div").css("top", "");
							$("#statsMeMap").parent().css("overflow","");
						}
				    	
				    	//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback(lv_hist_id);
						}
				    }
				});
			});
			
			return lv_hist_id;
	    },
	    
	    /**
	     * 
	     * @name         : doCapture
	     * @description  : 지도이미지를 캡쳐한다.
	     * @date         : 2019. 10. 01.
	     * @author	     : 김남민
	     * @history 	 :
	     * @param targetId : 캡쳐 엘리먼트 아이디
		 * @param callback : 콜백함수
	     */
	    doCapture : function(targetId, callback) {
	    	html2canvas($(targetId)[0], {
				logging: false,
				useCORS: false,
				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
			}).then(function(canvas) {
    	        var data = canvas.toDataURL();  
				if (callback != undefined && callback != null && callback instanceof Function) {
					callback.call(undefined, data);
				}
	    	});
	    },
	    
	    /**
	     * 
	     * @name         : doPrint
	     * @description  : 보고서를 실행한다.
	     * @date         : 2019. 10. 02. 
	     * @author	     : 김남민
	     * @history 	 : 
	     * @param		 : 
	     */
	    doPrint : function() {
	    	//Validation
			if($statsMeMap.ui.mapData == null) {
				$statsMeMain.ui.alert("조회된 데이터가 없습니다.");
				return;
			}
			
	    	//지도 화면
	    	if($statsMeMain.ui.currentPageName == "statsMeMap") {
	    		//변수 생성
	    		var lv_hist_id = makeRandomThirtySevenDigitString();
	    		
	    		//로딩바2 표시
		    	$statsMeMain.ui.loading2(true, "보고서를 준비중입니다.");
		    	
		    	//이미지 캡쳐
				$statsMeMap.ui.doCapture("#statsMeMapMap", function(data) {
					//데이터 입력
					$("#statsMeDetailInfoPrintForm_image").val(data);
					
					//로딩바2 숨김
			    	$statsMeMain.ui.loading2(false);
			    	
					//보고서 팝업 호출
					$statsMeMap.ui.reportPopup = window.open("/js/statsMe/report/reportForm.html", "reportPrint","width=850, height=700, scrollbars=yes");
				});
	    	}
	    	//상세보기 화면
	    	else if($statsMeMain.ui.currentPageName == "statsMeDetailInfo") {
	    		//변수 생성
	    		var lv_hist_id = makeRandomThirtySevenDigitString();
	    		var lv_data = $statsMeMap.ui.mapData.data; 
	    		var lv_color_sido_yn = "N";
	    		var lv_color_sgg_yn = "N";
	    		var lv_color_emdong_yn = "N";
	    		var lv_color_totreg_yn = "N";
	    		var lv_color_100m_yn = "N";
	    		
	    		//로딩바2 표시
		    	$statsMeMain.ui.loading2(true, "보고서를 준비중입니다.");
		    	
	    		//이미지 캡쳐
		    	//색상 시도
				if(lv_data.color_disp_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn != "Y" && lv_data.tot_reg_disp_yn != "Y" && lv_data.grid_disp_yn != "Y") {
					$("#statsMeDetailInfoPrintForm_color_sido_yn").val("Y");
					//이미지 캡쳐
					$statsMeMap.ui.doCapture("#statsMeDetailInfoMap_color_sido", function(data) {
						$("#statsMeDetailInfoPrintForm_color_sido_image").val(data);
						lv_color_sido_yn = "Y";
				    	if(lv_color_sido_yn == "Y" && lv_color_sgg_yn == "Y" && lv_color_emdong_yn == "Y" && lv_color_totreg_yn == "Y" && lv_color_100m_yn == "Y") {
				    		//로딩바2 숨김
					    	$statsMeMain.ui.loading2(false);
					    	
					    	//보고서 팝업 호출
					    	$statsMeDetailInfo.ui.reportPopup = window.open("/js/statsMe/report/reportForm2.html", "reportPrint","width=850, height=700, scrollbars=yes");
					    	return;
				    	}
					});
				}
				else {
					$("#statsMeDetailInfoPrintForm_color_sido_yn").val("N");
					lv_color_sido_yn = "Y";
				}
		    	//색상 시군구
				if(lv_data.color_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y") {
					$("#statsMeDetailInfoPrintForm_color_sgg_yn").val("Y");
					//이미지 캡쳐
					$statsMeMap.ui.doCapture("#statsMeDetailInfoMap_color_sgg", function(data) {
						$("#statsMeDetailInfoPrintForm_color_sgg_image").val(data);
						lv_color_sgg_yn = "Y";
						if(lv_color_sido_yn == "Y" && lv_color_sgg_yn == "Y" && lv_color_emdong_yn == "Y" && lv_color_totreg_yn == "Y" && lv_color_100m_yn == "Y") {
				    		//로딩바2 숨김
					    	$statsMeMain.ui.loading2(false);
					    	
					    	//보고서 팝업 호출
					    	$statsMeDetailInfo.ui.reportPopup = window.open("/js/statsMe/report/reportForm2.html", "reportPrint","width=850, height=700, scrollbars=yes");
					    	return;
				    	}
					});
				}
				else {
					$("#statsMeDetailInfoPrintForm_color_sgg_yn").val("N");
					lv_color_sgg_yn = "Y";
				}
				//색상 읍면동
				if(lv_data.color_disp_yn == "Y" && lv_data.emdong_disp_yn == "Y") {
					$("#statsMeDetailInfoPrintForm_color_emdong_yn").val("Y");
					//이미지 캡쳐
					$statsMeMap.ui.doCapture("#statsMeDetailInfoMap_color_emdong", function(data) {
						$("#statsMeDetailInfoPrintForm_color_emdong_image").val(data);
						lv_color_emdong_yn = "Y";
						if(lv_color_sido_yn == "Y" && lv_color_sgg_yn == "Y" && lv_color_emdong_yn == "Y" && lv_color_totreg_yn == "Y" && lv_color_100m_yn == "Y") {
				    		//로딩바2 숨김
					    	$statsMeMain.ui.loading2(false);
					    	
					    	//보고서 팝업 호출
					    	$statsMeDetailInfo.ui.reportPopup = window.open("/js/statsMe/report/reportForm2.html", "reportPrint","width=850, height=700, scrollbars=yes");
					    	return;
				    	}
					});
				}
				else {
					$("#statsMeDetailInfoPrintForm_color_emdong_yn").val("N");
					lv_color_emdong_yn = "Y";
				}
				//색상 소지역
				if(lv_data.color_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "Y") {
					$("#statsMeDetailInfoPrintForm_color_totreg_yn").val("Y");
					//이미지 캡쳐
					$statsMeMap.ui.doCapture("#statsMeDetailInfoMap_color_totreg", function(data) {
						$("#statsMeDetailInfoPrintForm_color_totreg_image").val(data);
						lv_color_totreg_yn = "Y";
						if(lv_color_sido_yn == "Y" && lv_color_sgg_yn == "Y" && lv_color_emdong_yn == "Y" && lv_color_totreg_yn == "Y" && lv_color_100m_yn == "Y") {
				    		//로딩바2 숨김
					    	$statsMeMain.ui.loading2(false);
					    	
					    	//보고서 팝업 호출
					    	$statsMeDetailInfo.ui.reportPopup = window.open("/js/statsMe/report/reportForm2.html", "reportPrint","width=850, height=700, scrollbars=yes");
					    	return;
				    	}
					});
				}
				else {
					$("#statsMeDetailInfoPrintForm_color_totreg_yn").val("N");
					lv_color_totreg_yn = "Y";
				}
				//색상 격자(100m)
				if(lv_data.color_disp_yn == "Y" && lv_data.grid_disp_yn == "Y") {
					$("#statsMeDetailInfoPrintForm_color_100m_yn").val("Y");
					//이미지 캡쳐
					$statsMeMap.ui.doCapture("#statsMeDetailInfoMap_color_100m", function(data) {
						$("#statsMeDetailInfoPrintForm_color_100m_image").val(data);
						lv_color_100m_yn = "Y";
						if(lv_color_sido_yn == "Y" && lv_color_sgg_yn == "Y" && lv_color_emdong_yn == "Y" && lv_color_totreg_yn == "Y" && lv_color_100m_yn == "Y") {
				    		//로딩바2 숨김
					    	$statsMeMain.ui.loading2(false);
					    	
					    	//보고서 팝업 호출
					    	$statsMeDetailInfo.ui.reportPopup = window.open("/js/statsMe/report/reportForm2.html", "reportPrint","width=850, height=700, scrollbars=yes");
					    	return;
				    	}
					});
				}
				else {
					$("#statsMeDetailInfoPrintForm_color_100m_yn").val("N");
					lv_color_100m_yn = "Y";
				}
		    	
	    		//팝업 호출
				if(lv_color_sido_yn == "Y" && lv_color_sgg_yn == "Y" && lv_color_emdong_yn == "Y" && lv_color_totreg_yn == "Y" && lv_color_100m_yn == "Y") {
		    		//로딩바2 숨김
			    	$statsMeMain.ui.loading2(false);
			    	
			    	//보고서 팝업 호출
			    	$statsMeDetailInfo.ui.reportPopup = window.open("/js/statsMe/report/reportForm2.html", "reportPrint","width=850, height=700, scrollbars=yes");
			    	return;
		    	}
	    	}
	    },
	    
	    /**
	     * 
	     * @name         : reportLoad
	     * @description  : 보고서 팝업에서 호출 데이터를 불러오는 함수.
	     * @date         : 2019. 10. 07. 
	     * @author	     : 김남민
	     * @history 	 : 
	     * @param		 : 
	     */
	    reportLoad : function() {
	    	//변수 선언
	    	var lv_data = $statsMeDetailInfo.ui.mapData.data;
	    	
	    	//서비스명
	    	$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_stat_data_nm").html($("#statsMeMapStatDataNm2").html());
	    	if($("#statsMeMapStatDataNm2").html() == "") $statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_stat_data_nm").css("height","30px");
	    	
	    	//통계자료설명
	    	$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_stat_data_exp").html($("#statsMeMapStatDataExp").html());
	    	if($("#statsMeMapStatDataExp").html() == "") $statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_stat_data_exp").css("height","30px");
	    	
	    	//작성일자
	    	var lv_now = new Date();
	    	var lv_yyyy = lv_now.getFullYear();
	    	var lv_mm = lv_now.getMonth()+1;
	    	var lv_dd = lv_now.getDate();
	    	var lv_hh = lv_now.getHours();
	    	var lv_mi = lv_now.getMinutes();
	    	var lv_ss = lv_now.getSeconds();
	    	$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_yyyymmdd").html(lv_yyyy+"년 "+lv_mm+"월 "+lv_dd+"일 "+lv_hh+"시 "+lv_mi+"분");
	    	
	    	//데이터 출처
	    	$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_source").html(lv_data.source);
	    	if(lv_data.source == undefined || lv_data.source == null || lv_data.source == "") $statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_source").css("height","30px");
	    	
	    	//SGIS 콘텐츠 출처
	    	$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_sgis").html(lv_data.menu_nm);
	    	
	    	//지도 시각화 화면
	    	$statsMeMap.ui.reportPopup.$("#reportMapDiv").attr("src",$("#statsMeDetailInfoPrintForm_image").val());
	    	
	    	//지도 Legend
	    	if($statsMeMap.ui.mapType == "color" || $statsMeMap.ui.mapType == "bubble") {
	    		$statsMeMap.ui.reportPopup.$("#legend").html($("#legend_"+$statsMeMap.ui.map.legend.id).html());
	    		$statsMeMap.ui.reportPopup.$("#reverseBtn_"+$statsMeMap.ui.map.legend.id).hide();
	    		$statsMeMap.ui.reportPopup.$("#legend .legendRound").hide();
	    	} else {
	    		$statsMeMap.ui.reportPopup.$("#pntLegend_show").hide();
	    		$statsMeMap.ui.reportPopup.$("#pntLegend").hide();
	    	}
	    	
	    	//데이터보드
	    	if($statsMeMap.ui.mapType == "color" || $statsMeMap.ui.mapType == "bubble") {
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>thead").html($("#statsMeMapDataBoard_dataTable>thead").html());
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>thead>tr").append("<th scope=\"col\">비고</th>") //20200812 박은식 보고서 비고 추가
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody>tr>th").css("border","1px solid #ccc");
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody").html($("#statsMeMapDataBoard_dataTable>tbody").html());
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody").find("tr").append("<td></td>") //20200812 박은식 보고서 비고 추가
		    	$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody>tr").show().css("font-weight","");
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody>tr>td").css("padding","0px 5px").css("border","1px solid #ccc").css("color","");
	    	}
	    	else if($statsMeMap.ui.mapType == "poi") {
	    		if($("#statsMeMapDataBoard_dataTable").css("display") == "none") {
	    			$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable").hide();
	    		}
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>thead").html($("#statsMeMapDataBoard_dataTable>thead").html());
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>thead>tr>th").attr("colspan","3").css("border","1px solid #ccc");
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody").html($("#statsMeMapDataBoard_dataTable>tbody").html());
		    	$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody>tr").show();
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody>tr>td").css("padding","0px 5px").attr("colspan","3").css("border","1px solid #ccc");
	    	}
	    	else {
	    		if($("#statsMeMapDataBoard_dataTable").css("display") == "none") {
	    			$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable").hide();
	    		}
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>thead").html("");
	    		$statsMeMap.ui.reportPopup.$("#statsMeMapReportForm_dataTable>tbody").html("");
	    	}
	    },
	    
	    /**
	     * 
	     * @name         : setMapPoiFromList
	     * @description  : 리스트에서 지도에 POI를 불러온다.
	     * @date         : 2019. 10. 16. 
	     * @author	     : 김남민
	     * @history 	 : 
	     * @param		 : 
	     */
	    setMapPoiFromList : function(p_map, p_list) {
			/* POI 리스트 세팅 */
			var lv_list = p_list;
			
			/* POI 타입 가져오기 */
			var lv_poi_se_nm = "1";
			if(lv_list != undefined && lv_list != null && lv_list.length > 0) {
				lv_poi_se_nm = lv_list[0].poi_se_nm;
			}
			
			/* 1 : 지도 마커 클러스터 추가 */
			if(lv_poi_se_nm == "1") {
				//마커 클러스터 속도를 높이기 위한 전처리
				var lv_temp_center = p_map.gMap.getCenter();
				var lv_temp_x = lv_temp_center.x;
				var lv_temp_y = lv_temp_center.y;
				var lv_temp_zoom = p_map.zoom;
				if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
				p_map.mapMove([0, 0], 13);
				
				//아이콘
				var lv_marker_icon = sop.icon({
	                iconUrl : contextPath+'/img/marker/marker/40_03.png',
	                iconSize:     [25, 40],	                
	                iconAnchor:   [13, 40],
	                infoWindowAnchor: [1, -34]
	            });
				//마커 클러스터 추가
                for(var i = 0; i < lv_list.length; i++) {
    				var lv_marker_contents = "";
    				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th>";
    				//lv_marker_contents += "<th style='text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px; cursor: pointer;'>";
    				lv_marker_contents += "<strong>"+lv_list[i].poi_nm+"</strong>";
    				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    	            var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], {icon: lv_marker_icon});
    	            //lv_marker.index = i;
    	            lv_marker.bindInfoWindow(lv_marker_contents);
    	            p_map.markers.addLayer(lv_marker);
    	            /*lv_marker.on("click",function(e){
    					var lvTempIndex = this.index;
                    });*/
                }
                
                //마커 클러스터 속도를 높이기 위한 후처리
                if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
                p_map.mapMove([lv_temp_x, lv_temp_y], lv_temp_zoom);
                
                //데이터보드 데이터 보기 표시
				$("#statsMeMapDataBoard_dataTable").show();
				$("#statsMeMapDataBoard_dataTable_page").parent().show();
				
				//poi 데이터보드 데이터보기
				//헤더
				var lvTheadHtml = "";
				lvTheadHtml += "<tr>";
				lvTheadHtml += "<th scope=\"col\">제목</th>";
				lvTheadHtml += "</tr>";
				$("#statsMeMapDataBoard_dataTable>thead").html(lvTheadHtml);
				//데이터
				var lvPoiDataCount = 0;
				var lvTbodyHtml = "";
				for(var i = 0; i < lv_list.length; i++) {
					if(lv_list[i].tooltip_cn != undefined && lv_list[i].tooltip_cn != null && lv_list[i].tooltip_cn != "") {
						lvTbodyHtml += "<tr class=\"page_"+Math.ceil((lvPoiDataCount+1)/10)+"\">";
    					//lvTbodyHtml += "<td>"+(i+1)+"</td>";
						lvTbodyHtml += "<td style=\"text-align:left;\">"+lv_list[i].tooltip_cn+"</td>";
						lvTbodyHtml += "</tr>";
						lvPoiDataCount++;
					}
				}
				$("#statsMeMapDataBoard_dataTable>tbody").html(lvTbodyHtml);
				//페이징
				lvTbodyHtml = "";
				lvTbodyHtml += "<tr>";
				for(var i = 0; i < lvPoiDataCount; i+=10) {
					lvTbodyHtml += "<td class=\"page_"+Math.ceil(Math.ceil((i+1)/10)/5)+"\">"+Math.ceil((i+1)/10)+"</td>";
				}
				lvTbodyHtml += "</tr>";
				$("#statsMeMapDataBoard_pagingTable>tbody").html(lvTbodyHtml);
				//데이터 없으면 화면 숨김
				if(lvPoiDataCount == 0) {
					$("#statsMeMapDataBoard_dataTable").hide();
					$("#statsMeMapDataBoard_dataTable_page").parent().hide();
				}
				//1 페이지로 세팅
				$("#statsMeMapDataBoard_dataTable>tbody>tr").hide();
				$("#statsMeMapDataBoard_dataTable>tbody>tr.page_1").show();
				$("#statsMeMapDataBoard_pagingTable>tbody>tr>td").first().addClass("on");
				$("#statsMeMapDataBoard_pagingTable>tbody>tr>td").hide();
				$("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_1").show();
				$("#statsMeMapDataBoard_dataTable_page").val(1);
				$("#statsMeMapDataBoard_pagingTable_page").val(1);
				
				/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 START */
				// 상세보기화면 데이터 보기 표시
				$("#statsMeDetailInfo_dataTable").show();
				$("#statsMeDetailInfo_dataTable_page").parent().show();
				
				//poi 상세보기화면 데이터보기
				//헤더
				var lvTheadHtml = "";
				lvTheadHtml += "<tr>";
				lvTheadHtml += "<th scope=\"col\">제목</th>";
				lvTheadHtml += "</tr>";
				$("#statsMeDetailInfo_dataTable>thead").html(lvTheadHtml);
				//데이터
				var lvPoiDataCount = 0;
				var lvTbodyHtml = "";
				for(var i = 0; i < lv_list.length; i++) {
					if(lv_list[i].tooltip_cn != undefined && lv_list[i].tooltip_cn != null && lv_list[i].tooltip_cn != "") {
						lvTbodyHtml += "<tr class=\"page_"+Math.ceil((lvPoiDataCount+1)/10)+"\">";
    					//lvTbodyHtml += "<td>"+(i+1)+"</td>";
						lvTbodyHtml += "<td style=\"text-align:left;\">"+lv_list[i].tooltip_cn+"</td>";
						lvTbodyHtml += "</tr>";
						lvPoiDataCount++;
					}
				}
				$("#statsMeDetailInfo_dataTable>tbody").html(lvTbodyHtml);
				//페이징
				lvTbodyHtml = "";
				lvTbodyHtml += "<tr>";
				for(var i = 0; i < lvPoiDataCount; i+=10) {
					lvTbodyHtml += "<td class=\"page_"+Math.ceil(Math.ceil((i+1)/10)/5)+"\">"+Math.ceil((i+1)/10)+"</td>";
				}
				lvTbodyHtml += "</tr>";
				$("#statsMeDetailInfo_pagingTable>tbody").html(lvTbodyHtml);
				//데이터 없으면 화면 숨김
				if(lvPoiDataCount == 0) {
					$("#statsMeDetailInfo_dataTable").hide();
					$("#statsMeDetailInfo_dataTable_page").parent().hide();
				}
				//1 페이지로 세팅
				$("#statsMeDetailInfo_dataTable>tbody>tr").hide();
				$("#statsMeDetailInfo_dataTable>tbody>tr.page_1").show();
				$("#statsMeDetailInfo_pagingTable>tbody>tr>td").first().addClass("on");
				$("#statsMeDetailInfo_pagingTable>tbody>tr>td").hide();
				$("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_1").show();
				$("#statsMeDetailInfo_dataTable_page").val(1);
				$("#statsMeDetailInfo_pagingTable_page").val(1);
				/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 END */
			}
			/* 2 : 지도 마커 추가 (빨간점) */
			else if(lv_poi_se_nm == "2") {
				var lv_marker_icon = sop.icon({
					iconUrl : '/img/marker/redCirlce.png',
					iconSize : [ 10, 10 ],
					className : "sop_icon_cursor_default"
					//zindex : 5
				});
				for (var i = 0; i < lv_list.length; i++) {
					var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], { icon : lv_marker_icon });
					lv_marker.poi_se_nm = lv_poi_se_nm;
					lv_marker.addTo(p_map.gMap);
				}
			}
			/* 3 : 지도 마커 클러스터 추가 (파란점) */
			else if(lv_poi_se_nm == "3") {
				//마커 클러스터 속도를 높이기 위한 전처리
				var lv_temp_center = p_map.gMap.getCenter();
				var lv_temp_x = lv_temp_center.x;
				var lv_temp_y = lv_temp_center.y;
				var lv_temp_zoom = p_map.zoom;
				if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
				p_map.mapMove([0, 0], 13);
				
				//아이콘
				var lv_marker_icon = sop.icon({
	                iconUrl : contextPath+'/img/policyStatic/ico_circle_01.png',
	                iconAnchor: [7, 7],
					iconSize: [14, 14],
					infoWindowAnchor: [1, -16]
	            });
				//마커 클러스터 추가
                for(var i = 0; i < lv_list.length; i++) {
    				var lv_marker_contents = "";
    				var lv_poi_nm_list = (""+lv_list[i].poi_nm).split("$");
    				if(lv_poi_nm_list.length == 2) {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_poi_nm_list[0];
        				lv_marker_contents += "</th><td></td></tr><tr><td>";
        				lv_marker_contents += lv_poi_nm_list[1];
        				lv_marker_contents += "</td></tr></tbody></table>";
    				}
    				else {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_list[i].poi_nm;
        				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    				}
    	            var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], {icon: lv_marker_icon});
    	            //lv_marker.index = i;
    	            lv_marker.bindInfoWindow(lv_marker_contents);
    	            p_map.markers.addLayer(lv_marker);
    	            /*lv_marker.on("click",function(e){
    					var lvTempIndex = this.index;
                    });*/
                }
                
                //마커 클러스터 속도를 높이기 위한 후처리
                if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
                p_map.mapMove([lv_temp_x, lv_temp_y], lv_temp_zoom);
			}
			/* 4 : 지도 마커 추가 (파란점) */
			else if(lv_poi_se_nm == "4") {
				var lv_marker_icon = sop.icon({
					iconUrl : '/img/policyStatic/ico_circle_01.png',
					iconSize : [ 14, 14 ]
					//zindex : 5
				});
				for (var i = 0; i < lv_list.length; i++) {
					var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], { icon : lv_marker_icon });
					lv_marker.poi_se_nm = lv_poi_se_nm;
					var lv_poi_nm_list = (""+lv_list[i].poi_nm).split("$");
					var lv_marker_contents = "";
					if(lv_poi_nm_list.length == 2) {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_poi_nm_list[0];
        				lv_marker_contents += "</th><td></td></tr><tr><td>";
        				lv_marker_contents += lv_poi_nm_list[1];
        				lv_marker_contents += "</td></tr></tbody></table>";
    				}
    				else {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_list[i].poi_nm;
        				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    				}
    	            lv_marker.bindInfoWindow(lv_marker_contents);
					lv_marker.addTo(p_map.gMap);
				}
			}
			/* 5 : 지도 마커 추가 (빨간점) */
			else if(lv_poi_se_nm == "5") {
				var lv_marker_icon = sop.icon({
					iconUrl : '/img/marker/redCirlce.png',
					iconSize : [ 10, 10 ]
					//zindex : 5
				});
				for (var i = 0; i < lv_list.length; i++) {
					var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], { icon : lv_marker_icon });
					lv_marker.poi_se_nm = lv_poi_se_nm;
					var lv_poi_nm_list = (""+lv_list[i].poi_nm).split("$");
					if(lv_poi_nm_list.length == 2) {
						var lv_marker_contents = "";
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_poi_nm_list[0];
        				lv_marker_contents += "</th><td></td></tr><tr><td>";
        				lv_marker_contents += lv_poi_nm_list[1];
        				lv_marker_contents += "</td></tr></tbody></table>";
    				}
    				else {
    					var lv_marker_contents = "";
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_list[i].poi_nm;
        				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    				}
    	            lv_marker.bindInfoWindow(lv_marker_contents);
					lv_marker.addTo(p_map.gMap);
				}
			}
	    },
	    
	    /**
	     * 
	     * @name         : setDataboardFromMap
	     * @description  : 지도에서 데이터보드를 불러온다.
	     * @date         : 2019. 10. 16. 
	     * @author	     : 김남민
	     * @history 	 : 
	     * @param		 : 
	     */
	    setDataboardFromMap : function() {
	    	//데이터보드 데이터 보기 표시
			$("#statsMeMapDataBoard_dataTable").show();
			$("#statsMeMapDataBoard_dataTable_page").parent().hide();
			
			//지도에서 리스트 가져오기
			var list = $statsMeMap.ui.map.dataForCombine.result;
			var showData = $statsMeMap.ui.map.dataForCombine.showData;
			var unit = $statsMeMap.ui.map.dataForCombine.unit; 
			if(unit == undefined || unit == null || unit == "") {
				unit = "수";
			}
			
			//리스트에서 unit 가져오기
			/*var lv_unit = "개";
			var lv_unit_nm = "수";
			if(list != null && list.length > 0) {
				if(list[0].unit != undefined && list[0].unit != null && list[0].unit != "") lv_unit = list[0].unit;
				if(list[0].unit_nm != undefined && list[0].unit_nm != null && list[0].unit_nm != "") lv_unit_nm = list[0].unit_nm;
			}*/
			
			$statsMeMap.ui.map.dataGeojson.eachLayer(function(layer) {
				var adm_cd = layer.feature.properties.adm_cd;
				var adm_nm = layer.feature.properties.adm_nm;
				for(var i = 0; i < list.length; i++) {
					if(list[i].adm_cd == adm_cd) {
						list[i].adm_nm = adm_nm;
					}
				}
			});
			
			//데이터 정렬
			list.sort(function(a, b) { // 내림차순
				return Number(a[showData]) > Number(b[showData]) ? -1 : Number(a[showData]) < Number(b[showData]) ? 1 : 0;
			});
			
			//읍면동인 경우 Sum값 보여주기(안씀)
			/*if(list != null && list.length > 0) {
				var lv_sum = JSON.parse(JSON.stringify(list[0]));
				var lv_temp_list = [];
				var lv_adm_cd = lv_sum.adm_cd;
				
				//읍면동
				if((""+lv_adm_cd).length > 7) {
					for(var i = 1; i < list.length; i++) {
						lv_sum[showData] = Number(lv_sum[showData]) + Number(list[i][showData]);
					}
					lv_temp_list.push(lv_sum);
					list = lv_temp_list;
				}
			}*/
			
			//HTML thead 추가
			var lvTheadHtml = "";
			lvTheadHtml += "<tr>";
			lvTheadHtml += "<th scope=\"col\">순위</th><th scope=\"col\">행정구역</th>";
			lvTheadHtml += "<th scope=\"col\">"+unit+"</th>";
			lvTheadHtml += "</tr>";
			$("#statsMeMapDataBoard_dataTable>thead").html(lvTheadHtml);
			
			//HTML tbody 추가
			var html = "";
			var htmlCount = 0;
			for(var i = 0; i < list.length; i++) {
				if(list[i].adm_nm != undefined && list[i].adm_nm != null && list[i].adm_nm != "") {
					var lv_value = ""+appendCommaToNumber(list[i][showData]);
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
					html += "<tr>";
					//html += "<td>"+(i+1)+"</td>";
					html += "<td>"+(htmlCount+1)+"</td>";
					//읍면동인 경우 adm_cd값 보여주기
					if((""+list[i].adm_cd).length > 7) {
						html += "<td style=\"text-align:left;\">"+list[i].adm_cd+"</td>";
					}
					else {
						html += "<td style=\"text-align:left;\">"+list[i].adm_nm+"</td>";
					}
					html += "<td style=\"text-align:right;\">"+lv_value+"</td>";
					html += "</tr>";
					htmlCount++;
				}
			}
			$("#statsMeMapDataBoard_dataTable>tbody").html(html);
			
			/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 START */			
			//헤더
			var lvTheadHtml = "";
			lvTheadHtml += "<tr>";
			lvTheadHtml += "<th scope=\"col\">순위</th><th scope=\"col\">행정구역</th>";
			lvTheadHtml += "<th scope=\"col\">"+unit+"</th>";
			lvTheadHtml += "</tr>";
			$("#statsMeDetailInfo_dataTable>thead").html(lvTheadHtml);
			//데이터
			var lvDataCount = 0;
			var lvTbodyHtml = "";
			for(var i = 0; i < list.length; i++) {
				if(list[i].adm_nm != undefined && list[i].adm_nm != null && list[i].adm_nm != "") {
					var lv_value = ""+appendCommaToNumber(list[i][showData]);
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
					lvTbodyHtml += "<tr class=\"page_"+Math.ceil((lvDataCount+1)/10)+"\">";
					//html += "<td>"+(i+1)+"</td>";
					lvTbodyHtml += "<td>"+(lvDataCount+1)+"</td>";
					//읍면동인 경우 adm_cd값 보여주기
					if((""+list[i].adm_cd).length > 7) {
						lvTbodyHtml += "<td style=\"text-align:left;\">"+list[i].adm_cd+"</td>";
					}
					else {
						lvTbodyHtml += "<td style=\"text-align:left;\">"+list[i].adm_nm+"</td>";
					}
					lvTbodyHtml += "<td style=\"text-align:right;\">"+lv_value+"</td>";
					lvTbodyHtml += "</tr>";
					lvDataCount++;
				}
			}
			$("#statsMeDetailInfo_dataTable>tbody").html(lvTbodyHtml);
			//페이징
			lvTbodyHtml = "";
			lvTbodyHtml += "<tr>";
			for(var i = 0; i < lvDataCount; i+=10) {
				lvTbodyHtml += "<td class=\"page_"+Math.ceil(Math.ceil((i+1)/10)/5)+"\">"+Math.ceil((i+1)/10)+"</td>";
			}
			lvTbodyHtml += "</tr>";
			$("#statsMeDetailInfo_pagingTable>tbody").html(lvTbodyHtml);
			//데이터 없으면 화면 숨김
			if(lvDataCount == 0) {
				$("#statsMeDetailInfo_dataTable").hide();
				$("#statsMeDetailInfo_dataTable_page").parent().hide();
			}
			//1 페이지로 세팅
			$("#statsMeDetailInfo_dataTable>tbody>tr").hide();
			$("#statsMeDetailInfo_dataTable>tbody>tr.page_1").show();
			$("#statsMeDetailInfo_pagingTable>tbody>tr>td").first().addClass("on");
			$("#statsMeDetailInfo_pagingTable>tbody>tr>td").hide();
			$("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_1").show();
			$("#statsMeDetailInfo_dataTable_page").val(1);
			$("#statsMeDetailInfo_pagingTable_page").val(1);
			
			/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 START */
			// 상세보기화면 데이터 보기 표시
			$("#statsMeDetailInfo_dataTable").show();
			if(lvDataCount <= 10){
				$("#statsMeDetailInfo_dataTable_page").parent().hide();
			}
			/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 END */
			
			// 데이터보드에 접속지역 강조
			$statsMeMap.ui.setDataboardHighlight();
			//$statsMeMap.ui.setDetailTable($statsMeMap.ui.mapStatsData);//20200811 박은식 상세정보 화면 PDF Print 팝업 페이지 리스트 셋팅	// 2020.09.24[한광희] 조회 위치 변경
	    },
	    
	    //20200812 [박은식] 상세정보 화면 팝업 페이지 표 사전생성 START
	    /**
	     * 
	     * @name         : setDetailTable
	     * @description  : 상세정보 화면 PDF Print 팝업 페이지 표 생성 
	     * @date         : 2020. 08. 11. 
	     * @author	     : 박은식
	     * @history 	 : 
	     * @param		 : 검색된 시도, 시군구, 음면동 데이터 리스트 
	     */
	    setDetailTable : function(list){
	    	
	    	//표를 생성하기전 초기화
	    	$("#statsMeMapReportForm_dataTable>thead").empty();
	    	$("#statsMeMapReportForm_dataTable>tbody").empty();
	    	$("#statsMeMapReportForm_dataTable1>thead").empty();
	    	$("#statsMeMapReportForm_dataTable1>tbody").empty();
	    	$("#statsMeMapReportForm_dataTable2>thead").empty();
	    	$("#statsMeMapReportForm_dataTable2>tbody").empty();
	    	$("#statsMeMapReportForm_dataTable3>thead").empty();
	    	$("#statsMeMapReportForm_dataTable3>tbody").empty();
	    	
	    	/** 2020.09.24[한광희] 상세화면 보고서 수정 START */
	    	var sido_cd = $("#statsMePopupArea_sido").val();
	    	var sgg_cd = $("#statsMePopupArea_sgg").val();
	    	var emdong_cd = $("#statsMePopupArea_emdong").val();
	    	var stat_data_id = $statsMeMap.ui.mapData.data.stat_data_id;
	    	
	    	var sido_nm = "";
    		var sgg_nm = "";
    		var emdong_nm = "";
    		var adm_nm_list = [];
    		/** 2020.09.24[한광희] 상세화면 보고서 수정 END */
	    	
	    	var listKey = Object.keys(list);
	    	//전국
	    	if(listKey.indexOf(stat_data_id+"_color_sido_00") != -1){
	    		var allInfo = null;
	    		
	    		/** 2020.09.24[한광희] 상세화면 보고서 수정 START */
	    		/*$.ajax({
					url:openApiPath+"/OpenAPI3/addr/stage.json",
					async:false,
					data: {
						accessToken:accessToken,
						pg_yn: "0"
					},
					dataType: "json",
					success:function(res){
						allInfo = res.result;
					}
				})*/
				var allName = stat_data_id+"_color_sido_00";
	    		var allList = list[allName];
	    			    		
	    		$.each($statsMePopup.ui.areaSidoData, function(cnt, node){
	    			$.each(node, function(cnt, node){
	    				adm_nm_list.push({
	    					adm_cd : node.sido_cd,
	    					adm_nm : node.sido_nm
	    				});
	    			});
	    		});
	    		
				for(var i=0; i < allList.length; i++){
					for(var j=0; j< adm_nm_list.length; j++){
						if(adm_nm_list[j].adm_cd == allList[i].adm_cd){
							allList[i].adm_nm = adm_nm_list[j].adm_nm;
							break;
						}
					}
				}
				/** 2020.09.24[한광희] 상세화면 보고서 수정 END */

	    		allList.sort(function(a, b) { // 내림차순
					return Number(a.stats_dta_co) > Number(b.stats_dta_co) ? -1 : Number(a.stats_dta_co) < Number(b.stats_dta_co) ? 1 : 0;
				});
	    		
	    		var allDataCount = 0;
	    		var allTbodyHtml = "";
	    		var allTheadHtml = "";
	    		allTheadHtml += "<tr>";
	    		allTheadHtml += "<th scope=\"col\">순위</th><th scope=\"col\">행정구역</th>";
	    		allTheadHtml += "<th scope=\"col\">"+allList[0].unit+"</th>";
	    		allTheadHtml += "<th scope=\"col\">비고</th>";
	    		allTheadHtml += "</tr>";
	    		$("#statsMeMapReportForm_dataTable>thead").html(allTheadHtml);
	    		for(var i = 0; i < allList.length; i++) {
					if(allList[i].adm_nm != undefined && allList[i].adm_nm != null && allList[i].adm_nm != "") {
						var lv_value = ""+appendCommaToNumber(allList[i]['showData']);
						if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
						allTbodyHtml += "<tr class=\"page_"+Math.ceil((allDataCount+1)/10)+"\">";
						//html += "<td>"+(i+1)+"</td>";
						allTbodyHtml += "<td>"+(allDataCount+1)+"</td>";
						allTbodyHtml += "<td style=\"text-align:left;\">"+allList[i].adm_nm+"</td>";
						allTbodyHtml += "<td style=\"text-align:right;\">"+appendCommaToNumber(allList[i].stats_dta_co)+"</td>";	// 2020.09.25[한광희] 데이터 콤마 추가
						allTbodyHtml += "<td style=\"text-align:right;\"></td>";
						allTbodyHtml += "</tr>";
						allDataCount++;
					}
				}
	    		$("#statsMeMapReportForm_dataTable>tbody").html(allTbodyHtml);
	    	}
	    	
	    	//시도
	    	if(listKey.indexOf(stat_data_id+"_color_sgg_"+sido_cd) != -1){
	    		var sidoInfo = null;
	    		
	    		/** 2020.09.24[한광희] 상세화면 보고서 수정 START */
	    		/*$.ajax({
					url:openApiPath+"/OpenAPI3/addr/stage.json",
					async:false,
					data: {
						accessToken:accessToken,
						cd: sido_cd,
						pg_yn: "0"
					},
					dataType: "json",
					success:function(res){
						sidoInfo = res.result;
					}
				})*/
				var sidoName = stat_data_id+"_color_sgg_"+sido_cd;
	    		var sidoList = list[sidoName];
	    		
	    		$.each($statsMePopup.ui.areaSidoData, function(cnt, node){
	    			$.each(node, function(cnt, node){
	    				if(node.sido_cd == sido_cd){
	    					sido_nm = node.sido_nm;
	    				}	    				
	    			});
	    		});
	    		
	    		$.each($statsMePopup.ui.areaSggData, function(cnt, node){
	    			if(cnt == sido_cd){
	    				$.each(node, function(cnt, node){
	    					adm_nm_list.push({
	    						adm_cd : sido_cd+node.sgg_cd,
	    						adm_nm : sido_nm+" "+node.sgg_nm
	    					});
	    				});	    				
	    			}
	    		});
	    		
				for(var i=0; i < sidoList.length; i++){
					for(var j=0; j< adm_nm_list.length; j++){
						if(adm_nm_list[j].adm_cd == sidoList[i].adm_cd){
							sidoList[i].adm_nm = adm_nm_list[j].adm_nm;
							break;
						}
					}
				}
				/** 2020.09.24[한광희] 상세화면 보고서 수정 END */
	    		
				if(sidoList.length > 0){//20200824 박은식 표 기준이 전국일 경우 시도리스트가 null, 이때 length 체크 에러가 발생 이를 해결하기위함
		    		sidoList.sort(function(a, b) { // 내림차순
						return Number(a.stats_dta_co) > Number(b.stats_dta_co) ? -1 : Number(a.stats_dta_co) < Number(b.stats_dta_co) ? 1 : 0;
					});
		    		
		    		var sidoDataCount = 0;
		    		var sidoTbodyHtml = "";
		    		var sidoTheadHtml = "";
		    		sidoTheadHtml += "<tr>";
		    		sidoTheadHtml += "<th scope=\"col\">순위</th><th scope=\"col\">행정구역</th>";
		    		sidoTheadHtml += "<th scope=\"col\">"+sidoList[0].unit+"</th>";
		    		sidoTheadHtml += "<th scope=\"col\">비고</th>";
		    		sidoTheadHtml += "</tr>";
		    		$("#statsMeMapReportForm_dataTable1>thead").html(sidoTheadHtml);
		    		for(var i = 0; i < sidoList.length; i++) {
						if(sidoList[i].adm_nm != undefined && sidoList[i].adm_nm != null && sidoList[i].adm_nm != "") {
							var lv_value = ""+appendCommaToNumber(sidoList[i]['showData']);
							if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
							sidoTbodyHtml += "<tr class=\"page_"+Math.ceil((sidoDataCount+1)/10)+"\">";
							//html += "<td>"+(i+1)+"</td>";
							sidoTbodyHtml += "<td>"+(sidoDataCount+1)+"</td>";
							sidoTbodyHtml += "<td style=\"text-align:left;\">"+sidoList[i].adm_nm+"</td>";
							sidoTbodyHtml += "<td style=\"text-align:right;\">"+appendCommaToNumber(sidoList[i].stats_dta_co)+"</td>";	// 2020.09.25[한광희] 데이터 콤마 추가
							sidoTbodyHtml += "<td style=\"text-align:right;\"></td>";
							sidoTbodyHtml += "</tr>";
							sidoDataCount++;
						}
					}
		    		$("#statsMeMapReportForm_dataTable1>tbody").html(sidoTbodyHtml);
		      	} 
	    	}
	    	
	    	//시군구
	    	if(listKey.indexOf(stat_data_id +"_color_emdong_" +sido_cd +sgg_cd) != -1) {
	    		var sggInfo = null;
	    		
	    		/** 2020.09.24[한광희] 상세화면 보고서 수정 START */
	    		/*$.ajax({
					url:openApiPath+"/OpenAPI3/addr/stage.json",
					async:false,
					data: {
						accessToken:accessToken,
						cd: sido_cd+sgg_cd,
						pg_yn: "0"
					},
					dataType: "json",
					success:function(res){
						sggInfo = res.result;
					}
				})*/
				var sggName = stat_data_id +"_color_emdong_" +sido_cd +sgg_cd;
	    		var sggList = list[sggName];
	    		
	    		$.each($statsMePopup.ui.areaSidoData, function(cnt, node){
	    			$.each(node, function(cnt, node){
	    				if(node.sido_cd == sido_cd){
	    					sido_nm = node.sido_nm;
	    				}	    				
	    			});
	    		});
	    		
	    		$.each($statsMePopup.ui.areaSggData, function(cnt, node){
	    			if(cnt == sido_cd){
	    				$.each(node, function(cnt, node){
	    					if(node.sgg_cd == sgg_cd){
	    						sgg_nm = node.sgg_nm;
	    					}	    				
	    				});	    				
	    			}
	    		});
	    		
	    		$.each($statsMePopup.ui.areaEmdongData, function(cnt, node){
	    			if(cnt == sido_cd+sgg_cd){
	    				$.each(node, function(cnt, node){
	    					adm_nm_list.push({
	    						adm_cd : sido_cd+sgg_cd+node.emdong_cd,
	    						adm_nm : sido_nm+" "+sgg_nm+" "+node.emdong_nm
	    					});
	    				});	    				
	    			}
	    		});
	    		
				for(var i=0; i < sggList.length; i++){
					for(var j=0; j< adm_nm_list.length; j++){
						if(adm_nm_list[j].adm_cd == sggList[i].adm_cd){
							sggList[i].adm_nm = adm_nm_list[j].adm_nm;
							break;
						}
					}
				}
				/** 2020.09.24[한광희] 상세화면 보고서 수정 END */

				if(sggList.length > 0){
		    		sggList.sort(function(a, b) { // 내림차순
						return Number(a.stats_dta_co) > Number(b.stats_dta_co) ? -1 : Number(a.stats_dta_co) < Number(b.stats_dta_co) ? 1 : 0;
					});
		    		
		    		var sggDataCount = 0;
		    		var sggTbodyHtml = "";
		    		var sggTheadHtml = "";
		    		sggTheadHtml += "<tr>";
		    		sggTheadHtml += "<th scope=\"col\">순위</th><th scope=\"col\">행정구역</th>";
		    		sggTheadHtml += "<th scope=\"col\">"+sggList[0].unit+"</th>";
		    		sggTheadHtml += "<th scope=\"col\">비고</th>";
		    		sggTheadHtml += "</tr>";
		    		$("#statsMeMapReportForm_dataTable2>thead").html(sggTheadHtml);
		    		for(var i = 0; i < sggList.length; i++) {
						if(sggList[i].adm_nm != undefined && sggList[i].adm_nm != null && sggList[i].adm_nm != "") {
							var lv_value = ""+appendCommaToNumber(sggList[i]['showData']);
							if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
							sggTbodyHtml += "<tr class=\"page_"+Math.ceil((sggDataCount+1)/10)+"\">";
							//html += "<td>"+(i+1)+"</td>";
							sggTbodyHtml += "<td>"+(sggDataCount+1)+"</td>";
							sggTbodyHtml += "<td style=\"text-align:left;\">"+sggList[i].adm_nm+"</td>";
							sggTbodyHtml += "<td style=\"text-align:right;\">"+appendCommaToNumber(sggList[i].stats_dta_co)+"</td>";	// 2020.09.25[한광희] 데이터 콤마 추가
							sggTbodyHtml += "<td style=\"text-align:right;\"></td>";
							sggTbodyHtml += "</tr>";
							sggDataCount++;
						}
					}
		    		$("#statsMeMapReportForm_dataTable2>tbody").html(sggTbodyHtml);	
		    	}
	    	}
	    	//읍면동
	    	if(listKey.indexOf(stat_data_id+"_color_totreg_"+sido_cd+sgg_cd+emdong_cd) != -1){

				var emdongName = stat_data_id+"_color_totreg_"+sido_cd+sgg_cd+emdong_cd;
	    		var emdongList = list[emdongName];
	    		
	    		if(emdongList.length > 0){
	    			emdongList.sort(function(a, b) { // 내림차순
						return Number(a.stats_dta_co) > Number(b.stats_dta_co) ? -1 : Number(a.stats_dta_co) < Number(b.stats_dta_co) ? 1 : 0;
					});
		    		
		    		var emdongDataCount = 0;
		    		var emdongTbodyHtml = "";
		    		var emdongTheadHtml = "";
		    		emdongTheadHtml += "<tr>";
		    		emdongTheadHtml += "<th scope=\"col\">순위</th><th scope=\"col\">행정구역</th>";
		    		emdongTheadHtml += "<th scope=\"col\">"+emdongList[0].unit+"</th>";
		    		emdongTheadHtml += "<th scope=\"col\">비고</th>";
		    		emdongTheadHtml += "</tr>";
		    		$("#statsMeMapReportForm_dataTable3>thead").html(emdongTheadHtml);
		    		for(var i = 0; i < emdongList.length; i++) {
						var lv_value = ""+appendCommaToNumber(emdongList[i]['showData']);
						if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
						emdongTbodyHtml += "<tr class=\"page_"+Math.ceil((emdongDataCount+1)/10)+"\">";
						//html += "<td>"+(i+1)+"</td>";
						emdongTbodyHtml += "<td>"+(emdongDataCount+1)+"</td>";
						//읍면동인 경우 adm_cd값 보여주기
						emdongTbodyHtml += "<td style=\"text-align:left;\">"+emdongList[i].adm_cd+"</td>";
						emdongTbodyHtml += "<td style=\"text-align:right;\">"+appendCommaToNumber(emdongList[i].stats_dta_co)+"</td>";	// 2020.09.25[한광희] 데이터 콤마 추가
						emdongTbodyHtml += "<td style=\"text-align:right;\"></td>";
						emdongTbodyHtml += "</tr>";
						emdongDataCount++;
					}
		    		$("#statsMeMapReportForm_dataTable3>tbody").html(emdongTbodyHtml);
	    		}
	    	}
	    },
	    //20200812 [박은식] 상세정보 화면 팝업 페이지 표 사전생성 END
	    
	    /**
	     * 
	     * @name         : setDataboardHighlight
	     * @description  : 데이터보드를 강조한다.
	     * @date         : 2019. 10. 28. 
	     * @author	     : 김남민
	     * @history 	 : 
	     * @param		 : 
	     */
	    setDataboardHighlight : function() {
	    	// 현재지역명
			var lv_adm_nm = $("#statsMeMapMapArea>a").text(); 
			if(lv_adm_nm == "전국") {
				lv_adm_nm = $("#statsMePopupArea_sido option:selected").text();
			}
			
			// 데이터보드에 접속지역 강조
			$("#statsMeMapDataBoard_dataTable>tbody>tr").css("font-weight","");
			$("#statsMeMapDataBoard_dataTable>tbody>tr>td").css("color","");
			$("#statsMeMapDataBoard_dataTable>tbody>tr").each(function() {
				var lvTr = $(this);
				var lvFlag = false;
				lvTr.children("td").each(function() {
					var lvTd = $(this);
					var lvTdText = lvTd.text();
					if((""+lv_adm_nm).indexOf(lvTdText) == 0) {
						lvFlag = true;
						return false;
					}
				});
				if(lvFlag == true) {
					lvTr.css("font-weight","bolder");
					lvTr.children("td").css("color","blue");
					return false;
				}
			});
	    }
	};
	
	// 지도 버튼 콜백 함수 선언
	$statsMeMap.mapBtnInfo = {
		//map.js에서 지도 zoomend 이벤트에서 자동으로 호출함.
		//필요 이벤트 this.map.addControlEvent("zoomend");
		changeZoomLevelTitle : function(title) {
			if(title == "전국" || title == "시도") {
				title = "전국";
			}
			else if(title == "시군구") {
				title = "시도";
			}
			else if(title == "읍면동") {
				title = "시군구";
			}
			else if(title == "집계구") {
				title = "읍면동";
			}
			$("#statsMeMapMap a.rightQuick.rq04").text(title);
		}
	};
	
	// 지도 동작 콜백 함수 선언
	$statsMeMap.callbackFunc = {
		// 현재위치로 이동 후 콜백. 현재위치 못찾으면 동작 안함
		didEndMoveCurrentLocation : function(map) {
			//console.log("didEndMoveCurrentLocation");
		},
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			//console.log("didSelectedPolygon - START");
		},
		// 지도이동. createMap()에서 "movestart" 이벤트 선언시 콜백됨. 
		didMapMoveStart : function(event, map) {
			//console.log("didMapMoveStart - START");
		},
		// 지도이동종료. createMap()에서 "moveend" 이벤트 선언시 콜백됨.
		didMapMoveEnd : function(event, map) {
			console.log("[statsMeMap.js] didMapMoveEnd - START");
			
			//Validation
			//조회된 데이터 없으면 정지
			if($statsMeMap.ui.mapData == null) return;
			//지도 이동 이벤트 막혀있으면 지정 시간 이후에 풀어주기
			if($statsMeMap.ui.mapMoveEventYn == "N") {
				setTimeout(function() {
					$statsMeMap.ui.mapMoveEventYn = "Y";
				}, $statsMeMap.ui.mapMoveEventDelay);
				return;
			}
			//지도 이동 이벤트2 막혀있으면 지정 시간 이후에 풀어주기
			if($statsMeMap.ui.mapMoveEventYn2 == "N") {
				setTimeout(function() {
					$statsMeMap.ui.mapMoveEventYn2 = "Y";
				}, $statsMeMap.ui.mapMoveEventDelay);
				return;
			}
			
			//변수
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_zoom = $statsMeMap.ui.map.zoom;
			
			//색상/버블 (시도, 시군구, 읍면동, 소지역)
			if(($statsMeMap.ui.mapType == "color" || $statsMeMap.ui.mapType == "bubble") && ($statsMeMap.ui.mapRegion == "sido" || $statsMeMap.ui.mapRegion == "sgg" || $statsMeMap.ui.mapRegion == "emdong" || $statsMeMap.ui.mapRegion == "totreg")) {
				//지역 변경
				$statsMeMap.ui.getCenterToAdmCd($statsMeMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) return;
					
					var lv_from_sido_cd = $("#statsMePopupArea_sido").val();
					var lv_from_sgg_cd = $("#statsMePopupArea_sgg").val();
					var lv_from_emdong_cd = $("#statsMePopupArea_emdong").val();
					var lv_to_sido_cd = res.result.sido_cd;
					var lv_to_sgg_cd = res.result.sgg_cd;
					var lv_to_emdong_cd = res.result.emdong_cd;
					var lv_sido_change_yn = "N";
					var lv_sgg_change_yn = "N";
					var lv_emdong_change_yn = "N";
					if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";
					
					if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
						//접속지역 변경
						//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
						//$("#statsMePopupArea_sido").val(res.result.sido_cd);
						$statsMePopup.ui.getAreaSido(res.result.sido_cd);
						$statsMePopup.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
						$statsMePopup.ui.getAreaEmdong(res.result.sido_cd, res.result.sgg_cd, res.result.emdong_cd);
						
						//텍스트 변경
						$statsMeMain.ui.setPositionText();
					}
					
					//지도 조회
					//변수
					var lv_data = $statsMeMap.ui.mapData.data;
					var lv_zoom = $statsMeMap.ui.map.zoom;
					//전국
					if(lv_zoom <= 1 && lv_data.sido_disp_yn == "Y") {
						//이미 같은 전국이면 조회 안함
						if($statsMeMap.ui.mapRegion != "sido") {
							//전국 조회
							//$statsMeMap.ui.mapMoveEventYn = "N";
							$statsMeMap.ui.drawMapData("sido");
						}
					}
					//시도
					else if (lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn == "Y") {
						//이미 같은 전국이면 조회 안함
						if($statsMeMap.ui.mapRegion != "sido") {
							//전국 조회
							//$statsMeMap.ui.mapMoveEventYn = "N";
							$statsMeMap.ui.drawMapData("sido");
						}
					}
					//시군구
					else if (
						(lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn != "Y" && lv_data.sgg_disp_yn == "Y")
						|| (lv_zoom > 3 && lv_zoom <= 5 && lv_data.sgg_disp_yn == "Y")
					) {
						//이미 같은 시군구이면 조회 안함
						if(!($statsMeMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N")) {
							//시군구 조회
							//$statsMeMap.ui.mapMoveEventYn = "N";
							$statsMeMap.ui.drawMapData("sgg");
						}
					}
					//읍면동
					else if (
						(lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn != "Y" && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn == "Y")
						|| (lv_zoom > 3 && lv_zoom <= 5 && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn == "Y")
						|| (lv_zoom > 5 && lv_zoom <= 8 && lv_data.emdong_disp_yn == "Y")
					) {
						//이미 같은 읍면동이면 조회 안함
						if(!($statsMeMap.ui.mapRegion == "emdong" && lv_sgg_change_yn == "N")) {
							//읍면동 조회
							//$statsMeMap.ui.mapMoveEventYn = "N";
							$statsMeMap.ui.drawMapData("emdong");
						}
					}
					//소지역
					else if (
						(lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn != "Y" && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn != "Y" && lv_data.tot_reg_disp_yn == "Y")
						|| (lv_zoom > 3 && lv_zoom <= 5 && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn != "Y" && lv_data.tot_reg_disp_yn == "Y")
						|| (lv_zoom > 5 && lv_zoom <= 8 && lv_data.emdong_disp_yn != "Y" && lv_data.tot_reg_disp_yn == "Y")
						|| (lv_zoom > 8 && lv_data.tot_reg_disp_yn == "Y")
					) {
						//이미 같은 읍면동이면 조회 안함
						if(!($statsMeMap.ui.mapRegion == "totreg" && lv_emdong_change_yn == "N")) {
							//소지역 조회
							//$statsMeMap.ui.mapMoveEventYn = "N";
							$statsMeMap.ui.drawMapData("totreg");
						}
					}
				});
			}
			//열지도
			else if($statsMeMap.ui.mapType == "heat") {
				//지역 변경
				$statsMeMap.ui.getCenterToAdmCd($statsMeMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) return;
					
					//데이터
					var lv_data = $statsMeMap.ui.mapData.data;
					
					//지역변수
					var lv_from_sido_cd = $("#statsMePopupArea_sido").val();
					var lv_from_sgg_cd = $("#statsMePopupArea_sgg").val();
					var lv_from_emdong_cd = $("#statsMePopupArea_emdong").val();
					var lv_to_sido_cd = res.result.sido_cd;
					var lv_to_sgg_cd = res.result.sgg_cd;
					var lv_to_emdong_cd = res.result.emdong_cd;
					var lv_sido_change_yn = "N";
					var lv_sgg_change_yn = "N";
					var lv_emdong_change_yn = "N";
					if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";
					
					if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
						//접속지역 변경
						//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
						//$("#statsMePopupArea_sido").val(res.result.sido_cd);
						$statsMePopup.ui.getAreaSido(res.result.sido_cd);
						$statsMePopup.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
						$statsMePopup.ui.getAreaEmdong(res.result.sido_cd, res.result.sgg_cd, res.result.emdong_cd);
						
						//텍스트 변경
						$statsMeMain.ui.setPositionText();
					}
					
					//열지도 구분 (N : 격자 /Y : 지역)
					var lv_adm_yn = "N";
					
					//통계주제도
					if(lv_data.menu_nm == "통계주제도") {
						lv_adm_yn = "N";
					}
					//업종통계지도: 생활업종통계지도 > 개업현황
					else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "개업현황") {
						lv_adm_yn = "Y";
					}
					//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화
					else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "업종 밀집도 변화") {
						lv_adm_yn = "Y";
					}
					
					//열지도 (격자 100k)
					if(lv_adm_yn == "N" && $statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.map.curPolygonCode == "1") {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if(lv_data.sido_disp_yn == "Y") {
							$statsMeMap.ui.drawMapData("sido", "heat");
						}
						else {
							$statsMeMap.ui.drawMapData(null, "heat");
						}
					}
					//열지도 (격자 10k)
					else if(lv_adm_yn == "N" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.map.curPolygonCode == "2") {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if(lv_data.sido_disp_yn == "Y") {
							$statsMeMap.ui.drawMapData("sido", "heat");
						}
						else {
							$statsMeMap.ui.drawMapData(null, "heat");
						}
					}
					//열지도 (격자 1k)
					else if(lv_adm_yn == "N" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.map.curPolygonCode == "3") {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if(lv_data.sgg_disp_yn == "Y") {
							$statsMeMap.ui.drawMapData("sgg", "heat");
						}
						else {
							$statsMeMap.ui.drawMapData(null, "heat");
						}
					}
					//열지도 (격자 100m)
					else if(lv_adm_yn == "N" && ($statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5") && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5")) {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if($statsMeMap.ui.map.curPolygonCode == "4") {
							if(lv_data.emdong_disp_yn == "Y") {
								$statsMeMap.ui.drawMapData("emdong", "heat");
							}
							else {
								$statsMeMap.ui.drawMapData(null, "heat");
							}
						}
						else {
							if(lv_data.tot_reg_disp_yn == "Y") {
								$statsMeMap.ui.drawMapData("totreg", "heat");
							}
							else {
								$statsMeMap.ui.drawMapData(null, "heat");
							}
						}
					}
					//열지도 (시도) (1,2)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sido", "heat");
					}
					//열지도 (시군구) (3)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_adm_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "Y" && (lv_sido_change_yn == "Y" || $statsMeMap.ui.heatMapPolygonCode != "3") && $statsMeMap.ui.map.curPolygonCode == "3")
						|| (lv_adm_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sgg", "heat");
					}
					//열지도 (읍면동) (4)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || $statsMeMap.ui.heatMapPolygonCode != "4") && $statsMeMap.ui.map.curPolygonCode == "4")
						|| (lv_adm_yn == "Y" && lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "N" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("emdong", "heat");
					}
					//열지도 (소지역) (5)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_adm_yn == "Y" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || $statsMeMap.ui.heatMapPolygonCode != "5") && $statsMeMap.ui.map.curPolygonCode == "5")
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("totreg", "heat");
					}
				});
			}
			//POI
			else if($statsMeMap.ui.mapType == "poi") {
				//지역 변경
				$statsMeMap.ui.getCenterToAdmCd($statsMeMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) return;
					
					//데이터
					var lv_data = $statsMeMap.ui.mapData.data;
					
					//지역변수
					var lv_from_sido_cd = $("#statsMePopupArea_sido").val();
					var lv_from_sgg_cd = $("#statsMePopupArea_sgg").val();
					var lv_from_emdong_cd = $("#statsMePopupArea_emdong").val();
					var lv_to_sido_cd = res.result.sido_cd;
					var lv_to_sgg_cd = res.result.sgg_cd;
					var lv_to_emdong_cd = res.result.emdong_cd;
					var lv_sido_change_yn = "N";
					var lv_sgg_change_yn = "N";
					var lv_emdong_change_yn = "N";
					if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";
					
					if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
						//접속지역 변경
						//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
						//$("#statsMePopupArea_sido").val(res.result.sido_cd);
						$statsMePopup.ui.getAreaSido(res.result.sido_cd);
						$statsMePopup.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
						$statsMePopup.ui.getAreaEmdong(res.result.sido_cd, res.result.sgg_cd, res.result.emdong_cd);
						
						//텍스트 변경
						$statsMeMain.ui.setPositionText();
					}
					
					//POI 시도 (1,2)
					if(
						(lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sido", "poi");
					}
					//POI 시군구 (3)
					else if(
						(lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "Y" && (lv_sido_change_yn == "Y" || $statsMeMap.ui.poiMapPolygonCode != "3") && $statsMeMap.ui.map.curPolygonCode == "3")
						|| (lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sgg", "poi");
					}
					//POI 읍면동 (4)
					else if(
						(lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || $statsMeMap.ui.poiMapPolygonCode != "4") && $statsMeMap.ui.map.curPolygonCode == "4")
						|| (lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "N" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("emdong", "poi");
					}
					//POI 소지역 (5)
					else if(
						(lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || $statsMeMap.ui.poiMapPolygonCode != "5") && $statsMeMap.ui.map.curPolygonCode == "5")
					) {
						//$statsMeMap.ui.mapMoveEventYn = "N";
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("totreg", "poi");
					}
				});
			}
		},
		// 줌 시작. createMap()에서 "zoomstart" 이벤트 선언시 콜백됨. 
		didMapZoomStart : function(event, map) {
			//console.log("didMapZoomStart - START");
		},
		// 줌 종료. createMap()에서 "zoomend" 이벤트 선언시 콜백됨. 
		didMapZoomEnd : function(event, map) {
			//console.log("didMapZoomEnd - START");
		},
		// 지도 드래그. createMap()에서 "drag" 이벤트 선언시 콜백됨. 
		didMapDrag : function(event, map) {
			//console.log("didMapDrag - START");
		},
		// 지도 드래그 종료. createMap()에서 "dragend" 이벤트 선언시 콜백됨. 
		didMapDragEnd : function(event, map) {
			//console.log("didMapDragEnd - START");
		},
		/**
		 * 
		 * @name         : didMouseOverPolygon
		 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
		 * @date         : 2014. 10. 11. 
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param data   : 해당 레이어 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 */
		didMouseOverPolygon : function(event, data, type, map) {
			if (type != "polygon") {
				if (type == "data") {
					if (data.info.length > 0) {
						map.legend.selectLegendRangeData(event.target.options.fillColor);
					}
				}
				$statsMeMap.ui.createInfoTooltip(event, data, type, map);
			}
			else {
				$statsMeMap.ui.createInfoTooltip(event, data, type, map);
			}
		}
	};
	
	$statsMeMap.event = {
		/**
		 * @name		 : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date		 : 2019.08.08 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		setUIEvent : function() {
			var body = $("body");
			
			// 지도 선택
			body.on("click", "#statsMeMapMap a.rightQuick.rq06", function() {
				var lvThis = $(this);
				var on = lvThis.hasClass("on");
				lvThis.removeClass("on");
				if(!on){
					//2020-02-19 [김남민] 통계로-40 : 백지도 기능 숨김처리.
					lvThis.next(".rqListBox").stop().animate({"right":"0px"},0); //20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
					lvThis.addClass("on");
				}else{
					lvThis.next(".rqListBox").stop().animate({"right":"-650px"},0);//20200424 수정 (10번. 아이콘 우측에서 날라옴, 200ms ==> 0ms)
					lvThis.removeClass("on");
				}
			});
			
			var timer = null;
			
			//백지도 마우스오버
			body.on('mouseenter' , '#backMap' , function(){
				if($statsMeMap.ui.map.mapMode == 'white'){
					$("#white_child").show();
					if(timer)clearInterval(timer);
				}
				return false;
			});
			
			//백지도 마우스오버
			body.on('mouseleave' , '#backMap' , function(){
				if($statsMeMap.ui.map.mapMode == 'white'){
					timer = setInterval(function(){
						if(timer)clearInterval(timer);
						$("#white_child").hide();
					},1000);
				}
				return false;
			});
			
			//백지도 숨기기 마우스오버
			body.on('mouseenter' , '#white_child' , function(){
				if($statsMeMap.ui.map.mapMode == 'white'){
					$("#white_child").show();
					if(timer)clearInterval(timer);
				}
				return false;
			});
			
			//백지도 숨기기 마우스오버
			body.on('mouseleave' , '#white_child' , function(){
				if($statsMeMap.ui.map.mapMode == 'white'){
					timer = setInterval(function(){
						if(timer)clearInterval(timer);
						$("#white_child").hide();
					},1000);
				}
				return false;
			});
			
			// 지도 선택 > 위성, 일반, 백지도 선택
			body.on("click", "#statsMeMapMap ul.rqListBox.rq06>li>a", function() {
				var lvThis = $(this);
				var lvThisName = $(this).attr("name");
				
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '09', '00', $(this).text(), '');


				var that = $statsMeMap.ui;
				var type = lvThisName;
				var zoomMargin, crs;
				$(".sop-tile-pane").css("z-index" , "2");
				if (type == "settlite") {
					/*that.map.mapMode = "settlite";
					crs = that.createSatelliteCRS();
					that.baseTileLayer = that.createSatelliteTileLayer();
					that.targetTileLayer = that.map.gMap.statisticTileLayer;
					zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
					that.createTileLayer(that.map.gMap, crs, that.baseTileLayer, that.targetTileLayer, zoomMargin);*/
					if(!that.baseTileLayer){
						that.baseTileLayer = that.map.gMap.statisticTileLayer;
					}
					that.map.mapMode = "settlite";
					crs = that.createSatelliteCRS();
					that.targetTileLayer = that.baseTileLayer;
					that.baseTileLayer = that.createSatelliteTileLayer();
					zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
					that.createTileLayer(that.map.gMap, crs, that.baseTileLayer, that.targetTileLayer, zoomMargin);
				}else if(type == "white"){
					$(".sop-tile-pane").css("z-index" , "7");
					if(!that.baseTileLayer){
						that.baseTileLayer = that.map.gMap.statisticTileLayer;
					}
					that.map.mapMode = "white";	
					that.targetTileLayer = that.baseTileLayer;
					that.baseTileLayer = that.createWhiteTileLayer();
					zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
					that.createTileLayer(that.map.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);
				}else if(type == "white_child"){
					 that.map.gMap.removeLayer(that.baseTileLayer);
				}else {
					if(!that.baseTileLayer){
						that.baseTileLayer = map.gMap.statisticTileLayer;
					}
					that.map.mapMode = "normal";
					that.targetTileLayer = that.baseTileLayer;
					that.baseTileLayer = that.createNomalTileLayer();
					zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
					that.createTileLayer(that.map.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);
					/*that.map.mapMode = "normal";
					that.targetTileLayer = that.baseTileLayer;
					that.baseTileLayer = that.map.gMap.statisticTileLayer;
					zoomMargin = that.baseTileLayer.options.minZoom - that.targetTileLayer.options.minZoom;
					that.createTileLayer(that.map.gMap, sop.CRS.UTMK, that.baseTileLayer, that.targetTileLayer, zoomMargin);*/
				}
				if (that.delegate && that.delegate.callbackFunc && that.delegate.callbackFunc.didMapChangeMode instanceof Function) { 
					that.delegate.callbackFunc.didMapChangeMode(type, that.map);
				}
			});
			
			// 지도 확대
			body.on("click", "#statsMeMapMap a.rightQuick.rq03", function() {
				var that = $statsMeMap.ui;
				if (!that.map.isFixedBound) {
					that.map.gMap.zoomIn(1);
				} 
				//콜백(안씀)
				/*if (that.delegate != undefined && 
					that.delegate.callbackFunc != undefined &&
					that.delegate.callbackFunc.didMapZoomIn != undefined) {
					that.delegate.callbackFunc.didMapZoomIn(that.map);
				}*/
			});
			
			// 지도 축소
			body.on("click", "#statsMeMapMap a.rightQuick.rq05", function() {
				var that = $statsMeMap.ui;
				if (!that.map.isFixedBound) {
					that.map.gMap.zoomOut(1);
				}
				//콜백(안씀)
				/*if (that.delegate != undefined && 
					that.delegate.callbackFunc != undefined &&
					that.delegate.callbackFunc.didMapZoomOut != undefined) {
					that.delegate.callbackFunc.didMapZoomOut(that.map);
				}*/
			});
			
			// 데이터보드 닫기
			body.on("click", "#statsMeMapDataBoard_close", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '08', '00', '닫기', '');
				
				$statsMeMap.ui.dataBoardToggle(false, 400);
			});
			
			// 데이터보드 열기
			body.on("click", "#statsMeMapDataBoard_open", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '08', '00', '열기', '');
				
				$statsMeMap.ui.dataBoardToggle(true, 400);
			});
			
			// 데이터보드 테이블 페이징 이전 클릭
			body.on("click", "#statsMeMapDataBoard_pagingTable_page_prev", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '12', '00', '이전 페이지', '');
				
				//이전 페이지 목록을 표시
				var lvPage = Number($("#statsMeMapDataBoard_pagingTable_page").val())-1;
				if($("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_"+lvPage).length) {
					$("#statsMeMapDataBoard_pagingTable>tbody>tr>td").hide();
					$("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_"+lvPage).show();
					//마지막 페이지 선택
					$("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_"+lvPage).last().click();
					$("#statsMeMapDataBoard_pagingTable_page").val(lvPage);
				}
				//이전 페이지 없음
				else {
					//첫번째 페이지 선택
					$("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_1").first().click();
					//$statsMeMain.ui.alert("처음 페이지 입니다.");
				}
			});
			
			// 데이터보드 테이블 페이징 다음 클릭
			body.on("click", "#statsMeMapDataBoard_pagingTable_page_next", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '12', '00', '다음 페이지', '');

				//다음 페이지 목록을 표시
				var lvPage = Number($("#statsMeMapDataBoard_pagingTable_page").val())+1;
				if($("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_"+lvPage).length) {
					$("#statsMeMapDataBoard_pagingTable>tbody>tr>td").hide();
					$("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_"+lvPage).show();
					//첫번째 페이지 선택
					$("#statsMeMapDataBoard_pagingTable>tbody>tr>td.page_"+lvPage).first().click();
					$("#statsMeMapDataBoard_pagingTable_page").val(lvPage);
				}
				//다음 페이지 없음
				else {
					//이미 마지막 페이지 인 경우
					if($("#statsMeMapDataBoard_pagingTable>tbody>tr>td").last().hasClass("on")) {
						$statsMeMain.ui.alert("마지막 페이지 입니다.");
					}
					//마지막 페이지 아닌 경우
					else {
						//마지막 페이지 선택
						$("#statsMeMapDataBoard_pagingTable>tbody>tr>td").last().click();
					}
				}
			});

			// 데이터보드 테이블 페이징 페이지 클릭
			body.on("click", "#statsMeMapDataBoard_pagingTable>tbody>tr>td", function() {
				var lvThis = $(this);
				var lvThisText = lvThis.text();

			    // 2020.02.19 log 생성
			    srvLogWrite('N0', '09', '12', '00', 'page: '+lvThisText, '');
			    
				//선택한 페이지로 세팅
				$("#statsMeMapDataBoard_pagingTable>tbody>tr>td").removeClass("on");
				lvThis.addClass("on");
				
				//선택한 페이지 표시
				$("#statsMeMapDataBoard_dataTable>tbody>tr").hide();
				$("#statsMeMapDataBoard_dataTable>tbody>tr.page_"+lvThisText).show();
				$("#statsMeMapDataBoard_dataTable_page").val(lvThisText);				
			});
			
			// 접속지역 선택
			body.on("click", "#statsMeMapMapArea", function() {
				$statsMePopup.ui.area();
			});
			
			// 지역경계 시도
			body.on("click", "#statsMeMapMapRegion_sido", function() {
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				$statsMeMap.ui.drawMapData("sido");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("sido", $statsMeMap.ui.mapType);		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			// 지역경계 시군구
			body.on("click", "#statsMeMapMapRegion_sgg", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '04', '00', '시도', '');
				
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				$statsMeMap.ui.drawMapData("sgg");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("sgg", $statsMeMap.ui.mapType);		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			// 지역경계 읍면동
			body.on("click", "#statsMeMapMapRegion_emdong", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '04', '00', '시군구', '');
				
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				$statsMeMap.ui.drawMapData("emdong");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("emdong", $statsMeMap.ui.mapType);		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			// 지역경계 소지역
			body.on("click", "#statsMeMapMapRegion_totreg", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '04', '00', '읍면동', '');
				
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				$statsMeMap.ui.drawMapData("totreg");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("totreg", $statsMeMap.ui.mapType);		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			// 지도유형 색상지도표출여부
			body.on("click", "#statsMeMapMapType_color", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '05', '00', '색상', '');

				if($statsMeMap.ui.mapType != "color" && $statsMeMap.ui.mapType != "bubble") {
					$statsMeMap.ui.mapFirstMoveYn = "Y";
				}
				$statsMeMap.ui.drawMapData(null, "color");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory($statsMeMap.ui.mapRegion, "color");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			// 지도유형 버블지도표출여부
			body.on("click", "#statsMeMapMapType_bubble", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '05', '00', '버블', '');

				if($statsMeMap.ui.mapType != "color" && $statsMeMap.ui.mapType != "bubble") {
					$statsMeMap.ui.mapFirstMoveYn = "Y";
				}
				$statsMeMap.ui.drawMapData(null, "bubble");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory($statsMeMap.ui.mapRegion, "bubble");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			// 지도유형 열지도표출여부
			body.on("click", "#statsMeMapMapType_heat", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '05', '00', '열지도', '');
				
				if($statsMeMap.ui.mapType != "heat") {
					$statsMeMap.ui.mapFirstMoveYn = "Y";
					$statsMeMap.ui.drawMapData(null, "heat");
					
					$statsMeCatalog.ui.catalogMapSrvUsageHistory($statsMeMap.ui.mapRegion, "heat");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
				}
			});
			
			// 지도유형 POI지도표출여부
			body.on("click", "#statsMeMapMapType_poi", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '05', '00', 'POI', '');
				
				if($statsMeMap.ui.mapType != "poi") {
					//2020-02-28 [김남민] 통계로-49 : 업종통계지도 열지도 및 POI 표출 기준 변경 START
					var lv_data = $statsMeMap.ui.mapData.data;
					var lv_map_region = $statsMeMap.ui.mapRegion;
					//업종통계지도: 생활업종통계지도 > 개업현황 (시도, 시군구 제외)
					if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "개업현황"
						&& (lv_map_region == "sido" || lv_map_region == "sgg")
					) {
						$statsMeMap.ui.mapFirstMoveYn = "Y";
						$statsMeMap.ui.drawMapData("emdong", "poi");
						
						$statsMeCatalog.ui.catalogMapSrvUsageHistory("emdong", "poi");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
					}
					//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화 (시도, 시군구, 읍면동 제외)
					else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "업종 밀집도 변화"
						&& (lv_map_region == "sido" || lv_map_region == "sgg" || lv_map_region == "emdong")
					) {
						$statsMeMap.ui.mapFirstMoveYn = "Y";
						$statsMeMap.ui.drawMapData("totreg", "poi");
						
						$statsMeCatalog.ui.catalogMapSrvUsageHistory("totreg", "poi");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
					}
					else {
						$statsMeMap.ui.mapFirstMoveYn = "Y";
						$statsMeMap.ui.drawMapData(null, "poi");
						
						$statsMeCatalog.ui.catalogMapSrvUsageHistory($statsMeMap.ui.mapRegion, "poi");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
					}
					//2020-02-28 [김남민] 통계로-49 : 업종통계지도 열지도 및 POI 표출 기준 변경 END
				}
			});
			
			// 지도유형 격자(100m)
			body.on("click", "#statsMeMapMapType_100m", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '05', '00', '100m 격자', '');
				
				//$statsMeMap.ui.mapFirstMoveYn = "Y";
				$statsMeMap.ui.drawMapData("100m");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory($statsMeMap.ui.mapRegion, "100m");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			// 자세히 이동
			body.on("click", "#statsMeMapGoDetail>a, #statsMeMapGoDetail>img", function() {
				// 2020.02.19 log 생성
				if ($statsMeMain.ui.currentPageName == "statsMeMap"){
					srvLogWrite('N0', '09', '11', '00', $statsMeMap.ui.mapData.data.menu_nm, ''); //'지도로 확인해요' > 데이터보드 - 콘텐츠 바로가기
				} else if ($statsMeMain.ui.currentPageName == "statsMeDetailInfo"){
					srvLogWrite('N0', '10', '04', '00', $statsMeMap.ui.mapData.data.menu_nm, ''); //'상세정보로 확인해요' > SGIS 콘텐츠 출처 바로가기
				}
				
				var lvThis = $(this);
				if(lvThis.parent().hasClass("hidden")) {
					return;
				}
				//Validation
				if($statsMeMap.ui.mapData == null) {
					$statsMeMain.ui.alert("조회된 데이터가 없습니다.");
					return;
				}
				else {
					//변수선언
					var lv_adm_cd = "00";
					var lv_adm_nm = "전국";
					var lv_sido_cd = $("#statsMePopupArea_sido").val();
					var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
					var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
					var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
					var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
					var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
					var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
					var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
					var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
					var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();
					var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
					var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
					var lv_x = $statsMeMap.ui.map.gMap.getCenter().x;
					var lv_y = $statsMeMap.ui.map.gMap.getCenter().y;
					var lv_zoom = $statsMeMap.ui.map.zoom;
					var lv_map_region = $statsMeMap.ui.mapRegion;
					var lv_map_type = $statsMeMap.ui.mapType;
					var lv_curPolygonCode = $statsMeMap.ui.map.curPolygonCode;
					if(lv_map_region == "totreg") { // 읍면동
						lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
						lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
						lv_x = lv_emdong_coor_x;
						lv_y = lv_emdong_coor_y;
						lv_zoom = 9;
					} else if(lv_map_region == "emdong") { // 시군구
						lv_adm_cd = lv_sido_cd + lv_sgg_cd;
						lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
						lv_x = lv_sgg_coor_x;
						lv_y = lv_sgg_coor_y;
						lv_zoom = 6;
					} else if(lv_map_region == "sgg") { // 시도
						lv_adm_cd = lv_sido_cd;
						lv_adm_nm = lv_sido_nm;
						lv_x = lv_sido_coor_x;
						lv_y = lv_sido_coor_y;
						lv_zoom = 4;
					} else if(lv_map_region == "sido") { // 전국
						lv_adm_cd = "00";
						lv_adm_nm = "전국";
						lv_x = 989674; 
						lv_y = 1818313;
						lv_zoom = 2;
						lv_curPolygonCode = 2;
					}
					
					//대화형 통계지도 > 전국 사업체조사: 산업분류
					if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "전국 사업체조사: 산업분류") {
						var lv_ksic_1_cd = $statsMeMap.ui.mapData.data.ksic_1_cd;
						var lv_ksic_4_cd = $statsMeMap.ui.mapData.data.ksic_4_cd;
						if(
							lv_ksic_1_cd != undefined && lv_ksic_1_cd != null && lv_ksic_1_cd != ""
							&& lv_ksic_4_cd != undefined && lv_ksic_4_cd != null && lv_ksic_4_cd != ""
						) {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = $statsMeMap.ui.mapData.data.stat_data_nm;
							lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "/OpenAPI3/stats/company.json", //전국 사업체조사: 산업분류
								"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
								"params": {
									"mapInfo": {
										"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
										"center": [lv_x, lv_y]
									},
									"paramInfo": {
										"class_code": lv_ksic_1_cd+lv_ksic_4_cd,
										"area_type": "0",
										"bnd_year": bndYear,
										"year": $statsMeMap.ui.mapData.data.stat_data_base_year,
										"low_search": "1",
										"adm_cd": lv_adm_cd
									},
									"showData": "corp_cnt",
									"unit": "개",
									"api_id": "API_0304",
									"isKosis": false,
									"btntype": "normal",
									"legend": {
										"type": "color",
										"level": 7,
										"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
									},
									"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
									"curPolygonCode": lv_curPolygonCode,
									"mapCaptureId": "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						}
						else {
							$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
						}
					}
					//대화형 통계지도 > 전국 사업체조사: 테마업종
					else if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "전국 사업체조사: 테마업종") {
						var lv_theme_cd = $statsMeMap.ui.mapData.data.theme_cd;
						if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = $statsMeMap.ui.mapData.data.stat_data_nm;
							lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "/OpenAPI3/stats/company.json", //전국 사업체조사: 산업분류
								"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
								"params": {
									"mapInfo": {
										"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
										"center": [lv_x, lv_y]
									},
									"paramInfo": {
										"theme_cd": lv_theme_cd,
										"area_type": "0",
										"year": $statsMeMap.ui.mapData.data.stat_data_base_year,
										"low_search": "1",
										"bnd_year": bndYear,
										"adm_cd": lv_adm_cd
									},
									"showData": "corp_cnt",
									"unit": "개",
									"api_id": "API_0304",
									"isKosis": false,
									"btntype": "normal",
									"legend": {
										"type": "color",
										"level": 7,
										"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
									},
									"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
									"maxYear": "2017",
									"curPolygonCode": lv_curPolygonCode,
									"mapCaptureId": "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						}
						else {
							$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
						}
					}
					//대화형 통계지도 > 인구주택총조사
					else if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "인구주택총조사") {
						var lv_b_class_nm = $statsMeMap.ui.mapData.data.b_class_nm;
						var lv_year = $statsMeMap.ui.mapData.data.year;
						var lv_bnd_year = $statsMeMap.ui.mapData.data.bnd_year;
						
						if(lv_b_class_nm == "인구조건") {
							window.open($statsMeMap.ui.mapData.data.link_url);
						} else if(lv_b_class_nm == "가구조건") {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = "1인가구";
							lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "/OpenAPI3/stats/household.json", // 대화형 통계지도:인구주택총조사:가구조건
								"title":"1인가구",
								"params": {
									"mapInfo": {
										"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
										"center": [lv_x, lv_y]
									},
									"paramInfo": {
										"household_type":"A0",
										"area_type":"0",
										"year" : lv_year,
										"low_search" : "1",
										"bnd_year" : bndYear,
										"adm_cd" : lv_adm_cd
									},
									"showData" : "household_cnt",
									"unit" : "가구",
									"api_id" : "API_0305",
									"isKosis" : false,
									"btntype" : "normal",
									"legend" : {
										"type" : "color",
										"level" : 7,
										"color" : ["#ffd75d","#f6b64e","#ee953f","#e67430","#dd5321","#d53212","#cd1103"]
									},
									"title":"1인가구",
									"maxYear": null,
									"curPolygonCode": lv_curPolygonCode,
									"mapCaptureId": "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝							
						} else if(lv_b_class_nm == "주택조건") {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = "총주택";
							lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "/OpenAPI3/stats/house.json", // 대화형 통계지도:인구주택총조사:주택조건
								"title":"총주택",
								"params": {
									"mapInfo": {
										"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
										"center": [lv_x, lv_y]
									},
									"paramInfo": {
										"area_type" : "0",
										"year" : lv_year,
										"low_search" : "1",
										"bnd_year" : lv_bnd_year,
										"adm_cd" : lv_adm_cd
									},
									"showData" : "house_cnt",
									"unit" : "호",
									"api_id" : "API_0306",
									"isKosis" : false,
									"btntype" : "normal",
									"legend" : {
										"type" : "color",
										"level" : 7,
										"color" : [ "#ffd75d", "#f6b64e",
												"#ee953f", "#e67430", "#dd5321",
												"#d53212", "#cd1103" ]
									},
									"title" : "총주택",
									"maxYear": null,
									"curPolygonCode": lv_curPolygonCode,
									"mapCaptureId": "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						}
						/** 2020.05.14[한광희] My통계로 신규 지표 추가 START */
						else if(lv_b_class_nm == "결합조건") {
							window.open($statsMeMap.ui.mapData.data.link_url);
						}
						/** 2020.05.14[한광희] My통계로 신규 지표 추가 END */
						
					}
					//2020-02-18 [김남민] E지방지표 링크 기능 안됨 START
					//대화형 통계지도 > e-지방지표
					else if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "e-지방지표") {
						var lv_url = "/view/map/interactiveMap/ecountry";
						var lv_ecountry_map = $statsMeMap.ui.ecountryMapping[$statsMeMap.ui.mapData.data.stat_data_id];
						lv_url += "?list_id="+lv_ecountry_map.list_id;
						lv_url += "&tbl_id="+lv_ecountry_map.tbl_id;
						lv_url += "&base_item_id="+lv_ecountry_map.base_item_id;
						if(lv_ecountry_map.add_item_id != undefined && lv_ecountry_map.add_item_id != null && lv_ecountry_map.add_item_id != "") {
							lv_url += "&add_item_id="+lv_ecountry_map.add_item_id;
						}
						lv_url += "&prd_id="+lv_ecountry_map.prd_id;
						lv_url += "&prid_value="+lv_ecountry_map.prid_value;
						lv_url += "&adm_cd="+lv_adm_cd;
						window.open(lv_url);
					}
					//2020-02-18 [김남민] E지방지표 링크 기능 안됨 END
					//업종통계지도: 생활업종통계지도 > 시군구별 업종현황
					else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 생활업종통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "시군구별 업종현황") {
						var lv_theme_cd = $statsMeMap.ui.mapData.data.theme_cd;
						if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = "시군구별 생활업종 현황";
							lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "/OpenAPI3/startupbiz/sggtobcorpcount.json", //업종통계지도: 생활업종통계지도 > 시군구별 업종현황
								"params": {
									"mapInfo": {
										"zoomlevel": 2,
										"center": [1007770, 1855549]
									},
									"paramInfo": {
										"theme_cd": lv_theme_cd,
										"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
										"adm_nm": "전국",
										"curSelectedStatsType": "jobArea",
										"jobAreaThemeCd": ""
									},
									"showData": null,
									"unit": null,
									"api_id": "API_0615",
									"isKosis": false,
									"btntype": null,
									"legend": {
										"type": "color",
										"level": 7,
										"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
									},
									"title": "시군구별 생활업종 현황",
									"maxYear": null,
									"mapCaptureId": "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						}
						else {
							$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
						}
					}
					//업종통계지도: 생활업종통계지도 > 개업현황
					else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 생활업종통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "개업현황") {
						var lv_service_code = $statsMeMap.ui.mapData.data.service_code;
						if(lv_service_code != undefined && lv_service_code != null && lv_service_code != "") {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = "업종별 개업 현황";
							lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "none",
								"title": "업종별 개업 현황",
								"params": {
									"mapInfo": {
										"zoomlevel": 6, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
										"center": [lv_emdong_coor_x, lv_emdong_coor_y]
									},
									"paramInfo": {
										"curSelectedStatsType": "jobOpen",
										"theme_cd": lv_service_code,
										"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
										"adm_cd": lv_sido_cd+lv_sgg_cd+lv_emdong_cd,
										"adm_nm": lv_sido_nm+" "+lv_sgg_nm+" "+lv_emdong_nm,
										"year": $statsMeMap.ui.mapData.data.stat_data_base_year
									},
									"showData": null,
									"unit": null,
									"api_id": "none",
									"isKosis": false,
									"btntype": null,
									"legend": {
										"type": "heat",
										"level": 7,
										"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
									},
									"title": "업종별 개업 현황",
									"maxYear": null,
									"mapCaptureId": "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						}
						else {
							$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
						}
					}
					//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화
					else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 생활업종통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "업종 밀집도 변화") {
						var lv_theme_cd = $statsMeMap.ui.mapData.data.theme_cd;
						if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = "업종별 밀집도 현황";
							lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "none",
								"title": "업종별 밀집도 현황",
								"params": {
									"mapInfo": {
										"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
										"center": [lv_x, lv_y]
									},
									"paramInfo": {
										"curSelectedStatsType": "jobChange",
										"theme_cd": lv_theme_cd,
										"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
										"adm_cd": lv_adm_cd,
										"adm_nm": lv_adm_nm,
										"year": $statsMeMap.ui.mapData.data.stat_data_base_year
									},
									"showData": null,
									"unit": null,
									"api_id": "none",
									"isKosis": false,
									"btntype": null,
									"legend": {
										"type": "heat",
										"level": 7,
										"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
									},
									"title": "업종별 밀집도 현황",
									"maxYear": null,
									"mapCaptureId": "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						}
						else {
							$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
						}
					}
					//업종통계지도: 기술업종통계지도
					else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 기술업종통계지도") {
						var lv_techbiz_m_class_cd = $statsMeMap.ui.mapData.data.techbiz_m_class_cd;
						if(lv_techbiz_m_class_cd != undefined && lv_techbiz_m_class_cd != null && lv_techbiz_m_class_cd != "") {
							//즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = $statsMeMap.ui.mapData.data.stat_data_nm;
							lv_params.map_type = "TECH"; // 업종통계지도: 기술업종통계지도 고정값
							lv_params.params = JSON.stringify([{
								"url": "/ServiceAPI/technicalBiz/sggCompanyMapInfo.json", //전국 사업체조사: 산업분류
								"params": {
									"mapInfo": {
										"zoomlevel": 2,
										"center": [1007770, 1855549]
									},
									"paramInfo": {
										"theme_cd": lv_techbiz_m_class_cd,
										"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
										"adm_nm": "전국",
										"viewType": "color"
									},
									"legend": {
										"type": "bubble",
										"level": "7",
										"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
									},
									"type": "sigungu"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/technicalBiz/technicalBizMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						}
						else {
							$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
						}
					} 
					// 살고싶은 우리동네
					else if($statsMeMap.ui.mapData.data.menu_nm == "살고싶은 우리동네") {
						var lv_m_class_idx_id = $statsMeMap.ui.mapData.data.m_class_idx_id;
						var lv_b_class_idx_id = $statsMeMap.ui.mapData.data.b_class_idx_id;
						if(lv_m_class_idx_id != undefined && lv_m_class_idx_id != null && lv_m_class_idx_id != ""
							&& lv_b_class_idx_id != undefined && lv_b_class_idx_id != null && lv_b_class_idx_id != ""
							) {
							// 즐겨찾기 테이블에 등록
							var lv_params = {};
							var lv_hist_id = makeRandomThirtySevenDigitString();
							lv_params.hist_id = lv_hist_id;
							lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
							lv_params.hist_nm = "주거현황보기";
							lv_params.map_type = "HMAP";	// 살고싶은 우리동네 고정 값
							
							/** My통계로 지역경계에 따른 살고싶은 우리동네 zoomlevel, adm_cd 셋팅 START */
							var lv_zoomlevel = 2;	
							var lv_adm_cd = "";
							// My통계로:전국, 살고싶은 우리동네:시도
							if($statsMeMap.ui.mapRegion == "sido"){
								lv_zoomlevel = 2;
								lv_adm_cd = "00";
							}
							// My통계로:시도, 살고싶은 우리동네:시군구
							else if($statsMeMap.ui.mapRegion == "sgg"){
								lv_zoomlevel = 4;
								lv_adm_cd = $statsMeMain.ui.default_sido_cd;
							}
							// My통계로:시군구, 살고싶은 우리동네:읍면동
							else if($statsMeMap.ui.mapRegion == "emdong"){
								lv_zoomlevel = 6;
								lv_adm_cd = $statsMeMain.ui.default_sido_cd + $statsMeMain.ui.default_sgg_cd;
							}
							/** My통계로 지역경계에 따른 살고싶은 우리동네 zoomlevel, adm_cd 셋팅 END */
							
							lv_params.params = JSON.stringify([{
								"url": "/SOPOpenAPI/OpenAPI3/boundary/hadmarea.geojson", // 살고싶은 우리동네
								"params": {
									"mapInfo": {
										"zoomlevel": lv_zoomlevel,	// 1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
										"center": [$statsMeMain.ui.default_x, $statsMeMain.ui.default_y]
									},
									"paramInfo": {
										"adm_cd": lv_adm_cd,
										"b_class_idx_id": lv_b_class_idx_id,
										"m_class_idx_id": lv_m_class_idx_id,
										"chkbox_chk": 1
									},
									"legend": {
										"type": "color",
										"level": "5",
										"color": ["#ccc", "#b8c4a8", "#a5bc85",	"#92b461", "#7fad3e"]
									},
									"title" : "주거현황보기",
									"type": 1,
									"mapCaptureId" : "#mapRgn_1"
								}
							}]);
							// ajax 시작
							$.ajax({
							    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
							    type: 'post',
							    async : false,
							    data: lv_params
							}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
								window.open(contextPath+"/view/house/houseAnalysisMap/sharedata?id="+lv_hist_id);
							});
							// ajax 끝
						} else {
							$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
						}
					}
					//나머지
					else if($statsMeMap.ui.mapData.data.link_url != undefined && $statsMeMap.ui.mapData.data.link_url != null && $statsMeMap.ui.mapData.data.link_url != "") {
						window.open($statsMeMap.ui.mapData.data.link_url);
					}
					//예외처리
					else {
						$statsMeMain.ui.alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
			});
			
			// 보고서 클릭
			body.on("click", "#statsMeMap_print", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '06', '00', '', '');

				$statsMeMap.ui.doPrint();
			});
			
			// 즐겨찾기 클릭
			body.on("click", "#statsMeMap_bookmark", function() {
				//Validation
				if($statsMeMap.ui.mapData == null) {
					$statsMeMain.ui.alert("조회된 데이터가 없습니다.");
					return;
				}
				
				//로그인 필요
				if(!AuthInfo.authStatus) {
					$statsMeMain.ui.confirm(
						"즐겨찾기 기능은 로그인 후 이용하실 수 있습니다.<br>로그인 하시겠습니까?",
						"알림",
						function() {
							$statsMeMap.ui.doBookMark("SHARE", function(p_hist_id) {
								goSelectLogin("//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id);
							});
						}
					);
				}
				//즐겨찾기 처리
				else {
					$statsMeMain.ui.confirm(
						//2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정
						"해당 공간통계정보를 즐겨찾기 하시겠습니까?",
						"알림",
						function() {
							$statsMeMap.ui.doBookMark("BMARK", function() {
								// 2020.02.19 log 생성
								if($statsMeMain.ui.currentPageName == 'statsMeMap'){
									srvLogWrite('N0', '09', '07', '00', '', '');
								} else if ($statsMeMain.ui.currentPageName == 'statsMeDetailInfo'){
									srvLogWrite('N0', '10', '03', '00', '', '');
								}
						    	
								$statsMeMain.ui.confirm(
									"즐겨찾기가 완료 되었습니다.<br>확인 하시겠습니까?",
									"알림",
									function() {
										window.open(contextPath+"/view/mypage/bookmark");
									}
								);
							});
						}
					);
				}
			});
			
			// SNS 공유 (카카오스토리) 클릭
			body.on("click", "#statsMeMap_share_kakaostory", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '10', '00', '카카오스토리', '');
				
				$statsMeMap.ui.doBookMark("SHARE", function(p_hist_id) {
					try {
						Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
					} catch(e) { }
					//2020-02-12 [김남민] SNS 서비스 링크시 화면 크기 조절 (스크롤 추가) START
					/*Kakao.Story.share({
						url: window.location.protocol+"//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id,
						//2020-01-31 [김남민] 통계Me => My통계로 명칭 변경.
						//2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정
						text: "[My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다."
					});*/
					//로딩바
					//2019-02-19 [김남민] 카카오 로딩바 수정
					//$statsMeMain.ui.loading(true);
					Kakao.Auth.login({
						success : function(authObj) {
							var linkURL = window.location.protocol+"//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id;
							Kakao.API.request({
								url : '/v1/api/story/linkinfo',
								data : {
									url : linkURL
								},
							}).then(function(res) {
								//2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정
								//2020-02-26 [김남민] 통계로-53 : SNS 공유 자료 클릭시 모바일 첫 페이지로 링크됨 START
								//res.url = window.location.protocol+"//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id;
								//res.description = "[My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.";
								//2020-02-26 [김남민] 통계로-53 : SNS 공유 자료 클릭시 모바일 첫 페이지로 링크됨 END
								return Kakao.API.request( {
									url : '/v1/api/story/post/link',
									data : {
										link_info : res
									}
								});
							}).then(function(res) {
								return Kakao.API.request( {
									url : '/v1/api/story/mystory',
									data : { id : res.id },
									success: function(res) {
										//로딩바
										//2019-02-19 [김남민] 카카오 로딩바 수정
										//$statsMeMain.ui.loading(false);
										$statsMeMain.ui.alert("카카오스토리에 정상적으로 공유하였습니다.");
									},
									fail : function(error) {
										//로딩바
										//2019-02-19 [김남민] 카카오 로딩바 수정
										//$statsMeMain.ui.loading(false);
										$statsMeMain.ui.alert("카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
									}
								});
							});
						},
						fail : function(error) {
							//로딩바
							//2019-02-19 [김남민] 카카오 로딩바 수정
							//$statsMeMain.ui.loading(false);
							$statsMeMain.ui.alert("카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
						}
					});
					//2020-02-12 [김남민] SNS 서비스 링크시 화면 크기 조절 (스크롤 추가) END
				});
			});
			
			// SNS 공유 (트위터) 클릭
			body.on("click", "#statsMeMap_share_twitter", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '10', '00', '트위터', '');
				
				$statsMeMap.ui.doBookMark("SHARE", function(p_hist_id) {
					var lv_url = window.location.protocol+"//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id;
					//2020-01-31 [김남민] 통계Me => My통계로 명칭 변경.
					//2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정
					var lv_text = "[My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.";
					window.open("https://twitter.com/share?url="+encodeURIComponent(lv_url)+"&text="+encodeURIComponent(lv_text)+"&hashtags=");
				});
			});
			
			// SNS 공유 (페이스북) 클릭
			body.on("click", "#statsMeMap_share_facebook", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '10', '00', '페이스북', '');
				
				$statsMeMap.ui.doBookMark("SHARE", function(p_hist_id) {
					window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.protocol+"//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id));
				});
			});
			
			// SNS 공유 (linked) 클릭
			/*body.on("click", "#statsMeMap_share_linkedin", function() {
				$statsMeMap.ui.doBookMark("SHARE", function(p_hist_id) {
					var lv_url = window.location.protocol+"//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id;
					//2020-01-31 [김남민] 통계Me => My통계로 명칭 변경.
					//2020-02-17 [김남민] 생애주기, 관심분야, 카탈로그 화면의 ‘통계정보＇용어를 ‘공간통계정보＇로 수정
					var lv_text = "[My통계로]개인 관심주제에 맞는 공간통계정보를 제공합니다.";
					//window.open("https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(lv_url)+"&title="+encodeURIComponent(lv_text)+"&source="+window.location.host);
					window.open("https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(lv_url));
				});
			});*/
			
			// SNS 공유 (인스타그램) 클릭
			/*body.on("click", "#statsMeMap_share_instagram", function() {
				
			});*/
			
			//뒤로 클릭
			body.on("click", "#statsMeMapBack", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '01', '00', '', '');

				$statsMeMain.ui.confirm2(
					"지금 보고 있는 화면을 나가시겠습니까?<br>화면을 나가시면 지금 보는 지도화면이<br>초기화 됩니다.",
					"알림",
					function() {
						$statsMeMain.ui.changePage("statsMeCatalog");
					}
				);
			});
			
			//앞으로 클릭
			body.on("click", "#statsMeMapForward", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '09', '02', '00', '', '');
				
				$statsMeMain.ui.changePage("statsMeDetailInfo");
			});
			
			/** 2020.05.19[한광희] 자료출처 클릭 시 e-지방지표 화면으로 이동할 수 있는 link 추가 START */
			// 출처 url 링크 바로가기
			body.on("click", "#statsMeMapSource>a", function() {
				window.open($statsMeMap.ui.mapData.data.source_url);
			});
			/** 2020.05.19[한광희] 자료출처 클릭 시 e-지방지표 화면으로 이동할 수 있는 link 추가 END */
		}
	};
	
	/*********** 지도 데이터 조회 시작 **********/
	(function() {
		$class("sop.openApi.statsMe.statsMeMap.loadMapData").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				//console.time("calculatingTime");
				$statsMeMain.ui.loading(false);
				if(res.errCd == "0") {
					//지도 Legend 초기화
					$statsMeMap.ui.map.legend.legendInit();
					//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 START
					$statsMeMap.ui.map.legend.isNegative = false;
					$statsMeMap.ui.map.legend.isNegativeColorShow = true;
					//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 END
					
					//데이터 전역변수 입력
					$statsMeMap.ui.mapData = res.result;
					$statsMeDetailInfo.ui.mapData = res.result;
					
					//대화형 통계지도 > e-지방지표
					var lv_data = $statsMeMap.ui.mapData.data;
					if(lv_data != undefined && lv_data != null && lv_data.menu_nm == "대화형 통계지도" && lv_data.srv_nm == "e-지방지표") {
						var lv_stat_data_id = lv_data.stat_data_id;
						if($statsMeMap.ui.ecountryMapping[lv_stat_data_id] != undefined && $statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value_yn != "Y") {
							//URL 변수 선언
							var lv_url = contextPath + "/view/ecountry/getItem.json";
							
							//URL 파라미터 세팅
							lv_url += "?tbl_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].tbl_id;
							
							// ajax 시작
							$.ajax({
							    url: lv_url,
							    type: 'get',
							    async: false
							}).done(function (res) { // 완료
								var periodlist = res.result.periodlist;
								if(periodlist != undefined && periodlist != null && periodlist.length > 0) {
									for(var i = 0; i < periodlist.length; i++) {
										var prd_id = periodlist[i].prd_id;
										var prid_list = res.result.periodvalue[prd_id];
										if(prid_list != undefined && prid_list != null && prid_list.length > 0) {
											//2020-02-11 [김남민] e-지방지표 prid_value 정렬과 상관없이 최신데이터로 사용하게 수정. START
											//prid_value 내림차순 정렬
											prid_list.sort(function(a, b) { // 내림차순
												return Number(a["prid_value"]) > Number(b["prid_value"]) ? -1 : Number(a["prid_value"]) < Number(b["prid_value"]) ? 1 : 0;
											});
											var prid_value = prid_list[0].prid_value;
											//2020-02-11 [김남민] e-지방지표 prid_value 정렬과 상관없이 최신데이터로 사용하게 수정. END
											$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prd_id = prd_id;
											$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value = prid_value;
											$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value_yn = "Y";
										}
									}
								}
							});
							// ajax 끝
						}
					}
					
					//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 START
					//정책통계지도 (negative 지도)
					if(lv_data.menu_nm == "정책통계지도") {
						$statsMeMap.ui.map.legend.legendType = "negative";
					}
					else {
						$statsMeMap.ui.map.legend.legendType = "auto";
					}
					//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 END
					
					//데이터 세팅
					if(lv_data != undefined && lv_data != null) {
						$statsMeMap.ui.setMapData();
						$statsMeDetailInfo.ui.setMapData();
					}
					
					//메세지 있는 경우 띄움
					if(res.result.errCd != "0") {
						$statsMeMain.ui.alert(res.result.errMsg);
					}
				}else if(res.errCd == "-401") {
					$statsMeMain.ui.alert(res.errMsg);
				}else{
					$statsMeMain.ui.alert(res.errMsg);
				}
				//console.timeEnd('calculatingTime');
			},
			onFail: function(status) {
				$statsMeMain.ui.alert(errorMessage);
			}
		});
	}());
	/*********** 지도 데이터 조회 종료 **********/
	/*********** 센터의 집계구값 얻기 시작 **********/
	(function() {
		$class("sop.openApi.personal.findcodeinsmallarea.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(res.errCd == "0") {
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.getCenterToAdmCd(options.center,options.callback);
					});
				}
			},
			onFail: function(status) {
				$statsMeMain.ui.loading(false);
				$statsMeMain.ui.alert(errorMessage);
			}
		});
	}());
	/*********** 센터의 집계구값 얻기 종료 **********/
}(window, document));