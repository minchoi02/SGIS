/**
 * 오늘의 구인 현황 메인 스크립트
 * 경로 : 일자리 맵 서비스 > 오늘의 구인 현황 > 
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
	W.$workRoadMain = W.$workRoadMain || {};
	
	$workRoadMain.ui = {
		linkClicked : false,
		
		ready : function() {
			$workRoadMain.event.setUIEvent();
			
			$workRoadMain.ui.show();
			$workRoadMain.ui.loadData();
		},		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.12.06
		 * @author	     : ywKim
		 * @history 	 :
		 * @param
		 */
		show : function() {			
			$workRoad.ui.showDialog("#workRoadMain");
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.12.06
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideDialog('#workRoadMain');
		},
		
		loadData : function() {
//			$.ajax({
//				type: "POST",
//				url: contextPath + "/ServiceAPI/workRoad/selectMainJobStatusInfo.json",
//				async: true,
//				dataType: "json",
//				data: {},
//				success: function(res) {
//					if (res.errCd == 0) {
//						var dataList = res.result.dataList;						
//						$workRoadMain.ui.displayJobStatus(dataList);
//					} else {
//						alert('failed!');
//					}
//				} ,
//				error:function(err) {
//					if (typeof pErrorCallBack !== 'undefined') {
//						pErrorCallBack(err.responseText);
//					} else {
//						alert(err.responseText);
//					}
//				}  
//			});
			
			// 오늘의 구인현황 메인(tsMain.js)와 데이터 가져오는 API 는 동일함
			var dataParams = {};						
			dataParams.sido_cd = "99";
			dataParams.sgg_cd = "999";
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/todayStatus/getTodayStatus.json",
				async: true,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						var todayStatusList = res.result.todayStatusList;
						// 2020.05.11[주형식] 오늘의 일자리 현황 사람인 정보 추가 START 
						//var html = "구인정보 출처 : 워크넷, 인크루트 <span>(" + $workRoad.util.dateWithSign(res.result.today, ".") + " 기준)</span>"
						var html = "구인정보 출처 : 워크넷, 인크루트, 사람인 <span>(" + $workRoad.util.dateWithSign(res.result.today, ".") + " 기준)</span>"
						// 2020.05.11[주형식] 오늘의 일자리 현황 사람인 정보 추가 END
						$("#workRoadMain #idToday").html(html);
						$workRoadMain.ui.displayTodayStatus(todayStatusList);
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});			
			
		},
//		displayJobStatus : function(pDataList) {
//			$this = $("#workRoadMain #idJobStatusTable tbody");
//			$this.empty();
//			var html = "";
//			
//			for(var i = 0; i < pDataList.length; i++){
//				var data = pDataList[i];
//				
//				if ((i + 1) % 2 == 1) {
//					html += "<tr>";
//				}
//				
//				html += "	<td>";
//				html += "		<p>" + data.title + "</p>";
//				html += "		<p>" + "(" + $workRoad.util.dateWithSign(data.reference_date, ".") + " 기준)</p>";
//				html += "	</td>";
//				
//				html += "	<td>";
//				html += $workRoad.util.addComma(data.value, data.value_unit);
//				html += "	</td>";
//				
//				if ((i + 1) % 2 == 0) {
//					html += "</tr>";
//				}
//			}
//			
//			$this.append(html);
//		},
		displayTodayStatus : function(pDataList) {
			var html = "";

			html = $workRoad.util.addComma(pDataList[0].all_corp_cnt, "<span style='font-weight:normal;'>업체</span>");
			$("#workRoadMain #all_corp").html(html);
			html = $workRoad.util.addComma(pDataList[0].all_rcrit_psn_cnt, "<span style='font-weight:normal;'>명</span>");
			$("#workRoadMain #all_man").html(html);
			html = $workRoad.util.addComma(pDataList[0].new_corp_cnt, "<span style='font-weight:normal;'>업체</span>");
			$("#workRoadMain #new_corp").html(html);
			html = $workRoad.util.addComma(pDataList[0].new_rcrit_psn_cnt, "<span style='font-weight:normal;'>명</span>");
			$("#workRoadMain #new_man").html(html);
			html = $workRoad.util.addComma(pDataList[0].clos_corp_cnt, "<span style='font-weight:normal;'>업체</span>");
			$("#workRoadMain #clos_corp").html(html);
			html = $workRoad.util.addComma(pDataList[0].clos_rcrit_psn_cnt, "<span style='font-weight:normal;'>명</span>");
			$("#workRoadMain #clos_man").html(html);
//			$this = $("#workRoadMain #idTable tbody");
//			$this.empty();
//			
//			for(var i = 0; i < pDataList.length; i++){
//				var html = $wrmTodayStatus.ui.getRowHtml(pDataList[i]);							
//				$this.append(html);
//			}
		},		
	};	
	
	$workRoadMain.event = {
		/**
		 * @name		 : 이벤트 바인딩 
		 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
		 * @date		 : 2018.09.17
		 * @author		 : ywKim
		 * @history 	 :
		 * 		2018.09.17	ywKim	신규
		 */
		setUIEvent: function() {
			console.log("■$workRoadMain.event.setUIEvent() called.");
			
//			$workRoad.event.set("click","#workRoadMain .topbar>a",function(){
//				$workRoadMain.ui.hide();
//				$tsMain.ui.ready();
//			});
			
			
//			$workRoad.event.set("click","#workRoadMain #ok",function(){
//				$workRoadLeftMenu.ui.goNeighborhoodJob();
//			});
	
// 2019.05.20 임시 주석 - iq250snail			
//			$workRoad.event.set("click","#workRoadMain",function(){
//				if ($workRoadMain.ui.linkClicked == false) {
//					$workRoadMain.ui.hide();
//					
//					// M1.오늘의 구인현황 처음 로드시 메뉴바 표시 - 2019.01.09		ywKim	추가
//					if ($workRoad.ui.mainPopupEnabled) {
//						$workRoadLeftMenu.ui.showNavSidebar();
//					}
//					
//					$tsMain.ui.ready();
//				}
//			});
			
			// 오늘의 구인현황
			$workRoad.event.set("click","#workRoadMain #ts",function(){
				$workRoadMain.ui.linkClicked = true;
				
				// M1.오늘의 구인현황 처음 로드시 메뉴바 표시 - 2019.01.09		ywKim	추가
				if ($workRoad.ui.mainPopupEnabled) {
					$workRoadLeftMenu.ui.showNavSidebar();
				}
				
				$workRoadMain.ui.hide();
				$tsMain.ui.ready();
			});
			// 일자리 보기
			$workRoad.event.set("click","#workRoadMain #vj",function(){
				$workRoadMain.ui.linkClicked = true;
				$workRoadMain.ui.hide();
				$workRoadLeftMenu.ui.goNeighborhoodJob();
//				$workRoadLeftMenu.ui.moveMenu(1);
			});
			// 구인 현황분석
			$workRoad.event.set("click","#workRoadMain #sa",function(){
				$workRoadMain.ui.linkClicked = true;
				$workRoadMain.ui.hide();
				$workRoadLeftMenu.ui.moveMenu(2);
			});
			// 일자리 통계분석
			$workRoad.event.set("click","#workRoadMain #ssa",function(){
				$workRoadMain.ui.linkClicked = true;
				$workRoadMain.ui.hide();
				$workRoadLeftMenu.ui.moveMenu(3);
			});
		},			
	}		
		
}(window, document));