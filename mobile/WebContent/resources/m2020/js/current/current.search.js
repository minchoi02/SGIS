(function(W, D) {
	$(function(){
			$("#map-navigator-emdong").change(function(){
			$currentMap.ui.map.mapNavigation.move();
			var title = $(".gnb h2").text();
			var parameter = $("#map-title>h3").text();
			var zoomLevel = $currentMap.ui.map.mapNavigation.zoom;
			var adm_nm = $("#map-navigator-sido option:selected").text() + " " + $("#map-navigator-sgg option:selected").text() + " " + $("#map-navigator-emdong option:selected").text();
			apiLogWrite2("L0", "L03", title, parameter, zoomLevel, adm_nm);
		});	
	});
	$currentMap.search = {
		lastChartIndx : null,
		chartDefaultColor : "#2951f2",
		activeChartColor : "#fe5800",
		/**
		 * @name             : addParameter
		 * @description      : api에 대한 선택 조건 파라미터 셋팅
		 * @date             : 2020. 07. 08. 
		 * @author	         : 곽제욱
		 * @history          :
		 * @param api_id     : api_id
		 * @param target     : 선택 조건 찾을 target jquery selector
		 * @param parameters : 파라미터 object
		 */
		addParameter : function(api_id,target,parameters){
			target.find("input[data-able]:checked").each(function(){
				var addParam = {};
				$("#"+$(this).data("able")).find("select,input:radio:checked,input:checkbox:checked").each(function(){
				//$(".gridheader_con on").each(function(){
					var name = $(this).attr("name").replace(api_id+"_","");
					if(addParam[name]){
						addParam[name] += ","+$(this).val();
					}else{
						addParam[name] = $(this).val();
					}
				});
				$.map(addParam,function(value,key){
					parameters[key] = value;
				});
			});
		},
				
		/**
		 * @name               : setArea
		 * @description        : barchart,table 영역 셋팅
		 * @date               : 2020. 07. 08. 
		 * @author	           : 곽제욱
		 * @history            :
		 * @param data         : data
		 * @param showData     : object에서 추출할 데이터이름
		 * @param showDataName : 데이터 이름
		 * @param unit         : 단위
		 */
		setArea : function(data,showData,showDataName,unit){
			//$("#chart-area>.chart,#table-value").empty();
			//$("#chart-area,#table-area").hide();
			//$("#map-area-button").addClass("M_on");
			//$("#chart-area-button,#table-area-button").removeClass("M_on");
			if(data.length>0){
				//$("#chart-area-button,#table-area-button").removeClass("NoneAction");
				
				//$("#chartTableArea").show();
				
				var hasAdmNm = true,search_adm_cd,dataArray = [];
				$.each(data,function(cnt,node){
					if(node.adm_cd.length>7&&!hasText(node.adm_nm)){
						hasAdmNm = false;
						search_adm_cd = node.adm_cd.substring(0,7);
					}
					var y = 0;
					if(node[showData]&&node[showData]!="N/A"){
						y = parseFloat(node[showData]);
					}
					dataArray.push({
						adm_cd : node.adm_cd,
						adm_nm:node.adm_nm,
						y:y,
						color:$currentMap.search.chartDefaultColor
					});
				});
				if(!hasAdmNm){
					$.ajax({
						type : "GET",
						url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
						data : {
							accessToken : accessToken,
							year : $currentMap.ui.map.bnd_year,
							adm_cd : search_adm_cd,
							low_search : 1
						},
						async : true,
						success : function(res) {
							if(res.errCd=="0"){
								var admSplit = res.features[0].properties.adm_nm.split(" ");
								var search_adm_nm = admSplit[admSplit.length-1];
								console.log(search_adm_nm);
								$.each(dataArray,function(cnt,node){
									node.adm_nm = search_adm_nm;
								});
								process();
							}
						},
						dataType: "json"
					});
				}else{
					process();
				}
				function process(){
					dataArray = dataArray.sort(dynamicSort("-y",true));
					$.each(dataArray,function(cnt,node){
						var name="";
						if(node.adm_cd.length>7){
							name=node.adm_nm+"_"+fillText(cnt+1,2,"0");
						}else{
							name=node.adm_nm;
						}
						node.name = name;
					});
					$currentMap.search.setBarchart(dataArray,showData,showDataName,unit);
					$currentMap.search.setTable(dataArray,showData);
				}
			}
		},
		/**
		 * @name               : setBarchart
		 * @description        : 막대차트 셋팅
		 * @date               : 2020. 07. 08. 
		 * @author	           : 곽제욱
		 * @history            :
		 * @param data         : data
		 * @param showData     : object에서 추출할 데이터이름
		 * @param showDataName : 데이터 이름
		 * @param unit         : 단위
		 */
		setBarchart : function(data,showData,showDataName,unit){
			//$('#chartTit').text(showDataName); // 통계자료명
			$('#chartSelUnit').text(unit);
			
			var categoryeData = new Array();
			//데이터 정렬
			data.sort(function(a, b) { // 내림차순
				return Number(a[data.y]) > Number(b[data.y]) ? -1 : Number(a[data.y]) < Number(b[data.y]) ? 1 : 0;
			});
			var chartData = new Array();
			
			/** 2020.09.28[한광희] 데이터보드 차트 지역명칭 추가 START */
			var admNm = "";
			if($("#currentMapMyLocation_name").text() != "전국"){
				if(data[0].adm_cd.length > 7){
					admNm = $("#currentMapMyLocation_name").text().substr(0, $("#currentMapMyLocation_name").text().lastIndexOf(" "));
					
				} else {
					admNm = $("#currentMapMyLocation_name").text();
				}
			}
			/** 2020.09.28[한광희] 데이터보드 차트 지역명칭 추가 END */
			
			for(var i=0; i < data.length; i++){
				chartData[i] = Number(data[i].y);
				if(data[i].adm_nm == undefined || data[i].adm_nm == null || data[i].adm_nm == ""){
					categoryeData[i] = data[i].adm_cd;
				}
				else{
					categoryeData[i] = data[i].name;					
				}
			}
			
			/** 2020.09.28[한광희] 차트설정 START */
            Highcharts.setOptions({
               lang: {
                   thousandsSep: ",",
                   numericSymbols: ["천", "백만", "십억", "조", "천조", "백경"]
                }
            });
            /** 2020.09.28[한광희] 차트설정 END */
			
			$('#currentChart').highcharts({
				chart: {
					inverted: true,
					backgroundColor: {
			            linearGradient: [500, 500, 500, 0],
			            stops: [
			            	[0, '#fff'],	// 하단 백그라운드 색
			            	[1, '#fff']	// 상단 백그라운드 색
			            ]
			        },
			        type: 'column',
			        width: $(window).width(),
			        //height: $(window).height()
			        height: (data.length * 25)+100
			        //,
			        //marginBottom : 330
			    },
			    title: {
			    	text: unit,
			        align: 'left',
			        margin: 10,
			        style: {
			            color: '#777C82',
			            fontSize: '11px'
			        }
			    },
			    xAxis: {
			    	categories: categoryeData,
			        labels: {
			            style: {
			                color: '#777C82'	// x축 색상
			            }
			        }
			    },
			    yAxis: {
			        title: {
			            text: ''
			        },
			        labels: {
			            formatter: function () {
			            	 return appendCommaToNumber(this.value);
			            },
			            style: {
			                color: '#777C82'	// y축 색상
			            }
			        }

			    },
			    legend: {
			        enabled: false
			    },
			    tooltip:{
			    	enabled:false
			    },
			    plotOptions: {
			        series: {
			            borderWidth: 0,
			            /** 2020.09.28[한광희] 그래프 수치 표출 START */
			            dataLabels: {
			                enabled: true,
			                allowOverlap:true,
			                style: {
			                	color: '#777C82',
			                	textOutline : "0px",
			                	fontWeight: "normal",
			                	textShadow: false 
			                }
			            },
			            /** 2020.09.28[한광희] 그래프 수치 표출 END */
			            // chart click
			            point: {
                            events: {
                                click: function () {
                                    /*alert('Category: ' + this.category + ', value: ' + this.y);*/
                            		$("#chartSelCont").html(admNm+" "+this.category);		// 2020.09.28[한광희] 상위지역 명칭 추가
                                    /** 2020.09.09[한광희] 차트 수치 표현 수정 START */
                                 	$("#chartSelVal").html(appendCommaToNumber(this.y)+"<span>"+unit+"</span>");
                                 	//$('#chartSelUnit').text(unit);
                                 	/** 2020.09.09[한광희] 차트 수치 표현 수정 END */
                                },
                                update: function (event) {
                                	$("#chartSelCont").html(admNm+" "+this.category);	// 2020.09.28[한광희] 상위지역 명칭 추가
                            		/** 2020.09.09[한광희] 차트 수치 표현 수정 START */
                            		$("#chartSelVal").html(appendCommaToNumber(this.y)+"<span>"+unit+"</span>");
                            		//$('#chartSelUnit').text(unit);
                            		/** 2020.09.09[한광희] 차트 수치 표현 수정 END */
                            	}
                            }
                        },
//			            dataLabels: {
//			                enabled: true,
//			                allowOverlap:true,
//			                style: {
//			                	color: '#FFFFFF',
//			                	textOutline : "0px",
//			                	fontWeight: "normal",
//			                	textShadow: false 
//			                }
//			            },
//			            enableMouseTracking: false,
			            shadow: false
			        }
			    },

			    series: [{
			    	name : "",
			    	colorByPoint: true,
			    	data : chartData			    	
			        }]
			});
			// 첫번째 데이터 클릭
			var chart = $('#currentChart').highcharts();
			chart.series[0].data[0].update();			
		},
		/**
		 * @name               : setTable
		 * @description        : 표 셋팅
		 * @date               : 2020. 07. 08. 
		 * @author	           : 곽제욱
		 * @history            :
		 * @param data         : data
		 * @param showData     : object에서 추출할 데이터이름
		 */
		setTable : function(data,showData){
			var total = 0;
			$("#currentMapDataBoard_dataTable>tbody").html(""); // 차트 호출시 영역 초기화
			/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
			if($("#currentMapMyLocation_name").text() != "전국"){
//				$("#parentArea").html($("#currentMapMyLocation_name").text());
				//2022-11-15 띄어쓰기 추가
				$("#parentArea").html($currentMap.ui.my_sido_nm+ " " +$currentMap.ui.my_sgg_nm+ " " +$currentMap.ui.my_emdong_nm);
			} else {
				$("#parentArea").html("");
			}
			/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
			$.each(data,function(cnt,node){
				if(node.y&&node.y!="N/A"){
					total += parseFloat(node.y); 
				}
			});
			$.each(data,function(cnt,node){
				
				var rank = cnt+1;//순위
				var value = node.y;//값
				var rate = 0;//비율
				if(hasText(node.y)&&node.y!="N/A"){
					rate = (node.y / total * 100).toFixed(1);
				}
				
				if(cnt==1){
					var lvTheadHtml = "";
					lvTheadHtml += "<tr class=\"fixed_top\">";
					lvTheadHtml += "<th class=\"cell1\">항목</th><th class=\"cell2\" id=\"dataBoardCloseBtn\">집계구번호</th>";
					lvTheadHtml += "<th class=\"cell3\">순위</th>";
					lvTheadHtml += "<th class=\"cell4\">값</th>";
					lvTheadHtml += "<th class=\"cell5\">비율</th>";
					lvTheadHtml += "</tr>";
				}
				
				
				
				$("#currentMapDataBoard_dataTable>thead").html(lvTheadHtml);
				
				//HTML tbody 추가
				var html = "";
				//var htmlCount = 0;
					
					//console.log("adm_cd [" + i +"] = " + list[i].adm_cd);
					//console.log("adm_nm [" + i +"] = " + list[i].adm_nm);
					//console.log("lv_value [" + i +"] = " + list[i][showData]);
					
					// hshsh
					
					// 개발 - 영유아/어린이 인구 현황의 명이 없으서 임시 주석
					// 2020-06-18 TODO 주석
				if(node.adm_nm != undefined && node.adm_nm != null && node.adm_nm != "") {
					var lv_value = ""+appendCommaToNumber(node.showData);					
					if(lv_value.indexOf(".") == 0) lv_value = "0"+lv_value;
					html += "<tr data-id=\"data-id:"+node.adm_cd+"\">";
					//html += "<td>"+(i+1)+"</td>";
					html += "<td class=\"cell1\">"+node.name+"</td>";
					//읍면동인 경우 adm_cd값 보여주기
					//if((""+list[i].adm_cd).length > 7) {
						html += "<td class=\"cell2\">"+node.adm_cd+"</td>";
					//}
					//else {
						//html += "<td class=\"cell2\">"+node[i].adm_nm+"</td>";
					//}
					html += "<td class=\"cell3\">"+appendCommaToNumber(rank)+"</td>";
					html += "<td class=\"cell4\">"+appendCommaToNumber(value)+"</td>";
					html += "<td class=\"cell5\">"+appendCommaToNumber(rate)+"</td>";
					html += "</tr>";
					//htmlCount++;
				}
				$("#currentMapDataBoard_dataTable>tbody").append(html);
				
				//var test1 = $("#currentMapDataBoard_dataTable").html();
				/*
				//console.log("html = " + html);
				$("#statsMeMapDataBoard_dataTable>tbody").html(html);
				
				
				
				$("#table-value").append($("<tr/>",{"data-id":node.adm_cd}).append(
					$("<td/>",{"class":"al","text":node.name}),
					$("<td/>",{"class":"al","text":node.adm_cd}),
					$("<td/>",{"text":appendCommaToNumber(rank)}),
					$("<td/>",{"text":appendCommaToNumber(value)}),
					$("<td/>",{"text":rate})
				));
				*/
				$.each($("#currentMapDataBoard_dataTable"),function(){
					$.each($(this).find("tr"),function(){
						if(node.adm_cd.length>7){
							$(this).find("th:eq(1),td:eq(1)").show();
						}else{
							$(this).find("th:eq(1),td:eq(1)").hide();
						}
					});
					
				});
			});
		},
		/**
		 * @name         : updateColor
		 * @description  : 차트,표 색상 업데이트
		 * @date         : 2020. 07. 08. 
		 * @author	     : 곽제욱
		 * @history      :
		 * @param adm_cd : 행정동 코드
		 */
		updateColor : function(adm_cd){
			this.updateBarchartColor(adm_cd);
			this.updateTabeColor(adm_cd);
		},
		/**
		 * @name         : updateBarchartColor
		 * @description  : 차트 색상 업데이트
		 * @date         : 2020. 07. 08.
		 * @author	     : 곽제욱
		 * @history      :
		 * @param adm_cd : 행정동 코드
		 */
		updateBarchartColor : function(adm_cd){
			var chart = $("#currentChart").highcharts();
			if($currentMap.search.lastChartIndx!=null){
				chart.series[0].data[$currentMap.search.lastChartIndx].update({ color: $currentMap.search.chartDefaultColor });
			}
			$.each(chart.series[0].data,function(cnt,node){
				if(node.adm_cd===adm_cd){
					$currentMap.search.lastChartIndx = cnt;
					node.update({ color: $currentMap.search.activeChartColor});
					if($("#chart-area .highcharts-series rect[fill=\\"+$currentMap.search.activeChartColor+"]").length>0){
						$("#chart-area").animate({
							scrollTop: $("#chart-area .highcharts-series rect[fill=\\"+$currentMap.search.activeChartColor+"]").offset().top-$("#chart-area>.chart").offset().top-20
						}, 801);
					}
					if($("#chart-area").is(":visible")){
						chart.tooltip.refresh([node]);
					}
					return false;
				}
			});
		},
		/**
		 * @name         : updateTabeColor
		 * @description  : 표 색상 업데이트
		 * @date         : 2020. 07. 08.
		 * @author	     : 곽제욱
		 * @history      :
		 * @param adm_cd : 행정동 코드
		 */
		updateTabeColor : function(adm_cd){
			$("#table-value tr td.M_on").removeClass("M_on");
			if($("#table-value tr[data-id="+adm_cd+"]").length>0){
				$("#table-value").parents(".scrolls").animate({
					scrollTop: $("#table-value tr[data-id="+adm_cd+"]").offset().top-$("#table-value").parents("table").offset().top
				}, 801);
				$("#table-value tr[data-id="+adm_cd+"] td").addClass("M_on");
			}
		},
		/**
		 * @name             : API_0301
		 * @description      : 주요지표 검색
		 * @date             : 2020. 07. 09. 
		 * @author	         : 곽제욱
		 * @history          :
		 */
		API_0301 : function(){
			var api_id = "API_0301";
			var checkItem = $("input[name="+api_id+"]:radio:checked");
			var checkppltnyear = $("#"+api_id+"_ppltn_year").val();
			var checkcorpyear = $("#"+api_id+"_corp_year").val();
			var adm_cd = $currentMap.ui.map.getAdmCd();
			$("#chartSourceTit").empty();
			//var adm_cd = $("#currentPopupArea_sido option:selected").val()+$("#currentPopupArea_sgg option:selected").val()+$("#currentPopupArea_emdong option:selected").val();
			$currentMap.ui.map.censusApi.setStatsMapCensusData(api_id,{
				"showData" : checkItem.val(),
				"showDataName" : checkItem.data("show-name"),
				"unit" : checkItem.data("unit"),
				//"adm_cd" : adm_cd,
				"callback" : function(data){
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
					
					//mng_s 20201029 이진호, 출처년도 뒤에 ']' 추가 
					if(checkItem.val()=="nongga_cnt"||checkItem.val()=="imga_cnt"||checkItem.val() == "naesuoga_cnt"||checkItem.val() == "haesuoga_cnt"){
						setMaptitle($("#map-title>h3"),checkItem.data("show-name")+"("+checkItem.data("unit")+")[출처:통계청농림어업총조사("+checkppltnyear+")]");
						$("#chartTit").html(checkItem.data("show-name")+"(" + checkItem.data("unit") + ")");
						$("#chartSourceTit").html("[출처:통계청, 통계청농림어업총조사("+checkppltnyear+")]");
						$("#boardTit").html(checkItem.data("show-name")+"(" + checkItem.data("unit") + ")");	// 2020.09.09[한광희] 표 제목 추가
						$("#boardSourceTit").html("[출처:통계청, 통계청농림어업총조사("+checkppltnyear+")]");
					}else if(checkItem.val() == "corp_cnt"){
						setMaptitle($("#map-title>h3"),checkItem.data("show-name")+"("+checkItem.data("unit")+")[출처:통계청, 전국사업체조사("+checkcorpyear+")]");
						$("#chartTit").html(checkItem.data("show-name")+"(" + checkItem.data("unit") + ")");
						
						//mng_s 20201029 이진호, checkppltnyear을 받는게 아닌 사업체 년도인 checkcorpyear 를 받아야 함 
						//$("#chartSourceTit").html("[출처:통계청, 전국사업체조사("+checkppltnyear+")");
						$("#chartSourceTit").html("[출처:통계청, 전국사업체조사("+checkcorpyear+")]");
						$("#boardTit").html(checkItem.data("show-name")+"(" + checkItem.data("unit") + ")");	// 2020.09.09[한광희] 표 제목 추가
						//$("#boardSourceTit").html("[출처:통계청, 전국사업체조사("+checkppltnyear+")");
						$("#boardSourceTit").html("[출처:통계청, 전국사업체조사("+checkcorpyear+")]");
						//mng_e 20201029 이진호
						
					}else{
						setMaptitle($("#map-title>h3"),checkItem.data("show-name")+"("+checkItem.data("unit")+")[출처:통계청, 인구주택총조사("+checkppltnyear+")]");
						$("#chartTit").html(checkItem.data("show-name")+"(" + checkItem.data("unit") + ")");
						$("#chartSourceTit").html("[출처:통계청, 인구주택총조사("+checkppltnyear+")]");
						$("#boardTit").html(checkItem.data("show-name")+"(" + checkItem.data("unit") + ")");	// 2020.09.09[한광희] 표 제목 추가
						$("#boardSourceTit").html("[출처:통계청, 인구주택총조사("+checkppltnyear+")]");
					}
					//mng_e 20201029 이진호
					
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
					$currentMap.search.setArea(data, checkItem.val(), checkItem.data("show-name"), checkItem.data("unit"));
					//api_log_write();
				}
			},{
				"year":checkItem.val()=="corp_cnt"?checkcorpyear:checkppltnyear,
				"bnd_year":$currentMap.ui.map.bnd_year
			});
			return true;
		},
		/**
		 * @name             : API_0302
		 * @description      : 인구 검색
		 * @date             : 2020. 07. 09. 
		 * @author	         : 곽제욱
		 * @history          :
		 */
		API_0302 : function(){
			var api_id = "API_0302";
			var checkyear = $("#"+api_id+"_year").val()
			var parameters = {
				"year":checkyear,
				"bnd_year":$currentMap.ui.map.bnd_year,
				"gender":$("input[name="+api_id+"_gender]:radio:checked").val()
			};
			this.addParameter(api_id,$("#search-box>div[data-id="+api_id+"]"),parameters);
			var mapTitle = [];
			if(parameters.age_from||parameters.age_to){
				mapTitle.push(parameters.age_from+"세~"+parameters.age_to+"세");
			}
			if(parameters.edu_level){
				var title = [];
				$.each(parameters.edu_level.split(","),function(cnt,node){
					title.push($("input[name=API_0302_edu_level][value="+node+"]:checkbox").parent().find("h2").text());	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
				});
				mapTitle.push(title.join(","));
			}
			if(parameters.mrg_state){
				var title = [];
				$.each(parameters.mrg_state.split(","),function(cnt,node){
					title.push($("input[name=API_0302_mrg_state][value="+node+"]:checkbox").parent().find("h2").text());	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
				});
				mapTitle.push(title.join(","));
			}
			if(parameters.gender){
				if(parameters.gender=="0"){
					mapTitle.push("남여인구");
				}else if(parameters.gender=="1"){
					mapTitle.push("남자인구");
				}else if(parameters.gender=="2"){
					mapTitle.push("여자인구");
				}
			}
			$currentMap.ui.map.censusApi.setStatsMapCensusData(api_id,{
				"showData" : "population",
				"showDataName" : "인구",
				"unit" : "명",
				"callback" : function(data){
					setMaptitle($("#map-title>h3"),mapTitle.join(" + ")+"(명)[출처:통계청, 인구주택총조사("+checkyear+")");
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
					$("#chartTit").html(mapTitle.join(" + ")+"(명)");
					$("#chartSourceTit").html("[출처:통계청, 인구주택총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
					$("#boardTit").html(mapTitle.join(" + ")+"(명)");	// 2020.09.09[한광희] 표 제목 추가
					$("#boardSourceTit").html("[출처:통계청, 인구주택총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
					$currentMap.search.setArea(data, "population", "인구", "명");
					//api_log_write();
				}
			},parameters);
			return true;
		},
		/**
		 * @name             : API_0304
		 * @description      : 사업체 검색
		 * @date             : 2020. 07. 09. 
		 * @author	         : 곽제욱
		 * @history          :
		 */
		API_0304 : function(){
			var api_id = "API_0304";
			var checkyear = $("#"+api_id+"_year").val()
			//var searchBox = $("#search-box>div[data-id="+api_id+"]>.TabArea:visible");
			
			var checkDiv = $("#API0304_Opt").find(".current").attr("id");

			if(checkDiv=="industry"){
				var searchBox = $("#search-box>div[data-id="+api_id+"]>div>div>.TabArea").eq(0);
			} else if(checkDiv=="thema"){
				var searchBox = $("#search-box>div[data-id="+api_id+"]>div>div>.TabArea").eq(1);
			}
			console.log(searchBox.attr("id"));
			console.log(searchBox.attr("class"));
			var checkItem = searchBox.find("input[name^="+api_id+"]:radio:checked");
			var mapTitle = [];
			var parameters = {
				"year":checkyear,
				"bnd_year":$currentMap.ui.map.bnd_year
			};

			if(checkDiv=="industry"){//산업분류검색
				parameters.class_code = $currentMap.api.activeClassCode;
				if($("#API_0304_1_check").is(":checked") == true && ($("#company-list input[name=company_list]:radio").is(":checked") == true|| $(".itemSearchList").length > 0)){	// 2020.09.23[한광희] 검색 조건 추가
					checkItem.val('tot_worker');
				}else if($("#API_0304_1_check").is(":checked") == true){
					checkItem.val('employee_cnt');
				}else{
					checkItem.val('corp_cnt');
				}
				if($("#company-list input[name=company_list]:radio").is(":checked") == true){
					parameters.area_type = '0';
				}
				mapTitle.push($currentMap.api.activeClassName);
			}else if(checkDiv=="thema"){//테마검색
				var class_code_radio = searchBox.find("input[name=theme-code]:radio:checked");
				if(class_code_radio.length>0){
					parameters.theme_cd = class_code_radio.val();
					mapTitle.push(class_code_radio.parent().text());
					parameters.area_type = "0";
				}else{
					common_alert("테마코드를 선택하세요.", "");
					return false;
				}
			}
			mapTitle.push(checkItem.data("show-name"));
			$currentMap.ui.map.censusApi.setStatsMapCensusData(api_id,{
				"showData" : checkItem.val(),
				"showDataName" : checkItem.data("show-name"),
				"unit" : checkItem.data("unit"),
				"callback" : function(data){
					setMaptitle($("#map-title>h3"),mapTitle.join(" + ")+"("+checkItem.data("unit")+")[출처:통계청, 전국사업체조사("+checkyear+")]");
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
					$("#chartTit").html(mapTitle.join(" + ")+"("+checkItem.data("unit")+")");
					$("#chartSourceTit").html("[출처:통계청, 전국사업체조사("+checkyear+")]");
					$("#boardTit").html(mapTitle.join(" + ")+"("+checkItem.data("unit")+")");	// 2020.09.09[한광희] 표 제목 추가
					$("#boardSourceTit").html("[출처:통계청, 전국사업체조사("+checkyear+")]");
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
					$currentMap.search.setArea(data, checkItem.val(), checkItem.data("show-name"), checkItem.data("unit"));
					//api_log_write();
				}
			},parameters);
			return true;
		},
		/**
		 * @name             : API_0305
		 * @description      : 가구 검색
		 * @date             : 2020. 07. 09. 
		 * @author	         : 곽제욱
		 * @history          :
		 */
		API_0305 : function(){
			var api_id = "API_0305";
			var checkyear = $("#"+api_id+"_year").val()
			var parameters = {
				"year":checkyear,
				"bnd_year":$currentMap.ui.map.bnd_year
			};
			this.addParameter(api_id,$("#search-box>div[data-id="+api_id+"]"),parameters);
			var mapTitle = [];
			if(parameters.household_type){
				var title = [];
				$.each(parameters.household_type.split(","),function(cnt,node){
					title.push($("input[name=API_0305_household_type][value="+node+"]:checkbox").parent().find("h2").text());	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
				});
				mapTitle.push(title.join(","));
			}
			if(parameters.ocptn_type){
				var title = [];
				$.each(parameters.ocptn_type.split(","),function(cnt,node){
					title.push($("input[name=API_0305_ocptn_type][value="+node+"]:checkbox").parent().find("h2").text());	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
				});
				mapTitle.push(title.join(","));
			}
			if(mapTitle.length==0){
				mapTitle.push("총가구");
			}
			$currentMap.ui.map.censusApi.setStatsMapCensusData(api_id,{
				"showData" : "household_cnt",
				"showDataName" : "가구수",
				"unit" : "가구",
				"callback" : function(data){
					setMaptitle($("#map-title>h3"),mapTitle.join(" + ")+"(가구)[출처:통계청,인구주택총조사("+checkyear+")");
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
					$("#chartTit").html(mapTitle.join(" + ")+"(가구)");
					$("#chartSourceTit").html("[출처:통계청,인구주택총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
					$("#boardTit").html(mapTitle.join(" + ")+"(가구)");	// 2020.09.09[한광희] 표 제목 추가
					$("#boardSourceTit").html("[출처:통계청,인구주택총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
					$currentMap.search.setArea(data, "household_cnt", "가구수", "가구");
					//api_log_write();
				}
			},parameters);
			return true;
		},
		/**
		 * @name             : API_0306
		 * @description      : 주택 검색
		 * @date             : 2020. 07. 09. 
		 * @author	         : 곽제욱
		 * @history          :
		 */
		API_0306 : function(){
			var api_id = "API_0306";
			var checkyear = $("#"+api_id+"_year").val()
			var parameters = {
				"year":checkyear,
				"bnd_year":$currentMap.ui.map.bnd_year
			};
			this.addParameter(api_id,$("#search-box>div[data-id="+api_id+"]"),parameters);
			
			var tmpHouseBdspaceTo = parameters.bdspace_to;
			var tmpHouseBdspaceFrom = parameters.bdspace_from;
			var houseAreaCd = [];
			
			if (parseInt(parameters.bdspace_from) >= 230) {
				tmpHouseBdspaceFrom = 230;
			}
			
			if (parseInt(parameters.bdspace_to) >= 300) {
				tmpHouseBdspaceTo = 230;
			}
			
			var dataSet = {
					 0 : "01",
					20 : "02",
					40 : "03",
					60 : "04",
					85 : "05",
				   100 : "06",
				   130 : "07",
				   165 : "08",
				   230 : "09"
			};
			
			var fromData = parseInt(dataSet[tmpHouseBdspaceFrom]);
			var toData = parseInt(dataSet[tmpHouseBdspaceTo]);
			
			for (var i=0; i<toData-fromData; i++) {
				houseAreaCd.push("0"+(fromData+i));
			}
			
			parameters.house_area_cd = houseAreaCd.join();
			
			var mapTitle = [];
			if(parameters.house_type){
				var title = [];
				$.each(parameters.house_type.split(","),function(cnt,node){
					title.push($("input[name=API_0306_house_type][value="+node+"]:checkbox").parent().find("h2").text());	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
				});
				mapTitle.push(title.join(","));
			}
			if(parameters.const_year){
				mapTitle.push($("select[name=API_0306_const_year] option:selected").text()+"건축");
			}
			if(parameters.bdspace_from||parameters.bdspace_to){
				mapTitle.push($("select[name=API_0306_bdspace_from] option:selected").text().replace(/(^\s*)|(\s*$)/gi, "")+$("select[name=API_0306_bdspace_to] option:selected").text().replace(/(^\s*)|(\s*$)/gi, ""));
			}
			if(mapTitle.length==0){
				mapTitle.push("총주택");
			}
			delete parameters.bdspace_from;
			delete parameters.bdspace_to;
			$currentMap.ui.map.censusApi.setStatsMapCensusData(api_id,{
				"showData" : "house_cnt",
				"showDataName" : "주택수",
				"unit" : "호",
				"callback" : function(data){
					setMaptitle($("#map-title>h3"),mapTitle.join(" + ")+"(호)[출처:통계청,인구주택총조사("+checkyear+")");
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
					$("#chartTit").html(mapTitle.join(" + ")+"(호)");
					$("#chartSourceTit").html("[출처:통계청,인구주택총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
					$("#boardTit").html(mapTitle.join(" + ")+"(호)");	// 2020.09.09[한광희] 표 제목 추가
					$("#boardSourceTit").html("[출처:통계청,인구주택총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
					/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
					$currentMap.search.setArea(data, "house_cnt", "주택수", "호");
					//api_log_write();
				}
			},parameters);
			return true;
		},
		/**
		 * @name             : API_0310
		 * @description      : 농림어가 검색
		 * @date             : 2020. 07. 10. 
		 * @author	         : 곽제욱
		 * @history          :
		 */
		API_0310 : function(){
			var api_id = "API_0310";
			var checkyear = $("#"+api_id+"_year").val()
			var checkDiv = $("#API3010_Opt").find(".current").attr("id");	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
			
			//mng_s 20211025 이진호
			//가구원별 상세조건과 가구별 상세조건의 조사년도 선택 ID가 다르기 때문에 각각 설정
			if(checkDiv=="generation"){
				var searchBox = $("#search-box>div[data-id="+api_id+"]>.TabArea").eq(0);
				checkyear = $("#"+api_id+"_year").val();
			} else {
				var searchBox = $("#search-box>div[data-id="+api_id+"]>.TabArea").eq(1);
				checkyear = $("#"+api_id+"_year_1").val();
			}
			//mng_e 20211025 이진호
			
			var parameters = {
				"year":checkyear,
				"bnd_year":$currentMap.ui.map.bnd_year
			};
			var mapTitle = [];
			if($("#search-box>div[data-id="+api_id+"]>.TabArea").index(searchBox)==0){//가구원별 상세조건
				parameters.data_type = searchBox.find("input[name=data_type]:radio:checked").val();
				this.addParameter(api_id,searchBox,parameters);
				if(parameters.age_from||parameters.age_to){
					mapTitle.push(parameters.age_from+"세~"+parameters.age_to+"세");
				}
				if(parameters.gender){
					if(parameters.gender=="0"){
						mapTitle.push("남여인구");
					}else if(parameters.gender=="1"){
						mapTitle.push("남자인구");
					}else if(parameters.gender=="2"){
						mapTitle.push("여자인구");
					}
				}
				mapTitle.push(searchBox.find("input[name=data_type]:radio:checked").parent().find("h2").text());	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
				$currentMap.ui.map.censusApi.setStatsMapCensusData(api_id,{
					"showData" : "population",
					"showDataName" : "인구",
					"unit" : "명",
					"callback" : function(data){
						setMaptitle($("#map-title>h3"),mapTitle.join(" + ")+"(명)[출처:통계청,농림어업총조사("+checkyear+")");
						/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
						$("#chartTit").html(mapTitle.join(" + ")+"(명)");
						$("#chartSourceTit").html("[출처:통계청,농림어업총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
						$("#boardTit").html(mapTitle.join(" + ")+"(명)");	// 2020.09.09[한광희] 표 제목 추가
						$("#boardSourceTit").html("[출처:통계청,농림어업총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
						/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
						$currentMap.search.setArea(data, "population", "인구", "명");
						//api_log_write();
					}
				},parameters);
			}else if($("#search-box>div[data-id="+api_id+"]>.TabArea").index(searchBox)==1){//가구별 상세조건
				var checkItem = searchBox.find("input[name=condition-type]:radio:checked");
				if(checkItem.data("api")=="API_0309"){//어가일 경우 어가 구분을 전체로 하기 위함
					parameters.oga_div = "0";
				}
				mapTitle.push(checkItem.parent().find("h2").text());	// 2020.09.28[한광희] 내주변통계 데이터보드 수정
				$currentMap.ui.map.censusApi.setStatsMapCensusData(checkItem.data("api"),{
					"showData" : checkItem.val(),
					"showDataName" : checkItem.data("show-name"),
					"unit" : checkItem.data("unit"),
					"callback" : function(data){
						//setMaptitle($("#map-title>h3"),mapTitle.join(" + ")+"("+checkItem.data("unit")+")[출처:통계청,농림어업총조사("+checkyearr+")");
						/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 START */
						// $(".conTit").html(mapTitle.join(" + ")+"("+checkItem.data("unit")+")[출처:통계청,농림어업총조사("+checkyear+")");
						$("#chartTit").html(mapTitle.join(" + ")+"(명)");
						$("#chartSourceTit").html("[출처:통계청,농림어업총조사("+checkyear+")]"); //mng_s 20211021 이진호 대괄호 추가 ']'
						$("#boardTit").html(mapTitle.join(" + ")+"(명)");	// 2020.09.09[한광희] 표 제목 추가
						$("#boardSourceTit").html("[출처:통계청,농림어업총조사("+checkyear+")]");
						/** 2020.09.28[한광희] 내주변통계 데이터보드 수정 END */
						$currentMap.search.setArea(data, checkItem.val(), checkItem.data("show-name"), checkItem.data("unit"));
						//api_log_write();
					}
				},parameters);
			}
			return true;
		}
	};
	
	function api_log_write(){
		var title = $(".gnb h2").text();				
		var parameter = $("#map-title>h3").text();
		//var zoomLevel = $currentMap.ui.subNavigation.menu.zoom;
		var adm_nm = $("#map-navigator-sub-sido option:selected").text() + " " + $("#map-navigator-sub-sgg option:selected").text() + " " + $("#map-navigator-sub-emdong option:selected").text();
		apiLogWrite2("L0", "L03", title, parameter, zoomLevel, adm_nm);	
	}
}(window, document));