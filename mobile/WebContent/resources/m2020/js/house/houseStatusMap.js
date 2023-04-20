(function(W, D) {
	var activeFillColor = "#c00";
	var activeFillOpacity = "0.7";
	var defaultFillOpacity = "0.2";
	
	W.$houseStatusMap = W.$houseStatusMap || {};

	// 페이지 로드 이벤트
	$(document).ready(function() {
		/** 2020.09.02[한광희] 메인화면 살고싶은 우리동네 정보 카드 link 추가 START */
		// 메인화면 카드 클릭시 지표값 있을경우 해당 지표의 첫번째 항목 선택하도록 수정
		if(b_class_idx_id != ""){
			$("#housetab li").removeClass("on");
			$("#housetab li>a[data-id="+b_class_idx_id+"]").parent().addClass("on");
			
			var tempIndexPage = "#houseStatus_indexPage_" + $("#housetab li.on").attr("data-index");
			//$(tempIndexPage).find("li").eq(0).find(".hopeCard").click();
		}
		/** 2020.09.02[한광희] 메인화면 살고싶은 우리동네 정보 카드 link 추가 END */
		
		// 목록 상단 리스트 좌우 스크롤
		$("#houseMap_list").touchFlow({
			axis : "x"
			,page : "li.on"	// 2020.09.02[한광희] 메인화면 살고싶은 우리동네 정보 카드 link 추가
		});
						
		$houseStatusMap.event.setMapSize();
		$houseStatusMap.ui.createMap("map");
		$houseStatusMap.event.setUIEvent();
		
		
		$(".leftCol .btnNavThematic").click(function(){
			var svg = '<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z" fill="#222222"/></svg>';
	    	if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".nav-layer").css("display","block");
        	}else{
        		$(this).removeClass('active');
        		$(".nav-layer").css("display","none");
        	}
        });
		
		
				
		$("#housetab li.on>a").trigger("click");	// 화면 최초 로딩시 첫번째 지표설정 대분류 클릭 이벤트 호출
	});

	// 윈도우 크기 변경시 윈도우 맞춤.
	$(window).resize(function() {
		setTimeout(function() {
			$houseStatusMap.event.setMapSize();
		}, 100);
	});
	// 가로세로 모드 변경시 윈도우 맞춤.
	$(window).on("orientationchange", function() {
		setTimeout(function() {
			$houseStatusMap.event.setMapSize();
		}, 100);
	});

	// 페이지 UI 변수 및 함수 선언
	$houseStatusMap.ui = {
		map : null, //지도
		activeAdmCd : null,//현재 활성화된 곳의 행정동 코드
		originalActiveAdmCd : null,//검색한 행정동 코드
		searchAdmCd : null,
		houseStatusSwiper : null,
		isIndicator : false,//지도에 통계 셋팅한 것이 지표인지 유무
		
		//내 현재위치
		/** 2020.09.02[한광희] 기본 위치 정보 설정으로 인한 수정 START */
		my_x : 989749.2142006928, // x
		my_y : 1817802.41717, // y
		my_sido_cd : "25", // 시도코드
		my_sido_nm : "대전광역시", // 시도명
		my_sgg_cd : "030", // 시군구코드
		my_sgg_nm : "서구", // 시군구명
		my_emdong_cd : "60", // 읍면동코드
		my_emdong_nm : "둔산2동", // 읍면동명
		/** 2020.09.02[한광희] 기본 위치 정보 설정으로 인한 수정 */
		
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
			this.map.chooseLegendColor = [
				 {"background":"rgb(149, 50, 102)","start":"#cccccc","end":"#953266"},
				 {"background":"rgb(127,173,62)","start":"#cccccc","end":"rgb(127,173,62)"},
				 {"background":"rgb(25,126,191)","start":"#cccccc","end":"rgb(25,126,191)"},
				 {"background":"rgb(219,76,96)","start":"#cccccc","end":"rgb(219,76,96)"},
				 {"background":"rgb(222,170,0)","start":"#cccccc","end":"rgb(222,170,0)"},
				 {"background":"rgb(229,99,47)","start":"#cccccc","end":"rgb(229,99,47)"},
				 {"background":"rgb(126, 56, 116)","start":"#cccccc","end":"rgb(126, 56, 116)"},
				 {"background":"rgb(28, 44, 129)","start":"#cccccc","end":"rgb(28, 44, 129)"}
				];
			this.map.isCurrentLocationMarker = true;
			this.map.isAutoRefreshCensusApi = false;
			this.map.isDrawBoundary = false;
			this.map.center = [ 990480.875, 1815839.375 ];
			this.map.zoom = 1;
			this.map.createMap($houseStatusMap, id, {
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
				$houseStatusMap.ui.map.moveCurrentLocation(true, function() {
					//맵의 중앙 adm_cd 가져오기
					$houseStatusMap.ui.map.getCenterToAdmCd(null, function(res) {
						var lv_my_center = $houseStatusMap.ui.map.gMap.getCenter();
						$houseStatusMap.ui.my_x = lv_my_center.x;
						$houseStatusMap.ui.my_y = lv_my_center.y;
						$houseStatusMap.ui.my_sido_cd = res.result.sido_cd;
						$houseStatusMap.ui.my_sido_nm = res.result.sido_nm;
						$houseStatusMap.ui.my_sgg_cd = res.result.sgg_cd;
						$houseStatusMap.ui.my_sgg_nm = res.result.sgg_nm;
						$houseStatusMap.ui.my_emdong_cd = res.result.emdong_cd;
						$houseStatusMap.ui.my_emdong_nm = res.result.emdong_nm;
						
						//내 위치 텍스트
						//$("#myMapAreaText").text($houseStatusMap.ui.my_sido_nm+" "+$houseStatusMap.ui.my_sgg_nm);
						//2022-11-21 svg 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
						$("#myMapAreaText").html($houseStatusMap.ui.my_sido_nm+svg+$houseStatusMap.ui.my_sgg_nm);
						
						/** 주거현황 녹지비율 디폴트 선택 후 조회 START */
						if($("#housetab li[class^=infoMenu].on").find("a").data("id") == "HML0001"){
							$(".hopeCard_check>input:checkbox[id=HMM0003]").trigger("click");	// 지표 중분류 선택
						}else{
							var tempIndexPage = "#houseStatus_indexPage_" + $("#housetab li.on").attr("data-index");
							$(tempIndexPage).find("li").eq(0).find(".hopeCard").click();
						}
						/** 주거현황 녹지비율 디폴트 선택 후 조회 END */
					});
				});
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
		},
				
		/**
		 * @name            : getMapOptions
		 * @description     : 지도 옵션 얻기
		 * @date            : 2020.07.06
		 * @author	        : 한광희
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
				zoom = 2;
				if(adm_cd.length>=5&&adm_cd.substring(2,5)!="999"){
					sgg_cd = adm_cd.substring(2,5);
					zoom = 4;
					if(adm_cd.length>=7&&adm_cd.substring(5,7)!="00"){
						emdong_cd = adm_cd.substring(5,7);
						zoom = 7;
					}
				}
			}
						
			return {zoom:zoom,sido_cd:sido_cd,sgg_cd:sgg_cd,emdong_cd:emdong_cd,adm_cd:sido_cd+sgg_cd+emdong_cd};
		},
		
		
		/**
		 * @name                : abode
		 * @description         : 주거현황보기 검색
		 * @date                : 2020.07.06
		 * @author	            : 한광희
		 * @history 	        :
		*/
		abode : {
			search : function(){
				var abs = new sop.portal.absAPI();
				var mapOption;
				var locationSelectBox;
				
				mapOption = $houseStatusMap.ui.getMapOptions($houseStatusMap.ui.mapStat.indicator.adm_cd);
				locationSelectBox = $("#look-abode-"+(mapOption.adm_cd&&mapOption.adm_cd.length>=5?"sgg":"sido")+" option:selected");
				if(mapOption.adm_cd&&mapOption.adm_cd!="00"){
					$houseStatusMap.ui.searchAdmCd = mapOption.adm_cd;
				}else{
					/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
					$houseStatusMap.ui.searchAdmCd = $houseStatusMap.ui.my_sido_cd+$houseStatusMap.ui.my_sgg_cd;	// 2020.09.02[한광희] 기본 위치 정보 설정으로 인한 수정
					/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
				}
				
				if($("input:checkbox[name=houseIndex]:checked").length > 0){
					$houseStatusMap.ui.recommendMarker = null;
					abs.onBlockUIPopup();
					
					var element = $("input:checkbox[name=houseIndex]:checked").parent().find("label");
					var compareLevel = element.data("level");
					$houseStatusMap.ui.mapStat.indicator.b_class_idx_id = element.data("parent-id");
					$houseStatusMap.ui.mapStat.indicator.m_class_idx_id = element.data("id");
					
					if($houseStatusMap.ui.mapStat.indicator.getSearchLevel($houseStatusMap.ui.mapStat.indicator.adm_cd)>compareLevel){
						var compareLevelText,resultMessage;
						if(compareLevel==1){
							compareLevelText = "시도";
							resultMessage = "관심지역변경에서 시도 선택박스를 \"전국\"으로 선택해주세요.";
						}else if(compareLevel==2){
							compareLevelText = "시군구";
							resultMessage = "관심지역변경에서 시군구 선택박스를 \"전체\"으로 선택해주세요.";
						}
						common_alert("\""+element.data("text")+"\" 지표는 "+compareLevelText+"까지만 조회할 수 있습니다.<br>"+resultMessage);
						abs.onBlockUIClose();
						return;
					} else {
						if($houseStatusMap.ui.my_sido_cd != null && $houseStatusMap.ui.my_sgg_cd != null){
							$houseStatusMap.ui.map.mapMove([$houseStatusMap.ui.my_x,$houseStatusMap.ui.my_y],$houseStatusMap.ui.getMapOptions($houseStatusMap.ui.searchAdmCd).zoom);
							setTimeout(function(){
								$houseStatusMap.ui.mapStat.indicator.search(function(){
									abs.onBlockUIClose();
								});
							},500);
						}else{
							$houseStatusMap.ui.map.mapMove([990480.875,1815839.375],2);
							$houseStatusMap.ui.mapStat.indicator.search(function(){
								abs.onBlockUIClose();
							});
						}
					}
					
				} else {
					abs.onBlockUIPopup();
					setTimeout(function(){
						$houseStatusMap.ui.map.isAutoRefreshCensusApi = true;
						$houseStatusMap.ui.map.legend.legendOptionPanel.find(".colorck a:eq(0)").click();
						$houseStatusMap.ui.map.legend.legendOptionPanel.find(" .btn_roption>.bg_blue").click();
						$.each($("#legend-option-"+$houseStatusMap.ui.map.id+" li a.circle"),function(){
							$(this).data({
								"start":$(this).data("original-start"),
								"end":$(this).data("original-end")
							});
						});
						$houseStatusMap.ui.map.censusApi.setStatsMapCensusData("API_0301",{
							"showData" : "tot_ppltn",
							"showDataName" : "총인구",
							"unit" : "명",
							"callback" : function(data){
								$("#databaord-area-button").removeClass("NoneAction");
								$houseStatusMap.ui.activeAdmCd = mapOption.adm_cd;
								$houseStatusMap.ui.originalActiveAdmCd = mapOption.adm_cd;
								abs.onBlockUIClose();
							}
						},{
							"year":censusDataYear,
							"bnd_year":$houseStatusMap.ui.map.bnd_year
						});
					},500);
				}
				
				// 선택한 지역 명칭 설정
				$("#maptit").text(element.data("text"));
				// 조회목록 리스트 안보이도록 설정
				$("#result_list2").animate({height: 0},300);
				// 위치 정보에 따른 지도 이동
				if($houseStatusMap.ui.my_sgg_cd == "999"){
					adm_cd = $houseStatusMap.ui.my_sido_cd;
				} else {
					adm_cd = $houseStatusMap.ui.my_sido_cd + $houseStatusMap.ui.my_sgg_cd;
				}
				$houseStatusMap.ui.mapMove(adm_cd, $houseStatusMap.ui.my_x, $houseStatusMap.ui.my_y);
			}
		},
						
		mapStat : {//지도에 통계 셋팅해주는 부분
			indicator : {
				b_class_idx_id : null,//대분류
				m_class_idx_id : null,//중분류
				adm_cd : null,//행정동 코드
				/**
				 * @name         : getSearchLevel
				 * @description  : 
				 * @date         : 2020.07.09
				 * @author	     : 한광희
				 * @history 	 :
				 * @param adm_cd : 행정동 코드
				 */
				getSearchLevel : function(adm_cd){
					var mapOption = $houseStatusMap.ui.getMapOptions(adm_cd);
					var searchLevel = null;
					if(!hasText(mapOption.adm_cd)){
						searchLevel = 1;
					}else if(mapOption.adm_cd.length==2){
						searchLevel = 2;
					}else if(mapOption.adm_cd.length==5){
						searchLevel = 3;
					}else{
						searchLevel = 4;
					}
					
					return searchLevel;
				},
				/**
				 * @name         : search
				 * @description  : 지표 검색
				 * @date         : 2020.07.09
				 * @author	     : 한광희
				 * @history 	 :
				 */
				search : function(callback){
					var map = $houseStatusMap.ui.map;
					var abs = new sop.portal.absAPI();
					abs.onBlockUIPopup();
					$houseStatusMap.ui.isIndicator = true;
					/** 2020.09.10[한광희] 위치 미동의시 기준지역(대전 서구 둔산2동) 설정 START */
					if(this.adm_cd==null){
						this.adm_cd = $houseStatusMap.ui.my_sido_cd+$houseStatusMap.ui.my_sgg_cd;	/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 */
					}
					/** 2020.09.10[한광희] 위치 미동의시 기준지역(대전 서구 둔산2동) 설정 END */
					
					var mapOption = $houseStatusMap.ui.getMapOptions(this.adm_cd);
					var searchLevel = this.getSearchLevel(mapOption.adm_cd);
					var mClassObject = bClassInfoList[this.b_class_idx_id].indicator[$houseStatusMap.ui.mapStat.indicator.m_class_idx_id];
					var year = bndYear;
					$houseStatusMap.ui.map.borough = null;
					if(this.b_class_idx_id=="HML0005"&&this.m_class_idx_id=="HMM0018"){//대중교통 이용자 비율
						year= "2010"
					}else if(
						(this.b_class_idx_id=="HML0003"&&this.m_class_idx_id=="HMM0012")||//순유입인구
						(this.b_class_idx_id=="HML0006"&&this.m_class_idx_id=="HMM0020")//교원 1인당 학생수		
					){
						$houseStatusMap.ui.map.borough = "1";
						year= "2014";
					}
					map.bnd_year = year;
					
					if(searchLevel>parseInt(mClassObject.disp_level)){
						searchLevel = parseInt(mClassObject.disp_level);
					}
					if(searchLevel==1){
						mapOption = $houseStatusMap.ui.getMapOptions(null);
					}else if(searchLevel==2){
						mapOption = $houseStatusMap.ui.getMapOptions(mapOption.adm_cd.substring(0,2));
					}else if(searchLevel==3){
						mapOption = $houseStatusMap.ui.getMapOptions(mapOption.adm_cd.substring(0,5));
					}else{
						return;
					}
					this.adm_cd = mapOption.adm_cd;
					$houseMap.api.houseAnalysisOrderLists(searchLevel,this.b_class_idx_id,this.m_class_idx_id,year,mapOption.sido_cd,mapOption.sgg_cd,function(res){
						var isNegative = false,showData = "value",reverseArray = [],startColor,endColor;
						if(
							$houseStatusMap.ui.mapStat.indicator.b_class_idx_id=="HML0001"&&
							($houseStatusMap.ui.mapStat.indicator.m_class_idx_id=="HMM0001"||$houseStatusMap.ui.mapStat.indicator.m_class_idx_id=="HMM0002")
						){
							showData = "z_score";
						}
						$.each(bClassInfoList,function(bCnt,bNode){
							$.each(bNode.indicator,function(mCnt,mNode){
								if(
									mNode.b_class_idx_id=="HML0004"||//안전 지표
									(
										mNode.b_class_idx_id=="HML0007"&&
										(
											mNode.m_class_idx_id=="HMM0023"||//유치원 및 보육시설
											mNode.m_class_idx_id=="HMM0024"||//병의원 및 약국
											mNode.m_class_idx_id=="HMM0025"||//노인복지시설
											mNode.m_class_idx_id=="HMM0026"//사회복지시설
										)
									)||
									(mNode.default_value=="1"&&mNode.order_base_disp=="2"&&mNode.order_base=="2")||//높음,낮음 선택할 수 있는 지표중 낮음이 기본인 지표
									(mNode.default_value=="1"&&mNode.order_base_disp=="2"&&mNode.order_base=="4")//많음,적음 선택할 수 있는 지표중 적음이 기본인 지표
								){
									reverseArray.push(mNode.m_class_idx_id);
								}
							});
						});
						$.each(res.result,function(cnt,node){
							if(parseFloat(node[showData])<0){
								isNegative = true;
								return false;
							}
						});
						var legendColorButton = map.legend.legendOptionPanel.find("a[data-end=rgb\\("+$houseStatusMap.ui.bClassInfoList[mClassObject.b_class_idx_id].rgbColor.replace(/,/gi,"\\,")+"\\)]");
						$.each($("#legend-option-"+$houseStatusMap.ui.map.id+" li a.circle"),function(){
							if(reverseArray.indexOf($houseStatusMap.ui.mapStat.indicator.m_class_idx_id)>-1){
								$(this).data("start",$(this).data("original-end"));
								if(isNegative){
									$(this).data("end","#0066aa");
								}else{
									$(this).data("end",$(this).data("original-start"));
								}
							}else{
								$(this).data("end",$(this).data("original-end"));
								if(isNegative){
									$(this).data("start","#0066aa");
								}else{
									$(this).data("start",$(this).data("original-start"));
								}
							}
						});
						legendColorButton.trigger("click");
						map.legend.legendOptionPanel.find(" .btn_roption>.bg_blue").click();
						map.setStatsData({
							adm_cd : mapOption.adm_cd,
							showData : showData,
							showDataName : mClassObject.m_class_idx_nm,
							unit : res.result[0].unit,
							callback : function(){
								map.legend.legendPanel.show();
								abs.onBlockUIClose();
								if(typeof callback === "function"){
									callback(mapOption);
								}
							}
						},res.result,{
							year : year
						});
					});
				}				
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
		    
		    $houseStatusMap.ui.map.mapMove([coord_x, coord_y], zoomlevel, 0);	// 선택된 지역으로 이동
		}
	};
	
	// 지도 콜백 함수 선언
	$houseStatusMap.callbackFunc = {
		// 해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type == "data"){
				// 지역 선택시 해당 지역 정보 표출 START
				var areaTitle = "";
				var areaData = "";
				var areaDataTitle = "";
				var showData = data.info[0].showData;
				if(areaTitle == "") areaTitle = data.properties.adm_nm;
				areaDataTitle += data.info[0].parameter.year + "년 " + data.info[0].showDataName + " : ";
				areaData += appendCommaToNumber(data.info[0][showData]) + "(" + data.info[0].unit + ")";
				common_popup_area_click(areaTitle, areaDataTitle, areaData);
				// 지역 선택시 해당 지역 정보 표출 END
				//2022-11-15 추가
				$(".nav-layer").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
			}
			//console.log("didSelectedPolygon - START");
		}
		,didStartBoundary : function(map){
		}
		,didEndBoundary : function(map,data){
			var adm_cd = map.getAdmCd();
			var adm_nm = "";
			/** 2020.09.02[한광희] 기본 위치 정보 설정으로 인한 수정 START */
			/*$houseStatusMap.ui.my_sido_cd = "";
			$houseStatusMap.ui.my_sgg_cd = "";
			$houseStatusMap.ui.my_emdong_cd = "";*/
			/** 2020.09.02[한광희] 기본 위치 정보 설정으로 인한 수정 END */
			if(adm_cd.length ==2){
				if(adm_cd == "00"){
					adm_nm = "전국";
					$houseStatusMap.ui.my_sido_cd = "00";
				} else {
					adm_nm = map.curSidoNm;
					$houseStatusMap.ui.my_sido_cd = map.curSidoCd;
				}
			} else if(adm_cd.length == 5){
				/*adm_nm = map.curSidoNm + " "+ map.curSggNm;*/	//2022-12-20 수정
				var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
				adm_nm = map.curSidoNm + svg + map.curSggNm;
				$houseStatusMap.ui.my_sido_cd = map.curSidoCd;
				$houseStatusMap.ui.my_sgg_cd = map.curSggCd;
			} else {
				$houseStatusMap.ui.my_sido_cd = map.curSidoCd;
				$houseStatusMap.ui.my_sgg_cd = map.curSggCd;
				$houseStatusMap.ui.my_emdong_cd = map.curEmdongCd;
			}
			if($houseStatusMap.ui.isIndicator==true){
				if($houseStatusMap.ui.searchAdmCd==null || adm_cd != $houseStatusMap.ui.searchAdmCd){
					$houseStatusMap.ui.searchAdmCd = adm_cd;
					$houseStatusMap.ui.activeAdmCd = adm_cd;
					$houseStatusMap.ui.originalActiveAdmCd = adm_cd;
					$houseStatusMap.ui.mapStat.indicator.adm_cd = adm_cd?adm_cd:"00";
					$houseStatusMap.ui.mapStat.indicator.search();
					/*$("#myMapAreaText").text(adm_nm);*/	//2022-12-20 수정
					$("#myMapAreaText").html(adm_nm);
				}				
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
	
	$houseStatusMap.event = {
		/**
		 * @name : setUIEvent
		 * @description : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date : 2020.07.06
		 * @author : 한광희
		 * @history :
		 */
		setUIEvent : function() {
			// 관심지역 설정 클릭 이벤트
			$("body").on("click", "#selectArea", function(){
				common_area(
						"sgg",	// 관심지역 표출 범위
						$houseStatusMap.ui.my_sido_cd,
						$houseStatusMap.ui.my_sgg_cd,
						"", // 읍면동 코드
						// 변경
						function(x_coor, y_coor, sido_cd, sido_nm, sgg_cd, sgg_nm, emdong_cd, emdong_nm) {
							//변수 입력
							$houseStatusMap.ui.my_x = x_coor;
							$houseStatusMap.ui.my_y = y_coor;
							$houseStatusMap.ui.my_sido_cd = sido_cd;
							$houseStatusMap.ui.my_sido_nm = sido_nm;
							$houseStatusMap.ui.my_sgg_cd = sgg_cd;
							$houseStatusMap.ui.my_sgg_nm = sgg_nm;
							$houseStatusMap.ui.my_emdong_cd = "";
							$houseStatusMap.ui.my_emdong_nm = "";
							$houseStatusMap.ui.mapStat.indicator.adm_cd = sido_cd+sgg_cd;
							
							//내 위치 텍스트
							//$("#myMapAreaText").text($houseStatusMap.ui.my_sido_nm+" "+$houseStatusMap.ui.my_sgg_nm);
							//2022-11-21 svg 추가
							var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
							
							if($houseStatusMap.ui.my_sido_cd == "00" ){
								$("#myMapAreaText").html($houseStatusMap.ui.my_sido_nm);
							}else if($houseStatusMap.ui.my_sido_cd != "00" && $houseStatusMap.ui.my_sgg_cd == "999"){
								$("#myMapAreaText").html($houseStatusMap.ui.my_sido_nm);
							}else{
								$("#myMapAreaText").html($houseStatusMap.ui.my_sido_nm+svg+$houseStatusMap.ui.my_sgg_nm);
							}
							
							$houseStatusMap.ui.abode.search();	// 데이터 조회														
						},
						// 취소
						function() {
						}
				);
				//2022-11-15 추가
				$(".nav-layer").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
			});
			
			// 지표 대분류 선택
			$("#housetab li[class^=infoMenu]>a").click(function(){
				var continueStatus = true;
				
				if($(this).is(".on")){
					continueStatus = false;
				}
				
				if(continueStatus){
					$(this).parents("#housetab").find("li[class^=infoMenu]").removeClass("on");
					$(this).parent("li").addClass("on");
					
					var indexPageId = "#houseStatus_indexPage_" + $(this).parent("li").attr("data-index");
					$(".hopeCardbox").css('display', 'none');
					$(indexPageId).css('display', 'flex');
				}
					
				/** 지표설정 중분류 swiper 기능 추가 START */
				$(indexPageId).find("span.swiper-notification").remove();
				$(indexPageId).find("ul:first").addClass("swiper-wrapper");
				$(indexPageId).find("ul:first>li").addClass("swiper-slide");
				var swiper = new Swiper(indexPageId, {
					slidesPerView: 3,
					spaceBetween: 5,
					pagination : {
						el : '.swiper-pagination',
						clickable : true,
					},
				});
				/** 지표설정 중분류 swiper 기능 추가 END */
								
				return false;
			});
			
			// 지표설정 중분류(중요도) 박스 선택
			$("body").on("click", ".hopeCard", function(){
				$(this).find("input[type='checkbox']").trigger("click");
			});
			
			// 지표설정 중분류(중요도) 선택
			$(".hopeCard_check input[type='checkbox']").click(function(){
				// 지표선택 단건
				$("input:checkbox[name=houseIndex]:checked").prop("checked", false);
				$(this).prop("checked", true);
				srvLogWrite('O0', '09', '04', '02', $(this).siblings().data('subj'), '');
				
				$houseStatusMap.ui.abode.search();	// 데이터 조회
			});
						
			// 지표선택 위아래 스와이프 펼치기/접기
			$("#houseListBtn").swipe({
	            threshold : 10,
	            //펼치기
	            swipeUp:function(event, direction) {
	               $("#result_list2").animate({height: 243},300);
	            },
	            //접기
	            swipeDown:function(event, direction) {
	               $("#result_list2").animate({height: 0},300);
	            },
	            //클릭
	            tap:function(event, target) {
	               if($("#result_list2").height() > 0){
	                  $("#result_list2").animate({height: 0},300);
	                  $(".swiperBtn").removeClass("close"); // 버튼 화살표 변경되도록 class 추가
	                  $('.Btnarea h2.tit svg').css({'transform':'rotate(180deg)'});
	                  $(".sop-map-pane").css("transform","translate3d(0px,0px,0px)"); //2022-11-03 추가
	               } else {
	                  $("#result_list2").animate({height: 243},300);
	                  $(".swiperBtn").addClass("close"); // 버튼 화살표 변경되도록 class 추가
	                  $("#common_popup_area").css("display","none"); //관심지역 닫기
	                  $('.Btnarea h2.tit svg').css({'transform':'rotate(0deg)'});
	                  $(".sop-map-pane").css("transform","translate3d(0px,-200px,0px)"); //2022-11-03 추가
	                  $(".nav-layer").css("display","none"); //2022-11-15 추가
	  				  $(".leftCol .btnNavThematic").removeClass('active');
	               }
	            }
	         });
						
			//생활환경 정보 이미지 클릭
			$(document).on("click", "#lifeEnvironmentToggle", function() {
				srvLogWrite('O0', '51', '02', '01', '', '');
				var lvThis = $(this);
				// 표시
				if(lvThis.hasClass("infoOff")) {
					lifeEnvironmentToggle(true, $houseStatusMap.ui.my_sido_cd, $houseStatusMap.ui.my_sgg_cd, $houseStatusMap.ui.my_emdong_cd);
				}
				// 감춤
				else {
					lifeEnvironmentToggle(false);
				}
				//2022-11-15 추가
				$(".nav-layer").css("display","none");
				$(".leftCol .btnNavThematic").removeClass('active');
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
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 START */
				// 위치동의 팝업 호출
				common_localtion(
					//지도변수
					$houseStatusMap.ui.map,
					//위치 동의함
					function(my_x, my_y, my_sido_cd, my_sido_nm, my_sgg_cd, my_sgg_nm, my_emdong_cd, my_emdong_nm) {
						//변수 입력
						$houseStatusMap.ui.my_x = my_x;
						$houseStatusMap.ui.my_y = my_y;
						$houseStatusMap.ui.my_sido_cd = my_sido_cd;
						$houseStatusMap.ui.my_sido_nm = my_sido_nm;
						$houseStatusMap.ui.my_sgg_cd = my_sgg_cd;
						$houseStatusMap.ui.my_sgg_nm = my_sgg_nm;
						$houseStatusMap.ui.my_emdong_cd = my_emdong_cd;
						$houseStatusMap.ui.my_emdong_nm = my_emdong_nm;
						
						$houseStatusMap.ui.mapStat.indicator.adm_cd = my_sido_cd+my_sgg_cd;
						$houseStatusMap.ui.searchAdmCd = my_sido_cd+my_sgg_cd;
						//내 위치 텍스트
						//$("#myMapAreaText").text($houseStatusMap.ui.my_sido_nm+" "+$houseStatusMap.ui.my_sgg_nm);
						//2022-11-21 svg 추가
						var svg = '<svg width="12" height="8" viewBox="0 0 14 8" fill="#2277F2" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C6.71875 8 6.46875 7.90625 6.28125 7.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L7 5.59375L11.2812 1.3125C11.6562 0.90625 12.3125 0.90625 12.6875 1.3125C13.0938 1.6875 13.0938 2.34375 12.6875 2.71875L7.6875 7.71875C7.5 7.90625 7.25 8 7 8Z"></path></svg>';
						$("#myMapAreaText").html($houseStatusMap.ui.my_sido_nm+svg+$houseStatusMap.ui.my_sgg_nm);
					},
					//위치 미동의함
					function() {
					}
				);
				/** 2020.09.10[한광희] 위치 미동의시 기준지역 설정 END */
			});
			
			// 범례 버튼 클릭
			$("body").on("click", "#legendInfoBtn", function(){
				srvLogWrite('O0', '51', '05', '01', '', '');
				if ($('.tooltipbox').css('visibility') == 'hidden'){
					$(this).addClass("on");
					$('.tooltipbox').css('visibility', 'visible');
				} else {
					$(this).removeClass("on");
					$('.tooltipbox').css('visibility', 'hidden');
				}
			});
			
			// 색상 범례 새로고침 이미지 클릭
			$("body").on("click", "#reverseBtn", function(){
				$houseStatusMap.ui.map.legend.reverseColor();
			});
			
			/** 2020.09.09[한광희] 범례 팝업 닫기(X) 버튼 추가 START */
			// 범례 닫기 버튼 이벤트
			$("body").on("click", "#dataRemarks_close", function(){
				$("#legendInfoBtn").removeClass("on");
				$('.tooltipbox').css('visibility', 'hidden');
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
}(window, document));	