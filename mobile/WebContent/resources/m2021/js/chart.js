let defaultColors = ["#7cb5ec", "#ff9f4d", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
let $ecnmy = {};

/**
 * @name					: createVerticalBarChart
 * @description				: 세로바 차트 생성
 * @param target			: html tag id
 * @param data				: 데이터
 * @param dataVal			: data에서 출력할 데이터의 key
 * @param columnVal			: data에서 출력할 명칭의 key
 * @param color				: 색상 array
 * @param rotate			: x축 기울기 여부
 * @param isSort			: 정렬 여부
 * @param isShowYaxis		: y축 보여줄지 여부
 * @param avgLineData		: 평균선
 * @param unit				: 단위
 * @param tooltipCallback 	: tooltipCallback
 */
function createVerticalBarChart({target,data,dataVal,columnVal,color,rotate,unitVal,isSort,isShowYaxis,avgLineData,unit,tooltipCallback}){
	avgLineData = false;
	data.forEach(function(item,index){
		item.originalIndex = index;
	});
	//TODO 현재 정렬 할지 말지 고민
	if(isSort!==false){
		data = data.sort(function (a, b) {
			return b[dataVal]-a[dataVal];
		});
	}
	
	let marginLeft = 0, marginBottom = 0, labelLen = 0;
	
	
	if(data[0].itm_nm == undefined ) {
		if(data[0].CHAR_ITM_NM.length > 6) { //mng_s 20220315 신혼부부 주택소유에서 챠트가 안나와서 수정함. 대소문자를 가림 주의요망
			marginLeft = data[0].CHAR_ITM_NM.length * 5;
		}
	} else {
		if(data[0].itm_nm.length > 6) {
			marginLeft = data[0].itm_nm.length * 5;
		}
		if(data[0].itm_nm != undefined) {
			for(let i=0; i<data.length; i++) {
				if(data[i].itm_nm.length > labelLen) {
					labelLen = data[i].itm_nm.length; 
				}
			}
		}
		if(marginLeft < 30) {
			marginLeft = 20;
		}
	}
	
	if(typeof $administStatsMap == "object") {
		marginBottom = 30;
			} else {
				marginBottom = labelLen * 3;
		
				if(marginBottom == 0) {
					marginBottom = 20;
				}
	

	}
	
	
	
	var margin = ({top: 30, right: 10, bottom:marginBottom, left: marginLeft});
	
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	var height = 240;	
	
	// X축 세팅(domain : 눈금범위, range : 길이범위)
	var x = d3.scaleBand()
	.domain(d3.range(data.length))
	.range([margin.left, width - margin.right])
	
	// Y축 세팅(domain : 눈금범위, range : 길이범위)
	var y = d3.scaleLinear()
		.domain([0, d3.max(data, function(d) {
			return Number(d[dataVal]) 
		})]).nice()
		.range([height - margin.bottom, margin.top]);
	
	// X 축 정보
	var xAxis = function(g) { return g
		.attr("transform", "translate("+0+","+(height-margin.bottom)+")")
		// 변경
		.call(d3.axisBottom(x).tickFormat(function(i) {
//			if("c1_nm" ==columnVal||"c2_nm" ==columnVal||"itm_nm" ==columnVal||"surv_year" ==columnVal){
//				return data[i][columnVal].replace("세", "").replace("이상", "~") 
//			}
//			else {
//			}
			return data[i][columnVal];
		}).tickSizeOuter(0))
	};

	// Y 축 정보
	var yAxis = function(g) { return g
		.attr("transform", "translate("+margin.left+"," + 0 + ")")
		.call(d3.axisLeft(y).ticks(4, "s"))
		.call(function(g) { return g.select(".domain").remove() })
		.call(function(g) { return g.append("text") 
		.attr("x", -margin.left)
		.attr("y", 10)
		.attr("fill", "currentColor")
		.attr("text-anchor", "start")
		.text(data.x) })
	};
	
	const chart = d3.select("#"+target);
	const svg = chart
		.append("svg")
		.attr("height", rotate===true?height+100:height)
		.attr("width", width)
	// 실제 차트 start
	svg.append("g")
		.selectAll("rect")
		.data(data)
		.join("rect")
		.attr("class", "eventGroup")
		.attr("x", function(d, i) { return (x(i)+((x.bandwidth()-20)/2)) })
		.attr("y", function(d) { return y(0) }) // 시작점 Y좌표
		.attr("width", 20)
		.attr("fill", function(d,i) {return color[d.originalIndex]})
		.on("click", function(d,i){
			if(typeof tooltipCallback === "function"){
				tooltipCallback.call(this,d,i);
			}
		})
		.transition()
		.duration(1000)
		.delay(function (d, i) {
			return i * 50;
		})
		.attr("height",  function(d) {
			return y(0) - y(Number(d[dataVal])) 
		})
		.attr("y", function(d) { return y(Number(d[dataVal])) })

	 svg.append("g").attr("style", "color:#878A89; font-size:11px;")
 		.selectAll("text")
	 	.data(data)
	 	.join("text")
	 	.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(i)+ x.bandwidth() / 2})
	 	.attr("y", function(d) { 
 			return y(Number(d[dataVal]))-10 
	 	})
	 	.text( function(d){
	 		if(unitVal) {
	 			return $.heum.setThousandSeparator(parseInt(d[dataVal]/unitVal))+($.heum.hasData(unit)?unit:"");
	 		} else {
	 			return $.heum.setThousandSeparator(d[dataVal])+($.heum.hasData(unit)?unit:"");
	 		}
	 	});
	if(rotate===true){
		svg.append("g")
			.attr("style", "color:#878A89; font-size:11px;")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-45)");
	}else{
		svg.append("g")
			.attr("style", "color:#878A89; font-size:11px;")
			.call(xAxis);
	}
	if(isShowYaxis!==false){
		svg.append("g")
			.attr("style", "color:#878A89; font-size:11px;")
			.call(yAxis)
			.attr("style", "margin-left:-10px");
	}
	if(avgLineData){
		svg.append("line")
			.attr("x1", x(0))
			.attr("x2", width-10)
			.attr("y1", y(avgLineData))
			.attr("y2", y(avgLineData))
			.attr("stroke-dasharray", 4)
			.attr("stroke", "red");
	}
	
	// 실제 차트 end
}
/**
 * @name					: createHorizontalBarChart
 * @description				: 가로바 차트 생성
 * @param target			: html tag id
 * @param data				: 데이터
 * @param dataVal			: data에서 출력할 데이터의 key
 * @param columnVal			: data에서 출력할 명칭의 key
 * @param color				: 색상 array
 * @param rotate			: x축 기울기 여부
 * @param tooltipCallback 	: tooltipCallback
 */
function createHorizontalBarChart({target,data,dataVal,columnVal,color,unit,rotate,tooltipCallback}){
	//TODO 현재 정렬 할지 말지 고민
	data.forEach(function(item,index){
		item.originalIndex = index;
	});
//	data = data.sort(function (a, b) {
//		return a[dataVal]-b[dataVal];
//	});
	var margin = ({top: 0, right: 150, bottom: 5, left: 130}) //2020.10.28[신예리] 이미지 저장 시 차트 범례명 잘림 - left 값 수정
	var height = data.length*50;
//	$("#"+target).parent().height(height+20);
	$("#"+target).height(height);
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	
	var total = 0;
	for(var i=0; i<data.length; i++){
		total = Number(data[i][dataVal]) + total;
	}
	
	
	var x = d3.scaleLinear()
			.domain([0, d3.max(data, function(d) { return Number(d[dataVal])})*0.95])
			.range([margin.left, width - margin.right])
	var x1 = d3.scaleLinear()
			.domain([0, d3.max(data, function(d) { return Number(d[dataVal])})*1.2])
			.range([0, width - margin.right])
	var y = d3.scaleBand()
			.domain(d3.range(data.length))
			.range([0, height]) //range / domainlength 항목간 넓이
			.padding(0.5)
	var yAxis = function(g) { return g
			.attr("transform", "translate("+ (margin.left+5) + ",0)")
			.call(d3.axisLeft(y).tickFormat(
				function(i) {
					return data[i][columnVal].replace("-", " ")
				}).tickSizeOuter(0))
			}
	var format = x.tickFormat(20, data.format)
	const chart = d3.select("#"+target+"");
	const svg = chart
			.append("svg")
			.attr("height", height)
			.attr("width", width);
		svg.append("g")
			.selectAll("rect")
			.data(data)
			.join("rect")
			.attr("class", "eventGroup") //20201014 박은식 event처리 class 추가
			.attr("x", x(0))
			.attr("y", function(d, i) { return y(i) })
			.attr("height", y.bandwidth())
			.attr("fill", function(d,i) { return color[d.originalIndex]})
			.attr("width", 0)
			.attr("rx", "4")
			.attr("ry", "4")
			.style("cursor", "pointer")
			.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
			.on("click", function(d,i){
				if(typeof tooltipCallback === "function"){
					tooltipCallback.call(this,d,i);
				}
			})
			.transition()
			.duration(1000)
			.delay(function (d, i) {
				return i * 150;
			})
			.attr("width",	function(d) { return x1(Number(d[dataVal])) }); 
			
		svg.append("g")
			.attr("text-anchor", "end")
			.attr("font-family", "NanumSquare")
			.attr("font-size", 12)
			.attr("font-weight", 600)
			.selectAll("text")
			.data(data)
			.join("text")
			.style("cursor", "pointer")
			.attr("item", function(d,i){ return d.itm_cd})//20201126 박은식 차트 rect 구분 추가
			.on("click", function(d, i){
				if(typeof tooltipCallback === "function"){
					tooltipCallback.call(this,d,i);
				}
			})
			.attr("fill", "")
			.attr("x", margin.left)
			.attr("width",	function(d) { return x1(Number(d[dataVal])) })
			.attr("y", function(d, i) { return y(i) + y.bandwidth() / 2 })
			.attr("dy", "0.35em")
			.text(function(d) { return ((format(d[dataVal]) == 0) ? '': d[dataVal]+($.heum.hasData(unit)?unit:"")) })
			.call(function(text) { return text.filter(function(d) { return x1(Number(d[dataVal]))}) // short bars
			.attr("dx", +10)
			.attr("text-anchor", "start") })
			.transition()
			.duration(1000)
			.delay(function (d, i) {
				return i * 150;
			})
			.attr("x",	function(d) { return x1(Number(d[dataVal]))+margin.left});

		svg.append("g")
			.attr("style", "margin-left:250px; font-size: 12px; color:#878A89")
			.call(yAxis);

		if(rotate===true){
			svg.selectAll(".tick")
				.selectAll("text")
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", "rotate(-15)");
		}
		
		$("#"+target+"").find("line, path").remove();
}
/**
 * @name					: createPieChart
 * @description				: 파이 차트 생성
 * @param target			: html tag id
 * @param data				: 데이터
 * @param labels			: 출력할 명칭 array
 * @param unit				: 단위
 * @param tooltipCallback	: 툴팁 관련 콜백
 */
function createPieChart({target,data,labels,unit,tooltipCallback,size,height}){
	let series = [],colors = [];
	
	let legendReverse = true;
	if(data[0].surv_id == "PH0011") {
		legendReverse = false;
	}
	
	data.forEach((item,index)=>{
		series.push({
			name:labels[index].name,
			y:parseFloat(item.dt)
		});
		if(labels[index].color == undefined) {
			colors.push(defaultColors[index]);
		} else {
			colors.push(labels[index].color);
		}
	});
	let chartOption = {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		};
	let  plotOptions = {
			pie: {
				center: ["50%","50%"],
				cursor: 'pointer',
				dataLabels: {
					distance:1,
					enabled: true,
					format: '{point.percentage:.1f} %'
				},
				showInLegend: true,
				slicedOffset:0
			},
			series: {
				label: {
					connectorAllowed: false
				},
				point:{
					events:{
						click:function(event){
							if(typeof tooltipCallback==="function"){
								tooltipCallback.call($("#"+target),{dt:event.point.y,index:event.point.index},event.point.index);
							}
						}
					}
				}				
			}
		};
	if($.heum.hasData(size)){
		plotOptions.pie.size = size;
	}
	if($.heum.hasData(height)){
		chartOption.height = height;
	}
	Highcharts.chart(target, {
		chart:chartOption,
		title: {
			text: null
		},
		tooltip:{
			enabled: false
		},
		accessibility: {
			point: {
				valueSuffix: '%'
			}
		},
		credits: {
			enabled: false
		},
		legend: {
			reversed: legendReverse,
			labelFormatter: function () {
				return this.name + ' : '+$.heum.setThousandSeparator(this.y)+($.heum.hasData(unit)?unit:"");
			}
		},
		colors : colors,
		plotOptions,
		series: [{
			name: '',
			colorByPoint: true,
			data: series
		}]
	});
//	//1. 차트 초기화
//	$("#"+target+"-chart").empty();
//	$("#"+target+"-legend").empty();
//	let svgWidth = $("#"+target+"-chart").width();
//	let width = 200;
//	let height = 200;
//	let radius = Math.min(width, height) / 1.68;
//	let chart = d3.select("#"+target+"-chart");
//	let svg = chart.append("svg")
//		.attr("width",svgWidth)
//		.attr("height",height);
//	let totals = data.map(function(element){ return element.dt });
//	let grandTotal = totals.reduce(function(a, b){ return Number(a) + Number(b) });
//	
//	//2. 차트 생성
//	let arc = d3.arc()
//		.outerRadius(radius - 25)
//		.innerRadius(1.5);
//	
//	let labelArc = d3.arc()
//		.outerRadius(radius - 54)
//		.innerRadius(radius - 54);
//	
//	let pie = d3.pie()
//		.sort(function(a, b){ return d3.ascending(a, b) })
//		.value(function(d){ return d.dt })
//		.padAngle(0.01);
//	
//	let arcGroup = svg.append("g")
//		.attr("class", "arc-group")
//		.attr("transform", 'translate('+(svgWidth/2)+',100)');
//	
//	let arcs = arcGroup.selectAll(".arc")
//		.data(pie(data)).enter()
//		.append("g")
//		.attr("class", "arc");
//	
//	arcs.append("path")
//		.attr("class", "eventGroup")
//		.on("mousedown", function(d,i){
//			if(typeof tooltipCallback==="function"){
//				tooltipCallback.call(this,d,i);
//			}
//		})
//		.attr("fill", function(d,i){ return labels[i].color})
//		.style("cursor", "pointer")
//		.transition()
//		.duration(500)
//		.delay(function(d, i) {
//			return i * 150;
//		})
//		.attrTween("d", function(d, i) {
//			let interpolate = d3.interpolate(
//				{startAngle : d.startAngle, endAngle : d.startAngle},
//				{startAngle : d.startAngle, endAngle : d.endAngle}
//			);
//			return function(t){
//				return arc(interpolate(t));
//			}
//		});
//	function midAngle(d){
//		return d.startAngle + (d.endAngle - d.startAngle)/2;
//	}
//		
//	arcs.append("text")
//		.attr("transform", function(d){
//			let translate = labelArc.centroid(d);
//			return 'translate('+translate+')'; 
//		})
//		.attr("style", "pointer-events: none;")
//		.attr("dy", ".35em")
//		.attr("fill","#fff")
//		.style("font", "12px NanumSquare")
//		.style("font-weight", "700")
//		.style("text-anchor", "middle")
//		.text(function(d, i){ return ((totals[i] / grandTotal) * 100).toFixed(2)+'%' });
//	//3. 파이차트 범례 생성
//	data.forEach((data,index)=>{
//		$("#"+target+"-legend").append(
//			$("<div/>",{"class":"legend-box"}).append(
//				$("<span/>",{"class":"legend-box","style":"background-color:"+labels[index].color}),
//				$("<span/>",{"class":"legend-label","style":"color:"+labels[index].color,"text":labels[index].name}),
//				$("<span/>",{"class":"legend-value","text":$.heum.setThousandSeparator(data.dt)+($.heum.hasData(unit)?unit:"")})
//			)
//		);
//	});
//	
//	//4. 툴팁
//	$("#"+target+"-chart-container [data-type=tooltip] .modal__body").empty();
}
/**
 * @name		 : setTileMapChart 
 * @description  : 차트 클릭시 변경되는 타일맵 차트
 */
function setTileMapChart(res){
	let themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
	let mapDataParameters = themeInfo.mapData.getParameters();
	let target = "tree-map";
	
	if($totSurvMap.ui.map.map.curPolygonCode <= 3 || $totSurvMap.ui.isAtdrc){
		// 지역별인구 영역을 초기화후 타일맵으로 변경
		$("#"+target).empty();
		$("#"+target).css("background-color", "white");
		// 선택한 지역코드
		var regionCd = $totSurvMap.ui.admCd;
		if(regionCd.length==5){
			// 행정시도 인지 비교
			$totSurvMap.ui.checkIsAtdrc(regionCd);
			if($totSurvMap.ui.isAtdrc){
				// 행정시도 이면서 지도 선택인 경우는 상위지역(시도레벨) 조회(타일맵 변경 없음)  
				if($totSurvMap.ui.mapToggleId!=null && $totSurvMap.ui.mapToggleId!="" && gv_type != "locgov" && gv_type!="totFarmLocgov" && gv_type!="totPeopleLocgov"){ // 2020-11-09 [곽제욱] parameter 분기처리 추가
					regionCd = regionCd.substring(0,2);
				// 아닌경우는 타일맵 변경
				} else {
					regionCd = regionCd;
				}
			}

			else{
				// 행정시도가 아닐경우 상위지역 체크
				$totSurvMap.ui.checkIsAtdrc(regionCd.substring(0,4)+"0");
				// 상위지역이 행정시도인 경우 행정시도로 다시 검색
				if($totSurvMap.ui.isAtdrc){
					regionCd = regionCd.substring(0,4)+"0";
				// 행정시도가 아닐경우 시도로 검색
				} else {								
					regionCd = regionCd.substring(0,2);
					$totSurvMap.ui.isAtdrc = false;
				}
			}
		}
		
		// 선택년도
		/*$.ajax({
			method: "POST",
			async: true,
			url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTotAreaPopulation.json", // 공통쿼리로 수정필요
			data: { 
				year: $totSurvMap.ui.year, 
				region_cd : regionCd, 
				surv_id : mapDataParameters.surv_id, 
				itm_cd : mapDataParameters.itm_cd, 
				isAtdrc:$totSurvMap.ui.isAtdrc, 
				c1:mapDataParameters.c1
			}, 
			dataType: "json",
			success: function(res) {
				if (res.errCd == "0") {
					if(typeof window.createTotSur==="function"){
						window.createTotSur(res);
					}
					let themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
					createTileMapChart(res.result.areaData,target,"dt","region_cd","region_nm","명",$totSurvMap.ui.year+"년 총 "+themeInfo.name);
				}
			},
			error: function(e) {
				console.error(e);
			},
			complete : function(e){
			}
		});*/
	}
	createTileMapChart(res.result.areaData,target,"dt","region_cd","region_nm","명",$totSurvMap.ui.year+"년 총 "+themeInfo.name);
}
let widthArray = [];
let heightArray = [];
/**
 * @name					: createTileMapChart
 * @description				: 바 차트 생성
 * @param data				: 데이터
 * @param target			: html tag id
 * @param dataVal			: data에서 출력할 데이터의 key
 * @param admCdVAl			: data에서 출력할 지역 코드의 key
 * @param admNmVal			: data에서 출력할 지역명의 key
 */
function createTileMapChart(data,target,dataVal,admCdVal,admNmVal,unit,title){
	widthArray = [];
	heightArray = [];
	
	var minRank=null;
	var rankArray = data.sort(function (a, b) {
		let x = a.rank;
		let y = b.rank;
		if (b.rank===undefined||x < y) {
			return -1;
		}
		if (x > y) {
			return 1;
		}
		return 0;
	}).map(function(data){
		return data.rank;
	});
	var total = 0; 
	data.forEach(function(data){
		total += Number(data[dataVal]);
		if(data.rank){
			if(minRank==null){
				minRank = data.rank;
			}else{
				minRank = Math.min(minRank,data.rank);
			}
		}
	});
	var margin = {top: 0, right: 0, bottom: 0, left: 0},
		width = $("#"+target).width() - margin.left - margin.right,
		height = 250 - margin.top - margin.bottom;
	var mindomain = data[1][dataVal];
	var maxdomain = data[data.length-1][dataVal];
	
	var total = 0; 
	for(var i=0; i<data.length; i++){
		total += Number(data[i][dataVal]);
	}
	var opacity = d3.scaleLinear()
		.domain([mindomain, maxdomain])
		.range([1,.5]);

	var svg = d3.select("#"+target)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var root = d3.stratify()
		.id(function(d) { return d[admCdVal]; })
		.parentId(function(d) {return d.parent; })
		(data);
	root.sum(function(d) { return +d[dataVal] });
	d3.treemap()
		.size([width, height])
		.padding(1)
		(root);
	svg
		.selectAll("rect")
		.data(root.leaves())
		.enter()
		.append("rect")
		.attr('x', function (d) { return d.x0; })
		.attr('y', function (d) { return d.y0; })
		.attr('width', function (d) { widthArray.push(d.x1 - d.x0); return d.x1 - d.x0; })
		.attr('height', function (d) { heightArray.push(d.y1-d.y0); return d.y1 - d.y0; })
		.attr('value', function(d) { return d.data[admCdVal]; })
		.attr('fill', function(d) {
			//조규환
			//var color = ["#d42d0f", "#db491c", "#db491c", "#e26529", "#e26529", "#e98236", "#e98236", "#f09e43", "#f09e43", "#f09e43", "#f09e43", "#f09e43", "#f09e43", "#f7ba50", "#ffd75d", "#ffd75d", "#ffd75d"];
			//조규환
			
			$totSurvMap.ui.map.map.dataBoundary.eachLayer(function(layer){
				if(d.data[admCdVal]==layer.feature.properties.adm_cd){
					color = layer.options.fillColor;
				}
			});
			return color;
		})
		.attr('data-original-fill', function(d) {
			//조규환
			/*var color = ["#d42d0f", "#db491c", "#db491c", "#e26529", "#e26529", "#e98236", "#e98236", "#f09e43", "#f09e43", "#f09e43", "#f09e43", "#f09e43", "#f09e43", "#f7ba50", "#ffd75d", "#ffd75d", "#ffd75d"];*/
			//조규환
			
			$totSurvMap.ui.map.map.dataBoundary.eachLayer(function(layer){
				if(d.data[admCdVal]==layer.feature.properties.adm_cd){
					color = layer.options.fillColor;
				}
			});
			return color;
		})
		.on("click", function(d){
			var ratio = 0;
			if(total != 0 && total !=""){
				ratio = (d.data[dataVal] / total * 100).toFixed(1)
			} else {
				ratio = 100;
			}
			const tooltip = $(this).parents(".dashboard__box").find("[data-type=tooltip]");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<div/>",{"class":"modal__tit","text":title}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":/*d.data.rank+"위 "+*/d.data[admNmVal]})
					),
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.data[dataVal])}),unit
					),
					$("<p/>").append(
						"(구성비 ",
						$("<span/>",{"class":"color-red","text": ratio}),
						"%)"
					)
				)
			).show();
		})
		.style("stroke", "")
		.style("opacity", function(d){return opacity(d.data[dataVal])});
	svg
		.selectAll("text")
		.data(root.leaves())
		.enter()
		.append("text")
		.attr("style", "pointer-events: none;")
		.attr('value', function(d) { return d.data[admCdVal]; })
		.attr("x", function(d){ return d.x0+1})
		.attr("y", function(d){ return d.y0+15})
		.attr("width", function() {
			var i = $("#tree-map").find("text").index(this);
			var maxWidth = $("#tree-map").find("rect").eq(i).width();
			return maxWidth - 1;
		})
		.text(function(d){ return d.data[admNmVal]})
		.attr("font-size", "10px")
		.attr("fill", "white");
									
	svg
		.selectAll("vals")
		.data(root.leaves())
		.enter()
		.append("text")
		.attr("x", function(d){ return d.x0+5})
		.attr("y", function(d){ return d.y0+35})
		.text(function(d){ 
			if(rankArray.slice(0,5).indexOf(d.data.rank)>-1){
				var ratio = 0;
				if(total != 0 && total !=""){
					ratio = (d.data[dataVal] / total * 100).toFixed(2)
				} else {
					ratio = 100;
				}
				return ratio+"%"; 
			}else{
				return "";
			}
		})
		.attr("font-size", "15px")
		.attr("fill", "white");
	svg
		.selectAll("text")
		.call(tileMapWordWrap, "")
}
/**
 * @name		: tileMapWordWrap
 * @param text	: text
 */
function tileMapWordWrap(text){
	var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
	var target = themeData.chartTarget;
	text.each(function() {
		var index = $("#"+target).find("text").index(this);
		var text = d3.select(this),
			words = text.text().split("").reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.1,
			x = text.attr("x"),
			y = text.attr("y"),
			width = widthArray[index],
			height = heightArray[index],
			dy = 0,
			limitHeight = 16;
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em")
			.attr("fill", "white");
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(""));
			if (tspan.node().getComputedTextLength() >= width) {
			line.pop();
			tspan.text(line.join(""));
			line = [word];
			limitHeight = (lineNumber+1)*16+15;
			if(limitHeight > height){
				break;
			}
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
		}
	});
}
/**
 * @name					: createDonutChart
 * @description				: 도넛 차트 생성
 * @param data				: 데이터
 * @param target			: html tag id
 * @param colorData			: color 배열
 * @param unit				: 단위
 * @param sumText			: sum 텍스트
 * @param sumValue			: 합계값을 표시된 데이터를 안넣고 표시하고싶은 값으로 표현
 * @param tooltipCallback	: 차트 path 선택하면 나올 툴팁 콜백
 */
function createDonutChart({data,target,colorData,unit,sumText,sumValue,height,size,isShowLegendValue,tooltipCallback,totalCallback,isDisabledLegendClick,isShowLegend,dataLabelFormatter,unitVal}){
	if(typeof $totSurvMap !== 'undefined') {
		if($totSurvMap.ui.theme == "ecnmy") {
			colorData = ["#f08246", "#009589"];
		} else {
			colorData = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"];
		}
	}
	
	isShowLegendValue=isShowLegendValue===false?false:true;
	isShowLegend=isShowLegend===false?false:true;
	let total = 0;
	data.forEach((item,index)=>{
		item.name = item.itm_nm;
		item.y = parseFloat(item.dt);
		total+=parseFloat(item.dt);
	});
	let sumTextView = "";
	if(Number.isInteger(total) == false){
		total = total.toFixed(1);
	}
	if(unitVal != undefined) {
		sumTextView = ((sumText||"합계")+"\n"+$.heum.setThousandSeparator(sumValue===undefined?parseInt(total/unitVal):sumValue)+($.heum.hasData(unit)?unit:""));
	} else {
		sumTextView = ((sumText||"합계")+"\n"+$.heum.setThousandSeparator(sumValue===undefined?total:sumValue)+($.heum.hasData(unit)?unit:""));
	}
	
	$("#"+target).empty();
	let plotOptions = {
		pie: {
			center: ["50%","50%"],
			cursor: 'pointer',
			colors:colorData,
			dataLabels: {
				distance:1,
				enabled: true,
				format: '{point.percentage:.1f} %'
			},
			showInLegend: true,
			slicedOffset:0
		},
		series: {
			label: {
				connectorAllowed: false
			},
			point:{
				events:{
					click:function(event){
						if(typeof tooltipCallback==="function"){
							tooltipCallback.call($("#"+target),{data:event.point.y,value:event.point.y,index:event.point.index},event.point.index);
						}
					},
					legendItemClick: function () {
						if(isDisabledLegendClick===false){
							return false;
						}
						
						if(this) {
							if(this.series){
								if(this.series.data){
									$ecnmy.cData = this.series.data;
									
									setTimeout(function() {
										for(let i=0; i<$ecnmy.cData.length; i++) {
											$($ecnmy.cData[i].graphic.element).attr("opacity", "1");
											$($ecnmy.cData[i].dataLabel.element).attr("opacity", "1");
										}
									}, 100);
								}
							}
						}
					}
				}
			}
		}
	};
	
	if(typeof dataLabelFormatter === "function"){
		delete plotOptions.pie.dataLabels.format;
		plotOptions.pie.dataLabels.formatter = dataLabelFormatter;
	}
	let chartOption = {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie',
		events: {
			render: function() {
				this.title.attr({
					y: this.title.alignAttr.y-(isShowLegend===false?0:this.legend.box.getBBox().height/2)-5
				});
				if(typeof totalCallback ==="function"){
					$(this.title.element).click(function(){
						totalCallback();
					});
				}
			}
		}
	};
	if($.heum.hasData(size)){
		plotOptions.pie.size = size;
	}
	if($.heum.hasData(height)){
		chartOption.height = height;
	}
	Highcharts.chart(target, {
		chart: chartOption,
		title: {
			text: sumTextView.split("\n").join("<br/>"),
			verticalAlign: 'middle',
			floating: true,
			style:{
				"font-size":"13px",
				"font-weight":"bold"
			}
		},
		credits: {
			enabled: false
		},
		legend:{
			enabled:isShowLegend,
			reversed: true,
			labelFormatter: function () {
				if(isShowLegendValue===false){
					return this.name + ' : '+$.heum.setThousandSeparator(this.y)+($.heum.hasData(unit)?unit:"");
				}else{
					return this.name;
				}
			}
		},
		tooltip: {
			enabled:false
		},
		plotOptions,
		color:colorData,
		series: [{
			name: '',
			colorByPoint: true,
			innerSize: '70%',
			data: data
		}]
	});
//	sumText = sumText||"합계";
//	$("#"+target).empty();
////	var margin = {top: 20, right: 100, bottom: 20, left: 20}
//	var w = $("#"+target).width(), h = $("#"+target).parent().height(), ph = 250;
//	var graphData = [data.length];
//	for (var i = 0; i < data.length; i++) {
//		graphData[i] = data[i].dt;
//	}
//	
//	var pie = d3.pie();
//	var arc = d3.arc().innerRadius(50).outerRadius(80);
//	 
//	var titleMaxLength = d3.max(data, function(d){return d.itm_nm.length});
//	var svg = d3.select("#"+target)
//		.append("svg")
//		.attr("width", w)
//		.attr("height", h);
//	svg.append("g")
//		.attr("data-is-temp-text",true)
//		.attr('style', 'font-size:14px;display:none;') 
//		.selectAll("text")
//		.data(pie(data))
//		.join("text")
//		.text(function(d, i) {
//			return (d.data.itm_nm+" : " + $.heum.setThousandSeparator(graphData[i])+($.heum.hasData(unit)?unit:""));
//		})
//		.attr("data-size",function(){
//			return this.getComputedTextLength();
//		});
//	let legendMaxSize = 0;
//	$("#"+target+" g[data-is-temp-text=true] text").each(function(){
//		legendMaxSize = Math.max($(this).data("size"),legendMaxSize);
//	});
//	$("#"+target+" g[data-is-temp-text=true]").remove();
//	var g = svg.selectAll(".pie")
//		.data(pie(graphData))
//		.enter()
//		.append("g")
//		.attr("class", "pie")
//		.attr("transform","translate("+w/2+","+ph/1.8+")");
//	g.append("path")
//		.attr("class", "eventGroup")
//		.style("cursor", "pointer")
//		.on("click", function(d, i){
//			if(typeof tooltipCallback === "function"){
//				tooltipCallback.call(this,d,i);
//			}
//		})
//		.attr("fill", function(d, i) {
//			return colorData[i];
//		}) 
//		.transition()
//		.duration(500)
//		.delay(function(d, i) { 
//			return i * 150;
//		})
//		.attrTween("d", function(d, i) { 
//			var interpolate = d3.interpolate(
//				{startAngle : d.startAngle, endAngle : d.startAngle}, 
//				{startAngle : d.startAngle, endAngle : d.endAngle} 
//			);
//			return function(t){
//				return arc(interpolate(t)); 
//			}
//		});
//	const sumTextSplit = sumText.split("\n");
//	sumTextSplit.forEach((text,index)=>{
//		svg.append("text")
//			.attr("class", "total")
//			.text(text)
//			.attr("dy", index+"em")
//			.attr("transform",function(){
//				return "translate("+((w/2)-(this.getComputedTextLength()/2))+", "+((ph/1.8)-10-((sumTextSplit.length-1)*5))+")";
//			});
//	});
//	svg.append("text")
//		.attr("class", "total")
//		.text(($.heum.setThousandSeparator(sumValue===undefined?d3.sum(graphData):sumValue))+($.heum.hasData(unit)?unit:""))
//		.attr("transform",function(){
//			return "translate("+((w/2)-(this.getComputedTextLength()/2))+", "+((ph/1.8)+10+((sumTextSplit.length-1)*5))+")";
//		});
//	
//	const marginLeft = w/2-(legendMaxSize/2);
//	svg.append("g")
//		.selectAll("circle")
//		.data(data)
//		.join("circle")
//		.attr("cx", function(d, i){ return marginLeft;}) 
//		.attr("cy", function(d, i){ return i*25+ph})
//		.attr("r", 4)
//		.attr("fill", function(d, i){return colorData[i];});
//		
//	svg.append("g")
//		.attr('style', 'font-size:14px') 
//		.selectAll("text")
//		.data(pie(data))
//		.join("text")
//		.attr("x", function(d, i){ return marginLeft+5} ) 
//		.attr("y", function(d, i){ return i*25+ph+5 })
//		.text(function(d, i) {
//			return d.data.itm_nm;
//		});
//	svg.append("g")
//		.attr('style', 'font-size:14px') 
//		.selectAll("text")
//		.data(pie(data))
//		.join("text")
//		.attr("x", function(d, i){ return marginLeft+15+titleMaxLength*12} )
//		.attr("y", function(d, i){ return i*25+ph+5 })
//		.text(function(d, i) {
//			return " : " + $.heum.setThousandSeparator(graphData[i])+($.heum.hasData(unit)?unit:"");
//		});
//	svg.selectAll('.pie-label')
//		.data(pie(graphData))
//		.enter()
//		.append('text')
//		.attr("style", "color:#fff; font-size:12px;")
//		.classed('pie-label', true);
//	svg.selectAll('.pie-label')
//		.attr('x', function(d) {
//			return arc.centroid(d)[0]+w/2-13;
//		})
//		.attr('y', function(d) {
//			return arc.centroid(d)[1]+ph/1.8+3;
//		})
//		.text(function(d, i) {
//			return ((d.data/d3.sum(graphData))*100).toFixed(1)+"%";
//		});
}
/**
 * @name					: createStackBarChart
 * @description				: 스택 차트 생성
 * @param target			: html tag id
 * @param data				: 데이터
 * @param colors			: color 배열
 * @param category			: 카테고리
 * @param rotate			: x축 기울기 여부
 * @param avgLineData		: 평균선
 * @param tooltipCallback	: 차트 path 선택하면 나올 툴팁 콜백
 */
function createStackBarChart({target,data,columns,colors,category,rotate,avgLineData,unit,viewTotalColumn,tooltipCallback}){
	avgLineData = false;
	
	let height = 250; 
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	const chart = d3.select("#"+target+"");
	const svg = chart.append("svg")
					.attr("height", height+(rotate===true?100:30))
					.attr("width", width);
	var series = d3.stack().keys(columns)(data);
	var margin =  {top: 0, right: 35, bottom: 0, left: 35};
	const gSvg = svg.append("g")
					.attr("transform", "translate("+margin.left+","+margin.top+")");
	
	const xScale = d3.scaleBand()
					.domain(data.map(function(d){return d.category;}))
					.range([0, width-margin.right-margin.left])
					.padding(0.5);
	const yScale = d3.scaleLinear()
					.domain([0,  d3.max(series, function(d){return d3.max(d, function(d){ return d[1]})})*1.2  ])
					.range([height-margin.top-margin.bottom,margin.bottom]);
  
	const rects = gSvg.selectAll("g").data(series).enter()
					.append("g")
					.attr("data-type", "eventGroup")
					.attr("data-value",function(d,i){return i;})
	const textGroup = gSvg.append("g");
	textGroup.selectAll("g").data(category).enter()
			.append("text")
			.attr("y", function(d,i){ 
				let sum = 0;
				columns.forEach(key=>{
					sum+=data[i][key];
				});
				return yScale(sum)-8;
			})
			.text(function(d,i){
				if(typeof viewTotalColumn === "function"){
//					$.heum.setThousandSeparator(data[i][viewTotalColumn])
					return viewTotalColumn(data[i],i)+($.heum.hasData(unit)?unit:"");
				}else{
					let sum = 0;
					columns.forEach(key=>{
						sum+=data[i][key];
					});
					return $.heum.setThousandSeparator(sum)+($.heum.hasData(unit)?unit:"");
				}
			})
			.attr("x", function(d, i){
				return xScale(category[i])+(xScale.bandwidth()/2)-(this.getComputedTextLength()/2);
			});
	rects.selectAll("rect")
		.data(function(d){ return d})
		.join("rect")
		.style("cursor", "pointer")
		.attr("fill", function(d,i){
			return colors[$(this).parents("[data-type=eventGroup]").data("value")];
		})
		.attr("x", function(d, i){return xScale(d.data.category)})
		.attr("y", function(d){ return yScale(d[1]) })
		.attr("item", function(d){return d.data.category})
		.attr("width", xScale.bandwidth())
		.on("click", function(d, i){
			if(typeof tooltipCallback === "function"){
				tooltipCallback.call(this,d,i);
			}
		})
		.transition()
		.duration(1000)
		.delay(function (d, i) {
			return i * 150;
		})
		.attr("height",function(d){	return (!isNaN(yScale(d[0]) - yScale(d[1]))) ?  yScale(d[0]) - yScale(d[1]) : 0});
		
	gSvg.append("g")
		.attr("id", target+"-xAxis")
		.attr("style", "color:#878A89; font-size:12px;")
		.attr("transform", "translate(0,"+height+")")
		.call(d3.axisBottom(xScale));
	gSvg.append("g")
		.attr("style", "color:#878A89; font-size:12px;")
		.attr("id", target+"-yAxis")
		.call(d3.axisLeft(yScale).ticks(5, "s"));
	if(rotate===true){
		window.kwangheum = svg;
		window.kwangheumx = xScale;
		svg.select("#"+target+"-xAxis")
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-35)");
	}
	if(avgLineData){
		svg.append("line")
			.attr("x1", xScale(0))
			.attr("x2", width-10)
			.attr("y1", yScale(avgLineData))
			.attr("y2", yScale(avgLineData))
			.attr("stroke-dasharray", 4)
			.attr("stroke", "red");
	}
}
/**
 * @name					: createStackBarChartForMiddl
 * @description				: 데이터의 평균값이 100%가 나오지 않아 Stack Bar 차트로 %를 표시할 경우 사용
 * @param target			: html tag id
 * @param data				: 데이터
 * @param colors			: color 배열
 * @param category			: 카테고리
 * @param rotate			: x축 기울기 여부
 * @param avgLineData		: 평균선
 * @param tooltipCallback	: 차트 path 선택하면 나올 툴팁 콜백
 */
function createStackBarChartForPer({target,data,columns,colors,category,rotate,avgLineData,unit,viewTotalColumn,tooltipCallback}){
	avgLineData = false;
	
	let height = 250; 
	$("#"+target).empty();
	var width = $("#"+target).outerWidth();
	const chart = d3.select("#"+target+"");
	const svg = chart.append("svg")
					.attr("height", height+(rotate===true?100:30))
					.attr("width", width);
	var series = d3.stack().keys(columns)(data);
	//var margin =  {top: 0, right: 35, bottom: 0, left: 35};
	var margin =  {top: 0, right: 0, bottom: 0, left: 0};
	const gSvg = svg.append("g")
					.attr("transform", "translate("+margin.left+","+margin.top+")");
	
	const xScale = d3.scaleBand()
					.domain(data.map(function(d){return d.category;}))
					.range([0, width-margin.right-margin.left])
					.padding(0.5);
	const yScale = d3.scaleLinear()
					.domain([0,  d3.max(series, function(d){return d3.max(d, function(d){ return d[1]})})*1.2  ])
					.range([height-margin.top-margin.bottom,margin.bottom]);
  
	const rects = gSvg.selectAll("g").data(series).enter()
					.append("g")
					.attr("data-type", "eventGroup")
					.attr("data-value",function(d,i){return i;})
	const textGroup = gSvg.append("g");
	textGroup.selectAll("g").data(category).enter()
			.append("text")
			.attr("y", function(d,i){ 
				let sum = 0;
				columns.forEach(key=>{
					sum+=data[i][key];
				});
				return yScale(sum)-8;
			})
			.text(function(d,i){
				if(typeof viewTotalColumn === "function"){
//					$.heum.setThousandSeparator(data[i][viewTotalColumn])
					return viewTotalColumn(data[i])+($.heum.hasData(unit)?unit:"");
				}else{
					let sum = 0;
					columns.forEach(key=>{
						sum+=data[i][key];
					});
					return '100%';
				}
			})
			.attr("x", function(d, i){
				return xScale(category[i])+(xScale.bandwidth()/2)-(this.getComputedTextLength()/2);
			});
	rects.selectAll("rect")
		.data(function(d){ return d})
		.join("rect")
		.style("cursor", "pointer")
		.attr("fill", function(d,i){
			return colors[$(this).parents("[data-type=eventGroup]").data("value")];
		})
		.attr("x", function(d, i){return xScale(d.data.category)})
		.attr("y", function(d){ return yScale(d[1]) })
		.attr("item", function(d){return d.data.category})
		.attr("width", xScale.bandwidth())
		.on("click", function(d, i){
			if(typeof tooltipCallback === "function"){
				tooltipCallback.call(this,d,i);
			}
		})
		.transition()
		.duration(1000)
		.delay(function (d, i) {
			return i * 150;
		})
		.attr("height",function(d){	return (!isNaN(yScale(d[0]) - yScale(d[1]))) ?  yScale(d[0]) - yScale(d[1]) : 0});
		
	gSvg.append("g")
		.attr("id", target+"-xAxis")
		.attr("style", "color:#878A89; font-size:12px;")
		.attr("transform", "translate(0,"+height+")")
		.call(d3.axisBottom(xScale));
	/*gSvg.append("g")
		.attr("style", "color:#878A89; font-size:12px;")
		.attr("id", target+"-yAxis")
		.call(d3.axisLeft(yScale).ticks(5, "s"));*/
	if(rotate===true){
		window.kwangheum = svg;
		window.kwangheumx = xScale;
		svg.select("#"+target+"-xAxis")
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-35)");
	}
	if(avgLineData){
		svg.append("line")
			.attr("x1", xScale(0))
			.attr("x2", width-10)
			.attr("y1", yScale(avgLineData))
			.attr("y2", yScale(avgLineData))
			.attr("stroke-dasharray", 4)
			.attr("stroke", "red");
	}
}
/**
 * @name					: createLineChart
 * @description				: 스택 차트 생성
 * @param target			: html tag id
 * @param data				: 데이터
 * @param color				: 색상
 * @param dataVal			: data에서 출력할 데이터의 key
 * @param columnVal			: data에서 출력할 명칭의 key
 * @param unit				: 단위
 * @param rait				: rait
 * @param tooltipCallback 	: tooltipCallback
 */
function createLineChart({target, data, color, dataVal, columnVal,rait,unit,tooltipCallback}){
	let height = 250;
	//기본셋팅
	$("#"+target).empty();
	var temp = [];
	rait = rait||1.002;
	for(var i=1;i < data.length; i++){
			temp[i-1] = Number(data[i-1][dataVal])*rait;
			temp[i] = Number(data[i][dataVal])*rait;
		if(temp[i-1] <= temp[i]){
			temp[i-1] = data[i-1][dataVal]
		} else {
			temp[i] = data[i][dataVal]
		}
	}

	var width = $("#"+target).outerWidth();
	

	var margin = ({top: 10, right: 10, bottom: 20, left: 10})
	var radius = Math.min(width, height) / 2;
	var line = d3.line()
			.x(function(d){ return x(d[columnVal]) + x.bandwidth() / 2	})
			.y(function(d){ return y2(d[dataVal])	});
	
	var x = d3.scaleBand()
			.domain(data.map(function(d){ return d[columnVal]	}))
			.rangeRound([margin.left-10, width - margin.right+10])
			.padding(0.4);



	var y2 = d3.scaleLinear()
			.domain(d3.extent(data, function(d, i){ return Number(temp[i])	}))
			.rangeRound([height - margin.bottom-20, margin.top+10]);


	var xAxis = function(g){ return g.attr("transform", 'translate(0,'+(height - margin.bottom)+')')
							.call(d3.axisBottom(x)
							.tickFormat(function(i){ return i	})
							.tickSizeOuter(0));
						}

	var y1Axis = function(g){ return g.attr("transform", 'translate('+margin.left+',0)')
		.style("color", "steelblue")
		.call(function(g){ return g.select(".domain").remove()	})
		.call(function(g){ return g.append("text")
		.attr("x", -margin.left)
		.attr("y", 4)
		.attr("fill", "#878A89")
		.attr("font-family", "NanumSquare")
		.attr("text-anchor", "start")
		.text(data.y2)	});
	}

	var arc = d3.arc()
				.outerRadius(radius)
				.innerRadius(50);

	//타겟설정
	const chart = d3.select("#"+target);

	//차트 renderer시작
	const svg = chart.append("svg")
						.attr("height", height)
						.attr("width", width);
	

	var path = svg.append("path")
		.attr("fill", "none")
		.attr("stroke", color)
		.attr("stroke-miterlimit", 1)
		.attr("stroke-width", 1)
		.attr("d", line(data));

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
		.selectAll("circle")
		.data(data)
		.join("circle")
		.on("click",function(d){
			console.log(d)
		})
		.attr("fill", "#fff")
		.attr("stroke", color)
		.attr("stroke-width", 2)
		.attr("style", "pointer-events: none;")
		.attr("cx", function(d){ return x(d[columnVal]) + x.bandwidth() / 2	})
		.attr("cy", function(d){ return y2((target == 'time-total-rank-population') ? d.rank : d[dataVal])	})		
		.attr("r", 4)
		.attr("radius", 1)
		.attr("d", arc);

	svg.append("g")
		.selectAll("rect")
		.data(data)
		.join("rect")
		.on("click", function(d,i){
			if(typeof tooltipCallback === "function"){
				tooltipCallback(d,i);
			}
		})
		.attr("x", function(d){ return (x(d[columnVal]) + x.bandwidth() / 2)-10	})
		.attr("y", 0)
		.attr('width', 20)
		.attr('height', height)
		.attr("style", "fill-opacity:0;")
		
	svg.append("g").attr("style", "color:#878A89; font-size:11px;")
		.selectAll("text")
		.data(data)
		.join("text")
		.attr("style", "pointer-events: none;") //2020.09.22[신예리] mouse event 제거
		.attr("text-anchor", "middle")
		.attr("x", function(d,i){ return x(d[columnVal])+ x.bandwidth() / 2})
		.attr("y", function(d) { return y2(Number(d[dataVal]))-10	})
		.text( function(d){
			return $.heum.setThousandSeparator(d[dataVal])+($.heum.hasData(unit)?unit:"");
		})

	svg.append("g")
		.call(xAxis);

	svg.append("g")
		.call(y1Axis);

	$("#"+target).find("line").remove();
	$("#"+target).find("text").attr("style", "color:#878A89")
}
/**
 * @name					: createMultiLineChart
 * @description				: 멀티라인차트
 * @param target			: html tag id
 * @param series			: series
 * @param colors			: colors
 * @param categories		: categories
 * @param dataLabelsFormater: dataLabelsFormater
 * @param tooltipCallback 	: tooltipCallback
 */
function createMultiLineChart({target,series,colors,categories,dataLabelsFormater,tooltipCallback,unit}){
	$("#"+target).empty();
	let dataLabels = {}
	if(typeof dataLabelsFormater==="function"){
		dataLabels.enabled=true;
		dataLabels.formatter=dataLabelsFormater;
	}
	let options = {
		title: {
			text: null
		},
		subtitle: {
			text: null
		},
		credits: {
			enabled: false
		},
		xAxis: {
			title: {
				text: null,
				enabled: false,
				style: {
					fontSize: "10px",
					fontWeight: "bold"
				}
			},
			labels: {
				style: {
					fontSize: "10px",
					fontWeight: "bold"
				}
			},
			categories,
		},
		yAxis: {
			title: {
				text: null
			}
		},
		tooltip:{
			enabled: false
		},
		legend: {
			// 2022.02.01 차트 하단 범례를 줄여달라고 해서 수정했습니다.
			symbolWidth :8,
			padding:0,
			margin:40
		},
		plotOptions: {
			line:{
				dataLabels
			},
			series: {
				label: {
					connectorAllowed: false
				},
				point:{
					events:{
						click:function(event){
							if(typeof tooltipCallback==="function"){
								tooltipCallback({
									event,
									name :event.point.category,
									data : event.point.y
								});
							}
						}
					}
				}				
			}
		},
		series
	};
	if($.isArray(colors)){
		options.colors = colors;
	}
	Highcharts.chart(target, options);
}
/**
 * @name					: createTreeMap
 * @description				: 트리맵(highcharts)
 * @param target			: html tag id
 * @param series			: series
 * @param colors			: colors
 * @param tooltipCallback	: tooltipCallback
 */
function createTreeMap({target,series,colors, tooltipCallback}){
	$("#"+target).empty();
	new Highcharts.Chart({
		chart:{
			renderTo:target,
			type:"treemap"
		},
		colors,
		series,
		title: {
			text: null
		},
		subtitle: {
			text: null
		},
		credits: {
			enabled: false
		},
		tooltip:{
			enabled: false
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				point:{
					events:{
						click:function(event){
							if(typeof tooltipCallback==="function"){
								tooltipCallback({
									event
								});
							}
						}
					}
				}				
			}
		}
	});	
}
/**
 * @name						: createSemiCircleDonutChart
 * @description					: 반 도넛 차트
 * @param target				: html tag id
 * @param colors				: colors
 * @param series				: series
 * @param dataLabelsFormatter	: dataLabelsFormatter
 * @param tooltipCallback		: tooltipCallback
 */
function createSemiCircleDonutChart({target,size,center,colors,series,subtitle, dataLabelsFormatter, tooltipCallback}){
	center = center||['50%', '75%'];
	size = size || "110%";
	$("#"+target).empty();
	let options = {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: 0,
			plotShadow: false
		},
		title: subtitle,
//		subtitle: subtitle,
		credits: {
			enabled: false
		},
		tooltip:{
			enabled: false
		},
		accessibility: {
			point: {
				valueSuffix: '%'
			}
		},
		legend: {	
			// 2022.02.01 차트 하단 범례를 줄여달라고 해서 수정했습니다.
			symbolWidth :8,
			itemStyle: {
				
				fontSize: '11px',
				textOverflow: "allow"
			},
			labelFormatter: function() 
		    {
		        if(this.name!="")
		        {
		            return this.name;
		        }
		        else
		        {
		            return "";
		        }
			}
		},
		plotOptions: {
			pie: {
				dataLabels: {
					enabled: true,
					distance: -40,
					style: {
						fontWeight: 'bold',
						color: 'white'
					},
					formatter : dataLabelsFormatter
				},
				startAngle: -90,
				endAngle: 90,
				center,
				size,
				showInLegend: true,
				point:{
					events:{
						click:function(event){
							if(typeof tooltipCallback==="function"){
								tooltipCallback({
									event
								});
							}
						}
					}
				}
			}
		},
		series: series
	};
	
	if($.isArray(colors)){
		options.colors = colors;
	}
	Highcharts.chart(target, options);
}

/**
 * @name						: createHorizontalStackBarChart
 * @description					: 가로 스택 바 차트
 * @param target				: html tag id
 * @param series				: series
 * @param dataLabelsFormatter	: dataLabelsFormatter
 * @param tooltipCallback		: tooltipCallback
 */
function createHorizontalStackBarChart({target,categories,series,colors,tooltipCallback}){
	$("#"+target).empty();
	var corr = 1,pre = [];

	Highcharts.chart(target, {
		chart:{
			type:"bar"
		},
		colors,
		title: {
			text: null
		},
	    xAxis: {
	    	categories
	    },
	    yAxis: {
	        min: 0,
	        title: { text: null }
	    },
	    legend: {
	        reversed: true
	    },
	    plotOptions: {
	    	series: {
	    		stacking: 'percent',
	    		dataLabels: {
	    			enabled: true,
	    			style: {
	    				color: 'black'
	    			},
	                formatter: function () {
	                    return this.percentage.toFixed(1) + '%';
	                }
	    		},
	    		point:{
	                events:{
	                   click:function(event){
	                      if(typeof tooltipCallback==="function"){
	                         tooltipCallback({
	                            event
	                         });
	                      }
	                   }
	                }
	             }
	    	}
	    },
	    tooltip:{
			enabled: false
		},
		credits: {
			enabled: false
		},
	    series: series
	});
}