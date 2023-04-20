(function(W, D) {
	W.$totSurvMap = W.$totSurvMap || {};
	const defaultCenter = [1009818, 1790781];
	$(document).ready(function() {
		srvLogWrite('O0', '13', '01', '01', '', '');
		$totSurvMap.event.setUIEvent();
		//보도자료 이름 변경
		if($('meta[name="sub-title"]').attr("content") == "인구"){
			$("#press_release_text").text("인구총조사");
			$("#press-release-button").attr('href',"https://www.kostat.go.kr/portal/korea/kor_nw/1/2/2/index.board")
		}else if($('meta[name="sub-title"]').attr("content") == "가구"){
			$("#press_release_text").text("인구총조사");
			$("#press-release-button").attr('href',"https://www.kostat.go.kr/portal/korea/kor_nw/1/2/2/index.board")
		}else if($('meta[name="sub-title"]').attr("content") == "주택"){
			$("#press_release_text").text("주택총조사");
			$("#press-release-button").attr('href',"https://www.kostat.go.kr/portal/korea/kor_nw/1/10/2/index.board")
		}else if($('meta[name="sub-title"]').attr("content") == "농업"){
			$("#press_release_text").text("농림어업총조사");
			$("#press-release-button").attr('href',"https://www.kostat.go.kr/portal/korea/kor_nw/1/8/2/index.board")
		}else if($('meta[name="sub-title"]').attr("content") == "임업"){
			$("#press_release_text").text("농림어업총조사");
			$("#press-release-button").attr('href',"https://www.kostat.go.kr/portal/korea/kor_nw/1/8/2/index.board")
		}else if($('meta[name="sub-title"]').attr("content") == "어업"){
			$("#press_release_text").text("농림어업총조사");
			$("#press-release-button").attr('href',"https://www.kostat.go.kr/portal/korea/kor_nw/1/8/2/index.board")
		}else if($('meta[name="sub-title"]').attr("content") == "경제"){
			$("#press_release_text").text("경제총조사");
			$("#press-release-button").attr('href',"https://www.kostat.go.kr/portal/korea/kor_nw/1/9/5/index.board")
		}
		
		
		/*		$(".leftCol .btnNavThematic").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".nav-layer").css("display","block");
        	}else{
        		$(this).removeClass('active');
        		$(".nav-layer").css("display","none");
        	}
        });
		
				$(".locationboxwrap2").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$("#filter").css("display","block");
        	}else{
        		$(this).removeClass('active');
        		$("#filter").css("display","none");
        	}
		})
		
		$(".data-year").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');

        	}else{
        		$(this).removeClass('active');

        	}
		})
		
		$(".dashOpen").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '60vh'
    	        }); 
        	}else{
        		$(this).removeClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '50px'
    	        }); 
        	}
		})*/
		
		//2022-10-13 [송은미] nav 변경에 따른 이벤트 추가
		$(".leftCol .btnNavThematic").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".nav-layer").css("display","block");
        		$("#totSurvMapRegionPop").css("display","none");
    			$("#year-container").css("display","none");
    			$(".locationboxwrap2").removeClass('active');
    			$("#data-year").removeClass('active');
    			$(".dashOpen").removeClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '50px'
    	        });
        		$("#ecnmy-type").css("display","none");
        		$(".ecnmyType").removeClass('active');
        	}else{
        		$(this).removeClass('active');
        		$(".nav-layer").css("display","none");
        	}
        });
		
		$(".nav-layer ul li").click(function(){
			$(this).addClass('active');
		})
		//2022-11-29 이벤트 수정 및 추가
		$("#common_popup_area_close, #common_popup_back, #common_popup_year_close").click(function(){
			$("#totSurvMapRegionPop").css("display","none");
			$(".locationboxwrap2").removeClass('active');
			$("#year-container").css("display","none");
			$("#common_popup_back").css("display","none");
			$(".data-year").removeClass('active');
			$(".ecnmyType").removeClass('active');
			$(".fisheryType").removeClass('active');
		})
		
		$("#totSurvMapRegionPopOk").click(function(){
			$("#triggerBtn").trigger("click");
			$("#totSurvMapRegionPop").css("display","none");
			$(".locationboxwrap2").removeClass('active');
			$("#common_popup_back").css("display","none");
		})
		
		$("#year-list .option__btn").click(function(){
			$("#triggerBtn").trigger("click");
			$("#year-container").css("display","none");
			$("#data-year").removeClass('active');
			$(".data-year").html($(this).text());
		})
		
		//2022-11-29 이벤트 추가  2022-12-02 어업,경제 추가  
		$("#year-list option:first-child").addClass("selected");
		$("#data-year").empty();
		$("#data-year").html($("#year-list option:first-child").val());
		$("#year-list").change(function(){
			$("#year-list option").removeClass("selected");
			$("#year-list option:selected").addClass("selected");
		})
		
		$("#totSurvMapYearPopOk").click(function(){
			const selectYear = $("#year-list option[aria-checked='true']").attr("data-value");			
			$("#data-year").empty();
			$("#data-year").html(selectYear + "년");
			$("#triggerBtn").trigger("click");
			$("#year-container").css("display","none");
			$("#common_popup_back").css("display","none");
			$("#data-year").removeClass('active');
			const ecnmyTypeTxt = $("#ecnmy-type option:selected").text();
			$(".ecnmyType").html(ecnmyTypeTxt);
			$(".ecnmyType").removeClass('active');
			const fisheryTypeTxt = $("#fishery-type option:selected").text();
			$(".fisheryType").html(fisheryTypeTxt);
			$(".fisheryType").removeClass('active');
		})
		
		$("#ecnmy-type").change(function(){
			$("#ecnmy-type option").removeClass("selected");
			$("#ecnmy-type option:selected").addClass("selected");
		})
		
		$(".data-year").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$("#year-container").css("display","block");
        		$(".nav-layer").css("display","none");
        		$(".btnNavThematic").removeClass('active');
        		$("#totSurvMapRegionPop").css("display","none");
        		$(".locationboxwrap2").removeClass('active');
        		$(".dashOpen").removeClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '50px'
    	        });
//        		$("#ecnmy-type").css("display","none");
 //       		$(".ecnmyType").removeClass('active');
        		$("#common_popup_back").css("display","block");
        		$("#ecnmy-type").css("display","block");
        		//2022-12-02 css 추가 
        		$(".yearPopTitle").css("display","block");
        		$(".ecnmyPopTitle").css("display","none");
        		$(".fisheryPopTitle").css("display","none");
			}else{
        		$(this).removeClass('active');
        		$("#year-container").css("display","none");
        		$("#common_popup_back").css("display","none");
        		//2022-12-02 css 추가 
        		$(".yearPopTitle").css("display","none");
        	}
		})
		
		$(".locationboxwrap2").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$("#filter").css("display","block");
        		//2022-10-13 [송은미] nav 변경에 따른 이벤트 추가
        		$("#totSurvMapRegionPop").css("display","block");
        		$(".nav-layer").css("display","none");
        		$(".btnNavThematic").removeClass('active');
        		$("#year-container").css("display","none");
    			$("#data-year").removeClass('active');
    			$(".dashOpen").removeClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '50px'
    	        });
 //       		$("#ecnmy-type").css("display","none");
        		$(".ecnmyType").removeClass('active');
        		$("#common_popup_back").css("display","block");
        	}else{
        		$(this).removeClass('active');
        		$("#filter").css("display","none");
        		//2022-10-13 [송은미] nav 변경에 따른 이벤트 추가
        		$("#totSurvMapRegionPop").css("display","none");
        		$("#common_popup_back").css("display","none");
        	}
		})
		
		$(".dashOpen").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '60vh'
    	        });
    	        //2022-10-13 [송은미] nav 변경에 따른 이벤트 추가
        		$(".nav-layer").css("display","none");
        		$(".btnNavThematic").removeClass('active');
        		$("#totSurvMapRegionPop").css("display","none");
        		$(".locationboxwrap2").removeClass('active');
        		$("#year-container").css("display","none");
        		$(".data-year").removeClass('active');
        		$("#ecnmy-type").css("display","none");
        		$(".ecnmyType").removeClass('active');
        	}else{
        		$(this).removeClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '50px'
    	        });
    	        //2022-10-13 [송은미] nav 변경에 따른 이벤트 추가
        		$(".nav-layer").css("display","none");
        		$(".btnNavThematic").removeClass('active');
        		$("#totSurvMapRegionPop").css("display","none");
        		$(".locationboxwrap2").removeClass('active');
        		$("#year-container").css("display","none");
        		$(".data-year").removeClass('active');
        	}
		});
		//2022-11-01 원복
    	
    	$(".ecnmyType").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$("#ecnmy-type").css("display","block");
        		$(".nav-layer").css("display","none");
        		$(".btnNavThematic").removeClass('active');
        		$("#totSurvMapRegionPop").css("display","none");
        		$(".locationboxwrap2").removeClass('active');
        		$(".dashOpen").removeClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '50px'
    	        });
        		$(".data-year").removeClass('active');
        		$("#year-container").css("display","block");
        		$("#common_popup_back").css("display","block");
        		//2022-12-02 css 추가 
        		$(".yearPopTitle").css("display","none");
        		$(".ecnmyPopTitle").css("display","block");
			}else{
        		$(this).removeClass('active');
        		  $("#year-container").css("display","none");
        		  $("#common_popup_back").css("display","none");
        		  //2022-12-02 css 추가 
        		  $(".ecnmyPopTitle").css("display","none");
          		  $(".yearPopTitle").css("display","block");
        	}
			//$("#ecnmy-type option[data-type='ecnmy9th']").prop("selected", true);
		})
		
		/*$(document).on("click", "#ecnmy-type .option__btn", function() {
			$(".ecnmyType").html($(this).text());
//			$("#ecnmy-type").css("display","none");
			$(".ecnmyType").removeClass('active');
			$(".data-year").addClass('active');
			$("#year-container").css("display","block");
//			$("#ecnmy-type button[aria-checked=true]").data("type");
		});*/
		
		$(".fisheryType").click(function(){
			if(!$(this).hasClass('active')){
        		$(this).addClass('active');
        		$("#fishery-type").css("display","block");
        		$(".nav-layer").css("display","none");
        		$(".btnNavThematic").removeClass('active');
        		$("#totSurvMapRegionPop").css("display","none");
        		$(".locationboxwrap2").removeClass('active');
        		$(".dashOpen").removeClass('active');
        		$(".dashAbsolute").animate({
    	            'height' : '50px'
    	        });
        		$(".data-year").removeClass('active');
        		$("#year-container").css("display","block");
        		$("#common_popup_back").css("display","block");
        		//2022-12-02 css 추가 
        		$(".yearPopTitle").css("display","none");
        		$(".fisheryPopTitle").css("display","block");
			}else{
        		$(this).removeClass('active');
        		  $("#year-container").css("display","none");
        		  $("#common_popup_back").css("display","none");
        		  //2022-12-02 css 추가 
        		  $(".fisheryPopTitle").css("display","none");
          		  $(".yearPopTitle").css("display","block");
        	}
		})
		
	});
	
	let isLoad = false;
	$(window).on("orientationchange",function(){
		setTimeout(function(){
			$totSurvMap.event.mapResize();
		},100);
	});
	$totSurvMap.ui = {
		/**
		 * @name         : tooltipMap 
		 * @description  : 레이어 팝업으로 나오는 지도에대한 툴팁
		 */
		tooltipMap:{
			selectedAdmCd:null,//선택된 지역 코드
			selectedAdmNm:"전국",//선택된 지역 이름
			didSelectedPolygon : null,//선택된 지역 폴리곤
			/**
			 * @name                     : tooltipMap 
			 * @description              : 레이어 팝업으로 나오는 지도에대한 툴팁
			 * @param tooltipCallback    : tooltip callback
			 * @param didSelectedPolygon : 선택된 지역 폴리곤
			 */
			show:function({tooltipCallback,didSelectedPolygon}){
				$totSurvMap.ui.tooltipMap.selectedAdmNm = $totSurvMap.ui.selectedAdmNm;
				if(typeof tooltipCallback === "function"){
					tooltipCallback();
				}
				$("#tooltip-map-tooltip").hide();
				$("#tooltip-map-container,.dim").show();
				$totSurvMap.ui.map["tooltip-map"].gMap.invalidateSize();
				$totSurvMap.ui.map["map"].copyDataBoundary($totSurvMap.ui.map["tooltip-map"]);
//				if($totSurvMap.ui.admCd=="00"){
//					$totSurvMap.ui.map["tooltip-map"].gMap.setView(defaultCenter,1);
//				}else{
					$totSurvMap.ui.map["tooltip-map"].gMap.fitBounds($totSurvMap.ui.map["tooltip-map"].dataBoundary);
//				}
				$("#tooltip-map-tooltip [data-id=region-name]").text($totSurvMap.ui.tooltipMap.selectedAdmNm);
				$totSurvMap.ui.tooltipMap.didSelectedPolygon = didSelectedPolygon;
			}
		},
		locationNameArray:["전국"],//현재 지역 명칭array
		admCd : null,//지도에 뿌려준 코드
		selectedAdmNm : "전국",//선택된 지역 이름
		year : null,//지도에 뿌려준 년도
		theme:null,//현재 페이지 테마 명
		map : {},//지도
		isAtdrc : false,	// 비자치구 여부  (ex 수원시 (5자리) 클릭시 구정보 조회) / census 조회시 true면 5자리라도 조회 안하도록
		/**
		 * @name         : getMataDataUrl
		 * @description  : kosis url 조회
		 * @param survId : 조사ID
		 */
		getMataDataUrl:function(survId){
			$.ajax({
				method: "POST",
				async: true,
				url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotSurvInfo.json",
				data: {"survId": survId},
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						// 총조사시각화정보
						window.open(res.result.totSurvInfo[0].surv_url,"_blank"); 
					}
				},
				error: function(e) {
					console.error(e);
				}
			});
		},
		/**
		 * @name         : themeData 
		 * @description  : 테마에 대한 필요 정보들
		 */
		themeData:{
			pressRelease:{//보도자료에서 사용될 연도별 파라미터, 2020년 데이터는 이벤트 거는 곳에 분기 처리 되어있음 
				"2019":"384690",
				"2018":"377115",
				"2017":"370326",
				"2016":"362609",
				"2015":"356061"
			},
			population : {//인구
				defaultColor : "#f16b41",
				name:"인구",
				mapData : {
					getParameters : function(){
						return {
							surv_id : "PH0001",
							itm_cd : "T100"
						};
					},
					unit:"명"
				}
			},
			houseHold : {//가구
				defaultColor : "#f16b41",
				name:"가구",
				mapData : {
					getParameters : function(){
						return {
							surv_id : "PH0001",
							itm_cd : "T200"
						};
					},
					unit:"가구"
				}
			},
			house : {//주택
				defaultColor : "#f16b41",
				name:"주택",
				mapData : {
					getParameters : function(){
						return {
							surv_id : "PH0001",
							itm_cd : "T310"
						};
					},
					unit:"호"
				}
			},
			farm : {//농가
				defaultColor : "#783400",
				name:"농업",
				mapData : {
					getParameters : function(){
						let result = {
							itm_cd : "T00",
							c1 : "000"
						};
						if($totSurvMap.ui.year == "2015"){
							result.surv_id = "FS0013";
						} else if($totSurvMap.ui.year == "2010"){
							result.surv_id = "FS0315";
						} else if($totSurvMap.ui.year == "2020"){
							result.surv_id = "FS0600";
						}
						return result;
					},
					unit:"가구"
				}
			},
			forestry : {//임가
				defaultColor : "#539c3f",
				name:"임업",
				mapData : {
					getParameters : function(){
						let result = {
							itm_cd : "T00",
							c1 : "000"
						};
						if($totSurvMap.ui.year == "2015"){
							result.surv_id = "FS0013";
						} else if($totSurvMap.ui.year == "2020"){
							result.surv_id = "FS0600";
						} else{
							result.surv_id = "FS0532";
						}
						return result;
					},
					unit:"가구"
				}
			},
			fishery : {//어가
				defaultColor : "#598aac",
				name:"어업",
				fisheryType:"sea",
				mapData : {
					getParameters : function(){
						const themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
						let result = {
							itm_cd : "T00",
							c1 : "000"
						};
						if($totSurvMap.ui.year == "2015"){
							if(themeInfo.fisheryType =="sea"){
								result.surv_id = "FS0112";
							} else {
								result.surv_id = "FS0171";
							}
											
						} else if($totSurvMap.ui.year == "2010"){
							if(themeInfo.fisheryType =="sea"){
								result.surv_id = "FS0413";
							} else {
								result.surv_id = "FS0469";
							}
						} else if($totSurvMap.ui.year == "2020"){
							if(themeInfo.fisheryType =="sea"){
								result.surv_id = "FS0614";
							} else {
								result.surv_id = "FS0621";
							}
						}
						return result;
					},
					unit:"가구"
				}
			},
			ecnmy : {//경제
				defaultColor : "#7d63ad",
				name:"경제",
				//ecnmyType:"ecnmy10th",
				ecnmyType:"ecnmy9th",	// 2022-03-15 [이영호] 경제는 9차 2015년 이 기본화면으로 결론 [bcw] 요청
				dispOptions : {},//화면 셋팅
				ajaxParams:{},
				mapData : {
					itmLv : null,
					admLv : null,
					getParameters : function(year){
						year = year||$totSurvMap.ui.year;
						$totSurvMap.ui.themeData.ecnmy.dispOptions = {};
						//경제총조사 기본 파라메터 셋팅
						let result = {
							surv_year_list: year										// 수록시점
							, org_id_list: "101"										// 조직번호
							, tbl_id_list: null											// 통계표 ID
							, list_var_ord_list: "" 									// 차트화 할 대상 T20, T21, T22, T31, T32, T41, T42, T51, T52, T60
							, char_itm_id_list: "T20"									// 표특성항목
							, prt_type: ""												// 출력방식 total:계 else 모두
							, adm_cd: null												// 지역코드
							, ov_l1_list: ""											// 항목 1
							, ov_l2_list: ""											// 항목 2
							, ov_l3_list: ""											// 항목 3
							, ov_l4_list: ""											// 항목 4
							, ov_l5_list: ""											// 항목 5
							, category: "ecnmy"											// 카테고리
							, odr_col_list: "DTVAL_CO"									// 정렬기준
							, odr_type: "DESC"											// 내림차순, 오름차순
						};
						if(year == "2010") {
							result.tbl_id_list = 'DT_1KI2002';
							result.adm_cd = 'l1:'+$totSurvMap.ui.admCd;			
						} else {
							if($totSurvMap.ui.themeData.ecnmy.ecnmyType == "ecnmy9th") {
								result.tbl_id_list = 'DT_1KI1510';
								result.adm_cd = 'l1:'+$totSurvMap.ui.admCd;
							} else {
								result.tbl_id_list = 'DT_1KI1510_10';
								result.adm_cd = 'l2:'+$totSurvMap.ui.admCd;					
							}
						}
						//화면 셋팅 불러오기
						$.ajax({
							method: "POST",
							async: false,	// 반드시 동기처리 해야 함
							url: sgisContextPath+"/view/totSurv/getDispSrvList.do",
							data: {
								iemCl: "S_ECN",
								tblOrd:	$totSurvMap.ui.themeData.ecnmy.ecnmyType == "ecnmy9th"?"9":10,
								stattbYear:year
							},
							dataType: "json",
							success: function(res) {
								for(var i=0; i<res.dispOptions.length; i++) {
									if($totSurvMap.ui.themeData.ecnmy.dispOptions[res.dispOptions[i].chartOrd] == undefined) {
										$totSurvMap.ui.themeData.ecnmy.dispOptions[res.dispOptions[i].chartOrd] = [];
									} else {
										for(var j=0; j<Object.keys($totSurvMap.ui.themeData.ecnmy.dispOptions).length; j++) {
											if(Object.keys($totSurvMap.ui.themeData.ecnmy.dispOptions)[j] == res.dispOptions[i].chartOrd) {
												$totSurvMap.ui.themeData.ecnmy.dispOptions[res.dispOptions[i].chartOrd].push(res.dispOptions[i]);
											}
										}
									}						
								}
								let itmLv = null;
								let admLv = null;
								for(var i=0; i<$totSurvMap.ui.themeData.ecnmy.dispOptions[1].length; i++) {		// 항목분류 레벨
									if($totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].objVarId != "13999001") {
										itmLv = "ov_l"+$totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].varOrd+"_list";
										admLv = "ov_l"+$totSurvMap.ui.themeData.ecnmy.dispOptions[1][i].regionVarOrd+"_list";
										break;
									}
								}
								$totSurvMap.ui.themeData.ecnmy.mapData.itmLv = itmLv;
								$totSurvMap.ui.themeData.ecnmy.mapData.admLv = admLv;
								result[itmLv] = '0';
								result[admLv] = '00';
							},
							error: function(e) {
								//$totSurvMain.ui.alert(errorMessage);
							}
						});	
						$totSurvMap.ui.themeData.ecnmy.ajaxParams = result;
						return result;
					},
					unit:"개"
				}
			},
		},
		/**
		 * @name         : getData
		 * @description  : 총조사 시각화 지도에 대한데이터 얻기 
		 * @param isMove : 지역 이동 유무
		 */
		getData:function(isMove){
			common_loading(true);
			$("#map-tooltip").hide();
			var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
			var _this = this;
			this.admCd = this.admCd==null?"00":this.admCd;
			this.year = this.map.map.bnd_year;
			if($totSurvMap.ui.theme=="ecnmy"){
				common_loading(true);
				let parameters = $.extend(true,{},themeInfo.mapData.getParameters());
				parameters.char_itm_id_list = "T10,T20,T30";
				parameters.prt_type = "part";
				parameters.adm_unit = this.getAreaBndryParameters().area_bndry_se;
				parameters[themeInfo.mapData.admLv] = "";
				$.ajax({
//					method: "POST",
					method: "GET",
					async: true,	// 반드시 동기처리 해야 함
					url: sgis4thApiPath,
//					url: sgisContextPath + "/view/kosisApi/TotsurvStatData.do",
					data: parameters,
					dataType: "json",
					success: function(res) {
						let result = [];
						res.forEach(function(data){
							if(data.CHAR_ITM_ID=="T10"){
								if($totSurvMap.ui.isAtdrc) {
									result.push(data);
								}else{
									if(data.ADM_CD.substring(4,5) == "0" || data.ADM_CD.length == 2) {
										result.push(data);
									}
								}
							}
						});
						_this.map.map.setStatsData({
							adm_cd: $totSurvMap.ui.admCd,
							admCdKey:"ADM_CD",
							showData : "DTVAL_CO",
							unit : themeInfo.mapData.unit,
							callback:function(data){
								setSummaryData(res,isMove===true);
//								if($totSurvMap.ui.admCd=="00"){
//									_this.map.map.gMap.setView(defaultCenter,1);
//								}else{
									_this.map.map.gMap.fitBounds(_this.map.map.dataBoundary);
//								}
								isLoad = true;
							}
						},result,parameters);
					},
					complete : function(){
						common_loading(false);
					}
				});
			}else{
				const parameters = $.extend(true, {
					surv_year: this.map.map.bnd_year, 
					isAtdrc : $totSurvMap.ui.isAtdrc,
					map_ty: "color",
				}
				, this.getAreaBndryParameters()
				, themeInfo.mapData.getParameters());
				if(this.admCd=="00"){
					$("#population-for-time-container").show();
				}else{
					$("#population-for-time-container").hide();
				}
				
				$.ajax({
					method: "POST",
					async: true,	// 반드시 동기처리 해야 함
					url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotSurvData.json",
					data: parameters,
					dataType: "json",
					success: function(res) {
						if (res.errCd == "0") {
							$("[data-id=year-region-name]").text($totSurvMap.ui.map.map.bnd_year+"년 "+$totSurvMap.ui.locationNameArray[$totSurvMap.ui.locationNameArray.length-1]);
							_this.map.map.setStatsData({
								adm_cd: $totSurvMap.ui.admCd,
								admCdKey:"adm_cd",
								showData : "dt",
								unit : themeInfo.mapData.unit,
								callback:function(data){
									setTileMapChart(res);
//									if($totSurvMap.ui.admCd=="00"){
//										_this.map.map.gMap.setView(defaultCenter,1);
//									}else{
										_this.map.map.gMap.fitBounds(_this.map.map.dataBoundary);
//									}
									isLoad = true;
								}
							},res.result.mapData,parameters);
						}
					},
					complete : function(){
						common_loading(false);
					}
				});
			}
		},
		/**
		 * @name        : getAreaBndryParameters
		 * @description : 지역 파라미터 데이터 얻기
		 */
		getAreaBndryParameters:function(){
			let result = {};
			if(!$.heum.hasData($totSurvMap.ui.admCd)||$totSurvMap.ui.admCd.length == 2){
				if($.heum.hasData($totSurvMap.ui.admCd)&&$totSurvMap.ui.admCd!="00"){
					result.area_bndry_se = "sgg";
					result.sido_cd = $totSurvMap.ui.admCd;
					result.sgg_cd = "999";
				}else{
					result.area_bndry_se = "sido";
				}
			}else if($totSurvMap.ui.admCd.length == 5){
				result.area_bndry_se = "sgg";
				result.sido_cd = $totSurvMap.ui.admCd.substring(0,2);
				result.sgg_cd = $totSurvMap.ui.admCd.substring(2,5);
			}else if($totSurvMap.ui.admCd.length == 7){
				result.area_bndry_se = "emdong";
			}else{
				result.area_bndry_se = "totreg";
			}
			return result;
		},
		/**
		 * @name        : createMap
		 * @description : 지도 생성
		 * @param id    : html tag id
		 */
		createMap: function(id) {
			if($.heum.hasData($totSurvMap.ui.theme)){
				var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
				this.map[id] = new sMap.map();
				/*const year = $("#year-list button[aria-checked=true]").data("value");*/
				const year = $("#year-list option[aria-checked=true]").attr("data-value");
				$("#data-year").text(year+"년");
				this.map[id].bnd_year = year;
				this.map[id].createMap($totSurvMap, id, {
					defaultColor : themeInfo.defaultColor,
					zoom:2,
					currentDefaultZoom:2,
					isZoomControl : true,//줌 컨트롤 버튼 생성 유무
					isCurrentControl : false,//현재위치 버튼 생성 유무
					isMapControlButton : false,//지도 컨트롤 박스 생성 유무 
					isMapStatToggleControl : false,//통계 폴리곤 토글 버튼 생성 유무 
												  //createMap 할때 넘겨준 객체에서 ui.setStats이란 메소드가 존재해야합니다. ex : $totSurvMap.ui.setStats
					mapStatToggleOption : //통계 폴리곤 토글 버튼의 옵션
					{
						defaultShowMapStat : false,//초기에 지도의 통계를 보여줄지의 유무
						callback : function(isOn){//콜백(on유무)
						}
					},
					isMapCaptionToggleControl : false,//통계 캡션 토글 버튼 생성 유무
					mapCaptionToggleOption : //통계 캡션 토글 옵션
					{
						defaultShowCaption : true,//초기에 지도의 통계 캡션을 보여줄지의 유무
						callback : function(isOn){//콜백(on유무)
						}
					},
					isHideLegendControl : false,//범례 컨트롤 숨김 유무
					isMapSizeControl : true,//지도 전체화면 버튼 생성 유무
					isMapNavigator : true,//지도 네비게이션 생성 유무
					navigatorOption : //지도 네비게이션 옵션
					{
						id : "map-navigator-"//네비게이터 아이디(ex : navigator-sido 면 sido를 제거하고 navigator)
					},
					isLegendControl : true,//범례 컨트롤 생성 유무
					legendOption : //범례 옵션
					{
						//legend 객체에 있는 옵션을 참고해주세요
					}
				});
				this.map[id].addControlEvent("movestart");
				this.map[id].addControlEvent("moveend");
				this.map[id].addControlEvent("zoomstart");
				this.map[id].addControlEvent("zoomend");
				this.map[id].addControlEvent("drag");
				this.map[id].addControlEvent("dragend");
				if(id!=="tooltip-map"){
					this.getData();
				}
			}
		},
		setStats : function(){
		},
		
		/**
		 * checkIsAtdrc
		 * 비자치구 여부 체크 
		 * admCd
		 */
		checkIsAtdrc : function(admCd,isReturn){
			let result = false;
			if(isReturn!==true){
				$totSurvMap.ui.isAtdrc = false;
			}
			// 비자치구 여부 체크
			if(admCd != undefined && admCd.length == 5){
				// ajax 시작
				$.ajax({
					method: "POST",
					async: false,
					url: sgisContextPath + "/ServiceAPI/totSurv/common/getAtdrcCheck.json",
					data: {year:$totSurvMap.ui.map.map.bnd_year, region_cd:admCd},
					dataType: "json",
				}).done(function (res) { // 완료
					if(res.errCd == "0") {
						result = res.result.rslt;
				
					}
				});
			}
			if(isReturn===true){
				return result;
			}else{
				$totSurvMap.ui.isAtdrc = result;
			}
		},
		setRankText:function(parameters,callback){
			$.ajax({
				method: "POST",
				async: true,	
				url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotSurvRegionCount.json",
				data: parameters, 
				dataType: "json",
				success: function(res) {
					$("#ranking").empty();
					if(res.errCd=="0"){
						if($totSurvMap.ui.admCd.length == 2){
							$("#ranking").append(
								$.heum.setThousandSeparator(res.result.maxRank[0].cnt)+"개 시도 중 순위",
								$("<a/>",{"href":"#","class":"notice notice--gray"}).click(function(){
									$('#ranking-tooltip').show();
									return false;
								})
							);
						}else if($totSurvMap.ui.admCd.length == 5){
							if($totSurvMap.ui.isAtdrc == true){
								$("#ranking").append(
									$.heum.setThousandSeparator(res.result.maxRank[2].cnt) + "개 비자치구 중 순위",
									$("<a/>",{"href":"#","class":"notice notice--gray"}).click(function(){
										$('#ranking-tooltip-3').show();
										return false;
									})
								);
							} else {
								$("#ranking").append(
									$.heum.setThousandSeparator(res.result.maxRank[1].cnt) + "개 시군구 중 순위",
									$("<a/>",{"href":"#","class":"notice notice--gray"}).click(function(){
										$('#ranking-tooltip-2').show();
										return false;
									})
								);
							}
						}
					}
					if(typeof callback === "function"){
						callback();
					}
				},
				error: function(e) {
					console.error(e);
				}
			});
		},
		setChartTitle:function(){
			var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
			/*const year = $("#year-list button[aria-checked=true]").data("value");*/
			const year = $("#year-list option[aria-checked=true]").data("value");
			
			$("#data-year").text(year+"년");
			$("[data-id=text-year]").each(function(){
				$(this).empty().append(
					year+($.heum.hasData($(this).data("append-text"))?$(this).data("append-text"):""),
					($.heum.hasData($(this).data("tooltip"))?
						$("<a/>",{"class":"notice notice--gray","href":"#","data-tooltip":$(this).data("tooltip")}).click(function(){
							$("#"+$(this).data("tooltip")).show();
							return false;
						})
					:""),
					($totSurvMap.ui.theme=="fishery"?(themeInfo.fisheryType=="sea"?"(해수면)":"(내수면)"):"")
//					,
//					($.heum.hasData($(this).data("title-unit"))?$("<span/>",{"text":$(this).data("title-unit")}):"")
				);
			});
//			$("[data-id=title-unit]").each(function(){
//				$(this).append($("<span/>",{"text":$(this).data("title-unit")}));
//			});
		}
	};
	$totSurvMap.callbackFunc = {
		/**
		 * @name         : didMapMoveStart
		 * @description  : 지도 이동시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("movestart"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapMoveStart : function(event,map){
		},
		/**
		 * @name         : didMapMoveEnd
		 * @description  : 지도 이동 종료시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("moveend"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapMoveEnd : function(event,map){
		},
		/**
		 * @name         : didMapZoomStart
		 * @description  : 지도 줌변경 시작시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("zoomstart"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapZoomStart : function(event,map){
		},
		/**
		 * @name         : didMapZoomEnd
		 * @description  : 지도 줌변경 종료시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("zoomend"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapZoomEnd : function(event,map){
		},
		/**
		 * @name         : didMapDrag
		 * @description  : 지도 드래그시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("drag"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapDrag : function(event,map){
		},
		/**
		 * @name         : didMapDragEnd
		 * @description  : 지도 드래그 종료시 발생하는 콜백
		 *                 map객체에서 이벤트 등록이 필요합니다.
		 *                 ex : map.addControlEvent("dragend"); 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 * @param event  : event
		 * @param map    : 지도에 관련된 객체
		 */
		didMapDragEnd : function(event,map){
		},
		/**
		 * @name          : didSelectedPolygon
		 * @description   : 경계 선택시 발생하는 콜백
		 * @date          : 2016. 08. 03. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param event   : event
		 * @param feature : 경계 정보
		 * @param type    : 경계 타입
		 * @param map     : 지도에 관련된 객체
		 */
		didSelectedPolygon : function(event, feature, type, map){
			if(type==="data"){
				$("[data-type=tooltip]").hide();
				const tooltip = map.target=="tooltip-map"?"tooltip-map-tooltip":"map-tooltip";
				$("#"+tooltip).hide();
				common_loading(true);
				var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
				$("#"+tooltip+" [data-id=map-unit]").text(themeInfo.mapData.unit);
				const isAtdrc = $totSurvMap.ui.checkIsAtdrc(feature.properties.adm_cd,true);
				if(map.target!=="tooltip-map"){
					$totSurvMap.ui.admCd = feature.properties.adm_cd;
					if($totSurvMap.ui.admCd.length>=5){
						$totSurvMap.ui.map.map.mapNavigation.setSgg($totSurvMap.ui.admCd.substring(0,2),$totSurvMap.ui.admCd.substring(2,5));
					}else{
						//$("#map-navigator-sido button[data-value="+$totSurvMap.ui.admCd+"]").trigger("click");
						$("#map-navigator-sido option:selected[data-value="+$totSurvMap.ui.admCd+"]").trigger("click");
					}
					$("[id$=chart],[id$=legend]").empty();
					$("#tree-map rect[data-original-fill]").each(function(node){
						const target = d3.select(this);
						if(target.attr("value")==$totSurvMap.ui.admCd){
							target.attr("fill","#0086c6");
						}else{
							target.attr("fill",target.attr("data-original-fill"));
						}
					});
					if($totSurvMap.ui.theme==="ecnmy"){
						$totSurvMap.ui.selectedAdmNm = feature.info[0].result.OV_L1_KOR;
						$("#location-text").empty();
						$totSurvMap.ui.locationNameArray.forEach(function(item){
							$("#location-text").append($("<p/>",{"text":item}));
						});
						$("#location-text").append($("<p/>",{"text":feature.info[0].result.OV_L1_KOR}));
						$("[data-id=year-region-name]").text($totSurvMap.ui.map.map.bnd_year+"년 "+feature.info[0].result.OV_L1_KOR);
						$("#"+tooltip+" [data-id=region-name]").text(feature.info[0].result.OV_L1_KOR);
						$("#"+map.target+"-tooltip").empty().append(
							$("<div/>",{"class":"modal__header d-flex justify-content-between align-items-center"}).append(
								$("<h3/>",{"class":"modal__tit","text":$totSurvMap.ui.year+"년 사업체수"}),
								$("<a/>",{"href":"#","class":"btn__cancel"}).click(function(){
									$(this).parents("[id$=-tooltip]").hide();
									return false;
								}).append($("<span/>",{"class":"btn-close btn-close--black"}))
							),
							$("<div/>",{"class":"modal__body"}).append(
								$("<p/>").append(
									$("<span/>",{"class":"color-blue font-large fwbold","data-id":"rank"}),
									$("<span/>",{"class":"color-blue font-large fwbold","text":feature.info[0].result.ADM_KOR})
								),
								$("<p/>").append(
									$("<span/>",{"class":"color-red font-large fwbold","text":$.heum.setThousandSeparator(feature.info[0].result.DTVAL_CO)}),"개"
								),
								(
									feature.properties.adm_cd.length>=5?null:
									$("<a/>",{"href":"#","text":"지역 이동"}).click(function(){
										$totSurvMap.ui.map.map.dataBoundary.eachLayer(function(layer){
											
											if($totSurvMap.ui.admCd==layer.feature.properties.adm_cd){
												$totSurvMap.ui.locationNameArray.push(feature.info[0].result.OV_L1_KOR);
												$("#location-text").empty();
												$totSurvMap.ui.locationNameArray.forEach(function(item){
													$("#location-text").append($("<p/>",{"text":item}));
												});
												$("#map-tooltip,#top-map-tooltip").hide();
												$totSurvMap.ui.getData(true);
											}
										});
										return false;
									})
								)
							)
						);
						if(typeof window.createTotSur==="function"){
							window.createTotSur(function(){
								$("#"+map.target+"-tooltip").show();
								common_loading(false);
							});
						}
					}else{
						$totSurvMap.ui.selectedAdmNm = feature.info[0].result.region_nm;
						$("#location-text").empty();
						$totSurvMap.ui.locationNameArray.forEach(function(item){
							$("#location-text").append($("<p/>",{"text":item}));
						});
						$("#location-text").append($("<p/>",{"text":feature.info[0].result.region_nm}));
						$("[data-id=year-region-name]").text($totSurvMap.ui.map.map.bnd_year+"년 "+feature.info[0].result.region_nm);
//						$("#"+tooltip+" [data-id=region-name]").text(feature.info[0].result.region_nm);
						if(feature.info[0].result.adm_cd.length == 2) {
							$("#"+tooltip+" [data-id=region-name1]").text("전국 17개 시도 중 ");							
						} else {
							$("#"+tooltip+" [data-id=region-name1]").text("전국 229개 시군구 중 ");
						}
												
						/*$("#map-tooltip [data-id=title]").text($("#year-list button[aria-checked=true]").data("value")+"년 "+feature.info[0].result.region_nm+ " 총 "+themeInfo.name);*/
						$("#map-tooltip [data-id=title]").text($("#year-list option[aria-checked=true]").data("value")+"년 "+feature.info[0].result.region_nm+ " 총 "+themeInfo.name);
						$totSurvMap.ui.isAtdrc = isAtdrc;
						
						$.ajax({
							method: "POST",
							async: true,
							url: sgisContextPath + "/ServiceAPI/totSurv/populationDash/getTotAreaPopulation.json",
							data: $.extend(true, {
								year: $totSurvMap.ui.map.map.bnd_year, 
								region_cd : feature.properties.adm_cd,
								isAtdrc : isAtdrc
							}, themeInfo.mapData.getParameters()),
							dataType: "json",
							success: function(res) {
								if (res.errCd == "0") {
									$("#"+tooltip+" [data-id=value]").text($.heum.setThousandSeparator(feature.info[0].dt));
									var total = 0,ratio = 0;
									map.data[0].forEach(function(data){
										total+=data;
									})
									if(total != 0 && total !=""){
										ratio = (feature.info[0].dt / total * 100).toFixed(2)
									} else {
										ratio = 100;
									}
									
									$("#"+tooltip+" [data-id=ratio]").text(ratio);
									if($totSurvMap.ui.admCd.length==2){
										$("#detail-area-button").show();
									}else if($totSurvMap.ui.admCd.length==5){
										if($totSurvMap.ui.isAtdrc===true){
											$("#detail-area-button").show();
										}else{
											$("#detail-area-button").hide();
										}
									}else{
										$("#detail-area-button").hide();
									}
									if(typeof window.createTotSur==="function"){
										window.createTotSur(res,function(){
											$("#"+tooltip).show();
											common_loading(false);
										});
									}
								}else{
									console.error(res)
									common_loading(false);
								}
							}
						});
					}
				}else{
					$totSurvMap.ui.tooltipMap.selectedAdmCd = feature.properties.adm_cd;
					if($totSurvMap.ui.theme==="ecnmy"){
						$totSurvMap.ui.tooltipMap.selectedAdmNm = feature.info[0].result.OV_L1_KOR;
					}else{
						$totSurvMap.ui.tooltipMap.selectedAdmNm = feature.info[0].result.region_nm;
					}
					if(typeof $totSurvMap.ui.tooltipMap.didSelectedPolygon==="function"){
						$totSurvMap.ui.tooltipMap.didSelectedPolygon(function(){
							$("#"+tooltip).show();
							common_loading(false);
						});
					}
				}
				
			}
		},
		/**
		 * @name          : didSyncPolygon
		 * @description   : 여러개의 지도가 존재할시 싱크 맞출때 필요한 콜백
		 * @date          : 2016. 08. 03. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param event   : event
		 * @param feature : 경계 정보
		 * @param type    : 경계 타입
		 * @param map     : 지도에 관련된 객체
		 */
		didSyncPolygon : function(event, feature, type, map){
		},
		/**
		 * @name          : didCurrentLocationCircle
		 * @description   : 현재위치 표시해주는 marker주변 circle을 클릭시 발생하는 콜백
		 *                  map 객체에서 currentLocationMarker,currentLocationCircle가 true로 되어있어야합니다
		 * @date          : 2016. 08. 03. 
		 * @author	      : 나광흠
		 * @history       :
		 * @param event   : event
		 * @param layer   : 경계
		 * @param map     : 지도에 관련된 객체
		 */
		didCurrentLocationCircle : function(event, layer, map){
		},
		/**
		 * @name        : didEndBoundary
		 * @description : 경계 다 그리고 난 후 발생하는 콜백
		 * @date        : 2016. 08. 03. 
		 * @author	    : 나광흠
		 * @history     :
		 * @param map   : 지도에 관련된 객체
		 * @param data  : 경계의 통계 정보
		 */
		didEndBoundary : function(map,data){
		}
	};
	$totSurvMap.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setUIEvent: function() {
			this.mapResize();
			let parameters = $.heum.getAllParameter();
			const parameterAdmCd = parameters.admCd;
			$totSurvMap.ui.theme = parameters.theme;
			var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
			let tmtTmsParameters = { 
				thema: themeInfo.name,
				//accessToken:accessToken,
			};
			if($totSurvMap.ui.theme=="ecnmy"){
//				tmtTmsParameters.ecnmyType = $("#ecnmy-type button[aria-checked=true]").data("type");	
				tmtTmsParameters.ecnmyType = $("#ecnmy-type .option__btn.selected[aria-checked=true]").data("type");	
			}
			let cycle;
			$("#year-list").empty();
			/*var total = {"id":"116001" ,"result":{
						 	 "mapData":[
						 		 {"dt":"51829136","adm_cd":"00","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"전국"}	
						 		,{"dt":"9586195","adm_cd":"11","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"서울특별시"}
						 		,{"dt":"3349016","adm_cd":"21","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"부산광역시"}
						 		,{"dt":"2410700","adm_cd":"22","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"대구광역시"}
						 		,{"dt":"2945454","adm_cd":"23","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"인천광역시"}
						 		,{"dt":"1477573","adm_cd":"24","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"광주광역시"}
						 		,{"dt":"1488435","adm_cd":"25","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"대전광역시"}
						 		,{"dt":"1135423","adm_cd":"26","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"울산광역시"}
						 		,{"dt":"353933","adm_cd":"29","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"세종특별자치시"}
						 		,{"dt":"13511676","adm_cd":"31","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"경기도"}
						 		,{"dt":"1521763","adm_cd":"32","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"강원도"}
						 		,{"dt":"1632088","adm_cd":"33","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"충청북도"}
						 		,{"dt":"2176636","adm_cd":"34","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"충청남도"}
						 		,{"dt":"1802766","adm_cd":"35","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"전라북도"}
						 		,{"dt":"1788807","adm_cd":"36","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"전라남도"}
						 		,{"dt":"2644757","adm_cd":"37","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"경상북도"}
						 		,{"dt":"3333056","adm_cd":"38","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"경상남도"}
						 		,{"dt":"670858","adm_cd":"39","surv_id":"PH0001","itm_nm":"총인구 (명)","region_nm":"제주특별자치도"}]}
						 	,"errMsg":"Success","errCd":0,"trId":"rscN_116001_1663833397611"}*/
			/*var foreigner = {"id":"116100" ,"result":{
						 	"foreignData":[
						 		 {"dt":"942619","rank":1,"irdsrate":"-7.35","surv_id":"PH0001","itm_nm":"외국인-남자 (명)","region_cd":"00","itm_cd":"T141","region_nm":"전국"}
						 		,{"dt":"753024","rank":1,"irdsrate":"-1.11","surv_id":"PH0001","itm_nm":"외국인-여자 (명)","region_cd":"00","itm_cd":"T142","region_nm":"전국"}]
						 		,"moveHomeData":[
						 			{"dt":"40863082","rank":1,"irdsrate":"-1.344165245669","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"현재 살고 있는 집","region_cd":"00","itm_cd":"T10","region_nm":"전국"}
						 			,{"dt":"4474772","rank":1,"irdsrate":"9.347126516551","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"같은 시군구 내 다른 집","region_cd":"00","itm_cd":"T20","region_nm":"전국"}
						 			,{"dt":"1858372","rank":1,"irdsrate":"10.158452968852","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"다른 시군구-같은 시도","region_cd":"00","itm_cd":"T31","region_nm":"전국"}
						 			,{"dt":"2095747","rank":1,"irdsrate":"5.711213147301","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"다른 시군구-다른 시도","region_cd":"00","itm_cd":"T32","region_nm":"전국"}
						 			,{"dt":"397471","rank":1,"irdsrate":"20.799737412357","c1_nm":"계","c1":"0","surv_id":"PH0011","c2":"000","c2_nm":"전체","itm_nm":"기타","region_cd":"00","itm_cd":"T40","region_nm":"전국"}]
						 			,"multiculData":[{"dt":"68086","rank":1,"c1_nm":"내국인(귀화)","c1":"10","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"},{"dt":"85068","rank":1,"c1_nm":"내국인(출생)+내국인(귀화)","c1":"11","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"},{"dt":"131834","rank":1,"c1_nm":"내국인(출생)+외국인(결혼이민자)","c1":"12","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"},{"dt":"38347","rank":1,"c1_nm":"내국인(출생)+다문화자녀","c1":"13","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"},{"dt":"20076","rank":1,"c1_nm":"내국인(귀화)+외국인(결혼이민자)","c1":"14","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"},{"dt":"24364","rank":1,"c1_nm":"기타","c1":"15","surv_id":"PH0205","itm_nm":"총 다문화 가구_계","region_cd":"00","itm_cd":"T10","region_nm":"전국"}],"foreignRt":[{"dt":"1695643","rank":1,"irdsrate":"-4.68","surv_id":"PH0001","itm_nm":"외국인-계 (명)","region_cd":"00","itm_cd":"T140","region_nm":"전국"}],"genderData":[{"dt":"100","rank":1,"irdsrate":"-0.497512437811","itm_nm":"총인구_성비","region_cd":"00","surv_year":"2020","itm_cd":"T03","region_nm":"전국"}],"populationForTimeData":[{"dt":"19020030","rank":1,"irdsrate":"0","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1925","itm_cd":"T10","region_nm":"전국"},{"dt":"20438108","rank":1,"irdsrate":"7.455708534634","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1930","itm_cd":"T10","region_nm":"전국"},{"dt":"23547465","rank":1,"irdsrate":"6.030965635875","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1940","itm_cd":"T10","region_nm":"전국"},{"dt":"25120174","rank":1,"irdsrate":"6.67888878909","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1944","itm_cd":"T10","region_nm":"전국"},{"dt":"20166756","rank":1,"irdsrate":"-19.718884112825","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1949","itm_cd":"T10","region_nm":"전국"},{"dt":"21502386","rank":1,"irdsrate":"6.622929339751","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1955","itm_cd":"T10","region_nm":"전국"},{"dt":"24989241","rank":1,"irdsrate":"16.216130619179","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1960","itm_cd":"T10","region_nm":"전국"},{"dt":"29159640","rank":1,"irdsrate":"16.688778182579","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1966","itm_cd":"T10","region_nm":"전국"},{"dt":"31435252","rank":1,"irdsrate":"7.80397837559","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1970","itm_cd":"T10","region_nm":"전국"},{"dt":"34678972","rank":1,"irdsrate":"10.31873388513","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1975","itm_cd":"T10","region_nm":"전국"},{"dt":"37406815","rank":1,"irdsrate":"7.865985762208","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1980","itm_cd":"T10","region_nm":"전국"},{"dt":"40419652","rank":1,"irdsrate":"8.054246265019","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1985","itm_cd":"T10","region_nm":"전국"},{"dt":"43390374","rank":1,"irdsrate":"7.349697122578","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1990","itm_cd":"T10","region_nm":"전국"},{"dt":"44553710","rank":1,"irdsrate":"2.681092354724","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"1995","itm_cd":"T10","region_nm":"전국"},{"dt":"45985289","rank":1,"irdsrate":"3.213153292958","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"2000","itm_cd":"T10","region_nm":"전국"},{"dt":"47041434","rank":1,"irdsrate":"2.296701886553","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"2005","itm_cd":"T10","region_nm":"전국"},{"dt":"47990761","rank":1,"irdsrate":"2.018065605738","c1_nm":"계","c1":"00","surv_id":"PH0298","itm_nm":"인구 (명)","region_cd":"00","surv_year":"2010","itm_cd":"T10","region_nm":"전국"}],"localData":[{"dt":"24972588","rank":1,"irdsrate":"0.15","surv_id":"PH0001","itm_nm":"내국인-남자 (명)","region_cd":"00","itm_cd":"T131","region_nm":"전국"},{"dt":"25160905","rank":1,"irdsrate":"0.38","surv_id":"PH0001","itm_nm":"내국인-여자 (명)","region_cd":"00","itm_cd":"T132","region_nm":"전국"}],"totalData":[{"dt":"51829136","rank":1,"irdsrate":"0.1","surv_id":"PH0001","itm_nm":"총인구 (명)","region_cd":"00","itm_cd":"T100","region_nm":"전국"}],"ageData":[{"dt":"1722","origin_dt":"1722081","rank":1,"irdsrate":"-96.67","c1_nm":"0~4세","c1":"005","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2265","origin_dt":"2264595","rank":1,"irdsrate":"-95.63","c1_nm":"5~9세","c1":"010","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2267","origin_dt":"2267481","rank":1,"irdsrate":"-95.62","c1_nm":"10~14세","c1":"015","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2450","origin_dt":"2449561","rank":1,"irdsrate":"-95.27","c1_nm":"15~19세","c1":"020","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3365","origin_dt":"3364804","rank":1,"irdsrate":"-93.5","c1_nm":"20~24세","c1":"025","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3666","origin_dt":"3666212","rank":1,"irdsrate":"-92.92","c1_nm":"25~29세","c1":"030","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3301","origin_dt":"3301331","rank":1,"irdsrate":"-93.62","c1_nm":"30~34세","c1":"035","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3805","origin_dt":"3805470","rank":1,"irdsrate":"-92.65","c1_nm":"35~39세","c1":"040","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3907","origin_dt":"3906665","rank":1,"irdsrate":"-92.46","c1_nm":"40~44세","c1":"045","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"4326","origin_dt":"4325697","rank":1,"irdsrate":"-91.65","c1_nm":"45~49세","c1":"050","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"4372","origin_dt":"4372054","rank":1,"irdsrate":"-91.56","c1_nm":"50~54세","c1":"055","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"4211","origin_dt":"4210645","rank":1,"irdsrate":"-91.87","c1_nm":"55~59세","c1":"060","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"3885","origin_dt":"3885297","rank":1,"irdsrate":"-92.5","c1_nm":"60~64세","c1":"065","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2734","origin_dt":"2734187","rank":1,"irdsrate":"-94.72","c1_nm":"65~69세","c1":"070","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"2028","origin_dt":"2027679","rank":1,"irdsrate":"-96.08","c1_nm":"70~74세","c1":"075","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"1601","origin_dt":"1600867","rank":1,"irdsrate":"-96.91","c1_nm":"75~79세","c1":"080","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"1121","origin_dt":"1120781","rank":1,"irdsrate":"-97.84","c1_nm":"80~84세","c1":"085","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"},{"dt":"804","origin_dt":"803729","rank":1,"irdsrate":"-98.45","c1_nm":"85세이상","c1":"086","surv_id":"PH0002","itm_nm":"총인구(명)","region_cd":"00","itm_cd":"T00","region_nm":"전국"}],"worldData":[{"rank":28,"irdsrate":"0.09","beforeYear":"7672062.559","currentYear":"7753195.395","maxRank":"210"}]},"errMsg":"Success","errCd":0,"trId":"Ho==_116100_1663833398266"}*/
			/*var test = parseInt(foreigner.result.foreignData[0].dt) + parseInt(foreigner.result.foreignData[1].dt);*/
			//var test2 = total.result.mapData[0].dt;
			
			//조규환 2020년 데이터
			/*$("#year-list").append($("<button/>",{"type":"button","class":"option__btn","text":"2020년","data-value":"2020","aria-checked":"true"}).click(function(){
				$(this).parent().children().attr("aria-checked",false);
				$(this).attr("aria-checked",true);
			}));*/
			/*let foreignerNumber = test.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");*/
			//let totalNumber = test2.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
			
			
			//$("#total-number").text(totalNumber); //총인구 수
			/*$("[data-id=total-gender-number]").text("100.0"); //외국인 수
			$("[data-id=total-forigen-number]").text(foreignerNumber); //외국인 수
*/			
			
			$.ajax({
				method: "POST",
				async: false,
				url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotTms"+($totSurvMap.ui.theme=="ecnmy"?"2021":"")+".json",
				data: tmtTmsParameters, 
				dataType: "json",
				success: function(res) {
					if (res.errCd == "0") {
						if($.heum.hasData(res.result.tmsData)&&res.result.tmsData.length>0){
							cycle = res.result.tmsData[0].updt_cycle.replace("년","");
							if(!$.heum.hasData(cycle)){
								cycle = 1;
							}
							for(var i=parseInt(res.result.tmsData[0].end_year);i>=parseInt(res.result.tmsData[0].start_year);i-=parseInt(cycle)){
								/*$("#year-list").append($("<button/>",{"type":"button","class":"option__btn","text":i+"년","data-value":i}).click(function(){*/
								$("#year-list").append($("<option/>",{"class":"option__btn","text":i+"년","data-value":i, "aria-checked": false}));
							}
							$("#year-list option:first-child").addClass("selected")
							document.querySelector('#year-list').addEventListener('change',function(){
								$("#year-list option").removeClass("selected");
								$("#year-list option:selected").addClass("selected");
							})
							if($totSurvMap.ui.theme=="population"){
								/*$("#year-list").append($("<button/>",{"type":"button","class":"option__btn","text":"시계열","data-value":"time"}).click(function(){*/
								$("#year-list").append($("<option/>",{"class":"option__btn","text":"시계열","data-value":"time"}).click(function(){	
									/*$(this).parent().children().attr("aria-checked",false);
									$(this).attr("aria-checked",true);*/
									$("#year-list option:first-child").addClass("selected")
									document.querySelector('#year-list').addEventListener('change',function(){
										$("#year-list option").removeClass("selected");
										$("#year-list option:selected").addClass("selected");
									})
								}));
							}
							/*const parameterYearButton = $("#year-list button[data-value="+$.heum.getAllParameter().year+"]");*/
							const parameterYearButton = $("#year-list option[data-value="+$.heum.getAllParameter().year+"]");
							if(parameterYearButton.length>0){
								parameterYearButton.trigger("click");
							}else{
								/*$("#year-list>button:first").trigger("click");*/
								$("#year-list > option:first-child").attr("aria-checked","true");
							}
						}
					}
				},
				error: function(e) {
					console.error(e);
				}
			});
			/*const year = $("#year-list button[aria-checked=true]").data("value");*/
			const year = $("#year-list option[aria-checked=true]").data("value");
			if($.heum.hasData(parameterAdmCd)&&parameterAdmCd!="00"){
				$.ajax({
					type: "GET",
					url: openApiPath+"/OpenAPI3/addr/stage.json",
					data:{
						accessToken:accessToken,
						pg_yn:0
					},
					dataType: "json",
					async : false,
					success: function(res) {
						if(res.errCd=="0"){
							res.result.some((data)=>{
								if(data.cd==parameterAdmCd.substring(0,2)){
									$totSurvMap.ui.locationNameArray.push(data.addr_name);
									$totSurvMap.ui.admCd = data.cd;
									return true;
								}
							})
						}
					}
				});
				if(parameterAdmCd.length>=5){
					$.ajax({
						type: "POST",
						url: contextPath+"/m2021/map/totSurv/getSggList.json",
						data:{
							year:year,
							sido_cd:parameterAdmCd.substring(2,5)
						},
						dataType: "json",
						async : false,
						success: function(res) {
							if(res.errCd=="0"){
								res.result.some((data)=>{
									if(data.sgg_cd==parameterAdmCd.substring(2,5)){
										$totSurvMap.ui.locationNameArray.push(data.sgg_nm);
										$totSurvMap.ui.admCd += data.sgg_cd;
										return true;
									}
								})
							}
						}
					});
				}
				$("#location-text").empty();
				$totSurvMap.ui.locationNameArray.forEach(function(item){
					$("#location-text").append($("<p/>",{"text":item}));
				});
			}
			$totSurvMap.ui.createMap("map");
			$totSurvMap.ui.createMap("tooltip-map");
			// 맵 이미지 저장
			$("[data-save-image=true]").click(function(){
				const _this = this;
				if(confirm($(_this).data("confirm-text"))){
					common_loading(true);
					let options = {
						logging: true,
						useCORS: false,
						proxy: sgisContextPath+"/ServiceAPI/community/html2canvasproxy.jsonp"
					};
					html2canvas($("#"+$(_this).data("target"))[0], options).then(function(canvas) {
						var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
						var a = document.createElement('a');
						a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
						a.download = themeInfo.name+".png";
						a.click();
						common_loading(false);
					});
				}
				return false;
			});
			//지역이동 버튼 이벤트
			$("#detail-area-button").click(()=>{
				$totSurvMap.ui.map.map.dataBoundary.eachLayer(function(layer){
					if($totSurvMap.ui.admCd==layer.feature.properties.adm_cd){
						$totSurvMap.ui.locationNameArray.push(layer.feature.info[0].result.region_nm);
						$("#location-text").empty();
						$totSurvMap.ui.locationNameArray.forEach(function(item){
							$("#location-text").append($("<p/>",{"text":item}));
						});
						$("#map-tooltip").hide();
	//					$totSurvMap.ui.map.gMap.setView(sop.utmk(layer.feature.properties.x, layer.feature.properties.y), $totSurvMap.ui.map.getZoomToCd($totSurvMap.ui.admCd));
						$totSurvMap.ui.getData(true);
					}
				});
				return false;
			});
			/*//보도자료 버튼 이벤트
			$("#press-release-button").click(()=>{
				const themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
				const pressRelease = $totSurvMap.ui.themeData.pressRelease[$totSurvMap.ui.year];
				const _open = (seq) =>{
					const openTarget = window.open("about:blank");
					openTarget.location.href = "https://www.kostat.go.kr/portal/korea/kor_nw/1/1/index.board?bmode=read&bSeq=&aSeq="+seq;
				}
				if($totSurvMap.ui.year=="2020"){
					if($totSurvMap.ui.theme=="population"||$totSurvMap.ui.theme=="houseHold"||$totSurvMap.ui.theme=="house"){
						_open(391020);
					}else if($totSurvMap.ui.theme=="farm"||$totSurvMap.ui.theme=="forestry"||$totSurvMap.ui.theme=="fishery"){
						_open(403184);
					}else{
						alert($totSurvMap.ui.year+"년 "+themeInfo.name+" 데이터는 보도자료가 존재하지 않습니다");
					}
				}else{
					if($.heum.hasData(pressRelease)){
						_open(pressRelease);
					}else{
						alert($totSurvMap.ui.year+"년 "+themeInfo.name+" 데이터는 보도자료가 존재하지 않습니다");
					}
				}
				return false;
			});*/
			//필터 이벤트
			$("#filter-form").submit(()=>{
				/*const year = $("#year-list button[aria-checked=true]").data("value");*/
				const year = $("#year-list option:selected").attr("data-value");
				console.log(year)
				
				if(year=="time"){
					$totSurvMap.ui.locationNameArray = ["전국"];
				//	let sidoButton = $("#map-navigator-sido button[aria-checked=true]:not([data-value=00])");
					let sidoButton = $("#map-navigator-sido option:selected[aria-checked=true]:not([data-value=00])");
					if(sidoButton.length>0){
						$totSurvMap.ui.locationNameArray.push(sidoButton.text());
					//	let sggButton = $("#map-navigator-sgg button[aria-checked=true]:not([data-value=999])");
						let sggButton = $("#map-navigator-sgg option:selected[aria-checked=true]:not([data-value=999])");
						if(sggButton.length>0){
							$totSurvMap.ui.locationNameArray.push(sggButton.text());
							srvLogWrite('O0', '13', '03', '02', "시계열 "+$totSurvMap.ui.locationNameArray[0]+" "+$totSurvMap.ui.locationNameArray[1]+ " "+$totSurvMap.ui.locationNameArray[2], '');
						}else{
							srvLogWrite('O0', '13', '03', '02', "시계열 "+$totSurvMap.ui.locationNameArray[0]+" "+$totSurvMap.ui.locationNameArray[1], '');
						}
					}else{
						srvLogWrite('O0', '13', '03', '02', "시계열 "+$totSurvMap.ui.locationNameArray[0], '');
					}
					location.href=contextPath+"/m2021/map/totSurvTms.sgis?theme="+$totSurvMap.ui.theme+"&admCd="+$totSurvMap.ui.map.map.mapNavigation.getAdmCd();
				}else{
					$totSurvMap.ui.locationNameArray = ["전국"];
				//	let sidoButton = $("#map-navigator-sido button[aria-checked=true]:not([data-value=00])");
					let sidoButton = $("#map-navigator-sido option:selected[aria-checked=true]:not([data-value=00])");
					if(sidoButton.length>0){
						$totSurvMap.ui.locationNameArray.push(sidoButton.text());
					//	let sggButton = $("#map-navigator-sgg button[aria-checked=true]:not([data-value=999])");
						let sggButton = $("#map-navigator-sgg option:selected[aria-checked=true]:not([data-value=999])");
						if(sggButton.length>0){
							$totSurvMap.ui.locationNameArray.push(sggButton.text());
							srvLogWrite('O0', '13', '03', '02', year+"년 "+$totSurvMap.ui.locationNameArray[0]+" "+$totSurvMap.ui.locationNameArray[1]+ " "+$totSurvMap.ui.locationNameArray[2], '');
						}else{
							srvLogWrite('O0', '13', '03', '02', year+"년 "+$totSurvMap.ui.locationNameArray[0]+" "+$totSurvMap.ui.locationNameArray[1], '');
						}
					}else{
						srvLogWrite('O0', '13', '03', '02', year+"년 "+$totSurvMap.ui.locationNameArray[0], '');
					}
					$("#location-text").empty();
					$totSurvMap.ui.locationNameArray.forEach(function(item){
						$("#location-text").append($("<p/>",{"text":item}));
					});
					$totSurvMap.ui.setChartTitle();
					$totSurvMap.ui.map.map.bnd_year = year;
					$totSurvMap.ui.year = year;
					$("#filter-close-button").trigger("click");
					$totSurvMap.ui.admCd = $totSurvMap.ui.map.map.mapNavigation.getAdmCd();
					$totSurvMap.ui.checkIsAtdrc($totSurvMap.ui.admCd);
					$totSurvMap.ui.getData(true);
					var themeData = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
					if($totSurvMap.ui.theme=="fishery"){
						themeData.fisheryType = $("#fishery-type button[aria-checked=true]").data("type");
						$("[id$=tab]").hide();
						$("#"+themeData.fisheryType+"-tab").show();
					//}else if($totSurvMap.ui.theme=="fishery"){
					}else if($totSurvMap.ui.theme=="ecnmy"){
						isMove = true;
						themeData.ecnmyType = $("#ecnmy-type option:selected").data("type");
						
						if(year == "2010") {
							$totSurvMap.ui.themeData[$totSurvMap.ui.theme].ajaxParams.tbl_id_list = 'DT_1KI2002';
							$totSurvMap.ui.themeData[$totSurvMap.ui.theme].ajaxParams.adm_cd = 'l1:'+$totSurvMap.ui.admCd;			
						} else {
							if($totSurvMap.ui.themeData.ecnmy.ecnmyType == "ecnmy9th") {
								$totSurvMap.ui.themeData[$totSurvMap.ui.theme].ajaxParams.tbl_id_list = 'DT_1KI1510';
								$totSurvMap.ui.themeData[$totSurvMap.ui.theme].ajaxParams.adm_cd = 'l1:'+$totSurvMap.ui.admCd;
							} else {
								$totSurvMap.ui.themeData[$totSurvMap.ui.theme].ajaxParams.tbl_id_list = 'DT_1KI1510_10';
								$totSurvMap.ui.themeData[$totSurvMap.ui.theme].ajaxParams.adm_cd = 'l2:'+$totSurvMap.ui.admCd;					
							}
						}
						
										
						
						
						if(themeData.ecnmyType=="ecnmy10th"){
							$("[data-id=ecnmy-name]").text("10차 산업분류");
							$("#year-list option:first-child").attr("aria-checked","true");
						}else if(themeData.ecnmyType=="ecnmy9th"){
							$("[data-id=ecnmy-name]").text("9차 산업분류");
							$("#year-list option").attr("aria-checked","false");
							$("#year-list option.selected").attr("aria-checked","true");
						}
					}
					$totSurvMap.ui.setChartTitle();
				}
				return false;
			});
//			‘농림어업총조사’의 조사주기 및 공표주기는 5년입니다
			let yearAlertText = themeInfo.name;
			if($totSurvMap.ui.theme=="farm"||$totSurvMap.ui.theme=="forestry"||$totSurvMap.ui.theme=="fishery"){
				yearAlertText = "농림어업";
			}
			$("#year-alert").text("‘"+yearAlertText+"총조사’의 조사주기 및 공표주기는 "+($.heum.hasData(cycle)?cycle:"1")+"년입니다.");
			$totSurvMap.ui.setChartTitle();
			
			$(document).on("change", "#ecnmy-type", function(e) {
				$("#ecnmy-type option").attr("aria-checked", false);
				$(this).attr("aria-checked", true);
				let year = $("#year-list option[aria-checked=true]").data("value");
				/*let year = $("#year-list option[aria-checked=true]").data("value");*/
				var themeInfo = $totSurvMap.ui.themeData[$totSurvMap.ui.theme];
				let tmtTmsParameters = { 
					thema: themeInfo.name,
				};
				if($totSurvMap.ui.theme=="ecnmy"){
					tmtTmsParameters.ecnmyType = $("#ecnmy-type option:selected").data("type");	
					$totSurvMap.ui.themeData.ecnmy.ecnmyType = $("#ecnmy-type option:selected").data("type")
				}
				
				if(year == "2010") {
					$totSurvMap.ui.themeData.ecnmy.ajaxParams.tbl_id_list = 'DT_1KI2002';
					$totSurvMap.ui.themeData.ecnmy.ajaxParams.adm_cd = 'l1:'+$totSurvMap.ui.admCd;			
				} else {
					if($totSurvMap.ui.themeData.ecnmy.ecnmyType == "ecnmy9th") {
						$totSurvMap.ui.themeData.ecnmy.ajaxParams.tbl_id_list = 'DT_1KI1510';
						$totSurvMap.ui.themeData.ecnmy.ajaxParams.adm_cd = 'l1:'+$totSurvMap.ui.admCd;
					} else {
						$totSurvMap.ui.themeData.ecnmy.ajaxParams.tbl_id_list = 'DT_1KI1510_10';
						$totSurvMap.ui.themeData.ecnmy.ajaxParams.adm_cd = 'l2:'+$totSurvMap.ui.admCd;					
					}
				}
				
				$.ajax({
					method: "POST",
					async: false,
					url: sgisContextPath + "/ServiceAPI/totSurv/common/getTotTms"+($totSurvMap.ui.theme=="ecnmy"?"2021":"")+".json",
					data: tmtTmsParameters, 
					dataType: "json",
					success: function(res) {
						if (res.errCd == "0") {
							if($.heum.hasData(res.result.tmsData)&&res.result.tmsData.length>0){
								cycle = res.result.tmsData[0].updt_cycle.replace("년","");
								if(!$.heum.hasData(cycle)){
									cycle = 1;
								}
								$("#year-list").empty();
								
								for(var i=parseInt(res.result.tmsData[0].end_year);i>=parseInt(res.result.tmsData[0].start_year);i-=parseInt(cycle)){
									if(res.result.tmsData[0].length == "1"){//년도하나만있을때
										$("#year-list").append($("<option/>",{"class":"option__btn","text":i+"년","data-value":i, "aria-checked" : "true"}));
									}else {
										$("#year-list").append($("<option/>",{"class":"option__btn","text":i+"년","data-value":i ,"aria-checked" : "false"}));
									}
									
								}							
								/*document.querySelector('#year-list').addEventListener('change',function(){								
									$("#year-list option").attr("aria-checked","false");
									$("#year-list option:selected").attr("aria-checked","true");
									
								})*/
								
								
								
								
								const parameterYearButton = $("#year-list option[data-value="+$.heum.getAllParameter().year+"]");
								if(parameterYearButton.length>0){
									parameterYearButton.trigger("click");
								}else{
									/*$("#year-list option:first").trigger("click");*/
									$("#year-list > option:first-child").attr("aria-checked","true");
								}
								
							}
						}
					},
					error: function(e) {
						console.error(e);
					}
				});
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
			$totSurvMap.event.setMapSize();
			if(isLoad === true){
				$totSurvMap.ui.getData();
			}
		},
		/**
		 * @name         : setMapSize
		 * @description  : 지도 사이즈 변경
		 * @date         : 2016. 08. 03. 
		 * @author	     : 나광흠
		 * @history      :
		 */
		setMapSize: function(){
			Object.keys($totSurvMap.ui.map).forEach(function(key){
				if($totSurvMap.ui.map[key]&&$totSurvMap.ui.map[key].gMap){
					$totSurvMap.ui.map[key].gMap.invalidateSize();
				}
			});
		}
	};
}(window, document));