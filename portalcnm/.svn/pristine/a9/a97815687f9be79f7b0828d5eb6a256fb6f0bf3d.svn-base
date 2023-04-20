/**
 * 범례에 관한 클래스
 * 
 * history : 네이버시스템(주), 1.0, 2015/09/08 초기 작성 author : 김성현 version : 1.0 see :
 * 
 */
(function(W, D) {
	W.$legendInfo = W.$legendInfo || {};
	$(document).ready(function() {
		$.cssHooks.backgroundColor = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["backgroundColor"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("background-color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};
		
		$.cssHooks.color = {
			    get: function(elem) {
			        if (elem.currentStyle)
			            var bg = elem.currentStyle["color"];
			        else if (window.getComputedStyle)
			            var bg = document.defaultView.getComputedStyle(elem,
			                null).getPropertyValue("color");
			        if (bg.search("rgb") == -1)
			            return bg;
			        else {
			            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			            function hex(x) {
			                return ("0" + parseInt(x).toString(16)).slice(-2);
			            }
			            if(bg != null) {
			            	return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
			            } else {
			            	return "#fff";
			            }
			        }
			    }
		};

		
	});
	
	$legendInfo.ui = {
		/**
		 * @description : Element 생성
		 * @param elem
		 *            범례 HTML을 생성한다.
		 */
		create : function(elem) {
			$(elem.selector).replaceWith("<div>asdfd</div>");
		}
	}

	/*
	 * 
	 * @name : sLegendInfo 
	 * @description : 맵 및 맵에 오버레이될 범례를 생성한다. 
	 * @date : 2015.10. 15. 
	 * @author : 최재영
	 * @history : 기존 mapInfo.js에서 sMapInfo에서 legend 부분만을빼서 작업
	 */

	sLegendInfo = {
		legendInfo : function(map) {
			// 변수
			var that = this;
			this.initLv = 10;
			this.lv = 10;
			this.selectType="color";//현재 선택된 범례의 타입
			this.oldSelectType = null;
			this.guganSetting = null;
			this.colorSetting = null;
			this.opacity=null;
			this.map = map;
			this.id = null;
			this.numberData=true; //지도상에 숫자값을 보여줄지 결정
			this.initNumberData=true; //지도상에 숫자값을 보여줄지 결정
			this.reverseOn = false; //리버스 여부 
			this.legendObj = null; // 범례 Object
			this.rentalLegendObj = null; // 권리금 Object
			//this.legendColor = ["#953266","#9B4371","#A1547C","#A76588","#AD7693","#B3879E","#B998AA","#BFA9B5","#C5BAC0","#CCCCCC"];
			this.legendColor = ["#CCCCCC", "#C5BAC0", "#BFA9B5", "#B998AA", "#B3879E", "#AD7693", "#A76588", "#A1547C", "#9B4371", "#953266"];
			this.legendCircleRadius = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
			this.legendDotRadius = 9;
			this.legendColor1 = "#953266";
			this.legendColor2 = "#CCCCCC";
			this.negativeLegendColor = null;
			this.houseValPerSlice = [1,2,3,'N/A'];
			this.guganLevel=[];//범례 임시
			this.guganLevelSetting=[];//확정값
			this.rentalLegendValue = [];
			this.rentalLegendCircle = [ 17, 35, 47 ];
			this.rentalLegendColor = [ "#e2f1ff", "#badcff", "#7dbdff", "#409eff", "#0880fa" ];
			this.rentalLegendType = "auto";
			this.isNegative = false;
			this.data = null;
			this.perPixel = 0;
			
			
			//map.js작업
			this.valPerSlice = null;
			this.legendType = "auto";
			this.legendValue={
					auto : null,
					equal : null,
					user : [[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]]
			};
			this.dataGeojson = null;
			this.circleMarkerGroup = null;
			this.userTableWidthList = null;
			
			
			this.jenks = function(data,n_classes){
				data = data.slice().sort(function (a, b) { return a - b; });
				var matrices = that.jenksMatrices(data, n_classes),
	            lower_class_limits = matrices.lower_class_limits;
	            var k = data.length - 1;
	            var kclass = [];
	            var countNum = n_classes;
	            
	            if (data.length < n_classes) {
	            	//countNum = data.length;
	            	return data;
	            }
	            
				kclass[n_classes] = data[data.length - 1];
				kclass[0] = data[0];

				while (countNum > 1) {
					kclass[countNum - 1] = data[lower_class_limits[k][countNum] - 2];
					k = lower_class_limits[k][countNum] - 1;
					if (k < 0) {
						k = 0;
					}
					countNum--;
				};

				return kclass;
				
			};
			
			this.jenksMatrices = function(data,n_classes){
				var lower_class_limits = [],
	            variance_combinations = [],
	            i, j,
	            variance = 0;

				for (i = 0; i < data.length + 1; i++) {
					var tmp1 = [], tmp2 = [];
					for (j = 0; j < n_classes + 1; j++) {
						tmp1.push(0);
						tmp2.push(0);
					}
					lower_class_limits.push(tmp1);
					variance_combinations.push(tmp2);
				}

				for (i = 1; i < n_classes + 1; i++) {
					lower_class_limits[1][i] = 1;
					variance_combinations[1][i] = 0;
				
					for (j = 2; j < data.length + 1; j++) {
						variance_combinations[j][i] = Infinity;
					}
				}

				for (var l = 2; l < data.length + 1; l++) {
					var sum = 0,
	                sum_squares = 0,
	                w = 0,
	                i4 = 0;

	            for (var m = 1; m < l + 1; m++) {

	                var lower_class_limit = l - m + 1,
	                    val = data[lower_class_limit - 1];	                
	                	w++;

	                	sum += val;
	                	sum_squares += val * val;

	                	variance = sum_squares - (sum * sum) / w;

	                	i4 = lower_class_limit - 1;

	                	if (i4 !== 0) {
	                		for (j = 2; j < n_classes + 1; j++) {
	                			if (variance_combinations[l][j] >=
	                				(variance + variance_combinations[i4][j - 1])) {
	                					lower_class_limits[l][j] = lower_class_limit;
	                					variance_combinations[l][j] = variance +
	                					variance_combinations[i4][j - 1];
	                			}
	                    }
	                }
	            }

	            lower_class_limits[l][1] = 1;
	            variance_combinations[l][1] = variance;
	        }

	        return {
	            lower_class_limits: lower_class_limits,
	            variance_combinations: variance_combinations
	        };
	    };
	    
	    	//==================================================================//
	    	//================ 색상/버블/점/열지도 변경 START ==================//
	    	//==================================================================//
	    	this.changeDataMode = function(type) {
	    		if (map.dataGeojson == null && map.multiLayerControl != undefined && map.multiLayerControl.dataGeojson == null) {
	    			messageAlert.open("알림", "통계정보를 조회해주세요.");
	    			return;
	    		}
	    		this.dataGeojson = map.dataGeojson;
    			
	    		var mode = {
	    				"color"  : 0,	//색상지도
	    				"bubble" : 1,	//버블지도
	    				"dot"	 : 2,	//점지도
	    				"heat"	 : 3	//열지도
	    		};
	    		switch(mode[type]) {
	    			case 0:
	    				this.setColorMap();
	    				break;
	    			case 1:
	    				this.setBubbleMap();
	    				break;
	    			case 2:
	    				this.setDotMap();
	    				break;
	    			case 3:
	    				this.setHeatMap();
	    				break;
	    			default:
	    				this.setColorMap();
	    				break;
	    		}
	    	};
	    	
	    	/**
			 * 
			 * @name         : setColorMap
			 * @description  : 색상지도로 변경한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.setColorMap = function() {
	    		this.removeDataOverlay();
	    		if (this.map.multiLayerControl != undefined && 
	    			this.map.multiLayerControl.dataGeojson != null && 
	    			this.map.multiLayerControl.dataGeojson.length > 0) {
		    		for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
		    			var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
		    			dataGeojson.addTo(that.map.gMap);
		    		}
		    	}else {
		    		that.map.dataGeojson.addTo(that.map.gMap);;
		    	}   
		    	that.map.checkShowCaption();
	    	};
	    		
	    	/**
			 * 
			 * @name         : setBubbleMap
			 * @description  : 버블지도로 변경한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.setBubbleMap = function() {
	    		this.removeDataOverlay();
	    		if (this.circleMarkerGroup  == null) {
		    		this.circleMarkerGroup = [];
		    	}
	    		if (this.map.multiLayerControl != undefined && 
	    			this.map.multiLayerControl.dataGeojson != null && 
	    			this.map.multiLayerControl.dataGeojson.length > 0) {
	    			for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    				var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
	    				this.drawBubbleMap(dataGeojson);
	    			}
	    		}else {
	    			var dataGeojson = that.map.dataGeojson;
	    			this.drawBubbleMap(dataGeojson);
	    		}   
	    	};
	    	
	    	/**
			 * 
			 * @name         : drawBubbleMap
			 * @description  : 버블지도를 생성한다.
			 * @date         : 2015. 11. 17. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.drawBubbleMap = function(geojson) {	    			
	    		var searchYear = "";
	    		var delegate = this.map.delegate.ui;
	    		if (delegate != undefined && 
	    			delegate.curDropParams != undefined && 
	    			delegate.curDropParams[this.map.id] != undefined) {
					for(var i = 0; i < delegate.curDropParams[this.map.id].param.length; i ++) {
						if (delegate.curDropParams[this.map.id].param[i].key == "year") {
							searchYear = delegate.curDropParams[this.map.id].param[i].value + "년 ";
						}
					}	
				}
	    			
		    	geojson.eachLayer(function(layer) {
		    		var info = null;
		    		var data = null;
		    		var unit = null;
		    		var color = layer.options.fillColor;
		    		var idx = 0;
		    		var x = layer.feature.properties.x;
		    		var y = layer.feature.properties.y;
		    		var adm_nm = layer.feature.properties.adm_nm;
		    		if (layer.feature.info.length > 0) {
		    			if (layer.feature.isKosis) {
		    				info = layer.feature.info;
			    			data = info[0];
				    		unit = info[1];
				    		
				    		var toolTip  = "<table style='margin:10px;'>";
			    			toolTip += 		"<tr>";
			    			toolTip += 			"<td style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</td>";
			    			toolTip +=		"</tr>";
			    			toolTip +=		"<tr style='height:5px;'></tr>";
			    			toolTip += 		"<tr style='font-size:12px;padding-left:5px;'>";
			    			toolTip += 			"<td>"+appendCommaToNumber(data)+" ("+unit+")</td>";
			    			toolTip +=		"</tr>";
			    			toolTip += "</table>";
		    			} 
		    			else if (layer.feature.isThematicMap) {
		    				info = layer.feature.info[0];
			    			data = info[info.showData];
				    		unit = info.unit;
				    		var title;
				    		if (info.left_sep_ttip_title != undefined) {
				    			title = info.left_sep_ttip_title;
				    		}else {
				    			title = info.right_sep_ttip_title;
				    		}
				    		
				    		var toolTip  = "<table style='margin:10px;'>";
			    			toolTip += 		"<tr>";
			    			toolTip += 			"<td style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</td>";
			    			toolTip +=		"</tr>";
			    			toolTip +=		"<tr style='height:5px;'></tr>";
			    			toolTip += 		"<tr style='font-size:12px;padding-left:5px;'>";
			    			toolTip += 			"<td>"+title+" : "+appendCommaToNumber(data)+" ("+unit+")</td>";
			    			toolTip +=		"</tr>";
			    			toolTip += "</table>";
		    			}
		    			else {
		    				info = layer.feature.info[0];
			    			data = info[info.showData];
				    		unit = info.unit;
				    		
				    		var toolTip  = "<table style='margin:10px;'>";
			    			toolTip += 		"<tr>";
			    			toolTip += 			"<td style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</td>";
			    			toolTip +=		"</tr>";
			    			toolTip +=		"<tr style='height:5px;'></tr>";
			    			toolTip += 		"<tr style='font-size:12px;padding-left:5px;'>";
			    			toolTip += 			"<td>"+searchYear+" "+that.getDataName(info.showData)+" : "+appendCommaToNumber(data)+" ("+unit+")</td>";
			    			toolTip +=		"</tr>";
			    			toolTip += "</table>";
		    			}
			    			
			    		for (var i=0; i<that.legendColor.length; i++) {
			    			if (color == that.legendColor[i]) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    			
			    		var marker = map.addCircleMarker(x, y, {
			    			radius : that.legendCircleRadius[idx],
			    			fillColor : color,
			    			weight : 2,
			    			tooltipMsg : toolTip 
			    		});
			    		that.circleMarkerGroup.push(marker);
		    		}
		    	});	 
	    	};
	    	
	    	/**
			 * 
			 * @name         : setDotMap
			 * @description  : 점지도로 변경한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.setDotMap = function() {
	    		this.removeDataOverlay();
	    		if (this.circleMarkerGroup  == null) {
		    		this.circleMarkerGroup = [];
		    	}
	    		
	    		if (this.map.multiLayerControl != undefined &&
	    			this.map.multiLayerControl.dataGeojson != null && 
	    			this.map.multiLayerControl.dataGeojson.length > 0) {
	    			for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    				var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
	    				this.drawDotMap(dataGeojson);
	    			}
	    		}else {
	    			var dataGeojson = that.map.dataGeojson;
	    			this.drawDotMap(dataGeojson);
	    		}       
	    	};
	    	
	    	/**
			 * 
			 * @name         : drawDotMap
			 * @description  : 점지도를 생성한다.
			 * @date         : 2015. 11. 17. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.drawDotMap = function(geojson) {
	    		var searchYear = "";
	    		var delegate = this.map.delegate.ui;
	    		if (delegate != undefined && 
	    			delegate.curDropParams != undefined && 
	    			delegate.curDropParams[this.map.id] != undefined) {
					for(var i = 0; i < delegate.curDropParams[this.map.id].param.length; i ++) {
						if (delegate.curDropParams[this.map.id].param[i].key == "year") {
							searchYear = delegate.curDropParams[this.map.id].param[i].value + "년 ";
						}
					}	
				}
	    			
	    		geojson.eachLayer(function(layer) {
		    		var info = null;
		    		var data = null;
		    		var unit = null;
		    		var color = layer.options.fillColor;
		    		var idx = 0;
		    		var x = layer.feature.properties.x;
		    		var y = layer.feature.properties.y;
		    		var adm_nm = layer.feature.properties.adm_nm;
		    		if (layer.feature.info.length > 0) {
		    			if (layer.feature.isKosis) {
		    				info = layer.feature.info;
			    			data = info[0];
				    		unit = info[1];
				    		
				    		var toolTip  = "<table style='margin:10px;'>";
			    			toolTip += 		"<tr>";
			    			toolTip += 			"<td style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</td>";
			    			toolTip +=		"</tr>";
			    			toolTip +=		"<tr style='height:5px;'></tr>";
			    			toolTip += 		"<tr style='font-size:12px;padding-left:5px;'>";
			    			toolTip += 			"<td>"+appendCommaToNumber(data)+" ("+unit+")</td>";
			    			toolTip +=		"</tr>";
			    			toolTip += "</table>";
		    			}else {
		    				info = layer.feature.info[0];
			    			data = info[info.showData];
				    		unit = info.unit;
				    			
				    		var toolTip  = "<table style='margin:10px;'>";
			    			toolTip += 		"<tr>";
			    			toolTip += 			"<td style='font-size:14px;font-weight:bold;color:#3792de;'>"+ adm_nm +"</td>";
			    			toolTip +=		"</tr>";
			    			toolTip +=		"<tr style='height:5px;'></tr>";
			    			toolTip += 		"<tr style='font-size:12px;padding-left:5px;'>";
			    			toolTip += 			"<td>"+searchYear+" "+that.getDataName(info.showData)+" : "+appendCommaToNumber(data)+" ("+unit+")</td>";
			    			toolTip +=		"</tr>";
			    			toolTip += "</table>";
		    			}
		    				
			    		var marker = map.addCircleMarker(x, y, {
			    			radius : that.legendDotRadius,
			    			color : that.legendColor1,
			    			fillColor : that.legendColor1,
			    			tooltipMsg : toolTip 
			    		});
			    		that.circleMarkerGroup.push(marker);
		    		}
		    	});	
	    	};
	    	
	    	/**
			 * 
			 * @name         : setHeatMap
			 * @description  : 열지도로 변경한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.setHeatMap = function() {
	    		this.removeDataOverlay();
	    		if (this.map.multiLayerControl != undefined &&
	    			this.map.multiLayerControl.dataGeojson != null && 
	    			this.map.multiLayerControl.dataGeojson.length > 0) {
	    			for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    				var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
	    				this.drawHeatMap(dataGeojson);
	    			}
	    		}else {
	    			var dataGeojson = that.map.dataGeojson;
	    			this.drawHeatMap(dataGeojson);
	    		}       
	    	};
	    	
	    	/**
			 * 
			 * @name         : drawHeatMap
			 * @description  : 열지도를 생성한다.
			 * @date         : 2015. 10. 05. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.drawHeatMap = function(geojson) {
		    	geojson.eachLayer(function(layer) {
		    		var info = null;
		    		var data = null;
		    		var unit = null;
		    		var x = layer.feature.properties.x;
		    		var y = layer.feature.properties.y;
		    		if (layer.feature.info.length > 0) {
		    			if (layer.feature.isKosis) {
		    				info = layer.feature.info;
			    			data = info[0];
				    		unit = info[1];
		    			}else {
		    				info = layer.feature.info[0];
			    			data = info[info.showData];
				    		unit = info.unit;
		    			}
		    			
		    		}
		    		that.map.addHeatMap(x, y, data);
		    	});
	    	};
	    	
	    	
	    	/**
			 * 
			 * @name         : getDataName
			 * @description  : 표출데이터명을 가져온다.
			 * @date         : 2015. 11. 13. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.getDataName = function(showData) {
	    		var showName = {
						"tot_ppltn" : "총인구",
						"tot_ppltn_male" : "총인구(남자)",
						"tot_ppltn_fem" : "총인구(여자)",
						"avg_age" : "평균나이",
						"avg_age_male" : "평균나이(남자)",
						"avg_age_fem" : "평균나이(여자)",
						"ppltn_dnsty" : "인구밀도",
						"aged_child_idx" : "노령화지수",
						"oldage_suprt_per" : "노년부양비",
						"juv_suprt_per" : "유년부양비",
						"tot_suprt_per" : "총부양비",
						"population" : "인구",
						"tot_worker" : "종사자수",
						"corp_cnt" : "사업체수",
						"household_cnt" : "가구수",
						"house_cnt" : "주택수",
						"farm_cnt" : "농가수",
						"forestry_cnt" : "임가수",
						"fishery_cnt" : "어가수"
				};
	    		return showName[showData];
	    	};
	    	
	    	
	    	/**
			 * 
			 * @name         : removeDataOverlay
			 * @description  : 오버레이를 초기화한다.
			 * @date         : 2015. 10. 09. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.removeDataOverlay = function() {
	    		if (this.circleMarkerGroup != null) {
	    			for (var i=0; i<this.circleMarkerGroup.length; i++) {
		    			var marker = this.circleMarkerGroup[i];
		    			marker.remove();
		    		}
	    			this.circleMarkerGroup = null;
	    		}
	    		if (this.map.dataGeojson) {
	    			this.map.removeCaption();
	    			this.map.dataGeojson.remove();
	    		}
	    		
	    		if (this.map.multiLayerControl != undefined && this.map.multiLayerControl.dataGeojson) {
	    			this.map.removeCaption();
	    			for (var i=0; i<this.map.multiLayerControl.dataGeojson.length; i++) {
	    				var dataGeojson = this.map.multiLayerControl.dataGeojson[i];
		    			dataGeojson.remove();
	    			}
	    		}
	    		
	    		if (this.map.heatMap) {
	    			this.map.heatMap.setUTMKs([]);
	    		}
	    	};
	    	
	    	/**
			 * 
			 * @name         : changeDotColor
			 * @description  : 점지도의 색상을 변경한다.
			 * @date         : 2015. 10. 09. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.changeDotColor = function(color) {
	    		if (this.circleMarkerGroup != null) {
	    			for (var i=0; i<this.circleMarkerGroup.length; i++) {
		    			var marker = this.circleMarkerGroup[i];
		    			marker.setStyle({
		    				color : color,
		    				fillColor : color,
		    			});
		    		}
	    		}
	    	};
	    	
	    	/**
			 * 
			 * @name         : changeDotRadius
			 * @description  : 점지도의 크기를 변경한다.
			 * @date         : 2015. 10. 09. 
			 * @author	     : 권차욱
			 * @history 	 :
			 */
	    	this.changeDotRadius = function(value) {
	    		this.legendDotRadius = value;
	    		if (this.circleMarkerGroup != null) {
	    			for (var i=0; i<this.circleMarkerGroup.length; i++) {
		    			var marker = this.circleMarkerGroup[i];
		    			marker.setRadius(value);
		    		}
	    		}
	    	};
	    	
	    	this.setLegendParams = function(type, color, level) {
	    		this.legendColor = color;
				this.lv = level;
				this.selectType = type;
				legendColor(
						this.legendColor[0],
						this.legendColor[this.lv-1],  
						"#colorStatus_"+this.id, 
						this.lv, 
						this.id, 
						this
				);
				var mode = {
	    				"color" : 0,	//색상지도
	    				"bubble"  : 1,	//버블지도
	    				"dot"	: 2,	//점지도
	    				"heat"	: 3		//열지도
	    		};
	    		switch(mode[type]) {
	    			case 0:
	    				$("#typeArea_"+this.id).removeClass().addClass("color");
	    				break;
	    			case 1:
	    				$("#typeArea_"+this.id).removeClass().addClass("ring");
	    				break;
	    			case 2:
	    				$("#typeArea_"+this.id).removeClass().addClass("jum");
	    				break;
	    			case 3:
	    				$("#typeArea_"+this.id).removeClass().addClass("heat");
	    				break;
	    			default:
	    				$("#typeArea_"+this.id).removeClass().addClass("color");
	    				break;
	    		}
	    		var min = $(".legendBox").hasClass("min");
	    		if (min) {
	    			$(".legendBox").removeClass("min");
	    			 $(".legendBox").addClass("max");
	    		}
	    	};
	    	
	    	//==================================================================//
	    	//================= 색상/버블/점/열지도 변경 END ===================//
	    	//==================================================================//
	    
			
	    	//맵상에서 숫자값을 보여주는 함수
	    	this.showNumberData =function(){
	    		if(that.numberData){
	    			that.numberData = false;
	    			$("#showData_"+that.id).removeClass("on")
	    			$("#showData_"+that.id + ">span").text("통계치 off")
	    		}else{
	    			that.numberData = true;
	    			$("#showData_"+that.id).addClass("on")
	    			$("#showData_"+that.id + ">span").text("통계치 on")
	    		}
	    		
	    		that.map.checkShowCaption();
	    	}
	    
			this.calculateLegend = function(arData) {
				if (arData == null) {
					return;
				}
				this.data = arData;
				this.legendValue.equal = [];
				this.legendValue.auto = [];
					
				//데이터 중복제거
				for (var i=0; i<arData.length; i++) {
					var tmpData = [];
					$.each(arData[i], function(k, el){
						if($.inArray(el, tmpData) === -1) tmpData.push(el);
					});
					arData[i] = tmpData;
				}
				
				
				this.calNegativeLegend(arData);
				this.calEqualLegend(arData);	//균등범례
				this.calAutoLegend(arData);		//자동범례
				this.calUserLegend();										//사용자지정범례
				
				if(this.legendType =="auto"){
					that.valPerSlice = this.legendValue.auto;
					that.setGoganText(this.legendValue.auto[0]);
					return this.legendValue.auto;
				}else if(this.legendType =="equal"){
					that.valPerSlice = this.legendValue.equal;
					that.setGoganText(this.legendValue.equal[0]);
					return this.legendValue.equal;
				}else if (this.legendType == "negative") {
					if (!this.isNagative) {
						return this.legendValue.auto;
					}
					that.valPerSlice = this.legendValue.negative;
					that.setGoganText(this.legendValue.negative[0]);
					return this.legendValue.negative;
				}
				else{
					that.valPerSlice = this.legendValue.user;
					that.setGoganText(this.legendValue.user[0]);
					return this.legendValue.user;
				}

			};
			
			this.calNegativeLegend = function(arData) {
				var negativeData = null;
				var positiveData = null;
				this.isNegative = false;
				for (var i=0; i<arData.length; i++) {
					for (var k=0; k<arData[i].length; k++) {
						if (parseFloat(arData[i][k]) <= 0) {
							this.isNegative = true;
							if (negativeData == null) {negativeData = [];}
							negativeData.push(arData[i][k]);
						}else {
							if (positiveData == null) {positiveData = [];}
							positiveData.push(arData[i][k]);
						}
					}
				}
				
				if (!this.isNegative) {
					return;
				}
				
				//데이터 중복제거
				var tmpNegativeData = [], tmpPositiveData = [], tmpValPerSlice = [];
				$.each(negativeData, function(i, el){
					if($.inArray(el, tmpNegativeData) === -1) tmpNegativeData.push(el);
				});
				$.each(positiveData, function(i, el){
					if($.inArray(el, tmpPositiveData) === -1) tmpPositiveData.push(el);
				});
				negativeData = tmpNegativeData;
				positiveData = tmpPositiveData;
				
				var lv = that.lv/2;
				tmpValPerSlice.push(that.jenks(negativeData,Math.round(lv-1)));
				tmpValPerSlice[0].pop();
				tmpValPerSlice[0].push(0);
				var tmpResult = that.jenks(positiveData,Math.round(lv-1));
				for (var i=0;i <tmpResult.length; i++) {
					tmpValPerSlice[0].push(tmpResult[i]);
				}
				
				var colorList = getCalculColor("#2E64FE", "#CED8F6", lv);
				var colorList2 = getCalculColor("#F6CECE", "#FE2E2E", lv);
				for (var i=0; i<colorList2.length; i++) {
					colorList.push(colorList2[i]);
				}
				this.negativeLegendColor = colorList;
				this.legendValue.negative = tmpValPerSlice;
			};
			
			this.calEqualLegend = function(arData, negativeData, positiveData) {
				var equalMin, equalMax; 
				var tmpValPerSlice = [];
				for ( var k = 0; k < arData.length; k++) {
					var min = Math.min.apply(null, arData[k]);
					var max = Math.max.apply(null, arData[k]);
					equalMin = min;
					equalMax = max;
						
					var result = Math.round((max - min) / that.lv);//870-303 = 567  567 /10  56.7 => 57
					if (result == 0 && min != max) {
						result = 1;
					}
						
					var tmpResult = new Array();
					for ( var y = 1; y <= that.lv; y++) {
						if (result == 1) {
								tmpResult.push(result);
						}else {
							tmpResult.push(min+result * y); //그래서 303 + 57* 
						}
					}
					if (tmpResult.length < that.lv) {
						for ( var x = 0; x < that.lv - tmpResult.length; x++) {
							tmpResult.push("");
						}
					}
					tmpValPerSlice[k] = tmpResult;
				}
				this.legendValue.equal = tmpValPerSlice;
			};
			
			this.calAutoLegend = function(arData, negativeData, positiveData) {
				var tmpValPerSlice = [];
				if (arData[0].length < 2) {
					this.legendValue.auto = this.legendValue.equal;
				}else {
					for(var i = 0; i < arData.length; i++){
						var tmpResult = that.jenks(arData[0],that.lv-1);
						tmpValPerSlice.push(tmpResult);
					}
					this.legendValue.auto = tmpValPerSlice;
				}
			}
			
			this.calUserLegend = function() {
				var tmpValPerSlice;
				
				//사용자범례가 지정되어 있지 않을 경우,
				//자동범례로 초기화한다.
				if (this.legendType != "user") {
					tmpValPerSlice = this.legendValue.auto;
					this.legendValue.user = tmpValPerSlice;
				}
				
/*				if(this.legendType == "user"){
					//사용자 정의
					var divStat = Math.round(100/that.lv);
					var divMin = tmpValPerSlice[0][0];
					var divMax = tmpValPerSlice[0][tmpValPerSlice[0].length-1];
					var divStack = divMax - divMin;
					
					for(var i = 0;i<tmpValPerSlice.length;i++){
						var perStack = 0;
						for(var j=0;j<tmpValPerSlice[i].length;j++){
							var temp;
							perStack = perStack + that.guganLevelSetting[j];
							temp = Math.round((divMax/100) * perStack);
							tmpValPerSlice[i][j] = temp;
						}
					}
				}*/
				
			};
			
			
			this.setGoganText = function(valPerSlice){
				//goganText 세팅
				if(this.delegate != undefined && this.delegate.namespace==="houseAnalysisMap"){
					valPerSlice = this.houseValPerSlice;
				}
				var maxSlice = valPerSlice[valPerSlice.length-1];
				var minSlice = 0;
				var slice1 =Math.round(maxSlice * 0.25);
				var slice2 =Math.round(maxSlice * 0.5);
				var slice3 =Math.round(maxSlice * 0.75);
				
				var tempText= "<li>"+ minSlice+"</li><li>"+slice1+"</li><li>"+slice2+"</li><li>"+slice3+"</li><li>"+maxSlice+"</li>";
				
				//$("#goganText_"+that.id).html(tempText);
				
				if(this.delegate != undefined && this.delegate.namespace==="houseAnalysisMap"){
					$("#colorStatus_"+that.id+">li:eq(0)>span").text("상");
					$("#colorStatus_"+that.id+">li:eq(1)>span").text("중");
					$("#colorStatus_"+that.id+">li:eq(2)>span").text("하");
				}else{
					for(var i = 0;i <valPerSlice.length; i++){
						var idx = (valPerSlice.length-1) -i;
						$("#colorStatus_"+that.id+">li:eq("+idx+")>span").text(valPerSlice[i]);
					}
				}
		
			}
			
			
			this.getColor = function (value, valPerSlice) {
				if(this.delegate != undefined && this.delegate.namespace === "houseAnalysisMap"){
					for (var i=0; i<this.houseValPerSlice.length; i++) {
						if (value == this.houseValPerSlice[i]) {
							return [ that.legendColor[i], i+1 ];
						}
					}
					return [ that.legendColor[3], 4 ];
				}else{
					
					//음수/양수 분할 => 수정될 수 있음
					if (this.legendType == "negative" && this.negativeLegendColor != null) {
						this.legendColor = this.negativeLegendColor;
						setLegendColor(this.legendColor,"#colorStatus_"+this.id, this.id,that);
					}
					if (valPerSlice.length < this.lv && that.legendType == "auto") {
						for (var i=0; i<valPerSlice.length; i++) {
							if (value == valPerSlice[i]) {
								return [ that.legendColor[i], i+1 ];
							}
						}
					}else {
						var returnLevel=0;
						for(var i = 0; i<valPerSlice.length;i++){
							if(value < valPerSlice[i]){
								return [$.trim(that.legendColor[i]),i+1];
							}
						}
						return [$.trim(that.legendColor[valPerSlice.length-1]),valPerSlice.length];
						
					}
				}

			}
			
			this.getColorForLevel = function (level) {
				var color;
				switch (level) {
				
				case 1:
					color = that.legendColor[0];
					break;
				
				case 2:
					color = that.legendColor[1];
					break;
				
				case 3:
					color = that.legendColor[2];
					break;
				
				case 4:
					color = that.legendColor[3];
					break;
				
				case 5:
					color = that.legendColor[4];
					break;
					
				case 6:
					color = that.legendColor[5];
					break;
					
				case 7:
					color = that.legendColor[6];
					break;
					
				case 8:
					color = that.legendColor[7];
					break;
					
				case 9:
					color = that.legendColor[8];
					break;
					
				case 10:
					color = that.legendColor[9];
					break;
					
				
				default:
					color = '#FFEDA0';
					break;
				
				}
				
				return color;
				
			};		

			// 초기화
			this.initialize = function(delegate) {
				// 현재 범례를 변수에 저장				
				var tmpColors = ["#953266","#9B4371","#A1547C","#A76588","#AD7693","#B3879E","#B998AA","#BFA9B5","#C5BAC0","#CCCCCC"];
				
				
				this.lv = this.initLv;
				this.map.setLegendColor(tmpColors);
				this.delegate = delegate;

				var currentdate = new Date();
				this.id = makeStamp(currentdate);

			};
			
			//function 서술
		
			//기본 버튼들의 기능에 대한 정의
			this.userColorSetting = function(){
				$("body").on("click",".tabs .btnStyle01",function(){
					$(this).parents(".tabs").eq(0).find(".btnStyle01").removeClass("on");
					$(this).addClass("on");
				});
				//legend 객체에 대한 값 변경을 위해서 그냥 객체를 같이 던져도 괜찮을듯
				$("body").on("click","#tabsSelector_"+that.id+" >a",function(){
					$("#colorSetting_"+that.id).hide();
					$("#colorSettingList01_"+that.id).css({"width":"380px"});
					$("#colorbarBox_"+that.id+">a").css("top","-5000px");
					var inx = $(this).index("#tabsSelector_"+that.id+" >a");
					if(inx==0){
						$("#colorSetting_"+that.id).show();						
						var colorckList = $("#colorSetting_"+ that.id +" > li> a");
						var arrColor = new Array();
						var color;
						
						for(var i = 0 ; i<colorckList.length;i++){
							if(colorckList[i].classList.length>0){
								for(var y=0;y<colorckList[i].classList.length;y++){
									if(colorckList[i].classList[y] =="on"){
										color = colorckList[i].style.background;
									}
								}
							}
						}

						legendColor("#ccc",color, "#colorSettingList01_"+that.id, $("#lvSelect_"+that.id).val(),that.id,that);
						
					}else if(inx==1){
						legendColor("#ff1b00", "#048cfc", "#colorSettingList01_"+that.id, 10,that.id,that);
					}else{
						$("#colorbarBox_"+that.id+">a").css("top","5px");
						$("#colorSettingList01_"+that.id).css({"width":"300px"});
						legendColor("#193b70", "#00b051", "#colorSettingList01_"+that.id, 10,that.id,that);
					}
				});
				
				$('.colorbarBox>a').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
				
				$('body').on('click', "#legendPopEvent01_"+that.id, function(){
					var ck = $("#typeArea_"+that.id).attr("class");
					if(ck == "dot"){
						$("#jumSettingLayer_"+that.id).show(); 
					}
					
					//단계설정 hide/show
					var on = $("#guganSettingLayer_"+that.id).is(":visible");
					if (!on) {
						$("#guganSettingLayer_"+that.id).show();
					}else {
						$("#guganSettingLayer_"+that.id).hide();
					}
					
					//색상설정 hide/show
					on = $("#legendPopEvent02_"+that.id).hasClass("on");
					if (on) {
						$("#legendPopEvent02_"+that.id).click();
					}
					
					//타입설정 hide/show
					$("#lgTypeList_"+that.id).hide();
					on = $("#legendPopEvent00_"+that.id).hasClass("on");
					if (on) {
						 $("#legendPopEvent00_"+that.id).removeClass("on");
					}
				});
				
				$('body').on('click', "#legendPopEvent02_"+that.id, function(){
					lvLegendSetting(that.id,that);
					var ck = $("#typeArea_"+that.id).attr("class");
					if(ck == "dot"){
						$("#jumSettingLayer_"+that.id).show(); 
					}else{
						var dataid = $(this).attr("data-id");
						//$("#"+dataid+"_"+that.id).show(); 
						if(dataid=="guganSettingLayer"){ 
							that.goganListResize();
						}
					}
					
					//색상설정 hide/show
					var on = $("#colorSettingLayer_"+that.id).is(":visible");
					if (!on) {
						$("#colorSettingLayer_"+that.id).show();
					}else {
						$("#colorSettingLayer_"+that.id).hide();
					}
					
					//단계설정 hide/show
					on = $("#legendPopEvent01_"+that.id).hasClass("on");
					if (on) {
						$("#legendPopEvent01_"+that.id).click();
					}
					
					//타입설정 hide/show
					$("#lgTypeList_"+that.id).hide();
					on = $("#legendPopEvent00_"+that.id).hasClass("on");
					if (on) {
						 $("#legendPopEvent00_"+that.id).removeClass("on");
					}
					
				});
				
				$('body').on('click', '#legendPopEvent00_'+that.id, function() {
					//단계설정 hide/show
					var on = $("#guganSettingLayer_"+that.id).is(":visible");
					if (on) {
						$("#guganSettingLayer_"+that.id).hide();
						$("#legendPopEvent01_"+that.id).removeClass("on");
					}
					
					//색상설정 hide/show
					on = $("#colorSettingLayer_"+that.id).is(":visible");
					if (on) {
						$("#colorSettingLayer_"+that.id).hide();
						$("#legendPopEvent02_"+that.id).removeClass("on");
					}
				});
							
				$('body').on('click', "#opacityBox_"+that.id+" .colorck li a", function(){ 
					$(".jumColorLink").css("background",$(this).text());
				});
				
				$('.jumColorLink').wheelColorPicker({ sliders: "whsvp", preview: true, format: "css" });
				$('body').on('change sliderup sliderdown slidermove', ".jumColorLink", function(){
					$("#opacityBox_"+that.id+" .colorck li a.on").css("background",$(this).val()).text($(this).val()); 
				});
				
				$('body').on('change', "#opacitySel_"+that.id, function(){
					var val = $(this).val(); 
					$("#colorSetting01_"+that.id).css("opacity", val);  
				});
				$('body').on('change', "#opacitySel_"+that.id, function(){
					var val = $(this).val(); 
					$("#colorbarBox_"+that.id).css("opacity", val);  
				});
				
				
				$('body').on('change sliderup sliderdown slidermove', "#colorbarBox_"+that.id+">.fl", function(){
					var colorEnd = $("#colorbarBox_"+that.id+">.fr").text();
					$("#colorbarBox_"+that.id+">.fl").text($(this).val());
					legendColor(colorEnd, $(this).val(), "#colorSettingList01_"+that.id, 10,that.id,that);
				});
				$('body').on('change sliderup sliderdown slidermove', "#colorbarBox_"+that.id+">.fr", function(){
					var colorStart = $("#colorbarBox_"+that.id+">.fl").text();
					$("#colorbarBox_"+that.id+">.fr").text($(this).val());
					legendColor($(this).val(), colorStart, "#colorSettingList01_"+that.id, 10,that.id,that);
				});
			}
			
			
			
			this.legendEvent=function(){
				var body = $("body"); 
				body.on("click","#lgTypeList_"+that.id+">li>a", function(){
					var cls = $(this).attr("data-type");
					if(cls =="data"){
						that.showNumberData();
					}else{
						var type = cls;
						if (cls == "bubble") {
							type = "ring";
						}else if (cls == "dot") {
							type = "jum";
						}
						$("#typeArea_"+that.id).removeClass().addClass(type);
						that.selectType = cls;
						that.changeDataMode(cls);  
					}
				});
				
				body.on("click","#btn_legendSetting_"+that.id, function(){
					var on = $(this).hasClass("on");
					if(!on){
						$("#lgListBox_"+that.id).stop().animate({"left":"220px"},200);
						$(this).addClass("on");
					}else{
						$("#lgListBox_"+that.id).stop().animate({"left":"-550px"},200);
						$(this).removeClass("on");
					}
				});
				
				
				var optionList = ".lgListBox>li>ul>li>a";
				body.on("click", optionList, function(){
					var html = $(this).html();
					if($(this).attr("data-type") !="data"){
						$(this).parents("ul").eq(0).siblings("a").empty().html(html).removeClass("on");	
					}else{
						$(this).parents("ul").eq(0).siblings("a").removeClass("on");
					}
					$(this).parents("ul").eq(0).hide();
					
					
				});
				
				
				
				body.on("click", "#btn_legend_"+that.id, function(){ 
					var legendBox = $("#legendBox_"+that.id);
					var ing = legendBox.attr("data-ing");
					legendBox.removeClass(ing); 
					$("#btn_legendSetting_"+that.id).removeClass("on");
					$("#lgListBox_"+that.id).stop().animate({"left":"-550px"},200);
					if(ing=="hide"){  
						legendBox.attr("data-ing", "min");
						legendBox.addClass("min");
						
						if(that.selectType == "bubble"){
							//$("#legendBox_"+that.id).css("width","130px");
						}else{
							//$("#legendBox_"+that.id).css("width","90px");
						}
						
					}else if(ing=="min"){ 
						legendBox.attr("data-ing", "max");
						legendBox.addClass("max");
					}else if(ing=="max"){
						legendBox.attr("data-ing", "hide");
						legendBox.addClass("hide");
					}
					
				});
				
				
				
			}
			
			this.colorck=function(){
				$(".colorck li").each(function(i){ 
					var selector = $(this).children("a");
					selector.css("background",selector.text());
				});
				$("body").on("click",".colorck li>a",function(){
					$(this).parents(".colorck").eq(0).find("a").removeClass("on");
					$(this).addClass("on");
					var dataid = $(this).parents(".colorck").eq(0).attr("id");
					var color = $(this).text();
					var listLegnth = $("#lvSelect_"+that.id).val(); 
					
					that.legendColor1 = color;
					that.legendColor2 = "#ccc";
					if(dataid=="colorSetting_"+that.id){
						legendColor("#ccc", color, "#colorSettingList01_"+that.id, listLegnth,that.id,that);
					}else if(dataid=="legendColor_"+that.id){
						legendColor("#ccc", color, "#colorStatus_"+that.id, listLegnth,that.id,that);
						resizeColor("#ccc", color, "#goganList_"+that.id+" tr", listLegnth,that.id);
						if (that.selectType == "dot") {
							that.changeDotColor(color);
						}
						//맵의 색상 변경 시키기
						that.isNegative = false;
						that.map.setLegendColor();
					} 
					$("#popContents01_"+that.id+" .JCLRgrips").remove();
					that.goganListResize();
					
				}); 
			}
			
			
			this.linkTooltip=function(){
				$("a").tooltip({ 
					open: function( event, ui ) {
						$(".ui-tooltip .subj").text($(this).attr("data-subj"));
					},
					position: {
				        my: "center bottom-40", at: "center top", 
				        using: function( position, feedback ) {
				          $( this ).css( position ).prepend("<span class='subj'></span>");
				          $( "<div>" )
				            .addClass( "arrow" )
				            .addClass( feedback.vertical )
				            .addClass( feedback.horizontal )
				            .appendTo( this );
				        }
				    } 
				});
			}
			
			
			this.jumSlider=function(){
				$(".jumSlide").slider({
			    	range: false, 
					min : 5,
					max : 9,
					values : [9],
			        slide : function(e, ui) { //ui.values[0]
			        	$("#typeArea_"+that.id+" .colorck>li>a").css({"width":parseInt(ui.values[0]+7)+"px",
			        		"height":parseInt(ui.values[0]+7)+"px",
			        		"margin-top":parseInt(10-ui.values[0])+"px"}); 
			        	that.changeDotRadius(ui.value);
			        }
				});
			}
			
			
			this.heatTable=function(){
				$('.heatTable').wheelColorPicker({
					layout: 'block',
					format: 'css'
				}); 
				$('.heatTable').on('slidermove', function() {
					$('#color-label_'+that.id).text($(this).val());
				}); 
			}
			
			this.goganListResize = function(){ // 범례구간설정 구간리사이즈 플러그인 호출
				//버그가 정말 너무많다.
				//사용자지정 범례일 경우, 해당 범례의 값만큼 바 위치를 조정한다.
				if (this.legendValue.user != null && this.legendType == "user") {
					this.valPerSlice = this.legendValue.user;
					$("#goganList_"+that.id).find("td").addClass("on");
					var tableWidth = $("#goganList_"+that.id).width();
					var min = Math.min.apply(null, this.valPerSlice[0]);
					var max = Math.max.apply(null, this.valPerSlice[0]) + 100;
					var gap = tableWidth/that.lv;
					this.perPixel = tableWidth / max;
					
					//각 구간별 width를 계산한다.
					if (this.userTableWidthList == null) {
						var tmpWidthList = [];
						for (var i=0; i<this.lv;  i++) {
							var width = this.valPerSlice[0][i] * this.perPixel;
							if (i!=0) {
								var tmpWidth = 0;
								for (var k=0; k<i; k++) {
									tmpWidth += tmpWidthList[k];
								}
								width = Math.abs(width - tmpWidth);
							}
							tmpWidthList.push(parseInt(width));
						}
						this.userTableWidthList = tmpWidthList;
					}
					
					//계산된 width를 적용한다.
					var widthSum = 0;
					for (var i=0; i<this.userTableWidthList.length; i++) {
						var width = 0;
						if (i == this.userTableWidthList.length-1) {
							width = tableWidth - widthSum;
						}else {
							widthSum += this.userTableWidthList[i];
							width = this.userTableWidthList[i];
						}
						$("#goganList_"+that.id).find("td").eq(i).css("width", width+"px");
					}
					
				}else {
					var on =$("#goganList_"+that.id).find("td").hasClass("on");
					if (on) {
						$("#goganList_"+that.id).find("td").removeClass("on");
					}
				}
				
				//바의 위치를 색상의 너비와 같게 맞춘다.
				var widthList = [];
				var width = 0;
				$("#goganList_"+that.id).find("td").each(function(idx) {
					width += $(this).width();
					var barPos = width;
					$("#popContents01_"+that.id+" .JCLRgrips").find(".JCLRgrip").eq(idx).css("left",barPos+"px");
				});
				$("#popContents01_"+that.id).find(".JColResizer").css("width", "0px");
				$("#goganList_"+that.id).css("width", "380px");
				$(".JCLRgrips").css("width", "380px");

				//이쪽부분 소스는 파악이 안된다.
				$("#popContents01_"+that.id+" .JCLRgrips").remove();
					$("#goganList_"+that.id).colResizable({
						liveDrag:true, 
						gripInnerHtml:"<div class='grip'></div>", 
						draggingClass:"dragging", 
						partialRefresh:true,
						onResize:that.onSampleResized
					}); 
					
				$("#popContents01_"+that.id).find(".grip").each(function(idx) {
					$(this).append("<div class='legendTooltip' id='legendTooltip_"+idx+"'></div>");
					$(this).find(".legendTooltip").hide();
				});
				
				//사용자지정 범례가 아닐경우, 
				//강제로 width를 정의하고, 컨트롤 할수 없도록 바를 hide한다.
				if (this.legendType != "user") {
					$("#popContents01_"+that.id+" .JCLRgrips").hide();
				}else {
					$("#popContents01_"+that.id+" .JCLRgrips").show();
				}
				
			};
			
			this.onSampleResized = function(e){ // 범례구간설정 구간리사이즈 드래그할때 value 값 호출
				var id = $(e.target).find(".legendTooltip").attr("id");
				if (id != undefined) {
					var idx = parseInt(id.split("_")[1]);
					var width = 0;
					if (idx != 0) {
						for (var i=0; i<=idx; i++) {
							var tmpWidth = $(e.currentTarget).find("td").eq(i).width();
							width += tmpWidth;
						}
					}else {
						width = $(e.currentTarget).find("td").eq(0).width();
					}
					var value = parseInt(width / that.perPixel);
					$(e.target).find(".legendTooltip").show();
					$(e.target).find(".legendTooltip").html(value);
				}
				
				setTimeout(function() {
					var target = $("#popContents01_"+that.id).find(".grip");
					target.find(".legendTooltip").each(function() {
						$(this).hide();
					});
				},2000);
				
			};
			
			
			
			this.lvSelect=function(){ // 범례구간설정 셀렉트 체인지 이벤트
				/*$("body").on("change","#lvSelect_"+that.id,function(){
					var lv = $(this).val();
					resizeColor(that.legendColor2,that.legendColor1, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
					$("#popContents01_"+that.id+" .JCLRgrips").remove();
					that.goganListResize();
				}); */
			}
			
			/**
			 * 통계주제도에서 사용
			 * 범례 초기화 - DB 의 설정 내용으로 변경
			 */
			this.themaLegendInit = function(){
				$("body").on("click", "#themaInit_" + that.id, function(){
					// DB 의 설정 내용으로 범례 타입 변경 필요
					// 사용자 정의일 경우 범례 테이블의 값으로 초기화 (범례 구간도 설정 필요)
					alert("준비중입니다.");
				});
			}
			
			this.goganConfirm=function(){  // 범례구간설정 적용버튼
				$("body").on("click","#goganEvent_"+that.id, function(){
					var lv = $("#lvSelect_"+that.id).val();
					if (lv != that.lv) {
						that.userTableWidthList = null;
					}
					that.lv = lv;
					
					var type = {
							"auto"     : 0,	//자동범례
							"equal"    : 1,	//균등범례
							"user"     : 2,	//사용자지정범례
							"negative" : 3	//음수/양수범례
					};
					
					switch(type[that.legendType]) {
						case 0:
							that.valPerSlice = that.legendValue.auto;
							that.calculateLegend(that.data);
							break;
						case 1:
							that.valPerSlice = that.legendValue.equal;
							that.calculateLegend(that.data);
							break;
						case 2:
							var tmpSlice = [];
							var tmpValPerSlice = [];
							that.userTableWidthList = [];
							$("#goganList_"+that.id).find("td").each(function(idx) {
								var width = $(this).width();
								if (that.userTableWidthList != null) {that.userTableWidthList.push(width);}
								if (idx != 0) {
									for (var i=0; i<idx; i++) {
										var tmpWidth = $("#goganList_"+that.id).find("td").eq(i).width();
										width += tmpWidth;
									}
								}
								var valPerValue = parseInt(width / that.perPixel);
								tmpSlice.push(valPerValue);
							});
							tmpValPerSlice.push(tmpSlice);
							that.legendValue.user = tmpValPerSlice;
							that.valPerSlice = that.legendValue.user;
							break;
						case 3:
							that.valPerSlice = that.legendValue.negative;
							that.calculateLegend(that.data);
							break;
						default:
							break;
					}
					
					legendColor(that.legendColor2,that.legendColor1, "#colorStatus_"+that.id, that.lv, that.id, that);
					that.guganLevelSetting = that.guganLevel;
					that.map.setLegendColor();
					
					$(".guganSettingLayer").hide();
					var on = $("#legendPopEvent01_"+that.id).hasClass("on");
					if (on) {
						$("#legendPopEvent01_"+that.id).removeClass("on");
					}
				});
			}
			this.popClose=function(){
				$("body").on("click",".topbar>a, .hanClose",function(){
					$(this).parents(".popBox").eq(0).hide();
					var id = $(this).parents(".popBox").eq(0).attr("id").split("_")[0];
					if(id=="guganSettingLayer"){
						var on = $("legendPopEvent01_"+that.id).hasClass("on");
						if (on) {
							$("legendPopEvent01_"+that.id).removeClass("on");
						}
						$(".legendPopEvent").eq(0).removeClass("on");
					}else if(id=="colorSettingLayer"){
						var on = $("legendPopEvent02_"+that.id).hasClass("on");
						if (on) {
							$("legendPopEvent02_"+that.id).removeClass("on");
						}
						$(".legendPopEvent").eq(1).removeClass("on");
					}
				});
			}
			
			
			//범례
			this.selectLegendRangeData = function(fillColor) {		
				for(var i = 0;i<=that.lv;i++){
					
//					console.log("fillColor = " + fillColor);
					
					var text = $("#colorStatus_"+that.id+">li:eq("+i+")").css("background-color");
					if(text == fillColor){
						$("#colorStatus_"+that.id+">li:eq("+i+")").addClass("ck");
					}else{
						$("#colorStatus_"+that.id+">li:eq("+i+")").removeClass("ck");
					}

					if(fillColor=="#ccc" && i== that.lv){
						if(that.reverseOn == false){
							$("#colorStatus_"+that.id+">li:eq("+(that.lv-1)+")").addClass("ck");
						}else{
							$("#colorStatus_"+that.id+">li:eq("+0+")").addClass("ck");
						}
						
					}
					
					
				}
				
			};
			
			//초기화 버튼 클릭
			this.legendInit = function(){
				
				that.lv = that.initLv;
				that.numberData = true;
				that.legendType="auto";
				that.valPerSlice=null;
				that.userTableWidthList = null;
				that.legendValue.user = [[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]];
				
				that.legendColor1 = "#953266";
				that.legendColor2 = "#CCCCCC";
				
				
				resizeColor("#CCCCCC","#953266",  "#goganList_"+that.id+" tr", that.lv);
				legendColor("#CCCCCC","#953266", "#colorStatus_"+that.id, that.lv,that.id,that);
				legendColor("#CCCCCC","#953266", "#colorSettingList01_"+that.id, that.lv,that.id,that);
				legendColor("#CCCCCC","#953266", ".dbColorbar", that.lv,that.id,that);
				
			    $("#colorStatus_"+that.id).css('opacity',1);
			    $("#colorbarBox_"+that.id).css('opacity',1);
			    $("#opacitySel_"+that.id+" option:eq(0)").attr("selected","selected")
			    $("#lvSelect_"+that.id+" option:eq(0)").attr("selected","selected");
			    
			    
			    $("#showData_"+that.id).addClass(that.initNumberData?"on":"");
    			$("#showData_"+that.id + ">span").text("통계치 "+that.initNumberData?"on":"off");
			    
    			//타입
			    $("#typeArea_"+that.id).removeClass().addClass("color");
				that.selectType = "color";
				
				
				//구간설정
				$("#popContents01_"+that.id+" .JCLRgrips").remove();
				$("#goganList_"+that.id).addClass("on");
				$("#guganSettingButton_"+that.id + "> .btnStyle01").removeClass("on");
				$("#guganSettingButton_"+that.id + "> .al").addClass("on");
					
				//색상설정
				$("#colorSetting_"+that.id).show();	
				$("#colorSettingList01_"+that.id).css({"width":"380px"});
				$("#colorbarBox_"+that.id+">a").css("top","-5000px");
				$("#tabsSelector_"+that.id + "> .btnStyle01").removeClass("on");
				$("#tabsSelector_"+that.id + "> .al").addClass("on");
				$("#colorSetting_"+that.id +"> li > a").removeClass("on");
				$("#colorSetting_"+that.id +"> li:eq(0) > a").addClass("on");
				
				
				var legendBox = $("#legendBox_"+that.id);
				var ing = legendBox.attr("data-ing");
				legendBox.removeClass(ing); 
				$("#btn_legendSetting_"+that.id).removeClass("on");
				$("#lgListBox_"+that.id).stop().animate({"left":"-550px"},200);

				legendBox.attr("data-ing", "min");
				legendBox.addClass("min");
				
				$("#colorSettingLayer_"+that.id).hide();
				$("#guganSettingLayer_"+that.id).hide();
				
				
				that.goganListResize();
				
			}
		
			
			//function ui 끝

			// 범례 추가
			this.createLegend = function() {
				var that = this;
				var infoLegend = sop.control({
					position : 'bottomleft'
				});
				infoLegend.onAdd = function(map) {
					this._div = sop.DomUtil.create('div', 'info');
					sop.DomEvent.disableClickPropagation(this._div);
					this.update();
					$(this._div).attr("id", 'legend_' + that.id);
					that.legendObj = this._div;
					return this._div;
				};
				infoLegend.update = function(props) {
					var lvSelect,loofLevel=5;
					if(that.lv<5){
						loofLevel = 0;
					}
					for(var i=that.lv;i>=loofLevel;i--){
						lvSelect+='<option value="'+i+'">'+i+'레벨</option>';
					}
					this._div.innerHTML = '<div class="legendRing legendBox min" id="legendBox_'+that.id+'" data-ing="min">'
						+'<div class="color" id="typeArea_'+that.id+'">'
						+'<ul class="colorbar" id="colorStatus_'+that.id+'"></ul>'
						+'<ul class="colorck" id="legendColor_'+that.id+'">'
						+'<li><a href="javascript:void(0)" class="on">#953266</a></li>'
						+'<li><a href="javascript:void(0)">#f6564a</a></li>'
						+'<li><a href="javascript:void(0)">#a63cba</a></li>'
						+'<li><a href="javascript:void(0)">#535353</a></li>'
						+'<li><a href="javascript:void(0)">#3b91ce</a></li>'
						+'<li><a href="javascript:void(0)">#31c9a2</a></li>'
						+'<li><a href="javascript:void(0)">#3b91ce</a></li>'
						+'<li><a href="javascript:void(0)">#31c9a2</a></li>'
						+'<li><a href="javascript:void(0)">#3b91ce</a></li>'
						+'<li><a href="javascript:void(0)">#31c9a2</a></li>'
						/*+'<li class="reverse"><a href="javascript:void(0)></a></li>'*/
						+'</ul>'
						+'<a href="javascript:void(0)" id="reverseBtn_'+that.id+'" class="legendRrefresh">새로고침</a>'
						+'<div class="jumArea">'
						+'<div class="jumText">점 크기 조절</div>'
						+'<ul class="jumGage">'
						+'<li>작게</li>'
						+'<li>중간</li>'
						+'<li>크게</li>'
						+'</ul>'
						+'<div class="jumSlide"></div>'
						+'</div>'
						+'<div class="heatArea">'
						+'<input type="text" class="heatTable" value="#ffffff" />'
						/*+'<span id="color-label_'+that.id+'">nothing</span>'*/
						+'</div>'
						+'</div>'
						+'<div class="legendRound">'
						+'<a href="javascript:void(0)" id="btn_legend_'+that.id+'" class="btn_legend" data-subj="범례모드 팁" title="범례버튼을 클릭하면 상세보기, 간편보기, 최소화 모드로 변경할 수 있습니다.">범례</a>'
						+'<span>(단위:명)</span>'
						+'<a href="javascript:void(0)" id="btn_legendSetting_'+that.id+'" class="btn_legendSetting" data-subj="범례설정 팁" title="지도 위에 나타나는 통계결과의 표출타입, 범례 색상 및 단계를 사용자가 원하는 방식대로 설정할수 있습니다.">설정</a>'
						+'</div>'
						+'</div>'
						+'<ul class="lgListBox" id="lgListBox_'+that.id+'">'
						+'<li>'
						+'<ul id="lgTypeList_'+that.id+'" class="lgTypeList">'
						+'<li><a id="showData_'+that.id+'" href="javascript:void(0)" data-type="data" data-subj="통계치 팁()" title="통계치" class="'+(that.numberData?"on":"")+'"><span>통계치 '+(that.numberData?"on":"off")+'</span></a>'
						+'<li><a href="javascript:void(0)" data-type="color" data-subj="색상지도 팁(Shaded Area map)" title="지도 내  경계영역 내 설정된 범례 범위값과 생상으로 시각화된 데이터를 통해 지역별로 비교할 수 있습니다."><span>색상</span></a>'
						+'<li><a href="javascript:void(0)" data-type="bubble" data-subj="버블지도 팁(Bubbles map)" title="지도내 경계영역 내 설정된 범례 범위값에 따라 경계영역 내 그려진 원형 크기로 시각화된 데이터를 통해 지역별로 비교할 수 있습니다."><span>버블</span></a>'
						+'<li><a href="javascript:void(0)" data-type="dot" data-subj="점지도 팁(Dot Destiny map)" title="지도내 경계영역 내 그려진 점으로 시각화된 데이터를 통해 지역별 밀집도를 비교할 수 있습니다."><span>점</span></a>'
						+'<li><a href="javascript:void(0)" data-type="heat" data-subj="열지도(Heat map)" title="지도내 경계여역 내 설정된 범례범위값과 색상으로 시각화된 데이터를 통해 지역벼로 비교할 수 있습니다."><span>열</span></a>'
						+'</ul>'
						+'<a href="javascript:void(0)" id="legendPopEvent00_'+that.id+'"><span>타입<br />설정</span></a>'
						+'</li>'
						+'<li style="'+(that.delegate.namespace!=undefined&&that.delegate.namespace==="houseAnalysisMap"?'display:none':'')+'"><a href="javascript:void(0)" id="legendPopEvent01_'+that.id+'"class="legendPopEvent" data-id="guganSettingLayer"><span>단계<br />설정</span></a>'
						+'</li>'
						//+'<li><a href="javascript:that.lvLegendSetting(\''+that.id+'\')"; id="legendPopEvent02_'+that.id+'" class="legendPopEvent" data-id="colorSettingLayer"><span>색상<br />설정</span></a>'
						+'<li><a href="javascript:void(0)"; id="legendPopEvent02_'+that.id+'" class="legendPopEvent" data-id="colorSettingLayer"><span>색상<br />설정</span></a>'
						+'</li>'
						+'<li><a href="javascript:void(0)" id="initButton_'+that.id+'"><span>초기화</span></a></li>'
						+'</ul>'
						
						//구간설정
						+'<div class="popBox guganSettingLayer" id="guganSettingLayer_'+that.id+'">'
						+'<div class="topbar">'
						+'<span>범례 구간설정</span>'
						+'<select class="lvSelect" id="lvSelect_'+that.id+'" title="범례 구간설정">'
						+lvSelect
						+'</select>'
						+'<a href="javascript:void(0)">닫기</a>'
						+'</div>'
						+'<div class="popContents" id="popContents01_'+that.id+'">'
						+'<div class="tabs" id="guganSettingButton_'+that.id+'">'
						
						+(that.delegate != undefined && that.delegate.namespace === "thematicMap04" ? 
							'<span style="float:none;line-height:30px;">분류방법</span>'
							+'<div>'
							+'<a href="javascript:void(0)" id="guganAuto_'+that.id+'" class="btnStyle01 al on" style="width:72px;">자동범례</a>' 
							+'<a href="javascript:void(0)" id="guganEqual_'+that.id+'" class="btnStyle01 ac" style="width:72px;border-right:1px solid #9f9f9f">균등범례</a>'
							+'<a href="javascript:void(0)" id="guganNagative_'+that.id+'" class="btnStyle01 ac" style="width:72px;border-right:1px solid #9f9f9f">분할범례</a>'
							+'<a href="javascript:void(0)" id="guganBasic_'+that.id+'" class="btnStyle01 ar" style="width:72px;">사용자정의</a>'
							+'</div>'
						:		
							'<span>분류방법</span>'
							+'<a href="javascript:void(0)" id="guganAuto_'+that.id+'" class="btnStyle01 al on">자동범례</a>'
							+'<a href="javascript:void(0)" id="guganEqual_'+that.id+'" class="btnStyle01 ac">균등범례</a>'
							+'<a href="javascript:void(0)" id="guganUser_'+that.id+'" class="btnStyle01 ar">사용자정의</a>'
						)
						
						+'</div>'
						+'<div class="goganDisabled" id="goganDisabled_'+that.id+'"></div>'
						+'<table class="goganList" id="goganList_'+that.id+'" style="table-layout:fixed;"><tr></tr></table>'
						/*+'<ul class="goganText" id="goganText_'+that.id+'">'
						+'<li>0</li>'
						+'<li>25</li>'
						+'<li>50</li>'
						+'<li>75</li>'
						+'<li>100</li>'
						+'</ul>'*/
						
						+(that.delegate != undefined && that.delegate.namespace === "thematicMap" || that.delegate.namespace === "thematicMap04" ? 
						'<div class="btnBox" style="width: 50%; float: left;">' 
						+'<a href="javascript:void(0)" class="btnStyle01" id="themaInit_'+that.id+'">조기화</a>'
						+'</div>'
						+'<div class="btnBox" style="width: 50%; float: left;">' 
						+'<a href="javascript:void(0)" class="btnStyle01" id="goganEvent_'+that.id+'">적용</a>'
						+'</div>'
						:
						'<div class="btnBox">' 
						+'<a href="javascript:void(0)" class="btnStyle01" id="goganEvent_'+that.id+'">적용</a>'
						+'</div>'
						//구간설정 end
						)
						+'</div>'
						+'</div>'
						
						//색상설정 start
						+'<div class="popBox colorSettingLayer" id="colorSettingLayer_'+that.id+'">'
						+'<div class="topbar">'
						+'<span>사용자 설정</span>'
						+'<a href="javascript:void(0)">닫기</a>'
						+'</div>'
						+'<div class="popContents" id="popContents02_'+that.id+'">'
						+'<div class="tabs only" id="tabsSelector_'+that.id+'">'
						+'<a href="javascript:void(0)" class="btnStyle01 al on">기본색상</a>'
						+'<a href="javascript:void(0)" class="btnStyle01 ac">혼합색상</a>'
						+'<a href="javascript:void(0)" class="btnStyle01 ar">사용자정의</a>'
						+'</div> '
						
						+'<div id="opacityBox_'+that.id+'" class="opacityBox">' 
						+'<ul class="colorck" id="colorSetting_'+that.id+'">'
						+'<li><a href="javascript:void(1)" class="on">#890e4f</a></li>'
						+'<li><a href="javascript:void(2)">#f6564a</a></li>'
						+'<li><a href="javascript:void(3)">#a63cba</a></li>'
						+'<li><a href="javascript:void(4)">#535353</a></li>'
						+'<li><a href="javascript:void(5)">#3b91ce</a></li>'
						+'<li><a href="javascript:void(6)">#31c9a2</a></li>'
						+'</ul>'
						/*+'<label for="opacitySel">투명도 설정</label>'
						+'<select id="opacitySel_'+that.id+'">'
						+'<option value="1">100%</option>'
						+'<option value="0.9">90%</option>'
						+'<option value="0.8">80%</option>'
						+'<option value="0.7">70%</option>'
						+'<option value="0.6">60%</option>'
						+'<option value="0.5">50%</option>'
						+'<option value="0.4">40%</option>'
						+'<option value="0.3">30%</option>'
						+'<option value="0.2">20%</option>'
						+'<option value="0.1">10%</option>'
						+'</select>'*/
						+'</div>'
						+'<div class="colorbarBox" id="colorbarBox_'+that.id+'">'
						+'<a href="javascript:void(0)" class="fl">#00b051</a>'
						+'<ul class="colorSettingList01" id="colorSettingList01_'+that.id+'"></ul>'
						+'<a href="javascript:void(0)" class="fr">#193b70</a>'
						+'</div>'
						 
						+'<div class="btnBox">' 
						+'<a href="javascript:void(0)" class="btnStyle01" id="colorConfirm_'+that.id+'">적용</a>'
						+'</div>'
						+'</div>'
						+'</div>'
						//색상설정 end
						+'</div>'	 
						+'</div>';	
				};
				infoLegend.addTo(this.map.gMap);
				
				if ($(".jumSlide").length){
			    	this.jumSlider();
			    }
			    
			    if ($(".heatTable").length){
			    	this.heatTable();
			    }
			    if ($(".popBox").length){
			    	that.popClose();
			    }
			    
			   /* if ($(".goganList").length){ 
			    	this.lvSelect();
			    	this.goganConfirm();
			    }*/ 
			    
			    if ($("#themaInit_"+that.id).length){ 
			    	this.themaLegendInit();
			    }
			    
			    if ($("#goganList_"+that.id).length){ 
			    	this.lvSelect();
			    	this.goganConfirm();
			    }
			    
			    
			    if ($(".tabs.only").length){
			    	this.userColorSetting(); 
			    }
				
				this.legendEvent();
				resizeColor("#cccccc","#953266", "#goganList_"+that.id+" tr", that.lv);
			    legendColor("#cccccc","#953266", "#colorStatus_"+that.id, that.lv,that.id,that);
			    legendColor("#cccccc","#953266", "#colorSettingList01_"+that.id, that.lv,that.id,that);
			    legendColor("#cccccc","#953266", ".dbColorbar", that.lv,that.id,that);
			    
			    this.goganListResize();
				this.colorck();
				this.linkTooltip();
				$("#goganList_"+that.id).addClass("on");
				
				//guganSettingButton Click
				$("#guganNagative_"+that.id).click(function(){
					that.legendType="negative";
					$("#lvSelect_"+that.id).removeAttr("disabled");
					$("#goganDisabled_"+that.id).show();
					$("#goganList_"+that.id).addClass("on");
					resizeColor(that.legendColor2,that.legendColor1, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
					//that.goganListResize();
					$("#popContents01_"+that.id+" .JCLRgrips").hide();
				});
				
				$("#guganAuto_"+that.id).click(function(){
					that.legendType="auto";
					$("#lvSelect_"+that.id).removeAttr("disabled");
					$("#goganDisabled_"+that.id).show();
					$("#goganList_"+that.id).addClass("on");
					resizeColor(that.legendColor2,that.legendColor1, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
					//that.goganListResize();
					$("#popContents01_"+that.id+" .JCLRgrips").hide();
				});
				
				$("#guganEqual_"+that.id).click(function(){
					that.legendType="equal";
					$("#lvSelect_"+that.id).removeAttr("disabled");
					$("#goganDisabled_"+that.id).show();
					$("#goganList_"+that.id).addClass("on");
					resizeColor(that.legendColor2,that.legendColor1, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
					//that.goganListResize();
					$("#popContents01_"+that.id+" .JCLRgrips").hide();
				});

				$("#guganUser_"+that.id).click(function(){
					that.legendType="user";
					$("#lvSelect_"+that.id).val(that.lv);
					$("#lvSelect_"+that.id).attr("disabled", "disabled");
					$("#goganDisabled_"+that.id).hide();
					$("#goganList_"+that.id).removeClass("on");
					$("#popContents01_"+that.id+" .JCLRgrips").show();
					resizeColor(that.legendColor2,that.legendColor1, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
					that.goganListResize();
				});

				
				//초기화 버튼 mouseOn
				$("#initButton_"+that.id).mouseleave(function(){
					$(this).removeClass("on");
				});
				//초기화 버튼 클릭
				$("#initButton_"+that.id).click(function(){
				    that.legendInit();
				});
				
				//색상설정 버튼 클릭
				$("#colorConfirm_"+that.id).click(function(){
					var tabsSelector =  $("#tabsSelector_"+that.id+" > a");
					var selectorTab;
					//al,ac,ar
					for(var i =0;i<tabsSelector.length;i++){
						for(var y=0;y<tabsSelector[i].classList.length;y++){
							if(tabsSelector[i].classList[y] == "on"){
								selectorTab = tabsSelector[i].classList[1];
							}
						}
					}
					//투명도 조절
					var opacity = $("#opacitySel_"+that.id).val();
				    $("#colorStatus_"+that.id).css('opacity',opacity);
				    //레벨
				    var lv = $("#lvSelect_"+that.id).val();
				    var color;
				    var startColor;
				    var endColor;
				    

				    if(selectorTab =="al"){
						//기본색상
				    	color = $("#colorSetting_"+that.id+" li>a.on").css("background-color");
				    	that.legendColor1 = color;
				    	that.legendColor2 = "ccc";
				    	resizeColor("#ccc",color, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
				    	legendColor("#ccc", color, "#colorStatus_"+that.id, lv,that.id,that);
				    }else if(selectorTab =="ac"){
				    	//혼합색상
				    	startColor = $("#colorSettingList01_"+that.id+" >li").css("background-color");
						endColor = $("#colorSettingList01_"+that.id+" > li:last-child").css("background-color");
						
						that.legendColor1 = endColor;
						that.legendColor2 = startColor;
						resizeColor(startColor,endColor, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
						legendColor(startColor, endColor,  "#colorStatus_"+that.id, lv,that.id,that);
				    }else if(selectorTab =="ar"){
				    	//사용자정의
					    startColor = $("#colorbarBox_"+that.id+" .fl").text();
					    endColor = $("#colorbarBox_"+that.id+" .fr").text();

					    that.legendColor1 = endColor;
					    that.legendColor2 = startColor;
					    resizeColor(startColor,endColor, "#goganList_"+that.id+" tr", $("#lvSelect_"+that.id).val());
					    legendColor(startColor, endColor, "#colorStatus_"+that.id, lv,that.id,that);
				    }
				    
				    //맵의 색상 변경 시키기
				    that.isNegative = false;
				    that.map.setLegendColor();
				    $("#colorSettingLayer_"+that.id).hide();
				    var on = $("#legendPopEvent02_"+that.id).hasClass("on");
				    if (on) {
				    	$("#legendPopEvent02_"+that.id).removeClass("on");
				    }
				    

				});
				
				$("#reverseBtn_"+that.id).click(function(){
					if(that.reverseOn==false){
						that.reverseOn=true;
					}else{
						that.reverseOn=false;
					}
					
					var cls = "#colorStatus_"+that.id;
					that.legendColor.reverse();
					$(cls).empty();
					if(that.delegate.namespace==="houseAnalysisMap"){
						$(cls).prepend("<li style='background:" + that.legendColor[0] + ";border:0px solid " + that.legendColor[0] + ";'><span>하</span></li>");	
						$(cls).prepend("<li style='background:" + that.legendColor[1] + ";border:0px solid " + that.legendColor[1] + ";'><span>중</span></li>");	
						$(cls).prepend("<li style='background:" + that.legendColor[2] + ";border:0px solid " + that.legendColor[2] + ";'><span>상</span></li>");	
					}else{
						for ( var i = 0; i < that.legendColor.length; i++) {
							var txt = i+1;
							if(txt<10){
								txt = "0"+txt;
							}
							if(that.valPerSlice != null){
								$(cls).prepend("<li style='background:" + that.legendColor[i] + ";border:0px solid " + that.legendColor[i] + ";'><span>"+that.valPerSlice[0][i]+"</span></li>");	
							}else{
								$(cls).prepend("<li style='background:" + that.legendColor[i] + ";border:0px solid " + that.legendColor[i] + ";'><span>"+txt+"Lv</span></li>");
							}
							
						}
					}
					
					if($("#typeArea_"+that.id).attr("class")=="color"){
						var liHeight = parseInt(220/that.lv); 
						$(cls+" li").css("height",liHeight+"px");
						$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*that.lv))+"px");
					}
					
					that.map.setLegendColor();
				});
				
			};// createLegend 끝
			
			
			
		}// legendInfo 끝
	},// sLegendInfo 끝

	
	$legendInfo.event = {
		/**
		 * @description : Event 설정
		 */
		setUIEvent : function() {
	
		}
	}

}(window, document));


$(function(){  
	var body = $("body");
	
	var settingList = ".lgListBox>li>a";
	body.on("click", settingList, function(){
		var on = $(this).hasClass("on");
		if(!on){
			$(this).siblings("ul").show();
			$(this).addClass("on");
		}else{
			$(this).siblings("ul").hide();
			$(this).removeClass("on");
		}
	});
	
    
    
});



function resizeColor(c01, c02, cls, max){  // 범례구간설정 색지정
	var arrColor = new Array();
	var paramColor1 = c01;
	var paramColor2 = c02;
	
	for ( var i = 0; i < max; i++) {
		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
		arrColor.push(paramColor);
	} 
	$(cls).empty();
	for ( var i = arrColor.length-1; i >=0; i--) { 
		$(cls).prepend("<td style='background:" + arrColor[i] + ";'></td>");	
	}
}

function getCalculColor(sColor, eColor, lv) {
	var colorList = [];
	for ( var i = 0; i < lv; i++) {
		var paramColor = $.xcolor.gradientlevel(sColor, eColor, i, lv);
		colorList.push(paramColor.getColor());
	} 
	return colorList;
}

function setLegendColor(colorList, cls, id, obj) {
	var max = obj.lv;
	$(cls).empty();

	for ( var i = 0; i < colorList.length; i++) {
		var txt = i+1;
		if(txt<10){
			txt = "0"+txt;
		}
		if(obj.valPerSlice != null){
			$(cls).prepend("<li style='background:" + colorList[i] + ";border:0px solid " + colorList[i] + ";'><span>"+obj.valPerSlice[0][i]+"</span></li>");	
		}else{
			$(cls).prepend("<li style='background:" + colorList[i] + ";border:0px solid " + colorList[i] + ";'><span>"+txt+"Lv</span></li>");
		}
	}

	if($("#typeArea_"+id).attr("class")=="color"){
		var liHeight = parseInt(220/max); 
		$(cls+" li").css("height",liHeight+"px");
		$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*max))+"px");
	}
}

function legendColor(c01, c02, cls, max,id,obj){
	var arrColor = new Array();
	var paramColor1 = c01;
	var paramColor2 = c02;
	
	//legend 변수 세팅
	obj.lv = max;
	obj.legendColor = new Array();

	for ( var i = 0; i < max; i++) {
		var paramColor = $.xcolor.gradientlevel(paramColor1, paramColor2, i, max);
		arrColor.push(paramColor);
	} 
	$(cls).empty();
	if(obj.delegate.namespace==="houseAnalysisMap"){
		$(cls).prepend("<li style='background:" + arrColor[0] + ";border:0px solid " + arrColor[0] + ";'><span>하</span></li>");
		$(cls).prepend("<li style='background:" + arrColor[1] + ";border:0px solid " + arrColor[1] + ";'><span>중</span></li>");
		$(cls).prepend("<li style='background:" + arrColor[2] + ";border:0px solid " + arrColor[2] + ";'><span>상</span></li>");
		for ( var i = 0; i < arrColor.length; i++) {
			obj.legendColor[i] = arrColor[i].getColor();
		}
	}else{
		for ( var i = 0; i < arrColor.length; i++) {
			var txt = i+1;
			if(txt<10){
				txt = "0"+txt;
			}
			if(obj.valPerSlice != null){
				$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+obj.valPerSlice[0][i]+"</span></li>");	
			}else{
				$(cls).prepend("<li style='background:" + arrColor[i] + ";border:0px solid " + arrColor[i] + ";'><span>"+txt+"Lv</span></li>");
			}
			//cls가 무엇이냐에 따라서 분기 처리를 또 해줘야 할듯
			obj.legendColor[i] = arrColor[i].getColor();
		}
	}
	if($("#typeArea_"+id).attr("class")=="color"){
		var liHeight = parseInt(220/max); 
		$(cls+" li").css("height",liHeight+"px");
		
		//첫번째 색상만 height가 달라서 주석처리
		//$(cls+" li").eq(0).css("height",liHeight+(220-parseInt(liHeight*max))+"px");
	}
	if(cls=="#colorSettingList01_"+id){
		$("#colorSettingList01_"+id+">li").each(function(){
			$(this).width((100/$("#colorSettingList01_"+id+">li").length)+"%");
		});
	}
}

function lvLegendSetting(id,obj){
	var color;
	var listLegnth = $("#lvSelect_"+id).val();
	
	var tabsSelector =  $("#tabsSelector_"+id+" > a");
	var selectorTab;
	
	for(var i =0;i<tabsSelector.length;i++){
		for(var y=0;y<tabsSelector[i].classList.length;y++){
			if(tabsSelector[i].classList[y] == "on"){
				selectorTab = tabsSelector[i].classList[1];
			}
		}
	}
	var opacity = $("#opacitySel_"+id).val();
	
	if(selectorTab =="al"){
		var colorckList = $("#colorSetting_"+ id +" > li> a");
		var arrColor = new Array();
		
		for(var i = 0 ; i<colorckList.length;i++){
			if(colorckList[i].classList.length>0){
				for(var y=0;y<colorckList[i].classList.length;y++){
					if(colorckList[i].classList[y] =="on"){
						color = colorckList[i].style.background;
					}
				}
			}
		}
		
		
		legendColor("#ccc",color, "#colorSettingList01_"+id, $("#lvSelect_"+id).val(),id,obj);
	}
	
}

