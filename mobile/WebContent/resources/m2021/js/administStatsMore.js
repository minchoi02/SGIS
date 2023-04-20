(function (W, D) {
  W.$administStatsMap = W.$administStatsMap || {};

  $(document).ready(function () {
    common_loading(true);
    Highcharts.setOptions({
      lang: {
        thousandsSep: ",",
      },
    });
    $administStatsMap.event.setUIEvent();
    
    $(".leftCol .btnNavThematic").click(function(){
		if(!$(this).hasClass('active')){
    		$(this).addClass('active');
    		$(".nav-layer").css("display","block");
    	}else{
    		$(this).removeClass('active');
    		$(".nav-layer").css("display","none");
    	}
    });	
	
	
	$(".data-year").click(function(){
		if(!$(this).hasClass('active')){
    		$(this).addClass('active');

    	}else{
    		$(this).removeClass('active');

    	}
	})
	//2022-11-28 이벤트 추가
	 $("#common_popup_year_close").click(function(){
			$("#year-container").css("display","none");
			$("#common_popup_back").css("display","none");
			$(".data-year").removeClass('active');
	 });
	
	$("#administStatsYearPopOk").click(function(){
		$("#year-container").css("display","none");
		$("#common_popup_back").css("display","none");
		$(".data-year").removeClass('active');
		//2022-11-28 이벤트 추가
		 var parameterYearButton = $("#year-select-option option:selected");
         if (parameterYearButton.length > 0) {
           parameterYearButton.trigger("click");
         } else {
           $("#year-select-option>option:first").trigger("click");
         }
         $("#data-year").text($("#year-select-option option:selected").text());  
	});
  });

  $administStatsMap.ui = {
    chart: {} /* 해당 페이지 차트 object */,
    info: {} /* 차트 정보(key chartID) */,

    dftRegnParam: {} /* 기본 파라미터(지역별 차트 & 지도에 사용) */,
    selRegnParam: {} /* 선택된 차트 파라미터(지역별 차트 & 지도에 사용) */,

    dftTmsrParam: {} /* 기본 파라미터(시계열 차트에 사용) */,
    selTmsrParam: {} /* 선택된 차트 파라미터(시계열 차트에 사용) */,

    tmsr_data: {} /* 선택된 시계열 차트의 slice 하이라이트용 */,

    selectedArea: "" /* 선택된 지역 코드 */,

    apiParam: {},
    /**
     * @name         : tooltipMap
     * @description  : 레이어 팝업으로 나오는 지도에대한 툴팁
     */
    locationNameArray: ["전국"], //현재 지역 명칭array
    selectedAdmNm: "전국", //선택된 지역 이름
    year: null, //지도에 뿌려준 년도
    yearList: [], //조회할 수 있는 년도 리스트
    theme: null, //현재 페이지 테마 명
    /**
     * @name         : getMataDataUrl
     * @description  : kosis url 조회
     * @param survId : 조사ID
     */
    getMataDataUrl: function (survId) {
      $.ajax({
        method: "POST",
        async: true,
        url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotSurvInfo.json",
        data: { survId: survId },
        dataType: "json",
        success: function (res) {
          if (res.errCd == "0") {
            // 총조사시각화정보
            window.open(res.result.totSurvInfo[0].surv_url, "_blank");
          }
        },
        error: function (e) {
          console.error(e);
        },
      });
    },
    /**
     * @name         : themeData
     * @description  : 테마에 대한 필요 정보들
     */
    themeData: {},
    setChartTitle: function (yearType) {
      let year = $administStatsMap.ui.year;
      if (yearType === "Q") {
        let yearStr = year + "";
        year = yearStr.substr(0, 4) + "년 " + yearStr.substr(-1);
      }
      $("[data-id=text-year]").each(function () {
        $(this)
          .empty()
          .append(year + ($.heum.hasData($(this).data("append-text")) ? $(this).data("append-text") : ""), $.heum.hasData($(this).data("title-unit")) ? $("<span/>", { text: $(this).data("title-unit") }) : "");
      });
      $("[data-id=title-unit]").each(function () {
        $(this).append($("<span/>", { text: $(this).data("title-unit") }));
      });
    },

    info: {},
    setNoneChart: function (p_chartId, p_chartNm) {
      const noneMsg = "'" + p_chartNm + "' 자료가 없습니다.";
      $("#" + p_chartId).css("cursor", "default");
      switch (p_chartId) {
        case "regnChart":
          $("#" + p_chartId).html("<div class='chart_none'>해당 지표의 지역별 자료가 없습니다.</div>");
          $("#" + p_chartId)
            .closest(".col")
            .find("h4")
            .html("<span>지역별</span>&nbsp;" + p_chartNm)
            .attr("title", "지역별 " + p_chartNm);
          break;
        case "tmsrChart":
        case "tmsrChart2":
          $("#" + p_chartId).html("<div class='chart_none'>해당 년도의 자료가 없습니다.</div>");
          $("#" + p_chartId)
            .closest(".col")
            .find("h4")
            .html("<span>연도별</span>&nbsp;" + p_chartNm)
            .attr("title", "연도별 " + p_chartNm);
          break;
        default:
          $("#" + p_chartId).html("<div class='chart_none'>해당 년도의 자료가 없습니다.</div>");
          $("#" + p_chartId)
            .closest(".col")
            .find("h4")
            .text(p_chartNm);
          break;
      }
    },
  };
  $administStatsMap.event = {
    /**
     * @name         : setUIEvent
     * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
     * @date         : 2021. 12. 08.
     * @author	     :
     * @history      :
     */
    setUIEvent: async function () {
      let parameters = $.heum.getAllParameter();
      $administStatsMap.ui.theme = parameters.theme;
      const themeInfo = window["$" + $administStatsMap.ui.theme];
      const themeParameters = themeInfo.data.getParameters();
      const yearType = themeInfo.data.yearType || "Y";
      themeInfo.ui.layout();
      /* API 파라미터 setting */
      $administStatsMap.utils.getAPIParam({
        tblIdList: themeParameters.tbl_id_list,
        callback: function (res) {
          $administStatsMap.ui.apiParam = res;
        },
      });
      let lastQuater = 4;
      if (yearType == "Q" && themeInfo.data.getLastQuater) {
        try {
          lastQuater = await themeInfo.data.getLastQuater();
        } catch (e) {}
      }
      $("#year-select-option").empty();
      $.ajax({
        method: "POST",
        async: true,
        url: sgisContextPath + "/ServiceAPI/administStats/common/getYearList.json",
        data: themeParameters,
        dataType: "json",
        success: function (res) {
          if (res.errCd == "0") {
            $administStatsMap.ui.yearList = [];
            if ($.heum.hasData(res.result.resultList) && res.result.resultList.length > 0) {
              for (var i = parseInt(res.result.resultList[0].stattbEndYear); i >= parseInt(res.result.resultList[0].stattbBeginYear); i--) {
                let optionArr = [];
                if (yearType == "Y") {
                  $administStatsMap.ui.yearList.push(i);
                  optionArr.push({
                  	//2022-11-28 이벤트 추가
                    /*href: "#n",*/
                	class : "",
                    text: i + "년",
                    "data-value": i,
                  });
                } else if (yearType == "Q") {
                  for (let q = 4; q > 0; q--) {
                    const yearQuarter = i * 100 + q;
                    if (lastQuater >= yearQuarter) {
                      $administStatsMap.ui.yearList.push(yearQuarter);
                      /* 조회기준 표시는 19년 까지 표기 요청 */
                      if (i < 2019) continue;
                      optionArr.push({
                      	//2022-11-28 이벤트 추가
                        /*href: "#n",*/
                        class : "",
                        text: i + "년" + q + "분기",
                        "data-value": yearQuarter,
                      });
                    }
                  }
                }
                /* optionArr.forEach((option) => {
                  $("#year-select-option").append(
                    $("<a/>", option).click(function () {
                      let $this = $(this);
                      let year = $this.data("value");
                      $("#year-select > span:first-child").text($this.text());
                      $administStatsMap.ui.year = year;
                      if ($("#year-select-option").is(":visible")) {
                        $("#year-select").trigger("click");
                      }
                      $("#year-select-option > a").show();
                      $this.hide();
                      $administStatsMap.ui.setChartTitle(yearType);
                      themeInfo.ui.changeYear($this.data("value"));

                      //                      if (themeInfo.data.pressRelease[year]) {
                      //                        $(dashboard__ref_notice).show();
                      //                      } else {
                      //                        $(dashboard__ref_notice).hide();
                      //                      }
                    })
                  );
                });
              }
              //$("#year-select-option > a:first-child").hide(); 
              
              const parameterYearButton = $("#year-select-option a[data-value=" + $.heum.getAllParameter().year + "]");
              if (parameterYearButton.length > 0) {
                parameterYearButton.trigger("click");
              } else {
                $("#year-select-option>a:first").trigger("click");
              }
				*/
                optionArr.forEach((option) => {
                  $("#year-select-option").append(
                  //2022-11-28 이벤트 수정 및 추가
                    $("<option/>", option).click(function () {
                      let $this = $(this);
                      let year = $this.data("value");
                      $("#data-year > span:first-child").text($this.text());
                      $administStatsMap.ui.year = year;
                      if ($("#year-select-option").is(":visible")) {
                        $("#data-year").trigger("click");
                      }
                      $("#year-select-option > option").show();
                     // $this.hide();
                      $administStatsMap.ui.setChartTitle(yearType);
                      themeInfo.ui.changeYear($this.data("value"));

                      //                      if (themeInfo.data.pressRelease[year]) {
                      //                        $(dashboard__ref_notice).show();
                      //                      } else {
                      //                        $(dashboard__ref_notice).hide();
                      //                      }
                    })
                  );
                });
              }
              //$("#year-select-option > a:first-child").hide(); 
              
              const parameterYearButton = $("#year-select-option option:selected");
              if (parameterYearButton.length > 0) {
                parameterYearButton.trigger("click");
              } else {
                $("#year-select-option>option:first").trigger("click");
              }
            }
          }
          
        },
        error: function (e) {
          console.error(e);
        },
      });

      //보도자료 버튼 이벤트
      $("#press-release-button").click(() => {
        let pressRelease;
        if ($administStatsMap.ui.theme == "more1") {
          pressRelease = "1/3/5";
        } else if ($administStatsMap.ui.theme == "more2") {
          pressRelease = "1/6/7";
        } else if ($administStatsMap.ui.theme == "more3") {
          pressRelease = "1/3/5";
        }
        if (pressRelease) {
          const openTarget = window.open("about:blank");
          openTarget.location.href = "https://kostat.go.kr/portal/korea/kor_nw/" + pressRelease + "/index.board";
        }
        return false;
      });
      //보도자료 이름 변경
      $("#press_release_text").text($('meta[name="sub-title"]').attr("content"));
      // 통계표 링크
      $("body").on("click", "a.show-statistics", function () {
        const p_charts = $(this).closest(".dashboard__chart__con").parent().find(".dashboard__chart").filter(":visible");
        const chartIds = p_charts.map((index, chart) => {
          return $(chart).attr("id");
        });
        let tblIds = [];
        for (let i = 0; i < chartIds.length; i++) {
          const chartId = chartIds[i];
          tblIds = tblIds.concat($administStatsMap.ui.info[chartId].opt_tblIds);
        }
        const set = new Set(tblIds);
        tblIds = Array.from(set);

        for (let j = 0; j < tblIds.length; j++) {
          window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=" + tblIds[j] + "&conn_path=I2", "_blank");
        }

        // let isFail = true;
        // for (let j = 0; j < tblIds.length; j++) {
        //   const tblId = tblIds[j];
        //   if ($administStatsMap.ui.apiParam.hasOwnProperty(tblId)) {
        //     isFail = false;
        //     window.open($administStatsMap.ui.apiParam[tblId].opt_stattbUrls[0], "_blank");
        //   } else {
        //     console.group("통계표 조회 불가");
        //     console.log("TBL_ID[" + tblId + "]" + " API 파라미터 없음");
        //     console.groupEnd();
        //   }
        // }
        // if (isFail) {
        //   alert("통계표가 연결되어 있지 않습니다.");
        // }
      });
    },
  };
  $administStatsMap.utils = {
    ...$administStatsMap.utils,
    /**
     * @name : getAllTotsurvStatData
     * @description : 여러 차트 데이터 한번에 조회
     * @param paramAndCallback
     *            json type 파라미터, 콜백함수 배열
     */
    getAllTotsurvStatData: function (paramAndCallback) {
      if (Array.isArray(paramAndCallback)) {
        common_loading(true);
        const allRequests = paramAndCallback.map(([param, callback]) => {
          return this.getTotsurvStatData(param, callback);
        });
        Promise.all(allRequests).finally(() => common_loading(false));
      }
    },
    /**
     * @name : getTotsurvStatData
     * @description : 차트용 데이터 조회
     * @param param
     *            json type 파라미터
     * @param callback
     *            콜백함수
     */
    getTotsurvStatData: function (param, callback, async = true) {
      return new Promise((resolve) => {
        const isArrayParam = $.isArray(param);
        let result = new Object();
        let chartId = "";
        let chartTitle = "";
        const params = isArrayParam ? param : [param];

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
        $administStatsMap.ui.info[chartId] = params[0];
        const requests = params.map((param) => {
          return this.getAsyncTotsurvStatData_(param, async);
        });
        Promise.all(requests)
          .then((values) => {
            values.forEach(({ param, res }) => {
              result[param.tbl_id_list] = _.cloneDeep(res);
            });
            isArrayParam ? callback(result, params) : callback(result[params[0].tbl_id_list], params[0]);
          })
          .catch((error) => {
            console.log(error);
            $administStatsMap.ui.setNoneChart(chartId, chartTitle);
          })
          .finally(() => resolve());
      });
    },
    getAsyncTotsurvStatData_: function (param, async) {
      return new Promise((resolve, reject) => {
        $.ajax({
          //          method: "POST",
          method: "GET",
          async: async === false ? false : true,
          //          url: sgisContextPath + "/view/kosisApi/TotsurvStatData.do",
          url: sgis4thApiPath,
          // url : contextPath + "/view/totSurv/proxy?" +
          // encodeURIComponent("https://link.kostat.go.kr/view/kosisApi/TotsurvStatData.do"),
          data: param,
          dataType: "json",
          success: function (res) {
            if (res.length > 0) {
              for (let k = 0; k < res.length; k++) {
                const opt_dispSrvList = $administStatsMap.utils.getObjVal($administStatsMap.ui.apiParam[res[k].TBL_ID], "opt_dispSrvList", []);
                for (let j = 0; j < opt_dispSrvList.length; j++) {
                  res[k]["dispUnitNm"] = opt_dispSrvList[j].dispUnitNm;
                  res[k]["kosisUnitNm"] = opt_dispSrvList[j].kosisUnitNm;
                  if (opt_dispSrvList[j].varOrd == "0") {
                    if (opt_dispSrvList[j].itmId == res[k]["CHAR_ITM_ID"]) {
                      res[k]["CHAR_ITM_NM"] = opt_dispSrvList[j].altrtvDispWrd;
                    }
                  } else {
                    if (opt_dispSrvList[j].itmId == res[k]["OV_L" + opt_dispSrvList[j].varOrd + "_ID"]) {
                      res[k]["OV_L" + opt_dispSrvList[j].varOrd + "_KOR"] = opt_dispSrvList[j].altrtvDispWrd;
                    }
                  }
                }
              }
            }
            resolve({ param, res });
          },
          error: function (e) {
            alert("failed");
            reject(e);
          },
        });
      });
    },
    /**
     * @name addComma
     * @description 숫자에 천단위 콤마추가 및 꼬리말 추가 **
     */
    addComma: function (pNumberString, pTrailer) {
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
     * @name : arrayToJson
     * @description : API Array를 Json으로 변환
     * @param data
     *            배열
     * @param key
     *            1레벨 key
     * @param key2
     *            2레벨 key
     * @param ignoreValueArr
     *            제외 값 배열
     */
    arrayToJson: function (pObj) {
      let result = {};
      const p_data = $administStatsMap.utils.getObjVal(pObj, "data", {});
      const p_key0 = $administStatsMap.utils.getObjVal(pObj, "key0", "PRD_DE");
      const p_key = $administStatsMap.utils.getObjVal(pObj, "key", "");
      const p_key2 = $administStatsMap.utils.getObjVal(pObj, "key2", "");
      const p_ignoreValueArr = $administStatsMap.utils.getObjVal(pObj, "ignoreValueArr", []);

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

          if ($administStatsMap.utils.isEmpty(p_key)) {
            result[p_data[i][p_key0]] = p_data[i];
            continue;
          }

          if (typeof result[p_data[i][p_key0]][p_data[i][p_key]] == "undefined") {
            result[p_data[i][p_key0]][p_data[i][p_key]] = new Object();
          }

          if ($administStatsMap.utils.isEmpty(p_key2)) {
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
     * @name : setVariance
     * @description : arrayToJson 결과에 전년대비/전년동기대비 증감율(roc), 증감(iod) set
     * @param data
     *            json
     */
    setVariance: function (data) {
      if ($.isNumeric(Object.keys(data)[0]) && (Object.keys(data)[0].length == 4 || Object.keys(data)[0].length == 6)) {
        for (let PRD_DE in data) {
          if (data[PRD_DE].DTVAL_CO != undefined) {
            let lastYearVal = 0;
            const thisYearVal = data[PRD_DE].DTVAL_CO;
            let PRD_DE_last = PRD_DE * 1 - 1 + "";
            if (PRD_DE.length > 4) {
              PRD_DE_last = PRD_DE.substring(0, 4) - 1 + "" + PRD_DE.substring(4, 6);
            }
            if (typeof data[PRD_DE_last] == "object") {
              lastYearVal = data[PRD_DE_last].DTVAL_CO;
              data[PRD_DE].roc = ((thisYearVal - lastYearVal) / lastYearVal) * 100;
              data[PRD_DE].roc = isNaN(data[PRD_DE].roc) ? 0 : data[PRD_DE].roc;
              data[PRD_DE].iod = thisYearVal - lastYearVal * 1;
              data[PRD_DE].iod = isNaN(data[PRD_DE].iod) ? 0 : data[PRD_DE].iod;
            } else {
              data[PRD_DE].roc = "-";
              data[PRD_DE].iod = "-";
            }
            continue;
          }

          for (let k1 in data[PRD_DE]) {
            if (data[PRD_DE][k1].DTVAL_CO != undefined) {
              let lastYearVal = 0;
              const thisYearVal = data[PRD_DE][k1].DTVAL_CO;
              let PRD_DE_last = PRD_DE * 1 - 1 + "";
              if (PRD_DE.length > 4) {
                PRD_DE_last = PRD_DE.substring(0, 4) - 1 + "" + PRD_DE.substring(4, 6);
              }
              if (typeof data[PRD_DE_last] == "object" && typeof data[PRD_DE_last][k1] == "object") {
                lastYearVal = data[PRD_DE_last][k1].DTVAL_CO;
                data[PRD_DE][k1].roc = ((thisYearVal - lastYearVal) / lastYearVal) * 100;
                data[PRD_DE][k1].roc = isNaN(data[PRD_DE][k1].roc) ? 0 : data[PRD_DE][k1].roc;
                data[PRD_DE][k1].iod = thisYearVal - lastYearVal * 1;
                data[PRD_DE][k1].iod = isNaN(data[PRD_DE][k1].iod) ? 0 : data[PRD_DE][k1].iod;
              } else {
                data[PRD_DE][k1].roc = "-";
                data[PRD_DE][k1].iod = "-";
              }
              continue;
            }

            for (let k2 in data[PRD_DE][k1]) {
              let lastYearVal = 0;
              const thisYearVal = data[PRD_DE][k1][k2].DTVAL_CO;
              let PRD_DE_last = PRD_DE * 1 - 1 + "";
              if (PRD_DE.length > 4) {
                PRD_DE_last = PRD_DE.substring(0, 4) - 1 + "" + PRD_DE.substring(4, 6);
              }
              if (typeof data[PRD_DE_last] == "object" && typeof data[PRD_DE_last][k1][k2] == "object") {
                lastYearVal = data[PRD_DE_last][k1][k2].DTVAL_CO;
                data[PRD_DE][k1][k2].roc = ((thisYearVal - lastYearVal) / lastYearVal) * 100;
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
        for (let key1 in data) {
          for (let PRD_DE in data[key1]) {
            if (data[key1][PRD_DE].DTVAL_CO != undefined) {
              let lastYearVal = 0;
              const thisYearVal = data[key1][PRD_DE].DTVAL_CO;
              let PRD_DE_last = PRD_DE * 1 - 1 + "";
              if (PRD_DE.length > 4) {
                PRD_DE_last = PRD_DE.substring(0, 4) - 1 + "" + PRD_DE.substring(4, 6);
              }
              if (typeof data[key1][PRD_DE_last] == "object") {
                lastYearVal = data[key1][PRD_DE_last].DTVAL_CO;
                data[key1][PRD_DE].roc = ((thisYearVal - lastYearVal) / lastYearVal) * 100;
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
    },
    getVarianceText: function (param) {
      const prefix = $administStatsMap.utils.getObjVal(param, "prefix", "");
      const val = $administStatsMap.utils.getObjVal(param, "val", "");
      const unit = $administStatsMap.utils.getObjVal(param, "unit", "");
      const postfixs = $administStatsMap.utils.getObjVal(param, "postfixs", []);
      const isColor = $administStatsMap.utils.getObjVal(param, "isColor", true);
      const noDataMsg = $administStatsMap.utils.getObjVal(param, "noDataMsg", "전년 자료 없음");

      let returnStr = prefix;
      if ($.isNumeric(val)) {
        if (val > 0) {
          if (isColor) {
            returnStr += "<span style='color: #E71909;'>";
          } else {
            returnStr += "<span>";
          }
          returnStr += $administStatsMap.utils.addComma(val);
          if (!$administStatsMap.utils.isEmpty(unit)) {
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
            returnStr += $administStatsMap.utils.addComma(Math.abs(val));
          } else {
            returnStr += $administStatsMap.utils.addComma(val);
          }
          if (!$administStatsMap.utils.isEmpty(unit)) {
            returnStr += " " + unit;
          }
          if (postfixs.length > 0) {
            returnStr += " " + postfixs[1];
          }
          returnStr += "</span>";
        } else {
          returnStr += "<span>";
          returnStr += $administStatsMap.utils.addComma(val);
          if (!$administStatsMap.utils.isEmpty(unit)) {
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
     * @name : setAnother
     * @description : arrayToJson 결과에 다른 json 추가
     */
    setAnother: function (data, pObj) {
      function setAnother_(data_, pObj_) {
        let p_prefixKey = $administStatsMap.utils.getObjVal(pObj_, "prefixKey", "");
        let postfixKey = "_KOR";
        if (p_prefixKey == "CHAR_ITM") {
          postfixKey = "_NM";
        }
        const p_arr = $administStatsMap.utils.getObjVal(pObj_, "arr", []);

        let evalTarget = "";
        for (let i = 0; i < p_arr.length; i++) {
          const evalStr = p_arr[i].evalStr.replace(/\$/gi, "");
          const title = $administStatsMap.utils.getObjVal(p_arr[i], "title", $administStatsMap.utils.getObjVal(data_[evalStr], p_prefixKey + postfixKey, ""));
          const id = $administStatsMap.utils.getObjVal(p_arr[i], "id", evalStr);
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
        let p_prefixKey = $administStatsMap.utils.getObjVal(pObj_, "prefixKey", "");
        let postfixKey = "_KOR";
        if (p_prefixKey == "CHAR_ITM") {
          postfixKey = "_NM";
        }
        const p_arr = $administStatsMap.utils.getObjVal(pObj_, "arr", []);

        for (let i = 0; i < p_arr.length; i++) {
          const evalStr = p_arr[i].evalStr.replace(/\$/gi, "");
          const title = $administStatsMap.utils.getObjVal(p_arr[i], "title", $administStatsMap.utils.getObjVal(data_[evalStr], p_prefixKey + postfixKey, ""));
          const id = $administStatsMap.utils.getObjVal(p_arr[i], "id", evalStr);
          const evalStrArr = evalStr.split(/\+|\-|\/|\*/);

          let evalStrTemp = p_arr[i].evalStr;
          for (let j = 0; j < evalStrArr.length; j++) {
            evalStrTemp = evalStrTemp.replace("$" + evalStrArr[j] + "$", " ");
          }
          let evalStrOperArr = evalStrTemp.split(" ");
          evalStrOperArr = evalStrOperArr.filter(function (item) {
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
              for (let k2 in data_[evalStrArr[j]]) {
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

      const p_level = $administStatsMap.utils.getObjVal(pObj, "level", 2);
      for (let PRD_DE in data) {
        if (p_level != 2) {
          setAnother_level1(data[PRD_DE], pObj);
          continue;
        }
        if (data[PRD_DE][Object.keys(data[PRD_DE])[0]].DTVAL_CO != undefined) {
          setAnother_(data[PRD_DE], pObj);
          continue;
        }
        for (let k1 in data[PRD_DE]) {
          setAnother_(data[PRD_DE][k1], pObj);
        }
      }

      return data;
    },
    /**
     * @name : monthByQuarter
     * @description : 분기로 월 구하기
     * @param quarter
     *            분기
     */
    monthByQuarter: function (quarter) {
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
  };
})(window, document);
