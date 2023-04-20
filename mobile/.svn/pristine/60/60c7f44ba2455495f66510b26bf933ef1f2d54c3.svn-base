let chartDatas = null;
function createTotSur(res,callback){
	$("#map-tooltip").hide();
	chartDatas = null;
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/houseDash/getTotHouse.json",
		data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.admCd}, // 
		dataType: "json",
		success: function(res) {
			if(res.errCd=="0"){
				chartDatas = res.result;
				setSummaryData();
				createHouseInRoom();
				createKindHouseChart();
				createEmptyHouseChart();
				
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
	if($totSurvMap.ui.admCd=="00"){
		$("#total-number").text($.heum.setThousandSeparator(chartDatas.initRank[0].dt));
		$("[data-id=total-empty-house]").text($.heum.setThousandSeparator(chartDatas.initRank[1].dt));
		const emptyHouseIrdsrate = parseFloat(chartDatas.initRank[1].irdsrate);
		$("[data-id=total-empty-house-irdsrate]").removeClass("state-up state-down").text(Math.abs(emptyHouseIrdsrate)+" %");
		if(emptyHouseIrdsrate>0){
			$("[data-id=total-empty-house-irdsrate]").addClass("state-up");
		}else if(emptyHouseIrdsrate<0){
			$("[data-id=total-empty-house-irdsrate]").addClass("state-down");
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
			url: sgisContextPath + "/ServiceAPI/totSurv/houseDash/getTotHouseRank.json",
			data: { year: $totSurvMap.ui.year, regionCd : $totSurvMap.ui.admCd, level:level}, // 
			dataType: "json",
			success: function(res) {
				$("#total-number").text($.heum.setThousandSeparator(res.result.houseRankData[0].dt));
				$("[data-id=total-rank]").text(res.result.houseRankData[0].rank);
				if($.heum.hasData(res.result.houseRankData[0].irdsrate)){
					$("[data-id=total-rank-irdsrate]").show();
					const totalRankIrdsrate = parseFloat(res.result.houseRankData[0].irdsrate);
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
				$("[data-id=total-empty-house]").text($.heum.setThousandSeparator(res.result.emptyRankData[0].dt));
				$("[data-id=empty-rank]").text(res.result.emptyRankData[0].rank);
				if($.heum.hasData(res.result.emptyRankData[0].irdsrate)){
					const emptyHouseIrdsrate = parseFloat(res.result.emptyRankData[0].irdsrate);
					$("[data-id=empty-rank-irdsrate]").removeClass("state-up state-down").text(Math.abs(emptyHouseIrdsrate)+" %");
					if(emptyHouseIrdsrate>0){
						$("[data-id=empty-rank-irdsrate]").addClass("state-up");
					}else if(emptyHouseIrdsrate<0){
						$("[data-id=empty-rank-irdsrate]").addClass("state-down");
					}else{
						if($totSurvMap.ui.year=="2015"){
							$("[data-id=empty-rank-irdsrate]").hide();
						}
					}
				}else{
					$("[data-id=empty-rank-irdsrate]").hide();
				}
			},
			error: function(e) {
				alert('failed');
			}
		});
		$("[data-id=total-rank]").text(chartDatas.totalData[0].rank);
	}
}

function createHouseInRoom(){
	createVerticalBarChart({
		rotate:true,
		target:"house-in-room-chart",
		data:chartDatas.houseInRoomCount,
		dataVal:"dt",
		columnVal:"itm_nm",
		unit:"호",
		color:["#D55905","#DF7800","#F6992D","#FDB863","#FFD095","#FFE6C4"],
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.houseInRoomCount[i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.houseInRoomCount[i].dt)}),"호"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'주택 종류별 규모',
										$("<span/>",{"text":" - "+chartDatas.houseInRoomCount[i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.houseInRoomCount[i].itm_nm}),
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
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.houseInRoomCount[i].dt)}),"호"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/houseDash/getTotHouse.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.houseInRoomCount[i].dt));
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
function createKindHouseChart(){
	createVerticalBarChart({
		rotate:true,
		target:"kind-house-chart",
		unit:"호",
		data:chartDatas.kindHouseData,
		dataVal:"dt",
		columnVal:"c1_nm",
		color:["#D55905","#DF7800","#F6992D","#FDB863","#FFD095","#FFE6C4"],
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.kindHouseData[i].itm_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.kindHouseData[i].dt)}),"호"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'거처 종류별 규모',
										$("<span/>",{"text":" - "+chartDatas.kindHouseData[i].itm_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.kindHouseData[i].itm_nm}),
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
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.kindHouseData[i].dt)}),"호"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/houseDash/getTotHouse.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.kindHouseData[i].dt));
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
function createEmptyHouseChart(){
	createVerticalBarChart({
		target:"empty-house-chart",
		data:chartDatas.emptyHouse,
		dataVal:"dt",
		columnVal:"c1_nm",
		unit:"호",
		color:["#D55905","#DF7800","#F6992D","#FDB863","#FFD095","#FFE6C4"],
		rotate: true,
		tooltipCallback:function(d,i){
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.emptyHouse[i].c1_nm}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(chartDatas.emptyHouse[i].dt)}),"호"
					),
					$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
						$totSurvMap.ui.tooltipMap.show({
							tooltipCallback:function(){
								$("#tooltip-map-modal-title").empty().append(
									$("<p>",{"text":$totSurvMap.ui.year+'년 '+$totSurvMap.ui.tooltipMap.selectedAdmNm}),
									$("<h3/>").append(
										'주택 종류별 빈집 규모',
										$("<span/>",{"text":" - "+chartDatas.emptyHouse[i].c1_nm})
									),
									$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
										$('#tooltip-map-container').hide();
										$('.dim').hide();
										return false;
									}).append($("<span/>",{"class":"btn-close btn-close--black"}))
								);
								$("#tooltip-map-tooltip").empty().append(
									$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
										$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartDatas.emptyHouse[i].c1_nm}),
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
											$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartDatas.emptyHouse[i].dt)}),"호"
										)
									)
								);
							},
							didSelectedPolygon : function(callback){
								$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
								$.ajax({
									method: "POST",
									async: true,
									url: sgisContextPath + "/ServiceAPI/totSurv/houseDash/getTotHouse.json",
									data: { year: $totSurvMap.ui.year, region_cd : $totSurvMap.ui.tooltipMap.selectedAdmCd},
									dataType: "json",
									success: function(res) {
										if(res.errCd=="0"){
											$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
											$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(res.result.emptyHouse[i].dt));
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

