(function(W, D) {
	W.$main = W.$main || {};
	$(document).ready(function() {
		$main.event.setUIEvent();
	});
	const defaultCenter = [989749,1817802];
	const defaults = {
		sido_cd : "25",
		sido_nm : "대전광역시",
		sgg_cd : "030",
		sgg_nm : "서구",
		emdong_cd : "60",
		emdong_nm : "둔산2동"
	};
	$main.ui = {
		map:null,
		current:$.extend(true,{},defaults),
		createMap:function({id}){
			this.map = new sMap.map();
			this.map.bnd_year = bndYear;
			this.map.createMap($main, id, {
				zoom:2,
				currentDefaultZoom:2,
				isZoomControl : false,//줌 컨트롤 버튼 생성 유무
				isCurrentControl : false,//현재위치 버튼 생성 유무
				isMapControlButton : false,//지도 컨트롤 박스 생성 유무 
				isMapStatToggleControl : false,//통계 폴리곤 토글 버튼 생성 유무 
				isMapCaptionToggleControl : false,//통계 캡션 토글 버튼 생성 유무
				isHideLegendControl : false,//범례 컨트롤 숨김 유무
				isMapSizeControl : false,//지도 전체화면 버튼 생성 유무
				isMapNavigator : false,//지도 네비게이션 생성 유무
				isLegendControl : false//범례 컨트롤 생성 유무
			});	
//			this.map.gMap.dragging.disable();
			this.map.gMap.doubleClickZoom.disable();
		},
		getData:function(admCd){
			$("#summary [data-id]").each(function(){
				$(this).empty().append("-",$("<span/>",{"text":" "+$(this).data("unit")}));
			});
			function setSummaryData({datas}){
				let d = {};
				$.each(datas,function(cnt,node){
					const keys = Object.keys(node);
					keys.forEach(function(key){
						if(node[key] != "N/A"){
							const _this = $("#summary [data-id="+key+"]");
							d[key] = d[key]||0;
							d[key]+=parseFloat(node[key]);
							_this.empty().append($.heum.setThousandSeparator(d[key]),$("<span/>",{"text":" "+_this.data("unit")}));;
						}
					});
				});
			}
			$.ajax({
				url : openApiPath+"/OpenAPI3/stats/population.json?",
				type:"GET",
				data: admCd=="00"?{
					accessToken : accessToken,
					year : censusDataYear,
					bnd_year : bndYear,
					low_search : 0
				}:{
					accessToken : accessToken,
					year : censusDataYear,
					bnd_year : bndYear,
					adm_cd : admCd,
					low_search : 0
				},
				async: true,
				dataType:"json",
				success: function(res){
					if(res.errCd == "0") {
						setSummaryData({datas:res.result});
					} else if(res.errCd == "-401") {
						accessTokenInfo(function(){
							$main.ui.getData(admCd);
						});
					}
				},
				error: function(xhr, status, errorThrown) {
					accessTokenInfo(function(){
						$main.ui.getData(admCd);
					});
				}
			});
			$.ajax({
				url: contextPath + "/m2019/workroad/todayAllJobStatusPopupSelect.json",
				type:"POST",
				data: admCd=="00"?{
					data: "data",
					mainType : "main"
				}:{
					data: "data",
					sido_cd : $main.ui.current.sido_cd,
					sido_nm : $main.ui.current.sido_nm,
					sgg_cd : $main.ui.current.sgg_cd,
					sgg_nm : $main.ui.current.sgg_nm,
					mainType : "main"
				},
				async: true,
				dataType:"json",
				success: function(res){
					setSummaryData({datas:res.result.resultList});
				}
			});
		},
		/**
		 * 
		 * @name         : reqGeocode
		 * @description  : 지오코딩을 조회한다.
		 * @history 	 :
		 * @param x_coor : x좌표
		 * @param y_coor : y좌표
		 * @param callback : callback
		 */
		reqGeocode : function(x_coor, y_coor, callback) {
			$.ajax({
				url : openApiPath + "/OpenAPI3/addr/rgeocode.json?",
				data : {
					accessToken : accessToken,
					addr_type : "20",
					x_coor : x_coor,
					y_coor : y_coor
				},
				type : "GET",
				success : function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							if (typeof callback === "function") {
								callback(res.result[0])
							}
							break;
						case -100:
							break;
						case -401:
							accessTokenInfo(function() {
								$main.ui.reqGeocode(x_coor, y_coor);
							});
							break;
					}
				},
				async : false,
				dataType : "json",
				error: function(x,o,e) {
					$main.ui.setRegionCd();
				}
			});						
		},
	};
	$main.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			$main.ui.createMap({id:"map"});
			$(".keyword__list li").click(function(){
				srvLogWrite('O0', '52', '06', '02', $(this).find("dt").text()+" : "+$(this).find("h4").text(), '');
			});
			
			$(".keyword__tab a").click(function(){
				srvLogWrite('O0', '52', '06', '01', $(this).text(), '');
				const index = $(".keyword__tab a").index($(this));
				$(this).parents(".keyword__tab").children("li").removeClass("on");
				$(this).parent("li").addClass("on");
				$(this).parents("section.keyword").find(".keyword__con").hide().stop();
				$(this).parents("section.keyword").find(".keyword__con:eq("+index+")").fadeIn();
				try{
					$('.keyword__slide').slick('unslick');
				}catch(e){}
				$(this).parents("section.keyword").find('.keyword__slide').slick({
					arrows: false,
					dots: true,
					autoplay: false,
					speed: 1000,
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
				});
			});
			$(".keyword__tab a:first").trigger("click");
			//공지사항
			$.ajax({
				url : contextPath + "/m2020/main/getMainBoard.json",
				type:"POST",
				data: {
					board_cd : "BOARD_001",
					page_num : 1
				},
				async: true,
				dataType:"json",
				success: function(res){
					$("#notice-list").empty();
					res.result.summaryList.forEach(function(data){
						
						data.post_title = data.post_title.replace("&#40;", "(");
						data.post_title = data.post_title.replace("&#41;", ")");
						
						$("#notice-list").append($("<li/>").append($("<a/>",{"href":"/mobile/m2020/map/board/notice.sgis","onclick":"srvLogWrite('O0', '52', '03', '02', '"+data.post_title+"', '')"}).append(
							$("<span/>",{"class":"main-notice__tit","text":data.post_title,"style":"text-overflow: ellipsis;overflow: hidden; "}),
							$("<span/>",{"class":"main-notice__date","text":data.reg_ts})
						)));
					});
				}
			});
			function createCommunityList(parameters){
				$("[data-id=current-location-no]").hide();
				$("#community-list").show();
				//지역현황소통지도
				$.ajax({
					url : sgisContextPath + "/ServiceAPI/community/communityList.json",
					type:"POST",
					data: parameters,
					async: true,
					dataType:"json",
					success: function(res){
						if(res.result.summaryList.length>0){
							$("#community-empty").hide();
							$("#community-list").show();
							let hotList = [];
							$.ajax({
								url : sgisContextPath + "/ServiceAPI/community/communityList.json",
								type:"POST",
								data: {
									type: "hot",
									bnd_year: bndYear
								},
								async: false,
								dataType:"json",
								success: function(res){
									hotList = res.result.summaryList.map(item=>item.cmmnty_map_id);
								}
							});
							$("#community-list").empty();
							let boxUl = $("<ul/>",{"class":"community__list"})
							$.each(res.result.summaryList,function(cnt,node){
								const newBox = $("<span/>",{"class":"box"}).append($("<span/>",{"text":node.adm_nm+" New"}))
								const bestBox = $("<span/>",{"class":"box"}).append($("<span/>",{"text":node.adm_nm+" Best"}))
								boxUl.append(
									$("<li/>").append(
										$("<a/>",{"href":"#"}).append(
											// 소통지도 이미지
											$("<span/>",{"class":"community__img"}).append($("<img/>",{"class":"communityImg", src:sgisContextPath+node.path_nm+"thumbnail/thumbnail-L-"+node.save_file_nm})),
											$("<span/>",{"class":"community__con"}).append(
											// 소통지도 제목
											$("<span/>", {"class":"community__tit","text":node.cmmnty_map_nm}),
											$("<span/>", {"class":"community__txt","text":"참여인원 : "+node.join_cnt+" | 개설일 : "+node.reg_date})
											)
										),
										(node.is_new=="Y"?newBox:null),
										(hotList.indexOf(node.cmmnty_map_id)>-1?bestBox:null)
									).click(function(){
										srvLogWrite('O0', '52', '07', '02', node.cmmnty_map_nm, '');
										// 소통지도 클릭 이벤트
										location.href = contextPath+"/m2020/map/community/map/communityMap.sgis?id="+node.cmmnty_map_id;
									})
								);
								if((cnt+1)%2==0){
									$("#community-list").append(
										$("<div/>",{"class":"agree"}).append(boxUl)
									);
									boxUl = $("<ul/>",{"class":"community__list"});
								}
							});
							$('.community__slide').not('.slick-initialized').slick({
								arrows: false,
								dots: true,
								autoplay: false,
								speed: 1000,
								infinite: true,
								slidesToShow: 1,
								slidesToScroll: 1,
							});
						}else{
							$("#community-empty").show();
							$("#community-list").hide();
						}
					}
				});
			}
			function getNonCurrentPosition(){
				$main.ui.current = $.extend(true,{},defaults);
				/*createCommunityList({
					type: "all",
					page_num: 1,
					pageSize: 4,
					bnd_year: bndYear,
					first_sort: "null",
					second_sort: "Default"
				});*/
				$main.ui.getData("00");
				$main.ui.map.gMap.setView(defaultCenter, 7);
				//$("#mylocation-container").hide();
			}
			function getCurrentPosition(){
				setTimeout(function() {
					if (navigator.geolocation) {
						try {
							navigator.geolocation.getCurrentPosition(
								function (position) {
									const utmkXY = new sop.LatLng(position.coords.latitude, position.coords.longitude);
									$main.ui.reqGeocode(utmkXY.x, utmkXY.y, function(res){
										$main.ui.map.gMap.setView(sop.utmk(utmkXY.x, utmkXY.y), 7);
										const marker = sop.marker([utmkXY.x, utmkXY.y],{
											icon:sop.icon({
												iconUrl: contextPath+'/resources/m2021/img/main/i_point.png',
												iconSize: [25, 38]
											})
										});
										marker.addTo($main.ui.map.gMap);
										marker.on("click",function(e){
											$("#current-location__tooltip").toggle();
										});
										$main.ui.current = res;
										$main.ui.accessCurrentLocation = true;
										$main.ui.getData($main.ui.current.sido_cd+$main.ui.current.sgg_cd+$main.ui.current.emdong_cd);
										$("#map-search").val(res.full_addr);
										$(".location").text(res.full_addr);
									
										createCommunityList({
											type: "all",
											page_num: 1,
											pageSize: 4,
											bnd_year: bndYear,
											first_sort: "null",
											second_sort: "Default",
											sido_cd:res.sido_cd,
											sgg_cd:res.sgg_cd,
											emdong_cd:res.emdong_cd
										});
									});
									$("#current-location__tooltip").show();
								}, 
								function (error) {
									//위치미동의 저장
									$.heum.setCookie("lc_info_agree_yn",null,null);
//									common_remove_cookie("lc_info_agree_yn"); // 쿠키
									//alert("위치동의  안함");
									$main.ui.current = $.extend(true,{},defaults);
//									createCommunityList({
//										bnd_year: bndYear
//									});
									console.log("브라우져가 기능을 제공하지 않습니다.");
									$main.ui.getData("00");
								}
							);
						} catch (e) {// 보안위험이 있는 경우 오류 발생함.
							console.error(e);
						}
					} else {
						console.log("브라우져가 기능을 제공하지 않습니다.");
						createCommunityList({
							type: "all",
							page_num: 1,
							pageSize: 4,
							bnd_year: bndYear,
							first_sort: "null",
							second_sort: "Default"
						});
						$main.ui.getData("00");
					}
				}, 100);
			}
			if($.heum.getCookie("lc_info_agree_yn") != "Y"){
				$("#mylocation-container").show();
				getNonCurrentPosition();
			}else{
				$("#mylocation-container").hide();
				getCurrentPosition();
			}
			$("#mylocationaccept").click(function(){
				//$.heum.setCookie("lc_info_agree_yn","Y",365*60*60*24);
				$.heum.setCookie("lc_info_agree_yn","Y",(1000*60*60*24*30));
//				common_set_cookie("lc_info_agree_yn", "Y", 365); // 쿠키
				getCurrentPosition();
				$("#mylocation-container").hide();
			});
			$("#mylocationcancel").click(function(){
				//위치미동의 저장
				$.heum.setCookie("lc_info_agree_yn",null,null);
				$("#mylocation-container").hide();
				getNonCurrentPosition();
//				common_remove_cookie("lc_info_agree_yn"); // 쿠키
				//alert("위치동의  안함");
			});
			$("[data-id=current-location-button]").click(function(){
				getCurrentPosition();
				return false;
			});
		},
		/**
		 * @name         : mapResize
		 * @description  : UI 리사이즈에 대한 이벤트. 
		 * @date         : 2017. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		mapResize: function(){
			$main.event.setMapSize();
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize: function(){
			Object.keys($main.ui.map).forEach(function(key){
				if($main.ui.map[key]&&$main.ui.map[key].gMap){
					$main.ui.map[key].gMap.invalidateSize();
				}
			});
		}
	};
}(window, document));