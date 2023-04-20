/**
 * 도시화 분석 지도 메인화면에 대한 클래스
 *
 * history : 2021/11/02 초기 작성 version : 1.0 see :
 * 원형(/js/interactive/interactiveMap.js)
 *
 */
(function(W, D) {
	W.$urbanMain = W.$urbanMain || {};

	$(document).ready(function() {
		$urbanMain.ui.createMap("mapRgn_1", 0);
		var mapNavi = new urbanMapNavi.UI();
		mapNavi.firstBoolean = true;
		mapNavi.create("mapNavi_1", 1, $urbanMain.ui);
		$('.since').hide();  // 2022 SGIS5 추가 
		$('.mapType').attr('data-map-type', 'white').trigger('click'); // 2022 SGIS5 추가
		$urbanMain.event.setUIEvent();
		$urbanMain.ui.initializeUI('');
		$('.orange-btn2').hide(); // 2022 SGIS5 추가 
		$('.green-btn2').hide(); // 2022 SGIS5 추가 
		$('.gray-btn2').hide(); // 2022 SGIS5 추가 


		// SGIS4_220211_도시화_수정_시작
		$('#ttip_class').tooltip({open : function(event, ui) {
			var target = $(this);
			setTimeout(function() {
				$(".ui-tooltip .subj").text(target.attr("data-subj"));
				ui.tooltip.css("max-width","500px");
				ui.tooltip.css("box-shadow","0 0 7px #3ca96e");
				ui.tooltip.css("top",event.clientY + 15);
			}, 100);
		},
			position : {
				my : "left+10 top",
				at : "right top",
				collision : "flip",
				using : function(position,feedback) {
					if ($(feedback.target)[0].element[0].outerHTML.indexOf("data-subj") != -1) {
						$(this).css(position).prepend("<span class='subj'></span>");
					} else {
						$(this).css(position);
					}

					$("<div>").addClass(feedback.vertical).addClass(feedback.horizontal).appendTo(this);
				}
			},
			content : function() {
				return $(this).prop('title');
			}
		});
		// SGIS4_220211_도시화_수정_끝
		$urbanMain.ui.reqAddress("sido");

		if (u_menu == "") {
			// $urbanMain.ui.reqCommonInfo("dstrct");
			var param = {};
			param.u_menu = "B";
			param.u_class = "UN";
			// param.u_type = "01";
			// param.u_year = $urbanMain.ui.statsBaseYear01[0];
			$urbanMain.ui.doInitView("start", param);
		} else {
			var param = {};
			param.u_menu = u_menu;
			param.u_class = u_class;
			param.u_type = u_type;
			param.u_year = u_year;
			param.u_area = u_area;
			// SGIS5 추가
			param.u_dstrct = u_dstrct;
			param.u_ksic = u_ksic;
			if(u_menu ==='A' || u_menu ==='C' || u_menu ==='D'){
				var $bowl = $('#sub_group_box');
				var $targetItm = $bowl.find(".menu-list2 > a[data-urban-id="+u_area+"]");					
				setTimeout(() => {	
					$('#urban_ty_box_1 > li[data-urbar-type='+u_type+']').trigger('click');
					$('.menu-group[data-dstrct-cd='+u_dstrct+']').trigger('click');	
					setTimeout(() => {
						$('.menu-list2 > a[data-urban-id='+u_area+']').trigger('click');	
						if(u_menu ==='D'){
							setTimeout(() => {
								$('.facility-layer').trigger('click');
								$('.iconbox[data-ksic_5_cd='+u_ksic+']').closest('li').trigger('click');
							}, 700);
						}
					}, 1000);
				}, 2500);
			
			
			}
			// SGIS5 추가 끝
		
			$urbanMain.ui.doInitView("start", param);
		}
	});

	$urbanMain = {
		noReverseGeoCode : true
	};

	$urbanMain.ui = {
		namespace : "urbanMain",
		mapList : [],
		geoList : [],
		curMapId : 1, // 지도는 1개뿐(개발완료 시점), 1개 이상 시 이 변수를 잘 현행화해야 함.
		// statsBaseYear01 : [ "2020", "2019", "2018", "2017", "2016", "2015"/* "2010","2005","2000"*/],
		statsBaseYear01 : [ "2021","2020", "2019", "2018", "2017", "2016", "2015"/* "2010","2005","2000"*/], // 21년 추가
		// UN도시분류에 대한 통계년도
		// statsBaseYear02 : [ "2020", "2019", "2018", "2017", "2016", "2015" ],
		statsBaseYear02 : [ "2021","2020", "2019", "2018", "2017", "2016", "2015" ],
		// 통계청분류에 대한 통계년도
		// statsBaseYear03 : [ "2020", "2019", "2018", "2017", "2016", "2015","2010", "2005", "2000" ],// UN도시분류에 대한 통계년도(시계열 도형) 21년 추가
		statsBaseYear03 : [ "2021","2020", "2019", "2018", "2017", "2016", "2015","2010", "2005", "2000" ],// UN도시분류에 대한 통계년도(시계열 도형) 21년 추가
		classDeg : 10, // 산업분류 "10" 차
		isTimeSeriesPlay : false,// 시계열 start, stop 여부
		isTimeSeriesStop : false,
		timeSeriesIdx : 0,// 시계열 cnt
		timeSeriesClsTy : "",
		timeSeriesYearList : [],
		timeSeriesCaptureList : [], // 시계열 캡처 이미지들 저장
		timeSeriesTimerId : "",
		writeSrvLogYn : "Y",

		/**
		 *
		 * @name : createMap
		 * @description : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 * @date : 2014. 10. 11.
		 * @author : 개발자
		 * @history :
		 */
		createMap : function(id, seq) {
			var map = new sMap.map();
			map.createMap($urbanMain, id, {
				center : [ 989674, 1818313 ],
				zoom : 2,
				measureControl : false,
				statisticTileLayer : true
			});

			map.id = seq;
			map.addControlEvent("drop", {
				accept : ".dragItem"
			});
			map.addControlEvent("movestart");
			map.addControlEvent("moveend");
			map.addControlEvent("zoomend");
			map.addControlEvent("draw");
			// map.addControlEvent("click");

			// 범례 호출 함수 : TODO urbanLegendInfo.js에 대한 수정이 발생하지 않으면,
			// 원형(/js/common/mapInfo/legendInfo.js) 사용으로 변경
			var legend = new uLegendInfo.legendInfo(map);
			legend.initialize($urbanMain.ui);
			map.legend = legend;
			// legend.createLegend();
			legend.legendType = "equal";

			var btnInfo = new urbanMapBtnInfo.btnInfo(map, $urbanMain.ui);
			map.mapBtnInfo = btnInfo;
			btnInfo.createUI({
				urban : true
			});

			map.itemtext = '';
			// 사용자지정컨트롤설정
			this.mapList[seq] = map;

			// map.gMap.whenReady(function() {
			// map.createHeatMap();
			// });

			var geo = new urbanGeo.drawing();
			geo.createGeo($urbanMain, id, map);
			this.geoList[seq] = geo;

			return map;
		},
		/**
		 *
		 * @name : doRemoveMap
		 * @description : 화면분할 지도 삭제
		 * @date : 2022. 08. 08.
		 * @author : 개발자
		 * @history :
		 */
		doRemoveMap : function(type) {
			this.curMapId = parseInt(type);
			if (type == 0) {
				this.mapList[this.curMapId].gMap.remove();
				this.mapList[this.curMapId] = null;
				$('.control-wrap').css('display', 'none');
				$('.mapContents').css('display', 'none');
			} else if (type > 1) {
				for (var i = 1; i <= type; i++) {
					this.mapList[i].gMap.remove();
					this.mapList[i] = null;
					$('.contentsView' + i).removeAttr('style');
					$('.control-foot' + i).css('display', 'none');
				}
			}
		},

		/**
		 *
		 * @name : doCreateMap
		 * @description : 화면분할 지도 생성
		 * @date : 2022. 08. 08.
		 * @author : 개발자
		 * @history :
		 */

		doCreateMap : function(type) {
			var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
			var years = $urbanLeftMenu.ui.getCheckedYear();
			var mapNavi = new urbanMapNavi.UI();
			if (type > 1) {
				$urbanMain.ui.doCreateMapCss(type);
				for (var i = 1; i <= type; i++) {
					$('.wrapDipYear').show();
					$('.wrapDipYear').find('.dipYear'+i).text(years[i-1]+"년");
					$urbanMain.ui.createMap("mapRgn_" + (i + 1), i);
					paramObj.map_id = i;
					paramObj.base_year = years[(i - 1)];
					$urbanMain.ui.reqCommonInfo("urbars", paramObj)
					$urbanMain.ui.reqUrbarsGeometry(paramObj, false)
					mapNavi.create("mapNavi_" + (i + 1), (i + 1),$urbanMain.ui);
				}
			}

		},

		doProcessFun : function() {
			var param = {};
			var newIdentifier;
			var remainCnt = 1;
			param.countdown = 1;
			newIdentifier = $urbanObj.setInitMap(param);
			$urbanObj.setCurIdentifier(newIdentifier);
			param.identifier = $urbanObj.curIdentifier;
			param.work_gb = "urbar";
			$urbanMask.startProcess(remainCnt, param);
		},
		/**
		 *
		 * @name : getToken
		 * @description : 토큰 가져오기
		 * @date : 2022. 11. 07.
		 * @author : 개발자
		 * @history :
		 */
		getToken: function() {
		 	var tokenResult;
	        var sopPortalAccessTokenObj = {};
	        sopPortalAccessTokenObj["consumer_key"] = "590a2718c58d41d9ae3b";
	        sopPortalAccessTokenObj["consumer_secret"] = "ab7fe94f9fb64336abd3";
	        $.ajax({
	            method : "GET",
	            async : false,
	            url : "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
	            data : sopPortalAccessTokenObj ,
	            success : function(res){
	            	tokenResult =res.result.accessToken;
	            }
	        })
	        return tokenResult;
		},

		/**
		 *
		 * @name : doCreateMapCss
		 * @description : 화면분할 지도 스타일
		 * @date : 2022. 08. 08.
		 * @author : 개발자
		 * @history :
		 */
		doCreateMapCss : function(type) {
			for (var i = 1; i <= type; i++) {
				$('.contentsView' + i).css('display', 'block');
				$('.control-foot' + i).css('display', 'block');
			}
			if (type == 2) {
				$('.contentsView1').css({
					'width' : '50%',
					'height' : '100%',
					'position' : 'fixed'
				});
				$('.contentsView2').css({
					'width' : '49.9%',
					'height' : '100%',
					'position' : 'absolute',
					'left' : '50.1%',
					'position' : 'fixed'
				});
				$('.contentsView3').css('display', 'none');
				$('.control-foot3').css('display', 'none');
				$('.contentsView4').css('display', 'none');
				$('.control-foot4').css('display', 'none');
			} else if (type == 3) {
				$('.contentsView4').css('display', 'none');
				$('.control-foot4').css('display', 'none');
				$('.contentsView1').css({
					'width' : '50%',
					'height' : '100%',
					'position' : 'fixed'
				});
				$('.contentsView2').css({
					'width' : '50%',
					'height' : '47%',
					'position' : 'absolute',
					'left' : '50.2%',
					'position' : 'fixed'
				});
				$('.contentsView3').css({
					'width' : '50%',
					'height' : '48%',
					'position' : 'absolute',
					'top' : '52%',
					'left' : '50.2%',
					'position' : 'fixed'
				});
			} else if (type == 4) {
				$('.contentsView1').css({
					'width' : '50%',
					'height' : '47%',
					'position' : 'fixed'
				});
				$('.contentsView2').css({
					'width' : '50%',
					'height' : '47%',
					'position' : 'absolute',
					'left' : '50.2%',
					'position' : 'fixed'
				});
				$('.contentsView3').css({
					'width' : '50%',
					'height' : '48%',
					'position' : 'absolute',
					'top' : '52%',
					'position' : 'fixed'
				});
				$('.contentsView4').css({
					'width' : '50%',
					'height' : '48%',
					'position' : 'absolute',
					'top' : '52%',
					'left' : '50.2%',
					'position' : 'fixed'
				});

			}
		},
		/**
		 *
		 * @name : doInitMap
		 * @description : 1개 지도 생성
		 * @date : 2022. 08. 08.
		 * @author : 개발자
		 * @history :
		 */
		doInitMap : function() {
			var mapNavi = new urbanMapNavi.UI();
			mapNavi.firstBoolean = true;
			$('.control-wrap').css('display', 'block');
			$('.mapContents').css('display', 'block');
			$urbanMain.ui.createMap("mapRgn_1", 0);
			mapNavi.create("mapNavi_1", 1, $urbanMain.ui);
			$urbanMain.ui.initializeUI('');
			$('.mapType').attr('data-map-type', 'white').trigger('click');
		},
		// SGIS5 변경
		doDownPDF : function(layerId,targetId){
			let headerHeight;
			let docItemHeight;
			$("#urbanMaskBg, #urbanMaskLdg").show();
			console.log(layerId);
			console.log(targetId);
			$("#"+layerId+" > .layer_box").css('left','-9999px'); 
	
			if(layerId ==='totPopupContent'){
				headerHeight = ($("#"+targetId+" .item_box_top").css('display') == 'none') ? 0 : 60 ;
			}else{
				headerHeight =  100 ;
			}
			
			let itemLength = 0;
			let oriContainerHeight =600;
			console.log(oriContainerHeight);
			let oriContentHeight = $("#"+targetId+" .data_content").height();
			
			document.querySelectorAll('#'+targetId+' .item_box').forEach(function(item) {
				
				if($(item).css('display') == 'block') {
					
					// todo display:none 인건 제거 
					$(item).children('li').each(function(i, itemInner){
						
						if($(itemInner).css('display') != 'none') 	itemLength++;
						docItemHeight =$(itemInner).height()+20;
					})
				}
			})
			
			// 2행 로우 개수 * 아이템 높이 + 아이템간 패딩?
			let docContentHeight = Math.ceil(itemLength / 2) * docItemHeight + headerHeight;
			$("#"+targetId+", #"+targetId+" .data_content").css('height',docContentHeight);
			
			html2canvas(document.getElementById(targetId)).then(function(canvas) {
				
				let year = $("#"+layerId+" .heading .year").text();
				let region = $("#"+layerId+" .heading .tit").text().replace(/ /gi,'_');
				let filename = `종합통계보기_${region}_${year}.jpg` 
				
				var link = document.createElement("a");
				link.href = canvas.toDataURL();
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				
				document.body.removeChild(link);
				$("#"+targetId).css('height','initial');
				$("#"+targetId+" .data_content").css('height','600px');
				$("#urbanMaskBg, #urbanMaskLdg").hide();
				$("#"+layerId+" > .layer_box").css('left','50%');
				
			});
		},

		/**
		 *
		 * @name : doRemoveMap
		 * @description : 화면분할 지도 삭제
		 * @date : 2022. 08. 08.
		 * @author : 개발자
		 * @history :
		 */
		doInitDatabord : function(type) {
			$urbanMain.ui.doInitDatabordClear();
			var activeMenu = $('.menu-group2 .menu-list2 > a.active');
			var dstrctCd = $('.menu-group.active').attr('data-dstrct-cd');
			var param = $urbanObj.makeSelectedUrbarsInfo(activeMenu);
			param.dstrct_lclas_cd = dstrctCd;
			param.map_id = 0;
			if (type == 1) {
				$urbanDataBoard.ui.reqUrbarsStatistics(param, "0", "T");
			} else if (type == 2) {
				$urbanDataBoard.ui.reqUrbarsIndexes(param, "T");
			}

		},
		doInitDatabordClear : function() {
			var chartList = [ 'chart1', 'chart2', 'chart3', 'chart4', 'chart5','chart6' ];
			$.each(chartList, function(idx, item) {
				$urbanDataBoard.ui.clearDatatable(item);
			});
		},

		getMap : function(seq) {
			var map;
			if (seq !== undefined && seq !== null) {
				map = this.mapList[seq];

			} else {
				map = this.mapList[this.curMapId];
			}
			return map;
		},

		getGeo : function(seq) {
			var geo;
			if (seq !== undefined && seq !== null) {
				geo = this.geoList[seq];
			} else {
				geo = this.geoList[this.curMapId];
			}

			return geo;
		},

		/**
		 *
		 * @name : initializeUI
		 * @description : 초기정보를 설정한다.
		 *
		 */
		initializeUI : function(pFlag) {
				/*
				var slider = new Slider("#history_slder", {
					min: 1,
					max: 9,
					step: 1,
					value: 1,
					ticks: [1,2,3,4,5,6,7,8,9],
					ticks_labels: ["2000", "2005", "2010", "2015", "2016", "2017", "2018", "2019", "2020"],
				});
				*/

			$urbanLeftMenu.ui.setYearSelBar($urbanObj.urbanCls_UN, false);
		},

		doInitView : function(pFlag, pObj) {
			// 순차적이고 초기화면 설정에 사용
			// (화면이 동작하기 전)초기설정이 필요한 부분에서는 init_complete 호출
			if (pFlag == "start") {
				var param = pObj;
				param.countdown = 1; // 현재 초기설정이 1개(필요한 초기설정만큼, 1개이면 안넣어도 됨)

				param.identifier = $urbanObj.setInitMap(param);
				$urbanMain.ui.reqCommonInfo("dstrct", param); // 초기 설정 1
			} else if (pFlag == "init_complete") {
				var identifier;
				if (pObj !== undefined && pObj !== null) {
					identifier = pObj["identifier"];
				}

				if (identifier !== undefined && identifier !== null) {
					var initParam = $urbanObj.getInitMap(identifier);
					if (initParam !== undefined && initParam !== null) {
						var countdown = initParam["countdown"];
						if (countdown === 0) { // 다음 단계 실행
							var u_menu = initParam["u_menu"];
							var u_class = initParam["u_class"];
							var isValid = true;
							var bowlId;
							// SGIS5 변경
							if (u_menu == "A" || u_menu == "B" || u_menu == "C" || u_menu == "D") {
								if (u_menu === "B") {
									bowlId = "gnb_menu_2";
								} else if (u_menu === "C") {
									bowlId = "gnb_menu_3";
								} else if (u_menu === "D") {
									bowlId = "gnb_menu_4";
								}else if (u_menu === "A") {
									bowlId = "gnb_menu_1";
								}
								// SGIS5 변경 끝
								// 분류 설정
								if (u_class == "UN") {
									/*
									 * $('#' + bowlId + ' > ul li
									 * a').removeClass("active"); $('#' + bowlId + ' >
									 * ul li:nth-child(1)
									 * a').addClass("active");
									 */
									$('.header-left .switchBox').removeClass("off");
								} else if (u_class == "SGIS") {
									/*
									 * $('#' + bowlId + ' > ul li
									 * a').removeClass("active"); $('#' + bowlId + ' >
									 * ul li:nth-child(2)
									 * a').addClass("active");
									 */
									$('.header-left .switchBox').addClass("off");
								} else {
									isValid = false;
								}

								// 타입 설정
								if (u_class == "UN"&& (u_menu == "A" || u_menu == "C" || u_menu == "D")) {
									var u_type = initParam["u_type"];
									if (u_type == "01") {
										$('#urban_ty_box_1 > li').removeClass("active");
										$("#urban_ty_box_1 > li:nth-child(1)").addClass("active");
									} else if (u_type == "02") {
										$('#urban_ty_box_1 > li').removeClass("active");
										$("#urban_ty_box_1 > li:nth-child(2)").addClass("active");
									} else {
										isValid = false;
									}
								}

								// 년도 설정
								if (u_menu == "A" || u_menu == "C" || u_menu == "D") {
									var u_year = initParam["u_year"];
									if (u_year !== undefined && u_year !== null  && u_year.length === 4) {
										// var $tgtYear = $('.since').find('.since-button > a[data-year='+ u_year + ']');
										var $tgtYear2 = $('.sinceNew').val(u_year).prop("selected",true); //변경
										// if ($tgtYear.length > 0) {
										// 	$('.since .since-button > a').removeClass("active");
										// 	$tgtYear.addClass("active");
										// } else {
										// 	isValid = false;
										// }
									} else {
										isValid = false;
									}
								}
							} else {
								isValid = false;
							}
							// 필요한 변수(2~4개)가 모두 유효해야 실행
							if (isValid) {
								initParam.countdown = 2;
								var newIdentifier = $urbanObj.setInitMap(initParam);
								$urbanObj.setCurIdentifier(newIdentifier);
								$('#' + bowlId + ' > a').trigger("click");
							}
						}
					} // end
				}
			} else if (pFlag == "map_complete" || pFlag == "uaList_complete") {
				var curIdentifier = $urbanObj.getCurIdentifier();
				if (curIdentifier !== "") {
					var initParam = $urbanObj.getInitMap(curIdentifier);
					if (initParam !== undefined && initParam !== null) {
						var countdown = initParam["countdown"];
						if (countdown === 0) {
								var curUrbanId = initParam["u_area"];
								if (curUrbanId !== undefined && curUrbanId !== null
										&& curUrbanId !== "") {
									// var $bowl = $('#menu_group_box');
									var $bowl = $('#sub_group_box');
									// var $targetItm = $bowl.find(".menu-list > a[data-urban-id="	+ curUrbanId + "]");
									var $targetItm = $bowl.find(".menu-list2 > a[data-urban-id="	+ curUrbanId + "]");
									// 이하 didSelectedPolygon 처리와 동일
									if ($targetItm !== undefined && $targetItm !== null && $targetItm.length > 0) {
										// $($targetItm).closest(".menu-group").find(".menu-toggle").trigger('click');
										$($targetItm).closest(".menu-group2").trigger('click');
										// if( $('.menu-group2').hasClass('active').attr('data-dstrct-cd') == $('.menu-group').attr('data-dstrct-cd')){
										// 	$('.menu-group').addClass('active');
										// }	
										// var $menuList = $($targetItm).closest(".menu-list");
										var $menuList = $($targetItm).closest(".menu-list2");
										var $menuItms = $menuList.find('a');
										var topPos2 = 0;
										$.each($menuItms, function(index, item) {
											if (item == $targetItm[0]) {
												return false;
											}
											topPos2 = topPos2+ $(item).outerHeight(true);
										});
	
										$menuList.scrollTop(topPos2);
	
										var isMapMove = initParam["isMapMove"];
										if (isMapMove === "N") {
											$($targetItm).trigger('click', {"isMapMove" : "N"});
										} else {
											$($targetItm).trigger('click');
										}
									}
								}
						}
					}
				}
			}
		},

		/**
		 *
		 * @name : reqCommonInfo
		 * @description : 공통정보 요청
		 *
		 */
		reqCommonInfo : function(pWorkGb, pObj) {
			// pWorkGb: code-공통코드, dstrct-권역 목록, urbars-도시지역 목록
			// pObj: 필요시 작업별 파라미터 추가
			// urbars은 3가지 경우에 호출: 년도 선택 시, 통계청 분류 선택 시, UN도시 분류(도시/준도시) 선택 시
			var param = {};
			param.work_gb = pWorkGb;
			if (pObj !== undefined && pObj["identifier"] !== undefined) {
				param.identifier = pObj["identifier"];
			}

			if (pWorkGb == "urbars") {
				// 지도 및 데이터보드 초기화(권역 목록 갱신 시 일괄처리, 필요 시 개별 호출 시점으로 이동)
				$urbanDataBoard.ui.clearUI("menu01");

				//
				param.base_year = pObj.base_year;
				param.urban_cls_gb = pObj.urban_cls_gb;
				param.urban_type = pObj.urban_type; // opt

				var urbarsMap = $urbanObj.getUrbanAreasInfo(param);
				if (urbarsMap !== undefined && urbarsMap !== null) {
					$urbanLeftMenu.ui.makeUrbanAreas(param, urbarsMap);
					return;
				}
			} else if (pWorkGb == "subRegion") {
				param.base_year = pObj.base_year;
				param.urban_cls_gb = pObj.urban_cls_gb;
				param.urban_id = pObj.urban_id;
				param.urban_type = pObj.urban_type; // opt
			} else if (pWorkGb == "urbars_adm") {
				param.base_year = pObj.base_year;
				param.urban_cls_gb = pObj.urban_cls_gb;
				param.urban_type = pObj.urban_type; // opt
				param.urban_sido_cd = pObj.urban_sido_cd;
				param.urban_sgg_cd = pObj.urban_sgg_cd; // opt
			}

			var options = $urbanMain.ui.reqSetParams("API_202171", param);
			$urbanMain.ui.requestOpenApi(options);
		},

		setUrbanAreas2 : function(pRes, pOptions) {
			$urbanMain.ui.setDisplayPop("comparison", true);

			var $bowl = $('#comparison .rank-list');
			var errCd = parseInt(pRes.errCd);
			if (errCd === 0) {
				var list = pRes.result.list;
				if (list !== undefined && list !== null && list.length > 0) {
					var htmlString = '';
					var urbanCls = $urbanObj.getValueMappedToKey(
							[ "urban_cls_gb" ], pOptions);

					var param = $urbanObj.getStatsParamInfo();
					var exUrbanId = "";
					if (param !== null) {
						exUrbanId = $urbanObj.getValueMappedToKey(
								[ "urban_id" ], param);
					}

					$.each(list,function(index, item) {
						var type = (item["type"] === undefined ? "": item["type"]);
						var sido_cd = (item["sido_cd"] === undefined ? "": item["sido_cd"]);
						var sgg_cd = (item["sgg_cd"] === undefined ? "": item["sgg_cd"]);
						var main_urban_id = (item["main_urban_id"] === undefined ? "": item["main_urban_id"]);
						if (exUrbanId == item["urban_id"]) {
							htmlString += '<li><a href="#" data-urban-id="'+ item["urban_id"]+ '" data-urban-year="'+ item["base_year"]+ '" data-urban-cls="'+ urbanCls+ '" data-urban-type="'+ type
										+ '" data-urban-sido="'+ sido_cd+ '" data-urban-sgg="'+ sgg_cd+ '" data-urban-x="'+ item["x_coor"]+ '" data-urban-y="'+ item["y_coor"]
										+ '" data-urban-area="'+ item["area"]+ '" data-urban-main-id="'+ main_urban_id+ '" class="noSel mightOverflow">'+ item["urban_nm"]+ '</a></li>';
						} else {
							//SGIS5 변경
							htmlString += '<li><a class="mightOverflow" href="#" data-urban-id="'+ item["urban_id"]+ '" data-urban-year="'+ item["base_year"]+ '" data-urban-cls="'+ urbanCls
									+ '" data-urban-type="'+ type+ '" data-urban-sido="'+ sido_cd+ '" data-urban-sgg="'+ sgg_cd+ '" data-urban-x="'+ item["x_coor"]
									+ '" data-urban-y="'+ item["y_coor"]+ '" data-urban-area="'+ item["area"]+ '" data-urban-main-id="'+ main_urban_id+ '">'+ item["urban_nm"]+ '</a></li>';
						}
					});

					$bowl.html(htmlString);
				} else {
					$urbanMain.ui.setDisplayPop("comparison", false, "noData");
				}
			} else {
				$urbanMain.ui.setDisplayPop("comparison", false, "noData");
			}
		},

		setIdxRankList : function(pKey, pId) {
			srvLogWrite('R0', '04', '04', '02',$urbanDataBoard.ui.idxNms[$urbanDataBoard.ui.idxIdntfrs.indexOf(pKey)], ''); // 2022.02.15 log 생성
			var $bowl = $('#densely .rank-list');
			$bowl.empty();

			$('#densely .modal-header > h2').html($urbanDataBoard.ui.idxNms[$urbanDataBoard.ui.idxIdntfrs.indexOf(pKey)]+ ' <em>순위선택</em>');
			var tIdx = 0;
			var statsList = $urbanObj.getIdxStatsMap(pKey);
			if (statsList.length > 0) {
				var htmlString = '';
				var exUrbanId = pId;
				$.each(statsList,function(index, item) {
					var type = (item["type"] === undefined ? "": item["type"]);
					var sido_cd = (item["sido_cd"] === undefined ? "": item["sido_cd"]);
					var sgg_cd = (item["sgg_cd"] === undefined ? "": item["sgg_cd"]);
					var main_urban_id = (item["main_urban_id"] === undefined ? "": item["main_urban_id"]);
					if (exUrbanId == item["urban_id"]) {
						htmlString += '<li><a href="#" data-urban-id="'+ item["urban_id"]+ '" data-urban-year="'+ item["base_year"]+ '" data-urban-cls="'+ item["urban_cls"]
								+ '" data-urban-type="'+ type+ '" data-urban-sido="'+ sido_cd+ '" data-urban-sgg="'+ sgg_cd
								+ '" data-urban-x="'+ item["x_coor"]+ '" data-urban-y="'+ item["y_coor"]+ '" data-urban-area="'+ item["area"]
								+ '" data-urban-main-id="'+ main_urban_id+ '" class="noSel mightOverflow"><span>'+ item["rank"]+ '위</span> '+ item["urban_nm"]+ '</a></li>';
						tIdx = index;
					} else {
						htmlString += '<li><a href="#" data-urban-id="'+ item["urban_id"]+ '" data-urban-year="'+ item["base_year"]+ '" data-urban-cls="'+ item["urban_cls"]
								+ '" data-urban-type="'+ type+ '" data-urban-sido="'+ sido_cd+ '" data-urban-sgg="'+ sgg_cd+ '" data-urban-x="'+ item["x_coor"]
								+ '" data-urban-y="'+ item["y_coor"]+ '" data-urban-area="'+ item["area"]+ '" data-urban-main-id="'+ main_urban_id
								+ '" class="mightOverflow"><span>'+ item["rank"]+ '위</span> '+ item["urban_nm"]+ '</a></li>';
					}
				});

				$bowl.html(htmlString);
			} else {

			}

			return tIdx;
		},

		reqAddress : function(pWorkGb, pObj) {
			var param = {};
			param.work_gb = pWorkGb;

			if (pObj !== undefined && pObj !== null) {
				if (pWorkGb == "sgg") {
					param.sido_cd = pObj.sido_cd;
				}

				if (pObj["sel_sido_cd"] === undefined|| pObj["sel_sido_cd"] === null) {
					param.sel_sido_cd = "";
				} else {
					param.sel_sido_cd = pObj["sel_sido_cd"];
				}

				if (pObj["sel_sgg_cd"] === undefined|| pObj["sel_sgg_cd"] === null) {
					param.sel_sgg_cd = "";
				} else {
					param.sel_sgg_cd = pObj["sel_sgg_cd"];
				}
			}

			var options = $urbanMain.ui.reqSetParams("API_202176", param);
			$urbanMain.ui.requestOpenApi(options);
		},

		setAddress : function(pRes, pOptions) {
			var result = pRes.result;
			var htmlString = '';
			var sel_sido_cd = "";
			var sel_sgg_cd = "";
			var param = pOptions["params"];
			if (param.work_gb == "sido") {
				var sidoList = result.sidoList;
				var isSelected = false;
				if (sidoList !== undefined && sidoList !== null) {
					sel_sido_cd = $urbanObj.getValueMappedToKey(
							[ "sel_sido_cd" ], param);
					for (var i = 0; i < sidoList.length; i++) {
						var elem = result.sidoList[i];
						if (sel_sido_cd === elem.sido_cd) {
							htmlString += '<option value="' + elem.sido_cd
									+ '/' + elem.x_coor + '/' + elem.y_coor
									+ '" selected>' + elem.sido_nm
									+ '</option>';
							isSelected = true;
						} else {
							htmlString += '<option value="' + elem.sido_cd
									+ '/' + elem.x_coor + '/' + elem.y_coor
									+ '">' + elem.sido_nm + '</option>';
						}
					}
				}

				$("#sidoSelect_comparison_1").empty();
				if (isSelected) {
					htmlString = '<option value="">시도 선택</option>' + htmlString;
				} else {
					htmlString = '<option value="" selected>시도 선택</option>'
							+ htmlString;
				}
				$("#sidoSelect_comparison_1").html(htmlString);

				$("#sggSelect_comparison_1").empty();
				$("#sggSelect_comparison_1").html(
						'<option value="" selected>시군구 선택</option>');
			} else if (param.work_gb == "sgg") {
				var sggList = result.sggList;
				var isSelected = false;
				if (sggList !== undefined && sggList !== null) {
					sel_sgg_cd = $urbanObj.getValueMappedToKey(
							[ "sel_sgg_cd" ], param);
					for (var i = 0; i < sggList.length; i++) {
						var elem = result.sggList[i];
						if (sel_sgg_cd === elem.sgg_cd) {
							htmlString += '<option value="' + elem.sgg_cd + '/'
									+ elem.x_coor + '/' + elem.y_coor
									+ '" selected>' + elem.sgg_nm + '</option>';
							isSelected = true;
						} else {
							htmlString += '<option value="' + elem.sgg_cd + '/'
									+ elem.x_coor + '/' + elem.y_coor + '">'
									+ elem.sgg_nm + '</option>';
						}
					}
				}

				$("#sggSelect_comparison_1").empty();
				if (isSelected) {
					htmlString = '<option value="">시군구 선택</option>'
							+ htmlString;
				} else {
					htmlString = '<option value="" selected>시군구 선택</option>'
							+ htmlString;
				}
				$("#sggSelect_comparison_1").html(htmlString);
			}
		},

		/**
		 *
		 * @name : reqUrbarsGeometry
		 * @description : 도시화지역 도형정보 요청
		 *
		 */
		reqUrbarsGeometry : function(pObj, pClear) {
			if (pClear) {
				var mapId = $urbanObj.getValueMappedToKey([ "map_id" ], pObj);
				var geo = $urbanMain.ui.getGeo(mapId);
				geo.clearGeo();
			}

			if (pObj.urban_cls_gb == $urbanObj.urbanCls_SGIS) {
				if (pObj.comparison_gb == "CG1" || pObj.comparison_gb == "CG2") {
					var options = $urbanMain.ui.reqSetParams("API_202172", pObj);
					$urbanMain.ui.requestOpenApi(options);
				} else {
					var baseYear = $urbanObj.getValueMappedToKey([ "base_year" ], pObj);
					var apiUrl = "/js/urban/data/geo_urban_" + baseYear + ".js";
					var options = {
						params : $urbanMain.ui.reqSetParams("API_202172", pObj),
						url : apiUrl
					};

					$.ajax({
						type : "GET",
						url : contextPath + apiUrl,
						async : false,
						success : function(res) {
							// if (res.errCd == "0") {
							var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
							if (selMenuId === "gnb_menu_2") {
								if (!$urbanMain.ui.isTimeSeriesStop) {
									$urbanMain.ui.setUrbarsGeometry(res,options);
								}
							} else {
								$urbanMain.ui.setUrbarsGeometry(res, options);
							}
							// }
						},
						dataType : "json",
						error : function(e) {
							console.error("통계청분류 경계도형 호출 확인: " + baseYear);
						}
					});
				}
			} else {
				var options = $urbanMain.ui.reqSetParams("API_202172", pObj);
				$urbanMain.ui.requestOpenApi(options);
			}
		},

		/**
		 *
		 * @name : setUrbarsGeometry
		 * @description : 도시화지역 도형정보 처리
		 *
		 */
		setUrbarsGeometry : function(pRes, pOptions) {
			var mapId = $urbanObj.getValueMappedToKey([ "map_id" ], pOptions);
			var geo = $urbanMain.ui.getGeo(mapId);

			// console.log(JSON.stringify(pRes));

			var param = pOptions["params"];
			if (param !== undefined&& param !== null&& (param["comparison_gb"] === "CG1" || param["comparison_gb"] === "CG2")) {
				geo.setPolygonDataGeojson2(pRes);
			} else if (param !== undefined && param !== null&& param["comparison_gb"] === "GRID") {
				geo.setGridDataGeojson(pRes);
			} else {
				geo.setPolygonDataGeojson(pRes);
			}

			// console.error("시계열 번호 >>> " + $urbanMain.ui.timeSeriesIdx + "지도
			// 그리기 완료");

			// 기선택(초기 화면설정) 처리
			$urbanMain.ui.doInitView("map_complete");

			if ($urbanMain.ui.isTimeSeriesPlay) {
				if (!$urbanMain.ui.isTimeSeriesStop) {
					// 시계열 바
					$urbanMain.ui.setTimeSeriesBar();

					// 현재 이미지 캡처
					$urbanMain.ui.doCapture("#mapRgn_1", function(data) {
						var playIdx = $urbanMain.ui.timeSeriesIdx;
						$urbanMain.ui.timeSeriesCaptureList[playIdx] = data;

						// console.error("시계열 번호 >>> " + playIdx + "지도 캡처");

						var loopCnt = $urbanMain.ui.timeSeriesYearList.length;
						if ((playIdx + 1) < loopCnt) {
							$urbanMain.ui.timeSeriesTimerId = setTimeout(
									function() {
										$urbanMain.ui.timeSeriesIdx++;
										$urbanMain.ui.playTimeSeries();
									}, 1200);
						} else {
							$urbanMain.ui.isTimeSeriesPlay = false;
							$urbanMain.ui.isTimeSeriesStop = false;
							$urbanMain.ui.timeSeriesIdx = 0;

							$('.time-graph-conbox .control')
									.removeClass('stop');
							$urbanMain.ui.setMapEvent(true);
						}

					});
				}
			}
		},

		setDisplayPop : function(pGb, pClear, pMode) {
			if (pGb == "comparison") {
				var $bowl = $('#comparison .rank-list');
				if (pClear) {
					$bowl.empty();
				}
				if (pMode == "load") {
					$bowl.html('<li><p class="info">조회중 ...</p></li>');
				} else if (pMode == "noData") {
					$bowl.html('<li><p class="info">검색결과가 존재하지 않습니다.</p></li>');
				} else if (pMode == "noSel") {
					$bowl.html('<li><p class="info">검색지역을 선택해 주세요.</p></li>');
				}
			} else if (pGb == "") {

			}
		},

		makeShareUrl : function() {
			var baseUrl = window.location.protocol + "//"
					+ window.location.host + "/view/urban/main";
			var qs = "?";
			var qs_menu = "";
			var qs_class = "";
			var qs_type = "";
			var qs_year = "";
			var qs_area = "";
			var qs_dstrct ="";  //추가
			var qs_ksic ="";    //추가
			var isValid = true;

			// 대메뉴
			var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
			var $bowl = $('#' + selMenuId);
			// SGIS5 변경
			if (selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4") {
				if (selMenuId === "gnb_menu_1") {
					qs_menu = "u_menu=A";
				} else if (selMenuId === "gnb_menu_3") {
					qs_menu = "u_menu=C";
				} else if (selMenuId === "gnb_menu_4") { // 생활시설 분포 메뉴 추가
					// 22.08.09
					qs_menu = "u_menu=D";
				}
			} else if (selMenuId === "gnb_menu_2") {
				qs_menu = "u_menu=B";
			}

			// 분류
			if (qs_menu !== "") {
				qs = qs + qs_menu;
				var $selClsTy = $bowl.find('ul li a.active');
				var clsTy;
				if ($selClsTy.length === 1) {
					clsTy = $selClsTy.attr('data-cls-type');
					if (clsTy === $urbanObj.urbanCls_UN) {
						qs_class = "u_class=UN";
					} else if (clsTy === $urbanObj.urbanCls_SGIS) {
						qs_class = "u_class=SGIS";
					}
				}

				if (qs_class !== "") {
					qs = qs + "&" + qs_class;

					if (selMenuId === "gnb_menu_1"|| selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4") {
						// 도시/준도시
						if (clsTy === $urbanObj.urbanCls_UN) {
							if ($('#urban_ty_box_1 > li.active').length === 1) {
								qs_type = "u_type="+ $("#urban_ty_box_1 > li.active").attr("data-urbar-type");
								qs = qs + "&" + qs_type;
							} else {
								isValid = false;
							}
						}

						// 년도
						var baseYear = $urbanLeftMenu.ui.getSelectedYear();
						if (baseYear !== "") {
							qs_year = "u_year=" + baseYear;
							qs = qs + "&" + qs_year;
						} else {
							isValid = false;
						}
					}
				} else {
					isValid = false;
				}
			} else {
				isValid = false;
			}
			// if (isValid) {
			// 	if (selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3") {
			// 		if ($('#menu_group_box .menu-list > a.active').length === 1) {
			// 			qs_area = "u_area="+ $("#menu_group_box .menu-list > a.active").attr("data-urban-id");
			// 			qs = qs + "&" + qs_area;
			// 		}
			// 	}
			// 	baseUrl = baseUrl + qs;
			// }

			//SGIS5 추가			
			if (isValid) {
				if (selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4") {
					if ($('.menu-group2 .menu-list2 > a.active').length === 1) {
						qs_area = "u_area="+ $(".menu-group2 .menu-list2 > a.active").attr("data-urban-id");
						qs = qs + "&" + qs_area;
						qs_dstrct ="u_dstrct="+ $('.menu-group.active').attr('data-dstrct-cd');
						qs = qs + "&" + qs_dstrct;
						if(selMenuId === "gnb_menu_4"){
							qs_ksic = "u_ksic="+ $(".facility li.active .iconbox").attr("data-ksic_5_cd");
							console.log(qs_ksic)
							qs = qs + "&" + qs_ksic;
						}
					}
				}

				baseUrl = baseUrl + qs;
			}
				//SGIS5 추가 끝
			return baseUrl;
		},

		informationPopOpen : function() {
			if ($("#notice_mini_pop").css("display") == "none") {
				$("#notice_mini_pop").show();
			} else {
				$("#notice_mini_pop").hide();
			}
		},

		informationPopClose : function() {
			$("#notice_mini_pop").hide();
		},

		comma : function(str) {
			str = String(str);
			return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		},

		/**
		 *
		 * @name : reqSetParams
		 * @description : 오픈api 파라미터를 설정한다.
		 *
		 */
		reqSetParams : function(api_id, param) {
			// 변경 no, 추가 ok
			var params = {
				api_id : api_id,
				async : param.async,
				bnd_year : ((param.bnd_year !== undefined && param.bnd_year !== null) ? param.bnd_year
						: bndYear), // common.js의 bndYear 쓰는걸로
				base_year : param.base_year,
				work_gb : param.work_gb,
				map_id : param.map_id,
				class_deg : param.class_deg,
				identifier : param.identifier,
				dstrct_lclas_cd : param.dstrct_lclas_cd,
				comparison_gb : param.comparison_gb,

				// 도시지역 관련
				urbarInfo : {
					urban_cls_gb : param.urban_cls_gb,
					urban_type : param.urban_type, // center: 01, cluster: 02
					urban_id : param.urban_id,
					urban_nm : param.urban_nm,
					urban_sido_cd : param.urban_sido_cd,
					urban_sgg_cd : param.urban_sgg_cd,
					urban_sido_list : param.urban_sido_list,
					comparison_urban_id : param.comparison_urban_id,
					comparison_urban_nm : param.comparison_urban_nm,
					main_urban_id : param.main_urban_id,
					comparison_main_urban_id : param.comparison_main_urban_id,
					ksic_5_cd : param.ksic_5_cd,  // 생활시설분포 param 추가
					adm_cd :param.adm_cd		  // 행정코드 추가
				},
				// 코드 조회용
				codeInfo : {
					process_gb : param.processGb, // sel:선택박스 처리
					elem_id : param.elemId,
					b_class_cd : param.bClassCd,
					s_class_cd : param.sClassCd,
					cd_exp : param.cdExp
				},
				//
				address : {
					sido_cd : param.sido_cd,
					sel_sido_cd : param.sel_sido_cd,
					sel_sgg_cd : param.sel_sgg_cd
				}
			};

			return params;
		},

		/**
		 *
		 * @name : requestOpenApi
		 * @description : 오픈api 서비스를 호출한다.
		 *
		 */
		requestOpenApi : function(options) {
			console.log("[urbanMain.js] requestOpenApi() 호출");
			var api_id = typeof options === 'string' ? options : options.api_id;

			console.log("[urbanMain.js] requestOpenApi() api_id [" + api_id);

			if (api_id == "API_202171")
				$urbanApi.request.getCommonInfo(options);
			else if (api_id == "API_202172")
				$urbanApi.request.getUrbarsGeometry(options);
			else if (api_id == "API_202173")
				$urbanApi.request.getUrbarsStatistics(options);
			else if (api_id == "API_202175")
				$urbanApi.request.getUrbarsIndexes(options);
			else if (api_id == "API_202176")
				$urbanApi.request.getAddress(options);
			else if (api_id == "API_220801")
				$urbanApi.request.getUrbarsFacility(options);		// 생활시설분포 추가
			else if (api_id == "API_220830")
				$urbanApi.request.getUrbarsFacilitySearch(options);		//생활시설 분포 추가

			pageCallReg(); // 페이지 호출통계
		},

		// SGIS4_도시화 sns_공유 시작
		copyToClipboard : function(text) {
			if (window.clipboardData) {
				// IE처리
				// 클립보드에 문자열 복사
				window.clipboardData.setData('text', text);

				// 클립보드의 내용 가져오기
				// window.clipboardData.getData('Text');

				// 클립보드의 내용 지우기
				// window.clipboardData.clearData("Text");

			} else {
				// 비IE 처리
				window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
			}
		},
		// SGIS4_도시화 sns_공유 끝

		/**
		 *
		 * @name : setTimeSeriesYearUi
		 * @description : 시계열 변화 UI 구성
		 *
		 */
		setTimeSeriesYearUi : function(years) {
			/*
			 * var years = []; if($urbanObj.urbanCls_UN == clsType){ years =
			 * deepCopy($urbanMain.ui.statsBaseYear03).reverse(); }else{ years =
			 * deepCopy($urbanMain.ui.statsBaseYear02).reverse(); }
			 */
			// var $bow01 = $('.time-graph-legend');
			var $bow02 = $('.time-graph').find('ul');
			// var htmlString01 = '<ul>';
			var htmlString02 = '';
			// $.each(years, function(index, item){
			// htmlString01 += '<li data-year="' + item + '">' + item + '</li>';
			// });
			//
			// htmlString01 += '</ul>';
			//
			// $bow01.html(htmlString01);

			for (i = 0; i < (years.length); i++) {
				htmlString02 += '<li><p data-year="' + years[i] + '"><span>'
						+ years[i] + '</span></p></li>'
			}

			$bow02.html(htmlString02);

			// 시계열 바 구성 css
			$(".time-graph-pop .time-graph-wrap .bar").css("width", "0px");
			$(".time-graph-pop .time-graph-wrap .time-graph ul > li:not(:last-child)").css("width","calc((100% - 16px) / " + (years.length - 1) + ")");
			$('.time-graph li:eq(0)').find('p').addClass('active'); //추가
			
			// $(".time-graph-pop .time-graph-wrap .bar").css("width","calc((100% / "+(years.length-1)+") * 0)");
			// $(".time-graph-pop .time-graph-wrap .time-graph ul > li").css("width","calc((100% / "+(years.length-1)+ ") -(0.2%))");
			// $(".time-graph-pop .time-graph-wrap .time-graph ul > li:last").css("width","calc((100% / "+(years.length-1)+ ") +("+(years.length-2)*0.2 +"%))");
			// $(".time-graph-pop .time-graph-wrap .time-graph-legend ul > li:not(:first-child,:last-child)").css("width", "calc((100% /"+(years.length-1)+") - (0.1%))");
			// $(".time-graph-pop .time-graph-wrap .time-graph-legend ul > li").css("width","calc((100% / "+(years.length-1)+" +15px)");
			/*
			 * var ticksList = []; 
			 *	$.each(years, function(index, item){
			 * ticksList.push(index+1);
			 *  });
			 *  var slider = new Slider("#history_slder",
			 *  { min: 1, max: years.length, step: 1,
			 * value: 1, ticks: ticksList, ticks_labels: years, });
			 */

			// 범례 show
			// var clsTy = $('#gnb_menu_2').find('ul li
			// a.active').attr('data-cls-type');
			// if(clsTy == $urbanObj.urbanCls_UN){
			// $(".time-legend").show();
			// }
		},

		/**
		 * @name : playTimeSeries
		 * @description : 시계열 시작버튼 클릭시 이벤트
		 */
		playTimeSeries : function() {
			var playIdx = $urbanMain.ui.timeSeriesIdx;
			if (playIdx === 0) {
				$urbanMain.ui.isTimeSeriesPlay = true;

				var clsTy = $('#gnb_menu_2').find('ul li a.active').attr(
						'data-cls-type');
				$urbanMain.ui.timeSeriesClsTy = clsTy;

				if ($("#reverseBtn").hasClass('active')) {
					$urbanMain.ui.timeSeriesYearList = $urbanMain.ui
							.getStatYearList(clsTy, true);
				} else {
					$urbanMain.ui.timeSeriesYearList = $urbanMain.ui
							.getStatYearList(clsTy, false);
				}

				$urbanMain.ui.timeSeriesCaptureList = [];
			}

			var loopCnt = $urbanMain.ui.timeSeriesYearList.length;
			if (playIdx < loopCnt) {
				var playYear = $urbanMain.ui.timeSeriesYearList[playIdx];

				var paramObj = {};
				paramObj.urban_cls_gb = $urbanMain.ui.timeSeriesClsTy;
				paramObj.base_year = playYear;
				paramObj.map_id = 0;
				// paramObj.async = false;

				// console.error("시계열 번호 >>> " + $urbanMain.ui.timeSeriesIdx +
				// "지도 호출");
				$urbanMain.ui.reqUrbarsGeometry(paramObj);
			} else {
				// $urbanMain.ui.isTimeSeriesPlay = false;
				// $urbanMain.ui.isTimeSeriesStop = false;
				// $urbanMain.ui.timeSeriesIdx = 0;
				// $urbanMain.ui.timeSeriesClsTy = "";
				// $urbanMain.ui.timeSeriesYearList = [];
			}
		},

		/**
		 * @name : doCapture
		 * @description : 이미지를 캡쳐한다.
		 */
		doCapture : function(targetId, callback) {
	html2canvas($(targetId)[0], {
		    		scale:2,
					logging: false,
					useCORS: false,
					proxy: contextPath+"/ServiceAPI/community/html2canvasproxy.jsonp",
				}).then(function(canvas) {
					if (callback != undefined && callback != null && callback instanceof Function) {
						//var data = canvas.toDataURL();
						var data = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
						callback.call(undefined, data);
					}else{
						var a = document.createElement('a');
	    				a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	    				a.download = "report.png";
	    				a.click();
					}
		    	});
		    },
		// functionTest : function(){
		// 	var options;
		// 	var remainCnt =1;
        // 	var param = {};
		// 	let sido = $('#sidoSelect_mapNavi_1 option:selected').val().split('/');
		// 	let sgg = $('#sggSelect_mapNavi_1 option:selected').val().split('/');
		// 	let emdong_cd = $('#admSelect_mapNavi_1 option:selected').val().split('/');
		// 	let adm_cd = sido[0]+sgg[0]+emdong_cd[0];
		// 	param.urban_id   = $('.facility li.active .iconbox').attr('data-urbar-id');
		// 	param.urban_type = $('.facility li.active .iconbox').attr('data-urbar-type');
		// 	param.ksic_5_cd  = $('.facility li.active .iconbox').attr('data-ksic_5_cd');
		// 	param.adm_cd = adm_cd;
		// 	param.work_gb = "urbar";
		// 	options = $urbanMain.ui.reqSetParams("API_220830", param);

		// 	$urbanMain.ui.requestOpenApi(options);
		// },

		/**
		 * @name : doTimeSeriesCapture
		 * @description : 시계열 이미지를 다운로드 한다.
		 */
		doTimeSeriesCapture : function(canvas) {
			$.each(canvas, function(index, item) {
				var playYear = $urbanMain.ui.timeSeriesYearList[index];
				var clsTy = $urbanMain.ui.timeSeriesClsTy;
				var imgSubNm = "";
				if (clsTy == $urbanObj.urbanCls_UN) {
					imgSubNm = "_UN";
				} else if (clsTy == $urbanObj.urbanCls_SGIS) {
					imgSubNm = "_SGIS";
				}

				var a = document.createElement('a');
				a.href = item;
				a.download = playYear + imgSubNm + ".png";
				a.click();
			});
		},

		/**
		 * @name : resetUrbanTimeSeries
		 * @description : 시계열 관련 정보를 초기화한다.
		 * 
		 */
		resetUrbanTimeSeries : function() {
			clearTimeout($urbanMain.ui.timeSeriesTimerId);

			$urbanMain.ui.isTimeSeriesPlay = false;
			$urbanMain.ui.isTimeSeriesStop = false;
			$urbanMain.ui.timeSeriesIdx = 0;
			$urbanMain.ui.timeSeriesClsTy = "";
			$urbanMain.ui.timeSeriesYearList = [];
			$urbanMain.ui.timeSeriesCaptureList = [];

			$urbanMain.ui.setMapEvent(true);
			$(".time-legend").hide();
			$('.time-graph-conbox .time-graph ul > li > p').removeClass(
					'active');
		},
		/**
		 * @name : creatSimpleSearchMarker
		 * @description : poi 마커를 생성한다.
		 * @history : 22.08
		 */
		creatSimpleSearchMarker : function(pRes) {
			var list = pRes.result.list;
			var map = $urbanMain.ui.getMap(0);
			var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();

			$.each(list, function(index, item) {
				if(item.corp_nm){
					var marker = sop.marker([ item.x_coor, item.y_coor ]);
					map.markers.addLayer(marker);
					marker.on('click',function(e) {
						marker.addTo(map.gMap).bindInfoWindow(item.corp_nm);
					})
				}else{
					var icon = new sop.DivIcon({ html: '<div class="marker_cluster"><span>'+item.cnt+'</span></div>', iconAnchor:new sop.Point(6,6)});
					var marker = sop.marker([ item.x_coor, item.y_coor ],{icon:icon});
					marker.addTo(map.gMap)
//					map.gMap.zoomIn();
//					map.gMap.on('zoomend',function(){
//						if(map.gMap.getZoom() === 3){
//							marker.remove();
//						}
//						if(map.gMap.getZoom() ===6 ){
//							messageConfirm.open(
//					    			 "알림",
//					    			 "해당 레벨부터는 사업체 POI정보를 볼 수 없습니다.<br>" +
//					    			 "유지하기 버튼을 누르면 집계구레벨로 이동할 시 다시 POI를 볼 수 있습니다.",
//					    			 btns = [
//										{
//										    title : "그만보기",
//										    fAgm : null,
//										    disable : false,
//										    func : function(opt) {
//										    	console.log(marker.remove());
//										    	marker.remove();
//										    }
//										 },
//
//					    			     {
//										   title : "유지하기",
//										   fAgm : null,
//										   disable : false,
//										   func : function(opt) {}
//					    			     }
//					    			 ]
//					    	);
//						}
//					})
					if($('.facility li.active')){
						$('.iconbox').on('click',function(){
							marker.remove();
						})
					}
					$('.menu-list2').on('click',function(){
						marker.remove();
					})
					$('#gnb_menu_1').on('click',function(){
						marker.remove();
					})
					$('#gnb_menu_2').on('click',function(){
						marker.remove();
					})
					$('#gnb_menu_3').on('click',function(){
						marker.remove();
					})
					$('.tit').on('click',function(){
						marker.remove();
					})

				}
			})

		},

		setTimeSeriesBar : function() {
			var playIdx = $urbanMain.ui.timeSeriesIdx;
			var loopCnt = $urbanMain.ui.timeSeriesYearList.length;

			if (playIdx === 0) {
				$(".time-graph-pop .time-graph-wrap .bar").css("width", "16px");
			} else if ((playIdx + 1) < loopCnt) {
				$(".time-graph-pop .time-graph-wrap .bar").css(
						"width",
						"calc(((100% - 16px) / " + (loopCnt - 1) + ") * "
								+ playIdx + " + 16px)");
			} else {
				$(".time-graph-pop .time-graph-wrap .bar").css("width",
						"calc(100%)");

				// $('.time-graph-conbox .control').toggleClass('stop');
				// $urbanMain.ui.setMapEvent(true);
			}

			/*
			 * var cnt = $urbanMain.ui.timeSeriesIdx; var clsTy =
			 * $urbanMain.ui.timeSeriesClsTy; var baseYearLen = 0;
			 * if($urbanObj.urbanCls_UN == clsTy){ baseYearLen =
			 * $urbanMain.ui.statsBaseYear03.length; }else{ baseYearLen =
			 * $urbanMain.ui.statsBaseYear02.length; }
			 *
			 * if(baseYearLen-1 == cnt){ $(".time-graph-pop .time-graph-wrap
			 * .bar").css("width", "calc(100%)");
			 *
			 * $('.time-graph-conbox .control').toggleClass('stop');
			 * $urbanMain.ui.setMapEvent(true); }else if(cnt === 0){
			 * $(".time-graph-pop .time-graph-wrap .bar").css("width", "16px");
			 * }else{ $(".time-graph-pop .time-graph-wrap .bar").css("width",
			 * "calc(((100% - 16px) / "+(baseYearLen-1)+") * "+cnt+" + 16px)"); }
			 */
			// if(baseYearLen-1 == cnt){
			// $(".time-graph-pop .time-graph-wrap .bar").css("width",
			// "calc((100% / "+(baseYearLen-1)+") * "+cnt+")");
			//
			// $('.time-graph-conbox .control').toggleClass('stop');
			// $urbanMain.ui.setMapEvent(true);
			// }else{
			// $(".time-graph-pop .time-graph-wrap .bar").css("width",
			// "calc((100% / "+(baseYearLen-1)+") * "+cnt+" + 15px)");
			// }
		},

		setMapEvent : function(flag) {
			var map = $urbanMain.ui.getMap(0);
			if (flag) {
				map.gMap.dragging.enable();
				map.gMap.touchZoom.enable();
				map.gMap.doubleClickZoom.enable();
				map.gMap.scrollWheelZoom.enable();

				// 네비 셀렉트박스 활성화
				$("#sidoSelect_mapNavi_1").prop('disabled', false);
				$("#sggSelect_mapNavi_1").prop('disabled', false);
				$("#admSelect_mapNavi_1").prop('disabled', false);
				// 줌버튼 활성화
				$('.control-foot').show();
				// 년도정렬 변경버튼 활성화
				$("#reverseBtn").prop('disabled', false);
			} else {
				map.gMap.dragging.disable();
				map.gMap.touchZoom.disable();
				map.gMap.doubleClickZoom.disable();
				map.gMap.scrollWheelZoom.disable();

				// 네비 셀렉트박스 비활성화
				$("#sidoSelect_mapNavi_1").prop('disabled', true);
				$("#sggSelect_mapNavi_1").prop('disabled', true);
				$("#admSelect_mapNavi_1").prop('disabled', true);
				// 줌버튼 비활성화
				$('.control-foot').hide();
				// 년도정렬 변경버튼 비활성화
				$("#reverseBtn").prop('disabled', true);
			}
		},

		getStatYearList : function(clsTy, reverseYn) {
			var statYear = [];

			if ($urbanObj.urbanCls_UN == clsTy) {
				if (reverseYn) {
					// 내림차순
					statYear = $urbanMain.ui.statsBaseYear03;
				} else {
					// 오름차순
					statYear = deepCopy($urbanMain.ui.statsBaseYear03).reverse();
				}
			} else {
				if (reverseYn) {
					// 내림차순
					statYear = $urbanMain.ui.statsBaseYear02;
				} else {
					// 오름차순
					statYear = deepCopy($urbanMain.ui.statsBaseYear02).reverse();
				}
			}
			
			return statYear;
		}
	};

	// ==============================//
	// map event callback
	// 이 콜백 함수들은 두 개의 지도 모두에 해당하는 콜백 함수이다. 함수에 대한 정의를 할 때는 신중하게 해야한다.
	// ==============================//
	$urbanMain.callbackFunc = {
		// 맵이동 시작시, 콜백 호출
		didMapMoveStart : function(event, map) {
		},

		// 맵이동 종료시, 콜백 호출
		didMapMoveEnd : function(event, map) {
		},

		// 맵 줌시작 시, 콜백 호출
		didMapZoomStart : function(event, map) {
		},

		// 맵 줌 종료 시, 콜백 호출
		didMapZoomEnd : function(event, map) {
		},

		// 드랍종료 시, 콜백 호출
		didMapDropEnd : function(event, source, layer, data, map) {
		},

		// 더블클릭 시, 콜백 호출
		didMapDoubleClick : function(btn_id, tmpParam) {
		},

		/**
		 *
		 * @name : didMouseClickPolygon
		 * @description : 해당경계 mouse click 시, 발생하는 콜백함수
		 *
		 */
		didMouseClickPolygon : function(event, data, type, map) {
		},

		/**
		 *
		 * @name : didMouseOverPolygon
		 * @description : 해당경계 mouse over 시, 발생하는 콜백함수
		 *
		 */
		didMouseOverPolygon : function(event, data, type, map) {
		},

		/**
		 *
		 * @name : didMouseOutPolygo
		 * @description : 해당경계 mouse out 시, 발생하는 콜백함수
		 *
		 */
		didMouseOutPolygon : function(event, data, type, map) {
		},

		/**
		 *
		 * @name : didSelectedPolygon
		 * @description : 해당경계 선택 시, 발생하는 콜백함수
		 *
		 */
		// didSelectedPolygon : function(event, data, type, map) {
		// 	var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
		// 	if (selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4") { // 도시화 통계 or 도시화 지표분석 or 생활시설분포
		// 		// if($(".menu-content-1").is(':visible')){ //화면 열려있을때만
		// 		// }
		// 		// $urbanLeftMenu.ui.closeDistrictCombo();
		// 		var dataObj = data.properties;
		// 		if (dataObj !== undefined && dataObj !== null) {
		// 			var urbanCls = dataObj["urban_cls_gb"];
		// 			var urbanType = dataObj["type"];
		// 			var curUrbanType = $('#urban_ty_box_1 > li.active').attr("data-urbar-type");
		// 			if ((urbanCls == $urbanObj.urbanCls_UN) && (urbanType !== undefined && urbanType !== null) && (urbanType != curUrbanType)) {
		// 				var param = {};
		// 				param.countdown = 1;
		// 				param.u_area = dataObj["urban_id"];
		// 				param.isMapMove = "N";

		// 				var newIdentifier = $urbanObj.setInitMap(param);
		// 				$urbanObj.setCurIdentifier(newIdentifier);

		// 				$("#urban_ty_box_1 > li").removeClass("active");
		// 				if (urbanType == "01") {
		// 					$("#urban_ty_box_1 > li:nth-child(1)").trigger("click");
		// 				} else if (urbanType == "02") {
		// 					$("#urban_ty_box_1 > li:nth-child(2)").trigger("click");
		// 				}
					
		// 			} else {
		// 				var $bowl = $('#menu_group_box');
		// 				var $bowl2 = $('#sub_group_box');	 // 2022 SGIS5 추가
		// 				var $targetItm;

		// 				var baseYear = dataObj["base_year"];
		// 				var dt = dataObj["data-dstrct-cd"];
		// 				var urbanId = dataObj["urban_id"];
		// 				if (urbanCls == $urbanObj.urbanCls_UN) {
		// 					// $targetItm = $bowl.find(".menu-list > a[data-urban-year=" + baseYear + "][data-urban-id=" + urbanId + "][data-urban-type=" + urbanType + "]");
		// 					$targetItm = $bowl2.find(".menu-list2 > a[data-urban-year="+ baseYear + "][data-urban-id="+ urbanId + "][data-urban-type="+ urbanType + "]"); // 2022 SGIS5 변경
		// 				} else if (urbanCls == $urbanObj.urbanCls_SGIS) {
		// 					var sidoCd = dataObj["sido_cd"];
		// 					var sggCd = dataObj["sgg_cd"];

		// 					// $targetItm = $bowl.find(".menu-list > a[data-urban-year=" + baseYear + "][data-urban-id=" + urbanId + "][data-urban-sido=" + sidoCd +"][data-urban-sgg=" + sggCd + "]");
		// 					$targetItm = $bowl2.find(".menu-list2 > a[data-urban-year="+ baseYear + "][data-urban-id="+ urbanId + "][data-urban-sido="+ sidoCd + "][data-urban-sgg="+ sggCd + "]"); // 2022 SGIS5 변경
		// 				}
		// 				if ($targetItm !== undefined && $targetItm !== null&& $targetItm.length > 0) {
		// 					var $bowl = $('.menu-group2');
		// 					var $actives = $bowl.siblings('.menu-group2.active');
		// 					var dstrct = $($targetItm).closest(".menu-group2").attr('data-dstrct-cd');
		// 					$('#menu_group_box .menu-group[data-dstrct-cd="'+ dstrct + '"]').removeClass('active');
		// 					$('#menu_group_box .menu-group[data-dstrct-cd="'+ dstrct + '"]').find(".menu-toggle").trigger('click');
		// 					$('.menu-group2 .m').addClass('active');
		// 					$bowl2.find(".menu-list2 > a").removeClass("active");
		// 					// $($targetItm).addClass("active");
		// 					// var $menuList =$($targetItm).closest(".menu-list");
		// 					var $menuList = $($targetItm).closest(".menu-list2"); // 변경
		// 					var $menuItms = $menuList.find('a');
		// 					var topPos2 = 0;
		// 					$.each($menuItms, function(index, item) {
		// 						if (item == $targetItm[0]) {
		// 							return false;
		// 						}
		// 						topPos2 = topPos2 + $(item).outerHeight(true);
		// 					});

		// 					// var tHgt = $($targetItm).outerHeight(true);
		// 					// var tIdx = $($targetItm).index();
		// 					// var topPos = tHgt * tIdx;
		// 					// var abc = $($targetItm).position().top;

		// 					$menuList.scrollTop(topPos2);

		// 					$($targetItm).trigger('click', {"isMapMove" : "N"});
							
		// 				}
		// 			}
		// 		}
		// 	} else if (selMenuId === "gnb_menu_2") { // 시계열 변화
				
		// 		// 2022 SGIS5 추가
		// 		var cnt = $urbanLeftMenu.ui.getCheckedYear().length;
		// 		var xCoor = event.utmk.x;
		// 		var yCoor = event.utmk.y;
		// 		for (var i = 1; i < cnt; i++) {
		// 			var map1 = $urbanMain.ui.getMap(1);
		// 			map[i + 1] = $urbanMain.ui.getMap((i + 1));
		// 			map1.mapMove([ xCoor, yCoor ], 5)
		// 			map[i + 1].gMap.setView(sop.utmk(xCoor, yCoor), map1.gMap.getZoom());
		// 		}
		// 		// 2022 SGIS5 추가 끝

		// 	}
		// },
		// 2022 SGIS5 추가
		didSelectedPolygon : function(event, data, type, map) {
			var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
			if (selMenuId === "gnb_menu_1" || selMenuId === "gnb_menu_3" || selMenuId === "gnb_menu_4") { // 도시화 통계 or 도시화 지표분석 or 생활시설분포
				// if($(".menu-content-1").is(':visible')){ //화면 열려있을때만
				// }
				// $urbanLeftMenu.ui.closeDistrictCombo();
				var dataObj = data.properties;
				if (dataObj !== undefined && dataObj !== null) {
					var urbanCls = dataObj["urban_cls_gb"];
					var urbanType = dataObj["type"];
					var curUrbanType = $('#urban_ty_box_1 > li.active').attr("data-urbar-type");			
					var param = {};
					param.countdown = 1;
					param.u_area = dataObj["urban_id"];
					param.isMapMove = "N";
					var newIdentifier = $urbanObj.setInitMap(param);
					$urbanObj.setCurIdentifier(newIdentifier);
					$("#urban_ty_box_1 > li").removeClass("active");
					if (urbanType == "01") {
						$("#urban_ty_box_1 > li:nth-child(1)").trigger("click");
					} else if (urbanType == "02") {
						$("#urban_ty_box_1 > li:nth-child(2)").trigger("click");
					}
					var $bowl = $('#menu_group_box');
					var $bowl2 = $('#sub_group_box');	 // 2022 SGIS5 추가
					var $targetItm;
					var baseYear = dataObj["base_year"];
					var dt = dataObj["data-dstrct-cd"];
					var urbanId = dataObj["urban_id"];
					$targetItm = $bowl2.find(".menu-list2 > a[data-urban-year="+ baseYear + "][data-urban-id="+ urbanId + "][data-urban-type="+ urbanType + "]"); 
					var $bowl = $('.menu-group2');
					var $actives = $bowl.siblings('.menu-group2.active');
					var dstrct = $($targetItm).closest(".menu-group2").attr('data-dstrct-cd');
					$('#menu_group_box .menu-group[data-dstrct-cd="'+ dstrct + '"]').removeClass('active');
					$('#menu_group_box .menu-group[data-dstrct-cd="'+ dstrct + '"]').find(".menu-toggle").trigger('click');
					$('.menu-group2 .menu-list2').addClass('active');
					$bowl2.find(".menu-list2 > a").removeClass("active");
					var $menuList = $($targetItm).closest(".menu-list2"); // 변경
					var $menuItms = $menuList.find('a');
					var topPos2 = 0;
					$.each($menuItms, function(index, item) {
						if (item == $targetItm[0]) {
							return false;
						}
						topPos2 = topPos2 + $(item).outerHeight(true);
					});
					$menuList.scrollTop(topPos2);
					$($targetItm).trigger('click', {"isMapMove" : "N"});
				}
			} else if (selMenuId === "gnb_menu_2") { // 시계열 변화
				
				var cnt = $urbanLeftMenu.ui.getCheckedYear().length;
				var xCoor = event.utmk.x;
				var yCoor = event.utmk.y;
				for (var i = 1; i < cnt; i++) {
					var map1 = $urbanMain.ui.getMap(1);
					map[i + 1] = $urbanMain.ui.getMap((i + 1));
					map1.mapMove([ xCoor, yCoor ], 5)
					map[i + 1].gMap.setView(sop.utmk(xCoor, yCoor), map1.gMap.getZoom());
				}
			}
		},// 2022 SGIS5 추가 끝

		/**
		 *
		 * @name : didDrawCreate
		 * @description : 사용자지정 draw 이벤트콜백
		 *
		 */
		didDrawCreate : function(event, type, map) {
		},

		/**
		 *
		 * @name : didFinishedMultidata
		 * @description : 사용자경계(multi layer data) 조회 후, 콜백
		 *
		 */
		didFinishedMultidata : function(dataList, admCdList, map) {
		},

		// 맵 클릭 시, 콜백 호출
		didMapClick : function(event, map) {
		}
	};

	$urbanMain.event = {

		/**
		 *
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 *
		 */
		setUIEvent : function() {
			var body = $("body");

			Highcharts.setOptions({
				lang : {
					thousandsSep : ','
				}
			});

			body.on("click", ".goSGIS", function() {
				location.href = '/view/index?param=0';
			});

			// 데이터보드 열기 버튼 선택
			body.on('click', '.btn-extend-open', function() {
				if ("-----" !== $("#db01_head_year").html()) {
					$('#wrap').addClass('_extend');
				}
			});

			// 데이터보드 닫기 버튼 선택
			body.on('click', '.btn-extend-close', function() {
				$('#wrap').removeClass('_extend');
			});

			// 지표순위 검색 popup 닫기 버튼 선택
			body.on('click', '.cst-popup .menu-close', function() {

				$('.cst-popup').hide();

				return false;
			});

			// 년도 슬라이더 시작 버튼 선택
			body.on('click','.time-graph-conbox .control',function() {
				if (!$(this).hasClass('stop')) {
					srvLogWrite('R0', '02', '02', '01','슬라이더 재생', ''); // 2022.02.15 log 생성
					$urbanMain.ui.isTimeSeriesStop = false;
					// 지도 이동 비활성화
					$urbanMain.ui.setMapEvent(false);
					$(this).addClass('stop');
					$('.time-graph-conbox .time-graph ul > li > p').removeClass('active');
					$urbanMain.ui.playTimeSeries();
				} else {
					$urbanMain.ui.isTimeSeriesStop = true;
					if ($urbanMain.ui.timeSeriesTimerId !== "") {
						clearTimeout($urbanMain.ui.timeSeriesTimerId);
						var loopCnt = $urbanMain.ui.timeSeriesYearList.length;
						var imgCnt = $urbanMain.ui.timeSeriesCaptureList.length;
						var playIdx = $urbanMain.ui.timeSeriesIdx;
						if ((imgCnt < loopCnt)
								&& playIdx < imgCnt) {
							$urbanMain.ui.timeSeriesIdx = imgCnt;
						}
					}

					// 지도 이동 활성화
					$urbanMain.ui.setMapEvent(true);
					$(this).removeClass("stop");
				}
			});

			// 시계열 다운로드
			body.on('click','.time-graph-conbox .btn-down',function() {
				if (!$urbanMain.ui.isTimeSeriesPlay) {
					var imgCnt = $urbanMain.ui.timeSeriesCaptureList.length;
					var loopCnt = $urbanMain.ui.timeSeriesYearList.length;
					if (imgCnt > 0) {
						if (loopCnt === imgCnt) {
							srvLogWrite('R0', '02', '02', '04','', ''); // 2022.02.15
							// log 생성
							$urbanMain.ui.doTimeSeriesCapture($urbanMain.ui.timeSeriesCaptureList);
						} else {
							caMessageAlert.open("알림","최종 년도까지 시계열 조회 후 다운로드가 가능합니다.");
						}
					} else {
						caMessageAlert.open("알림","시계열 조회 후 다운로드가 가능합니다.");
					}
				}
			});

			body.on('click','.time-graph-conbox .time-graph ul > li > p',function() {
				if ($urbanMain.ui.isTimeSeriesPlay&& !$urbanMain.ui.isTimeSeriesStop) {
					return;
				}

				$('.time-graph-conbox .time-graph ul > li > p').removeClass('active');
				$(this).addClass('active');
				$urbanMain.ui.isTimeSeriesPlay = false;
				$urbanMain.ui.isTimeSeriesStop = false;
				$urbanMain.ui.timeSeriesIdx = 0;
				$urbanMain.ui.timeSeriesClsTy = "";
				$urbanMain.ui.timeSeriesYearList = [];
				$urbanMain.ui.timeSeriesCaptureList = [];

				$(".time-graph-pop .time-graph-wrap .bar").css("width", "0px");
				$('.time-graph-conbox .control').removeClass('stop');
				$urbanMain.ui.setMapEvent(true);

				var selYear = $(this).attr("data-year");
				srvLogWrite('R0', '02', '02', '02', '년도선택: '+ selYear, ''); // 2022.02.15 log 생성
				var paramObj = $urbanLeftMenu.ui.makeParamMap("urbars");
				paramObj.base_year = selYear;
				paramObj.map_id = 0;
				paramObj.async = false;
				$urbanMain.ui.reqUrbarsGeometry(paramObj, true);
			});

			// 비교권역 선택 > 시도 변경
			body.on('change', '#sidoSelect_comparison_1', function() {
				$("#sggSelect_comparison_1").empty();
				$("#sggSelect_comparison_1").html('<option value="" selected>시군구 선택</option>');
				$urbanMain.ui.setDisplayPop("comparison", true, "load");
				if (this.value !== undefined && this.value !== null
						&& this.value !== '') {
					var sidoArray = this.value.split("/");

					// 지도 이동
					var map = $urbanMain.ui.getMap(0);
					map.mapMove([ sidoArray[1], sidoArray[2] ], map.zoom);

					var param = {};
					param.sido_cd = sidoArray[0];

					$urbanMain.ui.reqAddress("sgg", param);

					var apiParam = $urbanLeftMenu.ui.makeParamMap("urbars");
					apiParam.urban_sido_cd = sidoArray[0];
					$urbanMain.ui.reqCommonInfo("urbars_adm", apiParam);
				} else {
					$urbanMain.ui.setDisplayPop("comparison", false, "noSel");
				}
			});

			// 비교권역 선택 > 시군구 변경
			body.on('change', '#sggSelect_comparison_1', function() {
				var sidoVal = $('#sidoSelect_comparison_1').val();
				if (sidoVal === "") {
					$urbanMain.ui.setDisplayPop("comparison", true, "noSel");
					return;
				}

				$urbanMain.ui.setDisplayPop("comparison", true, "load");

				var sidoArray = sidoVal.split("/");
				var apiParam = $urbanLeftMenu.ui.makeParamMap("urbars");
				if (this.value !== undefined && this.value !== null&& this.value !== '') {
					var sggArray = this.value.split("/");

					// 지도 이동
					var map = $urbanMain.ui.getMap(0);
					map.mapMove([ sggArray[1], sggArray[2] ], map.zoom);

					apiParam.urban_sido_cd = sidoArray[0];
					apiParam.urban_sgg_cd = sggArray[0];
					$urbanMain.ui.reqCommonInfo("urbars_adm", apiParam);
				} else {
					apiParam.urban_sido_cd = sidoArray[0];
					$urbanMain.ui.reqCommonInfo("urbars_adm", apiParam);
				}
			});

 			// //비교권역 선택 팝업 > 목록 선택
			// body.on('click', '#comparison .rank-list li a', function(){
			// 	if(!($(this).is('.active') || $(this).is('.noSel'))){
			// 		$('#comparison .rank-list li a').removeClass("active");
			// 		$(this).addClass("active");
			// 	}
			// 	return false;
			// });

			// 비교권역 선택 팝업 > 목록 선택 변경
			body.on('click', '#comparison .rank-list li a', function() {
				var compList = $(this).text();
				if (!($(this).is('.active') || $(this).is('.noSel'))) {
					$('#comparison .rank-list li a').removeClass("active");
					$(this).addClass("active");
					$('.orange-btn2').hide();
				}
				if ($(this).is('.active')) {
					$('.orange-btn2').show();
					$('.orange-btn2').html(compList);
					$('.orange-btn1').on('click', function() {
						var geo = $urbanMain.ui.getGeo(0);
						geo.clearGeo2();
						$urbanMain.ui.doInitDatabord(2)
						$('.orange-btn2').hide();
						$('#comparison .rank-list li a').removeClass('active');
						$('.orange-btn1').off();
						$('.orange-btn1').removeAttr('style');
						$('.orange-btn1').css('padding','8px 10px');
						$('.comp-btn1').hide();
					})
				}

				return false;
			});

			// 순위 선택 팝업 > 목록 선택
			body.on('click', '#densely .rank-list li a', function() {
				if (!($(this).is('.active') || $(this).is('.noSel'))) {
					$('#densely .rank-list li a').removeClass("active");
					$(this).addClass("active");
				}

				return false;
			});
			body.on('click','#district .btn_1',function(){
				$('.popup_con01').css('display','none');
				$('.popup_con02').css('display','block');
				$('.totpopup_layer').addClass('district');

			})

			   //비교권역 선택 팝업 > 선택버튼 선택
			//    body.on('click', '#comparison .btn_1', function(){
			// 	if($urbanMain.ui.writeSrvLogYn == "Y") srvLogWrite('R0', '04', '04', '01', $('#comparison .rank-list li a.active').text(), ''); // 2022.02.15 log 생성
			// 	$urbanMain.ui.writeSrvLogYn = "Y";
			// 	var $selItm = $('#comparison .rank-list li a.active');
			// 	if($selItm.length === 1){
			// 		var prevSelParam = $urbanObj.getStatsParamInfo();		//왼쪽 메뉴에서 고른 도시지역
			// 		if(prevSelParam !== null){
			// 			var curSelparam = $urbanObj.makeSelectedUrbarsInfo($selItm);
			// 			prevSelParam.comparison_urban_id = curSelparam.urban_id;
			// 			prevSelParam.comparison_urban_nm = curSelparam.urban_nm;
			// 			prevSelParam.comparison_main_urban_id = curSelparam.main_urban_id;

			// 			var xCoor = $selItm.attr("data-urban-x");
			// 			var yCoor = $selItm.attr("data-urban-y");
			// 			var map = $urbanMain.ui.getMap(prevSelParam.map_id);
			// 			map.mapMove([xCoor, yCoor], map.zoom);
			// 			$urbanDataBoard.ui.changeDataBoardView("chk05");
			// 			$urbanDataBoard.ui.reqUrbarsIndexes(prevSelParam, "C");

			// 			// 도형
			// 			var paramForGeo = deepCopy(prevSelParam);
			// 			paramForGeo.comparison_gb = "CG2";
			// 			paramForGeo.map_id = 0;
			// 			paramForGeo.async = false;
			// 			$urbanMain.ui.reqUrbarsGeometry(paramForGeo, false);
			// 		}

			// 		$('#comparison .close').trigger("click");
			// 	}else{

			// 		messageAlert.open("알림", "비교권역을 선택해 주세요.");
			// 	}
			// });

			// 비교권역 선택 팝업 > 선택버튼 선택 변경
			body.on('click','#comparison .btn_1',function() {
				if ($urbanMain.ui.writeSrvLogYn == "Y")
					srvLogWrite('R0','04','04','01',$('#comparison .rank-list li a.active').text(), ''); // 2022.02.15
				// log 생성
				$urbanMain.ui.writeSrvLogYn = "Y";

				var $selItm = $('#comparison .rank-list li a.active');
				if ($selItm.length === 1) {
					var prevSelParam = $urbanObj.getStatsParamInfo(); // 왼쪽 메뉴에서
					// 고른 도시지역
					if (prevSelParam !== null) {
						let urbarType =$('#urban_ty_box_1 li.active').attr('data-urbar-type');
						var curSelparam = $urbanObj.makeSelectedUrbarsInfo($selItm);
						prevSelParam.comparison_urban_id = curSelparam.urban_id;
						prevSelParam.comparison_urban_nm = curSelparam.urban_nm;
						prevSelParam.comparison_main_urban_id = curSelparam.main_urban_id;
						var xCoor = $selItm.attr("data-urban-x");
						var yCoor = $selItm.attr("data-urban-y");
						var map = $urbanMain.ui.getMap(prevSelParam.map_id);
						$('.comp-btn1').show();
						$('.comp-btn1').text(curSelparam.urban_nm);
						if(urbarType ==='02'){
							//$('.comp-btn1').css({'background-color':'#FFF180','color':'#000'});
							$('.orange-btn1').css({'background-color':'#FFD050','color':'#000'});
						}else{
							$('.comp-btn1').css({'background-color':'','color':''});
						}
						
						// wkwk 지금
						var icon = sop.icon({ iconUrl: "/images/urban/marker_B.png", iconSize: 25});
						var marker = sop.marker([xCoor,yCoor],{icon:icon})
						marker.addTo(map.gMap)
						map.mapMove([ xCoor, yCoor ], map.zoom);

						$('#db01_head_urbars_nm1').on('click',function(){
							marker.remove();
						})
						$('.menu-list2').on('click',function(){
							marker.remove();
						})
						$('#gnb_menu_1').on('click',function(){
							marker.remove();
						})
						$('#gnb_menu_2').on('click',function(){
							marker.remove();
						})
						$('#gnb_menu_3').on('click',function(){
							marker.remove();
						})
						$('#gnb_menu_4').on('click',function(){
							marker.remove();
						})
						$('#comparison .btn_1').on('click',function(){
							marker.remove();
						})
						$('.sinceNew').on('change',function(){
							marker.remove();
						});

						$('.totIndexes_layer').addClass('comparison');
						$('.extend-data').addClass('comparison');
						$urbanDataBoard.ui.changeDataBoardView("chk05");
						$urbanDataBoard.ui.reqUrbarsIndexes(prevSelParam, "C");

						// 도형
//						var paramForGeo = deepCopy(prevSelParam);
//						paramForGeo.comparison_gb = "CG2";
//						paramForGeo.map_id = 0;
//						paramForGeo.async = false;
//						$urbanMain.ui.reqUrbarsGeometry(paramForGeo, false);

					}
					$('#comparison .close').trigger("click");

				} else {
					messageAlert.open("알림", "비교권역을 선택해 주세요.");
				}

				$('button.slick-prev').trigger('click');
 
			});

			// 2022 SGIS5 추가
			body.on('click', '.district-btn', function() {
				let urbarType = $("#urban_ty_box_1 > li.active").attr("data-urbar-type");
				if(urbarType ==='02'){
					$('#item_box_type').text('UN 도시 분류 (준도시)');
				}else{
					$('#item_box_type').text('UN 도시 분류 (도시)');
				}
				
				$('#district').show();

			});
			// 2022 SGIS5 추가
			body.on('click', '#district li a ', function() {
				if (!($(this).is('.active') || $(this).is('.noSel'))) {
					$(this).removeClass("active");
					$(this).addClass("active");

				}
				if ($(this).is('.active')) {
					$('.green-btn2').on('click', function() {
						$urbanDataBoard.ui.clearDatatable();
						var geo = $urbanMain.ui.getGeo(0);
						geo.clearGeo2();
						$urbanMain.ui.doInitDatabord(1);
						$('#district li a').removeClass('active');
						$('.totpopup_layer').removeClass('district');
						$('.green-btn2').off();

					})
				}

			});

			//   //순위 선택 팝업 > 선택버튼 선택
			//   body.on('click', '#densely .btn_1', function(){
			// 	srvLogWrite('R0', '04', '04', '03', $('#densely .rank-list li a.active').text(), ''); // 2022.02.15 log 생성
			// 	var $selItm = $('#densely .rank-list li a.active');
			// 	if($selItm.length === 1){
			// 		var param = $urbanObj.makeSelectedUrbarsInfo($selItm);
			// 		var lyrKey = $urbanObj.getGeometryKey(param);
			// 		var geo = $urbanMain.ui.getGeo();
			// 		var map = $urbanMain.ui.getMap();

			// 		var targetLyr = geo.getLayer(lyrKey);
			// 		if(targetLyr !== undefined && targetLyr !== null){
			// 			if(targetLyr !== undefined && targetLyr !== null){
			// 				var nxtZoom = map.gMap.getBoundsZoom(targetLyr.getBounds(), false);
			// 				map.gMap.fitBounds(targetLyr.getBounds(), {
			// 					maxZoom : nxtZoom - 1
			// 				});
			// 			}
			// 			targetLyr.fire("click");
			// 		}
			// 		$('#densely .close').trigger("click");
			// 	}else{
			// 		messageAlert.open("알림", "조회 대상을 선택해 주세요.");
			// 	}
			// });

			// 순위 선택 팝업 > 선택버튼 선택
			body.on('click', '#densely .btn_1', function() {
				// log 생성
				srvLogWrite('R0', '04', '04', '03', $('#densely .rank-list li a.active').text(), ''); // 2022.02.15

				var $selItm = $('#densely .rank-list li a.active');
				if ($selItm.length === 1) {
					var param = $urbanObj.makeSelectedUrbarsInfo($selItm);
					var lyrKey = $urbanObj.getGeometryKey(param);
					var geo = $urbanMain.ui.getGeo();
					var map = $urbanMain.ui.getMap();

					var targetLyr = geo.getLayer(lyrKey);
					if (targetLyr !== undefined && targetLyr !== null) {
						if (targetLyr !== undefined && targetLyr !== null) {
							var nxtZoom = map.gMap.getBoundsZoom(targetLyr
									.getBounds(), false);
							map.gMap.fitBounds(targetLyr.getBounds(), {
								maxZoom : nxtZoom - 1
							});
						}
						targetLyr.fire("click");
					}

					$('#densely .close').trigger("click");
				} else {
					messageAlert.open("알림", "조회 대상을 선택해 주세요.");
				}
			});

			body.on('mouseenter', '.mightOverflow',
					function(e) {
						var $this = $(this);

						if (this.offsetWidth < this.scrollWidth
								&& !$this.attr('title')) {
							$this.attr('title', $this.text());
						} else {
							$this.removeAttr('title');
						}
					});

			body.on('mouseleave', '.mightOverflow', function(e) {
				$(this).removeAttr('title');
			});

			body.on('click', '#tuto_btn', function() {
				$('.urbanTuto').removeClass('active');
				var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
				if (selMenuId === "gnb_menu_1") {
					srvLogWrite('R0', '01', '02', '01', '도시화통계', ''); // 2022.02.15
					// log
					// 생성
					$('.urbanTuto.tuto_1').addClass('active');
				} else if (selMenuId === "gnb_menu_2") {
					srvLogWrite('R0', '01', '02', '01', '도시변화', ''); // 2022.02.15
					// log
					// 생성
					$('.urbanTuto.tuto_2').addClass('active');
				} else if (selMenuId === "gnb_menu_3") {
					srvLogWrite('R0', '01', '02', '01', '도시화지표분석', ''); // 2022.02.15
					// log
					// 생성
					$('.urbanTuto.tuto_3').addClass('active');
					// 2022-11-30 사용자 가이드 생활시설분포 추가
				}else if (selMenuId === "gnb_menu_4") {
					srvLogWrite('R0', '01', '02', '01', '생활시설분포', ''); // 2022.02.15
					// log
					// 생성
					$('.urbanTuto.tuto_4').addClass('active');
				}
				
			});

			body.on('click', '.urbanTuto .tutoClose', function() {
				$('.urbanTuto').removeClass('active');
			});

			// SGIS4_도시화 sns_공유 시작
			// sns공유 popup 열기 버튼
			body.on('click', '#share_btn', function() {
				var baseUrl = $urbanMain.ui.makeShareUrl();

				$('#shareUrl').val(baseUrl);
				$('.dim').show();
				$('#commonSharepopup').show();
			});

			// sns공유 카카오버튼
			body.on("click",".kakao",function () {
				try {
						Kakao.init('167fc6abf0eb4717e1f3de7895a0152a'); // 2020.11.05
						// [주형식] 실운영으로 적용
					} catch (e) {
					}

					Kakao.Auth.login({success: function (authObj) {
						var linkUrl = $('#shareUrl').val();
							console.log("로그인 success kakao linkUrl = "+ linkUrl);
								Kakao.API.request({
									url: '/v1/api/story/linkinfo',
									data: {url: encodeURIComponent(linkUrl)},
									}).then(function (res) {
										return Kakao.API.request({
											url: '/v1/api/story/post/link',
											data: {
													link_info: res
													}
												});
										})
									.then(
										function (res) {
											return Kakao.API.request({
												url: '/v1/api/story/mystory',
												data: {
														id: res.id
													},
													success: function (res) {
														commonTotSurv_alert("카카오스토리에 정상적으로 공유하였습니다.");
													},
													fail: function (error) {
														commonTotSurv_alert("카카오스토리에 공유를 실패하였습니다.<br>("+ error.error_description+ ")");
													}
												});
										});
							},
							fail: function (error) {
								commonTotSurv_alert("카카오스토리에 공유를 실패하였습니다.<br>("+ error.error_description+ ")");
							}
						});
					$('#commonToturban_Sns_close').trigger('click');
				});

			// sns공유 트위터 버튼
			body.on('click', '.twitter', function() {
				var lv_url = $('#shareUrl').val();
				var lv_text = "[총조사시각화]개인 관심주제에 맞는 공간통계정보를 제공합니다.";
				window.open("https://twitter.com/share?url="+ encodeURIComponent(lv_url) + "&text="+ encodeURIComponent(lv_text) + "&hashtags=");
				$('#commonToturban_Sns_close').trigger('click');

			});

			// sns공유 페이스북 버튼
			body.on('click', '.face', function() {
				var lv_url = $('#shareUrl').val();
				var rtn = window.open("https://www.facebook.com/sharer/sharer.php?u="+ encodeURIComponent(lv_url));
				$('#commonToturban_Sns_close').trigger('click');
			});

			// sns공유 밴드 버튼
			body.on('click', '.band', function() {
				var lv_url = $('#shareUrl').val();
				var rtn = window.open("https://band.us/plugin/share?body="
						+ encodeURIComponent(lv_url) + "&route="
						+ encodeURIComponent(lv_url));
				$('#commonToturban_Sns_close').trigger('click');
			});

			// sns공유 URL 복사하기 버튼
			body.on('click', '.urlcopy', function() {
				srvLogWrite('R0', '01', '03', '01', '', '');
				var text = $('#shareUrl').val();
				$urbanMain.ui.copyToClipboard(text);
				$('.dim').hide();
				$('#commonSharepopup').hide();
			});

			// sns공유 닫기 버튼
			body.on('click', '.commonurban_Sns_close', function() {
				$('.dim').hide();
				$('#commonSharepopup').hide();
			});
			// SGIS4_도시화 sns_공유 끝

			// 년도 정렬 바꿈(오름차순, 내림차순)
			body.on('click', '#reverseBtn', function() {
				var clsTy = $('#gnb_menu_2').find('ul li a.active').attr('data-cls-type');
				var statYears = [];
				if (!$(this).hasClass('active')) {
					srvLogWrite('R0', '02', '02', '03', '오름차순->내림차순', ''); // 2022.02.15
					// log
					// 생성
					// 내림차순으로 바꾼다
					$(this).addClass('active');
					statYears = $urbanMain.ui.getStatYearList(clsTy, true);
				} else {
					srvLogWrite('R0', '02', '02', '03', '내림차순->오름차순', ''); // 2022.02.15
					// log
					// 생성

					// 오름차순으로 바꾼다
					$(this).removeClass('active');
					
					statYears = $urbanMain.ui.getStatYearList(clsTy, false);
				}
				$urbanMain.ui.setTimeSeriesYearUi(statYears);

				$urbanMain.ui.isTimeSeriesPlay = false;
				$urbanMain.ui.isTimeSeriesStop = false;
				$urbanMain.ui.timeSeriesIdx = 0;
				$urbanMain.ui.timeSeriesClsTy = "";
				$urbanMain.ui.timeSeriesYearList = [];
				$('.time-graph-conbox .time-graph ul > li > p').removeClass('active');

				// 도형 새로 불러오기..
				var paramTimeObj = {};
				paramTimeObj.urban_cls_gb = clsTy;
				paramTimeObj.base_year = statYears[0];
				paramTimeObj.map_id = 0;
				paramTimeObj.async = false;
				$urbanMain.ui.reqUrbarsGeometry(paramTimeObj, true);
				$('.time-graph li:eq(0)').find('p').addClass('active'); //추가
			});

			/*UN도시 분류 버튼 막음 22.10.5 이준혁*/

//			body.on("click", ".header-left .switchBox", function() {
//				$('.gnb .gnb-li ul li a').removeClass("active");
//				var selMenuId = $urbanLeftMenu.ui.getSelectedLeftMenuId();
//
//				var ck = $(this).hasClass("off");
//				if (ck) {
//					$(this).removeClass("off");
//					$(this).find(".ball").stop().animate({
//						"left" : "98px"
//					}, 200, 'easeOutExpo');
//					$(this).find(".txt").stop().animate({
//						"left" : "8px"
//					}, 200, 'easeOutExpo');
//
//					if (selMenuId === "") {
//						$('.gnb .gnb-li ul li:nth-child(1) a').addClass(
//								"active");
//					} else {
//						$('#' + selMenuId + ' > ul li:nth-child(1) a').trigger(
//								"click");
//					}
//				} else {
//					$(this).addClass("off");
//					$(this).find(".ball").stop().animate({
//						"left" : "2px"
//					}, 200, 'easeOutExpo');
//					$(this).find(".txt").stop().animate({
//						"left" : "22px"
//					}, 200, 'easeOutExpo');
//
//					if (selMenuId === "") {
//						$('.gnb .gnb-li ul li:nth-child(2) a').addClass(
//								"active");
//					} else {
//						$('#' + selMenuId + ' > ul li:nth-child(2) a').trigger(
//								"click");
//					}
//				}
//
//				return false;
//			});

			body.on("click", ".header-left .tit", function() {
				var param = {};
				param.u_menu = "B";
				var ck = $('.header-left .switchBox').hasClass("off");
				if (ck) {
					param.u_class = "SGIS";
				} else {
					param.u_class = "UN";
				}

				$('.gnb .gnb-li').removeClass("active");
				$urbanMain.ui.doInitView("start", param);
			});
		},

		resizePopup : function() {

			var $winH = $(window).height() - 150;

		}
	};

	/** ********* OpenAPI 테스트 통계검색 Start ********* */
	/** ********* OpenAPI 테스트 통계검색 End ********* */

}(window, document));
