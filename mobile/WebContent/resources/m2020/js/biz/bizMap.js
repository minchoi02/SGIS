(function(W, D) {	
	W.$bizMap = W.$bizMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		$bizMap.event.setMapSize();
		$bizMap.ui.createMap("map");
		$bizMap.event.setUIEvent();
		
		$("#biztab .on").trigger("click");	// 화면 최초 로딩시 첫번째 업종 대분류 클릭 이벤트 호출		
		
		//네비게이션 추가
		$(".leftCol .btnNavThematic").click(function(){
			if(!$(this).hasClass('active')){
	    		$(this).addClass('active');
	    		$(".nav-layer").css("display","block");
	    		//2022-10-20 이벤트 추가
	    		$(".leftCol .btnNavThematic2").removeClass('active');
	    		$(".nav-layer2").css("display","none");
	    		$(".nav-layer3 .bizItemBox").css("display","none");
		    	$(".btnNavThematic3").removeClass('active');
	    	}else{
	    		$(this).removeClass('active');
	    		$(".nav-layer").css("display","none");
	    	}
	    });
		
		$(".leftCol .btnNavThematic2").click(function(){
			if(!$(this).hasClass('active')){
	    		$(this).addClass('active');
	    		$(".nav-layer2").css("display","block");
	    		$(".nav-layer3 .bizItemBox").css("display","none");
		    	$(".btnNavThematic3").removeClass('active');
		    	//2022-10-20 이벤트 추가
		    	$(".nav-layer").css("display","none");
		    	$(".btnNavThematic").removeClass('active');
	    	}else{
	    		$(this).removeClass('active');
	    		$(".nav-layer2").css("display","none");
	    	}
	    }); 
		$(".nav-layer2 #biztab div").click(function(){			
	    	$(".nav-layer2").css("display","none");
	    	$(".btnNavThematic2").removeClass('active');
	    	$(".nav-layer3 .bizItemBox").css("display","block");
	    	$(".btnNavThematic3").addClass('active');
	    }); 
		
		$(".leftCol .btnNavThematic3").click(function(){
			if(!$(this).hasClass('active')){
	    		$(this).addClass('active');
	    		$(".nav-layer3 .bizItemBox").css("display","block");
	    		$(".nav-layer2").css("display","none");
		    	$(".btnNavThematic2").removeClass('active');
		    	//2022-10-20 이벤트 추가
		    	$(".nav-layer").css("display","none");
		    	$(".btnNavThematic").removeClass('active');
	    	}else{
	    		$(this).removeClass('active');
	    		$(".nav-layer3 .bizItemBox").css("display","none");
	    	}
	    });
		
		$(".nav-layer3 .bizItemBox div").click(function(){			
	    	$(".nav-layer3 .bizItemBox").css("display","none");
	    	$(".btnNavThematic3").removeClass('active');
	    	//2022-10-24 이벤트 추가
	    	var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
	    	$(".btnNavThematic3").html($(this).text()+svg);
	    }); 
		
		
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$bizMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$bizMap.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$bizMap.ui = {
		map : null, //지도
		heatMapList : [],
		
		currentStateSgg : {
			infoData : null,
			rankData : null,
			adm_cd : null
		},
		
		//내 현재위치
		/** 2020.09.08[한광희] 위치 미동의시 기본위치 설정 추가 START */
		my_x : 989749.2142006928, // x
		my_y : 1817802.41717, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명
		/** 2020.09.08[한광희] 위치 미동의시 기본위치 설정 추가 END */
		searchAdmCd : null,
		
		/**
		 * @name : init
		 * @description : 초기화
		 * @date : 2020.07.10
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		init : function(){
			$bizMap.ui.map.gMap.setMaxZoom(13);
			$bizMap.ui.map.isDrawBoundary = false;
			
			function removeGeojson(obj){
				if(hasText(obj)){
					$.each(obj,function(){
						this.remove();
					});
				}
			}
			removeGeojson($bizMap.ui.currentState.geojson);
			removeGeojson($bizMap.ui.changeBusiness.geojson);
			
			if($bizMap.ui.map.dataBoundary){
				$bizMap.ui.map.dataBoundary.remove();
			}
			
			//열지도 클리어
			if ($bizMap.ui.map.heatMap) {
				$bizMap.ui.map.heatMap.remove();
			}			
		},
		
		/**
		 * @name : createMap
		 * @description : 지도 생성
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 * @param id :
		 *            html tag id
		 */
		createMap : function(id) {
			this.map = new sMap.map();
			this.map.isCurrentLocationMarker = false;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 990480.875, 1815839.375 ];
			this.map.zoom = 1;
			this.map.createMap($bizMap, id, {
			});
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.map.addControlEvent("drag");
			this.map.addControlEvent("dragend");
			this.map.gMap.whenReady(function() {
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				//지도 현재위치로 이동
				$bizMap.ui.map.moveCurrentLocation(true, function() {
					//맵의 중앙 adm_cd 가져오기
					$bizMap.ui.map.getCenterToAdmCd(null, function(res) {
						var lv_my_center = $bizMap.ui.map.gMap.getCenter();
						$bizMap.ui.my_x = lv_my_center.x;
						$bizMap.ui.my_y = lv_my_center.y;
						$bizMap.ui.my_sido_cd = res.result.sido_cd;
						$bizMap.ui.my_sido_nm = res.result.sido_nm;
						$bizMap.ui.my_sgg_cd = res.result.sgg_cd;
						$bizMap.ui.my_sgg_nm = res.result.sgg_nm;
						$bizMap.ui.my_emdong_cd = res.result.emdong_cd;
						$bizMap.ui.my_emdong_nm = res.result.emdong_nm;
						
						//내 위치 텍스트
						$("#myMapAreaText").text($bizMap.ui.my_sido_nm+" "+$bizMap.ui.my_sgg_nm);
						
						$bizMap.ui.search();
					});
				});
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});	
		},
		
		/**
		 * @name : search
		 * @description : 조회
		 * @date : 2020.07.10
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		search : function(){
			var type = $("#bizMapType li.on").data("type");
			var typeFunc = $bizMap.ui[changePipeToUpperCase(type)];
								
			if(typeof typeFunc!=="undefined"){
				if(typeof typeFunc.search==="function"){
					typeFunc.search();		//setGeoJson호출
				}else{
					console.error("search function 이 존재하지 않습니다");
				}
			}else{
				common_alert("잘못된 접근입니다");
			}
		},
		currentState : {//생활업종 현황보기
			adm_cd : null,//행정동 코드
			adm_nm : null,//행정동 이름
			geojson : null,//geojson
			theme_cd : null,//테마코드
			search : function(){				
				setGeojson("currentState");
			}
		},
		changeBusiness : {//업종밀집도 변화
			adm_cd : null,//행정동 코드
			adm_nm : null,//행정동 이름
			geojson : null,//geojson
			theme_cd : null,//테마코드
			search : function(){				
				changeBusiness("changeBusiness");
			}
		},
		
		/**
		 * @name : mapMove
		 * @description : 지도 이동
		 * @date : 2020.07.09
		 * @author : 한광희
		 * @history :
		 * @param 
		 */
		mapMove : function(adm_cd, x, y){
			var coord_x = "";
			var coord_y = ""; 
			var zoomlevel = "";
						
			// 지도 x,y 좌표 및 zoomlevel 설정
		    switch (adm_cd.length) {
				case 2:
					coord_x = x;
		            coord_y = y;
		            
		            if(adm_cd == '11' || adm_cd == '21' || adm_cd == '22' ||
		            		adm_cd == '24' || adm_cd == '25' || adm_cd == '26' || adm_cd == '29'){
		            	// 서울(11), 부산(21), 대구(22), 광주(24), 대전(25), 울산(26), 세종(29) 
		            	zoomlevel = 4;
		            } else if(adm_cd == '23' || adm_cd == '39') {
		            	// 인천(23), 제주(39)
		            	zoomlevel = 3;
		            } else if(adm_cd == '31' || adm_cd == '32' || adm_cd == '33' ||
		            		adm_cd == '34' || adm_cd == '35' || adm_cd == '36' || adm_cd == '37' || adm_cd == '38') {
		            	// 경기(31), 강원(32), 충북(33), 충남(34), 전북(35), 전남(36), 경북(37), 경남(38)
		            	zoomlevel = 2;
		            } else {
		            	zoomlevel = 1;
		            }
					break;
				case 5:
					coord_x = x;
		            coord_y = y;
		            zoomlevel = 6;
					break;
				default:
					coord_x = 990480.875;
		    		coord_y = 1815839.375;
		    		zoomlevel = 1;
					break;
			}
		    
		    $bizMap.ui.map.mapMove([coord_x, coord_y], zoomlevel, 0);	// 선택된 지역으로 이동
		},
		
		/**
		 * @name        : setCaption
		 * @description : 캡션
		 * @date        : 2020.07.20
		 * @author	    : 한광희
		 * @history 	:
		 * @param isOn  : 보여줄지 유무
		 */
		setCaption : function (isOn) {
			var boundaryList;
			if($bizMap.ui.changeBusiness.geojson){
				boundaryList = $bizMap.ui.changeBusiness.geojson;
			}else if($bizMap.ui.currentState){
				boundaryList = $bizMap.ui.currentState.geojson;
			}else{
				return false;
			}
			$.each(boundaryList,function(cnt,boundary){
				if(isOn===true){
					boundary.eachLayer(function(layer) {
						$bizMap.ui.drawCaption(boundary,layer);
					});
				}else{
					if(boundary != null) {
						boundary.eachLayer(function (layer) {
							layer.removeCaption();
						});
					}
				}
			});
		},
		
		/**
		 * @name           : setCaption
		 * @description    : 캡션 생성
		 * @date           : 2020.07.20
		 * @author	       : 한광희
		 * @history 	   :
		 * @param boundary : 경계
		 * @param layer    : 레이어
		 */
		drawCaption : function(boundary,layer){
			layer.removeCaption();
			if(layer.feature.properties.adm_cd.length > 7) {
				if(!hasText(layer.feature.properties.x)||!hasText(layer.feature.properties.y)){
					try{
						var center = layer.getCenter();
						layer.feature.properties.x = center.x;
						layer.feature.properties.y = center.y;
					}catch(e){
						console.warn(e);
					}
				}
			}
			var x = layer.feature.properties.x;
			var y = layer.feature.properties.y;
			if(x&&y){
				if(layer.feature.info&&layer.feature.info.length>0){
					var info = layer.feature.info[0];
					if(info.result){
						var value,color;
						if($.isNumeric(info.result[info.showData])){
							value = appendCommaToNumber(parseFloat(info.result[info.showData]));
							color = "#222222";
						}else{
							value = info.result[info.showData];
							color = "#c51404ff";
						}
						layer.setCaption({title:value, color:color}, [x,y]);
					}else{
						layer.setCaption({title:"N/A", color:"#fff"}, [x,y]);
					}
				}else{
					layer.setCaption({title:"N/A", color:"#fff"}, [x,y]);
				}
				if(layer.captionObj&&layer.captionObj._captionspan){
					$(layer.captionObj._captionspan).click(function(e){
						$.each(boundary.getLayers(),function(cnt,dataLayer){
							if(dataLayer._containsPoint){
								var point = $bizMap.ui.map.gMap.mouseEventToLayerPoint(e); // 터치 포인트
								if(dataLayer._containsPoint(point)){
									dataLayer.fire("click");
									return false;
								}
							}
						});
					});
				}
			}
		}
	};
	
	// 지도 콜백 함수 선언
	$bizMap.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type == "data"){
				// 지역 선택시 해당 지역 정보 표출 START
				var areaTitle = "";
				var areaData = "";
				var areaDataTitle = "";
				var showData = data.info[0].showData;
				if(areaTitle == "") areaTitle = data.properties.adm_nm;
				areaDataTitle += data.info[0].showDataName;
				areaData += appendCommaToNumber(data.info[0].result[showData]) + "(" + data.info[0].unit + ")";
				popup_area_click(data.properties.adm_cd, areaTitle, areaDataTitle, areaData);
				// 지역 선택시 해당 지역 정보 표출 END
			}
			//console.log("didSelectedPolygon - START");
		}
		,didEndBoundary : function(map,data){
			var adm_cd = map.getAdmCd();
			var adm_nm = "";
			$bizMap.ui.my_sido_cd = "";
			$bizMap.ui.my_sgg_cd = "";
			$bizMap.ui.my_emdong_cd = "";

			my_center = map.gMap.getCenter();
			$bizMap.ui.my_x = my_center.x;
			$bizMap.ui.my_y = my_center.y;
			
			if(adm_cd.length ==2){
				if(adm_cd == "00"){
					adm_nm = "전국";
					$bizMap.ui.my_sido_cd = "00";
				} else {
					adm_nm = map.curSidoNm;
					$bizMap.ui.my_sido_cd = map.curSidoCd;
				}
			} else if(adm_cd.length == 5){
				adm_nm = map.curSidoNm + " "+ map.curSggNm;
				$bizMap.ui.my_sido_cd = map.curSidoCd;
				$bizMap.ui.my_sgg_cd = map.curSggCd;
			} else {
				$bizMap.ui.my_sido_cd = map.curSidoCd;
				$bizMap.ui.my_sgg_cd = map.curSggCd;
				$bizMap.ui.my_emdong_cd = map.curEmdongCd;
			}
			
			if($bizMap.ui.searchAdmCd==null || adm_cd != $bizMap.ui.searchAdmCd){
				$bizMap.ui.searchAdmCd = adm_cd;
				$bizMap.ui.my_sido_nm = adm_nm;
				$("#myMapAreaText").text(adm_nm);
				$bizMap.ui.search();
			}
		}
		// 지도이동. createMap()에서 "movestart" 이벤트 선언시 콜백됨. 
		,didMapMoveStart : function(event, map) {
			//console.log("didMapMoveStart - START");
		}
		// 지도이동종료. createMap()에서 "moveend" 이벤트 선언시 콜백됨.
		,didMapMoveEnd : function(event, map) {
			//console.log("didMapMoveEnd - START");
		}
		// 줌 시작. createMap()에서 "zoomstart" 이벤트 선언시 콜백됨. 
		,didMapZoomStart : function(event, map) {
			//console.log("didMapZoomStart - START");
		}
		// 줌 종료. createMap()에서 "zoomend" 이벤트 선언시 콜백됨. 
		,didMapZoomEnd : function(event, map) {
			//console.log("didMapZoomEnd - START");
		}
		// 지도 드래그. createMap()에서 "drag" 이벤트 선언시 콜백됨. 
		,didMapDrag : function(event, map) {
			//console.log("didMapDrag - START");
		}
		// 지도 드래그 종료. createMap()에서 "dragend" 이벤트 선언시 콜백됨. 
		,didMapDragEnd : function(event, map) {
			//console.log("didMapDragEnd - START");
		}
	};
	
	$bizMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2020.07.06
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
			
			// 생활업종 대분류 선택 이벤트
			$("body").on("click", "#biztab div", function(){
				$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
				
				$("#biztab div").removeClass("on");
				$(this).addClass("on");
				
				/** 생활업종 중분류 표출/숨김/swiper 기능추가 START */
				var indexPageId = "#bizItem_" + $(this).attr("data-index");
				$("#bizItem>div").css("display", "none");
				//$(indexPageId).css("display", "flex"); //2022-10-06 수정
				$(indexPageId).css("display", "block");
				
				//2022-10-06 [송은미] btnNav title 추가 및 수정
				var title = $("#biztab div.on").html();
				var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
				$(".btnNavThematic3").html(title+svg);
				
				/*if($("#biztab div.on").attr('data-index') == "1"){
					$(".btnNavThematic2").html('음식'+svg); //2022-10-11 [송은미] btnNav 추가
					$(".btnNavThematic3").html('한식'+svg);
				}else if($("#biztab div.on").attr('data-index') == "2"){
					$(".btnNavThematic2").html('소매업'+svg);
					$(".btnNavThematic3").html('인테리어'+svg);
				}else if($("#biztab div.on").attr('data-index') == "3"){
					$(".btnNavThematic2").html('생활서비스'+svg);
					$(".btnNavThematic3").html('목욕탕'+svg);
				}else if($("#biztab div.on").attr('data-index') == "4"){
					$(".btnNavThematic2").html('숙박'+svg);
					$(".btnNavThematic3").html('호텔'+svg);
				}else if($("#biztab div.on").attr('data-index') == "5"){
					$(".btnNavThematic2").html('여가생활'+svg);
					$(".btnNavThematic3").html('PC방'+svg);
				}else if($("#biztab div.on").attr('data-index') == "6"){
					$(".btnNavThematic2").html('교육'+svg);
					$(".btnNavThematic3").html('교습학원'+svg);
				}else if($("#biztab div.on").attr('data-index') == "7"){
					$(".btnNavThematic2").html('의료'+svg);
					$(".btnNavThematic3").html('병원'+svg);
				}else if($("#biztab div.on").attr('data-index') == "8"){
					$(".btnNavThematic2").html('공공'+svg);
					$(".btnNavThematic3").html('우체국'+svg);
				}*/
				//2022-12-07 지표명 수정
				if($("#biztab div.on").attr('data-index') == "1"){
					$(".btnNavThematic2").html('음식'+svg);
					$(".btnNavThematic3").html('한식'+svg);
				}else if($("#biztab div.on").attr('data-index') == "2"){
					$(".btnNavThematic2").html('소매'+svg);
					$(".btnNavThematic3").html('인테리어'+svg);
				}else if($("#biztab div.on").attr('data-index') == "3"){
					$(".btnNavThematic2").html('생활'+svg);
					$(".btnNavThematic3").html('목욕탕'+svg);
				}else if($("#biztab div.on").attr('data-index') == "4"){
					$(".btnNavThematic2").html('숙박'+svg);
					$(".btnNavThematic3").html('호텔'+svg);
				}else if($("#biztab div.on").attr('data-index') == "5"){
					$(".btnNavThematic2").html('여가'+svg);
					$(".btnNavThematic3").html('PC방'+svg);
				}else if($("#biztab div.on").attr('data-index') == "6"){
					$(".btnNavThematic2").html('교육'+svg);
					$(".btnNavThematic3").html('교습학원'+svg);
				}else if($("#biztab div.on").attr('data-index') == "7"){
					$(".btnNavThematic2").html('의료'+svg);
					$(".btnNavThematic3").html('병원'+svg);
				}else if($("#biztab div.on").attr('data-index') == "8"){
					$(".btnNavThematic2").html('공공'+svg);
					$(".btnNavThematic3").html('우체국'+svg);
				}
				//$(indexPageId).find("span.swiper-notification").remove();
				//$(indexPageId).find("div").addClass("swiper-wrapper");
				//$(indexPageId).find("div>div").addClass("swiper-slide");
				/*var swiper = new Swiper(indexPageId, {
					slidesPerView: 4,
					spaceBetween: 10,
					pagination : {
						el : '.swiper-pagination',
						clickable : true,
					},
				});*/
				/** 생활업종 중분류 표출/숨김/swiper 기능추가 END */
			});
			
			// 생활업종 중분류 선택 이벤트
			$("body").on("click", "#bizItem>div>div>div", function(){
				srvLogWrite('O0', '09', '05', '02', $("#biztab div.on").text()+"|"+$(this).text(), '');
				$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
				
				$("#bizItem>div>div>div").removeClass("on");
				$(this).addClass("on");
				
				$bizMap.ui.search();
			});
			
			// 메뉴 선택 (생활업종현황/업종밀집도변화) 이벤트
			$("body").on("click", "#bizMapType>ul>li", function(){
				var type = $("#bizMapType li.on").data("type");
				$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
				
				// 업종밀집도변화
				if(type == "current-state"){
					srvLogWrite('O0', '09', '05', '03', '업종밀집도', '');
					$("#showNumberBtn").hide();	// 통계수치 이미지 숨김
					$("#showDataBoardBtn").show();	// 데이터보드
				}
				// 생활업종현황
				else {
					srvLogWrite('O0', '09', '05', '03', '생활업종현황', '');
					$("#showNumberBtn").show();	// 통계수치 이미지 표출
					$("#showDataBoardBtn").hide();	// 데이터보드
				}
				
				$("#bizMapType").find("li").removeClass("on");
				$(this).addClass("on");
				$bizMap.ui.search();
			});
			
			// 통계 표출 이미지 클릭
			$("body").on("click", "#showNumberBtn", function(){
				if(!$(this).hasClass("on")){
					$(this).addClass("on");
					srvLogWrite('O0', '51', '04', '00', 'ON', '');
					$bizMap.ui.setCaption(true);
				} else {
					$(this).removeClass("on");
					srvLogWrite('O0', '51', '04', '00', 'OFF', '');
					$bizMap.ui.setCaption(false);
				}
			});
			
			// 생활업종현황>데이터보드 서브 메뉴 클릭
			$("body").on("click", ".gallery-thumbstxt a", function(){
				$(".gallery-thumbstxt div").removeClass("current");
				$(this).parent().parent().addClass("current");
				var aTag = $(this);
				var rank = 0;
				
				// 업종 건수
				var themeInfo = "";
				$("#current-state-theme-info").empty();
				themeInfo += "<span class='pointCircle'></span>" + $("#bizItem div.on").text() + " " + aTag.text() + " : ";
				themeInfo += "<span>" + $bizMap.ui.currentStateSgg.infoData.result[aTag.data("type")] + "</span>" + aTag.data("unit") + (aTag.data("append-text")?aTag.data("append-text"):"");
				$("#current-state-theme-info").html(themeInfo);
								
				var data = [];
				var categoryes = [];
				var sgg_cd = $bizMap.ui.currentStateSgg.adm_cd.substring(2,5);
				// 2020-12-07 [곽제욱] 데이터보드 진입시 현재 시군구에 맞게 세팅 START
				var currentVal = "";  
				var currentSgg = ""; 
				// 2020-12-07 [곽제욱] 데이터보드 진입시 현재 시군구에 맞게 세팅 END
				$.each($bizMap.ui.currentStateSgg.rankData.result.sgg_info,function(cnt,node){
					var chart = {name:node.sgg_nm,y:parseFloat(node[aTag.data("type")]),sgg_cd:node.sgg_cd};
					if(node.sgg_cd==sgg_cd){
						chart.color = "#fe5800";
					}
					data.push(chart);
				});
				
				if($("#current-state-chart-area").highcharts()){
					$("#current-state-chart-area").highcharts().destroy();
				}
				var series = data.sort(dynamicSort("-y",true));
				
				// 시군구 랭킹
				$.each(series,function(cnt,node){
					if(node.sgg_cd==sgg_cd){
						// 2020-12-07 [곽제욱] 데이터보드 진입시 현재 시군구에 맞게 세팅 START
						currentVal= node.y; 
						currentSgg = node.name;
						// 2020-12-07 [곽제욱] 데이터보드 진입시 현재 시군구에 맞게 세팅 END
						rank= cnt+1;
						return false;
					}
				});
				
				// 차트 카테고리 셋팅
				$.each(series,function(cnt,node){
					categoryes.push(node.name);
				});
				
				// 시군구 랭킹
				var dataRankLocation = "";
				$("#current-state-data-location").empty();
				dataRankLocation += "<span class='pointCircle'></span>" + $("#current-state-location").text() + " "+$bizMap.ui.currentStateSgg.rankData.result.sgg_info.length + "개 시군구 중";
				dataRankLocation += "<span class='pointCount'>" + rank + "</span>위";
				$("#current-state-data-location").html(dataRankLocation);
				
				$('#current-state-chart-area').highcharts({
					chart: {
						backgroundColor: {
				            linearGradient: [500, 500, 500, 0],
				            stops: [
				            	[0, '#fff'],	// 하단 백그라운드 색
				            	[1, '#fff']	// 상단 백그라운드 색
				            ]
				        },
				        type: 'bar',
				        width: $(window).width(),
				        height: (data.length * 25)+100//$(window).height()-400 // 2020-12-08 [곽제욱] 차트 높이 변경 
				    },
				    title: {
				    	text: '개',
				        align: 'left',
				        margin: 10,
				        style: {
				            fontSize: '11px'
				        }
				    },
				    xAxis: {
				    	categories: categoryes
				    },
				    yAxis: {
				        title: {
				            text: ''
				        },
				        labels: {
				            formatter: function () {
				            	 return appendCommaToNumber(this.value);
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
				            shadow: false,
				            point: {
				                events: {
				                    click: function () {
				                        $("#current-state-chartCategoryTitle").html(this.category);	
				            			$("#current-state-chartDataTitle").html(appendCommaToNumber(this.y)+"<span>"+aTag.data("unit")+"</span>");	
				                    },
	                                update: function (event) {
	                                	$("#current-state-chartCategoryTitle").html(currentSgg); // 2020-12-07 [곽제욱] 화면 첫 진입시 on된 시군구정보 세팅
	                                	// 첫번째 데이터가 null 일 경우
	                                	if(this.y == null){
	                                		$("#current-state-chartDataTitle").html("0<span>" + aTag.data("unit") + "</span>"); 				                                		
	                                	}else {
	                                		$("#current-state-chartDataTitle").html(appendCommaToNumber(currentVal)+"<span>" +aTag.data("unit")+ "</span>"); // 2020-12-07 [곽제욱] 화면 첫 진입시 on된 시군구정보 세팅
	                                	}
	                                }
				                }
				            }
				        }
				    },

				    series: [{
				    	name : "",
				        data : series
				        }]
				});

				// 첫번째 데이터 클릭
		        var chart = $('#current-state-chart-area').highcharts();
		        chart.series[0].data[0].update();
		        
		        $(".graphArea").css("height", data.length*25+250) // 2020-12-08 [곽제욱] hightChart Div height 재적용
			});
			
			// 업종밀집도 변화>데이터보드 이미지 클릭
			$("body").on("click", "#showDataBoardBtn", function(){
				var themeVal = $("#bizItem>div>div>div.on").text();
				var themeCdVal = $("#bizItem div.on").data("id");
				
				$("#change-business-databoard").show();
				$("#title").html(themeVal);
				$("#data-lacation").html($("#myMapAreaText").text());
/*				$(".nav-layer").css("display","none"); //2022-11-15 추가
				$(".nav-layer2").css("display","none");
				$(".nav-layer3").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
				$(".leftCol .btnNavThematic2").removeClass('active');
				$(".leftCol .btnNavThematic3").removeClass('active');*/
				
				if($("#change-business-chart-area").highcharts()){
					$("#change-business-chart-area").highcharts().destroy();
				}
				var abs = new sop.portal.absAPI();
				abs.onBlockUIPopup();
				$bizMap.api.poiCompanyTimeSeries({
					"adm_cd":$bizMap.ui.changeBusiness.adm_cd,
					"year":$bizMap.ui.map.bnd_year,
					"theme_cd":themeCdVal
				},function(res){
					var data = [];
					var categoryes = [];
					$.each(res.result.companyList,function(cnt,node){
						data.push(parseFloat(node.cnt));
						categoryes.push(node.base_year);
					});
					
					$('#change-business-chart-area').highcharts({
						chart: {
							backgroundColor: {
					            linearGradient: [500, 500, 500, 0],
					            stops: [
					            	[0, '#fff'],	// 하단 백그라운드 색
					            	[1, '#fff']	// 상단 백그라운드 색
					            ]
					        },
					        type: 'column',
					        width: $(window).width(),
					        height: $(window).height()-300
					    },
					    title: {
					    	text: '개',
					        align: 'left',
					        margin: 10,
					        style: {
					            fontSize: '11px'
					        }
					    },
					    xAxis: {
					    	categories: categoryes
					    },
					    yAxis: {
					        title: {
					            text: ''
					        },
					        labels: {
					            formatter: function () {
					            	 return appendCommaToNumber(this.value);
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
					            shadow: false,
					            point: {
					                events: {
					                    click: function () {
					                        $("#change-business-chartCategoryTitle").html(this.category);	
					            			$("#change-business-chartDataTitle").html(appendCommaToNumber(this.y)+"<span>개</span>");	
					                    },
		                                update: function (event) {
		                                	$("#change-business-chartCategoryTitle").html(this.category);
		                                	// 첫번째 데이터가 null 일 경우
		                                	if(this.y == null){
		                                		$("#change-business-chartDataTitle").html("0<span>개</span>");				                                		
		                                	}else {
		                                		$("#change-business-chartDataTitle").html(appendCommaToNumber(this.y)+"<span>개</span>");
		                                	}
		                                }
					                }
					            }
					        }
					    },
	
					    series: [{
					    	name : "",
					    	colorByPoint: true,
					        data : data
					        }]
					});
	
					// 첫번째 데이터 클릭
			        var chart = $('#change-business-chart-area').highcharts();
			        chart.series[0].data[data.length-1].update();	// 2020.09.25[한광희] 업종밀집도 데이터보드 차트 마지막 수치 선택 수정
			        
					abs.onBlockUIClose();
				});
			});
			
			// 범례 버튼 클릭
			$("body").on("click", "#legendInfoBtn", function(){
				srvLogWrite('O0', '51', '05', '01', '', '');
				var type = $("#bizMapType li.on").data("type");
				
				if(type == "current-state"){
					if ($('.tooltipbox').css('visibility') == 'hidden'){
						$(this).addClass("on");
						$('.tooltipbox').css('visibility', 'visible');
					} else {
						$(this).removeClass("on");
						$('.tooltipbox').css('visibility', 'hidden');
					}
				} else if(type == "change-business"){
					if ($('#dataRemarks').css('visibility') == 'hidden'){
						$(this).addClass("on");
						$('#dataRemarks').css('visibility', 'visible');
					} else {
						$(this).removeClass("on");
						$('#dataRemarks').css('visibility', 'hidden');					
					}
				}
			});
			
			// 색상 범례 새로고침 이미지 클릭
			$("body").on("click", "#reverseBtn", function(){
				$bizMap.ui.map.legend.reverseColor();
			});
			
			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
				
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $bizMap.ui.my_sido_cd, $bizMap.ui.my_sgg_cd, $bizMap.ui.my_emdong_cd);
				}
				// 감춤
				else {
					lifeEnvironmentToggle(false);
				}
				//2022-11-15 추가
/*				$(".nav-layer").css("display","none");
				$(".nav-layer2").css("display","none");
				$(".nav-layer3").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
				$(".leftCol .btnNavThematic2").removeClass('active');
				$(".leftCol .btnNavThematic3").removeClass('active');*/
			});
			
			//생활환경 정보 상세보기
			$(document).on("click", "#lifeEnvironmentPopup_open", function() {
				srvLogWrite('O0', '51', '02', '02', '', '');
				var lvThis = $(this);
				var lvSidoCd = lvThis.attr("sido_cd");
				var lvSggCd = lvThis.attr("sgg_cd");
				var lvEmdongCd = lvThis.attr("emdong_cd");
				if(lvSidoCd == "null") lvSidoCd = "";
				if(lvSggCd == "null") lvSggCd = "";
				if(lvEmdongCd == "null") lvEmdongCd = "";
				if(lvSidoCd != undefined && lvSidoCd != null && lvSidoCd != "" && lvSidoCd != "99") {
					lifeEnvironmentPopupSelect(lvSidoCd, lvSggCd, lvEmdongCd);
				}
			});
			
			//생활환경 팝업 닫기
			$(document).on("click", "#lifeEnvironmentPopup_close", function() {
				lifeEnvironmentPopupToggle(false);
			});
			
			//생활환경 팝업 구분 선택
			$(document).on("click", "#lifeEnvironmentPopup_list > ul > li.infoMenu", function() {
				var lvThis = $(this);
				var lvThisIndex = lvThis.data("index");
				var lvThisText = lvThis.children("a").text();
				
				//메뉴 선택
				$("#lifeEnvironmentPopup_list > ul > li.infoMenu").removeClass("on");
				lvThis.addClass("on");
				
				//화면 표시
				$("#lifeEnvironmentPopup div.infoPage").hide();
				$("#lifeEnvironmentPopup_page_"+lvThisIndex).show();
			});
			
			//현재위치로 이동 버튼
			$(document).on("click", "#myMapLocation", function() {
				$('#dataRemarks').css('visibility', 'hidden');	// 범례 숨김
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				//위치동의 팝업 호출
				common_localtion(
					//지도변수
						$bizMap.ui.map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$bizMap.ui.my_x = my_x;
						$bizMap.ui.my_y = my_y;
						$bizMap.ui.my_sido_cd = my_sido_cd;
						$bizMap.ui.my_sido_nm = my_sido_nm;
						$bizMap.ui.my_sgg_cd = "";
						$bizMap.ui.my_sgg_nm = "";
						$bizMap.ui.my_emdong_cd = "";
						$bizMap.ui.my_emdong_nm = "";
						$bizMap.ui.searchAdmCd = my_sido_cd;
						
						//내 위치 텍스트
						$("#myMapAreaText").text($bizMap.ui.my_sido_nm+" "+$bizMap.ui.my_sgg_nm);
						
						$bizMap.ui.search();
					},
					//위치 미동의함
					function() {
					}
				);
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
			
			/** 2020.09.09[한광희] 범례 팝업 닫기(X) 버튼 추가 START */
			// 범례 닫기 버튼 이벤트
			$("body").on("click", "#dataRemarks_close", function(){
				$("#legendInfoBtn").removeClass("on");
				$('.tooltipbox').css('visibility', 'hidden');
			});
			
			// 열지도 범례 닫기 버튼 이벤트
			$("body").on("click", "#dataRemarkHeat_close", function(){
				$("#legendInfoBtn").removeClass("on");
				$('#dataRemarks').css('visibility', 'hidden');	
			});
			/** 2020.09.09[한광희] 범례 팝업 닫기(X) 버튼 추가 END */
		},
		
		/**
		 * @name : setMapSize
		 * @description : 지도 사이즈 변경
		 * @date : 2020.06.25
		 * @author : 한광희
		 * @history :
		 */
		setMapSize : function() {
			var lvMapHeight = Number($(window).outerHeight(true)) - Number($(".Wrap>.Header").outerHeight(true));
			$("#map").height(lvMapHeight);
		}		
	};
		
	/**
	 * @name           : setGeojson
	 * @description    : geo 셋팅 
	 * @date         : 2020.07.15 
	 * @author	     : 한광희
	 * @history        :
	 * @param type     : currentState(생활업종 현황보기),changeBusiness(업종밀집도 변화)
	 * @param callback : callback
	 */
	function setGeojson(type,callback){		
		if(type!="currentState"&&type!="changeBusiness"){
			common_alert("잘못된 접근입니다");
			return false;
		}
				
		var map = $bizMap.ui.map;
		$bizMap.ui.init();
		$bizMap.ui.map.gMap.setMinZoom(4);
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		var zoom = map.getZoomToCd($bizMap.ui.my_sido_cd);
				
		$bizMap.ui[type].adm_cd = $bizMap.ui.my_sido_cd;
		$bizMap.ui[type].adm_nm =  $bizMap.ui.my_sido_nm;
		
		var sidoCnt = 0;
		$bizMap.ui[type].geojson = {};
		
		$.ajax({
			type : "GET",
			url : sgisContextPath + "/js/data/geo_sgg_"+map.bnd_year+"/geo_sgg_"+$bizMap.ui.my_sido_cd+"_"+map.bnd_year+".js",
			async : true,
			success : function(res){
				if(res.errCd=="0"){
					$bizMap.ui[type].geojson[$bizMap.ui.my_sido_cd] = map.getSopBoundary(res);
					$bizMap.ui[type].geojson[$bizMap.ui.my_sido_cd].addTo(map.gMap);
				}
				
				$bizMap.ui[type].theme_cd = $("#bizItem div.on").data("id");
				
				$bizMap.api.sggtobcorpcount({theme_cd:$bizMap.ui[type].theme_cd},function(res){
					if(res.errCd=="0"){
						var data = [];
						$.each(res.result,function(cnt,node){
							if(node.sido_cd == $bizMap.ui.my_sido_cd){
								data.push(parseFloat($.isNumeric(node.corp_cnt)?node.corp_cnt:0));										
							}
						});
						map.data = [data];
						map.legend.calculateLegend([data]);
						
						$.each(res.result,function(cnt,node){
							if(node.sido_cd == $bizMap.ui.my_sido_cd){
								$.each($bizMap.ui[type].geojson[node.sido_cd].getLayers(),function(layerCnt,layer){
									if(layer.feature.properties.adm_cd==node.sido_cd+node.sgg_cd){
										var showData = $.isNumeric(node.corp_cnt)?node.corp_cnt:"N/A";
										layer.feature.info = [];
										layer.feature.info[0] = {
												showDataName : node.theme_cd_nm,
												showData : "corp_cnt",
												unit : "개",
												result : node
										};
										layer.setStyle({
											weight : layer.options.weight,
											color : "white",
											dashArray : 1.75,
											fillOpacity : 0.7,
											fillColor : map.legend.getColor(node.corp_cnt, map.legend.valPerSlice[0])[0],
											type:"data"
										});
										if($bizMap.ui.map.showCaption===true){
											$bizMap.ui.drawCaption($bizMap.ui[type].geojson[node.sido_cd],layer);
										}
										return false;
									}
								});										
							}
						});
						map.legend.updateLegendRangeColor();
						
						//내 위치 텍스트
						$("#myMapAreaText").text($bizMap.ui.my_sido_nm);
						
						// 통계지표 표출 선택 여부에 따른 값 표출
						if($("#showNumberBtn").hasClass("on")){
							$bizMap.ui.setCaption(true);
						} else {
							$bizMap.ui.setCaption(false);
						}
					}
					abs.onBlockUIClose();
					if(typeof callback === "function"){
						callback();
					}
				});
			},
			dataType: "json",
			error:function(e){
				abs.onBlockUIClose();
			} 
		});
		
		// 지도 이동
		$bizMap.ui.mapMove($bizMap.ui.my_sido_cd, $bizMap.ui.my_x, $bizMap.ui.my_y);
	}
	
	/**
	 * @name           : changeBusiness
	 * @description    : geo 셋팅 
	 * @date           : 2017. 02. 07. 
	 * @author	       : 김도형
	 * @history        :
	 * @param type     : changeBusiness(업종밀집도 변화)
	 * @param callback : callback
	 */
	function changeBusiness(type,callback){
		var map = $bizMap.ui.map;
		$bizMap.ui.init();
		$bizMap.ui.map.gMap.setMaxZoom(11);
		var abs = new sop.portal.absAPI();
		abs.onBlockUIPopup();
		var zoom = map.getZoomToCd($bizMap.ui.my_sido_cd+$bizMap.ui.my_sgg_cd);
		
		var v_theme_cd = $("#bizItem div.on").data("id");
				
		$bizMap.ui[type].adm_cd = $bizMap.ui.my_sido_cd+$bizMap.ui.my_sgg_cd;
		$bizMap.ui[type].adm_nm =  $bizMap.ui.my_sido_nm+$bizMap.ui.my_sgg_nm;
		
		$bizMap.ui.changeBusiness.theme_cd = v_theme_cd;
		
		$bizMap.api.poiCompanyDensity(
		{
			theme_cd:v_theme_cd, 
			year:this.companyDataYear,
			adm_cd:$bizMap.ui[type].adm_cd
			
		},function(res){
			if(res.errCd=="0"){
				var options = $bizMap.options;
				var minOpacity = 0.01;
				var radius = map.heatRadius;
				var blur = map.heatBlur;
				var zoomLevelHeat = map.zoomLevelHeat;
				var max = 1;
				
				var heat = sop.heatLayer();
				heat.addTo(map.gMap);
				
				map.heatMap = heat;
				
				if (map.heatMap) {
					map.heatMap.setUTMKs([]);
				}
				
				if ($bizMap.ui.heatMapList[options.map.id] == null) {
					$bizMap.ui.heatMapList[options.map.id] = {
							type : "heatMap",
							data : [],
							theme_cd : options.params.theme_cd,
							year : options.params.year,
							data_type : options.type,
							adm_cd : options.params.adm_cd
					};
				}else{
					$bizMap.ui.heatMapList[options.map.id]["data"]=[];
					$bizMap.ui.heatMapList[options.map.id]["data_type"] = options.type;
					$bizMap.ui.heatMapList[options.map.id]["adm_cd"] = options.params.adm_cd;
				}			
				
				var companyList = res.result;
				var tmpData = [];
				for (var i=0; i<companyList.length; i++) {
					tmpData.push(companyList[i].cnt);
				}
				
				map.data = [tmpData];
				
				var max = null;
				var radius = 20;
				var blur = 30;
				
				//타입별 열지도 표출
				//1:전국시도, 2:시군구, 3:읍면동
				//1,2일 경우, 가중치 열지도(집계), 3일경우, 기본 열지도(POI)
				switch(parseInt(options.type)) {
					case 1:
					case 2:
						max = Math.max.apply(null, tmpData);
						map.zoomLevelHeat = false;
						
						if(map.heatMap != null){
							map.heatRadius = radius;
							map.heatBlur = blur;
							
							var hMax = max;
							var zlHeat = true;
							if (map.zoomLevelHeat) {
								hMax = 1;
							}

							//열지도 
							map.heatMap.setOptions({
								minOpacity: 0.01,
								radius: radius,
								blur: blur,
								max: hMax,
								zoomLevelHeat : this.zoomLevelHeat
							});
							
						}
						
						$bizMap.ui.heatMapList[options.map.id].data_type = options.type;
						
						for (var i=0; i<companyList.length; i++) {
							$bizMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
							if (map.heatMap) {
								map.heatMap.addUTMK([
									 parseFloat(companyList[i].x),
									 parseFloat(companyList[i].y),
									 companyList[i].cnt
								]);
							}
							if(i == companyList.length-1){
								//alert(companyList.length + "complate");
							}
						}
						break;
					case 3:
						max = Math.max.apply(null, tmpData);
						map.zoomLevelHeat = false;
						
						if(map.heatMap != null){
							map.heatRadius = radius;
							map.heatBlur = blur;

							var hMax = max;
							var zlHeat = true;
							if (map.zoomLevelHeat) {
								hMax = 1;
							}

							//열지도 
							map.heatMap.setOptions({
								minOpacity: 0.01,
								radius: radius,
								blur: blur,
								max: hMax,
								zoomLevelHeat : this.zoomLevelHeat
							});
							
						}
						
						$bizMap.ui.heatMapList[options.map.id].data_type = options.type;
						
						for (var i=0; i<companyList.length; i++) {
							$bizMap.ui.heatMapList[options.map.id]["data"].push(companyList[i]);
							if (map.heatMap) {
								map.heatMap.addUTMK([
									 parseFloat(companyList[i].x),
									 parseFloat(companyList[i].y),
									 companyList[i].cnt
								]);
							}
							if(i == companyList.length-1){
								//alert(companyList.length + "complate");
							}
						}
						break;
				}
			}
			
			abs.onBlockUIClose();
			
		});
				
		//열지도 범례 start
		var radius = 20;
		var blur = 30;
		$("#heatRadiusText").html("20");
		$("#heatRadiusSlider").slider({
		    range: false, 
			min : 5,
			max : 40,
			values : [20],
		    slide : function(e, ui) {
		       $("#heatRadiusText").html(ui.value);
		       	radius = ui.value;
				map.heatMap.setOptions({
					minOpacity: 0.01,
					radius: radius,
					blur: blur,
					max: 1,
					zoomLevelHeat : this.zoomLevelHeat
				});
		    }
		});
		
		$("#heatBlurText").html("30");
		
		//흐림도 조절
		$("#heatBlurSlider").slider({
		    range: false, 
			min : 20,
			max : 120,
			values : [30],
		    slide : function(e, ui) {
		    	$("#heatBlurText").html(ui.value);
		    		blur = ui.value;
					map.heatMap.setOptions({
						minOpacity: 0.01,
						radius: radius,
						blur: blur,
						max: 1,
						zoomLevelHeat : this.zoomLevelHeat
					});
				}
		});
	}
	
	/**
	 * @name : popup_area_click
	 * @description : 지도 선택에 따른 정보 팝업
	 * @date : 2020.07.09
	 * @author : 한광희
	 * @history :
	 * @param
	 * 		p_adm_cd : 지역코드
	 * 		p_title : 지역명
	 * 		p_dataTitle : 정보 제목
	 * 		p_data : 정보
	 * 		p_callback : 확인버튼시 동작할 함수
	 */
	function popup_area_click(p_adm_cd, p_title, p_dataTitle, p_data, p_callback){
		//화면 띄움
		$("#popup_back").parent().show();
		$("#popup_area_click").show();
		$("#bizMapAreaTitle").html(p_title);
		$("#bizMapAreaDataTitle").html(p_dataTitle + " : ");
		$("#bizMapAreaData").html(p_data);
		//2022-11-15 추가
		$(".nav-layer").css("display","none");
		$(".leftCol .btnNavThematic").removeClass('active');
		
		// 알림 창 화면 중앙에 위치
		$("#popup_area_click").css({"top": (($(window).height()-$("#popup_area_click").outerHeight())/2+$(window).scrollTop())+"px"})
		
		//이전 이벤트 제거
		$("#popup_back").unbind();
		
		//새로운 이벤트 맵핑
		$("#popup_back").click(function() {
			//팝업 숨김
			$("#popup_back").parent().hide();
			$("#popup_area_click").hide();
		});
		
		// 데이터보드 버튼 이벤트
		$("#databoardBtnPopup").click(function(){
			srvLogWrite('O0', '09', '05', '04', '', '');
			//팝업 숨김
			$("#popup_back").parent().hide();
			$("#popup_area_click").hide();
			$("#current-state-databoard").show();
			//2022-11-15 추가
			$(".nav-layer").css("display","none");
			$(".leftCol .btnNavThematic").removeClass('active');
			
			$bizMap.ui.currentStateSgg.adm_cd = p_adm_cd;
			$("#current-state-location").text(p_title);
			$("#current-state-title").text(p_dataTitle);
			
			$bizMap.api.info("sgg", {"sgg_cd":$bizMap.ui.currentStateSgg.adm_cd, "theme_cd":$("#bizItem div.on").data("id")}, function(info){
				$bizMap.ui.currentStateSgg.infoData = info;
				$bizMap.api.rank("sgg", {"sgg_cd":$bizMap.ui.currentStateSgg.adm_cd, "theme_cd":$("#bizItem div.on").data("id")}, function(res){
					$bizMap.ui.currentStateSgg.rankData = res;
					$(".gallery-thumbstxt a:first").trigger("click");
				});
			});			
		});
		
		/** 2020.09.08[한광희] 지도 영역 클릭시 알림 팝업 닫기(X) 버튼 추가 START */
		$("#popup_area_click_close").click(function(){
			//팝업 숨김
			$("#popup_back").parent().hide();
			$("#popup_area_click").hide();
		});
		/** 2020.09.08[한광희] 지도 영역 클릭시 알림 팝업 닫기(X) 버튼 추가 END */
	}
}(window, document));	