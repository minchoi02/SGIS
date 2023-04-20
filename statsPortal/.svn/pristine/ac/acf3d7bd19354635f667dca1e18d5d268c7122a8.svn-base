/**
 * 페이징 모듈 
 * 
 * 사용법: 
 * 	1. 초기에 init() 호출
 * 		- 콜백함수 지정 (콜백함수에서는 페이지 버튼 클릭시 처리해야할 내용이 필수포함)
 *  2. 데이터 로드시 set(), draw() 호출
 *  3. 콜백함수에서는 아래 함수 및 변수를 사용 
 *  	- getFirstPage(), getPrevPage(), getNextPage(), getLastPage(), $workRoadPaging.ui.pageGroupCount
 *  
 *  ※ 참고
 *  	vjJobInfoList.js 에서 "$workRoadPaging" 로 검색
 * 
 * history : 
 * 2018.10.12
 * 
 * 
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$workRoadPaging = W.$workRoadPaging || {};
	
	$workRoadPaging.ui = {
		sender : null,
		callBack : null,
			
		// 사용자 옵션 (초기값)
		pageSize : 15,				// PS : 한 화면에 보여줄 목록 개수
		pageGroupCount : 5,			// PGC : 한 화면에 보여지는 페이지 번호의 최대 개수
		
		// 데이터 목록 갯수 조회 결과로 설정
		totalDataSize : 0,			// TS : 데이터 목록의 갯수 / 데이터별로 다르다.

		// 사용자 옵션
		currentPage : 1,			// CP : 현재 페이지 번호
		
		// 계산 결과
		firstPage : 1,				// FP : 현재 PG의 첫번째 페이지 번호
//		endPage : 1,				// EP : 현재 PG의 마지막 페이지 번호 (사용 안함)
		totalPage : 1,				// TP : 총 페이지 갯수
		pageGroupBegin : 1,			// PGB : 현재 PG의 시작 데이터 번호
		pageGroupEnd : 1,			// PGE : 현재 PG의 마지막 데이터 번호
		pageCount : 1,				// PC : 현재 화면에 보여지는 페이지 개수 / TS 에 따라 달라진다.
		
		// 방향 버튼의 활성화 여부
		firstBtnEnabled : false,	// <<
		prevBtnEnabled : false,		// <
		numBtnEnabled : [],			// 1, 2 ... n
		nextBtnEnabled : false,		// >
		lastBtnEnabled : false,		// >>
		
		init : function (pSender, pPageSize, pPageGroupCount, pCallBack) {
			$workRoadPaging.ui.sender = pSender + " #wrPaging",
			$workRoadPaging.ui.pageSize = pPageSize;
			$workRoadPaging.ui.pageGroupCount = pPageGroupCount;
			$workRoadPaging.ui.show();
			if (typeof pCallBack != 'undefined') {
				$workRoadPaging.ui.callBack = pCallBack;				
				$workRoadPaging.event.setUIEvent();
			}
			
			for (var i = 0; i < pPageGroupCount; i++) {
				$workRoadPaging.ui.numBtnEnabled[i] = false;
			}
		},
		set : function (pCurrentPage, pTotalDataSize) {
				
			$workRoadPaging.ui.currentPage = pCurrentPage;

			if (typeof pTotalDataSize != 'undefined') {
				$workRoadPaging.ui.totalDataSize = pTotalDataSize;
			}
			
			$workRoadPaging.ui.firstPage = 
				$workRoadPaging.util.getFirstPage($workRoadPaging.ui.pageGroupCount
												, $workRoadPaging.ui.totalDataSize
												, $workRoadPaging.ui.currentPage);
			$workRoadPaging.ui.totalPage =
				$workRoadPaging.util.getTotalPage($workRoadPaging.ui.totalDataSize
												, $workRoadPaging.ui.pageSize);
			$workRoadPaging.ui.pageGroupBegin =
				$workRoadPaging.util.getPageGroupBegin($workRoadPaging.ui.firstPage
													, $workRoadPaging.ui.pageSize);
			$workRoadPaging.ui.pageGroupEnd = 
				$workRoadPaging.util.getPageGroupEnd($workRoadPaging.ui.firstPage
													, $workRoadPaging.ui.pageGroupCount
													, $workRoadPaging.ui.pageSize);
			$workRoadPaging.ui.pageCount = 
				$workRoadPaging.util.getPageCount($workRoadPaging.ui.pageGroupCount
												, $workRoadPaging.ui.totalDataSize
												, $workRoadPaging.ui.pageSize
												, $workRoadPaging.ui.pageGroupEnd
												, $workRoadPaging.ui.firstPage);
			
			
			$workRoadPaging.ui.prevBtnEnabled = 
				$workRoadPaging.util.prevBtnEnabled($workRoadPaging.ui.currentPage
													, $workRoadPaging.ui.pageGroupCount);
			$workRoadPaging.ui.firstBtnEnabled = $workRoadPaging.ui.prevBtnEnabled;
			$workRoadPaging.ui.numBtnEnabled = 
				$workRoadPaging.util.numBtnEnabled($workRoadPaging.ui.firstPage
													, $workRoadPaging.ui.totalPage
													, $workRoadPaging.ui.pageGroupCount);
			$workRoadPaging.ui.nextBtnEnabled = 
				$workRoadPaging.util.nextBtnEnabled($workRoadPaging.ui.totalDataSize
													, $workRoadPaging.ui.pageGroupEnd);
			$workRoadPaging.ui.lastBtnEnabled = $workRoadPaging.ui.nextBtnEnabled;
		},
		show : function() {
			$('#wrPaging').show();
		},
		hide : function() {
			$('#wrPaging').hide();
		},
		getFirstPage : function () {
			return 1;
		},
		getPrevPage : function () {
			if ($workRoadPaging.ui.firstPage > 1) {
				return $workRoadPaging.ui.firstPage - 1;
			} else {
				return null;
			}			
		},
		getNextPage : function () {
			if ($workRoadPaging.ui.firstPage + $workRoadPaging.ui.pageGroupCount <= $workRoadPaging.ui.totalPage) {
				return $workRoadPaging.ui.firstPage + $workRoadPaging.ui.pageGroupCount;
			} else {
				return null;
			}			
		},
		getLastPage : function () {
			return $workRoadPaging.ui.totalPage;
		},
		
		draw : function () {
			var pSender = $workRoadPaging.ui.sender;
			var $that = $(pSender);
			var $a = null;
			
			$that.empty();
			
			$a = $($workRoadPaging.ui.getFirstBtnHtml());
			if ($workRoadPaging.ui.firstBtnEnabled) {
				$a.removeClass('display');
			} else {
				$a.css('display', 'none');
			}				
			$that.append($a);
			
			$a = $($workRoadPaging.ui.getPrevBtnHtml());
			if ($workRoadPaging.ui.prevBtnEnabled) {
				$a.removeClass('display');
			} else {
				$a.css('display', 'none');
			}				
			$that.append($a);
			
			if ($workRoadPaging.ui.firstPage > 0) {
				for (var i = 0; i < $workRoadPaging.ui.pageGroupCount; i++) {
					var isCurrentPage = ($workRoadPaging.ui.firstPage + i == $workRoadPaging.ui.currentPage) ? true : false;
					
					$a = $($workRoadPaging.ui.getBtnHtml($workRoadPaging.ui.firstPage + i, isCurrentPage));
					
					if ($workRoadPaging.ui.numBtnEnabled[i]) {
						$a.removeClass('display');
					} else {
						$a.css('display', 'none');
					}
					$that.append($a);					
				}
			}
			
			$a = $($workRoadPaging.ui.getNextBtnHtml());
			if ($workRoadPaging.ui.nextBtnEnabled) {
				$a.removeClass('display');
			} else {
				$a.css('display', 'none');
			}				
			$that.append($a);
			
			$a = $($workRoadPaging.ui.getLastBtnHtml());
			if ($workRoadPaging.ui.lastBtnEnabled) {
				$a.removeClass('display');
			} else {
				$a.css('display', 'none');
			}				
			$that.append($a);
		},
		getFirstBtnHtml : function () {
			return '<a class="first" href="javascript:void(0)">&lt;&lt;</a>';
		},
		getPrevBtnHtml : function () {
			return '<a class="prev" href="javascript:void(0)">&lt;</a>';
		},
		getBtnHtml : function (pPage, pIsCurrentPage) {
			if (typeof pIsCurrentPage != 'undefined' && pIsCurrentPage == true) {
				return '<a class="page strong" href="javascript:void(0)">' + pPage + '</a>';
			} else {
				return '<a class="page" href="javascript:void(0)">' + pPage + '</a>';
			}
		},		
		getNextBtnHtml : function () {
			return '<a class="next" href="javascript:void(0)">&gt;</a>';
		},
		getLastBtnHtml : function () {
			return '<a class="last" href="javascript:void(0)">&gt;&gt;</a>';
		},
		/*
		 * @param pIndex  	: 페이징 버튼의 index
		 */
		getPage : function (pIndex) {
			var page = $($workRoadPaging.ui.sender).find('a').eq(pIndex).html();
			return page;
		}
	};
	
	$workRoadPaging.util = {
		/* 내부함수
		 */
			
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pgc	 : 한 화면에 보여지는 페이지 번호의 최대 개수
		 * @param	ts   : 데이터 목록의 갯수 / 데이터별로 다르다.
		 * @param	cp   : 현재 페이지 번호
		 */		
		getFirstPage : function (pgc, ts, cp) {
			var fp = 0;
			
			if (ts > 0) {
				fp = Math.floor((cp - 1) / pgc) * pgc + 1;
			}
			
			return fp;
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	ts   : 
		 * @param	ps   : 한 화면에 보여줄 목록 개수
		 */
		getTotalPage : function(ts, ps) {
			var tp = 0;			
			tp = Math.floor((ts - 1) / ps) + 1;
			return tp;
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	fp   : 현재 PG의 첫번째 페이지 번호
		 * @param	ps   : 한 화면에 보여줄 목록 개수
		 */
		getPageGroupBegin : function (fp, ps) {
			var pgb = 0;
			pgb = (fp - 1) * ps + 1;
			return pgb;
		},		
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	fp   : 현재 PG의 첫번째 페이지 번호
		 * @param	pgc  : 한 화면에 보여지는 페이지 번호의 최대 개수
		 * @param	ps   : 한 화면에 보여줄 목록 개수
		 */
		getPageGroupEnd : function(fp, pgc, ps) {
			var pge = 0;			
			pge = (Math.floor((fp - 1) / pgc) + 1) * pgc * ps;
			return pge;
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pgc  : 한 화면에 보여지는 페이지 번호의 최대 개수
		 * @param	ts   : 데이터 목록의 갯수 / 데이터별로 다르다.
		 * @param	ps   : 한 화면에 보여줄 목록 개수
		 * @param	pge  : 현재 PG의 마지막 데이터 번호
		 * @param	fp   : 현재 PG의 첫번째 페이지 번호
		 */
		getPageCount : function (pgc, ts, ps, pge, fp) {
			var pc = 0;
			
			if (ts >= pge) {
				pc = pgc;
			} else {
				pc = Math.floor((ts - 1) / ps) - fp + 2;
			}

			return pc;
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	cp   : 현재 페이지 번호
		 * @param	pgc  : 한 화면에 보여지는 페이지 번호의 최대 개수
		 */
		prevBtnEnabled : function (cp, pgc) {
			
			if (cp > pgc) {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	fp   : 현재 PG의 첫번째 페이지 번호
		 * @param	tp	 : 총 페이지 갯수 
		 * @param	pgc  : 한 화면에 보여지는 페이지 번호의 최대 개수
		 */
		numBtnEnabled : function (fp, tp, pgc) {
			var resultData = [];
			for (var i = 0; i < pgc; i++) {
				
				if (i + fp <= tp) { 
					resultData[i] = true;
				} else {
					resultData[i] = false;
				}
			}
			
			return resultData;
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	ts   : 데이터 목록의 갯수 / 데이터별로 다르다.
		 * @param	pge  : 현재 PG의 마지막 데이터 번호
		 */
		nextBtnEnabled : function (ts, pge) {
			if (pge >= ts) {
				return false;
			} else {
				return true;
			}
		},
		
	};
	
	$workRoadPaging.event = {
			/**
			 * @name		 : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date		 : 2018.09.01 
			 * @author		 : ywKim
			 * @history 	 :
			 * @param
			 */
			setUIEvent: function() {
				console.log("$workRoadPaging.event.setUIEvent() called.");
				
				$workRoad.event.set("click", $workRoadPaging.ui.sender + " a", function() {
					if ($workRoadPaging.ui.callBack != null) {
						var idx = $(this).index();
						var page = -1;
						
						if (idx == 0) {
							page = $workRoadPaging.ui.getFirstPage();
						} else if (idx == 1) {
							page = $workRoadPaging.ui.getPrevPage();
						} else if (idx == $workRoadPaging.ui.pageGroupCount + 2) {
							page = $workRoadPaging.ui.getNextPage();
						} else if (idx == $workRoadPaging.ui.pageGroupCount + 3) {
							page = $workRoadPaging.ui.getLastPage();
						} else {
							page = $workRoadPaging.ui.getPage(idx);
						}
						
						if (page != null) {
							$workRoadPaging.ui.callBack(page);
						}
					}
				});
			},
	};
	

}(window, document));