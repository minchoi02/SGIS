/**
 * 행정통계시각화 > 통계더보기 > 퇴직연금
 *
 * @author : hjh
 */
(function (W, D) {
  W.$more2 = W.$more2 || {};
  $more2.data = {
    pressRelease: {
      //보도자료에서 사용될 연도별 파라미터
      2019: "387113",
      2018: "379638",
      2017: "367452",
      2016: "365345",
      2015: "358171",
    },
    getParameters: function () {
      return {
        org_id_list: "101",
        //tbl_id_list: "DT_1RP012,DT_1RP006,DT_1RP000,DT_1RP013,DT_1RP105,DT_1RP007,DT_1RP106,DT_1RP101,DT_1RP003,DT_1RP104",
        tbl_id_list: "DT_1RP013,DT_1RP012,DT_1RP006,DT_1RP105,DT_1RP007,DT_1RP106,DT_1RP000,DT_1RP101,DT_1RP003,DT_1RP104,DT_1RP018",
      };
    },
    getDataParameters: function () {
      return {};
    },
  };
  $more2.ui = {
    layout: function () {
      $("#main-tab li").click(function () {
        $("#main-tab li").removeClass("on");
        $(this).addClass("on");
        $("[data-id=main-tab-content]").hide();
        $("[data-id=main-tab-content]:eq(" + $("#main-tab li").index($(this)) + ")").show();
        const tabFunc = $(this).data("tab-function");
        $more2.event.tabData(tabFunc);
      });

      $("[data-type=tab] li").click(function () {
        $(this).parent().children("li").removeClass("on");
        $(this).addClass("on");
        const selectNo = $(this).parent().children("li").index($(this));
        const tabContent = $(this).parent().data("tab-content");
        $("." + tabContent).hide();
        $("." + tabContent + ":eq(" + selectNo + ")").show();
      });
    },
    /**
     * @name : changeYear
     * @description : 년도 선택시 데이터 가져오기
     */
    changeYear: function (year) {
      $more2.event.summaryData();
      const tabFunc = $("#main-tab li.on").data("tab-function");
      $more2.event.tabData(tabFunc);
    },
  };

  $more2.util = {};

  $more2.event = {
    summaryData: function () {
      const params = [
        {
          surv_year_list: $administStatsMap.ui.year - 1 + "," + $administStatsMap.ui.year,
          org_id_list: "101",
          tbl_id_list: "DT_1RP013",
          list_var_ord_list: "",
          char_itm_id_list: "T03",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "0",
          ov_l2_list: "0",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "summaryData",
          opt_chartType: "summary",
          opt_chartNm: "총괄 데이터",
          opt_tblIds: ["DT_1RP013", "DT_1RP006", "DT_1RP000"],
        },
        {
          surv_year_list: $administStatsMap.ui.year - 1 + "," + $administStatsMap.ui.year,
          org_id_list: "101",
          tbl_id_list: "DT_1RP006",
          list_var_ord_list: "",
          char_itm_id_list: "T02",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "0",
          ov_l2_list: "0",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
        },
        {
          surv_year_list: $administStatsMap.ui.year - 1 + "," + $administStatsMap.ui.year,
          org_id_list: "101",
          tbl_id_list: "DT_1RP000",
          list_var_ord_list: "",
          char_itm_id_list: "T001",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "0",
          ov_l2_list: "0",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
        },
      ];
      $administStatsMap.utils.getTotsurvStatData(params, setSummaryData);
    },
    tabData: function (tabFuncNm) {
      const tabRequest = $more2.event[tabFuncNm]();
      $administStatsMap.utils.getAllTotsurvStatData(tabRequest);
    },
    /**
     * @name : mainTab01
     * @description : 운용현황 탭
     * @param mode
     */
    mainTab01: function () {
      const tabRequest = [];
      //chart01
      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.yearList.join(","),
            org_id_list: "101",
            tbl_id_list: "DT_1RP013",
            list_var_ord_list: "",
            char_itm_id_list: "T03",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "0",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart1",
            opt_chartType: "line",
            opt_chartNm: "퇴직연금 총 적립금액",
            opt_tblIds: ["DT_1RP013"],
          },
        ],
        more2Chart1, //calback
      ]);

      //chart02
      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1RP013",
            list_var_ord_list: "",
            char_itm_id_list: "T03",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0,1,2,3,4",
            ov_l2_list: "0,1,2,3",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart2",
            opt_chartType: "bar",
            opt_chartNm: "제도유형별 운용방법별 적립금",
            opt_tblIds: ["DT_1RP013"],
          },
        ],
        more2Chart2, //calback
      ]);

      //chart03
      tabRequest.push([
        (params = [
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1RP012",
            list_var_ord_list: "",
            char_itm_id_list: "T03",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0,1,2,3,4,5",
            ov_l2_list: "0,1,2,3",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart3",
            opt_chartType: "bar",
            opt_chartNm: "금융권역별 운용방법별 적립금",
            opt_tblIds: ["DT_1RP012"],
          },
        ]),
        more2Chart3, //calback
      ]);

      return tabRequest;
    },
    /**
     * @name : mainTab02
     * @description : 사업장 탭
     * @param mode
     */
    mainTab02: function () {
      const tabRequest = [];
      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.yearList.join(","),
            org_id_list: "101",
            tbl_id_list: "DT_1RP006",
            list_var_ord_list: "",
            char_itm_id_list: "T02",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "0",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart4",
            opt_chartNm: "총 도입 사업장수",
            opt_tblIds: ["DT_1RP006"],
          },
        ],
        more2Chart4,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.yearList.join(","),
            org_id_list: "101",
            tbl_id_list: "DT_1RP105",
            list_var_ord_list: "",
            char_itm_id_list: "T13",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart4_1",
            opt_chartNm: "총 사업장 도입률",
            opt_tblIds: ["DT_1RP105"],
          },
        ],
        more2Chart4_1,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
            org_id_list: "101",
            tbl_id_list: "DT_1RP007",
            list_var_ord_list: "",
            char_itm_id_list: "T02",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "C,F,G,I,K,M,Q",
            ov_l2_list: "0",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart5",
            opt_chartNm: "주요 산업별 전체 도입 사업장 및 도입률",
            opt_tblIds: ["DT_1RP007"],
          },
        ],
        more2Chart5,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
            org_id_list: "101",
            tbl_id_list: "DT_1RP106",
            list_var_ord_list: "",
            char_itm_id_list: "T16",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "C,F,G,I,K,M,Q",
            ov_l2_list: "",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart5_1",
            opt_chartNm: "주요 산업별 전체 사업장 도입률",
            opt_tblIds: ["DT_1RP106"],
          },
        ],
        more2Chart5_1,
      ]);

      return tabRequest;
    },
    /**
     * @name : mainTab03
     * @description : 근로자 탭
     * @param mode
     */
    mainTab03: function () {
      const tabRequest = [];
      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.yearList.join(","),
            org_id_list: "101",
            tbl_id_list: "DT_1RP000",
            list_var_ord_list: "",
            char_itm_id_list: "T001",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "0",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart6",
            opt_chartNm: "총 가입 근로자수",
            opt_tblIds: ["DT_1RP000"],
          },
        ],
        more2Chart6,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.yearList.join(","),
            org_id_list: "101",
            tbl_id_list: "DT_1RP101",
            list_var_ord_list: "",
            char_itm_id_list: "T13",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "00",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart6_1",
            opt_chartNm: "총 가입 근로자 가입률",
            opt_tblIds: ["DT_1RP101"],
          },
        ],
        more2Chart6_1,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
            org_id_list: "101",
            tbl_id_list: "DT_1RP003",
            list_var_ord_list: "",
            char_itm_id_list: "T001",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "C,F,G,I,K,M,Q",
            ov_l2_list: "0",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart7",
            opt_chartNm: "주요 산업별 전체 가입근로자",
            opt_tblIds: ["DT_1RP003"],
          },
        ],
        more2Chart7,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
            org_id_list: "101",
            tbl_id_list: "DT_1RP104",
            list_var_ord_list: "",
            char_itm_id_list: "T13",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "C,F,G,I,K,M,Q",
            ov_l2_list: "",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart7_1",
            opt_chartNm: "주요 산업별 전체 근로자 가입률 현황",
            opt_tblIds: ["DT_1RP104"],
          },
        ],
        more2Chart7_1,
      ]);
      return tabRequest;
    },
    /**
     * @name : mainTab04
     * @description : 기타 탭
     * @param mode
     */
    mainTab04: function () {
      const tabRequest = [];
      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1RP009",
            list_var_ord_list: "",
            char_itm_id_list: "T01",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "00",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart8",
            opt_chartType: "pie",
            opt_chartNm: "제도변경에 따른 개인형 퇴직연금 추가 가입 현황",
            opt_tblIds: ["DT_1RP009"],
          },
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1RP011",
            list_var_ord_list: "",
            char_itm_id_list: "T01",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "0",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
          },
        ],
        more2Chart8,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1RP009",
            list_var_ord_list: "",
            char_itm_id_list: "T01",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "0",
            ov_l2_list: "00",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart9",
            opt_chartType: "column",
            opt_chartNm: "제도변경에 따른 개인형 퇴직연금 추가 가입 현황",
            opt_tblIds: ["DT_1RP011", "DT_1RP009"],
          },
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1RP011",
            list_var_ord_list: "",
            char_itm_id_list: "T01",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "1,2,3,4",
            ov_l2_list: "0",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
          },
        ],
        more2Chart9,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
            org_id_list: "101",
            tbl_id_list: "DT_1RP018",
            list_var_ord_list: "",
            char_itm_id_list: "T05",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "02,03,04,05,06,07,08,09,10,11",
            ov_l2_list: "1,2,3,4,5,6,7",
            ov_l3_list: "0",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more2Chart10",
            opt_chartNm: "사유별 연령대별 중도인출 현황",
            opt_tblIds: ["DT_1RP018"],
          },
        ],
        more2Chart10,
      ]);
      return tabRequest;
    },
    allChange: function (mode) {
      common_loading(true);
      let params = [];
      /* 년도 선택 무시 */
      if (mode != "3") {
      }
      setTimeout(function () {
        common_loading(false);
      }, 1000);
    },
  };
})(window, document);

/**
 * @name        : setSummaryData
 * @description : 총괄 요약정보 데이터 셋팅
 */
function setSummaryData(res) {
  /*
		DT_1RP013 : 총 적립금액
		DT_1RP006 : 도입 사업장 수
		DT_1RP000 : 가입 근로자 수
	*/
  let chartDatas = {};
  let total = {
    current: 0,
    before: null,
  };

  Object.keys(res).forEach((key) => {
    const items = res[key];

    if (chartDatas[key] === undefined) {
      chartDatas[key] = {
        current: null,
        before: null,
      };
    }
    items.forEach((item) => {
      const value = parseFloat(item.DTVAL_CO);
      if ($administStatsMap.ui.year == item.PRD_DE) {
        chartDatas[key].current = value;
      } else if ($administStatsMap.ui.year - 1 == item.PRD_DE) {
        chartDatas[key].before = value;
      }
    });
  });

  const _setData = ({ key, data }) => {
    $("[data-id=" + key + "-total]").text($.heum.setThousandSeparator(data.current));
    const $el = $("[data-id=" + key + "-rt]");
    if (data.before) {
      const v = data.current - data.before;
      const rtv = (v / data.before) * 100;
      const rt = rtv.toFixed(1);

      $el.parent().show();
      $el.removeClass("state-up state-down").text(" " + Math.abs(rt) + "%");
      if (rtv > 0) {
        $el.addClass("state-up");
      } else if (rtv < 0) {
        $el.addClass("state-down");
      }
    } else {
      $el.parent().hide();
    }
  };

  _setData({ key: "DT_1RP013", data: chartDatas.DT_1RP013 });
  _setData({ key: "DT_1RP006", data: chartDatas.DT_1RP006 });
  _setData({ key: "DT_1RP000", data: chartDatas.DT_1RP000 });
}

/**
 * @name : more2Chart1
 * @description : 퇴직연금 차트1
 */
function more2Chart1(data, params) {
  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
      key: "OV_L1_ID",
    })
  );
  let categories = [];
  const series = [
    {
      data: (function () {
        let data = [];
        Object.keys(toJson)
          .sort()
          .forEach(function (PRD_DE) {
            const v = toJson[PRD_DE]["0"];
            categories.push(PRD_DE);
            data.push({
              y: v.DTVAL_CO,
              dataObj: v,
            });
          });
        return data;
      })(toJson),
      color: "#6076BA",
    },
  ];
  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.filename = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.marginRight = 5;
  opt.tooltipPositioner = true;
  opt.tooltipHeader = function (that) {
    return that.point.category + "년";
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " 백만원 " +
      "<br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.roc) ? that.point.dataObj.roc.toFixed(1) : that.point.dataObj.roc,
        unit: "%",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };
  opt.dataLabelsTextOutline = true;
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y) + " 백만원";
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart2
 * @description : 퇴직연금 차트2
 */
function more2Chart2(data, params) {
  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
      key: "OV_L1_ID",
      key2: "OV_L2_ID",
    })
  );
  let series = [];
  let categories = [];
  let totals = [];

  const colors = ["#338CCA", "#F6A347", "#2FB9BC"].reverse();
  const curYear = $administStatsMap.ui.year;

  /* [PRD_DE]현재년도 [OV_L1_ID]제도유형별 */
  Object.keys(toJson[curYear])
    .sort()
    .forEach(function (OV_L1_ID) {
      if (OV_L1_ID != "0") {
        /* [0]계 제외 */
        let cate = toJson[curYear][OV_L1_ID][Object.keys(toJson[curYear][OV_L1_ID])[1]].OV_L1_KOR;
        if (cate === "개인형 퇴직연금") cate += "(IRP)";
        categories.push(cate);
        totals.push(toJson[curYear][OV_L1_ID][0].DTVAL_CO);
      }
    });

  /* [PRD_DE]현재년도 [OV_L2_ID]운용방법별 */
  const OV_L1_ID_0 = Object.keys(toJson[curYear])[1];
  Object.keys(toJson[curYear][OV_L1_ID_0])
    .sort()
    .reverse()
    .forEach(function (OV_L2_ID) {
      if (OV_L2_ID != "0") {
        /* [0]계 제외 */
        const v = toJson[curYear][OV_L1_ID_0][OV_L2_ID];
        series.push({
          name: v.OV_L2_KOR,
          data: (function (OV_L2_ID) {
            let dataArr = [];
            /* [PRD_DE]현재년도 [OV_L1_ID]제도유형별 */
            Object.keys(toJson[curYear])
              .sort()
              .forEach(function (OV_L1_ID) {
                if (OV_L1_ID != "0") {
                  /* [0]계 제외 */
                  dataArr.push({
                    y: toJson[curYear][OV_L1_ID][OV_L2_ID].DTVAL_CO,
                    dataObj: toJson[curYear][OV_L1_ID][OV_L2_ID],
                    dataLabels: {
                      x: (function () {
                        if (OV_L2_ID == "2") {
                          return -15;
                        } else if (OV_L2_ID == "3") {
                          return 10;
                        }
                      })(OV_L2_ID),
                    },
                  });
                }
              });
            return dataArr;
          })(OV_L2_ID),
          OV_L2_ID: v.OV_L2_ID,
        });
      }
    });

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.marginRight = 25;
  // opt.yAxis = {
  //   max: 200,
  // stackLabels: {
  //   enabled: true,
  //   textAlign: "right",
  //   x: 150,
  //   style: {
  //     color: "#000000",
  //     textOutline: false,
  //     fontSize: "11px",
  //   },
  //   formatter: function () {
  //     return $administStatsMap.utils.addComma(totals[this.x]) + " 백만원";
  //   },
  // },
  // };
  opt.colors = colors;
  opt.dataLabelsTextOutline = true;
  opt.dataLabelsInside = true;
  opt.seriesShowInLegend = true;
  opt.stacking = "percent";
  opt.isBigExporting = true;
  opt.tooltipHeader = function (that) {
    return that.point.category + " " + that.point.series.name;
  };
  opt.tooltipFormatter = function (that) {
    return "<span class='color-red font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.y) + "</span>" + " 백만원";
  };
  opt.dataLabelsFormatter = function (that) {
    return that.point.percentage.toFixed(1) + " %";
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMap.utils.addComma(that.point.y) + " 백만원)";
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart3
 * @description : 퇴직연금 차트3
 */
function more2Chart3(data, params) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data[params[0].tbl_id_list],
    key: "OV_L1_ID",
    key2: "OV_L2_ID",
  });
  let series = [];
  let categories = [];
  let totals = [];
  const curYear = $administStatsMap.ui.year;
  const colors = ["#338CCA", "#F6A347", "#2FB9BC"].reverse();

  /* [PRD_DE]현재년도 [OV_L1_ID]금융권역별 */
  Object.keys(toJson[curYear])
    .sort()
    .forEach(function (OV_L1_ID) {
      if (OV_L1_ID != "0") {
        /* [0]계 제외 */
        categories.push(toJson[curYear][OV_L1_ID][Object.keys(toJson[curYear][OV_L1_ID])[1]].OV_L1_KOR);
        totals.push(toJson[curYear][OV_L1_ID][0].DTVAL_CO);
      }
    });

  /* [PRD_DE]현재년도 [OV_L2_ID]운용방법별 */
  const OV_L1_ID_0 = Object.keys(toJson[curYear])[1];
  Object.keys(toJson[curYear][OV_L1_ID_0])
    .sort()
    .reverse()
    .forEach(function (OV_L2_ID) {
      if (OV_L2_ID != "0") {
        /* [0]계 제외 */
        const v = toJson[curYear][OV_L1_ID_0][OV_L2_ID];
        series.push({
          name: v.OV_L2_KOR,
          data: (function (OV_L2_ID) {
            let dataArr = [];
            /* [PRD_DE]현재년도 [OV_L1_ID]금융권역별 */
            Object.keys(toJson[curYear])
              .sort()
              .forEach(function (OV_L1_ID) {
                if (OV_L1_ID != "0") {
                  /* [0]계 제외 */
                  dataArr.push({
                    y: toJson[curYear][OV_L1_ID][OV_L2_ID].DTVAL_CO,
                    dataObj: toJson[curYear][OV_L1_ID][OV_L2_ID],
                    dataLabels: {
                      x: (function () {
                        if (OV_L2_ID == "2") {
                          return -15;
                        } else if (OV_L2_ID == "3") {
                          return 10;
                        }
                      })(OV_L2_ID),
                    },
                  });
                }
              });
            return dataArr;
          })(OV_L2_ID),
          OV_L2_ID: v.OV_L2_ID,
        });
      }
    });

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.marginRight = 25;
  // opt.yAxis = {
  //   max: 200,
  //   stackLabels: {
  //     enabled: true,
  //     textAlign: "right",
  //     x: 150,
  //     style: {
  //       color: "#000000",
  //       textOutline: false,
  //     },
  //     formatter: function () {
  //       return $administStatsMap.utils.addComma(totals[this.x]) + " 백만원";
  //     },
  //   },
  // };
  opt.colors = colors;
  opt.dataLabelsTextOutline = true;
  opt.dataLabelsInside = true;
  opt.seriesShowInLegend = true;
  opt.stacking = "percent";
  opt.isBigExporting = true;
  opt.tooltipHeader = function (that) {
    return that.point.category + " " + that.point.series.name;
  };
  opt.tooltipFormatter = function (that) {
    return "<span class='color-red font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.y) + "</span>" + " 백만원";
  };
  opt.dataLabelsFormatter = function (that) {
    return that.point.percentage.toFixed(1) + " %";
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMap.utils.addComma(that.point.y) + " 백만원)";
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart4
 * @description : 퇴직연금 차트4
 */
function more2Chart4(data, params) {
  /* 총 도입 사업장 수 */
  const toJson1 = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
    })
  );
  let columnDataArr = [];
  let categories = [];

  Object.keys(toJson1)
    .sort()
    .forEach(function (PRD_DE) {
      const v1 = toJson1[PRD_DE];
      categories.push(PRD_DE);
      columnDataArr.push({
        y: v1.DTVAL_CO,
        dataObj: v1,
        PRD_DE: PRD_DE,
        roc: v1.roc,
      });
    });

  const columnDataArr_ = $administStatsMap.utils.sortJSON(columnDataArr.slice(), "y", "asc");
  const min = columnDataArr_[0].y;
  const max = columnDataArr_[columnDataArr_.length - 1].y;

  const series = [
    {
      name: "총 도입 사업장 수(개소)",
      type: "column",
      data: columnDataArr,
      color: "#52BEBE",
    },
  ];

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.filename = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.spacingTop = 20;
  opt.tooltipPositioner = true;
  opt.tooltipHeader = function (that) {
  	return that.point.category+"년";
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " 개소 <br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.roc) ? that.point.roc.toFixed(1) : that.point.roc,
        unit: "%",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(개소)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
      min: min,
      max: max,
    },
  ];

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart4_1
 * @description : 퇴직연금 차트4
 */
function more2Chart4_1(data, params) {
  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
    })
  );
  let lineDataArr = [];
  let categories = [];

  Object.keys(toJson)
    .sort()
    .forEach(function (PRD_DE) {
      const v2 = toJson[PRD_DE];
      categories.push(PRD_DE);
      lineDataArr.push({
        y: v2.DTVAL_CO,
        dataObj: v2,
        PRD_DE: PRD_DE,
        iod: v2.iod,
      });
    });
  const series = [
    {
      name: "도입률(%)",
      data: lineDataArr,
      color: "#27A7DF",
    },
  ];

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.filename = params[0].opt_chartNm;
  opt.series = series;
  opt.spacingTop = 20;
  opt.xAxis = {
    categories: categories,
  };

  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(%)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
    },
  ];

  opt.tooltipPositioner = true;
  opt.tooltipHeader = function (that) {
    return that.point.category + "년";
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "%</span>" +
      " <br/>" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.iod) ? Math.round(that.point.iod * 10) / 10 : that.point.roc,
        unit: "%p",
        postfixs: ["증가 ↑", "감소 ↓"],
      })
    );
  };
  opt.dataLabelsTextOutline = true;
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart5
 * @description : 퇴직연금 차트5
 */
function more2Chart5(data, params) {
  let toJsons = {};
  $.each(params, function (i, v) {
    toJsons[v.tbl_id_list] = $administStatsMap.utils.setVariance(
      $administStatsMap.utils.arrayToJson({
        data: data[v.tbl_id_list],
        key: "OV_L1_ID",
      })
    );
    toJsons[v.tbl_id_list + "Arr"] = [];
  });

  let categories = [];

  const curYear = $administStatsMap.ui.year;

  Object.keys(toJsons[params[0].tbl_id_list][curYear])
    .sort()
    .forEach(function (OV_L1_ID) {
      categories.push(toJsons[params[0].tbl_id_list][curYear][OV_L1_ID].OV_L1_KOR);
      $.each(params, function (i, v) {
        toJsons[v.tbl_id_list + "Arr"].push({
          y: toJsons[v.tbl_id_list][curYear][OV_L1_ID].DTVAL_CO,
          dataObj: toJsons[v.tbl_id_list][curYear][OV_L1_ID],
        });
      });
    });

  const series = [
    {
      name: "총 도입 사업장 수(개소)",
      type: "column",
      color: "#52BEBE",
      data: toJsons[params[0].tbl_id_list + "Arr"],
    },
  ];

  const columnDataArr_ = $administStatsMap.utils.sortJSON(toJsons[params[0].tbl_id_list + "Arr"].slice(), "y", "asc");
  const min = columnDataArr_[0].y;
  const max = columnDataArr_[columnDataArr_.length - 1].y;

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.spacingTop = 20;

  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " 개소 <br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.roc) ? that.point.dataObj.roc.toFixed(1) : that.point.dataObj.roc,
        unit: "%",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };

  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(개소)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
    },
  ];

  opt.exportingSeries = [
    {
      dataLabels: {
        enabled: true,
        inside: true,
        color: "#52BEBE",
      },
    },
  ];
  opt.exportingYAxis = [
    {
      title: {
        enabled: true,
        text: "(개소)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
    },
  ];

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart5_1
 * @description : 퇴직연금 차트5
 */
function more2Chart5_1(data, params) {
  let toJsons = {};
  $.each(params, function (i, v) {
    toJsons[v.tbl_id_list] = $administStatsMap.utils.setVariance(
      $administStatsMap.utils.arrayToJson({
        data: data[v.tbl_id_list],
        key: "OV_L1_ID",
      })
    );
    toJsons[v.tbl_id_list + "Arr"] = [];
  });

  let categories = [];
  const curYear = $administStatsMap.ui.year;
  Object.keys(toJsons[params[0].tbl_id_list][curYear])
    .sort()
    .forEach(function (OV_L1_ID) {
      categories.push(toJsons[params[0].tbl_id_list][curYear][OV_L1_ID].OV_L1_KOR);
      $.each(params, function (i, v) {
        toJsons[v.tbl_id_list + "Arr"].push({
          y: toJsons[v.tbl_id_list][curYear][OV_L1_ID].DTVAL_CO,
          dataObj: toJsons[v.tbl_id_list][curYear][OV_L1_ID],
        });
      });
    });

  const series = [
    {
      name: "도입률(%)",
      type: "column",
      yAxis: 0,
      data: toJsons[params[0].tbl_id_list + "Arr"],
      color: "#27A7DF",
    },
  ];

  const columnDataArr_ = $administStatsMap.utils.sortJSON(toJsons[params[0].tbl_id_list + "Arr"].slice(), "y", "asc");
  const min = columnDataArr_[0].y;
  const max = columnDataArr_[columnDataArr_.length - 1].y;

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.spacingTop = 20;

  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " %<br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.iod) ? Math.round(that.point.dataObj.iod * 10) / 10 : that.point.dataObj.iod,
        unit: "%p",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };

  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(%)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 0,
      min: min,
      max: max,
    },
  ];
  opt.exportingSeries = [
    {
      dataLabels: {
        enabled: true,
        color: "#27A7DF",
      },
    },
  ];
  opt.exportingYAxis = [
    {
      title: {
        enabled: true,
        text: "(%)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 0,
    },
  ];

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart6
 * @description : 퇴직연금 차트6
 */
function more2Chart6(data, params) {
  /* 총 가입 근로자수 */
  const toJson1 = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
    })
  );

  let columnDataArr = [];
  let categories = [];

  Object.keys(toJson1)
    .sort()
    .forEach(function (PRD_DE) {
      const v1 = toJson1[PRD_DE];
      categories.push(PRD_DE);
      columnDataArr.push({
        y: v1.DTVAL_CO,
        dataObj: v1,
        PRD_DE: PRD_DE,
        roc: v1.roc,
      });
    });

  const columnDataArr_ = $administStatsMap.utils.sortJSON(columnDataArr.slice(), "y", "asc");
  const min = columnDataArr_[0].y;
  const max = columnDataArr_[columnDataArr_.length - 1].y;

  const series = [
    {
      name: "총 가입 근로자수(명)",
      type: "column",
      color: "#EEA863",
      data: columnDataArr,
    },
  ];

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.filename = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.spacingTop = 20;
  opt.tooltipPositioner = true;

  opt.tooltipHeader = function (that) {
    return that.point.category + "년";
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " 명 <br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.roc) ? that.point.dataObj.roc.toFixed(1) : that.point.dataObj.roc,
        unit: "%",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };

  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(명)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
      min: min,
      max: max,
    },
  ];
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart6
 * @description : 퇴직연금 차트6
 */
function more2Chart6_1(data, params) {
  /* 가입률 */
  const toJson2 = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
    })
  );
  let lineDataArr = [];
  let categories = [];

  Object.keys(toJson2)
    .sort()
    .forEach(function (PRD_DE) {
      const v2 = toJson2[PRD_DE];
      categories.push(PRD_DE);

      lineDataArr.push({
        y: v2.DTVAL_CO,
        dataObj: v2,
        PRD_DE: PRD_DE,
        roc: v2.roc,
      });
    });

  const columnDataArr_ = $administStatsMap.utils.sortJSON(lineDataArr.slice(), "y", "asc");
  const min = columnDataArr_[0].y;
  const max = columnDataArr_[columnDataArr_.length - 1].y;

  const series = [
    {
      name: "가입률(%)",
      type: "line",
      yAxis: 0,
      data: lineDataArr,
      color: "#EB644E",
    },
  ];

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.filename = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.spacingTop = 20;
  opt.tooltipPositioner = true;
  opt.tooltipHeader = function (that) {
    return that.point.category + "년";
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " %<br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.iod) ? Math.round(that.point.dataObj.iod * 10) / 10 : that.point.dataObj.iod,
        unit: "%p",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(%)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
    },
  ];

  opt.exportingSeries = [
    {
      dataLabels: {
        enabled: true,
        color: "#EB644E",
      },
    },
  ];
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart7
 * @description : 퇴직연금 차트7
 */
function more2Chart7(data, params) {
  let toJsons = {};
  $.each(params, function (i, v) {
    toJsons[v.tbl_id_list] = $administStatsMap.utils.setVariance(
      $administStatsMap.utils.arrayToJson({
        data: data[v.tbl_id_list],
        key: "OV_L1_ID",
      })
    );
    toJsons[v.tbl_id_list + "Arr"] = [];
  });

  let categories = [];
  const curYear = $administStatsMap.ui.year;
  Object.keys(toJsons[params[0].tbl_id_list][curYear])
    .sort()
    .forEach(function (OV_L1_ID) {
      categories.push(toJsons[params[0].tbl_id_list][curYear][OV_L1_ID].OV_L1_KOR);
      $.each(params, function (i, v) {
        toJsons[v.tbl_id_list + "Arr"].push({
          y: toJsons[v.tbl_id_list][curYear][OV_L1_ID].DTVAL_CO,
          dataObj: toJsons[v.tbl_id_list][curYear][OV_L1_ID],
        });
      });
    });

  const series = [
    {
      name: "총 가입 근로자수(명)",
      type: "column",
      color: "#EEA863",
      data: toJsons[params[0].tbl_id_list + "Arr"],
    },
  ];

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.spacingTop = 20;
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " 명 <br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.roc) ? that.point.dataObj.roc.toFixed(1) : that.point.dataObj.roc,
        unit: "%",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(명)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
    },
  ];

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart7_1
 * @description : 퇴직연금 차트7
 */
function more2Chart7_1(data, params) {
  let toJsons = {};
  $.each(params, function (i, v) {
    toJsons[v.tbl_id_list] = $administStatsMap.utils.setVariance(
      $administStatsMap.utils.arrayToJson({
        data: data[v.tbl_id_list],
        key: "OV_L1_ID",
      })
    );
    toJsons[v.tbl_id_list + "Arr"] = [];
  });

  let categories = [];
  const curYear = $administStatsMap.ui.year;
  Object.keys(toJsons[params[0].tbl_id_list][curYear])
    .sort()
    .forEach(function (OV_L1_ID) {
      categories.push(toJsons[params[0].tbl_id_list][curYear][OV_L1_ID].OV_L1_KOR);
      $.each(params, function (i, v) {
        toJsons[v.tbl_id_list + "Arr"].push({
          y: toJsons[v.tbl_id_list][curYear][OV_L1_ID].DTVAL_CO,
          dataObj: toJsons[v.tbl_id_list][curYear][OV_L1_ID],
        });
      });
    });

  const series = [
    {
      name: "가입률(%)",
      type: "column",
      yAxis: 0,
      data: toJsons[params[0].tbl_id_list + "Arr"],
      color: "#EB644E",
    },
  ];

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.spacingTop = 20;
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " %<br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.iod) ? Math.round(that.point.dataObj.iod * 10) / 10 : that.point.dataObj.iod,
        unit: "%p",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(%)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 0,
    },
  ];

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart8
 * @description : 퇴직연금 차트8
 */
function more2Chart8(data, params) {
  const toJson1 = $administStatsMap.utils.arrayToJson({
    data: data[params[0].tbl_id_list],
    key: "OV_L1_ID",
  });
  const toJson2 = $administStatsMap.utils.arrayToJson({
    data: data[params[1].tbl_id_list],
    key: "OV_L1_ID",
  });

  if (!toJson1[$administStatsMap.ui.year] || !toJson2[$administStatsMap.ui.year]) {
    $("#more2Chart8").parent().parent().hide();
    return false;
  } else {
    $("#more2Chart8").parent().parent().show();
  }
  let series = [
    {
      innerSize: "0%",
      enableMouseTracking: false,
      data: [
        {
          name: "전체 가입자",
          y: toJson1[$administStatsMap.ui.year]["0"].DTVAL_CO,
          color: "#FFFFFF",
          dataObj: toJson1[$administStatsMap.ui.year]["0"],
        },
      ],
      dataLabels: {
        useHTML: true,
        distance: -100,
        headerFormat: "",
        pointFormat: "{point.name}<br />{point.y:,0f}&nbsp;명",
        footerFormat: "",
        style: {
          textAlign: "center",
          color: "#000000",
          fontSize: "12px",
        },
      },
    },
    {
      innerSize: "60%",
      data: [
        {
          name: "추가 가입자",
          y: toJson2[$administStatsMap.ui.year]["0"].DTVAL_CO,
          color: AdministStatsChart.consts.sliceHighlightColor,
          dataObj: toJson2[$administStatsMap.ui.year]["0"],
          dataLabels: {
            style: {
              color: AdministStatsChart.consts.sliceHighlightColor,
            },
          },
        },
        {
          name: "기존 가입자",
          y: toJson1[$administStatsMap.ui.year]["0"].DTVAL_CO - toJson2[$administStatsMap.ui.year]["0"].DTVAL_CO,
          color: "#338CCA",
          dataObj: toJson1[$administStatsMap.ui.year]["0"],
        },
      ],
    },
  ];

  let exportingSeries = [];
  exportingSeries.push(_.cloneDeep(series[0]));
  exportingSeries.push(_.cloneDeep(series[1]));
  exportingSeries[0].dataLabels.distance = -180;

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.pie = {
    size: "80%",
    center: ["50%", "50%"],
  };
  opt.exporting = {
    chartOptions: {
      plotOptions: {
        pie: {
          size: "100%",
        },
      },
    },
  };
  opt.exportingSeries = exportingSeries;
  opt.tooltipFormatter = function (that) {
    if ($.inArray(that.point.name, ["계"]) > -1) {
      return false;
    }
    return "<span class='color-red font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.y) + "</span>" + " 명";
  };
  opt.dataLabelsFormatter = function (that) {
    return that.point.name + "<br />" + that.point.percentage.toFixed(1) + " %";
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return opt.dataLabelsFormatter(that) + (!opt.tooltipFormatter(that) ? "" : "<br />(" + opt.tooltipFormatter(that) + ")");
  };

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart9
 * @description :
 */
function more2Chart9(data, params) {
  const toJson1 = $administStatsMap.utils.arrayToJson({
    data: data[params[0].tbl_id_list],
    key: "OV_L1_ID",
  });
  const toJson2 = $administStatsMap.utils.arrayToJson({
    data: data[params[1].tbl_id_list],
    key: "OV_L1_ID",
  });

  var totList = data[params[1].tbl_id_list];
  var sumTot = 0;
  for (let i = 0; i < totList.length; i++) {
	    sumTot += totList[i].DTVAL_CO;
	  }
  
  if (!toJson1[$administStatsMap.ui.year] || !toJson2[$administStatsMap.ui.year]) {
    $("#more2Chart9").parent().parent().hide();
    return false;
  } else {
    $("#more2Chart9").parent().parent().show();
  }

  const colors = ["#A2273D", "#C23945", "#E24F4F", "#ED8379", "#F6A696"];
  let series = [];

  Object.keys(toJson2[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      const v = toJson2[$administStatsMap.ui.year][OV_L1_ID];
      series.push({
        name: (function () {
          // TODO
          switch (OV_L1_ID) {
            case "1":
              return "자영업자";
              break;
            case "2":
              return "단시간근로";
              break;
            case "3":
              return "퇴직금제도";
              break;
            case "4":
              return "직역연금";
              break;
          }
        })(),
        data: [
          {
            y: (v.DTVAL_CO / sumTot) * 100,
            dataObj: v,
          },
        ],
        DTVAL_CO: (v.DTVAL_CO / sumTot) * 100,
      });
    });

  series = $administStatsMap.utils.sortJSON(series, "DTVAL_CO", "desc");

  for (let i = 0; i < series.length; i++) {
    series[i].color = colors[i];
  }

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    type: "category",
    title: {
      enabled: true,
      text: "추가 가입 현황",
      style: {
        color: AdministStatsChart.consts.sliceHighlightColor,
      },
    },
    labels: {
      enabled: false,
    },
  };
  opt.seriesShowInLegend = true;
  opt.stacking = "percent";
  opt.legend = {
    align: "right",
    verticalAlign: "top",
    layout: "vertical",
    itemMarginTop: 2,
    itemMarginBottom: 2,
  };
  opt.tooltipFormatter = function (that) {
    return "<span class='color-red font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.dataObj.DTVAL_CO) + "</span>" + " 명";
  };
  opt.dataLabelsTextOutline = true;
  opt.dataLabelsInside = true;
  opt.dataLabelsFormatter = function (that) {
    return that.point.y.toFixed(1) + " %";
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more2Chart10
 * @description : 퇴직연금 차트10
 */
function more2Chart10(data, params) {
  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.setAnother(
      $administStatsMap.utils.setAnother(
        $administStatsMap.utils.arrayToJson({
          data: data[params[0].tbl_id_list],
          key: "OV_L1_ID",
          key2: "OV_L2_ID",
        }),
        {
          prefixKey: "OV_L1",
          level: "1",
          arr: [
            {
              evalStr: "$02$+$03$",
              title: "20대(20~29세)",
              id: "CUSTOM02",
            },
            {
              evalStr: "$04$+$05$",
              title: "30대(30~39세)",
              id: "CUSTOM03",
            },
            {
              evalStr: "$06$+$07$",
              title: "40대(40~49세)",
              id: "CUSTOM04",
            },
            {
              evalStr: "$08$+$09$",
              title: "50대(50~59세)",
              id: "CUSTOM05",
            },
            {
              evalStr: "$10$+$11$",
              title: "60세이상(60세이상)",
              id: "CUSTOM06",
            },
          ],
        }
      ),
      {
        prefixKey: "OV_L2",
        arr: [
          {
            evalStr: "$1$",
            id: "CUSTOM01",
          },
          {
            evalStr: "$2$",
            title: "주거임차",
            id: "CUSTOM02",
          },
          {
            evalStr: "$3$",
            id: "CUSTOM03",
          },
          {
            evalStr: "$4$+$5$+$6$+$7$",
            title: "기타(회생, 파산 등)",
            id: "CUSTOM04",
          },
        ],
      }
    )
  );
  let series = [];

  /* [PRD_DE]현재년도 [OV_L2_ID]중도인출사유별 */
  const curYear = $administStatsMap.ui.year;
  Object.keys(toJson[curYear]["CUSTOM02"])
    .sort()
    .forEach(function (OV_L2_ID) {
      if (OV_L2_ID.indexOf("CUSTOM") > -1) {
        series.push({
          name: toJson[curYear]["CUSTOM02"][OV_L2_ID].OV_L2_KOR,
          type: "line",
          data: (function (OV_L2_ID) {
            let dataArr = [];
            /* [PRD_DE]현재년도 [OV_L1_ID]연령별 */
            Object.keys(toJson[curYear])
              .sort()
              .forEach(function (OV_L1_ID) {
                if (OV_L1_ID.indexOf("CUSTOM") > -1) {
                  dataArr.push({
                    y: toJson[curYear][OV_L1_ID][OV_L2_ID].DTVAL_CO,
                    dataObj: toJson[curYear][OV_L1_ID][OV_L2_ID],
                  });
                }
              });
            return dataArr;
          })(OV_L2_ID),
        });
      }
    });

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.title = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: ["20대(20~29세)", "30대(30~39세)", "40대(40~49세)", "50대(50~59세)", "60세이상"],
  };
  opt.yAxis = {
    title: {
      enabled: false,
    },
    labels: {
      enabled: true,
    },
    gridLineWidth: 1,
    startOnTick: false,
    endOnTick: false,
  };
  opt.tooltipHeader = function (that) {
    return that.point.dataObj.OV_L2_KOR + " " + that.point.category;
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>" +
      $administStatsMap.utils.addComma(that.point.y) +
      "</span>" +
      " 명 <br/>(" +
      $administStatsMap.utils.getVarianceText({
        prefix: "전년 대비 ",
        val: $.isNumeric(that.point.dataObj.roc) ? that.point.dataObj.roc.toFixed(1) : that.point.dataObj.roc,
        unit: "%",
        postfixs: ["증가 ↑", "감소 ↓"],
      }) +
      ")"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y) + " 명";
  };
  opt.colors = ["#8E8C97", "#F5AE3B", "#296DB4", "#E94B38"];
  opt.exportingSeries = [
    {
      dataLabels: {
        enabled: true,
        align: "right",
        verticalAlign: "bottom",
        color: opt.colors[0],
      },
    },
    {
      dataLabels: {
        enabled: true,
        align: "right",
        verticalAlign: "top",
        color: opt.colors[1],
      },
    },
    {
      dataLabels: {
        enabled: true,
        align: "right",
        verticalAlign: "bottom",
        color: opt.colors[2],
      },
    },
    {
      dataLabels: {
        enabled: true,
        align: "left",
        verticalAlign: "bottom",
        color: opt.colors[3],
      },
    },
  ];
  opt.eventMouseOver = function (that) {
    $.each(that.chart.series, function (seriesIdx, serie) {
      if (seriesIdx == that.index) {
        serie.dataLabelsGroup.show();
      } else {
        serie.dataLabelsGroup.hide();
      }
    });
  };
  opt.eventMouseOut = function (that) {
    $.each(that.chart.series, function (seriesIdx, serie) {
      serie.dataLabelsGroup.hide();
    });
  };
  opt.callback = function (that, chart) {
    $(chart.series).each(function (i, serie) {
      this.dataLabelsGroup.hide();
      $(serie.legendItem.element).hover(
        function () {
          let targetIdx = 0;
          $.each($(this).closest("g").attr("class").split(" "), function (i, v) {
            if (v.indexOf("highcharts-series") > -1) {
              targetIdx = v.split("-")[v.split("-").length - 1] * 1;
            }
          });
          $.each(chart.series, function (seriesIdx, serie) {
            if (seriesIdx == targetIdx) {
              serie.dataLabelsGroup.show();
            } else {
              serie.dataLabelsGroup.hide();
            }
          });
        },
        function () {
          $.each(chart.series, function (seriesIdx, serie) {
            serie.dataLabelsGroup.hide();
          });
        }
      );
    });
  };
  AdministStatsChart.makeCombinationsChart(opt);
}
