/**
 * 일자리 맵 서비스 > 일자리 보기
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
	W.$wrmViewJobs = W.$wrmViewJobs || {};	// WorkRoadMap View Jobs
		
	$wrmViewJobs.ui = {
		today : "20180101",
		
		defaultSidoCd : '25',			// 현재 시도 코드 : 11:서울특별시
		defaultSggCd : '030',			// 현재 시군구 코드
		defaultSidoNm : '대전광역시',	 	// 현재 시도 이름
		defaultSggNm : '서구',			// 현재 시군구 이름
		defaultSidoCoorX : null,		// 현재(선택된) 시도의 중심 좌표
		defaultSidoCoorY : null,
		defaultSggCoorX : null,			// 현재(선택된) 시군구의 중심 좌표
		defaultSggCoorY : null,

		sidoList : null,				// Array() : [{sido_cd, sido_nm, x_coor, y_coor} ...]
		sggList : null,					// Array() : [{sgg_cd, sgg_nm, x_coor, y_coor} ... ]
		
		// v2. for Multi Condition
		conditionList : [],
		// v1. for Single Condition
//		conditionIndex : 0,				// 선택된 조건 구분 (0:희망지역, 1:기업형태, 3:산업분류 ...)
//		conditionType : '',				// 선택된 조건 구분
//		conditionCodeArr : [],			// 선택된 조건 코드 값 배열
//		conditionWageType : '',			// 임금형태 (기본: 일급)
		sidoPT : null,	// 2020.07.23[한광희] 사람인 추가로 인한 조회 수정
		sggPT : null,	// 2020.07.23[한광희] 사람인 추가로 인한 조회 수정
		
		/**
		 * @name         : 초기화
		 * @description  : 최초 화면을 초기화 합니다.
		 * 					기본적으로 각 페이지 (서브메뉴, 레이어, 팝업, 데이터보드 컨텐츠 등등)를 로드합니다.
		 * @date         : 2018.09.07
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param id     : 아이디
		 * @param seq    : 순번
		 */
		init : function(id, seq) {
			$workRoad.ui.appendMap("/view/workRoad/viewJobs/vjMap");
			$workRoad.ui.appendDataBoard("/view/workRoad/viewJobs/vjDataBoard");
			
			// 조건 관련 레이어
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjConditionList");
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선.
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectAll");				// 통합검색
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectDesiredArea");				// 희망지역
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectCompanyType");				// 기업형태
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectIndustryClassification");	// 산업분류
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectJobClassification");		// 직종분류
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectSalaryLevel");				// 급여수준
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectEmploymentType");			// 고용형태
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectAcademicAbility");			// 학력
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjSelectCareer");					// 경력
			
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjJobInfoList");
			$workRoad.ui.appendContent("/view/workRoad/viewJobs/vjLivingEnvironment");
			
			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '03', '01', '01', '', '');
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
		ready : function () {
			$wrmViewJobs.ui.getToday();
			
			$vjMap.noReverseGeoCode = true;
			$vjMap.ui.createMap("mapRgn_1", 0);

			$wrmViewJobs.ui.setSidoList();
			$wrmViewJobs.ui.getJobCount();
		},
		clear : function () {
//			$wrmViewJobs.ui.defaultSidoCd = '11';
//			$wrmViewJobs.ui.defaultSggCd = '';
//			$wrmViewJobs.ui.defaultSidoNm = '서울특별시';
//			$wrmViewJobs.ui.defaultSggNm = '';
//
//			$wrmViewJobs.ui.sidoList = null;
//			$wrmViewJobs.ui.sggList = null;
			
			$wrmViewJobs.ui.conditionList = [];
			//2019-06-10 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) START
			$vjConditionList.ui.clear();
			//2019-06-10 [김남민] 구인현황 분석 > 업종별 직종별 등 분석조건을 AND 조건이 가능하게 개선(교차분석) END
			
			$vjMap.ui.clearAllJobLocationMarker();
			$vjMap.ui.clearJobLocation();
			$vjMap.ui.clearJobCountMarker();
			
			$wrmViewJobs.ui.getJobCount();
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
			var $jobList = $("#vjJobInfoList");
			var $env = $("#vjLivingEnvironment");
			
			var style = {};
			style.left = pLeft + "px";
			if (pTop != undefined) {
				style.top = pTop + "px";
			}

			$jobList.stop().animate(style, 200);
			if ($env.css("display") != "none") {
//				if ($jobList.find("#vjToggle").attr("data-show")) {// 구인정보목록 레이어가 토글된 상태인지					
//				} else {					
//				}
				var lvLeft = $jobList.width();
				if (lvLeft != undefined) lvLeft = 740;	// 740: 구인정보목록 레이어의 기본 너비 
				style.left = pLeft + lvLeft + "px";
				style.top = pTop + "px";
				$env.stop().animate(style, 200);
			}
		},
		/** 
		 * @name         : getToday
		 * @description  : 구인정보 목록 기준일 구하기
		 *  				최신 데이터 등록일
		 * @date         : 2018. 11. 19 
		 * @author	     : ywKim
		 * @history 	 :
		 */
		getToday : function() {
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/viewJobs/getToday.json",
				async: false,
				dataType: "json",
//				data: { separator: " ", year: "년", month: "월", day: "일" },
				success: function(res) {
					if (res.errCd == 0) {
						$wrmViewJobs.ui.today = res.result;
					} else {
						alert('failed!');
					}
				} ,
				error:function(err) {
					alert(err.responseText);
				}  
			});
		},
		/*
		 * 시도 목록 만들기
		 */
		setSidoList : function () {
			$workRoad.ui.getSidoList(bndYear, function(pSidoList) {
				$wrmViewJobs.ui.sidoList = pSidoList;		
				
				$wrmViewJobs.ui.setSggList($wrmViewJobs.ui.defaultSidoCd);
			});
		},
		/*
		 * 시군구 목록 만들기
		 */
		setSggList : function (pSidoCd) {
			$workRoad.ui.getSggList(bndYear, pSidoCd, function(sggList) {
				$wrmViewJobs.ui.sggList = sggList;
			});
		},
		/*
		 * 시도 목록에서 항목 추출
		 */
		getSidoItem : function (pSidoCode) {
			if ($wrmViewJobs.ui.sidoList == null) {
				return null;
			}
			
			for (var i = 0; i < $wrmViewJobs.ui.sidoList.length; i++) {
				if ($wrmViewJobs.ui.sidoList[i].sido_cd == pSidoCode) {
					return $wrmViewJobs.ui.sidoList[i]; 
				}
			}
			return null;
		},
		/*
		 * 시군구 목록에서 항목 추출
		 */
		getSggItem : function (pSggCode) {
			if ($wrmViewJobs.ui.sggList == null) {
				return null;
			}
			
			for (var i = 0; i < $wrmViewJobs.ui.sggList.length; i++) {
				if ($wrmViewJobs.ui.sggList[i].sgg_cd == pSggCode) {
					return $wrmViewJobs.ui.sggList[i]; 
				}
			}
			return null;
		},
		/**
		 * @name         : 공통 코드 조회 
		 * @description  : 
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 * 		pParams				: 분류코드 값 or 파라미터 목록
		 * 			- 파라미터 목록인 경우
		 * 				B_CLASS_CD		: 분류코드
		 * 				S_CLASS_CD_LEN	: 코드길이
		 * 		pSuccessCallBack	: 호출 성공시 콜백함수
		 * 		pErrorCallBack		: 호출 실패시 콜백함수
		 * @dataList
		 *		CD		: 코드
		 * 		NM		: 코드명
		 */
		selectConditionList : function(pParams, pSuccessCallBack, pErrorCallBack) {
			
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/viewJobs/selectConditionList.json",
				async: false,
				dataType: "json",
				data: pParams,
				success: function(res) {
					if (res.errCd == 0) {
						var dataList = res.result.dataList;
						
						if (typeof pSuccessCallBack !== 'undefined') {
							pSuccessCallBack(dataList);
						}
					} else {
						if (typeof pErrorCallBack !== 'undefined') {
							pErrorCallBack('failed!');
						} else {
							alert('failed!');
						}
					}
				} ,
				error:function(err) {
					if (typeof pErrorCallBack !== 'undefined') {
						pErrorCallBack(err.responseText);
					} else {
						alert(err.responseText);
					}
				}  
			});
		},
		/**
		 * @name         : 
		 * @description  : 
		 * @date         : 2018.10.02
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		drawConditionItems : function(pSelector, pDataList) {
			var $li;
			var $input;
			var $label;
			var cndId = $vjConditionList.ui.getConditionId(pSelector);
			var cndItem = $wrmViewJobs.ui.getCondition(cndId);
			var checked = "";
			var on = "";
			
			$(pSelector).empty();
			
			for(var  i = 0; i < pDataList.length; i ++) {
				
				$li = $("<li/>");
				$input = $("<input/>");
				$label = $("<label/>");

				if (cndItem != null && cndItem.codeList.indexOf(pDataList[i].cd) >= 0) {
					$input.attr("checked", "checked");
					$label.addClass("on");
				} 
				
				var text = pDataList[i].nm;
				if (pDataList[i].cnt != 'undefined' && pDataList[i].cnt > 0) {
					text += " (" + $workRoad.util.addComma(pDataList[i].cnt) + "건)";
				}
				$label.text(text);
				
				if (pDataList[i].exp != 'undefined' && pDataList[i].exp.trim().length > 0) {
					
					if (pDataList[i].exp != "사업단정의추가" &&
						pDataList[i].exp != "워크넷제공 기업형태코드" &&
						pDataList[i].exp != "워크넷제공 고용형태코드" &&
						pDataList[i].exp != "워크넷제공 학력코드" &&
						pDataList[i].exp != "워크넷제공 경력코드" &&
						pDataList[i].exp != "표준산업분류10차개정" &&
						pDataList[i].exp != "한국고용분류체계") {
						$label.attr("data-subj", pDataList[i].nm);
						$label.attr("title", pDataList[i].exp);
					}
				}
				
				$input.attr("type", "checkbox");
				$input.attr("name", "condition");
				$input.attr("id", "rb" + (i+1));
				$input.val(pDataList[i].cd);
				
				$label.attr("for", "rb" + (i + 1));
				
				$($li).append($input);
				$($li).append($label);
				$(pSelector).append($li);
			}
		},	
		/**
		 * @name         : 조건 인덱스 설정 
		 * @description  : 
		 * @date         : 2018.10.04
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */	
//		setConditionIndex : function (pIndex) {
//			this.conditionIndex = pIndex;
//			
//			switch (pIndex) {
//			case 0: this.conditionType = ''; break;//'DESIRED_AREA'; break;
//			case 1: this.conditionType = 'COMPANY_TYPE'; break;
////			case 2: this.conditionType = 'COMPANY_SIZE'; break;
//			case 3: this.conditionType = 'INDUSTRY_CLASSIFICATION'; break;
//			case 4: this.conditionType = 'JOB_CLASSIFICATION'; break;
//			case 5: this.conditionType = 'SALARY_LEVEL'; break;
//			case 6: this.conditionType = 'EMPLOYMENT_TYPE'; break;
////			case 7: this.conditionType = 'WORK_TYPE'; break;
//			case 8: this.conditionType = 'ACADEMIC_ABILITY'; break;
//			case 9: this.conditionType = 'CAREER'; break;
//			}
//		},
		getCondition : function (pId) {
//			var id = pId;
//			if (pId.split(" ").length > 1) {
//				id = pId.split(" ")[0].replace("#vjSelect", "").replace("#", "");
//			}
			
//			if ($wrmViewJobs.ui.conditionList.includes(pId)) {
				for (var i = 0; i < $wrmViewJobs.ui.conditionList.length; i++) {
					if ($wrmViewJobs.ui.conditionList[i].id == pId) {
						return $wrmViewJobs.ui.conditionList[i];
					}
				}
//			}
			
			return null;
		},
		/**
		 * @name         : 선택된 조건 구하기 
		 * @description  : 
		 * @date         : 2018.10.04
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */
		// v2. Multi Condition
		setConditionCode : function (pIdSelector, pParams) {
			var item = null;
			var codeList = [];
			var cndId = $vjConditionList.ui.getConditionId(pIdSelector);
//			var id = pIdSelector.replace("#vjSelect", "");
			
            $.each($(pIdSelector + " input[name='condition']"), function(){
            	if($(this).attr("checked") == "checked") {
            		codeList.push($(this).val());
            	}
            });

//            if (codeList.length > 0) {
            	item = $wrmViewJobs.ui.getCondition(cndId);
            	if (item == null) {
					item = {id : cndId};
					$wrmViewJobs.ui.conditionList.push(item);
				}
				
	            item.codeList = codeList;
	            
	            if (cndId == "SALARY_LEVEL" && pParams != undefined && pParams.wageType != undefined) {
	            	item.wageType = pParams.wageType;
	            }
	            
	            //2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
	            if ($(pIdSelector).is("input")) {
	            	if($(pIdSelector).val() != "") item[cndId] = $(pIdSelector).val();
	            	else item[cndId] = null;
	            }
	            //2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
//	            return true;
//            } else {
//            	return false;
//            }
		},
		// v1. Single Condition
//		setConditionCode : function (pId) {
//			$wrmViewJobs.ui.conditionCodeArr = [];
//			
//            $.each($(pId + " input[name='condition']"), function(){
//            	if($(this).attr("checked") == "checked") {
//            		$wrmViewJobs.ui.conditionCodeArr.push($(this).val());
//            	}
//            });
//            
//            return $wrmViewJobs.ui.conditionCodeArr;
//		},
		/**
		 * @name         : 주어진 지역으로 지도 이동하기 
		 * @description  : 
		 * @date         : 2018.10.11
		 * @author	     : ywKim
		 * @history 	 : 
		 * @param
		 */	
		naviConfirm : function (pSidoPT, pSggPT, pZoom) {
			var a = 0;
			
			/** 2020.07.23[한광희] 사람인 추가로 인한 조회 수정 START */
			$wrmViewJobs.ui.sidoPT = pSidoPT;
			$wrmViewJobs.ui.sggPT = pSggPT;
			/** 2020.07.23[한광희] 사람인 추가로 인한 조회 수정 END */
			
			if (pSggPT != undefined) {
				$vjMap.ui.mapList[0].mapMove(pSggPT, 7);
			}
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
			else if (pSidoPT != undefined) {
				$vjMap.ui.mapList[0].mapMove(pSidoPT, 5);
			}
			else {
				$vjMap.ui.mapList[0].mapMove([989674, 1818313], 2);	// 전국
			}
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
			
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if(gv_url == "myNeighberhoodJob" && (gv_type == "full" || gv_type == "lnb") && gv_zoom_first_yn == "Y" && gv_coord_x_first_yn == "Y" && gv_coord_y_first_yn == "Y") {
				gv_zoom_first_yn = "N";
				gv_coord_x_first_yn = "N";
				gv_coord_y_first_yn = "N";
				
				var lvMapZoom = $vjMap.ui.mapList[0].zoom;
				var lvMapCenter = $vjMap.ui.mapList[0].center;
                var lvMapCenterX = lvMapCenter[0];
                var lvMapCenterY = lvMapCenter[1];
				
                if(gv_zoom != "") lvMapZoom = gv_zoom;
                if(gv_coord_x != "") lvMapCenterX = gv_coord_x;
                if(gv_coord_y != "") lvMapCenterY = gv_coord_y;
                
				$vjMap.ui.mapList[0].mapMove([lvMapCenterX, lvMapCenterY], lvMapZoom);
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
		},
		
		//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. START
		/**
		 * @name         : 전체 일자리 보기
		 * @description  : 
		 * @date         : 2019.05.07 
		 * @author	     : 김남민
		 * @history 	 :
		 * @return		 : 성공 여부
		 */
		viewAllJob : function() {
			$wrmViewJobs.ui.defaultSidoCd = "all";
			$wrmViewJobs.ui.defaultSidoNm = "전체";
			
			$wrmViewJobs.ui.defaultSggCd = "all";
			$wrmViewJobs.ui.defaultSggNm = "";
			
			$vjJobInfoList.ui.show();
			return true;
		},
		//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. END
		
		/**
		 * @name         : 내 주변 일자리 보기
		 * @description  : 
		 * @date         : 2018.10.30 
		 * @author	     : ywKim
		 * @history 	 :
		 * @return		 : 성공 여부
		 */
		viewMyNeighberhoodJob : function() {
			// 2019.03.13 접근log 생성
			srvLogWrite('D0', '03', '02', '01', '', '');
			
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. START
			if((gv_url == "viewJobs" || gv_url == "myNeighberhoodJob") && (gv_type == "full" || gv_type == "lnb") && gv_sido_cd != "") {
				$wrmViewJobs.ui.defaultSidoCd = gv_sido_cd;
				if($wrmViewJobs.ui.sidoList != null && $wrmViewJobs.ui.sidoList.length > 0) {
					for(var i = 0; i < $wrmViewJobs.ui.sidoList.length; i++) {
						if(gv_sido_cd == $wrmViewJobs.ui.sidoList[i].sido_cd) {
							$wrmViewJobs.ui.defaultSidoNm = $wrmViewJobs.ui.sidoList[i].sido_nm;
							break;
						}
					}
				}
				//$wrmViewJobs.ui.defaultSidoNm = $workRoad.ui.mySidoNm;
				
				$wrmViewJobs.ui.setSggList(gv_sido_cd);
				if(gv_sgg_cd == "") {
					gv_sgg_cd = "999";
				}
				$wrmViewJobs.ui.defaultSggCd = gv_sgg_cd;
				if($wrmViewJobs.ui.sggList != null && $wrmViewJobs.ui.sggList.length > 0) {
					for(var i = 0; i < $wrmViewJobs.ui.sggList.length; i++) {
						if(gv_sgg_cd == $wrmViewJobs.ui.sggList[i].sgg_cd) {
							$wrmViewJobs.ui.defaultSggNm = $wrmViewJobs.ui.sggList[i].sgg_nm;
							break;
						}
					}
				}
				if(gv_sgg_cd == "999") {
					$wrmViewJobs.ui.defaultSggNm = "전체";
				}
				//$wrmViewJobs.ui.defaultSggNm = $workRoad.ui.mySggNm;
			}
			else {
				if ($workRoad.ui.mySidoCd.length == 0) return false;
				
				$wrmViewJobs.ui.defaultSidoCd = $workRoad.ui.mySidoCd;
				$wrmViewJobs.ui.defaultSidoNm = $workRoad.ui.mySidoNm;
				
				$wrmViewJobs.ui.setSggList($workRoad.ui.mySidoCd);
				
				$wrmViewJobs.ui.defaultSggCd = $workRoad.ui.mySggCd;
				$wrmViewJobs.ui.defaultSggNm = $workRoad.ui.mySggNm;
			}
			//2019-05-14 [김남민] 지자체 활용 확산을 위한 맞춤형 일자리맵 개발. END
			
			var sidoItem = $wrmViewJobs.ui.getSidoItem($wrmViewJobs.ui.defaultSidoCd);
			var sggItem = $wrmViewJobs.ui.getSggItem($wrmViewJobs.ui.defaultSggCd);
			
			if (sidoItem != null) {
				if (sggItem != null) {
					$wrmViewJobs.ui.naviConfirm([sidoItem.x_coor, sidoItem.y_coor], [sggItem.x_coor, sggItem.y_coor]);
				} else if (sidoItem != null){
					$wrmViewJobs.ui.naviConfirm([sidoItem.x_coor, sidoItem.y_coor], null);
				}
			} else {
				return false;
			}
			
			$vjJobInfoList.ui.show();
			return true;
		},
		
		/** 
		 * @name         : getJobCount
		 * @description  : 시도별, 시군구별 구인건수 조회
		 * @date         : 2019.01.25 
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pSido	: 시도코드
		 */
		getJobCount : function(pSido, pX, pY) {
			var dataParams = {};
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선.START
			dataParams = $vjJobInfoList.ui.getDataParams();
			dataParams.sgg_cd = "all";
			
			if (pSido != undefined) {
				dataParams.sido_cd = pSido;
			}
			else {
				dataParams.sido_cd = "all";
			}
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
			if ($wrmViewJobs.ui.today != undefined) {
				dataParams.today = $wrmViewJobs.ui.today; 
			}
			
			$.ajax({
				type: "POST",
				url : contextPath + "/ServiceAPI/workRoad/viewJobs/getJobCount.json",
				async: false,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						
						if (pSido == undefined) {
							$vjMap.ui.markJobCount(res.result.dataList, null, null, null, $wrmViewJobs.ui.callback_MarkerClicked);
						} else {
							$vjMap.ui.markJobCount(res.result.dataList, pSido, pX, pY, $wrmViewJobs.ui.callback_MarkerClicked);
						}
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
		 * @name         : callback_MarkerClicked
		 * @description  : 시도별, 시군구별 구인건수 마커 클릭에 대한 콜백함수
		 * @date         : 2019.01.30
		 * @author	     : ywKim
		 * @history 	 :
		 */
		callback_MarkerClicked : function(pSidoCd, pSggCd, pX, pY) {
			console.log("시도: " + pSidoCd);
			console.log("시군구: " + pSggCd);
			
			if (pSidoCd != undefined) {
				$wrmViewJobs.ui.defaultSidoCd = pSidoCd;
				$wrmViewJobs.ui.defaultSggCd = "999";
				$wrmViewJobs.ui.defaultSidoNm = "";
				//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
				if($wrmViewJobs.ui.sidoList != null && $wrmViewJobs.ui.sidoList.length > 0) {
					for(var i = 0; i < $wrmViewJobs.ui.sidoList.length; i++) {
						if(pSidoCd == $wrmViewJobs.ui.sidoList[i].sido_cd) {
							$wrmViewJobs.ui.defaultSidoNm = $wrmViewJobs.ui.sidoList[i].sido_nm;
							break;
						}
					}
				}
				//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
				$wrmViewJobs.ui.defaultSggNm = "";
				//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
				$wrmViewJobs.ui.setSggList(pSidoCd);
				if($wrmViewJobs.ui.sggList != null && $wrmViewJobs.ui.sggList.length > 0) {
					for(var i = 0; i < $wrmViewJobs.ui.sggList.length; i++) {
						if(pSggCd == $wrmViewJobs.ui.sggList[i].sgg_cd) {
							$wrmViewJobs.ui.defaultSggNm = $wrmViewJobs.ui.sggList[i].sgg_nm;
							break;
						}
					}
				}
				if($wrmViewJobs.ui.defaultSggNm == "") $wrmViewJobs.ui.defaultSggNm = "전체";
				//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
				$wrmViewJobs.ui.defaultSidoCoorX = pX;
				$wrmViewJobs.ui.defaultSidoCoorY = pY;
				$wrmViewJobs.ui.defaultSggCoorX = null;
				$wrmViewJobs.ui.defaultSggCoorY = null;
					
				//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
				if (pSggCd == undefined && (pSidoCd == "11" || pSidoCd == "31")) {// 서울, 경기
					$vjJobInfoList.ui.show();
					$wrmViewJobs.ui.getJobCount(pSidoCd, pX, pY);
				} else {
					if (pSggCd != undefined) {
						$wrmViewJobs.ui.defaultSggCd = pSggCd;
					}
					$vjJobInfoList.ui.show();
					//$vjJobInfoList.ui.loadJobPoiList();
				}
				//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
			}
		}
		
	};	
	
	$wrmViewJobs.event = {
		/**
		 * @name		 : setUIEvent 
		 * @description  :  
		 * @date		 :  
		 * @author		 : 
		 * @history 	 :
		 */
		setUIEvent: function() {
			console.log("$wrmViewJobs.event.setUIEvent() called.");
			
			$vjMap.event.setUIEvent();
			$vjDataBoard.event.setUIEvent();
			
			$vjConditionList.event.setUIEvent();
			//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선.
			$vjSelectAll.event.setUIEvent();
			$vjSelectDesiredArea.event.setUIEvent();
			$vjSelectCompanyType.event.setUIEvent();
			$vjSelectIndustryClassification.event.setUIEvent();
			$vjSelectJobClassification.event.setUIEvent();
			$vjSelectSalaryLevel.event.setUIEvent();
			$vjSelectEmploymentType.event.setUIEvent();
			$vjSelectAcademicAbility.event.setUIEvent();
			$vjSelectCareer.event.setUIEvent();
		
			$vjJobInfoList.event.setUIEvent();
			$vjLivingEnvironment.event.setUIEvent();
		},		
	}
	
}(window, document));