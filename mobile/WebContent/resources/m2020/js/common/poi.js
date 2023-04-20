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
		/** 2020.12.02[심창무] 테마코드 변경으로 인한 수정 START */
		this.item =  [{//테마 리스트
			name:"농림어업",
			item:[{id: "A001",name: "농업",type:"theme"}, {id: "A002",name: "임업",type:"theme"}, {id: "A003",name: "어업",type:"theme"}]
		},{
			name:"기업",
			item:[{id: "8001",name: "제조/화학",type:"theme"}, {id: "8002",name: "서비스",type:"theme"}, {id: "8003",name: "통신/IT",type:"theme"}, {id: "8004",name: "건설",type:"theme"}, {id: "8005",name: "판매/유통",type:"theme"}, {id: "8006",name: "기타금융업",type:"theme"}, {id: "8008",name: "문화/체육",type:"theme"}, {id: "B001",name: "전기/가스/수도",type:"theme"}, {id: "B002",name: "환경",type:"theme"}, {id: "B003",name: "방송/미디어",type:"theme"}, {id: "B004",name: "연구개발",type:"theme"}, {id: "B005",name: "협회 및 단체",type:"theme"}, {id: "B006",name: "광업",type:"theme"}, {id: "B007",name: "운송",type:"theme"}]
		},{
			name:"소매업",
			item:[{id: "1001",name: "인테리어",type:"theme"}, {id: "2001",name: "문구점",type:"theme"}, {id: "2002",name: "서점",type:"theme"}, {id: "2003",name: "편의점",type:"theme"}, {id: "2004",name: "식료품점",type:"theme"}, {id: "2005",name: "휴대폰점",type:"theme"}, {id: "2006",name: "의류",type:"theme"}, {id: "2007",name: "화장품/방향제",type:"theme"}, {id: "2008",name: "철물점",type:"theme"}, {id: "2009",name: "주유소",type:"theme"}, {id: "2010",name: "꽃집",type:"theme"}, {id: "2011",name: "슈퍼마켓",type:"theme"}, {id: "9001",name: "백화점/중대형마트",type:"theme"}, {id: "C001",name: "가구",type:"theme"}, {id: "C002",name: "가전제품",type:"theme"}, {id: "C003",name: "통신판매",type:"theme"}, {id: "C004",name: "신발",type:"theme"}]
		},{
			name:"생활서비스",
			item:[{id: "1002",name: "목욕탕",type:"theme"}, {id: "1007",name: "이발소",type:"theme"}, {id: "1006",name: "부동산중개업",type:"theme"}, {id: "1008",name: "미용실",type:"theme"}, {id: "1009",name: "세탁소",type:"theme"}, {id: "9002",name: "은행",type:"theme"}, {id: "D001",name: "생활용품임대",type:"theme"}, {id: "D002",name: "독서실",type:"theme"}, {id: "D003",name: "생활용품수리",type:"theme"}, {id: "D004",name: "카센터",type:"theme"}, {id: "D005",name: "피부/미용",type:"theme"}, {id: "D006",name: "마사지",type:"theme"}, {id: "D007",name: "택배/배달",type:"theme"}]
		},{
			name:"교통",
			item:[{id: "3001",name: "지하철역",type:"theme"}, {id: "3002",name: "터미널",type:"theme"}]
		},{
			name:"여가생활",
			item:[{id: "1010",name: "PC방",type:"theme"}, {id: "1011",name: "노래방",type:"theme"}, {id: "9004",name: "극장/영화관",type:"theme"}, {id: "9005",name: "도서관/박물관",type:"theme"}, {id: "F001",name: "생활체육시설",type:"theme"}, {id: "F002",name: "여행사",type:"theme"}]
		},{
			name:"숙박",
			item:[{id: "4001",name: "호텔",type:"theme"}, {id: "4002",name: "여관(모텔포함) 및 여인숙",type:"theme"}, {id: "4003",name: "펜션",type:"theme"}, {id: "G001",name: "민박",type:"theme"}]
		},{
			name:"음식",
			item:[{id: "5001",name: "한식",type:"theme"}, {id: "5002",name: "중식",type:"theme"}, {id: "5003",name: "일식",type:"theme"}, {id: "5004",name: "분식",type:"theme"}, {id: "5005",name: "서양식",type:"theme"}, {id: "5006",name: "제과점",type:"theme"}, {id: "5007",name: "패스트푸드",type:"theme"}, {id: "5008",name: "치킨",type:"theme"}, {id: "5009",name: "호프/간이주점",type:"theme"}, {id: "5010",name: "카페",type:"theme"}, {id: "5011",name: "기타 외국식",type:"theme"}]
		},{
			name:"교육",
			item:[{id: "1003",name: "교습학원",type:"theme"}, {id: "1004",name: "어학원",type:"theme"}, {id: "1005",name: "예체능학원",type:"theme"}, {id: "7001",name: "초등학교",type:"theme"}, {id: "7002",name: "중학교",type:"theme"}, {id: "7003",name: "고등학교",type:"theme"}, {id: "7004",name: "전문대학",type:"theme"}, {id: "7005",name: "대학교",type:"theme"}, {id: "7006",name: "대학원",type:"theme"}, {id: "7007",name: "어린이보육업",type:"theme"}, {id: "I001",name: "기술직업훈련",type:"theme"}]
		},{
			name:"의료",
			item:[{id: "9003",name: "병원",type:"theme"}, {id: "J001",name: "동물병원",type:"theme"}, {id: "J002",name: "약국",type:"theme"}, {id: "J003",name: "한방병원",type:"theme"}, {id: "8007",name: "기타의료업",type:"theme"}]
		},{
			name:"공공",
			item:[{id: "6001",name: "우체국",type:"theme"}, {id: "6002",name: "행정기관",type:"theme"}, {id: "6003",name: "경찰/지구대",type:"theme"}, {id: "6004",name: "소방서",type:"theme"}]
		}];
		
		/** 2020.10.20[한광희] 테마코드 변경으로 인한 수정 START */
		/**this.item =  [{//테마 리스트
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
		this.item =  [{//테마 리스트
			name:"생활서비스",
			item:[{id: "1002",name: "목욕탕",type:"theme"}, {id: "1007",name: "이발소",type:"theme"}, {id: "1006",name: "부동산중개업",type:"theme"}, {id: "1008",name: "미용실",type:"theme"}, {id: "1009",name: "세탁소",type:"theme"}, {id: "9002",name: "은행",type:"theme"} ]
		},{
			name:"소매업",
			item:[{id: "1001",name: "인테리어",type:"theme"}, {id: "2001",name: "문구점",type:"theme"}, {id: "2002",name: "서점",type:"theme"}, {id: "2003",name: "편의점",type:"theme"}, {id: "2004",name: "식료품점",type:"theme"}, {id: "2005",name: "휴대폰점",type:"theme"}, {id: "2006",name: "의류",type:"theme"}, {id: "2007",name: "화장품/방향제",type:"theme"}, {id: "2008",name: "철물점",type:"theme"}, {id: "2009",name: "주유소",type:"theme"}, {id: "2010",name: "꽃집",type:"theme"}, {id: "2011",name: "슈퍼마켓",type:"theme"}, {id: "9001",name: "백화점/중대형마트",type:"theme"} ]
		},{
			name:"교통",
			item:[{id: "3001",name: "지하철역",type:"theme"}, {id: "3002",name: "터미널",type:"theme"}]
		},{
			name:"숙박",
			item:[{id: "4001",name: "호텔",type:"theme"}, {id: "4002",name: "여관(모텔포함) 및 여인숙",type:"theme"}, {id: "4003",name: "펜션",type:"theme"}]
		},{
			name:"음식",
			item:[{id: "5001",name: "한식",type:"theme"}, {id: "5002",name: "중식",type:"theme"}, {id: "5003",name: "일식",type:"theme"}, {id: "5004",name: "분식",type:"theme"}, {id: "5005",name: "서양식",type:"theme"}, {id: "5006",name: "제과점",type:"theme"}, {id: "5007",name: "패스트푸드",type:"theme"}, {id: "5008",name: "치킨",type:"theme"}, {id: "5009",name: "호프/간이주점",type:"theme"}, {id: "5010",name: "카페",type:"theme"}, {id: "5011",name: "기타 외국식",type:"theme"}]
		},{
			name:"공공",
			item:[{id: "6001",name: "우체국",type:"theme"}, {id: "6002",name: "행정기관",type:"theme"}, {id: "6003",name: "경찰/지구대",type:"theme"}, {id: "6004",name: "소방서",type:"theme"}]
		},{
			name:"교육",
			item:[{id: "1003",name: "교습학원",type:"theme"}, {id: "1004",name: "어학원",type:"theme"}, {id: "1005",name: "예체능학원",type:"theme"}, {id: "7001",name: "초등학교",type:"theme"}, {id: "7002",name: "중학교",type:"theme"}, {id: "7003",name: "고등학교",type:"theme"}, {id: "7004",name: "전문대학",type:"theme"}, {id: "7005",name: "대학교",type:"theme"}, {id: "7006",name: "대학원",type:"theme"}, {id: "7007",name: "어린이보육업",type:"theme"}]
		},{
			name:"기업",
			item:[{id: "8001",name: "제조/화학",type:"theme"}, {id: "8002",name: "서비스",type:"theme"}, {id: "8003",name: "통신/IT",type:"theme"}, {id: "8004",name: "건설",type:"theme"}, {id: "8005",name: "판매/유통",type:"theme"},{id: "8006",name: "기타금융업",type:"theme"},{id: "8008",name: "문화/체육",type:"theme"}]
		},{
			name:"의료",
			item:[{id: "9003",name: "병원",type:"theme"}, {id: "8007",name: "기타의료업",type:"theme"} ]
		},{
			name:"여가생활",
			item:[{id: "1010",name: "PC방",type:"theme"}, {id: "1011",name: "노래방",type:"theme"}, {id: "9004",name: "극장/영화관",type:"theme"}, {id: "9005",name: "도서관/박물관",type:"theme"}]
		}]; */
		/** 2020.10.20[한광희] 테마코드 변경으로 인한 수정 END/
		/** 2020.12.02[심창무] 테마코드 변경으로 인한 수정 END */
		/**
		 * @name            : createPoi
		 * @description     : POI 창 생성
		 * @date            : 2020. 07. 13. 
		 * @author          : 곽제욱
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
			//var height = 0;
			var height = 106;
			if($("body").hasClass("full")){
				//height = $(window).outerHeight(true);
			}else{
				//height = $(window).outerHeight(true)-35;
			}
			
			//var div = $("<div/>",{"class":"Content","style":"background-color: #ffffff; "});	// 2020-09-09 [곽제욱] POI X버튼(닫기) 삭제후 이전버튼 추가로 인한 주석
			//var div = $("<div/>",{"id":"interactivePOIPopup","style":"position: absolute;right: 0;top: 0;height: 100%;width: 100%;overflow: auto;z-index: 1800;background-color: #ffffff;/* display: none; */"});
			var headerDiv = $("<div/>",{"class":"nav_h_type infoMenuWrap flowItem", "id":"poi_list"});
			var parentItemList=$("<ul/>", {"id":"poiTab"});
			// 하단 아이템 영역 초기화
			var childrenFullItemList = $("<div/>");
			$.each(that.item,function(cnt, node){
				var innerCnt = 0;
				// 첫번째 영역만 보여지게 초기 세팅
				if(cnt==0){
					var childrenItemList = $("<div/>",{"id":"interactivePOIPopup_page_"+(cnt),"class":"infoPage","style":"flex-direction: column;"});
				} else {
					var childrenItemList = $("<div/>",{"id":"interactivePOIPopup_page_"+(cnt),"class":"infoPage","style":"flex-direction: column; display:none"});
				}
				$.each(node.item,function(){
					
					//var tempItem = $("<img/>",{"src":contextPath+"/resources/images/icon/poi_icon_"+(/^700(5|6|7)$/.test(this.id)?'7004':this.id)+".png"});
					
					var tmpCnt = Math.floor(innerCnt/2);
					
					if(innerCnt%2==0) {
						childrenItemList.append(
						$("<div/>").append(
								$("<div/>",{"class":"tab-conRow02"}).append(
									$("<div/>",{"data-id":this.id,"data-type":this.type, "class":"tab-ConCard02"}).append(
										$("<img/>",{"src":contextPath+"/resources/m2020/images/icon/poi_icon_"+(/^700(5|6|7)$/.test(this.id)?'7004':this.id)+".png"}),this.name).click(function(){
										srvLogWrite('O0', '51', '06', '00', $(this).data('id'), '');
										console.log($(this).data("type"));
										if($(this).data("type")==="theme"){
											
											if(document.location.href.match("current")){
												//srvLogWrite("M0","03", "02", "02", "theme_cd:" + $(this).data("id"), "");		//내주변 통계
											}else if(document.location.href.match("interactive")){
												//srvLogWrite("M0","05", "02", "02", "theme_cd:" + $(this).data("id"), "");		//대화형통계지도
											}else if(document.location.href.match("community")){
												//srvLogWrite("M0","08", "03", "10", "theme_cd:" + $(this).data("id"), "");		//지역현안 소통지도
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
							)
						)						
						
					} else if(innerCnt%2!=0) {
						childrenItemList.children().children().eq(tmpCnt).append(
							$("<div/>",{"data-id":this.id,"data-type":this.type, "class":"tab-ConCard02"}).append(
								$("<img/>",{"src":contextPath+"/resources/m2020/images/icon/poi_icon_"+(/^700(5|6|7)$/.test(this.id)?'7004':this.id)+".png"}),this.name).click(function(){
									srvLogWrite('O0', '51', '06', '00', $(this).data('id'), '');
									console.log($(this).data("type"));
									if($(this).data("type")==="theme"){
										
										if(document.location.href.match("current")){
											//srvLogWrite("M0","03", "02", "02", "theme_cd:" + $(this).data("id"), "");		//내주변 통계
										}else if(document.location.href.match("interactive")){
											//srvLogWrite("M0","05", "02", "02", "theme_cd:" + $(this).data("id"), "");		//대화형통계지도
										}else if(document.location.href.match("community")){
											//srvLogWrite("M0","08", "03", "10", "theme_cd:" + $(this).data("id"), "");		//지역현안 소통지도
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
					}
					
					innerCnt++;
				});
				
				childrenFullItemList.append(childrenItemList);
				
				parentItemList.append($("<li/>",{"class":"infoMenu"+(cnt==0?" on":""), "data-index":cnt}).append(
					$("<a/>",{"style":"padding: 23px 20px 20px 20px;","text":node.name}).click(function(){
						var id = $(this).parent().attr("data-index");
						var prevId = $("li.on").attr("data-index");
						//$(".infoPage:eq("+prevId+")").css("display", "none");
						//$(".infoPage:eq("+id+")").css("display", "block");
						//$("#interactivePOIPopup_page_"+prevId).hide();
						$(".infoPage").hide();
						$("#interactivePOIPopup_page_"+id).css("height", $("body").height()*0.65).css("overflow", "scroll")//20201203 박은식 - POI 리스트 스크롤 수정 및 높이값 추가
						$("#interactivePOIPopup_page_"+id).show();
						//$(".infoPage").show();
						
						$(this).parents("ul").children("li").removeClass("on");
						$(this).parent().addClass("on");
						return false;
					})
					//childrenItemList
				));
			});
			// 2022-10-14 [송은미] height 수정
			//this.poiPanel = $("<div/>",{"style":"height:"+height+"px;display:none;","class":"poi-control-panel Open_Type1"}).append(
			this.poiPanel = $("<div/>",{"style":"height:calc(100vh - 100px);display:none;","class":"poi-control-panel Open_Type1"}).append(
					$("<div/>", {"class":"gnb", "style": "justify-content:center; padding:0;"}).append(	// 2020.09.10[한광희] 이전버튼 추가로 인한 타이틀 수정
						// 2020-09-09 [곽제욱] POI X버튼(닫기) 삭제후 이전버튼 추가 START
						/*$("<h2/>",{"text":"관심지점(POI)"})
						,
						$("<div/>", {"class":"sfbFooter"}).append(
								$("<button/>", {"id":"interactivePOIPopup_close", "class":"btn_search", "type":"button", "style":"width:100%;", "text":"이전"}).click(function(){
									that.panelHide();
								})
							)
						/*,
						$("<button/>",{"type":"button","class":"btn_popClose", "id":"interactivePOIPopup_close"}).click(function(){ // X버튼
							that.panelHide();
						})
						*/
						$("<h2/>", {"class":"h2Class"}).append(
								$("<span/>",{"text":"관심지점(POI)"}),
								// 2022-10-05 [송은미] 닫기 버튼 수정
								$("<button/>",{"type":"button","class":"btn_popClose", "id":"interactivePOIPopup_close"}).click(function(){ // X버튼
									that.panelHide();
								})
							)
						// 2020-09-09 [곽제욱] POI X버튼(닫기) 삭제후 이전버튼 추가 END
						),
						headerDiv.append(parentItemList), childrenFullItemList
				);
			
			$("body").append(this.poiPanel);
			
			// 
			var index = $("li").index($("li on"));
			
		};
		/**
		 * @name            : panelShow
		 * @description     : POI 창 열기
		 * @date            : 2016. 03. 23. 
		 * @author          : 나광흠
		 * @history         :
		 */
		this.panelShow = function(){
			// 2022-10-14 [송은미] nav 활용 위해 지움 
//			$(".Wrap>.Content").hide();
//			$(".Wrap>.Content>#mapContent>.MapArea").hide();
//			$(".currenPositionWrap.currenPositionWrap").hide();
//			$(".currenPositionWrap.databtnWrap").hide();
			
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
			// 2022-09-30 [송은미] 지도 원복
			$(".Wrap>.Content").show();
			$(".Wrap>.Content>#mapContent>.MapArea").show();
			$(".currenPositionWrap.currenPositionWrap").show();
			$(".currenPositionWrap.databtnWrap").show();
			
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
						common_alert("해당 레벨에서는 사업체 POI정보를 볼 수 없습니다.");
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
				common_alert(errorMessage);
				this.onBlockUIClose();
			}
		});
	}());
	/*********** OpenAPI 리버스지오코딩. 종료 **********/
}(window, document));
