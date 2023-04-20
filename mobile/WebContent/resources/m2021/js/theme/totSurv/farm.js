let chartDatas = null;
const mainColor = "#9a673e";
function createTotSur(res,callback){
	$("#map-tooltip").hide();
	chartDatas = null;
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/farmDash/getTotFarm.json",
		data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.admCd}, 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				chartDatas = res.result;
				setSummaryData();
				createOwnerKindFarmChart();
				createFarmPayChart();
				createOwnerFarmScaleChart();
				createFarmAgeChart();
				createOwnerCareerChart();
				
				if(typeof callback==="function"){
					callback();
				}
				
				common_loading(false);
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
	$("#total-number").text($.heum.setThousandSeparator(chartDatas.totFarmData[0].dt));
	let total = parseFloat(chartDatas.getTotFramHouseRt[0].total);
	const farmHouseRt = parseFloat(chartDatas.getTotFramHouseRt[0].rt);
	if($totSurvMap.ui.year!="2010"){
		$("[data-id=total-farm-number-rt],[data-id=total-number-rt],[data-id=total-number-data]").parent().show();
		let totalText = $.heum.setThousandSeparator(Math.abs(total));
		if(total>0){
			totalText+=" 가구 증가"
		}else if(total<0){
			totalText+=" 가구 감소"
		}
		$("[data-id=total-number-data]").text("("+totalText+")");
		$("[data-id=total-number-rt]").removeClass("state-up state-down").text(Math.abs(farmHouseRt)+" %");
		if(farmHouseRt>0){
			$("[data-id=total-number-rt]").addClass("state-up");
		}else if(farmHouseRt<0){
			$("[data-id=total-number-rt]").addClass("state-down");
		}
		const farmRt = parseFloat(chartDatas.totFarmRtData[0].rt);
		$("[data-id=total-farm-number]").text($.heum.setThousandSeparator(chartDatas.totFarmRtData[0].now_year));
		$("[data-id=total-farm-number-rt]").removeClass("state-up state-down").text(Math.abs(farmRt)+" %");
		if(farmRt>0){
			$("[data-id=total-farm-number-rt]").addClass("state-up");
		}else if(farmRt<0){
			$("[data-id=total-farm-number-rt]").addClass("state-down");
		}
	}else{
		$("[data-id=total-farm-number-rt],[data-id=total-number-rt],[data-id=total-number-data]").parent().hide();
		if(chartDatas.totFarmRtData.length>0){
			$("[data-id=total-farm-number]").text($.heum.setThousandSeparator(chartDatas.totFarmRtData[0].befor_year));
		} else {
			$("[data-id=total-farm-number]").text("-");
		}
	}
	// 고령인구 계산 
	var tOldNm = Number(chartDatas.totFarmOldPeoData[0].dt);
	var sumNm = 0;
	for(var i=1; i<chartDatas.totFarmOldPeoData.length; i++){
		sumNm = sumNm + Number(chartDatas.totFarmOldPeoData[i].dt);
	}
	var oldNum = sumNm;
	var oldRt = ((sumNm/tOldNm)*100).toFixed(2); //20201117 박은식 농가인구 중 고령인구 비율 계산식 변경
	$("[data-id=total-old-people-number]").text($.heum.setThousandSeparator(oldNum));
	$("[data-id=total-old-people-number-rt]").text(oldRt+"%");
	
	
	if($totSurvMap.ui.admCd!="00"){
		$("#summary-container li[data-type=summary-others]").show();
		var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
		const themeParameters = themeData.mapData.getParameters();
		$totSurvMap.ui.setRankText({ 
			year: $totSurvMap.ui.year, 
			region_cd : $totSurvMap.ui.admCd, 
			surv_id : themeParameters.surv_id, 
			itm_cd : themeParameters.itm_cd, 
			isAtdrc:$totSurvMap.ui.isAtdrc,
			c1:"000", 
			thema:"population"
		});
		let level;
		if($totSurvMap.ui.admCd.length==2){
			level = "sido";
		}else if($totSurvMap.ui.admCd.length==5){
			level = "sgg";
		}
		$.ajax({
			method: "POST",
			async: true,	
			url: sgisContextPath + "/ServiceAPI/totSurv/farmDash/getTotFarmRank.json",
			data: { year: $totSurvMap.ui.year, regionCd : $totSurvMap.ui.admCd, level:level}, // 
			dataType: "json",
			success: function(res) {
				if(res.errCd=="0"){
					$("[data-id=farm-people-rank]").text(res.result.totalFarmData[0].rank);
				}
			}
		});
		$("[data-id=total-rank]").text(chartDatas.totFarmData[0].rank);
		if($.heum.hasData(chartDatas.totFarmRtData[0].rt)){
			$("[data-id=total-rank-irdsrate]").show();
			const totalRankIrdsrate = parseFloat(chartDatas.totFarmRtData[0].rt);
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
			if($.heum.hasData(chartDatas.getTotFramHouseRt[0].rt)){
				const farmHouseIrdsrate = parseFloat(chartDatas.getTotFramHouseRt[0].rt);
				$("[data-id=farm-people-rank-irdsrate]").removeClass("state-up state-down").text(Math.abs(farmHouseIrdsrate)+" %");
				if(farmHouseIrdsrate>0){
					$("[data-id=farm-people-rank-irdsrate]").addClass("state-up");
				}else if(farmHouseIrdsrate<0){
					$("[data-id=farm-people-rank-irdsrate]").addClass("state-down");
				}
			}else{
				$("[data-id=farm-people-rank-irdsrate]").hide();
			}
		}else{
			$("[data-id=farm-people-rank-irdsrate]").hide();
		}
	}
}
function createOwnerKindFarmChart(){
	var data = chartDatas.ownerKindFarmLand;
	createDonutChart({data:data,target:"owner-kind-farm-chart",colorData:["#20C894", "#599BD4", "#73C8CB", "#FFC000", "#B9D430","#E85757","#37A660", "#ED7D31","#74507B"],unit:null,tooltipCallback:function(d,i){
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
									' 경영형태별 농가',
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
								url: sgisContextPath + "/ServiceAPI/totSurv/farmDash/getTotFarm.json",
								data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd}, 
								dataType: "json",
								success: function(res) {
									if(res.errCd=="0"){
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.ownerKindFarmLand[i].dt));
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
function createFarmPayChart(){
	let max = 0;
	let colors = chartDatas.farmSale.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.farmSale.findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		rotate:true,
		target:"farm-pay-chart",
		data:chartDatas.farmSale,
		dataVal:"dt",
		columnVal:"itm_nm",
		color:colors,
		unit:"가구",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.farmSale[i].itm_nm}),
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
										' 농축산물 판매금액별 농가',
										$("<span/>",{"text":" - "+chartDatas.farmSale[i].itm_nm})
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
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.farmSale[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/farmDash/getTotFarm.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.farmSale[i].dt));
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

function createOwnerFarmScaleChart(){
	let max = 0;
	let colors = chartDatas.ownerFarmScale.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.ownerFarmScale.findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		rotate:true,
		target:"owner-scale-chart",
		data:chartDatas.ownerFarmScale,
		dataVal:"dt",
		columnVal:"itm_nm",
		unit:"가구",
		color:colors,
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.ownerFarmScale[i].itm_nm}),
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
										'경지 규모별 농가',
										$("<span/>",{"text":" - "+chartDatas.ownerFarmScale[i].itm_nm})
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
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.ownerFarmScale[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/farmDash/getTotFarm.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.ownerFarmScale[i].dt));
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


function createFarmAgeChart(){
	var data = chartDatas.ownerAge;
	$("#farm-age-chart").empty();
	var width = $("#farm-age-chart").outerWidth();
	var height = 250;

	var maxVal = d3.max(data, function(d){ return Number(d.dt) });
	//임시 end
	
	//기본셋팅
	var margin = ({top: 5, right: 50, bottom: 35, left: 40})
	var color = ["#4dc7ac","#4dc7ac","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#dd95da","#f5ca87","#f5ca87","#f5ca87","#f5ca87","#f5ca87"] //20201022 박은식 청년 장년 노년 연령 색상 변경
	
	var x = d3.scaleBand()
			.domain(data.map(function(d){ return d.itm_nm.replace("경영주연령별농가:", "")}))
			.rangeRound([margin.left, width - margin.right])
			.padding(0.5);
	var y1 = d3.scaleLinear()
			.domain([0, d3.max(data, function(d){ return Number(d.dt)*1.3 })]).nice()
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
	//타겟설정
	const chart = d3.select("#farm-age-chart");

	//차트 renderer시작
	const svg = chart.append("svg")
				.attr("height", height)
				.attr("width", width);
	
	
	svg.append("g")
		.attr("fill-opacity", 0.8)
		.selectAll("rect")
		.data(data)
		.join("rect")
		.attr("value", function(d){return d.itm_nm } )
		.attr("class", "eventGroup")
		.style("cursor", "pointer") //2020.11.03[신예리] 마우스 커서 추가
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
										'경영주 연령별 농가',
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
									url: sgisContextPath + "/ServiceAPI/totSurv/farmDash/getTotFarm.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd}, 
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.ownerAge[i].dt));
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
		.attr("fill",function(d){
			if(Number(d.itm_nm.replace("경영주연령별농가:", "").substring(0,2))>=20 && Number(d.itm_nm.replace("경영주연령별농가:", "").substring(0,2)) < 35) {
				return "#4dc7ac"
			} else if(Number(d.itm_nm.substring(0,2))>=35 && Number(d.itm_nm.substring(0,2)) < 65) {
				return "#dd95da"
			} else {
				return "#f5ca87"
			}
		})
		.attr("x", function(d){return (isNaN(x(d.itm_nm)+x.bandwidth()/2-15)) ? 80 : x(d.itm_nm)+x.bandwidth()/2-15 })
		.attr("width", 30)
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
		.attr("height",  function(d) {return y1(0) - y1(Number(d.dt)) })
		.attr("y", function(d){ return y1(Number(d.dt)) })
	//이벤트
	
		


	svg.append("g").attr("style", "color:#878A89; font-size:12px;") //2020.10.28[신예리] 폰트 사이즈 수정
		.selectAll("text")
	 	.data(data)
	 	.join("text")
	 	.style("cursor", "pointer")
	 	.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
	 	.on("click", function(d, i){
	 		console.log("[TODO]툴팁",d);
	 	})
	 	.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(d.itm_nm.replace("경영주연령별농가:", ""))+ x.bandwidth() / 2})
	 	.attr("y", function(d) { return y1(Number(d.dt))-10 })
	 	.text( function(d){ return $.heum.setThousandSeparator(d.dt)+"가구"; })//20201120 박은식 number format 변경


	svg.append("g")
		.attr("style", "font-size: 10.5px;") //2020.10.28[신예리] 폰트 사이즈 추가
		.call(xAxis);

 	
	svg.append("g")
		.attr("style", "font-size: 12px;") //2020.10.28[신예리] 폰트 사이즈 추가
		.call(y1Axis);
	
	$("#farm-age-chart").find("text").attr("fill", "#878A89")
	
}
function createOwnerCareerChart(){
	let max = 0;
	let colors = chartDatas.ownerCareer.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.ownerCareer.findIndex(x => parseFloat(x.dt) === max)] = mainColor;
	createVerticalBarChart({
		rotate:true,
		target:"owner-career-chart",
		data:chartDatas.ownerCareer,
		dataVal:"dt",
		columnVal:"itm_nm",
		unit:"가구",
		color:colors,
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.ownerCareer[i].itm_nm}),
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
										'경영주 농업 경력기간별 농가',
										$("<span/>",{"text":" - "+chartDatas.ownerCareer[i].itm_nm})
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
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.ownerCareer[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/farmDash/getTotFarm.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.ownerCareer[i].dt));
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