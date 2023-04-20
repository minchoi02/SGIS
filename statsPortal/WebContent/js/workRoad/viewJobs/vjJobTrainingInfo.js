/**
 * 직업전망
 * vjJobTrainingInfo
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 데이터보드 > 직업훈련 
 * 
 * history : 
 *	2018.10.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjJobTrainingInfo = W.$vjJobTrainingInfo || {};
	
	$vjJobTrainingInfo.ui = {
		jobClassificationCode : null,	// 모집직종 코드
		pageSize : 15,					// 한 화면에 보여줄 목록 개수
		pageGroupCount : 5,				// 한 화면에 보여지는 페이지 번호의 최대 개수
//		selectedItem : null,			// 선택된 항목
//		selectedCode : null,			// 선택된 직업전망 코드
		
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.18
		 * @author	     : ywKim
		 * @history 	 :
		 * @params 	pJobClassificationCode	: 모집직종 코드
		 * 			pJobClassificationName	: 모집직종 이름
		 */
		init : function(pJobClassificationCode, pJobClassificationName) {
			$workRoadPaging.ui.hide();
			$vjJobTrainingInfo.ui.jobClassificationCode = pJobClassificationCode;
			$vjJobTrainingInfo.ui.displayAboutTitle(pJobClassificationName);
			$vjJobTrainingInfo.ui.displayListTitle(pJobClassificationName);
			$vjJobTrainingInfo.ui.getSidoCodeList('11'); // 11 : 서울
		},
		/**
		 * @name         : 직업훈련 과정 타이틀 표시
		 * @description  : 
		 * @date         : 2018.10.26
		 * @author	     : ywKim
		 * @history 	 :
		 * @params 	pJobClassificationName	: 모집직종 이름
		 */
		displayAboutTitle : function(pJobClassificationName) {
			$('#vjJobTrainingInfo #vjAbout').text('(핵심직무)' + pJobClassificationName + ' 관련 직업훈련 과정');
		},
		/**
		 * @name         : 직업훈련 과정 목록 타이틀 표시
		 * @description  : 
		 * @date         : 2018.10.26
		 * @author	     : ywKim
		 * @history 	 :
		 * @params 	pJobClassificationName	: 모집직종 이름
		 */
		displayListTitle : function(pJobClassificationName) {
			$('#vjJobTrainingInfo #vjListTitle').text('선택된 지역의 (핵심직무) ' + pJobClassificationName + ' 관련 직업훈련 과정 목록');
		},
		/**
		 * @name         : HRD-Net 시도 목록 조회
		 * @description  : 
		 * @date         : 2018.10.18
		 * @author	     : ywKim
		 * @history 	 :
		 * @params pDefaultSido : 기본 HRD-Net 시도 코드
		 */
		getSidoCodeList : function(pDefaultSido) {
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectHRDNetSidoList.json",
				async: false,
				dataType: "json",
				data: {},
				success: function(res) {
					if(res.errCd == 0){
						var dataList = res.result.dataList;
						
						var $that = $('#vjJobTrainingInfo #vjSidoSelect');
						$that.html('');
						
						$.each(dataList, function(cnt, node) {
							$that.append($('<option/>', {
														text : node.nm, 
														value : node.cd,
														selected : (pDefaultSido == node.cd)}));
//														"data-coor-x" : node.x_coor,
//														"data-coor-y" : node.y_coor}));

							if (pDefaultSido == node.cd) {
								$vjJobTrainingInfo.ui.getSggCodeList(node.cd);
							}							
						});
						
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
		 * @name         : getSggCodeList
		 * @description  : HRD-Net 시군구 목록 조회
		 * @date         : 2018.10.18
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.14	ywKim	변경 : openApi 호출을 js버전으로 변경
		 * @params	pSidoCode : HRD-Net 시도 코드
		 */
		getSggCodeList : function(pSidoCode) {
        	var lvUrl = "http://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA90/HRDPOA90_1.jsp?authKey=NBkgOltkVpP6gfHjz5zhNgY2iisuuFMt&returnType=XML&outType=1&srchType=01&srchOption1=" + pSidoCode;
			
			$.ajax({
				crossOrigin: true,
				url: lvUrl,
				type: 'get', 
				async: false,
				contentType: "text/xml; charset=euc-kr",
//				dataType: 'xml',
				charset: "euc-kr",
	            success: function(data) {
	            	if (data) {
						var $that = $('#vjJobTrainingInfo #vjSggSelect');
						$that.html('');
						$that.append($('<option/>', {text : '전체', value : ''}));

						// sort
						var dataList = $(data).find("scn_list").get();
						dataList.sort(function(a, b){
					          var val1 =$(a).find("rsltName").text();
					          var val2 =$(b).find("rsltName").text();
					          
					          return (val1 < val2) ? -1 : (val1 > val2) ? 1 : 0; 
					    });
						
						// binding
						$(dataList).each(function(){
							$that.append($('<option/>', {
								text : $(this).find("rsltName").text(), 
								value : $(this).find("rsltCode").text()}));
	            		});
	            	} else {
	            		alert("failed!!!");
	            	}
	            },
	            error :  function (jqXHR, exception) {
					var msg = '';
					
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested XML parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					alert(msg);
				},
				beforeSend:function(){
					$workRoad.ui.showLoading();
				},
				complete:function(){
					$workRoad.ui.hideLoading();
				},
	        });			
//			$.ajax({
//				type: "POST",
//				url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectHRDNetSggList.json",
//				async: false,
//				dataType: "json",
//				data: {sido_cd: pSidoCode},
//				success: function(res) {
//					if(res.errCd == 0){
//						var dataList = res.result.dataList;
//						
//						var $that = $('#vjJobTrainingInfo #vjSggSelect');
//						$that.html('');
//						$that.append($('<option/>', {text : '전체', value : ''}));
//						
//						$.each(dataList, function(cnt, node) {
//							$that.append($('<option/>', {
//														text : node.nm, 
//														value : node.cd}));
//						});
//						
//					} else {
//						alert('failed!');
//					}
//				} ,
//				error:function(err) {
//					alert(err.responseText);
//				}  
//			});
		},	
		/**
		 * @name         : getJobTrainingCourse
		 * @description  : 
		 * @date         : 2018.10.18
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.14	ywKim	변경 : openApi 호출을 js버전으로 변경
		 * @params	pSidoCode : HRD-Net 시도 코드
		 */
		getJobTrainingCourse : function(pSidoCode, pSggCode, pPage) {
			var dataParams = {};
			dataParams.rcrjss = $vjJobTrainingInfo.ui.jobClassificationCode;
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectHRDNetJobTrainingCourse.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if(res.errCd == 0){
						if (res.result.codeMap) {
							$vjJobTrainingInfo.ui.getJobTrainingCourse2(pSidoCode, pSggCode, pPage, res.result.codeMap);
						}
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
//			var dataParams = {};
//			dataParams.rcrjss = $vjJobTrainingInfo.ui.jobClassificationCode;
//			dataParams.sido_cd = pSidoCode;
//			if (pSggCode != null && pSggCode != "") {
//				dataParams.sgg_cd = pSggCode;
//			}
//			dataParams.page_num = (typeof pPage == 'undefined') ? 1 : pPage;				// 페이지 번호
//			dataParams.pageSize = $vjJobTrainingInfo.ui.pageSize;								// 페이지 사이즈
//			
//			$.ajax({
//				type: "POST",
//				url : contextPath + "/ServiceAPI/workRoad/viewJobs/selectHRDNetJobTrainingCourse.json",
//				async: false,
//				dataType: "json",
//				data: dataParams,
//				success: function(res) {
//					if(res.errCd == 0){
//						var dataList = res.result.dataList;						
//						
//						console.log("total_count : " + res.result.total_count);
//						console.log("pageSize : " + res.result.pageSize);
//						console.log("curPage : " + res.result.curPage);
//						
//						$workRoadPaging.ui.init("#vjJobTrainingInfo", res.result.pageSize, $vjJobTrainingInfo.ui.pageGroupCount, $vjJobTrainingInfo.ui.changePage);
//						$workRoadPaging.ui.set(res.result.curPage, res.result.total_count);
//						$workRoadPaging.ui.draw();
//
//						$vjJobTrainingInfo.ui.drawGrid("#vjJobTrainingInfo #vjRows", dataList);
//					} else {
//						alert('failed!');
//					}
//				} ,
//				error:function(err) {
//					alert(err.responseText);
//				}  
//			});			
		},
		/**
		 * @name         : getJobTrainingCourse2
		 * @description  : getJobTrainingCourse() 후행 작업
		 * @date         : 2019.01.14
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.14	ywKim	변경 : openApi 호출을 js버전으로 변경에 따라 getJobTrainingCourse() 함수 분리
		 * @params	pSidoCode : HRD-Net 시도 코드
		 */
		getJobTrainingCourse2 : function(pSidoCode, pSggCode, pPage, pCodeMap) {
			var pDataParams = {};
			pDataParams.rcrjss = $vjJobTrainingInfo.ui.jobClassificationCode;
			pDataParams.sido_cd = pSidoCode;
			if (pSggCode != null && pSggCode != "") {
				pDataParams.sgg_cd = pSggCode;
			}
			pDataParams.page_num = (typeof pPage == 'undefined') ? 1 : pPage;				// 페이지 번호
			pDataParams.pageSize = $vjJobTrainingInfo.ui.pageSize;								// 페이지 사이즈
			
			var pSido = pDataParams.sido_cd;
			var pSgg = pDataParams.sgg_cd;
			var pPageNum = (pDataParams.page_num == undefined) ? 1 : pDataParams.page_num;
			var pPageSize = (pDataParams.pageSize == undefined) ? 10 : pDataParams.pageSize;
			var pFromDT = "20160701";
			var dt = new Date();
			dt.addDays(6);
			var pToDT = dt.yyyymmdd();
			var pSort = pDataParams.sort;
			var pSortCol = pDataParams.sortCol;

			if (pPageNum == null || pPageNum < 1) { pPageNum = 1; }
			else if (pPageNum > 1000) { pPageNum = 1000; }

			if (pPageSize == null || pPageSize < 10) { pPageSize = 10; }
			else if (pPageSize > 100) { pPageSize = 100; }
			
			if (pSort == null  || pSort != "ASC" && pSort != "DESC") { 
				pSort = "ASC"; 
			}
			
			if (pSortCol == null || 
					(pSortCol != "TOT_FXNUM" && pSortCol != "TR_STT_DT" && pSortCol != "TR_NM_i")) { 
				pSortCol = "TOT_FXNUM"; 
			}

			var lvUrl = "http://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA43/HRDPOA43_1.jsp?";
			lvUrl += "authKey=NBkgOltkVpP6gfHjz5zhNgY2iisuuFMt";
			lvUrl += "&returnType=XML";
			lvUrl += "&outType=1";
			lvUrl += "&pageNum=" + pPageNum.toString();
			lvUrl += "&pageSize=" + pPageSize.toString();
			lvUrl += "&srchTraStDt=" + pFromDT;
			lvUrl += "&srchTraEndDt=" + pToDT;
			
			if (pSido != null && pSido != "") {
				lvUrl += "&srchTraArea1=" + pSido;
			}
			if (pSgg != null && pSgg != "") {
				lvUrl += "&srchTraArea2=" + pSgg;
			}
			
			lvUrl += "&sort=" + pSort;
			lvUrl += "&sortCol=" + pSortCol;

			$.ajax({
				crossOrigin: true,
				url: lvUrl,
				type: 'get', 
				async: false,
//				contentType: "text/xml; charset=euc-kr",  
				dataType: 'xml',
				charset: "euc-kr",
	            success: function(data) {
	            	if (data) {
	            		var dataList = [];
						console.log(data);
						console.log("==============");
						$(data).find("scn_list").each(function(){
							var $that = $(this);
							var ncsCd = $(this).find("ncsCd").text().substr(0, 2);
							
							$.each(pCodeMap, function(cd, nm) {
								if (ncsCd == cd) {
									dataList.push($that);
									return false;
								}
							});
//							$that.append($('<option/>', {
//								text : $(this).find("rsltName").text(), 
//								value : $(this).find("rsltCode").text()}));
	            		});
						
						console.log("==============");
						$.each(pCodeMap, function(cd, nm) {
							console.log(cd);
							console.log(nm);
						});
						
//						var dataList = res.result.dataList;
						var total_count = Number($(data).find("scn_cnt").text());
						var pageSize = Number($(data).find("pageSize").text());
						var curPage = Number($(data).find("pageNum").text());
						
						console.log("total_count : " + total_count);
						console.log("pageSize : " + pageSize);
						console.log("curPage : " + curPage);
						
						$workRoadPaging.ui.init("#vjJobTrainingInfo", curPage, $vjJobTrainingInfo.ui.pageGroupCount, $vjJobTrainingInfo.ui.changePage);
						$workRoadPaging.ui.set(curPage, total_count);
						$workRoadPaging.ui.draw();

						$vjJobTrainingInfo.ui.drawGrid("#vjJobTrainingInfo #vjRows", dataList);
						
	            	} else {
	            		alert("failed!!!");
	            	}
	            },
	            error :  function (jqXHR, exception) {
					var msg = '';
					
					if (jqXHR.status === 0) {
						msg = 'Not connect.\n Verify Network.';
					} else if (jqXHR.status == 404) {
						msg = 'Requested page not found. [404]';
					} else if (jqXHR.status == 500) {
						msg = 'Internal Server Error [500].';
					} else if (exception === 'parsererror') {
						msg = 'Requested XML parse failed.';
					} else if (exception === 'timeout') {
						msg = 'Time out error.';
					} else if (exception === 'abort') {
						msg = 'Ajax request aborted.';
					} else {
						msg = 'Uncaught Error.\n' + jqXHR.responseText;
					}
					alert(msg);
				},
				beforeSend:function(){
					$workRoad.ui.showLoading();
				},
				complete:function(){
					$workRoad.ui.hideLoading();
				},
	        });			
		},
		/**
		 * @name         : 페이지 변경
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.10.12	ywKim	신규
		 * @param pPage  	: 페이지 인덱스
		 */
		changePage : function (pPage) {
			console.log("페이지: " + pPage);
			var sido = $('#vjJobTrainingInfo #vjSidoSelect option:selected').val();
			var sgg = $('#vjJobTrainingInfo #vjSggSelect option:selected').val();
			$vjJobTrainingInfo.ui.getJobTrainingCourse(sido, sgg, pPage);
		},
		/**
		 * @name         : drawGrid
		 * @description  : 
		 * @date         : 2018.10.18
		 * @author	     : ywKim
		 * @history 	 :
		 * 	2019.01.14	ywKim	변경 : openApi 호출을 js버전으로 변경 
		 * @param
		 */
		drawGrid : function (pSender, pDataList) {
			
			$(pSender).html('');
			
			if (pDataList.length == 0) {				
				$(pSender).html('<tr><td colspan="2">검색된 데이터가 없습니다.</></tr>');
				
				return;
			}
			
			$workRoadPaging.ui.show();
			
			for(var  i = 0; i < pDataList.length; i ++) {
				
				// js버전에서 사용 - 2019.01.14	ywKim	추가
				var item = pDataList[i];
				var data = {}
				data.address = (item.find("address").length > 0) ? item.find("address").text() : "";
				data.contents = (item.find("contents").length > 0) ? item.find("contents").text() : "";
				data.courseMan = (item.find("courseMan").length > 0) ? item.find("courseMan").text() : "";
				data.grade = (item.find("grade").length > 0) ? item.find("grade").text() : "";
				data.imgGubun = (item.find("imgGubun").length > 0) ? item.find("imgGubun").text() : "";
				data.instCd = (item.find("instCd").length > 0) ? item.find("instCd").text() : "";
				data.ncsCd = (item.find("ncsCd").length > 0) ? item.find("ncsCd").text() : "";
				data.realMan = (item.find("realMan").length > 0) ? item.find("realMan").text() : "";
				data.regCourseMan = (item.find("regCourseMan").length > 0) ? item.find("regCourseMan").text() : "";
				data.subTitle = (item.find("subTitle").length > 0) ? item.find("subTitle").text() : "";
				data.subTitleLink = (item.find("subTitleLink").length > 0) ? item.find("subTitleLink").text() : "";
				data.superViser = (item.find("superViser").length > 0) ? item.find("superViser").text() : "";
				data.telNo = (item.find("telNo").length > 0) ? item.find("telNo").text() : "";
				data.title = (item.find("title").length > 0) ? item.find("title").text() : "";
				data.titleIcon = (item.find("titleIcon").length > 0) ? item.find("titleIcon").text() : "";
				data.titleLink = (item.find("titleLink").length > 0) ? item.find("titleLink").text() : "";
				data.traEndDate = (item.find("traEndDate").length > 0) ? item.find("traEndDate").text() : "";
				data.traStartDate = (item.find("traStartDate").length > 0) ? item.find("traStartDate").text() : "";
				data.trainTarget = (item.find("trainTarget").length > 0) ? item.find("trainTarget").text() : "";
				data.trainTargetCd = (item.find("trainTargetCd").length > 0) ? item.find("trainTargetCd").text() : "";
				data.trainstCstId = (item.find("trainstCstId").length > 0) ? item.find("trainstCstId").text() : "";
				data.trprDegr = (item.find("trprDegr").length > 0) ? item.find("trprDegr").text() : "";
				data.trprId = (item.find("trprId").length > 0) ? item.find("trprId").text() : "";
				data.yardMan = (item.find("yardMan").length > 0) ? item.find("yardMan").text() : "";
//				var data = pDataList[i];	// 주석처리: java 버전에서 사용 - 2019.01.14	ywKim	변경
				
				var $row = $('<tr/>');
				var html = '';
				html += $vjJobTrainingInfo.ui.getSubjectHtml(data);
				html += $vjJobTrainingInfo.ui.getDetailViewHtml(data);
				$row.html(html);
				
				$(pSender).append($row);
			}
		},
		/**
		 * @name        : getSubjectHtml
		 * @description : 
		 * @date        : 2018.10.18
		 * @author	    : ywKim
		 * @history		: 
		 * @param data	: 
		 */
		getSubjectHtml : function(data) {
			var html = '';

			/* 임시 */
			var str = '';
			str += '<p>address: ' + data.address + '</p>';
			str += '<p>contents: ' + data.contents + '</p>';
			str += '<p>courseMan: ' + data.courseMan + '</p>';
			str += '<p>grade: ' + data.grade + '</p>';
			str += '<p>imgGubun: ' + data.imgGubun + '</p>';
			str += '<p>instCd: ' + data.instCd + '</p>';
			str += '<p>ncsCd: ' + data.ncsCd + '</p>';
			str += '<p>realMan: ' + data.realMan + '</p>';
			str += '<p>regCourseMan: ' + data.regCourseMan + '</p>';
			str += '<p>subTitle: ' + data.subTitle + '</p>';
			str += '<p>subTitleLink: ' + data.subTitleLink + '</p>';
			str += '<p>superViser: ' + data.superViser + '</p>';
			str += '<p>telNo: ' + data.telNo + '</p>';
			str += '<p>title: ' + data.title + '</p>';
			str += '<p>titleIcon: ' + data.titleIcon + '</p>';
			str += '<p>titleLink: ' + data.titleLink + '</p>';
			str += '<p>traEndDate: ' + data.traEndDate + '</p>';
			str += '<p>traStartDate: ' + data.traStartDate + '</p>';
			str += '<p>trainTarget: ' + data.trainTarget + '</p>';
			str += '<p>trainTargetCd: ' + data.trainTargetCd + '</p>';
			str += '<p>trainstCstId: ' + data.trainstCstId + '</p>';
			str += '<p>trprDegr: ' + data.trprDegr + '</p>';
			str += '<p>trprId: ' + data.trprId + '</p>';
			str += '<p>yardMan: ' + data.yardMan + '</p>';
			
			html += '<td>';
			html += '	<div class="subject">';
			html += '		<span class="accent">';
			/*html += '			<span class="point"><a href="#">' + gubun + '</a></span>';*/
			html += '			<a href="#"><span>' + data.title + '</span> </a>';
			html += '		</span>';
			html += '		<p class="details">';
			html += '			<em>' + data.subTitle + ' (' + data.address + ' Tel.' + data.telNo + ')</em>';
			html += '		</p>';
			html += '		<p class="details">';
			html += '			<em>훈련기간: ' + data.traStartDate + ' ~ ' + data.traEndDate + '</em>'; 
			html += '		</p>';
			html += '		<p class="details">';
			html += '			<em>실제훈련비: ' + $workRoad.util.addComma(data.realMan) + ' 원</em>';
			html += '		</p>';
			html += '	</div>';
			html += '</td>';
			
			return html;
		},
		getDetailViewHtml : function(data) {
			var html = '';
			
			html += '<td>';
			html += '	<div class="statis-view"><a href="' + data.subTitleLink + '" target="_blank"><span>홈페이지 바로가기</span></a></div>';
//			html += '	<input type="hidden" value="' + data.jo_data_div + '" />';	// 채용구분
//			html += '	<input type="hidden" value="' + data.jo_no + '" />';		// 구인번호
//			html += '	<input type="hidden" value="37.5558357" />';				// 샘플 지도 위치 (서울 위도 북위 37도)
//			html += '	<input type="hidden" value="126.97028" />';					// 샘플 지도 위치 (서울 경도 동경 126도)
//			html += '	<input type="hidden" value="' + data.pt_x + '" />';			// 지도 위치 (위도)
//			html += '	<input type="hidden" value="' + data.pt_y + '" />';			// 지도 위치 (경도)
			html += '</td>';
			
			return html;
		},
	};	
	
	$vjJobTrainingInfo.event = {
			/**
			 * @name		 : setUIEvent 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("$vjJobTrainingInfo.event.setUIEvent() called.");
				
				// 시도 선택
				$workRoad.event.set('change', '#vjJobTrainingInfo #vjSidoSelect', function() {
					var sido = $(this).val();
					$vjJobTrainingInfo.ui.getSidoCodeList(sido);
				});
				// 검색 Click
				$workRoad.event.set('click', '#vjJobTrainingInfo #vjSearch', function() {
					$vjJobTrainingInfo.ui.changePage(1);
				});
			
			},			
	}		
		
}(window, document));