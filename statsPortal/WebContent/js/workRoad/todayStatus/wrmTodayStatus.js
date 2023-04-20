/**
 * 일자리 맵 서비스 > 오늘의 구인 현황
 *   
 * history : 
 *	2018.09.07	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$wrmTodayStatus = W.$wrmTodayStatus || {};	// WorkRoadMap Today's Job Status
	
	$wrmTodayStatus.ui = {
		today : (new Date()).toISOString().slice(0,10).replace(/-/g,""),			// 최신 데이터 작성일자 (정상적으로 데이터가 수집되었다면 today - 1 일이어야 한다.)
		sido_nm : "전체",																// 데이터보드 > 정보 테이블에서 사용하기 위해 메인레이어 > 지역선택시 설정한다.
		selected_today : (new Date()).toISOString().slice(0,10).replace(/-/g,""),	// 조회일자(YYYYMMDD) - 2018-01-03 지도 화면에 마우스 오버시 "2018"로 뜨고 있음 (YYYY.MM.DD)로 변경 필요.
		selected_search_type : "D",													// 챠트에 카테고리 데이터 유형 - 2019.01.15	ywKim	추가
		
		sgg_nm : "",																// 2019.05.13[한광희] 지역(시군구) 선택시 데이터보드 지역항목에 시군구 명칭 설정
		
		/**
		 * @name         : 초기화
		 * @description  : 최초 화면을 초기화 합니다.
		 * 					기본적으로 각 페이지 (서브메뉴, 레이어, 팝업, 데이터보드 컨텐츠 등등)를 로드합니다.
		 * @date         : 2018.09.07
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param        :
		 */
		init : function() {
			
			$workRoad.ui.appendMap('/view/workRoad/todayStatus/tsMap');
			$workRoad.ui.appendDataBoard('/view/workRoad/todayStatus/tsDataBoard');
		
			$workRoad.ui.appendContent('/view/workRoad/workRoadMain');
			$workRoad.ui.appendContent('/view/workRoad/todayStatus/tsMain');
			$workRoad.ui.appendContent('/view/workRoad/todayStatus/tsSub');
		},
		/**
		 * @name         : ready
		 * @description  : 모든 페이지 로드된 직후 처리
		 * @date         : 2018.10.31
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param id     : 아이디
		 * @param seq    : 순번
		 */
		ready : function(pMainPopupEnabled) {
			$wrmTodayStatus.ui.getToday();
			
			$tsMap.ui.createMap("mapRgn_1", 0);
//			$tsDataBoard.event.setUIEvent();	// UI에 사용되는 이벤트를 설정한다.
			$tsDataBoard.ui.mapDataSetting();	// 지도별 데이터 형식 세팅
//			$tsMap.ui.getFirstMapDataLoad("");	// tsMain.js로 이동 - 2018.11.08	ywKim	변경
			
			if (pMainPopupEnabled != undefined && pMainPopupEnabled) {				
				$workRoadMain.ui.ready();
				
				// 2019.03.13 접근log 생성
				srvLogWrite('D0', '01', '00', '00', '', '');

			} else {				
				$tsMain.ui.ready();
			}
		},
		showMainLayer : function () {
			$tsMain.ui.show();
		},
		/*
		 * @name         : layout
		 * @description  : 레이어 위치 조정
		 * @date         : 2019.01.09 
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param	pLeft	: 레이어의 좌측 위치
		 * @param	pTop	: 레이어의 상단 위치 (defalt: undefined)
		 */
		layout : function(pLeft, pTop) {
			var $main = $("#tsMain");
			var $sub = $("#tsSub");
			
			var style = {};
			style.left = pLeft + "px";
			if (pTop != undefined) {
				style.top = pTop + "px";
			}
			
			if ($main.css("display") != "none") {
				$main.stop().animate(style, 200);
			} else if ($sub.css("display") != "none") {
				$sub.stop().animate(style, 200);
			}
			
			//시각화 위치 조정
			$("#view1 .sop-left .sop-control").stop().animate({left : pLeft + "px"}, 200);
		},			
		/** 
		 * @name         : getToday
		 * @description  : 오늘의 구인현황 기준일 구하기
		 *  				최신 데이터 등록일
		 * @date         : 2018. 11. 08 
		 * @author	     : ywKim
		 * @history 	 :
		 */
		getToday : function() {
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/todayStatus/getToday.json",
				async: false,
				dataType: "json",
//				data: { separator: " ", year: "년", month: "월", day: "일" },
				success: function(res) {
					if (res.errCd == 0) {
						$wrmTodayStatus.ui.today = res.result;
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		/**
		 * @name         : getRowHtml
		 * @description  : 오늘의 구인현황 테이블의 Row html 만들기
		 * @date         : 2018.12.13 
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pData	: 
		 */	
		getRowHtml : function(pData) {
			var html = '';
			html += '<tr>';
			html += '	<td> 전체구인 </td>';
			html += $wrmTodayStatus.ui.getCellHtml({
				value1: pData.all_corp_cnt,
				value2: pData.all_corp_cnt_c,
				operation: '%',
				unit: ' 업체',
				icoUnit: '%',
			});
			html += $wrmTodayStatus.ui.getCellHtml({
				value1: pData.all_rcrit_psn_cnt, 
				value2: pData.all_rcrit_psn_cnt_c, 
				operation: '%',
				unit: ' 명',
				icoUnit: '%',
			});
			html += '</tr>';
			html += '<tr>';
			html += '	<td><span class="icon plus"></span>구인 신규 등록</td>';
			html += $wrmTodayStatus.ui.getCellHtml({
				value1: pData.new_corp_cnt, 
				value2: pData.new_corp_cnt_c,
				unit: ' 업체',
				icoUnit: '개',
			});
			html += $wrmTodayStatus.ui.getCellHtml({
				value1: pData.new_rcrit_psn_cnt, 
				value2: pData.new_rcrit_psn_cnt_c,
				unit: ' 명',
				icoUnit: '명',
			});
			html += '</tr>';
			html += '<tr>';
			html += '	<td><span class="icon mius"></span>구인 종료 마감</td>';
			html += $wrmTodayStatus.ui.getCellHtml({
				value1: pData.clos_corp_cnt, 
				value2: pData.clos_corp_cnt_c,
				unit: ' 업체',
				icoUnit: '개',
			});
			html += $wrmTodayStatus.ui.getCellHtml({
				value1: pData.clos_rcrit_psn_cnt, 
				value2: pData.clos_rcrit_psn_cnt_c,
				unit: ' 명',
				icoUnit: '명',
			});
			html += '</tr>';
			
			return html;
		},
		/**
		 * @name         : getCellHtml
		 * @description  : 오늘의 구인현황 테이블의 셀 html 만들기
		 * @date         : 2018. 11. 06 
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	value1	  : 오늘의 값
		 * 			value2	  : 전일의 값
		 * 						※ 아이콘의 값은 value1, value2를 연산한 값을 사용
		 * 			operation : 연산자 (value1, value2를 연산)
		 * 			unit 	  : 셀값에 붙을 꼬리말
		 * 			icoUnit	  : 아이콘에 붙을 꼬리말
		 */		
		getCellHtml: function(pParams) {			
			var pVal1 = (pParams.value1 != undefined) ? parseInt(pParams.value1) : 0;
			var pVal2 = (pParams.value2 != undefined) ? parseInt(pParams.value2) : 0;
			var pOperation = pParams.operation;
			var pUnit = pParams.unit;
			var pIcoUnit = pParams.icoUnit;

			var html = "";
			var val = 0;
			var ico = "";
			var title = "";
			
			if (pVal2 > 0) {
				if (pOperation == "%") {
					val = Number((100 * pVal2 / (pVal1 - pVal2)).toFixed(2));
				} else {
					val = pVal2;
				}
				ico = "up";
			} else if (pVal2 < 0) {
				if (pOperation == "%") {
					val = Number(((-100 * pVal2) / (pVal1 + pVal2)).toFixed(2));
				} else {
					val = -1 * pVal2;
				}
				ico = "down";
			}
			
			val = $workRoad.util.addComma(val);
			val += pIcoUnit;
			
			pVal1 = $workRoad.util.addComma(pVal1);
//			pVal2 = $workRoad.util.addComma(pVal2); // 20210908 이금은 주석처리
			 
			html += "	<td>";
			html += "		" + pVal1;
			if (pUnit != null && pUnit.length > 0) {
				html += pUnit;
			}
			if (ico == "") {
				title = "변동 없음";
				html += "		<span class='job-arrow' data-subj='전일대비' title='" + title + "' style='padding-top:10px'>-</span>";
			} else {
				title = val;
				if (pVal2 > 0) { title += " 증가"; } else { title += " 감소"; }
				html += "		<span class='job-arrow " + ico + "' data-val='" + val + "' data-subj='전일대비' title='" + title + "'></span>";
			}
			html += "	</td>";
			
			return html;
		},	
		
	};	
	
	$wrmTodayStatus.event = {
			/**
			 * @name		 : 
			 * @description  :  
			 * @date		 :  
			 * @author		 : 
			 * @history 	 :
			 */
			setUIEvent: function() {
				console.log("■$wrmTodayStatus.event.setUIEvent() called.");
				
				$tsMap.event.setUIEvent();
				$tsDataBoard.event.setUIEvent();				
				$tsMain.event.setUIEvent();
				$tsSub.event.setUIEvent();
				
				// 샘플
				$workRoad.event.set("click", "#sampleId", function() {
				});				
				$workRoad.event.set("change", "#sampleId", function() {
				});				
			},
	}
	
}(window, document));