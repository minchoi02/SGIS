let chartDatas = null;
const mainColor = "#598aac";
function createTotSur(res,callback){
	$("#map-tooltip").hide();
	chartDatas = null;
	var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
	$("[id$=-chart]:not(#tree-map)").empty();
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFishery.json",
		data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.admCd,fisheryType:themeData.fisheryType}, 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				chartDatas = res.result;
				setSummaryData();
				createOwnerKindFisheryChart();
				createFisheryPayChart();
				createOwnerFisheryScaleChart();
				createFisheryAgeChart();
				createFisheryMngmtCareerPdChart();
				
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
	let level;
	if($totSurvMap.ui.admCd.length==2){
		level = "sido";
	}else if($totSurvMap.ui.admCd.length==5){
		level = "sgg";
	}
	var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
	$.ajax({
		method: "POST",
		async: true,	
		url: sgisContextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFisheryRank.json",
		data: { year: $totSurvMap.ui.year, regionCd : $totSurvMap.ui.admCd, level:level,fisheryType:themeData.fisheryType}, // 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				var fisheryRatioLise = res.result.totFisheryRatio;
				var fisheryHouseRankList = res.result.totFisheryHouseRnak;
				var oldFisheryList = res.result.totOldFishery;
				var fisheryHouseRatioList = res.result.totFisheryHouseRatio;	
				var oldRatio =  0;
				var fisheryRatio = 0;
				var fisheryHouseRatio = 0;
				var totalFisheryNumber = "-";
				$("#total-number").text($.heum.setThousandSeparator(fisheryHouseRankList[0].dt));
				if($totSurvMap.ui.year != '2010'){
					if(oldFisheryList[0].dt == undefined){
						oldRatio = 0;
					}else {
						oldRatio = oldFisheryList[0].dt/fisheryRatioLise[0].dt*100;
					}
					if(fisheryRatioLise.length == 2){
						var thisRatio = 0,beforeRatio = 0;
						if($.heum.hasData(fisheryRatioLise[0].dt)){
							thisRatio = fisheryRatioLise[0].dt
						}
						if($.heum.hasData(fisheryRatioLise[1].dt)){
							beforeRatio = fisheryRatioLise[1].dt;
						}
						fisheryRatio = fisheryRratioCalculation(thisRatio,beforeRatio)
					} else if(fisheryRatioLise.length == 3){
						var thisRatio = 0,beforeRatio = 0;
						if($.heum.hasData(fisheryRatioLise[2].dt)){
							thisRatio = fisheryRatioLise[2].dt
						}
						if($.heum.hasData(fisheryRatioLise[0].dt)){
							beforeRatio = fisheryRatioLise[0].dt;
						}
						fisheryRatio = fisheryRratioCalculation(thisRatio,beforeRatio)
					}else {
						fisheryRatio = null
					}
					
					if($.heum.hasData(fisheryRatio)){
						if(parseFloat(fisheryRatio) > 0){
							fisheryUpDownCheck = "state-up";
						} else if(parseFloat(fisheryRatio) < 0){
							fisheryUpDownCheck = "state-down";
						} else {
							fisheryUpDownCheck = null;
						}
					} 
					
					if(fisheryHouseRatioList.length == 2){
						fisheryHouseRatio = fisheryRratioCalculation(fisheryHouseRatioList[0].dt,fisheryHouseRatioList[1].dt)
						if($.heum.hasData(fisheryHouseRatio)){
							if(parseFloat(fisheryHouseRatio) > 0){
								fisheryHouseUpDownCheck = "state-up";
							} else if(parseFloat(fisheryHouseRatio) < 0){
								fisheryHouseUpDownCheck ="state-down";
							} else {
								fisheryHouseUpDownCheck = null;
							}
						} 
					} else if(fisheryHouseRatioList.length == 3){
						fisheryHouseRatio = fisheryRratioCalculation(fisheryHouseRatioList[2].dt,fisheryHouseRatioList[0].dt)
						if($.heum.hasData(fisheryHouseRatio)){
							if(parseFloat(fisheryHouseRatio) > 0){
								fisheryHouseUpDownCheck = "state-up";
							} else if(parseFloat(fisheryHouseRatio) < 0){
								fisheryHouseUpDownCheck ="state-down";
							} else {
								fisheryHouseUpDownCheck = null;
							}
						} 
					} else {
						fisheryHouseRatio = null;
						fisheryHouseUpDownCheck = null;
					}
					
					
				} else {
					oldRatio = (oldFisheryList[1].dt != undefined) ? oldFisheryList[1].dt/fisheryRatioLise[0].dt*100 : 0/fisheryRatioLise[0].dt*100;
					$("#fisheryRankRow").text("-명 유지");
					fisheryHouseUpDownCheck = null;
					fisheryRatio = null;
					fisheryUpDownCheck = null;
				}
				
				let totalNumberDataText="";
				
				if(fisheryHouseRatioList.length == 2){
					const value = fisheryHouseRatioList[0].dt-fisheryHouseRatioList[1].dt;
					if(value > 0){
						totalNumberDataText = "("+$.heum.setThousandSeparator(value)+" 가구 증가)";
					} else if(value < 0){
						totalNumberDataText = "("+$.heum.setThousandSeparator(value)+" 가구 감소)";
					} else {
						totalNumberDataText = "(- 가구 유지)";
					}
					totalFisheryNumber = $.heum.setThousandSeparator(fisheryRatioLise[0].dt);
				}else if(fisheryHouseRatioList.length == 3){
					const value = fisheryHouseRatioList[2].dt-fisheryHouseRatioList[0].dt;
					if(value > 0){
						totalNumberDataText = "("+$.heum.setThousandSeparator(value)+" 가구 증가)";
					} else if(value < 0){
						totalNumberDataText = "("+$.heum.setThousandSeparator(value)+" 가구 감소)";
					} else {
						totalNumberDataText = "(- 가구 유지)";
					}
					totalFisheryNumber = $.heum.setThousandSeparator(fisheryRatioLise[2].dt);
				}
				
				$("[data-id=total-fishery-number]").text(totalFisheryNumber);
				$("[data-id=total-number-data]").text(totalNumberDataText);
				if(fisheryRatio==null){
					$("[data-id=total-fishery-number-rt]").hide();
				}else{
					$("[data-id=total-fishery-number-rt]").removeClass("state-up state-down");
					$("[data-id=total-fishery-number-rt]").show().addClass(fisheryUpDownCheck).text(Math.abs(fisheryRatio)+" %");
				}
				if(fisheryHouseRatio==null){
					$("[data-id=total-number-rt]").hide();
				}else{
					$("[data-id=total-number-rt]").removeClass("state-up state-down");
					$("[data-id=total-number-rt]").show().addClass(fisheryHouseUpDownCheck).text(Math.abs(fisheryHouseRatio)+" %");
					
				}
				$("[data-id=total-old-people-number]").text($.heum.setThousandSeparator((oldFisheryList[0].dt != undefined) ? oldFisheryList[0].dt : 0));
				$("[data-id=total-old-people-number-rt]").text(oldRatio.toFixed(2)+"%");
			}
		}
	});
	if($totSurvMap.ui.admCd!="00"){
		$("#summary-container li[data-type=summary-others]").show();
		var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
		var mapDataParameters = themeInfo.mapData.getParameters();
		$totSurvMap.ui.setRankText({ 
			year: $totSurvMap.ui.year, 
			region_cd : $totSurvMap.ui.admCd, 
			surv_id : mapDataParameters.surv_id, 
			itm_cd : mapDataParameters.itm_cd, 
			isAtdrc:$totSurvMap.ui.isAtdrc,
			c1:"000", 
			thema:"population"
		});
		$("[data-id=total-rank]").text(chartDatas.totalData[0].rank);
//		if($.heum.hasData(chartDatas.totFisheryRtData[0].rt)){
//			$("[data-id=total-rank-irdsrate]").show();
//			const totalRankIrdsrate = parseFloat(chartDatas.totFisheryRtData[0].rt);
//			$("[data-id=total-rank-irdsrate]").removeClass("state-up state-down").text(Math.abs(totalRankIrdsrate)+" %");
//			if(totalRankIrdsrate>0){
//				$("[data-id=total-rank-irdsrate]").addClass("state-up");
//			}else if(totalRankIrdsrate<0){
//				$("[data-id=total-rank-irdsrate]").addClass("state-down");
//			}else{
//				if($totSurvMap.ui.year=="2015"){
//					$("[data-id=empty-rank-irdsrate]").hide();
//				}
//			}
//		}else{
//			$("[data-id=total-rank-irdsrate]").hide();
//		}
//		if($totSurvMap.ui.year!=2010){
//			if($.heum.hasData(chartDatas.totForestrHouseRtData[0].rt)){
//				const fisheryHouseIrdsrate = parseFloat(res.result.totForestrHouseRtData[0].rt);
//				$("[data-id=fishery-people-rank-irdsrate]").removeClass("state-up state-down").text(Math.abs(fisheryHouseIrdsrate)+" %");
//				if(fisheryHouseIrdsrate>0){
//					$("[data-id=fishery-people-rank-irdsrate]").addClass("state-up");
//				}else if(fisheryHouseIrdsrate<0){
//					$("[data-id=fishery-people-rank-irdsrate]").addClass("state-down");
//				}
//			}else{
//				$("[data-id=fishery-people-rank-irdsrate]").hide();
//			}
//		}else{
//			$("[data-id=fishery-people-rank-irdsrate]").hide();
//		}
	}
}
function createOwnerKindFisheryChart(){
	let data = chartDatas.totFisheryOperationType;
	createDonutChart({data:data,target:"owner-kind-fishery-chart",colorData:["#4473C5", "#599BD4", "#ED7D31", "#FFC000", "#B9D430", "#BDC6F5", "#E85757","#E8CB78"],unit:null,tooltipCallback:function(d,i){
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
					$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.value)}),"가구"
				),
				$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
					$totSurvMap.ui.tooltipMap.show({
						tooltipCallback:function(){
							$("#tooltip-map-modal-title").empty().append(
								$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+$("#fishery-type button[data-type="+$totSurvMap.ui.themeData.fishery.fisheryType+"]").text()+"어가"}),
								$("<h3/>").append(
									'경영형태별 어가',
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
										$("<span/>",{"class":"color-blue font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(d.value)}),"가구"
									)
								)
							);
						},
						didSelectedPolygon : function(callback){
							var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
							$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
							$.ajax({
								method: "POST",
								async: true,
								url: sgisContextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFishery.json",
								data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd,fisheryType:themeData.fisheryType}, 
								dataType: "json",
								success: function(res) {
									if(res.errCd=="0"){
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.totFisheryOperationType[i].dt));
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
function createFisheryPayChart(){
	let max = 0;
	let colors = chartDatas.totPriceFish.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.totPriceFish.findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		rotate:true,
		target:"fishery-pay-chart",
		data:chartDatas.totPriceFish,
		dataVal:"dt",
		columnVal:"itm_nm",
		unit:"가구",
		color:colors,
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.totPriceFish[i].itm_nm}),
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
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+$("#fishery-type button[data-type="+$totSurvMap.ui.themeData.fishery.fisheryType+"]").text()+"어가"}),
									$("<h3/>").append(
										'수산물 판매금액별 어가',
										$("<span/>",{"text":" - "+chartDatas.totPriceFish[i].itm_nm})
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
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.totPriceFish[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFishery.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd,fisheryType:themeData.fisheryType},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.totPriceFish[i].dt));
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

function createOwnerFisheryScaleChart(data){
	$("#owner-scale-chart-container [data-type=tooltip]:last").hide();
	$("#"+$totSurvMap.ui.themeData[$totSurvMap.ui.theme].fisheryType+"-tab li").removeClass("on");
	const target = $.heum.hasData(data)?this:$("#"+$totSurvMap.ui.themeData[$totSurvMap.ui.theme].fisheryType+"-tab li:first");
	$(target).addClass("on");
	data = data||$(target).data("type");
	if(data=="totInshoreFishery"){
		$("#owner-scale-chart").width("2500px");
	}else if(data=="totBlockFishery"){
		$("#owner-scale-chart").width("800px");
	}else if(data=="totCoastalFishery"){
		$("#owner-scale-chart").width("800px");
	}else{
		$("#owner-scale-chart").width($(target).parent().width());
	}
	let max = 0;
	let colors = chartDatas[data].map((d,i)=>{
		max = Math.max(max,parseFloat(d.dt));
		d.itm_nm = d.itm_nm.replace("(가구)", "")
							.replace("주된어로어업방법별어가:", "")
							.replace("서남해구","")
							.replace("동해구","")
							.replace("갑각류:", "")
							.replace("패류:", "")
							.replace("어류:", "");
		return "#747474";
	});
	colors[chartDatas[data].findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		target:"owner-scale-chart",
		data:chartDatas[data],
		dataVal:"dt",
		columnVal:"itm_nm",
		color:colors,
		unit:"가구",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas[data][i].itm_nm}),
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
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+$("#fishery-type button[data-type="+$totSurvMap.ui.themeData.fishery.fisheryType+"]").text()+"어가"}),
									$("<h3/>").append(
										'수산물 판매금액별 어가',
										$("<span/>",{"text":" - "+chartDatas[data][i].itm_nm})
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
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas[data][i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFishery.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd,fisheryType:themeData.fisheryType},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result[data][i].dt));
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


function createFisheryAgeChart(){
	var data = chartDatas.totFisheryAge;
	$("#fishery-age-chart").empty();
	var width = $("#fishery-age-chart").outerWidth();
	var height = 250;
	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	//임시 end
	
	//기본셋팅
	var margin = ({top: 15, right: 20, bottom: 25, left: 30}) //2020.10.28[신예리] 마진 값 변경
	var color = ["4dc7ac","4dc7ac","dd95da","dd95da","dd95da","dd95da","dd95da","dd95da","f5ca87","f5ca87","f5ca87","f5ca87","f5ca87"];
	
	var x = d3.scaleBand()
				.domain(data.map(function(d){ return d.itm_nm.replace("(가구)","").replace("경영주연령별어가:","") }))
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
	const chart = d3.select("#fishery-age-chart");

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
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.totFisheryAge[i].itm_nm}),
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
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+$("#fishery-type button[data-type="+$totSurvMap.ui.themeData.fishery.fisheryType+"]").text()+"어가"}),
									$("<h3/>").append(
										'경영주 연령별 어가',
										$("<span/>",{"text":" - "+chartDatas.totFisheryAge[i].itm_nm})
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
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.totFisheryAge[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFishery.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd,fisheryType:themeData.fisheryType},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.totFisheryAge[i].dt));
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
		.attr("x", function(d){ return x(d.itm_nm.replace("(가구)","").replace("경영주연령별어가:",""))+x.bandwidth()/2-16 })
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
		 .attr("x", function(d){ return x(d.itm_nm.replace("(가구)","").replace("경영주연령별어가:","")) })
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
		
 	})
	.attr("text-anchor", "middle")
	.attr("x", function(d,i){ return x(d.itm_nm.replace("(가구)","").replace("경영주연령별어가:",""))+ x.bandwidth() / 2})
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

	$("#fishery-age-chart").find("text").attr("fill", "#878A89")
	
}
function createFisheryMngmtCareerPdChart(){
	let max = 0;
	let colors = chartDatas.totFisheryCareer.map((d,index)=>{
		d.itm_nm=d.itm_nm.replace("경영주어업경력기간별어가:","").replace(" (가구)","");
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.totFisheryCareer.findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		target:"owner-career-chart",
		data:chartDatas.totFisheryCareer,
		dataVal:"dt",
		columnVal:"itm_nm",
		unit:"가구",
		color:colors,
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.totFisheryCareer[i].itm_nm}),
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
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+$("#fishery-type button[data-type="+$totSurvMap.ui.themeData.fishery.fisheryType+"]").text()+"어가"}),
									$("<h3/>").append(
										'경영주 어업경력기간별 어가',
										$("<span/>",{"text":" - "+chartDatas.totFisheryCareer[i].itm_nm})
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
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.totFisheryCareer[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/fisheryDash/getTotFishery.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd,fisheryType:themeData.fisheryType},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.totFisheryCareer[i].dt));
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
function fisheryRratioCalculation(thisData, beforeData){
	if(beforeData == 0 ){
		return "-";
	}
	var ratio = (thisData - beforeData) / beforeData*100;
	return ratio.toFixed(2);
}