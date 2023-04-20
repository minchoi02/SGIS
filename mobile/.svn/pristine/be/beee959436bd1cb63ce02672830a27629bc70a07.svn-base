(function(W, D) {
	W.$highchartApi = W.$highchartApi || {};
	
	$highchartApi = {
		/**
		 * @name             : chart
		 * @description      : 차트 그리기
		 * @date             : 2015. 12. 09.
		 * @author           : 나광흠
		 * @history          :
		 * @param element    : jquery selector
		 * @param type       : 차트 타입
		 * @param width      : 차트 넓이
		 * @param height     : 차트 높이
		 * @param itemHeight : 차트 아이템의 높이
		 * @param dataName   : 데이터 이름
		 * @param unit       : 단위
		 * @param data       : 데이터 : [{name:"이름",y:"y축 값"}]
		 * @param xAxisLabel : x축 라벨 표시 유무
		 * @param yAxisLabel : y축 라벨 표시 유무
		 * @param labelShowIndexArray : 보여주고싶은 x축 라벨 index
		 * @param pointClickCallback : 차트 아이템 클릭 이벤트 콜벡
		 */
		chart : function(element,type, width, height,itemHeight, dataName, unit, data, xAxisLabel, yAxisLabel, labelShowIndexArray, pointClickCallback) {
			var xAxisLabelIndex = 0;
			type = hasText(type)?type:"bar";
			var series = {
				data: data
			};
			var chartOption = {
				type: type,
				backgroundColor: 'white'
			};
			if(itemHeight&&!isNaN(parseInt(itemHeight))){
				series.pointWidth = parseInt(itemHeight);
			}
			if(height&&!isNaN(parseInt(height))){
				chartOption.height = parseInt(height);
			}
			if(width&&!isNaN(parseInt(width))){
				chartOption.width = parseInt(width);
			}
			$(element).highcharts({
				chart: chartOption,
				title: {
					text: ''
				},
				xAxis: {
					type: "category",
					labels: {
						enabled: xAxisLabel,
						style : {
							textOverflow :"none" 
						},
						formatter : function(){
							if(labelShowIndexArray&&labelShowIndexArray.length>0){
								xAxisLabelIndex++;
								if(labelShowIndexArray.indexOf(xAxisLabelIndex-1)>-1){
									return this.value;
								}
							}else{
								return this.value;
							}
						},
						staggerLines: 1
					}
				},
				yAxis: {
					title: {
						text: ''
					},
					labels: {
						enabled: yAxisLabel
					}
				},
				series: [series],
				tooltip: {
					formatter : function(){
						var header = '<div><span>'+this.points[0].key+'</span></div>';
						var pointer = "";
						$.each(this.points,function(){
							pointer+='<div>'+(hasText(dataName)?'<span>'+dataName+': </span>':'')+'<span style="font-weight: bold;">'+appendCommaToNumber(this.y)+'</span>'+(unit?"("+unit+")":"")+'</div>';
						});
						return header+pointer;
					},
					shared: true,
					useHTML: true
				},
				plotOptions: {
					column: {
						borderWidth: 0
					},
					series: {
						cursor: 'pointer',
						point: {
							events: {
								click: function(e) {
									if(typeof pointClickCallback === "function"){
										pointClickCallback(this);
									}
									this.series.chart.tooltip.refresh([this]);
								}
							}
						}
					}
				},
				legend: {
					enabled: false
				}
			});
		},
		/**
		 * @name                      : categoryChart
		 * @description               : 카테고리 있는 차트 그리기
		 * @date                      : 2015. 12. 09.
		 * @author                    : 나광흠
		 * @history                   :
		 * @param element             : jquery selector
		 * @param type                : 차트 타입
		 * @param width               : 넓이
		 * @param height              : 높이
		 * @param itemHeight : 차트 아이템의 높이
		 * @param series              : 데이터
		 * @param categories          : 카테고리 Array, 만약 카테고리별로 단위가 있으면 ["값;단위"] 이런식으로 카테고리에 ;로 구분해주고 단위를 넣어주시고 마지막 파라미터 unit은 빈칸으로 넣어주세요
		 * @param xRotation           : x 라벨 기울기
		 * @param unit                : 단위
		 * @param labelShowIndexArray : 보여주고싶은 x축 라벨 index
		 * @param pointClickCallback  : 차트 아이템 클릭 이벤트 콜벡
		 */
		categoryChart : function(element, type, width, height, itemHeight, series, categories,xRotation,unit,labelShowIndexArray,pointClickCallback) {
			var xAxisLabelIndex = -1;
			if(!unit){
				unit = "";
			}
			var chartOption = {
				backgroundColor: 'white',
				width: width,
				height: height
			};
			if($.isNumeric(itemHeight)){
				itemHeight = parseInt(itemHeight);
				if($.isArray(series)){
					$.each(series,function(){
						this.pointWidth = itemHeight;
					});
				}else{
					series.pointWidth = itemHeight;
				}
			}
			if(type){
				chartOption.type = type;
			}
			$(element).highcharts({
				chart: chartOption,
				title: {
					text: ''
				},
				xAxis: {
					labels: {
						rotation: xRotation,
						style : {
							textOverflow :"none"
						},
						formatter:function(){
							if(labelShowIndexArray&&labelShowIndexArray.length>0){
								xAxisLabelIndex++;
								if(labelShowIndexArray.indexOf(xAxisLabelIndex)>-1){
									return this.value.split(";")[0];
								}
							}else{
								return this.value.split(";")[0];
							}
						},
						staggerLines: 1
					},
					categories: categories,
					crosshair: true
				},
				yAxis: {
					title: {
						text: ''
					}
				},
				series : series,
				legend: {
					itemStyle: {
						fontSize: "10px"
					}
				},
				tooltip: {
					formatter : function(){
						var seriesName = this.x.split(";");
						var header = '<div><span style="font-size:10px">'+seriesName[0]+'</span></div>';
						var pointer = "";
						$.each(this.points,function(cnt,node){
							pointer+='<div><span style="color:'+node.series.color+'">';
							pointer+=node.series.name+' : '+appendCommaToNumber(this.y)+' '+(hasText(unit)?unit:seriesName[1]);
							pointer+='</span></div>';
						});
						return header+pointer;
					},
					shared: true,
					useHTML: true
				},
				plotOptions: {
					column: {
						borderWidth: 0
					},
					series: {
						cursor: 'pointer',
						point: {
							events: {
								click: function(e) {
									if(typeof pointClickCallback === "function"){
										pointClickCallback(this);
									}
									this.series.chart.tooltip.refresh([this]);
								}
							}
						}
					}
				},
				legend: {
					itemStyle: {
						fontSize: "10px"
					}
				}
			});
		},
		/**
		 * @name            : spiderwebChart
		 * @description     : spiderwebChart 차트 그리기
		 * @date            : 2015. 12. 09.
		 * @author          : 나광흠
		 * @history         :
		 * @param element   : jquery selector
		 * @param width     : 차트 넓이
		 * @param height    : 차트 높이
		 * @param series    : 데이터
		 * @param categories: 카테고리
		 * @param isTooltip : 툴팁 보여줄지 여부
		 * @param min       : 최소 데이터 값
		 * @param max       : 최대 데이터 값
		 */
		spiderwebChart : function(element,width,height,series,categories,isTooltip,min,max){
			var yAxis = {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				labels: {
					enabled: false
				},
				tickInterval: 1
			};
			if(hasText(min)){
				yAxis.min = min;
			}
			if(hasText(max)){
				yAxis.max = max;
			}
			$(element).highcharts({
				chart: {
					polar: true,
					type: 'line',
					width: width,
					height: height
				},
				title: {
					text: ''
				},
				pane: {
					size: '80%'
				},
				tooltip: {
					enabled: isTooltip,
					shared: true,
					useHTML: true,
					formatter : function(){
						var seriesName = this.x.split(";");
						var header = '<div><span style="font-size:10px">'+seriesName[0]+'</span></div>';
						var pointer = "";
						$.each(this.points,function(cnt,node){
							pointer+='<div><span style="color:'+node.series.color+'">';
							pointer+=node.series.name+' : '+appendCommaToNumber(this.y);
							pointer+='</span></div>';
						});
						return header+pointer;
					}
				},
				series: series,
				xAxis: {
					categories: categories,
					tickmarkPlacement: 'on',
					lineWidth: 0
				},
				yAxis: yAxis,
				legend: {
					itemStyle: {
						fontSize: "10px"
					}
				}
			});
		},
		/**
		 * @name            : genderPieChart
		 * @description     : genderPieChart 차트 그리기
		 * @date            : 2015. 12. 09.
		 * @author          : 나광흠
		 * @history         :
		 * @param element   : jquery selector
		 * @param adm_nm    : 지역 이름
		 * @param m_ppl     : 남자 인구 수
		 * @param m_per     : 남자 인구 비율
		 * @param f_ppl     : 여자 인구 수
		 * @param f_per     : 여자 인구 비율
		 */
		genderPieChart : function(element,adm_nm,m_ppl,m_per,f_ppl,f_per){
			$(element).highcharts({
				chart: {
					backgroundColor: "#fff",
					borderWidth: 0,
					margin: [0, 0, 0, 0],
					height: 170,
					width: 170
				},
				colors: ['#E64C2C', '#4C9AD3'],
				tooltip: {
					enabled: false
				},
				navigation: {
					buttonOptions: {
						enabled: false
					}
				},
				title: {
					text: ''
				},
				plotOptions: {
					pie: {
						dataLabels: {
							enabled: true,
							distance: -50,
							style: {
								fontWeight: 'bold',
								color: 'white',
								textShadow: '0px 1px 2px black'
							}
						},
						startAngle: 0,
						endAngle: 360,
						center: ['50%', '50%'],
						borderWidth: 0
					}
				},
				series: [{
					type: 'pie',
					name: '비율',
					innerSize: '91%',
					data: [
					       ['여자 인구비율', f_per],
					       ['남자 인구비율', m_per]
					       ],
					       dataLabels: {
					    	   enabled: true,
					    	   rotation: -45,
					    	   color: '#333333',
					    	   align: 'right',
					    	   x: -4004,
					    	   y: 20,
					    	   style: {
					    		   fontSize: '15px',
					    		   fontWeight: 'normal'
					    	   }
					       }
				}],
				legend: {
					itemStyle: {
						fontSize: "10px"
					}
				}
				
			});
			$(element+"-male > span").html("남, " + m_per + "% <br/>(" + appendCommaToNumber(m_ppl) + "명)"); //남자
			$(element+"-female > span").html("여, " + f_per + "% <br/>(" + appendCommaToNumber(f_ppl) + "명)"); //여자
			$(element+"-location > span").html(adm_nm);
		},
		/**
		 * @name                 : pieChart
		 * @description          : pieChart 차트 그리기
		 * @date                 : 2017. 02. 07.
		 * @author               : 차수아
		 * @history              :
		 * @param element        : jquery selector
		 * @param width          : 차트 넓이
		 * @param height         : 차트 높이
		 * @param dataName       : 데이터 이름 
		 * @param unit           : 단위 
		 * @param series         : 데이터
		 * @param isDataLabels   : 차트 위에다가 항목 표출해줄지의 여부
		 * @param isShowInLegend : 라벨 표시 유무
		 */
		pieChart : function(element, width, height, dataName, unit, series,isDataLabels,isShowInLegend){
			isDataLabels = isDataLabels===true;
			isShowInLegend = isShowInLegend===true;
			if(!hasText(dataName)){
				dataName = ' ';
			}
			$(element).highcharts({
				chart : {
			        type: 'pie',
			        width : width,
			        height : height
				},
				title : {
					text : ''
				},
				tooltip: {
					formatter : function(){
						var header = '<div><span style="font-size:13px">'+this.key+'</span></div>';
						var pointer = "<br>";
						pointer+='<div><span style="color:'+this.point.color+'">';
						pointer+=(hasText(dataName)?dataName+" : ":"")+appendCommaToNumber(this.y)+(hasText(unit)?"("+unit+")":"");
						pointer+='</span></div>';
						return header+pointer;
					}
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: isDataLabels,
							distance: -30
						},
						showInLegend: isShowInLegend
					}
				},
				series : [{
					name : dataName,
					data : series
				}]
			});
		}
	};
}(window, document));