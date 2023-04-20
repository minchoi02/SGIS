var bndYear = "2021";

(function(W, D) {

	W.$myNeighberhoodJobMap = W.$myNeighberhoodJobMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		//페이지 기본 이벤트 등록
		$myNeighberhoodJobMap.event.setUIEvent();
						
		//지도 세팅
		$myNeighberhoodJobMap.event.setMapSize();
		$myNeighberhoodJobMap.ui.createMap("map");
		
		//네비게이션 추가
		$(".leftCol .btnNavThematic").click(function(){
			if(!$(this).hasClass('active')){
	    		$(this).addClass('active');
	    		$(".nav-layer").css("display","block");
	    		//2022-10-20 이벤트 추가 
	    		$("#myNeighberhoodJobListPopup").animate({
					top : $(window).outerHeight(true)
				},400,function(){
					$("#myNeighberhoodJobListPopup").hide();
				});
	    		$("#myNeighberhoodJobSearchPopup").css("display","none");
	    	}else{
	    		$(this).removeClass('active');
	    		$(".nav-layer").css("display","none");
	    	}
	    });
		//2022-10-20 이벤트 추가 
		$("#myNeighberhoodJobListPopup_open").click(function(){
    		$(this).addClass('active');
    		$(".nav-layer").css("display","none");
    		$(".leftCol .btnNavThematic").removeClass('active');
    		$("#myNeighberhoodJobSearchPopup").css("display","none");
		});
		//2022-10-20 이벤트 추가 
		$("#myNeighberhoodJobSearch").click(function(){
    		$(this).addClass('active');
    		$(".nav-layer").css("display","none");
    		$(".leftCol .btnNavThematic").removeClass('active');
    		$(".nav-layer").css("display","none");
    		$("#myNeighberhoodJobListPopup").animate({
				top : $(window).outerHeight(true)
			},400,function(){
				$("#myNeighberhoodJobListPopup").hide();
			});
			//2022-11-04 상세 팝업 이벤트 추가
    		$("#myNeighberhoodJobSelectPopup").css("bottom","-100%");
		});
		
		/* 2022-11-24 css 추가  */
		$(".nav-layer li").click(function(){
			$(this).addClass('on3');
		});
		
	});
	
	// 페이지 UI 변수 및 함수 선언
	$myNeighberhoodJobMap.ui = {
		map : null,
		markerList : null,
		
		//사용자 정보
		member_info : null,
		
		//내 현재위치
		my_location_yn : "N", // 지도 조회후 내 위치로 오게하기
		/** 2020.09.02[한광희] 위치 미동의시 기본위치 설정 추가 START */
		my_x : 989749.2142006928, // x
		my_y : 1817802.41717, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명
		/** 2020.09.02[한광희] 위치 미동의시 기본위치 설정 추가 END */
		
		//일자리 찾기
		myNeighberhoodJobSearchPopupInitYn : "N",
		//공통코드
		myNeighberhoodJobSearchPopupInitCmmCdComcd : null,
		
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
					
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2020.06.16
		 * @author : 한광희
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
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
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
						/*$("#myNeighberhoodJobMyLocation_name").text($myNeighberhoodJobMap.ui.my_sido_nm+" "+$myNeighberhoodJobMap.ui.my_sgg_nm);*/
						//2022-11-21 svg 추가 
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';				
						$("#myNeighberhoodJobMyLocation_name").html($myNeighberhoodJobMap.ui.my_sido_nm+svg+$myNeighberhoodJobMap.ui.my_sgg_nm);
						
						//오늘의 전체 일자리현황 팝업
						if(gv_todaystatus_pop_yn == "Y" && common_get_cookie("todayStatusPopup_no_today_yn") != "Y") {
							todayStatusPopupSelect();
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
					});
				});
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
		},
						
		/**
		 * @name : myNeighberhoodJobListSelect
		 * @description : 일자리 목록 조회
		 * @date : 2020.06.16
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_gubun : 조회 구분 (button : 검색 버튼, onload : 페이지 처음 불러올때)
		 */
		myNeighberhoodJobListSelect : function(p_gubun) {
			$myNeighberhoodJobMap.ui.myNeighberhoodJobGubun = p_gubun;
			var obj = new sop.openApi.workroad.myNeighberhoodJobMap.myNeighberhoodJobList();
			obj.addParam("gubun", p_gubun);
			
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
				/*$("#myNeighberhoodJobMyLocation_name").text(lv_sido_nm+" "+lv_sgg_nm);*/
				//2022-11-21 svg 추가 
				var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';				
				$("#myNeighberhoodJobMyLocation_name").html(lv_sido_nm+svg+lv_sgg_nm);
				
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
				if($("#myNeighberhoodJobSearchPopup_company_type").html() == "") {
					if(lv_clmser_entrprs_class_content != undefined && lv_clmser_entrprs_class_content != null && lv_clmser_entrprs_class_content != "") {
						obj.addParam("company_type", lv_clmser_entrprs_class_content);
					}
				}
				else {
					var lv_company_type = $('#myNeighberhoodJobSearchPopup_company_type').multiselect("getSelected").val();
					if(lv_company_type != null) obj.addParam("company_type", lv_company_type.join());
				}
				
				//직종분류
				if($("#myNeighberhoodJobSearchPopup_classification").html() == "") {
					if(lv_clmser_jssfc_class_content != undefined && lv_clmser_jssfc_class_content != null && lv_clmser_jssfc_class_content != "") {
						obj.addParam("classification", lv_clmser_jssfc_class_content);
					}
				}
				else {
					var lv_classification = $('#myNeighberhoodJobSearchPopup_classification').multiselect("getSelected").val();
					if(lv_classification != null) obj.addParam("classification", lv_classification.join());
				}
				
				//급여수준
				if($("#myNeighberhoodJobSearchPopup_salaly").html() == "") {
					if(lv_clmser_salary_class_content != undefined && lv_clmser_salary_class_content != null && lv_clmser_salary_class_content != "") {
						obj.addParam("salaly", lv_clmser_salary_class_content);
					}
				}
				else {
					var lv_salaly = $('#myNeighberhoodJobSearchPopup_salaly').multiselect("getSelected").val();
					if(lv_salaly != null) obj.addParam("salaly", lv_salaly.join());
				}
				
				//고용형태
				if($("#myNeighberhoodJobSearchPopup_employment_type").html() == "") {
					if(lv_clmser_emplym_class_content != undefined && lv_clmser_emplym_class_content != null && lv_clmser_emplym_class_content != "") {
						obj.addParam("employment_type", lv_clmser_emplym_class_content);
					}
				}
				else {
					var lv_employment_type = $('#myNeighberhoodJobSearchPopup_employment_type').multiselect("getSelected").val();
					if(lv_employment_type != null) obj.addParam("employment_type", lv_employment_type.join());
				}
				
				//학력
				if($("#myNeighberhoodJobSearchPopup_academic_ability").html() == "") {
					if(lv_clmser_acdmcr_class_content != undefined && lv_clmser_acdmcr_class_content != null && lv_clmser_acdmcr_class_content != "") {
						obj.addParam("academic_ability", lv_clmser_acdmcr_class_content);
					}
				}
				else {
					var lv_academic_ability = $('#myNeighberhoodJobSearchPopup_academic_ability').multiselect("getSelected").val();
					if(lv_academic_ability != null) obj.addParam("academic_ability", lv_academic_ability.join());
				}
				
				//경력
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
				
				//산업분류
				if($("#myNeighberhoodJobSearchPopup_industry_classification").html() == "") {
					if(lv_clmser_indust_class_content != undefined && lv_clmser_indust_class_content != null && lv_clmser_indust_class_content != "") {
						obj.addParam("industry_classification", lv_clmser_indust_class_content);
					}
				}
				else {
					var lv_industry_classification = $('#myNeighberhoodJobSearchPopup_industry_classification').multiselect("getSelected").val();
					if(lv_industry_classification != null) obj.addParam("industry_classification", lv_industry_classification.join());
				}
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
		 * @date : 2020.06.16
		 * @author : 한광희
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
			
			//console.log(p_data)
			
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
			//사람인
			else if(p_data.jo_data_div == "S") {
				lv_com_logo_class = "saramin";
				lv_com_logo_text = "사람인";
			}
			//등록일
			if(p_data.reg_dt != null && p_data.reg_dt != "" && p_data.reg_dt.length == 8) {
				lv_reg_dt_text = p_data.reg_dt.substr(0,4)+"."+p_data.reg_dt.substr(4,2)+"."+p_data.reg_dt.substr(6,2);
				var lv_temp_reg_dt_date_time = new Date(p_data.reg_dt.substr(0,4)+"-"+p_data.reg_dt.substr(4,2)+"-"+p_data.reg_dt.substr(6,2)).getTime();
				var lv_temp_now_date_time = new Date().getTime();
				lv_reg_dt_d_day = Math.floor((lv_temp_now_date_time - lv_temp_reg_dt_date_time) / (1000 * 60 * 60 * 24));
			}
			else {
				lv_reg_dt_text = p_data.reg_dt;
			}
			//마감일 및 D-Day
			if(p_data.clos_dt != null && p_data.clos_dt != "" && p_data.clos_dt.length == 8) {
				lv_clos_dt_text = p_data.clos_dt.substr(0,4)+"."+p_data.clos_dt.substr(4,2)+"."+p_data.clos_dt.substr(6,2);
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

			return $("<li/>", {
				"class" : (p_type == "1") ? "swiper-slide off" : "off",
				name : "myNeighberhoodJobListData_"+p_index,
				/*style : (p_type == "1") ? "width: 340px;" : "",*/
				style : (p_type == "1") ? "width: 290px;" : "",		
				data_index : p_index,
				jo_no : p_data.jo_no,
				pt_x : p_data.pt_x,
				pt_y : p_data.pt_y
			}).append(
				$("<div/>", {
					"class" : "rvbWrap"
				}).append(
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
						"class" : "nameBox"
					}).append(
						$("<div/>", {
							"class" : "nameCompany"
						}).append(p_data.corp_nm)
					)
				).append(
					$("<div/>", {
						"class" : "detailRecu",
						style : (p_type == "2") ? "height: auto;" : "", 
						text : p_data.recru_nm
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
							"class" : "career"
						}).append(
							$("<span/>", {
								"class" : (lv_clos_dt_d_day <= 7) ? "red" : "",
								text : "D-"+lv_clos_dt_d_day
							})
						).append("  |  경력 : "+p_data.career_nm+" ㅣ "+p_data.acdmcr_nm)
					).append(
						$("<div/>", {
							"class" : "postTime"
						}).append(
							$("<p/>", {
								"class" : "comLogo "+lv_com_logo_class,
								text : lv_com_logo_text
							})
						).append(lv_reg_dt_d_day+"일전")
					)
				).append(
						
				).append(
					$("<table/>", {
						"class" : "myNeighberhoodJobListSub",
						border : "0",
						style : ((p_type == "1" && $myNeighberhoodJobMap.ui.myNeighberhoodJobListSubYn == "N") || (p_type == "2" && $myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn == "N")) ? "display: none; width: 100%;" : "width: 100%;"
					}).append("<colgroup><col width=\"30%\" style=\"color:red;\"><col width=\"25%\" /><col width=\"20%\" /><col width=\"25%\" /></colgroup>")
					.append(
						$("<tr/>")
						.append(
							$("<td/>", {
								"class" : "td_tit",
								colspan : "4",
								text : "등록 "+lv_reg_dt_text+" / 마감"+lv_clos_dt_text
							})
						)
					)
					.append(
						$("<tr/>")
						.append(
							$("<th/>", {text : "대표자명"})
							.append($("<span/>",{ "class":"listspan"})))
						.append($("<td/>", {text : p_data.main_nm}))
						.append($("<th/>", {text : "근로자수"})
							.append($("<span/>",{ "class":"listspan"}))) 
						.append($("<td/>", {text : p_data.labrr_cnt+"명"}))
					)
					.append(
						$("<tr/>")
						.append($("<th/>", {text : "자본금"})
							.append($("<span/>",{ "class":"listspan02"})))
						.append($("<td/>", {text : lv_cap_text}))
						.append($("<th/>", {text : "연매출액"})
							.append($("<span/>",{ "class":"listspan"})))	
						.append($("<td/>", {text : lv_year_sales_text}))
					)
					.append(
						$("<tr/>")
						.append($("<th/>", {text : "업종"})
							.append($("<span/>",{ "class":"listspan03"})))
						.append($("<td/>", {colspan : "3", text : p_data.indust_class_nm}))
					)
					.append(
						$("<tr/>")
						.append($("<th/>", {text : "주요사업내용"})
							.append($("<span/>",{ "class":"listspan04"})))
						.append($("<td/>", {colspan : "3", text : p_data.main_biz_content}))
					)
				)
			);
		},
		
		/**
		 * @name : myNeighberhoodJobListPaging
		 * @description : 일자리 목록 페이징
		 * @date : 2020.06.16
		 * @author : 한광희
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
		 * @date : 2020.06.16
		 * @author : 한광희
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
		 * @date : 2020.06.16
		 * @author : 한광희
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
				$("#myNeighberhoodJobSearch").animate({bottom: 365},p_delay);
				$("#myNeighberhoodJobList").parent().animate({height: 430},p_delay);
				$("#myNeighberhoodJobList>ul>li>div.rvbWrap").show().css("height","");
				$("#myNeighberhoodJobList .myNeighberhoodJobListSub").show();
				//2022-10-18 animate 추가
				$(".currenPosition").animate({bottom: 365},p_delay);
				$(".currenPosition2").animate({bottom: 365},p_delay);
			}
			//접기
			else if(p_flag == "N") {
				$("#myNeighberhoodJobSearch").animate({bottom: 195},p_delay);
				$("#myNeighberhoodJobList").parent().animate({height: 260},p_delay);
				$("#myNeighberhoodJobList>ul>li>div.rvbWrap").show().animate({height: 165},p_delay);
				$("#myNeighberhoodJobList .myNeighberhoodJobListSub").hide();
				//2022-10-18 animate 추가
				$(".currenPosition").animate({bottom: 190},p_delay);
				$(".currenPosition2").animate({bottom: 190},p_delay);
			}
			//숨기기
			else if(p_flag == "0") {
				$("#myNeighberhoodJobSearch").animate({bottom: 10},p_delay);
				$("#myNeighberhoodJobList").parent().animate({height: 40},p_delay);
				$("#myNeighberhoodJobList>ul>li>div.rvbWrap").hide().animate({height: 0},p_delay);
				$("#myNeighberhoodJobList .myNeighberhoodJobListSub").hide();
				//2022-12-19 animate, css 추가
				$(".currenPosition").animate({bottom: 10},p_delay);
				$(".currenPosition2").animate({bottom: 10},p_delay);
				$(".recruitViewBox").css("height","50px");
			}
		},
		
		/**
		 * @name : myNeighberhoodJobList2SubToggle
		 * @description : 일자리 목록 (전체보기) 하단 토글
		 * @date : 2020.06.16
		 * @author : 한광희
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
		 * @date : 2020.06.16
		 * @author : 한광희
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
		 * @date : 2020.06.16
		 * @author : 한광희
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
		
		/**
		 * @name : myNeighberhoodJobSearchPopupInit
		 * @description : 일자리 찾기 팝업 초기화
		 * @date : 2020.06.16
		 * @author : 한광희
		 * @history :
		 * @param :
		 */
		myNeighberhoodJobSearchPopupInit : function() {
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
			}
			
			/* 기업형태 */
			//처음 데이터 불러오기
			if($("#myNeighberhoodJobSearchPopup_company_type").html() == "") {
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
					onDropdownShown: function(event) {
						//$("#myNeighberhoodJobSearchPopup_bottom").css("height",($(window).outerHeight(true) / 2)+"px");	// 2022-12-15 height 조절 삭제
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
						}
						//$("#myNeighberhoodJobSearchPopup_bottom").css("height",($(window).outerHeight(true) / 2)+"px");	// 2022-12-15 height 조절 삭제
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
		 * @date : 2020.06.16
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobSearchPopupToggle : function(p_flag) {
			//표시
/*			if(p_flag == true) {
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
			}*/

			if(p_flag == true) {
				$("#myNeighberhoodJobSearchPopup").css("display","block");
				
			}
			//감춤
			else {
				$("#myNeighberhoodJobSearchPopup").css("display","none");
			}
		},
		
		/**
		 * @name : myNeighberhoodJobListPopupToggle
		 * @description : 일자리목록 전체보기 팝업 토글
		 * @date : 2020.06.16
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobListPopupToggle : function(p_flag) {
			//표시
			if(p_flag == true) {
				$("#myNeighberhoodJobListPopup").css("top",$(window).outerHeight(true)+"px");
				$("#myNeighberhoodJobListPopup").show().animate({
					/*top : 40*/
					top : 101
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
		 * @date : 2020.06.16
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤 
		 */
		myNeighberhoodJobSelectPopupToggle : function(p_flag) {
			//표시
/*			if(p_flag == true) {
				$("#myNeighberhoodJobSelectPopup").css("left",$(window).outerWidth(true)+"px");
				$("#myNeighberhoodJobSelectPopup").show().animate({
					left : 0
				},400,function(){
					srvLogWrite('O0', '04', '03', '01', '', '');
				});
			}
			//감춤
			else {
				$("#myNeighberhoodJobSelectPopup").animate({
					left : $(window).outerWidth(true)
				},400,function(){
					$("#myNeighberhoodJobSelectPopup").hide();
				});
			}*/

			if(p_flag == true) {
				//$("#myNeighberhoodJobSelectPopup").css("bottom",$(window).outerWidth(true)+"px");
				$("#myNeighberhoodJobSelectPopup").show().animate({
					bottom : "0px"
				},400,function(){
					srvLogWrite('O0', '04', '03', '01', '', '');
				});
			}
			//감춤
			else {
				$("#myNeighberhoodJobSelectPopup").animate({
					bottom : "-100%"
				},400,function(){
					$("#myNeighberhoodJobSelectPopup").hide();
				});
			}
		},
		
		/**
		 * @name : myNeighberhoodJobSelectPopupSelect
		 * @description : 일자리목록 채용공고 상세보기 팝업 조회
		 * @date : 2020.06.16
		 * @author : 한광희
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
							$("#myNeighberhoodJobSelectPopup").find("[name='reg_clos_dt2']").append("&nbsp;<span class=\"red\">[D-"+lvTempDDay+"]</span>");
						} else {
							$("#myNeighberhoodJobSelectPopup").find("[name='reg_clos_dt']").append("&nbsp;<span>[D-"+lvTempDDay+"]</span>");
							//$("#myNeighberhoodJobSelectPopup").find("[name='reg_clos_dt2']").append("&nbsp;<span>[D-"+lvTempDDay+"]</span>");
						}
					}
					
					/* 회사명 */
					var svgicon = '<svg width="20" height="15" viewBox="0 0 15 10" fill="#112B48" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
					$("#myNeighberhoodJobSelectPopup").find("[name='corp_nm2']").html("<span class='sorpnmTitle'>"+lvResultData.corp_nm + "</span><span class='corpnm2day'>[D-" + lvTempDDay +"]</span><span class='svgicon'>" + svgicon + "</span>" );
					$("#myNeighberhoodJobSelectPopup").find("[name='corp_nm']").html(lvResultData.corp_nm);
					
					/* 채용명 */
					$("#myNeighberhoodJobSelectPopup").find("[name='recru_nm']").html(lvResultData.recru_nm);
					/* 경력명, 학력명 */
					$("#myNeighberhoodJobSelectPopup").find("[name='career_acdmcr']").html(" 경력 : "+lvResultData.career_nm+" ㅣ 학력 : "+lvResultData.acdmcr_nm);
					/* 근무지 */
					$("#myNeighberhoodJobSelectPopup").find("[name='work_addr']").html("근무지 : "+lvResultData.work_addr);
					/* 연봉 */
					$("#myNeighberhoodJobSelectPopup").find("[name='salaly']").html("<span class=\"wage_type_"+lvResultData.wage_type+"\">"+lvResultData.wage_type_nm+"</span>"+appendCommaToNumber(lvResultData.salary));
					/* 근무시간(데이터 없음), 고용형태 */
					$("#myNeighberhoodJobSelectPopup").find("[name='emplym_type']").html(lvResultData.emplym_type_nm);
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
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("saramin");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").attr("jo_data_key", lvResultData.jo_data_key);
					}
					//인쿠르트
					else if(lvResultData.jo_data_div == "I") {
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("worknet");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").addClass("incruit");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("saramin");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").attr("jo_data_key", lvResultData.jo_data_key);
					}
					//사람인
					else if(lvResultData.jo_data_div == "S") {
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("incruit");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("worknet");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").addClass("saramin");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").attr("jo_data_key", lvResultData.jo_data_key);
					}
					else {
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("incruit");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("worknet");
						$("#myNeighberhoodJobSelectPopup").find("[name='go_site']").removeClass("saramin");
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
					    	,link_id: "D3503"
					    	,itm_id: "T001"
					    }
					}).done(function (res) { // 완료
						if(res.errCd == "0") {

							var lvParams = res.result.params;
							
							$("#myNeighberhoodJobSelectPopup_chart_1_title").html(lvParams.base_year+"년 기준 산업대분류별 연령별 소득(일자리행정통계)<br/>"+res.result.series[0].name);	// 2020.09.25[한광희] 차트 출처 및 업종 명칭 추가
							
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
							            style: {
							                color: "#606060"	// 2020.09.22[한광희] 폰트 컬러 변경
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
							                color: "#606060"	// 2020.09.22[한광희] 폰트 컬러 변경
							            }
							        },
							        labels: {
							            style: {
							                color: "#606060"	// 2020.09.22[한광희] 폰트 컬러 변경
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
							                color: "#606060",	// 2020.09.22[한광희] 폰트 컬러 변경
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
							    series: [{
							    	name: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].name : ""
							    	,data: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].data : []
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
						    ,link_id: "D3503"
						    ,itm_id: "T002"
					    }
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							
							var lvParams = res.result.params;
							
							$("#myNeighberhoodJobSelectPopup_chart_2_title").html(lvParams.base_year+"년 기준 산업대분류별 연령별 소득(일자리행정통계)<br/>"+res.result.series[0].name);	// 2020.09.25[한광희] 차트 출처 및 업종 명칭 추가
							
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
							            style: {
							                color: "#606060"	// 2020.09.22[한광희] 폰트 컬러 변경
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
							                color: "#606060"	// 2020.09.22[한광희] 폰트 컬러 변경
							            }
							        },
							        labels: {
							            style: {
							                color: "#606060"	// 2020.09.22[한광희] 폰트 컬러 변경
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
							                color: "#606060",	// 2020.09.22[한광희] 폰트 컬러 변경
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
							    series: [{
							    	name: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].name : ""
							    	,data: (res.result.series != null && res.result.series.length > 0) ? res.result.series[0].data : []
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
		 * @date : 2020.06.16
		 * @author : 한광희
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
			$(document).on("click", "#todayStatusPopup_close", function() {
				//오늘 하루 다시 보지 않기 저장
				if($("#todayStatusPopup_check").prop("checked")) {
					common_set_cookie("todayStatusPopup_no_today_yn","Y",1);
				}
				else {
					common_remove_cookie("todayStatusPopup_no_today_yn");
				}
				
				//오늘의 전체 일자리현황 팝업 닫음
				todayStatusPopupToggle(false);
				
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
			$(document).on("click", "#todayStatusPopup_ok", function() {
				location.href = contextPath+"/m2019/workroad/todayStatusMap.sgis";
			});
			
			//현재위치로 이동 버튼
			$(document).on("click", "#myNeighberhoodJobMyLocation", function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
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
						/*$("#myNeighberhoodJobMyLocation_name").text($myNeighberhoodJobMap.ui.my_sido_nm+" "+$myNeighberhoodJobMap.ui.my_sgg_nm);*/
						//2022-11-21 svg 추가 
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';	
						$("#myNeighberhoodJobMyLocation_name").html($myNeighberhoodJobMap.ui.my_sido_nm+svg+$myNeighberhoodJobMap.ui.my_sgg_nm);
						
						//일자리 찾기
						$myNeighberhoodJobMap.ui.my_location_yn = "Y";
						if($("#myNeighberhoodJobSearchPopup_sido").html() == "") {
							$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sido_list(my_sido_cd);	// 2020.09.21[한광희] 스크립트 오류 수정
						}
						else {
							$("#myNeighberhoodJobSearchPopup_sido").val(my_sido_cd);	// 2020.09.21[한광희] 스크립트 오류 수정
						}
						$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopup_sgg_list(my_sido_cd, my_sgg_cd);	// 2020.09.21[한광희] 스크립트 오류 수정
						$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect("button");
					},
					//위치 미동의함
					function() {
						
					}
				);
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
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
					srvLogWrite('O0', '04', '02', '04', '항목 선택', '');
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
				srvLogWrite('O0', '04', '04', '01', '', '');
				if($myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitYn == "N") {
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInit();
					$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInitYn = "Y";
				}
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupToggle(true);
			});
			
			//일자리 찾기 팝업 닫기 버튼
			$(document).on("click", "#myNeighberhoodJobSearchPopup_close", function() {
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupToggle(false);
			});
			
			//일자리 찾기 팝업 초기화 버튼
			$(document).on("click", "#myNeighberhoodJobSearchPopup_reset", function() {
				srvLogWrite('O0', '04', '04', '03', '', '');
				//초기화
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSearchPopupInit();
				//초기화 후 처리
				//없음
			});
			
			//일자리 찾기 팝업 검색 버튼
			$(document).on("click", "#myNeighberhoodJobSearchPopup_search", function() {
				var lv_sido_nm = $("#myNeighberhoodJobSearchPopup_sido option:selected").text();
				var lv_sgg_nm  = $("#myNeighberhoodJobSearchPopup_sgg option:selected").text();

				var company_txt = $("#myNeighberhoodJobSearchPopup_company_type").siblings('div').children('button').children('span').text();
				var salaly_txt = $("#myNeighberhoodJobSearchPopup_salaly").siblings('div').children('button').children('span').text();
				var employ_txt = $("#myNeighberhoodJobSearchPopup_employment_type").siblings('div').children('button').children('span').text();
				var academic_txt = $("#myNeighberhoodJobSearchPopup_academic_ability").siblings('div').children('button').children('span').text();
				var career_txt = $("#myNeighberhoodJobSearchPopup_career li.on a").text();
				var class_txt = $("#myNeighberhoodJobSearchPopup_classification").siblings('div').children('button').children('span').text();
				srvLogWrite('O0', '04', '04', '02', lv_sido_nm+' '+lv_sgg_nm+'|'+company_txt+'|'+salaly_txt+'|'+employ_txt+'|'+academic_txt+'|'+career_txt+'|'+class_txt, '');

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
				srvLogWrite('O0', '04', '02', '01', '', '');
				$myNeighberhoodJobMap.ui.myNeighberhoodJobListPopupToggle(true);
				//2022-11-04 상세 팝업 이벤트 추가
				$("#myNeighberhoodJobSelectPopup").css("bottom","-100%");
			});
			
			//일자리목록 전체보기 지도보기 버튼
			$(document).on("click", "#myNeighberhoodJobListPopup_close", function() {
				srvLogWrite('O0', '04', '02', '05', '', '');
				$myNeighberhoodJobMap.ui.myNeighberhoodJobListPopupToggle(false);
			});
			
			//일자리목록 전체보기 라디오 버튼
			$(document).on("change", "#myNeighberhoodJobListPopup_list_type input[name='myNeighberhoodJobListPopup_list_type_radio']", function() {
				var lvValue = $("#myNeighberhoodJobListPopup_list_type input[name='myNeighberhoodJobListPopup_list_type_radio']:checked").val();
				
				//선택 처리
				if(lvValue == "list") {
					srvLogWrite('O0', '04', '02', '03', '요약', '');
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn = "N";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn,0);
				}
				else if(lvValue == "card") {
					srvLogWrite('O0', '04', '02', '03', '자세히', '');
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn = "Y";
					$myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubToggle($myNeighberhoodJobMap.ui.myNeighberhoodJobList2SubYn,0);
				}
			});
			
			//일자리목록 전체보기 조회정렬 변경
			$(document).on("change", "#myNeighberhoodJobListSort", function() {
				var slwDet = $("#myNeighberhoodJobListSort").val();
				if(slwDet == "DISTANCE"){
					slwDet = "거리순";
					srvLogWrite('O0', '04', '02', '02', '거리', '');
				}else if(slwDet == "DISTANCE_DESC") slwDet = "거리역순";
				else if(slwDet == "REG_DT"       ){
					slwDet = "등록순";
					srvLogWrite('O0', '04', '02', '02', '등록일', '');
				}else if(slwDet == "REG_DT_DESC"  ) slwDet = "등록역순";
				else if(slwDet == "CLOS_DT"      ){
					slwDet = "마감순";
					srvLogWrite('O0', '04', '02', '02', '마감일', '');
				}else if(slwDet == "CLOS_DT_DESC" ) slwDet = "마감역순";
				else if(slwDet == "SALARY"       ) slwDet = "급여순";
				else if(slwDet == "SALARY_DESC"  ){
					slwDet = "급여역순";
					srvLogWrite('O0', '04', '02', '02', '연봉', '');
				}
				$myNeighberhoodJobMap.ui.myNeighberhoodJobListSelect($myNeighberhoodJobMap.ui.myNeighberhoodJobGubun);
			});
			
			//일자리목록 전체보기 목록 선택
			$(document).on("click", "#myNeighberhoodJobList2>ul>li", function() {
				srvLogWrite('O0', '04', '02', '04',$(this).find('.nameCompany').text(), '');
				var lvThis = $(this);
				var lvThisJoNo = lvThis.attr("jo_no");
				$myNeighberhoodJobMap.ui.myNeighberhoodJobSelectPopupSelect(lvThisJoNo);
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
				srvLogWrite('O0', '04', '03', '02', '', '');
				var lvThis = $(this);
				var lvThisJoDataKey = lvThis.attr("jo_data_key");

				// 워크넷
				if(lvThis.hasClass("worknet")) {
					window.open("https://m.work.go.kr/regionJobsWorknet/jobDetailView.do?srchInfotypeNm=VALIDATION&srchWantedAuthNo="+lvThisJoDataKey);
				}
				// 인쿠르트
				else if(lvThis.hasClass("incruit")) {
					window.open("http://m.incruit.com/jobdb_info/jobpost.asp?job="+lvThisJoDataKey);
				}
				else if(lvThis.hasClass("saramin")) {
					window.open("http://m.saramin.co.kr/job-search/view?rec_idx="+lvThisJoDataKey);
				}
			});
			
			//일자리목록 채용공고 상세보기 > 관련업종 통계정보 더보기
			$(document).on("click", "#myNeighberhoodJobSelectPopup_go_stats_anls_map", function() {
				var lvThis = $(this);
				var lvThisIndustClass = lvThis.attr("indust_class");
				
				if(lvThisIndustClass != undefined && lvThisIndustClass != null && lvThisIndustClass != "") {
					location.href = contextPath+"/m2019/workroad/statsAnlsMap.sgis?type_of_industry="+lvThisIndustClass.substr(0,1)+"&type_of_industry_middle_classification="+lvThisIndustClass.substr(0,3);
				}
			});
						
			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $myNeighberhoodJobMap.ui.my_sido_cd, $myNeighberhoodJobMap.ui.my_sgg_cd, $myNeighberhoodJobMap.ui.my_emdong_cd);
				}
				// 감춤
				else {
					lifeEnvironmentToggle(false);
				}
			});
			
			//생활환경 정보 상세보기
			$(document).on("click", "#lifeEnvironmentPopup_open", function() {
				srvLogWrite('O0', '51', '02', '02', '', '');
				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				var lvEmdongCd = lvThis.attr("emdong_cd");
				if(lvSidoCd == "null") lvSidoCd = "";
				if(lvSggCd == "null") lvSggCd = "";
				if(lvEmdongCd == "null") lvEmdongCd = "";
				if(lvSidoCd != undefined && lvSidoCd != null && lvSidoCd != "" && lvSidoCd != "99") {
					lifeEnvironmentPopupSelect(lvSidoCd, lvSggCd, lvEmdongCd);
				}
			});
			
			//생활환경 팝업 닫기
			$(document).on("click", "#lifeEnvironmentPopup_close", function() {
				lifeEnvironmentPopupToggle(false);
			});
			
			//생활환경 팝업 구분 선택
			$(document).on("click", "#lifeEnvironmentPopup_list > ul > li.infoMenu", function() {
				var lvThis = $(this);
				var lvThisIndex = lvThis.data("index");
				var lvThisText = lvThis.children("a").text();
				
				//메뉴 선택
				$("#lifeEnvironmentPopup_list > ul > li.infoMenu").removeClass("on");
				lvThis.addClass("on");
				
				//화면 표시
				$("#lifeEnvironmentPopup div.infoPage").hide();
				$("#lifeEnvironmentPopup_page_"+lvThisIndex).show();
			});			
		},
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2020.06.16
		 * @author : 한광희
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
						on: {
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
    	                iconUrl: contextPath+"/resources/m2019/images/70_07.png",
    	                iconSize:     [25, 40],	                
    	                iconAnchor:   [12, 40],
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
