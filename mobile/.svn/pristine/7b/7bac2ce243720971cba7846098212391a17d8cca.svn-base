let chartDatas = null, $farm = {};
const mainColor = "#9a673e";
function createTotSur(callback){
	$("#map-tooltip").hide();
	setSummaryData();
	if(typeof callback ==="function"){
		callback();
	}
}
let currentSummaryData = null,beforeSummaryData=null;
let chartDataObject = {};
function setRank(){
	var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.ajaxParams);
//	let parameters = $.extend(true,{},themeInfo.mapData.getParameters());
	var level = 'sido';

	if($totSurvMap.ui.admCd.length == 2){ // 2020-10-14 [박은식] 랭킹 조회 조건 변경
		level = 'sido';
	} else if($totSurvMap.ui.admCd.length == 5 && $totSurvMap.ui.admCd.substring(4) != '0') {
		level = 'atdrc';// atdrc
	} else if($totSurvMap.ui.admCd.length == 5 && $totSurvMap.ui.admCd.substring(4) == '0') {
		level ='sgg';
	} else {
		level ='emdong';
	}
	parameters.char_itm_id_list = "T10,T20,T30";
	parameters.prt_type = "total";
	parameters.adm_unit = $totSurvMap.ui.getAreaBndryParameters().area_bndry_se;
	parameters[themeInfo.mapData.admLv] = "";
	if($totSurvMap.ui.admCd.length == 2) {
		parameters.adm_cd = themeInfo.mapData.admLv.split("_")[1] + ":00";
	} else {				
		parameters.adm_cd = $totSurvMap.ui.isAtdrc 
		? themeInfo.mapData.admLv.split("_")[1] + ":" + $totSurvMap.ui.admCd.substring(0,4)
		: themeInfo.mapData.admLv.split("_")[1] + ":" + $totSurvMap.ui.admCd;
	}
	parameters.adm_unit = level;
	$.ajax({
		type:"GET",
//		url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
		url: sgis4thApiPath,
		async: true,
 		data: parameters,
		success:function( result ){
			let ecnmyRank = {};
			if( result ){
				for(var i=0; i<result.length; i++) {
					if(ecnmyRank[result[i].CHAR_ITM_ID] == undefined) {
						ecnmyRank[result[i].CHAR_ITM_ID] = [];
					}
					if($totSurvMap.ui.isAtdrc) {
						if(parameters.adm_unit == "sgg") {
							if(result[i].ADM_CD.length == 5 && result[i].ADM_CD.substring(4,5) == "0") {										
								if(result[i] != null && result[i].CHAR_ITM_ID == "T10") { // T10 사업체수										
									ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
								} else if(result[i] != null && result[i].CHAR_ITM_ID == "T20") { // T20 종사자수
									ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
								} else if(result[i] != null && result[i].CHAR_ITM_ID == "T30") { // T30 매출액 
									ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
								}
							}
						} else {
							if(result[i].ADM_CD.length == 5 && result[i].ADM_CD.substring(4,5) != "0") {										
								if(result[i] != null && result[i].CHAR_ITM_ID == "T10") { // T10 사업체수										
									ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
								} else if(result[i] != null && result[i].CHAR_ITM_ID == "T20") { // T20 종사자수
									ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
								} else if(result[i] != null && result[i].CHAR_ITM_ID == "T30") { // T30 매출액 
									ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
								}
							}
						}
					} else {
						if(result[i].ADM_CD.length == 2 || (result[i].ADM_CD.length == 5 && result[i].ADM_CD.substring(4,5) == "0")) {
							if(result[i] != null && result[i].CHAR_ITM_ID == "T10") { // T10 사업체수										
								ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
							} else if(result[i] != null && result[i].CHAR_ITM_ID == "T20") { // T20 종사자수
								ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
							} else if(result[i] != null && result[i].CHAR_ITM_ID == "T30") { // T30 매출액 
								ecnmyRank[result[i].CHAR_ITM_ID].push(result[i]);
							}
						}
					}
				}
			}
			["T10","T20","T30"].forEach(key=>{
				try{
					const rank = ecnmyRank[key].findIndex(item=>item.ADM_CD==$totSurvMap.ui.admCd);
					if(rank){
						if(key=="T10"){
							$("#map-tooltip [data-id=rank]").text(rank+"위 ");
						}
						$("[data-id=total-rank-"+key+"]").text(rank);
					}
				}catch(e){
					console.error(e);
				}
			})
		},
		error:function(data) {
			console.error(data);
		}
	});
}
function setSummaryData(res,isMove){
	if(isMove!==true){
		$("[data-id^=total-number-rt]").hide();
		$("[data-id$=-T10],[data-id$=-T20],[data-id$=-T30]").empty();
	}
	$("[id$=-chart]").empty();
	if($.heum.hasData(res)){
		$("#tree-map").empty();
	}
	let result = {};
	function _getData(parameters,callback){
		parameters.char_itm_id_list = "T10,T20,T30";
		parameters[$totSurvMap.ui.themeData.ecnmy.mapData.admLv] = "";
		parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] = "0";
		$.ajax({
			type:"GET",
//			url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
			url: sgis4thApiPath,
			async: false,
	 		data: parameters,
			success:function( res ){
				callback(res);
			},
			error:function(data) {
				console.error(data);
			}
		});
		
	}
	function _setYearData({res,basket,yearName}){
		if( res ){
			res.forEach(function(data){
				basket[yearName] = basket[yearName]||{};
				basket[yearName][data.CHAR_ITM_ID] = basket[yearName][data.CHAR_ITM_ID]||[];
				basket[yearName][data.CHAR_ITM_ID].push(data);
			});
		}
	}
	function _process(){
		let datas = {};
		function _getDataYear(basket,yearType){
			if(basket[yearType]){
				["T10","T20","T30"].forEach(dataType=>{
					basket[yearType][dataType].forEach((data,index)=>{
						let isValid = data.ADM_CD.toString()==$totSurvMap.ui.admCd.toString();
						if(data.ADM_CD!="00"){
							data.rank = index;
							data.parent = data.UP_ADM_CD;
							isValid = data.ADM_CD.toString().startsWith($totSurvMap.ui.admCd.toString());
						}
						if(isValid){
							datas[yearType] = datas[yearType]||{};
							datas[yearType][dataType] = $.extend(true,{},data);
							datas[yearType][dataType].rank = index;
						}
					});
				});
			}
		}
		_getDataYear(result,"current");
		_getDataYear(result,"before");
		if(isMove!==true){
			if($totSurvMap.ui.admCd!="00"){
//				$("#map-tooltip [data-id=rank]").text(datas.current.T10.rank+"위 ");
				if($totSurvMap.ui.admCd.length == 2){
					$("#ranking").empty().append(
						result.current.T10.length-1 + "개 광역시도 중 순위",
						$("<a/>",{"href":"#","class":"notice notice--gray"}).click(function(){
							$('#ranking-tooltip').show();
							return false;
						})
					);
				}else if($totSurvMap.ui.admCd.length == 5){
					if($totSurvMap.ui.admCd.substring(4,5) == "0"){
						$("#ranking").empty().append(
							result.current.T10.length-1 + "개 시·군·구 중 순위",
							$("<a/>",{"href":"#","class":"notice notice--gray"}).click(function(){
								$('#ranking-tooltip-2').show();
								return false;
							})
						);
					} else {
						$("#ranking").empty().append(
							result.current.T10.length-1 + "개 비자치구 중 순위",
							$("<a/>",{"href":"#","class":"notice notice--gray"}).click(function(){
								$('#ranking-tooltip-3').show();
								return false;
							})
						);
					}
				}
//				$("[data-id=total-rank-T10]").text(datas.current.T10.rank);
//				$("[data-id=total-rank-T20]").text(datas.current.T20.rank);
//				$("[data-id=total-rank-T30]").text(datas.current.T30.rank);
				setRank();
				$("[data-type=summary-others]").show();
			}else{
				$("[data-type=summary-others]").hide();
			}
		}
		
		if(datas.before){
			["T10","T20","T30"].forEach(dataType=>{
				let workerRatio = ((parseInt(datas.before[dataType].DTVAL_CO)-parseInt(datas.current[dataType].DTVAL_CO))/parseInt(datas.before[dataType].DTVAL_CO)*100).toFixed(1);
				let increaseVal = parseInt(datas.before[dataType].DTVAL_CO)-parseInt(datas.current[dataType].DTVAL_CO);
				$("[data-id=total-number-data-"+dataType+"]").text("("+$.heum.setThousandSeparator(Math.abs(increaseVal))+" "+(increaseVal<0?"증가":increaseVal>0?"감소":"")+")");
				$("[data-id=total-number-rt-"+dataType+"]").removeClass("state-up state-down").text("전주기 대비 "+Math.abs(workerRatio)+" %").show();
//				if(workerRatio>0){
//					$("[data-id=total-number-rt-"+dataType+"]").addClass("state-up");
//				}else if(workerRatio<0){
//					$("[data-id=total-number-rt-"+dataType+"]").addClass("state-down");
//				}
			});
		} else {
			["T10","T20","T30"].forEach(dataType=>{
				$("[data-id=total-number-data-"+dataType+"]").text("");
				$("[data-id=total-number-rt-"+dataType+"]").removeClass("state-up state-down").text("전주기 자료 없음").show();
			});
		}
		
		["T10","T20","T30"].forEach(dataType=>{
			$("[data-id=total-number-"+dataType+"]").text($.heum.setThousandSeparator(datas.current[dataType].DTVAL_CO));
		});
		if($.heum.hasData(res)){
			let tree;
			if($totSurvMap.ui.admCd=="00"){
				tree = result.current.T10.slice(1,result.current.T10.length-1);
			}else{
				tree = result.current.T10;
			}
			tree.push({"ADM_CD":$totSurvMap.ui.admCd,"DTVAL_CO":"0"});
			createTileMapChart(tree,"tree-map","DTVAL_CO","ADM_CD","ADM_KOR","수","사업체 수");
		}
		createCorpCountOfIndustryChart();
		createWorkerCountOfIndustryChart();
		createSalesOfIndustryChart();
		createProfitRatioOfIndustryChart();
		createWorkerCompositionChart();
		
		common_loading(false);
	}
	
	if($.heum.hasData(res)){
		currentSummaryData = res;
		beforeSummaryData = null;
	}else{
		_setYearData({res:beforeSummaryData,basket:result,yearName:"before"});
	}
	//_setYearData({res:currentSummaryData,basket:result,yearName:"current"});
	
	//if(beforeSummaryData==null){
		//const beforeYearButton = $("#year-list button[data-value="+$totSurvMap.ui.year+"]").next();
		const currentYearButton = $("#year-list button[data-value="+$totSurvMap.ui.year+"]");
		let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters(currentYearButton.data("value")));
		_getData(parameters,function(res){
			currentSummaryData = res;
			_setYearData({res,basket:result,yearName:"current"});
		});
		
		const beforeYearButton = $("#year-list button[data-value="+$totSurvMap.ui.year+"]").next();
		if(beforeYearButton.length>0){
			let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters(beforeYearButton.data("value")));
			_getData(parameters,function(res){
				beforeSummaryData = res;
				_setYearData({res,basket:result,yearName:"before"});
				_process();
			});
		}else{
			_process();
		}
	//}else{
	//	_process();
	//}
}
function getCorpCountOfIndustryData({admCd,callback}){
	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters($totSurvMap.ui.year));
//	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters());
	parameters.char_itm_id_list = "T10"; //사업체 수
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.admLv] = admCd;
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] = "";				
	parameters.adm_cd = "";
	parameters.adm_unit = "total";
	parameters.odr_col_list = "DTVAL_CO";
	parameters.odr_type = "DESC";		
	for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[1].length; i++) {
		if($totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].objVarId != "13999001") {
			if(parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv].length > 0) {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += "," + $totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].itmId;
			} else {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += $totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].itmId;
			}
		}
	}
	$.ajax({
		type:"GET",
//		url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
		url: sgis4thApiPath,
		async: false,
 		data: parameters,
		success:function( res ){
			if( res ){
				let sumColId, sumOrd;							
				for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[1].length; i++) {
					if($totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].objVarId != "13999001" && $totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].subsumYn == "Y") {
						sumColId = $totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].itmId;
						sumOrd = $totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].varOrd; 
					}
				}
				
				let itmLvId = "OV_L" + sumOrd + "_ID";
				let itmLvSn = "OV_L" + sumOrd + "_SN";
				
				for(var i=0; i<res.length; i++) {
					if(res[i][itmLvId] == sumColId) {
						res.splice(i, 1);
					}
				}
				res.sort(function(a, b) { return a[itmLvSn] - b[itmLvSn] }); //정렬
				let chartData = [], colors = [];
				let chartOpt = $totSurvMap.ui.themeData.ecnmy.dispOptions[1][0];
				let max = 0;
				for(var i=0; i<res.length; i++) {
					let dtval = (res[i].DTVAL_CO != undefined ? res[i].DTVAL_CO : 0);
					let dataObj = {dt:parseInt(Math.round(dtval))}
					max = Math.max(max,parseFloat(dataObj.dt));
					for(var j=0; j<$totSurvMap.ui.themeData.ecnmy.dispOptions[1].length; j++) {			
						if($totSurvMap.ui.themeData.ecnmy.dispOptions[1][j].itmId == res[i]["OV_"+$totSurvMap.ui.themeData.ecnmy.mapData.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
							dataObj.itm_nm = $totSurvMap.ui.themeData.ecnmy.dispOptions[1][j].altrtvDispWrd;
							dataObj.itm_id = $totSurvMap.ui.themeData.ecnmy.dispOptions[1][j].itmId;
						}
					}
					if(!$.heum.hasData(dataObj.itm_nm)) {
						dataObj.itm_nm = res[i].OV_L2_KOR;
						dataObj.itm_id = res[i].OV_L2_ID;
					}
					chartData.push(dataObj);
					colors.push("#747474");
				}
				colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = $totSurvMap.ui.themeData.ecnmy.defaultColor;
				chartDataObject.corpCountOfIndustry = res;
				if(typeof callback === "function"){
					callback({
						chartData,
						colors
					});
				}
			}
		},
		error:function(data) {
			console.error(data);
		}
	});
}
function createCorpCountOfIndustryChart(){
	getCorpCountOfIndustryData({admCd:$totSurvMap.ui.admCd,callback:function({chartData,colors}){
//		createVerticalBarChart({
		//createHorizontalBarChart({
		createVerticalBarChart({
			rotate:true,
			target:"corp-count-of-industry-chart",
			data:chartData,
			dataVal:"dt",
			columnVal:"itm_nm",
			color:colors,
			unit:"천개",
			rotate: true,
			unitVal: 1000,
			tooltipCallback:function(d,i){
				const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
				tooltip.empty();
				tooltip.append(
					$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
						$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartData[i].itm_nm}),
						$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
							$(this).parents('[data-type=tooltip]').hide();
							return false;
						}).append($("<span/>",{"class":"btn-close btn-close--black"}))
					),
					$("<div/>",{"class":"modal__body"}).append(
						$("<p/>").append(
							$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"개"
						),
						$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
							let ecnmyTypeName = "";
							if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy9th"){
								ecnmyTypeName = "9차 산업분류"; 
							}else if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy10th"){
								ecnmyTypeName = "10차 산업분류"; 
							}
							$totSurvMap.ui.tooltipMap.show({
								tooltipCallback:function(){
									$("#tooltip-map-modal-title").empty().append(
										$("<p>",{"text":$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+ecnmyTypeName}),
										$("<h3/>").append(
											$totSurvMap.ui.year+'년 산업별 사업체 수',
											$("<span/>",{"text":" - "+chartData[i].itm_nm})
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
												$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"개"
											)
										)
									);
								},
								didSelectedPolygon : function(callback){
									const itemId = chartData[i].itm_id;
									getCorpCountOfIndustryData({admCd:$totSurvMap.ui.tooltipMap.selectedAdmCd,callback:function({chartData,colors}){
										$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
										chartData.some((data)=>{
											if(data.itm_id==itemId){
												$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(data.dt));
												return true;
											}
										});
										if(typeof callback==="function"){
											callback();
										}
									}});
								}
							});
							$("#tooltip-map-tooltip").show();
						})
					)
				);
				tooltip.show();
			}
		});
	}});
	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.ajaxParams);
//	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters());
	parameters.char_itm_id_list = "T10"; //사업체 수
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.admLv] = $totSurvMap.ui.admCd;
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] = "";				
	parameters.adm_cd = $totSurvMap.ui.admCd=="00"?"":$totSurvMap.ui.admCd;
	parameters.adm_unit = "total";
	parameters.odr_col_list = "DTVAL_CO";
	parameters.odr_type = "DESC";		
	for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[1].length; i++) {
		if($totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].objVarId != "13999001") {
			if(parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv].length > 0) {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += "," + $totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].itmId;
			} else {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += $totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].itmId;
			}
		}
	}
}
function getWorkerCountOfIndustryData({admCd,callback}){
	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.ajaxParams);
//	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters());
	parameters.char_itm_id_list = "T201,T202"; //종사자 수
	//parameters.char_itm_id_list = "T21,T22"; //종사자 수
	for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[2].length; i++) {
		if($totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].objVarId == "13999001") {
			if(parameters.char_itm_id_list.length > 0) {
				parameters.char_itm_id_list += "," + $totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].itmId;
			} else {
				parameters.char_itm_id_list += $totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].itmId;
			}
		}
	}
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.admLv] = admCd;
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] = "";				
	parameters.odr_col_list = "DTVAL_CO";
	parameters.odr_type = "DESC";
	for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[2].length; i++) {
		if($totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].objVarId != "13999001") {
			if(parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv].length > 0) {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += "," + $totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].itmId;
			} else {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += $totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].itmId;
			}
		}
	}
	$.ajax({
		type:"GET",
//		url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
		url: sgis4thApiPath,
		async: false,
 		data: parameters,
		success:function( res ){
			if( res ){
				let sumColId, sumOrd;							
				for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[2].length; i++) {
					if($totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].objVarId != "13999001" && $totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].subsumYn == "Y") {
						sumColId = $totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].itmId;
						sumOrd = $totSurvMap.ui.themeData.ecnmy.dispOptions[2][i].varOrd; 
					}
				}
				
				let itmLvId = "OV_L" + sumOrd + "_ID";
				let itmLvSn = "OV_L" + sumOrd + "_SN";
				let resultArr = [];
				res.forEach(function(item, index, object) { 
					if(item[itmLvId] != sumColId) {
						resultArr.push(item);
					}
				});
				
				resultArr.sort(function(a, b) { return a[itmLvSn] - b[itmLvSn] }); //정렬
				let stacked = {};
				for(var i=0; i<resultArr.length; i++) {
					if(stacked[resultArr[i].CHAR_ITM_ID] != undefined) {
						stacked[resultArr[i].CHAR_ITM_ID].push(resultArr[i]);
					} else {
						stacked[resultArr[i].CHAR_ITM_ID] = [];
						stacked[resultArr[i].CHAR_ITM_ID].push(resultArr[i]);
					}
				}
				let categories = [];
				for(var i=0; i<stacked[Object.keys(stacked)[0]].length; i++) {
					let stack = stacked[Object.keys(stacked)[0]][i];
					var isAlready = false;
					for(var j=0; j<$totSurvMap.ui.themeData.ecnmy.dispOptions[2].length; j++) {			
						if($totSurvMap.ui.themeData.ecnmy.dispOptions[2][j].itmId == stack["OV_"+$totSurvMap.ui.themeData.ecnmy.mapData.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
							categories.push($totSurvMap.ui.themeData.ecnmy.dispOptions[2][j].altrtvDispWrd);
							isAlready = true;	
						}
					}
					if(!isAlready) {
						categories.push(stack.OV_L2_KOR);
					}
				}
				let columns = Object.keys(stacked);
				let series = [];
				let datas = [];
				const epn = ($totSurvMap.ui.themeData.ecnmy.dispOptions[2][0].dispUnit/$totSurvMap.ui.themeData.ecnmy.dispOptions[2][0].kosisUnit);
				stacked[columns[0]].forEach((data,index)=>{
					let d = {};
					
					let s = [parseInt(data.DTVAL_CO/epn)];
					d[columns[0]] = parseInt(data.DTVAL_CO/epn);
					columns.slice(1).forEach(key=>{
						const value = parseInt(stacked[key][index].DTVAL_CO/epn);
						d[key] = value;
						s.push(value);
					})
					d.category = categories[index];
					series.push(s);
					datas.push(d);
				});
				createStackBarChart({rotate:true,unit:"천명",target:"worker-count-of-industry-chart",data:datas,columns:columns,colors:["#ff5253","#23b7d1"],category:categories,tooltipCallback:function(d,i){
					const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
					tooltip.empty();
					tooltip.append(
						$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
							$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+categories[i]}),
							$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
								$(this).parents('[data-type=tooltip]').hide();
								return false;
							}).append($("<span/>",{"class":"btn-close btn-close--black"}))
						),
						$("<div/>",{"class":"modal__body"}).append(
							$("<p/>").append(
								"남자 : ",$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(stacked.T201[i].DTVAL_CO)}),"명"
							),
							$("<p/>").append(
								"여자 : ",$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(stacked.T202[i].DTVAL_CO)}),"명"
							)
						)
					);
					tooltip.show();
				}});
			}
		},
		error:function(data) {
			console.error(data);
		}
	});
}
function createWorkerCountOfIndustryChart(){
	getWorkerCountOfIndustryData({admCd:$totSurvMap.ui.admCd,callback:function({chartData,colors}){
	}});
}
function getSalesOfIndustryChartData({admCd,callback}){
	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.ajaxParams);
//	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters());
	parameters.char_itm_id_list = "T30"; //산업별 매출액
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.admLv] = admCd;
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] = "";				
	parameters.adm_cd = "";
	parameters.adm_unit = "total";
	parameters.odr_col_list = "DTVAL_CO";
	parameters.odr_type = "DESC";		
	for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[3].length; i++) {
		if($totSurvMap.ui.themeData.ecnmy.dispOptions[3][i].objVarId != "13999001") {
			if(parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv].length > 0) {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += "," + $totSurvMap.ui.themeData.ecnmy.dispOptions[3][i].itmId;
			} else {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += $totSurvMap.ui.themeData.ecnmy.dispOptions[3][i].itmId;
			}
		}
	}
	$.ajax({
		type:"GET",
//		url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
		url: sgis4thApiPath,
		async: false,
 		data: parameters,
		success:function( res ){
			if( res ){
				let sumColId, sumOrd;							
				for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[3].length; i++) {
					if($totSurvMap.ui.themeData.ecnmy.dispOptions[3][i].objVarId != "13999001" && $totSurvMap.ui.themeData.ecnmy.dispOptions[3][i].subsumYn == "Y") {
						sumColId = $totSurvMap.ui.themeData.ecnmy.dispOptions[3][i].itmId;
						sumOrd = $totSurvMap.ui.themeData.ecnmy.dispOptions[3][i].varOrd; 
					}
				}
				
				let itmLvId = "OV_L" + sumOrd + "_ID";
				let itmLvSn = "OV_L" + sumOrd + "_SN";
				
				for(var i=0; i<res.length; i++) {
					if(res[i][itmLvId] == sumColId) {
						res.splice(i, 1);
					}
				}
				res.sort(function(a, b) { return a[itmLvSn] - b[itmLvSn] }); //정렬
				let chartData = [], colors = [];
				let chartOpt = $totSurvMap.ui.themeData.ecnmy.dispOptions[3][0];
				let max = 0;
				for(var i=0; i<res.length; i++) {
					let dtval = (res[i].DTVAL_CO != undefined ? res[i].DTVAL_CO : 0);
					let dataObj = {dt:parseInt(Math.round(dtval/(chartOpt.dispUnit/chartOpt.kosisUnit)))}
					max = Math.max(max,parseFloat(dataObj.dt));
					for(var j=0; j<$totSurvMap.ui.themeData.ecnmy.dispOptions[3].length; j++) {			
						if($totSurvMap.ui.themeData.ecnmy.dispOptions[3][j].itmId == res[i]["OV_"+$totSurvMap.ui.themeData.ecnmy.mapData.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
							dataObj.itm_nm = $totSurvMap.ui.themeData.ecnmy.dispOptions[3][j].altrtvDispWrd;
							dataObj.itm_id = $totSurvMap.ui.themeData.ecnmy.dispOptions[3][j].itmId;
						}
					}
					if(!$.heum.hasData(dataObj.itm_nm)) {
						dataObj.itm_nm = res[i].OV_L2_KOR;
						dataObj.itm_id = res[i].OV_L2_ID;
					}
					chartData.push(dataObj);
					colors.push("#747474");
				}
				colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = $totSurvMap.ui.themeData.ecnmy.defaultColor;
				chartDataObject.salesOfIndustry = res;
				if(typeof callback === "function"){
					callback({
						chartData,
						colors
					});
				}
			}
		},
		error:function(data) {
			console.error(data);
		}
	});
}
function createSalesOfIndustryChart(){
	getSalesOfIndustryChartData({admCd:$totSurvMap.ui.admCd,callback:function({chartData,colors}){
		createVerticalBarChart({
			rotate:true,
			target:"sales-of-industry-chart",
			data:chartData,
			dataVal:"dt",
			columnVal:"itm_nm",
			unit:"백만원",
			color:colors,
			tooltipCallback:function(d,i){
				const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
				tooltip.empty();
				tooltip.append(
					$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
						$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartData[i].itm_nm}),
						$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
							$(this).parents('[data-type=tooltip]').hide();
							return false;
						}).append($("<span/>",{"class":"btn-close btn-close--black"}))
					),
					$("<div/>",{"class":"modal__body"}).append(
						$("<p/>").append(
							$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"백만원"
						),
						$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
							let ecnmyTypeName = "";
							if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy9th"){
								ecnmyTypeName = "9차 산업분류"; 
							}else if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy10th"){
								ecnmyTypeName = "10차 산업분류"; 
							}
							$totSurvMap.ui.tooltipMap.show({
								tooltipCallback:function(){
									$("#tooltip-map-modal-title").empty().append(
										$("<p>",{"text":$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+ecnmyTypeName}),
										$("<h3/>").append(
											$totSurvMap.ui.year+'년 산업별 사업체 수',
											$("<span/>",{"text":" - "+chartData[i].itm_nm})
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
												$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"백만원"
											)
										)
									);
								},
								didSelectedPolygon : function(callback){
									const itemId = chartData[i].itm_id;
									getSalesOfIndustryChartData({admCd:$totSurvMap.ui.tooltipMap.selectedAdmCd,callback:function({chartData,colors}){
										$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
										chartData.some((data)=>{
											if(data.itm_id==itemId){
												$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(data.dt));
												return true;
											}
										});
										if(typeof callback==="function"){
											callback();
										}
									}});
								}
							});
							$("#tooltip-map-tooltip").show();
						})
					)
				);
				tooltip.show();
			}
		});
	}});
}

function getProfitRatioOfIndustryChartData({admCd,callback}){
	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.ajaxParams);
//	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters());
	parameters.char_itm_id_list = "T50"; //영업 이익률
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.admLv] = admCd;
	parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] = "";				
	parameters.adm_cd = "";
	parameters.adm_unit = "total";
	parameters.odr_col_list = "DTVAL_CO";
	parameters.odr_type = "DESC";		
	for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[4].length; i++) {
		if($totSurvMap.ui.themeData.ecnmy.dispOptions[4][i].objVarId != "13999001") {
			if(parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv].length > 0) {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += "," + $totSurvMap.ui.themeData.ecnmy.dispOptions[4][i].itmId;
			} else {
				parameters[$totSurvMap.ui.themeData.ecnmy.mapData.itmLv] += $totSurvMap.ui.themeData.ecnmy.dispOptions[4][i].itmId;
			}
		}
	}
	$.ajax({
		type:"GET",
//		url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
		url: sgis4thApiPath,
		async: false,
 		data: parameters,
		success:function( res ){
			if( res ){
				chartDataObject.profitRatioOfIndustry = res;
				let sumColId, sumOrd;							
				for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[4].length; i++) {
					if($totSurvMap.ui.themeData.ecnmy.dispOptions[4][i].objVarId != "13999001" && $totSurvMap.ui.themeData.ecnmy.dispOptions[4][i].subsumYn == "Y") {
						sumColId = $totSurvMap.ui.themeData.ecnmy.dispOptions[4][i].itmId;
						sumOrd = $totSurvMap.ui.themeData.ecnmy.dispOptions[4][i].varOrd; 
					}
				}
				
				let itmLvId = "OV_L" + sumOrd + "_ID";
				let itmLvSn = "OV_L" + sumOrd + "_SN";
				
				for(var i=0; i<res.length; i++) {
					if(res[i][itmLvId] == sumColId) {
						res.splice(i, 1);
					}
				}
				res.sort(function(a, b) { return a[itmLvSn] - b[itmLvSn] }); //정렬
				let chartData = [], colors = [];
				let max = 0;
				for(var i=0; i<res.length; i++) {
					let dtval;
					let dataObj = {}
					for(var j=0; j<chartDataObject.salesOfIndustry.length; j++) {
						if(res[i]["OV_" + $totSurvMap.ui.themeData.ecnmy.mapData.itmLv.split("_")[1].toUpperCase() + "_ID"] == chartDataObject.salesOfIndustry[j]["OV_L" + $totSurvMap.ui.themeData.ecnmy.dispOptions[4][0].varOrd + "_ID"]) {
							dtval = (res[i].DTVAL_CO != undefined ? res[i].DTVAL_CO : 0);
							dataObj = {dt:parseFloat((parseInt(dtval)/parseInt(chartDataObject.salesOfIndustry[j].DTVAL_CO)*100).toFixed(1))}
							max = Math.max(dataObj.dt,max);
						}
					}		
					
					for(var j=0; j<$totSurvMap.ui.themeData.ecnmy.dispOptions[4].length; j++) {			
						if($totSurvMap.ui.themeData.ecnmy.dispOptions[4][j].itmId == res[i]["OV_"+$totSurvMap.ui.themeData.ecnmy.mapData.itmLv.split("_")[1].toUpperCase()+"_ID"]) {
							dataObj.itm_nm = $totSurvMap.ui.themeData.ecnmy.dispOptions[4][j].altrtvDispWrd
						}			
					}
					if(!$.heum.hasData(dataObj.itm_nm)) {
						dataObj.itm_nm = res[i].OV_L2_KOR;
					}
					chartData.push(dataObj);
					colors.push("#747474");
				}
				colors[chartData.findIndex(x => parseFloat(x.dt) === max)] = $totSurvMap.ui.themeData.ecnmy.defaultColor;
				if(typeof callback === "function"){
					callback({
						chartData,
						colors
					});
				}
			}
		},
		error:function(data) {
			console.error(data);
		}
	});
}
function createProfitRatioOfIndustryChart(){
	getProfitRatioOfIndustryChartData({admCd:$totSurvMap.ui.admCd,callback:function({chartData,colors}){
		createVerticalBarChart({
			rotate:true,
			target:"profit-ratio-of-industry-chart",
			unit:"%",
			data:chartData,
			dataVal:"dt",
			columnVal:"itm_nm",
			color:colors,
			tooltipCallback:function(d,i){
				const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]:last");
				tooltip.empty();
				tooltip.append(
					$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
						$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chartData[i].itm_nm}),
						$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
							$(this).parents('[data-type=tooltip]').hide();
							return false;
						}).append($("<span/>",{"class":"btn-close btn-close--black"}))
					),
					$("<div/>",{"class":"modal__body"}).append(
						$("<p/>").append(
							$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"%"
						),
						$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
							let ecnmyTypeName = "";
							if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy9th"){
								ecnmyTypeName = "9차 산업분류"; 
							}else if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy10th"){
								ecnmyTypeName = "10차 산업분류"; 
							}
							$totSurvMap.ui.tooltipMap.show({
								tooltipCallback:function(){
									$("#tooltip-map-modal-title").empty().append(
										$("<p>",{"text":$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+ecnmyTypeName}),
										$("<h3/>").append(
											$totSurvMap.ui.year+'년 산업별 사업체 수',
											$("<span/>",{"text":" - "+chartData[i].itm_nm})
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
												$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chartData[i].dt)}),"%"
											)
										)
									);
								},
								didSelectedPolygon : function(callback){
									const itemId = chartData[i].itm_id;
									getProfitRatioOfIndustryChartData({admCd:$totSurvMap.ui.tooltipMap.selectedAdmCd,callback:function({chartData,colors}){
										$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+$totSurvMap.ui.tooltipMap.selectedAdmNm);
										chartData.some((data)=>{
											if(data.itm_id==itemId){
												$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(data.dt));
												return true;
											}
										});
										if(typeof callback==="function"){
											callback();
										}
									}});
								}
							});
							$("#tooltip-map-tooltip").show();
						})
					)
				);
				tooltip.show();
			}
		});
	}});
}
function getWorkerCompositionChartData({admCd,callback}){
	chartDataObject.workerComposition = {};
	let itmLv,admLv,chart1Data,chart2Data;
	for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[1].length; i++) {		// 항목분류 레벨
		if($totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].objVarId != "13999001") {
			itmLv = "ov_l"+$totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].varOrd+"_list";
			admLv = "ov_l"+$totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].regionVarOrd+"_list";
			break;
		}
	}
	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.ajaxParams);
//	let parameters = $.extend(true,{},$totSurvMap.ui.themeData.ecnmy.mapData.getParameters());
	parameters.adm_cd = "";
	parameters[itmLv] = "Q"; //보건업·사회복지서비스업
	if(admCd) {
		parameters[admLv] = admCd;
	} else {
		parameters[admLv] = $totSurvMap.ui.admCd; //보건업·사회복지서비스업
	}
	
	if($totSurvMap.ui.year == "2010") { // 2010, 2015 남, 녀 코드가 다름
		parameters.char_itm_id_list = "T21,T22"; //종사자수, 남, 녀
	} else {
		if($totSurvMap.ui.themeData.ecnmy.ecnmyType == "ecnmy9th") {
			parameters.char_itm_id_list = "T201,T202"; //종사자수, 남, 녀
		} else {
			parameters.char_itm_id_list = "T201,T202"; //종사자수, 남, 녀
		}
	}
	$.ajax({
		type:"GET",
		url: sgis4thApiPath,
//		url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
		async: false,
 		data: parameters,
		success:function( res ){
			chartDataObject.workerComposition.chart1 = res;
			chart1Data = res;
		},
		error:function(data) {
			console.error(data);
		}
	});
	parameters.char_itm_id_list = "T20"; //종사자수
	parameters[admLv] = admCd;
	parameters[itmLv] = "86,87"; //보건업:86,사회복지서비스업:87
	$.ajax({
		type:"GET",
		url: sgis4thApiPath,
//		url: sgisContextPath+"/view/kosisApi/TotsurvStatData.do",
		async: false,
 		data: parameters,
		success:function( res ){
			chartDataObject.workerComposition.chart2 = res;
			chart2Data = res;
		},
		error:function(data) {
			console.error(data);
		}
	});
	let convert1=[],convert2=[];
	chart1Data.forEach(data=>{
		convert1.push({
			itm_nm:data.CHAR_ITM_NM.replace("종사자수_","")+"자",
			//dt:Math.round(parseInt(data.DTVAL_CO)/1000)
			dt: parseInt(data.DTVAL_CO)
		});
	});
	if($totSurvMap.ui.themeData.ecnmy.ecnmyType === "ecnmy9th") {
		chart2Data.forEach(data=>{
			convert2.push({
				//itm_nm:data.OV_L2_UP_ITM_KOR,
				itm_nm:data.OV_L2_KOR,
				//dt:Math.round(parseInt(data.DTVAL_CO)/1000)
				dt: parseInt(data.DTVAL_CO)
			});
		});
	} else {
		chart2Data.forEach(data=>{
			convert2.push({
				//itm_nm:data.OV_L2_UP_ITM_KOR,
				itm_nm:data.OV_L1_KOR,
				//dt:Math.round(parseInt(data.DTVAL_CO)/1000)
				dt: parseInt(data.DTVAL_CO)
			});
		});
	}
	if(typeof callback === "function"){
		callback({
			chart1:convert1,
			chart2:convert2
		})
	}
}
function createWorkerCompositionChart(){
	const size = "60%",height="300px";
	getWorkerCompositionChartData({admCd:$totSurvMap.ui.admCd,callback:function({chart1,chart2}){
		createDonutChart({
			data:chart1, target:"worker-composition-1-chart",colorData:["#ff5253","#23b7d1"],unit:" 천명",tooltipCallback:function(d,i){
				const tooltip = $(this).parents(".chart-container").find("[data-type=tooltip]:last");
				tooltip.empty();
				tooltip.append(
					$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
						$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chart1[i].itm_nm}),
						$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
							$(this).parents('[data-type=tooltip]').hide();
							return false;
						}).append($("<span/>",{"class":"btn-close btn-close--black"}))
					),
					$("<div/>",{"class":"modal__body"}).append(
						$("<p/>").append(
							//$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(chart1[i].dt)}),"천명"
							$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(chart1[i].dt)}),"명"
						),
						$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
							let ecnmyTypeName = "";
							if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy9th"){
								ecnmyTypeName = "9차 산업분류"; 
							}else if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy10th"){
								ecnmyTypeName = "10차 산업분류"; 
							}
							$totSurvMap.ui.tooltipMap.show({
								tooltipCallback:function(){
									$("#tooltip-map-modal-title").empty().append(
										$("<p>",{"text":$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+ecnmyTypeName}),
										$("<h3/>").append(
											$totSurvMap.ui.year+'년 보건업·사회복지 서비스업 종사자 구성비'
										),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$('#tooltip-map-container').hide();
											$('.dim').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									);
									$("#tooltip-map-tooltip").empty().append(
										$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
											$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+ chart1[i].itm_nm + "-" + $totSurvMap.ui.tooltipMap.selectedAdmNm}),
											$("<a/>",{"class":"btn__cancel"}).click(function(){
												$('#tooltip-map-tooltip').hide(); 
												return false;
											}).append($("<span/>",{"class":"btn-close btn-close--black"}))
										),
										$("<div/>",{"class":"modal__body"}).append(
											$("<p/>").append(
												$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chart1[i].dt)}),"명"
											)
										)
									);
								},
								didSelectedPolygon : function(callback){
									const itemId = chartDataObject.workerComposition.chart1[i].itm_id;
									getWorkerCompositionChartData({admCd:$totSurvMap.ui.tooltipMap.selectedAdmCd,callback:function({chart1, chart2, colors}){
										$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+ chart1[i].itm_nm + "-" +$totSurvMap.ui.tooltipMap.selectedAdmNm);
										chart1.some((data)=>{
											if(data.itm_id==itemId){
												$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(data.dt));
												return true;
											}
										});
										if(typeof callback==="function"){
											callback();
										}
									}});
								}
							});
							$("#tooltip-map-tooltip").show();
						})
					)
				);
				tooltip.show();
			},
			size,height,
			unitVal: 1000
		});
		createDonutChart({
			data:chart2,target:"worker-composition-2-chart",colorData:["#ff5253","#23b7d1"], unit:" 천명",tooltipCallback:function(d,i){
				const tooltip = $(this).parents(".chart-container").find("[data-type=tooltip]:last");
				tooltip.empty();
				tooltip.append(
					$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
						$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+chart2[i].itm_nm}),
						$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
							$(this).parents('[data-type=tooltip]').hide();
							return false;
						}).append($("<span/>",{"class":"btn-close btn-close--black"}))
					),
					$("<div/>",{"class":"modal__body"}).append(
						$("<p/>").append(
							//$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(chart2[i].dt)}),"천명"
							$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(chart2[i].dt)}),"명"
						),
						$("<a/>",{"href":"#","class":"map__show","text":"지도 보기"}).click(function(){
							let ecnmyTypeName = "";
							if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy9th"){
								ecnmyTypeName = "9차 산업분류"; 
							}else if($totSurvMap.ui.themeData.ecnmy.ecnmyType=="ecnmy10th"){
								ecnmyTypeName = "10차 산업분류"; 
							}
							$totSurvMap.ui.tooltipMap.show({
								tooltipCallback:function(){
									$("#tooltip-map-modal-title").empty().append(
										$("<p>",{"text":$totSurvMap.ui.tooltipMap.selectedAdmNm+" "+ecnmyTypeName}),
										$("<h3/>").append(
											$totSurvMap.ui.year+'년 보건업·사회복지 서비스업 종사자 구성비'
										),
										$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
											$('#tooltip-map-container').hide();
											$('.dim').hide();
											return false;
										}).append($("<span/>",{"class":"btn-close btn-close--black"}))
									);
									$("#tooltip-map-tooltip").empty().append(
										$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
											$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 "+ chart2[i].itm_nm + "-" + $totSurvMap.ui.tooltipMap.selectedAdmNm}),
											$("<a/>",{"class":"btn__cancel"}).click(function(){
												$('#tooltip-map-tooltip').hide(); 
												return false;
											}).append($("<span/>",{"class":"btn-close btn-close--black"}))
										),
										$("<div/>",{"class":"modal__body"}).append(
											$("<p/>").append(
												$("<span/>",{"class":"color-red font-large fwbold","data-id":"value","text":$.heum.setThousandSeparator(chart2[i].dt)}),"명"
											)
										)
									);
								},
								didSelectedPolygon : function(callback){
									const itemId = chartDataObject.workerComposition.chart2[i].itm_id;
									getWorkerCompositionChartData({admCd:$totSurvMap.ui.tooltipMap.selectedAdmCd,callback:function({chart1, chart2, colors}){
										$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
										$("#tooltip-map-tooltip .modal__tit").text($totSurvMap.ui.year+"년 "+ chart2[i].itm_nm + "-" +$totSurvMap.ui.tooltipMap.selectedAdmNm);
										chart2.some((data)=>{
											if(data.itm_id==itemId){
												$("#tooltip-map-tooltip [data-id=value]").text($.heum.setThousandSeparator(data.dt));
												return true;
											}
										});
										if(typeof callback==="function"){
											callback();
										}
									}});
								}
							});
							$("#tooltip-map-tooltip").show();
						})
					)
				);
				tooltip.show();
			},
			size,height,
			unitVal: 1000
		});
	}});
}