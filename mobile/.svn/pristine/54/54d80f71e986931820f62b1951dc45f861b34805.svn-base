(function(W, D) {

	W.$loginSetupNotification = W.$loginSetupNotification || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		//페이지 기본 이벤트 등록
		$loginSetupNotification.event.setUIEvent();
		
		//페이지 데이터 불러오기
		$loginSetupNotification.ui.loadData();
	});

	// 페이지 UI 변수 및 함수 선언
	$loginSetupNotification.ui = {
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
				    async: false,
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
								$("#data1").prop("checked",true);
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
				//common_loading(true);
				// ajax 시작
				$.ajax({
				    url: contextPath + "/m2019/workroad/mergeSrvDtJobClmserInfo.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	member_id: sop.member_id, //로그인 ID
				    	lc_info_agree_yn: ($("#data1").prop("checked") == true) ? "Y" : "N"
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						common_alert("설정이 완료되었습니다.", function() {
							history.back();
						});
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
			else {
				history.back();
			}
		}
	};
	
	$loginSetupNotification.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2019.07.10
		 * @author : 김남민
		 * @history :
		 */
		setUIEvent : function() {
			//뒤로
			$(document).on("click", "#form_back", function() {
				history.back();
			});
			
			//취소
			$(document).on("click", "#form_cancel", function() {
				history.back();
			});
			
			//저장
			$(document).on("click", "#form_submit", function() {
				$loginSetupNotification.ui.saveData();
			});
		}
	};
	
}(window, document));