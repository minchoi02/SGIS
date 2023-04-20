let chartDatas = null;
const mainColor = "#539c3f";
function createTotSur(res,callback){
	$("#map-tooltip").hide();
	chartDatas = null;
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestry.json",
		data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.admCd}, 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				chartDatas = res.result;
				setSummaryData();
				createOwnerKindForestryChart();
				createForestryPayChart();
				createOwnerForestryScaleChart();
				createForestryAgeChart();
				createForestryMngmtCareerPdChart();
				
				common_loading(false);
				if(typeof callback==="function"){
					callback();
				}
			}
		}
	});
}
/**
 * @name		: setSummaryData 
 * @description : 총괄 요약정보 데이터 셋팅 
 */
function setSummaryData(){
	$("#summary-container li[data-type]").hide();
	$("#total-number").text($.heum.setThousandSeparator(chartDatas.totForestryData[0].dt));
	let total = parseFloat(chartDatas.totForestrHouseRtData[0].total);
	$("[data-id=total-forestry-number-rt],[data-id=total-number-rt],[data-id=total-number-data]").parent().hide();
	// 고령인구 계산 
	var tOldNm = Number(chartDatas.totForestryOldPeoData[0].dt);
	var sumNm = 0;
	for(var i=1; i<chartDatas.totForestryOldPeoData.length; i++){
		sumNm = sumNm + Number(chartDatas.totForestryOldPeoData[i].dt);
	}
	var oldNum = sumNm;
	var oldRt = ((sumNm/tOldNm)*100).toFixed(2); //20201117 박은식 농가인구 중 고령인구 비율 계산식 변경
	$("[data-id=total-old-people-number]").text($.heum.setThousandSeparator(oldNum));
	$("[data-id=total-old-people-number-rt]").text(oldRt+"%");
	
	
	var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
	const themeParameters = themeData.mapData.getParameters();
	let level;
	if($totSurvMap.ui.admCd.length==2){
		level = "sido";
	}else if($totSurvMap.ui.admCd.length==5){
		level = "sgg";
	}
	$.ajax({
		method: "POST",
		async: true,	
		url: sgisContextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestryRank.json",
		data: { year: $totSurvMap.ui.year, regionCd : $totSurvMap.ui.admCd, level:level}, // 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				$("[data-id=forestry-people-rank]").text(res.result.forestryHouseRank[0].rank);
				const forestryRt = parseFloat(res.result.forestryHouseRatio[0].rt);
				$("[data-id=total-forestry-number]").text($.heum.setThousandSeparator(res.result.forestryHouseRatio[0].dt));
				var forestryList = res.result.forestryRatio;
				var oldForestryList = res.result.totOldForestry;
				var forestryHouseList = res.result.forestryHouseRatio;
				var forestryHouseHoldList = res.result.forestryHouseHoldRatio;
				let tempForestryThisYearData,tempOldForestyThisYearData,tempForestryHouseThisYearData,tempForestryHouseHoldBeforeYearData,forestryIncOrDec;
				if($totSurvMap.ui.year == '2010'){
					tempForestryThisYearData = forestryList[0];
					tempOldForestyThisYearData = oldForestryList[0];
					tempForestryHouseThisYearData = forestryHouseList[0];
					tempForestryHouseHoldBeforeYearData = forestryHouseHoldList[0];
				} else {
					for(var j = 0; j < forestryList.length; j++){
						if(forestryList[j].surv_year == $totSurvMap.ui.year){
							tempForestryThisYearData = forestryList[j];
						}
						if(oldForestryList[j].surv_year == $totSurvMap.ui.year){
							tempOldForestyThisYearData = oldForestryList[j];
						}
						if(forestryHouseList[j].surv_year == $totSurvMap.ui.year){
							tempForestryHouseThisYearData = forestryHouseList[j];
						}							
						if(forestryList[j].surv_year == $totSurvMap.ui.year-5){
							tempForestryBeforeYearData = forestryList[j];
						}
						if(oldForestryList[j].surv_year == $totSurvMap.ui.year-5){
							tempOldForestyBeforeYearData = oldForestryList[j];
						}
						if(forestryHouseList[j].surv_year == $totSurvMap.ui.year-5){
							tempForestryHouseBeforeYearData = forestryHouseList[j];
						}
						if(forestryHouseHoldList[j].surv_year == $totSurvMap.ui.year){
							tempForestryHouseHoldThisYearData = forestryHouseHoldList[j];
						}
						if(forestryHouseHoldList[j].surv_year == $totSurvMap.ui.year-5){
							tempForestryHouseHoldBeforeYearData = forestryHouseHoldList[j];
						}
					}
					forestryRatio = forestryRatioCalculation(tempForestryThisYearData.dt, tempForestryBeforeYearData.dt);
					forestryHouseRatio = forestryRatioCalculation(tempForestryHouseThisYearData.dt, tempForestryHouseBeforeYearData.dt);
					forestryHouseHoldRatio = forestryRatioCalculation(tempForestryHouseHoldThisYearData.dt, tempForestryHouseHoldBeforeYearData.dt);
					if($.heum.hasData(forestryHouseRatio)){
						$("[data-id=total-forestry-number-rt]").parent().show();
						$("[data-id=total-forestry-number-rt]").removeClass("state-up state-down").text(Math.abs(forestryHouseRatio)+" %");
						if(forestryHouseRatio>0){
							$("[data-id=total-forestry-number-rt]").addClass("state-up");
						}else if(forestryHouseRatio<0){
							$("[data-id=total-forestry-number-rt]").addClass("state-down");
						}
					}
					if($.heum.hasData(forestryHouseHoldRatio)){
						forestryIncOrDec = tempForestryHouseHoldThisYearData.dt - tempForestryHouseHoldBeforeYearData.dt;
						let totalText = $.heum.setThousandSeparator(forestryIncOrDec);
						if(total>0){
							totalText+=" 가구 증가"
						}else if(total<0){
							totalText+=" 가구 감소"
						}
						$("[data-id=total-number-data]").text("("+totalText+")");
						$("[data-id=total-number-rt]").parent().show();
						$("[data-id=total-number-rt]").removeClass("state-up state-down").text(Math.abs(forestryHouseHoldRatio)+" %");
						if(forestryHouseHoldRatio>0){
							$("[data-id=total-number-rt]").addClass("state-up");
						}else if(forestryHouseHoldRatio<0){
							$("[data-id=total-number-rt]").addClass("state-down");
						}
					}
				}
			}
		}
	});
	if($totSurvMap.ui.admCd!="00"){
		$("#summary-container li[data-type=summary-others]").show();
		$totSurvMap.ui.setRankText({ 
			year: $totSurvMap.ui.year, 
			region_cd : $totSurvMap.ui.admCd, 
			surv_id : themeParameters.surv_id, 
			itm_cd : themeParameters.itm_cd, 
			isAtdrc:$totSurvMap.ui.isAtdrc,
			c1:"000", 
			thema:"population"
		});
		$("[data-id=total-rank]").text(chartDatas.totForestryData[0].rank);
		if($.heum.hasData(chartDatas.totForestryRtData[0].rt)){
			$("[data-id=total-rank-irdsrate]").show();
			const totalRankIrdsrate = parseFloat(chartDatas.totForestryRtData[0].rt);
			$("[data-id=total-rank-irdsrate]").removeClass("state-up state-down").text(Math.abs(totalRankIrdsrate)+" %");
			if(totalRankIrdsrate>0){
				$("[data-id=total-rank-irdsrate]").addClass("state-up");
			}else if(totalRankIrdsrate<0){
				$("[data-id=total-rank-irdsrate]").addClass("state-down");
			}else{
				if($totSurvMap.ui.year=="2015"){
					$("[data-id=empty-rank-irdsrate]").hide();
				}
			}
		}else{
			$("[data-id=total-rank-irdsrate]").hide();
		}
		if($totSurvMap.ui.year!=2010){
			if($.heum.hasData(chartDatas.totForestrHouseRtData[0].rt)){
				const forestryHouseIrdsrate = parseFloat(chartDatas.totForestrHouseRtData[0].rt);
				$("[data-id=forestry-people-rank-irdsrate]").removeClass("state-up state-down").text(Math.abs(forestryHouseIrdsrate)+" %");
				if(forestryHouseIrdsrate>0){
					$("[data-id=forestry-people-rank-irdsrate]").addClass("state-up");
				}else if(forestryHouseIrdsrate<0){
					$("[data-id=forestry-people-rank-irdsrate]").addClass("state-down");
				}
			}else{
				$("[data-id=forestry-people-rank-irdsrate]").hide();
			}
		}else{
			$("[data-id=forestry-people-rank-irdsrate]").hide();
		}
	}
}
function createOwnerKindForestryChart(){
	var data = chartDatas.businessChart;
	createDonutChart({data:data,target:"owner-kind-forestry-chart",colorData:["#E85757", "#599BD4", "#ED7D31", "#FFC000", "#B9D430","#4473C5"],unit:null,tooltipCallback:function(d,i){
		const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
		tooltip.empty();
		tooltip.append(
			$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
				$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+data[i].itm_nm}),
				$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
					$(this).parents('[data-type=tooltip]').hide();
					return false;
				}).append($("<span/>",{"class":"btn-close btn-close--black"}))
			),
			$("<div/>",{"class":"modal__body"}).append(
				$("<p/>").append(
					$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.value)}),"가구"
				),
				$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
					$totSurvMap.ui.tooltipMap.show({
						tooltipCallback:function(){
							$("#tooltip-map-modal-title").empty().append(
								$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
								$("<h3/>").append(
									'경영형태별 임가',
									$("<span/>",{"text":" - "+data[i].itm_nm})
								),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$('#tooltip-map-container').hide();
									$('.dim').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							);
							$("#tooltip-map-tooltip").empty().append(
								$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
									$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<a/>",{"class":"btn__cancel"}).click(function(){
										$('#tooltip-map-tooltip').hide(); 
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								),
								$("<div/>",{"class":"modal__body"}).append(
									$("<p/>").append(
										$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),"가구"
									)
								)
							);
						},
						didSelectedPolygon : function(callback){
							$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
							$.ajax({
								method: "POST",
								async: true,
								url: sgisContextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestry.json",
								data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd}, 
								dataType: "json",
								success: function(res) {
									if(res.errCd=="0"){
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.businessChart[i].dt));
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
		).show();
	}});
}
function createForestryPayChart(){
	let max = 0;
	let colors = chartDatas.forestrySale.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.forestrySale.findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		rotate:true,
		target:"forestry-pay-chart",
		data:chartDatas.forestrySale,
		dataVal:"dt",
		unit:"가구",
		columnVal:"itm_nm",
		color:colors,
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.forestrySale[i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"가구"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'비재배 임산물 판매금액별 임가',
										$("<span/>",{"text":" - "+chartDatas.forestrySale[i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.forestrySale[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestry.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.forestrySale[i].dt));
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
				),
			);
			tooltip.show();
		}
	});
}

function createOwnerForestryScaleChart(index){
	index = index||"0";
	$("#fsrcs-ctvt-crops-forestry-tab li").removeClass("on");
	$("#fsrcs-ctvt-crops-forestry-tab li:eq("+index+")").addClass("on");
	let max = 0;
	let colors = chartDatas["fsrcsCtvtCropsForestry_"+index].map((d,i)=>{
		$("#owner-scale-chart").width($("#owner-scale-chart").parent().width()+"px");
		if(d.itm_cd!="T40"&&d.itm_cd!="T42"&&d.itm_cd!="T44"){
			d.itm_nm = d.itm_nm.replace("(가구)", "").replace("_임가", "").replace("산나물:","").replace("약용작물:","").replace("관상작물:","").replace("유실수:","").replace("(가구)","").replace("표고버섯원목재배(노지):임가","접종(노지)").replace("표고버섯 톱밥배지재배", "톱밥 배지(시설)").replace("표고버섯원목재배", "원목 재배(시설)")
		} else {
			d.itm_nm = d.itm_nm.replace("(가구)", "").replace("_임가", "").replace("산나물:","").replace("약용작물:","").replace("관상작물:","").replace("유실수:","").replace("(가구)","").replace("시설작물:산나물", "시설재배").replace("약용작물", "시설재배").replace("관상작물","시설재배");
		}
		if(index=="2"){
			$("#owner-scale-chart").width("600px");
		}
		if(d.dt != undefined){
			max = Math.max(max,parseFloat(d.dt));
		}
		return "#747474";
	});
	colors[chartDatas["fsrcsCtvtCropsForestry_"+index].findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		rotate:true,
		target:"owner-scale-chart",
		data:chartDatas["fsrcsCtvtCropsForestry_"+index],
		dataVal:"dt",
		columnVal:"itm_nm",
		unit:"가구",
		color:colors,
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas["fsrcsCtvtCropsForestry_"+index][i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"가구"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'임산물 재배 작물별 임가',
										$("<span/>",{"text":" - "+chartDatas["fsrcsCtvtCropsForestry_"+index][i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas["fsrcsCtvtCropsForestry_"+index][i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestry.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result["fsrcsCtvtCropsForestry_"+index][i].dt));
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
				),
			);
			tooltip.show();
		}
	});
}


function createForestryAgeChart(){
	var data = chartDatas.forestryMngmtAge;
	$("#forestry-age-chart").empty();
	var width = $("#forestry-age-chart").outerWidth();
	var height = 250;
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	//임시 end
	
	//기본셋팅
	var margin = ({top: 15, right: 20, bottom: 25, left: 30}) //2020.10.28[신예리] 마진 값 변경
	var color = ["4dc7ac","4dc7ac","dd95da","dd95da","dd95da","dd95da","dd95da","dd95da","f5ca87","f5ca87","f5ca87","f5ca87","f5ca87"];
	
	var x = d3.scaleBand()
				.domain(data.map(function(d){ return d.itm_nm.replace("(가구)","").replace("경영주연령별임가:","") }))
				.rangeRound([margin.left, width - margin.right])
				.padding(0.5);
	var y1 = d3.scaleLinear()
				.domain([0, d3.max(data, function(d){ return Number(d.dt)*1.3 })]).nice()
				.rangeRound([height - margin.bottom, margin.top]);
	var y2 =	d3.scaleLinear()
				.domain([-20, 20])
				.rangeRound([height - margin.bottom, margin.top]);
	
	
	
	var xAxis = function(g){ return g.attr("transform", "translate("+0 +","+(height - margin.bottom)+")")
									 .call(d3.axisBottom(x)
											 .tickFormat(function(i){ return i })
											 .tickSizeOuter(0)) 
				}
	var y1Axis = function(g){ return g.attr("transform", 'translate('+margin.left+',0)')
										.style("color", "steelblue")
											.call(d3.axisLeft(y1).ticks(4, "s"))
											.call(function(g){ return g.select(".domain").remove() })
											.call(function(g){ return g.append("text")
																	 .attr("x", -margin.left)
																		.attr("y", 10)
																		.attr("fill", "#878A89")
																		.attr("text-anchor", "start")
																		.attr("font-size", "15")
																		.text(data.y1) })
					}
	var y2Axis = function(g){ return g.attr("transform", 'translate('+(width - margin.right)+',0)')
										.call(d3.axisRight(y2).ticks(5, "s"))
										.call(function(g){ return g.select(".domain").remove() })
										.call(function(g){ return g.append("text")
																 .attr("x", margin.right)
																 .attr("y", 10)
																 .attr("fill", "#878A89")
																 .attr("text-anchor", "end")
																 .attr("font-size", "15")
																 .text(data.y2) })
					}
	//타겟설정
	const chart = d3.select("#forestry-age-chart");

	//차트 renderer시작
	const svg = chart.append("svg")
		 			 .attr("height", height)
		 			 .attr("width", width);
	
	
		svg.append("g")
		.attr("fill-opacity", 0.8)
			.selectAll("rect")
			.data(data)
			.join("rect")
			.attr("value", function(d){ return d.itm_nm } )
			.attr("class", "eventGroup")
			.style("cursor", "pointer") //2020.11.18[신예리] 마우스 커서 추가
			.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
		.on("mousedown", function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+data[i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"가구"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'경영주 연령별 임가',
										$("<span/>",{"text":" - "+data[i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(d.dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestry.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd}, 
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.forestryMngmtAge[i].dt));
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
			).show();
		})
		//20201117 박은식 연령별 색상 변경 START
		.attr("fill",function(d){
			if(Number(d.itm_nm.replace("경영주연령별어가:", "").substring(0,2))>=20 && Number(d.itm_nm.replace("경영주연령별어가:", "").substring(0,2)) < 35) {
				return "#4dc7ac"
			} else if(Number(d.itm_nm.substring(0,2))>=35 && Number(d.itm_nm.substring(0,2)) < 65) {
				return "#dd95da"
			} else {
				return "#f5ca87"
			}
		})
		//20201117 박은식 연령별 색상 변경 END
		.attr("x", function(d){ return x(d.itm_nm.replace("(가구)","").replace("경영주연령별임가:",""))+x.bandwidth()/2-16 })
		.attr("width", 32)
		.attr("y", function(d){ return y1(0) })
		.attr("color", function(d){ //mouseout event에 사용될 변수
			var dp = ((Number(d.dt)/Number(maxVal))*100); 
			var num = (dp < 20) ? 4 : (dp > 20 || dp == 20) ? (dp < 40) ? 3 : (dp > 40 || dp == 40) ? (dp < 60) ? 2 : (dp > 60 || dp == 60) ? (dp < 80) ? 1 : 0 : 0 : 0 : 0;
			return "#"+color[num]})
			.transition()
			.duration(1000)
			.delay(function (d, i) {
					return i * 150;
			})
		.attr("height",	function(d) {return y1(0) - y1(Number(d.dt)) })
		.attr("y", function(d){ return y1(Number(d.dt)) })
		//이벤트
		

	svg.append("g")
		.attr("fill", "none")
		.attr("pointer-events", "all")
		.attr("style", "pointer-events: none;")
		 .selectAll("rect")
		 .data(data)
		 .join("rect")
		//.attr("x", function(d){ return x(d.surv_year) })
		 .attr("x", function(d){ return x(d.itm_nm.replace("(가구)","").replace("경영주연령별임가:","")) })
		.attr("width", x.bandwidth())
		.attr("y", 0)
		.attr("height", height);

	 svg.append("g").attr("style", "color:#878A89; font-size:12px;") //2020.10.28[신예리] 폰트 사이즈 수정
		.selectAll("text")
	.data(data)
	.join("text")
	.style("cursor", "pointer")
	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
 	.on("click", function(d, i){
	console.log("[TODO]툴팁",d)
 	})
	.attr("text-anchor", "middle")
	.attr("x", function(d,i){ return x(d.itm_nm.replace("(가구)","").replace("경영주연령별임가:",""))+ x.bandwidth() / 2})
	.attr("y", function(d) { return y1(Number(d.dt))-10 })
	.text( function(d){ return $.heum.setThousandSeparator(d.dt)+"가구"; })//20201120 박은식 number format 변경
	

	svg.append("g")
		.attr("style", "font-size: 10.5px;") //2020.10.28[신예리] 폰트 사이즈 추가
		.call(xAxis);

	svg.append("g")
		.attr("style", "font-size: 12px;") //2020.10.28[신예리] 폰트 사이즈 추가
		.call(y1Axis);

//	svg.append("g")
//		.call(y2Axis);

	$("#forestry-age-chart").find("text").attr("fill", "#878A89")
	
}
function createForestryMngmtCareerPdChart(){
	let max = 0;
	let colors = chartDatas.forestryMngmtCareerPd.map((d,index)=>{
		d.itm_nm=d.itm_nm.replace("임업경력기간별임가:","").replace(" (가구)","");
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.forestryMngmtCareerPd.findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		target:"owner-career-chart",
		data:chartDatas.forestryMngmtCareerPd,
		dataVal:"dt",
		columnVal:"itm_nm",
		color:colors,
		unit:"가구",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.forestryMngmtCareerPd[i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"가구"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'경영주 임업경력기간별 비재배임업 임가',
										$("<span/>",{"text":" - "+chartDatas.forestryMngmtCareerPd[i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.forestryMngmtCareerPd[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/forestryDash/getTotForestry.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.forestryMngmtCareerPd[i].dt));
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
				),
			);
			tooltip.show();
		}
	});
}
//증감율 계산
function forestryRatioCalculation(thisData, beforeData){
	var ratio = 0;
	if(thisData == undefined || thisData == null || thisData == '0'){
		ratio = 100
	} else if(beforeData == undefined || beforeData == null || beforeData == '0') {
		ratio = -100
	} else {
		ratio = (thisData - beforeData) / beforeData * 100;
	}
	
	return ratio.toFixed(2);
}