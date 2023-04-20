/**
 * 행정통계시각화 > 통계더보기 > 일자리 행정통계
 */
(function (W, D) {
  W.$more1 = W.$more1 || {};
  $more1.data = {
    pressRelease: {
      //보도자료에서 사용될 연도별 파라미터
      2019: "386466",
      2018: "379092",
      2017: "372094",
    },
    getParameters: function () {
      return {
        org_id_list: "101",
        tbl_id_list:
          "DT_1EP_3001,DT_1EP_3009,DT_1EP_3002,DT_1EP_3005,DT_1EP_3001,DT_1EP_3025",
      };
    },
    getDataParameters: function () {
      return {};
    },
  };

  $more1.ui = {
    layout: function () {
      $("#main-tab li").click(function () {
        $("#main-tab li").removeClass("on");
        $(this).addClass("on");
        $("[data-id=main-tab-content]").hide();
        $(
          "[data-id=main-tab-content]:eq(" +
            $("#main-tab li").index($(this)) +
            ")"
        ).show();
        const tabFunc = $(this).data("tab-function");
        $more1.event.tabData(tabFunc);
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
    changeYear: function (year) {
      $more1.event.summaryData();
      const tabFunc = $("#main-tab li.on").data("tab-function");
      $more1.event.tabData(tabFunc);
    },
  };

  $more1.util = {};

  $more1.event = {
    summaryData: function () {
      const params = [
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3009",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart1",
          opt_chartType: "summary",
          opt_chartNm: "종사상지위별",
          opt_tblIds: ["DT_1EP_3009", "DT_1EP_3002"],
        },
        {
          surv_year_list: $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3002",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00",
          ov_l2_list: "30,40",
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
      const tabRequest = $more1.event[tabFuncNm]();
      $administStatsMap.utils.getAllTotsurvStatData(tabRequest);
    },
    /**
     * @name : mainTab01
     * @description : 규모 탭
     * @param mode
     */
    mainTab01: function () {
      const tabRequest = [];
      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3009",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00,10,20",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart1",
          opt_chartType: "pie",
          opt_chartNm: "종사상지위별",
          opt_tblIds: ["DT_1EP_3009"],
        },
        more1Chart1, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3009",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00,10,20",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart1_1",
          tmsr_title: "연도별 종사상지위별 일자리 규모",
          tmsr_dataKey: "OV_L1_ID",
          tmsr_nameKey: "OV_L1_KOR",
          tmsr_colors: ["#BCBCBC", "#728CC7", "#2FB9BC"],
          tmsr_unit: "만개",
          tmsr_last_dl: true
        })
      );

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3002",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00,11,12,20",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart2",
          opt_chartType: "pie",
          opt_chartNm: "기업규모별",
          opt_tblIds: ["DT_1EP_3002"],
        },
        more1Chart2, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3002",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "11,12,20",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart2_1",
          tmsr_title: "연도별 기업규모별 일자리 규모",
          tmsr_dataKey: "OV_L1_ID",
          tmsr_nameKey: "OV_L1_KOR",
          tmsr_colors: ["#728CC7", "#2FB9BC", "#B081B7"],
          tmsr_unit: "만개",
          tmsr_last_dl: true
        })
      );

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3005",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list:
            "000,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart3",
          opt_chartType: "treemap",
          opt_chartNm: "산업분류별",
          opt_tblIds: ["DT_1EP_3005"],
        },
        more1Chart3, //calback
      ]);

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3001",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00,10,20,30,40",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart4",
          opt_chartType: "column",
          opt_chartNm: "조직형태별",
          opt_tblIds: ["DT_1EP_3001"],
        },
        more1Chart4, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3001",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "10,20,30,40",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart4_1",
          tmsr_title: "연도별 조직형태별 일자리 규모",
          tmsr_dataKey: "OV_L1_ID",
          tmsr_nameKey: "OV_L1_KOR",
          tmsr_colors: ["#90C320", "#F6A347", "#2FB9BC", "#728CC7"],
          tmsr_unit: "만개",
          tmsr_last_dl: true
        })
      );

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3025",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "1,2",
          ov_l2_list: "10,20,30,40,50,60,70,80,90,100,110",
          ov_l3_list: "00",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart5",
          opt_chartType: "bar",
          opt_chartNm: "성별·연령대별",
          opt_tblIds: ["DT_1EP_3025"],
          opt_digits: 1,
        },
        more1Chart5, //calback
      ]);

	  tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3025",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "1",
          ov_l2_list: "10,20,30,40,50,60,70,80,90,100,110",
          ov_l3_list: "00",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
		  tmsr_chartId : "more1Chart5_1",
		  tmsr_title : "연도별 성별·연령대별 일자리 규모(남자)",
		  tmsr_dataKey : "OV_L2_ID",
		  tmsr_nameKey : "OV_L2_KOR",
		  tmsr_colors : [ "#90C320", "#F6A347", "#2FB9BC", "#728CC7", "#B081B7", "#A3A8AB" ],
		  opt_fnCalc : function(data) {
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "10") {
								s.OV_L2_ID = "CUSTOM01";
								s.OV_L2_KOR = "19세이하";
							} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
								s.OV_L2_ID = "CUSTOM02";
								s.OV_L2_KOR = "20~29세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
								s.OV_L2_ID = "CUSTOM03";
								s.OV_L2_KOR = "30~39세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
								s.OV_L2_ID = "CUSTOM04";
								s.OV_L2_KOR = "40~49세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
								s.OV_L2_ID = "CUSTOM05";
								s.OV_L2_KOR = "50~59세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
								s.OV_L2_ID = "CUSTOM06";
								s.OV_L2_KOR = "60세이상";
								s.DTVAL_CO += t.DTVAL_CO;
							}
						}
					}
				}
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
						datas.push(s);
					}
				}
				return datas;
			},
			tmsr_last_dl: true
        })
      );
      
      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3025",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "2",
          ov_l2_list: "10,20,30,40,50,60,70,80,90,100,110",
          ov_l3_list: "00",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
		  tmsr_chartId : "more1Chart5_2",
		  tmsr_title : "연도별 성별·연령대별 일자리 규모(여자)",
		  tmsr_dataKey : "OV_L2_ID",
		  tmsr_nameKey : "OV_L2_KOR",
		  tmsr_colors : [ "#90C320", "#F6A347", "#2FB9BC", "#728CC7", "#B081B7", "#A3A8AB" ],
		  opt_fnCalc : function(data) {
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "10") {
								s.OV_L2_ID = "CUSTOM01";
								s.OV_L2_KOR = "19세이하";
							} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
								s.OV_L2_ID = "CUSTOM02";
								s.OV_L2_KOR = "20~29세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
								s.OV_L2_ID = "CUSTOM03";
								s.OV_L2_KOR = "30~39세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
								s.OV_L2_ID = "CUSTOM04";
								s.OV_L2_KOR = "40~49세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
								s.OV_L2_ID = "CUSTOM05";
								s.OV_L2_KOR = "50~59세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
								s.OV_L2_ID = "CUSTOM06";
								s.OV_L2_KOR = "60세이상";
								s.DTVAL_CO += t.DTVAL_CO;
							}
						}
					}
				}
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
						datas.push(s);
					}
				}
				return datas;
			},
			tmsr_last_dl: true
        })
      );
      
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
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3002",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00",
          ov_l2_list: "30,40",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart6",
          opt_chartType: "bar",
          opt_chartNm: "일자리 증감(총괄)",
          opt_tblIds: ["DT_1EP_3002"],
          opt_digits: 1,
        },
        more1Chart6, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3002",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "00",
          ov_l2_list: "30,40",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart6_1",
          tmsr_title: "일자리 증감(총괄)",
          tmsr_dataKey: "OV_L2_ID",
          tmsr_nameKey: "OV_L2_KOR",
          tmsr_colors: ["#728CC7", "#BCBCBC"],
			opt_fnCalc : function(data) {
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "30" && t.OV_L2_ID == "40") {
								s.DTVAL_CO = (s.DTVAL_CO - t.DTVAL_CO).toFixed(1);
								s.OV_L2_KOR = "일자리";
								s.dispUnitNm = "만개";
								datas.push(s);
							}
						}
					}
				}
				return datas;
			},
			tmsr_legend:false,
			opt_tooltip:false
        })
      );

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3009",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "10,20",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart7",
          opt_chartType: "bar",
          opt_chartNm: "종사상지위별",
          opt_tblIds: ["DT_1EP_3009"],
          opt_digits: 1,
        },
        more1Chart7, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3009",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "10,20",
          ov_l2_list: "00",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart7_1",
          tmsr_title: "연도별 종사상지위별 일자리 증감",
          tmsr_dataKey: "OV_L1_ID",
          tmsr_nameKey: "OV_L1_KOR",
          tmsr_colors: ["#728CC7", "#2FB9BC"],
          tmsr_unit: "만개",
          opt_fnCalc : function(data) {
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = _.cloneDeep(data[i]);
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = _.cloneDeep(data[j]);
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID && s.OV_L2_ID == t.OV_L2_ID) {
							if ((s.PRD_DE - 1) == t.PRD_DE) {
								s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
							} else if (s.PRD_DE == $("#year-select-option a:last").data("value")) {
								s.DTVAL_CO = 0;
								s.NO_DATA = true;
							}
							datas.push(s);
						}
					}
				}
				return datas;
			},
			opt_tooltip:false
        })
      );

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3002",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "11,12,20",
          ov_l2_list: "00,30,40",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart8",
          opt_chartType: "bar",
          opt_chartNm: "기업규모별",
          opt_tblIds: ["DT_1EP_3002"],
          opt_digits: 1,
        },
        more1Chart8, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3002",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "11,12,20",
          ov_l2_list: "00,30,40",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart8_1",
          tmsr_title: "연도별 기업별 일자리 증감",
          tmsr_dataKey: "OV_L1_ID",
          tmsr_nameKey: "OV_L1_KOR",
          tmsr_colors: ["#728CC7", "#2FB9BC", "rgb(176, 129, 183)"],
          tmsr_unit: "만개",
          opt_fnCalc : function(data) {
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "30" && t.OV_L2_ID == "40") {
								s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
								s.dispUnitNm = "만개";
								datas.push(s);
							}
						}
					}
				}
				return datas;
			},
			opt_tooltip:false
        })
      );

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3005",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list:
            "100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100",
          ov_l2_list: "00,30,40",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart9",
          opt_chartType: "column",
          opt_chartNm: "산업분류별",
          opt_tblIds: ["DT_1EP_3005"],
        },
        more1Chart9, //calback
      ]);

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3001",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "10,20,30,40",
          ov_l2_list: "00,30,40",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart10",
          opt_chartType: "column",
          opt_chartNm: "조직형태별",
          opt_tblIds: ["DT_1EP_3001"],
          opt_digits: 1,
        },
        more1Chart10, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3001",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "10,20,30,40",
          ov_l2_list: "00,30,40",
          ov_l3_list: "",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart10_1",
          tmsr_title: "연도별 기업별 일자리 증감",
          tmsr_dataKey: "OV_L1_ID",
          tmsr_nameKey: "OV_L1_KOR",
          tmsr_colors: ["#90C320", "#F6A347", "#2FB9BC", "#728CC7"],
          tmsr_unit: "만개",
          opt_fnCalc : function(data) {
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "30" && t.OV_L2_ID == "40") {
								s.DTVAL_CO = s.DTVAL_CO - t.DTVAL_CO;
								s.dispUnitNm = "만개";
								datas.push(s);
							}
						}
					}
				}
				return datas;
			},
			opt_tooltip:false
        })
      );

      tabRequest.push([
        {
          surv_year_list:
            $administStatsMap.ui.year + "," + ($administStatsMap.ui.year - 1),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3025",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "1,2",
          ov_l2_list: "10,20,30,40,50,60,70,80,90,100,110",
          ov_l3_list: "00",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          opt_chartId: "more1Chart11",
          opt_chartType: "column",
          opt_chartNm: "성별·연령대별",
          opt_tblIds: ["DT_1EP_3025"],
          opt_digits: 1,
        },
        more1Chart11, //calback
      ]);

      tabRequest.push(
        makeTmsrChart({
          surv_year_list: $administStatsMap.ui.yearList.join(","),
          org_id_list: "101",
          tbl_id_list: "DT_1EP_3025",
          list_var_ord_list: "",
          char_itm_id_list: "T00",
          prt_type: "",
          adm_cd: "",
          ov_l1_list: "1",
          ov_l2_list: "10,20,30,40,50,60,70,80,90,100,110",
          ov_l3_list: "00",
          ov_l4_list: "",
          ov_l5_list: "",
          category: "",
          odr_col_list: "",
          odr_type: "",
          tmsr_chartId: "more1Chart11_1",
          tmsr_title: "연도별 성별·연령대별 일자리 증감(남자)",
          tmsr_dataKey: "OV_L2_ID",
          tmsr_nameKey: "OV_L2_KOR",
          tmsr_colors : ["#7cb5ec","#434348","#90ed7d","#f7a35c","#8085e9","#f15c80","#e4d354","#2b908f","#f45b5b","#91e8e1"],
          tmsr_unit: "만개",
          opt_fnCalc : function(data) {
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < data.length; j++) {
						let t = data[j];
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
							if (s.OV_L2_ID == "10") {
								s.OV_L2_ID = "CUSTOM01";
								s.OV_L2_KOR = "19세이하";
							} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
								s.OV_L2_ID = "CUSTOM02";
								s.OV_L2_KOR = "20~29세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
								s.OV_L2_ID = "CUSTOM03";
								s.OV_L2_KOR = "30~39세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
								s.OV_L2_ID = "CUSTOM04";
								s.OV_L2_KOR = "40~49세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
								s.OV_L2_ID = "CUSTOM05";
								s.OV_L2_KOR = "50~59세";
								s.DTVAL_CO += t.DTVAL_CO;
							} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
								s.OV_L2_ID = "CUSTOM06";
								s.OV_L2_KOR = "60세이상";
								s.DTVAL_CO += t.DTVAL_CO;
							}
						}
					}
				}
				let datas = [];
				for (let i = 0; i < data.length; i++) {
					let s = data[i];
					if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
						datas.push(s);
					}
				}

				let datas_ = [];
				for (let i = 0; i < datas.length; i++) {
					let s = _.cloneDeep(datas[i]);
					s.DTVAL_CO = s.DTVAL_CO * 1;
					for (let j = 0; j < datas.length; j++) {
						let t = _.cloneDeep(datas[j]);
						t.DTVAL_CO = t.DTVAL_CO * 1;
						if (s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID && s.OV_L2_ID == t.OV_L2_ID) {
							if ((s.PRD_DE - 1) == t.PRD_DE) {
								s.DTVAL_CO = (s.DTVAL_CO - t.DTVAL_CO).toFixed(1);
							} else if (s.PRD_DE == $("#year-select-option a:last").data("value")) {
								s.DTVAL_CO = 0;
								s.NO_DATA = true;
							}
							s.dispUnitNm = "만개";
							datas_.push(s);
						}
					}
				}
				return datas_;
			},
			opt_tooltip:false
        })
        );
        tabRequest.push(
	        makeTmsrChart({
	          surv_year_list: $administStatsMap.ui.yearList.join(","),
	          org_id_list: "101",
	          tbl_id_list: "DT_1EP_3025",
	          list_var_ord_list: "",
	          char_itm_id_list: "T00",
	          prt_type: "",
	          adm_cd: "",
	          ov_l1_list: "2",
	          ov_l2_list: "10,20,30,40,50,60,70,80,90,100,110",
	          ov_l3_list: "00",
	          ov_l4_list: "",
	          ov_l5_list: "",
	          category: "",
	          odr_col_list: "",
	          odr_type: "",
	          tmsr_chartId: "more1Chart11_2",
	          tmsr_title: "연도별 성별·연령대별 일자리 증감(여자)",
	          tmsr_dataKey: "OV_L2_ID",
	          tmsr_nameKey: "OV_L2_KOR",
	          tmsr_colors : ["#7cb5ec","#434348","#90ed7d","#f7a35c","#8085e9","#f15c80","#e4d354","#2b908f","#f45b5b","#91e8e1"],
	          tmsr_unit: "만개",
	          opt_fnCalc : function(data) {
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID) {
								if (s.OV_L2_ID == "10") {
									s.OV_L2_ID = "CUSTOM01";
									s.OV_L2_KOR = "19세이하";
								} else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
									s.OV_L2_ID = "CUSTOM02";
									s.OV_L2_KOR = "20~29세";
									s.DTVAL_CO += t.DTVAL_CO;
								} else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
									s.OV_L2_ID = "CUSTOM03";
									s.OV_L2_KOR = "30~39세";
									s.DTVAL_CO += t.DTVAL_CO;
								} else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
									s.OV_L2_ID = "CUSTOM04";
									s.OV_L2_KOR = "40~49세";
									s.DTVAL_CO += t.DTVAL_CO;
								} else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
									s.OV_L2_ID = "CUSTOM05";
									s.OV_L2_KOR = "50~59세";
									s.DTVAL_CO += t.DTVAL_CO;
								} else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
									s.OV_L2_ID = "CUSTOM06";
									s.OV_L2_KOR = "60세이상";
									s.DTVAL_CO += t.DTVAL_CO;
								}
							}
						}
					}
					let datas = [];
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
							datas.push(s);
						}
					}
	
					let datas_ = [];
					for (let i = 0; i < datas.length; i++) {
						let s = _.cloneDeep(datas[i]);
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < datas.length; j++) {
							let t = _.cloneDeep(datas[j]);
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.OV_L1_ID == t.OV_L1_ID && s.TBL_ID == t.TBL_ID && s.OV_L2_ID == t.OV_L2_ID) {
								if ((s.PRD_DE - 1) == t.PRD_DE) {
									s.DTVAL_CO = (s.DTVAL_CO - t.DTVAL_CO).toFixed(1);
								} else if (s.PRD_DE == $("#year-select-option a:last").data("value")) {
									s.DTVAL_CO = 0;
									s.NO_DATA = true;
								}
								s.dispUnitNm = "만개";
								datas_.push(s);
							}
						}
					}
					return datas_;
				},
				opt_tooltip:false
        	})
      	);
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
		DT_1EP_3009 : 총 일자리
		DT_1EP_3002 : 일자리 증감
	*/
  let chartDatas = {};
  let total = {
    current: 0,
    before: null,
  };
  console.log(res)
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
      if (key === "DT_1EP_3009") {
        if ($administStatsMap.ui.year == item.PRD_DE) {
          chartDatas[key].current = value;
        } else if ($administStatsMap.ui.year - 1 == item.PRD_DE) {
          chartDatas[key].before = value;
        }
      } else if (key === "DT_1EP_3002") {
        if (item.OV_L2_ID === "30") {
          chartDatas[key].current = value;
        } else if (item.OV_L2_ID === "40") {
          chartDatas[key].before = value;
        }
      }
    });
  });
  console.log(chartDatas);
  const _setData = ({ key, data }) => {
    if (key === "DT_1EP_3002") {
    	console.log(data);
      $("[data-id=" + key + "-total]").text(
        $.heum.setThousandSeparator(
          parseFloat(data.current - data.before).toFixed(1)
        )
      );
      $("[data-id=" + key + "-rt]").addClass("state-up");
    } else {
      $("[data-id=" + key + "-total]").text(
        $.heum.setThousandSeparator(parseFloat(data.current).toFixed(1))
      );

      if (data.before) {
        const v = data.current - data.before;
        const rtv = (v / data.current) * 100;
        const rt = rtv.toFixed(1);
        $("[data-id=" + key + "-rt]")
          .removeClass("state-up state-down")
          .text(" " + Math.abs(rt) + "%");
        if (rtv > 0) {
          $("[data-id=" + key + "-rt]").addClass("state-up");
        } else if (rtv < 0) {
          $("[data-id=" + key + "-rt]").addClass("state-down");
        }
      }
    }
  };

  _setData({ key: "DT_1EP_3009", data: chartDatas.DT_1EP_3009 });
  _setData({ key: "DT_1EP_3002", data: chartDatas.DT_1EP_3002 });
}

/**
 * @name : more1Chart1
 * @description : 일자리 차트1
 */
function more1Chart1(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
  });

  let series = [
    {
      size: "65%",
      innerSize: "0%",
      data: [
        {
          name: toJson[$administStatsMap.ui.year]["00"].OV_L1_KOR,
          y: toJson[$administStatsMap.ui.year]["00"].DTVAL_CO,
          color: "#BCBCBC",
          dataObj: toJson[$administStatsMap.ui.year]["00"],
        },
      ],
      dataLabels: {
        useHTML: true,
        distance: -82,
        headerFormat: "",
        pointFormat: "{point.name}<br />{point.y:,0f} " + "만개",
        footerFormat: "",
        style: {
          textAlign: "center",
          color: "#000000",
        },
      },
    },
    {
      innerSize: "60%",
      data: [],
    },
  ];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      const v = toJson[$administStatsMap.ui.year][OV_L1_ID];
      if (OV_L1_ID == "20") {
        series[1].data.push({
          name: "비임금근로일자리", // TODO
          y: v.DTVAL_CO,
          color: "#2FB9BC",
          dataObj: v,
        });
      } else if (OV_L1_ID == "10") {
        series[1].data.push({
          name: "임금근로일자리", // TODO
          y: v.DTVAL_CO,
          color: "#728CC7",
          dataObj: v,
        });
      }
    });

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 규모";
  opt.series = series;
  opt.cursor = "pointer";
  opt.pie = {
    size: "80%",
    center: ["50%", "50%"],
  };
  opt.exporting = {
    chartOptions: {
      plotOptions: {
        pie: {
          size: "80%",
        },
      },
    },
  };
  opt.tooltipFormatter = function (that) {
    if (that.point.dataObj.OV_L1_ID == "00") {
      return false;
    }
    return (
      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.y.toFixed(1))+"</span>" +
      " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return that.point.name + "<br />" + that.point.percentage.toFixed(1) + " %";
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart1_1
 * @description : 일자리 차트1
 */
function more1Chart1_1(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
  });

  let categories = [];
  const series = [
    {
      data: (function () {
        let data = [];
        Object.keys(toJson)
          .sort()
          .forEach(function (PRD_DE) {
            const v = toJson[PRD_DE]["00"];
            categories.push(PRD_DE);
            data.push({
              y: v.DTVAL_CO,
              dataObj: v,
              roc: v.roc,
            });
          });
        return data;
      })(toJson),
      color: "#6076BA",
    },
  ];

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename = param.opt_chartNm;
  opt.series = series;
  opt.xAxis = {
    categories: categories,
  };
  opt.tooltipPositioner = true;
  opt.tooltipFormatter = function (that) {
    return $administStatsMap.utils.getVarianceText({
      prefix: "증감율<br />",
      val: $.isNumeric(that.point.dataObj.roc)
        ? that.point.dataObj.roc.toFixed(1)
        : that.point.dataObj.roc,
      unit: "%",
      postfixs: ["증가 ↑", "감소 ↓"],
    });
  };
  opt.dataLabelsTextOutline = true;
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.addComma(that.point.y.toFixed(1)) + " 만개";
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart2
 * @description : 일자리 차트2
 */
function more1Chart2(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
  });

  let series = [
    {
      innerSize: "0%",
      enableMouseTracking: false,
      data: [
        {
          name: toJson[$administStatsMap.ui.year]["00"].OV_L1_KOR,
          y: toJson[$administStatsMap.ui.year]["00"].DTVAL_CO,
          color: "#FFFFFF",
          dataObj: toJson[$administStatsMap.ui.year]["00"],
        },
      ],
      dataLabels: {
        useHTML: true,
        distance: -98,
        headerFormat: "",
        pointFormat: "{point.name}<br />{point.y:,0f} " + "만개",
        footerFormat: "",
        style: {
          textAlign: "center",
          color: "#000000",
        },
      },
    },
    {
      innerSize: "60%",
      data: [],
      dataLabels: {
        distance: 10,
      },
    },
  ];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      const v = toJson[$administStatsMap.ui.year][OV_L1_ID];
      if (OV_L1_ID == "11") {
        series[1].data.push({
          name: v.OV_L1_KOR,
          y: v.DTVAL_CO,
          color: "#728CC7",
          dataObj: v,
        });
      } else if (OV_L1_ID == "12") {
        series[1].data.push({
          name: v.OV_L1_KOR,
          y: v.DTVAL_CO,
          color: "#2FB9BC",
          dataObj: v,
        });
      } else if (OV_L1_ID == "20") {
        series[1].data.push({
          name: v.OV_L1_KOR,
          y: v.DTVAL_CO,
          color: "#B081B7",
          dataObj: v,
        });
      }
    });

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 규모";
  opt.series = series;
  opt.pie = {
    size: "80%",
    center: ["50%", "50%"],
  };
  opt.exporting = {
    chartOptions: {
      plotOptions: {
        pie: {
          size: "80%",
        },
      },
    },
  };
  opt.tooltipHeader = function (that) {
	  if(that.point.name.indexOf("일자리") == -1) {
		  return that.point.name + " 일자리";
	  } else {
		  return that.point.name;
	  }
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.y.toFixed(1))+"</span>" +
      " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return that.point.name + "<br />" + that.point.percentage.toFixed(1) + " %";
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return (
      opt.dataLabelsFormatter(that) +
      (!opt.tooltipFormatter(that)
        ? ""
        : "<br />(" + opt.tooltipFormatter(that) + " %)")
    );
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart3
 * @description : 일자리 차트3
 */
function more1Chart3(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
  });
  const colors = [
    "#90C320",
    "#728CC7",
    "#F6A347",
    "#2FB9BC",
    "#B081B7",
    "#FFA9B0",
    "#DDCB77",
    "#73CF89",
    "#A3A8AB",
    "#CCA5A0",
    "#6FA89F",
  ];
  let series = [
    {
      data: [],
    },
  ];
  let resultArr = [];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      if (OV_L1_ID != "000") {
        resultArr.push({
          name: toJson[$administStatsMap.ui.year][OV_L1_ID].OV_L1_KOR,
          value: toJson[$administStatsMap.ui.year][OV_L1_ID].DTVAL_CO,
          per:
            (toJson[$administStatsMap.ui.year][OV_L1_ID].DTVAL_CO /
              toJson[$administStatsMap.ui.year]["000"].DTVAL_CO) *
            100,
        });
      }
    });

  resultArr = $administStatsMap.utils.sortJSON(resultArr, "value", "desc");

  let otherSum = 0;
  for (let i = 0; i < resultArr.length; i++) {
    if (i < 10) {
      series[0].data.push(resultArr[i]);
    } else {
      otherSum += resultArr[i].value;
    }
  }

  series[0].data.push({
    name: "기타",
    value: otherSum,
    per: (otherSum / toJson[$administStatsMap.ui.year]["000"].DTVAL_CO) * 100,
  });

  series[0].data = $administStatsMap.utils.sortJSON(
    series[0].data,
    "value",
    "desc"
  );

  for (let i = 0; i < series[0].data.length; i++) {
    series[0].data[i].colorValue = i + 1;
    series[0].data[i].color = colors[i];
  }

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 규모";
  opt.series = series;
  opt.tooltipHeader = function (that) {
	  if(that.point.name.indexOf("일자리") == -1) {
		  return that.point.name + " 일자리";
	  } else {
		  return that.point.name;
	  }
  };
  opt.tooltipFormatter = function (that) {
    return (
    	"<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.value.toFixed(1))+"</span>" +
      	" 만개"
    );
  };
  opt.dataLabelsTextOutline = true;
  opt.dataLabelsFormatter = function (that) {
    return that.point.name + "<br />" + that.point.per.toFixed(1) + " %";
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return (
      opt.dataLabelsFormatter(that) +
      "<br />(" +
      opt.tooltipFormatter(that) +
      ")"
    );
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart4
 * @description : 일자리 차트4
 */
function more1Chart4(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
  });
  let series = [
    {
      data: [],
    },
  ];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      if (OV_L1_ID != "00") {
        series[0].data.push({
          name: toJson[$administStatsMap.ui.year][OV_L1_ID].OV_L1_KOR,
          y:
            (toJson[$administStatsMap.ui.year][OV_L1_ID].DTVAL_CO /
              toJson[$administStatsMap.ui.year]["00"].DTVAL_CO) *
            100,
          dataObj: toJson[$administStatsMap.ui.year][OV_L1_ID],
        });
      }
    });

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 규모";
  opt.series = series;
  opt.xAxis = {
    type: "category",
  };
  opt.yAxis = {
    max: 100,
  };
  opt.colors = ["#90C320", "#F6A347", "#2FB9BC", "#728CC7"];
  opt.colorByPoint = true;
  opt.cursor = "pointer";
  opt.tooltipPositioner = true;
  opt.tooltipHeader = function (that) {
	  if(that.point.name.indexOf("일자리") == -1) {
		  return that.point.name + " 일자리";
	  } else {
		  return that.point.name;
	  }
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.dataObj.DTVAL_CO)+"</span>" +
      " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return that.point.y.toFixed(1) + " %";
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return (
      opt.dataLabelsFormatter(that) +
      "<br />(" +
      opt.tooltipFormatter(that) +
      ")"
    );
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart5
 * @description : 일자리 차트5
 */
function more1Chart5(data, param) {
  for (let i = 0; i < data.length; i++) {
    let s = data[i];
    s.DTVAL_CO = s.DTVAL_CO * 1;
    for (let j = 0; j < data.length; j++) {
      let t = data[j];
      t.DTVAL_CO = t.DTVAL_CO * 1;
      if (
        s.PRD_DE == t.PRD_DE &&
        s.OV_L1_ID == t.OV_L1_ID &&
        s.TBL_ID == t.TBL_ID
      ) {
        if (s.OV_L2_ID == "10") {
          s.OV_L2_ID = "CUSTOM01";
          s.OV_L2_KOR = "19세이하";
        } else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
          s.OV_L2_ID = "CUSTOM02";
          s.OV_L2_KOR = "20~29세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
          s.OV_L2_ID = "CUSTOM03";
          s.OV_L2_KOR = "30~39세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
          s.OV_L2_ID = "CUSTOM04";
          s.OV_L2_KOR = "40~49세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
          s.OV_L2_ID = "CUSTOM05";
          s.OV_L2_KOR = "50~59세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
          s.OV_L2_ID = "CUSTOM06";
          s.OV_L2_KOR = "60세이상";
          s.DTVAL_CO += t.DTVAL_CO;
        }
      }
    }
  }
  let datas = [];
  for (let i = 0; i < data.length; i++) {
    let s = data[i];
    if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
      datas.push(s);
    }
  }

  const toJson = $administStatsMap.utils.arrayToJson({
    data: datas,
    key: "OV_L1_ID",
    key2: "OV_L2_ID",
  });
  let series = [];

  /* [PRD_DE]현재년도 [OV_L2_ID]연령대별 */
  const OV_L1_ID_0 = Object.keys(toJson[$administStatsMap.ui.year])[0];
  Object.keys(toJson[$administStatsMap.ui.year][OV_L1_ID_0])
    .sort()
    .forEach(function (OV_L2_ID) {
      const v = toJson[$administStatsMap.ui.year][OV_L1_ID_0][OV_L2_ID];
      series.push({
        name: v.OV_L2_KOR,
        data: (function (OV_L2_ID) {
          let dataArr = [];
          /* [PRD_DE]현재년도 [OV_L1_ID]성별 */
          Object.keys(toJson[$administStatsMap.ui.year])
            .sort()
            .forEach(function (OV_L1_ID) {
              dataArr.push({
                y: toJson[$administStatsMap.ui.year][OV_L1_ID][OV_L2_ID]
                  .DTVAL_CO,
                dataObj: toJson[$administStatsMap.ui.year][OV_L1_ID][OV_L2_ID],
                dataLabels: {
                  x: (function () {
                    if (OV_L2_ID == "CUSTOM01") {
                      return 3;
                    } else {
                      return 10;
                    }
                  })(),
                },
              });
            });
          return dataArr;
        })(OV_L2_ID),
      });
    });

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 규모";
  opt.series = series.slice().reverse();
  opt.xAxis = {
    categories: ["남자", "여자"],
  };
  opt.legend = {
  	itemDistance:30,
  }
  opt.cursor = "pointer";
  opt.seriesShowInLegend = true;
  opt.dataLabelsInside = true;
  opt.dataLabelsTextOutline = true;
  opt.colors = [
    "#90C320",
    "#F6A347",
    "#2FB9BC",
    "#728CC7",
    "#B081B7",
    "#A3A8AB",
  ].reverse();
  opt.stacking = "percent";
  
  opt.tooltipHeader = function (that) {
	  if(that.point.series.name.indexOf("일자리") == -1) {
		  return that.point.category+" "+that.point.series.name + " 일자리";
	  } else {
		  return that.point.category+" "+that.point.series.name;
	  }
  };
  
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.y.toFixed(1))+"</span>" +
      " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return that.point.percentage.toFixed(1) + " %";
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return (
      opt.dataLabelsFormatter(that) +
      "<br />(" +
      $administStatsMap.utils.addComma(that.point.y.toFixed(1)) +
      " 만개)"
    );
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart6
 * @description : 일자리 차트6
 */
function more1Chart6(data, param) {
  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: data,
      key: "OV_L2_ID",
    })
  );
  let series = [
    {
      data: [],
    },
  ];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L2_ID) {
      const v = toJson[$administStatsMap.ui.year][OV_L2_ID];
      series[0].data.push({
        name: v.OV_L2_KOR,
        y: v.DTVAL_CO,
      });
    });

  let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.xAxis = {
		type : "category"
	};
	opt.yAxis = {
		max : series[0].data[0].y * 1.8,
		plotLines : [ {
			color : "#2FB9BC",
			width : 1,
			value : series[0].data[1].y,
			zIndex : 5,
			dashStyle : "ShortDash"
		} ]
	};
	opt.colors = [ "#728CC7", "#A0A0A0" ];
	opt.colorByPoint = true;
	opt.annotations = [ {
		draggable : "",
		labels : [ {
			point : {
				x : 0,
				y : series[0].data[0].y,
				xAxis : 0,
				yAxis : 0
			},
			overflow : "justify",
			text : (function() {
				const y = series[0].data[0].y - series[0].data[1].y;
				let returnText = "일자리<br />" + $administStatsMap.utils.addComma(Math.abs(y).toFixed(1)) + " 만개"
				if (y >= 0) {
					returnText += " 증가";
				} else {
					returnText += " 감소";
				}
				return returnText;
			})(),
			style : {
				fontSize : "14px",
				color : "white",
				fontWeight : "bold"
			}
		} ],
		labelOptions : {
			borderRadius : 10,
			padding : 7,
			y : 25,
			x : 55,
			backgroundColor : "#2FB9BC",
			borderWidth : 1,
			borderColor : "#2FB9BC"
		},
	} ];
	/*
	opt.tooltipFormatter = function (that) {
	    return (
	      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.y.toFixed(1))+"</span>" +
	      " 만개"
	    );
	  };
	*/
	opt.dataLabelsInside = true;
	opt.dataLabelsTextOutline = true;
    opt.dataLabelsFormatter = function (that) {
	    return (
	      $administStatsMap.utils.addComma(that.point.y.toFixed(1)) +
	      " 만개"
	    );
	};
  	AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart7
 * @description : 일자리 차트7
 */
function more1Chart7(data, param) {
	const toJson = $administStatsMap.utils.setVariance($administStatsMap.utils.arrayToJson({
		data : data,
		key : "OV_L1_ID"
	}));
	let series = [ {
		data : []
	} ];

	Object.keys(toJson[$administStatsMap.ui.year]).sort().forEach(function(OV_L1_ID) {
		const v = toJson[$administStatsMap.ui.year][OV_L1_ID];
		series[0].data.push({
			name : v.OV_L1_KOR,
			y : v.DTVAL_CO,
			dataObj : v
		});
	});

	let opt = {};
	opt.chartId = param.opt_chartId;
	opt.chartType = param.opt_chartType;
	opt.title = param.opt_chartNm;
	opt.series = series;
	opt.cursor = "pointer";
	opt.marginRight = 50;
	opt.xAxis = {
		type : "category"
	};
	opt.colors = [ "#728CC7", "#2FB9BC" ];
	opt.colorByPoint = true;
	opt.tooltipHeader = function (that) {
		if(that.point.name.indexOf("일자리") == -1) {
			return that.point.name + " 일자리";
		} else {
			return that.point.name;
		}
	};
	opt.tooltipFormatter = function(that) {
		return "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.y.toFixed(1))+"</span>" +" 만개";
	};
	opt.dataLabelsFormatter = function(that) {
		return $administStatsMap.utils.getVarianceText({
			val : that.point.dataObj.iod.toFixed(1),
			digits : 1,
			unit : "만개",
			postfixs : [ "증가", "감소" ],
			noDataMsg : "전년 자료 없음",
			isColor : false
		});
	};
	opt.exportingDataLabelsFormatter = function(that) {
		return opt.dataLabelsFormatter(that) + "<br />(" + $administStatsMap.utils.addComma(that.point.y.toFixed(1)) + " 만개)";
	};
	
	
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart8
 * @description : 일자리 차트8
 */
function more1Chart8(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
    key2: "OV_L2_ID",
  });

  let series = [
    {
      data: [],
    },
  ];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      const v = toJson[$administStatsMap.ui.year][OV_L1_ID];
      series[0].data.push({
        name: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"].OV_L1_KOR,
        y:
          toJson[$administStatsMap.ui.year][OV_L1_ID]["30"].DTVAL_CO -
          toJson[$administStatsMap.ui.year][OV_L1_ID]["40"].DTVAL_CO,
        dataObj: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"],
        // dataLabels : {
        // x : 10
        // }
      });
    });

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 증감";
  opt.series = series;
  opt.cursor = "pointer";
  opt.marginRight = 100;
  opt.xAxis = {
    type: "category",
  };
  opt.yAxis = {
    gridLineWidth: 1,
    labels: {
      enabled: true,
      formatter: function () {
    	if(typeof $administStatsMap !== 'undefined') {
			if (this.value == 0) {
            	return "<span style='color:red;font-weight: bold;'>" + this.value + "</span>";
            } else {
            	return "<span style='font-weight: bold;'>" + this.value + "</span>";
            }
    	} else {
    		if (this.value == 0) {
            	return "<span style='font-weight: bold;'>" + this.value + "</span>";
            } else {
              return this.value;
            }
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
  opt.colors = ["#728CC7", "#2FB9BC", "#B081B7"];
  opt.colorByPoint = true;
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.dataObj.DTVAL_CO.toFixed(1))+"</span>" +
      " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.getVarianceText({
      val: $.isNumeric(that.point.y) ? that.point.y.toFixed(1) : that.point.y,
      unit: "만개",
      postfixs: ["증가", "감소"],
      noDataMsg: "전년 자료 없음",
      isColor: false,
    });
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return (
      opt.dataLabelsFormatter(that) +
      "<br />(" +
      opt.tooltipFormatter(that) +
      ")"
    );
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart9
 * @description : 일자리 차트9
 */
function more1Chart9(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
    key2: "OV_L2_ID",
  });
  const colors = [
    "#90C320",
    "#728CC7",
    "#F6A347",
    "#2FB9BC",
    "#B081B7",
    "#FFA9B0",
    "#DDCB77",
    "#73CF89",
    "#A3A8AB",
    "#CCA5A0",
    "#6FA89F",
  ];
  let series = [
    {
      data: [],
    },
  ];
  let resultArr = [];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      resultArr.push({
        name: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"].OV_L1_KOR,
        y:
          toJson[$administStatsMap.ui.year][OV_L1_ID]["30"].DTVAL_CO -
          toJson[$administStatsMap.ui.year][OV_L1_ID]["40"].DTVAL_CO,
        DTVAL_CO: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"].DTVAL_CO,
        OV_L1_ID: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"].OV_L1_ID,
      });
    });

  /* 총계 내림차순 정렬 */
  resultArr = $administStatsMap.utils.sortJSON(resultArr, "DTVAL_CO", "desc");

  let other_DTVAL_CO_sum = 0;
  let other_iod_sum = 0;
  for (let i = 0; i < resultArr.length; i++) {
    if (i < 10) {
      series[0].data.push(resultArr[i]);
    } else {
      other_DTVAL_CO_sum += resultArr[i].DTVAL_CO;
      other_iod_sum += resultArr[i].y;
    }
  }

  series[0].data = $administStatsMap.utils.sortJSON(
    series[0].data,
    "DTVAL_CO",
    "desc"
  );
  
  series[0].data.push({
    name: "기타",
    y: other_iod_sum,
    DTVAL_CO: other_DTVAL_CO_sum,
  });

  

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 증감";
  opt.series = series;
  opt.colors = colors;
  opt.xAxis = {
    type: "category"
  };
  opt.yAxis = {
    gridLineWidth: 1,
    labels: {
      enabled: true,
      formatter: function () {
    	if(typeof $administStatsMap !== 'undefined') {
  			if (this.value == 0) {
              	return "<span style='color:red;font-weight: bold;'>" + this.value + "</span>";
              } else {
              	return "<span style='font-weight: bold;'>" + this.value + "</span>";
              }
      	} else {
      		if (this.value == 0) {
              	return "<span style='font-weight: bold;'>" + this.value + "</span>";
              } else {
                return this.value;
              }
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
  opt.colorByPoint = true;
  opt.tooltipPositioner = function (labelWidth, labelHeight, point, a) {
    const chartPosition = this.chart.pointer.getChartPosition();
    const tooltipX = point.plotX;
    const tooltipY = point.plotY;
    if (point.negative) {
      return {
        x: chartPosition.left + tooltipX,
        y: chartPosition.top + tooltipY - labelHeight * 1.1,
      };
    } else {
      return {
        x: chartPosition.left + tooltipX,
        y: chartPosition.top + tooltipY + labelHeight,
      };
    }
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.DTVAL_CO.toFixed(1))+"</span>" + " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.getVarianceText({
      val: $.isNumeric(that.point.y) ? that.point.y.toFixed(1) : that.point.y,
      unit: "만개",
      postfixs: ["증가", "감소"],
      noDataMsg: "전년 자료 없음",
      isColor: false,
    });
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return (
      opt.dataLabelsFormatter(that) +
      "<br />(" +
      opt.tooltipFormatter(that) +
      ")"
    );
  };
  opt.scrollablePlotArea = {
    minWidth: 1000,
    scrollPositionX: 0,
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart10
 * @description : 일자리 차트10
 */
function more1Chart10(data, param) {
  const toJson = $administStatsMap.utils.arrayToJson({
    data: data,
    key: "OV_L1_ID",
    key2: "OV_L2_ID",
  });
  let series = [
    {
      data: [],
    },
  ];
  const colors = ["#90C320", "#F6A347", "#2FB9BC", "#728CC7"];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .forEach(function (OV_L1_ID) {
      series[0].data.push({
        name: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"].OV_L1_KOR,
        y:
          toJson[$administStatsMap.ui.year][OV_L1_ID]["30"].DTVAL_CO -
          toJson[$administStatsMap.ui.year][OV_L1_ID]["40"].DTVAL_CO,
        DTVAL_CO: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"].DTVAL_CO,
        dataObj: toJson[$administStatsMap.ui.year][OV_L1_ID]["00"],
      });
    });

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.filename =
    $(".sb_year option:selected").text() +
    " " +
    param.opt_chartNm +
    " 일자리 증감";
  opt.series = series;
  opt.xAxis = {
    type: "category",
  };
  opt.yAxis = {
    gridLineWidth: 1,
    labels: {
      enabled: true,
      formatter: function () {
    	if(typeof $administStatsMap !== 'undefined') {
  			if (this.value == 0) {
              	return "<span style='color:red;font-weight: bold;'>" + this.value + "</span>";
              } else {
              	return "<span style='font-weight: bold;'>" + this.value + "</span>";
              }
      	} else {
      		if (this.value == 0) {
              	return "<span style='font-weight: bold;'>" + this.value + "</span>";
              } else {
                return this.value;
              }
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
  opt.colors = colors;
  opt.colorByPoint = true;
  opt.cursor = "pointer";
  opt.tooltipPositioner = function (labelWidth, labelHeight, point, a) {
    const chartPosition = this.chart.pointer.getChartPosition();
    const tooltipX = point.plotX;
    const tooltipY = point.plotY;
    if (point.negative) {
      return {
        x: chartPosition.left + tooltipX,
        y: chartPosition.top + tooltipY - labelHeight * 1.1,
      };
    } else {
      return {
        x: chartPosition.left + tooltipX,
        y: chartPosition.top + tooltipY + labelHeight,
      };
    }
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(that.point.dataObj.DTVAL_CO)+"</span>" + " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    return $administStatsMap.utils.getVarianceText({
      val: $.isNumeric(that.point.y) ? that.point.y.toFixed(1) : that.point.y,
      unit: "만개",
      postfixs: ["증가", "감소"],
      noDataMsg: "전년 자료 없음",
      isColor: false,
    });
  };
  opt.exportingDataLabelsFormatter = function (that) {
    return (
      opt.dataLabelsFormatter(that) +
      "<br />(" +
      opt.tooltipFormatter(that) +
      ")"
    );
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name : more1Chart11
 * @description : 일자리 차트11
 */
function more1Chart11(data, param) {
  for (let i = 0; i < data.length; i++) {
    let s = data[i];
    s.DTVAL_CO = s.DTVAL_CO * 1;
    for (let j = 0; j < data.length; j++) {
      let t = data[j];
      t.DTVAL_CO = t.DTVAL_CO * 1;
      if (
        s.PRD_DE == t.PRD_DE &&
        s.OV_L1_ID == t.OV_L1_ID &&
        s.TBL_ID == t.TBL_ID
      ) {
        if (s.OV_L2_ID == "10") {
          s.OV_L2_ID = "CUSTOM01";
          s.OV_L2_KOR = "19세이하";
        } else if (s.OV_L2_ID == "20" && t.OV_L2_ID == "30") {
          s.OV_L2_ID = "CUSTOM02";
          s.OV_L2_KOR = "20~29세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "40" && t.OV_L2_ID == "50") {
          s.OV_L2_ID = "CUSTOM03";
          s.OV_L2_KOR = "30~39세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "60" && t.OV_L2_ID == "70") {
          s.OV_L2_ID = "CUSTOM04";
          s.OV_L2_KOR = "40~49세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "80" && t.OV_L2_ID == "90") {
          s.OV_L2_ID = "CUSTOM05";
          s.OV_L2_KOR = "50~59세";
          s.DTVAL_CO += t.DTVAL_CO;
        } else if (s.OV_L2_ID == "100" && t.OV_L2_ID == "110") {
          s.OV_L2_ID = "CUSTOM06";
          s.OV_L2_KOR = "60세이상";
          s.DTVAL_CO += t.DTVAL_CO;
        }
      }
    }
  }
  let datas = [];
  for (let i = 0; i < data.length; i++) {
    let s = data[i];
    if (s.OV_L2_ID.indexOf("CUSTOM") > -1) {
      datas.push(s);
    }
  }

  const toJson = $administStatsMap.utils.setVariance(
    $administStatsMap.utils.arrayToJson({
      data: datas,
      key: "OV_L1_ID",
      key2: "OV_L2_ID",
    })
  );
  const categories = [];

  let series = [];

  Object.keys(toJson[$administStatsMap.ui.year])
    .sort()
    .reverse()
    .forEach(function (OV_L1_ID) {
      const v = toJson[$administStatsMap.ui.year][OV_L1_ID]["CUSTOM01"];
      series.push({
        name: v.OV_L1_KOR,
        color: (function () {
          if (OV_L1_ID == "1") {
            return "#6ECEEB";
          } else {
            return "#F38591";
          }
        })(),
        data: (function (OV_L1_ID) {
          let dataArr = [];
          Object.keys(toJson[$administStatsMap.ui.year][OV_L1_ID])
            .sort()
            .forEach(function (OV_L2_ID) {
              if (OV_L1_ID == "1") {
                categories.push(
                  toJson[$administStatsMap.ui.year][OV_L1_ID][OV_L2_ID]
                    .OV_L2_KOR
                );
              }
              dataArr.push({
                y:
                  toJson[$administStatsMap.ui.year][OV_L1_ID][OV_L2_ID].iod ==
                  "-"
                    ? 0
                    : toJson[$administStatsMap.ui.year][OV_L1_ID][OV_L2_ID].iod,
                dataObj: (function () {
                  toJson[$administStatsMap.ui.year][OV_L1_ID][
                    OV_L2_ID
                  ].OV_L1_ID = OV_L2_ID;
                  return toJson[$administStatsMap.ui.year][OV_L1_ID][OV_L2_ID];
                })(),
                // dataLabels : {
                // x : (function() {
                // if (OV_L1_ID == "1") {
                // return -10;
                // } else {
                // return 10;
                // }
                // }()),
                // style : {
                // fontSize : "10px"
                // }
                // }
              });
            });
          return dataArr;
        })(OV_L1_ID),
      });
    });

  let opt = {};
  opt.chartId = param.opt_chartId;
  opt.chartType = param.opt_chartType;
  opt.title = param.opt_chartNm;
  opt.series = series.slice().reverse();
  opt.xAxis = {
    categories: categories,
  };
  opt.yAxis = {
    gridLineWidth: 1,
    labels: {
      enabled: true,
      formatter: function () {
    	if(typeof $administStatsMap !== 'undefined') {
			if (this.value == 0) {
            	return "<span style='color:red;font-weight: bold;'>" + this.value + "</span>";
            } else {
            	return "<span style='font-weight: bold;'>" + this.value + "</span>";
            }
    	} else {
    		if (this.value == 0) {
            	return "<span style='font-weight: bold;'>" + this.value + "</span>";
            } else {
              return this.value;
            }
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
  opt.legend = {
    align: "center",
    verticalAlign: "bottom",
    //layout : "vertical",
    itemMarginTop: 2,
    itemMarginBottom: 2,
  };
  opt.cursor = "pointer";
  opt.tooltipPositioner = function (labelWidth, labelHeight, point, a) {
    const chartPosition = this.chart.pointer.getChartPosition();
    const tooltipX = point.plotX;
    const tooltipY = point.plotY;
    if (point.negative) {
      return {
        x: chartPosition.left + tooltipX,
        y: chartPosition.top + tooltipY - labelHeight * 1.1,
      };
    } else {
      return {
        x: chartPosition.left + tooltipX,
        y: chartPosition.top + tooltipY + labelHeight,
      };
    }
  };
  opt.seriesShowInLegend = true;
  opt.dataLabelsTextOutline = true;
  opt.tooltipHeader = function (that) {
	  if(that.point.series.name.indexOf("일자리") == -1) {
		  return that.point.category+" "+that.point.series.name + " 일자리";
	  } else {
		  return that.point.category+" "+that.point.series.name;
	  }
  };
  opt.tooltipFormatter = function (that) {
    return (
      "<span class='color-blue'>"+
      that.point.dataObj.OV_L1_KOR
      +"</span><br/>" +
      "<span class='color-red font-large fwbold'>"+
      $administStatsMap.utils.addComma(that.point.dataObj.DTVAL_CO.toFixed(1))+"</span>" +
      " 만개"
    );
  };
  opt.dataLabelsFormatter = function (that) {
    let returnStr = "";
    const dataLabelValue = that.point.y;

    if (
      that.point.dataObj.PRD_DE == $("#year-select-option a:last").data("value") &&
      dataLabelValue == 0
    ) {
      return "전년<br />자료<br />없음";
    }

    if ($.isNumeric(dataLabelValue)) {
      returnStr += $administStatsMap.utils.addComma(dataLabelValue.toFixed(1))+" 만개";
    } else {
      returnStr += "전년 자료 없음";
    }
    return returnStr;
  };
  opt.scrollablePlotArea = {
    minWidth: 900,
    scrollPositionX: 0,
  };
  AdministStatsChart.makeChart(opt);
}

/**
 * @name: 시계열 차트
 * @description 시계열 차트 공통
 */
function makeTmsrChart(selTmsrParam) {
  let series = [];
  let ys = [];
  let categories = [];
  console.log(selTmsrParam);
  const opt_digits = $administStatsMap.utils.getObjVal(
    selTmsrParam,
    "opt_digits",
    1
  );
  console.log(opt_digits)
  let opt_fnCalc;
  if (selTmsrParam.hasOwnProperty("opt_fnCalc")) {
    opt_fnCalc = selTmsrParam.opt_fnCalc;
  }
  selTmsrParam.opt_fnCalc = null;
  const callback = function (data) {
    if (typeof opt_fnCalc === "function") {
      selTmsrParam.opt_fnCalc = opt_fnCalc;
      data = opt_fnCalc(data);
    }
    let toJson;
    if ($.isArray(data)) {
      toJson = $administStatsMap.utils.setVariance(
        $administStatsMap.utils.arrayToJson({
          data: data,
          key0: selTmsrParam.tmsr_dataKey,
          key: "PRD_DE",
        })
      );
    } else {
      toJson = data;
    }

    Object.keys(toJson)
      .sort()
      .forEach(function (key) {
        let selected =
          Object.keys(toJson).length >= 2 &&
          $administStatsMap.utils.getObjVal(
            $administStatsMap.ui.tmsr_data,
            selTmsrParam.tmsr_dataKey,
            "!!!!!!!!!!"
          ) == key;
        series.push({
          name: toJson[key][Object.keys(toJson[key])[0]][
            selTmsrParam.tmsr_nameKey
          ],
          color: selTmsrParam.tmsr_colors[series.length],
          type: "line",
          data: (function (key) {
            let dataArr = [];
            Object.keys(toJson[key])
              .sort()
              .forEach(function (PRD_DE) {
                categories.push(PRD_DE);
                dataArr.push({
                  y: toJson[key][PRD_DE].DTVAL_CO,
                  roc: toJson[key][PRD_DE].roc,
                  dataObj: toJson[key][PRD_DE],
                  selected: selected,
                });
                ys.push(toJson[key][PRD_DE].DTVAL_CO);
              });
            return dataArr;
          })(key),
          selected: selected,
          zIndex: selected ? 2 : 1,
        });
      });

    let opt = {};
    opt.chartId = selTmsrParam.tmsr_chartId;
    opt.title = "<span>연도별</span>&nbsp;" + selTmsrParam.tmsr_title;
    opt.filename = (function () {
      let filename = "";
      if ($("#mapRgn_3").is(":visible")) {
        filename += $(".tag_sido:eq(0)").text() + " ";
      } else {
        filename += "전국 ";
      }
      filename += "연도별 " + selTmsrParam.tmsr_title;
      return filename;
    })();
    opt.series = series;
    if (series.length >= 2) {
      let exportingSeries = [];
      for (let i = 0; i < series.length; i++) {
        exportingSeries.push(_.cloneDeep(series[i]));
        exportingSeries[i].dataLabels = {};
        exportingSeries[i].dataLabels.color = exportingSeries[i].color;
      }
      opt.exportingSeries = exportingSeries;
      opt.legend = {
        //useHTML: true,
        align: "center",
        verticalAlign: "bottom",
        itemMarginTop: 2,
        itemMarginBottom: 2,
        //itemDistance:30,
        //itemMarginLeft: 10,
        //itemMarginRight: 10,
        labelFormatter: function () {
          if (this._i < series.length) {
            if (series.length >= 2 && series[this._i].selected) {
              return (
                "<span style='color: " +
                AdministStatsChart.consts.sliceHighlightColor +
                ";'>" +
                this.name +
                "</span>"
              );
            } else {
            	return this.name;
            }
          } else {
            return this.name;
          }
        },
      };
      
      if(selTmsrParam.tmsr_chartId === "more1Chart1_1"){
      	opt.legend.itemDistance = 10;
      }else{
      	opt.legend.itemDistance = 30;
      }
    } else {
      opt.seriesShowInLegend = false;
    }
    opt.xAxis = {
      categories: categories,
      labels: {
        formatter: function () {
          if (this.value == $administStatsMap.ui.year) {
            return (
              "<span style='color: " +
              AdministStatsChart.consts.sliceHighlightColor +
              ";'>" +
              this.value +
              "</span>"
            );
          } else {
            return "<span>" + this.value + "</span>";
          }
        },
      },
    };
    opt.yAxis = {
      title: {
        enabled: false,
      },
      labels : {
			formatter : function() {
				if (this.value == 0) {
					return "<span style='font-weight: bold; color: " + AdministStatsChart.consts.sliceHighlightColor + ";'>" + this.value + "</span>";
				} else {
					return this.value;
				}
			}
	  },
	  plotLines: [
	      {
	        color: "#E24F4F",
	        width: 1,
	        value: 0,
	        zIndex: 2,
	      },
	  ],
      gridLineWidth: 1,
    };
    
    
    
    if(selTmsrParam.opt_tooltip === false){
    	opt.tooltipFormatter = function (that) {
    		return "";
    	}
    }else{
    	opt.tooltipHeader = function (that) {
    		if(that.point.series.name.indexOf("일자리") == -1) {
    			return that.point.category+"년 "+that.point.series.name + " 일자리";
    		} else {
    			return that.point.category+"년 "+that.point.series.name;
    		}
	    };
	    opt.tooltipFormatter = function (that) {
	      return $administStatsMap.utils.getVarianceText({
	        prefix:
	          (that.point.y == 0 ? "<span class='color-red font-large fwbold'>0<span>":"<span class='color-red font-large fwbold'>"+$administStatsMap.utils.addComma(opt_digits == 0 ? that.point.y.toFixed(0) : that.point.y.toFixed(opt_digits))+"</span> 만개")+
	          "<br/>" +
	          (selTmsrParam.tmsr_chartId == "tmsrChart2" ? "증감" : "") +
	          " 전년 대비 ",
	        val: $.isNumeric(that.point.roc)
	          ? that.point.roc.toFixed(1)
	          : that.point.roc,
	        unit: "%",
	        postfixs: ["증가 ↑", "감소 ↓"],
	      });
	    };
    }

    opt.dataLabelsTextOutline = true;
    opt.dataLabelsFormatter = function (that) {
      if (selTmsrParam.tmsr_chartId == "more1Chart7_1") {
        if (that.point.dataObj.NO_DATA) {
          return "전년 자료 없음";
        }
        return $administStatsMap.utils.getVarianceText({
          val:
            opt_digits == 0 ? that.point.y : that.point.y.toFixed(opt_digits),
          unit: $administStatsMap.utils.getObjVal(
            selTmsrParam,
            "tmsr_unit",
            that.point.dataObj.dispUnitNm
          ),
          postfixType: [],
          isColor: false,
        });
      } else {
        return (
          $administStatsMap.utils.addComma(
            opt_digits == 0 ? that.point.y.toFixed(0) : that.point.y.toFixed(opt_digits)
          ) +
          " " +
          $administStatsMap.utils.getObjVal(
            selTmsrParam,
            "tmsr_unit",
            that.point.dataObj.dispUnitNm
          )
        );
      }
    };
    
    if(!selTmsrParam.tmsr_last_dl){
	    opt.eventMouseOver = function(that) {
	    	$("#"+opt.chartId).find("g.highcharts-data-labels>g>text").show();
			$.each(that.chart.series, function(seriesIdx, serie) {
				if (seriesIdx == that.index) {
					serie.dataLabelsGroup.show();
				} else {
					serie.dataLabelsGroup.hide();
				}
			});
		};
		opt.eventMouseOut = function(that) {
			$.each(that.chart.series, function(seriesIdx, serie) {
				serie.dataLabelsGroup.hide();
			});
		};
	}
	opt.tooltipPositioner = true;

    opt.callback = function (that, chart) {
      $(chart.series).each(function (i, serie) {
        if (series.length >= 2) {
        	if(!selTmsrParam.tmsr_last_dl){
          		this.dataLabelsGroup.hide();
          	}
          $(serie.legendItem.element).hover(function () {
              let targetIdx = 0;
              $.each(
                $(this).closest("g").attr("class").split(" "),
                function (i, v) {
                  if (v.indexOf("highcharts-series") > -1) {
                    targetIdx = v.split("-")[v.split("-").length - 1] * 1;
                  }
                }
              );
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
        }
      });
      
      if(selTmsrParam.tmsr_last_dl){
	      const serieslabels = $("#"+opt.chartId).find("g.highcharts-data-labels");
	      
	      $(serieslabels).each(function(){
	      	let serieslabel = $(this).find("g.highcharts-label");
	      	$(serieslabel).each(function(i){
	      		if(i < serieslabel.length-1)$(this).find(">text").hide();
	      	});
	      });
      }
      
    };
    AdministStatsChart.makeCombinationsChart(opt);
  };

  return [selTmsrParam, callback];
}
