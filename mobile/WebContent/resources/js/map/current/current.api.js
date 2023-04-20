(function(W, D) {
	var width = $(window).width();
	var chageWidthDoit;
	$(window).resize(function(){
		clearTimeout(chageWidthDoit);
		chageWidthDoit = setTimeout(function(){
			if(width!=$(this).width()){
				width = $(this).width();
				if($("#areainfo-1>.chart").highcharts()){
					$("#areainfo-1>.chart").highcharts().setSize(width , width, false);
				}
				if($("#areainfo-2>.chart:eq(0)").highcharts()){
					$("#areainfo-2-age").highcharts().setSize(width , $("#areainfo-2-age").highcharts().containerHeight, false);
				}
				if($("#areainfo-3>.chart").highcharts()){
					$("#areainfo-3>.chart").highcharts().setSize(width , $("#areainfo-3>.chart").highcharts().containerHeight, false);
				}
				if($("#areainfo-4-ratio").highcharts()){
					
					$("#areainfo-4-ratio").css("height", $(window).height()-250);
					$("#areainfo-4-ratio").highcharts().setSize(width , $("#areainfo-4-ratio").highcharts().containerHeight, false);
				}
				if($("#areainfo-4-incdec>.chart").highcharts()){
					$("#areainfo-4-incdec>.chart").highcharts().setSize(width , $("#areainfo-4-incdec>.chart").highcharts().containerHeight, false);
				}
				if($("#areainfo-5>.chart:eq(0)").highcharts()){
					$("#areainfo-5>.chart:eq(0)").highcharts().setSize(width , $("#areainfo-5>.chart:eq(0)").highcharts().containerHeight, false);
				}
				if($("#areainfo-5>.chart:eq(1)").highcharts()){
					$("#areainfo-5>.chart:eq(1)").highcharts().setSize(width , $("#areainfo-5>.chart:eq(1)").highcharts().containerHeight, false);
				}
			}
		}, 500);
	});
	W.$current = W.$current || {};
	$current.api = {
		swiper : null,//swiper object
		/**
		 * @name         : setChart
		 * @description  : 차트 설정
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setChart : function(index){
			$current.ui.map.poi.removePoi();
			$(".MapTitle").hide();
			$(".sop-top.sop-left,.sop-top.sop-right").css("margin-top","");
			if(index==1){
				$current.api.setRegiontotal();
				$(".TitleText").html("지역정보현황");
				$(".MapTitle").show();
			}else if(index==2){
				$("div[id^=areainfo-2-]").hide();
				$("#areainfo-2-"+$("input[name=population-radio]:checked").val()).show();
				if($("input[name=population-radio]:checked").val()=="age"){
					$current.api.setPplsummary();
					$(".TitleText").text("연령별 인구비율(%)");
					$(".MapTitle").show();
				}else{
					$current.api.setMfratiosummary();
					$(".TitleText").html("성별 인구비율");
					$(".MapTitle").show();
				}
			}else if(index==3){
				$current.api.setHousesummary();
				$(".TitleText").text("거처 유형별 주택비율(%)");
				$(".MapTitle").show();
			}else if(index==4){
				$("div[id^=areainfo-4-]").hide();
				$("#areainfo-4-"+$("input[name=business-radio]:checked").val()).show();
				$(".sop-top.sop-left,.sop-top.sop-right").css("margin-top","30px");
				$(".MapTitle").show();
				$(window).scroll(function(){
					if (200 < $(window).scrollTop()) {
						$(".MapTitle1").show();
				    }else{
				    	$(".MapTitle1").hide();
				    }
				});
				if($("input[name=business-radio]:checked").val()=="ratio"){
					$current.api.setCorpdistsummary();
					$(".TitleText").text("소상공인 업종별 사업체 비율(%)");
				}else if($("input[name=business-radio]:checked").val()=="incdec"){
					if(!this.swiper){
						this.swiper = new Swiper("#incDecSwiper", {
							scrollbar: '#businessDivIncDecScrollbar',
							nextButton: '#businessDivIncNext',
							prevButton: '#businessDivIncPrev',
							scrollbarHide: true,
							centeredSlides: false,
							slidesPerView: 3,
							spaceBetween: 75,
							grabCursor: true
						});
						$("#incDecSwiper div.swiper-slide").click(function(){
							$("#incDecSwiper div.swiper-slide").removeClass("swiper_m_on");
							$(this).addClass("swiper_m_on");
							corpindecreaseChart();
							$current.ui.map.poi.markers.clearLayers();
							$current.ui.map.poi.active = true;
							$current.ui.map.poi.theme_cd = $(this).data("theme-cd"); 
							$current.ui.map.poi.poiPanel.hide();
							$current.ui.map.poi.getThemePoi(0);
						});
					}
					$("#incDecSwiper div.swiper-slide").removeClass("swiper_m_on");
					$("#incDecSwiper div.swiper-slide:eq(0)").addClass("swiper_m_on");
					this.swiper.slideTo(0);
					corpindecreaseChart();
					$current.ui.map.poi.markers.clearLayers();
					$current.ui.map.poi.active = true;
					$current.ui.map.poi.theme_cd = $("#incDecSwiper div.swiper-slide:eq(0)").data("theme-cd"); 
					$current.ui.map.poi.poiPanel.hide();
					$current.ui.map.poi.getThemePoi(0);
					$(".TitleText").html("소상공인 업종별 증감(%)");
				}else{
					$(".TitleText").html("소상공인 주요시설물 현황(%)");
					$current.api.mainFacilityList();
				}
			}else if(index==5){
				if($("#house-price").hasClass("M_on")){
					$current.api.setHouseprice();
					$(".TitleText").html("㎡당 주택 거래가격 (만원)");
					$(".MapTitle").show();
				}else{
					$current.api.setHousevolume();
					$(".TitleText").html("주택 거래 동향(건)");
					$(".MapTitle").show();
				}
			}else if(index==0){
				
				var titText = "";
				
				titText = titText + v_showDataName;
				titText = titText + "(" + v_unit + ")";
				if(v_showDataName != "총사업체"){
//					titText = titText + "[출처 : 통계청, 인구주택총조사("+ $current.ui.map.bnd_year + ")";
					titText = titText + "[출처 : 통계청, 인구주택총조사("+ censusDataYear + ")";
				}else{
					// mng_s 2020. 02. 18 j.h.Seok 오류 수정
//					titText = titText + "[출처 : 통계청, 전국사업체조사(2016)";
					titText = titText + "[출처 : 통계청, 전국사업체조사("+ companyDataYear + ")";
					// mng_e 2020. 02. 18 j.h.Seok 오류 수정
				}
				
				
				
				$(".TitleText").html(titText);
				$(".MapTitle").show();
				
				
			}
		},
		/**
		 * @name         : setRegiontotal
		 * @description  : 지역종합차트
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setRegiontotal : function(){
			var obj = new sop.openApi.startupbiz.regiontotal.chart.api();
			obj.addParam("accessToken", accessToken);
			obj.addParam("adm_cd", $current.ui.map.getAdmCd());
			obj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/startupbiz/regiontotal.json"
			});
		},
		/**
		 * @name         : setPplsummary
		 * @description  : 인구 연령별 차트
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setPplsummary : function(){
			var obj = new sop.openApi.startupbiz.pplsummary.chart.api();
			obj.addParam("accessToken", accessToken);
			obj.addParam("adm_cd", $current.ui.map.getAdmCd());
			obj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/startupbiz/pplsummary.json"
			});
		},
		/**
		 * @name         : setMfratiosummary
		 * @description  : 인구 성별 차트
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setMfratiosummary : function(){
			var obj = new sop.openApi.startupbiz.mfratiosummary.chart.api();
			obj.addParam("accessToken", accessToken);
			var adm_cd = $current.ui.map.getAdmCd();
			obj.addParam("adm_cd", adm_cd);
			obj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/startupbiz/mfratiosummary.json",
				options : {
					"adm_cd" : adm_cd
				}
			});
		},
		/**
		 * @name         : setHousesummary
		 * @description  : 거처 차트
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setHousesummary : function(){
			var obj = new sop.openApi.startupbiz.housesummary.chart.api();
			obj.addParam("accessToken", accessToken);
			obj.addParam("adm_cd", $current.ui.map.getAdmCd());
			obj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/startupbiz/housesummary.json"
			});
		},
		/**
		 * @name         : setCorpdistsummary
		 * @description  : 사업체 업종별 비율 차트
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setCorpdistsummary : function(){
			var obj = new sop.openApi.startupbiz.corpdistsummary.chart.api();
			obj.addParam("accessToken", accessToken);
			obj.addParam("adm_cd", $current.ui.map.getAdmCd());
			obj.request({
				method: "GET",
				async: true,
				url: openApiPath + "/OpenAPI3/startupbiz/corpdistsummary.json"
			});
		},
		/**
		 * @name         : setHouseprice
		 * @description  : 주택동향 주택 거래가격 차트
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setHouseprice : function(){
			var obj = new sop.openApi.startupbiz.houseprice.chart.api();
			obj.addParam("adm_cd", $current.ui.map.getAdmCd());
			obj.request({
				method: "POST",
				async: true,
				url: sgisContextPath + "/ServiceAPI/bizStats/houseprice.json"
			});
		},
		/**
		 * @name         : setHousevolume
		 * @description  : 주택동향 주택 거래량 차트
		 * @date         : 2016. 07. 13. 
		 * @author	     : 김도형
		 * @history      :
		 */
		setHousevolume : function(){
			var obj = new sop.openApi.startupbiz.housevolume.chart.api();
			obj.addParam("adm_cd", $current.ui.map.getAdmCd());
			obj.request({
				method: "POST",
				async: true,
				url: sgisContextPath + "/ServiceAPI/bizStats/housevolume.json"
			});
		},
		/**
		 * @name         : mainFacilityList
		 * @description  : 주요시설물 현황 차트
		 * @date         : 2016. 10. 11.
		 * @author	     : 김도형
		 * @history      :
		 */
		mainFacilityList : function(){
			var sopPortalMainFacilityChartDrawObj = new sop.portal.mainFacilityChartDraw.api();
			sopPortalMainFacilityChartDrawObj.addParam("adm_cd", $current.ui.map.getAdmCd());
			sopPortalMainFacilityChartDrawObj.request({
		        method : "POST",
		        async : false,
		        url : sgisContextPath + "/ServiceAPI/bizStats/mainFacilityList.json"
		    });
		}
		
	};
	/**
	 * @name         : getHeaderHeight
	 * @description  : 헤더부분 높이값
	 * @date         : 2016. 07. 13. 
	 * @author	     : 김도형
	 * @history      :
	 */
	function getHeaderHeight(){
		return $(window).height()-$(".Header").outerHeight(true)-$(".Content>.Subject").outerHeight(true)-$(".Content>.SelectArea").outerHeight(true);
	}
	/**
	 * @name         : corpindecreaseChart
	 * @description  : 사업체 업종별 증감 차트
	 * @date         : 2016. 07. 13. 
	 * @author	     : 김도형
	 * @history      :
	 */
	function corpindecreaseChart(){
		var themeCdList = [];
		var adm_cd = $current.ui.curAdmCd;
		var series = [];
		var theme_cd = $("#incDecSwiper .swiper-slide.swiper_m_on").data("theme-cd");
		var theme_nm = null;
		var categories = [];
		var locationData = [];
		var setListData = function(adm_cd){
			$.ajax({
				url : openApiPath+"/OpenAPI3/startupbiz/corpindecrease.json",
				type:"GET",
				data: {
					accessToken : accessToken,
					adm_cd : adm_cd
				},
				async: false,
				dataType:"json",
				success: function(res){
					var thisData = {};
					var dataObject = {};
					$.each(res.result,function(rootCnt,rootNode){
						$.each(rootNode.theme_list,function(cnt,node){
							if(node.theme_cd==theme_cd){
								if(theme_nm==null){
									theme_nm = node.s_theme_cd_nm;
								}
								dataObject[rootNode.year] = (node.corp_cnt&&node.corp_cnt!="N/A"?parseFloat(node.corp_cnt):0); 
								return false;
							}
						});
						if(rootNode.year>2005){
							categories.push(rootNode.year);
						}
					});
					thisData[adm_cd] = dataObject;
					locationData.push(thisData);
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
			categories = categories.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
			W.locationData = locationData;
			$.each(locationData,function(locationCnt,locationNode){
				var data = [];
				$.map(categories,function(value,cnt){
					$.each(locationNode,function(cnt,node){
						var thisData = 0;
						if(node[value]!==undefined){
							thisData = parseFloat(node[value]);
							if(isNaN(thisData)){
								thisData = 0;
							}
						}
						data.push(thisData);
					});
				});
				var adm_cd = Object.keys(locationNode)[0];
				if(adm_cd.length>=7){
					series.push({
						"adm_cd":adm_cd,
						"name": $current.ui.map.curSidoNm+" "+$current.ui.map.curSggNm+" "+$current.ui.map.curEmdongNm,
						"data": data
					});
				}else{
					series.push({
						"adm_cd":adm_cd,
						"name": "시군구",
						"data": data
					});
				}
			});
			$.ajax({
				url : openApiPath+"/OpenAPI3/boundary/hadmarea.geojson",
				type:"GET",
				data: {
					accessToken : accessToken,
					adm_cd : adm_cd.substring(0,5),
					year : $current.ui.map.bnd_year,
					low_search : 0
				},
				async: true,
				dataType:"json",
				success: function(res){
					if(res.errCd=="0"){
						$.each(res.features,function(cnt,node){
							if(node.properties.adm_cd==adm_cd.substring(0,5)){
								$.each(series,function(){
									if(this.adm_cd.length==5){
										this.name = node.properties.adm_nm;
										return false;
									}
								});
								$highchartApi.categoryChart("#areainfo-4-incdec>.chart","line",$(window).width(),$(window).height()/2,null,series,categories,0,"%");
								$("#areainfo-4-incdec>.chart").highcharts().yAxis[0].update({min:0});
								return false;
							}
						});
					}
				},
				error: function(data){
					messageAlert.open("알림",errorMessage);
					return false;
				}
			});
		});
	}
	/*********** 지역종합 차트 시작 **********/
	(function() {
		$class("sop.openApi.startupbiz.regiontotal.chart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				$("#areainfo-1>.chart").empty();
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
					$highchartApi.spiderwebChart("#areainfo-1>.chart",$(window).width(),$(window).width(),series,categories,true,0);
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$current.api.setRegiontotal();
					});
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 지역종합 차트 종료 **********/
	/*********** 인구 연령별 차트 시작 **********/
	(function() {
		$class("sop.openApi.startupbiz.pplsummary.chart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				$("#areainfo-2>.chart:eq(0)").empty();
				if(res.errCd == "0") {
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
					var chartHeight = categories.length * res.result.length * 17;
					if (chartHeight < $(window).height()) {
						chartHeight = $(window).height() - 230;
					}
					$highchartApi.categoryChart("#areainfo-2>.chart:eq(0)","bar",$(window).width(),chartHeight,null,series,categories,0,"%");
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$current.api.setPplsummary();
					});
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 인구 연령별 차트 종료 **********/
	/*********** 인구 성별 차트 시작 **********/
	(function() {
		$class("sop.openApi.startupbiz.mfratiosummary.chart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res, options) {
				$("#gender-pie-chart,div[id^=gender-pie-chart] span").empty();
				if(res.errCd == "0") {
					$.each(res.result,function(cnt,node){
						var element = "#gender-pie-chart";
						if(node.adm_cd.length == 7){
							element+="1";
						}else if (node.adm_cd.length == 5) {
							element+="2";
						}else if (node.adm_cd.length == 2) {
							element+="3";
						}
						$highchartApi.genderPieChart(element,node.adm_nm,node.m_ppl,parseFloat(node.m_per),node.f_ppl,parseFloat(node.f_per));
					});
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$current.api.setPplsummary();
					});
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 인구 성별 차트 종료 **********/
	/*********** 거처 차트 시작 **********/
	(function() {
		$class("sop.openApi.startupbiz.housesummary.chart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				$("#areainfo-3>.chart").empty();
				if(res.errCd == "0") {
					var series = [];
					//2017.04.20 기숙사및사회시설제외
//					var categories = ['아파트', '연립/다세대', '오피스텔', '단독주택', '기숙사및사회시설', '기타'];
					var categories = ['아파트', '연립/다세대', '오피스텔', '단독주택', '기타'];
					$.each(res.result,function(cnt,node){
						var data = [];
						data.push(parseFloat(node.apart_per)); //아파트-  비율
						data.push(parseFloat(node.row_house_per)); //연립/다세대 - 비율
						data.push(parseFloat(node.officetel_per)); //오피스텔 - 비율
						data.push(parseFloat(node.detach_house_per)); //단독주택 - 비율
//						data.push(parseFloat(node.dom_soc_fac_per)); //기숙사 및 사회시설 - 비율
						data.push(parseFloat(node.etc_per)); //기타 - 비율
						
						series.push({
							"name": node.adm_nm,
							"data": data
						});
					});
					var chartHeight = categories.length * res.result.length * 17;
					if (chartHeight < $(window).height()) {
						chartHeight = $(window).height() - 230;
					}
				//	alert(chartHeight);
					$highchartApi.categoryChart("#areainfo-3>.chart","bar",$(window).width(),chartHeight,null,series,categories,0,"%");
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$current.api.setPplsummary();
					});
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 거처 차트 종료 **********/
	/*********** 사업체 업종별 비율 차트 시작 **********/
	(function() {
		$class("sop.openApi.startupbiz.corpdistsummary.chart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
				
				
				/* v_areainfo4_gubun
				
					1: 음식점
							한식, 중식, 일식, 분식, 서양식, 제과점, 패스트푸드, 치킨, 호프 및 간이주점, 카페, 기타 외국식
					2: 도소매
							문구점, 서점, 편의점, 식료품점, 휴대폰점, 의류, 화장품/방향제, 철물점, 주유소, 꽃집, 슈퍼마켓
					3: 서비스
							인테리어, 목욕탕, 교습학원,
				
				*/
				
				
				
				
				
				if(res.errCd == "0") {
					var themeCdList = [];
					var series = [];
					var categories = [];
					$.each(res.result,function(){
						$.each(this.theme_list,function(cnt,node){
							if(themeCdList.indexOf(node.theme_cd)==-1){
								//alert("node.theme_cd" + node.theme_cd + "<br /> node.theme_cd_nm : " + node.s_theme_cd_nm);
								
								if(node.theme_cd.substring(0, 1) == v_areainfo4_gubun){
									themeCdList.push(node.theme_cd);
									categories.push(node.s_theme_cd_nm);
								}
								
							}
						});
					});
					$.each(res.result,function(){
						var data = [];
						$.each(this.theme_list,function(cnt,node){
							var hasData = false;
							$.each(themeCdList,function(){
							//	if(node.theme_cd==this.toString()){
								if(node.theme_cd==this.toString()){
									hasData = true;
									data.push(parseFloat(node.dist_per));
									return false;
								}
							});
							if(!hasData){
							//	data.push(0);
							}
						});

						series.push({
							"name": this.adm_nm,
							"data": data
						});
					});
					
					
					var chartHeight = categories.length * res.result.length * 13;
					if (chartHeight < $(window).height()) {
						chartHeight = $(window).height() - 230;
					}
					$highchartApi.categoryChart("#areainfo-4-ratio","bar",$(window).width(),chartHeight,null,series,categories,0,"%");
					
					$("#highcharts-0").css("overflow", "auto");
					$("#highcharts-0").css("height", $(window).height() - 230);
					$("#highcharts-0").css("width", $(window).width() - 10);
					
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						$current.api.setCorpdistsummary();
					});
				}
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 사업체 업종별 비율 차트 종료 **********/
	W.$bizStatsDataBoardApi = W.$bizStatsDataBoardApi || {};
	$bizStatsDataBoardApi.Util = {
			
			/**
			 * @name         : leadingZeros
			 * @description  : 한자리 숫자를 01,02 로 고정 시켜 표현 두자리 숫자의 경우 그냥 표시
			 * @date         : 2015. 07. 226. 
			 * @author	     : 최재영
			 * @param		: n 변환할 수 , digits 변환할 자리수
			 */
			leadingZeros:function (n, digits) {
				  var zero = '';
				  n = n.toString();

				  if (n.length < digits) {
				    for (var i = 0; i < digits - n.length; i++)
				      zero += '0';
				  }
				  return zero + n;
			},
	};
	/*********** 사업체 주요시설물 현황 차트 시작 **********/
	(function() {
	    $class("sop.portal.mainFacilityChartDraw.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res) {
	        	if (res.errCd == "0") {
					var categories = ["교육시설","공공기관","금융시설","의료시설","방범/방재","백화점/중대형마트","편의점","극장/영화관","도서관/박물관"];
					var series = [];
						series.push({
							name:categories[0],
							y:parseFloat(res.result.themeInfo["theme_sum_01"])
						});
						series.push({
							name:categories[1],
							y:parseFloat(res.result.themeInfo["theme_sum_02"])
						});
						series.push({
							name:categories[2],
							y:parseFloat(res.result.themeInfo["theme_sum_03"])
						});
						series.push({
							name:categories[3],
							y:parseFloat(res.result.themeInfo["theme_sum_04"])
						});
						series.push({
							name:categories[4],
							y:parseFloat(res.result.themeInfo["theme_sum_06"])
						});
						series.push({
							name:categories[5],
							y:parseFloat(res.result.themeInfo["theme_sum_07"])
						});
						series.push({
							name:categories[6],
							y:parseFloat(res.result.themeInfo["theme_sum_08"])
						});
						series.push({
							name:categories[7],
							y:parseFloat(res.result.themeInfo["theme_sum_09"])
						});
						series.push({
							name:categories[8],
							y:parseFloat(res.result.themeInfo["theme_sum_10"])
						});
	        	
					var chartHeight = categories.length * 15;
					if (chartHeight < $(window).height()) {
						chartHeight = $(window).height() - 230;
					}
					$highchartApi.chart("#areainfo-4-facility>.chart","bar",$(window).width(), chartHeight, 20, "", "개", series,  true, true, []);
	        	} else {
	        		$("#areainfo-4-facility>.chart").html("");
	        	}
	        },
	        onFail : function(status) {
	        	$("#areainfo-4-facility>.chart").html("");
	        }
	    });
	}());
	/*********** 사업체 주요시설물 현황 차트 종료 **********/
	/*********** 주택동향 주택 거래가격 차트 시작 **********/
	(function() {
		$class("sop.openApi.startupbiz.houseprice.chart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
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
					var height = getHeaderHeight()-$("#house-price").outerHeight(true)-$("#areainfo-5 .radio_style:eq(0)").outerHeight(true)-200;
					$highchartApi.categoryChart("#areainfo-5 .chart:eq(0)","line",$(window).width(),height,null,[{
						name: '최고가',
						data: maxData
					}, {
						name: '최저가',
						data: minData
					}],categories,0,"만원",[0,parseInt((categories.length-1)/2),categories.length-1]);
				}
				$("#areainfo-5 .chart:eq(0)").highcharts().yAxis[0].update({min:0});
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 주택동향 주택 거래가격 차트 종료 **********/
	/*********** 주택동향 주택 거래량 차트 시작 **********/
	(function() {
		$class("sop.openApi.startupbiz.housevolume.chart.api").extend(sop.portal.absAPI).define({
			onSuccess: function(status, res) {
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
					var height = getHeaderHeight()-$("#house-price").outerHeight(true)-$("#areainfo-5 .radio_style:eq(1)").outerHeight(true)-200;
					$highchartApi.categoryChart("#areainfo-5 .chart:eq(1)","line",$(window).width(),height,null,[{
						name: '매매',
						data: dealData
					}, {
						name: '전세',
						data: leaseData
					}],categories,0,"건",[0,parseInt((categories.length-1)/2),categories.length-1]);
				}
				$("#areainfo-5 .chart:eq(1)").highcharts().yAxis[0].update({min:0});
			},
			onFail: function(status) {
				messageAlert.open("알림", errorMessage);
			}
		});
	}());
	/*********** 주택동향 주택 거래량 차트 종료 **********/
}(window, document));