/**
 * 행정통계시각화 통계더보기
 */
(function(W, D) {
	W.$more1DashDetail = W.$more1DashDetail || {};
	//기업규모별
	$more1DashDetail.conSmallNonColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
	
	$(document).ready(function() {
	});
	$(window).load(function(){
	}); 
	$more1DashDetail.ui = {
		init : function() {
			console.log(gv_url+" : ===일자리 행정통계===");
			$administStatsMain.ui.appendContent("/view/administStatsDetail/moreDash/main");
			$more1DashDetail.ui.api();
			/*setTimeout(function() {
				$more1DashDetail.ui.ready();
			}, 500);*/
		},
		ready : function() {
			$more1DashDetail.ui.api();
		},
		/**
		 * @name : $more1DashDetail.ui.api
		 * @description : 초기화면 호출(리스트, 차트)
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		api : function() {
			var param = {};
			if (gv_checkmenu == 'more1'){
				param = { 
					vwCd : "MT_OTITLE",
					parentListId : "101_2016_10",
					format : "json",
					jsonVD : "Y",
					apiKey: apiKey
				}
			}
			var url = "";
			var proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			console.log("location.hostname [" + location.hostname);
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			if(gv_checkmenu == 'more1') {
				$.ajax({
					url : proxy+"https://kosis.kr/openapi/statisticsList.do?method=getList",
					type : 'get',
					data: param,
					dataType: "json"
				}).done(function(result){
					itemInfo = result;
					var list1 = document.getElementById('list1');
					var il1=0;
					for(var i=0; i<itemInfo.length; i++) {
						var stattb_url = "https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=" + itemInfo[i].TBL_ID + "&conn_path=I2";
						//let tblNmSubStr = itemInfo[i].TBL_NM.subStr();
						if(itemInfo[i].TBL_NM.length > 16){
							tblNm = itemInfo[i].TBL_NM.substring(0, 16) + "...";
						} else {
							tblNm = itemInfo[i].TBL_NM;
						}
						//let tblNm = itemInfo[i].TBL_NM; 16
						list1.innerHTML +=	'<li data-org_id="' + itemInfo[i].ORG_ID + '" data-tbl_id="' + itemInfo[i].TBL_ID +	'" data-tbl_nm="' + itemInfo[i].TBL_NM + '">' +
											'<a class="searchmenua" style="width: 240px;" href="javascript:void(0);" title="' + itemInfo[i].TBL_NM + '">'+tblNm+ '</a><a onclick="javascript:openPop1('+"'"+stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS ' + tblNm + '</a></li>';
						il1++;
					}
					if(gv_checkmenu == 'more1'){
						$('#list1').css({'max-height':'480px'});
					}
					$(".con").css({'display': 'block'});
					$("#list1").css({'overflow-y':'auto', 'overflow-x':'hidden'}).css('height', 50*il1+'px');
					
					for(var i=0; i<$("a.searchmenua").length; i++) {
						$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:$more1DashDetail.ui.openApiSearch(this);");
					}
					$(".accordion-li").children(":first").addClass("on");
					$(".accordion-li ul:first").slideDown();
					
					setTimeout(function() {
						$("a.searchmenua:eq(0)").click();
					},500);
				});
			}
		},
		/**
		 * @name : $more1DashDetail.ui.openApiSearch
		 * @description : 각 일자리 클릭 이벤트 / 데이터 호출
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		openApiSearch : function(li) {
			$administStatsMain.ui.loading(true);
			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 2000);
			$(".searchLayer").fadeOut();
			$('.searchInput').val('');
			var list2 = document.getElementById('list2');
			list2.innerHTML = '';
			$('#searchCount').text('0건');
			for(var i=0; i<$("a.searchmenua").length; i++) {
				if($("a.searchmenua:eq(" + i + ")").css("color") == "#1772a9") {
					$("a.searchmenua:eq(" + i + ")").css("color", "#666666");
					$("a.searchmenua:eq(" + i + ")").css('font-weight', 400);
				}
			}
			$(li).parent().find('a:eq(0)').css('color','#1772a9'); //parent:부모요소 선택 메서드 / find:어떤 요소의 하위요소중 특정요소를 찾음
			$(li).parent().find('a:eq(0)').css('font-weight', 700);
			//검색 레이어
			$('.searchInput').click(function(){
				$(".searchLayer").fadeIn();
			});
			$('.searchClose').click(function(){
				$(".searchLayer").fadeOut();
			});
			$('.searchbox').mouseleave(function(){
				$(".searchLayer").fadeOut();
			});
			
			$('ul.qna_list li:first-child').find(".con").stop().slideDown(400);
			$('ul.qna_list').on('click','.tit',  function() {
				var $this = $(this);
				var $hasCls = $this.hasClass("on");
				$this.closest("li").find(".con").stop().slideDown(400);
				$this.closest("ul").find("li .tit").each(function(){
					$(this).removeClass("on");
					$(this).closest("li").find(".con").stop().slideDown(400);
				}).promise().then(function(){
					if(!$hasCls){
						$this.addClass("on");
						$this.closest("li").find(".con").stop().slideUp(400);
					}
				});
			});
			//마우스 휠 가로스크롤
			$('.division').mousewheel(function(e, delta) {
				this.scrollLeft -= (delta * 30);
				e.preventDefault();
			});
			
			var tblNm = $(li).parent().data('tbl_nm');
			var tblId = $(li).parent().data('tbl_id'); //DT_1EP_3001
			var orgId = $(li).parent().data('org_id'); //101
			
			//분류코드 변수
			var objL1 = "";
			var objL2 = "";
			var objL3 = "";
			var objL4 = "";
			
			var proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			//통계표ID에 따른 분류
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3013"  || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
					tblId == "DT_1EP_3016" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || 
					tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				objL1 = "00";
				objL2 = "00";
				objL3 = "00";
				objL4 = "";
			}else if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009") {
				objL1 = "00";
				objL2 = "00";
				objL3 = "";
				objL4 = "";
			}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3035") {
				objL1 = "0";
				objL2 = "00";
				objL3 = "00";
				objL4 = "";
			}else if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021") {
				objL1 = "00";
				objL2 = "0";
				objL3 = "00";
				objL4 = "";
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
				objL1 = "00";
				objL2 = "0";
				objL3 = "00";
				objL4 = "00";
			}else if(tblId == "DT_1EP_3005") {
				objL1 = "000";
				objL2 = "00";
				objL3 = "";
				objL4 = "";
			}else if(tblId == "DT_1EP_3006") {
				objL1 = "0";
				objL2 = "00";
				objL3 = "";
				objL4 = "";
			}
			//파라미터 변수
			var param = {
				'itmId' :		"T00",		//항목
				'objL1' :		objL1,		//분류1(첫번째 분류코드) 
				'objL2' :		objL2,		//분류2(두번째 분류코드)
				'objL3' :		objL3,		//분류3(세번째 분류코드)
				'objL4' :		objL4,		//분류4(네번째 분류코드)
				'format' :		"json",		//결과 유형(json)
				'jsonVD' :		"Y",		//
				'prdSe' :		"Y",		//수록주기
				//'startPrdDe' :	"2016",		//시작수록지점
				//'endPrdDe' :	"2020",		//종료수록지점
				//'loadGubun' :	"1",		//조회구분
				'newEstPrdCnt': '5',		//최근수록개수
				'orgId' :		"101",		//기관ID
				'tblId' :		tblId,		//통계표ID (DT_1EP_3001, DT_1EP_3005....)
				'apiKey' :		apiKey
			}
			$.ajax({
				url: proxy+'https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList',
				//url: '/view/administStats/more1Dash'
				type: 'get',
				sync: false,
				data: param,
				dataType: "json"
			}).done(function(res) {
				//console.log('================== 년도별 1번차트 ==================');
				//console.log(res); //년도별 1번차트
				var tblNm = res;
				let prdDeYear = new Array;
				let prdDeReverce = new Array;
				$('.modalSearchTitle option').remove();
				$(".modalSearchYear option").remove();
				$(".header-tag #headerSearchYear option").remove();
				$('.modalSearchTitle').append('<option ' + 'data-tbl_id="' + res[0].TBL_ID + '"' + '" value="' + res[0].TBL_ID + '"' + '">' + res[0].TBL_NM + '</option>');
				for(let i=0; i<res.length; i++) {
					prdDeReverce.push(res[i].PRD_DE);
				}
				prdDeYear = prdDeReverce.reverse(); 
				for(let i=0; i<prdDeYear.length; i++) {
					$(".modalSearchYear").append('<option value="'+prdDeYear[i]+'">'+prdDeYear[i]+'</option>'); //여기
					$(".header-tag #headerSearchYear").append('<option ' + 'data-tbl-id="more1"' + ' value="'+prdDeYear[i]+'">'+prdDeYear[i]+'</option>'); //여기
				}
				var prdDe = prdDeYear[0];
				
				//다른일자리 클릭시 또는 초기화시 연도셀렉트 2020 초기화 
				$('.modalSearchYear').val(prdDe).prop("selected", true);
				$(".header-tag #headerSearchYear").val(prdDe).prop("selected", true); //여기
				('<option value="' + res[0].PRD_DE + '">' + res[0].PRD_DE + '</option>'); 
				$('.modal-search').css('display','block');
				
				$more1DashDetail.ui.chartDatachange(res[0].TBL_ID, prdDe);
			});
		},
		/**
		 * @name : $more1DashDetail.ui.chartDatachange
		 * @description : 차트 데이터 호출
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		chartDatachange : function(tblId, prdDe) {
			$('.header-tag #headerSearchYear').off('change');
			var proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			var objL1 = "";
			var objL2 = "";
			var objL3 = "";
			var objL4 = "";
			var preData;
			var currentData;
			var perChange = new Array;
			var tbl = "";
			var startPrdDe = "";
			var objL1 = "";
			var objL3 = "";
			var categories = new Array;
			var chartData1 = new Array;
			var newEstPrdCnt = "";
			$('#downPicture1').off('click');
			$('#downPicture1_1').off('click');
			if(tblId == "DT_1EP_3035") {
				tbl = "DT_1EP_3035";
				//startPrdDe = "2018";
				objL1 = "0"
				objL3 = "00";
				//categories = ['2018', '2019','2020'];
				newEstPrdCnt = '5';
			}else {
				tbl = "DT_1EP_3001"
				//startPrdDe = "2016";
				objL1 = "00";
				objL3 = "";
				newEstPrdCnt = '5';
				//categories = ['2016', '2017', '2018', '2019','2020']
			}
			//1번차트 데이터 param
			var param2 = {
				'apiKey' : 		apiKey,
				'itmId': 		"T00",
				'objL1': 		objL1,
				'objL2': 		"00",
				'objL3': 		objL3,
				'format': 		"json",
				'jsonVD': 		"Y",
				'prdSe': 		"Y",
				//'startPrdDe': 	startPrdDe,
				//'endPrdDe': 	"2020",
				'newEstPrdCnt': newEstPrdCnt, //6
				'loadGubun': 	"1",
				'orgId': 		"101",
				'tblId': 		tbl
			}
			//1번차트 데이터 
			$.ajax({
				url: proxy+'https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList',
				type: 'get',
				sync: false,
				data: param2,
				dataType: "json"
			}).done(function(res) {
				//console.log("========================1번차트 데이터========================");
				//console.log(res);
				var chartVal1 = new Array;
				var charts1 = "";
				var count = "";
				for(var i=0; i<res.length; i++) {
					categories.push(res[i].PRD_DE);
					chartVal1.push(Number(res[i].DT));
				}
				if(categories.length == 4) {
					perChange.push(
						"없음"
						,(((res[1].DT - res[0].DT) / res[0].DT ) * 100).toFixed(2)
						,(((res[2].DT - res[1].DT) / res[1].DT ) * 100).toFixed(2)
						,(((res[3].DT - res[2].DT) / res[2].DT ) * 100).toFixed(2)
					);
				}else if(categories.length == 5) {
					perChange.push(
						"없음"
						,(((res[1].DT - res[0].DT) / res[0].DT ) * 100).toFixed(2)
						,(((res[2].DT - res[1].DT) / res[1].DT ) * 100).toFixed(2)
						,(((res[3].DT - res[2].DT) / res[2].DT ) * 100).toFixed(2)
						,(((res[4].DT - res[3].DT) / res[3].DT ) * 100).toFixed(2)
					);					
				}
				chartData1.push({
					name: '전체일자리',
					data: chartVal1,
					color: '#D0D0D0',
					marker: {
						radius: 5,
						symbol: 'circle',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						//format: '{y}만개',
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = $more3DashDetail.util.comma(thisY);
							return  commaY + '만개';
						},
					},
				});
				if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" ||
				   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
					//$more1DashDetail.chart.industryChart(tblId);
					count = 'chart1_0';
				}else {
					count = 'chart1';
				}
				var charts1 = Highcharts.chart(count, {
					chart : {
						type : 'line',
						marginTop: 30,
					},
					credits: {
						enabled: false
					},
					exporting: {
						enabled: false,
						chartOptions: {
							series: {
								dataLabels: {
									style: {
										color: $more3DashDetail.organiFormColor,
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							xAxis: {
								labels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '',
					},
					yAxis: {
						title: {
							text: '',
						},
						labels: {
							enabled : false
						},
						lineColor: '#E8E8E8'
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949',
								fontSize:'12px',
								fontWeight: 'bold',
							}
						},
						categories: categories,
					},
					legend: {
						enabled: true,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight: 1.2,
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							var returnFormatter;
							if(this.x == categories[0]) {
								returnFormatter = '전년도 자료 없음' ;
							}else if(this.x == categories[1]) {
								if(perChange[1] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[1]+'% 증가 ↑</span>';
								}else if(perChange[1] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[1]+'% 감소 ↓</span>';
								}
							}else if(this.x == categories[2]) {
								if(perChange[2] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[2]+'% 증가 ↑</span>';
								}else if(perChange[2] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[2]+'% 감소 ↓</span>';
								}
							}else if(this.x == categories[3]) {
								if(perChange[3] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[3]+'% 증가 ↑</span>';
								}else if(perChange[3] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[3]+'% 감소 ↓</span>';
								}
							}else if(this.x == categories[4]) {
								if(perChange[4] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[4]+'% 증가 ↑</span>';
								}else if(perChange[4] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[4]+'% 감소 ↓</span>';
								}
							}
							return returnFormatter;
						},
					},
					series: chartData1 
				});
				$('#downPicture1').on('click', function(){
					for(var i = 0; i < $('.tabArea .tabBox').length; i++){
						if($('.tabArea .tabBox.on .chartbox div').attr('id') == 'chart1'){charts1.exportChart();}
					}
				});
				$('#downPicture1_1').on('click', function(){
					for(var i = 0; i < $('.tabArea1_1 .tabBox').length; i++){
						if($('.tabArea1_1 .tabBox.on .chartbox div').attr('id') == 'chart1_0'){charts1.exportChart();}
					}	
				});
				
			});
			
			//2번차트 부터 시작
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3013"  || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
					tblId == "DT_1EP_3016" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || 
					tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "ALL";
				objL4 = "";
			}else if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009") {
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "";
				objL4 = "";
			}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3035") {
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "ALL";
				objL4 = "";
			}else if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021") {
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "ALL";
				objL4 = "";
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "ALL";
				objL4 = "ALL";
			}else if(tblId == "DT_1EP_3005") {
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "";
				objL4 = "";
			}else if(tblId == "DT_1EP_3006") {
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "";
				objL4 = "";
			}
			
			//2번~6번 차트 param
			var param = {
				'apiKey' : apiKey,
				'itmId' : "T00",		//항목
				'objL1' : objL1,		//분류1(첫번째 분류코드) 
				'objL2' : objL2,		//분류2(두번째 분류코드)
				'objL3' : objL3,		//분류3(세번째 분류코드)
				'objL4' : objL4 ,		//분류4(네번째 분류코드)
				'format' : "json",		//결과 유형(json)
				'jsonVD' : "Y",			
				'prdSe' : "Y",			//수록주기
				'startPrdDe': prdDe,	//년도별 데이터
				'newEstPrdCnt' : "1",	//최근수록시점 개수 
				'loadGubun' : "2",		//조회구분(1 시계열 / 2 횡단면)
				'orgId' : "101",		//기관ID
				'tblId' : tblId			//통계표ID
			}
			//2번~6번 차트 데이터
			$.ajax({
				url: proxy+'https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList',
				type: 'get',
				async: false,
				data: param,
				dataType: "json"
			}).done(function(res) {
				//console.log("===================== 2 ~ 6 chart =====================");
				currentData = res;
				//console.log(currentData);
			});
			//전년대비 데이터 호출(해당년도의 -1년도 데이터)
			let yearIf = "";
			if(tblId == "DT_1EP_3035") {
				yearIf = '2018';
			}else {
				yearIf = '2016';
			}
			if(prdDe > yearIf) {
				var paramPre = {
					'apiKey' : apiKey,
					'itmId' : "T00",		//항목
					'objL1' : objL1,		//분류1(첫번째 분류코드) 
					'objL2' : objL2,		//분류2(두번째 분류코드)
					'objL3' : objL3,		//분류3(세번째 분류코드)
					'objL4' : objL4 ,		//분류4(네번째 분류코드)
					'format' : "json",		//결과 유형(json)
					'jsonVD' : "Y",			
					'prdSe' : "Y",			//수록주기
					'startPrdDe': prdDe-1,	//년도별 데이터
					'newEstPrdCnt' : "1",	//최근수록시점 개수
					'loadGubun' : "2",		//조회구분(1 시계열 / 2 횡단면)
					'orgId' : "101",		//기관ID
					'tblId' : tblId			//통계표ID
				}
				$.ajax({
					url: proxy+'https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList',
					type: 'get',
					async: false,
					data: paramPre,
					dataType: "json"
				}).done(function(res) {
					//console.log("=============전년대비 -1년도 데이터 호출=============");
					preData = res;
					//console.log(preData);
					//1번 여러개 차트 데이터
				});
			}
			setTimeout(function() {
				$more1DashDetail.ui.makeChartData(currentData, preData);
			}, 300);
		},
		makeChartData : function(res, preData){
			//console.log("========================가공데이터===========================");
			//console.log(res);
			//console.log(preData); //전년도 데이터 preData != undefined
			var tblNm = res[0].TBL_NM;
			var tblId = res[0].TBL_ID;
			
			let pieColor2 = new Array;
			let pieColor3 = new Array;
			
			
			//각차트 버튼 초기화
			$(".chartButton1").empty();
			$(".chartButton3").empty();
			$(".chartButton4").empty();
			$(".chartButton5").empty();
			$(".chartButton3_1").empty();
			$(".chartButton4_1").empty();
			$(".chartButton5_1").empty();
			$(".chartButton51_1").empty();
			$(".chartButton6_1").empty();
			$(".chartButton6").empty();
			
			$("select1").empty();
			$("select3").empty();
			$("select4").empty();
			$("select5").empty();
			$("select6").empty();
			
			var totJob = Number(res[0].DT);
			
			//가공된 데이터의 배열
			var chartVal1 = new Array;		//1번
			var chartVal2 = new Array;		//2번
			var chartVal2_1 = new Array;	//2_1번
			var chartVal3 = new Array; 		//3번
			var chartVal4_1 = new Array; 	//4번
			var chartVal4_2 = new Array; 	//4번
			var chartVal4_3 = new Array; 	//4번
			var chartVal5_1 = new Array; 	//5번
			var chartVal5_2 = new Array; 	//5번
			var chartVal6 = new Array; 		//6번
			
			var industryTotVal = new Array;
			
			var newJobVal = new Array;	//6번 올해 데이터
			var preJobVal = new Array;	//6번 전년도 데이터
			
			var legendNm = new Array;
			var legendDT = new Array;
			var legendNm3 = new Array;
			var legendNm4 = new Array;
			var legendNm5 = new Array;
			var legendDT3 = new Array;
			
			var legendNm55 = new Array;
			var legendColor5 = new Array;
			var legendColor55 = new Array;
			var legend13;
			var legend51;
			var legend52;
			
			let colorsCnt1 = 0;
			let colorsCnt2 = 0;
			
			var seriesyearData2 = new Array;  	//2번 차트에 들어갈 최종데이터 배열
			var seriesyearData3 = new Array; 	//3번 차트에 들어갈 최종데이터 배열
			var seriesyearData4 = new Array; 	//4번 차트에 들어갈 최종데이터 배열
			var seriesyearData5 = new Array; 	//5번 차트에 들어갈 최종데이터 배열
			var seriesyearData6 = new Array; 	//6번 차트에 들어갈 최종데이터 배열
			
			var xAxis4 = new Array;			//4번카테고리
			var xAxis5 = new Array;			//5번카테고리
			var xAxis55 = new Array;		//5번카테고리
			var xAxis6 = new Array;			//6번카테고리

			var categories5 = new Array;			//6번카테고리
			
			
			//var chartColor = 	['#7CB5EC', '#F7A35C', '#F15C80', '#90ED7D', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#7CB5EC', '#f7A35C']; //1, 2, 3, 5, 6번 차트 11개
			//var chartColor = ['#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#7CB5EC', '#f7A35C']; //1, 2, 3, 5, 6번 차트 11개
			/*var treeMapColor4 = ['#7CB5EC', '#F7A35C', '#F15C80', '#90ED7D', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#FFDA55', '#70658B', 
								 '#55CCFF', '#AD46E0', '#906D3B', '#A828A8', '#FFCD28', '#DCAD67', '#FF7E9D', '#48DAD2', '#BB55FF', '#B9E2FA']; //4번차트(산업분류)*/
			var treeMapColor4 = []; //4번차트(산업분류)
			
			let prdDe = res[0].PRD_DE; //현재년도 
			let prePrdDe = (res[0].PRD_DE)-1; //현재년도 -1
			
			let categories = new Array;
			let selectNm = new Array;
			//4번 트리맵차트 변수
			var chartDataNm4 = new Array;
			var chartDataDt1 = new Array;
			var chartDataDt2 = new Array;
			var chartDataDt3 = new Array;
			var chartQuantity;
			
			//버튼 수에 따른 차트페이지 일괄 추가
			$(".tabArea .tabBox").removeClass("on");
			$(".tabArea3 .tab_content").remove(); //3번 차트 비우기
			$(".tabArea4 .tab_content").remove(); //4번 차트 비우기
			$(".tabArea5 .tab_content").remove(); //5번 차트 비우기
			$(".tabArea5_1 .tab_content").remove(); //5번 차트 비우기
			$(".tabArea6 .tab_content").remove(); //6번 차트 비우기
			
			let count;
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" ||
			   tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				count = 4;
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
					 tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019") {
				count = 6;
			}else if(tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023") {
				count = 11;
			}else if(tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029") {
				count = 13;
			}else if(tblId == "DT_1EP_3030") {
				count = 9;
			}else if(tblId == "DT_1EP_3005") {
				count = 23;
			}
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002") { //차트크기수정
				$(".tabArea3").append("<div id='tab31' class='tab_content on'><div class='chartbox'><figure class='highcharts-figure'>" +
									  "<div class='chart31' id='chart31' style='width:410px; height:240px'></div></figure></div></div>");
				$(".tabArea4").append("<div id='tab41' class='tab_content on'><div class='chartbox'><figure class='highcharts-figure'>" +
									  "<div class='chart41' id='chart41' style='width:575px; height:435px;'</div></figure></div></div>");
				$(".tabArea6").append("<div id='tab61' class='tab_content on'><div class='chartbox'><figure class='highcharts-figure'>" +
									  "<div class='chart61' id='chart61' style='width:790px; height:195px;'></div></figure></div>");
				for(let i = 1; i < 3; i++) {
					$(".tabArea5").append("<div id='tab5"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart5"+i+"' id='chart5"+i+"' style='width:790px; height:195px;'></div></figure></div></div>");
				}
			}else if(tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009") {
				$(".tabArea3").append("<div id='tab31' class='tab_content on'><div class='chartbox'><figure class='highcharts-figure'>" +
									  "<div class='chart31' id='chart31' style='width:410px; height:240px'></div></figure></div></div>");
				$(".tabArea4").append("<div id='tab41' class='tab_content on'><div class='chartbox'><figure class='highcharts-figure'>" +
									  "<div class='chart41' id='chart41' style='width:575px; height:435px;'</div></figure></div></div>");
				$(".tabArea5").append("<div id='tab51' class='tab_content on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:790px; height:195px;'></div>"+
									  "</figure></div></div>");
				$(".tabArea6").append("<div id='tab61' class='tab_content on'><div class='chartbox'><figure class='highcharts-figure'>" +
									  "<div class='chart61' id='chart61' style='width:790px; height:195px;'></div></figure></div>");
			}
			else if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || 
					tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3021" || 
					tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || 
					tblId == "DT_1EP_3029" || tblId == "DT_1EP_3032") {
				for(let i = 1; i < count; i++) { 
					$(".tabArea3").append("<div id='tab3"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart3"+i+"' id='chart3"+i+"' style='width:410px; height:240px'></div></figure></div></div>");
					$(".tabArea4").append("<div id='tab4"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart4"+i+"' id='chart4"+i+"' style='width:575px; height:435px;'</div></figure></div></div>");
					$(".tabArea5").append("<div id='tab5"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure' >" +
										  "<div class='chart5"+i+"' id='chart5"+i+"' style='width:790px; height:195px;'></div></figure></div></div>");
					$(".tabArea6").append("<div id='tab6"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart6"+i+"' id='chart6"+i+"' style='width:790px; height:195px;'></div></figure></div>");
				}
			}else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" ||
					 tblId == "DT_1EP_3031") {
				/*$(".tabArea4").append("<div id='tab1' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
									  "<div class='charts1' id='charts1' style='width:578px; height:405px; margin-top:5px;'</div></figure></div></div>");*/
				for(let i = 1; i < count; i++) { 
					/*$(".tabArea4").append("<div id='tab1"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='charts1"+i+"' id='charts1"+i+"' style='width:578px; height:405px; margin-top:5px;'</div></figure></div></div>");*/
					$(".tabArea5").append("<div id='tab4"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart4"+i+"' id='chart4"+i+"' style='width:795px; height:445px; margin-top:5px; margin-left:-5px;'</div></figure></div></div>");
					$(".tabArea5_1").append("<div id='tab5"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure' >" +
										  "<div class='chart5"+i+"' id='chart5"+i+"' style='width:785px; height:225px; margin-top:5px;'></div></figure></div></div>");
				}
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" ) {
				for(let i = 1; i < count; i++) { 
					$(".tabArea3").append("<div id='tab3"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart3"+i+"' id='chart3"+i+"' style='width:410px; height:240px'></div></figure></div></div>");
					$(".tabArea4").append("<div id='tab4"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart4"+i+"' id='chart4"+i+"' style='width:578px; height:405px; margin-top:5px;'</div></figure></div></div>");
					$(".tabArea5").append("<div id='tab5"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure' >" +
										  "<div class='chart5"+i+"' id='chart5"+i+"' style='width:785px; height:195px;'></div></figure></div></div>");
					$(".tabArea6").append("<div id='tab6"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart6"+i+"' id='chart6"+i+"' style='width:785px; height:195px;'></div></figure></div>");
				}
			}else if(tblId == "DT_1EP_3035") {
				for(let i = 1; i < count; i++) { 
					$(".tabArea3").append("<div id='tab3"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart3"+i+"' id='chart3"+i+"' style='width:410px; height:240px; margin-top:0px;'></div></figure></div></div>");
					$(".tabArea4").append("<div id='tab4"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart4"+i+"' id='chart4"+i+"' style='width:575px; height:435px;'</div></figure></div></div>");
					$(".tabArea5").append("<div id='tab5"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure' >" +
										  "<div class='chart5"+i+"' id='chart5"+i+"' style='width:790px; height:195px;'></div></figure></div></div>");
					$(".tabArea6").append("<div id='tab6"+i+"' class='tab_content'><div class='chartbox'><figure class='highcharts-figure'>" +
										  "<div class='chart6"+i+"' id='chart6"+i+"' style='width:790px; height:195px;'></div></figure></div>");
				}
			}
			pieColor2 = [ '#7CB5EC', '#F15C80', '#F7A35C'];
			if(tblId == "DT_1EP_3001") { //조직형태
				pieColor3 = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			}else if(tblId == "DT_1EP_3002") { //기업규모
				pieColor3 = ['#7CB5EC', '#F15C80', '#F7A35C'];
			}else if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010") { //종사자
				pieColor3 = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#F97A10', '#F7A35C', '#FBDBC0'];
			}else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") { //산업분류
				pieColor3 = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
							,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			}else if(tblId == "DT_1EP_3006" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021") { //성별
				pieColor3 = ['#7CB5EC', '#F15C80'];
			}else if(tblId == "DT_1EP_3007" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3035") { //연령대
				pieColor3 = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			}else if(tblId == "DT_1EP_3008" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3034") { //근속기간별
				pieColor3 = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			}else if(tblId == "DT_1EP_3009" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029") { //종사상지위별
				pieColor3 = ['#7CB5EC', '#F15C80'];
			}
			/*if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				$('.chart31').addClass("pieMargin");
			}else {
				$('.chart31').removeClass("pieMargin");
			}
			if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				$('.chart32').addClass("pieMargin");
			}else {
				$('.chart32').removeClass("pieMargin");
			}
			if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				$('.chart33').addClass("pieMargin");
			}else {
				$('.chart33').removeClass("pieMargin");
			}*/
			//DT_1EP_3005, DT_1EP_3011, DT_1EP_3016, DT_1EP_3020, DT_1EP_3024, DT_1EP_3028, DT_1EP_3030, DT_1EP_3031
			
			//마우스 휠 가로스크롤
			$('.division').mousewheel(function(e, delta) {
				this.scrollLeft -= (delta * 30);
				e.preventDefault();
			});
			$(".chartNm2").html(prdDe+"년 일자리형태별 일자리");
			
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
					 tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				$('#more1ChartTitle1_1').removeClass();
				$('#more1ChartTitle5').removeClass();
				$('#more1ChartTitle5_1').removeClass();
				$('#chartTitleMain5').removeClass();
				$('#chartTitleMain5').addClass("item-box flex-width-830 flex-height-800 mgT-10");
				$('#more1ChartTitle1_1').addClass("item flex-width-600 flex-height-790 mgT-10");
				$('#more1ChartTitle5').addClass("item flex-width-370 flex-height-500 flex-mgL-10");
				$('#more1ChartTitle5_1').addClass("item flex-width-370 flex-height-280 flex-mgL-10 flex-mgT-10");
				
				$('#more1ChartTitle1').hide();
				$('#more1ChartTitle1_1').show();
				$('#more1ChartTitle2').hide();
				$('#more1ChartTitle3').hide();
				$('#more1ChartTitle4').hide();
				$('#more1ChartTitle5').show();
				$('#more1ChartTitle5_1').show();
				$('#more1ChartTitle6').hide();
			}else {
				$('#chartTitleMain5').removeClass();
				$('#more1ChartTitle4').removeClass();
				$('#more1ChartTitle5').removeClass();
				$('#chartTitleMain5').addClass("item-box flex-width-830 flex-height-500");
				$('#more1ChartTitle4').addClass("item flex-width-600 flex-height-500");
				$('#more1ChartTitle5').addClass("item flex-width-830 flex-height-245 flex-mgL-10");
				
				$('#more1ChartTitle1').show();
				$('#more1ChartTitle1_1').hide();
				$('#more1ChartTitle2').show();
				$('#more1ChartTitle3').show();
				$('#more1ChartTitle4').show();
				$('#more1ChartTitle5').show();
				$('#more1ChartTitle5_1').hide();
				$('#more1ChartTitle6').show();
			}
			$('#more1ChartTitle1_1 .tabArea .tabBox:eq(0)').addClass('on');
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			
			if(res[0].TBL_NM == "조직형태별 일자리") {
				var c1ObjNm = res[0].C1_OBJ_NM;
				var c1Nm = res[0].C1_NM;
				//차트별 이름지정
				$(".chartNm3").html(prdDe+"년 조직형태별 일자리");
				$(".chartNm4").html(prdDe+"년 조직형태별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 조직형태별 신규, 소멸일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 조직형태별 일자리 증감");
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 조직형태별 일자리");
				$('.tabs').empty();
				categories = ['회사법인', '회사이외법인', '정부ㆍ비법인단체', '개인기업체'];
				
				
				// button popup 1
				$('.chartPopup1').on('click', function() {
					$('#pop_info_1').css("display", "block");
				});
				$('.btn_close').on('click', function() {
					$('#pop_info_1').css("display", "none");
				});
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00") {
						if(res[i].C2 == "10" || res[i].C2 == "20" || res[i].C2 == "30") {
							chartVal2.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C2_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					
					//3번차트 데이터
					if(res[i].C2 == "00") {
						if(res[i].C1 == "10" || res[i].C1 == "20" || res[i].C1 == "30" || res[i].C1 == "40") {
							chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C1_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					
					//4번차트 데이터
					if(res[i].C2 == "10" && res[i].C1 != "00") {
						chartVal4_1.push(Number(res[i].DT));
					}
					if(res[i].C2 == "20" && res[i].C1 != "00") {
						chartVal4_2.push(Number(res[i].DT));
					}
					if(res[i].C2 == "30" && res[i].C1 != "00") {
						chartVal4_3.push(Number(res[i].DT));
					}
					//5번차트 데이터
					if(res[i].C2 == "31" && res[i].C1 != "00"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C2_NM);
					}
					if(res[i].C2 == "33" && res[i].C1 != "00"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C2_NM);
					}
					//6번차트 현재년도 데이터
					if(res[i].PRD_DE == prdDe && res[i].C2 == "00") {
						if(res[i].C1 == "10" || res[i].C1 == "20" || res[i].C1 == "30" || res[i].C1 == "40") {
							newJobVal.push(Number(res[i].DT));
						}
					}
					if(preData != undefined) {
						//6번차트 작년 데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C2 == "00") {
							if(preData[i].C1 == "10" || preData[i].C1 == "20" || preData[i].C1 == "30" || preData[i].C1 == "40") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<newJobVal.length; i++) {
						chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
					}
				}
			}else if(res[0].TBL_NM == "기업규모별 일자리") {
				$('.tabs').empty();
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 기업규모별 일자리");
				$(".chartNm3").html(prdDe+"년 기업규모별 일자리");
				$(".chartNm4").html(prdDe+"년 기업규모별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 기업규모별 신규, 소멸일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 기업규모별 일자리 증감");
				categories =  ['대기업', '중소기업', '비영리기업'];
				//2번
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C2 == "10" || res[i].C2 == "20" || res[i].C2 == "30") {
						if(res[i].C1_NM == "총 계") {
							chartVal2.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C2_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
						if(res[i].C2 == "00") {
							chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C1_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
						if(res[i].C2 == "10") {
							chartVal4_1.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
						if(res[i].C2 == "20") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
						if(res[i].C2 == "30") {
							chartVal4_3.push(Number(res[i].DT));
						}
					}
					//5번차트 데이터
					if(res[i].C2 == "31"){
						if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
							chartVal5_1.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					if(res[i].C2 == "33"){
						if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
							chartVal5_2.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					//6번차트 현재년도 데이터
					if(res[i].PRD_DE == prdDe && res[i].C2 == "00") {
						if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						//6번차트 작년 데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C2 == "00") {
							if(preData[i].C1 == "11" || preData[i].C1 == "12" || preData[i].C1 == "20") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<newJobVal.length; i++) {
						chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
					}
				}
			}else if(res[0].TBL_NM == "종사자규모별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사자규모별 일자리");
				$('.tabs li a').css("padding", "6px 10px");
				//차트별 이름 지정
				$(".chartNm3").html(prdDe+"년 기업규모별 종사자규모별 일자리");
				$(".chartNm4").html(prdDe+"년 기업규모별 종사자규모별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 기업규모별 종사자규모별 신규, 소멸일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 기업규모별 일자리규모별 일자리 증감");
				
				//x축 카테고리 변경
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계") {
						if(res[i].C2_NM != "총 계" && res[i].C3_NM == "총 계") {
							categories.push(res[i].C2_NM);
						}
					}
					if(res[i].C1_NM != "총 계") {
						if(res[i].C2_NM == "총 계" && res[i].C3_NM == "총 계") {
							selectNm.push(res[i].C1_NM);
						}
					}
				}
				//차트 데이터 
				for(var i=0; i<res.length; i++) {
					//2번 데이터
					if(res[i].C3 == "10" || res[i].C3 == "20" || res[i].C3 == "30") {
						if(res[i].C1 == "00" && res[i].C2 == "00") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						if(res[i].C2 == "10" || res[i].C2 == "20" || res[i].C2 == "30" || res[i].C2 == "40" || res[i].C2 == "50" || res[i].C2 == "60" || res[i].C2 == "70"|| res[i].C2 == "80" || res[i].C2 == "90") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}  
					}
					//4번 차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push(Number(res[i].DT));
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "20") {
						chartVal4_2.push(Number(res[i].DT));
					}  
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_3.push(Number(res[i].DT));
					}
					//5번 차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "33"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번 현재년도 데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						newJobVal.push(Number(res[i].DT)); 
					}
				}
				if(preData != undefined) {
					//6번 작년 데이터
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C2 != "00" && preData[i].C3 == "00") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<newJobVal.length; i++) {
						chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
					}
				}
				
			}else if(res[0].TBL_NM == "산업분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 산업분류별 일자리");
				$('.tabs li a').css("padding", "6px 10px");
				$('.tabArea5 .tab li a').css("padding", "6px 14px");
				$('.tabArea6 .tab li a').css("padding", "6px 11px");
				$(".chartNm5").html(prdDe+"년 산업분류별(대분류, 중분류) 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 산업분류별(대분류, 중분류) 신규, 소멸일자리");
				
				let count = new Array;
				//산업분류별 정렬
				res.sort(function(a, b){
					return a.C1 - b.C1;
				});
				let cate = new Array
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400" || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800"
						|| res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500"
						|| res[i].C1 == "1600" || res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100") {
						if(res[i].C2 == "00") {cate.push(res[i].C1_NM);}
					}
				}
				categories = cate;
				for(let i=1; i<22; i++) {
					count.push(i);
				}
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//4번차트 데이터
					if(res[i].C2 == "00") {
						if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400"  || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800" || 
								res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500" || res[i].C1 == "1600" 
									|| res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
						}
					}
					if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400"  || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800" || 
							res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500" || res[i].C1 == "1600" 
								|| res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100") {
						colorsCnt2 += 1;
						if(res[i].C2 == "10" ) {
							chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1/*, colorValue: colorsCnt2*/});
						}else if(res[i].C2 == "20") {
							chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1/*, colorValue: colorsCnt2*/});
						}else if(res[i].C2 == "30") {
							chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1/*, colorValue: colorsCnt2*/});
						}
					}
					//5번차트 데이터
					if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400" || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800"
						|| res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500"
							|| res[i].C1 == "1600" || res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100"){
						if(res[i].C2 == "31") {
							chartVal5_1.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
						if(res[i].C2 == "00") {
							industryTotVal.push(Number(res[i].DT));
							legendNm3.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400" || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800"
						|| res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500"
							|| res[i].C1 == "1600" || res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100"){
						if(res[i].C2 == "33") {
							chartVal5_2.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
				}
				selectNm = legendNm3;
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i], chartDataDt3[i]);
				}
				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false, //visible
							formatter: function () {
								//this.point.visible = true;
								return "qkfh";
							}
						},
					}],
					data: chartVal2_1,
					colors: industryColor
				});
				//6번차트 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "성별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 성별 일자리");
				$(".chartNm3").html(prdDe+"년 성별 일자리");
				$(".chartNm4").html(prdDe+"년 성별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 성별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 성별 일자리 증감");
				categories =  ['남자', '여자'];
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "0") {
						if(res[i].C2 == "10" || res[i].C2 == "30") {
							chartVal2.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C2_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "1" && res[i].C2 == "00" || res[i].C1 == "2" && res[i].C2 == "00") {
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
						legendNm3.push(res[i].C1_NM);
						legendDT3.push(Number(res[i].DT));
					}
					//4번차트 데이터
					if(res[i].C2 == "10") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					if(res[i].C2 == "30") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					//5번차트 데이터
					if(res[i].C2 == "31"){
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal5_1.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					if(res[i].C2 == "32"){
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal5_2.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					//6번차트 데이터
					if(res[i].PRD_DE == prdDe && res[i].C2 == "00") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C2 == "00") {
							if(preData[i].C1 == "1" || preData[i].C1 == "2") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번차트 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "연령대별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 연령대별 일자리");
				$(".chartNm3").html(prdDe+"년 연령대별 일자리");
				$(".chartNm4").html(prdDe+"년 연령대별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 연령대별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 연령대별 일자리 증감");
				//데이터 나이순 정렬
				res.sort(function(a, b){
					return a.C1 - b.C1;
				});
				preData.sort(function(a, b){
					return a.C1 - b.C1;
				});
				// x축 카테고리 변경
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM != "총 계") {
						if(res[i].C2_NM == "총 계") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00") {
						if(res[i].C2 == "10" || res[i].C2 == "30") {
							chartVal2.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C2_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 != "00" && res[i].C2 == "00") {
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
						legendNm3.push(res[i].C1_NM);
						legendDT3.push(Number(res[i].DT));
					}
					//4번차트 데이터
					if(res[i].C1 != "00") {
						if(res[i].C2 == "10") {
							chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					if(res[i].C1 != "00") {
						if(res[i].C2 == "30") {
							chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					//5번차트 데이터
					if(res[i].C1 != "00"){
						if(res[i].C2 == "31") {
							chartVal5_1.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "00"){
						if(res[i].C2 == "32") {
							chartVal5_2.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					//6번차트 데이터
					if(res[i].PRD_DE == prdDe && res[i].C2 == "00") {
						if(res[i].C1 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C2 == "00") {
							if(preData[i].C1 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				
				//6번차트 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "근속기간별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 근속기간별 일자리");
				$(".chartNm3").html(prdDe+"년 근속기간별 일자리");
				$(".chartNm4").html(prdDe+"년 근속기간별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 근속기간별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 근속기간별 일자리 증감");
				//x축 y축 변경
				for(var i=0; i<res.length; i++){
					if(res[i].C2 == "00") {
						if(res[i].C1 != "00") {
							categories.push(res[i].C1_NM);
							//3번차트 데이터
							chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C1_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				legendColor1 = ['#7CB5EC', '#F7A35C'];
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00") {
						if(res[i].C2 == "10" || res[i].C2 == "30") {
							chartVal2.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C2_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 != "00") {
						if(res[i].C2 == "10") {
							chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					if(res[i].C1 != "00") {
						if(res[i].C2 == "30") {
							chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					//5번차트 데이터
					if(res[i].C1 != "00"){
						if(res[i].C2 == "31") {
							chartVal5_1.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "00"){
						if(res[i].C2 == "32") {
							chartVal5_2.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					//6번차트 현재년도 데이터
					if(res[i].PRD_DE == prdDe && res[i].C2_NM == "총 계") {
						if(res[i].C1_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					//6번차트 작년데이터 
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C2_NM == "총 계") {
							if(preData[i].C1_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				
				//6번데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사상지위별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사상지위별 일자리");
				$(".chartNm3").html(prdDe+"년 종사상지위별 일자리");
				$(".chartNm4").html(prdDe+"년 종사상지위별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 종사상지위별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 종사상지위별 일자리 증감");
				
				categories =  ['임금일자리', '비임금일자리'];
				legendColor1 = ['#7CB5EC', '#F7A35C'];
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00") {
						if(res[i].C2 == "10" || res[i].C2 == "30") {
							chartVal2.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C2_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "10" && res[i].C2 == "00" || res[i].C1 == "20" && res[i].C2 == "00") {
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
						legendNm3.push(res[i].C1_NM);
						legendDT3.push(Number(res[i].DT));
					}
					//4번차트 데이터
					if(res[i].C2 == "10") {
						if(res[i].C1 == "10" || res[i].C1 == "20") {
							chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					if(res[i].C2 == "30") {
						if(res[i].C1 == "10" || res[i].C1 == "20") {
							chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					//5번차트 데이터
					if(res[i].C2 == "31"){
						if(res[i].C1 == "10" || res[i].C1 == "20") {
							chartVal5_1.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					if(res[i].C2 == "32"){
						if(res[i].C1 == "10" || res[i].C1 == "20") {
							chartVal5_2.push(Number(res[i].DT));
							categories5.push(res[i].C2_NM);
						}
					}
					//6번차트 데이터
					if(res[i].PRD_DE == prdDe && res[i].C2 == "00") {
						if(res[i].C1 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C2 == "00") {
							if(preData[i].C1 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "조직형태별 종사자규모별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 조직형태별 종사자규모별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea6 .tabs.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 조직형태별 종사자규모별 일자리");
				$(".chartNm4").html(prdDe+"년 조직형태별 종사자규모별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 조직형태별 종사자규모별 신규, 소멸일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 조직형태별 종사자규모별 일자리 증감");
				
				categories =  ['회사법인', '회사이외법인', '정부 · 비법인단체', '개인기업체'];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
							//categories.push(res[i].C2_NM);
						}
					}
				}
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번 차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "20" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
							
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "20") {
						chartVal4_2.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_3.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "33"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재년도 데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						//6번차트 작년 데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번차트 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "조직형태별 산업대분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 조직형태별 산업대분류별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea6 .tabs.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm1_3").text("산업대분류별");
				$(".chartNm3").html(prdDe+"년 산업대분류별 일자리");
				$(".chartNm5").html(prdDe+"년 조직형태별 산업대분류별 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 조직형태별 산업대분류별 신규, 소멸일자리");
				
				$(".chartNm6").html(prdDe+"년 전년대비 조직형태별 산업대분류별 일자리 증감");
				
				categories =  ['회사법인', '회사이외법인', '정부 · 비법인단체', '개인기업체'];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "20" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));

						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryTotVal.push(Number(res[i].DT));
					}
					if(res[i].C1 == "00" && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "20") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt3.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "33"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재년도 데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						//6번차트 작년 데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//4번차트 데이터 가공
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i], chartDataDt3[i]);
				}
				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: chartVal2_1
				});
				//6번차트 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "조직형태별 성별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 조직형태별 성별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea6 .tabs.chartButton6 li a').css("padding", "4px 3px");
				
				$(".chartNm1_3").text("성별");
				$(".chartNm3").html(prdDe+"년 조직형태별 성별 일자리");
				$(".chartNm4").html(prdDe+"년 조직형태별 성별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 조직형태별 성별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 조직형태별 성별 일자리 증감");
				
				categories =  ['회사법인', '회사이외법인', '정부 · 비법인단체', '개인기업체'];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "0") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "0") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "0") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						//6번차트 작년데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "0") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번차트 데이터가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "조직형태별 연령대별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 조직형태별 연령대별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm1_3").text("연령대별");
				$(".chartNm3").html(prdDe+"년 조직형태별 연령대별 일자리");
				$(".chartNm4").html(prdDe+"년 조직형태별 연령대별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 조직형태별 연령대별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 조직형태별 연령대별 일자리 증감");
				res.sort(function(a, b){
					return a.C2 - b.C2;
				});
				preData.sort(function(a, b){
					return a.C2 - b.C2;
				});
				categories =  ['회사법인', '회사이외법인', '정부 · 비법인단체', '개인기업체'];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						//6번차트 작년데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "조직형태별 근속기간별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 조직형태별 근속기간별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				
				$(".chartNm3").html(prdDe+"년 조직형태별 근속기간별 일자리");
				$(".chartNm4").html(prdDe+"년 조직형태별 근속기간별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 조직형태별 근속기간별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 조직형태별 근속기간별 일자리 증감");
				
				categories =  ['회사법인', '회사이외법인', '정부 · 비법인단체', '개인기업체'];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//2번
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					//6번차트 작년데이터
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				
				//6번차트 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "조직형태별 종사상지위별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 조직형태별 종사상지위별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 조직형태별 종사상지위별 일자리");
				$(".chartNm4").html(prdDe+"년 조직형태별 종사상지위별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 조직형태별 종사상지위별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 조직형태별 종사상지위별 일자리 증감");
				
				categories =  ['회사법인', '회사이외법인', '정부 · 비법인단체', '개인기업체'];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					//6번차트 작년데이터
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번차트 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "기업규모별 산업대분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 기업규모별 산업대분류별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				
				$(".chartNm5").html(prdDe+"년 기업규모별 산업대분류별 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 기업규모별 산업대분류별 신규, 소멸일자리");
				categories = ["대기업", "중소기업", "비영리기업"];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "20" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryTotVal.push(Number(res[i].DT));
					}
					if(res[i].C1 == "00" && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "20") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt3.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "33"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						//6번차트 작년데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}

				//4번차트 데이터 가공
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i], chartDataDt3[i]);
				}
				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: chartVal2_1
				});
				//6번차트 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "기업규모별 성별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 기업규모별 성별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				
				$(".chartNm3").html(prdDe+"년 기업규모별 성별 일자리");
				$(".chartNm4").html(prdDe+"년 기업규모별 성별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 기업규모별 성별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 기업규모별 성별 일자리 증감");
				
				categories = ["대기업", "중소기업", "비영리기업"];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "0") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "0") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "0") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "0") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						//6번차트 작년데이터
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "0") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				
				//6번 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "기업규모별 연령대별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 기업규모별 연령대별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 기업규모별 연령대별 일자리");
				$(".chartNm4").html(prdDe+"년 기업규모별 연령대별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 기업규모별 연령대별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 기업규모별 연령대별 일자리 증감");
				//연령대순 정렬
				res.sort(function(a, b){
					return a.C2 - b.C2;
				});
				preData.sort(function(a, b){
					return a.C2 - b.C2;
				});
				categories = ["대기업", "중소기업", "비영리기업"];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10")chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30")chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00")newJobVal.push(Number(res[i].DT));
					}
					if(preData != undefined) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00")preJobVal.push(Number(preData[i].DT));
						}
					}
				}
				//6번 차트 가공
				for(var i=0; i<newJobVal.length; i++)chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
			}else if(res[0].TBL_NM == "기업규모별 근속기간별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 기업규모별 근속기간별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				
				$(".chartNm3").html(prdDe+"년 기업규모별 근속기간별 일자리");
				$(".chartNm4").html(prdDe+"년 기업규모별 근속기간별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 기업규모별 근속기간별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 기업규모별 근속기간별 일자리 증감");
				
				categories = ["대기업", "중소기업", "비영리기업"];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 데이터
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					//6번차트 작년데이터
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				
				//6번차트 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사자규모별 산업대분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사자규모별 산업대분류별 일자리");
				//$('.chartButton1').append("<li class='on'><a href='#!'>총계</a></li><li><a class='chartNm1_1' href='#!'>종사자규모별</a></li><li><a class='chartNm1_1' href='#!'>산업대분류별</a></li>");
				$('.tabs li a').css("padding", "6px 10px");
				$('.tabArea5 .tab li a').css("padding", "6px 14px");
				$('.tabArea6 .tab li a').css("padding", "6px 11px");
				$(".chartNm5").html(prdDe+"년 종사자규모별 산업대분류별 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 종사자규모별 산업대분류별 신규, 소멸일자리");
				//categories
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C2 == "00" && res[i].C3 == "00") {
						if(res[i].C1 != "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "20" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번차트 
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryTotVal.push(Number(res[i].DT));
					}
					if(res[i].C1 == "00" && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "20") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt3.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
					//5번차트 
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "33"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번차트
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//4번차트 데이터 가공
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i], chartDataDt3[i]);
				}

				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100));
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: chartVal2_1
				});			
				//5번차트 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사자규모별 성별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사자규모별 성별 일자리");
				$('.tabs li a').css("padding", "6px 10px");
				$('.tabArea5 .tab li a').css("padding", "6px 14px");
				$('.tabArea6 .tab li a').css("padding", "6px 11px");
				$(".chartNm3").html(prdDe+"년 종사자규모별 성별 일자리");
				$(".chartNm4").html(prdDe+"년 종사자규모별 성별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 종사자규모별 성별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 종사자규모별 성별 일자리 증감");
				
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C2 == "0" && res[i].C3 == "00") {
						if(res[i].C1 != "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//차트 데이터
				for(var i=0; i<res.length; i++) {
					//2번
					if(res[i].C1 == "00" && res[i].C2 == "0") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "0") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번
					if(res[i].C1 == "00" && res[i].C3 == "31"){
						if(res[i].C2 == "1") {
							chartVal5_1.push(Number(res[i].DT));
							categories5.push(res[i].C3_NM);
						}
						if(res[i].C2 == "2") {
							chartVal5_1.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 == "00" && res[i].C3 == "32"){
						if(res[i].C2 == "1") {
							chartVal5_2.push(Number(res[i].DT));
							categories5.push(res[i].C3_NM);
						}
						if(res[i].C2 == "2") {
							chartVal5_2.push(Number(res[i].DT));
						}
					}
					//6번
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "0") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "0") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번차트 가공 (올해년도 - 작년)
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사자규모별 연령대별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사자규모별 연령대별 일자리");
				//$('.chartButton1').append("<li class='on'><a href='#!'>총계</a></li><li><a class='chartNm1_1' href='#!'>종사자규모별</a></li><li><a class='chartNm1_1' href='#!'>연령대별</a></li>");
				$('.tabs li a').css("padding", "6px 10px");
				$('.tabArea5 .tab li a').css("padding", "6px 14px");
				$('.tabArea6 .tab li a').css("padding", "6px 11px");
				
				$(".chartNm3").html(prdDe+"년 종사자규모별 연령대별 일자리");
				$(".chartNm4").html(prdDe+"년 종사자규모별 연령대별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 종사자규모별 연령대별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 종사자규모별 연령대별 일자리 증감");
				//연령대순 정렬
				res.sort(function(a, b){
					return a.C2 - b.C2;
				});
				preData.sort(function(a, b){
					return a.C2 - b.C2;
				});
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C2 == "00" && res[i].C3 == "00") {
						if(res[i].C1 != "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번
					if(res[i].C1 == "00" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData != undefined) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번차트 데이터가공 (현재년도 - 작년도)
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사자규모별 근속기간별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사자규모별 근속기간별 일자리");
				//$('.chartButton1').append("<li class='on'><a href='#!'>총계</a></li><li><a class='chartNm1_1' href='#!'>종사자규모별</a></li><li><a class='chartNm1_1' href='#!'>근속기간별</a></li>");
				$('.tabs li a').css("padding", "6px 10px");
				$('.tabArea5 .tab li a').css("padding", "6px 14px");
				$('.tabArea6 .tab li a').css("padding", "6px 11px");
				$(".chartNm3").html(prdDe+"년 종사자규모별 근속기간별 일자리");
				$(".chartNm4").html(prdDe+"년 종사자규모별 근속기간별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 종사자규모별 근속기간별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 종사자규모별 근속기간별 일자리 증감");
				
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C2 == "00" && res[i].C3 == "00") {
						if(res[i].C1 != "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계") {
						if(res[i].C3_NM == "지속일자리" || res[i].C3_NM == "신규채용일자리") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
				}
				//3번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				//4번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "지속일자리") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "신규채용일자리") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
				}
				//6번
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
					
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "성별 산업대분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 성별 산업대분류별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm5").html(prdDe+"년 성별 산업대분류별 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 성별 산업대분류별 신규채용일자리");
				
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "0" && res[i].C3 == "00") {
						if(res[i].C2 == "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번
					if(res[i].C1 == "0" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryTotVal.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
					//5번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번 올해데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					//6번 작년데이터
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//4번차트 데이터가공
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i]);
				}

				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: chartVal2_1
				});		
				//6번 데이터가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "성별 연령대별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 성별 연령대별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 성별 연령대별 일자리");
				$(".chartNm4").html(prdDe+"년 성별 연령대별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 성별 연령대별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 성별 연령대별 일자리 증감");
				//연령대순 정렬
				res.sort(function(a, b){
					return a.C2 - b.C2;
				});
				preData.sort(function(a, b){
					return a.C2 - b.C2;
				});
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "0" && res[i].C3 == "00") {
						if(res[i].C2 == "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//2번
				for(var i=0; i<res.length; i++) {
					//2번
					if(res[i].C1 == "0" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					
					//4번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번
					if(res[i].PRD_DE == prdDe && res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "0" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "성별 근속기간별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 성별 근속기간별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");		
				$(".chartNm3").html(prdDe+"년 성별 근속기간별 일자리");
				$(".chartNm4").html(prdDe+"년 성별 근속기간별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 성별 근속기간별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 성별 근속기간별 일자리 증감");
				
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "0" && res[i].C3 == "00") {
						if(res[i].C2 == "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번
					if(res[i].C1 == "0" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번 올해데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					//6번 작년데이터
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "성별 종사상지위별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 성별 종사상지위별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				
				$(".chartNm3").html(prdDe+"년 성별 종사상지위별 일자리");
				$(".chartNm4").html(prdDe+"년 성별 종사상지위별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 성별 종사상지위별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 성별 종사상지위별 일자리 증감");
				
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "0" && res[i].C3 == "00") {
						if(res[i].C2 == "00") {
							categories.push(res[i].C1_NM);
						}
					}
				}
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번
					if(res[i].PRD_DE == prdDe && res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "0" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//6번 데이터 가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "연령대별 산업대분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 연령대별 산업대분류별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm5").html(prdDe+"년 연령대별 산업대분류별 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 연령대별 산업대분류별 신규채용일자리");
				//산업분류별 정렬
				res.sort(function(a, b){
					return a.C1 - b.C1;
				});
				let legendNm1 = new Array;
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM != "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM == "총 계") {
							legendNm1.push(res[i].C1_NM);
						}
					}
				}
				categories = legendNm1;
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계") {
						if(res[i].C3_NM == "지속일자리" || res[i].C3_NM == "신규채용일자리") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
				}
				//3번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				cate = legendNm3;
				//4번차트 데이터
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryTotVal.push(Number(res[i].DT));
					}
				}
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == "00" && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
				}
				//6번
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i]);
				}

				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: chartVal2_1
				});
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "연령대별 종사상지위별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 연령대별 종사상지위별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 연령대별 종사상지위별 일자리");
				$(".chartNm4").html(prdDe+"년 연령대별 종사상지위별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 연령대별 종사상지위별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 연령대별 종사상지위별 일자리 증감");
				//나이 순 정렬
				res.sort(function(a, b){
					return a.C1 - b.C1;
				});
				//x축 y축 변경
				var legendNm1 = new Array;
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM != "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM == "총 계") {
							legendNm1.push(res[i].C1_NM);
						}
					}
				}
				categories = legendNm1;
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계") {
						if(res[i].C3_NM == "지속일자리" || res[i].C3_NM == "신규채용일자리") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
				}
				//3번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				
				//4번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "지속일자리") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "신규채용일자리") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
				}
				//6번
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
				cate = legendNm3;
				
			}else if(res[0].TBL_NM == "근속기간별 산업대분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 근속기간별 산업대분류별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm5").html(prdDe+"년 근속기간별 산업대분류별 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 근속기간별 산업대분류별 신규채용일자리");
				
				//x축 y축 변경
				let legendNm1 = new Array;
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM != "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM == "총 계") {
							legendNm1.push(res[i].C1_NM);
						}
					}
				}
				categories = legendNm1;
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계") {
						if(res[i].C3_NM == "지속일자리" || res[i].C3_NM == "신규채용일자리") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
				}
				//3번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				cate = legendNm3;
				//4번차트 데이터
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryTotVal.push(Number(res[i].DT));
					}
					if(res[i].C1 == "00" && res [i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
				}
				//6번
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i]);
				}

				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: chartVal2_1
				});
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사상지위별 산업대분류별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사상지위별 산업대분류별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm5").html(prdDe+"년 종사상지위별 산업대분류별 일자리형태별 일자리");
				$(".chartNm5_1").html(prdDe+"년 종사상지위별 산업대분류별 신규채용일자리");
				categories =  ['임금일자리', '비임금일자리'];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
					//2번
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계") {
						if(res[i].C3_NM == "지속일자리" || res[i].C3_NM == "신규채용일자리") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번차트 데이터
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryTotVal.push(Number(res[i].DT));
					}
					if(res[i].C1 == "00" && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
					//5번
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				for(var i = 0; i < chartDataNm4.length; i++) {
					chartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i]);
				}
				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(percentVal < 4) {
									this.key = ". . .";
								}
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: chartVal2_1
				});
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사상지위별 근속기간별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사상지위별 근속기간별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 종사상지위별 근속기간별 일자리");
				$(".chartNm4").html(prdDe+"년 종사상지위별 근속기간별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 종사상지위별 근속기간별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 종사상지위별 근속기간별 일자리 증감");
				
				categories =  ['임금일자리', '비임금일자리'];

				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							cate.push(res[i].C2_NM);
						}
					}
				}
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계") {
						if(res[i].C3_NM == "지속일자리" || res[i].C3_NM == "신규채용일자리") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
				}
				//3번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				//4번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "지속일자리") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "신규채용일자리") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
				}
				//6번
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C2_NM != "총 계") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
					
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
				//데이터가 NaN이면 0으로 바꾸기
				for(let i = 0; i<chartVal5_1.length; i++) {
					if(isNaN(chartVal5_1[i])) {
						chartVal5_1[i] = 0;
					}
					if(isNaN(chartVal5_2[i])) {
						chartVal5_2[i] = 0;
					}
				}
			}else if(res[0].TBL_NM == "종사상지위별 성별 연령별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사상지위별 성별 연령별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 종사상지위별 성별 연령별 일자리");
				$(".chartNm4").html(prdDe+"년 종사상지위별 성별 연령별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 종사상지위별 성별 연령별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 종사상지위별 성별 연령별 일자리 증감");
				//연령대순 정렬
				res.sort(function(a, b){
					return a.C3 - b.C3;
				});
				preData.sort(function(a, b){
					return a.C3 - b.C3;
				});
				let legendNm12 = ["남자", "여자"];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계"  && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "총 계") {
						cate.push(res[i].C3_NM);
					}
					if(res[i].C1_NM != "총 계"  && res[i].C2_NM == "총 계" && res[i].C3_NM == "총 계" && res[i].C4_NM == "총 계") {
						categories.push(res[i].C1_NM);
					}
				}
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM == "총 계" ) {
						if(res[i].C4_NM == "지속일자리" || res[i].C4_NM == "신규채용일자리") {
							chartVal2.push([res[i].C4_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C4_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
				}
				//3번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계") {
						if(res[i].C4_NM == "총 계") {
							chartVal3.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C3_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				//4번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "남자" && res[i].C3_NM != "총 계" && res[i].C4_NM == "지속일자리") {
						chartVal4_1.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "여자" && res[i].C3_NM != "총 계" && res[i].C4_NM == "신규채용일자리") {
						chartVal4_2.push([res[i].C3_NM, Number(res[i].DT)]);
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C4_NM);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C4_NM);
					}
				}
				//6번
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C2 == "0" && res[i].C3 != "00" && res[i].C4 == "00") {
						newJobVal.push(Number(res[i].DT)); 
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C2 == "0" && preData[i].C3 != "00" && preData[i].C4 == "00") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "종사상지위별 성별 근속기간별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> 종사상지위별 성별 근속기간별 일자리");
				$('.chartNm1_1').css('display','block');
				$('.chartNm1_2').css('display','block');
				$(".chartNm1_1").text("종사상지위별");
				$(".chartNm1_2").text("성별");
				$(".chartNm1_3").text("근속기간별");
				$(".chartNm3").html(prdDe+"년 종사상지위별 성별 근속기간별 일자리");
				$(".chartNm4").html(prdDe+"년 종사상지위별 성별 근속기간별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 종사상지위별 성별 근속기간별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 종사상지위별 성별 근속기간별 일자리 증감");
				let legendNm12 = ["남자", "여자"];
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "총 계") {
						cate.push(res[i].C3_NM);
					}
					if(res[i].C1_NM != "총 계"  && res[i].C2_NM == "총 계" && res[i].C3_NM == "총 계" && res[i].C4_NM == "총 계") {
						categories.push(res[i].C1_NM);
					}
				}
				//2번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM == "총 계") {
						if(res[i].C4_NM == "지속일자리" || res[i].C4_NM == "신규채용일자리") {
							chartVal2.push([res[i].C4_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C4_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
				}
				//3번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계") {
						if(res[i].C4_NM == "총 계") {
							chartVal3.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C3_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
				}
				//4번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "지속일자리") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "신규채용일자리") {
						chartVal4_2.push([res[i].C4_NM, Number(res[i].DT)]);
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C4_NM);
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C4_NM);
					}
				}
				//6번
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1_NM == "총 계" && res[i].C2_NM == "총 계" && res[i].C3_NM != "총 계" && res[i].C4_NM == "총 계") {
						newJobVal.push(Number(res[i].DT)); 
					}
				}
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "총 계" && preData[i].C2_NM == "총 계" && preData[i].C3_NM != "총 계" && preData[i].C4_NM == "총 계") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}else if(res[0].TBL_NM == "(장애인) 성별 연령대별 일자리") {
				$('.titleChange').html("일자리통계편 <i class='fa fa-angle-right'></i> (장애인) 성별 연령대별 일자리");
				$('.tabArea3 .tabs.chartButton3 li a').css("padding", "4px 3px");
				$('.tabArea4 .tabs.chartButton4 li a').css("padding", "4px 3px");
				$('.tabArea5 .tab.chartButton5 li a').css("padding", "4px 3px");
				$('.tabArea5 .tabs2 li a').css("padding", "4px 3px");
				$('.tabArea6 .tab.chartButton6 li a').css("padding", "4px 3px");
				$(".chartNm3").html(prdDe+"년 (장애인) 성별 연령대별 일자리");
				$(".chartNm4").html(prdDe+"년 (장애인) 성별 연령대별 일자리형태별 일자리");
				$(".chartNm5").html(prdDe+"년 (장애인) 성별 연령대별 신규채용일자리");
				$(".chartNm6").html(prdDe+"년 전년대비 (장애인) 성별 연령대별 일자리 증감");
				//나이순 정렬
				res.sort(function(a, b){
					return a.C2 - b.C2;
				});
				if(preData != undefined) {
					preData.sort(function(a, b){
						return a.C2 - b.C2;
					});
				}
				//x축 y축 변경
				var cate = new Array;
				for(var i=0; i<res.length; i++){
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "00") {
						cate.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0" && res[i].C2 == "00" && res[i].C3 == "00") {
						categories.push(res[i].C1_NM);
					}
				}
				//차트데이터
				for(var i=0; i<res.length; i++) {
					//2번
					if(res[i].C1 == "0" && res[i].C2 == "00") {
						if(res[i].C3 == "10" || res[i].C3 == "30") {
							chartVal2.push([res[i].C3_NM, Number(res[i].DT)]);
							legendNm.push(res[i].C3_NM);
							legendDT.push(Number(res[i].DT));
						}
					}
					//3번
					if(res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal3.push([res[i].C2_NM, Number(res[i].DT)]);
							legendNm3.push(res[i].C2_NM);
							legendDT3.push(Number(res[i].DT));
						}
					}
					//4번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//5번
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal5_1.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal5_2.push(Number(res[i].DT));
						categories5.push(res[i].C3_NM);
					}
					//6번 올해데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == "0" && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				if(preData != undefined) {
					//6번 작년데이터
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1_NM == "    총 계" && preData[i].C3_NM == "총 계") {
							if(preData[i].C2_NM != "총 계") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
				//5번
				for(var i=0; i<res.length; i++) {
					
				}
				//6번 데이터가공
				for(var i=0; i<newJobVal.length; i++) {
					chartVal6.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
				}
			}
			let dataEnabled = "";
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || 
			   tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || 
			   tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				dataEnabled = false;
			}else {
				dataEnabled = true;
			}
			
			seriesyearData2.push({
				type: 'pie',
				//name: chartNm,
				innerSize: '80%',
				data: chartVal2,
				dataLabels: {
					enabled: true,
					format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
					align: 'center',
					//세로 위치 지정
					style: {
						fontSize: '14px', 
					}
				},
			});
			seriesyearData3.push({
				type: 'pie',
				//name: chartNm,
				innerSize: '80%',
				data: chartVal3,
				dataLabels: {
					enabled: dataEnabled,
					format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
					align: 'center',
					//세로 위치 지정
					style: {
						fontSize: '14px', 
					}
				},
			});
			//[조규환] 데이터가 NaN이면 0으로 바꾸기 
			for(let i=0; i<chartVal5_1.length; i++ ) {
				if(isNaN(chartVal5_1[i])) {
					chartVal5_1[i] = -0.001;
				}
				if(isNaN(chartVal5_2[i])) {
					chartVal5_2[i] = -0.001;
				}
			}
			seriesyearData5.push({
				name: categories5[0],
				data: chartVal5_1,
				//바 상단의 수치값
				dataLabels: {
					enabled: true,
					align: 'center',
					color:'#000',
					//format: '{y} 만개',
					style: {
						fontSize:'14px',
						fontWeight:'600',
						textOverflow: "width",
						fontFamily: $more3DashDetail.downloadFont,
					},
					formatter: function() {
						if(this.y == -0.001) {
							return "<span style='font-weight: bold;'>자료없음</span>";
						}else {
							return "<span style='font-weight: bold;'>" + $more3DashDetail.util.comma(this.y) + " 만개</span>";
						} 
					}
				},
				color: '#F15C80'
			},{
				name: categories5[1],
				data: chartVal5_2,
				dataLabels: {
					enabled: true,
					color:'#000',
					style: {
						fontSize:'14px',
						fontWeight:'600',
						fontFamily: $more3DashDetail.downloadFont,
					},
					formatter: function() {
						if(this.y > 0) {
							return "<span style='font-weight: bold;'>" + $more3DashDetail.util.comma(this.y) + " 만개</span>";
						}else if(this.y == 0) {
							return "<span style='font-weight: bold;'>자료없음</span>";
						}
					}
				},
				color: '#F7A35C'
			});
			if(preData != undefined) {
				seriesyearData6.push({
					name: '증가',
					data: chartVal6,
					color: '#F15C80',
					negativeColor: '#7CB5EC',
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						useHTML: true,
						//format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return $more3DashDetail.util.comma(this.y) + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0){
								return $more3DashDetail.util.comma(Math.abs(this.y)) + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								return '변동없음';
							}
						},
						color:'#000',
						style: {
							fontSize:'14px',
							fontWeight:'600',
						},
					}
				});
			}
			for(let i=0; i<chartVal4_1.length; i++ ) {
				if(isNaN(chartVal4_1[i][1])) {
					chartVal4_1[i][1] = 0;
				}
			}
			for(let i=0; i<chartVal4_2.length; i++ ) {
				if(isNaN(chartVal4_2[i][1])) {
					chartVal4_2[i][1] = 0;
				}
			}
			for(let i=0; i<chartVal4_3.length; i++ ) {
				if(isNaN(chartVal4_3[i][1])) {
					chartVal4_3[i][1] = 0;
				}
			}
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002"|| tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010") {
				seriesyearData4.push({
					name: '지속일자리',
					data: chartVal4_1,
					padding:10,
					//바 상단의 수치값
					dataLabels: {
						allowOverlap: false,
						enabled: true,
						padding:0,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						align: 'center',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function() {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#7CB5EC',
				},{
					name: '대체일자리',
					data: chartVal4_2,
					dataLabels: {
						allowOverlap: false,
						enabled: true,
						padding:0,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						align: 'center',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function() {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#F15C80'
				},{
					name: '신규일자리',
					data: chartVal4_3,
					dataLabels: {
						allowOverlap: false,
						enabled: true,
						padding:0,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						align: 'center',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function() {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#F7A35C',
				});
			}
			else if(tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014"
				|| tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" 
					|| tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" 
						|| tblId == "DT_1EP_3035") {
				seriesyearData4.push({
					name: '지속일자리',
					data: chartVal4_1,
					//padding:10,
					//바 상단의 수치값
					dataLabels: {
						allowOverlap: false,
						enabled: true,
						//format: '{point.percentage:.1f} %',
						padding: 0, //이거 하는중
						align: 'center',
						color:'#000',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function() {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#7CB5EC',
				},{
					name: '신규채용일자리',
					data: chartVal4_2,
					dataLabels: {
						allowOverlap: false,
						enabled: true,
						//format: '{point.percentage:.1f} %',
						padding: 0,
						align: 'center',
						color:'#000',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function() {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#F15C80'
				});
			}/*else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020") {
				legendNm5 = ["기업생성", "사업확장"];
				legendColor5 = ['#F15C80', '#F7A35C'];
				for(var i=0; i<legendNm5.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+legendColor5[i]+"'></span> "+legendNm5[i]+"</span>";
					for(var j = 1; j < 11; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3024") {
				legendNm5 = ["기업생성", "기업내신규대체"];
				legendColor5 = ['#F15C80', '#F7A35C'];
				for(var i=0; i<legendNm5.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+legendColor5[i]+"'></span> "+legendNm5[i]+"</span>";
					$(".legend51").append(legend51);
				}
			}*/
			//xAxis4, xAxis5, xAxis55, xAxis6 공통
			//검색
			let categoriesNm;
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3003" || tblId == "DT_1EP_3005" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" ||
				tblId == "DT_1EP_3009") {
				categoriesNm = categories;
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
					 tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || 
					 tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" ||
					 tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" ||
					 tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") { 
				categoriesNm = cate;
			}
			xAxis4.push({ //4번 x축
				categories: categoriesNm,
				labels: {
					style: {
						color: '#494949',
						fontSize:'12px',
						fontWeight: 'bold',
						letterSpacing: '0px',
					},
				},
				lineColor: '#ccd6eb',
				gridLineWidth: 0,
				tickWidth: 0,
				tickColor: '#cfcfcf',
				tickPosition: 'inside'
			});
			xAxis5.push({
				categories: categoriesNm,
				labels: {
					rotation: 0,
					style: {
						color: '#494949',
						fontSize:'12px',
						fontWeight: 'bold',
						letterSpacing: '0px',
						//textOverflow: "width",
					},
				},
				lineColor: '#ccd6eb',
				stroke: '#ccd6eb',
				gridLineWidth: 0,
				tickWidth: 0,
				tickColor: '#cfcfcf',
				tickPosition: 'inside'
			});
			xAxis55.push({
				categories: categoriesNm,
				labels: {
					rotation: 0,
					style: {
						color: '#494949',
						fontSize:'12px',
						fontWeight: 'bold',
						letterSpacing: '0px',
					},
				},
				lineColor: '#ccd6eb',
				stroke: '#ccd6eb',
				gridLineWidth: 0,
				tickWidth: 0,
				tickColor: '#cfcfcf',
				tickPosition: 'inside'
			});
			xAxis6.push({
				categories: categoriesNm,
				labels: {
					rotation: 0,
					style: {
						color: '#494949',
						fontSize:'12px',
						fontWeight: 'bold',
						letterSpacing: '0px',
					},
				},
				lineColor: '#ccd6eb',
				gridLineWidth: 0,
				tickWidth: 0,
				tickColor: '#cfcfcf',
				tickPosition: 'inside'
			});
			//1번 차트 새로고침시 버튼클릭 초기화
			/*$(".tabArea .tab li a").on("click", function(){
				// 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
				const num = $(".tabArea .tab li a").index($(this));
				
				// 기존에 적용되어 있는 on class 삭제
				//$(".tabArea .tab li").removeClass("on");
				$(".tabArea .tabBox").removeClass("on");
				$(".tabArea .tabBox").css("display", "none");

				// 다음 요소 클릭시 on class 추가
				//$('.tabArea .tab li:eq(' + num + ')').addClass("on");
				$('.tabArea .tabBox:eq(' + num + ')').addClass("on");
				$('.tabArea .tabBox:eq(' + num + ')').css("display", "block");
			});*/
			$(".tabArea1_1 .tab li a").on("click", function(){
				// 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
				const num = $(".tabArea1_1 .tab li a").index($(this));
				
				// 기존에 적용되어 있는 on class 삭제
				//$(".tabArea .tab li").removeClass("on");
				$(".tabArea1_1 .tabBox").removeClass("on");
				$(".tabArea1_1 .tabBox").css("display", "none");
				
				// 다음 요소 클릭시 on class 추가
				//$('.tabArea .tab li:eq(' + num + ')').addClass("on");
				$('.tabArea1_1 .tabBox:eq(' + num + ')').addClass("on");
				$('.tabArea1_1 .tabBox:eq(' + num + ')').css("display", "block");
			});
			
			for(let i = 3; i <= 6; i++ ) {
				$('.tabArea'+i+' .tab_container .tabs li a').on("click", function(){
					// 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
					const num = $('.tabArea'+i+' .tab_container .tabs li a').index($(this));
					// 기존에 적용되어 있는 on class 삭제
					$('.tabArea'+i+' .tab_container .tabs li').removeClass("active");
					$('.tabArea'+i+' .tab_content').css("display", "none");
					$('.tabArea'+i+' .tab_content').removeClass("on");

					// 다음 요소 클릭시 on class 추가
					$('.tabArea'+i+' .tab_container .tabs li:eq(' + num + ')').addClass("active");
					$('.tabArea'+i+' .tab_content:eq(' + num + ')').css("display", "block");
					$('.tabArea'+i+' .tab_content:eq(' + num + ')').addClass("on");
				});
			}
			
			$(".tabs li a").click(function () {
				$(this).parent().siblings("li").removeClass("active");
				$(this).parent().addClass("active"); $(this).parent().parent().parent().parent().find(".tab_content").hide();
				var activeTab = $(this).attr("rel");
				$("#" + activeTab).fadeIn();
			});
			
			
			// 탭안에 탭
			$(".tab_content2").hide();
			// 첫번째 탭콘텐츠 보이기
			$(".tab_container2").each(function () {
				$(this).children(".tabs2 li:first").addClass("active"); //Activate first tab
				$(this).children(".tab_content2").first().show();
			});
			//1번차트 팝업 클릭 클래스생성 이벤트
				$(".popupChartBtn").on("click", function() {
				let num = $(".pop_info_1 .popBtn1 p").index($(this));
				// 기존에 적용되어 있는 on class 삭제
				$(".pop_info_1 .popBtn1 p").removeClass("on");
				$(".tabArea .tabBox").removeClass("on");
				
				// 다음 요소 클릭시 on class 추가
				$('.pop_info_1 .popBtn1 p:eq('+num+')').addClass("on");
				$('.tabArea .tabBox:eq(' + num + ')').addClass("on");
			});
			
			//1번, 3번, 4번, 5번, 6번차트 셀렉트 만들기
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3003" || tblId == "DT_1EP_3005" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || 
			   tblId == "DT_1EP_3009" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
			   tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || 
			   tblId == "DT_1EP_3023" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				let value;
				let option = "";
				let option1 = "";
				let option3 = "";
				let option4 = "";
				let option5 = "";
				let option6 = "";
				$('.select1').empty();
				$('.select3').empty();
				$('.select4').empty();
				$('.select5').empty();
				$('.select6').empty();
				$(".tabArea .tabBox").css("display", "none");
				$(".tabArea1_1 .tabBox").css("display", "none");
				$('.tabArea3 .tab_content').css("display", "none");
				$('.tabArea4 .tab_content').css("display", "none");
				$('.tabArea5 .tab_content').css("display", "none");
				$('.tabArea5_1 .tab_content').css("display", "none");
				$('.tabArea6 .tab_content').css("display", "none");
				$(".tabArea .tabBox:eq(0)").css("display", "block");
				$(".tabArea1_1 .tabBox:eq(0)").css("display", "block");
				$('.tabArea3 .tab_content:eq(0)').css("display", "block");
				$('.tabArea4 .tab_content:eq(0)').css("display", "block");
				$('.tabArea5 .tab_content:eq(0)').css("display", "block");
				$('.tabArea5_1 .tab_content:eq(0)').css("display", "block");
				$('.tabArea6 .tab_content:eq(0)').css("display", "block");
				$(".tabArea .tabBox:eq(0)").addClass("on");
				$(".tabArea1_1 .tabBox:eq(0)").addClass("on");
				$('.tabArea3 .tab_content:eq(0)').addClass("on");
				$('.tabArea4 .tab_content:eq(0)').addClass("on");
				$('.tabArea5 .tab_content:eq(0)').addClass("on");
				$('.tabArea5_1 .tab_content:eq(0)').addClass("on");
				$('.tabArea6 .tab_content:eq(0)').addClass("on");
				//1번차트 셀렉트 option name
				let chartSelectNm1 = "";
				let chartSelectNm2 = "";
				let chartSelectArray = new Array;
				let newExtJob = new Array; //신규일자리 / 소멸일자리
				
				if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002") {
					chartSelectNm1 = res[0].C1_OBJ_NM
					newExtJob.push(res[3].C2_NM, res[6].C2_NM);
				}else if(tblId == "DT_1EP_3003") {
					chartSelectNm1 = res[0].C2_OBJ_NM
				}else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009") {
					chartSelectNm1 = res[0].C1_OBJ_NM
				}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
						 tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || 
						 tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || 
						 tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3035") {
					chartSelectNm1 = res[0].C1_OBJ_NM; 
					chartSelectNm2 = res[0].C2_OBJ_NM;
					chartSelectArray.push(chartSelectNm1, chartSelectNm2);
				}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
					chartSelectArray.push(res[0].C1_OBJ_NM, res[0].C2_OBJ_NM, res[0].C3_OBJ_NM);
				}
				//1번차트 셀렉트 option name
				
				//조직형태별, 기업규모별
				if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002") {
					$('.select1').html("<select class='' id='selectChoice1'><option value='0' rel='31'>총계</option></select>");
					$('.select5').html("<select class='' id='selectChoice5'></select>");
					option1 = "<option value=1 rel=tab31>"+chartSelectNm1+"</option>";
					$('#selectChoice1').append(option1);
					for(let i = 0; i < newExtJob.length; i++) {
						option5 = "<option value="+i+" rel=tab3"+i+">"+newExtJob[i]+"</option>";
						$('#selectChoice5').append(option5);
					}
				}
				//종사자규모별, 산업분류별
				else if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3005") { 
					if(tblId == "DT_1EP_3003") {
						$('.select1').html("<select class='' id='selectChoice1'><option value='0' rel='31'>총계</option></select>");
						for(let i = 3; i < 7; i++) {
							$('.select'+i).empty();
							$('.select'+i).append("<select class='' id='selectChoice"+i+"'><option value='0'>총계</option></select>");
						}
						option1 = "<option value=1 rel=tab31>"+chartSelectNm1+"</option>";
						$('#selectChoice1').append(option1);
						$('.chartButton5_1').append("<ul><li class='active'><a href='#' class='tab51-1' rel='tab51-1'>신규</a></li><li><a href='#' class='tab51-1' rel='tab51-2'>소멸</a></li></ul>");
					}else if(tblId == "DT_1EP_3005") {
						$('.select1').html("<select class='' id='selectChoice1'><option value='0' rel='31'>총계</option><option value=1 rel=tab31>산업분류별</option></select>");
						$('.select5').empty();
						$('.select5_1').empty();
						$('.select5').append("<select class='' id='selectChoice4'><option value='0'>총계</option></select>");
						$('.select5_1').append("<select class='' id='selectChoice5_1'><option value='0'>총계</option></select>");
						$('.chartButton51_1').append("<ul><li class='active'><a href='#' class='tab51-1' rel='tab51-1'>신규</a></li><li><a href='#' class='tab51-1' rel='tab51-2'>소멸</a></li></ul>");
					}
					for(let j = 0; j < selectNm.length; j++) {
						option = "<option value='" +(j+1)+ "' rel='tab3" + (j+1) + "'>"+selectNm[j]+"</option>";
						if(tblId == "DT_1EP_3003") {
							$('#selectChoice3').append(option);
							$('#selectChoice4').append(option);
							$('#selectChoice5').append(option);
							$('#selectChoice6').append(option);
						}else if(tblId == "DT_1EP_3005") {
							$('#selectChoice4').append(option);
							$('#selectChoice5_1').append(option);
						}
					}
				}
				//성별, 연령대별, 근속기간별, 종사상지위별
				else if(tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009") {
					$('.select1').html("<select class='' id='selectChoice1'><option value='0' rel='31'>총계</option></select>");
					option1 = "<option value=1 rel=tab31>"+chartSelectNm1+"</option>";
					$('#selectChoice1').append(option1);
				}
				//조직형태별 종사자규모,산업대분류,성,연령대,근속기간,종사상지위 / 기업규모별 산업대분류,성,연령대,근속기간, 종사자규모별 산업,성,연령대,근속기간 / 성별 산업대분류,연령대,근속기간,종사상지위,....
				if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3016" || 
				   tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || 
				   tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" || 
				   tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") { 
					$('.select1').html("<select class='' id='selectChoice1'><option value='0' rel='31'>총계</option></select>");
					for(let i = 0; i < chartSelectArray.length; i++) {
						option1 = "<option value='" +(i+1)+ "' rel='tab3" + (i+1) + "'>"+chartSelectArray[i]+"</option>";
						$('#selectChoice1').append(option1);
						$('#more1ChartTitle1_1 .titleChart1 #selectChoice1').append(option1);
					}
					for(let i = 3; i < 7; i++) {
						$('.select'+i).empty();
						$('.select'+i).html("<select class='' id='selectChoice"+i+"'><option value='0'>총계</option></select>");
					}
					for(let j = 0; j < categories.length; j++) {
						option = "<option value='" +(j+1)+ "' rel='tab3" + (j+1) + "'>"+categories[j]+"</option>";
						$('#selectChoice3').append(option);
						$('#selectChoice4').append(option);
						$('#selectChoice5').append(option);
						$('#selectChoice6').append(option);
					}
					if(tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || 
					   tblId == "DT_1EP_3031") {
						$('.select5').empty();
						$('.select5_1').empty();
						$('.select5').html("<select class='' id='selectChoice4'><option value='0'>총계</option></select>");
						$('.select5_1').html("<select class='' id='selectChoice5_1'><option value='0'>총계</option></select>");
						for(let j = 0; j < categories.length; j++) {
							option = "<option value='" +(j+1)+ "' rel='tab3" + (j+1) + "'>"+categories[j]+"</option>";
							$('.select5 #selectChoice4').append(option);
							$('#selectChoice5_1').append(option);
						}
					}
					$("#selectChoice3").removeClass("selectMargin1");
					$("#selectChoice3").removeClass("selectMargin2");
					if(tblId == "DT_1EP_3010") {
						$('.chartButton5_1').append("<ul><li class='active'><a href='#' class='tab51-1' rel='tab51-1'>신규</a></li><li><a href='#' class='tab51-1' rel='tab51-2'>소멸</a></li></ul>");
					}else if(tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020") {
						$('.chartButton51_1').append("<ul><li class='active'><a href='#' class='tab51-1' rel='tab51-1'>신규</a></li><li><a href='#' class='tab51-1' rel='tab51-2'>소멸</a></li></ul>");
					}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
						$('.chartButton3_1').append("<ul><li class='active'><a href='#' class='tab31-1' rel='tab51-1'>총계</a></li><li><a href='#' class='tab31-1' rel='tab51-2'>남자</a></li><li><a href='#' class='tab31-1' rel='tab51-3'>여자</a></li></ul>");
						$('.chartButton4_1').append("<ul><li class='active'><a href='#' class='tab41-1' rel='tab51-1'>총계</a></li><li><a href='#' class='tab41-1' rel='tab51-2'>남자</a></li><li><a href='#' class='tab41-1' rel='tab51-3'>여자</a></li></ul>");
						$('.chartButton5_1').append("<ul><li class='active'><a href='#' class='tab51-1' rel='tab51-1'>총계</a></li><li><a href='#' class='tab51-1' rel='tab51-2'>남자</a></li><li><a href='#' class='tab51-1' rel='tab51-3'>여자</a></li></ul>");
						$('.chartButton6_1').append("<ul><li class='active'><a href='#' class='tab61-1' rel='tab51-1'>총계</a></li><li><a href='#' class='tab61-1' rel='tab51-2'>남자</a></li><li><a href='#' class='tab61-1' rel='tab51-3'>여자</a></li></ul>");
					}
				}
				if(tblId == "DT_1EP_3034") {
					$("#selectChoice3").addClass("selectMargin1");
				}
				if(tblId == "DT_1EP_3035") {
					$("#selectChoice3").addClass("selectMargin2");
				}
				if(tblId == "DT_1EP_3034") {
					$('#selectChoice3').css("width", "60px");
				}
				$('.header-tag #headerSearchYear').on('change', function() {
					$more1DashDetail.util.headerSearchSelect();
				});
				$("select[id=selectChoice1]").change(function(){
					value = $(this).val(); //value값 가져오기
					if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
					   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
						$(".chart1_0").empty();
						$(".chart1_1").empty();
						$(".chart1_2").empty();
						$('.tabArea1_1 .tabBox').css("display", "none");
						$('.tabArea1_1 .tabBox').removeClass("on");
						$('.tabArea1_1 .tabBox:eq(' + value + ')').css("display", "block");
						$('.tabArea1_1 .tabBox:eq(' + value + ')').addClass("on");
					}else {
						$(".chart11").empty();
						$(".chart12").empty();
						$(".chart13").empty();
						$('.tabArea .tabBox').css("display", "none");
						$('.tabArea .tabBox').removeClass("on");
						$('.tabArea .tabBox:eq(' + value + ')').css("display", "block");
						$('.tabArea .tabBox:eq(' + value + ')').addClass("on");
					}
					$more1DashDetail.chart.selectOtherData(res, value, categories, legendNm3);
				});
				$("select[id=selectChoice3]").change(function(){
					value = $(this).val(); //value값 가져오기
					$('.tabArea3 .tab_content').css("display", "none");
					$('.tabArea3 .tab_content').removeClass("on");
					$('.tabArea3 .tab_content:eq(' + value + ')').css("display", "block");
					$('.tabArea3 .tab_content:eq(' + value + ')').addClass("on");
					$more1DashDetail.chart.selectOtherData3(res, value);
				});
				$("select[id=selectChoice4]").change(function(){
					value = $(this).val(); //value값 가져오기
					if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
					   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
						$('.tabArea5 .tab_content').css("display", "none");
						$('.tabArea5 .tab_content').removeClass("on");
						$('.tabArea5 .tab_content:eq(' + value + ')').css("display", "block");
						$('.tabArea5 .tab_content:eq(' + value + ')').addClass("on");
					}else {
						$('.tabArea4 .tab_content').css("display", "none");
						$('.tabArea4 .tab_content').removeClass("on");
						$('.tabArea4 .tab_content:eq(' + value + ')').css("display", "block");
						$('.tabArea4 .tab_content:eq(' + value + ')').addClass("on");
					}
					$more1DashDetail.chart.selectOtherData4(res, value, xAxis4);
				});
				$("select[id=selectChoice5]").change(function(){
					value = $(this).val(); //value값 가져오기
					$('.tabArea5 .tab_content').css("display", "none");
					$('.tabArea5 .tab_content').removeClass("on");
					$('.tabArea5 .tab_content:eq(' + value + ')').css("display", "block");
					$('.tabArea5 .tab_content:eq(' + value + ')').addClass("on");
					$more1DashDetail.chart.selectOtherData5(res, value, xAxis55);
				});
				$("select[id=selectChoice5_1]").change(function(){
					value = $(this).val(); //value값 가져오기
					$('.tabArea5_1 .tab_content').css("display", "none");
					$('.tabArea5_1 .tab_content').removeClass("on");
					$('.tabArea5_1 .tab_content:eq(' + value + ')').css("display", "block");
					$('.tabArea5_1 .tab_content:eq(' + value + ')').addClass("on");
					$more1DashDetail.chart.selectOtherData5(res, value, xAxis55);
				});
				$("select[id=selectChoice6]").change(function(){
					value = $(this).val(); //value값 가져오기
					$('.tabArea6 .tab_content').css("display", "none");
					$('.tabArea6 .tab_content').removeClass("on");
					$('.tabArea6 .tab_content:eq(' + value + ')').css("display", "block");
					$('.tabArea6 .tab_content:eq(' + value + ')').addClass("on");
					$more1DashDetail.chart.selectOtherData6(res, value, preData, xAxis6);
				});
				$(".tabs2 li a").click(function () {
					$(this).parent().siblings("li").removeClass("active");
					$(this).parent().addClass("active"); $(this).parent().parent().parent().parent().find(".tab_content2").hide();
					var activeTab = $(this).attr("rel");
					$("#" + activeTab).fadeIn();
				});
				// 5번차트 신규 소멸 버튼 클릭시
				if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3005" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" ||
				   tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
					$(".tab51-1").click(function() {
						if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
							value = $("select[id=selectChoice5_1]").val();
						}else {
							value = $("select[id=selectChoice5]").val();
						}
						$more1DashDetail.chart.selectOtherData5(res, value, xAxis55); 
					});
				}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
					$(".tab31-1").click(function() {$more1DashDetail.chart.selectOtherData3(res, value);});
					$(".tab41-1").click(function() {$more1DashDetail.chart.selectOtherData4(res, value, xAxis4);});
					$(".tab51-1").click(function() {$more1DashDetail.chart.selectOtherData5(res, value, xAxis55);});
					$(".tab61-1").click(function() {$more1DashDetail.chart.selectOtherData6(res, value, preData, xAxis6);});
				}

			}
			$(".chartNm1_1").click(function() {
				makeChartOtherData(tblNm, tblId, categories ,legendNm3); //chart11 ~ 13
			}); 
			$(".popupChartBtn").on("click", function() {
				makeChartOtherData(tblNm, tblId, categories ,legendNm3); //chart11 ~ 13
				$('#pop_info_1').css("display", "none");
			});
			//차트버튼 클릭
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" ||
			   tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3024" || 
			   tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3035") {
				$(".chartClick3").click(function() {
					makeChartOtherData3(res); //차트 3번 데이터
				});
				$(".chartClick4").click(function() {
					makeChartOtherData4(res, xAxis4); //차트 4번 데이터
				});
				$(".chartClick5").click(function() {
					makeChartOtherData5(res, xAxis55); //차트 5번 데이터
				});
				$(".chartClick6").click(function() {
					makeChartOtherData6(res, preData, xAxis6); //차트 6번 데이터
				});
			}
			/*	$(".chartNm5_1").click(function() {
				}
			});*/
			$more1DashDetail.util.horizontalScroll(res); //5번, 6번 차트 가로스크롤 //마지막1
			$more1DashDetail.chart.makeChart(tblNm, totJob, xAxis4, xAxis5, xAxis55, xAxis6, seriesyearData2, seriesyearData3, seriesyearData4, seriesyearData5, seriesyearData6, newJobVal, treeMapColor4, pieColor2, pieColor3, tblId, industryTotVal);
		},
	};
	$more1DashDetail.chart = {
		//차트를 생성한다
		makeChart : function(tblNm, totJob, xAxis4, xAxis5, xAxis55, xAxis6, seriesyearData2, seriesyearData3, seriesyearData4, seriesyearData5, seriesyearData6, newJobVal, treeMapColor4, pieColor2, pieColor3, tblId, industryTotVal) {
			//시계열2번
			/*Highcharts.setOptions({
				colors: ['#7CB5EC', '#F7A35C', '#F15C80', '#90ED7D', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
			});*/
			$('#downPicture2').off('click');
			$('#downPicture3').off('click');
			$('#downPicture4').off('click');
			$('#downPicture5').off('click');
			$('#downPicture5_1').off('click');
			$('#downPicture6').off('click');
			let totJobVal = totJob.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3003" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009" ||
			   tblId == "DT_1EP_3010" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" ||
			   tblId == "DT_1EP_3019" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" ||
			   tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				var charts21 = Highcharts.chart('chart2', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: -20,
						marginLeft: 20,
						width: 390,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리<br><span class="customSt2" style="font-size: 16px">'+ totJobVal + '만개</span>',
								style: {
									fontSize: '12px',
									fontFamily: $more3DashDetail.downloadFont,
								},	
							},
							series: {
								dataLabels: {
									style: {
										fontSize: '9px',
										color: $more3DashDetail.conSubNewColor,
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
						}
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '전체 일자리<br><span class="customSt2" style="font-size: 20px">'+ totJobVal + '만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-72,
						y:-5,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						},						
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled : true,
						width: 100,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						margin: 10,
						x: -35,
						y: -30,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						formatter: function() {
							$('#container .highcharts-legend').hover(function() {
							});
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: '72%',
							colors: pieColor2,
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							dataLabels : {
								enabled : true,
								distance: '-13%', 
								x: 0,
								y: 0,
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							/*marker: {
								enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
								lineWidth: 2, //라인 굵기
								lineColor:'#F15C80', //라인 색
								fillColor:'#ffffff'
							},
							dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},*/
							events: {
								/*mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.show();
									});
								},
								mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.hide();
									});
								},*/
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
							lineHeight:18,
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
						/*formatter: function() {
							return '<span style="color:#EEFF2E">' + this.point.name + '</span>' + '</br>' + this.y + ' 만개';
						},*/
					},
					series: seriesyearData2
				});
				let legendWidth = 0;
				let legendItemMarginTop = 0;
				let legendItemMarginBottom = 0;
				let legendX = 0;
				let legendY = 0;
				let pieSize = '';
				let subtitleX = 0;
				let marginTop = '';
				let marginLeft = '';
				let exporSubX = '';
				let exporlegendX = '';
				//[조규환] 차트별 옵션 부여
				if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010") {
					legendWidth = 200;
					legendItemMarginTop = 3;
					legendItemMarginBottom = 3;
					legendX = 40;
					legendY = -10;
					pieSize = '67%';
					subtitleX = -95;
					marginTop = -15;
				}else if(tblId == "DT_1EP_3007" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3025"){  //연령대별
					legendWidth = 200;
					legendItemMarginTop = 2;
					legendItemMarginBottom = 2;
					legendX = 45;
					legendY = -4;
					pieSize = '69%';
					subtitleX = -87;
					marginLeft = 10;
					marginTop = -15;
				}else if(tblId == "DT_1EP_3008" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3026"  || tblId == "DT_1EP_3032"  || tblId == "DT_1EP_3034"){   //근속기간별
					legendWidth = 200;
					legendItemMarginTop = 4;
					legendItemMarginBottom = 4;
					legendX = 30;
					legendY = -14;
					pieSize = '71%';
					subtitleX = -100;
					marginTop = -15;
				}else if(tblId == "DT_1EP_3033"){  //연령대별
					legendWidth = 200;
					legendItemMarginTop = 2;
					legendItemMarginBottom = 2;
					legendX = 45;
					legendY = -15;
					pieSize = '69%';
					subtitleX = -87;
					marginLeft = 10;
					marginTop = -15;
				}else if(tblId == "DT_1EP_3035"){  //연령대별
					legendWidth = 200;
					legendItemMarginTop = 2;
					legendItemMarginBottom = 2;
					legendX = 45;
					legendY = -4;
					pieSize = '69%';
					subtitleX = -87;
					marginLeft = 10;
					marginTop = -15;
				}else {
					legendWidth = 120;
					legendItemMarginTop = 4;
					legendItemMarginBottom = 4;
					legendX = 30;
					legendY = -8;
					pieSize = '60%';
					subtitleX = -60;
					marginTop = -15;
				}
				if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009" || 
				   tblId == "DT_1EP_3012" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" ) {
					exporSubX = -105;
					exporlegendX = -60;
				}else if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || 
						 tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || 
						 tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
					exporSubX = -145;
					exporlegendX = -60;
				}
				var charts31 = Highcharts.chart('chart31', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						//backgroundColor:null,
						marginTop: marginTop,
						marginLeft: marginLeft,
						x:-20,
						style: {			 
							//fontFamily: 'Noto Sans KR', 
						}
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting: {
						enabled: false,
						sourceWidth: 600,
						chartOptions: {
							subtitle: {
								text: '전체 일자리<br><span class="customSt2" style="font-size: 16px">'+ totJobVal + '만개</span>',
								x: exporSubX,
								style: {
									fontSize: '12px',
									fontFamily: $more3DashDetail.downloadFont,
								},	
							},
							series: {
								dataLabels: {
									style: {
										color: $more1DashDetail.conSmallNonColor,
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								x:exporlegendX,
								y:legendY,
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
						}
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '전체 일자리<br><span class="customSt2" style="font-size: 20px">'+ totJobVal + '만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:subtitleX,
						y:0,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					legend: {
						enabled : true,
						width: legendWidth,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: legendItemMarginTop,
						itemMarginBottom: legendItemMarginBottom,
						x:legendX,
						y:legendY,
						itemStyle: {
							textOverflow: "width"
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || 
							   tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || 
							   tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
								let comma = (this.y.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								for(let i=0; i<this.series.data.length; i++) {
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'만개)';
								}
							}else {
								return this.name
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: pieSize,
							colors: pieColor3,
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							dataLabels : {
								enabled : true,
								distance: '0%', 
								x: 0,
								y: 0,
								/*style : {
									fontWeight : 'bold',
									color : '#000',
									fontSize : '14px',
									fontWeight : 'bold',
								}*/
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
							lineHeight:18,
						},
						shared: true,
						/*formatter: function() {
							return '<span style="color:#EEFF2E">' + this.point.name + '</span>' + '</br>' + this.y + ' 만개';
						},*/
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData3
				});
			}
			/*const borderRadius = require('highcharts-border-radius');
			borderRadius(Highcharts);*/
			//트리맵 차트
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				charts41 = Highcharts.chart('chart41', {
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							series: {
								dataLabels: {
									style: {
										fontSize: '8px',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					legend: {enabled: false},
					/*colorAxis: {
				        minColor: '#DEEFFF',
				        maxColor: '#007DF6'
				    },*/
					title: {text: ''},
					tooltip:{
						//valueSuffix: "",
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() { //durl
							let count = 0;
							let data = "";
							let num = 0;
							let cutTotalData = 0;
							for(let i=0; i<this.series.data.length; i++) {
								if(this.series.data.length == 63) {
									num += this.series.data[count].value;
									count += 3;
									if(count > 62) break;
								}else if(this.series.data.length == 84) {
									num += this.series.data[count].value;
									count += 4;
									if(count > 83) break;
								}
							}
							
							let totNum = num.toFixed(1);
							if(this.point.node.level == 1) {
								if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020") {
									cutTotalData = $more3DashDetail.util.comma(Number(industryTotVal[(this.x) / 4]));
								}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
									cutTotalData = $more3DashDetail.util.comma(Number(industryTotVal[(this.x) / 3]));
								}
							}else if(this.point.node.level == 2) {
								cutTotalData = $more3DashDetail.util.comma(this.point.value);
							}
							let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
							return this.point.name +"("+ percentVal +'%)<span style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>';
						},
						shared: true
					},
					series: seriesyearData4
				});
			}else {
				//누적가로막대
				let stackData = new Array;
				for(let i=0; i<seriesyearData3[0].data.length; i++) {
					stackData.push(seriesyearData3[0].data[i][1]);
				}
				charts41 = Highcharts.chart('chart41', {
					chart : {
						renderTo: 'horiStackedBar',
						type: 'bar',//가로 column 지정은 "column"이 아닌 "bar"
						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting: {
						enabled: false,
						chartOptions: {
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							xAxis: {
								labels: {
									style: {
										fontSize :'10px',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							yAxis: {
								stackLabels: {
									x:-10,
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									},
									/*formatter: function() {
										let thisY = stackData[this.x];
										let commaY = $more3DashDetail.util.comma(thisY);
										return  commaY + '</br>만개';
									},*/
								}
							}
						}
					},
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						itemMarginBottom: -15,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis4,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: true,
							formatter: function() {
								let thisY = this.y;
								/*let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '만개';*/
							},
						},
						//crop: false,
						stackLabels: {
							/*overflow: 'allow',
							crop: false,*/
							enabled: true,//stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							//format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = stackData[this.x];
								let commaY = $more3DashDetail.util.comma(thisY);
								return  commaY + '만개';
							},
						},
						gridLineWidth: 0
					}],
					plotOptions: {
						series: {
							stacking: 'normal',//stacked bar 필수 설정 옵션.(default undefined)
							//bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*borderRadiusTopLeft: 8,
							borderRadiusTopRight: 8*/
						},
						dataLabels: {
							enabled: true,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'500',
								textOutline:0,
							},
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							var s = '';
							var cnt = '';
							$.each(this.points, function(i, point) { //여기
								cnt = $more3DashDetail.util.comma(point.y);
								if(cnt > 0) {
									s += point.series.name +' <span style="color:#EEFF2E">'+ cnt +' 만개<br/></span>';
								}else if(cnt == 0) {
									s += point.series.name +' <span style="color:#EEFF2E">자료없음<br/></span>';
								}
							});
							return s;
								
						},
						shared: true
					},
					series: seriesyearData4 
				});
			}
			let rotation = 0;
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				rotation = -45;
			}else {
				rotation = 0;
			}
			var charts51 = Highcharts.chart('chart51', {
				chart : {
					type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
					marginTop:20,
					style: {
						//fontFamily: 'Noto Sans KR',
					}
				},
				credits: {
					enabled: false
				}, //highchart 워터마크 숨김처리
				exporting: {
					enabled: false,
					chartOptions: {
						series: {
							dataLabels: {
								style: {
									fontFamily: $more3DashDetail.downloadFont,
									textOverflow: "width",
								}
							},
						},
						legend: {
							itemStyle: {
								fontFamily: $more3DashDetail.downloadFont,
							},
						},
						xAxis: {
							labels: {
								rotation: rotation,
								style: {
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
					}
				},
				title: {
					text: '',
				},
				legend: {
					enabled: true,
					margin: 0,
					width: 100,
					verticalAlign: 'middle',
					align: 'left',
					margin: 5,
					x: -15,
					y:-10,
					itemMarginTop: 8,
					itemHoverStyle: {color: '#FF0000',},
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333333',
						textAlign:'center',
						fontWeight: '600',
					}
				},
				xAxis: xAxis5, 
				yAxis: [{
					//y axis 왼쪽
					title: {
						text: '',
					},
					labels: {
						enabled: false
					}
				}],
				lang: {
					noData: '없습니다'
				},
				noData: {
					useHTML: true,
				},
				tooltip: {
					useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
					enabled : true,
					borderRadius: 10,
					backgroundColor :'#000000',
					borderWidth:0,
					shadow: false,
					padding:12,
					style: {
						fontSize :'14px',
						color: '#fff',
						textAlign:'center',
						fontWeight: '600',
						lineHeight:1.2,
					},
					formatter: function() {
						if(this.y > 0) {
							return this.series.name + '</br><span style="color:#EEFF2E">' + $more3DashDetail.util.comma(this.y) + ' 만개</span>';
						}else if(this.y == 0) {
							return this.series.name + '</br><span style="color:#EEFF2E">자료없음</span>';
						}
					},
				},
				plotOptions: {
					series: {
						borderRadius: 5,
						//bar 너비
						pointWidth: 22,
					}
				},
				series: seriesyearData5
			});
			
			let removeChart6 = $('.modalSearchYear option:selected').val();
			let yearDt = "";
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3003" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009" ||
			   tblId == "DT_1EP_3010" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" ||
			   tblId == "DT_1EP_3019" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" ||
			   tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				
				if(tblId == "DT_1EP_3035") {
					yearDt = '2018';
				}else {
					yearDt = '2016';
				}
				if(removeChart6 > yearDt) {
					///증감막대
					var charts61 = Highcharts.chart('chart61', {
						chart : {
							type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
							marginTop:20,
							style: {
								//fontFamily: 'Noto Sans KR',
							}
						},
						credits: {enabled: false}, //highchart 워터마크 숨김처리
						exporting: {
							enabled: false,
							chartOptions: {
								series: {
									dataLabels: {
										style: {
											fontFamily: $more3DashDetail.downloadFont,
										}
									},
								},
								xAxis: {
									labels: {
										style: {
											fontFamily: $more3DashDetail.downloadFont,
										}
									},
								},
							}
						},
						title: { text: '', },
						legend: {
							enabled: false,// 범례
							margin: 0,
							width: 100,
							verticalAlign: 'middle',
							align: 'left',
							itemMarginTop: 8,
							itemStyle: {
								textOverflow: "ellipsis"
							}
						},
						xAxis: xAxis6,
						yAxis: [{
							/*max: 50,
							min: -10,*/
							title: {
								text: ''
							},
							labels: {
								enabled: false,
								tickInterval: 100,
								style: {
									color:'#494949',
									fontSize: '11px',
									fontWeight: 'bold'
								},
							},
						}],
						plotOptions: {
							series: {
								borderRadius: 5,
								//bar 너비
								pointWidth: 22,
							}
						},
						series: seriesyearData6,
						tooltip: {
							useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
							borderRadius: 10,
							backgroundColor :'#000000',
							borderWidth:0,
							shadow: false,
							padding:12,
							style: {
								fontSize :'14px',
								color: '#fff',
								textAlign:'center',
								fontWeight: '600',
								lineHeight:1.2,
							},
							formatter: function() {
								var count = "";
								var totVal = "";
								totVal = $more3DashDetail.util.comma(newJobVal[Number(this.point.x)]);
								if(Number(totVal) == "0.0") {
									return '<span style="color:#EEFF2E">변동없음</span>';
								}else {
									return this.x + ' 일자리수</br> <span style="color:#EEFF2E">' + totVal + ' 만개</span>';
								}
							},
						},
					});
				}else {
					$('#tab61 .chartbox .highcharts-figure #chart61').remove();
					$('#tab61 .chartbox .highcharts-figure').append("<div class='chart_none'><img src='/images/totSurv/ChartNone.png'><br>해당 년도의 자료가 없습니다.</div>");
				}
			}
			
			$('#downPicture2').off('click');
			$('#downPicture5_1').off('click');
			$('#downPicture2').click(function(){
				for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
					if($('.tabArea2 .chartbox div').attr('id') == 'chart2'){charts21.exportChart();}
				}
			});
			$('#downPicture3').click(function(){
				for(var i = 0; i < $('.tabArea3 .tab_content').length; i++){
					if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart31'){charts31.exportChart();}
					else {return;}
				}
			});
			$('#downPicture4').click(function(){
				for(var i = 0; i < $('.tabArea4 .tab_content').length; i++){
					if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
					else {return;}
				}
			});
			$('#downPicture5').click(function(){
				if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
				   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
					for(var i = 0; i < $('.tabArea5 .tab_content').length; i++){
						if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
						else {return;}
					}
				}else {
					for(var i = 0; i < $('.tabArea5 .tab_content').length; i++){
						if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart51'){charts51.exportChart();}
						else {return;}
					}
				}
			});
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				$('#downPicture5_1').click(function(){
					for(var i = 0; i < $('.tabArea5_1 .tab_content').length; i++){
						if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart51'){charts51.exportChart();}
						else {return;}
					}
				});
			}
			$('#downPicture6').click(function(){
				for(var i = 0; i < $('.tabArea6 .tab_content').length; i++){
					if($('.tabArea6 .tab_content.on .chartbox div').attr('id') == 'chart61'){charts61.exportChart();}
					else {return;}
				}
			});
			//$('.highcharts-root .highcharts-legend.highcharts-no-tooltip').css('display', 'none');
		},
		/**
		 * @name : $more1DashDetail.chart.selectOtherData
		 * @description : 1번차트의 셀렉트 선택 이벤트 
		 * @date : 2022.09.28
		 * @author : 조규환
		 * @history :
		 */
		selectOtherData : function(res, value, legendNm, legendNm1) {
			let tblNm = res[0].TBL_NM;
			let tblId = res[0].TBL_ID;
			let totJob = Number(res[0].DT);
			let classNm3 = value;
			let legendLength = "";
			let classNm1 = "";
			let objL2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"]; //산업대분류별 코드
			let otherParam = new Array;
			let dataVal = new Array;
			let data = new Array;
			let result = new Array;
			let series = new Array;
			let legend = new Array;
			let newEstPrdCnt = '5';
			let prdDe = new Array;
			$("#chart1_1").empty();
			$("#chart1_2").empty();
			$("#chart11").empty();
			$("#chart12").empty();
			$("#chart13").empty();
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				classNm1 = $("#more1ChartTitle1_1 .titleChart1 #selectChoice1 option:selected").text(); //select text 가져오기(구분)
			}else {
				classNm1 = $("#selectChoice1 option:selected").text(); //select text 가져오기(구분)
			}
			let legendName = ["회사법인", "회사이외법인", "정부ㆍ비법인단체", "개인기업체"];
			if(classNm1 == "조직형태별") { //조직형태
				chartColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			}else if(classNm1 == "기업규모별") { //기업규모
				chartColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			}else if(classNm1 == "종사자규모별") { //종사자
				chartColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#F97A10', '#F7A35C', '#FBDBC0'];
			}else if(classNm1 == "산업분류별" || classNm1 == "산업대분류별") { //산업분류
				chartColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
							 ,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			}else if(classNm1 == "성별") { //성별
				chartColor = ['#7CB5EC', '#F15C80'];
			}else if(classNm1 == "연령대별" || classNm1 == "연령별") { //연령대
				chartColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			}else if(classNm1 == "근속기간별") { //근속기간별
				chartColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			}else if(classNm1 == "종사상지위별") { //종사상지위별
				chartColor = ['#7CB5EC', '#F15C80'];
			}
			let C2;
			if(tblId == "DT_1EP_3021") {
				C2 = "0";
			}else if(tblId == "DT_1EP_3020" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023") {
				C2 = "00";
			}
			if(tblNm == "조직형태별 일자리" || tblNm == "연령대별 일자리" || tblNm == "근속기간별 일자리" || tblNm == "종사상지위별 일자리") {
				legendLength = legendNm1;
				legend = legendNm1;
				for(var i = 0; i < legendLength.length; i++) {
					otherParam = {
						'apiKey':apiKey,
						'itmId':"T00",
						'objL1':(i+1)*10,
						'objL2':"00",
						'format':"json",
						'jsonVD':"Y",
						'prdSe':"Y",
						/*'startPrdDe':"2016",
						'endPrdDe':"2020",
						'loadGubun':"1",*/
						'newEstPrdCnt': newEstPrdCnt,
						'orgId':"101",
						'tblId':tblId
					}
					dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
				}
			}else if(tblNm == "기업규모별 일자리") {
				let count = [11, 12, 20];
				legendLength = legendNm1;
				legend = legendNm1;
				for(var i = 0; i < legendLength.length; i++) {
					otherParam = {
							'apiKey':apiKey,
							'itmId':"T00",
							'objL1':count[i],
							'objL2':"00",
							'format':"json",
							'jsonVD':"Y",
							'prdSe':"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId':"101",
							'tblId':tblId
						}
					dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
				}
			}else if(tblNm == "종사자규모별 일자리") {
				legendLength = legendNm1;
				legend = legendNm1;
				for(var i = 0; i < legendLength.length; i++) {
					otherParam = {
							'apiKey':apiKey,
							'itmId':"T00",
							'objL1':"00",
							'objL2':(i+1)*10,
							'objL3':"00",
							'format':"json",
							'jsonVD':"Y",
							'prdSe':"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId':"101",
							'tblId':tblId
						}
					dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
				}
			}else if(tblNm == "산업분류별 일자리") {
				legendLength = legendNm1;
				legend = legendNm1;
				if(classNm3 == 1) {
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*100,
							'objL2': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "성별 일자리") {
				legendLength = legendNm1;
				legend = legendNm1;
				for(var i = 0; i < legendLength.length; i++) {
					otherParam = {
						'apiKey' : 		apiKey,
						'itmId': 		"T00",
						'objL1': 		i+1,
						'objL2': 		"00",
						'format': 		"json",
						'jsonVD': 		"Y",
						'prdSe': 		"Y",
						/*'startPrdDe':"2016",
						'endPrdDe':"2020",
						'loadGubun':"1",*/
						'newEstPrdCnt': newEstPrdCnt,
						'orgId': 		"101",
						'tblId': 		tblId
					}
					dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
				}
			}else if(tblNm == "조직형태별 종사자규모별 일자리") {
				if(classNm1 == "조직형태별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "종사자규모별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "조직형태별 산업대분류별 일자리") {
				if(classNm1 == "조직형태별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "산업대분류별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		objL2[i],
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "조직형태별 성별 일자리") {
				if(classNm1 == "조직형태별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"0",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "성별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		i+1,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "조직형태별 연령대별 일자리") {
				if(classNm1 == "조직형태별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "연령대별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "조직형태별 근속기간별 일자리") {
				if(classNm1 == "조직형태별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "근속기간별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "조직형태별 종사상지위별 일자리") {
				if(classNm1 == "조직형태별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "종사상지위별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "기업규모별 산업대분류별 일자리") {
				let count = ["11", "12", "20"];
				if(classNm1 == "기업규모별") {
					legendLength = legendNm
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		count[i],
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "산업대분류별") {
					legendLength = legendNm1
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		objL2[i],
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "기업규모별 성별 일자리" || tblNm == "기업규모별 연령대별 일자리" || tblNm == "기업규모별 근속기간별 일자리") {
				let C2;
				if(tblId == "DT_1EP_3017") {C2 = "0";}
				else if(tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019") {C2 = "00";}
				
				if(classNm1 == "기업규모별") {
					legendLength = legendNm
					legend = legendNm;
					let count = ["11", "12", "20"];
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		count[i],
							'objL2': 		C2,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "성별") {
					legendLength = legendNm1
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1),
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "연령대별" || classNm1 == "근속기간별") {
					legendLength = legendNm1
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "종사자규모별 산업대분류별 일자리" || tblNm == "종사자규모별 성별 일자리" || tblNm == "종사자규모별 연령대별 일자리" || tblNm == "종사자규모별 근속기간별 일자리") {
				if(classNm1 == "종사자규모별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		C2,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "산업대분류별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		objL2[i],
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "성별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		i+1,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "연령대별" || classNm1 == "근속기간별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "성별 산업대분류별 일자리" || tblNm == "성별 연령대별 일자리" || tblNm == "성별 근속기간별 일자리" || tblNm == "성별 종사상지위별 일자리") {
				if(classNm1 == "성별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		i+1,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "산업대분류별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"0",
							'objL2': 		objL2[i],
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "연령대별" || classNm1 == "연령별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"0",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "근속기간별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"0",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "종사상지위별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"0",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "연령대별 산업대분류별 일자리" || tblNm == "연령대별 종사상지위별 일자리") {
				if(classNm1 == "연령대별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "산업대분류별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		objL2[i],
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "종사상지위별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "근속기간별 산업대분류별 일자리") {
				if(classNm1 == "근속기간별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "산업대분류별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		objL2[i],
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "종사상지위별 산업대분류별 일자리" || tblNm == "종사상지위별 근속기간별 일자리") {
				if(classNm1 == "종사상지위별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "산업대분류별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		objL2[i],
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "근속기간별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "종사상지위별 성별 연령별 일자리" || tblNm == "종사상지위별 성별 근속기간별 일자리") {
				if(classNm1 == "종사상지위별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		(i+1)*10,
							'objL2': 		"0",
							'objL3': 		"00",
							'objL4': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "성별") {
					legendLength = ["남자", "여자"];
					legend = ["남자", "여자"];
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		i+1,
							'objL3': 		"00",
							'objL4': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "연령별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		"0",
							'objL3': 		(i+1)*10,
							'objL4': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "근속기간별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"00",
							'objL2': 		"0",
							'objL3': 		(i+1)*10,
							'objL4': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
			}else if(tblNm == "(장애인) 성별 연령대별 일자리") {
				if(classNm1 == "성별") {
					legendLength = legendNm;
					legend = legendNm;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		i+1,
							'objL2': 		"00",
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}else if(classNm1 == "연령별") {
					legendLength = legendNm1;
					legend = legendNm1;
					for(var i = 0; i < legendLength.length; i++) {
						otherParam = {
							'apiKey' : 		apiKey,
							'itmId': 		"T00",
							'objL1': 		"0",
							'objL2': 		(i+1)*10,
							'objL3': 		"00",
							'format': 		"json",
							'jsonVD': 		"Y",
							'prdSe': 		"Y",
							/*'startPrdDe':"2016",
							'endPrdDe':"2020",
							'loadGubun':"1",*/
							'newEstPrdCnt': newEstPrdCnt,
							'orgId': 		"101",
							'tblId': 		tblId
						}
						dataVal.push($more1DashDetail.util.OtherDataCommonAjax(otherParam));
					}
				}
				//callback(dataVal);
			}
			let s = 0;
			let selectChartVal = new Array;
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				s = 3000;
			}else {
				s = 2000;
			} 
			
			setTimeout(function(){
				for(let i=0; i < dataVal.length; i++) {
					selectChartVal.push(dataVal[i][0]); 
				}
				for(var j = 0; j < selectChartVal.length; j++){
					for(var i = 0; i < selectChartVal[0].length; i++) {
						data.push(Number(selectChartVal[j][i].DT));
					}
				}
				result = $more1DashDetail.util.division(data, selectChartVal[0].length);
				for(let i=0; i<selectChartVal[0].length; i++) {
					prdDe.push(selectChartVal[0][i].PRD_DE);
				}
				for(var i = 0; i < selectChartVal.length; i++) { //1번 카운트 시리즈
					series.push({
						name: legend[i],
						data: result[i],
						color: chartColor[i],
						marker: {
							radius: 3,
							symbol: 'circle',
							lineColor:'#7CB5EC',
							fillColor:'#ffffff',
						},
						//dashStyle: 'longdash',
						lineWidth: 2,
						/*dataLabels: {
							enabled: true,
							format: '{y}만개',
							enableMouseTracking: true,
							style: {
								fontSize :'14px',
								color: '#000',
								fontWeight: '600',
							},
							formatter: function () {
								if (this.x === this.series.data.length - 1) {
									return this.series.name + ': ' + formatNumber(this.y);
								}
								return null;
							}
						},*/
						dataLabels: {
							enabled: true,
							//format: '{y}만개',
							style: {
								fontSize :'14px',
								color: '#000',
								fontWeight: '600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '만개';
							},
						},
					});
				}
				$more1DashDetail.chart.otherMakeChart1(series, tblNm, classNm1, tblId, prdDe);
			},s);
		},
		callback : function(dataVal) {
			
		},
		/**
		 * @name : $more1DashDetail.chart.selectOtherData3
		 * @description : 3번차트의 셀렉트 선택 이벤트 
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		selectOtherData3 : function(res, value) {
			let tblNm = res[0].TBL_NM;
			let tblId = res[0].TBL_ID;
			let totC2 = "";
			let totJobVal = "";
			let totJob = "";
			let classNm1 = value;
			let chartVal = new Array;
			let series = new Array;
			let dataEnabled = "";
			let classNm3 = $("#selectChoice3 option:selected").text(); //버튼 text 가져오기(구분)
			//let tab31_1 = $(".chartNm4 .chartButton4_1 ul .active .tab31-1").text();
			//let tab31_1 = $(".tabArea3 .tab_container2 .tabs2 ul .active .tab31-1").text();
			let tab31_1 = $(".titleChart3 .chartButton3_1 ul .active .tab31-1").text();
			let c1 = "";
			let c2 = "";
			let industryC1 = [];
			let pieColor = new Array;
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" | tblId == "DT_1EP_3030") {
				if(classNm1 == "0") {c1 = "00";}
				else if(classNm1 == "1") {c1 = "10";}
				else if(classNm1 == "2") {c1 = "20";}
				else if(classNm1 == "3") {c1 = "30";}
				else if(classNm1 == "4") {c1 = "40";}
				else if(classNm1 == "5") {c1 = "50";}
				else if(classNm1 == "6") {c1 = "60";}
				else if(classNm1 == "7") {c1 = "70";}
				else if(classNm1 == "8") {c1 = "80";}
				else if(classNm1 == "9") {c1 = "90";}
				else if(classNm1 == "10") {c1 = "100";}
				else if(classNm1 == "11") {c1 = "110";}
				else if(classNm1 == "12") {c1 = "120";}
				else if(classNm1 == "13") {c1 = "130";}
				else if(classNm1 == "14") {c1 = "140";}
				else if(classNm1 == "15") {c1 = "150";}
				else if(classNm1 == "16") {c1 = "160";}
				else if(classNm1 == "17") {c1 = "170";}
				else if(classNm1 == "18") {c1 = "180";}
				else if(classNm1 == "19") {c1 = "190";}
				else if(classNm1 == "10") {c1 = "200";}
				else if(classNm1 == "21") {c1 = "210";}
			}
			//남여 구분
			if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021") {
				c2 = "0"; //여자
			}else {
				c2 = "00" //남자
			}
			if(tblId == "DT_1EP_3003") {
				pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#F97A10', '#F7A35C', '#FBDBC0'];
				if(classNm3 == "영리기업") {
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == '10' && res[i].C2 == '00' && res[i].C3 == '00') {
							totJobVal = Number(res[i].DT);
						}
						if(res[i].C1_NM == "영리기업" && res[i].C3_NM == "총 계") {
							if(res[i].C2_NM != "총 계") {
								chartVal.push([res[i].C2_NM, Number(res[i].DT)]);
							}
						}
					}
				}
				if(classNm3 == "비영리기업") {
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == '20' && res[i].C2 == '00' && res[i].C3 == '00') {
							totJobVal = Number(res[i].DT);
						}
						if(res[i].C1_NM == "비영리기업" && res[i].C3_NM == "총 계") {
							if(res[i].C2_NM != "총 계") {
								chartVal.push([res[i].C2_NM, Number(res[i].DT)]);
							}
						}
					}
				}
				totJob = totJobVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1EP_3005") {
				pieColor =  ['#7CB5EC', '#F15C80'];
				if(classNm1 == "0") {industryC1.push("000");}
				else if(classNm1 == "1") {industryC1.push("100");}
				
				for(let i = 0; i < res.length; i++) {	
					if(res[i].C1 == industryC1) {
						if(res[i].C2 == "10" || res[i].C2 == "20") {
							chartVal.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015") {
				if(tblId == "DT_1EP_3010") {pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#F97A10', '#F7A35C', '#FBDBC0'];}
				else if(tblId == "DT_1EP_3011") {pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
															,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];}
				else if(tblId == "DT_1EP_3012") {pieColor = ['#7CB5EC', '#F15C80'];}
				else if(tblId == "DT_1EP_3013") {pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];}
				else if(tblId == "DT_1EP_3014") {pieColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];}
				else if(tblId == "DT_1EP_3015") {pieColor = ['#7CB5EC', '#F15C80'];}
				if(classNm3 == "총계") {c1 = "00";}
				else if(classNm3 == "회사법인") 			{c1 = "10";}
				else if(classNm3 == "회사이외법인") 		{c1 = "20";}
				else if(classNm3 == "정부 · 비법인단체")	{c1 = "30";}
				else if(classNm3 == "개인기업체")			{c1 = "40";}
				
				if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015") {
					totC2 = '00';
				}else if(tblId == "DT_1EP_3012") {
					totC2 = '0';
				}
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == totC2 && res[i].C3 == "00") {
						totJobVal = Number(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							chartVal.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
				}
			}else if(tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019") {
				if(tblId == "DT_1EP_3016") {pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
													   ,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];}
				else if(tblId == "DT_1EP_3017") {pieColor = ['#7CB5EC', '#F15C80'];}
				else if(tblId == "DT_1EP_3018") {pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];}
				else if(tblId == "DT_1EP_3019") {pieColor =  ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];}
				if(classNm3 == "총계") {c1 = "00";}
				else if(classNm3 == "대기업") 		{c1 = "11";}
				else if(classNm3 == "중소기업") 	{c1 = "12";}
				else if(classNm3 == "비영리기업") 	{c1 = "20";}
				if(tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019") {
					totC2 = '00';
				}else if(tblId == "DT_1EP_3017") {
					totC2 = '0';
				}
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == totC2 && res[i].C3 == "00") {
						totJobVal = Number(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							chartVal.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
				}
			}else if(tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030") {
				if(tblId == "DT_1EP_3020" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030") {
					pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
							   ,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];}
				else if(tblId == "DT_1EP_3021") {pieColor = ['#7CB5EC', '#F15C80'];}
				else if(tblId == "DT_1EP_3022") {pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];}
				else if(tblId == "DT_1EP_3023") {pieColor =  ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];}
				else if(tblId == "DT_1EP_3029") {pieColor =  ['#7CB5EC', '#F15C80'];}
				if(tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3029") {
					totC2 = '00';
				}else if(tblId == "DT_1EP_3021") {
					totC2 = '0';
				}
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == totC2 && res[i].C3 == "00") {
						totJobVal = Number(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							chartVal.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
				}
			}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3035") {
				if(tblId == "DT_1EP_3024") {
					pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
							   ,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];}
				else if(tblId == "DT_1EP_3025" || tblId == "DT_1EP_3035") {pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];}
				else if(tblId == "DT_1EP_3026") {pieColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];}
				else if(tblId == "DT_1EP_3027") {pieColor =   ['#7CB5EC', '#F15C80'];}
				
				if(classNm3 == "총계") {c1 = "0";}
				else if(classNm3 == "남자" || classNm3 == "    남자") {c1 = "1";}
				else if(classNm3 == "여자" || classNm3 == "    여자") {c1 = "2";}
				
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == '00' && res[i].C3 == "00") {
						totJobVal = Number(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
				}
			}else if(tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				if(tblId == "DT_1EP_3031") {
					pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
							   ,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
				}else if(tblId == "DT_1EP_3032") {
					pieColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
				}
				if(classNm3 == "총계") {c1 = "00";}
				else if(classNm3 == "임금일자리") 	{c1 = "10";}
				else if(classNm3 == "비임금일자리") {c1 = "20";}
				
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == '00' && res[i].C3 == "00") {
						totJobVal = Number(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							chartVal.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
				}
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
				if(tblId == "DT_1EP_3033") {
					pieColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
				}else if(tblId == "DT_1EP_3034") {
					pieColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
				}
				if(tab31_1 == "총계") {c2 = "0"}
				else if(tab31_1 == "남자") {c2 = "1"}
				else if(tab31_1 == "여자") {c2 = "2"}
				if(classNm3 == "총계") {c1 = "00";}
				else if(classNm3 == "임금일자리") 	{c1 = "10";}
				else if(classNm3 == "비임금일자리") {c1 = "20";}
				
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 == "00" && res[i].C4 == "00") {
						totJobVal = Number(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 != "00" && res[i].C4 == "00") {chartVal.push([res[i].C3_NM, Number(res[i].DT)]);}
				}
			}
			totJob = totJobVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || 
			   tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || 
			   tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				dataEnabled = false;
			}else {
				dataEnabled = true;
			}
			
			series.push({
				type: 'pie',
				innerSize: '80%',
				data: chartVal,
				dataLabels: {
					enabled: dataEnabled,
					format: '{point.percentage:.1f} %',
					align: 'center',
					style: {
						fontSize: '14px', 
					}
				},
				color: ""
			});
			$more1DashDetail.chart.otherMakeChart3(tblNm, tblId ,series, classNm3, totJob, classNm1, pieColor);
		},
		/**
		 * @name : $more1DashDetail.chart.selectOtherData4
		 * @description : 4번차트의 셀렉트 선택 이벤트 
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		selectOtherData4 : function(res, value, xAxis4) {
			let tblNm = res[0].TBL_NM;
			let tblId = res[0].TBL_ID;
			let classNm1 = value;
			let industryC1 = "";
			let chartDataNm4 = new Array;
			let chartDataDt1 = new Array
			let chartDataDt2 = new Array
			let chartDataDt3 = new Array
			let seriesyearData = new Array;
			let seriesyearData1 = new Array;
			let seriesyearData4 = new Array;
			let chartVal1_1 = new Array;
			let chartVal1_2 = new Array;
			let chartVal1_3 = new Array;
			let industryChartVal2_1 = new Array;
			let industryCntTotVal = new Array;
			let classNm4 = "";
			let colorsCnt1 = 0;
			let colorsCnt2 = 0;
			let stackData = new Array;
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				classNm4 = $(".select5 #selectChoice4 option:selected").text(); //버튼 text 가져오기(구분)
			}else {
				classNm4 = $("#selectChoice4 option:selected").text(); //버튼 text 가져오기(구분)
			}
			let tab41_1 = $(".titleChart4 .chartButton4_1 ul .active .tab41-1").text();
			let c1 = "";
			let c2 = "";
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" ||
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				if(classNm1 == "0") c1 = "00";
				else if(classNm1 == "1" || classNm4 == "영리기업" || classNm4 == "임금일자리") c1 = "10";
				else if(classNm1 == "2" || classNm4 == "비영리기업" || classNm4 == "비임금일자리") c1 = "20";
				else if(classNm1 == "3") c1 = "30";
				else if(classNm1 == "4") c1 = "40";
				else if(classNm1 == "5") c1 = "50";
				else if(classNm1 == "6") c1 = "60";
				else if(classNm1 == "7") c1 = "70";
				else if(classNm1 == "8") c1 = "80";
				else if(classNm1 == "9") c1 = "90";
				else if(classNm1 == "10") c1 = "100";
				else if(classNm1 == "11") c1 = "110";
				else if(classNm1 == "12") c1 = "120";
			}
			if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3035") {
				c2 = "0";
			}else {
				c2 = "00"
			}
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			//4번차트
			if(tblId == "DT_1EP_3003") { //종사자규모별 일자리
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "10") { //지속
						chartVal1_1.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "20") { //대체
						chartVal1_2.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "30") { //신규
						chartVal1_3.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							stackData.push(Number(res[i].DT).toFixed(1));
						}
					}
				}
			}else if(tblId == "DT_1EP_3005") {
				if(classNm1 == "0") {
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400"  || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800" || 
								res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500" || res[i].C1 == "1600" 
									|| res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100") {
							if(res[i].C2 == "00") {
								//chartDataNm4.push(res[i].C1_NM);
								colorsCnt1 += 1; //colorValue: colorCount
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
						}
						if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400"  || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800" || 
								res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500" || res[i].C1 == "1600" 
									|| res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100") {
							/*if(res[i].C2 == "10" ) {
								chartDataDt1.push(res[i].DT);
							}else if(res[i].C2 == "20") {
								chartDataDt2.push(res[i].DT);
							}else if(res[i].C2 == "30") {
								chartDataDt3.push(res[i].DT);
							}*/colorsCnt2 += 1;
							if(res[i].C2 == "10" ) { //데이터 정렬
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}else if(classNm1 == "1") {
					industryC1 = "100";
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
							industryCntTotVal.push(res[i].DT);
						}
						if(res[i].C1 == industryC1) {
							colorsCnt2 += 1;
							if(res[i].C2 == "10" ) {
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}else if(classNm1 == "2") {
					for(let i = 1; i < 5; i++) {
						industryC1 = "20"+i;
						for(let i = 0; i < res.length; i++) {
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "3") {
					for(let i = 1; i < 25; i++) {
						if(i < 10) {industryC1 = "30"+i;}
						else {industryC1 = "3"+i;}
						for(let i = 0; i < res.length; i++) {
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "4") {
					industryC1 = "400";
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
							industryCntTotVal.push(res[i].DT);
						}
						if(res[i].C1 == industryC1) {
							colorsCnt2 += 1;
							if(res[i].C2 == "10" ) {
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}else if(classNm1 == "5") {
					for(let i = 1; i < 5; i++) {
						industryC1 = "50"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "6") {
					for(let i = 1; i < 3; i++) {
						industryC1 = "60"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "7") {
					for(let i = 1; i < 4; i++) {
						industryC1 = "70"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "8") { //운수 및 창고업
					for(let i = 1; i < 5; i++) {
						industryC1 = "80"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "9") { //숙박 및 음식점업
					for(let i = 1; i < 3; i++) {
						industryC1 = "90"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "10") { //정보통신업
					for(let i = 1; i < 7; i++) {
						industryC1 = "100"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "11") { //금융 빛 보험업
					for(let i = 1; i < 4; i++) {
						industryC1 = "110"+i;
						for(let i = 0; i < res.length; i++) {
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "12") { //부동산업
					industryC1 = "1200";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
							industryCntTotVal.push(res[i].DT);
						}
						if(res[i].C1 == industryC1) {
							colorsCnt2 += 1;
							if(res[i].C2 == "10" ) {
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}else if(classNm1 == "13") { //전문, 과학 및 기술 서비스업
					for(let i = 1; i < 5; i++) {
						industryC1 = "130"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								if(res[i].C2 == "10" ) {
									colorsCnt2 += 1;
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "14") { //사업시설관리, 사업 지원 및 임대 서비스업
					for(let i = 1; i < 4; i++) {
						industryC1 = "140"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "15") { //공공행정, 국방 및 사회보장 행정
					industryC1 = "1500";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
							industryCntTotVal.push(res[i].DT);
						}
						if(res[i].C1 == industryC1) {
							colorsCnt2 += 1;
							if(res[i].C2 == "10" ) {
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}else if(classNm1 == "16") { //교욱 서비스업
					industryC1 = "1600";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
							industryCntTotVal.push(res[i].DT);
						}
						if(res[i].C1 == industryC1) {
							colorsCnt2 += 1;
							if(res[i].C2 == "10" ) {
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}else if(classNm1 == "17") { //보건업 및 사회복지 서비스업
					for(let i = 1; i < 3; i++) {
						industryC1 = "170"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "18") { //예술, 스포츠 및 여가관련 서비스업
					for(let i = 1; i < 3; i++) {
						industryC1 = "180"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "19") { //협회 및 단체, 수리 및 기타 개인 서비스업
					for(let i = 1; i < 4; i++) {
						industryC1 = "190"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == "00") {
								colorsCnt1 += 1;
								chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
								industryCntTotVal.push(res[i].DT);
							}
							if(res[i].C1 == industryC1) {
								colorsCnt2 += 1;
								if(res[i].C2 == "10" ) {
									chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "20") {
									chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}else if(res[i].C2 == "30") {
									chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
								}
							}
						}
					}
				}else if(classNm1 == "20") { //가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동
					industryC1 = "2000";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
							industryCntTotVal.push(res[i].DT);
						}
						if(res[i].C1 == industryC1) {
							colorsCnt2 += 1;
							if(res[i].C2 == "10" ) {
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}else if(classNm1 == "21") { //국제 및 외국기관
					industryC1 = "2100";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							colorsCnt1 += 1;
							chartDataNm4.push({id: res[i].C1, name: res[i].C1_NM, color: industryColor[colorsCnt1]});
							industryCntTotVal.push(res[i].DT);
						}
						if(res[i].C1 == industryC1) {
							colorsCnt2 += 1;
							if(res[i].C2 == "10" ) {
								chartDataDt1.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "20") {
								chartDataDt2.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}else if(res[i].C2 == "30") {
								chartDataDt3.push({name: res[i].C2_NM, value: Number(res[i].DT), parent: res[i].C1});
							}
						}
					}
				}
			}else if(tblId == "DT_1EP_3010") { //조직형태별 종사자규모별 일자리
				if(classNm4 == "총계") {c1 = "00";}
				else if(classNm4 == "회사법인") {c1 = "10";}
				else if(classNm4 == "회사이외법인") {c1 = "20";}
				else if(classNm4 == "정부 · 비법인단체") {c1 = "30";}
				else if(classNm4 == "개인기업체") {c1 = "40";}
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "20") {
						chartVal1_2.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal1_3.push([res[i].C3_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							stackData.push(Number(res[i].DT).toFixed(1));
						}
					}
				}
			}else if(tblId == "DT_1EP_3020") {
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryCntTotVal.push(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C2 != c2) {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "20") { 
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt3.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
				}
			}else if(tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016") {
				if(classNm4 == "총계") {c1 = "00";}
				else if(classNm4 == "회사법인") {c1 = "10";}
				else if(classNm4 == "회사이외법인" || classNm4 == "비영리기업") {c1 = "20";}
				else if(classNm4 == "대기업") {c1 = "11";}
				else if(classNm4 == "중소기업") {c1 = "12";}
				else if(classNm4 == "정부 · 비법인단체") {c1 = "30";}
				else if(classNm4 == "개인기업체") {c1 = "40";}
				
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryCntTotVal.push(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "20") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt3.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							stackData.push(Number(res[i].DT).toFixed(1));
						}
					}
				}
			}else if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015") {
				if(classNm4 == "총계") {c1 = "00";}
				else if(classNm4 == "회사법인") {c1 = "10";}
				else if(classNm4 == "회사이외법인") {c1 = "20";}
				else if(classNm4 == "정부 · 비법인단체") {c1 = "30";}
				else if(classNm4 == "개인기업체") {c1 = "40";}
				
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "30") {
						chartVal1_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							stackData.push(Number(res[i].DT).toFixed(1));
						}
					}
				}
			}else if(tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019") {
				if(classNm4 == "총계") {c1 = "00";}
				else if(classNm4 == "대기업") {c1 = "11";}
				else if(classNm4 == "중소기업") {c1 = "12";}
				else if(classNm4 == "비영리기업") {c1 = "20";}
				
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "30") {
						chartVal1_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							stackData.push(Number(res[i].DT).toFixed(1));
						}
					}
				}
			}else if(tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023") {
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "30") {
						chartVal1_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							stackData.push(Number(res[i].DT).toFixed(1));
						}
					}
				}
				console.log(stackData);
			}else if(tblId == "DT_1EP_3024") {
				if(classNm4 == "총계") {c1 = "0";}
				else if(classNm4 == "남자") {c1 = "1";}
				else if(classNm4 == "여자") {c1 = "2";}
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryCntTotVal.push(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
						if(res[i].C1 == c1 && res[i].C3 == "00") {
							if(res[i].C2 != "00") {
								stackData.push(Number(res[i].DT).toFixed(1));
							}
						}
					}
				}
			}else if(tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027") {
				if(classNm4 == "총계") {c1 = "0";}
				else if(classNm4 == "남자") {c1 = "1";}
				else if(classNm4 == "여자") {c1 = "2";}
				
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal1_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							stackData.push(Number(res[i].DT).toFixed(1));
						}
					}
				}
				/*for(let i =0; i<chartVal1_1.length; i++ ) {
					if(isNaN(chartVal1_1[i])) {
						chartVal1_1[i] = 0;
					}
				}
				for(let i =0; i<chartVal1_2.length; i++ ) {
					if(isNaN(chartVal1_2[i])) {
						chartVal1_2[i] = 0;
					}
				}*/
			}else if(tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") { //연령대별 산업대분류별 일자리
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "00") {
						colorsCnt1 += 1;
						chartDataNm4.push({id: res[i].C2, name: res[i].C2_NM, color: industryColor[colorsCnt1]});
						industryCntTotVal.push(res[i].DT);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00") {
						colorsCnt2 += 1;
						if(res[i].C3 == "10" ) {
							chartDataDt1.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}else if(res[i].C3 == "30") {
							chartDataDt2.push({name: res[i].C3_NM, value: Number(res[i].DT), parent: res[i].C2});
						}
						if(res[i].C1 == c1 && res[i].C3 == "00") {
							if(res[i].C2 != c2) {
								stackData.push(Number(res[i].DT).toFixed(1));
							}
						}
					}
				}
				let test = new Array;
				for(let i = 0; i<chartDataDt2.length; i++) {
					if(chartDataDt2[i].value == '-') {
						chartDataDt2[i].value = 0;
					}
				}
				for(let i =0; i<chartDataDt1.length; i++ ) {
					if(isNaN(chartDataDt1[i].value)) {
						chartDataDt1[i].value = 0;
					}
				}
				for(let i =0; i<chartDataDt2.length; i++ ) {
					if(isNaN(chartDataDt2[i].value)) {
						chartDataDt2[i].value = 0;
					}
				}
			}else if(tblId == "DT_1EP_3029") {
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal1_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "00") {
						stackData.push(Number(res[i].DT));
					}
				}
				for(let i =0; i<chartDataDt1.length; i++ ) {
					if(isNaN(chartDataDt1[i].value)) {
						chartDataDt1[i].value = 0;
					}
				}
				for(let i =0; i<chartDataDt2.length; i++ ) {
					if(isNaN(chartDataDt2[i].value)) {
						chartDataDt2[i].value = 0;
					}
				}
			}else if(tblId == "DT_1EP_3032") {
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal1_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							stackData.push(Number(res[i].DT));
						}
					}
				}
				for(let i =0; i<chartDataDt1.length; i++ ) {
					if(isNaN(chartDataDt1[i].value)) {
						chartDataDt1[i].value = 0;
					}
				}
				for(let i =0; i<chartDataDt2.length; i++ ) {
					if(isNaN(chartDataDt2[i].value)) {
						chartDataDt2[i].value = 0;
					}
				}
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
				if(tab41_1 == "총계") {c2 = "0"}
				else if(tab41_1 == "남자") {c2 = "1"}
				else if(tab41_1 == "여자") {c2 = "2"}
				if(classNm4 == "총계") {c1 = "00";}
				else if(classNm4 == "임금일자리") {c1 = "10";}
				else if(classNm4 == "비임금일자리") {c1 = "20";}
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 != "00" && res[i].C4 == "10") {chartVal1_1.push([res[i].C3_NM, Number(res[i].DT)]);}
					if(res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 != "00" && res[i].C4 == "30") {chartVal1_2.push([res[i].C3_NM, Number(res[i].DT)]);}
					if(res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 != "00" && res[i].C4 == "00") {stackData.push(Number(res[i].DT));}
				}
				for(let i =0; i<chartDataDt1.length; i++ ) {
					if(isNaN(chartDataDt1[i].value)) {
						chartDataDt1[i].value = 0;
					}
				}
				for(let i =0; i<chartDataDt2.length; i++ ) {
					if(isNaN(chartDataDt2[i].value)) {
						chartDataDt2[i].value = 0;
					}
				}
			}else if(tblId == "DT_1EP_3035") { //(장애인) 성별 연령대별 일자리
				if(classNm4 == "총계") {c1 = "0";}
				else if(classNm4 == "    남자") {c1 = "1";}
				else if(classNm4 == "    여자") {c1 = "2";}
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != '00' && res[i].C3 == "10") {
						chartVal1_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != '00' && res[i].C3 == "30") {
						chartVal1_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != '00' && res[i].C3 == "00") {
						stackData.push(Number(res[i].DT));
					}
					/*if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "10") {
						chartVal4_1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C3 == "30") {
						chartVal4_2.push([res[i].C2_NM, Number(res[i].DT)]);
					}*/
				}
				for(let i =0; i<chartDataDt1.length; i++ ) {
					if(isNaN(chartDataDt1[i].value)) {
						chartDataDt1[i].value = 0;
					}
				}
				for(let i =0; i<chartDataDt2.length; i++ ) {
					if(isNaN(chartDataDt2[i].value)) {
						chartDataDt2[i].value = 0;
					}
				}
			}
			/*let treemapColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
			    			   ,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];*/
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				for(var i = 0; i < chartDataNm4.length; i++) {
					if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020") {
						industryChartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i], chartDataDt3[i]);
					}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
						industryChartVal2_1.push(chartDataNm4[i], chartDataDt1[i], chartDataDt2[i]);
					}
				}
				
				seriesyearData4.push({ //트리맵 여기
					 type: 'treemap'
					,layoutAlgorithm: 'squarified'
					,allowTraversingTree: true
					,levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*align: 'left',
							verticalAlign: 'top',*/
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							},
							formatter: function () {
								let count = 0;
								let data = "";
								let num = 0;
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) { 
										num += this.series.data[count].value;
										count += 3;
										if(count > 62) break;
									}else if(this.series.data.length == 84) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}else if(this.series.data.length == 96) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 95) break;
									}
								}
								let cutTotalData = this.point.value;
								let totNum = num.toFixed(1);
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								if(classNm4 == '총계') {
									if(percentVal < 4) {this.key = ". . .";}
								}else {
									if(percentVal < 2) {this.key = ". . .";}
								}
								
								return this.key;
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}]
					,data: industryChartVal2_1
				});
			}/*else if(tblId == "DT_1EP_3020") {
				//4번차트 데이터 가공(산업대분류)
				for(var i = 0; i < chartDataNm4.length; i++) {
					seriesyearData4[chartDataNm4[i]] = {"지속":{"지속": chartDataDt1[i]}, "대체":{"대체": chartDataDt2[i]}, "신규":{"신규": chartDataDt3[i]}};
				}
			}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				for(var i = 0; i < chartDataNm4.length; i++) {
					seriesyearData4[chartDataNm4[i]] = {"지속":{"지속": chartDataDt1[i]}, "신규채용":{"신규채용": chartDataDt2[i]}};
				}
			}*/
			for(let i=0; i<chartVal1_1.length; i++ ) {
				if(isNaN(chartVal1_1[i][1])) {
					chartVal1_1[i][1] = 0;
				}
			}
			for(let i=0; i<chartVal1_2.length; i++ ) {
				if(isNaN(chartVal1_2[i][1])) {
					chartVal1_2[i][1] = 0;
				}
			}
			for(let i=0; i<chartVal1_3.length; i++ ) {
				if(isNaN(chartVal1_3[i][1])) {
					chartVal1_3[i][1] = 0;
				}
			}
			//지속일자리, 대체일자리, 신규일자리
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010") {
				seriesyearData1.push({
					name: '지속일자리',
					data: chartVal1_1,
					padding:10,
					//바 상단의 수치값
					dataLabels: {
						enabled: true,
						allowOverlap : true,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function () {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#7CB5EC',
				},{
					name: '대체일자리',
					data: chartVal1_2,
					dataLabels: {
						enabled: true,
						allowOverlap : true,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function () {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#F15C80'
				},{
					name: '신규일자리',
					data: chartVal1_3,
					dataLabels: {
						enabled: true,
						allowOverlap : true,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function () {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#F7A35C',
				});
			}
			//지속, 신규채용일자리
			else if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || 
					tblId == "DT_1EP_3019" || tblId == "DT_1EP_3021" ||	tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || 
					tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				seriesyearData1.push({
					name: '지속일자리',
					data: chartVal1_1,
					padding:10,
					//바 상단의 수치값
					dataLabels: {
						enabled: true,
						allowOverlap : true,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function () {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#7CB5EC',
				},{
					name: '신규채용일자리',
					data: chartVal1_2,
					dataLabels: {
						enabled: true,
						allowOverlap: false,
						//format: '{point.percentage:.1f} %',
						color:'#000',
						style: {
							fontSize:'12px',
							fontWeight:'600',
						},
						formatter: function () {
							if(this.y > 0) {
								return $more3DashDetail.util.comma(this.point.percentage) + '%';
							}else {
								return "";
							}
						}
					},
					color: '#F15C80'
				});
			}
			$more1DashDetail.chart.otherMakeChart4(tblId, seriesyearData1, xAxis4, classNm4, seriesyearData4, classNm1, stackData, industryCntTotVal);
		},
		/**
		 * @name : $more1DashDetail.chart.selectOtherData5
		 * @description : 5번차트의 셀렉트 선택 이벤트 
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		selectOtherData5 : function(res, value, xAxis55) {
			for(let i = 1; i < 14; i++) {
				$(".legend5"+i).empty();
			}
			let xAxis5_3 = new Array;
			let xAxisNm5_3 = new Array;
			let tblNm = res[0].TBL_NM;
			let tblId = res[0].TBL_ID;
			let result = new Array;
			let chartVal1 = new Array;
			let chartVal2 = new Array;
			let series = new Array;
			let chartColor = [];/*["#F15C80", "#F7A35C"];*/
			let c1;
			let c2;
			let classNm1 = value;
			let industryC1 = "";
			let legendNm55 = new Array;
			let legend51 = "";
			let legend52 = "";
			let tab5_1 = "";
			let classNm5 = "";
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
					   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				classNm5 = $("#selectChoice5_1 option:selected").text(); //버튼 text 가져오기(구분)
			}else {
				classNm5 = $("#selectChoice5 option:selected").text(); //버튼 text 가져오기(구분)
			}
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				tab5_1 = $(".titleChart5_1 .chartButton51_1 ul .active .tab51-1").text();
			}else {
				tab5_1 = $(".titleChart5 .chartButton5_1 ul .active .tab51-1").text();
			}
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" ||
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				if(classNm1 == "0" || classNm5 == "총계") c1 = "00";
				else if(classNm1 == "1" || classNm5 == "영리기업" || classNm5 == "임금일자리") c1 = "10";
				else if(classNm1 == "2" || classNm5 == "비영리기업" || classNm5 == "비임금일자리") c1 = "20";
				else if(classNm1 == "3") c1 = "30";
				else if(classNm1 == "4") c1 = "40";
				else if(classNm1 == "5") c1 = "50";
				else if(classNm1 == "6") c1 = "60";
				else if(classNm1 == "7") c1 = "70";
				else if(classNm1 == "8") c1 = "80";
				else if(classNm1 == "9") c1 = "90";
				else if(classNm1 == "10") c1 = "100";
				else if(classNm1 == "11") c1 = "110";
			}
			if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021") {
				c2 = "0";
			}else {
				c2 = "00"
			}
			if(tblId == "DT_1EP_3001") {
				if(classNm5 == "신규일자리") {
					legendNm55 = ["기업생성", "사업확장"];
					chartColor = ["#F15C80", "#F7A35C"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C2 == "31" && res[i].C1 != "00") {chartVal1.push(Number(res[i].DT));}
						if(res[i].C2 == "32" && res[i].C1 != "00") {chartVal2.push(Number(res[i].DT));}
					}
				}else if(classNm5 == "소멸일자리") {
					legendNm55 = ["기업소멸", "사업축소"];
					chartColor = ["#7CB5EC", "#90ED7D"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C2 == "41" && res[i].C1 != "00") {chartVal1.push(Number(res[i].DT));}
						if(res[i].C2 == "42" && res[i].C1 != "00") {chartVal2.push(Number(res[i].DT));}
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 3; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3002") {
				if(classNm5 == "신규일자리") {
					legendNm55 = ["기업생성", "사업확장"];
					chartColor = ["#F15C80", "#F7A35C"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C2 == "31"){
							if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
								chartVal1.push(Number(res[i].DT));
							}
						}
						if(res[i].C2 == "33"){
							if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
								chartVal2.push(Number(res[i].DT));
							}
						}
					}
				}else if(classNm5 == "소멸일자리") {
					legendNm55 = ["기업소멸", "사업축소"];
					chartColor = ["#7CB5EC", "#90ED7D"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C2 == "41"){
							if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
								chartVal1.push(Number(res[i].DT));
							}
						}
						if(res[i].C2 == "42"){
							if(res[i].C1 == "11" || res[i].C1 == "12" || res[i].C1 == "20") {
								chartVal2.push(Number(res[i].DT));
							}
						}
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 3; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3003") {
				
				if(tab5_1 == "신규") {
					legendNm55 = ["기업생성", "사업확장"];
					chartColor = ["#F15C80", "#F7A35C"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31") {chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "33") {chartVal2.push(Number(res[i].DT));}
					}
					
				}else if(tab5_1 == "소멸") {
					legendNm55 = ["기업소멸", "사업축소"];
					chartColor = ["#7CB5EC", "#90ED7D"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "41") {chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "42") {chartVal2.push(Number(res[i].DT));}
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					legend52 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					$(".legend51").append(legend51);
					$(".legend52").append(legend52);
					$(".legend53").append(legend52);
				}
			}else if(tblId == "DT_1EP_3005") {
				let c2Nm_1 = "";
				let c2Nm_2 = "";
				if(tab5_1 == "신규") {
					chartColor = ["#F15C80", "#F7A35C"];
					legendNm55 = ["기업생성", "사업확장"];
					c2Nm_1 = "31";
					c2Nm_2 = "33"
				}else if(tab5_1 == "소멸") {
					chartColor = ["#7CB5EC", "#90ED7D"];
					legendNm55 = ["기업소멸", "사업축소"];
					c2Nm_1 = "41";
					c2Nm_2 = "42"
				}
				if(classNm1 == "0") {
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400" || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800"
							|| res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500"
								|| res[i].C1 == "1600" || res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100"){
							if(res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
						}
						if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400" || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800"
							|| res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500"
								|| res[i].C1 == "1600" || res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100"){
							if(res[i].C2 == c2Nm_2) {
								chartVal2.push(Number(res[i].DT));
							}
						}
					}	
				}
				else if(classNm1 == "1") {
					industryC1 = "100";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
							chartVal1.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
					}
				}else if(classNm1 == "2") {
					for(let i = 1; i < 5; i++) {
						industryC1 = "20"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "3") {
					for(let i = 1; i < 25; i++) {
						if(i < 10) {industryC1 = "30"+i;}
						else {industryC1 = "3"+i;}
						for(let i = 0; i < res.length; i++) {
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
					$more1DashDetail.util.horizontalScroll(res);
				}else if(classNm1 == "4") {
					industryC1 = "400";
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
							chartVal1.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
					}
				}else if(classNm1 == "5") {
					for(let i = 1; i < 5; i++) {
						industryC1 = "50"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "6") {
					for(let i = 1; i < 3; i++) {
						industryC1 = "60"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "7") {
					for(let i = 1; i < 4; i++) {
						industryC1 = "70"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "8") { //운수 및 창고업
					for(let i = 1; i < 5; i++) {
						industryC1 = "80"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "9") { //숙박 및 음식점업
					for(let i = 1; i < 3; i++) {
						industryC1 = "90"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "10") { //정보통신업
					for(let i = 1; i < 7; i++) {
						industryC1 = "100"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "11") { //금융 빛 보험업
					for(let i = 1; i < 4; i++) {
						industryC1 = "110"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "12") { //부동산업
					industryC1 = "1200";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
							chartVal1.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
					}
				}else if(classNm1 == "13") { //전문, 과학 및 기술 서비스업
					for(let i = 1; i < 5; i++) {
						industryC1 = "130"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "14") { //사업시설관리, 사업 지원 및 임대 서비스업
					for(let i = 1; i < 4; i++) {
						industryC1 = "140"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "15") { //공공행정, 국방 및 사회보장 행정
					industryC1 = "1500";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
							chartVal1.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
					}
				}else if(classNm1 == "16") { //교욱 서비스업
					industryC1 = "1600";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
							chartVal1.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
					}
				}else if(classNm1 == "17") { //보건업 및 사회복지 서비스업
					for(let i = 1; i < 3; i++) {
						industryC1 = "170"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "18") { //예술, 스포츠 및 여가관련 서비스업
					for(let i = 1; i < 3; i++) {
						industryC1 = "180"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "19") { //협회 및 단체, 수리 및 기타 개인 서비스업
					for(let i = 1; i < 4; i++) {
						industryC1 = "190"+i;
						for(let i = 0; i < res.length; i++) {	
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
								chartVal1.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
							if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
						}
					}
				}else if(classNm1 == "20") { //가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동
					industryC1 = "2000";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
							chartVal1.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
					}
				}else if(classNm1 == "21") { //국제 및 외국기관
					industryC1 = "2100";
					for(let i = 0; i < res.length; i++) {	
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_1) {
							chartVal1.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(res[i].C1 == industryC1 && res[i].C2 == c2Nm_2) {chartVal2.push(Number(res[i].DT));}
					}
				}
				xAxis5_3.push({
					categories: xAxisNm5_3,
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
							letterSpacing: '0px',
						},
					},
					lineColor: '#cfcfcf',
					gridLineWidth: 0,
					tickWidth: 0,
					tickColor: '#cfcfcf',
					tickPosition: 'inside'
				});
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011") {
				if(classNm5 == "총계") {c1 = "00";}
				else if(classNm5 == "회사법인") {c1 = "10";}
				else if(classNm5 == "회사이외법인") {c1 = "20";}
				else if(classNm5 == "정부 · 비법인단체") {c1 = "30";}
				else if(classNm5 == "개인기업체") {c1 = "40";}
				
				if(tab5_1 == "신규") {
					legendNm55 = ["기업생성", "사업확장"];
					chartColor = ["#F15C80", "#F7A35C"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31"){chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "33"){chartVal2.push(Number(res[i].DT));}
					}
				}else if(tab5_1 == "소멸") {
					legendNm55 = ["기업소멸", "사업축소"];
					chartColor = ["#7CB5EC", "#90ED7D"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "41"){chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "42"){chartVal2.push(Number(res[i].DT));}
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 6; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015") {
				if(classNm5 == "총계") {c1 = "00";}
				else if(classNm5 == "회사법인") {c1 = "10";}
				else if(classNm5 == "회사이외법인") {c1 = "20";}
				else if(classNm5 == "정부 · 비법인단체") {c1 = "30";}
				else if(classNm5 == "개인기업체") {c1 = "40";}

				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "31"){chartVal1.push(Number(res[i].DT));}
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "32"){chartVal2.push(Number(res[i].DT));}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j=0; j<6; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3016") {
				if(classNm5 == "총계") {c1 = "00";}
				else if(classNm5 == "대기업") {c1 = "11";}
				else if(classNm5 == "중소기업") {c1 = "12";}
				else if(classNm5 == "비영리기업") {c1 = "20";}
				
				if(tab5_1 == "신규") {
					legendNm55 = ["기업생성", "사업확장"];
					chartColor = ["#F15C80", "#F7A35C"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31"){chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "33"){chartVal2.push(Number(res[i].DT));}
					}	
				}else if(tab5_1 == "소멸") {
					legendNm55 = ["기업소멸", "사업축소"];
					chartColor = ["#7CB5EC", "#90ED7D"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "41"){chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "42"){chartVal2.push(Number(res[i].DT));}
					}
				} 
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 6; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019") {
				if(classNm5 == "총계") {c1 = "00";}
				else if(classNm5 == "대기업") {c1 = "11";}
				else if(classNm5 == "중소기업") {c1 = "12";}
				else if(classNm5 == "비영리기업") {c1 = "20";}
				
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "31"){
						chartVal1.push(Number(res[i].DT));
					}
					if(res[i].C1 == c1 && res[i].C2 != c2 && res[i].C3 == "32"){
						chartVal2.push(Number(res[i].DT));
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 5; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3020") {
				if(tab5_1 == "신규") {
					legendNm55 = ["기업생성", "사업확장"];
					chartColor = ["#F15C80", "#F7A35C"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31"){chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "33"){chartVal2.push(Number(res[i].DT));}
					}	
				}else if(tab5_1 == "소멸") {
					legendNm55 = ["기업소멸", "사업축소"];
					chartColor = ["#7CB5EC", "#90ED7D"];
					for(let i = 0; i < res.length; i++) {
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "41"){chartVal1.push(Number(res[i].DT));}
						if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "42"){chartVal2.push(Number(res[i].DT));}
					}
				} 
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 6; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3021") {
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C3 == "31"){
						if(res[i].C2 == "1") {
							chartVal1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							chartVal1.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 == c1 && res[i].C3 == "32"){
						if(res[i].C2 == "1") {
							chartVal2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							chartVal2.push(Number(res[i].DT));
						}
					}
				}
			}else if(tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023") {
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal1.push(Number(res[i].DT));
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal2.push(Number(res[i].DT));
					}
				}
			}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027") {
				if(classNm5 == "총계") {c1 = "0";}
				else if(classNm5 == "남자") {c1 = "1";}
				else if(classNm5 == "여자") {c1 = "2";}
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal1.push(Number(res[i].DT));
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal2.push(Number(res[i].DT));
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 6; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal1.push(Number(res[i].DT));
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal2.push(Number(res[i].DT));
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 13; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3029") { //ddd
				//5번
				for(var i=0; i<res.length; i++) {
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업생성"){
						chartVal5_1.push(Number(res[i].DT));
					}
					if(res[i].C1_NM == "총 계" && res[i].C2_NM != "총 계" && res[i].C3_NM == "기업내신규대체"){
						chartVal5_2.push(Number(res[i].DT));
					}
				}
			}else if(tblId == "DT_1EP_3032") {
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31"){
						chartVal1.push(Number(res[i].DT));
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "32"){
						chartVal2.push(Number(res[i].DT));
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 4; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				
				if(tab5_1 == "총계") {c2 = "0"}
				else if(tab5_1 == "남자") {c2 = "1"}
				else if(tab5_1 == "여자") {c2 = "2"}
				
				if(classNm5 == "총계") {c1 = "00";}
				else if(classNm5 == "임금일자리") {c1 = "10";}
				else if(classNm5 == "비임금일자리") {c1 = "20";}
				for(var i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 != "00" && res[i].C4 == "31"){
						chartVal1.push(Number(res[i].DT));
					}
					if(res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 != "00" && res[i].C4 == "32"){
						chartVal2.push(Number(res[i].DT));
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j = 1; j < 4; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}else if(tblId == "DT_1EP_3035") {
				if(classNm5 == "총계") {c1 = "0";}
				else if(classNm5 == "    남자") {c1 = "1";}
				else if(classNm5 == "    여자") {c1 = "2";}
				legendNm55 = ["기업생성", "기업내신규대체"];
				chartColor = ["#F15C80", "#F7A35C"];
				for(let i = 0; i < res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "31") {
						chartVal1.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == c1 && res[i].C2 != "00" && res[i].C3 == "32") {
						chartVal2.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				for(var i=0; i<legendNm55.length; i++) {
					legend51 = "<span class='range'><span class='blet' style='background-color:"+chartColor[i]+"'></span> "+legendNm55[i]+"</span>";
					for(var j=0; j<4; j++) {
						$(".legend5"+j).append(legend51);
					}
				}
			}
			console.log(chartVal1);
			console.log(chartVal2);
			for(let i=0; i<chartVal1.length; i++ ) {
				if(isNaN(chartVal1[i])) {
					chartVal1[i] = -0.001;
				}
				if(isNaN(chartVal2[i])) {
					chartVal2[i] = -0.001;
				}
			}
			result = [chartVal1, chartVal2];
			console.log(result);
			for(var i=0; i<result.length; i++) {
				series.push({
					name: legendNm55[i],
					data: result[i],
					//바 상단의 수치값
					dataLabels: {
						enabled: true,
						//format: '{y} 만개',
						color:'#000',
						style: {
							fontSize:'14px',
							fontWeight:'600',
							fontFamily: $more3DashDetail.downloadFont,
						},
						formatter: function() {
							if(this.y == -0.001) {
								return "<span style='font-weight: bold;'>자료없음</span>";
							}else {
								return "<span style='font-weight: bold;'>" + $more3DashDetail.util.comma(this.y) + " 만개</span>";
							} 
						}
					},
					color: chartColor[i]
				});
			}
			$more1DashDetail.chart.otherMakeChart5(tblNm, tblId, series, xAxis55, classNm5, classNm1, xAxis5_3);
		},
		/**
		 * @name : $more1DashDetail.chart.selectOtherData6
		 * @description : 6번차트의 셀렉트 선택 이벤트 
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		selectOtherData6 : function(res, value, preData, xAxis6) {
			let prdDe = res[0].PRD_DE;
			let prePrdDe = (res[0].PRD_DE)-1;
			let tblNm = res[0].TBL_NM;
			let tblId = res[0].TBL_ID;
			let classNm1 = value;
			let classNm6 = $("#selectChoice6 option:selected").text(); //select text 가져오기(구분)
			let tab6_1 = $(".titleChart6 .chartButton6_1 ul .active .tab61-1").text();
			let newJobVal = new Array;
			let preJobVal = new Array;
			let seriesyearData = new Array;
			let chartVal = new Array;
			let c1;
			let c2;
			let xAxis5_3 = new Array;
			let xAxisNm5_3 = new Array;
			let industryC1 = "";
			if(tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" ||
			   tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				if(classNm1 == "0") c1 = "00";
				else if(classNm1 == "1") c1 = "10";
				else if(classNm1 == "2") c1 = "20";
				else if(classNm1 == "3") c1 = "30";
				else if(classNm1 == "4") c1 = "40";
				else if(classNm1 == "5") c1 = "50";
				else if(classNm1 == "6") c1 = "60";
				else if(classNm1 == "7") c1 = "70";
				else if(classNm1 == "8") c1 = "80";
				else if(classNm1 == "9") c1 = "90";
				else if(classNm1 == "10") c1 = "100";
				else if(classNm1 == "11") c1 = "110";
				else if(classNm1 == "12") c1 = "120";
			}
			if(tblId == "DT_1EP_3012" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3017") {
				c2 = "0";
			}else {
				c2 = "00"
			}
			if(tblId == "DT_1EP_3003") {
				for(var i = 0; i < res.length; i++) {
					if(classNm6 == "총계") {
						if(res[i].PRD_DE == prdDe && res[i].C1 == "00" && res[i].C2 != "00" && res[i].C3 == "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}else if(classNm6 == "영리기업") {
						if(res[i].PRD_DE == prdDe && res[i].C1 == "10" && res[i].C2 != "00" && res[i].C3 == "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}else if(classNm6 == "비영리기업") {
						if(res[i].PRD_DE == prdDe && res[i].C1 == "20" && res[i].C2 != "00" && res[i].C3 == "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				for(var i=0; i<preData.length; i++) {
					if(classNm6 == "총계") {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "00" && preData[i].C2 != "00" && preData[i].C3 == "00") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}else if(classNm6 == "영리기업") {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "10" && preData[i].C2 != "00" && preData[i].C3 == "00") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}else if(classNm6 == "비영리기업") {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == "20" && preData[i].C2 != "00" && preData[i].C3 == "00") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
			}else if(tblId == "DT_1EP_3005") { //여기산업
				if(classNm1 == "0") {
					for(var i=0; i<res.length; i++) {
						if(res[i].C1 == "100" || res[i].C1 == "200" || res[i].C1 == "300" || res[i].C1 == "400" || res[i].C1 == "500" || res[i].C1 == "600" || res[i].C1 == "700" || res[i].C1 == "800"
							|| res[i].C1 == "900" || res[i].C1 == "1000" || res[i].C1 == "1100" || res[i].C1 == "1200" || res[i].C1 == "1300" || res[i].C1 == "1400" || res[i].C1 == "1500"
								|| res[i].C1 == "1600" || res[i].C1 == "1700" || res[i].C1 == "1800" || res[i].C1 == "1900" || res[i].C1 == "2000" || res[i].C1 == "2100") {
							if(res[i].C2 == "00" && res[i].PRD_DE == prdDe) {
								newJobVal.push(Number(res[i].DT));
								xAxisNm5_3.push(res[i].C1_NM);
							}
						}
						//6번차트 작년 데이터
						if(preData[i].C1 == "100" || preData[i].C1 == "200" || preData[i].C1 == "300" || preData[i].C1 == "400" || preData[i].C1 == "500" || preData[i].C1 == "600" || preData[i].C1 == "700" || preData[i].C1 == "800"
							|| preData[i].C1 == "900" || preData[i].C1 == "1000" || preData[i].C1 == "1100" || preData[i].C1 == "1200" || preData[i].C1 == "1300" || preData[i].C1 == "1400" || preData[i].C1 == "1500"
								|| preData[i].C1 == "1600" || preData[i].C1 == "1700" || preData[i].C1 == "1800" || preData[i].C1 == "1900" || preData[i].C1 == "2000" || preData[i].C1 == "2100") {
							if(preData[i].C2 == "00" && preData[i].PRD_DE == prePrdDe) {
								preJobVal.push(Number(preData[i].DT));
							}
						}
					}
				}else if(classNm1 == "1") { //농업, 임업 및 어업
					industryC1 = "100";
					for(var i=0; i<res.length; i++) {
						if(res[i].C1 == industryC1 && res[i].C2 == "00") {
							newJobVal.push(Number(res[i].DT));
							xAxisNm5_3.push(res[i].C1_NM);
						}
						if(preData[i].C1 == industryC1 && preData[i].C2 == "00") {preJobVal.push(Number(preData[i].DT));}
					}
				}else if(classNm1 == "2") { //광업
					for(var i=1; i<5; i++) {
						industryC1 = "20"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "3") { //제조업
					for(var i=1; i<25; i++) {
						if(i < 9) {industryC1 = "30"+i;}
						else {industryC1 = "3"+i;}
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "4") { //전기, 가스, 증기, 및 공기 조절 공급업
					industryC1 = "400";
					for(var j=0; j<res.length; j++) {
						if(res[j].C1 == industryC1 && res[j].C2 == "00") {
							newJobVal.push(Number(res[j].DT));
							xAxisNm5_3.push(res[j].C1_NM);
						}
						if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
					}
				}else if(classNm1 == "5") { //수도, 하수 및 폐기물 처리, 원료 재생업
					for(var i=1; i<5; i++) {
						industryC1 = "50"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "6") { //건설업
					for(var i=1; i<3; i++) {
						industryC1 = "60"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "7") { //도매 및 소매업
					for(var i=1; i<4; i++) {
						industryC1 = "70"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "8") { //운수 및 창고업
					for(var i=1; i<5; i++) {
						industryC1 = "80"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "9") { //숙박 및 음식점
					for(var i=1; i<3; i++) {
						industryC1 = "90"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "10") { //정보통신업
					for(var i=1; i<7; i++) {
						industryC1 = "100"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "11") { //금융 및 보험업
					for(var i=1; i<4; i++) {
						industryC1 = "110"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "12") { //부동산업
					industryC1 = "1200";
					for(var j=0; j<res.length; j++) {
						if(res[j].C1 == industryC1 && res[j].C2 == "00") {
							newJobVal.push(Number(res[j].DT));
							xAxisNm5_3.push(res[j].C1_NM);
						}
						if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
					}
				}else if(classNm1 == "13") { //전문, 과학 및 기술 서비스업
					for(var i=1; i<5; i++) {
						industryC1 = "130"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "14") { //사업시설 관리, 사업 지원 및 임대 서비스업
					for(var i=1; i<4; i++) {
						industryC1 = "140"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "15") { //공공행정 국방 및 사회보장 행정
					industryC1 = "1500";
					for(var j=0; j<res.length; j++) {
						if(res[j].C1 == industryC1 && res[j].C2 == "00") {
							newJobVal.push(Number(res[j].DT));
							xAxisNm5_3.push(res[j].C1_NM);
						}
						if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
					}
				}else if(classNm1 == "16") { //교육 서비스업
					industryC1 = "1600";
					for(var j=0; j<res.length; j++) {
						if(res[j].C1 == industryC1 && res[j].C2 == "00") {
							newJobVal.push(Number(res[j].DT));
							xAxisNm5_3.push(res[j].C1_NM);
						}
						if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
					}
				}else if(classNm1 == "17") { //보건업 및 사회복지 서비스업
					for(var i=1; i<3; i++) {
						industryC1 = "170"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "18") { //예술, 스포츠 및 여가관련 서비스업
					for(var i=1; i<3; i++) {
						industryC1 = "180"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "19") { //협회 및 단체, 수리 및 기타 개인 서비스업
					for(var i=1; i<4; i++) {
						industryC1 = "190"+i;
						for(var j=0; j<res.length; j++) {
							if(res[j].C1 == industryC1 && res[j].C2 == "00") {
								newJobVal.push(Number(res[j].DT));
								xAxisNm5_3.push(res[j].C1_NM);
							}
							if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
						}
					}
				}else if(classNm1 == "20") { //가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동
					industryC1 = "2000";
					for(var j=0; j<res.length; j++) {
						if(res[j].C1 == industryC1 && res[j].C2 == "00") {
							newJobVal.push(Number(res[j].DT));
							xAxisNm5_3.push(res[j].C1_NM);
						}
						if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
					}
				}else if(classNm1 == "21") { //국제 및 외국기관
					industryC1 = "2100";
					for(var j=0; j<res.length; j++) {
						if(res[j].C1 == industryC1 && res[j].C2 == "00") {
							newJobVal.push(Number(res[j].DT));
							xAxisNm5_3.push(res[j].C1_NM);
						}
						if(preData[j].C1 == industryC1 && preData[j].C2 == "00") {preJobVal.push(Number(preData[j].DT));}
					}
				}
				xAxis5_3.push({
					categories: xAxisNm5_3,
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold'
						},
					}
				});
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015") {
				if(classNm6 == "총계") {c1 = "00";}
				else if(classNm6 == "회사법인") {c1 = "10";}
				else if(classNm6 == "회사이외법인") {c1 = "20";}
				else if(classNm6 == "정부 · 비법인단체") {c1 = "30";}
				else if(classNm6 == "개인기업체") {c1 = "40";}
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				for(var i=0; i<preData.length; i++) {
					if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == c1 && preData[i].C3 == "00") {
						if(preData[i].C2 != c2) {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
			}else if(tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019") {
				if(classNm6 == "총계") {c1 = "00";}
				else if(classNm6 == "대기업") {c1 = "11";}
				else if(classNm6 == "중소기업") {c1 = "12";}
				else if(classNm6 == "비영리기업") {c1 = "20";}

				for(var i = 0; i < res.length; i++) {
					//6번차트 현재데이터
					if(res[i].PRD_DE == prdDe && res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
					//6번차트 작년데이터
				for(var i=0; i<preData.length; i++) {
					if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == c1 && preData[i].C3 == "00") {
						if(preData[i].C2 != c2) {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
			}else if(tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023") {
				for(var i = 0; i < res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != c2) {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
					if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == c1 && preData[i].C3 == "00") {
						if(preData[i].C2 != c2) {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
			}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027") {
				if(classNm6 == "총계") {c1 = "0";}
				else if(classNm6 == "남자") {c1 = "1";}
				else if(classNm6 == "여자") {c1 = "2";}
				//6번 올해데이터
				for(var i = 0; i < res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				//6번 작년데이터
				for(var i=0; i<preData.length; i++) {
					if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == c1 && preData[i].C3 == "00") {
						if(preData[i].C2 != "00") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
			}else if(tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				for(var i=0; i<preData.length; i++) {
					if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == c1 && preData[i].C3 == "00") {
						if(preData[i].C2 != "00") {
							preJobVal.push(Number(preData[i].DT));	
						}
					}
				}
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
				if(tab6_1 == "총계") {c2 = "0"}
				else if(tab6_1 == "남자") {c2 = "1"}
				else if(tab6_1 == "여자") {c2 = "2"}
				if(classNm6 == "총계") {c1 = "00";}
				else if(classNm6 == "임금일자리") {c1 = "10";}
				else if(classNm6 == "비임금일자리") {c1 = "20";}
				for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == c1 && res[i].C2 == c2 && res[i].C3 != "00" && res[i].C4 == "00") {
						newJobVal.push(Number(res[i].DT)); 
					}
				}
				for(var i=0; i<preData.length; i++) {
					if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == c1 && preData[i].C2 == c2 && preData[i].C3 != "00" && preData[i].C4 == "00") {
						preJobVal.push(Number(preData[i].DT));	
					}
				}
			}else if(tblId == "DT_1EP_3035") {
				if(classNm6 == "총계") {c1 = "0";}
				else if(classNm6 == "    남자") {c1 = "1";}
				else if(classNm6 == "    여자") {c1 = "2";}
				//6번 올해데이터
				for(var i = 0; i < res.length; i++) {
					if(res[i].PRD_DE == prdDe && res[i].C1 == c1 && res[i].C3 == "00") {
						if(res[i].C2 != "00") {
							newJobVal.push(Number(res[i].DT)); 
						}
					}
				}
				//6번 작년데이터
				if(preData != undefined) {
					for(var i=0; i<preData.length; i++) {
						if(preData[i].PRD_DE == prePrdDe && preData[i].C1 == c1 && preData[i].C3 == "00") {
							if(preData[i].C2 != "00") {
								preJobVal.push(Number(preData[i].DT));	
							}
						}
					}
				}
			}
			for(let i=0; i<newJobVal.length; i++ ) {
				if(isNaN(newJobVal[i])) {
					newJobVal[i] = 0;
				}
			}
			for(let i=0; i<preJobVal.length; i++ ) {
				if(isNaN(preJobVal[i])) {
					preJobVal[i] = 0;
				}
			}
			for(var i=0; i<newJobVal.length; i++) {
				chartVal.push(Math.round((newJobVal[i] - preJobVal[i])*10)/10);
			}
			seriesyearData.push({
				name: '증감',
				data: chartVal,
				color: '#F15C80',
				negativeColor: '#7CB5EC',
				//해당년도 위 데이터 표시
				dataLabels: {
					enabled: true,
					useHTML: true,
					//format: '{y} 만개',
					formatter: function() {
						if(this.y > 0){
							return $more3DashDetail.util.comma(this.y) + '만개 증가 <span style="color:red">↑</span>';
						}else if(this.y < 0){
							return $more3DashDetail.util.comma(Math.abs(this.y)) + '만개 감소 <span style="color:blue">↓</span>';
						}else if(this.y == 0) {
							return '변동없음';
						}
					},
					color:'#000',
					style: {
						fontSize:'14px',
						fontWeight:'600',
					},
				},
			});
			$more1DashDetail.chart.otherMakeChart6(tblNm, tblId, seriesyearData, xAxis6, classNm6, classNm1, newJobVal, xAxis5_3); 
		},
		/**
		 * @name : $more1DashDetail.chart.otherMakeChart1
		 * @description : 1번차트의 버튼 이벤트 차트 생성
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		otherMakeChart1 : function(series, tblNm, classNm1, tblId, prdDe) {
			let categories = [];
			let count;
			let charts1 = "";
			let legend = new Array;
			$('#downPicture1').off('click');
			$('#downPicture1_1').off('click');
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3003" || tblId == "DT_1EP_3005" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || 
					tblNm == "근속기간별 일자리" || tblNm == "종사상지위별 일자리") {
				count = 1;
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
					 tblId == "DT_1EP_3016" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" ||
					 tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3035") {
				if(classNm1 == "조직형태별" || classNm1 == "기업규모별" || classNm1 == "성별") {
					count = 1;
				}else if(classNm1 == "종사자규모별" || classNm1 == "산업대분류별" || classNm1 == "연령대별" || classNm1 == "근속기간별" || classNm1 == "종사상지위별" || classNm1 == "연령별") {
					count = 2;
				}
			}else if (tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032") {
				if(classNm1 == "종사상지위별") {
					count = 1;
				}else if(classNm1 == "산업대분류별" || classNm1 == "근속기간별") {
					count = 2;
				}
			}else if(tblId == "DT_1EP_3017" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3021") {
				if(classNm1 == "조직형태별" || classNm1 == "기업규모별" || classNm1 == "종사자규모별") {
					count = 1;
				}else if(classNm1 == "성별") {
					count = 2;
				}
			}else if(tblId == "DT_1EP_3020" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023") {
				if(classNm1 == "종사자규모별") {
					count = 1;
				}else if(classNm1 == "산업대분류별" || classNm1 == "연령대별" || classNm1 == "근속기간별") {
					count = 2;
				}
			}else if(tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030") {
				if(classNm1 == "연령대별" || classNm1 == "근속기간별") {
					count = 1;
				}else if(classNm1 == "산업대분류별" || classNm1 == "종사상지위별") {
					count = 2;
				}
			}else if(tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034") {
				if(classNm1 == "종사상지위별") {
					count = 1;
				}else if(classNm1 == "성별") {
					count = 2;
				}else if(classNm1 == "연령별" || classNm1 == "근속기간별") {
					count = 3;
				}
			}
			if(tblId == "DT_1EP_3005") {
				//legend.push({enabled: true, width: 100, verticalAlign: 'middle', align: 'right', itemStyle: { textOverflow: "ellipsis" }});
				legend.push(
					{width: 100,
					verticalAlign: 'middle',
					align: 'right',
					itemMarginTop: 7,
					itemStyle: {
						textOverflow: "ellipsis"
					}});
			}else{
				legend.push({enabled: true});
			}
			categories = prdDe;
			let chartId1 = "";
			
			let legendItemMarginTop = "";
			let legendItemMarginBottom = "";
			let legendX = "";
			
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" ||
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				chartId1 = 'chart1_'+count; //여기
			}else {
				chartId1 = 'chart1'+count;
			}
				if(classNm1 == '조직형태별' || classNm1 == '산업분류별' || classNm1 == '산업대분류별') {
					legendItemMarginTop = 4;
					legendItemMarginBottom = 4;
					legendX = 25;		
				}else if(classNm1 == '기업규모별') {
					legendItemMarginTop = 4;
					legendItemMarginBottom = 4;
					legendX = 50;
				}else if(classNm1 == '종사자규모별') {
					legendItemMarginTop = 3;
					legendItemMarginBottom = 3;
					legendX = 45;
				}else if(classNm1 == '성별') {
					legendItemMarginTop = 4;
					legendItemMarginBottom = 4;
					legendX = 70;
				}else if(classNm1 == '연령대별' || classNm1 == '연령별') {
					legendItemMarginTop = 2;
					legendItemMarginBottom = 2;
					legendX = 55;
				}else if(classNm1 == '근속기간별') {
					legendItemMarginTop = 4;
					legendItemMarginBottom = 4;
					legendX = 40;
				}else if(classNm1 == '종사상지위별') {
					legendItemMarginTop = 4;
					legendItemMarginBottom = 4;
					legendX = 45;
				}
			
			
			charts1 = "charts1"+count;
			charts1 = Highcharts.chart(chartId1, {
				chart : {
					type : 'line',
					marginTop: 30
				},
				credits: {
					enabled: false
				},
				exporting: {
					enabled: false,
					chartOptions: {
						series: {
							dataLabels: {
								style: {
									color: $more3DashDetail.organiFormColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
						legend: {
							x:-10,
							itemStyle: {
								fontSize :'10px',
								fontFamily: $more3DashDetail.downloadFont,
							},
						},
						xAxis: {
							labels: {
								style: {
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
					}
				},
				title: {
					text: '',
				},
				subtitle: {
					text: '',
				},
				yAxis: {
					title: {
					  text: '',
					},
					labels: {
						enabled : false,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
							letterSpacing: '0px',
						}
					},
				},
				xAxis: {
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
							letterSpacing: '0px',
						}
					},
					categories: categories
				},
				legend: {
					useHTML: true,
					width: 120,
					verticalAlign: 'middle',
					align: 'right',
					marginLeft: 10,
					x:legendX,
					itemMarginTop: legendItemMarginTop,
					itemMarginBottom: legendItemMarginBottom,
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333',
						textAlign:'left',
						fontWeight: '600',
						//fontFamily: 'Noto Sans KR',	
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
				},
				plotOptions: {
					series: {
						marker: {
							enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
							lineWidth: 2, //라인 굵기
							lineColor:'#F15C80', //라인 색
							fillColor:'#ffffff'
						},
						dataLabels: {
							enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
							allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
						},
						events: {
							mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
								$.each(this.data, function(i, point){
									point.dataLabel.show();
								});
							},
							mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
								$.each(this.data, function(i, point){
									point.dataLabel.hide();
								});
							}
						}
					}
				},
				tooltip: {
					useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
					borderRadius: 10, //툴팁 모서리 반지름
					backgroundColor :'#000000', //툴팁 배경 색
					borderWidth:0,
					shadow: false,
					padding:12,
					style: {
						fontSize :'14px',
						color: '#fff',
						textAlign:'center',
						fontWeight: '600',
						lineHeight:1.2,
					},
					formatter: function () {//커스텀 tooltip html
						var returnFormatter;
						var tooltip1 = [];
						var tooltip2 = [];
						var tooltip3 = [];
						var tooltip4 = [];
						if(tblId == "DT_1EP_3035") {
							if(prdDe.length == 4) {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y)/ this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y)/ this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y)/ this.series.data[2].y) * 100).toFixed(2));
							}else if(prdDe.length == 5) {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y)/ this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y)/ this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y)/ this.series.data[2].y) * 100).toFixed(2));
								tooltip4.push((((this.series.data[4].y - this.series.data[3].y)/ this.series.data[3].y) * 100).toFixed(2));
							} 
							if(this.x == prdDe[0]) {
								returnFormatter = '전년도 자료 없음';
							}
							if(this.x == prdDe[1]) {
								if(tooltip1 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip1+'% 증가 ↑</span>';
								}else if(tooltip1 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip1+'% 감소 ↓</span>';
								}else if(tooltip1 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								}
							}
							if(this.x == prdDe[2]) {
								if(tooltip2 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip2+'% 증가 ↑</span>';
								}else if(tooltip2 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip2+'% 감소 ↓</span>';
								}else if(tooltip2 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								}
							}
							if(this.x == prdDe[3]) {
								if(tooltip3 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip3+'% 증가 ↑</span>';
								}else if(tooltip3 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip3+'% 감소 ↓</span>';
								}else if(tooltip3 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								} 
							}
							if(this.x == prdDe[4]) {
								if(tooltip4 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip4+'% 증가 ↑</span>';
								}else if(tooltip4 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip4+'% 감소 ↓</span>';
								}else if(tooltip4 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								}
							}
						}else {
							tooltip1.push((((this.series.data[1].y - this.series.data[0].y)/ this.series.data[0].y) * 100).toFixed(2));
							tooltip2.push((((this.series.data[2].y - this.series.data[1].y)/ this.series.data[1].y) * 100).toFixed(2));
							tooltip3.push((((this.series.data[3].y - this.series.data[2].y)/ this.series.data[2].y) * 100).toFixed(2));
							tooltip4.push((((this.series.data[4].y - this.series.data[3].y)/ this.series.data[3].y) * 100).toFixed(2));
							
							if(this.x == prdDe[0]) {
								returnFormatter = this.series.name+'</br>전년도 자료 없음';
							}
							if(this.x == prdDe[1]) {
								if(tooltip1 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip1+'% 증가 ↑</span>';
								}else if(tooltip1 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip1+'% 감소 ↓</span>';
								}else if(tooltip1 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								}
							}
							if(this.x == prdDe[2]) {
								if(tooltip2 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip2+'% 증가 ↑</span>';
								}else if(tooltip2 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip2+'% 감소 ↓</span>';
								}else if(tooltip2 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								}
							}
							if(this.x == prdDe[3]) {
								if(tooltip3 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip3+'% 증가 ↑</span>';
								}else if(tooltip3 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip3+'% 감소 ↓</span>';
								}else if(tooltip3 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								} 
							}
							if(this.x == prdDe[4]) {
								if(tooltip4 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip4+'% 증가 ↑</span>';
								}else if(tooltip4 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip4+'% 감소 ↓</span>';
								}else if(tooltip4 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">자료없음</span>';
								}
							}
						}
						return returnFormatter;
					},
				},
				series: series
			},function(chart) {
				$.each(chart.series, function(i, series) {
					$.each(series.data, function(i, point){
						point.dataLabel.hide();
					});
				});
				$('.highcharts-legend-item').hover(function(e) {
					chart.series[$(this).index()].onMouseOver();
				},function() {
					chart.series[$(this).index()].onMouseOut();
				});
			});
			$administStatsMain.ui.loading(false);
			//downPicture();
			//다운로드 버튼
			$('#downPicture1').on("click", function(){
				for(var i = 0; i < $('.tabArea .tabBox').length; i++){
					if($('.tabArea .tabBox.on .chartbox div').attr('id') == 'chart1'){charts1.exportChart();}
					else if($('.tabArea .tabBox.on .chartbox div').attr('id') == 'chart11'){charts1.exportChart();}
					else if($('.tabArea .tabBox.on .chartbox div').attr('id') == 'chart12'){charts1.exportChart();}
					else {return;}
				}
			});
			$('#downPicture1_1').on("click", function(){
				for(var i = 0; i < $('.tabArea1_1 .tabBox').length; i++){
					if($('.tabArea1_1 .tabBox.on .chartbox div').attr('id') == 'chart1_0'){charts1.exportChart();}
					else if($('.tabArea1_1 .tabBox.on .chartbox div').attr('id') == 'chart1_1'){charts1.exportChart();}
					else if($('.tabArea1_1 .tabBox.on .chartbox div').attr('id') == 'chart1_2'){charts1.exportChart();}
					else {return;}
				}				
			});
		},
		/**
		 * @name : $more1DashDetail.chart.otherMakeChart3
		 * @description : 3번차트의 버튼 이벤트 차트 생성
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		otherMakeChart3 : function(tblNm, tblId, series, classNm3, totJob, classNm1, pieColor) {
			let count;  
			$('#downPicture3').off('click');
			if(tblId == "DT_1EP_3003") {
				if(classNm3 == "영리기업") {count = 2;}
				else if(classNm3 == "비영리기업"){count = 3;}
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
					 tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" ||
					 tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || 
					 tblId == "DT_1EP_3035") {
				if(classNm3 == "총계") {count = 1;}
				else if(classNm3 == "회사법인" || classNm3 == "대기업" || classNm3 == "남자" || classNm3 == "    남자" || classNm3 == "임금일자리" || classNm3 == "1~4명") {count = 2;}
				else if(classNm3 == "회사이외법인" || classNm3 == "중소기업" || classNm3 == "여자" || classNm3 == "    여자" || classNm3 == "비임금일자리" || classNm3 == "5~9명"){count = 3;}
				else if(classNm3 == "정부 · 비법인단체" || classNm3 == "비영리기업" || classNm3 == "10~29명"){count = 4;}
				else if(classNm3 == "개인기업체" || classNm3 == "30~49명") {count = 5;}
				
			}else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || 
					 tblId == "DT_1EP_3030") {
				if(classNm1 == "0") {count = 1;}
				else if(classNm1 == "1") {count = 2;}
				else if(classNm1 == "2") {count = 3;}
				else if(classNm1 == "3") {count = 4;}
				else if(classNm1 == "4") {count = 5;}
				else if(classNm1 == "5") {count = 6;}
				else if(classNm1 == "6") {count = 7;}
				else if(classNm1 == "7") {count = 8;}
				else if(classNm1 == "8") {count = 9;}
				else if(classNm1 == "9") {count = 10;}
				else if(classNm1 == "10") {count = 11;}
				else if(classNm1 == "11") {count = 12;}
				else if(classNm1 == "12") {count = 13;}
				else if(classNm1 == "13") {count = 14;}
				else if(classNm1 == "14") {count = 15;}
				else if(classNm1 == "15") {count = 16;}
				else if(classNm1 == "16") {count = 17;}
				else if(classNm1 == "17") {count = 18;}
				else if(classNm1 == "18") {count = 19;}
				else if(classNm1 == "19") {count = 20;}
				else if(classNm1 == "20") {count = 21;}
				else if(classNm1 == "21") {count = 22;}
				
			}
			let legendWidth = 0;
			let legendItemMarginTop = 0;
			let legendItemMarginBottom = 0;
			let legendX = 0;
			let legendY = 0;
			let pieSize = 0;
			let subtitleX = 0;
			let marginLeft = 0;
			
			let exporSubX = 0;
			let exporlegendX = 0;
			
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3010") {  //종사자규모별
				legendWidth = 200;
				legendItemMarginTop = 3;
				legendItemMarginBottom = 3;
				legendX = 40;
				legendY = -10;
				pieSize = '67%';
				subtitleX = -95;
				marginLeft = 0;
			}else if(tblId == "DT_1EP_3013" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3035") {  //연령대별
				legendWidth = 200;
				legendItemMarginTop = 2;
				legendItemMarginBottom = 2;
				legendX = 45;
				legendY = -4;
				pieSize = '68%';
				subtitleX = -87;
				marginLeft = 10;
			}else if(tblId == "DT_1EP_3014" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3034") {  //근속기간별
				legendWidth = 200;
				legendItemMarginTop = 4;
				legendItemMarginBottom = 4;
				legendX = 30;
				legendY = -14;
				pieSize = '71%';
				subtitleX = -100;
				marginLeft = 0;
			}else if(tblId == "DT_1EP_3033") {  //연령대별
				legendWidth = 200;
				legendItemMarginTop = 2;
				legendItemMarginBottom = 2;
				legendX = 45;
				legendY = -15;
				pieSize = '68%';
				subtitleX = -87;
				marginLeft = 10;
			}else {   //성별
				legendWidth = 120;
				legendItemMarginTop = 4;
				legendItemMarginBottom = 4;
				legendX = 30;
				legendY = -8;
				pieSize = '60%';
				subtitleX = -60;
				marginLeft = 0;

			}
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3009" || 
			   tblId == "DT_1EP_3012" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" ) {
				exporSubX = -105;
				exporlegendX = -60;
			}else if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || 
					 tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || 
					 tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				exporSubX = -145;
				exporlegendX = -60;
			}
			
			var charts3 = 'chart3' + count;
			charts3 = Highcharts.chart("chart3" +count, {
				chart : {
					renderTo: 'dounutChart',
					type: 'pie',
					marginTop: -15,
					marginLeft: marginLeft,
					style: {			 
						//fontFamily: 'Noto Sans KR', 
					}
				},
				credits: {enabled: false}, //highchart 워터마크 숨김처리
				exporting: {
					enabled: false,
					sourceWidth: 600,
					chartOptions: {
						subtitle: {
							text: '전체 일자리<br><span class="customSt2" style="font-size: 16px">'+ totJob + '만개</span>',
							x: exporSubX,
							style: {
								fontSize: '12px',
								fontFamily: $more3DashDetail.downloadFont,
							},	
						},
						series: {
							dataLabels: {
								style: {
									color: $more3DashDetail.conSubNewColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
						legend: {
							x: exporlegendX,
							itemStyle: {
								fontFamily: $more3DashDetail.downloadFont,
							},
						},
					}
				},
				title: {
					text: '',
				},
				subtitle: {
					text: '전체 일자리<br><span class="customSt2" style="font-size: 20px">'+ totJob + '만개</span>',
					align: 'center',
					verticalAlign: 'middle',
					x:subtitleX,
					y:0,
					style: {
						color: '#000',
						fontSize: '14px',
						fontWeight:'bold',
						lineHeight: 24,
					}
				},
				legend: {
					enabled : true,
					width: legendWidth,
					verticalAlign: 'middle',
					align: 'right',
					itemMarginTop: legendItemMarginTop,
					itemMarginBottom: legendItemMarginBottom,
					x:legendX,
					y:legendY,
					itemStyle: {
						textOverflow: "width"
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
					labelFormatter: function() {
						if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || 
						   tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || 
						   tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
							let comma = (this.y.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'만개)';
							}
						}else {
							return this.name
						}
					}
				},
				plotOptions: {
					pie: {//도넛(파이)차트 전체 옵션 지정.
						size: pieSize, 
						colors: pieColor,
						showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
						dataLabels : {
							enabled : true,
							distance: '0%', 
							x: 0,
							y: 0,
						},
						point: {
							events: {
								legendItemClick: function () {
									return false;
								},
							}
						},
					}
				},
				tooltip: {
					useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
					borderRadius: 10,
					backgroundColor :'#000000', 
					borderWidth:0,
					shadow: false,
					padding:12,
					style: {			 
						fontSize :'14px',  
						color: '#fff',
						fontWeight: '600',
						textAlign:'center',
						lineHeight:18,
					},
					shared: true,
					/*formatter: function() {
						return '<span style="color:#EEFF2E">' + this.point.name + '</span>' + '</br>' + this.y + ' 만개';
					},*/
					formatter: function() {
						let thisY = this.y;
						let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return  this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
					},
				},
				series: series
			});
			//다운로드 버튼
			$('#downPicture3').click(function(){
				for(var i = 0; i < $('.tabArea3 .tab_content').length; i++){
					if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart32'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart33'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart34'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart35'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart36'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart37'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart38'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart39'){charts3.exportChart();}
					else if($('.tabArea3 .tab_content.on .chartbox div').attr('id') == 'chart310'){charts3.exportChart();}
					else {return;}
				}
			});
		},
		/**
		 * @name : $more1DashDetail.chart.otherMakeChart4
		 * @description : 4번차트의 버튼 이벤트 차트 생성
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		otherMakeChart4 : function(tblId, seriesyearData1, xAxis4, classNm4, seriesyearData4, classNm1, stackData, industryCntTotVal) {
			let count;
			if(tblId == "DT_1EP_3003") {
				if(classNm4 == "영리기업") {count = 2;}
				else if(classNm4 == "비영리기업") {count = 3;}
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
					 tblId == "DT_1EP_3016" || tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || 
					 tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || 
					 tblId == "DT_1EP_3035") {
				if(classNm4 == "총계") {count = 1;}
				else if(classNm4 == "회사법인" || classNm4 == "대기업" || classNm4 == "남자" || classNm4 == "    남자" || classNm4 == "임금일자리") {count = 2;}
				else if(classNm4 == "회사이외법인" || classNm4 == "중소기업" || classNm4 == "여자" || classNm4 == "    여자" || classNm4 == "비임금일자리") {count = 3;}
				else if(classNm4 == "정부 · 비법인단체" || classNm4 == "비영리기업") {count = 4;}
				else if(classNm4 == "개인기업체" || classNm4 == "비영리기업") {count = 5;}
			}else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || 
					 tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030") {
				if(classNm1 == "0") {count = 1;}
				else if(classNm1 == "1") {count = 2;}
				else if(classNm1 == "2") {count = 3;}
				else if(classNm1 == "3") {count = 4;}
				else if(classNm1 == "4") {count = 5;}
				else if(classNm1 == "5") {count = 6;}
				else if(classNm1 == "6") {count = 7;}
				else if(classNm1 == "7") {count = 8;}
				else if(classNm1 == "8") {count = 9;}
				else if(classNm1 == "9") {count = 10;}
				else if(classNm1 == "10") {count = 11;}
				else if(classNm1 == "11") {count = 12;}
				else if(classNm1 == "12") {count = 13;}
				else if(classNm1 == "13") {count = 14;}
				else if(classNm1 == "14") {count = 15;}
				else if(classNm1 == "15") {count = 16;}
				else if(classNm1 == "16") {count = 17;}
				else if(classNm1 == "17") {count = 18;}
				else if(classNm1 == "18") {count = 19;}
				else if(classNm1 == "19") {count = 20;}
				else if(classNm1 == "20") {count = 21;}
				else if(classNm1 == "21") {count = 22;}
			}
			for(let i=0; i<stackData.length; i++ ) {
				if(isNaN(stackData[i])) {
					stackData[i] = 0;
				}
			}
			console.log(stackData);
			var charts4 = "charts4"+count;
			if(tblId == "DT_1EP_3003" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3017" || 
			   tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || 
			   tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				//누적가로막대
				charts4 = Highcharts.chart('chart4'+count, {
					chart : {
						renderTo: 'horiStackedBar',
						type: 'bar',//가로 column 지정은 "column"이 아닌 "bar"
						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {text: '',},
					legend: {
						enabled: true,
						itemMarginBottom: -15,
					},
					xAxis: xAxis4,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						stackLabels: {
							enabled: true,//stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							//format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = stackData[this.x];
								let commaY = $more3DashDetail.util.comma(Number(thisY));
								if(commaY == 0) {
									console.log(commaY);
									return "자료없음";
								}else {
									console.log("console.log(commaY);",commaY);
									return  commaY + '만개';
								}
							},
						},
						gridLineWidth: 0
					}],
					plotOptions: {
						dataLabels: {
							enabled: true,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'500',
								textOutline:0,
							},	
						},
						series: {
							stacking: 'normal',//stacked bar 필수 설정 옵션.(default undefined), normal / percent
							//bar 너비
							pointWidth: 22,
							borderRadius: 5
						}
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							var s = '';
							var cnt = '';
							$.each(this.points, function(i, point) {
								cnt = $more3DashDetail.util.comma(point.y);
								if(cnt > 0) {
									s += point.series.name +' <span style="color:#EEFF2E">'+ cnt +' 만개<br/></span>';
								}else if(cnt == 0) {
									s += point.series.name +' <span style="color:#EEFF2E">자료없음<br/></span>';
								}
							});
							return s;
						},
						shared: true
					},
					series: seriesyearData1
				});
			}
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" ||tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				let value = new Array;
				for(let i=1; i<seriesyearData4[0].data.length; i++) {
					value.push(seriesyearData4[0].data[i].value);
				}
				//if(value[0] != 0 || value[1] != 0 || value[2] != 0) {
					charts4 = Highcharts.chart('chart4'+count, {
						/*colorAxis: {
							minColor: '#DEEFFF',
					        maxColor: '#248EF4'
					    },*/
					    legend: {enabled: false},
						credits: {enabled: false},
						exporting: {
							enabled: false,
							chartOptions: {
								series: {
									dataLabels: {
										style: {
											fontSize: '6px',
											fontFamily: $more3DashDetail.downloadFont,
										}
									},
								},
							}
						},
						title: {text: ''},
						tooltip:{
							//valueSuffix: "",
							useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
							borderRadius: 10,
							backgroundColor :'#000000',
							borderWidth:0,
							shadow: false,
							padding:12,
							style: {
								fontSize :'14px',
								color: '#fff',
								textAlign:'center',
								fontWeight: '600',
								lineHeight:1.2,
							},
							formatter: function() { //durl
								let count = 0;
								let countSet = 0;
								let data = "";
								let num = 0;
								if(this.series.data.length == 4) {
									count = 1;
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 1;
										if(count > 3) break;
									}
								}else if(this.series.data.length == 8) {
									count = 1;
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 4) {
											count += 1;
										}else if(count > 7) break;
									}
								}else if(this.series.data.length == 12) {
									count = 1;
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 4 || count == 8) {
											count += 1;
										}else if(count > 11) break;
									}
								}else if(this.series.data.length == 16) {
									count = 1;
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 4 || count == 8 || count == 12) {
											count += 1;
										}else if(count > 15) {
											break;
										}
									}
								}else if(this.series.data.length == 24) {
									count = 1;
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 4 || count == 8 || count == 12 || count == 16 || count == 20) {
											count += 1;
										}else if(count > 23) {
											break;
										}
									}
								}else if(this.series.data.length == 63) {
									count = 1;
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 1;
										if(count%3 == 0)  {
											count += 1;
										}
										if(count == 58) {
											break;
										}
									}
								}else if(this.series.data.length == 84) {
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 4;
										if(count > 83) break;
									}
								}else if(this.series.data.length == 96) {
									count = 1;
									for(let i=0; i<this.series.data.length; i++) {
										num += this.series.data[count].value;
										count += 1;
										if(count%4 == 0) {
											count += 1;
										}else if(count == 95) {
											break;
										}
									}
								}
								//industryCntTotVal
								let totNum = num.toFixed(1);
								if(this.point.node.level == 1) {
									if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020") {
										cutTotalData = $more3DashDetail.util.comma(Number(industryCntTotVal[(this.x) / 4]));
									}else if(tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
										cutTotalData = $more3DashDetail.util.comma(Number(industryCntTotVal[(this.x) / 3]));
									}
								}else if(this.point.node.level == 2) {
									cutTotalData = $more3DashDetail.util.comma(this.point.value);
								}
								let percentVal = $more3DashDetail.util.comma(Math.floor((cutTotalData / totNum)* 100)); //Math.floor()
								return this.point.name +"("+ percentVal +'%)<span style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>';
							},
							shared: true
						},
						series: seriesyearData4
					});
				//}else if(value[0] == 0 && value[1] == 0 && value[2] == 0) {
					/*$('.tabArea5 #tab4'+count+' .chartbox .highcharts-figure .chart4'+count+' .chart_none').remove();
					$('.tabArea5 #tab4'+count+' .chartbox .highcharts-figure .chart4'+count+'').append("<div class='chart_none'><img src='/images/totSurv/ChartNone.png'><br>해당 자료가 없습니다.</div>");*/
				//}
				
				
			}
			$('#downPicture4').off('click');
			$('#downPicture5').off('click');
			//다운로드 버튼
			$('#downPicture4').click(function(){
				for(var i = 0; i < $('.tabArea4 .tab_content').length; i++){
					if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart42'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart43'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart44'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart45'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart46'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart47'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart48'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart49'){charts4.exportChart();}
					else if($('.tabArea4 .tab_content.on .chartbox div').attr('id') == 'chart410'){charts4.exportChart();}
					else {return;}
				}
			});
			$('#downPicture5').click(function(){
				for(var i = 0; i < $('.tabArea5 .tab_content').length; i++){
					if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart42'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart43'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart44'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart45'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart46'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart47'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart48'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart49'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart410'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart411'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart412'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart413'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart414'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart415'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart416'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart417'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart418'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart419'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart420'){charts4.exportChart();}
					else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart422'){charts4.exportChart();}
					else {return;}
				}
			});
		},
		/**
		 * @name : $more1DashDetail.chart.otherMakeChart5
		 * @description : 5번차트의 버튼 이벤트 차트 생성
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		otherMakeChart5 : function(tblNm, tblId, series, xAxis55, classNm5, classNm1, xAxis5_3) {
			let count;
			let xAxis = "";
			if(tblId == "DT_1EP_3005") {xAxis = xAxis5_3;}
			else {xAxis = xAxis55;}
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002") {count = 2;}
			else if(tblId == "DT_1EP_3003") {
				if(classNm5 == "총계")			{count = 1;}
				else if(classNm5 == "영리기업") 	{count = 2;}
				else if(classNm5 == "비영리기업") 	{count = 3;}
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3016" || 
					 tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || 
					 tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				if(classNm5 == "총계") {count = 1;}
				else if(classNm5 == "회사법인" || classNm5 == "대기업" || classNm5 == "남자" || classNm5 == "    남자" || classNm5 == "임금일자리") {count = 2;}
				else if(classNm5 == "회사이외법인" || classNm5 == "중소기업" || classNm5 == "여자" || classNm5 == "    여자" || classNm5 == "비임금일자리") {count = 3;}
				else if(classNm5 == "정부 · 비법인단체" || classNm5 == "비영리기업") {count = 4;}
				else if(classNm5 == "개인기업체" || classNm5 == "비영리기업") {count = 5;}
			}else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030") {
				if(classNm1 == "0") {count = 1;}
				else if(classNm1 == "1") {count = 2;}
				else if(classNm1 == "2") {count = 3;}
				else if(classNm1 == "3") {count = 4;}
				else if(classNm1 == "4") {count = 5;}
				else if(classNm1 == "5") {count = 6;}
				else if(classNm1 == "6") {count = 7;}
				else if(classNm1 == "7") {count = 8;}
				else if(classNm1 == "8") {count = 9;}
				else if(classNm1 == "9") {count = 10;}
				else if(classNm1 == "10") {count = 11;}
				else if(classNm1 == "11") {count = 12;}
				else if(classNm1 == "12") {count = 13;}
				else if(classNm1 == "13") {count = 14;}
				else if(classNm1 == "14") {count = 15;}
				else if(classNm1 == "15") {count = 16;}
				else if(classNm1 == "16") {count = 17;}
				else if(classNm1 == "17") {count = 18;}
				else if(classNm1 == "18") {count = 19;}
				else if(classNm1 == "19") {count = 20;}
				else if(classNm1 == "20") {count = 21;}
				else if(classNm1 == "21") {count = 22;}
			}	
			let rotation = 0;
			if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || 
			   tblId == "DT_1EP_3030" || tblId == "DT_1EP_3031") {
				rotation = -45;
			}else {
				rotation = 0;
			}
			var charts5 = "charts5"+count;
			charts5 = Highcharts.chart('chart5'+count, {
				chart : {type: 'column', 
						 marginTop:20,
						 style: {
							//fontFamily: 'Noto Sans KR'
								}
						},
				credits: {enabled: false}, //highchart 워터마크 숨김처리
				exporting: {
					enabled: false,
					chartOptions: {
						series: {
							dataLabels: {
								style: {
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
						legend: {
							itemStyle: {
								fontFamily: $more3DashDetail.downloadFont,
							},
						},
						xAxis: {
							labels: {
								rotation: rotation,
								style: {
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
					}
				},
				title: {text: '',},
				legend: {
					enabled: true,
					width: 100,
					verticalAlign: 'middle',
					align: 'left',
					itemMarginTop: 8,
					margin: 5,
					x:-15,
					y:-10,
					itemHoverStyle: {color: '#FF0000',},
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333333',
						textAlign:'center',
						fontWeight: '600',
					}
				},
				xAxis: xAxis,
				yAxis: [{title: {text: ''}, labels: {enabled: false}}],
				tooltip: {
					useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
					enabled : true,
					borderRadius: 10,
					backgroundColor :'#000000', 
					borderWidth:0,
					shadow: false,
					padding:12,
					style: {			 
						fontSize :'14px',  
						color: '#fff',
						textAlign:'center',
						fontWeight: '600',
						lineHeight:1.2,
					},
					formatter: function() {
						if(this.y > 0) {
							return this.series.name + '</br><span style="color:#EEFF2E">' + $more3DashDetail.util.comma(this.y) + ' 만개</span>';
						}else if(this.y == 0) {
							return this.series.name + '</br><span style="color:#EEFF2E">자료없음</span>';
						}
					},
				},
				plotOptions: {
					series: {
						borderRadius: 5,
						pointWidth: 22,
					}
				}, 
				series: series, 
			});
			//다운로드 버튼
			$('#downPicture5_1').off('click');
			if(tblId == "DT_1EP_3001" || tblId == "DT_1EP_3002" || tblId == "DT_1EP_3003" || tblId == "DT_1EP_3006" || tblId == "DT_1EP_3007" || tblId == "DT_1EP_3008" || 
			   tblId == "DT_1EP_3009" || tblId == "DT_1EP_3010" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || 
			   tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || 
			   tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || 
			   tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				$('#downPicture5').off('click');
				$('#downPicture5').on('click', function(){
					for(var i = 0; i < $('.tabArea5 .tab_content').length; i++){
						if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart51'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart52'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart53'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart54'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart55'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart56'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart57'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart58'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart59'){charts5.exportChart();}
						else if($('.tabArea5 .tab_content.on .chartbox div').attr('id') == 'chart510'){charts5.exportChart();}
						else {return;}
					}
				});
			}
			$('#downPicture5_1').on('click', function(){
				for(var i = 0; i < $('.tabArea5_1 .tab_content').length; i++){
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart51'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart52'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart53'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart54'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart55'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart56'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart57'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart58'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart59'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart510'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart511'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart512'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart513'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart514'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart515'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart516'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart517'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart518'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart519'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart520'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart521'){charts5.exportChart();}
					if($('.tabArea5_1 .tab_content.on .chartbox div').attr('id') == 'chart522'){charts5.exportChart();}
					else {return;}
				}
			});
		},
		/**
		 * @name : $more1DashDetail.chart.otherMakeChart6
		 * @description : 6번차트의 버튼 이벤트 차트 생성
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		otherMakeChart6 : function(tblNm, tblId, seriesyearData, xAxis6, classNm6, classNm1, newJobVal, xAxis5_3) {
			let count;
			let xAxis = "";
			if(tblId == "DT_1EP_3005") {
				xAxis = xAxis5_3;
			}else {
				xAxis = xAxis6;
			}
			$('#downPicture6').off('click');
			if(tblId == "DT_1EP_3003") {
				if(classNm6 == "총계") {
					count = 1;
				}else if(classNm6 == "영리기업") {
					count = 2;
				}else if(classNm6 == "비영리기업") {
					count = 3;
				}
			}else if(tblId == "DT_1EP_3010" || tblId == "DT_1EP_3011" || tblId == "DT_1EP_3012" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3014" || tblId == "DT_1EP_3015" || tblId == "DT_1EP_3016" || 
					 tblId == "DT_1EP_3017" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3019" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3026" || tblId == "DT_1EP_3027" || 
					 tblId == "DT_1EP_3031" || tblId == "DT_1EP_3032" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3034" || tblId == "DT_1EP_3035") {
				if(classNm6 == "총계") {count = 1;}
				else if(classNm6 == "회사법인" || classNm6 == "대기업" || classNm6 == "남자" || classNm6 == "    남자" || classNm6 == "임금일자리") {count = 2;}
				else if(classNm6 == "회사이외법인" || classNm6 == "중소기업" || classNm6 == "여자" || classNm6 == "    여자" || classNm6 == "비임금일자리") {count = 3;}
				else if(classNm6 == "정부 · 비법인단체" || classNm6 == "비영리기업") {count = 4;}
				else if(classNm6 == "개인기업체" || classNm6 == "비영리기업") {count = 5;}
			}else if(tblId == "DT_1EP_3005" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3021" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3023" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3029" || tblId == "DT_1EP_3030") {
				if(classNm1 == "0") count = 1;
				else if(classNm1 == "1") count = 2;
				else if(classNm1 == "2") count = 3;
				else if(classNm1 == "3") count = 4;
				else if(classNm1 == "4") count = 5;
				else if(classNm1 == "5") count = 6;
				else if(classNm1 == "6") count = 7;
				else if(classNm1 == "7") count = 8;
				else if(classNm1 == "8") count = 9;
				else if(classNm1 == "9") count = 10;
				else if(classNm1 == "10") count = 11;
				else if(classNm1 == "11") count = 12;
				else if(classNm1 == "12") count = 13;
				else if(classNm1 == "13") count = 14;
				else if(classNm1 == "14") count = 15;
				else if(classNm1 == "15") count = 16;
				else if(classNm1 == "16") count = 17;
				else if(classNm1 == "17") count = 18;
				else if(classNm1 == "18") count = 19;
				else if(classNm1 == "19") count = 20;
				else if(classNm1 == "20") count = 21;
				else if(classNm1 == "21") count = 22;
			}
			///증감막대
			let removeChart6 = $('.modalSearchYear option:selected').val();
			var charts6 = "charts6"+count;
			var year = "";
			if(tblId == "DT_1EP_3035") {
				year = "2018";
			}else {
				year = "2016";
			}
			if(removeChart6 > year) {
				charts6 = Highcharts.chart('chart6'+count, {
					chart : {
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						marginTop:20,
						style: {
							//fontFamily: 'Noto Sans KR',
						}
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: { text: '', },
					legend: {
						enabled: false,// 범례
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						itemMarginTop: 7,
						itemStyle: {
							textOverflow: "ellipsis"
						}
					},
					xAxis: xAxis,
					yAxis: [{
						title: {
							text: ''
						},
						labels: {
							enabled: false,
							tickInterval: 100,
							style: {
								color:'#494949',
								fontSize: '11px',
								fontWeight: 'bold'
							},
						},
					}],
					plotOptions: {
						series: {
							borderRadius: 5,
							pointWidth: 22,
						}
					},
					series: seriesyearData,
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							var count = "";
							var totVal = "";
							totVal = $more3DashDetail.util.comma(newJobVal[Number(this.point.x)]);
							if(Number(totVal) == "0.0") {
								return '<span style="color:#EEFF2E">변동없음</span>';
							}else {
								return this.x + ' 일자리수</br> <span style="color:#EEFF2E">' + totVal + ' 만개</span>';
							}
						},
					},
				});
			}else {
				$('#tab6'+count+' .chartbox .highcharts-figure #chart6'+count+'').remove();
				$('#tab6'+count+' .chartbox .highcharts-figure').append("<div class='chart_none'><img src='/images/totSurv/ChartNone.png'><br>해당 년도의 자료가 없습니다.</div>");
			}
			$('#downPicture6').click(function(){
				for(var i = 0; i < $('.tabArea6 .tab_content').length; i++){
					if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart62'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart63'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart64'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart65'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart66'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart67'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart68'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart69'){charts6.exportChart();}
					else if($('.tabArea6 .tab_content.on .chartbox div')[i].id == 'chart610'){charts6.exportChart();}
					else {return;}
				}
			});
		},
		/**
		 * @name : $more1DashDetail.chart.industryChart
		 * @description : 산업대분류별 1번차트 생성
		 * @date : 2022.11.10
		 * @author : 조규환
		 * @history :
		 */
		industryChart : function(tblId) {
			let param = new Array;
			let dataVal = new Array;
			let series = new Array;
			let data = new Array;
			let result = new Array;
			let perChange = new Array;
			let industryNm = new Array;
			let categories = ['2016', '2017', '2018', '2019', '2020'];
			if(tblId == "DT_1EP_3005") {
				/*param = {
						'apiKey' : 		apiKey,
						'itmId': 		"T00",
						'objL1': 		"000",
						'objL2': 		"00",
						'format': 		"json",
						'jsonVD': 		"Y",
						'prdSe': 		"Y",
						'startPrdDe': 	"2016",
						'endPrdDe': 	"2020",
						'loadGubun': 	"1",
						'orgId': 		"101",
						'tblId': 		tblId
					}
					dataVal.push($more1DashDetail.util.OtherDataCommonAjax(param));*/
				for(var i = 0; i < 21; i++) {
					param = {
						'apiKey' : 		apiKey,
						'itmId': 		"T00",
						'objL1': 		(i+1)*100,
						'objL2': 		"00",
						'format': 		"json",
						'jsonVD': 		"Y",
						'prdSe': 		"Y",
						'startPrdDe': 	"2016",
						'endPrdDe': 	"2020",
						'loadGubun': 	"1",
						'orgId': 		"101",
						'tblId': 		tblId
					}
					dataVal.push($more1DashDetail.util.OtherDataCommonAjax(param));
				}
			}
			
			for(var j = 0; j < dataVal.length; j++){
				for(var i = 0; i < dataVal[0].length; i++) {
					data.push(Number(dataVal[j][i].DT));
				}
				industryNm.push(dataVal[j][0].C1_NM);
			}
			result = $more1DashDetail.util.division(data, 5);
			for(var i = 0; i < dataVal.length; i++) {
				series.push({
					name: industryNm[i],
					data: result[i],
					color: "",
					marker: {
						radius: 3,
						symbol: 'circle',
						lineColor:'#7CB5EC',
						fillColor:'#ffffff',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					dataLabels: {
						enabled: true,
						format: '{y}만개',
						enableMouseTracking: true,
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function () {
							if (this.x === this.series.data.length - 1) {
								return this.series.name + ': ' + formatNumber(this.y);
							}
							return null;
						}
					},
				});
			}
			perChange.push (
				"없음"
				,(dataVal[0][1].DT - dataVal[0][0].DT).toFixed(2)
				,(dataVal[0][2].DT - dataVal[0][1].DT).toFixed(2)
				,(dataVal[0][3].DT - dataVal[0][2].DT).toFixed(2)
				,(dataVal[0][4].DT - dataVal[0][3].DT).toFixed(2)
			);
			var charts1 = Highcharts.chart('chart1_1', {
				chart : {
					type : 'line',
					    marginTop: 30,
				},
				credits: {
					enabled: false
				},
				exporting: {
					enabled: false,
					chartOptions: {
						series: {
							dataLabels: {
								style: {
									color: $more3DashDetail.organiFormColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
						legend: {
							itemStyle: {
								fontFamily: $more3DashDetail.downloadFont,
							},
						},
						xAxis: {
							labels: {
								style: {
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
						},
					}
				},
				title: {
					text: '',
				},
				subtitle: {
					text: '',
				},
				yAxis: {
					title: {
					  text: '',
					},
					labels: {
						enabled : false
					},
					lineColor: '#E8E8E8'
				},
				xAxis: {
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories,
				},
				legend: {
					useHTML: true,
					width: 120,
					verticalAlign: 'middle',
					align: 'right',
					marginLeft: 10,
					x:30,
					itemMarginTop: 5,
					itemMarginBottom: 5,
					itemStyle: {
						textOverflow: "width",
						fontSize :'11px',
						color: '#333',
						textAlign:'left',
						fontWeight: '600',
						//fontFamily: 'Noto Sans KR',	
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
				},
				plotOptions: {
					series: {
						marker: {
							enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
							lineWidth: 2, //라인 굵기
							lineColor:'#F15C80', //라인 색
							fillColor:'#ffffff'
						},
						dataLabels: {
							enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
							allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
						},
						events: {
							mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
								$.each(this.data, function(i, point){
									point.dataLabel.show();
								});
							},
							mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
								$.each(this.data, function(i, point){
									point.dataLabel.hide();
								});
							}
						}
					}
				},
				tooltip: {
					useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
					borderRadius: 10, //툴팁 모서리 반지름
					backgroundColor :'#000000', //툴팁 배경 색
					borderWidth:0,
					shadow: false,
					padding:12,
					style: {
						fontSize :'14px',
						color: '#fff',
						textAlign:'center',
						fontWeight: '600',
						lineHeight:1.2,
					},
					formatter: function () {
						var returnFormatter;
						if(this.x == categories[0]) {
							returnFormatter = '전년도 자료 없음' ;
						}else if(this.x == categories[1]) {
							if(perChange[1] > 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[1]+'% 증가 ↑</span>';
							}else if(perChange[1] < 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[1]+'% 감소 ↓</span>';
							}
						}else if(this.x == categories[2]) {
							if(perChange[2] > 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[2]+'% 증가 ↑</span>';
							}else if(perChange[2] < 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[2]+'% 감소 ↓</span>';
							}
						}else if(this.x == categories[3]) {
							if(perChange[3] > 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[3]+'% 증가 ↑</span>';
							}else if(perChange[3] < 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[3]+'% 감소 ↓</span>';
							}
						}else if(this.x == categories[4]) {
							if(perChange[4] > 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[4]+'% 증가 ↑</span>';
							}else if(perChange[4] < 0) {
								returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[4]+'% 감소 ↓</span>';
							}
						}
						return returnFormatter;
					},
				},
				series: series 
			},function(chart) {
				$.each(chart.series, function(i, series) {
					$.each(series.data, function(i, point){
						point.dataLabel.hide();
					});
				});
				$('.highcharts-legend-item').hover(function(e) {
					chart.series[$(this).index()].onMouseOver();
				},function() {
					chart.series[$(this).index()].onMouseOut();
				});
			});
			$('#downPicture1').click(function(){
				for(var i = 0; i < $('.tabArea .tabBox').length; i++){
					if($('.tabArea .tabBox.on .chartbox div').attr('id') == 'chart1'){charts1.exportChart();}
				}
			});
		},
	}
	$more1DashDetail.util = { //util 마지막
		/**
		 * @name : $more1DashDetail.util.division
		 * @description : 배열 number개로 나누기
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		division : function(data, number) {
			const length = data.length;
			const divide = Math.floor(length / number) + (Math.floor( length % number ) > 0 ? 1 : 0);
			const newArray = [];

			for (let i = 0; i <= divide; i++) {
				// 배열 0부터 n개씩 잘라 새 배열에 넣기
				newArray.push(data.splice(0, number)); 
			}
			return newArray;
		},
		/**
		 * @name : $more1DashDetail.util.searchBtn
		 * @description : 통계정보 조회 버튼 클릭
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		searchBtn : function() {
			var tblIdData = $(".modalSearchTitle").val();
			var yearData = $(".modalSearchYear").val();
			$(".header-tag #headerSearchYear").val(yearData).prop("selected", true); //여기
			$more1DashDetail.ui.chartDatachange(tblIdData, yearData);
		},
		/**
		 * @name : $more1DashDetail.util.headerSearchSelect
		 * @description : Header 통계정보 조회 버튼 클릭
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		headerSearchSelect : function() {
			var tblIdData = $(".modalSearchTitle").val();
			var yearData = $(".header-tag #headerSearchYear").val();
			var dataTblId = $(".header-tag #headerSearchYear option").attr('data-tbl-id');
			//if(dataTblId == 'more1') {
				$('.modalSearchYear').val(yearData).prop("selected", true);
				$more1DashDetail.ui.chartDatachange(tblIdData, yearData);
			//}else if(dataTblId == 'more3') {
				/*$('.modalSearchYear').val(yearData).prop("selected", true);
				$more3DashDetail.util.headerSearchSelect();*/
			//}
		},
		/**
		 * @name : $more1DashDetail.util.OtherDataCommonAjax
		 * @description : 1번차트의 년도별 데이터 여러개 리턴
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		//chart1 여러개의 차트 데이터 리턴
		OtherDataCommonAjax : function(param) {
			var proxy = "/view/totSurv/proxy?";
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			var data = new Array;
			$.ajax({
				url: proxy+'https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList',
				type: 'get',
				async: true,
				data: param,
				dataType: "json"
			}).done(function(res) {
				data.push(res);
			});
			return data;
		},
		/**
		 * @name : $more1DashDetail.util.horizontalScroll
		 * @description : 4번, 5번 가로스크롤
		 * @date : 2022.10.11
		 * @author : 조규환
		 * @history :
		 */
		horizontalScroll : function(res) {
			let tblId = res[0].TBL_ID;
			//5번 6번 가로스크롤
			if(tblId == "DT_1EP_3005") {
				$(".chart51").css("width", "3000px");
				$(".chart51").css("height", "205px");
				$(".chart54").css("width", "3000px");
				$(".chart54").css("height", "205px");
				$("#tab51 .chartbox .highcharts-figure").css("overflow-x", "auto");
				$("#tab54 .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1EP_3007" || tblId == "DT_1EP_3013" || tblId == "DT_1EP_3018" || tblId == "DT_1EP_3022" || tblId == "DT_1EP_3025" || tblId == "DT_1EP_3033" || tblId == "DT_1EP_3035") {
				$("#chart51").css("width", "1000px");
				$("#chart51").css("height", "175px");
				$("#chart52").css("width", "1000px");
				$("#chart52").css("height", "175px");
				$("#chart53").css("width", "1000px");
				$("#chart53").css("height", "175px");
				$("#chart54").css("width", "1000px");
				$("#chart54").css("height", "175px");
				$("#chart55").css("width", "1000px");
				$("#chart55").css("height", "175px");
				$("#tab51 .chartbox .highcharts-figure").css("overflow-x", "auto");
				$("#tab52 .chartbox .highcharts-figure").css("overflow-x", "auto");
				$("#tab53 .chartbox .highcharts-figure").css("overflow-x", "auto");
				$("#tab54 .chartbox .highcharts-figure").css("overflow-x", "auto");
				$("#tab55 .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1EP_3022") {
				for(let i = 1; i<11; i++ ) {
					$("#tab5"+i+" .chartbox .highcharts-figure").css("overflow-x", "auto");
					$("#chart5"+i).css("width", "1000px");
					$("#chart5"+i).css("height", "175px");
				}
			}
			if(tblId == "DT_1EP_3011" || tblId == "DT_1EP_3016" || tblId == "DT_1EP_3020" || tblId == "DT_1EP_3024" || tblId == "DT_1EP_3028" || tblId == "DT_1EP_3030" || 
			   tblId == "DT_1EP_3031") {
				for(let i=1; i<13; i++) {
					$(".chart5"+i).css("width", "3000px");
					$(".chart5"+i).css("height", "205px");
					$("#tab5"+i+" .chartbox .highcharts-figure").css("overflow-x", "auto");
					$("#tab6"+i+" .chartbox .highcharts-figure").css("overflow-x", "auto");
				}
			}
		}
	}
}(window, document));

