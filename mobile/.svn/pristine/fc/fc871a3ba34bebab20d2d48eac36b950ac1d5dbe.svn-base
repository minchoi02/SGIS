(function(W, D) {
	$(document).ready(function(){
		$biz.databoard.event.setUIEvent();
	});
	W.$biz = W.$biz || {};
	$biz.databoard = {
		currentStateSido : {
			rankData : null
		},
		currentStateSgg : {
			infoData : null,
			rankData : null
		},
	};
	$biz.databoard.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 06. 30. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			this.currentStateSido();
			this.currentStateSgg();
			this.changeBusiness();
			this.proposedSite.common();
		},
		currentStateSido:function(){
			//탭 이벤트
			$("#current-state-sido-databoard nav a").click(function(){
				$("#current-state-sido-databoard nav a").removeClass("M_on");
				$(this).addClass("M_on")
				if($(this).data("type")=="bar"){
					$("#current-state-sido-databoard .sub-tab a:first").trigger("click");
				}else{
					$("#current-state-sido-databoard .chart-tab a:first").trigger("click");
				}
				$("#current-state-sido-databoard div[data-type]").hide();
				$("#current-state-sido-databoard div[data-type="+$(this).data("type")+"]").show();
				$("#current-state-sido-databoard").show();
			});
			//서브 탭 이벤트
			$("#current-state-sido-databoard .sub-tab a").click(function(){
				$(this).parent().find("a").removeClass("M_on");
				$(this).addClass("M_on");
				var chartTab = $(this).parents(".data-box").find(".chart-tab");
				if(chartTab.find("a").length>0){
					chartTab.find("a").trigger("click");
				}else if(chartTab.find("input:radio").length>0){
					$biz.api.rank("sido",{"sido_cd":$biz.search.currentState.adm_cd},function(res){
						$biz.databoard.currentStateSido.rankData = res;
						chartTab.find("input:radio:first").prop("checked",true).trigger("change");
					});
				}
			});
			//차트 탭 이벤트
			$("#current-state-sido-databoard .chart-tab a").click(function(){
				$(this).parent().find("a").removeClass("M_on");
				$(this).addClass("M_on");
				if($(this).data("type")=="sidotobinfo"){
					function getChartData(result){
						console.log(result)
						return [{
							name : "음식점",
							y : parseFloat(result.rstrt_per)
						},{
							name : "서비스",
							y : parseFloat(result.srv_per)
						},{
							name : "도소매",
							y : parseFloat(result.whrtlsal_per)
						},{
							name : "숙박업",
							y : parseFloat(result.lodgebiz_per)
						}];
					}
					var chartSize = ($(window).width()/2)-2;
					$biz.api.info("sido",{"sido_cd":$biz.search.currentState.adm_cd},function(res){
						$(".data-location").text(res.result.sido_nm);
						$(".data-year").text(" (2014)");
						var element = "#current-state-sido-databoard .data-box:first .sido-chart";
						$highchartApi.pieChart(element,$(element).width()-2,$(element).width()-2,"사업체 비율","%",getChartData(res.result),true,false);
					});
					$biz.api.info("sido",{"sido_cd":"00"},function(res){
						var element = "#current-state-sido-databoard .data-box:first .country-chart";
						$highchartApi.pieChart(element,$(element).width()-2,$(element).width()-2,"사업체 비율","%",getChartData(res.result),true,false);
					});
				}else if($(this).data("type")=="sidotobgroup"){
					function getChartData(result){
						var temp = [];
						$.each(result,function(cnt,node){
							temp.push({name:node.s_theme_cd_nm,y:parseFloat(node.corp_per)});
						});
						return temp;
					}
					$biz.api.group("sido",{"sido_cd":$biz.search.currentState.adm_cd,"theme_cd":$(this).data("theme")},function(res){
						var element = "#current-state-sido-databoard .data-box:first .sido-chart";
						$highchartApi.pieChart(element,$(element).width()-2,$(element).width()-2,"사업체 비율","%",getChartData(res.result.group_attribute),false,true);
					});
					$biz.api.group("sido",{"sido_cd":"00","theme_cd":$(this).data("theme")},function(res){
						var element = "#current-state-sido-databoard .data-box:first .country-chart";
						$highchartApi.pieChart(element,$(element).width()-2,$(element).width()-2,"사업체 비율","%",getChartData(res.result.group_attribute),false,true);
					});
				}
			});
			//차트 라디오 이벤트
			$("#current-state-sido-databoard .chart-tab input:radio").change(function(){
				var data = [];
				var dataType = $(this).val();
				$.each($biz.databoard.currentStateSido.rankData.result.tob_rank,function(cnt,node){
					data.push({name:node.theme_nm,y:parseFloat(node[$("#current-state-sido-databoard .sub-tab>a.M_on").data("type")+"_"+dataType])});
				});
				$highchartApi.chart("#current-state-sido-databoard .data-box[data-type=bar] .chart-area","bar",$(window).width(), $biz.databoard.currentStateSido.rankData.result.tob_rank.length*40, 10, "", $(this).data("unit"), data.sort(dynamicSort("-y",true)),  true, true, []);
			});
		},
		currentStateSgg:function(){
			//탭 이벤트
			$("#current-state-sgg-databoard nav a").click(function(){
				$("#current-state-sgg-databoard nav a").removeClass("M_on");
				$(this).addClass("M_on")
				$("#current-state-sgg-databoard").show();
				$("#current-state-sgg-databoard .select-box-area ul").hide();

				var themeCdVal = $("input[name=theme_current-state]:checked").val();
				
				//$("#current-state-sgg-databoard .select-box-area ul:eq("+$(this).index()+")").show().find("a:first").trigger("click");
				$("#current-state-sgg-databoard .select-box-area ul:eq("+$(this).index()+")").show().find("a[data-theme=" + themeCdVal + "]").trigger("click");
			});
			//서브 탭 이벤트
			$("#current-state-sgg-databoard .select-box-area a").click(function(){
				$(this).parents("ul").find("a").removeClass("M_on");
				$(this).addClass("M_on");
				var theme_cd = $(this).data("theme");
				$biz.api.info("sgg",{"sgg_cd":$biz.search.currentState.adm_cd,"theme_cd":theme_cd},function(info){
					$biz.databoard.currentStateSgg.infoData = info;
					$biz.api.rank("sgg",{"sgg_cd":$biz.search.currentState.adm_cd,"theme_cd":theme_cd},function(res){
						$biz.databoard.currentStateSgg.rankData = res;
						$("#current-state-sgg-databoard .chart-tab a:first").trigger("click");
					});
				});
			});
			//차트 보여줄 실제 이벤트
			$("#current-state-sgg-databoard .chart-tab a").click(function(){
				$("#current-state-sgg-databoard .chart-tab a").removeClass("M_on");
				$(this).addClass("M_on");
				var aTag = $(this);
				$("#current-state-sgg-databoard .data-location").text($biz.databoard.currentStateSgg.infoData.result.sido_nm + " " + $biz.databoard.currentStateSgg.infoData.result.sgg_nm);
				$("#current-state-sgg-databoard .theme-info").text($biz.databoard.currentStateSgg.rankData.result.s_theme_cd_nm+" "+aTag.text()+" : "+$biz.databoard.currentStateSgg.infoData.result[aTag.data("type")]+aTag.data("unit")+(aTag.data("append-text")?aTag.data("append-text"):""));
				$("#current-state-sgg-databoard .data-location-sgg-count").text(" "+$biz.databoard.currentStateSgg.rankData.result.sgg_info.length);
				
				var data = [];
				var sgg_cd = $biz.search.currentState.adm_cd.substring(2,5);
				$.each($biz.databoard.currentStateSgg.rankData.result.sgg_info,function(cnt,node){
					var chart = {name:node.sgg_nm,y:parseFloat(node[aTag.data("type")]),sgg_cd:node.sgg_cd};
					if(node.sgg_cd==sgg_cd){
						chart.color = "#fe5800";
					}
					data.push(chart);
				});
				if($("#current-state-sgg-databoard .chart-area").highcharts()){
					$("#current-state-sgg-databoard .chart-area").highcharts().destroy();
				}
				var series = data.sort(dynamicSort("-y",true));
				$.each(series,function(cnt,node){
					if(node.sgg_cd==sgg_cd){
						$("#current-state-sgg-databoard .rank").text(cnt+1);
						return false;
					}
				});
				$highchartApi.chart("#current-state-sgg-databoard .chart-area","bar",$(window).width(), $biz.databoard.currentStateSgg.rankData.result.sgg_info.length*40, 10, "", aTag.data("unit"), series,  true, true, []);
			});
		},
		changeBusiness:function(){
			//탭 이벤트
			$("#change-business-databoard nav a").click(function(){
				$("#change-business-databoard .select-box-area ul:eq("+$(this).index()+")").show().find("a:first").trigger("click");
			});
			$("#change-business-databoard .select-box-area a").click(function(){
				$("#change-business-databoard").show();
				$("#change-business-databoard .select-box-area ul").hide();
				$("#change-business-databoard nav a").removeClass("M_on");
				$("#change-business-databoard .select-box-area a").removeClass("M_on");
				$("#change-business-databoard nav a:eq("+$(this).parents("ul").index()+")").addClass("M_on");
				$("#change-business-databoard .select-box-area ul:eq("+$(this).parents("ul").index()+")").show();
				$(".data-location").text($biz.search.changeBusiness.adm_nm);
				$(this).addClass("M_on");
				if($("#change-business-databoard .chart-area").highcharts()){
					$("#change-business-databoard .chart-area").highcharts().destroy();
				}
				var abs = new sop.portal.absAPI();
				abs.onBlockUIPopup();
				$biz.api.poiCompanyTimeSeries({
					"adm_cd":$biz.search.changeBusiness.adm_cd,
					"year":$biz.ui.map.bnd_year,
					"theme_cd":$(this).data("theme")
				},function(res){
					console.log(res);
					var data = [];
					$.each(res.result.companyList,function(cnt,node){
						data.push({name:node.base_year,y:parseFloat(node.cnt)});
					});
					$highchartApi.chart("#change-business-databoard .chart-area","column",$(window).width(), res.result.companyList.length*40, 10, "", "개", data.sort(dynamicSort("name",true)),  true, true, []);
					abs.onBlockUIClose();
				});
			});
		},
		proposedSite : {
			common : function(){
				//상위 탭 이벤트
				$("#proposed-site-databoard nav a").click(function(){
					$("#proposed-site-databoard nav a").removeClass("M_on");
					$(this).addClass("M_on");
					$("#proposed-site-databoard>.DetailBox>.chart-box").hide();
					var chartSelector = "#proposed-site-databoard>.DetailBox>.chart-box:eq("+$(this).index()+")";
					$(chartSelector).show();
					if($(this).index()==1){
						$biz.api.allCompanyPplHouse({"adm_cd":$biz.search.proposedSite.census_adm_cd },function(res){
							if(res.errCd=="0"){
								$("#proposed-site-databoard .areaInfoTab a:eq(0) span").text(appendCommaToNumber(res.result.corp_cnt) + "(개)");
								$("#proposed-site-databoard .areaInfoTab a:eq(1) span").text(appendCommaToNumber(res.result.ppltn_cnt) + "(명)");
								$("#proposed-site-databoard .areaInfoTab a:eq(2) span").text(appendCommaToNumber(res.result.family_cnt) + "(가구)");
								$("#proposed-site-databoard .areaInfoTab a:eq(3) span").text(appendCommaToNumber(res.result.resid_cnt) + "(호)");
							}
						});
						$("#proposed-site-databoard .areaInfoTab a:first").trigger("click");
					}else{
						var abs = new sop.portal.absAPI();
						abs.onBlockUIPopup();
						$biz.api.regiontotal({"adm_cd":$biz.search.proposedSite.census_adm_cd },function(res){
							if(res.errCd == "0") {
								var series = [];
								var categories = ['거주인구','직장인구비율','공시지가','1인가구','65세이상인구','20대인구'];
								$.each(res.result,function(cnt,node){
									var data = [];
									data.push(node.resid_ppltn_per?parseFloat(node.resid_ppltn_per):0); //거주인구비율
									data.push(node.job_ppltn_per?parseFloat(node.job_ppltn_per):0); //직장인구비율
									data.push(node.apart_per?parseFloat(node.apart_per):0); //공시지가
									data.push(node.one_person_family_per?parseFloat(node.one_person_family_per):0); //1인가구
									data.push(node.sixty_five_more_ppltn_per?parseFloat(node.sixty_five_more_ppltn_per):0); //65세이상인구비율
									data.push(node.twenty_ppltn_per?parseFloat(node.twenty_ppltn_per):0); //20대인구

									series.push({
										"name": node.adm_nm,
										"data": data,
										"pointPlacement": "on"
									});
								});
								$highchartApi.spiderwebChart(chartSelector+" .chart-area",$(window).width(),$(window).width(),series,categories,true,0);
								abs.onBlockUIClose();
							}
						});
					}
					$("#proposed-site-databoard").show();
				});
				this.locationStatus.common();
			},
			//지역 종합현황정보 보기
			locationStatus : {
				common : function(){
					$("#proposed-site-databoard .areaInfoTab a").click(function(){
						$("#proposed-site-databoard .areaInfoTab a").removeClass("on");
						$(this).addClass("on");
						$("#proposed-site-databoard .tab-box").hide();
						var box = $("#proposed-site-databoard .tab-box:eq("+$(this).parent("li").index()+")").show();
						box.show();
						box.find(".sub-tab>a:first").trigger("click");
					});
					this.company();
					this.population();
					this.household();
					this.house();
				},
				//총사업체
				company : function(){
					//총사업체의 첫번째 분류 탭 이벤트
					$("#total-company-sub-tab a").click(function(){
						if($("#total-company .chart-area").highcharts()){
							$("#total-company .chart-area").highcharts().destroy();
						}
						$("#total-company-sub-tab a").removeClass("on");
						$(this).addClass("on");
						if($(this).index()==1){
							$("#total-company .select-box-area,#total-company .bizCateMenu").show();
						}else{
							$("#total-company .select-box-area").hide();
						}
						if($(this).index()==2){
							$("#total-company .bizCateMenu").hide();
							var abs = new sop.portal.absAPI();
							abs.onBlockUIPopup();
							$biz.api.mainFacilityList({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if (res.errCd == "0") {
									var categories = ["교육시설","공공기관","금융시설","의료시설","대중교통","방범/방재","백화점/중대형마트","편의점","극장/영화관","도서관/박물관"];
									var series = [];
									for(var i=1;i<=10;i++){
										series.push({
											name:categories[i-1],
											y:parseFloat(res.result.themeInfo["theme_sum_"+fillText(i,2,"0")])
										});
									}
									var chartHeight = categories.length * 20;
									if (chartHeight < $(window).height()) {
										chartHeight = $(window).height();
									}
									$highchartApi.chart("#total-company .chart-area","bar",$(window).width(), chartHeight, null, "", "개", series,  true, true, []);
									abs.onBlockUIClose();
								}
							});
						}else{
							$("#total-company .bizCateMenu").show();
							$("#total-company .bizCateMenu a:first").trigger("click");
						}
					});
					//테마 분류 선택시 이벤트
					$("#total-company .bizCateMenu a").click(function(){
						$("#total-company .bizCateMenu a").removeClass("on");
						$(this).addClass("on");
						$("#total-company .select-box-area>ul").hide();
						$("#total-company .select-box-area>ul:eq("+$(this).index()+")").show();
						if($("#total-company-sub-tab a.on").index()==1){
							$("#total-company .select-box-area>ul:eq("+$(this).index()+") a:first").trigger("click");
						}else{
							if($("#total-company .chart-area").highcharts()){
								$("#total-company .chart-area").highcharts().destroy();
							}
							var abs = new sop.portal.absAPI();
							abs.onBlockUIPopup();
							$biz.api.corpdistsummary({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if(res.errCd=="0"){
									var themeCdList = [];
									var series = [];
									var categories = [];
									$.each(res.result,function(){
										$.each(this.theme_list,function(cnt,node){
											if(node.theme_cd.substring(0,2)==$("#total-company .bizCateMenu a.on").data("theme-index")){
												if(themeCdList.indexOf(node.theme_cd)==-1){
													themeCdList.push(node.theme_cd);
													categories.push(node.s_theme_cd_nm);
												}
											}
										});
									});
									$.each(res.result,function(){
										var data = [];
										$.each(this.theme_list,function(cnt,node){
											if(themeCdList.indexOf(node.theme_cd)>-1){
												var hasData = false;
												$.each(themeCdList,function(){
													if(node.theme_cd==this.toString()){
														hasData = true;
														data.push(parseFloat(node.dist_per));
														return false;
													}
												});
												if(!hasData){
													data.push(0);
												}
											}
										});
										series.push({
											"name": this.adm_nm,
											"data": data
										});
									});
									var chartHeight = categories.length * res.result.length * 15;
									if (chartHeight < $(window).height()) {
										chartHeight = $(window).height();
									}
									$highchartApi.categoryChart("#total-company .chart-area","bar",$(window).width(),chartHeight,10,series,categories,0,"%");
								}
								abs.onBlockUIClose();
							});
						}
					});
					//테마 선택 이벤트
					$("#total-company .select-box-area a").click(function(){
						var theme_cd = $(this).data("theme");
						$(this).parents("ul").find("a").removeClass("M_on");
						$(this).addClass("M_on");
						if($("#total-company .chart-area").highcharts()){
							$("#total-company .chart-area").highcharts().destroy();
						}
						var abs = new sop.portal.absAPI();
						abs.onBlockUIPopup();
						$biz.api.corpindecrease({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
							if(res.errCd=="0"){
								var series = [];
								$.each(res.result,function(rootCnt,rootNode){
									$.each(rootNode.theme_list,function(cnt,node){
										if(node.theme_cd==theme_cd&&rootNode.year>2005){
											node.year
											series.push({
												name:rootNode.year,
												y:(node.corp_cnt&&node.corp_cnt!="N/A"?parseFloat(node.corp_cnt):0)
											});
											return false;
										}
									});
								});
								$highchartApi.chart("#total-company .chart-area","line",$(window).width(), $(window).height(), null, "", "개", series,  true, true, [])
							}
							abs.onBlockUIClose();
						});
					});
				},
				//총인구
				population : function(){
					$("#total-population .chart-tab a").click(function(){
						$("#total-population .chart-tab a").removeClass("on");
						$(this).addClass("on");
						var abs = new sop.portal.absAPI();
						abs.onBlockUIPopup();
						if($("#total-population .chart-area").highcharts()){
							$("#total-population .chart-area").highcharts().destroy();
						}
						$("#total-population .chart-area").empty();
						if($(this).index()==0){
							$biz.api.pplsummary({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if(res.errCd=="0"){
									var series = [];
									var categories = ['10세 이하', '10대', '20대', '30대', '40대', '50대', '60대', '70세 이상'];
									$.each(res.result,function(cnt,node){
										var data = [];
										data.push(parseFloat(node.teenage_less_than_per)); //10대 미만 비율
										data.push(parseFloat(node.teenage_per)); //10대 비율
										data.push(parseFloat(node.twenty_per)); //20대 비율
										data.push(parseFloat(node.thirty_per)); //30대 비율
										data.push(parseFloat(node.forty_per)); //40대 비율
										data.push(parseFloat(node.fifty_per)); //50대 비율
										data.push(parseFloat(node.sixty_per)); //60대 비율
										data.push(parseFloat(node.seventy_more_than_per)); //70대 이상 비율
										
										series.push({
											"name": node.adm_nm,
											"data": data
										});
									});
									var chartHeight = categories.length * res.result.length * 25;
									if (chartHeight < $(window).height()) {
										chartHeight = $(window).height();
									}
									$highchartApi.categoryChart("#total-population .chart-area","bar",$(window).width(),chartHeight,10,series,categories,0,"%");
								}
								abs.onBlockUIClose();
							});
						}else if($(this).index()==1){
							$biz.api.mfratiosummary({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if(res.errCd=="0"){
									$.each(res.result,function(cnt,node){
										if(node.adm_cd==$biz.search.proposedSite.census_adm_cd){
											var id = "gender-pie-chart";
											$("#total-population .chart-area").append(
												$("<div/>",{"id":id,"class":"gender-chart"}),	
												$("<div/>",{"id":id+"-male","class":"gender-chart-value male","style":"top: 240px;"}).append($("<img/>",{"src":contextPath+"/resources/images/icon/icon_male.png"}),$("<br/>"),$("<span/>")),	
												$("<div/>",{"id":id+"-female","class":"gender-chart-value female","style":"top: 240px;"}).append($("<img/>",{"src":contextPath+"/resources/images/icon/icon_female.png"}),$("<br/>"),$("<span/>")),	
												$("<div/>",{"id":id+"-location","class":"gender-chart-map"}).append($("<span/>"))	
											);
											$highchartApi.genderPieChart("#"+id,node.adm_nm,node.m_ppl,parseFloat(node.m_per),node.f_ppl,parseFloat(node.f_per));
										}
									});
								}
								abs.onBlockUIClose();
							});
						}else{
							abs.onBlockUIClose();
						}
					});
				},
				//총가구
				household : function(){
					$("#total-household .chart-tab a").click(function(){
						$("#total-household .chart-tab a").removeClass("on");
						$(this).addClass("on");
						var abs = new sop.portal.absAPI();
						abs.onBlockUIPopup();
						if($("#total-household .chart-area").highcharts()){
							$("#total-household .chart-area").highcharts().destroy();
						}
						if($(this).index()==0){
							$biz.api.ocptnsummary({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if(res.errCd == "0") {
									var series = [];
									var categories = ['자가', '전세(월세없음)', '보증금 있는 월세'];
									$.each(res.result,function(cnt,node){
										var data = [];
										data.push(parseFloat(node.self_per)); //자가
										data.push(parseFloat(node.lease_per)); //전세(월세없음)
										data.push(parseFloat(node.mrp_per)); //보증금 있는 월세
										
										series.push({
											"name": node.adm_nm,
											"data": data
										});
									});
									var chartHeight = categories.length * res.result.length * 25;
									if (chartHeight < $(window).height()) {
										chartHeight = $(window).height();
									}
									$highchartApi.categoryChart("#total-household .chart-area","bar",$(window).width(),chartHeight,10,series,categories,0,"%");
								}
								abs.onBlockUIClose();
							});
						}else if($(this).index()==1){
							$biz.api.housesummary({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if(res.errCd == "0") {
									var series = [];
									var categories = ['아파트', '연립/다세대', '오피스텔', '단독주택', '기숙사및사회시설', '기타'];
									$.each(res.result,function(cnt,node){
										var data = [];
										data.push(parseFloat(node.apart_per)); //아파트-  비율
										data.push(parseFloat(node.row_house_per)); //연립/다세대 - 비율
										data.push(parseFloat(node.effi_apart_per)); //오피스텔 - 비율
										data.push(parseFloat(node.detach_house_per)); //단독주택 - 비율
										data.push(parseFloat(node.dom_soc_fac_per)); //기숙사 및 사회시설 - 비율
										data.push(parseFloat(node.etc_per)); //기타 - 비율
										
										series.push({
											"name": node.adm_nm,
											"data": data
										});
									});
									var chartHeight = categories.length * res.result.length * 25;
									if (chartHeight < $(window).height()) {
										chartHeight = $(window).height();
									}
									$highchartApi.categoryChart("#total-household .chart-area","bar",$(window).width(),chartHeight,10,series,categories,0,"%");
								}
								abs.onBlockUIClose();
							});
						}else{
							abs.onBlockUIClose();
						}
					});
				},
				//총주택
				house : function(){
					$("#total-house .sub-tab a").click(function(){
						$("#total-house .sub-tab a").removeClass("on");
						$(this).addClass("on");
						$("#total-house .radio_style").hide();
						$("#total-house .radio_style:eq("+$(this).index()+")").show();
						$("#total-house .radio_style:eq("+$(this).index()+") input:radio:first").prop("checked",true).trigger("change");
					});
					$("#total-house .radio_style input:radio").change(function(){
						if($("#total-house .chart-area").highcharts()){
							$("#total-house .chart-area").highcharts().destroy();
						}
						var abs = new sop.portal.absAPI();
						abs.onBlockUIPopup();
						if($("#total-house .chart-tab").index($(this).parents(".chart-tab"))==0){
							$biz.api.houseprice({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if(res.errCd == "0") {
									var categories = [];
									var maxData = [];
									var minData = [];
									$.each(res.result,function(cnt,node){
										var radio = $("input:radio[name=price-radio]:checked").val();
										if (radio == "apt") { //아파트
											maxData.push(parseFloat(node.apart_highest_price));
											minData.push(parseFloat(node.apart_lowest_price));
										} else if (radio == "villa") { //다세대/연립
											maxData.push(parseFloat(node.row_multi_house_highest_price));
											minData.push(parseFloat(node.row_multi_house_lowest_price));
										} else if (radio == "house") { //단독주택
											maxData.push(parseFloat(node.single_highest_price));
											minData.push(parseFloat(node.single_lowest_price));
										}
										if (node.year_month != undefined && node.year_month.length >= 6) {
											var tmpDate = node.year_month;
											var year = tmpDate.substring(0, 4);
											var month = tmpDate.substring(4, 6);
											var date = year + "." + month;
											categories.push(date);
										}
									});
									$highchartApi.categoryChart("#total-house .chart-area","line",$(window).width(),$(window).height(),10,[{
										name: '최고가',
										data: maxData
									}, {
										name: '최저가',
										data: minData
									}],categories,0,"만원",[0,parseInt((categories.length-1)/2),categories.length-1]);
									$("#total-house .chart-area").highcharts().yAxis[0].update({min:0});
									abs.onBlockUIClose();
								}
							});
						}else if($("#total-house .chart-tab").index($(this).parents(".chart-tab"))==1){
							$biz.api.housevolume({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if(res.errCd == "0") {
									var categories = [];
									var dealData = [];
									var leaseData = [];
									$.each(res.result,function(cnt,node){
										var radio = $("input:radio[name=trade-radio]:checked").val();
										if (radio == "apt") { //아파트
											dealData.push(parseInt(node.apart_deal_volume));
											leaseData.push(parseInt(node.apart_lease_volume));
										} else if (radio == "villa") { //다세대/연립
											dealData.push(parseInt(node.row_multi_dealvolume));
											leaseData.push(parseInt(node.row_multi_leasevolume));
										} else if (radio == "house") { //단독주택
											dealData.push(parseInt(node.single_deal_volume));
											leaseData.push(parseInt(node.single_lease_volume));
										}
										if (node.year_month != undefined && node.year_month.length >= 6) {
											var tmpDate = node.year_month;
											var year = tmpDate.substring(0, 4);
											var month = tmpDate.substring(4, 6);
											var date = year + "." + month;
											categories.push(date);
										}
									});
									$highchartApi.categoryChart("#total-house .chart-area","line",$(window).width(),$(window).height(),10,[{
										name: '매매',
										data: dealData
									}, {
										name: '전세',
										data: leaseData
									}],categories,0,"건",[0,parseInt((categories.length-1)/2),categories.length-1]);
									$("#total-house .chart-area").highcharts().yAxis[0].update({min:0});
									abs.onBlockUIClose();
								}
							});
						}else if($("#total-house .chart-tab").index($(this).parents(".chart-tab"))==2){
							$biz.api.housepnilp({"adm_cd":$biz.search.proposedSite.census_adm_cd},function(res){
								if (res.errCd == "0") {
									var series = [];
									if ($("input:radio[name=house-radio]:checked").val() == "house") { //주거용
										series.push({
											name:"단독주택",
											y:parseFloat(res.result[0].single_price)
										});
										series.push({
											name:"연립/다세대",
											y:parseFloat(res.result[0].rmhouse_price)
										});
										series.push({
											name:"아파트",
											y:parseFloat(res.result[0].apt_price)
										});
					        		}else if($("input:radio[name=house-radio]:checked").val() == "industry"){ //산업용
					        			series.push({
					        				name:"상업",
											y:parseFloat(res.result[0].cmrc_price)
										});
					        			series.push({
					        				name:"업무",
					        				y:parseFloat(res.result[0].job_price)
					        			});
					        			series.push({
					        				name:"주상복합",
					        				y:parseFloat(res.result[0].rccomplex_price)
					        			});
					        		}else{
					        			return false;
					        		}
									var chartHeight = series.length * 20;
									if (chartHeight < $(window).height()) {
										chartHeight = $(window).height();
									}
									$highchartApi.chart("#total-house .chart-area","bar",$(window).width(), chartHeight, null, "", "원/㎡", series,  true, true, []);
									abs.onBlockUIClose();
								}
							});
						}else{
							abs.onBlockUIClose();
						}
						
					});
				}
			}
		}
	}
}(window, document));
