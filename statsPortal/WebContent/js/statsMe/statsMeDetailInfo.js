/**
 * My통계로 (상세정보)
 * 
 * history : 
 * 2019.08.08	김남민	최초작성
 * 
 * 
 * author : 김남민
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$statsMeDetailInfo = W.$statsMeDetailInfo || {};

	$(document).ready(function() {
		//페이지 이벤트
		$statsMeDetailInfo.event.setUIEvent();
		
		//지도 불러오기 전 처리(지도 div가 display block 상태에서 지도를 불러와야 화면 안깨짐)
		var lvStatsMeDetailInfoShowYn = "Y";
		if($("#statsMeDetailInfo").css("display") == "none") {
			lvStatsMeDetailInfoShowYn = "N";
		}
		if(lvStatsMeDetailInfoShowYn == "N") {
			$("#statsMeDetailInfo").parent().css("overflow","hidden");
			$("#statsMeDetailInfo").show();
		}
		//지도 생성
		$statsMeDetailInfo.ui.createMap("statsMeDetailInfoMap_color_sido");
		$statsMeDetailInfo.ui.createMap("statsMeDetailInfoMap_color_sgg");
		$statsMeDetailInfo.ui.createMap("statsMeDetailInfoMap_color_emdong");
		$statsMeDetailInfo.ui.createMap("statsMeDetailInfoMap_color_totreg");
		$statsMeDetailInfo.ui.createMap("statsMeDetailInfoMap_color_100m");
		//지도 불러오기 후 처리
		if(lvStatsMeDetailInfoShowYn == "N") {
			$("#statsMeDetailInfo").hide();
			$("#statsMeDetailInfo").parent().css("overflow","");
		}
		
		//툴팁 설정
		$("#statsMeDetailInfo [title]:not([disabled])").tooltip();
	});

	$statsMeDetailInfo.ui = {
		callCount : 0, //페이지 호출 횟수
		pageLoadMapMoveYn : "N",
		pageLoadMapMoveX : 0,
		pageLoadMapMoveY : 0,
		
		//지도
		map_color_sido : null,
		map_color_sgg : null,
		map_color_emdong : null,
		map_color_totreg : null,
		map_color_100m : null,
		namespace : "statsMeDetailInfo",
		
		//데이터
		mapData : null,
		
		//보고서
		reportPopup : null,
		
		/**
		 * @name		 : init
		 * @description  : 페이지 초기화 함수 
		 * @date		 : 2019.08.19 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		init : function() {
			//페이지 맵이동 데이터 처리
			if($statsMeDetailInfo.ui.pageLoadMapMoveYn == "Y") {
				$statsMeDetailInfo.ui.pageLoadMapMoveYn = "N";
				//$statsMeDetailInfo.ui.map_color_sido.mapMove([$statsMeMap.ui.pageLoadMapMoveX, $statsMeMap.ui.pageLoadMapMoveY], 0);
				//$statsMeDetailInfo.ui.map_color_sgg.mapMove([$statsMeMap.ui.pageLoadMapMoveX, $statsMeMap.ui.pageLoadMapMoveY], 2);
				//$statsMeDetailInfo.ui.map_color_emdong.mapMove([$statsMeMap.ui.pageLoadMapMoveX, $statsMeMap.ui.pageLoadMapMoveY], 4);
				//$statsMeDetailInfo.ui.map_color_totreg.mapMove([$statsMeMap.ui.pageLoadMapMoveX, $statsMeMap.ui.pageLoadMapMoveY], 7);
				//$statsMeDetailInfo.ui.map_color_100m.mapMove([$statsMeMap.ui.pageLoadMapMoveX, $statsMeMap.ui.pageLoadMapMoveY], 7);
			}
			
			//페이지 호출 횟수 증가
			$statsMeDetailInfo.ui.callCount++;
			
			$statsMeMap.ui.setDetailTable($statsMeMap.ui.mapStatsData);//20200924 [한광희] 상세정보 화면 PDF Print 팝업 페이지 리스트 셋팅
			
			/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 및 지도캡쳐 추가 START */
			//이미지 캡쳐
			$statsMeMap.ui.doCapture("#statsMeMapMap", function(data) {
				//데이터 입력
				$("#statsMeDetailInfoPrintForm_image").val(data);
				
				//지도 시각화 화면
		    	$("#statsMeDetailInfo_MapDiv").attr("src",$("#statsMeDetailInfoPrintForm_image").val());
		    	
		    	//지도 Legend
		    	if($statsMeMap.ui.mapType == "color" || $statsMeMap.ui.mapType == "bubble") {
		    		$("#legend").html($("#legend_"+$statsMeMap.ui.map.legend.id).html());
		    		$("#reverseBtn_"+$statsMeMap.ui.map.legend.id).hide();
		    		$("#legend .legendRound").hide();
		    		$("#legend .legendRrefresh").hide();
		    		/** 2020.09.23[한광희] 지도시각화 범례 css 수정 START */
		    		$("#legend .colorbar").css("width", "160px");
		    		$("#legend .colorbar").css("height", "210px");
		    		$("#legend .legendRing").css("width", "185px");
		    		$("#legend .colorbar").find("li").css("width", "155px");
		    		$("#legend .colorbar").find("li").css("height", "25px");
		    		$("#legend .colorbar").find("li").css("line-height", "26px");
		    		$("#legend .colorck").find("a").click(function(){return false;});
		    		$("#legend .colorck").find("a").css("cursor", "auto");
		    		/** 2020.09.23[한광희] 지도시각화 범례 css 수정 END */
		    	} else {
		    		$("#pntLegend_show").hide();
		    		$("#pntLegend").hide();
		    	}
			});
			
			// 데이터보기 페이징 존재시 화면 로딩시 첫번째 페이지로 이동
			if($("#statsMeDetailInfo_pagingTable").find('td').length > 0){
				$("#statsMeDetailInfo_pagingTable>tbody>tr>td:first-child").trigger("click");				
			}
			
			// 데이터보기 페이징 5건 이상시 페이지 prev,next 버튼 추가
			if($("#statsMeDetailInfo_pagingTable").find('td').length > 5){
				$("#statsMeDetailInfo_pagingTable_page_prev").show();
				$("#statsMeDetailInfo_pagingTable_page_next").show();
			} else {
				$("#statsMeDetailInfo_pagingTable_page_prev").hide();
				$("#statsMeDetailInfo_pagingTable_page_next").hide();
			}
			/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 및 지도캡쳐 추가 END */
		},
	
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2019.08.20
		 * @author : 김남민
		 * @history :
		 * @param
		 * 		p_id : map으로 쓸 div id
		 */
		createMap : function(p_id) {
			var lv_map_name = p_id.replace(/statsMeDetailInfoMap_/g,"");
			//지도 불러오기
			$statsMeDetailInfo.ui["map_"+lv_map_name] = new sMap.map();
			var lv_map = $statsMeDetailInfo.ui["map_"+lv_map_name];
			lv_map.id = p_id;
			lv_map.isDrop = true;
			lv_map.isInnerMapShow = true;
			//그리드 세팅
			/*if(p_id == "statsMeDetailInfoMap_color_100m") {
				lv_map.isInnerMapShow2 = true; //그리드 클릭시 사용
				lv_map.isInnerMapShow3 = true; //행정구역 그리드 클릭시 사용
			}*/
			lv_map.isTradeMapShow = false;
			lv_map.isLayerMouseEventDisabled = true; // 마우스 오버 이벤트 제거
			lv_map.boundLevel = 0; // 확대 상관없이 지역경계 표시하게함
			lv_map.createMap($statsMeDetailInfo, p_id, {
				//대전 서구 둔산동
				//center : [ 989674, 1818313 ],
				//zoom : 8, //9->8
				//전국
				center : $statsMeMap.ui.mapCenterDefalut,
				zoom : 0,
				measureControl : false,
				statisticTileLayer: true,
				scale: false,
				isScale: false
			});
			
			//지도 이벤트 등록
			//lv_map.addControlEvent("movestart");
			//lv_map.addControlEvent("moveend");
			//lv_map.addControlEvent("zoomstart");
			//lv_map.addControlEvent("zoomend");
			//lv_map.addControlEvent("drag");
			//lv_map.addControlEvent("dragend");
			/*lv_map.gMap.on("moveend", function (e) {
				var that = $statsMeMap.ui.map;
				if (that.delegate && 
					that.delegate.callbackFunc && 
					that.delegate.callbackFunc.didMapMoveEnd instanceof Function) {
					that.delegate.callbackFunc.didMapMoveEnd(e, that);
				}
			});*/
			
			//지도 버튼 콜백 함수 등록 
			//lv_map.mapBtnInfo = $statsMeMap.mapBtnInfo;
			
			//지도 범례 등록
			//lv_map.legend = $statsMeMap.legend;
			var legend = new sLegendInfo.legendInfo(lv_map);
			legend.linkTooltip = function() {}; //툴팁오류 방지
			legend.drawBubbleMap = $statsMeMap.ui.drawBubbleMap; // 버블 지도 Override
			legend.initialize($statsMeDetailInfo.ui);
			lv_map.legend = legend;
			legend.createLegend();
			$("#legend_"+ lv_map.legend.id).hide(); //legend 숨김
			
			//지도 고정
			lv_map.gMap.dragging.disable();
			lv_map.gMap.touchZoom.disable();
			lv_map.gMap.doubleClickZoom.disable();
			lv_map.gMap.scrollWheelZoom.disable();
			
			//지도 불러오기 완료 후 처리
			lv_map.gMap.whenReady(function() {
				//전국지도 축소시키기
				if(p_id == "statsMeDetailInfoMap_color_sido") {
					var lv_scale = 2.5;
					// 신규 CRS 선언
					var lv_crs = sop.extend({}, sop.CRS.UTMK, {
						_scales: function () {
							var scales = [];
							for (var i = 0, len = this.resolutions.length; i  < len; i++)
							{
								scales[i] = 1 / (this.resolutions[i] * lv_scale);
							}
							return scales;
						}
					});
					// 기존 레이어 선언
					var lv_targetTileLayer = lv_map.gMap.statisticTileLayer;
					// 신규 레이어 선언
					var lv_baseTileLayer = new sop.StatisticTileLayer(lv_targetTileLayer.options.url, {tileSize : 256 / lv_scale});
					// 지도 변수 선언
					var lv_center = lv_map.gMap.getCenter();
					var lv_zoom = lv_map.zoom;
					// 기존 레이어 제거
					lv_map.gMap.removeLayer(lv_targetTileLayer);
					// 신규 CRS 적용
					lv_map.gMap.options.crs = lv_crs;
					// 신규 레이어 적용
					lv_baseTileLayer.addTo(lv_map.gMap);
					// 지도 레벨 고정(안씀)
					//lv_map.setFixedBoundLevel(lv_map.isFixedBound);
					// 지도 변수 적용
					lv_map.mapMove([lv_center.x, lv_center.y], lv_zoom);
				}
			});
		},
		
		/**
		 * 
		 * @name         : clearMap
		 * @description  : 지도 Clear
		 * @date         : 2019. 08. 29. 
		 * @author	     : 권차욱
		 * @history 	 :
		 */
		clearMap : function() {
			$statsMeMap.ui.clearMap($statsMeDetailInfo.ui.map_color_sido);
			$statsMeMap.ui.clearMap($statsMeDetailInfo.ui.map_color_sgg);
			$statsMeMap.ui.clearMap($statsMeDetailInfo.ui.map_color_emdong);
			$statsMeMap.ui.clearMap($statsMeDetailInfo.ui.map_color_totreg);
			$statsMeMap.ui.clearMap($statsMeDetailInfo.ui.map_color_100m);
		},
		
		/**
		 * @name : setMapData
		 * @description : 지도 데이터 화면처리
		 * @date : 2019.08.21
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		setMapData : function() {
			//Validation
			if($statsMeDetailInfo.ui.mapData == null) {
				$statsMeMain.ui.alert("조회된 데이터가 없습니다.");
			}
			
			//변수
			var data = $statsMeDetailInfo.ui.mapData.data;
			
			/* 데이터 */
			//데이터 매핑
			/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
			// $("#statsMeDetailInfoStatDataNm").html(data.stat_data_nm); 			// 통계자료명
			$("#statsMeDetailInfoStatDataNm").html(data.stat_data_srv_nm); 			// 통계자료명
			/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
			
			var subInfo = "";
			if(data.stat_data_base_year != null && data.stat_data_base_year != ""){
				subInfo += "<span>기준년도 : </span>" + data.stat_data_base_year;
			}
			
			// 데이터 지도유형
			var dataMapType = "";
			if(data.color_disp_yn == "Y" || data.balln_disp_yn == "Y" || data.tp_disp_yn == "Y" || data.poi_disp_yn == "Y"){
				subInfo += "<span>표출 지도 유형 : </span>";
				if(data.color_disp_yn == "Y"){
					dataMapType += ", 색상지도";
				}
				if(data.balln_disp_yn == "Y"){
					dataMapType += ", 버블지도";
				}
				if(data.tp_disp_yn == "Y"){
					dataMapType += ", 열지도";
				}
				if(data.poi_disp_yn == "Y"){
					dataMapType += ", POI지도";
				}
				// 맨 앞 ", " 부분 제거
				if(dataMapType != ""){
					dataMapType = dataMapType.substr(2);					
				}
				subInfo += dataMapType;
			}
			$("#statsMeDetailInfoSubInfo").html(subInfo);
			
			/** 2020.05.14[한광희] My통계로 신규 지표 추가로 인한 설명자료 값이 없을 경우 처리 START */
			//2020-02-18 [김남민] 설명자료 개행
			//$("#statsMeDetailInfoStatDataExp").html((""+data.stat_data_exp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>'));								// 통계자료설명
			if(data.stat_data_exp != undefined){
				$("#statsMeDetailInfoStatDataExp").show();
				$("#statsMeDetailInfoStatDataExp").html((""+data.stat_data_exp).replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/(?:\r\n|\r|\n)/g, '<br>'));	// 통계자료설명
			} else {
				$("#statsMeDetailInfoStatDataExp").hide();
			}
			/** 2020.05.14[한광희] My통계로 신규 지표 추가로 인한 설명자료 값이 없을 경우 처리 END */
			
			/**  2020.05.19[한광희] 자료출처 클릭 시 e-지방지표 화면으로 이동할 수 있는 link 추가 START */
			//$("#statsMeDetailInfoSource").html("<strong>데이터출처 -&nbsp;</strong>" + data.source);			// 데이터 출처
			var sourceHtml = "";
			sourceHtml += "<strong>데이터출처 -&nbsp;</strong>";
			if(data.source_url != undefined){
				sourceHtml += "<span style='text-decoration: underline; text-underline-position: under; color: blue;'>";
				sourceHtml += "<a href='javascript:void(0);' onclick=\"javascript:";
				sourceHtml += "$('#statsMeMapSource>a').trigger('click');";
				sourceHtml += "\">";
				sourceHtml += data.source + "</a>";
				sourceHtml += "</span>";
			} else {
				sourceHtml += data.source;
			}
			$("#statsMeDetailInfoSource").html(sourceHtml);	// 데이터 출처
			/**  2020.05.19[한광희] 자료출처 클릭 시 e-지방지표 화면으로 이동할 수 있는 link 추가 END */
			
			/** SGIS 콘텐츠 출처 START */
			var menulinkHtml = "";
			var tempMenuNm = "";
			if(data.menu_nm != null && data.menu_nm != "") tempMenuNm += data.menu_nm;						// 메뉴명
			if(data.srv_nm != null && data.srv_nm != "") tempMenuNm += " > " + data.srv_nm;					// 서비스명
			if(data.b_class_nm != null && data.b_class_nm != "") tempMenuNm += " > " + data.b_class_nm;		// 대분류명
			if(data.m_class_nm != null && data.m_class_nm != "") tempMenuNm += " > " + data.m_class_nm;		// 중분류명
			if(data.s_class_nm != null && data.s_class_nm != "") tempMenuNm += " > " + data.s_class_nm;		// 소분류명
			
			// e-지방지표는 링크 제외
			//2020-02-18 [김남민] E지방지표 링크 기능 안됨 START
			/*if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
				menulinkHtml += "<strong>SGIS 콘텐츠 출처 -&nbsp;</strong>";
				menulinkHtml += tempMenuNm;
			} else {*/
				menulinkHtml += "<strong>SGIS 콘텐츠 출처 -&nbsp;</strong>";
				menulinkHtml += "<span style='text-decoration: underline; text-underline-position: under; color: blue;'>";
				menulinkHtml += "<a href='javascript:void(0);' onclick=\"javascript:";
				menulinkHtml += "$('#statsMeMapGoDetail>a').trigger('click');";
				menulinkHtml += "\">";
				menulinkHtml += tempMenuNm + "</a>";
				menulinkHtml += "</span>";
			//}
			//2020-02-18 [김남민] E지방지표 링크 기능 안됨 END
			
			$("#statsMeDetailInfoMenuNm").html(menulinkHtml);	
			/** SGIS 콘텐츠 출처 END */
			
			/** 2020.05.13[한광희] My통계로 통계주제도 신규 지표 추가로 인한 키워드 값이 없을 경우 처리 START */
			// 키워드 설정
			// $("#statsMeDetailInfoKwrd").html("<strong>키워드 -&nbsp;</strong>" + data.main_kwrd);
			if(data.main_kwrd != undefined){
				$("#statsMeDetailInfoKwrd").show();
				$("#statsMeDetailInfoKwrd").html("<strong>키워드 -&nbsp;</strong>" + data.main_kwrd);
			} else {
				$("#statsMeDetailInfoKwrd").hide();
			}
			/** 2020.05.13[한광희] My통계로 통계주제도 신규 지표 추가로 인한 키워드 값이 없을 경우 처리 END */
			// 추천서비스 설정
			var lv_recomend_svc_list = data.recomend_svc_list;
			var lv_recomend_svc_html = "";
			if(lv_recomend_svc_list != undefined && lv_recomend_svc_list != null && lv_recomend_svc_list.length > 0) {
				for(var i = 0; i < lv_recomend_svc_list.length; i++) {
					var lv_recomend_svc_text = "";
					lv_recomend_svc_html += "<span>";
					if(lv_recomend_svc_list[i].menu_nm != undefined && lv_recomend_svc_list[i].menu_nm != null && lv_recomend_svc_list[i].menu_nm != "") lv_recomend_svc_text += lv_recomend_svc_list[i].menu_nm;
					if(lv_recomend_svc_list[i].srv_nm != undefined && lv_recomend_svc_list[i].srv_nm != null && lv_recomend_svc_list[i].srv_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].srv_nm;
					//if(lv_recomend_svc_list[i].b_class_nm != undefined && lv_recomend_svc_list[i].b_class_nm != null && lv_recomend_svc_list[i].b_class_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].b_class_nm;
					//if(lv_recomend_svc_list[i].m_class_nm != undefined && lv_recomend_svc_list[i].m_class_nm != null && lv_recomend_svc_list[i].m_class_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].m_class_nm;
					//if(lv_recomend_svc_list[i].s_class_nm != undefined && lv_recomend_svc_list[i].s_class_nm != null && lv_recomend_svc_list[i].s_class_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].s_class_nm;
					/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 START */
					// if(lv_recomend_svc_list[i].stat_data_nm != undefined && lv_recomend_svc_list[i].stat_data_nm != null && lv_recomend_svc_list[i].stat_data_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].stat_data_nm;
					if(lv_recomend_svc_list[i].stat_data_srv_nm != undefined && lv_recomend_svc_list[i].stat_data_srv_nm != null && lv_recomend_svc_list[i].stat_data_srv_nm != "") lv_recomend_svc_text += " > "+lv_recomend_svc_list[i].stat_data_srv_nm;
					/** 2019.12.03[한광희] 통계자료서비스명 컬럼 추가로 인한 수정 END */
					lv_recomend_svc_html += "<a href=\"javascript:void(0);\" onclick=\"javascript:srvLogWrite('N0', '10', '05', '00', '"+lv_recomend_svc_text+"', '');$(this).addClass('current');$statsMeMap.ui.loadMapData('"+lv_recomend_svc_list[i].stat_data_id+"');$statsMeCatalog.ui.catalogRecmdSrvUsageHistory('"+lv_recomend_svc_list[i].stat_data_id+"');\">"+lv_recomend_svc_text+"</a>";		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
					if(lv_recomend_svc_html != "") lv_recomend_svc_html += "</span> <br>";
				}
			}
			
			/** 2019.12.03[한광희] 추천서비스 목록이 존재 하지 않을 경우 표현 안하도록 수정 START */
			//$("#statsMeDetailInfoRecomendSvc").html("<strong>추천서비스 목록</strong> <br>" + lv_recomend_svc_html);
			if(lv_recomend_svc_html != "") {
				$("#statsMeDetailInfoRecomendSvc").show();
				$("#statsMeDetailInfoRecomendSvc").html("<strong>추천서비스 목록</strong> <br>" + lv_recomend_svc_html);				
			} else {
				$("#statsMeDetailInfoRecomendSvc").hide();
			}
			/** 2019.12.03[한광희] 추천서비스 목록이 존재 하지 않을 경우 표현 안하도록 수정 END */
			
			/* 지도 */
			$statsMeDetailInfo.ui.drawMapData();
		},
		
		/**
		 * @name : drawMapData
		 * @description : 지도 데이터 그리기
		 * @date : 2019.08.22
		 * @author : 김남민
		 * @history :
		 * @param :
		 */
		drawMapData : function() {
			//조회변수
			var data = $statsMeDetailInfo.ui.mapData.data;
			
			//지역변수
			var lv_sido_cd = $statsMeMain.ui.default_sido_cd;
			var lv_sgg_cd = $statsMeMain.ui.default_sgg_cd;
			var lv_emdong_cd = $statsMeMain.ui.default_emdong_cd;
			
			//시각화 화면 표시/숨김
			if(data.color_disp_yn == "Y") {
				$("#statsMeDetailInfoMap_list_div").show();
			}
			else {
				$("#statsMeDetailInfoMap_list_div").hide();
			}
			
			//모든 지도 초기화
			$statsMeDetailInfo.ui.clearMap();
			$("#statsMeDetailInfoMap_list>li").hide();
			
			//2020-02-18 [김남민] 상세보기화면의 지역범주별 데이터 시각화(미리보기) 오류 START
			//지도 Legend 초기화
			$statsMeDetailInfo.ui.map_color_sido.legend.legendInit();
			$statsMeDetailInfo.ui.map_color_sido.legend.isNegative = false;
			$statsMeDetailInfo.ui.map_color_sido.legend.isNegativeColorShow = true;
			$statsMeDetailInfo.ui.map_color_sgg.legend.legendInit();
			$statsMeDetailInfo.ui.map_color_sgg.legend.isNegative = false;
			$statsMeDetailInfo.ui.map_color_sgg.legend.isNegativeColorShow = true;
			$statsMeDetailInfo.ui.map_color_emdong.legend.legendInit();
			$statsMeDetailInfo.ui.map_color_emdong.legend.isNegative = false;
			$statsMeDetailInfo.ui.map_color_emdong.legend.isNegativeColorShow = true;
			$statsMeDetailInfo.ui.map_color_totreg.legend.legendInit();
			$statsMeDetailInfo.ui.map_color_totreg.legend.isNegative = false;
			$statsMeDetailInfo.ui.map_color_totreg.legend.isNegativeColorShow = true;
			$statsMeDetailInfo.ui.map_color_100m.legend.legendInit();
			$statsMeDetailInfo.ui.map_color_100m.legend.isNegative = false;
			$statsMeDetailInfo.ui.map_color_100m.legend.isNegativeColorShow = true;
			//2020-02-18 [김남민] 상세보기화면의 지역범주별 데이터 시각화(미리보기) 오류 END
			
			//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 START
			//정책통계지도 (negative 지도)
			if(data.menu_nm == "정책통계지도") {
				$statsMeDetailInfo.ui.map_color_sido.legend.legendType = "negative";
				$statsMeDetailInfo.ui.map_color_sgg.legend.legendType = "negative";
				$statsMeDetailInfo.ui.map_color_emdong.legend.legendType = "negative";
				$statsMeDetailInfo.ui.map_color_totreg.legend.legendType = "negative";
				$statsMeDetailInfo.ui.map_color_100m.legend.legendType = "negative";
			}
			else {
				$statsMeDetailInfo.ui.map_color_sido.legend.legendType = "auto";
				$statsMeDetailInfo.ui.map_color_sgg.legend.legendType = "auto";
				$statsMeDetailInfo.ui.map_color_emdong.legend.legendType = "auto";
				$statsMeDetailInfo.ui.map_color_totreg.legend.legendType = "auto";
				$statsMeDetailInfo.ui.map_color_100m.legend.legendType = "auto";
			}
			//2020-02-11 [김남민] 정책통계지도에서 음수 값이 있는 범례 색상 변경 END
			
			//색상 시도
			if(data.color_disp_yn == "Y" && data.sido_disp_yn == "Y" && data.sgg_disp_yn != "Y" && data.emdong_disp_yn != "Y" && data.tot_reg_disp_yn != "Y" && data.grid_disp_yn != "Y") {
				//대화형 통계지도 > e-지방지표
				if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
					//데이터 넣기
					$("#statsMeDetailInfoMap_color_sido_li").show();
					$statsMeMap.ui.setStatsDataEcountry($statsMeDetailInfo.ui.map_color_sido, "sido", "", "", "", function() {
						//경계 그리기
						var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_sido, "sido", lv_year);
						$statsMeDetailInfo.ui.map_color_sido.mapMove($statsMeMap.ui.mapCenterDefalut , 0);
					});
				}
				//데이터 조회
				else {
					//지도 표시
					$("#statsMeDetailInfoMap_color_sido_li").show();
					
					//데이터 불러오기
					$statsMeMap.ui.setStatsDataOne($statsMeDetailInfo.ui.map_color_sido, "sido", "color", "", "", "", function(p_list) {
						//리스트에서 unit 가져오기
						var lv_unit = "개";
						var lv_unit_nm = "수";
						if(p_list != null && p_list.length > 0) {
							if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
							if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
						}
						
						//데이터 넣기
						$statsMeDetailInfo.ui.map_color_sido.setStatsData("normal", {"pAdmCd": "00", "result" : p_list}, "stats_dta_co", lv_unit);
						
						//경계 그리기
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_sido, "sido", $statsMeMap.ui.getStatsRegionYear());
						
						//지도 이동
						$statsMeDetailInfo.ui.map_color_sido.mapMove($statsMeMap.ui.mapCenterDefalut , 0);
					});
				}
			}
			//색상 시군구
			if(data.color_disp_yn == "Y" && data.sgg_disp_yn == "Y") {
				//대화형 통계지도 > e-지방지표
				if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
					//데이터 넣기
					$("#statsMeDetailInfoMap_color_sgg_li").show();
					$statsMeMap.ui.setStatsDataEcountry($statsMeDetailInfo.ui.map_color_sgg, "sgg", lv_sido_cd, "", "", function() {
						//경계 그리기
						var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
						var lv_region = "sgg"; //비자치구 여부 체크
						if($statsMeMap.ui.ecountryMapping[data.stat_data_id].atdrc_yn == "Y") lv_region = "atdrc";
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_sgg, lv_region, lv_year, lv_sido_cd);
						$statsMeDetailInfo.ui.map_color_sgg.mapMove([$statsMeMain.ui.default_sido_x, $statsMeMain.ui.default_sido_y] , 2);
					});
				}
				//데이터 조회
				else {
					//지도 표시
					$("#statsMeDetailInfoMap_color_sgg_li").show();
					
					//데이터 불러오기
					$statsMeMap.ui.setStatsDataOne($statsMeDetailInfo.ui.map_color_sgg, "sgg", "color", lv_sido_cd, "", "", function(p_list) {
						//리스트에서 unit 가져오기
						var lv_unit = "개";
						var lv_unit_nm = "수";
						if(p_list != null && p_list.length > 0) {
							if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
							if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
						}
						
						//데이터 넣기
						$statsMeDetailInfo.ui.map_color_sgg.setStatsData("normal", {"pAdmCd": lv_sido_cd, "result" : p_list}, "stats_dta_co", lv_unit);
						
						//경계 그리기
						var lv_region = "sgg"; //비자치구 여부 체크
						if(data.atdrc_yn != undefined && data.atdrc_yn != null && data.atdrc_yn == "Y") lv_region = "atdrc";
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_sgg, lv_region, $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd);
						
						//지도 이동
						$statsMeDetailInfo.ui.map_color_sgg.mapMove([$statsMeMain.ui.default_sido_x, $statsMeMain.ui.default_sido_y] , 2);
					});
				}
			}
			//색상 읍면동
			if(data.color_disp_yn == "Y" && data.emdong_disp_yn == "Y") {
				//대화형 통계지도 > e-지방지표
				if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
					//데이터 넣기
					$("#statsMeDetailInfomap_color_emdong_li").show();
					$statsMeMap.ui.setStatsDataEcountry($statsMeDetailInfo.ui.map_color_emdong, "emdong", lv_sido_cd, lv_sgg_cd, "", function() {
						var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_emdong, "emdong", lv_year, lv_sido_cd, lv_sgg_cd);
						$statsMeDetailInfo.ui.map_color_emdong.mapMove([$statsMeMain.ui.default_sgg_x, $statsMeMain.ui.default_sgg_y] , 4);
					});
				}
				//데이터 조회
				else {
					//지도 표시
					$("#statsMeDetailInfoMap_color_emdong_li").show();
					
					//데이터 불러오기
					$statsMeMap.ui.setStatsDataOne($statsMeDetailInfo.ui.map_color_emdong, "emdong", "color", lv_sido_cd, lv_sgg_cd, "", function(p_list) {
						//리스트에서 unit 가져오기
						var lv_unit = "개";
						var lv_unit_nm = "수";
						if(p_list != null && p_list.length > 0) {
							if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
							if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
						}
						
						//데이터 넣기
						$statsMeDetailInfo.ui.map_color_emdong.setStatsData("normal", {"pAdmCd": lv_sido_cd+lv_sgg_cd, "result" : p_list}, "stats_dta_co", lv_unit);
						
						//경계 그리기
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_emdong, "emdong", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd);
						
						//지도 이동
						$statsMeDetailInfo.ui.map_color_emdong.mapMove([$statsMeMain.ui.default_sgg_x, $statsMeMain.ui.default_sgg_y] , 4);
					});
				}
			}
			//색상 소지역
			if(data.color_disp_yn == "Y" && data.tot_reg_disp_yn == "Y") {
				//대화형 통계지도 > e-지방지표
				if(data.menu_nm == "대화형 통계지도" && data.srv_nm == "e-지방지표") {
					//데이터 넣기
					$("#statsMeDetailInfomap_color_totreg_li").show();
					$statsMeMap.ui.setStatsDataEcountry($statsMeDetailInfo.ui.map_color_totreg, "totreg", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function() {
						var lv_year = $statsMeMap.ui.ecountryMapping[data.stat_data_id].prid_value.substr(0,4);
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_totreg, "totreg", lv_year, lv_sido_cd, lv_sgg_cd, lv_emdong_cd);
						$statsMeDetailInfo.ui.map_color_totreg.mapMove([$statsMeMain.ui.default_emdong_x, $statsMeMain.ui.default_emdong_y] , 7);
					});
				}
				//데이터 조회
				else {
					//지도 표시
					$("#statsMeDetailInfoMap_color_totreg_li").show();
					
					//데이터 불러오기
					$statsMeMap.ui.setStatsDataOne($statsMeDetailInfo.ui.map_color_totreg, "totreg", "color", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function(p_list) {
						//리스트에서 unit 가져오기
						var lv_unit = "개";
						var lv_unit_nm = "수";
						if(p_list != null && p_list.length > 0) {
							if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
							if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
						}
						
						//데이터 넣기
						$statsMeDetailInfo.ui.map_color_totreg.setStatsData("normal", {"pAdmCd": lv_sido_cd+lv_sgg_cd+lv_emdong_cd, "result" : p_list}, "stats_dta_co", lv_unit);
						
						//경계 그리기
						$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_totreg, "totreg", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd);
						
						//지도 이동
						$statsMeDetailInfo.ui.map_color_totreg.mapMove([$statsMeMain.ui.default_emdong_x, $statsMeMain.ui.default_emdong_y] , 7);
					});
				}
			}
			//색상 격자(100m)
			if(data.color_disp_yn == "Y" && data.grid_disp_yn == "Y") {
				//지도 표시
				$("#statsMeDetailInfoMap_color_100m_li").show();
				
				//데이터 불러오기
				$statsMeMap.ui.setStatsDataOne($statsMeDetailInfo.ui.map_color_100m, "100m", "color", lv_sido_cd, lv_sgg_cd, lv_emdong_cd, function(p_list) {
					//리스트에서 unit 가져오기
					var lv_unit = "개";
					var lv_unit_nm = "수";
					if(p_list != null && p_list.length > 0) {
						if(p_list[0].unit != undefined && p_list[0].unit != null && p_list[0].unit != "") lv_unit = p_list[0].unit;
						if(p_list[0].unit_nm != undefined && p_list[0].unit_nm != null && p_list[0].unit_nm != "") lv_unit_nm = p_list[0].unit_nm;
					}
					
					//데이터 넣기
					$statsMeDetailInfo.ui.map_color_100m.setStatsData("normal", {"pAdmCd": lv_sido_cd+lv_sgg_cd+lv_emdong_cd, "result" : p_list}, "stats_dta_co", lv_unit);
					
					//경계 그리기
					$statsMeMap.ui.setStatsRegion($statsMeDetailInfo.ui.map_color_100m, "100m", $statsMeMap.ui.getStatsRegionYear(), lv_sido_cd, lv_sgg_cd, lv_emdong_cd);
					
					//지도 이동
					$statsMeDetailInfo.ui.map_color_100m.mapMove([$statsMeMain.ui.default_emdong_x, $statsMeMain.ui.default_emdong_y] , 7);
				});
			}
			
			//상세보기 페이지 아니면 위치를 저장
			if($statsMeMain.ui.currentPageName != "statsMeDetailInfo") {
				$statsMeDetailInfo.ui.pageLoadMapMoveYn = "Y";
				$statsMeDetailInfo.ui.pageLoadMapMoveX = $statsMeMain.ui.default_x;
				$statsMeDetailInfo.ui.pageLoadMapMoveY = $statsMeMain.ui.default_y;
			}
		},
		
		/**
		 * @name : similrKwrdSearch
		 * @description : 유사 키워드를 통한 카탈로그 목록 조회
		 * @date : 2019.09.02
		 * @author : 한광희
		 * @history :
		 * @param :
		 * 		kwrdNm : 키워드명
		 */
		similrKwrdSearch : function(kwrdNm){
			$statsMeMain.ui.searchKwrd = kwrdNm;	// 선택한 유사키워드 조회조건 값 셋팅
			
			// 생애주기 Navigation 초기화
			if($statsMeMain.ui.lifeCycleItemIdList.length > 0){
				$statsMeNavigation.ui.clearNavigation('lifeCycleNavigation', 'lifeCycle');				
			}
			// 관심분야 Navigation 초기화
			if($statsMeMain.ui.interestRealmItemIdList.length > 0){
				$statsMeNavigation.ui.clearNavigation('interestRealmNavigation', 'interestRealm');				
			}
			$statsMeMain.ui.changePage("statsMeCatalog");	// 카탈로그화면으로 이동
		},
		
	    /**
	     * 
	     * @name         : reportLoad
	     * @description  : 보고서 팝업에서 호출 데이터를 불러오는 함수.
	     * @date         : 2019. 10. 07. 
	     * @author	     : 김남민
	     * @history 	 : 
	     * @param		 : 
	     */
	    reportLoad : function() {
	    	var lv_data = $statsMeDetailInfo.ui.mapData.data;
	    	
	    	//서비스명
	    	$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_stat_data_nm").html($("#statsMeDetailInfoStatDataNm").html());
	    	if($("#statsMeDetailInfoStatDataNm").html() == "") $statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_stat_data_nm").css("height","30px");
	    	
	    	//통계자료설명
	    	$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_stat_data_exp").html($("#statsMeDetailInfoStatDataExp").html());
	    	if($("#statsMeDetailInfoStatDataExp").html() == "") $statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_stat_data_exp").css("height","30px");
	    	
	    	//작성일자
	    	var lv_now = new Date();
	    	var lv_yyyy = lv_now.getFullYear();
	    	var lv_mm = lv_now.getMonth()+1;
	    	var lv_dd = lv_now.getDate();
	    	var lv_hh = lv_now.getHours();
	    	var lv_mi = lv_now.getMinutes();
	    	var lv_ss = lv_now.getSeconds();
	    	$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_yyyymmdd").html(lv_yyyy+"년 "+lv_mm+"월 "+lv_dd+"일 "+lv_hh+"시 "+lv_mi+"분");
	    	
	    	//데이터 출처
	    	$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_source").html(lv_data.source);
	    	if(lv_data.source == undefined || lv_data.source == null || lv_data.source == "") $statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_source").css("height","30px");
	    	
	    	//SGIS 콘텐츠 출처
	    	$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_sgis").html($("#statsMeDetailInfoMenuNm>span>a").text());
	    	if($("#statsMeDetailInfoMenuNm>span>a").text() == "") $statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_sgis").css("height","30px");
	    	
	    	//메인 키워드
	    	$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_main_kwrd").html(lv_data.main_kwrd);
	    	if(lv_data.main_kwrd == undefined || lv_data.main_kwrd == null || lv_data.main_kwrd == "") $statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_main_kwrd").css("height","30px");
	    	
	    	//추천 서비스
    		var lv_html = "";
    		$("#statsMeDetailInfoRecomendSvc a").each(function() {
    			var lvThis = $(this);
    			var lvThisText = lvThis.text();
    			if(lv_html != "") lv_html += "<br>";
    			lv_html += lvThisText;
    		});
    		$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_recomend_svc_list").html(lv_html);
    		if(lv_html == "") {
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_recomend_svc_list").css("height","30px");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeDetailInfoReportForm_recomend_svc_list_div").hide();
    		}

	    	//20200811 박은식 reportForm2 리스트 표 생성 추가 start
    		if($("#statsMeMapReportForm_dataTable>tbody").children().length > 0 && $("#statsMeDetailInfoMap_color_sido_li").css("display") != "none"){
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable>thead").html($("#statsMeMapReportForm_dataTable>thead").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable>tbody>tr>th").css("border","1px solid #ccc");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable>tbody").html($("#statsMeMapReportForm_dataTable>tbody").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable>tbody>tr").show().css("font-weight","");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable>tbody>tr>td").css("padding","0px 5px").css("border","1px solid #ccc").css("color","");
    		}else{
    			$statsMeDetailInfo.ui.reportPopup.$("#gridAreaAll_show").parent().hide();
    		}
    		if($("#statsMeMapReportForm_dataTable1>tbody").children().length > 0 && $("#statsMeDetailInfoMap_color_sgg_li").css("display") != "none"){
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable1>thead").html($("#statsMeMapReportForm_dataTable1>thead").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable1>tbody>tr>th").css("border","1px solid #ccc");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable1>tbody").html($("#statsMeMapReportForm_dataTable1>tbody").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable1>tbody>tr").show().css("font-weight","");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable1>tbody>tr>td").css("padding","0px 5px").css("border","1px solid #ccc").css("color","");
    		}else{
    			$statsMeDetailInfo.ui.reportPopup.$("#gridArea1_show").parent().hide();
    		}
    		if($("#statsMeMapReportForm_dataTable2>tbody").children().length > 0 && $("#statsMeDetailInfoMap_color_emdong_li").css("display") != "none"){
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable2>thead").html($("#statsMeMapReportForm_dataTable2>thead").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable2>tbody>tr>th").css("border","1px solid #ccc");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable2>tbody").html($("#statsMeMapReportForm_dataTable2>tbody").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable2>tbody>tr").show().css("font-weight","");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable2>tbody>tr>td").css("padding","0px 5px").css("border","1px solid #ccc").css("color","");
    		}else{
    			$statsMeDetailInfo.ui.reportPopup.$("#gridArea2_show").parent().hide();
    		}
    		if($("#statsMeMapReportForm_dataTable3>tbody").children().length > 0 && $("#statsMeDetailInfoMap_color_totreg_li").css("display") != "none"){
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable3>thead").html($("#statsMeMapReportForm_dataTable3>thead").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable3>tbody>tr>th").css("border","1px solid #ccc");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable3>tbody").html($("#statsMeMapReportForm_dataTable3>tbody").html());
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable3>tbody>tr").show().css("font-weight","");
    			$statsMeDetailInfo.ui.reportPopup.$("#statsMeMapReportForm2_dataTable3>tbody>tr>td").css("padding","0px 5px").css("border","1px solid #ccc").css("color","");
    		}else{
    			$statsMeDetailInfo.ui.reportPopup.$("#gridArea3_show").parent().hide();
    		}
    		//20200811 박은식 reportForm2 리스트 생성 추가 end
    		
    		
	    	//지도 시각화 화면
	    	if($("#statsMeDetailInfoPrintForm_color_sido_yn").val() == "N" && $("#statsMeDetailInfoPrintForm_color_sgg_yn").val() == "N" && $("#statsMeDetailInfoPrintForm_color_emdong_yn").val() == "N" && $("#statsMeDetailInfoPrintForm_color_totreg_yn").val() == "N" && $("#statsMeDetailInfoPrintForm_color_100m_yn").val() == "N") {
	    		$statsMeDetailInfo.ui.reportPopup.$("#mainMapDiv").hide();
	    	}
	    	if($("#statsMeDetailInfoPrintForm_color_sido_yn").val() == "Y") {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_sido").attr("src",$("#statsMeDetailInfoPrintForm_color_sido_image").val());
	    	}
	    	else {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_sido_li").hide();
	    	}
	    	if($("#statsMeDetailInfoPrintForm_color_sgg_yn").val() == "Y") {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_sgg").attr("src",$("#statsMeDetailInfoPrintForm_color_sgg_image").val());
	    	}
	    	else {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_sgg_li").hide();
	    	}
	    	if($("#statsMeDetailInfoPrintForm_color_emdong_yn").val() == "Y") {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_emdong").attr("src",$("#statsMeDetailInfoPrintForm_color_emdong_image").val());
	    	}
	    	else {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_emdong_li").hide();
	    	}
	    	if($("#statsMeDetailInfoPrintForm_color_totreg_yn").val() == "Y") {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_totreg").attr("src",$("#statsMeDetailInfoPrintForm_color_totreg_image").val());
	    	}
	    	else {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_totreg_li").hide();
	    	}
	    	if($("#statsMeDetailInfoPrintForm_color_100m_yn").val() == "Y") {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_100m").attr("src",$("#statsMeDetailInfoPrintForm_color_100m_image").val());
	    	}
	    	else {
	    		$statsMeDetailInfo.ui.reportPopup.$("#reportMapDiv_color_100m_li").hide();
	    	}
	    }
	};

	$statsMeDetailInfo.event = {
		/**
		 * @name		 : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date		 : 2019.08.08 
		 * @author		 : 김남민
		 * @history 	 :
		 * @param
		 */
		setUIEvent : function() {
			var body = $("body");

			//시도
			body.on("click", "#statsMeDetailInfoMap_color_sido_li", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '10', '06', '00', '전국', '');

				$statsMeMap.ui.mapFirstMoveYn = "Y";
				//$statsMeMap.ui.mapMoveEventYn = "N";
				$statsMeMain.ui.changePage("statsMeMap");
				$statsMeMap.ui.drawMapData("sido","color");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("sido", "color");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			//시군구
			body.on("click", "#statsMeDetailInfoMap_color_sgg_li", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '10', '06', '00', '시도', '');
				
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				//$statsMeMap.ui.mapMoveEventYn = "N";
				$statsMeMain.ui.changePage("statsMeMap");
				$statsMeMap.ui.drawMapData("sgg","color");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("sgg", "color");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			//읍면동
			body.on("click", "#statsMeDetailInfoMap_color_emdong_li", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '10', '06', '00', '시군구', '');
				
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				//$statsMeMap.ui.mapMoveEventYn = "N";
				$statsMeMain.ui.changePage("statsMeMap");
				$statsMeMap.ui.drawMapData("emdong","color");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("emdong", "color");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			//소지역
			body.on("click", "#statsMeDetailInfoMap_color_totreg_li", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '10', '06', '00', '읍면동', '');
				
				$statsMeMap.ui.mapFirstMoveYn = "Y";
				//$statsMeMap.ui.mapMoveEventYn = "N";
				$statsMeMain.ui.changePage("statsMeMap");
				$statsMeMap.ui.drawMapData("totreg","color");
				
				$statsMeCatalog.ui.catalogMapSrvUsageHistory("totreg", "color");		//2020년 SGIS고도화 3차(My로그) 수정 (ggm)
			});
			
			//격자 100m
			body.on("click", "#statsMeDetailInfoMap_color_100m_li", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '10', '06', '00', '격자 100m', '');
				
				//$statsMeMain.ui.changePage("statsMeMap");
			});
			
			//인쇄 클릭
			body.on("click", "#statsMeDetailInfo_print", function() {
				// 2020.02.19 log 생성
			    srvLogWrite('N0', '10', '02', '00', $statsMeMain.ui.currentPageName, '');
				
				//스크롤 맨 밑으로 내리기(익스플로러 캡처오류)
	    		$("#statsMeDetailInfoContentBody").mCustomScrollbar("update");
	    		$("#statsMeDetailInfoContentBody").mCustomScrollbar("scrollTo", "bottom", {scrollInertia : 0});
	    		
	    		//바로 실행하면 익스플로러 캡처오류 발생함
	    		setTimeout(function() {
	    			$statsMeMap.ui.doPrint();
				}, 100);
			});
			
			//즐겨찾기 클릭
			body.on("click", "#statsMeDetailInfo_bookmark", function() {
				$("#statsMeMap_bookmark").trigger("click");
			});
			
			//뒤로 클릭
			body.on("click", "#statsMeDetailInfoBack", function() {
				// 2020.02.19 log 생성
				srvLogWrite('N0', '10', '01', '00', '', '');
				
				$statsMeMain.ui.changePage("statsMeMap");
			});
			
			/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 START */
			// 상세보기화면 데이터보기 테이블 페이징 이전 클릭
			body.on("click", "#statsMeDetailInfo_pagingTable_page_prev", function() {
				
				//이전 페이지 목록을 표시
				var lvPage = Number($("#statsMeDetailInfo_pagingTable_page").val())-1;
				if($("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_"+lvPage).length) {
					$("#statsMeDetailInfo_pagingTable>tbody>tr>td").hide();
					$("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_"+lvPage).show();
					//마지막 페이지 선택
					$("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_"+lvPage).last().click();
					$("#statsMeDetailInfo_pagingTable_page").val(lvPage);
				}
				//이전 페이지 없음
				else {
					//첫번째 페이지 선택
					$("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_1").first().click();
					//$statsMeMain.ui.alert("처음 페이지 입니다.");
				}
			});
			
			// 상세보기화면 데이터보기 테이블 페이징 다음 클릭
			body.on("click", "#statsMeDetailInfo_pagingTable_page_next", function() {

				//다음 페이지 목록을 표시
				var lvPage = Number($("#statsMeDetailInfo_pagingTable_page").val())+1;
				if($("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_"+lvPage).length) {
					$("#statsMeDetailInfo_pagingTable>tbody>tr>td").hide();
					$("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_"+lvPage).show();
					//첫번째 페이지 선택
					$("#statsMeDetailInfo_pagingTable>tbody>tr>td.page_"+lvPage).first().click();
					$("#statsMeDetailInfo_pagingTable_page").val(lvPage);
				}
				//다음 페이지 없음
				else {
					//이미 마지막 페이지 인 경우
					if($("#statsMeDetailInfo_pagingTable>tbody>tr>td").last().hasClass("on")) {
						$statsMeMain.ui.alert("마지막 페이지 입니다.");
					}
					//마지막 페이지 아닌 경우
					else {
						//마지막 페이지 선택
						$("#statsMeDetailInfo_pagingTable>tbody>tr>td").last().click();
					}
				}
			});

			// 상세보기화면 데이터보기 테이블 페이징 페이지 클릭
			body.on("click", "#statsMeDetailInfo_pagingTable>tbody>tr>td", function() {
				var lvThis = $(this);
				var lvThisText = lvThis.text();
			    
				//선택한 페이지로 세팅
				$("#statsMeDetailInfo_pagingTable>tbody>tr>td").removeClass("on");
				lvThis.addClass("on");
				
				//선택한 페이지 표시
				$("#statsMeDetailInfo_dataTable>tbody>tr").hide();
				$("#statsMeDetailInfo_dataTable>tbody>tr.page_"+lvThisText).show();
				$("#statsMeDetailInfo_dataTable_page").val(lvThisText);				
			});
			/** 2020.04.13[한광희] 상세정보화면에 데이터보드 데이터보기 table 추가 END */
		}
	};
}(window, document));