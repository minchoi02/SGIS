let chartDatas = null;
$(document).ready(function(){
	$("[data-id=databoard]").click(function(){
		const data = chartDatas[$(this).data("value")+"TimeGenderAgePopulation"];
		if(data){
			$("#databoard").empty();
			const max = d3.max(data, function(d){ return (Number(d.males)+Number(d.females))});
			const min = d3.min(data, function(d){ return (Number(d.males)+Number(d.females))});
			data.forEach(function(d,index){
				let tr = $("<tr/>");
				let highlight = "";
				const sum = Number(d.males) + Number(d.females);
				if(sum == max){
				$("#databoard-container [data-id=year]").text("성별("+d.surv_year+")");
					highlight = "max-color";
				}else if(sum == min){
					highlight = "min-color";
				}
				if(index==0){
					tr.append($("<td/>",{"style":"width:25%","rowspan":data.length,"text":d.region_nm}));
				}
				tr.append($("<td/>",{"class":highlight,"style":"width:25%","text":d.age}));
				tr.append($("<td/>",{"class":highlight,"style":"width:25%","text":$.heum.setThousandSeparator(d.males)}));
				tr.append($("<td/>",{"class":highlight,"style":"width:25%","text":$.heum.setThousandSeparator(d.females)}));
				$("#databoard").append(tr);
			});
			$("#databoard-container,.dim").show();
		}else{
			alert("데이터가 존재하지 않습니다");
		}
		return false;
	});
});
function createTotSur(){
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/population/GetPopulationTmsChart.json",
		data: {
			rightYear: $totSurvMap.ui.year.map, 
			leftYear : $totSurvMap.ui.year["top-map"], 
			region_cd : $totSurvMap.ui.admCd
		}, 
		dataType: "json",
		success: function(res) {
			if (res.errCd == "0") {
				chartDatas = res.result;
				timeGenderAgePopulationChart(res.result.leftTimeGenderAgePopulation,"map-time-ender-age-population-chart",$totSurvMap.ui.year.map,)
				timeGenderAgePopulationChart(res.result.rightTimeGenderAgePopulation,"top-map-time-ender-age-population-chart",$totSurvMap.ui.year["top-map"])
			}
		}
	});
	$.ajax({
		method: "POST",
		async: true,
		url: sgisContextPath + "/ServiceAPI/totSurv/population/GetPopulationTmsChart.json",
		data: {
			startYear : $totSurvMap.ui.year["top-map"], 
			endYear : $totSurvMap.ui.year.map, 
			region_cd : $totSurvMap.ui.admCd
		},
		dataType: "json",
		success: function(res) {
			if (res.errCd == "0") {
				createLineChart({unit:"명",target:"time-total-population-chart", data:res.result.timeTotalPopulation, color:"#7419B1", dataVal:"dt", columnVal:"surv_year",tooltipCallback:function(d,i){
					const tooltip = $("#time-total-population-chart-container").find("[data-type=tooltip]");
					tooltip.empty();
					tooltip.append(
						$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
							$("<h3/>",{"class":"modal__tit","text":d.surv_year+"년 총인구"}),
							$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
								$(this).parents('[data-type=tooltip]').hide();
								return false;
							}).append($("<span/>",{"class":"btn-close btn-close--black"}))
						),
						$("<div/>",{"class":"modal__body"}).append(
							$("<p/>").append(
								$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"명"
							)
						)
					).show();
				}});
				if($totSurvMap.ui.admCd!="00"){
					createLineChart({unit:"위",target:"time-total-rank-population-chart", data:res.result.timeTotalPopulation, color:"#97BB03", dataVal:"rank", columnVal:"surv_year",tooltipCallback:function(d,i){
						const tooltip = $("#time-total-rank-population-chart-container").find("[data-type=tooltip]");
						tooltip.empty();
						tooltip.append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":d.surv_year+"년 광역시·도 순위 변화"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents('[data-type=tooltip]').hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-red font-large fwbold","text":d.rank}),"위"
								)
							)
						).show();
					}});
				}
				createLineChart({unit:"명",target:"tiem-gender-population-chart", data:res.result.timeGenderChangePopulation, color:"#f73393", dataVal:"dt", columnVal:"surv_year",tooltipCallback:function(d,i){
					const tooltip = $("#tiem-gender-population-chart-container").find("[data-type=tooltip]");
					tooltip.empty();
					tooltip.append(
						$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
							$("<h3/>",{"class":"modal__tit","text":d.surv_year+"년 남녀 성비 변화"}),
							$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
								$(this).parents('[data-type=tooltip]').hide();
								return false;
							}).append($("<span/>",{"class":"btn-close btn-close--black"}))
						),
						$("<div/>",{"class":"modal__body"}).append(
							$("<p/>").append(
								$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"명"
							)
						)
					).show();
				}});
				createLineChart({unit:"명",target:"tiem-foreign-population-chart", data:res.result.timeForeignPopulation, color:"#576574", dataVal:"dt", columnVal:"surv_year",tooltipCallback:function(d,i){
					const tooltip = $("#tiem-foreign-population-chart-container").find("[data-type=tooltip]");
					tooltip.empty();
					tooltip.append(
						$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
							$("<h3/>",{"class":"modal__tit","text":d.surv_year+"년 외국인 수 변화"}),
							$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
								$(this).parents('[data-type=tooltip]').hide();
								return false;
							}).append($("<span/>",{"class":"btn-close btn-close--black"}))
						),
						$("<div/>",{"class":"modal__body"}).append(
							$("<p/>").append(
								$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.dt)}),"명"
							)
						)
					).show();
				}});
			}
		},
		error: function(e) {
			alert('failed');
		}
	});
}

/**
 * @name		: timeGenderAgePopulationChart 
 * @description	: 연도별 남녀 나이대별 인구 정보 Chart
 * @date		: 2020.09.13
 * @author		: esPark
 * @history	:
 * @Parameter	data : Data
 *				target : Chart를 그릴 div id
 *				year : 년도"
 */

function timeGenderAgePopulationChart(data, target, year){
	let height = 250;
	$("#"+target).empty();
	if(data.length == 0 || data.length == undefined){
		return;
	}

	var margin = ({ left: 80, right: 0, top: 10, bottom: 30	}); //2020.10.29[신예리] margin bottom 변경
	var w = $("#"+target).outerWidth()-150;
	var h = height - margin.top - margin.bottom
	var centreSpacing = 0 //가운데 마진값 
	
	var y = d3.scaleBand() // bar 그리는 부분
			.domain(data.map(function(d){ return d.age	}))
			.range([h, 0])
			.padding(0.1);
	
	var maxVal = d3.max(data, function(d){ return d3.max([Number(d.males), Number(d.females)])	})
	
	var x = d3.scaleLinear()
			.domain([0, maxVal]).nice()
			.range([0, (w - centreSpacing)/2 ]);

	var xReverse = d3.scaleLinear()
			.domain([maxVal, 0]).nice()
			.range([0, (w - centreSpacing)/2])

	var svg = d3.select("#"+target)
			.append('svg')
			.attr("height", height)
			.attr("width", w+100);

	var gM = svg.append("g")
			.attr('class', 'male')
			.attr("transform", "translate(" + (Number(margin.left)) + "," + margin.top + ")");
	gM.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.style("cursor", "pointer") //2020.10.23[신예리] 마우스 커서 추가
		.attr('x', function(d){ return (w - centreSpacing) / 2	}) // 시작 x 좌표
		.attr('y', function(d){ return y(d.age)	})
		.attr('height', y.bandwidth())
		.on("click", function(d){
			const tooltip = $("#"+target+"-container").find("[data-type=tooltip]");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":year+"년 총인구_남자"}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.age)}),
					),
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.males)}),"명"
					)
				)
			).show();
		})
		.transition()
		.duration(1000)
		.delay(function (d, i) {
			return i * 50;
		})
		.attr('width', function(d){ return x(d.males)	})
		.attr('x', function(d){return (w - centreSpacing) / 2 -x(d.males)}) // 종료 x
		.attr('fill', '#21AEF1'); // 2020.09.23[신예리]남 차트 컬러 변경

	var gF = svg.append("g")
		.attr('class', 'female')
		.attr(
				'transform',
				'translate(' +
				(margin.left + (w - centreSpacing) / 2 + centreSpacing) +
				"," +
				margin.top +
				")"
		);
	gF.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.style("cursor", "pointer") //2020.10.23[신예리] 마우스 커서 추가
		.on("click", function(d){
			const tooltip = $("#"+target+"-container").find("[data-type=tooltip]");
			tooltip.empty();
			tooltip.append(
				$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
					$("<h3/>",{"class":"modal__tit","text":year+"년 총인구_여자"}),
					$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
						$(this).parents('[data-type=tooltip]').hide();
						return false;
					}).append($("<span/>",{"class":"btn-close btn-close--black"}))
				),
				$("<div/>",{"class":"modal__body"}).append(
					$("<p/>").append(
						$("<span/>",{"class":"color-blue font-large fwbold","text":$.heum.setThousandSeparator(d.age)}),
					),
					$("<p/>").append(
						$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(d.females)}),"명"
					)
				)
			).show();
		})
		.attr('x', 0)
		.attr('y', function(d){ return y(d.age)	})
		.attr('height', y.bandwidth())
		.attr('width', 0)
		.transition()
		.duration(1000)
		.delay(function (d, i) {
					return i * 50;
				})
		.attr('width', function(d){ return x(d.females)	}) //여성인구 width
		.attr('fill', '#FE5959'); //2020.09.23[신예리] 여자 차트 컬러 변경
	
	// add labels for age groups in the centre of the chart
	// first, a g element for the labels
	var gLabels = svg.append('g')
		.attr('class', 'label')
		.attr(
			'transform',
			'translate(' +
			($("#"+target).width()/($("#"+target).width()/100)+230)+ ',' + margin.top + ')'
		);

	// 2020.09.22[신예리] font-size 및 컬러 추가 ('나이'주석 처리) START //
	// then, add the labels
	gLabels.selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.attr('fill','#596070')
			.attr("font-size", 12)
			.attr('x', -330)
			.attr('y', function(d){ return y(d.age) + y.bandwidth() / 2	})
			.text(function(d, i){ return (i != data.length - 1 ? (i % 5 == 0 ? d.age : '') : '85세 이상')	});

	// add Male/Female labels
	gF.append('text')
		.text('여자(명)')
		.attr('x', (w - centreSpacing) / 2)
		.attr('y', h - 7)
		.attr("font-size", 12)
		.style('text-anchor', 'end');
 
	gM.append('text')
		.text('남자(명)')
		.attr('x', 0)
		.attr('y', h - 7)
		.attr("font-size", 12)
		.style('text-anchor', 'start');

	// add an axis for female pop values
	gF.append("g")
		.attr('transform', 'translate(0,' + (h + 3) + ')')
		.call(d3.axisBottom(x).ticks(w / 80, "s"));

	// add an axis for male pop values
	gM.append("g")
		.attr('transform', 'translate(0,' + (h + 3) + ')')
		.call(d3.axisBottom(xReverse).ticks(w / 80, "s"));

}
