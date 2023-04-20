/**
 * 행정통계시각화 대쉬보드 메인
 */
(function(W, D) {
	W.$administStatsMain = W.$administStatsMain || {};

	$(document).ready(function() {

		/* 최초 화면 이동 시 로딩 */
		$administStatsMain.ui.loading(true);

		/* 하이차트 데이터 숫자 구분자 콤마 */
		Highcharts.setOptions({
			lang : {
				thousandsSep : ","
			}
		});

		$administStatsMain.ui.isThisBrowser = $administStatsMain.util.isBrowserCheck();
		$administStatsMain.event.setUIEvent();
		$administStatsMain.ui.changeMenu(gv_url);
	});

	$(document).on("click", "#commonTotSurv_popup_confirm_close", function() {
		$(".helpToolTipDiv").hide();
	});
	
	$(window).scroll(function() {
		$administStatsMain.ui.scrollLeft = $(document).scrollLeft();
		$administStatsMain.ui.scrollTop = $(document).scrollTop();
	});

	$(window).resize(function() {

		/* 지도 비활성화 이미지 width 조정 */
		if ($(".map_none").length > 0) {
			$(".map_none").css("width", $("#mapArea").css("width"));
		}

		/* [S]데이터라벨 겹침문제 관련 */
		setTimeout(function() {
			/* 복합차트 line차트 데이터라벨은 숨김처리 */
			for ( let key in $administStatsMain.ui.chart) {
				$.each($administStatsMain.ui.chart[key].series, function(seriesIdx, serie) {
					if (serie.type == "line" && $administStatsMain.ui.chart[key].series.length >= 2) {
						serie.dataLabelsGroup.hide();
					}
				});
			}
			/* 지역별차트 데이터라벨 위치 지그재그로 고정 */
			if ($administStatsMain.ui.chart.hasOwnProperty("regnChart")) {
				const regnChart = $administStatsMain.ui.chart["regnChart"];
				const bottom = regnChart.plotHeight - 110;
				$.each(regnChart.series[0].data, function(i, data) {
					data.dataLabel.attr({
						y : bottom + (i % 2 == 0 ? -7 : 7)
					});
				});
			}
		}, 300);
		/* [E]데이터라벨 겹침문제 관련 */
	});

	$administStatsMain.consts = {
		/* 시도 전체 */
		sidoAll : "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39",
		/* 시도 전체2 */
		sidoAll2 : "000,211,221,222,223,224,225,226,229,231,232,233,234,235,236,237,238,239"
	},

	$administStatsMain.ui = {
		/* 차트 옵션 */
		chart : {},
		/* 테마 관련 js */
		dash : {},
		/* 기본 년도 배열 */
		dftYears : [],
		/* 년도 배열(년도 변경 시마다 변경됨) */
		years : [],
		/* 선택된 년도 */
		selectedYear : "2020",
		/* 선택된 차트 조각 ID */
		selSliceId : "",
		/* 차트 데이터 조회용 API 파라미터 */
		apiParam : {},
		/* 차트 데이터 조회용 API 파라미터 템플릿 */
		apiTmpl : {
			surv_year_list : "",
			org_id_list : "101",
			tbl_id_list : "",
			list_var_ord_list : "",
			char_itm_id_list : "",
			prt_type : "",
			adm_cd : "",
			ov_l1_list : "",
			ov_l2_list : "",
			ov_l3_list : "",
			ov_l4_list : "",
			ov_l5_list : "",
			category : "",
			odr_col_list : "",
			odr_type : ""
		},
		/* 차트 정보(key chartID) */
		info : {},
		/* 기본 파라미터(지역별 차트 & 지도에 사용) */
		dftRegnParam : {},
		/* 선택된 차트 파라미터(지역별 차트 & 지도에 사용) */
		selRegnParam : {},
		/* 기본 파라미터(시계열 차트에 사용) */
		dftTmsrParam : {},
		/* 선택된 차트 파라미터(시계열 차트에 사용) */
		selTmsrParam : {},
		/* 선택된 시계열 차트의 slice 하이라이트용 */
		tmsr_data : {},
		/* 선택된 지역 코드 */
		selectedArea : "",
		/* 현재 대쉬보드의 레벨(0 : 전세계, 1 : 전국, 2: 시도) */
		selectedLevel : "0",
		/* 선택된 주제(신혼부부, 중·장년층 등) */
		selectedThema : "",
		/* 타일맵을 나누기 위한 구분 */
		tilePerColor : new Array(),
		/* 타일맵 mouseOver, out 이벤트를 위한 변수 */
		tempColor : "",
		/* 타일맵 변동여부 */
		tileChangeYn : "Y",
		/* 컨텐츠영역 내부 좌표 원점 X : menuBarWidth (variable) */
		coordX : 0,
		/* 컨텐츠영역 내부 좌표 원점 Y : toolBarHeight + */
		coordY : 70,
		/* 화면에서 스크롤 위치 팝업창 위치 조정 및 배경 영역 조정을 위함 스크롤 이벤트 발생시 */
		scrollLeft : 0,
		scrollTop : 0,
		/* 시도코드,명 매핑 */
		sido : {},
		/* 내위치 정보 : 최초 일자리 맵 서비스 들어올때 한번만 설정한다. */
		/* 메뉴 클릭시 여러번 호출하는 경우 취득이 안되는 경우가 종종 발생한다. */
		/* 내위치 시도 코드 : 11:서울특별시, 21:부산광역시, 25:대전광역시 */
		mySidoCd : "25",
		/* 내위치 시군구 코드: 030: 대전시 서구, 070: 부산시 남구 */
		mySggCd : "030",
		/* 내위치 시도 이름 */
		mySidoNm : "대전광역시",
		/* 내위치 시군구 이름 */
		mySggNm : "서구",
		/* 내위치 읍면동 이름 */
		myEmDongNm : "",
		/* 툴팁 토글 변수 추가 */
		toolTipToggle : "N",
		/* 콘솔 로그를 기록할지 여부 / 디버그 용도로 로컬에서만 true로 사용 */
		consoleLogEnabled : false,
		/* 지도 줌 데이터 START */
		zoomUpRegion : [ "21", "31370", "31100", "31250", "31230", "31130", "31220", "31260", "31380", "31280", "31350", "31190", "31210", "31200", "31070", "31270", "38110", "23010", "23310", "23320", "38070", "38030", "38100", "38090", "38050", "38060", "38080", "38320", "38330", "38390", "38340", "38360", "38400", "38380", "38370", "38350", "38310", "37012", "37011", "37050", "37100", "37020", "37030", "37390", "37060", "37070", "37080", "37090", "37400", "37420", "37380", "37360", "37350", "37330", "37370", "37310", "37340", "22310", "34010", "34011", "34040", "34050", "34080", "34060", "34020", "34370", "34330", "34360", "34030", "34310", "34340", "34350", "35030", "35020", "35040", "35310", "35060", "35050", "35370", "35380", "35360", "35350", "35320", "35330", "35340", "36", "36020", "36030", "36060", "36040", "36420", "36400", "36350", "36370", "36410", "31380", "36310", "36450", "36360", "36380", "36320", "36330", "33041", "33020", "33030", "33370", "33350", "33330", "33340", "33360", "33320", "33380", "32020", "32010", "32030", "32320", "32350", "32390", "32400", "32370", "32410", "32380", "26310", "29010", "31090" ],
		zoomDownRegion : [ "31012", "31110", "31060", "31120", "31160", "31192", "31042", "31041", "31050", "31193", "31014", "31140", "31103", "31104", "31011", "31191", "31013", "23060", "23090", "23020", "22030", "22040", "24020", "24010", "26010", "26030", "11010", "11020", "11030", "11040", "11050", "11060", "11070", "11080", "11090", "11100", "11110", "11120", "11130", "11140", "11150", "11160", "11170", "11180", "11190", "11200", "11210", "11220", "11230", "11240", "11250", "21020", "21040", "21050", "21060", "21070", "21080", "21090", "21100", "21110", "21130", "21150" ],
		zoomDoubleUpRegion : [ "31240", "37010", "37040", "37320", "37410", "34380", "36460", "36480", "36470", "33040", "32070", "32310", "32360", "32340", "32330", "39010", "39020" ],
		zoomDoubleDownRegion : [ "21140", "21030", "21010", "22010" ],
		/* 현재 접속한 브라우저 체크 */
		isThisBrowser : "",
		/* 로딩바 */
		loadingBar : new sop.portal.absAPI(),

		setCookie : function(cookieName, value, expiredays) {
			let expireDt = new Date();
			expireDt.setDate(expireDt.getDate() + expiredays);
			document.cookie = cookieName + "=" + value + "; path=/; expires=" + expireDt.toString() + ";";
		},

		getCookie : function(cookieName) {
			let cName, cValue = "", val;
			if (document.cookie != null) {
				val = document.cookie.split(";");
				for (let i = 0; i < val.length; i++) {
					cName = val[i].substr(0, val[i].indexOf("="));
					cValue = val[i].substr(val[i].indexOf("=") + 1);
					if (cookieName == cName)
						break;
				}
			}
			return cValue;
		},

		delCookie : function(cookieName) {
			let expireDt = new Date();
			expireDt.setDate(expireDt.getDate() - 1);
			document.cookie = cookieName + "=" + escape("Y") + "; path=/; expires=" + expireDt.toString() + ";";
		},

		/**
		 * @name log
		 * @description 콘솔에 로그 기록
		 * @param pMessage
		 *            로그 메세지
		 */
		log : function(pMessage) {
			if ($administStatsMain.ui.consoleLogEnabled) {
				console.log(">>[" + $administStatsMain.ui.consoleLogSeq + "] " + pMessage);
				$administStatsMain.ui.consoleLogSeq++;
			}
		},

		/**
		 * @name changeMenu
		 * @description 메뉴 변경
		 * @param gv_url
		 *            gvUrl
		 */
		changeMenu : function(gv_url) {
			switch (gv_url) {
				case "newly":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "02", "01", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $newlyDash;
					$administStatsMain.ui.selectedThema = "신혼부부";
					$administStatsMain.ui.logcd3 = "02";
					break;
				case "house":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "03", "01", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $houseDash;
					$administStatsMain.ui.selectedThema = "주택소유";
					$administStatsMain.ui.logcd3 = "03";
					break;
				case "middl":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "04", "01", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $middlDash;
					$administStatsMain.ui.selectedThema = "중·장년층";
					$administStatsMain.ui.logcd3 = "04";
					break;
				case "retun":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "05", "01", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $retunDash;
					$administStatsMain.ui.selectedThema = "귀농·귀어·귀촌";
					$administStatsMain.ui.logcd3 = "05";
					break;
				case "more1":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "06", "01", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $more1Dash;
					$administStatsMain.ui.selectedThema = "일자리";
					$administStatsMain.ui.logcd3 = "06";
					break;
				case "more2":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "07", "00", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $more2Dash;
					$administStatsMain.ui.selectedThema = "퇴직연금";
					break;
				case "more3":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "08", "00", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $more3Dash;
					$administStatsMain.ui.selectedThema = "임금근로 일자리 동향";
					break;
				//조규환 테스트생성
				case "more4":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "09", "00", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $more4Dash;
					$administStatsMain.ui.selectedThema = "강지은 테스트페이지";
					break;
				case "more5":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "10", "00", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $more5Dash;
					$administStatsMain.ui.selectedThema = "강지은 테스트페이지2";
					break;
				case "more6":
					//mng_s 20220216 이진호, log 추가
					srvLogWrite("S0", "02", "11", "00", "", "");
					//mng_e 20220216 이진호
					$administStatsMain.ui.dash = $more6Dash;
					$administStatsMain.ui.selectedThema = "강지은 테스트페이지3";
					break;
				//조규환 테스트생성
			}

			$administStatsMain.ui.dash.ui.init();
			$administStatsLeft.ui.selectYears();
		},

		/**
		 * @name appendContent
		 * @description 컨텐츠 다운로드후 문서에 추가
		 * @param pUrl
		 *            url
		 * @param pCallback
		 *            콜백함수
		 */
		appendContent : function(pUrl, pCallback) {
			const $div = $("<div></div>");
			$div.load(pUrl, null, function() {
				const $layer = $(this).children();
				if ($layer != null) {
					$("#container").append($layer);
				}
				if (typeof pCallback !== "undefined") {
					pCallback();
				}

				/* 주소에 시도코드 파라미터 붙여서 접근한 경우 */
				if ($.inArray($administStatsMain.ui.selectedThema, [ "신혼부부", "주택소유", "중·장년층", "귀농·귀어·귀촌" ]) > -1) {
					if (!$administStatsMain.util.isEmpty(gv_sido_cd)) {
						if ($administStatsMain.ui.sido.hasOwnProperty(gv_sido_cd)) {
							$administStatsMain.ui.selectedArea = gv_sido_cd;
							$administStatsMap.ui.mapToggleId = gv_sido_cd;
							$('.tag_sido').text($administStatsMain.ui.sido[gv_sido_cd]);
							$('.tag_item').append('<button class="tag-del" id="sidoClose" onclick="javascript: modalSearchBtn();">');
						} else {
							alert("sido_cd 가 잘못 입력되었습니다.\n전국 데이터가 조회됩니다.\n\n입력한 sido_cd : " + gv_sido_cd + "\n입력 가능한 sido_cd : " + Object.keys($administStatsMain.ui.sido));
							console.group("sido_cd 파라미터 오입력");
							console.log("입력한 sido_cd : " + gv_sido_cd);
							console.log("입력 가능한 sido_cd ↓");
							console.log(Object.keys($administStatsMain.ui.sido));
							console.groupEnd();
						}
					}
				}

				$administStatsMain.ui.dash.ui.ready();
			});
		},

		/**
		 * @name removeContent
		 * @description 문서에서 컨텐츠 삭제
		 */
		removeContent : function() {
			// 컨텐츠의 스크롤 옵션 제거
			$("#container").children("div").each(function() {
				const id = $(this).attr("id");
				const $div = $("#" + id);
			});
			$("#container").html("");
		},

		/**
		 * @name getAreaSido
		 * @description 지역선택 팝업 시도 불러오기
		 * @param p_sido_cd
		 *            시도코드
		 */
		getAreaSido : function(p_sido_cd) {
			let selectedYear = "";

			if (!$administStatsMain.util.isEmpty($administStatsMain.ui.selectedYear)) {
				selectedYear = $administStatsMain.ui.selectedYear;
			} else {
				selectedYear = "2019";
			}

			$.ajax({
				url : contextPath + "/ServiceAPI/map/sidoAddressList.json",
				type : "post",
				dataType : "json",
				async : false,
				data : {
					base_year : selectedYear
				}
			}).done(function(res) { // 완료
				if (res.errCd == "0") {
					const lvResultList = res.result.sidoList;
					if (lvResultList.length > 0) {
						$administStatsMain.ui.sido = {};
						for (let i = 0; i < lvResultList.length; i++) {
							$administStatsMain.ui.sido[lvResultList[i].sido_cd] = lvResultList[i].sido_nm;
							// if (lvResultList[i].sido_cd == p_sido_cd) {
							// }
						}
					}
				} else if (res.errCd == "-401") {
				} else {
				}
			}).fail(function(res) {
			}).always(function(res) {
			});
		},

		/**
		 * @name loading
		 * @description 로딩바 표시
		 * @param p_flag
		 *            true/false => 표시/감춤
		 */
		loading : function(p_flag) {
			if (p_flag) {
				this.loadingBar.onBlockUIPopup();
				$("#durianMask").css("position", "fixed");
				$("#durianMask").css("width", "100%");
				$("#durianMask").css("height", "100%");
				let lv_div = $("#durianMask").next("div");
				const lv_div_html = "" + lv_div.html();
				if (lv_div_html.indexOf("loding_type01") >= 0) {
					lv_div.css("position", "fixed");
					lv_div.css("width", "");
					lv_div.css("height", "");
					lv_div.css("top", "48%");
					lv_div.css("left", "48%");
				}
			} else {
				this.loadingBar.onBlockUIClose();
			}
		},

		/**
		 * @name getPosition
		 * @description 위치동의 또는 미동의시 설정된 정보를 반환 SidoCd, SggCd, SidoNm, SggNm
		 */
		getPosition : function() {
			const position = [ $administStatsMain.ui.mySidoCd, $administStatsMain.ui.mySggCd, $administStatsMain.ui.mySidoNm, $administStatsMain.ui.mySggNm ];
			return position;
		},

		/**
		 * @name getSidoSggPos
		 * @description region_cd의 지도상의 center좌표값 반환 region_cd
		 */
		getSidoSggPos : function(region_cd) {
			const sido = region_cd.substring(0, 2);
			if (sido != "99") {
				$administStatsMain.ui.getAreaSido(sido); // 시도코드 조회
			}
		},

		chartSaveClear : function() {
			$administStatsMain.ui.selSliceId = "";
		},

		/**
		 * @name mapImageDown
		 * @description 맵 이미지를 다운로드
		 * @param targetId
		 *            캡쳐 엘리먼트 아이디
		 * @param saveNm
		 *            저장이름
		 */
		mapImageDown : function(targetId, saveNm) {
			const agent = navigator.userAgent.toLowerCase();
			if ((navigator.appName == "Netscape" && navigator.userAgent.search("Trident") != -1) || (agent.indexOf("msie") != -1)) {
				commonAdministStats_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br />발생하므로 크롬을 이용해 주시기 바랍니다.", function okFn(opt) {
					$("#commonAdministStats_popup_confirm_close").click();
				});
			} else {
				commonAdministStatsAdministStats_confirm("해당 지도 이미지를 저장하시겠습니까?", function okFn(opt) {
					srvLogWrite("S0", "01", "06", "00", "지도", $administStatsMain.ui.selectedThema);

					$("#container").append($(targetId).clone().css("width", "40%").css("height", "75%").addClass("copyMap"));

					$(".copyMap").css("border", "0px");
					$(".copyMap .tag_title").removeClass("txt_over");
					$(".copyMap h5").hide();
					$(".copyMap .sop-control").hide();
					$(".copyMap .downloadBtn").hide();
					$(".copyMap .sop-caption").css("z-index", "999999");

					html2canvas($(".copyMap")[0], {
						logging : true,
						useCORS : false,
						proxy : contextPath + "/ServiceAPI/community/html2canvasproxy.jsonp"
					}).then(function(canvas) {
						let a = document.createElement("a");
						a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
						a.download = saveNm + ".png";
						a.click();
					});

					$(".copyMap").remove();
				});
			}
		},

		/**
		 * @name drawContent
		 * @description 맵 그리기
		 * @param data
		 *            맵 그리기용 데이터
		 */
		drawContent : function(data) {
			$(".map_none").remove();
			$("#mapRgn_3").show();

			$(".tag_year").text($(".sb_year option:selected").text());
			$(".tag_title").text($administStatsMain.ui.selRegnParam.regn_title).attr("title", $administStatsMain.ui.selRegnParam.regn_title);

			$administStatsMapnoReverseGeoCode = true;
			if ($administStatsMap.ui.map == null || $("#mapRgn_3").html() == "") {
				$("#mapRgn_3").show();
				$administStatsMap.ui.createMap("mapRgn_3", 0);
			}

			$administStatsMap.ui.drawMapData("sido", "color", data);
			if ($administStatsMap.ui.map != null) {
				$administStatsMap.ui.map.update();
			}

			// 범례추가 START
			$(".sop-control").css("display", "inline-block");
			if ($(".legendRing").attr("data-ing") == "max") {
				$(".btn_legend").trigger("click");
			} else if ($(".legendRing").attr("data-ing") == "min") {
				$(".btn_legend").trigger("click").trigger("click");
			}
			$("#grid_lg_color_0").attr("data-color", "#cd1103").attr("start-color", "#ffd75d").text("#cd1103").css("background", "#cd1103");
		},

		/**
		 * @name chartItmClick
		 * @description 차트 아이템 click 이벤트
		 */
		chartItmClick : function(param, p_callback) {
			var logcd3 = $administStatsMain.ui.logcd3;
			var chartNm = "";
			
			$administStatsMain.ui.loading(true);

			/* 지도 & 지역차트용 선택된 param */
			const selRegnParam = param["selRegnParam"];
			/* 시계열차트용 선택된 param */
			const selTmsrParam = param["selTmsrParam"];
			/* 시계열(증감)차트용 선택된 param */
			const selTmsrParam2 = param["selTmsrParam2"];
			
			if( selRegnParam && selRegnParam.opt_chartNm ){
				chartNm = selRegnParam.opt_chartNm;
			} else if( selTmsrParam && selTmsrParam.opt_chartNm ){
				chartNm = selTmsrParam.tmsr_title;
			} else if( selTmsrParam2 && selTmsrParam2.opt_chartNm ){
				chartNm = selTmsrParam2.tmsr_title;
			}
			
			srvLogWrite("S0", "02", logcd3, (logcd3==="06"?"02":"03"), chartNm, 
				"year="+$administStatsMain.ui.selectedYear+",thema="+$administStatsMain.ui.selectedThema); //jrj 로그 [차트 선택]
			
			/* 이전 선택여부 확인용 */
			let selSliceId = "";
			/* 선택된 data(차트 slice 선택된 경우) */
			const selEvent = param["event"];
			/* 선택된 data(차트 전체 선택된 경우) */
			const selChartId = param["chartId"];

			/* 차트 slice 선택된 경우 */
			if (!$administStatsMain.util.isEmpty(selEvent)) {
				selSliceId = selEvent.point.id;
				/* chart slice 원본 색상으로 초기화 */
				for ( let chartId in $administStatsMain.ui.chart) {
					for (let i = 0; i < $administStatsMain.ui.chart[chartId].series.length; i++) {
						for (let j = 0; j < $administStatsMain.ui.chart[chartId].series[i].data.length; j++) {
							if ($administStatsMain.ui.chart[chartId].series[i].data[j].selected) {
								if ($administStatsMain.ui.chart[chartId].series[i].data[j].id == selEvent.point.id) {
									continue;
								}
								$administStatsMain.ui.chart[chartId].series[i].data[j].select();
							}
						}
					}
				}

				/* 선택된 slice 하이라이트 */
				selEvent.point.select();
				/* [S]선택된 slice 년도 변경 시 유지용 */
				if (selEvent.point.selected) {
					$administStatsMain.ui.selChartId = selEvent.point.series.chart.userOptions.chart.renderTo;
					$administStatsMain.ui.selSeriesIdx = selEvent.point.series.index;
					$administStatsMain.ui.selDataIdx = selEvent.point.index;
				} else {
					$administStatsMain.ui.selChartId = "";
					$administStatsMain.ui.selSeriesIdx = "";
					$administStatsMain.ui.selDataIdx = "";
				}
				/* [E]선택된 slice 년도 변경 시 유지용 */
			} else {/* 차트 전체 선택된 경우 */
				/* chart slice 원본 색상으로 초기화 */
				for ( let chartId in $administStatsMain.ui.chart) {
					for (let i = 0; i < $administStatsMain.ui.chart[chartId].series.length; i++) {
						for (let j = 0; j < $administStatsMain.ui.chart[chartId].series[i].data.length; j++) {
							if ($administStatsMain.ui.chart[chartId].series[i].data[j].selected) {
								$administStatsMain.ui.chart[chartId].series[i].data[j].select();
							}
						}
					}
				}
				selSliceId = $("#" + selChartId).attr("id");
				$administStatsMain.ui.selChartId = "";
				$administStatsMain.ui.selSeriesIdx = "";
				$administStatsMain.ui.selDataIdx = "";
			}
			/* chart 전체 원본 색상으로 초기화 */
			for ( let chartId in $administStatsMain.ui.chart) {
				$("#" + chartId).closest(".col").find("h4").css("color", "");
			}

			/* 선택된 chartSlice와 이전에 선택된 chartSlice가 다를 경우 */
			if ((!$administStatsMain.util.isEmpty(selEvent) && selEvent.point.selected) || ($administStatsMain.util.isEmpty(selEvent) && selSliceId != $administStatsMain.ui.selSliceId)) {
				/* 차트 slice 선택된 경우 */
				if (!$administStatsMain.util.isEmpty(selEvent)) {
					$administStatsMap.ui.selMapColor = selEvent.point.mapColor;
					$administStatsMain.ui.tmsr_data = selEvent.point.dataObj;
				} else { /* 차트 전체 선택된 경우 */
					$("#" + selChartId).closest(".col").find("h4").css("color", AdministStatsChart.consts.sliceHighlightColor);
					if (!$administStatsMain.util.isEmpty(selRegnParam)) {
						$administStatsMap.ui.selMapColor = selRegnParam.regn_mapColor;
					}
				}

				$administStatsMain.ui.selSliceId = selSliceId;
				$administStatsMain.ui.selRegnParam = selRegnParam;
				if (!$administStatsMain.util.isEmpty(selTmsrParam)) {
					$administStatsMain.ui.selTmsrParam = selTmsrParam;
				}
				if (!$administStatsMain.util.isEmpty(selTmsrParam2)) {
					$administStatsMain.ui.selTmsrParam2 = selTmsrParam2;
				}

			} else {
				/* 기본값 초기화 */
				$administStatsMap.ui.selMapColor = "";
				$administStatsMain.ui.selSliceId = "";
				$administStatsMain.ui.selRegnParam = $administStatsMain.ui.dftRegnParam;
				$administStatsMain.ui.selTmsrParam = $administStatsMain.ui.dftTmsrParam;
				$administStatsMain.ui.selTmsrParam2 = $administStatsMain.ui.dftTmsrParam2;
				$administStatsMain.ui.tmsr_data = "";
			}

			setTimeout(function() {
				/* 지도 & 지역별차트 */
				if ($("#regnChart").length > 0) {
					AdministStatsChart.ui.makeRegnChart("3");
				}
				/* 시계열차트 */
				if (!$administStatsMain.util.isEmpty(selTmsrParam)) {
					AdministStatsChart.ui.makeTmsrChart($administStatsMain.ui.selTmsrParam);
				}
				/* 시계열증감차트 */
				if (!$administStatsMain.util.isEmpty(selTmsrParam2)) {
					AdministStatsChart.ui.makeTmsrChart($administStatsMain.ui.selTmsrParam2);
				}
			}, 50);

			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 1000);
		},

		/**
		 * @name changeYear
		 * @description 기간 변경
		 */
		changeYear : function() {
			const bgnYear = $(".sb_year option:last").val();
			const selYear = $(".sb_year").val();
			let yearArr = [];
			for (let yIdx = bgnYear; yIdx <= selYear; yIdx++) {
				yearArr.push(yIdx);
			}

			$administStatsMain.ui.selectedYear = selYear;
			$administStatsMain.ui.years = yearArr;
		},

		/**
		 * @name setNoneChart
		 * @description 차트 생성 불가 셋팅
		 */
		setNoneChart : function(p_chartId, p_chartNm) {
			const noneMsg = "'" + p_chartNm + "' 자료가 없습니다.";
			$("#" + p_chartId).css("cursor", "default");
			switch (p_chartId) {
				case "regnChart":
					$("#" + p_chartId).html("<div class='chart_none'><img src='/images/totSurv/ChartNone.png' /><br />해당 지표의 지역별 자료가 없습니다.</div>");
					$("#" + p_chartId).closest(".col").find("h4").html("<span>지역별</span>&nbsp;" + p_chartNm).attr("title", "지역별 " + p_chartNm);
					break;
				case "tmsrChart":
				case "tmsrChart2":
					$("#" + p_chartId).html("<div class='chart_none'><img src='/images/totSurv/ChartNone.png' /><br />해당 년도의 자료가 없습니다.</div>");
					$("#" + p_chartId).closest(".col").find("h4").html("<span>연도별</span>&nbsp;" + p_chartNm).attr("title", "연도별 " + p_chartNm);
					break;
				default:
					$("#" + p_chartId).html("<div class='chart_none'><img src='/images/totSurv/ChartNone.png' /><br />해당 년도의 자료가 없습니다.</div>");
					$("#" + p_chartId).closest(".col").find("h4").text(p_chartNm);
					break;
			}
		},

		callAdministStats : function() {
			console.log(themaStr);
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
				//조규환 테스트생성
				case "강지은 테스트페이지":
					themaStr = "more4Dash";
					break;
				//조규환 테스트생성
			}
			location.replace("/view/administStats/" + themaStr);
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
				case "일자리":
					themaStr = "more1Dash";
					//themaStr = "bubu";
					break;
				case "퇴직연금":
					themaStr = "more2Dash";
//					themaStr = "bubu";
					break;
				case "임금근로 일자리 동향":
					themaStr = "more3Dash";
					//themaStr = "bubu";
					break;
			}
			location.href = "/view/administStatsDetail/" + themaStr;
		},

		/**
		 *
		 * @name imageToCanvas
		 * @description 타켓의 이미지의 canvas를 저장
		 * @param targetId
		 *            캡쳐 엘리먼트 아이디
		 * @param saveNm
		 *            저장이름
		 */
		imageToCanvas : function(targetId, parmNm) {
			const agent = navigator.userAgent.toLowerCase();
			if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
				commonAdministStats_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br/>발생하므로 크롬을 이용해 주시기 바랍니다.")
			} else {
				$administStatsMain.ui.loading(true);
				html2canvas($(targetId)[0], {
					logging : true,
					useCORS : false,
					proxy : contextPath + "/ServiceAPI/community/html2canvasproxy.jsonp"
				}).then(function(canvas) {
					$administStatsMain.ui.detailCanvas = canvas.toDataURL("image/png");
					$administStatsMain.ui.loading(false);
					
					srvLogWrite("S0","01","04","01","","agent="+agent); //jrj 로그
					
					window.open("/js/administStats/report/administStatsPrint.html", "dashPrint", "width=1280, height=850, scrollbars=yes");
				});
			}
		}

	};

	$administStatsMain.util = {

		setFixedByDigits : function(param) {

			const prefix = $administStatsMain.util.getObjVal(param, "prefix", "");
			const val = $administStatsMain.util.getObjVal(param, "val", "");
			const digits = $administStatsMain.util.getObjVal(param, "digits", 0);
			const unit = $administStatsMain.util.getObjVal(param, "unit", "");
			let returnVal = prefix;

			if ($.isNumeric(val)) {
				if (digits == 0) {
					returnVal += $administStatsMain.util.addComma(val);
				} else {
					returnVal += $administStatsMain.util.addComma(val.toFixed(digits));
				}
			}

			if (!$administStatsMain.util.isEmpty(unit)) {
				returnVal += " " + unit;
			}

			return returnVal;
		},

		popup : function() {
			const url = "/view/totSurv/researchPOP";
			const name = "resarch popup";
			const option = "width = 500, height = 500, top = 100, left = 200, location = no"
			pop = window.open(url, name, option);
		},

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
		 * @name isBrowserCheck
		 * @description 브라우저 체크
		 */
		isBrowserCheck : function() {
			const agt = navigator.userAgent.toLowerCase();
			if (agt.indexOf("chrome") != -1)
				return "Chrome";
			if (agt.indexOf("opera") != -1)
				return "Opera";
			if (agt.indexOf("staroffice") != -1)
				return "Star Office";
			if (agt.indexOf("webtv") != -1)
				return "WebTV";
			if (agt.indexOf("beonex") != -1)
				return "Beonex";
			if (agt.indexOf("chimera") != -1)
				return "Chimera";
			if (agt.indexOf("netpositive") != -1)
				return "NetPositive";
			if (agt.indexOf("phoenix") != -1)
				return "Phoenix";
			if (agt.indexOf("firefox") != -1)
				return "Firefox";
			if (agt.indexOf("safari") != -1)
				return "Safari";
			if (agt.indexOf("skipstone") != -1)
				return "SkipStone";
			if (agt.indexOf("netscape") != -1)
				return "Netscape";
			if (agt.indexOf("mozilla/5.0") != -1)
				return "Mozilla";
			if (agt.indexOf("msie") != -1) {
				let rv = -1;
				if (navigator.appName == "Microsoft Internet Explorer") {
					let ua = navigator.userAgent;
					const re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(ua) != null)
						rv = parseFloat(RegExp.$1);
				}
				return "Internet Explorer " + rv;
			}
		},

		/**
		 * @name addComma
		 * @description 숫자에 천단위 콤마추가 및 꼬리말 추가 **
		 */
		addComma : function(pNumberString, pTrailer) {
			if (pNumberString == "-") {
				return pNumberString;
			}
			if (pNumberString == undefined) {
				return "";
			}

			let parts = pNumberString.toString().split(".");
			let str = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

			if (typeof pTrailer != "undefined") {
				str += pTrailer;
			}

			return str;
		},

		/**
		 * @name getObjVal
		 * @description Object 값 가져오기
		 * @param obj
		 *            Object 객체
		 * @param key
		 *            Object Key값
		 * @param defaultVal
		 *            기본값
		 */
		getObjVal : function getObjVal(obj, key, defaultVal) {
			if ($administStatsMain.util.isEmpty(obj))
				return "";

			if (obj[key] != undefined) {
				return obj[key];
			} else {
				return defaultVal === undefined ? "" : defaultVal;
			}
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

		/**
		 * @name sortJSON
		 * @description jsonArray json 값으로 정렬
		 * @param data
		 *            정렬대상배열
		 * @param key
		 *            정렬기준값 key
		 * @param type
		 *            asc OR desc
		 */
		sortJSON : function(data, key, type) {
			if (type == undefined) {
				type = "asc";
			}
			return data.sort(function(a, b) {
				const x = a[key];
				const y = b[key];
				if (type == "desc") {
					return x > y ? -1 : x < y ? 1 : 0;
				} else if (type == "asc") {
					return x < y ? -1 : x > y ? 1 : 0;
				}
			});
		},

		/**
		 * @name abbreviationToAddress
		 * @description 시도 약어로 replace
		 * @param address
		 *            시도
		 */
		abbreviationToAddress : function(address) {
			const abbreviationAddress = address.replace("특별시", "").replace("광역시", "").replace("특별자치시", "").replace("특별자치도", "").replace("경기도", "경기").replace("강원도", "강원").replace("충청북도", "충북").replace("충청남도", "충남").replace("전라북도", "전북").replace("전라남도", "전남").replace("경상북도", "경북").replace("경상남도", "경남");
			return abbreviationAddress;
		},

		/**
		 * @name monthByQuarter
		 * @description 분기로 월 구하기
		 * @param quarter
		 *            분기
		 */
		monthByQuarter : function(quarter) {
			let month = "";
			switch (quarter) {
				case "1":
					month = "2";
					break;
				case "2":
					month = "5";
					break;
				case "3":
					month = "8";
					break;
				case "4":
					month = "11";
					break;
			}
			return month;
		},

		/**
		 * @name getAPIParam
		 * @description API 파라미터 셋팅
		 */
		getAPIParam : function(pObj) {
			if(pObj == "") {
				pObj = "MORE1"
			}
			console.log(pObj);
			let result = {};
			pObj["iem_cl"] = $administStatsMain.util.getObjVal(pObj, "iem_cl", "");
			pObj["callback"] = $administStatsMain.util.getObjVal(pObj, "callback", undefined);

			const param = {
				org_id_list : "101",
				iem_cl : pObj["iem_cl"]
			}
			$.ajax({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/administStats/common/getDispSrvList.json",
				data : param,
				dataType : "json",
			}).done(function(res) {
				/* API파라미터 생성 */
				$.each(res.result.resultList, function(i, v) {
					/* [S]하드코딩여부 구분 */
					/* 하드코딩인 경우 key를 tblId로 */
					let key = v.chartSno;
					if (v.iemCl == "NEWLY" && $.inArray(v.chartSno, [ "1", "9" ]) > -1) {
						key = v.tblId;
					} else if (v.iemCl == "HOUSE" && $.inArray(v.chartSno, [ "2", "5", "6", "7" ]) > -1) {
						key = v.tblId;
					} else if (v.iemCl == "MIDDLE" && $.inArray(v.chartSno, [ "5", "7" ]) > -1) {
						key = v.tblId;
					} else if (v.iemCl == "RETURN" && $.inArray(v.chartSno, [ "4", "5" ]) > -1) {
						key = v.tblId;
						// } else if (v.iemCl == "MORE1") {
					} else if (v.iemCl == "MORE2" && $.inArray(v.chartSno, [ "4", "5", "6", "7", "8", "9" ]) > -1) {
						key = v.tblId;
						// } else if (v.iemCl == "MORE3") {
					}
					if (typeof result[key] == "undefined") {
						result[key] = {
							/* API PARAM */
							surv_year_list : "",
							org_id_list : v.orgId,
							tbl_id_list : v.tblId,
							list_var_ord_list : "",
							char_itm_id_list : "",
							prt_type : "",
							adm_cd : "",
							ov_l1_list : "",
							ov_l2_list : "",
							ov_l3_list : "",
							ov_l4_list : "",
							ov_l5_list : "",
							category : "",
							odr_col_list : "",
							odr_type : "",
							char_itm_id_list_arr : [],
							ov_l1_list_arr : [],
							ov_l2_list_arr : [],
							ov_l3_list_arr : [],
							ov_l4_list_arr : [],
							ov_l5_list_arr : [],
							/* SRV_DT_ST_LIST */
							opt_stattbUrl : v.stattbUrl,
							/* SRV_DT_ST_CHART_ITM_SETUP */
							opt_tblIds : [ v.tblId ],
							opt_chartSno : v.chartSno,
							opt_chartOrd : v.chartOrd,
							opt_chartType : (function() {
								switch (v.chartType) {
									case "CH1S06":
										return "pie";
										break;
									case "CH1S01":
										return "bar";
										break;
									case "CH1S02":
										return "column";
										break;
									case "CH1S03":
										return "area";
										break;
									case "CH1S07":
										return "treemap";
										break;
									case "CH1S08":
										return "line";
										break;
								}
							}()),
							opt_chartNm : v.chartNm,
							opt_chartCm : v.chartCm,
							opt_dispVarOrd : v.dispVarOrd,
							opt_dispDataKey : v.dispVarOrd == 0 ? "CHAR_ITM_ID" : "OV_L" + v.dispVarOrd + "_ID",
							opt_dispNameKey : v.dispVarOrd == 0 ? "CHAR_ITM_NM" : "OV_L" + v.dispVarOrd + "_KOR",
							opt_kosisUnitNm : v.kosisUnitNm, /* kosis 단위명 */
							opt_dispUnitNm : v.dispUnitNm, /* 단위명 */
							opt_rmndrUseYn : v.rmndrUseYn, /* 비활성화여부 */
							/* SRV_DT_ST_CHART_DET_ITM_SETUP */
							opt_dispSrvList : [],
							opt_sidoAll2 : "N", /* 시도코드 3자리인지 구분 */
							opt_chartNmByArea : "",
							opt_chartNmByYear : ""
						};
					}

					if (!$administStatsMain.util.isEmpty(v.chartNmByArea)) {
						result[key]["opt_chartNmByArea"] = v.chartNmByArea;
					}
					if (!$administStatsMain.util.isEmpty(v.chartNmByYear)) {
						result[key]["opt_chartNmByYear"] = v.chartNmByYear;
					}

					if (v.varOrd == 0) {
						result[key]["char_itm_id_list_arr"].push(v.itmId);
					} else if (v.varOrd > 0) {
						result[key]["ov_l" + v.varOrd + "_list_arr"].push(v.itmId);
					}

					if (v.itmId == "000" && v.altrtvDispWrd == "전국") {
						result[key].opt_sidoAll2 = "Y";
					}
					result[key].opt_dispSrvList.push(v);
				});
				for ( let k in result) {
					result[k].char_itm_id_list = result[k].char_itm_id_list_arr.join(",");
					result[k].ov_l1_list = result[k].ov_l1_list_arr.join(",");
					result[k].ov_l2_list = result[k].ov_l2_list_arr.join(",");
					result[k].ov_l3_list = result[k].ov_l3_list_arr.join(",");
					result[k].ov_l4_list = result[k].ov_l4_list_arr.join(",");
					result[k].ov_l5_list = result[k].ov_l5_list_arr.join(",");
					delete result[k].char_itm_id_list_arr;
					delete result[k].ov_l1_list_arr;
					delete result[k].ov_l2_list_arr;
					delete result[k].ov_l3_list_arr;
					delete result[k].ov_l4_list_arr;
					delete result[k].ov_l5_list_arr;
				}

				console.group("[" + $administStatsMain.ui.selectedThema + "] 차트 생성용 데이터 조회 API 파라미터");
				console.log(result);
				console.groupEnd();

				pObj["callback"](result);
			});
		},

		/**
		 * @name getVarianceText
		 * @description 증감 텍스트 반환
		 * @param param
		 *            파라미터
		 */
		getVarianceText : function(param) {

			const prefix = $administStatsMain.util.getObjVal(param, "prefix", "");
			const digits = $administStatsMain.util.getObjVal(param, "digits", 0);
			let val = $administStatsMain.util.getObjVal(param, "val", 0);
			if (digits > 0 && $.isNumeric(val)) {
				val = val.toFixed(digits);
			}
			const unit = $administStatsMain.util.getObjVal(param, "unit", "");
			const postfixs = $administStatsMain.util.getObjVal(param, "postfixs", []);
			const isColor = $administStatsMain.util.getObjVal(param, "isColor", true);
			const noDataMsg = $administStatsMain.util.getObjVal(param, "noDataMsg", "전년 자료 없음");

			let returnStr = prefix;
			if ($.isNumeric(val)) {
				if (val > 0) {
					if (isColor) {
						returnStr += "<span style='color: #E71909;'>";
					} else {
						returnStr += "<span>";
					}
					returnStr += $administStatsMain.util.addComma(val);
					if (!$administStatsMain.util.isEmpty(unit)) {
						returnStr += " " + unit;
					}
					if (postfixs.length > 0) {
						returnStr += " " + postfixs[0];
					}
				} else if (val < 0) {
					if (isColor) {
						returnStr += "<span style='color: #115BCB;'>";
					} else {
						returnStr += "<span>";
					}
					if (postfixs.length > 0) {
						returnStr += $administStatsMain.util.addComma(Math.abs(val))
					} else {
						returnStr += $administStatsMain.util.addComma(val);
					}
					if (!$administStatsMain.util.isEmpty(unit)) {
						returnStr += " " + unit;
					}
					if (postfixs.length > 0) {
						returnStr += " " + postfixs[1];
					}
					returnStr += "</span>";
				} else {
					returnStr += "<span>";
					returnStr += $administStatsMain.util.addComma(Math.abs(val));
					if (!$administStatsMain.util.isEmpty(unit)) {
						returnStr += " " + unit;
					}
				}
				returnStr += "</span>";
			} else {
				returnStr += noDataMsg;
			}
			return returnStr;
		},

		/**
		 * @name getTotsurvStatData
		 * @description 차트용 데이터 조회
		 * @param param
		 *            json type 파라미터
		 * @param callback
		 *            콜백함수
		 */
		getTotsurvStatData : function(param, callback) {

			let result;
			let chartId = "";
			let chartTitle = "";
			
			
			/* 파라미터 배열인 경우 */
			if ($.isArray(param)) {

				result = new Object();
				let isSuccess = true;
				const params = param;

				if (params[0].hasOwnProperty("regn_title")) {
					/* 지역별 차트인 경우 */
					chartId = "regnChart";
					chartTitle = params[0].regn_title;
				} else if (params[0].hasOwnProperty("tmsr_chartId")) {
					/* 연도별 차트인 경우 */
					chartId = params[0].tmsr_chartId;
					chartTitle = params[0].tmsr_title;
				} else if (params[0].hasOwnProperty("opt_chartId")) {
					/* 일반 차트인 경우 */
					chartId = params[0].opt_chartId;
					chartTitle = params[0].opt_chartNm;
				}

				/* 차트정보 추가 */
				$administStatsMain.ui.info[chartId] = params[0];

				for (let i = 0; i < params.length; i++) {
					const res = getTotsurvStatData_(params[i]);
					if (res.length > 0) {
						result[params[i].tbl_id_list] = _.cloneDeep(res);
					} else {
						isSuccess = false;
						console.group("차트 생성용 데이터 없음");
						console.log(chartTitle + "[" + chartId + "]");
						console.log("데이터 조회용 파라미터 ↓");
						console.log(params[i]);
						console.groupEnd();
						break;
					}
				}

				if (isSuccess) {
					callback(result, params[0]);
				} else {
					$administStatsMain.ui.setNoneChart(chartId, chartTitle);
				}
			} else {

				if (param.hasOwnProperty("regn_title")) {
					chartId = "regnChart";
					chartTitle = param.regn_title;
				} else if (param.hasOwnProperty("tmsr_chartId")) {
					chartId = param.tmsr_chartId;
					chartTitle = param.tmsr_title;
				} else if (param.hasOwnProperty("opt_chartId")) {
					chartId = param.opt_chartId;
					chartTitle = param.opt_chartNm;
				}

				if (!$administStatsMain.util.isEmpty(chartId)) {

					result = new Array();
					let isSuccess = true;

					$administStatsMain.ui.info[chartId] = param;

					const tblIdLists = param.tbl_id_list.split(",");
					for (let i = 0; i < tblIdLists.length; i++) {

						const param_ = $.extend(true, _.cloneDeep(param), {
							tbl_id_list : tblIdLists[i]
						});

						const res = getTotsurvStatData_(param_);
						if (res.length > 0) {
							result = result.concat(res);
						} else {
							isSuccess = false;
							console.group("차트 생성용 데이터 없음");
							console.log(chartTitle + "[" + chartId + "]");
							console.log("데이터 조회용 파라미터 ↓");
							console.log(param_);
							console.groupEnd();
							break;
						}
					}

					if (isSuccess) {
						callback(result, param);
					} else {
						if (!$administStatsMain.util.isEmpty(chartId)) {
							$administStatsMain.ui.setNoneChart(chartId, chartTitle);
						}
					}

				} else {
					const res = getTotsurvStatData_(param);
					if (res.length > 0) {
						result = res;
						callback(result, param);
					}
				}
			}

			function getTotsurvStatData_(param) {

				const param__ = _.cloneDeep(param);
				for ( let k in param__) {
					if (k.indexOf("_chartId") == -1 && k.indexOf("_chartSno") == -1) {
						if (k.indexOf("opt_") > -1 || k.indexOf("regn_") > -1 || k.indexOf("tmsr_") > -1) {
							delete param__[k];
							delete param__[k];
							delete param__[k];
						}
					}
				}

				let apiParamKey = "";
				if (param.opt_chartSno == undefined) {
					apiParamKey = param.tbl_id_list;
				} else {
					apiParamKey = param.opt_chartSno;
				}
				const opt_dispSrvList = $administStatsMain.util.getObjVal($administStatsMain.ui.apiParam[apiParamKey], "opt_dispSrvList", []);

				let result = [];
				console.log(param__);
				$.ajax({
					method : "GET",
					async : false,
					// url : contextPath + "/view/kosisApi/TotsurvStatData.do",
					url : sgis4thApiPath,
					data : param__,
					dataType : "json",
					success : function(res) {
						console.log(res);
						if (res.length > 0) {
							for (let k = 0; k < res.length; k++) {
								for (let j = 0; j < opt_dispSrvList.length; j++) {
									res[k]["dispUnitNm"] = opt_dispSrvList[j].dispUnitNm;
									res[k]["kosisUnitNm"] = opt_dispSrvList[j].kosisUnitNm;
									let dataKey = opt_dispSrvList[j].varOrd == "0" ? "CHAR_ITM_ID" : "OV_L" + opt_dispSrvList[j].varOrd + "_ID";
									let nameKey = opt_dispSrvList[j].varOrd == "0" ? "CHAR_ITM_NM" : "OV_L" + opt_dispSrvList[j].varOrd + "_KOR";
									if (opt_dispSrvList[j].itmId == res[k][dataKey]) {
										res[k][nameKey] = opt_dispSrvList[j].altrtvDispWrd;
										if (opt_dispSrvList[j].subsumYn == "Y") {
											res[k]["subsumYn"] = opt_dispSrvList[j].subsumYn;
										}
										if (opt_dispSrvList[j].unactivyYn == "Y") {
											res[k]["unactivyYn"] = opt_dispSrvList[j].unactivyYn;
										}
										if (opt_dispSrvList[j].clickEventYn == "Y") {
											res[k]["clickEventYn"] = opt_dispSrvList[j].clickEventYn;
										}
										if (opt_dispSrvList[j].ttipUseYn == "Y") {
											res[k]["ttipUseYn"] = opt_dispSrvList[j].ttipUseYn;
										}
										if (opt_dispSrvList[j].labelUseYn == "Y") {
											res[k]["labelUseYn"] = opt_dispSrvList[j].labelUseYn;
										}
										if (opt_dispSrvList[j].useYnByYearChart == "Y") {
											res[k]["useYnByYearChart"] = opt_dispSrvList[j].useYnByYearChart;
										}
										if (!$administStatsMain.util.isEmpty(opt_dispSrvList[j].chartNmByArea)) {
											res[k]["chartNmByArea"] = opt_dispSrvList[j].chartNmByArea;
										}
										if (!$administStatsMain.util.isEmpty(opt_dispSrvList[j].chartNmByYear)) {
											res[k]["chartNmByYear"] = opt_dispSrvList[j].chartNmByYear;
										}
									}
								}
							}
							result = res;
						}
					},
					error : function(e) {
						// alert("failed");
					}
				});
				return result;
			}
		},

		/**
		 * @name arrayToJson
		 * @description API Array를 Json으로 변환
		 * @param data
		 *            배열
		 * @param key
		 *            1레벨 key
		 * @param key2
		 *            2레벨 key
		 * @param ignoreValueArr
		 *            제외 값 배열
		 */
		arrayToJson : function(pObj) {
			let result = {};
			const p_data = $administStatsMain.util.getObjVal(pObj, "data", {});
			const p_key0 = $administStatsMain.util.getObjVal(pObj, "key0", "PRD_DE");
			const p_key = $administStatsMain.util.getObjVal(pObj, "key", "");
			const p_key2 = $administStatsMain.util.getObjVal(pObj, "key2", "");
			const p_ignoreValueArr = $administStatsMain.util.getObjVal(pObj, "ignoreValueArr", []);

			for (let i = 0; i < p_data.length; i++) {
				if ($.inArray(p_data[i][p_key], p_ignoreValueArr) === -1) {

					if (isNaN(p_data[i].DTVAL_CO * 1)) {
						p_data[i].DTVAL_CO = 0;
					}
					if (typeof p_data[i].DTVAL_CO == "string") {
						p_data[i].DTVAL_CO = p_data[i].DTVAL_CO * 1;
					}

					if (typeof result[p_data[i][p_key0]] == "undefined") {
						result[p_data[i][p_key0]] = new Object();
					}

					if ($administStatsMain.util.isEmpty(p_key)) {
						result[p_data[i][p_key0]] = p_data[i];
						continue;
					}

					if (typeof result[p_data[i][p_key0]][p_data[i][p_key]] == "undefined") {
						result[p_data[i][p_key0]][p_data[i][p_key]] = new Object();
					}

					if ($administStatsMain.util.isEmpty(p_key2)) {
						result[p_data[i][p_key0]][p_data[i][p_key]] = p_data[i];
						continue;
					}

					if (typeof result[p_data[i][p_key0]][p_data[i][p_key]][p_data[i][p_key2]] == "undefined") {
						result[p_data[i][p_key0]][p_data[i][p_key]][p_data[i][p_key2]] = new Object();
					}
					result[p_data[i][p_key0]][p_data[i][p_key]][p_data[i][p_key2]] = p_data[i];

				}
			}

			return result;
		},

		/**
		 * @name setAnother
		 * @description arrayToJson 결과에 다른 json 추가
		 */
		setAnother : function(data, pObj) {

			function setAnother_(data_, pObj_) {

				let p_prefixKey = $administStatsMain.util.getObjVal(pObj_, "prefixKey", "");
				let postfixKey = "_KOR";
				if (p_prefixKey == "CHAR_ITM") {
					postfixKey = "_NM";
				}
				const p_arr = $administStatsMain.util.getObjVal(pObj_, "arr", []);

				let evalTarget = "";
				for (let i = 0; i < p_arr.length; i++) {
					const evalStr = p_arr[i].evalStr.replace(/\$/gi, "");
					const title = $administStatsMain.util.getObjVal(p_arr[i], "title", $administStatsMain.util.getObjVal(data_[evalStr], p_prefixKey + postfixKey, ""));
					const id = $administStatsMain.util.getObjVal(p_arr[i], "id", evalStr);
					const evalStrArr = evalStr.split(/\+|\-|\/|\*/);
					evalTarget = p_arr[i].evalStr;

					if (typeof data_[id] == "undefined") {
						data_[id] = new Object();
					}

					for (let j = 0; j < evalStrArr.length; j++) {
						evalTarget = evalTarget.replace("$" + evalStrArr[j] + "$", data_[evalStrArr[j]] == undefined ? 0 : data_[evalStrArr[j]].DTVAL_CO);
					}

					data_[id][p_prefixKey + "_ID"] = id;
					data_[id][p_prefixKey + postfixKey] = title;
					data_[id]["DTVAL_CO"] = eval(evalTarget);
				}
			}

			function setAnother_level1(data_, pObj_) {

				let p_prefixKey = $administStatsMain.util.getObjVal(pObj_, "prefixKey", "");
				let postfixKey = "_KOR";
				if (p_prefixKey == "CHAR_ITM") {
					postfixKey = "_NM";
				}
				const p_arr = $administStatsMain.util.getObjVal(pObj_, "arr", []);

				for (let i = 0; i < p_arr.length; i++) {
					const evalStr = p_arr[i].evalStr.replace(/\$/gi, "");
					const title = $administStatsMain.util.getObjVal(p_arr[i], "title", $administStatsMain.util.getObjVal(data_[evalStr], p_prefixKey + postfixKey, ""));
					const id = $administStatsMain.util.getObjVal(p_arr[i], "id", evalStr);
					const evalStrArr = evalStr.split(/\+|\-|\/|\*/);

					let evalStrTemp = p_arr[i].evalStr;
					for (let j = 0; j < evalStrArr.length; j++) {
						evalStrTemp = evalStrTemp.replace("$" + evalStrArr[j] + "$", " ");
					}
					let evalStrOperArr = evalStrTemp.split(" ");
					evalStrOperArr = evalStrOperArr.filter(function(item) {
						return item !== null && item !== undefined && item !== "";
					});
					if (evalStrOperArr.length == 0) {
						evalStrOperArr.push("+");
					}

					if (typeof data_[id] == "undefined") {
						data_[id] = new Object();
					}

					let k = 0;
					for (let j = 0; j < evalStrArr.length; j++) {
						if (data_[evalStrArr[j]] != undefined) {
							for ( let k2 in data_[evalStrArr[j]]) {
								if (typeof data_[id][k2] == "undefined") {
									data_[id][k2] = _.cloneDeep(data_[evalStrArr[j]][k2]);
									data_[id][k2][p_prefixKey + "_ID"] = id;
									data_[id][k2][p_prefixKey + postfixKey] = title;
								} else {
									data_[id][k2]["DTVAL_CO"] = eval(data_[id][k2]["DTVAL_CO"] + "" + evalStrOperArr[0] + "" + data_[evalStrArr[j]][k2].DTVAL_CO);
									k++;
								}
							}
						}
					}
				}
			}

			const p_level = $administStatsMain.util.getObjVal(pObj, "level", 2);
			for ( let PRD_DE in data) {
				if (p_level != 2) {
					setAnother_level1(data[PRD_DE], pObj);
					continue;
				}
				if (data[PRD_DE][Object.keys(data[PRD_DE])[0]].DTVAL_CO != undefined) {
					setAnother_(data[PRD_DE], pObj);
					continue;
				}
				for ( let k1 in data[PRD_DE]) {
					setAnother_(data[PRD_DE][k1], pObj);
				}
			}

			return data;
		},

		/**
		 * @name setVariance
		 * @description arrayToJson 결과에 전년대비/전년동기대비 증감율(roc), 증감(iod) set
		 * @param data
		 *            json
		 */
		setVariance : function(data) {

			if ($.isNumeric(Object.keys(data)[0]) && (Object.keys(data)[0].length == 4 || Object.keys(data)[0].length == 6)) {
				for ( let PRD_DE in data) {
					if (data[PRD_DE].DTVAL_CO != undefined) {
						let lastYearVal = 0;
						const thisYearVal = data[PRD_DE].DTVAL_CO;
						let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
						if (PRD_DE.length > 4) {
							PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
						}
						if (typeof data[PRD_DE_last] == "object") {
							lastYearVal = data[PRD_DE_last].DTVAL_CO;
							data[PRD_DE].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
							data[PRD_DE].roc = isNaN(data[PRD_DE].roc) ? 0 : data[PRD_DE].roc;
							data[PRD_DE].iod = thisYearVal - lastYearVal * 1;
							data[PRD_DE].iod = isNaN(data[PRD_DE].iod) ? 0 : data[PRD_DE].iod;
						} else {
							data[PRD_DE].roc = "-";
							data[PRD_DE].iod = "-";
						}
						continue;
					}

					for ( let k1 in data[PRD_DE]) {
						if (data[PRD_DE][k1].DTVAL_CO != undefined) {
							let lastYearVal = 0;
							const thisYearVal = data[PRD_DE][k1].DTVAL_CO;
							let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
							if (PRD_DE.length > 4) {
								PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
							}
							if (typeof data[PRD_DE_last] == "object" && typeof data[PRD_DE_last][k1] == "object") {
								lastYearVal = data[PRD_DE_last][k1].DTVAL_CO;
								data[PRD_DE][k1].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
								data[PRD_DE][k1].roc = isNaN(data[PRD_DE][k1].roc) ? 0 : data[PRD_DE][k1].roc;
								data[PRD_DE][k1].iod = thisYearVal - lastYearVal * 1;
								data[PRD_DE][k1].iod = isNaN(data[PRD_DE][k1].iod) ? 0 : data[PRD_DE][k1].iod;
							} else {
								data[PRD_DE][k1].roc = "-";
								data[PRD_DE][k1].iod = "-";
							}
							continue;
						}

						for ( let k2 in data[PRD_DE][k1]) {
							let lastYearVal = 0;
							const thisYearVal = data[PRD_DE][k1][k2].DTVAL_CO;
							let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
							if (PRD_DE.length > 4) {
								PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
							}
							if (typeof data[PRD_DE_last] == "object" && typeof data[PRD_DE_last][k1][k2] == "object") {
								lastYearVal = data[PRD_DE_last][k1][k2].DTVAL_CO;
								data[PRD_DE][k1][k2].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
								data[PRD_DE][k1][k2].roc = isNaN(data[PRD_DE][k1][k2].roc) ? 0 : data[PRD_DE][k1][k2].roc;
								data[PRD_DE][k1][k2].iod = thisYearVal - lastYearVal * 1;
								data[PRD_DE][k1][k2].iod = isNaN(data[PRD_DE][k1][k2].iod) ? 0 : data[PRD_DE][k1][k2].iod;
							} else {
								data[PRD_DE][k1][k2].roc = "-";
								data[PRD_DE][k1][k2].iod = "-";
							}
						}
					}
				}

			} else {
				for ( let key1 in data) {
					for ( let PRD_DE in data[key1]) {
						if (data[key1][PRD_DE].DTVAL_CO != undefined) {
							let lastYearVal = 0;
							const thisYearVal = data[key1][PRD_DE].DTVAL_CO;
							let PRD_DE_last = ((PRD_DE * 1) - 1) + "";
							if (PRD_DE.length > 4) {
								PRD_DE_last = (PRD_DE.substring(0, 4) - 1) + "" + PRD_DE.substring(4, 6);
							}
							if (typeof data[key1][PRD_DE_last] == "object") {
								lastYearVal = data[key1][PRD_DE_last].DTVAL_CO;
								data[key1][PRD_DE].roc = (((thisYearVal - lastYearVal) / Math.abs(lastYearVal)) * 100);
								data[key1][PRD_DE].roc = isNaN(data[key1][PRD_DE].roc) ? 0 : data[key1][PRD_DE].roc;
								data[key1][PRD_DE].iod = thisYearVal - lastYearVal * 1;
								data[key1][PRD_DE].iod = isNaN(data[key1][PRD_DE].iod) ? 0 : data[key1][PRD_DE].iod;
							} else {
								data[key1][PRD_DE].roc = "-";
								data[key1][PRD_DE].iod = "-";
							}
							continue;
						}
					}
				}
			}

			return data;
		}

	};

	$administStatsMain.event = {

		/**
		 * @name setUIEvent
		 * @description UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 */
		setUIEvent : function() {
			$administStatsLeft.event.setUIEvent();
			const location = $administStatsMain.ui.getPosition();
			$administStatsMain.ui.getAreaSido(location[0]);

			const body = $("body");

			/* 지도 비활성화 이미지 top 조정 */
			$("#container").scroll(function() {
				if ($(".map_none").length > 0) {
					$(".map_none").css("top", $("#mapArea").offset().top + "px");
				}
			});

			/* 알림창 */
			body.on("click", "#commonAdministStats_popup_confirm_close", function() {
				$("#commonAdministStats_popup_back").hide();
				$("#commonAdministStats_popup_confirm").hide();
			});
			body.on("click", "#commonAdministStats_popup_alert_close", function() {
				$("#commonAdministStats_popup_back").hide();
				$("#commonAdministStats_popup_alert").hide();
			});
			body.on("click", "#lifeEnvironment_close", function() {
				$("#commonAdministStats_popup_back").hide();
				$("#lifeEnvironment").hide();
			});
			body.on("click", "#commonAdministStats_popup_area_detail_close", function() {
				$("#commonAdministStats_popup_back").hide();
				$("#common_popup_area_click").hide();
			});

			/* 기간 셀렉트박스 변경 */
			body.on("change", ".sb_year", function() {

				$administStatsMain.ui.loading(true);
				
				srvLogWrite("S0","01","08","00","",
					"year="+$administStatsMain.ui.selectedYear+",thema="+( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )); //jrj 로그

				$(".tag_year").text($(this).find("option:selected").text());

				$administStatsMain.ui.changeYear();

				setTimeout(function() {
					switch (gv_mode) {
						case "newly":
							$newlyDash.event.allChange($administStatsMain.ui.selectedArea, "3");
							break;
						case "house":
							$houseDash.event.allChange($administStatsMain.ui.selectedArea, "3");
							break;
						case "middl":
							$middlDash.event.allChange($administStatsMain.ui.selectedArea, "3");
							break;
						case "retun":
							$retunDash.event.allChange($administStatsMain.ui.selectedArea, "3");
							break;
						case "more1":
							$more1Dash.event.allChange("3");
							break;
						case "more2":
							$more2Dash.event.allChange("3");
							break;
						case "more3":
							$more3Dash.event.allChange("3");
							break;
					}
				}, 50);
			});

			/* 공유 */
			body.on("click", ".btn-share", function() {
				srvLogWrite("S0","01","05","00","",""); //jrj 로그

				const baseUrl = window.location.protocol + "//" + window.location.host + "/view/administStats/";
				let shareUrl = "";
				let themaStr = "";

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

				if ($administStatsMain.ui.selectedArea == "00") {
					shareUrl = baseUrl + themaStr + "?year=" + $administStatsMain.ui.selectedYear;
				} else {
					shareUrl = baseUrl + themaStr + "?year=" + $administStatsMain.ui.selectedYear + "&sido_cd=" + $administStatsMain.ui.selectedArea;
				}

				$("#shareUrl").val(shareUrl);

				const zIndex = 9999;
				const modalItm = $("#commonSharepopup");

				$commonChart.modalBg = "";
				$commonChart.modalBg = $("<div>").css({
					position : "fixed",
					zIndex : zIndex,
					left : "0px",
					top : "0px",
					width : "100%",
					height : "100%",
					overflow : "auto",
					backgroundColor : "rgba(0,0,0,0.4)"
				}).appendTo("body");

				modalItm.css({
					position : "fixed",
					boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
					zIndex : zIndex + 1,
					top : "50%",
					left : "50%",
					transform : "translate(-50%, -50%)",
					msTransform : "translate(-50%, -50%)",
					webkitTransform : "translate(-50%, -50%)"
				})

				$("#commonSharepopup").show();
			});
			/* 공유 팝업 닫기 */
			body.on("click", "#commonTotSurv_Sns_close", function() {
				$("#shareUrl").val("");
				if ($commonChart.modalBg != "") {
					$commonChart.modalBg.remove();
				}
				$("#commonSharepopup").hide();
			});
			/* 공유 팝업 닫기 버튼 */
			body.on("click", ".txtClose", function() {
				$("#shareUrl").val("");
				$commonChart.modalBg.remove();
				$("#commonSharepopup").hide();
			});
			/* 공유 팝업 url복사하기 */
			body.on("click", ".urlcopy", function() {
				copyToClipboard($("#shareUrl").val());
			});
			/* 카카오버튼 kakao */
			body.on("click", ".kakao", function() {
				try {
					Kakao.init("167fc6abf0eb4717e1f3de7895a0152a");
				} catch (e) {
				}

				Kakao.Auth.login({
					success : function(authObj) {
						const linkUrl = $("#shareUrl").val();
						console.log("로그인 success ########## kakao linkUrl = " + linkUrl);
						Kakao.API.request({
							url : "/v1/api/story/linkinfo",
							data : {
								url : encodeURIComponent(linkUrl)
							},
						}).then(function(res) {
							return Kakao.API.request({
								url : "/v1/api/story/post/link",
								data : {
									link_info : res
								}
							});
						}).then(function(res) {
							return Kakao.API.request({
								url : "/v1/api/story/mystory",
								data : {
									id : res.id
								},
								success : function(res) {
									commonAdministStats_alert("카카오스토리에 정상적으로 공유하였습니다.");
								},
								fail : function(error) {
									commonAdministStats_alert("카카오스토리에 공유를 실패하였습니다.<br />(" + error.error_description + ")");
								}
							});
						});
					},
					fail : function(error) {
						commonAdministStats_alert("카카오스토리에 공유를 실패하였습니다.<br />(" + error.error_description + ")");
					}
				});
			});
			/* 트위터 twitter */
			body.on("click", ".twitter", function() {
				const lv_url = $("#shareUrl").val();
				const lv_text = "[행정통계시각화]개인 관심주제에 맞는 공간통계정보를 제공합니다.";
				window.open("https://twitter.com/share?url=" + encodeURIComponent(lv_url) + "&text=" + encodeURIComponent(lv_text) + "&hashtags=");
				$("#commonTotSurv_popup_confirm_close").trigger("click");
			});
			/* 페이스북 face */
			body.on("click", ".face", function() {
				const lv_url = $("#shareUrl").val();
				console.log("lv_url = " + lv_url);
				// window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.protocol+"//"+window.location.host+contextPath+"view/administStats/populationDash?year="+$administStatsMain.ui.selectedYear));
				const rtn = window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(lv_url));
				$("#commonTotSurv_popup_confirm_close").trigger("click");
			});
			/* 네이버밴드 band */
			body.on("click", ".band", function() {
				const lv_url = $("#shareUrl").val();
				const rtn = window.open("https://band.us/plugin/share?body=" + encodeURIComponent(lv_url) + "&route=" + encodeURIComponent(lv_url));
				$("#commonTotSurv_popup_confirm_close").trigger("click");
			});

			/* 맵 이미지 저장 */
			body.on("click", ".downloadBtn", function() {
				if ($("#mapArea").find(".map_none").length > 0) {
					commonAdministStats_alert("지도가 없습니다.", function okFn(opt) {
						$("#commonAdministStats_popup_confirm_close").click();
					});
					return false;
				}
				const year = $(".sb_year option:selected").text().replace("/4", "");
				const title = $(".tag_title").text();
				let saveNm = (year + " " + title).replace(/ /gi, "_")
				$administStatsMain.ui.mapImageDown("#exportingMap", saveNm);
			});

			/* 사용가이드 */
			body.on("click", ".btn-guide", function() {
				const mode = $(this).data("mode");
				
				srvLogWrite("S0","01","01","00","",""); //jrj 로그
				
				if ($("#" + mode + "DashTuto").length > 0) {
					$("#" + mode + "DashTuto").show();
				} else {
					commonAdministStats_alert("준비 중입니다.", function okFn(opt) {
						$("#commonAdministStats_popup_confirm_close").click();
					});
				}
			});
			body.on("click", ".tuto_close_btn", function() {
				$(this).parent("div").hide();
			});

			/* 통계설명자료 */
			body.on("click", ".btn-statis", function() {
				const mode = $(this).data("mode");
				let key = "";

				switch (mode) {
					case "newly":
						key = "101082";
						break;
					case "house":
						key = "101080";
						break;
					case "middl":
						key = "101087";
						break;
					case "retun":
						key = "930002";
						break;
					case "more1":
						key = "101074";
						break;
					case "more2":
						key = "101084";
						break;
					case "more3":
						key = "101088";
						break;
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

			/* 보도자료 */
			body.on("click", ".btn-press", function() {
				const mode = $(this).data("mode");
				let key = "";

				switch (mode) {
					case "newly":
						key = "1/6/6";
						break;
					case "house":
						key = "1/10/4";
						break;
					case "middl":
						key = "1/6/8";
						break;
					case "retun":
						key = "1/8/11";
						break;
					case "more1":
						key = "1/3/5";
						break;
					case "more2":
						key = "1/6/7";
						break;
					case "more3":
						key = "1/3/5";
						break;
				}
				
				srvLogWrite("S0","01","03","00","",""); //jrj 로그

				if (!$administStatsMain.util.isEmpty(key)) {
					$administStatsMain.util.openPop("https://kostat.go.kr/portal/korea/kor_nw/" + key + "/index.board");
				} else {
					commonAdministStats_alert("준비 중입니다.", function okFn(opt) {
						$("#commonAdministStats_popup_confirm_close").click();
					});
				}
			});

			/* 지표설명 */
			body.on("click", ".btn-util-1", function() {
				/* TODO 지표설명 : 현재 받은 데이터 없음 */
				$("#helpTooltip").empty();
				const mode = $(this).context.dataset.chartId;
				//let top = $(this).offset().top +10+$("#divContent").scrollTop();
				let top = $(this).offset().top +10;
				let left = $(this).offset().left;
				let key = "";
				let html = "";
				
				switch (mode) {
					case "newlyChart1" :
						key = "* 시도항목에서 부부의 거처가 다른 경우 거주지역별 가중치(0.5)를 적용"
							+ "<br>* 전체에는 초혼, 재혼 외에 미상이 존재"
						break;
					case "newlyChart2" :
						key = "* 시도항목에서 부부의 거처가 다른 경우 거주지역별 가중치(0.5)를 적용"
							+  "<br>* 남편과 아내가 모두 일자리를 점유하고 있는 경우 ‘맞벌이’,"
							+  "<br> 남편 또는 아내 중 한 사람만 일자리를 점유한 경우에는 ‘외벌이’,"
							+  "<br> 남편과 아내 모두 일자리를 점유하지 않는 등의 사유로 미연계된 경우 ‘기타’로 분류"
						break;
					case "newlyChart3" :
						key = "* 시도항목에서 부부의 거처가 다른 경우 거주지역별 가중치(0.5)를 적용" 
							+  "<br>* 아내 기준으로 혼인신고 이전의 자녀도 모두 포함하여 산정"
						break;
					case "newlyChart4" :
						key = "* 시도항목에서 부부의 거처가 다른 경우 거주지역별 가중치(0.5)를 적용" 
							+ "<br>* 주택소유율: 주택을 소유한 부부의 비율"
						break;
					case "newlyChart5" :
						key = "* 시도항목에서 부부의 거처가 다른 경우 거주지역별 가중치(0.5)를 적용"
							+ "<br>* 주택자산가액은 주택공시가격(익년 1월1일 기준)을 적용하였으며,"
							+ "<br> 다른 사람과 공동으로 소유한 주택에 대해서는 소유한 주택의 지분을 반영하여 집계"
						break;
					case "newlyChart6" :
						key = "* 일을 통해서 벌어들이는 소득(근로소득 및 사업소득)에 대한 부부 합산액 작성"
							+ "<br>* 소득 평균: 소득 신고된 부부의 근로 및 사업소득을 신혼부부(소득 미신고자 포함) 수로 나눈 평균액"
						break;
					case "newlyChart7" :
						key = "* 금융권 대출 잔액이 있는 초혼 신혼부부를 대상으로 분포를 작성"
							+ "<br>* 금융권 대출(표본)은 금융권으로부터 빌린 가계대출 및 기업대출 잔액에 대한 부부 합산액 작성"
							+ "<br>· 2016년 자료: 가계대출, 2017년 이후 자료: 가계대출 및 기업대출"
						break;
						// 신혼부부통계 끝
					case "houseChart1" :
						key = "* 총주택 : 단독주택, 아파트, 연립주택, 다세대주택, 비거주용건물내 주택"
							+ "<br>* 국가, 지자체, 법인, 외국인 등이 소유한 주택 제외"
						break;
					case "houseChart2" :
						key = "* 국가, 지자체, 법인, 외국인 소유자 제외"
						break;
					case "houseChart3" :
						key = "* 일반가구: 가족으로 구성된 가구, 1인가구, 가족과 5인 이하의 남남으로 구성된 가구, 남남으로만 구성된 5인 이하 가구"
						break;
					case "houseChart4" :
						key = "* 주택소유율=주택을 소유한 가구수/일반가구수"
							+ "<br>· 일반가구: 가족으로 구성된 가구, 1인가구, 가족과 5인 이하의 남남으로 구성된 가구, 남남으로만 구성된 5인 이하 가구"
						break;
					case "houseChart5" :
						key = "* 주택소유율=주택을 소유한 가구수/일반가구수"
							+ "<br>· 일반가구: 가족으로 구성된 가구, 1인가구, 가족과 5인 이하의 남남으로 구성된 가구, 남남으로만 구성된 5인 이하 가구"
							+ "<br>* 연령대별 주택소유율=연령대별 주택소유 가구수/연령대별 일반가구수"
							+ "<br>· 연령대별 일반가구수=연령대별 주택소유 가구수+연령대별 무주택 가구수"
						break;
					case "houseChart6" :
						key = "* 주택소유율=주택을 소유한 가구수/일반가구수"
							+ "<br>· 일반가구: 가족으로 구성된 가구, 1인가구, 가족과 5인 이하의 남남으로 구성된 가구, 남남으로만 구성된 5인 이하 가구"
							+ "<br>* 가구원수별 주택소유율=가구원수별 주택소유 가구수/가구원수별 일반가구수"
							+ "<br>· 가구원수별 일반가구수=가구원수별 주택소유 가구수+가구원수별 무주택 가구수"
						break;
					case "houseChart7" :
						key = "* 주택소유율=주택을 소유한 가구수/일반가구수"
							+ "<br>· 일반가구: 가족으로 구성된 가구, 1인가구, 가족과 5인 이하의 남남으로 구성된 가구, 남남으로만 구성된 5인 이하 가구"
							+ "<br>* 세대구성별 주택소유율=세대구성별 주택소유 가구수/세대구성별 일반가구수"
							+ "<br>· 세대구성별 일반가구수=세대구성별 주택소유 가구수+세대구성별 무주택 가구수"
						break;
					// 주택소유통계
					case "middlChart3,middlChart4" :
						key = "* 등록취업자: 4대사회보험 등 공공기관에 신고(가입)된 행정자료를 활용하여 파악된 임금근로자 또는 비임금근로자"
						break;
					case "middlChart5,middlChart6" :
						key = "* 일을 통해 벌어들이는 소득(근로․사업소득)에 대해 작성"
						break;
					case "middlChart7,middlChart8" :
						key = "* 2016년은 개인대출(카드대출 포함)만을 대상으로 집계, 2017년 이후는 개인대출(카드대출 포함) 및 개인사업자대출 잔액을 합산하여 작성"
						break;
					case "middlChart9,middlChart10" :
						key = "* 일반가구를 대상으로 작성(집단(시설) 가구 및 외국인 가구 제외)"
							+ "<br>* 실거래가격이 아닌 주택공시가격(익년 1월 1일 기준)을 적용"
						break;
					case "middlChart11,middlChart12" :
						key = "* 연금가입의 범위: 공적연금(국민연금, 공무원연금, 사립학교교직원연금, 군인연금, 별정우체국연금), 퇴직연금(퇴직연금제도, 기업형IRP, 개인형퇴직연금제도(IRP))"
						break;
					//중장년층행정통계
					case "retunChart6" :
						key = "* 귀농: 동(<span style='font-family:auto;'>洞</span>) 지역에 1년 이상 거주한 사람이 대상기간 중 읍․면(<span style='font-family:auto;'>邑․面</span>) 지역으로 이동하여, [농업경영체등록명부, 농지원부, 축산업명부]에 등록한 사람"
							+ "<br>* 가구원 수는 귀농 당시 가구의 이동대상자를 기준으로 작성"
						break;
					case "retunChart7" :
						key = "* 귀어: 동(<span style='font-family:auto;'>洞</span>) 지역에 1년 이상 거주한 사람이 대상기간 중 읍․면(<span style='font-family:auto;'>邑․面</span>) 지역으로 이동하여, [어업경영체등록명부, 수협조합원명부 등 어업인으로 인정받을 수 있는 명부]에 등록한 사람"
							+ "<br>* 가구원 수는 귀어 당시 가구의 이동대상자를 기준으로 작성" 
						break;
					case "retunChart8" :
						key = "* 귀촌: 동(<span style='font-family:auto;'>洞</span>) 지역에 1년 이상 거주한 사람이 대상 기간 중 읍․면(<span style='font-family:auto;'>邑․面</span>) 지역으로 이동한 사람"
							+ "<br> · 학생, 군인, 직장근무지 이동으로 인한 일시적 이주, 귀농인 및 동반가구원, 귀어인 및 동반가구원 제외" 
						break;
					//귀농어귀촌인통계
					case "more1Chart1" :
						key = "* 임금일자리: 임금근로자가 차지하는 일자리로, 임금근로자란 기업체와 고용계약을 체결하여 일하고 그 대가로 급여, 일당 등을 받는 근로자를 말함. 상용/임시/일용근로자 등이 포함되며, 법인기업체의 대표자도 임금근로자에 포함"
							+ "<br>* 비임금일자리: 비임금근로자가 차지하는 일자리로, 개인기업체의 자영업자(자기책임하에 독립적인 형태로 전문적인 업을 수행하거나 기업체를 운영하는 사람)가 포함됨" 
						break;
					case "more1Chart2" :
						key = "* 영리기업과 비영리기업으로 구분, "
							+ "<br>· 영리기업은 다시 대기업과 중소기업으로 구분되며, 중소기업은 [중소기업기본법 시행령] 제3조에 따른 매출액 등의 규모기준과 독립성기준을 충족하는 경우 중소기업으로 분류" 
							+ "<br>· 비영리기업은 목적사업을 수행하고 수익을 창출한 후, 그 수익을 배분하지 못하고 비영리법인의 고유 목적에 사용하는 기업체로 사단법인, 재단법인, 공익법인, 사회복지법인 등을 말함" 
						break;
					case "more1Chart3" :
						key = "* 한국표준산업분류(KSIC, 제10차 개정)를 따름"
						break;
					case "more1Chart4" :
						key = "* 회사법인: 상법에 의하여 설립되어 법인격을 갖춘 조직체(주식회사, 합명회사, 합자회사, 유한회사, 외국회사)"
							+ "<br>* 회사이외법인: 민법에 의한 재단/사단법인과 특별법에 의한 특별법인(비영리법인, 학교법인, 사회복지법인, 의료법인, 특수법인)" 
							+ "<br>* 정부: 중앙행정기관, 지방자치단체, 국회, 법원, 국/공립학교 등" 
							+ "<br>* 비법인단체: 법인격이 없는 각종 단체나 모임(후원회, 종친회, 입주자대표회 등)" 
							+ "<br>* 개인기업체: 법인격을 갖추지 않고, 1인 또는 공동으로 경영하는 기업(개인사업자가 여러 사업체를 운영하는 경우 하나의 기업으로 봄)" 
						break;
					case "more1Chart5" :
						key = "* 연령은 7월1일 기준"
						break;
					case "more1Chart6" :
						key = "* 일자리: 기업체(사업체)에서 임금/비임금 근로활동을 하는 근로자가 점유한 고용위치(filled employment position)로, 연중 근로일수를 365일(윤년은 366일)로 나누어 일자리수 산정"
							+ "<br>예)  2019년 1년간 100일 일한 경우의 일자리는 [100일/365일=0.273개]로 계산" 
							+ "<br>* 일자리증감=신규일자리·소멸일자리" 
						break;
					case "more1Chart7" :
						key = "* 전년도대비 일자리 증감"
						break;
					case "more1Chart8" :
						key = "* 일자리 증감=신규일자리·소멸일자리"
						break;
					case "more1Chart9" :
						key = "* 일자리 증감=신규일자리·소멸일자리"
						break;
					case "more1Chart10" :
						key = "* 일자리 증감=신규일자리·소멸일자리"
						break;
					case "more1Chart11" :
						key = "* 전년도대비 일자리 증감"
						break;
					//일자리행정통계
					case "more2Chart1" :
						key = "* 기준년도 말일 기준 퇴직연금제도 계정에 적립된 금액"
						break;
					case "more2Chart2" :
						key = "* 확정급여형 퇴직연금: 가입자의 퇴직급여 수준이 사전에 확정되어 있는 제도, 운용주체는 사용자(사업장)"
							+ "<br>* 확정기여형 퇴직연금: 사용자의 부담금액 수준이 사전에 확정되어 있는 제도, 운용주체는 가입자(근로자)" 
							+ "<br>* IRP특례: 상시근로자가 10인 미만인 사업장을 위한 특례제도" 
							+ "<br>* 개인형 퇴직연금: 근로소득이나 사업소득이 있는 자가 자율 가입하거나, 이직 시에 받은 퇴직급여 일시금을 계속해서 적립∙운용하는 제도 확정기여형과 유사" 
						break;
					case "more2Chart4" :
						key = "* 전체 도입 사업장: 가입 대상 근로자의 존재 여부와 상관없이 퇴직연금에 가입한 근로자가 1인 이상 존재하는 사업장"
							+ "<br>* 도입률: 가입 대상근로자 1인 이상 존재 사업장 중에서 실제로 가입한 가입 대상 근로자가 있는 사업장의 비율" 
						break;
					case "more2Chart6" :
						key = "* 전체 가입 근로자: '가입 대상 근로자' 중 가입한 자와 '가입 대상 외 근로자' 중 가입한 자를 합산한 전체 퇴직연금 가입 근로자  · 가입 대상 근로자는 근속기간이 1년 이상인 임금근로자"
							+ "<br>* 가입률: 가입 대상 근로자 중 퇴직연금에 가입한 근로자의 비율" 
						break;
					case "more2Chart8,more2Chart9" :
						key = "* 개인형 퇴직연금 추가 가입자: 근로자퇴직급여보장법 시행령 개정('17.7.26. 시행)으로 개인형 퇴직연금 설정 대상이 아니었던 [자영업자, 단시간근로자 등, 퇴직금제도 적용자, 직역연금 적용자] 중 실제 가입한 인원"
						break;
					//퇴직연금통계	
					case "more3Chart1" :
						key = "* 기업체에 종사하는 임금근로자가 점유한 분기별 일자리(근로자가 점유한 고용위치)의 규모 및 전년동기대비 변화를 측정"
						break;
					case "more3Chart2" :
						key = "* 전년동기와 비교하여 일자리의 유지 여부 및 근로자의 대체 여부에 따라 지속/신규/대체/소멸 일자리로 구분"
							+ "<br><br>* 지속일자리: 당해연도와 전년도의 통계 작성 기준시점에 걸쳐 동일 기업체 내에서 동일한 근로자에 의해 지속적으로 일자리가 점유된 경우" 
							+ "<br><br>* 신규일자리: 당해연도와 전년도의 통계 작성 기준시점 사이에 기업체 생성이나 기업 내 사업 확장으로 새로 생긴 일자리" 
							+ "<br><br>* 대체일자리: 당해연도와 전년도의 통계 작성 기준시점 사이에 기업체 내의 이직이나 퇴직 발생으로 근로자가 대체된 일자리" 
							+ "<br><br>* 소멸일자리: 당해연도와 전년도의 통계 작성 기준시점 사이에 기업체 소멸이나 기업 내 사업축소로 사라진 일자리" 
						break;
					case "more3Chart3" :
						key = "* 한국표준산업분류 대분류별 임금근로 일자리의 전년동기대비 증감"
						break;
					case "more3Chart4" :
						key = "* 산업분류 중 제조업의 중분류별 임금근로 일자리의 전년동기대비 증감"
						break;
					case "more3Chart5" :
						key = "* 산업분류 중 서비스업의 중분류별 임금근로 일자리의 전년동기대비 증감"
						break;
					case "more3Chart6" :
						key = "* 근로자의 성별 임금근로 일자리 규모, 전체 일자리 대비 비중, 전년동기대비 증감"
						break;
					case "more3Chart7" :
						key = "* 근로자의 연령대별 임금근로 일자리 규모, 전체 일자리 대비 비중, 전년동기대비 증감"
						break;
					case "more3Chart8" :
						key = "* 기업체의 조직형태별(회사법인/회사이외 법인/ 정부·비법인단체/개인기업체) 임금근로 일자리의 규모, 전체 일자리 대비 비중, 전년동기대비 증감"
							break;
					//임근근로일자리동향
				}
				
				html += "<div class='helpToolTipDiv'>"; // 2020-11-09 [곽제욱] class 추가
				html += "	<sapn class='helpToolTipDiv' style='height:15px; background-color:#596070; color:#fff; display:block; padding:4px 11px 16px 10px;font-size: 13px; border-top-left-radius: 5px; border-top-right-radius: 5px;'>"+"지표설명 "+"</span>"; // 2020-11-09 [곽제욱] class 추가
				html += "	<button type='button' class='commonTotSurvPopcloseBtn' id='commonTotSurv_popup_confirm_close' title='팝업 닫기'></button>"; //2020.11.09[신예리] 대시 보드 설명 팝업 닫기 버튼 추가
				html += "</div>";
				html += "<div style='padding: 10px; border-bottom-left-radius: 5px; font-size: 13px; border-bottom-right-radius:5px; box-shadow: 0px 2px 5px rgba(0,0,0,0.3);letter-spacing: -1px;line-height: 17px;word-break: keep-all;'>";
				//html += "<table style='border-collapse: collapse;'>";
				//html += "	<tbody>";
				//html += "	<tr style='border-bottom-left-radius: 5px;border:1px; '>";
				html += key;
				//html += "	</tr>";
				//html += "	</tbody>";
				//html += "</table>";
				html += "</div>";
				
				if(left > 1600){
					left = 1600
				}
				
				$("#helpTooltip").css("left", left).css("top", top+10).css("position","absolute");
				$("#helpTooltip").append(html);
				$("#helpTooltip").show();
				
			});

			/* 차트 이미지 저장 */
			body.on("click", ".btn-util-4", function() {
				srvLogWrite("S0","01","06","00","","thema="+( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )); //jrj 로그
				
				if ((navigator.appName == "Netscape" && navigator.userAgent.search("Trident") != -1) || (agent.indexOf("msie") != -1)) {
					commonAdministStats_alert("IE에서는 이미지 다운로드 시 기능상 숫자 겹침이 <br />발생하므로 크롬을 이용해 주시기 바랍니다.", function okFn(opt) {
						$("#commonAdministStats_popup_confirm_close").click();
					})
				} else {

					const p_chartId = $(this).data("chartId");
					const chartIds = p_chartId.split(",");

					if (chartIds.length == 1) {
						if ($("#" + chartIds[0]).find(".chart_none").length > 0) {
							commonAdministStats_alert("차트가 없습니다.", function okFn(opt) {
								$("#commonAdministStats_popup_confirm_close").click();
							});
							return false;
						}
						// if ($.inArray($administStatsMain.ui.isThisBrowser, [
						// "Chrome", "Firefox", "Safari" ]) == -1) {
						// $administStatsMain.ui.loading(true);
						// AdministStatsChart.ui.exportingChart(chartIds[0]);
						// setTimeout(function() {
						// $administStatsMain.ui.loading(false);
						// }, 2500);
						// } else {
						AdministStatsChart.ui.exportingChart(chartIds[0], true);
						// }
					} else {

						// if ($.inArray($administStatsMain.ui.isThisBrowser, [
						// "Chrome", "Firefox", "Safari" ]) == -1) {
						// $administStatsMain.ui.loading(true);
						// for (let i = 0; i < chartIds.length; i++) {
						// const chartId = chartIds[i];
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
						// }
						// } else {
						for (let i = 0; i < chartIds.length; i++) {
							const chartId = chartIds[i];
							if ($("#" + chartId).find(".chart_none").length == 0) {
								AdministStatsChart.ui.exportingChart(chartId, true);
							}
						}
						// }
					}
				}
			});

			// 차트 이미지 저장
			body.on("click", ".btn-img", function() {
				/* 230116 [조규환] 보고서출력시 각 차트 다운로드 버튼 hide [S] */
				$('.flexClass').hide();
				$('.titleDownHideShow').hide();
				/* 230116 [조규환] 보고서출력시 각 차트 다운로드 버튼 hide [E] */
				
				$administStatsMain.ui.imageToCanvas("#container", "dash");
				
				/* 230116 [조규환] 보고서출력후 각 차트 다운로드 버튼 show [S] */
				setTimeout(function() {
					$('.flexClass').show();
					$('.titleDownHideShow').show();
				}, 500);
				/* 230116 [조규환] 보고서출력후 각 차트 다운로드 버튼 show [E] */
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

			/* 통계표 보기 */
			body.on("click", ".btn-util-2", function() {
				srvLogWrite("S0","01","07","00","","thema="+( $administStatsMain.ui.selectedThema ? $administStatsMain.ui.selectedThema.trim() : "" )); //jrj 로그
				
				const chartIds = $(this).data("chartId").split(",");

				let tblIds = [];
				for (let i = 0; i < chartIds.length; i++) {
					const chartId = chartIds[i];
					tblIds = tblIds.concat($administStatsMain.ui.info[chartId].opt_tblIds);
				}

				/* 중복제거 */
				const set = new Set(tblIds);
				tblIds = Array.from(set);

				for (let j = 0; j < tblIds.length; j++) {
					window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=" + tblIds[j] + "&conn_path=I2", "_blank");
				}
			});
		},

		set : function(pEvent, pSender, pCallback) {
			$("body").off(pEvent, pSender);
			$("body").on(pEvent, pSender, pCallback);
		}

	};
}(window, document));

/**
 * @name commonAdministStats_alert
 * @description 알림
 * @param p_msg
 *            메세지
 * @param p_callback
 *            확인버튼시 동작할 함수
 */
function commonAdministStats_alert(p_msg, p_callback) {
	// 화면 띄움
	$("#commonAdministStats_popup_back").show();
	$("#commonAdministStats_popup_alert").show();
	$("#commonAdministStats_popup_alert_message").html(p_msg);

	// 이전 이벤트 제거
	$("#commonAdministStats_popup_back").unbind();
	$("#commonAdministStats_popup_alert_ok").unbind();

	// 새로운 이벤트 맵핑
	$("#commonAdministStats_popup_back").click(function() {
		$("#commonAdministStats_popup_alert_close").click();
	});
	$("#commonAdministStats_popup_alert_ok").click(function() {
		$("#commonAdministStats_popup_alert_close").click();
		if (typeof p_callback === "function") {
			p_callback();
		}
	});
}

/**
 * @name commonAdministStats_confirm
 * @description 확인
 * @param p_msg
 *            메세지 p_callback : 확인버튼시 동작할 함수
 * @param p_callback2
 *            취소버튼시 동작할 함수
 */
function commonAdministStatsAdministStats_confirm(p_msg, p_callback, p_callback2) {
	// 화면 띄움
	$("#commonAdministStats_popup_back").show();
	$("#commonAdministStats_popup_confirm").show();
	$("#commonAdministStats_popup_confirm_message").html(p_msg);

	// 이전 이벤트 제거
	$("#commonAdministStats_popup_back").unbind();
	$("#commonAdministStats_popup_confirm_ok").unbind();
	$("#commonAdministStats_popup_confirm_cancel").unbind();

	// 새로운 이벤트 맵핑
	$("#commonAdministStats_popup_back").click(function() {
		$("#commonAdministStats_popup_confirm_close").click();
	});
	$("#commonAdministStats_popup_confirm_ok").click(function() {
		$("#commonAdministStats_popup_confirm_close").click();
		if (typeof p_callback === "function") {
			p_callback();
		}
	});
	$("#commonAdministStats_popup_confirm_cancel").click(function() {
		$("#commonAdministStats_popup_confirm_close").click();
		if (typeof p_callback2 === "function") {
			p_callback2();
		}
	});
}