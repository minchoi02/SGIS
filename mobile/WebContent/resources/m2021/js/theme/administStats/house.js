const openKosis = (tblId) =>{
	let isFail = true;
	tblId.split(",").forEach(id=>{
//		if ($administStatsMap.ui.apiParam.hasOwnProperty(id)) {
//			$administStatsMap.ui.apiParam[id].opt_stattbUrls.forEach(url=>{
//				isFail = false;
//				window.open(url, "_blank");
//			});
//		} else {
//			console.group("통계표 조회 불가");
//			console.log("TBL_ID[" + id + "]" + " API 파라미터 없음");
//			console.groupEnd();
//		}
		
	});
	window.open("https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId="+tblId+"&conn_path=I2", "_blank");
//	if (isFail) {
//		alert("통계표가 연결되어 있지 않습니다.");
//	}	
};
$(document).ready(function(){
	$("#main1-sub-tab02 [data-tp]").click(function(){
		let tpVal = $(this).data("tp");
		
		if(tpVal == '05' || tpVal == '06' || tpVal == '07'){
			$("#chart8").parent().attr('style','height:360px;overflow:auto');
		}else if(tpVal == '02'){
			$("#chart8").parent().attr('style','height:280px;overflow:auto');
			$("#chart8").attr('style','height:270px;overflow:auto');
		}else if(tpVal == '04'){
			$("#chart8").parent().attr('style','height:260px;overflow:auto');
			$("#chart8").attr('style','height:250px;width:1000px;overflow:auto');
		}else{
			$("#chart8").parent().attr('style','height:260px;overflow:auto');
		}
	});
	
	$("[data-kosis]").click(function(){
		const mainTabIndex = $("#main-tab li").index($("#main-tab li.on"));
		const tabIndex = $(".administration__sub-tab:visible li").index($(".administration__sub-tab:visible li.on"));
		const chartIndex = $("[data-type=chart-container]:visible").index($(this).parents("[data-type=chart-container]"));
		const chart = $(this).data("kosis");
		if(mainTabIndex==0){
			$("#chartHeight").attr("height",265);
			if(tabIndex==0){
				openKosis("DT_1OH0501");
			}else if(tabIndex==1){
				if(chartIndex==0){
					$(this).parent().children("[data-id=more]").toggle();
				}else if(chartIndex==1){
//					openKosis("DT_1IN1502");
					openKosis("DT_1OH0504");
				}else if(chartIndex==2){
					openKosis("DT_1OH0504");
				}
			}
		}else if(mainTabIndex==1){
			$("#chartHeight").attr("height",265);
			if(tabIndex==0||tabIndex==1){
				openKosis("DT_1OH0402");
			}else if(tabIndex==2){
				$("#chartHeight").attr("height",293);
				$(this).parent().children("[data-id=more2]").toggle();
				/*
				openKosis("DT_1OH0403");
				openKosis("DT_1OH0418");
				*/
			}else if(tabIndex==3){
				$(this).parent().children("[data-id=more3]").toggle();
				/*
				openKosis("DT_1OH0404");
				openKosis("DT_1OH0419");
				*/
			}else if(tabIndex==4){
				$(this).parent().children("[data-id=more4]").toggle();
				/*
				openKosis("DT_1OH0405");
				openKosis("DT_1OH0420");
				*/
			}
		}
		return false;
	});
});
let chartDatas = null;
function createTotSur(){
//	var themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
//	const parameters = $.extend(true, {
//		surv_year_list : $administStatsMap.ui.year
//	}
//	, themeInfo.mapData.getDataParameters()
//	, $administStatsMap.ui.apiParam["DT_1NW1001"]
//	);
//	
//	$.ajax({
//		method: "POST",
//		async: true,
//		url: sgis4thApiPath,
////		url: sgisContextPath + "/view/kosisApi/TotsurvStatData.do",
//		data: parameters,
//		dataType: "json",
//		success: function(res) {
//			parameters.ov_l1_list = $administStatsMap.ui.admCd;
//			setSummaryData(res);
//		},
//		complete : function(){
//			common_loading(false);
//		}
//	});
	
	/*$("#main-tab li").removeClass("on")
	$("#main-tab li:eq(0)").addClass("on")
	$("#administration__tab__con01").show();
	$("#administration__tab__con02").hide();
	
	$("#main1-sub-tab li").removeClass("on");
	$("#main1-sub-tab li:first").addClass("on");*/
	setSummaryData();
}
/**
 * @name        : setSummaryData 
 * @description : 총괄 요약정보 데이터 셋팅 
 */
function setSummaryData(res){
	/*
		DT_1OH0501 : 개인이 소유한 주택수
	*/
	/*chartDatas = {};
	let total = {
		current : 0,
		before : null
	};
	res.forEach(item=>{
		//지역코드 레벨 (00 :전국)
		if(item.OV_L1_ID==$administStatsMap.ui.admCd){
			const _get = ({key}) => {
				if(item.TBL_ID==key){
					if(chartDatas[key]===undefined){
						chartDatas[key] = {
							current : null,
							before : null
						};
					}
					const value = parseFloat(item.DTVAL_CO);
					//녀도
					if($administStatsMap.ui.year==item.PRD_DE){
						chartDatas[key].current = value;
						//테이블키
						if(key=="DT_1OH0501"){
							total.current+=value;
						}
					}
					//저년도
					else if($administStatsMap.ui.year-1==item.PRD_DE){
						chartDatas[key].before = value;
						if(key=="DT_1OH0501"){
							if(total.before==null){
								total.before=0;
							}
							total.before+=value;
						}
					}
				}
			};
			_get({key:item.TBL_ID});
		}
	});
	const _setData = ({key,data}) =>{
		//현재년도 전체데이터
		$("[data-id="+key+"-number]").text($.heum.setThousandSeparator(data.current));
		if(data.before){
			const v = data.current-data.before;
			const rtv = (v/data.current*100);
			const rt = rtv.toFixed(1);
			$("[data-id="+key+"-rt]").removeClass("state-up state-down").text(" "+Math.abs(rt)+"%");
			if(rtv>0){
				$("[data-id="+key+"-rt]").addClass("state-up");
			}else if(rtv<0){
				$("[data-id="+key+"-rt]").addClass("state-down");
			}
		}
	};*/
//	_setData({key:"total",data:total});
//	_setData({key:"DT_1OH0501",data:chartDatas.DT_1OH0501});
//	_setData({key:"DT_1NW3034",data:chartDatas.DT_1NW3034});
//	chartDatas.total = total;
//	$("#main-tab li:eq(0)").trigger("click");
//	$("#main-tab li:eq(0)").trigger("click");
	
	const themeInfo = $administStatsMap.ui.themeData[$administStatsMap.ui.theme];
	const parameters = $.extend(true, {
		surv_year_list : $administStatsMap.ui.year
	}
	, $administStatsMap.ui.apiParam["DT_1NW1001"]
	, themeInfo.mapData.getDataParameters()
	);
	parameters.ov_l1_list = $administStatsMap.ui.admCd;
	common_loading(true);
	
	$.ajax({
//		method: "POST",
		method: "GET",
		async: true,
		url: sgis4thApiPath,
//		url: sgisContextPath + "/view/kosisApi/TotsurvStatData.do",
		data: parameters,
		dataType: "json",
		success: function(res) {
			
			/*$("#main-tab li").removeClass("on")
			$("#main-tab li:eq(0)").addClass("on")
			$("#administration__tab__con01").show();
			$("#administration__tab__con02").hide();
			
			$("#main1-sub-tab li").removeClass("on");
			$("#main1-sub-tab li:first").addClass("on");
			$(".tab_02_01").show();
			$(".tab_02_02").hide();
			$(".tab_02_03").hide();
			$(".tab_02_04").hide();
			$(".tab_02_05").hide(); */
			common_loading(true);
			$administStatsMap.chart.main1.set_total("01");
			$administStatsMap.chart.main1.set_total("02");
			$administStatsMap.chart.main1.set_total("03");
			
			let tpVal = $("div.administration__tab__con").not("[style^=display]").find("li.on").data("tp");
			if($("ul.administration__tab.col-2 li.on").text().indexOf("개인") != -1) {		//개인
				if(tpVal == "01") {
					//개인수
					$administStatsMap.chart.main1.set_chart1();
					//지역별 전체차트
					$administStatsMap.chart.main1.set_chart8("01");
					//연도별 전체차트
					$administStatsMap.chart.main1.set_chart9("01");
				} else if(tpVal == "02") {
					//개인수
					$administStatsMap.chart.main1.set_chart1("02");
					//지역별 전체차트
					$administStatsMap.chart.main1.set_chart8("02");
					//연도별 전체차트
					$administStatsMap.chart.main1.set_chart9("02");
				}
			} else {	//가구
				//개인수
				$administStatsMap.chart.main1.set_chart1();
				
				if(tpVal == "03") {
					//지역별 전체차트
					$administStatsMap.chart.main1.set_chart8("03");
					//연도별 전체차트
					$administStatsMap.chart.main1.set_chart9("03");
				} else if(tpVal == "04") {
					$administStatsMap.chart.main1.set_chart3();
					//지역별 전체차트
					$administStatsMap.chart.main1.set_chart8("04");
					//연도별 전체차트
					$administStatsMap.chart.main1.set_chart9("04");
				} else if(tpVal == "05") {
					$administStatsMap.chart.main1.set_chart4();
					//지역별 전체차트
					$administStatsMap.chart.main1.set_chart8("05");
					//연도별 전체차트
					$administStatsMap.chart.main1.set_chart9("05");
				} else if(tpVal == "06") {
					$administStatsMap.chart.main1.set_chart5();
					//지역별 전체차트
					$administStatsMap.chart.main1.set_chart8("06");
					//연도별 전체차트
					$administStatsMap.chart.main1.set_chart9("06");
				} else if(tpVal == "07") {
					$administStatsMap.chart.main1.set_chart6();
					//지역별 전체차트
					$administStatsMap.chart.main1.set_chart8("07");
					//연도별 전체차트
					$administStatsMap.chart.main1.set_chart9("07");
				}
			}
			
			//가구수
			$administStatsMap.chart.main1.set_chart2();
			
			common_loading(false);
		}
	});
	
}
$administStatsMap.chart = {
	common: function(){
		
	},
	main1 : {
		tabIndex:null,
		tbl_id:null,
		parameters : null,
		set_total:function(tp){
			this.tbl_id = "DT_1OH0501";
            var admCd = $administStatsMap.ui.admCd
            admCd = admCd.replace("up:","");
        	var years = ""
				years +=   $administStatsMap.ui.year;
				years +=","+($administStatsMap.ui.year-1);
			if(tp == "01"){
				this.parameters = {
					surv_year_list : years,
					org_id_list : "101",
					tbl_id_list : "DT_1OH0501",
					list_var_ord_list : "",
					char_itm_id_list : "T002",
					prt_type : "",
					adm_cd : "",
					//지역
					ov_l1_list : admCd,
					ov_l2_list : "",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : "",
					opt_chartId: "houseChart1",
					opt_chartType: "pie",
					opt_chartNm: "개인이 소유한 주택 수",
					opt_tblIds: ["DT_1OH0501"],
					opt_digits: "0"
				};
			}else if(tp == "02"){
				this.parameters = {
					 surv_year_list: years
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0504"
					,list_var_ord_list: ""
					,char_itm_id_list: "T001"
					,prt_type: ""
					,adm_cd: ""
					,ov_l1_list: admCd
					,ov_l2_list: "0,1,2"
					,ov_l3_list: "000"
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list: ""
					,odr_type: ""
					,opt_chartId: "houseChart2"
					,opt_chartType: "pie"
					,opt_chartNm: "주택을 소유한 개인 수"
					,opt_tblIds: ["DT_1IN1502,DT_1OH0504"]
					,opt_digits: "0"
				}
			}else if(tp =="03"){
				this.parameters = {
					surv_year_list: years
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0402"
					,list_var_ord_list: ""
					,char_itm_id_list: "T002"
					,prt_type: ""
					,adm_cd: ""
					,ov_l1_list: admCd
					,ov_l2_list: ""
					,ov_l3_list: ""
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list: ""
					,odr_type: ""
					,opt_chartId: "houseChart3"
					,opt_chartType: "pie"
					,opt_chartNm: "주택을 소유한 가구 수"
					,opt_tblIds: ["DT_1OH0402"]
					,opt_digits: "0"
				}
			}
			this.chart(tp);
		},
		//개인소유 주택 , 주택소유 개인 
		set_chart1: function(tp){
			$("[data-type=chart-container]").find("[data-type=tooltip]").hide();
			this.tabIndex = $("#main1-sub-tab li").index($("#main1-sub-tab li.on"));
			if(this.tabIndex==0){
				//개인소유주택
				this.tbl_id = "DT_1OH0501";
				               
				this.parameters = {
					surv_year_list :$administStatsMap.ui.year,
					org_id_list : "101",
					tbl_id_list : "DT_1OH0501",
					list_var_ord_list : "",
					char_itm_id_list : "T001,T002",
					prt_type : "",
					adm_cd : "",
					//지역
					ov_l1_list : $administStatsMap.ui.admCd,
					ov_l2_list : "",
					ov_l3_list : "",
					ov_l4_list : "",
					ov_l5_list : "",
					category : "",
					odr_col_list : "",
					odr_type : "",
					opt_chartId: "houseChart1",
					opt_chartType: "pie",
					opt_chartNm: "개인이 소유한 주택 수",
					opt_tblIds: ["DT_1OH0501"],
					opt_digits: "0"
				};

			}else if(this.tabIndex==1){
				this.tbl_id = "DT_1IN1502";
	               
				this.parameters = {
					//주택소유개인
					surv_year_list: $administStatsMap.ui.year
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0504"
					,list_var_ord_list:""
					,char_itm_id_list: "T001"
					,prt_type: ""
					,adm_cd: ""
					//지역 00:전국
					,ov_l1_list: $administStatsMap.ui.admCd
					,ov_l2_list:"0,1,2" 
					,ov_l3_list: "000"
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart2"
					,opt_chartType: "pie"
					,opt_chartNm: "주택을 소유한 개인 수"
					,opt_tblIds: ["DT_1IN1502","DT_1OH0504"]
				//, ,opt_tblIds: ["DT_1OH0504"]
					,opt_digits: 0
				}
			}else{
				return;
			}

			this.chart1(tp);
		},
		//주택을 소유한 가구 수 
		set_chart2: function(){
			this.tbl_id = "DT_1OH0402";
			this.parameters = {
				surv_year_list : $administStatsMap.ui.year,
				org_id_list : "101",
				tbl_id_list : this.tbl_id,
				list_var_ord_list : "",
				char_itm_id_list : "T001,T002",
				prt_type : "",
				adm_cd : "",
				ov_l1_list : $administStatsMap.ui.admCd,
				ov_l2_list : "",
				ov_l3_list : "",
				ov_l4_list : "",
				ov_l5_list : "",
				category: "",
				odr_col_list:"", 
				odr_type: "",
				opt_chartId: "houseChart3",
				opt_chartType: "pie",
				opt_chartNm: "주택을 소유한 가구 수",
				opt_tblIds: ["DT_1OH0402"],
				opt_digits: 0
			};
			this.chart2();
		},
		set_chart3 : function(){
			//거주지역별 주택소유율
			this.tbl_id = "DT_1OH0402";
			this.parameters = {
				surv_year_list:  $administStatsMap.ui.year
				,org_id_list: "101"
				,tbl_id_list: "DT_1OH0402"
				,list_var_ord_list:"" 
				,char_itm_id_list: "T001,T002"
				,prt_type: ""
				,adm_cd: ""
				,ov_l1_list: "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
				,ov_l2_list: ""
				,ov_l3_list: ""
				,ov_l4_list: ""
				,ov_l5_list: ""
				,category: ""
				,odr_col_list:"" 
				,odr_type: ""
				,opt_chartId: "houseChart4"
				,opt_chartType: "column"
				,opt_chartNm: "거주지역별 주택소유율"
				,opt_tblIds: ["DT_1OH0402"]
				,opt_digits: "1"
			}
			this.chart3();
		},
		
		set_chart4 : function(){
			//가구주 연령대별 주택소유율
			this.tbl_id = "DT_1OH0403";
			this.parameters = {
				surv_year_list:  $administStatsMap.ui.year
				,org_id_list: "101"
				,tbl_id_list: "DT_1OH0403,DT_1OH0418"
				,list_var_ord_list:"" 
				,char_itm_id_list: "T001"
				,prt_type: ""
				,adm_cd: ""
				,ov_l1_list:  $administStatsMap.ui.admCd.replace("up:","")
				,ov_l2_list: "0"
				,ov_l3_list: "100,200,300,400,500,600,700"
				,ov_l4_list: ""
				,ov_l5_list: ""
				,category: ""
				,odr_col_list:"" 
				,odr_type: ""
				,opt_chartId: "houseChart5"
				,opt_chartType: "column"
				,opt_chartNm: "가구주 연령대별 주택소유율"
				,opt_tblIds: ["DT_1OH0403","DT_1OH0418"]
				,opt_digits: "1"
			}
			this.chart4();
		},set_chart5 : function(){
			//가구주 연령대별 주택소유율
			this.tbl_id = "DT_1OH0404";
			this.parameters = {
				surv_year_list: $administStatsMap.ui.year,
				org_id_list: "101",
				tbl_id_list: "DT_1OH0404,DT_1OH0419",
				list_var_ord_list: "",
				char_itm_id_list: "T001",
				prt_type: "",
				adm_cd: "",
				ov_l1_list: "00",
				ov_l2_list: "1,2,3,4,5",
				ov_l3_list: "",
				ov_l4_list: "",
				ov_l5_list: "",
				category: "",
				odr_col_list:"", 
				odr_type: "",
				opt_chartId: "houseChart6",
				opt_chartType: "column",
				opt_chartNm: "가구원수별 주택소유율",
				opt_tblIds: ["DT_1OH0404" ,"DT_1OH0419"],
				opt_digits: "1"
			}
			this.chart5();
		},
		set_chart6 : function(){
			//가구주 연령대별 주택소유율
			this.tbl_id = "DT_1OH0405";
			this.parameters = {
				surv_year_list:  $administStatsMap.ui.year
				,org_id_list: "101"
				,tbl_id_list: "DT_1OH0405,DT_1OH0420"
				,list_var_ord_list:"" 
				,char_itm_id_list: "T001"
				,prt_type: ""
				,adm_cd: ""
				,ov_l1_list:  $administStatsMap.ui.admCd.replace("up:","")
				,ov_l2_list: "11,21,22,30"
				,ov_l3_list: ""
				,ov_l4_list: ""
				,ov_l5_list: ""
				,category: ""
				,odr_col_list:"" 
				,odr_type: ""
				,opt_chartId: "houseChart7"
				,opt_chartType: "column"
				,opt_chartNm: "세대구성별 주택소유율"
				,opt_tblIds: ["DT_1OH0405","DT_1OH0420"]
				,opt_digits: "1"
			}
			this.chart6();
		},
		//지역별 개인이 소유한 주택 수, 주택을 소유한 개인 수, 거주지역별 주택 소유율, 가구주 연령대별 주택소유율 , 가구원수별 주택소유율, 세대구성별 주택소유율 [전체차트] 
		set_chart8: function(tp,point){
			//지역별 개인이 소유한 주택 수
			//지역별 막대 차트
			if(tp=="01"){
				this.tbl_id = "DT_1OH0501";
				
				this.parameters = {
					 surv_year_list: $administStatsMap.ui.year
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0501"
					,list_var_ord_list: ""
					//,char_itm_id_list: "T0012"
					,char_itm_id_list: "T002"
					,prt_type:"" 
					,adm_cd: ""
					,ov_l1_list: "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
					,ov_l2_list: ""
					,ov_l3_list: ""
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart1"
					,opt_chartType: "pie"
					,opt_chartNm: "개인이 소유한 주택 수"
					,opt_tblIds: ["DT_1OH0501"]
					,opt_digits: "0"
					,regn_dataKey: "CHAR_ITM_ID"
					,regn_title: "총주택"
					,regn_color: "#BCBCBC"
					,opt_fnCalc: ""
				};
			//주택을 소유한 개인 수
			}else if(tp =="02"){
//				this.tbl_id = "DT_1IN1502"
				this.tbl_id = "DT_1OH0504"	
				this.parameters = {
					 surv_year_list: $administStatsMap.ui.year
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0504"
					,list_var_ord_list: ""
					,char_itm_id_list: ""
					,prt_type: ""
					,adm_cd: ""
					,ov_l1_list: "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
//						,ov_l1_list: "00"
					,ov_l2_list: "0,1,2"
					,ov_l3_list: "000"
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart2"
					,opt_chartType: "pie"
					,opt_chartNm: "주택을 소유한 개인 수"
					//,opt_tblIds: ["DT_1IN1502","DT_1OH0504"]
						,opt_tblIds: ["DT_1OH0504"]
					,opt_digits: "0"
					,opt_fnCalc: ""
					,regn_dataKey: "CHAR_ITM_ID"
					,regn_title: "총인구"
					,regn_color: "#BCBCBC"
					,regn_unit: "명"
				}
			}else if(tp == "03") {
				this.tbl_id = "DT_1OH0402"	
				this.parameters = {
					surv_year_list:  $administStatsMap.ui.year
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0402"
					,list_var_ord_list: ""
					,char_itm_id_list: "T002"
					,prt_type: ""
					,adm_cd: ""
					,ov_l1_list: "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
					,ov_l2_list: ""
					,ov_l3_list: ""
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,regn_dataKey: "CHAR_ITM_ID"
					,regn_title: "총가구"
					,regn_color: "#BCBCBC"
					,opt_fnCalc: ""
				}
			}else if(tp == "04"){
				this.tbl_id = "DT_1OH0402"	
				this.parameters = {
					 surv_year_list:  $administStatsMap.ui.year
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0402"
					,list_var_ord_list: ""
					,char_itm_id_list: "T001,T002"
					,prt_type:"" 
					,adm_cd: ""
					,ov_l1_list: "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
					,ov_l2_list: ""
					,ov_l3_list: ""
					,ov_l4_list: ""
					,ov_l5_list:"" 
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart4"
					,opt_chartType: "column"
					,opt_chartNm: "거주지역별 주택소유율"
					,opt_tblIds: ["DT_1OH0402"]
					,opt_digits: "1"
					,opt_fnCalc: ""
					,regn_dataKey: "CHAR_ITM_ID"
					,regn_title:  "주택소유율(가구기준)"
					,regn_color: "#197F77"
					,regn_mapColor: "#0B610B"
					,regn_unit: "%"
				}
			}else if(tp == "05"){
				this.tbl_id = "DT_1OH0402"	
				var years = "";
				years+=$administStatsMap.ui.year
				years+=","+($administStatsMap.ui.year-1)
				years+=","+($administStatsMap.ui.year-2)
				years+=","+($administStatsMap.ui.year-3)
				years+=","+($administStatsMap.ui.year-4)
				
				this.parameters = {
					 surv_year_list: years
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0403,DT_1OH0418"
					,list_var_ord_list: ""
					,char_itm_id_list: "T001"
					,prt_type:"" 
					,adm_cd: ""
					,ov_l1_list: "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39" // $administStatsMain.ui.selectedArea
					,ov_l2_list: "0"
					,ov_l3_list: "100,200,300,400,500,600,700"
					,ov_l4_list: ""
					,ov_l5_list:"" 
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart5"
					,opt_chartType: "column"
					,opt_chartNm: "가구주 연령대별 주택 소유율"
					,opt_tblIds: ["DT_1OH0403" , "DT_1OH0418"]
					,opt_digits: "1"
					,opt_fnCalc: ""
					,tmsr_chartId: "tmsrChart"
					,tmsr_title: "가구주 연령대별 주택소유율"
					,tmsr_dataKey: "OV_L3_ID"
					,tmsr_nameKey: "OV_L3_KOR"
					,tmsr_unit: "%"
				}
			}else if(tp == "06"){
				this.tbl_id = "DT_1OH0404"	
					var years = "";
					years+=$administStatsMap.ui.year
					years+=","+($administStatsMap.ui.year-1)
					years+=","+($administStatsMap.ui.year-2)
					years+=","+($administStatsMap.ui.year-3)
					years+=","+($administStatsMap.ui.year-4)
					
					this.parameters = {
						 surv_year_list: years
						,org_id_list: "101"
						,tbl_id_list: "DT_1OH0404,DT_1OH0419"
						,list_var_ord_list: ""
						,char_itm_id_list: "T001"
						,prt_type:"" 
						,adm_cd: ""
						,ov_l1_list: "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
						,ov_l2_list: "1,2,3,4,5"
						,ov_l3_list: ""
						,ov_l4_list: ""
						,ov_l5_list:"" 
						,category: ""
						,odr_col_list:"" 
						,odr_type: ""
						,opt_chartId: "houseChart6"
						,opt_chartType: "column"
						,opt_chartNm: "가구원수별 주택소유율"
						,opt_tblIds: ["DT_1OH0404" , "DT_1OH0419"]
						,opt_digits: "1"
						,opt_fnCalc: ""
						,tmsr_chartId: "tmsrChart"
						,tmsr_title: "가구원수별 주택소유율"
						,tmsr_dataKey: "OV_L2_ID"
						,tmsr_nameKey: "OV_L2_KOR"
						,tmsr_unit: "%"
					}
				}
				
			this.chart8(tp);
		},//지역별 개인이 소유한 주택 수, 주택을 소유한 개인 수, 거주지역별 주택 소유율, 가구주 연령대별 주택소유율 , 가구원수별 주택소유율, 세대구성별 주택소유율 [전체차트] 
		set_chart9: function(tp){
			//지역별 개인이 소유한 주택 수
			//지역별 막대 차트
			if(tp=="01"){
				this.tbl_id = "DT_1OH0501";
				var years = "";
//					years+=$administStatsMap.ui.year
//					years+=","+($administStatsMap.ui.year-1)
//					years+=","+($administStatsMap.ui.year-2)
//					years+=","+($administStatsMap.ui.year-3)
//					years+=","+($administStatsMap.ui.year-4)
					years = $administStatsMap.ui.yearList.join(",");
				this.parameters = {
					  surv_year_list: years
					 ,org_id_list: "101"
					 ,tbl_id_list: "DT_1OH0501"
					 ,list_var_ord_list: ""
					 ,char_itm_id_list: "T001,T002"
					 ,prt_type: ""
					 ,adm_cd: ""
					 ,ov_l1_list: "00"
					 ,ov_l2_list: ""
					 ,ov_l3_list: ""
					 ,ov_l4_list: ""
					 ,ov_l5_list: ""
					 ,category: ""
					 ,odr_col_list:"" 
					 ,odr_type: ""
					 ,opt_chartId: "houseChart1"
					 ,opt_chartType: "pie"
					 ,opt_chartNm: "개인이 소유한 주택 수"
					 ,opt_tblIds: ["DT_1OH0501"]
					 ,opt_digits: "0"
					 ,tmsr_chartId: "tmsrChart"
					 ,tmsr_title: "개인이 소유한 주택 수"
					 ,tmsr_dataKey: "CHAR_ITM_ID"
					 ,tmsr_nameKey: "CHAR_ITM_NM"
					 ,tmsr_colors: ["#BCBCBC","#338CCA"]
					 ,tmsr_colors: ""
					 ,opt_fnCalc: ""
				};
			}else if(tp == "02"){
				this.tbl_id = "DT_1IN1502,DT_1OH0504";
				var years = "";
//					years+=$administStatsMap.ui.year
//					years+=","+($administStatsMap.ui.year-1)
//					years+=","+($administStatsMap.ui.year-2)
//					years+=","+($administStatsMap.ui.year-3)
//					years+=","+($administStatsMap.ui.year-4)
					years = $administStatsMap.ui.yearList.join(",");
				this.parameters = {
					surv_year_list: years
					,org_id_list: "101"
					,tbl_id_list: "DT_1IN1502,DT_1OH0504"
					,list_var_ord_list: ""
					,char_itm_id_list: ""
					,prt_type: ""
					,adm_cd: ""
					,ov_l1_list: "00"
					,ov_l2_list: ""
					,ov_l3_list: ""
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart2"
					,opt_chartType: "pie"
					,opt_chartNm: "주택을 소유한 개인 수"
					,opt_tblIds: ["DT_1IN1502", "DT_1OH0504"]
					,opt_digits: "0"
					,opt_fnCalc: ""
					,regn_dataKey: "CHAR_ITM_ID"
					,regn_title: "총인구"
					,regn_color: "#BCBCBC"
					,regn_unit: "명"
				}
			}else if(tp == "03"){
				this.tbl_id = "DT_1OH0402";
				var years = "";
//					years+=$administStatsMap.ui.year
//					years+=","+($administStatsMap.ui.year-1)
//					years+=","+($administStatsMap.ui.year-2)
//					years+=","+($administStatsMap.ui.year-3)
//					years+=","+($administStatsMap.ui.year-4)
					years = $administStatsMap.ui.yearList.join(",");
				this.parameters = {
					surv_year_list: years
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0402"
					,list_var_ord_list: ""
					,char_itm_id_list: "T001,T002"
					,prt_type: ""
					,adm_cd: ""
					,ov_l1_list: "00"
					,ov_l2_list: ""
					,ov_l3_list: ""
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart3"
					,opt_chartType: "pie"
					,opt_chartNm: "주택을 소유한 가구 수"
					,opt_tblIds: ["DT_1OH0402"]
					,opt_digits: "0"
					,opt_fnCalc: ""
					,regn_dataKey: "CHAR_ITM_ID"
					,tmsr_nameKey: "CHAR_ITM_NM"
					,tmsr_colors: ["#BCBCBC","#33B18F"]
					,opt_fnCalc:"" 
				}
			}else if(tp == "04"){
				this.tbl_id = "DT_1OH0402";
				var years = "";
//				years+=$administStatsMap.ui.year
//				years+=","+($administStatsMap.ui.year-1)
//				years+=","+($administStatsMap.ui.year-2)
//				years+=","+($administStatsMap.ui.year-3)
//				years+=","+($administStatsMap.ui.year-4)
				years = $administStatsMap.ui.yearList.join(",");
					
				this.parameters = {
					surv_year_list: years
					,org_id_list: "101"
					,tbl_id_list: "DT_1OH0402"
					,list_var_ord_list: ""
					,char_itm_id_list: "T001,T002"
					,prt_type: ""
					,adm_cd: ""
					,ov_l1_list: "00"
					,ov_l2_list: ""
					,ov_l3_list: ''
					,ov_l4_list: ""
					,ov_l5_list: ""
					,category: ""
					,odr_col_list:"" 
					,odr_type: ""
					,opt_chartId: "houseChart4"
					,opt_chartType: "column"
					,opt_chartNm: "거주지역별 주택소유율"
					,opt_tblIds: ["DT_1OH0402"]
					,opt_digits: "1"
					,opt_fnCalc: ""
					,tmsr_chartId: "tmsrChart"
					,tmsr_title:  "주택소유율(가구기준)"
					,tmsr_dataKey: "CHAR_ITM_ID"
					,tmsr_nameKey: "CHAR_ITM_NM"
					,tmsr_colors: ["#197F77"]
					,tmsr_unit: "%"
				}
			}
			this.chart9(tp);
		},
		chart : function(tp){
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				var current =0;
				var before =0;
				var dt_id = ""
				data.forEach(item=>{
					if(tp == "01"){
					//개소유주택
						dt_id ="DT_1OH0501"
						if(item.PRD_DE == $administStatsMap.ui.year){
							current = item.DTVAL_CO
						} else{
							//총주택
							before = item.DTVAL_CO
						}
					}else if(tp == "02"){
						dt_id ="DT_1OH0504"
						if(item.PRD_DE == $administStatsMap.ui.year
								&& item.OV_L2_KOR == "총계"
								&& item.OV_L3_ID == "000" ){
							current = item.DTVAL_CO
							
						} else if(item.PRD_DE == ($administStatsMap.ui.year-1)
								&& item.OV_L2_KOR == "총계"
								&& item.OV_L3_ID == "000"){
							//총주택
							before = item.DTVAL_CO
						}
						
					}else if(tp == "03"){
						dt_id ="DT_1OH0402"
						if(item.PRD_DE == $administStatsMap.ui.year){
							current = item.DTVAL_CO
							
						} else if(item.PRD_DE == ($administStatsMap.ui.year-1)){
							//총주택
							before = item.DTVAL_CO
						}
					}
				})
				
				const rtv = (current - before ) / before * 100;
				const rt = rtv.toFixed(1);

				$("[data-id="+dt_id+"-number]").text($.heum.setThousandSeparator(current));
//				var  rts = ( ( (current - before) / before) * 100).toFixed(1)
				$("[data-id="+dt_id+"-rt]").removeClass("state-up state-down").text(" "+Math.abs(rt)+"%");
				if(rtv>0){
					$("[data-id="+dt_id+"-rt]").addClass("state-up");
				}else if(rtv<0){
					$("[data-id="+dt_id+"-rt]").addClass("state-down");
				}
			})
		},
		chart1 : function(tp){
//			$("#chart1").empty();
			let colors, title;
			common_loading(true);
			let itm_nm;
			if(this.tabIndex==0){
				title = "개인소유 주택 수";
				colors = ["#434348", "#1B7ED5"];
				//colors = ["#e2658f", "#95CEFF"];
				//데이터 명칭
				itm_nm = "CHAR_ITM_NM";
				
			}
			else if(this.tabIndex==1){
				title = "주택을 소유한 개인 수";
				colors = ["#23b7d1", "#ff5253"];
				//colors = ["#a0a0a0", "#23b7d1", "#ff5253"];
				
				itm_nm = "CHAR_ITM_NM";
			}
			else{
				return;
			}
			
			//차트 1 시작-----------------
			$("#chart1-title").data("append-text",title).text($administStatsMap.ui.year+"년 "+title);
			const _this = this;
			$administStatsMap.utils.getTotsurvStatData(this.parameters, function(data, param) {
				let chartData = [];
				//주택을 소유한 개인 수 : 주택소유개인
				if(tp =="02"){
					/*
					data = data.sort(function (a, b) {
						return parseFloat(b.DTVAL_CO)-parseFloat(a.DTVAL_CO);
					});*/
					$("#chart1-title-unit").text("(단위 : %, 명)");
					$("#chart1-title-unit").hide()
					
					let chart1 = 0;
					let chart1_title = "";
					let chart2 = 0;
					let chart2_title = "";
					let total = 0;
					unit2 ="명"
					
					var sum1 = 0 ;
					var sum2 = 0 ;
//					for (let i = 0; i < data.length; i++) {
//						data[i].dt = data[i].DTVAL_CO * 1;
//						if (data[i].TBL_ID == "DT_1IN1502" && data[i].CHAR_ITM_ID == "T130") {
//							sum1 +=data[i].dt;
//							data[i].itm_nm = "총 인구 수";
//							chartData.push(data[i]);
//						} else if (data[i].TBL_ID == "DT_1OH0504" && data[i].OV_L2_ID == "0" && data[i].OV_L3_ID == "000") {
//							sum2 +=data[i].dt;
//							data[i].itm_nm = "주택소유개인";
//							data[i].char_itm_id = "T131";
//							chartData.push(data[i]);
//						}
//					}
					
//					let datas = [];
//					for (let i = 0; i < data.length; i++) {
//						data[i].DTVAL_CO = data[i].DTVAL_CO * 1;
//						if (data[i].TBL_ID == "DT_1OH0504") {
//							data[i].CHAR_ITM_NM = "주택소유개인";
//							data[i].CHAR_ITM_ID = "T001";
//							datas.push(data[i]);
//						}
//					}
					
					var dataM = data.find(x => x.OV_L2_ID === '1');
					var dataW = data.find(x => x.OV_L2_ID === '2');
					let dataAll = data.find(x=> x.OV_L2_ID === '0');
					
					chartData.push({
						itm_nm:dataM.OV_L2_KOR,
						dt:parseFloat(dataM.DTVAL_CO)
					});	
					
					chartData.push({
						itm_nm:dataW.OV_L2_KOR,
						dt:parseFloat(dataW.DTVAL_CO)						
					});
					
					
					
//					chartData.forEach(item=>{
//						if(item.TBL_ID == "DT_1IN1502"){
//							item.dt = sum1 - sum2
//						}
//					})
//					
//					chartData = chartData.sort(function (a, b) {
//						return parseFloat(a.dt)-parseFloat(b.dt);
//					});
					
					$("#chart1-legend").find(".legend-box:eq(0)").css("display", "inline-block");
					$("#chart1-legend").find(".legend-box:eq(1)").attr("style","background-color: #ff5253");
					$("#chart1-legend").find(".legend-label:eq(0)").text("여자");
					$("#chart1-legend").find(".legend-box:eq(3)").attr("style","background-color: #23b7d1");
					$("#chart1-legend").find(".legend-label:eq(1)").text("남자");
					
					createDonutChart({
						target:"chart1"
						,data:chartData
						,isShowLegend:false
						,rotate:false
						,isShowYaxis:false
						,isSort:false
						,colorData:colors
						,unit:"명"
						,sumText:"총계"
						,tooltipCallback:function(d,i,e){
							var point = this.point
							
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":chartData[event.point.x].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){ 
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),unit2
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.char_itm_id_list = "T001";
										if(i==0){
											parameters.ov_l2_list = "1";
										}else if(i==1){
											parameters.ov_l2_list = "2";
										}
										parameters.ov_l3_list = "000";
//										if(_this.tabIndex==0){
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
//										}else{
//											parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
//										}
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
										//$administStatsMap.ui.tooltipMap.mapTotalVal = d.value;
										$administStatsMap.ui.mapTotalVal = d.value;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : unit2,
												callback:function(data){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append(
																	title
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),unit2
																	)
																)
															);
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							).show();
						},totalCallback:function(){
							//const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
							const tooltip = $("#chart1").parents("[data-type=chart-container]").find("[data-type=tooltip]");
							
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":"총계"}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){ 
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data[0].DTVAL_CO)}),unit2
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = "DT_1OH0504";
										parameters.char_itm_id_list = "T001";
										parameters.ov_l2_list = "0";
										parameters.ov_l3_list = "000";
//										if(_this.tabIndex==0){
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
//										}else{
//											parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
//										}
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = "총계";
										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											
											$administStatsMap.ui.tooltipMap.mapTotalVal = resultMapData.result.mapData[17].dt;
											$administStatsMap.ui.mapTotalVal = resultMapData.result.mapData[17].dt;
											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : unit2,
												callback:function(data){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append(
																	title
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":"총계"}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data[17].dt)}),unit2
																	)
																)
															);
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							).show();
						}
					});
				}else{
					//주택을 소유한 개인 수 : 개인소유주택
					var t002 = "";
					var t001 = "";
					$("#chart1-title-unit").text("(단위 : %, 호)");
					$("#chart1-title-unit").hide()
					$("#chart1-legend").find(".legend-box:eq(0)").css("display", "none");
					$("#chart1-legend").find(".legend-box:eq(3)").attr("style","background-color: #1B7ED5");
					$("#chart1-legend").find(".legend-label:eq(1)").text("개인소유주택");
					$("#chart1-legend").show();
					unit2 ="호"
					//순서가 바굴경우 로직 변경 필요
					data.forEach(item=>{
						//주택소유
						if(item.CHAR_ITM_ID == "T002"){
							t002 =parseFloat(item.DTVAL_CO);
						}else{
							//총합계 - 주택소유 = 남은 값
							t001 = parseFloat(item.DTVAL_CO)
						}
					});
					
					chartData.push({
						itm_nm:"개인소유주택",
						dt: t002
					})
					
					chartData.push({
						itm_nm:"기타",
						dt: (t001 - t002)
					})
					
					
					//개인소유주택 : 파란색, 기타 회색
					createDonutChart({
						target:"chart1"
						,data:chartData
						,isShowLegend:false
						,rotate:false
						,isShowYaxis:false
						,colorData:["#1B7ED5", "#434348"]
						,unit:"호"
						,sumText:"총 주택 수"
						,dataLabelsFormater:function(e){
							this.point
							console.log(e)
						}
						,tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
							if(i == 1){
								return;
							}
							
							
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":"개인소유주택"}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),"호"
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										if(_this.tabIndex==0){
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										}else{
											parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
										}
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "호",
												callback:function(data){
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(e){
															console.log('e ' + e)
															$administStatsMap.ui.tooltipMap.mapTotalVal = d.value;
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
																$("<h3/>").append(
																	title
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
			//														$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+$administStatsMap.ui.tooltipMap.title}),
																		$("<h3/>",{"class":"modal__tit","text":"개인소유주택"}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),"호"
																	)
																)
															);
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
										
									})
								)
							).show();
						}
					});
					//$('.highcharts-data-label-color-1').css('opacity', 0);
					//$('.highcharts-color-1').css('stroke-width', 0);
				}
			 
				common_loading(false);
			});
		},
		//주택을 소유한 가구 수
		chart2 : function(){
			const _this = this;
			let admCd,columns=[],groupKey,title;
				//admCd = $administStatsMap.consts.sidoAll;
				admCd = $administStatsMap.ui.admCd || "00"; 
				groupKey = "TBL_ID";
				columns = ["DT_1OH0402"];
				title = "주택을 소유한 가구 수"; 
				colors = ["#1B7ED5", "#434348"];
			//차트 2 시작-----------------
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters,{ov_l1_list:admCd}),function(data){
					$("#chart2-title").data("append-text",title).text($administStatsMap.ui.year+"년 "+title);
					$("#chart2-title-unit").text("(단위 : %, 가구)");
					$("#chart2-title-unit").hide()
					let chartData = [];
					data = data.sort(function (a, b) {
						return parseFloat(b.DTVAL_CO)-parseFloat(a.DTVAL_CO);
					});
					let total = 0;
					var t002 = "";
					var t001 = "";
					var itm_nm1 = "";
					var itm_nm2 = "";
					unit2 = "가구"
					data.forEach(item=>{
					
						//주택소유 가구
						if(item.CHAR_ITM_ID == "T002"  ){
							const value = parseFloat(item.DTVAL_CO);
							t002 = value;
							itm_nm1 = "주택소유가구";
							
							total+=value;
						}
						//(총가구 일반가구)
						if(item.CHAR_ITM_ID == "T001"){
							const value = parseFloat(item.DTVAL_CO);
							t001= value;
							itm_nm2 = "무주택소유가구";
							total+=value;
						}
					});

					chartData.push({
						itm_nm:itm_nm1,
						dt:t002
					});
					chartData.push({
						itm_nm:itm_nm2,
						dt: t001- t002
					});
				
					createDonutChart({
						 target:"chart2"
						,data:chartData
						,isShowLegend:false
						,rotate:false
						,isShowYaxis:false
						,colorData:colors
						,unit:"가구"
						,sumText:"총 가구"
						,unit : '가구'
						,totalCallback:function(){
							const tooltip = $("#chart2").parents("[data-type=chart-container]").find("[data-type=tooltip]");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//									$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+chartData[i].itm_nm}),
										$("<h3/>",{"class":"modal__tit","text":"주택소유 총 가구"}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),	
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(data[0].DTVAL_CO)}),unit2
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = "DT_1OH0402";
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = "총 가구 수";
										
										parameters.char_itm_id_list = "T001"
												
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											
											$administStatsMap.ui.tooltipMap.mapTotalVal = resultMapData.result.mapData[17].dt;
											$administStatsMap.ui.mapTotalVal = resultMapData.result.mapData[17].dt;
											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : unit2,
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+"년 "}),
																$("<h3/>").append(
																	title
																	//$("<span/>",{"text":" - "+chartData[i].itm_nm})
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
			//														$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "}),
																	
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(data[17].dt)}),unit2
																	)
																)
															);
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							).show();
						}
						,tooltipCallback:function(d,i,event){
							if( i == 1){
								return;
							}
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//									$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+chartData[i].itm_nm}),
										$("<h3/>",{"class":"modal__tit","text":"주택소유 가구"}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.value)}),unit2
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = data[i].TBL_ID;
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = chartData[i].itm_nm;
										
										parameters.char_itm_id_list = "T002"
												
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : unit2,
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+"년 "}),
																$("<h3/>").append(
																	title
																	//$("<span/>",{"text":" - "+chartData[i].itm_nm})
																),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.tooltipMap.title}),
			//														$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "}),
																	
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),unit2
																	)
																)
															);
														}
													});
													$("#tooltip-map-tooltip").show();
												}
											},resultMapData.result.mapData,parameters);
										});
									})
								)
							).show();
						}
					});
					//$('.highcharts-data-label-color-1').css('opacity', 0);
					//$('.highcharts-color-1').css('stroke-width', 0);
				}
			);
		}
		,chart3 : function(){
			//admCd = $administStatsMap.ui.admCd ;
			//admCd = $administStatsMap.consts.sidoAll ;
			admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
			admCd = admCd.replace("up:","");
			const _this = this;
			title = "거주지역별 주택소유율(가구기준)";
			let unit ="(단위 %, 가구)";
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters,{ov_l1_list:admCd}),function(data){
					$("#chart3-title").data("append-text",title).text($administStatsMap.ui.year +"년 " +title);
					$("#chart3-title-unit").text(unit);
					$("#chart3-title-unit").hide();
					$("#chart3-legend").show();

					let chartData = [];
					//전국데이터만처리
					let datas1 = [];
					//전국 제외 데이터만 처리
					let datas2 = [];
					
					let total = 0;
					
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						for (let j = 0; j < data.length; j++) {
							let t =data[j];
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == "T002" && t.CHAR_ITM_ID == "T001") {
								s.DTVAL_CO_ORI = s.DTVAL_CO;
								var dt = s.DTVAL_CO / t.DTVAL_CO * 100;
								s.dt = dt
								s.itm_nm = $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR)
								if(s.OV_L1_ID == "00"){
									datas1.push(s);
								}else{
									datas2.push(s);
								}
							}
						}
					}
	
					datas2 = datas2.sort(function (a, b) {
						return parseFloat(b.dt)-parseFloat(a.dt);
					})
					//최상위
					$.each(datas2, function(i, v) {
						if (i < 3) {
							chartData.push(v)
						}
					});
					//전국
					if(datas1.length > 0 ){
						chartData.push(datas1[0])		
					}
					//최하위
					for (let i = datas2.length - 3; i < datas2.length; i++) {
						const v = datas2[i];
						chartData.push(v)
					}
					
					chartData.forEach(item=>{
						total+=item.dt;
						item.dt = item.dt.toFixed(1)
					});
					
					const avg = (total/chartData.length).toFixed(2);
		
					createVerticalBarChart({
						 target:"chart3"
						,rotate:false
						,data:chartData
						,dataVal:"dt" 
						,color:["#e2658f","#e2658f","#e2658f","#BCBCBC","#35829e","#35829e","#35829e"]
						,columnVal:"itm_nm"
						,isShowYaxis:false
						,avgLineData:avg
						,unit : '%'
						,tooltipCallback:function(d,i){
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+ "년 " +title}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){  
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(chartData[i].DTVAL_CO_ORI)}),unit2
									)
//									,$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
//										let parameters = $.extend(true,{},_this.parameters);
//										parameters.surv_year_list =$administStatsMap.ui.year;
//										parameters.ov_l1_list = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
//										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
//										$administStatsMap.ui.tooltipMap.title="";
//										$administStatsMap.utils.getTotsurvStatData(
//											parameters, function(res, param) {
////											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
//											let alldatas = opt_fnCalc({data:res,OV_L2_ID:"00",tp:"04"});
////											alldatas.forEach((d,index)=>{
////												d.adm_cd = d.OV_L1_ID;
////												d.region_nm = d.OV_L1_KOR;
////											});
//											
//											$administStatsMap.ui.map["tooltip-map"].setStatsData({
//												adm_cd: "00",
//												admCdKey:"adm_cd",
//												showData : "dt",
//												unit : "%",
//												callback:function(data){
//													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
////													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//													
//													$administStatsMap.ui.tooltipMap.show({
//														tooltipCallback:function(){
//															$("#tooltip-map-modal-title").empty().append(
//																$("<p>",{"text":$administStatsMap.ui.year+'년 '+$administStatsMap.ui.tooltipMap.selectedAdmNm}),
//																$("<h3/>").append(title,$("<span/>",{"text":" - "+chartData[i].itm_nm})),
//																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
//																	$('#tooltip-map-container').hide();
//																	$('.dim').hide();
//																	return false;
//																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
//															);
//														},
//														endCallback:function(){
//															//서브 타이틀
//															$("#tooltip-map-tooltip").empty().append(
//																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+$administStatsMap.ui.tooltipMap.title}),
//																	$("<a/>",{"class":"btn__cancel"}).click(function(){
//																		$('#tooltip-map-tooltip').hide(); 
//																		return false;
//																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
//																),
//																$("<div/>",{"class":"modal__body"}).append(
//																	$("<p/>").append(
//																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
//																	),
//																	$("<p/>").append(
//																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),'%'
//																	)
//																)
//															);
//															$("#tooltip-map-tooltip").show();
//														}
//													});
//												}
//											}//,resultMapData.result.mapData,parameters);
//											,alldatas ,parameters);
//										});
//									})
								)
							);
//							tooltip.show();
						}
					});
				}
			)
		}
		,chart4 : function(tp){
			admCd = $administStatsMap.ui.admCd ;
			admCd = admCd.replace("up:","");
			
			title = "가구주 연령대별 주택소유율"
			const _this = this;
			let unit = "(단위 %, 가구)";
			let unit2 = "%";
			let unit3 = "";
			let parameters = $.extend(true,{},_this.parameters);
			$administStatsMap.utils.getTotsurvStatData(
				parameters,function(data){
					$("#chart4-title").data("append-text",title).text($administStatsMap.ui.year+"년 " + title);
					$("#chart4-title-unit").text(unit);
					$("#chart4-title-unit").hide()
					$("#chart4-legend").show();

					let chartData = [];
					let total = 0;
					
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.TBL_ID == t.TBL_ID && s.OV_L3_ID == "500") {
									s.OV_L3_KOR = "60세이상";
									if (t.OV_L3_ID >= 600) {
										s.DTVAL_CO += t.DTVAL_CO;
									}
								}
							}
						}
					}
					for (let i = 0; i < data.length; i++) {
						let s = JSON.parse(JSON.stringify(data[i]));
						for (let j = 0; j < data.length; j++) {
							let t = JSON.parse(JSON.stringify(data[j]));
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.OV_L3_ID <= 500) {
									if (s.TBL_ID == "DT_1OH0403" && t.TBL_ID == "DT_1OH0418" && s.OV_L3_ID == t.OV_L3_ID) {
										total+=s.DTVAL_CO;
										s.DTVAL_CO_ORI = s.DTVAL_CO;
										s.DTVAL_CO = (s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100).toFixed(1);
										s.dt = s.DTVAL_CO
										s.itm_nm = $administStatsMap.utils.abbreviationToAddress(s.OV_L3_KOR);
										chartData.push(s);
									}
								}
							}
						}
					}
					
//					let chartData = opt_fnCalc({data:res,OV_L2_ID:"",tp:"05"});
					
					chartData = chartData.sort(function (a, b) {
						return a.OV_L3_ID-b.OV_L3_ID;
					});
					
					
					let max = 0;
					let colors = chartData.map((d,index)=>{
						max = Math.max(max,parseFloat(d.DTVAL_CO_ORI));
						return "#747474";
					});
					colors[chartData.findIndex(x => parseFloat(x.DTVAL_CO_ORI) === max)] = "#e2658f";
					
//					const avg = (total/chartData.length).toFixed(2);
					createVerticalBarChart({
						 target:"chart4"
						,rotate:false
						,isSort:false
						,data:chartData
						,dataVal:"DTVAL_CO" 
						,color:colors
						,columnVal:"OV_L3_KOR"
						,isShowYaxis:false
//						,avgLineData:avg
						,unit:'%'
						,tooltipCallback:function(d,i){
//							let jsonData = {
//								l3id : d.OV_L3_ID,
//								l3nm : d.itm_nm,
//							} 
//							
//							$administStatsMap.chart.main1.chart8("05" ,jsonData);
//							$administStatsMap.chart.main1.chart9("05" ,jsonData);
							
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//									$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+title}),
									$("<h3/>",{"class":"modal__tit","text":chartData[i].OV_L3_KOR}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
//									$("<p/>").append(
//										$("<span/>",{"class":"color-blue","text":chartData[i].OV_L3_KOR})
//									),
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(chartData[i].DTVAL_CO_ORI)}),"가구"
									)
									//chart4지도보기
									,$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal = null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.surv_year_list = $administStatsMap.ui.year
										parameters.ov_l1_list = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
											
										let ov_l3_id = "";
										if(chartData[i].OV_L3_ID == "500"){
											ov_l3_id = chartData[i].OV_L3_ID+",600,700"
										}else{
											ov_l3_id = chartData[i].OV_L3_ID
										}
										
										parameters.ov_l3_list = ov_l3_id;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title= chartData[i].itm_nm;
										
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,OV_L2_ID:"100",tp:"05"});
											
											let all500;
											let all600;
											let all700;
											
											let all5002;
											let all6002;
											let all7002;
											
											if(param.ov_l3_list == "500,600,700"){
												all500 = alldatas.filter(x=>x.OV_L3_ID == "500");
												all600 = alldatas.filter(x=>x.OV_L3_ID == "600");
												all700 = alldatas.filter(x=>x.OV_L3_ID == "700");
												
												all5002 = res.filter(x=>x.OV_L3_ID == "500" && x.CHAR_ITM_NM =="소유자수");
												all6002 = res.filter(x=>x.OV_L3_ID == "600" && x.CHAR_ITM_NM =="소유자수");
												all7002 = res.filter(x=>x.OV_L3_ID == "700" && x.CHAR_ITM_NM =="소유자수");
												
												all500.forEach(function(item,index) {
													let sumData = item.DTVAL_CO_ORI + all600[index].DTVAL_CO_ORI + all700[index].DTVAL_CO_ORI;
													let sumData2 = all6002[index].DTVAL_CO + all7002[index].DTVAL_CO + all5002[index].DTVAL_CO;
													item.dt = ( sumData / (sumData + sumData2) *100 ).toFixed(1);
												});
												
												alldatas = all500;
											}
											/*
											if(chartData[i].OV_L3_ID == "500"){
												alldatas.forEach(item=>{
													item.dt = (item.DTVAL_CO_ORI/chartData[i].allData*100).toFixed(1);
												})
											}
											*/
//											alldatas.forEach((d,index)=>{
//												d.adm_cd = d.OV_L1_ID
//												d.region_nm = d.OV_L1_KOR;
//											});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												//showData : "DTVAL_CO",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
//																$("<h3/>").append(title,$("<span/>",{"text":" - "+chartData[i].itm_nm})),
																$("<h3/>").append(title,$("<span/>",{})),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															//서브 타이틀
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
//																		$("<span/>",{"class":"color-blue","text":alldatas[i].itm_nm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),unit2
//																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].DTVAL_CO)}),unit2
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
			)
		}
		,chart5 : function(){
			admCd = $administStatsMap.ui.admCd ;
			admCd = admCd.replace("up:","");
			title = "가구원수별 주택소유율"
			let unit = "(단위 %, 가구)"
			let unit2 = "%"
			let unit3 = "가구"
			const _this = this;
			let parameters = $.extend(true,{},_this.parameters);
			let selectedArea = $administStatsMap.ui.admCd || "" 
			 
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters,{ov_l1_list:admCd}),function(data){
					$("#chart5-title").data("append-text",title).text($administStatsMap.ui.year+"년 "+ title);
					$("#chart5-title-unit").text(unit);
					$("#chart5-title-unit").hide();
					$("#chart5-legend").show();

					let chartData = [];
					
					let total = 0;
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.TBL_ID == "DT_1OH0404" && t.TBL_ID == "DT_1OH0419" && s.OV_L2_ID == t.OV_L2_ID) {
//									s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
									s.dt =  s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100
									chartData.push(s);
								}
							}
						}
					}
					
//					chartData = opt_fnCalc({data:data,OV_L2_ID:"",tp:"06"});
					
					chartData.forEach(item=>{
						total+=item.DTVAL_CO;
						item.DTVAL_CO = item.DTVAL_CO;
						item.dt = item.dt.toFixed(1);
						item.itm_nm = $administStatsMap.utils.abbreviationToAddress(item.OV_L2_KOR);
					});
					
					chartData = chartData.sort(function (a, b) {
						return a.OV_L2_ID-b.OV_L2_ID;
					});
					
					
					let max = 0;
					let colors = chartData.map((d,index)=>{
						max = Math.max(max,parseFloat(d.dt));
						return "#747474";
					});
					colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#e2658f";
					
//					const avg = (total/chartData.length).toFixed(2);
		
					createVerticalBarChart({
						 target:"chart5"
						,isSort:false 
						,rotate:false 
						,data:chartData
						,dataVal:"dt" 
						,color:colors
						,columnVal:"itm_nm"
						,isShowYaxis:false
						,unit:'%'
//						,avgLineData:avg
						,tooltipCallback:function(d,i){
//							let jsonData = {
//								l2id : d.OV_L2_ID,
//								l2nm : d.itm_nm,
//							} 
//							
//							$administStatsMap.chart.main1.chart8("06" ,jsonData);
//							$administStatsMap.chart.main1.chart9("06" ,jsonData);
//							

							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 " + chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
//									$("<p/>").append(
//										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.year+"년 " +chartData[i].itm_nm})
//									),
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(chartData[i].DTVAL_CO)}),unit3
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);

										parameters.surv_year_list = $administStatsMap.ui.year
										parameters.ov_l1_list = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
										parameters.ov_l2_list = chartData[i].OV_L2_ID;
										
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title= chartData[i].itm_nm;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,OV_L2_ID:"00",tp:"06"});
											
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
//																$("<h3/>").append(title,$("<span/>",{"text":" - "+chartData[i].itm_nm})),
																$("<h3/>").append(title,$("<span/>",{})),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															//서브 타이틀
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+$administStatsMap.ui.tooltipMap.title}),
																	$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),unit2
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
			)
		}
		,chart6 : function(){
			admCd  = $administStatsMap.ui.admCd;
			admCd = admCd.replace("up:","");
			let title = "세대구성별 주택소유율 "
			let unit = "(단위 %, 가구)"
			let unit2 = "%"
			let unit3 = "가구"
			const _this = this;
			let parameters = $.extend(true,{},_this.parameters);
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},this.parameters,{ov_l1_list:admCd}),function(data){
					$("#chart6-title").data("append-text",title).text($administStatsMap.ui.year+"년 " + title);
					$("#chart6-title-unit").text(unit);
					$("#chart6-title-unit").hide();
					$("#chart6-legend").show();

					let chartData = [];
					
					let total = 0;
					for (let i = 0; i < data.length; i++) {
						let s = data[i];
						s.DTVAL_CO = s.DTVAL_CO * 1;
						for (let j = 0; j < data.length; j++) {
							let t = data[j];
							t.DTVAL_CO = t.DTVAL_CO * 1;
							if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
								if (s.TBL_ID == "DT_1OH0405" && t.TBL_ID == "DT_1OH0420" && s.OV_L2_ID == t.OV_L2_ID) {
//									s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
									s.dt = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
									chartData.push(s);
								}
							}
						}
					}
//					chartData = opt_fnCalc({data:data,OV_L2_ID:"",tp:"07"});
					
					chartData.forEach(item=>{
						total+=item.DTVAL_CO;
						item.DTVAL_CO = item.DTVAL_CO;
						item.dt = item.dt.toFixed(1);
						item.itm_nm = $administStatsMap.utils.abbreviationToAddress(item.OV_L2_KOR);
					});

					chartData = chartData.sort(function (a, b) {
						return a.OV_L2_ID-b.OV_L2_ID;
					});
					
					
					let max = 0;
					let colors = chartData.map((d,index)=>{
						max = Math.max(max,parseFloat(d.dt));
						return "#747474";
					});
					colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#e2658f";
					
					
//					const avg = (total/chartData.length).toFixed(2);
		
					createVerticalBarChart({
						 target:"chart6"
						,rotate:false
						,isSort:false
						,data:chartData
						,dataVal:"dt" 
						,color: colors
						,columnVal:"itm_nm"
						,isShowYaxis:false
						,unit:'%'
//						,avgLineData:avg
						,tooltipCallback:function(d,i){
//							let jsonData = {
//								l2id : d.OV_L2_ID,
//								l2nm : d.itm_nm,
//							} 
//							
//							$administStatsMap.chart.main1.chart8("07" ,jsonData);
//							$administStatsMap.chart.main1.chart9("07" ,jsonData);


							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 " +chartData[i].itm_nm}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
//									$("<p/>").append(
//										$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
//									),
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(chartData[i].DTVAL_CO)}),unit3
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=null;
										let parameters = $.extend(true,{},_this.parameters);
										parameters.surv_year_list = $administStatsMap.ui.year
										parameters.ov_l1_list = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
										parameters.ov_l2_list = chartData[i].OV_L2_ID;
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title= chartData[i].itm_nm;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											let alldatas = opt_fnCalc({data:res,OV_L2_ID:"",tp:"07"});
//											alldatas.forEach((d,index)=>{
//												d.adm_cd = d.OV_L1_ID.substring(1,3);
//												d.region_nm = d.OV_L1_KOR;
//											});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : "%",
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년'}),
//																$("<h3/>").append(title,$("<span/>",{"text":" - "+chartData[i].itm_nm})),
																$("<h3/>").append(title),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															//서브 타이틀
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].itm_nm}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),unit2
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							);
							tooltip.show();
						}
					});
				}
			)
		}
		//전체차트
		//지역별 개인이 소유한 주택 수, 주택을 소유한 개인 수, 거주지역별 주택 소유율, 가구주 연령대별 주택소유율 , 가구원수별 주택소유율, 세대구성별 주택소유율 [전체차트]
		,chart8 : function(tp,jsonData){
			$("[id^=chart8-0][id$=legend]").hide();
			$("#chart8-"+tp+"-legend").show();
//		,chart8 : function(tp){
			//admCd = $administStatsMap.consts.sidoAll;
			const _this = this;
			let parameters = $.extend(true,{},_this.parameters);
			let selectedArea = $administStatsMap.ui.admCd || "" 
			let year = $administStatsMap.ui.year || "";		
			 
			let parameter1 = "";
			let parameter2 = "";
			admCd = $administStatsMap.ui.admCd;
			admCd = admCd.replace("up:","");
			var title,title2,title3,unit,unit2,unit3 ="",tooltipDataKey,tooltipDataUnit;
			if(tp == "01"){
				//admCd = $administStatsMap.consts.sidoAll;
				title = "지역별 개인이 소유한 주택 수"
				title2 = "개인이 소유한 주택 수"
				title3 = "개인소유 주택"
				unit = "(단위 : 호)";
				unit2 = "%";
				unit3 = "호"
				//admCd = "";
				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
			}else if(tp == "02"){
				title = "지역별 주택을 소유한 개인 수";
				title2 = "주택을 소유한 개인 수"
				title3 = "주택소유 개인"
				unit = "(단위 : 명)";
				unit2  = "%";
				unit3 = "명"
				//admCd = "";
				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
			}else if(tp == "03"){
				title = "지역별 주택을 소유한 가구 수";
				title2 = "주택소유 가구"
				title3 = "주택소유가구"
				unit = "(단위 : 가구)";
				unit2  = "%";
				unit3 = "가구"
				//admCd = "";
				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
			}else if(tp == "04"){
				title = "지역별 주택소유율 (가구기준)";
				title2 = "주택소유 가구"
				title3 = "주택소유율"
				unit = "(단위 : %, 가구)";
				unit2 = "%";
				unit3 = "%";
				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
				tooltipDataKey="DTVAL_CO_ORI";
				tooltipDataUnit="가구";
			}else if(tp == "05"){
				title = "지역별 가구주 연령대별 주택소유율";
				title2 = "가구주 주택소유율"
				title3 = "주택소유가구"
				unit = "(단위 : %, 가구)";
				unit2  = "%";
				unit3 = "%";
				parameters.ov_l1_list = "00";
				parameters.ov_l2_list = "0";
				parameters.ov_l3_list = "100,200,300,400,500,600,700";
				parameters.surv_year_list = year;
				parameters.tbl_id_list = "DT_1OH0403,DT_1OH0418";
				
				//admCd = "";
				if(jsonData){
					parameter1 = jsonData.l3id;
					parameter2 = jsonData.l3nm;
					title3 = parameter2;
					parameters.ov_l1_list = "00";
					parameters.ov_l2_list = "0";
					parameters.ov_l3_list = parameter1?parameter1 : "100";
				}else{
					title3 = title3 //+ "(30세미만)";
				}
				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
			}else if(tp == "06"){
				title = "지역별 가구원수별 주택소유율" 
				title2 = "가구원수별 주택소유율"
				title3 = "주택소유가구"
				unit = "(단위 : %, 가구)";
				unit2  = "%";
				unit3 = "%";
				if(jsonData){
					parameter1 = jsonData.l2id;
					parameter2 = jsonData.l2nm;
					title3 = parameter2;
				}else{
					title3 = title3// + "(1인가구)";
				}
				
//				parameters.surv_year_list = year;
//				parameters.ov_l2_list = parameter1?parameter1 : "1";
//				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
				admCd = "00";
				
				parameters.ov_l1_list = "00";
				parameters.ov_l2_list = "1,2,3,4,5";
				parameters.surv_year_list = year;
				parameters.tbl_id_list = "DT_1OH0404,DT_1OH0419";
				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
			}else if(tp == "07"){
				title = "지역별 세대구성별 주택소유율" 
				title2 = "세대구성별 주택소유율"
				title3 = "주택소유가구"
				unit = "(단위 : %, 가구)";
				unit2  = "%";
				unit3 = "%";
				if(jsonData){
					parameter1 = jsonData.l2id;
					parameter2 = jsonData.l2nm;
					title3 = parameter2;
				}else{
					title3 = title3 //+ "(부부)";
				}
//				parameters.surv_year_list = year;
//				parameters.ov_l2_list = parameter1?parameter1 : "11";
//				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
				
				admCd = "00";
				parameters.ov_l1_list = "00";
				parameters.ov_l2_list = "11,21,22,30";
				parameters.surv_year_list = year;
				parameters.tbl_id_list = "DT_1OH0420,DT_1OH0405";
				admCd = "00,11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
			}
			
			
			$("#chart8-title-unit").text(unit);
			$("#chart8-title-unit").hide();
			$administStatsMap.utils.getTotsurvStatData(
				$.extend(true,{},parameters,{
					ov_l1_list:admCd}
				),function(data){
					$("#chart8-title").data("append-text",title).text($administStatsMap.ui.year+"년 "+title);
					
					
					$("#chart8-legend").show();

					let chartData = [];
					let datas = [];
					let total = 0;
					let totalAll = 0;
					data.forEach(item=>{
						//전국 제외 chart9 opt_
						if(tp == "01"){
							if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
								const value = parseFloat(item.DTVAL_CO);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR) ,
									dt:value,
									adm_cd :item.OV_L1_ID,
									region_nm : item.OV_L1_KOR,
									DTVAL_CO : item.DTVAL_CO *1
								});
								total+=value;
							}
						}/*
						else if(tp == "02"){
							if(item.TBL_ID == "DT_1OH0504" && item.OV_L2_ID == "0" && item.OV_L3_ID == "000" && item.OV_L1_ID == "00") {
								totalAll += parseFloat(item.DTVAL_CO); 
								$administStatsMap.ui.tooltipMap.mapTotalVal = totalAll;
							}
							if(item.TBL_ID == "DT_1OH0504" && item.OV_L2_ID == "0" && item.OV_L3_ID == "000" && item.OV_L1_ID != "00") {
								//14696617
								const value = parseFloat(item.DTVAL_CO);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR) ,
									dt:value,
									adm_cd :item.OV_L1_ID,
									region_nm : item.OV_L1_KOR,
									CHAR_ITM_NM : "주택소유개인",
									CHAR_ITM_ID : "T131",
									DTVAL_CO : item.DTVAL_CO *1
								});
								total+=value;
							}
						}*/
						else if(tp == "03"){
							if(item.OV_L1_ID =="00" || item.OV_L1_ID == "000"){
								totalAll += parseFloat(item.DTVAL_CO); 
								$administStatsMap.ui.tooltipMap.mapTotalVal = totalAll;
							}
							if(item.OV_L1_ID !="00" && item.OV_L1_ID != "000"){
								const value = parseFloat(item.DTVAL_CO);
								chartData.push({
									itm_nm:$administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR) ,
									dt:value,
									adm_cd :item.OV_L1_ID,
									region_nm : item.OV_L1_KOR,
									DTVAL_CO : item.DTVAL_CO *1
								});
								total+=value;
							}
						}
					});
					if(tp == "01" ||/*tp == "02" ||*/ tp == "03"){
						for (let i = 0; i < chartData.length; i++) {
							let s = chartData[i];
							var dt2 = (s.DTVAL_CO / total) * 100;
							s.dt2 = dt2.toFixed(1);
						}
					}
					if(tp == "02"){
						/*
						data.forEach(item=>{
							if(item != 'error: char_itm_id_list 값은 필수 입니다.' && item.OV_L1_ID!="00" && item.OV_L2_ID!="0"){
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item["OV_L2_ID"]] = parseFloat(item.DTVAL_CO);
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item["OV_L2_ID"]];
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item["OV_L2_ID"]];
								}
							}
						});
						datas = Object.keys(datas).filter(key=>key!="00"&&key!="000").map(key=>datas[key]).sort(function (a, b) {
							return b.total-a.total;
						});
						*/
					}
					
					if(tp == "04"){
						$administStatsMap.ui.tooltipMap.mapTotalVal = 0;
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							for (let j = 0; j < data.length; j++) {
								let t =data[j];
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == "T002" && t.CHAR_ITM_ID == "T001") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									var dt = s.DTVAL_CO / t.DTVAL_CO * 100;
									s.dt = dt
									s.itm_nm =  $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR);
									if(s.OV_L1_ID!= "00"){
										total+=s.dt;
										s.dt = s.dt.toFixed(1)
										s.dt2 = s.dt
										s.adm_cd = s.OV_L1_ID;
										s.region_nm = s.OV_L1_KOR;
										chartData.push(s);
									}
								}
							}
						}
//						chartData = opt_fnCalc({data:data,OV_L2_ID:"",tp:"04"});
						chartData = chartData.sort(function (a, b) {
							return parseFloat(b.dt)-parseFloat(a.dt);
						})
					}
					
					if(tp == "05"){

						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.TBL_ID == t.TBL_ID && s.OV_L3_ID == "500") {
										s.item_nm = "60세이상";
										if (t.OV_L3_ID >= 600) {
											s.DTVAL_CO += t.DTVAL_CO;
											s.adm_cd = t.OV_L1_ID;
											s.region_nm = $administStatsMap.utils.abbreviationToAddress(t.OV_L1_KOR);;
										}
									}
								}
							}
						}
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.OV_L3_ID <= 500) {
										if (s.TBL_ID == "DT_1OH0403" && t.TBL_ID == "DT_1OH0418" && s.OV_L3_ID == t.OV_L3_ID) {
											const value =  s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
//											s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
											total+=s.DTVAL_CO ;
											s.itm_nm = $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR);
											s.dt  = value.toFixed(1)
											s.dt2 = value.toFixed(1);
											s.adm_cd = s.OV_L1_ID;
											s.region_nm = s.OV_L1_KOR;
											s.DTVAL_CO_ORI = s.DTVAL_CO;
											chartData.push(s);
										}
									}
								}
							}
						}
						
//						let chartData = opt_fnCalc({data:res,OV_L2_ID:"",tp:"05"});
						chartData = chartData.sort(function (a, b) {
							return a.OV_L2_ID-b.OV_L2_ID;
						});
					}
					
					
					//가구원수별
					if(tp == "06"){

						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;

								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.TBL_ID == "DT_1OH0404" && t.TBL_ID == "DT_1OH0419" && s.OV_L2_ID == t.OV_L2_ID) {
										const value =  s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
//										s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
										total+=s.DTVAL_CO ;
										s.itm_nm = $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR);
										s.dt  = value.toFixed(1)
										s.dt2 = value.toFixed(1);
										s.adm_cd = s.OV_L1_ID;
										s.region_nm = s.OV_L1_KOR;
										s.DTVAL_CO_ORI = s.DTVAL_CO;
										chartData.push(s);
									}
								}
							}
						}
						
//						chartData = opt_fnCalc({data:data,OV_L2_ID:"",tp:"06"});
					}
					
					//가구원수별
					if(tp == "07"){
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							s.DTVAL_CO = s.DTVAL_CO * 1;
							for (let j = 0; j < data.length; j++) {
								let t = data[j];
								t.DTVAL_CO = t.DTVAL_CO * 1;
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
									if (s.TBL_ID == "DT_1OH0405" && t.TBL_ID == "DT_1OH0420" && s.OV_L2_ID == t.OV_L2_ID) {
										const value =  s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
//										s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
										total+=s.DTVAL_CO ;
										s.itm_nm = $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR);
										s.dt  = value.toFixed(1)
										s.dt2 = value.toFixed(1);
										s.adm_cd = s.OV_L1_ID;
										s.region_nm = s.OV_L1_KOR;
										s.DTVAL_CO_ORI = s.DTVAL_CO;
										chartData.push(s);
									}
								}
							}
						}
//						chartData = opt_fnCalc({data:data,OV_L2_ID:"",tp:"07"});
						
						chartData = chartData.sort(function (a, b) {
							return a.OV_L2_ID-b.OV_L2_ID;
						});
					}
					
					const avg = (total/chartData.length).toFixed(2);

					var avg_nm = "";
					var preTxt = "";
					if(tp == "01"){
						avg_nm = $.heum.setThousandSeparator(parseInt(avg))+"호"
						preTxt = "전국대비 "
					}else if(tp == "02"){
						avg_nm = $.heum.setThousandSeparator(parseInt(avg))+"명"
					}else if(tp == "03"){
						avg_nm = $.heum.setThousandSeparator(parseInt(avg))+"가구"
					}else if(tp == "04"){
						avg_nm = $.heum.setThousandSeparator(parseFloat(avg))+"%"
					}else if(tp == "05"){
						avg_nm = $.heum.setThousandSeparator(parseFloat(avg).toFixed(1))+"%"
					}else if(tp == "06"){
						avg_nm = $.heum.setThousandSeparator(parseFloat(avg).toFixed(1))+"%"
					}else if(tp == "07"){
						avg_nm = $.heum.setThousandSeparator(parseFloat(avg).toFixed(1))+"%"
					}
					
					$("#chart8-avg-text").empty().append(
						$("<p/>").append(
							$("<span/>",{"text":"평균"}),
							avg_nm
						)
					);
					
					let max = 0;
					let colors = chartData.map((d,index)=>{
						max = Math.max(max,parseFloat(d.dt));
						return "#747474";
					});
					colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = "#e2658f";
					var l2_list, l3_list, tbl_id_list = "";
					if(tp == "05" || tp == "06" || tp == "07" || tp == "02"){
						if(tp == "05"){
							var groupKey = "OV_L3_ID";
							var columnNames = ["30세미만","30-39세","40-49세","50-59세","60세이상"];
							var columns = ["100","200","300","400","500"];
							var tbl_id_list = "DT_1OH0403,DT_1OH0418";
							colors = ["#7cb6ec","#434348","#90ed7d","#f7a25c","#8085e9"]
						}
						if(tp == "06"){
							var groupKey = "OV_L2_ID";
							var columnNames = ["1인가구","2인가구","3인가구","4인가구","5인가구"];
							var columns = ["1","2","3","4","5"];
							var tbl_id_list = "DT_1OH0404,DT_1OH0419";
							colors = ["#7cb6ec","#434348","#90ed7d","#f7a25c","#8085e9"]
						}
						if(tp == "07"){
							var groupKey = "OV_L2_ID";
							var columnNames = ["부부","부부&미혼녀","한부모&미혼자녀","3세대이상"];
							var columns = ["11","21","22","30"];
							var tbl_id_list = "DT_1OH0420,DT_1OH0405";
							colors = ["#7cb6ec","#434348","#90ed7d","#f7a25c"]
						}
						if(tp == "02"){
							var groupKey = "OV_L2_ID";
							var columnNames = ["남자","여자"];
							var columns = ["1","2"];
							var tbl_id_list = "DT_1OH0504";
							colors = ["#23b7d1","#ff5253"]
						}
//						{
//							00:
//								DT_1NW1001: 1183750
//								DT_1NW2034: 938080
//								DT_1NW3034: 243083
//								admCd: "00"
//								category: "전국"
//								total: 2364913
//						    }
//						}
						let datas = {};
						let total = 0;
						if( tp != "02"){
							chartData.forEach(item=>{
								datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
								datas[item.OV_L1_ID][item[groupKey]] = parseFloat(item.dt);
								datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
								datas[item.OV_L1_ID].dtval_co = item["DTVAL_CO"]
								datas[item.OV_L1_ID].total+= datas[item.OV_L1_ID]["dtval_co"]
								datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
								datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
								if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
									total+=datas[item.OV_L1_ID][item[groupKey]];
								}
							});
							datas = Object.keys(datas).filter(key=>key!="00"&&key!="000").map(key=>datas[key]).sort(function (a, b) {
								return (b.total/b.dtval_co)-(a.total/a.dtval_co);
							});
						}else{
							data.forEach(item=>{
								if(item != 'error: char_itm_id_list 값은 필수 입니다.' && item.OV_L1_ID!="00" && item.OV_L2_ID!="0"){
									datas[item.OV_L1_ID] = datas[item.OV_L1_ID]||{};
									datas[item.OV_L1_ID][item["OV_L2_ID"]] = parseFloat(item.DTVAL_CO);
									datas[item.OV_L1_ID].total = datas[item.OV_L1_ID].total||0;
									datas[item.OV_L1_ID].total+=datas[item.OV_L1_ID][item["OV_L2_ID"]];
									datas[item.OV_L1_ID].category = $administStatsMap.utils.abbreviationToAddress(item.OV_L1_KOR);
									datas[item.OV_L1_ID].admCd = item.OV_L1_ID;
									if(item.OV_L1_ID!="00"&&item.OV_L1_ID!="000"){
										total+=datas[item.OV_L1_ID][item["OV_L2_ID"]];
									}
								}
							});
							datas = Object.keys(datas).filter(key=>key!="00"&&key!="000").map(key=>datas[key]).sort(function (a, b) {
								return b.total-a.total;
							});
						}
						
						let totDatas = [];
						
						if(tp == "05" || tp == "06" || tp == "07") {
							
							let innerParam = {
									tbl_id_list : "DT_1OH0402",
									surv_year_list : $administStatsMap.ui.year,
									org_id_list : "101",							
									list_var_ord_list : "",
									char_itm_id_list : "T001,T002",
									prt_type : "",
									adm_cd : "",
									ov_l1_list : $administStatsMap.consts.sidoAll,
									ov_l2_list : "",
									ov_l3_list : "",
									ov_l4_list: "",
									ov_l5_list: "",
									category : "",
									odr_col_list : "",
									odr_type : ""
								};
								
								$administStatsMap.utils.getTotsurvStatData(innerParam, function(data, param) {
									for (let i = 0; i < data.length; i++) {
										let s = data[i];
										for (let j = 0; j < data.length; j++) {
											let t =data[j];
											if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == "T002" && t.CHAR_ITM_ID == "T001") {
												s.DTVAL_CO_ORI = s.DTVAL_CO;
												var dt = s.DTVAL_CO / t.DTVAL_CO * 100;
												s.dt = dt
												s.itm_nm =  $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR);
												if(s.OV_L1_ID!= "00"){
													total+=s.dt;
													s.dt = s.dt.toFixed(1)
													s.dt2 = s.dt
													s.adm_cd = s.OV_L1_ID;
													s.region_nm = s.OV_L1_KOR;
													totDatas.push(s);
												}
											}
										}
									}
//									chartData = opt_fnCalc({data:data,OV_L2_ID:"",tp:"04"});
									totDatas = totDatas.sort(function (a, b) {
										return parseFloat(b.dt)-parseFloat(a.dt);
									})				
								});
								
								totDatas.forEach(function(item,index){
									for(let i = 0; i < datas.length; i++){
										if(item.OV_L1_ID.indexOf(datas[i].admCd)>-1){
											datas[i].rank = item.dt;
										}
									}
								});
								
								datas = datas.sort(function (a, b) {
									return b.rank-a.rank;
								});	
						}
						let unitSel;
						if(tp == "05" || tp == "06" || tp == "07") {
							unitSel = "%";
						}else{
							unitSel = "명";
						}
						const categories = datas.map(item=>item.category);
						const avg = total/datas.length;
						createStackBarChartForPer({
							unit:unitSel
							,target:"chart8"
//							,unit:unit2
							,data:datas
							,isSort:false
							,columns:columns
							,colors: colors
							,category:categories
							,viewTotalColumn:function(data){
								if(tp == "05" || tp == "06" || tp == "07") {
									let schData = totDatas.filter(item=>item.OV_L1_ID == data.admCd);	
									return schData[0].dt;
								}else if (tp == "02"){
									return $administStatsMap.utils.addComma(data.total);
								}else {
									let perData = ((data.dtval_co/data.total)*100).toFixed(1);
									return perData;
								}
								
						},avgLineData:avg,tooltipCallback:function(d,i){
							const dataIndex = $(this).parent("[data-type=eventGroup]").data("value");
							const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":categories[i]})
									),
									$("<p/>").append(
										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),unitSel
									),
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										$administStatsMap.ui.tooltipMap.mapTotalVal=datas[i][columns[dataIndex]];
//										data.filter(item=>item.OV_L1_ID=="00"&&item[groupKey]==columns[dataIndex]).forEach(item=>{
//											$administStatsMap.ui.tooltipMap.mapTotalVal+=parseFloat(item.DTVAL_CO.toFixed(1));
//										});
										
										let parameters = $.extend(true,{},_this.parameters);
										parameters.surv_year_list = year;
										if(tp == "05"){
											parameters.ov_l3_list = columns[dataIndex];
											parameters.ov_l2_list = "0";
										}else if(tp == "06"){
											parameters.ov_l3_list = ""
											parameters.ov_l2_list =columns[dataIndex];;
										}else if(tp == "07"){
											parameters.ov_l3_list = ""
											parameters.ov_l2_list =columns[dataIndex];;
										}
										parameters.ov_l1_list = $administStatsMap.consts.sidoAll;;
										parameters.tbl_id_list = tbl_id_list;
										
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										$administStatsMap.ui.tooltipMap.title = columnNames[dataIndex];
										let areaPer;
										if(tp == "02"){
											datas[i][columns[dataIndex]]
											let sum = 0; 
											datas.forEach(item => {
												sum+=item[columns[dataIndex]];
											});
											$administStatsMap.ui.tooltipMap.mapTotalVal = sum;
											$administStatsMap.ui.mapTotalVal = sum;
											let per = (datas[i][columns[dataIndex]]/sum*100).toFixed(1);
											areaPer = $("<p/>").append($("<span/>",{"text":"(전국대비 "+per+"%)"}));
										}else{
											$administStatsMap.ui.tooltipMap.mapTotalVal=totalAll;
											areaPer ="";
										}
										mapData =[]
										datas.forEach(item=>{
											mapData.push({
												"dt" : item[columns[dataIndex]],
												"adm_cd" : item.admCd,
												"region_nm" : item.category
											});
										});
										
										
										$administStatsMap.ui.map["tooltip-map"].setStatsData({
											adm_cd: "00",
											admCdKey:"adm_cd",
											showData : "dt",
											unit : unitSel,
											callback:function(data){
												$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
												$administStatsMap.ui.tooltipMap.show({
													tooltipCallback:function(){
														$("#tooltip-map-modal-title").empty().append(
															$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
															$("<h3/>").append(
																title
															),
															$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																$('#tooltip-map-container').hide();
																$('.dim').hide();
																return false;
															}).append($("<span/>",{"class":"btn-close btn-close--black"}))
														);
													},
													endCallback:function(){
														

														$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
															if(layer.feature.properties.adm_cd==datas[i].admCd){
																layer.fire("click");
																if($("#tooltip-map-tooltip").find("p:last").index() == 2){
																	$("#tooltip-map-tooltip").find("p:last").hide()
																}
															}
														})
														
														$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":columnNames[dataIndex]}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append(
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":$.heum.setThousandSeparator(datas[i][columns[dataIndex]])}),"명"
																	),
																	areaPer
																)
															);
													}
												});
												$("#tooltip-map-tooltip").show();
											}
										},mapData,parameters);
									})
								)
							);
							tooltip.show();
						}});
					}else{
						createVerticalBarChart({
							 target:"chart8"
							//,isSort:false
							,rotate:false
							,data:chartData
							,dataVal:"dt" 
	//						,columnVal:"OV_L1_KOR"
							//,color: chartData.length >0? ["#ff5252"].concat([...new Array(chartData.length-1)].map(item=>"#747474")) : ""
							,color:colors
							,columnVal:"itm_nm"
							,isShowYaxis:false
							,avgLineData:avg
							,unit:unit3
							,tooltipCallback:function(d,i){
								const tooltip = $(this).parents("[data-type=chart-container]").find("[data-type=tooltip]:last");
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":(tp== "03" || tp == "05" || tp == "06" || tp == "07" ? title3  : title2)}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
										),
										$("<p/>").append(
											preTxt,
											$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(tooltipDataKey===undefined?chartData[i].dt2:chartData[i][tooltipDataKey])}),tooltipDataUnit===undefined?unit2:tooltipDataUnit
										),
										
										//chart8지도보기
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											//$administStatsMap.ui.tooltipMap.mapTotalVal = chartData[i].dt;
											$administStatsMap.ui.tooltipMap.title= title3;
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "dt",
												unit : unit3,
												callback:function(data){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
	//												$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":$administStatsMap.ui.year+'년 '}),
	//															$("<h3/>").append(title,$("<span/>",{"text":" - "+chartData[i].itm_nm})),
																$("<h3/>").append(title2,$("<span/>",{})),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																})
																.append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].dataBoundary.eachLayer(function(layer){
																if(layer.feature.properties.adm_cd==chartData[i].adm_cd){
																	layer.fire("click");
																	if($("#tooltip-map-tooltip").find("p:last").index() == 2){
																		$("#tooltip-map-tooltip").find("p:last").hide()
																	}
																}
															});
															
	//														$administStatsMap.ui.map["tooltip-map"].bnd_year = $administStatsMap.ui.year+"년";
	//														$("#tooltip-map-tooltip").empty().append(
	//															$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
	//																$("<h3/>",{"class":"modal__tit","text":$administStatsMap.ui.year+"년 "+$administStatsMap.ui.tooltipMap.title}),
	//																$("<a/>",{"class":"btn__cancel"}).click(function(){
	//																	$('#tooltip-map-tooltip').hide(); 
	//																	return false;
	//																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
	//															),
	//															$("<div/>",{"class":"modal__body"}).append(
	//																$("<p/>").append(
	//																	$("<span/>",{"class":"color-blue","text":chartData[i].itm_nm})
	//																),
	//																$("<p/>").append(
	//																	$("<span/>",{"class":"color-red","data-id":"value","text":chartData[i].dt2}),unit2
	//																)
	//															)
	//														);
	//														$("#tooltip-map-tooltip").show();
														}
													});
												}
											},chartData,parameters);
										})
									)
								);
								/*if(tp != "01"){
									tooltip.show();
								}*/
								tooltip.show();
							}
						});
					}
				}
			)
		},chart9 : function(tp, jsonData){
			const _this = this;
			let parameters = $.extend(true,{},_this.parameters);
			
			if(tp=="02"){
				parameters.tbl_id_list = "DT_1OH0504";
				parameters.ov_l2_list = "0,1,2";
				parameters.ov_l3_list = "000";
			}
			let columns=[],groupKey,series;
			//admCd = $administStatsMap.consts.sidoAll;
			admCd = $administStatsMap.ui.admCd
			admCd = admCd.replace("up:","");
			series = [];
			var title,title2,unit,unit2 ="",tooltipDataKey,tooltipDataUnit;
			if(tp == "01"){
				//admCd = $administStatsMap.consts.sidoAll;
				title = "연도별 개인이 소유한 주택 수 "
				title2 = "개인이 소유한 주택 수"
				groupKey = "CHAR_ITM_ID";
				columns = ["T001","T002"];
				series=[{"name":"총주택",data:[]},{"name":"개인소유주택",data:[]}]
				unit2 ="호"
				unit = "(단위 : 호)";
			}else if(tp == "02"){
				title = "연도별 주택을 소유한 개인 수 ";
				title2 = "주택을 소유한 개인 수 "
				groupKey = "CHAR_ITM_ID";
				//columns = ["T001","T002"];
				columns = ["0","1","2"];
				series=[{"name":"총계",data:[]},{"name":"남자",data:[]},{"name":"여자",data:[]}]
				unit2 ="명"
				unit = "(단위 : 명)";
			}else if(tp == "03"){
				title = "연도별 주택을 소유한 가구 수";
				title2 = "주택을 소유한 가구 수"
				groupKey = "CHAR_ITM_ID";
				columns = ["T001","T002"];
				series=[{"name":"총가구",data:[]},{"name":"주택소유가구",data:[]}]
				unit2 ="가구"
				unit = "(단위 : 가구)";
			}else if(tp == "04"){
				title = "연도별 주택소유율(가구기준)";
				title2 = "주택소유율"
				unit = "(단위 : %, 가구)";
				unit2 ="%";
				tooltipDataKey="DTVAL_CO_ORI";
				tooltipDataUnit="가구";
			}else if(tp == "05"){
				title = "연도별 가구주 연령대별 주택소유율";
				title2 = "가구주 연령대별 주택소유율"
				unit = "(단위 : %, 가구)";
				unit2 =""
				groupKey = "OV_L3_ID";
				columns = ["100","200","300","400","500","600","700"];
				
				if(jsonData){
					parameter1 = jsonData.l3id
					parameter2 = jsonData.l3nm
				}

				parameters.ov_l2_list = "0";
				parameters.ov_l3_list = "100,200,300,400,500,600,700"
			}else if(tp == "06"){
				title = "연도별 가구원수별 주택소유율" 
				title2 = "가구원수별 주택소유율"
				unit = "(단위 : %, 가구)";
				unit2 = "%"
				groupKey = "OV_L2_ID";
				columns = ["1","2","3","4","5"];
				
				if(jsonData){
					parameter1 = jsonData.l2id
					parameter2 = jsonData.l2nm
				}
				parameters.ov_l2_list = "1,2,3,4,5";
			}else if(tp == "07"){
				title = "연도별 세대구성별  주택소유율" 
				title2 = "세대구성별  주택소유율"
				unit = "(단위 : %, 가구)";
				unit2 = "%"
				groupKey = "OV_L2_ID";
				columns = ["11","21","22","30"];
				
				parameters.ov_l2_list = "11,21,22,30";
			}
			
			$("#chart9-title").data("append-text",title).text(title);
			$("#chart9-legend").show();
			$("#chart9-title-unit").text(unit);
			$("#chart9-title-unit").hide();	
			parameters.surv_year_list = $administStatsMap.ui.yearList.join(",");
			parameters.char_itm_id_list =  "T001,T002";
			if(tp == "04"){
				var chartData = [];
				parameters.ov_l1_list = $administStatsMap.ui.admCd
				$administStatsMap.utils.getTotsurvStatData(
					parameters,
					function(data){
//						data = data.sort(function(a,b){
//							return a.PRD_DE-b.PRD_DE;
//						})
//						data.forEach(d=>{
//							d.DTVAL_CO = parseFloat(d.DTVAL_CO);
//							d.PRD_DE = d.PRD_DE+"년";
//						});
						
						for (let i = 0; i < data.length; i++) {
							let s = data[i];
							for (let j = 0; j < data.length; j++) {
								let t =data[j];
								if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID 
										&& s.CHAR_ITM_ID == "T002" && t.CHAR_ITM_ID == "T001") {
									s.DTVAL_CO_ORI = s.DTVAL_CO;
									var dt = s.DTVAL_CO / t.DTVAL_CO * 100;
									s.PRD_DE = s.PRD_DE+"년";
									s.DTVAL_CO = s.DTVAL_CO ;
									s.dt = dt.toFixed(1);
									chartData.push(s);
								}
							}
						}
						
						createLineChart({
							target:"chart9", 
							data:chartData, 
							color:"#e2658f", 
							dataVal:"dt",
							columnVal:"PRD_DE",
							unit:'%',
							dataLabelsFormater:function(){
								if(this.point.index==series[this.colorIndex].data.length-1){
										return $.heum.setThousandSeparator(this.y)+"%";
								}
							},
							tooltipCallback:function(d,i){
								
							const beforeDataObj = chartData[i-1];
//							const beforeDataObj = chartData[event.point.series.index].data[event.point.index-1];
							let ratio;
							if(beforeDataObj){
								const beforeData = beforeDataObj.dt;
								let ratColor;
								let rat = (d.dt - beforeData).toFixed(1);
								let ca;
								if(rat>0){
									ca = "증가↑";
									ratColor="blue";
								}else if(rat<0){
									ca = "감소↓";
									ratColor="red";
								}else{
									ca = "";
								}
								
								ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat)+"</span>%p "+ca+")";
//								ratio = "(전년 대비 <span class='color-red'>"+((((d.DTVAL_CO - beforeData) / beforeData) * 100).toFixed(1))+"</span>%)"
							}
							const tooltip = $("#chart9-container").find("[data-type=tooltip]");
							tooltip.empty();
							tooltip.append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":d.PRD_DE+" "+title2}),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$(this).parents('[data-type=tooltip]').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
									),
									$("<p/>").append(
//										$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(tooltipDataKey===undefined?d.dt:d[tooltipDataKey])}),tooltipDataUnit===undefined?'%':tooltipDataUnit
											$("<span/>",{"class":"color-red","text":$.heum.setThousandSeparator(d.dt)+'%'})
									),
									ratio,
									//chart4지도보기
									$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
										let parameters = $.extend(true,{},_this.parameters);
										parameters.tbl_id_list = chartData[i].TBL_ID;
//										parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
										parameters.ov_l1_list = "11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39"
										parameters.surv_year_list = parseInt(chartData[i].PRD_DE.replace("년",""));
										parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
										//지도변경시타이틀
										$administStatsMap.ui.tooltipMap.title= title2;
										$administStatsMap.utils.getTotsurvStatData(parameters, function(res, param) {
											

											let alldatas = [];
//											res.forEach((d,index)=>{
//												if(d.OV_L1_ID != "00"){
//													d.adm_cd = d.OV_L1_ID
//													d.region_nm = d.OV_L1_KOR;
//													alldatas .push(d);
//												}
//											});
//											
											for (let i = 0; i < res.length; i++) {
												let s = res[i];
												for (let j = 0; j < res.length; j++) {
													let t =res[j];
													if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID 
															&& s.CHAR_ITM_ID == "T002" && t.CHAR_ITM_ID == "T001") {
														s.DTVAL_CO_ORI = s.DTVAL_CO;
														var dt = s.DTVAL_CO / t.DTVAL_CO * 100;
														s.PRD_DE = s.PRD_DE;
														s.DTVAL_CO = dt.toFixed(1)
														s.adm_cd = s.OV_L1_ID
														s.region_nm = s.OV_L1_KOR;
														alldatas.push(s);
													}
												}
											}
//											alldatas = opt_fnCalc({data:data,OV_L2_ID:"",tp:"04"});
//											let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
											$administStatsMap.ui.map["tooltip-map"].setStatsData({
												adm_cd: "00",
												admCdKey:"adm_cd",
												showData : "DTVAL_CO",
												unit : unit2,
												callback:function(d){
													$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//													$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
													$administStatsMap.ui.tooltipMap.show({
														tooltipCallback:function(){
															$("#tooltip-map-modal-title").empty().append(
																$("<h3>",{"text":data[i].PRD_DE+"년"}),
																$("<h3/>").append(title),
																$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																	$('#tooltip-map-container').hide();
																	$('.dim').hide();
																	return false;
																}).append($("<span/>",{"class":"btn-close btn-close--black"}))
															);
														},
														endCallback:function(){
															$administStatsMap.ui.map["tooltip-map"].bnd_year = parseInt(chartData[i].PRD_DE.replace("년",""));
															$("#tooltip-map-tooltip").empty().append(
																$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																	$("<h3/>",{"class":"modal__tit","text":chartData[i].PRD_DE+" "+title2}),
																	$("<a/>",{"class":"btn__cancel"}).click(function(){
																		$('#tooltip-map-tooltip').hide(); 
																		return false;
																	}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																),
																$("<div/>",{"class":"modal__body"}).append(
																	$("<p/>").append( 
																		$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																	),
																	$("<p/>").append(
																		$("<span/>",{"class":"color-red","data-id":"value","text":chartData[i].dt}),unit2
																	)
																)
															);
															$("#tooltip-map-tooltip").show();
														}
													});
												}
											},alldatas,parameters);
										});
									})
								)
							).show();
						}});
					}
				);
			}else{
				$administStatsMap.utils.getTotsurvStatData(
					$.extend(true,{},parameters,{ov_l1_list:admCd}),function(data){
						let tables = [parameters.tbl_id_list,parameters.tbl_id_list,parameters.tbl_id_list,parameters.tbl_id_list,parameters.tbl_id_list];
						let categories = $.extend(true,[],$administStatsMap.ui.yearList).sort().map(year=>year+"년");
						let chartData = [];
						let datas= [];
						let total = 0;
						let unit2 = "호";
						var colors = ["#7cb6ec","#434348","#90ed7d","#f7a25c","#8085e9","#1b7ed5","#448074"];
						data.forEach(item=>{
							//전국 제외
							if(tp == "01"){
								
								const index = columns.indexOf(item[groupKey]);
								if(columns.indexOf(item[groupKey])>-1){
									series[index].data.push(parseFloat(item.DTVAL_CO));
								}
								unit2 = "호";
								colors = ["#333","#1b7ed5"]
							}else if(tp == "02"){
								item.DTVAL_CO = item.DTVAL_CO * 1;
								if(item.TBL_ID == "DT_1IN1502" && item.CHAR_ITM_ID == "T130" ){
									series[0].data.push(parseFloat(item.DTVAL_CO));
								}else if (item.TBL_ID == "DT_1OH0504" && item.OV_L3_ID == "000"){
//									item.char_itm_id = "T131"
									if(item.OV_L2_ID == "0"){
										series[0].data.push(parseFloat(item.DTVAL_CO));
									}else if(item.OV_L2_ID == "1"){
										series[1].data.push(parseFloat(item.DTVAL_CO));
									}else if(item.OV_L2_ID == "2"){
										series[2].data.push(parseFloat(item.DTVAL_CO));
									}
								}
								unit2 = "명";
								colors = ["#333","#23b7d1", "#ff5253"]
							}else if(tp == "03"){
								colors = ["#333","#1b7ed5"]
								const index = columns.indexOf(item[groupKey]);
								if(columns.indexOf(item[groupKey])>-1){
									series[index].data.push(parseFloat(item.DTVAL_CO));
								}
								unit2 = "가구";
							}
						});
						
						if(tp =="05"){
							for (let i = 0; i < data.length; i++) {
								let s = data[i];
								s.DTVAL_CO = s.DTVAL_CO * 1;
								for (let j = 0; j < data.length; j++) {
									let t = data[j];
									t.DTVAL_CO = t.DTVAL_CO * 1;
									if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
										if (s.TBL_ID == t.TBL_ID && s.OV_L3_ID == "500") {
//											s.OV_L3_KOR = "60세이상";
											if (t.OV_L3_ID >= 600) {
												s.DTVAL_CO += t.DTVAL_CO;
											}
										}
									}
								}
							}
							for (let i = 0; i < data.length; i++) {
								let s = data[i];
								for (let j = 0; j < data.length; j++) {
									let t = data[j];
									if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
//										if (s.OV_L3_ID <= 500) {
											if (s.TBL_ID == "DT_1OH0403" && t.TBL_ID == "DT_1OH0418" && s.OV_L3_ID == t.OV_L3_ID) {
												s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
												datas.push(s);
											}
//										}
									}
								}
							}
							
//							datas = opt_fnCalc({data:data,OV_L2_ID:"",tp:"05"});
							
							datas.forEach(item=>{
								const index = columns.indexOf(item[groupKey]);
								if(columns.indexOf(item[groupKey])>-1){
									if(!series[index] && item.OV_L3_ID<=500){
										if(item.OV_L3_KOR == "60~69세"){
											series[index] = {data:[],name:"60세이상"}
										}else{
											series[index] = {data:[],name:item.OV_L3_KOR}
										}
									}
									const value = item.DTVAL_CO;
									if(item.OV_L3_ID<=500){
										series[index].data.push(parseFloat(value.toFixed(1)));
									}
								}
							})
							unit2 = "%";
						}
						
						if(tp =="06"){
							for (let i = 0; i < data.length; i++) {
								let s = data[i];
								s.DTVAL_CO = s.DTVAL_CO * 1;
								for (let j = 0; j < data.length; j++) {
									let t = data[j];
									t.DTVAL_CO = t.DTVAL_CO * 1;
									if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
										if (s.TBL_ID == "DT_1OH0404" && t.TBL_ID == "DT_1OH0419" && s.OV_L2_ID == t.OV_L2_ID) {
											s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
											datas.push(s);
										}
									}
								}
							}
//							datas = opt_fnCalc({data:data,OV_L2_ID:"",tp:"06"});
							
							datas.forEach(item=>{
								const index = columns.indexOf(item[groupKey]);
								if(columns.indexOf(item[groupKey])>-1){
									if(!series[index]){
										series[index] = {data:[],name:item.OV_L2_KOR}
									}
									const value = item.DTVAL_CO;
									series[index].data.push(parseFloat(value.toFixed(1)));
								}
							})

							unit2 = "%";
						}
						
						if(tp =="07"){
							for (let i = 0; i < data.length; i++) {
								let s = data[i];
								s.DTVAL_CO = s.DTVAL_CO * 1;
								for (let j = 0; j < data.length; j++) {
									let t = data[j];
									t.DTVAL_CO = t.DTVAL_CO * 1;
									if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
										if (s.TBL_ID == "DT_1OH0405" && t.TBL_ID == "DT_1OH0420" && s.OV_L2_ID == t.OV_L2_ID) {
											s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
											datas.push(s);
										}
									}
								}
							}
							
//							datas = opt_fnCalc({data:data,OV_L2_ID:"",tp:"07"});
							datas.forEach(item=>{
								const index = columns.indexOf(item[groupKey]);
								if(columns.indexOf(item[groupKey])>-1){
									if(!series[index]){
										series[index] = {data:[],name:item.OV_L2_KOR}
									}
									const value = item.DTVAL_CO;
									series[index].data.push(parseFloat(value.toFixed(1)));
								}
							})

							unit2 = "%";
						}
						
						
						createMultiLineChart({
							target:"chart9", 
							categories,
							colors,
							isSort:false,
							series,
							unit:unit2,
							dataLabelsFormater:function(){
//								if(this.point.index==series[this.colorIndex].data.length-1){
									if(tp=="05" || tp=="06"|| tp=="07"){
										if(this.point.index==series[this.colorIndex].data.length-1){
											return $.heum.setThousandSeparator(this.y)+"%";
										}
									}else{
										if(tp=="01" || tp=="02" || tp=="03"){
											if(this.point.index==series[this.colorIndex].data.length-1){
												return $.heum.setThousandSeparator(this.y)+unit2;
											}
										}
									}
//								}
								
							},
							tooltipCallback:function({name,data,event}){
								//chart9:툴팁
								const beforeData = series[event.point.series.index].data[event.point.index-1];
								let ratio;
								if(beforeData){
									let rat =  "" ;
									if(tp == "01" || tp == "02" || tp == "03"){
										rat  = (((data - beforeData) / beforeData) * 100).toFixed(1);	
									}else{
										rat  = (data - beforeData).toFixed(1);
									}
									
									let ca;
									let ratColor;
									if(rat>0){
										ca = "증가↑";
										ratColor="blue";
									}else if(rat<0){
										ca = "감소↓";
										ratColor="red";
									}else{
										ca = "";
									}
									if(tp=="05" || tp=="06"|| tp=="07"){
										ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat)+"</span>%p "+ca+")";
									}else{
										if(tp=="01" || tp=="02" || tp=="03"){
											ratio = "(전년 대비 <span class='color-"+ratColor+"'>"+Math.abs(rat)+"</span>% "+ca+")";
										}
									}
									
								}
								const tooltip = $("#chart9-container").find("[data-type=tooltip]:last");
								let text = "";
								if(tp == "01" ||tp == "02" ||tp == "03" ){
									text = $.heum.setThousandSeparator(data);
								}else{
									text = $.heum.setThousandSeparator(data.toFixed(1));
								}
								tooltip.empty();
								tooltip.append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
//										$("<h3/>",{"class":"modal__tit","text":name+" "+series[event.point.colorIndex].name+" 증감율"}),
											$("<h3/>",{"class":"modal__tit","text":name+" " + series[event.point.series.index].name}),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$(this).parents('[data-type=tooltip]').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.selectedAdmNm})
										),
										
										$("<p/>").append(
											$("<span/>",{"class":"color-red","text": text }),unit2
										),
										ratio,
										$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
											let parameters = $.extend(true,{},_this.parameters);
											let title_year = name.replace("년","");
											parameters.tbl_id_list = tables[event.point.series.index];
//											parameters.surv_year_list = parseInt(categories[event.point.colorIndex].replace("년",""));
											parameters.surv_year_list = title_year;
//											if(_this.tabIndex==0){
//												parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
//											}else{
//												parameters.ov_l1_list = $administStatsMap.consts.sidoAll3;
//											} 
//											parameters.ov_l1_list = $administStatsMap.consts.sidoAll;
											parameters.ov_l1_list= "11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
											if(tp == "01" || tp == "03"){
												if(tp == "01"){
													parameters.tbl_id_list = "DT_1OH0501";
												}else{
													parameters.tbl_id_list = "DT_1OH0402";
												}
												
												//총주택
												if(event.point.colorIndex == 0 ){
													parameters.char_itm_id_list = "T001"
												}else{
													parameters.char_itm_id_list = "T002"
												}
											}
											
											if(tp == "02"){
												parameters.tbl_id_list = "DT_1OH0504";
												parameters.char_itm_id_list = "T001";
												parameters.ov_l2_list = "DT_1OH0504";
												parameters.ov_l3_list = "000";
												parameters.ov_l1_list= "11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
												if(event.point.colorIndex == 0 ){
													parameters.ov_l2_list = "0";
												}else if(event.point.colorIndex == 1){
													parameters.ov_l2_list = "1";
												}else{
													parameters.ov_l2_list = "2";
												}
											}
											
											if(tp == "05"){
												parameters.ov_l1_list= "11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
												parameters.ov_l2_list= "0";
												parameters.tbl_id_list = "DT_1OH0403,DT_1OH0418"
												if(event.point.colorIndex == 0){
													parameters.ov_l3_list= "100";
												}else if(event.point.colorIndex == 1){
													parameters.ov_l3_list= "200";
												}else if(event.point.colorIndex == 2){
													parameters.ov_l3_list= "300";
												}else if(event.point.colorIndex == 3){
													parameters.ov_l3_list= "400";
												}else if(event.point.colorIndex == 4){
													parameters.ov_l3_list= "500,600,700";
												}					
											}
											
											if(tp == "06"){
												parameters.ov_l1_list= "11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
												parameters.tbl_id_list = "DT_1OH0404,DT_1OH0419"
												if(event.point.colorIndex == 0){
													parameters.ov_l2_list= "1";
												}else if(event.point.colorIndex == 1){
													parameters.ov_l2_list= "2";
												}else if(event.point.colorIndex == 2){
													parameters.ov_l2_list= "3";
												}else if(event.point.colorIndex == 3){
													parameters.ov_l2_list= "4";
												}else if(event.point.colorIndex == 4){
													parameters.ov_l2_list= "5";
												}	
											}
											
											if(tp == "07"){ 
												parameters.ov_l1_list=  "11,21,22,23,24,25,26,29,31,32,33,34,35,36,37,38,39";
												parameters.tbl_id_list = "DT_1OH0405,DT_1OH0420"
												if(event.point.colorIndex == 0){
													parameters.ov_l2_list= "11";
												}else if(event.point.colorIndex == 1){
													parameters.ov_l2_list= "21";
												}else if(event.point.colorIndex == 2){
													parameters.ov_l2_list= "22";
												}else if(event.point.colorIndex == 3){
													parameters.ov_l2_list= "30";
												}	
											}
											
											parameters.regn_dataKey = $administStatsMap.ui.themeData.newly.mapData.getDataParameters().regn_dataKey;
											if(tp == "07" || tp == "06"|| tp == "05"){
												$administStatsMap.ui.tooltipMap.mapTotalVal = null;
												$administStatsMap.ui.mapTotalVal = null;
											}else{
												$administStatsMap.ui.tooltipMap.mapTotalVal = data;
												$administStatsMap.ui.mapTotalVal = data;
											}
											$administStatsMap.ui.tooltipMap.title="";
											$administStatsMap.utils.getTotsurvStatData(
												parameters, function(res, param) {
												let alldatas = [];
												if(tp == "02"){
													res.forEach((d,index)=>{
														d.DTVAL_CO = d.DTVAL_CO * 1;
														d.dt = d.DTVAL_CO * 1;
														d.adm_cd = d.OV_L1_ID
														d.region_nm = d.OV_L1_KOR;
														if(event.point.colorIndex == 0 &&d.TBL_ID == "DT_1IN1502" && d.CHAR_ITM_ID == "T130" ){
															alldatas .push(d);
														}
														/*
														else if (event.point.colorIndex == 1 && d.TBL_ID == "DT_1OH0504" && d.OV_L2_ID == "0" && d.OV_L3_ID == "000"){
															alldatas .push(d);
														}
														*/
														else if(d.TBL_ID == "DT_1OH0504" ){
															alldatas .push(d);
														}
													});
												}else if(tp == "05"){
													alldatas = opt_fnCalc({data:res,OV_L2_ID:"",tp:"05"});
													
													let all500;
													let all600;
													let all700;
													
													let all5002;
													let all6002;
													let all7002;
													
													if(param.ov_l3_list == "500,600,700"){
														all500 = alldatas.filter(x=>x.OV_L3_ID == "500");
														all600 = alldatas.filter(x=>x.OV_L3_ID == "600");
														all700 = alldatas.filter(x=>x.OV_L3_ID == "700");
														
														all5002 = res.filter(x=>x.OV_L3_ID == "500" && x.CHAR_ITM_NM =="소유자수");
														all6002 = res.filter(x=>x.OV_L3_ID == "600" && x.CHAR_ITM_NM =="소유자수");
														all7002 = res.filter(x=>x.OV_L3_ID == "700" && x.CHAR_ITM_NM =="소유자수");
														
														all500.forEach(function(item,index) {
															let sumData = item.DTVAL_CO_ORI + all600[index].DTVAL_CO_ORI + all700[index].DTVAL_CO_ORI;
															let sumData2 = all6002[index].DTVAL_CO + all7002[index].DTVAL_CO + all5002[index].DTVAL_CO;
															//item.dt = ( sumData / (sumData + sumData2) *100 ).toFixed(1);
															item.DTVAL_CO = ( sumData / (sumData + sumData2) *100 ).toFixed(1);
														});
														
														alldatas = all500;
													}
												}else if(tp == "06"){
													alldatas = opt_fnCalc({data:res,OV_L2_ID:"",tp:"06"});
												}else if(tp == "07"){
													alldatas = opt_fnCalc({data:res,OV_L2_ID:"",tp:"07"});
												}else{
													res.forEach((d,index)=>{
														if(d.OV_L1_ID != "00"){
															d.adm_cd = d.OV_L1_ID
															d.region_nm = d.OV_L1_KOR;
//															d.dt = d.DTVAL_CO
															alldatas .push(d);
														}
													});
												}
												
												let text = ""
												if(tp == "01" || tp == "02" || tp == "03" ){
													text = $.heum.setThousandSeparator(data)
												}else{
													text = 	$.heum.setThousandSeparator(data.toFixed(1))	
												}
												if(tp == "01" || tp == "03") {
													$administStatsMap.ui.tooltipMap.mapTotalVal = data;
													let resultMapData = $administStatsMap.utils.convertMapData({res,parameters});
													$administStatsMap.ui.map["tooltip-map"].setStatsData({
														adm_cd: "00",
														admCdKey:"adm_cd",
														showData : "dt",
														unit :unit2,
														callback:function(d){
															$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//															$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
															$administStatsMap.ui.tooltipMap.show({
																tooltipCallback:function(){
																	$administStatsMap.ui.tooltipMap.title = series[event.point.series.index].name;
																	$("#tooltip-map-modal-title").empty().append(
																			//chart9 지도보기
																		$("<h3>",{"text":name }),
																		$("<h3/>").append(
																			$("<h3/>",{"text":title2+"_"+series[event.point.series.index].name})
																		),
																		$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-container').hide();
																			$('.dim').hide();
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	);
																	$("#tooltip-map-tooltip").empty().append(
																			$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																				$("<h3/>",{"class":"modal__tit","text":series[event.point.series.index].name}),
																				$("<a/>",{"class":"btn__cancel"}).click(function(){
																					$('#tooltip-map-tooltip').hide(); 
																					return false;
																				}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																			),
																			$("<div/>",{"class":"modal__body"}).append(
																				$("<p/>").append(
																					$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																				),
																				$("<p/>").append(
																					$("<span/>",{"class":"color-red","data-id":"value","text": text}),unit2
																				)
																			)
																		);
																	},
																	endCallback:function(){
																		$administStatsMap.ui.map["tooltip-map"].bnd_year = name.replace("년","")
																		$("#tooltip-map-tooltip").show();
																	}
															});
														}
													},resultMapData.result.mapData,parameters);
													
												} else {
													
													$administStatsMap.ui.map["tooltip-map"].setStatsData({
														adm_cd: "00",
														admCdKey:"adm_cd",
														showData : "DTVAL_CO",
														unit :unit2,
														callback:function(d){
															$administStatsMap.ui.map["tooltip-map"].gMap.fitBounds($administStatsMap.ui.map["tooltip-map"].dataBoundary);
//															$administStatsMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
															$administStatsMap.ui.tooltipMap.show({
																tooltipCallback:function(){
																	$administStatsMap.ui.tooltipMap.title = series[event.point.series.index].name;
																	$("#tooltip-map-modal-title").empty().append(
																			//chart9 지도보기
																		$("<h3>",{"text":name }),
																		$("<h3/>").append(
																			$("<h3/>",{"text":title2+"_"+series[event.point.series.index].name})
																		),
																		$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
																			$('#tooltip-map-container').hide();
																			$('.dim').hide();
																			return false;
																		}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																	);
																	$("#tooltip-map-tooltip").empty().append(
																			$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
																				$("<h3/>",{"class":"modal__tit","text":series[event.point.series.index].name}),
																				$("<a/>",{"class":"btn__cancel"}).click(function(){
																					$('#tooltip-map-tooltip').hide(); 
																					return false;
																				}).append($("<span/>",{"class":"btn-close btn-close--black"}))
																			),
																			$("<div/>",{"class":"modal__body"}).append(
																				$("<p/>").append(
																					$("<span/>",{"class":"color-blue","text":$administStatsMap.ui.tooltipMap.selectedAdmNm})
																				),
																				$("<p/>").append(
																					$("<span/>",{"class":"color-red","data-id":"value","text": text}),unit2
																				)
																			)
																		);
																	},
																	endCallback:function(){
																		$administStatsMap.ui.map["tooltip-map"].bnd_year = name.replace("년","")
																		$("#tooltip-map-tooltip").show();
																	}
															});
														}
													},alldatas,parameters);
													
												}
												
												
											});
										})
									)
								);
								tooltip.show();
							}
						});
					}
				)
			}
		}
	}
}

const opt_fnCalc = ({data,OV_L2_ID,tp})=>{
	
	let datas = [];
	let total = 0;
	if(tp == "04"){

//		datas = {"data":[],"total":0};
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			for (let j = 0; j < data.length; j++) {
				let t =data[j];
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID && s.CHAR_ITM_ID == "T002" && t.CHAR_ITM_ID == "T001") {
					s.DTVAL_CO_ORI = s.DTVAL_CO;
					var dt = (s.DTVAL_CO / t.DTVAL_CO * 100).toFixed(1);
					s.PRD_DE 	= s.PRD_DE;
					s.DTVAL_CO 	= dt;
					s.dt 		= dt;
					s.itm_nm 	= s.OV_L1_KOR;
					s.adm_cd 	= s.OV_L1_ID
					s.region_nm = s.OV_L1_KOR;
					datas.push(s);
				}
			}
		}
	}
	if(tp == "05"){
//		datas = {"data":[],"total":0};
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.TBL_ID == t.TBL_ID && s.OV_L3_ID == "500") {
//						s.itm_nm = "60세이상";
						if (t.OV_L3_ID >= 600) {
							s.dt += t.DTVAL_CO;
						}
					}
				}
			}
		}
		
		for (let i = 0; i < data.length; i++) {
			let s = JSON.parse(JSON.stringify(data[i]));
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = JSON.parse(JSON.stringify(data[j]));
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.TBL_ID == "DT_1OH0403" && t.TBL_ID == "DT_1OH0418" && s.OV_L3_ID == t.OV_L3_ID) {
						s.DTVAL_CO_ORI = s.DTVAL_CO;
						s.DTVAL_CO 	= (s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100).toFixed(1);
						s.dt 	= s.DTVAL_CO
//						s.itm_nm 	= s.OV_L3_KOR;
						s.itm_nm 	= $administStatsMap.utils.abbreviationToAddress(s.OV_L3_KOR);
						s.adm_cd = s.OV_L1_ID
						s.region_nm = s.OV_L1_KOR;
						datas.push(s);
					}
				} 
			}
		}
	}
	
	if(tp == "06"){
//		datas = {"data":[],"total":0};
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j]; 
				t.DTVAL_CO = t.DTVAL_CO * 1;

				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.TBL_ID == "DT_1OH0404" && t.TBL_ID == "DT_1OH0419" && s.OV_L2_ID == t.OV_L2_ID) {
						total+=s.DTVAL_CO
						s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
						s.itm_nm  = $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR);
						s.dt = s.DTVAL_CO.toFixed(1);
						s.DTVAL_CO = s.DTVAL_CO.toFixed(1);
						s.adm_cd = s.OV_L1_ID;
						s.region_nm = s.OV_L1_KOR;
						datas.push(s);
					}
				}
			}
		}		
		
	}
	
	if(tp == "07"){
//		datas = {"data":[],"total":0};
		for (let i = 0; i < data.length; i++) {
			let s = data[i];
			s.DTVAL_CO = s.DTVAL_CO * 1;
			for (let j = 0; j < data.length; j++) {
				let t = data[j];
				t.DTVAL_CO = t.DTVAL_CO * 1;
				if (s.PRD_DE == t.PRD_DE && s.OV_L1_ID == t.OV_L1_ID) {
					if (s.TBL_ID == "DT_1OH0405" && t.TBL_ID == "DT_1OH0420" && s.OV_L2_ID == t.OV_L2_ID) {
						s.DTVAL_CO = s.DTVAL_CO / (s.DTVAL_CO + t.DTVAL_CO) * 100;
						s.itm_nm  = $administStatsMap.utils.abbreviationToAddress(s.OV_L1_KOR);
						s.dt = s.DTVAL_CO.toFixed(1);
						s.DTVAL_CO = s.DTVAL_CO.toFixed(1);
						s.adm_cd = s.OV_L1_ID;
						s.region_nm = s.OV_L1_KOR;
						datas.push(s);
					}
				}
			}
		}		
		
	}
	return datas;
}

