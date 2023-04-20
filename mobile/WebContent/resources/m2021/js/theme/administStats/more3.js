/**
 * 행정통계시각화 > 통계더보기 > 임금른로
 */
(function (W, D) {
  W.$more3 = W.$more3 || {};
  $more3.data = {
    yearType: "Q",
    pressRelease: {
      //보도자료에서 사용될 연도별 파라미터
      202102: "391593",
      202101: "391593",
      202004: "389835",
      202003: "388287",
      202002: "386339",
      202001: "384656",
      201904: "382682",
      201903: "380881",
      201902: "378927",
      201901: "377677",
    },
    getParameters: function () {
      return {
        org_id_list: "101",
        // tbl_id_list: "DT_1FL_7001,DT_1FL_7003,DT_1FL_7005",
        tbl_id_list: "DT_1FL_7001,DT_1FL_7003,DT_1FL_7006",
      };
    },
    getDataParameters: function () {
      return {};
    },
    getLastQuater: function () {
      return new Promise((resolve) => {
        $administStatsMap.utils.getTotsurvStatData(
          {
            surv_year_list: "",
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7006",
            list_var_ord_list: "",
            char_itm_id_list: "T00",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "1001",
            ov_l2_list: "10",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "PRD_DE",
            odr_type: "DESC",
          },
          function (data) {
            const lastQuarter = data[0].PRD_DE * 1;
            resolve(lastQuarter);
          },
          false
        );
      });
    },
  };
  $more3.ui = {
    layout: function () {
      $("#main-tab li").click(function () {
        $("#main-tab li").removeClass("on");
        $(this).addClass("on");
        $("[data-id=main-tab-content]").hide();
        $("[data-id=main-tab-content]:eq(" + $("#main-tab li").index($(this)) + ")").show();
        const tabFunc = $(this).data("tab-function");
        $more3.event.tabData(tabFunc);
      });

      $("[data-type=tab] li").click(function () {
        $(this).parent().children("li").removeClass("on");
        $(this).addClass("on");
        const selectNo = $(this).parent().children("li").index($(this));
        const tabContent = $(this).parent().data("tab-content");
        $("." + tabContent).hide();
        $("." + tabContent + ":eq(" + selectNo + ")").show();
      });
      $("#infoBtn").click(function () {
        $("#more3Info").toggle();
      });
      $("#more3InfoClose").click(function () {
        $("#more3Info").hide();
      });
    },
    changeYear: function (year) {
      $more3.event.summaryData();
      const tabFunc = $("#main-tab li.on").data("tab-function");
      $more3.event.tabData(tabFunc);
    },
  };

  $more3.util = {
    getSurvYearList: function (list = [], year, count = 5) {
      let returnYear = "";
      const startIndex = list.findIndex((e) => e == year);
      if (startIndex > -1) {
        returnYear = list.slice(startIndex, startIndex + count).join();
      }
      return returnYear;
    },
  };

  $more3.event = {
    summaryData: function () {
      const params = [
        {
          surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 100),
          org_id_list: "101",
          tbl_id_list: "DT_1FL_7001",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00",
          ov_l2_list: "",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartType: "summary",
          opt_dispUnitNm: "만개",
          opt_chartNm: "일자리 규모 및 증감",
          opt_tblIds: ["DT_1FL_7001"],
        },
      ];
      $administStatsMap.utils.getTotsurvStatData(params, setSummaryData);
    },
    /**
     * @name : mainTab01
     * @description : 운용현황 탭
     * @param mode
     */
    tabData: function (tabFuncNm) {
      const tabRequest = $more3.event[tabFuncNm]();
      $administStatsMap.utils.getAllTotsurvStatData(tabRequest);
    },
    mainTab01: function () {
      const tabRequest = [];
      tabRequest.push([
        [
          {
            surv_year_list: $more3.util.getSurvYearList($administStatsMap.ui.yearList, $administStatsMap.ui.year, 5), //"202101,202001,202002,202003,202004",
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7001",
            list_var_ord_list: "",
            char_itm_id_list: "T00,T02",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "00",
            ov_l2_list: "",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart1",
            opt_chartType: "bar",
            opt_dispUnitNm: "만개",
            opt_chartNm: "일자리 규모",
            opt_tblIds: ["DT_1FL_7001"],
          },
        ],
        more3Chart1,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 100),
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7003",
            list_var_ord_list: "",
            char_itm_id_list: "T00",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "00",
            ov_l2_list: "00,10,20,30,40",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart2",
            opt_chartType: "bar",
            opt_chartNm: "일자리 형태별 분포",
            opt_tblIds: ["DT_1FL_7003"],
          },
        ],
        more3Chart2,
      ]);

      return tabRequest;
    },
    /**
     * @name : mainTab02
     * @description : 산업별 탭
     * @param mode
     */
    mainTab02: function () {
      const tabRequest = [];
      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 100),
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7001",
            list_var_ord_list: "",
            char_itm_id_list: "T00,T02",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U",
            ov_l2_list: "",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart3",
            opt_chartType: "column",
            opt_chartNm: "산업대분류별",
            opt_tblIds: ["DT_1FL_7001"],
          },
        ],
        more3Chart3,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7001",
            list_var_ord_list: "",
            char_itm_id_list: "T00,T02",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34",
            ov_l2_list: "",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart4",
            opt_chartType: "bar",
            opt_chartNm: "제조업 중분류별",
            opt_tblIds: ["DT_1FL_7001"],
          },
        ],
        more3Chart4,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year,
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7001",
            list_var_ord_list: "",
            char_itm_id_list: "T00,T02",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "36,37,38,39,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99",
            ov_l2_list: "",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart5",
            opt_chartType: "bar",
            opt_chartNm: "서비스업 중분류별",
            opt_tblIds: ["DT_1FL_7001"],
          },
        ],
        more3Chart4,
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
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 100),
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7006",
            list_var_ord_list: "",
            char_itm_id_list: "T00",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "1001,1002",
            ov_l2_list: "00",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart6",
            opt_chartType: "pie",
            opt_chartNm: "성별",
            opt_tblIds: ["DT_1FL_7006"],
            opt_colors: ["#6ECEEB", "#F38591"],
          },
        ],
        more3Chart6,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 100),
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7006",
            list_var_ord_list: "",
            char_itm_id_list: "T00",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "2001,2002,2003,2004,2005",
            ov_l2_list: "00",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart7",
            opt_chartType: "pie",
            opt_chartNm: "연령대별",
            opt_tblIds: ["DT_1FL_7006"],
          },
        ],
        more3Chart6,
      ]);

      tabRequest.push([
        [
          {
            surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 100),
            org_id_list: "101",
            tbl_id_list: "DT_1FL_7006",
            list_var_ord_list: "",
            char_itm_id_list: "T00",
            prt_type: "",
            adm_cd: "",
            ov_l1_list: "3001,3002,3003,3004",
            ov_l2_list: "00",
            ov_l3_list: "",
            ov_l4_list: "",
            ov_l5_list: "",
            category: "",
            odr_col_list: "",
            odr_type: "",
            opt_chartId: "more3Chart8",
            opt_chartType: "pie",
            opt_chartNm: "조직형태별",
            opt_tblIds: ["DT_1FL_7006"],
          },
        ],
        more3Chart6,
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
      } else if ($administStatsMap.ui.year - 100 == item.PRD_DE) {
        chartDatas[key].before = value;
      }
    });
  });

  const _setData = ({ key, data }) => {
    $("[data-id=" + key + "-total]").text($.heum.setThousandSeparator(data.current));
    if (data.before) {
      const v = data.current - data.before;
      const rtv = (v / data.before) * 1000;
      const rt = Math.round(rtv) / 10;
      $("[data-id=" + key + "-rt]")
        .removeClass("state-up state-down")
        .text(" " + Math.abs(rt) + "%");
      if (rtv > 0) {
        $("[data-id=" + key + "-rt]").addClass("state-up");
      } else if (rtv < 0) {
        $("[data-id=" + key + "-rt]").addClass("state-down");
      }
    }
  };
  _setData({ key: "DT_1FL_7001", data: chartDatas.DT_1FL_7001 });
}

/**
 * @name : more3Chart1
 * @description : 임금근로 차트1
 */
function more3Chart1(data, params) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data[params[0].tbl_id_list],
    key: "CHAR_ITM_ID",
  });
  let categories = [];
  let columnDataArr = []; /* 임금근로 일자리수 */
  let lineDataArr = []; /* 증감 */

  const toJsonReverseKeyArr = Object.keys(toJson).sort().slice().reverse();
  const PRD_DE_bgn = toJsonReverseKeyArr[Object.keys(toJson).length - 1].substring(0, 4) + "" + toJsonReverseKeyArr[0].substring(4, 6);
  let PRD_DE_temp = "";

  Object.keys(toJson)
    .sort()
    .forEach(function (PRD_DE) {
      if (PRD_DE * 1 >= PRD_DE_bgn * 1) {
        const quarter = PRD_DE.substring(5, 6);
        const month = $administStatsMap.utils.monthByQuarter(quarter);

        let year = "";
        if (PRD_DE.substring(0, 4) != PRD_DE_temp) {
          year = "<b>`" + PRD_DE.substring(2, 4) + "년</b> ";
        }
        categories.push(year + quarter + "/4분기<br />(" + month + "월)");
        PRD_DE_temp = PRD_DE.substring(0, 4);

        columnDataArr.push({
          y: toJson[PRD_DE]["T00"].DTVAL_CO,
        });

        lineDataArr.push({
          y: (function () {
            if (toJson[PRD_DE].hasOwnProperty("T02")) {
              return toJson[PRD_DE]["T02"].DTVAL_CO;
            } else {
              return 0;
            }
          })(),
        });
      }
    });

  const series = [
    {
      name: "전체 임금근로 일자리",
      type: "column",
      data: columnDataArr,
      color: "#728CC7",
      borderRadius: 5,
    },
    {
      name: "전년동기대비 증감",
      type: "line",
      yAxis: 1,
      data: lineDataArr,
      color: "#F6A347",
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
  opt.yAxis = [
    {
      title: {
        enabled: true,
        text: "(만개)",
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
    {
      title: {
        enabled: true,
        text: "(만개)",
        align: "high",
        offset: 10,
        rotation: 0,
        y: -10,
      },
      labels: {
        enabled: true,
      },
      gridLineWidth: 1,
      opposite: true,
    },
  ];

  opt.spacingTop = 20;
  opt.tooltipFormatter = function (that) {
    return false;
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  AdministStatsChart.makeCombinationsChart(opt);
}

/**
 * @name : more3Chart2
 * @description : 임금근로 차트2
 */
function more3Chart2(data, params) {
  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
      key: "OV_L2_ID",
    })
  );
  const curYear = Object.keys(toJson).sort().reverse()[0];
  const categories = ["`" + curYear.substring(2, 4) + "년<br />" + curYear.substring(5, 6) + "/4분기", "`" + (curYear - 100 + "").substring(2, 4) + "년<br />" + (curYear - 100 + "").substring(5, 6) + "/4분기"];

  let series = [];

  if (toJson.hasOwnProperty(curYear - 100)) {
    Object.keys(toJson[curYear])
      .sort()
      .reverse()
      .forEach(function (OV_L2_ID) {
        if (OV_L2_ID != "00") {
          /* [00]총계, [40]소멸일자리 제외 */
          const v = toJson[curYear][OV_L2_ID];
          if (OV_L2_ID == "40") {
            series.push({
              name: toJson[curYear]["40"].OV_L2_KOR,
              color: "#B3ADC6",
              data: [0, toJson[curYear]["40"].DTVAL_CO],
              OV_L2_ID: toJson[curYear]["40"].OV_L2_ID,
            });
          } else {
            if (OV_L2_ID == "10") {
              series.push({
                name: "전년 동기",
                color: "#E5E5E5",
                data: [0, toJson[curYear - 100]["00"].DTVAL_CO - toJson[curYear]["40"].DTVAL_CO],
                OV_L2_ID: "00",
              });
            }
            if (OV_L2_ID == "10") {
              series.push({
                name: v.OV_L2_KOR,
                color: "#9FC3DA",
                data: [v.DTVAL_CO, 0],
                OV_L2_ID: v.OV_L2_ID,
              });
            } else if (OV_L2_ID == "20") {
              series.push({
                name: v.OV_L2_KOR,
                color: "#F1CE7E",
                data: [v.DTVAL_CO, 0],
                OV_L2_ID: v.OV_L2_ID,
              });
            } else if (OV_L2_ID == "30") {
              series.push({
                name: v.OV_L2_KOR,
                color: "#C3D596",
                data: [
                  {
                    y: v.DTVAL_CO,
                    id: "yes",
                  },
                  0,
                ],
                OV_L2_ID: v.OV_L2_ID,
              });
            }
          }
        }
      });
  } else {
    Object.keys(toJson[curYear])
      .sort()
      .reverse()
      .forEach(function (OV_L2_ID) {
        if (OV_L2_ID != "00") {
          const v = toJson[curYear][OV_L2_ID];
          if (OV_L2_ID == "10") {
            series.push({
              name: v.OV_L2_KOR,
              color: "#9FC3DA",
              data: [v.DTVAL_CO, 0],
              OV_L2_ID: v.OV_L2_ID,
            });
          } else if (OV_L2_ID == "20") {
            series.push({
              name: v.OV_L2_KOR,
              color: "#F1CE7E",
              data: [v.DTVAL_CO, 0],
              OV_L2_ID: v.OV_L2_ID,
            });
          } else if (OV_L2_ID == "30") {
            series.push({
              name: v.OV_L2_KOR,
              color: "#C3D596",
              data: [v.DTVAL_CO, 0],
              OV_L2_ID: v.OV_L2_ID,
            });
          }
        }
      });
  }

  for (let i = 0; i < series.length; i++) {
    series[i].dataLabels = {
      style: {
        color: "#000000",
        fontSize: "11px",
      },
    };
  }

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.filename = params[0].opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.scrollablePlotArea = {
    minWidth: 580,
    scrollPositionX: 1,
  };
  opt.yAxis = {
    max: toJson[curYear]["00"].DTVAL_CO + 500,
    stackLabels: {
      verticalAlign: "top",
      enabled: true,
      align: "center",
      textAlign: "center",
      x: 0,
      y: -15,
      style: {
        color: "#000000",
        textOutline: true,
        fontSize: "11px",
      },
      formatter: function () {
        if (this.x == 0) {
          return "전체 " + $administStatsMap.utils.addComma(toJson[curYear]["00"].DTVAL_CO) + " 만개";
        } else {
          if (this.total == 0) {
            return "전년동기 자료 없음";
          } else {
            return "전체 " + $administStatsMap.utils.addComma(this.total) + " 만개";
          }
        }
      },
    },
  };
  if (toJson.hasOwnProperty(curYear - 100)) {
    opt.yAxis.plotLines = [
      {
        color: AdministStatsChart.consts.sliceHighlightColor,
        width: 2,
        value: toJson[curYear - 100]["00"].DTVAL_CO,
        zIndex: 5,
        dashStyle: "ShortDash",
      },
    ];
  }
  const colors = ["#90C320", "#338CCA", "#F6A347", "#2FB9BC", "#B081B7", "#FFA9B0"].reverse();
  opt.colors = colors;
  opt.annotations = [
    {
      draggable: "",
      labels: [
        {
          point: "yes",
          overflow: "justify",
          text: (function () {
            return $administStatsMap.utils.getVarianceText({
              val: isNaN(toJson[curYear]["00"].iod) ? toJson[curYear]["00"].iod : toJson[curYear]["00"].iod.toFixed(1),
              digits: 1,
              unit: "만개",
              postfixs: ["증가 ↑", "감소 ↓"],
              noDataMsg: "전년동기 자료 없음",
              isColor: false,
            });
          })(),
          style: {
            fontSize: "11px",
            color: "#000000",
            fontWeight: "bold",
          },
        },
      ],
      labelOptions: {
        borderRadius: 10,
        padding: 15,
        x: 70,
        y: 23,
        backgroundColor: "#2FB9BC",
        borderWidth: 1,
        borderColor: "#2FB9BC",
      },
      // labelOptions: {
      //   borderRadius: 5,
      //   padding: 5,
      //   x: 20,
      //   y: 55,
      //   backgroundColor: "#2FB9BC",
      //   borderWidth: 1,
      //   borderColor: "#2FB9BC",
      // },
    },
  ];
  opt.stacking = "overlap";
  opt.tooltipFormatter = function (that) {
    return false;
  };
  opt.dataLabelsInside = true;
  opt.dataLabelsFormatter = function (that) {
    if (that.point.index == 0) {
      if ($.inArray(that.series.userOptions.OV_L2_ID, ["00", "40"]) == -1) {
        return that.series.name + "<br />" + $administStatsMap.utils.addComma(that.point.y.toFixed(1)) + " 만개<br />" + "(" + that.percentage.toFixed(1) + " %)";
      }
    } else if (that.point.index == 1) {
      if ($.inArray(that.series.userOptions.OV_L2_ID, ["40"]) > -1) {
        return that.series.name + "<br />" + $administStatsMap.utils.addComma(that.point.y.toFixed(1)) + " 만개";
      }
    }
  };
  opt.isBigExporting = true;

  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more3Chart3
 * @description : 임금근로 차트3
 */
function more3Chart3(data, params) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data[params[0].tbl_id_list],
    key: "OV_L1_ID",
    key2: "CHAR_ITM_NM",
  });

  let series = [
    {
      data: [],
    },
  ];

  const curYear = $administStatsMap.ui.year;
  Object.keys(toJson[curYear])
    .sort()
    .forEach(function (OV_L1_ID) {
      const v = toJson[curYear][OV_L1_ID];
      series[0].data.push({
        name: v["증감"].OV_L1_KOR,
        y: v["증감"].DTVAL_CO,
        z: v["임금근로 일자리수"].DTVAL_CO,
        color: (function (DTVAL_CO) {
          if (v["증감"].DTVAL_CO > 0) {
            return "#F6A347";
          } else if (v["증감"].DTVAL_CO < 0) {
            return "#728CC7";
          } else {
            return "#000000";
          }
        })(),
      });
    });

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.subtitle = {
    floating: true,
    text: "주: 기타는 ‘T. 가구 내 고용활동’과 ‘U. 국제·외국기관’ 포함 ",
    align: "left",
    verticalAlign: "bottom",
    y: 20,
    style: {
      textOutline: false,
      fontSize: "11px",
      fontWeight: "bold",
      color: "#000000",
    },
  };

  opt.series = series;
  opt.xAxis = {
    type: "category",
    labels: {
      formatter: function () {
        if (series[0].data[this.pos].y < 0) {
          return "<span style='color: #728CC7;'>" + this.value + "</span>";
        } else {
          return this.value;
        }
      },
    },
  };
  opt.scrollablePlotArea = {
    minWidth: 600,
    scrollPositionX: 1,
  };
  opt.yAxis = {
    gridLineWidth: 1,
    labels: {
      enabled: true,
      formatter: function () {
        if (this.value == 0) {
          return "<span style='font-weight: bold; color: #E24F4F;'>" + this.value + "</span>";
        } else {
          return this.value;
        }
      },
    },
    plotLines: [
      {
        color: "#E24F4F",
        width: 1,
        value: 0,
        zIndex: 2,
      },
    ],
  };
  opt.tooltipFormatter = function (that) {
    if (that.point.y < 0) {
      return "<span class='color-blue font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.z) + "</span>" + " 만개";
    } else {
      return "<span class='color-red font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.z) + "</span>" + " 만개";
    }
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y);
  };
  opt.isBigExporting = true;
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more3Chart4
 * @description : 임금근로 차트4
 */
function more3Chart4(data, params) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data[params[0].tbl_id_list],
    key: "OV_L1_ID",
    key2: "CHAR_ITM_NM",
  });
  let series = [
    {
      data: [],
    },
  ];

  let forResults = []; /* 결과용 전체지역 */
  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      const v = toJson[$administStatsMap.ui.year][OV_L1_ID];
      forResults.push({
        // name: v.OV_L1_KOR,
        // y: v.DTVAL_CO,
        name: v["증감"].OV_L1_KOR,
        y: v["증감"].DTVAL_CO,
        z: v["임금근로 일자리수"].DTVAL_CO,
        dataObj: v["증감"],
      });
    });

  /* 상위 3개 */
  forResults = $administStatsMap.utils.sortJSON(forResults, "y", "desc");
  $.each(forResults, function (i, v) {
    if (i < 3) {
      series[0].data.push({
        name: v.name,
        y: v.y,
        z: v.z,
        // color : "#61ADE0",
        color: (function () {
          if (v.y > 0) {
            return "#F6A347";
          } else if (v.y < 0) {
            return "#728CC7";
          } else {
            return "#000000";
          }
        })(),
        dataObj: v.dataObj,
      });
    }
  });
  /* 하위 3개 */
  for (let i = forResults.length - 3; i < forResults.length; i++) {
    const v = forResults[i];
    series[0].data.push({
      name: v.name,
      y: v.y,
      z: v.z,
      // color : "#EFA640",
      color: (function () {
        if (v.y > 0) {
          return "#F6A347";
        } else if (v.y < 0) {
          return "#728CC7";
        } else {
          return "#000000";
        }
      })(),
      dataObj: v.dataObj,
    });
  }

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.series = series;

  if (params[0].opt_chartNm.indexOf("서비스업") > -1) {
    opt.subtitle = {
      floating: true,
      text: "주: 서비스업은 16개의 산업대분류(E와 G~U)를 포함",
      align: "left",
      verticalAlign: "bottom",
      y: 25,
      style: {
        textOutline: false,
        fontSize: "11px",
        fontWeight: "bold",
        color: "#000000",
      },
    };
  }

  opt.xAxis = {
    type: "category",
  };
  opt.yAxis = {
    gridLineWidth: 1,
    labels: {
      enabled: true,
      formatter: function () {
        if (this.value == 0) {
          return "<span style='font-weight: bold; color: #E24F4F'>" + this.value + "</span>";
        } else {
          return this.value;
        }
      },
    },
    plotLines: [
      {
        color: "#E24F4F",
        width: 1,
        value: 0,
        zIndex: 2,
      },
    ],
  };
  opt.tooltipFormatter = function (that) {
    if (that.point.y < 0) {
      return "<span class='color-blue font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.z) + "</span>" + " 만개";
    } else {
      return "<span class='color-red font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.z) + "</span>" + " 만개";
    }
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(Math.round(that.point.y * 10) / 10);
  };
  opt.isBigExporting = true;
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more3Chart6
 * @description : 임금근로 차트6
 */
function more3Chart6(data, params) {
  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data[params[0].tbl_id_list],
      key: "OV_L1_ID",
    })
  );
  const colors = ["#90C320", "#338CCA", "#F6A347", "#2FB9BC", "#B081B7", "#FFA9B0"];
  params[0].opt_colors = $administStatsMap.utils.getObjVal(params[0], "opt_colors", colors);

  let series = [
    {
      visible: false,
      data: [
        {
          name: "(전년동기대비)",
          y: null,
          dataObj: {
            iod: null,
          },
          color: "white",
        },
      ],
    },
    {
      size: "80%",
      data: [],
    },
  ];

  let maxLength = 0;

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      series[1].data.push({
        name: toJson[$administStatsMap.ui.year][OV_L1_ID].OV_L1_KOR,
        y: toJson[$administStatsMap.ui.year][OV_L1_ID].DTVAL_CO,
        color: params[0].opt_colors[series[1].data.length],
        dataObj: toJson[$administStatsMap.ui.year][OV_L1_ID],
      });
      if (toJson[$administStatsMap.ui.year][OV_L1_ID].OV_L1_KOR.length > maxLength) {
        maxLength = toJson[$administStatsMap.ui.year][OV_L1_ID].OV_L1_KOR.length;
      }
    });

  let opt = {};
  opt.chartId = params[0].opt_chartId;
  opt.chartType = params[0].opt_chartType;
  opt.title = params[0].opt_chartNm;
  opt.filename = $(".sb_year option:selected").text() + " " + params[0].opt_chartNm + " " + "임금근로 일자리";
  opt.series = series;
  opt.distance = 3;
  opt.pie = {
    size: "80%",
  };
  opt.seriesShowInLegend = true;
  opt.legendReversed = false;
  opt.legend = {
    useHTML: true,
    align: "center",
    verticalAlign: "bottom",
    layout: "width",
    itemMarginTop: 4,
    itemMarginBottom: 2,
    labelFormatter: function () {
      if (this.name === "(전년동기대비)") {
        return "<span style='min-width: " + (maxLength * 10 + 90) + "px; display: inline-block;'><span style='float: right;'>" + this.name + "&nbsp;</span></span>";
      } else {
        let str = "<span style='min-width: " + (maxLength * 10 + 90) + "px; display: inline-block;'>";
        str += "<span style='float: left;' >" + this.name + "</span>";
        str +=
          "<span style='float: right'>" +
          $administStatsMap.utils.getVarianceText({
            val: isNaN(this.dataObj.iod) ? this.dataObj.iod : this.dataObj.iod.toFixed(1),
            digits: 1,
            unit: "만개",
            noDataMsg: "전년동기 자료 없음",
            postfixs: ["증가 ↑", "감소 ↓"],
          }) +
          "</span>";
        str += "</span>";
        return str;
      }
    },
  };
  opt.tooltipFormatter = function (that) {
    return "<span class='color-red font-large fwbold'>" + $administStatsMap.utils.addComma(that.point.y) + "</span>" + " 만개";
  };
  opt.dataLabelsFormatter = function (that) {
	if(that.point.name == "정부 · 비법인단체"){
		return "&emsp;&nbsp;&nbsp;정부" + "<br />" + "비법인단체" + "<br />" + that.point.percentage.toFixed(1) + " %";
	}else{
		return that.point.name + "<br />" + that.point.percentage.toFixed(1) + " %";
	}
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return opt.dataLabelsFormatter(that) + "<br />(" + opt.tooltipFormatter(that) + ")";
  };
  opt.isBigExporting = true;
  AdministStatsChart.makeChart(opt);
}
