(function(W, D) {
	var activeFillColor = "#c00";
	var activeFillOpacity = "0.7";
	var defaultFillOpacity = "0.2";
	W.$house = W.$house || {};
	$house.search = {
		isAbode : null,//주거현황보기 검색인지 유무
		isIndicator : null,//지도에 통계 셋팅한 것이 지표인지 유무
		isIdealType : null,//지도에 통계 셋팅한 것이 간편동네찾기 유무
		activeAdmCd : null,//현재 활성화된 곳의 행정동 코드
		searchAdmCd : null,
		originalActiveAdmCd : null,//검색한 행정동 코드
		isShowDataboard : null,//데이터보드 보여줄지의 유무 
		/**
		 * @name        : init
		 * @description : 초기화
		 * @date        : 2016. 07. 02.
		 * @author	    : 나광흠
		 * @history 	:
		 */
		init : function(){
			$house.search.isAbode = null;
			$house.search.isIndicator = null;
			$house.search.isIdealType = null;
			$house.search.activeAdmCd = null;
			$house.search.searchAdmCd = null;
			$house.search.isShowDataboard = null;
			$house.ui.map.isAutoRefreshCensusApi = false;
			$house.ui.map.censusApi.lastParameters = null;
			$house.ui.map.borough = null;
			$("#databaord-area-button").addClass("NoneAction");
			$house.ui.map.censusApi.lastParameters = {};
			if($house.ui.recommendDataGeojson){
				$house.ui.recommendDataGeojson.remove();
			}
			if($house.ui.recommendMarker){
				$house.ui.recommendMarker.remove();
			}
			if($house.ui.map.dataBoundary){
				$house.ui.map.dataBoundary.remove();
			}
			$house.ui.map.bnd_year = bndYear;
			$("#indicator-navigator>div").removeClass("M_on");
			$("#indicator-navigator>div:eq(0)").addClass("M_on");
			$("#indicator-navigator [data-class-type=m]").removeClass("M_on");
			$("#indicator-navigator [data-class-type=m]:eq(0)").addClass("M_on");
			$house.ui.map.legend.legendPanel.hide();
			$house.ui.recommendListControl.hide();
			$house.ui.recommendListControl.empty();
			$("#indicator-avg-list").empty();
		},
		/**
		 * @name                : abode
		 * @description         : 주거현황보기 검색
		 * @date                : 2016. 07. 02.
		 * @author	            : 나광흠
		 * @history 	        :
		 */
		abode : {
			init : function(){
				$house.search.init();
				$house.search.isAbode = true;
			},
			search : function(){
				
				srvLogWrite('M0','06', '03', '02', '', '');	
				
				var abs = new sop.portal.absAPI();
				var mapOption,adm_cd,zoom,searchLevel = 1,map = $house.ui.map,locationSelectBox;
				$house.search.init();
				$house.search.isAbode = true;
				$house.ui.disabledTree();
				if($("#look-select-location").is(":checked")){
					$house.search.mapStat.indicator.adm_cd = $("#look-abode-sido").val()+$("#look-abode-sgg").val();
					mapOption = $house.databoard.getMapOptions($house.search.mapStat.indicator.adm_cd);
					locationSelectBox = $("#look-abode-"+(mapOption.adm_cd&&mapOption.adm_cd.length>=5?"sgg":"sido")+" option:selected");
					if(mapOption.adm_cd&&mapOption.adm_cd!="00"){
						$house.search.searchAdmCd = mapOption.adm_cd;
					}else{
						$house.search.searchAdmCd = null;
					}
				}else{
					$house.search.mapStat.indicator.adm_cd = null;
				}
				if(!$("#look-select-location").is(":checked")&&!$("#look-select-type").is(":checked")){
					messageAlert.open("알림","지역선택 또는 지표선택을 해주세요");
					console.error("지역선택 또는 지표선택을 해주세요");
					return;
				}else if($("#look-select-type").is(":checked")){//지표가 선택 되었을때
					abs.onBlockUIPopup();
					$house.search.isShowDataboard = false;
					var element = $("#look-abode-box>li.M_on .sub-class.M_on>a");
					$house.search.mapStat.indicator.b_class_idx_id = element.data("parent-id");
					$house.search.mapStat.indicator.m_class_idx_id = element.data("id");

					var compareLevel = parseInt(element.data("level"));
					if($house.search.mapStat.indicator.getSearchLevel($house.search.mapStat.indicator.adm_cd)>compareLevel){
						var compareLevelText,resultMessage;
						if(compareLevel==1){
							compareLevelText = "시도";
							resultMessage = "지역선택에서 시도 선택박스를 \"전국\"으로 선택해주세요.";
						}else if(compareLevel==2){
							compareLevelText = "시군구";
							resultMessage = "지역선택에서 시군구 선택박스를 \"전체\"으로 선택해주세요.";
						}
						messageAlert.open("알림","\""+element.data("text")+"\" 지표는 "+compareLevelText+"까지만 조회할 수 있습니다.<br>"+resultMessage);
						abs.onBlockUIClose();
						return;
					}else{
						if($("#look-select-location").is(":checked")){
							map.mapMove([locationSelectBox.data("x"),locationSelectBox.data("y")],mapOption.zoom);
							setTimeout(function(){
								$house.search.mapStat.indicator.search(function(){
									abs.onBlockUIClose();
								});
							},500);
						}else{
							map.mapMove([990480.875,1815839.375],2);
							$house.search.mapStat.indicator.search(function(){
								abs.onBlockUIClose();
							});
						}
					}
				}else{//지역만 선택되어있을때
					abs.onBlockUIPopup();
					if($("#look-select-location").is(":checked")){
						map.mapMove([locationSelectBox.data("x"),locationSelectBox.data("y")],mapOption.zoom);
					}
					$house.search.isShowDataboard = true;
					$house.ui.enabledTree();
					
					setTimeout(function(){
						$house.search.isCensus = true;
						$house.ui.map.isAutoRefreshCensusApi = true;
						$("#databaord-area-button").removeClass("NoneAction");
						$house.ui.map.legend.legendOptionPanel.find(".colorck a:eq(0)").click();
						$house.ui.map.legend.legendOptionPanel.find(" .btn_roption>.bg_blue").click();
						$.each($("#legend-option-"+$house.ui.map.id+" li a.circle"),function(){
							$(this).data({
								"start":$(this).data("original-start"),
								"end":$(this).data("original-end")
							});
						});
						$house.ui.map.censusApi.setStatsMapCensusData("API_0301",{
							"showData" : "tot_ppltn",
							"showDataName" : "총인구",
							"unit" : "명",
							"callback" : function(data){
								$("#databaord-area-button").removeClass("NoneAction");
								$house.search.activeAdmCd = mapOption.adm_cd;
								$house.search.originalActiveAdmCd = mapOption.adm_cd;
								$house.search.isIndicator = false;
								$house.ui.enabledTree();
								abs.onBlockUIClose();
								$("#map-stat-tree").fancytree("getTree").visit(function(node){
									if(node.data.mode=="census"&&node.data.api_id=="API_0301"){
										function expand(tr){
											if(tr.parent){
												expand(tr.parent);
											}
											if(tr.folder){
												tr.setExpanded(true);
											}
										}
										expand(node);
										node.setSelected(true);
									}
								});
							}
						},{
							"year":censusDataYear,
							"bnd_year":$house.ui.map.bnd_year
						});
					},500);
				}
				$("#search-item-box").hide();
				$house.databoard.clear();
			}
		},
		/**
		 * @name                : recommend
		 * @description         : 추천지역찾기
		 * @date                : 2016. 07. 02.
		 * @author	            : 나광흠
		 * @history 	        :
		*/
		recommend : {
			importance_cd : [],
			importance_val : [],
			importance_asis_val : [],
			importance_search_val : [],
			importance_disp_lev : [],
			itemArray : [],
			now_resid_sido_cd : null,
			now_resid_sido_cd : null,
			now_resid_sido_cd : null,
			now_resid_sido_cd : null,
			init : function(){
				$house.search.init();
				$house.databoard.clear();
				$house.search.isAbode = false;
				$house.search.isIndicator = false;
				$house.search.isIdealType = false;
				$house.search.isShowDataboard = true;
				this.importance_cd = [];
				this.importance_val = [];
				this.importance_asis_val = [];
				this.importance_search_val = [];
				this.importance_disp_lev = [];
				this.itemArray = [];
				this.now_resid_sido_cd = null;                          
				this.now_resid_sgg_cd = null;                          
				this.inter_resid_sido_cd = null; 
				this.inter_resid_sgg_cd = null;
				if($house.ui.recommendDataGeojson){
					$house.ui.recommendDataGeojson.remove();
				}
			},
			search : function(){
				
				
				dashBoardTitle = "추천지역 찾기 -";
				var abs = new sop.portal.absAPI();
				if($("#recommend-box li[class^=index]>ul>li.M_on").length>0){
					this.init();
					$house.ui.recommendMarker = null;
					abs.onBlockUIPopup();
					
					var swt = true;
					$("#recommend-box li[class^=index]>ul>li.M_on").each(function(){
						var info = $house.menu.getRecommendIndicatorInfo($(this).find("a").data("id"));
						$house.search.recommend.itemArray.push(
							$("<img/>",{
								"src":info.image_over,
								"style":"",
								"alt":info.title,
								"title":info.tooltip,
								"data-id":info.m_class_idx_id,
								"data-html":true
							}).tooltip()
						);
						if(swt){
							srvLogWrite('M0','06', '01', '02', '', '');	
							dashBoardTitle = " " + dashBoardTitle +  info.title;
							swt = false;
						}else{
							dashBoardTitle = dashBoardTitle +  ", " + info.title;
						}
						
						$house.search.recommend.importance_cd.push($(this).find("a").data("id"));
						$house.search.recommend.importance_val.push($(this).find("select").val());
						$house.search.recommend.importance_asis_val.push($(this).find("span.bagic").data("value"));
						$house.search.recommend.importance_search_val.push($(this).find("span.SetStart>button.M_on").val());
						$house.search.recommend.importance_disp_lev.push($(this).find("a").data("level"));
						$house.search.recommend.now_resid_sido_cd = $("#stand-recommend-sido").val(); 
						$house.search.recommend.now_resid_sgg_cd = $("#stand-recommend-sgg").val();
						$house.search.recommend.inter_resid_sido_cd = $("#inter-recommend-sido").val();
						$house.search.recommend.inter_resid_sgg_cd = $("#inter-recommend-sgg").val();
					});
					if($house.search.recommend.importance_cd.length<1){
						messageAlert.open("알림","중요도 설정을 하나이상 해주세요.");
						abs.onBlockUIClose();
						return;
					}else if($house.search.recommend.importance_cd.length >= 9){
						messageAlert.open("알림","중요도는 최대 9개까지 선택하실 수 있습니다.");
						abs.onBlockUIClose();
						return;
					}
					
					//$("#databoard-area-title").html(dashBoardTitle);
					
					
					$house.search.recommendSearch(abs);
				}
			}
		},
		/**
		 * @name                : idealType
		 * @description         : 간편 동네 찾기
		 * @date                : 2016. 07. 02.
		 * @author	            : 나광흠
		 * @history 	        :
		*/
		idealType : {
			importance_cd : [],
			importance_val : [],
			importance_asis_val : [],
			importance_search_val : [],
			importance_disp_lev : [],
			itemArray : [],
			now_resid_sido_cd : null,
			now_resid_sido_cd : null,
			now_resid_sido_cd : null,
			now_resid_sido_cd : null,
			init : function(){
				$house.search.init();
				$house.databoard.clear();
				$house.search.isAbode = false;
				$house.search.isIndicator = false;
				$house.search.isIdealType = true;
				$house.search.isShowDataboard = true;
				this.importance_cd = [];
				this.importance_val = [];
				this.importance_asis_val = [];
				this.importance_search_val = [];
				this.importance_disp_lev = [];
				this.itemArray = [];
				this.now_resid_sido_cd = null;                          
				this.now_resid_sgg_cd = null;                          
				this.inter_resid_sido_cd = null; 
				this.inter_resid_sgg_cd = null;   
				if($house.ui.recommendDataGeojson){
					$house.ui.recommendDataGeojson.remove();
				}
			},
			search : function(){ 
				
				srvLogWrite('M0','06', '02', '02', '', '');	
				
				dashBoardTitle = "간편동네 찾기";
				var abs = new sop.portal.absAPI();
				this.init();
				if($("#ideal-type-final-search-item-list li.This").length>0){
					$("#ideal-type-final-search-item-list li.This").each(function(cnt,node){
						if(hasText($(node).data("b_class_search_serial"))&&hasText($(node).data("m_class_search_serial"))&&hasText($(node).data("s_class_search_serial"))){
							var ideal = idealTypeInfoList[$(node).data("b_class_search_serial")].children[$(node).data("m_class_search_serial")].children[$(node).data("s_class_search_serial")];
							var mClassInfo = bClassInfoList[ideal.b_class_idx_id].indicator[ideal.m_class_idx_id];
							if(hasText(ideal)){
								var wghtval = $(node).find("b").text();
								$house.search.idealType.importance_cd.push(ideal.m_class_idx_id);
								$house.search.idealType.importance_val.push(6-cnt);
								$house.search.idealType.importance_asis_val.push(6-cnt);
								$house.search.idealType.importance_search_val.push(ideal.order_base);
								$house.search.idealType.importance_disp_lev.push(mClassInfo.disp_level);
							}else{
								console.warn("\""+$(node).find(".title").text()+"\" 지표가 잘못 설정 되어있습니다");
							}
						}else{
							console.warn("\""+$(node).find(".title").text()+"\" 지표가 설정이 되지 않았습니다");
						}
					});
				}else{
					messageAlert.open("알림", "우선순위 설정이 잘못되었습니다");
					return false;
				}
				$house.search.idealType.now_resid_sido_cd = "00"; 
				$house.search.idealType.now_resid_sgg_cd = "999";
				$house.search.idealType.inter_resid_sido_cd = $("#ideal-type-sido").val();
				$house.search.idealType.inter_resid_sgg_cd = $("#ideal-type-sgg").val();
				abs.onBlockUIPopup();
				
				//$("#databoard-area-title").html(dashBoardTitle);
				$house.search.recommendSearch(abs);
			}
		},
		/**
		 * @name                : recommendSearch
		 * @description         : 추천지역찾기 프로세스
		 * @date                : 2016. 07. 02.
		 * @author	            : 나광흠
		 * @history 	        :
		*/
		recommendSearch : function(abs){
			$.ajax({
				url : sgisContextPath+"/ServiceAPI/house/recommendAreaLists.geojson",
				type:"POST",
				data: {
					now_resid_sido_cd : $house.search.getRecommendObject().now_resid_sido_cd, 
					now_resid_sgg_cd : $house.search.getRecommendObject().now_resid_sgg_cd,
					inter_resid_sido_cd : $house.search.getRecommendObject().inter_resid_sido_cd,
					inter_resid_sgg_cd : $house.search.getRecommendObject().inter_resid_sgg_cd,
					importance_cd : $house.search.getRecommendObject().importance_cd.join(),
					importance_val : $house.search.getRecommendObject().importance_val.join(),
					base_year : $house.ui.map.bnd_year,
					importance_asis_val : $house.search.getRecommendObject().importance_val.join(),//importance_disp_lev.join() TODO 현재 기준 가중치를 관심 가중치로 넘겨주고있습니다,
					importance_search_val : $house.search.getRecommendObject().importance_search_val.join(),
					importance_disp_lev : $house.search.getRecommendObject().importance_disp_lev.join()
				},
				async: true,
				dataType:"json",
				success: function(res){
					var parameter = "";
					parameter += "now_resid_sido_cd=" + $house.search.getRecommendObject().now_resid_sido_cd + "&";
					parameter += "now_resid_sgg_cd=" + $house.search.getRecommendObject().now_resid_sgg_cd + "&";
					parameter += "inter_resid_sido_cd=" + $house.search.getRecommendObject().inter_resid_sido_cd + "&";
					parameter += "inter_resid_sgg_cd=" + $house.search.getRecommendObject().inter_resid_sgg_cd + "&";
					parameter += "importance_cd=" + $house.search.getRecommendObject().importance_cd.join() + "&";
					parameter += "importance_val="+ $house.search.getRecommendObject().importance_val.join() + "&";
					parameter += "base_year=" + $house.ui.map.bnd_year + "&";
					parameter += "importance_asis_val=" + $house.search.getRecommendObject().importance_val.join() + "&";
					parameter += "importance_search_val=" + $house.search.getRecommendObject().importance_search_val.join() + "&";
					parameter += "importance_disp_lev=" + $house.search.getRecommendObject().importance_disp_lev.join() + "&";
					
					var title = $(".gnb h2").text();
					var zoomLevel = $house.ui.map.currentDefaultZoom;
					var adm_nm = ""; 
					if($(".subject3").hasClass("M_on")){
						adm_nm = $("#ideal-type-sido option:selected").text() + " " + $("#ideal-type-sgg option:selected").text();
					}else if($(".subject2").hasClass("M_on")){
						adm_nm = "기준지역: " + $("#stand-recommend-sido option:selected").text() + " " + $("#stand-recommend-sgg option:selected").text() +
						", 관심지역: " + $("#inter-recommend-sido option:selected").text() + " " + $("#inter-recommend-sgg option:selected").text();
					}	
					apiLogWrite2("L0", "L04", title, parameter, zoomLevel, adm_nm);
					
					if(res.errCd=="0"){
						if(res.features.length>0){
							$.each($house.search.getRecommendObject().itemArray,function(cnt,node){
								$house.ui.recommendListControl.updateItem(node);
							});
							var id = uuid();
							var ul = $("<ul/>");
							$.each(res.features,function(cnt,node){
								ul.append($("<li/>").append(
									$("<label/>").append(
										$("<input/>",{type:"radio","name":"recommend-"+id,"data-coor-x":node.properties.x,"data-coor-y":node.properties.y,"data-adm-cd":node.properties.adm_cd,"checked":cnt==0}),
										node.properties.adm_nm	
									)
								));
							});
							$house.ui.recommendListControl.update(ul);
							$house.ui.recommendListControl.show();
							var adm_cd = res.features[0].properties.adm_cd;
							$house.search.activeAdmCd = adm_cd;
							$house.search.originalActiveAdmCd = adm_cd;
							$house.search.searchAdmCd = adm_cd;
							$house.ui.recommendDataGeojson = null;
							$house.ui.map.mapMove([res.features[0].properties.x,res.features[0].properties.y], $house.databoard.getMapOptions(adm_cd).zoom, false);
							drawRegionPolygon(res);
							$house.ui.map.mapControlButton.hide();
							$house.ui.map.gMap.fitBounds($house.ui.recommendDataGeojson.getLayers()[0],{
								animate : false
							});
							$("#search-item-box").hide();
							$house.search.isShowDataboard = true;
							$house.search.isAbode = false;
							$house.search.isIndicator = false;
							$("#databaord-area-button").removeClass("NoneAction");
							$house.ui.enabledTree();
							$house.ui.recommendListControl.open();
						}else{
							messageAlert.open("알림", "검색된 추천지역리스트가 없습니다.");
						}
					}else{
						messageAlert.open("알림",res.errMsg);
					}
					abs.onBlockUIClose();
				},
				error: function(data){
					messageAlert.open("알림",errorMessage);
					abs.onBlockUIClose();
					return false;
				}
			});
		},
		/**
		 * @name        : activeLayer
		 * @description : 레이어 활성화
		 * @date        : 2016. 07. 02.
		 * @author	    : 나광흠
		 * @history 	:
		 * @param layer	: layer
		 */
		activeLayer : function(layer){
			if($house.ui.recommendDataGeojson){
				$.each($house.ui.recommendDataGeojson.getLayers(),function(cnt,node){
					if(node.options.fillOpacity==activeFillOpacity){
						node.setStyle({
							fillOpacity: defaultFillOpacity
						});
						return false;
					}
				});
				layer.setStyle({
					fillOpacity: activeFillOpacity
				});
				$house.search.activeAdmCd = layer.feature.properties.adm_cd;
				$house.ui.recommendListControl.getAdmCdRadio(layer.feature.properties.adm_cd).prop("checked",true);
			}
			$house.databoard.clear();
		},
		mapStat : {//지도에 통계 셋팅해주는 부분
			indicator : {
				b_class_idx_id : null,//대분류
				m_class_idx_id : null,//중분류
				adm_cd : null,//행정동 코드
				/**
				 * @name         : getSearchLevel
				 * @description  : 
				 * @date         : 2016. 08. 10.
				 * @author	     : 나광흠
				 * @history 	 :
				 * @param adm_cd : 행정동 코드
				 */
				getSearchLevel : function(adm_cd){
					var mapOption = $house.databoard.getMapOptions(adm_cd);
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
				 * @date         : 2016. 08. 10.
				 * @author	     : 나광흠
				 * @history 	 :
				 */
				search : function(callback){
					var map = $house.ui.map;
					var abs = new sop.portal.absAPI();
					abs.onBlockUIPopup();
					$house.search.isIndicator = true;
					var mapOption = $house.databoard.getMapOptions(this.adm_cd);
					var searchLevel = this.getSearchLevel(mapOption.adm_cd);
					var mClassObject = bClassInfoList[this.b_class_idx_id].indicator[$house.search.mapStat.indicator.m_class_idx_id];
					var year = bndYear;
					$house.ui.map.borough = null;
					if(this.b_class_idx_id=="HML0005"&&this.m_class_idx_id=="HMM0018"){//대중교통 이용자 비율
						year= "2010"
					}else if(
						(this.b_class_idx_id=="HML0003"&&this.m_class_idx_id=="HMM0012")||//순유입인구
						(this.b_class_idx_id=="HML0006"&&this.m_class_idx_id=="HMM0020")//교원 1인당 학생수		
					){
						$house.ui.map.borough = "1";
						year= "2014";
					}
					map.bnd_year = year;
					
					if(searchLevel>parseInt(mClassObject.disp_level)){
						searchLevel = parseInt(mClassObject.disp_level);
					}
					if(searchLevel==1){
						mapOption = $house.databoard.getMapOptions(null);
					}else if(searchLevel==2){
						mapOption = $house.databoard.getMapOptions(mapOption.adm_cd.substring(0,2));
					}else if(searchLevel==3){
						mapOption = $house.databoard.getMapOptions(mapOption.adm_cd.substring(0,5));
					}else{
						return;
					}
					this.adm_cd = mapOption.adm_cd;
					$house.api.houseAnalysisOrderLists(searchLevel,this.b_class_idx_id,this.m_class_idx_id,year,mapOption.sido_cd,mapOption.sgg_cd,function(res){
						var isNegative = false,showData = "value",reverseArray = [],startColor,endColor;
						if(
							$house.search.mapStat.indicator.b_class_idx_id=="HML0001"&&
							($house.search.mapStat.indicator.m_class_idx_id=="HMM0001"||$house.search.mapStat.indicator.m_class_idx_id=="HMM0002")
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
						var legendColorButton = map.legend.legendOptionPanel.find("a[data-end=rgb\\("+$house.databoard.bClassInfoList[mClassObject.b_class_idx_id].rgbColor.replace(/,/gi,"\\,")+"\\)]");
						$.each($("#legend-option-"+$house.ui.map.id+" li a.circle"),function(){
							if(reverseArray.indexOf($house.search.mapStat.indicator.m_class_idx_id)>-1){
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
						var parameter = "";
						parameter += "searchLevel=" + searchLevel + "&";
						parameter += "b_class_idx_id=" + $house.search.mapStat.indicator.b_class_idx_id + "&";
						parameter += "m_class_idx_id=" + $house.search.mapStat.indicator.m_class_idx_id + "&";
						parameter += "year=" + year + "&";
						var title = $(".gnb h2").text();
						var zoomLevel = $house.ui.map.currentDefaultZoom;
						var adm_nm = $("#look-abode-sido option:selected").text() + " " + $("#look-abode-sgg option:selected").text();
						apiLogWrite2("L0", "L04", title, parameter, zoomLevel, adm_nm);
					});
				}
			}
		},
		/**
		 * @name         : getRecommendObject
		 * @description  : 추천지역찾기인지 간편동네찾기인지에 따라 오브젝트 반환
		 * @date         : 2016. 12. 01.
		 * @author	     : 나광흠
		 * @history 	 :
		 */
		getRecommendObject : function(){
			return $house.search.isAbode===false&&$house.search.isIdealType===true?$house.search.idealType:$house.search.recommend;
		}
	};
	/**
	 * @name         : drawRegionPolygon
	 * @description  : 지역에 대한 폴리곤 생성
	 * @date         : 2016. 01. 03.
	 * @author	     : 나광흠
	 * @history 	 :
	 * @param data   : 폴리곤 생성해줄 데이터
	 */
	function drawRegionPolygon(data){
		var map = $house.ui.map;
		var defaultStyle = {
			weight : 1.25,
			opacity : 1,
			color : "white",
			dashArray: "",
			fillOpacity : defaultFillOpacity,
			fillColor : activeFillColor,
			type:"region",
		};
		$house.ui.recommendDataGeojson = sop.geoJson(data, {
			style: function (feature) {
				var style = $.extend(true, {}, defaultStyle);
				if(feature.properties.fillColor){
					style.fillColor = feature.properties.fillColor;
				}
				return style;
			},
			onEachFeature: function (feature, layer) {
				layer.on("click",function(e){
					$house.ui.recommendDataGeojson.eachLayer(function(layer) {
						layer.removeCaption();
					});
					layer.setCaption({title:layer.feature.properties.adm_nm, color:"#000",size:"15px"}, [layer.feature.properties.x,layer.feature.properties.y]);
					if(layer.captionObj&&layer.captionObj._captionspan){
						$(layer.captionObj._captionspan).click(function(e){
							$.each($house.ui.recommendDataGeojson.getLayers(),function(cnt,recommendLayer){
								if(recommendLayer._containsPoint ) {
									var point = $house.ui.map.gMap.mouseEventToLayerPoint(e); // 터치 포인트
									if( recommendLayer._containsPoint(point)){
										recommendLayer.fire("click");
									}
								}
							});
						});
						$(layer.captionObj._captionspan).css({
							"font-family": "나눔고딕B",
							"text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
							"-moz-text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
							"-webkit-text-shadow": "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff"
						});
					}
					$house.search.activeLayer(layer);
					var box = $($house.ui.recommendListControl._div).find(".history-list>div.recommend-list");
					box.stop().animate({
						scrollTop: $house.ui.recommendListControl.getAdmCdRadio(layer.feature.properties.adm_cd).offset().top-box.children("ul").offset().top
					}, 801);
					if($house.ui.recommendMarker){
						$house.ui.recommendMarker.remove();
					}
					$house.ui.recommendMarker = sop.marker([layer.feature.properties.x,layer.feature.properties.y],{adm_cd:layer.feature.properties.adm_cd});
					$house.ui.recommendMarker.addTo(map.gMap);
					$house.ui.map.mapControlButton.show();
				});
			}
		}).addTo(map.gMap);
		if($house.ui.recommendDataGeojson){
			$house.ui.recommendDataGeojson.getLayers()[0].fire("click");
		}
	}
}(window, document));

