//let chartDatas = null;
/*let getTotAreaPopulation = {
	"id":"116101", "result": { 
		"areaData":[
			 {"dt":"13511676","rank":1,"irdsrate":"1.584674721259","itm_nm":"총인구 (명)","region_cd":"31","parent":"00","itm_cd":"T100","region_nm":"경기도"}
			,{"dt":"9586195","rank":2,"irdsrate":"-0.553408092771","itm_nm":"총인구 (명)","region_cd":"11","parent":"00","itm_cd":"T100","region_nm":"서울특별시"}
			,{"dt":"3349016","rank":3,"irdsrate":"-0.701991169072","itm_nm":"총인구 (명)","region_cd":"21","parent":"00","itm_cd":"T100","region_nm":"부산광역시"}
			,{"dt":"3333056","rank":4,"irdsrate":"-0.422829886033","itm_nm":"총인구 (명)","region_cd":"38","parent":"00","itm_cd":"T100","region_nm":"경상남도"}
			,{"dt":"2945454","rank":5,"irdsrate":"-0.229757976748","itm_nm":"총인구 (명)","region_cd":"23","parent":"00","itm_cd":"T100","region_nm":"인천광역시"}
			,{"dt":"2644757","rank":6,"irdsrate":"-0.876898409912","itm_nm":"총인구 (명)","region_cd":"37","parent":"00","itm_cd":"T100","region_nm":"경상북도"}
			,{"dt":"2410700","rank":7,"irdsrate":"-0.791789097673","itm_nm":"총인구 (명)","region_cd":"22","parent":"00","itm_cd":"T100","region_nm":"대구광역시"}
			,{"dt":"2176636","rank":8,"irdsrate":"-0.548877412504","itm_nm":"총인구 (명)","region_cd":"34","parent":"00","itm_cd":"T100","region_nm":"충청남도"}
			,{"dt":"1802766","rank":9,"irdsrate":"-0.257659662403","itm_nm":"총인구 (명)","region_cd":"35","parent":"00","itm_cd":"T100","region_nm":"전라북도"}
			,{"dt":"1788807","rank":10,"irdsrate":"0.070711585679","itm_nm":"총인구 (명)","region_cd":"36","parent":"00","itm_cd":"T100","region_nm":"전라남도"}
			,{"dt":"1632088","rank":11,"irdsrate":"0.168472813889","itm_nm":"총인구 (명)","region_cd":"33","parent":"00","itm_cd":"T100","region_nm":"충청북도"}
			,{"dt":"1521763","rank":12,"irdsrate":"0.107622586797","itm_nm":"총인구 (명)","region_cd":"32","parent":"00","itm_cd":"T100","region_nm":"강원도"}
			,{"dt":"1488435","rank":13,"irdsrate":"-0.694137262241","itm_nm":"총인구 (명)","region_cd":"25","parent":"00","itm_cd":"T100","region_nm":"대전광역시"}
			,{"dt":"1477573","rank":14,"irdsrate":"-0.81605391581","itm_nm":"총인구 (명)","region_cd":"24","parent":"00","itm_cd":"T100","region_nm":"광주광역시"}
			,{"dt":"1135423","rank":15,"irdsrate":"-0.723009341676","itm_nm":"총인구 (명)","region_cd":"26","parent":"00","itm_cd":"T100","region_nm":"울산광역시"}
			,{"dt":"670858","rank":16,"irdsrate":"0.873621152157","itm_nm":"총인구 (명)","region_cd":"39","parent":"00","itm_cd":"T100","region_nm":"제주특별자치도"}
			,{"dt":"353933","rank":17,"irdsrate":"4.671788866018","itm_nm":"총인구 (명)","region_cd":"29","parent":"00","itm_cd":"T100","region_nm":"세종특별자치시"}
			,{"dt":"0","region_cd":"00"}
		],
		"maxRank":[
			 {"cnt":17}
			,{"cnt":229}
			,{"cnt":32}
		]
	},
	"errMsg":"Success","errCd":0,"trId":"mGHz_116101_1663833398074"
};
let getTotPopulation = { 
	"id":"116100", "result":{
		"foreignData":[
			 {"dt":"942619","rank":1,"irdsrate":"-7.35","surv_id":"PH0001","itm_nm":"외국인-남자 (명)","region_cd":"00","itm_cd":"T141","region_nm":"전국"}
			,{"dt":"753024","rank":1,"irdsrate":"-1.11","surv_id":"PH0001","itm_nm":"외국인-여자 (명)","region_cd":"00","itm_cd":"T142","region_nm":"전국"}
		]
		,"moveHomeData":[
			 {"dt":"40863082","rank":1,"irdsrate":"-1.344165245669","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"현재 살고 있는 집","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"4474772","rank":1,"irdsrate":"9.347126516551","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"같은 시군구 내 다른 집","region_cd":"00","itm_cd":"T20","region_nm":"전국"}
			,{"dt":"1858372","rank":1,"irdsrate":"10.158452968852","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"다른 시군구-같은 시도","region_cd":"00","itm_cd":"T31","region_nm":"전국"}
			,{"dt":"2095747","rank":1,"irdsrate":"5.711213147301","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"다른 시군구-다른 시도","region_cd":"00","itm_cd":"T32","region_nm":"전국"}
			,{"dt":"397471","rank":1,"irdsrate":"20.799737412357","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"기타","region_cd":"00","itm_cd":"T40","region_nm":"전국"}
		],"multiculData":[
			 {"dt":"68086","rank":1,"c1_nm":"내국인(귀화)","c1":"10","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"85068","rank":1,"c1_nm":"내국인(출생)+내국인(귀화)","c1":"11","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"131834","rank":1,"c1_nm":"내국인(출생)+외국인(결혼이민자)","c1":"12","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"38347","rank":1,"c1_nm":"내국인(출생)+다문화자녀","c1":"13","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"20076","rank":1,"c1_nm":"내국인(귀화)+외국인(결혼이민자)","c1":"14","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"24364","rank":1,"c1_nm":"기타","c1":"15","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
		],"foreignRt":[
			{"dt":"1695643","rank":1,"irdsrate":"-4.68","surv_id":"PH0001","itm_nm":"외국인-계 (명)","region_cd":"00","itm_cd":"T140","region_nm":"전국"}
		],"genderData":[
			{"dt":"100","rank":1,"irdsrate":"-0.497512437811","itm_nm":"총인구_성비","region_cd":"00","surv_year":"2020","itm_cd":"T03","region_nm":"전국"}
		],"populationForTimeData":[
			 {"dt":"19020030","rank":1,"irdsrate":"0","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1925","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"20438108","rank":1,"irdsrate":"7.455708534634","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1930","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"23547465","rank":1,"irdsrate":"6.030965635875","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1940","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"25120174","rank":1,"irdsrate":"6.67888878909","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1944","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"20166756","rank":1,"irdsrate":"-19.718884112825","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1949","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"21502386","rank":1,"irdsrate":"6.622929339751","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1955","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"24989241","rank":1,"irdsrate":"16.216130619179","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1960","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"29159640","rank":1,"irdsrate":"16.688778182579","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1966","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"31435252","rank":1,"irdsrate":"7.80397837559","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1970","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"34678972","rank":1,"irdsrate":"10.31873388513","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1975","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"37406815","rank":1,"irdsrate":"7.865985762208","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1980","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"40419652","rank":1,"irdsrate":"8.054246265019","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1985","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"43390374","rank":1,"irdsrate":"7.349697122578","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1990","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"44553710","rank":1,"irdsrate":"2.681092354724","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1995","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"45985289","rank":1,"irdsrate":"3.213153292958","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"2000","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"47041434","rank":1,"irdsrate":"2.296701886553","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"2005","itm_cd":"T10","region_nm":"전국"}
			,{"dt":"47990761","rank":1,"irdsrate":"2.018065605738","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"2010","itm_cd":"T10","region_nm":"전국"}
		],"localData":[
			 {"dt":"24972588","rank":1,"irdsrate":"0.15","surv_id":"PH0001","itm_nm":"내국인-남자 (명)","region_cd":"00","itm_cd":"T131","region_nm":"전국"}
			,{"dt":"25160905","rank":1,"irdsrate":"0.38","surv_id":"PH0001","itm_nm":"내국인-여자 (명)","region_cd":"00","itm_cd":"T132","region_nm":"전국"}
		],"totalData":[
			 {"dt":"51829136","rank":1,"irdsrate":"0.1","surv_id":"PH0001","itm_nm":"총인구 (명)","region_cd":"00","itm_cd":"T100","region_nm":"전국"}
			],"ageData":[{"dt":"1722","origin_dt":"1722081","rank":1,"irdsrate":"-96.67","c1_nm":"0~4세","c1":"005","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2265","origin_dt":"2264595","rank":1,"irdsrate":"-95.63","c1_nm":"5~9세","c1":"010","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2267","origin_dt":"2267481","rank":1,"irdsrate":"-95.62","c1_nm":"10~14세","c1":"015","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2450","origin_dt":"2449561","rank":1,"irdsrate":"-95.27","c1_nm":"15~19세","c1":"020","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3365","origin_dt":"3364804","rank":1,"irdsrate":"-93.5","c1_nm":"20~24세","c1":"025","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3666","origin_dt":"3666212","rank":1,"irdsrate":"-92.92","c1_nm":"25~29세","c1":"030","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3301","origin_dt":"3301331","rank":1,"irdsrate":"-93.62","c1_nm":"30~34세","c1":"035","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3805","origin_dt":"3805470","rank":1,"irdsrate":"-92.65","c1_nm":"35~39세","c1":"040","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3907","origin_dt":"3906665","rank":1,"irdsrate":"-92.46","c1_nm":"40~44세","c1":"045","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"4326","origin_dt":"4325697","rank":1,"irdsrate":"-91.65","c1_nm":"45~49세","c1":"050","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"4372","origin_dt":"4372054","rank":1,"irdsrate":"-91.56","c1_nm":"50~54세","c1":"055","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"4211","origin_dt":"4210645","rank":1,"irdsrate":"-91.87","c1_nm":"55~59세","c1":"060","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3885","origin_dt":"3885297","rank":1,"irdsrate":"-92.5","c1_nm":"60~64세","c1":"065","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2734","origin_dt":"2734187","rank":1,"irdsrate":"-94.72","c1_nm":"65~69세","c1":"070","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2028","origin_dt":"2027679","rank":1,"irdsrate":"-96.08","c1_nm":"70~74세","c1":"075","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"1601","origin_dt":"1600867","rank":1,"irdsrate":"-96.91","c1_nm":"75~79세","c1":"080","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"1121","origin_dt":"1120781","rank":1,"irdsrate":"-97.84","c1_nm":"80~84세","c1":"085","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"804","origin_dt":"803729","rank":1,"irdsrate":"-98.45","c1_nm":"85세이상","c1":"086","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"}],"worldData":[{"rank":28,"irdsrate":"0.09","beforeYear":"7672062.559","currentYear":"7753195.395","maxRank":"210"}]},"errMsg":"Success","errCd":0,"trId":"Ho==_116100_1663833398266"}
let chartDatas = getTotPopulation.result;
$(document).ready(function() {
	createTotSur(getTotAreaPopulation);
	setTileMapChart(getTotAreaPopulation); //treeMap
});*/
function createTotSur(res,callback){
	$("#map-tooltip").hide();
	//chartDatas = null;
	let total = 0;
	res.result.areaData.forEach(function(data){
		total+=parseInt(data.dt);
	});
	//조규환
	/*console.log(total); //51829136
	let totalNumber = total.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	$("#total-number").text(totalNumber); //총인구 수
	if(getTotPopulation.errCd=="0"){
		//var chartDatas = getTotPopulation.result;
		setSummaryData();
		setGenderPieChart("total"); //이거수정
		setPeopleAgeChart();
		setPopulationMoveHomeChart();
		setPopulationForTimeChart(false);
		
	}
	if(typeof callback==="function"){
		callback();
	}
	console.log(chartDatas);*/
	//조규환
	
	$("#total-number").text($.heum.setThousandSeparator(total)); //총인구?
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTotPopulation.json",
		data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.admCd}, // 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				chartDatas = res.result;
				setSummaryData();
				setGenderPieChart("total");
				setPeopleAgeChart();
				setPopulationMoveHomeChart();
				setPopulationForTimeChart(false);
				
				common_loading(false);
			}
			if(typeof callback==="function"){
				callback();
			}
		}
	});
}
/**
 * @name        : setSummaryData 
 * @description : 총괄 요약정보 데이터 셋팅 
 */
function setSummaryData(){
	$("#summary-container li[data-type]").hide();
	let forigen = parseFloat(chartDatas.foreignRt[0].dt);
	let forigenRt = parseFloat(chartDatas.foreignRt[0].irdsrate);
	$("#total-number").text($.heum.setThousandSeparator(chartDatas.totalData[0].dt));
	$("[data-id=total-gender-number]").text($.heum.setThousandSeparator(parseFloat(chartDatas.genderData[0].dt).toFixed(1)));
	$("[data-id=total-forigen-number]").text($.heum.setThousandSeparator(forigen));
	$("[data-id=total-forigen-rt]").removeClass("state-up state-down").text(Math.abs(forigenRt)+" %");
	if(forigenRt>0){
		$("[data-id=total-forigen-rt]").addClass("state-up");
	}else if(forigenRt<0){
		$("[data-id=total-forigen-rt]").addClass("state-down");
	}
	if($.heum.hasData(chartDatas.totalData[0].irdsrate)){
		$("#total-irdsrate").removeClass("state-up state-down").text(Math.abs(chartDatas.totalData[0].irdsrate)+" %");
		if(parseFloat(chartDatas.totalData[0].irdsrate)>0){
			$("#total-irdsrate").addClass("state-up");
		}else if(parseFloat(chartDatas.totalData[0].irdsrate)<0){
			$("#total-irdsrate").addClass("state-down");
		}
		$("#total-irdsrate").parent().show();
	}else{
		$("#total-irdsrate").parent().hide();
	}
	if($totSurvMap.ui.admCd=="00"){
		$("#summary-container li[data-type=summary-00]").show();
		let worldData = chartDatas.worldData[0];
		let irdsrate = parseFloat(worldData.irdsrate);
		$("#imf-rank").text(worldData.rank);
		$("#imf-irdsrate").removeClass("state-up state-down").text(Math.abs(irdsrate)+" %");
		if(irdsrate>0){
			$("#imf-irdsrate").addClass("state-up");
		}else if(irdsrate<0){
			$("#imf-irdsrate").addClass("state-down");
		}
	}else{
		$("#summary-container li[data-type=summary-others]").show();
		var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
		const themeParameters = themeData.mapData.getParameters();
		$totSurvMap.ui.setRankText({ 
			year: $totSurvMap.ui.year, 
			region_cd : $totSurvMap.ui.admCd, 
			surv_id : themeParameters.surv_id, 
			itm_cd : themeParameters.itm_cd, 
			isAtdrc:$totSurvMap.ui.isAtdrc, 
			thema:$totSurvMap.ui.theme
		});
		$("[data-id=total-rank]").text(chartDatas.totalData[0].rank);
		$("[data-id=gender-rank]").text(chartDatas.genderData[0].rank);
		$("[data-id=foreign-rank]").text(chartDatas.foreignRt[0].rank);
	}
}
/**
 * @name        : setGenderPieChart 
 * @description : 내국인 외국인 성별 대비 파이차트 
 * @parameters  : target : [총인구=total,내국인:local,외국인=foreign]
 */
function setGenderPieChart(target){
	$("#people-chart-container [data-type=tooltip]").hide();
	$("#gender-tab li").removeClass("on");
	$("#gender-tab li[data-value="+target+"]").addClass("on");
	let targetData=chartDatas[target+"Data"];
	if(target=="total"){
		targetData = [
			{dt:parseFloat(chartDatas.localData[0].dt)+parseFloat(chartDatas.foreignData[0].dt)},
			{dt:parseFloat(chartDatas.localData[1].dt)+parseFloat(chartDatas.foreignData[1].dt)}
		];
	}
	const labels = [{name:"남자",color:"#21AEF1"}, {name:"여자",color:"#FE5959"}];
	createPieChart({
		size:"55%",
		height:"250px",
		target:"people-chart",
		data:targetData,
		labels:labels,
		unit:"명",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+$("#gender-tab li.on").text()+"_"+labels[i].name}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":getGenderTooltipData(d.index,chartDatas)}),"명"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								const title = $("#gender-tab li.on").text()+"_"+(d.index==0?"남자":"여자");
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(' 성별 인구',	$("<span/>",{"text":" - "+title})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+title}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"year-region-name","text":$totSurvMap.ui.tooltipMap.selectedAdmNm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":getGenderTooltipData(d.index,chartDatas)}),"명"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTotPopulation.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=year-region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text(getGenderTooltipData(d.index,res.result));
											if(typeof callback==="function"){
												callback();
											}
										}
									}
								});
							}
						});
						$("#tooltip-map-tooltip").show();
					})
				)
			);
			tooltip.show();
		}
	});
}
function getGenderTooltipData(index,data){
	const tabIndex = $("#gender-tab li").index($("#gender-tab li.on"));//0:총인구,1:내국인,2:외국인
	if(tabIndex==0){
		return $.heum.setThousandSeparator(parseFloat(data.localData[index].dt)+parseFloat(data.foreignData[index].dt));
	}else if(tabIndex==1){
		return $.heum.setThousandSeparator(parseFloat(data.localData[index].dt));
	}else if(tabIndex==2){
		return $.heum.setThousandSeparator(parseFloat(data.foreignData[index].dt));
	}
}
/**
 * @name        : setPeopleAgeChart 
 * @description : 연령 분포 차트
 */
function setPeopleAgeChart(){
	let data = chartDatas.ageData;
	let height = 220;
	// 마진값 세팅
	let margin = ({top: 20, right: 0, bottom: 20, left: 70})
	// 칼라 세팅
	let color = ["#92d0ef", "#92d0ef", "#f1d16e","#f1d16e","#4dc7ac","#4dc7ac","#4dc7ac","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#f5ca87","#f5ca87","#f5ca87","#f5ca87","#f5ca87"] //20201022 박은식 청년 장년 노년 연령 색상 변경 
	let max = d3.max(data, function(d) { return Number(d.dt) });
	let backGroundData = [
		{"c1_nm" : "0~4세", "dt" : max*1.3}, {"c1_nm" : "5~9세", "dt" : max*1.3}
	];
	
	$("#people-age-chart").empty();
	let width = $("#people-age-chart").outerWidth();
	if(width<900){
		width = 900;
	}
	// X축 세팅(domain : 눈금범위, range : 길이범위)
	let x = d3.scaleBand()
	.domain(d3.range(data.length))
	.range([margin.left, width - margin.right])
	
	// Y축 세팅(domain : 눈금범위, range : 길이범위)
	let y = d3.scaleLinear()
		.domain([0, d3.max(data, function(d) { return Number(d.dt)*1.2 })]).nice()
		.range([height - margin.bottom, margin.top]);
	
	// X 축 정보
	let xAxis = function(g) {
		return g
		.attr("transform", "translate("+0+","+(height-margin.bottom)+")")
		.call(d3.axisBottom(x).tickFormat(function(i) {return data[i].c1_nm} ).tickSizeOuter(0))
	};
	// Y 축 정보
	let yAxis = function(g) {
		return g
		.attr("transform", "translate("+margin.left+"," + 0 + ")")
		.call(d3.axisLeft(y).ticks(4, "s"))//20201027 박은식 수치 출력 개수 및 단위값 추가 
		.call(function(g) { return g.select(".domain").remove() })
		.call(function(g) { return g.append("text") 
			.attr("style", "pointer-events: none;") // 20201015 박은식 text의 모든이벤트 none처리
			.attr("x", -margin.left)
			.attr("y", 10)
			.attr("fill", "currentColor")
			.attr("text-anchor", "start")
			.text(data.x) })
	};
	
	const chart = d3.select("#people-age-chart");
	const svg = chart
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.attr("style", "margin-left:-15px"); // 2020-10-06 [곽제욱] 마진값 변경
	
	//백그라운드 1(영유아/어린이)
	svg.append("g")
		.selectAll("rect")
		.data(backGroundData)
		.join("rect")
			.attr("x", function(d, i) { return (x(i)-5) })
			.attr("y", function(d) { return y(Number(d.dt)) })
			.attr("width", (x.bandwidth())*2)
			.attr("height", function(d) { return y(0) - y(Number(d.dt)) })
			.attr("fill", "#F4FAFD");
	
	//백그라운드 2(청소년)
	svg.append("g")
		.selectAll("rect")
		.data(backGroundData)
		.join("rect")
			.attr("x", function(d, i) { return (x(i+2)-3) })
			.attr("y", function(d) { return y(Number(d.dt)) })
			.attr("width", (x.bandwidth())*2)
			.attr("height", function(d) { return y(0) - y(Number(d.dt)) })
			.attr("fill", "#FEFDF0");
	
	//백그라운드 3(청년)
	svg.append("g")
		.selectAll("rect")
		.data(backGroundData)
		.join("rect")
			.attr("x", (function(d, i) { return (x(i+4)) }))
			.attr("y", function(d) { return y(Number(d.dt)) })
			.attr("width", (x.bandwidth())*4 +7 )
			.attr("height", function(d) { return y(0) - y(Number(d.dt)) })
			.attr("fill", "#F2F8EF");
	
	//백그라운드 4(장년)
	svg.append("g")
		.selectAll("rect")
		.data(backGroundData)
		.join("rect")
			.attr("x", function(d, i) { return (x(i+7)) -3})
			.attr("y", function(d) { return y(Number(d.dt)) })
			.attr("width", (x.bandwidth())*10)
			.attr("height", function(d) { return y(0) - y(Number(d.dt)) })
			.attr("fill", "#FCEFF5");
	
	//백그라운드 5(노년)
	svg.append("g")
		.selectAll("rect")
		.data(backGroundData)
		.join("rect")
			.attr("x", function(d, i) { return (i == 1)? x(i+13) : (x(i+13)) } )
			.attr("y", function(d) { return y(Number(d.dt)) })
			.attr("width", (x.bandwidth())*4)
			.attr("height", function(d) { return y(0) - y(Number(d.dt)) })
			.attr("fill", "#FEF7EE");
	svg.append("g")
		.selectAll("rect")
		.data(data)
		.join("rect")
		.attr("class", "eventGroup")
		.attr("x", function(d, i) { return (x(i))+x.bandwidth()/2-7 })
		.attr("y", function(d) { return y(0) }) // 시작점 Y좌표
		.attr("width", 20)
		.attr("fill", function(d,i) {return color[i]})
		.style("cursor", "pointer")
		.attr("item", function(d,i){ return d.itm_cd})
		.on("click", function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 총인구"}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":chartDatas.ageData[i].c1_nm})
					),
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.ageData[i].origin_dt)}),"명"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								const title = "총인구_"+chartDatas.ageData[i].c1_nm;
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'연령별 인구',
										$("<span/>",{"text":" - "+title})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+title}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"year-region-name","text":$totSurvMap.ui.tooltipMap.selectedAdmNm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.ageData[i].origin_dt)}),"명"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTotPopulation.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=year-region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.ageData[i].dt));
											if(typeof callback==="function"){
												callback();
											}
										}
									}
								});
							}
						});
						$("#tooltip-map-tooltip").show();
					})
				)
			);
			tooltip.show();
		})
		.transition()
		.duration(1000)
		.delay(function (d, i) {
		return i * 150;
		})
		.attr("height", function(d) { return y(0) - y(Number(d.dt)) })
		.attr("y", function(d) { return y(Number(d.dt)) })

	 svg.append("g")
		.attr("style", "color:#878A89; font-size:12px;")
		.selectAll("text")
		.data(data)
		.join("text")
		.style("cursor", "pointer")
		.attr("item", function(d,i){ return d.itm_cd})
		.on("click", function(d, i){
		})
		.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
		.attr("y", function(d) { return y(Number(d.dt))-10 })
		.text( function(d){ return $.heum.setThousandSeparator(d.dt)+"천명" })

	svg.append("g")
		.attr("style", "color:#878A89; font-size:12px;")
		.call(xAxis);
	
	svg.append("g")
		.attr("style", "color:#878A89; font-size:12px;")
		.call(yAxis);
	$("#people-age-chart").find("line").remove();
	// 실제 차트 end
}
/**
 * @name        : setPopulationMoveHomeChart 
 * @description : 거주지 이동 차트
 */
function setPopulationMoveHomeChart(){
	const labels =[{name:"현재 살고 있는 집",color:"#1B7ED5"}, {name:"같은 시군구 내 다른 집",color:"#529aa9"}, {name:"다른 시군구 같은 시도",color:"#557d6e"}, {name:"다른 시군구 다른 시도",color:"#d4a873"}, {name:"기타",color:"#c07982"}];
	createPieChart({
		target:"move-home-chart",
		data:chartDatas.moveHomeData,
		labels:labels,
		unit:"명",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 총인구_"+labels[i].name}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.moveHomeData[i].dt)}),"명"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								const title = "총인구_"+labels[i].name;
								console.log(title);
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'연령별 인구',
										$("<span/>",{"text":" - "+title})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+title}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"year-region-name","text":$totSurvMap.ui.tooltipMap.selectedAdmNm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.moveHomeData[i].dt)}),"명"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTotPopulation.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=year-region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.moveHomeData[i].dt));
											if(typeof callback==="function"){
												callback();
											}
										}
									}
								});
							}
						});
						$("#tooltip-map-tooltip").show();
					})
				)
			);
			tooltip.show();
		}
	});
}
/**
 * @name        : setPopulationForTimeChart 
 * @description : 총조사 인구 차트
 * @parameters  : isShowLine : 라인차트(증감율) 보여줄지 여부 
 */
function setPopulationForTimeChart(isShowLine){
	$("#population-for-time-container [data-type=tooltip]").hide();
	$("#population-for-time-tab li").removeClass("on");
	$("#population-for-time-tab li[data-value="+(isShowLine===true?"line":"bar")+"]").addClass("on");
	
	let height = 220;
	let data = JSON.parse(JSON.stringify(chartDatas.populationForTimeData));
	let betweenText = chartDatas.populationForTimeData[0].surv_year+"년";
	if(chartDatas.populationForTimeData.length>1){
		betweenText+=" ~ "+chartDatas.populationForTimeData[chartDatas.populationForTimeData.length-1].surv_year+"년"
	}
	let chartContainerWidth = 80*chartDatas.populationForTimeData.length;
	chartContainerWidth = $(window).width()-30>chartContainerWidth?$(window).width()-30:chartContainerWidth;
	$("#population-for-time-chart").width(chartContainerWidth);
	$("#population-for-time-title").empty().append("총조사 인구("+betweenText+")"/*,$("<span/>",{"text":$("#population-for-time-title").data("title-unit")})*/);
	
	// [총조사인구 차트] 넘어온 데이터 체크  START  2020-10-13  jhs
	if(data.length == 0){
		return;
	}
	// [총조사인구 차트] 넘어온 데이터 체크  END  2020-10-13  jhs
	
	for(var i=0; i < data.length; i++){
		if(i == 0){
			data[0].incORdec = '0';
			continue;
		}
		var temp = data[i].dt - data[i-1].dt;
		data[i].incORdec = temp/data[i-1].dt*100;
	}
//	data = data.sort(function(a, b) { // 내림차순
//		return b.surv_year - a.surv_year;
//	})
	data.forEach(data=>{
		data.dt = Math.ceil(parseFloat(data.dt)/1000);
	});
	$("#population-for-time-chart").empty();
	var width = chartContainerWidth;
	
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	//기본셋팅
	var margin = ({top: 10, right: 50, bottom: 20, left: 50});
	var color = ["5058b8", "7A82D4", "9AA1E9", "BFC5F7", "DFE2FB"];

	var x = d3.scaleBand()
		.domain(data.map(function(d){ return d.surv_year }))
		.rangeRound([margin.left, width - margin.right])
		.padding(0.5);
	var y1 = d3.scaleLinear()
		.domain([0, d3.max(data, function(d){ return Number(d.dt) })]).nice()
		.rangeRound([height - margin.bottom, margin.top]);
	var y2 = d3.scaleLinear()
		.domain([-20, 20])
		.rangeRound([height - margin.bottom, margin.top]);
	
	var line = d3.line().x(function(d){ return (x(d.surv_year) + (Number(x.bandwidth()) / 2))})
		.y(function(d){ return y2(d.incORdec) });

	var xAxis = function(g){ return g.attr("transform", "translate("+0 +","+(height - margin.bottom)+")")
		.call(d3.axisBottom(x)
		.tickFormat(function(i){ return i })
		.tickSizeOuter(0)) 
	}
	var yAxis;
	//타겟설정
	const chart = d3.select("#population-for-time-chart");

	//차트 renderer시작
	const svg = chart.append("svg")
		.attr("height", height)
		.attr("width", width);
	
	if(isShowLine === true){
		//path를 생성하여 변수에 담음
		var path = svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "#97BB03")
			.attr("stroke-miterlimit", 2)
			.attr("stroke-width", 2)
			.attr("d", line)
			
		//path의 총 길이를 계싼
		var totalLength;
		if(path.node() != null) {		
			totalLength = path.node().getTotalLength();	
			
			path.attr("stroke-dasharray", totalLength + " " + totalLength)
				.attr("stroke-dashoffset", totalLength)	
				.transition()
				.duration(1200)
				.ease(d3.easeLinear)
				.attr('stroke-dashoffset', 0)
		}
		svg.append("g")
			.attr("style", "pointer-events: none;")
			.selectAll("circle")
			.data(data)
			.join("circle")
			.on("mousedown", function(d, i){
				const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
				tooltip.empty();
				tooltip.append(
					$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
						$("<h3/>",{"class":"modal__tit","text":d.surv_year+"년 증감율"}),
						$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
							$(this).parents('[data-type=tooltip]').hide();
							return false;
						}).append($("<span/>",{"class":"btn-close btn-close--black"}))
					),
					$("<div/>",{"class":"modal__body"}).append(
						$("<p/>").append(
							$("<span/>",{"class":"color-blue font-large fwbold","text":parseFloat(d.incORdec).toFixed(2)}),"%"
						)
					)
				);
				tooltip.show();
			})
			.attr("fill", "#fff")
			.attr("stroke", "#97BB03")
			.attr("stroke-width", 2)
			.attr("style", "pointer-events: all;")
			.attr("cx", function(d){ return x(d.surv_year) + x.bandwidth() / 2 })
			.attr("cy", function(d){ return y2(d.incORdec) })
			.attr("r", 4)
			.style("cursor", "pointer")
		
		svg.append("g").attr("style", "color:#878A89; font-size:12px;")
			.selectAll("text")
			.data(data)
			.join("text")
			.attr("item", function(d,i){ return d.itm_cd})
			.attr("cursor", "pointer")
			.attr("text-anchor", "middle")
			.attr("x", function(d,i){ return x(d.surv_year)+ x.bandwidth() / 2})
			.attr("y", function(d) { return y2(Number(d.incORdec))-10 })
			.text( function(d){ return parseFloat(d.incORdec).toFixed(2)+"%" })
			
		yAxis = function(g){ return g.attr("transform", 'translate('+margin.left+',0)')
			.style("color", "steelblue")
			.call(d3.axisLeft(y2).ticks(4, "s"))
			.call(function(g){ return g.select(".domain").remove() })
			.call(function(g){ return g.append("text")
			.attr("style", "pointer-events: none;")
			.attr("x", -margin.left)
			.attr("y", 10)
			.attr("fill", "#878A89")
			.attr("text-anchor", "start")
			.attr("font-size", "15")
			.text(data.y2) })
		}
	}else{
		svg.append("g")
			.attr("fill-opacity", 0.8)
			.selectAll("rect")
			.data(data)
			.join("rect")
			.attr("class", "eventGroup")
			.attr("item", function(d,i){ return d.itm_cd})
			.attr("value", function(d){ return d.surv_year } )
			.on("mousedown", function(d,i){
				const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
				tooltip.empty();
				tooltip.append(
					$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
						$("<h3/>",{"class":"modal__tit","text":d.surv_year+"년 인구"}),
						$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
							$(this).parents('[data-type=tooltip]').hide();
							return false;
						}).append($("<span/>",{"class":"btn-close btn-close--black"}))
					),
					$("<div/>",{"class":"modal__body"}).append(
						$("<p/>").append(
							$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(data[i].dt)}),"천명"
						),
						(
							parseInt(chartDatas.populationForTimeData[i].surv_year)<2010?null:
							$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
								$totSurvMap.ui.tooltipMap.show({
									tooltipCallback:function(){
										const title = chartDatas.populationForTimeData[i].surv_year+'년 총 조사 인구';
										$("#tooltip-map-modal-title").empty().append(
											$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
											$("<h3/>").append(title),
											$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
												$('#tooltip-map-container').hide();
												$('.dim').hide();
												return false;
											}).append($("<span/>",{"class":"btn-close btn-close--black"}))
										);
										$("#tooltip-map-tooltip").empty().append(
											$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
												$("<h3/>",{"class":"modal__tit","text":title}),
												$("<a/>",{"class":"btn__cancel"}).click(function(){
													$('#tooltip-map-tooltip').hide(); 
													return false;
												}).append($("<span/>",{"class":"btn-close btn-close--black"}))
											),
											$("<div/>",{"class":"modal__body"}).append(
												$("<p/>").append(
													$("<span/>",{"class":"color-blue font-large fwbold","data-id":"year-region-name","text":$totSurvMap.ui.tooltipMap.selectedAdmNm})
												),
												$("<p/>").append(
													$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(data[i].dt)}),"천명"
												)
											)
										);
									},
									didSelectedPolygon : function(callback){
										$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
										$.ajax({
											method: "POST",
											async: true,
											url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTotPopulation.json",
											data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
											dataType: "json",
											success: function(res) {
												if(res.errCd=="0"){
													$("#tooltip-map-tooltip [data-id=year-region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
													$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(Math.ceil(parseFloat(res.result.populationForTimeData[i].dt)/1000)));
													if(typeof callback==="function"){
														callback();
													}
												}
											}
										});
									}
								});
								$("#tooltip-map-tooltip").show();
							})
						)
					)
				);
				tooltip.show();
			})
			.attr("fill", function(d){ //최고값기준으로 해당하는 %에 맞게 색상을 지정
				var dp = ((Number(d.dt)/Number(maxVal))*100); 
				var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
				return "#"+color[num]
			})
			.attr("x", function(d){ return x(d.surv_year)+x.bandwidth()/2-20 })
			.attr("width", 40)
			.attr("y", function(d){ return y1(0) })
			.transition()
			.duration(1000)
			.delay(function (d, i) {
				return i * 150;
			})
			.attr("height",	function(d) {return y1(0) - y1(Number(d.dt)) })
			.attr("y", function(d){ return y1(Number(d.dt)) })
			.style("cursor", "pointer")
		//이벤트
		svg.append("g")
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.attr("style", "pointer-events: none;")
			.selectAll("rect")
			.data(data)
			.join("rect")
			.attr("x", function(d){ return x(d.surv_year) })
			.attr("width", x.bandwidth())
			.attr("y", 0)
			.attr("height", height);

		svg.append("g").attr("style", "color:#878A89; font-size:12px;")
			.selectAll("text")
			.data(data)
			.join("text")
			.attr("item", function(d,i){ return d.itm_cd})
			.attr("cursor", "pointer")
			.attr("text-anchor", "middle")
			.attr("x", function(d,i){ return x(d.surv_year)+ x.bandwidth() / 2})
			.attr("y", function(d) { return y1(Number(d.dt))-10 })
			.text( function(d){ return $.heum.setThousandSeparator(d.dt)+"천명"; })
		yAxis = function(g){ return g.attr("transform", 'translate('+margin.left+',0)')
			.style("color", "steelblue")
			.call(d3.axisLeft(y1).ticks(4, "s"))
			.call(function(g){ return g.select(".domain").remove() })
			.call(function(g){ return g.append("text")
			.attr("style", "pointer-events: none;")
			.attr("x", -margin.left)
			.attr("y", 10)
			.attr("fill", "#878A89")
			.attr("text-anchor", "start")
			.attr("font-size", "15")
			.text(data.y1) })
		}
	}
	svg.append("g")
		.attr("style", "color:#878A89; font-size:11px;") // 2020.10.28[신예리] 폰트 사이즈 추가
		.call(yAxis);	
	
	svg.append("g")
		.attr("style", "color:#878A89; font-size:12px;") // 2020.10.28[신예리] 폰트 사이즈 추가
		.call(xAxis);
	
	$("#textRange").after("<text>%</text>")
	$("#population-for-time-chart").find("text").attr("fill", "#878A89")
}