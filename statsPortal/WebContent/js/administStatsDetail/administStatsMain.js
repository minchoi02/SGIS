/**
 * 행정통계시각화 상세보기 메인
 *
 * history :
 * 2021.08.04			행정통계시각화 상세보기 메인
 *
 *
 * author : hjh
 * version : 1.0
 * see :
 *
 */

//bndYear = "2018";

var widthArray = [];
var heightArray = [];

(function(W, D) {
	W.$administStatsMain = W.$administStatsMain || {};

	$(document).ready(function() {
		Highcharts.setOptions({
			chart : {
				style : {
					fontFamily : 'NanumSquare'
				}
			}
		});

		//$administStatsMain.ui.getMyPosition(); // 2020-11-30 [곽제욱] 위치동의 기능 삭제
		$administStatsMain.event.setUIEvent();

		$administStatsMain.ui.isThisBrowser = isBrowserCheck(); //20201014 박은식 현재 브라우저 체크
		if(gv_type != null && gv_type != ""){
			if(gv_year != null && gv_year != ""){
				$administStatsMain.ui.selectedYear = gv_year;
			}
		}
		if(gv_url == "detail") { // 2020-10-29 [곽제욱] 인구주택총조사 case 추가
			$administStatsMain.ui.changeMenu(0);
		} else if(gv_url == "newlyloc" || gv_url == "newly" || gv_url == "totPopulationloc") { // 2020-10-29 [곽제욱] 인구주택총조사 case 추가
			$administStatsMain.ui.changeMenu(1);
		} else if(gv_url == "house" || gv_url == "houseDashLoc"){ // 2020-10-29 [곽제욱] 각 대시보드 분기
			$administStatsMain.ui.changeMenu(2);
		} else if(gv_url == "middl" || gv_url == "middlDashLoc") { // 2020-10-29 [곽제욱] 각 대시보드 분기
			$administStatsMain.ui.changeMenu(3);
		} else if(gv_url == "retun" || gv_url == "retunDashLoc"  || gv_url == "totFarmloc") { // 2020-10-29 [곽제욱] 각 대시보드 분기
			$administStatsMain.ui.changeMenu(4);
		// 임업 대쉬보드 추가 2020-10-13 jhs START
		} else if(gv_url == "fishery" || gv_url == "fisheryDashLoc"){ // 2020-10-29 [곽제욱] 각 대시보드 분기
			$administStatsMain.ui.changeMenu(6);
		}
		//2022.05.20 조규환 통계더보기 > 일자리 행정통계(7), 퇴직연금통계(8), 임금근로 일자리동향(9) START  
		else if(gv_url == "more1"){
			$administStatsMain.ui.changeMenu(7);
		} else if(gv_url == "more2") {
			$administStatsMain.ui.changeMenu(8);
		} else if(gv_url == "more3") {
			$administStatsMain.ui.changeMenu(9);
		}
		//2022.05.20 조규환 통계더보기 END

		$(document).on("click", "#commonTotSurv_popup_confirm_close", function() {
			$("#commonTotSurv_popup_back").hide();
			$("#commonTotSurv_popup_confirm").hide();
		});
		$(document).on("click", "#commonTotSurv_popup_alert_close", function() {
			$("#commonTotSurv_popup_back").hide();
			$("#commonTotSurv_popup_alert").hide();
		});
		$(document).on("click", "#lifeEnvironment_close", function() {
			$("#commonTotSurv_popup_back").hide();
			$("#lifeEnvironment").hide();
		});
		$(document).on("click", "#commonTotSurv_popup_area_detail_close", function() {
			$("#commonTotSurv_popup_back").hide();
			$("#common_popup_area_click").hide();
		});
	});

	// 팝업창 위치 조정 및 배경 영역 조정을 위함
	$(window).scroll(function(){
		$administStatsMain.ui.scrollLeft = $(document).scrollLeft();
		$administStatsMain.ui.scrollTop = $(document).scrollTop();
	});

	$(window).resize( function() {
		//$administStatsMain.ui.resizeLayer(); 2020-12-08 [곽제욱] 주석처리
	});

	$administStatsMain.const = {
		ToolBarHeight : 34,			// 상단 툴바의 높이
		InteractiveBarHeight : 35,	// 상단 인터렉티브바의 높이
		ContentsX : 0,				// 컨텐츠영역 좌표 원점 X
		ContentsY : 105,			// 컨텐츠영역 좌표 원점 Y (105 : 헤더의 높이 / toolbar의 top)
		MapX : 0,					// 지도영역 좌표 원점 X
		MapY : 105 + 34 + 35,		// 지도영역 좌표 원점 Y
	},

	$administStatsMain.ui = {
		chart : [,,,],
		chartObjs : {},
		selectedYear : '', // 선택한 년도(인구의 경우 2018, 농총의 경우 2015)
		years : [], // 년도배열 추가
		leftSelectedYear : '',	   // 인구 시계열 (왼쪽 선택 년도)
		rigthSelectedYear : '',    // 인구 시계열 (오른쪽 선택 년도)
		selectedArea : '', // 선택한 지역 코드(인구의 경우 전 세계 인구외에는 전국부터 시작)
		selectedLevel : '0', // 현재 대쉬보드의 레벨(0 : 전세계, 1 : 전국, 2: 시도)
		selectedThema : '', // 선택한 주제(인구, 가구, 주택 등)
		loadByPage : true,					// 중메뉴 페이지별로 전체 로드할지 여부 (false: 1회 전체 로드후에 중메뉴별로 필요한 것만 로드)
		isDevTest : false,					// 청사 개발서버 테스트 버전인지 여부
		mainPopupEnabled : false,			// 메인 팝업 화면 활성화 여부
		defaultMenuIndex : 0,				// 초기 화면 (0: 인구주택행정통계 ~ 6: 시계열)
		tilePerColor : new Array(), // 타일맵을 나누기 위한 구분
		tempColor : '', // 타일맵 mouseOver, out 이벤트를 위한 변수
		chartTempColor : '', // 타일맵 선택시 임시 색깔
		tileChangeYn : 'Y', // 타일맵 변동여부
		yearChangeYn : 'N', // 연도 변동여부
		sidoMaxRank : 0,
		atdrcRank : 0,
		sggEmdongMaxRank : 0,
		pageIndex : 0, //20200915 박은식 현재 페이지
		timeTotPopulationYear : '2018',
		// 메인 프레임의 크기
		//   - 레이어, 팝업창 띄울때 위치의 기준으로 참고한다.
		//   - border 포함된 크기임.
		//   - 레이어 위치 샘플 : 지도상의 좌상단(0, 0)에 띄우고자 하는 경우 좌표는
		//                  (menuBarWidth, toolBarHeight + interactiveBarHeight)
		coordX : 0,							// 컨텐츠영역 내부 좌표 원점 X : menuBarWidth  (variable)
		coordY : 70,						// 컨텐츠영역 내부 좌표 원점 Y : toolBarHeight + interactiveBarHeight

		// 화면에서 스크롤 위치
		//   - 팝업창 위치 조정 및 배경 영역 조정을 위함
		//   - 스크롤 이벤트 발생시 업데이트된다.
		scrollLeft : 0,
		scrollTop : 0,

		prevIndex : null,					// 이전에 선택됐던 메뉴 인덱스  : 메뉴  변경시 리셋을 위함
		currentIndex : null,				// 현재 메뉴 인덱스
		isSetUIEventArr :
			[false, false, false, false, false, false, false, false, false, false, false, false, false],	// 메뉴별로 처음 이벤트 바인딩을 처리했는지 여부, 2020-10-22 [곽제욱] 농업,임업,어업 플래그 추가, 2020-11-26 [곽제욱] 시계열 플래그 추가
//		isSetUIEvent : false,				// 메뉴별로 처음 이벤트 바인딩을 처리했는지 여부 / 메뉴가 변경될때마다
		isSetCallbackArr : [],
		numberOfContentToLoad : 0,			// 로드해야 할 컨텐트(레이어,팝업,메뉴 등) 갯수 : 로드 완료 체크를 위함
		changeMenuFinished : false,			// changeMenu() 함수 처리가 모두 완료됐는지 여부
//		mapLoaded :
//			[false, false, false, false],	// 맵을 로드했는지

		// 내위치 정보 : 최초 일자리 맵 서비스 들어올때 한번만 설정한다. / 메뉴 클릭시 여러번 호출하는 경우 취득이 안되는 경우가 종종 발생한다.
		mySidoCd : '25',					// 내위치 시도 코드 : 11:서울특별시, 21:부산광역시, 25:대전광역시
		mySggCd : '030',					// 내위치 시군구 코드: 030: 대전시 서구, 070: 부산시 남구
		myEmDongCd : '',					// 내위치 읍면동 코드
		mySidoNm : '대전광역시',	 		// 내위치 시도 이름
		mySggNm : '서구',					// 내위치 시군구 이름
		myEmDongNm : '',					// 내위치 읍면동 이름
		toolTipToggle : "N", // 2020-10-29 [곽제욱] 툴팁 토글 변수 추가

		areaSidoData : {}, 		// 시도 목록 저장
		areaSggData : {}, 		// 시군구 목록 저장
		areaEmdongData : {}, 	// 읍면동 목록 저장

		scrollOptions : {},					// 스크롤 레이어에 대한 옵션 모음 (각 레이어의 $(Element)가 Key)

		getMyPositionCallback : null,		// getMyPosition() 함수에 대한 콜백함수 (비동기처리라 설정후에 마지막에 사용하기 위함)

		selectedLayer : null,				// 현재 선택된 레이어의 selector

		consoleLogEnabled : false,			// 콘솔 로그를 기록할지 여부 / 디버그 용도로 로컬에서만 true로 사용

		//202011012 박은식 지도 줌 데이터 START
		zoomUpRegion : ['21','31370','31100','31250','31230','31130','31220','31260','31380','31280', // 111
						'31350','31190','31210','31200','31070','31270',"38110","23010","23310","23320",
						"38070","38030","38100","38090","38050","38060","38080","38320","38330","38390",
						"38340","38360","38400","38380","38370","38350","38310","37012","37011","37050",
						"37100","37020","37030","37390","37060","37070","37080","37090","37400","37420",
						"37380","37360","37350","37330","37370","37310","37340","22310","34010","34011",
						"34040","34050","34080","34060","34020","34370","34330","34360","34030","34310",
						"34340","34350","35030","35020","35040","35310","35060","35050","35370","35380",
						"35360","35350","35320","35330","35340","36","36020","36030","36060","36040",
						"36420","36400","36350","36370","36410","31380","36310","36450","36360","36380",
						"36320","36330","33041","33020","33030","33370","33350","33330","33340","33360",
						"33320","33380","32020","32010","32030","32320","32350","32390","32400","32370",
						"32410","32380","26310","29010", "31090"],
		zoomDownRegion : ['31012','31110','31060','31120','31160','31192','31042','31041','31050','31193',
						  '31014','31140','31103','31104','31011','31191','31013',"23060","23090","23020",
						  "22030","22040","24020","24010","26010","26030","11010","11020","11030","11040",
						  "11050","11060","11070","11080","11090","11100","11110","11120","11130","11140",
						  "11150","11160","11170","11180","11190","11200","11210","11220","11230","11240",
						  "11250","21020","21040","21050","21060","21070","21080","21090","21100","21110",
						  "21130","21150"],
		zoomDoubleUpRegion : ['31240',"37010","37040","37320","37410","34380","36460","36480","36470","33040",
							  "32070","32310","32360","32340","32330","39010","39020"],
		zoomDoubleDownRegion : ["21140","21030","21010","22010"], //20201015 박은식 오타수정
		//202011012 박은식 지도 줌 데이터 END

		isThisBrowser : "", //20201014 박은식 현재 접속한 브라우저 체크

		//20201014 박은식 지도 하이라이트 이동시 클릭한 차트 정보 하이라이트 이동 시 저장 할 변수 선언 STRAT
		chartTarget : "",
		chartIndex : "",
		chartData : "",
		chartColor : "",
		chartTitle : "",
		detailCanvas : "",  //20201027 주형식 이미지 캡쳐한 데이터(base64) 저장 변수

		loadingBar : new sop.portal.absAPI(), // 2020-10-14 [곽제욱] 로딩바 추가
		//20201014 박은식 지도 하이라이트 이동시 클릭한 차트 정보 하이라이트 이동 시 저장 할 변수 선언 END

		isDashPopup : null,			// 2020-11-02  주형식 대쉬 팝업 open여부 변수
		isDetailPopup : null,       // 2020-11-02  주형식 상세페이지 팝업 open여부
		
		logWrite : function( chartNm, logcd4, region_code ){
			var logcd3 = "";
			if( gv_checkmenu == 'bubu' ){
				logcd3 = "02";
			} else if( gv_checkmenu == 'jutak' ){
				logcd3 = "03";
			} else if( gv_checkmenu == 'jungjan' ){
				logcd3 = "04";
			} else if( gv_checkmenu == 'kinong' ){
				logcd3 = "05";
			} 
			
			srvLogWrite("S0", "03", logcd3, logcd4, chartNm, 
				"year="+$administStatsMain.ui.selectedYear+",thema="+ ( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )
				+ ( logcd4 === "02" ? (",region_code="+region_code) : "" ) ); //jrj 로그 [자세히/차트 선택]
		},
		
		
		//2022.05.13 조규환 header상단탭 이동 추가 START
		callAdministStats : function(gv_checkmenu) {
			if(gv_checkmenu == "bubu"){
				$administStatsMain.ui.selectedThema = "신혼부부";
			}else if(gv_checkmenu == "jutak" ) {
				$administStatsMain.ui.selectedThema = "주택소유";
			}else if(gv_checkmenu == "jungjan") {
				$administStatsMain.ui.selectedThema = "중·장년층";
			}else if(gv_checkmenu == "kinong") {
				$administStatsMain.ui.selectedThema = "귀농·귀어·귀촌";
			}else if(gv_checkmenu == "more1") {
				$administStatsMain.ui.selectedThema = "일자리";
			}else if(gv_checkmenu == "more2") {
				$administStatsMain.ui.selectedThema = "퇴직연금";
			}else if(gv_checkmenu == "more3") {
				$administStatsMain.ui.selectedThema = "임금근로 일자리 동향";
			}
			let themaStr = "newlyDash";
			switch ($administStatsMain.ui.selectedThema) {
				case "신혼부부":
					themaStr = "newlyDash";
					break;
				case "주택소유":
					themaStr = "houseDash";
					break;
				case "중·장년층":
					themaStr = "middlDash";
					break;
				case "귀농·귀어·귀촌":
					themaStr = "retunDash";
					break;
				case "일자리":
					themaStr = "more1Dash";
					break;
				case "퇴직연금":
					themaStr = "more2Dash";
					break;
				case "임금근로 일자리 동향":
					themaStr = "more3Dash";
					break;
			}
			location.href = "/view/administStats/" + themaStr;
		},

		callAdministStatsDetail : function() {
			let themaStr = "bubu";
			
			switch ($administStatsMain.ui.selectedThema) {
				case "신혼부부":
					themaStr = "bubu";
					break;
				case "주택소유":
					themaStr = "jutak";
					break;
				case "중·장년층":
					themaStr = "jungjan";
					break;
				case "귀농·귀어·귀촌":
					themaStr = "kinong";
					break;
				case "일자리 행정통계":
					themaStr = "more1Dash";
					break;
				case "퇴직연금":
					themaStr = "more2Dash";
					break;
				case "임금근로 일자리 동향":
					themaStr = "more3Dash";
					break;
			}
			location.replace("/view/administStatsDetail/" + themaStr);
		},
		//2022.05.13 조규환 header상단탭 이동 추가 END
		
		//하루동안 안 보기
		closeWin : function (cookieName, value, expiredays) {
			//20210226 박은식 사용하지 않는 부분 주석처리 및 수정START
			$administStatsMain.ui.setCookie(cookieName, value, expiredays);
			// [오늘의 구인현황] 메뉴로 이동
//			$administStatsMain.ui.hide();
//			if ($administStatsMain.ui.mainPopupEnabled) {
//				$administStatsMainLeftMenu.ui.showNavSidebar();
//			}
//			$administStatsMain.ui.ready();
			//20210226 박은식 사용하지 않는 부분 주석처리 및 수정END
		},
		setCookie : function(cookieName, value, expiredays) {
		    var expireDt = new Date();
		    expireDt.setDate(expireDt.getDate() + expiredays);
		    document.cookie = cookieName + "=" + value + "; path=/; expires=" + expireDt.toString() + ";" ;
		},
		getCookie : function (cookieName) {
			var cName, cValue="", val;
			if(document.cookie != null){
				val = document.cookie.split(';');
				for(var i = 0; i < val.length; i++){
					cName = val[i].substr(0,val[i].indexOf("="));
					cValue = val[i].substr(val[i].indexOf("=") + 1);
					if(cookieName == cName) break;
				}
			}
			return cValue;
		 },
		 delCookie : function (cookieName) {
			var expireDt = new Date();
		    expireDt.setDate(expireDt.getDate() - 1);
		    document.cookie = cookieName + "=" + escape("Y") + "; path=/; expires=" + expireDt.toString() + ";" ;
		 },

		/**
		 * @name         : log
		 * @description  : 콘솔에 로그 기록
		 * @date         : 2021.08.06
		 * @author	     : juKwak
		 * @history 	 :
		 * @param	pMessage	: 로그 메세지
		 */
		log : function(pMessage) {
			if ($administStatsMain.ui.consoleLogEnabled) {
				console.log(">>[" + $administStatsMain.ui.consoleLogSeq + "] " + pMessage);
				$administStatsMain.ui.consoleLogSeq++;
			}
		},
		/**
		 * @name         : 콜백함수 설정 플래그 설정
		 * @description  : 콜백함수를 설정했음을 확인하는 플래그를 설정한다.
		 * 					이때 이미 플래그를 설정했다면 true를 반환한다.
		 * 					※ 기존 메뉴의 로직은 콜백함수가 한번 호출되게 돼 있지만
		 *					   일자리 맵 서비스 프레임에서는 콜백함수가 여러번 호출 될 수 있기 때문에 이 함수가 필요하다.
		 * @date         : 2021.08.03
		 * @author	     : ywKim
		 * @history 	 :
		 * @param	pSender	: 콜백함수 고유 아이디 (객체일수 있음)
		 */
		isSetCallback : function (pSender) {
			if ($.inArray(pSender, $administStatsMain.ui.isSetCallbackArr) < 0) {
				$administStatsMain.ui.isSetCallbackArr.push(pSender);
				return false;
			} else {
				return true;
			}
		},
		/**
		 * @name         : changeMenu
		 * @description  :
		 * @date         : 2021.08.03
		 * @author	     : juKwak
		 * @history 	 :
		 * @param	pIndex	: 메뉴 인덱스
		 * 						- undefined : ready() 에서 최초 호출되는 경우
		 * 						- 0: 상세
		 * 						- 1: 인구
		 * 						- 2: 가구
		 * 						- 3: 주택
		 * 						- 4: 농업
		 * 						- 5: 임업
		 * 						- 6: 어업
		 */
		changeMenu : function (pIndex, pCallback) {
			$administStatsMain.ui.pageIndex = pIndex;
			if ($administStatsMain.ui.prevIndex != pIndex) {
				$administStatsMain.ui.init();
			}

			$administStatsMain.ui.numberOfContentToLoad = 0;

			// 서비스 처음 로드됐을 경우
			if (typeof pIndex == 'undefined') {
				pIndex = $administStatsMain.ui.defaultMenuIndex;
				$administStatsMain.ui.setCoordX(pIndex);

				$administStatsMain.ui.numberOfContentToLoad++;
				$administStatsMainLeftMenu.ui.showNavSidebar(function() {
					$administStatsMain.ui.numberOfContentToLoad--;
				});
			} else {
				$administStatsMain.ui.setCoordX(pIndex);
			}

			$administStatsMain.ui.currentIndex = pIndex;
			$administStatsMain.ui.logForChangeMenu(pIndex);

			if ($administStatsMain.ui.loadByPage) {
				// 2020-10-29 [곽제욱] 인구주택행정통계, 농림어업행정통계별 묶음처리를 위한 로직변경 START
				var id = "";
				if(pIndex=="0"){
					id="detail";
				} else if(pIndex=="1"){
					id="newlyMenu";
				} else if(pIndex=="2"){
					id="houseMenu";
				} else if(pIndex=="3"){
					id="middlMenu";
				} else if(pIndex=="4"){
					id="retunMenu";
				} else if(pIndex=="6"){
					id="fisheryMenu";
				} else if(pIndex=="7"){
					id="more1";
				} else if(pIndex=="8"){
					id="more2";
				} else if(pIndex=="9"){
					id="more3";
				}
				$("#"+id).addClass("on");
				// 2020-10-29 [곽제욱] 인구주택행정통계, 농림어업행정통계별 묶음처리를 위한 로직변경 END
			}

			/* 맵 지도 분할 시 어느 맵인지 구분 csy */
			var mapToggleId = "";
			if($("#mapRgn_2").is(":visible")){
				if($administStatsMap.ui.curMapId == 1){
					mapToggleId = $administStatsMap.ui.mapToggleId1;
				}else if($administStatsMap.ui.curMapId == 0){
					mapToggleId = $administStatsMap.ui.mapToggleId;
				}
			}else{
				mapToggleId = $administStatsMap.ui.mapToggleId;
			}
			//csy
			/** 2020-10-13 [주형식] 해당년도 지역코드 존재여부 확인 START */
			// 2020.10.12    해당년도의 지역코드가 존재하는지 확인
			// 지역코드 값이 없으면 상위지역으로 조회되도록 수정
			if($administStatsMain.ui.selectedArea != null && $administStatsMain.ui.selectedArea.length == 5){
				//csy
				//if($administStatsMap.ui.mapToggleId != null && $administStatsMap.ui.mapToggleId.length == 5){
				if(mapToggleId != null && mapToggleId.length == 5){
					var year = $administStatsMain.ui.selectedYear;
					var sidoCd = $administStatsMain.ui.selectedArea.substring(0,2);
					var sggCd = $administStatsMain.ui.selectedArea.substring(2,5);
					if(!$administStatsMain.event.getYearRegionCheck(year, sidoCd, sggCd)){
						//$administStatsMap.ui.mapToggleId = "";
						if($administStatsMap.ui.curMapId == 1){
							$administStatsMap.ui.mapToggleId1 = "";
						}else if($administStatsMap.ui.curMapId == 0){
							$administStatsMap.ui.mapToggleId = "";
						}
						$administStatsMain.ui.selectedArea = $administStatsMain.ui.selectedArea.substring(0,2);
					}
				}
			} // end if
			/** 2020-10-13 [주형식] 해당년도 지역코드 존재여부 확인 END */


			// 초기화
			if(menuChangeFlag){

				$("#itmDiv").html(""); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화
				$("#itmDiv").css("display", "none"); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화
				switch (pIndex) {
				case 0: // 중메뉴: 상세지표 조회
					if ($administStatsMain.ui.prevIndex == pIndex) {
						/** 2020.10.28[한광희] 상세페이지 화면에서 상세페이지 메뉴 클릭시 초기화 하도록 수정 START */
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.selectedThema = '상세';
						$administStatsMain.ui.selectedArea = '';
						$administStatsDetail.ui.pageReadyYnFlag = "Y";
						$("#sideMenuArea").show();
						$("#administStatsDetailDataDiv").css("width","calc(100% - 500px)");
						$(".sideMenuToggleBtn").removeClass("on");
						/** 2020.10.28[한광희] 상세페이지 화면에서 상세페이지 메뉴 클릭시 초기화 하도록 수정 END */
					} else {
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.selectedThema = '상세';
						$administStatsMain.ui.selectedArea = '';
						$administStatsDetail.ui.init();
						$("#sideMenuArea").show();
					}
					$administStatsDetail.ui.viewTypeFalg = true;	// 2020.10.28[한광희] 상세페이지 첫진입/좌축메뉴 초기화 구분값
					isHeaderCommBtn(false);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
					break;
				case 1: // 중메뉴: 인구행정통계
					if ($administStatsMain.ui.prevIndex == pIndex) { // 주제 변경이 없을경우(년도변화만 존재할경우)
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$administStatsMap.ui.selectedItmCd = "T100";
							$administStatsMap.ui.selectedC1 = "";
							$administStatsMap.ui.selectedC2 = "";
							$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
							$administStatsMap.ui.selectedSurvId = "PH0001";
						// 년도변경이 아닌경우
						} else {
							$administStatsMain.ui.pathChange("nationwide", "");
							$administStatsMain.ui.selectedArea = "00";	// 2020.10.12[곽제욱] 메뉴 클릭시 지역 초기화
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMap.ui.selectedPK = ""; // 2020-11-19 [곽제욱] 선택한 object 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '신혼부부'; // 주제 세팅
						}
					} else {
						$administStatsMain.ui.yearChangeYn = "N"
						$administStatsMain.ui.pathChange("nationwide", "");
						$administStatsMain.ui.selectedArea = "00";
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
						$administStatsMain.ui.selectedThema = '신혼부부'; // 주제 세팅
						$("#sideMenuArea").hide();

//						srvLogWrite('P0','02','01','00',$administStatsMain.ui.selectedThema);
					}
					isHeaderCommBtn(true);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
					break;
				case 2: // 중메뉴: 가구행정통계
					if ($administStatsMain.ui.prevIndex == pIndex) {
						//20201019 박은식 추택총조사 중매뉴 로직 변경 START
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$houseDash.ui.clear(); // 인구대쉬보드 차트 삭제
							$administStatsMap.ui.selectedItmCd = "T100";
							$administStatsMap.ui.selectedC1 = "";
							$administStatsMap.ui.selectedC2 = "";
							$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
							$administStatsMap.ui.selectedSurvId = "PH0001";
							$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
							$houseDash.ui.getRankSet("", "",$administStatsMain.ui.selectedArea);
						// 년도변경이 아닌경우
						} else {
							$administStatsMain.ui.pathChange("nationwide", "");
							$administStatsMain.ui.selectedArea = "00";	// 2020.10.12[곽제욱] 메뉴 클릭시 지역 초기화
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMap.ui.selectedPK = ""; // 2020-11-19 [곽제욱] 선택한 object 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '주택소유'; // 주제 세팅
							$houseDash.ui.init(); // 인구대쉬보드 초기화
						}
						//20201019 박은식 추택총조사 중매뉴 로직 변경 END
					} else {
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.selectedThema = '주택소유';
						$administStatsMain.ui.selectedArea = '';
						$houseDash.ui.init();
						$("#sideMenuArea").hide();

//						srvLogWrite('P0','05','01','00',$administStatsMain.ui.selectedThema);
					}
					$("#sideMenuArea").hide();
					isHeaderCommBtn(true);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
					break;
				case 3: // 중메뉴: 가구총조사
					if ($administStatsMain.ui.prevIndex == pIndex) {
					/** 2020-10-20 [곽제욱] 가구총조사 changeMenu 수정 START */
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$administStatsMap.ui.selectedItmCd = "T200";
							$administStatsMap.ui.selectedC1 = "";
							$administStatsMap.ui.selectedC2 = "";
							$administStatsMain.ui.chartSaveClear();
							$administStatsMap.ui.selectedSurvId = "PH0001";
						// 년도변경이 아닌경우
						} else {
							$administStatsMain.ui.pathChange("nationwide", "");
							$administStatsMain.ui.selectedArea = "00";
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMap.ui.selectedPK = ""; // 2020-11-19 [곽제욱] 선택한 object 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '중장년층'; // 주제 세팅 // 20201028 박은식 주제 변경
						}
					} else {
						$administStatsMain.ui.yearChangeYn = "N"
						$administStatsMain.ui.pathChange("nationwide", "");
						$administStatsMain.ui.selectedArea = "00";
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
						$administStatsMap.ui.selectedPK = ""; // 2020-11-19 [곽제욱] 선택한 object 초기화
						$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
						$administStatsMain.ui.selectedThema = '중장년층'; // 주제 세팅
//						srvLogWrite('P0','04','01','00',$administStatsMain.ui.selectedThema);

						$("#sideMenuArea").hide();
						/** 2020-10-20 [곽제욱] 가구총조사 changeMenu 수정 END */
					}

					$("#sideMenuArea").hide();
					isHeaderCommBtn(true);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
					break;
				case 4: // 중메뉴: 농업총조사
					if ($administStatsMain.ui.prevIndex == pIndex) { // 주제 변경이 없을경우(년도변화만 존재할경우)
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$administStatsMap.ui.selectedItmCd = "T00"; // 2020-11-19 [곽제욱] 농업 아이템코드 가구원->가구로 변경
							$administStatsMap.ui.selectedC1 = "000";
							$administStatsMap.ui.selectedC2 = "";
							$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
							$administStatsMap.ui.selectedSurvId = "";
						} else {
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMap.ui.selectedPK = ""; // 2020-11-19 [곽제욱] 선택한 object 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '귀농·귀어·귀촌'; // 주제 세팅
						}
					} else {
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
						$administStatsMain.ui.selectedThema = '귀농·귀어·귀촌'; // 주제 세팅
						$("#sideMenuArea").hide();

//						srvLogWrite('P0','06','01','00',$administStatsMain.ui.selectedThema);
					}
					isHeaderCommBtn(true);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
					break;
				case 5: // 중메뉴: 임업총조사
					// 2020-10-13 임업 대쉬보드 추가 jhs START
					if ($administStatsMain.ui.prevIndex == pIndex) { // 주제 변경이 없을경우(년도변화만 존재할경우)
						if($administStatsMain.ui.yearChangeYn == "Y"){
						} else {
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMap.ui.selectedPK = ""; // 2020-11-19 [곽제욱] 선택한 object 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '통계더보기'; // 주제 세팅
						}
					} else {
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
						$administStatsMain.ui.selectedThema = '통계더보기'; // 주제 세팅
						$("#sideMenuArea").hide();

//						srvLogWrite('P0','07','01','00',$administStatsMain.ui.selectedThema);
					}
					// 2020-10-13 임업 대쉬보드 추가 jhs END
					isHeaderCommBtn(true);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
					break;
				case 6: // 중메뉴: 어업총조사
					/** 2020-10-26 [곽제욱] 어업대시보드 로직 변경 START */
					if ($administStatsMain.ui.prevIndex == pIndex) { // 주제 변경이 없을경우(년도변화만 존재할경우)
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$administStatsMap.ui.selectedItmCd = "T00"; //20201110 박은식 어업 인구에서 가구로 변경
							$administStatsMap.ui.selectedC1 = "000";
							$administStatsMap.ui.selectedC2 = "";
							$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
							$administStatsMap.ui.selectedSurvId = "";
						} else {
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMap.ui.selectedPK = ""; // 2020-11-19 [곽제욱] 선택한 object 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '어업'; // 주제 세팅
						}
					} else {
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
						$administStatsMain.ui.selectedThema = '어업'; // 주제 세팅
						$("#sideMenuArea").hide();

					}
					isHeaderCommBtn(true);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
					/** 2020-10-26 [곽제욱] 어업대시보드 로직 변경 END */
					break;
				
				//2022.05.20 조규환 통계더보기 > 일자리 행정통계(7), 퇴직연금통계(8), 임금근로 일자리동향(9) START  	
				case 7: 
					if ($administStatsMain.ui.prevIndex == pIndex) {
						//20220614 조규환 START
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
							$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
							$houseDash.ui.getRankSet("", "",$administStatsMain.ui.selectedArea);
						// 년도변경이 아닌경우
						} else {
							$administStatsMain.ui.pathChange("nationwide", "");
							$administStatsMain.ui.selectedArea = "00";	// 2020.10.12[곽제욱] 메뉴 클릭시 지역 초기화
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '주택소유'; // 주제 세팅
							$houseDash.ui.init(); // 인구대쉬보드 초기화
						}
						//20201019 박은식 추택총조사 중매뉴 로직 변경 END
					} else { //일자리 행정통계 경로
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.selectedThema = '일자리 행정통계';
						$administStatsMain.ui.selectedArea = '00';
						$more1DashDetail.ui.init();
						$("#sideMenuArea").hide();
					}
					break;
				case 8:
					if ($administStatsMain.ui.prevIndex == pIndex) {
						//20220614 조규환 START
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
							$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
							$houseDash.ui.getRankSet("", "",$administStatsMain.ui.selectedArea);
						// 년도변경이 아닌경우
						} else {
							$administStatsMain.ui.pathChange("nationwide", "");
							$administStatsMain.ui.selectedArea = "00";	// 2020.10.12[곽제욱] 메뉴 클릭시 지역 초기화
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '주택소유'; // 주제 세팅
							$houseDash.ui.init(); // 인구대쉬보드 초기화
						}
						//20201019 박은식 추택총조사 중매뉴 로직 변경 END
					} else { //퇴직연금통계 경로
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.selectedThema = '퇴직연금통계';
						$administStatsMain.ui.selectedArea = '00';
						$more2DashDetail.ui.init();
						$("#sideMenuArea").hide();
					}
					break;
				case 9:
					if ($administStatsMain.ui.prevIndex == pIndex) {
						//20220614 조규환 START
						if($administStatsMain.ui.yearChangeYn == "Y"){
							$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
							$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
							$houseDash.ui.getRankSet("", "",$administStatsMain.ui.selectedArea);
						// 년도변경이 아닌경우
						} else {
							$administStatsMain.ui.pathChange("nationwide", "");
							$administStatsMain.ui.selectedArea = "00";	// 2020.10.12[곽제욱] 메뉴 클릭시 지역 초기화
							$administStatsMain.ui.removeMap();
							$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
							$administStatsMain.ui.tileChangeYn="Y" // 2020-11-19 [곽제욱] 타일맵변경여부 Y
							$administStatsMain.ui.selectedThema = '주택소유'; // 주제 세팅
							$houseDash.ui.init(); // 인구대쉬보드 초기화
						}
						//20201019 박은식 추택총조사 중매뉴 로직 변경 END
					} else { //임금근로 일자리동향 경로
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.selectedThema = '임금근로 일자리동향';
						$administStatsMain.ui.selectedArea = '00';
						$more3DashDetail.ui.init();
						$("#sideMenuArea").hide();
					}
					break;
				//통계더보기 END
				case 12: // 중메뉴: 인구 시계열 // 2020-10-07 [곽제욱] 시계열 index 변경
					if ($administStatsMain.ui.prevIndex == pIndex) { // 주제 변경이 없을경우(년도변화만 존재할경우)

					} else {
						$administStatsMap.ui.chartToggleYn = "N" // 2020-12-07 [곽제욱] 선택된 차트항목 초기화
						$administStatsMain.ui.chartSaveClear(); // 2020-12-07 [곽제욱] 선택된 차트항목 초기화
						$administStatsTmsMap.ui.mapToggleId = ""; // 2020-12-07 [곽제욱] 시계열 진입시 mapToggleId 초기화
						$administStatsMain.ui.tmsPathChange("nationwide", "");
						$administStatsMain.ui.removeMap();
						$administStatsMain.ui.removeContent; // 주제 변경이 있을경우 divContent 영역 전체 초기화
						$administStatsMain.ui.selectedThema = '신혼부부'; // 주제 세팅
						$administStatsMain.ui.selectedArea = '00'; // 최초진입지역 세팅(위치동의할경우 변경)
						$("#sideMenuArea").hide();
						break;
					}
					isHeaderCommBtn(true);  // 2020.10.23[주형식] 헤더 공통버튼 show/hide 추가
				default: return;
				}

//				if(pIndex!= "12"){
//					$administStatsLeft.ui.selectTms();
//				}

				// 타이머 실행으로 jsp 문서가 모두 로드되는 시점을 찾는다.
				var timer = setInterval(function() {
					// jsp 문서가 모두 로드되는 시점
					if ($administStatsMain.ui.numberOfContentToLoad <= 0) {
						clearInterval(timer);
						$administStatsMain.ui.ChangeMenuCallback(pIndex);
						$administStatsMain.event.reSetUIEvent();

						if (typeof pCallback == 'function') {
							pCallback();
						}

						$administStatsMain.ui.changeMenuFinished = true;
						menuChangeFlag = true;
					}

				}, 200);
			}
		},
		/** 레이어 영역의 기준 좌표 설정
		 */
		setCoordX : function (pIndex) {
			if (pIndex == undefined) {
				$administStatsMain.ui.coordX = $administStatsMain.const.MenuBarWidth;
			} else {
				switch (pIndex) {
				case 3: $administStatsMain.ui.coordX = $administStatsMain.const.MenuBarWidth + $administStatsMain.const.M4_SubMenuBarWidth; break;
				case 2:// 구인현황 분석 3Depth 메뉴까지 활성화된 상태
					$administStatsMain.ui.coordX = $administStatsMain.const.MenuBarWidth + $administStatsMain.const.M3_SubMenu1Width + $administStatsMain.const.M3_SubMenu2Width;
					break;
				case 12: // 구인현황 분석 2Depth 메뉴까지 활성화된 상태
					$administStatsMain.ui.coordX = $administStatsMain.const.MenuBarWidth + $administStatsMain.const.M3_SubMenu1Width;
					break;
				case 1:
				case 0:
					$administStatsMain.ui.coordX = $administStatsMain.const.MenuBarWidth; break;
				default: // 메뉴바를 닫은 상태
					$administStatsMain.ui.coordX = 0;
					break;
				}
			}
		},

		ChangeMenuCallback: function(pIndex) {

			if($administStatsMain.ui.yearChangeYn=="N") {
				switch (pIndex) {
				case 0: if ($administStatsDetail.ui.pageReadyYnFlag == 'Y') { $administStatsDetail.ui.ready(); } break;
				//case 1: if (typeof $newlyDash.ui.ready != 'undefined') { $newlyDash.ui.ready(); } break;
				case 2: if (typeof $houseDash.ui.ready != 'undefined') { $houseDash.ui.ready(); } break;
				///case 3: if (typeof $middlDash.ui.ready != 'undefined') { $middlDash.ui.ready(); } break;
				//case 4: if (typeof $retunDash.ui.ready != 'undefined') { $retunDash.ui.ready(); } break;
				// 2020-10-13 임업 대쉬보드 변경 jhs
				//case 5: if (typeof $moresDash.ui.ready != 'undefined') { $moresDash.ui.ready(); } break;
				//case 6: if (typeof $fisheryDash.ui.ready != 'undefined') { $fisheryDash.ui.ready(); } break;

				//2022.05.20 조규환 통계더보기 > 일자리 행정통계(7), 퇴직연금통계(8), 임금근로 일자리동향(9) START  	
				case 7: if (typeof $houseDash.ui.ready != 'undefined') { $houseDash.ui.ready(); } break;
				case 8: if (typeof $houseDash.ui.ready != 'undefined') { $houseDash.ui.ready(); } break;
				case 9: if (typeof $houseDash.ui.ready != 'undefined') { $houseDash.ui.ready(); } break;
				//통계더보기 END
				//case 12: if (typeof $newlyTms.ui.ready != 'undefined') { $newlyTms.ui.ready(); } break; // 2020-10-07 [곽제욱] 시계열 index 변경
				default: return;
				}
			}
			// event 바인딩
			switch (pIndex) {
			case 0:// 중메뉴: 상세지표
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) {
					$administStatsDetail.event.setUIEvent();
				}
				break;
			case 1:// 중메뉴: 인구총조사 대시보드
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) {
				}
				break;
			case 2:// 중메뉴: 주택총조사 대시보드
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) {
					$houseDash.event.setUIEvent();
				}
				break;
			case 3:// 중메뉴: 가구총조사 대시보드
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) {
				}
				break;
			case 4:// 중메뉴: 농업총조사 대시보드
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) {
				}
				break;
			// 2020-10-13 임업 대쉬보드 추가 START
			case 5:// 중메뉴: 임업총조사 대시보드
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) {
				}
				break;
			// 2020-10-13 임업 대쉬보드 추가 END
			case 6:// 중메뉴: 어업 대시보드
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) {
				}
				break;
			case 12: //중메뉴 : 인구시계열
				if ($administStatsMain.ui.isSetUIEventArr[pIndex] == false) { // 2020-10-07 [곽제욱] 시계열 index 변경 // 2020-11-26 [곽제욱] setUiEvent 초기화를 위한 index 설정
				}
				break;
			default:
				return;
			}

			// 이벤트 바인딩 여부 Flag 설정
			$administStatsMain.ui.isSetUIEventArr[pIndex] = true;
			$administStatsMain.ui.prevIndex = pIndex;
			$administStatsMain.ui.yearChangeYn = "N";
			// 2020-11-02 [곽제욱] 타일차트 색변경 추가 START

			if($("#mapRgn_2").is(":visible")){
				if($administStatsMap.ui.curMapId == 1){
					if($administStatsMap.ui.mapToggleId1!=""){
						$administStatsMap.ui.tileTempColor1 = $("rect[value='"+$administStatsMap.ui.mapToggleId1+"']").attr("fill");
						$("rect[value='"+$administStatsMap.ui.mapToggleId1+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
					}
				}else if($administStatsMap.ui.curMapId == 0){
					if($administStatsMap.ui.mapToggleId!=""){
						$administStatsMap.ui.tileTempColor = $("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill");
						$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
					}
				}
			}else{
				if($administStatsMap.ui.mapToggleId!=""){
					$administStatsMap.ui.tileTempColor = $("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill");
					$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
				}
			}
//			if($administStatsMap.ui.mapToggleId!=""){
//				$administStatsMap.ui.tileTempColor = $("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill");
//				$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", "#0086c6"); // 2020-11-02 [곽제욱] 타일차트 색변경 추가
//			}
			// 2020-11-02 [곽제욱] 타일차트 색변경 추가 END
		},

		logForChangeMenu: function(pIndex) {
			var msg = 'Menu Changed.';

			if (typeof $administStatsMain.ui.prevIndex !== 'undefined' && $administStatsMain.ui.prevIndex !== null) {
				msg += '(' + ($administStatsMain.ui.prevIndex + 1) + ' -> ';
				if (typeof pIndex) {
					msg += (pIndex + 1) + ')';
				} else {
					msg += ')';
				}
			} else {
				if (typeof pIndex !== 'undefined') {
					msg += '( -> ' + (pIndex + 1) + ')';
				}
			}

			console.log(msg);
		},

		/**
		 * @name         : init
		 * @description  : 화면 로딩
		 * @date         : 2021.08.03
		 * @author	     : juKwak
		 * @history 	 :
		 */
		init : function () {

			switch ($administStatsMain.ui.prevIndex) {
			case 0: break;
			case 1: break;
			case 2: break;
			case 3: break;
			case 4: break;
			case 5: break;
			case 6: break;
			}
		},
		/** 컨텐츠 다운로드후 문서에 추가
		 */
		appendContent : function(pUrl, pCallback) {
			$administStatsMain.ui.numberOfContentToLoad++;

			var $div = $('<div></div>');
			$div.load(pUrl, null, function() {
				var $layer = $(this).children();
				if ($layer != null) {


					$('#divContent').append($layer);
				}

				if (typeof pCallback !== 'undefined') {
					pCallback();
				}

				$administStatsMain.ui.numberOfContentToLoad--;
			});
		},
		/** 문서에서 컨텐츠 삭제
		 */
		removeContent : function() {
			// 컨텐츠의 스크롤 옵션 제거
			$('#divContent').children('div').each(function() {
				var id = $(this).attr('id');
				var $div = $('#' + id);

				if (typeof $div != 'undefined') {

				}
			});

			$('#divContent').html('');
		},

		appendMap : function(pUrl, pCallback) {
			$administStatsMain.ui.numberOfContentToLoad++;
			var $div = $("<div></div>");
			$div.load(pUrl, null, function() {
				var $layer = $(this).children();
				if ($layer != null) {
					//맵 추가 영역
					$("#mapArea").append($layer);
					$("#mapArea").removeClass("newlyMap");

					var id = pUrl.substr(pUrl.lastIndexOf('/') + 1);
					$("#mapArea").addClass(id);
				}

				if (typeof pCallback == "function") {
					pCallback();
				}

				$administStatsMain.ui.numberOfContentToLoad--;
			});
		},

		removeMap : function() {
			$('#mapArea').html('');
		},

		/**
		 * @name         : getAreaSido
		 * @description  : 지역선택 팝업 시도 불러오기
		 * @date         : 2021.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 */
		getAreaSido : function(p_sido_cd) {
			// 기본값(전체)
			$("#dash_sido").html("");
			$("#dash_sido").html("<option value=\"99\" data-coor-x=\"982682\" data-coor-y=\"1744189\">전국</option>"); // 2020-11-13 [곽제욱] 전국 center값 수정 [ 990480.875, 1815839.375 ] -> [ 982682, 1744189 ]
			var selectedYear = "";
			if($administStatsMain.ui.selectedYear != ""){
				selectedYear = $administStatsMain.ui.selectedYear;
			} else{
				selectedYear = "2019";
			}

				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:selectedYear
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시도 목록 저장
						$administStatsMain.ui.areaSidoData["00"] = res.result.sidoList;

						//시도 목록 추가
						var lvResultList = res.result.sidoList;

						var searchGubun = "";	//특성별 통계 구분값
						var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
						if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
						 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
						 || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
						 || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
						 || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
						  || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
						   || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
						    || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
						     || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028") {
							searchGubun = "2";
						}else{
							searchGubun = "";
						}
						p_sido_cd = p_sido_cd;

						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].sido_cd == p_sido_cd) {
								$("#dash_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sido_nm+"</option>");
							}
							else {
								$("#dash_sido").append("<option value=\""+lvResultList[i].sido_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sido_nm+"</option>");
							}
						}
					}else if(res.errCd == "-401") {
						//$statsMeMain.ui.alert(res.errMsg);
					}else{
						//$statsMeMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
//			}
		},

		/**
		 * @name         : getAreaSgg
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2021.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 */
		getAreaSgg : function(p_sido_cd, p_sgg_cd) {
			// 기본값(전체)
			$("#dash_sgg").html("");
			//$("#dash_sgg").html("<option value=\"999\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전체</option>");
			$("#dash_sgg").html("<option value=\"999\" data-coor-x=\""+$("#dash_sido option:selected").attr("data-coor-x")+"\" data-coor-y=\""+$("#dash_sido option:selected").attr("data-coor-y")+"\">전체</option>");
			var selectedYear = "";
			if($administStatsMain.ui.selectedYear != ""){
				selectedYear = $administStatsMain.ui.selectedYear;
			} else{
				selectedYear = "2019";
			}

				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year:selectedYear,
				    	sido_cd:p_sido_cd,
				    	is_interactive:'Y',  // 비자치구 조회
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//시군구 목록 저장
						if(p_sido_cd != undefined && p_sido_cd != null && p_sido_cd != "") {
							$administStatsMain.ui.areaSggData[p_sido_cd] = res.result.sggList;
						}

						//시군구 목록 추가
						var lvResultList = res.result.sggList;
						var html = "";
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].sgg_cd == p_sgg_cd) {
								html += "<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].sgg_nm+"</option>";
							}
							else {
								html += "<option value=\""+ lvResultList[i].sgg_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].sgg_nm+"</option>";
							}
						}
						$("#dash_sgg").append(html);

						//$administStatsMain.ui.selectedArea = p_sido_cd;
						$administStatsMain.ui.selectedArea = p_sido_cd;
						if(p_sgg_cd != undefined) {
							$administStatsMain.ui.selectedArea += p_sgg_cd;
						}

						//$administStatsMap.ui.map.mapMove($("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-y"), 3, true);
						//var lv_zoom = $administStatsMap.ui.map.zoom;
						//$administStatsMap.ui.map.setZoom(Number(lv_zoom)+Number(1));

					}else if(res.errCd == "-401") {
						//$statsMeMain.ui.alert(res.errMsg);
					}else{
						//$statsMeMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
//			}
		},


		/**
		 * @name         : getAreaSgg
		 * @description  : 지역선택 팝업 시군구 불러오기
		 * @date         : 2021.08.20
		 * @author	     : 김남민
		 * @history 	 :
		 * @param
		 */
		getAreaEmdong : function(p_sido_cd, p_sgg_cd, p_emdong_cd) {
			// 기본값(전체)
			$("#dash_emdong").html("");
			//$("#dash_emdong").html("<option value=\"99\" data-coor-x=\"990480.875\" data-coor-y=\"1815839.375\">전체</option>");
			$("#dash_emdong").html("<option value=\"99\" data-coor-x=\""+$("#dash_sido option:selected").attr("data-coor-x")+"\" data-coor-y=\""+$("#dash_sido option:selected").attr("data-coor-y")+"\">전체</option>");
			var selectedYear = "";
			if($administStatsMain.ui.selectedYear != ""){
				selectedYear = $administStatsMain.ui.selectedYear;
			} else{
				selectedYear = "2019";
			}

				// ajax 시작
				$.ajax({
					url: contextPath + "/ServiceAPI/map/admAddressList.json",
				    type: 'post',
				    dataType : 'json',
				    async: false,
				    data: {
				    	base_year : selectedYear,
				    	sido_cd : p_sido_cd,
				    	sgg_cd : p_sgg_cd,
				    	is_interactive : 'Y',  // 비자치구 조회
				    }
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						//읍면동 목록 저장
						if(p_sgg_cd != undefined && p_sgg_cd != null && p_sgg_cd != "") {
							$administStatsMain.ui.areaEmdongData[p_sido_cd+""+p_sgg_cd] = res.result.admList;
						}

						//읍면동 목록 추가
						var lvResultList = res.result.admList;
						var html = "";
						for(var i = 0; i < lvResultList.length; i++) {
							if(lvResultList[i].emdong_cd == p_sgg_cd+"00") {
								html += "<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\" selected=\"selected\">"+lvResultList[i].emdong_nm+"</option>";
							}
							else {
								html += "<option value=\""+ lvResultList[i].emdong_cd+"\" data-coor-x=\""+lvResultList[i].x_coor+"\" data-coor-y=\""+lvResultList[i].y_coor+"\">"+lvResultList[i].emdong_nm+"</option>";
							}
						}
						$("#dash_emdong").append(html);

						$administStatsMain.ui.selectedArea = p_sido_cd + "" + p_sgg_cd +"" + p_emdong_cd;

						//$administStatsMap.ui.map.mapMove($("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-y"), 3, true);
						//var lv_zoom = $administStatsMap.ui.map.zoom;
						//$administStatsMap.ui.map.setZoom(Number(lv_zoom)+Number(1));

					}else if(res.errCd == "-401") {
						//$statsMeMain.ui.alert(res.errMsg);
					}else{
						//$statsMeMain.ui.alert(res.errMsg);
					}
				}).fail(function (res) { // 실패
					//$statsMeMain.ui.alert(errorMessage);
				}).always(function(res) { // 후 처리 (완료 실패 모든 상황에서 실행됨)
					//$statsMeMain.ui.loading(false);
				});
				// ajax 끝
//			}
		},


		drawContent : function(selectedParams, selectedKey, selectedCallback) {
			/*alert(JSON.stringify(selectedParams));*/
			$administStatsMap.ui.selectedParams = selectedParams;

			if (selectedKey == null || selectedKey == "" || selectedKey == undefined) {
				$administStatsMap.ui.selectedKey = "OV_L1_ID";
			} else {
				$administStatsMap.ui.selectedKey = selectedKey;
			}

			if (selectedCallback == null || selectedCallback == "" || selectedCallback == undefined) {
				$administStatsMap.ui.selectedCallback = undefined;
			} else {
				$administStatsMap.ui.selectedCallback = selectedCallback;
			}

			if ($administStatsMain.ui.selectedArea.length == 2) {
				$administStatsMapnoReverseGeoCode = true;
				// 20201104 박은식 같은 대시보드 매뉴를 다시 클릭시 맵을 다시그려주기 위해 조건문 추가
				if ($administStatsMap.ui.map == null || $("#mapRgn_3").html() == "") {
					$("#mapRgn_3").show();
					$administStatsMap.ui.createMap("mapRgn_3", 0);
					$administStatsMap.ui.mapList[0].commonMoveEvent();
				}

				if('none' != $("#mapRgn_2").css('display')){
					if ($("#mapRgn_2").html() == "") {
						$("#mapRgn_2").show();
						$administStatsMap.ui.createMap("mapRgn_2", 1);
						$administStatsMap.ui.mapList[1].commonMoveEvent();
					}
				}

				if ($administStatsMain.ui.selectedArea == "00") {
					$administStatsMap.ui.drawMapData("sido", "color");
				} else if ( ($administStatsMap.ui.curMapId == 0 && $administStatsMap.ui.mapToggleId != "") || ($administStatsMap.ui.curMapId == 1 && $administStatsMap.ui.mapToggleId1 != "")) {
					$administStatsMap.ui.drawMapData("sido", "color");
				} else {
					$administStatsMap.ui.drawMapData("sgg", "color");
				}
			} else {
				// 2020-11-10 [곽제욱] 맵 create 조건 추가
				if ($administStatsMap.ui.map == null || $("#mapRgn_3").html() == "") {
					$("#worldMap").hide();
					$("#mapRgn_3").show();
					$administStatsMap.ui.createMap("mapRgn_3", 0);
					$administStatsMap.ui.mapList[0].commonMoveEvent();
				}

				if('none' != $("#mapRgn_2").css('display')){
					if ($("#mapRgn_2").html() == "") {
						$("#mapRgn_2").show();
						$administStatsMap.ui.createMap("mapRgn_2", 1);
						$administStatsMap.ui.mapList[1].commonMoveEvent();
					}
				}

				$administStatsMap.ui.drawMapData("sgg", "color");
			}
			/*if ($administStatsMap.ui.map != null) {
				$administStatsMap.ui.map.update();
			}*/

			for (var i=0; i<$administStatsMap.ui.mapList.length; i++) {
				if ($administStatsMap.ui.mapList[i] != null) {
					$administStatsMap.ui.mapList[i].update();
				}
			}

			// 20210224 박은식 범례추가 START
			$('.sop-control').css('display', 'inline-block');
			if ($(".legendRing").attr("data-ing") == "max") {
				$(".btn_legend").trigger("click");
			} else if ($(".legendRing").attr("data-ing") == "min") {
				$(".btn_legend").trigger("click").trigger("click");
			}
			$("#grid_lg_color_0").attr("data-color", "#cd1103").attr("start-color", "#ffd75d").text("#cd1103").css("background", "#cd1103");
			// 20210224 박은식 범례추가 END
		},


		/**
		 * @name         : pathChange
		 * @description  : 맵이동 or 타일맵 클릭으로 인하여 지역경계 변동이 일어났을경우 경로 수정
		 * @date         : 2021.08.21
		 * @author	     : 곽제욱
		 * @history 	 :
		 * @param		 : region - 지역경계구분, lv_adm_cd - 선택한 지역 코드
		 */
		pathChange : function(region, lv_adm_cd){
			var lv_adm_nm = "";
			var lv_parent_adm_nm = "";
			var html = "";
			var emptyYn = "";

			if(region == "sgg"){
				$administStatsMain.ui.getSidoSggPos(lv_adm_cd);
				$("#dash_sido").val(lv_adm_cd)// 2020-11-30 [곽제욱] dash_diso 값 세팅하도록 변경
				lv_adm_nm = $("#dash_sido option:selected").text();
			} else if(region == "nationwide"){
				$("#dash_sido").val("99")
			} else if(region == "atdrc"){ // 2020-10-14 [주형식] 파라메터명 변경
				$("#dash_sido").val(lv_adm_cd.substring(0,2))
				lv_parent_adm_nm = $("#dash_sido option:selected").text();
				$("#sidoNm").html(lv_parent_adm_nm);
			} else if(region == "emdong"){ //읍면동 조회로직 추가 csy
				$administStatsMain.ui.getSidoSggPos(lv_adm_cd);
				$("#dash_sido").val(lv_adm_cd.substring(0, 2))// 2020-11-30 [곽제욱] dash_diso 값 세팅하도록 변경
				$("#dash_sgg").val(lv_adm_cd.substring(2, 5))// 2020-11-30 [곽제욱] dash_diso 값 세팅하도록 변경
				$("#dash_emdong").val(lv_adm_cd.substring(5, 7))// 2020-11-30 [곽제욱] dash_diso 값 세팅하도록 변경
			} else {
				$administStatsMap.ui.checkIsAtdrc(lv_adm_cd.substring(0,4)+"0")
				//  행정자치 하위 구인경우
				if($administStatsMap.ui.isAtdrc){
					$administStatsMain.ui.getSidoSggPos(lv_adm_cd); // 2020-11-30 [곽제욱] dash_sido 세팅 추가
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
					$administStatsMap.ui.isAtdrc = false;
				} else {
					$administStatsMain.ui.getSidoSggPos(lv_adm_cd); // 2020-11-30 [곽제욱] dash_sido 세팅 추가
					$("#dash_sgg").val(lv_adm_cd.substring(2,5)); // 2020-11-30 [곽제욱] dash_sgg 세팅 추가
				}
			}

		},

		/**
		 * @name         : tmsPathChange
		 * @description  : 맵이동 or 타일맵 클릭으로 인하여 지역경계 변동이 일어났을경우 경로 수정
		 * @date         : 2020.09.28
		 * @author	     : 곽제욱
		 * @history 	 :
		 * @param		 : region - 지역경계구분, lv_adm_cd - 선택한 지역 코드
		 */
		tmsPathChange : function(region, lv_adm_cd){
			var lv_adm_nm = "";
			var lv_parent_adm_nm = "";
			var html = "";
			var emptyYn = "";
			var srvLogHtml = "";

			if(region == "sgg"){
				lv_adm_nm = $("#dash_sido option:selected").html();
				emptyYn = $("#sidoNm").html();
				if(emptyYn=="" || emptyYn == undefined){
					html += "<span class='flow' id='sidoFlow'></span>";
					html += "<span class='name' id='sidoNm'>"+ lv_adm_nm +"</span>"
					html += '<button class="locationClose" id="sidoClose" onclick="$administStatsMain.ui.tmsRefresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
				} else {
					$("#sidoNm").html(lv_adm_nm);
					$("#sidoClose").attr("onclick", "$administStatsMain.ui.tmsRefresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					$("#sggNm").remove();
					$("#sggFlow").remove();
					$("#sggClose").remove();
				}
			} else if(region == "nationwide"){
				html += '<img src="/images/administStats/marker.png" class="marker" alt="">';
	      		html += '<span class="name">대한민국</span>';
				$("#locationPath > div").html(html); //2020.11.25[신예리] location영역 div 추가
			} else if(region == "atdrc"){ // 2020-10-14 [주형식] 파라메터명 변경
				$("#dash_sido").val(lv_adm_cd)
				lv_parent_adm_nm = $("#dash_sido option:selected").html();
				$("#sidoNm").html(lv_parent_adm_nm);
				$("#sidoClose").attr("onclick", "$administStatsMain.ui.tmsRefresh(\'"+"sgg"+"\', \'"+"00"+"\')")
				lv_adm_nm = $("#dash_sgg option:selected").html();
				emptyYn = $("#sggNm").html();
				if(emptyYn=="" || emptyYn == undefined){
					html += "<span class='flow'  id='sggFlow'></span>";
					html += "<span class='name' id='sggNm'>"+ lv_adm_nm +"</span>"
					html += '<button class="locationClose" id="sggClose" onclick="$administStatsMain.ui.tmsRefresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
				} else {
					$("#sggNm").html(lv_adm_nm);
					$("#sggClose").attr("onclick", "$administStatsMain.ui.tmsRefresh(\'"+region+"\', \'"+lv_adm_cd.substring(0,2)+"\')");
				}
				$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
				// 총인구 - XXX 타이틀 변경을 위해 시군구 레벨 세팅
				lv_adm_cd = $("#dash_sgg").val();
			} else {
				$administStatsMap.ui.checkIsAtdrc(lv_adm_cd.substring(0,4)+"0")
				//  행정자치 하위 구인경우
				if($administStatsMap.ui.isAtdrc){
					lv_adm_nm = $("#dash_sgg option:selected").html();
					var stringIndex = lv_adm_nm.indexOf(" ");
					lv_adm_nm = lv_adm_nm.substring(stringIndex, lv_adm_nm.length)
					emptyYn = $("#emdongNm").html();
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='emdongFlow'></span>";
						html += "<span class='name' id='emdongNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="emdongClose" onclick="$administStatsMain.ui.refresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						$("#emdongNm").html(lv_adm_nm);
						$("#emdongClose").attr("onclick", "$administStatsMain.ui.tmsRefresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					}
					$administStatsMap.ui.isAtdrc = false;
				} else {
					lv_adm_nm = $("#dash_sgg option:selected").html();
					emptyYn = $("#sggNm").html();
					if(emptyYn=="" || emptyYn == undefined){
						html += "<span class='flow'  id='sggFlow'></span>";
						html += "<span class='name' id='sggNm'>"+ lv_adm_nm +"</span>"
						html += '<button class="locationClose" id="sggClose" onclick="$administStatsMain.ui.tmsRefresh(\''+region+'\', \''+lv_adm_cd+'\')"></button>'
					} else {
						$("#sggNm").html(lv_adm_nm);
						$("#sggClose").attr("onclick", "$administStatsMain.ui.tmsRefresh(\'"+region+"\', \'"+lv_adm_cd+"\')");
					}
				}
				$("#locationPath > div").append(html); //2020.11.25[신예리] location영역 div 추가
			}

		},

		/**
		 * @name         : refresh
		 * @description  : 헤더경로에서 삭제버튼 클릭시 화면 새로 그리기
		 * @date         : 2021.08.21
		 * @author	     : 곽제욱
		 * @history 	 :
		 * @param		 : region - 지역경계구분, lv_adm_cd - 지역코드
		 */
		refresh : function(region, lv_adm_cd){
			// 수원시(행정자치) 인 경우 타지않도록 변경필요
			var upperRegCd = "";
			if(lv_adm_cd.length!=2){
			}
			var admCd = "";
			var thema = $administStatsMain.ui.selectedThema;
			$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
			$administStatsMain.ui.tileChangeYn = "Y";
			//$administStatsMap.ui.mapToggleId = ""; // 선택된 맵 토글 초기화

			if($("#mapRgn_2").is(":visible")){
				if($administStatsMap.ui.curMapId == 1){
					$administStatsMap.ui.mapToggleId1 = "";
				}else if($administStatsMap.ui.curMapId == 0){
					$administStatsMap.ui.mapToggleId = "";
				}
			}else{
				$administStatsMap.ui.mapToggleId = "";
			}

			$(".mapInfo").hide();
			if(region == "sgg"){
				$("#ageUnit").text("단위 : 천명"); //광역시도 일 경우 연령분포 차트 단위 변경
				admCd = "00"; // 시군구에서 삭제버튼 클릭시 전국조회를 위하여 지역코드 00 세팅
				$("#dash_sido option[value='99']").attr("selected", "true");
				$administStatsMap.ui.mapRegion = "sido";
				$administStatsMain.ui.selectedArea = "00";
				$("#sidoFlow").remove();
				$("#sidoNm").remove();
				$("#sidoClose").remove();
				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				$administStatsMain.ui.selectedLevel = "0";
				//$administStatsMap.ui.map.zoom = 1;
				//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].zoom = 1;
				$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setZoom(1);
				if(thema == "인구"){
				} else if(thema == "어업"){
				}
				else if(thema == "가구"){
				}
				else if(thema == "주택"){
					$houseDash.ui.rankSlideInit();//20200908 박은식 슬라이드 초기화
				//20201022 박은식 임업 분기 추기 START
				} else if(thema == "임업"){
				//20201022 박은식 임업 분기 추기 END
				}
				/** 2020-10-22 [곽제욱] 농업 추가 START */
				else if(thema == "농업"){
				}
				/** 2020-10-22 [곽제욱] 농업 추가 END */
				$(".Rangecontainer").hide(); //20200914 박은식 드릴다운에서 다시 전국으로 이동 시 range 숨김처리
				$("#areaDiv").html("전국"); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
			} else if(region == 'emdong') {
				$("#ageUnit").text("단위 : 명"); //시군구 이하 일 경우 연령분포 차트 단위 변경
				$administStatsMain.ui.selectedLevel = "2";
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$administStatsMain.ui.getSidoSggPos(upperRegCd);
					$("#dash_sido").val(upperRegCd.substring(0,2));
					if(thema == "인구"){
					} else if(thema == "어업"){
					}
					else if(thema == "가구"){
					}
					else if(thema == "주택"){
						$houseDash.upperBack = true;
					}
					/** 2020-10-22 [곽제욱] 농업 추가 START */
					else if(thema == "농업"){
					}
					/** 2020-10-22 [곽제욱] 농업 추가 END */
					//20201022 박은식 임업 분기 추기 START
					else if(thema == "임업"){
					}
					//20201022 박은식 임업 분기 추기 END
					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}
				$administStatsMap.ui.mapRegion = "sgg"
				$administStatsMain.ui.selectedArea = admCd;
				//$administStatsMap.ui.map.zoom = 4; // 2020-10-07 [곽제욱] SGIS(개방형지도) 읍면동 -> 상위로 이동할 경우 map의 줌레벨을 4로
				$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setZoom(4); // 2020-10-07 [곽제욱] SGIS(개방형지도) 읍면동 -> 상위로 이동할 경우 map의 줌레벨을 4로
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				var title = $("#dash_sgg option:selected").html(); // 2020-10-26 [곽제욱] 선택지역 변경
				$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
			} else {
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$("#dash_sido").val(upperRegCd.substring(0,2));
					if(thema == "인구"){
					} else if(thema == "어업"){
					} else if(thema == "가구"){
					//20201021 박은식 주택 분기 추가 START
					} else if(thema == "주택"){
						$houseDash.upperBack = true;
					} else if(thema == "농업"){
					//20201022 박은식 임업 분기 추기 START
					} else if(thema == "임업"){
					//20201022 박은식 임업 분기 추기 END
					}
					//20201021 박은식 주택 분기 추가 END

					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}

				$("#dash_sgg option[value='999']").attr("selected", "true");
					if(upperRegCd != ''){
						if(region == 'emdong'){ // atrdc

						} else if(region == 'sgg'){		// 2020-10-14 [주형식]  atdrc명 변경
							$administStatsMain.ui.selectedLevel = "2";
							$administStatsMap.ui.mapRegion = "sgg";
							$administStatsMain.ui.getSidoSggPos(admCd.substring(0,5));
							$administStatsMain.ui.selectedArea = admCd.substring(0,5);
						} else if(region == 'atdrc'){		// 2020-10-14 [주형식]  atdrc명 변경
							$administStatsMain.ui.selectedLevel = "2";
							$administStatsMap.ui.mapRegion = "sgg";
							$administStatsMain.ui.getSidoSggPos(admCd.substring(0,2));
							$administStatsMain.ui.selectedArea = admCd.substring(0,2);
						} else {
							$administStatsMain.ui.selectedLevel = "1";
							$administStatsMap.ui.mapRegion = "sido"
							$administStatsMain.ui.selectedArea = upperRegCd;
						}
					} else {
						$administStatsMap.ui.mapRegion = "sgg";
						$administStatsMain.ui.getSidoSggPos(admCd.substring(0,2));
						$administStatsMain.ui.selectedArea = admCd.substring(0,2);
						var title = $("#dash_sido option:selected").html(); // 2020-10-26 [곽제욱] 선택지역 변경
						$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
					}

				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				$administStatsMain.ui.selectedLevel = "2";
				//$administStatsMap.ui.map.zoom = 4;
				$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setZoom(4);
				if(thema == "인구"){
				} else if(thema == "가구"){

				}
				//20201021 박은식 주택 분기 추가 START
				else if(thema == "주택"){
					$houseDash.ui.rankSlideInit();
				//20201021 박은식 주택 분기 추가 END
				//20201022 박은식 임업 분기 추기 START
				} else if(thema == "임업"){
				//20201022 박은식 임업 분기 추기 END
				} else if(thema == "어업"){
				}
			}


			if(thema == "인구"){
				if(upperRegCd == "" || upperRegCd == null) {
				}
				if($administStatsMain.ui.selectedArea != '00' && $administStatsMain.ui.selectedArea != '99'){
				}
			} else if(thema == "가구"){
			} else if(thema == "어업"){
				if(upperRegCd == "" || upperRegCd == null) {
				}
			}
			else if(thema == "농업"){
				/** 2020-10-22 [곽제욱] 농업 수정 START */
				if(upperRegCd == "" || upperRegCd == null) {

				}
				if($administStatsMain.ui.selectedArea != '00' && $administStatsMain.ui.selectedArea != '99'){
				}
				/** 2020-10-22 [곽제욱] 농업 수정 END */
			}
			else if(thema == "주택"){
				if(upperRegCd == "" || upperRegCd == null) {
					$houseDash.event.allChange($administStatsMain.ui.selectedArea, "1");
				}
				//20201019 박은식 주택 추가 START
				if($administStatsMain.ui.selectedArea != '00' && $administStatsMain.ui.selectedArea != '99'){
					$houseDash.ui.getRankSet("", "", $administStatsMain.ui.selectedArea);
				}
				//20201019 박은식 주택 추가 END\
			//20201022 박은식 임업 분기 추기 START
			}
			else if(thema == "임업"){
				if(upperRegCd == "" || upperRegCd == null) {
				}
				//20201019 박은식 주택 추가 START
				if($administStatsMain.ui.selectedArea != '00' && $administStatsMain.ui.selectedArea != '99'){
				}
			//20201022 박은식 임업 분기 추기 END
				}
		},

		/**
		 * @name         : tmsRefresh
		 * @description  : 시계열 헤더경로 수정
		 * @date         : 2020.09.28
		 * @author	     : 곽제욱
		 * @history 	 :
		 * @param		 : region - 지역경계구분, lv_adm_cd - 지역코드
		 */
		tmsRefresh : function(region, lv_adm_cd){
			// 수원시(행정자치) 인 경우 타지않도록 변경필요
			var admCd = "";
			var thema = $administStatsMain.ui.selectedThema;
			$administStatsMain.ui.tileChangeYn = "Y";
			$(".mapInfo").hide();
			if(region == "sgg"){
				admCd = "00"; // 시군구에서 삭제버튼 클릭시 전국조회를 위하여 지역코드 00 세팅
				$("#dash_sido option[value='99']").attr("selected", "true");
				$administStatsTmsMap.ui.mapRegion = "sido";
				$administStatsMain.ui.selectedArea = "00";
				$("#sidoFlow").remove();
				$("#sidoNm").remove();
				$("#sidoClose").remove();
				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				$administStatsMain.ui.selectedLevel = "0";
				$administStatsTmsMap.ui.mapList[0].setZoom(0); // 2020-10-15 [곽제욱] 최소 줌레벨 0으로 변경
				/** 2020-10-08 [곽제욱] 시계열 시도레벨->전국 초기화 START */
				$administStatsTmsMap.ui.mapList[0].setPolyLayerHighlight2($administStatsTmsMap.ui.mapToggleId, "left"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
				$administStatsTmsMap.ui.mapList[1].setPolyLayerHighlight2($administStatsTmsMap.ui.mapToggleId, "right"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
				$administStatsTmsMap.ui.mapToggleId = "";

				var areaNm = $("#dash_sido option:selected").html();

				$("#leftMapDiv > #areaDiv").text(areaNm);//20201203 - 박은식 selector변경
				$("#rightMapDiv > #areaDiv").text(areaNm);//20201203 - 박은식 selector변경
				/** 2020-10-08 [곽제욱] 시계열 시도레벨->전국 초기화 END */

			} else if(region == 'emdong') {
				$administStatsMain.ui.selectedLevel = "2";
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$administStatsMain.ui.getSidoSggPos(upperRegCd);
					$("#dash_sido").val(upperRegCd.substring(0,2));
					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}
				$administStatsTmsMap.ui.mapRegion = "sgg";
				/** 2020-10-08 [곽제욱] 시계열 네비게이션 refresh 인 경우 초기화 클리어 START */
				$administStatsMain.ui.selectedArea = admCd.substring(0,2);
				$administStatsTmsMap.ui.mapList[0].setPolyLayerHighlight2($administStatsTmsMap.ui.mapToggleId, "left"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
				$administStatsTmsMap.ui.mapList[1].setPolyLayerHighlight2($administStatsTmsMap.ui.mapToggleId, "right"); // 2020-10-08 [곽제욱] 시계열 맵 토글관련 수정
				$administStatsTmsMap.ui.mapToggleId = "";

				var areaNm = $("#dash_sido option:selected").html();

				$("#leftMapDiv > #areaDiv").text(areaNm) //20201203 - 박은식 selector변경
	    		$("#rightMapDiv > #areaDiv").text(areaNm) //20201203 - 박은식 selector변경

				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				/** 2020-10-08 [곽제욱] 시계열 네비게이션 refresh 인 경우 초기화 클리어 END */
			} else {
				if(upperRegCd != ''){ //비자치구의 상위 행정시 이동 지역코드 담는 부분
					$("#dash_sido").val(upperRegCd.substring(0,2));
					admCd = upperRegCd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				} else {
					$("#dash_sido").val(lv_adm_cd.substring(0,2));
					admCd = lv_adm_cd; // 읍면동에서 삭제버튼 클릭시 시도 조회를 위하여 지역코드에 시도데이터 세팅
				}

				$("#dash_sgg option[value='999']").attr("selected", "true");
				if(upperRegCd != ''){
					if(region == 'emdong'){ // atrdc

					} else if(region == 'atdrc'){
						$administStatsMain.ui.selectedLevel = "2";
						$administStatsTmsMap.ui.mapRegion = "sgg";
						$administStatsMain.ui.getSidoSggPos(admCd.substring(0,2));
						$administStatsMain.ui.selectedArea = admCd.substring(0,2);
					} else {
						$administStatsMain.ui.selectedLevel = "1";
						$administStatsTmsMap.ui.mapRegion = "sido"
						$administStatsMain.ui.selectedArea = upperRegCd;
					}
				} else {
					$administStatsTmsMap.ui.mapRegion = "sgg";
					$administStatsMain.ui.getSidoSggPos(admCd.substring(0,2));
					$administStatsMain.ui.selectedArea = admCd.substring(0,2);
				}

				$("#sggFlow").remove();
				$("#sggNm").remove();
				$("#sggClose").remove();
				$("#emdongFlow").remove();
				$("#emdongNm").remove();
				$("#emdongClose").remove();
				$administStatsMain.ui.selectedLevel = "2";
				$administStatsTmsMap.ui.mapList[0].setZoom(4);
			}

		},

		/** 2020-10-14 [곽제욱] 로딩바 추가 START */
		/**
		 * @name         : loading
		 * @description  : 로딩바 표시
		 * @date         : 2020.10.14
		 * @author	     : 곽제욱
		 * @history 	 :
		 * @param
		 * 		p_flag : true/false => 표시/감춤
		 */
		loading : function(p_flag) {
			if(p_flag) {
				this.loadingBar.onBlockUIPopup();
				$("#durianMask").css("position","fixed");
				$("#durianMask").css("width","100%");
				$("#durianMask").css("height","100%");
				var lv_div = $("#durianMask").next("div");
				var lv_div_html = ""+lv_div.html();
				if(lv_div_html.indexOf("loding_type01") >= 0) {
					lv_div.css("position","fixed");
					lv_div.css("width","");
					lv_div.css("height","");
					lv_div.css("top","48%");
					lv_div.css("left","48%");
				}
				//2020-02-27 [김남민] 통계로-52 : 화면 좌우, 상하 스크롤 기능 추가 END
			}
			else {
				this.loadingBar.onBlockUIClose();
			}
		},
		/** 2020-10-14 [곽제욱] 로딩바 추가 END */


		/**
		 * 시도 데이터 조회
		 */
		getSidoList: function(pBaseYear, pCallback) {

			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/map/sidoAddressList.json",
				data: { base_year: pBaseYear},
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						if (typeof pCallback === "function"){

							pCallback(res.result.sidoList);// [{sido_cd, sido_nm, x_coor, y_coor} ... ]
						}
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
		},
		/*
		 * 시군구 데이터 조회
		 */
		getSggList: function(pBaseYear, pSidoCode, pCallback) {


			$.ajax({
				method: "POST",
				async: false,	// 반드시 동기처리 해야 함
				url: contextPath + "/ServiceAPI/map/sggAddressList.json",
				data: {
					sido_cd: pSidoCode,
					base_year: pBaseYear
				},
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						if (typeof pCallback === "function"){
							pCallback(res.result.sggList);	// [{sgg_cd, sgg_nm, x_coor, y_coor} ... ]
						}
					} else if(res.errCd=="-401"){
						accessTokenInfo(function() {
							$administStatsMain.ui.getSggList(pBaseYear, pSidoCode, pCallback);
						});
					}
				},
				error: function(e) {
					alert('failed');
				}
			});
		},
		/*
		 *
		 */
		setSidoCombo : function (pSidoElement, pSidoList) {
			$(pSidoElement).empty();

			$.each(pSidoList, function(cnt, node) {
				$(pSidoElement).append($("<option/>",{
									text : node.sido_nm,
									value : node.sido_cd,
									"data-coor-x" : node.x_coor,
									"data-coor-y" : node.y_coor}));
			});
		},
		/*
		 *
		 */
		setSggCombo : function (pSggElement, pSggList, pSidoItem, pIncludeAll) {
			$(pSggElement).empty();

			if (typeof pSidoItem == "object" && (pIncludeAll == undefined || pIncludeAll == true)) {
				$(pSggElement).append($("<option/>",{
										text : "전체",
										value : "999",
										"data-coor-x" : pSidoItem.x_coor,
										"data-coor-y" : pSidoItem.y_coor,
										"data-adm_cd" : pSidoItem.sido_cd}));  // 전체일 때 data-adm_cd 값 추가
			}

			$.each(pSggList, function(cnt, node) {
				$(pSggElement).append($("<option/>",{
									text : node.sgg_nm,
									value : node.sgg_cd,
									"data-coor-x" : node.x_coor,
									"data-coor-y" : node.y_coor,
									"data-adm_cd" : pSidoItem.sido_cd + node.sgg_cd}));
			});
		},

		/**
		 * @name         : 현재위치 구하기
		 * @description  :
		 * @date         : 2018.10.30
		 * @author	     : ywKim
		 * @history 	 :
		 */
		getMyPosition : function(){
			var processed = false;
			if (navigator.geolocation) {
				try {
					navigator.geolocation.getCurrentPosition(
							function (position) {
								processed = true;
								var utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
								result = false;
								$administStatsMain.ui.reqGeocode(utmkXY.x, utmkXY.y);
							},
							function (error) {
								//alert("위치동의  안함");
								processed = true;
								result = false;
								$administStatsMain.ui.setRegionCd();
								console.log("브라우져가 기능을 제공하지 않습니다.");
							}
					);

					if (processed == false) {
						$administStatsMain.ui.goToMyPositionCallback();
					}
				} catch (e) {// 보안위험이 있는 경우 오류 발생함.
					$administStatsMain.ui.goToMyPositionCallback();
				}
			} else {
				result = false;
				$administStatsMain.ui.setRegionCd();
				console.log("브라우져가 기능을 제공하지 않습니다.");
			}
		},
		/**
		 *
		 * @name         : reqGeocode
		 * @description  : 지오코딩을 조회한다.
		 * @date         : 2017. 09. 30.
		 * @author	     : 권차욱
		 * @history 	 :
		 * @param x_coor : x좌표
		 * @param y_coor : y좌표
		 */
		reqGeocode : function(x_coor, y_coor) {
			$.ajax({
	    		url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
	    		data : {
	    			accessToken : accessToken,
	    			addr_type : "20",
	    			x_coor : x_coor,
	    			y_coor : y_coor
	    		},
				type : "GET",
				success : function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result[0];
							if (result != null) {
								$administStatsMain.ui.setRegionCd(result);
							}
							break;
						case -100:
							break;
						case -401:
							accessTokenInfo(function() {
								$administStatsMain.ui.reqGeocode(x_coor, y_coor);
							});
							break;
					}
				},
				async : false,
				dataType : "json",
				error: function(x,o,e) {
					$administStatsMain.ui.setRegionCd();
				}
			});
		},
		setRegionCd : function(pInfo) {
			if (pInfo != undefined && pInfo.sido_cd != undefined) {
				$administStatsMain.ui.mySidoCd = pInfo.sido_cd;
				$administStatsMain.ui.mySidoNm = pInfo.sido_nm;

				if (pInfo.sgg_cd != undefined) {
					$administStatsMain.ui.mySggCd = pInfo.sgg_cd;
					$administStatsMain.ui.mySggNm = pInfo.sgg_nm;

					if (pInfo.emdong_cd != undefined) {
						$administStatsMain.ui.myEmDongCd = pInfo.emdong_cd;
						$administStatsMain.ui.myEmDongNm = pInfo.emdong_nm;
					}

				} else {
					$administStatsMain.ui.mySggCd = '';
					$administStatsMain.ui.mySggNm = '';
				}
			} else {
				$administStatsMain.ui.mySidoCd = '25';
				$administStatsMain.ui.mySggCd = '030';
				$administStatsMain.ui.mySidoNm = '대전광역시';
				$administStatsMain.ui.mySggNm = '서구';
			}

			$administStatsMain.ui.goToMyPositionCallback();
		},
		/**
		 * @name         : goToMyPositionCallback
		 * @description  : "내일자리 보기" 메뉴 클릭에 대한 콜백함수 처리
		 * @date         : 2019.01.23
		 * @author	     : ywKim
		 * @history 	 :
		 */
		goToMyPositionCallback : function() {
			// 타이머 실행으로 jsp 문서가 모두 로드되는 시점을 찾는다.
			var timer = setInterval(function() {
				clearInterval(timer);

				// jsp 문서가 모두 로드되는 시점
				if ($administStatsMain.ui.numberOfContentToLoad <= 0 &&
					$administStatsMain.ui.changeMenuFinished == true) {

					// 주석처리 : 다른 곳에서 처리되고 있으며, 여기서는 싱크가 안 맞아서 처리가 안되는 이유 - 2019.01.21	ywKim	변경
					// "내주변 일자리 보기" 메뉴를 클릭한 경우 처리하기 ("일자리 보기" 화면이 아닌 다른 곳에서)
					if ($administStatsMain.ui.loadByPage && typeof $administStatsMain.ui.getMyPositionCallback == 'function') {
						if ($administStatsMain.ui.getMyPositionCallback()) {
							$administStatsMain.ui.getMyPositionCallback = undefined;
						}
					}
				}
			}, 200);
		},

		/**
		 * @name         : getPosition
		 * @description  : 위치동의 또는 미동의시 설정된 정보를 반환
		 *                 SidoCd, SggCd, SidoNm, SggNm
		 * @date         : 2021.08.12
		 * @author	     :
		 * @history 	 :
		 */
		getPosition : function() {
			var position = [$administStatsMain.ui.mySidoCd, $administStatsMain.ui.mySggCd, $administStatsMain.ui.mySidoNm, $administStatsMain.ui.mySggNm];

			return position;
		},

		/**
		 * @name         : getSidoSggPos
		 * @description  : region_cd의 지도상의 center좌표값 반환
		 *                 region_cd
		 * @date         : 2020.09.11
		 * @author	     :
		 * @history 	 :
		 */
		 getSidoSggPos : function(region_cd){

			//var lv_zoom = $administStatsMap.ui.map.zoom;
			var lv_zoom = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].zoom;
			$("#dash_sido option:selected").removeAttr("selected");
			$("#dash_sgg option:selected").removeAttr("selected");
			$("#dash_emdong option:selected").removeAttr("selected");

			var sido;
			var sgg ;
			var emdong ;

			//if($("#modalSearchTitle option:selected").text().indexOf($(".toggle.on").text().replace('전체', '').trim()+' 특성별') > -1){
			var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
			if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
			 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
			  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
			   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
			    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
			     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
			   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
			       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
				    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
				if(region_cd.length == 3){
					region_cd = region_cd.substring(1);
				}
			}

			if(region_cd.length == 2){
				sido = region_cd.substring(0,2);
				if(sido != "99"){
					$administStatsMain.ui.getAreaSido(sido);	// 시도코드 조회
					console.log(" val = " + $("#dash_sido option:selected").val());
					console.log(" x = " + $("#dash_sido option:selected").attr("data-coor-x"));
					console.log(" Y = " + $("#dash_sido option:selected").attr("data-coor-y"));
					//return [$("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-x")];
					return [$("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-y")];
				}
			}
			else if(region_cd.length == 5){
				sido = region_cd.substring(0,2);
				sgg =  region_cd.substring(2,5);
				if(sido != undefined && sgg != null){
					// 2020-10-13 맵 토글 취소 체크로직 추가   START hsJu

					var mapToggleId = "";
					if($("#mapRgn_2").is(":visible")){
						if($administStatsMap.ui.curMapId == 1){
							mapToggleId = $administStatsMap.ui.mapToggleId1;
						}else if($administStatsMap.ui.curMapId == 0){
							mapToggleId = $administStatsMap.ui.mapToggleId;
						}
					}else{
						mapToggleId = $administStatsMap.ui.mapToggleId;
					}

					//if($administStatsMap.ui.mapToggleId == "" && $administStatsMain.ui.selectedArea.length ==5 && ($administStatsMain.ui.selectedArea != region_cd)){
					if(mapToggleId == "" && $administStatsMain.ui.selectedArea.length ==5 && ($administStatsMain.ui.selectedArea != region_cd)){
						console.log(">>> 지도 선택 해제");

						sido = $administStatsMain.ui.selectedArea.substring(0,2);
						sgg =  $administStatsMain.ui.selectedArea.substring(2,5);
						$administStatsMain.ui.getAreaSgg(sido, sgg);

						console.log(" val = " + $("#dash_sgg option:selected").val());
						console.log(" x = " + $("#dash_sgg option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#dash_sgg option:selected").attr("data-coor-y"))
					}
					else{
						$administStatsMain.ui.getAreaSgg(sido, sgg);
						console.log(" val = " + $("#dash_sgg option:selected").val());
						console.log(" x = " + $("#dash_sgg option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#dash_sgg option:selected").attr("data-coor-y"))
					}
					//return [$("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-x")];
					return [$("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-y")];

					// 2020-10-13 맵 토글 취소 체크로직 추가   END hsJu
				}
			} else if(region_cd.length == 7){ //읍면동 조회
				sido = region_cd.substring(0,2);
				sgg =  region_cd.substring(2,5);
				emdong =  region_cd.substring(5,7);

				if(sido != undefined && sgg != null){
					// 2020-10-13 맵 토글 취소 체크로직 추가   START hsJu

					var mapToggleId = "";
					if($("#mapRgn_2").is(":visible")){
						if($administStatsMap.ui.curMapId == 1){
							mapToggleId = $administStatsMap.ui.mapToggleId1;
						}else if($administStatsMap.ui.curMapId == 0){
							mapToggleId = $administStatsMap.ui.mapToggleId;
						}
					}else{
						mapToggleId = $administStatsMap.ui.mapToggleId;
					}

					//if($administStatsMap.ui.mapToggleId == "" && $administStatsMain.ui.selectedArea.length ==5 && ($administStatsMain.ui.selectedArea != region_cd)){
					if(mapToggleId == "" && $administStatsMain.ui.selectedArea.length ==7 && ($administStatsMain.ui.selectedArea != region_cd)){
						console.log(">>> 지도 선택 해제");

						sido = $administStatsMain.ui.selectedArea.substring(0,2);
						sgg =  $administStatsMain.ui.selectedArea.substring(2,5);
						emdong =  $administStatsMain.ui.selectedArea.substring(5, 7);
						$administStatsMain.ui.getAreaEmdong(sido, sgg, emdong);

						console.log(" val = " + $("#dash_sgg option:selected").val());
						console.log(" x = " + $("#dash_sgg option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#dash_sgg option:selected").attr("data-coor-y"))
					}
					else{
						$administStatsMain.ui.getAreaEmdong(sido, sgg, emdong);
						console.log(" val = " + $("#dash_sgg option:selected").val());
						console.log(" x = " + $("#dash_sgg option:selected").attr("data-coor-x"));
						console.log(" Y = " + $("#dash_sgg option:selected").attr("data-coor-y"))
					}
					//return [$("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-x")];
					return [$("#dash_sido option:selected").attr("data-coor-x"), $("#dash_sido option:selected").attr("data-coor-y")];

					// 2020-10-13 맵 토글 취소 체크로직 추가   END hsJu
				}
			}


			var sggZoom;
			var emdongZoom;
			if(sido == '11' || sido == '21' || sido == '22' ||
				sido == '24' || sido == '25' || sido == '26' || sido == '29'){
              // 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29)
        	   sggZoom = 5;
			} else if(sido == '23' || sido == '39') {
              // 인천(23), 제주(39)
        	   sggZoom = 4;
            } else if(sido == '31' || sido == '32' || sido == '33' ||
        		   sido == '34' || sido == '35' || sido == '36' || sido == '37' || sido == '38') {
              // 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
        	   sggZoom = 3;
            } else {
        	   sggZoom = 1;
            }

            //전국
			if(lv_zoom <= 1) {
				var x = $("#dash_sido option:selected").attr("data-coor-x");
				var y = $("#dash_sido option:selected").attr("data-coor-y");

				//$administStatsMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
				$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([x, y], (lv_zoom+1), false);
			}
			//시도
			else if (lv_zoom > 1 && lv_zoom <= sggZoom) { // 2020-10-12 [곽제욱] sggZoom 체크로 변경

				var x = $("#dash_sido option:selected").attr("data-coor-x");
				var y = $("#dash_sido option:selected").attr("data-coor-y");


				if(lv_zoom == sggZoom && $administStatsMap.ui.mapRegion != "sgg"){ // 2020-10-13 [곽제욱] 고정 줌을 sggZoom과 같으면으로 변경
					$administStatsMain.ui.selectedLevel =  "1";

					//if($("#modalSearchTitle option:selected").text().indexOf($(".toggle.on").text().replace('전체', '').trim()+' 특성별') > -1){
					var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
					if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
					 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
					  || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
					   || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
					    || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
					     || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
					   	  || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
					       || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
						    || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028"){
						sido = "2" + sido;
					}

					// 콤보박스 선택
					$administStatsMain.ui.getSidoSggPos(sido);

					// 지도 조회
					$administStatsMain.ui.pathChange("sgg", sido);
					$administStatsMap.ui.mapRegion = "sgg"; // 2020-10-12 [곽제욱] mapRegion 세팅
					// 데이터 조회
					//$populationDash.event.allChange(sido, "1");
					//$administStatsMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
					$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
				}
				else{
					//$administStatsMap.ui.map.mapMove([x, y], (lv_zoom+1), false);
					$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([x, y], (lv_zoom+1), false);
				}
			}
			//시군구
			else if (
					(lv_zoom > 1 && lv_zoom <= sggZoom) // 2020-10-12 [곽제욱] sggZoom 체크로 변경
					|| (lv_zoom > sggZoom && lv_zoom <= 12) // 2020-10-12 [곽제욱] sggZoom 체크로 변경
			){
				//$administStatsMap.ui.map.setZoom((lv_zoom+1));
				$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setZoom((lv_zoom+1));
				/** 2020-10-12 [곽제욱] 센터좌표 수정 START */
				$administStatsMain.ui.selectedArea = sido + sgg;
				$administStatsMap.ui.checkIsAtdrc($administStatsMain.ui.selectedArea.substring(0,4)+"0")
				if($administStatsMap.ui.isAtdrc==true){
					$administStatsMain.ui.selectedArea = $administStatsMain.ui.selectedArea.substring(0,4)+"0";
					emdongZoom = 5 + $administStatsMain.ui.zoomResize();
				} else {
					// 최종단계(시군구 or 비자치구)인 경우에는 return
					return;
				}
				if(lv_zoom >= emdongZoom){
					$administStatsMain.ui.selectedLevel =  "2";
					var x = $("#dash_sgg option:selected").attr("data-coor-x");
					var y = $("#dash_sgg option:selected").attr("data-coor-y");
					//$populationDash.event.allChange($administStatsMain.ui.selectedArea, "1");
					//$administStatsMap.ui.map.mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
					//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([x, y], (lv_zoom), false); // 2020-10-13 [곽제욱] 경계이동할때는 zoomlevel 미변경
				}
				//var to_center = $administStatsMap.ui.map.gMap.getCenter();
				/** 2020-10-12 [곽제욱] 센터좌표 수정 END */

			}//읍면동
			else if (
					(lv_zoom > 1 && lv_zoom <= 3)
					|| (lv_zoom > 3 && lv_zoom <= 5 )
					|| (lv_zoom > 5 && lv_zoom <= 12 ) // 2020-10-13 [곽제욱] 최대줌 변경
			) {
				/** 2020-10-12 [곽제욱] 줌in 로직 변경 START */
				/*
				if(($administStatsMain.ui.selectedArea).length != 7){
					commonTotSurv_alert("검색할 구를 선택해 주십시오.");
					return;
				}
				*/
				//$administStatsMap.ui.map.setZoom((lv_zoom+1));
				$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setZoom((lv_zoom+1));

				//var to_center = $administStatsMap.ui.map.gMap.getCenter();
				var to_center = $administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].gMap.getCenter();
				//$administStatsMap.ui.map.mapMove([to_center.x, to_center.y], (lv_zoom+1), false);
				//$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].mapMove([to_center.x, to_center.y], (lv_zoom+1), false);
				/** 2020-10-12 [곽제욱] 줌in 로직 변경 END */

			}


		},

		/**
		 * @name         : setHelpTooltip
		 * @description  : 도움말 툴팁
		 *
		 * @date         : 2020.09.28
		 * @author	     :
		 * @history 	 :
		 * @parameter	 target : 해당 툴팁 id
		 */
		setHelpTooltip : function(target){
			$("#helpTooltip").empty();
			var title = "";
			var text = "";
			var authorship = "";
			var html = "";
			var linkUrl = ""; // 2020-10-29 [곽제욱] linkUrl 변수 추가
			switch(target){
			/*공통 start*/
			case "totalIMF":
				title = "IMF 인구 통계"; //20201014 박은식 문구변경
				text="해당 연도 아시아, 아메리카, 유럽, 아프리카,<br/> 오세아니아에 속하는 210개 국가 중 인구 순위";
				authorship = "IMF";
				break;
			case "totalSido":
				title = "광역시도 중";
				text="대한민국 1개의 특별시, 6개의 광역시, 8개의 도,<br/> 1개의 특별자치도, 1개의 특별자치시 총 17개 <br/>광역시도 중 인구 순위<br/>※세종특별자치시는 2012년도 부터 적용";
				authorship = "통계청, 『인구행정통계』";
				linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1IN1502&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=A11_2015_1_10_10&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			case "totalSgg":
				title = "시군구 중";
				text="대한민국 시군·구 중 인구 순위<br/>※행정시·자치구가 아닌 시는 순위에 포함하고,<br/>행정시·자치구가 속한 구는 순위에서 제외함";
				authorship = "통계청, 『인구행정통계』";
				linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1IN1502&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=A11_2015_1_10_10&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			/*공통 end*/
			/*총인구 start*/
			case "genderRatio":
				title = "남녀 성비";
				text="여자 100명당 남자의 수<br/> (성비 = (남자인구/여자인구) × 100)";
				authorship = "통계청, 『인구행정통계』";
				linkUrl ="http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1IN1503&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=A11_2015_1_10_10&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			case "foreignPopulation":
				title = "외국인 수";
				text="행정구역 별 3개월 이상 거주한 외국인 수<br/>※범위 : 단기 체류 외국인, 등록 외국인, 외국 국적<br/>동포 거소신고자";
				authorship = "통계청, 『인구행정통계』";
				linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1IN1502&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=A11_2015_1_10_10&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			case "houseHoldRatio": // 2020-10-21 [곽제욱] 가구 툴팁 id 설정
			/*총인구 end*/
			/*가구 start*/
				title = "가구수 증감";
				text="전년 대비 가구 증감률 순위<br/>(비교대상 – 기준 / 기준) * 100";
				authorship = "통계청, 『인구행정통계』";
				linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1IN1502&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=A11_2015_1_10_10&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			case "oneHouse": // 2020-10-21 [곽제욱] 가구 툴팁 id 설정
				title = "1인 가구의 수";
				text="행정구역별 1인 가구의 수<br/>※일반가구를 대상으로 집계<br/>단, 집단가구(6인 이상 비혈연가구, 기숙사,<br/> 사회시설 등) 및 외국인 가구 제외";
				authorship = "통계청, 『인구행정통계』";
				linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1PL1501&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=A12_2015_1_10_30&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			/*가구 end*/
			/*주택 start*/
			case "houseRatioHelp": // 2020-10-20 [박은식] 툴팁 메세지 추가
				title = "주택수 증감";
				text="전년 대비 주택 증감률 순위<br/>(비교대상 – 기준 / 기준) * 100";
				authorship = "통계청, 『주택행정통계』";
				linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1IN1502&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=A11_2015_1_10_10&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			case "emptyHelp": // 2020-10-20 [박은식] 툴팁 메세지 추가
				title = "빈집의 수";
				text="행정구역별 빈집의 수";
				authorship = "통계청, 『주택행정통계』";
				linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1JU1512&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=H21_2015_1_10&conn_path=I4"; // 2020-10-29 [곽제욱] url 추가
				break;
			/*주택 end*/
			/*농업 start*/
			case "retunRatioHelp": // 2020-10-23 [곽제욱] 툴팁 메세지 추가
				// 2020.11.10 툴팁 메세지 문구 변경  "전년 대비" -> 전주기 대비  START
				/* 	title = "전년 대비 농가 인구 증감률";
				text="전년 대비 농가 인구 증감률<br/>(비교대상 – 기준 / 기준) * 100";*/
				title = "전주기 대비 농가 가구 증감";
				text="전주기 대비 농가 가구 증감률<br/>(비교대상 – 기준 / 기준) * 100";
				// 2020.11.10 툴팁 메세지 문구 변경  "전년 대비" -> 전주기 대비  END
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
				if($administStatsMain.ui.selectedYear == "2015"){
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG15104&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=MT_CTITLE_m_2015_10&conn_path=I4";
				} else {
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG104&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=MT_CTITLE_m_1_1&conn_path=I4";
				}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			case "retunOldAgeHelp": // 2020-10-23 [곽제욱] 툴팁 메세지 추가
				title = "농가 인구 중 고령인구";
				text="행정구역별 농가 인구 중 65세 이상의 농가<br/>인구 수";
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
				if($administStatsMain.ui.selectedYear == "2015"){
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG15107&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=MT_CTITLE_m_2015_10&conn_path=I4";
				} else {
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG107&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=MT_CTITLE_m_1_1&conn_path=I4";
				}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			case "retunNumberHelp": // 2020-10-23 [곽제욱] 툴팁 메세지 추가
				// 2020.11.10 툴팁 메세지 문구 변경  "농가(가구) 수" -> 농가 인구  START
				/* title = "농가(가구) 수";
				text="행정구역별 농가(가구) 수<br/>※농가기준 : 조사기준 현재 논이나 밭을<br/>100a(300평) 이상 직접 경영하는 농가";
				*/
				title = "농가 인구";
				text="행정구역별 농가 인구<br/>※농가기준 : 조사기준 현재 논이나 밭을<br/>100a(300평) 이상 직접 경영하는 농가";
				// 2020.11.10 툴팁 메세지 문구 변경  "농가(가구) 수" -> 농가 인구  END
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
				if($administStatsMain.ui.selectedYear == "2015"){
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG15104&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=MT_CTITLE_m_2015_10&conn_path=I4";
				} else {
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1AG104&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=MT_CTITLE_m_1_1&conn_path=I4";
				}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			/*농업 end*/
			/*임업 start*/
			case "moresHelp": // 20201021 박은식 임가 도움말 id값 추가
				title = "전주기 대비 임가 수 증감";	// 2020.11.10[한광희] 타이틀 변경
				text="전주기 대비 임가 수 증감률<br/>(비교대상 – 기준 / 기준) * 100";		// 2020.11.10[한광희] 타이틀 변경
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
				if($administStatsMain.ui.selectedYear == "2015"){
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FO15105&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F21_2015_10&conn_path=I4";
				} else {
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FO105&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F21_1_1&conn_path=I4";
				}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			case "oldForestryHelp": // 20201021 박은식 임가 도움말 id값 추가
				title = "임가 인구 중 고령인구";
				text="행정구역별 임가 인구 중 65세 이상의 임가 인구 수<br/>※임산물을 재배하는 가구를 포함하여 집계"; // 20201028 박은식 오타 수정
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
				if($administStatsMain.ui.selectedYear == "2015"){
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FO15108&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F21_2015_10&conn_path=I4";
				} else {
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FO108&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F21_1_1&conn_path=I4";
				}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			case "forestryHouseHelp": // 20201021 박은식 임가 도움말 id값 추가
				title = "임가 인구";	// 2020.11.10[한광희] 타이틀 변경
				text="행정구역별 임가 인구<br/>※임산물을 재배하는 인구를 포함하여 집계";		// 2020.11.10[한광희] 타이틀 변경
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
				if($administStatsMain.ui.selectedYear == "2015"){
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FO15105&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F21_2015_10&conn_path=I4";
				} else {
					linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FO105&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F21_1_1&conn_path=I4";
				}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			/*임업 end*/
			/*어업 start*/
			case "fisheryHouseHelp": // 20201023 박은식 임가 도움말 id값 추가
				title = "전주기 대비 어가 수 증감";
				text="전주기 대비 어가 수 증감률<br/>(비교대상 – 기준 / 기준) * 100";
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
					if($administStatsMain.ui.selectedYear == "2015"){
						linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FI15103&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F312_2015_10&conn_path=I4";
					} else {
						linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FI103&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F312_4_1&conn_path=I4";
					}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			case "oldFisheryHelp": // 20201023 박은식 임가 도움말 id값 추가
				title = "어가 인구 중 고령인구";
				text="행정구역별 어가 인구 중 65세 이상의 어가 인구 수"; // 20201028 박은식 오타 수정
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
					if($administStatsMain.ui.selectedYear == "2015"){
						linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FI15202&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F312_2015_20&conn_path=I4";
					} else {
						linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FI202&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F312_4_2&conn_path=I4";
					}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			case "fisheryRatioHelp": // 20201023 박은식 임가 도움말 id값 추가
				title = "어가 인구";
				text="행정구역별 어가 인구<br/>※어가 기준<br/>- 지난 1년간 판매를 목적으로 1개월 이상 어업을<br/>경영한 인구<br/>- 판매금액(2015년) 120만원 이상<br/>- 현재, 양식하는 수산물의 평가액이 <br/>120만원 이상(2015년 기준 추가)";
				authorship = "통계청, 『농림어업행정통계』";
				// 2020-10-29 [곽제욱] url 추가 START
					if($administStatsMain.ui.selectedYear == "2015"){
						linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FI15103&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F312_2015_10&conn_path=I4";
					} else {
						linkUrl = "http://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1FI103&lang_mode=ko&vw_cd=MT_ZTITLE&list_id=F312_4_1&conn_path=I4";
					}
				// 2020-10-29 [곽제욱] url 추가 END
				break;
			/*어업 end*/
				default :
					break;

			}
			html += "<div class='helpToolTipDiv'>"; // 2020-11-09 [곽제욱] class 추가
			html += "	<sapn class='helpToolTipDiv' style='height:15px; background-color:#596070; color:#fff; display:block; padding:8px 10px; border-top-left-radius: 5px; border-top-right-radius: 5px;'>"+title+"</span>"; // 2020-11-09 [곽제욱] class 추가
			html += "	<button type='button' class='commonAdministStatsPopcloseBtn' id='commonAdministStats_popup_confirm_close' title='팝업 닫기'></button>"; //2020.11.09[신예리] 대시 보드 설명 팝업 닫기 버튼 추가
			html += "</div>";
			html += "	<div style='padding: 7px; border-bottom-left-radius: 5px; border-bottom-right-radius:5px; box-shadow: 0px 2px 5px rgba(0,0,0,0.3);'>";
			html += "<table style='border-collapse: collapse;'>";
			html += "	<caption>설명 및 출처</caption>";
			html += "	<colgroup>";
			html += "		<col width='100px;'>";
			html += "		<col width='380px;'>";
			html += "	</colgroup>";
			html += "	<tbody>";
			html += "		<tr>";
			html += "			<th class='helpToolTipDiv' style='font-size: 13px; font-weight:normal; border:1px solid #e0e0e0; min-height:70px;background-color:#f6f7f8;'>설&nbsp;&nbsp;명  </th>"; // 2020-11-09 [곽제욱] class 추가
			html += "			<td class='helpToolTipDiv' style='text-align: left; font-size: 13px; border:1px solid #e0e0e0;  min-height:70px; padding:5px; line-height: 17px;'>"+text+"</td>"; // 2020-11-09 [곽제욱] class 추가
			html += "		</tr>";
			html += "		<tr>";
			html += "			<th class='helpToolTipDiv' style='font-size: 13px; font-weight:normal; border:1px solid #e0e0e0; height:30px;background-color:#f6f7f8;'>출&nbsp;&nbsp;처  </th>";
			// 2020-10-29 [곽제욱] url 추가로 인한 로직변경 START
			if(target == "totalIMF"){
				html += "			<td class='helpToolTipDiv' style='text-align: left; font-size: 13px; border:1px solid #e0e0e0; height:30px;padding:5px; line-height: 17px;'><a href='https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU1&conn_path=I2' style='text-decoration:underline' target='_blank'>IMF-인구(아프리카)</a><br/>"; // 2020-11-09 [곽제욱] class 추가
				html +=	"<a class='helpToolTipDiv' href='https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU2&conn_path=I2' style='text-decoration:underline' target='_blank'>IMF-인구(아메리카)</a><br/>"; // 2020-11-09 [곽제욱] class 추가
				html +=	"<a class='helpToolTipDiv' href='https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU3&conn_path=I2' style='text-decoration:underline' target='_blank'>IMF-인구(아시아)</a><br/>"; // 2020-11-09 [곽제욱] class 추가
				html +=	"<a class='helpToolTipDiv' href='https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU4&conn_path=I2' style='text-decoration:underline' target='_blank'>IMF-인구(유럽)</a><br/>"; // 2020-11-09 [곽제욱] class 추가
				html +=	"<a class='helpToolTipDiv' href='https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_2CBU5&conn_path=I2' style='text-decoration:underline' target='_blank'>IMF-인구(오세아니아)</a>"; // 2020-11-09 [곽제욱] class 추가
				html +=	"</td>";
			} else {
				html += "			<td class='helpToolTipDiv' style='text-align: left; font-size: 13px; border:1px solid #e0e0e0; height:30px;padding:5px; line-height: 17px;'><a class='helpToolTipDiv' href='"+linkUrl+"' style='text-decoration:underline' target='_blank'>"+authorship+"</a></td>"; // 2020-11-09 [곽제욱] class 추가
			}
			// 2020-10-29 [곽제욱] url 추가로 인한 로직변경 END
			html += "		</tr>";
			html += "	</tbody>";
			html += "</table>";
			html += "</div>";

			$("#helpTooltip").append(html);
		},


		//20201012 박은식 줌 레벨 조절 START
		/**
		 * @name         : zoomResize
		 * @description  : zoom level 추가 조절
		 *
		 * @date         : 2020.09.28
		 * @author	     :
		 * @history 	 :
		 * @parameter
		 */
		zoomResize : function(){
			var zoomSize = 0;

			if($administStatsMain.ui.zoomUpRegion.indexOf($administStatsMain.ui.selectedArea) > -1){
				zoomSize = -1;
			} else if($administStatsMain.ui.zoomDownRegion.indexOf($administStatsMain.ui.selectedArea) > -1) {
				// 2020.10.12 hsJu 자치구, 비자치구 줌레벨 수정  START
				if($administStatsMain.ui.selectedArea.lastIndexOf(0,4) > -1){
					if(!$administStatsMap.ui.isAtdrc){
						zoomSize = 1;
					}
				}
				else{
					zoomSize = -1;
				}
				// 2020.10.12 hsJu 자치구, 비자치구 줌레벨 수정  END
			} else if($administStatsMain.ui.zoomDoubleUpRegion.indexOf($administStatsMain.ui.selectedArea) > -1){
				zoomSize = -2;
			} else if($administStatsMain.ui.zoomDoubleDownRegion.indexOf($administStatsMain.ui.selectedArea) > -1){
				zoomSize = 2;
			}
			return zoomSize;
		},
		//20201012 박은식 줌 레벨 조절 END

		//20201013 박은식 resize 또는 map highlight event 발생 시 chart selected 정보를 유지하기위한 공통함수 START
		chartSelectedSave : function(target, data, color, index, resizeYn, title){
			if(resizeYn == "Y"){
			//20201102 박은식 특수한 차트 처리를 위한 분기처리 START
				if(target  == "middlTimeChart"){
				//20201126 박은식 차트 유지 로직 추가 START
					var cnt = $("#"+target).find(".eventGroup"+data.idx).find("rect").length;
					for(var i=0; i<cnt;i++){
						if($("#"+target).find(".eventGroup"+data.idx).find("rect").eq(i).attr("item") == index){
							index = i;
							break;
						}
					}
				//20201126 박은식 차트 유지 로직 추가 END
					$("#"+target).find(".eventGroup"+data.idx).find("rect").eq(index).attr("fill", color);
//					$administStatsMap.ui.selectedPK[0] = $("#"+target).find(".eventGroup"+data.idx).find("rect").eq(index)[0];
					if(title != "" && title != undefined){
						$("#itmDiv").html(title);
					}
				} else {
				//20201126 박은식 차트 유지 로직 추가 START
					var cnt = $("#"+target).find(".eventGroup").length;
					for(var i=0; i<cnt;i++){
						if($("#"+target).find(".eventGroup").eq(i).attr("item") == index){
							index = i;
							break;
						}
					}
				//20201126 박은식 차트 유지 로직 추가 END
					$("#"+target).find(".eventGroup").eq(index).attr("fill", color);
//					$administStatsMap.ui.selectedPK[0] = $("#"+target).find(".eventGroup").eq(index)[0];
					if(title != "" && title != undefined){
						$("#itmDiv").html(title);
					}
			//20201102 박은식 특수한 차트 처리를 위한 분기처리 END
				}
			} else {
				if($administStatsMain.ui.pageIndex == 1){ //인구
				}
				/** 2020-10-20 [곽제욱] 가구대시보드 chartItmClick 세팅 START */
				else if($administStatsMain.ui.pageIndex == 2){
				//20201126 박은식 차트 유지 로직 추가 START
					if(target  == "middlTimeChart"){
					} else {
					}
				//20201126 박은식 차트 유지 로직 추가 END
				}
				else if($administStatsMain.ui.pageIndex == 3){
					$houseDash.ui.chartItmClick( $("#"+target).find(".eventGroup").eq(index), data, color, title);
				}
				else if($administStatsMain.ui.pageIndex == 4){
				}
				/** 2020-10-20 [곽제욱] 가구대시보드 chartItmClick 세팅 END */
				/** 2020-10-22 [박은식] 주택, 임업 대시보드 chartItmClick 세팅 START */
				else if($administStatsMain.ui.pageIndex == 5){
				}
				/** 2020-10-22 [곽제욱] 주택, 임업 대시보드 chartItmClick 세팅 END */
			}
		},
		//20201013 박은식 resize 또는 map highlight event 발생 시 chart selected 정보를 유지하기위한 공통함수 END

		/** 2020-10-15 [곽제욱] 차트저장데이터 초기화 START */
		chartSaveClear : function(){
			$administStatsMain.ui.chartTarget = "";
    		$administStatsMain.ui.chartIndex = "";
    		$administStatsMain.ui.chartData = "";
    		$administStatsMain.ui.chartColor = "";
    		$administStatsMain.ui.chartTitle = "";
    		$administStatsMap.ui.selectedPK = ""; // 2020-11-12 [곽제욱] 선택항목 초기화 수정
    		$administStatsMap.ui.selectedItmCd = $administStatsMap.ui.selectedItmCd;
    		$administStatsMap.ui.selectedSurvId = $administStatsMain.ui.selectedSurvId; // 2020-10-20 [박은식] survId 추가
    		//20201126 박은식 초기화 값 변경 START
    		$administStatsMap.ui.selectedC1 = "";
    		$administStatsMap.ui.selectedC2 = "";
    		$administStatsMap.ui.selectedC3 = "";
    		//20201126 박은식 초기화 값 변경 END
    		// 2020-12-07 [곽제욱] 시계열 초기화 값 추가 START
    		$administStatsTmsMap.ui.selectedItmCd = "";
    		$administStatsTmsMap.ui.selectedSurvId = "";
    		$administStatsTmsMap.ui.selectedC1 = "";
    		$administStatsTmsMap.ui.selectedC2 = "";
    		$administStatsTmsMap.ui.selectedC3 = "";
    		// 2020-12-07 [곽제욱] 시계열 초기화 값 추가 END
		},
		/** 2020-10-15 [곽제욱] 차트저장데이터 초기화 END */
		/**
	     *
	     * @name         : mapImageDown
	     * @description  : 맵 이미지를 다운로드
	     * @date         : 2020. 10. 21
	     * @author	     : jhs
	     * @history 	 :
	     * @param targetId : 캡쳐 엘리먼트 아이디
		 * @param saveNm : 저장이름
	     */
		mapImageDown : function(targetId, saveNm){
   			var agent = navigator.userAgent.toLowerCase();
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
				commonAdministStats_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br/>발생하므로 크롬을 이용해 주시기 바랍니다.",
						function okFn(opt){
							$("#commonAdministStats_popup_confirm_close").click();
						}
				)
			}else{
				commonAdministStatsAdministStats_confirm("해당 지도 이미지를 저장하시겠습니까?",
						function okFn(opt){
							$('.sop-control').css('display', 'none'); // 2020-12-11 [곽제욱] 이미지 저장시 범례 on//20210223 박은식 범례 off
							//20210223 박은식 이미지 다운로드 시 범례 변경 START
							if($(".legendRing").attr("data-ing") == "min"){
								$(".btn_legend").trigger("click");
							}
							$(".sop-control-container").append("<div id='capTmp'></div>");
							$("#capTmp").attr("style", "z-index:9999; position:absolute; left:-9px; bottom:0px;");
							$("#capTmp").append($(".colorbar").html());
							$("#capTmp").find("li").css("height","25px");
							$("#capTmp").find("li").css("width","170px");
							$("#capTmp").find("li").css("color","#ffffff");
							if($administStatsMap.ui.selectedPK != ""){
								var color = ["#CCCCD6", "#AAABBB", "#888AAB", "#66699B", "#44488A", "#22277A", "#00076A", "#000551"]
								for(var i=0;i<$("#capTmp").find("li").length; i++){
									$("#capTmp").find("li").eq(i).css("background-color", color[7-i])
								}
							}
							//20210223 박은식 이미지 다운로드 시 범례 변경 END

							html2canvas($(targetId)[0], {
		        				logging: true,
		        				useCORS: false,
		        				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
		        			}).then(function(canvas) {
		        				var a = document.createElement('a');
		        				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		        				a.download = saveNm+".png";
		        				a.click();
		        			});
							$("#capTmp").remove();//20210223 박은식 범례이미지 삭제
							$('.sop-control').css('display', 'inline-block'); // 2020-12-11 [곽제욱] 이미지 저장시 범례 off//20210223 박은식 범례 on
						}
	   			);
			}
		},

		/**
	     *
	     * @name         : pdfDown
	     * @description  : 맵 이미지를 다운로드
	     * @date         : 2020. 10. 21
	     * @author	     : jhs
	     * @history 	 :
	     * @param targetId : 캡쳐 엘리먼트 아이디
		 * @param saveNm : 저장이름
	     */
		pdfDown : function(targetId, saveNm){
   			var agent = navigator.userAgent.toLowerCase();
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
				commonAdministStats_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br/>발생하므로 크롬을 이용해 주시기 바랍니다.",
						function okFn(opt){
							$("#commonAdministStats_popup_confirm_close").click();
						}
				)
			}else{
				commonAdministStatsAdministStats_confirm("해당 대시보드를 PDF 저장하시겠습니까?",
				  function savePDF() {
		 			var currentdate = new Date();
					var fileCreateTime = makeStamp(currentdate);

					html2canvas($(targetId)[0], {
        				logging: true,
        				useCORS: false,
        				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
        			}).then(function(canvas) {

        				var imgData = canvas.toDataURL("image/png");

        				html2pdf().from(canvas).set({
        					//top, left, bottom, right
				        	margin : [1, -0.1, 0, 0 ],  // 상단 0, 가운데 1
				        	filename: fileCreateTime+'.pdf',
				        	html2canvas: {width:1852,height:904},
				        	pagebreak: { mode : 'avoid-all' },
				        	jsPDF: {orientation: 'landscape', unit: 'in', format: 'a4', compressPDF: true}
				        }).save();
        			});
		 		  }
		 		);
			}// else
		},//end pdf


		// 2020.10.27  상세페이지 이미지 캡쳐 메소드 추가 START
		/**
	     *
	     * @name         : imageToCanvas
	     * @description  : 타켓의 이미지의 canvas를 저장
	     * @date         : 2020. 10. 20
	     * @author	     : jhs
	     * @history 	 :
	     * @param targetId : 캡쳐 엘리먼트 아이디
		 * @param saveNm : 저장이름
	     */
		imageToCanvas : function(targetId, parmNm){
			console.log(targetId);
			console.log(parmNm);
			var agent = navigator.userAgent.toLowerCase();
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
				commonAdministStats_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br/>발생하므로 크롬을 이용해 주시기 바랍니다.")
			}else{
				$administStatsMain.ui.loading(true);
	   			console.log("[imageToCanvas] targetId = " + targetId + ", parmNm = " + parmNm);
	   			$('.sop-control').css('display', 'none'); // 2020-12-11 [곽제욱] 이미지 저장시 범례 on//20210223 박은식 범례 off
				//20210223 박은식 이미지 다운로드 시 범례 변경 START
	   			if($(".legendRing").attr("data-ing") == "min"){
					$(".btn_legend").trigger("click");
				}
	   			$(".sop-control-container").append("<div id='capTmp'></div>");
				$("#capTmp").attr("style", "z-index:9999; position:absolute; left:-9px; bottom:0px;");
				$("#capTmp").append($(".colorbar").html());
				$("#capTmp").find("li").css("height","25px");
				$("#capTmp").find("li").css("width","170px");
				$("#capTmp").find("li").css("color","#ffffff");
				if($administStatsMap.ui.selectedPK != ""){
					var color = ["#CCCCD6", "#AAABBB", "#888AAB", "#66699B", "#44488A", "#22277A", "#00076A", "#000551"]
					for(var i=0;i<$("#capTmp").find("li").length; i++){
						$("#capTmp").find("li").eq(i).css("background-color", color[7-i])
					}
				}
				//20210223 박은식 이미지 다운로드 시 범례 변경 END1
	   			html2canvas($(targetId)[0], {
					logging: true,
					useCORS: false,
					proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
				}).then(function(canvas) {
					$administStatsMain.ui.detailCanvas = canvas.toDataURL("image/png");
					$administStatsMain.ui.loading(false);

					if(parmNm == "$administStatsMain.ui.detailCanvas"){
						// 2020-11.02 주형식 출력창 확인 여부 추가 START
						if($administStatsMain.ui.isDetailPopup == null){
							$administStatsMain.ui.isDetailPopup = window.open("/js/administStats/report/administStatsDetailReport.html", "reportPrint","width=1280, height=850, scrollbars=yes");
							$administStatsMain.ui.isDetailPopup.focus();
						}
						else{
							if($administStatsMain.ui.isDetailPopup.closed){
								$administStatsMain.ui.isDetailPopup = window.open("/js/administStats/report/administStatsDetailReport.html", "reportPrint","width=1280, height=850, scrollbars=yes");
							}
							$administStatsMain.ui.isDetailPopup.focus();
						}

						// 2020-11-02 주형식 출력창 확인 여부 추가 END
					}
					else if(parmNm == "dash"){
						// 2020-11.02 주형식 출력창 확인 여부 추가 START
						if($administStatsMain.ui.isDashPopup == null){
							$administStatsMain.ui.isDashPopup = window.open("/js/administStats/report/administStatsDashPrint.html", "dashPrint","width=1280, height=850, scrollbars=yes");
							$administStatsMain.ui.isDashPopup.focus();
						}
						else{
							if($administStatsMain.ui.isDashPopup.closed){
								$administStatsMain.ui.isDashPopup = window.open("/js/administStats/report/administStatsDashPrint.html", "dashPrint","width=1280, height=850, scrollbars=yes");
							}
							$administStatsMain.ui.isDashPopup.focus();
						}
						// 2020-11-02 주형식 출력창 확인 여부 추가 END
					}
				});
	   			$("#capTmp").remove();//20210223 박은식 범례이미지 삭제
	   			//20210305 시계열 범례 비정상적으로 표출처리 수정 START
	   			if($administStatsMain.ui.pageIndex == 12){
	   				$('.sop-control').css('display', 'none');
	   			} else {
	   				$('.sop-control').css('display', 'inline-block'); // 2020-12-11 [곽제욱] 이미지 저장시 범례 off//20210223 박은식 범례 on
	   			}
	   			//20210305 시계열 범례 비정상적으로 표출처리 수정 END
			}
		},
		exportingChart : function(chartId, isLocal) {
			let charts;
			let saveNm = "";
			
			let year = $("#modalSearchYear option:selected").val();
			let chartNm = $("#modalSearchTitle option:selected").text();
			if(chartId == 'panel1'){
				charts = $administStatsMain.ui.chart[0];
				saveNm = year + "년 " + chartNm;
			}else if(chartId == 'panel2'){
				charts = $administStatsMain.ui.chart[1];
				saveNm = charts.title.textStr;
			}else if(chartId == 'panel3'){
				charts = $administStatsMain.ui.chart[2];
				saveNm = charts.title.textStr;
			}
			
			commonTotSurvTotSurv_confirm(saveNm + "<br/>차트 이미지를 저장하시겠습니까?",
					function okFn(opt){
						srvLogWrite("S0","01","06","00","","thema="+( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )); //jrj 로그

						$administStatsMain.ui.chart
						if (isLocal) {
							/*
						charts.exporting.update({
							chartOptions : {
								chart : {
									style : {
										fontFamily : AdministStatsChart.consts.fontFamily
									}
								}
							}
						});
							 */
							
						let ele = "", legendWidth = 0, chartWidth = 0, chartHeight = 0, layout = "", legendAlign = "";
							if(chartId == 'panel1'){
								ele = "#chart_main";
							
						let legendLen = 0;
							chartWidth = charts.options.chart.width;
							
						for(let i=0; i<charts.series.length; i++) {
							for(let j=0; j<charts.series[i].data.length; j++) {
									let label = "";
									if(charts.series[i].data[j].name != undefined) {
										label = charts.series[i].data[j].name;
									} else {
										label = charts.series[i].data[j].category;
									}
								if(legendLen < label.length + 20) {
									legendLen = label.length + 15;
									}
								}
							}
							if(charts.series[0].data.length > 5) {
								chartWidth = charts.series[0].data.length * 80;
							}
							if(charts.userOptions.plotOptions["pie"] != undefined) {
								legendWidth = legendLen * 10;
								layout = "vertical";
								legendAlign = "right";
								chartHeight = 200;
							} else {
								legendWidth = charts.options.chart.width;
								layout = "horizontal";
								legendAlign = "center";
								if(charts.series[0].data.length > 5) {
									chartHeight = charts.series.length * 300;
								} else {
									chartHeight = charts.series.length * 100;
								}
								legendWidth = undefined;
							}
						}else if(chartId == 'panel2'){
							ele = "#chart_year";
						}else if(chartId == 'panel3'){
							ele = "#chart_local";
						}
						charts.exporting.update({
							chartOptions : {
								chart: {
									spacingLeft: 30,
									width: chartWidth,
									height: chartHeight
								},
								legend: {
									labelFormatter: function() {
										if($administStatsMain.ui.pieTotSum == 0) {
						            		return "<b>" + this.name + "</b> / 0%";
						            	} else {
						            		if(this.userOptions != undefined) {
						            			if(this.userOptions.subId != undefined) {
							            			/*let partVal = "";
							            			for(let i=0; i<this.yData.length; i++) {
							            				if(partVal == "") {
							            					partVal += this.userOptions.subNm[i] + ": " + numberFormat(this.yData[i]) + chartInfo[Object.keys(chartInfo)[0]][0].disp_unit_nm;
							            				} else {
							            					partVal += ", <br/>" + this.userOptions.subNm[i] + ": " + numberFormat(this.yData[i]) + chartInfo[Object.keys(chartInfo)[0]][0].disp_unit_nm;
							            				}
							            			}
							            			partVal += "";*/
							            			//return "<b>" + this.name + "</b> / <br/> <span style='font-size: 10px; color:'" + this.color + "'>" + partVal + "</span>";
						            				return "<b>" + this.name + "</b>";
							            		} else {
						            		return "<b>" + this.name + "</b> / " + ((this.y/$administStatsMain.ui.pieTotSum)*100).toFixed(1) + "% / " +
						            			numberFormat(this.y) + chartInfo[Object.keys(chartInfo)[0]][0].disp_unit_nm;
							            		}
						            		} else {
						            			return "<b>" + this.name + "</b> / " + ((this.y/$administStatsMain.ui.pieTotSum)*100).toFixed(1) + "% / " +
					            					numberFormat(this.y) + chartInfo[Object.keys(chartInfo)[0]][0].disp_unit_nm;
						            		}
						            	}
									},
									//itemWidth: legendWidth,
									itemDistance: 5,
									width: legendWidth,
									layout: layout,
									align: legendAlign
								},
								xAxis: {
									labels: {
										style: {
											"fontSize": "10px"
										},
										x: -5,
										autoRotation: false,
										style: {
											textOverflow: 'none'
										}
									}
									},
								yAxis: {
									stackLabels: {
										enabled: true,
										formatter: function() {
											return numberFormat(this.total) + chartInfo[Object.keys(chartInfo)[0]][0].disp_unit_nm;
								}
									}
								},
								/*plotOptions: {
									column: {
										stacking: 'normal',
										pointPadding: 0,
										groupPadding: 0,
										dataLabels: {
											enabled: true,
											formatter: function() {
												return numberFormat(this.y) + chartInfo[Object.keys(chartInfo)[0]][0].disp_unit_nm;
											}
										}
									}
								}*/
							}
						});
							if($houseDash.chartStackItmClick != "" && $houseDash.chartStackItmClick != undefined) {
								for(let i=0; i<e.target.series.length; i++) {
									let sb = e.target.series[i];
									if(sb.userOptions.id == $houseDash.chartItmClick) {
										for(let j=0; j<sb.userOptions.subId.length; j++) {
											if(sb.userOptions.subId[j] == $houseDash.chartStackItmClick) {
												e.target.series[i].data[j].select();
												$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + sb.userOptions.subNm[j] + " " + sb.userOptions.name);
											}
										}
									}
								}
							} else {
								$(ele).highcharts().series[0].data.forEach(function(bar) {
									if($houseDash.chartItmClick != "" && $houseDash.chartItmClick != undefined) {
					    				if(bar.id == $houseDash.chartItmClick) {
							    			//$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.name);
							    			bar.select();
							    		}
					    			} else {
					    				if(tblId == "DT_1OH0501" || tblId == "DT_1OH0401") {
								    		$houseDash.chartItmClick = "T001";
								    		$(ele).highcharts().series[0].data.forEach(function(bar) {
								    			if(bar.category.replace(/ /g, "") == "총주택") {
								    				//$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
									    			bar.select();
								    			}
									    	});
								    	} else if(tblId == "DT_1OH0511") {
								    		$houseDash.chartItmClick = "01";
								    		$(ele).highcharts().series[0].data.forEach(function(bar) {
								    			if(bar.category == "주택 소유자") {
								    				//$(".ttitle"+mapId+".charItmMapTitle.blue").text(chartInfo[chart_ord][0].chart_nm + "   〉" + bar.category);
									    			bar.select();
								    			}
									    	});
								    	}
					    			}
								});
							}
						charts.exportChartLocal({
							type : "image/png"
						});
						} else {
							charts.exporting.update({
								chartOptions : {
									chart : {
										style : {
											fontFamily : AdministStatsChart.consts.notLocalFontFamily
										}
									},
								}
							});
							charts.exportChart({
								type : "image/png"
							});
						}
					}
			);
		},
		// 2020.10.27  상세페이지 이미지 캡쳐 메소드 추가 START
		chartImageDown : function(targetId, saveNm, test){			
   			var agent = navigator.userAgent.toLowerCase();
   			var cloneText="";	//이미지 맨위 제목 저장하기위한 변수
   			var chartId = "";
   			var originX = 0;
   			var originWidth = 0;

   			if(targetId == "panel1") {
				chartId = "#" + $("#chart_main").find(".highcharts-container").prop("id");
			} else if(targetId == "panel2") {
				chartId = "#" + $("#chart_year").find(".highcharts-container").prop("id");
			} else if(targetId == "panel3") {
				chartId = "#" + $("#chart_local").find(".highcharts-container").prop("id");
				$("#chart_local").find(".highcharts-container").append($("#chart_local").find(".highcharts-fixed"));
				$("#chart_local").find(".highcharts-title").parent().find("path").attr("opacity", "0");
				$("#chart_local").find(".highcharts-container").css({
					"display": "flex",
					"justify-content": "center"
				});
			} else if(targetId == "panel4") {
				chartId = "#" + $("#chart_table").prop("id");
			}else if(targetId == "panel11") {
				chartId = "#" + $("#chart_main1").find(".highcharts-container").prop("id");
			} else if(targetId == "panel21") {
				chartId = "#" + $("#chart_year1").find(".highcharts-container").prop("id");
			} else if(targetId == "panel31") {
				chartId = "#" + $("#chart_local1").find(".highcharts-container").prop("id");
				$("#chart_local1").find(".highcharts-container").append($("#chart_local1").find(".highcharts-fixed"));
				$("#chart_local1").find(".highcharts-title").parent().find("path").attr("opacity", "0");
				$("#chart_local1").find(".highcharts-container").css({
					"display": "flex",
					"justify-content": "center"
				});
			} else if(targetId == "panel32") {
				chartId = "#" + $("#chart_local2").find(".highcharts-container").prop("id");
				$("#chart_local2").find(".highcharts-container").append($("#chart_local2").find(".highcharts-fixed"));
				$("#chart_local2").find(".highcharts-title").parent().find("path").attr("opacity", "0");
				$("#chart_local2").find(".highcharts-container").css({
					"display": "flex",
					"justify-content": "center"
				});
			} else if(targetId == "panel41") {
				chartId = "#" + $("#chart_table1").prop("id");
			}else {
				chartId = targetId;
			}
			if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
				commonTotSurv_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br/>발생하므로 크롬을 이용해 주시기 바랍니다.",
					function okFn(opt){
						$("#commonTotSurv_popup_confirm_close").click();
						$("#commonTotSurv_popup_alert_close").click();
					}
				)
			}else{
				//setTimeout(function() {
					commonTotSurvTotSurv_confirm(saveNm + "<br/>차트 이미지를 저장하시겠습니까?",
						function okFn(opt){
							srvLogWrite("S0","01","06","00","","thema="+( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )); //jrj 로그

							html2canvas($(chartId)[0], {
		        				logging: true,
		        				useCORS: false,
		        				onclone : function(doc){
		        					var height = doc.getElementById(chartId.substring(1)).style.height.replace('px', '');
		        					if(chartId == "#chart_mainn"){
			        					$(doc.getElementById("chart_mainn")).find('.pancon1').css('padding-top', '0px');
			        				}
		        				},
		        				proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
		        			}).then(function(canvas) {
		        				var a = document.createElement('a');
		        				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		        				a.download = saveNm+".png";
		        				a.click();
		        				$("#commonTotSurv_popup_confirm").hide();
		        				$("#commonTotSurv_popup_alert").hide();
		        				$("#commonTotSurv_popup_back").hide();
		        				
		        			});
							if(targetId == "panel3") {
								$("#chart_local").find(".highcharts-scrolling").append($("#chart_local").find(".highcharts-fixed"));
							} else if(targetId == "panel31") {
								$("#chart_local1").find(".highcharts-scrolling").append($("#chart_local1").find(".highcharts-fixed"));
							} else if(targetId == "panel32") {
								$("#chart_local2").find(".highcharts-scrolling").append($("#chart_local2").find(".highcharts-fixed"));
							}
						}
		   			);
				//}, 500);
			}
		}


	};

	$administStatsMain.util = {
			
		/**
		 * @name openPop
		 * @description 팝업 열기
		 */
		openPop : function(url, p_width) {
			let width = "820";
			if (!$administStatsMain.util.isEmpty(p_width)) {
				width = p_width;
			}
			let s_status = "";
			s_status += "toolbar=no,";
			s_status += "location=no,";
			s_status += "directories=no,";
			s_status += "status=no,";
			s_status += "menubar=no,";
			s_status += "scrollbars=yes,";
			s_status += "resizable=yes,";
			s_status += "width=" + width + ",";
			s_status += "height=700";
			window.open(url, "_blank", s_status);
		},
			
		/**
		 * @name isEmpty
		 * @description Empty 여부
		 * @param obj
		 *            Object 객체
		 */
		isEmpty : function(obj) {
			if (obj == undefined || obj == null || String(obj) == "")
				return true;
			else
				return false;
		},
			
		/** 날짜에 구분자 추가 년월일 반환
		 *  @params	pDate : yyyyMMdd
		 *  		pSign : 년월일을 구분하는 기호
		 *  @return		yyyy.MM.dd
		 */
		dateWithSign : function (pDate, pSign) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";

			if (pDate.length == 8) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6) + sign + pDate.substring(6, 8);
			} else if (pDate.length == 6) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6);
			}

			return date;
		},
		/** 날짜에 구분자 추가 년주 반환
		 *  @params	pDate : yyyyww
		 *  		pSign : 년주을 구분하는 기호
		 *  		pUnit : 주를 나타내는 표기말 (기본: "주")
		 *  @return		yyyy.ww주
		 */
		weekWithSign : function (pDate, pSign, pUnit) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";
			var unit = (pUnit != undefined) ? pUnit : "주";

			if (pDate.length == 6) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6) + unit;
			} else {
				date = pDate;
			}

			return date;
		},
		/** 날짜에 구분자 추가 년월 반환
		 *  @params	pDate : yyyyMM
		 *  		pSign : 년주을 구분하는 기호
		 *  		pUnit : 월을 나타내는 표기말 (기본: "월")
		 *  @return		yyyy.mm월
		 */
		monthWithSign : function (pDate, pSign, pUnit) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";
			var unit = (pUnit != undefined) ? pUnit : "월";

			if (pDate.length == 6 || pDate.length == 8) {	// 2019.06.17[한광희] 오늘의 구인현황 기간조회 기능 활성화에 따른 수정
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6) + unit;
			} else {
				date = pDate;
			}

			return date;
		},
		/** 날짜에 구분자 추가 년월일 반환
		 *  @params	pDate : yyyyMMdd
		 *  		pSign : 년월일을 구분하는 기호
		 *  @return		yyyy.MM
		 */
		yearMonthWithSign : function (pDate, pSign) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";

			if (pDate.length == 8) {
				date = pDate.substring(0, 4) + sign + pDate.substring(4, 6);
			}

			return date;
		},
		/** 날짜에 구분자 추가하여 월일 반환
		 *  @params	pDate : yyyyMMdd
		 *  		pSign : 년월일을 구분하는 기호
		 *  @return		MM.dd
		 */
		monthDayWithSign : function (pDate, pSign) {
			var date = pDate;
			var sign = (pSign != undefined) ? pSign : "";

			if (pDate.length == 8) {
				date = pDate.substring(4, 6) + sign + pDate.substring(6, 8);
			}

			return date;
		},

		/**
		 * @name         : 숫자형 파라미터 객체를 숫자 데이터로 변환
		 * @description  :
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 :
		 */
		paramToNumber : function(pObject, pDefault) {
			if (typeof pObject === 'string') {
				return pObject.toLowerCase().replace('px', '')
			} else if (typeof pObject === 'number') {
				return pObject;
			} else if (typeof pDefault !== 'undefined') {
				return pDefault;
			} else {
				return 0;
			}
		},

		/**
		 * @name         : 레이어의 위치 구하기
		 * @description  : pAlign 에 따라 레이어의 위치를 구하여 반환한다.
		 * 					레이어의 기준위치 (0, 0)은 (left: 메뉴바 이후 / top : 인터렉티브 바 이후)
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @params	pAlign	: 상단좌측에서 하단우측까지 9개 영역을 나타내는 문자열 ['top-left', 'top-center', 'top-right', 'middle-left', ... 'bottom-right']
		 * 			pWidth  : 엘리먼트의 너비
		 * 			pHeight : 엘리먼튼의 높이
		 */
		getLayerCoord : function(pAlign, pWidth, pHeight) {
			var arr = pAlign.toLowerCase().split('-');
			var top = $administStatsMain.util.getLayerCoordY(arr[0], pHeight);
			var left = $administStatsMain.util.getLayerCoordX(arr[1], pWidth);

			// 상하 좌우 포맷의 위치가 바뀌었을 경우
			if (top == 0) {
				top = $administStatsMain.util.getLayerCoordY(arr[1], pHeight);
			}
			if (left == 0) {
				left = $administStatsMain.util.getLayerCoordX(arr[1], pWidth);
			}

			return {'left': left, 'top': top};
		},
		getLayerCoordX : function(pAlign, pWidth) {
			switch (pAlign.toLowerCase()) {
			case 'left': return $administStatsMain.ui.scrollLeft + $administStatsMain.ui.coordX + 1;
			case 'center': return $administStatsMain.ui.scrollLeft + $administStatsMain.ui.coordX + (document.body.clientWidth - $administStatsMain.ui.coordX - pWidth) / 2;
			case 'right': return $administStatsMain.ui.scrollLeft + document.body.clientWidth - pWidth;
			default: return 0;
			}
		},
		getLayerCoordY : function(pAlign, pHeight) {
			switch (pAlign.toLowerCase()) {
			case 'top': return $administStatsMain.ui.scrollTop + $administStatsMain.ui.coordY;
			case 'middle': return $administStatsMain.ui.coordY + (document.body.clientHeight - $administStatsMain.const.ContentsY - $administStatsMain.ui.coordY - pHeight) / 2;
			case 'bottom': return document.body.clientHeight - pHeight - $administStatsMain.const.ContentsY;
			default: return 0;
			}
		},

		/**
		 * @name         : 팝업창의 위치 구하기
		 * @description  : pAlign 에 따라 팝업창의 위치를 구하여 반환한다.
		 * 					팝업창의 기준위치 (0, 0)은 (left: 0 / top : 헤더 이후)
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @params	pAlign	: 상단좌측에서 하단우측까지 9개 영역을 나타내는 문자열 ['top-left', 'top-center', 'top-right', 'middle-left', ... 'bottom-right']
		 * 			pWidth  : 엘리먼트의 너비
		 * 			pHeight : 엘리먼튼의 높이
		 */
		getPopupCoord : function(pAlign, pWidth, pHeight) {
			var arr = pAlign.toLowerCase().split('-');
			var top = $administStatsMain.util.getPopupCoordY(arr[0], pHeight);
			var left = $administStatsMain.util.getPopupCoordX(arr[1], pWidth);

			// 상하 좌우 포맷의 위치가 바뀌었을 경우
			if (top == 0) {
				top = $administStatsMain.util.getPopupCoordY(arr[1], pHeight);
			}
			if (left == 0) {
				left = $administStatsMain.util.getPopupCoordX(arr[1], pWidth);
			}

			return {'left': left, 'top': top};
		},
		getPopupCoordX : function(pAlign, pWidth) {
			switch (pAlign.toLowerCase()) {
			case 'left': return $administStatsMain.ui.scrollLeft;
			case 'center': return $administStatsMain.ui.scrollLeft + (document.body.clientWidth - pWidth) / 2;
			case 'right': return $administStatsMain.ui.scrollLeft + document.body.clientWidth - pWidth;
			default: return 0;
			}
		},
		getPopupCoordY : function(pAlign, pHeight) {
			switch (pAlign.toLowerCase()) {
			case 'top': return $administStatsMain.ui.scrollTop;
			case 'middle': return (document.body.clientHeight - $administStatsMain.const.ContentsY - pHeight) / 2;
			case 'bottom': return document.body.clientHeight - pHeight - $administStatsMain.const.ContentsY;
			default: return 0;
			}
		},
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
		},
		/**
		 * @name         : getUnitList
		 * @description  : toNumberString()에서 사용하는 point, unit 목록을 구한다.
		 * 					- DB에서 조회할때 기준 unit이 존재하여 기준 unit을 기준으로 임의로 목록을 구한다.
		 * 					- 기준 unit을 사용하지 않는 경우 이 함수를 사용하지 않고 임의로 작성하여 사용하면된다.
		 * @date         : 2018.11.09
		 * @author	     : ywKim
		 * @history 	 :
		 * @param pUnitName	: 기준 unit
		 */
		getUnitList : function(pUnitName) {
			var result = {};

			if (pUnitName == undefined) {
				console.log("★★★ Warning ★★★");
				console.log("$administStatsMain.util.getUnitList(pUnitName) : 파라미터(pUnitName)가 정의되지 않았습니다.");
			}

			switch (pUnitName) {
			case "%":
				result.points = [0.1];
				result.units = ["%"];
				result.compareOperation = "-";
				break;
			case "%%p":
				result.points = [0];
				result.units = ["%%p"];
				result.compareOperation = "-";
				break;
			case "개":
				result.points = [0,3,6];
				result.units = ["개","천개","백만개"];
				result.compareOperation = "-";
				break;
			case "건":
				result.points = [0,3,6];
				result.units = ["건","천건","백만건"];
				result.compareOperation = "-";
				break;
			case "계수":
				result.points = [0];
				result.units = ["계수"];
				result.compareOperation = "-";
				break;
			case "만개":
				result.points = [0,2,5];
				result.units = ["만개","백만개","억만개"];
				result.compareOperation = "-";
				break;
			case "만원":
				result.points = [0,2,5];
				result.units = ["만원","백만원","억원"];
				result.compareOperation = "-";
				break;
			case "만원 세 년":
				result.points = [0];
				result.units = ["만원 세 년"];
				result.compareOperation = "-";
				break;
			case "만원%":
				result.points = [0];
				result.units = ["만원%"];
				result.compareOperation = "-";
				break;
			case "명":
				result.points = [0,3,4,6];
				result.units = ["명","천명","만명","백만명"];
				result.compareOperation = "-";
				break;
			case "배":
				result.points = [0,3,4,6];
				result.units = ["배","천배","만배","백만배"];
				result.compareOperation = "-";
				break;
			case "백만원":
				result.points = [0,2,6];
				result.units = ["백만원","억원","조원"];
				result.compareOperation = "-";
				break;
			//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. START
			case "백만달러":
				result.points = [0,3,6];
				result.units = ["백만달러","십억달러","조달러"];
				result.compareOperation = "-";
				break;
			//2020-02-24 [김남민] 일자리통계 > 수출, 수입 집계단위 (년월 => 년도) 수정. END
			case "시간":
				result.points = [0];
				result.units = ["시간"];
				result.compareOperation = "-";
				break;
			case "점":
				result.points = [0,3,4,6];
				result.units = ["점","천점","만점","백만점"];
				result.compareOperation = "-";
				break;
			case "천명":
				result.points = [0,3];
				result.units = ["천명","백만명"];
				result.compareOperation = "-";
				break;
			case "천불":
				result.points = [0,3,5];
				result.units = ["천불","백만불","억불"];
				result.compareOperation = "-";
				break;
			case "호":
				result.points = [0,3,4,6];
				result.units = ["호","천호","만호","백만호"];
				result.compareOperation = "-";
				break;
			case "":
				result.points = [0];
				result.units = [""];
				result.compareOperation = "-";
				break;
			default:
				console.log("★★★ Warning ★★★");
				console.log("$administStatsMain.util.getUnitList(" + pUnitName + ") : 알 수 없는 unit 입니다.");
				console.log("case 구분에 추가해주세요.");
				result.points = [0];
				result.units = [(pUnitName == undefined) ? "" : pUnitName];
				result.compareOperation = "-";
				break;
			}

			return result;
		},
		/**
		 * 소수인 파라미터중에 가장 큰 소수점 자릿수를 찾아 반환
		 */
		maxDecimalPlaces : function(pNum1, pNum2) {
			var maxPlaces = 0;

			if (typeof pNum1 == "number" && typeof pNum2 == "number") {
				var str = pNum1.toString();
				var parts = str.split(".");
				if (parts.length == 2) {
					maxPlaces = parts[1].length;
				}

				str = pNum2.toString();
				parts = str.split(".");
				if (parts.length == 2) {
					if (maxPlaces < parts[1].length) {
						maxPlaces = parts[1].length;
					}
				}
			}

			return maxPlaces;
		},

		/**
		 * @name         : toNumberString
		 * @description  : flexible 단위를 적용한 값으로 변환
		 * @date         : 2018.11.09
		 * @author	     : ywKim
		 * @history 	 :
		 * @param pNumber	: 대상 값
		 * @param pParams	:
		 * 		pParams.points : 포인트 목록
		 * 							0(일단위), 3(천단위), 4(만단위) ...
		 * 		pParams.units : 포인트별 단위 목록
		 * 							명, 천명, 만명 ...
		 * 		pParams.usingComma : 콤마 사용 여부
		 * 		pParams.compareValue : 비교 값 (비교 데이터 생성을 위함 / 기본값: undefined)
		 * 		pParams.compareOperation : 비교 값과 연산할 연산자 종류
		 * @return result
		 * 		result.text				: 표시 값
		 * 		result.value			: unit 적용 전의 값
		 * 		result.originValue		: 원본 값
		 * 		result.iconClass		: 아이콘 클래스 (up or down)
		 * 		result.iconValue		: 아이콘값 - 표시 값
		 * 		result.iconText 		: 아이콘값 - unit 적용 전의 값
		 * 		result.iconOriginValue 	: 아이콘값 - 원본값
		 */
		toNumberString : function(pNumber, pParams) {
			var result = {};
			result.iconClass = "";

			var decimalNum = (typeof pNumber == "number") ? pNumber : parseFloat(pNumber.toString().replace(",", ""));
			if (decimalNum == undefined) { return; }

			// 비교 데이터가 존재하는 경우
			if (pParams.compareValue != undefined) {
				var pVal1 = decimalNum;
				var pVal2 = (typeof pParams.compareValue == "number") ? pParams.compareValue : parseFloat(pParams.compareValue.toString().replace(",", ""));
				var pOperation = pParams.compareOperation;
				var val = 0.1;

				// 소수 판별
				var decimalPlaces = $administStatsMain.util.maxDecimalPlaces(pVal1, pVal2);

				if (pVal1 > pVal2) {
					if (pOperation == "/") {
						val = pVal1 / pVal2;
					} else {// "-"
						val = pVal1 - pVal2;
						if (decimalPlaces > 0) {// 정밀하지 않은 소수 계산 대응
							val = val.toFixed(decimalPlaces);
						}
					}
					result.iconClass = "up";
				} else if (pVal1 < pVal2) {
					if (pOperation == "/") {
						val = pVal2 / pVal1;
					} else {// "-"
						val = pVal2 - pVal1;
						if (decimalPlaces > 0) {// 정밀하지 않은 소수 계산 대응
							val = val.toFixed(decimalPlaces);
						}
					}
					result.iconClass = "down";
				}

				var iconParams = $.extend({}, pParams);
				iconParams.compareValue = undefined;
				var iconResult = $administStatsMain.util.toNumberString(val, iconParams);
				result.iconValue = iconResult.value;
				result.iconText = iconResult.text;
				result.iconOriginValue = iconResult.originValue;
			}

			var usingComma = (pParams.usingComma == undefined) ? true : pParams.usingComma;
			var tmpText;

			if (pParams.points != undefined) {
				var points = pParams.points;
				var point;		// 단위 포인트 (0: 1의 자리   3: 천의 자리)
				var decPlace;	// 소수 자리수
				var tmpPoint;
				var i;

				for (i = points.length - 1; i >= 0; i--) {
					tmpPoint = points[i].toString();
					if (tmpPoint.indexOf(",") >= 0) {
						tmpPoint = tmpPoint.split(",");
					} else if (tmpPoint.indexOf(".") >= 0) {
						tmpPoint = tmpPoint.split(".");
					}

					if (typeof tmpPoint == "object" && tmpPoint.length == 2) {
						point = parseInt(tmpPoint[0].trim());
						decPlace = parseInt(tmpPoint[1].trim());
					} else {
						point = parseInt(tmpPoint.trim());
						decPlace = 0;
					}

					if (decimalNum >= Math.pow(10, point)) {
						tmpText = (decimalNum / Math.pow(10, point)).toFixed(decPlace);
						if (usingComma) {
							tmpText = $administStatsMain.util.addComma(tmpText);
						}

						break;
					}
				}

				if (i >= 0 && pParams.units.length > i) {
					tmpText = tmpText + pParams.units[i];
				} else {
					if (usingComma) {
						tmpText = $administStatsMain.util.addComma(decimalNum);
					} else {
						tmpText = decimalNum.toString();
					}

					if (pParams.units.length > 0) {
						tmpText += pParams.units[0];
					}
				}
			}

			result.text = tmpText;
			result.originValue = pNumber;

			if (usingComma) {
				result.value = $administStatsMain.util.addComma(decimalNum);
			} else {
				result.value = decimalNum;
			}

			return result;
		},

		/**
		 * @name         : 드래그 설정
		 * @description  : 엘리먼트를 드래그 가능하도록 설정한다.
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 :
		 * @params	pElement : 자바스크립트 엘리먼트 객체
		 */
		dragElement : function (pElement) {
			var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

			if ($(pElement).find('.wrmHeader').length > 0) {
				$(pElement).find('.wrmHeader').each(function(){
					$(this)[0].onmousedown = dragMouseDown;
				})
			} else {
				pElement.onmousedown = dragMouseDown;
			}

			function dragMouseDown(e) {
				e = e || window.event;

				if (e.target.tagName == "SELECT")
					return;

				e.preventDefault();
				// get the mouse cursor position at startup:
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				// call a function whenever the cursor moves:
				document.onmousemove = elementDrag;
			}

			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
//				console.clear();
//				console.log("old=> pos1: " + pos1 + " pos2: " + pos2 + " pos3: " + pos3 + " pos4: " + pos4 + " offsetTop: " + pElement.offsetTop);
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;
//				console.log("new=> pos1: " + pos1 + " pos2: " + pos2 + " pos3: " + pos3 + " pos4: " + pos4 + " offsetTop: " + pElement.offsetTop);
				// set the element's new position:
				if ($(pElement).hasClass("dialog")) {
					if (pElement.offsetTop - pos2 <= 0) {
						pElement.style.top = "0px";
					} else {
						pElement.style.top = (pElement.offsetTop - pos2) + "px";
					}
				} else {
					if (pElement.offsetTop - pos2 <= $administStatsMain.ui.coordY) {
						pElement.style.top = $administStatsMain.ui.coordY + "px";
					} else {
						pElement.style.top = (pElement.offsetTop - pos2) + "px";
					}
				}
					pElement.style.left = (pElement.offsetLeft - pos1) + "px";

				if (pElement.style.left <= 0) {
					pElement.style.left = 0;
				}
			}

			function closeDragElement() {
				/* stop moving when mouse button is released:*/
				document.onmouseup = null;
				document.onmousemove = null;
			}
		},
	};

	$administStatsMain.event = {
			/**
			 * @name		 : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
			 * @date		 : 2018.09.01
			 * @author		 : ywKim
			 * @history 	 :
			 * @param
			 */
			setUIEvent: function() {
				console.log("$administStatsMain.event.setUIEvent() called.");
				$administStatsLeft.event.setUIEvent();
				var location = $administStatsMain.ui.getPosition();
				$administStatsMain.ui.getAreaSido(location[0]);
				//$administStatsMain.ui.getAreaSgg(location[0], location[1]);

				// 공통 기능 버튼 이벤트 추가 2020-10-22   START
				var body = $("body");

				/** 2020.10.29 [주형식] PDF저장, 프린트 버튼 기능 삭제 START*/
				// PDF저장
//				body.on("click", ".HpdfBtn", function(){
//					$administStatsMain.ui.pdfDown('#divContent',"테스트");
//				});

				// 출력버튼 이벤트
				//body.on("click", ".HprintBtn", function(){		// 2020.10.29 주석
				body.on("click", ".reportPrintBtn", function(){		// 2020.10.29 버튼 변경
					if($administStatsMain.ui.selectedThema == "상세"){
						if($administStatsDetail.ui.selectAdministStatsDataList[0] == undefined){
							commonAdministStats_alert("관심 주제 설정에 따른 총 조사 결과 목록을 선택 후 <br>클릭해 주십시오.");
							return;
						}
						else{
//							srvLogWrite('P0','01','06','01',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear);

							var survId = $administStatsDetail.ui.selectAdministStatsDataList[0].split("$")[0];
							$administStatsMain.ui.imageToCanvas("#"+survId+"", "$administStatsMain.ui.detailCanvas");
						}
					}
					else{
						if( $administStatsMain.ui.selectedThema=="어업" ){
						} else {
//							srvLogWrite('P0','01','06','01',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear);
						}
						$administStatsMain.ui.imageToCanvas("#divContent", "dash");
					}
				});
				/** 2020.10.29 [주형식] PDF저장, 프린트 버튼 기능 삭제 END*/
				// 공통 기능 버튼 이벤트 추가 2020-10-22   END
				// 차트 이미지 저장
				body.on("click", ".btn-img", function() {
					$administStatsMain.ui.imageToCanvas("#container", "dash");
					return false;

					const agent = navigator.userAgent.toLowerCase();
					if ((navigator.appName == "Netscape" && navigator.userAgent.search("Trident") != -1) || (agent.indexOf("msie") != -1)) {
						commonAdministStats_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br />발생하므로 크롬을 이용해 주시기 바랍니다.", function okFn(opt) {
							$("#commonAdministStats_popup_confirm_close").click();
						})
					} else {
						commonAdministStatsAdministStats_confirm("전체 차트를 저장하시겠습니까?", function okFn(opt) {
							// if ($.inArray($administStatsMain.ui.isThisBrowser, [
							// "Chrome", "Firefox", "Safari" ]) == -1) {
							//
							// $administStatsMain.ui.loading(true);
							//
							// Object.keys($administStatsMain.ui.chart).sort().forEach(function(chartId,
							// i) {
							// if ($("#" + chartId).find(".chart_none").length == 0)
							// {
							// const v_time = 2500 * (i == 0 ? 1 : i);
							// if (i == 0) {
							// AdministStatsChart.ui.exportingChart(chartId);
							// } else {
							// setTimeout(function() {
							// AdministStatsChart.ui.exportingChart(chartId);
							// if ((i + 1) ==
							// Object.keys($administStatsMain.ui.chart).length) {
							// setTimeout(function() {
							// $administStatsMain.ui.loading(false);
							// }, 2500);
							// }
							// }, v_time);
							// }
							// }
							// });
							// } else {
							for ( let chartId in $administStatsMain.ui.chart) {
								if ($("#" + chartId).find(".chart_none").length == 0) {
									AdministStatsChart.ui.exportingChart(chartId, true);
								}
							}
							// }
						});
					}
				});
				
				/* 사용가이드 */
				body.on("click", ".btn-guide", function() {
					srvLogWrite("S0","01","01","00","",""); //jrj 로그
					$("#DashTuto").show();
				});
				body.on("click", ".tuto_close_btn", function() {
					$(this).parent("div").hide();
				});
				
				/* 통계설명자료 */
				body.on("click", ".btn-statis", function() {
					let key = "";
					let str = $administStatsMain.ui.selectedThema;
					
					if(str.indexOf("신혼부부") != -1){
						key = "101082";
					}else if(str.indexOf("주택소유") != -1){
						key = "101080";
					}else if(str.indexOf("중장년층통계") != -1){
						key = "101087";
					}else if(str.indexOf("귀농어·귀촌인") != -1){
						key = "930002";
					}else if(str.indexOf("일자리 행정통계") != -1){
						key = "101074";
					}else if(str.indexOf("퇴직연금통계") != -1){
						key = "101084";
					}else if(str.indexOf("임금근로 일자리동향") != -1){
						key = "101088";
					}
					
					srvLogWrite("S0","01","02","00","",""); //jrj 로그

					if (!$administStatsMain.util.isEmpty(key)) {
						$administStatsMain.util.openPop("https://meta.narastat.kr/metasvc/svc/SvcMetaDcDtaPopup.do?orgId=101&confmNo=" + key + "&kosisYn=Y", "800");
					} else {
						commonAdministStats_alert("준비 중입니다.", function okFn(opt) {
							$("#commonAdministStats_popup_confirm_close").click();
						});
					}
				});

				// 2020.10.26   SNS 공유버튼 이벤트   START
				body.on("click", ".HshareBtn", function(){
					srvLogWrite("S0","01","05","00","",""); //jrj 로그
					
					var shareUrl = "";
					// https://sgissmart.iptime.org:9199/view/administStats/newlyDashLoc?year=2018&sido_cd=11&sgg_cd=230
					var baseUrl = window.location.protocol+"//"+window.location.host+"/view/administStatsDetail/";

					var themaStr = "";
					// 테마코드별로 URL 분기
					if($administStatsMain.ui.selectedThema == "인구"){
						themaStr = "newlyDash";
					}
					else if($administStatsMain.ui.selectedThema == "가구"){
						themaStr = "middlDash";
					}
					else if($administStatsMain.ui.selectedThema == "주택"){
						themaStr = "houseDash";
					}
					else if($administStatsMain.ui.selectedThema == "농업"){
						themaStr = "retunDash";
					}
					else if($administStatsMain.ui.selectedThema == "임업"){
						themaStr = "moresDash";
					}
					else if($administStatsMain.ui.selectedThema == "어업"){
						themaStr = "fisheryDash";
					}
					else if($administStatsMain.ui.selectedThema == "일자리 행정통계"){
						themaStr = "more1Dash";
					}
					else if($administStatsMain.ui.selectedThema == "퇴직연금통계"){
						themaStr = "more2Dash";
					}
					else if($administStatsMain.ui.selectedThema == "임금근로 일자리동향"){
						themaStr = "more3Dash";
					}

//					srvLogWrite('P0','01','07','00',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear+',adm_cd='+$administStatsMain.ui.selectedArea);

					// 선택된 지역(sido 2, sgg 3)
					if($administStatsMain.ui.selectedArea == '00'){
						shareUrl = baseUrl +  themaStr + "?year="+$administStatsMain.ui.selectedYear+"&type="+gv_type;
						// 테스트용 도메인과 같게
						//shareUrl = baseUrl +  themaStr;
					}else if($administStatsMain.ui.selectedArea.length == 2){
						shareUrl = baseUrl +  themaStr + "?year="+$administStatsMain.ui.selectedYear+"&sido_cd="+$administStatsMain.ui.selectedArea+"&type="+gv_type;
					}
					else if($administStatsMain.ui.selectedArea.length == 5){
						var sido = $administStatsMain.ui.selectedArea.substring(0,2);
						var sgg = $administStatsMain.ui.selectedArea.substring(2,5);
						shareUrl = baseUrl +  themaStr + "?year="+$administStatsMain.ui.selectedYear+"&sido_cd="+sido+"&sgg_cd="+sgg+"&type="+gv_type;
					}

					console.log("shareUrl = " + shareUrl);

					$('#shareUrl').val(shareUrl);


					var zIndex = 9999;
				    var modalItm = $('#commonSharepopup');

				    $commonChart.modalBg = "";
				    $commonChart.modalBg = $('<div>')
				    .css({
				        position: 'fixed',
				        zIndex: zIndex,
				        left: '0px',
				        top: '0px',
				        width: '100%',
				        height: '100%',
				        overflow: 'auto',
				        // 레이어 색갈은 여기서 바꾸면 됨
				        backgroundColor: 'rgba(0,0,0,0.4)'
				    })
				    .appendTo('body');

				    // 화면 중앙
				    modalItm.css({
				            position: 'fixed',
				            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
				            // 시꺼먼 레이어 보다 한칸 위에 보이기
				            zIndex: zIndex + 1,
				            // div center 정렬
				            top: '50%',
				            left: '50%',
				            transform: 'translate(-50%, -50%)',
				            msTransform: 'translate(-50%, -50%)',
				            webkitTransform: 'translate(-50%, -50%)'
				        })
					//modalItm.css($commonChart.modalCss); // 상단

					$('#commonSharepopup').show();
				});


				// 공유 팝업 닫기
				body.on("click", "#commonAdministStats_Sns_close", function(){ //2020.11.20[신예리] 웹접근성으로 인한 id 변경
					$('#shareUrl').val("");
					if($commonChart.modalBg != "") $commonChart.modalBg.remove();
					$('#commonSharepopup').hide();
				});
				
				// 공유 팝업 닫기
				body.on("click", "#commonTotSurv_Sns_close", function(){ //2020.11.20[신예리] 웹접근성으로 인한 id 변경
					$('#shareUrl').val("");
					if($commonChart.modalBg != "") $commonChart.modalBg.remove();
					$('#commonSharepopup').hide();
				});

				// 공유 팝업 닫기 버튼
				body.on("click", ".txtClose", function(){
					$('#shareUrl').val("");
					//bg.remove();
					$commonChart.modalBg.remove();
					$('#commonSharepopup').hide();
				});
				
				// 공유 팝업 url복사하기
				body.on("click", ".urlcopy", function(){
					copyToClipboard($('#shareUrl').val());
				});

				// 카카오버튼		kakao
				body.on("click", ".kakao", function(){
					try {
						//Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
						//Kakao.init('e1bea3f650531c34d75e356cdea5ecd1');  // 개개발
						Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');  // 2020.11.05 [주형식] 실운영으로 적용
					} catch(e) { }

//					var linkUrl = $('#shareUrl').val();
//					console.log("########## kakao linkUrl = " + linkUrl);
					Kakao.Auth.login({
						success : function(authObj) {
							// 2020.10.26 카카오 스토리
							var linkUrl = $('#shareUrl').val();
							console.log("로그인 success ########## kakao linkUrl = " + linkUrl);
							//var linkURL = window.location.protocol+"//"+window.location.host+contextPath+"/view/statsMe/statsMeMain?id="+p_hist_id;
							Kakao.API.request({
								url : '/v1/api/story/linkinfo',
								data : {
									url : encodeURIComponent(linkUrl)
								},
							}).then(function(res) {
								return Kakao.API.request( {
									url : '/v1/api/story/post/link',
									data : {
										link_info : res
									}
								});
							}).then(function(res) {
								return Kakao.API.request( {
									url : '/v1/api/story/mystory',
									data : { id : res.id },
									success: function(res) {
										commonAdministStats_alert("카카오스토리에 정상적으로 공유하였습니다.");
									},
									fail : function(error) {
										commonAdministStats_alert("카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
									}
								});
							});
						},
						fail : function(error) {
							commonAdministStats_alert("카카오스토리에 공유를 실패하였습니다.<br>("+error.error_description+")");
						}
					});
				});

				// 트위터 버튼 		twitter
				body.on("click", ".twitter", function(){
					var lv_url = $('#shareUrl').val();
					var lv_text = "[행정통계시각화]개인 관심주제에 맞는 공간통계정보를 제공합니다.";
					window.open("https://twitter.com/share?url="+encodeURIComponent(lv_url)+"&text="+encodeURIComponent(lv_text)+"&hashtags=");
					$('#commonAdministStats_popup_confirm_close').trigger('click');
				});

				// 페이스북		face
				body.on("click", ".face", function(){
					var lv_url = $('#shareUrl').val();
					console.log("lv_url = " + lv_url);
					//window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.protocol+"//"+window.location.host+contextPath+"view/administStats/newlyDash?year="+$administStatsMain.ui.selectedYear));
					var rtn = window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(lv_url));
					$('#commonAdministStats_popup_confirm_close').trigger('click');
				});

				// 네이버밴드 		band
				body.on("click", ".band", function(){
					var lv_url = $('#shareUrl').val();
					var rtn = window.open("https://band.us/plugin/share?body="+encodeURIComponent(lv_url)+"&route="+encodeURIComponent(lv_url));
					$('#commonAdministStats_popup_confirm_close').trigger('click');
				});
				// 2020.10.26   SNS 공유버튼 이벤트   END

				// 맵 이미지 저장
				body.on("click", ".downloadBtn", function(){
					var dash = "-";
					var saveNm =  $administStatsMain.ui.selectedThema;
					if($administStatsMain.ui.selectedArea == '00' || $administStatsMain.ui.selectedArea.length == 2){
						saveNm = saveNm + dash + $administStatsMain.ui.selectedYear + dash + $("#dash_sido option:selected").html();
					}
					else if($administStatsMain.ui.selectedArea.length == 5){
						saveNm = saveNm + dash + $administStatsMain.ui.selectedYear + dash + $("#dash_sido option:selected").html() + dash + $("#dash_sgg option:selected").html();
					}

//					srvLogWrite('P0','01','10','00',$administStatsMain.ui.selectedThema,'year='+$administStatsMain.ui.selectedYear+',targetId=map,adm_cd='+$administStatsMain.ui.selectedArea);

					$administStatsMain.ui.mapImageDown("#mapArea", saveNm);

				});

				/* 2020-11-26 [곽제욱] 툴팁 제거 START
				// 2020-10-27 [곽제욱] 좌측메뉴 mouseOver 시 툴팁 표출 이벤트 START
				body.on("mouseover", ".thema", function(event){
					var id = $(this).attr("id");
					var title = "";
					if(id=="detail"){
						title = "상세";
					} else if(id=="newlyMenu"){
						title = "인구";
					} else if(id=="middlMenu"){
						title = "가구";
					} else if(id=="houseMenu"){
						title = "주택";
					} else if(id=="retunMenu"){
						title = "농업"; //2020.10.28[신예리] 명칭 변경
					} else if(id=="moresMenu"){
						title = "임업";
					} else if(id=="fisheryMenu"){
						title = "어업";
					}
					var target = $(".chartCommontoolTip");
					$(target).css("display", "inline-block");
					$(target).css("position", "absolute");
					$(target).css("font-family", "NanumSquare")
					$(target).css("z-index", "5000");
					$(target).css("background-color", "rgb(255, 255, 255)")
					$(target).css("border", "1px solid #cecece")
					$(target).css("border-radius", "5px")
					$(target).css("padding", "10px")
					$(target).css("text-align", "center")
					$(target).css("left", event.pageX + 10 + "px")
					$(target).css("top", event.pageY +"px")
					$(target).html("<p style='padding-bottom: 0px; color: #3d4956;'>"+title+"</p>");
				});

				// 2020-10-27 [곽제욱] 좌측메뉴 mouseOver 시 툴팁 표출 이벤트 START
				body.on("mouseout", ".thema", function(event){
					$(".chartCommontoolTip").css("display", "none");
				});
				// 2020-10-27 [곽제욱] 좌측메뉴 mouseOver 시 툴팁 표출 이벤트 END
				2020-11-26 [곽제욱] 툴팁 제거 END */

				// 2020-11-09 [곽제욱] 툴팁영역 제외 클릭시 툴팁영역 삭제 추가 START
				body.on("click", function(e){
					if(!$(e.target).hasClass("helpToolTipDiv")&&!$(e.target).hasClass("moreInfoBtn")){
						$("#helpTooltip").hide();
					}
				});
				// 2020-11-09 [곽제욱] 툴팁영역 제외 클릭시 툴팁영역 삭제 추가 START

				// 2020-10-27 [곽제욱] helpToolTip 클릭시 unbind 이벤트 추가 START
				
				body.on("mouseover", ".moreInfoBtn", function(e) {
					let crDiv = document.createElement("div");
					crDiv.id = "administStatsHelpTooltip";
					$(crDiv).addClass("moreInfoTooltip");
					$(crDiv).html("시도를 선택하면 해당 지역의 시군구 지도를 확인할 수 있습니다.");
					
					$(document).find("body").append(crDiv);
				});
				body.on("mousemove", ".moreInfoBtn", function(e) {
					$("#administStatsHelpTooltip").css({ left: e.clientX + 20, top: e.clientY + 10});
				});
				body.on("mouseout", ".moreInfoBtn", function(e) {
					$("#administStatsHelpTooltip").remove();
				});

				body.on("mouseleave", "#helpTooltip", function(){
					//console.log("class 마우스 아웃");
					//$("#helpTooltip").hide();
				});
				// 2020-10-27 [곽제욱] helpToolTip 클릭시 unbind 이벤트 추가 END

				// 2020-11-25 [곽제욱] 상세초기화 toolTip 이벤트 추가 START
				body.on("mouseover", "#dtailInitBtn", function(event){
					var target = $(".chartCommontoolTip"); 		/** 2020-10-07 [곽제욱] 툴팁 수정 */
					$(target).css("display", "inline-block");
					$(target).css("position", "absolute");
					$(target).css("font-family", "NanumSquare")
					$(target).css("z-index", "5000");
					$(target).css("background-color", "rgb(255, 255, 255)")
					$(target).css("border", "1px solid #cecece")
					$(target).css("border-radius", "5px")
					$(target).css("padding", "10px")
					$(target).css("text-align", "center")
					$(target).css("left", event.pageX + 10 + "px")
					$(target).css("top", event.pageY +"px")
					$(target).html("<p style='padding-bottom: 0px; color: #3d4956;'>"+"검색조건 초기화"+"</p>");
				});

				body.on("mouseout", "#dtailInitBtn", function(event){
					$(".chartCommontoolTip").css("display", "none");
				});
				// 2020-11-25 [곽제욱] 상세초기화 toolTip 이벤트 추가 END


				/** 맵 분할 */
				body.on("click", "#mapDivision", function(){  //20211012
					//alert("맵 분할");
					$administStatsMain.ui.loading(true);
					$administStatsMap.ui.isLoading = true;
					var isMap2ContentShow =  $("#mapRgn_2").is(":visible");
					var searchGubun = "";

					var tbl_id = $("#modalSearchTitle option:selected").data('tbl_id');
					if(tbl_id == "DT_1NW1003" || tbl_id == "DT_1NW1005" || tbl_id == "DT_1NW1006" || tbl_id == "DT_1NW1014"|| tbl_id == "DT_1NW1016"
					 || tbl_id == "DT_1NW1017" || tbl_id == "DT_1NW1018" || tbl_id == "DT_1NW1020" || tbl_id == "DT_1NW1021" || tbl_id == "DT_1NW1022" || tbl_id == "DT_1NW1023"
					 || tbl_id == "DT_1NW1024" || tbl_id == "DT_1NW1025" || tbl_id == "DT_1NW1026" || tbl_id == "DT_1NW1027" || tbl_id == "DT_1NW1028" || tbl_id == "DT_1NW1029"
					 || tbl_id == "DT_1NW1030" || tbl_id == "DT_1NW1031" || tbl_id == "DT_1NW1035" || tbl_id == "DT_1NW2003" || tbl_id == "DT_1NW2011" || tbl_id == "DT_1NW2013"
					 || tbl_id == "DT_1NW2014" || tbl_id == "DT_1NW2015" || tbl_id == "DT_1NW2017" || tbl_id == "DT_1NW2018" || tbl_id == "DT_1NW2019" || tbl_id == "DT_1NW2020"
					  || tbl_id == "DT_1NW2021" || tbl_id == "DT_1NW2022" || tbl_id == "DT_1NW2023" || tbl_id == "DT_1NW2025" || tbl_id == "DT_1NW2026" || tbl_id == "DT_1NW2027"
					   || tbl_id == "DT_1NW2028" || tbl_id == "DT_1NW3003" || tbl_id == "DT_1NW3011" || tbl_id == "DT_1NW3013" || tbl_id == "DT_1NW3014" || tbl_id == "DT_1NW3015"
					    || tbl_id == "DT_1NW3017" || tbl_id == "DT_1NW3018" || tbl_id == "DT_1NW3019" || tbl_id == "DT_1NW3020" || tbl_id == "DT_1NW3021" || tbl_id == "DT_1NW3022"
					     || tbl_id == "DT_1NW3023" || tbl_id == "DT_1NW3025" || tbl_id == "DT_1NW3026" || tbl_id == "DT_1NW3027" || tbl_id == "DT_1NW3028") {
						searchGubun = "2";
					}else{
						searchGubun = "";
					}

					if(isMap2ContentShow){
						//분할되었으면
						$("#mapDivisionIcon1").css('display','none');
						$($('.map-conrol')[0]).animate({"right": '-=355'});
						$(".Map").eq(0).stop().animate({"width":"100%"},200, function() {
							$("#mapRgn_3").css('display','block');
							$("#mapRgn_2").css('display','none');
							$("#panel11").hide();
							$(".pancon11").hide();
							$("#panel21").hide();
							$("#panel31").hide();
							$("#panel32").hide();
							//$("#panel41").hide();
							$administStatsMap.ui.mapList[0].gMap._size['x'] = 1770;
						});

						$(".mapDiv").css('left', '696px');
						$(".mapDiv1").css('display', 'none');
						$("#mapRank").css('display','block');
						//$(".modal-location").css('display','block');
						$("#area_name").text('');
						$("#RankArea").text('전국 시도 '+sidoValuesDesc.length+'개 중');
						$("#RankProgress").attr('max', sidoValuesDesc.length).css('width', "170px").val('0');
						$houseDash.chartItmClick1 = "";
						$houseDash.polygonSelectedAreaNm1 = "";
						$houseDash.polygonSelectArea1 = "";
						//$houseDash.timeLineChartItmClick1 = "";
						$administStatsMap.ui.mapToggleId1 = '';
						$administStatsMap.ui.curMapId = 0;
						$houseDash.ponconText1 = "";

						setTimeout(function() {
							$administStatsMap.ui.isLoading = false;
							var chartOrd = $("#modalSearchTitle option:selected").val();
							var year = $("#modalSearchYear option:selected").val();
							if($administStatsMap.ui.mapToggleId.length == 2){
								drawCharts1(chartOrd ,$houseDash.polygonSelectArea, year);
								drawCharts2(chartOrd ,$houseDash.polygonSelectArea, year);
								drawCharts3(chartOrd ,$houseDash.polygonSelectArea, year);
								drawCharts4(chartOrd ,$houseDash.polygonSelectArea, year);
							}else if($administStatsMap.ui.mapToggleId.length == 5){
								drawChartsSgg1(chartOrd ,$houseDash.polygonSelectArea.substring(0, 2), $houseDash.polygonSelectArea.substring(2, 5), year);
								drawChartsSgg2(chartOrd ,$houseDash.polygonSelectArea.substring(0, 2), $houseDash.polygonSelectArea.substring(2, 5), year);
								drawChartsSgg3(chartOrd ,$houseDash.polygonSelectArea.substring(0, 2), $houseDash.polygonSelectArea.substring(2, 5), year);
								drawChartsSgg4(chartOrd ,$houseDash.polygonSelectArea.substring(0, 2), $houseDash.polygonSelectArea.substring(2, 5), year);
							}
							$administStatsMap.ui.mapList[0].mapMove([$administStatsMap.ui.mapList[0].center[0], $administStatsMap.ui.mapList[0].center[1]], $administStatsMap.ui.mapList[0].zoom, false);
							$administStatsMain.ui.loading($administStatsMap.ui.isLoading);
						},1000);
					}else{
						$(".Map").stop().animate({"width":"48%"},200, function() {
							for (var i=0; i<$administStatsMap.ui.mapList.length; i++) {
								if ($administStatsMap.ui.mapList[i] != null) {
									$administStatsMap.ui.mapList[i].update();
								}
							}
						});

						$("#mapDivisionIcon1").css('display','');
						//$("#mapRank").css('display','none');
						$("#mapRank").css('display','block');
						$(".modal-location").css('display','none');
						$($('.map-conrol')[0]).animate({"right": '+=355'});
						//$($('.map-conrol')[1]).animate({"right": '+=585'});
						$("#mapRgn_2").css('display','inline-block');
						$("#mapRgn_3").css('display','inline-block');
						//$("#panel11").show();
						//$("#panel21").show();
						//$("#panel31").show();
						//$("#panel41").show();
						$(".mapDiv").css('left', '326.5px');
						$(".mapDiv1").css('left', '1204px');
						$('.list-panel').animate({"left": '10'});
						
						$administStatsMap.ui.curMapId = 1;

						//지도생성
						if($administStatsMap.ui.mapList[1] == null){
							//heatMap 생성에 버그가 있음
							//맵이 완전히 생성되어 화면에 표출된 다음, heatMap을 생성해야 오류가 안남
							$administStatsMap.ui.createMap("mapRgn_2", 1);
						}

						//지도 분할시 맵 조회
						setTimeout(function() {
							modalSearchBtn();
						},1000);

					}

				});


			},
			/**
			 * @name		 : reSetUIEvent
			 * @description  : 이벤트 재정의
			 * 					기존 이벤트에 문제가 있는 경우
			 * 					최우선순위로 처리됨.
			 * @date		 : 2018.10.23
			 * @author		 : ywKim
			 * @history 	 :
			 * @param
			 */
			reSetUIEvent: function() {


				// legendInfo.js 의
				// $administStatsMain.util.popClose = function(){ $("body").on("click",".topbar>a, .hanClose",function(){ } }
				// 이벤트를 재정의
				// 팝업창의 우측 상단 닫기버튼 ('X') 실행오류 조치
				$('body').off('click','.topbar>a, .hanClose');
				$('body').on('click','.topbar>a, .hanClose',function(){

					if ($(this).attr("data-active") == "false") {
						return;
					}

					var $popBox = $(this).closest('.popBox');

					if ($popBox.parent().length == 1) {
						switch ($popBox.parent().attr('id').substr(0, 2)) {
						case 'ts':
						case 'vj':
						case 'sa':
						case 'ss':	// 2019.05.31[한광희] 일자리 통계분석 > 일자리현황 조회조건 팝업 변경으로 인한 오류로 변경:ssa → ss 로 변경
							$administStatsMain.ui.hideDialog('#' + $popBox.parent().attr('id'));
							break;
						default:
							$(this).closest(".popBox").hide();
						}
					} else {
						$(this).closest(".popBox").hide();
					}
				});
			},

			set : function (pEvent, pSender, pCallback) {
					$('body').off(pEvent, pSender);
					$('body').on(pEvent, pSender, pCallback);
			},
			/**
			 * @name		 : checkLabel
			 * @description  : 사용자 정의 라디오버튼/체크박스 를 체크한다.
			 * 					- 실제로는 라디오버튼/체크박스와 연결된 label을 체크하며
			 * 						여기에서는 label의 이미지를 변경하는 기능을 한다.
			 * 					- 기본 컨트롤은 숨겨져 있고 체크 컨트롤은 이미지를 사용함.
			 * 					- 컨트롤 배열 규칙
			 * 						1. 하나의 항목은 li 내부에 input - label 순서로 배치
			 * 						2. 다수의 항목은 ul 내부에 li 목록으로 배치
			 * 						3. ul 은 label 의 grandParent가 된다.
			 * 						4. input은 label의 for(input의 id)로 연결되어 있다.
			 * @date		 : 2018.11.08
			 * @author		 : ywKim
			 * @history 	 :
			 * @param pSelector	: 대상 객체 ($~) / 1 or more
			 * @param pParam1	: Index or Value or undefined
			 * 						- Index : 대상객체 목록의 인덱스 / 대상객체가 multi 인 경우
			 * 						- Value : true or false / 대상객체가 1개인 경우
			 * 						- undefined : 대상객체가 라디오버튼인 경우 값이 필요없다. 무조건 true이기 때문에
			 * @param pParam2	: Value or undefined
			 * 						- Value : 대상객체 목록의 인덱스에 해당하는 객체의 체크 값
			 * 									- true or false
			 * 						- undefined : 대상객체가 라디오버튼인 경우 값이 필요없다. 무조건 true이기 때문에
			 * 	※ 사용예
			 *		$administStatsMain.event.checkLabel($this);				// $this에 체크 / $this 는 라디오버튼
			 *		$administStatsMain.event.checkLabel($objList, 0);		// 라디오버튼 목록 $objList 의 0번째 라디오버튼 체크
			 *		$administStatsMain.event.checkLabel($that, false);		// $that에 체크해제 / $that 은 체크박스
			 *		$administStatsMain.event.checkLabel($objList, 1, true);	// 체크박스 목록 $objList 의 1번째 체크박스 체크
			 *  ※ html 예
			 *  	<ul>
			 *  		<li>
			 *  	 		<input type="radio" id="morning" name="cars" value="1" />
			 *  	 		<label for="morning">모닝</label>
			 *  		</li>
			 *			<li>
			 *				<input type="radio" id="carnival" name="cars" value="2" />
			 *				<label for="carnival">카니발</label>
			 *			</li>
			 *		</ul>
			 */
			checkLabel : function (pSender, pParam1, pParam2) {
				var pIndex;
				var pValue;

				if (typeof pParam1 == "number" && typeof pParam2 == "boolean") {
					pIndex = pParam1;
					pValue = pParam2;
				} else if (typeof pParam1 == "boolean" && pParam2 == undefined) {
					pValue = pParam1;
				} else if (pParam1 == undefined && pParam2 == undefined) {

				} else {
					return;
				}

				var $this = pSender;	// label

				if ($this == undefined) return;

				var $that = $this.prev();	// radio or check
				var $grandParent = null;	// radio's grand parent
				var name = "";				// radio's name

				// radio, check 가 없는 경우
				if ($that == undefined) return;

				var ck = false;

				if (pValue != undefined) {
					ck = !pValue;
				} else {
					ck = $this.hasClass("on");
				}

				// radio 인 경우 같은 이름의 radio 모두 체크 해제
				if ($that.attr("type") == "radio") {
					$grandParent = $that.parent().parent();	// ul / label의 parent의 parent
					name = $that.attr("name");				// 라디오버튼 이름 / for 그룹찾기

					if ($grandParent != undefined) {
						$grandParent.find("label").removeClass("on");
					} else {// 기본가정이 안 지켜졌을 경우 대비 / 같은 그룹의 라디오버튼을 모두 찾아 그 다음에 오는 라벨의 체크이미지를 없앤다.
						$(".workRoad input:radio[name='" + name + "']").each(function() {
							if ($(this).next() != undefined) {
								$(this).next().removeClass("on");
							}
						});
					}

					$this.addClass("on");
				} else {

					if (!ck){// check
						$this.addClass("on");
					} else {// uncheck
						$this.removeClass("on");
					}
				}
			},
			/**
			 * @name		 : setToolTip
			 * @description  : 툴팁 이벤트를 설정한다.
			 * @date		 : 2018.11.26
			 * @author		 : ywKim
			 * @history 	 :
			 * @param pSelector	: 대상 객체
			 */
			setToolTip : function (pSelector) {
				$(pSelector).tooltip({
					open: function( event, ui ) {
						var target = $(this);
						setTimeout(function() {
							$(".ui-tooltip .subj").text(target.attr("data-subj"));
							 ui.tooltip.css("max-width", "400px");
							 ui.tooltip.css("z-index", "100000");
						},100);

					},
					position: {
					      my: "left+10 top", at: "right top",
					      collision : "flip",
					      using: function( position, feedback ) {
					    	  if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
					    		  $( this ).css( position ).prepend("<span class='subj'></span>");
					    	  }else {
					    		  $( this ).css( position );
					    	  }

					          $( "<div>" )
					            .addClass( feedback.vertical )
					            .addClass( feedback.horizontal )
					            .appendTo( this );
					      }
					},
					content: function () {
						var title = $(this).attr("title");

						if (title != undefined) {
							title = title.replace(/&lt;p&gt;/gi, '');
							title = title.replace(/&lt;p&gt;/gi, '');
							title = title.replace(/&lt;/gi, '<');
							title = title.replace(/&gt;/gi, '>');
							title = title.replace(/&quot;/gi, '');
							$(this).attr("title", title);
						}
						return $(this).prop('title');
			        }
				});
			},
			/**
			 * @name         : setTileMapChart
			 * @description  : 차트 클릭시 변경되는 타일맵 차트
			 * @date         : 2020.09.09
			 * @author	     : juKwak
			 * @history 	 :
			 * @parameter	 : target - 대상 div, width - 넓이, height - 높이, surv_id - 조사id
			 */
			setTileMapChart : function(target, width, height, surv_id){
				return false;
				widthArray = [];
				heightArray = [];

				$("#itmDiv").html(""); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화
				$("#itmDiv").css("display", "none"); // 2020-10-26 [곽제욱] 메뉴변경시 itmDiv 초기화

				if($administStatsMain.ui.selectedLevel != "3" || $administStatsMap.ui.isAtdrc){
					// 지역별인구 영역을 초기화후 타일맵으로 변경
					$("#"+target).empty();
					$("#"+target).css("background-color", "white");
					// 선택한 지역코드
					var regionCd = $administStatsMain.ui.selectedArea;
					if(regionCd==null || regionCd==undefined){
						regionCd = '99';
					} else if(regionCd.length==2 && $administStatsMap.ui.mapToggleId!=null && $administStatsMap.ui.mapToggleId!=""){
						regionCd = '00';
					} else if(regionCd.length==5){
						// 행정시도 인지 비교
						$administStatsMap.ui.checkIsAtdrc(regionCd);
						if($administStatsMap.ui.isAtdrc){
							// 행정시도 이면서 지도 선택인 경우는 상위지역(시도레벨) 조회(타일맵 변경 없음)
							if($administStatsMap.ui.mapToggleId!=null && $administStatsMap.ui.mapToggleId!="" && gv_type != "locgov" && gv_type!="totmiddlLocgov" && gv_type!="totPeopleLocgov"){ // 2020-11-09 [곽제욱] parameter 분기처리 추가
								regionCd = regionCd.substring(0,2);
							// 아닌경우는 타일맵 변경
							} else {
								regionCd = regionCd;
							}
						}

						else{
							// 행정시도가 아닐경우 상위지역 체크
							$administStatsMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
							// 상위지역이 행정시도인 경우 행정시도로 다시 검색
							if($administStatsMap.ui.isAtdrc){
								regionCd = regionCd.substring(0,4)+"0";
							// 행정시도가 아닐경우 시도로 검색
							} else {
								regionCd = regionCd.substring(0,2);
								$administStatsMap.ui.isAtdrc = false;
							}
						}
					}


					// 선택년도
					var year = $administStatsMain.ui.selectedYear;
					if(surv_id == "" || surv_id == null || surv_id == undefined){
						surv_id = "PH0001";
					}
					// 선택한 itmCd
					var itm_cd = $administStatsMap.ui.selectedItmCd;
					if(itm_cd == "" || itm_cd == null || itm_cd == undefined){
						itm_cd = "T100";
					}

					// C1
					/** 2020-10-15 [곽제욱] 각 주제별 타일맵 변수 초기화 START */
					if(target == "areaPopulation"){
						itm_cd = "T100";
					}
					/** 2020-10-15 [곽제욱] 각 주제별 타일맵 변수 초기화 END */

					if(target == "areaFishery" ){
						var c1 = $administStatsMap.ui.selectedC1;
						if(c1 == "" || c1 == null || c1 == undefined){
							c1 = "000";
						}
						itm_cd = "T00"; //20201110 박은식 어업 인구에서 가구로 변경 START
					}
					//20201019 박은식 주택 일 경우 itm_cd 변경 START
					if(target == "areaHouse"){
							itm_cd = "T310";
					}
					if(target == "areamiddl" ){
						var c1 = $administStatsMap.ui.selectedC1;
						if(c1 == "" || c1 == null || c1 == undefined){
							c1 = "000";
						}
						itm_cd = 'T00'; // 2020-11-19 [곽제욱] 농업 인구에서 가구로 변경
						$administStatsMap.ui.selectedC1 = c1;
						$administStatsMap.ui.selectedItmCd = itm_cd;
					}
					//20201019 박은식 주택 일 경우 itm_cd 변경 END

					// 2020-10-13 임업 대쉬보드 추가 START jhs
					if(target == "areaForestry" ){
						var c1 = $administStatsMap.ui.selectedC1;
						if(c1 == "" || c1 == null || c1 == undefined){
							c1 = "000";
						}
					}
					// 2020-10-13 임업 대쉬보드 추가 END jhs

					$.ajax({
						method: "POST",
						async: false,	// 반드시 동기처리 해야 함
						url: contextPath + "/ServiceAPI/administStats/newlyDash/getTotAreaPopulation.json", // 공통쿼리로 수정필요
						data: { year: year, region_cd : regionCd, surv_id : surv_id, itm_cd : itm_cd, isAtdrc:$administStatsMap.ui.isAtdrc, c1:c1}, //
						dataType: "json",
						success: function(res) {
							if (res.errCd == "0") {
								var data = res.result.areaData;
								$administStatsMain.ui.sidoMaxRank = res.result.maxRank[0].cnt;
								$administStatsMain.ui.sggEmdongMaxRank = res.result.maxRank[1].cnt;
								// 행정자치시(수원시 등) 랭킹
								$administStatsMain.ui.atdrcRank = res.result.maxRank[2].cnt;
								// set the dimensions and margins of the graph
								var margin = {top: 0, right: 0, bottom: 0, left: 0},
									width = 288 - margin.left - margin.right,
									height = 250 - margin.top - margin.bottom;

								// opacity(불투명도) 측정을 위한 최대도메인, 최소도메인 계산
								// data[0].dt 는 tree map 를 위한 부모데이터, 1번부터 최대길이까지 값 정렬
								var mindomain = data[1].dt;
								var maxdomain = data[data.length-1].dt;

						        var total = 0;
						        /** 2020.10.12[곽제욱] 타일차트 NaN 처리 START */
						        for(var i=0; i<data.length; i++){ //20201013 박은식 반복문 i가 1부터 시작하여 첫번째 데이터를 합산 안하여 0으로 변경
						        	total += Number(data[i].dt);
						        }
						        /** 2020.10.12[곽제욱] 타일차트 NaN 처리 END */

								// And a opacity scale
							    var opacity = d3.scaleLinear()
								    .domain([mindomain, maxdomain])
								    .range([1,.5])

								// append the svg object to the body of the page
								var svg = d3.select("#"+target)
									.append("svg")
									.attr("width", width + margin.left + margin.right)
									.attr("height", height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
									.style("cursor", "pointer"); // 2020.10.26[신예리]마우스 포인터 추가

								// stratify the data: reformatting for d3.js
								var root = d3.stratify()
									.id(function(d) { return d.region_cd; })   // Name of the entity (column name is name in csv)
									.parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
									(data);
									root.sum(function(d) { return +d.dt })   // Compute the numeric value for each entity

								// Then d3.treemap computes the position of each element of the hierarchy
								// The coordinates are added to the root object above
								d3.treemap()
								   .size([width, height])
								   .padding(1)
								   (root);

								var tool = $(".TileMaptoolTip"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
								// use this information to add rectangles:
								svg
									.selectAll("rect")
								    .data(root.leaves())
								    .enter()
								    .append("rect")
								    .attr('x', function (d) { return d.x0; })
								    .attr('y', function (d) { return d.y0; })
								    .attr('width', function (d) { widthArray.push(d.x1 - d.x0); return d.x1 - d.x0; })
								    .attr('height', function (d) { heightArray.push(d.y1-d.y0); return d.y1 - d.y0; })
								    .attr('value', function(d) { return d.data.region_cd; })
								    .attr('fill', function(d) {
								    	for(var i=0; i<$administStatsMain.ui.tilePerColor.length; i++){
								    		if(d.data.region_cd == $administStatsMain.ui.tilePerColor[i].adm_cd){
								    			return $administStatsMain.ui.tilePerColor[i].color;
								    		}
								    	}
								    })
								    .on("click", function(){ // click 이벤트
									    //20210222 박은식 총조사인구 차트선택 이후 타일맵 클릭 시 초기화 START
								    	if($administStatsMap.ui.selectedPK != undefined &&
								    	   $administStatsMap.ui.selectedPK != null &&
								    	   $administStatsMap.ui.selectedPK != "" &&
								    	   $administStatsMap.ui.selectedPK.attr("id") == "totalPopulation") {
								    		for(var i=0; i < $(".yearBtn").length; i++){
											    if($(".yearBtn").eq(i).hasClass("on")){
											    	$administStatsMain.ui.selectedYear = $(".yearBtn").eq(i).text();
											    }
											}
								    	}
								    	//20210222 박은식 총조사인구 차트선택 이후 타일맵 클릭 시 초기화 END
								    	$administStatsMain.ui.tileChangeYn = "Y";
								    	var region_cd = d3.select(this).attr('value');
								    	$administStatsMain.ui.selectedArea = region_cd; // 선택한 지역코드를 selectedArea 에 세팅
								    	//$administStatsMap.ui.map.setPolyLayerHighlight(""); // 2020-10-12 [곽제욱] 하이라이트 초기화
								    	$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight(""); // 2020-10-12 [곽제욱] 하이라이트 초기화
								    	$administStatsMap.ui.mapToggleId = ""; // 맵토글 ID 초기화


								    	var params = 'year='+$administStatsMain.ui.selectedYear+',region_cd='+region_cd;
								    	if( $administStatsMain.ui.selectedThema === '인구' ){
//								    		srvLogWrite('P0','02','03','01',$administStatsMain.ui.selectedThema,params);
								    	} else if( $administStatsMain.ui.selectedThema === '중장년층' ){
//								    		srvLogWrite('P0','04','03','01',$administStatsMain.ui.selectedThema,params);
								    	} else if( $administStatsMain.ui.selectedThema === '주택소유' ){
//								    		srvLogWrite('P0','05','03','01',$administStatsMain.ui.selectedThema,params);
								    	} else if( $administStatsMain.ui.selectedThema === '귀농·귀어·귀촌' ){
//								    		srvLogWrite('P0','06','04','01',$administStatsMain.ui.selectedThema,params);
								    	} else if( $administStatsMain.ui.selectedThema === '통계더보기' ){
//								    		srvLogWrite('P0','07','04','01',$administStatsMain.ui.selectedThema,params);
								    	} else if( $administStatsMain.ui.selectedThema === '어업' ){
								    	}

								    	// 2020-10-26 [곽제욱] 어가 해수면/내수면 분기처리 START
								    	if($administStatsMain.ui.selectedThema == "어업"){
								    		if($administStatsMain.ui.selectedYear == "2015"){
													$administStatsMap.ui.selectedSurvId = "FS0171";

											} else if($administStatsMain.ui.selectedYear == "2010"){
													$administStatsMap.ui.selectedSurvId = "FS0469";
											}
								    	}
					    				// 2020-10-26 [곽제욱] 어가 해수면/내수면 분기처리 END
								    	// 시도에서 rect 각 인구 클릭시  지도에서 해당지역 경계 재검색
								    	if(region_cd.length == 2){
								    		$administStatsMain.ui.selectedLevel = "1";
								    		$administStatsMain.ui.getSidoSggPos(region_cd);
								    		$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
								    		$administStatsMap.ui.selectedC1 = "";
								    		$administStatsMap.ui.selectedC2 = "";
								    		if($administStatsMain.ui.selectedThema == "인구"){
									    		$administStatsMap.ui.selectedItmCd = "T100";
									    		$administStatsMap.ui.selectedSurvId = "PH0001";
								    		}
								    		else if($administStatsMain.ui.selectedThema == "가구"){
								    			$administStatsMap.ui.selectedItmCd = "T200";
									    		$administStatsMap.ui.selectedSurvId = "PH0001";
								    		}
								    		else if($administStatsMain.ui.selectedThema == "주택"){
								    			$administStatsMap.ui.selectedItmCd = "T310";
									    		$administStatsMap.ui.selectedSurvId = "PH0001";
									    		$houseDash.event.allChange(region_cd, "1");
									    		$houseDash.ui.getRankSet("", "",region_cd);//20201020 박은식 주택 대시보드에서 타일차트 클릭 시 슬라이드 셋팅
								    		}
								    		else if($administStatsMain.ui.selectedThema == "농업"){
								    			$administStatsMap.ui.selectedC1 = "000";
								    			//$administStatsMap.ui.selectedItmCd = "T01";
								    			$administStatsMap.ui.selectedItmCd = "T00";    // 2020.11.10 주형식 가구수로 변경
									    		if($administStatsMain.ui.selectedYear == "2015"){
								    				$administStatsMap.ui.selectedSurvId = "FS0013";
								    			} else if($administStatsMain.ui.selectedYear == "2010"){
								    				$administStatsMap.ui.selectedSurvId = "FS0315";
								    			}
								    		}
								    		// 2020-10-13 임업대쉬보드 추가 START jhs
								    		else if($administStatsMain.ui.selectedThema == "임업"){
								    			$administStatsMap.ui.selectedC1 = "000";
								    			$administStatsMap.ui.selectedItmCd = "T00"; // 2020-11-17 [곽제욱] 임업 itm_cd 수정 T01->T00
									    		if($administStatsMain.ui.selectedYear == "2015"){
								    				$administStatsMap.ui.selectedSurvId = "FS0235";
								    			} else if($administStatsMain.ui.selectedYear == "2010"){
								    				$administStatsMap.ui.selectedSurvId = "FS0532";
								    			}
								    		}
								    		// 2020-10-13 임업대쉬보드 추가 END jhs
								    		else if($administStatsMain.ui.selectedThema == "어업"){
								    			$administStatsMap.ui.selectedC1 = "000";
								    			$administStatsMap.ui.selectedItmCd = "T00"; //20201110 박은식 어업 itm_cd 변경
//								    			/** 2020-10-26 [곽제욱] 해수면/내수면 분기로 인한 주석처리 START */
								    			/** if($administStatsMain.ui.selectedYear == "2015"){
							    					$administStatsMap.ui.selectedSurvId = "FS0112";
								    			} else if($administStatsMain.ui.selectedYear == "2010"){
							    					$administStatsMap.ui.selectedSurvId = "FS0413";
								    			} */
								    			/** 2020-10-26 [곽제욱] 해수면/내수면 분기로 인한 주석처리 START */
								    		}
								    		$administStatsMain.ui.tilePerColor.length = 0; // 2020-11-11 [곽제욱] 범례색상 배열 초기화
								    	}
								    	// 시군구 데이터 일 경우 kosis정보 호출
								    	else if(region_cd.length == 5){
								    		$administStatsMain.ui.selectedArea = region_cd;
								    		$administStatsMain.ui.getSidoSggPos(region_cd);
								    		$("#dash_sido").val(region_cd.substring(0,2));
								    		// 선택한 지역 하이라이트
								    		//$administStatsMap.ui.map.setPolyLayerHighlight(region_cd);
								    		// 인구....
								    		// 비자치 구인지 체크한다.
								    		$administStatsMap.ui.checkIsAtdrc(region_cd);
								    		if($administStatsMap.ui.isAtdrc != true){
								    			// 2020-11-12 [곽제욱] 최하레벨 tileMap 선택시 색상변경 로직 START
								    			if($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea){
								    				for(var i=0; i<$administStatsMain.ui.tilePerColor.length; i++){
								    					if($administStatsMain.ui.tilePerColor[i].adm_cd != $administStatsMain.ui.selectedArea){
								    						var tempAdmCd = $administStatsMain.ui.tilePerColor[i].adm_cd;
								    						var tempColor = $administStatsMain.ui.tilePerColor[i].color;
								    						$("rect[value='"+tempAdmCd+"']").attr("fill", tempColor);
								    					} else {
								    						$("rect[value='"+$administStatsMain.ui.selectedArea+"']").attr("fill", "#0086c6");
								    					}
								    				}

								    			} else {
								    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 START
								    				var tempColor = '';
								    				for(var i=0;i < $administStatsMain.ui.tilePerColor.length; i++){
								    					if($administStatsMain.ui.tilePerColor[i].adm_cd == $administStatsMap.ui.mapToggleId){
								    						tempColor = $administStatsMain.ui.tilePerColor[i].color
								    					}
								    				}
								    				//var tempColor = $administStatsMain.ui.tilePerColor.find(function(x) {return x.adm_cd == $administStatsMap.ui.mapToggleId}).color;
								    				//20201118 박은식 IE에서 find() 미지원으로 변경 처리 END
								    				$("rect[value='"+$administStatsMap.ui.mapToggleId+"']").attr("fill", tempColor);
								    			}
								    			// 2020-11-12 [곽제욱] 최하레벨 tileMap 선택시 색상변경 로직 END
								    			if($administStatsMain.ui.selectedThema == "인구"){
								    				//$administStatsMain.ui.selectedLevel = "3";  // 2020-10-12 [곽제욱] 주석처리후 selectedLevel 변경은 mapApi 에서 처리
								    				//$administStatsMapApi.request.openApiSearchPopulation(region_cd); // 2020-10-15 [곽제욱] 공간정보서비스과 요청으로 읍면동 조회 주석처리
								    				// 개방형 지도 호출 후 처리하도록 수정 (2020-010-06) administStatsMapApi로 소스이동
								    				/** 2020-10-15 [곽제욱] 개방형지도 데이터조회 주석처리후 차트변경, 이후 개방형지도 open시 해당부분 삭제처리 필요 START */
													// 인구 읍면동 경계 조회 함수
													/*2020-10-06 administStatsMain 로직 분기 */
								    				$administStatsMain.ui.tileChangeYn = "N";
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				if($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea) {
														// 선택한 지역 하이라이트
											    		//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
													} else {
														//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapToggleId = "";
													}
													$administStatsMap.ui.checkIsAtdrc($administStatsMain.ui.selectedArea.substring(0,4)+"0");
								    				/** 2020-10-15 [곽제욱] 개방형지도 데이터조회 주석처리후 차트변경, 이후 개방형지도 open시 해당부분 삭제처리 필요 END */
								    			}
								    			else if($administStatsMain.ui.selectedThema == "가구"){
								    				/** 2020-10-20 [곽제욱] 가구쪽 개방형지도 클릭시 이벤트 수정 START */
								    				$administStatsMain.ui.tileChangeYn = "N";
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				if($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea) {
														// 선택한 지역 하이라이트
											    		//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
													} else {
														//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapToggleId = "";
													}
													$administStatsMap.ui.checkIsAtdrc($administStatsMain.ui.selectedArea.substring(0,4)+"0");
								    				/** 2020-10-20 [곽제욱] 가구쪽 개방형지도 클릭시 이벤트 수정 END */
								    			}
								    			else if($administStatsMain.ui.selectedThema == "주택"){
								    				//20201019 박은식 타일차트 클릭 시 로직 수정 START
								    				$administStatsMain.ui.tileChangeYn = "N";
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				if($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea) {
														// 선택한 지역 하이라이트
											    		//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
													} else {
														//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapToggleId = "";
													}
													$administStatsMap.ui.checkIsAtdrc($administStatsMain.ui.selectedArea.substring(0,4)+"0");
													$houseDash.event.allChange($administStatsMain.ui.selectedArea, "2"); // 맵이동 없음
								    				//20201019 박은식 타일차트 클릭 시 로직 수정 END
								    			}
								    			else if($administStatsMain.ui.selectedThema == "어업"){

								    				//20201026 박은식 타일차트 클릭 시 로직 수정 START
								    				$administStatsMain.ui.tileChangeYn = "N";
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				if($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea) {
														// 선택한 지역 하이라이트
											    		//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
													} else {
														//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapToggleId = "";
													}
													$administStatsMap.ui.checkIsAtdrc($administStatsMain.ui.selectedArea.substring(0,4)+"0");
								    				//20201026 박은식 타일차트 클릭 시 로직 수정 END
								    			}
								    			else if($administStatsMain.ui.selectedThema == "농업"){
								    				// 2020-10-29 [곽제욱] 농업 타일차트 클릭 로직 수정 START
//								    				$administStatsMain.ui.tileChangeYn = "N";
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				if($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea) {
														// 선택한 지역 하이라이트
											    		//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
													} else {
														//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapToggleId = "";
													}
													$administStatsMap.ui.checkIsAtdrc($administStatsMain.ui.selectedArea.substring(0,4)+"0");
								    				// 2020-10-29 [곽제욱] 농업 타일차트 클릭 로직 수정 END
								    				// TODO::
								    			}
								    			// 2020-10-13 임업 대쉬보드 추가 START jhs
								    			else if($administStatsMain.ui.selectedThema == "임업"){
								    				//20201019 박은식 타일차트 클릭 시 로직 수정 START
								    				$administStatsMain.ui.tileChangeYn = "N";
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				if($administStatsMap.ui.mapToggleId != $administStatsMain.ui.selectedArea) {
														// 선택한 지역 하이라이트
											    		//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
											    		$administStatsMap.ui.mapToggleId = $administStatsMain.ui.selectedArea;
													} else {
														//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapList[$administStatsMap.ui.curMapId].setPolyLayerHighlight($administStatsMain.ui.selectedArea);
														$administStatsMap.ui.mapToggleId = "";
													}
													$administStatsMap.ui.checkIsAtdrc($administStatsMain.ui.selectedArea.substring(0,4)+"0");
								    				//20201019 박은식 타일차트 클릭 시 로직 수정 END
								    			}
								    			// 2020-10-13 임업 대쉬보드 추가 END jhs
								    			var title = $("#dash_sgg option:selected").html(); // 2020-10-26 [곽제욱] 선택지역 변경
												$("#areaDiv").html(title); // 2020-10-26 [곽제욱] 선택지역 영역 totPeopleNumber -> areaDiv 로 변경
								    			// 개방형지도란 버튼 비활성화
								    			$(".mapInfo").show();

							    				// 2020-11-30 [곽제욱] 최하레벨 타일맵 클릭시 Navigation 변경 START
						    					if($administStatsMain.ui.selectedArea.substring(4,5)=="0"){
													$administStatsMain.ui.pathChange("atdrc", $administStatsMain.ui.selectedArea);
												} else {
													$administStatsMain.ui.pathChange("emdong", $administStatsMain.ui.selectedArea);
												}
						    					// 2020-11-30 [곽제욱] 최하레벨 타일맵 클릭시 Navigation 변경 END
								    		}
								    		else{
								    			console.log("#########################   비자치구 클릭됨     ##############");
								    			$administStatsMain.ui.selectedLevel = "2"; // 선택레벨 3으로 세팅(슬라이드 삭제)
								    			$administStatsMain.ui.chartSaveClear(); // 2020-10-15 [곽제욱] 선택된 차트항목 초기화
								    			if($administStatsMain.ui.selectedThema == "인구"){
								    				$administStatsMap.ui.mapRegion = "sgg";
								    			}
								    			else if($administStatsMain.ui.selectedThema == "가구"){
//								    				alert(">>>>>> 가구.... 비자치구..........");
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				// TODO::
								    			}
								    			else if($administStatsMain.ui.selectedThema == "주택"){
//								    				alert(">>>>>> 주택.... 비자치구..........");
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				// TODO::
								    				$houseDash.event.allChange(region_cd, "1");
								    			}
								    			else if($administStatsMain.ui.selectedThema == "어업"){
//								    				alert(">>>>>> 어업.... 비자치구..........");
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				// TODO::
								    			}
								    			else if($administStatsMain.ui.selectedThema == "농업"){
//								    				alert(">>>>>> 어업.... 비자치구..........");
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				// TODO::
								    			}
								    			// 2020-10-13 임업 대쉬보드 추가 START jhs
								    			else if($administStatsMain.ui.selectedThema == "임업"){
//								    				alert(">>>>>> 어업.... 비자치구..........");
								    				$administStatsMap.ui.mapRegion = "sgg";
								    				// TODO::
								    			}
								    			// 2020-10-13 임업 대쉬보드 추가 END jhs
								    			$administStatsMain.ui.tilePerColor.length = 0; // 2020-11-11 [곽제욱] 범례색상 배열 초기화
								    		}
								    		//$administStatsMain.ui.selectedLevel = '3'; // 2020-10-15 [곽제욱] 개방형지도 기능 막기로 으로 인한 주석처리, 추후 개방형지도 기능 open시 주석 제거 필요
								    		//$administStatsMap.ui.map.setPolyLayerHighlight($administStatsMain.ui.selectedArea); // 2020-10-06 [곽제욱] 타일차트 클릭시 하이라이트 설정 제거
								    		if($administStatsMain.ui.selectedThema == "인구"){
								    		}
								    		//20201019 박은식 주택 추가 START
								    		else if($administStatsMain.ui.selectedThema == "주택"){
								    			$houseDash.ui.getRankSet("", "",region_cd)
								    		}
								    		else if($administStatsMain.ui.selectedThema == "가구"){
								    		}
								    		else if($administStatsMain.ui.selectedThema == "농업"){
								    		}
								    		//20201019 박은식 주택 추가 END
					    					//20201022 박은식 임업, 어업 분기 추기 START
								    		else if($administStatsMain.ui.selectedThema == "임업"){
								    		}
								    		else if($administStatsMain.ui.selectedThema == "어업"){
								    		}
											//20201022 박은식 임업, 어업 분기 추기 END
								    	}
								    })
								    .on("mouseover", function(d) { // 마우스 over 이벤트
								    	$administStatsMain.ui.tempColor = $(this).attr("fill");

								    	d3.select(this)
								    	.attr("fill", "#576574"); // 2020.11.05 [신예리] 타일맵 마우스 over 이벤트 컬러 변경
								    	/** 2020-10-13 [곽제욱] 툴 속성 변경 START */
								        tool.css("left", d3.event.pageX + 10 + "px")
								        tool.css("top", d3.event.pageY + 20 + "px")
								        tool.css("display", "inline-block");
								        /** 2020-10-13 [곽제욱] 툴 속성 변경 END */
								        //var irdsrate = parseFloat(d.data.irdsrate);

								        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 START
								        var ratio = 0;
								        if(total != 0 && total !=""){
								        	ratio = (d.data.dt / total * 100).toFixed(2)
								        } else {
								        	ratio = 100;
								        }

								        /*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 START*/
								        var unit = "";
								        if($administStatsMain.ui.selectedThema == "인구"){ //20201022 어업, 농업 조건문 추가 //20201111 박은식 농업 어업 명->가구 변경
								        	unit = "명"
								        } else if($administStatsMain.ui.selectedThema == "주택"){
								        	unit = "호"// 20201028 박은식 단위변경
								        } else if($administStatsMain.ui.selectedThema == "가구" || $administStatsMain.ui.selectedThema == "임업" || $administStatsMain.ui.selectedThema == "어업" || $administStatsMain.ui.selectedThema == "농업"){	// 2020.11.09[한광희] 임업 가구로 단위 변경  //20201111 박은식 농업 어업 명->가구 변경
								        	unit = "가구"
								        }
								        /*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 END*/

								        //2020-10-13 [곽제욱] ratio 가 infinity 인 예외사항 처리 END
								        //2020.10.13[신예리] 타일맵 툴팁 스타일 수정
								        tool.html("<p style='padding-bottom: 5px; border-bottom: 1px solid #ddd; color: #3d4956;'>" + d.data.region_nm + "</p>" + "<p style='color:#0982d8; font-weight: 700; display: inline-block; margin-top: 5px; padding-right: 3px;'>" + numberFormat(d.data.dt) + "</p>" + unit + "<br>" + "<p style='color:#EE3520; font-weight: 700; display: inline-block; margin-top: 3px; padding-right: 3px;'>" + numberFormat(ratio) + "</p>" + "%"); /*20201020 박은식 각 대시보드  tile chart tooltip unit 셋팅 */
								    })
								    .on("mouseout", function(d) { // 마우스 out 이벤트
								    	// 2020-11-11 [곽제욱] 선택된 타일맵 색상 유지 START
								    	if(d3.select(this).attr("fill")!="#0086c6"){
									    	d3.select(this)
									    	.attr("fill", $administStatsMain.ui.tempColor) // 2020-09-04 [신예리] 타일맵 마우스 out 이벤트 컬러 변경
									    	.attr("opacity", function(d){return opacity(d.data.dt)})
								    	}
								    	// 2020-11-11 [곽제욱] 선택된 타일맵 색상 유지 END
								    	tool.css("display", "none"); // 2020-10-13 [곽제욱] 툴팁영역 생성에서 초기화로 변경
								    })
								    .style("stroke", "")
								    .style("opacity", function(d){return opacity(d.data.dt)});
								// and to add the text labels
								svg
								    .selectAll("text")
								    .data(root.leaves())
								    .enter()
								    .append("text")
								    .attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
								    .attr('value', function(d) { return d.data.region_cd; })
								    .attr("x", function(d){ return d.x0+1})    // +10 to adjust position (more right)
								    .attr("y", function(d){ return d.y0+15})    // +20 to adjust position (lower)
								    .attr("width", function() {
								    	// 2020-11-18 [곽제욱] 각 지역명 text width에 맞게 로직변경 START
								    	var thema = $administStatsMain.ui.selectedThema;
								    	var divName = "";
								    	if(thema == "인구"){
								    		divName = "areaPopulation";
								    	} else if(thema == "가구"){
								    		divName = "areaHouseHold";
								    	} else if(thema == "주택"){
								    		divName = "areaHouse";
								    	} else if(thema == "농업"){
								    		divName = "areamiddl";
								    	} else if(thema == "임업"){
								    		divName = "areaForestry";
								    	} else if(thema == "어업"){
								    		divName = "areaFishery";
								    	}
								    	var i = $("#"+divName+"").find("text").index(this);
								    	var maxWidth = $("#"+divName+"").find("rect").eq(i).width();
								    	// 2020-11-18 [곽제욱] 각 지역명 text width에 맞게 로직변경 END
								    	return maxWidth - 1;
								    })
								    .text(function(d){ return d.data.region_nm})
								    .attr("font-size", "10px")
								    .attr("fill", "white");


									svg
									.selectAll("text")
									.call(tileMapWordWrap, "")
							}
						},
						error: function(e) {
							alert('failed');
						},
						complete : function(e){

						}
					});
				}
			},

			/** 2020-10-13 [주형식] 년도별 지역코드 확인(체크) 추가 START */
			/**
			 * @name         : getYearRegionCheck
			 * @description  : 년도별 지역코드 확인(체크)
			 * @date         : 2020.10.12
			 * @author	     : hsJu
			 * @history 	 :
			 * @parameter	 : target - year 기준년도, sido_cd - 시도코드, sgg_cd - 시군구
			 * @rslt         : 해당년도에 있으면 true, 없으면 false
			 */
			getYearRegionCheck : function(year, sido_cd, sgg_cd){
				var rslt = false;

				// ajax 시작
				$.ajax({
					method: "POST",
					async: false,	// 반드시 동기처리 해야 함
					url: contextPath + "/ServiceAPI/administStats/common/getYearRegionCheck.json",
				    data: {"year":year, "sido_cd":sido_cd, "sgg_cd":sgg_cd},
					dataType: "json",
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						console.log("################# res = " + res.result.rslt);
						if(res.result.rslt == true){
							rslt = true;
						}
					}
				});

				return rslt;
			}
			/** 2020-10-13 [주형식] 년도별 지역코드 확인(체크) 추가 END */
	};
}(window, document));


/**
 * 데이터 타입 Date에 yyyymmdd() 함수 추가
 *
 * 	2019.01.07	ywKim	변경: 년월일 구분자 추가하는 로직 추가
 *
 * $param	pSign : 년월일을 구분하는 기호
 * @returns 날짜의 yyyymmdd 포맷의 문자열
 */
Date.prototype.yyyymmdd = function(pSign) {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	var dateStr = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');

	if (pSign == undefined) {
		return dateStr;
	}

	var date = dateStr.substring(0, 4) + pSign + dateStr.substring(4, 6) + pSign + dateStr.substring(6, 8);

	return date;
};
Date.prototype.first_yyyymmdd = function(pSign) {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	var dateStr = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');

	if (pSign == undefined) {
		return dateStr;
	}

	var date = dateStr.substring(0, 4) + pSign + "01" + pSign + "01";

	return date;
};
Date.prototype.last_yyyymmdd = function(pSign) {
	var mm = this.getMonth() + 1; // getMonth() is zero-based
	var dd = this.getDate();

	var dateStr = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');

	if (pSign == undefined) {
		return dateStr;
	}

	var date = dateStr.substring(0, 4) + pSign + "12" + pSign + "31";

	return date;
};
/**
 * 데이터 타입 Date에 addDays() 함수 추가
 * 일수를 더한다.
 * @param pDay	더할 날짜 수
 */
Date.prototype.addDays = function(pDay) {
	this.setDate(this.getDate() + pDay);
};
/**
 * 데이터 타입 String에 toDate() 함수 추가
 *
 * ※ 주의사항 : 현재버전에서 포맷은 다음형태만 허용됨
 * 				yyyy, mm, dd, hh, ii, ss
 * @params	format : 날짜 포맷 / 예: yyyy/mm/dd, yyyy-mm-dd hh:ii:ss
 * @returns format에 해당하는 Date
 */
String.prototype.toDate = function(pFormat)
{
	if (this.length != pFormat.length) {
		return null;
	}

	var yIx = pFormat.indexOf("yyyy");
	var mIx = pFormat.indexOf("mm");
	var dIx = pFormat.indexOf("dd");
	var hIx = pFormat.indexOf("hh");
	var iIx = pFormat.indexOf("ii");
	var sIx = pFormat.indexOf("ss");

	var today = new Date();

	var year;

	if (yIx > -1) {
		year = this.substr(yIx, 4);
	} else {
		yIx = pFormat.indexOf("yy");
		year = (yIx > -1) ? this.substr(yIx, 2) : today.getFullYear();
	}
	var month = (mIx > -1) ? this.substr(mIx, 2) - 1 : today.getMonth() - 1;
	var day = (dIx > -1) ? this.substr(dIx, 2) : today.getDate();
	var hour = (hIx > -1) ? this.substr(hIx, 2) : 0;
	var minute = (iIx > -1) ? this.substr(iIx, 2) : 0;
	var second = (sIx > -1) ? this.substr(sIx, 2) : 0;

	return new Date(year, month, day, hour, minute, second);
};
Number.prototype.pad = function (pSize) {
    var s = this + "";
    while (s.length < pSize) {
    	s = "0" + s;
    }

    return s;
}

/**
 * @name : commonAdministStats_alert
 * @description : 알림
 * @date : 2020.06.09
 * @author : 한광희
 * @history :
 * @param
 * 		p_msg : 메세지
 * 		p_callback : 확인버튼시 동작할 함수
 */
function commonAdministStats_alert(p_msg, p_callback) {
	//화면 띄움
	$("#commonAdministStats_popup_back").show();
	$("#commonAdministStats_popup_alert").show();
	$("#commonAdministStats_popup_alert_message").html(p_msg);

//	// 알림 창 화면 중앙에 위치
//	$("#commonAdministStats_popup_alert").css({"top": (($(window).height()-$("#commonAdministStats_popup_alert").outerHeight())/2+$(window).scrollTop())+"px"})
//
	//이전 이벤트 제거
	$("#commonAdministStats_popup_back").unbind();
	$("#commonAdministStats_popup_alert_ok").unbind();

	//새로운 이벤트 맵핑
	$("#commonAdministStats_popup_back").click(function() {
		$("#commonAdministStats_popup_alert_close").click();
	});
	$("#commonAdministStats_popup_alert_ok").click(function() {
		$("#commonAdministStats_popup_alert_close").click();
		if(typeof p_callback === "function") {
			p_callback();
		}
	});
}

/**
 * @name : commonAdministStats_confirm
 * @description : 확인
 * @date : 2020.06.09
 * @author : 한광희
 * @history :
 * @param
 * 		p_msg : 메세지
 * 		p_callback : 확인버튼시 동작할 함수
 * 		p_callback2 : 취소버튼시 동작할 함수
 */
function commonAdministStatsAdministStats_confirm(p_msg, p_callback, p_callback2) {
	//화면 띄움
	$("#commonAdministStats_popup_back").show();
	$("#commonAdministStats_popup_confirm").show();
	$("#commonAdministStats_popup_confirm_message").html(p_msg);

	//이전 이벤트 제거
	$("#commonAdministStats_popup_back").unbind();
	$("#commonAdministStats_popup_confirm_ok").unbind();
	$("#commonAdministStats_popup_confirm_cancel").unbind();

	//새로운 이벤트 맵핑
	$("#commonAdministStats_popup_back").click(function() {
		$("#commonAdministStats_popup_confirm_close").click();
	});
	$("#commonAdministStats_popup_confirm_ok").click(function() {
		$("#commonAdministStats_popup_confirm_close").click();
		if(typeof p_callback === "function") {
			p_callback();
		}
	});
	$("#commonAdministStats_popup_confirm_cancel").click(function() {
		$("#commonAdministStats_popup_confirm_close").click();
		if(typeof p_callback2 === "function") {
			p_callback2();
		}
	});
}

function numberFormat(inputNumber) {
	// 2020-11-23 [곽제욱] null처리 로직 추가 START
	if(inputNumber!=""&&inputNumber!=null){
		return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else {
		return 0;
	}
   	// 2020-11-23 [곽제욱] null처리 로직 추가 END
}

function tileMapWordWrap(text, width){
	text.each(function() {
		/** 2020-10-22 [곽제욱] 주제별 index 체크 변경 START */
		if($administStatsMain.ui.selectedThema == "인구"){
			var index = $("#areaPopulation").find("text").index(this);
		} else if($administStatsMain.ui.selectedThema == "가구"){
			var index = $("#areaHouseHold").find("text").index(this); // 2020-11-18 [곽제욱] 각 타일맵 width 적용
		} else if($administStatsMain.ui.selectedThema == "주택"){
			var index = $("#areaHouse").find("text").index(this); // 2020-11-18 [곽제욱] 각 타일맵 width 적용
		} else if($administStatsMain.ui.selectedThema == "농업"){
			var index = $("#areamiddl").find("text").index(this);
		// 2020-11-18 [곽제욱] 각 타일맵 width 적용 START
		} else if($administStatsMain.ui.selectedThema == "임업"){
			var index = $("#areaForestry").find("text").index(this);
		} else if($administStatsMain.ui.selectedThema == "어업"){
			var index = $("#areaFishery").find("text").index(this);
		}
		// 2020-11-18 [곽제욱] 각 타일맵 width 적용 END
		/** 2020-10-22 [곽제욱] 주제별 index 체크 변경 END */
	    var text = d3.select(this),
	        words = text.text().split("").reverse(),
	        word,
	        line = [],
	        lineNumber = 0,
	        lineHeight = 1.1, // ems
	        x = text.attr("x"),
	        y = text.attr("y"),
	        //dy = parseFloat(text.attr("dy")),
	        width = widthArray[index],
	        height = heightArray[index],
	        dy = 0,
	        limitHeight = 16;
	        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em")
	        .attr("font-size", "10px")
		    .attr("fill", "white");
	    while (word = words.pop()) {
	      line.push(word);
	      tspan.text(line.join(""));
	      if (tspan.node().getComputedTextLength() >= width) {
	        line.pop();
	        tspan.text(line.join(""));
	        line = [word];
	        limitHeight = (lineNumber+1)*16+15;
	        if(limitHeight > height){
	        	break;
	        }
	        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
	      }
	    }
	  });
}

/*20201014 박은식 브라우저 체크 함수 START*/
/**
 * @name : isBrowserCheck
 * @description : 확인
 * @date : 2020.10.14
 * @author : 박은식
 * @history :
 * @param

 */
function isBrowserCheck(){
	const agt = navigator.userAgent.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera';
	if (agt.indexOf("staroffice") != -1) return 'Star Office';
	if (agt.indexOf("webtv") != -1) return 'WebTV';
	if (agt.indexOf("beonex") != -1) return 'Beonex';
	if (agt.indexOf("chimera") != -1) return 'Chimera';
	if (agt.indexOf("netpositive") != -1) return 'NetPositive';
	if (agt.indexOf("phoenix") != -1) return 'Phoenix';
	if (agt.indexOf("firefox") != -1) return 'Firefox';
	if (agt.indexOf("safari") != -1) return 'Safari';
	if (agt.indexOf("skipstone") != -1) return 'SkipStone';
	if (agt.indexOf("netscape") != -1) return 'Netscape';
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
	if (agt.indexOf("msie") != -1) {
    	let rv = -1;
		if (navigator.appName == 'Microsoft Internet Explorer') {
			let ua = navigator.userAgent; var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
		}
		return 'Internet Explorer '+rv;
	}
}
/*20201014 박은식 브라우저 체크 함수 END*/

// 2020.10.20 kosis url 조회  START
/**
 * @name : getMataDataUrl
 * @description : kosis url 조회
 * @date : 2020.10.20
 * @author : jhs
 * @history :
 * @param survId : 조사ID

 */
function getMataDataUrl(survId){
	$.ajax({
		method: "POST",
		async: false,	// 반드시 동기처리 해야 함
		url: contextPath + "/ServiceAPI/administStats/common/getAdministStatsInfo.json",
		data: {"survId": survId}, // 임시
		dataType: "json",
		success: function(res) {
			if (res.errCd == "0") {
				// 행정통계시각화정보
				var administStatsInfo = res.result.administStatsInfo;
				var win = window.open(administStatsInfo[0].surv_url,"_blank");
			}
		},
		error: function(e) {
			alert('failed');
		}
	});
}
//2020.10.20 kosis url 조회  END



//2020.10.23 헤더 공통버튼 Show/Hide START
/**
 * @name : isHeaderCommBtn
 * @description : 헤더 공통버튼 Show/Hide
 * @date : 2020.10.23
 * @author : jhs
 * @history :
 * @param flag : true/ false

 */
function isHeaderCommBtn(flag){
	if(flag){
//		$('.HpdfBtn').show();			// 2020.10.29 버튼 사용안함
//		$('.HprintBtn').show();			// 2020.10.29 버튼 사용안함
		$('.HshareBtn').show();
		$('#detailReportBtn').hide();  // 2020.10.27   상세 보고서 버튼
	}
	else{
//		$('.HpdfBtn').hide();			// 2020.10.29 버튼 사용안함
//		$('.HprintBtn').hide();			// 2020.10.29 버튼 사용안함
		$('.HshareBtn').hide();
		$('#detailReportBtn').show();  // 2020.10.27   상세 보고서 버튼
	}
}
//2020.10.23 헤더 공통버튼 Show/Hide END

//20210303 박은식 튜토리얼 function START
/**
 * @name : showTuto
 * @description : 튜토리얼 보이기
 * @date : 2021.03.03
 * @author : pes
 * @history :
 * @param

 */
function showTuto(){
//	srvLogWrite("P0", "01", "11", "00", $administStatsMain.ui.selectedThema, "");

	if($administStatsMain.ui.selectedThema == '인구'){
		if($administStatsMain.ui.pageIndex == 1){//인구대시보드
			$('.newlyDashTuto').removeClass("none");
		} else { //시계열
			$('.newlyTmsTuto').removeClass("none");
		}
	}else if($administStatsMain.ui.selectedThema == '중장년층'){
		$('.middlDashTuto').removeClass("none");
	}else if($administStatsMain.ui.selectedThema == '주택소유'){
		$('.houseDashTuto').removeClass("none");
	}else if($administStatsMain.ui.selectedThema == '귀농·귀어·귀촌'){
		$('.retunDashTuto').removeClass("none");
	}else if($administStatsMain.ui.selectedThema == '통계더보기'){
		$('.moresDashTuto').removeClass("none");
	}else if($administStatsMain.ui.selectedThema == '어업'){
		$('.fisheryDashTuto').removeClass("none");
	}else if($administStatsMain.ui.selectedThema == '상세'){
		$('.administStatsDetailTuto').removeClass("none");
	}
}

/**
 * @name : hideTuto
 * @description : 튜토리얼 닫기
 * @date : 2021.03.03
 * @author : pes
 * @history :
 * @param

 */
function hideTuto(){
	$(".newlyDashTuto").addClass("none");
	$(".middlDashTuto").addClass("none");
	$(".houseDashTuto").addClass("none");
	$(".middlDashTuto").addClass("none");
	$(".retunDashTuto").addClass("none");
	$(".moresDashTuto").addClass("none");
	$(".fisheryDashTuto").addClass("none");
	$(".newlyTmsTuto").addClass("none");
	$(".administStatsDetailTuto").addClass("none");
}

//20210303 박은식 튜토리얼 function END

/**
 * @name : sortJSON
 * @description : jsonArray json 값으로 정렬
 * @date : 2021.08.30
 * @author : hjh
 * @param data 정렬대상배열
 * @param key 정렬기준값 json key
 * @param type asc OR desc
 */
function sortJSON(data, key, type) {
	if (type == undefined) {
		type = "asc";
	}
	return data.sort(function(a, b) {
		var x = a[key];
		var y = b[key];
		if (type == "desc") {
			return x > y ? -1 : x < y ? 1 : 0;
		} else if (type == "asc") {
			return x < y ? -1 : x > y ? 1 : 0;
		}
	});
};

/**
 * @name : getTotsurvStatData
 * @description : 차트용 데이터 조회
 * @date : 2021.08.30
 * @author : hjh
 * @param params json type 파라미터
 * @param callback 콜백함수
 */
function getTotsurvStatData(params, callback) {
	$.ajax({
		method : "POST",
		async : false, // 반드시 동기처리 해야 함
		//url : contextPath + "/view/kosisApi/TotsurvStatData.do",
		url: sgis4thApiPath,
		data : params,
		dataType : "json",
		success : function(res) {
			if (res.length > 0) {
				if (typeof callback === "function") {
					callback(res);
				}
			}
		},
		error : function(e) {
			alert('failed');
		}
	});
}

/**
 * @name : getTotsurvMapData
 * @description : 지도용 데이터 조회
 * @date : 2021.08.31
 * @author : hjh
 * @param params json type 파라미터
 * @param params key
 * @param callback 콜백함수
 */
function getTotsurvMapData(params, key, callback) {
	var resultData = {};

	getTotsurvStatData(params, function(data) {
		var forResult = {};
		var result = {
			result : {
				mapData : []
			}
		};

		for (var i = 0; i < data.length; i++) {
			if (typeof forResult[data[i].OV_L1_ID] == "undefined") {
				forResult[data[i].OV_L1_ID] = new Object();
			}
			forResult[data[i].OV_L1_ID][data[i][key]] = data[i];
		}

		for ( var key1 in forResult) {
			var forMapData = {};
			for ( var key2 in forResult[key1]) {
				forMapData.adm_cd = forResult[key1][key2].OV_L1_ID;
				forMapData.region_nm = forResult[key1][key2].OV_L1_KOR;
				forMapData.dt = forResult[key1][key2].DTVAL_CO;
			}
			result.result.mapData.push(forMapData);
		}
		resultData = result;
	});
	return resultData;
}

/**
 * @name : commonTotSurv_confirm
 * @description : 확인
 * @date : 2020.06.09
 * @author : 한광희
 * @history :
 * @param
 * 		p_msg : 메세지
 * 		p_callback : 확인버튼시 동작할 함수
 * 		p_callback2 : 취소버튼시 동작할 함수
 */
function commonTotSurvTotSurv_confirm(p_msg, p_callback, p_callback2) {
	//화면 띄움
	$("#commonTotSurv_popup_back").show();
	$("#commonTotSurv_popup_confirm").show();
	$("#commonTotSurv_popup_confirm_message").html(p_msg);

	//새로운 이벤트 맵핑
	$(document).one("click", "#commonTotSurv_popup_back", function() {
		$("#commonTotSurv_popup_confirm_close").click();
	});
	$(document).one("click", "#commonTotSurv_popup_confirm_ok", function() {
		$("#commonTotSurv_popup_confirm_close").click();
		if(typeof p_callback === "function") {
			p_callback();
		}
	});
	$(document).one("click", "#commonTotSurv_popup_confirm_cancel", function() {
		$("#commonTotSurv_popup_confirm_close").click();
		if(typeof p_callback2 === "function") {
			p_callback2();
		}
	});
}

/**
 * @name : commonTotSurv_alert
 * @description : 알림
 * @date : 2020.06.09
 * @author : 한광희
 * @history :
 * @param
 * 		p_msg : 메세지
 * 		p_callback : 확인버튼시 동작할 함수
 */
function commonTotSurv_alert(p_msg, p_callback) {
	//화면 띄움
	$("#commonTotSurv_popup_back").show();
	$("#commonTotSurv_popup_alert").show();
	$("#commonTotSurv_popup_alert_message").html(p_msg);

	//새로운 이벤트 맵핑
	$(document).one("click", "#commonTotSurv_popup_back", function() {
		$("#commonTotSurv_popup_alert_close").click();
	});
	$(document).one("click", "#commonTotSurv_popup_alert_ok", function() {
		$("#commonTotSurv_popup_alert_close").click();
		if(typeof p_callback === "function") {
			p_callback();
		}
	});
}




//지도 맵 분할에서 현재 보고있는 맵의 아이디 리턴 (0, 1)
function getMapDivisionId() {
	var mapId = "0";
	if($("#map_dummy_1").css("display") == "block" && $("#map_dummy_2").css("display") == "block") {	//맵 분할 시 첫번째 맵이 우선
		mapId = "0";
	} else if($("#map_dummy_1").css("display") == "block" && $("#map_dummy_2").css("display") == "none") {	//첫번째 맵
		mapId = "0";
	} else if($("#map_dummy_1").css("display") == "none" && $("#map_dummy_2").css("display") == "block") {	//두번째 맵
		mapId = "1";
	}
	return mapId;
}

