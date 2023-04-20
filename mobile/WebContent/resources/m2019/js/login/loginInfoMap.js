(function(W, D) {

	W.$loginInfoMap = W.$loginInfoMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		//지도 세팅
		$loginInfoMap.ui.createMap("map");
		
		//페이지 기본 이벤트 등록
		$loginInfoMap.event.setUIEvent();
		
		//맞춤 채용공고 건수 조회
		$loginInfoMap.ui.loginInfoMapGetCount("2");
		
		//마감임박 건수 조회
		$loginInfoMap.ui.loginInfoMapGetCount("3");
		
		//사용자 위치동의 데이터 불러오기
		$loginInfoMap.ui.loadData();
		
	});

	// 페이지 UI 변수 및 함수 선언
	$loginInfoMap.ui = {
		map : null,
		
		//내 현재위치
		my_x : null, // x
		my_y : null, // y
		my_sido_cd : null, // 시도코드
		my_sido_nm : null, // 시도명
		my_sgg_cd : null, // 시군구코드
		my_sgg_nm : null, // 시군구명
		my_emdong_cd : null, // 읍면동코드
		my_emdong_nm : null, // 읍면동명
		
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2019.07.03
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
			this.map.createMap($loginInfoMap, id, {
				isLegendControl:false // 하단 범례 제거
				,isCurrentLocationMarker:false // 지도에 현재위치 표시 안함
			});
			this.map.gMap.whenReady(function() {
				$loginInfoMap.ui.map.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {
					if(p_flag == true) {
						//변수 입력
						$loginInfoMap.ui.my_x = p_center[0];
						$loginInfoMap.ui.my_y = p_center[1];
						//지역조회
						$loginInfoMap.ui.map.getCenterToAdmCd(p_center, function(res) {
							//변수 입력
							$loginInfoMap.ui.my_sido_cd = res.result.sido_cd;
							$loginInfoMap.ui.my_sido_nm = res.result.sido_nm;
							$loginInfoMap.ui.my_sgg_cd = res.result.sgg_cd;
							$loginInfoMap.ui.my_sgg_nm = res.result.sgg_nm;
							$loginInfoMap.ui.my_emdong_cd = res.result.emdong_cd;
							$loginInfoMap.ui.my_emdong_nm = res.result.emdong_nm;
							
							//내주변 채용공고 건수 조회
							$loginInfoMap.ui.loginInfoMapGetCount("1");
						});
					}
					else {
						if(!p_msg2) common_alert(p_msg2);
						else common_alert(p_msg);
					}
				});
			});
		},
		
		/**
		 * @name : loginInfoMapGetCount
		 * @description : 건수 조회
		 * @date : 2019.07.03
		 * @author : 김남민
		 * @history :
		 * @param
		 * 		p_list_gubun : 조회구분 (1: 내 주변 , 2: 맞춤, 3: 마감임박)
		 */
		loginInfoMapGetCount : function(p_list_gubun) {
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/myNeighberhoodJobListCount.json",
				    type: 'post',
				    dataType: 'json',
				    data: {
				    	list_gubun : p_list_gubun,
				    	my_sido_cd : $loginInfoMap.ui.my_sido_cd,
				    	my_sgg_cd : $loginInfoMap.ui.my_sgg_cd,
				    	member_id: sop.member_id //로그인 ID
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvParams = res.result.params;
						var lvResultCount = res.result.resultCount;
						var lvResultList = res.result.resultList;
						
						//건수 표시
						var lvCountLi = $("#loginInfo_count"+lvParams.list_gubun);
						lvCountLi.children("span.count").html(lvResultCount);
						
						//빨간점 표시
						if(lvResultCount > 0) lvCountLi.children("div.i_new").show();
						else lvCountLi.children("div.i_new").hide();
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
		 * @name : loadData
		 * @description : 데이터 불러오기
		 * @date : 2019.07.10
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		loadData : function() {
			if(sop.isLogin) { //로그인 체크
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/selectSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    data: {
				    	member_id: sop.member_id //로그인 ID
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						var lvResultList = res.result.resultList;
						var lvResultCount = res.result.resultCount;
						if(lvResultCount > 0) {
							//사용자 위치동의
							if(lvResultList[0].lc_info_agree_yn == "Y") {
								$("#lc_info_agree_yn").prop("checked",true);
								$("#lc_info_agree_yn_text").text("동의");

							}
							else {
								$("#lc_info_agree_yn_text").text("미동의");
							}
							//마감임박 알림메세지 창
							
							//마감임박 알림뱃지
							
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
		},
		
		/**
		 * @name : saveData
		 * @description : 데이터 저장하기
		 * @date : 2019.07.10
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		saveData : function() {
			if(sop.isLogin) { //로그인 체크
				//2019-09-23 [김남민] 모바일 > 로그인 후 화면 > 위치동의 수정시 문구도 같이 변경. START
				//사용자 위치동의
				if($("#lc_info_agree_yn").prop("checked") == true) {
					$("#lc_info_agree_yn_text").text("동의");
					srvLogWrite('M0','12','03','00','동의',''); // 사용자 위치동의
				}
				else {
					$("#lc_info_agree_yn_text").text("미동의");
					srvLogWrite('M0','12','03','00','미동의',''); // 사용자 위치동의
				}
				//2019-09-23 [김남민] 모바일 > 로그인 후 화면 > 위치동의 수정시 문구도 같이 변경. END
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/mergeSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    data: {
				    	member_id: sop.member_id, //로그인 ID
				    	lc_info_agree_yn: ($("#lc_info_agree_yn").prop("checked") == true) ? "Y" : "N"
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						
					}else if(res.errCd == "-401") {
						common_alert(res.errMsg);
					}else{
						common_alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//common_loading(false);
				});
				// ajax 끝
			}
		}
	};

	$loginInfoMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 */
		setUIEvent : function() {
			// 뒤로가기
			$(document).on("click", "#loginInfo_back", function() {
				var lv_prev_url = ""+document.referrer;
				//로그인 타고 넘어온거면 내주변 일자리로 이동
				if(lv_prev_url.indexOf("login") >= 0) {
					location.href = contextPath+"/m2019/workroad/myNeighberhoodJobMap.sgis";
				}
				else {
					history.back();
				}
			});
			
			// 로그아웃
			$(document).on("click", "#loginInfo_logout", function() {
				srvLogWrite('M0','01','06','00'); // 로그아웃
				common_logout();
			});
			
			// 내주변 채용공고, 맞춤 채용공고, 마감임박
			$(document).on("click", "[id^=loginInfo_count]", function() {
				var lvThis = $(this);
				var lvThisId = lvThis.attr("id");
				var lvListGubun = lvThisId.slice(-1);
				
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) START
				//맞춤형 채용공고 서비스 설정이 없는 경우
				if(lvListGubun == "2" || lvListGubun == "3") {
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
						if(lv_clmser_sido_cd == undefined || lv_clmser_sido_cd == null || lv_clmser_sido_cd == "") {
							common_alert("맞춤형 채용공고 서비스 설정이 필요합니다.");
							return;
						}
					}
				}
				//2019-09-30 [김남민] 모바일 > 일자리 맵 > selectCmmCdComcd.json 호출 변경. (일자리 찾기 눌렀을때 호출) END
				
				location.href = contextPath+"/m2019/workroad/myNeighberhoodJobMap.sgis?list_gubun="+lvListGubun;
			});
			
			// 사용자 위치동의 변경
			$(document).on("change", "#lc_info_agree_yn", function() {
				$loginInfoMap.ui.saveData();
			});
		}
	};
}(window, document));