(function(W, D) {
	W.$interactive = W.$interactive || {};
	$(document).ready(function() {
		
		if(sop.Browser.mobile){
			$("#search-item-box button.myposition").addClass("sop-touch");
		}
		$interactive.event.setUIEvent();
		
		
		
		$("#menuListToggle").click(function(){ 
		//	mapAreaToggle();
			if($("#itemArea").css("display")=="block"){
				$("#itemArea").hide();
			}else{
				$("#itemArea").show();
			}
		})
		
		
		$(".chartAreaCloseBtn").click(function(){ 
				mapAreaToggle();
				$("#chart-area").hide();
				$("#table-area").hide();
				
				
				
				
		})
		
		
		// mng_s 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
		$interactive.ui.setMainIndexDataYears();
		$interactive.ui.setCorpDataYears();
		$interactive.ui.setPplFamilyHouseDataYears();
		$interactive.ui.setNongImOgaDataYears();
		// mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
		
	});
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$interactive.event.mapResize();
		},100);
	});
	$interactive.ui = {
		map : null,
		subNavigation : {
			menu : null//메뉴의 네비게이션
		},
		createMap: function(id) {
			this.map = new sMap.map();
			this.subNavigation.menu = new mapNavigation.UI(this.map);
			this.subNavigation.menu.navigatorId = "map-navigator-sub-";
			this.subNavigation.menu.initialize();
			this.map.isDrawBoundary = false;
			this.map.center = [989674, 1818313];
			this.map.zoom = 1;
			var bookmark = W.bookmark;
			var sgisSearch = false;//통합검색에서 넘어온지 여부
			var sgisSearchParams = {};
			if(bookmark){
				if(bookmark.mapInfo){
					if(bookmark.mapInfo.center){
						this.map.center = bookmark.mapInfo.center;
					}
					if(bookmark.mapInfo.zoomlevel){
						this.map.zoom = bookmark.mapInfo.zoomlevel;
					}					
				}
				if(bookmark.paramInfo&&bookmark.paramInfo.bnd_year){
					this.map.bnd_year = bookmark.paramInfo.bnd_year;
				}
			}else if(getParameter("type")&&getParameter("params")&&getParameter("title")){
				sgisSearch = true;
				$.each(decodeURIComponent(getParameter("params")).split("&"),function(cnt,node){
					var splitText = node.split("=")
					sgisSearchParams[splitText[0]] = splitText[1];
				});
				if(getParameter("x")&&getParameter("y")){
					this.map.center = [getParameter("x"),getParameter("y")];
				}
				if(getParameter("adm_cd")){
					this.map.zoom = this.map.getZoomToCd(getParameter("adm_cd"));
				}
				if(sgisSearchParams.year){
					this.map.bnd_year = sgisSearchParams.year;
				}
			}
			this.map.createMap($interactive, id, {
				isMapCaptionToggleControl : true,
				isZoomControl : true,
				isCurrentControl : true,
				isMapSizeControl : true,
				isMapStatToggleControl : false,
				mapStatToggleOption : {
					defaultShowMapStat : false
				},
				isPoiControl : true,
				isMapNavigator : true,
				navigatorOption : {
					id : "map-navigator-"
				}
			});
			if(bookmark){
				if(bookmark.isKosis==true){
					messageAlert.open("알림", "모바일에선 kosis데이터를 조회할 수 없습니다");
				}else{
					var map = this.map;
					accessTokenInfo(function(){
						if(bookmark.legend){
							if(map.legend.legendColor){
								map.legend.legendColor = bookmark.legend.color; 
							}
							if(map.legend.level){
								map.legend.lv = bookmark.legend.level;
							}
						}
						map.censusApi.setStatsMapAdmCdCensusData(bookmark.api_id,{
							"showData" : bookmark.showData,
							"showDataName" : map.censusApi[bookmark.api_id].showName[bookmark.showData],
							"unit" : bookmark.unit,
							"adm_cd" : bookmark.paramInfo.adm_cd,
							"callback" : function(data){
								$interactive.search.setArea(data, bookmark.showData, map.censusApi[bookmark.api_id].showName[bookmark.showData], bookmark.unit);
							}
						},{
							"bnd_year" : bookmark.paramInfo.bnd_year,
							"year" : bookmark.paramInfo.year
						});
					});
				}
			}else if(sgisSearch){
				if(sgisSearchParams.isKosis==true){
					messageAlert.open("알림", "모바일에선 kosis데이터를 조회할 수 없습니다");
				}else{
					var map = this.map;
					var sgisSearchOptions = getSearchOption(this.map,function(){
						if(hasText(getParameter("title"))){
							setMaptitle($("#map-title>h3"),decodeURIComponent(getParameter("title")));
							
							
						}
					});
					if(sgisSearchOptions){
						accessTokenInfo(function(){
							map.censusApi.setStatsMapAdmCdCensusData(getParameter("type"),sgisSearchOptions,sgisSearchParams);
						});
					}
				}
			}
			this.map.addControlEvent("movestart");
			this.map.addControlEvent("moveend");
			this.map.addControlEvent("zoomstart");
			this.map.addControlEvent("zoomend");
			this.createBookmarkShareControl();
			$(".bookmarkShareControl").css("");
			this.map.createInfoWindow("topright");
			this.map.moveCurrentLocation(false);
		},
		/**
		 * @name          : createBookmarkShareControl
		 * @description   : 북마크,공유 버튼 생성
		 * @date          : 2016. 03. 26. 
		 * @author        : 나광흠
		 * @history       :
		 */
		createBookmarkShareControl : function() {
			var bookmarkShareControl = sop.control({
				position: 'topleft'
			});
			bookmarkShareControl.onAdd = function(map) {
				this._div = sop.DomUtil.create('div', 'bookmarkShareControl sop-bar');
				var bookmark = $("<a/>", {
					id: "bookmarkControl_" + $interactive.ui.map.id,
					"class": "bookmark_control",
					style: ""
				});
				var share = $("<a/>", {
					id: "shareControl_" + $interactive.ui.map.id,
					"class": "share_control",
					title: "공유"
				});
				$(this._div).append(
					bookmark,
					share
				);
				sop.DomEvent.disableClickPropagation(this._div);
				sop.DomEvent.disableScrollPropagation(this._div);
				this.update(bookmark, share);
				return this._div;
			};
			bookmarkShareControl.update = function(bookmark, share) {
				var history = function(searchText,hist_type,callback){
					var lastParameters = $interactive.ui.map.censusApi.lastParameters;
					var statParameter = $.extend(true,{},lastParameters.parameter);
					statParameter.adm_cd = $interactive.ui.map.getAdmCd();
					statParameter.low_search = "1";
					var center = $interactive.ui.map.gMap.getCenter();
					var parameters = {
						"showData": lastParameters.option.showData,
						"api_id": lastParameters.api,
						"unit": lastParameters.option.unit,
						"title": $interactive.ui.map.censusApi[lastParameters.api].showName[lastParameters.option.showData],
						"mapInfo": {
							"center": [center.x,center.y],
							"zoomlevel": $interactive.ui.map.gMap.getZoom()
						},
						"legend": {
							"level": $interactive.ui.map.legend.lv,
							"color": $interactive.ui.map.legend.legendColor,
							"type": "color"
						},
						"btntype": "normal",
						"isKosis": false,
						"maxYear": statParameter.year,
						"paramInfo": statParameter
					};
					$.ajax({
						type: "POST",
						url: contextPath+"/history.json",
						data:{
							param_info : JSON.stringify(parameters),
							api_call_url : $interactive.ui.map.censusApi[lastParameters.api].url,
							hist_nm : searchText,
							hist_type : hist_type,
							map_type : "IMAP"
						},
						dataType: "json",
						async : false,
						success: function(res) {
							if(res.errCd=="0"){
								if(typeof callback === "function"){
									callback(res);
								}
							}else{
								messageAlert.open("알림", res.errMsg);
							}
						},
						error: function(xhr, status, errorThrown) {
							messageAlert.open("알림", errorMessage);
						}
					});
				};
				var validation = function(){
					if(sop.isLogin){
						if(Object.keys($interactive.ui.map.censusApi.lastParameters).length>0){
							return true;
						}else{
							messageAlert.open("알림", "즐겨찾기는 통계조회 후 이용할 수 있습니다.");
							return false;
						}
					}else{
						messageConfirm.open(
							"알림", 
							"즐겨찾기 기능은 로그인 후 이용하실 수 있습니다.<br>로그인 하시겠습니까?",
							[{
								title : "로그인",
								func : function() {
									login();
									return false;
								}
							},{title : "취소"}]
						);
						return false;
					}
				};
				var cancel = {
					title:"닫기"
				};
				bookmark.click(function(){//북마크
					if(validation()){
						var ok = {
							title:"My Page 저장",
							func : function() {
								
								srvLogWrite('M0','05', '02', '06', '', '');		//즐겨찾기
								
								var searchText = $(this).find("input[type=text].alertInputBox").val();
								if(searchText==undefined||searchText.replace(/ /,"")==""){
									messageAlert.open("알림", "저장 제목을 입력하세요",function(){
										bookmark.click();
									});
								}else{
									history(searchText,"BMARK",function(){
										messageAlert.open("알림", "즐겨찾기에 등록이 되었습니다");
									});
								}
							}
						};
						messagePrompt.open("조회한 통계결과 My Page 저장하기","",[ok,cancel],$interactive.ui.map.censusApi.lastParameters.option.showDataName,"저장 제목을 입력하세요",function(id){
							$("#popupInput"+id).keyup(function(e){
								if(e.keyCode == 13){
									search($("#popupInput"+id).val());
									$("#wrapper_"+id).remove();
								}
							})
						});
					}
				});
				share.click(function(){
					if(validation()){
						messageConfirm.open("알림","해당 통계정보를 공유하시겠습니까?",[{
							title:"확인",
							func : function() {
								srvLogWrite('M0','05', '02', '07', '', '');		//공유하기
								history($interactive.ui.map.censusApi.lastParameters.option.showDataName,"SHARE",function(res){
									var url = encodeURIComponent(location.origin+location.pathname+"?id="+res.id);
									var html = '';
									html+='<input type="text" class="alertInputBox" value="'+location.origin+location.pathname+"?id="+res.id+'">';
									html+='<div style="text-align:center;height:50px;">';
									html+='	<div style="width:'+(100/3)+'%;float:left;">';
									html+='		<a onclick="$interactive.ui.shareToKakaoStory(\''+url+'\');">';
									html+='			<img src="'+contextPath+'/resources/images/common/sns_kakao.png">';
									html+='		</a>';
									html+='	</div>';
									html+='	<div style="width:'+(100/3)+'%;float:left;">';
									html+='		<a href="https://www.facebook.com/sharer/sharer.php?u='+url+'">';
									html+='			<img src="'+contextPath+'/resources/images/common/sns_fb.png">';
									html+='		</a>';
									html+='	</div>';
									html+='	<div style="width:'+(100/3)+'%;float:left;">';
									html+='		<a href="https://twitter.com/intent/tweet?url='+url+'">';
									html+='			<img src="'+contextPath+'/resources/images/common/sns_tw.png">';
									html+='		</a>';
									html+='	</div>';
									html+='</div>';
									messageConfirm.open("조회한 통계결과 URL공유하기","",[cancel],html);
								});
							}
						},cancel]);
					}
				});
			};
			bookmarkShareControl.addTo($interactive.ui.map.gMap);
		},
		/**
		 * @name          : shareToKakaoStory
		 * @description   : 카카오스토리 공유
		 * @date          : 2016. 03. 26. 
		 * @author        : 나광흠
		 * @history       :
		 * @param url     : url
		 */
		shareToKakaoStory: function(url) {
			Kakao.Auth.login({
				success: function(authObj) {
					Kakao.API.request({
						url: '/v1/api/story/linkinfo',
						data: {
							url: url
						},
					}).then(function(res) {
						res.description = $interactive.ui.map.censusApi.lastParameters.option.showDataName;
						return Kakao.API.request({
							url: '/v1/api/story/post/link',
							data: {
								link_info: res
							}
						});
					}).then(function(res) {
						return Kakao.API.request({
							url: '/v1/api/story/mystory',
							data: {
								id: res.id
							},
							success: function(res) {
								messageAlert.open("알림", "카카오스토리에 정상적으로 공유하였습니다.");
							},
							fail: function(error) {
								messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>(" + error.error_description + ")");
							}
						});
					});
				},
				fail: function(error) {
					messageAlert.open("알림", "카카오스토리에 공유를 실패하였습니다.<br>(" + error.error_description + ")");
				}
			})
		},
		/**
		 * @name             : search
		 * @description      : 센서스 데이터 검색
		 * @date             : 2016. 03. 22. 
		 * @author	         : 나광흠
		 * @history          :
		 */
		search: function(){ 
			$("#map-title>h3").empty();
			$("#map-title").hide();
			var map = $interactive.ui.map;
			var itemNavi = $interactive.ui.subNavigation.menu;
			itemNavi.move(function(){
				var visibleBox = $("#search-box>div:visible:not(#Btn_Search_Detail)");
				if(visibleBox.length>0&&$interactive.search[visibleBox.data("id")]()){
					$("#search-item-box").hide();
				}
			});
		},
		/**
		 * @name         : setItemCurrentLocationNavigator
		 * @description  : 검색조건에 있는 네비게이터 셋팅
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param
		 */
		setItemCurrentLocationNavigator : function(){
			var map = $interactive.ui.map;
			map.getCurrentLocation(function(center,success,errCd,errMsg){
				map.reverseGeoCode("20",center,function(res){
					var result = res.result[0];
					var navi = map.mapNavigation.navigatorId;
					$interactive.ui.subNavigation.menu.setSido(result.sido_cd,result.sgg_cd,result.emdong_cd);
				});
			});
		},
		
		// mng_s 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
		// 주요지표
		setMainIndexDataYears : function() {
			var html = "";
			
			// 선택된 라디오 버튼 값 확인
			var selectedRadioVal = $(":input:radio[name=API_0301]:checked").val();
			
			// common.js 의 센서스 데이터 년도
			for(var year = censusDataYear; year >= 2000; year--) {
				
				// 농림어가 관련 데이터는 5년 주기
				if(selectedRadioVal == "nongga_cnt" || 
						selectedRadioVal == "imga_cnt" || 
						selectedRadioVal == "naesuoga_cnt" || 
						selectedRadioVal == "haesuoga_cnt") {
					if((year % 5) == 0) {
						html += "<option value = '";
						html += year + "'";
						html += ">" + year + "년</option>";
					}
				} else {
					// 2015년 이전에는 5년단위 전국 총조사, 2015년 부터는 센서스 데이터로 1년주기
					if(year > 2015) {
						html += "<option value = '";
						html += year + "'";
						html += ">" + year + "년</option>";
					} else if((year % 5) == 0) {
						html += "<option value = '";
						html += year + "'";
						html += ">" + year + "년</option>";
					}
				}
			}
			
			$("#API_0301_ppltn_year").html(html);
		},
		
		// 주요지표 사업체, 사업체 공통
		setCorpDataYears : function() {
			var html = "";
			
			for(var year = companyDataYear; year >= 2000; year--) {
				html += "<option value = '";
				html += year + "'";
				html += ">" + year + "년</option>";
			}
			
			$("#API_0301_corp_year").html(html);
			$("#API_0304_year").html(html);
		},
		
		// 인구, 가구, 주택
		setPplFamilyHouseDataYears : function() {
			var html = "";
			
			for(var year = censusDataYear; year >= 2000; year--) {
				if(year > 2015) {
					html += "<option value = '";
					html += year + "'";
					html += ">" + year + "년</option>";
				} else if((year % 5) == 0) {
					html += "<option value = '";
					html += year + "'";
					html += ">" + year + "년</option>";
				}
			}
			
			$("#API_0302_year").html(html);
			$("#API_0305_year").html(html);
			$("#API_0306_year").html(html);
		},
		
		// 농림어가
		setNongImOgaDataYears : function() {
			var html = "";
			
			for(var year = censusDataYear; year >= 2000; year--) {
				if((year % 5) == 0) {
					html += "<option value = '";
					html += year + "'";
					html += ">" + year + "년</option>";
				}
			}
			
			$("#API_0310_year").html(html);
			$("#API_0310_year_1").html(html);
		}
		// mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
		
	};
	$interactive.callbackFunc = {
		//해당경계 선택 시, 발생하는 콜백함수
		didSelectedPolygon : function(event, data, type, map) {
			if(type==="data"){
				map.infoWindow.updateData(data);
				$interactive.search.updateColor(data.properties.adm_cd);
			}
		},
		didEndBoundary : function(map,data){
			if(data){
				$interactive.search.setArea(data, map.censusApi.lastParameters.option.showData, map.censusApi.lastParameters.option.showDataName, map.censusApi.lastParameters.option.unit);
			}
		}
	};
	$interactive.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			Kakao.init('167fc6abf0eb4717e1f3de7895a0152a');
			this.mapResize();
			$interactive.ui.createMap("map");
			//산업분류 코드 리스트 셋팅
			$interactive.api.setIndustryList();
			//검색조건 탭 클릭시 class 변경 이벤트
			$("#search-item-box>.Subject a").click(function(){
				$("#search-item-box>.Subject a").removeClass("M_on");
				$(this).addClass("M_on");
				$("#search-box>div:not(#Btn_Search_Detail)").hide();
			//	alert($(this).index());
				$("#search-box>div:eq("+$(this).index()+"):not(#Btn_Search_Detail)").show();
				return false;
			})
			//검색조건 탭 클릭시 class 변경 이벤트 추가
			$("#itemArea li").click(function(){
				
				$interactive.event.showItemBox();
				
				$("#itemArea a").removeClass("M_on");
				$(this).addClass("M_on");
				
				var thisIndex = 0;
				
				for(var i=0; i<$("#itemArea li").length; i++){
					if($(this).hasClass("interactive0"+ (i+1))){
						thisIndex = i;
					}
				}
				
				$("#search-box>div:not(#Btn_Search_Detail)").hide();
				$("#search-box>div:eq("+thisIndex+"):not(#Btn_Search_Detail)").show();
				
				
				srvLogWrite('M0','05', '01', '0' + (thisIndex+1), '', '');
				
				
				
				$("#itemArea").hide();
				
				return false;
			})
			//radio 버튼 class 변경 이벤트
			$("ul.List>li input:radio").change(function(){
				$(this).parents("ul").children("li").removeClass("Check");
				if($(this).is(":checked")){
					$(this).parents("li").addClass("Check");
				}
				
				// mng_s 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
				$interactive.ui.setMainIndexDataYears();
				$interactive.ui.setCorpDataYears();
				// mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
			});
			
			
			
			//상세검색 선택 오류 로직 추가
			//api0301ul click
			$("#api0301ul>li").click(function(){
				$(this).parents("ul").children("li").removeClass("Check");
				
				$(this).children().children().prop("checked", true);
				$(this).addClass("Check");
				
				// mng_s 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
				$interactive.ui.setMainIndexDataYears();
				$interactive.ui.setCorpDataYears();
				// mng_e 2020. 02. 18 j.h.Seok 조사년도 콤보박스 자동생성 추가
			});
			//checkbox 버튼 class 변경 이벤트
			$("ul.List>li input:checkbox").change(function(){
				if($(this).is(":checked")){
					$(this).parents("li").addClass("Check");
				}else{
					$(this).parents("li").removeClass("Check");
				}
			});
			//선택 조건일 경우 class 변경 이벤트
			$("input:checkbox[data-able]").change(function(){
				var dataAble = $("#"+$(this).data("able"));
				if($(this).is(":checked")){
					dataAble.children().removeClass("disabled");
				}else{
					dataAble.children().addClass("disabled");
				}
				dataAble.find("input,select").prop("disabled",!$(this).is(":checked"));
			});
			//검색 조건에 탭으로 나눠져 있는 class 변경 이벤트
			$(".Detail2_2>.TabGroup .tab-item").click(function(){
				var parent = $(this).parents(".Detail2_2");
				$(this).parents(".TabGroup").children(".tab").removeClass("M_on");
				$(this).parents(".tab").addClass("M_on");
				parent.children(".TabArea").hide();
				parent.children(".TabArea:eq("+$(this).parents(".tab").index()+")").show();
				return false;
			});
			//사업체>산업분류검색
			$("#find_search").submit(function(){
				if($(this).find("input[name=keywords]").val()){
					var search = $("#company-list>li[data-text*="+$(this).find("input[name=keywords]").val()+"]");
					if(search.length>0){
						$("#company-list>li").hide();
						search.show();
					}else{
						messageConfirm.open(
							"알림", 
							"찾으시는 산업분류는 해당 깊이에서 존재하지 않습니다.<br>해당 깊이의 전체목록을 보시겠습니까?",
							[{
								title : "확인",
								func : function() {
									$("#company-list>li").show();
									return false;
								}
							},{title : "취소"}]
						);
					}
				}else{
					$("#company-list>li").show();
				}
				return false;
			});
			//사업체>산업분류 변경 이벤트
			$("body").on("change","#company-list input[name=company_list]:radio",function(){
				$interactive.api.activeClassCode = $(this).val();
				$interactive.api.activeClassName = $(this).parent().text();
			});
			//테마 검색에서 리스트 클릭시 이벤트
			$(".Theme_List>.theme-list>a").click(function(){
				$(this).parents(".Theme_List").find(".theme-list.Open").removeClass("Open");
				$(this).parent("li").addClass("Open");
				return false;
			});
			//테마 검색에서 테마 변경시 이벤트
			$(".Theme_List input[name=theme-code]:radio").change(function(){
				$(this).parents(".Theme_List").children(".theme-list.Select").removeClass("Select");
				$(this).parents(".theme-list").addClass("Select");
			});
			var hideArea = function(element){
				$(".Content>.Btn_Top>nav>a").not($(element)).removeClass("M_on");
				$("#chart-area,#table-area").hide();
			};
			//지도 버튼 클릭시 이벤트
			$("#map-area-button").click(function(){
				hideArea($(this));
				$(this).addClass("M_on");
				return false;
			});
			//차트 버튼 클릭시 이벤트
			$("#chart-area-button").click(function(){
				if(!$(this).hasClass("NoneAction")){
					hideArea($(this));
					$(this).addClass("M_on");
					$("#chart-area").height($(window).height()/2).show();
					$("html,body").stop().animate({
						scrollTop: $(window).height()/2
					}, 300);
					var chart = $("#chart-area>.chart").highcharts();
					$.each(chart.series[0].data,function(cnt,node){
						if(node.color==$interactive.search.activeChartColor){
							chart.tooltip.refresh([node])
							return false;
						}
					});
				}
				return false;
			});
			
			//차트 데이터보드 메뉴 클릭시 이벤트
			$("#chartTableArea").click(function(){
				srvLogWrite("M0","05", "02", "03", "", "");		//데이터보드
				var chart = $("#chart-area>.chart").highcharts();
				if(chart != null){
					//map Area 숨기기
					mapAreaToggle();
					
					if(!$(this).hasClass("NoneAction")){
						hideArea($(this));
						$(this).addClass("M_on");
						$("#chart-area").height($(window).height()-50).show();
						$("html,body").stop().animate({
							scrollTop: 0
						}, 300);

						$.each(chart.series[0].data,function(cnt,node){
							if(node.color==$interactive.search.activeChartColor){
								chart.tooltip.refresh([node])
								return false;
							}
						});
					}
				}else{
					messageAlert.open("알림", "데이터를 조회하신 후 사용할 수 있습니다");
				}
				return false;
			});
			//표 버튼 클릭시 이벤트
			$("#table-area-button").click(function(){
				if(!$(this).hasClass("NoneAction")){
					hideArea($(this));
					$(this).addClass("M_on");
					$("#table-area").show();
					$("html,body").stop().animate({
						scrollTop: $(document).height()
					}, 300);
					$("#table-area table tr th:eq(1),#table-area table tr td:eq(1)").css("width","35%");
					$("#table-area table tr th:eq(2),#table-area table tr td:eq(2)").css("width","10%");
				}
				return false;
			});
			//표 버튼 클릭시 이벤트
			$(".chartDataToggleBtn").click(function(){
				
				
				if($("#table-area").css("display")=="block"){
					$("#chartTableArea").trigger("click");
					$("#chartTableArea").trigger("click");
					
				}else{
					if(!$(this).hasClass("NoneAction")){
						hideArea($(this));
						
						
						$(this).addClass("M_on");
						$("#table-area").show();
						$("html,body").stop().animate({
							scrollTop: 0
						}, 300);
						$("#table-area table tr th:eq(1),#table-area table tr td:eq(1)").css("width","35%");
						$("#table-area table tr th:eq(2),#table-area table tr td:eq(2)").css("width","10%");
					}
				}
				return false;
			});
			//검색 버튼 클릭 이벤트
			$("#Btn_Search_Detail>button").click(function(){
				srvLogWrite('M0','05', '02', '01', '', '');
				$interactive.ui.map.bnd_year = bndYear;
				$interactive.ui.search();
				return false;
			});
			//연령(선택) select box 변경시
			$("#populationAge select,#3fAge select").change(function(){
				var parentId = $(this).parents("p").attr("id");
				var isFrom = /from$/.test($(this).attr("name"));
				var api = $("#search-box>div:visible:not(#Btn_Search_Detail)").data("id");
				var from = parseInt($("#"+parentId+" select[name="+api+"_age_from]").val());
				var to = parseInt($("#"+parentId+" select[name="+api+"_age_to]").val());
				if(from>=to){
					var value = isFrom?to-4:from+4;
					if(value>=100){
						$("#"+parentId+" select[name="+api+"_age_"+(isFrom?"from":"to")+"] option:last").prop("selected",true);
					}else{
						$("#"+parentId+" select[name="+api+"_age_"+(isFrom?"from":"to")+"] option[value="+value+"]").prop("selected",true);
					}
				}
				var ageToLabel = $("#"+parentId+" select[name="+api+"_age_to] option").index($("#"+parentId+" select[name="+api+"_age_to] option:selected"));
				if(ageToLabel == 20){
					$("#"+api+"_age_to_label").hide();
				}else{
					$("#"+api+"_age_to_label").show();
				}
			});
			//연면적(선택) select box	변경시
			$("#API_0306_bdspace_from").change(function() {
				var spaceToOption = $("#API_0306_bdspace_to option").index($("#API_0306_bdspace_to option:selected"));
				var spaceFrom = $("#API_0306_bdspace_from option:eq("+spaceToOption+")").val();
				if (parseInt($(this).val()) >= parseInt(spaceFrom)) {
					$(this).val(spaceFrom);
					spaceToOptionLabel = $("#API_0306_bdspace_from option").index($("#API_0306_bdspace_from option:selected"));
				}
			});
			$("#API_0306_bdspace_to").change(function() {
				var spaceFromOption = $("#API_0306_bdspace_from option").index($("#API_0306_bdspace_from option:selected"));
				var spaceToOptionLabel = $("#API_0306_bdspace_to option").index($("#API_03            06_bdspace_to option:selected"));
				var spaceTo = $("#API_0306_bdspace_to option:eq("+spaceFromOption+")").val();
				if (parseInt($(this).val()) <= parseInt(spaceTo)) {
					$(this).val(spaceTo);
					spaceToOptionLabel = $("#API_0306_bdspace_to option").index($("#API_0306_bdspace_to option:selected"));
				}
				if(spaceToOptionLabel == 8){
					$("#houseBdspaceToLabel").hide();
				}else{
					$("#houseBdspaceToLabel").show();
				}
			});
			//주요지표 상세검색 변경시
			$("#search-box .Detail2_1 .List li").click(function(){
				if($("#search-box .Detail2_1 .List :Checked").val() == $("#search-box .Detail2_1 .List li:eq(13) input").val()){
					$("#ppltn").hide();
					$("#corp").show();
				}else{
					$("#ppltn").show();
					$("#corp").hide();
				}
			});
			//인구 조사년도 변경시
			$("#API_0302_year").change(function() {
				
				// mng_s 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 교육정도/혼인상태 정보 없음
//				if($("#API_0302_year").val() == 2015){
				if($("#API_0302_year").val() >= 2015){
				// mng_e 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 교육정도/혼인상태 정보 없음
					
					$("#API_0302_yaer_check").hide();
					$("#API_0302_yaer_check input[name=API_0302_check]").prop('checked', false);
					$("#API_0302_yaer_check li").addClass("disabled");
				}else{
					$("#API_0302_yaer_check").show();
				}
			});
			//가구 조사년도 변경시
			$("#API_0305_year").change(function() {
				
				// mng_s 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 점유형태 정보 없음
//				if($("#API_0305_year").val() == 2015){
				if($("#API_0305_year").val() >= 2015){
				// mng_e 2020. 02. 18 j.h.Seok 오류 수정, 2015년 센서스 데이터 이후로 교육정도/혼인상태 정보 없음
					
					$("#API_0305_yaer_check").hide();
					$("#API_0305_yaer_check input[name=API_0305_check]").prop('checked', false);
					$("#API_0305_yaer_check li").addClass("disabled");
				}else{
					$("#API_0305_yaer_check").show();
				}
			});
			//주택 조사년도 변경시
			$("#API_0306_year").change(function() {
			/*	$("#UsePridCd,#ConstYear").hide();
				$("#UsePridCd input,#ConstYear input").prop('checked', false);
				$("#UsePridCd select,#ConstYear select").addClass("disabled").prop('disabled', true);
				if($("#API_0306_year").val() == 2015){
					$("#UsePridCd").show();
				}else{
					$("#ConstYear").show();
				}
				*/
				
				
				$("#UsePridCd select,#ConstYear select").addClass("disabled").prop('disabled', true);
				$("#UsePridCd input,#ConstYear input").prop('checked', false);
				var html = "";
				$("#API_0306_const_year").empty();
				
				switch(parseInt(this.value)) {
					case 2005:
	                   	html  = '<option value="06">2005년</option>';
	                   	html += '<option value="07">2000년~2004년</option>';
	                   	html += '<option value="08">1995년~1999년</option>';
	                   	html += '<option value="09">1990년~1994년</option>';
	                   	html += '<option value="10">1980년~1989년</option>';
	                   	html += '<option value="11">1970년~1979년</option>';
	                   	html += '<option value="12">1960년~1969년</option>';
	                   	html += '<option value="13">1959년 이전</option>';
	                   	$("#API_0306_const_year").append(html);
	                   	$("#API_0306_const_year").val("06"); //2005
						break;
					case 2000:
						html += '<option value="07">2000년~2004년</option>';
	                   	html += '<option value="08">1995년~1999년</option>';
	                   	html += '<option value="09">1990년~1994년</option>';
	                   	html += '<option value="10">1980년~1989년</option>';
	                   	html += '<option value="11">1970년~1979년</option>';
	                   	html += '<option value="12">1960년~1969년</option>';
	                   	html += '<option value="13">1959년 이전</option>';
	                   	$("#API_0306_const_year").append(html);
	                   	$("#API_0306_const_year").val("07"); //2000
						break;
					default:
						//2010년 이후 건축년도의 코드값이 전부 다름	leekh
						jQuery.ajax({
					 		type:"POST",
					 		url: "/ServiceAPI/map/interactive/getConstYear.json",
					 		data:{	
					 				"year": this.value	 				
					 			  },
					 		success:function(res){
					 			var result = res.result;
					 			for(var i=0; i<result.length; i++){
					 				html = "";
					 				var code = result[i].const_year_cd;
					 				var name = result[i].const_year_nm;
					 				
					 				html += '<option value="' + code + '">' + name + '</option>';
					 				
					 				$("#API_0306_const_year").append(html);
					 			}
					 			$("#API_0306_const_year").val(result[0].const_year_cd); 

					 		}
						});
						break;
				}
		
				
				
				
				
				
				
				
				
			});
		},
		/**
		 * @name         : mapResize
		 * @description  : UI 리사이즈에 대한 이벤트. 
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		mapResize: function(){
			$highchartApi.width = $(window).width();
			$("#table-area .scrolls").height($(window).height()-100)
			$interactive.event.setMapSize();
			$interactive.event.setItemBoxSize();
		},
		/**
		 * @name         : showItemBox
		 * @description  : 검색 항목 보이기
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		showItemBox: function(){
			$('#search-item-box').show();
			$interactive.event.setItemBoxSize();
			return false;
		},
		/**
		 * @name         : setItemBoxSize
		 * @description  : 검색 항목 높이 값 변경
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setItemBoxSize: function(){
			$("#search-item-box").height($(window).height()-$(".Wrap>.Header").outerHeight(true));
			$(".DetailBox").height($(window).outerHeight(true) - ($(".Wrap>.Header").outerHeight(true) + $(".Open_Type1>p.SelectArea:visible").outerHeight(true) + $(".SubjectB").outerHeight(true)+$("#Btn_Search_Detail").outerHeight(true)+$(".Open_Type1>h3").outerHeight(true)));
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 03. 22. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize: function(){
			if($("body").hasClass("full")){
				$("#map").height($(window).height());
			}else{
				$("#map").height($(window).height()-$(".Wrap>.Header").outerHeight(true)-$(".Wrap>.Content>.Btn_Top").outerHeight(true)-$(".Wrap>.Content>.SelectArea").outerHeight(true));
			}
		}
	};
	
	
	function mapAreaToggle(){
		
		if($("#map").css("display")=="block"){
			$("#map").hide();
			$("#map-title").hide();
			//$("#itemArea").hide();
			$("#menuListToggle").hide();
			$("#chartTableArea").hide();
			$(".SelectArea").hide();
		}else{
			$("#map").show();
			$("#map-title").show();
			//$("#itemArea").show();
			$("#menuListToggle").show();
			$("#chartTableArea").show();
			$(".SelectArea").show();
		}
	}
	
	
	
	/**
	 * @name           : getSearchOption
	 * @description    : 검색조건 생성
	 * @date           : 2016. 03. 22. 
	 * @author	       : 나광흠
	 * @history        :
	 * @param map      : map
	 * @param callback : callback
	 */
	function getSearchOption(map,callback){
		var options = {
			"adm_cd" : getParameter("adm_cd")
		};
		if (getParameter("type") == "API_0301") {
			options.showData = getParameter("showData");
			options.unit = "명";
		} else if (getParameter("type") == "API_0302") {
			options.showData = "population";
			options.unit = "명";
		} else if (getParameter("type") == "API_0304") {
			options.showData = "corp_cnt";
			options.unit = "개";
		} else if (getParameter("type") == "API_0305") {
			options.showData = "household_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0306") {
			options.showData = "house_cnt";
			options.unit = "호";
		} else if (getParameter("type") == "API_0307") {
			options.showData = "farm_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0308") {
			options.showData = "forestry_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0309") {
			options.showData = "fishery_cnt";
			options.unit = "가구";
		} else if (getParameter("type") == "API_0310") {
			options.showData = "population";
			options.unit = "명";
		} else{
			return null;
		}
		options.showDataName = map.censusApi[getParameter("type")].showName[options.showData];
		options.callback = function(data){
			$interactive.search.setArea(data, options.showData, options.showDataName, options.unit);
			$("#search-item-box").hide();
			if(typeof callback==="function"){
				callback();
			}
		};
		return options;
	}
}(window, document));