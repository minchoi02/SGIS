(function(W, D) {
	var dataAreaSize = 200;
	$(document).ready(function(){
		$house.databoard.event.setUIEvent();
	});
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$.each($("#region-spiderweb-chart,#indicator-chart,#databoard-box .TabArea>.chart"),function(cnt,node){
				if($(node).highcharts()){
					var chartHeight = getChartHeight();
					if(cnt==1){
						chartHeight-=105;
					}
					if(chartHeight<200){
						chartHeight = $(window).height();
					}
					$(node).highcharts().setSize($(window).width(),chartHeight);
				}
			});
		},100);
	});
	W.$house = W.$house || {};
	$house.databoard = {
		descIndicatorChart ://지표별 상세현황 막대차트 내림차순 정렬할 지표 
		[
			"HMM0006"/*주택-노후주택비율*/,"HMM0008"/*주택-면적당 아파트가격*/,
			"HMM0013"/*안전-화재안전*/,"HMM0014"/*안전-교통사고안전*/,
			"HMM0020"/*교육-교원 1인당 학생수*/,
			"HMM0023"/*복지문화-유치원 및 보육시설*/,"HMM0024"/*복지문화-병의원 및 약국*/,"HMM0025"/*복지문화-노인복지시설*/,"HMM0026",/*복지문화-사회복지시설*/
			"HMM0028"/*안전-범죄안전*/,"HMM0029"/*안전-안전사고*/,"HMM0030"/*안전-자살안전*/,"HMM0031"/*안전-감염병 안전*/,"HMM0032"/*안전-자연재해 안전*/
		],
		bClassInfoList : {
			"HML0001": {
				text:"자연",
				rgbColor:"137,190,75"
			},
			"HML0002": {
				text:"주택",
				rgbColor:"82,157,197"
			},
			"HML0003": {
				text:"지역 인구",
				rgbColor:"236,128,171"
			},
			"HML0004": {
				text:"안전",
				rgbColor:"245,207,90"
			},
			"HML0005": {
				text:"생활 편의 교통",
				rgbColor:"90,183,183"
			},
			"HML0006": {
				text:"교육",
				rgbColor:"139,131,201"
			},
			"HML0007": {
				text:"복지 문화",
				rgbColor:"28,44,129"
			}
		},
		/**
		 * @name        : clear
		 * @description : 데이터 보드 초기화
		 * @date        : 2016. 07. 04.
		 * @author	    : 나광흠
		 * @history 	:
		 */
		clear : function(){
			$("#databoard-area .SubjectB a,#databoard-box .TabGroup>.tab").removeClass("M_on");
			$("#databoard-area .SubjectB a:first,#databoard-box .TabGroup>.tab:first").addClass("M_on");
			$("#databoard-box>.Detail2_1,#databoard-box .TabArea").hide();
			$("#databoard-box>.Detail2_1:first,#databoard-box .TabArea:first").show();
			$.each($("#region-spiderweb-chart,#indicator-chart,#databoard-box .TabArea>.chart"),function(cnt,node){
				if($(node).highcharts()){
					$(node).highcharts().destroy();
				}
			});
			$("#databoard-box .TabArea:eq(3)>.origin_txt").empty();
		},
		/**
		 * @name            : getAdmCd
		 * @description     : adm_cd 얻기
		 * @date            : 2016. 07. 01.
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param sido_cd   : 시도 코드
		 * @param sgg_cd    : 시군구 코드 
		 * @param emdong_cd : 읍면동 코드 
		 */
		getAdmCd:function(sido_cd,sgg_cd,emdong_cd){
			var adm_cd="";
			if(sido_cd&&sido_cd!="00"){
				adm_cd = sido_cd;
				if(sgg_cd&&sgg_cd!="999"){
					adm_cd = sido_cd+sgg_cd;
					if(emdong_cd&&emdong_cd!="00"){
						adm_cd = sido_cd+sgg_cd+emdong_cd;
					}
				}
			}
			return adm_cd;
		},
		/**
		 * @name            : getMapOptions
		 * @description     : 지도 옵션 얻기
		 * @date            : 2016. 07. 01.
		 * @author	        : 나광흠
		 * @history 	    :
		 * @param adm_cd    : 행정동코드
		 */
		getMapOptions:function(adm_cd){
			if(adm_cd){
				adm_cd = adm_cd.toString();
			}
			var zoom = 1,sido_cd="",sgg_cd="",emdong_cd="";
			if(adm_cd&&adm_cd.length>=2&&adm_cd.substring(0,2)!="00"){
				sido_cd = adm_cd.substring(0,2);
				zoom = 4;
				if(adm_cd.length>=5&&adm_cd.substring(2,5)!="999"){
					sgg_cd = adm_cd.substring(2,5);
					zoom = 6;
					if(adm_cd.length>=7&&adm_cd.substring(5,7)!="00"){
						emdong_cd = adm_cd.substring(5,7);
						zoom = 9;
					}
				}
			}
			return {zoom:zoom,sido_cd:sido_cd,sgg_cd:sgg_cd,emdong_cd:emdong_cd,adm_cd:sido_cd+sgg_cd+emdong_cd};
		},
		/**
		 * @name        : smallLocationChartBridge
		 * @description : 소지역정보 차트 그리기
		 * @date        : 2016. 07. 01.
		 * @author	    : 나광흠
		 * @history     :
		 * @param index : 0=(연령대별 인구),1=(주택종류),2=(자가/임차),3=(사업체 수)
		 */
		smallLocationChartBridge :function(index){
			if(index==0){//연령대별 인구
				getChartAdmCd(function(isSido,adm_cd){
					ageGroupChart(isSido,adm_cd);
				});
			}else if(index==1){//주택종류
				getChartAdmCd(function(isSido,adm_cd){
					houseChart(isSido,adm_cd);
				});
			}else if(index==2){//사업체 수
				companyChart();
			}else{
				return;
			}
		}
	};
	$house.databoard.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 06. 30. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			//데이터보드 버튼 클릭
			$("#databaord-area-button").click(function(){
				if(!$(this).hasClass("NoneAction")){
					$("#databoard-area").show();
					$house.event.setItemBoxSize();
					regionSpiderChart();
				}
			});
			//탭 클릭
			$("#databoard-area .Subject.SubjectB a").click(function(){
				$(this).parent().find("a").removeClass("M_on");
				$(this).addClass("M_on");
				$("#databoard-box>.Detail2_1").hide();
				$("#databoard-box>.Detail2_1:eq("+$(this).index()+")").show();
				if($(this).index()==0){//지역종합현황보기
					regionSpiderChart();
				}else if($(this).index()==1){//지표별 상세현황
					indicatorChart(bClassInfoList[Object.keys(bClassInfoList)[0]].indicator[Object.keys(bClassInfoList[Object.keys(bClassInfoList)[0]].indicator)[0]]);
					setNavigatorWidth($("#indicator-navigator>div.M_on"));
				}else if($(this).index()==2){//소지역정보
					$house.databoard.smallLocationChartBridge($("#databoard-box .TabGroup>.tab.M_on").index());
				}
			});
			//소지역정보 탭 클릭
			$("#databoard-box .TabGroup a").click(function(){
				$(this).parents(".TabGroup").find(".tab").removeClass("M_on");
				$(this).parent().addClass("M_on");
				$(this).parents(".Detail2_1").find(".TabArea").hide()
				$(this).parents(".Detail2_1").find(".TabArea:eq("+$(this).parent().index()+")").show();
				$house.databoard.smallLocationChartBridge($(this).parent().index());
				return false;
			});
			//지표별 상세현황 중분류 클릭시
			$("#indicator-navigator [data-class-type=m]").click(function(){
				$("#indicator-navigator [data-class-type=m]").removeClass("M_on");
				$(this).addClass("M_on");
				if($("#indicator-chart").highcharts()){
					$("#indicator-chart").highcharts().destroy();
				}
				indicatorChart(bClassInfoList[$(this).data("parent-id")].indicator[$(this).data("id")]);
				return false;
			});
			//지표별 상세현황 네비게이터 좌,우 클릭 이벤트
			$(".b-class-box .left,.b-class-box .right").click(function(){
				var element;
				if($(this).hasClass("left")){
					if($("#indicator-navigator>div.M_on").prev().length>0){
						element = $("#indicator-navigator>div.M_on").prev();
					}else{
						element = $("#indicator-navigator>div:last");
					}
				}else{
					if($("#indicator-navigator>div.M_on").next().length>0){
						element = $("#indicator-navigator>div.M_on").next();
					}else{
						element = $("#indicator-navigator>div:first");
					}
				}
				$("#indicator-navigator>div").removeClass("M_on");
				element.addClass("M_on");
				indicatorChart(bClassInfoList[Object.keys(bClassInfoList)[0]].indicator[Object.keys(bClassInfoList[Object.keys(bClassInfoList)[0]].indicator)[0]]);
				setNavigatorWidth(element);
				element.find("[data-class-type=m]:first").click();
			});
			//지역종합현황보기의 좌,우 버튼 클릭 이벤트
			$("#spider-web-chart-prev,#spider-web-chart-next").click(function(){
				var showElement;
				if($("#spider-web-box>div:visible").index()==0){
					showElement = $("div[id^=region-spiderweb-chart]");
				}else{
					showElement = $("div[id^=compare-region-spiderweb-chart]");
				}
				$("#spider-web-box>div").hide();
				showElement.show();
			});
			$(".TabArea .origin_txt.census").text("출처 : "+censusDataYear+" 인구주택총조사");
		}
	};
	/**
	 * @name          : setNavigatorWidth
	 * @description   : 지표별 상세현황 네비게이터 아이템의 box 넓이 조정
	 * @date          : 2016. 07. 01.
	 * @author	      : 나광흠
	 * @history 	  :
	 * @param element : jquery selector
	 */
	function setNavigatorWidth(element){
//		var width = 0;
//		element.find(".m-class-box .tab").each(function(a,b){
//			var thisWidth = $("#databoard-area .SubjectB a:first").width()-10;
//			if(thisWidth<110){
//				thisWidth = 110;
//			}
//			$(this).width(thisWidth);
//			width+=$(this).outerWidth(true);
//		});
		
		element.find(".m-class-box>div").width('100%');
		element.find(".m-class-box").prop('style','overflow:visible;');
		element.find(".m-class-box>.tab").prop('style','width:33%;');
	}
	/**
	 * @name            : regionSpiderChart
	 * @description     : 지역종합현황보기 스파이더 차트 그리기
	 * @date            : 2016. 07. 01.
	 * @author	        : 나광흠
	 * @history 	    :
	 */
	function regionSpiderChart(){
		if(!$("#region-spiderweb-chart").highcharts()){
			var abs = new sop.portal.absAPI();
			abs.onBlockUIPopup();
			var adm_cd = $house.search.activeAdmCd;
			var mapOption = $house.databoard.getMapOptions(adm_cd);
			$house.api.areaIndexChartLists(mapOption.sido_cd,mapOption.sgg_cd,mapOption.emdong_cd,null,function(res){
				$("div[id*=region-spiderweb-chart],div[id^=spider-web-chart-]").hide();
				var sido_nm="",sgg_nm="",emdong_nm="";
				if (res.errCd == "0") {
					var getValueName = "z_score";
					function calc(list){
						var array = [];
						if(list&&list.length>0){
							$.each(list,function(cnt,node){
								array.push(parseFloat(node[getValueName]));
							});
						}
						return array;
					}
					function appendLabelName(selector,appendName){
						selector.update({name:appendName+selector.name+" 평균"});
					}
					var categories = [];
					var series = [];
					$.each($house.databoard.bClassInfoList,function(cnt,node){
						categories.push(node.text);
					});
//					전국 데이터는 무조건 5로 하드코딩으로 변경
					function changeCountryZscore(obj){
						$.each(obj.list,function(){
							this.z_score = "5";
						});
					}
					changeCountryZscore(res.result.country);
					series.push({name:"전국",data:calc(res.result.country.list)});
					if(mapOption.sgg_cd&&mapOption.sgg_cd!="999"){
						if(mapOption.emdong_cd&&mapOption.emdong_cd!="00"){
							series.push({name:res.result.sgg.info.addr,data:calc(res.result.sgg.list)})
							series.push({name:res.result.emdong.info.addr,data:calc(res.result.emdong.list)})
						}else{
							series.push({name:res.result.sido.info.addr,data:calc(res.result.sido.list)});
							series.push({name:res.result.sgg.info.addr,data:calc(res.result.sgg.list)})
						}
					}else{
						series.push({name:res.result.sido.info.addr,data:calc(res.result.sido.list)});
					}
					$highchartApi.spiderwebChart("#region-spiderweb-chart",$(window).width(),getChartHeight(),series,categories,true,0,10);
					appendLabelName($("#region-spiderweb-chart").highcharts().legend.allItems[0],"");
					appendLabelName($("#region-spiderweb-chart").highcharts().legend.allItems[$("#region-spiderweb-chart").highcharts().legend.allItems.length-1],"관심지역:");
					if($("#region-spiderweb-chart").highcharts().legend.allItems.length>=3){
						appendLabelName($("#region-spiderweb-chart").highcharts().legend.allItems[1],"상위지역:");
					}
					var maxResult = -10;
					var selectwgtval = 0;
					for(var i=0; i<series[series.length-1].data.length; i++){
						var tempResult = parseFloat(series[series.length-1].data[i]);
						if(maxResult <= tempResult){
							maxResult = tempResult;
							selectwgtval = i;
						}
					}
					$("#region-spiderweb-chart-label").empty().append(
						$("<span/>",{"style":"color:#336699;","text":series[0].name}),
						" 내에서 ",
						$("<span/>",{"style":"color:#336699;","text":series[series.length-1].name}),
						"의 ",
						$("<span/>",{"style":"color:#c30;","text":"「"+categories[selectwgtval]+"」"}),
						" 지표가 좋음"
					);
					if($house.search.isAbode==false){
						var interArea = $.extend(true, {}, series[series.length-1]);
						var compareSeries = [interArea];
						$house.api.areaIndexChartLists($("#stand-recommend-sido").val(),$("#stand-recommend-sgg").val(),null,null,function(res){
							if(res.errCd=="0"){
								if($("#stand-recommend-sido").val()=="00"){
									changeCountryZscore(res.result.country);
									compareSeries.unshift({name:"전국",data:calc(res.result.country.list)});
								}else{
									if($("#stand-recommend-sgg").val()=="999"){
										compareSeries.unshift({name:res.result.sido.info.addr,data:calc(res.result.sido.list)});
									}else{
										compareSeries.unshift({name:res.result.sgg.info.addr,data:calc(res.result.sgg.list)});
									}
								}
								$highchartApi.spiderwebChart("#compare-region-spiderweb-chart",$(window).width(),getChartHeight(),compareSeries,categories,true,0,10);
								appendLabelName($("#compare-region-spiderweb-chart").highcharts().legend.allItems[0],"기준지역:");
								appendLabelName($("#compare-region-spiderweb-chart").highcharts().legend.allItems[1],"추천지역:");
								var maxResult = -10;
								var selectwgtval = 0;
								for(var i=0; i<compareSeries[0].data.length; i++){
									var tempResult = parseFloat(compareSeries[1].data[i]);
									if(maxResult <= tempResult){
										maxResult = tempResult;
										selectwgtval = i;
									}
								}
								$("#compare-region-spiderweb-chart-label").empty().append(
									$("<span/>",{"style":"color:#336699;","text":compareSeries[0].name}),
									"에 비해 ",
									$("<span/>",{"style":"color:#336699;","text":compareSeries[1].name}),
									"의 ",
									$("<span/>",{"style":"color:#c30;","text":"「"+categories[selectwgtval]+"」"}),
									" 지표가 좋음"
								);
								$("div[id^=compare-region-spiderweb-chart],div[id^=spider-web-chart-]").show();
							}
						});
					}else{
						$("div[id^=region-spiderweb-chart]").show();
					}
				} else if (res.errCd == "-100") {
					console.warn(res.errMsg);
				} else {
					messageAlert.open("알림", res.errMsg);
				}
				abs.onBlockUIClose();
			});
		}
	}
	/**
	 * @name               : indicatorChart
	 * @description        : 지역종합현황보기 스파이더 차트 그리기
	 * @date               : 2016. 07. 01.
	 * @author	           : 나광흠
	 * @history 	       :
	 * @param mClassObject : 중분류
	 */
	function indicatorChart(mClassObject){
		if(!$("#indicator-chart").highcharts()){
			//기준지역 표시 유무
			var isSetStand = true;
			/**
			 * 기준 그래프 제외 대상
			 * 생활편의교통 
			 *      - 편의시설 수 : HMM0015
			 *      - 쇼핑시설 수 : HMM0016
			 *      - 외식시설 수 : HMM0017
			 *      - 잡화점 수 : HMM0033
			 * 교육 
			 *      - 고등교육기관 수 : HMM0021
			 *      - 학원 수 : HMM0022
			 * 복지문화 
			 *      - 문화시설 수 : HMM0027
			 *      - 체육시설 수 : HMM0027
			 */
			if(/^HMM00(15|16|17|21|22|27|33|34)$/.test(mClassObject.m_class_idx_id)){
				isSetStand = false;
			}
			var abs = new sop.portal.absAPI();
			abs.onBlockUIPopup();
			$("#indicator-avg-list,#stand-indicator-avg-list").empty().hide();
			$("th[data-stand=true]").hide();
			var adm_cd = $house.search.activeAdmCd;
			var mapOption = $house.databoard.getMapOptions(adm_cd);
			var year = $house.ui.map.bnd_year,searchLevel;
			if(!hasText(mapOption.adm_cd)){
				searchLevel = 1;
			}else if(mapOption.adm_cd.length==2){
				searchLevel = 2;
			}else if(mapOption.adm_cd.length>=5){
				searchLevel = 3;
			}
			if(searchLevel>mClassObject.disp_level){
				searchLevel = mClassObject.disp_level;
			}
			setAvgText($("#indicator-avg-list"),mClassObject,mapOption,year,searchLevel,"N",isSetStand);
			setIndicatorData(mClassObject,($house.search.isAbode?"00":$("#stand-recommend-sido").val()+$("#stand-recommend-sgg").val()),isSetStand,function(standResponse){
				var standData={};
				if(hasText(standResponse.result.emdong)){
					standData = standResponse.result.emdong
				}else if(hasText(standResponse.result.sgg)){
					standData = standResponse.result.sgg
				}else if(hasText(standResponse.result.sido)){
					standData = standResponse.result.sido
				}else if(hasText(standResponse.result.country)){
					standData = standResponse.result.country
				}
				$house.api.houseAnalysisOrderLists(searchLevel,mClassObject.b_class_idx_id,mClassObject.m_class_idx_id,year,mapOption.sido_cd,mapOption.sgg_cd,function(res){
					var data = [];
					var lineData = [];
					$.each(res.result,function(cnt,node){
						var short_adm_nm,y;
						if(mClassObject.b_class_idx_id=="HML0001"&&(mClassObject.m_class_idx_id=="HMM0001"||mClassObject.m_class_idx_id=="HMM0002")){
							y = parseFloat(node.z_score);
						}else{
							y = parseFloat(node.value);
						}
						data.push({
							name : node.short_adm_nm,
							y : y,
							color : (mapOption.adm_cd.substring(0,node.adm_cd.length)==node.adm_cd?"#FF0000":"#ccc")
						});
						lineData.push({
							y : parseFloat(standData.avg_value)
						});
					});
					var title;
					if(mClassObject.m_class_idx_id=="HMM0023"){
						title = "보육시설 대비 5세이하 인구 수";
					}else if(mClassObject.m_class_idx_id=="HMM0024"){
						title = "병의원 및 약국 대비 인구 수";
					}else if(mClassObject.m_class_idx_id=="HMM0025"){
						title = "노인복지시설 대비 65세 이상 인구 수";
					}else if(mClassObject.m_class_idx_id=="HMM0026"){
						title = "사회복지시설 대비 인구 수";
					}else{
						title = mClassObject.m_class_idx_nm;
					}
					data = data.sort(dynamicSort(($house.databoard.descIndicatorChart.indexOf(mClassObject.m_class_idx_id)>-1?"-":"")+"y"));
					if(isSetStand){
						data.unshift({
							name : "<br>기준 : "+standData.adm_nm,
							y : parseFloat(standData.avg_value),
							color : "#0054FF"
						});
						lineData.unshift({
							y : parseFloat(standData.avg_value)
						});
						drawIndicatorChart(title, res.result[0].unit, data,{
							type: 'spline',
			                data: lineData,
			                lineColor : "#0054FF",
			                marker: {
			                	enabled: false
			                },
			                enableMouseTracking: false
						});
					}else{
						drawIndicatorChart(title, res.result[0].unit, data,{});
					}
					abs.onBlockUIClose();
				});
			});
		}
	}
	/**
	 * @name                      : chart
	 * @description               : 차트 그리기
	 * @date                      : 2015. 12. 09.
	 * @author                    : 나광흠
	 * @history                   :
	 * @param dataName            : 데이터 이름
	 * @param unit                : 단위
	 * @param data                : 데이터 : [{name:"이름",y:"y축 값"}]
	 * @param lineData            : 선 데이터
	 */
	function drawIndicatorChart(dataName, unit, data, lineData) {
		var xAxisLabelIndex = 0;
		var xAxisCat = [];
		$.each(data,function(cnt,node){
			xAxisCat.push(node.name.split(";")[0]);
		});
		var datalength = data.length-1;
		var series = {
			data: data,
			type: "column",
			tooltip: {valueSuffix: ""}
		};
		var chartHeight = getChartHeight()-100;
		var chartOption = {
			backgroundColor: 'white',
			width: $(window).width(),
			height: chartHeight
		};
		var seriesArray;
		if(hasText(lineData)){
			seriesArray = [series,lineData];
		}else{
			seriesArray = [series];
		}
		$("#indicator-chart").highcharts({
			chart: chartOption,
			title: {
				text: ''
			},
			xAxis: {
				categories: xAxisCat,
				type: "category",
				labels: {
					enabled: false
				}
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
					enabled: true
				}
			},
			series: seriesArray,
			tooltip: {
				formatter : function(){
					var header = '<div><span>'+this.points[0].key.replace("<br>", "").split(";")[0]+'</span><div/>';
					var pointer = "";
					$.each(this.points,function(){
						pointer+='<div><span style="color:'+this.series.color+';padding:0">'+dataName+': </span><span style="font-weight: bold;">'+appendCommaToNumber(this.y)+'</span>'+(unit?"("+unit+")":"")+'</div>';
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
	}
	/**
	 * @name               : setIndicatorData
	 * @description        : 상세별 지표현황 값 셋팅
	 * @date               : 2016. 08. 08.
	 * @author	           : 나광흠
	 * @history 	       :
	 * @param mClassObject : 중분류
	 * @param adm_cd       : 행정동 코드
	 * @param isSetStand   : 기준지역을 셋팅할지의 여부
	 * @param callback     : callback
	 */
	function setIndicatorData(mClassObject,adm_cd,isSetStand,callback){
		var mapOption = $house.databoard.getMapOptions(adm_cd);
		var year = $house.ui.map.bnd_year,searchLevel;
		if(!hasText(mapOption.adm_cd)){
			searchLevel = 1;
		}else if(mapOption.adm_cd.length==2){
			searchLevel = 2;
		}else if(mapOption.adm_cd.length>=5){
			searchLevel = 3;
		}
		if(searchLevel>mClassObject.disp_level){
			searchLevel = mClassObject.disp_level;
		}
		setAvgText($("#stand-indicator-avg-list"),mClassObject,mapOption,year,searchLevel,"Y",isSetStand,callback);
	}
	/**
	 * @name               : setAvgText
	 * @description        : 상세별 지표현황 평균값 셋팅
	 * @date               : 2016. 08. 08.
	 * @author	           : 나광흠
	 * @history 	       :
	 * @param element      : jquery selector
	 * @param mClassObject : 중분류
	 * @param mapOption    : 지도 옵션
	 * @param year         : 년도
	 * @param searchLevel  : 검색 레벨
	 * @param stand_is     : 파라미터에 기준지역 여부(Y,N)
	 * @param isSetStand   : 기준지역을 셋팅할지의 여부
	 * @param callback     : callback
	 */
	function setAvgText(element,mClassObject,mapOption,year,searchLevel,stand_is,isSetStand,callback){
		var parameters = {
			b_class_idx_id : mClassObject.b_class_idx_id,
			m_class_idx_id : mClassObject.m_class_idx_id,
			year : year,
			level : searchLevel,
			stand_is : stand_is
		};
		if(hasText(mapOption.sido_cd)){
			parameters.sido_cd = mapOption.sido_cd;
		}
		if(hasText(mapOption.sgg_cd)){
			parameters.sgg_cd = mapOption.sgg_cd;
		}
		if(hasText(mapOption.emdong_cd)){
			parameters.emdong_cd = mapOption.emdong_cd;
		}
		$.ajax({
			url : sgisContextPath+"/ServiceAPI/house/houseAnalysisAvgLists.json",
			type:"POST",
			data: parameters,
			async: true,
			dataType:"json",
			success: function(res){
				if(res.errCd=="0"){
					element.show().empty();
					if(element.attr("id")=="stand-indicator-avg-list"){
						$("th[data-stand=true]").show();
					}
					function create(data){
						if(data){
							element.append($("<div/>").append(
								(data.adm_nm+" : "),
								$("<span/>",{"text":(appendCommaToNumber(data.avg_value))}),
								(data.unit?"("+data.unit+")":"")
							));
						}
					}
					if(isSetStand||stand_is=="N"||$house.search.isAbode==false){
						create(res.result.country);
						create(res.result.sido);
						create(res.result.sgg);
						create(res.result.emdong);
					}
					if(typeof callback === "function"){
						callback(res);
					}
				}
			},
			error: function(data){
				messageAlert.open("알림",errorMessage);
				return false;
			}
		});
	}
	/**
	 * @name           : getChartAdmCd
	 * @description    : 차트 adm_cd 구하기
	 * @date           : 2016. 07. 01.
	 * @author	       : 나광흠
	 * @history        :
	 * @param callback : callback
	 */
	function getChartAdmCd(callback){
		if(typeof callback === "function"){
			var adm_cd = $house.search.activeAdmCd;
			if(adm_cd.length<=2){
				accessTokenInfo(function(){
					callback(true,getFirstSggCd(adm_cd));
				});
			}else{
				callback(false,adm_cd);
			}
		}
	}
	/**
	 * @name         : ageGroupChart
	 * @description  : 연령대별인구 차트
	 * @date         : 2016. 07. 01.
	 * @author	     : 나광흠
	 * @history      :
	 * @param isSido : 시도 코드인지 유무 
	 * @param adm_cd : 행정동 코드
	 */
	function ageGroupChart(isSido,adm_cd){
		var chartArea = "#databoard-box .TabArea:first>.chart";
		if(!$(chartArea).highcharts()){
			var abs = new sop.portal.absAPI();
			abs.onBlockUIPopup();
			$house.ui.map.censusApi.setStatsMapAdmCdCensusData("API_0602",{
				"adm_cd" : adm_cd,
				"onlyGetData" : true,
				"callback" : function(res){
					var chartHeight = $("#databoard-area").height()-dataAreaSize;
					if(res.errCd=="0"){
						var categories = ['10세 이하', '10대', '20대', '30대', '40대', '50대', '60대', '70세 이상'];
						var series = new Array();
						var setData = function(data){
							var tempData = new Array();
							tempData.push(parseFloat($.isNumeric(data.teenage_less_than_per)?data.teenage_less_than_per:0));//10대 미만 비율
							tempData.push(parseFloat($.isNumeric(data.teenage_per)?data.teenage_per:0));//10대 비율
							tempData.push(parseFloat($.isNumeric(data.twenty_per)?data.twenty_per:0));//20대 비율
							tempData.push(parseFloat($.isNumeric(data.thirty_per)?data.thirty_per:0));//30대 비율
							tempData.push(parseFloat($.isNumeric(data.forty_per)?data.forty_per:0));//40대 비율
							tempData.push(parseFloat($.isNumeric(data.fifty_per)?data.fifty_per:0));//50대 비율
							tempData.push(parseFloat($.isNumeric(data.sixty_per)?data.sixty_per:0));//60대 비율
							tempData.push(parseFloat($.isNumeric(data.seventy_more_than_per)?data.seventy_more_than_per:0));//70대 이상 비율
							series.push({
								"name": data.adm_nm,
								"data": tempData
							});
						};
						$.each(res.result,function(cnt,node){
							if(isSido){
								if(node.adm_cd==adm_cd.substring(0,2)){
									setData(node);
									return false;
								}
							}else{
								setData(node);
							}
						});
						$highchartApi.categoryChart(chartArea,"column",$(window).width(),getChartHeight(),null,series,categories,0,"%");
					}else if(res.errCd=="-100"){
						setEmptyChartText(chartArea,chartHeight);
					}
					abs.onBlockUIClose();
				}
			});
		}
	}
	/**
	 * @name         : houseChart
	 * @description  : 주택종류 차트
	 * @date         : 2016. 07. 01.
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param isSido : 시도 코드인지 유무 
	 * @param adm_cd : 행정동 코드 
	 */
	function houseChart(isSido,adm_cd){
		var chartArea = "#databoard-box .TabArea:eq(1)>.chart";
		if(!$(chartArea).highcharts()){
			var abs = new sop.portal.absAPI();
			abs.onBlockUIPopup();
			$house.ui.map.censusApi.setStatsMapAdmCdCensusData("API_0604",{
				"adm_cd" : adm_cd,
				"onlyGetData" : true,
				"callback" : function(res){
					var chartHeight = $("#databoard-area").height()-dataAreaSize;
					if(res.errCd=="0"){
						var series = [];
						var categories = ['아파트', '연립/다세대', '단독주택', '기타'];
						var setData = function(data){
							var tempData = new Array();
							tempData.push(parseFloat($.isNumeric(data.apart_per)?data.apart_per:0));//아파트-  비율
							tempData.push(parseFloat($.isNumeric(data.row_house_per)?data.row_house_per:0));//연립/다세대 - 비율
							tempData.push(parseFloat($.isNumeric(data.detach_house_per)?data.detach_house_per:0));//단독주택 - 비율
							tempData.push(parseFloat($.isNumeric(data.etc_per)?data.etc_per:0));//기타 - 비율
							series.push({
								"name": data.adm_nm,
								"data": tempData
							});
						};
						$.each(res.result,function(cnt,node){
							if(isSido){
								if(node.adm_cd==adm_cd.substring(0,2)){
									setData(node);
									return false;
								}
							}else{
								setData(node);
							}
						});
						$highchartApi.categoryChart(chartArea,"column",$(window).width(),getChartHeight(),null,series,categories,0,"%");
					}else if(res.errCd=="-100"){
						setEmptyChartText(chartArea,chartHeight);
					}
					abs.onBlockUIClose();
					return false;
				}
			});
		}
	}
	/**
	 * @name         : companyChart
	 * @description  : 사업체 수 차트
	 * @date         : 2016. 07. 01.
	 * @author	     : 나광흠
	 * @history 	 :
	 */
	function companyChart(){
		if(!$("#databoard-box .TabArea:eq(2)>.chart").highcharts()){
			var abs = new sop.portal.absAPI();
			abs.onBlockUIPopup();
			var adm_cd = $house.search.activeAdmCd;
			var series = [];
			var categories = ['종사자 수;명', '사업체 수;개'];
			var setListData = function(adm_cd){
				$.ajax({
					url : openApiPath+"/OpenAPI3/stats/population.json",
					type:"GET",
					data: {
						accessToken : accessToken,
						year : companyDataYear,
						bnd_year : $house.ui.map.bnd_year,
						adm_cd : adm_cd
					},
					async: false,
					dataType:"json",
					success: function(res){
						if(res.errCd=="0"){
							var tempData = new Array();
							tempData.push(parseFloat($.isNumeric(res.result[0].employee_cnt)?res.result[0].employee_cnt:0));
							tempData.push(parseFloat($.isNumeric(res.result[0].corp_cnt)?res.result[0].corp_cnt:0));
							series.push({
								"originalName": res.result[0].adm_nm,
								"name": res.result[0].adm_nm,
								"data": tempData
							});
						}
					},
					error: function(data){
						messageAlert.open("알림",errorMessage);
						return false;
					}
				});
			};
			accessTokenInfo(function(){
				if(adm_cd.length>=7){
					setListData(adm_cd.substring(0,7));
				}
				if(adm_cd.length>=5){
					setListData(adm_cd.substring(0,5));
				}
				if(adm_cd.length>=2){
					setListData(adm_cd.substring(0,2));
				}
				for(var i = series.length-2 ;i>=0;i--){
					series[i].name = series[i].name.replace(series[i+1].originalName,"");
				}
				$("#databoard-box .TabArea:eq(2)>.origin_txt").text("출처 : "+companyDataYear+" 전국사업체조사");
				$highchartApi.categoryChart("#databoard-box .TabArea:eq(2)>.chart","column",$(window).width(),$("#databoard-area").height()-dataAreaSize,null,series,categories,0,null);
				abs.onBlockUIClose();
			});
		}
	}
	/**
	 * @name          : getFirstSggCd
	 * @description   : 해당 시도의 첫번째 시군구 받기
	 * @date          : 2016. 07. 05.
	 * @author	      : 나광흠
	 * @history 	  :
	 * @param sido_cd : 시도코드
	 */
	function getFirstSggCd(sido_cd){
		var sggCd = null;
		if(sido_cd&&sido_cd.length==2){
			$.ajax({
				method: "GET",
				async: false,
				url: openApiPath + "/OpenAPI3/addr/stage.json",
				data: {
					accessToken:accessToken,
					cd: sido_cd,
					pg_yn: "0"
				},
				dataType: "json",
				success: function(res) {
					if(res.errCd=="0"&&res.result.length>0){
						sggCd = res.result[0].cd;
					}
				},
				error: function(e) {}
			});
		}
		return sggCd;
	}
	/**
	 * @name          : getChartHeight
	 * @description   : 차트 높이 구하기
	 * @date          : 2016. 07. 05.
	 * @author	      : 나광흠
	 * @history 	  :
	 * @param sido_cd : 시도코드
	 */
	function getChartHeight(){
		var chartHeight = $("#databoard-area").height()-dataAreaSize;
		if(chartHeight<200){
			chartHeight = $(window).height();
		}
		return chartHeight;
	}
	/**
	 * @name              : setEmptyChartText
	 * @description       : 값이 없을때 문구 셋팅
	 * @date              : 2016. 08. 01.
	 * @author	          : 나광흠
	 * @history 	      :
	 * @param chartArea   : chart selector
	 * @param chartHeight : chart 높이
	 */
	function setEmptyChartText(chartArea,chartHeight){
		if($(chartArea).highcharts()){
			$(chartArea).highcharts().destroy();
		}
		$(chartArea).empty().append($("<div/>",{style:"height:"+chartHeight+"px;","class":"empty-box"}).append($("<div/>",{text:"데이터가 존재하지 않습니다"})));
	}
}(window, document));
