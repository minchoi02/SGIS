var bndYear = "2019";

(function(W, D) {

	W.$myNeighberhoodJobMap = W.$myNeighberhoodJobMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		//페이지 기본 이벤트 등록
		$myNeighberhoodJobMap.event.setUIEvent();
		
		//사용자 정보 조회
		$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectMemberInfo();
		
		//마감임박 건수 조회
		if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "") {
			$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectClosCount();
		}
		
		//일자리 찾기 팝업 초기화 (조건에 따라 동기/비동기 불러오기)
		if(
			$myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "1"
			|| $myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "2"
			|| $myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "3"
		) {
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
			//$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInit();
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
		}
		else {
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
			//$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInit();
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
		}
		
		//지도 세팅
		$myNeighberhoodJobMap.event.setMapSize();
		$myNeighberhoodJobMap.ui.createMap("map");
	});

	// 페이지 UI 변수 및 함수 선언
	$myNeighberhoodJobMap.ui = {
		map : null,
		markerList : null,
		
		//사용자 정보
		member_info : null,
		
		//내 현재위치
		my_location_yn : "N", // 지도 조회후 내 위치로 오게하기
		my_x : null, // x
		my_y : null, // y
		my_sido_cd : null, // 시도코드
		my_sido_nm : null, // 시도명
		my_sgg_cd : null, // 시군구코드
		my_sgg_nm : null, // 시군구명
		my_emdong_cd : null, // 읍면동코드
		my_emdong_nm : null, // 읍면동명
		
		//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
		//일자리 찾기
		myNeighberhoodJobSearchPopupInitYn : "N",
		//공통코드
		myNeighberhoodJobSearchPopupInitCmmCdComcd : null,
		//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
		
		//일자리 찾기 목록
		myNeighberhoodJobGubun : "button", // 조회 구분 (button : 검색 버튼, onload : 페이지 처음 불러올때)
		myNeighberhoodJobListGubun : gv_list_gubun, // 조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
		myNeighberhoodJobList : null, // 목록 리스트
		myNeighberhoodJobListCount : 0, // 목록 리스트 건수
		myNeighberhoodJobListSwiper : null, // 목록 swiper
		myNeighberhoodJobListSubYn : "N", // 하단 펼치기/접기 여부
		myNeighberhoodJobListMapMoveYn : "Y", // 목록 선택 후 지도 이동 여부 (1회성)
		myNeighberhoodJobListPagingFlag : false, //페이징 중복 실행 방지
		
		//일자리 찾기 목록(전체보기)
		myNeighberhoodJobList2 : null, // 전체보기 객체
		myNeighberhoodJobList2SubYn : "N", // 하단 펼치기/접기 여부
		myNeighberhoodJobList2PagingIndex : -1, //페이징 시작 인덱스
		myNeighberhoodJobList2PagingFlag : false, //페이징 중복 실행 방지
		
		//일자리목록 채용공고 상세보기
		myNeighberhoodJobSelectPopupChart : null, // 차트 swiper 리스트
		
		//맞춤형서비스 등록 팝업
		myNeighberhoodJobClmserRegistPopupPageIndex : 0, // 페이지 index
		
		//생활환경 텍스트 정의
		myNeighberhoodJobLifeEnvironmentText : {
			HMM0001 : {name : "대기오염도", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0002 : {name : "생활날씨", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0003 : {name : "녹지비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0004 : {name : "공동주택비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0005 : {name : "주거면적", good : "넓음", bad : "좁음", normal : "보통"}
			,HMM0006 : {name : "노후주택비율", good : "낮음", bad : "높음", normal : "보통"}
			,HMM0007 : {name : "자가점유비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0008 : {name : "면적당 아파트 가격", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0035 : {name : "공시지가", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0111 : {name : "단독주택비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0009 : {name : "청장년인구비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0010 : {name : "혈연가구 비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0011 : {name : "사업체 종사자 비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0012 : {name : "순유입인구 비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0013 : {name : "화재 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0014 : {name : "교통사고 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0028 : {name : "범죄 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0029 : {name : "안전사고", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0031 : {name : "감염병 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0032 : {name : "자연재해 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0015 : {name : "편의시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0016 : {name : "쇼핑시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0017 : {name : "외식시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0018 : {name : "대중교통 이용률", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0033 : {name : "잡화점 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0020 : {name : "교원 1인당 학생 수", good : "적음", bad : "많음", normal : "보통"}
			,HMM0021 : {name : "고등교육기관 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0022 : {name : "학원 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0023 : {name : "유치원 및 보육시설", good : "많음", bad : "적음", normal : "보통"}
			,HMM0024 : {name : "병의원 및 약국", good : "많음", bad : "적음", normal : "보통"}
			,HMM0025 : {name : "노인복지시설", good : "많음", bad : "적음", normal : "보통"}
			,HMM0026 : {name : "사회복지시설", good : "많음", bad : "적음", normal : "보통"}
			,HMM0027 : {name : "문화시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0034 : {name : "체육시설 수", good : "많음", bad : "적음", normal : "보통"}
		},
		
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param
		 * 		id : map으로 쓸 div id
		 */
		createMap : function(id) {
			this.map = new sMap.map();
			this.map.isCurrentLocationMarker = true;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 989674, 1818313 ];
			this.map.zoom = 1;
			this.map.createMap($myNeighberhoodJobMap, id, {
				isLegendControl:false // 하단 범례 제거
				,isCurrentLocationMarker:false // 지도에 현재위치 표시 안함
			});
			this.map.gMap.whenReady(function() {
				//위치동의 팝업 호출
				common_localtion(
					//지도변수
					$myNeighberhoodJobMap.ui.map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$myNeighberhoodJobMap.ui.my_x = my_x;
						$myNeighberhoodJobMap.ui.my_y = my_y;
						$myNeighberhoodJobMap.ui.my_sido_cd = my_sido_cd;
						$myNeighberhoodJobMap.ui.my_sido_nm = my_sido_nm;
						$myNeighberhoodJobMap.ui.my_sgg_cd = my_sgg_cd;
						$myNeighberhoodJobMap.ui.my_sgg_nm = my_sgg_nm;
						$myNeighberhoodJobMap.ui.my_emdong_cd = my_emdong_cd;
						$myNeighberhoodJobMap.ui.my_emdong_nm = my_emdong_nm;
						
						//내 위치 텍스트
						$("#myNeighberhoodJobMyLocation_name").text($myNeighberhoodJobMap.ui.my_sido_nm+" "+$myNeighberhoodJobMap.ui.my_sgg_nm);
						
						//조회구분 있는 경우 리스트 조회 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
						if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun != "") {
							//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
							if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "1") {
								//특정 지역 받은 경우
								if(gv_sido_cd != "") {
									//특정 지역으로 시도 변경
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(gv_sido_cd);
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), gv_sgg_cd);
								}
								else {
									//내 위치로 시도 변경
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), $myNeighberhoodJobMap.ui.my_sgg_cd);
								}
								// 조회
								$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("onload");
							}
							//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
							else if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "2" || $myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "3") {
								//내 맞춤위치로 시도 변경
								var lv_clmser_sido_cd = "";
								var lv_clmser_sgg_cd = "";
								if(sop.isLogin) { //로그인 체크
									// ajax 시작
									$.ajax({
									    url: contextPath + "/m2019/workroad/selectSrvDtJobClmserInfo.json",
									    type: 'post',
									    dataType : 'json',
									    async: false,
									    data: {
									    	member_id: sop.member_id //로그인 ID
									    }
									}).done(function (res) { // 완료
										if(res.errCd == "0") {
											var lvResultList = res.result.resultList;
											var lvResultCount = res.result.resultCount;
											if(lvResultCount > 0) {
												lv_clmser_sido_cd = lvResultList[0].sido_cd;
												lv_clmser_sgg_cd = lvResultList[0].sgg_cd;
											}
										}else if(res.errCd == "-401") {
											//common_alert(res.errMsg);
										}else{
											//common_alert(res.errMsg);
										}
									}).fail(function (res) { // 실패
										//common_alert(errorMessage);
									}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
										//common_loading(false);
									});
									// ajax 끝
								}
								
								//조회
								$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(lv_clmser_sido_cd);
								$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), lv_clmser_sgg_cd);
								$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("onload");
							}
							//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
							else if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "A") {
								if(sop.isLogin) { //로그인 체크
									$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupInit();
									$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupToggle(true);
								}
								else {
									common_login();
								}
							}
						}
						else {
							//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START
							//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 START
							//오늘의 전체 일자리현황 팝업
							if(gv_todaystatus_pop_yn == "Y" && common_get_cookie("myNeighberhoodJobTodayStatusPopup_no_today_yn") != "Y") {
								$myNeighberhoodJobMap.ui.myNeighberhoodJobTodayStatusPopupSelect();
							}
							//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 END
							//오늘의 전체 일자리현황 팝업없이 바로 진행
							else {
								//시도코드 시군구코드 확인
								if($myNeighberhoodJobMap.ui.my_sido_cd != null && $myNeighberhoodJobMap.ui.my_sido_cd != "" && $myNeighberhoodJobMap.ui.my_sgg_cd != null && $myNeighberhoodJobMap.ui.my_sgg_cd != "") {
									//시도코드 세팅
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
									//시군구코드 세팅
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($myNeighberhoodJobMap.ui.my_sido_cd, $myNeighberhoodJobMap.ui.my_sgg_cd);
									//내 주변 일자리 조회
									$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("button");
								}
							}
							//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정.END
						}
					},
					//위치 미동의함
					function() {
						//조회구분 있는 경우 리스트 조회 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
						if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun != "") {
							//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
							if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "1") {
								//특정 지역 받은 경우
								if(gv_sido_cd != "") {
									//특정 지역으로 시도 변경
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(gv_sido_cd);
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), gv_sgg_cd);
								}
								else {
									//내 위치로 시도 변경
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), $myNeighberhoodJobMap.ui.my_sgg_cd);
								}
								
								//조회
								$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("onload");
							}
							//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
							else if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "2" || $myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "3") {
								//내 맞춤위치로 시도 변경
								var lv_clmser_sido_cd = "";
								var lv_clmser_sgg_cd = "";
								if(sop.isLogin) { //로그인 체크
									// ajax 시작
									$.ajax({
									    url: contextPath + "/m2019/workroad/selectSrvDtJobClmserInfo.json",
									    type: 'post',
									    dataType : 'json',
									    async: false,
									    data: {
									    	member_id: sop.member_id //로그인 ID
									    }
									}).done(function (res) { // 완료
										if(res.errCd == "0") {
											var lvResultList = res.result.resultList;
											var lvResultCount = res.result.resultCount;
											if(lvResultCount > 0) {
												lv_clmser_sido_cd = lvResultList[0].sido_cd;
												lv_clmser_sgg_cd = lvResultList[0].sgg_cd;
											}
										}else if(res.errCd == "-401") {
											//common_alert(res.errMsg);
										}else{
											//common_alert(res.errMsg);
										}
									}).fail(function (res) { // 실패
										//common_alert(errorMessage);
									}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
										//common_loading(false);
									});
									// ajax 끝
								}
								
								//조회
								$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(lv_clmser_sido_cd);
								$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), lv_clmser_sgg_cd);
								$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("onload");
							}
							//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
							else if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "A") {
								if(sop.isLogin) { //로그인 체크
									$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupInit();
									$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupToggle(true);
								}
								else {
									common_login();
								}
							}
						}
						else {
							//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. START
							//오늘의 전체 일자리현황 팝업
							if(gv_todaystatus_pop_yn == "Y") {
								$myNeighberhoodJobMap.ui.myNeighberhoodJobTodayStatusPopupSelect();
							}
							//오늘의 전체 일자리현황 팝업없이 바로 진행
							else {
								//시도코드 시군구코드 확인
								if($myNeighberhoodJobMap.ui.my_sido_cd != null && $myNeighberhoodJobMap.ui.my_sido_cd != "" && $myNeighberhoodJobMap.ui.my_sgg_cd != null && $myNeighberhoodJobMap.ui.my_sgg_cd != "") {
									//시도코드 세팅
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
									//시군구코드 세팅
									$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($myNeighberhoodJobMap.ui.my_sido_cd, $myNeighberhoodJobMap.ui.my_sgg_cd);
									//내 주변 일자리 조회
									$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("button");
								}
							}
							//2019-09-17 [김남민] (12) 오늘의 전체 일지리현황 팝업 수정. END
						}
					}
				);
			});
		},
		
		/**
		 * @name : myNeighberhoodJobSelectMemberInfo
		 * @description : 사용자 정보 조회
		 * @date : 2019.07.22
		 * @author : 김남민
		 * @history :
		 * @param
		 * 		 
		 */
		myNeighberhoodJobSelectMemberInfo : function() {
			//사용자 정보 불러오기
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/login/selectSrvDtMemberinfo.json",
				    type: 'post',
				    dataType: 'json',
				    async: false,
				    data: {
				    	member_id: sop.member_id //로그인 ID
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvParams = res.result.params;
						var lvResultCount = res.result.resultCount;
						var lvResultData = res.result.resultData;
						
						//데이터 있음
						if(lvResultCount > 0) {
							$myNeighberhoodJobMap.ui.member_info = lvResultData;
						}
					}else if(res.errCd == "-401") {
						//common_alert(res.errMsg);
					}else{
						//common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false); // 로딩바 감춤
				});
				// ajax 끝
			}
		},
		
		/**
		 * @name : myNeighberhoodJobSelectClosCount
		 * @description : 마감임박 건수 조회
		 * @date : 2019.07.22
		 * @author : 김남민
		 * @history :
		 * @param
		 * 		 
		 */
		myNeighberhoodJobSelectClosCount : function() {
			//마감건수 체크한뒤 로그인 버튼에 빨간색 표시하기
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/myNeighberhoodJobListCount.json",
				    type: 'post',
				    dataType: 'json',
				    data: {
				    	list_gubun : "3",
				    	member_id: sop.member_id //로그인 ID
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvParams = res.result.params;
						var lvResultCount = res.result.resultCount;
						
						//마감공고 있음
						if(lvResultCount > 0) {
							//메세지 표시
							$("#login-clos-main-name").text($myNeighberhoodJobMap.ui.member_info.member_nm);
							$("#login-clos-main-count").text(lvResultCount);
							$("#login-clos-main").show();
							
							//빨간점 표시
							//단순 표시만
							//$("#login-open-button").addClass("btn_goLogin_on");
							
							//계속 깜박이게
							setInterval(function() {
								if($("#login-open-button").hasClass("btn_goLogin_on")) $("#login-open-button").removeClass("btn_goLogin_on");
								else $("#login-open-button").addClass("btn_goLogin_on");						
							}, 1000);
						}
					}else if(res.errCd == "-401") {
						//common_alert(res.errMsg);
					}else{
						//common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false); // 로딩바 감춤
				});
				// ajax 끝
			}
		},
		
		/**
		 * @name : myNeighberhoodJobTodayStatusPopupSelect
		 * @description : 오늘의 전체 일자리현황 팝업 조회
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param
		 * 		 
		 */
		myNeighberhoodJobTodayStatusPopupSelect : function(p_sido_cd, p_sido_nm, p_sgg_cd, p_sgg_nm) {
			common_loading(true); // 로딩바 표시
			// ajax 시작
			$.ajax({
			    url: contextPath + "/m2019/workroad/todayAllJobStatusPopupSelect.json",
			    type: 'post',
			    dataType: 'json',
			    data: {
			    	data: "data",
			    	sido_cd : p_sido_cd,
			    	sido_nm : p_sido_nm,
			    	sgg_cd : p_sgg_cd,
			    	sgg_nm : p_sgg_nm
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvParams = res.result.params;
					var lvResultList = res.result.resultList;
					if(lvResultList != null && lvResultList.length > 0) {
						//조회결과
						var lv_reg_dt = lvResultList[0].reg_dt;
						var lv_all_corp_cnt = lvResultList[0].all_corp_cnt;
						var lv_all_rcrit_psn_cnt = lvResultList[0].all_rcrit_psn_cnt;
						var lv_new_corp_cnt = lvResultList[0].new_corp_cnt;
						var lv_new_rcrit_psn_cnt = lvResultList[0].new_rcrit_psn_cnt;
						var lv_clos_corp_cnt = lvResultList[0].clos_corp_cnt;
						var lv_clos_rcrit_psn_cnt = lvResultList[0].clos_rcrit_psn_cnt;
						var lv_all_corp_cnt_c = lvResultList[0].all_corp_cnt_c;
						var lv_all_rcrit_psn_cnt_c = lvResultList[0].all_rcrit_psn_cnt_c;
						var lv_new_corp_cnt_c = lvResultList[0].new_corp_cnt_c;
						var lv_new_rcrit_psn_cnt_c = lvResultList[0].new_rcrit_psn_cnt_c;
						var lv_clos_corp_cnt_c = lvResultList[0].clos_corp_cnt_c;
						var lv_clos_rcrit_psn_cnt_c = lvResultList[0].clos_rcrit_psn_cnt_c;
						
						//지역명
						if(lvParams.sido_nm != null && lvParams.sido_nm != "" && lvParams.sido_nm != "null") {
							if(lvParams.sgg_nm != null && lvParams.sgg_nm != "" && lvParams.sgg_nm != "null") {
								$("#myNeighberhoodJobTodayStatusPopup_adm_nm").html(lvParams.sido_nm+" "+lvParams.sgg_nm);
							}
							else {
								$("#myNeighberhoodJobTodayStatusPopup_adm_nm").html(lvParams.sido_nm);
							}
						}
						else {
							$("#myNeighberhoodJobTodayStatusPopup_adm_nm").html("전체");
						}
						
						//기준일자
						if(lv_reg_dt != null && lv_reg_dt != "" && lv_reg_dt.length == 8) {
							$("#myNeighberhoodJobTodayStatusPopup_reg_dt").html("("+lv_reg_dt.substr(4,2)+"월 "+lv_reg_dt.substr(6,2)+"일 기준)");
						}
						
						//구인업체 & 구인자수
						$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt']").html(appendCommaToNumber(lv_all_corp_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt']").html(appendCommaToNumber(lv_all_rcrit_psn_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='new_corp_cnt']").html(appendCommaToNumber(lv_new_corp_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='new_rcrit_psn_cnt']").html(appendCommaToNumber(lv_new_rcrit_psn_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='clos_corp_cnt']").html(appendCommaToNumber(lv_clos_corp_cnt));
						$("#myNeighberhoodJobTodayStatusPopup [name='clos_rcrit_psn_cnt']").html(appendCommaToNumber(lv_clos_rcrit_psn_cnt));
						
						//전일대비 (구인업체)
						if (lv_all_corp_cnt_c > 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").html("▲ "+(Number((100 * lv_all_corp_cnt_c / (lv_all_corp_cnt - lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").addClass("td_up");
						} else if (lv_all_corp_cnt_c < 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").html("▼ "+(Number(((-100 * lv_all_corp_cnt_c) / (lv_all_corp_cnt + lv_all_corp_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_corp_cnt_c_rate']").addClass("td_down");
						}
						
						//전일대비 (구인자수)
						if (lv_all_rcrit_psn_cnt_c > 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").html("▲ "+(Number((100 * lv_all_rcrit_psn_cnt_c / (lv_all_rcrit_psn_cnt - lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").addClass("td_up");
						} else if (lv_all_rcrit_psn_cnt_c < 0) {
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").html("▼ "+(Number(((-100 * lv_all_rcrit_psn_cnt_c) / (lv_all_rcrit_psn_cnt + lv_all_rcrit_psn_cnt_c)).toFixed(2)))+"%");
							$("#myNeighberhoodJobTodayStatusPopup [name='all_rcrit_psn_cnt_c_rate']").addClass("td_down");
						}
						
						//팝업 호출
						$myNeighberhoodJobMap.ui.myNeighberhoodJobTodayStatusPopupToggle(true);
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				common_loading(false); // 로딩바 감춤
			});
			// ajax 끝
		},
		
		/**
		 * @name : myNeighberhoodJobTodayStatusPopupToggle
		 * @description : 오늘의 전체 일자리현황 팝업 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobTodayStatusPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				//화면 띄움
				$("#common_popup_back").parent().show();
				$("#myNeighberhoodJobTodayStatusPopup").appendTo($("body"));
				$("#myNeighberhoodJobTodayStatusPopup").show();
				
				//이전 이벤트 제거
				$("#common_popup_back").unbind();
				
				//새로운 이벤트 맵핑
				$("#common_popup_back").click(function() {
					$("#myNeighberhoodJobTodayStatusPopup_close").click();
				});
			}
			//감춤
			else {
				//화면 띄움
				$("#common_popup_back").parent().hide();
				$("#myNeighberhoodJobTodayStatusPopup").hide();
			}
		},
		
		/**
		 * @name : myNeighberhoodJobListSelect
		 * @description : 일자리 목록 조회
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_gubun : 조회 구분 (button : 검색 버튼, onload : 페이지 처음 불러올때)
		 */
		myNeighberhoodJobListSelect : function(p_gubun) {
			$myNeighberhoodJobMap.ui.myNeighberhoodJobGubun = p_gubun;
			var obj = new sop.openApi.workroad.myNeighberhoodJobMap.myNeighberhoodJobList();
			obj.addParam("gubun", p_gubun);
			
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
			/* 일자리맞춤형서비스정보 조회 */
			//변수선언
			var lv_clmser_lc_info_agree_yn = "N";
			var lv_clmser_sido_cd = "";
			var lv_clmser_sgg_cd = "";
			var lv_clmser_entrprs_class_content = "";
			var lv_clmser_jssfc_class_content = "";
			var lv_clmser_salary_class_content = "";
			var lv_clmser_emplym_class_content = "";
			var lv_clmser_acdmcr_class_content = "";
			var lv_clmser_career_class_content = "";
			var lv_clmser_indust_class_content = "";
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/selectSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    async: false, //무조건 동기
				    data: {
				    	member_id: sop.member_id //로그인 ID
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvResultList = res.result.resultList;
						var lvResultCount = res.result.resultCount;
						if(lvResultCount > 0) {
							$("#myNeighberhoodJobClmserGuidance").hide(); //맞춤형서비스 안내 숨김
							lv_clmser_lc_info_agree_yn = lvResultList[0].lc_info_agree_yn;
							lv_clmser_sido_cd = lvResultList[0].sido_cd;
							lv_clmser_sgg_cd = lvResultList[0].sgg_cd;
							lv_clmser_entrprs_class_content = lvResultList[0].entrprs_class_content;
							lv_clmser_jssfc_class_content = lvResultList[0].jssfc_class_content;
							lv_clmser_salary_class_content = lvResultList[0].salary_class_content;
							lv_clmser_emplym_class_content = lvResultList[0].emplym_class_content;
							lv_clmser_acdmcr_class_content = lvResultList[0].acdmcr_class_content;
							lv_clmser_career_class_content = lvResultList[0].career_class_content;
							lv_clmser_indust_class_content = lvResultList[0].indust_class_content;
						}
					}else if(res.errCd == "-401") {
						//common_alert(res.errMsg);
					}else{
						//common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false);
				});
				// ajax 끝
			}
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			
			//공통 기본 세팅
			if(p_gubun == "button" || p_gubun == "onload") {
				//시도 필수
				var lv_sido_cd = $("#myNeighberhoodJobSearchPopup_sido").val();
				var lv_sido_nm = $("#myNeighberhoodJobSearchPopup_sido option:selected").text();
				if(lv_sido_cd == "" || lv_sido_cd == "99" || lv_sido_cd == "00") {
					common_alert("희망지역 시도를 선택해주세요.", function() {
						$("#myNeighberhoodJobSearchPopup_sido").focus();
					});
					return false;
				}
				//시군구 필수 (button 조회만)
				// 11 : 서울
				// 31 : 경기도
				var lv_sgg_cd = $("#myNeighberhoodJobSearchPopup_sgg").val();
				var lv_sgg_nm = $("#myNeighberhoodJobSearchPopup_sgg option:selected").text();
				if(p_gubun == "button" && (lv_sido_cd == "11" || lv_sido_cd == "31") && (lv_sgg_cd == "" || lv_sgg_cd == "999" || lv_sgg_cd == "00")) {
					common_alert("서울 및 경기도는<br/>전체선택이 불가합니다.<br/>희망 시군구를<br/>선택해주시기 바랍니다.", function() {
						$("#myNeighberhoodJobSearchPopup_sgg").focus();
					});
					return false;
				}
				
				//시도명 반영
				$("#myNeighberhoodJobMyLocation_name").text(lv_sido_nm+" "+lv_sgg_nm);
				
				//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
				obj.addParam("list_gubun", "1");
				
				//조회정렬
				//REG_DT 등록순,   REG_DT_DESC 등록역순
				//CLOS_DT 마감순,  CLOS_DT_DESC 마감역순
				//SALARY 급여순,   SALARY_DESC 급여역순
				//DISTANCE 거리순, DISTANCE_DESC 거리역순
				obj.addParam("list_sort", $("#myNeighberhoodJobListSort").val());
				
				//내 위치 지역
				obj.addParam("my_sido_cd", $myNeighberhoodJobMap.ui.my_sido_cd);
				obj.addParam("my_sgg_cd", $myNeighberhoodJobMap.ui.my_sgg_cd);
				
				//내 위치 좌표
				obj.addParam("my_x", $myNeighberhoodJobMap.ui.my_x);
				obj.addParam("my_y", $myNeighberhoodJobMap.ui.my_y);
				
				//내 맞춤형서비스 지역
				obj.addParam("clmser_sido_cd", "25");
				obj.addParam("clmser_sgg_cd", "030");
				
				//지역선택
				obj.addParam("sido_cd", $("#myNeighberhoodJobSearchPopup_sido").val());
				obj.addParam("sgg_cd", $("#myNeighberhoodJobSearchPopup_sgg").val());
				
				//기업형태
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($("#myNeighberhoodJobSearchPopup_company_type").html() == "") {
					if(lv_clmser_entrprs_class_content != undefined && lv_clmser_entrprs_class_content != null && lv_clmser_entrprs_class_content != "") {
						obj.addParam("company_type", lv_clmser_entrprs_class_content);
					}
				}
				else {
					var lv_company_type = $('#myNeighberhoodJobSearchPopup_company_type').multiselect("getSelected").val();
					if(lv_company_type != null) obj.addParam("company_type", lv_company_type.join());
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				
				//직종분류
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($("#myNeighberhoodJobSearchPopup_classification").html() == "") {
					if(lv_clmser_jssfc_class_content != undefined && lv_clmser_jssfc_class_content != null && lv_clmser_jssfc_class_content != "") {
						obj.addParam("classification", lv_clmser_jssfc_class_content);
					}
				}
				else {
					var lv_classification = $('#myNeighberhoodJobSearchPopup_classification').multiselect("getSelected").val();
					if(lv_classification != null) obj.addParam("classification", lv_classification.join());
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				
				//급여수준
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($("#myNeighberhoodJobSearchPopup_salaly").html() == "") {
					if(lv_clmser_salary_class_content != undefined && lv_clmser_salary_class_content != null && lv_clmser_salary_class_content != "") {
						obj.addParam("salaly", lv_clmser_salary_class_content);
					}
				}
				else {
					var lv_salaly = $('#myNeighberhoodJobSearchPopup_salaly').multiselect("getSelected").val();
					if(lv_salaly != null) obj.addParam("salaly", lv_salaly.join());
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				
				//고용형태
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($("#myNeighberhoodJobSearchPopup_employment_type").html() == "") {
					if(lv_clmser_emplym_class_content != undefined && lv_clmser_emplym_class_content != null && lv_clmser_emplym_class_content != "") {
						obj.addParam("employment_type", lv_clmser_emplym_class_content);
					}
				}
				else {
					var lv_employment_type = $('#myNeighberhoodJobSearchPopup_employment_type').multiselect("getSelected").val();
					if(lv_employment_type != null) obj.addParam("employment_type", lv_employment_type.join());
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				
				//학력
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($("#myNeighberhoodJobSearchPopup_academic_ability").html() == "") {
					if(lv_clmser_acdmcr_class_content != undefined && lv_clmser_acdmcr_class_content != null && lv_clmser_acdmcr_class_content != "") {
						obj.addParam("academic_ability", lv_clmser_acdmcr_class_content);
					}
				}
				else {
					var lv_academic_ability = $('#myNeighberhoodJobSearchPopup_academic_ability').multiselect("getSelected").val();
					if(lv_academic_ability != null) obj.addParam("academic_ability", lv_academic_ability.join());
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				
				//경력
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($("#myNeighberhoodJobSearchPopup_career").html() == "") {
					if(lv_clmser_career_class_content != undefined && lv_clmser_career_class_content != null && lv_clmser_career_class_content != "") {
						obj.addParam("career", lv_clmser_career_class_content);
					}
				}
				else {
					var lvCareer = "";
					$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisValue = lvThis.attr("data-value");
						if(lvThis.hasClass("on")) {
							if(lvCareer == "") lvCareer += lvThisValue;
							else lvCareer += ","+lvThisValue;
						}
					});
					if(lvCareer != "") obj.addParam("career", lvCareer);
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				
				//산업분류
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($("#myNeighberhoodJobSearchPopup_industry_classification").html() == "") {
					if(lv_clmser_indust_class_content != undefined && lv_clmser_indust_class_content != null && lv_clmser_indust_class_content != "") {
						obj.addParam("industry_classification", lv_clmser_indust_class_content);
					}
				}
				else {
					var lv_industry_classification = $('#myNeighberhoodJobSearchPopup_industry_classification').multiselect("getSelected").val();
					if(lv_industry_classification != null) obj.addParam("industry_classification", lv_industry_classification.join());
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			
			//onload 추가 처리
			if(p_gubun == "onload") {
				//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
				obj.addParam("list_gubun", $myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun);
				
				//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "1") {
					
				}
				//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
				else if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "2") {
					
				}
				//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
				else if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "3") {
					
				}
			}
			//로딩바 호출
			common_loading(true);
			obj.request({
				method: "POST",
				//async: false,
				url: contextPath + "/m2019/workroad/myNeighberhoodJobList.json"
			});
			
			return true;
		},
		
		
		/**
		 * @name : myNeighberhoodJobListGetHtml
		 * @description : 일자리 목록 HTML
		 * @date : 2019.07.11
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_index : 리스트 인덱스
		 * 		p_data : HTML로 만들 데이터
		 * 		p_type : HTML 타입 (1: 하단 리스트, 2: 목록 리스트)
		 */
		myNeighberhoodJobListGetHtml : function(p_index, p_data, p_type) {
			var lv_com_logo_class = "",
				lv_com_logo_text = "",
				lv_reg_dt_text = "",
				lv_reg_dt_d_day = 0,
				lv_clos_dt_text = "",
				lv_clos_dt_d_day = 0,
				lv_cap_text = "",
				lv_year_sales_text = "";
			
			//워크넷
			if(p_data.jo_data_div == "W") {
				lv_com_logo_class = "worknet";
				lv_com_logo_text = "워크넷";
			}
			//인쿠르트
			else if(p_data.jo_data_div == "I") {
				lv_com_logo_class = "in";
				lv_com_logo_text = "인쿠르트";
			}
			/** 2020-05-06 [곽제욱] 사람인 case 추가 START */
			//사람인
			else if(p_data.jo_data_div == "S") {
				lv_com_logo_class = "saramin";
				lv_com_logo_text = "사람인";
			}
			/** 2020-05-06 [곽제욱] 사람인 case 추가 END */
			//등록일
			if(p_data.reg_dt != null && p_data.reg_dt != "" && p_data.reg_dt.length == 8) {
				lv_reg_dt_text = p_data.reg_dt.substr(2,2)+"."+p_data.reg_dt.substr(4,2)+"."+p_data.reg_dt.substr(6,2);
				var lv_temp_reg_dt_date_time = new Date(p_data.reg_dt.substr(0,4)+"-"+p_data.reg_dt.substr(4,2)+"-"+p_data.reg_dt.substr(6,2)).getTime();
				var lv_temp_now_date_time = new Date().getTime();
				lv_reg_dt_d_day = Math.floor((lv_temp_now_date_time - lv_temp_reg_dt_date_time) / (1000 * 60 * 60 * 24));
			}
			else {
				lv_reg_dt_text = p_data.reg_dt;
			}
			//마감일 및 D-Day
			if(p_data.clos_dt != null && p_data.clos_dt != "" && p_data.clos_dt.length == 8) {
				lv_clos_dt_text = p_data.clos_dt.substr(2,2)+"."+p_data.clos_dt.substr(4,2)+"."+p_data.clos_dt.substr(6,2);
				var lv_temp_clos_dt_date_time = new Date(p_data.clos_dt.substr(0,4)+"-"+p_data.clos_dt.substr(4,2)+"-"+p_data.clos_dt.substr(6,2)).getTime();
				var lv_temp_now_date_time = new Date().getTime();
				lv_clos_dt_d_day = Math.floor((lv_temp_clos_dt_date_time - lv_temp_now_date_time) / (1000 * 60 * 60 * 24));
			}
			else {
				lv_clos_dt_text = p_data.clos_dt;
			}
			//자본금
			if(p_data.cap != null && p_data.cap != "" && (p_data.cap+"").lastIndexOf("00000000") >= 0) {
				lv_cap_text = appendCommaToNumber((p_data.cap+"").substr(0,(p_data.cap+"").lastIndexOf("00000000")))+"억";
			}
			else if(p_data.cap != null && p_data.cap != "" && (p_data.cap+"").lastIndexOf("0000") >= 0) {
				lv_cap_text = appendCommaToNumber((p_data.cap+"").substr(0,(p_data.cap+"").lastIndexOf("0000")))+"만";
			}
			else {
				lv_cap_text = appendCommaToNumber(p_data.cap);
			}
			//연매출액
			if(p_data.year_sales != null && p_data.year_sales != "" && (p_data.year_sales+"").lastIndexOf("00000000") >= 0) {
				lv_year_sales_text = appendCommaToNumber((p_data.year_sales+"").substr(0,(p_data.year_sales+"").lastIndexOf("00000000")))+"억";
			}
			else if(p_data.year_sales != null && p_data.year_sales != "" && (p_data.year_sales+"").lastIndexOf("0000") >= 0) {
				lv_year_sales_text = appendCommaToNumber((p_data.year_sales+"").substr(0,(p_data.year_sales+"").lastIndexOf("0000")))+"만";
			}
			else {
				lv_year_sales_text = appendCommaToNumber(p_data.year_sales);
			}
			
			/** 2020.07.20[한광희] 내 주변 채용공고 전체 보기 특수문자 변환 START */
			var escaped = p_data.recru_nm;
			var findReplace = [["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"]];
			for(var item in findReplace)
				escaped = escaped.replace(findReplace[item][1], findReplace[item][0]);
			/** 2020.07.20[한광희] 내 주변 채용공고 전체 보기 특수문자 변환 END */
			
			return $("<li/>", {
				"class" : (p_type == "1") ? "swiper-slide off" : "off",
				name : "myNeighberhoodJobListData_"+p_index,
				style : (p_type == "1") ? "width: 280px;" : "",
				data_index : p_index,
				jo_no : p_data.jo_no,
				pt_x : p_data.pt_x,
				pt_y : p_data.pt_y
			}).append(
				$("<div/>", {
					"class" : "rvbWrap"
				}).append(
					$("<div/>", {
						"class" : "nameBox"
					}).append(
						$("<div/>", {
							"class" : "nameCompany"
						}).append(
							$("<p/>", {
								"class" : "comLogo "+lv_com_logo_class,
								text : lv_com_logo_text
							})
						).append(p_data.corp_nm)
					).append(
						$("<div/>", {
							"class" : "timeLimit",
							text : lv_reg_dt_text+" - "+lv_clos_dt_text + " "	// 2019.11.27[한광희] 기간과 D-Day 사이 간격 추가
						}).append(
							$("<span/>", {
								"class" : (lv_clos_dt_d_day <= 7) ? "red" : "",
								text : "[D-"+lv_clos_dt_d_day+"]"
							})
						)
					)
				).append(
					$("<div/>", {
						"class" : "detailRecu",
						style : (p_type == "2") ? "height: auto;" : "",
						/** 2020.07.20[한광희] 내 주변 채용공고 전체 보기 특수문자 변환 START */
						// text : p_data.recru_nm
						text : escaped
						/** 2020.07.20[한광희] 내 주변 채용공고 전체 보기 특수문자 변환 END */
					})
				).append(
					$("<div/>", {
						"class" : "ectRecu"
					}).append(
						$("<div/>", {
							"class" : "pay"
						}).append(
							$("<span/>", {
								"class" : "wage_type_"+p_data.wage_type,
								text : p_data.wage_type_nm
							})
						).append(appendCommaToNumber(p_data.salary))
					).append(
						$("<div/>", {
							"class" : "career",
							//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. START
							text : "경력 : "+p_data.career_nm+" ㅣ 학력 : "+p_data.acdmcr_nm
							//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. END
						})
					).append(
						$("<div/>", {
							"class" : "distant",
							text : "내 위치에서 "
						}).append(
							$("<span/>", {
								text : p_data.pt_distance_nm
							})
						)
					).append(
						$("<div/>", {
							"class" : "postTime",
							text : lv_reg_dt_d_day+"일전"
						})
					)
				).append(
					$("<table/>", {
						"class" : "myNeighberhoodJobListSub",
						border : "0",
						style : ((p_type == "1" && $myNeighberhoodJobMap.ui.myNeighberhoodJobListSubYn == "N") || (p_type == "2" && $myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn == "N")) ? "display: none; width: 100%;" : "width: 100%;"
					}).append("<colgroup><col width=\"30%\" style=\"color:red;\"><col width=\"25%\" /><col width=\"20%\" /><col width=\"25%\" /></colgroup>")
					.append(
						$("<tr/>")
						.append($("<th/>", {text : "대표자명"}))
						.append($("<td/>", {text : p_data.main_nm}))
						.append($("<th/>", {text : "근로자수"}))
						.append($("<td/>", {text : p_data.labrr_cnt+"명"}))
					)
					.append(
						$("<tr/>")
						.append($("<th/>", {text : "자본금"}))
						.append($("<td/>", {text : lv_cap_text}))
						.append($("<th/>", {text : "연매출액"}))
						.append($("<td/>", {text : lv_year_sales_text}))
					)
					.append(
						$("<tr/>")
						.append($("<th/>", {text : "업종"}))
						.append($("<td/>", {colspan : "3", text : p_data.indust_class_nm}))
					)
					.append(
						$("<tr/>")
						.append($("<th/>", {text : "주요사업내용"}))
						.append($("<td/>", {colspan : "3", text : p_data.main_biz_content}))
					)
				)
			);
		},
		
		/**
		 * @name : myNeighberhoodJobListPaging
		 * @description : 일자리 목록 페이징
		 * @date : 2019.07.11
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_index : 페이징 인덱스
		 * 		p_move_yn : swiper 이동여부
		 */
		myNeighberhoodJobListPaging : function(p_index, p_move_yn) {
			//중복실행 방지 확인
			if($myNeighberhoodJobMap.ui.myNeighberhoodJobListPagingFlag != false) {
				return false;
			}
			//중복실행 방지 켜기
			$myNeighberhoodJobMap.ui.myNeighberhoodJobListPagingFlag = true;
			
			var lv_index = Number(p_index);
			var lv_index_min = lv_index - 2; // 이전 2칸
			var lv_index_max = lv_index + 2; // 이후 2칸
			var lv_data_index_min = Number($("#myNeighberhoodJobList>ul>li").first().attr("data_index"));
			var lv_data_index_max = Number($("#myNeighberhoodJobList>ul>li").last().attr("data_index"));
			if(lv_index_min < 0) lv_index_min = 0;
			if(lv_index_max >= $myNeighberhoodJobMap.ui.myNeighberhoodJobListCount) lv_index_max = $myNeighberhoodJobMap.ui.myNeighberhoodJobListCount - 1;
			if(isNaN(lv_data_index_min)) lv_data_index_min = 0;
			if(isNaN(lv_data_index_max)) lv_data_index_max = 0;
			
			//안쓰는거 제거
			var lv_swipe_index = 0;
			var lv_exist_indexs = [];
			var lv_remove_slides = [];
			$("#myNeighberhoodJobList>ul>li").each(function() {
				var lv_temp_data_index = Number($(this).attr("data_index"));
				if(lv_temp_data_index < lv_index_min || lv_temp_data_index > lv_index_max) {
					lv_remove_slides.push(lv_swipe_index);
				} else {
					lv_exist_indexs.push(lv_temp_data_index);
				}
				lv_swipe_index++;
			});
			if(lv_remove_slides != null && lv_remove_slides.length > 0) {
				//슬라이드 싹다 지우면 오류나서 try로 감쌈.
				try {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper.removeSlide(lv_remove_slides);
				} catch(e) { }
			}
			
			//필요한거 추가
			//정방향 (오른쪽에 추가)
			if(lv_index_min >= lv_data_index_min) {
				for(var i = lv_index_min; i <= lv_index_max; i++) {
					if(lv_exist_indexs.indexOf(i) == -1) {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper.appendSlide($myNeighberhoodJobMap.ui.myNeighberhoodJobListGetHtml(i, $myNeighberhoodJobMap.ui.myNeighberhoodJobList[i], "1"));
					}
				}
			}
			//역방향 (왼쪽에 추가)
			else {
				for(var i = lv_index_max; i >= lv_index_min; i--) {
					if(lv_exist_indexs.indexOf(i) == -1) {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper.prependSlide($myNeighberhoodJobMap.ui.myNeighberhoodJobListGetHtml(i, $myNeighberhoodJobMap.ui.myNeighberhoodJobList[i], "1"));
					}
				}
			}
			
			//슬라이드 이동
			if(p_move_yn == "Y") {
				lv_swipe_index = 0;
				$("#myNeighberhoodJobList>ul>li").each(function() {
					var lv_temp_this = $(this);
					var lv_temp_data_index = Number(lv_temp_this.attr("data_index"));
					if(lv_temp_data_index == lv_index) {
						lv_temp_this.removeClass("off");
						lv_temp_this.addClass("on");
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListMapMoveYn = "N";
    					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper.slideTo(lv_swipe_index);
						return false;
					}
					lv_swipe_index++;
				});
			}
			
			//중복실행 방지 끄기
			$myNeighberhoodJobMap.ui.myNeighberhoodJobListPagingFlag = false;
			return true;
		},
		
		/**
		 * @name : myNeighberhoodJobList2Paging
		 * @description : 일자리 목록 (전체보기) 페이징
		 * @date : 2019.07.11
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_index : 페이징 인덱스
		 * 		p_move_yn : swiper 이동여부
		 */
		myNeighberhoodJobList2Paging : function(p_index) {
			//중복실행 방지 확인
			if($myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingFlag != false) {
				return false;
			}
			//중복실행 방지 켜기
			$myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingFlag = true;
			
			//같은페이지 두번 연속 호출 불필요
			//최소값 최대값 제한
			if($myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingIndex == p_index
				|| p_index < 0
				|| (p_index * 10) > $myNeighberhoodJobMap.ui.myNeighberhoodJobListCount
			) {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingFlag = false;
				return false;
			}
			
			//페이징 제한 (0페이지 부터 마지막페이지 까지)
			if(p_index < 0) p_index = 0;
			else if(p_index >= Math.ceil($myNeighberhoodJobMap.ui.myNeighberhoodJobListCount / 10)) p_index = Math.ceil($myNeighberhoodJobMap.ui.myNeighberhoodJobListCount / 10) - 1;
			
			//변수 선언
			var lv_index = p_index * 10;
			if(lv_index < 0) lv_index = 0;
			else if(lv_index >= $myNeighberhoodJobMap.ui.myNeighberhoodJobListCount) lv_index = $myNeighberhoodJobMap.ui.myNeighberhoodJobListCount - 1;
			var lv_index_min = lv_index - 10; // 이전 10칸
			var lv_index_max = lv_index + 10; // 이후 10칸
			var lv_data_index_min = Number($("#myNeighberhoodJobList2>ul>li").first().attr("data_index"));
			var lv_data_index_max = Number($("#myNeighberhoodJobList2>ul>li").last().attr("data_index"));
			if(lv_index_min < 0) lv_index_min = 0;
			if(lv_index_max >= $myNeighberhoodJobMap.ui.myNeighberhoodJobListCount) lv_index_max = $myNeighberhoodJobMap.ui.myNeighberhoodJobListCount - 1;
			if(isNaN(lv_data_index_min)) lv_data_index_min = 0;
			if(isNaN(lv_data_index_max)) lv_data_index_max = 0;
			
			//전역 페이징 변수
			$myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingIndex = p_index;
			
			//안쓰는거 제거
			var lv_exist_indexs = [];
			var lv_remove_slides = [];
			$("#myNeighberhoodJobList2>ul>li").each(function() {
				var lv_temp_this = $(this);
				var lv_temp_data_index = Number(lv_temp_this.attr("data_index"));
				if(lv_temp_data_index < lv_index_min || lv_temp_data_index > lv_index_max) {
					lv_temp_this.remove();
				} else {
					lv_exist_indexs.push(lv_temp_data_index);
				}
			});
			
			//필요한거 추가
			var lv_list2_ul = $("#myNeighberhoodJobList2>ul");
			//정방향 (아래에 추가)
			if(lv_index_min >= lv_data_index_min) {
				for(var i = lv_index_min; i <= lv_index_max; i++) {
					if(lv_exist_indexs.indexOf(i) == -1) {
						lv_list2_ul.append($myNeighberhoodJobMap.ui.myNeighberhoodJobListGetHtml(i, $myNeighberhoodJobMap.ui.myNeighberhoodJobList[i], "2"));
					}
				}
			}
			//역방향 (위에 추가)
			else {
				for(var i = lv_index_max; i >= lv_index_min; i--) {
					if(lv_exist_indexs.indexOf(i) == -1) {
						lv_list2_ul.prepend($myNeighberhoodJobMap.ui.myNeighberhoodJobListGetHtml(i, $myNeighberhoodJobMap.ui.myNeighberhoodJobList[i], "2"));
					}
				}
			}
			
			//중복실행 방지 끄기
			$myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingFlag = false;
			return true;
		},
		
		/**
		 * @name : myNeighberhoodJobListSubToggle
		 * @description : 일자리 목록 하단 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : Y/N/0 => 펼치기/접기/숨기기
		 * 		p_delay : 딜레이
		 */
		myNeighberhoodJobListSubToggle : function(p_flag, p_delay) {
			//딜레이 기본값
			if(p_delay == undefined) p_delay = 0;
			
			//펼치기
			if(p_flag == "Y") {
				//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. START
				$("#myNeighberhoodJobSearch").animate({bottom: 305},p_delay);
				$("#myNeighberhoodJobList").parent().animate({height: 335},p_delay);
				$("#myNeighberhoodJobList>ul>li>div.rvbWrap").show().css("height","");
				//$("#myNeighberhoodJobList .myNeighberhoodJobListSub").slideDown(0);
				$("#myNeighberhoodJobList .myNeighberhoodJobListSub").show();
				//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. END
			}
			//접기
			else if(p_flag == "N") {
				//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. START
				$("#myNeighberhoodJobSearch").animate({bottom: 190},p_delay);
				$("#myNeighberhoodJobList").parent().animate({height: 220},p_delay);
				$("#myNeighberhoodJobList>ul>li>div.rvbWrap").show().animate({height: 185},p_delay);
				//$("#myNeighberhoodJobList .myNeighberhoodJobListSub").slideUp(0);
				$("#myNeighberhoodJobList .myNeighberhoodJobListSub").hide();
				//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. END
			}
			//숨기기
			else if(p_flag == "0") {
				$("#myNeighberhoodJobSearch").animate({bottom: 10},p_delay);
				$("#myNeighberhoodJobList").parent().animate({height: 40},p_delay);
				$("#myNeighberhoodJobList>ul>li>div.rvbWrap").hide().animate({height: 0},p_delay);
				//$("#myNeighberhoodJobList .myNeighberhoodJobListSub").slideUp(0);
				$("#myNeighberhoodJobList .myNeighberhoodJobListSub").hide();
			}
		},
		
		/**
		 * @name : myNeighberhoodJobList2SubToggle
		 * @description : 일자리 목록 (전체보기) 하단 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : Y/N/0 => 펼치기/접기/숨기기
		 * 		p_delay : 딜레이(안씀)
		 */
		myNeighberhoodJobList2SubToggle : function(p_flag, p_delay) {
			//딜레이 기본값(안씀)
			if(p_delay == undefined) p_delay = 0;
			
			//펼치기
			if(p_flag == "Y") {
				$("#myNeighberhoodJobList2>ul>li table.myNeighberhoodJobListSub").show();
			}
			//접기
			else if(p_flag == "N") {
				$("#myNeighberhoodJobList2>ul>li table.myNeighberhoodJobListSub").hide();
			}
		},
		
		/**
		 * @name : myNeighberhoodJobSearchPopup_sido_list
		 * @description : 일자리 찾기 팝업 시도 목록
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		myNeighberhoodJobSearchPopup_sido_list : function(p_sido_cd) {
			// 기본값(전체)
			$("#myNeighberhoodJobSearchPopup_sido").html("<option value=\"99\" data-x=\"990480.875\" data-y=\"1815839.375\">전국</option>");
			// ajax 시작
			$.ajax({
			    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
			    type: 'get', //api는 get으로 받아야함
			    dataType : 'json',
			    async: false,
			    data: {
			    	accessToken:accessToken,
			    	pg_yn: "0",
			    	bnd_year: bndYear
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvResultList = res.result;
					for(var i = 0; i < lvResultList.length; i++) {
						if(lvResultList[i].cd == p_sido_cd) {
							$("#myNeighberhoodJobSearchPopup_sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
						}
						else {
							$("#myNeighberhoodJobSearchPopup_sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name : myNeighberhoodJobSearchPopup_sgg_list
		 * @description : 일자리 찾기 팝업 시군구 목록
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		myNeighberhoodJobSearchPopup_sgg_list : function(p_sido_cd, p_sgg_cd) {
			// 기본값(전체)
			$("#myNeighberhoodJobSearchPopup_sgg").html("<option value=\"999\" data-x=\"990480.875\" data-y=\"1815839.375\">전체</option>");
			// ajax 시작
			$.ajax({
			    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
			    type: 'get', //api는 get으로 받아야함
			    dataType : 'json',
			    async: false,
			    data: {
			    	accessToken: accessToken,
			    	pg_yn: "0",
			    	cd: p_sido_cd,
			    	bnd_year: bndYear
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvResultList = res.result;
					for(var i = 0; i < lvResultList.length; i++) {
						if(lvResultList[i].cd.slice(-3) == p_sgg_cd) {
							$("#myNeighberhoodJobSearchPopup_sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
						}
						else {
							$("#myNeighberhoodJobSearchPopup_sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		},
		
		//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
		/**
		 * @name : myNeighberhoodJobSearchPopupInit
		 * @description : 일자리 찾기 팝업 초기화
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		myNeighberhoodJobSearchPopupInit : function() {
		//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			/* 일자리맞춤형서비스정보 조회 */
			//변수선언
			var lv_clmser_lc_info_agree_yn = "N";
			var lv_clmser_sido_cd = "";
			var lv_clmser_sgg_cd = "";
			var lv_clmser_entrprs_class_content = "";
			var lv_clmser_jssfc_class_content = "";
			var lv_clmser_salary_class_content = "";
			var lv_clmser_emplym_class_content = "";
			var lv_clmser_acdmcr_class_content = "";
			var lv_clmser_career_class_content = "";
			var lv_clmser_indust_class_content = "";
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/selectSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    async: false, //무조건 동기
				    data: {
				    	member_id: sop.member_id //로그인 ID
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvResultList = res.result.resultList;
						var lvResultCount = res.result.resultCount;
						if(lvResultCount > 0) {
							$("#myNeighberhoodJobClmserGuidance").hide(); //맞춤형서비스 안내 숨김
							lv_clmser_lc_info_agree_yn = lvResultList[0].lc_info_agree_yn;
							lv_clmser_sido_cd = lvResultList[0].sido_cd;
							lv_clmser_sgg_cd = lvResultList[0].sgg_cd;
							lv_clmser_entrprs_class_content = lvResultList[0].entrprs_class_content;
							lv_clmser_jssfc_class_content = lvResultList[0].jssfc_class_content;
							lv_clmser_salary_class_content = lvResultList[0].salary_class_content;
							lv_clmser_emplym_class_content = lvResultList[0].emplym_class_content;
							lv_clmser_acdmcr_class_content = lvResultList[0].acdmcr_class_content;
							lv_clmser_career_class_content = lvResultList[0].career_class_content;
							lv_clmser_indust_class_content = lvResultList[0].indust_class_content;
						}
					}else if(res.errCd == "-401") {
						//common_alert(res.errMsg);
					}else{
						//common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false);
				});
				// ajax 끝
			}
			
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
			/* 공통코드 조회 */
			if($myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd == null) {
				// ajax 시작
				$.ajax({
					url: contextPath + "/m2019/workroad/selectCmmCdComcdAll.json",
				    type: 'post',
				    dataType: 'json',
				    async: false,
				    data: {"data" : "data"}
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd = res.result;
					}else if(res.errCd == "-401") {
						//common_alert(res.errMsg);
					}else{
						//common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false);
				});
				// ajax 끝
			}
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			
			/* 희망지역 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_sido").html() == "") {
				//조회구분 있는 경우 리스트 조회 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun != "") {
					//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
					if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "1") {
						//특정 지역 받은 경우
						if(gv_sido_cd != "") {
							//특정 지역으로 시도 변경
							$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(gv_sido_cd);
							$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), gv_sgg_cd);
						}
						else {
							//내 위치로 시도 변경
							$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
							$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), $myNeighberhoodJobMap.ui.my_sgg_cd);
						}
					}
					//조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박, A: 맞춤형서비스)
					else if($myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "2" || $myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "3" || $myNeighberhoodJobMap.ui.myNeighberhoodJobListGubun == "A") {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(lv_clmser_sido_cd);
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), lv_clmser_sgg_cd);
					}
				}
				else {
					//내 위치 시도 시군구 우선적용
					if($myNeighberhoodJobMap.ui.my_sido_cd != null && $myNeighberhoodJobMap.ui.my_sido_cd != "" && $myNeighberhoodJobMap.ui.my_sgg_cd != null && $myNeighberhoodJobMap.ui.my_sgg_cd != "") {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), $myNeighberhoodJobMap.ui.my_sgg_cd);
					}
					//일자리맞춤형서비스정보 적용
					else if(lv_clmser_sido_cd != null && lv_clmser_sido_cd != "" && lv_clmser_sgg_cd != null && lv_clmser_sgg_cd != "") {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(lv_clmser_sido_cd);
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), lv_clmser_sgg_cd);
					}
					//전국
					else {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list();
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val());
					}
				}
			}
			//초기화
			else {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//일자리맞춤형서비스정보 적용
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitYn == "Y" && lv_clmser_sido_cd != null && lv_clmser_sido_cd != "" && lv_clmser_sgg_cd != null && lv_clmser_sgg_cd != "") {
					$("#myNeighberhoodJobSearchPopup_sido").val(lv_clmser_sido_cd);
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), lv_clmser_sgg_cd);
				}
				//내 위치 시도 시군구 적용
				else if($myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitYn == "Y" && $myNeighberhoodJobMap.ui.my_sido_cd != null && $myNeighberhoodJobMap.ui.my_sido_cd != "" && $myNeighberhoodJobMap.ui.my_sgg_cd != null && $myNeighberhoodJobMap.ui.my_sgg_cd != "") {
					$("#myNeighberhoodJobSearchPopup_sido").val($myNeighberhoodJobMap.ui.my_sido_cd);
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val(), $myNeighberhoodJobMap.ui.my_sgg_cd);
				}
				//전국
				else if($myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitYn == "Y") {
					$("#myNeighberhoodJobSearchPopup_sido").val("99");
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobSearchPopup_sido").val());
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			
			/* 기업형태 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_company_type").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.ENTTYP;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobSearchPopup_company_type").append("<option value=\""+lvResultList[i].cd+"\" title=\""+lvResultList[i].exp+"\">"+lvResultList[i].nm+"</option>");
				}
				
				//기업형태 다중선텍 처리
				$('#myNeighberhoodJobSearchPopup_company_type').multiselect({
					nonSelectedText : "선택",
					nSelectedText : "개 선택",
					allSelectedText : "전체 선택",
					buttonWidth: "100%",
					includeSelectAllOption: true, //전체 버튼 사용
					selectAllText: ' 전체', //전체 버튼 텍스트
					enableFiltering: true, //검색 기능
					filterPlaceholder: "검색어 입력", //검색어 비었을때 표시 문구
					maxHeight: ($(window).outerHeight(true) / 2), //스크린의 50% 크기이상 안 커지게 세팅
					onDropdownShown: function(event) {
						var lvThis = $(event.target);
						if(lvThis.hasClass("btn-group")) {
							//검색어 초기화
							lvThis.children("ul").children("li").eq(0).find("input").val("");
							lvThis.children("ul").children("li").eq(0).find("input").trigger("input");
							
							//검색어 포커스
							//lvThis.children("ul").children("li").eq(0).find("input").focus();
						}
					},
					onChange: function(option, checked) {
						var lvSelectId = $(this.$select).attr("id");
						var lvSelectValueList = $("#"+lvSelectId).multiselect("getSelected").val();
						//선택 개수 수정
						if(lvSelectValueList != null && lvSelectValueList.length > 0) {
							$("#"+lvSelectId+"_count").html("<strong>"+(lvSelectValueList.length)+"</strong>개선택");
						}
						else {
							$("#"+lvSelectId+"_count").html("<strong>0</strong>개선택");
						}
		            },
		            onSelectAll: function() {
		            	this.options.onChange();
		            },
		            onDeselectAll: function() {
		            	this.options.onChange();
		            }
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_entrprs_class_content != null && lv_clmser_entrprs_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_company_type").multiselect("select", lv_clmser_entrprs_class_content.split(","), true);
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 취소
				$("#myNeighberhoodJobSearchPopup_company_type").multiselect("deselectAll", false);
				$("#myNeighberhoodJobSearchPopup_company_type").multiselect('updateButtonText');
				$("#myNeighberhoodJobSearchPopup_company_type_count").html("<strong>0</strong>개선택");
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_entrprs_class_content != null && lv_clmser_entrprs_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_company_type").multiselect("select", lv_clmser_entrprs_class_content.split(","), true);
				}
			}
			
			/* 직종분류 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_classification").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.RCRJSS;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobSearchPopup_classification").append("<option value=\""+lvResultList[i].cd+"\" title=\""+lvResultList[i].exp+"\">"+lvResultList[i].nm+"</option>");
				}
				
				//직종분류 다중선텍 처리
				$('#myNeighberhoodJobSearchPopup_classification').multiselect({
					nonSelectedText : "선택",
					nSelectedText : "개 선택",
					allSelectedText : "전체 선택",
					buttonWidth: "100%",
					includeSelectAllOption: true, //전체 버튼 사용
					selectAllText: ' 전체', //전체 버튼 텍스트
					enableFiltering: true, //검색 기능
					filterPlaceholder: "검색어 입력", //검색어 비었을때 표시 문구
					maxHeight: ($(window).outerHeight(true) / 2), //스크린의 50% 크기이상 안 커지게 세팅
					onDropdownShown: function(event) {
						var lvThis = $(event.target);
						if(lvThis.hasClass("btn-group")) {
							//검색어 초기화
							lvThis.children("ul").children("li").eq(0).find("input").val("");
							lvThis.children("ul").children("li").eq(0).find("input").trigger("input");
							
							//검색어 포커스
							//lvThis.children("ul").children("li").eq(0).find("input").focus();
						}
					},
					onChange: function(option, checked) {
						var lvSelectId = $(this.$select).attr("id");
						var lvSelectValueList = $("#"+lvSelectId).multiselect("getSelected").val();
						//선택 개수 수정
						if(lvSelectValueList != null && lvSelectValueList.length > 0) {
							$("#"+lvSelectId+"_count").html("<strong>"+(lvSelectValueList.length)+"</strong>개선택");
						}
						else {
							$("#"+lvSelectId+"_count").html("<strong>0</strong>개선택");
						}
		            },
		            onSelectAll: function() {
		            	this.options.onChange();
		            },
		            onDeselectAll: function() {
		            	this.options.onChange();
		            }
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_jssfc_class_content != null && lv_clmser_jssfc_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_classification").multiselect("select", lv_clmser_jssfc_class_content.split(","), true);
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//선택 취소
				$("#myNeighberhoodJobSearchPopup_classification").multiselect("deselectAll", false);
				$("#myNeighberhoodJobSearchPopup_classification").multiselect('updateButtonText');
				$("#myNeighberhoodJobSearchPopup_classification_count").html("<strong>0</strong>개선택");
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_jssfc_class_content != null && lv_clmser_jssfc_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_classification").multiselect("select", lv_clmser_jssfc_class_content.split(","), true);
				}
			}
			
			/* 급여수준 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_salaly").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.WAGETY;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobSearchPopup_salaly").append("<optgroup label=\""+lvResultList[i].nm+"\">");
					var lvResultList2 = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd["WGTY_"+lvResultList[i].cd];
					for(var j = 0; j < lvResultList2.length; j++) {
						$("#myNeighberhoodJobSearchPopup_salaly").append("<option value=\""+"WGTY_"+lvResultList[i].cd+"_"+lvResultList2[j].cd+"\" title=\""+lvResultList2[j].exp+"\">"+lvResultList2[j].nm+"</option>");
					}
					$("#myNeighberhoodJobSearchPopup_salaly").append("</optgroup>");
				}
				
				//급여수준 다중선텍 처리
				$('#myNeighberhoodJobSearchPopup_salaly').multiselect({
					nonSelectedText : "선택",
					nSelectedText : "개 선택",
					allSelectedText : "전체 선택",
					buttonWidth: "100%",
					includeSelectAllOption: true, //전체 버튼 사용
					selectAllText: ' 전체', //전체 버튼 텍스트
					enableFiltering: true, //검색 기능
					filterPlaceholder: "검색어 입력", //검색어 비었을때 표시 문구
					maxHeight: ($(window).outerHeight(true) / 2), //스크린의 50% 크기이상 안 커지게 세팅
					onDropdownShown: function(event) {
						var lvThis = $(event.target);
						if(lvThis.hasClass("btn-group")) {
							//검색어 초기화
							lvThis.children("ul").children("li").eq(0).find("input").val("");
							lvThis.children("ul").children("li").eq(0).find("input").trigger("input");
							
							//검색어 포커스
							//lvThis.children("ul").children("li").eq(0).find("input").focus();
						}
					},
					onChange: function(option, checked) {
						var lvSelectId = $(this.$select).attr("id");
						var lvSelectValueList = $("#"+lvSelectId).multiselect("getSelected").val();
						//선택 개수 수정
						if(lvSelectValueList != null && lvSelectValueList.length > 0) {
							$("#"+lvSelectId+"_count").html("<strong>"+(lvSelectValueList.length)+"</strong>개선택");
						}
						else {
							$("#"+lvSelectId+"_count").html("<strong>0</strong>개선택");
						}
		            },
		            onSelectAll: function() {
		            	this.options.onChange();
		            },
		            onDeselectAll: function() {
		            	this.options.onChange();
		            }
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_salary_class_content != null && lv_clmser_salary_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_salaly").multiselect("select", lv_clmser_salary_class_content.split(","), true);
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//선택 취소
				$("#myNeighberhoodJobSearchPopup_salaly").multiselect("deselectAll", false);
				$("#myNeighberhoodJobSearchPopup_salaly").multiselect('updateButtonText');
				$("#myNeighberhoodJobSearchPopup_salaly_count").html("<strong>0</strong>개선택");
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_salary_class_content != null && lv_clmser_salary_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_salaly").multiselect("select", lv_clmser_salary_class_content.split(","), true);
				}
			}
			
			/* 고용형태 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_employment_type").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.EMPTYP;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobSearchPopup_employment_type").append("<option value=\""+lvResultList[i].cd+"\" title=\""+lvResultList[i].exp+"\">"+lvResultList[i].nm+"</option>");
				}
				
				//고용형태 다중선텍 처리
				$('#myNeighberhoodJobSearchPopup_employment_type').multiselect({
					nonSelectedText : "선택",
					nSelectedText : "개 선택",
					allSelectedText : "전체 선택",
					buttonWidth: "100%",
					includeSelectAllOption: true, //전체 버튼 사용
					selectAllText: ' 전체', //전체 버튼 텍스트
					//enableFiltering: true, //검색 기능
					//filterPlaceholder: "검색어 입력", //검색어 비었을때 표시 문구
					//maxHeight: ($(window).outerHeight(true) / 2), //스크린의 50% 크기이상 안 커지게 세팅
					/*onDropdownShown: function(event) {
						var lvThis = $(event.target);
						if(lvThis.hasClass("btn-group")) {
							//검색어 초기화
							lvThis.children("ul").children("li").eq(0).find("input").val("");
							lvThis.children("ul").children("li").eq(0).find("input").trigger("input");
							
							//검색어 포커스
							//lvThis.children("ul").children("li").eq(0).find("input").focus();
						}
					},*/
					onChange: function(option, checked) {
						var lvSelectId = $(this.$select).attr("id");
						var lvSelectValueList = $("#"+lvSelectId).multiselect("getSelected").val();
						//선택 개수 수정
						if(lvSelectValueList != null && lvSelectValueList.length > 0) {
							$("#"+lvSelectId+"_count").html("<strong>"+(lvSelectValueList.length)+"</strong>개선택");
						}
						else {
							$("#"+lvSelectId+"_count").html("<strong>0</strong>개선택");
						}
		            },
		            onSelectAll: function() {
		            	this.options.onChange();
		            },
		            onDeselectAll: function() {
		            	this.options.onChange();
		            }
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_emplym_class_content != null && lv_clmser_emplym_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_employment_type").multiselect("select", lv_clmser_emplym_class_content.split(","), true);
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//선택 취소
				$("#myNeighberhoodJobSearchPopup_employment_type").multiselect("deselectAll", false);
				$("#myNeighberhoodJobSearchPopup_employment_type").multiselect('updateButtonText');
				$("#myNeighberhoodJobSearchPopup_employment_type_count").html("<strong>0</strong>개선택");
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_emplym_class_content != null && lv_clmser_emplym_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_employment_type").multiselect("select", lv_clmser_emplym_class_content.split(","), true);
				}
			}
			
			/* 학력 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_academic_ability").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.ACDMCR;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobSearchPopup_academic_ability").append("<option value=\""+lvResultList[i].cd+"\" title=\""+lvResultList[i].exp+"\">"+lvResultList[i].nm+"</option>");
				}
				
				//경력 다중선텍 처리
				$('#myNeighberhoodJobSearchPopup_academic_ability').multiselect({
					nonSelectedText : "선택",
					nSelectedText : "개 선택",
					allSelectedText : "전체 선택",
					buttonWidth: "100%",
					includeSelectAllOption: true, //전체 버튼 사용
					selectAllText: ' 전체', //전체 버튼 텍스트
					//enableFiltering: true, //검색 기능
					//filterPlaceholder: "검색어 입력", //검색어 비었을때 표시 문구
					//maxHeight: ($(window).outerHeight(true) / 2), //스크린의 50% 크기이상 안 커지게 세팅
					onDropdownShown: function(event) {
						/*var lvThis = $(event.target);
						if(lvThis.hasClass("btn-group")) {
							//검색어 초기화
							lvThis.children("ul").children("li").eq(0).find("input").val("");
							lvThis.children("ul").children("li").eq(0).find("input").trigger("input");
							
							//검색어 포커스
							//lvThis.children("ul").children("li").eq(0).find("input").focus();
						}*/
						$("#myNeighberhoodJobSearchPopup_bottom").css("height",($(window).outerHeight(true) / 2)+"px");
					},
					onDropdownHidden:  function(event) {
						//$("#myNeighberhoodJobSearchPopup_bottom").css("height","");
					},
					onChange: function(option, checked) {
						var lvSelectId = $(this.$select).attr("id");
						var lvSelectValueList = $("#"+lvSelectId).multiselect("getSelected").val();
						//선택 개수 수정
						if(lvSelectValueList != null && lvSelectValueList.length > 0) {
							$("#"+lvSelectId+"_count").html("<strong>"+(lvSelectValueList.length)+"</strong>개선택");
						}
						else {
							$("#"+lvSelectId+"_count").html("<strong>0</strong>개선택");
						}
		            },
		            onSelectAll: function() {
		            	this.options.onChange();
		            },
		            onDeselectAll: function() {
		            	this.options.onChange();
		            }
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_acdmcr_class_content != null && lv_clmser_acdmcr_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_academic_ability").multiselect("select", lv_clmser_acdmcr_class_content.split(","), true);
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//선택 취소
				$("#myNeighberhoodJobSearchPopup_academic_ability").multiselect("deselectAll", false);
				$("#myNeighberhoodJobSearchPopup_academic_ability").multiselect('updateButtonText');
				$("#myNeighberhoodJobSearchPopup_academic_ability_count").html("<strong>0</strong>개선택");
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_acdmcr_class_content != null && lv_clmser_acdmcr_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_academic_ability").multiselect("select", lv_clmser_acdmcr_class_content.split(","), true);
				}
			}
			
			/* 경력 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_career").html() == "") {
				// 전체
				$("#myNeighberhoodJobSearchPopup_career").append("<li name=\"myNeighberhoodJobSearchPopup_career\" data-value=\"all\" title=\"전체\" class=\"on\"><a href=\"#\" class=\"current\">전체</a></li>");
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.CAREER;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobSearchPopup_career").append("<li name=\"myNeighberhoodJobSearchPopup_career\" data-value=\""+lvResultList[i].cd+"\" title=\""+lvResultList[i].exp+"\"><a href=\"#\">"+lvResultList[i].nm+"</a></li>");
				}
				
				//경력 선텍 이벤트
				$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("on");
					
					//전체 인 경우
					if(lvThisValue == "all") {
						//체크
						if(!lvThisFlag) {
							lvThis.addClass("on");
							lvThis.children("a").addClass("current");
							
							//나머지 체크 해제
							$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("on");
								lvThis.children("a").removeClass("current");
							});
						}
						//체크해제
						else {
							
						}
					}
					//전체가 아닌 경우
					else {
						//체크
						if(!lvThisFlag) {
							lvThis.addClass("on");
							lvThis.children("a").addClass("current");
							
							//전체 체크 해제
							$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').first().removeClass("on");
							$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').first().children("a").removeClass("current");
						}
						//체크해제
						else {
							lvThis.removeClass("on");
							lvThis.children("a").removeClass("current");
							
							//전체 체크
							var lvThisFlag2 = true;
							$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').slice(1).each(function() {
								//다른거 체크된거 있는지 확인
								if($(this).hasClass("on")) {
									lvThisFlag2 = false;
								}
							});
							//없으면 전체 체크
							if(lvThisFlag2 == true) {
								$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').first().addClass("on");
								$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').first().children("a").addClass("current");
							}
						}
					}
					
					//선택 건수
					var lvThisCount = 0;
					$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).hasClass("on")) {
							lvThisCount++;
						}
					});
					$("#myNeighberhoodJobSearchPopup_career_count").html("<strong>"+lvThisCount+"</strong>개선택");
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_career_class_content != null && lv_clmser_career_class_content != "") {
					var lv_clmser_career_class_content_list = lv_clmser_career_class_content.split(",");
					for(var i = 0; i < lv_clmser_career_class_content_list.length; i++) {
						$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').slice(1).each(function() {
							var lvThis = $(this);
							var lvThisValue = lvThis.attr("data-value");
							if(lvThisValue == lv_clmser_career_class_content_list[i]) {
								lvThis.click();
							}
						});
					}
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체 선택 및 나머지 취소
				$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').each(function() {
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					
					//전체 선택
					if(lvThisValue == "all") {
						lvThis.addClass("on");
						lvThis.children("a").addClass("current");
					}
					//나머지 취소
					else {
						lvThis.removeClass("on");
						lvThis.children("a").removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_career_class_content != null && lv_clmser_career_class_content != "") {
					var lv_clmser_career_class_content_list = lv_clmser_career_class_content.split(",");
					for(var i = 0; i < lv_clmser_career_class_content_list.length; i++) {
						$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').slice(1).each(function() {
							var lvThis = $(this);
							var lvThisValue = lvThis.attr("data-value");
							if(lvThisValue == lv_clmser_career_class_content_list[i]) {
								lvThis.click();
							}
						});
					}
				}
				
				//선택 건수
				var lvThisCount = 0;
				$('#myNeighberhoodJobSearchPopup_career li[name="myNeighberhoodJobSearchPopup_career"]').slice(1).each(function() {
					//다른거 체크된거 있는지 확인
					if($(this).hasClass("on")) {
						lvThisCount++;
					}
				});
				$("#myNeighberhoodJobSearchPopup_career_count").html("<strong>"+lvThisCount+"</strong>개선택");
			}
			
			/* 산업분류 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_industry_classification").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.INDCLA;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobSearchPopup_industry_classification").append("<option value=\""+lvResultList[i].cd+"\" title=\""+lvResultList[i].exp+"\">"+lvResultList[i].nm+"</option>");
				}
				
				//산업분류 다중선텍 처리
				$('#myNeighberhoodJobSearchPopup_industry_classification').multiselect({
					nonSelectedText : "선택",
					nSelectedText : "개 선택",
					allSelectedText : "전체 선택",
					buttonWidth: "100%",
					includeSelectAllOption: true, //전체 버튼 사용
					selectAllText: ' 전체', //전체 버튼 텍스트
					enableFiltering: true, //검색 기능
					filterPlaceholder: "검색어 입력", //검색어 비었을때 표시 문구
					maxHeight: ($(window).outerHeight(true) / 2), //스크린의 50% 크기이상 안 커지게 세팅
					onDropdownShown: function(event) {
						var lvThis = $(event.target);
						if(lvThis.hasClass("btn-group")) {
							//검색어 초기화
							lvThis.children("ul").children("li").eq(0).find("input").val("");
							lvThis.children("ul").children("li").eq(0).find("input").trigger("input");
							
							//검색어 포커스
							//lvThis.children("ul").children("li").eq(0).find("input").focus();
						}
						$("#myNeighberhoodJobSearchPopup_bottom").css("height",($(window).outerHeight(true) / 2)+"px");
					},
					onDropdownHidden:  function(event) {
						//$("#myNeighberhoodJobSearchPopup_bottom").css("height","");
					},
					onChange: function(option, checked) {
						var lvSelectId = $(this.$select).attr("id");
						var lvSelectValueList = $("#"+lvSelectId).multiselect("getSelected").val();
						//선택 개수 수정
						if(lvSelectValueList != null && lvSelectValueList.length > 0) {
							$("#"+lvSelectId+"_count").html("<strong>"+(lvSelectValueList.length)+"</strong>개선택");
						}
						else {
							$("#"+lvSelectId+"_count").html("<strong>0</strong>개선택");
						}
		            },
		            onSelectAll: function() {
		            	this.options.onChange();
		            },
		            onDeselectAll: function() {
		            	this.options.onChange();
		            }
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_indust_class_content != null && lv_clmser_indust_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_industry_classification").multiselect("select", lv_clmser_indust_class_content.split(","), true);
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//선택 취소
				$("#myNeighberhoodJobSearchPopup_industry_classification").multiselect("deselectAll", false);
				$("#myNeighberhoodJobSearchPopup_industry_classification").multiselect('updateButtonText');
				$("#myNeighberhoodJobSearchPopup_industry_classification_count").html("<strong>0</strong>개선택");
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_indust_class_content != null && lv_clmser_indust_class_content != "") {
					$("#myNeighberhoodJobSearchPopup_industry_classification").multiselect("select", lv_clmser_indust_class_content.split(","), true);
				}
			}
		},
		
		/**
		 * @name : myNeighberhoodJobSearchPopupToggle
		 * @description : 일자리 찾기 팝업 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobSearchPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				$("#myNeighberhoodJobSearchPopup").css("top",$(window).outerHeight(true)+"px");
				$("#myNeighberhoodJobSearchPopup").show().animate({
					top : 0
				},400,function(){
					$("body").children("div.Wrap").children("div.Header").hide(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
				});
			}
			//감춤
			else {
				$("body").children("div.Wrap").children("div.Header").show(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
				$("#myNeighberhoodJobSearchPopup").animate({
					top : $(window).outerHeight(true)
				},400,function(){
					$("#myNeighberhoodJobSearchPopup").hide();
				});
			}
		},
		
		/**
		 * @name : myNeighberhoodJobListPopupToggle
		 * @description : 일자리목록 전체보기 팝업 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobListPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				$("#myNeighberhoodJobListPopup").css("top",$(window).outerHeight(true)+"px");
				$("#myNeighberhoodJobListPopup").show().animate({
					top : 0
				},400,function(){
					
				});
			}
			//감춤
			else {
				$("#myNeighberhoodJobListPopup").animate({
					top : $(window).outerHeight(true)
				},400,function(){
					$("#myNeighberhoodJobListPopup").hide();
				});
			}
		},
		
		/**
		 * @name : myNeighberhoodJobSelectPopupToggle
		 * @description : 일자리목록 채용공고 상세보기 팝업 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobSelectPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				srvLogWrite('M0','09','05','01','메인화면',''); // 채용공고 상세보기

				$("#myNeighberhoodJobSelectPopup").css("left",$(window).outerWidth(true)+"px");
				$("#myNeighberhoodJobSelectPopup").show().animate({
					left : 0
				},400,function(){
					
				});
				srvLogWrite('M0','09','05','01','업종별 연령별 평균소득 현황',''); // 통계 정보 선택
			}
			//감춤
			else {
				$("#myNeighberhoodJobSelectPopup").animate({
					left : $(window).outerWidth(true)
				},400,function(){
					$("#myNeighberhoodJobSelectPopup").hide();
				});
			}
		},
		
		/**
		 * @name : myNeighberhoodJobSelectPopupSelect
		 * @description : 일자리목록 채용공고 상세보기 팝업 조회
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_jo_no : 구인번호 
		 */
		myNeighberhoodJobSelectPopupSelect : function(p_jo_no) {
			common_loading(true);
			// ajax 시작
			$.ajax({
			    url: contextPath + "/m2019/workroad/myNeighberhoodJobSelect.json",
			    type: 'post',
			    dataType: 'json',
			    data: {
			    	jo_no: p_jo_no
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvResultData = res.result.resultData;

					/* 등록마감일 */
					//등록일
					var lvTempRegDt = lvResultData.reg_dt;
					if(lvTempRegDt != null && lvTempRegDt != "" && lvTempRegDt.length == 8) {
						lvTempRegDt = lvTempRegDt.substr(2,2)+"."+lvTempRegDt.substr(4,2)+"."+lvTempRegDt.substr(6,2);
					}
					//마감일
					var lvTempClosDt = lvResultData.clos_dt;
					if(lvTempClosDt != null && lvTempClosDt != "" && lvTempClosDt.length == 8) {
						lvTempClosDt = lvTempClosDt.substr(2,2)+"."+lvTempClosDt.substr(4,2)+"."+lvTempClosDt.substr(6,2);
					}
					//등록마감일
					$("#myNeighberhoodJobSelectPopup").find("[name='reg_clos_dt']").html("등록마감일 : "+lvTempRegDt+" - "+lvTempClosDt);
					//D-Day 추가
					if(lvResultData.clos_dt != null && lvResultData.clos_dt != "" && lvResultData.clos_dt.length == 8) {
						var lvTempClosDtDateTime = new Date(lvResultData.clos_dt.substr(0,4)+"-"+lvResultData.clos_dt.substr(4,2)+"-"+lvResultData.clos_dt.substr(6,2)).getTime();
						var lvTempNowDateTime = new Date().getTime();
						var lvTempDDay = Math.floor((lvTempClosDtDateTime - lvTempNowDateTime) / (1000 * 60 * 60 * 24));
						if(lvTempDDay <= 7) {
							$("#myNeighberhoodJobSelectPopup").find("[name='reg_clos_dt']").append("&nbsp;<span class=\"red\">[D-"+lvTempDDay+"]</span>");
						} else {
							$("#myNeighberhoodJobSelectPopup").find("[name='reg_clos_dt']").append("&nbsp;<span>[D-"+lvTempDDay+"]</span>");
						}
					}
					
					/* 회사명 */
					$("#myNeighberhoodJobSelectPopup").find("[name='corp_nm']").html(lvResultData.corp_nm);
					
					/* 채용명 */
					$("#myNeighberhoodJobSelectPopup").find("[name='recru_nm']").html(lvResultData.recru_nm);
					
					/* 경력명, 학력명 */
					//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. START
					$("#myNeighberhoodJobSelectPopup").find("[name='career_acdmcr']").html("경력 : "+lvResultData.career_nm+" ㅣ 학력 : "+lvResultData.acdmcr_nm);
					//2019-09-17 [김남민] (15) 일자리맵 경력/학력 서브타이틀 추가. END
					
					/* 근무지 */
					$("#myNeighberhoodJobSelectPopup").find("[name='work_addr']").html("근무지 : "+lvResultData.work_addr);
					
					/* 연봉 */
					$("#myNeighberhoodJobSelectPopup").find("[name='salaly']").html("<span class=\"wage_type_"+lvResultData.wage_type+"\">"+lvResultData.wage_type_nm+"</span>"+appendCommaToNumber(lvResultData.salary));
					
					/* 근무시간(데이터 없음), 고용형태 */
					$("#myNeighberhoodJobSelectPopup").find("[name='emplym_type']").html(/*lvResultData.work_time+" ㅣ "+*/lvResultData.emplym_type_nm);
					
					/* 대표자명 */
					$("#myNeighberhoodJobSelectPopup").find("[name='main_nm']").html(lvResultData.main_nm);
					
					/* 근로자수 */
					$("#myNeighberhoodJobSelectPopup").find("[name='labrr_cnt']").html(lvResultData.labrr_cnt+"명");
					
					/* 자본금 */
					if(lvResultData.cap != null && lvResultData.cap != "" && (lvResultData.cap+"").lastIndexOf("00000000") >= 0) {
						$("#myNeighberhoodJobSelectPopup").find("[name='cap']").html(appendCommaToNumber((lvResultData.cap+"").substr(0,(lvResultData.cap+"").lastIndexOf("00000000")))+"억");
					}
					else if(lvResultData.cap != null && lvResultData.cap != "" && (lvResultData.cap+"").lastIndexOf("0000") >= 0) {
						$("#myNeighberhoodJobSelectPopup").find("[name='cap']").html(appendCommaToNumber((lvResultData.cap+"").substr(0,(lvResultData.cap+"").lastIndexOf("0000")))+"만");
					}
					else {
						$("#myNeighberhoodJobSelectPopup").find("[name='cap']").html(lvResultData.cap);
					}
					
					/* 연매출액 */
					if(lvResultData.year_sales != null && lvResultData.year_sales != "" && (lvResultData.year_sales+"").lastIndexOf("00000000") >= 0) {
						$("#myNeighberhoodJobSelectPopup").find("[name='year_sales']").html(appendCommaToNumber((lvResultData.year_sales+"").substr(0,(lvResultData.year_sales+"").lastIndexOf("00000000")))+"억");
					}
					else if(lvResultData.year_sales != null && lvResultData.year_sales != "" && (lvResultData.year_sales+"").lastIndexOf("0000") >= 0) {
						$("#myNeighberhoodJobSelectPopup").find("[name='year_sales']").html(appendCommaToNumber((lvResultData.year_sales+"").substr(0,(lvResultData.year_sales+"").lastIndexOf("0000")))+"만");
					}
					else {
						$("#myNeighberhoodJobSelectPopup").find("[name='year_sales']").html(lvResultData.year_sales);
					}
					
					/* 산업분류명 */
					$("#myNeighberhoodJobSelectPopup").find("[name='indust_class']").html(lvResultData.indust_class_nm);

					/* 주요사업내용 */
					$("#myNeighberhoodJobSelectPopup").find("[name='main_biz_content']").html(lvResultData.main_biz_content);
					
					/* 상세채용 정보확인 */
					//워크넷
					if(lvResultData.jo_data_div == "W") {
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("incruit");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").addClass("worknet");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("saramin"); // 2020-05-07 [곽제욱] 사람인 CASE 추가로 인한 REMOVE 처리
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").attr("jo_data_key", lvResultData.jo_data_key);
					}
					//인쿠르트
					else if(lvResultData.jo_data_div == "I") {
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("worknet");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").addClass("incruit");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("saramin"); // 2020-05-07 [곽제욱] 사람인 CASE 추가로 인한 REMOVE 처리
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").attr("jo_data_key", lvResultData.jo_data_key);
					}
					/** 2020-05-07 [곽제욱] 사람인 CASE 추가 START */
					//사람인
					else if(lvResultData.jo_data_div == "S") {
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("incruit");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("worknet");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").addClass("saramin");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").attr("jo_data_key", lvResultData.jo_data_key);
					}
					/** 2020-05-07 [곽제욱] 사람인 CASE 추가 END */
					else {
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("incruit");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("worknet");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("saramin"); // 2020-05-07 [곽제욱] 사람인 CASE 추가로 인한 REMOVE 처리
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").attr("jo_data_key", "");
					}
					
					/* 관련업종 통계정보 더보기 */
					$("#myNeighberhoodJobSelectPopup_go_stats_anls_map").attr("indust_class", lvResultData.indust_class);
					
					/* 일자리목록 채용공고 상세보기 팝업 화면 불러오기 */
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupToggle(true);
					
					/* 차트 swiper */
					//초기화
					if($myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupChart != null) {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupChart.destroy();
					}
					//차트설정
					Highcharts.setOptions({
						lang: {
					    	thousandsSep: ",",
					    	numericSymbols: ["천", "백만", "십억", "조", "천조", "백경"]
					    }
					});
					//업종별 연령별 평균소득 현황
					// ajax 시작
					$.ajax({
					    url: contextPath + "/m2019/workroad/selectJobStatData.json",
					    type: "post",
					    dataType : "json",
					    data: {
					    	type: "JDS"
					    	,base_year: "2016"
					    	,mode: "3"
					    	,series_cd: lvResultData.indust_class.substr(0,1) //업종
					    	/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
					    	,link_id: "D3503"
					    	,itm_id: "T001"
					    	/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
					    }
					}).done(function (res) { // 완료
						if(res.errCd == "0") {

							var lvParams = res.result.params;
							$("#myNeighberhoodJobSelectPopup_chart_1").highcharts({
							    chart: {
							        type: "column",
							        backgroundColor:"rgba(255, 255, 255, 0.0)",
							        margin: [35, 10, 70, 60]
							    },
							    title: {
							        text: ""
							    },
							    xAxis: {
							    	categories: res.result.categoryes,
							        tickWidth: 0,
							        labels: {
							        	//staggerLines: 2,
							            style: {
							                color: "#D3D3D3"
							            }
							        }
							    },
							    yAxis: {
							    	title: {
							    		text: "만원",
							            align: "high",
							            rotation: 0,
							            offset: 15,
							            y: -10,
							            style: {
							                color: "#D3D3D3"
							            }
							        },
							        labels: {
							            style: {
							                color: "#D3D3D3"
							            }
							        }
							    },
							    legend: {
							        enabled: false
							    },
							    plotOptions: {
							        series: {
							            borderWidth: 0,
							            dataLabels: {
							                enabled: true,
							                allowOverlap: true,
							                color: "#FFFFFF",
							                formatter: function () { return appendCommaToNumber(this.y)+""; },
							                style: {
							                    textShadow: false 
							                }
							            }
							        }
							    },
							    tooltip: {
							        pointFormat: '<span style="font-size:11px">{series.name}</span>: <b>{point.y}만원</b><br/>'
							    },
							    //series: res.result.series
							    series: [{
							    	//2020-02-03 [김남민] 차트 데이터 오류 수정 START
							    	name: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].name : ""
							    	,data: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].data : []
							    	//2020-02-03 [김남민] 차트 데이터 오류 수정 END
							    	,colorByPoint: true
							    }]
							});
						}else if(res.errCd == "-401") {
							//common_alert(res.errMsg);
						}else{
							//common_alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						//common_alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						//common_loading(false);
					});
					// ajax 끝
					
					//업종별 연령별 중위소득 현황
					// ajax 시작
					$.ajax({
					    url: contextPath + "/m2019/workroad/selectJobStatData.json",
					    type: "post",
					    dataType : "json",
					    data: {
					    	type: "JDS"
					    	,base_year: "2016"
					    	,mode: "4"
					    	,series_cd: lvResultData.indust_class.substr(0,1) //업종
					    	/** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 START */
						    ,link_id: "D3503"
						    ,itm_id: "T002"
						    /** 2020.04.28[한광희] 통계데이터 차트 KOSIS DATA로 변경 END */
					    }
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							
							var lvParams = res.result.params;
							$("#myNeighberhoodJobSelectPopup_chart_2").highcharts({
							    chart: {
							        type: "column",
							        backgroundColor:"rgba(255, 255, 255, 0.0)",
							        margin: [35, 10, 70, 60]
							    },
							    title: {
							        text: ""
							    },
							    xAxis: {
							    	categories: res.result.categoryes,
							        tickWidth: 0,
							        labels: {
							        	//staggerLines: 2,
							            style: {
							                color: "#D3D3D3"
							            }
							        }
							    },
							    yAxis: {
							    	title: {
							    		text: "만원",
							            align: "high",
							            rotation: 0,
							            offset: 15,
							            y: -10,
							            style: {
							                color: "#D3D3D3"
							            }
							        },
							        labels: {
							            style: {
							                color: "#D3D3D3"
							            }
							        }
							    },
							    legend: {
							        enabled: false
							    },
							    plotOptions: {
							        series: {
							            borderWidth: 0,
							            dataLabels: {
							                enabled: true,
							                allowOverlap: true,
							                color: "#FFFFFF",
							                formatter: function () { return appendCommaToNumber(this.y)+""; },
							                style: {
							                    textShadow: false 
							                }
							            }
							        }
							    },
							    tooltip: {
							        pointFormat: '<span style="font-size:11px">{series.name}</span>: <b>{point.y}만원</b><br/>'
							    },
							    //series: res.result.series
							    series: [{
							    	//2020-02-03 [김남민] 차트 데이터 오류 수정 START
							    	name: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].name : ""
							    	,data: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].data : []
							    	//2020-02-03 [김남민] 차트 데이터 오류 수정 END
							    	,colorByPoint: true
							    }]
							});
						}else if(res.errCd == "-401") {
							//common_alert(res.errMsg);
						}else{
							//common_alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						//common_alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						//common_loading(false);
					});
					// ajax 끝
					//swiper 세팅
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupChart = new Swiper("#myNeighberhoodJobSelectPopup_chart", {
						//loop: true,
						navigation: {
							nextEl: ".swiper-button-next",
					        prevEl: ".swiper-button-prev"
						},
						pagination: {
							el: ".swiper-pagination",
							clickable: true
						}
					});
					
					$(".swiper-button-prev").click(function(){
						srvLogWrite('M0','09','05','01','업종별 연령별 평균소득 현황',''); // 통계 정보 선택
					});
					
					$(".swiper-button-next").click(function(){
						srvLogWrite('M0','09','05','01','업종별 연령별 중위소득 현황',''); // 통계 정보 선택
					});
					
					/* 생활환경 버튼 파라미터 */
					$("#myNeighberhoodJobSelectPopup_life_environment").attr("sido_cd",lvResultData.sido_cd);
					$("#myNeighberhoodJobSelectPopup_life_environment").attr("sgg_cd",lvResultData.sgg_cd);
					$("#myNeighberhoodJobSelectPopup_life_environment").attr("emdong_cd",lvResultData.emdong_cd);
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
				}else{
					common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				common_loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name : myNeighberhoodJobLifeEnvironmentPopupToggle
		 * @description : 생활환경 팝업 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobLifeEnvironmentPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				$("#myNeighberhoodJobLifeEnvironmentPopup").css("right",$(window).outerWidth(true)+"px");
				$("#myNeighberhoodJobLifeEnvironmentPopup").show().animate({
					right : 0
				},400,function(){
					$("body").children("div.Wrap").children("div.Header").hide(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
					
					//생활환경 상단 리스트 좌우 스크롤
					$("#myNeighberhoodJobLifeEnvironmentPopup_list").touchFlow({
						axis : "x"
					});
					$("#myNeighberhoodJobLifeEnvironmentPopup_list").data("touchFlow").go_page(0);
				});
			}
			//감춤
			else {
				$("body").children("div.Wrap").children("div.Header").show(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
				$("#myNeighberhoodJobLifeEnvironmentPopup").animate({
					right : $(window).outerWidth(true)
				},400,function(){
					$("#myNeighberhoodJobLifeEnvironmentPopup").hide();
				});
			}
		},
		
		/**
		 * @name : myNeighberhoodJobLifeEnvironmentPopupSelect
		 * @description : 생활환경 팝업 조회
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_sido_cd : 시도 코드 
		 * 		p_sgg_cd : 시군구 코드 
		 * 		p_emdong_cd : 읍면동 코드 
		 */
		myNeighberhoodJobLifeEnvironmentPopupSelect : function(p_sido_cd, p_sgg_cd, p_emdong_cd) {
			common_loading(true);
			// ajax 시작
			$.ajax({
			    url: contextPath + "/m2019/workroad/livingEnvironmentSelect.json",
			    type: "post",
			    dataType: "json",
			    data: {
			    	sido_cd : p_sido_cd
			    	,sgg_cd : p_sgg_cd
			    	,emdong_cd : p_emdong_cd
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					/* 팝업 초기화 */
					$("#myNeighberhoodJobLifeEnvironmentPopup_list > ul > li.infoMenu").eq(0).click();
					
					/* 조회결과 */
					//지역정보
					var resultAdmInfo = res.result.resultAdmInfo;
					//종합(전국)
					var lvResultCount0 = res.result.resultCount0;
					var lvResultList0 = res.result.resultList0;
					//종합
					var lvResultCount1 = res.result.resultCount1;
					var lvResultList1 = res.result.resultList1;
					//상세
					var lvResultCount2 = res.result.resultCount2;
					var lvResultList2 = res.result.resultList2;

					/* 타이틀 */
					if(resultAdmInfo != undefined && resultAdmInfo != null) {
						var lvTempSidoNm = "전국";
						var lvTempSggNm = "";
						var lvTempEmdongNm = "";
						if(resultAdmInfo.sido_nm != undefined && resultAdmInfo.sido_nm != null) lvTempSidoNm = resultAdmInfo.sido_nm; 
						if(resultAdmInfo.sgg_nm != undefined && resultAdmInfo.sgg_nm != null) lvTempSggNm = " "+resultAdmInfo.sgg_nm; 
						if(resultAdmInfo.emdong_nm != undefined && resultAdmInfo.emdong_nm != null) lvTempEmdongNm = " "+resultAdmInfo.emdong_nm;
						$("#myNeighberhoodJobLifeEnvironmentPopup_title_1").text(lvTempSidoNm+lvTempSggNm+lvTempEmdongNm);
					}
					
					/* 종합 */
					//차트데이터
					var lvTempCategories = [];
					var lvTempSeries1Name = "전국";
					var lvTempSeries1Data = [];
					var lvTempSeries2Name = $("#myNeighberhoodJobLifeEnvironmentPopup_title_1").text();
					var lvTempSeries2Data = [];
					//전국평균
					var lvTempAllZScore = 0;
					var lvTempAllZScoreCnt = 0;
					if(lvResultCount0 > 0) {
						for(var i = 0; i < lvResultCount0; i++) {
							lvTempAllZScore += lvResultList0[i].z_score * lvResultList0[i].z_score_cnt;
							lvTempAllZScoreCnt += lvResultList0[i].z_score_cnt;
							lvTempCategories.push(lvResultList0[i].b_class_idx_nm);
							lvTempSeries1Data.push(lvResultList0[i].z_score);
						}
					}
					if(lvTempAllZScoreCnt > 0) {
						$("#myNeighberhoodJobLifeEnvironmentPopup_page_0_all_avg").html(""+((new Number(lvTempAllZScore / lvTempAllZScoreCnt).toFixed(2) * 100) / 100));
					}
					else {
						$("#myNeighberhoodJobLifeEnvironmentPopup_page_0_all_avg").html("0");
					}
					//지역명
					$("#myNeighberhoodJobLifeEnvironmentPopup_page_0_this_title").text($("#myNeighberhoodJobLifeEnvironmentPopup_title_1").text());
					//지역평균
					var lvTempThisZScore = 0;
					var lvTempThisZScoreCnt = 0;
					if(lvResultCount1 > 0) {
						for(var i = 0; i < lvResultCount1; i++) {
							lvTempThisZScore += lvResultList1[i].z_score * lvResultList1[i].z_score_cnt;
							lvTempThisZScoreCnt += lvResultList1[i].z_score_cnt;
							lvTempSeries2Data.push(lvResultList1[i].z_score);
						}
					}
					if(lvTempThisZScoreCnt > 0) {
						$("#myNeighberhoodJobLifeEnvironmentPopup_page_0_this_avg").html(""+((new Number(lvTempThisZScore / lvTempThisZScoreCnt).toFixed(2) * 100) / 100));
					}
					else {
						$("#myNeighberhoodJobLifeEnvironmentPopup_page_0_this_avg").html("0");
					}
					//차트 생성
					$("#myNeighberhoodJobLifeEnvironmentPopup_page_0_chart").highcharts({
						chart: {
					        polar: true,
					        type: "line",
					        margin: [0, 50, 0, 50]
					    },
					    colors: ["#a1c1e5", "#f26c5e"],
					    title: {
					        text: ""
					    },
					    xAxis: {
					        categories: lvTempCategories,
					        tickmarkPlacement: "on",
					        lineWidth: 0
					    },
					    yAxis: {
					        gridLineInterpolation: "polygon",
					        lineWidth: 0,
					        min: 0,
					        max: 10,
					        minorTickInterval: 1
					    },
					    tooltip: {
					        shared: true
					    },
					    legend: {
					        enabled: false
					    },
					    series: [{
					        name: lvTempSeries1Name,
					        data: lvTempSeries1Data,
					        pointPlacement: "on",
					        marker: {
					        	symbol: "circle"
					        }
					    }, {
					        name: lvTempSeries2Name,
					        data: lvTempSeries2Data,
					        pointPlacement: "on",
					        marker: {
					        	symbol: "circle"
					        }
					    }]
					});
					
					/* 상세 */
					//초기화
					$("div[id^=myNeighberhoodJobLifeEnvironmentPopup_page_]>ul>li").removeClass().hide();
					//데이터
					if(lvResultCount2 > 0) {
						for(var i = 0; i < lvResultCount2; i++) {
							var lvTempBClassIdxId = lvResultList2[i].b_class_idx_id;
							var lvTempMClassIdxId = lvResultList2[i].m_class_idx_id;
							var lvTempMClassIdxNm = lvResultList2[i].m_class_idx_nm;
							var lvTempZScore = lvResultList2[i].z_score;
							var lvTempDataYn = lvResultList2[i].data_yn;
							var lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_1";
							var lvTempClass = "typeNormal";
							var lvTempText = "없음";
							
							//HML0001 자연.
							if(lvTempBClassIdxId == "HML0001") lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_1";
							//HML0002 주택.
							else if(lvTempBClassIdxId == "HML0002") lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_2";
							//HML0003 지역인구.
							else if(lvTempBClassIdxId == "HML0003") lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_3";
							//HML0004 안전.
							else if(lvTempBClassIdxId == "HML0004") lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_4";
							//HML0005 생활편의 교통.
							else if(lvTempBClassIdxId == "HML0005") lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_5";
							//HML0006 교육.
							else if(lvTempBClassIdxId == "HML0006") lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_6";
							//HML0007 복지 문화.
							else if(lvTempBClassIdxId == "HML0007") lvTempDivId = "myNeighberhoodJobLifeEnvironmentPopup_page_7";
							
							//데이터 없음
							if(lvTempDataYn == "N") {
								lvTempClass = "typeNormal";
								lvTempText = "없음";
							}
							//좋음
							else if(lvTempZScore > 6) {
								lvTempClass = "typeGood";
								if($myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId] != undefined) {
									lvTempText = $myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId].good;
								}
								else {
									lvTempText = "좋음";
								}
							}
							//보통
							else if(lvTempZScore >= 4) {
								lvTempClass = "typeNormal";
								if($myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId] != undefined) {
									lvTempText = $myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId].normal;
								}
								else {
									lvTempText = "보통";
								}
							}
							//나쁨
							else {
								lvTempClass = "typeBad";
								if($myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId] != undefined) {
									lvTempText = $myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId].bad;
								}
								else {
									lvTempText = "나쁨";
								}
							}
							
							//적용
							var lvTempLi = $("#"+lvTempDivId).children("ul").children("li[name='"+lvTempBClassIdxId+"_"+lvTempMClassIdxId+"']");
							lvTempLi.show();
							lvTempLi.addClass(lvTempClass);
							lvTempLi.children("div.itemTitle").html(lvTempMClassIdxNm);
							lvTempLi.children("div.itemStatus").html(lvTempText);
						}
					}
					
					/* 팝업 호출 */
					$myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentPopupToggle(true);
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
				}else{
					common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				common_loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name : myNeighberhoodJobClmserRegistPopup_sido_list
		 * @description : 맞춤형서비스 등록 팝업 시도 목록
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		myNeighberhoodJobClmserRegistPopup_sido_list : function(p_sido_cd) {
			// 기본값(전체)
			$("#myNeighberhoodJobClmserRegistPopup_sido").html("<option value=\"99\" data-x=\"990480.875\" data-y=\"1815839.375\">전국</option>");
			// ajax 시작
			$.ajax({
			    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
			    type: 'get', //api는 get으로 받아야함
			    dataType : 'json',
			    async: false,
			    data: {
			    	accessToken:accessToken,
			    	pg_yn: "0",
			    	bnd_year: bndYear
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvResultList = res.result;
					for(var i = 0; i < lvResultList.length; i++) {
						if(lvResultList[i].cd == p_sido_cd) {
							$("#myNeighberhoodJobClmserRegistPopup_sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
						}
						else {
							$("#myNeighberhoodJobClmserRegistPopup_sido").append("<option value=\""+lvResultList[i].cd+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name : myNeighberhoodJobClmserRegistPopup_sgg_list
		 * @description : 맞춤형서비스 등록 팝업 시군구 목록
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		myNeighberhoodJobClmserRegistPopup_sgg_list : function(p_sido_cd, p_sgg_cd) {
			// 기본값(전체)
			$("#myNeighberhoodJobClmserRegistPopup_sgg").html("<option value=\"999\" data-x=\"990480.875\" data-y=\"1815839.375\">전체</option>");
			// ajax 시작
			$.ajax({
			    url: openApiPath + "/OpenAPI3/addr/stageWR.json",
			    type: 'get', //api는 get으로 받아야함
			    dataType : 'json',
			    async: false,
			    data: {
			    	accessToken: accessToken,
			    	pg_yn: "0",
			    	cd: p_sido_cd,
			    	bnd_year: bndYear
			    }
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvResultList = res.result;
					for(var i = 0; i < lvResultList.length; i++) {
						if(lvResultList[i].cd.slice(-3) == p_sgg_cd) {
							$("#myNeighberhoodJobClmserRegistPopup_sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].addr_name+"</option>");
						}
						else {
							$("#myNeighberhoodJobClmserRegistPopup_sgg").append("<option value=\""+ lvResultList[i].cd.slice(-3)+"\" data-x=\""+lvResultList[i].x_coor+"\" data-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].addr_name+"</option>");
						}
					}
				}else if(res.errCd == "-401") {
					//common_alert(res.errMsg);
				}else{
					//common_alert(res.errMsg);
				}
			}).fail(function (res) { // 실패
				//common_alert(errorMessage);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
		},
		
		/**
		 * @name : myNeighberhoodJobClmserRegistPopupInit
		 * @description : 맞춤형서비스 등록 팝업 초기화
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		myNeighberhoodJobClmserRegistPopupInit : function() {
			/* 일자리맞춤형서비스정보 조회 */
			//변수선언
			var lv_clmser_lc_info_agree_yn = "N";
			var lv_clmser_sido_cd = "";
			var lv_clmser_sgg_cd = "";
			var lv_clmser_entrprs_class_content = "";
			var lv_clmser_jssfc_class_content = "";
			var lv_clmser_salary_class_content = "";
			var lv_clmser_emplym_class_content = "";
			var lv_clmser_acdmcr_class_content = "";
			var lv_clmser_career_class_content = "";
			var lv_clmser_indust_class_content = "";
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/selectSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	member_id: sop.member_id //로그인 ID
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvResultList = res.result.resultList;
						var lvResultCount = res.result.resultCount;
						if(lvResultCount > 0) {
							$("#myNeighberhoodJobClmserGuidance").hide(); //맞춤형서비스 안내 숨김
							lv_clmser_lc_info_agree_yn = lvResultList[0].lc_info_agree_yn;
							lv_clmser_sido_cd = lvResultList[0].sido_cd;
							lv_clmser_sgg_cd = lvResultList[0].sgg_cd;
							lv_clmser_entrprs_class_content = lvResultList[0].entrprs_class_content;
							lv_clmser_jssfc_class_content = lvResultList[0].jssfc_class_content;
							lv_clmser_salary_class_content = lvResultList[0].salary_class_content;
							lv_clmser_emplym_class_content = lvResultList[0].emplym_class_content;
							lv_clmser_acdmcr_class_content = lvResultList[0].acdmcr_class_content;
							lv_clmser_career_class_content = lvResultList[0].career_class_content;
							lv_clmser_indust_class_content = lvResultList[0].indust_class_content;
						}
					}else if(res.errCd == "-401") {
						//common_alert(res.errMsg);
					}else{
						//common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false);
				});
				// ajax 끝
			}
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
			/* 공통코드 조회 */
			if($myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd == null) {
				// ajax 시작
				$.ajax({
					url: contextPath + "/m2019/workroad/selectCmmCdComcdAll.json",
				    type: 'post',
				    dataType: 'json',
				    async: false,
				    data: {"data" : "data"}
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd = res.result;
					}else if(res.errCd == "-401") {
						//common_alert(res.errMsg);
					}else{
						//common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false);
				});
				// ajax 끝
			}
			//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			/* 희망지역 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_sido").html() == "") {
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_sido_cd != null && lv_clmser_sido_cd != "" && lv_clmser_sgg_cd != null && lv_clmser_sgg_cd != "") {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sido_list(lv_clmser_sido_cd);
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sgg_list($("#myNeighberhoodJobClmserRegistPopup_sido").val(), lv_clmser_sgg_cd);
				}
				//전국
				else {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sido_list();
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sgg_list($("#myNeighberhoodJobClmserRegistPopup_sido").val());
				}
			}
			//초기화
			else {
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_sido_cd != null && lv_clmser_sido_cd != "" && lv_clmser_sgg_cd != null && lv_clmser_sgg_cd != "") {
					$("#myNeighberhoodJobClmserRegistPopup_sido").val(lv_clmser_sido_cd);
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sgg_list($("#myNeighberhoodJobClmserRegistPopup_sido").val(), lv_clmser_sgg_cd);
				}
				//전국
				else {
					$("#myNeighberhoodJobClmserRegistPopup_sido").val("99");
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sgg_list($("#myNeighberhoodJobClmserRegistPopup_sido").val());
				}
			}
			
			/* 기업형태 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_company_type").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				$("#myNeighberhoodJobClmserRegistPopup_company_type").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" class=\"all current\" data-value=\"all\">전체</a></li>");
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.ENTTYP;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobClmserRegistPopup_company_type").append("<li><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
				}
				
				//기업형태 선텍 이벤트
				$('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("current");
					
					//체크
					if(!lvThisFlag) {
						lvThis.addClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크
							$('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.addClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 START */
						else {
							//전체 빼고 다 선택된 경우
		                    if($('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').slice(1).length == $('#myNeighberhoodJobClmserRegistPopup_company_type>li:not(:first-child)>a.current').length) {
		                       //전체 체크
		                       $('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').first().addClass("current");
		                    }
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 END */
					}
					//체크해제
					else {
						lvThis.removeClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 START */
						else {
							//전체 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').first().removeClass("current");
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 END */
					}
					
					//선택 건수
					/*var lvThisCount = 0;
					$('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).val() != "all" && $(this).hasClass("current")) {
							lvThisCount++;
						}
					});*/
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_entrprs_class_content != null && lv_clmser_entrprs_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_company_type>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_entrprs_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 초기화
				$("#myNeighberhoodJobClmserRegistPopup_company_type>li>a").each(function() {
					var lvThis = $(this);
					var lvThisDataValue = lvThis.attr("data-value");
					if(lvThisDataValue == "all") {
						lvThis.addClass("current");
					}
					else {
						lvThis.removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_entrprs_class_content != null && lv_clmser_entrprs_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_company_type>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_entrprs_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
			}
			
			/* 직종분류 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_classification").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				$("#myNeighberhoodJobClmserRegistPopup_classification").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" class=\"all current\" data-value=\"all\">전체</a></li>");
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.RCRJSS;
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].nm.length >= 15) {
						$("#myNeighberhoodJobClmserRegistPopup_classification").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
					}
					else {
						$("#myNeighberhoodJobClmserRegistPopup_classification").append("<li><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
					}
				}
				
				//직종분류 선텍 이벤트
				$('#myNeighberhoodJobClmserRegistPopup_classification>li>a').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("current");
					
					//체크
					if(!lvThisFlag) {
						lvThis.addClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크
							$('#myNeighberhoodJobClmserRegistPopup_classification>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.addClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 START */
						else {
							//전체 빼고 다 선택된 경우
		                    if($('#myNeighberhoodJobClmserRegistPopup_classification>li>a').slice(1).length == $('#myNeighberhoodJobClmserRegistPopup_classification>li:not(:first-child)>a.current').length) {
		                       //전체 체크
		                       $('#myNeighberhoodJobClmserRegistPopup_classification>li>a').first().addClass("current");
		                    }
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 END */
					}
					//체크해제
					else {
						lvThis.removeClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_classification>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 START */
						else {
							//전체 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_classification>li>a').first().removeClass("current");
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 END */
					}
					
					//선택 건수
					/*var lvThisCount = 0;
					$('#myNeighberhoodJobClmserRegistPopup_classification>li>a').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).val() != "all" && $(this).hasClass("current")) {
							lvThisCount++;
						}
					});*/
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_jssfc_class_content != null && lv_clmser_jssfc_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_classification>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_jssfc_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 초기화
				$("#myNeighberhoodJobClmserRegistPopup_classification>li>a").each(function() {
					var lvThis = $(this);
					var lvThisDataValue = lvThis.attr("data-value");
					if(lvThisDataValue == "all") {
						lvThis.addClass("current");
					}
					else {
						lvThis.removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_jssfc_class_content != null && lv_clmser_jssfc_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_classification>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_jssfc_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
			}
			
			/* 급여수준 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_salaly").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				$("#myNeighberhoodJobClmserRegistPopup_salaly").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" class=\"all current\" data-value=\"all\">전체</a></li>");
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.WAGETY;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobClmserRegistPopup_salaly").append("<li style=\"width: 100%;\"><p style=\"border: 1px solid #2d68b2;border-radius: 15px;padding: 8px 0;margin: 3px;text-align: center;font-size: 0.9em;\">"+lvResultList[i].nm+"</p></li>");
					var lvResultList2 = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd["WGTY_"+lvResultList[i].cd];
					for(var j = 0; j < lvResultList2.length; j++) {
						$("#myNeighberhoodJobClmserRegistPopup_salaly").append("<li><a href=\"javascript:void(0);\" data-value=\""+"WGTY_"+lvResultList[i].cd+"_"+lvResultList2[j].cd+"\">"+lvResultList2[j].nm+"</a></li>");
					}
				}
				
				//급여수준 선텍 이벤트
				$('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("current");
					
					//체크
					if(!lvThisFlag) {
						lvThis.addClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크
							$('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.addClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 START */
						else {
							//전체 빼고 다 선택된 경우
		                    if($('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').slice(1).length == $('#myNeighberhoodJobClmserRegistPopup_salaly>li:not(:first-child)>a.current').length) {
		                       //전체 체크
		                       $('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').first().addClass("current");
		                    }
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 END */
					}
					//체크해제
					else {
						lvThis.removeClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 START */
						else {
							//전체 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').first().removeClass("current");
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 END */
					}
					
					//선택 건수
					/*var lvThisCount = 0;
					$('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).val() != "all" && $(this).hasClass("current")) {
							lvThisCount++;
						}
					});*/
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_salary_class_content != null && lv_clmser_salary_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_salaly>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_salary_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 초기화
				$("#myNeighberhoodJobClmserRegistPopup_salaly>li>a").each(function() {
					var lvThis = $(this);
					var lvThisDataValue = lvThis.attr("data-value");
					if(lvThisDataValue == "all") {
						lvThis.addClass("current");
					}
					else {
						lvThis.removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_salary_class_content != null && lv_clmser_salary_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_salaly>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_salary_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
			}
			
			/* 고용형태 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_employment_type").html() == "") {
				$("#myNeighberhoodJobClmserRegistPopup_employment_type").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" class=\"all current\" data-value=\"all\">전체</a></li>");
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.EMPTYP;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobClmserRegistPopup_employment_type").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
				}
				
				//고용형태 선텍 이벤트
				$('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("current");
					
					//체크
					if(!lvThisFlag) {
						lvThis.addClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크
							$('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.addClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 START */
						else {
							//전체 빼고 다 선택된 경우
		                    if($('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').slice(1).length == $('#myNeighberhoodJobClmserRegistPopup_employment_type>li:not(:first-child)>a.current').length) {
		                       //전체 체크
		                       $('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').first().addClass("current");
		                    }
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 END */
					}
					//체크해제
					else {
						lvThis.removeClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 START */
						else {
							//전체 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').first().removeClass("current");
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 END */
					}
					
					//선택 건수
					/*var lvThisCount = 0;
					$('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).val() != "all" && $(this).hasClass("current")) {
							lvThisCount++;
						}
					});*/
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_emplym_class_content != null && lv_clmser_emplym_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_employment_type>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_emplym_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 초기화
				$("#myNeighberhoodJobClmserRegistPopup_employment_type>li>a").each(function() {
					var lvThis = $(this);
					var lvThisDataValue = lvThis.attr("data-value");
					if(lvThisDataValue == "all") {
						lvThis.addClass("current");
					}
					else {
						lvThis.removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_emplym_class_content != null && lv_clmser_emplym_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_employment_type>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_emplym_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
			}
			
			/* 학력 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_academic_ability").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				$("#myNeighberhoodJobClmserRegistPopup_academic_ability").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" class=\"all current\" data-value=\"all\">전체</a></li>");
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.ACDMCR;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobClmserRegistPopup_academic_ability").append("<li><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
				}
				
				//학력 선텍 이벤트
				$('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("current");
					
					//체크
					if(!lvThisFlag) {
						lvThis.addClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크
							$('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.addClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 START */
						else {
							//전체 빼고 다 선택된 경우
		                    if($('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').slice(1).length == $('#myNeighberhoodJobClmserRegistPopup_academic_ability>li:not(:first-child)>a.current').length) {
		                       //전체 체크
		                       $('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').first().addClass("current");
		                    }
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 END */
					}
					//체크해제
					else {
						lvThis.removeClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 START */
						else {
							//전체 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').first().removeClass("current");
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 END */
					}
					
					//선택 건수
					/*var lvThisCount = 0;
					$('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).val() != "all" && $(this).hasClass("current")) {
							lvThisCount++;
						}
					});*/
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_acdmcr_class_content != null && lv_clmser_acdmcr_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_acdmcr_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 초기화
				$("#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a").each(function() {
					var lvThis = $(this);
					var lvThisDataValue = lvThis.attr("data-value");
					if(lvThisDataValue == "all") {
						lvThis.addClass("current");
					}
					else {
						lvThis.removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_acdmcr_class_content != null && lv_clmser_acdmcr_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_acdmcr_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
			}
			
			/* 경력 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_career").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				$("#myNeighberhoodJobClmserRegistPopup_career").append("<li><a href=\"javascript:void(0);\" class=\"all current\" data-value=\"all\">전체</a></li>");
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.CAREER;
				for(var i = 0; i < lvResultList.length; i++) {
					$("#myNeighberhoodJobClmserRegistPopup_career").append("<li><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
				}
				
				//경력 선텍 이벤트
				$('#myNeighberhoodJobClmserRegistPopup_career>li>a').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("current");
					
					//체크
					if(!lvThisFlag) {
						lvThis.addClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크
							$('#myNeighberhoodJobClmserRegistPopup_career>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.addClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 START */
						else {
							//전체 빼고 다 선택된 경우
		                    if($('#myNeighberhoodJobClmserRegistPopup_career>li>a').slice(1).length == $('#myNeighberhoodJobClmserRegistPopup_career>li:not(:first-child)>a.current').length) {
		                       //전체 체크
		                       $('#myNeighberhoodJobClmserRegistPopup_career>li>a').first().addClass("current");
		                    }
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 END */
					}
					//체크해제
					else {
						lvThis.removeClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_career>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 START */
						else {
							//전체 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_career>li>a').first().removeClass("current");
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 END */
					}
					
					//선택 건수
					/*var lvThisCount = 0;
					$('#myNeighberhoodJobClmserRegistPopup_career>li>a').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).val() != "all" && $(this).hasClass("current")) {
							lvThisCount++;
						}
					});*/
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_career_class_content != null && lv_clmser_career_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_career>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_career_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 초기화
				$("#myNeighberhoodJobClmserRegistPopup_career>li>a").each(function() {
					var lvThis = $(this);
					var lvThisDataValue = lvThis.attr("data-value");
					if(lvThisDataValue == "all") {
						lvThis.addClass("current");
					}
					else {
						lvThis.removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_career_class_content != null && lv_clmser_career_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_career>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_career_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
			}
			
			/* 산업분류 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobClmserRegistPopup_industry_classification").html() == "") {
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//HTML 추가
				$("#myNeighberhoodJobClmserRegistPopup_industry_classification").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" class=\"all current\" data-value=\"all\">전체</a></li>");
				var lvResultList = $myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitCmmCdComcd.INDCLA;
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].nm.length >= 15) {
						$("#myNeighberhoodJobClmserRegistPopup_industry_classification").append("<li style=\"width: 100%;\"><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
					}
					else {
						$("#myNeighberhoodJobClmserRegistPopup_industry_classification").append("<li><a href=\"javascript:void(0);\" data-value=\""+lvResultList[i].cd+"\">"+lvResultList[i].nm+"</a></li>");
					}
				}
				
				//산업분류 선텍 이벤트
				$('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').click(function(){
					var lvThis = $(this);
					var lvThisValue = lvThis.attr("data-value");
					var lvThisFlag = lvThis.hasClass("current");
					
					//체크
					if(!lvThisFlag) {
						lvThis.addClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크
							$('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.addClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 START */
						else {
							//전체 빼고 다 선택된 경우
		                    if($('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').slice(1).length == $('#myNeighberhoodJobClmserRegistPopup_industry_classification>li:not(:first-child)>a.current').length) {
		                       //전체 체크
		                       $('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').first().addClass("current");
		                    }
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 항목 제외하고 다 선택시 전체 체크 END */
					}
					//체크해제
					else {
						lvThis.removeClass("current");
						//전체 인 경우
						if(lvThisValue == "all") {
							//나머지 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').slice(1).each(function() {
								var lvThis = $(this);
								lvThis.removeClass("current");
							});
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 START */
						else {
							//전체 체크해제
							$('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').first().removeClass("current");
						}
						/** 2019.11.27[한광희] 맞춤형 서비스>전체 선택된 상태에서 항목 체크 해제 시 전체 체크 해제 END */
					}
					
					//선택 건수
					/*var lvThisCount = 0;
					$('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').slice(1).each(function() {
						//다른거 체크된거 있는지 확인
						if($(this).val() != "all" && $(this).hasClass("current")) {
							lvThisCount++;
						}
					});*/
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_indust_class_content != null && lv_clmser_indust_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_indust_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
			}
			//초기화
			else {
				//전체선택 초기화
				$("#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a").each(function() {
					var lvThis = $(this);
					var lvThisDataValue = lvThis.attr("data-value");
					if(lvThisDataValue == "all") {
						lvThis.addClass("current");
					}
					else {
						lvThis.removeClass("current");
					}
				});
				
				//일자리맞춤형서비스정보 적용
				if(lv_clmser_indust_class_content != null && lv_clmser_indust_class_content != "") {
					$("#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a").each(function() {
						var lvThis = $(this);
						var lvThisDataValue = lvThis.attr("data-value");
						if(lv_clmser_indust_class_content.split(",").indexOf(lvThisDataValue) >= 0) {
							lvThis.addClass("current");
						}
					});
				}
			}
			
			//모든화면 숨김
			$("#myNeighberhoodJobClmserRegistPopup>div.infoSettingWrap>div.istContent").hide();
			//첫번째 페이지 표시
			$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPageIndex = 0;
			$("#myNeighberhoodJobClmserRegistPopup_page_0").show();
			//버튼 초기화
			$("#myNeighberhoodJobClmserRegistPopup_cancel").show();
			$("#myNeighberhoodJobClmserRegistPopup_ok").show();
			$("#myNeighberhoodJobClmserRegistPopup_before").hide();
			$("#myNeighberhoodJobClmserRegistPopup_next").hide();
			$("#myNeighberhoodJobClmserRegistPopup_start").hide();
		},
		
		/**
		 * @name : myNeighberhoodJobClmserRegistPopupToggle
		 * @description : 맞춤형서비스 등록 팝업 토글
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobClmserRegistPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				$("#myNeighberhoodJobClmserRegistPopup").css("top",$(window).outerHeight(true)+"px");
				$("#myNeighberhoodJobClmserRegistPopup").show().animate({
					top : 0
				},400,function(){
					//$("body").children("div.Wrap").children("div.Header").hide(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
				});
			}
			//감춤
			else {
				//$("body").children("div.Wrap").children("div.Header").show(); //.Content 하위 객체는 .Header 위에 표시될 수 없음.
				$("#myNeighberhoodJobClmserRegistPopup").animate({
					top : $(window).outerHeight(true)
				},400,function(){
					$("#myNeighberhoodJobClmserRegistPopup").hide();
				});
			}
		},
		
		/**
		 * @name : myNeighberhoodJobClmserRegistPopupPage
		 * @description : 맞춤형서비스 등록 팝업 페이지 이동
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_page : 페이지 번호 
		 * 		p_flag : true/false => 다음/이전
		 */
		myNeighberhoodJobClmserRegistPopupPage : function(p_page, p_flag) {
			//Validation
			//지역선택에서 다음 누른 경우
			if(p_page == 2 && p_flag == true) {
				//시도 필수
				var lv_sido_cd = $("#myNeighberhoodJobClmserRegistPopup_sido").val();
				if(lv_sido_cd == "" || lv_sido_cd == "99" || lv_sido_cd == "00") {
					common_alert("희망지역 시도를 선택해주세요.", function() {
						$("#myNeighberhoodJobClmserRegistPopup_sido").focus();
					});
					return false;
				}
				//시군구 필수 (button 조회만)
				var lv_sgg_cd = $("#myNeighberhoodJobClmserRegistPopup_sgg").val();
				if(lv_sgg_cd == "" || lv_sgg_cd == "999" || lv_sgg_cd == "00") {
					common_alert("희망지역 시군구를 선택해주세요.", function() {
						$("#myNeighberhoodJobClmserRegistPopup_sgg").focus();
					});
					return false;
				}
			}
			
			var lv_left_1 = ((p_flag == true) ? -$(window).outerWidth(true) : $(window).outerWidth(true));
			var lv_left_2 = ((p_flag == true) ? $(window).outerWidth(true) : -$(window).outerWidth(true));
			
			//숨김
			$("#myNeighberhoodJobClmserRegistPopup").animate({
				left : lv_left_1
			},200,function(){
				$("#myNeighberhoodJobClmserRegistPopup").css("left",lv_left_2+"px");
				
				//버튼
				if(p_page == 0) {
					$("#myNeighberhoodJobClmserRegistPopup_cancel").show();
					$("#myNeighberhoodJobClmserRegistPopup_ok").show();
					$("#myNeighberhoodJobClmserRegistPopup_before").hide();
					$("#myNeighberhoodJobClmserRegistPopup_next").hide();
					$("#myNeighberhoodJobClmserRegistPopup_start").hide();
				} else if(p_page == 9) {
					$("#myNeighberhoodJobClmserRegistPopup_cancel").hide();
					$("#myNeighberhoodJobClmserRegistPopup_ok").hide();
					$("#myNeighberhoodJobClmserRegistPopup_before").show();
					$("#myNeighberhoodJobClmserRegistPopup_next").hide();
					$("#myNeighberhoodJobClmserRegistPopup_start").show();
				} else {
					$("#myNeighberhoodJobClmserRegistPopup_cancel").hide();
					$("#myNeighberhoodJobClmserRegistPopup_ok").hide();
					$("#myNeighberhoodJobClmserRegistPopup_before").show();
					$("#myNeighberhoodJobClmserRegistPopup_next").show();
					$("#myNeighberhoodJobClmserRegistPopup_start").hide();
				}
				//모든화면 숨김
				$("#myNeighberhoodJobClmserRegistPopup>div.infoSettingWrap>div.istContent").hide();
				
				//해당 페이지 표시
				$("#myNeighberhoodJobClmserRegistPopup_page_"+p_page).show();
				
				//마지막 페이지 텍스트 처리
				if(p_page == 9) {
//					<div class="istCheTitle">1.희망지역</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_location_text"></div>
					var lv_location_text = "";
					lv_location_text += $("#myNeighberhoodJobClmserRegistPopup_sido option:selected").text();
					lv_location_text += " "+$("#myNeighberhoodJobClmserRegistPopup_sgg option:selected").text();
					$("#myNeighberhoodJobClmserRegistPopup_location_text").text(lv_location_text);
//					<div class="istCheTitle">2.기업형태</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_company_type_text"></div>
					var lv_company_type_text = "";
					var lv_company_type_all_flag = true;
					var lv_company_type_no_flag = true;
					var lv_company_type_count = 0;
					$('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisFlag = lvThis.hasClass("current");
						if(lvThisFlag) {
							if(lv_company_type_text == "") lv_company_type_text += lvThis.text();
							else lv_company_type_text += ","+lvThis.text();
							lv_company_type_count++;
							lv_company_type_no_flag = false;
						}
						else {
							lv_company_type_all_flag = false;
						}
					});
					if(lv_company_type_all_flag == true) $("#myNeighberhoodJobClmserRegistPopup_company_type_text").text("전체");
					else if(lv_company_type_no_flag == true) $("#myNeighberhoodJobClmserRegistPopup_company_type_text").text("선택안함");
					else $("#myNeighberhoodJobClmserRegistPopup_company_type_text").text(lv_company_type_text);
//					<div class="istCheTitle">3.직종분류</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_classification_text"></div>
					var lv_classification_text = "";
					var lv_classification_all_flag = true;
					var lv_classification_no_flag = true;
					var lv_classification_count = 0;
					$('#myNeighberhoodJobClmserRegistPopup_classification>li>a').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisFlag = lvThis.hasClass("current");
						if(lvThisFlag) {
							if(lv_classification_text == "") lv_classification_text += lvThis.text();
							else lv_classification_text += ","+lvThis.text();
							lv_classification_count++;
							lv_classification_no_flag = false;
						}
						else {
							lv_classification_all_flag = false;
						}
					});
					if(lv_classification_all_flag == true) $("#myNeighberhoodJobClmserRegistPopup_classification_text").text("전체");
					else if(lv_classification_no_flag == true) $("#myNeighberhoodJobClmserRegistPopup_classification_text").text("선택안함");
					else $("#myNeighberhoodJobClmserRegistPopup_classification_text").text(lv_classification_text);
//					<div class="istCheTitle">4.급여수준</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_salaly_text"></div>
					var lv_salaly_text = "";
					var lv_salaly_wgty_h_text = "";
					var lv_salaly_wgty_d_text = "";
					var lv_salaly_wgty_m_text = "";
					var lv_salaly_wgty_y_text = "";
					var lv_salaly_all_flag = true;
					var lv_salaly_no_flag = true;
					var lv_salaly_count = 0;
					$('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisValue = ""+lvThis.attr("data-value");
						var lvThisFlag = lvThis.hasClass("current");
						if(lvThisFlag) {
							if(lvThisValue.indexOf("WGTY_H")) {
								if(lv_salaly_text == "") lv_salaly_wgty_h_text += lvThis.text();
								else lv_salaly_wgty_h_text += ","+lvThis.text();
							}
							else if(lvThisValue.indexOf("WGTY_D")) {
								if(lv_salaly_text == "") lv_salaly_wgty_d_text += lvThis.text();
								else lv_salaly_wgty_d_text += ","+lvThis.text();
							}
							else if(lvThisValue.indexOf("WGTY_M")) {
								if(lv_salaly_text == "") lv_salaly_wgty_m_text += lvThis.text();
								else lv_salaly_wgty_m_text += ","+lvThis.text();
							}
							else if(lvThisValue.indexOf("WGTY_Y")) {
								if(lv_salaly_text == "") lv_salaly_wgty_y_text += lvThis.text();
								else lv_salaly_wgty_y_text += ","+lvThis.text();
							}
							lv_salaly_count++;
							lv_salaly_no_flag = false;
						}
						else {
							lv_salaly_all_flag = false;
						}
					});
					if(lv_salaly_wgty_h_text != "") {
						lv_salaly_text += "시급 : "+lv_salaly_wgty_h_text;
					}
					if(lv_salaly_wgty_d_text != "") {
						if(lv_salaly_text != "") lv_salaly_text += ";";
						lv_salaly_text += "일급 : "+lv_salaly_wgty_d_text;
					}
					if(lv_salaly_wgty_m_text != "") {
						if(lv_salaly_text != "") lv_salaly_text += ";";
						lv_salaly_text += "월급 : "+lv_salaly_wgty_m_text;
					}
					if(lv_salaly_wgty_y_text != "") {
						if(lv_salaly_text != "") lv_salaly_text += ";";
						lv_salaly_text += "연봉 : "+lv_salaly_wgty_y_text;
					}
					if(lv_salaly_all_flag == true) $("#myNeighberhoodJobClmserRegistPopup_salaly_text").text("전체");
					else if(lv_salaly_no_flag == true) $("#myNeighberhoodJobClmserRegistPopup_salaly_text").text("선택안함");
					else $("#myNeighberhoodJobClmserRegistPopup_salaly_text").text(lv_salaly_text);
//					<div class="istCheTitle">5.고용형태</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_employment_type_text"></div>
					var lv_employment_type_text = "";
					var lv_employment_type_all_flag = true;
					var lv_employment_no_flag = true;
					var lv_employment_type_count = 0;
					$('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisFlag = lvThis.hasClass("current");
						if(lvThisFlag) {
							if(lv_employment_type_text == "") lv_employment_type_text += lvThis.text();
							else lv_employment_type_text += ","+lvThis.text();
							lv_employment_type_count++;
							lv_employment_no_flag = false;
						}
						else {
							lv_employment_all_flag = false;
						}
					});
					if(lv_employment_type_all_flag == true) $("#myNeighberhoodJobClmserRegistPopup_employment_type_text").text("전체");
					else if(lv_employment_type_no_flag == true) $("#myNeighberhoodJobClmserRegistPopup_employment_type_text").text("선택안함");
					else $("#myNeighberhoodJobClmserRegistPopup_employment_type_text").text(lv_employment_type_text);
//					<div class="istCheTitle">6.학력</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_academic_ability_text"></div>
					var lv_academic_ability_text = "";
					var lv_academic_ability_all_flag = true;
					var lv_academic_ability_no_flag = true;
					var lv_academic_ability_count = 0;
					$('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisFlag = lvThis.hasClass("current");
						if(lvThisFlag) {
							if(lv_academic_ability_text == "") lv_academic_ability_text += lvThis.text();
							else lv_academic_ability_text += ","+lvThis.text();
							lv_academic_ability_count++;
							lv_academic_ability_no_flag = false;
						}
						else {
							lv_academic_ability_all_flag = false;
						}
					});
					if(lv_academic_ability_all_flag == true) $("#myNeighberhoodJobClmserRegistPopup_academic_ability_text").text("전체");
					else if(lv_academic_ability_no_flag == true) $("#myNeighberhoodJobClmserRegistPopup_academic_ability_text").text("선택안함");
					else $("#myNeighberhoodJobClmserRegistPopup_academic_ability_text").text(lv_academic_ability_text);
//					<div class="istCheTitle">7.경력</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_career_text"></div>
					var lv_career_text = "";
					var lv_career_all_flag = true;
					var lv_career_no_flag = true;
					var lv_career_count = 0;
					$('#myNeighberhoodJobClmserRegistPopup_career>li>a').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisFlag = lvThis.hasClass("current");
						if(lvThisFlag) {
							if(lv_career_text == "") lv_career_text += lvThis.text();
							else lv_career_text += ","+lvThis.text();
							lv_career_count++;
							lv_career_no_flag = false;
						}
						else {
							lv_career_all_flag = false;
						}
					});
					if(lv_career_all_flag == true) $("#myNeighberhoodJobClmserRegistPopup_career_text").text("전체");
					else if(lv_career_no_flag == true) $("#myNeighberhoodJobClmserRegistPopup_career_text").text("선택안함");
					else $("#myNeighberhoodJobClmserRegistPopup_career_text").text(lv_career_text);
//					<div class="istCheTitle">8.산업분류</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_industry_classification_text"></div>
					var lv_industry_classification_text = "";
					var lv_industry_classification_all_flag = true;
					var lv_industry_classification_no_flag = true;
					var lv_industry_classification_count = 0;
					$('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').slice(1).each(function() {
						var lvThis = $(this);
						var lvThisFlag = lvThis.hasClass("current");
						if(lvThisFlag) {
							if(lv_industry_classification_text == "") lv_industry_classification_text += lvThis.text();
							else lv_industry_classification_text += ","+lvThis.text();
							lv_industry_classification_count++;
							lv_industry_classification_no_flag = false;
						}
						else {
							lv_industry_classification_all_flag = false;
						}
					});
					if(lv_industry_classification_all_flag == true) $("#myNeighberhoodJobClmserRegistPopup_industry_classification_text").text("전체");
					else if(lv_industry_classification_no_flag == true) $("#myNeighberhoodJobClmserRegistPopup_industry_classification_text").text("선택안함");
					else $("#myNeighberhoodJobClmserRegistPopup_industry_classification_text").text(lv_industry_classification_text);
				}
				
				//표시
				$("#myNeighberhoodJobClmserRegistPopup").animate({
					left : 0
				},200,function(){
					
				});
			});
		},
		
		/**
		 * @name : myNeighberhoodJobClmserRegistPopupSave
		 * @description : 맞춤형서비스 등록 팝업 저장
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobClmserRegistPopupSave : function() {
			if(!sop.isLogin) { //로그인 체크
				common_alert("로그인 여부를 확인해주세요.");
				return false;
			}
			
			var lvParams = {};
			lvParams.member_id = sop.member_id; // 아이디
//					<div class="istCheTitle">1.희망지역</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_location_text"></div>
			lvParams.sido_cd = $("#myNeighberhoodJobClmserRegistPopup_sido").val();
			lvParams.sgg_cd = $("#myNeighberhoodJobClmserRegistPopup_sgg").val();
//					<div class="istCheTitle">2.기업형태</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_company_type_text"></div>
			var lv_company_type = "";
			$('#myNeighberhoodJobClmserRegistPopup_company_type>li>a').slice(1).each(function() {
				var lvThis = $(this);
				var lvThisValue = lvThis.attr("data-value");
				if(lvThis.hasClass("current")) {
					if(lv_company_type == "") lv_company_type += lvThisValue;
					else lv_company_type += ","+lvThisValue;
				}
			});
			lvParams.entrprs_class_content = lv_company_type;
//					<div class="istCheTitle">3.직종분류</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_classification_text"></div>
			var lv_classification = "";
			$('#myNeighberhoodJobClmserRegistPopup_classification>li>a').slice(1).each(function() {
				var lvThis = $(this);
				var lvThisValue = lvThis.attr("data-value");
				if(lvThis.hasClass("current")) {
					if(lv_classification == "") lv_classification += lvThisValue;
					else lv_classification += ","+lvThisValue;
				}
			});
			lvParams.jssfc_class_content = lv_classification;
//					<div class="istCheTitle">4.급여수준</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_salaly_text"></div>
			var lv_salaly = "";
			$('#myNeighberhoodJobClmserRegistPopup_salaly>li>a').slice(1).each(function() {
				var lvThis = $(this);
				var lvThisValue = lvThis.attr("data-value");
				if(lvThis.hasClass("current")) {
					if(lv_salaly == "") lv_salaly += lvThisValue;
					else lv_salaly += ","+lvThisValue;
				}
			});
			lvParams.salary_class_content = lv_salaly;
//					<div class="istCheTitle">5.고용형태</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_employment_type_text"></div>
			var lv_employment_type = "";
			$('#myNeighberhoodJobClmserRegistPopup_employment_type>li>a').slice(1).each(function() {
				var lvThis = $(this);
				var lvThisValue = lvThis.attr("data-value");
				if(lvThis.hasClass("current")) {
					if(lv_employment_type == "") lv_employment_type += lvThisValue;
					else lv_employment_type += ","+lvThisValue;
				}
			});
			lvParams.emplym_class_content = lv_employment_type;
//					<div class="istCheTitle">6.학력</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_academic_ability_text"></div>
			var lv_academic_ability = "";
			$('#myNeighberhoodJobClmserRegistPopup_academic_ability>li>a').slice(1).each(function() {
				var lvThis = $(this);
				var lvThisValue = lvThis.attr("data-value");
				if(lvThis.hasClass("current")) {
					if(lv_academic_ability == "") lv_academic_ability += lvThisValue;
					else lv_academic_ability += ","+lvThisValue;
				}
			});
			lvParams.acdmcr_class_content = lv_academic_ability;
//					<div class="istCheTitle">7.경력</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_career_text"></div>
			var lv_career = "";
			$('#myNeighberhoodJobClmserRegistPopup_career>li>a').slice(1).each(function() {
				var lvThis = $(this);
				var lvThisValue = lvThis.attr("data-value");
				if(lvThis.hasClass("current")) {
					if(lv_career == "") lv_career += lvThisValue;
					else lv_career += ","+lvThisValue;
				}
			});
			lvParams.career_class_content = lv_career;
//					<div class="istCheTitle">8.산업분류</div>
//					<div class="istChecContent" id="myNeighberhoodJobClmserRegistPopup_industry_classification_text"></div>
			var lv_industry_classification = "";
			$('#myNeighberhoodJobClmserRegistPopup_industry_classification>li>a').slice(1).each(function() {
				var lvThis = $(this);
				var lvThisValue = lvThis.attr("data-value");
				if(lvThis.hasClass("current")) {
					if(lv_industry_classification == "") lv_industry_classification += lvThisValue;
					else lv_industry_classification += ","+lvThisValue;
				}
			});
			lvParams.indust_class_content = lv_industry_classification;
			
			// 로딩바
			common_loading(true);
			// ajax 시작
			$.ajax({
			    url: contextPath + "/m2019/workroad/mergeSrvDtJobClmserInfo.json",
			    type: 'post',
			    dataType : 'json',
			    data: lvParams
			}).done(function (res) { // 완료
				if(res.errCd == "0") {
					var lvParams = res.result.params;
					//일자리 찾기 팝업 초기화
					//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
					//$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInit();
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($("#myNeighberhoodJobClmserRegistPopup_sido").val());
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($("#myNeighberhoodJobClmserRegistPopup_sido").val(), $("#myNeighberhoodJobClmserRegistPopup_sgg").val());
					//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
					//일자리 찾기 조회
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("button");
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
					common_loading(false);
				}else{
					common_alert(res.errMsg);
					common_loading(false);
				}
			}).fail(function (res) { // 실패
				common_alert(errorMessage);
				common_loading(false);
			}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
				//common_loading(false);
			});
			// ajax 끝
			return true;
		}
	};
	
	// 지도 콜백 함수 선언
	$myNeighberhoodJobMap.callbackFunc = {
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
			//console.log("didMapMoveEnd - START");
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
		}
	};

	$myNeighberhoodJobMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 */
		setUIEvent : function() {
			// 윈도우 크기 변경시 윈도우 맞춤.
			$(window).resize(function() {
				setTimeout(function() {
					$myNeighberhoodJobMap.event.setMapSize();
				}, 100);
			});
			
			// 윈도우 가로세로 모드 변경시 윈도우 맞춤.
			$(window).on("orientationchange", function() {
				setTimeout(function() {
					$myNeighberhoodJobMap.event.setMapSize();
				}, 100);
			});
			
			//오늘의 전체 일자리현황 팝업 닫기 버튼
			$(document).on("click", "#myNeighberhoodJobTodayStatusPopup_close", function() {
				//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 START
				//오늘 하루 다시 보지 않기 저장
				if($("#myNeighberhoodJobTodayStatusPopup_check").prop("checked")) {
					common_set_cookie("myNeighberhoodJobTodayStatusPopup_no_today_yn","Y",1);
				}
				else {
					common_remove_cookie("myNeighberhoodJobTodayStatusPopup_no_today_yn");
				}
				//2019-12-26 [김남민] 모바일 > 일자리 맵 > 모바일 홈페이지 [오늘 하루 다시 보지 않기] 추가 END
				
				//오늘의 전체 일자리현황 팝업 닫음
				$myNeighberhoodJobMap.ui.myNeighberhoodJobTodayStatusPopupToggle(false);
				
				//시도코드 시군구코드 확인
				if($myNeighberhoodJobMap.ui.my_sido_cd != null && $myNeighberhoodJobMap.ui.my_sido_cd != "" && $myNeighberhoodJobMap.ui.my_sgg_cd != null && $myNeighberhoodJobMap.ui.my_sgg_cd != "") {
					//시도코드 세팅
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
					//시군구코드 세팅
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($myNeighberhoodJobMap.ui.my_sido_cd, $myNeighberhoodJobMap.ui.my_sgg_cd);
					//내 주변 일자리 조회
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("button");
				}
			});
			
			//오늘의 전체 일자리현황 상세현황보기 버튼
			$(document).on("click", "#myNeighberhoodJobTodayStatusPopup_ok", function() {
				location.href = contextPath+"/m2019/workroad/todayStatusMap.sgis";
			});
			
			//현재위치로 이동 버튼
			$(document).on("click", "#myNeighberhoodJobMyLocation", function() {

				//지도 현재위치로 이동
				$myNeighberhoodJobMap.ui.map.moveCurrentLocation(true, function() {
					//맵의 중앙 adm_cd 가져오기
					$myNeighberhoodJobMap.ui.map.getCenterToAdmCd(null, function(res) { 
						var lv_my_center = $myNeighberhoodJobMap.ui.map.gMap.getCenter();
						$myNeighberhoodJobMap.ui.my_x = lv_my_center.x;
						$myNeighberhoodJobMap.ui.my_y = lv_my_center.y;
						$myNeighberhoodJobMap.ui.my_sido_cd = res.result.sido_cd;
						$myNeighberhoodJobMap.ui.my_sido_nm = res.result.sido_nm;
						$myNeighberhoodJobMap.ui.my_sgg_cd = res.result.sgg_cd;
						$myNeighberhoodJobMap.ui.my_sgg_nm = res.result.sgg_nm;
						$myNeighberhoodJobMap.ui.my_emdong_cd = res.result.emdong_cd;
						$myNeighberhoodJobMap.ui.my_emdong_nm = res.result.emdong_nm;
						
						//내 위치 텍스트
						$("#myNeighberhoodJobMyLocation_name").text($myNeighberhoodJobMap.ui.my_sido_nm+" "+$myNeighberhoodJobMap.ui.my_sgg_nm);
						
						srvLogWrite('M0','09','02','00','',$myNeighberhoodJobMap.ui.my_sido_nm+" "+$myNeighberhoodJobMap.ui.my_sgg_nm); // 내 위치로 이동
						
						//일자리 찾기
						$myNeighberhoodJobMap.ui.my_location_yn = "Y";
						//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
						if($("#myNeighberhoodJobSearchPopup_sido").html() == "") {
							$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(res.result.sido_cd);
						}
						else {
							$("#myNeighberhoodJobSearchPopup_sido").val(res.result.sido_cd);
						}
						//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list(res.result.sido_cd, res.result.sgg_cd);
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("button");
					});
				});
			});
			
			//일자리 목록 위아래 스와이프 펼치기/접기.
			$("#myNeighberhoodJobList").swipe({
				threshold : 10,
				//펼치기
				swipeUp:function(event, direction) {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSubYn = "Y";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobListSubYn,300);
				},
				//접기
				swipeDown:function(event, direction) {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSubYn = "N";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobListSubYn,300);
				},
				//클릭
				tap:function(event, target) {
					var lvThis = $(target);
					var lvThisLi = lvThis.closest("li");
					var lvThisJoNo = lvThisLi.attr("jo_no");
					if(lvThisJoNo != undefined && lvThisJoNo != null && lvThisJoNo != "") {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupSelect(lvThisJoNo);
					}
				}
			});
			
			//일자리 찾기 버튼
			$(document).on("click", "#myNeighberhoodJobSearch, #myNeighberhoodJobSearch2", function() {
				srvLogWrite('M0','09','06','01','',''); // 일자리 찾기
				
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitYn == "N") {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInit();
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitYn = "Y";
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupToggle(true);
			});
			
			//일자리 찾기 팝업 닫기 버튼
			$(document).on("click", "#myNeighberhoodJobSearchPopup_close", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupToggle(false);
			});
			
			//일자리 찾기 팝업 초기화 버튼
			$(document).on("click", "#myNeighberhoodJobSearchPopup_reset", function() {
				srvLogWrite('M0','09','06','02','',''); // 초기화

				//초기화
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInit();
				//초기화 후 처리
				//없음
			});
			
			//일자리 찾기 팝업 검색 버튼
			$(document).on("click", "#myNeighberhoodJobSearchPopup_search", function() {

				var lv_sido_nm = $("#myNeighberhoodJobSearchPopup_sido option:selected").text();
				var lv_sgg_nm  = $("#myNeighberhoodJobSearchPopup_sgg option:selected").text();
				srvLogWrite('M0','09','06','03',lv_sido_nm+' '+lv_sgg_nm,''); // 검색하기

				//일자리 찾기 조회
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("button")) {
					//일자리 찾기 닫기
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupToggle(false);
				}
			});
			
			//일자리 찾기 팝업 시도 변경시 시군구 불러오기
			$(document).on("change", "#myNeighberhoodJobSearchPopup_sido", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list($(this).val());
			});
			
			//일자리목록 전체보기 버튼
			$(document).on("click", "#myNeighberhoodJobListPopup_open", function() {
				srvLogWrite('M0','09','04','00','전체보기',''); // 채용공고 목록보기(전체보기)
				$myNeighberhoodJobMap.ui.myNeighberhoodJobListPopupToggle(true);
			});
			
			//일자리목록 전체보기 지도보기 버튼
			$(document).on("click", "#myNeighberhoodJobListPopup_close", function() {
				srvLogWrite('M0','09','04','00','지도보기',''); // 채용공고 목록보기(지도보기)

				$myNeighberhoodJobMap.ui.myNeighberhoodJobListPopupToggle(false);
			});
			
			//2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. START
			//일자리목록 전체보기 리스트 버튼
			/*$(document).on("click", "#myNeighberhoodJobListPopup_list_type ul li", function() {
				var lvThis = $(this);
				//초기화
				$("#myNeighberhoodJobListPopup_list_type ul li").each(function() {
					var lvThis2 = $(this);
					if(lvThis2.hasClass("listOn")) {
						lvThis2.removeClass("listOn");
						lvThis2.addClass("listOff");
					}
					else if(lvThis2.hasClass("cardOn")) {
						lvThis2.removeClass("cardOn");
						lvThis2.addClass("cardOff");
					}
				});
				
				//선택 처리
				if(lvThis.hasClass("listOff")) {
					lvThis.removeClass("listOff");
					lvThis.addClass("listOn");
					srvLogWrite('M0','09','04','00','listOn',''); // 채용공고 목록보기(정렬방식-listOn)
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn = "N";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn,0);
				}
				else if(lvThis.hasClass("cardOff")) {
					lvThis.removeClass("cardOff");
					lvThis.addClass("cardOn");
					srvLogWrite('M0','09','04','00','cardOn',''); // 채용공고 목록보기(정렬방식-cardOn)
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn = "Y";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn,0);
				}
			});*/
			//2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. END
			
			//2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. START
			//일자리목록 전체보기 라디오 버튼
			$(document).on("change", "#myNeighberhoodJobListPopup_list_type input[name='myNeighberhoodJobListPopup_list_type_radio']", function() {
				var lvValue = $("#myNeighberhoodJobListPopup_list_type input[name='myNeighberhoodJobListPopup_list_type_radio']:checked").val();
				
				//선택 처리
				if(lvValue == "list") {
					srvLogWrite('M0','09','04','00','listOn',''); // 채용공고 목록보기(정렬방식-listOn)
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn = "N";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn,0);
				}
				else if(lvValue == "card") {
					srvLogWrite('M0','09','04','00','cardOn',''); // 채용공고 목록보기(정렬방식-cardOn)
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn = "Y";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn,0);
				}
			});
			//2019-10-01 [김남민] 모바일 > 채용공고 전체 보기 화면 수정. END
			
			//일자리목록 전체보기 조회정렬 변경
			$(document).on("change", "#myNeighberhoodJobListSort", function() {				
				var slwDet = $("#myNeighberhoodJobListSort").val();
				if(slwDet == "DISTANCE") slwDet = "거리순";
				else if(slwDet == "DISTANCE_DESC") slwDet = "거리역순";
				else if(slwDet == "REG_DT"       ) slwDet = "등록순";
				else if(slwDet == "REG_DT_DESC"  ) slwDet = "등록역순";
				else if(slwDet == "CLOS_DT"      ) slwDet = "마감순";
				else if(slwDet == "CLOS_DT_DESC" ) slwDet = "마감역순";
				else if(slwDet == "SALARY"       ) slwDet = "급여순";
				else if(slwDet == "SALARY_DESC"  ) slwDet = "급여역순";
				srvLogWrite('M0','09','04','00',slwDet,''); // 채용공고 목록보기(정렬방식)
				$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect($myNeighberhoodJobMap.ui.myNeighberhoodJobGubun);
			});
			
			//일자리목록 전체보기 목록 선택
			$(document).on("click", "#myNeighberhoodJobList2>ul>li", function() {
				var lvThis = $(this);
				var lvThisJoNo = lvThis.attr("jo_no");
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupSelect(lvThisJoNo);
				//$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupToggle(true);
			});
			
			//일자리목록 전체보기 목록 스크롤
			$("#myNeighberhoodJobList2").on("scroll", function() {
				//스크롤값 가져오기
				var lv_scroll_top = $myNeighberhoodJobMap.ui.myNeighberhoodJobList2.scrollTop(),
					lv_scroll_height = $myNeighberhoodJobMap.ui.myNeighberhoodJobList2.prop("scrollHeight"),
					lv_outer_height = $myNeighberhoodJobMap.ui.myNeighberhoodJobList2.outerHeight();
				
				//페이징+1 처리
				if((lv_outer_height * 2) > (lv_scroll_height - lv_scroll_top)) {
                    $myNeighberhoodJobMap.ui.myNeighberhoodJobList2Paging($myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingIndex+1);
				}
				//페이징-1 처리
				else if(lv_outer_height > lv_scroll_top) {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2Paging($myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingIndex-1);
				}
			});
			
			//일자리목록 채용공고 상세보기 닫기
			$(document).on("click", "#myNeighberhoodJobSelectPopup_close", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupToggle(false);
			});
			
			//일자리목록 채용공고 상세보기 상세채용정보확인
			$(document).on("click", "#myNeighberhoodJobSelectPopup div[name='go_site']", function() {
				var lvThis = $(this);
				var lvThisJoDataKey = lvThis.attr("jo_data_key");
				
				srvLogWrite('M0','09','05','02',lvThisJoDataKey,''); // 채용상세정보확인


				// 워크넷
				if(lvThis.hasClass("worknet")) {
					window.open("https://m.work.go.kr/regionJobsWorknet/jobDetailView.do?srchInfotypeNm=VALIDATION&srchWantedAuthNo="+lvThisJoDataKey);
				}
				// 인쿠르트
				else if(lvThis.hasClass("incruit")) {
					window.open("http://m.incruit.com/jobdb_info/jobpost.asp?job="+lvThisJoDataKey);
				}
				/** 2020-05-06 [곽제욱] 사람인 공고 상세보기 추가 START */
				else if(lvThis.hasClass("saramin")) {
					window.open("http://m.saramin.co.kr/job-search/view?rec_idx="+lvThisJoDataKey);
				}
				/** 2020-05-06 [곽제욱] 사람인 공고 상세보기 추가 END */
			});
			
			//일자리목록 채용공고 상세보기 > 관련업종 통계정보 더보기
			$(document).on("click", "#myNeighberhoodJobSelectPopup_go_stats_anls_map", function() {
				var lvThis = $(this);
				var lvThisIndustClass = lvThis.attr("indust_class");
				srvLogWrite('M0','09','05','03',"업종코드:"+lvThisIndustClass,''); // 관련업종 통계정보 더 보기
				
				if(lvThisIndustClass != undefined && lvThisIndustClass != null && lvThisIndustClass != "") {
					location.href = contextPath+"/m2019/workroad/statsAnlsMap.sgis?type_of_industry="+lvThisIndustClass.substr(0,1)+"&type_of_industry_middle_classification="+lvThisIndustClass.substr(0,3);
				}
			});
			
			//맞춤형서비스 안내 닫기
			$(document).on("click", "#myNeighberhoodJobClmserGuidance_close", function() {
				$("#myNeighberhoodJobClmserGuidance").hide();
			});
			
			//생환환경 정보 토글
			$(document).on("click", "#myNeighberhoodJobLifeEnvironmentToggle", function() {
				var lvThis = $(this);
				//펼치기
				if(lvThis.hasClass("infoOff")) {
					lvThis.removeClass("infoOff");
					lvThis.addClass("infoOn");
					$("#myNeighberhoodJobLifeEnvironment").slideDown(300);
					
					srvLogWrite('M0','09','03','00','on',''); // 생활환경 보기(on)
				}
				//접기
				else {
					lvThis.removeClass("infoOn");
					lvThis.addClass("infoOff");
					$("#myNeighberhoodJobLifeEnvironment").slideUp(300);
					
					srvLogWrite('M0','09','03','00','off',''); // 생활환경 보기(off)
				}
			});
			
			//생활환경 정보 더보기
			$(document).on("click", "#myNeighberhoodJobLifeEnvironmentPopup_open, #myNeighberhoodJobSelectPopup_life_environment", function() {
				srvLogWrite('M0','09','03','00','더보기',''); // 생활환경 보기(더보기)

				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				var lvEmdongCd = lvThis.attr("emdong_cd");
				if(lvSidoCd == "null") lvSidoCd = "";
				if(lvSggCd == "null") lvSggCd = "";
				if(lvEmdongCd == "null") lvEmdongCd = "";
				if(lvSidoCd != undefined && lvSidoCd != null && lvSidoCd != "" && lvSidoCd != "99") {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentPopupSelect(lvSidoCd, lvSggCd, lvEmdongCd);
				}
			});
			
			//생활환경 팝업 닫기
			$(document).on("click", "#myNeighberhoodJobLifeEnvironmentPopup_close", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentPopupToggle(false);
			});
			
			//생활환경 팝업 구분 선택
			$(document).on("click", "#myNeighberhoodJobLifeEnvironmentPopup_list > ul > li.infoMenu", function() {
				var lvThis = $(this);
				var lvThisIndex = lvThis.data("index");
				var lvThisText = lvThis.children("a").text();
				
				//메뉴 선택
				$("#myNeighberhoodJobLifeEnvironmentPopup_list > ul > li.infoMenu").removeClass("on");
				lvThis.addClass("on");
				
				//화면 표시
				$("#myNeighberhoodJobLifeEnvironmentPopup div.infoPage").hide();
				$("#myNeighberhoodJobLifeEnvironmentPopup_page_"+lvThisIndex).show();
				//$("#myNeighberhoodJobLifeEnvironmentPopup_title_2").text(lvThisText);
			});
			
			//맞춤형서비스 등록 팝업 닫기
			$(document).on("click", "#myNeighberhoodJobClmserRegistPopup_close", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupToggle(false);
			});
			
			//맞춤형서비스 등록 팝업 취소
			$(document).on("click", "#myNeighberhoodJobClmserRegistPopup_cancel", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupToggle(false);
			});
			
			//맞춤형서비스 등록 팝업 등록
			$(document).on("click", "#myNeighberhoodJobClmserRegistPopup_ok", function() {
				srvLogWrite('M0','12','04','00','등록',''); // 맞춤형 채용공고 서비스 설정

				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPageIndex = 1;
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPage(1, true);
			});
			
			//맞춤형서비스 등록 팝업 이전
			$(document).on("click", "#myNeighberhoodJobClmserRegistPopup_before", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPageIndex--;
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPage($myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPageIndex, false);
			});
			
			//맞춤형서비스 등록 팝업 다음
			$(document).on("click", "#myNeighberhoodJobClmserRegistPopup_next", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPageIndex++;
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPage($myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPageIndex, true) == false) {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupPageIndex--;
				}
			});
			
			//맞춤형서비스 등록 팝업 맞춤형서비스 시작하기
			$(document).on("click", "#myNeighberhoodJobClmserRegistPopup_start", function() {
				srvLogWrite('M0','12','04','00','검색',''); // 맞춤형 채용공고 서비스 설정

				//저장
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupSave()) {
					//닫기
					$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopupToggle(false);
				}
			});
			
			//맞춤형서비스 등록 팝업 현위치로 지역설정
			$(document).on("click", "#myNeighberhoodJobClmserRegistPopup_my_location", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sido_list($myNeighberhoodJobMap.ui.my_sido_cd);
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sgg_list($("#myNeighberhoodJobClmserRegistPopup_sido").val(), $myNeighberhoodJobMap.ui.my_sgg_cd);
			});
			
			//맞춤형서비스 등록 팝업 시도 변경시 시군구 불러오기
			$(document).on("change", "#myNeighberhoodJobClmserRegistPopup_sido", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobClmserRegistPopup_sgg_list($(this).val());
			});
			
			
		},
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($("body > div.Wrap > div.Header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}
	};
	
	/*********** 일자리 목록 조회 시작 **********/
	(function() {
		$class("sop.openApi.workroad.myNeighberhoodJobMap.myNeighberhoodJobList").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				//console.time("calculatingTime");
				common_loading(false);
				if(res.errCd == "0") {
					var lvParams = res.result.params;
					var lvResultCount = res.result.resultCount;
					var lvResultList = res.result.resultList;
					var lvGubun = lvParams.gubun;
					
					/* 리스트 변수 세팅 */
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList = lvResultList;
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListCount = lvResultCount;
					
					/* 리스트 구분 */
					var lvMyNeighberhoodJobListGubun = lvParams.list_gubun;
					if(lvMyNeighberhoodJobListGubun == "1") {
						$("#myNeighberhoodJobListGubun").html("내 주변 채용공고");
						$("#myNeighberhoodJobList2Gubun").html("내 주변 채용공고");
					}
					else if(lvMyNeighberhoodJobListGubun == "2") {
						$("#myNeighberhoodJobListGubun").html("맞춤 채용공고");
						$("#myNeighberhoodJobList2Gubun").html("맞춤 채용공고");
					}
					else if(lvMyNeighberhoodJobListGubun == "3") {
						$("#myNeighberhoodJobListGubun").html("마감임박 채용공고");
						$("#myNeighberhoodJobList2Gubun").html("마감임박 채용공고");
					}
					/* 리스트 건수 */
					$("#myNeighberhoodJobListCount").html(lvResultCount);
					$("#myNeighberhoodJobList2Count").html(lvResultCount);
					/* 리스트 목록 */
					var lvMyNeighberhoodJobListUl = $("#myNeighberhoodJobList").children("ul");
					var lvMyNeighberhoodJobListUl2 = $("#myNeighberhoodJobList2").children("ul");
					var lvMyNeighberhoodJobListUlHtml = "";
					//초기화
					//lvMyNeighberhoodJobListUl.html(lvMyNeighberhoodJobListUlHtml);
					if($myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper != null) {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper.destroy();
					}
					lvMyNeighberhoodJobListUl.html("");
					lvMyNeighberhoodJobListUl2.html("");
					/* 리스트 좌우 스와이프 */
					$myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper = new Swiper('#myNeighberhoodJobList', {
						slidesPerView: 'auto',
						centeredSlides: true,
						spaceBetween: 10,
						slideToClickedSlide: true,
						/*pagination: { // 동적으로 관리하면서 페이징 안씀
							el: '.swiper-pagination',
							type: 'progressbar'
						},*/
						on: {
							/*click: function(e) {
								var lvThis = $(e.target);
								var lvThisLi = lvThis.closest("li");
							},*/
							slideChangeTransitionEnd: function() {
								//선택처리(색상)
								var lvThisLi = $("#myNeighberhoodJobList>ul>li").eq($myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper.activeIndex);
								var lvThisLiDataIndex = Number(lvThisLi.attr("data_index"));
								$("#myNeighberhoodJobList>ul>li").removeClass("on");
								$("#myNeighberhoodJobList>ul>li").addClass("off");
								lvThisLi.addClass("on");
								lvThisLi.removeClass("off");
								
								//지도이동
								if($myNeighberhoodJobMap.ui.myNeighberhoodJobListMapMoveYn == "Y") {
									var lvPtX = lvThisLi.attr("pt_x");
									var lvPtY = lvThisLi.attr("pt_y");
									if(lvPtX != "" && lvPtY != "") {
										$myNeighberhoodJobMap.ui.map.mapMove([lvPtX, lvPtY], 10, 300);
									}
								}
								else {
									$myNeighberhoodJobMap.ui.myNeighberhoodJobListMapMoveYn = "Y";
								}
								
								//해당 항목으로 페이징
								$myNeighberhoodJobMap.ui.myNeighberhoodJobListPaging(lvThisLiDataIndex, "N");
							}
						}
					});
					/* 리스트 첫번째 선택 */
					if(lvResultCount > 0) {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListPaging(0, "N");
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSwiper.slideTo(0);
						$("#myNeighberhoodJobList>ul>li").first().removeClass("off");
						$("#myNeighberhoodJobList>ul>li").first().addClass("on");
					}
					/* 리스트 하단 접기 펴기 */
					//건수 없는 경우 숨기기
					if(lvResultCount == 0) {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSubToggle("0",0);
					}
					//건수 있는 경우 기존 표시형태 유지
					else {
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobListSubYn,0);
					}
					
					/* 지도 마커 클러스터 추가 전 초기화 */
					var map = $myNeighberhoodJobMap.ui.map.gMap;
					//첫번째 조회 시 변수 세팅
					if($myNeighberhoodJobMap.ui.markerList == null) {
						$myNeighberhoodJobMap.ui.markerList = map.markers;
						$myNeighberhoodJobMap.ui.markerList = sop.markerClusterGroup({
	                    	animateAddingMarkers: true
	                    });
						map.addLayer($myNeighberhoodJobMap.ui.markerList);
					}
					//두번째 조회 부터는 초기화만
					else {
						$myNeighberhoodJobMap.ui.markerList.clearLayers();
					}
					/* 지도 마커 클러스터 추가 */
					//마커 클러스터 속도를 높이기 위한 전처리
					var lv_temp_center = $myNeighberhoodJobMap.ui.map.gMap.getCenter();
					var lv_temp_x = lv_temp_center.x;
					var lv_temp_y = lv_temp_center.y;
					var lv_temp_zoom = $myNeighberhoodJobMap.ui.map.zoom;
					$myNeighberhoodJobMap.ui.map.mapMove([0, 0], 13);
					//아이콘
					var lvMarkerIcon = sop.icon({
    	                iconUrl: contextPath+"/resources/m2019/images/markerIcon_01.png", // 20200402 이금은 마커아이콘 변경
    	                iconSize:     [43, 58],	                
    	                iconAnchor:   [21.5, 53],
    	                infoWindowAnchor: [0, -40]
    	            });
                    for(var i = 0; i < lvResultCount; i++) {
        				var lvMarKerContents = "";
        				lvMarKerContents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px; cursor: pointer;'>";
        				lvMarKerContents += "<strong>"+lvResultList[i].corp_nm+"</strong>";
        				lvMarKerContents += "</th><td></td></tr></tbody></table>";
        	            var lvMarker = sop.marker([lvResultList[i].pt_x, lvResultList[i].pt_y], {icon: lvMarkerIcon});
        	            lvMarker.index = i;
        	            lvMarker.bindInfoWindow(lvMarKerContents);
        	            $myNeighberhoodJobMap.ui.markerList.addLayer(lvMarker);
        				lvMarker.on("click",function(e){
        					var lvTempIndex = this.index;
        					//해당 항목으로 페이징
        					$myNeighberhoodJobMap.ui.myNeighberhoodJobListPaging(lvTempIndex, "Y");
                        });
                    }
                    //마커 클러스터 속도를 높이기 위한 후처리
                    $myNeighberhoodJobMap.ui.map.mapMove([lv_temp_x, lv_temp_y], lv_temp_zoom);
                    /* 지도 이동 (첫번쨰 항목으로) */
                    if($myNeighberhoodJobMap.ui.my_location_yn == "Y") {
                    	$myNeighberhoodJobMap.ui.my_location_yn = "N";
                    	$myNeighberhoodJobMap.ui.map.mapMove([$myNeighberhoodJobMap.ui.my_x, $myNeighberhoodJobMap.ui.my_y], $myNeighberhoodJobMap.ui.map.currentDefaultZoom);
                    }
                    else {
                    	if(lvResultCount > 0) {
    						var lvPtX = lvResultList[0].pt_x;
    						var lvPtY = lvResultList[0].pt_y;
    						if(lvPtX != null && lvPtY != null && lvPtX != "" && lvPtY != "") {
    							$myNeighberhoodJobMap.ui.map.mapMove([lvPtX, lvPtY], 7, 300);
    						}
                        }
                    }
                    /* 전체보기 팝업 세팅 */
                    /* 전체보기 첫번째 페이징 */
                    if(lvResultCount > 0) {
                    	$myNeighberhoodJobMap.ui.myNeighberhoodJobList2 = $("#myNeighberhoodJobList2");
	                    $myNeighberhoodJobMap.ui.myNeighberhoodJobList2PagingIndex = -1;
	                    $myNeighberhoodJobMap.ui.myNeighberhoodJobList2Paging(0);
                    }
                    //CSS 세팅
                    lvMyNeighberhoodJobListUl2.children("li").css("width","").removeClass("swiper-slide");
                    lvMyNeighberhoodJobListUl2.find("div.detailRecu").css("height","auto");
                    //리스트형/카드형 세팅
                    $myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn,0);
                    /* 전체보기 팝업 불러오기 */
                    if(lvGubun == "onload") {
                    	$myNeighberhoodJobMap.ui.myNeighberhoodJobListPopupToggle(true);
                    }
                    
                    /* 생활환경 정보 */
                    var lvResultCount2 = res.result.resultCount2;
					var lvResultList2 = res.result.resultList2;
					//초기화
					$(
						"#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo1']"
						+",#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo2']"
						+",#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo3']"
						+",#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo4']"
						+",#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo5']"
						+",#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo6']"
						+",#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo7']"
					).removeClass("good").removeClass("normal").removeClass("bad").text("");
					//입력
					if(lvResultCount2 > 0) {
						for(var i = 0; i < lvResultCount2; i++) {
							//변수
							var lvTempMClassIdxId = lvResultList2[i].m_class_idx_id;
							var lvTempZScore = lvResultList2[i].z_score;
							var lvTempDataYn = lvResultList2[i].data_yn;
							var lvTempClass = "";
							var lvTempText = "";
							
							//데이터 없음
							if(lvTempDataYn == "N") {
								lvTempClass = "normal";
								lvTempText = "없음";
							}
							//좋음
							else if(lvTempZScore > 6) {
								lvTempClass = "good";
								if($myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId] != undefined) {
									lvTempText = $myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId].good;
								}
								else {
									lvTempText = "좋음";
								}
							}
							//보통
							else if(lvTempZScore >= 4) {
								lvTempClass = "normal";
								if($myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId] != undefined) {
									lvTempText = $myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId].normal;
								}
								else {
									lvTempText = "보통";
								}
							}
							//나쁨
							else {
								lvTempClass = "bad";
								if($myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId] != undefined) {
									lvTempText = $myNeighberhoodJobMap.ui.myNeighberhoodJobLifeEnvironmentText[lvTempMClassIdxId].bad;
								}
								else {
									lvTempText = "나쁨";
								}
							}
							
							//1. 녹지비율/HML0001/HMM0003
							if(lvResultList2[i].b_class_idx_id == "HML0001" && lvResultList2[i].m_class_idx_id == "HMM0003") {
								$("#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo1']").addClass(lvTempClass).text(lvTempText);
							}
							//2. 공동주택비율/HML0002/HMM0004	
							else if(lvResultList2[i].b_class_idx_id == "HML0002" && lvResultList2[i].m_class_idx_id == "HMM0004") {
								$("#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo2']").addClass(lvTempClass).text(lvTempText);
							}
							//3. 청장년인구비율/HML0003/HMM0009	
							else if(lvResultList2[i].b_class_idx_id == "HML0003" && lvResultList2[i].m_class_idx_id == "HMM0009") {
								$("#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo3']").addClass(lvTempClass).text(lvTempText);
							}
							//4. 교통사고 안전/HML0004/HMM0014
							else if(lvResultList2[i].b_class_idx_id == "HML0004" && lvResultList2[i].m_class_idx_id == "HMM0014") {
								$("#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo4']").addClass(lvTempClass).text(lvTempText);
							}
							//5. 대중교통 이용률/HML0005/HMM0018	
							else if(lvResultList2[i].b_class_idx_id == "HML0005" && lvResultList2[i].m_class_idx_id == "HMM0018") {
								$("#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo5']").addClass(lvTempClass).text(lvTempText);
							}
							//6. 고등교육기관 수/HML0006/HMM0021	
							else if(lvResultList2[i].b_class_idx_id == "HML0006" && lvResultList2[i].m_class_idx_id == "HMM0021") {
								$("#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo6']").addClass(lvTempClass).text(lvTempText);
							}
							//7. 문화시설 수/HML0007/HMM0027	
							else if(lvResultList2[i].b_class_idx_id == "HML0007" && lvResultList2[i].m_class_idx_id == "HMM0027") {
								$("#myNeighberhoodJobLifeEnvironment span[name='myNeighberhoodJobLifeEnvironmentInfo7']").addClass(lvTempClass).text(lvTempText);
							}
						}
					}
					// 팝업 시도코드 및 시군구코드 세팅
					$("#myNeighberhoodJobLifeEnvironmentPopup_open").attr("sido_cd", lvParams.sido_cd);
					$("#myNeighberhoodJobLifeEnvironmentPopup_open").attr("sgg_cd", lvParams.sgg_cd);
					$("#myNeighberhoodJobLifeEnvironmentPopup_open").attr("emdong_cd", lvParams.emdong_cd);
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
				}else{
					common_alert(res.errMsg);
				}
				//console.timeEnd('calculatingTime');
			},
			onFail: function(status) {
				common_loading(false);
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 일자리 목록 조회 종료 **********/	
}(window, document));