(function(W, D) {

	W.$statsMeMap = W.$statsMeMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {

		$("#selectStatMeCatalogSorting").change(function(){
			if($("#selectStatMeCatalogSorting option:selected").val() == "statDataNm"){
				srvLogWrite('O0', '03', '06', '00', '제목순', '');
			}else if($("#selectStatMeCatalogSorting option:selected").val() == "accCnt"){
				srvLogWrite('O0', '03', '06', '00', '조회순', '');
			}
		});

		$(".leftCol span").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".nav-layer").css("display","block");
				$("#common_popup_area").css("display","none");
        	}else{
        		$(this).removeClass('active');
        		$(".nav-layer").css("display","none");
        	}
        });

		$(".selectArea").click(function(){
			if(!$(".nav-layer").hasClass('active')){
				$(".nav-layer").css("display","none");
        		$(".leftCol span").removeClass("active");
        		$("#statsMeListDiv").css("display","none");
        		//2022-10-31 이벤트 추가
/*        		$(".area_select_inner a:eq(0)").html($statsMeMap.ui.my_sido_nm);
        		$(".area_select_inner a:eq(1)").html($statsMeMap.ui.my_sgg_nm);
        		$(".area_select_inner a:eq(2)").html($statsMeMap.ui.my_emdong_nm);*/
        	}else{
        		$(this).removeClass('active');
        	}
        });
		
		//2022-10-11 [송은미] 데이터보드 내 닫기버튼 추가 
		$("#chartClose").click(function(){
			$("#statsSelectDiv2").css("display","none");
        });
		$("#boardClose").click(function(){
			$("#statsSelectDiv2").css("display","none");
        });	
		$("#statsMeDetailClose").click(function(){
			$("#statsSelectDiv2").css("display","none");
        });	

		$statsMeMap.event.setUIEvent();

		//지도 세팅
		$statsMeMap.event.setMapSize();
		$statsMeMap.ui.createMap("map");

		/*
		 * 생애주기 / 관심분야 Pram 설정
		 */
		if(selItem != ""){
			var dataParams = {};
			dataParams.orderType = 'statDataNm';
			if(selItem.startsWith("L")){
				dataParams.lifeCycleItemId = selItem;
				$("#" + selItem).addClass("on");
				$statsMeMap.ui.statsGrphInfoLoadData(dataParams);	// 통계지리 정보 목록 조회
			}
			else if(selItem.startsWith("D")){
				dataParams.interestRealmItemId = selItem;
				$("#" + selItem).addClass("on");
				$statsMeMap.ui.statsGrphInfoLoadData(dataParams);	// 통계지리 정보 목록 조회
			}
		}
		else{
			// stat_data_id 조회후 설정
			if(stat_data_id != "" && stat_data_srv_nm != ""){
				//목록조회
				var dataParams = {};
				dataParams.statDataId = stat_data_id;

				// 생애주기 param 값 셋팅
				if(lifeCycleItemIdList1 != undefined && lifeCycleItemIdList1 != "undefined"){
					$("a[id='"+lifeCycleItemIdList1+"']").trigger("click");
				}
				if(lifeCycleItemIdList2 != undefined && lifeCycleItemIdList2 != "undefined"){
					$("a[id='"+lifeCycleItemIdList2+"']").trigger("click");
				}
				// 관심분야 param 값 셋팅
				if(interestRealmItemIdList1 != undefined && interestRealmItemIdList1 != "undefined"){
					$("a[id='"+interestRealmItemIdList1+"']").trigger("click");
				}
				if(interestRealmItemIdList2 != undefined && interestRealmItemIdList2 != "undefined"){
					$("a[id='"+interestRealmItemIdList2+"']").trigger("click");
				}

				$statsMeMap.ui.statsGrphInfoLoadData(dataParams);
			}
			// 아무것도 설정되지 않았을 경우 조회
			else{
				// 정렬 초기화
				$("#selectStatMeCatalogSorting option:eq(0)").prop('selected', true);
				// 목록 조회
				$statsMeMap.ui.searchStatsGrphInfo("statDataNm");
			}
		}

		// 관심지역 변경
		$statsMeMap.ui.getAreaSido($statsMeMap.ui.my_sido_cd);
		$statsMeMap.ui.getAreaSgg($statsMeMap.ui.my_sido_cd, $statsMeMap.ui.my_sgg_cd);
		$statsMeMap.ui.getAreaEmdong($statsMeMap.ui.my_sido_cd, $statsMeMap.ui.my_sgg_cd, $statsMeMap.ui.my_emdong_cd);
		//2022-10-12 [송은미] text 수정
		$('#statsMeMapMyLocation_name').text($("#statsMePopupArea_sido option:checked").text() +">"+ $("#statsMePopupArea_sgg option:checked").text() +">"+ $("#statsMePopupArea_emdong option:checked").text());
//		$('#statsMeMapMapArea').text($("#statsMePopupArea_sido option:checked").text() +" "+ $("#statsMePopupArea_sgg option:checked").text() +" "+ $("#statsMePopupArea_emdong option:checked").text());

		//툴팁 설정 (기능 x)
		$("#statsMeMap [title]:not([disabled])").tooltip();
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$statsMeMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$statsMeMap.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$statsMeMap.ui = {
		map : null,
		mapChartData : [],
		lifeCycleCount : 0,	// 생애주기 선택 갯수
		interestRealmCount : 0,	// 관심분야(거리선택) 선택 갯수

		lifeCycleItemIdList : [],			// 생애주기 선택항목 id list
		lifeCycleItemNmList : [],			// 생애주기 선택항목 명 list
		interestRealmItemIdList : [],		// 관심분야(거리선택) 선택항목 id list
		interestRealmItemNmList : [],		// 관심분야(거리선택) 선택항목 명 list
		catalogCheckedDataList : [],		// 카탈로크 선택항목 list
		searchKwrd : "",					// 키워드 검색명
		selectDataId : "",					// 선택된 stat 데이터 ID
		statsMeListPagingIndex : 1, 		// 2020.09.16[한광희] My통계로 목록 속도 향상 페이징 시작 인덱스
		statsMeListCount : 0,				// 2020.09.16[한광희] 목록 갯수 저장

		//시, 군,구 데이터
		areaSidoData : {}, // 시도 목록 저장
		areaSggData : {}, // 시군구 목록 저장
		areaEmdongData : {}, // 읍면동 목록 저장

		//내 현재위치
		my_location_yn : "N", // 내 위치 조회 여부
		my_x : 989674, // x
		my_y : 1818313, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명

		//저장된 위치
		default_sido_cd : "25", // 시도코드
		default_sido_nm : "대전광역시", // 시도명
		default_sido_x : 990493.5945803534, // 시도 x
		default_sido_y : 1815828.82237, // 시도 y
		default_sgg_cd : "030", // 시군구코드
		default_sgg_nm : "서구", // 시군구명
		default_sgg_x : 986097.311596368, // 시군구 x
		default_sgg_y : 1809240.84784, // 시군구 y
		default_emdong_cd : "60", // 읍면동코드
		default_emdong_nm : "둔산2동", // 읍면동명
		default_emdong_x : 989749.2142006928, // 읍면동 x
		default_emdong_y : 1817802.41717, // 읍면동 y
		default_x : 989674, // x
		default_y : 1818313, // y

		//페이지
		pageLoadMapMoveYn : "N",
		pageLoadMapMoveX : 0,
		pageLoadMapMoveY : 0,
		pageLoadMapMoveZoom : 1,

		//지도
		map : null,
		markers : null,
		markerList : null,
		/* mapId : makeStamp(new Date()), */
		mapObj : null, // 위성, 일반, 백지도 선택 버튼
		zoomObj : null, // 확대 축소 버튼
		baseTileLayer : null,
		targetTileLayer : null,
		namespace : "statsMeMap",
		mapCenterDefalut : [ 1039674, 1818313 ], // 기존 [ 989674, 1818313 ] 에서 살짝 왼쪽으로 옮김
		mapFirstMoveYn : "N", // 카테고리 조회 시 맵 처음 이동 여부
		mapMoveEventYn : "N", // 맵 이동 이벤트 사용 여부
		mapMoveEventYn2 : "N", // 맵 이동 이벤트 사용 여부 (마커 클러스터에서 사용함)
		mapMoveEventDelay : 200, // 맵 이동 이벤트 사용 막은 후 다시 사용하게 할 시간 (1/1000초)
		heatMapPolygonCode : "",
		poiMapPolygonCode : "",

		//데이터
		mapData : null,
		mapStatsData : {}, // 통계정보 저장
		mapRegionData : {}, // 지역경계 저장
		mapRegion : "", // 지역경계 sido, sgg, emdong, totreg
		mapType : "", // 지도유형 color, bubble, heat, poi, grid

		//보고서
		reportPopup : null,

		//대화형 통계지도 > e-지방지표 API 정보
		ecountryMapping : {
			PH0005:{list_id:'109',tbl_id:'DT_1YL20921',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'재정자립도(세입과목개편전)',add_item_id:''}
			,PH0006:{list_id:'109',tbl_id:'DT_1YL20891',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'재정자주도(세입과목개편전)',add_item_id:''}
			,PH0007:{list_id:'109',tbl_id:'DT_1YL20831',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'사업체수',add_item_id:''}
			,PH0008:{list_id:'109',tbl_id:'DT_1YL20841',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'사업체수',add_item_id:''}
			,PH0009:{list_id:'109',tbl_id:'DT_1YL20851',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'종사자수',add_item_id:''}
			,PH0010:{list_id:'109',tbl_id:'DT_1YL20551E',atdrc_yn:'U',prd_id:'H',prid_value:'201902',base_item_id:'16142T1',base_item_nm:'신설법인수',add_item_id:''}
			,PH0011:{list_id:'109',tbl_id:'INH_1JC1501',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T1100',base_item_nm:'총가구_가구',add_item_id:''}
			,PH0012:{list_id:'109',tbl_id:'INH_1EA1045',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'계',add_item_id:''}
			,PH0014:{list_id:'109',tbl_id:'INH_1ZB7001',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'어업가구',add_item_id:''}
			,PH0015:{list_id:'109',tbl_id:'DT_1YL20121',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'건수',add_item_id:'OV_L2_ID::101'}
			,PH0016:{list_id:'109',tbl_id:'DT_1YL20131',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'10',base_item_nm:'건수',add_item_id:'OV_L2_ID::101'}
			,PH0018:{list_id:'109',tbl_id:'DT_1YL5701',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'제조업사업체수',add_item_id:''}
			,PH0019:{list_id:'109',tbl_id:'DT_1YL5801',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'제조업종사자수',add_item_id:''}
			,PH0021:{list_id:'109',tbl_id:'DT_1YL6101',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'도소매업사업체수',add_item_id:''}
			,PH0022:{list_id:'109',tbl_id:'DT_1YL6201',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'도소매업종사자수',add_item_id:''}
			,PH0023:{list_id:'109',tbl_id:'INH_1K31005_02',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T3',base_item_nm:'백화점 경상금액',add_item_id:''}
			,PH0024:{list_id:'109',tbl_id:'DT_1YL6301',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'서비스업사업체수',add_item_id:''}
			,PH0026:{list_id:'109',tbl_id:'DT_1YL5901',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'운수업기업체수',add_item_id:''}
			,PH0027:{list_id:'109',tbl_id:'DT_1YL6001',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'운수업종사자수',add_item_id:''}
			,PH0032:{list_id:'106',tbl_id:'DT_1YL1101',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'구인배수',add_item_id:''}
			,PH0036:{list_id:'106',tbl_id:'DT_1YL20531E',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T80',base_item_nm:'청년실업률',add_item_id:''}
			,PH0037:{list_id:'106',tbl_id:'DT_1YL20541',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'취업자 증가수',add_item_id:''}
			,PH0038:{list_id:'106',tbl_id:'INH_1SSLA0812R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0039:{list_id:'106',tbl_id:'DT_1YL20561',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'인원수',add_item_id:'OV_L2_ID::0'}
			,PH0040:{list_id:'105',tbl_id:'INH_1EA1501',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T210',base_item_nm:'농업소득',add_item_id:''}
			,PH0041:{list_id:'105',tbl_id:'INH_1SSIC050R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T21',base_item_nm:'- 매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0042:{list_id:'105',tbl_id:'INH_1SSIC010R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 여유있음',add_item_id:'OV_L2_ID::000'}
			,PH0043:{list_id:'105',tbl_id:'INH_1C86_01',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T4',base_item_nm:'1인당 민간소비',add_item_id:''}
			,PH0044:{list_id:'105',tbl_id:'INH_1SSIC060R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0045:{list_id:'105',tbl_id:'INH_1EA1611',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T002',base_item_nm:'부채-연도말',add_item_id:''}
			,PH0046:{list_id:'105',tbl_id:'DT_1YL6801E',atdrc_yn:'U',prd_id:'M',prid_value:'201911',base_item_id:'13103112609999',base_item_nm:'예금은행대출금액',add_item_id:''}
			,PH0047:{list_id:'105',tbl_id:'DT_1YL6701E',atdrc_yn:'U',prd_id:'M',prid_value:'201911',base_item_id:'13103112608999',base_item_nm:'예금은행예금액',add_item_id:''}
			,PH0050:{list_id:'104',tbl_id:'DT_1YL21171',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학생수',add_item_id:''}
			,PH0051:{list_id:'104',tbl_id:'DT_1YL8901',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'대학교 교원수',add_item_id:''}
			,PH0052:{list_id:'104',tbl_id:'DT_1YL8801',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'대학교 재학생수',add_item_id:''}
			,PH0053:{list_id:'104',tbl_id:'DT_1YL21221',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'교원수',add_item_id:''}
			,PH0054:{list_id:'104',tbl_id:'DT_1YL21211',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'원아수',add_item_id:''}
			,PH0055:{list_id:'104',tbl_id:'DT_1YL21251',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'교원수',add_item_id:''}
			,PH0056:{list_id:'104',tbl_id:'DT_1YL21241',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학생수',add_item_id:''}
			,PH0057:{list_id:'104',tbl_id:'DT_1YL21201',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'유치원수',add_item_id:''}
			,PH0058:{list_id:'104',tbl_id:'DT_1YL21191',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학원수',add_item_id:''}
			,PH0059:{list_id:'104',tbl_id:'DT_1YL21181',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'대학수',add_item_id:''}
			,PH0060:{list_id:'104',tbl_id:'DT_1YL21231',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'학교수',add_item_id:''}
			,PH0061:{list_id:'104',tbl_id:'INH_1SSED019R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0062:{list_id:'104',tbl_id:'INH_1SSED064R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우효과있음',add_item_id:'OV_L2_ID::000'}
			,PH0063:{list_id:'111',tbl_id:'DT_1YL9801',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'기온',add_item_id:''}
			,PH0064:{list_id:'111',tbl_id:'DT_1YL9901',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'강수량',add_item_id:''}
			,PH0066:{list_id:'111',tbl_id:'DT_1YL20391',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'소비량',add_item_id:''}
			,PH0067:{list_id:'111',tbl_id:'DT_1YL20061',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'보급률',add_item_id:''}
			,PH0068:{list_id:'111',tbl_id:'DT_1YL4801E',atdrc_yn:'U',prd_id:'M',prid_value:'201812',base_item_id:'16310T2008_0117',base_item_nm:'전력판매량',add_item_id:''}
			,PH0069:{list_id:'111',tbl_id:'INH_1SSEN053R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'전혀 불안하지 않음',add_item_id:'OV_L2_ID::000'}
			,PH0070:{list_id:'101',tbl_id:'DT_1YL20631',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'고령인구비율',add_item_id:''}
			,PH0071:{list_id:'101',tbl_id:'DT_1YL20701',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'남녀성비',add_item_id:''}
			,PH0072:{list_id:'101',tbl_id:'DT_1YL12501E',atdrc_yn:'U',prd_id:'Y',prid_value:'2047',base_item_id:'T10',base_item_nm:'노령화지수',add_item_id:''}
			,PH0073:{list_id:'101',tbl_id:'INH_1B82A01',atdrc_yn:'Y',prd_id:'M',prid_value:'201812',base_item_id:'T1',base_item_nm:'사망자수',add_item_id:'OV_L2_ID::0'}
			,PH0074:{list_id:'101',tbl_id:'INH_1B80A18',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T4',base_item_nm:'사망률',add_item_id:'OV_L1_ID::0'}
			,PH0075:{list_id:'101',tbl_id:'INH_1B26001_A021',atdrc_yn:'Y',prd_id:'M',prid_value:'201911',base_item_id:'T25',base_item_nm:'순이동',add_item_id:'OV_L2_ID::0'}
			,PH0076:{list_id:'101',tbl_id:'DT_1YL21261',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'외국인수',add_item_id:''}
			,PH0077:{list_id:'101',tbl_id:'DT_1YL21271',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'외국인수',add_item_id:''}
			,PH0078:{list_id:'101',tbl_id:'DT_1YL20621',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'인구증가율',add_item_id:''}
			,PH0079:{list_id:'101',tbl_id:'INH_1B26001_A022',atdrc_yn:'Y',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'총전입',add_item_id:'OV_L2_ID::0'}
			,PH0080:{list_id:'101',tbl_id:'INH_1B26001_A023',atdrc_yn:'Y',prd_id:'M',prid_value:'201911',base_item_id:'T20',base_item_nm:'총전출',add_item_id:'OV_L2_ID::0'}
			,PH0081:{list_id:'101',tbl_id:'DT_1YL20651E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'T20',base_item_nm:'계',add_item_id:''}
			,PH0082:{list_id:'101',tbl_id:'DT_1BPB002E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2035',base_item_id:'T10',base_item_nm:'추계인구',add_item_id:'OV_L2_ID::0'}
			,PH0083:{list_id:'101',tbl_id:'INH_1B81A01',atdrc_yn:'N',prd_id:'M',prid_value:'201812',base_item_id:'T1',base_item_nm:'계',add_item_id:''}
			,PH0084:{list_id:'101',tbl_id:'INH_1B81A17',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T1',base_item_nm:'합계출산율',add_item_id:''}
			,PH0085:{list_id:'101',tbl_id:'INH_1EA1011_01',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T02',base_item_nm:'농가인구',add_item_id:''}
			,PH0087:{list_id:'101',tbl_id:'INH_1ZB7024',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'어가인구',add_item_id:'OV_L2_ID::A00,OV_L3_ID::B00'}
			,PH0089:{list_id:'102',tbl_id:'DT_1YL21161',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'비율',add_item_id:''}
			,PH0090:{list_id:'102',tbl_id:'INH_1B8000I_01',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T51',base_item_nm:'조이혼율 (천명당)',add_item_id:''}
			,PH0091:{list_id:'102',tbl_id:'INH_1B83A35',atdrc_yn:'N',prd_id:'M',prid_value:'201812',base_item_id:'T3',base_item_nm:'혼인',add_item_id:''}
			,PH0092:{list_id:'102',tbl_id:'INH_1B83A23',atdrc_yn:'N',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'계',add_item_id:''}
			,PH0093:{list_id:'102',tbl_id:'INH_1B8000I_02',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T41',base_item_nm:'조혼인율 (천명당)',add_item_id:''}
			,PH0094:{list_id:'102',tbl_id:'INH_1SSWE011R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'많이 좋아짐',add_item_id:'OV_L2_ID::000'}
			,PH0095:{list_id:'102',tbl_id:'DT_1YL20951',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0096:{list_id:'102',tbl_id:'DT_1YL12701',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'독거노인비율',add_item_id:''}
			,PH0097:{list_id:'102',tbl_id:'INH_1SSFA139R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T31',base_item_nm:'-매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0098:{list_id:'102',tbl_id:'INH_1SSFA021R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T20',base_item_nm:'장남 또는 맏며느리',add_item_id:'OV_L2_ID::000'}
			,PH0099:{list_id:'103',tbl_id:'DT_1YL21021E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'EQ-5D',add_item_id:''}
			,PH0100:{list_id:'103',tbl_id:'DT_1YL21011E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'주관적 건강수준인지율',add_item_id:''}
			,PH0101:{list_id:'103',tbl_id:'DT_1YL0301E',atdrc_yn:'U',prd_id:'F',prid_value:'2017',base_item_id:'B44T16',base_item_nm:'남',add_item_id:''}
			,PH0103:{list_id:'103',tbl_id:'DT_1YL11001E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'16117ABC0915',base_item_nm:'결핵신고 신환자수',add_item_id:''}
			,PH0104:{list_id:'103',tbl_id:'DT_1YL20291E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'고위험음주율',add_item_id:''}
			,PH0105:{list_id:'103',tbl_id:'DT_1YL20991E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'음주율',add_item_id:''}
			,PH0106:{list_id:'103',tbl_id:'DT_1YL21031E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'비만율',add_item_id:''}
			,PH0107:{list_id:'103',tbl_id:'DT_1YL21041E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'스트레스 인지율',add_item_id:''}
			,PH0108:{list_id:'103',tbl_id:'DT_1YL21001E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'SR',base_item_nm:'흡연율',add_item_id:''}
			,PH0109:{list_id:'103',tbl_id:'INH_1SSHE020R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T40',base_item_nm:'규칙적 운동-실천한다',add_item_id:'OV_L2_ID::000'}
			,PH0110:{list_id:'103',tbl_id:'DT_1YL8101E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'16350AAA0',base_item_nm:'의료기관 수술인원',add_item_id:''}
			,PH0111:{list_id:'103',tbl_id:'DT_1YL20971',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'병상수',add_item_id:''}
			,PH0112:{list_id:'103',tbl_id:'DT_1YL20981',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'의사수',add_item_id:''}
			,PH0113:{list_id:'107',tbl_id:'DT_1YL7401E',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'13103792712T1',base_item_nm:'건축착공면적',add_item_id:''}
			,PH0114:{list_id:'107',tbl_id:'DT_1YL7701',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'건축허가면적 증감률',add_item_id:''}
			,PH0115:{list_id:'107',tbl_id:'DT_1YL7501E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'13103871094T1',base_item_nm:'주택건설실적',add_item_id:''}
			,PH0116:{list_id:'107',tbl_id:'DT_1YL13401E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'13103871096T6',base_item_nm:'주택보급률',add_item_id:''}
			,PH0117:{list_id:'107',tbl_id:'INH_1JU1501',atdrc_yn:'N',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주택',add_item_id:''}
			,PH0118:{list_id:'107',tbl_id:'DT_1YL20201E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'13103114386T2',base_item_nm:'면적',add_item_id:''}
			,PH0119:{list_id:'107',tbl_id:'DT_1YL20161E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'아파트매매가격지수',add_item_id:''}
			,PH0120:{list_id:'107',tbl_id:'DT_1YL20191E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'아파트월세가격지수',add_item_id:''}
			,PH0121:{list_id:'107',tbl_id:'DT_1YL20181E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'아파트월세통합가격지수',add_item_id:''}
			,PH0122:{list_id:'107',tbl_id:'DT_1YL20171E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'아파트전세가격지수',add_item_id:''}
			,PH0123:{list_id:'107',tbl_id:'DT_1YL1701',atdrc_yn:'Y',prd_id:'M',prid_value:'201912',base_item_id:'T10',base_item_nm:'주택가격 변동률',add_item_id:''}
			,PH0124:{list_id:'107',tbl_id:'DT_1YL13501E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'주택매매가격지수',add_item_id:''}
			,PH0125:{list_id:'107',tbl_id:'DT_1YL20151E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'주택월세가격지수',add_item_id:''}
			,PH0126:{list_id:'107',tbl_id:'DT_1YL20141E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'rent',base_item_nm:'주택월세통합가격지수',add_item_id:''}
			,PH0127:{list_id:'107',tbl_id:'DT_1YL13601E',atdrc_yn:'Y',prd_id:'M',prid_value:'202001',base_item_id:'sales',base_item_nm:'주택전세가격지수',add_item_id:''}
			,PH0128:{list_id:'107',tbl_id:'DT_1YL20881E',atdrc_yn:'N',prd_id:'M',prid_value:'201912',base_item_id:'13103890822T1',base_item_nm:'지가변동률',add_item_id:''}
			,PH0129:{list_id:'107',tbl_id:'DT_1YL20761',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'개소',add_item_id:''}
			,PH0130:{list_id:'107',tbl_id:'DT_1YL20721',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'도로포장률',add_item_id:''}
			,PH0131:{list_id:'107',tbl_id:'DT_1YL20731',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'등록대수',add_item_id:''}
			,PH0132:{list_id:'107',tbl_id:'DT_1YL20071',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'확보율',add_item_id:''}
			,PH0133:{list_id:'107',tbl_id:'DT_1YL21291E',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'16315T2008_0012',base_item_nm:'도시지역면적',add_item_id:''}
			,PH0134:{list_id:'107',tbl_id:'DT_1YL14001',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'음주운전 교통사고 비율',add_item_id:''}
			,PH0135:{list_id:'107',tbl_id:'DT_1YL21051',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'건수',add_item_id:''}
			,PH0136:{list_id:'107',tbl_id:'DT_1YL20331',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'지수',add_item_id:'OV_L2_ID::00'}
			,PH0137:{list_id:'108',tbl_id:'INH_1SSCL050R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T12',base_item_nm:'관광자 1인당 여행횟수',add_item_id:'OV_L2_ID::000'}
			,PH0138:{list_id:'108',tbl_id:'INH_1SSCL060R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T12',base_item_nm:'· 관광여행자 1인당 여행횟수(평균)',add_item_id:'OV_L2_ID::000'}
			,PH0139:{list_id:'108',tbl_id:'INH_1SSCL030R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'관람횟수(평균)',add_item_id:'OV_L2_ID::000'}
			,PH0140:{list_id:'108',tbl_id:'INH_1SSCL091R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0141:{list_id:'108',tbl_id:'INH_1SSCL092R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T01',base_item_nm:'경제적 부담',add_item_id:'OV_L2_ID::000'}
			,PH0142:{list_id:'108',tbl_id:'DT_1YL20931',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0143:{list_id:'108',tbl_id:'DT_1YL2401',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0144:{list_id:'108',tbl_id:'DT_1YL10901',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'지정등록문화재',add_item_id:''}
			,PH0145:{list_id:'108',tbl_id:'DT_1YL21281',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'조성면적',add_item_id:''}
			,PH0146:{list_id:'108',tbl_id:'DT_1YL4001E',atdrc_yn:'U',prd_id:'H',prid_value:'200702',base_item_id:'13103112708T1',base_item_nm:'인터넷이용률',add_item_id:''}
			,PH0147:{list_id:'110',tbl_id:'DT_1YL3401',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'발생건수',add_item_id:''}
			,PH0148:{list_id:'110',tbl_id:'DT_1YL3001',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'발생건수',add_item_id:''}
			,PH0149:{list_id:'110',tbl_id:'DT_1YL20321',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'발생건수',add_item_id:'OV_L2_ID::10'}
			,PH0150:{list_id:'110',tbl_id:'DT_1YL21081',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'건수',add_item_id:''}
			,PH0151:{list_id:'110',tbl_id:'DT_1YL8601',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'화재발생 건수',add_item_id:''}
			,PH0152:{list_id:'110',tbl_id:'DT_1YL13901',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'뺑소니 교통사고율',add_item_id:''}
			,PH0153:{list_id:'110',tbl_id:'DT_1YL10005',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T001',base_item_nm:'사망률(십만명당)',add_item_id:''}
			,PH0154:{list_id:'110',tbl_id:'INH_1SSSA010R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 안전',add_item_id:'OV_L2_ID::000'}
			,PH0155:{list_id:'110',tbl_id:'INH_1SSSA131R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T20',base_item_nm:'두려운 곳이 있다',add_item_id:'OV_L2_ID::000'}
			,PH0156:{list_id:'110',tbl_id:'DT_1YL21061',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0157:{list_id:'110',tbl_id:'DT_1YL21071',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0158:{list_id:'110',tbl_id:'DT_1YL21111',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'이수율',add_item_id:''}
			,PH0159:{list_id:'110',tbl_id:'DT_1YL20341',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'등급',add_item_id:'OV_L2_ID::10'}
			,PH0160:{list_id:'110',tbl_id:'DT_1YL20351',atdrc_yn:'U',prd_id:'Y',prid_value:'2016',base_item_id:'T10',base_item_nm:'합계',add_item_id:'OV_L2_ID::10'}
			,PH0161:{list_id:'110',tbl_id:'DT_1YL21091',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0162:{list_id:'110',tbl_id:'DT_1YL21101',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'주민수',add_item_id:''}
			,PH0163:{list_id:'110',tbl_id:'DT_1YL20361',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'합계',add_item_id:''}
			,PH0164:{list_id:'112',tbl_id:'DT_1YL20301',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'인구수',add_item_id:'OV_L2_ID::10'}
			,PH0165:{list_id:'112',tbl_id:'DT_1YL20311',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T01',base_item_nm:'진료실인원',add_item_id:'OV_L2_ID::10'}
			,PH0166:{list_id:'112',tbl_id:'DT_1YL13801E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'TT',base_item_nm:'국민기초생활보장 수급자수',add_item_id:''}
			,PH0167:{list_id:'112',tbl_id:'DT_1YL8001E',atdrc_yn:'N',prd_id:'M',prid_value:'200812',base_item_id:'1635413103140064SC0',base_item_nm:'요양기관수',add_item_id:''}
			,PH0168:{list_id:'112',tbl_id:'DT_1YL20961',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0170:{list_id:'112',tbl_id:'DT_1YL20271',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'종사자수',add_item_id:'OV_L2_ID::00'}
			,PH0171:{list_id:'112',tbl_id:'DT_1YL20941',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'시설수',add_item_id:''}
			,PH0172:{list_id:'112',tbl_id:'DT_1YL13001',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'보건 및 사회복지사업체 비율',add_item_id:''}
			,PH0173:{list_id:'112',tbl_id:'DT_1YL13101',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'보건 및 사회복지사업 종사자 비율',add_item_id:''}
			,PH0176:{list_id:'112',tbl_id:'DT_1YL2101E',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'16110T2009_036',base_item_nm:'지방자치단체공무원 현원',add_item_id:''}
			,PH0177:{list_id:'112',tbl_id:'DT_1YL2201',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'인구 천명당 지방자치단체 공무원 현원',add_item_id:''}
			,PH0178:{list_id:'112',tbl_id:'DT_1YL20901',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'비중',add_item_id:''}
			,PH0179:{list_id:'112',tbl_id:'DT_1YL10801',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'관리기금 현황',add_item_id:''}
			,PH0181:{list_id:'112',tbl_id:'INH_1SSSP020R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0182:{list_id:'112',tbl_id:'INH_1SSSP052R',atdrc_yn:'U',prd_id:'F',prid_value:'2017',base_item_id:'T10',base_item_nm:'참여자',add_item_id:'OV_L2_ID::000'}
			,PH0183:{list_id:'112',tbl_id:'INH_1SSSP181R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T10',base_item_nm:'참여한 적 있다',add_item_id:'OV_L2_ID::000'}
			,PH0185:{list_id:'111',tbl_id:'DT_1YL20751',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'보급률',add_item_id:''}
			,PH0186:{list_id:'111',tbl_id:'DT_1YL21311',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'일반폐기물재활용률',add_item_id:''}
			,PH0187:{list_id:'111',tbl_id:'DT_1YL21321',atdrc_yn:'Y',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'배출량',add_item_id:''}
			,PH0188:{list_id:'111',tbl_id:'DT_1YL21301E',atdrc_yn:'N',prd_id:'Y',prid_value:'2017',base_item_id:'13103130602I119',base_item_nm:'폐수배출업소수',add_item_id:''}
			,PH0189:{list_id:'111',tbl_id:'INH_1SSEN015R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 좋다',add_item_id:'OV_L2_ID::000'}
			,PH0190:{list_id:'111',tbl_id:'DT_1YL13201',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'개발제한구역',add_item_id:''}
			,PH0191:{list_id:'111',tbl_id:'INH_1EB002',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T20',base_item_nm:'논',add_item_id:''}
			,PH0192:{list_id:'103',tbl_id:'INH_1SSHE102R',atdrc_yn:'U',prd_id:'F',prid_value:'2018',base_item_id:'T21',base_item_nm:'매우 만족',add_item_id:'OV_L2_ID::000'}
			,PH0193:{list_id:'106',tbl_id:'INH_1ES3A02S_01',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T2',base_item_nm:'경제활동인구 (천명)',add_item_id:'OV_L2_ID::S0'}
			,PH0194:{list_id:'106',tbl_id:'INH_1DA7014S_01',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T20',base_item_nm:'경제활동인구',add_item_id:'OV_L2_ID::0'}
			,PH0195:{list_id:'106',tbl_id:'INH_1ES3A02S_02',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T6',base_item_nm:'경제활동참가율 (％)',add_item_id:'OV_L2_ID::S0'}
			,PH0196:{list_id:'106',tbl_id:'INH_1DA7014S_02',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T60',base_item_nm:'경제활동참가율',add_item_id:'OV_L2_ID::0'}
			,PH0197:{list_id:'106',tbl_id:'INH_1ES3A02S_03',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T7',base_item_nm:'고용률 (%)',add_item_id:'OV_L2_ID::S0'}
			,PH0198:{list_id:'106',tbl_id:'INH_1DA7014S_03',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T90',base_item_nm:'고용률',add_item_id:'OV_L2_ID::0'}
			,PH0199:{list_id:'106',tbl_id:'DT_1YL15007E',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T1',base_item_nm:'구직급여 신청자수',add_item_id:''}
			,PH0200:{list_id:'106',tbl_id:'DT_1YL15005E',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'index2',base_item_nm:'상용총근로시간',add_item_id:''}
			,PH0201:{list_id:'106',tbl_id:'DT_1YL15002',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T001',base_item_nm:'비정규직근로자 비율',add_item_id:''}
			,PH0202:{list_id:'106',tbl_id:'DT_1YL15003',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T001',base_item_nm:'상용직 비중',add_item_id:''}
			,PH0203:{list_id:'106',tbl_id:'DT_1YL15004',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T001',base_item_nm:'상용직 비중',add_item_id:''}
			,PH0204:{list_id:'106',tbl_id:'INH_1DA7104S',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T80',base_item_nm:'실업률',add_item_id:'OV_L2_ID::0'}
			,PH0205:{list_id:'106',tbl_id:'INH_1ES3A01S',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T8',base_item_nm:'실업률 (％)',add_item_id:''}
			,PH0206:{list_id:'106',tbl_id:'DT_1YL15006',atdrc_yn:'U',prd_id:'Y',prid_value:'2019',base_item_id:'T001',base_item_nm:'상용 월평균 임금',add_item_id:''}
			,PH0207:{list_id:'106',tbl_id:'INH_1DA7015S',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T90',base_item_nm:'고용률',add_item_id:'OV_L2_ID::75'}
			,PH0208:{list_id:'106',tbl_id:'INH_1ES3A03_A01S',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T12',base_item_nm:'고용률 (%)',add_item_id:'OV_L2_ID::010'}
			,PH0209:{list_id:'106',tbl_id:'INH_1DA7030S',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T30',base_item_nm:'취업자',add_item_id:'OV_L2_ID::0'}
			,PH0210:{list_id:'106',tbl_id:'INH_1ES3A02S_04',atdrc_yn:'U',prd_id:'H',prid_value:'201901',base_item_id:'T3',base_item_nm:'취업자 (천명)',add_item_id:'OV_L2_ID::S0'}
			,PH0211:{list_id:'104',tbl_id:'DT_1YL15001',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T001',base_item_nm:'전체',add_item_id:''}
			,PH0212:{list_id:'112',tbl_id:'INH_1SSSP062R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T10',base_item_nm:'기부함',add_item_id:'OV_L2_ID::000'}
			,PH0213:{list_id:'112',tbl_id:'INH_1SSSP041R',atdrc_yn:'U',prd_id:'F',prid_value:'2019',base_item_id:'T11',base_item_nm:'몸이 아파 집안일을 부탁할 경우 - 도움을 받을 수 있는 사람 있음',add_item_id:'OV_L2_ID::000'}
			,PH0214:{list_id:'112',tbl_id:'INH_1ES4G07S',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T10',base_item_nm:'- 국민연금',add_item_id:''}
			,PH0215:{list_id:'109',tbl_id:'DT_1YL6501',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'부도업체수',add_item_id:''}
			,PH0216:{list_id:'109',tbl_id:'DT_1YL15010',atdrc_yn:'U',prd_id:'Q',prid_value:'201904',base_item_id:'T001',base_item_nm:'증감률',add_item_id:''}
			,PH0217:{list_id:'109',tbl_id:'DT_1YL15009',atdrc_yn:'U',prd_id:'M',prid_value:'201912',base_item_id:'T001',base_item_nm:'증감률',add_item_id:''}
			,PH0218:{list_id:'109',tbl_id:'DT_1YL15012',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T001',base_item_nm:'종사자수',add_item_id:'OV_L2_ID::0'}
			,PH0220:{list_id:'105',tbl_id:'INH_1C86_04',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T3',base_item_nm:'1인당 개인소득',add_item_id:''}
			,PH0221:{list_id:'105',tbl_id:'INH_1C86_03',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T2',base_item_nm:'1인당 지역총소득',add_item_id:''}
			,PH0224:{list_id:'105',tbl_id:'DT_1YL20581',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T10',base_item_nm:'변동률',add_item_id:''}
			,PH0225:{list_id:'105',tbl_id:'INH_1J17112',atdrc_yn:'U',prd_id:'M',prid_value:'202001',base_item_id:'T',base_item_nm:'소비자물가지수',add_item_id:'OV_L2_ID::0'}
			,PH0226:{list_id:'110',tbl_id:'DT_1YL15013',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T001',base_item_nm:'경찰공무원 1인당 담당주민수',add_item_id:''}
			,PH0227:{list_id:'101',tbl_id:'INH_1IN1503_01',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'총인구(명)',add_item_id:''}
			,PH0228:{list_id:'101',tbl_id:'INH_1B83A10',atdrc_yn:'U',prd_id:'Y',prid_value:'2018',base_item_id:'T1',base_item_nm:'남편',add_item_id:''}
			,PH0229:{list_id:'101',tbl_id:'INH_1B83A09',atdrc_yn:'N',prd_id:'Y',prid_value:'2018',base_item_id:'T10',base_item_nm:'남편',add_item_id:''}
			,PH0230:{list_id:'101',tbl_id:'INH_1IN1503_02',atdrc_yn:'Y',prd_id:'Y',prid_value:'2018',base_item_id:'T00',base_item_nm:'총인구(명)',add_item_id:'OV_L2_ID::126'}
			,PH0231:{list_id:'107',tbl_id:'DT_1YL20731',atdrc_yn:'Y',prd_id:'Y',prid_value:'2019',base_item_id:'T10',base_item_nm:'등록대수',add_item_id:''}
			,PH0233:{list_id:'107',tbl_id:'DT_1YL15008',atdrc_yn:'Y',prd_id:'F',prid_value:'2015',base_item_id:'T002',base_item_nm:'자기집',add_item_id:''}
			,PH0234:{list_id:'111',tbl_id:'DT_1YL20401',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T01',base_item_nm:'생산량',add_item_id:'OV_L2_ID::10'}
			,PH0235:{list_id:'111',tbl_id:'DT_1YL20411',atdrc_yn:'U',prd_id:'Y',prid_value:'2017',base_item_id:'T01',base_item_nm:'생산량',add_item_id:'OV_L2_ID::11'}
		},

		/**
		 * @name		 : LifeCycleClick
		 * @description  : 생애주기 선택
		 * @date		 : 2019.08.20
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		item   : 생애주기 id
		 * 		itemNm : 생애주기 명
		 */
		LifeCycleClick : function(item, itemNm) {
			var DivClick = "#" + item;

			if($(DivClick).is(".on") == true) {
				$(DivClick).removeClass("on");
				// 생애주기 선택 갯수 삭제
				$statsMeMap.ui.lifeCycleCount--;

				// 생애주기 선택항목 id list에서 삭제
				$statsMeMap.ui.lifeCycleItemIdList.splice($statsMeMap.ui.lifeCycleItemIdList.indexOf(item), 1);
				// 생애주기 선택항목 명 list에서 삭제
				$statsMeMap.ui.lifeCycleItemNmList.splice($statsMeMap.ui.lifeCycleItemNmList.indexOf(itemNm), 1);
			} else {
				// 생애주기 선택 갯수 체크
				if($statsMeMap.ui.lifeCycleCount == 2){
					/** 생애주기 두개 이상 선택시 최초 선택 항목 삭제처리 START */
					// 생애주기 선택 갯수 삭제
					var tempItemId= $statsMeMap.ui.lifeCycleItemIdList[0];
					var tempItemNm= $statsMeMap.ui.lifeCycleItemNmList[0];
					// 최초 선택 항목 css 제거
					var tempDivClick = "#" + tempItemId;
					$(tempDivClick).removeClass("on");
					// 생애주기 선택항목 id list에서 삭제
					$statsMeMap.ui.lifeCycleItemIdList.splice($statsMeMap.ui.lifeCycleItemIdList.indexOf(tempItemId), 1);
					// 생애주기 선택항목 명 list에서 삭제
					$statsMeMap.ui.lifeCycleItemNmList.splice($statsMeMap.ui.lifeCycleItemNmList.indexOf(tempItemNm), 1);
					/** 생애주기 두개 이상 선택시 최초 선택 항목 삭제처리 END */

					/** 2개 이상 선택 후 선택 한 항목 추가 START */
					$(DivClick).addClass("on");
					// 생애주기 선택항목 id list에 추가
					$statsMeMap.ui.lifeCycleItemIdList.push(item);
					// 생애주기 선택항목 명 list에 추가
					$statsMeMap.ui.lifeCycleItemNmList.push(itemNm);
					/** 2개 이상 선택 후 선택 한 항목 추가 END */
				} else {
					$(DivClick).addClass("on");
					// 생애주기 선택 갯수 증가
					$statsMeMap.ui.lifeCycleCount++;

					// 생애주기 선택항목 id list에 추가
					$statsMeMap.ui.lifeCycleItemIdList.push(item);
					// 생애주기 선택항목 명 list에 추가
					$statsMeMap.ui.lifeCycleItemNmList.push(itemNm);
				}
			}

			// 목록 조회
			$statsMeMap.ui.searchStatsGrphInfo($("#selectStatMeCatalogSorting option:selected").val());
		},

		/**
		 * @name		 : InterestRealmClick
		 * @description  : 관심분야(거리선택) 선택
		 * @date		 : 2019.08.20
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		item   : 관심분야(거리선택) id
		 * 		itemNm : 관심분야(거리선택) 명
		 */
		InterestRealmClick : function(item, itemNm) {
			var DivClick = "#" + item;

			if($(DivClick).is(".on") == true) {
				$(DivClick).removeClass("on");
				// 생애주기 선택 갯수 삭제
				$statsMeMap.ui.interestRealmCount--;

				// 관심분야(거리선택) 선택항목 id list에서 삭제
				$statsMeMap.ui.interestRealmItemIdList.splice($statsMeMap.ui.interestRealmItemIdList.indexOf(item), 1);
				// 관심분야(거리선택) 선택항목 명 list에서 삭제
				$statsMeMap.ui.interestRealmItemNmList.splice($statsMeMap.ui.interestRealmItemNmList.indexOf(itemNm), 1);
			} else {
				// 관심분야(거리선택) 선택 갯수 체크
				if($statsMeMap.ui.interestRealmCount == 2){
					/** 관심분야(거리선택) 두개 이상 선택시 최초 선택 항목 삭제처리 START */
					// 관심분야(거리선택) 선택 갯수 삭제
					var tempItemId= $statsMeMap.ui.interestRealmItemIdList[0];
					var tempItemNm= $statsMeMap.ui.interestRealmItemNmList[0];
					// 최초 선택 항목 css 제거
					var tempDivClick = "#" + tempItemId;
					$(tempDivClick).removeClass("on");
					// 관심분야(거리선택) 선택항목 id list에서 삭제
					$statsMeMap.ui.interestRealmItemIdList.splice($statsMeMap.ui.interestRealmItemIdList.indexOf(tempItemId), 1);
					// 관심분야(거리선택) 선택항목 명 list에서 삭제
					$statsMeMap.ui.interestRealmItemNmList.splice($statsMeMap.ui.interestRealmItemNmList.indexOf(tempItemNm), 1);
					/** 관심분야(거리선택) 두개 이상 선택시 최초 선택 항목 삭제처리 END */

					/** 2개 이상 선택 후 선택 한 항목 추가 START */
					$(DivClick).addClass("on");
					// 관심분야(거리선택) 선택항목 id list에 추가
					$statsMeMap.ui.interestRealmItemIdList.push(item);
					// 관심분야(거리선택) 선택항목 명 list에 추가
					$statsMeMap.ui.interestRealmItemNmList.push(itemNm);
					/** 2개 이상 선택 후 선택 한 항목 추가 END */
				} else {
					$(DivClick).addClass("on");
					// 관심분야(거리선택) 선택 갯수 증가
					$statsMeMap.ui.interestRealmCount++;

					// 관심분야(거리선택) 선택항목 id list에 추가
					$statsMeMap.ui.interestRealmItemIdList.push(item);
					// 관심분야(거리선택) 선택항목 명 list에 추가
					$statsMeMap.ui.interestRealmItemNmList.push(itemNm);
				}
			}

			// 조회 조건 생성
			$statsMeMap.ui.searchStatsGrphInfo($("#selectStatMeCatalogSorting option:selected").val());
		},

		/**
		 * @name		 : searchStatsGrphInfo
		 * @description  : 통계지리 정보 목록 조회 조건 설정
		 * @date		 : 2019.09.02
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 * 		orderType : 정렬
		 */
		searchStatsGrphInfo : function(orderType) {
			var dataParams = {};

			// 생애주기 param 값 셋팅
			if($statsMeMap.ui.lifeCycleItemIdList.length > 0){
				if($statsMeMap.ui.lifeCycleItemIdList[1] != null && $statsMeMap.ui.lifeCycleItemIdList[1] != ""){
					dataParams.lifeCycleItemId = $statsMeMap.ui.lifeCycleItemIdList[0] + "," + $statsMeMap.ui.lifeCycleItemIdList[1];
				} else {
					dataParams.lifeCycleItemId = $statsMeMap.ui.lifeCycleItemIdList[0];
				}

			}
			// 관심분야 param 값 셋팅
			if($statsMeMap.ui.interestRealmItemIdList.length > 0){
				if($statsMeMap.ui.interestRealmItemIdList[1] != null && $statsMeMap.ui.interestRealmItemIdList[1] != ""){
					dataParams.interestRealmItemId = $statsMeMap.ui.interestRealmItemIdList[0] + "," + $statsMeMap.ui.interestRealmItemIdList[1];
				} else {
					dataParams.interestRealmItemId = $statsMeMap.ui.interestRealmItemIdList[0];
				}
			}
			// 키워드 조회조건 추가
			if($("#statsMeCatalogKwrd").val() != null && $("#statsMeCatalogKwrd").val().replace(/ /gi, "") != ""){
				dataParams.searchKwrd = $("#statsMeCatalogKwrd").val().trim();		// 선택한 유사키워드
			}
			dataParams.orderType = orderType;	// 정렬 변수

			/** 2020.09.16[한광희] 페이징 변수 추가 START */
			dataParams.page = $statsMeMap.ui.statsMeListPagingIndex;
			dataParams.pageSize = 10;
			/** 2020.09.16[한광희] 페이징 변수 추가 END */

			$statsMeMap.ui.statsGrphInfoLoadData(dataParams);	// 통계지리 정보 목록 조회

		},
		/**
		 * @name : statsGrphInfoLoadData
		 * @description : 통계지리 정보 목록 조회
		 * @date : 2019. 07. 01.
		 * @author : 한광희
		 * @history :
		 */
		statsGrphInfoLoadData : function(dataParams){
			common_loading(true); // 로딩바
			console.log("dataParams = " + JSON.stringify(dataParams));

			$.ajax({
				type: "POST",
				url : contextPath + "/m2020/statsMe/getStatsMeCatalogData.json",
				dataType: 'json',
				async: false,
				data:dataParams,
			    success: function(res){
			    	if(res.errCd == 0){
			    		/** 2020.09.16[한광희] 목록 조회 페이징으로 변경 START */
			    		statsGrphInfoList = res.result.statsGrphInfoList;	// 통계지리 목록
			    		$statsMeMap.ui.statsMeListCount = res.result.statsGrphInfoListCount;	// 2020.09.16[한광희] 통계지리 목록 건수
						//var statsGrphInfoSgisSrvList = res.result.statsGrphInfoSgisSrvList;	// 통계지리 관련 SGIS 목록	// 2020.09.21[한광희] My통계로 쿼리 수정
						$("#list_cnt").text("검색결과 : " + appendCommaToNumber(res.result.statsGrphInfoListCount) +" 건");
						if($statsMeMap.ui.statsMeListPagingIndex == 1){
							// 리스트 초기화
							$("#list_div").empty();
						}
						// 리스트 추가
						if(statsGrphInfoList.length > 0){
//							$("#list_div").attr("style", "height: calc(100% - 360px); border-top: 1px solid #f1f1f1;");	
							//2022-12-21 css 수정
							$("#list_div").attr("style", "height: calc(100% - 250px); border-top: 1px solid #f1f1f1;");
							$.each(statsGrphInfoList, function(cnt, node){
								$("#list_div").append(
									$("<div/>", {"class":"gridheader_con", "id":node.stat_data_id}).append(
										$("<div/>", {"class":"gridrow"}).append(
											$("<h2/>", {"text":node.stat_data_srv_nm})
										),
										$("<div/>", {"class":"gridrow_txt"}).append(
											$("<p/>", {"text":(node.stat_data_exp?node.stat_data_exp:" - ")})
										)
									).click(function(){
										$statsMeMap.ui.listTitleClickEvent(node.stat_data_id, node.stat_data_srv_nm, node.stat_data_exp);
										return false;
									})
								);
							});
							if($statsMeMap.ui.statsMeListPagingIndex == 1){
								$("#list_div").scrollTop(0,0);	 // 목록 상단 이동
							}
							/** 2020.09.16[한광희] 목록 조회 페이징으로 변경 END */
						}
						else{
							/*$("#list_div").attr("style", "height: calc(100% - 360px); border-top: 1px solid #f1f1f1; display:flex; align-items:center; justify-content:center;");*/
							$("#list_div").attr("style", "height: calc(100% - 250px); border-top: 1px solid #f1f1f1;");	//2022-12-21 css 수정
							/*$("#list_div").append(
								$("<h2/>", {"text":"조회된 정보가 없습니다."})
							)*/
						}
						common_loading(false); // 로딩바
			    	} else {
						common_alert('failed!');
					}
				} ,
				error:function(err) {
					common_alert(err.responseText);
				}
			});
		},

		/**
		 * @name		 : kwrdSearch
		 * @description  : 키워드 검색
		 * @date		 : 2019.09.03
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		kwrdSearch : function(){
			$statsMeMap.ui.searchKwrd = $("#statsMeCatalogKwrd").val();	// 키워드 검색명 셋팅
			var orderType = $("#selectStatMeCatalogSorting option:selected").val();
			$statsMeMap.ui.searchStatsGrphInfo(orderType);		// 통계지리 정보 목록 조회
		},

		/**
		 * @name		 : listTitleClickEvent
		 * @description  : 통계지리 정보 목록 제목 클릭시 해당 건만 지도로 보기 화면 이동.
		 * @date		 : 2019.10.30
		 * @author		 : 한광희
		 * @history 	 :
		 * @param
		 */
		listTitleClickEvent : function(dataId, dataNm, dataExp){
			// 목록 선택
			$(".gridheader_con").removeClass("on");
			$("#"+dataId).addClass("on");
			srvLogWrite('O0', '03', '05', '00', dataNm, '');
			$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김 처리

			$("#map_tit").text(dataNm);

			$("#statsMeInfo").empty();
			$("#statsMeInfo").append(
				$("<div/>", {"class":"gridrow"}).append(
						$("<h2/>", {"text": dataNm}),
						$("<a/>", {"href":"javascript:void(0);srvLogWrite(\"O0\", \"03\", \"07\", \"01\", \"\", \"\");'", "class":"databoardBtn", "text":"데이터보드"}).click(function(){
							$statsMeMap.ui.dataBoardClick(dataId);
							return false;
						})
				),
				$("<div/>", {"class":"gridrow_txt"}).append(
					$("<p/>", {"text":dataExp})
				)
			);
			$("#stat_data_srv_nm").html(dataNm);
			$("#stat_data_exp").html(dataExp);

			$("#stastMeListPopup_close").trigger("click");	// 목록 닫기

			// 동일한 목록 선택시 조회 안하고 지도로 이동
			if($statsMeMap.ui.selectDataId != dataId){
				// 지도 조회
				$statsMeMap.ui.loadMapData(dataId);
			}

		},

		/**
		 * @name		 : dataBoardClick
		 * @description  : 데이터 보드 내역 보기
		 * @date		 : 2020.06.18
		 * @author		 : 주형식
		 * @history 	 :
		 * @param
		 */
		dataBoardClick : function(dataId){
			$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
			$statsMeMap.ui.statsMeListPopupToggle(false);	// 통계지리 정보 목록 숨김

			$("#statsSelectDiv2").show();

			var galleryThumbs = new Swiper('#dataBoardTit', {

		        spaceBetween: 0,
		        slidesPerView: 3,
		        freeMode: true,
		        watchSlidesVisibility: true,
		        watchSlidesProgress: true,
		    });
			var galleryTop = new Swiper('#statsMe_detaboard', {
				spaceBetween: 10,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				thumbs: {
					swiper: galleryThumbs
				}
				/** 2020.09.21[한광희] 데이터보드 상단이동 추가 START */
				, on : {
					slideChange : function(){
						$("#statsMe_detaboard").scrollTop(0,0);	// 데이터보드 스크롤 상단이동
					}
				}
				/** 2020.09.21[한광희] 데이터보드 상단이동 추가 END */
			});
			$("#statsMe_detaboard").scrollTop(0,0);	// 데이터보드 스크롤 상단이동

			// 표 두번째 탭 선택
			galleryTop.slideTo(1);
		},

		/**
		 * @name		 : dataBoardClose
		 * @description  : 데이터 보드 내역 숨기기
		 * @date		 : 2020.06.18
		 * @author		 : 주형식
		 * @history 	 :
		 * @param
		 */
		dataBoardClose : function(){
			$("#statsSelectDiv2").hide();
			$("#selBoardType").hide();
			$("#statsGraphWrapDiv2").hide();

			$(".data_table").hide();
		},

		/**
		 * @name : loadMapData
		 * @description : 지도 데이터 조회
		 * @date : 2019.08.21
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_stat_data_id : 통계자료코드
		 */
		loadMapData : function(p_stat_data_id) {
			// 선택된 data id 저장
			$statsMeMap.ui.selectDataId = p_stat_data_id;

			//저장된 위치 불러오기
			$statsMeMap.ui.getAreaSido($statsMeMap.ui.default_sido_cd);
			$statsMeMap.ui.getAreaSgg($statsMeMap.ui.default_sido_cd, $statsMeMap.ui.default_sgg_cd);
			$statsMeMap.ui.getAreaEmdong($statsMeMap.ui.default_sido_cd, $statsMeMap.ui.default_sgg_cd, $statsMeMap.ui.default_emdong_cd);
			$statsMeMap.ui.setPositionText();

			var lv_adm_coor_x = 990480.875;
			var lv_adm_coor_y = 1815839.375;
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");

			if(lv_sido_cd != "99") {
				lv_adm_coor_x = lv_sido_coor_x;
				lv_adm_coor_y = lv_sido_coor_y;
			}
			if(lv_sgg_cd != "999") {
				lv_adm_coor_x = lv_sgg_coor_x;
				lv_adm_coor_y = lv_sgg_coor_y;
			}
			if(lv_emdong_cd != "99") {
				lv_adm_coor_x = lv_emdong_coor_x;
				lv_adm_coor_y = lv_emdong_coor_y;
			}

			//지도 위치 초기화
			$statsMeMap.ui.mapMoveEventYn = "N";
			/*$statsMeMap.ui.map.mapMove([lv_adm_coor_x, lv_adm_coor_y], $statsMeMap.ui.map.zoom);*/

			$statsMeMap.ui.map.mapMove([lv_adm_coor_x,lv_adm_coor_y],6);

			//카테고리 처음 조회시 지도 이동하게 초기화
			$statsMeMap.ui.mapFirstMoveYn = "Y";

			var obj = new sop.openApi.statsMe.statsMeMap.loadMapData();
			obj.addParam("stat_data_id", p_stat_data_id);
			obj.addParam("sido_cd", $("#statsMePopupArea_sido").val());
			obj.addParam("sgg_cd", $("#statsMePopupArea_sgg").val());
			obj.addParam("emdong_cd", $("#statsMePopupArea_emdong").val());

			common_loading(true); // 로딩바
			obj.request({
				method: "POST",
				//async: false,
				url: sgisContextPath + "/ServiceAPI/statsMe/map/getStatsData.json"
			});
		},


		/**
		 * @name         : setPositionText
		 * @description  : 위치 텍스트 변경
		 * @date         : 2019.08.22
		 * @author	     : 김남민
		 * @history 	 :
		 * @param        :
		 */
		setPositionText : function() {
			//변수 선언
			var lv_adm_nm = "전국";
			var lv_sido = $("#statsMePopupArea_sido");
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sgg = $("#statsMePopupArea_sgg");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_emdong = $("#statsMePopupArea_emdong");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();

			//데이터 정리
			lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
			if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
			else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
			else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;

			// 지도 화면에 현재접속지역 셋팅
			if($statsMeMap.ui.mapRegion == "sido") {
				//2022-10-12 [송은미] text 수정
				$("#statsMeMapMyLocation_name").text("전국");
//				$("#statsMeMapMapArea").text("전국");
			}
			else {
				//2022-10-12 [송은미] svg 추가
				const message = lv_adm_nm;
				const arr = message.split(" ");
				console.log(arr[0]);
				var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
				$("#statsMeMapMyLocation_name").html(arr[0]+svg+arr[1]+svg+arr[2]);
				
//				$("#statsMeMapMapArea").text(lv_adm_nm);
			}
		},

		/**
		 * @name : setMapData
		 * @description : 지도 데이터 화면처리
		 * @date : 2019.08.21
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		setMapData : function() {
			//Validation
			if($statsMeMap.ui.mapData == null) {
				common_alert("조회된 데이터가 없습니다.");
				return;
			}

			//변수
			var data = $statsMeMap.ui.mapData.data;

			//데이터 텍스트 매핑
			$("#statsMeMapStatDataNm").html(data.stat_data_srv_nm);
			$("#statsMeMapStatDataNm2").html(data.stat_data_srv_nm);
			if(data.stat_data_exp != undefined){
				$("#statsMeMapStatDataExp").html((""+data.stat_data_exp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>'));
			}
			$("#statsMeMapSource").html("* 출처 : "+data.source);

				$("#statsMeMapGoDetail").removeClass("hidden");

				if(data.menu_nm == "업종통계지도: 생활업종통계지도" || data.menu_nm == "업종통계지도: 기술업종통계지도") {
					$("#statsMeMapGoDetail>a").html("<strong style='font-size:13px;'>"+data.menu_nm+" 바로가기</strong>");
				} else {
					$("#statsMeMapGoDetail>a").html("<strong>"+data.menu_nm+" 바로가기</strong>");
				}

			//지역경계 초기화
			$("#statsMeMapMapRegion>li").hide();
			//지역경계 시도표출여부
			if(data.sido_disp_yn == "Y") $("#statsMeMapMapRegion_sido").show();
			//지역경계 시군구표출여부
			if(data.sgg_disp_yn == "Y") $("#statsMeMapMapRegion_sgg").show();
			//지역경계 읍면동표출여부
			if(data.emdong_disp_yn == "Y") $("#statsMeMapMapRegion_emdong").show();
			//지역경계 소지역표출여부
			if(data.tot_reg_disp_yn == "Y") $("#statsMeMapMapRegion_totreg").show();

			//지도유형 초기화
			$("#statsMeMapMapType>li").hide();
			//지도유형 색상지도표출여부
			if(data.color_disp_yn == "Y") {
				$("#statsMeMapMapType_color").show();
			}
			//지도유형 버블지도표출여부
			if(data.balln_disp_yn == "Y"){
				$("#statsMeMapMapType_bubble").show();
			}
			//지도유형 열지도표출여부
			if(data.tp_disp_yn == "Y"){
				$("#statsMeMapMapType_heat").show();
			}
			//지도유형 POI지도표출여부
			if(data.poi_disp_yn == "Y") $("#statsMeMapMapType_poi").show();

			//지도 그리기
			var lv_map_region = "sido";
			var lv_map_type = "color";
			if(data.sido_disp_yn == "Y") lv_map_region = "sido";
			if(data.sgg_disp_yn == "Y") lv_map_region = "sgg";
			if(data.emdong_disp_yn == "Y") lv_map_region = "emdong";
			if(data.tot_reg_disp_yn == "Y") lv_map_region = "totreg";

			if(data.color_disp_yn == "Y") lv_map_type = "color";
			else if(data.balln_disp_yn == "Y") lv_map_type = "bubble";
			else if(data.tp_disp_yn == "Y") lv_map_type = "heat";
			else if(data.poi_disp_yn == "Y") lv_map_type = "poi";

			$statsMeMap.ui.drawMapData(lv_map_region, lv_map_type);
		},

		/**
		 * 데이터보드 / 기본정보 탭
		 */
		setBasicData : function() {
			if($statsMeMap.ui.mapData == null) {
				common_alert("조회된 데이터가 없습니다.");
			}

			//변수
			var data = $statsMeMap.ui.mapData.data;

			$("#statsMeDetailInfoStatDataNm").html(data.stat_data_srv_nm); 			// 통계자료명

			var subInfo = "";
			if(data.stat_data_base_year != null && data.stat_data_base_year != ""){
				subInfo += "<span>기준 년도 : " + data.stat_data_base_year + "</span>";
			}

			// 데이터 지도유형
			var dataMapType = "";
			if(data.color_disp_yn == "Y" || data.balln_disp_yn == "Y" || data.tp_disp_yn == "Y" || data.poi_disp_yn == "Y"){
				subInfo += "<span style=\"right:20px; position:absolute;\">지도 유형 : ";
				if(data.color_disp_yn == "Y"){
					dataMapType += ", 색상지도";
				}
				if(data.balln_disp_yn == "Y"){
					dataMapType += ", 버블지도";
				}
				if(data.tp_disp_yn == "Y"){
					dataMapType += ", 열지도";
				}
				if(data.poi_disp_yn == "Y"){
					dataMapType += ", POI";
				}
				// 맨 앞 ", " 부분 제거
				if(dataMapType != ""){
					dataMapType = dataMapType.substr(2);
				}
				subInfo += dataMapType + "</span>";
			}
			$("#statsMeDetailInfoSubInfo").html(subInfo);

			if(data.stat_data_exp != undefined){
				$("#statsMeDetailInfoStatDataExp").show();
				$("#statsMeDetailInfoStatDataExp").html((""+data.stat_data_exp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>'));	// 통계자료설명
			} else {
				$("#statsMeDetailInfoStatDataExp").hide();
			}
			$("#statsMeDetailInfoSource").html(data.source);

			/** 2020.09.22[한광희] My통계로 지도 화면 정보 셋팅 START */
			$("#map_tit").text(data.stat_data_srv_nm);
			$("#statsMeInfo").empty();
			$("#statsMeInfo").append(
				$("<div/>", {"class":"gridrow"}).append(
						$("<h2/>", {"text": data.stat_data_srv_nm}),
						$("<a/>", {"href":"javascript:void(0);srvLogWrite(\"O0\", \"03\", \"07\", \"01\", \"\", \"\");'", "class":"databoardBtn", "text":"데이터보드"}).click(function(){
							$statsMeMap.ui.dataBoardClick(data.stat_data_id);
							return false;
						})
				),
				$("<div/>", {"class":"gridrow_txt"}).append(
					$("<p/>", {"text":data.stat_data_exp})
				)
			);
			/** 2020.09.22[한광희] My통계로 지도 화면 정보 셋팅 END */

			/** SGIS 콘텐츠 출처 START */
			var menulinkHtml = "";
			var tempMenuNm = "";
			if(data.menu_nm != null && data.menu_nm != "") tempMenuNm += data.menu_nm;						// 메뉴명
			if(data.srv_nm != null && data.srv_nm != "") tempMenuNm += " > " + data.srv_nm;					// 서비스명
			if(data.b_class_nm != null && data.b_class_nm != "") tempMenuNm += " > " + data.b_class_nm;		// 대분류명
			if(data.m_class_nm != null && data.m_class_nm != "") tempMenuNm += " > " + data.m_class_nm;		// 중분류명
			if(data.s_class_nm != null && data.s_class_nm != "") tempMenuNm += " > " + data.s_class_nm;		// 소분류명

			menulinkHtml += "<span style='color: #7B7C7F;'>";
			menulinkHtml += tempMenuNm;
			menulinkHtml += "</span>";

			$("#statsMeDetailInfoMenuNm").html(menulinkHtml);
			/** SGIS 콘텐츠 출처 END */
			if(data.main_kwrd != undefined){
				$("#statsMeDetailInfoKwrd").show();
				$("#statsMeDetailInfoKwrd").html(data.main_kwrd);
			} else {
				$("#statsMeDetailInfoKwrd").hide();
			}


			// 추천서비스 설정
			var lv_recomend_svc_list = data.recomend_svc_list;
			var lv_recomend_svc_html = "";
			if(lv_recomend_svc_list != undefined && lv_recomend_svc_list != null && lv_recomend_svc_list.length > 0) {
				for(var i = 0; i < lv_recomend_svc_list.length; i++) {
					var lv_recomend_svc_text = "";
					lv_recomend_svc_html += "<div class=\"conWrap_flowBox\"> <span class=\"conWrap_flow\">";
					if(lv_recomend_svc_list[i].menu_nm != undefined && lv_recomend_svc_list[i].menu_nm != null && lv_recomend_svc_list[i].menu_nm != "") lv_recomend_svc_text += lv_recomend_svc_list[i].menu_nm;
					if(lv_recomend_svc_list[i].srv_nm != undefined && lv_recomend_svc_list[i].srv_nm != null && lv_recomend_svc_list[i].srv_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].srv_nm;
					if(lv_recomend_svc_list[i].stat_data_srv_nm != undefined && lv_recomend_svc_list[i].stat_data_srv_nm != null && lv_recomend_svc_list[i].stat_data_srv_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].stat_data_srv_nm;
					lv_recomend_svc_html += "<a href=\"javascript:void(0);\" onclick=\"javascript:srvLogWrite('N0', '10', '05', '00', '"+lv_recomend_svc_text+"', '');$(this).addClass('current');$statsMeMap.ui.loadMapData('"+lv_recomend_svc_list[i].stat_data_id+"')\">"+lv_recomend_svc_text+"</a>";
					if(lv_recomend_svc_html != "") lv_recomend_svc_html += "</span> </div>";
				}
			}

			/** 추천서비스 목록이 존재 하지 않을 경우 표현 안하도록 수정 START */
			if(lv_recomend_svc_html != "") {
				$("#statsMeDetailInfoRecomendSvc").show();
				$("#statsMeDetailInfoRecomendSvc").html(lv_recomend_svc_html);
			} else {
				$("#statsMeDetailInfoRecomendSvc").hide();
			}

			$("#statsMe_detaboard").scrollTop(0,0);	// 2020.09.22[한광희] 데이터보드 스크롤 상단이동
		},

		/**
		 * 데이터보드 / 그래프 탭
		 */
		setChartData : function() {
			$('#chartTit').parent().attr("style", "flex-direction: column;");
			if($statsMeMap.ui.map.dataForCombine == null) {
				$('#chartTit').parent().attr("style", "flex-direction: column; align-items: center;");
				$('#chartTit').text("조회된 데이터가 없습니다.");
				$('#statsMeChart').hide();
				$('#chartSelCont').text("");
				$('#chartSelVal').text("");
				$('#chartSelUnit').text("");
				return;
			}

			if($statsMeMap.ui.map.dataForCombine.result == null) {
				$('#chartTit').parent().attr("style", "flex-direction: column; align-items: center;");
				$('#chartTit').text("조회된 데이터가 없습니다.");
				$('#statsMeChart').hide();
				$('#chartSelCont').text("");
				$('#chartSelVal').text("");
				$('#chartSelUnit').text("");
				return;
			}
			$('#statsMeChart').show();

			var data = $statsMeMap.ui.map.dataForCombine.result;
			var showData = $statsMeMap.ui.map.dataForCombine.showData;
			var unit = $statsMeMap.ui.map.dataForCombine.unit;
			if(unit == undefined || unit == null || unit == "") {
				unit = "수";
			}
			/** 2020.09.25[한광희] 집계구일경우 차트 명칭 추가 START */
			var admCdType = "";
			if($statsMeMap.ui.map.dataForCombine.pAdmCd.length > 5) {
				admCdType = "집계구 번호";
			}
			/** 2020.09.25[한광희] 집계구일경우 차트 명칭 추가 END */

			// 상단 데이터 셋팅
			var data3 = $statsMeMap.ui.mapData.data;
			$('#chartTit').text(data3.stat_data_srv_nm); // 통계자료명
			$('#chartSelUnit').text(unit);

			var categoryeData = new Array();

			//데이터 정렬
			data.sort(function(a, b) { // 내림차순
				return Number(a[showData]) > Number(b[showData]) ? -1 : Number(a[showData]) < Number(b[showData]) ? 1 : 0;
			});

			var chartData = new Array();
			for(var i=0; i < data.length; i++){
				/** 2020.09.22[한광희] 그래프 데이터 수정 START */
				/*chartData[i] = Number(data[i][showData]);
				if(data[i].adm_nm == undefined || data[i].adm_nm == null || data[i].adm_nm == ""){
					categoryeData[i] = data[i].adm_cd;
				}
				else{
					categoryeData[i] = data[i].adm_nm;
				}*/

				if(data[i].adm_nm != undefined && data[i].adm_nm != null && data[i].adm_nm != ""){
					/** 2020.09.25[한광희] 데이터보드 지역명 수정 START */
					if(data[i].area_bndry_se == "totreg"){
						categoryeData.push(data[i].adm_cd);
					}else if(data[i].area_bndry_se == "emdong"){
						categoryeData.push(data[i].adm_nm.substr(data[i].adm_nm.lastIndexOf(" ")));
					}else{
						categoryeData.push(data[i].adm_nm.substr(data[i].adm_nm.indexOf(" ")));
					}
					/** 2020.09.25[한광희] 데이터보드 지역명 수정 END */
					chartData.push(Number(data[i][showData]));
				}
				/** 2020.09.22[한광희] 그래프 데이터 수정 END */
			}

			var heightCal = $(window).height();
			if(categoryeData.length < 10){
				heightCal = '400';
			}

			/** 2020.09.22[한광희] 차트설정 START */
            Highcharts.setOptions({
               lang: {
                   thousandsSep: ",",
                   numericSymbols: ["천", "백만", "십억", "조", "천조", "백경"]
                }
            });
            /** 2020.09.22[한광희] 차트설정 END */

			$('#statsMeChart').highcharts({
				chart: {
					inverted: true,
					backgroundColor: {
			            linearGradient: [500, 500, 500, 0],
			            stops: [
			            	[0, '#fff'],	// 하단 백그라운드 색
			            	[1, '#fff']	// 상단 백그라운드 색
			            ]
			        },
			        type: 'column',
			        width: $(window).width(),
			        height: heightCal
			    },
			    title: {
			    	text: admCdType,	// 2020.09.25[한광희] 차트 단위 삭제 및 집계구번호 추가
			        align: 'left',
			        margin: 10,
			        style: {
			            color: '#777C82',
			            fontSize: '11px'
			        }
			    },
			    xAxis: {
			    	categories: categoryeData,
			        labels: {
			            style: {
			                color: '#777C82'	// x축 색상
			            }
			        }
			    },
			    yAxis: {
			        title: {
			            text: ''
			        },
			        labels: {
			            formatter: function () {
			            	 return appendCommaToNumber(this.value);
			            },
			            style: {
			                color: '#777C82'	// y축 색상
			            }
			        }

			    },
			    legend: {
			        enabled: false
			    },
			    tooltip:{
			    	enabled:false
			    },
			    plotOptions: {
			        series: {
			            borderWidth: 0,
			            /** 2020.09.22[한광희] 그래프 수치 표출 및 click event 삭제 START */
			            dataLabels: {
			                enabled: true,
			                allowOverlap:true,
			                style: {
			                	color: '#606060',
			                	textOutline : "0px",
			                	fontWeight: "normal",
			                	textShadow: false
			                }
			            },
			            // chart click
			           /* point: {
                            events: {
                                click: function () {
                                    $("#chartSelCont").html(this.category);
                                 	$("#chartSelVal").html(appendCommaToNumber(this.y) + " " + unit);
                                 	$('#chartSelUnit').text(unit);
                                },
                                update: function (event) {
                            		$("#chartSelCont").html(this.category);
                            		$("#chartSelVal").html(appendCommaToNumber(this.y) + " " + unit);
                            		$('#chartSelUnit').text(unit);
                            	}
                            }
                        },*/
                        /** 2020.09.22[한광희] 그래프 수치 표출 및 click event 삭제 END */
			            shadow: false
			        }
			    },

			    series: [{
			    	name : "",
			    	colorByPoint: true,
			    	data : chartData
			        }]
			});

			/** 2020.09.22[한광희] 그래프 상위행정구역 총 수치로 변경 START */
			var totValue = 0;
			$.each(chartData,function(cnt,node){
				totValue += node;
			});
			var chartSelCont = "";
			switch ($statsMeMap.ui.map.dataForCombine.pAdmCd.length){
				case 2:
					if($statsMeMap.ui.map.dataForCombine.pAdmCd == "00"){
						chartSelCont = "전국";
					} else{
						chartSelCont = $("#statsMePopupArea_sido option:selected").text();
					}
					break;
				case 5:
					chartSelCont = $("#statsMePopupArea_sido option:selected").text()+" "+$("#statsMePopupArea_sgg option:selected").text();
					break;
				case 7:
					chartSelCont = $("#statsMePopupArea_sido option:selected").text()+" "+$("#statsMePopupArea_sgg option:selected").text()+" "+$("#statsMePopupArea_emdong option:selected").text();
					break;
			}
			$("#chartSelCont").html(chartSelCont);
			$("#chartSelVal").html(appendCommaToNumber(totValue) + " " + unit);

			// 첫번째 데이터 클릭
			/*var chart = $('#statsMeChart').highcharts();
			chart.series[0].data[0].update();*/
			/** 2020.09.22[한광희] 그래프 상위행정구역 총 수치로 변경 END */
		},

		/**
		 *
		 * @name         : setStatsDataOne
		 * @description  : 지도 데이터 가져오기
		 * @date         : 2019. 10. 15.
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 * 		p_map : 지도
		 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
		 * 		p_type : 유형 (color/heat/poi) (색상(버블)/열지도/POI)
		 * 		p_sido_cd : 시도 코드 (옵션)
		 * 		p_sgg_cd : 시군구 코드 (옵션)
		 * 		p_emdong_cd : 읍면동 코드 (옵션)
		 * 		p_callback : 콜백 함수
		 */
		setStatsDataOne : function(p_map, p_region, p_type, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
			common_loading(true); // 로딩바

			if($("#"+p_map.id+"_loading").length) {
				$("#"+p_map.id+"_loading").show();
			}

			//변수 선언
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_stat_data_id = lv_data.stat_data_id;

			//adm_cd
			var lv_adm_cd = "00";
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
				}
			}

			//기존에 저장된 정보 있음
			if($statsMeMap.ui.mapStatsData[lv_stat_data_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] != undefined) {
				setTimeout(function() {
					common_loading(false); // 로딩바 숨김
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}

					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback($statsMeMap.ui.mapStatsData[lv_stat_data_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd]);
					}
				}, 0);
			}
			//기존에 저장된 정보 없음
			else {
				//파라미터
				var lv_params = {};
				lv_params.stat_data_id = lv_stat_data_id;
				if(p_type != undefined && p_type != null && p_type != "") lv_params.map_ty = p_type;
				//p_region : poi는 기본적으로 all이지만 열지도는 all이 아니므로 all일때는 그냥 파라미터 제외함.
				if(p_region != undefined && p_region != null && p_region != "" && p_region != "all") lv_params.area_bndry_se = p_region;
				if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") lv_params.sido_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") lv_params.sgg_cd = p_sgg_cd;
				if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_params.emdong_cd = p_emdong_cd;

				//원 테이블로 조회
				var lv_url = sgisContextPath+"/ServiceAPI/statsMe/map/getStatsDataOne2.json";
				//일자리 보기는 원 테이블로 조회
				if(lv_data.menu_nm == "일자리 맵" && lv_data.srv_nm == "일자리보기") {
					lv_url = sgisContextPath+"/ServiceAPI/statsMe/map/getStatsDataOne2.json";
				}
				// ajax 시작
				$.ajax({
					url: lv_url,
				    type: 'post',
				    data: lv_params
				}).always(function(res) { // 전 처리
					common_loading(false); // 로딩바 숨김

					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}
				}).done(function (res) { // 완료
					//정보 저장
					$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_"+p_type+"_"+p_region+"_"+lv_adm_cd] = res.result.list;

					if(lv_params.sido_cd != '99'){
		    			if(lv_params.sido_cd != undefined && lv_params.sgg_cd != '999'){
		    				map_adm_cd = lv_params.sido_cd + lv_params.sgg_cd;
		    			} else {
		    				map_adm_cd = lv_params.sido_cd;
		    			}
		    		} else {
		    			map_adm_cd = '00';
		    		}

					var option = {"showData":"stats_dta_co","showDataName":"업체","unit":"명","adm_cd":map_adm_cd,"setStatsMapCensusData":true,"curPolygonCode":0};
					var data = res.result.list;
					var parameter = {"year":"2019","bnd_year":bndYear};
					p_map.setStatsData(option, data, parameter);

					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback(res.result.list);
					}
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				});
				// ajax 끝
			 }
		},

		/**
		 *
		 * @name         : setStatsDataEcountry
		 * @description  : 지도 데이터 가져오기 (대화형 통계지도 > e-지방지표)
		 * @date         : 2019. 10. 15.
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 * 		p_map : 지도
		 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
		 * 		p_sido_cd : 시도 코드 (옵션)
		 * 		p_sgg_cd : 시군구 코드 (옵션)
		 * 		p_emdong_cd : 읍면동 코드 (옵션)
		 * 		p_callback : 콜백 함수
		 */
		setStatsDataEcountry : function(p_map, p_region, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {

			if($("#"+p_map.id+"_loading").length) {
				$("#"+p_map.id+"_loading").show();
			}
			common_loading(true); // 로딩바

			//변수 선언
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_stat_data_id = lv_data.stat_data_id;

			//adm_cd
			var lv_adm_cd = "00";
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
				}
			}

			//기존에 저장된 정보 있음
			if($statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd] != undefined) {
				setTimeout(function() {
					//데이터 입력
					p_map.setStatsData(
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].type,
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].data,
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].showData,
						$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd].unit
					);

					common_loading(false); // 로딩바

					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}

					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback();
					}
				}, 0);
			}
			//기존에 저장된 정보 없음
			else {
				//url 파라미터 세팅
				var lv_url = sgisContextPath + "/view/ecountry/getData.json";
				lv_url += "?tbl_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].tbl_id;
				lv_url += "&base_item_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].base_item_id;
				if($statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id != undefined && $statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id != null && $statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id != "") {
					lv_url += "&add_item_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].add_item_id;
				}
				lv_url += "&prd_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prd_id;
				lv_url += "&prid_value="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value;
				lv_url += "&adm_cd="+lv_adm_cd;

				// ajax 시작
				$.ajax({
				    url: lv_url,
				    type: 'get'
				}).done(function (res) { // 완료
					var lv_result_list = res.result.data;
					var unit = res.result.unit;
					if(unit == undefined || unit == null || unit == "") {
						unit = "수";
					}

					//정보 저장
					$statsMeMap.ui.mapStatsData[lv_stat_data_id+"_color_"+p_region+"_"+lv_adm_cd] = {
						type : "normal",
						data : {"pAdmCd": lv_adm_cd, "result" : lv_result_list},
						showData : "data_value",
						unit : unit
					};

					//데이터 입력
					p_map.setStatsData("normal", {"pAdmCd": lv_adm_cd, "result" : lv_result_list}, "data_value", unit);
				}).fail(function (res) { // 실패
					//common_alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					common_loading(false); // 로딩바
					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}

					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback();
					}
				});
				// ajax 끝
			}
		},

		/**
		 * @name : drawMapData
		 * @description : 지도 데이터 그리기
		 * @date : 2019.08.22
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		p_map_region : 지역경계
		 * 		p_map_type : 지도유형
		 */
		drawMapData : function(p_map_region, p_map_type) {

			console.log("p_map_region = " + p_map_region);
			console.log("p_map_type = " + p_map_type);

			//전역 데이터 처리
			var lv_map_region_before = $statsMeMap.ui.mapRegion;
			var lv_map_type_before = $statsMeMap.ui.mapType;
			if(p_map_region == undefined || p_map_region == null) {
				p_map_region = $statsMeMap.ui.mapRegion;
			}
			else {
				$statsMeMap.ui.mapRegion = p_map_region;
			}
			if(p_map_type == undefined || p_map_type == null) {
				p_map_type = $statsMeMap.ui.mapType;
			}
			else {
				$statsMeMap.ui.mapType = p_map_type;
			}

			//버튼 CSS처리
			if(p_map_region != undefined && p_map_region != null) {
				$("#statsMeMapMapRegion>li").removeClass("current");
				$("#statsMeMapMapRegion_"+p_map_region).addClass("current");
			}
			if(p_map_type != undefined && p_map_type != null) {
				$("#statsMeMapMapType>li").removeClass("on");
				$("#statsMeMapMapType>li>a").removeClass("on");
				$("#statsMeMapMapType_"+p_map_type).addClass("on");
				$("#statsMeMapMapType_"+p_map_type+">a").addClass("on");
			}

			//조회변수
			var data = $statsMeMap.ui.mapData.data;

			//지역변수
			var lv_adm_cd = "00";
			var lv_adm_nm = "전국";
			var lv_adm_coor_x = 990480.875;
			var lv_adm_coor_y = 1815839.375;
			var lv_sido = $("#statsMePopupArea_sido");
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			var lv_sgg = $("#statsMePopupArea_sgg");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			var lv_emdong = $("#statsMePopupArea_emdong");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();
			var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");


			//지역변수 데이터 정리
			if(lv_sido_cd != "99") {
				lv_adm_coor_x = lv_sido_coor_x;
				lv_adm_coor_y = lv_sido_coor_y;
			}
			if(lv_sgg_cd != "999") {
				lv_adm_coor_x = lv_sgg_coor_x;
				lv_adm_coor_y = lv_sgg_coor_y;
			}
			if(lv_emdong_cd != "99") {
				lv_adm_coor_x = lv_emdong_coor_x;
				lv_adm_coor_y = lv_emdong_coor_y;
			}
			if(lv_sido_cd == "99") lv_sido_cd = "00";
			lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
			lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
			if(lv_sido_cd == "99") lv_adm_cd = "00";
			else if(lv_sgg_cd == "999") lv_adm_cd = lv_sido_cd;
			else if(lv_emdong_cd == "99") lv_adm_cd = lv_sido_cd + lv_sgg_cd;
			if(lv_sido_cd == "99") lv_adm_nm = lv_sido_nm;
			else if(lv_sgg_cd == "999") lv_adm_nm = lv_sido_nm;
			else if(lv_emdong_cd == "99") lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;

			//지도 Clear
			$statsMeMap.ui.clearMap($statsMeMap.ui.map);

			//색상/버블
			if(p_map_type == "color" || p_map_type == "bubble") {
				//legendBox 표시
				/*2020-06-16 TODO */
				$("#legendBox_"+$statsMeMap.ui.map.legend.id).show();
				if(p_map_type == "color") $("#lgTypeList_"+$statsMeMap.ui.map.legend.id+">li:eq(1)>a").trigger("click");
				if(p_map_type == "bubble") $("#lgTypeList_"+$statsMeMap.ui.map.legend.id+">li:eq(2)>a").trigger("click");

				//색상/버블 (시도)
				if(p_map_region == "sido") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "sido", "", "", "", function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", lv_year, "", "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "sido", "color", "", "", "", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}

							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "stats_dta_co", lv_unit);

							//경계 그리기
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear(), "", "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
							});
						});
					}

					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove($statsMeMap.ui.mapCenterDefalut, 1);
						//$statsMeMap.ui.map.mapMove([$statsMeMap.ui.my_x, $statsMeMap.ui.my_y], 1);

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = $statsMeMap.ui.mapCenterDefalut[0];
							$statsMeMap.ui.pageLoadMapMoveY = $statsMeMap.ui.mapCenterDefalut[1];
							$statsMeMap.ui.pageLoadMapMoveZoom = 1;
						}
					}
				}
				//색상/버블 (시군구)
				else if(p_map_region == "sgg") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "sgg", lv_sido_cd, "", "", function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4); // 년도
							var lv_region = "sgg"; //비자치구 여부 체크
							if($statsMeMap.ui.ecountryMapping[data.stat_data_id].atdrc_yn == "Y") lv_region = "atdrc";
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, lv_region, lv_year, lv_sido_cd, "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "sgg", "color", lv_sido_cd, "", "", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}

							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "stats_dta_co", lv_unit);

							//경계 그리기
							var lv_region = "sgg"; //비자치구 여부 체크
							if(data.atdrc_yn != undefined && data.atdrc_yn != null && data.atdrc_yn == "Y") lv_region = "atdrc";
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, lv_region, $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, "", "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
							});
						});
					}

					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sido_coor_x, lv_sido_coor_y] , 4);

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sido_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sido_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 4;
						}
					}
				}
				//색상/버블 (읍면동)
				else if(p_map_region == "emdong") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "emdong", lv_sido_cd, lv_sgg_cd, "", function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", lv_year, lv_sido_cd, lv_sgg_cd, "", function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "emdong", "color", lv_sido_cd, lv_sgg_cd, "", function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}

							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd+lv_sgg_cd, "result" : p_list}, "stats_dta_co", lv_unit);

							//경계 그리기
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, "", function() {
								console.log("[drawMapData > emdong > else] 1111");
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								console.log("[drawMapData > emdong > else] 2222");
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
								console.log("[drawMapData > emdong > else] 3333");
							});
						});
					}

					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sgg_coor_x, lv_sgg_coor_y] , 6);

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sgg_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sgg_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 6;
						}
					}
				}
				//색상/버블 (소지역)
				else if(p_map_region == "totreg") {
					//대화형 통계지도 > e-지방지표
					if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
						//데이터 넣기
						$statsMeMap.ui.setStatsDataEcountry($statsMeMap.ui.map, "totreg", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
							//경계 그리기
							var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", lv_year, lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
							});
						});
					}
					//데이터마트 조회
					else {
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "totreg", "color", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function(p_list) {
							//리스트에서 unit 가져오기
							var lv_unit = "개";
							var lv_unit_nm = "수";
							if(p_list != null && p_list.length > 0) {
								if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
								if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
							}

							//데이터 넣기
							$statsMeMap.ui.map.setStatsData("normal", {"pAdmCd": lv_sido_cd+lv_sgg_cd+lv_emdong_cd, "result" : p_list}, "stats_dta_co", lv_unit);

							//경계 그리기
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
								//데이터보드
								$statsMeMap.ui.setDataboardFromMap();
								//차트데이터 2020.06.23 hshs
								$statsMeMap.ui.setChartData();
							});
						});
					}

					//지도 조정
					if($statsMeMap.ui.mapFirstMoveYn == "Y") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지

						/* 가운데로 설정 */
						$statsMeMap.ui.map.mapMove([lv_emdong_coor_x, lv_emdong_coor_y] , 9);

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_emdong_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_emdong_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 9;
						}
					}
				}
			}
			//열지도
			else if(p_map_type == "heat") {
				//legendBox 표시
				$("#legendBox_"+$statsMeMap.ui.map.legend.id).show();
				$("#lgTypeList_"+$statsMeMap.ui.map.legend.id+">li:eq(4)>a").trigger("click");

				//데이터보드 데이터 보기 숨김
				$("#statsMeMapDataBoard_dataTable").hide();
				$("#statsMeMapDataBoard_dataTable_page").parent().hide();

				// 상세보기화면 데이터 보기 숨김
				$("#statsMeDetailInfo_dataTable").hide();
				$("#statsMeDetailInfo_dataTable_page").parent().hide();

				var lv_region_yn = "N";
				//지도이동
				if($statsMeMap.ui.mapFirstMoveYn == "Y") {
					lv_region_yn = "Y";

					//시도
					if(p_map_region == "sido") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove($statsMeMap.ui.mapCenterDefalut, 1);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "1";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = $statsMeMap.ui.mapCenterDefalut[0];
							$statsMeMap.ui.pageLoadMapMoveY = $statsMeMap.ui.mapCenterDefalut[1];
							$statsMeMap.ui.pageLoadMapMoveZoom = 1;
						}
					}
					//시군구
					else if(p_map_region == "sgg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sido_coor_x, lv_sido_coor_y] , 4);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "3";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sido_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sido_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 4;
						}
					}
					//읍면동
					else if(p_map_region == "emdong") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sgg_coor_x, lv_sgg_coor_y] , 6);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "4";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sgg_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sgg_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 6;
						}
					}
					//소지역
					else if(p_map_region == "totreg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_emdong_coor_x, lv_emdong_coor_y] , 9);
						$statsMeMap.ui.heatMapPolygonCode = "0";
						$statsMeMap.ui.map.curPolygonCode = "5";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_emdong_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_emdong_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 9;
						}
					}
				}

				//heatMapPolygonCode
				$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;

				//통계주제도
				if(data.menu_nm == "통계주제도") {
					var lv_region = "100m";

					//열지도 (격자 10k)
					if($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2") {
						lv_region = "10k";
					}
					//열지도 (격자 1k)
					else if($statsMeMap.ui.map.curPolygonCode == "3") {
						lv_region = "1k";
					}
					//열지도 (격자 100m)
					else if($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5") {
						lv_region = "100m";
					}

					//데이터 조회
					$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, lv_region, "heat", "", "", "", function(p_list) {
						if(lv_region_yn == "Y") {
							//지역경계
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear());
						}

						//최대값 계산
						var max = null;
						var tempData = [];
						var list = p_list;
						for (var i=0; i<list.length; i++) {
							tempData.push(list[i].stats_dta_co);
						}
						max = Math.max.apply(null, tempData);

						//열지도 데이터 입력
						for (var i=0; i<list.length; i++) {
							$statsMeMap.ui.map.addHeatMap(list[i].x_coor, list[i].y_coor, list[i].stats_dta_co);
						}

						//통계주제도 열지도 세팅
						if ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"){
							$statsMeMap.ui.map.zoomLevelHeat = true;
						} else {
							$statsMeMap.ui.map.zoomLevelHeat = false;
						}
						if($statsMeMap.ui.map.zoom <= 3) {
							$statsMeMap.ui.map.heatRadius = 15;
							$statsMeMap.ui.map.heatBlur = 30;
						} else if($statsMeMap.ui.map.zoom == 4) {
							$statsMeMap.ui.map.heatRadius = 20;
							$statsMeMap.ui.map.heatBlur = 30;
						} else if($statsMeMap.ui.map.zoom == 5) {
							$statsMeMap.ui.map.heatRadius = 35;
							$statsMeMap.ui.map.heatBlur = 60;
						} else if($statsMeMap.ui.map.zoom == 6) {
							$statsMeMap.ui.map.heatRadius = 20;
							$statsMeMap.ui.map.heatBlur = 70;
						} else if($statsMeMap.ui.map.zoom == 7 || $statsMeMap.ui.map.zoom == 8 || $statsMeMap.ui.map.zoom == 9) {
							$statsMeMap.ui.map.heatRadius = 25;
							$statsMeMap.ui.map.heatBlur = 80;
						}
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusSlider").slider("values", 0, $statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusText").text($statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurSlider").slider("values", 0, $statsMeMap.ui.map.heatBlur);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurText").text($statsMeMap.ui.map.heatBlur);
						$statsMeMap.ui.map.setHeatMapOptions($statsMeMap.ui.map.heatRadius, $statsMeMap.ui.map.heatBlur, max);
					});
				}
				//업종통계지도: 생활업종통계지도 > 개업현황 or 업종 밀집도 변화
				else if(data.menu_nm == "업종통계지도: 생활업종통계지도" && (data.srv_nm == "개업현황" || data.srv_nm == "업종 밀집도 변화")) {
					var lv_region = p_map_region;
					var lv_temp_sido_cd = lv_sido_cd;
					var lv_temp_sgg_cd = lv_sgg_cd;
					var lv_temp_emdong_cd = lv_emdong_cd;

					//열지도 (시도)
					if(lv_region == "sido") {
						lv_temp_sido_cd = "";
						lv_temp_sgg_cd = "";
						lv_temp_emdong_cd = "";
					}
					//열지도 (시군구)
					else if(lv_region == "sgg") {
						lv_temp_sgg_cd = "";
						lv_temp_emdong_cd = "";
					}
					//열지도 (읍면동)
					else if(lv_region == "emdong") {
						lv_temp_emdong_cd = "";
					}
					//열지도 (소지역)
					else if(lv_region == "totreg") {
						//데이터는 읍면동 데이터 사용함
						lv_region = "emdong";
					}

					//데이터 조회
					$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, lv_region, "heat", lv_temp_sido_cd, lv_temp_sgg_cd, lv_temp_emdong_cd, function(p_list) {
						//지역경계
						//열지도 (시도)
						if(p_map_region == "sido") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear());
						}
						//열지도 (시군구)
						else if(p_map_region == "sgg") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sgg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd);
						}
						//열지도 (읍면동)
						else if(p_map_region == "emdong") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd);
						}
						//열지도 (소지역)
						else if(p_map_region == "totreg") {
							$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd);
						}

						//최대값 계산
						var max = null;
						var tempData = [];
						var list = p_list;
						for (var i=0; i<list.length; i++) {
							tempData.push(list[i].stats_dta_co);
						}
						max = Math.max.apply(null, tempData);

						//열지도 데이터 입력
						for (var i=0; i<list.length; i++) {
							$statsMeMap.ui.map.addHeatMap(list[i].x_coor, list[i].y_coor, list[i].stats_dta_co);
						}

						//업종통계지도: 생활업종통계지도 열지도 세팅
						$statsMeMap.ui.map.heatRadius = 15;
						$statsMeMap.ui.map.heatBlur = 30;
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusSlider").slider("values", 0, $statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatRadiusText").text($statsMeMap.ui.map.heatRadius);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurSlider").slider("values", 0, $statsMeMap.ui.map.heatBlur);
						$("#legend_"+$statsMeMap.ui.map.legend.id+" #typeArea_"+$statsMeMap.ui.map.legend.id+" .heatArea .heatBlurText").text($statsMeMap.ui.map.heatBlur);
						if($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"|| $statsMeMap.ui.map.curPolygonCode == "5") {
							$statsMeMap.ui.map.zoomLevelHeat = false;
							$statsMeMap.ui.map.setHeatMapOptions($statsMeMap.ui.map.heatRadius, $statsMeMap.ui.map.heatBlur, max);
						}
						else {
							$statsMeMap.ui.map.zoomLevelHeat = true;
							$statsMeMap.ui.map.setHeatMapOptions($statsMeMap.ui.map.heatRadius, $statsMeMap.ui.map.heatBlur, 1);
						}
					});
				}
			}
			//POI
			else if(p_map_type == "poi") {
				//legendBox 숨김
				$("#legendBox_"+$statsMeMap.ui.map.legend.id).hide();

				//데이터보드 데이터 보기 숨김
				$("#statsMeMapDataBoard_dataTable").hide();
				$("#statsMeMapDataBoard_dataTable_page").parent().hide();

				// 상세정보화면 데이터 보기 숨김
				$("#statsMeDetailInfo_dataTable").hide();
				$("#statsMeDetailInfo_dataTable_page").parent().hide();

				//지도이동
				if($statsMeMap.ui.mapFirstMoveYn == "Y") {
					//시도
					if(p_map_region == "sido") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove($statsMeMap.ui.mapCenterDefalut, 1);
						$statsMeMap.ui.poiMapPolygonCode = "1";
						$statsMeMap.ui.map.curPolygonCode = "1";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = $statsMeMap.ui.mapCenterDefalut[0];
							$statsMeMap.ui.pageLoadMapMoveY = $statsMeMap.ui.mapCenterDefalut[1];
							$statsMeMap.ui.pageLoadMapMoveZoom = 1;
						}
					}
					//시군구
					else if(p_map_region == "sgg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sido_coor_x, lv_sido_coor_y] , 4);
						$statsMeMap.ui.poiMapPolygonCode = "3";
						$statsMeMap.ui.map.curPolygonCode = "3";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sido_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sido_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 4;
						}
					}
					//읍면동
					else if(p_map_region == "emdong") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_sgg_coor_x, lv_sgg_coor_y] , 6);
						$statsMeMap.ui.poiMapPolygonCode = "4";
						$statsMeMap.ui.map.curPolygonCode = "4";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_sgg_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_sgg_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 6;
						}
					}
					//소지역
					else if(p_map_region == "totreg") {
						$statsMeMap.ui.mapFirstMoveYn = "N";
						$statsMeMap.ui.mapMoveEventYn = "N"; // 맵 이동 이벤트 방지
						$statsMeMap.ui.map.mapMove([lv_emdong_coor_x, lv_emdong_coor_y] , 9);
						$statsMeMap.ui.poiMapPolygonCode = "5";
						$statsMeMap.ui.map.curPolygonCode = "5";

						//지도 페이지 아니면 위치를 저장
						if($statsMeMap.ui.currentPageName != "statsMeMap") {
							$statsMeMap.ui.pageLoadMapMoveYn = "Y";
							$statsMeMap.ui.pageLoadMapMoveX = lv_emdong_coor_x;
							$statsMeMap.ui.pageLoadMapMoveY = lv_emdong_coor_y;
							$statsMeMap.ui.pageLoadMapMoveZoom = 9;
						}
					}
				}

				//업종통계지도: 생활업종통계지도 > 개업현황 (시도, 시군구 제외)
				if(data.menu_nm == "업종통계지도: 생활업종통계지도" && data.srv_nm == "개업현황"
					&& (p_map_region == "sido" || p_map_region == "sgg")
				) {
					$statsMeMap.ui.drawMapData(p_map_region,"heat");
					return;
				}
				//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화 (시도, 시군구, 읍면동 제외)
				if(data.menu_nm == "업종통계지도: 생활업종통계지도" && data.srv_nm == "업종 밀집도 변화"
					&& (p_map_region == "sido" || p_map_region == "sgg" || p_map_region == "emdong")
				) {
					$statsMeMap.ui.drawMapData(p_map_region,"heat");
					return;
				}

				//시도
				if(p_map_region == "sido") {
					//시도경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sido", $statsMeMap.ui.getStatsRegionYear(), "", "", "", function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", "", "", "", function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
				//시군구
				else if(p_map_region == "sgg") {
					//시군구경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "sgg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, "", "", function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", lv_sido_cd, "", "", function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
				//읍면동
				else if(p_map_region == "emdong") {
					//읍면동경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "emdong", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, "", function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", lv_sido_cd, lv_sgg_cd, "", function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
				//소지역
				else if(p_map_region == "totreg") {
					//소지역경계 불러오기
					$statsMeMap.ui.setStatsRegion($statsMeMap.ui.map, "totreg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
						//데이터 조회
						$statsMeMap.ui.setStatsDataOne($statsMeMap.ui.map, "all", "poi", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function(p_list) {
							//지도에 POI 생성
							$statsMeMap.ui.setMapPoiFromList($statsMeMap.ui.map, p_list);
						});
					});
				}
			}

			/* 기타 처리 */
			//통계주제도
			if(data.menu_nm == "통계주제도") {

			}
			//정책통계지도
			else if(data.menu_nm == "정책통계지도") {

			}
			//일자리 맵
			else if(data.menu_nm == "일자리 맵") {

			}
			//업종통계지도: 생활업종통계지도
			else if(data.menu_nm == "업종통계지도: 생활업종통계지도") {

			}
			//업종통계지도: 기술업종통계지도
			else if(data.menu_nm == "업종통계지도: 기술업종통계지도") {

			}
			//살고싶은 우리동네
			else if(data.menu_nm == "살고싶은 우리동네") {

			}
			//대화형 통계지도
			else if(data.menu_nm == "대화형 통계지도") {

			}
		},

		/**
		 *
		 * @name         : clearMap
		 * @description  : 지도 Clear
		 * @date         : 2019. 08. 29.
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		clearMap : function(p_map) {
			//경계 Clear
			try { p_map.clearLayer(); } catch(e) { }
			if (p_map.tradeGeojson) {
				p_map.tradeGeojson.remove();
			}

			p_map.bnd_year = bndYear;
			p_map.data = [];
			p_map.combineData = [];
			p_map.dataGeojson = null;
			p_map.curDropPolygonCode = null;
			p_map.valPerSlice = [];
			p_map.legendValue = [];
			p_map.lastGeojsonInfo = null;
			p_map.isNoReverseGeocode = false;
			p_map.isTradeMapShow = false;
			p_map.lastDrawList = [];
			p_map.legendValue.user = [];
			if (p_map.drawControl) {
				p_map.drawControl.removeOverlay();
			}
			//2019년반영 시작
			/* 2020-06-17 주석 */
			if(p_map.mapMode!="white"){
				p_map.markers.clearLayers();
			}
			//2019년반영 끝
			p_map.selectedBoundMode = null;
			p_map.selectedBoundList = [];
			p_map.dataGeojsonLayer = null;
			p_map.curAdmCd = null;
			p_map.dataForCombine = null;
			/* 2020-06-17 주석 */
			p_map.multiLayerControl.clear();
			/* 2020-06-16 TODO
			p_map.legend.removeDataOverlay();
			p_map.legend.data = []; //9월 서비스
			if (p_map.heatMap) {
				p_map.heatMap.setUTMKs([]);
			}
			*/
			p_map.gMap.eachLayer(function(layer) {
				if (layer._layer) {
					_layer.remove();
				}
			});

			//색상/버블 Clear (mapNavigation 관련 스크립트 오류 있음)
			p_map.clearDataOverlay();

			//POI Type (1, 3) 마커 클러스터 Clear
			p_map.markers.clearLayers();

			//POI Type (2, 4, 5) 마커 Clear
			$.each(p_map.gMap._layers, function(i, e) {
				var lv_poi_se_nm = e.poi_se_nm;1
				if(lv_poi_se_nm != undefined && lv_poi_se_nm != null && (lv_poi_se_nm == "2" || lv_poi_se_nm == "4" || lv_poi_se_nm == "5")) {
					p_map.gMap.removeLayer(e);
				}
			});
		},

		/**
		 *
		 * @name         : getStatsRegionYear
		 * @description  : 지도 경계 년도 가져오기
		 * @date         : 2019. 08. 23.
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 */
		getStatsRegionYear : function() {
			if($statsMeMap.ui.mapData == null) {
				return bndYear;
			}
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_year = bndYear;
			if(lv_data.stat_data_base_year != undefined && lv_data.stat_data_base_year != null && lv_data.stat_data_base_year != "" && (""+lv_data.stat_data_base_year).length > 4) {
				lv_year = lv_data.stat_data_base_year.substr(0,4);
				if($.isNumeric(lv_year) == false) {
					if(lv_data.base_year != undefined && lv_data.base_year != null && lv_data.base_year != "") {
						lv_year = lv_data.base_year;
					}
					else {
						lv_year = bndYear;
					}
				}
			}
			else if(lv_data.base_year != undefined && lv_data.base_year != null && lv_data.base_year != "") {
				lv_year = lv_data.base_year;
			}
			return lv_year;
		},

		/**
		 *
		 * @name         : setStatsRegion
		 * @description  : 지도 경계 그리기
		 * @date         : 2019. 08. 23.
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 * 		p_map : 지도 객체
		 * 		p_region : 경계 구분 (sido/sgg/emdong/totreg) (시도/시군구/읍면동/소지역)
		 * 		p_base_year : 대상년도 (옵션)
		 * 		p_sido_cd : 시도 코드 (옵션)
		 * 		p_sgg_cd : 시군구 코드 (옵션)
		 * 		p_emdong_cd : 읍면동 코드 (옵션)
		 * 		p_callback : 콜백 함수
		 */
		setStatsRegion : function(p_map, p_region, p_base_year, p_sido_cd, p_sgg_cd, p_emdong_cd, p_callback) {
			//년도 입력이 들어왔는데 bndYear 보다 큰 경우 bndYear 사용
			if(p_base_year != undefined && p_base_year != null && p_base_year != "" && p_base_year > bndYear) {
				p_base_year = bndYear;
			}
			//시도의 경우 js파일을 사용하기 떄문에 년도를 넣어야함
			if(p_region == "sido") {
				//년도 입력 안들어온경우 common.js bndYear 사용
				if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
					p_base_year = bndYear;
				}
			}

			common_loading(true); // 로딩바

			if($("#"+p_map.id+"_loading").length) {
				$("#"+p_map.id+"_loading").show();
			}

			//이미 불러온 정보는 다시 불러오지 않게 처리
			var lv_adm_cd = "00";
			var lv_year = "max";
			if(p_base_year != undefined && p_base_year != null && p_base_year != "") {
				lv_year = p_base_year;
			}
			if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") {
				lv_adm_cd = p_sido_cd;
				if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") {
					lv_adm_cd += p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") lv_adm_cd += p_emdong_cd;
				}
			}
			//기존에 저장된 정보 있음
			if($statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] != undefined) {
				setTimeout(function() {
					//경계 데이터 생성
					var lv_res = {
						type : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].type,
						id : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].id,
						errMsg : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].errMsg,
						errCd : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].errCd,
						trId : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].trId,
						ts : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].ts,
						pAdmCd : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].pAdmCd
					};
					var lv_features = [];
					for(var i = 0; i < $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features.length; i++) {
						lv_features.push({
							type : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features[i].type,
							geometry : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features[i].geometry,
							properties : $statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd].features[i].properties
						});
					}
					lv_res.features = lv_features;

					//지도에 경계 그리기
					p_map.setPolygonDataGeojson(lv_res);

					common_loading(false); // 로딩바 숨김

					if($("#"+p_map.id+"_loading").length) {
						$("#"+p_map.id+"_loading").hide();
					}

					//콜백함수 호출
			    	if(typeof p_callback === "function") {
						p_callback();
					}
				}, 0);
			}
			//기존에 저장된 정보 없음
			else {

				//시도 인 경우 데이터 양이 많아 속도가 느려지므로 geo_sido_xxxx.js 사용
				if(p_region == "sido") {
					//년도 입력 안들어온경우 common.js bndYear 사용
					if(p_base_year == undefined || p_base_year == null || p_base_year == "") {
						p_base_year = bndYear;
					}

					//시도경계 불러오기
					p_map.openApiBoundarySido(p_base_year, function(p_map2, p_res) {
						//정보 저장
						$statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = p_res;

						common_loading(false); // 로딩바 숨김

						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}

						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
					});
				}
				//시도 이외의 경계 데이터 조회
				else {
					var params = {};
					params.region = p_region;
					if(p_base_year != undefined && p_base_year != null && p_base_year != "") params.base_year = p_base_year;
					if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") params.sido_cd = p_sido_cd;
					if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") params.sgg_cd = p_sgg_cd;
					if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") params.emdong_cd = p_emdong_cd;

					// ajax 시작
					$.ajax({
					    url: sgisContextPath + "/ServiceAPI/statsMe/map/getStatsRegion.geojson",
					    type: 'get',
					    data: params
					}).done(function (res) { // 완료
						if(res.errCd == "0") {
							//지역모드세팅
							res.pAdmCd = "00";
							if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "" && p_sido_cd != "00") res.pAdmCd = p_sido_cd;
							if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "" && p_sgg_cd != "999") res.pAdmCd += p_sgg_cd;
							if(p_emdong_cd != undefined && p_emdong_cd != null && p_emdong_cd != "") res.pAdmCd += p_emdong_cd;

							//정보 저장
							$statsMeMap.ui.mapRegionData[p_region+"_"+lv_year+"_"+lv_adm_cd] = res;

							//경계그리기
							p_map.setPolygonDataGeojson(res);

						}else if(res.errCd == "-401") {
							//common_alert(res.errMsg);
						}else{
							//common_alert(res.errMsg);
						}
					}).fail(function (res) { // 실패
						//common_alert(errorMessage);
					}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
						common_loading(false); // 로딩바 숨김

						if($("#"+p_map.id+"_loading").length) {
							$("#"+p_map.id+"_loading").hide();
						}

						//콜백함수 호출
				    	if(typeof p_callback === "function") {
							p_callback();
						}
					});
					// ajax 끝
				}
			}
		},

		 /**
	     *
	     * @name         : setMapPoiFromList
	     * @description  : 리스트에서 지도에 POI를 불러온다.
	     * @date         : 2019. 10. 16.
	     * @author	     : 김남민
	     * @history 	 :
	     * @param		 :
	     */
	    setMapPoiFromList : function(p_map, p_list) {

			/* POI 리스트 세팅 */
			var lv_list = p_list;

			/* POI 타입 가져오기 */
			var lv_poi_se_nm = "1";
			if(lv_list != undefined && lv_list != null && lv_list.length > 0) {
				lv_poi_se_nm = lv_list[0].poi_se_nm;
			}

			/* 1 : 지도 마커 클러스터 추가 */
			if(lv_poi_se_nm == "1") {
				//마커 클러스터 속도를 높이기 위한 전처리
				var lv_temp_center = p_map.gMap.getCenter();
				var lv_temp_x = lv_temp_center.x;
				var lv_temp_y = lv_temp_center.y;
				var lv_temp_zoom = p_map.zoom;
				if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
				p_map.mapMove([0, 0], 13);

				//아이콘
				var lv_marker_icon = sop.icon({
	                iconUrl : contextPath+'/resources/m2020/images/marker/40_03.png',
	                iconSize:     [25, 40],
	                iconAnchor:   [13, 40],
	                infoWindowAnchor: [1, -34]
	            });
				//마커 클러스터 추가
                for(var i = 0; i < lv_list.length; i++) {
    				var lv_marker_contents = "";
    				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th>";
    				lv_marker_contents += "<strong>"+lv_list[i].poi_nm+"</strong>";
    				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    	            var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], {icon: lv_marker_icon});
    	            lv_marker.bindInfoWindow(lv_marker_contents);
    	            p_map.markers.addLayer(lv_marker);
                }

                //마커 클러스터 속도를 높이기 위한 후처리
                if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
                p_map.mapMove([lv_temp_x, lv_temp_y], lv_temp_zoom);

			}
			/* 2 : 지도 마커 추가 (빨간점) */
			else if(lv_poi_se_nm == "2") {
				var lv_marker_icon = sop.icon({
					iconUrl : contextPath+'/resources/m2020/images/marker/redCirlce.png',
					iconSize : [ 10, 10 ],
					className : "sop_icon_cursor_default"
				});
				for (var i = 0; i < lv_list.length; i++) {
					var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], { icon : lv_marker_icon });
					lv_marker.poi_se_nm = lv_poi_se_nm;
					lv_marker.addTo(p_map.gMap);
				}
			}
			/* 3 : 지도 마커 클러스터 추가 (파란점) */
			else if(lv_poi_se_nm == "3") {
				//마커 클러스터 속도를 높이기 위한 전처리
				var lv_temp_center = p_map.gMap.getCenter();
				var lv_temp_x = lv_temp_center.x;
				var lv_temp_y = lv_temp_center.y;
				var lv_temp_zoom = p_map.zoom;
				if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
				p_map.mapMove([0, 0], 13);

				//아이콘
				var lv_marker_icon = sop.icon({
	                iconUrl : contextPath+'/resources/m2020/images/marker/ico_circle_01.png',
	                iconAnchor: [7, 7],
					iconSize: [14, 14],
					infoWindowAnchor: [1, -16]
	            });
				//마커 클러스터 추가
                for(var i = 0; i < lv_list.length; i++) {
    				var lv_marker_contents = "";
    				var lv_poi_nm_list = (""+lv_list[i].poi_nm).split("$");
    				if(lv_poi_nm_list.length == 2) {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_poi_nm_list[0];
        				lv_marker_contents += "</th><td></td></tr><tr><td>";
        				lv_marker_contents += lv_poi_nm_list[1];
        				lv_marker_contents += "</td></tr></tbody></table>";
    				}
    				else {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_list[i].poi_nm;
        				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    				}
    	            var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], {icon: lv_marker_icon});
    	            //lv_marker.index = i;
    	            lv_marker.bindInfoWindow(lv_marker_contents);
    	            p_map.markers.addLayer(lv_marker);
                }

                //마커 클러스터 속도를 높이기 위한 후처리
                if(p_map.id == "statsMeMapMap") {
					$statsMeMap.ui.mapMoveEventYn2 = "N"; // 맵 이동 이벤트 방지
				}
                p_map.mapMove([lv_temp_x, lv_temp_y], lv_temp_zoom);
			}
			/* 4 : 지도 마커 추가 (파란점) */
			else if(lv_poi_se_nm == "4") {
				var lv_marker_icon = sop.icon({
					iconUrl : contextPath+'/resources/m2020/images/marker/ico_circle_01.png',
					iconSize : [ 14, 14 ]
					//zindex : 5
				});
				for (var i = 0; i < lv_list.length; i++) {
					var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], { icon : lv_marker_icon });
					lv_marker.poi_se_nm = lv_poi_se_nm;
					var lv_poi_nm_list = (""+lv_list[i].poi_nm).split("$");
					var lv_marker_contents = "";
					if(lv_poi_nm_list.length == 2) {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_poi_nm_list[0];
        				lv_marker_contents += "</th><td></td></tr><tr><td>";
        				lv_marker_contents += lv_poi_nm_list[1];
        				lv_marker_contents += "</td></tr></tbody></table>";
    				}
    				else {
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_list[i].poi_nm;
        				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    				}
    	            lv_marker.bindInfoWindow(lv_marker_contents);
					lv_marker.addTo(p_map.gMap);
				}
			}
			/* 5 : 지도 마커 추가 (빨간점) */
			else if(lv_poi_se_nm == "5") {
				var lv_marker_icon = sop.icon({
					iconUrl : contextPath+'/resources/m2020/images/marker/redCirlce.png',
					iconSize : [ 10, 10 ]
					//zindex : 5
				});
				for (var i = 0; i < lv_list.length; i++) {
					var lv_marker = sop.marker([lv_list[i].x_coor, lv_list[i].y_coor], { icon : lv_marker_icon });
					lv_marker.poi_se_nm = lv_poi_se_nm;
					var lv_poi_nm_list = (""+lv_list[i].poi_nm).split("$");
					if(lv_poi_nm_list.length == 2) {
						var lv_marker_contents = "";
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_poi_nm_list[0];
        				lv_marker_contents += "</th><td></td></tr><tr><td>";
        				lv_marker_contents += lv_poi_nm_list[1];
        				lv_marker_contents += "</td></tr></tbody></table>";
    				}
    				else {
    					var lv_marker_contents = "";
        				lv_marker_contents += "<table style='text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;'><tbody><tr><th style='color:#3792de; font-size:14px; font-weight: bold;'>";
        				lv_marker_contents += lv_list[i].poi_nm;
        				lv_marker_contents += "</th><td></td></tr></tbody></table>";
    				}
    	            lv_marker.bindInfoWindow(lv_marker_contents);
					lv_marker.addTo(p_map.gMap);
				}
			}
	    },

		/**
	     *
	     * @name         : setDataboardFromMap
	     * @description  : 지도에서 데이터보드를 불러온다.
	     * @date         : 2019. 10. 16.
	     * @author	     : 김남민
	     * @history 	 :
	     * @param		 :
	     */
	    setDataboardFromMap : function() {
	    	//데이터보드 데이터 보기 표시
			$("#statsMeMapDataBoard_dataTable").show();
			$('#boardTit').parent().attr("style", "flex-direction: column;");
			if($statsMeMap.ui.map.dataForCombine == null || $statsMeMap.ui.map.dataForCombine.showData == null || $statsMeMap.ui.map.dataForCombine.result == undefined) {	// 2020.09.22[한광희] 데이터 undefined 일 경우 추가
				$('#boardTit').parent().attr("style", "flex-direction: column; align-items: center;");
				$('#boardTit').text("조회된 데이터가 없습니다.");
				$('#boardSourceTit').text("");
				$("#statsMeMapDataBoard_dataTable").hide();
				return;
			}

			//지도에서 리스트 가져오기
			var list = $statsMeMap.ui.map.dataForCombine.result;
			var showData = $statsMeMap.ui.map.dataForCombine.showData;
			var unit = $statsMeMap.ui.map.dataForCombine.unit;
			if(unit == undefined || unit == null || unit == "") {
				unit = "수";
			}

			if(list == undefined){
	            return false;
	        }

			$statsMeMap.ui.map.dataGeojson.eachLayer(function(layer) {
				var adm_cd = layer.feature.properties.adm_cd;
				var adm_nm = layer.feature.properties.adm_nm;
				for(var i = 0; i < list.length; i++) {
					if(list[i].adm_cd == adm_cd) {
						list[i].adm_nm = adm_nm;
					}
				}
			});


			//데이터 정렬
			list.sort(function(a, b) { // 내림차순
				return Number(a[showData]) > Number(b[showData]) ? -1 : Number(a[showData]) < Number(b[showData]) ? 1 : 0;
			});

			// 상단 데이터
			// 총인구(명)[출처:통계청, 인구주택총조사(2018)]
			var data = $statsMeMap.ui.mapData.data;
			var varBoardTit = data.stat_data_srv_nm;
			var boardSourceTit = "[출처 : " + data.source;
			if(data.stat_data_base_year != null && data.stat_data_base_year != ""){
				boardSourceTit += "("+ data.stat_data_base_year + ")]";
			}
			else{
				boardSourceTit += " ]";
			}
			$('#boardTit').text(varBoardTit);
			$("#boardSourceTit").text(boardSourceTit)


			$("#statsMeMapDataBoard_dataTable>thead").empty();
			$("#statsMeMapDataBoard_dataTable>tbody").empty();

			//HTML thead 추가
			var lvTheadHtml = "";
			lvTheadHtml += "<tr class=\"fixed_top\">";

			/** 2020.09.25[한광희] 데이터보드 타이틀 수정 START */
			if($statsMeMap.ui.map.dataForCombine.pAdmCd.length > 5){
				lvTheadHtml += "<th class=\"cell1\" style=\"vertical-align: middle;\">순위</th><th class=\"cell2\" style=\"vertical-align: middle;\">집계구 번호</th>";
			} else{
				lvTheadHtml += "<th class=\"cell1\" style=\"vertical-align: middle;\">순위</th><th class=\"cell2\" style=\"vertical-align: middle;\">행정구역</th>";
			}
			/** 2020.09.25[한광희] 데이터보드 타이틀 수정 END */

			lvTheadHtml += "<th class=\"cell3\" style=\"vertical-align: middle;\">"+unit+"</th>";
			lvTheadHtml += "</tr>";
			$("#statsMeMapDataBoard_dataTable>thead").html(lvTheadHtml);

			//HTML tbody 추가
			var html = "";
			var htmlCount = 0;
			console.log("> list.length = " + list.length);
			for(var i = 0; i < list.length; i++) {

				// 2020-06-18 TODO 주석
				if(list[i].adm_nm != undefined && list[i].adm_nm != null && list[i].adm_nm != "") {
					var lv_value = ""+appendCommaToNumber(list[i][showData]);
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
					html += "<tr>";
					html += "<td class=\"cell1\">"+(htmlCount+1)+"</td>";
					//읍면동인 경우 adm_cd값 보여주기
					if((""+list[i].adm_cd).length > 7) {
						html += "<td class=\"cell2\">"+list[i].adm_cd+"</td>";
					}
					else {
						html += "<td class=\"cell2\">"+list[i].adm_nm+"</td>";
					}
					html += "<td class=\"cell3\">"+lv_value+"</td>";
					html += "</tr>";
					htmlCount++;
				}
			}

			$("#statsMeMapDataBoard_dataTable>tbody").html(html);
	    },

	    /**
		 * @name         : getAreaSido
		 * @description  : 지역선택 팝업 시도 불러오기
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 */
		getAreaSido : function(p_sido_cd) {
			// 기본값(전체)
			$("#statsMePopupArea_sido").html("");
			//기존에 저장된 정보 있음
			if($statsMeMap.ui.areaSidoData["00"] != undefined) {
				//시도 목록 추가
				var lvResultList = $statsMeMap.ui.areaSidoData["00"];
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].sido_cd == p_sido_cd) {
						$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
					}
					else {
						$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
					}
				}
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: sgisContextPath + "/ServiceAPI/map/sidoAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:bndYear
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시도 목록 저장
						$statsMeMap.ui.areaSidoData["00"] = res.result.sidoList;

						//시도 목록 추가
						var lvResultList = res.result.sidoList;
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].sido_cd == p_sido_cd) {
								$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
							}
							else {
								$("#statsMePopupArea_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
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
					common_loading(false); // 로딩바 숨김
				});
				// ajax 끝
			}
		},

		/**
		 * @name         : getAreaSgg
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 */
		getAreaSgg : function(p_sido_cd, p_sgg_cd) {
			// 기본값(전체)
			$("#statsMePopupArea_sgg").html("");
			//기존에 저장된 정보 있음
			if(
				p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != ""
				&& $statsMeMap.ui.areaSggData[p_sido_cd] != undefined
			) {
				//시군구 목록 추가
				var lvResultList = $statsMeMap.ui.areaSggData[p_sido_cd];
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].sgg_cd == p_sgg_cd) {
						$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>");
					}
					else {
						$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
					}
				}
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: sgisContextPath + "/ServiceAPI/map/sggAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:bndYear,
				    	sido_cd:p_sido_cd
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시군구 목록 저장
						if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") {
							$statsMeMap.ui.areaSggData[p_sido_cd] = res.result.sggList;
						}

						//시군구 목록 추가
						var lvResultList = res.result.sggList;
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].sgg_cd == p_sgg_cd) {
								$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>");
							}
							else {
								$("#statsMePopupArea_sgg").append("<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>");
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
					common_loading(false); // 로딩바 숨김
				});
				// ajax 끝
			}
		},

		/**
		 * @name         : getAreaEmdong
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 */
		getAreaEmdong : function(p_sido_cd, p_sgg_cd, p_emdong_cd) {
			// 기본값(전체)
			$("#statsMePopupArea_emdong").html("");
			//기존에 저장된 정보 있음
			if(
				p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != ""
				&& p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != ""
				&& $statsMeMap.ui.areaEmdongData[p_sido_cd+p_sgg_cd] != undefined
			) {
				//읍면동 목록 추가
				var lvResultList = $statsMeMap.ui.areaEmdongData[p_sido_cd+p_sgg_cd];
				for(var i = 0; i < lvResultList.length; i++) {
					if(lvResultList[i].emdong_cd == p_emdong_cd) {
						$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].emdong_nm+"</option>");
					}
					else {
						$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].emdong_nm+"</option>");
					}
				}
			}
			//기존에 저장된 정보 없음
			else {
				// ajax 시작
				$.ajax({
					url: sgisContextPath + "/ServiceAPI/map/admAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:bndYear,
				    	sido_cd:p_sido_cd,
				    	sgg_cd:p_sgg_cd
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//읍면동 목록 저장
						if(
							p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != ""
							&& p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != ""
						) {
							$statsMeMap.ui.areaEmdongData[p_sido_cd+p_sgg_cd] = res.result.admList;
						}

						//읍면동 목록 추가
						var lvResultList = res.result.admList;
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].emdong_cd == p_emdong_cd) {
								$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].emdong_nm+"</option>");
							}
							else {
								$("#statsMePopupArea_emdong").append("<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].emdong_nm+"</option>");
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
					common_loading(false); // 로딩바 숨김
				});
				// ajax 끝
			}
		},

		/**
		 * @name         : setArea
		 * @description  : 지역선택 팝업 확인
		 * @date         : 2019.08.08
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 * 		p_gubun : ok / 확인버튼
		 */
		setArea : function(p_gubun) {
			//변수 선언
			var lv_adm_coor_x = 990480.875;
			var lv_adm_coor_y = 1815839.375;
			var lv_sido_cd = $("#statsMePopupArea_sido").val();
			var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
			var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
			var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
			var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
			var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();
			var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
			if(lv_sido_cd != "99") {
				lv_adm_coor_x = lv_sido_coor_x;
				lv_adm_coor_y = lv_sido_coor_y;
			}
			if(lv_sgg_cd != "999") {
				lv_adm_coor_x = lv_sgg_coor_x;
				lv_adm_coor_y = lv_sgg_coor_y;
			}
			if(lv_emdong_cd != "99") {
				lv_adm_coor_x = lv_emdong_coor_x;
				lv_adm_coor_y = lv_emdong_coor_y;
			}

			//위치 저장
			if(p_gubun == "ok") {
				$statsMeMap.ui.default_sido_cd = lv_sido_cd;
				$statsMeMap.ui.default_sido_nm = lv_sido_nm;
				$statsMeMap.ui.default_sido_x = lv_sido_coor_x;
				$statsMeMap.ui.default_sido_y = lv_sido_coor_y;
				$statsMeMap.ui.default_sgg_cd = lv_sgg_cd;
				$statsMeMap.ui.default_sgg_nm = lv_sgg_nm;
				$statsMeMap.ui.default_sgg_x = lv_sgg_coor_x;
				$statsMeMap.ui.default_sgg_y = lv_sgg_coor_y;
				$statsMeMap.ui.default_emdong_cd = lv_emdong_cd;
				$statsMeMap.ui.default_emdong_nm = lv_emdong_nm;
				$statsMeMap.ui.default_emdong_x = lv_emdong_coor_x;
				$statsMeMap.ui.default_emdong_y = lv_emdong_coor_y;
				$statsMeMap.ui.default_x = lv_adm_coor_x;
				$statsMeMap.ui.default_y = lv_adm_coor_y;
			}

			//지도이동 처리
			if(p_gubun == "ok") {
				//지도 그리기
				var data = $statsMeMap.ui.mapData.data;
				var lv_map_region = $statsMeMap.ui.mapRegion;
				var lv_map_type = $statsMeMap.ui.mapType;

				$statsMeMap.ui.mapFirstMoveYn = "Y";
				$statsMeMap.ui.drawMapData(lv_map_region, lv_map_type);
			}
		},

		/**
		 * @name         : closeDashBoard
		 * @description  : 지도보기 기능
		 * @date         : 2020.06.22
		 * @author	     : 주형식
		 * @history 	 :
		 * @param
		 *
		 */
		closeDashBoard : function() {
			$("#statsSelectDiv2").hide();
		},


		/**
		 * @name : getCurrentLocation
		 * @description : 현재위치 좌표 얻기
		 * @date : 2019.08.22
		 * @author : 김남민
		 * @history :
		 * @param :
		 * 		callback : callback 함수
		 */
		getCurrentLocation : function(callback){
			var center = [989674, 1818313];
			if(common_get_cookie("lc_info_agree_yn") == "Y"){
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position) {
						var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
						center = [utmkXY.x, utmkXY.y];
						if(typeof callback === "function"){
							callback(center,true);
						}
					}, function(error) {
						var message;
						if (error.code === 1) {
							message = "현재위치를 동의하지 않았습니다";
						} else if (error.code === 2) {
							message = "GPS를 확인할 수 없습니다";
						} else {
							message = "현재 위치를 찾는데 실패하였습니다";
						}
						console.warn(message);
						if(typeof callback === "function"){
							callback(center,false,error.code,message);
						}
					}, {
						timeout: 5000
					});
				}else{
					if(typeof callback === "function"){
						callback(center,false,"현재 위치를 찾는데 실패하였습니다");
					}
				}
				
			}else {
				if(typeof callback === "function"){
					//callback(center,false,"현재 위치를 찾는데 실패하였습니다");
					callback(center,true);
				}
			}
			
			return center;
		},

		/**
		 * @name           : getCenterToAdmCd
		 * @description    : 지도의 중심점으로 집계구값 얻기
		 * @date           : 2019.08.22
		 * @author	       : 김남민
		 * @history        :
		 * @param center   : 중심
		 * @param callback : callback
		 */
		getCenterToAdmCd : function(center,callback) {
			var obj = new sop.openApi.personal.findcodeinsmallarea.api();
			var x,y;
			if(Object.prototype.toString.call(center)==="[object Array]"&&center.length==2){
				x = center[0];
				y = center[1];
			}else{
				center = $statsMeMap.ui.map.gMap.getCenter();
				x = center.x;
				y = center.y;
			}
			obj.addParam("accessToken", accessToken);
			obj.addParam("x_coor", x);
			obj.addParam("y_coor", y);
			obj.request({
				method : "GET",
				async : true, // false : 로딩표시, true : 로딩숨김
				url : openApiPath+"/OpenAPI3/personal/findcodeinsmallarea.json",
				options : {
					callback : callback,
					center : center,
					target : $statsMeMap.ui
				}
			});
		},

		/**
		 *
		 * @name         : createInfoTooltip
		 * @description  : 경계레이어 선택 시, 툴팁을 생성하여 정보를 표출한다.
		 * @date         : 2015. 10. 12.
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param event  : 선택된 경계레이어
		 * @param data   : 선택된 경계레이어의 데이터정보
		 */
		createInfoTooltip : function(p_event, p_data, p_type, p_map) {

			var areaTitle = "";
			var areaData = "";
			var areaDataTitle = "";

			//변수
			var lv_data = $statsMeMap.ui.mapData.data;

			// HTML 생성
			var lv_html = "<table style='margin:10px;'>";
			lv_html += "<tr><td colspan='3' class='admName' style='font-size: 14px; font-weight: bold; color: #22A6C1;'>";
			lv_html += p_data.properties.adm_nm;
			lv_html += "</td></tr>";
			if (p_type != "polygon") {
				lv_html += "<tr style='height:5px'></tr>";
			}

			areaTitle = p_data.properties.adm_nm;

			// 집계구 정보
			var lv_adm_cd = p_data.properties.adm_cd;
			if(lv_adm_cd != undefined && lv_adm_cd != null && lv_adm_cd.length == 13) {
				if (p_type == "polygon") {
					lv_html += "<tr style='height:5px'></tr>";
				}
				lv_html += "<tr><td class='statsData' style='font-size: 12px; padding-left: 5px;'>집계구 : "+lv_adm_cd+"</td></tr>";

				areaTitle = "집계구 : "+lv_adm_cd;
			}

			// 데이터
			if (p_type != "polygon") {
				lv_html += "<tr>";
				if(p_data.info != null && p_data.info.length > 0) {
					var lv_title = "";
					if(p_data.info[0].tooltip_cn != undefined && p_data.info[0].tooltip_cn != null && p_data.info[0].tooltip_cn != "") lv_title += (""+p_data.info[0].tooltip_cn).replace(lv_title,"").trim();
					try {
						if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "e-지방지표") {
							var lv_ecountry_map = $statsMeMap.ui.ecountryMapping[$statsMeMap.ui.mapData.data.stat_data_id];
							lv_title = lv_ecountry_map.base_item_nm;
						}
					} catch(e) { }
					var lv_value = ""+appendCommaToNumber(parseFloat(p_data.info[0][p_data.info[0].showData]));
					var lv_unit = "";
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
					if(lv_title != "") {
						lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>"+lv_title+"</td>";
						lv_html += "<td>&nbsp;:&nbsp;</td>";
					}
					lv_html += "<td>";
					lv_html += lv_value;
					if(p_data.info[0].unit != undefined && p_data.info[0].unit != null && p_data.info[0].unit != "") {
						lv_html += " ("+ p_data.info[0].unit +")";
						lv_unit = " ("+ p_data.info[0].unit +")";
					}
					lv_html += "</td>";
				} else {
					lv_html += "<td class='statsData' style='font-size: 12px; padding-left: 5px;'>N/A</td>";
					lv_value = "N/A";
				}
				lv_html += "</tr>";


				areaDataTitle = lv_title;
				areaData = appendCommaToNumber(p_data.info[0][p_data.info[0].showData]) + "(" + p_data.info[0].unit + ")";
				common_popup_area_click(areaTitle, areaDataTitle, areaData);
			}
			lv_html += "</table>";


			if(areaTitle == "") areaTitle = p_data.properties.adm_nm;
			areaDataTitle = $statsMeMap.ui.mapData.data.stat_data_base_year + "년   : ";
			areaData = appendCommaToNumber(p_data.info[0][p_data.info[0].showData]) + "(" + p_data.info[0].unit + ")";
			common_popup_area_click(areaTitle, areaDataTitle, areaData);

			//통계주제도
			if(lv_data.menu_nm == "통계주제도") {

			}
			//정책통계지도
			else if(lv_data.menu_nm == "정책통계지도") {

			}
			//일자리 맵
			else if(lv_data.menu_nm == "일자리 맵") {

			}
			//업종통계지도: 생활업종통계지도
			else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도") {

			}
			//업종통계지도: 기술업종통계지도
			else if(lv_data.menu_nm == "업종통계지도: 기술업종통계지도") {

			}
			//살고싶은 우리동네
			else if(lv_data.menu_nm == "살고싶은 우리동네") {

			}
			//대화형 통계지도
			else if(lv_data.menu_nm == "대화형 통계지도") {

			}

		},

		/**
	     *
	     * @name         : drawBubbleMap
	     * @description  : 버블지도를 생성한다. (Override)
	     * @date         : 2019. 09. 02.
	     * @author	     : 김남민
	     * @history 	 :
	     * @param geojson : 경계데이터
	     */
	    drawBubbleMap : function(geojson) {
	    	if (geojson == null) {
	    		return;
	    	}
	    	var that = $statsMeMap.ui.map.legend;

		    geojson.eachLayer(function(layer) {
		    	var info = null;
		    	var data = null;
		    	var unit = null;
		    	var toolTip = "";
		    	var color = layer.options.fillColor;
		    	var idx = 0;
		    	var x = layer.feature.properties.x;
		    	var y = layer.feature.properties.y;
		    	var adm_nm = layer.feature.properties.adm_nm;
		    	if (layer.feature.info.length > 0) {
	    			info = layer.feature.info[0];
	    			data = info[info.showData];
			    	unit = info.unit;

			    	var lv_title = "";
					if(info.tooltip_cn != undefined && info.tooltip_cn != null && info.tooltip_cn != "") lv_title += (""+info.tooltip_cn).replace(lv_title,"").trim();
					var lv_value = ""+appendCommaToNumber(parseFloat(info[info.showData]));
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;

					toolTip = "<div class='MapselectpopCon02'><ul><li>";
					toolTip += "<span id='areaTitle'>" + adm_nm + "</span></li>"
					if(lv_title != "") {
						toolTip += "<li><span>" + lv_title + "</span> : <span id='areaData'> " + lv_value + " ("+ unit + ")" +"</span></li>"
					}else{
						toolTip += "<li><span>" + "</span> : <span id='areaData'> " + lv_value + " ("+ unit + ")" +"</span></li>"
					}
					toolTip += "</ul></div>";

		    		if (that.legendType == "negative") {
		    			that.legendColor = that.negativeLegendColor;
		    		}

			    	for (var i=0; i<that.legendColor.length; i++) {
			    		if (color == that.legendColor[i]) {
			    			idx = i;
			    			break;
			    		}
			    	}

			    	var marker = $statsMeMap.ui.map.addCircleMarker(x, y, {
			    		radius : that.legendCircleRadius[idx],
			    		fillColor : color,
			    		color : "white",
			    		weight : 1,
			    		tooltipMsg : toolTip,
			    		options : {
			    			idx : idx,
			    			data : data
			    		}
			    	});
			    	that.circleMarkerGroup.push(marker);
		    	}
		    });
	    },


	    /**
		 * @name         : getMyPositionCallback
		 * @description  : 내 위치 조회 후 콜백
		 * @date         : 2019.08.22
		 * @author	     : 김남민
		 * @history 	 :
		 * @param        :
		 */
		getMyPositionCallback : function() {
			// 현재위치 반영
			//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
			//$("#statsMePopupArea_sido").val($statsMeMap.ui.my_sido_cd);
			$statsMeMap.ui.getAreaSido($statsMeMap.ui.my_sido_cd);
			$statsMeMap.ui.getAreaSgg($statsMeMap.ui.my_sido_cd, $statsMeMap.ui.my_sgg_cd);
			$statsMeMap.ui.getAreaEmdong($statsMeMap.ui.my_sido_cd, $statsMeMap.ui.my_sgg_cd, $statsMeMap.ui.my_emdong_cd);

			// 위치 저장
			$statsMeMap.ui.default_sido_cd = $statsMeMap.ui.my_sido_cd;
			$statsMeMap.ui.default_sido_nm = $statsMeMap.ui.my_sido_nm;
			$statsMeMap.ui.default_sido_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
			$statsMeMap.ui.default_sido_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
			$statsMeMap.ui.default_sgg_cd = $statsMeMap.ui.my_sgg_cd;
			$statsMeMap.ui.default_sgg_nm = $statsMeMap.ui.my_sgg_nm;
			$statsMeMap.ui.default_sgg_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
			$statsMeMap.ui.default_sgg_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
			$statsMeMap.ui.default_emdong_cd = $statsMeMap.ui.my_emdong_cd;
			$statsMeMap.ui.default_emdong_nm = $statsMeMap.ui.my_emdong_nm;
			$statsMeMap.ui.default_emdong_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
			$statsMeMap.ui.default_emdong_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
			$statsMeMap.ui.default_x = $statsMeMap.ui.my_x;
			$statsMeMap.ui.default_y = $statsMeMap.ui.my_y;

			$statsMeMap.ui.setPositionText();
		},


		/**
		 * @name : statsMeMApGoDetail
		 * @description : 링크로 이동
		 * @date : 2019.08.20
		 * @author : 김남민
		 * @history :
		 * @param
		 */
		statsMeMApGoDetail : function() {

			var lvThis = $(this);
			if(lvThis.parent().hasClass("hidden")) {
				return;
			}
			//Validation
			if($statsMeMap.ui.mapData == null) {
				common_alert("조회된 데이터가 없습니다.");
				return;
			}
			else {
				//변수선언
				var lv_adm_cd = "00";
				var lv_adm_nm = "전국";
				var lv_sido_cd = $("#statsMePopupArea_sido").val();
				var lv_sido_nm = $("#statsMePopupArea_sido option:selected").text();
				var lv_sido_coor_x = $("#statsMePopupArea_sido option:selected").attr("data-coor-x");
				var lv_sido_coor_y = $("#statsMePopupArea_sido option:selected").attr("data-coor-y");
				var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
				var lv_sgg_nm = $("#statsMePopupArea_sgg option:selected").text();
				var lv_sgg_coor_x = $("#statsMePopupArea_sgg option:selected").attr("data-coor-x");
				var lv_sgg_coor_y = $("#statsMePopupArea_sgg option:selected").attr("data-coor-y");
				var lv_emdong_cd = $("#statsMePopupArea_emdong").val();
				var lv_emdong_nm = $("#statsMePopupArea_emdong option:selected").text();
				var lv_emdong_coor_x = $("#statsMePopupArea_emdong option:selected").attr("data-coor-x");
				var lv_emdong_coor_y = $("#statsMePopupArea_emdong option:selected").attr("data-coor-y");
				var lv_x = $statsMeMap.ui.map.gMap.getCenter().x;
				var lv_y = $statsMeMap.ui.map.gMap.getCenter().y;
				var lv_zoom = $statsMeMap.ui.map.zoom;
				var lv_map_region = $statsMeMap.ui.mapRegion;
				var lv_map_type = $statsMeMap.ui.mapType;
				var lv_curPolygonCode = $statsMeMap.ui.map.curPolygonCode;
				if(lv_map_region == "totreg") { // 읍면동
					lv_adm_cd = lv_sido_cd + lv_sgg_cd + lv_emdong_cd;
					lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm + " " + lv_emdong_nm;
					lv_x = lv_emdong_coor_x;
					lv_y = lv_emdong_coor_y;
					lv_zoom = 9;
				} else if(lv_map_region == "emdong") { // 시군구
					lv_adm_cd = lv_sido_cd + lv_sgg_cd;
					lv_adm_nm = lv_sido_nm + " " + lv_sgg_nm;
					lv_x = lv_sgg_coor_x;
					lv_y = lv_sgg_coor_y;
					lv_zoom = 6;
				} else if(lv_map_region == "sgg") { // 시도
					lv_adm_cd = lv_sido_cd;
					lv_adm_nm = lv_sido_nm;
					lv_x = lv_sido_coor_x;
					lv_y = lv_sido_coor_y;
					lv_zoom = 4;
				} else if(lv_map_region == "sido") { // 전국
					lv_adm_cd = "00";
					lv_adm_nm = "전국";
					lv_x = 989674;
					lv_y = 1818313;
					lv_zoom = 2;
					lv_curPolygonCode = 2;
				}

				//대화형 통계지도 > 전국 사업체조사: 산업분류
				if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "전국 사업체조사: 산업분류") {
					var lv_ksic_1_cd = $statsMeMap.ui.mapData.data.ksic_1_cd;
					var lv_ksic_4_cd = $statsMeMap.ui.mapData.data.ksic_4_cd;
					if(
						lv_ksic_1_cd != undefined && lv_ksic_1_cd != null && lv_ksic_1_cd != ""
						&& lv_ksic_4_cd != undefined && lv_ksic_4_cd != null && lv_ksic_4_cd != ""
					) {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = $statsMeMap.ui.mapData.data.stat_data_nm;
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/company.json", //전국 사업체조사: 산업분류
							"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"class_code": lv_ksic_1_cd+lv_ksic_4_cd,
									"area_type": "0",
									"bnd_year": bndYear,
									"year": $statsMeMap.ui.mapData.data.stat_data_base_year,
									"low_search": "1",
									"adm_cd": lv_adm_cd
								},
								"showData": "corp_cnt",
								"unit": "개",
								"api_id": "API_0304",
								"isKosis": false,
								"btntype": "normal",
								"legend": {
									"type": "color",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						common_alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//대화형 통계지도 > 전국 사업체조사: 테마업종
				else if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "전국 사업체조사: 테마업종") {
					var lv_theme_cd = $statsMeMap.ui.mapData.data.theme_cd;
					if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = $statsMeMap.ui.mapData.data.stat_data_nm;
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/company.json", //전국 사업체조사: 산업분류
							"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"theme_cd": lv_theme_cd,
									"area_type": "0",
									"year": $statsMeMap.ui.mapData.data.stat_data_base_year,
									"low_search": "1",
									"bnd_year": bndYear,
									"adm_cd": lv_adm_cd
								},
								"showData": "corp_cnt",
								"unit": "개",
								"api_id": "API_0304",
								"isKosis": false,
								"btntype": "normal",
								"legend": {
									"type": "color",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": $statsMeMap.ui.mapData.data.stat_data_nm+" 사업체수",
								"maxYear": "2017",
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						common_alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//대화형 통계지도 > 인구주택총조사
				else if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "인구주택총조사") {
					var lv_b_class_nm = $statsMeMap.ui.mapData.data.b_class_nm;
					var lv_year = $statsMeMap.ui.mapData.data.year;
					var lv_bnd_year = $statsMeMap.ui.mapData.data.bnd_year;

					if(lv_b_class_nm == "인구조건") {
						window.open($statsMeMap.ui.mapData.data.link_url);
					} else if(lv_b_class_nm == "가구조건") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "1인가구";
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/household.json", // 대화형 통계지도:인구주택총조사:가구조건
							"title":"1인가구",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"household_type":"A0",
									"area_type":"0",
									"year" : lv_year,
									"low_search" : "1",
									"bnd_year" : bndYear,
									"adm_cd" : lv_adm_cd
								},
								"showData" : "household_cnt",
								"unit" : "가구",
								"api_id" : "API_0305",
								"isKosis" : false,
								"btntype" : "normal",
								"legend" : {
									"type" : "color",
									"level" : 7,
									"color" : ["#ffd75d","#f6b64e","#ee953f","#e67430","#dd5321","#d53212","#cd1103"]
								},
								"title":"1인가구",
								"maxYear": null,
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					} else if(lv_b_class_nm == "주택조건") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "총주택";
						lv_params.map_type = "IMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/stats/house.json", // 대화형 통계지도:인구주택총조사:주택조건
							"title":"총주택",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"area_type" : "0",
									"year" : lv_year,
									"low_search" : "1",
									"bnd_year" : lv_bnd_year,
									"adm_cd" : lv_adm_cd
								},
								"showData" : "house_cnt",
								"unit" : "호",
								"api_id" : "API_0306",
								"isKosis" : false,
								"btntype" : "normal",
								"legend" : {
									"type" : "color",
									"level" : 7,
									"color" : [ "#ffd75d", "#f6b64e",
											"#ee953f", "#e67430", "#dd5321",
											"#d53212", "#cd1103" ]
								},
								"title" : "총주택",
								"maxYear": null,
								"curPolygonCode": lv_curPolygonCode,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/map/interactiveMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else if(lv_b_class_nm == "결합조건") {
						window.open($statsMeMap.ui.mapData.data.link_url);
					}

				}
				//대화형 통계지도 > e-지방지표
				else if($statsMeMap.ui.mapData.data.menu_nm == "대화형 통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "e-지방지표") {
					var lv_url = "/view/map/interactiveMap/ecountry";
					var lv_ecountry_map = $statsMeMap.ui.ecountryMapping[$statsMeMap.ui.mapData.data.stat_data_id];
					lv_url += "?list_id="+lv_ecountry_map.list_id;
					lv_url += "&tbl_id="+lv_ecountry_map.tbl_id;
					lv_url += "&base_item_id="+lv_ecountry_map.base_item_id;
					if(lv_ecountry_map.add_item_id != undefined && lv_ecountry_map.add_item_id != null && lv_ecountry_map.add_item_id != "") {
						lv_url += "&add_item_id="+lv_ecountry_map.add_item_id;
					}
					lv_url += "&prd_id="+lv_ecountry_map.prd_id;
					lv_url += "&prid_value="+lv_ecountry_map.prid_value;
					lv_url += "&adm_cd="+lv_adm_cd;
					window.open(lv_url);
				}
				//업종통계지도: 생활업종통계지도 > 시군구별 업종현황
				else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 생활업종통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "시군구별 업종현황") {
					var lv_theme_cd = $statsMeMap.ui.mapData.data.theme_cd;
					if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "시군구별 생활업종 현황";
						lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/OpenAPI3/startupbiz/sggtobcorpcount.json", //업종통계지도: 생활업종통계지도 > 시군구별 업종현황
							"params": {
								"mapInfo": {
									"zoomlevel": 2,
									"center": [1007770, 1855549]
								},
								"paramInfo": {
									"theme_cd": lv_theme_cd,
									"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
									"adm_nm": "전국",
									"curSelectedStatsType": "jobArea",
									"jobAreaThemeCd": ""
								},
								"showData": null,
								"unit": null,
								"api_id": "API_0615",
								"isKosis": false,
								"btntype": null,
								"legend": {
									"type": "color",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": "시군구별 생활업종 현황",
								"maxYear": null,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						common_alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//업종통계지도: 생활업종통계지도 > 개업현황
				else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 생활업종통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "개업현황") {
					var lv_service_code = $statsMeMap.ui.mapData.data.service_code;
					if(lv_service_code != undefined && lv_service_code != null && lv_service_code != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "업종별 개업 현황";
						lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "none",
							"title": "업종별 개업 현황",
							"params": {
								"mapInfo": {
									"zoomlevel": 6, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_emdong_coor_x, lv_emdong_coor_y]
								},
								"paramInfo": {
									"curSelectedStatsType": "jobOpen",
									"theme_cd": lv_service_code,
									"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
									"adm_cd": lv_sido_cd+lv_sgg_cd+lv_emdong_cd,
									"adm_nm": lv_sido_nm+" "+lv_sgg_nm+" "+lv_emdong_nm,
									"year": $statsMeMap.ui.mapData.data.stat_data_base_year
								},
								"showData": null,
								"unit": null,
								"api_id": "none",
								"isKosis": false,
								"btntype": null,
								"legend": {
									"type": "heat",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": "업종별 개업 현황",
								"maxYear": null,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						common_alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화
				else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 생활업종통계지도" && $statsMeMap.ui.mapData.data.srv_nm == "업종 밀집도 변화") {
					var lv_theme_cd = $statsMeMap.ui.mapData.data.theme_cd;
					if(lv_theme_cd != undefined && lv_theme_cd != null && lv_theme_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "업종별 밀집도 현황";
						lv_params.map_type = "BMAP"; // 대화형통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "none",
							"title": "업종별 밀집도 현황",
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoom, //1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [lv_x, lv_y]
								},
								"paramInfo": {
									"curSelectedStatsType": "jobChange",
									"theme_cd": lv_theme_cd,
									"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
									"adm_cd": lv_adm_cd,
									"adm_nm": lv_adm_nm,
									"year": $statsMeMap.ui.mapData.data.stat_data_base_year
								},
								"showData": null,
								"unit": null,
								"api_id": "none",
								"isKosis": false,
								"btntype": null,
								"legend": {
									"type": "heat",
									"level": 7,
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"title": "업종별 밀집도 현황",
								"maxYear": null,
								"mapCaptureId": "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/bizStats/bizStatsMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						common_alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//업종통계지도: 기술업종통계지도
				else if($statsMeMap.ui.mapData.data.menu_nm == "업종통계지도: 기술업종통계지도") {
					var lv_techbiz_m_class_cd = $statsMeMap.ui.mapData.data.techbiz_m_class_cd;
					if(lv_techbiz_m_class_cd != undefined && lv_techbiz_m_class_cd != null && lv_techbiz_m_class_cd != "") {
						//즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = $statsMeMap.ui.mapData.data.stat_data_nm;
						lv_params.map_type = "TECH"; // 업종통계지도: 기술업종통계지도 고정값
						lv_params.params = JSON.stringify([{
							"url": "/ServiceAPI/technicalBiz/sggCompanyMapInfo.json", //전국 사업체조사: 산업분류
							"params": {
								"mapInfo": {
									"zoomlevel": 2,
									"center": [1007770, 1855549]
								},
								"paramInfo": {
									"theme_cd": lv_techbiz_m_class_cd,
									"theme_nm": $statsMeMap.ui.mapData.data.stat_data_nm,
									"adm_nm": "전국",
									"viewType": "color"
								},
								"legend": {
									"type": "bubble",
									"level": "7",
									"color": ["#ffd75d", "#f6b64e", "#ee953f", "#e67430", "#dd5321", "#d53212", "#cd1103"]
								},
								"type": "sigungu"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/technicalBiz/technicalBizMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					}
					else {
						common_alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				// 살고싶은 우리동네
				else if($statsMeMap.ui.mapData.data.menu_nm == "살고싶은 우리동네") {
					var lv_m_class_idx_id = $statsMeMap.ui.mapData.data.m_class_idx_id;
					var lv_b_class_idx_id = $statsMeMap.ui.mapData.data.b_class_idx_id;
					if(lv_m_class_idx_id != undefined && lv_m_class_idx_id != null && lv_m_class_idx_id != ""
						&& lv_b_class_idx_id != undefined && lv_b_class_idx_id != null && lv_b_class_idx_id != ""
						) {
						// 즐겨찾기 테이블에 등록
						var lv_params = {};
						var lv_hist_id = makeRandomThirtySevenDigitString();
						lv_params.hist_id = lv_hist_id;
						lv_params.hist_type = "SHARE"; // SHARE : 공유, BMARK : 즐겨찾기
						lv_params.hist_nm = "주거현황보기";
						lv_params.map_type = "HMAP";	// 살고싶은 우리동네 고정 값

						/** My통계로 지역경계에 따른 살고싶은 우리동네 zoomlevel, adm_cd 셋팅 START */
						var lv_zoomlevel = 2;
						var lv_adm_cd = "";
						// My통계로:전국, 살고싶은 우리동네:시도
						if($statsMeMap.ui.mapRegion == "sido"){
							lv_zoomlevel = 2;
							lv_adm_cd = "00";
						}
						// My통계로:시도, 살고싶은 우리동네:시군구
						else if($statsMeMap.ui.mapRegion == "sgg"){
							lv_zoomlevel = 4;
							lv_adm_cd = $statsMeMap.ui.default_sido_cd;
						}
						// My통계로:시군구, 살고싶은 우리동네:읍면동
						else if($statsMeMap.ui.mapRegion == "emdong"){
							lv_zoomlevel = 6;
							lv_adm_cd = $statsMeMap.ui.default_sido_cd + $statsMeMap.ui.default_sgg_cd;
						}
						/** My통계로 지역경계에 따른 살고싶은 우리동네 zoomlevel, adm_cd 셋팅 END */

						lv_params.params = JSON.stringify([{
							"url": "/SOPOpenAPI/OpenAPI3/boundary/hadmarea.geojson", // 살고싶은 우리동네
							"params": {
								"mapInfo": {
									"zoomlevel": lv_zoomlevel,	// 1: 시도, 4: 시군구, 6 : 읍면동, 9 : 소지역
									"center": [$statsMeMap.ui.default_x, $statsMeMap.ui.default_y]
								},
								"paramInfo": {
									"adm_cd": lv_adm_cd,
									"b_class_idx_id": lv_b_class_idx_id,
									"m_class_idx_id": lv_m_class_idx_id,
									"chkbox_chk": 1
								},
								"legend": {
									"type": "color",
									"level": "5",
									"color": ["#ccc", "#b8c4a8", "#a5bc85",	"#92b461", "#7fad3e"]
								},
								"title" : "주거현황보기",
								"type": 1,
								"mapCaptureId" : "#mapRgn_1"
							}
						}]);
						// ajax 시작
						$.ajax({
						    url: contextPath+"/ServiceAPI/member/RegStatisticsHistory.json",
						    type: 'post',
						    async : false,
						    data: lv_params
						}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
							window.open(contextPath+"/view/house/houseAnalysisMap/sharedata?id="+lv_hist_id);
						});
						// ajax 끝
					} else {
						common_alert("이동할 URL 조회에 실패하였습니다.");
					}
				}
				//나머지
				else if($statsMeMap.ui.mapData.data.link_url != undefined && $statsMeMap.ui.mapData.data.link_url != null && $statsMeMap.ui.mapData.data.link_url != "") {
					window.open($statsMeMap.ui.mapData.data.link_url);
				}
				//예외처리
				else {
					common_alert("이동할 URL 조회에 실패하였습니다.");
				}
			}
		},

		/**
		 *
		 * @name         : showNumberClick
		 * @description  : 통계값 표출유무 버튼 클릭 시
		 * @date         : 2016. 01. 14.
		 * @author	     : 김성현
		 * @history 	 :
		 */
		showNumberClick : function() {
			var legend = this.map.legend;
			//통계표출 on일 경우 off로 변경
			if(legend.numberData) {
				$("#showNumberBtn").removeClass("on");
				srvLogWrite('O0', '51', '04', '00', 'OFF', '');
			} else {	//통계표출 off일 경우 on으로 변경
				$("#showNumberBtn").addClass("on");
				srvLogWrite('O0', '51', '04', '00', 'ON', '');
			}
			//통계값 표출유무 설정 호출
			legend.showNumberData();
		},


	    /**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2019.08.20
		 * @author : 김남민
		 * @history :
		 * @param
		 */
		createMap : function(id) {

			var lvStatsMeMapShowYn = "Y";
			if($("#statsMeMap").css("display") == "none") {
				lvStatsMeMapShowYn = "N";
			}
			if(lvStatsMeMapShowYn == "N") {
				$("#statsMeMap").parent().css("overflow","hidden");
				$("#statsMeMap").show();
			}

			this.map = new sMap.map();
			this.map.id = id;
			this.map.isDrop = true;
			this.map.isInnerMapShow = true;
			this.map.isTradeMapShow = false;
			this.map.boundLevel = 0; // 확대 상관없이 지역경계 표시하게함
			this.map.createMap($statsMeMap, id, {
				//대전 서구 둔산동
				//center : [ 989674, 1818313 ],
				//zoom : 8, //9->8
				//전국
				center : $statsMeMap.ui.mapCenterDefalut,
				zoom : 1,
				measureControl : false,
				statisticTileLayer: true
			});
			this.map.addControlEvent("zoomend");

			this.map.gMap.on("moveend", function (e) {
				var that = $statsMeMap.ui.map;
				if (that.delegate &&
					that.delegate.callbackFunc &&
					that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
					that.delegate.callbackFunc.didMapMoveEnd(e, that);
				}
			});

			//지도 버튼 콜백 함수 등록
			this.map.mapBtnInfo = $statsMeMap.mapBtnInfo;

			//지도 범례 등록
			var legend = new sLegendInfo.legendInfo($statsMeMap.ui.map);
			legend.linkTooltip = function() {}; //툴팁오류 방지
			legend.drawBubbleMap = $statsMeMap.ui.drawBubbleMap; // 버블 지도 Override
			legend.initialize($statsMeMap.ui);
			//console.log("## legend = " + JSON.stringify(legend));
			this.map.legend = legend;
			legend.createLegend();
			$("#legendColor_"+$statsMeMap.ui.map.legend.id+" li>a").on("click",function() {
				$statsMeMap.ui.map.legend.legendType = "auto";
			});

			//지도 불러오기 완료 후 처리
			this.map.gMap.whenReady(function() {
				//열지도 생성
				$statsMeMap.ui.map.createHeatMap();

				//위성, 일반, 백지도 선택 버튼 추가
				var mapUI = sop.control({position: 'topright'});
				mapUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'map_' + $statsMeMap.ui.mapId);
				    $(this._div).css("margin-top","45px");
				    $statsMeMap.ui.mapObj = this._div;
				    return this._div;
				};
				mapUI.update = function (props) {

				};
				mapUI.addTo($statsMeMap.ui.map.gMap);

				//확대 축소 버튼 추가
				var zoomUI = sop.control({position: 'topright'});
				zoomUI.onAdd = function (map) {
				    this._div = sop.DomUtil.create('div', 'info');
				    sop.DomEvent.disableClickPropagation(this._div);
				    this.update();
				    $(this._div).attr("id", 'zoom_' + $statsMeMap.ui.mapId);
				    $statsMeMap.ui.zoomObj = this._div;
				    return this._div;
				};
				zoomUI.update = function (props) {

				};
				zoomUI.addTo($statsMeMap.ui.map.gMap);

				//현재위치 가져오기
				$statsMeMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {

					if(p_flag == true) {
						//변수 입력
						$statsMeMap.ui.my_x = p_center[0];
						$statsMeMap.ui.my_y = p_center[1];
						//지역조회
						$statsMeMap.ui.getCenterToAdmCd(p_center, function(res) {
							//변수 입력
							$statsMeMap.ui.my_location_yn = "Y";
							$statsMeMap.ui.my_sido_cd = res.result.sido_cd;
							$statsMeMap.ui.my_sido_nm = res.result.sido_nm;
							$statsMeMap.ui.my_sgg_cd = res.result.sgg_cd;
							$statsMeMap.ui.my_sgg_nm = res.result.sgg_nm;
							$statsMeMap.ui.my_emdong_cd = res.result.emdong_cd;
							$statsMeMap.ui.my_emdong_nm = res.result.emdong_nm;

							//내 위치 조회 후 콜백
							$statsMeMap.ui.getMyPositionCallback();

							// 검색된 리스트에서 첫번재 항목 검색
							if($('.gridheader_con').length != 0){
								$('.gridheader_con').eq(0).trigger("click");
								srvLogWrite('O0', '03', '01', '00',$('.gridheader_con').eq(0).children('.gridrow').text(), '');
							}
						});
					}
					else {
						// 검색된 리스트에서 첫번재 항목 검색
						if($('.gridheader_con').length != 0){
							$('.gridheader_con').eq(0).trigger("click");
							srvLogWrite('O0', '03', '01', '00',$('.gridheader_con').eq(0).children('.gridrow').text(), '');
						}
					}
				});

				// 지도 크기지정 안보이도록 변경
				$('.sop-control-container').hide();

			});

			//지도 불러오기 후 처리
			if(lvStatsMeMapShowYn == "N") {
				$("#statsMeMap").hide();
				$("#statsMeMap").parent().css("overflow","");
			}
		},

		/**
		 * @name : statsMeListPopupToggle
		 * @description : 통계주제도 목록 팝업 토글
		 * @date : 2020.09.10
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		p_flag : true/false => 표시/감춤
		 */
		statsMeListPopupToggle : function(p_flag){
			//표시
			if(p_flag == true) {
				$("#statsMeListDiv").css("top",$(window).outerHeight(true)+"px");
				$("#statsMeListDiv").animate({
					top : 100
				},400,function(){
					$("#statsMeCatalogKwrd").val("");	// 결과내 검색 초기화
					$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
				//	$("#statsMeListDiv").prop("style","position: fixed; top:40px; background-color: white; height: 100%; width: 100%; z-index: 999;"); /*2020.09.10[신예리] 화면재구성 css 추가*/ 
				//	$("#statsMeListDiv").prop("style","position: fixed; top:105px; left:10px; background-color: white; height: 500px; width: 320px; z-index: 999;"); /*2020.09.10[신예리] 화면재구성 css 추가*/
					//2022-10-20 css 수정 
					$("#statsMeListDiv").prop("style","position: fixed; background-color: white; z-index: 999;");
					$("#statsMeListDiv").show();
					$statsMeMap.ui.searchStatsGrphInfo($("#selectStatMeCatalogSorting option:selected").val());// 목록 조회
				});
			}
			//감춤
			else {
				$("#statsMeListDiv").css("display","none");
				/*				$("#statsMeListDiv").animate({
					top : $(window).outerHeight(true)
				},200,function(){
					$("#statsMeListDiv").prop("style","position:absolute; bottom: 0;"); 2020.09.09[신예리] 버튼 하단에 배치되도록 css 추가
					$("#statsMeListDiv").hide();
				});  */
			}
		},
		// wkwk
		statsMeListPopupToggle2 : function(p_flag){
			//표시
			if(p_flag == true) {
				$("#statsMeListDiv").css('display','block');
				$("#statsMeCatalogKwrd").val("");	// 결과내 검색 초기화
				$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
				$("#statsMeListDiv").prop("style","position: fixed; top:105px; background-color: white; height: 100%; width: 100%; z-index: 999;"); /*2020.09.10[신예리] 화면재구성 css 추가*/
				$("#statsMeListDiv").show();
				$statsMeMap.ui.searchStatsGrphInfo($("#selectStatMeCatalogSorting option:selected").val());// 목록 조회
			}
			//감춤
			else {
				$("#statsMeListDiv").css("display","none");
				/*				$("#statsMeListDiv").animate({
					top : $(window).outerHeight(true)
				},200,function(){
					$("#statsMeListDiv").prop("style","position:absolute; bottom: 0;"); 2020.09.09[신예리] 버튼 하단에 배치되도록 css 추가
					$("#statsMeListDiv").hide();
				});  */
			}
		}

	};



	// 지도 콜백 함수 선언
	$statsMeMap.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			$statsMeMap.ui.createInfoTooltip(event, data, type, map);
		}
		// 지도이동. createMap()에서 "movestart" 이벤트 선언시 콜백됨.
		,didMapMoveStart : function(event, map) {
		}
		// 지도이동종료. createMap()에서 "moveend" 이벤트 선언시 콜백됨.
		,didMapMoveEnd : function(event, map) {
			//조회된 데이터 없으면 정지
			if($statsMeMap.ui.mapData == null) return;
			//지도 이동 이벤트 막혀있으면 지정 시간 이후에 풀어주기
			if($statsMeMap.ui.mapMoveEventYn == "N") {
				setTimeout(function() {
					$statsMeMap.ui.mapMoveEventYn = "Y";
				}, $statsMeMap.ui.mapMoveEventDelay);
				return;
			}
			//지도 이동 이벤트2 막혀있으면 지정 시간 이후에 풀어주기
			if($statsMeMap.ui.mapMoveEventYn2 == "N") {
				setTimeout(function() {
					$statsMeMap.ui.mapMoveEventYn2 = "Y";
				}, $statsMeMap.ui.mapMoveEventDelay);
				return;
			}

			//변수
			var lv_data = $statsMeMap.ui.mapData.data;
			var lv_zoom = $statsMeMap.ui.map.zoom;
			console.log("lv_data = " + lv_data);
			console.log("lv_zoom = " + lv_zoom);

			//색상/버블 (시도, 시군구, 읍면동, 소지역)
			if(($statsMeMap.ui.mapType == "color" || $statsMeMap.ui.mapType == "bubble") && ($statsMeMap.ui.mapRegion == "sido" || $statsMeMap.ui.mapRegion == "sgg" || $statsMeMap.ui.mapRegion == "emdong" || $statsMeMap.ui.mapRegion == "totreg")) {
				//지역 변경
				$statsMeMap.ui.getCenterToAdmCd($statsMeMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) return;

					var lv_from_sido_cd = $("#statsMePopupArea_sido").val();
					var lv_from_sgg_cd = $("#statsMePopupArea_sgg").val();
					var lv_from_emdong_cd = $("#statsMePopupArea_emdong").val();
					var lv_to_sido_cd = res.result.sido_cd;
					var lv_to_sgg_cd = res.result.sgg_cd;
					var lv_to_emdong_cd = res.result.emdong_cd;
					var lv_sido_change_yn = "N";
					var lv_sgg_change_yn = "N";
					var lv_emdong_change_yn = "N";
					// 생활환경 종합 지도 영역 이동에 따른 해당 위치 값 저장
					$statsMeMap.ui.my_sido_cd = res.result.sido_cd;
					$statsMeMap.ui.my_sgg_cd = res.result.sgg_cd;
					$statsMeMap.ui.my_emdong_cd = res.result.emdong_cd;

					if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";

					if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
						//접속지역 변경
						//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
						//$("#statsMePopupArea_sido").val(res.result.sido_cd);
						$statsMeMap.ui.getAreaSido(res.result.sido_cd);
						$statsMeMap.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
						$statsMeMap.ui.getAreaEmdong(res.result.sido_cd, res.result.sgg_cd, res.result.emdong_cd);

						//텍스트 변경
						$statsMeMap.ui.setPositionText();
					}

					//지도 조회
					//변수
					var lv_data = $statsMeMap.ui.mapData.data;
					var lv_zoom = $statsMeMap.ui.map.zoom;
					//전국
					if(lv_zoom <= 1 && lv_data.sido_disp_yn == "Y") {
						//이미 같은 전국이면 조회 안함
						if($statsMeMap.ui.mapRegion != "sido") {
							//전국 조회
							$statsMeMap.ui.drawMapData("sido");
						}
					}
					//시도
					else if (lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn == "Y") {
						//이미 같은 전국이면 조회 안함
						if($statsMeMap.ui.mapRegion != "sido") {
							//전국 조회
							$statsMeMap.ui.drawMapData("sido");
						}
					}
					//시군구
					else if (
						(lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn != "Y" && lv_data.sgg_disp_yn == "Y")
						|| (lv_zoom > 3 && lv_zoom <= 5 && lv_data.sgg_disp_yn == "Y")
					) {
						//이미 같은 시군구이면 조회 안함
						if(!($statsMeMap.ui.mapRegion == "sgg" && lv_sido_change_yn == "N")) {
							//시군구 조회
							$statsMeMap.ui.drawMapData("sgg");
						}
					}
					//읍면동
					else if (
						(lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn != "Y" && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn == "Y")
						|| (lv_zoom > 3 && lv_zoom <= 5 && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn == "Y")
						|| (lv_zoom > 5 && lv_zoom <= 8 && lv_data.emdong_disp_yn == "Y")
					) {
						//이미 같은 읍면동이면 조회 안함
						if(!($statsMeMap.ui.mapRegion == "emdong" && lv_sgg_change_yn == "N")) {
							//읍면동 조회
							$statsMeMap.ui.drawMapData("emdong");
						}
					}
					//소지역
					else if (
						(lv_zoom > 1 && lv_zoom <= 3 && lv_data.sido_disp_yn != "Y" && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn != "Y" && lv_data.tot_reg_disp_yn == "Y")
						|| (lv_zoom > 3 && lv_zoom <= 5 && lv_data.sgg_disp_yn != "Y" && lv_data.emdong_disp_yn != "Y" && lv_data.tot_reg_disp_yn == "Y")
						|| (lv_zoom > 5 && lv_zoom <= 8 && lv_data.emdong_disp_yn != "Y" && lv_data.tot_reg_disp_yn == "Y")
						|| (lv_zoom > 8 && lv_data.tot_reg_disp_yn == "Y")
					) {
						//이미 같은 읍면동이면 조회 안함
						if(!($statsMeMap.ui.mapRegion == "totreg" && lv_emdong_change_yn == "N")) {
							//소지역 조회
							$statsMeMap.ui.drawMapData("totreg");
						}
					}
				});
			}
			//열지도
			else if($statsMeMap.ui.mapType == "heat") {
				//지역 변경
				$statsMeMap.ui.getCenterToAdmCd($statsMeMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) return;

					//데이터
					var lv_data = $statsMeMap.ui.mapData.data;

					//지역변수
					var lv_from_sido_cd = $("#statsMePopupArea_sido").val();
					var lv_from_sgg_cd = $("#statsMePopupArea_sgg").val();
					var lv_from_emdong_cd = $("#statsMePopupArea_emdong").val();
					var lv_to_sido_cd = res.result.sido_cd;
					var lv_to_sgg_cd = res.result.sgg_cd;
					var lv_to_emdong_cd = res.result.emdong_cd;
					var lv_sido_change_yn = "N";
					var lv_sgg_change_yn = "N";
					var lv_emdong_change_yn = "N";
					// 생활환경 종합 지도 영역 이동에 따른 해당 위치 값 저장
					$statsMeMap.ui.my_sido_cd = res.result.sido_cd;
					$statsMeMap.ui.my_sgg_cd = res.result.sgg_cd;
					$statsMeMap.ui.my_emdong_cd = res.result.emdong_cd;

					if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";

					if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
						//접속지역 변경
						//2020-02-13 [김남민] 관심지역 행정구역이 사라지는 현상이 있습니다.
						$statsMePopup.ui.getAreaSido(res.result.sido_cd);
						$statsMePopup.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
						$statsMePopup.ui.getAreaEmdong(res.result.sido_cd, res.result.sgg_cd, res.result.emdong_cd);

						//텍스트 변경
						$statsMeMap.ui.setPositionText();
					}

					//열지도 구분 (N : 격자 /Y : 지역)
					var lv_adm_yn = "N";

					//통계주제도
					if(lv_data.menu_nm == "통계주제도") {
						lv_adm_yn = "N";
					}
					//업종통계지도: 생활업종통계지도 > 개업현황
					else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "개업현황") {
						lv_adm_yn = "Y";
					}
					//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화
					else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "업종 밀집도 변화") {
						lv_adm_yn = "Y";
					}

					//열지도 (격자 100k)
					if(lv_adm_yn == "N" && $statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.map.curPolygonCode == "1") {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if(lv_data.sido_disp_yn == "Y") {
							$statsMeMap.ui.drawMapData("sido", "heat");
						}
						else {
							$statsMeMap.ui.drawMapData(null, "heat");
						}
					}
					//열지도 (격자 10k)
					else if(lv_adm_yn == "N" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.map.curPolygonCode == "2") {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if(lv_data.sido_disp_yn == "Y") {
							$statsMeMap.ui.drawMapData("sido", "heat");
						}
						else {
							$statsMeMap.ui.drawMapData(null, "heat");
						}
					}
					//열지도 (격자 1k)
					else if(lv_adm_yn == "N" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.map.curPolygonCode == "3") {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if(lv_data.sgg_disp_yn == "Y") {
							$statsMeMap.ui.drawMapData("sgg", "heat");
						}
						else {
							$statsMeMap.ui.drawMapData(null, "heat");
						}
					}
					//열지도 (격자 100m)
					else if(lv_adm_yn == "N" && ($statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5") && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5")) {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						if($statsMeMap.ui.map.curPolygonCode == "4") {
							if(lv_data.emdong_disp_yn == "Y") {
								$statsMeMap.ui.drawMapData("emdong", "heat");
							}
							else {
								$statsMeMap.ui.drawMapData(null, "heat");
							}
						}
						else {
							if(lv_data.tot_reg_disp_yn == "Y") {
								$statsMeMap.ui.drawMapData("totreg", "heat");
							}
							else {
								$statsMeMap.ui.drawMapData(null, "heat");
							}
						}
					}
					//열지도 (시도) (1,2)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sido", "heat");
					}
					//열지도 (시군구) (3)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_adm_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "Y" && (lv_sido_change_yn == "Y" || $statsMeMap.ui.heatMapPolygonCode != "3") && $statsMeMap.ui.map.curPolygonCode == "3")
						|| (lv_adm_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sgg", "heat");
					}
					//열지도 (읍면동) (4)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_adm_yn == "Y" && lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || $statsMeMap.ui.heatMapPolygonCode != "4") && $statsMeMap.ui.map.curPolygonCode == "4")
						|| (lv_adm_yn == "Y" && lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "N" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("emdong", "heat");
					}
					//열지도 (소지역) (5)
					else if(
						(lv_adm_yn == "Y" && lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "1" && $statsMeMap.ui.heatMapPolygonCode != "2" && $statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "3" && $statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_adm_yn == "Y" && lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.heatMapPolygonCode != "4" && $statsMeMap.ui.heatMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_adm_yn == "Y" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || $statsMeMap.ui.heatMapPolygonCode != "5") && $statsMeMap.ui.map.curPolygonCode == "5")
					) {
						$statsMeMap.ui.heatMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("totreg", "heat");
					}
				});
			}
			//POI
			else if($statsMeMap.ui.mapType == "poi") {
				//지역 변경
				$statsMeMap.ui.getCenterToAdmCd($statsMeMap.ui.map.gMap.getCenter(), function(res) {
					if(res.result == undefined) return;

					//데이터
					var lv_data = $statsMeMap.ui.mapData.data;

					//지역변수
					var lv_from_sido_cd = $("#statsMePopupArea_sido").val();
					var lv_from_sgg_cd = $("#statsMePopupArea_sgg").val();
					var lv_from_emdong_cd = $("#statsMePopupArea_emdong").val();
					var lv_to_sido_cd = res.result.sido_cd;
					var lv_to_sgg_cd = res.result.sgg_cd;
					var lv_to_emdong_cd = res.result.emdong_cd;
					var lv_sido_change_yn = "N";
					var lv_sgg_change_yn = "N";
					var lv_emdong_change_yn = "N";
					// 생활환경 종합 지도 영역 이동에 따른 해당 위치 값 저장
					$statsMeMap.ui.my_sido_cd = res.result.sido_cd;
					$statsMeMap.ui.my_sgg_cd = res.result.sgg_cd;
					$statsMeMap.ui.my_emdong_cd = res.result.emdong_cd;

					if(lv_from_sido_cd != lv_to_sido_cd) lv_sido_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd) lv_sgg_change_yn = "Y";
					if(lv_from_sido_cd != lv_to_sido_cd || lv_from_sgg_cd != lv_to_sgg_cd || lv_from_emdong_cd != lv_to_emdong_cd) lv_emdong_change_yn = "Y";

					if(lv_sido_change_yn == "Y" || lv_sgg_change_yn == "Y" || lv_emdong_change_yn == "Y") {
						//접속지역 변경
						$statsMeMap.ui.getAreaSido(res.result.sido_cd);
						$statsMeMap.ui.getAreaSgg(res.result.sido_cd, res.result.sgg_cd);
						$statsMeMap.ui.getAreaEmdong(res.result.sido_cd, res.result.sgg_cd, res.result.emdong_cd);

						//텍스트 변경
						$statsMeMap.ui.setPositionText();
					}

					//POI 시도 (1,2)
					if(
						(lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5") && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sido", "poi");
					}
					//POI 시군구 (3)
					else if(
						(lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3"))
						|| (lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "Y" && (lv_sido_change_yn == "Y" || $statsMeMap.ui.poiMapPolygonCode != "3") && $statsMeMap.ui.map.curPolygonCode == "3")
						|| (lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "N" && (lv_sido_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("sgg", "poi");
					}
					//POI 읍면동 (4)
					else if(
						(lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4"))
						|| (lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "Y" && (lv_sgg_change_yn == "Y" || $statsMeMap.ui.poiMapPolygonCode != "4") && $statsMeMap.ui.map.curPolygonCode == "4")
						|| (lv_data.emdong_disp_yn == "Y" && lv_data.tot_reg_disp_yn == "N" && (lv_sgg_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
					) {
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("emdong", "poi");
					}
					//POI 소지역 (5)
					else if(
						(lv_data.sido_disp_yn == "N" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "1" && $statsMeMap.ui.poiMapPolygonCode != "2" && $statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "1" || $statsMeMap.ui.map.curPolygonCode == "2" || $statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "N" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "3" && $statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "3" || $statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_data.sido_disp_yn == "Y" && lv_data.sgg_disp_yn == "Y" && lv_data.emdong_disp_yn == "N" && lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || ($statsMeMap.ui.poiMapPolygonCode != "4" && $statsMeMap.ui.poiMapPolygonCode != "5")) && ($statsMeMap.ui.map.curPolygonCode == "4" || $statsMeMap.ui.map.curPolygonCode == "5"))
						|| (lv_data.tot_reg_disp_yn == "Y" && (lv_emdong_change_yn == "Y" || $statsMeMap.ui.poiMapPolygonCode != "5") && $statsMeMap.ui.map.curPolygonCode == "5")
					) {
						$statsMeMap.ui.poiMapPolygonCode = $statsMeMap.ui.map.curPolygonCode;
						$statsMeMap.ui.drawMapData("totreg", "poi");
					}
				});
			}
		}
		// 줌 시작. createMap()에서 "zoomstart" 이벤트 선언시 콜백됨.
		,didMapZoomStart : function(event, map) {
			//console.log("didMapZoomStart - START");
		}
		// 줌 종료. createMap()에서 "zoomend" 이벤트 선언시 콜백됨.
		,didMapZoomEnd : function(event, map) {
			//console.log("didMapZoomEnd - START");
		}
		// 지도 드래그. createMap()에서 "drag" 이벤트 선언시 콜백됨.
		,didMapDrag : function(event, map) {
			//console.log("didMapDrag - START");
		}
		// 지도 드래그 종료. createMap()에서 "dragend" 이벤트 선언시 콜백됨.
		,didMapDragEnd : function(event, map) {
			//console.log("didMapDragEnd - START");
		},
		/**
		 *
		 * @name         : didMouseOverPolygon
		 * @description  : 해당경계 mouse over 시, 발생하는 콜백함수
		 * @date         : 2014. 10. 11.
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param event  : 이벤트정보
		 * @param data   : 해당 레이어 데이터정보
		 * @param type   : 일반경계 및 데이터경계 타입
		 */
		didMouseOverPolygon : function(event, data, type, map) {

			console.log("didMouseOverPolygon - START");

			if (type != "polygon") {
				if (type == "data") {
					if (data.info.length > 0) {
						map.legend.selectLegendRangeData(event.target.options.fillColor);
					}
				}
				$statsMeMap.ui.createInfoTooltip(event, data, type, map);
			}
			else {
				$statsMeMap.ui.createInfoTooltip(event, data, type, map);
			}
		}
	};

	$statsMeMap.util = {
		/**
		 * 숫자에 천단위 콤마추가 및 꼬리말 추가
		 */
		addComma : function (pNumberString, pTrailer) {
			if (pNumberString == undefined) {
				return "";
			}

			var parts = pNumberString.toString().split(".");
			var str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

		    if (typeof pTrailer != 'undefined') {
		    	str += pTrailer;
		    }

		    return str;
		}
	};

	$statsMeMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2019.06.25
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {

			var body = $("body");

			//지역선택 팝업 닫기
			body.on("click", "#statsMePopupArea_close", function() {
				$("#statsMePopupArea").hide();
				$('.popBack').hide();
				/*$("#statsMe_popup_back").parent().hide();	// 팝업 배경 숨김
*/			});

			// 관심지역 팝업 배경 클릭 이벤트
/*			 $("body").on("click", "#statsMe_popup_back", function(){
		         $("#statsMePopupArea").hide();
		         $("#statsMe_popup_back").parent().hide();	// 팝업 배경 숨김
		     });*/
	         $("body").on("click", "#common_popup_back", function(){
	        	 $("#statsMePopupArea").hide();
	        	 $('.popBack').hide();
	         });

	         $("body").on("click", "#common_popup_area_close", function(){
//	        	 $("#statsMePopupArea").hide();
	        	 $("#common_popup_area").hide();
	        	 $('.popBack').hide();
	         });

			//지역선택 팝업 확인
			body.on("click", "#statsMePopupArea_ok", function() {
				$("#statsMePopupArea").hide();
				$('.popBack').hide();
				/*$("#statsMe_popup_back").parent().hide();	// 팝업 배경 숨김
*/				$statsMeMap.ui.setArea("ok");

				/** 2020.09.16[한광희] 관심지역 이동 후 생활환경 종합 처리를 위한 수정 START */
				$statsMeMap.ui.my_sido_cd = $("#statsMePopupArea_sido option:checked").val();
				$statsMeMap.ui.my_sgg_cd = $("#statsMePopupArea_sgg option:checked").val();
				$statsMeMap.ui.my_emdong_cd = $("#statsMePopupArea_emdong option:checked").val();
				/** 2020.09.16[한광희] 관심지역 이동 후 생활환경 종합 처리를 위한 수정 END */
				
				//2022-10-12 [송은미] text 수정
				/*$('#statsMeMapMapArea').text($("#statsMePopupArea_sido option:checked").text() +" "+ $("#statsMePopupArea_sgg option:checked").text() +" "+ $("#statsMePopupArea_emdong option:checked").text());*/
				$('#statsMeMapMyLocation_name').text($("#statsMePopupArea_sido option:checked").text() +" > "+ $("#statsMePopupArea_sgg option:checked").text() +" > "+ $("#statsMePopupArea_emdong option:checked").text());

			});

			// 지도 확대
			body.on("click", "#statsMeMapMap a.rightQuick.rq03", function() {
				var that = $statsMeMap.ui;
				if (!that.map.isFixedBound) {
					that.map.gMap.zoomIn(1);
				}
			});

			// 지도 축소
			body.on("click", "#statsMeMapMap a.rightQuick.rq05", function() {
				var that = $statsMeMap.ui;
				if (!that.map.isFixedBound) {
					that.map.gMap.zoomOut(1);
				}
			});

			//지역선택 팝업 시도 변경
			body.on("change", "#statsMePopupArea_sido", function() {
				var lv_sido_cd = $("#statsMePopupArea_sido").val();
				$statsMeMap.ui.getAreaSgg(lv_sido_cd);
				$statsMeMap.ui.getAreaEmdong(lv_sido_cd, $("#statsMePopupArea_sgg").val());
			});

			//지역선택 팝업 시군구 변경
			body.on("change", "#statsMePopupArea_sgg", function() {
				var lv_sido_cd = $("#statsMePopupArea_sido").val();
				var lv_sgg_cd = $("#statsMePopupArea_sgg").val();
				$statsMeMap.ui.getAreaEmdong(lv_sido_cd, lv_sgg_cd);
			});

			// 데이터보드 숨기기
			body.on("click", "#dataBoardCloseBtn", function() {
				$("#statsSelectDiv2").hide();
			});

			// 통게지리정보 목록 위아래 스와이프 펼치기/접기.
	         $(".nav-2022 .leftCol span").swipe({
	        /*	 $(".statsMeMainListbox").swipe({*/
	            threshold : 10,
	            //펼치기
	            swipeUp:function(event, direction) {
	            	$statsMeMap.ui.statsMeListPopupToggle(true);
	            },
	            //접기
	            swipeDown:function(event, direction) {
	            	$statsMeMap.ui.statsMeListPopupToggle(false);
	            },
	            //클릭
	            tap:function(event, target) {
	            	if($("#statsMeListDiv").css("display") == "block"){
	            		$statsMeMap.ui.statsMeListPopupToggle(false);
		            } else {
		            	$statsMeMap.ui.statsMeListPopupToggle(true);
		            }
	            }
	         });

	         // 지역설정       selectArea
	         /*body.on("click", "#selectArea", function() {	 
					console.log("selectArea!!!!");				
					$('#statsMePopupArea').show();
					$("#statsMe_popup_back").parent().show();	// 팝업 배경
	         });*/
	         body.on("click", "#statsMeMapMyLocation_name", function() {
				console.log("selectArea!!!!");
				$('.popBack').show();
				$('#statsMePopupArea').show(); //2022-10-11 [송은미] 이전 관심지역팝업 숨김
	         });

	       //내 위치 텍스트
	        var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
			$("#statsMeMapMyLocation_name").html($statsMeMap.ui.my_sido_nm+ svg +$statsMeMap.ui.my_sgg_nm+ svg +$statsMeMap.ui.my_emdong_nm);

	         // 범례 이미지 클릭 이벤트
	         body.on("click", "#btnrvTotletop", function() {
	        	 	srvLogWrite('O0', '51', '05', '01', '', '');
					console.log("btnrvTotletop!!!!");

					if ($('#dataRemarks').css('visibility') == 'hidden'){
						$('#dataRemarks').css('visibility', 'visible');

						// 색상
						if($('#statsMeMapMapType').find('li.on').attr("id") == "statsMeMapMapType_color") {
							$("#dataRemarks").attr("style", "top:-320px; visibility: visible;"); // 레이아웃 변경으로 인한 범례 위치 조정
							// 범례
							$('#dataRemarksColor').show();
							$('#dataRemarkBubble').hide();
							$('#dataRemarkHeat').hide();
						}
						// 버블
						else if($('#statsMeMapMapType').find('li.on').attr("id") == "statsMeMapMapType_bubble") {
							$("#dataRemarks").attr("style", "top:-320px; visibility: visible;"); // 레이아웃 변경으로 인한 범례 위치 조정
							// 범례
							$('#dataRemarksColor').hide();
							$('#dataRemarkBubble').show();
							$('#dataRemarkHeat').hide();
						}
						// 열지도
						else if($('#statsMeMapMapType').find('li.on').attr("id") == "statsMeMapMapType_heat") {
							$("#dataRemarks").attr("style", "top:-260px; visibility: visible;");
							// 범례
							$('#dataRemarksColor').hide();
							$('#dataRemarkBubble').hide();
							$('#dataRemarkHeat').show();
						}
						// POI
						else if($('#statsMeMapMapType').find('li.on').attr("id") == "statsMeMapMapType_poi") {
							$("#dataRemarks").attr("style", "top:-115px; visibility: visible;");
							// 범례
							$('#dataRemarksColor').hide();
							$('#dataRemarkBubble').hide();
							$('#dataRemarkHeat').hide();
						}
					}
					else{
						$('#dataRemarks').css('visibility', 'hidden');
					}
			});


	      // 지도유형 색상지도표출여부
			body.on("click", "#statsMeMapMapType_color", function() {
				$("#dataRemarks").attr("style", "top:-320px; visibility: visible;");	// 범례 위치 조정
				$("[id^='statsMeMapMapType_']").find("a").removeClass("on");

				if($statsMeMap.ui.mapType != "color" && $statsMeMap.ui.mapType != "bubble") {
					$statsMeMap.ui.mapFirstMoveYn = "Y";
				}
				$statsMeMap.ui.drawMapData(null, "color");

				// 범례
				$('#dataRemarksColor').show();
				$('#dataRemarkBubble').hide();
				$('#dataRemarkHeat').hide();
			});

			// 지도유형 버블지도표출여부
			body.on("click", "#statsMeMapMapType_bubble", function() {
				$("#dataRemarks").attr("style", "top:-309px; visibility: visible;");	// 범례 위치 조정
				$("[id^='statsMeMapMapType_']").find("a").removeClass("on");

				if($statsMeMap.ui.mapType != "color" && $statsMeMap.ui.mapType != "bubble") {
					$statsMeMap.ui.mapFirstMoveYn = "Y";
				}
				$statsMeMap.ui.drawMapData(null, "bubble");

				// 범례
				$('#dataRemarksColor').hide();
				$('#dataRemarkBubble').show();
				$('#dataRemarkHeat').hide();
			});

			// 지도유형 열지도표출여부
			body.on("click", "#statsMeMapMapType_heat", function() {
				$("#dataRemarks").attr("style", "top:-260px; visibility: visible;");	// 범례 위치 조정

				$("[id^='statsMeMapMapType_']").find("a").removeClass("on");

				if($statsMeMap.ui.mapType != "heat") {
					$statsMeMap.ui.mapFirstMoveYn = "Y";
					$statsMeMap.ui.drawMapData(null, "heat");
				}

				// 범례
				$('#dataRemarksColor').hide();
				$('#dataRemarkBubble').hide();
				$('#dataRemarkHeat').show();
			});

			// 지도유형 POI지도표출여부
			body.on("click", "#statsMeMapMapType_poi", function() {
				$("#dataRemarks").attr("style", "top:-115px; visibility: visible;");	// 범례 위치 조정

				$("[id^='statsMeMapMapType_']").find("a").removeClass("on");

				if($statsMeMap.ui.mapType != "poi") {
					var lv_data = $statsMeMap.ui.mapData.data;
					var lv_map_region = $statsMeMap.ui.mapRegion;
					//업종통계지도: 생활업종통계지도 > 개업현황 (시도, 시군구 제외)
					if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "개업현황"
						&& (lv_map_region == "sido" || lv_map_region == "sgg")
					) {
						$statsMeMap.ui.mapFirstMoveYn = "Y";
						$statsMeMap.ui.drawMapData("emdong", "poi");
					}
					//업종통계지도: 생활업종통계지도 > 업종 밀집도 변화 (시도, 시군구, 읍면동 제외)
					else if(lv_data.menu_nm == "업종통계지도: 생활업종통계지도" && lv_data.srv_nm == "업종 밀집도 변화"
						&& (lv_map_region == "sido" || lv_map_region == "sgg" || lv_map_region == "emdong")
					) {
						$statsMeMap.ui.mapFirstMoveYn = "Y";
						$statsMeMap.ui.drawMapData("totreg", "poi");
					}
					else {
						$statsMeMap.ui.mapFirstMoveYn = "Y";
						$statsMeMap.ui.drawMapData(null, "poi");
					}
				}

				// 범례
				$('#dataRemarksColor').hide();
				$('#dataRemarkBubble').hide();
				$('#dataRemarkHeat').hide();
			});

			// 지도유형 격자(100m)
			body.on("click", "#statsMeMapMapType_100m", function() {

				$("[id^='statsMeMapMapType_']").find("a").removeClass("on");

				$statsMeMap.ui.drawMapData("100m");

				// 범례
				$('#dataRemarksColor').hide();
				$('#dataRemarkBubble').hide();
				$('#dataRemarkHeat').hide();
			});


			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $statsMeMap.ui.my_sido_cd, $statsMeMap.ui.my_sgg_cd, "");
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

			//현재위치로 이동 버튼
			$(document).on("click", "#myNeighberhoodJobMyLocation", function() {

				//위치동의 팝업 호출
				statsMe_location();
			});

			// 범례 닫기 버튼 이벤트
			$("body").on("click", "#dataRemarks_close", function(){
				$("#dataRemarks").hide();
			});

			// 생애주기 선택
			$("body").on("click", "a[name='mainLfeCycle']", function(){
				srvLogWrite('O0', '03', '02', '00', $(this).text(), '');
				$statsMeMap.ui.statsMeListPagingIndex = 1	// 2020.09.16[한광희] 목록 조회 페이징 처리를 위한 값 초기화
				$statsMeMap.ui.LifeCycleClick($(this).attr("id"), $(this).text());
			});

			// 관심분야 선택
			$("body").on("click", "a[name='mainStatDistance']", function(){
				srvLogWrite('O0', '03', '03', '00', $(this).text(), '');
				$statsMeMap.ui.statsMeListPagingIndex = 1	// 2020.09.16[한광희] 목록 조회 페이징 처리를 위한 값 초기화
				$statsMeMap.ui.InterestRealmClick($(this).attr("id"), $(this).text());
			});

			// 이전버튼 클릭
			$("body").on("click", "#stastMeListPopup_close", function(){
				$statsMeMap.ui.statsMeListPopupToggle(false);
				$(".nav-2022 .leftCol span").removeClass("active");
			});

			// 정렬 변경 이벤트
			$("body").on("change", "#selectStatMeCatalogSorting", function() {
                $statsMeMap.ui.statsMeListPagingIndex = 1	// 2020.09.16[한광희] 목록 조회 페이징 처리를 위한 값 초기화
				var orderType = $("#selectStatMeCatalogSorting option:selected").val();
				$statsMeMap.ui.searchStatsGrphInfo(orderType);
			});

			// 결과내 검색
			$("body").on("click", "#searchKwrd", function(){
				srvLogWrite('O0', '03', '04', '00', $("#statsMeCatalogKwrd").val(), '');
				$statsMeMap.ui.statsMeListPagingIndex = 1	// 2020.09.16[한광희] 목록 조회 페이징 처리를 위한 값 초기화
				$statsMeMap.ui.kwrdSearch();
			});
			//[2022.09.01] 조규환 검색 엔터 이벤트 추가
			$("body").on("keydown", ".search-result", function(key){
				if(key.keyCode == 13) { //키의 코드가 13번일 경우 실행 (13번은 엔터키)
					srvLogWrite('O0', '03', '04', '00', $("#statsMeCatalogKwrd").val(), '');
					$statsMeMap.ui.statsMeListPagingIndex = 1
					$statsMeMap.ui.kwrdSearch();
				}
			});

			/** 2020.09.16[한광희] 페이징 추가 START */
			//통계지리 목록 스크롤
			$("#list_div").on("scroll", function() {
				//스크롤값 가져오기
				var lv_scroll_top = $("#list_div").scrollTop(),
					lv_scroll_height = $("#list_div").prop("scrollHeight"),
					lv_outer_height = $("#list_div").outerHeight();

				//페이징 처리
				if((lv_outer_height * 2) > (lv_scroll_height - lv_scroll_top)) {
					$statsMeMap.ui.statsMeListPagingIndex = $statsMeMap.ui.statsMeListPagingIndex+10
					if($statsMeMap.ui.statsMeListCount/$statsMeMap.ui.statsMeListPagingIndex > 1){
						$statsMeMap.ui.searchStatsGrphInfo($("#selectStatMeCatalogSorting option:selected").val());
					}
				}
			});
			/** 2020.09.16[한광희] 페이징 추가 START */
		},
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2019.06.25
		 * @author : 김남민
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($(".Wrap>.Header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}
	};

	/*********** 지도 데이터 조회 시작 **********/
	(function() {
		$class("sop.openApi.statsMe.statsMeMap.loadMapData").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				common_loading(false); // 로딩바 숨김
				if(res.errCd == "0") {
					//지도 Legend 초기화
					$statsMeMap.ui.map.legend.legendInit();
					$statsMeMap.ui.map.legend.isNegative = false;
					$statsMeMap.ui.map.legend.isNegativeColorShow = true;

					//데이터 전역변수 입력
					$statsMeMap.ui.mapData = res.result;

					//대화형 통계지도 > e-지방지표
					var lv_data = $statsMeMap.ui.mapData.data;
					if(lv_data != undefined && lv_data != null && lv_data.menu_nm == "대화형 통계지도" && lv_data.srv_nm == "e-지방지표") {
						var lv_stat_data_id = lv_data.stat_data_id;
						if($statsMeMap.ui.ecountryMapping[lv_stat_data_id] != undefined && $statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value_yn != "Y") {
							//URL 변수 선언
							var lv_url = contextPath + "/view/ecountry/getItem.json";

							//URL 파라미터 세팅
							lv_url += "?tbl_id="+$statsMeMap.ui.ecountryMapping[lv_stat_data_id].tbl_id;

							// ajax 시작
							$.ajax({
							    url: lv_url,
							    type: 'get',
							    async: false
							}).done(function (res) { // 완료
								var periodlist = res.result.periodlist;
								if(periodlist != undefined && periodlist != null && periodlist.length > 0) {
									for(var i = 0; i < periodlist.length; i++) {
										var prd_id = periodlist[i].prd_id;
										var prid_list = res.result.periodvalue[prd_id];
										if(prid_list != undefined && prid_list != null && prid_list.length > 0) {
											//prid_value 내림차순 정렬
											prid_list.sort(function(a, b) { // 내림차순
												return Number(a["prid_value"]) > Number(b["prid_value"]) ? -1 : Number(a["prid_value"]) < Number(b["prid_value"]) ? 1 : 0;
											});
											var prid_value = prid_list[0].prid_value;
											$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prd_id = prd_id;
											$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value = prid_value;
											$statsMeMap.ui.ecountryMapping[lv_stat_data_id].prid_value_yn = "Y";
										}
									}
								}
							});
							// ajax 끝
						}
					}

					if(lv_data.menu_nm == "정책통계지도") {
						$statsMeMap.ui.map.legend.legendType = "negative";
					}
					else {
						$statsMeMap.ui.map.legend.legendType = "auto";
					}

					//데이터 세팅
					if(lv_data != undefined && lv_data != null) {

						$statsMeMap.ui.setMapData();
						// 기본정보 설정
						$statsMeMap.ui.setBasicData();
						// 차드 설정 hshs
						$statsMeMap.ui.setChartData();
						// 표 데이터
						$statsMeMap.ui.setDataboardFromMap();
					}

					//메세지 있는 경우 띄움
					if(res.result.errCd != "0") {
						common_alert(res.result.errMsg);
					}

					common_loading(false); // 로딩바 숨김
				}else if(res.errCd == "-401") {
					common_alert(res.errMsg);
				}else{
					common_alert(res.errMsg);
				}
			},
			onFail: function(status) {
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 지도 데이터 조회 종료 **********/


	/*********** 센터의 집계구값 얻기 시작 **********/
	(function() {
		$class("sop.openApi.personal.findcodeinsmallarea.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				if(res.errCd == "0") {
					if(typeof options.callback === "function"){
						options.callback(res);
					}
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						options.target.getCenterToAdmCd(options.center,options.callback);
					});
				}
			},
			onFail: function(status) {
				$statsMeMap.ui.loading(false);
				common_loading(false); // 로딩바 숨김
				common_alert(errorMessage);
			}
		});
	}());
	/*********** 센터의 집계구값 얻기 종료 **********/

	/**
	 * @name : statsMe_location
	 * @description : 위치동의
	 * @date : 2020.09.11
	 * @author : 한광희
	 * @history :
	 * @param
	 */
	function statsMe_location(){
		//변수선언
		var my_lc_info_agree_yn = common_get_cookie("lc_info_agree_yn");
		var my_center = null;
		var my_x = null;
		var my_y = null;
		var my_sido_cd = "";
		var my_sido_nm = "";
		var my_sgg_cd = "";
		var my_sgg_nm = "";
		var my_emdong_cd = "";
		var my_emdong_nm = "";

		//위치동의 신규 또는 미동의.
		if(my_lc_info_agree_yn != "Y") {
			//팝업 표시
			$("#common_popup_back").parent().show();
			$("#common_popup_location").show();

			//버튼 이벤트 제거
			$("#common_popup_back").unbind();
			$("#common_popup_location_close").unbind();
			$("#common_popup_location_ok").unbind();
			$("#common_popup_location_cancel").unbind();	// 2020.09.02[한광희] 위치동의 허용안함 버튼 추가

			//닫기 버튼(위치미동의 처리)
			$("#common_popup_location_close").click(function() {
				srvLogWrite('O0', '52', '02', '00', 'ㅂ;허용', '');
				//팝업 숨김
				$("#common_popup_back").parent().hide();
				$("#common_popup_location").hide();

				//위치미동의 저장
				common_remove_cookie("lc_info_agree_yn"); // 쿠키

			});

			//허용 안함 버튼(위치미동의 처리)
			$("#common_popup_location_cancel").click(function() {
				srvLogWrite('O0', '52', '02', '00', '비허용', '');
				//팝업 숨김
				$("#common_popup_back").parent().hide();
				$("#common_popup_location").hide();

				//위치미동의 저장
				common_remove_cookie("lc_info_agree_yn"); // 쿠키

			});

			//동의버튼(위치동의 처리)
			$("#common_popup_location_ok").click(function() {
				srvLogWrite('O0', '52', '02', '00', '허용', '');
				//팝업 숨김
				$("#common_popup_back").parent().hide();
				$("#common_popup_location").hide();

				//위치동의 저장
				common_set_cookie("lc_info_agree_yn", "Y", 365); // 쿠키

				$statsMeMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {
					if(p_flag == true) {
						//변수 입력
						$statsMeMap.ui.my_x = p_center[0];
						$statsMeMap.ui.my_y = p_center[1];
						//지역조회
						$statsMeMap.ui.getCenterToAdmCd(p_center, function(res) {
							//변수 입력
							$statsMeMap.ui.my_location_yn = "Y";
							$statsMeMap.ui.my_sido_cd = res.result.sido_cd;
							$statsMeMap.ui.my_sido_nm = res.result.sido_nm;
							$statsMeMap.ui.my_sgg_cd = res.result.sgg_cd;
							$statsMeMap.ui.my_sgg_nm = res.result.sgg_nm;
							$statsMeMap.ui.my_emdong_cd = res.result.emdong_cd;
							$statsMeMap.ui.my_emdong_nm = res.result.emdong_nm;

							//내 위치 조회 후 콜백
							$statsMeMap.ui.getMyPositionCallback();
							// 내 위치 지도이동
							$statsMeMap.ui.map.mapMove([$statsMeMap.ui.my_x, $statsMeMap.ui.my_y], $statsMeMap.ui.map.zoom);
							// 내 위치 정보 조회
							$statsMeMap.ui.setArea("ok");
							
						});
					}
				});
			});
		}
		//기존에 위치동의 완료.
		else {
			srvLogWrite('O0', '52', '02', '00', '허용', '');
			$statsMeMap.ui.getCurrentLocation(function(p_center, p_flag, p_msg, p_msg2) {
				if(p_flag == true) {
					//변수 입력
					$statsMeMap.ui.my_x = p_center[0];
					$statsMeMap.ui.my_y = p_center[1];
					//지역조회
					$statsMeMap.ui.getCenterToAdmCd(p_center, function(res) {
						//변수 입력
						$statsMeMap.ui.my_location_yn = "Y";
						$statsMeMap.ui.my_sido_cd = res.result.sido_cd;
						$statsMeMap.ui.my_sido_nm = res.result.sido_nm;
						$statsMeMap.ui.my_sgg_cd = res.result.sgg_cd;
						$statsMeMap.ui.my_sgg_nm = res.result.sgg_nm;
						$statsMeMap.ui.my_emdong_cd = res.result.emdong_cd;
						$statsMeMap.ui.my_emdong_nm = res.result.emdong_nm;

						//내 위치 조회 후 콜백
						$statsMeMap.ui.getMyPositionCallback();
						// 내 위치 지도이동
						$statsMeMap.ui.map.mapMove([$statsMeMap.ui.my_x, $statsMeMap.ui.my_y], $statsMeMap.ui.map.zoom);
						// 내 위치 정보 조회
						$statsMeMap.ui.setArea("ok");
						
						//2022-10-11 [송은미] 내 위치 텍스트 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>'; // 2022.09.26 송은미 svg 추가
						$("#statsMeMapMyLocation_name").html($statsMeMap.ui.my_sido_nm+ svg +$statsMeMap.ui.my_sgg_nm+ svg +$statsMeMap.ui.my_emdong_nm);
					});
				}
			});
		}
	}
}(window, document));