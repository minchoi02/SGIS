(function(W, D) {
	W.sPoi = W.sPoi || {};
	sPoi = function(map){
		var that = this;
		this.map = map;
		this.mapBounds = null;
		this.markers = null;
		this.limitZoom = 10;//제한 줌 레벨 
		this.limitMessage = true;//제한 줌 벗어나면 메시지 보여줄지의 여부
		this.poiPanel = null;//POI 리스트 화면
		this.active = false;//POI 표출 여부
		this.theme_cd = null;//테마코드
		this.year = companyDataYear;
		this.bndYear = bndYear;
		this.item =  [{//테마 리스트
			name:"생활서비스",
			item:[{id: "1001",name: "인테리어",type:"theme"}, {id: "1002",name: "목욕탕",type:"theme"}, {id: "1003",name: "교습학원",type:"theme"}, {id: "1004",name: "어학원",type:"theme"}, {id: "1005",name: "예체능학원",type:"theme"}, {id: "1006",name: "부동산중개업",type:"theme"}, {id: "1007",name: "이발소",type:"theme"}, {id: "1008",name: "미용실",type:"theme"}, {id: "1009",name: "세탁소",type:"theme"}, {id: "1010",name: "PC방",type:"theme"}, {id: "1011",name: "노래방",type:"theme"} ]
		},{
			name:"도소매",
			item:[{id: "2001",name: "문구점",type:"theme"}, {id: "2002",name: "서점",type:"theme"}, {id: "2003",name: "편의점",type:"theme"}, {id: "2004",name: "식료품점",type:"theme"}, {id: "2005",name: "휴대폰점",type:"theme"}, {id: "2006",name: "의류",type:"theme"}, {id: "2007",name: "화장품/방향제",type:"theme"}, {id: "2008",name: "철물점",type:"theme"}, {id: "2009",name: "주유소",type:"theme"}, {id: "2010",name: "꽃집",type:"theme"}, {id: "2011",name: "슈퍼마켓",type:"theme"} ]
		},{
			name:"교통",
			item:[{id: "3001",name: "지하철역",type:"theme"}, {id: "3002",name: "터미널",type:"theme"}]
		},{
			name:"숙박",
			item:[{id: "4001",name: "호텔",type:"theme"}, {id: "4002",name: "여관",type:"theme"}, {id: "4003",name: "펜션",type:"theme"}]
		},{
			name:"음식점",
			item:[{id: "5001",name: "한식",type:"theme"}, {id: "5002",name: "중식",type:"theme"}, {id: "5003",name: "일식",type:"theme"}, {id: "5004",name: "분식",type:"theme"}, {id: "5005",name: "서양식",type:"theme"}, {id: "5006",name: "제과점",type:"theme"}, {id: "5007",name: "패스트푸드",type:"theme"}, {id: "5008",name: "치킨",type:"theme"}, {id: "5009",name: "호프/간이주점",type:"theme"}, {id: "5010",name: "카페",type:"theme"}, {id: "5011",name: "기타 외국식",type:"theme"}]
		},{
			name:"공공",
			item:[{id: "6001",name: "우체국",type:"theme"}, {id: "6002",name: "행정기관",type:"theme"}, {id: "6003",name: "경찰/지구대",type:"theme"}, {id: "6004",name: "소방서",type:"theme"}]
		},{
			name:"교육",
			item:[{id: "7001",name: "초등학교",type:"theme"}, {id: "7002",name: "중학교",type:"theme"}, {id: "7003",name: "고등학교",type:"theme"}, {id: "7004",name: "전문대학",type:"theme"}, {id: "7005",name: "대학교",type:"theme"}, {id: "7006",name: "대학원",type:"theme"}, {id: "7007",name: "어린이보육업",type:"theme"}]
		},{
			name:"기업",
			item:[{id: "8001",name: "제조/화학",type:"theme"}, {id: "8002",name: "서비스",type:"theme"}, {id: "8003",name: "통신/IT",type:"theme"}, {id: "8004",name: "건설",type:"theme"}, {id: "8005",name: "판매/유통",type:"theme"},{id: "8006",name: "기타금융업",type:"theme"},{id: "8007",name: "기타의료업",type:"theme"},{id: "8008",name: "문화/체육",type:"theme"}]
		},{
			name:"편의문화",
			item:[{id: "9001",name: "백화점/중대형",type:"theme"}, {id: "9002",name: "은행",type:"theme"}, {id: "9003",name: "병원",type:"theme"}, {id: "9004",name: "극장/영화관",type:"theme"}, {id: "9005",name: "도서관/박물관",type:"theme"}]
		}];
		/**
		 * @name            : createPoi
		 * @description     : POI 창 생성
		 * @date            : 2016. 03. 23. 
		 * @author          : 나광흠
		 * @history         :
		 */
		this.createPoi = function(){
			this.markers = sop.markerClusterGroup({
				animateAddingMarkers: true
			});
			map.gMap.addLayer(this.markers);
			if(this.poiPanel){
				this.poiPanel.remove();
				this.poiPanel = null;
			}
			var height = 0;
			if($("body").hasClass("full")){
				height = $(window).outerHeight(true);
			}else{
				height = $(window).outerHeight(true)-35;
			}
			var div = $("<div/>",{"class":"POI_select "});
			var parentItemList=$("<ul/>");
			$.each(that.item,function(cnt, node){
				var childrenItemList = $("<ul/>",{"style":"height:"+((that.item.length*44)+1)+"px;"});
				$.each(node.item,function(){
					childrenItemList.append(
						$("<li/>").append(
							$("<a/>",{"data-id":this.id,"data-type":this.type}).append($("<img/>",{"src":contextPath+"/resources/images/icon/poi_icon_"+(/^700(5|6|7)$/.test(this.id)?'7004':this.id)+".png"}),this.name).click(function(){
								console.log($(this).data("type"));
								if($(this).data("type")==="theme"){
									
									if(document.location.href.match("current")){
										srvLogWrite("M0","03", "02", "02", "theme_cd:" + $(this).data("id"), "");		//내주변 통계
									}else if(document.location.href.match("interactive")){
										srvLogWrite("M0","05", "02", "02", "theme_cd:" + $(this).data("id"), "");		//대화형통계지도
									}else if(document.location.href.match("community")){
										srvLogWrite("M0","08", "03", "10", "theme_cd:" + $(this).data("id"), "");		//지역현안 소통지도
									}
									
									$("#removeButton").show();	// 휴지통
									that.markers.clearLayers();
									that.active = true;
									that.theme_cd = $(this).data("id"); 
									that.poiPanel.hide();
									that.getThemePoi(0);
								}
								return false;
							})
						)
					);
				});
				parentItemList.append($("<li/>",{"style":"cursor: pointer;","class":(cnt==0?"on":"")}).append(
					$("<a/>",{"text":node.name}).click(function(){
						$(this).parents("ul").children("li").removeClass("on");
						$(this).parent().addClass("on");
						return false;
					}),
					childrenItemList
				));
			});
			this.poiPanel = $("<div/>",{"style":"height:"+height+"px;display:none;","class":"poi-control-panel Open_Type1"}).append(
				$("<h3/>",{"text":"POI"}),
				$("<button/>",{"type":"button","class":"BtnClose"}).click(function(){
					that.panelHide();
				}),
				div.append(parentItemList)
			);
			$("body").append(this.poiPanel);
		};
		/**
		 * @name            : panelShow
		 * @description     : POI 창 열기
		 * @date            : 2016. 03. 23. 
		 * @author          : 나광흠
		 * @history         :
		 */
		this.panelShow = function(){
			$(".Wrap>.Content").hide();
			if(this.poiPanel){
				this.poiPanel.show();
			}
			
			/*
				if(map.gMap.getZoom()<=this.limitZoom){
					map.gMap.setZoom(this.limitZoom);
				}
			 */
			
			//poi 분리후 화면 깨짐 현상 생겨서 주석처리. 주석처리후 정상작동
			//$(".POI_select ul ul").css("left",$(".POI_select>ul>li:first>a").outerWidth(true)-1);
		};
		/**
		 * @name            : panelHide
		 * @description     : POI 창 닫기
		 * @date            : 2016. 03. 23. 
		 * @author          : 나광흠
		 * @history         :
		 */
		this.panelHide = function(){
			$(".Wrap>.Content").show();
			if(this.poiPanel){
				this.poiPanel.hide();
			}
		};
		/**
		 * @name            : removePoi
		 * @description     : 지도에 있는 POI 삭제
		 * @date            : 2016. 03. 23. 
		 * @author          : 나광흠
		 * @history         :
		 */
		this.removePoi = function(){
			this.markers.clearLayers();
			this.active = false;
			this.theme_cd = null; 
		};
		/**
		 * @name            : refreshPoi
		 * @description     : POI 재조회
		 * @date            : 2016. 03. 23. 
		 * @author          : 나광흠
		 * @history         :
		 */
		this.refreshPoi = function(){
			var refresh = false;
			if(this.limitMessage){
				if(this.active&&this.mapBounds){
					refresh = true;
				}
			}else{
				refresh = this.active;
			}
			if(refresh===true){
				if(map.gMap.getZoom()>=this.limitZoom){
					if(this.mapBounds==null||!this.mapBounds.contains(map.gMap.getCenter())){
						this.markers.clearLayers();
						this.getThemePoi(0);
					}
				}else{
					if(this.limitMessage==true){
						messageAlert.open("알림", "해당 레벨에서는 사업체 POI정보를 볼 수 없습니다.");
						$("#removeButton").hide();
						this.removePoi();
					}else{
						this.markers.clearLayers();
						this.mapBounds = null;
					}
				}
			}
		}
		/**
		 * @name            : getThemePoi
		 * @description     : 테마 POI 조회z
		 * @date            : 2016. 03. 23. 
		 * @author          : 나광흠
		 * @history         :
		 * @param pageNum   : 페이지 
		 */
		this.getThemePoi = function(pageNum){
			var obj = new sop.openApi.poi.api();
			obj.onBlockUIPopup();
			if(this.limitMessage==true){
				if(map.gMap.getZoom()<this.limitZoom){
					//alert(this.limitZoom);
					//map.gMap.setZoom(11);
					that.mapBounds = map.gMap.getBounds();
					map.mapMove(this.map.center, this.limitZoom);
					
				}
			}
			setTimeout(function() {
				that.mapBounds = map.gMap.getBounds();
				obj.addParam("accessToken", accessToken);
				obj.addParam("area_type", "1");
				obj.addParam("theme_cd", that.theme_cd);
				obj.addParam("pagenum", pageNum);
				obj.addParam("year", that.year);
				obj.addParam("bnd_year", that.bndYear);
				obj.addParam("resultcount", 500);
				obj.addParam("area", 'RECTANGLE('+that.mapBounds._southWest.x + ' ' + that.mapBounds._southWest.y + ','+that.mapBounds._northEast.x + ' ' + that.mapBounds._northEast.y+')');
				obj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/stats/companysearch.json",
					options : {
						target : that,
						pageNum : pageNum
					}
				});
				that.panelHide();
			}, 1500);
		};
	};
	/*********** OpenAPI 리버스지오코딩 시작 **********/
	(function () {
		$class("sop.openApi.poi.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				this.onBlockUIClose();
				var poi = options.target;
				if(res.errCd == "0") {
					var result = res.result[0];
					var totalCount = result.totalcount;
					var returnCount = result.returncount;
					var pageNum = result.pagenum;
					var apicallCount = parseInt(totalCount / (result.returncount * (pageNum + 1)));
					if (returnCount !== totalCount && apicallCount > 0) {
						poi.getThemePoi(pageNum + 1);
					}
					$.each(result.company_list,function(cnt,node){
						var theme_cd = node.theme_cd;
						var theme_marker;
						if(/^700(5|6|7)$/.test(theme_cd)){
							theme_marker = "70_04";
						}else{
							theme_marker = (theme_cd.substring(0,2)+"_"+theme_cd.substring(2));
						}
						var markerIcon = sop.icon({
							iconUrl: sgisContextPath+'/img/marker/marker/' + theme_marker + '.png',
							shadowUrl: sgisContextPath+'/img/marker/theme_shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						var marker = sop.marker([ node.x, node.y ], {
							icon: markerIcon
						});
						
						marker.info = node;
						marker.addTo(poi.markers);
						
						var html ="";
						html += '<div style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;" >';
						html += 	'<div style="word-break:break-all;padding:5px;color: #457bc3;font-size:14px;"><strong>' + node.corp_nm + '</strong></div>';
//						html += 	'<div style="word-break:break-all;white-space: nowrap;padding:5px;font-size:12px;">&nbsp;' + node.naddr + '</div>';
						html += '</div>';
						
						marker.bindInfoWindow(html);
						marker.on('click', function(e){
							if(poi.map.activeLayer){
								poi.map.activeLayer.unbindToolTip();
							}
						});
					});
				}else if(res.errCd == "-401") {
					accessTokenInfo(function(){
						poi.getThemePoi(options.pageNum);
					});
				}
			},
			onFail : function (status) {
				messageAlert.open("알림", errorMessage);
				this.onBlockUIClose();
			}
		});
	}());
	/*********** OpenAPI 리버스지오코딩. 종료 **********/
}(window, document));