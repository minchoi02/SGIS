/**
 * 희망지역 선택 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 희망지역 선택
 * 
 * history : 
 *	2018.09.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjSelectDesiredArea = W.$vjSelectDesiredArea || {};
	
	$vjSelectDesiredArea.ui = {

		/**
		 * @name         : 화면 띄우기 (모달)
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		showDialog : function() {
			$workRoad.ui.showDialog('#vjDesiredArea');
			
			// 시도 SELECT 박스 채우기
			$workRoad.ui.setSidoCombo("#vjDesiredArea #vjSidoSelect", $wrmViewJobs.ui.sidoList);
			// 시도 항목 선택하기
			$vjSelectDesiredArea.ui.selectSido($wrmViewJobs.ui.defaultSidoCd);
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hideDialog : function() {
			$workRoad.ui.hideDialog('#vjDesiredArea');
		},
		/**
		 * @name         : SELECT 박스에서 시도 항목 강제 선택하기
		 * @description  : 
		 * @date         : 2018.10.30
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		selectSido : function (pSidoCd) {
			$('#vjDesiredArea #vjSidoSelect').val(pSidoCd).prop("selected", true);
			
			// 일자리보기 공통 시군구 목록 조회
			$wrmViewJobs.ui.setSggList(pSidoCd);
			// 시군구 SELECT 박스 채우기
			$workRoad.ui.setSggCombo("#vjDesiredArea #vjSggSelect"
					, $wrmViewJobs.ui.sggList
					, $wrmViewJobs.ui.getSidoItem(pSidoCd)
					, (pSidoCd == "11" || pSidoCd == "31") ? false : true);	// 각 시도별 전체 활성화(서울, 경기도 제외)
			// 시군구 항목 선택하기
			$vjSelectDesiredArea.ui.selectSgg($wrmViewJobs.ui.defaultSggCd);
		},
		/**
		 * @name         : SELECT 박스에서 시군구 항목 강제 선택하기
		 * @description  : 
		 * @date         : 2018.10.30
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		selectSgg : function (pSggCd) {
			if (pSggCd != '' && pSggCd != '999') {// 현재 일자리 보기에서는 "전체"를 사용 안함
				$('#vjDesiredArea #vjSggSelect').val(pSggCd).prop("selected", true);
			} else {
				$('#vjDesiredArea #vjSggSelect').find("option:eq(0)").prop("selected", true);
			}
		},
		/**
		 * @name         : 희망지역 선택완료
		 * @description  : 희망지역 레이어에서 선택완료 버튼 클릭
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 */
		selectDesiredArea : function () {
			
			// 선택된 지역 변수에 설정
			var sidoCode = $('#vjDesiredArea #vjSidoSelect option:selected').val();
			var sggCode = $('#vjDesiredArea #vjSggSelect option:selected').val();
			var sidoName = $('#vjDesiredArea #vjSidoSelect option:selected').text();
			var sggName = $('#vjDesiredArea #vjSggSelect option:selected').text();
			var sidoCoorX = $('#vjDesiredArea #vjSidoSelect option:selected').data('coor-x');
			var sidoCoorY = $('#vjDesiredArea #vjSidoSelect option:selected').data('coor-y');
			var sggCoorX = $('#vjDesiredArea #vjSggSelect option:selected').data('coor-x');
			var sggCoorY = $('#vjDesiredArea #vjSggSelect option:selected').data('coor-y');
			
			$wrmViewJobs.ui.defaultSidoCd = sidoCode;
			$wrmViewJobs.ui.defaultSggCd = sggCode;
			$wrmViewJobs.ui.defaultSidoNm = sidoName;
			$wrmViewJobs.ui.defaultSggNm = sggName;
			$wrmViewJobs.ui.defaultSidoCoorX = sidoCoorX;
			$wrmViewJobs.ui.defaultSidoCoorY = sidoCoorY;
			$wrmViewJobs.ui.defaultSggCoorX = sggCoorX;
			$wrmViewJobs.ui.defaultSggCoorY = sggCoorY;
			
			if (sggCode != '' && sggCode != '999') {
				$wrmViewJobs.ui.naviConfirm([sidoCoorX, sidoCoorY], [sggCoorX, sggCoorY]);
			} else {
				$wrmViewJobs.ui.naviConfirm([sidoCoorX, sidoCoorY]);
			}
			
			this.hideDialog();		
			
			$vjJobInfoList.ui.show();	

			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '03', '03', '01', '', 'sido_cd='+sidoCode+', sgg_cd='+sggCode);
		},
	};	
	
	$vjSelectDesiredArea.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 * 		2018.09.17	ywKim	신규
		 */
		setUIEvent: function() {
			console.log("$vjSelectDesiredArea.event.setUIEvent() called.");

			// 시도 콤보박스 이벤트
			$workRoad.event.set("change", "#vjDesiredArea #vjSidoSelect", function(){
				var sidoCd  = $('#vjDesiredArea #vjSidoSelect option:selected').val();

				// 일자리보기 공통 시군구 목록 조회
				$wrmViewJobs.ui.setSggList(sidoCd);
				// 시군구 SELECT 박스 채우기
				$workRoad.ui.setSggCombo("#vjDesiredArea #vjSggSelect"
						, $wrmViewJobs.ui.sggList
						, $wrmViewJobs.ui.getSidoItem(sidoCd)
						, (sidoCd == "11" || sidoCd == "31") ? false : true);	// 각 시도별 전체 활성화(서울, 경기도 제외)
			});
			
			// 선택완료
			$workRoad.event.set("click", "#vjDesiredArea #vjOk", function() {
				$vjSelectDesiredArea.ui.selectDesiredArea();
			});			
			// 취소	
			$workRoad.event.set("click", "#vjDesiredArea #vjCancel", function() {
				$vjSelectDesiredArea.ui.hideDialog();
			});			
		},			
	}
	
}(window, document));