
(function(W, D) {
	W.$reportForm = W.$reportForm || {};
	$(document).ready(function(){
		$reportForm.ui.opener = W.opener.eval($commonFunc.getUrlParameter("callback"));
		if ($.isFunction($reportForm.ui.opener.reportLoad)) {
			$reportForm.ui.opener.reportLoad.call(this);
		}
	});
	$reportForm.ui = {
			
			
		/**
		 * @name         : setData
		 * @description  : 보고서를 설정한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @param data    : 데이터
		 */
		setData : function(data) {
			$("#mask").remove();
			$("#singleMapDivArea").show();
			$("#normalChartDiv").show();
			$("#normalTableDiv").show();
			
			if (data.chart.length > 1) {
				$("#additionalChartDiv").show();
			}
			
			this.setMainReportInfo(data);
			this.setLegend(data);
			this.drawMap(data);		
			this.setChart(data);
			this.setGrid(data);
			
		},
		
		/**
		 * @name           : setMainReportInfo
		 * @description    : 보고서의 기본정보를 설정한다.
		 * @date           : 2018. 10. 25. 
		 * @author	       : 권차욱
		 * @param tData    : 데이터
		 */
		setMainReportInfo : function(tData) {
			
			//분석제목
			if (W.opener) {
				//보고서명
				var title = W.opener.$("#analysisTitle2").html();
				$("#analysisTitle").html(title);
				
				//분석타입
				var type = W.opener.$("#analysisType2").html();
				$("#analysisType").html(type);
				
				//분석조건
				var dataCondition = W.opener.$("#dataInfo2").html();
				$("#dataCondition").html(dataCondition);
				
				//지역조건
				var regionCondition = W.opener.$("#regionInfo2").html();
				$("#regionCondition").html(regionCondition);
				
				//버퍼조건
				if (tData.data.paramInfo.analysis_type == "BUFFER") {
					$("#conditionArea").css({
						"height" : "90px",
						"line-height" : "90px"
					});
					var bufferCondition = W.opener.$("#bufferInfo").html();
					$("#bufferCondition").html(bufferCondition);
					$("#bufferCondition").show();
				}
				
				//분석일자
				var date = W.opener.$("#analysis_time").html();
				$("#analysisTime").html(date);
			}
		},
		
		/**
		 * @name           : drawMap
		 * @description    : 보고서의 지도화면을 생성한다.
		 * @date           : 2018. 10. 25. 
		 * @author	       : 권차욱
		 * @param data    : 데이터
		 */
		drawMap : function(data) {
			var originWidth = data.mapWidth;
			var originHeight = data.mapHeight;
			var rate = originWidth/originHeight;
			var height = 472;
			var width = parseInt(height*rate);
			//var width = 798;
			//var height =  parseInt(width/rate);

			var reportMapCss = {
 	 				"width" : width+"px",
	 	 			"height" : height+"px",
	 	 			"overflow":"hidden",
	 	 			"margin-left" : parseInt((798 - width) / 2) + "px"
 	 		};
			
			var id = "#singleMapDiv_"; 
			for (var i=0; i<data.mapData.length; i++) {
				var mapData = data.mapData[i];
				$(id+(i+1)).attr("src", mapData);
				$(id+(i+1)).css(reportMapCss);
			}
		},
		/**
		 * @name         : setLegend
		 * @description  : 보고서의 범례를 설정한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @param data : 데이터
		 */
		setLegend : function(data) {
			if (this.opener) {
				var map = this.opener.map;
				var legendId = "#legend_";
				
				if (map != null) {
					var mapId = map.id + 1;
					var legend = $(map.legend.legendObj).clone().removeClass("min");
					$(legendId+mapId).append($(legend).html());
					$(legendId+mapId).find(".legendBox").removeClass("min");
					$(legendId+mapId).find(".legendRound").hide();
					$(legendId+mapId).find(".lgListBox").hide();
					$(legendId+mapId).find(".legendRrefresh").css("right", "13px");
				}
			}	
		},
		
		/**
		 * @name         : setChart
		 * @description  : 보고서의 차트를 설정한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @param data : 데이터
		 */
		setChart : function(data){
			for (var i=0; i<data.chart.length; i++) {
				var chartImg = data.chart[i].data;
				if (i==0) {
					$("#normalDetailChart").attr("src", chartImg);
				}else {
					$("#additionalDetailChart").attr("src", chartImg);
				}
			}
		},
		
		/**
		 * @name         : setGrid
		 * @description  : 보고서의 표를 설정한다.
		 * @date         : 2018. 10. 25. 
		 * @author	     : 권차욱
		 * @param data : 데이터
		 */
		setGrid : function(data) {
			var grid = data.grid;
			$("#normalDetailTable").html(grid.html());
		}
	};
}(window, document));