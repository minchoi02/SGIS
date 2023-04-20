let chartDatas = null;
function createTotSur(res,callback){
	$("#map-tooltip").hide();
	chartDatas = null;
	let total = 0;
	res.result.areaData.forEach(function(data){
		total+=parseInt(data.dt);
	});
	$("#total-number").text($.heum.setThousandSeparator(total));
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/houseHold/getTotHouseHold.json",
		data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.admCd}, // 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				chartDatas = res.result;
				setSummaryData();
				setOnePeopleHouseHoldChart();
				createOldPeopleChart();
				setChildrenChart();
				
				common_loading(false);
				if(typeof callback==="function"){
					callback();
				}
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
	$("[data-id=total-one-people-household]").text($.heum.setThousandSeparator(chartDatas.onePeopleInfo[0].dt));
	$("[data-id=total-old-people]").text($.heum.setThousandSeparator(parseFloat(chartDatas.sixtyFiveOver[0].dt)+parseFloat(chartDatas.sixtyFiveOver[1].dt)));
	$("#summary-container li[data-type=summary-00]").show();
	let onePeopleIrdsrate = parseFloat(chartDatas.onePeopleInfo[0].irdsrate).toFixed(2);
	$("[data-id=total-one-people-household-irdsrate]").removeClass("state-up state-down").text(Math.abs(onePeopleIrdsrate)+" %");
	if(onePeopleIrdsrate>0){
		$("[data-id=total-one-people-household-irdsrate]").addClass("state-up");
	}else if(onePeopleIrdsrate<0){
		$("[data-id=total-one-people-household-irdsrate]").addClass("state-down");
	}
	let oldPeopleIrdsrate = (parseFloat(chartDatas.sixtyFiveOver[0].irdsrate)+parseFloat(chartDatas.sixtyFiveOver[1].irdsrate)).toFixed(2);
	$("[data-id=total-old-people-irdsrate]").removeClass("state-up state-down").text(Math.abs(oldPeopleIrdsrate)+" %");
	if(oldPeopleIrdsrate>0){
		$("[data-id=total-old-people-irdsrate]").addClass("state-up");
	}else if(oldPeopleIrdsrate<0){
		$("[data-id=total-old-people-irdsrate]").addClass("state-down");
	}
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
			thema:$totSurvMap.ui.theme
		});
		$("[data-id=total-rank]").text(chartDatas.totalData[0].rank);
		$("[data-id=one-people-house-hold-rank]").text(chartDatas.onePeopleInfo[0].rank);
//		$("[data-id=old-people-rank]").text(chartDatas.old-people-rank[0].rank);
	}
}
function setOnePeopleHouseHoldChart(){
	chartDatas.onePeople[1].name="단독주택";
	chartDatas.onePeople[2].name="아파트";
	chartDatas.onePeople[3].name="연립주택";
	chartDatas.onePeople[4].name="다대주택";
	chartDatas.onePeople[5].name="비거주용건물내 주택";
	chartDatas.onePeople[6].name="주택이외의 거처";
	let max = 0;
	let colors = [...new Array(6)].map((d,index)=>{
		max = Math.max(max,parseFloat(chartDatas.onePeople[index].dt));
		return "#747474";
	});
	colors[chartDatas.onePeople.findIndex(x => parseFloat(x.dt) === max)] = "#cf2c13";
	createVerticalBarChart({
		rotate : true,
		target:"one-people-house-hold-chart",
		data:chartDatas.onePeople.slice(1,7),
		dataVal:"dt",
		columnVal:"name",
		color:colors,
		unit:"가구",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.onePeople[i+1].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.onePeople[i+1].dt)}),"가구"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'1인 가구의 거처 종류',
										$("<span/>",{"text":" - "+chartDatas.onePeople[i+1].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.onePeople[i+1].itm_nm}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"region-name","text":$totSurvMap.ui.tooltipMap.selectedAdmNm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.onePeople[i+1].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/houseHold/getTotHouseHold.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.onePeople[i+1].dt));
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
function createOldPeopleChart(){
	let max = 0;
	const names = ["가구원모두65세이상","가구원65세이상+65세미만","가구원65세이상없음"];
	let labels = chartDatas.sixtyFiveOver.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return {
			name:names[index]
		};
	});
	/*let labels = chartDatas.sixtyFiveOver.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return {
			name:names[index],
			color:"#cf2c13"
		};
	});
	labels[chartDatas.sixtyFiveOver.findIndex(x => parseFloat(x.dt) === max)].color = "#c9c9c9";*/
	createPieChart({
		target:"old-people-chart",
		data:chartDatas.sixtyFiveOver,
		labels:labels,
		unit:"가구",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			console.log($(this));
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.sixtyFiveOver[i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.sixtyFiveOver[i].dt)}),"가구"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'고령자(65세 이상) 가구',
										$("<span/>",{"text":" - "+chartDatas.sixtyFiveOver[i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.sixtyFiveOver[i].itm_nm}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"region-name","text":$totSurvMap.ui.tooltipMap.selectedAdmNm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.sixtyFiveOver[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/houseHold/getTotHouseHold.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.sixtyFiveOver[i].dt));
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
function setChildrenChart(){
	let max = 0;
	let colors = chartDatas.children.map((d,index)=>{
		max = Math.max(max,parseFloat(d.dt));
		return "#747474";
	});
	colors[chartDatas.children.findIndex(x => parseFloat(x.dt) === max)] = "#cf2c13";
	createVerticalBarChart({
		target:"children-chart",
		data:chartDatas.children,
		dataVal:"dt",
		columnVal:"itm_nm",
		color:colors,
		unit:"가구",
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.children[i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.children[i].dt)}),"가구"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'자녀수별 가구',
										$("<span/>",{"text":" - "+chartDatas.children[i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.children[i].itm_nm}),
										$("<a/>",{"class":"btn__cancel"}).click(function(){
											$('#tooltip-map-tooltip').hide(); 
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									),
									$("<div/>",{"class":"modal__body"}).append(
										$("<p/>").append(
											$("<span/>",{"class":"color-blue font-large fwbold","data-id":"region-name","text":$totSurvMap.ui.tooltipMap.selectedAdmNm})
										),
										$("<p/>").append(
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.children[i].dt)}),"가구"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/houseHold/getTotHouseHold.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.children[i].dt));
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